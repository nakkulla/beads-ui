var F_=Object.create;var pa=Object.defineProperty;var B_=Object.getOwnPropertyDescriptor;var U_=Object.getOwnPropertyNames;var W_=Object.getPrototypeOf,z_=Object.prototype.hasOwnProperty;var H_=(e,t,n)=>t in e?pa(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var fa=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var K_=(e,t,n,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let o of U_(t))!z_.call(e,o)&&o!==n&&pa(e,o,{get:()=>t[o],enumerable:!(r=B_(t,o))||r.enumerable});return e};var G_=(e,t,n)=>(n=e!=null?F_(W_(e)):{},K_(t||!e||!e.__esModule?pa(n,"default",{value:e,enumerable:!0}):n,e));var jt=(e,t,n)=>H_(e,typeof t!="symbol"?t+"":t,n);var vc=fa((vw,yc)=>{var Xr=1e3,Zr=Xr*60,Jr=Zr*60,Dr=Jr*24,Q_=Dr*7,X_=Dr*365.25;yc.exports=function(e,t){t=t||{};var n=typeof e;if(n==="string"&&e.length>0)return Z_(e);if(n==="number"&&isFinite(e))return t.long?em(e):J_(e);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(e))};function Z_(e){if(e=String(e),!(e.length>100)){var t=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(e);if(t){var n=parseFloat(t[1]),r=(t[2]||"ms").toLowerCase();switch(r){case"years":case"year":case"yrs":case"yr":case"y":return n*X_;case"weeks":case"week":case"w":return n*Q_;case"days":case"day":case"d":return n*Dr;case"hours":case"hour":case"hrs":case"hr":case"h":return n*Jr;case"minutes":case"minute":case"mins":case"min":case"m":return n*Zr;case"seconds":case"second":case"secs":case"sec":case"s":return n*Xr;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return n;default:return}}}}function J_(e){var t=Math.abs(e);return t>=Dr?Math.round(e/Dr)+"d":t>=Jr?Math.round(e/Jr)+"h":t>=Zr?Math.round(e/Zr)+"m":t>=Xr?Math.round(e/Xr)+"s":e+"ms"}function em(e){var t=Math.abs(e);return t>=Dr?Ds(e,t,Dr,"day"):t>=Jr?Ds(e,t,Jr,"hour"):t>=Zr?Ds(e,t,Zr,"minute"):t>=Xr?Ds(e,t,Xr,"second"):e+" ms"}function Ds(e,t,n,r){var o=t>=n*1.5;return Math.round(e/n)+" "+r+(o?"s":"")}});var wc=fa((kw,kc)=>{function tm(e){n.debug=n,n.default=n,n.coerce=a,n.disable=s,n.enable=o,n.enabled=l,n.humanize=vc(),n.destroy=u,Object.keys(e).forEach(d=>{n[d]=e[d]}),n.names=[],n.skips=[],n.formatters={};function t(d){let p=0;for(let _=0;_<d.length;_++)p=(p<<5)-p+d.charCodeAt(_),p|=0;return n.colors[Math.abs(p)%n.colors.length]}n.selectColor=t;function n(d){let p,_=null,m,y;function C(...R){if(!C.enabled)return;let V=C,te=Number(new Date),W=te-(p||te);V.diff=W,V.prev=p,V.curr=te,p=te,R[0]=n.coerce(R[0]),typeof R[0]!="string"&&R.unshift("%O");let M=0;R[0]=R[0].replace(/%([a-zA-Z%])/g,(L,U)=>{if(L==="%%")return"%";M++;let Y=n.formatters[U];if(typeof Y=="function"){let q=R[M];L=Y.call(V,q),R.splice(M,1),M--}return L}),n.formatArgs.call(V,R),(V.log||n.log).apply(V,R)}return C.namespace=d,C.useColors=n.useColors(),C.color=n.selectColor(d),C.extend=r,C.destroy=n.destroy,Object.defineProperty(C,"enabled",{enumerable:!0,configurable:!1,get:()=>_!==null?_:(m!==n.namespaces&&(m=n.namespaces,y=n.enabled(d)),y),set:R=>{_=R}}),typeof n.init=="function"&&n.init(C),C}function r(d,p){let _=n(this.namespace+(typeof p>"u"?":":p)+d);return _.log=this.log,_}function o(d){n.save(d),n.namespaces=d,n.names=[],n.skips=[];let p=(typeof d=="string"?d:"").trim().replace(/\s+/g,",").split(",").filter(Boolean);for(let _ of p)_[0]==="-"?n.skips.push(_.slice(1)):n.names.push(_)}function i(d,p){let _=0,m=0,y=-1,C=0;for(;_<d.length;)if(m<p.length&&(p[m]===d[_]||p[m]==="*"))p[m]==="*"?(y=m,C=_,m++):(_++,m++);else if(y!==-1)m=y+1,C++,_=C;else return!1;for(;m<p.length&&p[m]==="*";)m++;return m===p.length}function s(){let d=[...n.names,...n.skips.map(p=>"-"+p)].join(",");return n.enable(""),d}function l(d){for(let p of n.skips)if(i(d,p))return!1;for(let p of n.names)if(i(d,p))return!0;return!1}function a(d){return d instanceof Error?d.stack||d.message:d}function u(){console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")}return n.enable(n.load()),n}kc.exports=tm});var $c=fa((wn,Ps)=>{wn.formatArgs=rm;wn.save=om;wn.load=sm;wn.useColors=nm;wn.storage=im();wn.destroy=(()=>{let e=!1;return()=>{e||(e=!0,console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."))}})();wn.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"];function nm(){if(typeof window<"u"&&window.process&&(window.process.type==="renderer"||window.process.__nwjs))return!0;if(typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))return!1;let e;return typeof document<"u"&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||typeof window<"u"&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||typeof navigator<"u"&&navigator.userAgent&&(e=navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/))&&parseInt(e[1],10)>=31||typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)}function rm(e){if(e[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+e[0]+(this.useColors?"%c ":" ")+"+"+Ps.exports.humanize(this.diff),!this.useColors)return;let t="color: "+this.color;e.splice(1,0,t,"color: inherit");let n=0,r=0;e[0].replace(/%[a-zA-Z%]/g,o=>{o!=="%%"&&(n++,o==="%c"&&(r=n))}),e.splice(r,0,t)}wn.log=console.debug||console.log||(()=>{});function om(e){try{e?wn.storage.setItem("debug",e):wn.storage.removeItem("debug")}catch{}}function sm(){let e;try{e=wn.storage.getItem("debug")||wn.storage.getItem("DEBUG")}catch{}return!e&&typeof process<"u"&&"env"in process&&(e=process.env.DEBUG),e}function im(){try{return localStorage}catch{}}Ps.exports=wc()(wn);var{formatters:am}=Ps.exports;am.j=function(e){try{return JSON.stringify(e)}catch(t){return"[UnexpectedJSONParseError]: "+t.message}}});var Eo=globalThis,Es=Eo.trustedTypes,rc=Es?Es.createPolicy("lit-html",{createHTML:e=>e}):void 0,ma="$lit$",Zn=`lit$${Math.random().toFixed(9).slice(2)}$`,ga="?"+Zn,Y_=`<${ga}>`,Or=document,To=()=>Or.createComment(""),Co=e=>e===null||typeof e!="object"&&typeof e!="function",ha=Array.isArray,cc=e=>ha(e)||typeof e?.[Symbol.iterator]=="function",_a=`[ 	
\f\r]`,So=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,oc=/-->/g,sc=/>/g,Tr=RegExp(`>|${_a}(?:([^\\s"'>=/]+)(${_a}*=${_a}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),ic=/'/g,ac=/"/g,uc=/^(?:script|style|textarea|title)$/i,ba=e=>(t,...n)=>({_$litType$:e,strings:t,values:n}),c=ba(1),Ro=ba(2),fw=ba(3),Tn=Symbol.for("lit-noChange"),Yt=Symbol.for("lit-nothing"),lc=new WeakMap,Cr=Or.createTreeWalker(Or,129);function dc(e,t){if(!ha(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return rc!==void 0?rc.createHTML(t):t}var pc=(e,t)=>{let n=e.length-1,r=[],o,i=t===2?"<svg>":t===3?"<math>":"",s=So;for(let l=0;l<n;l++){let a=e[l],u,d,p=-1,_=0;for(;_<a.length&&(s.lastIndex=_,d=s.exec(a),d!==null);)_=s.lastIndex,s===So?d[1]==="!--"?s=oc:d[1]!==void 0?s=sc:d[2]!==void 0?(uc.test(d[2])&&(o=RegExp("</"+d[2],"g")),s=Tr):d[3]!==void 0&&(s=Tr):s===Tr?d[0]===">"?(s=o??So,p=-1):d[1]===void 0?p=-2:(p=s.lastIndex-d[2].length,u=d[1],s=d[3]===void 0?Tr:d[3]==='"'?ac:ic):s===ac||s===ic?s=Tr:s===oc||s===sc?s=So:(s=Tr,o=void 0);let m=s===Tr&&e[l+1].startsWith("/>")?" ":"";i+=s===So?a+Y_:p>=0?(r.push(u),a.slice(0,p)+ma+a.slice(p)+Zn+m):a+Zn+(p===-2?l:m)}return[dc(e,i+(e[n]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),r]},Oo=class e{constructor({strings:t,_$litType$:n},r){let o;this.parts=[];let i=0,s=0,l=t.length-1,a=this.parts,[u,d]=pc(t,n);if(this.el=e.createElement(u,r),Cr.currentNode=this.el.content,n===2||n===3){let p=this.el.content.firstChild;p.replaceWith(...p.childNodes)}for(;(o=Cr.nextNode())!==null&&a.length<l;){if(o.nodeType===1){if(o.hasAttributes())for(let p of o.getAttributeNames())if(p.endsWith(ma)){let _=d[s++],m=o.getAttribute(p).split(Zn),y=/([.?@])?(.*)/.exec(_);a.push({type:1,index:i,name:y[2],strings:m,ctor:y[1]==="."?Cs:y[1]==="?"?Os:y[1]==="@"?Rs:Ir}),o.removeAttribute(p)}else p.startsWith(Zn)&&(a.push({type:6,index:i}),o.removeAttribute(p));if(uc.test(o.tagName)){let p=o.textContent.split(Zn),_=p.length-1;if(_>0){o.textContent=Es?Es.emptyScript:"";for(let m=0;m<_;m++)o.append(p[m],To()),Cr.nextNode(),a.push({type:2,index:++i});o.append(p[_],To())}}}else if(o.nodeType===8)if(o.data===ga)a.push({type:2,index:i});else{let p=-1;for(;(p=o.data.indexOf(Zn,p+1))!==-1;)a.push({type:7,index:i}),p+=Zn.length-1}i++}}static createElement(t,n){let r=Or.createElement("template");return r.innerHTML=t,r}};function Rr(e,t,n=e,r){if(t===Tn)return t;let o=r!==void 0?n._$Co?.[r]:n._$Cl,i=Co(t)?void 0:t._$litDirective$;return o?.constructor!==i&&(o?._$AO?.(!1),i===void 0?o=void 0:(o=new i(e),o._$AT(e,n,r)),r!==void 0?(n._$Co??(n._$Co=[]))[r]=o:n._$Cl=o),o!==void 0&&(t=Rr(e,o._$AS(e,t.values),o,r)),t}var Ts=class{constructor(t,n){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=n}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:n},parts:r}=this._$AD,o=(t?.creationScope??Or).importNode(n,!0);Cr.currentNode=o;let i=Cr.nextNode(),s=0,l=0,a=r[0];for(;a!==void 0;){if(s===a.index){let u;a.type===2?u=new Vr(i,i.nextSibling,this,t):a.type===1?u=new a.ctor(i,a.name,a.strings,this,t):a.type===6&&(u=new Is(i,this,t)),this._$AV.push(u),a=r[++l]}s!==a?.index&&(i=Cr.nextNode(),s++)}return Cr.currentNode=Or,o}p(t){let n=0;for(let r of this._$AV)r!==void 0&&(r.strings!==void 0?(r._$AI(t,r,n),n+=r.strings.length-2):r._$AI(t[n])),n++}},Vr=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,n,r,o){this.type=2,this._$AH=Yt,this._$AN=void 0,this._$AA=t,this._$AB=n,this._$AM=r,this.options=o,this._$Cv=o?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,n=this._$AM;return n!==void 0&&t?.nodeType===11&&(t=n.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,n=this){t=Rr(this,t,n),Co(t)?t===Yt||t==null||t===""?(this._$AH!==Yt&&this._$AR(),this._$AH=Yt):t!==this._$AH&&t!==Tn&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):cc(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==Yt&&Co(this._$AH)?this._$AA.nextSibling.data=t:this.T(Or.createTextNode(t)),this._$AH=t}$(t){let{values:n,_$litType$:r}=t,o=typeof r=="number"?this._$AC(t):(r.el===void 0&&(r.el=Oo.createElement(dc(r.h,r.h[0]),this.options)),r);if(this._$AH?._$AD===o)this._$AH.p(n);else{let i=new Ts(o,this),s=i.u(this.options);i.p(n),this.T(s),this._$AH=i}}_$AC(t){let n=lc.get(t.strings);return n===void 0&&lc.set(t.strings,n=new Oo(t)),n}k(t){ha(this._$AH)||(this._$AH=[],this._$AR());let n=this._$AH,r,o=0;for(let i of t)o===n.length?n.push(r=new e(this.O(To()),this.O(To()),this,this.options)):r=n[o],r._$AI(i),o++;o<n.length&&(this._$AR(r&&r._$AB.nextSibling,o),n.length=o)}_$AR(t=this._$AA.nextSibling,n){for(this._$AP?.(!1,!0,n);t!==this._$AB;){let r=t.nextSibling;t.remove(),t=r}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},Ir=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,n,r,o,i){this.type=1,this._$AH=Yt,this._$AN=void 0,this.element=t,this.name=n,this._$AM=o,this.options=i,r.length>2||r[0]!==""||r[1]!==""?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=Yt}_$AI(t,n=this,r,o){let i=this.strings,s=!1;if(i===void 0)t=Rr(this,t,n,0),s=!Co(t)||t!==this._$AH&&t!==Tn,s&&(this._$AH=t);else{let l=t,a,u;for(t=i[0],a=0;a<i.length-1;a++)u=Rr(this,l[r+a],n,a),u===Tn&&(u=this._$AH[a]),s||(s=!Co(u)||u!==this._$AH[a]),u===Yt?t=Yt:t!==Yt&&(t+=(u??"")+i[a+1]),this._$AH[a]=u}s&&!o&&this.j(t)}j(t){t===Yt?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},Cs=class extends Ir{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===Yt?void 0:t}},Os=class extends Ir{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==Yt)}},Rs=class extends Ir{constructor(t,n,r,o,i){super(t,n,r,o,i),this.type=5}_$AI(t,n=this){if((t=Rr(this,t,n,0)??Yt)===Tn)return;let r=this._$AH,o=t===Yt&&r!==Yt||t.capture!==r.capture||t.once!==r.once||t.passive!==r.passive,i=t!==Yt&&(r===Yt||o);o&&this.element.removeEventListener(this.name,this,r),i&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},Is=class{constructor(t,n,r){this.element=t,this.type=6,this._$AN=void 0,this._$AM=n,this.options=r}get _$AU(){return this._$AM._$AU}_$AI(t){Rr(this,t)}},fc={M:ma,P:Zn,A:ga,C:1,L:pc,R:Ts,D:cc,V:Rr,I:Vr,H:Ir,N:Os,U:Rs,B:Cs,F:Is},V_=Eo.litHtmlPolyfillSupport;V_?.(Oo,Vr),(Eo.litHtmlVersions??(Eo.litHtmlVersions=[])).push("3.3.1");var pt=(e,t,n)=>{let r=n?.renderBefore??t,o=r._$litPart$;if(o===void 0){let i=n?.renderBefore??null;r._$litPart$=o=new Vr(t.insertBefore(To(),i),i,void 0,n??{})}return o._$AI(e),o};var Ls="today",_c=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"},{value:"30d",label:"\uCD5C\uADFC 30\uC77C"},{value:"all",label:"\uC804\uCCB4"}],Qr=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"}];function Hn(e){return e==="today"?"today":"7d"}function ya(e){return e==="today"||e==="7d"||e==="30d"||e==="all"}function Lr(e,t=Date.now()){switch(e){case"today":{let n=new Date(t);return n.setHours(0,0,0,0),n.getTime()}case"7d":return t-7*864e5;case"30d":return t-30*864e5;case"all":default:return}}function mc(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function gc(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function hc(){let e=null,t=[],n,r=new Set;function o(){for(let i of Array.from(r))try{i()}catch{}}return{get(){return e},getWorkspacesState(){return t},crossLanes(){return n},set(i,s,l){e=Array.isArray(i)?i:null,t=Array.isArray(s)?s:[],n=l===void 0?void 0:l!==null&&typeof l=="object"&&typeof l.revision=="number"&&Array.isArray(l.lanes)?{revision:l.revision,lanes:l.lanes}:null,o()},clear(){e=null,t=[],n=void 0,o()},subscribe(i){return r.add(i),()=>r.delete(i)}}}function bc(){let e=new Map,t=new Set;function n(o){return o.startsWith("session-log:")?o:`session-log:${o}`}function r(){for(let o of Array.from(t))try{o()}catch{}}return{set(o,i,s=null){e.set(n(o),{lines:Array.isArray(i)?[...i]:[],last_event_at:typeof s=="number"?s:null}),r()},append(o,i){let s=n(o),l=e.get(s)||{lines:[],last_event_at:null};l.lines=[...l.lines,i],l.last_event_at=Date.now(),e.set(s,l),r()},get(o){return e.get(n(o))||null},clear(o){typeof o=="string"?e.delete(n(o)):e.clear(),r()},subscribe(o){return t.add(o),()=>t.delete(o)}}}var xc=G_($c(),1);function Ht(e){return(0,xc.default)(`beads-ui:${e}`)}function lm(e){let n=Ac((e&&typeof e=="object"?e:{}).spec_id);return n?{path:n,source:"native",conflict:!1}:{path:"",source:"none",conflict:!1}}function Ac(e){return typeof e=="string"?e.trim():""}function cm(e){let t=e&&typeof e=="object"?e:{};return t.metadata&&typeof t.metadata=="object"?t.metadata:{}}var um=/^[A-Za-z0-9_.:-]+@[0-9a-fA-F]{40}$/;function eo(e){let t=lm(e),n=Ac(cm(e).spec_review),r=um.test(n),o=r&&n.slice(0,n.indexOf("@"))==="skipped";return t.source==="none"?{...t,evidence:"none",skipped:o}:{...t,evidence:r?"published":"draft",skipped:o}}function Ln(e){if(typeof e=="number")return Number.isFinite(e)?e:0;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:0}return 0}function Io(e,t){let n=Ln(e.created_at),r=Ln(t.created_at);if(n!==r)return n<r?1:-1;let o=e.priority??2,i=t.priority??2;if(o!==i)return o-i;let s=e.id,l=t.id;return s<l?-1:s>l?1:0}function Rc(e,t){let n=Ln(e.created_at),r=Ln(t.created_at);if(n!==r)return n<r?-1:1;let o=e.priority??2,i=t.priority??2;if(o!==i)return o-i;let s=e.id,l=t.id;return s<l?-1:s>l?1:0}function Ic(e,t){let n=Ln(e.updated_at),r=Ln(t.updated_at);if(n!==r)return n<r?1:-1;let o=e.id,i=t.id;return o<i?-1:o>i?1:0}function Lc(e,t){let n=e.priority??2,r=t.priority??2;if(n!==r)return n-r;let o=Ln(e.created_at),i=Ln(t.created_at);if(o!==i)return o<i?1:-1;let s=e.id,l=t.id;return s<l?-1:s>l?1:0}function Dc(e,t){let n=e.closed_at??0,r=t.closed_at??0;if(n!==r)return n<r?1:-1;let o=e?.id,i=t?.id;return o<i?-1:o>i?1:0}var Ms=Object.freeze({priority:"asc",dependents:"desc",released:"desc",spec:"desc",created:"asc",updated:"desc"});function dm(e){return typeof e=="string"&&Object.prototype.hasOwnProperty.call(Ms,e)}function ka(e){if(!e||typeof e!="object")return!1;let t=e;return dm(t.key)&&(t.dir==="asc"||t.dir==="desc")}function Sc(e){if(typeof e=="number")return Number.isFinite(e)?e:null;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:null}return null}function Ec(e,t){switch(t){case"priority":{let n=e.priority;return typeof n=="number"&&Number.isFinite(n)?n:null}case"dependents":{let n=e.dependents_info?e.dependents_info.count:null;return typeof n=="number"&&Number.isFinite(n)?n:null}case"released":{let n=e.release_info?e.release_info.last_released_at:null;return typeof n=="number"&&Number.isFinite(n)?n:null}case"spec":return eo(e).evidence==="published"?1:0;case"created":return Sc(e.created_at);case"updated":return Sc(e.updated_at);default:return null}}function Tc(e,t,n){let r=Ec(e,n.key),o=Ec(t,n.key);if(r===null||o===null)return r===o?0:r===null?1:-1;if(r===o)return 0;let i=r<o?-1:1;return n.dir==="desc"?-i:i}function Pc(e){let t=Array.isArray(e)?e.filter(ka):[];return(n,r)=>{for(let l of t){let a=Tc(n,r,l);if(a!==0)return a}let o=Tc(n,r,{key:"created",dir:"asc"});if(o!==0)return o;let i=n.id,s=r.id;return i<s?-1:i>s?1:0}}var pm=/^(?:[A-Za-z][A-Za-z0-9]*(?:-[A-Za-z0-9]+)+\s+)?(?:Task|Phase|T)\s*(\d+)/i;function Cc(e){let t=e&&e.metadata,n=t?t.task_order:void 0;if(n==null||n==="")return Number.POSITIVE_INFINITY;let r=Number(n);return Number.isFinite(r)?r:Number.POSITIVE_INFINITY}function Oc(e){let t=e&&e.title;if(typeof t!="string")return Number.POSITIVE_INFINITY;let n=pm.exec(t);if(!n)return Number.POSITIVE_INFINITY;let r=Number(n[1]);return Number.isFinite(r)?r:Number.POSITIVE_INFINITY}function Mc(e,t){let n=Cc(e),r=Cc(t);if(n!==r)return n<r?-1:1;let o=Oc(e),i=Oc(t);if(o!==i)return o<i?-1:1;let s=Ln(e&&e.created_at),l=Ln(t&&t.created_at);if(s!==l)return s<l?-1:1;let a=e&&e.id,u=t&&t.id;return a===u?0:String(a)<String(u)?-1:1}var va=2**20;function to(e,t){let n=e&&e.id;return t&&typeof n=="string"&&Object.prototype.hasOwnProperty.call(t,n)&&typeof t[n]=="number"&&Number.isFinite(t[n])?t[n]:-Ln(e&&e.created_at)}function qc(e){return(t,n)=>{let r=to(t,e),o=to(n,e);if(r!==o)return r<o?-1:1;let i=t?.id,s=n?.id;return i<s?-1:i>s?1:0}}function wa(e,t,n){let r=Array.isArray(e)?e:[],o=r.length,i=Math.max(0,Math.min(t,o-1)),s=i-1>=0?r[i-1]:null,l=i+1<o?r[i+1]:null;if(!s&&!l)return{rank:0};if(!s)return{rank:to(l,n)-va};if(!l)return{rank:to(s,n)+va};let a=to(s,n),u=to(l,n),d=(a+u)/2;return a<d&&d<u?{rank:d}:{renormalize:r.map((p,_)=>({bead_id:p.id,rank:_*va}))}}function $a(e,t={}){let n=Ht(`issue-store:${e}`),r=new Map,o=[],i=0,s=new Set,l=!1,a=t.sort||Io;function u(){for(let _ of Array.from(s))try{_()}catch{}}function d(){o=Array.from(r.values()).sort(a)}function p(_){if(l||!_||_.id!==e)return;let m=Number(_.revision)||0;if(n("apply %s rev=%d",_.type,m),!(m<=i&&_.type!=="snapshot")){if(_.type==="snapshot"){if(m<=i)return;r.clear();let y=Array.isArray(_.issues)?_.issues:[];for(let C of y)C&&typeof C.id=="string"&&C.id.length>0&&r.set(C.id,C);d(),i=m,u();return}if(_.type==="upsert"){let y=_.issue;if(y&&typeof y.id=="string"&&y.id.length>0){let C=r.get(y.id);if(!C)r.set(y.id,y);else{let R=Number.isFinite(C.updated_at)?C.updated_at:0,V=Number.isFinite(y.updated_at)?y.updated_at:0;if(R<=V){for(let te of Object.keys(C))te in y||delete C[te];for(let[te,W]of Object.entries(y))C[te]=W}}d()}i=m,u()}else if(_.type==="delete"){let y=String(_.issue_id||"");y&&(r.delete(y),d()),i=m,u()}}}return{id:e,subscribe(_){return s.add(_),()=>{s.delete(_)}},applyPush:p,snapshot(){return o},size(){return r.size},getById(_){return r.get(_)},dispose(){l=!0,r.clear(),o=[],s.clear(),i=0}}}function qs(e){let t=String(e.type||"").trim(),n={};if(e.params&&typeof e.params=="object"){let o=Object.keys(e.params).sort();for(let i of o){let s=e.params[i];n[i]=String(s)}}let r=new URLSearchParams(n).toString();return r.length>0?`${t}?${r}`:t}function Nc(e){let t=Ht("subs"),n=new Map,r=new Map;function o(l,a){t("applyDelta %s +%d ~%d -%d",l,(a.added||[]).length,(a.updated||[]).length,(a.removed||[]).length);let u=r.get(l);if(!u||u.size===0)return;let d=Array.isArray(a.added)?a.added:[],p=Array.isArray(a.updated)?a.updated:[],_=Array.isArray(a.removed)?a.removed:[];for(let m of Array.from(u)){let y=n.get(m);if(!y)continue;let C=y.itemsById;for(let R of d)typeof R=="string"&&R.length>0&&C.set(R,!0);for(let R of p)typeof R=="string"&&R.length>0&&C.set(R,!0);for(let R of _)typeof R=="string"&&R.length>0&&C.delete(R)}}async function i(l,a){let u=qs(a);if(t("subscribe %s key=%s",l,u),!n.has(l))n.set(l,{key:u,itemsById:new Map});else{let p=n.get(l);if(p&&p.key!==u){let _=r.get(p.key);_&&(_.delete(l),_.size===0&&r.delete(p.key)),n.set(l,{key:u,itemsById:new Map})}}r.has(u)||r.set(u,new Set);let d=r.get(u);d&&d.add(l);try{await e("subscribe-list",{id:l,type:a.type,params:a.params})}catch(p){let _=n.get(l)||null;if(_){let m=r.get(_.key);m&&(m.delete(l),m.size===0&&r.delete(_.key))}throw n.delete(l),p}return async()=>{t("unsubscribe %s key=%s",l,u);try{await e("unsubscribe-list",{id:l})}catch{}let p=n.get(l)||null;if(p){let _=r.get(p.key);_&&(_.delete(l),_.size===0&&r.delete(p.key))}n.delete(l)}}return{subscribeList:i,_applyDelta:o,_subKeyOf:qs,selectors:{getIds(l){let a=n.get(l);return a?Array.from(a.itemsById.keys()):[]},has(l,a){let u=n.get(l);return u?u.itemsById.has(a):!1},count(l){let a=n.get(l);return a?a.itemsById.size:0},getItemsById(l){let a=n.get(l),u={};if(!a)return u;for(let d of a.itemsById.keys())u[d]=!0;return u}}}}function jc(){let e=Ht("issue-stores"),t=new Map,n=new Map,r=new Set,o=new Map;function i(){for(let a of Array.from(r))try{a()}catch{}}function s(a,u,d){let p=u?qs(u):"",_=n.get(a)||"",m=t.has(a);if(e("register %s key=%s (prev=%s)",a,p,_),m&&_&&p&&_!==p){let y=t.get(a);if(y)try{y.dispose()}catch{}let C=o.get(a);if(C){try{C()}catch{}o.delete(a)}let R=$a(a,d);t.set(a,R);let V=R.subscribe(()=>i());o.set(a,V)}else if(!m){let y=$a(a,d);t.set(a,y);let C=y.subscribe(()=>i());o.set(a,C)}return n.set(a,p),()=>l(a)}function l(a){e("unregister %s",a),n.delete(a);let u=t.get(a);u&&(u.dispose(),t.delete(a));let d=o.get(a);if(d){try{d()}catch{}o.delete(a)}}return{register:s,unregister:l,getStore(a){return t.get(a)||null},snapshotFor(a){let u=t.get(a);return u?u.snapshot().slice():[]},subscribe(a){return r.add(a),()=>r.delete(a)}}}function Fc(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function Bc(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function xa(e,t){return`#/${e==="worker"||e==="monitor"?e:"board"}?issue=${encodeURIComponent(t)}`}function fm(e){let t=String(e||""),n=t.startsWith("#")?t.slice(1):t,r=n.indexOf("?"),o=r>=0?n.slice(r+1):"";if(o){let l=new URLSearchParams(o).get("issue");if(l)return decodeURIComponent(l)}let i=/^\/issue\/([^\s?#]+)/.exec(n);return i&&i[1]?decodeURIComponent(i[1]):null}function _m(e){let t=String(e||"");return/^#\/worker(\b|\/|$)/.test(t)?"worker":/^#\/monitor(\b|\/|$)/.test(t)?"monitor":"board"}function Uc(e){let t=Ht("router"),n=()=>{let r=window.location.hash||"",o=/^#\/issue\/([^\s?#]+)/.exec(r),i=o&&o[1]?decodeURIComponent(o[1]):fm(r),s=_m(r);if(t("hash change \u2192 view=%s id=%s",s,i),e.setState({selected_id:s==="worker"?null:i,view:s,worker:{selected_parent_id:s==="worker"?i:null}}),!!o||/^#\/(issues|epics)(\b|\/|\?|$)/.test(r)){let a=i?`#/${s}?issue=${encodeURIComponent(i)}`:`#/${s}`;window.location.hash!==a&&(window.location.hash=a)}};return{start(){window.addEventListener("hashchange",n),n()},stop(){window.removeEventListener("hashchange",n)},gotoIssue(r){let o=e.getState?e.getState():{view:"board"},i=o.view==="worker"||o.view==="monitor"?o.view:"board",s=xa(i,r);t("goto issue %s (view=%s)",r,i),window.location.hash!==s?window.location.hash=s:e.setState({selected_id:i==="worker"?null:r,view:i,worker:{selected_parent_id:i==="worker"?r:null}})},gotoView(r){let o=e.getState?e.getState():{selected_id:null,worker:{selected_parent_id:null}},i=r==="worker"?o.worker?.selected_parent_id:o.selected_id,s=i?xa(r,i):`#/${r}`;t("goto view %s (id=%s)",r,i||""),window.location.hash!==s?window.location.hash=s:e.setState({view:r,selected_id:r==="worker"?null:o.selected_id})}}}var mm=Object.freeze({workspace_config:{default_workspace:null}});function Wc(e){return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:mm.workspace_config.default_workspace}}}function zc(e={}){let t=Ht("state"),n={selected_id:e.selected_id??null,view:e.view??"board",filters:{status:e.filters?.status??"all",search:e.filters?.search??"",type:typeof e.filters?.type=="string"?e.filters?.type:""},board:{closed_filter:e.board?.closed_filter==="3"||e.board?.closed_filter==="7"||e.board?.closed_filter==="today"?e.board?.closed_filter:"today"},worker:{selected_parent_id:e.worker?.selected_parent_id??null,show_closed_children:Array.isArray(e.worker?.show_closed_children)?e.worker.show_closed_children:[]},workspace:{current:e.workspace?.current??null,available:e.workspace?.available??[],hidden:e.workspace?.hidden??[]},config:Wc(e.config)},r=new Set;function o(){for(let i of Array.from(r))try{i(n)}catch{}}return{getState(){return n},setState(i){let s={...n,...i,filters:{...n.filters,...i.filters||{}},board:{...n.board,...i.board||{}},worker:{...n.worker,...i.worker||{}},workspace:{current:i.workspace?.current!==void 0?i.workspace.current:n.workspace.current,available:i.workspace?.available!==void 0?i.workspace.available:n.workspace.available,hidden:i.workspace?.hidden!==void 0?i.workspace.hidden:n.workspace.hidden},config:i.config!==void 0?Wc(i.config):n.config},l=s.workspace.current?.path!==n.workspace.current?.path||s.workspace.available.length!==n.workspace.available.length||s.workspace.hidden.length!==n.workspace.hidden.length||s.workspace.hidden.some((u,d)=>u!==n.workspace.hidden[d]),a=s.config.workspace_config.default_workspace!==n.config.workspace_config.default_workspace;s.selected_id===n.selected_id&&s.view===n.view&&s.filters.status===n.filters.status&&s.filters.search===n.filters.search&&s.filters.type===n.filters.type&&s.board.closed_filter===n.board.closed_filter&&s.worker.selected_parent_id===n.worker.selected_parent_id&&s.worker.show_closed_children.length===n.worker.show_closed_children.length&&s.worker.show_closed_children.every((u,d)=>u===n.worker.show_closed_children[d])&&!l&&!a||(n=s,t("state change %o",{selected_id:n.selected_id,view:n.view,filters:n.filters,board:n.board,worker:n.worker,workspace:n.workspace.current?.path,config:{default_workspace:n.config.workspace_config.default_workspace}}),o())},subscribe(i){return r.add(i),()=>r.delete(i)}}}function Hc(e){let t=Ht("activity"),n=0,r=new Map,o=1;function i(){if(!e)return;let u=n>0;e.toggleAttribute("hidden",!u),e.setAttribute("aria-busy",u?"true":"false")}function s(){n+=1,t("start count=%d",n),i()}function l(){let u=n;n=Math.max(0,n-1),u<=0?t("done called but count was already %d",u):t("done count=%d\u2192%d",u,n),i()}function a(u){return async(p,_)=>{let m=o++,y=Date.now();r.set(m,{type:p,start_ts:y}),t("request start id=%d type=%s count=%d",m,p,n+1),s();let C=!1,R=()=>{C||(C=!0,r.delete(m),l())},V=setTimeout(()=>{C||(t("request TIMEOUT id=%d type=%s elapsed=%dms",m,p,Date.now()-y),R())},3e4);try{let te=await u(p,_),W=Date.now()-y;return t("request done id=%d type=%s elapsed=%dms",m,p,W),te}catch(te){let W=Date.now()-y;throw t("request error id=%d type=%s elapsed=%dms err=%o",m,p,W,te),te}finally{clearTimeout(V),R()}}}return i(),{wrapSend:a,start:s,done:l,getCount:()=>n,getActiveRequests:()=>{let u=Date.now();return Array.from(r.entries()).map(([d,p])=>({id:d,type:p.type,elapsed_ms:u-p.start_ts}))}}}function me(e,t="info",n=2800){let r=document.createElement("div");r.className="toast",r.textContent=e,r.style.position="fixed",r.style.right="12px",r.style.bottom="12px",r.style.zIndex="1000",r.style.color="#fff",r.style.padding="8px 10px",r.style.borderRadius="4px",r.style.fontSize="12px",t==="success"?r.style.background="#156d36":t==="warning"?r.style.background="#a36a00":t==="error"?r.style.background="#9f2011":r.style.background="rgba(0,0,0,0.85)",(document.body||document.documentElement).appendChild(r),setTimeout(()=>{try{r.remove()}catch{}},n)}function no(e=void 0,t=void 0){function n(){if(!t||typeof t.get!="function")return null;let i=t.get();return i&&i.order?i.order:{}}function r(i,s,l){let a=e&&e.snapshotFor?e.snapshotFor(i).slice():[];if(s==="closed")return a.sort(Dc),a;switch(l){case"created_desc":return a.sort(Io),a;case"created_asc":return a.sort(Rc),a;case"updated_desc":return a.sort(Ic),a;case"priority":return a.sort(Lc),a;case"manual":default:{let u=n();return u?a.sort(qc(u)):a.sort(Io),a}}}function o(i){let s=[];return e&&typeof e.subscribe=="function"&&s.push(e.subscribe(i)),t&&typeof t.subscribe=="function"&&s.push(t.subscribe(i)),()=>{for(let l of s)try{l()}catch{}}}return{selectBoardColumn:r,subscribe:o}}function ur(e){if(!e)return null;if(typeof e=="number")return Number.isFinite(e)?e:null;let t=Date.parse(e);return Number.isFinite(t)?t:null}function nn(e){let t=ur(e);if(t===null)return"";let n=new Date(t),r=o=>String(o).padStart(2,"0");return`${n.getFullYear()}-${r(n.getMonth()+1)}-${r(n.getDate())} ${r(n.getHours())}:${r(n.getMinutes())}`}function mn(e,t){let n=ur(e);if(n===null)return"";let o=(typeof t=="number"?t:Date.now())-n;if(o<6e4)return"\uBC29\uAE08";let i=Math.floor(o/6e4);if(i<60)return`${i}\uBD84 \uC804`;let s=Math.floor(o/36e5);if(s<24)return`${s}\uC2DC\uAC04 \uC804`;let l=Math.floor(o/864e5);if(l<7)return`${l}\uC77C \uC804`;let a=Math.floor(l/7);if(l<30)return`${a}\uC8FC \uC804`;let u=Math.floor(l/30);return u<12?`${u}\uAC1C\uC6D4 \uC804`:`${Math.floor(l/365)}\uB144 \uC804`}function Kc(e){if(!Array.isArray(e))return null;let t=null,n=-1;for(let r of e){if(!r||r.status!=="in_progress")continue;let o=ur(r.updated_at)??0;if(t===null||o>n){t=r,n=o;continue}o===n&&String(r.id)<String(t.id)&&(t=r)}return t}function Ns(e){let t=e&&e.parent;return typeof t=="string"?t:t&&t.id?String(t.id):""}function js(e){let t=new Map;for(let r of e)r&&r.id&&!t.has(r.id)&&t.set(r.id,r);let n=new Map;for(let r of t.values()){let o=Ns(r);if(!o)continue;let i=n.get(o);i||(i=[],n.set(o,i)),i.push({id:r.id,title:r.title,status:r.status,metadata:r.metadata,workflow:r.workflow,created_at:r.created_at,updated_at:r.updated_at})}return n}function Fs(e,t){let n=e.get(t)||[],r=0;for(let i of n)(i.status==="resolved"||i.status==="closed")&&(r+=1);let o=Kc(n);return{total:n.length,count:r,current:o,children:n}}function Gc(e){let t=e.transport,n=e.uiOrderStore;function r(s,l){return"renormalize"in s?s.renormalize:[{bead_id:l,rank:s.rank}]}function o(s,l){let a={...s.order};for(let u of l)a[u.bead_id]=u.rank;n&&n.set({revision:s.revision,order:a})}async function i(s,l,a){if(!t||!n)return;let u=n.get()||{revision:0,order:{}},d=r(wa(l,a,u.order),s);o(u,d);let p=await t("ui-order-set",{expected_revision:u.revision,entries:d});if(p&&p.conflict){let _={revision:typeof p.revision=="number"?p.revision:0,order:p.order||{}};n.set(_);let m=r(wa(l,a,_.order),s);o(_,m);let y=await t("ui-order-set",{expected_revision:_.revision,entries:m});y&&y.applied&&n.set({revision:typeof y.revision=="number"?y.revision:0,order:y.order||{}})}else p&&p.applied&&n.set({revision:typeof p.revision=="number"?p.revision:0,order:p.order||{}})}return{applyReorder:i}}function Yc(e){if(typeof e!="string")return"";let t=e.indexOf("-");return t>0?e.slice(0,t):""}function Jn(e,t){let n=Yc(e),r=Yc(t);return n.length===0||r.length===0?!1:n!==r}function Bs(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function Aa(e,t){return!t||typeof e!="string"||e.length===0||Bs(t.visible_labels).includes(e)?!0:Bs(t.hidden_labels).includes(e)?!1:!Bs(t.hidden_prefixes).some(n=>n.length>0&&e.startsWith(n))}function Vc(e,t){return Bs(e).filter(n=>Aa(n,t))}function dr(e,t){let n=e&&e.chips?e.chips[t]:void 0;return typeof n=="boolean"?n:!0}function gm(e){switch(e){case"in_progress":return"board-card__dot board-card__dot--progress";case"resolved":return"board-card__dot board-card__dot--resolved";case"closed":return"board-card__dot board-card__dot--closed";case"blocked":return"board-card__dot board-card__dot--blocked";default:return"board-card__dot"}}function hm(e,t,n,r,o){return c`<button
    type="button"
    class="board-card__roll-toggle"
    data-roll-parent=${e}
    aria-expanded=${r?"true":"false"}
    @click=${o}
  >
    children ${t}/${n} ${r?"\u25B4":"\u25BE"}
  </button>`}function bm(e,t,n,r){return c`<button
    type="button"
    class="board-card__roll-child"
    data-child-id=${e.id}
    @click=${r?o=>r(o,e.id):void 0}
  >
    <span class=${gm(e.status)}>●</span>
    <span class="board-card__roll-child-ord">${t}</span>
    <span class="board-card__roll-child-title">${e.title||e.id}</span>
    ${n}
  </button>`}function Us(e,t){let n=e.total||0,r=!!t.expanded,o=t.trailing??"",i=typeof t.empty_label=="string"&&t.empty_label.length>0?t.empty_label:null;if(n===0&&i===null)return"";let s=Array.isArray(e.children)?e.children:[],l=n>0?s.slice().sort(Mc):s;return c`
    <div class="board-card__roll">
      <div class="board-card__roll-meta">
        ${n>0?hm(t.parent_id,e.count,n,r,t.onToggle):c`<span class="board-card__roll-none">${i}</span>`}
        ${o}
      </div>
      ${n>0&&e.current?c`<div class="board-card__roll-current">
            └
            <span class="board-card__cur-child"
              >● ${e.current.title||e.current.id}</span
            >
          </div>`:""}
      ${r&&n>0?c`<div class="board-card__roll-list">
            ${l.map((a,u)=>bm(a,u+1,t.childChips?t.childChips(a):null,t.onChildClick))}
          </div>`:""}
    </div>
  `}var ym={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"mrg",close:"mrg"},Xc={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"merge",close:"close"},Qc={quick_fix:["impl","close"],spec_backed:["spec","impl","pr","merge"],full_plan:["spec","plan","impl","pr","merge"]},vm={review:"\u2713",skip:"\u2298"},pr={none:"\uBBF8\uB3C4\uB2EC",dim:"\uC9C4\uD589 \uC911",stale:"\uC7AC\uAC80\uD1A0 \uD544\uC694",review:"\uAC80\uD1A0 \uC644\uB8CC",skip:"\uAC80\uD1A0 \uC0DD\uB7B5",done:"\uC644\uB8CC"};function km(e,t,n){if(!(n==="in_progress"||n==="resolved"))return null;for(let o of e){let i=t[o];if(i&&i.fill==="dim"&&i.stale!==!0)return o}return null}function Zc(e){let t=e&&e.fill||"none";return t==="none"?pr.none:e&&e.stale===!0?pr.stale:t==="dim"?pr.dim:e&&e.glyph==="review"?pr.review:e&&e.glyph==="skip"?pr.skip:pr.done}function wm(e){if(!e||e.fill==="none"||!e.approval_state)return Zc(e);let t=[];return e.glyph==="review"?t.push(pr.review):e.glyph==="skip"&&t.push(pr.skip),e.approval_state==="missing"?t.push("\uC2B9\uC778 \uD544\uC694"):e.approval_state==="stale"?t.push("\uC7AC\uC2B9\uC778 \uD544\uC694"):e.approval_state==="unknown"?t.push("\uC2B9\uC778 \uD655\uC778 \uBD88\uAC00"):t.push("\uC2B9\uC778 \uC644\uB8CC"),t.join(" \xB7 ")}function $m(e,t,n,r){let o=ym[e]||e,i=t&&t.fill||"none",s=!!t&&t.stale===!0,l=vm[t&&t.glyph||""]||"",a="bar";i==="dim"?a+=` b-${o} dim`:i==="full"&&(a+=` b-${o} full`),s&&(a+=" stale"),n&&(a+=" cur");let u=i==="none"?"lbl":`lbl l-${o} on`,d=n?`color: var(--stage-${o}-on)`:"",p=Xc[e]||e,_=r?Jc(t):null;if(!_)return c`
      <div class="seg">
        <div class=${a} style=${d}>${l}</div>
        <div class=${u}>${p}</div>
      </div>
    `;let m=`${p} \uBB38\uC11C \uC5F4\uAE30 \xB7 ${_.path}`;return c`
    <button
      type="button"
      class="seg seg--doc"
      aria-label=${m}
      title=${m}
      @click=${y=>{y.preventDefault(),y.stopPropagation(),r(y,_,e)}}
    >
      <div class=${a} style=${d}>${l}</div>
      <div class=${u}>${p}</div>
    </button>
  `}function Jc(e){let t=e?e.doc:null;return!t||typeof t.path!="string"||t.path.length===0?null:t}function Ws(e,t,n={}){if(!e||!e.stages)return"";let r=n.onOpenDoc,o=Qc[e.route]||Qc.spec_backed,i=e.stages,s=km(o,i,String(t||"open")),l=`\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uC9C4\uD589: ${o.map(u=>`${Xc[u]||u} ${u==="plan"?wm(i[u]||{}):Zc(i[u]||{})}`).join(" \xB7 ")}`,a=!!r&&o.some(u=>Jc(i[u]||{})!==null);return c`
    <div
      class="stp"
      role=${a?"group":"img"}
      aria-label=${l}
    >
      ${o.map(u=>$m(u,i[u]||{},u===s,r))}
    </div>
  `}function xm(e){return typeof e!="number"||!Number.isFinite(e)?"":`P${Math.max(0,Math.min(4,e))}`}var eu=2;function tu(e){let t=e.slice(0,eu).join(", "),n=e.length-eu;return`\u26D3 blocked: ${t}${n>0?` +${n}`:""}`}function Am(e,t){if(!t)return[];let n=[],r=Array.isArray(t.blockers)?t.blockers:[],o=[],i=[];for(let s of r)(Jn(e,s)?i:o).push(s);return o.length>0&&n.push(c`<span class="ctl-chip ctl-chip--blocked-dep"
        >${tu(o)}</span
      >`),i.length>0&&n.push(c`<span class="ctl-chip ctl-chip--blocked-foreign"
        >${tu(i)}</span
      >`),n}function Sm(e){if(!e||typeof e!="object")return null;let t=e.awaiting_user;if(typeof t!="string")return null;let n=t.trim();return n.length===0?null:c`<span class="ctl-chip ctl-chip--blocked"
    >${`\u23F8 \uC0AC\uC6A9\uC790 \uB9AC\uBDF0 \uD544\uC694: ${n}`}</span
  >`}function Sa(e){return e==="delegated"?"\uC704\uC784":e==="main"?"\uBA54\uC778":null}function zs(e){return e.effort?`${e.actor}:${e.effort}`:e.actor}function er(e){return`${e.kind}:${zs(e)}@${e.sha}`}function Hs(e,t){if(!e)return null;let n=Sa(e.kind),r=e.reason,o=e.kind==="delegated"?r===null:typeof r=="string"&&r.trim().length>0&&!/[\r\n]/.test(r);if(!n||!o)return null;let i=Sa(t?.kind),s=i!==null&&t?.kind!==e.kind,l=`\uACC4\uD68D \xB7 ${n}${s?` \u2192 ${i}`:""}`,a=`planned_execution ${e.kind}${typeof r=="string"?`:${r}`:""}`,u=t?` \xB7 exec_receipt ${er(t)}`:"";return{kind:e.kind,label:l,title:`${a}${u}`}}function nu(e,t){let n=Hs(e,t);return n?c`<span
        class="ctl-chip ctl-chip--planned"
        data-kind=${n.kind}
        title=${n.title}
        >${n.label}</span
      >`:null}function Em(e){if(!e)return null;let t=Sa(e.kind);return t?c`<span
    class="ctl-chip ctl-chip--exec-receipt"
    title=${`exec_receipt ${er(e)}`}
    >${`\uC2E4\uD589 \xB7 ${t}`}</span
  >`:null}function Tm(e,t){let n=t.policy||null,r=e.workflow&&e.workflow.chips||{},o=[];if(r.route&&dr(n,"route")){let l=r.route_source==="derived";o.push(c`<span
        class="ctl-chip ctl-chip--route${l?" is-derived":""}"
        title=${l?"route \uBBF8\uD540 (metadata unset)":"route"}
        >${l?"unset":r.route}</span
      >`)}if(r.fast_track&&dr(n,"fast_track")&&o.push(c`<span class="ctl-chip ctl-chip--ft">⚡ fast_track</span>`),r.pr&&dr(n,"pr")){let l=r.pr.number;o.push(c`<span class="ctl-chip ctl-chip--pr"
        >${`PR${l!=null?` #${l}`:""}`}</span
      >`)}let i=nu(r.planned_execution,r.exec_receipt);if(i&&o.push(i),r.exec_receipt){let l=r.exec_receipt;o.push(c`<span
        class="ctl-chip ctl-chip--exec-receipt"
        title=${`exec_receipt ${er(l)}`}
        >${`exec ${l.kind==="delegated"?zs(l):`main:${l.actor}`} \xB7 ${l.sha.slice(0,7)}`}</span
      >`)}if(r.impl_entry){let l=r.impl_entry;o.push(c`<span
        class="ctl-chip ctl-chip--impl-entry"
        title=${`impl_entry ${l.actor}@${l.sha}`}
        >${`impl ${l.actor} \xB7 ${l.sha.slice(0,7)}`}</span
      >`)}for(let l of Vc(e.labels,n))o.push(c`<span class="ctl-chip ctl-chip--label">${l}</span>`);if(e.from_id&&dr(n,"from")&&o.push(c`<button
        type="button"
        class="ctl-chip ctl-chip--from"
        title=${`\uCD9C\uCC98 ${e.from_id} \uC5F4\uAE30`}
        @click=${l=>{l.stopPropagation(),t.onFromChipClick&&t.onFromChipClick(l,String(e.from_id))}}
      >
        ↩ from ${e.from_id}
      </button>`),dr(n,"blocked")){let l=Sm(e.metadata);l&&o.push(l),o.push(...Am(e.id,e.blocked_info))}return t.cleanupFailureFor&&t.cleanupFailureFor(e.id)&&dr(n,"blocked")&&o.push(c`<span class="ctl-chip ctl-chip--cleanup">⚠ 정리 멈춤</span>`),o.length===0?"":c`<div class="board-card__chips">${o}</div>`}function Cm(e){let t=mn(e.created_at),n=mn(e.updated_at);return!t&&!n?"":c`<span class="board-card__times">
    ${t?c`<span
          class="board-card__time"
          title=${`\uC0DD\uC131 ${nn(e.created_at)}`}
          >생성 ${t}</span
        >`:""}
    ${t&&n?c`<span class="board-card__time-sep">·</span>`:""}
    ${n?c`<span
          class="board-card__time"
          title=${`\uC218\uC815 ${nn(e.updated_at)}`}
          >수정 ${n}</span
        >`:""}
  </span>`}function Om(e,t){let n=t.rollupFor?t.rollupFor(e.id):{total:0,count:0,current:null,children:[]};return Us(n,{parent_id:e.id,expanded:t.isExpanded?t.isExpanded(e.id):!0,trailing:Cm(e),empty_label:"children \uC5C6\uC74C",childChips:Ea,onToggle:r=>t.onRollupToggle&&t.onRollupToggle(r,e.id),onChildClick:(r,o)=>t.onChildClick&&t.onChildClick(r,o)})}function Ea(e){let t=e?.workflow?.chips?.planned_execution,n=e?.workflow?.chips?.exec_receipt;return Hs(t,n)?c`<span class="board-card__roll-child-chips">
    ${nu(t,n)}
    ${Em(n)}
  </span>`:null}function Ks(e,t){let n=xm(e.priority);return c`
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
      ${Tm(e,t)}
      ${e.workflow&&dr(t.policy||null,"stepper")?Ws(e.workflow,e.status,{onOpenDoc:t.onOpenDoc}):""}
      ${Om(e,t)}
    </article>
  `}function ro(e,t){let n=Array.isArray(e.items)?e.items.length:0,r=e.is_closed===!0;return c`
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
              ${_c.map(i=>c`<option
                    value=${i.value}
                    ?selected=${i.value===e.closed_range}
                  >
                    ${i.label}
                  </option>`)}
            </select>`:""}
      </header>
      <div
        class="board-column__body"
        role="list"
        aria-labelledby=${e.id+"-header"}
      >
        ${e.items.map(i=>Ks(i,t))}
      </div>
    </section>
  `}function ru(e,t,n){return c`
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
          ${e.items.length===0?c`<div class="deferred-popup__empty">Deferred 이슈 없음</div>`:e.items.map(r=>Ks(r,t))}
        </div>
      </div>
    </dialog>
  `}var Rm=[{value:"",label:"\uC6B0\uC120\uC21C\uC704"},{value:"0",label:"P0"},{value:"1",label:"P1"},{value:"2",label:"P2"},{value:"3",label:"P3"},{value:"4",label:"P4"}],Im=[{value:"",label:"\uD0C0\uC785"},{value:"bug",label:"bug"},{value:"feature",label:"feature"},{value:"task",label:"task"},{value:"epic",label:"epic"},{value:"chore",label:"chore"}],Lm=[{value:"created_desc",label:"\uC0DD\uC131 \uCD5C\uC2E0\uC21C"},{value:"created_asc",label:"\uC0DD\uC131 \uC624\uB798\uB41C\uC21C"},{value:"updated_desc",label:"\uC218\uC815 \uCD5C\uC2E0\uC21C"},{value:"priority",label:"\uC6B0\uC120\uC21C\uC704\uC21C"},{value:"manual",label:"\uC218\uB3D9(\uB4DC\uB798\uADF8)"}];function Dm(e,t,n){let r=e.labels.length,o=r>0?`\uB77C\uBCA8 ${r}`:"\uB77C\uBCA8";return c`
    <div class="board-filter__labels">
      <button
        type="button"
        class=${r>0?"board-filter__label-btn is-on":"board-filter__label-btn"}
        aria-haspopup="true"
        aria-expanded=${n.label_menu_open?"true":"false"}
        @click=${t.onLabelMenuToggle}
      >
        ${o} ▾
      </button>
      ${n.label_menu_open?c`<div class="board-filter__label-menu" role="group">
            ${n.label_options.length===0?c`<div class="board-filter__label-empty">라벨 없음</div>`:n.label_options.map(i=>c`<label class="board-filter__label-row">
                      <input
                        type="checkbox"
                        .checked=${e.labels.includes(i)}
                        @change=${()=>t.onLabelToggle(i)}
                      />
                      <span>${i}</span>
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
  `}function ou(e,t,n){return c`
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
        ${Rm.map(r=>c`<option
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
        ${Im.map(r=>c`<option
              value=${r.value}
              ?selected=${e.type===r.value}
            >
              ${r.label}
            </option>`)}
      </select>
      ${Dm(e,t,n)}
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
        ${Lm.map(r=>c`<option
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
  `}var Pm=200,Mm={"ready-col":"open","in-progress-col":"in_progress","resolved-col":"resolved","closed-col":"closed"},qm=new Set(["blocked-col","ready-col","in-progress-col","resolved-col"]),su="beads-ui.board.sort",iu=new Set(["created_desc","created_asc","updated_desc","priority","manual"]);function Nm(){try{let e=window.localStorage.getItem(su);if(e&&iu.has(e))return e}catch{}return"created_desc"}function au(e,t){let n=Ht("views:board"),r=t.gotoIssue,o=t.issueStores,i=t.transport,s=t.uiOrderStore,l=t.displayPolicyStore,a=t.workerQueueStore,u=t.onClosedRangeChange,d=t.onNewIssue,p=t.openDoc,_=t.closedRange||Ls,m=o?no(o,s):null,y=Gc({transport:i,uiOrderStore:s}),C=[],R=[],V=[],te=[],W=[],M=[],I=!1,L=0,U=Nm(),Y=new Map,q=new Map,N=new Map,z=new Set,G={search:"",priority:"",type:"",labels:[]},oe=!1,ye=null;function Me(de){return String(de.status||"open")==="open"}function F(de){return String(de.status||"open")==="open"}function X(de){let ke=G.search.trim().toLowerCase(),Ue=G.priority,rt=G.type,et=G.labels;return de.filter(je=>{if(ke){let x=String(je.id||"").toLowerCase(),j=String(je.title||"").toLowerCase();if(!x.includes(ke)&&!j.includes(ke))return!1}if(Ue!==""&&String(je.priority)!==Ue||rt!==""&&String(je.issue_type||"")!==rt)return!1;if(et.length>0){let x=Array.isArray(je.labels)?je.labels:[];if(!et.some(j=>x.includes(j)))return!1}return!0})}function Ae(){let de=new Set;for(let ke of[C,R,V,te,W,M])for(let Ue of ke){let rt=Array.isArray(Ue.labels)?Ue.labels:[];for(let et of rt)typeof et=="string"&&et.length>0&&de.add(et)}return Array.from(de).sort()}function Ee(){return G.search.trim()!==""||G.priority!==""||G.type!==""||G.labels.length>0}function O(){try{if(m){let de=m.selectBoardColumn("tab:board:in-progress","in_progress",U),ke=m.selectBoardColumn("tab:board:blocked","blocked",U).filter(F),Ue=new Set(de.map(le=>le.id)),rt=m.selectBoardColumn("tab:board:ready","ready",U).filter(le=>Me(le)&&!Ue.has(le.id)),et=m.selectBoardColumn("tab:board:resolved","resolved",U),je=m.selectBoardColumn("tab:board:deferred","deferred",U),x=m.selectBoardColumn("tab:board:closed","closed").slice(0,Pm),j=[...ke,...rt,...de,...et,...x];se(j);let ae=new Set;for(let le of j)le&&le.id&&!Ns(le)&&ae.add(le.id);let ge=!Ee();C=ge?Lo(ke,ae):ke,R=ge?Lo(rt,ae):rt,V=ge?Lo(de,ae):de,te=ge?Lo(et,ae):et,W=je,L=je.length,M=ge?Lo(x,ae):x,Y=new Map;for(let le of C)Y.set(le.id,"open");for(let le of R)Y.set(le.id,"open");for(let le of V)Y.set(le.id,"in_progress");for(let le of te)Y.set(le.id,"resolved");for(let le of W)Y.set(le.id,"deferred");for(let le of M)Y.set(le.id,"closed");q=new Map;for(let le of C)q.set(le.id,"blocked-col");for(let le of R)q.set(le.id,"ready-col");for(let le of V)q.set(le.id,"in-progress-col");for(let le of te)q.set(le.id,"resolved-col");for(let le of M)q.set(le.id,"closed-col")}Ie()}catch{C=[],R=[],V=[],te=[],W=[],M=[],N=new Map,Ie()}}function se(de){N=js(de)}function be(de){return Fs(N,de)}function ve(de){return!z.has(de)}function Pe(de,ke){de.preventDefault(),de.stopPropagation(),z.has(ke)?z.delete(ke):z.add(ke),Ie()}function he(de,ke){de.preventDefault(),de.stopPropagation(),r(ke)}function Re(de,ke){de.preventDefault(),de.stopPropagation(),r(ke)}function Xe(de,ke){ye||r(ke)}function dt(de,ke){de.preventDefault(),de.stopPropagation(),jm(ke).then(Ue=>{Ue&&me("\uBCF5\uC0AC\uB428","success",1200)})}function H(de,ke){ye=ke,de.dataTransfer&&(de.dataTransfer.setData("text/plain",ke),de.dataTransfer.effectAllowed="move"),de.target.classList.add("board-card--dragging")}function J(de){de.target.classList.remove("board-card--dragging"),Ut(),setTimeout(()=>{ye=null},0)}function re(de){let ke=String(de.target.value||"");!ke||ke===_||(_=ke,u&&u(ke),Ie())}function fe(){return l?l.get():null}function Se(de){let ke=a?a.get():null,Ue=ke?ke.cleanup_failed:null;if(!Ue||typeof Ue!="object"||Array.isArray(Ue))return null;let rt=Ue[de];return!rt||typeof rt!="object"||Array.isArray(rt)?null:rt}let _e={onCardClick:Xe,onCopyId:dt,onDragStart:H,onDragEnd:J,onClosedRangeChange:re,rollupFor:be,isExpanded:ve,onRollupToggle:Pe,onChildClick:he,onFromChipClick:Re,onOpenDoc:p?(de,ke)=>p(ke):void 0,cleanupFailureFor:Se,get policy(){return fe()}};function qe(de,ke){ye||(Ke(),r(ke))}function Fe(de,ke){de.preventDefault(),de.stopPropagation(),Ke(),r(ke)}let Ve={..._e,onCardClick:qe,onChildClick:Fe,onFromChipClick:Fe,onOpenDoc:p?(de,ke)=>{Ke(),p(ke)}:void 0,get policy(){return fe()}};function He(de){let ke=de.target,Ue=e.querySelector(".board-filter__labels");ke&&Ue&&Ue.contains(ke)||xe()}function ee(de){de.key==="Escape"&&xe()}function Q(){oe||(oe=!0,document.addEventListener("mousedown",He),document.addEventListener("keydown",ee),Ie())}function xe(){oe&&(oe=!1,document.removeEventListener("mousedown",He),document.removeEventListener("keydown",ee),Ie())}function mt(de){de.key==="Escape"&&Ke()}function ft(){I||(I=!0,document.addEventListener("keydown",mt),Ie())}function Ke(){I&&(I=!1,document.removeEventListener("keydown",mt),Ie())}let Je={onClose:Ke,onOverlayClick(de){de.target===de.currentTarget&&Ke()}},A={onSearchInput(de){G.search=String(de.target.value||""),O()},onPriorityChange(de){G.priority=String(de.target.value||""),O()},onTypeChange(de){G.type=String(de.target.value||""),O()},onSortChange(de){let ke=String(de.target.value||"");if(!(!iu.has(ke)||ke===U)){U=ke;try{window.localStorage.setItem(su,ke)}catch{}O()}},onDeferredToggle(){I?Ke():ft()},onLabelMenuToggle(){oe?xe():Q()},onLabelToggle(de){let ke=G.labels.indexOf(de);ke===-1?G.labels.push(de):G.labels.splice(ke,1),O()},onLabelClear(){G.labels.length!==0&&(G.labels=[],O())},onNewIssue(){d&&d()}};function Z(){return c`
      <div class="board-view">
        ${ou(G,A,{sort_mode:U,deferred_popup_open:I,deferred_count:L,label_options:Ae(),label_menu_open:oe})}
        <div class="board-root">
          ${ro({title:"Blocked",id:"blocked-col",items:X(C)},_e)}
          ${ro({title:"Ready",id:"ready-col",items:X(R)},_e)}
          ${ro({title:"In progress",id:"in-progress-col",items:X(V)},_e)}
          ${ro({title:"Resolved",id:"resolved-col",items:X(te)},_e)}
          ${ro({title:"Closed",id:"closed-col",items:X(M),is_closed:!0,closed_range:_},_e)}
        </div>
        ${I?ru({items:X(W),count:L},Ve,Je):""}
      </div>
    `}function Ie(){pt(Z(),e),Ge()}function Ge(){try{let de=e.querySelector("#deferred-popup");de&&!de.open&&(typeof de.showModal=="function"?de.showModal():de.setAttribute("open",""));let ke=Array.from(e.querySelectorAll(".board-column, .deferred-popup__body"));for(let Ue of ke)Array.from(Ue.querySelectorAll(".board-card")).forEach((et,je)=>{et.tabIndex=je===0?0:-1})}catch{}}async function tt(de,ke){if(!i){me("\uC5F0\uACB0\uB418\uC9C0 \uC54A\uC544 \uC0C1\uD0DC\uB97C \uBCC0\uACBD\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error");return}try{await i("update-status",{id:de,status:ke}),me("\uC0C1\uD0DC \uBCC0\uACBD\uB428","success",1500)}catch(Ue){n("update-status failed: %o",Ue),me("\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328","error")}}function Ce(de){switch(de){case"blocked-col":return C;case"ready-col":return R;case"in-progress-col":return V;case"resolved-col":return te;default:return[]}}function Ze(de,ke,Ue){if(!i||!s)return;let rt=Ce(de),et=rt.find(ge=>ge.id===ke);if(!et)return;let je=rt.filter(ge=>ge.id!==ke),x=Ue.closest?Ue.closest(".board-card"):null,j=je.length;if(x){let ge=x.getAttribute("data-issue-id");if(ge===ke)return;let le=je.findIndex(it=>it.id===ge);le>=0&&(j=le)}let ae=je.slice();ae.splice(j,0,et),y.applyReorder(ke,ae,j)}function Ut(){for(let de of Array.from(e.querySelectorAll(".board-column--drag-over")))de.classList.remove("board-column--drag-over")}let wt=null;e.addEventListener("dragover",de=>{de.preventDefault(),de.dataTransfer&&(de.dataTransfer.dropEffect="move");let Ue=de.target.closest(".board-column");Ue&&Ue!==wt&&(wt&&wt.classList.remove("board-column--drag-over"),Ue.classList.add("board-column--drag-over"),wt=Ue)}),e.addEventListener("dragleave",de=>{let ke=de.relatedTarget;(!ke||!e.contains(ke))&&wt&&(wt.classList.remove("board-column--drag-over"),wt=null)}),e.addEventListener("drop",de=>{de.preventDefault(),wt&&(wt.classList.remove("board-column--drag-over"),wt=null);let ke=de.target,Ue=ke.closest(".board-column");if(!Ue)return;let rt=de.dataTransfer?.getData("text/plain")||"";if(!rt)return;let et=Ue.id,je=q.get(rt);if(je&&je===et){if(qm.has(et)){if(U!=="manual"){me("\uC218\uB3D9(\uB4DC\uB798\uADF8) \uC815\uB82C \uBAA8\uB4DC\uC5D0\uC11C\uB9CC \uC21C\uC11C\uB97C \uBC14\uAFC0 \uC218 \uC788\uC2B5\uB2C8\uB2E4","warning",2e3);return}Ze(et,rt,ke)}return}let x=Mm[et];if(!x){me("\uC5EC\uAE30\uB85C\uB294 \uC62E\uAE38 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","warning",1500);return}Y.get(rt)!==x&&tt(rt,x)}),e.addEventListener("keydown",de=>{let ke=de.target;if(!(ke instanceof HTMLElement))return;let Ue=String(ke.tagName||"").toLowerCase();if(Ue==="input"||Ue==="textarea"||Ue==="select"||Ue==="button"||Ue==="a"||ke.isContentEditable===!0)return;let rt=ke.closest(".board-card");if(!rt)return;let et=String(de.key||"");if(et==="Enter"||et===" "){de.preventDefault();let ae=rt.getAttribute("data-issue-id");ae&&r(ae);return}if(et!=="ArrowUp"&&et!=="ArrowDown"&&et!=="ArrowLeft"&&et!=="ArrowRight")return;de.preventDefault();let je=rt.closest(".board-column");if(!je)return;let x=Array.from(je.querySelectorAll(".board-card")),j=x.indexOf(rt);if(et==="ArrowDown"&&j<x.length-1){bt(rt,x[j+1]);return}if(et==="ArrowUp"&&j>0){bt(rt,x[j-1]);return}if(et==="ArrowLeft"||et==="ArrowRight"){let ae=Array.from(e.querySelectorAll(".board-column")),ge=ae.indexOf(je),le=et==="ArrowRight"?1:-1,it=ge+le;for(;it>=0&&it<ae.length;){let It=ae[it].querySelector(".board-card");if(It){bt(rt,It);return}it+=le}}});function bt(de,ke){try{de.tabIndex=-1,ke.tabIndex=0,ke.focus()}catch{}}let Ft=null;m&&m.subscribe&&(Ft=m.subscribe(()=>{try{O()}catch{}}));let Ct=null;l&&l.subscribe&&(Ct=l.subscribe(()=>{try{O()}catch{}}));let Mt=null;return a&&a.subscribe&&(Mt=a.subscribe(()=>{Ie()})),{async load(){n("load"),O()},clear(){xe(),Ke(),Ft&&(Ft(),Ft=null),Ct&&(Ct(),Ct=null),Mt&&(Mt(),Mt=null),e.replaceChildren(),C=[],R=[],V=[],te=[],W=[],M=[],Y=new Map,q=new Map}}}function Lo(e,t){return e.filter(n=>{let r=Ns(n);return!(r&&t.has(r))})}async function jm(e){try{if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")return await navigator.clipboard.writeText(String(e)),!0;let t=document.createElement("textarea");t.value=String(e),t.style.position="fixed",t.style.left="-9999px",document.body.appendChild(t),t.select();let n=!1;try{n=document.execCommand("copy")}finally{t.remove()}return n}catch{return!1}}var pn=e=>e??Yt;function Sn(e){return[typeof e.runner=="string"?e.runner:null,typeof e.model=="string"?e.model:null,typeof e.effort=="string"?e.effort:null,e.speed==="fast"?"Fast":null].filter(Boolean).join(" \xB7 ")}function Do(e){return typeof e.resumed_from!="string"||e.resumed_from.length===0?null:`${e.continuation_mode==="session"?"session \uC774\uC5B4\uBC1B\uC74C":e.continuation_mode==="fresh"?"\uC0C8 session\uC73C\uB85C \uC774\uC5B4\uBC1B\uC74C":"\uC774\uC804 attempt\uC5D0\uC11C \uC774\uC5B4\uBC1B\uC74C"} (from ${e.resumed_from})`}async function gn(e){let t=String(e);if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")try{return await navigator.clipboard.writeText(t),!0}catch{}try{let n=document.createElement("textarea");n.value=t,n.style.position="fixed",n.style.left="-9999px",document.body.appendChild(n),n.select();let r=!1;try{r=document.execCommand("copy")}finally{n.remove()}return r}catch{return!1}}var Fm=["workflow_mode","spec_review_model","spec_review_effort","spec_review_speed","plan_review_model","plan_review_effort","plan_review_speed","impl_review_model","impl_review_effort","impl_review_speed","impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed","quick_fix_impl_dispatch","quick_fix_impl_runtime","quick_fix_impl_model","quick_fix_impl_effort","quick_fix_impl_speed","orchestration_model","orchestration_effort","orchestration_speed","quick_fix_orchestration_model","quick_fix_orchestration_effort","quick_fix_orchestration_speed"],du=["orchestration_model","orchestration_effort","orchestration_speed"],pu=["quick_fix_orchestration_model","quick_fix_orchestration_effort","quick_fix_orchestration_speed"],Bm=[...du,...pu],lu={quick_fix_impl_dispatch:"impl_dispatch",quick_fix_impl_runtime:"impl_runtime",quick_fix_impl_model:"impl_model",quick_fix_impl_effort:"impl_effort",quick_fix_impl_speed:"impl_speed",quick_fix_orchestration_model:"orchestration_model",quick_fix_orchestration_effort:"orchestration_effort",quick_fix_orchestration_speed:"orchestration_speed"},cu={spec_review_effort:"spec_review_model",plan_review_effort:"plan_review_model",impl_review_effort:"impl_review_model"},uu={spec_review_speed:"spec_review_model",plan_review_speed:"plan_review_model",impl_review_speed:"impl_review_model"},Um=new Set(["native-fixed-posture","unsupported","claude-runner-model-default","catalog-validated","provider-tier-or-runtime-model-default","actual-effort"]);function tn(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function Tt(e){return typeof e=="string"&&e.length>0?e:null}function oo(e){return e.startsWith("gpt-")?e.slice(4):e}function ht(e,t,n,r,o){return{value:e,source:t,display:n,full_value:r,resolution:o}}function fu(e,t,n){let r=Tt(t[e]);if(r!==null)return{value:r,source:"pin"};let o=Tt(n[e]);return o===null?null:{value:o,source:"global"}}function fr(e,t,n,r){return fu(e,t,n)||{value:r,source:"base"}}function Ta(e,t,n,r){let o=n?.implementation?.model_catalog;if(t&&tn(o?.[t])){let s=Tt(o[t][e]);if(s!==null)return s}if(t&&Array.isArray(o?.[t])&&o[t].includes(e))return e;if(!t&&tn(o)){for(let s of Object.values(o))if(tn(s)){let l=Tt(s[e]);if(l!==null)return l}else if(Array.isArray(s)&&s.includes(e))return e}let i=r?.model_index?.[e];return Tt(r?.runners?.[i]?.models?.[e]?.id)||e}function Wm(e,t){return Tt(t?.review?.reviewers?.[e]?.model)||e}function Dn(e,t,n=!1){if(e==="default")return ht(e,t,`default (\uC77C\uBC18 \xB7 ${t==="pin"?"\uD540":"\uC804\uC5ED \uACE0\uC815"})`,e,"explicit");let r=n?oo(e):e;return ht(e,t,r,e,"explicit")}function _u(e,t,n){let r=t?.implementation?.model_catalog?.[e],o=[];tn(r)?o.push(...Object.keys(r)):Array.isArray(r)&&o.push(...r.filter(s=>typeof s=="string"));let i=n?.runners?.[e]?.models;if(tn(i))for(let s of Object.keys(i))o.includes(s)||o.push(s);return o}function zm(e,t){let n=[],r=e?.implementation?.model_catalog;tn(r)&&n.push(...Object.keys(r));let o=t?.runners;if(tn(o))for(let i of Object.keys(o))n.includes(i)||n.push(i);return n}function Hm(e,t,n){if(e===null)return{runtime:null,offered:!1};let r=!1;for(let o of zm(t,n)){let i=_u(o,t,n);if(i.length>0&&(r=!0),i.includes(e))return{runtime:o,offered:!0}}return{runtime:null,offered:r}}function Gs(e){return ht(e.value,e.source,`${e.value} (\uBE44\uD638\uD658)`,e.value,"incompatible")}function Ca(e,t,n){let r=fu(e,t,n);return r?Dn(r.value,r.source):ht(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable")}function En(e){let t=tn(e.pin)?e.pin:{},n=tn(e.global)?e.global:{},r=tn(e.execution_defaults)?e.execution_defaults:null,o=r?.supported===!0&&tn(r.session)?r.session:null,i=r?.supported===!0&&tn(r.orchestration)?r.orchestration:null,s=tn(e.runner_catalog)?e.runner_catalog:null,l=Tt(n.quick_fix_impl_model),a=Hm(l,o,s),u={};if(o){let d=fr("workflow_mode",t,n,Tt(o.workflow_mode_default));u.workflow_mode=d.source==="base"?ht(d.value,"base",d.value||"\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",d.value,"default"):Dn(d.value,d.source);for(let W of["spec_review","plan_review","impl_review"]){let M=`${W}_model`,I=Tt(W==="plan_review"?d.value==="fast_track"?o.plan_review?.fast_track_default:o.plan_review?.standard_recommended:o.review?.default),L=fr(M,t,n,I);if(L.value===null)u[M]=ht(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable");else if(L.value!=="self"&&L.value!=="skip"&&!tn(o.review?.reviewers?.[L.value]))u[M]=Gs(ht(L.value,L.source,"",null,"explicit"));else{let U=Wm(L.value,o);u[M]=ht(L.value,L.source,oo(U),U,L.source==="base"?"default":"explicit")}}for(let[W,M]of Object.entries(cu)){let I=u[M].value;if(I==="self"||I==="skip"){u[W]=ht(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable");continue}let L=Tt(o.review?.reviewers?.[I||""]?.effort),U=fr(W,t,n,L);u[W]=U.value===null?ht(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"):ht(U.value,U.source,U.value,U.value,U.source==="base"?"default":"explicit")}for(let[W,M]of Object.entries(uu)){let I=u[M];if(I.resolution==="incompatible"||I.value==="self"||I.value==="skip"){u[W]=ht(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable");continue}if(I.resolution==="unavailable"){u[W]=ht(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable");continue}let L=fr(W,t,n,"default");u[W]=L.source==="base"?ht("default","base","default (\uC77C\uBC18)","default","default"):Dn(L.value,L.source)}let p=tn(o.implementation?.default)?o.implementation.default:{},_=Tt(e.route),m=_!==null&&["quick_fix","spec_backed","full_plan"].includes(_),y=tn(o.implementation?.route_defaults)?o.implementation.route_defaults:{},C=m&&tn(y[_])?y[_]:{},R={},V=!1;if(_==="quick_fix"){let W=Tt(t.impl_runtime),M=Tt(n.quick_fix_impl_runtime),I=W||M,L=I==="inherit"?Tt(e.controller_runtime):I;V=l!==null&&a.runtime!==null&&(I===null||L===a.runtime);let U=Tt(t.impl_dispatch),Y=Tt(n.quick_fix_impl_dispatch);if(U!==null)u.impl_dispatch=Dn(U,"pin"),R.impl_dispatch="pin";else if(Y!==null)u.impl_dispatch=Dn(Y,"global"),R.impl_dispatch="quick_fix";else if(V)u.impl_dispatch=ht("delegated","global","\uC704\uC784 (\uBAA8\uB378 \uD568\uC758)","delegated","explicit"),R.impl_dispatch="implied";else{let q=Tt(C.dispatch)||Tt(p.dispatch);u.impl_dispatch=q?ht(q,"base",q,q,"default"):ht(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"),R.impl_dispatch="base"}if(W!==null)u.impl_runtime=Dn(W,"pin"),R.impl_runtime="pin";else if(M!==null)u.impl_runtime=Dn(M,"global"),R.impl_runtime="quick_fix";else if(V){let q=a.runtime;u.impl_runtime=ht(q,"global",`${q} (\uC720\uB3C4)`,q,"explicit"),R.impl_runtime="derived"}else{let q=fr("impl_runtime",{},n,Tt(p.runtime));u.impl_runtime=q.value===null?ht(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"):ht(q.value,q.source,q.value,q.value,q.source==="base"?"default":"explicit"),R.impl_runtime=q.source}for(let q of["impl_model","impl_effort","impl_speed"]){let N=Tt(t[q]),z=Tt(n[`quick_fix_${q}`]),G;N!==null?(G={value:N,source:"pin"},R[q]="pin"):q==="impl_model"&&V&&l!==null?(G={value:l,source:"global"},R[q]="quick_fix"):q!=="impl_model"&&z!==null?(G={value:z,source:"global"},R[q]="quick_fix"):(G=fr(q,{},n,Tt(p[q.replace("impl_","")])),R[q]=G.source),u[q]=G.value===null?ht(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"):ht(G.value,G.source,G.value,G.value,G.source==="base"?"default":"explicit")}}else for(let W of["impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"]){let M=fr(W,t,n,W==="impl_dispatch"?Tt(C.dispatch)||Tt(p.dispatch):Tt(p[W.replace("impl_","")]));u[W]=M.value===null?ht(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"):ht(M.value,M.source,M.value,M.value,M.source==="base"?"default":"explicit")}let te=u.impl_dispatch.value==="main";if(te?u.impl_dispatch.display=R.impl_dispatch==="quick_fix"?"\uBA54\uC778 (quick_fix)":"\uBA54\uC778":u.impl_dispatch.value==="delegated"&&(R.impl_dispatch==="quick_fix"?u.impl_dispatch.display="\uC704\uC784 (quick_fix)":R.impl_dispatch!=="implied"&&(u.impl_dispatch.display="\uC704\uC784")),u.impl_runtime.value==="inherit"&&(u.impl_runtime.display=e.controller_runtime?`inherit (${e.controller_runtime})`:"inherit (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_runtime.resolution="dynamic"),u.impl_model.value!==null){let W=u.impl_runtime.value==="inherit"?Tt(e.controller_runtime):u.impl_runtime.value,M=W?_u(W,o,s):[];_==="quick_fix"&&R.impl_model==="base"&&R.impl_runtime!=="base"&&M.length>0&&!M.includes(u.impl_model.value)&&(u.impl_model=ht("auto","base","auto","auto","default"));let I=u.impl_model.value;if(I!=="auto"&&M.length>0&&!M.includes(I))u.impl_model=Gs(u.impl_model);else{let L=Ta(I,W,o,s);u.impl_model.display=oo(L),u.impl_model.full_value=L,R.impl_model==="quick_fix"&&(u.impl_model.display=`${u.impl_model.display} (quick_fix)`)}}if(u.impl_effort.value==="auto"){let W=Tt(e.transport)||(u.impl_runtime.value==="codex"?"codex-native-spawn":u.impl_runtime.value==="claude"?"implement-claude":null),M=W?Tt(o.implementation?.effort_by_transport?.[W]?.auto):null;M&&!Um.has(M)?(u.impl_effort.display=`${M} (\uBE44\uD638\uD658)`,u.impl_effort.full_value=M,u.impl_effort.resolution="incompatible"):(u.impl_effort.display="auto (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_effort.resolution="dynamic")}R.impl_effort==="quick_fix"&&u.impl_effort.value!==null&&(u.impl_effort=ht(u.impl_effort.value,"global",`${u.impl_effort.value} (quick_fix)`,u.impl_effort.value,"explicit")),u.impl_speed.value==="default"&&(u.impl_speed=R.impl_speed==="quick_fix"?ht("default","global","default (quick_fix)","default","explicit"):u.impl_speed.source==="base"?ht("default","base","default (\uC77C\uBC18)","default","default"):Dn("default",u.impl_speed.source));for(let W of["impl_runtime","impl_effort","impl_speed"])R[W]==="quick_fix"&&u[W].value!==null&&!u[W].display.endsWith("(quick_fix)")&&(u[W].display=`${u[W].display} (quick_fix)`);if(_==="quick_fix"){l!==null&&!V&&a.offered&&(u.quick_fix_impl_model=Gs(ht(l,"global","",l,"explicit")));for(let[W,M]of Object.entries(lu))!W.startsWith("quick_fix_orchestration_")&&!Object.hasOwn(u,W)&&(u[W]={...u[M]});u.impl_dispatch.source==="base"&&u.impl_dispatch.value==="main"&&(u.quick_fix_impl_dispatch=ht("main","base","\uBA54\uC778 (\uD558\uB124\uC2A4)","main","default"))}if(te)for(let W of["impl_runtime","impl_model","impl_effort","impl_speed"])u[W]=ht(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable")}else for(let d of Fm.filter(p=>!Bm.includes(p)))u[d]=Ca(d,t,n);if(!o){for(let[d,p]of Object.entries(cu))(u[p].value==="self"||u[p].value==="skip")&&(u[d]=ht(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable"));for(let[d,p]of Object.entries(uu))(u[p].value==="self"||u[p].value==="skip")&&(u[d]=ht(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable"));if(u.impl_dispatch.value==="main"){u.impl_dispatch.display="\uBA54\uC778";for(let d of["impl_runtime","impl_model","impl_effort","impl_speed"])u[d]=ht(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable")}else u.impl_dispatch.value==="delegated"&&(u.impl_dispatch.display="\uC704\uC784"),u.impl_runtime.value==="inherit"&&(u.impl_runtime.display=e.controller_runtime?`inherit (${e.controller_runtime})`:"inherit (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_runtime.resolution="dynamic"),u.impl_effort.value==="auto"&&(u.impl_effort.display="auto (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_effort.resolution="dynamic")}for(let d of du){if(!i){u[d]=Ca(d,t,n);continue}let p=d.replace("orchestration_",""),_=Tt(i[p]),m=`quick_fix_${d}`,y=e.route==="quick_fix"?Tt(n[m]):null,C=Tt(t[d]),R=C!==null?{value:C,source:"pin"}:y!==null?{value:y,source:"global"}:fr(d,{},n,_),V=C===null&&y!==null;if(d==="orchestration_effort"&&R.source==="base"){u[d]=ht(null,"base","CLI \uAE30\uBCF8 (\uBBF8\uC9C0\uC815)",null,"default");continue}if(R.value===null){u[d]=ht(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable");continue}if(d==="orchestration_model"){let te=R.source==="base"?Tt(i.model_id)||R.value:Ta(R.value,null,o,s);u[d]=ht(R.value,R.source,`${oo(te)}${V?" (quick_fix)":""}`,te,R.source==="base"?"default":"explicit");continue}if(R.value==="default"){u[d]=V?ht("default","global","default (quick_fix)","default","explicit"):R.source==="base"?ht("default","base","default (\uC77C\uBC18)","default","default"):Dn("default",R.source);continue}u[d]=V?ht(R.value,"global",`${R.value} (quick_fix)`,R.value,"explicit"):Dn(R.value,R.source)}for(let d of pu){let p=lu[d];u[d]=u[p]?{...u[p]}:Ca(d,t,n)}if(o&&e.route!=="quick_fix")if(l===null){let d=u.orchestration_model.full_value;u.quick_fix_impl_model=ht(null,"base",d===null?"\uBA54\uC778":`\uBA54\uC778 (orchestration ${oo(d)})`,null,"default")}else if(a.runtime!==null){let d=Ta(l,a.runtime,o,s);u.quick_fix_impl_model=ht(l,"global",oo(d),d,"explicit")}else a.offered?u.quick_fix_impl_model=Gs(ht(l,"global","",null,"explicit")):u.quick_fix_impl_model=Dn(l,"global");return u}function Km(e,t){let n=t&&e.value==="default"?"default (\uC77C\uBC18)":e.display;if(!t||e.source==="pin")return`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 ${e.display}`;let r=e.source==="global"?"\uC804\uC5ED":"harness";return`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 ${n} (${r})`}function Ys(e){let t=tn(e.pin)?e.pin:{},n=tn(e.global)?e.global:{},r=tn(e.resolution_global)?{...e.resolution_global}:{};delete r[e.key];let o=p=>{let _={...r,...p};return En({pin:e.layer==="pin"?_:t,global:e.layer==="pin"?n:_,execution_defaults:e.execution_defaults,runner_catalog:e.runner_catalog,route:e.route,controller_runtime:e.controller_runtime})},i=e.layer==="pin"?t:n,s={...i};delete s[e.key];let l=o(s)[e.key],a=o(i)[e.key],u=Tt(i[e.key]),d=[...e.choices];return u!==null&&!d.includes(u)&&d.unshift(u),{unset_label:Km(l,e.layer==="pin"),full_value:l.full_value,unavailable:l.resolution==="unavailable",disabled:a?.resolution==="not_applicable",options:d.map(p=>{let _=o({...i,[e.key]:p})[e.key];return{value:p,label:_.display,full_value:_.full_value}})}}function Gm(e,t=document){let n=t.createElement("dialog");n.className="op-dialog continuation-dialog";let r=t.createElement("button"),o=t.createElement("button"),i=t.createElement("button"),s=t.createElement("h2"),l=t.createElement("p"),a=t.createElement("div");return a.className="op-dialog__actions",s.textContent="\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4",l.textContent=`${Sn(e.prior||{})||"\uC774\uC804 \uC124\uC815"} \u2192 ${Sn(e.current||{})||"\uD604\uC7AC \uC124\uC815"}`,r.type="button",r.className="op-btn",r.textContent="\uAE30\uC874 session \uC774\uC5B4\uD558\uAE30",r.disabled=e.prior_available===!1,o.type="button",o.className="op-btn",o.textContent="\uD604\uC7AC preset\uC73C\uB85C \uC0C8 session",i.type="button",i.className="op-btn",i.textContent="\uCDE8\uC18C",a.append(r,o,i),n.append(s,l,a),t.body.append(n),new Promise(u=>{let d=p=>{typeof n.close=="function"&&n.close(),n.remove(),u(p)};r.addEventListener("click",()=>d("prior_session")),o.addEventListener("click",()=>d("fresh_current")),i.addEventListener("click",()=>d(null)),n.addEventListener("cancel",p=>{p.preventDefault(),d(null)}),typeof n.showModal=="function"?n.showModal():n.setAttribute("open","")})}async function _r(e,t,n={}){let r=e;for(n.onResult?.(r);r?.continuation_mismatch;){let o=r.continuation_mismatch,i=await Gm(o);if(i===null)return r;r=await t(i,o.decision_token),n.onResult?.(r),r?.conflict&&n.refresh&&(r=await n.refresh(r),n.onResult?.(r))}return r}function mu(e,t=document){let n=e?.kind==="settlement",r=t.createElement("dialog");r.className="op-dialog resume-instructions-dialog";let o=t.createElement("h2"),i=t.createElement("textarea"),s=t.createElement("div"),l=t.createElement("button"),a=t.createElement("button"),u=[e?.bead_id,e?.tuple].filter(d=>typeof d=="string"&&d!=="").join(" \xB7 ");if(o.textContent=n?"\uCC29\uC9C0 \uC815\uC0B0 \uC7AC\uAC1C":"\uC138\uC158 \uC774\uC5B4\uD558\uAE30",i.placeholder="\uCD94\uAC00 \uC9C0\uCE68 (\uC120\uD0DD) \u2014 \uBE44\uC6CC\uB450\uBA74 \uAE30\uBCF8 \uC808\uCC28\uB85C \uC7AC\uAC1C",i.maxLength=4e3,s.className="op-dialog__actions resume-instructions-dialog__actions",l.type="button",l.className="op-btn op-btn--primary",l.textContent=n?"\uC815\uC0B0 \uC7AC\uAC1C":"\uC774\uC5B4\uD558\uAE30",a.type="button",a.className="op-btn",a.textContent="\uCDE8\uC18C",s.append(l,a),r.append(o),u!==""){let d=t.createElement("p");d.className="resume-instructions-dialog__target",d.textContent=u,r.append(d)}return r.append(i,s),t.body.append(r),new Promise(d=>{let p=!1,_=y=>{p||(p=!0,typeof r.close=="function"&&r.close(),r.remove(),d(y))},m=()=>_(i.value.trim());l.addEventListener("click",m),a.addEventListener("click",()=>_(null)),i.addEventListener("keydown",y=>{y.key==="Enter"&&(y.ctrlKey||y.metaKey)&&(y.preventDefault(),m())}),r.addEventListener("cancel",y=>{y.preventDefault(),_(null)}),typeof r.showModal=="function"?r.showModal():r.setAttribute("open",""),i.focus()})}async function so(e){let{context:t,transport:n,adopt:r}=e,o=await mu(t);if(o===null)return null;let i=o===""?{}:{instructions:o},s=await n({...i});if(r?.(s),s&&s.conflict&&(s=await n({...i}),r?.(s)),s=await _r(s,(l,a)=>n({...i,continuation:l,decision_token:a}),{onResult:r,refresh:()=>n({...i})}),s&&s.resumed===!1&&!s.conflict&&s.reason){let l=t?.kind==="settlement"?"\uC815\uC0B0 \uC7AC\uAC1C":"\uC774\uC5B4\uD558\uAE30";me(`${l} \uAC70\uBD80: ${s.reason}`,"error",2400)}return s}function Oa(e){return`session:${e.provider}:${e.session_id}`}function Po(e){return`${e.provider} \xB7 ${e.session_id.slice(0,8)}`}function Ym(e,t){return e.current&&t==="in_progress"&&e.locality==="local"?"running":"done"}function io(e,t,n,r){return{attempt_id:Oa(e),session_ref:{bead_id:t,provider:e.provider,session_id:e.session_id},...typeof r=="string"&&r.length>0?{root_dir:r}:{},hide_prompt:!0,meta:{runner:e.provider,label:Po(e),session_id:e.session_id,...typeof e.resume_command=="string"&&e.resume_command.length>0?{resume_command:e.resume_command}:{},status:Ym(e,n)}}}var Ra="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4",Vm="\uBD84\uD574 \uC5C6\uC74C \u2014 \uCD1D\uB7C9\uB9CC \uBCF4\uACE0\uB428",gu="\uBD84\uD574 \uC5C6\uB294 leg";function Zt(e){return typeof e=="number"&&Number.isFinite(e)?e:0}var Gn=["input_tokens","output_tokens","cache_read_input_tokens","cache_creation_input_tokens"],ao=[...Gn,"reasoning_output_tokens"],Qm={codex:["implementation","review-consult"],claude:["subagent"]};function Ia(e){return!e||typeof e!="object"?!1:Number.isFinite(e.total_tokens)&&!Gn.some(t=>Number.isFinite(e[t]))}function Xm(e){return!e||typeof e!="object"?!1:ao.some(t=>Number.isFinite(e[t]))}function La(e){let t=0;for(let n of Gn)t+=Zt(e?.[n]);return t}function Zm(e){return!e||typeof e!="object"?!1:Gn.some(t=>Number.isFinite(e[t]))}function hu(e){return!e||typeof e!="object"?!1:ao.some(t=>Number.isFinite(e[t]))||Number.isFinite(e.total_tokens)}function Jm(e){let t={};for(let n of ao)e&&Number.isFinite(e[n])&&(t[n]=e[n]);return t}function bu(e){let t={};for(let n of ao)Number.isFinite(e[n])&&(t[n]=e[n]);return Number.isFinite(e.total_tokens)&&(t.total_tokens=e.total_tokens),e.replayed===!0&&(t.replayed=!0),typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&(t.total_cost_usd=e.total_cost_usd),t}function yu(e,t){return Ia(t)?Zt(t.total_tokens):e==="codex"?Zt(t.input_tokens)+Zt(t.output_tokens):La(t)}function eg(e){return e==="claude"?"Claude":"Codex"}function tg(e){return`\u03C4 ${ku(e)}`}function ng(e,t){let n=t.breakdown||{},r=Zt(t.total_only_subtotal);if(Ia(n)||r>0&&!Xm(n)){let u=[`\uCD1D ${t.subtotal.toLocaleString("en-US")}`,Vm];return t.replayed&&u.push(Ra),u.join(`
`)}let o=[`\uC785\uB825 ${Zt(n.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${Zt(n.output_tokens).toLocaleString("en-US")}`];e==="claude"?o.push(`\uCE90\uC2DC\uC77D\uAE30 ${Zt(n.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${Zt(n.cache_creation_input_tokens).toLocaleString("en-US")}`):(o.push(`\uCE90\uC2DC\uC77D\uAE30 ${Zt(n.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC4F0\uAE30 ${Zt(n.cache_creation_input_tokens).toLocaleString("en-US")}`),Number.isFinite(n.reasoning_output_tokens)&&o.push(`\uCD94\uB860\uCD9C\uB825 ${Zt(n.reasoning_output_tokens).toLocaleString("en-US")}`)),r>0&&o.push(`${gu} ${r.toLocaleString("en-US")}`);let i=e==="claude"?"\uC785\uB825 + \uCD9C\uB825 + \uCE90\uC2DC\uC77D\uAE30 + \uCE90\uC2DC\uC0DD\uC131":"\uC785\uB825 + \uCD9C\uB825",s=r>0?`${i} + ${gu}`:i,a=[e==="claude"?`Claude subtotal = ${s}`:`Codex subtotal = ${s}; \uCE90\uC2DC\uC77D\uAE30\xB7\uCE90\uC2DC\uC4F0\uAE30\xB7\uCD94\uB860\uCD9C\uB825\uC740 subtotal\uC5D0 \uD3EC\uD568\uB418\uC9C0 \uC54A\uB294 subset`,`\uCD1D ${t.subtotal.toLocaleString("en-US")}`,o.join(" \xB7 ")];return typeof t.total_cost_usd=="number"&&Number.isFinite(t.total_cost_usd)&&a.push(`$${t.total_cost_usd.toFixed(2)}`),t.replayed&&a.push(Ra),a.join(`
`)}function un(e){let t=[];if(!e||typeof e!="object"||!("providers"in e)||!e.providers)return t;for(let n of["claude","codex"]){let r=e.providers[n];r&&t.push({provider:n,label:`${eg(n)} ${tg(r.subtotal)}${typeof r.total_cost_usd=="number"&&Number.isFinite(r.total_cost_usd)?` \xB7 $${r.total_cost_usd.toFixed(2)}`:""}`,tooltip:ng(n,r)})}return t}function Qs(e){let t={},n={claude:!0,codex:!1},r={claude:0,codex:0};for(let o of e)if(!(!o||!o.providers))for(let i of["claude","codex"]){let s=o.providers[i];if(!s)continue;let l=t[i];l||(l={subtotal:0,breakdown:{}},t[i]=l),l.subtotal+=s.subtotal,Number.isFinite(s.total_only_subtotal)&&(l.total_only_subtotal=Zt(l.total_only_subtotal)+Zt(s.total_only_subtotal));for(let a of ao)Number.isFinite(s.breakdown[a])&&(l.breakdown[a]=Zt(l.breakdown[a])+Zt(s.breakdown[a]));s.replayed&&(l.replayed=!0),i==="claude"&&(typeof s.total_cost_usd=="number"&&Number.isFinite(s.total_cost_usd)?r.claude+=s.total_cost_usd:n.claude=!1)}return t.claude&&n.claude&&(t.claude.total_cost_usd=r.claude),Object.keys(t).length===0?null:{providers:t,roles:{}}}function Da(e){return!e||typeof e!="object"?null:nr({attempt:{...e,bead_id:"__attempt__"}},"__attempt__")}function rg(e){return e==="codex"?"codex":"claude"}function Kn(){return{subtotal:0,breakdown:Jm(null),total_only:0,legs:[],replayed:!1,outer_count:0,outer_cost:0,outer_cost_count:0}}function Vs(e,t,n){e.subtotal+=t.subtotal,Ia(t.usage)&&(e.total_only+=t.subtotal);for(let r of ao)Number.isFinite(t.usage[r])&&(e.breakdown[r]=Zt(e.breakdown[r])+Zt(t.usage[r]));e.legs.push(t),t.replayed===!0&&(e.replayed=!0),n&&(e.outer_count+=1,typeof t.usage.total_cost_usd=="number"&&Number.isFinite(t.usage.total_cost_usd)&&(e.outer_cost+=t.usage.total_cost_usd,e.outer_cost_count+=1))}function vu(e,t){let n={subtotal:e.subtotal,breakdown:e.breakdown};return e.total_only>0&&(n.total_only_subtotal=e.total_only),t&&(n.legs=e.legs),e.replayed&&(n.replayed=!0),n}function ku(e){return e>=1e6?`${(e/1e6).toFixed(1)}M`:e>=1e3?`${(e/1e3).toFixed(1)}k`:String(e)}function lo(e){return Zm(e)?`\u03C4 ${ku(La(e))}`:null}function tr(e){let t=lo(e);if(!t)return null;let n=e?.total_cost_usd;return typeof n=="number"&&Number.isFinite(n)?`${t} \xB7 $${n.toFixed(2)}`:t}function Mo(e){if(!e||typeof e!="object")return"";let t=[`\uC785\uB825 ${Zt(e.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${Zt(e.output_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC77D\uAE30 ${Zt(e.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${Zt(e.cache_creation_input_tokens).toLocaleString("en-US")}`];typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&t.push(`$${e.total_cost_usd.toFixed(2)}`);let n=[`\uCD1D ${La(e).toLocaleString("en-US")}`,t.join(" \xB7 ")];return e.replayed&&n.push(Ra),n.join(`
`)}function nr(e,t){let n={claude:Kn(),codex:Kn()},r={orchestrator:{claude:Kn(),codex:Kn()},implementation:{claude:Kn(),codex:Kn()},"review-consult":{claude:Kn(),codex:Kn()},subagent:{claude:Kn(),codex:Kn()}},o=new Set;for(let l of Object.values(e||{})){if(!l||l.bead_id!==t)continue;let a=l.usage;if(hu(a)){let d=rg(l.runner),p=bu(a),_={provider:d,role:"orchestrator",attempt_id:String(l.attempt_id||""),usage:p,subtotal:yu(d,p)};p.replayed===!0&&(_.replayed=!0),typeof l.model=="string"&&(_.model=l.model),typeof l.session_id=="string"&&(_.session_id=l.session_id),Vs(n[d],_,!0),Vs(r.orchestrator[d],_,!0)}let u=Array.isArray(l.usage_legs)?l.usage_legs:[];for(let d of u){let p=d&&d.provider==="claude"?"claude":"codex";if(!d||d.provider!=="codex"&&d.provider!=="claude"||!Qm[p].includes(d.role)||!hu(d.usage))continue;let _=typeof d.receipt_id=="string"&&d.receipt_id.length>0?d.receipt_id:null;if(!_||o.has(_))continue;o.add(_);let m=bu(d.usage),y={provider:p,role:d.role,attempt_id:String(l.attempt_id||""),usage:m,subtotal:yu(p,m)};y.receipt_id=_,typeof d.agent_type=="string"&&(y.agent_type=d.agent_type),typeof d.agent_id=="string"&&(y.agent_id=d.agent_id),typeof d.model=="string"&&(y.model=d.model),typeof d.effort=="string"&&d.effort.trim().length>0&&(y.effort=d.effort),typeof d.session_id=="string"?y.session_id=d.session_id:typeof d.thread_id=="string"&&(y.session_id=d.thread_id),typeof d.turn_id=="string"&&(y.turn_id=d.turn_id),(typeof d.completed_at=="string"||typeof d.completed_at=="number"&&Number.isFinite(d.completed_at))&&(y.completed_at=d.completed_at),m.replayed===!0&&(y.replayed=!0),Vs(n[p],y,!1),Vs(r[y.role][p],y,!1)}}let i={};for(let l of["claude","codex"]){let a=n[l];if(a.legs.length===0)continue;let u=vu(a,!1);l==="claude"&&a.outer_count>0&&a.outer_cost_count===a.outer_count&&(u.total_cost_usd=a.outer_cost),i[l]=u}if(Object.keys(i).length===0)return null;let s={};for(let l of["orchestrator","implementation","review-consult","subagent"]){let a={};for(let u of["claude","codex"]){let d=r[l][u];d.legs.length>0&&(a[u]={...vu(d,!0),legs:d.legs})}Object.keys(a).length>0&&(s[l]=a)}return{providers:i,roles:s}}var og=".chip-popover, .judgement-chip";function co(e){let t=null,n=!1;function r(d){return t!==null&&t.bead_id===d.bead_id&&t.chip_key===d.chip_key}function o(d){t=r(d)?null:{...d},e()}function i(){t!==null&&(t=null,e())}function s(d){let p=d.target;t!==null&&(p&&typeof p.closest=="function"&&p.closest(og)||i())}function l(d){d.key==="Escape"&&i()}function a(){n||(n=!0,document.addEventListener("click",s),document.addEventListener("keydown",l))}function u(){n&&(n=!1,document.removeEventListener("click",s),document.removeEventListener("keydown",l))}return{toggle:o,close:i,isOpen:r,attach:a,detach:u}}function uo(e){return c`<div
    class="chip-popover"
    role="dialog"
    aria-label=${e.title}
  >
    <div class="chip-popover__title">${e.title}</div>
    <ul class="chip-popover__lines">
      ${e.lines.map(t=>c`<li>${t}</li>`)}
    </ul>
  </div>`}var wu={running:3,paused:2,failed:1};function rr(e){if(!e||typeof e!="object")return!1;let t=e.kind;return t==null||t==="implementation"}function $u(e){let t=Object.values(e||{}),n=new Map;for(let r of t){if(!r||typeof r.bead_id!="string"||r.bead_id.length===0||r.kind!=="review_session"||r.status!=="running")continue;let o=typeof r.started_at=="number"?r.started_at:null,i=n.get(r.bead_id);i&&(i.started_at??0)>(o??0)||n.set(r.bead_id,{attempt:r,origin:r.origin==="click"||r.origin==="auto"?r.origin:null,started_at:o})}return n}function xu(e,t){let n=Object.values(e||{}),r=new Set,o=new Map;for(let s of n)!s||typeof s.bead_id!="string"||(typeof s.resumed_from=="string"&&s.resumed_from.length>0&&r.add(s.resumed_from),rr(s)&&o.set(s.bead_id,s.attempt_id));let i=new Map;for(let s of n){if(!s||typeof s.bead_id!="string"||s.bead_id.length===0||!rr(s))continue;let l=null;if(s.status==="running")l="running";else if(s.status==="paused"&&!r.has(s.attempt_id))l="paused";else if(s.status==="failed"||s.status==="orphaned"){let d=t.get(s.bead_id),p=typeof d=="number"&&d>0&&typeof s.finished_at=="number"&&d>=s.finished_at;o.get(s.bead_id)===s.attempt_id&&!p&&typeof s.dismissed_at!="number"&&(l="failed")}if(!l)continue;let a=typeof s.started_at=="number"?s.started_at:null,u=i.get(s.bead_id);if(u){let d=wu[u.run_state],p=wu[l];if(d>p||d===p&&(u.started_at??0)>(a??0))continue}i.set(s.bead_id,{attempt:s,run_state:l,started_at:a})}return{winners:i,resumed_from_ids:r}}var Xs=["workflow_mode","spec_review_model","spec_review_effort","spec_review_speed","plan_review_model","plan_review_effort","plan_review_speed","impl_review_model","impl_review_effort","impl_review_speed","impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"],sg=["quick_fix_impl_dispatch","quick_fix_impl_runtime","quick_fix_impl_model","quick_fix_impl_effort","quick_fix_impl_speed"],qa=[...Xs.filter(e=>e!=="impl_dispatch"),...sg,"base_sync_accept_local_commits","bdui_url"],Au=["base_sync_accept_local_commits"],qo="true";function Zs(e){let t={};if(!fn(e))return t;for(let[n,r]of Object.entries(e)){if(Au.includes(n)){r===!0&&(t[n]=qo);continue}typeof r=="string"&&(t[n]=r)}return t}function Su(e){let t;try{t=new URL(e)}catch{return!1}return(t.protocol==="http:"||t.protocol==="https:")&&e===t.origin}var Pn=["orchestration_model","orchestration_effort","orchestration_speed"],po=["quick_fix_orchestration_model","quick_fix_orchestration_effort","quick_fix_orchestration_speed"],Pa=Object.freeze({orchestration_model:"quick_fix_orchestration_model",orchestration_effort:"quick_fix_orchestration_effort",orchestration_speed:"quick_fix_orchestration_speed",impl_dispatch:"quick_fix_impl_dispatch",impl_runtime:"quick_fix_impl_runtime",impl_model:"quick_fix_impl_model",impl_effort:"quick_fix_impl_effort",impl_speed:"quick_fix_impl_speed"}),fo=[...Xs,...Pn],ig=qa.filter(e=>fo.includes(e));function ag(e,t){let n={},r=[];for(let[i,s]of Object.entries(Pa)){let l=e[i];if(!Object.hasOwn(e,i)){n[s]=null;continue}let a=t[s];if(typeof l!="string"||!Array.isArray(a)||!a.includes(l)){n[s]=null,r.push(`lane_incompatible:${s}`);continue}n[s]=l}let o=Object.keys(e).filter(i=>!Object.hasOwn(Pa,i));return{values:n,warnings:r,skipped_keys:o}}var No=["delegated","main"],Js=["inherit","claude","codex"],Yn=["default","fast"],jo=["standard","fast_track"],Fo=["codex","opus","fable","self","skip"],ei=["codex","fable","skip"],ti=["low","medium","high","xhigh"],Eu=["default","fast"],$n="auto";function fn(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function Tu(e){if(!fn(e)||!fn(e.runners))return[];let t=[];for(let[n,r]of Object.entries(e.runners))fn(r)&&fn(r.models)&&t.push([n,Object.keys(r.models)]);return t}function _o(e,t){let n=Tu(e),r=t&&t!=="inherit"?n.filter(([o])=>o===t):n;return[$n,...r.flatMap(([,o])=>o)]}function Cu(e,t,n,r){if(!fn(e)||!fn(e.runners))return[$n];let o=[];for(let[i,s]of Object.entries(e.runners))if(!(!fn(s)||!fn(s.models))&&!(t&&t!=="inherit"&&i!==t))for(let[l,a]of Object.entries(s.models)){if(n&&n!==$n&&l!==n)continue;let u=r(s,a);if(Array.isArray(u))for(let d of u)typeof d=="string"&&!o.includes(d)&&o.push(d)}return[$n,...o]}function Pr(e,t,n){return Cu(e,t,n,(r,o)=>fn(o)&&Array.isArray(o.efforts)?o.efforts:r.efforts)}function ni(e,t,n){return Cu(e,t,n,(r,o)=>fn(o)&&Array.isArray(o.orchestration_efforts)?o.orchestration_efforts:fn(o)&&Array.isArray(o.efforts)?o.efforts:r.efforts)}function mo(e,t){let n=Tu(e);return(t?n.filter(([o])=>o===t):n).flatMap(([,o])=>o)}function Ou(e,t,n){let r={impl_runtime:e?.impl_runtime,impl_model:e?.impl_model,impl_effort:e?.impl_effort},o=r.impl_runtime==="claude"||r.impl_runtime==="codex"?r.impl_runtime:r.impl_runtime==="inherit"?n:null;return o&&(r.impl_model&&!_o(t,o).includes(r.impl_model)&&(r.impl_model=void 0),r.impl_effort&&!Pr(t,o,r.impl_model||$n).includes(r.impl_effort)&&(r.impl_effort=void 0)),r}var lg={workflow_mode:"\uC6CC\uD06C\uD50C\uB85C \uBAA8\uB4DC",spec_review_model:"\uC2A4\uD399 \uB9AC\uBDF0\uC5B4",spec_review_effort:"\uC2A4\uD399 \uB9AC\uBDF0 effort",spec_review_speed:"\uC2A4\uD399 \uB9AC\uBDF0 \uC18D\uB3C4",plan_review_model:"\uACC4\uD68D \uB9AC\uBDF0\uC5B4",plan_review_effort:"\uACC4\uD68D \uB9AC\uBDF0 effort",plan_review_speed:"\uACC4\uD68D \uB9AC\uBDF0 \uC18D\uB3C4",impl_review_model:"\uAD6C\uD604 \uB9AC\uBDF0\uC5B4",impl_review_effort:"\uAD6C\uD604 \uB9AC\uBDF0 effort",impl_review_speed:"\uAD6C\uD604 \uB9AC\uBDF0 \uC18D\uB3C4",impl_runtime:"\uC704\uC784 \uB300\uC0C1",impl_model:"\uAD6C\uD604 \uBAA8\uB378",impl_effort:"\uAD6C\uD604 effort",impl_speed:"\uAD6C\uD604 \uC18D\uB3C4",orchestration_model:"\uC6CC\uCEE4 \uBAA8\uB378",orchestration_effort:"\uC6CC\uCEE4 effort",orchestration_speed:"\uC6CC\uCEE4 \uC18D\uB3C4"},cg={quick_fix_orchestration_model:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uBAA8\uB378",quick_fix_orchestration_effort:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 effort",quick_fix_orchestration_speed:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uC18D\uB3C4",quick_fix_impl_dispatch:"\uC2E4\uD589 \uBC29\uC2DD",quick_fix_impl_runtime:"\uC704\uC784 \uB300\uC0C1",quick_fix_impl_model:"\uBAA8\uB378",quick_fix_impl_effort:"effort",quick_fix_impl_speed:"\uC18D\uB3C4"},Ma=[...ig,...Pn],ug=[...fo,...qa].filter((e,t,n)=>n.indexOf(e)===t&&!Ma.includes(e));function Ru(e,t){let n=fn(e)?e:{},r=fn(t)?t:{},o=[];for(let s of Ma){let l=n[s]??null,a=r[s]??null;l!==a&&o.push({key:s,label:lg[s]||s,before:l,after:a,kind:l===null?"added":a===null?"removed":"changed"})}let i=[];for(let s of[...ug,...Object.keys(r)])!Ma.includes(s)&&!i.includes(s)&&Object.hasOwn(r,s)&&i.push(s);return{rows:o,ignored_keys:i}}function Iu(e,t,n){let r=fn(e)?e:{},o=ag(fn(t)?t:{},n),i=[];for(let s of Object.values(Pa)){let l=r[s]??null,a=o.values[s]??null;l!==a&&i.push({key:s,label:cg[s]||s,before:l,after:a,kind:l===null?"added":a===null?"removed":"changed"})}return{rows:i,ignored_keys:o.skipped_keys}}function Na(e,t,n,r,o,i,s=null){return Ys({key:e,choices:t,layer:"global",global:n,resolution_global:i,execution_defaults:r,runner_catalog:o,route:s})}function Lu(e,t){let n={};for(let r of qa){let o=e?.[r],i=t?.[r];if(o!==i){if(Au.includes(r)){n[r]=i===qo?!0:null;continue}n[r]=typeof i=="string"&&i.length>0?i:null}}return n}function Du(e,t){let n={};for(let r of[...Pn,...po]){let o=e?.[r]??null,i=t?.[r]??null;o!==i&&(n[r]=typeof i=="string"&&i.length>0?i:null)}return n}var ja=[{id:"workflow",label:"\uC6CC\uD06C\uD50C\uB85C\uC6B0",keys:["workflow_mode"]},{id:"review",label:"\uB9AC\uBDF0",keys:["spec_review_model","spec_review_effort","spec_review_speed","plan_review_model","plan_review_effort","plan_review_speed","impl_review_model","impl_review_effort","impl_review_speed"]},{id:"implementation",label:"\uAD6C\uD604",keys:["impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"]},{id:"worker",label:"Worker",keys:[...Pn]}],mr={workflow_mode:"\uBAA8\uB4DC",spec_review_model:"\uC0AC\uC591 \uB9AC\uBDF0",spec_review_effort:"\uC0AC\uC591 \uB9AC\uBDF0 effort",spec_review_speed:"\uC0AC\uC591 \uB9AC\uBDF0 \uC18D\uB3C4",plan_review_model:"\uACC4\uD68D \uB9AC\uBDF0",plan_review_effort:"\uACC4\uD68D \uB9AC\uBDF0 effort",plan_review_speed:"\uACC4\uD68D \uB9AC\uBDF0 \uC18D\uB3C4",impl_review_model:"\uAD6C\uD604 \uB9AC\uBDF0",impl_review_effort:"\uAD6C\uD604 \uB9AC\uBDF0 effort",impl_review_speed:"\uAD6C\uD604 \uB9AC\uBDF0 \uC18D\uB3C4",impl_dispatch:"\uC2E4\uD589 \uBC29\uC2DD",impl_runtime:"\uC704\uC784 \uB300\uC0C1",impl_model:"\uBAA8\uB378",impl_effort:"effort",impl_speed:"\uC18D\uB3C4",orchestration_model:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uBAA8\uB378",orchestration_effort:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 effort",orchestration_speed:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uC18D\uB3C4"},ri={pin:"\uD540",global:"\uC804\uC5ED",base:"\uAE30\uBCF8"};function Fa(e,t,n,r,o,i=null){let s=En({pin:t,global:n,execution_defaults:r,runner_catalog:o,route:t&&typeof t.route=="string"?t.route:null,controller_runtime:i});return e.map(l=>({key:l,...s[l]}))}function Pu(e,t,n,r,o,i=null){let s={pin:0,global:0,base:0};for(let l of Fa(e,t,n,r,o,i))s[l.source]+=1;return s}function Mu(e,t,n){return{id:e,key:t,value:typeof n=="string"?n:""}}function qu(e,t,n){return typeof t!="string"||t.length===0?null:{id:e,preset_id:t,expected_revision:n}}var nx=[...Xs,...Pn];var Nu=["orchestration_model","orchestration_effort","orchestration_speed","spec_review_model","spec_review_effort","spec_review_speed","plan_review_model","plan_review_effort","plan_review_speed","impl_review_model","impl_review_effort","impl_review_speed","impl_runtime","impl_model","impl_effort"];function Bo(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function oi(e){if(!Bo(e)||!Bo(e.runners))return null;let t=Object.entries(e.runners).filter(([,n])=>Bo(n)&&Bo(n.models));return t.length>0?t:null}function Mn(e,t){let n=oi(e);if(!n||!t)return null;for(let[r,o]of n)if(Object.hasOwn(o.models,t))return r;return null}function ju(e,t){return Bo(t)&&Array.isArray(t.efforts)?t.efforts.slice():Array.isArray(e.efforts)?e.efforts.slice():[]}function Fu(e,t){let n=oi(e);if(!n||!t)return[];for(let[,r]of n)if(Object.hasOwn(r.models,t))return ju(r,r.models[t]);return[]}function dg(e){let t=oi(e);if(!t)return[];let n=[];for(let[,r]of t)for(let o of Object.values(r.models))for(let i of ju(r,o))n.includes(i)||n.push(i);return n}function pg(e,t){if(!t)return dg(e);let r=oi(e)?.find(([i])=>i===t)?.[1];if(!r)return[];let o=[];for(let i of Object.keys(r.models))for(let s of Fu(e,i))o.includes(s)||o.push(s);return o}function Bu(e,t,n){let r={impl_runtime:e.impl_runtime||"",impl_model:e.impl_model||"",impl_effort:e.impl_effort||""},o=r.impl_runtime==="inherit"?n:r.impl_runtime==="claude"||r.impl_runtime==="codex"?r.impl_runtime:null;if(r.impl_runtime==="inherit"&&!o)return r.impl_model="",r.impl_effort="",r;let i=Mn(t,r.impl_model);if(r.impl_model&&(!o||i!==o))return r.impl_model="",r.impl_effort="",r;let s=r.impl_model?Fu(t,r.impl_model):pg(t,o);return r.impl_effort&&s.length>0&&!s.includes(r.impl_effort)&&(r.impl_effort=""),r}var Ba=new Set(["unavailable","not_applicable"]);function gr(e,t){if(typeof e!="object"||e===null)return null;let n=e[t];return typeof n=="object"&&n!==null?n:null}function Uu(e){return e.filter(t=>t!==null).join(" \xB7 ")}function hr(e,t){return t===null?null:`${mr[e]}: ${t.display} (${ri[t.source]})`}function Ua(e){return e.filter(t=>t!==null).join(`
`)}function Wa(e){if(typeof e!="object"||e===null)return null;let t=Sn(e);if(t==="")return null;let n=(r,o)=>typeof o=="string"&&o.length>0?`${r}: ${o}`:null;return{text:t,title:Ua(["\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \u2014 \uC774 attempt\uC5D0 \uAE30\uB85D\uB41C \uC2E4\uD589\uAC12",n("runner",e.runner),n(mr.orchestration_model,e.model),n(mr.orchestration_effort,e.effort),n(mr.orchestration_speed,e.speed)])}}function go(e,t){let n=gr(e,"orchestration_model");if(n===null||n.resolution==="unavailable")return null;let r=gr(e,"orchestration_effort"),o=gr(e,"orchestration_speed"),i=Uu([Mn(t,n.value??""),n.display,r!==null&&r.value!==null?r.display:null,o!==null&&o.value==="fast"?"Fast":null]);return i===""?null:{text:i,title:Ua(["\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \u2014 \uD604\uC7AC \uD574\uC11D\uAC12 (\uD540 > \uD050 \uAE30\uBCF8\uAC12)",hr("orchestration_model",n),hr("orchestration_effort",r),hr("orchestration_speed",o)])}}function fg(e,t){return e===null||e.value===null||Ba.has(e.resolution)?null:e.value!=="inherit"?e.value:t?`inherit\u2192${t}`:"inherit"}function _g(e){return e===null||Ba.has(e.resolution)?null:e.value==="auto"?"auto":e.display}function mg(e){return e===null?null:e.value==="auto"?"auto":Ba.has(e.resolution)?null:e.display}function Mr(e,t){if(typeof e!="object"||e===null)return null;let n=gr(e,"impl_dispatch"),r=gr(e,"impl_runtime"),o=gr(e,"impl_model"),i=gr(e,"impl_effort"),s=gr(e,"impl_speed"),l=n!==null&&n.value==="main"?"\uBA54\uC778":Uu([fg(r,t??null),_g(o),mg(i),s!==null&&s.value==="fast"?"Fast":null]);return l===""?null:{text:l,title:Ua(["\uC6CC\uCEE4(\uAD6C\uD604 \uC704\uC784) \u2014 \uD604\uC7AC \uD574\uC11D\uAC12 (\uD540 > \uC804\uC5ED kv > \uAE30\uBCF8). \uC2E4\uD589 \uC911\uC774\uBA74 \uC138\uC158\uC774 \uC2DC\uC791 \uC2DC \uACE0\uC815\uD55C \uAC12\uACFC \uB2E4\uB97C \uC218 \uC788\uC74C",hr("impl_dispatch",n),hr("impl_runtime",r),hr("impl_model",o),hr("impl_effort",i),hr("impl_speed",s)])}}var gg=Object.freeze(new Set(["push_not_contained","invalid_impl_review","premature_close","head_mismatch","foreign_deploy_unsupported","not_resolved"])),hg=Object.freeze(["delivery_unproven:"]);function si(e){let t=e&&typeof e.reason=="string"?e.reason:"";if(t.length===0||gg.has(t))return"session";for(let n of hg)if(t.startsWith(n))return"session";return"settlement"}var bg=["hard_diagnosis","invariant_reasoning","verification_by_judgment","claude_bound"];var yg={hard_diagnosis:"\uC6D0\uC778\uC774 \uBD88\uBA85\uD655\uD558\uAC70\uB098 \uC7AC\uD604\uC774 \uBD88\uC548\uC815\uD574 \uAC00\uC124-\uAC80\uC99D \uB8E8\uD504\uAC00 \uD544\uC694\uD558\uB2E4",invariant_reasoning:"\uC815\uD569\uC131\uC774 \uC0C1\uD0DC\uAE30\uACC4\xB7\uB3D9\uC2DC\uC131\xB7\uBD88\uBCC0\uC2DD \uCD94\uB860\uC5D0 \uB2EC\uB824 \uC788\uB2E4",verification_by_judgment:"\uD14C\uC2A4\uD2B8\uAC00 \uBABB \uC7A1\uACE0 \uB9AC\uBDF0\uC5B4\uC758 \uCD94\uB860\uC73C\uB85C\uB9CC \uAC80\uC99D\uD560 \uC218 \uC788\uB2E4",claude_bound:"Claude \uC138\uC158 \uC790\uC0B0\xB7\uC758\uBBF8\uB860\uC5D0 \uAC15\uD558\uAC8C \uBB36\uC5EC \uC788\uB2E4"};function za(e){return(e&&Array.isArray(e.reasons)?e.reasons:[]).map(n=>yg[n]||"").filter(n=>n.length>0)}var Wu={orchestration_model:["fable"],impl_runtime:["claude"]},Ha={unapplied:"\uBBF8\uC801\uC6A9",applied:"\uC801\uC6A9\uB428",diverged:"\uCD94\uCC9C\uACFC \uB2E4\uB984"};function zu(e){return typeof e=="object"&&e!==null?e:null}function Hu(e,t){return typeof e=="string"&&t.includes(e)?e:""}function vg(e){return typeof e!="string"?[]:e.split("+").map(t=>t.trim()).filter(t=>bg.includes(t))}function Uo(e,t=e){let n=zu(e);if(!n)return null;let r=Hu(n.rec_orchestration_model,Wu.orchestration_model);if(r.length===0)return null;let o=Hu(n.rec_impl_runtime,Wu.impl_runtime),i={orchestration_model:r};o.length>0&&(i.impl_runtime=o);let s=zu(t)||{},l=Object.keys(i),a=0,u=0;for(let p of l){let _=s[p];typeof _=="string"&&_.length>0&&(a+=1,_===i[p]&&(u+=1))}let d=a===0?"unapplied":u===l.length?"applied":"diverged";return{reasons:vg(n.rec_reason),rec:i,state:d}}function ii(e){if(!e||typeof e!="object")return"";let t=za(e),n=Ha[e.state]||"",r=["\uBCF5\uC7A1\uD55C \uC791\uC5C5\uC73C\uB85C \uD310\uC815\uB428"];return t.length>0&&r.push(`\uC0AC\uC720: ${t.join(" \xB7 ")}`),n.length>0&&r.push(`\uC0C1\uD0DC: ${n}`),r.join(`
`)}function ai(e){return e.replace(/\/+$/,"")}function kg(e,t){let n=ai(e),r=ai(t);return n===r||r.startsWith(`${n}/`)||n.startsWith(`${r}/`)}function li(e,t){let n=new Set;for(let r of e)for(let o of t){if(!kg(r,o))continue;let i=ai(r),s=ai(o);n.add(i.length>=s.length?i:s)}return[...n].sort()}function Ka(e,t){return`${e}\0${t}`}function Ku(e){let t=new Map;for(let n of Array.isArray(e?.running)?e.running:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"running",state:"running"});for(let n of Array.isArray(e?.pr_wait)?e.pr_wait:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"pr_wait",state:"pr_wait"});for(let n of Array.isArray(e?.queue_groups)?e.queue_groups:[]){let r=Array.isArray(n.sublanes?.parallel)?n.sublanes.parallel:Array.isArray(n.items)?n.items:[];for(let o of r)t.set(o.id,{root_dir:o.root_dir,workspace_name:o.workspace_name,lane:"parallel",position:o.queue_position});for(let o of Array.isArray(n.sublanes?.serial)?n.sublanes.serial:[])for(let i of o.items)t.set(i.id,{root_dir:i.root_dir,workspace_name:i.workspace_name,lane:o.id,position:i.queue_position})}for(let n of Array.isArray(e?.runnable)?e.runnable:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"runnable",state:"runnable"});for(let n of Array.isArray(e?.done)?e.done:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"done",state:"done"});return t}function zo(e,t){let n=Array.isArray(t)?t:[],r=e.indexOf("-"),o=r>0?e.slice(0,r):e;return n.some(i=>typeof i?.issue_prefix=="string"&&i.issue_prefix===o)?"internal":n.length>0&&n.every(i=>typeof i?.issue_prefix=="string")?"external":"unknown"}function Wo(e){if(e.state==="running")return"\uC2E4\uD589\uC911";if(e.state==="pr_wait")return"PR \uB300\uAE30";if(e.state==="runnable")return"\uC2E4\uD589\uAC00\uB2A5";if(e.state==="done")return"\uC644\uB8CC";let t=e.lane==="parallel"?"\uBCD1\uB82C":e.lane;return`${e.workspace_name} \xB7 ${t} #${e.position}`}function Gu(e,t,n,r){let o=n.get(e);if(!!(o&&t&&o.root_dir===t.root_dir&&o.lane===t.lane&&typeof o.position=="number"&&typeof t.position=="number"&&o.position<t.position))return{id:e,label:`\u{1F512} ${e} (\uAC19\uC740 \uB808\uC778 \uC55E)`,location_label:"\uAC19\uC740 \uB808\uC778 \uC55E",scope:null,same_lane_ahead:!0};if(o)return{id:e,label:`\u{1F512} ${e} (${Wo(o)})`,location_label:Wo(o),scope:null,same_lane_ahead:!1};let s=zo(e,r),l=s==="internal"?"\uBBF8\uC801\uC7AC":s==="external"?"\uC678\uBD80":"\uC704\uCE58 \uBBF8\uD655\uC778";return{id:e,label:`\u{1F512} ${e} (${l})`,location_label:l,scope:s,same_lane_ahead:!1}}function Yu(e){let t=Array.isArray(e)?e:[],n=new Map,r=new Map,o=new Map;for(let l of t)for(let a of Array.isArray(l.sublanes?.serial)?l.sublanes.serial:[]){let u=Ka(l.root_dir,a.id);n.set(u,{root_dir:l.root_dir,workspace_name:l.name,lane:a.id}),o.set(u,[]);for(let d of Array.isArray(a.items)?a.items:[])r.set(d.id,u)}for(let l of t)for(let a of Array.isArray(l.sublanes?.serial)?l.sublanes.serial:[]){let u=Ka(l.root_dir,a.id),d=Array.isArray(a.items)?a.items[0]:null,_=!!d&&d.queue_index===0&&(!Array.isArray(a.occupied_by)||a.occupied_by.length===0)&&Array.isArray(d.blocked_by)?d.blocked_by:[],m=o.get(u);if(m)for(let y of _){let C=r.get(y);C&&C!==u&&!m.includes(C)&&m.push(C)}}let i=(l,a)=>{let u=new Set,d=[l];for(;d.length>0;){let p=d.pop();if(p===a)return!0;!p||u.has(p)||(u.add(p),d.push(...o.get(p)||[]))}return!1},s=new Map;for(let[l,a]of o){let u=[];for(let d of a){let p=n.get(d);i(d,l)&&p&&u.push(p)}u.length>0&&s.set(l,u)}return s}function Vu(e,t){return Ka(e,t)}var wg=Object.freeze(["done","abandoned"]);function Qu(e){return!e||typeof e!="object"||Array.isArray(e)?!1:typeof e.phase=="string"&&!wg.includes(e.phase)}async function $g(e){let t=await gn(e);me(t?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",t?"success":"error",1200)}function qr(e){return typeof e!="string"||e.length===0?"":c`<span class="worker-ev__copyline"
    ><code class="worker-ev__path">${e}</code
    ><button
      type="button"
      class="worker-ev__copy"
      data-seam="log-path-copy"
      title="로그 경로 복사"
      aria-label=${`\uB85C\uADF8 \uACBD\uB85C \uBCF5\uC0AC: ${e}`}
      @click=${()=>{$g(e)}}
    >
      ⧉
    </button></span
  >`}var Xu=Object.freeze(["spec_backed","full_plan","quick_fix"]);var xg="worker-ineligible";function Ho(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function Zu(e){return Ho(e).includes(xg)}var Ag=new Set(Xu),Ju=new WeakMap;function ho(e){return e&&typeof e=="object"?e:{}}function Sg(e){let t=Ju.get(e);if(t)return t;let n=td(e);return Ju.set(e,n),n}function ci(e,t){return(Array.isArray(e)?e:[]).findIndex(r=>r&&r.bead_id===t)}function Eg(e,t){if(e.length===0)return null;if(Sg(t).has(e))return{lane:"running"};if(ci(t.pr_wait,e)>=0)return{lane:"pr_wait"};let n=ci(t.queue,e);if(n>=0)return{lane:"parallel",index:n};for(let r of Array.isArray(t.serial_lanes)?t.serial_lanes:[]){if(!r||typeof r.id!="string"||!/^s[1-5]$/.test(r.id))continue;let o=ci(r.entries,e);if(o>=0)return{lane:r.id,index:o}}return ci(t.done,e)>=0?{lane:"done"}:null}function Ga(e,t){let n=Ag.has(e.route),r=e.route==="quick_fix";return{placeable:n&&!e.worker_ineligible&&!e.awaiting_user&&(r?e.has_description:e.spec==="published")&&t===null,route_ok:n,worker_ineligible:e.worker_ineligible,awaiting_user:e.awaiting_user,missing_description:r&&!e.has_description,spec:e.spec,location:t}}function Ko(e,t){let n=ho(e),r=ho(t),o=eo(n),i=n.workflow?.route_source==="explicit"&&typeof n.workflow.route=="string"&&n.workflow.route||(typeof ho(n.metadata).route=="string"?ho(n.metadata).route:""),s=i==="quick_fix",l=!Object.hasOwn(n,"description")||typeof n.description=="string"&&n.description.trim().length>0,a=Object.hasOwn(n,"labels")&&Zu(n.labels),u=Object.hasOwn(ho(n.metadata),"awaiting_user"),d=Eg(typeof n.id=="string"?n.id:"",r);return Ga({route:i,spec:s?"n/a":o.conflict?"conflict":o.evidence,has_description:l,awaiting_user:u,worker_ineligible:a},d)}function Nr(e){let t=e.location;if(t)switch(t.lane){case"running":return"\uC2E4\uD589 \uC911\uC774\uB77C \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4";case"pr_wait":return"PR \uB300\uAE30 \uC911\uC774\uB77C \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4";case"done":return"\uC644\uB8CC \uB808\uC778\uC5D0 \uC788\uC5B4 \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4";case"parallel":return`\uC774\uBBF8 \uB300\uAE30 \uC911 \xB7 \uBCD1\uB82C #${t.index+1}`;default:return`\uC774\uBBF8 \uB300\uAE30 \uC911 \xB7 \uC9C1\uB82C ${t.lane.slice(1)} #${t.index+1}`}return e.placeable?"\uB300\uAE30 \uD050 \uB9E8 \uB4A4\uC5D0 \uCD94\uAC00":e.route_ok===!1?"route\uAC00 \uC815\uD574\uC9C0\uC9C0 \uC54A\uC544 \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":e.worker_ineligible?"worker-ineligible label\uB85C \uC6CC\uCEE4\uC5D0\uC11C \uC2E4\uD589\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":e.awaiting_user?"\uC0AC\uC6A9\uC790 \uB9AC\uBDF0\uB97C \uAE30\uB2E4\uB9AC\uB294 \uC911\uC774\uB77C \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":e.missing_description?"description\uC774 \uC5C6\uC5B4 \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":e.spec==="conflict"?"spec \uACBD\uB85C\uAC00 \uCDA9\uB3CC\uD574 \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"spec\uC774 \uBC1C\uD589\uB418\uC9C0 \uC54A\uC544 \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"}function Go(e){let t=ho(e),n=typeof t.serial_lane_count=="number"&&Number.isInteger(t.serial_lane_count)&&t.serial_lane_count>0?Math.min(t.serial_lane_count,5):0,r=Array.isArray(t.serial_lanes)?t.serial_lanes:[],o=[];for(let s of r){if(o.length>=n)break;!s||typeof s.id!="string"||!/^s[1-5]$/.test(s.id)||!Array.isArray(s.entries)||o.push({id:s.id,label:`\uC9C1\uB82C ${s.id.slice(1)}`,count:s.entries.length})}return o.length===0?null:[{id:"parallel",label:"\uBCD1\uB82C",count:(Array.isArray(t.queue)?t.queue:[]).length},...o]}function ed(e){return/^s[1-5]$/.test(e)?`\uC9C1\uB82C ${e.slice(1)}`:"\uBCD1\uB82C"}function pi(e){return typeof e=="string"&&e.length>=7?e.slice(0,7):"\u2014"}function od(e){return e==="session"?"bead\uAC00 in_progress\uB85C \uC7A1\uD78C \uB4A4 \uB2EB\uD788\uAE30\uAE4C\uC9C0\uC758 \uACBD\uACFC":"attempt \uC2E4\uD589 \uC2DC\uAC04 \uD569\uC0B0 (\uC7AC\uAC1C \uC138\uC158 \uD3EC\uD568)"}function jr(e){if(typeof e!="number"||!Number.isFinite(e)||e<0)return"\u2014";if(e<1e3)return`${Math.round(e)}ms`;let t=e/1e3;if(t<60)return`${t.toFixed(1)}\uCD08`;let n=Math.floor(t/60);if(n<60)return`${n}\uBD84 ${Math.round(t-n*60)}\uCD08`;let r=Math.floor(n/60),o=n%60;return`${r}\uC2DC\uAC04 ${o}\uBD84`}function sd(e,t){if(typeof e!="object"||e===null)return[];let n=!1,r=!1;for(let o of Object.values(e)){if(typeof o!="object"||o===null)continue;let i=o;i.bead_id!==t||i.kind!=="review_session"||(n=!0,r=r||i.origin==="auto")}return n?[r?"\uB9AC\uBDF0 \xB7 \uC790\uB3D9":"\uB9AC\uBDF0"]:[]}function nd(e){return e==="auto"||e==="click"?e:null}function id(e,t){if(typeof e!="object"||e===null)return{active:!1,failure:null,origin:null};let n=!1,r=null,o=-1,i=null,s=null,l=-1;for(let a of Object.values(e)){if(typeof a!="object"||a===null)continue;let u=a;if(u.bead_id!==t||u.kind!=="review_session")continue;if(u.status==="pending"||u.status==="running"){n=!0;let p=typeof u.started_at=="number"?u.started_at:0;p>=o&&(o=p,r=nd(u.origin));continue}if(u.status!=="failed")continue;let d=typeof u.finished_at=="number"?u.finished_at:0;d>=l&&(l=d,i=typeof u.cause=="string"&&u.cause.length>0?u.cause:null,s=nd(u.origin))}return n?{active:!0,failure:null,origin:r}:{active:!1,failure:i,origin:s}}function ad(e,t){if(typeof e!="object"||e===null)return null;let n=0,r=!1;for(let o of Object.values(e)){if(typeof o!="object"||o===null)continue;let i=o;if(i.bead_id!==t)continue;let s=i.started_at,l=i.finished_at;typeof s!="number"||typeof l!="number"||!Number.isFinite(s)||!Number.isFinite(l)||l<s||(n+=l-s,r=!0)}return r?n:null}function fi(e){if(typeof e!="number"||!Number.isFinite(e)||e<=0)return"";let t=new Date(e);return`${String(t.getHours()).padStart(2,"0")}:${String(t.getMinutes()).padStart(2,"0")}`}function Tg(e,t){let n=Array.isArray(e)?e:[],r=Array.isArray(t)?t:[];if(n.length===0&&r.length===0)return null;let o=null;for(let s of n)s.kind!=="deploy"||s.state!=="succeeded"||typeof s.target_sha!="string"||(!o||(typeof s.finished_at=="number"?s.finished_at:0)>(typeof o.finished_at=="number"?o.finished_at:0))&&(o=s);let i=n.filter(s=>s.state==="failed"&&!s.dismissed&&!s.superseded_by).length+r.length;return{deploy:o?{sha:pi(o.target_sha),at:typeof o.finished_at=="number"?o.finished_at:null,elapsed_ms:typeof o.elapsed_ms=="number"?o.elapsed_ms:null}:null,unresolved:i,badge:i>0?{tone:"act",label:`\uD574\uACB0 \uD544\uC694 ${i}`}:{tone:"quiet",label:"\uBAA8\uB450 \uC815\uC0C1"}}}function ld(e,t){let n=Tg(e,t);return n?c`<button
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
            title=${n.deploy.at?nn(n.deploy.at):""}
            >${fi(n.deploy.at)}${n.deploy.elapsed_ms!==null?` \xB7 ${jr(n.deploy.elapsed_ms)}`:""}</span
          >
        </span>`:""}
    <span class="worker-repo-strip__spacer"></span>
    <span
      class="worker-repo-strip__badge worker-repo-strip__badge--${n.badge.tone}"
      >${n.badge.label}</span
    >
  </button>`:""}function bo(e){let t=mn(e.created_at),n=mn(e.updated_at);return!t&&!n?"":c`<div class="worker-mini__meta">
    ${t?c`<span title=${`\uC0DD\uC131 ${nn(e.created_at)}`}
          >생성 ${t}</span
        >`:""}${t&&n?c`<span>·</span>`:""}${n?c`<span title=${`\uC218\uC815 ${nn(e.updated_at)}`}
          >수정 ${n}</span
        >`:""}
  </div>`}function Cg(e){return!e||e==="requested"?"\uBC31\uC5C5 \uC911":e==="abandoned"?"\uD3D0\uAE30 \uD3EC\uAE30\uB428":e==="backup_verified"||e==="signaled"?"runner \uC885\uB8CC \uC911":e==="merged_revert"||e.startsWith("revert_")?"revert PR \uB300\uAE30":e.startsWith("rollback_")?"\uC6D0\uBCF5 \uBC30\uD3EC \uC911":e==="runner_terminated"||e.startsWith("pr_")||e.includes("ref_")||e.includes("worktree")||e.startsWith("bead_")?"PR \uC815\uB9AC \uC911":`\uD3D0\uAE30 \uCC98\uB9AC \uC911 (${e})`}function Vo(e,t){return t==="merged"?`${e}: \uC774\uBBF8 merge\uB41C \uAD6C\uD604\uC785\uB2C8\uB2E4. \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 revert PR\uC744 \uC0DD\uC131\uD558\uBA70, \uC2E4\uC81C \uC6D0\uBCF5\uC740 \uC0AC\uB78C\uC774 \uADF8 PR\uC744 merge\uD55C \uB4A4 \uC644\uB8CC\uB429\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`:`${e}: \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 runner/PR/branch/worktree\uB97C \uC815\uB9AC\uD558\uACE0 \uC774\uC288\uB97C \uD6C4\uBCF4\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`}function Qo(e,t){return t.kind==="stale_work_backup_fresh"?`${e}: \uC2E4\uD328\uD55C \uBC31\uC5C5 \uC791\uC5C5\uC744 \uD3EC\uAE30\uD569\uB2C8\uB2E4. \uBC31\uC5C5\uC740 \uB9CC\uB4E4\uC5B4\uC9C0\uC9C0 \uC54A\uC558\uACE0 \uAE30\uC874 \uC791\uC5C5\uC740 \uADF8\uB300\uB85C \uB0A8\uC2B5\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`:`${e}: \uC2E4\uD328\uD55C \uD3D0\uAE30 \uC791\uC5C5\uC744 \uD3EC\uAE30\uD569\uB2C8\uB2E4. \uBC31\uC5C5\uACFC \uD3D0\uAE30\uB294 \uC218\uD589\uB418\uC9C0 \uC54A\uC558\uACE0 bead\uB294 \uD3D0\uAE30 \uC774\uC804 \uC0C1\uD0DC\uB85C \uB3CC\uC544\uAC11\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`}function _i(e){return e.kind==="stale_work_backup_fresh"?`\uBC31\uC5C5 \uD3EC\uAE30\uB428 \xB7 \uAE30\uC874 \uC791\uC5C5\uC740 \uADF8\uB300\uB85C \uB0A8\uC2B5\uB2C8\uB2E4 (\uC6D0\uC778: ${e.last_error})`:`\uD3D0\uAE30 \uD3EC\uAE30\uB428 \xB7 \uD3D0\uAE30\uB294 \uC218\uD589\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4 (\uC6D0\uC778: ${e.last_error})`}function mi(e){let t=["\uD3D0\uAE30 \uC644\uB8CC"];return e.operation_id&&t.push(`\uC791\uC5C5 ${e.operation_id}`),e.receipt?.archive_path&&t.push(`\uBC31\uC5C5 ${e.receipt.archive_path}`),e.receipt?.original_pr?.url&&t.push(`\uC6D0\uBCF8 PR ${e.receipt.original_pr.url}`),e.receipt?.revert_pr?.url&&t.push(`revert PR ${e.receipt.revert_pr.url}`),t.join(" \xB7 ")}function cd(e){return e?.startsWith("orphan_gitlink_content:")?`\uB9E4\uD551 \uC5C6\uB294 gitlink \uACBD\uB85C ${e.slice(23)}\uC5D0 \uB0B4\uC6A9\uC774 \uC788\uC2B5\uB2C8\uB2E4 \u2014 \uC800\uC7A5\uC18C\uC5D0\uC11C \uADF8 \uACBD\uB85C\uB97C \uC815\uB9AC\uD55C \uB4A4 \uC7AC\uC2DC\uB3C4\uD558\uAC70\uB098 \uD3EC\uAE30\uD558\uC138\uC694`:e==="dirty_submodule"?"\uC11C\uBE0C\uBAA8\uB4C8\uC5D0 \uBBF8\uCEE4\uBC0B \uBCC0\uACBD\uC774\uB098 \uBBF8\uCD08\uAE30\uD654 \uD56D\uBAA9\uC774 \uC788\uC2B5\uB2C8\uB2E4 \u2014 \uC815\uB9AC \uD6C4 \uC7AC\uC2DC\uB3C4\uD558\uC138\uC694":e==="submodule_observation_failed"?"\uC11C\uBE0C\uBAA8\uB4C8 \uC0C1\uD0DC\uB97C \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 (git \uC624\uB958) \u2014 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C git \uBA85\uB839\uC744 \uC9C1\uC811 \uD655\uC778\uD558\uC138\uC694":null}function or(e,t,n={}){let o=Object.values(e&&typeof e=="object"?e:{}).filter(_=>_&&_.bead_id===t&&Qu(_)).sort((_,m)=>(_.requested_at||0)-(m.requested_at||0)).at(-1),i=typeof n.attempt_id=="string"&&n.attempt_id.length>0?n.attempt_id:typeof o?.attempt_id=="string"?o.attempt_id:null,s=n.external?"\uC678\uBD80 PR\uC740 Worker\uAC00 \uC18C\uC720\uD558\uC9C0 \uC54A\uC544 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":n.done?"\uC644\uB8CC\uB41C \uC791\uC5C5\uC740 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":n.merge_active?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":n.merge_queued?"\uBA38\uC9C0 \uD050\uC5D0 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 [\uCDE8\uC18C]\uD558\uC138\uC694":n.conflict_active?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 \uC138\uC158\uC744 \uC815\uB9AC\uD558\uC138\uC694":n.cleanup_active?"\uC815\uB9AC \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":null,l=typeof o?.last_error=="string"?o.last_error:null,a=o?Cg(o.phase):null,u=o?.kind==="stale_work_backup_fresh",d=cd(l),p=n.merged||o?.mode==="merged_revert"?"merged":"unmerged";return{action:!n.external&&!n.done,enabled:!s&&(!o||!!l),label:u?l?"\uBC31\uC5C5 \uC815\uB9AC \uC7AC\uC2DC\uB3C4":"\uBC31\uC5C5 \uD6C4 \uC0C8\uB85C \uC2DC\uC791":l?"\uC7AC\uC2DC\uB3C4":"\uD3D0\uAE30",title:s||(l?d?`\uD3D0\uAE30 \uC2E4\uD328: ${l} \u2014 ${d}`:u?`\uBC31\uC5C5 \uB4A4 \uC815\uB9AC \uC2E4\uD328: ${l} \u2014 \uC6D0\uBCF8\uACFC \uAC80\uC99D \uC601\uC218\uC99D\uC744 \uBCF4\uC874\uD55C \uCC44 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:`\uD3D0\uAE30 \uC2E4\uD328: ${l} \u2014 \uAC19\uC740 \uC791\uC5C5\uC744 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:o?`${a||"\uD3D0\uAE30 \uCC98\uB9AC \uC911"} \u2014 \uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694`:p==="merged"?"\uBCD1\uD569\uB41C \uBCC0\uACBD\uC744 \uC6D0\uBCF5 PR\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4":"\uBC31\uC5C5 \uD6C4 runner\xB7PR\xB7\uC6CC\uD06C\uD2B8\uB9AC\xB7\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4"),attempt_id:i,operation:o||null,progress:a,error:l,confirmation:p,abandon:{action:!!o&&o.phase==="requested"&&!!l,label:u?"\uBC31\uC5C5 \uD3EC\uAE30":"\uD3D0\uAE30 \uD3EC\uAE30",title:u?"\uC2E4\uD328\uD55C \uBC31\uC5C5 \uC791\uC5C5\uC744 \uD3EC\uAE30\uD569\uB2C8\uB2E4 \u2014 \uC6D0\uBCF8\uC740 \uADF8\uB300\uB85C \uB0A8\uACE0 \uC0C8\uB85C \uC2DC\uC791\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4":"\uC2E4\uD328\uD55C \uD3D0\uAE30 \uC791\uC5C5\uC744 \uD3EC\uAE30\uD569\uB2C8\uB2E4 \u2014 \uBC31\uC5C5\xB7\uD3D0\uAE30\uB294 \uC218\uD589\uB418\uC9C0 \uC54A\uC558\uACE0 bead\uB294 \uD3D0\uAE30 \uC774\uC804 \uC0C1\uD0DC\uB85C \uB3CC\uC544\uAC11\uB2C8\uB2E4"}}}function ud(e){if(!e||e.quickfix_lane!==!0)return!1;let t=e.quickfix_landing;return!t||typeof t!="object"?!1:["repo_operations","branch_cleanup","parent_close"].includes(t.cursor)}function di(e){let t=e.discard;if(!t||!t.operation)return"";let n=t.operation,r=cd(t.error),o=n.kind==="stale_work_backup_fresh"&&!t.error?null:n.backup?.path,i=n.original_pr,s=n.revert_pr;return c`<div
    class="worker-discard-receipt"
    role=${t.error?"alert":"status"}
  >
    <span>${t.progress}</span>
    ${t.error?c`<span
          >폐기 실패: ${t.error}${r?` \u2014 ${r}`:""}</span
        >`:""}
    <code>작업: ${n.operation_id}</code>
    ${o?c`<code>백업: ${o}</code>`:t.error?c`<span>아직 아무것도 삭제하지 않음</span>`:""}
    ${i?.url?c`<a href=${i.url} target="_blank" rel="noreferrer noopener"
          >원본 PR #${i.number||"?"}</a
        >`:""}
    ${s?.url?c`<a href=${s.url} target="_blank" rel="noreferrer noopener"
          >revert PR #${s.number||"?"} ·
          ${s.state||"\uC0C1\uD0DC \uBBF8\uD655\uC778"}</a
        >`:""}
  </div>`}var Og={dirty_unique:"\uCD5C\uC2E0 base\uC5D0 \uC5C6\uB294 \uB85C\uCEEC \uBCC0\uACBD\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",untracked_present:"\uCD94\uC801\uB418\uC9C0 \uC54A\uC740 \uD30C\uC77C\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",branch_ahead:"\uB85C\uCEEC branch\uC5D0 \uACE0\uC720 commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",head_ahead:"worktree HEAD\uC5D0 \uACE0\uC720 commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",ahead_not_contained:"\uB85C\uCEEC branch\uC758 \uACE0\uC720 commit\uC774 \uCD5C\uC2E0 base\uC5D0 \uD3EC\uD568\uB410\uC74C\uC744 \uC99D\uBA85\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",ahead_merge_commit:"\uB85C\uCEEC branch\uC5D0 \uC790\uB3D9 \uC815\uB9AC\uD560 \uC218 \uC5C6\uB294 merge commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",ahead_submodule_path:"\uB85C\uCEEC branch\uC758 \uACE0\uC720 commit\uC774 submodule \uACBD\uB85C\uB97C \uBCC0\uACBD\uD569\uB2C8\uB2E4",archive_failed:"\uACE0\uC720 commit \uBC31\uC5C5\uC744 \uC548\uC804\uD558\uAC8C \uAC80\uC99D\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",ref_delete_failed:"\uD655\uC778\uB41C local branch\uB97C \uC548\uC804\uD558\uAC8C \uC0AD\uC81C\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",resume_available:"\uC774\uC5B4\uAC08 \uC218 \uC788\uB294 \uC774\uC804 Worker session\uC774 \uC788\uC2B5\uB2C8\uB2E4",observe_failed:"Git \uC0C1\uD0DC\uB97C \uC548\uC804\uD558\uAC8C \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",identity_changed:"\uD655\uC778 \uC911 worktree \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4",ownership_unknown:"Worker \uC18C\uC720 worktree\uC778\uC9C0 \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"};function dd(e,t=!1){if(!e||typeof e!="object")return null;let n=e;if(n.reason!=="worktree_stale_work"||!n.stale_work||typeof n.stale_work!="object")return null;let r=n.stale_work,o=r.residue==="branch"?"branch":"worktree",i=r.state==="unique"?"unique":"unknown",s=r.summary&&typeof r.summary=="object"?r.summary:{};function l(u){return Number.isInteger(s[u])?Number(s[u]):0}let a=typeof r.cause=="string"?r.cause:"observe_failed";return{residue:o,state:i,title:o==="branch"?"\uC774\uC804 \uBE0C\uB79C\uCE58 \uBCF4\uC874\uB428":i==="unique"?"\uC774\uC804 \uC791\uC5C5 \uBCF4\uC874\uB428":"\uC774\uC804 \uC791\uC5C5 \uC0C1\uD0DC \uD655\uC778 \uC2E4\uD328",cause:Og[a]||"\uC548\uC804\uD558\uAC8C \uC790\uB3D9 \uC815\uB9AC\uD560 \uC218 \uC5C6\uB294 \uC774\uC804 \uC791\uC5C5\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",summary:o==="branch"?`\uACE0\uC720 commit ${l("branch_ahead")}`:[`staged ${l("staged_count")}`,`unstaged ${l("unstaged_count")}`,`untracked ${l("untracked_count")}`,`branch ahead ${l("branch_ahead")}`,`HEAD ahead ${l("head_ahead")}`].join(" \xB7 "),action_id:typeof r.action_id=="string"?r.action_id:"",can_resume:r.can_resume===!0,can_continue:r.can_continue===!0,can_backup_fresh:r.can_backup_fresh===!0,can_recheck:r.can_recheck===!0,locked:t}}function gi(e,t={}){if(!e||!e.orchestration&&!e.worker)return"";let n=t.pin===!0?" exec-chip--pin":"",r=t.pin===!0?`
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
      >`:""}`}function Yo(e,t){let n=`worker-dep worker-dep--${t}${e.foreign?" worker-dep--foreign":""}`;return e.openable===!0?c`<button
        type="button"
        class=${`${n} worker-dep__open`}
        data-dep-id=${e.id}
        data-root-dir=${e.root_dir||""}
        title=${e.title||""}
      >
        ${e.label}
      </button>`:c`<span class=${n} title=${e.title||""}>${e.label}</span>`}function Rg(e){return{id:e.id,label:`\u29C9 ${e.id}`,title:[`\uACB9\uCE68 \xB7 ${e.location_label}`,...e.prefixes].join(`
`),openable:!0,...e.root_dir?{root_dir:e.root_dir}:{}}}function Ya(e){return Array.isArray(e)?e.slice().sort((t,n)=>t.id<n.id?-1:t.id>n.id?1:0):[]}function Ig(e,t=!1){return e?c`<button
    type="button"
    class="ctl-chip ctl-chip--label judgement-chip worker-card__spec-after-blocker"
    data-chip-key="spec_after_blocker"
    aria-expanded=${t?"true":"false"}
    title="선행의 결과가 설계 전제라 스펙도 선행 뒤에 씁니다"
  >
    스펙 대기
  </button>`:""}function pd(e){if(!Object.hasOwn(e,"route_ok")||e.queue_placeable===!0)return null;let t="";return e.route_ok===!1&&(t="\uB77C\uC6B0\uD305 \uD544\uC694"),t.length===0&&(e.worker_ineligible===!0||e.awaiting_user===!0)||(t.length===0&&e.missing_description===!0?t="\uBCF8\uBB38 \uD544\uC694":t.length===0&&e.placement_spec==="conflict"?t="\uC2A4\uD399 \uCDA9\uB3CC":t.length===0&&Object.hasOwn(e,"placement_spec")&&e.placement_spec!=="published"&&(t="\uC2A4\uD399 \uBBF8\uBC1C\uD589"),t.length===0)?null:{label:t,title:Nr({placeable:!1,route_ok:e.route_ok,worker_ineligible:e.worker_ineligible===!0,awaiting_user:e.awaiting_user===!0,missing_description:e.missing_description===!0,spec:e.placement_spec})}}function Lg(e,t){return e?c`<button
    type="button"
    class="ctl-chip ctl-chip--label judgement-chip worker-card__readiness"
    data-chip-key="readiness"
    aria-expanded=${t?"true":"false"}
    title=${e.title}
  >
    ${e.label}
  </button>`:""}function hi(e,t=""){if(!e)return t===""?"":c`<div class="worker-deps worker-deps--primary">
          ${t}
        </div>`;let n=Ya(e.predecessors),r=Array.isArray(e.released)?e.released:[],o=Ya(e.dependents),i=Ya(e.overlaps),s=e.scope_missing===!0,l=e.armed_lane||null,a=!!l||n.length>0||o.length>0||t!=="",u=r.length>0||i.length>0||s;return!a&&!u?"":c`${a?c`<div class="worker-deps worker-deps--primary">
        ${l?c`<span
              class=${`worker-dep worker-dep--armed${l.orphan?" worker-dep--armed-orphan":""}`}
              title=${l.orphan?"\uC774 \uD56D\uBAA9\uC744 \uBC1C\uCC28\uD55C \uC5F0\uACB0 \uB808\uC778\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uC2A4\uCF00\uC904\uB7EC\uB294 \uACC4\uC18D \uBC1C\uCC28\uD569\uB2C8\uB2E4":"\uC5F0\uACB0 \uB808\uC778\uC774 \uC774 \uD56D\uBAA9\uC744 \uBC1C\uCC28\uD588\uC2B5\uB2C8\uB2E4 \u2014 \uB808\uD3EC \uC790\uB3D9 \uC9C4\uD589\uACFC \uBB34\uAD00\uD569\uB2C8\uB2E4"}
              >${l.orphan?c`${l.label}<button
                      type="button"
                      class="worker-dep__label mon2-arm__release"
                      data-lane-id=${l.lane_id}
                    >
                      해제
                    </button>`:l.label}</span
            >`:""}${n.map(d=>Yo(d,"pred"))}${t}${o.map(d=>Yo(d,"dependents"))}
      </div>`:""}${u?c`<div class="worker-deps worker-deps--secondary">
        ${r.map(d=>Yo(d,"released"))}${i.map(d=>Yo(Rg(d),"overlap"))}${s?c`<span
              class="worker-dep worker-dep--muted"
              title="겹침 판정 불가 — 아티팩트가 있으면 스펙/플랜 front-matter, 없으면 description \`## scope\`에 선언 필요"
              >scope 없음</span
            >`:""}
      </div>`:""}`}function fd(e,t=""){let n=(Array.isArray(e)?e:[]).filter(r=>typeof r=="string"&&r!=="").slice().sort();return n.length===0?"":c`<div class="worker-deps worker-deps--secondary">
    ${n.map(r=>Yo({id:r,label:`\uC774\uC6D4 \u2192 ${r}`,title:`\uC774\uC6D4\uB41C \uD6C4\uC18D ${r} \uC5F4\uAE30`,openable:!0,...t?{root_dir:t}:{}},"dependents"))}
  </div>`}function bi(e){return e?c`<button
    type="button"
    class="worker-dep worker-dep--lane mon-lane__chip"
    data-lane-id=${e.lane_id}
    title="이 연결 레인으로 이동"
  >
    ${e.label}
  </button>`:""}function yi(e){if(!e)return"";let t=e.chips||{},n=t.route||e.route,r=t.route_source==="derived"||e.route_source==="derived";return n?c`<span
    class="ctl-chip ctl-chip--route${r?" is-derived":""}"
    title=${r?"route \uBBF8\uD540 (metadata unset)":"route"}
    >${r?"unset":n}</span
  >`:""}function Dg(e,t=!1){let n=e?e.quick_fix_review:null;if(!n)return"";let r=n.state;if(r!=="reviewed"&&r!=="stale")return"";let o=Array.isArray(n.missing)?n.missing:[],i=[r==="reviewed"?"quick_fix self-review \uC601\uC218\uC99D\uC774 \uC9C0\uAE08 \uBCF8\uBB38\uACFC \uC77C\uCE58\uD569\uB2C8\uB2E4":"quick_fix self-review \uC601\uC218\uC99D\uC774 \uC9C0\uAE08 \uBCF8\uBB38\uACFC \uB2E4\uB985\uB2C8\uB2E4",...o].join(`
`);return c`<button
    type="button"
    class="ctl-chip judgement-chip worker-card__qfr worker-card__qfr--${r}"
    data-chip-key="qfr"
    aria-expanded=${t?"true":"false"}
    title=${i}
  >
    ${r==="reviewed"?"\uB9AC\uBDF0 \u2713":"\uB9AC\uBDF0 stale"}
  </button>`}function _d(e){return e?c`<button
    type="button"
    class="ctl-chip ctl-chip--from"
    data-from-id=${e}
    title=${`\uCD9C\uCC98 ${e} \uC5F4\uAE30`}
  >
    ↩ from ${e}
  </button>`:""}function vi(e,t=!1){return e?c`<button
    type="button"
    class="ctl-chip ctl-chip--label judgement-chip worker-card__rec"
    data-chip-key="rec"
    data-state=${e.state}
    aria-expanded=${t?"true":"false"}
    title=${ii(e)}
  >
    ${"\uBCF5\uC7A1"}
  </button>`:""}var Pg={absent:"\uC2E4\uD589 \uC601\uC218\uC99D\uC774 \uAE30\uB85D\uB418\uC9C0 \uC54A\uC558\uB2E4 \u2014 \uACFC\uAC70 Bead\xB7\uC678\uBD80 \uACBD\uB85C PR\uC740 \uC6D0\uB798 \uC5C6\uB2E4",unparsable:"\uC601\uC218\uC99D \uAC12\uC744 \uC77D\uC744 \uC218 \uC5C6\uB2E4 \u2014 40hex SHA\uB098 `delegated:`/`main:` \uD615\uC2DD\uC774 \uC544\uB2C8\uB2E4",effort_unknown:"effort \uD1A0\uD070\uC774 harness \uC5B4\uD718 \uBC16\uC774\uB2E4 \u2014 \uBAA8\uB378\xB7SHA\xB7unit\uC740 \uC720\uD6A8\uD558\uB2E4",main_reason_retired:"`main:` \uC0AC\uC720\uAC00 \uACE0\uC815 4\uD1A0\uD070(bead\xB7quick_fix_default\xB7phase_line\xB7takeover) \uBC16\uC774\uB2E4",main_receipt_unbacked:"`main:` \uC0AC\uC720\uB97C \uB4B7\uBC1B\uCE68\uD558\uB294 \uBA54\uD0C0\uB370\uC774\uD130(impl_dispatch\xB7route\xB7planned_execution\xB7quick_fix \uAE30\uBCF8 dispatch)\uAC00 \uC5C6\uB2E4",takeover_lineage_missing:"`main:takeover`\uC778\uB370 resolved \uBAA8\uB378\uACFC \uC77C\uCE58\uD558\uB294 \uC644\uB8CC\uB41C \uC704\uC784 \uC138\uC158\uC774 \uC5C6\uB2E4",takeover_lineage_unobservable:"`main:takeover`\uC778\uB370 \uC704\uC784 \uACC4\uBCF4\uB97C \uBAA8\uB2C8\uD130\uAC00 \uBCFC \uC218 \uC5C6\uB2E4(Codex \uBC16 \uB7F0\uD0C0\uC784)"};function Mg(e,t=!1){let n=md(e);if(n.length===0)return"";let r=n.length>1?`\uC601\uC218\uC99D \xB7 ${n[0]} +${n.length-1}`:`\uC601\uC218\uC99D \xB7 ${n[0]}`;return c`<button
    type="button"
    class="ctl-chip ctl-chip--label judgement-chip worker-card__receipt"
    data-chip-key="receipt"
    data-bead-id=${e.id}
    aria-expanded=${t?"true":"false"}
    title=${n.join(", ")}
  >
    ${r}
  </button>`}function md(e){let t=e.receipt_badge?e.receipt_badge.codes:null;return Array.isArray(t)?t.filter(n=>typeof n=="string"&&n.length>0):[]}function gd(e,t){return!e||typeof t!="number"?"":c`<a
    class="worker-mini__pr"
    href=${e}
    target="_blank"
    rel="noreferrer noopener"
    title="PR 열기"
    >#${t} ↗</a
  >`}function ki(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=Math.max(0,Math.min(4,Math.trunc(e)));return c`<span class="worker-pri" title=${`\uC6B0\uC120\uC21C\uC704 P${t}`}
    >P${t}</span
  >`}function qg(e){let t=Array.isArray(e.badges)?e.badges:[],n=un(e.usage),r=tr(e.usage),o=mn(e.done_at);return c`<div
    class="worker-mini worker-mini--static worker-mini--done worker-mini--three-line${e.search_match===!1?" is-dimmed":""}"
    draggable="false"
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    <div class="worker-mini__row1">
      ${e.workspace_name?c`<span class="worker-mini__repo" title=${e.root_dir||""}
            >${e.workspace_name}</span
          >`:""}
      <span class="worker-mini__id" title="클릭하면 ID 복사">${e.id}</span>
      ${gd(e.pr_url,e.pr_number)}${o?c`<span
            class="worker-mini__done-at"
            title=${`\uC644\uB8CC ${nn(e.done_at)}`}
            >완료 ${o}</span
          >`:""}
      ${t.map(i=>c`<span
            class="worker-mini__badge${e.alert?" worker-mini__badge--alert":""}"
            >${i}</span
          >`)}
    </div>
    <div class="worker-mini__row2">
      <span class="worker-mini__title">${e.title}</span>
    </div>
    ${fd(e.carried_to,e.root_dir)}
    <div class="worker-mini__row3">
      ${n.length>0?n.map(i=>c`<span class="worker-usage" title=${i.tooltip}
                >${i.label}</span
              >`):r?c`<span class="worker-usage" title=${Mo(e.usage)}
              >${r}</span
            >`:""}
      ${typeof e.work_ms=="number"?c`<span
            class="worker-mini__work"
            title=${od(e.work_kind)}
            >작업 ${jr(e.work_ms)}</span
          >`:""}
    </div>
  </div>`}function yo(e,t={}){if(!(e.draggable!==!0||e.done===!0))return c`<span class="worker-mini__rowops">
    ${t.nudgeable===!0?c`<button
            type="button"
            class="op-btn op-btn--icon worker-mini__rowops-up"
            data-bead-id=${e.id}
            title="같은 레포 안에서 한 칸 위로"
            aria-label="한 칸 위로"
          >
            ↑
          </button>
          <button
            type="button"
            class="op-btn op-btn--icon worker-mini__rowops-down"
            data-bead-id=${e.id}
            title="같은 레포 안에서 한 칸 아래로"
            aria-label="한 칸 아래로"
          >
            ↓
          </button>`:""}
    <button
      type="button"
      class="op-btn op-btn--icon worker-mini__rowops-remove"
      data-action="queue-remove"
      data-bead-id=${e.id}
      title="대기에서 빼기"
      aria-label="대기에서 빼기"
    >
      ✕
    </button>
  </span>`}function qn(e,t={}){if(e.lane==="done"&&e.done_layout==="three_line")return qg(e);let n=e.draggable&&!e.done,r=Array.isArray(e.badges)?e.badges:[],o=un(e.usage),i=tr(e.usage),s=e.merge_step||null,l=e.lane==="pr_wait"||!!e.revise_action||!!e.stale_work||e.discard?.abandon.action===!0,a=e.lane==="done"&&!l,u=a?mn(e.done_at):"",d=n?c`<span class="worker-mini__grip" aria-hidden="true">⠿</span>`:"",p=typeof e.seq=="number"?c`<span class="worker-mini__seq" aria-hidden="true"
          >${e.seq}</span
        >`:"",_=e.workspace_name?c`<span class="worker-mini__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:"",m=c`<span class="worker-mini__id" title="클릭하면 ID 복사"
    >${e.id}</span
  >`,y=e.lane==="done"?"":yi(e.workflow),C=e.lane==="done"?"":_d(e.from_id),R=ki(e.priority),V=c`<span class="worker-mini__title">${e.title}</span>`,te=gd(e.pr_url,e.pr_number),W=r.map(dt=>dt===e.live_badge?c`<span
          class="worker-mini__badge worker-mini__badge--activity"
          title="서버가 이 PR을 처리하는 중입니다"
          ><span class="act-dot" aria-hidden="true"></span>${dt}</span
        >`:c`<span
          class="worker-mini__badge${e.alert?" worker-mini__badge--alert":""}"
          title=${dt===e.completion_badge&&e.completion_title||""}
          >${dt}</span
        >`),M=e.reason?c`<span class="worker-mini__reason">${e.reason}</span>`:"",I=o.length>0?o.map(dt=>c`<span class="worker-usage" title=${dt.tooltip}
              >${dt.label}</span
            >`):i?c`<span class="worker-usage" title=${Mo(e.usage)}
            >${i}</span
          >`:"",L=s?c`<span
        class="merge-step${s.failed?" merge-step--failed":""}"
        style=${`--progress: ${s.percent}%`}
        >${s.label}${s.index>0?c`<span class="merge-step__n"
              >${s.index}/${s.total}</span
            >`:""}</span
      >`:"",U=e.merge_action?c`<button
        type="button"
        class="worker-mini__merge"
        data-bead-id=${e.id}
        ?disabled=${e.merge_enabled===!1}
        title=${e.merge_title||""}
      >
        ${e.merge_label||"\uBA38\uC9C0"}
      </button>`:"",Y=e.cancel_action?c`<button
        type="button"
        class="worker-mini__merge-cancel"
        data-bead-id=${e.id}
        ?disabled=${e.cancel_enabled===!1}
        title=${e.cancel_title||""}
      >
        취소
      </button>`:"",q=e.discard,N=q?.action||e.discard_action?c`<button
          type="button"
          class="worker-mini__discard"
          data-bead-id=${e.id}
          data-attempt-id=${q?.attempt_id||""}
          data-operation-id=${q?.operation?.operation_id||""}
          data-discard-mode=${q?.confirmation||"unmerged"}
          ?disabled=${q?!q.enabled:e.discard_enabled===!1}
          title=${q?q.title:e.discard_enabled===!1?e.discard_title||"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"PR\uC744 \uB2EB\uACE0 \uC6CC\uD06C\uD2B8\uB9AC/\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4 (\uB418\uB3CC\uB9B4 \uC218 \uC5C6\uC74C). \uB2E4\uC2DC \uC2E4\uD589\uD558\uB824\uBA74 \uD6C4\uBCF4 \uB808\uC778\uC5D0\uC11C \uB300\uAE30 \uB808\uC778\uC73C\uB85C \uC62E\uAE30\uC138\uC694"}
        >
          ${q?.label||"\uD3D0\uAE30"}
        </button>`:"",z=q?.abandon.action?c`<button
        type="button"
        class="worker-mini__discard-abandon"
        data-bead-id=${e.id}
        data-operation-id=${q.operation.operation_id}
        data-operation-kind=${q.operation.kind||""}
        data-last-error=${q.error||""}
        title=${q.abandon.title}
      >
        ${q.abandon.label}
      </button>`:"",G=e.resolve_action?c`<button
        type="button"
        class="worker-mini__resolve"
        data-bead-id=${e.id}
        ?disabled=${e.resolve_enabled===!1}
        title=${e.resolve_title||"\uC2E4\uD328\uD55C \uC791\uC5C5\uC744 \uC774\uC5B4\uBC1B\uB294 \uB300\uD654\uD615 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4 (\uAE30\uB85D\uB41C \uC138\uC158\uC774 \uC788\uC73C\uBA74 fork)"}
      >
        세션에서 해결
      </button>`:"",oe=q?.abandon.action?c`${N}${z}${G}`:c`${G}${N}`,ye=e.stale_work||null,Me=ye?c`${ye.can_resume||ye.can_continue?c`<button
            type="button"
            class="worker-mini__stale-continue"
            data-bead-id=${e.id}
            data-action-id=${ye.action_id}
            ?disabled=${ye.locked}
          >
            기존 작업 이어가기
          </button>`:""}${ye.can_backup_fresh?c`<button
            type="button"
            class="worker-mini__stale-backup"
            data-bead-id=${e.id}
            data-action-id=${ye.action_id}
            ?disabled=${ye.locked}
          >
            백업 후 새로 시작
          </button>`:""}${ye.can_recheck?c`<button
            type="button"
            class="worker-mini__stale-recheck"
            data-bead-id=${e.id}
            data-action-id=${ye.action_id}
            ?disabled=${ye.locked}
          >
            다시 확인
          </button>`:""}`:"",F=ye?c`<div class="worker-mini__stale">
        <strong>${ye.title}</strong>
        <span>${ye.summary}</span>
        <span>${ye.cause}</span>
        ${ye.can_backup_fresh?c`<small
              >Git-ignored dependency/build output은 archive에 포함되지
              않습니다</small
            >`:""}
      </div>`:"",X=e.revise_action?c`<button
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
        </button>`:"",Ae=!!(e.lane!=="pr_wait"&&!e.done&&e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker)),Ee=vi(e.rec,br(e,"rec")),O=Mg(e,br(e,"receipt")),se=bi(e.cross_lane_chip),be=qr(e.log_path),ve=_||se||y||C||Ae||Ee||O||I||be?c`<div class="worker-chips">
          ${_}${se}${y}${C}${Ae?gi(e.exec_chips,{pin:e.exec_chips_pinned===!0}):""}${Ee}${O}${I}${be}${ui(e)}
        </div>`:"",Pe=hi(e.dependency_chips),he=di(e),Re=t.actions?t.actions:"",Xe=!!(s||e.merge_action||e.cancel_action||e.resolve_action||e.discard_action||q?.operation||e.revise_action||ye);return c`<div
    class="worker-mini${l?" worker-mini--card":""}${n?"":" worker-mini--static"}${e.done?" worker-mini--done":""}${e.ghost?" worker-mini--ghost":""}${s?" worker-mini--merging":""}${s?.failed?" worker-mini--merge-failed":""}${e.external?" worker-mini--external":""}${e.search_match===!1?" is-dimmed":""}"
    style=${s?`--progress: ${s.percent}%`:""}
    draggable=${n?"true":"false"}
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    ${a?c`<div class="worker-mini__row1">
            ${_}${m}${R}${C}${te}${V}${Re}
          </div>
          ${fd(e.carried_to,e.root_dir)}
          <div class="worker-mini__row2">
            ${I}${u?c`<span
                  class="worker-mini__done-at"
                  title=${`\uC644\uB8CC ${nn(e.done_at)}`}
                  >완료 ${u}</span
                >`:""}${typeof e.work_ms=="number"?c`<span
                  class="worker-mini__work"
                  title=${od(e.work_kind)}
                  >작업 ${jr(e.work_ms)}</span
                >`:""}${W}${L}
            <span class="worker-mini__actions"
              >${U}${Y}${oe}</span
            >
            ${bo(e)}
          </div>`:l?c`<div class="worker-mini__head">
              ${d}${p}${m}${R}${te}${W}${M}${Re}
            </div>
            <div class="worker-mini__body">${V}${F}</div>
            ${Pe}${ve}${Xe?c`<div class="worker-mini__foot">
                  ${L}
                  <span class="worker-mini__actions"
                    >${U}${Y}${oe}${X}${Me}</span
                  >
                  ${di(e)}
                </div>`:""}
            ${bo(e)}`:c`<div class="worker-mini__line">
              ${d}${p}${m}${R}${V}${te}${W}${M}${L}${U}${Y}${oe}${Re}
            </div>
            ${Pe}${ve}${he} ${bo(e)}`}
  </div>`}function Qa(e,t){let n,r=[];for(let o of e){let i=o.group||"";i.length>0&&i!==n&&r.push(c`<div class="worker-card__place-group">${i}</div>`),n=i,r.push(c`<button
        type="button"
        class="worker-card__place-lane${i.length>0?" worker-card__place-lane--nested":""}"
        data-bead-id=${t}
        data-lane=${o.id}
        ?disabled=${o.disabled===!0}
        title=${o.title||`${o.label} \uB300\uAE30 \uB9E8 \uB4A4\uC5D0 \uCD94\uAC00`}
      >
        <span>${o.label}</span>
        ${typeof o.count=="number"?c`<span class="worker-card__place-count">${o.count}</span>`:""}
      </button>`)}return c`${r}`}var hd={external_roundtrip:"\uD558\uB124\uC2A4 \uBC16 \uC0C1\uB300\uC640 \uC608\uCE21 \uBD88\uAC00 \uC655\uBCF5 \uBC18\uBCF5 \u2014 \uB2E4\uB978 rig \uC138\uC158\xB7\uC0AC\uB78C\xB7\uC678\uBD80 \uC2DC\uC2A4\uD15C",user_feedback_loop:"\uC9C4\uD589 \uC911 \uC0AC\uC6A9\uC790 \uD53C\uB4DC\uBC31 \uC5C6\uC774\uB294 \uD488\uC9C8\uC774 \uB0AE\uC74C \u2014 \uBB38\uC548\xB7\uC124\uACC4 \uC138\uBD80\xB7\uBC29\uD5A5 \uC120\uD0DD"};function Xa(e,t){if(t==="rec"){let n=e.rec;if(!n)return null;let r=Ha[n.state]||"";return{title:"\uBCF5\uC7A1\uD55C \uC791\uC5C5\uC73C\uB85C \uD310\uC815\uB428",lines:[...za(n),...r.length>0?[`\uC0C1\uD0DC: ${r}`]:[],"\uC801\uC6A9\uC740 \uC774\uC288 \uC0C1\uC138\uC758 \uC2E4\uD589 \uC124\uC815 \uD3B8\uC9D1\uAE30\uC5D0\uC11C"]}}if(t==="session_preferred"){if(e.session_preferred!==!0)return null;let n=hd[e.session_preferred_reason||""]||"";return{title:"\uC6CC\uCEE4\uB85C \uB3CC\uB9B4 \uC218 \uC788\uC9C0\uB9CC \uC138\uC158\uC774 \uB0AB\uB2E4",lines:n.length>0?[n]:[]}}if(t==="ineligible")return e.worker_ineligible!==!0?null:{title:"\uC6CC\uCEE4 \uC2E4\uD589 \uB300\uC0C1\uC774 \uC544\uB2C8\uB2E4",lines:["worker-ineligible \uB77C\uBCA8\uC774 \uBD99\uC5B4 \uC788\uB2E4 \u2014 \uB77C\uBCA8\uC740 \uC774\uC288 \uC0C1\uC138\uC758 \uB77C\uBCA8 \uC808\uC5D0\uC11C \uB5C0\uB2E4"]};if(t==="spec_after_blocker")return e.spec_after_blocker!==!0?null:{title:"\uC120\uD589 \uACB0\uACFC\uAC00 \uC124\uACC4 \uC804\uC81C \u2014 \uC2A4\uD399\uB3C4 \uC120\uD589 \uB4A4\uC5D0",lines:[`\uC120\uD589: ${(Array.isArray(e.blocked_by)?e.blocked_by:[]).join(" \xB7 ")}`,"\uC120\uD589\uC774 \uB2EB\uD788\uBA74 \uC774 \uD45C\uC2DC\uB294 \uC800\uC808\uB85C \uC0AC\uB77C\uC9C4\uB2E4 \u2014 \uB77C\uBCA8\uC740 \uC774\uC288 \uC0C1\uC138\uC758 \uB77C\uBCA8 \uC808\uC5D0\uC11C \uB5C0\uB2E4"]};if(t==="readiness"){let n=pd(e);return n?{title:n.title,lines:[]}:null}if(t==="receipt"){let n=md(e);return n.length===0?null:{title:"\uC2E4\uD589 \uC601\uC218\uC99D \uD68C\uACC4 \uC794\uC5EC \u2014 \uBA38\uC9C0\uB294 \uC9C4\uD589",lines:[...n.map(r=>Pg[r]||r),"\uC790\uB3D9 \uBA38\uC9C0 \uD310\uC815\uC5D0\uB294 \uC601\uD5A5\uC774 \uC5C6\uB2E4 \u2014 \uC815\uC815\uC740 bd update --set-metadata exec_receipt=\u2026 \uB85C"]}}if(t==="qfr"){let n=e.workflow?e.workflow.quick_fix_review:null;if(!n||n.state!=="reviewed"&&n.state!=="stale")return null;let r=Array.isArray(n.missing)?n.missing:[];return{title:n.state==="reviewed"?"quick_fix self-review \uC601\uC218\uC99D\uC774 \uC9C0\uAE08 \uBCF8\uBB38\uACFC \uC77C\uCE58\uD569\uB2C8\uB2E4":"quick_fix self-review \uC601\uC218\uC99D\uC774 \uC9C0\uAE08 \uBCF8\uBB38\uACFC \uB2E4\uB985\uB2C8\uB2E4",lines:r.length>0?r:["\uBE60\uC9C4 \uD56D\uBAA9 \uC5C6\uC74C"]}}return null}var Ng=["rec","receipt","session_preferred","ineligible","qfr","spec_after_blocker","readiness"];function wi(e,t){for(let n of Ng){if(!t(n))continue;let r=Xa(e,n);return r?{chip_key:n,content:r}:null}return null}function ui(e){return e.chip_popover?uo(e.chip_popover.content):""}function br(e,t){return!!e.chip_popover&&e.chip_popover.chip_key===t}var Za="\uC0AC\uC6A9\uC790 \uB9AC\uBDF0 \uD544\uC694";function Ja(e,t=null,n={}){let r=e.worker_ineligible===!0,o=e.draggable&&!e.done&&!r,i=e.queue_placeable===!0&&!e.done&&!r,s=i&&t&&t.bead_id===e.id,l=e.session_preferred===!0,a=hd[e.session_preferred_reason||""]||"",u=e.workflow,d=e.missing_description===!0,p=e.awaiting_user===!0,_=typeof e.reason=="string"&&e.reason.startsWith("\u26D4"),m=br(e,"spec_after_blocker"),y=Ig(e.spec_after_blocker===!0,m),C=pd(e),R=br(e,"readiness"),V=Lg(C,R),te=c`${y}${m?ui(e):""}${V}${R?ui(e):""}`,W=hi(e.dependency_chips,y===""&&V===""?"":te),M=e.workspace_name?c`<span class="worker-card__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:"",I=bi(e.cross_lane_chip),L=yi(u),U=_d(e.from_id),Y=!!(e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker)),q=!r&&(e.blocked===!0||e.queue_placeable===!1);return c`<div
    class="worker-card${o?"":" worker-card--static"}${r?" worker-card--ineligible":""}${q?" worker-card--blocked":""}${e.search_match===!1?" is-dimmed":""}"
    draggable=${o?"true":"false"}
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    <div class="worker-card__head">
      ${o?c`<span class="worker-card__grip" aria-hidden="true">⠿</span>`:""}
      <span class="worker-card__id" title="클릭하면 ID 복사">${e.id}</span
      >${ki(e.priority)}
      ${r?c`<button
            type="button"
            class="ctl-chip ctl-chip--label judgement-chip worker-card__ineligible"
            data-chip-key="ineligible"
            aria-expanded=${br(e,"ineligible")?"true":"false"}
            title="worker-ineligible label이 붙어 워커 실행 대상이 아닙니다"
          >
            worker-ineligible
          </button>`:l?c`<button
              type="button"
              class="ctl-chip ctl-chip--label judgement-chip worker-card__session-preferred"
              data-chip-key="session_preferred"
              aria-expanded=${br(e,"session_preferred")?"true":"false"}
              title=${a}
            >
              세션 권장
            </button>`:""}${vi(e.rec,br(e,"rec"))}${Dg(u,br(e,"qfr"))}
      ${m||R?"":ui(e)}
    </div>
    <div class="worker-card__title">${e.title}</div>
    ${u?Ws(u,e.status,{onOpenDoc:n.onOpenDoc}):""}${W}
    ${M||I||L||U||Y?c`<div class="worker-chips">
          ${M}${I}${L}${U}${gi(e.exec_chips,{pin:n.exec_chips_mode==="pinned_only"})}
        </div>`:""}
    <div
      class="worker-card__foot${e.reason?"":" worker-card__foot--actions-only"}"
    >
      ${s?c`<div class="worker-card__place-menu">
            ${Qa(t.lanes,e.id)}
            <button
              type="button"
              class="op-btn op-btn--icon worker-card__place-cancel"
              data-bead-id=${e.id}
              title="레인 선택 취소"
              aria-label="레인 선택 취소"
            >
              ✕
            </button>
          </div>`:c`${e.reason?c`<span
                  class="worker-card__reason${_?" worker-card__reason--danger":""}"
                  >${e.reason}</span
                >`:""}
            <!-- 버튼식 큐 적재 (UI-58y2 §[대기로 ↴]): 후보 레인에서 대기로 가는
                 유일한 경로다 (UI-d13v §6). queue_placeable 하나가 준비도
                 세그먼트와 같은 자격을 말하며, blocked 자체는 막지 않는다.
                 포인터 종류로 감추지 않는다: 드래그라는 대체 경로가 없다. -->
            <button
              type="button"
              class="op-btn op-btn--primary worker-card__place"
              data-bead-id=${e.id}
              ?disabled=${!i}
              title=${Nr({placeable:i,route_ok:e.route_ok,worker_ineligible:r,awaiting_user:p,missing_description:d,spec:e.placement_spec})}
            >
              ↴ 대기로
            </button>`}
    </div>
    ${bo(e)}
  </div>`}function Vn(e){let t=!!e.collapsible&&!!e.collapsed,n=typeof e.count=="number"?e.count:e.items.length,r=c`<span
      class="worker-pane__dot worker-pane__dot--${e.lane}"
      aria-hidden="true"
    ></span>
    <span class="worker-pane__title">${e.title}</span>
    ${t&&e.preview?c`<span class="worker-pane__preview">${e.preview}</span>`:""}
    <span class="worker-pane__count">${n}</span>
    ${typeof e.match_count=="number"?c`<span class="worker-pane__match">일치 ${e.match_count}</span>`:""}`;return c`<section
    class="worker-pane worker-pane--lane-${e.lane}${e.src?" worker-pane--src":""}${e.live?" worker-pane--live":""}${e.collapsible?" worker-pane--collapsible":""}${t?" worker-pane--collapsed":""}"
    id=${pn(e.id||void 0)}
    data-lane=${e.lane}
  >
    ${e.collapsible?c`<header class="worker-pane__hd">
          <button
            type="button"
            class="worker-pane__toggle"
            data-lane=${e.lane}
            aria-expanded=${t?"false":"true"}
          >
            <span class="worker-pane__caret" aria-hidden="true"
              >${t?"\u25B8":"\u25BE"}</span
            >
            ${r}
          </button>
          ${t||!e.header_control?"":e.header_control}
        </header>`:c`<header class="worker-pane__hd">
          ${r}${e.header_control?e.header_control:""}
        </header>`}
    ${t?"":c`${e.header_row?e.header_row:""}${e.controls?e.controls:""}
          <div class="worker-pane__body">
            ${e.body?e.body:e.items.length===0?c`<div class="worker-pane__empty">
                    ${e.empty||""}
                  </div>`:e.items.map(o=>e.lane==="candidate"?Ja(o,e.place_menu,{onOpenDoc:e.onOpenDoc}):qn(o))}
          </div>`}
  </section>`}function rd(e,t,n){return c`<button
      type="button"
      class="worker-wait__area-toggle"
      data-area=${e}
      aria-expanded=${n?"false":"true"}
      aria-label=${`${t} ${n?"\uD3BC\uCE58\uAE30":"\uC811\uAE30"}`}
    >
      ${n?"\u25B8":"\u25BE"}
    </button>
    <span class="worker-wait__area-name">${t}</span>`}function $i(e){let t=e.parallel,n=e.serial,r=t.drop||{};return c`<div class="worker-wait">
    <section
      class="worker-wait__area worker-wait__area--parallel${t.collapsed?" is-collapsed":""}"
      data-area="parallel"
    >
      <header class="worker-wait__area-hd">
        ${rd("parallel","\uBCD1\uB82C \uC601\uC5ED",t.collapsed)}
        <span class="worker-wait__area-count">${t.count}</span>
      </header>
      ${t.collapsed?"":c`<div
            class="worker-wait__area-body"
            data-drop=${pn(r.drop)}
            data-root-dir=${pn(r.root_dir)}
            data-lane-id=${pn(r.lane_id)}
            data-lane-length=${pn(r.lane_length)}
          >
            ${t.rows.length===0?c`<div class="worker-pane__empty">
                  비어 있음 — 드래그로 배치
                </div>`:t.rows}
          </div>`}
    </section>
    <section
      class="worker-wait__area worker-wait__area--serial${n.collapsed?" is-collapsed":""}"
      data-area="serial"
    >
      <header class="worker-wait__area-hd">
        ${rd("serial","\uC9C1\uB82C \uC601\uC5ED",n.collapsed)}
        ${n.header_control?n.header_control:""}
      </header>
      ${n.collapsed?"":c`<div class="worker-wait__area-body">
            ${n.notice?n.notice:""}
            ${n.extra_panes?n.extra_panes:""}
            ${n.lanes.map(o=>jg(o))}
          </div>`}
    </section>
  </div>`}function jg(e){let t=e.drop||{},n=e.badge?c`<span
        class="worker-lane__badge${e.held?" worker-lane__badge--held":""}"
        >${e.badge}</span
      >`:"";return c`<div
    class="worker-wait__lane${e.empty?" worker-wait__lane--empty":""}"
  >
    ${Vn({id:typeof e.pane_id=="string"?e.pane_id:`worker-pane-lane-${e.id}`,lane:e.id,title:e.title,items:[],count:e.count,match_count:e.match_count,empty:"\uBE44\uC5B4 \uC788\uC74C \u2014 \uD589\uC744 \uC5EC\uAE30\uB85C \uB4DC\uB798\uADF8",header_control:c`${n}${e.header_control?e.header_control:""}`,body:c`<div
        class="worker-wait__rows"
        data-drop=${pn(t.drop)}
        data-root-dir=${pn(t.root_dir)}
        data-lane-id=${pn(t.lane_id)}
        data-lane-length=${pn(t.lane_length)}
      >
        ${e.rows.length===0?c`<div class="worker-pane__empty">
              비어 있음 — 행을 여기로 드래그
            </div>`:e.rows}
      </div>`})}
    ${e.empty?c`<div class="worker-wait__hint">${e.title} · 비어 있음</div>`:""}
    ${e.cycle?c`<div class="worker-lane__cycle">
          ⚠ blocks 순환 감지 — 자동 정렬을 생략했습니다
        </div>`:""}
    ${e.after?e.after:""}
  </div>`}function xi(e){return e.count?c`<section
    class="worker-now${e.live?" worker-pane--live":""}"
    id="worker-now"
  >
    <header class="worker-now__hd">
      <span
        class="worker-pane__dot worker-pane__dot--running"
        aria-hidden="true"
      ></span>
      <span class="worker-now__title">지금</span>
      <span class="worker-now__count">${e.count}</span>
    </header>
    ${e.running_body?e.running_body:""}
    ${e.pr_wait_rows?e.pr_wait_rows:""}
  </section>`:""}var bd=[{step:"merge",label:"\uBA38\uC9C0",index:1},{step:"base",label:"base",index:2},{step:"verify",label:"\uAC80\uC99D",index:3},{step:"deploy",label:"\uBC30\uD3EC",index:4},{step:"child",label:"\uC790\uC2DD",index:5},{step:"branch",label:"\uBE0C\uB79C\uCE58",index:6},{step:"close",label:"close",index:7}],Xo=[{step:"base_containment",label:"base \uD3EC\uD568 \uD655\uC778"},{step:"repo_operations",label:"\uC800\uC7A5\uC18C \uC791\uC5C5"},{step:"post_merge_jobs",label:"\uBA38\uC9C0 \uD6C4 \uC7A1"},{step:"child_sweep",label:"\uC790\uC2DD \uC815\uB9AC"},{step:"branch_cleanup",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC"},{step:"parent_close",label:"\uBD80\uBAA8 close"}];function Ai(e,t){let n=bd.find(o=>o.step===e);if(!n)return null;let r=bd.length;return{step:n.step,label:t,index:n.index,total:r,percent:Math.round(n.index/r*100)}}function yd(e){let t=Xo.findIndex(n=>n.step===e);return Xo.map((n,r)=>({step:n.step,label:n.label,state:t<0?"todo":r<t?"done":r===t?"stall":"todo"}))}function Fr(e){let t=Xo.find(n=>n.step===e);return t?t.label:typeof e=="string"?e:""}function Fg(e){let t=Xo.findIndex(n=>n.step===e);return t<0?null:{index:t+1,total:Xo.length}}function Si(e){let t=Fg(e);return t?`\uBA38\uC9C0 \uC644\uB8CC \xB7 \uC815\uB9AC ${t.total}\uB2E8\uACC4 \uC911 ${t.index}\uB2E8\uACC4\uC5D0\uC11C \uBA48\uCDA4`:"\uBA38\uC9C0\uB428 \xB7 \uC815\uB9AC \uBBF8\uC644"}var tl=new Set(["queued","running","retry_pending"]),vd=new Set(["failed","succeeded"]),Bg={queued:"\uB300\uAE30",running:"\uC911",retry_pending:"\uC7AC\uC2DC\uB3C4 \uB300\uAE30",failed:"\uC2E4\uD328",succeeded:"\uC644\uB8CC \xB7 \uC815\uB9AC \uC7AC\uC2DC\uB3C4 \uB300\uAE30"},Zo={base_containment:{step:"base",label:"base \uD655\uC778 \uC911"},child_sweep:{step:"child",label:"\uC790\uC2DD \uC815\uB9AC \uC911"},branch_cleanup:{step:"branch",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC \uC911"},parent_close:{step:"close",label:"\uBD80\uBAA8 close \uC911"}},Ug={merging:{step:"merge",label:"\uBA38\uC9C0 \uC911"},base_containment:Zo.base_containment,child_sweep:Zo.child_sweep,branch_cleanup:Zo.branch_cleanup,parent_close:Zo.parent_close};function Wg(e){return typeof e=="string"&&/^[0-9a-f]{40}$/.test(e)}function zg(e,t,n){return!["verify","deploy"].includes(e.kind)||![...tl,...vd].includes(e.state)||![null,void 0,""].includes(e.superseded_by)||!Array.isArray(e.subjects)?!1:e.subjects.some(r=>r&&typeof r=="object"&&r.bead_id===t&&r.merged_sha===n)}function Hg(e,t){let n=(t.kind==="deploy"?2:1)-(e.kind==="deploy"?2:1);if(n!==0)return n;let r=u=>u.state==="succeeded"?1:2,o=r(t)-r(e);if(o!==0)return o;let i=typeof e.requested_at=="number"?e.requested_at:0,s=typeof t.requested_at=="number"?t.requested_at:0;if(i!==s)return s-i;let l=typeof e.operation_id=="string"?e.operation_id:"",a=typeof t.operation_id=="string"?t.operation_id:"";return l.localeCompare(a)}function el(e,t=!1){let n=e.kind,r=n==="verify"?"\uAC80\uC99D":"\uBC30\uD3EC",o=t?"failed":e.state,i=Bg[o];if(!i)return null;let s=Ai(n,`${r} ${i}`);return s?{...s,active:tl.has(o),failed:o==="failed"}:null}function Kg(e){return!e||typeof e!="object"?null:Ug[e.step]||null}function Jo(e){if(!e||typeof e.bead_id!="string")return null;let t=e.bead_id,n=e.merge_progress&&typeof e.merge_progress=="object"?e.merge_progress:{},r=Kg(n),o=e.cleanup_failed&&typeof e.cleanup_failed=="object"?e.cleanup_failed:null,i=["post_merge_jobs","child_sweep","branch_cleanup","parent_close"].includes(typeof e.cleanup_cursor=="string"?e.cleanup_cursor:""),s=!i&&(e.cleanup_cursor==="repo_operations"||n.step==="repo_operations"),l=Wg(e.merge_sha)?e.merge_sha:null,a=!i&&l&&Array.isArray(e.repo_operations)?e.repo_operations.filter(y=>y&&typeof y=="object"&&zg(y,t,l)).sort(Hg):[],u=s?a:[],d=u.find(y=>tl.has(y.state));if(d)return el(d);if(o)return o.step==="repo_operations"&&a[0]?el(a[0],!0):null;let p=u.find(y=>vd.has(y.state)?y.state!=="succeeded"||e.cleanup_cursor==="repo_operations":!1);if(p)return el(p);if(r){let y=Ai(r.step,r.label);return y?{...y,active:!0,failed:!1}:null}let _=typeof e.cleanup_cursor=="string"?Zo[e.cleanup_cursor]:null;if(!_)return null;let m=Ai(_.step,_.label);return m?{...m,active:!0,failed:!1}:null}function Ei(e){return!!e&&e.step!=="merge"&&e.failed!==!0}var Gg="\uBBF8\uC801\uC7AC";function nl(e,t){let n=Jn(e,t.id);return{id:t.id,label:`\u26D3 ${t.id}`,title:`\uC120\uD589 \u2014 close\uB420 \uB54C\uAE4C\uC9C0 \uCD9C\uBC1C\uD558\uC9C0 \uC54A\uB294\uB2E4 (${t.location_label})`,...n?{foreign:!0}:{}}}var Yg=10080*60*1e3;function kd(e,t,n){let r=t.closed_at;if(typeof r!="number"||!Number.isFinite(r)||r<n-Yg)return null;let o=Jn(e,t.id),i=typeof t.root_dir=="string"?t.root_dir:"",s={id:t.id,label:`\u{1F513} ${t.id}`,title:`\uD574\uC81C \u2014 ${nn(r)}\uC5D0 close\uB418\uC5B4 \uC774 \uC774\uC288\uAC00 \uD480\uB838\uB2E4`,...o?{foreign:!0}:{}};return o?i.length>0&&(s.openable=!0,s.root_dir=i):s.openable=!0,s}function wd(e,t){let n=Array.isArray(t.ids)?t.ids.filter(i=>typeof i=="string"&&i.length>0):[],r=t.root_dirs&&typeof t.root_dirs=="object"?t.root_dirs:{},o=[];for(let i of[...new Set(n)].sort()){let s=Jn(e,i),l=typeof r[i]=="string"?r[i]:"",a={id:i,label:`\u2192 ${i}`,title:"\uD6C4\uC18D \u2014 \uC774 \uC774\uC288\uAC00 close\uB418\uBA74 \uD480\uB9B0\uB2E4",...s?{foreign:!0}:{}};l.length>0?(a.openable=!0,a.root_dir=l):s||(a.openable=!0),o.push(a)}return o}function $d(e,t,n={}){let r=new Map,o=new Map;for(let i of t)o.has(i.id)||o.set(i.id,i.location_label);for(let[i,s]of e){if(typeof i!="string"||i.length===0)continue;let l=[];for(let a of Array.isArray(s)?s:[]){if(typeof a!="string"||a.length===0)continue;let u=nl(i,{id:a,location_label:o.get(a)||Gg}),d=n[a];u.foreign!==!0?u.openable=!0:typeof d=="string"&&d.length>0&&(u.openable=!0,u.root_dir=d),l.push(u)}l.length>0&&r.set(i,l)}return r}var Ci=1,es=[{value:"repo_spec",label:"\uB808\uD3EC \xB7 spec \uC6B0\uC120"},{value:"repo_updated",label:"\uB808\uD3EC \xB7 \uCD5C\uC2E0 \uC218\uC815"},{value:"updated_flat",label:"\uCD5C\uC2E0 \uC218\uC815(\uB808\uD3EC \uBB34\uC2DC)"}],ts=[{value:"all",label:"\uC804\uCCB4"},{value:"ready",label:"\uCC29\uC218 \uAC00\uB2A5"},{value:"not_ready",label:"\uC900\uBE44 \uD544\uC694"}],vo={show_blocked:!0,readiness:"all"},xd={auto_merge:"\uC790\uB3D9 \uBA38\uC9C0",merged:"\uBA38\uC9C0",merge:"\uBA38\uC9C0",pr_stop:"PR \uC911\uB2E8",stopped:"\uC911\uB2E8",failed:"\uC2E4\uD328",refuted:"\uBC18\uC99D",no_delta:"\uBB34-delta"};function Vg(e,t){let n=null;for(let r of Object.values(e||{}))!r||r.bead_id!==t||!rr(r)||(n=typeof r.status=="string"?r.status:null);return n}function Qg(e,t){let n=null,r=-1/0;for(let o of Object.values(e)){if(!o||o.bead_id!==t||o.status==="running"||!rr(o))continue;let i=typeof o.finished_at=="number"?o.finished_at:typeof o.started_at=="number"?o.started_at:0;i>=r&&(r=i,n=o)}return n}function td(e){let t=st(e),n=new Map;for(let r of Array.isArray(t.done)?t.done:[])r&&typeof r.bead_id=="string"&&typeof r.added_at=="number"&&n.set(r.bead_id,r.added_at);return new Set(Rd(st(t.attempts),n).keys())}function Rd(e,t,n={}){let{winners:r,resumed_from_ids:o}=xu(e,t),i=new Map;for(let[s,l]of r){let a=l.attempt,u=l.run_state;if(Ld(a))continue;let d=l.started_at,p=typeof a.session_id=="string"&&a.session_id.length>0,m=si(a.quickfix_landing)==="session",y=u!=="running"&&(p||!m)&&!o.has(a.attempt_id),C=!p&&m?"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":o.has(a.attempt_id)?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":null,R=st(n.observations?.[s]),V=st(R.pr),te=typeof a.merge_sha=="string"&&a.merge_sha.length>0||V.state==="MERGED",W=or(n.discard_operations,s,{attempt_id:a.attempt_id,merged:te}),M=u==="failed"?Sd(a,{resume_eligible:y,resume_reason:C,confirmation:W.confirmation,history:n.bead_timelines?.[s]}):null;i.set(s,{...Ad(a,e,u),started_at:d,...M?{failure:M}:{},can_pause:u==="running"&&p,can_resume:y})}for(let[s,l]of oh(e,t)){if(i.has(s))continue;let a=l.attempt,u=or(n.discard_operations,s,{attempt_id:a.attempt_id}),d=Dd(a),p=l.run_state==="provider_hold"?nh(a,{provider_hold:n.provider_hold,auto_resume_pending:n.auto_resume_pending,account_catalog:n.account_catalog,attempts:e,history:n.bead_timelines?.[s]}):null;i.set(s,{...Ad(a,e,l.run_state),started_at:typeof a.started_at=="number"?a.started_at:null,...l.run_state==="parked"?{failure:Sd(a,{resume_eligible:!1,resume_reason:"\uC138\uC158 \uB300\uAE30 \u2014 [\uC7AC\uC2DC\uB3C4]\uAC00 \uC0C8 attempt\uB97C \uB744\uC6C1\uB2C8\uB2E4",confirmation:u.confirmation,history:n.bead_timelines?.[s]})}:{},...l.run_state==="waiting"?{wait:Xg(a)}:{},...p?{hold:p}:{},...d?{retry:d}:{},can_pause:!1,can_resume:l.run_state==="provider_hold"})}return i}function Ad(e,t,n){return{attempt_id:typeof e.attempt_id=="string"?e.attempt_id:"",run_state:n,last_event_at:typeof e.last_event_at=="number"?e.last_event_at:null,last_activity:e.last_activity&&typeof e.last_activity=="object"?e.last_activity:null,legs:Array.isArray(e.legs)?e.legs:[],runner:typeof e.runner=="string"?e.runner:null,model:typeof e.model=="string"?e.model:null,effort:typeof e.effort=="string"?e.effort:null,speed:typeof e.speed=="string"?e.speed:null,resumed_from:typeof e.resumed_from=="string"?e.resumed_from:null,continuation_mode:e.continuation_mode==="session"||e.continuation_mode==="fresh"?e.continuation_mode:null,status:typeof e.status=="string"?e.status:null,usage:nr(t,e.bead_id)}}function Sd(e,t){let n=e.cause_detail&&typeof e.cause_detail=="object"?e.cause_detail:null;return{cause:typeof e.cause=="string"?e.cause:null,cause_detail:n,summary:n&&typeof n.summary=="string"?n.summary:null,bead_id:typeof e.bead_id=="string"?e.bead_id:"",finished_at:typeof e.finished_at=="number"?e.finished_at:null,runner:typeof e.runner=="string"?e.runner:null,model:typeof e.model=="string"?e.model:null,effort:typeof e.effort=="string"?e.effort:null,observed_effort:typeof e.observed_effort=="string"?e.observed_effort:null,speed:typeof e.speed=="string"?e.speed:null,attempt_id:typeof e.attempt_id=="string"?e.attempt_id:"",usage:e.usage&&typeof e.usage=="object"?e.usage:null,halted_auto_advance:e.halted_auto_advance===!0,quickfix_lane:e.quickfix_lane===!0,quickfix_landing:e.quickfix_landing&&typeof e.quickfix_landing=="object"?e.quickfix_landing:null,retry:Dd(e),resume_eligible:t.resume_eligible,resume_reason:t.resume_reason,landed:ud(e),confirmation:t.confirmation,...Id(t.history)}}function Id(e){if(!e||typeof e!="object")return{};let t=Array.isArray(e.events)?e.events:[],n=[];for(let o of t)!o||typeof o!="object"||typeof o.summary!="string"||o.summary.length===0||n.push({event_id:typeof o.event_id=="string"?o.event_id:"",kind:typeof o.kind=="string"?o.kind:"",summary:o.summary,at:typeof o.at=="number"?o.at:null});n.reverse();let r=typeof e.log_path=="string"&&e.log_path.length>0?e.log_path:null;return{...n.length>0?{timeline:n}:{},...r===null?{}:{log_path:r},...e.log_expired===!0?{log_expired:!0}:{},...e.log_unreadable===!0?{log_unreadable:!0}:{}}}function Xg(e){let t=e.cause_detail&&typeof e.cause_detail=="object"?e.cause_detail:null,n=Array.isArray(t?.blockers)?t.blockers:[],r=[];for(let o of n)!o||typeof o!="object"||typeof o.id!="string"||o.id.length===0||r.push({id:o.id,rig:typeof o.rig=="string"?o.rig:null,status:typeof o.status=="string"?o.status:""});return{summary:t&&typeof t.summary=="string"?t.summary:null,blockers:r,since:typeof e.finished_at=="number"?e.finished_at:null}}function Ld(e){return e?.status==="paused"&&typeof e.cause=="string"&&e.cause.startsWith("provider_outage:")}function Zg(e,t){let n=typeof e.runner=="string"?e.runner:"",r=st(t)[n];return!r||!Array.isArray(r.targets)?null:r.targets.find(o=>Array.isArray(o?.attempt_ids)&&o.attempt_ids.includes(e.attempt_id))||null}function Jg(e,t){if(e===null)return null;let n=st(t).claude;if(!Array.isArray(n))return null;let r=n.find(o=>o?.email===e);return r&&typeof r.alias=="string"&&r.alias.length>0?r.alias:null}function eh(e,t){let n=e,r=new Set;for(;n&&!r.has(n.attempt_id);){if(r.add(n.attempt_id),n.auto_resume_kind==="provider_outage")return!0;n=typeof n.resumed_from=="string"?t[n.resumed_from]:null}return!1}function th(e,t,n,r){if((Array.isArray(r.auto_resume_pending)?r.auto_resume_pending:[]).some(s=>s?.attempt_id===e.attempt_id))return"pending";let i=e.auto_resume_refused;return typeof i=="string"&&i.length>0?`refused:${i}`:n.startsWith("auto_resume_disarmed:")||t?.auto_switch==="cap"||eh(e,r.attempts)?"disarmed":null}function nh(e,t){let n=e.cause.slice(16),r=e.cause_detail&&typeof e.cause_detail=="object"?e.cause_detail:null,o=Zg(e,t.provider_hold),i=typeof o?.model=="string"&&o.model.length>0?o.model:typeof e.model=="string"&&e.model.length>0?e.model:null,s=typeof o?.account=="string"&&o.account.length>0?o.account:typeof e.claude_account=="string"&&e.claude_account.length>0?e.claude_account:null,l=typeof o?.last_error=="string"?o.last_error:"",a=th(e,o,l,{auto_resume_pending:t.auto_resume_pending,attempts:t.attempts}),u=typeof o?.resets_at=="number"?o.resets_at:typeof r?.resets_at=="number"?r.resets_at:null,d=typeof o?.next_probe_at=="number"?o.next_probe_at:null,p=Jg(s,t.account_catalog),_=Id(t.history);return{kind:o?.kind==="usage_limit"||n==="usage_limit"?"usage_limit":"outage",detail:n,...typeof r?.message=="string"?{message:r.message}:{},...typeof r?.summary=="string"?{summary:r.summary}:{},...i||s?{target:{...i?{model:i}:{},...s?{account:s}:{},...p?{account_alias:p}:{}}}:{},...u===null?{}:{resets_at:u},...a===null?{}:{auto_resume:a},...o?.auto_switch==="none"||o?.auto_switch==="disabled"?{auto_switch:o.auto_switch}:{},...d===null?{}:{next_probe_at:d},..._.log_path?{log_path:_.log_path}:{}}}function Dd(e){let t=e&&e.retry&&typeof e.retry=="object"?e.retry:null;return t?{cause:typeof t.cause=="string"?t.cause:null,attempts:typeof t.attempts=="number"?t.attempts:0,max:typeof t.max=="number"?t.max:0,next_at:typeof t.next_at=="number"?t.next_at:null}:null}var rh=new Set(["parked","retry_wait","waiting"]);function oh(e,t){let n=Object.values(e||{}),r=new Set(n.map(s=>s?.resumed_from).filter(s=>typeof s=="string")),o=new Map;for(let s of n)s&&typeof s.bead_id=="string"&&rr(s)&&o.set(s.bead_id,s.attempt_id);let i=new Map;for(let s of n){let l=Ld(s);if(!s||typeof s.bead_id!="string"||s.bead_id.length===0||!rr(s)||!rh.has(s.status)&&!l||o.get(s.bead_id)!==s.attempt_id||typeof s.dismissed_at=="number"||l&&r.has(s.attempt_id))continue;let a=t.get(s.bead_id);typeof a=="number"&&a>0&&typeof s.finished_at=="number"&&a>=s.finished_at||i.set(s.bead_id,{attempt:s,run_state:l?"provider_hold":s.status})}return i}function Ed(e,t){let n=e[t];if(!n)return"";if(n.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let r=typeof n.reason=="string"?n.reason:"";if(r==="prerequisite_unmet"&&Array.isArray(n.blockers)&&n.blockers.length>0)return"\u26D3 \uC120\uD589 \uB300\uAE30";let o=r.indexOf(":");return o>0&&o<r.length-1?`\u26D4 ${r.slice(0,o)} (${r.slice(o+1)})`:`\u26D4 ${r}`}function st(e){return e&&typeof e=="object"?e:{}}function sh(e){let t=st(e).badge_codes;return Array.isArray(t)?t.filter(n=>typeof n=="string"&&n.length>0):[]}function ih(e,t,n){let r=st(t);if(Object.keys(r).length===0)return null;let o=e.execution_defaults,i=e.runner_catalog,s=e.session_defaults;if(!o||!i||!s)return null;let l=_=>En({pin:_,global:s,execution_defaults:o,runner_catalog:i,route:n}),a,u;try{a=l(r),u=l(null)}catch{return null}let d=Td(go(a,i),go(u,i)),p=Td(Mr(a,null),Mr(u,null));return d||p?{orchestration:d,worker:p}:null}function Td(e,t){return!e||t&&t.text===e.text?null:e}function ah(e,t,n){let o=(t&&typeof t=="object"&&Array.isArray(t.released_by)?t.released_by:[]).filter(s=>s&&typeof s=="object"&&typeof s.id=="string").slice().sort((s,l)=>(typeof l.closed_at=="number"?l.closed_at:0)-(typeof s.closed_at=="number"?s.closed_at:0)),i=[];for(let s of o){let l=kd(e,s,n);l&&i.push(l)}return i.length===0?null:i}function sl(e,t){return typeof e!="string"||e.length===0||typeof t!="string"||t.length===0||t===e?null:`\u2192 ${t}`}var lh=new Set(["quick_fix","spec_backed","full_plan"]);function Cd(e){return typeof e=="string"&&lh.has(e)}function ch(e){let t={...st(e.session_defaults)};for(let n of["orchestration_model","orchestration_effort","orchestration_speed","quick_fix_orchestration_model","quick_fix_orchestration_effort","quick_fix_orchestration_speed"]){let r=e[n];typeof r=="string"&&(t[n]=r)}return t}function uh(e,t,n){let r=e.runner_catalog??null,o=ol(e,t,n,null);if(!o)return null;let i=Mn(r,o.orchestration_model.value??""),s=i===null?o:ol(e,t,n,i)||o,l=go(s,r),a=Mr(s,i);return l||a?{orchestration:l,worker:a}:null}function ol(e,t,n,r){let o=Cd(n)?n:Cd(t.route)?t.route:null;try{return En({pin:t,global:ch(e),execution_defaults:e.execution_defaults??null,runner_catalog:e.runner_catalog??null,route:o,controller_runtime:r})}catch{return null}}function dh(e,t,n){return!t||!Object.hasOwn(t,"metadata")?null:Mr(ol(e,st(t.metadata),t.route,n),n)}function il(e,t){let n=new Set,r=e;for(;r&&!n.has(r.attempt_id);){if(r.conflict_resolution===!0)return!0;n.add(r.attempt_id),r=typeof r.resumed_from=="string"&&r.resumed_from.length>0&&t.get(r.resumed_from)||null}return!1}function ph(e){let t={};for(let l of Gn)t[l]=0;let n=!1,r=0,o=0,i=0;for(let l of e){let a=l.usage;if(!a||typeof a!="object")continue;let u=!1;for(let d of Gn)Number.isFinite(a[d])&&(t[d]+=a[d],n=!0,u=!0);u&&(o+=1,Number.isFinite(a.total_cost_usd)&&(r+=a.total_cost_usd,i+=1))}o>0&&i===o&&(t.total_cost_usd=r);let s=e.map(l=>l.usage).filter(l=>l&&typeof l=="object"&&l.providers);return s.length>0?un(Qs(s)):n?tr(t):null}function Pd(e,t){let n=zo(e,t);return n==="internal"?"\uBBF8\uC801\uC7AC":n==="external"?"\uC678\uBD80":"\uC704\uCE58 \uBBF8\uD655\uC778"}function fh(e,t,n){let r=t.get(e);if(!r)return Pd(e,n);if(typeof r.position=="number"){if(r.lane==="parallel")return`#${r.position}`;if(/^s[1-5]$/.test(r.lane))return`${r.lane} #${r.position}`}return Wo(r)}function _h(e,t,n,r,o,i){let s=t.get(e);if(!s)return{label:i&&zo(e,n)==="internal"?"\uC9C4\uD589 \uB300\uAE30":Pd(e,n),title:""};if(s.state==="runnable"&&i&&zo(e,n)==="internal")return{label:"\uC9C4\uD589 \uB300\uAE30",title:""};if(typeof s.position=="number"&&(s.lane==="parallel"||/^s[1-5]$/.test(s.lane))){let a=r.get(e),u=s.lane==="parallel"?"\uBCD1\uB82C":s.lane,d=o.get(e);return{label:!!d&&d.reason==="prerequisite_unmet"&&Array.isArray(d.blockers)&&d.blockers.length>0?"\u26D3 \uC120\uD589 \uB300\uAE30":a&&a.length>0?"\u{1F512} \uB300\uAE30":"\uB300\uAE30",title:`${s.workspace_name||s.root_dir} ${u} #${s.position}`}}return{label:s.state==="running"?"\u25B6 \uC2E4\uD589\uC911":Wo(s),title:""}}function mh(e,t){for(let n of Object.values(e||{}))if(n&&n.attempt_id===t&&typeof n.armed_by_lane=="string"&&n.armed_by_lane.length>0)return n.armed_by_lane;return null}function gh(e,t,n,r,o,i){return t==="draft"?{state:"draft",badge:"draft",run_label:null,can_stop:!1}:n.some(s=>i.failed_by_bead.get(s.id)===e)?{state:"failed",badge:"\u26D4 \uC2E4\uD328",run_label:"\u25B6 \uB2E4\uC2DC \uC9C4\uD589",can_stop:!1}:i.disarmed_lanes.has(e)?{state:"restart",badge:"\u23F8 \uC7AC\uC2DC\uC791",run_label:"\u25B6 \uC9C4\uD589",can_stop:!1}:n.some(s=>i.armed_by_bead.get(s.id)===e)?{state:"running",badge:"\u25B6 \uC9C4\uD589 \uC911",run_label:o.length>0?"\u25B6 \uC774\uC5B4\uC11C \uC9C4\uD589":null,can_stop:!0}:r?{state:"all_done",badge:"\uBAA8\uB450 \uC644\uB8CC",run_label:null,can_stop:!1}:{state:"confirmed",badge:"\uD655\uC815",run_label:"\u25B6 \uC9C4\uD589",can_stop:!1}}function hh(e,t,n,r,o,i,s,l){let a=[];return e.forEach((u,d)=>{let p=typeof u.id=="string"?u.id:"";if(p.length===0)return;let _=u.status==="confirmed"?"confirmed":"draft",m=Array.isArray(u.entries)?u.entries:[],y=[];m.forEach((te,W)=>{let M=te&&typeof te.bead_id=="string"?te.bead_id:"";if(M.length===0)return;let I=te&&typeof te.root_dir=="string"?te.root_dir:"",L=n.get(M),U=L?L.state:void 0,Y=U==="running"||U==="pr_wait"||U==="done",q=!L||U==="runnable",N=L&&L.lane==="parallel"&&typeof L.position=="number"?L.position-1:null,z=_h(M,n,r,t,l,_==="confirmed"),G=y.length>0?y[y.length-1]:null,oe=_==="confirmed"&&G!==null&&!G.done&&!(t.get(M)||[]).includes(G.id);y.push({id:M,title:o.get(M)||M,root_dir:L?L.root_dir:I,workspace_name:L?L.workspace_name:i.get(I)||"",seq:W+1,location_label:z.label,location_title:z.title,draggable:!Y,fixed:Y,done:U==="done",unplaced:q,mismatch:oe,...N!==null?{queue_index:N}:{}})}),y.forEach((te,W)=>{te.seq=W+1});let C=y.length>0&&y.every(te=>te.done),R=y.filter(te=>!te.fixed&&s.armed_by_bead.get(te.id)!==p).map(te=>te.id),V=gh(p,_,y,C,R,s);a.push({lane_id:p,status:_,draft:_==="draft",number:d+1,label:`\uC5F0\uACB0 ${d+1} \xB7 \uB808\uD3EC \uAC04`,rows:y,all_done:C,can_confirm:_==="draft"&&y.length>=2,has_mismatch:_==="confirmed"&&y.some(te=>te.mismatch),unlaunched:R,...V})}),a}function bh(e,t,n){if(e.lane==="runnable"){let s=n.get(e.id);return s?s.length===0?{scope:[],state:"missing"}:{scope:s,state:"declared"}:{scope:[],state:void 0}}let r=t.get(e.root_dir),o=r?r[e.id]:void 0;if(!o||!Array.isArray(o.scope))return{scope:[],state:void 0};let i=o.scope.filter(s=>typeof s=="string"&&s.length>0);return{scope:i,state:i.length===0?"missing":"declared"}}function yh(e,t,n,r,o){let i=new Map;for(let a of[...e.running,...e.queue,...e.runnable,...e.pr_wait]){if(!t.has(a.root_dir))continue;let u=`${a.root_dir}\0${a.id}`,d=i.get(u);if(d){d.cards.push(a);continue}let{scope:p,state:_}=bh(a,t,n);_!==void 0&&(a.scope_state=_),i.set(u,{cards:[a],scope:p})}let s=new Map;for(let a of i.values()){let u=a.cards[0].scope_state;if(u!==void 0)for(let _ of a.cards)_.scope_state=u;if(a.scope.length===0)continue;let d=a.cards[0].root_dir,p=s.get(d);p?p.push(a):s.set(d,[a])}let l=(a,u,d)=>{let p=u.cards[0],_={id:p.id,title:p.title,location_label:fh(p.id,r,o),prefixes:d,...typeof p.root_dir=="string"&&p.root_dir.length>0?{root_dir:p.root_dir}:{}};for(let m of a.cards)m.overlap_chips?m.overlap_chips.push(_):m.overlap_chips=[_]};for(let a of s.values())for(let u=0;u<a.length;u+=1)for(let d=u+1;d<a.length;d+=1){let p=li(a[u].scope,a[d].scope);p.length!==0&&(l(a[u],a[d],p),l(a[d],a[u],p))}}function Od(e,t,n){let r=n?n.get(t)?.root_dir:void 0,o=!Jn(e.id,t),i=typeof e.root_dir=="string"?e.root_dir:"",s=typeof r=="string"&&r.length>0?r:o&&i.length>0?i:"";return s.length>0?{openable:!0,root_dir:s}:o?{openable:!0}:{}}function vh(e,t,n,r){let o=new Set(e?e.ids:[]);for(let l of t&&Array.isArray(t.ids)?t.ids:[])typeof l=="string"&&l.length>0&&o.add(l);if(o.size===0)return{ids:[]};let i={},s={...e?e.root_dirs:{},...t&&t.root_dirs&&typeof t.root_dirs=="object"?t.root_dirs:{}};for(let l of o){let a=s[l];if(typeof a=="string"&&a.length>0){i[l]=a;continue}if(!Jn(n.id,l)){n.root_dir.length>0&&(i[l]=n.root_dir);continue}let u=r.get(l)?.root_dir;typeof u=="string"&&u.length>0&&(i[l]=u)}return{ids:[...o],root_dirs:i}}function rl(e){if(typeof e=="number")return Number.isFinite(e)?e:null;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:null}return null}function Ti(e){if(typeof e=="number"&&Number.isFinite(e))return e;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:0}return 0}function kh(e){let t=typeof e=="string"?e.trim().toLowerCase():"";return t.length===0?null:n=>{let r=typeof n.id=="string"?n.id.toLowerCase():"",o=typeof n.title=="string"?n.title.toLowerCase():"";return r.includes(t)||o.includes(t)}}function wh(e,t){let n=[e.runnable,e.runnable_all,e.queue,e.running,e.pr_wait,e.done,e.parallel_rows];for(let o of e.runnable_sections)n.push(o.items);let r=[];for(let o of e.queue_groups){n.push(o.items,o.sublanes.parallel);for(let i of o.sublanes.serial)n.push(i.items),r.push(i.occupants)}for(let o of n)for(let i of o)i.search_match=t(i);for(let o of r)for(let i of o)i.search_match=t(i)}function yr(e,t,n){let r=Array.isArray(e)?e:[],o=Array.isArray(t)?t:[],i=n&&typeof n.done_since=="number"?n.done_since:void 0,s={...vo,...n&&n.candidate_filter?n.candidate_filter:{}},l=n&&Object.hasOwn(n,"cross_lanes")?n.cross_lanes??null:void 0,a=n&&n.candidate_sort==="as_given"?"as_given":n&&es.some(A=>A.value===n.candidate_sort)?n.candidate_sort:"repo_spec",u=n&&n.groups==="all"?"all":"nonempty",d=n&&n.candidate_hidden_counts==="per_control"?"per_control":"sequential",p=Date.now(),_=new Map;for(let A of o)A&&typeof A.root_dir=="string"&&_.set(A.root_dir,A);let m=new Map;for(let A of o)A&&typeof A.root_dir=="string"&&m.set(A.root_dir,A.name||A.root_dir);for(let A of r)A&&typeof A.root_dir=="string"&&m.set(A.root_dir,A.name||A.root_dir);let y=[],C=[],R=[],V=[],te=[],W=[],M=new Map,I=new Map,L=new Map,U=new Map,Y=new Map,q=new Map,N=new Map,z=new Map,G=new Map,oe=new Map,ye=new Map,Me=new Map,F=new Map,X=new Map,Ae=new Set,Ee=new Map,O=new Map,se=new Map;for(let A of r){if(!A||typeof A.root_dir!="string")continue;let Z=A.root_dir,Ie=A.name||Z,Ge=_.get(Z),tt=Ge&&typeof Ge.revision=="number"?Ge.revision:typeof A.revision=="number"?A.revision:0,Ce=st(A.attempts),Ze=st(A.bead_titles);for(let[f,k]of Object.entries(Ze))typeof k=="string"&&k.length>0&&se.set(f,k);let Ut=st(A.bead_times),wt=st(A.pr_observations),bt=st(A.admission);for(let[f,k]of Object.entries(bt))k&&typeof k=="object"&&ye.set(f,k);let Ft=st(A.revise_parked),Ct=st(A.merge_queue_state),Mt=st(A.cleanup_failed),de=st(A.discard_operations),ke=st(A.bead_timelines),Ue=st(A.bead_blocked_by);Object.hasOwn(A,"bead_scope")&&Ee.set(Z,st(A.bead_scope));let rt=st(A.bead_workflow),et=st(A.pr_activity),je=Array.isArray(A.repo_operations)?A.repo_operations:[];z.set(Z,je);let x=typeof A.declared_base=="string"?A.declared_base:null;N.set(Z,x),q.set(Z,Object.entries(Mt).map(([f,k])=>({bead_id:f,step:k&&k.step?k.step:"",reason:k&&k.reason?k.reason:"",at:k&&typeof k.at=="number"?k.at:null,detail:k&&typeof k.detail=="string"?k.detail:null,output_tail:k&&typeof k.output_tail=="string"&&k.output_tail?k.output_tail:void 0,log_path:k&&typeof k.log_path=="string"&&k.log_path?k.log_path:void 0,retry_count:k&&typeof k.retry_count=="number"&&Number.isInteger(k.retry_count)&&k.retry_count>0?k.retry_count:0,failure_code:k&&typeof k.failure_code=="string"?k.failure_code:void 0})));for(let[f,k]of Object.entries(st(A.bead_overlay)))k&&typeof k=="object"&&G.set(`${Z}\0${f}`,k);let j=new Map;for(let f of Object.values(Ce))f&&typeof f.attempt_id=="string"&&j.set(f.attempt_id,f);let ae=Array.isArray(A.merge_queue)?A.merge_queue:[],ge=new Set(ae.filter(f=>f&&typeof f.bead_id=="string").map(f=>f.bead_id)),le=new Map(ae.filter(f=>f&&typeof f.bead_id=="string").map(f=>[f.bead_id,f])),it=new Map,It=new Map,yt=new Map,$t=new Map;ae.forEach((f,k)=>{f&&typeof f.bead_id=="string"&&(it.set(f.bead_id,k+1),It.set(f.bead_id,f.resolution),yt.set(f.bead_id,f.continuation_action||null),$t.set(f.bead_id,f.authority||null))});let xt=st(A.auto_merge_skips),Lt=f=>{let k=xt[f];if(!k)return null;let B=st(st(wt[f]).pr).head_sha;return B&&B===k.head_sha?k.reason||"":null};Y.set(Z,{positions:it,resolutions:It,continuations:yt,authorities:$t,state:{active:typeof Ct.active=="string"?Ct.active:null,failures:st(Ct.failures),waiting:Ct.waiting&&typeof Ct.waiting.bead_id=="string"&&typeof Ct.waiting.reason=="string"?Ct.waiting:null},auto_excluded:(Array.isArray(A.pr_wait)?A.pr_wait:[]).map(f=>f&&f.bead_id).filter(f=>typeof f=="string"&&Lt(f)!==null),running:ae.length>0});let qt=Array.isArray(A.queue)?A.queue:[];for(let f of[...qt,...Array.isArray(A.pr_wait)?A.pr_wait:[]])f&&typeof f.bead_id=="string"&&typeof f.armed_by_lane=="string"&&f.armed_by_lane.length>0&&F.set(f.bead_id,f.armed_by_lane);for(let f of Array.isArray(A.disarmed_on_load)?A.disarmed_on_load:[])typeof f=="string"&&f.length>0&&Ae.add(f);let Dt=(Array.isArray(A.serial_lanes)?A.serial_lanes:[]).filter(f=>f&&/^s[1-5]$/.test(f.id)&&Array.isArray(f.entries)),Jt=st(A.lane_states),Vt=typeof A.serial_lane_count=="number"?Math.max(0,Math.min(5,Math.floor(A.serial_lane_count))):Math.min(5,Dt.length);L.set(Z,Vt),U.set(Z,qt.length);let At=new Map(Dt.map(f=>[f.id,f])),Wt=new Map;for(let f of Dt)for(let k of f.entries)k&&typeof k.bead_id=="string"&&Wt.set(k.bead_id,f.id);for(let[f,k]of Object.entries(st(A.bead_dependents))){let B=Array.isArray(k?.ids)?k.ids:[],ce=st(k?.root_dirs),ue=Me.get(f)||{ids:new Set,root_dirs:{}};for(let Be of B)typeof Be=="string"&&Be.length>0&&ue.ids.add(Be);for(let[Be,_t]of Object.entries(ce))typeof _t=="string"&&_t.length>0&&(ue.root_dirs[Be]=_t);Me.set(f,ue)}for(let[f,k]of Object.entries(Ue))Array.isArray(k)&&oe.set(f,k.filter(B=>typeof B=="string"&&B.length>0));let zt=Array.isArray(A.done)?A.done:[];for(let f of zt)f&&typeof f.bead_id=="string"&&W.push({id:f.bead_id,root_dir:Z,workspace_name:Ie});let on=new Map;for(let f of zt)f&&typeof f.bead_id=="string"&&typeof f.added_at=="number"&&on.set(f.bead_id,f.added_at);let Kt=f=>({id:f,title:Ze[f]||f,root_dir:Z,workspace_name:Ie,expected_revision:tt,draggable:!1,...st(Ut[f]).created_at?{created_at:st(Ut[f]).created_at}:{},...st(Ut[f]).updated_at?{updated_at:st(Ut[f]).updated_at}:{}}),ln=f=>{let k=rt[f]?.chips?.pr;return k&&typeof k.number=="number"&&typeof k.url=="string"?{pr_number:k.number,pr_url:k.url}:{}},we=f=>Object.hasOwn(Ue,f)?{blocked_by:Array.isArray(Ue[f])?Ue[f].filter(k=>typeof k=="string"&&k.length>0):[]}:{},T=(f,k)=>{let B=we(f),ce=bt[f],ue=ce&&ce.reason==="prerequisite_unmet"&&Array.isArray(ce.blockers)?ce.blockers:[],Be=[...(k?.blockers||[]).map(gt=>gt.id),...ue.map(gt=>gt.id)].filter(gt=>typeof gt=="string"&&gt.length>0);if(Be.length===0)return B;let _t=[...B.blocked_by||[]];for(let gt of Be)_t.includes(gt)||_t.push(gt);return{blocked_by:_t}},ne=new Set;for(let[f,k]of Rd(Ce,on,{discard_operations:de,observations:wt,bead_timelines:ke,provider_hold:st(A.provider_hold),auto_resume_pending:Array.isArray(A.auto_resume_pending)?A.auto_resume_pending:[],account_catalog:st(A.account_catalog)})){ne.add(f);let B=k.run_state==="failed"?mh(Ce,k.attempt_id):null;B!==null&&X.set(f,B);let ce=j.get(k.attempt_id)||null,ue=G.get(`${Z}\0${f}`),Be=ue&&ue.rollup?ue.rollup:null,_t=sl(x,ce?ce.target_base:null),gt=ce?il(ce,j):!1,at=ce&&ce.quickfix_lane===!0&&ce.quickfix_landing&&typeof ce.quickfix_landing=="object"?ce.quickfix_landing:null,S=at&&typeof at.reason=="string"&&at.reason.length>0?at.reason:null,$=at?Jo({bead_id:f,merge_sha:at.head_sha,cleanup_cursor:at.cursor,cleanup_failed:S?{step:at.cursor,reason:S}:null,repo_operations:je}):null;C.push({...Kt(f),lane:"running",...T(f,k.wait),...Wt.has(f)?{serial_lane_id:Wt.get(f)}:{},attempt_id:k.attempt_id,run_state:k.run_state,status:k.status||void 0,workflow:rt[f]||null,can_pause:k.can_pause,can_resume:k.can_resume,started_at:k.started_at,last_event_at:k.last_event_at,last_activity:k.last_activity,legs:k.legs,runner:k.runner,model:k.model,effort:k.effort,speed:k.speed,resumed_from:k.resumed_from,continuation_mode:k.continuation_mode,usage:k.usage,failure:k.failure||null,hold:k.hold||null,wait:k.wait||null,retry:k.retry||null,exec_chips:{orchestration:Wa(k),worker:dh(st(Ge),ue,k.runner||null)},discard:or(de,f,{attempt_id:k.attempt_id,merged:k.failure?.confirmation==="merged"||st(wt[f]).pr?.state==="MERGED"}),...Be?{rollup:Be}:{},...gt?{conflict_resolution:!0}:{},..._t?{base_exception:_t}:{},...$?{landing:$}:{},badges:k.run_state==="paused"?["\u23F8 \uC77C\uC2DC\uC815\uC9C0"]:k.run_state==="failed"?["\u26A0 \uC2E4\uD328"]:k.run_state==="parked"?["\u23F8 \uC138\uC158 \uB300\uAE30"]:k.run_state==="retry_wait"?["\u21BB \uC7AC\uC2DC\uB3C4 \uB300\uAE30"]:k.run_state==="waiting"?["\u26D3 \uC120\uD589 \uB300\uAE30"]:k.run_state==="provider_hold"?["\uACF5\uAE09\uC790 \uBCF4\uB958"]:[],alert:k.run_state==="failed"})}for(let[f,k]of $u(Ce)){if(C.some(ce=>ce.id===f))continue;let B=k.attempt;C.push({...Kt(f),lane:"running",kind:"session",...we(f),attempt_id:typeof B.attempt_id=="string"?B.attempt_id:"",run_state:"running",status:"running",non_occupying:!0,workflow:rt[f]||null,can_pause:!1,can_resume:!1,started_at:k.started_at,last_event_at:typeof B.last_event_at=="number"?B.last_event_at:null,last_activity:B.last_activity&&typeof B.last_activity=="object"?B.last_activity:null,legs:Array.isArray(B.legs)?B.legs:[],runner:typeof B.runner=="string"?B.runner:null,model:typeof B.model=="string"?B.model:null,effort:typeof B.effort=="string"?B.effort:null,speed:typeof B.speed=="string"?B.speed:null,resumed_from:null,continuation_mode:null,usage:B.usage&&typeof B.usage=="object"?B.usage:null,exec_chips:{orchestration:Wa(B),worker:null},discard:or(de,f,{merge_queued:!0}),badges:[k.origin==="auto"?"\uB9AC\uBDF0 \xB7 \uC790\uB3D9":"\uB9AC\uBDF0"],alert:!1})}for(let f of Array.isArray(A.session_active)?A.session_active:[]){let k=f&&f.bead_id;typeof k!="string"||ne.has(k)||(ne.add(k),Array.isArray(f.blocked_by)&&f.blocked_by.length>0&&oe.set(k,f.blocked_by.filter(B=>typeof B=="string"&&B.length>0)),typeof f.title=="string"&&f.title.length>0&&se.set(k,f.title),C.push({...Kt(k),title:f.title||Ze[k]||k,lane:"running",kind:"session",status:"in_progress",started_at:rl(f.started_at)??rl(f.updated_at)??void 0,updated_at:rl(f.updated_at)??void 0,workflow:f.workflow||null,labels:Array.isArray(f.labels)?f.labels:[],spec_id:typeof f.spec_id=="string"?f.spec_id:"",blocked:f.blocked===!0,...Array.isArray(f.blocked_by)?{blocked_by:f.blocked_by.filter(B=>typeof B=="string"&&B.length>0)}:{},draggable:!1,can_pause:!1,can_resume:!1,exec_chips:null,usage:null,legs:[],last_activity:null,session_refs:Array.isArray(f.session_refs)?f.session_refs:[],badges:[],alert:!1}))}for(let f of Array.isArray(A.pr_wait)?A.pr_wait:[]){let k=f&&f.bead_id;if(typeof k!="string"||ne.has(k))continue;ne.add(k);let B=st(wt[k]),ce=st(B.pr),ue=B.gate?st(B.gate):null,Be=ge.has(k),_t=le.get(k)?.continuation_action||null,gt=!!_t&&_t.continuation===null,at=Ct.active===k,S=f.external===!0,$=Mt[k]||null,Le=st(et[k]),Ne=Jo({bead_id:k,merge_sha:f.merge_sha,cleanup_cursor:f.cleanup_cursor,merge_progress:Le.merge_progress||null,cleanup_failed:$,repo_operations:je}),ot=Ei(Ne),vt=!!ue&&ue.base_badge==="\uCDA9\uB3CC",Nt=!!$&&["post_merge_jobs","child_sweep","branch_cleanup","parent_close"].includes($.step)&&!!ue&&ue.tier==="merged",en=S&&!!$&&!!ue&&ue.tier==="merged",Sr=!!ue&&["closed_unmerged","review","undecidable"].includes(ue.tier),kn=or(de,k,{external:S,merge_active:at||Ne?.step==="merge",merge_queued:Be,cleanup_active:ot,merged:!!$||ue?.tier==="merged"}),Er=!!kn.operation,Kr=sh(B.receipt_check);R.push({...Kt(k),lane:"pr_wait",...we(k),...Kr.length>0?{receipt_badge:{codes:Kr}}:{},workflow:rt[k]||null,pr_number:typeof ce.number=="number"?ce.number:null,pr_url:typeof ce.url=="string"?ce.url:void 0,external:S,usage:nr(Ce,k),merge_step:Ne,badges:gt?["\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694"]:Ne?[ue?.tier==="merged"?"\uBA38\uC9C0\uB428":"\uBA38\uC9C0 \uC911"]:$?[Fr($.step)?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${Fr($.step)}`:"\uC815\uB9AC \uBA48\uCDA4"]:typeof ue?.gate_badge=="string"&&ue.gate_badge.length>0?[ue.gate_badge]:[],alert:Ne?Ne.failed===!0:!!$||Sr,reason:$&&Ne?.active!==!0?Si($.step):"PR \uB300\uAE30",merge_action:ue?.tier==="merged"&&!Nt&&!en?!1:!Be||gt,merge_enabled:!Er&&(gt||ue?.enabled===!0||vt||Nt||en),merge_label:gt?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":en||Nt?"\uC815\uB9AC \uC7AC\uC2DC\uB3C4":vt&&!Nt?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":void 0,merge_title:gt?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":Er?kn.error?`\uD3D0\uAE30 \uC2E4\uD328: ${kn.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${kn.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:en?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uB2E4\uC2DC \uC2DC\uB3C4\uD569\uB2C8\uB2E4":Nt?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC2DC\uB3C4\uD569\uB2C8\uB2E4":vt?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":ue?.enabled===!0?`\uBA38\uC9C0 (${ue.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4`:`\uBA38\uC9C0 \uBD88\uAC00: ${ue?.reason||"\uAD00\uCE21 \uB300\uAE30"}`,cancel_action:Be&&!gt,cancel_enabled:!at,continuation_mismatch:_t?.mismatch||null,discard:kn,discard_action:kn.action,discard_enabled:kn.enabled,discard_title:kn.title})}let De=(f,k,B,ce)=>{let ue=f&&f.bead_id;if(typeof ue!="string"||ne.has(ue))return null;ne.add(ue);let Be=Ft[ue],_t=or(de,ue),gt=_t.operation?_t:null,at={...Kt(ue),lane:k,workflow:rt[ue]||null,draggable:!gt,discard:gt||void 0,reason:Ed(bt,ue),seq:B+1,queue_position:B+1,queue_index:B,queue_length:ce,badges:Be?["\u23F8 REVISE \uD30C\uD0B9"]:[],alert:!!Be,revise_action:!!Be,revise_enabled:!!Be&&!gt,revise_title:Be?Be.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${Be.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":""},S=T(ue,null);return Object.hasOwn(S,"blocked_by")&&(at.blocked_by=S.blocked_by),at};for(let f=0;f<qt.length;f++){let k=De(qt[f],"queue",f,qt.length);if(!k)continue;V.push(k);let B=M.get(Z);B?B.push(k):M.set(Z,[k])}let b=f=>{let k=R.find(Be=>Be.id===f&&Be.root_dir===Z);if(k)return{id:f,title:k.title,badge:"PR \uB300\uAE30 \xB7 \uC810\uC720"};let B=C.find(Be=>Be.id===f&&Be.root_dir===Z),ce=B?B.run_state:Vg(Ce,f),ue=ce==="failed"||ce==="orphaned"?"\uC2E4\uD328 \xB7 \uC810\uC720 \uC720\uC9C0":ce==="paused"?"\uC77C\uC2DC\uC815\uC9C0 \xB7 \uC810\uC720":"\uC2E4\uD589 \uC911 \xB7 \uC810\uC720";return{id:f,title:B?B.title:Kt(f).title,badge:ue}},v=[];for(let f=0;f<Math.max(Vt,Dt.length);f++){let k=`s${f+1}`,B=At.get(k),ce=B&&Array.isArray(B.entries)?B.entries:[],ue=st(Jt[k]),Be=Array.isArray(ue.occupied_by)?ue.occupied_by.filter(at=>typeof at=="string"):[],_t=new Set(Be),gt=[];for(let at=0;at<ce.length;at++){let S=ce[at]&&ce[at].bead_id;if(typeof S=="string"&&_t.has(S)){ne.add(S);continue}let $=De(ce[at],k,at,ce.length);$&&(gt.push($),V.push($))}gt.length===0&&Be.length===0&&(Vt<=1||f>=Vt)||v.push({id:k,index:f,items:gt,raw_length:ce.length,occupied_by:Be,occupants:Be.map(at=>b(at)),corrections:Array.isArray(ue.corrections)?ue.corrections.length:0,cycle:ue.cycle===!0,...gt.length===0&&Be.length===0?{empty:!0}:{}})}I.set(Z,v);let P=Array.from({length:Vt},(f,k)=>{let B=`s${k+1}`,ce=At.get(B),ue=ce&&Array.isArray(ce.entries)?ce.entries:[],Be=st(Jt[B]);return{id:B,index:ue.length,length:ue.length,occupied_by:Array.isArray(Be.occupied_by)?Be.occupied_by.filter(_t=>typeof _t=="string"):[]}});for(let f of Array.isArray(A.runnable)?A.runnable:[]){let k=f&&f.bead_id;if(typeof k!="string"||ne.has(k))continue;ne.add(k);let B=f.workflow&&typeof f.workflow=="object"?f.workflow:null,ce=B&&typeof B.route=="string"&&B.route||(typeof f.route=="string"?f.route:null),ue=ih(st(Ge),f.exec_pins,ce),Be=Uo(f.rec,f.exec_pins);Array.isArray(f.blocked_by)&&f.blocked_by.length>0&&oe.set(k,f.blocked_by.filter(en=>typeof en=="string"&&en.length>0)),typeof f.title=="string"&&f.title.length>0&&se.set(k,f.title),Array.isArray(f.scope)&&O.set(k,f.scope.filter(en=>typeof en=="string"&&en.length>0));let _t=Object.hasOwn(f,"eligible"),at=!_t&&Object.hasOwn(f,"route")&&Object.hasOwn(f,"spec_state")&&Object.hasOwn(f,"has_description")&&Object.hasOwn(f,"awaiting_user")&&Object.hasOwn(f,"worker_ineligible")?Ga({route:typeof f.route=="string"?f.route:"",spec:f.spec_state,has_description:f.has_description===!0,awaiting_user:f.awaiting_user===!0,worker_ineligible:f.worker_ineligible===!0},null):null,S=_t?f.eligible!==!1:at?at.placeable:!0,$=at?at.worker_ineligible:f.worker_ineligible===!0,Le=S&&!$,Ne=at?{route_ok:at.route_ok,awaiting_user:at.awaiting_user,missing_description:at.missing_description,placement_spec:at.spec}:Object.hasOwn(f,"route_ok")?{route_ok:f.route_ok===!0,awaiting_user:f.awaiting_user===!0,missing_description:f.missing_description===!0,placement_spec:f.placement_spec}:null,ot=[];!_t&&at&&!at.placeable&&ot.push(Nr(at)),typeof f.reason=="string"&&f.reason.length>0&&ot.push(f.reason);let vt=Ed(bt,k);vt&&ot.push(vt);let Nt=ah(k,f.release_info,p)?.map(en=>({...en,...Od({id:k,root_dir:Z},en.id)}));y.push({...Kt(k),title:f.title||Ze[k]||k,lane:"runnable",draggable:!_t&&Le,queue_placeable:Le,...Ne||{},...$?{worker_ineligible:!0}:{},...f.session_preferred===!0?{session_preferred:!0,session_preferred_reason:typeof f.session_preferred_reason=="string"?f.session_preferred_reason:""}:{},...f.spec_after_blocker===!0?{spec_after_blocker:!0}:{},...Nt?{dependency_chips:{released:Nt}}:{},...f.dependents_info&&typeof f.dependents_info=="object"?{dependents_info:f.dependents_info}:{},reason:ot.join(" \xB7 "),created_at:f.created_at??void 0,updated_at:f.updated_at??void 0,status:typeof f.status=="string"?f.status:void 0,labels:Array.isArray(f.labels)?f.labels:[],spec_id:typeof f.spec_id=="string"?f.spec_id:"",published:f.published===!0,workflow:B||(ce?{route:ce,chips:{route:ce}}:null),...ue?{exec_chips:ue}:{},...Be?{rec:Be}:{},blocked:f.blocked===!0,...Array.isArray(f.blocked_by)?{blocked_by:f.blocked_by.filter(en=>typeof en=="string"&&en.length>0)}:{},place_index:qt.length,place_lanes:P})}for(let f of zt){let k=f&&f.bead_id;if(typeof k!="string"||ne.has(k)||(ne.add(k),i!==void 0&&typeof f.added_at=="number"&&f.added_at<i))continue;let B=Qg(Ce,k),ce=B&&typeof B.done_kind=="string"?B.done_kind:null;te.push({...Kt(k),lane:"done",done:!0,done_layout:"three_line",usage:nr(Ce,k),work_ms:ad(Ce,k),done_at:typeof f.added_at=="number"?f.added_at:void 0,done_kind:ce,...ln(k),badges:[...ce&&xd[ce]?[xd[ce]]:[],...sd(Ce,k)]})}for(let f of Array.isArray(A.session_done)?A.session_done:[]){let k=f&&(f.id||f.bead_id);typeof k!="string"||ne.has(k)||(ne.add(k),te.push({...Kt(k),...f,id:k,root_dir:Z,workspace_name:Ie,expected_revision:tt,lane:"done",done:!0}))}}if(G.size>0)for(let A of[...y,...V,...C,...R,...te]){let Z=G.get(`${A.root_dir}\0${A.id}`);if(!Z||(typeof Z.priority=="number"&&(A.priority=Z.priority),typeof Z.from_id=="string"&&Z.from_id.length>0&&(A.from_id=Z.from_id),A.lane==="done"&&Array.isArray(Z.carried_to)&&Z.carried_to.length>0&&(A.carried_to=Z.carried_to),!Object.hasOwn(Z,"metadata")))continue;let Ie=st(Z.metadata);if(A.rec=Uo(Ie),A.lane==="runnable"||A.lane.startsWith("s")||A.lane==="queue"){let Ge=uh(st(_.get(A.root_dir)),Ie,typeof Z.route=="string"&&Z.route.length>0?Z.route:st(A.workflow).route);Ge&&(A.exec_chips=Ge)}}let be=new Map;o.forEach((A,Z)=>{A&&typeof A.root_dir=="string"&&be.set(A.root_dir,Z)});let ve=n&&n.running_sort==="repo"?"repo":"started";C.sort((A,Z)=>{let Ie=A.kind==="session",Ge=Z.kind==="session";if(Ie!==Ge)return Ie?1:-1;if(Ie&&Ge){let Ze=Ti(Z.updated_at)-Ti(A.updated_at);return Ze!==0?Ze:A.id.localeCompare(Z.id)}if(ve==="repo"){let Ze=be.get(A.root_dir)??Number.MAX_SAFE_INTEGER,Ut=be.get(Z.root_dir)??Number.MAX_SAFE_INTEGER;if(Ze!==Ut)return Ze-Ut}let tt=typeof A.started_at=="number"&&Number.isFinite(A.started_at)?A.started_at:null,Ce=typeof Z.started_at=="number"&&Number.isFinite(Z.started_at)?Z.started_at:null;return tt!==null&&Ce!==null&&tt!==Ce?tt-Ce:tt===null&&Ce!==null?1:tt!==null&&Ce===null?-1:A.id.localeCompare(Z.id)}),te.sort((A,Z)=>(Z.done_at??0)-(A.done_at??0));let Pe=o.length>0?o:r.map(A=>({root_dir:A&&A.root_dir,name:A&&A.name,auto_advance:A&&A.auto_advance,auto_merge:A&&A.auto_merge,slots:A&&A.slots,revision:A&&A.revision,runner_catalog:A&&A.runner_catalog})),he=new Set(y.map(A=>A.root_dir)),Re=new Map;for(let A of C)A.kind==="session"||A.run_state!=="running"||Re.set(A.root_dir,(Re.get(A.root_dir)||0)+1);let Xe=new Map;for(let A of te){let Z=Xe.get(A.root_dir);Z?Z.push(A):Xe.set(A.root_dir,[A])}let dt={positions:new Map,resolutions:new Map,continuations:new Map,authorities:new Map,state:{active:null,failures:{},waiting:null},auto_excluded:[],running:!1},H=[];for(let A of Pe){if(!A||typeof A.root_dir!="string")continue;let Z=M.get(A.root_dir)||[],Ie=I.get(A.root_dir)||[],Ge=Z.length>0||Ie.some(Ze=>Ze.items.length>0||Ze.occupied_by.length>0);if(u!=="all"&&!Ge&&!he.has(A.root_dir))continue;let tt=typeof A.slots=="number"&&A.slots>=Ci?A.slots:Ci,Ce=Re.get(A.root_dir)||0;H.push({live_count:Ce,over_cap:Ce>tt,merge:Y.get(A.root_dir)||dt,token_total:ph(Xe.get(A.root_dir)||[]),cleanup_failures:q.get(A.root_dir)||[],declared_base:N.get(A.root_dir)??null,repo_operations:z.get(A.root_dir)||[],root_dir:A.root_dir,name:A.name||A.root_dir,auto_advance:A.auto_advance===!0,auto_merge:A.auto_merge===!0,slots:tt,revision:typeof A.revision=="number"?A.revision:0,runner_catalog:st(A.runner_catalog),items:Z,sublanes:{parallel:Z,serial:Ie},serial_lane_count:L.get(A.root_dir)||0,raw_queue_length:U.get(A.root_dir)||0})}let J={runnable:y,runnable_all:y,runnable_hidden:{blocked:0,readiness:0},runnable_sections:[],runnable_flat:a==="updated_flat"||a==="as_given",queue:V,queue_groups:H,running:C,pr_wait:R,done:te,parallel_rows:[],chain_lanes:[],cross_lanes_revision:l&&typeof l.revision=="number"?l.revision:null,cross_lanes_unreadable:l===null,parallel_raw_length:Object.fromEntries(U),owner_of:{}},re=Ku(J);for(let A of W)re.has(A.id)||re.set(A.id,{root_dir:A.root_dir,workspace_name:A.workspace_name,lane:"done",state:"done"});for(let A of[...J.queue,...J.runnable,...J.running,...J.pr_wait]){if(!Object.hasOwn(A,"blocked_by"))continue;let Z=re.get(A.id);A.blockers=(A.blocked_by||[]).map(Ie=>Gu(Ie,Z,re,o))}for(let A of[...J.queue,...J.runnable,...J.running,...J.pr_wait]){let Z=(A.blockers||[]).map(tt=>({...nl(A.id,tt),...Od(A,tt.id,re)})),Ie=wd(A.id,vh(Me.get(A.id),A.dependents_info,A,re));if(Z.length===0&&Ie.length===0)continue;let Ge={...A.dependency_chips||{},...Z.length>0?{predecessors:Z}:{},...Ie.length>0?{dependents:Ie}:{}};A.dependency_chips=Ge}yh(J,Ee,O,re,o);let fe=Yu(J.queue_groups);for(let A of J.queue_groups)for(let Z of A.sublanes.serial){let Ie=fe.get(Vu(A.root_dir,Z.id));Ie&&(Z.cross_wait_peers=Ie)}J.chain_lanes=hh(l&&Array.isArray(l.lanes)?l.lanes:[],oe,re,o,se,m,{armed_by_bead:F,failed_by_bead:X,disarmed_lanes:Ae},ye);let Se=new Map;for(let A of[...J.queue,...J.runnable])Se.has(A.id)||Se.set(A.id,A);let _e=new Set;for(let A of J.chain_lanes)for(let Z of A.rows){if(A.status==="confirmed"&&!Z.unplaced&&!Z.fixed&&_e.add(Z.id),!A.draft&&!Z.unplaced)continue;let Ie=Se.get(Z.id);Ie&&(Ie.cross_lane_chip={lane_id:A.lane_id,number:A.number,status:A.status,label:A.draft?`\uC5F0\uACB0 ${A.number} (draft)`:`\uC5F0\uACB0 ${A.number}`})}let qe=new Map(J.chain_lanes.map(A=>[A.lane_id,A.number]));for(let A of[...J.queue,...J.running]){let Z=F.get(A.id);if(typeof Z!="string"||Z.length===0)continue;let Ie=qe.get(Z);A.armed_lane_chip=Ie===void 0?{lane_id:Z,label:"\u25B6 \uC9C4\uD589 \uC911 \xB7 \uB808\uC778 \uC5C6\uC74C",orphan:!0}:{lane_id:Z,label:`\u25B6 \uC5F0\uACB0 ${Ie}`,orphan:!1}}let Fe=[];for(let A of M.values())for(let Z of A)_e.has(Z.id)||Fe.push(Z);Fe.sort((A,Z)=>{let Ie=A.workspace_name.localeCompare(Z.workspace_name);return Ie!==0?Ie:(A.queue_index??0)-(Z.queue_index??0)}),J.parallel_rows=Fe;let Ve={};for(let[A,Z]of re)typeof Z.root_dir=="string"&&Z.root_dir.length>0&&(Ve[A]=Z.root_dir);for(let A of J.chain_lanes)for(let Z of A.rows)!Object.hasOwn(Ve,Z.id)&&Z.root_dir.length>0&&m.has(Z.root_dir)&&(Ve[Z.id]=Z.root_dir);J.owner_of=Ve;let He=J.runnable.length;J.runnable_all=J.runnable.slice();let ee=J.runnable,Q=A=>s.show_blocked||A.blocked!==!0,xe=A=>s.readiness==="all"||(s.readiness==="ready"?A.queue_placeable===!0:A.queue_placeable!==!0);if(d==="per_control"){let A=[],Z=0,Ie=0;for(let Ge of ee){let tt=Q(Ge),Ce=xe(Ge);tt&&Ce?A.push(Ge):!tt&&Ce?Z+=1:tt&&!Ce&&(Ie+=1)}ee=A,J.runnable_hidden={blocked:Z,readiness:Ie}}else{ee=ee.filter(Q);let A=ee.length;ee=ee.filter(xe),J.runnable_hidden={blocked:He-A,readiness:A-ee.length}}let mt=(A,Z)=>{let Ie=Ti(Z.updated_at)-Ti(A.updated_at);return Ie!==0?Ie:A.id.localeCompare(Z.id)},Ke=a==="repo_spec"?(A,Z)=>{let Ie=A.queue_placeable===!0?0:1,Ge=Z.queue_placeable===!0?0:1;if(Ie!==Ge)return Ie-Ge;let tt=A.published===!0?0:1,Ce=Z.published===!0?0:1;return tt!==Ce?tt-Ce:mt(A,Z)}:mt;if(a==="as_given")J.runnable=ee,J.runnable_sections=[];else if(a==="updated_flat")J.runnable=ee.slice().sort(mt),J.runnable_sections=[];else{let A=new Map;for(let Ge of ee){let tt=A.get(Ge.root_dir);tt?tt.push(Ge):A.set(Ge.root_dir,[Ge])}let Z=[],Ie=[];for(let Ge of Pe){if(!Ge||typeof Ge.root_dir!="string")continue;let tt=(A.get(Ge.root_dir)||[]).slice().sort(Ke);A.delete(Ge.root_dir),tt.length!==0&&(Z.push({root_dir:Ge.root_dir,name:Ge.name||Ge.root_dir,items:tt.map(Ce=>({...Ce,workspace_name:""}))}),Ie.push(...tt))}for(let[Ge,tt]of A){let Ce=tt.slice().sort(Ke);Z.push({root_dir:Ge,name:Ce[0]?.workspace_name||Ge,items:Ce.map(Ze=>({...Ze,workspace_name:""}))}),Ie.push(...Ce)}J.runnable=Ie,J.runnable_sections=Z}let Je=kh(n?n.search:void 0);return Je&&wh(J,Je),J}function Md(e,t){let n=new Map(e.map((a,u)=>[a,u])),r=new Map(e.map(a=>[a,new Set]));for(let a of t)a.blocker!==a.blockee&&n.has(a.blocker)&&n.has(a.blockee)&&r.get(a.blockee).add(a.blocker);let o=new Set,i=[];for(;i.length<e.length;){let a=e.find(u=>{if(o.has(u))return!1;for(let d of r.get(u))if(!o.has(d))return!1;return!0});if(a===void 0)return{order:[...e],corrections:[],cycle:!0};o.add(a),i.push(a)}let s=[],l=new Map(i.map((a,u)=>[a,u]));for(let a of i){let u=null;for(let d of r.get(a)){let p=Number(n.get(a))<Number(n.get(d)),_=Number(l.get(a))>Number(l.get(d));p&&_&&(u===null||Number(l.get(d))>Number(l.get(u)))&&(u=d)}u!==null&&s.push({bead_id:a,after:u})}return{order:i,corrections:s,cycle:!1}}var $h="\uB2E4\uB978 \uB808\uD3EC \uC774\uC288\uB294 \uC774 \uC9C1\uB82C \uB808\uC778\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",Oi="\uC758\uC874 \uC790\uB8CC \uBBF8\uD655\uC815 \u2014 \uAD50\uC815 \uBCF4\uB958",xh="Worker \uD0ED \uC9C1\uB82C \uB808\uC778\uC5D0\uC11C \uBA3C\uC800 \uBE7C \uC8FC\uC138\uC694",Ah="\uC774\uBBF8 \uC9C4\uD589 \uC911\uC778 \uC774\uC288 \uC55E\uC5D0\uB294 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",ko="\uC5F0\uACB0 \uB808\uC778\uC774 \uC5C6\uC2B5\uB2C8\uB2E4";function ns(e,t){return`${e}\0${t}`}function Sh(e,t){let n=new Set(e),r=new Map;for(let o of e){let i=t.placed_members.has(o)?t.snapshot_blocked_by:t.runnable_blocked_by,s=i instanceof Map?i.get(o):void 0;if(!Array.isArray(s))return null;r.set(o,s.filter(l=>l!==o&&n.has(l)))}return r}function Eh(e,t){if(e.status!=="confirmed")return 0;let n=-1;return e.entries.forEach((r,o)=>{t.fixed_members.has(r.bead_id)&&(n=o)}),n+1}function ss(e,t){let n=e.entries,r=n.map(p=>p.bead_id),o=Sh(r,t);if(o===null)return{entries:n,corrections:[],cycle:!1,held:!0,mismatched:[]};let i=[];for(let[p,_]of o)for(let m of _)i.push({blocker:m,blockee:p});let s=Eh(e,t),l=new Map(r.map((p,_)=>[p,_])),a=r.slice(0,s).filter(p=>o.get(p).some(_=>Number(l.get(_))>Number(l.get(p)))),u=Md(r.slice(s),i);if(u.cycle)return{entries:n,corrections:[],cycle:!0,held:!1,mismatched:a};let d=new Map(n.map(p=>[p.bead_id,p]));return{entries:[...n.slice(0,s),...u.order.map(p=>d.get(p))],corrections:u.corrections,cycle:!1,held:!1,mismatched:a}}function qd(e,t){let n=t.cross_lanes.get(e);return n===void 0?null:ss(n,t)}function Th(e,t){if(!(t.corrections.length===0&&!t.cycle&&!t.held&&t.mismatched.length===0))return{lane_id:e,corrected:t.corrections.length,cycle:t.cycle,held:t.held,mismatched:t.mismatched}}function Ch(e){return`${e}\uC758 \uB808\uD3EC\uB97C \uC54C \uC218 \uC5C6\uC5B4 \uC758\uC874\uC744 \uBC14\uAFC0 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4`}function Oh(e){let t=new Map;for(let[n,r]of e)t.set(n,r.slice());return t}function ll(e,t,n){let r=new Set([t]),o=[t];for(;o.length>0;){let i=o.pop();for(let s of e.get(i)||[]){if(s===n)return!0;r.has(s)||(r.add(s),o.push(s))}}return!1}function Rh(e,t){let n=new Set;for(let[s,l]of t)for(let a of l)n.add(ns(s,a));let r=new Map,o=new Map;for(let s of e){let l=ns(s.a,s.b);r.set(l,s),o.set(l,s.type==="dep-add")}let i=[];for(let s of e){let l=ns(s.a,s.b);r.get(l)===s&&o.get(l)!==n.has(l)&&i.push(s)}return i}function Ih(e,t,n){let r=e.parallel_rows,o=Math.max(0,Math.min(r.length,n)),i=r[o];if(i&&i.root_dir===t)return i.queue_index;for(let s=o-1;s>=0;s--)if(r[s].root_dir===t)return r[s].queue_index+1;for(let s=o;s<r.length;s++)if(r[s].root_dir===t)return r[s].queue_index;return e.parallel_raw_length.get(t)??0}function Lh(e,t){return e.parallel_rows.some(n=>n.root_dir===t)}function al(e,t,n,r){return{type:"worker-queue-place",payload:{bead_id:e,...r?{lane:r}:{},index:n},root_dir:t}}function cl(e,t){let n=0;for(let r of e.cross_lanes.keys())if(n+=1,r===t)return n;return n+1}function is(e){let t=Oh(e.blocked_by_map),n=[],r=new Set,o={refusal:null},i=u=>{let d=e.owner_of.get(u);return typeof d!="string"||d.length===0?(o.refusal=Ch(u),null):d};return{graph:t,dep_ops:n,state:o,ownerOf:i,addDep:(u,d,p)=>{if(o.refusal!==null||u===d)return;let _=t.get(u)||[];if(_.includes(d))return;let m=i(u);if(m!==null){if(ll(t,d,u)){o.refusal=`\uC758\uC874 \uC0AC\uC774\uD074\uC774 \uC0DD\uAE41\uB2C8\uB2E4 \u2014 ${u}\uAC00 \uC774\uBBF8 ${d}\uB97C \uB9C9\uACE0 \uC788\uC2B5\uB2C8\uB2E4`;return}t.set(u,[..._,d]),p!==void 0&&r.add(ns(u,d)),n.push({type:"dep-add",a:u,b:d,root_dir:m,...p===void 0?{}:{lane_id:p}})}},removeDep:(u,d)=>{if(o.refusal!==null||u===d)return;let p=t.get(u)||[];if(!p.includes(d))return;let _=i(u);_!==null&&(t.set(u,p.filter(m=>m!==d)),n.push({type:"dep-remove",a:u,b:d,root_dir:_}))},laneCreated:(u,d)=>r.has(ns(u,d))}}function as(e,t,n,r,o={}){if(e.state.refusal!==null)return{refused:e.state.refusal};let i=Rh(e.dep_ops,t.blocked_by_map),s=i.filter(d=>d.type==="dep-remove"),l=i.filter(d=>d.type==="dep-add"),a=o.disarm_ops??[],u=o.lane_id===void 0||o.correction===void 0?void 0:Th(o.lane_id,o.correction);return{lane_ops:n,ops:[...s,...a,...l,...r],lane_op_index:s.length+a.length,...u===void 0?{}:{correction:u}}}function Nd(e,t,n){for(let r=1;r<t.length;r+=1)e.addDep(t[r].bead_id,t[r-1].bead_id,n)}function rs(e,t){return t>0&&e.entries[t]?.dep_created_by_lane===!0}function jd(e,t,n,r){if(t.status!=="confirmed")return[];let o=[],i=new Map;for(let s of r){let l=e.owner_of.get(s.bead_id)||s.root_dir;typeof l!="string"||l.length===0||i.set(l,[...i.get(l)||[],s.bead_id])}for(let[s,l]of i)o.push({type:"worker-queue-disarm",payload:{bead_ids:l,lane_id:n},root_dir:s});return o}function os(e){return e.map(t=>({bead_id:t.bead_id,root_dir:t.root_dir}))}function Ri(e,t){return e.length===t.length&&e.every((n,r)=>n.bead_id===t[r].bead_id&&n.root_dir===t[r].root_dir)}function Ii(e,t,n){let r=is(n),o=[],i=[],s=[],l,a=n.owner_lane_of.get(e.bead_id),u=e.kind==="chain"?e.lane_id??a:void 0,d=u===void 0?void 0:n.cross_lanes.get(u);if(t.kind==="repo-serial"&&e.root_dir!==t.root_dir)return{refused:$h};if(t.kind==="chain"){if(e.kind==="repo-serial")return{refused:xh};if(e.kind!=="chain"&&typeof a=="string"&&a!==t.lane_id&&n.cross_lanes.has(a))return{refused:`\uC774\uBBF8 \uC5F0\uACB0 ${cl(n,a)}\uC5D0 \uC788\uC2B5\uB2C8\uB2E4`};if(!n.cross_lanes.has(t.lane_id))return{refused:ko}}if(e.kind==="chain"&&d===void 0)return{refused:ko};let p=()=>{if(d===void 0||d.status!=="confirmed")return;let y=d.entries.findIndex(W=>W.bead_id===e.bead_id);if(y<0)return;let C=y>0?d.entries[y-1]:null,R=y+1<d.entries.length?d.entries[y+1]:null,V=rs(d,y),te=R!==null&&rs(d,y+1);V&&C!==null&&r.removeDep(e.bead_id,C.bead_id),te&&R!==null&&r.removeDep(R.bead_id,e.bead_id),(V||te)&&C!==null&&R!==null&&r.addDep(R.bead_id,C.bead_id,u)},_=(y,C)=>{let R=n.cross_lanes.get(y),V=R.entries.findIndex(N=>N.bead_id===e.bead_id),te=R.entries.filter(N=>N.bead_id!==e.bead_id),W=Math.max(0,Math.min(te.length,V>=0&&C>V?C-1:C)),M=-1;if(te.forEach((N,z)=>{n.fixed_members.has(N.bead_id)&&(M=z)}),W<=M){r.state.refusal=Ah;return}let I=V>=0?R.entries[V]:d?.entries.find(N=>N.bead_id===e.bead_id)??{bead_id:e.bead_id,root_dir:e.root_dir};l=ss({status:R.status,entries:[...te.slice(0,W),I,...te.slice(W)]},n);let L=l.entries;if(Ri(L,R.entries)||o.push({type:"monitor-lane-update",payload:{lane_id:y,entries:os(L)}}),R.status!=="confirmed")return;let U=L.findIndex(N=>N.bead_id===e.bead_id),Y=U>0?L[U-1].bead_id:null,q=U+1<L.length?L[U+1].bead_id:null;if(Y===null){q!==null&&r.addDep(q,e.bead_id,y);return}if(r.addDep(e.bead_id,Y,y),q!==null&&(r.graph.get(q)||[]).includes(Y)){let N=R.entries.findIndex(z=>z.bead_id===q);(r.laneCreated(q,Y)||N>0&&R.entries[N-1].bead_id===Y&&rs(R,N))&&r.removeDep(q,Y),r.addDep(q,e.bead_id,y)}},m=typeof e.queue_index=="number"?e.queue_index:n.queue_index_of.get(e.bead_id);if(e.kind==="chain"&&(p(),d!==void 0&&(t.kind!=="chain"||t.lane_id!==u)&&(s.push(...jd(n,d,u,d.entries.filter(y=>y.bead_id===e.bead_id))),o.push({type:"monitor-lane-update",payload:{lane_id:u,entries:os(d.entries.filter(y=>y.bead_id!==e.bead_id))}}))),t.kind==="chain"&&_(t.lane_id,t.marker_index),r.state.refusal!==null)return{refused:r.state.refusal};if(t.kind==="candidate")e.kind!=="candidate"&&i.push({type:"worker-queue-remove",payload:{bead_id:e.bead_id},root_dir:e.root_dir});else if(t.kind==="parallel"){let y=Ih(n,e.root_dir,t.marker_index);if(e.kind==="candidate"||e.kind==="repo-serial")i.push(al(e.bead_id,e.root_dir,y));else if(e.kind==="parallel"){let C=n.parallel_rows,R=C[Math.max(0,Math.min(C.length,t.marker_index))];if(!(!!R&&R.bead_id===e.bead_id)&&Lh(n,e.root_dir)&&m!==void 0){let te=m>y?y:y-1;te>=0&&te!==m&&i.push({type:"worker-queue-reorder",payload:{bead_id:e.bead_id,to_index:te},root_dir:e.root_dir})}}}else if(t.kind==="chain"){let y=n.cross_lanes.get(t.lane_id);e.kind==="candidate"&&y.status==="confirmed"&&i.push(al(e.bead_id,e.root_dir,n.parallel_raw_length.get(e.root_dir)??0))}else if(e.kind==="repo-serial"&&e.lane_id===t.lane_id){if(m!==void 0&&t.index!==m){let y=m>t.index?t.index:t.index-1;y>=0&&y!==m&&i.push({type:"worker-queue-reorder",payload:{bead_id:e.bead_id,lane:t.lane_id,to_index:y},root_dir:e.root_dir})}}else i.push(al(e.bead_id,e.root_dir,t.index,t.lane_id));return as(r,n,o,i,{disarm_ops:s,...t.kind==="chain"?{lane_id:t.lane_id,correction:l}:{}})}function Fd(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:ko};if(n.entries.length<2)return{refused:"\uD655\uC815\uD558\uB824\uBA74 \uBA64\uBC84\uAC00 2\uAC1C \uC774\uC0C1\uC774\uC5B4\uC57C \uD569\uB2C8\uB2E4"};let r=ss(n,t);if(r.held)return{refused:Oi};let o=r.entries,i=is(t),s=[];Nd(i,o,e);let l=Ri(o,n.entries)?[]:[{type:"monitor-lane-update",payload:{lane_id:e,entries:os(o)}}];return l.push({type:"monitor-lane-confirm",payload:{lane_id:e}}),as(i,t,l,s,{lane_id:e,correction:r})}function Bd(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:ko};let r=ss(n,t),o=r.entries,i=is(t),s=[];Nd(i,o,e);let l=Ri(o,n.entries)?[]:[{type:"monitor-lane-update",payload:{lane_id:e,entries:os(o)}}];return as(i,t,l,s,{lane_id:e,correction:r})}function Ud(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:ko};let r=ss(n,t),o=r.entries;return as(is(t),t,Ri(o,n.entries)?[]:[{type:"monitor-lane-update",payload:{lane_id:e,entries:os(o)}}],[],{lane_id:e,correction:r})}function Wd(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:ko};let r=is(t);if(n.status==="confirmed")for(let o=1;o<n.entries.length;o+=1)rs(n,o)&&r.removeDep(n.entries[o].bead_id,n.entries[o-1].bead_id);return as(r,t,[{type:"monitor-lane-remove",payload:{lane_id:e}}],[],{disarm_ops:jd(t,n,e,n.entries)})}function zd(e,t){let n=t.cross_lanes.get(e);if(n===void 0||n.status!=="confirmed")return null;let r=[],o=[];for(let s=1;s<n.entries.length;s+=1){let l=`  ${n.entries[s].bead_id} \u2190 ${n.entries[s-1].bead_id}`;rs(n,s)?r.push(l):o.push(`${l} (\uB808\uC778\uC774 \uB9CC\uB4E4\uC9C0 \uC54A\uC74C)`)}let i=`\uC5F0\uACB0 ${cl(t,e)}\uC744 \uC9C0\uC6C1\uB2C8\uB2E4.`;return r.length===0?`${i}
\uC758\uC874\uC740 \uADF8\uB300\uB85C \uB461\uB2C8\uB2E4`:[i,"\uD568\uAED8 \uC81C\uAC70\uD560 \uC758\uC874:",...r,...o.length===0?[]:["\uADF8\uB300\uB85C \uB450\uB294 \uC758\uC874:",...o]].join(`
`)}function Hd(e){let t=new Map;for(let n of e)n.type!=="dep-add"||typeof n.lane_id!="string"||t.set(n.lane_id,[...t.get(n.lane_id)||[],{bead_id:n.a,after:n.b}]);return[...t].map(([n,r])=>({lane_id:n,pairs:r}))}function Kd(e,t){let n=new Map(e.map((r,o)=>[r.bead_id,o]));return t.filter(r=>{let o=n.get(r.bead_id);return o!==void 0&&o>0&&e[o-1].bead_id===r.after})}function ul(e,t){if(e!==null){let n=t.owner_lane_of.get(e.bead_id);if(typeof n=="string"&&t.cross_lanes.has(n))return{refused:`\uC774\uBBF8 \uC5F0\uACB0 ${cl(t,n)}\uC5D0 \uC788\uC2B5\uB2C8\uB2E4`}}return{lane_ops:[{type:"monitor-lane-create",payload:{entries:e===null?[]:[e]}}],ops:[],lane_op_index:0}}var Dh="\uC0AC\uC774\uD074";function Ph(e){let t=new Map,n=r=>Array.isArray(r)?r.filter(o=>typeof o=="string"&&o.length>0):[];for(let r of Array.isArray(e)?e:[]){if(!r||typeof r!="object")continue;let o=r.bead_blocked_by&&typeof r.bead_blocked_by=="object"?r.bead_blocked_by:{};for(let[i,s]of Object.entries(o))Array.isArray(s)&&t.set(i,n(s));for(let i of[...Array.isArray(r.runnable)?r.runnable:[],...Array.isArray(r.session_active)?r.session_active:[]])i&&typeof i.bead_id=="string"&&Array.isArray(i.blocked_by)&&i.blocked_by.length>0&&t.set(i.bead_id,n(i.blocked_by))}return t}function dl(e,t,n){let r=yr(e,t),o=[],i=new Set,s=(a,u)=>{for(let d of a)i.has(d.id)||(i.add(d.id),o.push({bead_id:d.id,root_dir:d.root_dir,workspace_name:d.workspace_name,title:d.title,lane:u}))};s(r.running,"running"),s(r.pr_wait,"pr_wait"),s(r.queue,"queue"),s(r.runnable_all,"runnable");let l=n&&typeof n.root_dir=="string"&&n.root_dir.length?n.root_dir:null;return{issues:l===null?o:o.filter(a=>a.root_dir===l),blocked_by_map:Ph(e)}}function Gd(e,t){let n=new Map;for(let s of t.issues)!s||typeof s.bead_id!="string"||s.bead_id.length===0||n.has(s.bead_id)||n.set(s.bead_id,s);let r=n.get(e)?.root_dir,o=t.blocked_by_map.get(e)||[],i=[];for(let s of n.values()){if(s.bead_id===e||s.lane==="done"||o.includes(s.bead_id))continue;let l=ll(t.blocked_by_map,s.bead_id,e);i.push({...s,disabled:l,...l?{reason:Dh}:{}})}return i.sort((s,l)=>{let a=r!==void 0&&s.root_dir===r,u=r!==void 0&&l.root_dir===r;return a!==u?a?-1:1:s.bead_id.localeCompare(l.bead_id)}),i}function Yd(e,t){let n=t.trim().toLowerCase();return n.length===0?e.slice():e.filter(r=>r.bead_id.toLowerCase().includes(n)||r.title.toLowerCase().includes(n))}var{entries:rp,setPrototypeOf:Vd,isFrozen:Mh,getPrototypeOf:qh,getOwnPropertyDescriptor:Nh}=Object,{freeze:bn,seal:Cn,create:bl}=Object,{apply:yl,construct:vl}=typeof Reflect<"u"&&Reflect;bn||(bn=function(t){return t});Cn||(Cn=function(t){return t});yl||(yl=function(t,n){for(var r=arguments.length,o=new Array(r>2?r-2:0),i=2;i<r;i++)o[i-2]=arguments[i];return t.apply(n,o)});vl||(vl=function(t){for(var n=arguments.length,r=new Array(n>1?n-1:0),o=1;o<n;o++)r[o-1]=arguments[o];return new t(...r)});var Li=yn(Array.prototype.forEach),jh=yn(Array.prototype.lastIndexOf),Qd=yn(Array.prototype.pop),ls=yn(Array.prototype.push),Fh=yn(Array.prototype.splice),Pi=yn(String.prototype.toLowerCase),pl=yn(String.prototype.toString),fl=yn(String.prototype.match),cs=yn(String.prototype.replace),Bh=yn(String.prototype.indexOf),Uh=yn(String.prototype.trim),Nn=yn(Object.prototype.hasOwnProperty),hn=yn(RegExp.prototype.test),us=Wh(TypeError);function yn(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var n=arguments.length,r=new Array(n>1?n-1:0),o=1;o<n;o++)r[o-1]=arguments[o];return yl(e,t,r)}}function Wh(e){return function(){for(var t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];return vl(e,n)}}function kt(e,t){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:Pi;Vd&&Vd(e,null);let r=t.length;for(;r--;){let o=t[r];if(typeof o=="string"){let i=n(o);i!==o&&(Mh(t)||(t[r]=i),o=i)}e[o]=!0}return e}function zh(e){for(let t=0;t<e.length;t++)Nn(e,t)||(e[t]=null);return e}function sr(e){let t=bl(null);for(let[n,r]of rp(e))Nn(e,n)&&(Array.isArray(r)?t[n]=zh(r):r&&typeof r=="object"&&r.constructor===Object?t[n]=sr(r):t[n]=r);return t}function ds(e,t){for(;e!==null;){let r=Nh(e,t);if(r){if(r.get)return yn(r.get);if(typeof r.value=="function")return yn(r.value)}e=qh(e)}function n(){return null}return n}var Xd=bn(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),_l=bn(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),ml=bn(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),Hh=bn(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),gl=bn(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),Kh=bn(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),Zd=bn(["#text"]),Jd=bn(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),hl=bn(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),ep=bn(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),Di=bn(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),Gh=Cn(/\{\{[\w\W]*|[\w\W]*\}\}/gm),Yh=Cn(/<%[\w\W]*|[\w\W]*%>/gm),Vh=Cn(/\$\{[\w\W]*/gm),Qh=Cn(/^data-[\-\w.\u00B7-\uFFFF]+$/),Xh=Cn(/^aria-[\-\w]+$/),op=Cn(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),Zh=Cn(/^(?:\w+script|data):/i),Jh=Cn(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),sp=Cn(/^html$/i),eb=Cn(/^[a-z][.\w]*(-[.\w]+)+$/i),tp=Object.freeze({__proto__:null,ARIA_ATTR:Xh,ATTR_WHITESPACE:Jh,CUSTOM_ELEMENT:eb,DATA_ATTR:Qh,DOCTYPE_NAME:sp,ERB_EXPR:Yh,IS_ALLOWED_URI:op,IS_SCRIPT_OR_DATA:Zh,MUSTACHE_EXPR:Gh,TMPLIT_EXPR:Vh}),ps={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,progressingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},tb=function(){return typeof window>"u"?null:window},nb=function(t,n){if(typeof t!="object"||typeof t.createPolicy!="function")return null;let r=null,o="data-tt-policy-suffix";n&&n.hasAttribute(o)&&(r=n.getAttribute(o));let i="dompurify"+(r?"#"+r:"");try{return t.createPolicy(i,{createHTML(s){return s},createScriptURL(s){return s}})}catch{return console.warn("TrustedTypes policy "+i+" could not be created."),null}},np=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function ip(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:tb(),t=we=>ip(we);if(t.version="3.3.0",t.removed=[],!e||!e.document||e.document.nodeType!==ps.document||!e.Element)return t.isSupported=!1,t;let{document:n}=e,r=n,o=r.currentScript,{DocumentFragment:i,HTMLTemplateElement:s,Node:l,Element:a,NodeFilter:u,NamedNodeMap:d=e.NamedNodeMap||e.MozNamedAttrMap,HTMLFormElement:p,DOMParser:_,trustedTypes:m}=e,y=a.prototype,C=ds(y,"cloneNode"),R=ds(y,"remove"),V=ds(y,"nextSibling"),te=ds(y,"childNodes"),W=ds(y,"parentNode");if(typeof s=="function"){let we=n.createElement("template");we.content&&we.content.ownerDocument&&(n=we.content.ownerDocument)}let M,I="",{implementation:L,createNodeIterator:U,createDocumentFragment:Y,getElementsByTagName:q}=n,{importNode:N}=r,z=np();t.isSupported=typeof rp=="function"&&typeof W=="function"&&L&&L.createHTMLDocument!==void 0;let{MUSTACHE_EXPR:G,ERB_EXPR:oe,TMPLIT_EXPR:ye,DATA_ATTR:Me,ARIA_ATTR:F,IS_SCRIPT_OR_DATA:X,ATTR_WHITESPACE:Ae,CUSTOM_ELEMENT:Ee}=tp,{IS_ALLOWED_URI:O}=tp,se=null,be=kt({},[...Xd,..._l,...ml,...gl,...Zd]),ve=null,Pe=kt({},[...Jd,...hl,...ep,...Di]),he=Object.seal(bl(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),Re=null,Xe=null,dt=Object.seal(bl(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}})),H=!0,J=!0,re=!1,fe=!0,Se=!1,_e=!0,qe=!1,Fe=!1,Ve=!1,He=!1,ee=!1,Q=!1,xe=!0,mt=!1,ft="user-content-",Ke=!0,Je=!1,A={},Z=null,Ie=kt({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]),Ge=null,tt=kt({},["audio","video","img","source","image","track"]),Ce=null,Ze=kt({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),Ut="http://www.w3.org/1998/Math/MathML",wt="http://www.w3.org/2000/svg",bt="http://www.w3.org/1999/xhtml",Ft=bt,Ct=!1,Mt=null,de=kt({},[Ut,wt,bt],pl),ke=kt({},["mi","mo","mn","ms","mtext"]),Ue=kt({},["annotation-xml"]),rt=kt({},["title","style","font","a","script"]),et=null,je=["application/xhtml+xml","text/html"],x="text/html",j=null,ae=null,ge=n.createElement("form"),le=function(T){return T instanceof RegExp||T instanceof Function},it=function(){let T=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(ae&&ae===T)){if((!T||typeof T!="object")&&(T={}),T=sr(T),et=je.indexOf(T.PARSER_MEDIA_TYPE)===-1?x:T.PARSER_MEDIA_TYPE,j=et==="application/xhtml+xml"?pl:Pi,se=Nn(T,"ALLOWED_TAGS")?kt({},T.ALLOWED_TAGS,j):be,ve=Nn(T,"ALLOWED_ATTR")?kt({},T.ALLOWED_ATTR,j):Pe,Mt=Nn(T,"ALLOWED_NAMESPACES")?kt({},T.ALLOWED_NAMESPACES,pl):de,Ce=Nn(T,"ADD_URI_SAFE_ATTR")?kt(sr(Ze),T.ADD_URI_SAFE_ATTR,j):Ze,Ge=Nn(T,"ADD_DATA_URI_TAGS")?kt(sr(tt),T.ADD_DATA_URI_TAGS,j):tt,Z=Nn(T,"FORBID_CONTENTS")?kt({},T.FORBID_CONTENTS,j):Ie,Re=Nn(T,"FORBID_TAGS")?kt({},T.FORBID_TAGS,j):sr({}),Xe=Nn(T,"FORBID_ATTR")?kt({},T.FORBID_ATTR,j):sr({}),A=Nn(T,"USE_PROFILES")?T.USE_PROFILES:!1,H=T.ALLOW_ARIA_ATTR!==!1,J=T.ALLOW_DATA_ATTR!==!1,re=T.ALLOW_UNKNOWN_PROTOCOLS||!1,fe=T.ALLOW_SELF_CLOSE_IN_ATTR!==!1,Se=T.SAFE_FOR_TEMPLATES||!1,_e=T.SAFE_FOR_XML!==!1,qe=T.WHOLE_DOCUMENT||!1,He=T.RETURN_DOM||!1,ee=T.RETURN_DOM_FRAGMENT||!1,Q=T.RETURN_TRUSTED_TYPE||!1,Ve=T.FORCE_BODY||!1,xe=T.SANITIZE_DOM!==!1,mt=T.SANITIZE_NAMED_PROPS||!1,Ke=T.KEEP_CONTENT!==!1,Je=T.IN_PLACE||!1,O=T.ALLOWED_URI_REGEXP||op,Ft=T.NAMESPACE||bt,ke=T.MATHML_TEXT_INTEGRATION_POINTS||ke,Ue=T.HTML_INTEGRATION_POINTS||Ue,he=T.CUSTOM_ELEMENT_HANDLING||{},T.CUSTOM_ELEMENT_HANDLING&&le(T.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(he.tagNameCheck=T.CUSTOM_ELEMENT_HANDLING.tagNameCheck),T.CUSTOM_ELEMENT_HANDLING&&le(T.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(he.attributeNameCheck=T.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),T.CUSTOM_ELEMENT_HANDLING&&typeof T.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(he.allowCustomizedBuiltInElements=T.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),Se&&(J=!1),ee&&(He=!0),A&&(se=kt({},Zd),ve=[],A.html===!0&&(kt(se,Xd),kt(ve,Jd)),A.svg===!0&&(kt(se,_l),kt(ve,hl),kt(ve,Di)),A.svgFilters===!0&&(kt(se,ml),kt(ve,hl),kt(ve,Di)),A.mathMl===!0&&(kt(se,gl),kt(ve,ep),kt(ve,Di))),T.ADD_TAGS&&(typeof T.ADD_TAGS=="function"?dt.tagCheck=T.ADD_TAGS:(se===be&&(se=sr(se)),kt(se,T.ADD_TAGS,j))),T.ADD_ATTR&&(typeof T.ADD_ATTR=="function"?dt.attributeCheck=T.ADD_ATTR:(ve===Pe&&(ve=sr(ve)),kt(ve,T.ADD_ATTR,j))),T.ADD_URI_SAFE_ATTR&&kt(Ce,T.ADD_URI_SAFE_ATTR,j),T.FORBID_CONTENTS&&(Z===Ie&&(Z=sr(Z)),kt(Z,T.FORBID_CONTENTS,j)),Ke&&(se["#text"]=!0),qe&&kt(se,["html","head","body"]),se.table&&(kt(se,["tbody"]),delete Re.tbody),T.TRUSTED_TYPES_POLICY){if(typeof T.TRUSTED_TYPES_POLICY.createHTML!="function")throw us('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof T.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw us('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');M=T.TRUSTED_TYPES_POLICY,I=M.createHTML("")}else M===void 0&&(M=nb(m,o)),M!==null&&typeof I=="string"&&(I=M.createHTML(""));bn&&bn(T),ae=T}},It=kt({},[..._l,...ml,...Hh]),yt=kt({},[...gl,...Kh]),$t=function(T){let ne=W(T);(!ne||!ne.tagName)&&(ne={namespaceURI:Ft,tagName:"template"});let De=Pi(T.tagName),b=Pi(ne.tagName);return Mt[T.namespaceURI]?T.namespaceURI===wt?ne.namespaceURI===bt?De==="svg":ne.namespaceURI===Ut?De==="svg"&&(b==="annotation-xml"||ke[b]):!!It[De]:T.namespaceURI===Ut?ne.namespaceURI===bt?De==="math":ne.namespaceURI===wt?De==="math"&&Ue[b]:!!yt[De]:T.namespaceURI===bt?ne.namespaceURI===wt&&!Ue[b]||ne.namespaceURI===Ut&&!ke[b]?!1:!yt[De]&&(rt[De]||!It[De]):!!(et==="application/xhtml+xml"&&Mt[T.namespaceURI]):!1},xt=function(T){ls(t.removed,{element:T});try{W(T).removeChild(T)}catch{R(T)}},Lt=function(T,ne){try{ls(t.removed,{attribute:ne.getAttributeNode(T),from:ne})}catch{ls(t.removed,{attribute:null,from:ne})}if(ne.removeAttribute(T),T==="is")if(He||ee)try{xt(ne)}catch{}else try{ne.setAttribute(T,"")}catch{}},qt=function(T){let ne=null,De=null;if(Ve)T="<remove></remove>"+T;else{let P=fl(T,/^[\r\n\t ]+/);De=P&&P[0]}et==="application/xhtml+xml"&&Ft===bt&&(T='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+T+"</body></html>");let b=M?M.createHTML(T):T;if(Ft===bt)try{ne=new _().parseFromString(b,et)}catch{}if(!ne||!ne.documentElement){ne=L.createDocument(Ft,"template",null);try{ne.documentElement.innerHTML=Ct?I:b}catch{}}let v=ne.body||ne.documentElement;return T&&De&&v.insertBefore(n.createTextNode(De),v.childNodes[0]||null),Ft===bt?q.call(ne,qe?"html":"body")[0]:qe?ne.documentElement:v},Dt=function(T){return U.call(T.ownerDocument||T,T,u.SHOW_ELEMENT|u.SHOW_COMMENT|u.SHOW_TEXT|u.SHOW_PROCESSING_INSTRUCTION|u.SHOW_CDATA_SECTION,null)},Jt=function(T){return T instanceof p&&(typeof T.nodeName!="string"||typeof T.textContent!="string"||typeof T.removeChild!="function"||!(T.attributes instanceof d)||typeof T.removeAttribute!="function"||typeof T.setAttribute!="function"||typeof T.namespaceURI!="string"||typeof T.insertBefore!="function"||typeof T.hasChildNodes!="function")},Vt=function(T){return typeof l=="function"&&T instanceof l};function At(we,T,ne){Li(we,De=>{De.call(t,T,ne,ae)})}let Wt=function(T){let ne=null;if(At(z.beforeSanitizeElements,T,null),Jt(T))return xt(T),!0;let De=j(T.nodeName);if(At(z.uponSanitizeElement,T,{tagName:De,allowedTags:se}),_e&&T.hasChildNodes()&&!Vt(T.firstElementChild)&&hn(/<[/\w!]/g,T.innerHTML)&&hn(/<[/\w!]/g,T.textContent)||T.nodeType===ps.progressingInstruction||_e&&T.nodeType===ps.comment&&hn(/<[/\w]/g,T.data))return xt(T),!0;if(!(dt.tagCheck instanceof Function&&dt.tagCheck(De))&&(!se[De]||Re[De])){if(!Re[De]&&on(De)&&(he.tagNameCheck instanceof RegExp&&hn(he.tagNameCheck,De)||he.tagNameCheck instanceof Function&&he.tagNameCheck(De)))return!1;if(Ke&&!Z[De]){let b=W(T)||T.parentNode,v=te(T)||T.childNodes;if(v&&b){let P=v.length;for(let f=P-1;f>=0;--f){let k=C(v[f],!0);k.__removalCount=(T.__removalCount||0)+1,b.insertBefore(k,V(T))}}}return xt(T),!0}return T instanceof a&&!$t(T)||(De==="noscript"||De==="noembed"||De==="noframes")&&hn(/<\/no(script|embed|frames)/i,T.innerHTML)?(xt(T),!0):(Se&&T.nodeType===ps.text&&(ne=T.textContent,Li([G,oe,ye],b=>{ne=cs(ne,b," ")}),T.textContent!==ne&&(ls(t.removed,{element:T.cloneNode()}),T.textContent=ne)),At(z.afterSanitizeElements,T,null),!1)},zt=function(T,ne,De){if(xe&&(ne==="id"||ne==="name")&&(De in n||De in ge))return!1;if(!(J&&!Xe[ne]&&hn(Me,ne))){if(!(H&&hn(F,ne))){if(!(dt.attributeCheck instanceof Function&&dt.attributeCheck(ne,T))){if(!ve[ne]||Xe[ne]){if(!(on(T)&&(he.tagNameCheck instanceof RegExp&&hn(he.tagNameCheck,T)||he.tagNameCheck instanceof Function&&he.tagNameCheck(T))&&(he.attributeNameCheck instanceof RegExp&&hn(he.attributeNameCheck,ne)||he.attributeNameCheck instanceof Function&&he.attributeNameCheck(ne,T))||ne==="is"&&he.allowCustomizedBuiltInElements&&(he.tagNameCheck instanceof RegExp&&hn(he.tagNameCheck,De)||he.tagNameCheck instanceof Function&&he.tagNameCheck(De))))return!1}else if(!Ce[ne]){if(!hn(O,cs(De,Ae,""))){if(!((ne==="src"||ne==="xlink:href"||ne==="href")&&T!=="script"&&Bh(De,"data:")===0&&Ge[T])){if(!(re&&!hn(X,cs(De,Ae,"")))){if(De)return!1}}}}}}}return!0},on=function(T){return T!=="annotation-xml"&&fl(T,Ee)},Kt=function(T){At(z.beforeSanitizeAttributes,T,null);let{attributes:ne}=T;if(!ne||Jt(T))return;let De={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:ve,forceKeepAttr:void 0},b=ne.length;for(;b--;){let v=ne[b],{name:P,namespaceURI:f,value:k}=v,B=j(P),ce=k,ue=P==="value"?ce:Uh(ce);if(De.attrName=B,De.attrValue=ue,De.keepAttr=!0,De.forceKeepAttr=void 0,At(z.uponSanitizeAttribute,T,De),ue=De.attrValue,mt&&(B==="id"||B==="name")&&(Lt(P,T),ue=ft+ue),_e&&hn(/((--!?|])>)|<\/(style|title|textarea)/i,ue)){Lt(P,T);continue}if(B==="attributename"&&fl(ue,"href")){Lt(P,T);continue}if(De.forceKeepAttr)continue;if(!De.keepAttr){Lt(P,T);continue}if(!fe&&hn(/\/>/i,ue)){Lt(P,T);continue}Se&&Li([G,oe,ye],_t=>{ue=cs(ue,_t," ")});let Be=j(T.nodeName);if(!zt(Be,B,ue)){Lt(P,T);continue}if(M&&typeof m=="object"&&typeof m.getAttributeType=="function"&&!f)switch(m.getAttributeType(Be,B)){case"TrustedHTML":{ue=M.createHTML(ue);break}case"TrustedScriptURL":{ue=M.createScriptURL(ue);break}}if(ue!==ce)try{f?T.setAttributeNS(f,P,ue):T.setAttribute(P,ue),Jt(T)?xt(T):Qd(t.removed)}catch{Lt(P,T)}}At(z.afterSanitizeAttributes,T,null)},ln=function we(T){let ne=null,De=Dt(T);for(At(z.beforeSanitizeShadowDOM,T,null);ne=De.nextNode();)At(z.uponSanitizeShadowNode,ne,null),Wt(ne),Kt(ne),ne.content instanceof i&&we(ne.content);At(z.afterSanitizeShadowDOM,T,null)};return t.sanitize=function(we){let T=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},ne=null,De=null,b=null,v=null;if(Ct=!we,Ct&&(we="<!-->"),typeof we!="string"&&!Vt(we))if(typeof we.toString=="function"){if(we=we.toString(),typeof we!="string")throw us("dirty is not a string, aborting")}else throw us("toString is not a function");if(!t.isSupported)return we;if(Fe||it(T),t.removed=[],typeof we=="string"&&(Je=!1),Je){if(we.nodeName){let k=j(we.nodeName);if(!se[k]||Re[k])throw us("root node is forbidden and cannot be sanitized in-place")}}else if(we instanceof l)ne=qt("<!---->"),De=ne.ownerDocument.importNode(we,!0),De.nodeType===ps.element&&De.nodeName==="BODY"||De.nodeName==="HTML"?ne=De:ne.appendChild(De);else{if(!He&&!Se&&!qe&&we.indexOf("<")===-1)return M&&Q?M.createHTML(we):we;if(ne=qt(we),!ne)return He?null:Q?I:""}ne&&Ve&&xt(ne.firstChild);let P=Dt(Je?we:ne);for(;b=P.nextNode();)Wt(b),Kt(b),b.content instanceof i&&ln(b.content);if(Je)return we;if(He){if(ee)for(v=Y.call(ne.ownerDocument);ne.firstChild;)v.appendChild(ne.firstChild);else v=ne;return(ve.shadowroot||ve.shadowrootmode)&&(v=N.call(r,v,!0)),v}let f=qe?ne.outerHTML:ne.innerHTML;return qe&&se["!doctype"]&&ne.ownerDocument&&ne.ownerDocument.doctype&&ne.ownerDocument.doctype.name&&hn(sp,ne.ownerDocument.doctype.name)&&(f="<!DOCTYPE "+ne.ownerDocument.doctype.name+`>
`+f),Se&&Li([G,oe,ye],k=>{f=cs(f,k," ")}),M&&Q?M.createHTML(f):f},t.setConfig=function(){let we=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};it(we),Fe=!0},t.clearConfig=function(){ae=null,Fe=!1},t.isValidAttribute=function(we,T,ne){ae||it({});let De=j(we),b=j(T);return zt(De,b,ne)},t.addHook=function(we,T){typeof T=="function"&&ls(z[we],T)},t.removeHook=function(we,T){if(T!==void 0){let ne=jh(z[we],T);return ne===-1?void 0:Fh(z[we],ne,1)[0]}return Qd(z[we])},t.removeHooks=function(we){z[we]=[]},t.removeAllHooks=function(){z=np()},t}var ap=ip();var ir={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},Mi=e=>(...t)=>({_$litDirective$:e,values:t}),wo=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,n,r){this._$Ct=t,this._$AM=n,this._$Ci=r}_$AS(t,n){return this.update(t,n)}update(t,n){return this.render(...n)}};var fs=class extends wo{constructor(t){if(super(t),this.it=Yt,t.type!==ir.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===Yt||t==null)return this._t=void 0,this.it=t;if(t===Tn)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;let n=[t];return n.raw=n,this._t={_$litType$:this.constructor.resultType,strings:n,values:[]}}};fs.directiveName="unsafeHTML",fs.resultType=1;var lp=Mi(fs);function xl(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var Ur=xl();function mp(e){Ur=e}var hs={exec:()=>null};function Ot(e,t=""){let n=typeof e=="string"?e:e.source,r={replace:(o,i)=>{let s=typeof i=="string"?i:i.source;return s=s.replace(vn.caret,"$1"),n=n.replace(o,s),r},getRegex:()=>new RegExp(n,t)};return r}var rb=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),vn={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i")},ob=/^(?:[ \t]*(?:\n|$))+/,sb=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,ib=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,bs=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,ab=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,Al=/(?:[*+-]|\d{1,9}[.)])/,gp=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,hp=Ot(gp).replace(/bull/g,Al).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),lb=Ot(gp).replace(/bull/g,Al).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),Sl=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,cb=/^[^\n]+/,El=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,ub=Ot(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",El).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),db=Ot(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,Al).getRegex(),Ui="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",Tl=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,pb=Ot("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",Tl).replace("tag",Ui).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),bp=Ot(Sl).replace("hr",bs).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Ui).getRegex(),fb=Ot(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",bp).getRegex(),Cl={blockquote:fb,code:sb,def:ub,fences:ib,heading:ab,hr:bs,html:pb,lheading:hp,list:db,newline:ob,paragraph:bp,table:hs,text:cb},cp=Ot("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",bs).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Ui).getRegex(),_b={...Cl,lheading:lb,table:cp,paragraph:Ot(Sl).replace("hr",bs).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",cp).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Ui).getRegex()},mb={...Cl,html:Ot(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",Tl).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:hs,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:Ot(Sl).replace("hr",bs).replace("heading",` *#{1,6} *[^
]`).replace("lheading",hp).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},gb=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,hb=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,yp=/^( {2,}|\\)\n(?!\s*$)/,bb=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,Wi=/[\p{P}\p{S}]/u,Ol=/[\s\p{P}\p{S}]/u,vp=/[^\s\p{P}\p{S}]/u,yb=Ot(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,Ol).getRegex(),kp=/(?!~)[\p{P}\p{S}]/u,vb=/(?!~)[\s\p{P}\p{S}]/u,kb=/(?:[^\s\p{P}\p{S}]|~)/u,wb=Ot(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",rb?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),wp=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,$b=Ot(wp,"u").replace(/punct/g,Wi).getRegex(),xb=Ot(wp,"u").replace(/punct/g,kp).getRegex(),$p="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",Ab=Ot($p,"gu").replace(/notPunctSpace/g,vp).replace(/punctSpace/g,Ol).replace(/punct/g,Wi).getRegex(),Sb=Ot($p,"gu").replace(/notPunctSpace/g,kb).replace(/punctSpace/g,vb).replace(/punct/g,kp).getRegex(),Eb=Ot("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,vp).replace(/punctSpace/g,Ol).replace(/punct/g,Wi).getRegex(),Tb=Ot(/\\(punct)/,"gu").replace(/punct/g,Wi).getRegex(),Cb=Ot(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),Ob=Ot(Tl).replace("(?:-->|$)","-->").getRegex(),Rb=Ot("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",Ob).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),ji=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,Ib=Ot(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",ji).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),xp=Ot(/^!?\[(label)\]\[(ref)\]/).replace("label",ji).replace("ref",El).getRegex(),Ap=Ot(/^!?\[(ref)\](?:\[\])?/).replace("ref",El).getRegex(),Lb=Ot("reflink|nolink(?!\\()","g").replace("reflink",xp).replace("nolink",Ap).getRegex(),up=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,Rl={_backpedal:hs,anyPunctuation:Tb,autolink:Cb,blockSkip:wb,br:yp,code:hb,del:hs,emStrongLDelim:$b,emStrongRDelimAst:Ab,emStrongRDelimUnd:Eb,escape:gb,link:Ib,nolink:Ap,punctuation:yb,reflink:xp,reflinkSearch:Lb,tag:Rb,text:bb,url:hs},Db={...Rl,link:Ot(/^!?\[(label)\]\((.*?)\)/).replace("label",ji).getRegex(),reflink:Ot(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",ji).getRegex()},kl={...Rl,emStrongRDelimAst:Sb,emStrongLDelim:xb,url:Ot(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",up).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:Ot(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",up).getRegex()},Pb={...kl,br:Ot(yp).replace("{2,}","*").getRegex(),text:Ot(kl.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},qi={normal:Cl,gfm:_b,pedantic:mb},_s={normal:Rl,gfm:kl,breaks:Pb,pedantic:Db},Mb={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},dp=e=>Mb[e];function ar(e,t){if(t){if(vn.escapeTest.test(e))return e.replace(vn.escapeReplace,dp)}else if(vn.escapeTestNoEncode.test(e))return e.replace(vn.escapeReplaceNoEncode,dp);return e}function pp(e){try{e=encodeURI(e).replace(vn.percentDecode,"%")}catch{return null}return e}function fp(e,t){let n=e.replace(vn.findPipe,(i,s,l)=>{let a=!1,u=s;for(;--u>=0&&l[u]==="\\";)a=!a;return a?"|":" |"}),r=n.split(vn.splitPipe),o=0;if(r[0].trim()||r.shift(),r.length>0&&!r.at(-1)?.trim()&&r.pop(),t)if(r.length>t)r.splice(t);else for(;r.length<t;)r.push("");for(;o<r.length;o++)r[o]=r[o].trim().replace(vn.slashPipe,"|");return r}function ms(e,t,n){let r=e.length;if(r===0)return"";let o=0;for(;o<r;){let i=e.charAt(r-o-1);if(i===t&&!n)o++;else if(i!==t&&n)o++;else break}return e.slice(0,r-o)}function qb(e,t){if(e.indexOf(t[1])===-1)return-1;let n=0;for(let r=0;r<e.length;r++)if(e[r]==="\\")r++;else if(e[r]===t[0])n++;else if(e[r]===t[1]&&(n--,n<0))return r;return n>0?-2:-1}function _p(e,t,n,r,o){let i=t.href,s=t.title||null,l=e[1].replace(o.other.outputLinkReplace,"$1");r.state.inLink=!0;let a={type:e[0].charAt(0)==="!"?"image":"link",raw:n,href:i,title:s,text:l,tokens:r.inlineTokens(l)};return r.state.inLink=!1,a}function Nb(e,t,n){let r=e.match(n.other.indentCodeCompensation);if(r===null)return t;let o=r[1];return t.split(`
`).map(i=>{let s=i.match(n.other.beginningSpace);if(s===null)return i;let[l]=s;return l.length>=o.length?i.slice(o.length):i}).join(`
`)}var Fi=class{constructor(e){jt(this,"options");jt(this,"rules");jt(this,"lexer");this.options=e||Ur}space(e){let t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){let t=this.rules.block.code.exec(e);if(t){let n=t[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?n:ms(n,`
`)}}}fences(e){let t=this.rules.block.fences.exec(e);if(t){let n=t[0],r=Nb(n,t[3]||"",this.rules);return{type:"code",raw:n,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:r}}}heading(e){let t=this.rules.block.heading.exec(e);if(t){let n=t[2].trim();if(this.rules.other.endingHash.test(n)){let r=ms(n,"#");(this.options.pedantic||!r||this.rules.other.endingSpaceChar.test(r))&&(n=r.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:n,tokens:this.lexer.inline(n)}}}hr(e){let t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:ms(t[0],`
`)}}blockquote(e){let t=this.rules.block.blockquote.exec(e);if(t){let n=ms(t[0],`
`).split(`
`),r="",o="",i=[];for(;n.length>0;){let s=!1,l=[],a;for(a=0;a<n.length;a++)if(this.rules.other.blockquoteStart.test(n[a]))l.push(n[a]),s=!0;else if(!s)l.push(n[a]);else break;n=n.slice(a);let u=l.join(`
`),d=u.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");r=r?`${r}
${u}`:u,o=o?`${o}
${d}`:d;let p=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(d,i,!0),this.lexer.state.top=p,n.length===0)break;let _=i.at(-1);if(_?.type==="code")break;if(_?.type==="blockquote"){let m=_,y=m.raw+`
`+n.join(`
`),C=this.blockquote(y);i[i.length-1]=C,r=r.substring(0,r.length-m.raw.length)+C.raw,o=o.substring(0,o.length-m.text.length)+C.text;break}else if(_?.type==="list"){let m=_,y=m.raw+`
`+n.join(`
`),C=this.list(y);i[i.length-1]=C,r=r.substring(0,r.length-_.raw.length)+C.raw,o=o.substring(0,o.length-m.raw.length)+C.raw,n=y.substring(i.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:r,tokens:i,text:o}}}list(e){let t=this.rules.block.list.exec(e);if(t){let n=t[1].trim(),r=n.length>1,o={type:"list",raw:"",ordered:r,start:r?+n.slice(0,-1):"",loose:!1,items:[]};n=r?`\\d{1,9}\\${n.slice(-1)}`:`\\${n}`,this.options.pedantic&&(n=r?n:"[*+-]");let i=this.rules.other.listItemRegex(n),s=!1;for(;e;){let a=!1,u="",d="";if(!(t=i.exec(e))||this.rules.block.hr.test(e))break;u=t[0],e=e.substring(u.length);let p=t[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,C=>" ".repeat(3*C.length)),_=e.split(`
`,1)[0],m=!p.trim(),y=0;if(this.options.pedantic?(y=2,d=p.trimStart()):m?y=t[1].length+1:(y=t[2].search(this.rules.other.nonSpaceChar),y=y>4?1:y,d=p.slice(y),y+=t[1].length),m&&this.rules.other.blankLine.test(_)&&(u+=_+`
`,e=e.substring(_.length+1),a=!0),!a){let C=this.rules.other.nextBulletRegex(y),R=this.rules.other.hrRegex(y),V=this.rules.other.fencesBeginRegex(y),te=this.rules.other.headingBeginRegex(y),W=this.rules.other.htmlBeginRegex(y);for(;e;){let M=e.split(`
`,1)[0],I;if(_=M,this.options.pedantic?(_=_.replace(this.rules.other.listReplaceNesting,"  "),I=_):I=_.replace(this.rules.other.tabCharGlobal,"    "),V.test(_)||te.test(_)||W.test(_)||C.test(_)||R.test(_))break;if(I.search(this.rules.other.nonSpaceChar)>=y||!_.trim())d+=`
`+I.slice(y);else{if(m||p.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||V.test(p)||te.test(p)||R.test(p))break;d+=`
`+_}!m&&!_.trim()&&(m=!0),u+=M+`
`,e=e.substring(M.length+1),p=I.slice(y)}}o.loose||(s?o.loose=!0:this.rules.other.doubleBlankLine.test(u)&&(s=!0)),o.items.push({type:"list_item",raw:u,task:!!this.options.gfm&&this.rules.other.listIsTask.test(d),loose:!1,text:d,tokens:[]}),o.raw+=u}let l=o.items.at(-1);if(l)l.raw=l.raw.trimEnd(),l.text=l.text.trimEnd();else return;o.raw=o.raw.trimEnd();for(let a of o.items){if(this.lexer.state.top=!1,a.tokens=this.lexer.blockTokens(a.text,[]),a.task){if(a.text=a.text.replace(this.rules.other.listReplaceTask,""),a.tokens[0]?.type==="text"||a.tokens[0]?.type==="paragraph"){a.tokens[0].raw=a.tokens[0].raw.replace(this.rules.other.listReplaceTask,""),a.tokens[0].text=a.tokens[0].text.replace(this.rules.other.listReplaceTask,"");for(let d=this.lexer.inlineQueue.length-1;d>=0;d--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[d].src)){this.lexer.inlineQueue[d].src=this.lexer.inlineQueue[d].src.replace(this.rules.other.listReplaceTask,"");break}}let u=this.rules.other.listTaskCheckbox.exec(a.raw);if(u){let d={type:"checkbox",raw:u[0]+" ",checked:u[0]!=="[ ]"};a.checked=d.checked,o.loose?a.tokens[0]&&["paragraph","text"].includes(a.tokens[0].type)&&"tokens"in a.tokens[0]&&a.tokens[0].tokens?(a.tokens[0].raw=d.raw+a.tokens[0].raw,a.tokens[0].text=d.raw+a.tokens[0].text,a.tokens[0].tokens.unshift(d)):a.tokens.unshift({type:"paragraph",raw:d.raw,text:d.raw,tokens:[d]}):a.tokens.unshift(d)}}if(!o.loose){let u=a.tokens.filter(p=>p.type==="space"),d=u.length>0&&u.some(p=>this.rules.other.anyLine.test(p.raw));o.loose=d}}if(o.loose)for(let a of o.items){a.loose=!0;for(let u of a.tokens)u.type==="text"&&(u.type="paragraph")}return o}}html(e){let t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){let t=this.rules.block.def.exec(e);if(t){let n=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),r=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",o=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:n,raw:t[0],href:r,title:o}}}table(e){let t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;let n=fp(t[1]),r=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),o=t[3]?.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],i={type:"table",raw:t[0],header:[],align:[],rows:[]};if(n.length===r.length){for(let s of r)this.rules.other.tableAlignRight.test(s)?i.align.push("right"):this.rules.other.tableAlignCenter.test(s)?i.align.push("center"):this.rules.other.tableAlignLeft.test(s)?i.align.push("left"):i.align.push(null);for(let s=0;s<n.length;s++)i.header.push({text:n[s],tokens:this.lexer.inline(n[s]),header:!0,align:i.align[s]});for(let s of o)i.rows.push(fp(s,i.header.length).map((l,a)=>({text:l,tokens:this.lexer.inline(l),header:!1,align:i.align[a]})));return i}}lheading(e){let t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){let t=this.rules.block.paragraph.exec(e);if(t){let n=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:n,tokens:this.lexer.inline(n)}}}text(e){let t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){let t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){let t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){let t=this.rules.inline.link.exec(e);if(t){let n=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(n)){if(!this.rules.other.endAngleBracket.test(n))return;let i=ms(n.slice(0,-1),"\\");if((n.length-i.length)%2===0)return}else{let i=qb(t[2],"()");if(i===-2)return;if(i>-1){let s=(t[0].indexOf("!")===0?5:4)+t[1].length+i;t[2]=t[2].substring(0,i),t[0]=t[0].substring(0,s).trim(),t[3]=""}}let r=t[2],o="";if(this.options.pedantic){let i=this.rules.other.pedanticHrefTitle.exec(r);i&&(r=i[1],o=i[3])}else o=t[3]?t[3].slice(1,-1):"";return r=r.trim(),this.rules.other.startAngleBracket.test(r)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(n)?r=r.slice(1):r=r.slice(1,-1)),_p(t,{href:r&&r.replace(this.rules.inline.anyPunctuation,"$1"),title:o&&o.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let n;if((n=this.rules.inline.reflink.exec(e))||(n=this.rules.inline.nolink.exec(e))){let r=(n[2]||n[1]).replace(this.rules.other.multipleSpaceGlobal," "),o=t[r.toLowerCase()];if(!o){let i=n[0].charAt(0);return{type:"text",raw:i,text:i}}return _p(n,o,n[0],this.lexer,this.rules)}}emStrong(e,t,n=""){let r=this.rules.inline.emStrongLDelim.exec(e);if(!(!r||r[3]&&n.match(this.rules.other.unicodeAlphaNumeric))&&(!(r[1]||r[2])||!n||this.rules.inline.punctuation.exec(n))){let o=[...r[0]].length-1,i,s,l=o,a=0,u=r[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(u.lastIndex=0,t=t.slice(-1*e.length+o);(r=u.exec(t))!=null;){if(i=r[1]||r[2]||r[3]||r[4]||r[5]||r[6],!i)continue;if(s=[...i].length,r[3]||r[4]){l+=s;continue}else if((r[5]||r[6])&&o%3&&!((o+s)%3)){a+=s;continue}if(l-=s,l>0)continue;s=Math.min(s,s+l+a);let d=[...r[0]][0].length,p=e.slice(0,o+r.index+d+s);if(Math.min(o,s)%2){let m=p.slice(1,-1);return{type:"em",raw:p,text:m,tokens:this.lexer.inlineTokens(m)}}let _=p.slice(2,-2);return{type:"strong",raw:p,text:_,tokens:this.lexer.inlineTokens(_)}}}}codespan(e){let t=this.rules.inline.code.exec(e);if(t){let n=t[2].replace(this.rules.other.newLineCharGlobal," "),r=this.rules.other.nonSpaceChar.test(n),o=this.rules.other.startingSpaceChar.test(n)&&this.rules.other.endingSpaceChar.test(n);return r&&o&&(n=n.substring(1,n.length-1)),{type:"codespan",raw:t[0],text:n}}}br(e){let t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){let t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){let t=this.rules.inline.autolink.exec(e);if(t){let n,r;return t[2]==="@"?(n=t[1],r="mailto:"+n):(n=t[1],r=n),{type:"link",raw:t[0],text:n,href:r,tokens:[{type:"text",raw:n,text:n}]}}}url(e){let t;if(t=this.rules.inline.url.exec(e)){let n,r;if(t[2]==="@")n=t[0],r="mailto:"+n;else{let o;do o=t[0],t[0]=this.rules.inline._backpedal.exec(t[0])?.[0]??"";while(o!==t[0]);n=t[0],t[1]==="www."?r="http://"+t[0]:r=t[0]}return{type:"link",raw:t[0],text:n,href:r,tokens:[{type:"text",raw:n,text:n}]}}}inlineText(e){let t=this.rules.inline.text.exec(e);if(t){let n=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:n}}}},jn=class wl{constructor(t){jt(this,"tokens");jt(this,"options");jt(this,"state");jt(this,"inlineQueue");jt(this,"tokenizer");this.tokens=[],this.tokens.links=Object.create(null),this.options=t||Ur,this.options.tokenizer=this.options.tokenizer||new Fi,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let n={other:vn,block:qi.normal,inline:_s.normal};this.options.pedantic?(n.block=qi.pedantic,n.inline=_s.pedantic):this.options.gfm&&(n.block=qi.gfm,this.options.breaks?n.inline=_s.breaks:n.inline=_s.gfm),this.tokenizer.rules=n}static get rules(){return{block:qi,inline:_s}}static lex(t,n){return new wl(n).lex(t)}static lexInline(t,n){return new wl(n).inlineTokens(t)}lex(t){t=t.replace(vn.carriageReturn,`
`),this.blockTokens(t,this.tokens);for(let n=0;n<this.inlineQueue.length;n++){let r=this.inlineQueue[n];this.inlineTokens(r.src,r.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(t,n=[],r=!1){for(this.options.pedantic&&(t=t.replace(vn.tabCharGlobal,"    ").replace(vn.spaceLine,""));t;){let o;if(this.options.extensions?.block?.some(s=>(o=s.call({lexer:this},t,n))?(t=t.substring(o.raw.length),n.push(o),!0):!1))continue;if(o=this.tokenizer.space(t)){t=t.substring(o.raw.length);let s=n.at(-1);o.raw.length===1&&s!==void 0?s.raw+=`
`:n.push(o);continue}if(o=this.tokenizer.code(t)){t=t.substring(o.raw.length);let s=n.at(-1);s?.type==="paragraph"||s?.type==="text"?(s.raw+=(s.raw.endsWith(`
`)?"":`
`)+o.raw,s.text+=`
`+o.text,this.inlineQueue.at(-1).src=s.text):n.push(o);continue}if(o=this.tokenizer.fences(t)){t=t.substring(o.raw.length),n.push(o);continue}if(o=this.tokenizer.heading(t)){t=t.substring(o.raw.length),n.push(o);continue}if(o=this.tokenizer.hr(t)){t=t.substring(o.raw.length),n.push(o);continue}if(o=this.tokenizer.blockquote(t)){t=t.substring(o.raw.length),n.push(o);continue}if(o=this.tokenizer.list(t)){t=t.substring(o.raw.length),n.push(o);continue}if(o=this.tokenizer.html(t)){t=t.substring(o.raw.length),n.push(o);continue}if(o=this.tokenizer.def(t)){t=t.substring(o.raw.length);let s=n.at(-1);s?.type==="paragraph"||s?.type==="text"?(s.raw+=(s.raw.endsWith(`
`)?"":`
`)+o.raw,s.text+=`
`+o.raw,this.inlineQueue.at(-1).src=s.text):this.tokens.links[o.tag]||(this.tokens.links[o.tag]={href:o.href,title:o.title},n.push(o));continue}if(o=this.tokenizer.table(t)){t=t.substring(o.raw.length),n.push(o);continue}if(o=this.tokenizer.lheading(t)){t=t.substring(o.raw.length),n.push(o);continue}let i=t;if(this.options.extensions?.startBlock){let s=1/0,l=t.slice(1),a;this.options.extensions.startBlock.forEach(u=>{a=u.call({lexer:this},l),typeof a=="number"&&a>=0&&(s=Math.min(s,a))}),s<1/0&&s>=0&&(i=t.substring(0,s+1))}if(this.state.top&&(o=this.tokenizer.paragraph(i))){let s=n.at(-1);r&&s?.type==="paragraph"?(s.raw+=(s.raw.endsWith(`
`)?"":`
`)+o.raw,s.text+=`
`+o.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=s.text):n.push(o),r=i.length!==t.length,t=t.substring(o.raw.length);continue}if(o=this.tokenizer.text(t)){t=t.substring(o.raw.length);let s=n.at(-1);s?.type==="text"?(s.raw+=(s.raw.endsWith(`
`)?"":`
`)+o.raw,s.text+=`
`+o.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=s.text):n.push(o);continue}if(t){let s="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(s);break}else throw new Error(s)}}return this.state.top=!0,n}inline(t,n=[]){return this.inlineQueue.push({src:t,tokens:n}),n}inlineTokens(t,n=[]){let r=t,o=null;if(this.tokens.links){let a=Object.keys(this.tokens.links);if(a.length>0)for(;(o=this.tokenizer.rules.inline.reflinkSearch.exec(r))!=null;)a.includes(o[0].slice(o[0].lastIndexOf("[")+1,-1))&&(r=r.slice(0,o.index)+"["+"a".repeat(o[0].length-2)+"]"+r.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(o=this.tokenizer.rules.inline.anyPunctuation.exec(r))!=null;)r=r.slice(0,o.index)+"++"+r.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let i;for(;(o=this.tokenizer.rules.inline.blockSkip.exec(r))!=null;)i=o[2]?o[2].length:0,r=r.slice(0,o.index+i)+"["+"a".repeat(o[0].length-i-2)+"]"+r.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);r=this.options.hooks?.emStrongMask?.call({lexer:this},r)??r;let s=!1,l="";for(;t;){s||(l=""),s=!1;let a;if(this.options.extensions?.inline?.some(d=>(a=d.call({lexer:this},t,n))?(t=t.substring(a.raw.length),n.push(a),!0):!1))continue;if(a=this.tokenizer.escape(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.tag(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.link(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(a.raw.length);let d=n.at(-1);a.type==="text"&&d?.type==="text"?(d.raw+=a.raw,d.text+=a.text):n.push(a);continue}if(a=this.tokenizer.emStrong(t,r,l)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.codespan(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.br(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.del(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.autolink(t)){t=t.substring(a.raw.length),n.push(a);continue}if(!this.state.inLink&&(a=this.tokenizer.url(t))){t=t.substring(a.raw.length),n.push(a);continue}let u=t;if(this.options.extensions?.startInline){let d=1/0,p=t.slice(1),_;this.options.extensions.startInline.forEach(m=>{_=m.call({lexer:this},p),typeof _=="number"&&_>=0&&(d=Math.min(d,_))}),d<1/0&&d>=0&&(u=t.substring(0,d+1))}if(a=this.tokenizer.inlineText(u)){t=t.substring(a.raw.length),a.raw.slice(-1)!=="_"&&(l=a.raw.slice(-1)),s=!0;let d=n.at(-1);d?.type==="text"?(d.raw+=a.raw,d.text+=a.text):n.push(a);continue}if(t){let d="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(d);break}else throw new Error(d)}}return n}},Bi=class{constructor(e){jt(this,"options");jt(this,"parser");this.options=e||Ur}space(e){return""}code({text:e,lang:t,escaped:n}){let r=(t||"").match(vn.notSpaceStart)?.[0],o=e.replace(vn.endingNewline,"")+`
`;return r?'<pre><code class="language-'+ar(r)+'">'+(n?o:ar(o,!0))+`</code></pre>
`:"<pre><code>"+(n?o:ar(o,!0))+`</code></pre>
`}blockquote({tokens:e}){return`<blockquote>
${this.parser.parse(e)}</blockquote>
`}html({text:e}){return e}def(e){return""}heading({tokens:e,depth:t}){return`<h${t}>${this.parser.parseInline(e)}</h${t}>
`}hr(e){return`<hr>
`}list(e){let t=e.ordered,n=e.start,r="";for(let s=0;s<e.items.length;s++){let l=e.items[s];r+=this.listitem(l)}let o=t?"ol":"ul",i=t&&n!==1?' start="'+n+'"':"";return"<"+o+i+`>
`+r+"</"+o+`>
`}listitem(e){return`<li>${this.parser.parse(e.tokens)}</li>
`}checkbox({checked:e}){return"<input "+(e?'checked="" ':"")+'disabled="" type="checkbox"> '}paragraph({tokens:e}){return`<p>${this.parser.parseInline(e)}</p>
`}table(e){let t="",n="";for(let o=0;o<e.header.length;o++)n+=this.tablecell(e.header[o]);t+=this.tablerow({text:n});let r="";for(let o=0;o<e.rows.length;o++){let i=e.rows[o];n="";for(let s=0;s<i.length;s++)n+=this.tablecell(i[s]);r+=this.tablerow({text:n})}return r&&(r=`<tbody>${r}</tbody>`),`<table>
<thead>
`+t+`</thead>
`+r+`</table>
`}tablerow({text:e}){return`<tr>
${e}</tr>
`}tablecell(e){let t=this.parser.parseInline(e.tokens),n=e.header?"th":"td";return(e.align?`<${n} align="${e.align}">`:`<${n}>`)+t+`</${n}>
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${ar(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:n}){let r=this.parser.parseInline(n),o=pp(e);if(o===null)return r;e=o;let i='<a href="'+e+'"';return t&&(i+=' title="'+ar(t)+'"'),i+=">"+r+"</a>",i}image({href:e,title:t,text:n,tokens:r}){r&&(n=this.parser.parseInline(r,this.parser.textRenderer));let o=pp(e);if(o===null)return ar(n);e=o;let i=`<img src="${e}" alt="${n}"`;return t&&(i+=` title="${ar(t)}"`),i+=">",i}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:ar(e.text)}},Il=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}checkbox({raw:e}){return e}},Fn=class $l{constructor(t){jt(this,"options");jt(this,"renderer");jt(this,"textRenderer");this.options=t||Ur,this.options.renderer=this.options.renderer||new Bi,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new Il}static parse(t,n){return new $l(n).parse(t)}static parseInline(t,n){return new $l(n).parseInline(t)}parse(t){let n="";for(let r=0;r<t.length;r++){let o=t[r];if(this.options.extensions?.renderers?.[o.type]){let s=o,l=this.options.extensions.renderers[s.type].call({parser:this},s);if(l!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(s.type)){n+=l||"";continue}}let i=o;switch(i.type){case"space":{n+=this.renderer.space(i);break}case"hr":{n+=this.renderer.hr(i);break}case"heading":{n+=this.renderer.heading(i);break}case"code":{n+=this.renderer.code(i);break}case"table":{n+=this.renderer.table(i);break}case"blockquote":{n+=this.renderer.blockquote(i);break}case"list":{n+=this.renderer.list(i);break}case"checkbox":{n+=this.renderer.checkbox(i);break}case"html":{n+=this.renderer.html(i);break}case"def":{n+=this.renderer.def(i);break}case"paragraph":{n+=this.renderer.paragraph(i);break}case"text":{n+=this.renderer.text(i);break}default:{let s='Token with "'+i.type+'" type was not found.';if(this.options.silent)return console.error(s),"";throw new Error(s)}}}return n}parseInline(t,n=this.renderer){let r="";for(let o=0;o<t.length;o++){let i=t[o];if(this.options.extensions?.renderers?.[i.type]){let l=this.options.extensions.renderers[i.type].call({parser:this},i);if(l!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(i.type)){r+=l||"";continue}}let s=i;switch(s.type){case"escape":{r+=n.text(s);break}case"html":{r+=n.html(s);break}case"link":{r+=n.link(s);break}case"image":{r+=n.image(s);break}case"checkbox":{r+=n.checkbox(s);break}case"strong":{r+=n.strong(s);break}case"em":{r+=n.em(s);break}case"codespan":{r+=n.codespan(s);break}case"br":{r+=n.br(s);break}case"del":{r+=n.del(s);break}case"text":{r+=n.text(s);break}default:{let l='Token with "'+s.type+'" type was not found.';if(this.options.silent)return console.error(l),"";throw new Error(l)}}}return r}},Ni,gs=(Ni=class{constructor(e){jt(this,"options");jt(this,"block");this.options=e||Ur}preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}emStrongMask(e){return e}provideLexer(){return this.block?jn.lex:jn.lexInline}provideParser(){return this.block?Fn.parse:Fn.parseInline}},jt(Ni,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens","emStrongMask"])),jt(Ni,"passThroughHooksRespectAsync",new Set(["preprocess","postprocess","processAllTokens"])),Ni),jb=class{constructor(...e){jt(this,"defaults",xl());jt(this,"options",this.setOptions);jt(this,"parse",this.parseMarkdown(!0));jt(this,"parseInline",this.parseMarkdown(!1));jt(this,"Parser",Fn);jt(this,"Renderer",Bi);jt(this,"TextRenderer",Il);jt(this,"Lexer",jn);jt(this,"Tokenizer",Fi);jt(this,"Hooks",gs);this.use(...e)}walkTokens(e,t){let n=[];for(let r of e)switch(n=n.concat(t.call(this,r)),r.type){case"table":{let o=r;for(let i of o.header)n=n.concat(this.walkTokens(i.tokens,t));for(let i of o.rows)for(let s of i)n=n.concat(this.walkTokens(s.tokens,t));break}case"list":{let o=r;n=n.concat(this.walkTokens(o.items,t));break}default:{let o=r;this.defaults.extensions?.childTokens?.[o.type]?this.defaults.extensions.childTokens[o.type].forEach(i=>{let s=o[i].flat(1/0);n=n.concat(this.walkTokens(s,t))}):o.tokens&&(n=n.concat(this.walkTokens(o.tokens,t)))}}return n}use(...e){let t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(n=>{let r={...n};if(r.async=this.defaults.async||r.async||!1,n.extensions&&(n.extensions.forEach(o=>{if(!o.name)throw new Error("extension name required");if("renderer"in o){let i=t.renderers[o.name];i?t.renderers[o.name]=function(...s){let l=o.renderer.apply(this,s);return l===!1&&(l=i.apply(this,s)),l}:t.renderers[o.name]=o.renderer}if("tokenizer"in o){if(!o.level||o.level!=="block"&&o.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let i=t[o.level];i?i.unshift(o.tokenizer):t[o.level]=[o.tokenizer],o.start&&(o.level==="block"?t.startBlock?t.startBlock.push(o.start):t.startBlock=[o.start]:o.level==="inline"&&(t.startInline?t.startInline.push(o.start):t.startInline=[o.start]))}"childTokens"in o&&o.childTokens&&(t.childTokens[o.name]=o.childTokens)}),r.extensions=t),n.renderer){let o=this.defaults.renderer||new Bi(this.defaults);for(let i in n.renderer){if(!(i in o))throw new Error(`renderer '${i}' does not exist`);if(["options","parser"].includes(i))continue;let s=i,l=n.renderer[s],a=o[s];o[s]=(...u)=>{let d=l.apply(o,u);return d===!1&&(d=a.apply(o,u)),d||""}}r.renderer=o}if(n.tokenizer){let o=this.defaults.tokenizer||new Fi(this.defaults);for(let i in n.tokenizer){if(!(i in o))throw new Error(`tokenizer '${i}' does not exist`);if(["options","rules","lexer"].includes(i))continue;let s=i,l=n.tokenizer[s],a=o[s];o[s]=(...u)=>{let d=l.apply(o,u);return d===!1&&(d=a.apply(o,u)),d}}r.tokenizer=o}if(n.hooks){let o=this.defaults.hooks||new gs;for(let i in n.hooks){if(!(i in o))throw new Error(`hook '${i}' does not exist`);if(["options","block"].includes(i))continue;let s=i,l=n.hooks[s],a=o[s];gs.passThroughHooks.has(i)?o[s]=u=>{if(this.defaults.async&&gs.passThroughHooksRespectAsync.has(i))return(async()=>{let p=await l.call(o,u);return a.call(o,p)})();let d=l.call(o,u);return a.call(o,d)}:o[s]=(...u)=>{if(this.defaults.async)return(async()=>{let p=await l.apply(o,u);return p===!1&&(p=await a.apply(o,u)),p})();let d=l.apply(o,u);return d===!1&&(d=a.apply(o,u)),d}}r.hooks=o}if(n.walkTokens){let o=this.defaults.walkTokens,i=n.walkTokens;r.walkTokens=function(s){let l=[];return l.push(i.call(this,s)),o&&(l=l.concat(o.call(this,s))),l}}this.defaults={...this.defaults,...r}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return jn.lex(e,t??this.defaults)}parser(e,t){return Fn.parse(e,t??this.defaults)}parseMarkdown(e){return(t,n)=>{let r={...n},o={...this.defaults,...r},i=this.onError(!!o.silent,!!o.async);if(this.defaults.async===!0&&r.async===!1)return i(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof t>"u"||t===null)return i(new Error("marked(): input parameter is undefined or null"));if(typeof t!="string")return i(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(t)+", string expected"));if(o.hooks&&(o.hooks.options=o,o.hooks.block=e),o.async)return(async()=>{let s=o.hooks?await o.hooks.preprocess(t):t,l=await(o.hooks?await o.hooks.provideLexer():e?jn.lex:jn.lexInline)(s,o),a=o.hooks?await o.hooks.processAllTokens(l):l;o.walkTokens&&await Promise.all(this.walkTokens(a,o.walkTokens));let u=await(o.hooks?await o.hooks.provideParser():e?Fn.parse:Fn.parseInline)(a,o);return o.hooks?await o.hooks.postprocess(u):u})().catch(i);try{o.hooks&&(t=o.hooks.preprocess(t));let s=(o.hooks?o.hooks.provideLexer():e?jn.lex:jn.lexInline)(t,o);o.hooks&&(s=o.hooks.processAllTokens(s)),o.walkTokens&&this.walkTokens(s,o.walkTokens);let l=(o.hooks?o.hooks.provideParser():e?Fn.parse:Fn.parseInline)(s,o);return o.hooks&&(l=o.hooks.postprocess(l)),l}catch(s){return i(s)}}}onError(e,t){return n=>{if(n.message+=`
Please report this to https://github.com/markedjs/marked.`,e){let r="<p>An error occurred:</p><pre>"+ar(n.message+"",!0)+"</pre>";return t?Promise.resolve(r):r}if(t)return Promise.reject(n);throw n}}},Br=new jb;function Pt(e,t){return Br.parse(e,t)}Pt.options=Pt.setOptions=function(e){return Br.setOptions(e),Pt.defaults=Br.defaults,mp(Pt.defaults),Pt};Pt.getDefaults=xl;Pt.defaults=Ur;Pt.use=function(...e){return Br.use(...e),Pt.defaults=Br.defaults,mp(Pt.defaults),Pt};Pt.walkTokens=function(e,t){return Br.walkTokens(e,t)};Pt.parseInline=Br.parseInline;Pt.Parser=Fn;Pt.parser=Fn.parse;Pt.Renderer=Bi;Pt.TextRenderer=Il;Pt.Lexer=jn;Pt.lexer=jn.lex;Pt.Tokenizer=Fi;Pt.Hooks=gs;Pt.parse=Pt;var h0=Pt.options,b0=Pt.setOptions,y0=Pt.use,v0=Pt.walkTokens,k0=Pt.parseInline;var w0=Fn.parse,$0=jn.lex;function vr(e){let t=Pt.parse(e),n=ap.sanitize(t);return lp(n)}function lr(e,t){return c`<div class="prompt-block">
    <div class="prompt-block__label">${e}</div>
    <pre class="prompt-block__body">${t}</pre>
  </div>`}function $o(e){return e.loading?c`<div class="prompt-block__status">불러오는 중…</div>`:e.error?c`<div class="prompt-block__status prompt-block__status--error">
      프롬프트를 불러오지 못했습니다
    </div>`:""}function zi(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),n=r=>String(r).padStart(2,"0");return`${t.getFullYear()}-${n(t.getMonth()+1)}-${n(t.getDate())} ${n(t.getHours())}:${n(t.getMinutes())}`}var Ep={Read:"\u{1F4D6}",Edit:"\u270E",MultiEdit:"\u270E",Write:"\u{1F4DD}",Bash:"\u26A1",Grep:"\u{1F50E}",Glob:"\u{1F50E}",Task:"\u{1F916}",Agent:"\u{1F916}",WebFetch:"\u{1F310}",WebSearch:"\u{1F310}"},Fb={command_execution:"\uBA85\uB839 \uC2E4\uD589",file_change:"\uD30C\uC77C \uBCC0\uACBD",mcp_call:"MCP \uD638\uCD9C",web_search:"\uC6F9 \uAC80\uC0C9",plan:"\uACC4\uD68D"},Bb=/^\s*([✓✗⊘])\s*(spec|impl|implementation|plan)\s*게이트\s*[—–-]\s*(\S+)\s+(APPROVE|REVISE|REJECT|BLOCK|SKIP)(?:\s*·\s*(.+))?/,Ub=/^\s*#{0,3}\s*Phase\s+\d+(?:\s*\/\s*\d+)?\s*(?:[·:—–-]\s*.+)?$/;function Bn(e){return!!e&&typeof e=="object"}function Ll(e){return typeof e!="string"||e.length===0?[]:e.split(/\r?\n/)}function Dl(e,t){let n=Ll(e),r=Ll(t),o=new Map;for(let l of n)o.set(l,(o.get(l)||0)+1);let i=0;for(let l of r){let a=o.get(l)||0;a>0?o.set(l,a-1):i+=1}let s=0;for(let l of o.values())s+=l;return{added:i,removed:s}}function Tp(e){let t="";typeof e=="string"?t=e:Array.isArray(e)?t=e.map(o=>Bn(o)&&typeof o.text=="string"?o.text:"").join(""):Bn(e)&&typeof e.text=="string"&&(t=e.text);let r=(String(t).split(/\r?\n/).find(o=>o.trim().length>0)||"").trim();return r.length>120?`${r.slice(0,117)}\u2026`:r}function Wb(e){let t=String(e.name||""),n=e.input||{},r={kind:"tool",tool:t,icon:Ep[t]||"\u{1F527}",input:n,expandable:!0};if((t==="Read"||t==="Write")&&(r.path=String(n.file_path||n.path||"")),t==="Write"&&(r.added=Ll(n.content).length),t==="Edit"){r.path=String(n.file_path||n.path||"");let{added:o,removed:i}=Dl(n.old_string,n.new_string);r.added=o,r.removed=i}if(t==="MultiEdit"){r.path=String(n.file_path||n.path||"");let o=0,i=0,s=Array.isArray(n.edits)?n.edits:[];for(let l of s){let a=Dl(Bn(l)?l.old_string:"",Bn(l)?l.new_string:"");o+=a.added,i+=a.removed}r.added=o,r.removed=i}return t==="Bash"&&(r.command=String(n.command||"")),(t==="Grep"||t==="Glob")&&(r.command=String(n.pattern||n.query||"")),t==="Agent"&&(typeof e.id=="string"&&e.id.length>0&&(r.launch_id=e.id),typeof n.description=="string"&&(r.command=n.description)),r}function Pl(e){return typeof e!="string"||e.trim().length===0?null:{kind:"thinking",text:e}}var zb=/<system-reminder>[\s\S]*?<\/system-reminder>/g;function Cp(e){let t;if(typeof e=="string")t=e;else if(Array.isArray(e))t=e.filter(r=>Bn(r)&&r.type==="text"&&typeof r.text=="string").map(r=>String(r.text)).join(`
`);else return null;let n=t.replace(zb,"").trim();return n.length>0?{kind:"user",text:n}:null}function Ml(e){let t=e.split(/\r?\n/).find(r=>r.trim().length>0)||"",n=Bb.exec(t);return n?{kind:"gate",gate:n[2]==="implementation"?"impl":n[2],reviewer:n[3],verdict:n[4],time:n[5]?n[5].trim():void 0,text:t.trim()}:Ub.test(t)&&t.trim().length<=80?{kind:"phase",text:t.trim()}:{kind:"assistant",text:e}}function Hb(e,t){if(e.subtype==="init"){let n=typeof e.model=="string"?e.model:"";return t.progress=null,[{kind:"thinking",text:n?`\uC138\uC158 \uC2DC\uC791 \xB7 ${n}`:"\uC138\uC158 \uC2DC\uC791"}]}if(e.subtype==="thinking_tokens"){let r=`\uC0DD\uAC01 \uC911\u2026 ${typeof e.estimated_tokens=="number"&&Number.isFinite(e.estimated_tokens)?Math.max(0,Math.round(e.estimated_tokens)):0} \uD1A0\uD070`;return t.progress?(t.progress.text=r,[]):(t.progress={kind:"thinking",text:r},[t.progress])}return[]}function Kb(e,t){let n=typeof e.parent_tool_use_id=="string"&&e.parent_tool_use_id.length>0?e.parent_tool_use_id:null;if(e.type==="assistant"){let r=e.message,o=r&&Array.isArray(r.content)?r.content:[],i=[];for(let s of o)if(Bn(s)){if(s.type==="text"&&typeof s.text=="string")i.push(Ml(s.text));else if(s.type==="thinking"){let l=Pl(s.thinking);l&&i.push(l)}else if(s.type==="tool_use"){let l=Wb(s);typeof s.id=="string"&&t.set(s.id,l),i.push(l)}}return n?Sp(i,n):i}if(e.type==="user"){let r=e.message,o=r&&Array.isArray(r.content)?r.content:[];for(let s of o)if(Bn(s)&&s.type==="tool_result"){let l=t.get(String(s.tool_use_id));if(l){let a=Tp(s.content);l.result=a,l.output=typeof s.content=="string"?s.content:a,s.is_error===!0&&(l.is_error=!0)}}let i=Cp(r&&r.content);return i?[i]:[]}if(e.type==="result"){let r=e.is_error===!1&&e.subtype==="success",o={kind:"result",success:r,text:typeof e.result=="string"?e.result:r?"DONE":""};return n?Sp([o],n):[o]}return[]}function Sp(e,t){for(let n of e)n.parent_tool_use_id=t;return e}function Gb(e){let t=typeof e.command=="string"?e.command:"",n=Tp(e.aggregated_output===void 0?e.output:e.aggregated_output),o=[typeof e.exit_code=="number"&&Number.isFinite(e.exit_code)?`exit ${e.exit_code}`:typeof e.status=="string"&&e.status.length>0?e.status:"",n].filter(s=>s.length>0).join(" \xB7 "),i={kind:"tool",tool:"shell",icon:Ep.Bash,command:t,input:{command:t},expandable:!0};return o.length>0&&(i.result=o),typeof e.aggregated_output=="string"&&(i.output=e.aggregated_output),i}function Yb(e){if(e.type==="item.completed"&&Bn(e.item)){let t=e.item;if(t.type==="agent_message"&&typeof t.text=="string")return[Ml(t.text)];if(t.type==="user_message"){let n=Cp(t.text);return n?[n]:[]}if(t.type==="reasoning"){let n=Pl(t.text);return n?[n]:[]}return t.type==="error"?[{kind:"error",text:String(t.message||"")}]:t.type==="command_execution"?[Gb(t)]:[]}if(e.type==="turn.completed")return[{kind:"result",success:!0,text:"DONE"}];if(e.type==="turn.failed"){let t=e.error;return[{kind:"error",text:t&&typeof t.message=="string"?t.message:"turn failed"}]}return e.type==="error"?[{kind:"error",text:String(e.message||"")}]:[]}function Vb(e){if(e.schema!=="codex-delegation-monitor-v1"||!Bn(e.event))return[];let t=e.event;if(t.type==="session.started"||t.type==="turn.started")return[];if((t.type==="item.started"||t.type==="item.completed")&&Bn(t.item)){let n=t.item;if(typeof n.id!="string"||n.id.length===0)return[];if(t.type==="item.completed"&&n.kind==="agent_message"&&typeof n.text=="string"&&n.text.trim().length>0)return[Ml(n.text)];if(t.type==="item.completed"&&n.kind==="reasoning"){let s=Pl(n.text);return s?[s]:[]}if(t.type!=="item.completed"||n.kind!=="activity"||typeof n.activity!="string")return[];let r=Fb[n.activity];if(!r)return[];let o,i;if(n.status==="completed")o="\uC644\uB8CC",i="\u2713";else if(n.status==="failed")o="\uC2E4\uD328",i="\u2717";else return[];return[{kind:"tool",tool:`${r} \xB7 ${o}`,icon:i,expandable:!1,result:""}]}return t.type==="turn.completed"&&t.status==="completed"?[{kind:"result",success:!0,text:"DONE"}]:t.type==="turn.failed"&&(t.status==="failed"||t.status==="interrupted")&&typeof t.error_code=="string"&&t.error_code.length>0?[{kind:"error",text:t.error_code}]:[]}function Qb(e){let t=e.type;return typeof t=="string"&&(t==="error"||t.startsWith("thread.")||t.startsWith("turn.")||t.startsWith("item."))}function Xb(e){let t=e;if(typeof e=="string"){let n=e.trim();if(n.length===0)return null;try{t=JSON.parse(n)}catch{return null}}return Bn(t)?t:null}function Op(e={}){let t=e.skip_delegated===!0,n=new Map,r={progress:null};return{push(o){let i=Xb(o);if(!i)return[];if(t&&typeof i.parent_tool_use_id=="string"&&i.parent_tool_use_id.length>0)return[];if(i.type==="system"&&i.schema!=="codex-delegation-monitor-v1")return Hb(i,r);let s=i.schema==="codex-delegation-monitor-v1"?Vb(i):Qb(i)?Yb(i):Kb(i,n);return s.length>0&&(r.progress=null),s}}}function ql(e){let t=[],n=Op(),r=Array.isArray(e)?e:[];for(let o of r)for(let i of n.push(o))t.push(i);return t}var Zb=5,Jb=10,ey=/Task\s+#(\d+)/,ty=/\bgh\s+pr\s+create\b|\bgit\s+push\b/,ny=/\bnpm\s+(?:run\s+)?(?:test|tsc|lint|build)\b|\bvitest\b/;function ys(e){return typeof e!="string"?"":(e.split(/\r?\n/).find(t=>t.trim().length>0)||"").trim()}function ry(e){return typeof e!="string"||e.length===0?0:e.split(/\r?\n/).length}function oy(e){for(let t=e.length-1;t>=0;t-=1){let n=e[t];if(n.kind==="phase"||n.kind==="gate")return n.text||null}return null}function sy(e){let t=new Map,n=0;for(let o of e){if(o.kind!=="tool")continue;n+=1;let i=o.input||{};if(o.tool==="TaskCreate"){let a=ey.exec(o.output||o.result||""),u=String(i.activeForm||i.subject||"").trim();if(!a||u.length===0)continue;t.set(a[1],{label:u,active:i.status==="in_progress"?n:0});continue}if(o.tool!=="TaskUpdate")continue;let s=t.get(String(i.taskId??""));if(!s)continue;let l=i.activeForm||i.subject;typeof l=="string"&&l.trim().length>0&&(s.label=l.trim()),typeof i.status=="string"&&(s.active=i.status==="in_progress"?n:0)}let r=null;for(let o of t.values())o.active>0&&(!r||o.active>r.active)&&(r=o);return r?r.label:null}function iy(e){if(e.tool==="Bash"){let t=e.command||"";return ty.test(t)?"~ PR/\uAC8C\uC2DC \uC911":ny.test(t)?"~ \uAC80\uC99D \uC911":null}return e.tool==="Edit"||e.tool==="Write"||e.tool==="MultiEdit"?"~ \uAD6C\uD604 \uC911":e.tool==="Read"||e.tool==="Grep"||e.tool==="Glob"?"~ \uD0D0\uC0C9 \uC911":null}function ay(e){let t=e.filter(o=>o.kind==="tool").slice(-Jb),n=new Map;t.forEach((o,i)=>{let s=iy(o);if(!s)return;let l=n.get(s)||{count:0,last:-1};l.count+=1,l.last=i,n.set(s,l)});let r=null;for(let[o,i]of n)(!r||i.count>r.count||i.count===r.count&&i.last>r.last)&&(r={label:o,count:i.count,last:i.last});return r?r.label:null}function ly(e){let t=oy(e);if(t)return{text:t,guess:!1};let n=sy(e);if(n)return{text:n,guess:!1};let r=ay(e);return r?{text:r,guess:!0}:null}function cy(e,t){if(typeof e!="number")return"";let n=Math.max(0,Math.floor((t-e)/1e3));return n<60?`${n}\uCD08 \uC804`:mn(e,t)}function xo(e,t={}){let{transport:n,sessionLogStore:r,onClose:o}=t,i=null,s=null,l=null,a=null,u=null,d=!1,p={},_=!0,m=new Set,y=new Set,C=null,R=null,V=!1,te=!1,W=!1,M=null,I=null;function L(){V=!1,te=!1,W=!1,M=null,I=null}async function U(ee){if(n){te=!0,W=!1,Re();try{let Q=await Promise.resolve(n("get-attempt-prompt",{attempt_id:ee,...u?{root_dir:u}:{}}));if(i!==ee)return;!Q||typeof Q!="object"||Array.isArray(Q)?W=!0:(M=Q,I=ee)}catch{i===ee&&(W=!0)}finally{i===ee&&(te=!1,Re())}}}function Y(){if(V=!V,V&&i&&I!==i){U(i);return}Re()}function q(){if(!V)return"";let ee=$o({loading:te,error:W});if(ee)return c`<div class="sv__prompt" data-seam="attempt-prompt">
        ${ee}
      </div>`;if(!M)return"";if(M.missing)return c`<div class="sv__prompt" data-seam="attempt-prompt">
        <div class="prompt-block__status">
          기록 없음 — 프롬프트 기록 이전에 실행된 attempt입니다
        </div>
      </div>`;let Q=zi(M.recorded_at);return c`<div class="sv__prompt" data-seam="attempt-prompt">
      ${Q?c`<div class="prompt-block__meta">${Q} 발송</div>`:""}
      ${typeof M.task_prompt=="string"?lr("\uACFC\uC5C5 (user)",M.task_prompt):""}
      ${typeof M.system_prompt=="string"?lr("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",M.system_prompt):""}
    </div>`}function N(){if(!a||!r)return[];let ee=r.get(a);return ql(ee?ee.lines:[])}function z(){if(!a||!r)return null;let ee=r.get(a),Q=ee?ee.last_event_at:null;return typeof Q=="number"?Q:null}function G(){return p.status==="running"}function oe(){if(G()&&i){R||(R=setInterval(()=>Re(),1e3));return}ye()}function ye(){R&&(clearInterval(R),R=null)}function Me(ee){let Q=[],xe=0;for(;xe<ee.length;){let{idx:mt,line:ft}=ee[xe];if(ft.kind==="tool"){let Ke=xe;for(;Ke<ee.length&&ee[Ke].line.kind==="tool"&&ee[Ke].line.tool===ft.tool;)Ke+=1;if(Ke-xe>=Zb&&!y.has(mt)){Q.push({kind:"group",idx:mt,tool:ft.tool||"",lines:ee.slice(xe,Ke)}),xe=Ke;continue}}Q.push({kind:"line",idx:mt,line:ft}),xe+=1}return Q}function F(ee){let Q=[],xe=new Map;for(let Ke=0;Ke<ee.length;Ke+=1){let Je=ee[Ke],A=Je.parent_tool_use_id;if(typeof A=="string"&&A.length>0){let Z=xe.get(A);Z||(Z={kind:"subagent",idx:Ke,launch_id:A,agent_type:null,header:null,lines:[]},xe.set(A,Z),Q.push(Z)),Z.lines.push({idx:Ke,line:Je});continue}if(Je.kind==="tool"&&Je.tool==="Agent"&&typeof Je.launch_id=="string"&&Je.launch_id.length>0){let Z=X(Je),Ie=xe.get(Je.launch_id);if(Ie){Ie.header={idx:Ke,line:Je},Ie.agent_type=Z;continue}let Ge={kind:"subagent",idx:Ke,launch_id:Je.launch_id,agent_type:Z,header:{idx:Ke,line:Je},lines:[]};xe.set(Je.launch_id,Ge),Q.push(Ge);continue}Q.push({kind:"entry",idx:Ke,line:Je})}let mt=[],ft=0;for(;ft<Q.length;){if(Q[ft].kind!=="entry"){mt.push(Q[ft]),ft+=1;continue}let Ke=ft;for(;Ke<Q.length&&Q[Ke].kind==="entry";)Ke+=1;mt.push(...Me(Q.slice(ft,Ke))),ft=Ke}return mt}function X(ee){let Q=ee.input;return Q&&typeof Q.subagent_type=="string"?Q.subagent_type:null}function Ae(ee){for(let Q=ee.length-1;Q>=0;Q-=1){let xe=ee[Q];if(xe.kind==="result"||xe.kind==="error")return null;if(xe.kind==="tool"&&!Object.hasOwn(xe,"result"))return xe}return null}function Ee(ee){for(let Q=ee.length-1;Q>=0;Q-=1)if(ee[Q].kind==="thinking")return ee[Q];return null}function O(ee,Q){if(Q.kind==="gate")return c`<div class="sv__gate">${Q.text}</div>`;if(Q.kind==="phase")return c`<div class="sv__phase">${Q.text}</div>`;if(Q.kind==="result")return c`<div
        class="sv__result${Q.success?" sv__result--ok":" sv__result--fail"}"
      >
        <span class="sv__result-glyph">${Q.success?"\u2713":"\u2717"}</span>
        <span class="sv__result-body"
          >${vr(Q.text||(Q.success?"DONE":"\uC2E4\uD328"))}</span
        >
      </div>`;if(Q.kind==="thinking"){let xe=m.has(ee);return c`<div
        class="sv__think${xe?" sv__think--expanded":""}"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>dt(ee)}
      >
        <span class="sv__think-line">💭 ${ys(Q.text)}</span>
        ${xe?c`<pre class="sv__think-expand">${Q.text}</pre>`:""}
      </div>`}if(Q.kind==="user"){let xe=m.has(ee);return c`<div
        class="sv__line sv__line--user${xe?" sv__line--expanded":""}"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>dt(ee)}
      >
        <span class="sv__user-line">▷ ${ys(Q.text)}</span>
        ${xe?c`<pre class="sv__user-expand">${Q.text}</pre>`:""}
      </div>`}if(Q.kind==="error")return c`<div class="sv__error">⛔ ${Q.text}</div>`;if(Q.kind==="blocker")return c`<div class="sv__error">⛔ ${Q.text}</div>`;if(Q.kind==="tool"){let xe=m.has(ee),mt=Q.tool==="Bash"?ry(Q.command):0,ft=Q.tool==="Bash"?mt>1?ys(Q.command):Q.command:Q.path||Q.command||"";return c`<div
        class="sv__tool${xe?" sv__tool--expanded":""}"
        role="button"
        tabindex="0"
        @click=${()=>dt(ee)}
      >
        <span class="sv__tool-line">
          <span class="sv__tool-icon">${Q.icon}</span>
          <span class="sv__tool-name">${Q.tool}</span>
          ${ft?c`<span class="sv__tool-detail">${ft}</span>`:""}
          ${mt>1?c`<span class="sv__tool-more">⋯ ${mt}줄</span>`:""}
          ${typeof Q.added=="number"?c`<span class="sv__diff-add">+${Q.added}</span>`:""}
          ${typeof Q.removed=="number"?c`<span class="sv__diff-del">−${Q.removed}</span>`:""}
          ${Q.result?c`<span class="sv__tool-ok">→ ${Q.result}</span>`:""}
        </span>
        ${xe?c`<pre class="sv__tool-expand">${se(Q)}</pre>`:""}
      </div>`}return c`<div class="sv__as">${vr(Q.text||"")}</div>`}function se(ee){let Q=[];if(ee.tool==="Bash"&&typeof ee.command=="string"&&ee.command.length>0)Q.push(ee.command);else if(ee.input!==void 0)try{Q.push(`input: ${JSON.stringify(ee.input,null,2)}`)}catch{}return typeof ee.output=="string"&&ee.output.length>0&&Q.push(`output:
${ee.output}`),Q.join(`

`)}function be(){if(!i)return c``;let ee=N(),Q=(s?[p.agent_type,p.model,p.effort]:[p.runner,p.model,p.effort]).filter(Boolean).join(" \xB7 "),xe=p.session_id||"",mt=`\uB77C\uC774\uBE0C \uB530\uB77C\uAC00\uAE30 ${_?"ON":"OFF"}`,ft=G(),Ke=ft?cy(z(),Date.now()):"",Je=ft?Ae(ee):null,A=ft?Ee(ee):null,Z=ly(ee);return c`<div class="sv" data-attempt-id=${i}>
      <div class="sv__bar">
        <span class="sv__id"
          >${p.label||(s?p.role||"":i)}</span
        >
        ${Z?c`<span
              class="sv__stage${Z.guess?" sv__stage--guess":""}"
              title=${Z.text}
              >${Z.text}</span
            >`:""}
        ${ft?c`<span
              class="sv__live"
              title="세션이 진행 중입니다"
              aria-label=${Ke?`\uC9C4\uD589 \uC911 \xB7 \uB9C8\uC9C0\uB9C9 \uC774\uBCA4\uD2B8 ${Ke}`:"\uC9C4\uD589 \uC911"}
              ><span class="sv__live-dot" aria-hidden="true"></span>${Ke?c`<span class="sv__live-ago">${Ke}</span>`:""}</span
            >`:""}
        ${xe?c`<button
              type="button"
              class="sv__session"
              title=${xe}
              aria-label=${`\uC138\uC158 ID \uBCF5\uC0AC: ${xe}`}
              @click=${()=>J(xe)}
            >
              ⧉ ${xe.slice(0,8)}
            </button>`:""}
        ${p.resume_command?c`<button
              type="button"
              class="sv__resume-cmd"
              title=${p.resume_command}
              aria-label=${`\uC7AC\uAC1C \uBA85\uB839 \uBCF5\uC0AC: ${p.resume_command}`}
              @click=${()=>J(p.resume_command||"")}
            >
              ⧉ 재개 명령
            </button>`:""}
        ${Q?c`<span class="sv__meta">${Q}</span>`:""}
        ${p.worktree?c`<span class="sv__wt" title=${p.worktree}
              >${p.worktree}</span
            >`:""}
        ${s||d?"":c`<button
              type="button"
              class="sv__prompt-toggle${V?" sv__prompt-toggle--on":""}"
              data-seam="attempt-prompt-toggle"
              aria-pressed=${V?"true":"false"}
              aria-label="발송 프롬프트 보기"
              title="이 세션에 실제로 보낸 시스템·과업 프롬프트"
              @click=${Y}
            >
              ✉ 프롬프트
            </button>`}
        <button
          type="button"
          class="sv__follow${_?" sv__follow--on":""}"
          aria-pressed=${_?"true":"false"}
          aria-label=${mt}
          @click=${H}
        >
          <span class="sv__follow-full">⇣ ${mt}</span>
          <span class="sv__follow-short">⇣ ${_?"ON":"OFF"}</span>
        </button>
        <button
          type="button"
          class="sv__close"
          aria-label="닫기"
          @click=${()=>He()}
        >
          ✕
        </button>
      </div>
      ${s||d?"":q()}
      <div class="sv__body">
        ${ee.length===0?c`<div class="sv__empty">세션 로그 없음</div>`:F(ee).map(Ie=>Ie.kind==="subagent"?Pe(Ie):Ie.kind==="group"?ve(Ie):O(Ie.idx,Ie.line))}
      </div>
      ${Je||A?c`<div class="sv__now">
            <span class="sv__now-label">지금</span>
            ${Je?c`<span class="sv__now-icon">${Je.icon}</span>
                  <span class="sv__now-name">${Je.tool}</span>
                  <span class="sv__now-detail"
                    >${Je.tool==="Bash"?ys(Je.command):Je.path||Je.command||""}</span
                  >`:""}
            ${A?c`<span class="sv__now-think"
                  >💭 ${ys(A.text)}</span
                >`:""}
          </div>`:""}
    </div>`}function ve(ee){return c`<div
      class="sv__group"
      role="button"
      tabindex="0"
      title="펼치기"
      @click=${()=>he(ee.idx)}
    >
      <span class="sv__group-icon">${ee.lines[0].line.icon}</span>
      <span class="sv__group-name">${ee.tool}</span>
      <span class="sv__group-count">${ee.lines.length}</span>
      <span class="sv__group-caret" aria-hidden="true">▸</span>
    </div>`}function Pe(ee){let Q=y.has(ee.idx),xe=ee.header?ee.header.line:null,mt=xe?xe.is_error===!0?"\u2717":typeof xe.result=="string"?"\u2713":"\u27F3":"",ft=xe&&xe.command?xe.command:"";return c`<div class="sv__sub${Q?" sv__sub--open":""}">
      <div
        class="sv__sub-head"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>he(ee.idx)}
      >
        <span class="sv__sub-icon" aria-hidden="true">🤖</span>
        <span class="sv__sub-name">${ee.agent_type||"subagent"}</span>
        ${ft?c`<span class="sv__sub-detail">${ft}</span>`:""}
        <span class="sv__sub-count">${ee.lines.length}줄</span>
        ${mt?c`<span class="sv__sub-state">${mt}</span>`:""}
        ${Q?"":c`<span class="sv__sub-caret" aria-hidden="true">▸</span>`}
      </div>
      ${Q?c`<div class="sv__sub-body">
            ${Me(ee.lines).map(Ke=>Ke.kind==="group"?ve(Ke):O(Ke.idx,Ke.line))}
          </div>`:""}
    </div>`}function he(ee){y.add(ee),Re()}function Re(){pt(be(),e),oe(),_&&Xe()}function Xe(){let ee=e.querySelector(".sv__body");ee&&(ee.scrollTop=ee.scrollHeight)}function dt(ee){m.has(ee)?m.delete(ee):m.add(ee),Re()}function H(){_=!_,Re()}function J(ee){gn(ee).then(Q=>{Q?me("\uBCF5\uC0AC\uB428","success",1200):me("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function re(ee){!i||!ee||(p={...p,...ee},Re())}function fe(ee){let Q=ee.target;if(!Q||!Q.classList||!Q.classList.contains("sv__body"))return;!(Q.scrollHeight-Q.scrollTop-Q.clientHeight<=4)&&_&&(_=!1,Re())}e.addEventListener("scroll",fe,!0);function Se(ee){let Q=ee.target;!Q||typeof Q.closest!="function"||e.contains(Q)||Q.closest("dialog")||Q.closest(".md-viewer-root")||He()}let _e=!1;function qe(){_e||(document.addEventListener("mousedown",Se),_e=!0)}function Fe(){_e&&(document.removeEventListener("mousedown",Se),_e=!1)}function Ve(ee){let Q=ee&&ee.attempt_id;if(!Q)return;let xe=typeof ee.launch_id=="string"&&ee.launch_id.length>0?ee.launch_id:null,mt=ee.session_ref&&typeof ee.session_ref=="object"?ee.session_ref:null;if(xe&&mt)return;let ft=a;i=Q,s=xe,l=mt,a=s?`session-log:${i}:${s}`:`session-log:${i}`,n&&ft&&ft!==a&&Promise.resolve(n("unsubscribe-session-log",{id:ft})).catch(()=>{}),u=typeof ee.root_dir=="string"&&ee.root_dir.length>0?ee.root_dir:null,p=ee.meta||{},d=ee.hide_prompt===!0,_=!0,m.clear(),y.clear(),L(),!C&&r&&(C=r.subscribe(Re)),n&&Promise.resolve(n("subscribe-session-log",{id:a,attempt_id:i,...s?{launch_id:s}:{},...l?{session_ref:l}:{},...u?{root_dir:u}:{}})).catch(()=>{}),qe(),Re()}function He(){let ee=a;Fe(),i=null,s=null,l=null,a=null,u=null,d=!1,m.clear(),y.clear(),L(),ye(),n&&ee&&Promise.resolve(n("unsubscribe-session-log",{id:ee})).catch(()=>{}),pt(c``,e),o&&o()}return{open:Ve,updateMeta:re,close:He,isOpen(){return i!==null},destroy(){ye(),Fe(),C&&(C(),C=null),e.removeEventListener("scroll",fe,!0),i=null,s=null,l=null,a=null,u=null,d=!1,pt(c``,e)}}}function uy(e){let t=[],n=e?.workflow?.stages,r=n?.spec?.doc;r&&t.push({kind:"spec",path:r.path,missing_state:r.missing_state});let o=n?.plan?.doc;return o&&t.push({kind:"plan",path:o.path,missing_state:o.missing_state}),t}function Rp(e,t){let n=uy(e);return c`
    <div class="detail-section-label">Artifacts</div>
    ${n.length===0?c`<div class="detail-empty">산출물 없음</div>`:c`
          ${n.map(r=>c`<div class="detail-art">
                <span class="detail-art__ic" aria-hidden="true">▤</span>
                <button
                  type="button"
                  class="detail-art__path"
                  title=${`${r.path} \xB7 \uD074\uB9AD\uD558\uBA74 \uBCF5\uC0AC`}
                  @click=${o=>t.onCopyPath(o,r.path)}
                >
                  ${r.path}
                </button>
                ${r.missing_state==="spec_draft"?c`<span class="detail-art__badge">draft</span>`:null}
                <button
                  type="button"
                  class="detail-art__op"
                  @click=${o=>t.onOpenDoc(o,r.path,r.missing_state)}
                >
                  열기
                </button>
              </div>`)}
          <div class="detail-art__cap">경로 클릭 = 복사 · 열기 = 뷰어</div>
        `}
  `}var dy="## \u{1F916} \uC791\uC5C5 \uBCF4\uACE0\uC11C",py=/^> (worker · attempt|session · sid) ([A-Za-z0-9._-]{1,64}) · (\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z)$/,fy=/^\*\*결론\*\* — (.+)$/;function Hi(e){if(typeof e!="string"||e.length===0)return null;let t=e.split(/\r?\n/);if(t[0]!==dy)return null;let n=py.exec(t[1]||"");if(!n)return null;let r=n[1].split(" ")[0],o=n[2],i=n[3],s=2;for(;s<t.length&&t[s].trim().length===0;)s+=1;let l=s<t.length?fy.exec(t[s]):null,a=l?l[1].replace(/\s+/g," ").trim():"",u=l?s+1:s;return{lane:r,identifier:o,timestamp:i,conclusion:a,body:t.slice(u).join(`
`).trim()}}var Ip=20;function Lp(e){if(e==null||e==="")return"";let t=new Date(e);if(Number.isNaN(t.getTime()))return"";let n=String(t.getMonth()+1).padStart(2,"0"),r=String(t.getDate()).padStart(2,"0"),o=String(t.getHours()).padStart(2,"0"),i=String(t.getMinutes()).padStart(2,"0");return`${n}-${r} ${o}:${i}`}function _y(e){return e.length>Ip?`${e.slice(0,Ip)}\u2026`:e}function my(e,t,n,r){let o=`${t.lane} ${_y(t.identifier)}`;return c`<div class="detail-report">
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
          >${o}</span
        >
        <span class="detail-report__time">${Lp(t.timestamp)}</span>
      </span>
      <span class="detail-report__concl">${t.conclusion}</span>
    </button>
    ${r&&t.body.length>0?c`<div class="detail-report__body">
          ${vr(t.body)}
        </div>`:""}
  </div>`}function gy(e){return c`<div class="detail-comment" data-comment-id=${e.id}>
    <div class="detail-comment__meta">
      <span class="detail-comment__author"
        >${e.author||"(\uC791\uC131\uC790 \uC5C6\uC74C)"}</span
      >
      <span class="detail-comment__time"
        >${Lp(e.created_at)}</span
      >
    </div>
    <div class="detail-comment__body">
      ${vr(typeof e.text=="string"?e.text:"")}
    </div>
  </div>`}function Dp(e,t={},n={}){let r=Array.isArray(e)?e.filter(Boolean):[],o=n.expanded||new Set,i=typeof n.draft=="string"?n.draft:"",s=n.sending===!0,l=r.slice().sort((a,u)=>String(u.created_at||"").localeCompare(String(a.created_at||"")));return c`
    <div class="detail-section-label">댓글 (${r.length})</div>
    ${n.error?c`<div class="detail-empty" data-seam="comments-error">
          댓글을 불러오지 못했습니다
        </div>`:l.length===0?c`<div class="detail-empty" data-seam="comments">댓글 없음</div>`:c`<div class="detail-comments" data-seam="comments">
            ${l.map(a=>{let u=Hi(typeof a.text=="string"?a.text:"");return u?my(a,u,t,o.has(a.id)):gy(a)})}
          </div>`}
    <div class="detail-comment-compose">
      <textarea
        class="detail-comment-compose__input"
        aria-label="댓글 추가"
        placeholder="댓글 추가"
        rows="3"
        ?disabled=${s}
        .value=${i}
        @input=${a=>t.onDraftInput&&t.onDraftInput(a.target.value)}
      ></textarea>
      <div class="detail-comment-compose__row">
        <button
          type="button"
          class="detail-comment-compose__btn"
          ?disabled=${s||i.trim().length===0}
          @click=${()=>t.onSubmit&&t.onSubmit()}
        >
          댓글 추가
        </button>
      </div>
    </div>
  `}var{I:nA}=fc;var Pp=e=>e.strings===void 0;var hy={},Mp=(e,t=hy)=>e._$AH=t;var kr=Mi(class extends wo{constructor(e){if(super(e),e.type!==ir.PROPERTY&&e.type!==ir.ATTRIBUTE&&e.type!==ir.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!Pp(e))throw Error("`live` bindings can only contain a single expression")}render(e){return e}update(e,[t]){if(t===Tn||t===Yt)return t;let n=e.element,r=e.name;if(e.type===ir.PROPERTY){if(t===n[r])return Tn}else if(e.type===ir.BOOLEAN_ATTRIBUTE){if(!!t===n.hasAttribute(r))return Tn}else if(e.type===ir.ATTRIBUTE&&n.getAttribute(r)===t+"")return Tn;return Mp(e),t}});var by=[{id:"spec",label:"spec \uB9AC\uBDF0",receipt:"spec_review",receipt_stage:null,fill_stage:"spec",stale_stage:"spec",hue:"spec"},{id:"plan",label:"\uACC4\uD68D \uB9AC\uBDF0",receipt:null,receipt_stage:"plan",fill_stage:"plan",stale_stage:"plan",hue:"plan"},{id:"impl",label:"\uAD6C\uD604",receipt:null,receipt_stage:null,fill_stage:"impl",stale_stage:null,hue:"impl"},{id:"impl_review",label:"impl \uB9AC\uBDF0",receipt:"impl_review",receipt_stage:null,fill_stage:null,stale_stage:"impl",hue:"impl"},{id:"pr",label:"PR",receipt:null,receipt_stage:null,fill_stage:"pr",stale_stage:null,hue:"pr"}],Nl={quick_fix:["impl","impl_review"],spec_backed:["spec","impl","impl_review","pr"],full_plan:["spec","plan","impl","impl_review","pr"]},qp={missing:"\uC2B9\uC778 \uD544\uC694",stale:"\uC7AC\uC2B9\uC778 \uD544\uC694",unknown:"\uC2B9\uC778 \uD655\uC778 \uBD88\uAC00"},yy={pin:"pin",global:"global",base:"base"};function vy(e){return c`<span
    class=${`detail-layer-rail detail-layer-rail--${yy[e]}`}
    data-source=${e}
    aria-hidden="true"
    ><i></i><i></i><i></i
  ></span>`}function ky(e,t,n){switch(e){case"workflow_mode":return jo;case"spec_review_model":case"impl_review_model":return Fo;case"plan_review_model":return ei;case"spec_review_effort":case"plan_review_effort":case"impl_review_effort":return ti;case"spec_review_speed":case"plan_review_speed":case"impl_review_speed":return Yn;case"impl_dispatch":return No;case"impl_runtime":return Js;case"impl_model":return _o(n,t.impl_runtime);case"impl_effort":return Pr(n,t.impl_runtime,t.impl_model);case"impl_speed":case"orchestration_speed":return Yn;case"orchestration_model":return mo(n,null);case"orchestration_effort":return Pr(n,void 0,t.orchestration_model||$n).filter(r=>r!==$n);default:return[]}}function wy(e,t){return c`<div class="detail-effective__row" data-key=${e.key}>
    ${vy(e.source)}
    <span class="detail-effective__k"
      >${mr[e.key]||e.key}</span
    >
    <span
      class=${`detail-effective__v${e.source==="base"?" detail-effective__v--dim":""}`}
      title=${e.full_value||""}
      >${e.display}</span
    >
    <span
      class=${`detail-effective__badge detail-effective__badge--${e.source}`}
      >${ri[e.source]}</span
    >
    ${t.expanded?c`<select
          class="detail-effective__edit"
          data-edit-key=${e.key}
          aria-label=${`${mr[e.key]||e.key} \uD3B8\uC9D1`}
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
  </div>`}function Np(e,t){let n=ja.flatMap(a=>a.keys),r=Fa(n,e.metadata,e.workspace_values,e.execution_defaults,e.catalog,e.controller_runtime||null),o=Pu(n,e.metadata,e.workspace_values,e.execution_defaults,e.catalog,e.controller_runtime||null),i=Object.fromEntries(r.map(a=>[a.key,a])),s=Object.fromEntries(r.filter(a=>a.value!==null).map(a=>[a.key,a.value])),l=r.filter(a=>a.full_value&&a.display!==a.full_value).map(a=>a.full_value).join(" \xB7 ");return c`<details
    class=${`detail-effective${e.expanded?" detail-effective--open":""}`}
    data-seam="effective-settings"
    ?open=${e.expanded}
    @toggle=${a=>t.onToggle(a.currentTarget.open)}
  >
    <summary
      class="detail-effective__head"
      data-seam="effective-settings-toggle"
      @click=${a=>{a.preventDefault();let u=a.currentTarget.parentElement;t.onToggle(!u.open)}}
    >
      <span class="detail-effective__t">유효 실행 설정</span>
      <span class="detail-effective__summary" title=${l}
        >${$y(i)}</span
      >
      <span class="detail-effective__counts">
        <span class="detail-effective__count detail-effective__count--pin"
          >핀 ${o.pin}</span
        >
        <span class="detail-effective__count detail-effective__count--global"
          >전역 ${o.global}</span
        >
        <span class="detail-effective__count detail-effective__count--base"
          >기본 ${o.base}</span
        >
      </span>
      <span class="detail-effective__chev">▸</span>
    </summary>
    ${e.expanded?c`<div class="detail-effective__body">
          ${ja.map(a=>c`
              <div class="detail-effective__subhead">${a.label}</div>
              ${r.filter(u=>a.keys.includes(u.key)).map(u=>{let d=Ys({key:u.key,choices:ky(u.key,s,e.catalog),layer:"pin",pin:e.metadata,global:e.workspace_values,execution_defaults:e.execution_defaults,runner_catalog:e.catalog,route:typeof e.metadata?.route=="string"?e.metadata.route:null,controller_runtime:e.controller_runtime||null});return wy(u,{expanded:e.expanded,options:d.options,default_label:d.unset_label,default_full_value:d.full_value,onEdit:t.onEdit})})}
            `)}
          <div class="detail-effective__foot">
            <select
              data-impl-preset-select
              aria-label="실행 프리셋"
              .value=${kr(e.preset_id)}
              ?disabled=${e.preset_busy}
              @change=${a=>t.onPresetSelect(String(a.target.value))}
            >
              <option value="" ?selected=${e.preset_id===""}>
                실행 프리셋…
              </option>
              ${e.presets.map(a=>c`<option
                    value=${a.id}
                    ?selected=${a.id===e.preset_id}
                  >
                    ${a.name}${a.compatible===!1?" (\uBE44\uD638\uD658)":""}
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
              >세션 키 15개를 핀으로 기록</span
            >
            ${(e.skipped_orchestration_keys||[]).length>0?c`<span
                  class="detail-effective__hint"
                  data-preset-skip-notice
                  >오케스트레이션 3키는 Bead에 핀할 수 없어 건너뜀</span
                >`:""}
          </div>
        </div>`:""}
  </details>`}function $y(e){let t=[];if(e.workflow_mode&&t.push(e.workflow_mode.display),e.impl_dispatch?.value==="main")t.push("\uBA54\uC778");else if(e.impl_dispatch?.value==="delegated"){let n=e.impl_runtime?` ${e.impl_runtime.display}`:"";t.push(`\uC704\uC784${n}`)}for(let n of["impl_model","impl_effort","impl_speed"])e[n]?.resolution!=="not_applicable"&&t.push(e[n]?.display||"\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00");return t.join(" \xB7 ")}function xy(e){if(!e||typeof e!="object")return null;let{kind:t,actor:n,effort:r,sha:o}=e;return typeof t!="string"||typeof n!="string"||typeof o!="string"?null:{kind:t,actor:n,effort:typeof r=="string"?r:null,sha:o}}function jp(e,t={}){let n=e&&typeof e.metadata=="object"&&e.metadata?e.metadata:{},r=e&&typeof e.workflow=="object"&&e.workflow?e.workflow:{},o=r.stages||{},i=r.route||n.route||null,s=typeof n.pr_url=="string"?n.pr_url:"",l=typeof n.exec_receipt=="string"?n.exec_receipt:"",a=xy(r.exec_receipt),u=a?er(a):l,d=a?`${a.kind}:${a.actor}`:l.split("@")[0],p=Hs(r.planned_execution,r.exec_receipt),_=r.chips?.pr?.number,m=typeof _=="number"?`PR #${_}`:"PR",y=Uo(n),C=y!==null&&t.isChipOpen?.("rec")===!0,R=C?Xa({rec:y},"rec"):null;return c`<section class="detail-summary" data-seam="detail-summary">
    <div class="detail-summary__chips">
      <span class="detail-summary__chip detail-summary__chip--status"
        >${e?.status||"\u2014"}</span
      >
      ${i?c`<span class="detail-summary__chip detail-summary__chip--route"
            >${i}</span
          >`:""}
      ${n.workflow_mode==="fast_track"?c`<span class="detail-summary__chip detail-summary__chip--mode"
            >fast_track</span
          >`:""}
      ${s?c`<a
            class="detail-summary__chip detail-summary__chip--pr"
            href=${s}
            target="_blank"
            rel="noreferrer"
            >${m}</a
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
            >${d}${a?.effort?c`${" "}<span
                    class="detail-summary__chip-effort"
                    data-seam="exec-receipt-effort"
                    >${a.effort}</span
                  >`:""}</span
          >`:""}
      ${y?c`<button
            type="button"
            class="detail-summary__chip detail-summary__chip--rec judgement-chip"
            data-chip-key="rec"
            data-state=${y.state}
            aria-expanded=${C?"true":"false"}
            title=${ii(y)}
            @click=${()=>t.onChipToggle?.("rec")}
          >
            ${"\uBCF5\uC7A1"}
          </button>`:""}
    </div>
    ${R?uo(R):""}
    <div
      class="detail-summary__gates"
      role="group"
      aria-label="워크플로 게이트"
    >
      ${Ay(i).map(V=>Sy(V,n,o,{label:V.id==="pr"?m:V.label,href:V.id==="pr"?s:""}))}
    </div>
  </section>`}function Ay(e){let n=typeof e=="string"&&Object.hasOwn(Nl,e)&&Nl[e]||Nl.spec_backed;return by.filter(r=>n.includes(r.id))}var Ki={on:"\uD1B5\uACFC",stale:"\uC7AC\uAC80\uD1A0 \uD544\uC694",current:"\uC9C4\uD589 \uC911",none:"\uBBF8\uB3C4\uB2EC"};function Sy(e,t,n,r){let o=Ey(e,t,n),i=e.fill_stage?n[e.fill_stage]:null,s=typeof i?.fill=="string"?i.fill:null,l=s?s==="full":o.length>0,a=!l&&s==="dim",u=e.stale_stage?n[e.stale_stage]?.stale===!0:!1,d=o&&o.split("@")[1]?.slice(0,7)||"",p=u?Ki.stale:l?Ki.on:a?Ki.current:Ki.none,_=Ty(e,n),m=`${r.label} \xB7 ${p}${_?` \xB7 ${_}`:""}${o?` \xB7 ${o}`:""}`,y=`detail-summary__gate${l?" detail-summary__gate--on":""}${a?" detail-summary__gate--current":""}${u?" detail-summary__gate--stale":""}${d?" detail-summary__gate--receipt":""}`,C=c`<span class="detail-summary__gate-label"
      >${r.label}</span
    >
    <span class="detail-summary__gate-rail"></span>
    <span class="detail-summary__gate-sha">${d}</span>`;return r.href?c`<a
      class=${y}
      data-gate=${e.id}
      data-hue=${e.hue}
      href=${r.href}
      target="_blank"
      rel="noreferrer"
      title=${m}
      >${C}</a
    >`:c`<span
    class=${y}
    data-gate=${e.id}
    data-hue=${e.hue}
    title=${m}
    >${C}</span
  >`}function Ey(e,t,n){if(e.receipt&&typeof t[e.receipt]=="string")return String(t[e.receipt]);if(e.receipt_stage){let r=n[e.receipt_stage]?.receipt;return typeof r=="string"?r:""}return""}function Ty(e,t){if(e.id!=="plan")return"";let n=t.plan?.approval_state;return typeof n=="string"&&Object.hasOwn(qp,n)?qp[n]:""}function Gi(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function Fp(e){return Gi(e)&&typeof e.key=="string"&&e.key.length>0&&typeof e.email=="string"&&e.email.length>0}function Bp(e,t){let n=e&&e[t];if(!Gi(n)||!Array.isArray(n.accounts))return null;let r=n.accounts.filter(Fp),o=Fp(n.active)?n.active:null;return{accounts:r,active:o||r.find(i=>i.active===!0)||null}}function zp(e){return typeof e.alias=="string"&&e.alias.length>0?` (${e.alias})`:""}function Yi(e){let t=typeof e.status=="string"&&e.status!=="ok"?` \xB7 ${e.status}`:"";return`${e.email}${zp(e)}${t}`}function Ao(e){let t=typeof e.plan=="string"&&e.plan.length>0?e.plan:"plan \uD655\uC778 \uBD88\uAC00";return`${e.email} \xB7 ${t}${zp(e)}`}function Cy(e,t,n){if(n!==null){let o=e==="claude"?Yi:Ao,i=t?t.accounts.find(s=>s.key===n):void 0;return`\uB808\uD3EC \uAE30\uBCF8\uAC12 \uC0AC\uC6A9(${i?o(i):n})`}return t?t.active?`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(${e==="claude"?t.active.email:Ao({...t.active,alias:null})})`:"\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(\uD655\uC778 \uBD88\uAC00)":"(\uAE30\uBCF8)"}function Up(e,t){if(!Gi(e)||e.state!=="usable"||!Gi(e.values))return null;let n=e.values[t];return typeof n=="string"&&n.length>0?n:null}function Wp(e){let t=e.provider_key==="claude"?Yi:Ao,n=!!e.provider?.accounts.some(r=>r.key===e.selected);return c`<div class="detail-kv" data-exec-account-row=${e.key}>
    <span class="detail-kv__k">${e.title}</span>
    <span class="detail-kv__vgroup">
      <select
        class=${e.selected?"detail-kv__v detail-kv__v--sel":"detail-kv__v"}
        aria-label=${e.title}
        data-exec-key=${e.key}
        @change=${r=>e.handlers.onExecChange(e.key,r.target.value)}
      >
        <option value="" ?selected=${e.selected.length===0}>
          ${Cy(e.provider_key,e.provider,e.workspace_default)}
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
  </div>`}function Hp({md:e,catalog:t,workspace_defaults:n=null,handlers:r}){let o=typeof e.claude_account=="string"?e.claude_account:"",i=typeof e.codex_account=="string"?e.codex_account:"";return c`<section class="exec-accounts" data-exec-accounts>
    <div class="detail-section-label">실행 계정</div>
    <div class="exec-settings-core">
      ${Wp({key:"claude_account",title:"Claude \uACC4\uC815",provider_key:"claude",provider:Bp(t,"claude"),selected:o,workspace_default:Up(n,"claude_account"),handlers:r,hint:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uB7F0\uD0C0\uC784\uC774 claude\uC77C \uB54C \uC801\uC6A9\uB429\uB2C8\uB2E4"})}
      ${Wp({key:"codex_account",title:"Codex \uACC4\uC815",provider_key:"codex",provider:Bp(t,"codex"),selected:i,workspace_default:Up(n,"codex_account"),handlers:r})}
    </div>
  </section>`}function Oy(e){return String(e||"").replace(/^docs\/(superpowers\/)?/,"")}function Ry(e){let t=/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(e);if(!t)return{front:null,body:e};let n=t[1].trim();return{front:n.length>0?n:null,body:e.slice(t[0].length)}}function Vi(e,t){let n=t.getWorkspacePath,r=t.fetchImpl||globalThis.fetch?.bind(globalThis),o=null,i="loading",s="",l=null,a="";function u(C){C.key==="Escape"&&o&&(C.preventDefault(),m())}document.addEventListener("keydown",u);function d(){return o?c`
      <div class="mv-overlay" role="dialog" aria-modal="true">
        <div class="mv-overlay__backdrop" @click=${()=>m()}></div>
        <div class="mv">
          <div class="mv__bar">
            <span class="mv__path" title=${o}
              >${Oy(o)}</span
            >
            <button
              type="button"
              class="mv__close"
              aria-label="닫기"
              @click=${()=>m()}
            >
              ✕
            </button>
          </div>
          <div class="mv__body">
            ${i==="loading"?c`<div class="mv__status">불러오는 중…</div>`:i==="pending"?c`<div class="mv__status">${a}</div>`:i==="error"?c`<div class="mv__status mv__status--error">
                      ${a||"\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"}
                    </div>`:c`${l===null?null:c`<pre class="mv__front">
${l}</pre
                        >`}${vr(s)}`}
          </div>
        </div>
      </div>
    `:c``}function p(){pt(d(),e)}async function _(C,R={}){o=C,i="loading",s="",l=null,a="",p();let V=R.workspace||(n?n():"");if(!V){i="error",a="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4",p();return}if(!r){i="error",a="fetch\uB97C \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",p();return}let te="/api/doc?workspace="+encodeURIComponent(V)+"&path="+encodeURIComponent(C);try{let W=await r(te),M=await W.json().catch(()=>({}));if(!W.ok||!M||M.ok!==!0){if(M?.error==="not_found"&&R.missing_state==="plan_pending"){i="pending",a="\uACC4\uD68D \uC791\uC131 \uC804 \xB7 \uACBD\uB85C\uB9CC \uC608\uC57D\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4",p();return}i="error",a="\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 ("+String(M&&M.error||W.status)+")",p();return}let I=Ry(String(M.content||""));l=I.front,s=I.body,i="ready",p()}catch{i="error",a="\uBB38\uC11C \uC694\uCCAD \uC2E4\uD328",p()}}function m(){o=null,pt(c``,e)}function y(){document.removeEventListener("keydown",u),m()}return{open:_,close:m,destroy:y}}var Iy=[{key:"input_tokens",label:"\uC785\uB825"},{key:"output_tokens",label:"\uCD9C\uB825"},{key:"cache_read_input_tokens",label:"\uCE90\uC2DC \uC77D\uAE30"}],Yp="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4",Qi=[{role:"implementation",provider:"codex"},{role:"review-consult",provider:"codex"},{role:"subagent",provider:"claude"}],Ly=new Set(["codex-runner","Explore","Plan","advisor","advisor-xhigh","claude-code-guide","statusline-setup"]);function Kp(e){return typeof e=="string"&&Ly.has(e)}var Dy=["running","done","failed","interrupted"],Py={running:"\u25CF",done:"\u2713",failed:"\u2717",interrupted:"\u26A0"};function My(e){return typeof e=="number"&&Number.isFinite(e)?e:0}function qy(e){let t=un(e);if(t.length>0)return t.map(o=>c`<span class="detail-usage-total" title=${o.tooltip}
          >${o.label}</span
        >`);let n=lo(e);if(!n||!e)return"";let r=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?` \xB7 $${e.total_cost_usd.toFixed(2)}`:"";return c`<span
      class="detail-usage-total"
      title="이 이슈의 모든 attempt 토큰 합계 (입력+출력+캐시)"
      >${n.replace(/^τ /,"\u03C4 \uCD1D ")}${r}</span
    >${e.replayed?c`<span class="detail-usage-partial" title=${Yp}
          >부분 집계</span
        >`:""}`}function Gp(e){return!e||!e.roles.orchestrator?null:{providers:e.roles.orchestrator,roles:{}}}function Bl(e){if(typeof e=="number")return vs(e);if(typeof e!="string")return"";let t=Date.parse(e);return Number.isFinite(t)?vs(t):""}function Ny(e){return typeof e=="string"?e.replace(/-\d{8}$/,""):""}function Vp(e,t,n){if(e.provider!=="claude"){let o=e.session_id?` \xB7 thread ${e.session_id}`:"",i=n?" \xB7 \uC774\uC804 \uB77C\uC6B4\uB4DC \uC2A4\uB808\uB4DC \uC774\uC5B4\uAC10":"";return{text:`${n?"\u21A9 ":""}${e.launch_id}`,title:`${e.launch_id}${o}${i}`}}let r=t&&typeof t.agent_id=="string"?t.agent_id:"";return r.length>0?{text:r.slice(0,8),title:r}:{text:e.launch_id.slice(-8),title:e.launch_id}}function jl(e){return e===null||typeof e=="string"&&e.trim().length>0}function Fl(e){return e===null||typeof e=="number"&&Number.isFinite(e)}function jy(e){if(!e||typeof e!="object"||Array.isArray(e))return null;let t=e,n=t.provider==="claude";return typeof t.launch_id!="string"||t.launch_id.length===0||!Qi.some(r=>r.role===t.role&&r.provider===t.provider)||!(n?jl(t.model):typeof t.model=="string"&&t.model.length>0)||!(!("effort"in t)||jl(t.effort))||!(!("agent_type"in t)||jl(t.agent_type))||typeof t.session_id!="string"||t.session_id.length===0||!Dy.includes(t.status)||!(t.turn_id===null||typeof t.turn_id=="string")?null:n?!Fl(t.started_at)||!Fl(t.last_event_at)||!Fl(t.completed_at)?null:t:typeof t.started_at!="number"||!Number.isFinite(t.started_at)||typeof t.last_event_at!="number"||!Number.isFinite(t.last_event_at)||!(t.completed_at===null||typeof t.completed_at=="string"&&Number.isFinite(Date.parse(t.completed_at)))?null:t}function Fy(e,t,n,r){let i=un({providers:{[t]:{subtotal:n.subtotal,breakdown:n.usage,...n.replayed?{replayed:!0}:{}}},roles:{}})[0],s=Vp({provider:t,launch_id:n.receipt_id,session_id:typeof n.session_id=="string"?n.session_id:void 0},n,r);return c`<div class="detail-session__leg detail-session__usage-detail">
    <span class="detail-session__leg-role detail-session__usage-label"
      >${e}</span
    >
    <span class="detail-session__leg-meta detail-session__usage-value"
      >${[n.provider,n.model,n.effort].filter(Boolean).join(" \xB7 ")}</span
    >
    <span
      class="detail-session__leg-sid detail-session__sid"
      title=${s.title}
      >${s.text}</span
    >
    ${Bl(n.completed_at)?c`<span class="detail-session__leg-time detail-session__time"
          >${Bl(n.completed_at)}</span
        >`:""}
    ${i?c`<span class="detail-session__usage" title=${i.tooltip}
          >${i.label}</span
        >`:""}
  </div>`}function By(e,t,n,r,o){let i=e.status==="running"?null:t,l=(i?un({providers:{[e.provider]:{subtotal:i.subtotal,breakdown:i.usage,...i.replayed?{replayed:!0}:{}}},roles:{}}):[])[0],a=e.status==="running"?vs(e.last_event_at):i?Bl(i.completed_at):"",u=(e.provider==="claude"?["Claude",e.agent_type,Ny(e.model),e.effort]:["codex",e.model,e.effort]).filter(Boolean).join(" \xB7 "),d=Vp(e,i,o);return c`<button
    type="button"
    class="detail-session__leg detail-session__usage-detail detail-session__leg--${e.status}"
    data-launch-id=${e.launch_id}
    @click=${()=>r.onOpenDelegation&&r.onOpenDelegation(n,e.launch_id)}
  >
    <span class="detail-session__leg-glyph" aria-hidden="true"
      >${Py[e.status]}</span
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
    ${a?c`<span class="detail-session__leg-time detail-session__time"
          >${a}</span
        >`:""}
    ${l?c`<span class="detail-session__usage" title=${l.tooltip}
          >${l.label}</span
        >`:""}
  </button>`}function Uy(e,t){return e.role===t.role&&(e.model===null||t.model===void 0||e.model===t.model)&&e.session_id===t.session_id}function Wy(e,t,n){let r=[],o=new Set,i=Array.isArray(e.delegation_sessions)?e.delegation_sessions:[];for(let p of i){let _=jy(p);!_||o.has(_.launch_id)||Kp(_.agent_type)||(o.add(_.launch_id),r.push(_))}r.sort((p,_)=>(p.started_at||0)-(_.started_at||0));let s={};for(let{role:p,provider:_}of Qi){let m=t?t.roles[p]?.[_]:null;s[p]=m?[...m.legs]:[]}let l=Qi.flatMap(({role:p})=>s[p]),a=new Set,u=new Set,d=[];for(let{role:p,provider:_}of Qi){for(let m of r.filter(y=>y.role===p&&y.provider===_)){let y=l.find(R=>R.receipt_id===m.launch_id)||null;if(y&&!Uy(m,y))continue;y&&a.add(y.receipt_id);let C=_==="codex"&&u.has(m.session_id);d.push(By(m,y,e.attempt_id,n,C)),_==="codex"&&u.add(m.session_id)}for(let m of s[p])if(!a.has(m.receipt_id)&&!Kp(m.agent_type)){let y=typeof m.session_id=="string"&&m.session_id.length>0?m.session_id:null,C=_==="codex"&&y!==null&&u.has(y);d.push(Fy(p,_,m,C)),_==="codex"&&y!==null&&u.add(y)}}return d}function zy(e,t){let n=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?e.total_cost_usd:null,r=[...Iy,{key:"cache_creation_input_tokens",label:t==="codex"?"\uCE90\uC2DC \uC4F0\uAE30":"\uCE90\uC2DC \uC0DD\uC131"},...t==="codex"&&typeof e.reasoning_output_tokens=="number"&&Number.isFinite(e.reasoning_output_tokens)?[{key:"reasoning_output_tokens",label:"\uCD94\uB860 \uCD9C\uB825"}]:[]];return c`<div class="detail-session__usage-detail">
    ${r.map(o=>c`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">${o.label}</span
          ><span class="detail-session__usage-value"
            >${My(e[o.key]).toLocaleString("en-US")}</span
          ></span
        >`)}
    ${n===null?"":c`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">비용</span
          ><span class="detail-session__usage-value"
            >$${n.toFixed(2)}</span
          ></span
        >`}
    ${e.replayed?c`<span class="detail-session__usage-note">${Yp}</span>`:""}
  </div>`}var Hy={running:"\u25CF",done:"\u2713",failed:"\u2717",orphaned:"\u26A0"};function vs(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),n=String(t.getHours()).padStart(2,"0"),r=String(t.getMinutes()).padStart(2,"0");return`${n}:${r}`}function Ky(e){if(typeof e.exec_default_preset_id!="string"||e.exec_default_preset_id.length===0)return"";let t=e.exec_values&&typeof e.exec_values=="object"?Object.entries(e.exec_values).filter(([,r])=>typeof r=="string"&&r.length>0).map(([r,o])=>`${r}=${o}`).join(" \xB7 "):"",n=typeof e.exec_default_preset_revision=="number"?` r${e.exec_default_preset_revision}`:"";return c`<div
    class="detail-session__preset-audit"
    data-attempt-preset-audit
  >
    <strong>외부 실행 preset</strong>
    <span>${e.exec_default_preset_id}${n}</span>
    ${t?c`<small>${t}</small>`:""}
    <small>내부 workflow 실행 영수증과 별도 기록</small>
  </div>`}var Gy={remote:"\uB2E4\uB978 \uBA38\uC2E0 \uC138\uC158 \u2014 \uC774 \uC11C\uBC84\uC5D0 transcript \uC5C6\uC74C",missing:"transcript \uD30C\uC77C \uC5C6\uC74C"};function Yy(e,t){let n=Gy[e.locality]||"",r=e.locality==="remote"?`${e.host} \xB7 \uB2E4\uB978 \uBA38\uC2E0`:e.locality==="missing"?`${e.host} \xB7 \uD30C\uC77C \uC5C6\uC74C`:e.host;return c`<div class="detail-session-row">
    <button
      type="button"
      class="detail-session detail-session--session"
      data-session-key=${Oa(e)}
      ?disabled=${n.length>0}
      title=${n}
      @click=${()=>{n.length===0&&t.onOpenSessionRef&&t.onOpenSessionRef(e)}}
    >
      <span class="detail-session__glyph">${e.current?"\u25D0":"\xB7"}</span>
      <span class="detail-session__id">${Po(e)}</span>
      <span class="detail-session__meta">${r}</span>
      <span class="detail-session__sid" title=${e.session_id}
        >${e.session_id.slice(0,8)}</span
      >
      <span class="detail-session__time">${vs(e.last_event_at)}</span>
    </button>
    ${e.resume_command?c`<button
          type="button"
          class="op-btn detail-session__resume-cmd"
          title=${e.resume_command}
          @click=${o=>{o.stopPropagation(),t.onCopyResumeCommand&&e.resume_command&&t.onCopyResumeCommand(e.resume_command)}}
        >
          ⧉ 재개
        </button>`:""}
  </div>`}function Qp(e,t={},n={},r=[]){let o=Array.isArray(e)?e:[],i=Array.isArray(r)?r:[],s=[...i.filter(m=>m&&m.current===!0),...i.filter(m=>m&&m.current!==!0).sort((m,y)=>y.index-m.index)],l=s.map(m=>Yy(m,t)),a=n.expanded||new Set;if(o.length===0&&s.length===0)return c`
      <div class="detail-section-label">세션 이력</div>
      <div class="detail-empty" data-seam="session-history">세션 이력 없음</div>
    `;let u=new Set;for(let m of o)m&&typeof m.resumed_from=="string"&&m.resumed_from.length>0&&u.add(m.resumed_from);let d=m=>{if(!(m.status==="failed"||m.status==="orphaned"))return"";let C=typeof m.session_id=="string"&&m.session_id.length>0,R=u.has(m.attempt_id),V=C&&!R,te=C?R?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":"\uC774 \uC138\uC158\uC744 \uAC19\uC740 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C \uC774\uC5B4\uC11C \uC9C4\uD589":"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00";return c`<button
      type="button"
      class="op-btn detail-session__resume"
      data-attempt-id=${m.attempt_id}
      ?disabled=${!V}
      title=${te}
      @click=${W=>{W.stopPropagation(),V&&t.onResume&&t.onResume(m.attempt_id)}}
    >
      ↻ 이어하기
    </button>`},p=m=>{if(!(m.status==="failed"||m.status==="orphaned")||typeof m.cause!="string"||m.cause==="")return"";let C=m.cause_detail,R=C&&typeof C.reason=="string"&&C.reason.length>0?typeof C.command=="string"&&C.command.length>0?`${C.reason} \xB7 ${C.command}`:C.reason:m.cause;return c`<div class="detail-session__cause" title=${R}>
      ${m.cause}
    </div>`},_=m=>{let y=Gp(Da(m));if(un(y).length===0&&!lo(m.usage))return"";let C=a.has(m.attempt_id);return c`<button
      type="button"
      class="detail-session__usage-toggle"
      data-attempt-id=${m.attempt_id}
      aria-expanded=${C?"true":"false"}
      title=${C?"\uD1A0\uD070 \uB0B4\uC5ED \uC811\uAE30":"\uD1A0\uD070 \uB0B4\uC5ED \uD3BC\uCE58\uAE30"}
      @click=${R=>{R.stopPropagation(),t.onToggleUsage&&t.onToggleUsage(m.attempt_id)}}
    >
      τ 자세히
    </button>`};return c`
    <div class="detail-section-label">
      세션 이력${qy(n.total)}
    </div>
    <div class="detail-sessions" data-seam="session-history">
      ${l}${o.map(m=>{let y=Da(m),C=Gp(y),R=un(C);return c`<div class="detail-session-row">
          <button
            type="button"
            class="detail-session detail-session--${m.status||"unknown"}"
            data-attempt-id=${m.attempt_id}
            @click=${()=>t.onOpen&&t.onOpen(m.attempt_id)}
          >
            <span class="detail-session__glyph"
              >${Hy[m.status||""]||"\xB7"}</span
            >
            <span class="detail-session__id">${m.attempt_id}</span>
            ${Do(m)?c`<span
                  class="detail-session__resumed"
                  title=${Do(m)}
                  >↻</span
                >`:""}
            <span class="detail-session__meta">${Sn(m)}</span>
            ${R.length>0?c`<span class="detail-session__role">orchestrator</span>`:""}
            ${m.session_id?c`<span class="detail-session__sid" title=${m.session_id}
                  >${String(m.session_id).slice(0,8)}</span
                >`:""}
            ${R.length>0?R.map(V=>c`<span
                      class="detail-session__usage"
                      title=${V.tooltip}
                      >${V.label}</span
                    >`):lo(m.usage)?c`<span class="detail-session__usage"
                    >${lo(m.usage)}</span
                  >`:""}
            <span class="detail-session__time">${vs(m.started_at)}</span>
          </button>
          ${_(m)} ${d(m)} ${p(m)} ${Ky(m)}
          ${a.has(m.attempt_id)&&m.usage?zy(m.usage,m.runner==="codex"?"codex":"claude"):""}
          ${Wy(m,y,t)}
        </div>`})}
    </div>
  `}function Xp(e,t={}){return c`
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
          ${Vy(e)}
        </div>`:""}
  `}function Vy(e){let t=$o(e);if(t)return t;let n=e.data;if(!n)return"";if(n.missing)return c`<div class="detail-prompt__missing">
        기록 없음 — 아직 이 이슈로 디스패치된 세션이 없습니다. 아래는 다음
        디스패치가 보낼 기본 과업입니다.
      </div>
      ${typeof n.default_task_prompt=="string"?lr("\uC608\uC0C1 \uAE30\uBCF8 \uACFC\uC5C5",n.default_task_prompt):""}`;let r=zi(n.recorded_at);return c`<div class="detail-prompt__meta">
      ${n.attempt_id}${r?` \xB7 ${r}`:""}
    </div>
    ${typeof n.task_prompt=="string"?lr("\uACFC\uC5C5 (user)",n.task_prompt):""}
    ${typeof n.system_prompt=="string"?lr("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",n.system_prompt):""}`}var Wr=10;function Zp(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),n=r=>String(r).padStart(2,"0");return`${n(t.getMonth()+1)}-${n(t.getDate())} ${n(t.getHours())}:${n(t.getMinutes())}`}function Jp(e,t={}){let r=(Array.isArray(e?.events)?e.events:[]).filter(l=>l&&typeof l.summary=="string"&&l.summary.trim().length>0);if(r.length===0)return"";let o=typeof e.shown=="number"&&e.shown>0?e.shown:Wr,i=r.slice(0,o),s=r.length-i.length;return c`
    <div class="detail-section-label">Worker 이력 (${r.length})</div>
    <ol class="detail-timeline" data-seam="worker-timeline">
      ${i.map(l=>c`<li class="detail-timeline__row">
            ${Zp(l.at)?c`<span class="detail-timeline__at"
                  >${Zp(l.at)}</span
                >`:""}
            <span class="detail-timeline__summary">${l.summary}</span>
          </li>`)}
    </ol>
    ${s>0?c`<button
          type="button"
          class="detail-timeline__more"
          data-seam="worker-timeline-more"
          @click=${()=>t.onMore&&t.onMore()}
        >
          더 보기 (${s})
        </button>`:""}
  `}var Qy=["open","in_progress","deferred","resolved","closed"],Xy=[0,1,2,3,4];function ef(e,t){let n=t.issueStores,r=t.onClose,o=t.transport,i=t.onNavigate,s=t.queueStore,l=t.execPresetStore,a=t.sessionLogStore,u=null,d=null,p={},_="",m=!1,y=[],C=!1,R=!1,V={},te={claude:null,codex:null},W=null,M=null,I=0,L=!1,U=!1,Y="",q="",N="",z="",G=!1;function oe(){L=!1,U=!1,Y="",q="",N="",z="",G=!1}function ye(){te={claude:null,codex:null},W=null,M=null,I+=1}async function Me(){if(!o)return null;try{let w=await Promise.resolve(o("get-workspace-accounts",{}));return w&&typeof w.state=="string"?w:null}catch{return null}}async function F(w){try{let D=await fetch(w);if(!D.ok)return null;let K=await D.json();if(!K||typeof K!="object"||!Array.isArray(K.accounts))return null;let $e=K.accounts.filter(We=>We!==null&&typeof We=="object"&&!Array.isArray(We));return{accounts:$e,active:$e.find(We=>We.active===!0)||null}}catch{return null}}async function X(w){M=w;let D=++I,[K,$e,We]=await Promise.all([F("/api/claude-usage"),F("/api/codex-usage"),Me()]);D!==I||w!==u||(te={claude:K,codex:$e},W=We,nt())}let Ae=[],Ee=null,O=null,se=!1,be="",ve=!1,Pe=0,he=new Set;function Re(){Ae=[],Ee=null,O=null,se=!1,be="",ve=!1,Pe+=1,he.clear()}async function Xe(w){if(!o)return;let D=++Pe;try{let K=await Promise.resolve(o("get-comments",{id:w}));if(D!==Pe||w!==u)return;Ae=Array.isArray(K)?K:[],se=!1}catch{if(D!==Pe||w!==u)return;se=!0}nt()}function dt(){if(!o||!u)return;let w=d&&typeof d.comment_count=="number"?d.comment_count:null;if(Ee!==u){Ee=u,O=w,Xe(u);return}w!==null&&w!==O&&(O=w,Xe(u))}function H(w){he.has(w)?he.delete(w):he.add(w),nt()}function J(w){let D=be.trim().length===0;be=w,D!==(w.trim().length===0)&&nt()}async function re(){let w=be.trim();if(!o||!u||w.length===0||ve)return;let D=u;ve=!0,nt();let K=!1;try{let $e=await Promise.resolve(o("add-comment",{id:D,text:w}));Array.isArray($e)&&$e.length>0&&(K=!0,D===u&&(Ae=$e,se=!1,be="",O=$e.length))}catch{K=!1}K||me("\uB313\uAE00 \uCD94\uAC00 \uC2E4\uD328","error"),D===u&&(ve=!1),nt()}let fe={onToggle:H,onDraftInput:J,onSubmit:re},Se=t.mdViewer||null,_e=null;Se||(_e=document.createElement("div"),_e.className="md-viewer-root",document.body.appendChild(_e));let qe=Se||Vi(_e,{getWorkspacePath:t.getWorkspacePath||(()=>"")}),Fe=document.createElement("div");Fe.className="session-log-root",document.body.appendChild(Fe);let Ve=xo(Fe,{transport:o?(w,D)=>Promise.resolve(o(w,D)):void 0,sessionLogStore:a}),He=!1,ee=!1,Q=!1,xe=null,mt=null,ft=0;function Ke(w){return`${t.getWorkspacePath&&t.getWorkspacePath()||""}::${w}`}function Je(){He=!1,ee=!1,Q=!1,xe=null,mt=null,ft+=1}async function A(w){if(!o)return;let D=++ft;ee=!0,Q=!1,nt();try{let K=await Promise.resolve(o("get-bead-prompt",{bead_id:w}));if(D!==ft)return;!K||typeof K!="object"||Array.isArray(K)?Q=!0:(xe=K,mt=Ke(w))}catch{D===ft&&(Q=!0)}finally{D===ft&&(ee=!1,nt())}}let Z=[],Ie=null,Ge=0;function tt(w,D){return`${t.getWorkspacePath&&t.getWorkspacePath()||""}::${w}::${D}`}function Ce(){Z=[],Ie=null,Ge+=1}async function Ze(w,D){if(!o)return;let K=++Ge,$e;try{$e=await Promise.resolve(o("get-session-refs",{bead_id:w}))}catch{$e=null}K!==Ge||D!==Ie||(Z=$e&&Array.isArray($e.sessions)?$e.sessions:[],nt())}function Ut(){if(!o||!u)return;let w=d&&d.metadata,D=w&&typeof w=="object"&&typeof w.session_ref=="string"?w.session_ref:null;if(D===null){Ce();return}let K=tt(u,D);Ie!==K&&(Z=[],Ie=K,Ze(u,K))}let wt=[],bt=[],Ft=Wr,Ct=null,Mt=0;function de(w){return`${t.getWorkspacePath&&t.getWorkspacePath()||""}::${w}`}function ke(){wt=[],bt=[],Ft=Wr,Ct=null,Mt+=1}async function Ue(w,D){if(!o)return;let K=++Mt,$e;try{$e=await Promise.resolve(o("get-bead-timeline",{bead_id:w}))}catch{$e=null}K!==Mt||D!==Ct||(wt=$e&&Array.isArray($e.events)?$e.events:[],bt=$e&&Array.isArray($e.attempts)?$e.attempts:[],Ft=Wr,nt())}function rt(){if(!o||!u)return;let w=de(u);Ct!==w&&(wt=[],bt=[],Ft=Wr,Ct=w,Ue(u,w))}function et(){Ft+=Wr,nt()}function je(){if(He=!He,He&&u&&mt!==Ke(u)){xe=null,A(u);return}nt()}function x(){let w={};for(let K of bt)K&&typeof K=="object"&&K.bead_id===u&&(w[String(K.attempt_id)]=K);let D=s?s.get():null;for(let K of D&&D.attempts?Object.values(D.attempts):[]){let $e=K;$e&&$e.bead_id===u&&(w[String($e.attempt_id)]=$e)}return w}function j(){return u?Object.values(x()).sort((D,K)=>(K.started_at||0)-(D.started_at||0)).map(D=>({attempt_id:D.attempt_id,bead_id:D.bead_id,status:D.status,started_at:typeof D.started_at=="number"?D.started_at:null,runner:D.runner||null,model:D.model||null,effort:D.effort||D.observed_effort||null,speed:D.speed||null,session_id:D.session_id||null,resumed_from:D.resumed_from||null,continuation_mode:D.continuation_mode||null,dismissed_at:typeof D.dismissed_at=="number"?D.dismissed_at:null,cause:typeof D.cause=="string"?D.cause:null,cause_detail:D.cause_detail||null,exec_default_preset_id:typeof D.exec_default_preset_id=="string"?D.exec_default_preset_id:null,exec_default_preset_revision:typeof D.exec_default_preset_revision=="number"?D.exec_default_preset_revision:null,exec_values:D.exec_values&&typeof D.exec_values=="object"?D.exec_values:null,usage:D.usage||null,usage_legs:Array.isArray(D.usage_legs)?D.usage_legs:[],delegation_sessions:Array.isArray(D.delegation_sessions)?D.delegation_sessions:[]})):[]}function ae(){return u?nr(x(),u):null}let ge=new Set;function le(w){ge.has(w)?ge.delete(w):ge.add(w),nt()}function it(w){let D=s?s.get():null,K=D&&D.attempts?D.attempts[w]:null;Ve.open({attempt_id:w,meta:K?{runner:K.runner||void 0,model:K.model||void 0,effort:K.effort||void 0,status:K.status||void 0,session_id:K.session_id||void 0}:{}})}function It(w,D){let K=s?s.get():null,$e=K&&K.attempts?K.attempts[w]:null,lt=($e&&Array.isArray($e.delegation_sessions)?$e.delegation_sessions:[]).find(Bt=>Bt&&typeof Bt=="object"&&Bt.launch_id===D);lt&&Ve.open({attempt_id:w,launch_id:D,meta:{runner:lt.provider==="claude"?"claude":"codex",role:lt.role,...typeof lt.agent_type=="string"?{agent_type:lt.agent_type}:{},model:lt.model,effort:lt.effort,session_id:lt.session_id,status:lt.status}})}async function yt(w){if(!o||!w)return;let D=o,K=()=>{let We=s?s.get():null;return We&&typeof We.revision=="number"?We.revision:0},$e=s?.get()?.attempts?.[w]||null;await so({context:{bead_id:$e?.bead_id||u||"",kind:"session",tuple:$e?Sn($e):""},transport:We=>D("worker-attempt-resume",{attempt_id:w,expected_revision:K(),...We}),adopt:We=>{We?.queue&&s?.set&&s.set(We.queue)}})}async function $t(w,D){if(!o||!w)return;let K=o,$e=()=>{let Qe=s?s.get():null;return{bead_id:w,...D==="parallel"?{}:{lane:D},expected_revision:Qe&&typeof Qe.revision=="number"?Qe.revision:0}},We=Qe=>{Qe?.queue&&s?.set&&s.set(Qe.queue)},lt=await Promise.resolve(K("worker-queue-place",$e()));if(We(lt),lt&&lt.conflict&&(lt=await Promise.resolve(K("worker-queue-place",$e())),We(lt)),nt(),!lt)return;if(lt.applied===!1&&typeof lt.admission_reason=="string"){me(`\uB300\uAE30 \uC801\uC7AC \uAC70\uBD80: ${lt.admission_reason}`,"error",2400);return}if(lt.reason==="rejected"){me("\uB300\uAE30 \uC801\uC7AC \uAC70\uBD80: rejected","error",2400);return}if(lt.applied===!1)return;let Bt=lt.queue?Ko({id:w},lt.queue).location:null;Bt&&"index"in Bt&&me(`${ed(Bt.lane)} \uB300\uAE30 #${Bt.index+1}\uC5D0 \uCD94\uAC00`,"success",2400)}function xt(w,D){if(D){R=!0,nt();return}$t(w,"parallel")}function Lt(w,D){let We=(w.target?.closest?.(".worker-card__place-lane")||null)?.dataset.lane;We&&(We!=="parallel"&&!/^s[1-5]$/.test(We)||(R=!1,nt(),$t(D,We)))}function qt(w){!w||!u||Ve.open(io(w,u,d&&d.status))}let Dt={onOpen:it,onOpenDelegation:It,onResume:yt,onToggleUsage:le,onOpenSessionRef:qt,onCopyResumeCommand:B};function Jt(){let w=s?s.get():null,D={...V};for(let K of[...Pn,...po]){let $e=w&&w[K];typeof $e=="string"&&(D[K]=$e)}return D}async function Vt(){if(o){try{let w=await Promise.resolve(o("get-session-defaults",{}));V=w&&w.values&&typeof w.values=="object"?w.values:{}}catch{V={}}nt()}}function At(){let w=s?s.get():null;return w&&w.runner_catalog||null}function Wt(){let w=s?s.get():null;return w&&typeof w.execution_defaults=="object"?w.execution_defaults:null}function zt(){let w=d?.metadata&&typeof d.metadata=="object"?d.metadata:{},K=En({pin:{...w,...p},global:Jt(),execution_defaults:Wt(),runner_catalog:At(),route:typeof w.route=="string"?w.route:null}).orchestration_model.value||"";return Mn(At(),K)}function on(){let w=l?l.get():null;return!w||typeof w.revision!="number"?null:{revision:w.revision,presets:Array.isArray(w.presets)?w.presets:[]}}function Kt(w){return w?.compatible===!1}function ln(w){l&&w&&typeof w.revision=="number"&&Array.isArray(w.presets)&&l.set({revision:w.revision,presets:w.presets})}async function we(){let w=on(),D=w?.presets.find(K=>K.id===_);if(!(!o||!u||!w||!D||Kt(D)||m)){m=!0,y=[],nt();try{let K=await Promise.resolve(o("apply-impl-preset",qu(u,D.id,w.revision)));if(K&&K.conflict){ln(K),me("\uD504\uB9AC\uC14B\uC774 \uBCC0\uACBD\uB410\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uBAA9\uB85D\uC5D0\uC11C \uB2E4\uC2DC \uC801\uC6A9\uD558\uC138\uC694.","error",4e3);return}let $e=K&&Array.isArray(K.issue)?K.issue[0]:K?.issue;if(K&&K.applied&&$e&&typeof $e=="object"){d=$e,y=Array.isArray(K.skipped_orchestration_keys)?K.skipped_orchestration_keys.filter(We=>typeof We=="string"):[];for(let We of Nu)delete p[We];me(y.length>0?"\uC2E4\uD589 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4. \uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 3\uD0A4\uB294 Bead\uC5D0 \uD540\uD560 \uC218 \uC5C6\uC5B4 \uAC74\uB108\uB6F0\uC5C8\uC2B5\uB2C8\uB2E4.":"\uC2E4\uD589 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4.","success",4e3);return}K&&K.error==="bd_readback_failed"?me("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):me("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}catch(K){K&&typeof K=="object"&&K.code==="bd_readback_failed"?me("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):me("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}finally{m=!1,nt()}}}let T=null;n&&n.subscribe&&(T=n.subscribe(()=>k()));let ne=null;s&&typeof s.subscribe=="function"&&(ne=s.subscribe(()=>{u&&nt()}));let De=null,b=null;function v(){b&&(b(),b=null)}l&&typeof l.subscribe=="function"&&(De=l.subscribe(()=>{u&&nt()}));function P(w){w.key==="Escape"&&u&&(w.preventDefault(),r())}document.addEventListener("keydown",P);let f=co(()=>nt());f.attach();function k(){if(u){if(n&&typeof n.snapshotFor=="function"){let w=n.snapshotFor("detail:"+u)||[];d=w.find(K=>K&&K.id===u)||w[0]||d}dt(),Ut(),rt(),nt()}}function B(w){gn(w).then(D=>{D?me("\uBCF5\uC0AC\uB428","success",1200):me("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function ce(w){w.preventDefault(),w.stopPropagation(),u&&B(u)}function ue(w,D){w.preventDefault(),w.stopPropagation(),B(D)}function Be(w,D,K){w.preventDefault(),w.stopPropagation(),qe.open(D,{missing_state:K})}async function _t(w,D){let K=Object.hasOwn(p,w),$e=p[w];if(p[w]=D,nt(),!(!o||!u))try{let We=await Promise.resolve(o("update-exec-settings",Mu(u,w,D.length===0?null:D))),lt=Array.isArray(We)?We[0]:We;if(!lt||typeof lt!="object"||!lt.id)throw new Error("exec settings readback failed");d=lt,delete p[w],nt()}catch(We){throw K?p[w]=$e:delete p[w],nt(),me("\uC2E4\uD589 \uC124\uC815 \uBCC0\uACBD \uC2E4\uD328","error"),We}}function gt(w){w.catch(()=>{})}async function at(w,D){let K=d||{},$e=K.metadata&&typeof K.metadata=="object"?K.metadata:{},We={};for(let Qe of["impl_runtime","impl_model","impl_effort"])We[Qe]=Object.hasOwn(p,Qe)?p[Qe]:typeof $e[Qe]=="string"?$e[Qe]:"";We[w]=D;let lt=Bu(We,At(),zt()),Bt={};for(let Qe of["impl_runtime","impl_model","impl_effort"])Bt[Qe]=p[Qe],p[Qe]=lt[Qe]||"";if(nt(),!(!o||!u))return Promise.resolve(o("update-impl-target",{id:u,...lt,orchestration_runtime:zt()})).then(Qe=>{let Et=Array.isArray(Qe)?Qe[0]:Qe;if(!Et||typeof Et!="object"||!Et.id)throw new Error("implementation target readback failed");d=Et;for(let An of["impl_runtime","impl_model","impl_effort"])delete p[An];nt()}).catch(Qe=>{for(let Et of["impl_runtime","impl_model","impl_effort"])Bt[Et]===void 0?delete p[Et]:p[Et]=Bt[Et];throw nt(),me("\uAD6C\uD604 target \uBCC0\uACBD \uC2E4\uD328","error"),Qe})}async function S(w,D,K){if(!o||!u)return!1;try{let $e=await Promise.resolve(o(w,D)),We=Array.isArray($e)?$e[0]:$e;return We&&typeof We=="object"&&We.id?(d=We,!0):(me(K,"error"),!1)}catch($e){return $e&&typeof $e=="object"&&$e.code==="bd_readback_failed"?(me("\uC800\uC7A5\uB410\uC73C\uB098 \uD655\uC778 \uC2E4\uD328 \u2014 \uACE7 \uAC31\uC2E0\uB429\uB2C8\uB2E4","error"),{ok:!1,saved:!0}):(me(K,"error"),!1)}}function $(w){setTimeout(()=>{try{let D=e.querySelector(w);D&&typeof D.focus=="function"&&D.focus()}catch{}},0)}function Le(){L=!0,Y=d&&d.title||"",nt(),$('.detail-edit__input[data-edit="title"]')}function Ne(w){Y=w.target.value}function ot(){L=!1,Y="",nt()}function vt(){S("edit-text",{id:u,field:"title",value:Y},"\uC81C\uBAA9 \uC800\uC7A5 \uC2E4\uD328").then(D=>{D===!0&&(L=!1,Y=""),nt()})}function Nt(){U=!0,q=d&&d.description||"",nt(),$('.detail-edit__textarea[data-edit="description"]')}function en(w){q=w.target.value}function Sr(){U=!1,q="",nt()}function kn(){S("edit-text",{id:u,field:"description",value:q},"\uC124\uBA85 \uC800\uC7A5 \uC2E4\uD328").then(D=>{D===!0&&(U=!1,q=""),nt()})}function Er(w,D,K,$e){if(w.key==="Escape"){w.stopPropagation(),K();return}w.key==="Enter"&&(!$e||w.ctrlKey||w.metaKey)&&(w.preventDefault(),D())}function Kr(w){let D=w.target.value;S("update-status",{id:u,status:D},"\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328").then(()=>nt())}function la(w){let D=Number(w.target.value);S("update-priority",{id:u,priority:D},"\uC6B0\uC120\uC21C\uC704 \uBCC0\uACBD \uC2E4\uD328").then(()=>nt())}function ca(w){N=w.target.value}function As(){let w=N.trim();w.length!==0&&S("label-add",{id:u,label:w},"\uB77C\uBCA8 \uCD94\uAC00 \uC2E4\uD328").then(D=>{D===!0&&(N=""),nt()})}function Ss(w){if(w.key==="Escape"){w.stopPropagation(),N="",nt();return}w.key==="Enter"&&(w.preventDefault(),As())}function ua(w){S("label-remove",{id:u,label:w},"\uB77C\uBCA8 \uC81C\uAC70 \uC2E4\uD328").then(()=>nt())}let da={onCopyPath:ue,onOpenDoc:Be};function Gr(w){return typeof w=="string"?w:w&&typeof w=="object"?String(w.id||w.to||w.issue_id||w.depends_on||""):""}function Yr(w){return w&&typeof w=="object"?String(w.dependency_type||w.type||""):""}function h(w){switch(w){case"discovered-from":return{glyph:"\u21A9 ",relation:"\uBC1C\uACAC"};case"parent-child":return{glyph:"\u2338 ",relation:"\uC0C1\uC704"};case"related":return{glyph:"\u2194 ",relation:"\uAD00\uB828"};default:return w.length>0?{glyph:`${w} `,relation:w}:{glyph:"",relation:""}}}function g(w,D){let K=E(D),$e=[];return w.length>0&&$e.push(w),K&&$e.push(K),$e.length>0?$e.join(`
`):void 0}function E(w){if(!w||typeof w!="object")return;let D=typeof w.status=="string"?w.status:"",K=typeof w.title=="string"?w.title:"";return D.length>0&&K.length>0?`${D} \xB7 ${K}`:void 0}function ie(){return(t.getWorkspacePath&&t.getWorkspacePath()||"").trim()}function pe(){return t.depCandidates?t.depCandidates():null}async function Oe(w,D,K){let $e=ie(),We=u;if(!We)return;if($e.length===0){me("\uB808\uD3EC\uB97C \uC54C \uC218 \uC5C6\uC5B4 \uC758\uC874\uC744 \uBC14\uAFC0 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error");return}let lt=await S(w,{a:We,b:D,view_id:We,root_dir:$e},K),Bt=lt===!0||lt!==!1&&lt.saved===!0;Bt&&t.onDepChanged&&t.onDepChanged({type:w,a:We,b:D}),w==="dep-add"&&Bt&&(z="",G=!1),nt()}function ze(w){if(!u)return;let D=globalThis.confirm;typeof D=="function"&&!D(`${w}\uAC00 ${u}\uB97C \uB9C9\uB294 \uC5F0\uACB0\uC744 \uB04A\uC744\uAE4C\uC694?`)||Oe("dep-remove",w,"\uC758\uC874 \uD574\uC81C \uC2E4\uD328")}function St(w){w.disabled||Oe("dep-add",w.bead_id,"\uC758\uC874 \uCD94\uAC00 \uC2E4\uD328")}function Qt(w){z=w.target.value,G=!0,nt()}function ct(){G||(G=!0,nt())}function sn(w,D){if(w.key==="Escape"){w.stopPropagation(),z="",G=!1,nt();return}w.key==="Enter"&&(w.preventDefault(),D.length===1&&!D[0].disabled&&St(D[0]))}function cn(w){return c`<div class="detail-dep-add">
      <input
        class="detail-dep-add__input"
        aria-label="막는 이슈 추가"
        placeholder="막는 이슈 추가"
        .value=${z}
        @focus=${ct}
        @input=${Qt}
        @keydown=${D=>sn(D,w)}
      />
      ${G||z.length>0?c`<div class="detail-dep-add__list">
            ${w.length===0?c`<div class="detail-dep-add__empty">후보 없음</div>`:w.map(D=>c`<button
                      type="button"
                      class="detail-dep-add__cand"
                      data-dep-cand=${D.bead_id}
                      ?disabled=${D.disabled}
                      title=${pn(D.reason)}
                      @click=${()=>St(D)}
                    >
                      <span class="detail-dep-add__repo"
                        >${D.workspace_name}</span
                      >
                      <span class="detail-dep-add__id"
                        >${D.bead_id}</span
                      >
                      <span class="detail-dep-add__title"
                        >${D.title}</span
                      >
                    </button>`)}
          </div>`:""}
    </div>`}function Wn(w,D){let K=D.get(w.id),$e=i?c`<button
          type="button"
          class="detail-dep__link"
          title=${pn(w.title)}
          @click=${()=>K===void 0?i(w.id):i(w.id,K)}
        >
          ${w.label}
        </button>`:c`<span class="detail-dep__link" title=${pn(w.title)}
          >${w.label}</span
        >`;return c`<span
      class=${`detail-dep detail-dep--${w.kind}${i?" detail-dep--link":""}`}
      >${$e}${w.kind==="pred"?c`<button
            type="button"
            class="detail-dep__unlink"
            data-dep-b=${w.id}
            aria-label=${"\uC758\uC874 \uD574\uC81C: "+w.id}
            @click=${()=>ze(w.id)}
          >
            ✕
          </button>`:""}</span
    >`}function _n(w){let D=Array.isArray(w.dependencies)?w.dependencies:[],K=Array.isArray(w.dependents)?w.dependents:[],$e=[];for(let Qe of D){let Et=Gr(Qe);Et.length>0&&Yr(Qe)==="blocks"&&$e.push({id:Et,label:`\u26D3 ${Et}`,kind:"pred",title:g("\uB9C9\uB294",Qe)})}for(let Qe of K){let Et=Gr(Qe);Et.length>0&&Yr(Qe)==="blocks"&&$e.push({id:Et,label:`\u2192 ${Et}`,kind:"succ",title:g("\uB9C9\uD788\uB294",Qe)})}for(let Qe of D){let Et=Gr(Qe),An=Yr(Qe);if(Et.length>0&&An!=="blocks"){let Te=h(An);$e.push({id:Et,label:`${Te.glyph}${Et}`,kind:"other",title:g(Te.relation,Qe)})}}let We=pe(),lt=new Map;if(We)for(let Qe of We.issues)lt.has(Qe.bead_id)||lt.set(Qe.bead_id,Qe.root_dir);let Bt=We&&u?Yd(Gd(u,We),z):[];return c`
      <div class="detail-section-label">의존성</div>
      ${$e.length===0?c`<div class="detail-empty">의존성 없음</div>`:c`<div class="detail-deps">
            ${$e.map(Qe=>Wn(Qe,lt))}
          </div>`}
      ${We===null?c`<div class="detail-empty">후보를 불러올 수 없음</div>`:cn(Bt)}
    `}function dn(w){let D=w.metadata||{},K=w.workflow||{},$e=K.stages||{},We=$e.spec&&$e.spec.stale,lt=$e.impl&&$e.impl.stale,Bt=K.quick_fix_review?.state==="stale",Qe=$e.plan||null,Et=K.route_source==="derived",An=K.route||D.route||"\u2014";return c`
      <div class="detail-section-label">워크플로우</div>
      <div class="detail-kv">
        <span class="detail-kv__k">route</span>
        <span
          class="detail-kv__v${Et?" detail-kv__v--derived":""}"
          title=${Et?"route \uBBF8\uD540 (metadata unset)":"route"}
          >${Et?"unset":An}</span
        >
      </div>
      ${K.route!=="quick_fix"||Object.hasOwn(D,"spec_review")?c`<div class="detail-kv">
            <span class="detail-kv__k">spec_review</span>
            <span class="detail-kv__v"
              >${D.spec_review||"\uC5C6\uC74C"}${We?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${K.route==="full_plan"?c`<div class="detail-kv">
              <span class="detail-kv__k">plan_review</span>
              <span class="detail-kv__v">${Qe?.receipt||"\uC5C6\uC74C"}</span>
            </div>
            <div class="detail-kv">
              <span class="detail-kv__k">plan_approval</span>
              <span class="detail-kv__v"
                >${Qe?.approval_receipt||"\uC5C6\uC74C"}${Qe?.approval_state==="stale"?" \xB7 stale":Qe?.approval_state==="unknown"?" \xB7 unknown":""}</span
              >
            </div>`:""}
      ${K.route!=="quick_fix"||Object.hasOwn(D,"impl_review")?c`<div class="detail-kv">
            <span class="detail-kv__k">impl_review</span>
            <span class="detail-kv__v"
              >${D.impl_review||"\uC5C6\uC74C"}${lt?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${K.resolver?c`<div class="detail-kv">
            <span class="detail-kv__k">↳ 충돌 해소</span>
            <span
              class="detail-kv__v detail-kv__v--resolver detail-kv__v--wrap"
              title=${`resolver-self:${K.resolver.attempt} \xB7 ${K.resolver.prior_sha} \u2192 ${K.resolver.sha}`}
              >${`${K.resolver.prior_sha.slice(0,7)} \u2192 ${K.resolver.sha.slice(0,7)}`}</span
            >
          </div>`:""}
      ${K.route==="quick_fix"||Object.hasOwn(D,"quick_fix_review")?c`<div class="detail-kv">
            <span class="detail-kv__k">quick_fix_review</span>
            <span class="detail-kv__v"
              >${D.quick_fix_review||"\uC5C6\uC74C"}${Bt?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${K.planned_execution?c`<div class="detail-kv">
              <span class="detail-kv__k">planned_execution</span>
              <span class="detail-kv__v">${K.planned_execution.kind}</span>
            </div>
            ${K.planned_execution.kind==="main"?c`<div class="detail-kv">
                  <span class="detail-kv__k">planned_execution_reason</span>
                  <span class="detail-kv__v detail-kv__v--wrap"
                    >${K.planned_execution.reason}</span
                  >
                </div>`:""}`:""}
      ${K.exec_receipt?c`<div class="detail-kv">
            <span class="detail-kv__k">exec_receipt</span>
            <span class="detail-kv__v detail-kv__v--wrap"
              >${er(K.exec_receipt)}</span
            >
          </div>`:""}
      ${K.impl_entry?c`<div class="detail-kv">
            <span class="detail-kv__k">impl_entry</span>
            <span class="detail-kv__v"
              >${`${K.impl_entry.actor}@${K.impl_entry.sha}`}</span
            >
          </div>`:""}
      ${D.pr_url?c`<div class="detail-kv">
            <span class="detail-kv__k">pr_url</span>
            <span class="detail-kv__v detail-kv__v--wrap">${D.pr_url}</span>
          </div>`:""}
    `}let Rn={route:["quick_fix","spec_backed","full_plan"]};async function Qn(w,D){let K=D.target.value;if(w==="route"&&d&&d.metadata&&d.metadata.route==="full_plan"&&K!=="full_plan"&&!window.confirm(`full_plan \u2192 ${K||"(\uBBF8\uC124\uC815)"} \uC804\uD658: \uC800\uC7A5\uB41C plan \uC2B9\uC778\uC740 \uD3EC\uAE30\uB418\uBA70, plan \uD30C\uC77C\xB7\uB9C8\uCEE4 \uC815\uB9AC\uB294 \uC138\uC158 \uACC4\uC57D\uC774 \uC218\uD589\uD569\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`)){nt();return}await S("update-workflow-meta",{id:u,key:w,value:K},"\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uBA54\uD0C0 \uBCC0\uACBD \uC2E4\uD328"),nt()}function an(w){let D=w.metadata||{};return c` ${(($e,We)=>{let lt=Rn[$e],Bt=typeof D[$e]=="string"?D[$e]:"";return c`<div class="detail-kv">
        <span class="detail-kv__k">${$e}</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label=${$e}
          data-edit=${`wfmeta-${$e}`}
          @change=${Qe=>Qn($e,Qe)}
        >
          <option value="" ?selected=${!lt.includes(Bt)}>
            ${We}
          </option>
          ${lt.map(Qe=>c`<option value=${Qe} ?selected=${Bt===Qe}>${Qe}</option>`)}
        </select>
      </div>`})("route","(unset)")} `}function Xn(w,D){return L?c`
        <div class="detail-edit">
          <input
            class="detail-edit__input"
            data-edit="title"
            aria-label="제목 편집"
            .value=${Y}
            @input=${Ne}
            @keydown=${K=>Er(K,vt,ot,!1)}
          />
          <div class="detail-edit__actions">
            <button
              type="button"
              class="detail-edit__save"
              data-edit="title-save"
              @click=${vt}
            >
              저장
            </button>
            <button
              type="button"
              class="detail-edit__cancel"
              data-edit="title-cancel"
              @click=${ot}
            >
              취소
            </button>
          </div>
        </div>
      `:c`
      <div class="detail-title-row">
        <h2 class="detail-overlay__title">${w}</h2>
        ${un(D).map(K=>c`<span class="detail-usage-total" title=${K.tooltip}
              >${K.label}</span
            >`)}
        <button
          type="button"
          class="detail-edit-btn"
          data-edit="title"
          aria-label="제목 편집"
          @click=${Le}
        >
          ✎
        </button>
      </div>
    `}function cr(w){let D=nn(w.created_at),K=nn(w.updated_at);return!D&&!K?c``:c`
      ${D?c`<div class="detail-kv">
            <span class="detail-kv__k">생성</span>
            <span class="detail-kv__v detail-kv__v--time">${D}</span>
          </div>`:""}
      ${K?c`<div class="detail-kv">
            <span class="detail-kv__k">수정</span>
            <span class="detail-kv__v detail-kv__v--time">${K}</span>
          </div>`:""}
    `}function In(w,D){return c`
      <div class="detail-section-label">속성 (수정 가능)</div>
      <div class="detail-kv">
        <span class="detail-kv__k">status</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label="status"
          data-edit="status"
          @change=${Kr}
        >
          ${Qy.map(K=>c`<option value=${K} ?selected=${K===w}>${K}</option>`)}
        </select>
      </div>
      <div class="detail-kv">
        <span class="detail-kv__k">priority</span>
        <select
          class="detail-kv__v"
          aria-label="priority"
          data-edit="priority"
          @change=${la}
        >
          ${Xy.map(K=>c`<option value=${String(K)} ?selected=${K===D}>
                P${K}
              </option>`)}
        </select>
      </div>
    `}function zn(w){return c`
      <div class="detail-title-row">
        <div class="detail-overlay__section-label">설명</div>
        ${U?"":c`<button
              type="button"
              class="detail-edit-btn"
              data-edit="description"
              aria-label="설명 편집"
              @click=${Nt}
            >
              ✎
            </button>`}
      </div>
      ${U?c`<div class="detail-edit">
            <textarea
              class="detail-edit__textarea"
              data-edit="description"
              aria-label="설명 편집"
              rows="6"
              .value=${q}
              @input=${en}
              @keydown=${D=>Er(D,kn,Sr,!0)}
            ></textarea>
            <div class="detail-edit__actions">
              <button
                type="button"
                class="detail-edit__save"
                data-edit="description-save"
                @click=${kn}
              >
                저장
              </button>
              <button
                type="button"
                class="detail-edit__cancel"
                data-edit="description-cancel"
                @click=${Sr}
              >
                취소
              </button>
            </div>
          </div>`:c`<div class="detail-overlay__desc">
            ${w||"(\uC124\uBA85 \uC5C6\uC74C)"}
          </div>`}
    `}function Ye(w){let D=typeof w.notes=="string"?w.notes:"";return D.trim().length===0?c``:c`
      <div class="detail-overlay__section-label">노트</div>
      <div class="detail-overlay__notes">${D}</div>
    `}function Gt(w){let D=Array.isArray(w.labels)?w.labels:[];return c`
      <div class="detail-section-label">라벨</div>
      <div class="detail-labels">
        ${D.map(K=>c`<span class="detail-label-chip"
              >${K}<button
                type="button"
                class="detail-label-chip__x"
                data-label=${K}
                aria-label=${"\uB77C\uBCA8 \uC81C\uAC70: "+K}
                @click=${()=>ua(K)}
              >
                ×
              </button></span
            >`)}
        <span class="detail-label-add">
          <input
            class="detail-label-add__input"
            aria-label="라벨 추가"
            placeholder="라벨 추가"
            .value=${N}
            @input=${ca}
            @keydown=${Ss}
          />
          <button
            type="button"
            class="detail-label-add__btn"
            @click=${As}
          >
            추가
          </button>
        </span>
      </div>
    `}function xn(){if(!u)return c``;let w=d||{},D=String(w.id||u),K=w.title||"(\uC81C\uBAA9 \uC5C6\uC74C)",$e=ae(),We=w.status||"open",lt=typeof w.priority=="number"?Math.max(0,Math.min(4,w.priority)):"",Bt=w.description||"",Qe=s?s.get():null,Et=Qe&&We!=="closed"?Ko({...w,id:D},Qe):null,An=Qe?Go(Qe):null,Te={...w,metadata:{...w.metadata||{},...p}};return c`
      <div class="detail-overlay" role="dialog" aria-modal="true">
        <div class="detail-overlay__backdrop" @click=${()=>r()}></div>
        <div class="detail-overlay__panel">
          <div class="detail-overlay__bar">
            <button
              type="button"
              class="detail-overlay__id"
              title="ID 복사"
              @click=${ce}
            >
              ${D}
            </button>
            ${Et?c`<button
                  type="button"
                  class="op-btn op-btn--primary detail-overlay__place"
                  data-bead-id=${D}
                  ?disabled=${!Et.placeable}
                  title=${Nr(Et)}
                  @click=${()=>xt(D,An)}
                >
                  ↴ 대기로
                </button>`:""}
            <button
              type="button"
              class="detail-overlay__close"
              aria-label="닫기"
              @click=${()=>r()}
            >
              ✕
            </button>
          </div>
          ${Et&&R&&An?c`<div
                class="place-menu detail-overlay__place-menu"
                @click=${ut=>Lt(ut,D)}
              >
                ${Qa(An,D)}
                <button
                  type="button"
                  class="op-btn op-btn--icon worker-card__place-cancel"
                  data-bead-id=${D}
                  title="레인 선택 취소"
                  aria-label="레인 선택 취소"
                  @click=${()=>{R=!1,nt()}}
                >
                  ✕
                </button>
              </div>`:""}
          ${Xn(K,$e)}
          ${jp(Te,{onChipToggle:ut=>f.toggle({bead_id:D,chip_key:ut}),isChipOpen:ut=>f.isOpen({bead_id:D,chip_key:ut})})}
          ${Np({metadata:Te.metadata,workspace_values:Jt(),catalog:At(),execution_defaults:Wt(),expanded:C,presets:on()?.presets||[],preset_id:_,preset_busy:m,skipped_orchestration_keys:y},{onToggle:ut=>{C=ut,nt()},onEdit:(ut,Xt)=>{if(ut==="impl_runtime"||ut==="impl_model"||ut==="impl_effort"){gt(at(ut,Xt??""));return}gt(_t(ut,Xt??""))},onPresetSelect:ut=>{_=ut,y=[],nt()},onPresetApply:()=>{we()}})}
          ${Hp({md:Te.metadata,catalog:te,workspace_defaults:W,handlers:{onExecChange:(ut,Xt)=>gt(_t(ut,Xt))}})}
          ${In(We,lt)} ${cr(w)}
          ${zn(Bt)}
          ${Dp(Ae,fe,{expanded:he,draft:be,sending:ve,error:se})}
          ${Ye(w)} ${Gt(w)} ${_n(w)}
          ${dn(w)} ${an(w)}
          ${Rp(w,da)}
          ${Xp({expanded:He,loading:ee,error:Q,data:xe},{onToggle:je})}
          ${Qp(j(),Dt,{total:$e,expanded:ge},Z)}
          ${Jp({events:wt,shown:Ft},{onMore:et})}
        </div>
      </div>
    `}function nt(){pt(xn(),e)}return{load(w){w!==u&&(p={},R=!1,_="",y=[],C=!1,oe(),Re(),Je(),Ce(),ke(),ye()),u=w,d=null,!b&&t.subscribeCandidates&&(b=t.subscribeCandidates(()=>{u&&nt()})),k(),Vt(),M!==w&&X(w)},clear(){u=null,d=null,p={},R=!1,_="",m=!1,y=[],C=!1,oe(),Re(),Je(),Ce(),ke(),ye(),v(),qe.close(),Ve.close(),pt(c``,e)},destroy(){T&&(T(),T=null),ne&&(ne(),ne=null),De&&(De(),De=null),v(),document.removeEventListener("keydown",P),f.detach(),Se||(qe.destroy(),_e&&_e.parentNode&&_e.parentNode.removeChild(_e)),Ve.destroy(),Fe.parentNode&&Fe.parentNode.removeChild(Fe),u=null,d=null,ye(),_="",m=!1,y=[],Re(),Je(),Ce(),ke(),pt(c``,e)}}}function tf(e){let t=document.createElement("dialog");t.id="fatal-error-dialog",t.setAttribute("role","alertdialog"),t.setAttribute("aria-modal","true"),t.innerHTML=`
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
    </div>`,e.appendChild(t);let n=t.querySelector("#fatal-error-title"),r=t.querySelector("#fatal-error-message"),o=t.querySelector("#fatal-error-detail"),i=t.querySelector("#fatal-error-reload"),s=t.querySelector("#fatal-error-close"),l=()=>{if(typeof t.close=="function")try{t.close()}catch{}t.removeAttribute("open")},a=(u,d,p="")=>{n&&(n.textContent=u||"Unexpected Error"),r&&(r.textContent=d||"An unrecoverable error occurred.");let _=typeof p=="string"?p.trim():"";if(o&&(_.length>0?(o.textContent=_,o.removeAttribute("hidden")):(o.textContent="No additional diagnostics available.",o.setAttribute("hidden",""))),typeof t.showModal=="function")try{t.showModal(),t.setAttribute("open","")}catch{t.setAttribute("open","")}else t.setAttribute("open","")};return i&&i.addEventListener("click",()=>{window.location.reload()}),s&&s.addEventListener("click",()=>l()),t.addEventListener("cancel",u=>{u.preventDefault(),l()}),{open:a,close:l,getElement(){return t}}}var Zy="(max-width: 640px)";function Xi(e){if(typeof window.matchMedia!="function")return e(!1),()=>{};let t=window.matchMedia(Zy),n=!!t.matches;e(n);let r=o=>{let s=!!(typeof o=="object"&&o!==null&&typeof o.matches=="boolean"?o.matches:t.matches);s!==n&&(n=s,e(s))};return typeof t.addEventListener=="function"?(t.addEventListener("change",r),()=>{t.removeEventListener("change",r)}):typeof t.addListener=="function"?(t.addListener(r),()=>{typeof t.removeListener=="function"&&t.removeListener(r)}):()=>{}}function Jy(){return{lanes:{done:!0},areas:{}}}function ks(e){let t={};if(typeof e!="object"||e===null)return t;for(let[n,r]of Object.entries(e))typeof r=="boolean"&&(t[n]=r);return t}function ev(e){try{let t=window.localStorage.getItem(e);if(!t)return null;let n=JSON.parse(t);if(typeof n!="object"||n===null)return null;let r=n;return typeof r.lanes=="object"&&r.lanes!==null?{lanes:ks(r.lanes),areas:ks(r.areas)}:{lanes:ks(r),areas:{}}}catch{return null}}function nf(e,t){try{window.localStorage.setItem(e,JSON.stringify(t))}catch{}}function Zi(e,t=Jy()){let n={lanes:ks(t.lanes),areas:ks(t.areas)},r=ev(e),o={lanes:{...n.lanes,...r?r.lanes:{}},areas:{...n.areas,...r?r.areas:{}}};return{isCollapsed(i){return o.lanes[i]===!0},isAreaCollapsed(i){return o.areas[i]===!0},toggle(i){let s=o.lanes[i]!==!0;return o={...o,lanes:{...o.lanes,[i]:s}},nf(e,o),s},toggleArea(i){let s=o.areas[i]!==!0;return o={...o,areas:{...o.areas,[i]:s}},nf(e,o),s}}}function Ul(e){if(typeof e=="string"&&e.length>0)return e;if(e&&typeof e=="object"){let t=e;if(typeof t.message=="string"&&t.message.length>0)return t.message;if(typeof t.error=="string"&&t.error.length>0)return t.error;if(t.error&&typeof t.error=="object"&&typeof t.error.message=="string")return t.error.message}return"\uC694\uCCAD\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4"}function Ji(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"&&t.length>0):[]}function ea(e){let{transport:t,console_el:n,getLanes:r,getWorkspaces:o,getCrossLanes:i,reproject:s,onCorrection:l,showToast:a,requestRender:u,adoptQueue:d,onDragBegin:p,candidate_drop:_}=e,m=[],y=null,C=!1,R=null,V=null,te=null;function W(){R!==null&&clearTimeout(R),R=setTimeout(()=>{R=null,C=!1},0)}function M(){return i()??null}function I(){let H=new Map,J=o();for(let re of Array.isArray(J)?J:[]){if(!re||typeof re!="object")continue;let fe=re.bead_blocked_by&&typeof re.bead_blocked_by=="object"?re.bead_blocked_by:{};for(let[Se,_e]of Object.entries(fe))Array.isArray(_e)&&H.set(Se,Ji(_e));for(let Se of[...Array.isArray(re.runnable)?re.runnable:[],...Array.isArray(re.session_active)?re.session_active:[]])Se&&typeof Se.bead_id=="string"&&Array.isArray(Se.blocked_by)&&Se.blocked_by.length>0&&H.set(Se.bead_id,Ji(Se.blocked_by))}return H}function L(){let H=new Map,J=new Map,re=o();for(let fe of Array.isArray(re)?re:[]){if(!fe||typeof fe!="object")continue;let Se=fe.bead_blocked_by&&typeof fe.bead_blocked_by=="object"?fe.bead_blocked_by:{};for(let[_e,qe]of Object.entries(Se))Array.isArray(qe)&&H.set(_e,Ji(qe));for(let _e of Array.isArray(fe.runnable)?fe.runnable:[])_e&&typeof _e.bead_id=="string"&&Array.isArray(_e.blocked_by)&&J.set(_e.bead_id,Ji(_e.blocked_by))}for(let fe of m)for(let Se of[H,J]){let _e=Se.get(fe.a);_e!==void 0&&Se.set(fe.a,fe.type==="dep-remove"?_e.filter(qe=>qe!==fe.b):_e.includes(fe.b)?_e:[..._e,fe.b])}return{snapshot:H,runnable:J}}function U(){let H=I();for(let J of m){let re=(H.get(J.a)||[]).slice();J.type==="dep-remove"?H.set(J.a,re.filter(fe=>fe!==J.b)):re.includes(J.b)||H.set(J.a,[...re,J.b])}return H}function Y(H=r(),J=M()){let re=new Map;for(let He of Array.isArray(J?.lanes)?J.lanes:[]){let ee=new Map;for(let Q of Array.isArray(He?.entries)?He.entries:[])Q&&typeof Q.bead_id=="string"&&ee.set(Q.bead_id,Q.dep_created_by_lane===!0);re.set(typeof He?.id=="string"?He.id:"",ee)}let fe=new Map,Se=new Map,_e=new Set,qe=new Set;for(let He of H.chain_lanes){let ee=re.get(He.lane_id);fe.set(He.lane_id,{status:He.status,entries:He.rows.map((Q,xe)=>({bead_id:Q.id,root_dir:Q.root_dir,...xe===0?{}:{dep_created_by_lane:ee?.get(Q.id)===!0}}))});for(let Q of He.rows)Se.set(Q.id,He.lane_id),Q.fixed&&_e.add(Q.id),Q.unplaced||qe.add(Q.id)}let Fe=new Map;for(let He of H.parallel_rows)typeof He.queue_index=="number"&&Fe.set(He.id,He.queue_index);for(let He of H.queue_groups)for(let ee of He.sublanes.serial)for(let Q of ee.items)typeof Q.queue_index=="number"&&Fe.set(Q.id,Q.queue_index);let Ve=L();return{blocked_by_map:U(),snapshot_blocked_by:Ve.snapshot,runnable_blocked_by:Ve.runnable,owner_of:new Map(Object.entries(H.owner_of)),cross_lanes:fe,owner_lane_of:Se,fixed_members:_e,placed_members:qe,parallel_rows:H.parallel_rows.map(He=>({bead_id:He.id,root_dir:He.root_dir,queue_index:He.queue_index??0})),parallel_raw_length:new Map(Object.entries(H.parallel_raw_length)),queue_index_of:Fe}}function q(H,J){let re=r();for(let Se of[...re.runnable,...re.queue,...re.running,...re.pr_wait,...re.done])if(!(Se.non_occupying||Se.id!==J)){if(Se.root_dir===H)return Se.expected_revision;break}let fe=re.queue_groups.find(Se=>Se.root_dir===H);return fe?fe.revision:0}async function N(H,J,re,fe){if(!t)return null;let _e=await t(H,{...J,...re?{root_dir:re}:{},expected_revision:fe});if(_e&&_e.conflict){_e.queue&&d?.(re,_e.queue);let qe=_e.queue&&typeof _e.queue.revision=="number"?_e.queue.revision:fe;_e=await t(H,{...J,...re?{root_dir:re}:{},expected_revision:qe})}return _e&&_e.queue&&d?.(re,_e.queue),_e}async function z(H,J,re,fe,Se){try{let _e=await N(H,J,re,fe.get(re)??q(re,Se.bead_id));return!_e||typeof _e.applied!="boolean"?(a("\uD050 \uC694\uCCAD\uC774 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error"),null):(_e.queue&&typeof _e.queue.revision=="number"&&fe.set(re,_e.queue.revision),_e.conflict?(a("\uD050\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD574 \uC8FC\uC138\uC694","error"),null):_e.applied===!1?(a(_e.admission_reason?`\uD050 \uC801\uC7AC \uAC70\uBD80: ${_e.admission_reason}`:"\uD050 \uC694\uCCAD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4","error"),null):_e.queue&&typeof _e.queue.revision=="number"?_e.queue.revision:fe.get(re)??0)}catch(_e){return a(Ul(_e),"error"),null}}async function G(H,J,re=new Map){if(H.type==="worker-queue-disarm"){try{let fe=await N(H.type,H.payload,H.root_dir,re.get(H.root_dir)??q(H.root_dir,J));fe&&fe.queue&&typeof fe.queue.revision=="number"&&re.set(H.root_dir,fe.queue.revision)}catch{}return!0}if(H.type==="worker-queue-place"||H.type==="worker-queue-reorder"||H.type==="worker-queue-remove")return await z(H.type,H.payload,H.root_dir,re,{bead_id:J})!==null;try{return(H.type==="dep-add"||H.type==="dep-remove")&&t&&await t(H.type,{a:H.a,b:H.b,...H.root_dir?{root_dir:H.root_dir}:{}}),!0}catch(fe){return a(Ul(fe),"error"),!1}}function oe(H){(H.type==="dep-add"||H.type==="dep-remove")&&(m=[...m,{type:H.type,a:H.a,b:H.b}])}async function ye(H,J){if(!t)return{ok:!1};try{let re=await t(H.type,{...H.payload,expected_revision:J});return!re||typeof re.revision!="number"?(a("\uC5F0\uACB0 \uB808\uC778 \uC751\uB2F5\uC5D0 revision\uC774 \uC5C6\uC2B5\uB2C8\uB2E4","error"),{ok:!1}):{ok:!0,revision:re.revision}}catch(re){let fe=re,Se=fe&&fe.code==="conflict"?fe.details?.cross_lanes:null;return Se&&typeof Se.revision=="number"&&Array.isArray(Se.lanes)?{ok:!1,conflict:Se}:(a(Ul(re),"error"),{ok:!1})}}async function Me(H,J,re){let fe=new Map,Se=[],_e=H.ops.slice(0,H.lane_op_index),qe=H.ops.slice(H.lane_op_index);for(let Ve of _e){if(!await G(Ve,re,fe))return{done:!0};oe(Ve)}let Fe=J;for(let Ve of H.lane_ops){if(Fe===null)return a("\uC5F0\uACB0 \uB808\uC778 \uC800\uC7A5\uC18C\uB97C \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error"),{done:!0};let He=await ye(Ve,Fe);if(!He.ok)return He.conflict?{done:!1,conflict:He.conflict}:{done:!0};Fe=He.revision}for(let Ve of qe){if(!await G(Ve,re,fe))return{done:!0};oe(Ve),Ve.type==="dep-add"&&Se.push(Ve)}for(let Ve of Hd(Se))Fe=await F(Ve,Fe);return{done:!0}}async function F(H,J){if(J===null||!t)return J;let re=H.pairs,fe=J;for(let Se=0;Se<2;Se+=1){if(re.length===0)return fe;try{let _e=await t("monitor-lane-provenance",{lane_id:H.lane_id,pairs:re.map(qe=>({bead_id:qe.bead_id,after:qe.after,value:!0})),expected_revision:fe});return _e&&typeof _e.revision=="number"?_e.revision:fe}catch(_e){let qe=_e,Fe=qe&&qe.code==="conflict"?qe.details?.cross_lanes:null;if(!Fe||typeof Fe.revision!="number"||!Array.isArray(Fe.lanes))return fe;let Ve=Fe.lanes.find(He=>He&&He.id===H.lane_id);re=Kd(Array.isArray(Ve?.entries)?Ve.entries:[],re),fe=Fe.revision}}return fe}async function X(H,J,re=[]){m=re,l("",0);let fe=r(),Se=M();for(let _e=0;;_e+=1){let qe=H(Y(fe,Se));if("refused"in qe){a(qe.refused,"error");break}let Fe=await Me(qe,fe.cross_lanes_revision,J);if(Fe.done){qe.correction&&l(qe.correction.lane_id,qe.correction.corrected);break}if(_e>=1){a("\uB808\uC778\uC774 \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4","error");break}let Ve=s(Fe.conflict);fe=Ve.lanes,Se=Ve.raw_lanes}m=[],u()}async function Ae(H,J){await X(re=>Ii(H,J,re),H.bead_id)}function Ee(H,J){let re=J&&typeof J.closest=="function"?J.closest("[data-row-index]"):null;if(re&&H.contains(re)){let fe=Number(re.getAttribute("data-row-index"));return Number.isFinite(fe)?fe:0}return H.querySelectorAll("[data-row-index]").length}function O(H){let J=typeof H?.closest=="function"?H.closest(".worker-pane--collapsed[data-lane]"):null;if(!J)return null;let re=J.getAttribute("data-lane");return re==="queue"?{zone:J,target:{kind:"parallel",marker_index:r().parallel_rows.length}}:re==="candidate"&&_===!0?{zone:J,target:{kind:"candidate"}}:null}function se(H){let J=H.target;if(!y)return null;let re=typeof J?.closest=="function"?J.closest("[data-drop]"):null;if(!re)return O(J);let fe=re.getAttribute("data-drop");if(fe==="candidate")return{zone:re,target:{kind:"candidate"}};if(fe==="parallel")return{zone:re,target:{kind:"parallel",marker_index:Ee(re,J)}};if(fe==="chain")return{zone:re,target:{kind:"chain",lane_id:re.getAttribute("data-lane-id")||"",marker_index:Ee(re,J)}};if(fe==="repo-serial"){let Se=re.getAttribute("data-root-dir")||"";if(Se!==y.root_dir)return null;let _e=typeof J?.closest=="function"?J.closest("[data-queue-index]"):null,qe=_e&&re.contains(_e)?_e.getAttribute("data-queue-index"):re.getAttribute("data-lane-length"),Fe=Number(qe);return{zone:re,target:{kind:"repo-serial",root_dir:Se,lane_id:re.getAttribute("data-lane-id")||"",index:Number.isFinite(Fe)?Fe:0}}}return null}function be(){for(let H of Array.from(n.querySelectorAll(".is-drop-over")))H.classList.remove("is-drop-over")}function ve(H){V=H.target instanceof Element?H.target:null}function Pe(H){let J=H.target,re=typeof J?.closest=="function"?J.closest('[draggable="true"][data-bead-id]'):null,fe=re?re.closest("[data-drag-kind]"):null;if(!fe)return;if(re&&V&&re.contains(V)&&typeof V.closest=="function"&&V.closest("input, button, a")){H.preventDefault();return}let Se=fe.getAttribute("data-bead-id")||"",_e=fe.getAttribute("data-drag-kind")||"",qe=fe.getAttribute("data-root-dir")||"";if(!Se||!_e)return;let Fe=fe.getAttribute("data-queue-index")||"",Ve=Number(Fe),He=fe.getAttribute("data-lane-id")||"";y={kind:_e,bead_id:Se,root_dir:qe,...Fe!==""&&Number.isFinite(Ve)?{queue_index:Ve}:{},...He?{lane_id:He}:{}},C=!0,p?.(),n.classList.add("is-dragging");try{H.dataTransfer?.setData("text/plain",Se),H.dataTransfer&&(H.dataTransfer.effectAllowed="move")}catch{}}function he(H){let J=se(H);J&&(H.preventDefault(),H.dataTransfer&&(H.dataTransfer.dropEffect="move"),J.zone.classList.add("is-drop-over"))}function Re(H){let J=H.target;typeof J?.closest=="function"&&(J.closest("[data-drop]")?.classList.remove("is-drop-over"),J.closest(".worker-pane--collapsed")?.classList.remove("is-drop-over"))}function Xe(){y=null,be(),n.classList.remove("is-dragging"),W()}function dt(H){let J=se(H),re=y;y=null,be(),n.classList.remove("is-dragging"),!(!J||!re)&&(H.preventDefault(),Ae(re,J.target))}return{attach(H){te||(te=H,H.addEventListener("pointerdown",ve),H.addEventListener("dragstart",Pe),H.addEventListener("dragover",he),H.addEventListener("dragleave",Re),H.addEventListener("drop",dt),H.addEventListener("dragend",Xe))},detach(){R!==null&&(clearTimeout(R),R=null);let H=te;te=null,H&&(H.removeEventListener("pointerdown",ve),H.removeEventListener("dragstart",Pe),H.removeEventListener("dragover",he),H.removeEventListener("dragleave",Re),H.removeEventListener("drop",dt),H.removeEventListener("dragend",Xe))},isDragging(){return y!==null},consumeClickSuppression(){let H=C;return C=!1,H},applyDrop:Ae,runPlanned:X,dropModel:Y,sendOp:G,sendQueueCas:z,rememberDep:oe}}var Wl=Object.freeze({repo_ops_worktree_unowned:"\uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC\uAC00 \uC544\uC9C1 Worker \uC18C\uC720\uAC00 \uC544\uB2C8\uC5B4\uC11C \uC2A4\uD06C\uB9BD\uD2B8 \uC2E4\uD589 \uC804\uC5D0 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4.",verify_cmd_failed:"\uBA38\uC9C0 \uD6C4 \uAC80\uC99D \uBA85\uB839\uC774 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",gh_observation_failed:"GitHub\uC5D0\uC11C PR \uC0C1\uD0DC\uB97C \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",verify_script_failure:"\uAC80\uC99D \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",deploy_script_failure:"\uBC30\uD3EC \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",interrupted_without_terminal_exit:"\uC791\uC5C5\uC774 \uC885\uB8CC \uAE30\uB85D \uC5C6\uC774 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4.",manual_target_missing:"\uC218\uB3D9 \uBC30\uD3EC \uAE30\uB85D\uC5D0 \uD540\uB41C \uB300\uC0C1 SHA\uAC00 \uC5C6\uC5B4 \uC2E4\uD589\uD558\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4.",bootstrap_not_approved:"\uCCAB [deploy] \uC120\uC5B8\uC740 \uC0AC\uB78C \uC2B9\uC778 \uC5C6\uC774 \uC2E4\uD589\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4. Worker \uC124\uC815\uC758 [\uBC30\uD3EC \uC2E4\uD589]\uC73C\uB85C \uC6D0\uACA9 base tip\uC744 \uD55C \uBC88 \uBC30\uD3EC\uD55C \uB4A4 [\uC815\uC0B0 \uC7AC\uAC1C]\uB97C \uB204\uB974\uC138\uC694 \u2014 \uADF8 \uB4A4 \uBA38\uC9C0\uBD80\uD130\uB294 \uC790\uB3D9 \uBC30\uD3EC\uB429\uB2C8\uB2E4.",base_unresolved:"PR\uC774 \uC5B4\uB290 base \uBE0C\uB79C\uCE58\uB85C \uBA38\uC9C0\uB418\uB294\uC9C0 \uD655\uC815\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_ref_unobserved:"PR\uC758 base \uBE0C\uB79C\uCE58\uB97C \uC544\uC9C1 \uAD00\uCE21\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",merge_sha_unobserved:"\uBA38\uC9C0 \uCEE4\uBC0B SHA\uB97C \uC544\uC9C1 \uAD00\uCE21\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_fetch_failed:"\uC6D0\uACA9 base \uBE0C\uB79C\uCE58\uB97C fetch\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_rev_unavailable:"fetch\uD55C \uC6D0\uACA9 base \uBE0C\uB79C\uCE58\uC758 \uCEE4\uBC0B\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_ff_diverged:"\uB85C\uCEEC base \uBE0C\uB79C\uCE58\uAC00 \uC6D0\uACA9\uACFC \uAC08\uB77C\uC838 fast-forward\uB85C \uC815\uB82C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",deployment_target_not_covering_merge:"\uBC30\uD3EC \uB300\uC0C1 base\uAC00 \uC774 \uBA38\uC9C0 \uCEE4\uBC0B\uC744 \uD3EC\uD568\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.",deployment_candidate_ancestry_check_failed:"\uBC30\uD3EC \uB300\uC0C1 base\uAC00 \uC774 \uBA38\uC9C0 \uCEE4\uBC0B\uC744 \uD3EC\uD568\uD558\uB294\uC9C0 \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",verify_red:"\uBA38\uC9C0 \uD6C4 \uAC80\uC99D\uC774 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",cleanup_failed:"\uBA38\uC9C0 \uD6C4 \uC815\uB9AC\uAC00 \uB05D\uB098\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",retry_exhausted:"\uC790\uB3D9 \uC7AC\uC2DC\uB3C4\uB97C \uBAA8\uB450 \uC4F0\uACE0\uB3C4 \uAC19\uC740 \uC2E4\uD328\uAC00 \uC774\uC5B4\uC84C\uC2B5\uB2C8\uB2E4.",conflict_unresolved:"\uCDA9\uB3CC \uD574\uC18C\uAC00 \uB05D\uB098\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",internal_record_failed:"Worker \uB0B4\uBD80 \uAE30\uB85D\uC774 \uC2E4\uD328\uD574 \uC9C4\uD589\uC744 \uBA48\uCDC4\uC2B5\uB2C8\uB2E4.",foreign_landing_unpinned:"\uB2E4\uB978 \uC800\uC7A5\uC18C \uCC29\uC9C0\uC778\uB370 foreign_repo\xB7foreign_path\xB7foreign_base \uD540\uC774 \uC5C6\uAC70\uB098 \uD615\uC2DD\uC774 \uD2C0\uB9BD\uB2C8\uB2E4.",foreign_checkout_unavailable:"\uD540\uB41C \uB300\uC0C1 \uC800\uC7A5\uC18C \uCCB4\uD06C\uC544\uC6C3\uC774 \uC5C6\uAC70\uB098 foreign_repo\uC640 \uAC19\uC740 URL\uC758 remote\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4.",foreign_deploy_unsupported:"\uB300\uC0C1 \uC800\uC7A5\uC18C\uAC00 [deploy]\uB97C \uC120\uC5B8\uD574 Worker\uAC00 \uBC30\uD3EC \uC99D\uAC70\uB97C \uB9CC\uB4E4 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4. \uC138\uC158\uC774 \uBC30\uD3EC\uC640 \uB9C8\uAC10\uC744 \uC18C\uC720\uD569\uB2C8\uB2E4.",repair_lane_retired:"\uC790\uB3D9 \uC218\uB9AC \uB808\uC778\uC774 \uC740\uD1F4\uD574 \uC0AC\uB78C \uCC98\uB9AC\uB85C \uB118\uC5B4\uC654\uC2B5\uB2C8\uB2E4."});var rf={verify_failed:"\uAC80\uC99D \uC2E4\uD328",verify_cmd_failed:"\uAC80\uC99D \uC2E4\uD328",verify_script_failure:"\uAC80\uC99D \uC2E4\uD328",deploy_failed:"\uBC30\uD3EC \uC2E4\uD328",deploy_script_failure:"\uBC30\uD3EC \uC2E4\uD328",job_script_failure:"\uC7A1 \uC2E4\uD328",interrupted_without_terminal_exit:"\uC911\uB2E8\uB428",quickfix_landing_failed:"\uCC29\uC9C0 \uC2E4\uD328",runner_exit:"\uC138\uC158 \uC2E4\uD328",session_parked:"\uC138\uC158 \uB300\uAE30",session_ended_unresolved:"\uC138\uC158 \uC885\uB8CC",prerequisite_unmet:"\uC120\uD589 \uB300\uAE30",delivery_unproven:"\uCC29\uC9C0 \uC99D\uAC70 \uBD80\uC871"},of={overloaded_529:"Claude API \uACFC\uBD80\uD558(529)\uB85C \uBCF4\uB958",rate_limited_429:"Claude API \uC694\uCCAD \uD55C\uB3C4(429)\uB85C \uBCF4\uB958"},sf={"session_hard_stop:failure":"\uC138\uC158\uC774 \uC2E4\uD328\uB97C \uBCF4\uACE0\uD558\uACE0 \uC885\uB8CC","session_hard_stop:environment":"\uC138\uC158\uC774 \uD658\uACBD \uC624\uB958\uB97C \uBCF4\uACE0\uD558\uACE0 \uC885\uB8CC","resume_failed:transcript_missing":"\uC774\uC5B4\uD558\uAE30 \uB300\uC0C1 \uC138\uC158 \uAE30\uB85D\uC774 \uC5C6\uC74C \u2014 \uC0C8 \uC138\uC158\uC73C\uB85C \uB300\uCCB4"};function tv(e){return typeof e!="number"||!Number.isFinite(e)?"":new Date(e).toLocaleTimeString("ko-KR",{hour:"2-digit",minute:"2-digit"})}function nv(e,t){if(typeof e!="string"||!e.startsWith("provider_outage:"))return null;let n=e.slice(16);if(n==="usage_limit"){let o=t&&typeof t=="object"?t.resets_at:null,i=tv(o);return i?`\uACC4\uC815 \uC0AC\uC6A9 \uD55C\uB3C4\uB85C \uBCF4\uB958 \u2014 \uB9AC\uC14B ${i}`:"\uACC4\uC815 \uC0AC\uC6A9 \uD55C\uB3C4\uB85C \uBCF4\uB958"}if(Object.hasOwn(of,n))return of[n];let r=/^http_(5\d\d)$/.exec(n);return r?`Claude API \uC624\uB958(${r[1]})\uB85C \uBCF4\uB958`:null}function na(e){return typeof e!="string"||e.length===0?[]:e.split(":").filter(t=>t.length>0)}function ta(e){for(let t of na(e)){if(Object.hasOwn(rf,t))return rf[t];if(t.startsWith("session_"))return"\uC138\uC158 \uC2E4\uD328"}return null}function lf(e){return na(e).length===0?null:ta(e)||"\uC2E4\uD328"}function zr(e){let t=null;for(let n of na(e))Object.hasOwn(Wl,n)&&(t=Wl[n]);return t}function wr(e,t){if(typeof e=="string"&&Object.hasOwn(sf,e))return sf[e];let n=nv(e,t);if(n!==null)return n;let r=ta(e),o=zr(e);return r&&o?`${r} \u2014 ${o}`:r||o?r||o:typeof e=="string"?e:""}function cf(e,t){let n=ta(e)??ta(t),r=zr(t)??zr(e);return n&&r?`${n} \u2014 ${r}`:n||r?n||r:typeof t=="string"?t:""}var rv=new Set(["repo_operation_timeout_unresolved"]);function ov(e){for(let t of na(e))if(rv.has(t)||t.startsWith("repo_ops_"))return!0;return!1}function sv(e,t){return t.code==="interrupted"||t.interrupted===!0||e.failure_kind==="interrupted_without_terminal_exit"||t.code==="interrupted_without_terminal_exit"}function uf(e,t){if(!e||typeof e!="object")return"";let n=e.failure;if(!n||typeof n!="object"||ov(n.code))return"";if(n.code==="timeout"){let o=Number(t);return Number.isFinite(o)&&o>0?`\uD0C0\uC784\uC544\uC6C3 ${Math.round(o/1e3)}\uCD08 \uCD08\uACFC`:"\uD0C0\uC784\uC544\uC6C3 \uCD08\uACFC"}if(sv(e,n))return"\uC885\uB8CC \uAE30\uB85D \uC5C6\uC74C \u2014 \uC911\uB2E8\uB428";let r=typeof e.elapsed_ms=="number"&&Number.isFinite(e.elapsed_ms)&&e.elapsed_ms>=0?` \xB7 ${jr(e.elapsed_ms)}`:"";return typeof e.signal=="string"&&e.signal.length>0?`signal ${e.signal}${r}`:Number.isInteger(e.exit_code)?`exit ${e.exit_code}${r}`:""}var af={schema_unsupported:"\uD540\uB41C \uC815\uCC45 \uC2A4\uD0A4\uB9C8\uB97C \uC9C0\uC6D0\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4."};function df(e){if(!e||typeof e!="object")return"";let t=e.retry;if(!t||typeof t!="object")return"";if(typeof t.blocked_reason=="string"&&t.blocked_reason)return`\uC790\uB3D9 \uC7AC\uC2DC\uB3C4 \uBABB \uD568 \u2014 ${Object.hasOwn(af,t.blocked_reason)?af[t.blocked_reason]:t.blocked_reason}`;if(t.status==="absorbed"){let n=t.absorbed&&typeof t.absorbed=="object"?t.absorbed:null,r=wr(n?.first_failure?.code);return r?`\uC790\uB3D9 \uC7AC\uC2DC\uB3C4\uB85C \uD574\uC18C\uB428 \u2014 \uCCAB \uC2E4\uD328: ${r}`:"\uC790\uB3D9 \uC7AC\uC2DC\uB3C4\uB85C \uD574\uC18C\uB428"}if(e.state!=="failed")return"";if(t.status==="not_applicable")return"\uC7AC\uC2DC\uB3C4 \uB300\uC0C1 \uC544\uB2D8 \u2014 \uC2A4\uD06C\uB9BD\uD2B8 \uC2E4\uD589 \uC804 \uC2E4\uD328";if(t.status==="consumed"){let n=typeof t.first_fingerprint=="string"&&t.first_fingerprint?t.first_fingerprint:null;if(n===null)return"";if(n===e.failure?.fingerprint)return"\uC790\uB3D9 \uC7AC\uC2DC\uB3C4 1\uD68C \u2014 \uAC19\uC740 \uC2E4\uD328";let r=wr(t.first_failure?.code);return r?`\uC790\uB3D9 \uC7AC\uC2DC\uB3C4 1\uD68C \u2014 \uB2E4\uB978 \uC2E4\uD328: ${r}`:"\uC790\uB3D9 \uC7AC\uC2DC\uB3C4 1\uD68C \u2014 \uB2E4\uB978 \uC2E4\uD328"}return""}function iv(e){if(!Number.isFinite(e)||e<0)return"0s";let t=Math.floor(e/1e3),n=Math.floor(t/60),r=t%60;return n>0?`${n}m ${String(r).padStart(2,"0")}s`:`${r}s`}var pf=200;function av(e){return typeof e!="string"||e.length===0?"":e.length>pf?`${e.slice(0,pf)}\u2026`:e}function lv(e){let t=e&&e.attempts>0&&e.max>0?` ${e.attempts}/${e.max}`:"",n=e&&typeof e.next_at=="number"?` \xB7 ${new Date(e.next_at).toLocaleTimeString("ko-KR",{hour:"2-digit",minute:"2-digit"})}`:"";return`\u21BB \uC7AC\uC2DC\uB3C4 \uB300\uAE30${t}${n}`}function zl(e){return typeof e!="number"||!Number.isFinite(e)?"":new Date(e).toLocaleTimeString("ko-KR",{hour:"2-digit",minute:"2-digit"})}function cv(e){if(!e)return"";let t=e.auto_resume==="disarmed"?" \xB7 \uC218\uB3D9 \uC870\uCE58":"";if(e.kind==="usage_limit"){let r=zl(e.resets_at);if(!r)return`\u23F3 \uD55C\uB3C4 \uB300\uAE30 \xB7 \uB9AC\uC14B \uBBF8\uC0C1${t}`;let o=e.target?.account_alias||e.target?.account||"";return`\u23F3 \uD55C\uB3C4 \uB300\uAE30 ${r}${o?` \xB7 ${o}`:""}${t}`}let n=zl(e.next_probe_at);return`\u26A0\uFE0F \uACF5\uAE09\uC790 \uC7A5\uC560${n?` \xB7 \uB2E4\uC74C \uD504\uB85C\uBE0C ${n}`:""}${t}`}function _f(e){if(!e)return"";let t=Array.isArray(e.timeline)?e.timeline:[],n=typeof e.log_path=="string"?e.log_path:"",r=e.log_expired===!0,o=e.log_unreadable===!0;return t.length===0&&n.length===0&&!r&&!o?"":c`${t.length>0?c`<ol class="rtile__history" data-seam="tile-timeline">
        ${t.map(i=>c`<li class="rtile__history-row">
              ${ff(i.at)?c`<span class="rtile__history-at"
                    >${ff(i.at)}</span
                  >`:""}<span class="rtile__history-summary">${i.summary}</span>
            </li>`)}
      </ol>`:""}${o?c`<p
        class="rtile__history-log"
        data-seam="tile-log-path"
        title="로그 파일을 읽을 수 없습니다 — 삭제된 것이 아닙니다"
      >
        읽기 실패
      </p>`:r?c`<p
          class="rtile__history-log"
          data-seam="tile-log-path"
          title="180일 보존 정책으로 삭제됨"
        >
          만료됨
        </p>`:n.length>0?c`<p class="rtile__history-log" data-seam="tile-log-path">
            ${qr(n)}
          </p>`:""}`}function ff(e){return typeof e!="number"||!Number.isFinite(e)?"":new Date(e).toLocaleTimeString("ko-KR",{hour:"2-digit",minute:"2-digit"})}function uv(e,t){if(!e||e.open!==!0)return"";let n=zr(e.cause)||wr(e.cause,e.cause_detail),r=e.retry&&e.retry.attempts>0?`\uC790\uB3D9 \uC7AC\uC2DC\uB3C4 ${e.retry.attempts}\uD68C \u2014 \uAC19\uC740 \uC624\uB958`:"",o=e.cause_detail,i=e.quickfix_lane&&e.quickfix_landing?e.quickfix_landing:null,s=i?[i.cursor||null,typeof i.head_sha=="string"?i.head_sha.slice(0,7):null,i.reason||null].filter(Boolean).join(" \xB7 "):"",l=typeof e.finished_at=="number"?`${new Date(e.finished_at).toLocaleString("ko-KR")} \xB7 ${mn(e.finished_at,t)}`:"",a=[e.runner,e.model,e.observed_effort??e.effort,e.speed].filter(_=>typeof _=="string"&&_.length>0).join(" \xB7 "),u=e.usage?.total_cost_usd,d=typeof u=="number"&&Number.isFinite(u)?`$${u.toFixed(2)}`:"",p=_f(e);return c`<div
    class="rtile__failure-pop"
    role="dialog"
    aria-label="실패 상세"
  >
    <dl class="rtile__failure-kv">
      ${e.summary?c`<div>
            <dt>보고</dt>
            <dd>${e.summary}</dd>
          </div>`:""}
      ${p?c`<div>
            <dt>이력</dt>
            <dd>${p}</dd>
          </div>`:""}
      ${n?c`<div>
            <dt>원인</dt>
            <dd>${n}</dd>
          </div>`:""}
      ${r?c`<div>
            <dt>재시도 이력</dt>
            <dd>${r}</dd>
          </div>`:""}
      ${e.cause?c`<div>
            <dt>실패 코드</dt>
            <dd><code>${e.cause}</code></dd>
          </div>`:""}
      ${o?.reason?c`<div>
            <dt>가드/원인</dt>
            <dd>${o.reason}</dd>
          </div>`:""}
      ${o?.command?c`<div>
            <dt>명령</dt>
            <dd><code>${o.command}</code></dd>
          </div>`:""}
      ${s?c`<div>
            <dt>착지 단계</dt>
            <dd>${s}</dd>
          </div>`:""}
      ${l?c`<div>
            <dt>실패 시각</dt>
            <dd>${l}</dd>
          </div>`:""}
      ${a?c`<div>
            <dt>실행</dt>
            <dd>${a}</dd>
          </div>`:""}
      ${e.attempt_id?c`<div>
            <dt>attempt id</dt>
            <dd>
              <code>${e.attempt_id}</code>
              <button
                type="button"
                class="rtile__attempt-copy"
                data-attempt-id=${e.attempt_id}
                title="attempt id 복사"
                aria-label="attempt id 복사"
              >
                ⧉
              </button>
            </dd>
          </div>`:""}
      ${d?c`<div>
            <dt>비용</dt>
            <dd>${d}</dd>
          </div>`:""}
      <div>
        <dt>재개</dt>
        <dd>
          ${e.resume_eligible?"\uC774\uC5B4\uD558\uAE30 \uAC00\uB2A5":e.resume_reason||"\uC774\uC5B4\uD558\uAE30 \uBD88\uAC00"}
        </dd>
      </div>
    </dl>
    ${e.attempt_id?c`<button
          type="button"
          class="rtile__session"
          title="실패 세션 열기"
          aria-label="실패 세션 열기"
        >
          ▤ 세션
        </button>`:""}
    ${e.landed?c`<p class="rtile__failure-landed">
          이미 base에 착지됨 — 이어하기로 배포·정리를 재개
        </p>`:""}
  </div>`}function dv(e){return e==="pending"?"\uD68C\uBCF5 \uD6C4 \uC790\uB3D9 \uC7AC\uAC1C \uB300\uAE30":e==="disarmed"?"\uC790\uB3D9 \uC7AC\uAC1C \uC18C\uC9C4 \xB7 \uC218\uB3D9 \uC870\uCE58 \uD544\uC694":typeof e=="string"&&e.startsWith("refused:")?`\uC790\uB3D9 \uC7AC\uAC1C \uAC70\uBD80 \xB7 ${e.slice(8)}`:""}function pv(e){return e==="none"?"\uACC4\uC815 \uC804\uD658 \uC548 \uD568 \xB7 \uC870\uAC74\uC744 \uB9CC\uC871\uD558\uB294 \uB2E4\uB978 \uACC4\uC815 \uC5C6\uC74C":e==="disabled"?"\uACC4\uC815 \uC804\uD658 \uC548 \uD568 \xB7 \uC790\uB3D9 \uC804\uD658 \uAEBC\uC9D0":""}function fv(e){if(!e||e.open!==!0)return"";let t=[e.target?.model,e.target?.account_alias||e.target?.account].filter(i=>typeof i=="string"&&i.length>0).join(" \xB7 "),n=zl(e.resets_at),r=dv(e.auto_resume),o=pv(e.auto_switch);return c`<div
    class="rtile__failure-pop rtile__provider-hold-pop"
    role="dialog"
    aria-label="공급자 보류 상세"
  >
    <strong class="rtile__provider-hold-note">작업 실패 아님</strong>
    <dl class="rtile__failure-kv">
      ${e.summary?c`<div>
            <dt>보고</dt>
            <dd>${e.summary}</dd>
          </div>`:""}
      ${e.message?c`<div>
            <dt>원문</dt>
            <dd>${e.message}</dd>
          </div>`:""}
      ${t?c`<div>
            <dt>타깃</dt>
            <dd>${t}</dd>
          </div>`:""}
      ${n?c`<div>
            <dt>리셋</dt>
            <dd>${n}</dd>
          </div>`:""}
      ${r?c`<div>
            <dt>자동 재개</dt>
            <dd>${r}</dd>
          </div>`:""}
      ${o?c`<div>
            <dt>계정 전환</dt>
            <dd>${o}</dd>
          </div>`:""}
      ${e.log_path?c`<div>
            <dt>로그</dt>
            <dd>${qr(e.log_path)}</dd>
          </div>`:""}
    </dl>
  </div>`}function _v(e){return!e||!e.repo&&!e.serial_lane_id?"":c`${e.repo?c`<span
        class="worker-card__repo rtile__repo"
        title=${e.root_dir||""}
        >${e.repo}</span
      >`:""}${e.serial_lane_id?c`<span class="rtile__lane">${e.serial_lane_id}</span>`:""}`}var mv=new Set(["codex-runner"]);function gv(e,t,n,r=null){if(!e)return"";let o=e.last_activity||null,i=o&&typeof o.text=="string"?o.text:"",s=o&&typeof o.at=="number"?o.at:null,l=(r||!Array.isArray(e.legs)?[]:e.legs).filter(m=>m&&!(typeof m.agent_type=="string"&&mv.has(m.agent_type))),a=l.filter(m=>m&&m.state==="live"),u=l.filter(m=>m&&m.state!=="live"),d=r&&typeof r.last_event_at=="number"?mn(r.last_event_at,t):"",p=r?mn(r.updated_at,t):"",_=d?`\uCD5C\uADFC \uD65C\uB3D9 ${d}`:p?`\uAC31\uC2E0 ${p}`:"";return c`${i?c`<div class="rtile__activity${n?" is-paused":""}">
        <span class="rtile__activity-dot" aria-hidden="true"></span>
        <span class="rtile__activity-text">${i}</span>
        ${s!==null?c`<span class="rtile__activity-age"
              >${mn(s,t)}</span
            >`:""}
      </div>`:_?c`<div class="rtile__activity rtile__activity--session">
          <span class="rtile__activity-dot" aria-hidden="true"></span>
          <span class="rtile__activity-text">${_}</span>
        </div>`:""}${a.length>0||u.length>0?c`<div class="rtile__legs">
        ${a.map(m=>c`<span
              class="rtile__leg rtile__leg--live"
              title="이 세션이 띄운 서브에이전트/Codex 세션이 실행 중입니다"
              >위임 중 · ${m.label}</span
            >`)}${u.length>0?c`<span
              class="rtile__leg rtile__leg--done"
              title=${`\uC644\uB8CC\uB41C \uC704\uC784: ${u.map(m=>m.label).join(", ")}`}
              >위임 완료 ${u.length}</span
            >`:""}
      </div>`:""}`}var hv={remote:"\uB2E4\uB978 \uBA38\uC2E0 \uC138\uC158 \u2014 \uC774 \uC11C\uBC84\uC5D0 transcript \uC5C6\uC74C",missing:"transcript \uD30C\uC77C \uC5C6\uC74C"};function bv(e){if(!e)return"";let t=hv[e.locality]||"";return c`<button
    type="button"
    class="rtile__session"
    ?disabled=${t.length>0}
    title=${t||"\uB77C\uC774\uBE0C \uC138\uC158 \uC5F4\uAE30"}
    aria-label="라이브 세션 열기"
  >
    ▤ 세션
  </button>`}function yv(e,t,n,r=""){if(e==="provider_hold")return c`<div class="rtile__foot">
      <button
        type="button"
        class="op-btn rtile__resume"
        title="같은 세션으로 이어서 진행"
        aria-label="이어하기"
      >
        ↻ 이어하기
      </button>
      <button
        type="button"
        class="op-btn rtile__resume-alternate"
        title="러너·모델·계정을 바꾸거나 새 세션으로 이어갑니다"
        aria-label="다른 방법으로"
      >
        ⋯ 다른 방법으로
      </button>
      ${n}
    </div>`;if(e==="retry_wait")return n?c`<div class="rtile__foot">${n}</div>`:"";let o=av(t?.summary);if(e==="waiting")return c`${o?c`<p class="rtile__held-summary">${o}</p>`:""}${r}
      <div class="rtile__foot">${n}</div>`;let i=_f(t);return c`${o?c`<p class="rtile__held-summary">${o}</p>`:""}${i}
    <div class="rtile__foot">
      <button
        type="button"
        class="rtile__parked-retry"
        title="이 bead를 새 attempt로 다시 디스패치합니다 (같은 세션을 잇지 않습니다)"
        aria-label="재시도"
      >
        재시도
      </button>
      ${n}
    </div>`}function Hl(e,t,n=null,r={}){let o=e.kind==="session",i=o&&Array.isArray(e.session_refs)&&e.session_refs.find(Se=>Se&&Se.current===!0)||null,s=e.failed===!0,l=s&&e.failure||null,a=e.parked===!0&&!s,u=e.retry_wait===!0&&!s&&!a,d=e.waiting===!0&&!s&&!a&&!u,p=e.provider_hold===!0&&!s&&!a&&!u&&!d,_=a&&e.failure||null,m=d&&e.wait||null,y=p&&e.hold||null,C=a||u||d||p,R=!!e.paused,V=s||C?e.status_label||(a?"\uC138\uC158 \uB300\uAE30":u?"\uC7AC\uC2DC\uB3C4 \uB300\uAE30":d?"\uC120\uD589 \uB300\uAE30":p?"\uACF5\uAE09\uC790 \uBCF4\uB958":e.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328"):R?"\uC77C\uC2DC\uC815\uC9C0":typeof e.started_at=="number"?iv(t-e.started_at):"\u2014",te=e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker)?e.exec_chips:null,W=Do(e),M=un(e.usage),I=tr(e.usage),L=e.conflict_resolution?R?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":"\uCDA9\uB3CC \uD574\uC18C":null,U=e.base_exception||null,Y=e.landing,q=e.attempt_id&&e.attempt_id===n,N=r.monitor||null,z=_v(N),G=bi(N?.cross_lane_chip),oe=N?hi(N.dependency_chips):"",ye=gv(N,t,R,o?{updated_at:e.updated_at??null,last_event_at:i&&i.locality==="local"?i.last_event_at:null}:null),Me=o&&e.workflow?.chips?.exec_receipt||null,F=yi(e.workflow),X=vi(e.rec,e.chip_popover?.chip_key==="rec"),Ae=e.chip_popover?uo(e.chip_popover.content):"",Ee=Me?c`<span
        class="ctl-chip ctl-chip--exec-receipt"
        title=${`exec_receipt ${er(Me)}`}
        >${`${Me.kind}:${zs(Me)}`}</span
      >`:"",O=i?c`<span
        class="ctl-chip ctl-chip--sref"
        title=${`${i.provider}:${i.session_id}@${i.host}${(e.session_refs||[]).length>=2?` \xB7 \uC774\uB825 ${(e.session_refs||[]).length}`:""}`}
        >${Po(i)}</span
      >`:"",se=z||G||F||O||Ee||X?c`<div class="rtile__meta">
          ${z}${G}${F}${O}${Ee}${X}${Ae}
        </div>`:"",be=l?c`<button
          type="button"
          class="rtile__failure-badge"
          data-attempt-id=${l.attempt_id}
          aria-expanded=${l.open===!0?"true":"false"}
          aria-label="실패 상세"
        >
          ⛔ ${lf(l.cause)||"\uC2E4\uD328"}
        </button>
        ${l.halted_auto_advance?c`<span class="rtile__auto-halted">자동 진행 꺼짐</span>`:""}`:"",ve=a?c`<span
        class="rtile__held-badge"
        title="세션이 사용자 결정을 기다리며 정상 종료했습니다 — 큐는 계속 갑니다"
        >⏸ 세션 대기</span
      >`:u?c`<span
          class="rtile__held-badge"
          title="환경성 실패의 자동 재시도를 기다립니다 — 사람이 할 일은 없습니다"
          >${lv(e.retry)}</span
        >`:d?c`<span
            class="rtile__held-badge"
            title="세션이 선행 미충족으로 착수를 거부했습니다 — 선행이 닫히면 저절로 다시 돕니다"
            >⛓ 선행 대기</span
          >`:p&&y?c`<button
              type="button"
              class="rtile__held-badge rtile__provider-hold-badge"
              data-attempt-id=${e.attempt_id}
              aria-expanded=${y.open===!0?"true":"false"}
              aria-label="공급자 보류 상세"
            >
              ${cv(y)}
            </button>`:"",Pe=c`${L?c`<span class="worker-mini__badge">${L}</span>`:""}${U?c`<span
        class="worker-mini__badge"
        title="이 세션의 target base가 워크스페이스 선언 base와 다릅니다"
        >${U}</span
      >`:""}${be}${ve}`,he=o?"":bo(e),Re=si(l?.quickfix_landing),Xe=Re==="settlement"?"\uC815\uC0B0 \uC7AC\uAC1C":"\uC774\uC5B4\uD558\uAE30",dt=Re==="settlement"?"\uCC29\uC9C0 \uC815\uC0B0\uC744 \uB2E4\uC2DC \uC2E4\uD589":"\uAC19\uC740 \uC138\uC158\uC73C\uB85C \uC774\uC5B4\uC11C \uC9C4\uD589",H=e.resolve_action?c`<button
        type="button"
        class="rtile__resolve"
        ?disabled=${e.resolve_enabled===!1}
        title=${e.resolve_title||"\uC774 \uC2E4\uD328\uB97C \uC0AC\uB78C\uC774 \uC774\uC5B4\uBC1B\uB294 \uB300\uD654\uD615 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4"}
        aria-label="세션에서 해결"
      >
        세션에서 해결
      </button>`:"",J=e.discard?.action&&!(s&&l?.landed===!0)?c`<button
          type="button"
          class="rtile__discard"
          data-operation-id=${e.discard.operation?.operation_id||""}
          data-confirmation=${l?.confirmation||"unmerged"}
          ?disabled=${!e.discard.enabled}
          title=${e.discard.title}
          aria-label=${e.discard.label}
        >
          ${e.discard.label}
        </button>`:"",re=J&&e.discard?.abandon?.action===!0?c`<button
          type="button"
          class="rtile__discard-abandon"
          data-operation-id=${e.discard.operation?.operation_id||""}
          data-operation-kind=${e.discard.operation?.kind||""}
          data-last-error=${e.discard.error||""}
          title=${e.discard.abandon.title}
          aria-label=${e.discard.abandon.label}
        >
          ${e.discard.abandon.label}
        </button>`:"",fe=re?c`${J}${re}`:J;return c`<div
    class="rtile${q?" rtile--sel":""}${R?" rtile--paused":""}${s?" rtile--failed rtile--compact":""}${C?" rtile--held rtile--compact":""}${a?" rtile--parked":""}${u?" rtile--retry-wait":""}${d?" rtile--waiting":""}${o?" rtile--session":""}${p?" rtile--provider-hold":""}${e.search_match===!1?" is-dimmed":""}"
    data-bead-id=${e.bead_id}
    data-attempt-id=${e.attempt_id||""}
  >
    <div class="rtile__hd">
      <span
        class="rtile__dot${o?" rtile__dot--session":""}"
        aria-hidden="true"
      ></span>
      <span class="rtile__id" title="클릭하면 ID 복사">${e.bead_id}</span>
      ${ki(e.priority)}${W?c`<span class="rtile__resumed" title=${W}>↻</span>`:""}${Pe}
      <div class="rtile__hd-actions">
        ${o?c`${typeof e.started_at=="number"?c`<span class="rtile__elapsed">${V}</span>`:""}${bv(i)}<span
                class="rtile__session-badge"
                title="Worker가 아닌 세션이 in_progress로 잡은 이슈"
                >세션</span
              >`:c`<span class="rtile__elapsed">${V}</span>`}
        ${o||C?"":s?c`<button
                  type="button"
                  class="op-btn rtile__resume"
                  data-resume-kind=${Re}
                  ?disabled=${l?.resume_eligible===!1}
                  title=${l?.resume_eligible===!1?l.resume_reason||`${Xe} \uBD88\uAC00`:dt}
                  aria-label=${Xe}
                >
                  ↻ ${Xe}
                </button>
                ${fe}`:c`<button
                  type="button"
                  class="rtile__session"
                  title="라이브 세션 열기"
                  aria-label="라이브 세션 열기"
                >
                  ▤ 세션
                </button>
                ${R?c`<button
                      type="button"
                      class="op-btn rtile__resume"
                      title="같은 세션으로 이어서 재개"
                      aria-label="재개"
                    >
                      ▶ 재개
                    </button>`:c`<button
                      type="button"
                      class="rtile__pause"
                      ?disabled=${e.can_pause===!1}
                      title=${e.can_pause===!1?"\uC138\uC158 ID \uAE30\uB85D \uC804 \u2014 \uC77C\uC2DC\uC815\uC9C0 \uBD88\uAC00":"\uC77C\uC2DC\uC815\uC9C0 (\uAC19\uC740 \uC138\uC158\uC73C\uB85C \uC7AC\uAC1C \uAC00\uB2A5)"}
                      aria-label="일시정지"
                    >
                      ⏸
                    </button>`}
                ${fe}`}${H}
      </div>
    </div>
    <div class="rtile__title">${e.title}</div>
    ${C?yv(a?"parked":u?"retry_wait":d?"waiting":"provider_hold",a?_:d?m:y,fe,d?oe:""):s?"":c`${ye}${e.rollup?Us(e.rollup,{parent_id:e.bead_id,expanded:e.rollup_expanded===!0,childChips:Ea}):""}
            ${Y?c`<div class="rtile__landing">
                  <span
                    class="merge-step${Y.failed?" merge-step--failed":""}"
                    style=${`--progress: ${Y.percent}%`}
                    >${Y.label}${Y.index>0?c`<span class="merge-step__n"
                          >${Y.index}/${Y.total}</span
                        >`:""}</span
                  >
                </div>`:""}
            ${oe}
            ${o?se:z||G||F||te||X||M.length>0||I?c`<div class="rtile__meta">
                    ${z}${G}${F}${gi(e.exec_chips)}${X}
                    ${M.length>0?M.map(Se=>c`<span
                              class="worker-usage"
                              title=${Se.tooltip}
                              >${Se.label}</span
                            >`):I?c`<span
                            class="worker-usage"
                            title=${Mo(e.usage)}
                            >${I}</span
                          >`:""}${Ae}
                  </div>`:""}
            ${di(e)} ${he}
            <!-- 살아있음만 말하는 비의미적 액센트 (UI-58y2 데스크톱 §실행 타일).
         quick_fix landing의 실제 진행은 위의 별도 진행 줄이 소유한다.
         일시정지된 타일은 살아있지 않으므로 액센트도 없다. -->
            ${s||R?"":c`<div class="rtile__accent" aria-hidden="true"></div>`}`}
    ${uv(l,t)}${fv(y)}
  </div>`}function vv(e){let t=e.last_activity&&typeof e.last_activity=="object"?e.last_activity:null,n=Array.isArray(e.legs)?e.legs:[],r=e.dependency_chips||null;return!t&&n.length===0&&!r&&e.kind!=="session"?null:{...t?{last_activity:t}:{},...n.length>0?{legs:n}:{},...r?{dependency_chips:r}:{}}}function mf(e,t=Date.now(),n=null){let r=Array.isArray(e)?e:[];return c`<div class="worker-rungrid" id="worker-rungrid">
    ${r.length===0?c`<div class="worker-rungrid__empty">실행 세션 없음</div>`:r.map(o=>Hl(o,t,n,{monitor:vv(o)}))}
  </div>`}var rn="",kv=["impl_runtime","impl_model","impl_effort"],gf=["claude","codex"],wv=["claude_account","codex_account"],$v=5,ra=1;function On(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function oa(e,t){let n=t.transport,r=typeof t.root_dir=="string"&&t.root_dir.length>0?t.root_dir:null,o=t.notify||(x=>me(x,"error",4e3)),i={},s={},l={},a={},u=[],d=!1,p={state:"absent",values:{},warnings:[]},_={},m={},y=Promise.resolve(),C={claude:null,codex:null},R=!1,V=null,te={},W="",M="general",I="",L=!1,U=!1,Y=!1,q=null,N=!1;function z(){let x=t.queue?t.queue():null;return On(x)?x:null}function G(){let x=z();return x?x.runner_catalog:null}function oe(){let x=z();return x&&On(x.execution_defaults)?x.execution_defaults:null}function ye(){let x=z();return!!(x&&Object.hasOwn(x,"quick_fix_orchestration_model"))}function Me(){let x=t.implPresetStore?.get();return On(x)&&Array.isArray(x.presets)?x:null}function F(){return r===null?{}:{root_dir:r}}async function X(x,j){return N||!n?null:await n(x,j)}function Ae(x){x&&On(x.queue)&&t.onQueueAdopt?.(x.queue)}async function Ee(x,j){let ae=z();if(!ae||N)return null;let ge=await X(x,{...j,...F(),expected_revision:ae.revision});if(Ae(ge),r!==null&&ge&&ge.conflict){let le=ge.queue&&typeof ge.queue.revision=="number"?ge.queue.revision:z()?.revision??ae.revision;ge=await X(x,{...j,...F(),expected_revision:le}),Ae(ge)}return ge}async function O(){d=!0,je();try{let x=await X("get-session-defaults",{...F()});i=Zs(x?.values),s={...i},l={},a={},u=Array.isArray(x?.warnings)?x.warnings:[]}catch(x){u=["kv_read_failed"],o(`\uC138\uC158 \uAE30\uBCF8\uAC12\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4: ${x instanceof Error?x.message:String(x)}`)}finally{d=!1,je()}}async function se(){let x=Lu(i,s);if(Object.keys(x).length!==0){try{let j=await X("set-session-defaults",{values:x,...F()});i=Zs(j?.values),s={...i},u=Array.isArray(j?.warnings)?j.warnings:[]}catch(j){o(`\uC138\uC158 \uAE30\uBCF8\uAC12 \uC800\uC7A5 \uC2E4\uD328: ${j instanceof Error?j.message:String(j)}`)}je()}}function be(x,j){if(!On(x))return;let ae=x.state;p={state:ae==="usable"||ae==="unusable"||ae==="absent"?ae:"absent",values:On(x.values)?{...x.values}:{},warnings:Array.isArray(x.warnings)?x.warnings:[]},m={...p.values},j&&(_={...m})}async function ve(){try{be(await X("get-workspace-accounts",{...F()}),!0)}catch(x){p={state:"unusable",values:{},warnings:["kv_read_failed"]},m={},_={},o(`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4: ${x instanceof Error?x.message:String(x)}`)}je()}async function Pe(x){try{let j=await fetch(x);if(!j.ok)return null;let ae=await j.json();if(!On(ae)||!Array.isArray(ae.accounts))return null;let ge=ae.accounts.filter(le=>On(le)&&typeof le.key=="string"&&le.key.length>0&&typeof le.email=="string"&&le.email.length>0);return{accounts:ge,active:ge.find(le=>le.active===!0)||null}}catch{return null}}async function he(){R=!0;let[x,j]=await Promise.all([Pe("/api/claude-usage"),Pe("/api/codex-usage")]);N||(C={claude:x,codex:j},je())}function Re(){let x={};for(let j of wv){let ae=Object.hasOwn(_,j)?_[j]:null,ge=Object.hasOwn(m,j)?m[j]:null;ae!==ge&&(x[j]=ae)}return x}async function Xe(){let x=Re();if(Object.keys(x).length!==0){try{be(await X("set-workspace-accounts",{values:x,...F()}),!1)}catch(j){o(`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12 \uC800\uC7A5 \uC2E4\uD328: ${j instanceof Error?j.message:String(j)}`)}je()}}function dt(x,j){j===rn?delete _[x]:_[x]=j,je(),y=y.then(()=>Xe())}function H(x,j){if(kv.includes(x)){_e(x,j);return}j===rn?delete s[x]:s[x]=j,je(),se()}function J(x,j){l[x]=j,delete a[x]}function re(x,j,ae){if(l[x]=j,j.length>0&&!ae(j)){a[x]=!0,je();return}delete l[x],delete a[x],j.length===0?delete s[x]:s[x]=j,je(),se()}function fe(){let x=Ue().orchestration_model,j=En({global:{orchestration_model:x??void 0},execution_defaults:oe(),runner_catalog:G()}).orchestration_model.value;return j?Mn(G(),j):null}function Se(x,j){typeof j=="string"&&j.length>0?s[x]=j:delete s[x]}function _e(x,j){let ae=j===rn?void 0:j,ge=Ou({impl_runtime:x==="impl_runtime"?ae:s.impl_runtime,impl_model:x==="impl_model"?ae:s.impl_model,impl_effort:x==="impl_effort"?ae:s.impl_effort},G(),fe());Se("impl_runtime",ge.impl_runtime),Se("impl_model",ge.impl_model),Se("impl_effort",ge.impl_effort),je(),se()}async function qe(){let x=z();if(!x)return;let j={orchestration_model:x.orchestration_model??null,orchestration_effort:x.orchestration_effort??null,orchestration_speed:x.orchestration_speed??null,quick_fix_orchestration_model:x.quick_fix_orchestration_model??null,quick_fix_orchestration_effort:x.quick_fix_orchestration_effort??null,quick_fix_orchestration_speed:x.quick_fix_orchestration_speed??null},ae=Du(j,{...j,...te});if(Object.keys(ae).length!==0){try{let ge=await Ee("worker-queue-set-orchestration-defaults",{values:ae});if(ge&&ge.applied===!1){o("Worker \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC");return}te={}}catch(ge){o(`Worker \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${ge instanceof Error?ge.message:String(ge)}`)}je()}}function Fe(x,j){te[x]=j===rn?null:j,je(),qe()}function Ve(x){if(V=x,!x){je();return}let j=G(),ae=Ue(),ge=ae.orchestration_model;ge&&!mo(j,x).includes(ge)&&(te.orchestration_model=null,ge=null);let le=ae.orchestration_effort;le&&!ni(j,x,ge||$n).includes(le)&&(te.orchestration_effort=null),je(),qe()}async function He(x){if(!(!z()||x<ra)){try{await Ee("worker-queue-set-slots",{slots:x})}catch(j){o(`slots \uC800\uC7A5 \uC2E4\uD328: ${j instanceof Error?j.message:String(j)}`)}je()}}async function ee(x){if(!(!z()||x<ra||x>$v)){try{await Ee("worker-queue-set-serial-lane-count",{count:x})}catch(j){o(`\uC9C1\uB82C \uB808\uC778 \uC800\uC7A5 \uC2E4\uD328: ${j instanceof Error?j.message:String(j)}`)}je()}}async function Q(x,j){let ae=x==="auto_advance"?"worker-automation-toggle":x==="auto_merge"?"worker-merge-auto-toggle":"worker-provider-auto-switch-toggle";try{await Ee(ae,{on:j})}catch(ge){o(`\uC790\uB3D9\uD654 \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${ge instanceof Error?ge.message:String(ge)}`)}je()}function xe(){let x={},j=Ue();for(let ae of fo){let ge=Pn.includes(ae)?j[ae]:s[ae];typeof ge=="string"&&ge.length>0&&(x[ae]=ge)}return x}async function mt(){let x=Me();if(!x)return;let j=xe();if(Object.keys(j).length===0){o("\uC800\uC7A5\uD560 \uC2E4\uD589 \uC124\uC815\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uBA3C\uC800 \uC2E4\uD589 \uAC12\uC744 \uC120\uD0DD\uD558\uC138\uC694");return}let ae=(x.presets||[]).find(le=>le.id===W),ge=I.trim()||(ae?ae.name:"");if(!ge){o("\uD504\uB9AC\uC14B \uC774\uB984\uC744 \uC785\uB825\uD558\uC138\uC694");return}try{let le=ae?await X("impl-preset-update",{expected_revision:x.revision,id:ae.id,name:ge,settings:j}):await X("impl-preset-create",{expected_revision:x.revision,name:ge,settings:j});if(le&&le.applied){if(I="",!ae&&Array.isArray(le.presets)){let it=le.presets.find(It=>It.name===ge);W=it?it.id:W}je()}else o("\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4"),je()}catch(le){o(`\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328: ${le instanceof Error?le.message:String(le)}`)}}async function ft(){let x=Me();if(!(!x||W.length===0))try{let j=await X("impl-preset-delete",{expected_revision:x.revision,id:W});j&&j.applied?(W="",je()):(o("\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328: \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4"),je())}catch(j){o(`\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328: ${j instanceof Error?j.message:String(j)}`)}}function Ke(x){i=Zs(x.values),s={...i},u=Array.isArray(x.warnings)?x.warnings:[],On(x.queue)&&(t.onQueueAdopt?.(x.queue),te={})}async function Je(x){let j=Me(),ae=z();if(!j||!ae||W.length===0||x==="quick_fix"&&!ye())return;let ge=le=>({preset_id:W,expected_revision:j.revision,expected_queue_revision:le,...x==="quick_fix"?{lane:"quick_fix"}:{},...F()});try{let le=await X("apply-impl-preset-global",ge(ae.revision));if(x==="quick_fix"&&le&&le.lane!=="quick_fix"){o("\uC11C\uBC84 \uC751\uB2F5\uC5D0 lane\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uD050 \uC2A4\uB0C5\uC0F7\uC744 \uB2E4\uC2DC \uBC1B\uC740 \uB4A4 \uD655\uC778\uD558\uC138\uC694"),je();return}if(le&&le.applied&&Ke(le),r!==null&&le&&le.queue_applied===!1){let it=le.queue&&typeof le.queue.revision=="number"?le.queue.revision:z()?.revision??ae.revision;if(le=await X("apply-impl-preset-global",ge(it)),x==="quick_fix"&&le&&le.lane!=="quick_fix"){o("\uC11C\uBC84 \uC751\uB2F5\uC5D0 lane\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uD050 \uC2A4\uB0C5\uC0F7\uC744 \uB2E4\uC2DC \uBC1B\uC740 \uB4A4 \uD655\uC778\uD558\uC138\uC694"),je();return}le&&le.applied&&Ke(le)}le&&le.applied?le.queue_applied===!1&&o("\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uAC12\uC740 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC138\uC694"):le&&le.conflict&&o("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328: \uD504\uB9AC\uC14B\uC774 \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4")}catch(le){o(`\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328: ${le instanceof Error?le.message:String(le)}`)}je()}async function A(){U=!0,Y=!1,je();try{let x=await X("get-worker-system-prompt",{});!x||typeof x!="object"||Array.isArray(x)?Y=!0:q=x}catch{Y=!0}finally{U=!1,je()}}function Z(){if(L=!L,L&&!q){A();return}je()}function Ie(){let x=$o({loading:U,error:Y});if(x)return x;if(!q)return"";let j=Array.isArray(q.variants)?q.variants:[];return c`<div class="settings-dialog__sp-body">
      ${q.target_base_placeholder?c`<div class="prompt-block__meta">
            \`${q.target_base_placeholder}\`는 디스패치 시점에 해석된
            base로 치환됩니다.
          </div>`:""}
      ${j.map(ae=>c`<div class="settings-dialog__sp-variant" data-variant=${ae.key}>
            <div class="settings-dialog__sp-cond">${ae.condition}</div>
            ${lr(ae.label,ae.system_prompt)}
          </div>`)}
    </div>`}function Ge(){return c`<section
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
        aria-expanded=${L?"true":"false"}
        @click=${Z}
      >
        ${L?"\uC811\uAE30":"\uC804\uBB38 \uBCF4\uAE30"}
      </button>
      ${L?Ie():""}
    </section>`}function tt(x,j,ae,ge,le,it,It,yt){let $t=le[x]??rn,xt=Na(x,ae,le,oe(),G(),It,yt),Lt=xt.options.find(Dt=>Dt.value===$t),qt=$t===rn?xt.full_value:Lt?.full_value;return c`<select
        class=${$t===rn?"settings-dialog__unset":""}
        data-key=${x}
        aria-label=${j}
        title=${qt||""}
        ?disabled=${it===!0||yt!=="quick_fix"&&xt.disabled}
        .value=${kr(String($t))}
        @change=${Dt=>ge(x,String(Dt.target.value))}
      >
        <option value=${rn} ?selected=${$t===rn}>
          ${xt.unset_label}
        </option>
        ${xt.options.map(Dt=>c`<option
              value=${Dt.value}
              title=${Dt.full_value||""}
              ?selected=${Dt.value===$t}
            >
              ${Dt.label}
            </option>`)}
      </select>
      ${$t===rn?c`<span class="settings-dialog__source-badge">기본</span>`:""}`}function Ce(x,j,ae,ge,le,it=!1,It,yt=null,$t=null){return c`<div
      class=${`settings-dialog__row${it?" settings-dialog__row--off":""}`}
      title=${it&&$t?$t:""}
    >
      <span class="settings-dialog__row-label">${j}</span>
      <span class="settings-dialog__controls">
        ${tt(x,j,ae,ge,le,it,It,yt)}
      </span>
    </div>`}function Ze(x,j,ae,ge,le,it){let It=Object.hasOwn(a,x),yt=l[x]??s[x]??rn;return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${j}</span>
      <span class="settings-dialog__controls">
        <input
          type="text"
          class=${`settings-dialog__text${It?" settings-dialog__text--invalid":""}`}
          data-key=${x}
          aria-label=${j}
          aria-invalid=${String(It)}
          placeholder=${ae}
          .value=${kr(yt)}
          @input=${$t=>J(x,String($t.target.value))}
          @change=${$t=>re(x,String($t.target.value).trim(),it)}
        />
        ${yt.length===0?c`<span class="settings-dialog__source-badge">기본</span>`:""}
        <span class="settings-dialog__hint" data-key-hint=${x}
          >${It?le:ge}</span
        >
      </span>
    </div>`}function Ut(x,j,ae,ge){return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${j}</span>
      <span class="settings-dialog__controls">
        <label class="settings-dialog__check">
          <input
            type="checkbox"
            data-key=${x}
            .checked=${s[x]===qo}
            @change=${le=>H(x,le.target.checked?qo:rn)}
          />
          ${ae}
        </label>
        <span class="settings-dialog__hint" data-key-hint=${x}>${ge}</span>
      </span>
    </div>`}function wt(x,j){let ae=j?j.active:null;return On(ae)?`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(${x==="claude"?ae.email:Ao({...ae,alias:null})})`:"\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(\uD655\uC778 \uBD88\uAC00)"}function bt(x,j,ae){let ge=C[ae],le=Object.hasOwn(_,x)?_[x]:rn,it=ae==="claude"?Yi:Ao,It=!!ge?.accounts.some(yt=>yt.key===le);return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${j}</span>
      <span class="settings-dialog__controls">
        <select
          aria-label=${j}
          data-account-key=${x}
          @change=${yt=>dt(x,String(yt.target.value))}
        >
          <option value=${rn} ?selected=${le.length===0}>
            ${wt(ae,ge)}
          </option>
          ${le.length>0&&!It?c`<option value=${le} selected>
                ${le} (목록에 없음)
              </option>`:""}
          ${ge?.accounts.map(yt=>c`<option value=${yt.key} ?selected=${yt.key===le}>
                ${it(yt)}
              </option>`)||""}
        </select>
        ${ge?"":c`<span class="settings-dialog__hint"
              >계정 목록을 불러올 수 없습니다</span
            >`}
      </span>
    </div>`}function Ft(){let x=p.warnings.join(", ");return p.state==="unusable"?`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12\uC744 \uD574\uC11D\uD560 \uC218 \uC5C6\uC5B4 \uC774 \uB808\uD3EC\uC758 \uB514\uC2A4\uD328\uCE58\uAC00 \uAC70\uBD80\uB429\uB2C8\uB2E4 \u2014 ${x} \xB7 \uACC4\uC815\uC744 \uB2E4\uC2DC \uACE0\uB974\uBA74 \uD574\uC18C\uB429\uB2C8\uB2E4`:p.warnings.length>0?`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12\uC5D0 \uC54C \uC218 \uC5C6\uB294 \uD0A4\uAC00 \uC788\uC2B5\uB2C8\uB2E4 \u2014 ${x}`:null}function Ct(x,j,ae,ge,le,it){return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">
        <i
          class="settings-dialog__stage-dot"
          style=${`background: var(--stage-${j}-on)`}
        ></i>
        ${x}
      </span>
      <span class="settings-dialog__controls">
        ${tt(ae,`${x} \uBAA8\uB378`,ge,H,s,!1)}
        ${tt(le,`${x} effort`,ti,H,s,!1)}
        ${tt(it,`${x} \uC18D\uB3C4`,Eu,H,s,!1)}
      </span>
    </div>`}function Mt(x,j,ae,ge){return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${j}</span>
      <span class="settings-dialog__controls">
        <button
          type="button"
          class=${`settings-dialog__toggle${ge?" is-on":""}`}
          data-automation=${x}
          aria-pressed=${ge?"true":"false"}
          aria-label=${j}
          @click=${()=>Q(x,!ge)}
        >
          ${ge?"\uCF1C\uC9D0":"\uAEBC\uC9D0"}
        </button>
        <span class="settings-dialog__hint">${ae}</span>
      </span>
    </div>`}function de(x,j,ae,ge){return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${j}</span>
      <span class="settings-dialog__controls">
        <span class="settings-dialog__stepper" data-stepper=${x}>
          <button
            type="button"
            aria-label=${`${j} \uAC10\uC18C`}
            @click=${()=>ge(ae-1)}
          >
            −
          </button>
          <span class="settings-dialog__stepper-value">${ae}</span>
          <button
            type="button"
            aria-label=${`${j} \uC99D\uAC00`}
            @click=${()=>ge(ae+1)}
          >
            +
          </button>
        </span>
      </span>
    </div>`}function ke(x,j){return c`<div class="settings-dialog__preset-diff" data-preset-diff>
      <div class="settings-dialog__preset-diff-head">
        ${x.rows.length>0?`\uBCC0\uACBD ${x.rows.length}\uAC1C \xB7 \uC801\uC6A9\uD558\uBA74 \uC544\uB798\uC640 \uAC19\uC774 \uBC14\uB01D\uB2C8\uB2E4`:"\uD604\uC7AC \uC124\uC815\uACFC \uAC19\uC2B5\uB2C8\uB2E4 \u2014 \uC801\uC6A9\uD560 \uBCC0\uACBD\uC774 \uC5C6\uC2B5\uB2C8\uB2E4"}
      </div>
      ${x.rows.map(ae=>c`<div
            class="settings-dialog__preset-diff-row"
            data-diff-kind=${ae.kind}
          >
            <span class="settings-dialog__preset-diff-label">${ae.label}</span>
            <span class="settings-dialog__preset-diff-value"
              >${ae.before??"\uAE30\uBCF8"}</span
            >
            <span class="settings-dialog__preset-diff-arrow">→</span>
            <span
              class="settings-dialog__preset-diff-value settings-dialog__preset-diff-after"
              >${ae.after??(j==="quick_fix"?"\uAE30\uBCF8(\uD574\uC81C \u2192 \uC77C\uBC18 \uD504\uB85C\uD30C\uC77C)":"\uAE30\uBCF8(\uD574\uC81C)")}</span
            >
          </div>`)}
      ${x.ignored_keys.length>0?c`<div class="settings-dialog__preset-diff-note">
            ${x.ignored_keys.join(", ")}은(는)
            ${j==="quick_fix"?"quick_fix \uB808\uC778":"\uC804\uC5ED"} 적용이 쓰지 않는
            키라 무시됩니다
          </div>`:""}
    </div>`}function Ue(){let x=z(),j={};for(let ae of[...Pn,...po])j[ae]=Object.prototype.hasOwnProperty.call(te,ae)?te[ae]:x&&typeof x[ae]=="string"?x[ae]:null;return j}function rt(){let x=Ue(),j={};for(let ae of po)j[ae]=x[ae]??null;for(let ae of["quick_fix_impl_dispatch","quick_fix_impl_runtime","quick_fix_impl_model","quick_fix_impl_effort","quick_fix_impl_speed"])j[ae]=s[ae]??null;return j}function et(){let x=G(),j=s.impl_runtime,ae=s.impl_model,ge=Me(),le=z(),it=Ue(),It=mo(x,V),yt=_o(x,void 0).filter(ne=>ne!==$n),$t=Pr(x,void 0,void 0),xt=ni(x,V,it.orchestration_model||$n).filter(ne=>ne!==$n),Lt=W?(ge?.presets||[]).find(ne=>ne.id===W):null,qt=Lt?Ru(xe(),On(Lt.settings)?Lt.settings:{}):null,Dt={quick_fix_orchestration_model:mo(x,null),quick_fix_orchestration_effort:ni(x,null,null).filter(ne=>ne!==$n),quick_fix_orchestration_speed:Yn,quick_fix_impl_dispatch:No,quick_fix_impl_runtime:gf,quick_fix_impl_model:yt,quick_fix_impl_effort:$t,quick_fix_impl_speed:Yn},Jt=Lt?Iu(rt(),On(Lt.settings)?Lt.settings:{},Dt):null,Vt=M==="quick_fix"?Jt:qt,At=ye(),Wt=At?null:"\uC11C\uBC84\uAC00 quick_fix \uB808\uC778\uC744 \uC9C0\uC6D0\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4",zt={...s,...it},on=le&&typeof le.slots=="number"?le.slots:ra+1,Kt=le&&typeof le.serial_lane_count=="number"?le.serial_lane_count:ra,ln=oe()?.supported===!0,we=Ft(),T=Na("workflow_mode",jo,s,oe(),x);return c`
      ${u.length>0?c`<div class="settings-dialog__banner" role="alert">
            워크스페이스 기본값을 일부 읽지 못했습니다 —
            ${u.join(", ")}
          </div>`:""}
      ${we?c`<div
            class="settings-dialog__banner"
            data-account-warning
            role="alert"
          >
            ${we}
          </div>`:""}
      ${ln?"":c`<div
            class="settings-dialog__banner settings-dialog__banner--projection"
            data-execution-defaults-warning
            role="alert"
          >
            실행 기본값 projection을 확인할 수 없습니다 — 기본값 확인 불가
          </div>`}
      ${d?c`<div class="settings-dialog__empty">불러오는 중…</div>`:c`
            <div class="settings-dialog__preset-bar">
              <select
                aria-label="실행 프리셋"
                .value=${kr(W)}
                @change=${ne=>{W=String(ne.target.value),je()}}
              >
                <option value="" ?selected=${W===""}>
                  실행 프리셋…
                </option>
                ${(ge?.presets||[]).map(ne=>c`<option
                      value=${ne.id}
                      ?selected=${ne.id===W}
                    >
                      ${ne.name}
                    </option>`)}
              </select>
              <button
                type="button"
                class="settings-dialog__btn settings-dialog__btn--primary op-btn"
                data-preset-apply-global
                data-preset-apply-general
                ?disabled=${!qt||qt.rows.length===0}
                @click=${()=>Je("general")}
              >
                일반에 적용
              </button>
              <button
                type="button"
                class="settings-dialog__btn op-btn"
                data-preset-apply-quick-fix
                title=${Wt||""}
                ?disabled=${!At||!Jt||Jt.rows.length===0}
                @click=${()=>Je("quick_fix")}
              >
                quick_fix 레인에 적용
              </button>
              <input
                type="text"
                class="settings-dialog__preset-name"
                placeholder=${W?"\uC774\uB984 (\uBE44\uC6B0\uBA74 \uC720\uC9C0)":"\uC0C8 \uD504\uB9AC\uC14B \uC774\uB984"}
                aria-label="프리셋 이름"
                .value=${kr(I)}
                @input=${ne=>{I=String(ne.target.value)}}
              />
              <button
                type="button"
                class="settings-dialog__btn"
                data-preset-save
                title=${W?"\uD604\uC7AC \uD654\uBA74\uC758 \uC2E4\uD589 \uC124\uC815\uC744 \uC774 \uD504\uB9AC\uC14B\uC5D0 \uC800\uC7A5\uD569\uB2C8\uB2E4 (\uD504\uB9AC\uC14B \u2192 \uC124\uC815 \uBC29\uD5A5\uC774 \uC544\uB2D8)":"\uD604\uC7AC \uD654\uBA74\uC758 \uC2E4\uD589 \uC124\uC815\uC744 \uC0C8 \uD504\uB9AC\uC14B\uC73C\uB85C \uC800\uC7A5\uD569\uB2C8\uB2E4"}
                @click=${mt}
              >
                ${W?"\uD604\uC7AC \uC124\uC815\uC73C\uB85C \uB36E\uC5B4\uC4F0\uAE30":"\uC0C8 \uD504\uB9AC\uC14B \uC800\uC7A5"}
              </button>
              <button
                type="button"
                class="settings-dialog__btn"
                data-preset-delete
                ?disabled=${W.length===0}
                @click=${ft}
              >
                삭제
              </button>
            </div>
            <div
              class="settings-dialog__seg"
              role="group"
              aria-label="프리셋 적용 레인"
              data-preset-lane-tabs
            >
              <button
                type="button"
                data-preset-lane="general"
                aria-pressed=${String(M==="general")}
                @click=${()=>{M="general",je()}}
              >
                일반
              </button>
              <button
                type="button"
                data-preset-lane="quick_fix"
                aria-pressed=${String(M==="quick_fix")}
                @click=${()=>{M="quick_fix",je()}}
              >
                quick_fix
              </button>
            </div>
            ${Vt?ke(Vt,M):""}

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">오케스트레이션</div>
              <div class="settings-dialog__row">
                <span class="settings-dialog__row-label">런타임</span>
                <span class="settings-dialog__controls">
                  <select
                    aria-label="런타임"
                    data-key="orchestration_runtime_filter"
                    .value=${kr(V||rn)}
                    @change=${ne=>{let De=String(ne.target.value);Ve(De===rn?null:De)}}
                  >
                    <option value=${rn} ?selected=${!V}>
                      전체
                    </option>
                    <option
                      value="claude"
                      ?selected=${V==="claude"}
                    >
                      claude
                    </option>
                    <option
                      value="codex"
                      ?selected=${V==="codex"}
                    >
                      codex
                    </option>
                  </select>
                  <span class="settings-dialog__hint"
                    >모델 목록을 좁힙니다</span
                  >
                </span>
              </div>
              ${Ce("orchestration_model","\uBAA8\uB378",It,Fe,it)}
              ${Ce("orchestration_effort","effort",xt,Fe,it)}
              ${Ce("orchestration_speed","\uC18D\uB3C4",Yn,Fe,it)}
            </div>

            <div class="settings-dialog__group" data-exec-accounts-group>
              <div class="settings-dialog__group-title">실행 계정</div>
              ${bt("claude_account","Claude","claude")}
              ${bt("codex_account","Codex","codex")}
              <div class="settings-dialog__row">
                <span class="settings-dialog__row-label">한도 대응</span>
                <span class="settings-dialog__controls">
                  <label class="settings-dialog__check">
                    <input
                      type="checkbox"
                      data-provider-auto-switch
                      .checked=${le?.provider_auto_switch!==!1}
                      @change=${ne=>Q("provider_auto_switch",ne.target.checked)}
                    />
                    한도 시 다른 계정으로 자동 이어하기
                  </label>
                </span>
              </div>
            </div>

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">워크플로우</div>
              <div class="settings-dialog__row">
                <span class="settings-dialog__row-label">모드</span>
                <span class="settings-dialog__controls">
                  <span class="settings-dialog__seg" role="group">
                    <button
                      type="button"
                      data-mode=${rn}
                      aria-pressed=${String(!s.workflow_mode)}
                      @click=${()=>H("workflow_mode",rn)}
                    >
                      ${T.unset_label}
                    </button>
                    ${s.workflow_mode?"":c`<span class="settings-dialog__source-badge"
                          >기본</span
                        >`}
                    ${jo.map(ne=>c`<button
                          type="button"
                          data-mode=${ne}
                          aria-pressed=${String(s.workflow_mode===ne)}
                          @click=${()=>H("workflow_mode",ne)}
                        >
                          ${ne}
                        </button>`)}
                  </span>
                </span>
              </div>
              ${Ze("bdui_url","beads-ui \uC8FC\uC18C","http://\uD638\uC2A4\uD2B8:3000","\uC138\uC158\uC774 Worker \uB808\uC778 \uBC30\uCE58\uB97C \uBB3C\uC5B4\uBCFC \uB54C \uC4F0\uB294 \uC8FC\uC18C\uC785\uB2C8\uB2E4","http:// \uB610\uB294 https:// \uB85C \uC2DC\uC791\uD558\uB294 \uC8FC\uC18C\uB9CC \uC800\uC7A5\uB429\uB2C8\uB2E4 (\uACBD\uB85C \uC5C6\uC774)",Su)}
              ${Ut("base_sync_accept_local_commits","base \uB3D9\uAE30\uD654","\uB85C\uCEEC base \uC0AC\uC6A9\uC790 \uCEE4\uBC0B \uC790\uB3D9 rebase+push","\uAEBC\uB450\uBA74 \uB85C\uCEEC base \uCCB4\uD06C\uC544\uC6C3\uC758 \uC0AC\uC6A9\uC790 \uCEE4\uBC0B\uC740 \uADF8\uB300\uB85C \uB0A8\uC2B5\uB2C8\uB2E4")}
            </div>

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">
                리뷰 게이트
                <span class="settings-dialog__hint">모델 · effort · 속도</span>
              </div>
              ${Ct("\uC0AC\uC591 \uB9AC\uBDF0","spec","spec_review_model",Fo,"spec_review_effort","spec_review_speed")}
              ${Ct("\uACC4\uD68D \uB9AC\uBDF0","plan","plan_review_model",ei,"plan_review_effort","plan_review_speed")}
              ${Ct("\uAD6C\uD604 \uB9AC\uBDF0","impl","impl_review_model",Fo,"impl_review_effort","impl_review_speed")}
            </div>

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">
                구현
                <span class="settings-dialog__hint"
                  >이슈 핀이 있으면 핀이 우선합니다</span
                >
              </div>
              ${Ce("impl_runtime","\uC704\uC784 \uB300\uC0C1",Js,H,s)}
              ${Ce("impl_model","\uBAA8\uB378",_o(x,j),H,s)}
              ${Ce("impl_effort","effort",Pr(x,j,ae),H,s)}
              ${Ce("impl_speed","\uC18D\uB3C4",Yn,H,s)}
            </div>

            <div
              class="settings-dialog__group"
              data-quick-fix-group
              title=${Wt||""}
            >
              <div class="settings-dialog__group-title">
                quick_fix 레인
                <span class="settings-dialog__hint"
                  >${"\uBE44\uC5B4 \uC788\uB294 \uAC12\uC740 \uC77C\uBC18 \uD504\uB85C\uD30C\uC77C\uB85C \uB5A8\uC5B4\uC9D1\uB2C8\uB2E4. \uC774\uC288 \uD540\uC774 \uC788\uC73C\uBA74 \uD540\uC774 \uC6B0\uC120\uD569\uB2C8\uB2E4."}</span
                >
              </div>
              ${Ce("quick_fix_orchestration_model","\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uBAA8\uB378",Dt.quick_fix_orchestration_model,Fe,it,!At,zt,"quick_fix",Wt)}
              ${Ce("quick_fix_orchestration_effort","\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 effort",Dt.quick_fix_orchestration_effort,Fe,it,!At,zt,"quick_fix",Wt)}
              ${Ce("quick_fix_orchestration_speed","\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uC18D\uB3C4",Yn,Fe,it,!At,zt,"quick_fix",Wt)}
              ${Ce("quick_fix_impl_dispatch","\uC2E4\uD589 \uBC29\uC2DD",No,H,s,!At,zt,"quick_fix",Wt)}
              ${Ce("quick_fix_impl_runtime","\uC704\uC784 \uB300\uC0C1",gf,H,s,!At,zt,"quick_fix",Wt)}
              ${Ce("quick_fix_impl_model","\uBAA8\uB378",yt,H,s,!At,zt,"quick_fix",Wt)}
              ${Ce("quick_fix_impl_effort","effort",$t,H,s,!At,zt,"quick_fix",Wt)}
              ${Ce("quick_fix_impl_speed","\uC18D\uB3C4",Yn,H,s,!At,zt,"quick_fix",Wt)}
            </div>

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">
                자동화
                <span class="settings-dialog__hint"
                  >이 레포의 워커 큐가 스스로 진행하는 범위</span
                >
              </div>
              ${Mt("auto_advance","\uC790\uB3D9\uD654","\uC2AC\uB86F\uC774 \uBE44\uBA74 \uB300\uAE30 \uC55E \uD589\uC774 \uCD9C\uBC1C\uD569\uB2C8\uB2E4",le?.auto_advance===!0)}
              ${Mt("auto_merge","\uBA38\uC9C0","\uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4",le?.auto_merge===!0)}
              ${de("slots","\uB3D9\uC2DC \uC2E4\uD589",on,ne=>He(ne))}
              ${de("serial-lane-count","\uC9C1\uB82C \uB808\uC778",Kt,ne=>ee(ne))}
            </div>
            ${Ge()}
          `}
    `}function je(){N||pt(et(),e)}return{load(){te={},M="general",l={},a={};let x=[O(),ve()];return R||x.push(he()),Promise.all(x).then(()=>{})},render:je,sessionDraft:()=>({...s}),destroy(){N=!0,pt(c``,e)}}}function sa(e){return c`<svg
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
  </svg>`}function hf(){return sa(Ro`<path d="M5.5 3.6 12 8l-6.5 4.4z" />`)}function bf(){return sa(Ro`<path d="M6 3.8v8.4M10 3.8v8.4" />`)}function yf(){return sa(Ro`<path
      d="M4.6 5.6v4.8M4.6 8.2h2.2A3.2 3.2 0 0 0 10 5"
    />
    <circle cx="4.6" cy="4" r="1.5" />
    <circle cx="4.6" cy="12" r="1.5" />
    <circle cx="11.4" cy="4" r="1.5" />`)}function vf(){return sa(Ro`<circle cx="8" cy="8" r="2.1" />
    <path
      d="M8 1.9v1.8M8 12.3v1.8M1.9 8h1.8M12.3 8h1.8M3.7 3.7l1.3 1.3M11 11l1.3 1.3M12.3 3.7 11 5M5 11l-1.3 1.3"
    />`)}function kf(e){return`${e} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}function wf(e){let t=(Array.isArray(e)?e:[]).map(l=>l&&l.usage).filter(l=>l&&typeof l=="object"&&"providers"in l);if(t.length>0)return un(Qs(t));let n={};for(let l of Gn)n[l]=0;let r=!1,o=0,i=0,s=0;for(let l of Array.isArray(e)?e:[]){let a=l&&l.usage;if(a&&typeof a=="object"){let u=!1;for(let d of Gn){let p=a[d];typeof p=="number"&&Number.isFinite(p)&&(n[d]+=p,r=!0,u=!0)}if(u){i+=1;let d=a.total_cost_usd;typeof d=="number"&&Number.isFinite(d)&&(o+=d,s+=1)}}}return i>0&&s===i&&(n.total_cost_usd=o),r?tr(n):null}function Un(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function Kl(e,t){let n=Un(e?.counts)?e.counts:null,r=n?n[t]:null;return typeof r=="number"&&Number.isFinite(r)?r:0}function xv(e,t){if(!Un(t))return e;let n={...e};for(let[r,o]of Object.entries(t))o!==void 0&&(n[r]=o);return n}function Av(e){if(!Un(e)||!Un(e.execution_defaults)||!Un(e.runner_catalog)||!Un(e.session_defaults))return null;let t={...e.session_defaults};for(let s of["orchestration_model","orchestration_effort","orchestration_speed"])typeof e[s]=="string"&&e[s].length>0&&(t[s]=e[s]);let n=En({global:t,execution_defaults:e.execution_defaults,runner_catalog:e.runner_catalog}),r=Mn(e.runner_catalog,n.orchestration_model.value??""),o=go(n,e.runner_catalog),i=Mr(n,r);return o===null&&i===null?null:{orchestration:o,worker:i}}function $f(e,t){let n=t.notify||(O=>me(O,"error",4e3)),r=document.createElement("div");r.className="mon2-deck__main",e.appendChild(r);let o=document.createElement("div");o.className="mon2-deck__panel",o.hidden=!0;let i=document.createElement("div");i.className="mon2-deck__panel-hd";let s=document.createElement("span");s.className="mon2-deck__panel-title";let l=document.createElement("button");l.type="button",l.className="mon2-deck__panel-close",l.setAttribute("aria-label","\uC2E4\uD589 \uC124\uC815 \uB2EB\uAE30"),l.textContent="\u2715",i.append(s,l);let a=document.createElement("div");a.className="mon2-deck__panel-body",o.append(i,a),e.appendChild(o);let u=null,d=null,p=null,_=new Map;function m(){let O=t.workspacesState?t.workspacesState():[];return Array.isArray(O)?O.filter(se=>Un(se)):[]}function y(O){return m().find(se=>se.root_dir===O)||null}function C(O){return xv(y(O),_.get(O))}function R(){for(let O of m()){let se=_.get(O.root_dir);se&&typeof se.revision=="number"&&typeof O.revision=="number"&&O.revision>=se.revision&&_.delete(O.root_dir)}}async function V(O,se,be){let ve=t.transport,Pe=C(se);if(!(!ve||!Un(Pe))){try{let he=await ve(O,{...be,root_dir:se,expected_revision:Pe.revision});if(Un(he?.queue)&&_.set(se,he.queue),he&&he.conflict){let Re=Un(he.queue)&&typeof he.queue.revision=="number"?he.queue.revision:C(se)?.revision;he=await ve(O,{...be,root_dir:se,expected_revision:Re}),Un(he?.queue)&&_.set(se,he.queue)}}catch(he){n(`\uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${he instanceof Error?he.message:String(he)}`)}X()}}function te(O){u!==O&&(u=O,t.onFocusChange?.(u),X())}function W(O){te(u===O?null:O)}function M(O){if(d===O){L();return}I(),d=O;let se=y(O);s.textContent=`${se?.name||O} \uC2E4\uD589 \uC124\uC815 \xB7 Worker \uD0ED \u2699 \uC2E4\uD589 \uD0ED\uACFC \uAC19\uC740 \uC800\uC7A5\uC18C`,o.hidden=!1,p=oa(a,{root_dir:O,queue:()=>C(O),transport:t.transport,implPresetStore:t.implPresetStore,notify:n,onQueueAdopt:be=>{_.set(O,be),X()}}),p.load(),X()}function I(){p?.destroy(),p=null}function L(O){I(),d=null,o.hidden=!0,s.textContent="",O!==!0&&X()}let U=()=>L();l.addEventListener("click",U);function Y(O){O.key==="Escape"&&u!==null&&te(null)}document.addEventListener("keydown",Y);function q(O,se){let be=Math.max(se,O,1);return c`<span
      class="mon2-deck__rail"
      role="img"
      aria-label=${`\uC2AC\uB86F ${se}\uAC1C \uC911 ${O}\uAC1C \uC2E4\uD589 \uC911`}
    >
      ${Array.from({length:be},(ve,Pe)=>Pe<O?c`<i class="mon2-deck__slot is-run"></i>`:c`<i class="mon2-deck__slot"></i>`)}
    </span>`}function N(O){let se=O.auto_advance===!0,be=O.auto_merge===!0;return c`<button
        type="button"
        class=${`mon2-deck__op mon2-deck__auto${se?" is-on":""}`}
        data-act="auto"
        aria-pressed=${se?"true":"false"}
        aria-label=${`${O.name} \uC790\uB3D9\uD654`}
        title=${se?"\uC790\uB3D9\uD654 \uCF1C\uC9D0 \u2014 \uC2AC\uB86F\uC774 \uBE44\uBA74 \uB2E4\uC74C \uD589\uC774 \uCD9C\uBC1C\uD569\uB2C8\uB2E4":"\uC790\uB3D9\uD654 \uAEBC\uC9D0 \u2014 \uB2E4\uC74C \uD589\uC740 \uC218\uB3D9\uC73C\uB85C\uB9CC \uCD9C\uBC1C\uD569\uB2C8\uB2E4"}
      >
        ${se?bf():hf()}
      </button>
      <button
        type="button"
        class=${`mon2-deck__op mon2-deck__merge${be?" is-on":""}`}
        data-act="merge"
        aria-pressed=${be?"true":"false"}
        aria-label=${`${O.name} \uC790\uB3D9 \uBA38\uC9C0`}
        title=${be?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0"}
      >
        ${yf()}
      </button>
      <button
        type="button"
        class=${`mon2-deck__op mon2-deck__gear${d===O.root_dir?" is-on":""}`}
        data-act="gear"
        aria-expanded=${d===O.root_dir?"true":"false"}
        aria-label=${`${O.name} \uC2E4\uD589 \uC124\uC815`}
        title="이 레포의 실행 설정"
      >
        ${vf()}
      </button>`}function z(O){let se=Av(O);return se?c`<div class="mon2-deck__chips">
      ${se.orchestration?c`<span class="mon2-deck__chip" title=${se.orchestration.title}
            >오케 ${se.orchestration.text}</span
          >`:""}
      ${se.worker?c`<span class="mon2-deck__chip" title=${se.worker.title}
            >워커 ${se.worker.text}</span
          >`:""}
    </div>`:""}function G(O){let se=[];for(let[be,ve]of[["queue","\uB300\uAE30"],["pr_wait","PR"],["session_active","\uC138\uC158"]]){let Pe=Kl(O,be);Pe>0&&se.push(`${ve} ${Pe}`)}return se.join(" \xB7 ")}function oe(O){let se=Kl(O,"running"),be=typeof O.slots=="number"?O.slots:1;return c`<div
      class=${`mon2-deck__tile${u===O.root_dir?" is-focus":""}`}
      role="button"
      tabindex="0"
      data-root-dir=${O.root_dir}
      aria-pressed=${u===O.root_dir?"true":"false"}
      title="클릭하면 이 레포만 선명하게 봅니다 (Esc로 해제)"
    >
      <div class="mon2-deck__tile-hd">
        <span class="mon2-deck__name" title=${O.root_dir}>${O.name}</span>
        <span
          class="mon2-deck__load"
          title=${`\uC2AC\uB86F ${be}\uAC1C \uC911 ${se}\uAC1C \uC2E4\uD589 \uC911`}
        >
          <span class="mon2-deck__load-n">${se}/${be}</span>
          ${q(se,be)}
        </span>
        <button
          type="button"
          class="mon2-deck__worker"
          data-act="worker"
          aria-label=${`${O.name} Worker \uD0ED\uC73C\uB85C \uC774\uB3D9`}
          title="이 레포의 Worker 탭으로 이동"
        >
          ↗
        </button>
      </div>
      <div class="mon2-deck__tile-ft">
        <div class="mon2-deck__ops">${N(O)}</div>
        <span class="mon2-deck__counts">${G(O)}</span>
        ${z(O)}
      </div>
    </div>`}function ye(O){let se=t.doneItems?t.doneItems():[],be=t.rangeLabel?t.rangeLabel():"",ve=wf(Array.isArray(se)?se:[]),Pe=he=>O.reduce((Re,Xe)=>Re+Kl(Xe,he),0);return c`<div class="mon2-deck__bar">
      <span
        class="mon2-deck__total-counts"
        title=${`visible \uB808\uD3EC ${O.length}\uACF3\uC758 \uD569\uACC4\uC785\uB2C8\uB2E4 \u2014 \uC2E4\uD589\xB7\uB300\uAE30\xB7PR\uC740 \uC9C0\uAE08, \uC644\uB8CC\uB294 ${be}`}
        >실행 ${Pe("running")} · 대기 ${Pe("queue")} · PR
        ${Pe("pr_wait")}${Pe("session_active")>0?` \xB7 \uC138\uC158 ${Pe("session_active")}`:""}
        · ${be} 완료
        ${Array.isArray(se)?se.length:0}</span
      >
      ${ve===null?"":c`<span class="mon2-deck__total-tokens">
            ${typeof ve=="string"?c`<span
                  class="mon2-deck__tok"
                  title=${kf(be)}
                  >${ve}</span
                >`:ve.map(he=>c`<span
                      class="mon2-deck__tok"
                      data-provider=${he.provider}
                      title=${he.tooltip}
                      >${he.label}</span
                    >`)}
          </span>`}
    </div>`}function Me(){let O=m();return O.length===0?"":c`${ye(O)}
      <div class="mon2-deck__strip">
        ${O.map(se=>oe(se))}
      </div>`}function F(){u!==null&&!y(u)&&(u=null,t.onFocusChange?.(null))}function X(){R(),F(),d!==null&&!y(d)&&L(!0),pt(Me(),r),p?.render()}function Ae(O){let se=O.target;if(!se||typeof se.closest!="function")return;let be=se.closest("[data-root-dir]");if(!be)return;let ve=be.getAttribute("data-root-dir")||"",Pe=se.closest("[data-act]")?.getAttribute("data-act");if(Pe==="worker"){t.gotoWorkerTab?.(ve);return}if(Pe==="auto"){V("worker-automation-toggle",ve,{on:C(ve)?.auto_advance!==!0});return}if(Pe==="merge"){V("worker-merge-auto-toggle",ve,{on:C(ve)?.auto_merge!==!0});return}if(Pe==="gear"){M(ve);return}W(ve)}function Ee(O){if(O.key!=="Enter"&&O.key!==" ")return;let se=O.target;if(!se||typeof se.closest!="function")return;let be=se.closest('[data-root-dir][role="button"]');!be||be!==se||(O.preventDefault(),W(be.getAttribute("data-root-dir")||""))}return r.addEventListener("click",Ae),r.addEventListener("keydown",Ee),{render:X,focusRoot:()=>u,panelRoot:()=>d,destroy(){document.removeEventListener("keydown",Y),r.removeEventListener("click",Ae),r.removeEventListener("keydown",Ee),l.removeEventListener("click",U),I(),pt(c``,r),e.replaceChildren()}}}var Sv=1e4,Ef="bdui.monitor.done-range",Tf="bdui.monitor.running_sort",Cf="bdui.monitor.candidate_sort",Of="beads-ui.monitor.candidate-filter",Rf="beads-ui.monitor.sections";function Ev(){try{let e=window.localStorage.getItem(Of);if(!e)return{...vo};let t=JSON.parse(e);return!t||typeof t!="object"?{...vo}:{show_blocked:typeof t.show_blocked=="boolean"?t.show_blocked:vo.show_blocked,readiness:ts.some(n=>n.value===t.readiness)?t.readiness:"all"}}catch{return{...vo}}}function xf(e){try{window.localStorage.setItem(Of,JSON.stringify({show_blocked:e.show_blocked,readiness:e.readiness}))}catch{}}function Tv(){try{let e=window.localStorage.getItem(Cf);return es.some(t=>t.value===e)?e:"repo_spec"}catch{return"repo_spec"}}function Cv(e){try{window.localStorage.setItem(Cf,e)}catch{}}function Ov(){try{let e=window.localStorage.getItem(Rf);if(!e)return{};let t=JSON.parse(e);return t&&typeof t=="object"?t:{}}catch{return{}}}function Rv(e){try{window.localStorage.setItem(Rf,JSON.stringify(e))}catch{}}function Iv(){try{let e=window.localStorage.getItem(Ef);return e===null?"today":Hn(e)}catch{return"today"}}function Lv(e){try{window.localStorage.setItem(Ef,e)}catch{}}function Dv(){try{return window.localStorage.getItem(Tf)==="repo"?"repo":"started"}catch{return"started"}}function Pv(e){try{window.localStorage.setItem(Tf,e)}catch{}}var If="tab:monitor:pipeline",Mv=1e3,Af=[{lane:"runnable",pane:"candidate",title:"\uD6C4\uBCF4",empty:"\uC2E4\uD589 \uC790\uACA9\uC744 \uAC16\uCD98 \uC774\uC288 \uC5C6\uC74C"},{lane:"queue",pane:"queue",title:"\uB300\uAE30",empty:"\uD45C\uC2DC\uD560 \uB808\uD3EC \uC5C6\uC74C"},{lane:"running",pane:"running",title:"\uC2E4\uD589 \uC911",empty:"\uC2E4\uD589 \uC911 \uC5C6\uC74C"},{lane:"pr_wait",pane:"pr_wait",title:"PR \uB300\uAE30",empty:"PR \uC5C6\uC74C"},{lane:"done",pane:"done",title:"\uC644\uB8CC",empty:"\uC644\uB8CC \uAE30\uB85D \uC5C6\uC74C"}],qv=["queue","runnable","done"],Sf="\u2460\u2461\u2462\u2463\u2464\u2465\u2466\u2467\u2468\u2469\u246A\u246B\u246C\u246D\u246E\u246F\u2470\u2471\u2472\u2473";function Nv(e){return e>=1&&e<=Sf.length?Sf[e-1]:`(${e})`}function Lf(e,t){let n=Ht("views:monitor"),r=t.gotoIssue,o=t.pipelineStore,i=t.transport,s=t.getWorkspacePath,l=t.openDoc,a=t.switchWorkspace,u=t.router,d=t.now||(()=>Date.now()),p=t.confirm||(b=>typeof globalThis.confirm!="function"||globalThis.confirm(b)),_=Iv(),m=Dv(),y=Ev(),C=Tv(),R=Ov(),V=Zi("beads-ui.monitor.lane-collapsed"),te=!1,W=null,M=null,I=null,L=null,U=co(()=>x()),Y=null,q=null,N=null,z=null;function G(b){return z===null&&(z=H()),qd(b,z)}function oe(b,v){ye(),!(v<=0)&&(q={lane_id:b,corrected:v},N=setTimeout(()=>{N=null,q=null,x()},Sv))}function ye(){N!==null&&(clearTimeout(N),N=null),q=null}function Me(){let b=Qr.find(v=>v.value===_);return b?b.label:""}let F=document.createElement("div");F.className="mon",e.appendChild(F);let X=document.createElement("div");X.className="worker-drawer-overlay",X.hidden=!0;let Ae=document.createElement("div");Ae.className="worker-drawer-overlay__backdrop";let Ee=document.createElement("div");Ee.className="worker-drawer-host mon2-drawer",X.append(Ae,Ee),e.appendChild(X);let O=yr(null,null),se=new Map,be=new Map,ve=null,Pe=null,he=null,Re=xo(Ee,{transport:i,sessionLogStore:t.sessionLogStore,onClose:()=>{M=null,X.hidden=!0,x()}}),Xe=ea({transport:i,console_el:F,getLanes:()=>O,getWorkspaces:()=>o&&o.get?o.get():null,getCrossLanes:xt,reproject:b=>({lanes:je(b),raw_lanes:b}),onCorrection:oe,showToast:me,requestRender:()=>x(),adoptQueue:(b,v)=>{be.set(b,v)},onDragBegin:()=>{I=null},candidate_drop:!0}),{applyDrop:dt,dropModel:H,runPlanned:J,sendQueueCas:re}=Xe;async function fe(b,v,P,f,k=!0){if(!i||!P)return null;let B=await i(b,{...v,root_dir:P,expected_revision:f});if(B&&B.conflict&&k){B.queue&&be.set(P,B.queue);let ce=B.queue&&typeof B.queue.revision=="number"?B.queue.revision:f;B=await i(b,{...v,root_dir:P,expected_revision:ce})}return B&&B.queue&&P&&be.set(P,B.queue),B}function Se(b,v){let P=be.get(b),f=o&&o.get?o.get():null,k=(Array.isArray(f)?f:[]).find(ce=>ce?.root_dir===b);return(P||k)?.merge_queue?.find(ce=>ce.bead_id===v)?.continuation_action}async function _e(b,v,P,f){let k=await fe(b,v,P,f),B=be.get(P)?.revision??k?.queue?.revision??f;return _r(k,(ce,ue)=>fe(b,{...v,continuation:ce,decision_token:ue},P,B,!1),{refresh:ce=>fe(b,v,P,ce?.queue?.revision??be.get(P)?.revision??B,!1)})}async function qe(b,v,P,f){let k=await _r({continuation_mismatch:f},(ce,ue)=>fe("worker-merge-queue-add",{bead_id:v,continuation:ce,decision_token:ue},b,P,!1)),B=k?.queue?.merge_queue?.find(ce=>ce.bead_id===v)?.continuation_action;k?.applied!==!0&&B?.continuation===null&&B.mismatch&&await qe(b,v,k.queue.revision,B.mismatch)}async function Fe(b,v,P){let f=await fe("worker-discard",b,v,P);if(f&&f.discarded===!0){me(mi(f),"success",5e3);return}if(f&&f.reason){me(`\uD3D0\uAE30 \uC2E4\uD328: ${f.reason}`,"error");return}if(f&&f.accepted&&f.pending==="merged_revert"){me("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success");return}if(f&&f.accepted){me(`\uD3D0\uAE30 \uC9C4\uD589: ${f.phase||"\uBC31\uC5C5 \uC911"}`,"success");return}f&&!f.conflict&&me("\uD3D0\uAE30 \uAC70\uBD80: unknown","error")}async function Ve(b,v,P,f){let k=await fe("worker-discard-abandon",b,v,P);if(k&&k.abandoned===!0){me(_i(f),"success",5e3);return}if(k&&k.reason){me(`\uD3D0\uAE30 \uD3EC\uAE30 \uAC70\uBD80: ${k.reason}`,"error");return}k&&!k.conflict&&me("\uD3D0\uAE30 \uD3EC\uAE30 \uAC70\uBD80: unknown","error")}async function He(b,v,P){return!i||!P?null:await i(b,{...v,root_dir:P})}async function ee(){let b=new Map;for(let v of O.pr_wait)b.has(v.root_dir)||b.set(v.root_dir,v.expected_revision);for(let[v,P]of b)await fe("worker-merge-queue-add-all",{},v,P)}function Q(b){let v=R[b];return!!(v&&v.runnable===!0)}function xe(b){let v={...R[b]||{}};v.runnable=!v.runnable,R={...R,[b]:v},Rv(R),x()}function mt(b){V.toggle(b),x()}function ft(b){V.toggleArea(b),x()}function Ke(b){let v=b.dependency_chips||null,P=b.overlap_chips||[],f=b.scope_state==="missing",k=b.armed_lane_chip;return!v&&P.length===0&&!f&&!k?null:{...v||{},...P.length>0?{overlaps:P}:{},...f?{scope_missing:!0}:{},...k?{armed_lane:k}:{}}}function Je(b){return wi(b,v=>U.isOpen({bead_id:b.id,chip_key:v}))}function A(b){let v=Ke(b),P=Je(b);return v||P?{...b,...v?{dependency_chips:v}:{},...P?{chip_popover:P}:{}}:b}function Z(b){let v=Q(b.root_dir);return c`<header class="mon2-sec__hd">
      <button
        type="button"
        class="mon2-sec__toggle"
        data-root-dir=${b.root_dir}
        data-section="runnable"
        aria-expanded=${v?"false":"true"}
        aria-label=${`${b.name} \uC139\uC158 ${v?"\uD3BC\uCE58\uAE30":"\uC811\uAE30"}`}
      >
        ${v?"\u25B8":"\u25BE"}
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
    </header>`}function Ie(b,v){return c`<div
      class="mon2-item"
      data-bead-id=${b.id}
      data-drag-kind="candidate"
      data-root-dir=${b.root_dir}
    >
      ${v}
    </div>`}function Ge(b){if(I!==b.id)return null;let v=O.queue_groups.find(B=>B.root_dir===b.root_dir),P=b.place_lanes||[],f=O.cross_lanes_revision!==null,k=[{id:"parallel",label:"\uBCD1\uB82C",count:b.place_index??0}];for(let B of O.chain_lanes)k.push({id:`lane:${B.lane_id}`,label:`\uC5F0\uACB0 ${B.number} (${B.draft?"draft":"\uD655\uC815"}) \uB05D\uC5D0`,count:B.rows.length,group:"\uC5F0\uACB0 \uB808\uC778",disabled:!f});k.push({id:"new-lane",label:"+ \uC0C8 \uC5F0\uACB0 \uB808\uC778",group:"\uC5F0\uACB0 \uB808\uC778",disabled:!f,title:f?"\uC774 \uC774\uC288\uB9CC \uB4E0 draft \uB808\uC778\uC744 \uB9CC\uB4ED\uB2C8\uB2E4":"\uC5F0\uACB0 \uB808\uC778 \uC800\uC7A5\uC18C\uB97C \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"});for(let B of P)k.push({id:`serial:${B.id}`,label:`\uC9C1\uB82C ${Number(B.id.slice(1))}`,count:B.length,group:`${v?v.name:""} \uC9C1\uB82C`});return{bead_id:b.id,lanes:k}}function tt(b){return Ie(b,c`${Ja(A(b),Ge(b),{exec_chips_mode:"pinned_only",onOpenDoc:l?(v,P)=>l(P,b.root_dir):void 0})}`)}function Ce(){return O.runnable_flat?c`<div class="mon2-flat" data-drop="candidate">
        ${O.runnable.map(b=>tt(b))}
      </div>`:c`${O.runnable_sections.map(b=>{let v=Q(b.root_dir);return c`<section
        class="mon2-sec${v?" is-collapsed":""}"
        data-root-dir=${b.root_dir}
        data-section="runnable"
      >
        ${Z({root_dir:b.root_dir,name:b.name,count:b.items.length})}
        ${v?"":c`<div
              class="mon2-sec__body"
              data-lane="candidate"
              data-drop="candidate"
            >
              ${b.items.map(P=>tt(P))}
            </div>`}
      </section>`})}`}function Ze(b,v){return c`<div
      class="mon2-item"
      data-bead-id=${b.id}
      data-drag-kind="parallel"
      data-root-dir=${b.root_dir}
      data-row-index=${v}
      data-queue-index=${String(b.queue_index??0)}
    >
      ${qn(A(b),{actions:yo(b,{nudgeable:!0})})}
    </div>`}function Ut(b,v,P,f){return c`<div
      class="mon2-crow${v.fixed?" mon2-crow--fixed":""}"
      draggable=${v.draggable?"true":"false"}
      data-bead-id=${v.id}
      data-drag-kind="chain"
      data-root-dir=${v.root_dir}
      data-lane-id=${b.lane_id}
      data-row-index=${P}
      data-queue-index=${typeof v.queue_index=="number"?String(v.queue_index):""}
    >
      <span class="mon2-crow__seq" aria-hidden="true"
        >${Nv(v.seq)}</span
      >
      ${v.workspace_name?c`<span class="worker-mini__repo" title=${v.root_dir}
            >${v.workspace_name}</span
          >`:""}
      <span class="worker-mini__id" title="클릭하면 ID 복사">${v.id}</span>
      <span class="mon2-crow__title">${v.title}</span>
      ${v.mismatch?c`<span
            class="mon2-crow__mismatch"
            title="레인 순서가 주장하는 선행이 bd 의존에 없습니다 — 재적용으로 복구합니다"
            >⚠ 의존 없음</span
          >`:""}
      ${f.includes(v.id)?c`<span
            class="mon2-crow__mismatch"
            title="이미 실행된 뒤 의존이 바뀌었습니다 — 이 행은 움직일 수 없어 교정하지 않습니다"
            >⚠ 의존 순서와 다름</span
          >`:""}
      <span class="mon2-crow__where" title=${v.location_title}
        >${v.location_label}</span
      >
      <button
        type="button"
        class="mon2-crow__detach"
        data-bead-id=${v.id}
        title="연결에서 빼고 앞뒤를 이어 붙입니다"
        aria-label="연결에서 빼기"
      >
        ✕
      </button>
    </div>`}function wt(b){let v=O.cross_lanes_revision!==null,P=G(b.lane_id),f=P?.held===!0,k=P?.cycle===!0,B=P?P.mismatched:[],ce=q&&q.lane_id===b.lane_id?q.corrected:0;return c`<div class="mon2-clane" data-lane-id=${b.lane_id}>
      <header class="mon2-clane__hd">
        <span class="mon2-clane__name">${b.label}</span>
        <span class="mon2-clane__count">${b.rows.length}</span>
        <span class="mon2-clane__badge mon2-clane__badge--${b.state}"
          >${b.badge}</span
        >
        ${ce>0?c`<span
              class="mon2-clane__corrected"
              title="기존 blocks 의존이 드롭 순서를 이깁니다 — 그 순서로 다시 놓았습니다"
              >의존에 맞춰 ${ce}건 자동 교정</span
            >`:""}
        ${k?c`<span
              class="mon2-clane__cycle"
              title="멤버들의 blocks 의존이 순환합니다 — 어느 순서도 의존을 만족시키지 못합니다"
              >⛔ 의존 사이클 — 자동 교정 불가</span
            >`:""}
        ${f?c`<span
              class="mon2-clane__hold"
              title="멤버 한 명의 의존 자료가 이 스냅샷에 아직 없습니다 — 다음 스냅샷이 채우면 교정합니다"
              >${Oi}</span
            >`:""}
        ${b.draft?c`<button
              type="button"
              class="mon2-clane__confirm"
              data-lane-id=${b.lane_id}
              ?disabled=${!v||!b.can_confirm||f}
              title=${f?Oi:b.can_confirm?"\uC778\uC811 \uC758\uC874\uC744 \uAC78\uACE0 \uBBF8\uC801\uC7AC \uBA64\uBC84\uB97C \uAC01\uC790 \uB808\uD3EC \uBCD1\uB82C \uD050 \uB05D\uC5D0 \uC62C\uB9BD\uB2C8\uB2E4":"\uBA64\uBC84\uAC00 2\uAC1C \uC774\uC0C1\uC774\uC5B4\uC57C \uD655\uC815\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4"}
            >
              확정
            </button>`:""}
        ${b.run_label!==null?c`<button
              type="button"
              class="mon2-clane__run"
              data-lane-id=${b.lane_id}
              ?disabled=${!v}
              title="이 레인 멤버만 발차합니다 — 레포 자동 진행은 켜지 않습니다"
            >
              ${b.run_label}
            </button>`:""}
        ${b.state==="confirmed"&&b.has_mismatch?c`<button
              type="button"
              class="mon2-clane__reapply"
              data-lane-id=${b.lane_id}
              ?disabled=${!v}
              title="빠진 인접 의존을 다시 걸고 미적재 멤버를 다시 올립니다"
            >
              재적용
            </button>`:""}
        ${b.can_stop?c`<button
              type="button"
              class="mon2-clane__stop"
              data-lane-id=${b.lane_id}
              ?disabled=${!v}
              title="남은 멤버의 발차만 멈춥니다 — 도는 세션과 머지 큐 항목은 끝까지 갑니다"
            >
              ⏸ 정지
            </button>`:""}
        <button
          type="button"
          class="mon2-clane__remove"
          data-lane-id=${b.lane_id}
          ?disabled=${!v}
          title=${b.draft?"\uC774 draft \uB808\uC778\uC744 \uC9C0\uC6C1\uB2C8\uB2E4":"\uC774 \uB808\uC778\uACFC \uB808\uC778\uC774 \uB9CC\uB4E0 \uC758\uC874\uC744 \uD568\uAED8 \uC9C0\uC6C1\uB2C8\uB2E4"}
          aria-label="연결 레인 삭제"
        >
          ✕
        </button>
      </header>
      <div
        class="mon2-clane__body"
        data-drop="chain"
        data-lane-id=${b.lane_id}
      >
        ${b.rows.length===0?c`<div class="mon2-clane__hint">
              여기로 끌어다 놓으면 연결이 시작됩니다
            </div>`:b.rows.map((ue,Be)=>Ut(b,ue,Be,B))}
      </div>
    </div>`}function bt(b,v,P){return c`<div
      class="mon2-item"
      data-bead-id=${v.id}
      data-drag-kind="repo-serial"
      data-root-dir=${v.root_dir}
      data-lane-id=${b.id}
      data-row-index=${P}
      data-queue-index=${String(v.queue_index??0)}
    >
      ${qn(A(v),{actions:yo(v)})}
    </div>`}function Ft(b){if(b.length===0)return"";let v=b.length-1;return`${b[0].id} \uC810\uC720${v>0?` +${v}`:""}`}function Ct(b){return c`<div
      class="mon2-item mon2-item--ghost"
      data-bead-id=${b.id}
    >
      ${qn({id:b.id,title:b.title,lane:"running",draggable:!1,ghost:!0,badges:[b.badge]})}
    </div>`}function Mt(b,v){let P=v.occupants,f=v.cross_wait_peers||[];return{id:v.id,pane_id:"",title:`${b.name} \xB7 \uC9C1\uB82C ${v.index+1}`,rows:[...P.map(k=>Ct(k)),...v.items.map((k,B)=>bt(v,k,B))],count:v.items.length,empty:v.empty===!0,...P.length>0?{badge:c`<span
              class="mon2-lane__occupant"
              title=${P.map(k=>`${k.id} \u2014 ${k.badge}`).join(`
`)}
              >${Ft(P)}</span
            >`,held:!0}:{},cycle:v.cycle,header_control:c`<button
        type="button"
        class="mon2-sec__worker"
        data-root-dir=${b.root_dir}
        title="이 레포의 Worker 탭으로 이동"
      >
        Worker ↗
      </button>`,...f.length>0?{after:c`${f.map(k=>c`<div class="mon2-lane__cross-wait">
                  ⚠ 상호 정지 — ${k.workspace_name}·${k.lane}과 교차 대기
                </div>`)}`}:{}}}function de(){let b=O.cross_lanes_revision!==null,v=O.chain_lanes.some(P=>P.draft&&P.rows.length===0);return $i({parallel:{rows:O.parallel_rows.map((P,f)=>Ze(P,f)),count:O.parallel_rows.length,collapsed:V.isAreaCollapsed("parallel"),drop:{drop:"parallel"}},serial:{lanes:O.queue_groups.flatMap(P=>P.sublanes.serial.map(f=>({...Mt(P,f),drop:{drop:"repo-serial",root_dir:P.root_dir,lane_id:f.id,lane_length:String(f.raw_length)}}))),collapsed:V.isAreaCollapsed("serial"),extra_panes:O.chain_lanes.map(P=>wt(P)),header_control:c`<button
          type="button"
          class="mon2-newlane"
          ?disabled=${v||!b}
          title=${b?v?"\uBE48 \uC5F0\uACB0 \uB808\uC778\uC774 \uC774\uBBF8 \uC788\uC2B5\uB2C8\uB2E4":"\uBE48 \uC5F0\uACB0 \uB808\uC778\uC744 \uD558\uB098 \uB9CC\uB4ED\uB2C8\uB2E4":"\uC5F0\uACB0 \uB808\uC778 \uC800\uC7A5\uC18C\uB97C \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"}
        >
          + 연결 레인
        </button>`,...O.cross_lanes_unreadable?{notice:c`<div class="mon2-clane__unreadable">
                연결 레인 저장소를 읽을 수 없음
              </div>`}:{}}})}function ke(b){return c`<div class="worker-rungrid">
      ${O.running.length===0?c`<div class="worker-rungrid__empty">실행 세션 없음</div>`:O.running.map(v=>Hl({bead_id:v.id,attempt_id:v.attempt_id||"",title:v.title,runner:v.runner??null,model:v.model??null,effort:v.effort??null,speed:v.speed??null,started_at:v.started_at??null,kind:v.kind,...v.kind==="session"?{updated_at:v.updated_at,session_refs:v.session_refs||[]}:{},workflow:v.workflow||null,resumed_from:v.resumed_from??null,continuation_mode:v.continuation_mode??null,paused:v.run_state==="paused",failed:v.run_state==="failed",parked:v.run_state==="parked",retry_wait:v.run_state==="retry_wait",waiting:v.run_state==="waiting",wait:v.wait||null,retry:v.retry||null,status:v.status,status_label:v.run_state==="failed"?"\uC2E4\uD328":v.run_state==="parked"?"\uC138\uC158 \uB300\uAE30":v.run_state==="retry_wait"?"\uC7AC\uC2DC\uB3C4 \uB300\uAE30":v.run_state==="waiting"?"\uC120\uD589 \uB300\uAE30":void 0,can_pause:v.can_pause!==!1,exec_chips:v.exec_chips||null,usage:v.usage||null,chip_popover:Je(v),discard:v.discard,failure:v.failure?{...v.failure,open:L===v.attempt_id}:null},b,M,{monitor:{repo:v.workspace_name,root_dir:v.root_dir,serial_lane_id:v.serial_lane_id,cross_lane_chip:v.cross_lane_chip||null,last_activity:v.last_activity||null,legs:v.legs||[],dependency_chips:Ke(v)}}))}
    </div>`}function Ue(b){let v={runnable:O.runnable,queue:O.queue,running:O.running,pr_wait:O.pr_wait,done:O.done},P=f=>{let k=v[f.lane],B=f.lane==="runnable"?O.runnable_flat?k.length>0?Ce():void 0:O.runnable_sections.length>0?Ce():void 0:f.lane==="queue"?O.queue_groups.length>0||O.chain_lanes.length>0||O.parallel_rows.length>0||O.cross_lanes_unreadable?de():void 0:f.lane==="running"?ke(b):k.length>0?c`${k.map(ce=>qn(A(ce)))}`:void 0;return Vn({id:`monitor-${f.lane}`,lane:f.pane,title:f.title,items:k,count:k.length,src:f.lane==="runnable",empty:f.empty,body:B,live:f.lane==="running"&&k.length>0,collapsible:!0,collapsed:V.isCollapsed(f.pane),controls:f.lane==="runnable"?rt():void 0,header_control:et(f.lane,k.length)})};if(te){let f=qv.map(k=>Af.find(B=>B.lane===k)).filter(k=>k!==void 0);return c`<div class="mon2-deck"></div>
        <div class="worker-lanes-host">
          <div class="worker-lanes worker-lanes--mobile mon2-lanes">
            ${xi({live:O.running.length>0,running_body:O.running.length>0?ke(b):"",pr_wait_rows:O.pr_wait.map(k=>qn(A(k))),count:O.running.length+O.pr_wait.length})}
            ${f.map(k=>P(k))}
          </div>
        </div>`}return c`<div class="mon2-deck"></div>
      <div class="worker-lanes-host">
        <div class="worker-lanes mon2-lanes">
          ${Af.map(f=>P(f))}
        </div>
      </div>`}function rt(){return c`<div class="worker-filter">
      <label class="worker-filter__tgl" title="blocked 이슈 표시">
        <input
          type="checkbox"
          class="mon-filter__blocked"
          .checked=${y.show_blocked}
        />
        🔒
        blocked${O.runnable_hidden.blocked>0?` ${O.runnable_hidden.blocked}`:""}
      </label>
      <div
        class="worker-filter__readiness"
        role="group"
        aria-label="준비도 필터"
      >
        ${ts.map(b=>c`<button
              type="button"
              class="mon-filter__readiness worker-filter__chip${y.readiness===b.value?" is-active":""}"
              data-readiness=${b.value}
              aria-pressed=${y.readiness===b.value?"true":"false"}
            >
              ${b.label}
            </button>`)}
        ${O.runnable_hidden.readiness>0?c`<span class="worker-filter__hidden"
              >숨김 ${O.runnable_hidden.readiness}</span
            >`:""}
      </div>
    </div>`}function et(b,v){return b==="runnable"?c`<select
        class="mon-candidate-sort worker-sort"
        aria-label="후보 정렬"
        title="후보 정렬"
        .value=${C}
      >
        ${es.map(P=>c`<option
              value=${P.value}
              ?selected=${C===P.value}
            >
              ${P.label}
            </option>`)}
      </select>`:b==="running"?c`<select
        class="mon-running-sort worker-sort"
        aria-label="실행중 정렬"
        title="실행중 정렬"
        .value=${m}
      >
        <option value="started" ?selected=${m==="started"}>
          시작순
        </option>
        <option value="repo" ?selected=${m==="repo"}>
          레포순
        </option>
      </select>`:b==="pr_wait"&&v>0?c`<button
        type="button"
        class="mon-lane-op mon-merge-all"
        title="자격이 생기는 PR을 각 레포의 머지 큐에 한 번에 넣습니다"
      >
        일괄 머지
      </button>`:b==="done"?c`<select
        class="mon-done-range worker-sort"
        aria-label="완료 기간"
        title="완료 기간"
        .value=${_}
      >
        ${Qr.map(P=>c`<option value=${P.value} ?selected=${_===P.value}>
              ${P.label}
            </option>`)}
      </select>`:""}function je(b){let v=o&&o.get?o.get():null,P=o&&o.getWorkspacesState?o.getWorkspacesState():[],f=b===void 0?o&&o.crossLanes?o.crossLanes():void 0:b,k={done_since:Lr(_,d()),running_sort:m,candidate_filter:y,candidate_sort:C};return f!==void 0&&(k.cross_lanes=f),yr(v,P,k)}function x(){let b=d();O=je(),z=null,se=new Map;for(let v of[...O.runnable,...O.queue,...O.running,...O.pr_wait,...O.done])!v.non_occupying&&!se.has(v.id)&&se.set(v.id,v);pt(Ue(b),F),ae()?.render(),j(),ge()}function j(){let b=new Map;for(let v of O.queue_groups)b.set(v.root_dir,v.auto_advance);for(let v of Array.from(F.querySelectorAll(".worker-wait__area--parallel .worker-mini__repo"))){let P=v.closest(".mon2-item")?.getAttribute("data-root-dir")||"",f=b.get(P);typeof f=="boolean"&&v.setAttribute("title",`${v.textContent||""} \xB7 ${f?"\uC790\uB3D9\uD654 \uCF1C\uC9D0":"\uC790\uB3D9\uD654 \uAEBC\uC9D0"}`)}}function ae(){if(he)return he;let b=F.querySelector(".mon2-deck");return b?(he=$f(b,{workspacesState:()=>o&&o.getWorkspacesState?o.getWorkspacesState():[],doneItems:()=>O.done,rangeLabel:Me,transport:i,implPresetStore:t.execPresetStore,gotoWorkerTab:it,onFocusChange:v=>{Y=v,ge()}}),he):null}function ge(){F.classList.toggle("has-focus",Y!==null);for(let b of Array.from(F.querySelectorAll(".mon2-sec[data-root-dir]")))b.classList.toggle("is-focus",Y!==null&&b.getAttribute("data-root-dir")===Y);for(let b of Array.from(F.querySelectorAll(".mon2-item[data-bead-id], .rtile[data-bead-id], .worker-mini[data-bead-id], .worker-card[data-bead-id]"))){let v=se.get(b.getAttribute("data-bead-id")||"");b.classList.toggle("is-focus",Y!==null&&!!v&&v.root_dir===Y)}for(let b of Array.from(F.querySelectorAll(".mon2-crow[data-root-dir]")))b.classList.toggle("is-focus",Y!==null&&b.getAttribute("data-root-dir")===Y)}function le(b,v){let P=s?s():void 0;if(!v||!P||v===P||!a){r(b);return}a(v).then(()=>{r(b)}).catch(f=>{n("workspace switch for %s failed: %o",v,f)})}function it(b){if(!b)return;let v=s?s():void 0,P=()=>{try{u?.gotoView("worker")}catch(f){n("gotoView(worker) failed: %o",f)}};if(!a||v&&v===b){P();return}a(b).then(P).catch(f=>{n("workspace switch for %s failed: %o",b,f),me("\uB808\uD3EC \uC804\uD658\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error")})}function It(b){gn(b).then(v=>{me(v?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",v?"success":"error",1400)})}function yt(b){let v=se.get(b)||null;return{item:v,root_dir:v?v.root_dir:"",revision:v?v.expected_revision:0}}async function $t(b,v,P){if(b!=="dep-add")return;let f=O.chain_lanes.find(k=>k.rows.some(B=>B.id===v));!f||!f.rows.some(k=>k.id===P)||await J(k=>Ud(f.lane_id,k),"",[{type:b,a:v,b:P}])}function xt(){return(o&&o.crossLanes?o.crossLanes():null)??null}async function Lt(b,v){if(b==="run"){await Dt(v);return}if(b==="stop"){await Jt(v);return}if(b==="create"){await J(P=>ul(null,P),"");return}if(b==="remove"){let P=zd(v,H());if(P!==null&&!p(P))return;await J(f=>Wd(v,f),"");return}await J(P=>b==="confirm"?Fd(v,P):Bd(v,P),"")}function qt(b){let v=new Map;for(let P of b.rows){let f=O.owner_of[P.id]||P.root_dir;typeof f!="string"||f.length===0||v.set(f,[...v.get(f)||[],P.id])}return v}async function Dt(b){let v=O.chain_lanes.find(B=>B.lane_id===b);if(!v||O.cross_lanes_revision===null){x();return}ye();let P=new Map,f=new Map,k=qt(v);for(let B of v.rows){if(B.fixed||typeof B.queue_index=="number")continue;let ce=O.owner_of[B.id]||B.root_dir;if(typeof ce!="string"||ce.length===0){me(`${B.id}\uC758 \uB808\uD3EC\uB97C \uC54C \uC218 \uC5C6\uC5B4 \uC801\uC7AC\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4`,"error"),x();return}let ue=f.get(ce)??0;if(await re("worker-queue-place",{bead_id:B.id,lane:"parallel",index:(O.parallel_raw_length[ce]??0)+ue},ce,P,{bead_id:B.id})===null){x();return}f.set(ce,ue+1)}for(let[B,ce]of k)if(await re("worker-queue-arm",{bead_ids:ce,lane_id:b},B,P,{bead_id:ce[0]})===null){me("\uC77C\uBD80 \uB808\uD3EC\uC5D0\uC11C \uC9C4\uD589\uC744 \uCF1C\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 \u2014 [\u25B6 \uC774\uC5B4\uC11C \uC9C4\uD589]\uC73C\uB85C \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC138\uC694","error"),x();return}x()}async function Jt(b){let v=O.chain_lanes.find(f=>f.lane_id===b);if(!v||O.cross_lanes_revision===null){x();return}ye();let P=new Map;for(let[f,k]of qt(v))if(await re("worker-queue-disarm",{lane_id:b},f,P,{bead_id:k[0]})===null)break;x()}async function Vt(b,v){let{root_dir:P,revision:f}=yt(b);if(P.length===0){x();return}await re("worker-queue-disarm",{bead_ids:[b],lane_id:v},P,new Map([[P,f]]),{bead_id:b}),x()}async function At(b,v){let P=se.get(b);if(!P){x();return}let f={kind:"candidate",bead_id:b,root_dir:P.root_dir};if(v==="new-lane"){await J(k=>ul({bead_id:b,root_dir:P.root_dir},k),b);return}if(v.startsWith("lane:")){let k=v.slice(5);if(!O.chain_lanes.find(ce=>ce.lane_id===k)){x();return}await J(ce=>Ii(f,{kind:"chain",lane_id:k,marker_index:(ce.cross_lanes.get(k)?.entries??[]).length},ce),b);return}if(v.startsWith("serial:")){let k=v.slice(7),B=(P.place_lanes||[]).find(ce=>ce.id===k);await dt(f,{kind:"repo-serial",root_dir:P.root_dir,lane_id:k,index:B?B.index:0});return}await dt(f,{kind:"parallel",marker_index:O.parallel_rows.length})}async function Wt(b,v){let P=O.parallel_rows,f=P.findIndex(_t=>_t.id===b);if(f<0)return;let k=P[f].root_dir,B=[];P.forEach((_t,gt)=>{_t.root_dir===k&&B.push(gt)});let ce=B.indexOf(f),ue=B[ce+v];if(typeof ue!="number")return;let Be=v===-1?ue:B[ce+2]??Math.min(P.length,ue+1);await dt({kind:"parallel",bead_id:b,root_dir:k,queue_index:P[f].queue_index??0},{kind:"parallel",marker_index:Be})}async function zt(b){for(let v of O.chain_lanes){let P=v.rows.find(f=>f.id===b);if(P){await dt({kind:"chain",bead_id:b,root_dir:P.root_dir,lane_id:v.lane_id,...typeof P.queue_index=="number"?{queue_index:P.queue_index}:{}},{kind:"parallel",marker_index:O.parallel_rows.length});return}}}function on(b){return{runner:b.runner||void 0,model:b.model||void 0,effort:b.effort||void 0,status:b.run_state==="running"?"running":b.run_state,worktree:b.root_dir}}function Kt(b,v){let{item:P,root_dir:f,revision:k}=yt(v),B=P?.attempt_id||"",ce=b.classList;if(ce.contains("worker-mini__rowops-up")||ce.contains("worker-mini__rowops-down")){Wt(v,ce.contains("worker-mini__rowops-up")?-1:1);return}if(ce.contains("worker-mini__rowops-remove")){fe("worker-queue-remove",{bead_id:v},f,k);return}if(ce.contains("mon2-crow__detach")){zt(v);return}if(ce.contains("worker-dep__open")){le(b.getAttribute("data-dep-id")||"",b.getAttribute("data-root-dir")||"");return}if(ce.contains("mon2-arm__release")){Vt(v,b.getAttribute("data-lane-id")||"");return}if(ce.contains("mon-lane__chip")){let ue=b.getAttribute("data-lane-id")||"";F.querySelector(`.mon2-clane[data-lane-id="${ue}"]`)?.scrollIntoView({block:"nearest"});return}if(ce.contains("judgement-chip")){let ue=b.getAttribute("data-chip-key")||"";ue&&U.toggle({bead_id:v,chip_key:ue});return}if(ce.contains("rtile__failure-badge")){L=L===B?null:B,x();return}if(ce.contains("rtile__attempt-copy")){let ue=b.getAttribute("data-attempt-id")||"";ue&&gn(ue).then(Be=>{me(Be?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",Be?"success":"error",1400)});return}if(ce.contains("worker-card__place")){I=I===v?null:v,x();return}if(ce.contains("worker-card__place-cancel")){I=null,x();return}if(ce.contains("worker-card__place-lane")){let ue=b.getAttribute("data-lane")||"parallel";I=null,At(v,ue);return}if(ce.contains("rtile__session")){if(P&&P.kind==="session"){let ue=(P.session_refs||[]).find(Be=>Be&&Be.current===!0);ue&&(X.hidden=!1,Re.open(io(ue,v,"in_progress",f)),x());return}M=B,B&&P&&(X.hidden=!1,Re.open({attempt_id:B,root_dir:f,meta:on(P)})),x();return}if(ce.contains("rtile__pause")){He("worker-attempt-pause",{attempt_id:B},f);return}if(ce.contains("rtile__resume")){so({context:{bead_id:v,kind:b.dataset.resumeKind==="settlement"?"settlement":"session",tuple:P?Sn(P):""},transport:ue=>fe("worker-attempt-resume",{attempt_id:B,...ue},f,be.get(f)?.revision??yt(v).revision,!1)});return}if(ce.contains("rtile__parked-retry")){He("worker-parked-retry",{bead_id:v,attempt_id:B},f).then(ue=>{ue&&ue.ok===!1&&me(`\uC7AC\uC2DC\uB3C4 \uAC70\uBD80: ${ue.reason==="not_latest"?"\uC774 bead\uC5D0 \uB354 \uC0C8\uB85C\uC6B4 \uC2DC\uB3C4\uAC00 \uC788\uC2B5\uB2C8\uB2E4":ue.reason||""}`,"error")});return}if(ce.contains("rtile__discard-abandon")){let ue={kind:b.dataset.operationKind||"",last_error:b.dataset.lastError||""};if(!p(Qo(v,ue)))return;Ve({bead_id:v,operation_id:b.dataset.operationId||""},f,k,ue);return}if(ce.contains("rtile__discard")){let ue=b.dataset.confirmation==="merged"?"merged":"unmerged";if(!p(Vo(v,ue)))return;Fe({bead_id:v,...B?{attempt_id:B}:{},...b.dataset.operationId?{operation_id:b.dataset.operationId}:{}},f,k);return}if(ce.contains("worker-mini__merge")){let ue=Se(f,v);ue?.mismatch&&ue.continuation===null?qe(f,v,k,ue.mismatch):fe("worker-merge-queue-add",{bead_id:v},f,k);return}if(ce.contains("worker-mini__merge-cancel")){fe("worker-merge-queue-remove",{bead_id:v},f,k);return}if(ce.contains("worker-mini__discard-abandon")){let ue={kind:b.dataset.operationKind||"",last_error:b.dataset.lastError||""};if(!p(Qo(v,ue)))return;Ve({bead_id:v,operation_id:b.dataset.operationId||""},f,k,ue);return}if(ce.contains("worker-mini__discard")){let ue=b.dataset.discardMode==="merged"?"merged":"unmerged";if(!p(Vo(v,ue)))return;Fe({bead_id:v,...b.dataset.attemptId?{attempt_id:b.dataset.attemptId}:{},...b.dataset.operationId?{operation_id:b.dataset.operationId}:{}},f,k);return}if(ce.contains("worker-mini__revise-fix")){_e("worker-revise-fix",{bead_id:v},f,k);return}ce.contains("worker-mini__revise-approve")&&fe("worker-revise-approve",{bead_id:v},f,k)}function ln(b){let v=Xe.consumeClickSuppression(),P=b.target;if(!P||typeof P.closest!="function"||P.closest("dialog")||P.closest(".worker-drawer-overlay")||P.closest("a"))return;let f=P.closest(".worker-card__id, .worker-mini__id, .rtile__id");if(f){b.preventDefault();let Le=P.closest(".mon2-item, .rtile, .mon2-crow, .worker-mini")?.getAttribute("data-bead-id")||f.textContent?.trim()||"";Le&&It(Le);return}let k=P.closest(".worker-mini__repo, .worker-card__repo, .mon2-sec__worker");if(k){b.preventDefault();let $=k.getAttribute("data-root-dir")||se.get(P.closest(".mon2-item, .rtile, .worker-mini")?.getAttribute("data-bead-id")||"")?.root_dir||k.getAttribute("title")||"";it($);return}let B=P.closest(".mon2-sec__toggle");if(B){b.preventDefault(),xe(B.getAttribute("data-root-dir")||"");return}let ce=P.closest(".worker-pane__toggle[data-lane]");if(ce){b.preventDefault();let $=ce.getAttribute("data-lane")||"";($==="candidate"||$==="queue"||$==="running"||$==="pr_wait"||$==="done")&&mt($);return}let ue=P.closest(".worker-wait__area-toggle[data-area]");if(ue){b.preventDefault(),ft(ue.getAttribute("data-area")||"parallel");return}if(P.closest(".mon2-newlane")){b.preventDefault(),Lt("create","");return}let Be=P.closest(".mon2-clane__confirm, .mon2-clane__reapply, .mon2-clane__remove, .mon2-clane__run, .mon2-clane__stop");if(Be){b.preventDefault();let $=Be.getAttribute("data-lane-id")||"",Le=Be.classList;Lt(Le.contains("mon2-clane__confirm")?"confirm":Le.contains("mon2-clane__reapply")?"reapply":Le.contains("mon2-clane__run")?"run":Le.contains("mon2-clane__stop")?"stop":"remove",$);return}if(P.closest(".mon-merge-all")){b.preventDefault(),ee();return}let _t=P.closest(".mon-filter__readiness");if(_t){b.preventDefault(),y={...y,readiness:_t.getAttribute("data-readiness")||"all"},xf(y),x();return}let gt=P.closest(".mon2-item, .rtile, .mon2-crow, .worker-mini, .worker-card");if(!gt)return;let at=gt.getAttribute("data-bead-id")||"",S=P.closest("button");if(S){b.preventDefault(),Kt(S,at);return}P.closest(".rtile__failure-pop, .chip-popover")||at&&!v&&(b.preventDefault(),le(at,gt.getAttribute("data-root-dir")||yt(at).root_dir))}function we(b){let v=b.target;if(!v||typeof v.closest!="function")return;let P=v.closest(".mon-filter__blocked");if(P){y={...y,show_blocked:P.checked},xf(y),x();return}let f=v.closest(".mon-candidate-sort");if(f){C=es.some(ce=>ce.value===f.value)?f.value:"repo_spec",Cv(C),x();return}let k=v.closest(".mon-running-sort");if(k){m=k.value==="repo"?"repo":"started",Pv(m),x();return}let B=v.closest(".mon-done-range");B&&(_=Hn(B.value),Lv(_),x())}function T(b){let v=b.target,P=v&&typeof v.closest=="function"?f=>v.closest(f):()=>null;L&&!P(".rtile__failure-pop, .rtile__failure-badge")&&(L=null,x())}function ne(b){b.key!=="Escape"||L===null||(L=null,x())}e.addEventListener("click",ln),e.addEventListener("change",we),document.addEventListener("click",T),document.addEventListener("keydown",ne),U.attach(),Xe.attach(e);{let b=!0;W=Xi(v=>{if(te=v,b){b=!1;return}x()})}o&&typeof o.subscribe=="function"&&(ve=o.subscribe(()=>{try{be.clear(),x()}catch{}}));function De(){Pe!==null&&(clearInterval(Pe),Pe=null)}return{recorrectSharedLane:$t,load(){n("load"),x(),Pe===null&&(Pe=setInterval(()=>{try{x()}catch{}},Mv))},pause(){De()},clear(){De(),Xe.detach(),ve&&(ve(),ve=null),W&&(W(),W=null),Re.destroy(),X.hidden=!0,he?.destroy(),he=null,e.removeEventListener("click",ln),e.removeEventListener("change",we),document.removeEventListener("click",T),document.removeEventListener("keydown",ne),U.detach(),e.replaceChildren()}}}function Df(e,t,n){let r=Ht("views:nav"),{global_element:o,repo_element:i}=e,s=null;function l(_){return m=>{m.preventDefault();let y=_==="monitor"&&a()==="monitor"?"worker":_;r("click tab %s",y),n.gotoView(y)}}function a(){let _=t.getState();return _.view==="worker"||_.view==="monitor"?_.view:"board"}function u(){let _=a();return c`
      <a
        href="#/monitor"
        class="ctl-tab ctl-tab--monitor ${_==="monitor"?"is-active":""}"
        @click=${l("monitor")}
      >
        <span class="ctl-tab__dots" aria-hidden="true"
          ><i></i><i></i><i></i><i></i
        ></span>
        Monitor
      </a>
    `}function d(){let _=a();return c`
      <div class="ctl-tabs">
        <a
          href="#/board"
          class="ctl-tab ${_==="board"?"is-active":""}"
          @click=${l("board")}
          >Board</a
        >
        <a
          href="#/worker"
          class="ctl-tab ${_==="worker"?"is-active":""}"
          @click=${l("worker")}
          >Worker</a
        >
      </div>
    `}function p(){o&&pt(u(),o),i&&pt(d(),i)}return p(),s=t.subscribe(()=>p()),{destroy(){s&&(s(),s=null),o&&pt(c``,o),i&&pt(c``,i)}}}var Pf=["bug","feature","task","epic","chore"];function Mf(e){switch((e||"").toString().toLowerCase()){case"bug":return"Bug";case"feature":return"Feature";case"task":return"Task";case"epic":return"Epic";case"chore":return"Chore";default:return""}}var qf=["Critical","High","Medium","Low","Backlog"];function Nf(e,t){let n=document.createElement("dialog");n.id="new-issue-dialog",n.setAttribute("role","dialog"),n.setAttribute("aria-modal","true"),n.innerHTML=`
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
  `,e.appendChild(n);let r=n.querySelector("#new-issue-form"),o=n.querySelector("#new-title"),i=n.querySelector("#new-type"),s=n.querySelector("#new-priority"),l=n.querySelector("#new-labels"),a=n.querySelector("#new-description"),u=n.querySelector("#new-issue-error"),d=n.querySelector("#btn-cancel"),p=n.querySelector("#btn-create"),_=n.querySelector(".new-issue__close");function m(){i.replaceChildren();let I=document.createElement("option");I.value="",I.textContent="\u2014 Select \u2014",i.appendChild(I);for(let L of Pf){let U=document.createElement("option");U.value=L,U.textContent=Mf(L),i.appendChild(U)}s.replaceChildren();for(let L=0;L<=4;L+=1){let U=document.createElement("option");U.value=String(L);let Y=qf[L]||"Medium";U.textContent=`${L} \u2013 ${Y}`,s.appendChild(U)}}m();function y(){try{typeof n.close=="function"?n.close():n.removeAttribute("open")}catch{n.removeAttribute("open")}}function C(I){o.disabled=I,i.disabled=I,s.disabled=I,l.disabled=I,a.disabled=I,d.disabled=I,p.disabled=I,p.textContent=I?"Creating\u2026":"Create"}function R(){u.textContent=""}function V(I){u.textContent=I}function te(){try{let I=window.localStorage.getItem("beads-ui.new.type");I?i.value=I:i.value="";let L=window.localStorage.getItem("beads-ui.new.priority");L&&/^\d$/.test(L)?s.value=L:s.value="2"}catch{i.value="",s.value="2"}}function W(){let I=i.value||"",L=s.value||"";I.length>0&&window.localStorage.setItem("beads-ui.new.type",I),L.length>0&&window.localStorage.setItem("beads-ui.new.priority",L)}async function M(){R();let I=String(o.value||"").trim();if(I.length===0){V("Title is required"),o.focus();return}let L=Number(s.value||"2");if(!(L>=0&&L<=4)){V("Priority must be 0..4"),s.focus();return}let U=String(i.value||""),Y=String(a.value||""),q={title:I};U.length>0&&(q.type=U),String(L).length>0&&(q.priority=L),Y.length>0&&(q.description=Y),C(!0);try{await t("create-issue",q)}catch{C(!1),V("Failed to create issue");return}W(),C(!1),y()}return n.addEventListener("cancel",I=>{I.preventDefault(),y()}),_.addEventListener("click",()=>y()),d.addEventListener("click",()=>y()),n.addEventListener("keydown",I=>{I.key==="Enter"&&(I.ctrlKey||I.metaKey)&&(I.preventDefault(),M())}),r.addEventListener("submit",I=>{I.preventDefault(),M()}),{open(){r.reset(),R(),te();try{"showModal"in n&&typeof n.showModal=="function"?n.showModal():n.setAttribute("open","")}catch{n.setAttribute("open","")}setTimeout(()=>{try{o.focus()}catch{}},0)},close(){y()}}}var jv=[["route","route \uCE69"],["fast_track","\u26A1 fast_track \uCE69"],["pr","PR \uCE69"],["from","\u21A9 from \uCE69"],["blocked","blocked\xB7\uC0AC\uC6A9\uC790 \uB9AC\uBDF0 \uD544\uC694 \uCE69"],["stepper","stepper"]];function Fv(e,t){return Aa(e,t)?"shown":t.hidden_labels.includes(e)?"hidden_exact":"hidden_prefix"}function jf(e,t,n){return c`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">라벨 표시</div>
      <p class="settings-dialog__hint-block">
        라벨을 눌러 표시/숨김을 전환합니다. prefix 규칙으로 숨겨진 라벨을 누르면
        그 라벨만 예외로 다시 표시됩니다.
      </p>
      ${t.length===0?c`<div class="settings-dialog__empty">라벨 없음</div>`:c`<div class="settings-dialog__pills">
            ${t.map(r=>{let o=Fv(r,e);return c`<button
                type="button"
                class=${`settings-dialog__pill settings-dialog__pill--${o}`}
                data-label=${r}
                data-state=${o}
                @click=${()=>n(r)}
              >
                ${r}
              </button>`})}
          </div>`}
    </section>
  `}function Ff(e,t,n){return c`
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
  `}function Bf(e,t){return c`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">카드 표시 요소</div>
      <div class="settings-dialog__toggles">
        ${jv.map(([n,r])=>c`<label class="settings-dialog__toggle">
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
  `}var Bv=[{id:"execution",label:"\uC2E4\uD589",glyph:"\u25C6"},{id:"display",label:"\uD45C\uC2DC",glyph:"\u25EB"}];function Uf(e,t){let{transport:n,policyStore:r,labelOptions:o}=t,i=t.notify||(oe=>me(oe,"error",4e3)),s=document.createElement("dialog");s.id="settings-dialog",s.className="settings-dialog",s.setAttribute("role","dialog"),s.setAttribute("aria-modal","true"),s.setAttribute("aria-label","\uC124\uC815"),e.appendChild(s);let l="execution",a=!1,u="",d=null;function p(){if(d)return d;let oe=s.querySelector('[data-pane="execution"]');return oe?(d=oa(oe,{root_dir:null,queue:()=>t.queueStore?.get()??null,transport:n,implPresetStore:t.implPresetStore,notify:i,onQueueAdopt:ye=>t.queueStore?.set?.(ye)}),d):null}function _(){return c`
      <section
        class=${`settings-dialog__pane${l==="execution"?" settings-dialog__pane--active":""}`}
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
    `}function m(){let oe=r.get();return c`
      <section
        class=${`settings-dialog__pane${l==="display"?" settings-dialog__pane--active":""}`}
        role="tabpanel"
        id="settings-pane-display"
        aria-label="표시 설정"
      >
        <header class="settings-dialog__pane-head"><h2>표시 설정</h2></header>
        <p class="settings-dialog__pane-sub">
          이 워크스페이스의 라벨·칩 표시 정책입니다.
        </p>
        ${oe?c`
              ${jf(oe,o(),V)}
              ${Ff(oe,u,{onDraft:ye=>{u=ye},onAdd:te,onRemove:W})}
              ${Bf(oe,M)}
            `:c`<div class="settings-dialog__empty">
              표시 정책을 불러오는 중…
            </div>`}
      </section>
    `}async function y(oe){let ye=r.get();if(ye)try{let Me=await n("display-policy-set",{expected_revision:ye.revision,policy:oe(ye)});C(Me),Me&&Me.conflict&&Me.policy&&(Me=await n("display-policy-set",{expected_revision:Me.policy.revision,policy:oe(Me.policy)}),C(Me)),Me&&Me.conflict&&i("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC")}catch{i("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328")}}function C(oe){oe&&oe.policy&&typeof oe.policy=="object"&&r.set(oe.policy)}function R(oe){y(oe)}function V(oe){let ye=r.get();if(!ye)return;let Me=!Uv(oe,ye);R(F=>Wv(oe,F,Me))}function te(){let oe=u.trim();oe.length!==0&&(u="",R(ye=>ye.hidden_prefixes.includes(oe)?{hidden_prefixes:ye.hidden_prefixes}:{hidden_prefixes:[...ye.hidden_prefixes,oe]}),I())}function W(oe){R(ye=>({hidden_prefixes:ye.hidden_prefixes.filter(Me=>Me!==oe)}))}function M(oe){let ye=r.get();if(!ye)return;let Me=ye.chips[oe]===!1;R(()=>({chips:{[oe]:Me}}))}function I(){pt(c`
        <div class="settings-dialog__container">
          <nav
            class="settings-dialog__rail"
            role="tablist"
            aria-orientation="vertical"
          >
            <div class="settings-dialog__rail-title">설정</div>
            ${Bv.map(oe=>c`<button
                  type="button"
                  class="settings-dialog__tab"
                  role="tab"
                  data-tab=${oe.id}
                  aria-selected=${String(l===oe.id)}
                  aria-controls=${`settings-pane-${oe.id}`}
                  @click=${()=>L(oe.id)}
                >
                  <span class="settings-dialog__glyph">${oe.glyph}</span>
                  ${oe.label}
                </button>`)}
            <button
              type="button"
              class="settings-dialog__close"
              aria-label="닫기"
              @click=${G}
            >
              닫기
            </button>
          </nav>
          <div class="settings-dialog__panes">
            ${_()} ${m()}
          </div>
        </div>
      `,s),p()}function L(oe){l=oe,I()}let U=()=>{a=!1,t.onOpenChange?.(!1)};s.addEventListener("close",U),s.addEventListener("cancel",U);let Y=oe=>{oe.target===s&&G()};s.addEventListener("click",Y);let q=null;r.subscribe&&(q=r.subscribe(()=>{a&&I()}));let N=null;t.implPresetStore?.subscribe&&(N=t.implPresetStore.subscribe(()=>{a&&d?.render()}));function z(oe="execution"){a||(a=!0,t.onOpenChange?.(!0),l=oe,u="",I(),typeof s.showModal=="function"?s.showModal():s.setAttribute("open",""),p()?.load())}function G(){a&&(a=!1,t.onOpenChange?.(!1),typeof s.close=="function"?s.close():s.removeAttribute("open"))}return{open:z,close:G,sessionDraft:()=>d?.sessionDraft()??{},destroy(){a=!1,s.removeEventListener("close",U),s.removeEventListener("cancel",U),s.removeEventListener("click",Y),q&&(q(),q=null),N&&(N(),N=null),d?.destroy(),d=null,s.remove()}}}function Uv(e,t){return t.visible_labels.includes(e)?!0:t.hidden_labels.includes(e)?!1:!t.hidden_prefixes.some(n=>n.length>0&&e.startsWith(n))}function Wv(e,t,n){if(!n)return{hidden_labels:t.hidden_labels.includes(e)?t.hidden_labels:[...t.hidden_labels,e],visible_labels:t.visible_labels.filter(i=>i!==e)};let r=t.hidden_labels.filter(i=>i!==e);return t.hidden_prefixes.some(i=>i.length>0&&e.startsWith(i))?{hidden_labels:r,visible_labels:t.visible_labels.includes(e)?t.visible_labels:[...t.visible_labels,e]}:{hidden_labels:r}}var zv=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],Wf="usage-meter-card",Hv="usage-meter-layer",Gl=600,Kv=["token_expired","relogin_required"];function zf(e){return String(e).padStart(2,"0")}function Gv(e,t){let n=Math.max(0,Math.ceil((e-t)/6e4)),r=Math.floor(n/1440),o=Math.floor(n%1440/60),i=n%60;return r>0?`${r}d${o>0?` ${o}h`:""}`:o>0?`${o}h${i>0?` ${i}m`:""}`:`${i}m`}function Hf(e,t=Date.now()){let n=Date.parse(e);if(!Number.isFinite(n))return"";let r=new Date(n),o=new Date(t),i=`${zf(r.getHours())}:${zf(r.getMinutes())}`,l=r.getFullYear()===o.getFullYear()&&r.getMonth()===o.getMonth()&&r.getDate()===o.getDate()?i:`${zv[r.getMonth()]} ${r.getDate()} ${i}`;return`${Gv(n,t)} \xB7 ${l}`}function Yv(e){let t=Math.max(0,Math.floor(e));return t<60?`${t}\uCD08 \uC804`:t<3600?`${Math.floor(t/60)}\uBD84 \uC804`:`${Math.floor(t/3600)}\uC2DC\uAC04 \uC804`}function Kf(e){return e>=85?"usage-meter__window--danger":e>=60?"usage-meter__window--warn":"usage-meter__window--success"}function Gf(e){let t=typeof e=="number"&&Number.isFinite(e)?e:0;return Math.min(100,Math.max(0,t))}var Yf=[{key:"claude",label:"Claude",endpoint:"/api/claude-usage",switch_endpoint:"/api/claude-account/switch",tool:"cswap"},{key:"codex",label:"Codex",endpoint:"/api/codex-usage",switch_endpoint:"/api/codex-account/switch",tool:"codex-auth"}];function Qf(e){let t=[];for(let n of e){if(!n||typeof n!="object")continue;let r=n;typeof r.key!="string"||r.key.length===0||typeof r.pct!="number"||!Number.isFinite(r.pct)||t.push({key:r.key,pct:r.pct,resetsAt:typeof r.resetsAt=="string"?r.resetsAt:""})}return t}function Vv(e){if(!e||typeof e!="object")return null;let t=e;return!Number.isInteger(t.number)||t.number<=0||typeof t.email!="string"||t.email.length===0||typeof t.status!="string"||t.status.length===0||typeof t.active!="boolean"||!Array.isArray(t.windows)?null:{number:t.number,email:t.email,alias:typeof t.alias=="string"&&t.alias.length>0?t.alias:null,plan:typeof t.plan=="string"&&t.plan.length>0?t.plan:null,active:t.active,status:t.status,windows:Qf(t.windows),fetchedAt:typeof t.fetchedAt=="string"?t.fetchedAt:null,ageSeconds:typeof t.ageSeconds=="number"&&Number.isFinite(t.ageSeconds)?t.ageSeconds:null}}function Qv(e,t){if(!e||typeof e!="object")return null;let n=e,r=[];if(Array.isArray(n.accounts))for(let i of n.accounts){let s=Vv(i);s&&r.push(s)}let o=n.available===!0&&Array.isArray(n.windows);return!o&&r.length===0?null:{available:o,windows:o?Qf(n.windows):[],ageSeconds:typeof n.ageSeconds=="number"&&Number.isFinite(n.ageSeconds)?n.ageSeconds:null,accounts:r,receivedAtMs:t,held:!1}}function Xv(e,t){if(!e||typeof e!="object")return{kind:"error"};let n=Qv(e,t);return n?{kind:"ok",snapshot:n}:Array.isArray(e.accounts)?{kind:"empty"}:{kind:"error"}}function Xf(e,t){return(e.ageSeconds===null?0:e.ageSeconds)+Math.max(0,t-e.receivedAtMs)/1e3}function Zv(e,t){return!e.held||Xf(e,t)<=Gl?e:{...e,available:!1,windows:[],accounts:[]}}function Vf(e,t){return`${e}:${t}`}function Zf(e){let t=!1,n=null,r=new Map,o=null,i=new Map,s=new Map,l=0,a=null;function u(){pt(c``,e),e.hidden=!0,p()}function d(){if(a===null){let F=e.ownerDocument;a=F.createElement("div"),a.id=Hv,a.className="usage-meter__layer",F.body.appendChild(a)}return a}function p(){a!==null&&(pt(c``,a),a.remove(),a=null)}function _(F){n!==F&&(n===null&&(document.addEventListener("mousedown",y),document.addEventListener("keydown",R),window.addEventListener("resize",C)),n=F)}function m(){n!==null&&(n=null,document.removeEventListener("mousedown",y),document.removeEventListener("keydown",R),window.removeEventListener("resize",C))}function y(F){let X=F.target;X&&(e.contains(X)||a!==null&&a.contains(X))||(m(),G())}function C(){G()}function R(F){F.key==="Escape"&&(m(),G())}function V(F){n===F?m():_(F),G()}function te(){m(),G()}async function W(F,X){if(r.has(F.key))return;let Ae=Vf(F.key,X);r.set(F.key,X),s.delete(Ae),G();let Ee=null;try{Ee=await(await fetch(F.switch_endpoint,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({number:X})})).json()}catch{Ee=null}if(t)return;if(r.delete(F.key),!Ee||Ee.ok!==!0){let se=Ee&&typeof Ee.error=="string"&&Ee.error.length>0?Ee.error:"network_error";s.set(Ae,{kind:"error",text:`\uC804\uD658 \uC2E4\uD328 \u2014 ${se}`}),G();return}let O=Array.isArray(Ee.warnings)?Ee.warnings.filter(se=>typeof se=="string"&&se.length>0):[];O.length>0&&s.set(Ae,{kind:"warn",text:O.join(" \xB7 ")}),G(),await Me()}function M(F,X,Ae,Ee){let O=Gf(F.pct),be=`resets ${Hf(F.resetsAt,Ee)}${X?` \xB7 ${Ae}`:""}`;return c`<span
      class="usage-meter__window ${Kf(O)}"
      style=${`--progress: ${O}%`}
      title=${be}
    >
      <span class="usage-meter__label">${F.key}</span>
      <span class="usage-meter__track" aria-hidden="true">
        <span class="usage-meter__fill"></span>
      </span>
      <span class="usage-meter__pct">${O}%</span>
    </span>`}function I(F,X,Ae){let Ee=Xf(X,Ae),O=X.available&&(X.held||Ee>Gl),se=O?`${Math.floor(Ee/60)}\uBD84 \uC804 \uCE21\uC815`:"",be=X.accounts.filter(Re=>!Re.active).length,ve=`usage-meter__group${O?" usage-meter__group--stale":""}`,Pe=c`<span class="usage-meter__provider"
        >${F.label}</span
      >
      ${X.available?X.windows.map(Re=>M(Re,O,se,Ae)):c`<span class="usage-meter__empty">사용량 없음</span>`}
      ${be>0?c`<span class="usage-meter__badge">+${be}</span>`:""}`;if(X.accounts.length===0)return c`<span
        class=${ve}
        aria-label=${`${F.label} usage`}
        >${Pe}</span
      >`;let he=n===F.key;return c`<button
      type="button"
      class=${`usage-meter__toggle ${ve}`}
      aria-label=${`${F.label} usage`}
      aria-expanded=${he?"true":"false"}
      aria-controls=${Wf}
      @click=${()=>V(F.key)}
    >
      ${Pe}
    </button>`}function L(F,X){return c`<span class="usage-meter" aria-label="Usage">
      ${F.map(Ae=>I(Ae.provider,Ae.snapshot,X))}
    </span>`}function U(F,X){let Ae=Gf(F.pct),Ee=Hf(F.resetsAt,X);return c`<span
      class="usage-meter__account-window ${Kf(Ae)}"
      style=${`--progress: ${Ae}%`}
    >
      <span class="usage-meter__account-key">${F.key}</span>
      <span class="usage-meter__account-track" aria-hidden="true">
        <span class="usage-meter__account-fill"></span>
      </span>
      <span class="usage-meter__account-pct">${Ae}%</span>
      <span class="usage-meter__account-reset"
        >${Ee.length>0?`\u21BB ${Ee}`:""}</span
      >
    </span>`}function Y(F,X){return Kv.includes(X)?`\uD1A0\uD070 \uB9CC\uB8CC \u2014 ${F.tool} \uC7AC\uB85C\uADF8\uC778 \uD544\uC694`:"\uC0AC\uC6A9\uB7C9 \uC5C6\uC74C"}function q(F,X,Ae){let Ee=X.status==="ok",O=typeof X.ageSeconds=="number"&&X.ageSeconds>Gl,se=s.get(Vf(F.key,X.number)),be=r.get(F.key),ve=be!==void 0,Pe=be===X.number,he=["usage-meter__account"];return X.active&&he.push("usage-meter__account--active"),Ee||he.push("usage-meter__account--unavailable"),O&&he.push("usage-meter__account--stale"),c`<div class=${he.join(" ")}>
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
              >${Yv(X.ageSeconds)}</span
            >`}
        ${X.active?"":c`<button
              type="button"
              class="usage-meter__switch"
              ?disabled=${ve}
              @click=${()=>{W(F,X.number)}}
            >
              ${Pe?"\uC804\uD658 \uC911\u2026":"\uC804\uD658"}
            </button>`}
      </div>
      ${Ee?c`<div class="usage-meter__account-windows">
            ${X.windows.map(Re=>U(Re,Ae))}
          </div>`:c`<div class="usage-meter__account-status">
            ${Y(F,X.status)}
          </div>`}
      ${se===void 0?"":c`<div
            class="usage-meter__account-message usage-meter__account-message--${se.kind}"
          >
            ${se.text}
          </div>`}
    </div>`}function N(F,X,Ae){let Ee=X.accounts.filter(O=>O.active).length;return c`<section class="usage-meter__section">
      <h2 class="usage-meter__section-title">
        ${F.label} · 활성 ${Ee} / 전체
        ${X.accounts.length}
      </h2>
      ${X.accounts.map(O=>q(F,O,Ae))}
    </section>`}function z(F,X){return c`<div
      class="usage-meter__card"
      id=${Wf}
      role="dialog"
      aria-label=${`${F.provider.label} \uACC4\uC815 \uC0AC\uC6A9\uB7C9`}
    >
      ${N(F.provider,F.snapshot,X)}
      <p class="usage-meter__note">전환은 새로 시작하는 세션부터 적용됩니다.</p>
    </div>`}function G(){let F=Date.now(),X=[];for(let Ee of Yf){let O=i.get(Ee.key);O&&X.push({provider:Ee,snapshot:Zv(O,F)})}if(X.length===0){m(),u();return}let Ae=X.find(Ee=>Ee.provider.key===n&&Ee.snapshot.accounts.length>0);Ae||m(),pt(L(X,F),e),e.hidden=!1,Ae?oe(Ae,F):p()}function oe(F,X){let Ae=d(),Ee=e.getBoundingClientRect(),O=e.ownerDocument.documentElement.clientWidth;Ae.style.setProperty("--usage-meter-anchor-top",`${Ee.bottom}px`),Ae.style.setProperty("--usage-meter-anchor-right",`${Math.max(0,O-Ee.right)}px`),pt(c`<div
          class="usage-meter__scrim"
          aria-hidden="true"
          @mousedown=${te}
        ></div>
        ${z(F,X)}`,Ae)}async function ye(F){try{let X=await fetch(F.endpoint);return X.ok?Xv(await X.json(),Date.now()):{kind:"error"}}catch{return{kind:"error"}}}async function Me(){l+=1;let F=l,X=await Promise.all(Yf.map(async Ae=>({provider:Ae,read:await ye(Ae)})));if(!(t||F!==l)){for(let Ae of X){let Ee=Ae.provider.key;if(Ae.read.kind==="ok"){i.set(Ee,Ae.read.snapshot);continue}if(Ae.read.kind==="empty"){i.delete(Ee);continue}let O=i.get(Ee);O!==void 0&&!O.held&&i.set(Ee,{...O,held:!0})}G()}}return u(),Me(),o=setInterval(()=>{Me()},6e4),{destroy(){t=!0,o!==null&&(clearInterval(o),o=null),m(),u()}}}function ws(e){let t=e?.blocked_info;return t&&typeof t=="object"?Array.isArray(t.blockers)?t.blockers.filter(r=>typeof r=="string"&&r.length>0):[]:(Array.isArray(e?.dependencies)?e.dependencies:[]).map(r=>{if(typeof r=="string")return r;if(!r||typeof r!="object")return"";let o=r.type??r.dependency_type;return o!==void 0&&o!=="blocks"?"":r.depends_on_id||r.id||""}).filter(Boolean)}var t_="bdui.worker.candidate_sort",$s=Object.freeze([{id:"spec",label:"spec \uC6B0\uC120",chain:[{key:"spec",dir:"desc"},{key:"created",dir:"asc"}]},{id:"bottleneck",label:"\uBCD1\uBAA9 \uC6B0\uC120",chain:[{key:"priority",dir:"asc"},{key:"dependents",dir:"desc"},{key:"released",dir:"desc"}]},{id:"created",label:"\uCD5C\uC2E0 \uC0DD\uC131",chain:[{key:"created",dir:"desc"},{key:"priority",dir:"asc"}]},{id:"updated",label:"\uCD5C\uC2E0 \uC218\uC815",chain:[{key:"updated",dir:"desc"}]}]),ia=Object.freeze({preset:"spec"}),n_=3,r_=Object.freeze([{key:"priority",label:"\uC6B0\uC120\uC21C\uC704"},{key:"dependents",label:"\uD6C4\uC18D \uC218"},{key:"released",label:"\uD574\uC81C \uC2DC\uAC01"},{key:"spec",label:"spec \uC720\uBB34"},{key:"created",label:"\uC0DD\uC131"},{key:"updated",label:"\uC218\uC815"}]);function Jf(e){return $s.some(t=>t.id===e)}function e_(e){let t=$s.find(n=>n.id===e);return t?t.chain.map(n=>({...n})):[]}function Jv(e,t){return e.length===t.length&&e.every((n,r)=>n.key===t[r].key&&n.dir===t[r].dir)}function xs(e){return e&&"preset"in e?e_(e.preset):e&&Array.isArray(e.chain)?e.chain.map(t=>({...t})):e_("spec")}function Yl(e){return e&&"preset"in e?e.preset:null}function Hr(e){if(typeof e=="string"){let i;try{i=JSON.parse(e)}catch{return Jf(e)?{preset:e}:ia}return Hr(i)}if(!e||typeof e!="object")return ia;let t=e;if(Jf(t.preset))return{preset:t.preset};let n=t.chain;if(!Array.isArray(n)||n.length===0||n.length>n_||!n.every(ka))return ia;let r=[];for(let i of n)r.some(s=>s.key===i.key)||r.push({key:i.key,dir:i.dir});let o=$s.find(i=>Jv(i.chain,r));return o?{preset:o.id}:{chain:r}}function o_(){try{return Hr(window.localStorage.getItem(t_))}catch{return ia}}function Vl(e){try{window.localStorage.setItem(t_,JSON.stringify(e))}catch{}}function s_(e,t,n){let r=e.map(a=>({...a}));if(!n)return r.slice(0,t);if(!Object.prototype.hasOwnProperty.call(Ms,n))return r;let o=n;if(r.slice(0,t).some(a=>a.key===o))return r.slice(0,t);let i={key:o,dir:r[t]&&r[t].key===o?r[t].dir:Ms[o]},s=r.slice(0,t),l=r.slice(t+1).filter(a=>a.key!==o);return[...s,i,...l].slice(0,n_)}function i_(e,t){return e.map((n,r)=>r===t?{key:n.key,dir:n.dir==="asc"?"desc":"asc"}:{...n})}function ek(e){let t=new Set(e.map(l=>l.id)),n=new Map,r=new Map;for(let l of e){let a=ws(l).filter(u=>t.has(u));n.set(l.id,a);for(let u of a){let d=r.get(u);d?d.push(l):r.set(u,[l])}}let o=new Set,i=[],s=l=>{o.add(l.id),i.push(l);for(let a of r.get(l.id)??[])!o.has(a.id)&&(n.get(a.id)??[]).every(u=>o.has(u))&&s(a)};for(;i.length<e.length;){let l=e.find(a=>!o.has(a.id)&&(n.get(a.id)??[]).every(u=>o.has(u)));s(l??e.find(a=>!o.has(a.id)))}return i}function a_(e,t){let n=Array.isArray(e)?e.slice():[];return n.sort(Pc(xs(t))),ek(n)}function l_(e,t){let n=new Map;if(!e||typeof e!="object")return n;let r=e,o=[],i=new Set;for(let s of t){if(i.has(s.id))continue;i.add(s.id);let l=r[s.id];if(!l||!Array.isArray(l.scope))continue;let a=l.scope.filter(u=>typeof u=="string"&&u.length>0);if(a.length===0){n.set(s.id,{overlaps:[],scope_missing:!0});continue}n.set(s.id,{overlaps:[],scope_missing:!1}),o.push({member:s,scope:a})}for(let s=0;s<o.length;s+=1)for(let l=s+1;l<o.length;l+=1){let a=li(o[s].scope,o[l].scope);if(a.length===0)continue;let u=o[s].member,d=o[l].member;n.get(u.id)?.overlaps.push({id:d.id,title:d.title,location_label:d.location_label,prefixes:a}),n.get(d.id)?.overlaps.push({id:u.id,title:u.title,location_label:u.location_label,prefixes:a})}return n}var c_=new Set(["sh","bash","zsh","dash","ksh"]),u_=/('(?:[^']*)'|"(?:\\.|[^"\\])*"|#.*|\$(?:\{[^}\n]*\}|[A-Za-z_][A-Za-z0-9_]*|[?#@*!$0-9-])|\b(?:if|then|else|elif|fi|for|while|until|do|done|case|esac|in|function|select|time)\b)/g;function d_(e){let t=e.split("/");return t[t.length-1]||""}function tk(e){let t=e.split(`
`,1)[0];if(!t.startsWith("#!"))return!1;let n=t.slice(2).trim().split(/\s+/).filter(Boolean);if(n.length===0)return!1;let r=d_(n[0]);if(r!=="env")return c_.has(r);let o=n.slice(1).find(i=>!i.startsWith("-")&&!i.includes("="));return o!==void 0&&c_.has(d_(o))}function nk(e){return e.startsWith("#")?"comment":e.startsWith("'")||e.startsWith('"')?"string":e.startsWith("$")?"variable":"keyword"}function rk(e){let t=[],n=0;u_.lastIndex=0;for(let r of e.matchAll(u_)){let o=r.index;o>n&&t.push({text:e.slice(n,o),kind:"plain"}),t.push({text:r[0],kind:nk(r[0])}),n=o+r[0].length}return n<e.length&&t.push({text:e.slice(n),kind:"plain"}),t.length===0&&t.push({text:e,kind:"plain"}),t}function ok(e){return{bad_request:"\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD\uC774 \uC62C\uBC14\uB974\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.",forbidden:"\uB4F1\uB85D\uB418\uC9C0 \uC54A\uC740 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uC758 \uC2A4\uD06C\uB9BD\uD2B8\uB294 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",lane_not_declared:"\uD604\uC7AC \uACE0\uC815 \uC120\uC5B8\uC5D0 \uD574\uB2F9 \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4.",stale_declaration:"\uC800\uC7A5\uC18C \uC791\uC5C5 \uC120\uC5B8\uC774 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uD654\uBA74\uC5D0\uC11C \uB2E4\uC2DC \uC5F4\uC5B4 \uC8FC\uC138\uC694.",too_large:"\uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uB108\uBB34 \uCEE4\uC11C \uD654\uBA74\uC5D0 \uD45C\uC2DC\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",unsupported_content:"\uD14D\uC2A4\uD2B8 \uD615\uC2DD\uC758 \uC2A4\uD06C\uB9BD\uD2B8\uB9CC \uD45C\uC2DC\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.",unreadable:"\uACE0\uC815\uB41C \uC2A4\uD06C\uB9BD\uD2B8 \uB0B4\uC6A9\uC744 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4."}[e]||"\uC2A4\uD06C\uB9BD\uD2B8\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4."}function p_(e){let t=e.getWorkspacePath,n=e.fetchImpl||globalThis.fetch?.bind(globalThis),r=document.createElement("div");r.className="repo-ops-script-viewer-root",document.body.appendChild(r);let o=null,i="loading",s="",l="",a=0,u=null,d=!1;function p(I,L){return L?rk(I).map(U=>U.kind==="plain"?U.text:c`<span
            class="repo-ops-script-viewer__token repo-ops-script-viewer__token--${U.kind}"
            >${U.text}</span
          >`):I}function _(){if(!o)return c``;let I=i==="ready"&&tk(s),L=i==="ready"?s.split(`
`):[];return c`<div
      class="repo-ops-script-viewer"
      role="dialog"
      aria-modal="true"
      aria-label=${`\uC2A4\uD06C\uB9BD\uD2B8 \uB0B4\uC6A9: ${o.path}`}
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
              title=${o.path}
              >${o.path}</span
            >
            <span class="repo-ops-script-viewer__ref"
              >${o.base_ref}@${o.base_sha.slice(0,7)}</span
            >
          </div>
          <div class="repo-ops-script-viewer__actions">
            <button
              type="button"
              class="repo-ops-script-viewer__copy"
              ?disabled=${i!=="ready"}
              @click=${()=>{y()}}
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
          ${i==="loading"?c`<div class="repo-ops-script-viewer__status">
                스크립트 불러오는 중…
              </div>`:i==="error"?c`<div
                  class="repo-ops-script-viewer__status repo-ops-script-viewer__status--error"
                >
                  ${l}
                </div>`:c`<div class="repo-ops-script-viewer__code" tabindex="0">
                  ${L.map((U,Y)=>c`<div class="repo-ops-script-viewer__row">
                        <span
                          class="repo-ops-script-viewer__line-number"
                          aria-hidden="true"
                          >${Y+1}</span
                        ><code class="repo-ops-script-viewer__code-line"
                          >${p(U,I)}</code
                        >
                      </div>`)}
                </div>`}
        </div>
      </section>
    </div>`}function m(){pt(_(),r)}async function y(){if(i!=="ready")return;let I=await gn(s);me(I?"\uC2A4\uD06C\uB9BD\uD2B8 \uBCF5\uC0AC\uB428":"\uC2A4\uD06C\uB9BD\uD2B8 \uBCF5\uC0AC \uC2E4\uD328",I?"success":"error")}function C(I){I.key==="Escape"&&o&&(I.preventDefault(),W())}function R(){d||(document.addEventListener("keydown",C),d=!0)}function V(){d&&(document.removeEventListener("keydown",C),d=!1)}async function te(I,L=null){let U=++a;R(),o={...I},u=L||(document.activeElement instanceof HTMLElement?document.activeElement:null),i="loading",s="",l="",m(),r.querySelector(".repo-ops-script-viewer__close")?.focus();let q=t?t():"";if(!q){i="error",l="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4.",m();return}if(!n){i="error",l="\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD \uAE30\uB2A5\uC744 \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",m();return}let N="/api/repo-ops-script?workspace="+encodeURIComponent(q)+"&lane="+encodeURIComponent(I.lane)+"&base_sha="+encodeURIComponent(I.base_sha);try{let z=await n(N),G=await z.json().catch(()=>({}));if(U!==a)return;if((t?t():"")!==q){W();return}if(!z.ok||!G||G.ok!==!0){i="error",l=ok(G&&typeof G.error=="string"?G.error:""),m();return}o={lane:G.lane,base_sha:G.base_sha,path:G.path,base_ref:G.base_ref},s=String(G.content),i="ready",m()}catch{if(U!==a)return;i="error",l="\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",m()}}function W(){a+=1,V(),o=null,s="",m();let I=u;u=null,I?.isConnected&&I.focus()}function M(){W(),r.remove()}return{open:te,close:W,destroy:M}}var f_={deploy_not_declared:"\uC120\uC5B8 \uC5C6\uC74C",deploy_opted_out:"\uC774 workspace\uC5D0\uC11C \uBC30\uD3EC \uC2E4\uD589\uC774 \uAEBC\uC838 \uC788\uC74C",deploy_in_flight:"\uBC30\uD3EC \uC9C4\uD589 \uC911",target_unresolved:"\uB300\uC0C1 tip\uC744 \uD655\uC815\uD558\uC9C0 \uBABB\uD568",remote_history_not_monotonic:"\uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC\uC640 \uC6D0\uACA9 \uC774\uB825\uC774 \uAC08\uB77C\uC9D0"},sk=new Set(["queued","running","retry_pending"]);function __(e){let t=e.queueStore,n=e.transport,r=e.onChanged||(()=>{}),o=e.onOpenScript;function i(){return t&&t.get()||{}}function s(){let N=i();return typeof N.revision=="number"?N.revision:0}function l(N){t&&N&&N.queue&&typeof N.queue=="object"&&t.set(N.queue)}function a(){let N=i().workspace_info;return N&&typeof N=="object"?N:{}}function u(N,z){return c`<span
      class="worker-repo-ops__vd-badge worker-repo-ops__vd-badge--${N}"
      >${z}</span
    >`}function d(N){if(typeof N!="number"||!Number.isFinite(N))return"";let z=N/6e4;return Number.isInteger(z)?`timeout ${z}\uBD84`:`timeout ${Math.round(N/1e3)}\uCD08`}function p(N){let z=d(N);return z?u("config",z):""}function _(N,z,G){return c`<button
      type="button"
      class="worker-repo-ops__vd-cmd worker-repo-ops__vd-cmd--link"
      .textContent=${G.script}
      @click=${oe=>{o&&o({lane:N,base_sha:z.base_sha,path:G.script,base_ref:z.base_ref},oe.currentTarget)}}
    ></button>`}function m(){let N=i().repo_operations;return Array.isArray(N)?N:[]}function y(){let N=a().repo_ops,z=N&&typeof N=="object"?N.repo_id:null;return typeof z=="string"&&z?z:null}function C(){return m().some(N=>N&&N.kind==="deploy"&&sk.has(N.state))}function R(){let N=C(),z=y()===null;return c`<button
      type="button"
      class="worker-repo-ops__deploy-run"
      data-seam="repo-ops-deploy-run"
      ?disabled=${N||z}
      title=${N?"\uBC30\uD3EC \uC9C4\uD589 \uC911":z?"\uC800\uC7A5\uC18C\uB97C \uD655\uC778\uD560 \uC218 \uC5C6\uC74C":"\uC6D0\uACA9 base tip\uC5D0\uC11C \uBC30\uD3EC \uC2A4\uD06C\uB9BD\uD2B8\uB97C 1\uD68C \uC2E4\uD589\uD569\uB2C8\uB2E4"}
      @click=${()=>{L()}}
    >
      배포 실행
    </button>`}function V(){let N=i().repo_ops_opt_out;return{verify:N?.verify===!0,deploy:N?.deploy===!0}}function te(N,z){return c`<label class="worker-repo-ops__lane-run">
      <input
        type="checkbox"
        .checked=${!z}
        @change=${G=>{I(N,!G.target.checked)}}
      />
      이 workspace에서 실행
    </label>`}function W(N){let z=typeof N.base_sha=="string"?N.base_sha:"",G=`${N.source_path||"repo-ops/config.toml"} @ ${N.base_ref||"?"}${z?`@${z.slice(0,7)}`:""}`,oe=V(),ye=!!N.verify&&oe.verify,Me=!!N.deploy&&oe.deploy;return c`<section class="worker-repo-ops__vd" data-seam="repo-ops">
      <p class="worker-repo-ops__vd-title">
        저장소 작업 선언
        <span class="worker-repo-ops__vd-src">${G}</span>
      </p>
      <div
        class="worker-repo-ops__lane${ye?" worker-repo-ops__lane--skipped":""}"
        data-lane="verify"
      >
        <span class="worker-repo-ops__lane-k">머지 전 검증</span>
        <span class="worker-repo-ops__lane-v"
          >${N.verify?c`${_("verify",N,N.verify)}
              ${p(N.verify.timeout_ms)}
              ${ye?u("skipped","\uC774 workspace\uC5D0\uC11C \uAC74\uB108\uB700"):""}`:c`선언 없음${u("absent","verify \uC5C6\uC774 \uD310\uC815")}`}</span
        >
        <span class="worker-repo-ops__lane-d"
          >${ye?"\uC774 workspace\uC5D0\uC11C\uB294 \uAC80\uC99D \uC5C6\uC774 \uD310\uC815\uD569\uB2C8\uB2E4.":N.verify?"\uBA38\uC9C0 \uC804\uC5D0 \uC774 \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uD1B5\uACFC\uD574\uC57C \uC790\uACA9\uC744 \uC5BB\uC2B5\uB2C8\uB2E4.":"\uBA38\uC9C0 \uC790\uACA9\uC740 PR/base/head \uC2E0\uC120\uB3C4\xB7mergeability\xB7\uB9AC\uBDF0 \uC601\uC218\uC99D\uC73C\uB85C\uB9CC \uD310\uC815\uD569\uB2C8\uB2E4."}</span
        >
        ${N.verify?te("verify",oe.verify):""}
      </div>
      <div
        class="worker-repo-ops__lane${Me?" worker-repo-ops__lane--skipped":""}"
        data-lane="deploy"
      >
        <span class="worker-repo-ops__lane-k">머지 후 배포</span>
        <span class="worker-repo-ops__lane-v"
          >${N.deploy?c`${_("deploy",N,N.deploy)}
              ${p(N.deploy.timeout_ms)}
              ${Me?u("skipped","\uC774 workspace\uC5D0\uC11C \uAC74\uB108\uB700"):R()}`:c`선언 없음${u("absent","\uBC30\uD3EC \uC5C6\uC74C")}`}</span
        >
        <span class="worker-repo-ops__lane-d"
          >${Me?"\uC774 workspace\uC5D0\uC11C\uB294 \uBC30\uD3EC \uC5C6\uC774 \uACE7\uBC14\uB85C \uC815\uB9AC\uB85C \uB118\uC5B4\uAC11\uB2C8\uB2E4.":N.deploy?c`Worker가 <code>.worktrees/.repo-ops-deploy</code>에서 대상
                  SHA로 정렬한 뒤 1회 실행합니다.`:"\uBA38\uC9C0 \uD6C4 \uBC30\uD3EC \uB2E8\uACC4 \uC5C6\uC774 \uACE7\uBC14\uB85C \uC815\uB9AC\uB85C \uB118\uC5B4\uAC11\uB2C8\uB2E4."}</span
        >
        ${N.deploy?te("deploy",oe.deploy):""}
      </div>
    </section>`}function M(N){let z=N.repo_ops&&typeof N.repo_ops=="object"?N.repo_ops:null;return z&&(z.status==="resolved"||z.status==="absent")?W(z):z&&(z.status==="pending"||z.status==="error")?c`<section class="worker-repo-ops__vd" data-seam="repo-ops">
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
          ${z.status==="pending"?"\uC120\uC5B8 \uD655\uC778 \uC911":c`선언 읽기
              실패${z.error_code?c` — <code>${z.error_code}</code>`:""}`}
        </div>
      </section>`:c`<section class="worker-repo-ops__vd" data-seam="repo-ops">
      <p class="worker-repo-ops__vd-title">저장소 작업 선언</p>
      <div class="worker-repo-ops__vd-line worker-repo-ops__vd-absent">
        선언 확인 중
      </div>
    </section>`}async function I(N,z){if(!n)return;let G=await n("worker-repo-ops-opt-out-toggle",{kind:N,opted_out:z,expected_revision:s()});if(l(G),G&&G.conflict){let oe=await n("worker-repo-ops-opt-out-toggle",{kind:N,opted_out:z,expected_revision:s()});l(oe)}r()}async function L(){let N=y();if(!n||N===null)return;let z=await n("worker-repo-operation-deploy-run",{repo_id:N});if(l(z),!z||z.ok!==!0){let G=z&&typeof z.reason=="string"?z.reason:"",oe=Object.hasOwn(f_,G)?f_[G]:G||"\uBC30\uD3EC \uC2E4\uD589\uC744 \uC2DC\uC791\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4";me(`\uBC30\uD3EC \uC2E4\uD589 \uAC70\uBD80 \u2014 ${oe}`,"error")}else me("\uBC30\uD3EC \uC2E4\uD589\uC744 \uC2DC\uC791\uD588\uC2B5\uB2C8\uB2E4","success");r()}let U={owned_deploy_worktree_fetch_detached_alignment_recreate:"\uC804\uC6A9 \uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC \uC815\uB82C\xB7\uBCF5\uAD6C",recovered_pre_execution_fetch_timeout_retry_once:"fetch \uD0C0\uC784\uC544\uC6C3 1\uD68C \uBCF5\uAD6C",repo_serial_lock_wait:"\uC800\uC7A5\uC18C \uC21C\uCC28 \uC2E4\uD589 \uB300\uAE30",restart_operation_adoption:"\uC7AC\uC2DC\uC791 \uD6C4 \uC791\uC5C5 \uC778\uACC4",exact_input_exit_zero_evidence_adoption:"\uB3D9\uC77C \uC785\uB825 \uC131\uACF5 \uC99D\uAC70 \uC778\uACC4",descendant_success_covers_ancestor_rows:"\uCD5C\uC2E0 SHA \uC131\uACF5\uC774 \uC774\uC804 \uD589 \uCEE4\uBC84",owned_verify_candidate_cleanup:"\uAC80\uC99D \uC784\uC2DC \uCCB4\uD06C\uC544\uC6C3 \uC815\uB9AC",bounded_single_script_retry_exceeded:"\uB2E8\uC77C \uC2A4\uD06C\uB9BD\uD2B8 \uC7AC\uC2DC\uB3C4 \uD55C\uB3C4 \uCD08\uACFC",repair_session_dispatch:"\uC2E4\uD328 \uD574\uACB0 \uC138\uC158 \uC790\uB3D9 \uC2E4\uD589",baseline_failure_ignore:"\uAE30\uC874 \uC2E4\uD328 \uBB34\uC2DC",config_or_script_deletion_to_bypass_gate:"\uC124\uC815\xB7\uC2A4\uD06C\uB9BD\uD2B8 \uC0AD\uC81C\uB85C \uAC8C\uC774\uD2B8 \uC6B0\uD68C",credential_entry:"\uC790\uACA9\uC99D\uBA85 \uC785\uB825\xB7\uCD9C\uB825",destructive_action:"\uD30C\uAD34\uC801 \uC791\uC5C5",history_rewrite:"\uD788\uC2A4\uD1A0\uB9AC \uC7AC\uC791\uC131",agent_self_report_as_success:"\uC138\uC158 \uC790\uAE30\uBCF4\uACE0\uB97C \uC131\uACF5 \uCC98\uB9AC"};function Y(N,z,G){return c`<div class="worker-repo-ops__policy-group" data-policy=${G}>
      <div class="worker-repo-ops__policy-label">${N}</div>
      <ul class="worker-repo-ops__policy-list">
        ${z.map(oe=>c`<li data-token=${oe}>
              ${U[oe]||oe}
            </li>`)}
      </ul>
    </div>`}function q(){let N=i(),z=N.repo_operation_policy&&typeof N.repo_operation_policy=="object"?N.repo_operation_policy:null;return z?c`<section
      class="worker-repo-ops__repair"
      data-seam="repo-ops-policy"
    >
      <details class="worker-repo-ops__policy" data-seam="policy-lists">
        <summary>
          Worker 자동 처리 기준
          <span class="worker-repo-ops__policy-count"
            >자동 ${(z.worker_automatic||[]).length} · 금지
            ${(z.never_automatic||[]).length}</span
          >
        </summary>
        ${z.supported===!1?c`<div
              class="worker-repo-ops__policy-group"
              data-policy="policy-schema"
            >
              ${`\uACC4\uC57D \uC2A4\uD0A4\uB9C8 \uBD88\uC77C\uCE58 \u2014 \uC790\uB3D9 \uC7AC\uC2DC\uB3C4\uAC00 \uC815\uC9C0\uB418\uC5C8\uC2B5\uB2C8\uB2E4 (v${z.schema_version})`}
            </div>`:""}
        ${Y("Worker\uAC00 \uC790\uB3D9 \uCC98\uB9AC",z.worker_automatic||[],"worker-automatic")}
        ${Y("\uC790\uB3D9\uC73C\uB85C \uD558\uC9C0 \uC54A\uC74C",z.never_automatic||[],"never-automatic")}
      </details>
    </section>`:""}return{template(){return c`<details class="worker-repo-ops-settings">
        <summary class="worker-repo-ops-settings__summary">
          저장소 작업 · 검증/배포 선언
        </summary>
        ${M(a())} ${q()}
      </details>`}}}var h_=20,ik=5,ak=new Set(["failed","running","queued","retry_pending"]),Ql={verify:"\uBA38\uC9C0 \uC804 \uAC80\uC99D",deploy:"\uBA38\uC9C0 \uD6C4 \uBC30\uD3EC",job:"\uBA38\uC9C0 \uD6C4 \uC7A1"},m_={verify:"verify",deploy:"deploy",job:"deploy"};function lk(e){if(typeof e!="string")return"";let t=e.split("/").filter(n=>n.length>0);return t.length>0?t[t.length-1]:""}function ck(e){return!e||typeof e!="object"?"":e.kind==="job"?lk(e.script_path)||Ql.job:Object.hasOwn(Ql,e.kind)?Ql[e.kind]:e.kind}function uk(e,t,n=h_){let r=[];for(let o of Array.isArray(e)?e:[])!o||typeof o!="object"||r.push({type:"operation",id:o.operation_id,at:typeof o.finished_at=="number"?o.finished_at:typeof o.requested_at=="number"?o.requested_at:null,operation:o});for(let o of Array.isArray(t)?t:[])!o||typeof o!="object"||r.push({type:"cleanup",id:o.bead_id,at:typeof o.at=="number"?o.at:null,cleanup:o});return r.sort((o,i)=>o.at===null&&i.at===null?String(o.id||"").localeCompare(String(i.id||"")):o.at===null?1:i.at===null?-1:i.at-o.at),r.slice(0,Math.max(0,n))}function dk(e){if(e.type==="cleanup")return!0;let t=e.operation;return ak.has(t.state)&&!t.dismissed&&!t.superseded_by}function pk(e,t,n={}){let r=uk(e,t,1/0),o=n.expanded===!0?h_:ik,i=new Set(r.slice(0,o)),s=r.filter(l=>i.has(l)||dk(l));return{visible:s,hidden:r.length-s.length}}function g_(e){if(e.type==="cleanup")return"warn";let t=e.operation.state;return t==="succeeded"?"ok":t==="failed"?"fail":"live"}function fk(e){if(e.type==="cleanup")return"\uBA48\uCDA4";switch(e.operation.state){case"succeeded":return"\uC131\uACF5";case"failed":return"\uC2E4\uD328";case"retry_pending":return"\uC7AC\uC2DC\uB3C4 \uC911";case"running":return"\uC2E4\uD589 \uC911";default:return"\uB300\uAE30"}}function b_(e){let t=e.filter(n=>n.value);return t.length===0?"":c`<details class="worker-ev__details">
    <summary>세부</summary>
    <dl class="worker-ev__kv">
      ${t.map(n=>{let r=n.copy===!0?qr(n.value):n.value;return c`<div>
          <dt>${n.term}</dt>
          <dd>${r}</dd>
        </div>`})}
    </dl>
  </details>`}function y_(e,t="",n=!1){return!e&&!t?"":c`<p
    class="worker-ev__explain${n?" worker-ev__explain--warn":""}"
  >
    <span class="worker-ev__cause">${e}</span>${t?c`<br />${t}`:""}
  </p>`}function _k(e,t){if(!e||typeof e!="object")return;let n=t&&typeof t=="object"?t.kind:"";if(!Object.hasOwn(m_,n))return;let r=e[m_[n]],o=r&&typeof r=="object"?r.timeout_ms:void 0;return typeof o=="number"&&Number.isFinite(o)?o:void 0}function mk(e,t){let n=uf(e,t),r=df(e);return!n&&!r?"":c`<p class="worker-ev__why">
    ${n?c`<span class="worker-ev__why-line">${n}</span>`:""}${r?c`<span class="worker-ev__why-line">${r}</span>`:""}
  </p>`}function gk(e){return e.state!=="failed"||e.superseded_by||e.dismissed?"":c`<div class="worker-ev__acts">
    <button
      type="button"
      class="worker-ev__btn worker-repo-op__dismiss"
      data-operation-id=${e.operation_id}
      title="사람이 확인한 실패로 접수합니다 — 기록은 그대로 남고 해결 필요 집계에서만 빠집니다"
    >
      기록 닫기
    </button>
  </div>`}function hk(e,t){let n=e.operation,r=n.state==="failed",o=n.failure?n.failure.code:"";return c`<li
    class="worker-ev"
    data-operation-id=${n.operation_id}
    data-state=${n.state}
  >
    <span
      class="worker-ev__t"
      title=${e.at?nn(e.at):""}
      >${fi(e.at)||"\u2014"}</span
    >
    <span class="worker-ev__node" aria-hidden="true"
      ><span class="worker-ev__dot worker-ev__dot--${g_(e)}"></span
    ></span>
    <div class="worker-ev__body">
      <div class="worker-ev__line1">
        <span class="worker-ev__what">${ck(n)}</span>
        <span class="worker-ev__meta"
          >${n.target_base}@${pi(n.target_sha)}${typeof n.elapsed_ms=="number"?` \xB7 ${jr(n.elapsed_ms)}`:""}</span
        >
        <span class="worker-ev__st worker-ev__st--${g_(e)}"
          >${fk(e)}</span
        >
        ${n.dismissed?c`<span class="worker-ev__st worker-ev__st--quiet">접수됨</span>`:""}
        ${n.superseded_by?c`<span class="worker-ev__st worker-ev__st--quiet">덮임</span>`:""}
        ${n.source==="manual"?c`<span
              class="worker-ev__st worker-ev__st--manual"
              title="사람이 배포 실행을 눌러 시작한 작업입니다"
              >수동</span
            >`:""}
      </div>
      ${r?y_(cf(n.failure_kind,o)):""}
      ${mk(n,_k(t,n))}
      ${gk(n)}
      ${b_([{term:"\uC2E4\uD328 \uCF54\uB4DC",value:r?o:""},{term:"script",value:[n.script_path||"",n.script_blob_sha?`blob ${pi(n.script_blob_sha)}`:"",Number.isInteger(n.exit_code)?`exit ${n.exit_code}`:""].filter(Boolean).join(" \xB7 ")},{term:"\uB85C\uADF8",value:n.log_path||"",copy:!0},{term:"\uCD9C\uB825",value:n.output_tail||""}])}
    </div>
  </li>`}function bk(e){let t=e.cleanup,n=Fr(t.step);return c`<li
    class="worker-ev"
    data-bead-id=${t.bead_id}
    data-state="cleanup_stalled"
  >
    <span
      class="worker-ev__t"
      title=${e.at?nn(e.at):""}
      >${fi(e.at)||"\u2014"}</span
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
        ${yd(t.step).map(r=>c`<li
              class="worker-step worker-step--${r.state}"
              data-step=${r.step}
            >
              <span class="worker-step__pip" aria-hidden="true"></span>
              <span class="worker-step__lb">${r.label}</span>
            </li>`)}
      </ol>
      ${y_(wr(t.reason),typeof t.retry_count=="number"&&t.retry_count>0?`${t.retry_count}\uD68C \uC790\uB3D9 \uC7AC\uC2DC\uB3C4 \uD6C4\uC5D0\uB3C4 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4 \u2014 \uC815\uB9AC\uB97C \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uBA74 \uBA48\uCD98 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4.`:"\uC815\uB9AC\uB97C \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uBA74 \uBA48\uCD98 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4.",!0)}
      <div class="worker-ev__acts">
        <button
          type="button"
          class="worker-ev__btn worker-ev__btn--warn worker-cleanup__resume"
          data-bead-id=${t.bead_id}
        >
          정리 재시도${n?` \u2014 ${n} \uB2E8\uACC4\uBD80\uD130`:""}
        </button>
        <button
          type="button"
          class="worker-ev__btn worker-cleanup__resolve"
          data-bead-id=${t.bead_id}
          title="이 실패를 사람이 이어받는 대화형 세션을 띄웁니다 — 기록된 세션이 있으면 fork하고, 없으면 새 세션에 사유를 싣습니다"
        >
          세션에서 해결
        </button>
      </div>
      ${b_([{term:"\uC2E4\uD328 \uCF54\uB4DC",value:t.reason||""},{term:"\uC9C4\uB2E8",value:t.detail||""},{term:"\uB85C\uADF8",value:t.log_path||"",copy:!0},{term:"\uCD9C\uB825",value:t.output_tail||""}])}
    </div>
  </li>`}function yk(e){let t=typeof e.hidden=="number"?e.hidden:0,n=e.expanded===!0;return c`<section class="worker-repo-drawer" data-seam="repo-ops-timeline">
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
          ${e.events.map(r=>r.type==="cleanup"?bk(r):hk(r,e.repo_ops))}
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
  </section>`}function v_(e,t={}){let n=null;function r(){if(n===null){pt(c``,e);return}let s=pk(n.operations,n.cleanup_failures,{expanded:n.expanded});pt(yk({events:s.visible,hidden:s.hidden,expanded:n.expanded,repo:n.repo,repo_ops:n.repo_ops}),e)}e.addEventListener("click",s=>{let l=s.target;if(l?.closest?.('[data-seam="repo-ops-close"]')){i();return}l?.closest?.('[data-seam="repo-ops-more"]')&&n&&(n.expanded=!n.expanded,r())});function o(s){n={operations:s.operations,cleanup_failures:s.cleanup_failures,repo:s.repo||"",repo_ops:s.repo_ops||null,expanded:!1},r()}function i(){n!==null&&(n=null,r(),t.onClose&&t.onClose())}return{open:o,close:i,isOpen:()=>n!==null,refresh(s){n&&(n={operations:s.operations,cleanup_failures:s.cleanup_failures,repo:s.repo||"",repo_ops:s.repo_ops||null,expanded:n.expanded},r())}}}var vk="session-preferred",kk=["external_roundtrip","user_feedback_loop"];function k_(e,t){if(!Ho(e).includes(vk)||typeof t!="object"||t===null)return"";let n=t.session_preferred_reason;return typeof n=="string"&&kk.includes(n)?n:""}var wk="spec-after-blocker";function w_(e,t){return Ho(e).includes(wk)&&Array.isArray(t)&&t.length>0}var $k=Ht("views:worker:adapter"),xk="tab:worker:ready",Ak="tab:worker:blocked",Sk="tab:worker:in-progress",Ek="tab:worker:resolved",Tk="tab:worker:closed",Ck="\u{1F512} blocked",Ok={revision:0,auto_advance:!1,auto_merge:!1,slots:Ci,queue:[],serial_lanes:[],serial_lane_count:0,pr_wait:[],done:[]},Rk=["claude_account","codex_account"],Ik=[...fo,...Rk];function Lk(e){let t=e&&e.parent;return(typeof t=="string"?t.length>0:!!(t&&t.id))||/\.\d+$/.test(e&&e.id||"")}function Dk(e){let t=e&&typeof e=="object"?e.awaiting_user:void 0,n=typeof t=="string"?t.trim():"";return n.length>0?`${Za}: ${n}`:Za}function $r(e){return e&&typeof e=="object"?e:{}}function Pk(e){let t={};for(let n of Ik){let r=e[n];typeof r=="string"&&r.length>0&&(t[n]=r)}return t}function Mk(e){let t=new Map;for(let r of e){if(!r||typeof r.id!="string"||r.id.length===0)continue;let o=$r(r.metadata).carried_from;if(!(typeof o!="string"||o.length===0))for(let i of ws(r)){let s=t.get(i);s||(s=new Set,t.set(i,s)),s.add(r.id)}}let n=new Map;for(let[r,o]of t)n.set(r,[...o].sort());return n}function qk(e){let t=e.replace(/\/+$/,""),n=t.lastIndexOf("/");return n>=0?t.slice(n+1):t}function $_(e={}){let{queueStore:t,issueStores:n,transport:r,getWorkspacePath:o,onInvalidate:i}=e,s=n?no(n):null,l=new Map,a={},u=null,d=0,p=null,_=!1;function m(){_||!i||i()}function y(L){return u===L?a:{}}async function C(){if(!r||_)return;let L=o?.()||"";if(u===L||p&&p.key===L&&p.generation===d)return;let U=++d;p={key:L,generation:U};let Y=null;try{Y=await Promise.resolve(r("get-session-defaults",{}))}catch(q){if(U!==d)return;p=null,$k("get-session-defaults failed: %o",q),m();return}U===d&&(a=Y&&typeof Y.values=="object"&&Y.values!==null?{...Y.values}:{},u=L,p=null,m())}function R(){u=null,d+=1,C()}function V(){for(let[L,U]of l)U==="failed"&&l.delete(L)}function te(L,U){return s?s.selectBoardColumn(L,U):[]}function W(L,U,Y,q){let N=new Set(Y.map(F=>F.id)),z=new Set,G=new Map,oe=[];for(let F of[...U,...Y]){if(z.has(F.id)||Lk(F))continue;let X=Ko(F,L);X.location===null&&(z.add(F.id),G.set(F.id,X),oe.push(F))}let ye=a_(oe,Hr(q)),Me=$r(L.bead_scope);return ye.map(F=>{let X=G.get(F.id),Ae=eo(F),Ee=Ae.evidence==="published",O=typeof F.workflow?.route=="string"&&F.workflow.route||(F.metadata&&typeof F.metadata.route=="string"?F.metadata.route:""),se=X.worker_ineligible,be=se||!Object.hasOwn(F,"labels")?"":k_(F.labels,F.metadata),ve=N.has(F.id),Pe=ve?ws(F):[],he=[];ve&&Pe.length===0&&he.push(Ck),X.awaiting_user&&he.push(Dk(F.metadata)),X.missing_description?he.push("missing_description"):X.spec==="conflict"?he.push("spec_id_conflict"):X.spec==="none"?he.push("spec \uC5C6\uC74C"):X.spec==="draft"&&he.push("spec \uBBF8\uBC1C\uD589(draft)");let Re=Me[F.id];return{bead_id:F.id,title:F.title||F.id,route:O,spec_id:Ae.conflict?"":Ae.path,published:Ee,blocked:ve,blocked_by:Pe,labels:Array.isArray(F.labels)?F.labels:[],created_at:F.created_at,updated_at:F.updated_at,status:F.status,workflow:F.workflow||null,exec_pins:Pk($r(F.metadata)),rec:null,...Re&&Array.isArray(Re.scope)?{scope:Re.scope}:{},eligible:X.placeable,route_ok:X.route_ok,awaiting_user:X.awaiting_user,missing_description:X.missing_description,placement_spec:X.spec,reason:he.join(" \xB7 "),worker_ineligible:se,session_preferred:be.length>0,session_preferred_reason:be,spec_after_blocker:w_(F.labels,Pe),release_info:F.release_info,dependents_info:F.dependents_info}})}function M(L){let[U,Y,q,N,z]=L,G=js([...U,...Y,...q,...N,...z]),oe=Mk([...U,...Y,...q,...N]),ye={},Me=(F,X)=>{if(!F||typeof F.id!="string"||F.id.length===0)return;let Ae=ye[F.id]||(ye[F.id]={});if(typeof F.priority=="number"&&!("priority"in Ae)&&(Ae.priority=F.priority),typeof F.from_id=="string"&&!("from_id"in Ae)&&(Ae.from_id=F.from_id),X&&!("metadata"in Ae)){Ae.metadata=$r(F.metadata);let Ee=$r(F.workflow).route;typeof Ee=="string"&&Ee.length>0&&(Ae.route=Ee)}};for(let F of[...U,...Y,...q])Me(F,!0);for(let F of[...N,...z])Me(F,!1);for(let F of new Set([...Object.keys(ye),...G.keys()])){let X=Fs(G,F);if(X.total>0){let Ae=ye[F]||(ye[F]={});Ae.rollup=X}}for(let[F,X]of oe){let Ae=ye[F]||(ye[F]={});Ae.carried_to=X}return ye}function I(L,U,Y,q){let N=new Set((Array.isArray(L.done)?L.done:[]).map(G=>G?.bead_id).filter(G=>typeof G=="string")),z=[];for(let G of U){let oe=ur(G.closed_at);if(typeof G.id!="string"||N.has(G.id)||oe===null||q!==void 0&&oe<q||typeof G.comment_count!="number"||G.comment_count<=0)continue;let ye=`${Y}\0${G.id}\0${String(G.updated_at)}\0${G.comment_count}`,Me=l.get(ye);if(Me===void 0&&r&&(l.set(ye,"pending"),Promise.resolve(r("get-comments",{id:G.id})).then(X=>{let Ae=Array.isArray(X)&&X.some(Ee=>Hi(typeof Ee?.text=="string"?Ee.text:"")?.lane==="session");l.set(ye,Ae?"session":"not-session"),m()}).catch(()=>{l.set(ye,"failed"),m()})),Me!=="session")continue;let F=ur(G.started_at);z.push({id:G.id,title:G.title||G.id,reason:"",draggable:!1,done:!0,lane:"done",selectable:!1,selected:!1,badges:["\uC138\uC158 \uC791\uC5C5"],alert:!1,usage:null,work_ms:F!==null&&oe>=F?oe-F:null,work_kind:"session",done_at:oe,created_at:G.created_at,updated_at:G.updated_at})}return z}return{read(L){if(!t)return{workspaces:[],workspaces_state:[]};let U=t.get()||Ok,Y=o?.()||"",q=L&&typeof L.done_since=="number"?L.done_since:void 0,N=te(xk,"ready"),z=te(Ak,"blocked"),G=te(Sk,"in_progress"),oe=te(Ek,"resolved"),ye=te(Tk,"closed");return{workspaces:[{...U,bead_titles:{...$r(U.bead_titles),...Object.fromEntries([...N,...z].filter(Me=>Me&&typeof Me.id=="string").map(Me=>[Me.id,Me.title||Me.id]))},root_dir:Y,name:qk(Y),runnable:W(U,N,z,L?L.candidate_sort:void 0),session_done:I(U,ye,Y,q),bead_overlay:M([N,z,G,oe,ye])}],workspaces_state:[{root_dir:Y,revision:U.revision,auto_advance:U.auto_advance,auto_merge:U.auto_merge,slots:typeof $r(U.workspace_info).slots=="number"?$r(U.workspace_info).slots:U.slots,runner_catalog:U.runner_catalog,execution_defaults:U.execution_defaults,session_defaults:y(Y),orchestration_model:U.orchestration_model,orchestration_effort:U.orchestration_effort,orchestration_speed:U.orchestration_speed,quick_fix_orchestration_model:U.quick_fix_orchestration_model,quick_fix_orchestration_effort:U.quick_fix_orchestration_effort,quick_fix_orchestration_speed:U.quick_fix_orchestration_speed,issue_prefix:""}]}},ensureSessionDefaults(){C()},refreshSessionDefaults:R,notifyIssuesChanged:V,destroy(){_=!0,d+=1,p=null,l.clear()}}}var aa=1,x_=5,Nk={root_dir:"",name:"",auto_advance:!1,auto_merge:!1,slots:aa,revision:0,runner_catalog:{},items:[],sublanes:{parallel:[],serial:[]},serial_lane_count:0,raw_queue_length:0,live_count:0,over_cap:!1,merge:{positions:new Map,resolutions:new Map,continuations:new Map,authorities:new Map,state:{active:null,failures:{},waiting:null},auto_excluded:[],running:!1},token_total:null,cleanup_failures:[],declared_base:null,repo_operations:[]};function Rt(e){return e&&typeof e=="object"?e:{}}var E_="beads-ui.worker.candidate-filter",Xl={show_blocked:!1,readiness:"all"};function jk(){try{let e=window.localStorage.getItem(E_);if(!e)return{...Xl};let t=JSON.parse(e);if(!t||typeof t!="object")return{...Xl};let n=t.readiness;return{show_blocked:t.show_blocked===!0,readiness:n==="ready"||n==="not_ready"?n:"all"}}catch{return{...Xl}}}function Fk(e){try{window.localStorage.setItem(E_,JSON.stringify(e))}catch{}}var T_="bdui.worker.done-range";function Bk(){try{let e=window.localStorage.getItem(T_);return e===null?"today":Hn(e)}catch{return"today"}}function Uk(e){try{window.localStorage.setItem(T_,e)}catch{}}function A_(e){let t=Array.isArray(e)&&e.length>0?e[0]:null;if(!t)return"";let n=typeof t.title=="string"?t.title:t.id||"";return n.length>22?`${n.slice(0,22)}\u2026`:n}function Wk(e){return e==="receipt_not_current"?"\uB9AC\uBDF0 \uD6C4\uC5D0\uB3C4 \uC601\uC218\uC99D\uC774 \uCD5C\uC885 head\uC5D0 \uC720\uD6A8\uD558\uC9C0 \uC54A\uC74C":e==="cancelled"?"\uB9AC\uBDF0 \uC138\uC158 \uCDE8\uC18C\uB428":e.startsWith("launch_failed:")?`\uB9AC\uBDF0 \uC138\uC158 \uC2DC\uC791 \uC2E4\uD328(${e.slice(14)})`:e.startsWith("session_failed:")?`\uB9AC\uBDF0 \uC138\uC158 \uBE44\uC815\uC0C1 \uC885\uB8CC(${e.slice(15)})`:`\uB9AC\uBDF0 \uC138\uC158 \uC2E4\uD328(${e})`}function S_(e){if(e.startsWith("receipt_unbacked:"))return`\uC2E4\uD589 \uC601\uC218\uC99D \uC790\uB3D9 \uAC80\uC99D \uBD88\uAC00(${e.slice(17)}) \u2014 [\uBA38\uC9C0] \uD074\uB9AD\uC73C\uB85C \uC218\uB3D9 \uC9C4\uD589 \uAC00\uB2A5`;switch(e){case"not_in_pr_wait":return"PR \uB300\uAE30 \uC0C1\uD0DC \uB3D9\uAE30\uD654 \uC2E4\uD328";case"resolution_round_cap":return"\uCDA9\uB3CC \uD574\uC18C 2\uD68C \uCD08\uACFC";case"resolution_rebase_cap":return"\uD050 \uC7AC\uCDA9\uB3CC 3\uD68C \uCD08\uACFC";case"resolution_timeout":return"\uCDA9\uB3CC \uD574\uC18C \uB300\uAE30 \uC2DC\uAC04 \uCD08\uACFC";case"resolution_refused":return"\uD574\uC18C \uC138\uC158 \uB514\uC2A4\uD328\uCE58 \uAC70\uBD80";case"worktree_missing":return"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uD574\uC18C \uD544\uC694";case"worktree_restore_branch_mismatch":return"\uC6CC\uD06C\uD2B8\uB9AC \uBCF5\uC6D0 \uC2E4\uD328 \u2014 \uBE0C\uB79C\uCE58 \uC774\uB984 \uBD88\uC77C\uCE58";case"worktree_restore_path_exists":return"\uC6CC\uD06C\uD2B8\uB9AC \uBCF5\uC6D0 \uC2E4\uD328 \u2014 \uACBD\uB85C \uC774\uBBF8 \uC788\uC74C";case"worktree_restore_branch_missing":return"\uC6CC\uD06C\uD2B8\uB9AC \uBCF5\uC6D0 \uC2E4\uD328 \u2014 origin\uC5D0 \uBE0C\uB79C\uCE58 \uC5C6\uC74C";case"worktree_restore_branch_diverged":return"\uC6CC\uD06C\uD2B8\uB9AC \uBCF5\uC6D0 \uC2E4\uD328 \u2014 \uB85C\uCEEC \uBE0C\uB79C\uCE58\uAC00 origin\uACFC \uB2E4\uB984";case"worktree_restore_failed":return"\uC6CC\uD06C\uD2B8\uB9AC \uBCF5\uC6D0 \uC2E4\uD328";case"merge_unconfirmed_timeout":return"\uBA38\uC9C0 \uD655\uC778 \uC2DC\uAC04 \uCD08\uACFC";case"pr_closed_unmerged":return"PR \uB2EB\uD798";case"merge_error":return"\uBA38\uC9C0 \uC624\uB958";case"spec_id_missing":return"\uC2A4\uD399 ID \uAE30\uB85D \uC5C6\uC74C";default:return e}}function zk(e){if(e==="lane_occupied")return"\uC2E4\uD589 \uB808\uC778\uC5D0 \uB0A8\uC544 \uC788\uC5B4 \uBA38\uC9C0 \uB300\uC0C1\uC774 \uC544\uB2D9\uB2C8\uB2E4";let t="\uBA38\uC9C0 \uD050\uC5D0 \uB123\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 (\uC774\uBBF8 \uB300\uAE30 \uC911\uC774\uAC70\uB098 \uB300\uC0C1 \uC544\uB2D8)";return typeof e=="string"&&e.length>0?`${t}: ${e}`:t}function Hk(e){switch(e){case"no_terminal_failure":return"\uC774 \uD589\uC5D0 \uC774\uC5B4\uBC1B\uC744 terminal \uC2E4\uD328 \uAE30\uB85D\uC774 \uC5C6\uC2B5\uB2C8\uB2E4";case"tmux_unavailable":return"tmux\uC5D0 \uB2FF\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 \u2014 \uC138\uC158\uC744 \uB744\uC6B0\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4";case"launch_failed:claude_not_found":return"claude \uC2E4\uD589 \uD30C\uC77C\uC744 PATH\uC5D0\uC11C \uCC3E\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4";case"launch_failed:new_session":return"tmux \uC138\uC158\uC744 \uB9CC\uB4E4\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4";case"launch_failed:new_window":return"tmux \uCC3D\uC744 \uB9CC\uB4E4\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4";case"launch_failed:exited":return"\uB744\uC6B4 \uC138\uC158\uC774 \uACE7\uBC14\uB85C \uC885\uB8CC\uB410\uC2B5\uB2C8\uB2E4";case"error":return"\uC138\uC158 \uAE30\uB3D9 \uC911 \uC624\uB958\uAC00 \uB0AC\uC2B5\uB2C8\uB2E4";default:return typeof e=="string"&&e.length>0?e:"\uC138\uC158\uC744 \uB744\uC6B0\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"}}function Kk(e){switch(e){case"no_session_ref":return"\uAE30\uB85D\uB41C \uC138\uC158 \uC5C6\uC74C";case"unsafe_session_id":return"\uC138\uC158 ID\uB97C \uC778\uC790\uB85C \uC4F8 \uC218 \uC5C6\uC74C";case"provider_mismatch":return"\uAE30\uB85D\uB41C \uC138\uC158\uC774 claude\uAC00 \uC544\uB2D8";case"not_local":return"\uAE30\uB85D\uB41C \uC138\uC158\uC758 transcript\uAC00 \uC774 \uAE30\uAE30\uC5D0 \uC5C6\uC74C";case"bd_unavailable":return"Bead \uBA54\uD0C0\uB370\uC774\uD130\uB97C \uC77D\uC9C0 \uBABB\uD568";default:return typeof e=="string"&&e.length>0?e:"\uC0AC\uC720 \uBBF8\uC0C1"}}function Gk(e){if(!e||typeof e!="object")return"\uC138\uC158 \uAE30\uB3D9 \uC751\uB2F5\uC744 \uBC1B\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4";if(e.conflict===!0)return"\uD050\uAC00 \uBC14\uB00C\uC5B4 \uD074\uB9AD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uB20C\uB7EC\uC8FC\uC138\uC694";if(e.session==="already_running")return"\uC774\uBBF8 \uC774 \uC774\uC288\uC758 \uD574\uACB0 \uC138\uC158\uC774 \uC5F4\uB824 \uC788\uC2B5\uB2C8\uB2E4";if(e.launched!==!0)return`\uC138\uC158\uC5D0\uC11C \uD574\uACB0 \uAC70\uBD80: ${Hk(e.reason)}`;let t=e.bridge_active===!0?"":" (Discord \uC911\uACC4 \uBE44\uD65C\uC131 \u2014 tmux\uC5D0\uC11C \uB2F5\uD558\uC138\uC694)";return e.mode==="fork"?`\uAE30\uB85D\uB41C \uC138\uC158\uC744 fork\uD574 \uB744\uC6E0\uC2B5\uB2C8\uB2E4${t}`:`\uC0C8 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4 \u2014 ${Kk(e.fallback_reason)}${t}`}function Yk(e){return e&&e.launched===!0?"success":"error"}function Vk(e){if(e==="worker_sessions_busy")return"\uD574\uC18C \uB300\uAE30 \u2014 \uC2E4\uD589 \uC2AC\uB86F \uB300\uAE30 \uC911";if(typeof e!="string"||!e.startsWith("completion_waiting:"))return null;let t=e.slice(19);if(t.length===0)return null;switch(t){case"gating":return"\uBA38\uC9C0 \uC870\uAC74 \uD655\uC778 \uC911";case"merging":return"\uBA38\uC9C0 \uC911";case"cleaning":return"\uB9C8\uBB34\uB9AC \uC911";case"paused":return"\uC790\uB3D9 \uC9C4\uD589 \uC77C\uC2DC\uC815\uC9C0";case"needs_human":return"\uD655\uC778 \uD544\uC694";default:return null}}function Qk(e){if(!e||typeof e!="object")return null;switch(e.state){case"waiting":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC911",live:!0};case"yielded":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uACC4\uC18D \uC911 \xB7 \uC644\uB8CC \uD6C4 \uC6B0\uC120 \uBA38\uC9C0",live:!0};case"ready":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC644\uB8CC \xB7 \uC7AC\uAC80\uC99D \uB300\uAE30",live:!1};default:return null}}var Xk=new Set(["paused","needs_human","waiting_metadata","reviewing","retrying"]),Zk=new Set(["waiting_metadata","reviewing","retrying"]),Zl=new Set(["review_receipt_missing","review_receipt_stale","review_receipt_invalid","review_receipt_undetermined"]);function Jk(e){let t=e&&typeof e=="object"?e.auto_resolution:null,n=t&&typeof t=="object"&&!Array.isArray(t)?t:null;if(!n||!e)return null;let r=typeof n.origin_reason=="string"&&n.origin_reason.length>0?`\uC6D0 \uC0AC\uC720: ${n.origin_reason}`:"";switch(e.phase){case"waiting_metadata":return{label:"\uC815\uC815 \uB300\uAE30",details:[r,"\uBA54\uD0C0\uB370\uC774\uD130 \uC815\uC815\uC774 \uAD00\uCE21\uB418\uBA74 \uC790\uB3D9 \uC7AC\uAC1C"].filter(Boolean),live:!1};case"retrying":{let o=Number.isInteger(n.attempts)?Math.max(0,Number(n.attempts)):0,i=Number.isInteger(n.attempt_cap)&&Number(n.attempt_cap)>0?Number(n.attempt_cap):0,s=typeof n.next_at=="number"?nn(n.next_at):"",l=typeof n.last_error=="string"&&n.last_error.length>0?n.last_error:"";return{label:i>0?`\uC7AC\uC2DC\uB3C4 ${Math.min(o,i)}/${i}`:`\uC7AC\uC2DC\uB3C4 ${o}`,details:[r,s?`\uB2E4\uC74C \uC2DC\uAC01 ${s}`:"",l?`\uB9C8\uC9C0\uB9C9 \uC624\uB958: ${l}`:""].filter(Boolean),live:!0}}default:return null}}function ew(e){if(typeof e!="string")return"";for(let t of["retry_exhausted:","auto_review_exhausted:"])if(e.startsWith(t))return e.slice(t.length);return""}function tw(e,t=null){if(!e||typeof e!="object")return null;let n="";switch(e.phase){case"gating":n="\uBA38\uC9C0 \uC870\uAC74 \uD655\uC778 \uC911";break;case"merging":n="\uBA38\uC9C0 \uC911";break;case"cleaning":n="\uB9C8\uBB34\uB9AC \uC911";break;case"waiting_metadata":case"reviewing":case"retrying":if(!t)return null;n=t.label;break;case"paused":n="\uC790\uB3D9 \uC9C4\uD589 \uC77C\uC2DC\uC815\uC9C0";break;case"needs_human":n="\uD655\uC778 \uD544\uC694";break;case"completed":return null;default:return null}let r=[n];e.head_sha&&r.push(`head ${e.head_sha}`),e.base_sha&&r.push(`base ${e.base_sha}`),(e.failure_stage||e.failure_reason)&&r.push(`${e.failure_stage||"failure"} \xB7 ${e.failure_reason||"\uC6D0\uC778 \uBBF8\uC0C1"}`);let o=ew(e.terminal_reason);o&&r.push(`\uC6D0 \uC0AC\uC720: ${o}`);let i=e.phase==="needs_human"&&!o?zr(e.terminal_reason):null;i&&r.push(e.failure_stage?`${e.failure_stage} \xB7 ${i}`:i);for(let s of t?t.details:[])r.push(s);return e.active_attempt_id&&r.push(`attempt ${e.active_attempt_id}`),e.evidence&&r.push(e.evidence),e.log_path&&r.push(e.log_path),{badge:n,title:r.join(`
`),alert:e.phase==="needs_human",lock_actions:!Xk.has(e.phase)}}function nw(e){if(!e||typeof e!="object")return[];let t=e.blocking_codes;return Array.isArray(t)?t.filter(n=>typeof n=="string"&&n.length>0):[]}function rw(e){if(!e||typeof e!="object")return[];let t=e.badge_codes;return Array.isArray(t)?t.filter(n=>typeof n=="string"&&n.length>0):[]}function ow(e){let t=e.queue_failure?`\uBA38\uC9C0 \uC2E4\uD328 \uC6D0\uBB38: ${e.queue_failure}`:e.auto_skip?`\uC790\uB3D9 \uC81C\uC678 \uC6D0\uBB38: ${e.auto_skip}`:"",n=(i,s={})=>{let l=[s.title||"",t].filter(Boolean);return{label:i,title:l.join(`
`),live:s.live===!0,alert:s.alert===!0}};if(e.continuation_required)return n("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694",{alert:!0});if(e.queueing)return e.queueing==="cleanup"?n("\uC815\uB9AC \uC7AC\uC2DC\uB3C4 \uC694\uCCAD \uC911",{title:"\uC11C\uBC84 \uC751\uB2F5\uC744 \uAE30\uB2E4\uB9AC\uB294 \uC911\uC785\uB2C8\uB2E4",live:!0}):n("\uD050 \uB4F1\uB85D \uC911",{title:"\uBA38\uC9C0 \uD050\uC5D0 \uB123\uB294 \uC911 \u2014 \uC11C\uBC84 \uC751\uB2F5\uC744 \uAE30\uB2E4\uB9BD\uB2C8\uB2E4",live:!0});if(e.merge_step)return e.gate?.tier==="merged"?n("\uBA38\uC9C0\uB428",{title:e.merge_step.label,alert:e.merge_step.failed===!0}):n("\uBA38\uC9C0 \uC911",{title:e.merge_step.label,live:!0});if(e.conflict_badge)return n(e.conflict_badge,{live:e.conflict_live===!0});if(e.auto_resolution)return n(e.auto_resolution.label,{title:e.auto_resolution.details.join(`
`),live:e.auto_resolution.live===!0});if(e.recovery?.lock_actions)return n(e.recovery.badge,{title:e.recovery.title,live:!0});if(e.cleanup_failed)return n(e.cleanup_label?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${e.cleanup_label}`:"\uC815\uB9AC \uBA48\uCDA4",{title:e.cleanup_failed.reason||"",alert:!0});if(e.base_exception)return n("\uB2E4\uB978 base \uB300\uC0C1",{title:e.base_exception,alert:!0});let r=nw(e.receipt_check),o=e.conflicting||e.gate?.reason==="base_behind"||r.length>0;if(e.auto_pending&&o)return n("\uD655\uC778 \uC911",{title:"\uBA38\uC9C0 \uD050\uAC00 \uC790\uB3D9\uC73C\uB85C \uCC98\uB9AC \uC911 \u2014 \uB2E4\uC74C \uAD00\uCE21\uC744 \uAE30\uB2E4\uB9BD\uB2C8\uB2E4",live:!0});if(e.conflicting)return n("\uCDA9\uB3CC \uD574\uACB0 \uD544\uC694",{alert:!0});if(e.gate?.reason==="base_behind")return n("base \uAC31\uC2E0 \uD544\uC694",{alert:!0});if(Zl.has(e.gate?.reason)){let i=e.gate.reason==="review_receipt_stale"?"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC774 \uD604\uC7AC head\uC758 \uC870\uC0C1\uC774 \uC544\uB2D9\uB2C8\uB2E4 \u2014 \uD788\uC2A4\uD1A0\uB9AC \uC7AC\uC791\uC131\xB7\uBE0C\uB79C\uCE58 \uB9AC\uC14B \uBCF5\uAD6C \uACBD\uB85C\uC785\uB2C8\uB2E4. [\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0]\uAC00 \uC774 \uBCF4\uB958\uC758 \uCD9C\uAD6C\uC785\uB2C8\uB2E4":e.gate.reason==="review_receipt_invalid"?"\uB9AC\uBDF0 \uC601\uC218\uC99D \uAE30\uB85D\uC774 \uC131\uB9BD\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4 \u2014 [\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0]\uAC00 \uC774 \uBCF4\uB958\uC758 \uCD9C\uAD6C\uC785\uB2C8\uB2E4":e.gate.reason==="review_receipt_undetermined"?"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC758 ancestry probe\uB97C \uC644\uB8CC\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 \u2014 [\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0]\uAC00 \uC774 \uBCF4\uB958\uC758 \uCD9C\uAD6C\uC785\uB2C8\uB2E4":"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 [\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0]\uAC00 \uC774 \uBCF4\uB958\uC758 \uCD9C\uAD6C\uC785\uB2C8\uB2E4";if(e.review_session?.active===!0)return n(e.review_session.origin==="auto"?"\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694 \xB7 \uC790\uB3D9 \uB9AC\uBDF0 \uC138\uC158 \uC2E4\uD589 \uC911":"\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694 \xB7 \uB9AC\uBDF0 \uC138\uC158 \uC2E4\uD589 \uC911",{title:`${i}
\uB9AC\uBDF0 \uC138\uC158\uC774 \uC2E4\uD589 \uC911\uC785\uB2C8\uB2E4 \u2014 \uB05D\uB098\uBA74 \uC601\uC218\uC99D\uC744 \uB2E4\uC2DC \uD310\uC815\uD569\uB2C8\uB2E4`,live:!0});if(e.auto_review_wait==="slot")return n("\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694 \xB7 \uB9AC\uBDF0 \uC138\uC158 \uC2AC\uB86F \uB300\uAE30",{title:`${i}
\uC2E4\uD589 \uC2AC\uB86F\uC774 \uBE44\uBA74 \uC790\uB3D9\uC73C\uB85C \uB9AC\uBDF0 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4. \uC9C0\uAE08 \uD074\uB9AD\uD558\uBA74 \uC989\uC2DC \uB744\uC6C1\uB2C8\uB2E4`,live:!0});if(e.review_session?.failure){let s=e.review_dispatch?.state==="exhausted"&&e.review_session.origin==="auto";return n(`\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694 \xB7 ${s?"\uC790\uB3D9 \uB9AC\uBDF0 1\uD68C \uC18C\uC9C4 \xB7 ":""}${Wk(e.review_session.failure)}`,{title:`${i}
\uC9C1\uC804 \uB9AC\uBDF0 \uC138\uC158 \uC885\uB8CC \uC0AC\uC720: ${e.review_session.failure}`,alert:!0})}return n("\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694",{title:i,alert:!0})}return e.gate?.reason==="spec_id_missing"?n("\uC2A4\uD399 ID \uB204\uB77D",{title:"native spec_id \uBBF8\uAE30\uB85D \u2014 bd update --spec-id \uD544\uC694",alert:!0}):r.length>0?n(`\uC601\uC218\uC99D \uD655\uC778 \uD544\uC694 \xB7 ${r[0]}`,{title:`\uC131\uB9BD\uD558\uC9C0 \uC54A\uB294 \uC2E4\uD589 \uC601\uC218\uC99D \u2014 ${r.join(", ")}`,alert:!0}):e.recovery?n(e.recovery.badge,{title:e.recovery.title,alert:!0}):e.gate?.tier==="verify"&&e.gate.gate_badge==="\uAC80\uC99D \uC2E4\uD328"?n("\uAC80\uC99D \uC2E4\uD328",{title:e.gate.reason||"",alert:!0}):e.queue_failure?n(`\uBA38\uC9C0 \uC2E4\uD328 \u2014 ${S_(e.queue_failure)}`,{title:e.queue_failure,alert:!0}):e.auto_skip?n(`\uC790\uB3D9 \uC81C\uC678 \u2014 ${S_(e.auto_skip)}`,{title:e.auto_skip,alert:!0}):e.queued&&!e.queue_active?n(`\uBA38\uC9C0 \uB300\uAE30 #${e.queue_position}`):e.gate?.enabled===!0?n("\uBA38\uC9C0 \uAC00\uB2A5"):e.gate?.tier==="merged"?n("\uBA38\uC9C0\uB428"):e.gate?.tier==="closed_unmerged"?n("\uB2EB\uD798",{alert:!0}):e.activity?n("\uD655\uC778 \uC911",{live:!0}):e.gate?.tier==="undecidable"||e.gate?.reason==="mergeability_unknown"?n("\uC0C1\uD0DC \uD655\uC778 \uC2E4\uD328",{title:e.gate.reason||"",alert:!0}):e.gate?.tier==="unobserved"||e.gate?.tier==="verify"||e.gate?.gate_badge==="\uAD00\uCE21 \uB300\uAE30"?n("\uD655\uC778 \uC911"):e.gate?.gate_badge?n(e.gate.gate_badge,{title:e.gate.reason||"",alert:e.gate.enabled!==!0}):null}function sw(e,t,n,r,o=null,i=null,s=null,l=!1,a=null,u=!0,d=null,p=null,_=null,m={},y=!1,C={},R=null,V={active:!1,failure:null,origin:null},te=!1){let W=!!a&&a.position>0,M=!!a?.continuation_action&&a.continuation_action.continuation===null,I=!!a&&a.active===!0,L=a&&a.failure||null,U=Vk(a?a.waiting:null),Y=n[e]||null,q=Y&&Y.gate?Y.gate:null,N=Y&&Y.pr?Y.pr:null,z=Qk(a?a.resolution:null),G=Jk(_),oe=tw(_,G),ye=a&&a.authority||null,Me=a&&a.review_dispatch||null,F=a?.hold?.auto_review_wait==="slot"?"slot":null,X=!!_&&typeof _=="object"&&Zk.has(_.phase),Ae=W&&!I&&(!ye||X||ye.source==="automatic"&&!y),Ee=s==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":z?z.badge:s==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC911":U,O=!!q&&q.base_badge==="\uCDA9\uB3CC",se=!!q&&q.enabled===!0,be=Jo({bead_id:e,merge_sha:C.merge_sha,cleanup_cursor:C.cleanup_cursor,merge_progress:i&&i.merge_progress?i.merge_progress:null,cleanup_failed:r,repo_operations:C.repo_operations}),ve=Ei(be),Pe=i&&!be&&(i.queueing??null)?i.queueing:null,he=!!r&&["repo_operations","post_merge_jobs","child_sweep","branch_cleanup","parent_close"].includes(r.step)&&!!q&&q.tier==="merged",Re=r&&r.step==="repo_operations"&&be?.failed===!0&&(be.step==="deploy"||be.step==="verify")?be.step:null,Xe=l&&!!r&&!!q&&q.tier==="merged",dt=Ae&&(se||O||q?.reason==="base_behind"||Zl.has(q?.reason)||he||Xe),H=Zl.has(q?.reason),J=l&&O&&u===!1,re=or(m,e,{external:l,merge_active:I||be?.step==="merge",merge_queued:W,conflict_active:!!s,cleanup_active:ve,merged:!!r||q?.tier==="merged"}),fe=!!re.operation,Se=!!r||_?.phase==="needs_human"||!!re.error,_e=W&&!L&&!M&&!he&&!(oe&&oe.lock_actions),qe=ow({auto_pending:_e,continuation_required:M,queueing:Pe,merge_step:be,conflict_badge:Ee,conflict_live:z?.live===!0||s==="running",auto_resolution:G,recovery:oe,cleanup_failed:r,cleanup_label:r?Fr(r.step):null,base_exception:p,conflicting:O,gate:q,receipt_check:Y&&Y.receipt_check?Y.receipt_check:null,queue_failure:L,auto_skip:d,queued:W,queue_active:I,queue_position:a?a.position:0,review_session:V,review_dispatch:Me,auto_review_wait:F,activity:Ee?null:i&&i.activity||null}),Fe=qe?.live===!0&&qe.title?c`<span title=${qe.title}>${qe.label}</span>`:qe?.label||null,Ve=rw(Y&&Y.receipt_check?Y.receipt_check:null);return{id:e,title:l?c`${t}<span class="muted"> · 세션</span>`:t,reason:r&&be?.active!==!0?Si(r.step):"PR \uB300\uAE30",draggable:!1,done:!0,lane:"pr_wait",...R?{dependency_chips:R}:{},external:l,pr_number:N&&typeof N.number=="number"?N.number:null,pr_url:N&&typeof N.url=="string"?N.url:"",completion_badge:qe?.live!==!0&&qe?.title?qe.label:null,completion_title:qe?.title||"",..._?.phase==="needs_human"&&typeof _.log_path=="string"&&_.log_path.length>0?{log_path:_.log_path}:{},...Ve.length>0?{receipt_badge:{codes:Ve}}:{},badges:Fe?[Fe]:[],live_badge:qe?.live===!0?Fe:null,usage:o,alert:qe?.alert===!0,merge_action:q?.tier==="merged"&&!he&&!Xe?!1:!W||M||Ae||H,cancel_action:W&&!M,cancel_enabled:!I&&!(oe&&oe.lock_actions),cancel_title:oe&&oe.lock_actions?`${oe.badge} \u2014 \uC911\uB2E8\uD558\uB824\uBA74 \uC0C1\uB2E8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8\uC744 \uC0AC\uC6A9\uD558\uC138\uC694`:I?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"\uBA38\uC9C0 \uD050\uC5D0\uC11C \uC774 \uD56D\uBAA9\uC744 \uBE8D\uB2C8\uB2E4 (\uB2E4\uC2DC [\uBA38\uC9C0]\uB85C \uB123\uC744 \uC218 \uC788\uC2B5\uB2C8\uB2E4)",discard:re,discard_action:re.action,resolve_action:Se,resolve_enabled:!te,resolve_title:te?"\uC138\uC158 \uAE30\uB3D9 \uC694\uCCAD \uC911 \u2014 \uC11C\uBC84 \uC751\uB2F5\uC744 \uAE30\uB2E4\uB9BD\uB2C8\uB2E4":"\uC774 \uC2E4\uD328\uB97C \uC0AC\uB78C\uC774 \uC774\uC5B4\uBC1B\uB294 \uB300\uD654\uD615 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4 \u2014 \uAE30\uB85D\uB41C \uC138\uC158\uC774 \uC788\uC73C\uBA74 fork\uD558\uACE0, \uC5C6\uC73C\uBA74 \uC0C8 \uC138\uC158\uC5D0 \uC0AC\uC720\uB97C \uC2E3\uC2B5\uB2C8\uB2E4",merge_step:be,discard_enabled:re.enabled,discard_title:re.title,merge_enabled:!be&&!Pe&&!s&&!fe&&!p&&!(oe&&oe.lock_actions)&&!J&&V.active!==!0&&(se||O||q?.reason==="base_behind"||H||he||Xe||dt||X&&!I),merge_label:M?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":he||Xe?Re==="deploy"?"\uBC30\uD3EC \uC7AC\uC2DC\uB3C4 \uD6C4 \uC815\uB9AC":Re==="verify"?"\uAC80\uC99D \uC7AC\uC2DC\uB3C4 \uD6C4 \uC815\uB9AC":"\uC815\uB9AC \uC7AC\uC2DC\uB3C4":O&&!be&&!he?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":q?.reason==="base_behind"?"base \uAC31\uC2E0 \uD6C4 \uBA38\uC9C0":H?"\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0":Ae?"\uB2E4\uC2DC \uBA38\uC9C0":void 0,merge_title:fe?re.error?`\uD3D0\uAE30 \uC2E4\uD328: ${re.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${re.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:M?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":Pe?"\uC694\uCCAD\uC744 \uBCF4\uB0B4\uB294 \uC911 \u2014 \uC11C\uBC84 \uC751\uB2F5\uC744 \uAE30\uB2E4\uB9BD\uB2C8\uB2E4":be?`\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 ${be.label}`:Re?`\uBA38\uC9C0 \uC644\uB8CC \u2014 ${Re==="deploy"?"\uBC30\uD3EC":"\uAC80\uC99D"} \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD574 \uC815\uB9AC\uAC00 \uBA48\uCDC4\uC2B5\uB2C8\uB2E4. \uD074\uB9AD\uD558\uBA74 \uC800\uC7A5\uC18C \uC791\uC5C5\uBD80\uD130 \uC815\uB9AC\uB97C \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4`:Xe?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uB2E4\uC2DC \uC2DC\uB3C4\uD569\uB2C8\uB2E4":J?"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uC9C1\uC811 \uD574\uC18C\uD558\uC138\uC694":s==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC2E4\uD589 \uC911 \u2014 \uC644\uB8CC \uD6C4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":s==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC77C\uC2DC\uC815\uC9C0 \u2014 \uC7AC\uAC1C \uD6C4 \uC644\uB8CC\uB418\uBA74 \uBA38\uC9C0\uD558\uC138\uC694":he?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC2DC\uB3C4\uD569\uB2C8\uB2E4":O?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":q?.reason==="base_behind"?"base\uB97C \uC790\uB3D9 \uAC31\uC2E0\uD55C \uB4A4 \uBA38\uC9C0\uD569\uB2C8\uB2E4":V.active===!0?V.origin==="auto"?"\uC790\uB3D9 \uB9AC\uBDF0 \uC138\uC158 \uC2E4\uD589 \uC911 \u2014 \uB05D\uB098\uBA74 \uC601\uC218\uC99D\uC744 \uB2E4\uC2DC \uD310\uC815\uD569\uB2C8\uB2E4":"\uB9AC\uBDF0 \uC138\uC158 \uC2E4\uD589 \uC911 \u2014 \uB05D\uB098\uBA74 \uC601\uC218\uC99D\uC744 \uB2E4\uC2DC \uD310\uC815\uD569\uB2C8\uB2E4":q?.reason==="review_receipt_missing"?"\uB9AC\uBDF0 \uC601\uC218\uC99D \uC5C6\uC74C \u2014 \uBA38\uC9C0 \uAC8C\uC774\uD2B8 \uBCF4\uB958\uC785\uB2C8\uB2E4. \uD074\uB9AD\uD558\uBA74 \uAE30\uB85D\uB41C \uC138\uC158\uC744 \uC774\uC5B4 \uB9AC\uBDF0\uB9CC \uC218\uD589\uC2DC\uD0A4\uACE0, \uC601\uC218\uC99D\uC774 \uCD5C\uC885 head\uC5D0 \uC720\uD6A8\uD574\uC9C0\uBA74 \uD050\uAC00 \uBA38\uC9C0\uD569\uB2C8\uB2E4":q?.reason==="review_receipt_stale"?"head \uC7AC\uC791\uC131\uB428(\uC601\uC218\uC99D\uC774 \uD604\uC7AC head\uC758 \uC870\uC0C1\uC774 \uC544\uB2D8) \u2014 \uBA38\uC9C0 \uAC8C\uC774\uD2B8 \uBCF4\uB958\uC785\uB2C8\uB2E4. \uD074\uB9AD\uD558\uBA74 \uAE30\uB85D\uB41C \uC138\uC158\uC744 \uC774\uC5B4 \uCD5C\uC885 head\uB97C \uB2E4\uC2DC \uB9AC\uBDF0\uC2DC\uD0A4\uACE0, \uC601\uC218\uC99D\uC774 \uC720\uD6A8\uD574\uC9C0\uBA74 \uD050\uAC00 \uBA38\uC9C0\uD569\uB2C8\uB2E4":q?.reason==="review_receipt_invalid"?"\uB9AC\uBDF0 \uC601\uC218\uC99D \uAE30\uB85D\uC774 \uC131\uB9BD\uD558\uC9C0 \uC54A\uC74C \u2014 \uBA38\uC9C0 \uAC8C\uC774\uD2B8 \uBCF4\uB958\uC785\uB2C8\uB2E4. \uD074\uB9AD\uD558\uBA74 \uAE30\uB85D\uB41C \uC138\uC158\uC744 \uC774\uC5B4 \uCD5C\uC885 head\uB97C \uB2E4\uC2DC \uB9AC\uBDF0\uC2DC\uD0A4\uACE0, \uC601\uC218\uC99D\uC774 \uC720\uD6A8\uD574\uC9C0\uBA74 \uD050\uAC00 \uBA38\uC9C0\uD569\uB2C8\uB2E4":q?.reason==="review_receipt_undetermined"?"\uB9AC\uBDF0 \uC601\uC218\uC99D ancestry probe \uBBF8\uC644\uB8CC \u2014 \uBA38\uC9C0 \uAC8C\uC774\uD2B8 \uBCF4\uB958\uC785\uB2C8\uB2E4. \uD074\uB9AD\uD558\uBA74 \uAE30\uB85D\uB41C \uC138\uC158\uC744 \uC774\uC5B4 \uCD5C\uC885 head\uB97C \uB2E4\uC2DC \uB9AC\uBDF0\uC2DC\uD0A4\uACE0, \uC0C8 \uC601\uC218\uC99D\uC774 \uCD5C\uC885 head\uC5D0 \uC720\uD6A8\uD574\uC9C0\uBA74 \uD050\uAC00 \uBA38\uC9C0\uD569\uB2C8\uB2E4":q?.reason==="spec_id_missing"?"native spec_id \uBBF8\uAE30\uB85D \u2014 bd update --spec-id\uB85C \uAE30\uB85D\uD55C \uB4A4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":se?`\uBA38\uC9C0 (${q.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4 (\uCC28\uB840\uAC00 \uB418\uBA74 \uB2E4\uC2DC \uD655\uC778)`:q&&q.tier==="merged"?"\uBA38\uC9C0\uB428 \u2014 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC \uC9C4\uD589 \uC911":`\uBA38\uC9C0 \uBD88\uAC00: ${q&&q.reason||"\uAD00\uCE21 \uB300\uAE30"}`}}function Jl(e,t={}){let{transport:n,issueStores:r,queueStore:o,sessionLogStore:i,gotoIssue:s,getWorkspacePath:l,switchWorkspace:a,openDoc:u,doneRange:d,onDoneRangeChange:p}=t,_=r?no(r):null,m=jk(),y=null,C=null,R=null,V=null,te=co(()=>$()),W=new Map,M=new Map,I=o_(),L=Yl(I)===null,U=d?Hn(d):Bk();function Y(){let h=Qr.find(g=>g.value===U);return h?h.label:"\uC624\uB298"}let q=Zi("beads-ui.worker.lane-collapsed"),N=!1,z="";function G(){return z.trim().length>0}function oe(h){return G()?h.filter(g=>g.search_match===!0).length:void 0}let ye=new Set,Me=new Set,F=new Set;function X(h,g){return!g?.error||!h?{}:{resolve_action:!0,resolve_enabled:!F.has(h),resolve_title:F.has(h)?"\uC138\uC158 \uAE30\uB3D9 \uC694\uCCAD \uC911 \u2014 \uC11C\uBC84 \uC751\uB2F5\uC744 \uAE30\uB2E4\uB9BD\uB2C8\uB2E4":"\uC2E4\uD328\uD55C \uD3D0\uAE30\uB97C \uC0AC\uB78C\uC774 \uC774\uC5B4\uBC1B\uB294 \uB300\uD654\uD615 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4 \u2014 \uAE30\uB85D\uB41C \uC138\uC158\uC774 \uC788\uC73C\uBA74 fork\uD558\uACE0, \uC5C6\uC73C\uBA74 \uC0C8 \uC138\uC158\uC5D0 \uC0AC\uC720\uB97C \uC2E3\uC2B5\uB2C8\uB2E4"}}let Ae=new Set,Ee=new Set,O=new Set,se=null,be=[],ve=$_({queueStore:o,issueStores:r,transport:n,getWorkspacePath:l,onInvalidate:()=>$()});function Pe(){ve.refreshSessionDefaults()}let he=document.createElement("div");he.className="worker-console";let Re=document.createElement("div");Re.className="worker-top";let Xe=document.createElement("div");Xe.className="worker-drawer-overlay",Xe.hidden=!0;let dt=document.createElement("div");dt.className="worker-drawer-overlay__backdrop";let H=document.createElement("div");H.className="worker-drawer-host";let J=document.createElement("div");J.className="worker-drawer-host",J.hidden=!0,Xe.append(dt,H,J);let re=document.createElement("div");re.className="worker-lanes-host",he.append(Re,Xe,re),e.appendChild(he);let fe=yr(null,null),Se=[],_e=ea({transport:n,console_el:he,getLanes:()=>fe,getWorkspaces:()=>Se,getCrossLanes:()=>null,reproject:()=>({lanes:$t(),raw_lanes:null}),onCorrection:()=>{},showToast:me,requestRender:()=>$(),adoptQueue:(h,g)=>{o&&o.set(g)},onDragBegin:()=>{y=null}}),qe=null,Fe=xo(H,{transport:n,sessionLogStore:i,onClose:()=>{qe=null,Xe.hidden=!0,$()}}),Ve=v_(J,{onClose:()=>{J.hidden=!0,Xe.hidden=!0,$()}}),He=p_({getWorkspacePath:l||(()=>"")}),ee=l&&l()||"",Q=__({queueStore:o,transport:n,onChanged:()=>$(),onOpenScript:(h,g)=>{He.open(h,g)}});function xe(){return o&&o.get()||{revision:0,auto_advance:!1,auto_merge:!1,slots:aa,queue:[],serial_lanes:[],serial_lane_count:0,pr_wait:[],done:[]}}function mt(h){for(let g of Object.values(Rt(xe().provider_hold)))for(let E of Array.isArray(g?.targets)?g.targets:[])if(Array.isArray(E?.attempt_ids)&&E.attempt_ids.includes(h))return E;return null}function ft(h){if(h?.status!=="ok")return{eligible:!1,reason:`\uACC4\uC815 \uC0C1\uD0DC ${String(h?.status||"\uBBF8\uC0C1")}`};let g=Array.isArray(h.windows)?h.windows:[],E=g.find(pe=>pe?.key==="5h"),ie=g.find(pe=>pe?.key==="7d");if(!E||typeof E.pct!="number")return{eligible:!1,reason:"5\uC2DC\uAC04 \uC0AC\uC6A9\uB7C9 \uBBF8\uAD00\uCE21"};if(E.pct>80)return{eligible:!1,reason:"5\uC2DC\uAC04 \uC0AC\uC6A9\uB7C9 80% \uCD08\uACFC"};if(ie){if(typeof ie.pct!="number")return{eligible:!1,reason:"7\uC77C \uC0AC\uC6A9\uB7C9 \uBBF8\uAD00\uCE21"};if(ie.pct>90)return{eligible:!1,reason:"7\uC77C \uC0AC\uC6A9\uB7C9 90% \uCD08\uACFC"}}return{eligible:!0,reason:""}}function Ke(h){let g=Rt(xe().attempts)[h];if(!g)return;let E=Rt(xe().runner_catalog),ie=Rt(E.runners),pe=typeof g.runner=="string"&&ie[g.runner]?g.runner:Object.keys(ie)[0]||"",Oe=Rt(ie[pe]),ze=Rt(Oe.models),St=typeof g.model=="string"&&ze[g.model]?g.model:typeof Oe.default_model=="string"?Oe.default_model:Object.keys(ze)[0]||"",Qt=mt(h),ct=typeof g.claude_account=="string"?g.claude_account:typeof Qt?.account=="string"?Qt.account:"";V={attempt_id:h,original_runner:pe,runner:pe,model:St,account:ct,fresh_current:!1},$()}function Je(){V=null,$()}function A(){let h=V;if(!h||!h.runner||!h.model||h.runner==="claude"&&!h.account)return;let g={runner:h.runner,model:h.model};h.runner==="claude"&&h.account&&(g.claude_account=h.account);let E=h.fresh_current||h.runner!==h.original_runner;V=null,$(),wt(h.attempt_id,"session",{exec_override:g,...E?{continuation:"fresh_current",decision_token:{}}:{}})}function Z(){let h=V;if(!h)return"";let g=Rt(Rt(xe().runner_catalog).runners),E=Array.isArray(Rt(xe().account_catalog).claude)?Rt(xe().account_catalog).claude:[],ie=h.runner!==h.original_runner;return c`<dialog
      class="op-dialog provider-resume-dialog"
      aria-label="다른 방법으로 이어하기"
    >
      <h2>다른 방법으로 이어하기</h2>
      <div class="provider-resume-dialog__fields">
        <label>
          러너
          <select class="provider-resume-dialog__runner">
            ${Object.keys(g).map(pe=>c`<option
                  value=${pe}
                  ?selected=${pe===h.runner}
                >
                  ${pe}
                </option>`)}
          </select>
        </label>
        <label>
          모델
          <select class="provider-resume-dialog__model">
            ${Object.entries(g).map(([pe,Oe])=>c`<optgroup label=${pe}>
                  ${Object.keys(Rt(Oe?.models)).map(ze=>c`<option
                        value=${JSON.stringify([pe,ze])}
                        ?selected=${pe===h.runner&&ze===h.model}
                      >
                        ${ze}
                      </option>`)}
                </optgroup>`)}
          </select>
        </label>
        ${h.runner==="claude"?c`<label>
              계정
              <select class="provider-resume-dialog__account">
                ${h.account?"":c`<option value="" selected>계정 선택</option>`}
                ${h.account&&!E.some(pe=>pe?.email===h.account)?c`<option value=${h.account} selected>
                      ${h.account} (목록에 없음)
                    </option>`:""}
                ${E.map(pe=>{let Oe=ft(pe),ze=pe.alias||pe.email;return c`<option
                    value=${pe.email}
                    ?selected=${pe.email===h.account}
                    ?disabled=${!Oe.eligible}
                    title=${Oe.reason}
                  >
                    ${ze}${Oe.reason?` \u2014 ${Oe.reason}`:""}
                  </option>`})}
              </select>
            </label>`:""}
        <label class="provider-resume-dialog__fresh">
          <input
            type="checkbox"
            class="provider-resume-dialog__fresh-input"
            .checked=${h.fresh_current}
          />
          새 세션으로
        </label>
      </div>
      ${ie||h.fresh_current?c`<p class="provider-resume-dialog__notice">
            이전 세션 맥락을 요약 인계합니다
          </p>`:""}
      <div class="op-dialog__actions provider-resume-dialog__actions">
        <button type="button" class="op-btn provider-resume-dialog__cancel">
          취소
        </button>
        <button
          type="button"
          class="op-btn op-btn--primary provider-resume-dialog__confirm"
          ?disabled=${h.runner==="claude"&&!h.account}
          title=${h.runner==="claude"&&!h.account?"\uACC4\uC815\uC744 \uBA3C\uC800 \uACE0\uB974\uC138\uC694":""}
        >
          이어하기
        </button>
      </div>
    </dialog>`}function Ie(h){if(!y||!h.some(E=>E.id===y))return null;let g=Go(xe());return g?{bead_id:y,lanes:g}:null}function Ge(){return l&&l()||""}async function tt(h,g){await _e.sendOp({type:"worker-queue-place",payload:{bead_id:h,...g==="parallel"?{}:{lane:g}},root_dir:Ge()},h)}function Ce(){let h=xe();return typeof h.revision=="number"?h.revision:0}function Ze(h){h&&h.queue&&o&&o.set(h.queue)}async function Ut(h){if(!n||!h)return;let g=await n("worker-attempt-pause",{attempt_id:h});g&&g.paused===!1&&g.reason&&me(`\uC77C\uC2DC\uC815\uC9C0 \uAC70\uBD80: ${g.reason}`,"error",2400)}async function wt(h,g="session",E={}){if(!n||!h)return;let ie=n,pe=xe().attempts?.[h]||null;await so({context:{bead_id:pe?.bead_id||"",kind:g,tuple:pe?Sn(pe):""},transport:Oe=>ie("worker-attempt-resume",{attempt_id:h,expected_revision:Ce(),...E,...Oe}),adopt:Ze})}async function bt(h,g,E=!0){if(!n)return null;let ie=n,pe=await ie(h,{...g,expected_revision:Ce()});return Ze(pe),pe&&pe.conflict&&E&&(pe=await ie(h,{...g,expected_revision:Ce()}),Ze(pe)),pe}async function Ft(h){if(!n||!h)return;let g=xe().merge_queue?.find(ie=>ie.bead_id===h)?.continuation_action;if(g?.mismatch&&g.continuation===null){await Ue(h,g.mismatch);return}ye.add(h),$();let E;try{E=await bt("worker-merge-queue-add",{bead_id:h})}catch{me("\uBA38\uC9C0 \uD074\uB9AD\uC774 \uC11C\uBC84\uC5D0 \uC804\uB2EC\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4(\uC5F0\uACB0 \uBB38\uC81C) \u2014 \uC5F0\uACB0 \uBCF5\uAD6C \uD6C4 \uB2E4\uC2DC \uB20C\uB7EC\uC8FC\uC138\uC694","error",3200);return}finally{ye.delete(h),$()}if(!(!E||E.applied)){if(E.conflict){me("\uD050\uAC00 \uBC14\uB00C\uC5B4 \uBA38\uC9C0 \uD074\uB9AD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uB20C\uB7EC\uC8FC\uC138\uC694","error",2400);return}me(zk(E.reason),"error",2400)}}async function Ct(h){if(!(!n||!h||Me.has(h))){Me.add(h),$();try{let g=await n("worker-cleanup-retry",{bead_id:h,expected_revision:Ce()});Ze(g),g&&!g.retried&&!g.conflict&&g.reason&&me(`\uC815\uB9AC \uC7AC\uC2DC\uB3C4 \uAC70\uBD80: ${g.reason}`,"error",2400)}finally{Me.delete(h),$()}}}async function Mt(h){if(!(!n||!h||F.has(h))){F.add(h),$();try{let g=await n("worker-resolve-in-session",{bead_id:h,expected_revision:Ce()});Ze(g),me(Gk(g),Yk(g),4e3)}finally{F.delete(h),$()}}}async function de(h,g){let E=xe().hold;if(!n||!E||typeof E.since!="number")return;let ie=await n(h,{since:E.since});Ze(ie),ie&&ie.ok===!1&&me(`${g}: ${ie.reason==="hold_changed"?"\uD050 \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uD655\uC778\uD558\uC138\uC694":ie.reason||""}`,"error",2800)}async function ke(h,g){if(!n||!h||!g)return;let E=await n("worker-parked-retry",{bead_id:h,attempt_id:g});Ze(E),E&&E.ok===!1&&me(`\uC7AC\uC2DC\uB3C4 \uAC70\uBD80: ${E.reason==="not_latest"?"\uC774 bead\uC5D0 \uB354 \uC0C8\uB85C\uC6B4 \uC2DC\uB3C4\uAC00 \uC788\uC2B5\uB2C8\uB2E4":E.reason||""}`,"error",2800)}async function Ue(h,g){let E=await _r({continuation_mismatch:g},(pe,Oe)=>bt("worker-merge-queue-add",{bead_id:h,continuation:pe,decision_token:Oe},!1)),ie=E?.queue?.merge_queue?.find(pe=>pe.bead_id===h)?.continuation_action;if(E?.applied!==!0&&ie?.continuation===null&&ie.mismatch){await Ue(h,ie.mismatch);return}E&&E.applied===!1&&!E.conflict&&me("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD\uC774 \uCD5C\uC2E0 \uC0C1\uD0DC\uC640 \uC77C\uCE58\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4","error",2800)}async function rt(h){if(!n)return;let g=await bt("worker-merge-auto-toggle",{on:h});!g||g.conflict||me(h?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0 \u2014 \uB300\uAE30 \uD56D\uBAA9\uC744 \uBE44\uC6E0\uC2B5\uB2C8\uB2E4",h?"success":"info",2400)}async function et(h){if(!n||!h)return;let g=await bt("worker-merge-queue-remove",{bead_id:h});g&&!g.conflict&&!g.applied&&g.reason==="merge_active"&&me("\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error",2400)}async function je(){await bt("worker-merge-queue-remove",{all:!0})}async function x(h,g=null,E="unmerged",ie=null){if(!n||!h)return;let pe=Vo(h,E);if(!(!!ie||typeof globalThis.confirm!="function"||globalThis.confirm(pe)))return;let ze=await n("worker-discard",{bead_id:h,...g?{attempt_id:g}:{},...ie?{operation_id:ie}:{},expected_revision:Ce()});if(Ze(ze),ze&&ze.conflict&&(ze=await n("worker-discard",{bead_id:h,...g?{attempt_id:g}:{},...ie?{operation_id:ie}:{},expected_revision:Ce()}),Ze(ze)),ze&&ze.discarded===!0){me(mi(ze),"success",5e3);return}if(ze&&ze.reason){me(`\uD3D0\uAE30 \uC2E4\uD328: ${ze.reason}`,"error",2800);return}if(ze&&ze.accepted&&ze.pending==="merged_revert"){me("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success",2400);return}if(ze&&ze.accepted&&!ze.discarded){me(`\uD3D0\uAE30 \uC9C4\uD589: ${ze.phase||"\uBC31\uC5C5 \uC911"}`,"success",2400);return}ze&&!ze.conflict&&me("\uD3D0\uAE30 \uAC70\uBD80: unknown","error",2800)}async function j(h,g,E){if(!n||!h||!g||typeof globalThis.confirm=="function"&&!globalThis.confirm(Qo(h,E)))return;let ie=await n("worker-discard-abandon",{bead_id:h,operation_id:g,expected_revision:Ce()});if(Ze(ie),ie&&ie.conflict&&(ie=await n("worker-discard-abandon",{bead_id:h,operation_id:g,expected_revision:Ce()}),Ze(ie)),ie&&ie.abandoned===!0){me(_i(E),"success",5e3);return}if(ie&&ie.reason){me(`\uD3D0\uAE30 \uD3EC\uAE30 \uAC70\uBD80: ${ie.reason}`,"error",2800);return}ie&&!ie.conflict&&me("\uD3D0\uAE30 \uD3EC\uAE30 \uAC70\uBD80: unknown","error",2800)}async function ae(h,g,E){if(!(!n||!g||!E||Ee.has(g))){Ee.add(g),$();try{let ie=await n(h,{bead_id:g,action_id:E,expected_revision:Ce()});Ze(ie),ie?.conflict?me("\uC774\uC804 \uC791\uC5C5 \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694.","error",2800):!ie?.ok&&ie?.reason&&me(`\uC774\uC804 \uC791\uC5C5 \uCC98\uB9AC \uAC70\uBD80: ${String(ie.reason)}`,"error",2800)}finally{Ee.delete(g),$()}}}async function ge(h,g){if(!n||!g||Ae.has(g))return;Ae.add(g),$();let E;try{let ie=async(pe={})=>await n(h,{bead_id:g,expected_revision:Ce(),...pe});E=await ie(),Ze(E),E&&E.conflict&&(E=await n(h,{bead_id:g,expected_revision:Ce()}),Ze(E)),h==="worker-revise-fix"&&(E=await _r(E,(pe,Oe)=>ie({continuation:pe,decision_token:Oe}),{onResult:Ze,refresh:()=>ie()}))}finally{Ae.delete(g),$()}if(!(!E||E.conflict)){if(E.ok){me(h==="worker-revise-fix"?"\uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4 \u2014 \uC218\uB9AC \uD6C4 \uAD6C\uD604\uC774 \uC7AC\uB514\uC2A4\uD328\uCE58\uB429\uB2C8\uB2E4":"\uB378\uD0C0 \uC2B9\uC778 \uC644\uB8CC \u2014 \uC601\uC218\uC99D \uAC31\uC2E0 + \uD30C\uD0B9 \uD574\uC81C","success",2800);return}me(`\uCC98\uBD84 \uAC70\uBD80: ${E.reason||""}`,"error",3e3)}}async function le(h){if(!n)return;let g=await n("worker-automation-toggle",{on:h,expected_revision:Ce()});Ze(g),g&&g.conflict&&await n("worker-automation-toggle",{on:h,expected_revision:Ce()}).then(Ze)}async function it(h){if(!n||!h)return;let g=await n("worker-repo-operation-dismiss",{operation_id:h});Ze(g),g&&g.ok===!1&&me(`\uAE30\uB85D \uB2EB\uAE30 \uAC70\uBD80: ${g.reason||""}`,"error",3e3)}async function It(h){if(!n||!Number.isFinite(h))return;let g=Math.max(aa,Math.floor(h)),E=await n("worker-queue-set-slots",{slots:g,expected_revision:Ce()});Ze(E),E&&E.conflict&&await n("worker-queue-set-slots",{slots:g,expected_revision:Ce()}).then(Ze)}async function yt(h){if(!n||!Number.isInteger(h)||h<1||h>x_)return;let g=xe(),E=(Array.isArray(g.serial_lanes)?g.serial_lanes:[]).slice(h).reduce((Oe,ze)=>Oe+(Array.isArray(ze?.entries)?ze.entries.length:0),0),ie=()=>({count:h,expected_revision:Ce()}),pe=await n("worker-queue-set-serial-lane-count",ie());Ze(pe),pe&&pe.conflict&&(pe=await n("worker-queue-set-serial-lane-count",ie()),Ze(pe)),pe&&pe.applied&&E>0&&me(`\uC9C1\uB82C \uB808\uC778 \uCD95\uC18C \u2014 ${E}\uAC1C \uD56D\uBAA9\uC774 \uBCD1\uB82C \uB300\uAE30\uB85C \uC774\uB3D9`)}function $t(){let h=Lr(U),g=ve.read({candidate_sort:I,done_since:h});return Se=g.workspaces,fe=yr(g.workspaces,g.workspaces_state,{done_since:h,candidate_filter:m,candidate_hidden_counts:"per_control",candidate_sort:"as_given",groups:"all",search:z}),fe}function xt(h){return h.queue_groups[0]||Nk}function Lt(h){let g=h.dependency_chips||null,E={...g&&g.released?{released:g.released}:{},...g&&g.dependents?{dependents:g.dependents}:{}},ie=W.get(h.id),pe=M.get(h.id)||null,Oe=ie&&ie.overlaps.length>0?ie.overlaps:null,ze=!!ie&&ie.scope_missing;return!pe&&!Oe&&!ze&&Object.keys(E).length===0?null:{...E,...pe?{predecessors:pe}:{},...Oe?{overlaps:Oe}:{},...ze?{scope_missing:!0}:{}}}function qt(h){return{...h,workspace_name:"",done_layout:void 0,dependency_chips:Lt(h)||void 0,chip_popover:Dt(h)}}function Dt(h){return wi(h,g=>te.isOpen({bead_id:h.id,chip_key:g}))}function Jt(){let h=xe(),g=new Map;for(let E of Object.values(Rt(h.lane_states))){let ie=Array.isArray(E?.corrections)?E.corrections:[];for(let pe of ie)pe&&typeof pe.bead_id=="string"&&typeof pe.after=="string"&&g.set(pe.bead_id,pe.after)}return{admission:Rt(h.admission),correction_after:g}}function Vt(h,g){let E=qt(h),ie=dd(g.admission[h.id]||null,!!h.discard||Ee.has(h.id)),pe=g.correction_after.get(h.id);return{...E,draggable:E.draggable===!0&&!ie,stale_work:ie,reason:ie?"":E.reason,badges:pe?[`\u{1F517} ${pe} \uB4A4 (blocks \uC790\uB3D9)`,...E.badges||[]]:E.badges,revise_enabled:E.revise_enabled===!0&&!Ae.has(h.id)}}function At(h){let g=Jt();return xt(h).sublanes.parallel.map(E=>Vt(E,g))}function Wt(h){let g=Jt();return xt(h).sublanes.serial.map(E=>{let ie=E.occupants.map(pe=>({id:pe.id,title:pe.title,draggable:!1,lane:E.id,ghost:!0,badges:[pe.badge],...typeof pe.search_match=="boolean"?{search_match:pe.search_match}:{}}));return{id:E.id,index:E.index+1,raw_length:E.raw_length,ghosts:ie,items:E.items.map(pe=>Vt(pe,g)),occupied:E.occupied_by.length>0,badge:E.occupants.length>0?E.occupants[0].badge:"\uB300\uAE30",cycle:E.cycle===!0}})}function zt(h){return h.runnable.map(g=>qt(g))}function on(h){return h.done.map(g=>qt(g))}function Kt(h){let g=h.running.filter(E=>E.non_occupying!==!0).map(E=>({...E,bead_id:E.id,attempt_id:E.attempt_id||"",paused:E.run_state==="paused",failed:E.run_state==="failed",parked:E.run_state==="parked",retry_wait:E.run_state==="retry_wait",waiting:E.run_state==="waiting",wait:E.wait||null,provider_hold:E.run_state==="provider_hold",hold:E.hold?{...E.hold,open:R===E.attempt_id}:null,status_label:E.run_state==="failed"?E.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328":E.run_state==="parked"?"\uC138\uC158 \uB300\uAE30":E.run_state==="retry_wait"?"\uC7AC\uC2DC\uB3C4 \uB300\uAE30":E.run_state==="waiting"?"\uC120\uD589 \uB300\uAE30":E.run_state==="provider_hold"?"\uACF5\uAE09\uC790 \uBCF4\uB958":void 0,can_pause:E.can_pause!==!1,workspace_name:"",dependency_chips:Lt(E)||void 0,chip_popover:Dt(E),rollup_expanded:O.has(E.id),failure:E.failure?{...E.failure,open:C===E.attempt_id}:null,...X(E.id,E.discard)}));return[...g.filter(E=>E.failed===!0),...g.filter(E=>E.failed!==!0&&E.parked===!0),...g.filter(E=>E.failed!==!0&&E.parked!==!0)]}function ln(h){return we(h).map(g=>({...g,chip_popover:Dt(g)}))}function we(h){if(se&&se.model===h)return se.rows;let g=xe(),E=xt(h),ie=Rt(g.attempts),pe=Object.values(ie).filter(rr),Oe=new Map;for(let Ye of pe)Oe.set(Ye.attempt_id,Ye);let ze=new Map;for(let Ye of pe)ze.set(Ye.bead_id,Ye);let St=new Map;for(let Ye of[...h.pr_wait,...h.running,...h.queue,...h.runnable,...h.done])St.has(Ye.id)||St.set(Ye.id,Ye);let Qt=Ye=>{let Gt=null;for(let xn of pe)!xn||xn.bead_id!==Ye||il(xn,Oe)||(Gt===null||(typeof xn.started_at=="number"?xn.started_at:0)>=(typeof Gt.started_at=="number"?Gt.started_at:0))&&(Gt=xn);return Gt&&typeof Gt.target_base=="string"?Gt.target_base:null},ct=new Map;for(let Ye of h.running)Ye.run_state==="failed"||Ye.conflict_resolution!==!0||(Ye.run_state!=="paused"?ct.set(Ye.id,"running"):ct.has(Ye.id)||ct.set(Ye.id,"paused"));let sn=Rt(g.auto_merge_skips),cn=new Set(E.merge.auto_excluded),Wn=Rt(g.pr_observations),_n=Rt(g.pr_activity),dn=Rt(g.cleanup_failed),Rn=Rt(g.discard_operations),Qn=Rt(g.bead_workflow),an=Rt(g.bead_titles),Xn=g.merge_queue_state||{active:null,failures:{}},cr=E.merge.state.waiting,In=new Map;for(let Ye of Array.isArray(g.merge_queue)?g.merge_queue:[])Ye&&typeof Ye=="object"&&Ye.bead_id&&In.set(Ye.bead_id,Ye);let zn=(Array.isArray(g.pr_wait)?g.pr_wait:[]).map(Ye=>{let Gt=St.get(Ye.bead_id);return{...sw(Ye.bead_id,Gt?.title||an[Ye.bead_id]||Ye.bead_id,Wn,dn[Ye.bead_id]||null,nr(ie,Ye.bead_id),_n[Ye.bead_id]||(ye.has(Ye.bead_id)?{activity:null,merge_progress:null,queueing:"merge"}:Me.has(Ye.bead_id)?{activity:null,merge_progress:null,queueing:"cleanup"}:null),ct.get(Ye.bead_id)||null,Ye.external===!0,{position:E.merge.positions.get(Ye.bead_id)||0,active:Xn.active===Ye.bead_id,failure:Rt(Xn.failures)[Ye.bead_id]||null,waiting:cr&&cr.bead_id===Ye.bead_id?cr.reason:null,resolution:E.merge.resolutions.get(Ye.bead_id),continuation_action:E.merge.continuations.get(Ye.bead_id),authority:E.merge.authorities.get(Ye.bead_id)||null,hold:In.get(Ye.bead_id)?.hold||null,review_dispatch:In.get(Ye.bead_id)?.review_dispatch||null},Ye.wt_present!==!1,g.auto_merge===!0&&cn.has(Ye.bead_id)?sn[Ye.bead_id]?.reason||"":null,sl(E.declared_base,Qt(Ye.bead_id)),Rt(g.completion_status)[Ye.bead_id]||null,Rn,g.auto_merge===!0,{merge_sha:Ye.merge_sha,cleanup_cursor:Ye.cleanup_cursor,repo_operations:E.repo_operations},Gt?Lt(Gt):null,id(ie,Ye.bead_id),F.has(Ye.bead_id)),...Gt?.search_match===void 0?{}:{search_match:Gt.search_match},workflow:Qn[Ye.bead_id]||null,priority:Gt?.priority,from_id:Gt?.from_id,...Gt?.created_at===void 0?{}:{created_at:Gt.created_at},...Gt?.updated_at===void 0?{}:{updated_at:Gt.updated_at}}});return se={model:h,rows:zn},zn}function T(h){let g=xt(h),E=[];for(let Oe of h.running)Oe.non_occupying!==!0&&E.push({id:Oe.id,title:Oe.title,location_label:"\uC2E4\uD589\uC911",kind:"running",lane_id:Oe.serial_lane_id??null});for(let Oe of h.pr_wait)E.push({id:Oe.id,title:Oe.title,location_label:"PR \uB300\uAE30",kind:"pr_wait",lane_id:null});for(let Oe of g.sublanes.serial)Oe.items.forEach((ze,St)=>{E.push({id:ze.id,title:ze.title,location_label:`${Oe.id} #${St+1}`,kind:"serial",lane_id:Oe.id})});g.sublanes.parallel.forEach((Oe,ze)=>{E.push({id:Oe.id,title:Oe.title,location_label:`#${ze+1}`,kind:"parallel",lane_id:null})});for(let Oe of h.runnable)E.push({id:Oe.id,title:Oe.title,location_label:"\uD6C4\uBCF4",kind:"candidate",lane_id:null,queue_placeable:Oe.queue_placeable===!0});let ie=xe();W=l_(ie.bead_scope,E);let pe=new Map;for(let Oe of[...h.running,...h.runnable])Array.isArray(Oe.blocked_by)&&Oe.blocked_by.length>0&&pe.set(Oe.id,Oe.blocked_by);for(let[Oe,ze]of Object.entries(Rt(ie.bead_blocked_by)))Array.isArray(ze)&&pe.set(Oe,ze.filter(St=>typeof St=="string"&&St.length>0));M=$d(pe,E,Rt(ie.blocker_workspaces))}function ne(h){let g=h.hold&&typeof h.hold=="object"?h.hold:null;if(!g||g.kind!=="env"&&g.kind!=="systemic")return"";let E=wr(g.cause)||String(g.cause||""),ie=Array.isArray(h.lineages)?h.lineages:[];if(g.kind==="env"){let Oe=ie.map(St=>St&&St.next_at).filter(St=>typeof St=="number").sort((St,Qt)=>St-Qt)[0],ze=typeof Oe=="number"?` \xB7 \uB2E4\uC74C ${new Date(Oe).toLocaleTimeString("ko-KR",{hour:"2-digit",minute:"2-digit"})}`:"";return c`<div class="worker-hold worker-hold--env" role="status">
        <span class="worker-hold__text"
          >환경 보류: ${E} — 재시도 대기${ze}</span
        >
        <button
          type="button"
          class="worker-hold__retry"
          title="예약된 재시도를 지금 실행합니다"
        >
          지금 재시도
        </button>
      </div>`}let pe=(Array.isArray(g.bead_ids)?g.bead_ids:[]).filter(Oe=>typeof Oe=="string"&&Oe.length>0);return c`<div class="worker-hold worker-hold--systemic" role="alert">
      <span class="worker-hold__text"
        >${E}${pe.length>0?` \u2014 bead ${pe.join(", ")}`:""}</span
      >
      <button
        type="button"
        class="worker-hold__resume"
        title="정지를 풀고 멈춰 있던 bead를 다시 디스패치합니다"
      >
        재개
      </button>
    </div>`}function De(h){let g=[];for(let[ct,sn]of Object.entries(Rt(h.provider_hold)))for(let cn of Array.isArray(sn?.targets)?sn.targets:[])g.push({runner:ct,target:cn});if(g.length===0)return"";let E=g.find(ct=>ct.target?.kind==="outage");if(E){let ct=typeof E.target.next_probe_at=="number"?new Date(E.target.next_probe_at).toLocaleTimeString("ko-KR",{hour:"2-digit",minute:"2-digit"}):"";return c`<div class="worker-provider-gate" role="status">
        ⚠️ ${E.runner} 공급자 장애 — 신규 디스패치
        보류${ct?`, \uB2E4\uC74C \uD504\uB85C\uBE0C ${ct}`:""}
      </div>`}let ie=Array.isArray(Rt(h.account_catalog).claude)?Rt(h.account_catalog).claude:[],pe=ct=>ie.find(cn=>cn?.email===ct)?.alias||ct,Oe=g.find(ct=>typeof ct.target?.account!="string"),ze=ct=>typeof ct?.resets_at=="number"?new Date(ct.resets_at).toLocaleTimeString("ko-KR",{hour:"2-digit",minute:"2-digit"}):"";if(Oe){let ct=ze(Oe.target);return c`<div class="worker-provider-gate" role="status">
        ⏳ ${Oe.runner} 사용 한도 — 계정 미확인이라 러너 전체 디스패치
        보류${ct?`, \uB9AC\uC14B ${ct}`:""}
      </div>`}let St=[...new Set(g.map(ct=>pe(String(ct.target.account))))],Qt=ze(g[0].target);return c`<div class="worker-provider-gate" role="status">
      ⏳ ${St.join(", ")} 사용 한도 —
      ${St.length>1?"\uADF8 \uACC4\uC815\uB4E4":"\uADF8 \uACC4\uC815"} 디스패치
      보류${Qt?`, \uB9AC\uC14B ${Qt}`:""}
    </div>`}function b(h){let g=xe(),E=xt(h),ie=E.sublanes.parallel,pe=ie.length>0?ie[0].id:"\u2014",Oe=c`<button
      type="button"
      class="worker-play${g.auto_advance?" is-active":""}"
    >
      ${g.auto_advance?"\u23F8 \uC790\uB3D9\uD654 \uBA48\uCDA4":"\u25B6 \uC790\uB3D9\uD654"}
    </button>`,ze=B(h),St=E.over_cap?c`<span
          class="worker-overcap"
          title="수동 재개(▶)는 슬롯 cap을 초과할 수 있습니다 — 자동 진행은 cap을 지킵니다"
          >cap 초과</span
        >`:"",Qt=g.auto_advance?0:(Array.isArray(g.queue)?g.queue:[]).filter(an=>an&&typeof an.armed_by_lane=="string"&&an.armed_by_lane.length>0).length,ct=Qt>0?c`<span
            class="worker-kpi__chip worker-kpi__chip--armed"
            title="모니터 연결 레인이 발차한 대기 행입니다 — 이 레포의 자동 진행은 꺼진 채입니다"
            >⏸ 자동 진행 꺼짐 · 연결 레인 ${Qt}건 진행 중</span
          >`:"",sn=c`<span class="worker-kpi__chip worker-kpi__chip--running"
        >실행 <b>${E.live_count}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--pr"
        >PR 대기 <b>${ln(h).length}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--done"
        >${Y()} 완료 <b>${h.done.length}</b></span
      >`,cn=c`<span
      class="worker-kpi__chip worker-kpi__chip--base"
      title=${E.declared_base?"\uC774 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uC5B8\uD55C target base (docs/agents/repo-ops.toml). \uB514\uC2A4\uD328\uCE58 \uC2DC\uC810\uC758 \uAC80\uC99D\uC740 \uBCC4\uB3C4":"\uC120\uC5B8 \uD30C\uC77C\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 \u2014 target base \uD655\uC778 \uBD88\uAC00"}
      >base ${E.declared_base||"?"}</span
    >`,Wn=c`<label class="worker-tgl worker-slots"
        >동시 실행
        <input
          type="number"
          class="worker-slots__input"
          min=${aa}
          step="1"
          .value=${String(E.slots)}
          title="동시에 실행할 세션 수 (최소 1 = 순차 실행)"
      /></label>
      <label
        class="worker-tgl worker-serial-lanes"
        title="고정 직렬 레인 수 (1~5). 축소 시 잘린 레인의 대기 항목은 병렬 대기로 돌아갑니다"
        >직렬 레인
        <select class="worker-serial-lane-count" aria-label="직렬 레인 수">
          ${Array.from({length:x_},(an,Xn)=>Xn+1).map(an=>c`<option
                value=${String(an)}
                ?selected=${E.serial_lane_count===an}
              >
                ${an}
              </option>`)}
        </select>
      </label> `,_n=c`<input
      type="search"
      class="worker-search"
      placeholder="ID·제목 검색"
      aria-label="이슈 검색 (ID·제목)"
      .value=${z}
    />`,dn=ld(E.repo_operations,E.cleanup_failures),Rn=ne(g),Qn=De(g);return N?c`<div class="worker-ribbon">
          ${Oe} ${ze}
          <div class="worker-kpi worker-kpi--ribbon">
            ${St}${ct}${sn}
          </div>
        </div>
        <div class="worker-ctrl worker-ctrl--mobile">
          <div class="worker-ctrl__ops">${Wn}${_n}</div>
          <div class="worker-kpi">${cn}</div>
        </div>
        ${Qn}${Rn}${dn}${Q.template()}`:c`<div class="worker-ctrl">
        <div class="worker-ctrl__ops">
          ${Oe}${ze}${Wn}${_n}
        </div>
        <div class="worker-kpi">
          ${St}${ct}${sn}${cn}
          ${(Array.isArray(E.token_total)?E.token_total:E.token_total?[{label:E.token_total,tooltip:`${Y()} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}]:[]).map(an=>c`<span
                class="worker-kpi__chip worker-kpi__chip--tokens"
                title=${an.tooltip}
                >${Y()} 완료 · 누적 ${an.label}</span
              >`)}
          <span class="worker-kpi__next worker-stat"
            >다음 <b>${pe}</b></span
          >
        </div>
      </div>
      ${Qn}${Rn}${dn}${Q.template()}`}function v(h){let g=h.runnable_hidden;return c`<div class="worker-filter">
      <label class="worker-filter__tgl" title="blocked 이슈 표시 (기본 숨김)">
        <input
          type="checkbox"
          class="worker-filter__blocked"
          .checked=${m.show_blocked}
        />
        🔒 blocked${g.blocked>0?` ${g.blocked}`:""}
      </label>
      <div
        class="worker-filter__readiness"
        role="group"
        aria-label="준비도 필터"
      >
        ${ts.map(E=>c`<button
              type="button"
              class="worker-filter__chip${m.readiness===E.value?" is-active":""}"
              data-readiness=${E.value}
              aria-pressed=${m.readiness===E.value?"true":"false"}
            >
              ${E.label}
            </button>`)}
        ${g.readiness>0?c`<span class="worker-filter__hidden"
              >숨김 ${g.readiness}</span
            >`:""}
      </div>
    </div>`}function P(){let h=L?"custom":Yl(I)||"custom";return c`<select
      class="worker-sort"
      aria-label="후보 정렬"
      title="후보 정렬"
      .value=${h}
    >
      ${$s.map(g=>c`<option value=${g.id} ?selected=${h===g.id}>
            ${g.label}
          </option>`)}
      <option value="custom" ?selected=${h==="custom"}>
        사용자 지정…
      </option>
    </select>`}function f(){let h=xs(I);return c`<div
      class="worker-sort-chain"
      role="group"
      aria-label="후보 정렬 체인"
    >
      ${[0,1,2].map(g=>{let E=h[g];return c`<span class="worker-sort-chain__step">
          <select
            class="worker-sort-chain__key"
            data-step=${g}
            aria-label=${`${g+1}\uCC28 \uC815\uB82C \uD0A4`}
            .value=${E?E.key:""}
          >
            ${g===0?"":c`<option value="" ?selected=${!E}>없음</option>`}
            ${r_.map(ie=>c`<option
                  value=${ie.key}
                  ?selected=${!!E&&E.key===ie.key}
                >
                  ${ie.label}
                </option>`)}
          </select>
          ${E?c`<button
                type="button"
                class="worker-sort-chain__dir"
                data-step=${g}
                aria-label=${E.dir==="asc"?"\uC624\uB984\uCC28\uC21C":"\uB0B4\uB9BC\uCC28\uC21C"}
                title=${E.dir==="asc"?"\uC624\uB984\uCC28\uC21C":"\uB0B4\uB9BC\uCC28\uC21C"}
              >
                ${E.dir==="asc"?"\u2191":"\u2193"}
              </button>`:""}
        </span>`})}
    </div>`}function k(){return c`<div class="worker-done-controls">
      <select
        class="worker-sort worker-done-range"
        aria-label="완료 기간"
        title="완료 기간"
        .value=${U}
      >
        ${Qr.map(h=>c`<option value=${h.value} ?selected=${U===h.value}>
              ${h.label}
            </option>`)}
      </select>
    </div>`}function B(h){let g=xt(h).merge,E=xe().auto_merge===!0;if(g.running)return c`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop${E?" is-active":""}"
        title=${E?"\uC790\uB3D9 \uBA38\uC9C0\uB97C \uB044\uACE0 \uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)":"\uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)"}
      >
        ${E?"\u23F8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8":"\uC77C\uAD04 \uBA38\uC9C0 \uC911\uB2E8"} ${g.positions.size}
      </button>`;if(E)return c`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop is-active"
        title="자동 머지 켜짐 — 자격이 생기는 PR을 계속 큐에 넣습니다. 클릭하면 끕니다"
      >
        ⏸ 자동 머지
      </button>`;let ie=new Set(g.auto_excluded),pe=ln(h).filter(Oe=>Oe.merge_action&&Oe.merge_enabled&&!ie.has(Oe.id)).length;return c`<button
      type="button"
      class="worker-merge-all"
      title="켜 두면 자격이 생기는 PR을 계속 큐에 넣어 순서대로 충돌 해소·머지합니다"
    >
      ▶ 자동 머지${pe>0?` ${pe}`:""}
    </button>`}function ce(h,g){return c`<div
      data-bead-id=${h.id}
      data-drag-kind=${g.kind}
      data-root-dir=${g.root_dir}
      data-lane-id=${pn(g.lane_id)}
      data-row-index=${g.row_index}
      data-queue-index=${String(h.queue_index??0)}
    >
      ${qn({...h,...X(h.id,h.discard)},{actions:yo(h)})}
    </div>`}function ue(h){let g=At(h),E=Ge();return $i({parallel:{rows:g.map((ie,pe)=>ce(ie,{kind:"parallel",root_dir:E,row_index:pe})),count:g.length,collapsed:q.isAreaCollapsed("parallel"),drop:{drop:"parallel",root_dir:E}},serial:{lanes:Wt(h).map(ie=>({id:ie.id,title:`\uC9C1\uB82C ${ie.index}`,rows:[...ie.ghosts.map(pe=>qn({...pe,...X(pe.id,pe.discard)},{actions:yo(pe)})),...ie.items.map((pe,Oe)=>ce(pe,{kind:"repo-serial",root_dir:E,row_index:Oe,lane_id:ie.id}))],count:ie.ghosts.length+ie.items.length,match_count:oe([...ie.ghosts,...ie.items]),empty:ie.ghosts.length+ie.items.length===0,badge:ie.badge,held:ie.occupied,cycle:ie.cycle,drop:{drop:"repo-serial",root_dir:E,lane_id:ie.id,lane_length:String(ie.raw_length)}})),collapsed:q.isAreaCollapsed("serial")}})}function Be(h){return mf(Kt(h),Date.now(),qe)}function _t(h){return h.running.some(g=>g.kind!=="session"&&g.run_state==="running")}function gt(h){let g=xt(h),E=zt(h),ie=At(h),pe=on(h),Oe=ln(h),ze=Kt(h),St=Vn({id:"worker-pane-candidate",lane:"candidate",title:"\uD6C4\uBCF4",items:E,match_count:oe(E),src:!0,empty:"\uD6C4\uBCF4 \uC5C6\uC74C",header_control:P(),header_row:L?f():void 0,controls:v(h),collapsible:!0,collapsed:q.isCollapsed("candidate"),place_menu:Ie(E),onOpenDoc:u?(ct,sn)=>u(sn):void 0}),Qt=Vn({id:"worker-pane-done",lane:"done",title:"\uC644\uB8CC",items:pe,match_count:oe(pe),empty:`${Y()} \uC644\uB8CC \uC5C6\uC74C`,header_control:k(),collapsible:!0,collapsed:q.isCollapsed("done"),preview:N?Array.isArray(g.token_total)?g.token_total.map(ct=>ct.label).join(" \xB7 "):g.token_total||A_(pe):void 0});return N?c`<div class="worker-lanes worker-lanes--mobile">
          ${xi({live:_t(h),running_body:ze.length>0?Be(h):"",pr_wait_rows:Oe.map(ct=>qn(ct)),count:ze.length+Oe.length})}
          ${Vn({id:"worker-pane-queue",lane:"queue",title:"\uB300\uAE30",items:ie,count:ie.length,match_count:oe(ie),collapsible:!0,collapsed:q.isCollapsed("queue"),preview:A_(ie),body:ue(h)})}
          ${St} ${Qt}
        </div>
        ${Z()}`:c`<div class="worker-lanes">
        ${St}
        ${Vn({id:"worker-pane-queue",lane:"queue",title:"\uB300\uAE30",items:ie,count:ie.length,match_count:oe(ie),collapsible:!0,collapsed:q.isCollapsed("queue"),body:ue(h)})}
        ${Vn({id:"worker-pane-running",lane:"running",title:"\uC2E4\uD589 \uC911",items:ze,match_count:oe(ze),header_control:c`<span class="worker-pane__meta"
            >슬롯 ${g.slots}</span
          >`,live:_t(h),collapsible:!0,collapsed:q.isCollapsed("running"),body:Be(h)})}
        ${Vn({id:"worker-pane-pr-wait",lane:"pr_wait",title:"PR \uB300\uAE30",items:Oe,match_count:oe(Oe),empty:"PR \uB300\uAE30 \uC5C6\uC74C",collapsible:!0,collapsed:q.isCollapsed("pr_wait")})}
        ${Qt}
      </div>
      ${Z()}`}function at(h){q.toggle(h),$()}function S(h){q.toggleArea(h),$()}function $(){let h=$t();T(h),pt(b(h),Re),pt(gt(h),re);let g=re.querySelector(".provider-resume-dialog");g&&!g.open&&(typeof g.showModal=="function"?g.showModal():g.setAttribute("open",""))}function Le(){let h=!0,g=Xi(E=>{if(N=E,h){h=!1;return}$()});be.push(g)}function Ne(h){m=h,Fk(h),$()}function ot(h){if(h==="custom"){L=!0,$();return}I=Hr(h),Vl(I),L=!1,$()}function vt(h){I=Hr({chain:h}),Vl(I),$()}function Nt(h){U=Hn(h),Uk(U),p?.(U),$()}function en(h){let g=h.target;if(V){let ct=g?.closest?.(".provider-resume-dialog__runner");if(ct){let _n=Rt(Rt(xe().runner_catalog).runners),dn=Rt(_n[ct.value]),Rn=Object.keys(Rt(dn.models));V={...V,runner:ct.value,model:typeof dn.default_model=="string"?dn.default_model:Rn[0]||""},$();return}let sn=g?.closest?.(".provider-resume-dialog__model");if(sn){try{let[_n,dn]=JSON.parse(sn.value);typeof _n=="string"&&typeof dn=="string"&&(V={...V,runner:_n,model:dn},$())}catch{}return}let cn=g?.closest?.(".provider-resume-dialog__account");if(cn){V={...V,account:cn.value},$();return}let Wn=g?.closest?.(".provider-resume-dialog__fresh-input");if(Wn){V={...V,fresh_current:Wn.checked},$();return}}let E=g?.closest?.(".worker-serial-lane-count");if(E){let ct=Number.parseInt(E.value,10);Number.isFinite(ct)&&yt(ct).then($);return}let ie=h.target?.closest?.(".worker-filter__blocked");if(ie){Ne({...m,show_blocked:ie.checked});return}let pe=h.target?.closest?.(".worker-sort-chain__key");if(pe){let ct=Number.parseInt(pe.getAttribute("data-step")||"",10);Number.isFinite(ct)&&vt(s_(xs(I),ct,pe.value));return}let Oe=h.target?.closest?.(".worker-done-range");if(Oe){Nt(Oe.value);return}let ze=h.target?.closest?.(".worker-sort");if(ze){ot(ze.value);return}let St=h.target?.closest?.(".worker-slots__input");if(!St)return;let Qt=Number.parseInt(St.value,10);if(!Number.isFinite(Qt)){$();return}It(Qt).then($)}function Sr(h){return h?{runner:h.runner||void 0,model:h.model||void 0,effort:h.effort||void 0,worktree:h.worktree||void 0,status:h.status||void 0,session_id:h.session_id||void 0}:{}}function kn(){let h=xt($t()),g=xe().workspace_info,E=g&&typeof g=="object"&&g.repo_ops&&typeof g.repo_ops=="object"?g.repo_ops:null;return{operations:h.repo_operations,cleanup_failures:h.cleanup_failures,repo:l&&l()||"",repo_ops:E}}function Er(){qe&&Fe.close(),J.hidden=!1,Xe.hidden=!1,Ve.open(kn()),$()}function Kr(h){let g=xe(),E=g.attempts?g.attempts[h]:null;qe=h,Ve.close(),J.hidden=!0,Xe.hidden=!1,Fe.open({attempt_id:h,meta:Sr(E)}),$()}function la(h){let g=xe(),E=(Array.isArray(g.session_active)?g.session_active:[]).find(pe=>pe&&pe.bead_id===h),ie=(E&&Array.isArray(E.session_refs)?E.session_refs:[]).find(pe=>pe&&pe.current===!0);ie&&(Ve.close(),J.hidden=!0,Xe.hidden=!1,Fe.open(io(ie,h,"in_progress")),$())}function ca(){if(Ve.isOpen()&&Ve.refresh(kn()),!qe)return;let h=xe(),g=h.attempts?h.attempts[qe]:null;if(g){Fe.updateMeta(Sr(g));return}Fe.close()}function As(h,g){if(h.length===0||!s)return;let E=l?l():void 0;if(g.length===0||!E||g===E||!a){s(h);return}Promise.resolve(a(g)).then(()=>{s(h)}).catch(()=>{me("\uB808\uD3EC \uC804\uD658\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error",2400)})}function Ss(h){let g=h.target;if(g?.closest?.(".provider-resume-dialog__cancel")){Je();return}if(g?.closest?.(".provider-resume-dialog__confirm")){A();return}if(g?.closest?.(".provider-resume-dialog")||g?.closest?.(".worker-mini__grip"))return;let E=g?.closest?.(".worker-sort-chain__dir");if(E){let Te=Number.parseInt(E.getAttribute("data-step")||"",10);Number.isFinite(Te)&&vt(i_(xs(I),Te));return}let ie=g?.closest?.(".worker-dep__open");if(ie){As(ie.getAttribute("data-dep-id")||"",ie.getAttribute("data-root-dir")||"");return}let pe=g?.closest?.(".judgement-chip");if(pe){let Te=pe.closest("[data-bead-id]"),ut=Te&&Te.getAttribute("data-bead-id")||"",Xt=pe.getAttribute("data-chip-key")||"";ut&&Xt&&te.toggle({bead_id:ut,chip_key:Xt});return}if(g?.closest?.(".chip-popover"))return;if(g?.closest?.(".worker-repo-strip")){Er();return}let Oe=g?.closest?.(".worker-repo-op__dismiss");if(Oe){it(Oe.dataset.operationId||"");return}let ze=g?.closest?.(".worker-cleanup__resume");if(ze){let Te=ze.dataset.beadId;Te&&Ct(Te);return}let St=g?.closest?.(".worker-cleanup__resolve");if(St){let Te=St.dataset.beadId;Te&&Mt(Te);return}if(g?.closest?.(".worker-hold__retry")){de("worker-queue-hold-retry-now","\uC9C0\uAE08 \uC7AC\uC2DC\uB3C4 \uAC70\uBD80");return}if(g?.closest?.(".worker-hold__resume")){de("worker-queue-hold-resume","\uC7AC\uAC1C \uAC70\uBD80");return}if(g?.closest?.(".worker-play")){le(!xe().auto_advance);return}let Qt=g?.closest?.(".worker-merge-all");if(Qt){Qt.classList.contains("worker-merge-all--stop")?xe().auto_merge===!0?rt(!1):je():rt(!0);return}let ct=g?.closest?.(".worker-pane__toggle[data-lane]");if(ct){let Te=ct.dataset.lane;(Te==="candidate"||Te==="queue"||Te==="running"||Te==="pr_wait"||Te==="done")&&at(Te);return}let sn=g?.closest?.(".worker-wait__area-toggle[data-area]");if(sn){let Te=sn.dataset.area;(Te==="parallel"||Te==="serial")&&S(Te);return}let cn=g?.closest?.(".worker-card__place-lane");if(cn){let Te=cn.dataset.beadId,ut=cn.dataset.lane;Te&&(ut==="parallel"||/^s[1-5]$/.test(ut||""))&&(y=null,$(),tt(Te,ut));return}if(g?.closest?.(".worker-card__place-cancel")){y=null,$();return}let _n=g?.closest?.(".worker-card__place");if(_n){let Te=_n.dataset.beadId;Te&&!_n.disabled&&(Go(xe())?(y=Te,$()):tt(Te,"parallel"));return}let dn=g?.closest?.(".worker-filter__chip");if(dn){let Te=dn.dataset.readiness;(Te==="all"||Te==="ready"||Te==="not_ready")&&Ne({...m,readiness:Te});return}let Rn=g?.closest?.('[data-action="queue-remove"]');if(Rn){let Te=Rn.dataset.beadId||"";Te&&_e.sendOp({type:"worker-queue-remove",payload:{bead_id:Te},root_dir:Ge()},Te);return}let Qn=g?.closest?.(".worker-mini__merge");if(Qn){let Te=Qn.dataset.beadId||"";xe().cleanup_failed?.[Te]?Ct(Te):Ft(Te);return}let an=g?.closest?.(".worker-mini__merge-cancel");if(an){et(an.dataset.beadId||"");return}let Xn=g?.closest?.(".worker-mini__resolve");if(Xn){Mt(Xn.dataset.beadId||"");return}let cr=g?.closest?.(".rtile__resolve");if(cr){let Te=cr.closest(".rtile");Mt(Te?.dataset.beadId||"");return}let In=g?.closest?.(".worker-mini__discard"),zn=g?.closest?.(".worker-mini__discard-abandon");if(zn){j(zn.dataset.beadId||"",zn.dataset.operationId||"",{kind:zn.dataset.operationKind||"",last_error:zn.dataset.lastError||""});return}if(In){x(In.dataset.beadId||"",In.dataset.attemptId||null,In.dataset.discardMode==="merged"?"merged":"unmerged",In.dataset.operationId||null);return}let Ye=g?.closest?.(".worker-mini__stale-continue");if(Ye){ae("worker-stale-work-continue",Ye.dataset.beadId||"",Ye.dataset.actionId||"");return}let Gt=g?.closest?.(".worker-mini__stale-backup");if(Gt){ae("worker-stale-work-backup-fresh",Gt.dataset.beadId||"",Gt.dataset.actionId||"");return}let xn=g?.closest?.(".worker-mini__stale-recheck");if(xn){ae("worker-stale-work-recheck",xn.dataset.beadId||"",xn.dataset.actionId||"");return}let nt=g?.closest?.(".worker-mini__revise-fix");if(nt){ge("worker-revise-fix",nt.dataset.beadId||"");return}let w=g?.closest?.(".worker-mini__revise-approve");if(w){ge("worker-revise-approve",w.dataset.beadId||"");return}if(g?.closest?.(".worker-mini__pr"))return;let D=g?.closest?.(".rtile__failure-badge");if(D){let Te=D.dataset.attemptId||"";C=C===Te?null:Te,$();return}let K=g?.closest?.(".rtile__provider-hold-badge");if(K){let Te=K.dataset.attemptId||"";R=R===Te?null:Te,$();return}let $e=g?.closest?.(".rtile__attempt-copy");if($e){let Te=$e.dataset.attemptId||"";Te&&gn(Te).then(ut=>{me(ut?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",ut?"success":"error",1400)});return}if(g?.closest?.(".rtile__parked-retry")){let Te=g?.closest?.(".rtile");ke(Te?.dataset?.beadId||"",Te?.dataset?.attemptId||"");return}let We=g?.closest?.(".rtile__discard-abandon");if(We){let ut=g?.closest?.(".rtile")?.dataset?.beadId;ut&&j(ut,We.dataset.operationId||"",{kind:We.dataset.operationKind||"",last_error:We.dataset.lastError||""});return}let lt=g?.closest?.(".rtile__discard");if(lt){let Te=g?.closest?.(".rtile"),ut=Te?.dataset?.beadId,Xt=Te?.dataset?.attemptId;ut&&x(ut,Xt||null,lt.dataset.confirmation==="merged"?"merged":"unmerged",lt.dataset.operationId||null);return}if(g?.closest?.(".rtile__pause")){let ut=g?.closest?.(".rtile")?.dataset?.attemptId;ut&&Ut(ut);return}if(g?.closest?.(".rtile__resume-alternate")){let ut=g?.closest?.(".rtile")?.dataset?.attemptId;ut&&Ke(ut);return}if(g?.closest?.(".rtile__resume")){let Te=g?.closest?.(".rtile__resume"),Xt=g?.closest?.(".rtile")?.dataset?.attemptId;Xt&&wt(Xt,Te?.dataset?.resumeKind==="settlement"?"settlement":"session");return}if(g?.closest?.(".rtile__session")){let Te=g?.closest?.(".rtile"),ut=Te?.dataset?.attemptId;if(ut){Kr(ut);return}let Xt=Te?.dataset?.beadId;Xt&&la(Xt);return}if(g?.closest?.(".rtile__failure-pop"))return;if(g?.closest?.(".worker-drawer-overlay__backdrop")){Ve.close(),Fe.close();return}if(g?.closest?.(".worker-drawer-host"))return;let Bt=g?.closest?.(".rtile .board-card__roll-toggle");if(Bt){let Te=Bt.dataset.rollParent;Te&&(O.has(Te)?O.delete(Te):O.add(Te),$());return}let Qe=g?.closest?.(".rtile .board-card__roll-child");if(Qe){let Te=Qe.dataset.childId;Te&&s&&s(Te);return}let Et=g?.closest?.(".rtile");if(Et){if(g?.closest?.(".rtile__id")){let ut=Et.dataset.beadId;ut&&gn(ut).then(Xt=>{Xt?me("\uBCF5\uC0AC\uB428","success",1200):me("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}let Te=Et.dataset.beadId;Te&&s&&s(Te);return}let An=g?.closest?.(".worker-mini, .worker-card");if(An){let Te=An.dataset.beadId;if(g?.closest?.('[data-seam="log-path-copy"]'))return;if(g?.closest?.(".worker-mini__id, .worker-card__id")){Te&&gn(Te).then(Xt=>{Xt?me("\uBCF5\uC0AC\uB428","success",1200):me("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}let ut=g?.closest?.(".ctl-chip--from");if(ut){let Xt=ut.dataset.fromId;Xt&&s&&s(Xt);return}Te&&s&&s(Te)}}function ua(h){let g=h.target;g?.closest?.(".worker-search")&&(z=g.value,$())}function da(h){let g=h.target;h.key!=="Escape"||!g?.closest?.(".worker-search")||z.length===0||(z="",$())}_e.attach(e),e.addEventListener("click",Ss),e.addEventListener("change",en),e.addEventListener("input",ua),e.addEventListener("keydown",da);function Gr(h){let g=h.target,E=g&&typeof g.closest=="function"?pe=>g.closest(pe):()=>null,ie=!1;C&&!E(".rtile__failure-pop, .rtile__failure-badge")&&(C=null,ie=!0),R&&!E(".rtile__provider-hold-pop, .rtile__provider-hold-badge")&&(R=null,ie=!0),ie&&$()}function Yr(h){h.key==="Escape"&&(C===null&&R===null&&V===null||(C=null,R=null,V=null,$()))}return document.addEventListener("click",Gr),document.addEventListener("keydown",Yr),te.attach(),be.push(()=>{document.removeEventListener("click",Gr),document.removeEventListener("keydown",Yr),te.detach()}),Le(),_&&be.push(_.subscribe(()=>{ve.notifyIssuesChanged(),$()})),o&&be.push(o.subscribe(()=>{let h=l&&l()||"";h!==ee&&(ee=h,He.close()),$(),ca()})),$(),{load(){ve.ensureSessionDefaults(),$()},refreshSessionDefaults:Pe,destroy(){for(let h of be.splice(0))try{h()}catch{}_e.detach(),e.removeEventListener("click",Ss),e.removeEventListener("change",en),ve.destroy();try{Fe.destroy()}catch{}Xe.hidden=!0;try{He.destroy()}catch{}pt(c``,e)}}}function ec(e){if(!e)return"Unknown";let t=e.split("/").filter(Boolean);return t.length>0?t[t.length-1]:"Unknown"}function C_(e,t,n,r=async()=>{},o=async()=>{}){let i=Ht("views:workspace-picker"),s=null,l=!1,a=!1,u=!1;async function d(L){let Y=L.target.value,N=t.getState().workspace?.current?.path||"";if(Y&&Y!==N){i("switching workspace to %s",Y),l=!0,I();try{await n(Y)}catch(z){i("workspace switch failed: %o",z)}finally{l=!1,I()}}}async function p(){let L=t.getState(),U=L.workspace?.current?.path||L.workspace?.available?.[0]?.path||"";if(!(!U||a)){i("git-pulling workspace %s",U),a=!0,I();try{await r(U)}catch(Y){i("workspace git pull failed: %o",Y)}finally{a=!1,I()}}}function _(L){let U=L.target;U&&e.contains(U)||C()}function m(L){L.key==="Escape"&&C()}function y(){u||(u=!0,document.addEventListener("mousedown",_),document.addEventListener("keydown",m),I())}function C(){u&&(u=!1,document.removeEventListener("mousedown",_),document.removeEventListener("keydown",m),I())}function R(){u?C():y()}async function V(L){let U=L.target,Y=U.value,q=U.checked;i("toggling visibility %s \u2192 %s",Y,String(q));try{await o(Y,q)}catch(N){i("workspace visibility toggle failed: %o",N)}}function te(L){return L?c`
      <button
        type="button"
        class="workspace-picker__git-pull-button"
        @click=${p}
        ?disabled=${l||a}
        aria-label="Git Pull"
        title="Git Pull"
      >
        <span aria-hidden="true">⬇</span>
      </button>
    `:c``}function W(L,U){return c`
      <div class="workspace-picker__manage">
        <button
          type="button"
          class="workspace-picker__manage-button"
          @click=${R}
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
                ${L.map(Y=>c`
                    <label
                      class="workspace-picker__manage-row"
                      title="${Y.path}"
                    >
                      <input
                        type="checkbox"
                        class="workspace-picker__manage-checkbox"
                        value="${Y.path}"
                        .checked=${!U.has(Y.path)}
                        @change=${V}
                      />
                      <span class="workspace-picker__manage-name"
                        >${ec(Y.path)}</span
                      >
                    </label>
                  `)}
              </div>
            `:""}
      </div>
    `}function M(){let L=t.getState(),U=L.workspace?.current,Y=L.workspace?.available||[],q=new Set(L.workspace?.hidden||[]),N=U?.path||Y[0]?.path||"";if(Y.length===0)return c``;let z=Y.filter(G=>!q.has(G.path)||G.path===N);if(z.length<=1){let G=z[0]||Y[0],oe=ec(G.path);return c`
        <div class="workspace-picker workspace-picker--single">
          <span class="workspace-picker__label" title="${G.path}"
            >${oe}</span
          >
          ${W(Y,q)}
          ${te(N)}
          ${a?c`<span
                class="workspace-picker__loading"
                aria-hidden="true"
              ></span>`:""}
        </div>
      `}return c`
      <div class="workspace-picker">
        <select
          class="workspace-picker__select"
          @change=${d}
          ?disabled=${l||a}
          aria-label="Select project workspace"
        >
          ${z.map(G=>c`
              <option
                value="${G.path}"
                ?selected=${G.path===N}
                title="${G.path}"
              >
                ${ec(G.path)}
              </option>
            `)}
        </select>
        ${W(Y,q)}
        ${te(N)}
        ${l||a?c`<span
              class="workspace-picker__loading"
              aria-hidden="true"
            ></span>`:""}
      </div>
    `}function I(){pt(M(),e)}return I(),s=t.subscribe(()=>I()),{destroy(){s&&(s(),s=null),document.removeEventListener("mousedown",_),document.removeEventListener("keydown",m),pt(c``,e)}}}var O_=["update-status","edit-text","update-priority","create-issue","dep-add","dep-remove","update-assignee","update-exec-settings","update-impl-target","get-session-defaults","set-session-defaults","get-workspace-accounts","set-workspace-accounts","update-workflow-meta","label-add","label-remove","subscribe-list","unsubscribe-list","snapshot","upsert","delete","get-comments","add-comment","delete-issue","list-workspaces","set-workspace","set-workspace-visibility","get-workspace","workspace-changed","git-pull-workspace","subscribe-worker-queue","unsubscribe-worker-queue","worker-queue-snapshot","worker-queue-place","worker-queue-reorder","worker-queue-toggle","worker-automation-toggle","worker-provider-auto-switch-toggle","worker-repo-ops-opt-out-toggle","worker-repo-operation-dismiss","worker-repo-operation-deploy-run","worker-queue-set-slots","worker-queue-set-serial-lane-count","worker-queue-set-orchestration-defaults","worker-queue-remove","worker-attempt-pause","worker-attempt-stop","worker-attempt-resume","worker-cleanup-retry","worker-resolve-in-session","worker-parked-retry","worker-queue-hold-resume","worker-queue-hold-retry-now","worker-merge-queue-add","worker-merge-queue-add-all","worker-merge-auto-toggle","worker-merge-queue-remove","worker-discard","worker-discard-abandon","worker-stale-work-continue","worker-stale-work-backup-fresh","worker-stale-work-recheck","worker-pr-discard","worker-revise-fix","worker-revise-approve","subscribe-ui-order","unsubscribe-ui-order","ui-order-set","ui-order-snapshot","subscribe-display-policy","unsubscribe-display-policy","display-policy-set","display-policy-snapshot","subscribe-session-log","unsubscribe-session-log","session-log-snapshot","session-log-append","get-attempt-prompt","get-bead-prompt","get-bead-timeline","get-worker-system-prompt","get-session-refs","subscribe-monitor-pipeline","unsubscribe-monitor-pipeline","monitor-pipeline-snapshot","subscribe-impl-presets","unsubscribe-impl-presets","impl-presets-snapshot","impl-preset-create","impl-preset-update","impl-preset-delete","apply-impl-preset","apply-impl-preset-global","monitor-auto-toggle","monitor-lane-create","monitor-lane-update","monitor-lane-confirm","monitor-lane-remove"];function tc(){let e=Date.now().toString(36),t=Math.random().toString(36).slice(2,8);return`${e}-${t}`}function R_(e,t,n=tc()){return{id:n,type:e,payload:t}}function I_(e={}){let t=Ht("ws"),n={initialMs:e.backoff?.initialMs??1e3,maxMs:e.backoff?.maxMs??3e4,factor:e.backoff?.factor??2,jitterRatio:e.backoff?.jitterRatio??.2},r=()=>e.url&&e.url.length>0?e.url:typeof location<"u"?(location.protocol==="https:"?"wss://":"ws://")+location.host+"/ws":"ws://localhost/ws",o=null,i="closed",s=0,l=null,a=!0,u=new Map,d=[],p=new Map,_=new Set;function m(M){for(let I of Array.from(_))try{I(M)}catch{}}function y(){if(!a||l)return;i="reconnecting",t("ws reconnecting\u2026"),m(i);let M=Math.min(n.maxMs||0,(n.initialMs||0)*Math.pow(n.factor||1,s)),I=(n.jitterRatio||0)*M,L=Math.max(0,Math.round(M+(Math.random()*2-1)*I));t("ws retry in %d ms (attempt %d)",L,s+1),l=setTimeout(()=>{l=null,W()},L)}function C(M){try{o?.send(JSON.stringify(M))}catch(I){t("ws send failed",I)}}function R(){for(i="open",t("ws open"),m(i),s=0;d.length;){let M=d.shift();M&&C(M)}}function V(M){let I;try{I=JSON.parse(String(M.data))}catch{t("ws received non-JSON message");return}if(!I||typeof I.id!="string"||typeof I.type!="string"){t("ws received invalid envelope");return}if(u.has(I.id)){let U=u.get(I.id);u.delete(I.id),I.ok?U?.resolve(I.payload):U?.reject(I.error||new Error("ws error"));return}let L=p.get(I.type);if(L&&L.size>0)for(let U of Array.from(L))try{U(I.payload)}catch(Y){t("ws event handler error",Y)}else t("ws received unhandled message type: %s",I.type)}function te(){i="closed",t("ws closed"),m(i);for(let[M,I]of u.entries())I.reject(new Error("ws disconnected")),u.delete(M);s+=1,y()}function W(){if(!a)return;let M=r();try{o=new WebSocket(M),t("ws connecting %s",M),i="connecting",m(i),o.addEventListener("open",R),o.addEventListener("message",V),o.addEventListener("error",()=>{}),o.addEventListener("close",te)}catch(I){t("ws connect failed %o",I),y()}}return W(),{send(M,I){if(!O_.includes(M))return Promise.reject(new Error(`unknown message type: ${M}`));let L=tc(),U=R_(M,I,L);return t("send %s id=%s",M,L),new Promise((Y,q)=>{u.set(L,{resolve:Y,reject:q,type:M}),o&&o.readyState===o.OPEN?C(U):(t("queue %s id=%s (state=%s)",M,L,i),d.push(U))})},on(M,I){p.has(M)||p.set(M,new Set);let L=p.get(M);return L?.add(I),()=>{L?.delete(I)}},onConnection(M){return _.add(M),()=>{_.delete(M)}},reconnect(){a=!0,l&&(clearTimeout(l),l=null),s=0,W()},close(){a=!1,l&&(clearTimeout(l),l=null);try{o?.close()}catch{}},getState(){return i}}}function iw(){let e=window.__BDUI_BOOTSTRAP__;return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:null}}}async function aw(e,t){try{let r=await(await fetch("/api/config")).json();e.setState({config:r})}catch(n){t("config refresh failed",n)}}var nc=[["tab:board:ready","ready-issues"],["tab:board:blocked","blocked-issues"],["tab:board:in-progress","in-progress-issues"],["tab:board:resolved","resolved-issues"],["tab:board:deferred","deferred-issues"],["tab:board:closed","closed-issues"]],L_=[["tab:worker:ready","ready-issues"],["tab:worker:blocked","blocked-issues"],["tab:worker:in-progress","in-progress-issues"],["tab:worker:resolved","resolved-issues"],["tab:worker:closed","closed-issues"]],xr="tab:worker:closed",lw="bdui.worker.done-range",D_=If,P_="worker:queue",M_="ui:order",q_="ui:display-policy",N_="exec:presets",Ar="tab:board:closed",j_="beads-ui.board.closed-range";function cw(e){if(!e)return()=>{};function t(r){document.documentElement.style.setProperty("--app-header-h",`${Math.round(r)}px`)}if(t(e.getBoundingClientRect().height),typeof ResizeObserver!="function")return()=>{};let n=new ResizeObserver(r=>{for(let o of r)t(o.contentRect.height+uw(e))});return n.observe(e),()=>n.disconnect()}function uw(e){let t=getComputedStyle(e);return[t.paddingTop,t.paddingBottom,t.borderTopWidth,t.borderBottomWidth].reduce((r,o)=>r+(parseFloat(o)||0),0)}function dw(e){let t=Ht("main");t("bootstrap start"),cw(document.querySelector(".app-header"));let n=c`
    <section id="board-root" class="route board"></section>
    <section id="worker-root" class="route worker" hidden></section>
    <section id="monitor-root" class="route monitor" hidden></section>
    <section id="detail-panel" class="route detail" hidden></section>
  `;pt(n,e);let r=document.getElementById("global-nav"),o=document.getElementById("top-nav"),i=document.getElementById("repo-scope"),s=document.getElementById("usage-meter"),l=document.getElementById("board-root"),a=document.getElementById("worker-root"),u=document.getElementById("monitor-root"),d=document.getElementById("detail-panel");if(s&&Zf(s),l&&a&&u&&d){let be=function(S,$){let Le="Request failed",Ne="";if(S&&typeof S=="object"){let vt=S;if(typeof vt.message=="string"&&vt.message.length>0&&(Le=vt.message),typeof vt.details=="string")Ne=vt.details;else if(vt.details&&typeof vt.details=="object")try{Ne=JSON.stringify(vt.details,null,2)}catch{Ne=""}}else typeof S=="string"&&S.length>0&&(Le=S);let ot=$&&$.length>0?`Failed to load ${$}`:"Request failed";se.open(ot,Le,Ne)},xe=function(S){return`${we.getState().workspace.current?.path||""}\0${S}`},mt=function(){Se&&(Se().catch(()=>{}),Se=null),_e=null,qe=null},Ke=function(S){Fe=S;let $=()=>{Fe!==S||we.getState().selected_id!==S||(Fe=null,ft(S))};if(!ee){He.then($);return}$()},Ie=function(S,$,Le,Ne,ot){return Le!==Z[$]?(ot().catch(()=>{}),!1):(S.set(Ne,ot),!0)},tt=function(){let S=we.getState();bt(S.view==="board"),Ue(S.view==="worker"),ae(j(S)),et(S.view==="board"||S.view==="worker"||Ge||!!S.selected_id)},Ut=function(){let S=Lr(Ce);return S===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:S}}},wt=function(){let S=Lr(Ze);return S===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:S}}},bt=function(S){if(S)for(let[$,Le]of nc){if(Je.has($)||A.has($))continue;let Ne=$===Ar?Ut():{type:Le};try{Re.register($,Ne)}catch(Nt){t("register %s store failed: %o",$,Nt)}A.add($);let ot=Z.board,vt=!1;he.subscribeList($,Ne).then(Nt=>{vt=!Ie(Je,"board",ot,$,Nt)}).catch(Nt=>{t("subscribe %s failed: %o",$,Nt),be(Nt,"board")}).finally(()=>{A.delete($),vt&&tt()})}else Mt()},Mt=function(){Z.board+=1;for(let[S]of nc){let $=Je.get(S);$&&($().catch(()=>{}),Je.delete(S));try{Re.unregister(S)}catch(Le){t("unregister %s failed: %o",S,Le)}}},Ue=function(S){if(!S){rt();return}for(let[$,Le]of L_){if(de.has($)||A.has($))continue;let Ne=$===xr?wt():{type:Le};try{Re.register($,Ne)}catch(Nt){t("register %s store failed: %o",$,Nt)}A.add($);let ot=Z.worker,vt=!1;he.subscribeList($,Ne).then(Nt=>{vt=!Ie(de,"worker",ot,$,Nt)}).catch(Nt=>{t("subscribe %s failed: %o",$,Nt),be(Nt,"worker")}).finally(()=>{A.delete($),vt&&tt()})}},rt=function(){Z.worker+=1;for(let[S]of L_){let $=de.get(S);$&&($().catch(()=>{}),de.delete(S));try{Re.unregister(S)}catch(Le){t("unregister %s failed: %o",S,Le)}}},et=function(S){if(!S){je();return}ke||(Pe("subscribe-worker-queue",{id:P_}).catch($=>{t("subscribe-worker-queue failed: %o",$)}),ke=()=>Pe("unsubscribe-worker-queue",{id:P_}))},je=function(){ke&&(ke().catch(()=>{}),ke=null)},j=function(S){return S.view==="monitor"||S.selected_id!=null},ae=function(S){if(!S){ge();return}x||(Pe("subscribe-monitor-pipeline",{id:D_}).catch($=>{t("subscribe-monitor-pipeline failed: %o",$)}),x=()=>Pe("unsubscribe-monitor-pipeline",{id:D_}))},ge=function(){x&&(x().catch(()=>{}),x=null)},it=function(){le||(Pe("subscribe-ui-order",{id:M_}).catch(S=>{t("subscribe-ui-order failed: %o",S)}),le=()=>Pe("unsubscribe-ui-order",{id:M_}))},It=function(){le&&(le().catch(()=>{}),le=null),H.clear()},$t=function(){yt||(Pe("subscribe-display-policy",{id:q_}).catch(S=>{t("subscribe-display-policy failed: %o",S)}),yt=()=>Pe("unsubscribe-display-policy",{id:q_}))},xt=function(){yt&&(yt().catch(()=>{}),yt=null),J.clear()},qt=function(){Lt||(Pe("subscribe-impl-presets",{id:N_}).catch(S=>{t("subscribe-impl-presets failed: %o",S)}),Lt=()=>Pe("unsubscribe-impl-presets",{id:N_}))},zt=function(S){if(!S)return"Unknown";let $=S.split("/").filter(Boolean);return $.length>0?$[$.length-1]:"Unknown"},B=function(S,$){k.open(S.path,{missing_state:S.missing_state,...$?{workspace:$}:{}})};var p=be,_=xe,m=mt,y=Ke,C=Ie,R=tt,V=Ut,te=wt,W=bt,M=Mt,I=Ue,L=rt,U=et,Y=je,q=j,N=ae,z=ge,G=it,oe=It,ye=$t,Me=xt,F=qt,X=zt,Ae=B;let Ee=document.getElementById("header-loading"),O=Hc(Ee),se=tf(e),ve=I_(),Pe=O.wrapSend((S,$)=>ve.send(S,$)),he=Nc(Pe),Re=jc(),Xe=Bc(),dt=hc(),H=Fc(),J=mc(),re=gc(),fe=bc();ve.on("impl-presets-snapshot",S=>{let $=S;$&&typeof $.revision=="number"&&Array.isArray($.presets)&&re.set({revision:$.revision,presets:$.presets})}),ve.on("monitor-pipeline-snapshot",S=>{let $=S;if(!(!$||!Array.isArray($.workspaces)))try{dt.set($.workspaces,$.workspaces_state,$.cross_lanes)}catch{}}),ve.on("ui-order-snapshot",S=>{let $=S;if($&&typeof $.revision=="number")try{H.set({revision:$.revision,order:$.order&&typeof $.order=="object"?$.order:{}})}catch{}}),ve.on("display-policy-snapshot",S=>{let $=S;if($&&$.policy&&typeof $.policy=="object")try{J.set($.policy)}catch{}}),ve.on("session-log-snapshot",S=>{let $=S;if($&&typeof $.id=="string")try{fe.set($.id,Array.isArray($.lines)?$.lines:[],typeof $.last_event_at=="number"?$.last_event_at:null)}catch{}}),ve.on("session-log-append",S=>{let $=S;if($&&typeof $.id=="string")try{fe.append($.id,$.event)}catch{}}),ve.on("snapshot",S=>{let $=S,Le=$&&typeof $.id=="string"?$.id:"",Ne=Le?Re.getStore(Le):null;if(Ne&&$&&$.type==="snapshot")try{Ne.applyPush($)}catch{}}),ve.on("upsert",S=>{let $=S,Le=$&&typeof $.id=="string"?$.id:"",Ne=Le?Re.getStore(Le):null;if(Ne&&$&&$.type==="upsert")try{Ne.applyPush($)}catch{}}),ve.on("delete",S=>{let $=S,Le=$&&typeof $.id=="string"?$.id:"",Ne=Le?Re.getStore(Le):null;if(Ne&&$&&$.type==="delete")try{Ne.applyPush($)}catch{}});let Se=null,_e=null,qe=null,Fe=null,Ve=()=>{},He=new Promise(S=>{Ve=()=>S(void 0)}),ee=!1,Q=!1;async function ft(S){let $=xe(S);if($===_e||$===qe)return;qe=$;let Le=`detail:${S}`,Ne={type:"issue-detail",params:{id:S}};try{Re.register(Le,Ne)}catch(ot){t("register detail store failed: %o",ot)}try{let ot=await he.subscribeList(Le,Ne);if(we.getState().selected_id!==S||xe(S)!==$){await ot().catch(()=>{});return}Se&&await Se().catch(()=>{}),Se=ot,_e=$}catch(ot){t("detail subscribe failed: %o",ot),be(ot,"issue details")}finally{qe===$&&(qe=null)}}let Je=new Map,A=new Set,Z={board:0,worker:0},Ge=!1,Ce=Ls;try{let S=window.localStorage.getItem(j_);ya(S)&&(Ce=S)}catch{}let Ze="today";try{let S=window.localStorage.getItem(lw);S!==null&&(Ze=Hn(S))}catch{}async function Ft(S){if(!ya(S)||S===Ce)return;Ce=S;try{window.localStorage.setItem(j_,S)}catch{}let $=Je.get(Ar);if(!$)return;Je.delete(Ar),await $().catch(()=>{});let Le=Ut();try{Re.register(Ar,Le)}catch(Ne){t("register %s store failed: %o",Ar,Ne)}try{let Ne=await he.subscribeList(Ar,Le);Je.set(Ar,Ne)}catch(Ne){t("re-subscribe %s failed: %o",Ar,Ne),be(Ne,"board")}}async function Ct(S){let $=Hn(S);if($===Ze)return;Ze=$;let Le=de.get(xr);if(!Le)return;de.delete(xr),await Le().catch(()=>{});let Ne=wt();try{Re.register(xr,Ne)}catch(ot){t("register %s store failed: %o",xr,ot)}try{let ot=await he.subscribeList(xr,Ne);de.set(xr,ot)}catch(ot){t("re-subscribe %s failed: %o",xr,ot),be(ot,"worker")}}let de=new Map,ke=null,x=null,le=null,yt=null,Lt=null;async function Dt(){yt=null,J.clear(),Lt=null,re.clear(),ke=null,x=null,Je.clear(),de.clear(),Z.board+=1,Z.worker+=1,qt();let S=we.getState().workspace.current?.path;if(S)try{await ve.send("set-workspace",{path:S})}catch(Le){t("workspace restore after reconnect failed: %o",Le);return}$t();let $=we.getState();bt($.view==="board"),Ue($.view==="worker"),ae(j($)),et($.view==="board"||$.view==="worker"||!!$.selected_id)}async function Jt(){t("clearing all subscriptions for workspace switch"),Mt(),rt(),je(),Xe.clear(),It(),it(),xt(),$t(),mt();let S=we.getState();if(S.selected_id)try{Re.unregister(`detail:${S.selected_id}`)}catch{}let $=we.getState();bt($.view==="board"),Ue($.view==="worker"),ae(j($)),et($.view==="board"||$.view==="worker"||!!$.selected_id),$.selected_id&&Ke($.selected_id)}async function Vt(S){t("requesting workspace switch to %s",S),Q=!0;try{let $=await ve.send("set-workspace",{path:S});t("workspace switch result: %o",$),$&&$.workspace&&(we.setState({workspace:{current:{path:$.workspace.root_dir,database:$.workspace.db_path}}}),window.localStorage.setItem("beads-ui.workspace",S),$.changed&&(await Jt(),me("Switched to "+zt(S),"success",2e3)))}catch($){throw t("workspace switch failed: %o",$),me("Failed to switch workspace","error",3e3),$}finally{Q=!1}}async function At(S){t("requesting workspace git pull for %s",S);try{let $=await ve.send("git-pull-workspace",{});t("workspace git pull result: %o",$);let Le=$?.status;if(Le==="up_to_date"){me("Already up to date","success",2e3);return}if(Le==="stash_pop_conflict"){me("Git pulled, but stash pop conflicted (check git stash list)","warning",4e3);return}me("Git pulled "+zt(S),"success",2e3)}catch($){t("workspace git pull failed: %o",$);let Le=$?.code,Ne=$?.message;if(Le==="rebase_conflict"){me("Git pull conflicts \u2014 reverted (manual resolve required)","error",4e3);return}if(Le==="rebase_conflict_abort_failed"){me("Git pull conflicts AND rebase --abort failed \u2014 repo left mid-rebase, run 'git rebase --abort' manually","error",6e3);return}if(Le==="busy"){me("Git pull skipped: another operation is running","warning",3e3);return}let ot=Ne?`: ${Ne}`:"";throw me(`Git pull failed${ot}`,"error",3e3),$}}async function Wt(S,$){t("setting workspace visibility %s \u2192 %s",S,String($));try{await ve.send("set-workspace-visibility",{path:S,visible:$}),await on()}catch(Le){t("workspace visibility update failed: %o",Le),me("Failed to update project visibility","error",3e3)}}async function on(){try{let S=await ve.send("list-workspaces",{});if(t("workspaces loaded: %o",S),S&&Array.isArray(S.workspaces)){let $=S.workspaces.map(vt=>({path:vt.path,database:vt.database,pid:vt.pid,version:vt.version})),Le=S.current?{path:S.current.root_dir,database:S.current.db_path}:null,Ne=Array.isArray(S.hidden)?S.hidden.filter(vt=>typeof vt=="string"):[];we.setState({workspace:{current:Le,available:$,hidden:Ne}});let ot=window.localStorage.getItem("beads-ui.workspace");ot&&(!$.some(Nt=>Nt.path===ot)||Ne.includes(ot)?window.localStorage.removeItem("beads-ui.workspace"):Le&&ot!==Le.path&&(t("restoring saved workspace preference: %s",ot),await Vt(ot)))}}catch(S){t("failed to load workspaces: %o",S)}}ve.on("workspace-changed",S=>{t("workspace-changed event: %o",S),S&&S.root_dir&&(we.setState({workspace:{current:{path:S.root_dir,database:S.db_path}}}),on(),Jt())});let Kt=!1;if(typeof ve.onConnection=="function"){let S=$=>{t("ws state %s",$),$==="reconnecting"||$==="closed"?(Kt=!0,me("Connection lost. Reconnecting\u2026","error",4e3)):$==="open"&&Kt&&(Kt=!1,me("Reconnected","success",2200),aw(we,(Le,Ne)=>{t(`${Le}: %o`,Ne)}),Dt())};ve.onConnection(S)}let ln="board";try{let S=window.localStorage.getItem("beads-ui.view");(S==="board"||S==="worker"||S==="monitor")&&(ln=S)}catch(S){t("view parse error: %o",S)}let we=zc({config:iw(),view:ln});ve.on("worker-queue-snapshot",S=>{let $=S;if(!$||!$.queue)return;let Le=we.getState().workspace.current?.path;if(typeof Le=="string"&&Le.length>0&&$.root_dir!==Le){t("dropping worker-queue snapshot for %s",String($.root_dir));return}try{Xe.set($.queue)}catch{}});let T=Uc(we);T.start();let ne=new Set(["get-comments","dep-add","dep-remove","impl-preset-create","impl-preset-update","impl-preset-delete","apply-impl-preset","apply-impl-preset-global","get-session-defaults","set-session-defaults","monitor-lane-create","monitor-lane-update","monitor-lane-confirm","monitor-lane-remove"]),De=async(S,$)=>{try{return await Pe(S,$)}catch(Le){if(ne.has(S))throw Le;return[]}};Df({global_element:r,repo_element:o},we,T);let b=document.getElementById("workspace-picker");b&&C_(b,we,Vt,At,Wt);let v=Nf(e,(S,$)=>Pe(S,$));try{let S=document.getElementById("new-issue-btn");S&&S.addEventListener("click",()=>v.open())}catch{}let P=Uf(e,{policyStore:J,queueStore:Xe,implPresetStore:re,transport:(S,$)=>Pe(S,$),onOpenChange:S=>{let $=Ge;Ge=S,tt(),$&&S===!1&&ue.refreshSessionDefaults()},labelOptions:()=>{let S=new Set;for(let[$]of nc)for(let Le of Re.snapshotFor($)||[]){let Ne=Le.labels;if(Array.isArray(Ne))for(let ot of Ne)typeof ot=="string"&&ot.length>0&&S.add(ot)}return Array.from(S).sort()}});try{let S=document.getElementById("display-settings-btn");S&&(S.setAttribute("aria-label","\uC124\uC815"),S.setAttribute("title","\uC124\uC815"),S.addEventListener("click",()=>P.open()))}catch{}let f=document.createElement("div");f.className="md-viewer-root",document.body.appendChild(f);let k=Vi(f,{getWorkspacePath:()=>we.getState().workspace.current?.path}),ce=au(l,{gotoIssue:S=>T.gotoIssue(S),issueStores:Re,transport:De,workerQueueStore:Xe,uiOrderStore:H,displayPolicyStore:J,closedRange:Ce,onClosedRangeChange:S=>{Ft(S)},onNewIssue:()=>v.open(),openDoc:B}),ue=Jl(a,{transport:De,issueStores:Re,queueStore:Xe,sessionLogStore:fe,gotoIssue:S=>we.setState({selected_id:S}),getWorkspacePath:()=>we.getState().workspace.current?.path,switchWorkspace:S=>Vt(S),openDoc:B,doneRange:Ze,onDoneRangeChange:S=>{Ct(S)}}),Be=Lf(u,{transport:De,pipelineStore:dt,execPresetStore:re,sessionLogStore:fe,router:T,gotoIssue:S=>T.gotoIssue(S),getWorkspacePath:()=>we.getState().workspace.current?.path,switchWorkspace:S=>Vt(S),openDoc:B}),_t=ef(d,{issueStores:Re,transport:De,queueStore:Xe,execPresetStore:re,sessionLogStore:fe,getWorkspacePath:()=>we.getState().workspace.current?.path,mdViewer:k,depCandidates:()=>{let S=dt.get();if(S===null)return null;let $=dt.getWorkspacesState(),Le=we.getState();if(Le.view==="monitor")return dl(S,$);let Ne=Le.workspace.current?.path;return Ne?dl(S,$,{root_dir:Ne}):null},subscribeCandidates:S=>dt.subscribe(S),onDepChanged:({type:S,a:$,b:Le})=>{let Ne=Be;S==="dep-add"&&Ne&&typeof Ne.recorrectSharedLane=="function"&&Ne.recorrectSharedLane(S,$,Le)},onNavigate:(S,$)=>{let Le=()=>{we.getState().view==="worker"?we.setState({selected_id:S}):T.gotoIssue(S)},Ne=we.getState().workspace.current?.path;if(typeof $!="string"||$.length===0||!Ne||$===Ne){Le();return}Promise.resolve(Vt($)).then(Le).catch(()=>{me("\uB808\uD3EC \uC804\uD658\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error",2400)})},onClose:()=>{let S=we.getState();we.setState({selected_id:null});try{T.gotoView(S.view==="worker"||S.view==="monitor"?S.view:"board")}catch{}},onOpenExecPresets:()=>{P.open("execution")}}),gt=we.getState().selected_id;gt&&(d.hidden=!1,_t.load(gt),Ke(gt)),we.subscribe(S=>{let $=S.selected_id;$?(d.hidden=!1,_t.load($),Q||Ke($)):(_t.clear(),d.hidden=!0,mt())});let at=S=>{l.hidden=S.view!=="board",a.hidden=S.view!=="worker",u.hidden=S.view!=="monitor",i&&i.classList.toggle("is-quiet",S.view==="monitor"),bt(S.view==="board"),Ue(S.view==="worker"),ae(j(S)),et(S.view==="board"||S.view==="worker"||Ge||!!S.selected_id),!S.selected_id&&S.view==="board"&&ce.load(),S.view==="worker"&&ue.load(),S.view==="monitor"?Be.load():Be.pause(),window.localStorage.setItem("beads-ui.view",S.view)};we.subscribe(at),at(we.getState()),it(),$t(),qt(),on().finally(()=>{ee=!0,Ve()}),window.addEventListener("keydown",S=>{let $=S.ctrlKey||S.metaKey,Le=String(S.key||"").toLowerCase(),Ne=S.target,ot=Ne&&Ne.tagName?String(Ne.tagName).toLowerCase():"",vt=ot==="input"||ot==="textarea"||ot==="select"||Ne&&typeof Ne.isContentEditable=="boolean"&&Ne.isContentEditable;$&&Le==="n"&&(vt||(S.preventDefault(),v.open()))})}}typeof window<"u"&&typeof document<"u"&&window.addEventListener("DOMContentLoaded",()=>{try{let n=window.localStorage.getItem("beads-ui.theme"),r=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches,o=n==="dark"||n==="light"?n:r?"dark":"light";document.documentElement.setAttribute("data-theme",o);let i=document.getElementById("theme-switch");i&&(i.checked=o==="dark")}catch{}let e=document.getElementById("theme-switch");e&&e.addEventListener("change",()=>{let n=e.checked?"dark":"light";document.documentElement.setAttribute("data-theme",n),window.localStorage.setItem("beads-ui.theme",n)});let t=document.getElementById("app");t&&dw(t)});export{dw as bootstrap,iw as readBootstrapConfig,aw as refreshConfigSnapshot};
//# sourceMappingURL=main.bundle.js.map
