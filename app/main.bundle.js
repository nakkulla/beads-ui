var F_=Object.create;var fa=Object.defineProperty;var B_=Object.getOwnPropertyDescriptor;var U_=Object.getOwnPropertyNames;var W_=Object.getPrototypeOf,z_=Object.prototype.hasOwnProperty;var H_=(e,t,n)=>t in e?fa(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var _a=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var K_=(e,t,n,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let o of U_(t))!z_.call(e,o)&&o!==n&&fa(e,o,{get:()=>t[o],enumerable:!(r=B_(t,o))||r.enumerable});return e};var G_=(e,t,n)=>(n=e!=null?F_(W_(e)):{},K_(t||!e||!e.__esModule?fa(n,"default",{value:e,enumerable:!0}):n,e));var Ft=(e,t,n)=>H_(e,typeof t!="symbol"?t+"":t,n);var vc=_a((vw,yc)=>{var Xr=1e3,Zr=Xr*60,Jr=Zr*60,Dr=Jr*24,Q_=Dr*7,X_=Dr*365.25;yc.exports=function(e,t){t=t||{};var n=typeof e;if(n==="string"&&e.length>0)return Z_(e);if(n==="number"&&isFinite(e))return t.long?em(e):J_(e);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(e))};function Z_(e){if(e=String(e),!(e.length>100)){var t=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(e);if(t){var n=parseFloat(t[1]),r=(t[2]||"ms").toLowerCase();switch(r){case"years":case"year":case"yrs":case"yr":case"y":return n*X_;case"weeks":case"week":case"w":return n*Q_;case"days":case"day":case"d":return n*Dr;case"hours":case"hour":case"hrs":case"hr":case"h":return n*Jr;case"minutes":case"minute":case"mins":case"min":case"m":return n*Zr;case"seconds":case"second":case"secs":case"sec":case"s":return n*Xr;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return n;default:return}}}}function J_(e){var t=Math.abs(e);return t>=Dr?Math.round(e/Dr)+"d":t>=Jr?Math.round(e/Jr)+"h":t>=Zr?Math.round(e/Zr)+"m":t>=Xr?Math.round(e/Xr)+"s":e+"ms"}function em(e){var t=Math.abs(e);return t>=Dr?Ps(e,t,Dr,"day"):t>=Jr?Ps(e,t,Jr,"hour"):t>=Zr?Ps(e,t,Zr,"minute"):t>=Xr?Ps(e,t,Xr,"second"):e+" ms"}function Ps(e,t,n,r){var o=t>=n*1.5;return Math.round(e/n)+" "+r+(o?"s":"")}});var wc=_a((kw,kc)=>{function tm(e){n.debug=n,n.default=n,n.coerce=a,n.disable=s,n.enable=o,n.enabled=l,n.humanize=vc(),n.destroy=u,Object.keys(e).forEach(d=>{n[d]=e[d]}),n.names=[],n.skips=[],n.formatters={};function t(d){let p=0;for(let _=0;_<d.length;_++)p=(p<<5)-p+d.charCodeAt(_),p|=0;return n.colors[Math.abs(p)%n.colors.length]}n.selectColor=t;function n(d){let p,_=null,m,v;function O(...R){if(!O.enabled)return;let Q=O,ee=Number(new Date),K=ee-(p||ee);Q.diff=K,Q.prev=p,Q.curr=ee,p=ee,R[0]=n.coerce(R[0]),typeof R[0]!="string"&&R.unshift("%O");let L=0;R[0]=R[0].replace(/%([a-zA-Z%])/g,(P,F)=>{if(P==="%%")return"%";L++;let G=n.formatters[F];if(typeof G=="function"){let q=R[L];P=G.call(Q,q),R.splice(L,1),L--}return P}),n.formatArgs.call(Q,R),(Q.log||n.log).apply(Q,R)}return O.namespace=d,O.useColors=n.useColors(),O.color=n.selectColor(d),O.extend=r,O.destroy=n.destroy,Object.defineProperty(O,"enabled",{enumerable:!0,configurable:!1,get:()=>_!==null?_:(m!==n.namespaces&&(m=n.namespaces,v=n.enabled(d)),v),set:R=>{_=R}}),typeof n.init=="function"&&n.init(O),O}function r(d,p){let _=n(this.namespace+(typeof p>"u"?":":p)+d);return _.log=this.log,_}function o(d){n.save(d),n.namespaces=d,n.names=[],n.skips=[];let p=(typeof d=="string"?d:"").trim().replace(/\s+/g,",").split(",").filter(Boolean);for(let _ of p)_[0]==="-"?n.skips.push(_.slice(1)):n.names.push(_)}function i(d,p){let _=0,m=0,v=-1,O=0;for(;_<d.length;)if(m<p.length&&(p[m]===d[_]||p[m]==="*"))p[m]==="*"?(v=m,O=_,m++):(_++,m++);else if(v!==-1)m=v+1,O++,_=O;else return!1;for(;m<p.length&&p[m]==="*";)m++;return m===p.length}function s(){let d=[...n.names,...n.skips.map(p=>"-"+p)].join(",");return n.enable(""),d}function l(d){for(let p of n.skips)if(i(d,p))return!1;for(let p of n.names)if(i(d,p))return!0;return!1}function a(d){return d instanceof Error?d.stack||d.message:d}function u(){console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")}return n.enable(n.load()),n}kc.exports=tm});var $c=_a((wn,Ms)=>{wn.formatArgs=rm;wn.save=om;wn.load=sm;wn.useColors=nm;wn.storage=im();wn.destroy=(()=>{let e=!1;return()=>{e||(e=!0,console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."))}})();wn.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"];function nm(){if(typeof window<"u"&&window.process&&(window.process.type==="renderer"||window.process.__nwjs))return!0;if(typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))return!1;let e;return typeof document<"u"&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||typeof window<"u"&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||typeof navigator<"u"&&navigator.userAgent&&(e=navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/))&&parseInt(e[1],10)>=31||typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)}function rm(e){if(e[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+e[0]+(this.useColors?"%c ":" ")+"+"+Ms.exports.humanize(this.diff),!this.useColors)return;let t="color: "+this.color;e.splice(1,0,t,"color: inherit");let n=0,r=0;e[0].replace(/%[a-zA-Z%]/g,o=>{o!=="%%"&&(n++,o==="%c"&&(r=n))}),e.splice(r,0,t)}wn.log=console.debug||console.log||(()=>{});function om(e){try{e?wn.storage.setItem("debug",e):wn.storage.removeItem("debug")}catch{}}function sm(){let e;try{e=wn.storage.getItem("debug")||wn.storage.getItem("DEBUG")}catch{}return!e&&typeof process<"u"&&"env"in process&&(e=process.env.DEBUG),e}function im(){try{return localStorage}catch{}}Ms.exports=wc()(wn);var{formatters:am}=Ms.exports;am.j=function(e){try{return JSON.stringify(e)}catch(t){return"[UnexpectedJSONParseError]: "+t.message}}});var Eo=globalThis,Ts=Eo.trustedTypes,rc=Ts?Ts.createPolicy("lit-html",{createHTML:e=>e}):void 0,ga="$lit$",Zn=`lit$${Math.random().toFixed(9).slice(2)}$`,ha="?"+Zn,Y_=`<${ha}>`,Or=document,To=()=>Or.createComment(""),Co=e=>e===null||typeof e!="object"&&typeof e!="function",ba=Array.isArray,cc=e=>ba(e)||typeof e?.[Symbol.iterator]=="function",ma=`[ 	
\f\r]`,So=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,oc=/-->/g,sc=/>/g,Tr=RegExp(`>|${ma}(?:([^\\s"'>=/]+)(${ma}*=${ma}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),ic=/'/g,ac=/"/g,uc=/^(?:script|style|textarea|title)$/i,ya=e=>(t,...n)=>({_$litType$:e,strings:t,values:n}),c=ya(1),Ro=ya(2),fw=ya(3),Tn=Symbol.for("lit-noChange"),Vt=Symbol.for("lit-nothing"),lc=new WeakMap,Cr=Or.createTreeWalker(Or,129);function dc(e,t){if(!ba(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return rc!==void 0?rc.createHTML(t):t}var pc=(e,t)=>{let n=e.length-1,r=[],o,i=t===2?"<svg>":t===3?"<math>":"",s=So;for(let l=0;l<n;l++){let a=e[l],u,d,p=-1,_=0;for(;_<a.length&&(s.lastIndex=_,d=s.exec(a),d!==null);)_=s.lastIndex,s===So?d[1]==="!--"?s=oc:d[1]!==void 0?s=sc:d[2]!==void 0?(uc.test(d[2])&&(o=RegExp("</"+d[2],"g")),s=Tr):d[3]!==void 0&&(s=Tr):s===Tr?d[0]===">"?(s=o??So,p=-1):d[1]===void 0?p=-2:(p=s.lastIndex-d[2].length,u=d[1],s=d[3]===void 0?Tr:d[3]==='"'?ac:ic):s===ac||s===ic?s=Tr:s===oc||s===sc?s=So:(s=Tr,o=void 0);let m=s===Tr&&e[l+1].startsWith("/>")?" ":"";i+=s===So?a+Y_:p>=0?(r.push(u),a.slice(0,p)+ga+a.slice(p)+Zn+m):a+Zn+(p===-2?l:m)}return[dc(e,i+(e[n]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),r]},Oo=class e{constructor({strings:t,_$litType$:n},r){let o;this.parts=[];let i=0,s=0,l=t.length-1,a=this.parts,[u,d]=pc(t,n);if(this.el=e.createElement(u,r),Cr.currentNode=this.el.content,n===2||n===3){let p=this.el.content.firstChild;p.replaceWith(...p.childNodes)}for(;(o=Cr.nextNode())!==null&&a.length<l;){if(o.nodeType===1){if(o.hasAttributes())for(let p of o.getAttributeNames())if(p.endsWith(ga)){let _=d[s++],m=o.getAttribute(p).split(Zn),v=/([.?@])?(.*)/.exec(_);a.push({type:1,index:i,name:v[2],strings:m,ctor:v[1]==="."?Os:v[1]==="?"?Rs:v[1]==="@"?Is:Ir}),o.removeAttribute(p)}else p.startsWith(Zn)&&(a.push({type:6,index:i}),o.removeAttribute(p));if(uc.test(o.tagName)){let p=o.textContent.split(Zn),_=p.length-1;if(_>0){o.textContent=Ts?Ts.emptyScript:"";for(let m=0;m<_;m++)o.append(p[m],To()),Cr.nextNode(),a.push({type:2,index:++i});o.append(p[_],To())}}}else if(o.nodeType===8)if(o.data===ha)a.push({type:2,index:i});else{let p=-1;for(;(p=o.data.indexOf(Zn,p+1))!==-1;)a.push({type:7,index:i}),p+=Zn.length-1}i++}}static createElement(t,n){let r=Or.createElement("template");return r.innerHTML=t,r}};function Rr(e,t,n=e,r){if(t===Tn)return t;let o=r!==void 0?n._$Co?.[r]:n._$Cl,i=Co(t)?void 0:t._$litDirective$;return o?.constructor!==i&&(o?._$AO?.(!1),i===void 0?o=void 0:(o=new i(e),o._$AT(e,n,r)),r!==void 0?(n._$Co??(n._$Co=[]))[r]=o:n._$Cl=o),o!==void 0&&(t=Rr(e,o._$AS(e,t.values),o,r)),t}var Cs=class{constructor(t,n){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=n}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:n},parts:r}=this._$AD,o=(t?.creationScope??Or).importNode(n,!0);Cr.currentNode=o;let i=Cr.nextNode(),s=0,l=0,a=r[0];for(;a!==void 0;){if(s===a.index){let u;a.type===2?u=new Vr(i,i.nextSibling,this,t):a.type===1?u=new a.ctor(i,a.name,a.strings,this,t):a.type===6&&(u=new Ls(i,this,t)),this._$AV.push(u),a=r[++l]}s!==a?.index&&(i=Cr.nextNode(),s++)}return Cr.currentNode=Or,o}p(t){let n=0;for(let r of this._$AV)r!==void 0&&(r.strings!==void 0?(r._$AI(t,r,n),n+=r.strings.length-2):r._$AI(t[n])),n++}},Vr=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,n,r,o){this.type=2,this._$AH=Vt,this._$AN=void 0,this._$AA=t,this._$AB=n,this._$AM=r,this.options=o,this._$Cv=o?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,n=this._$AM;return n!==void 0&&t?.nodeType===11&&(t=n.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,n=this){t=Rr(this,t,n),Co(t)?t===Vt||t==null||t===""?(this._$AH!==Vt&&this._$AR(),this._$AH=Vt):t!==this._$AH&&t!==Tn&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):cc(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==Vt&&Co(this._$AH)?this._$AA.nextSibling.data=t:this.T(Or.createTextNode(t)),this._$AH=t}$(t){let{values:n,_$litType$:r}=t,o=typeof r=="number"?this._$AC(t):(r.el===void 0&&(r.el=Oo.createElement(dc(r.h,r.h[0]),this.options)),r);if(this._$AH?._$AD===o)this._$AH.p(n);else{let i=new Cs(o,this),s=i.u(this.options);i.p(n),this.T(s),this._$AH=i}}_$AC(t){let n=lc.get(t.strings);return n===void 0&&lc.set(t.strings,n=new Oo(t)),n}k(t){ba(this._$AH)||(this._$AH=[],this._$AR());let n=this._$AH,r,o=0;for(let i of t)o===n.length?n.push(r=new e(this.O(To()),this.O(To()),this,this.options)):r=n[o],r._$AI(i),o++;o<n.length&&(this._$AR(r&&r._$AB.nextSibling,o),n.length=o)}_$AR(t=this._$AA.nextSibling,n){for(this._$AP?.(!1,!0,n);t!==this._$AB;){let r=t.nextSibling;t.remove(),t=r}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},Ir=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,n,r,o,i){this.type=1,this._$AH=Vt,this._$AN=void 0,this.element=t,this.name=n,this._$AM=o,this.options=i,r.length>2||r[0]!==""||r[1]!==""?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=Vt}_$AI(t,n=this,r,o){let i=this.strings,s=!1;if(i===void 0)t=Rr(this,t,n,0),s=!Co(t)||t!==this._$AH&&t!==Tn,s&&(this._$AH=t);else{let l=t,a,u;for(t=i[0],a=0;a<i.length-1;a++)u=Rr(this,l[r+a],n,a),u===Tn&&(u=this._$AH[a]),s||(s=!Co(u)||u!==this._$AH[a]),u===Vt?t=Vt:t!==Vt&&(t+=(u??"")+i[a+1]),this._$AH[a]=u}s&&!o&&this.j(t)}j(t){t===Vt?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},Os=class extends Ir{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===Vt?void 0:t}},Rs=class extends Ir{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==Vt)}},Is=class extends Ir{constructor(t,n,r,o,i){super(t,n,r,o,i),this.type=5}_$AI(t,n=this){if((t=Rr(this,t,n,0)??Vt)===Tn)return;let r=this._$AH,o=t===Vt&&r!==Vt||t.capture!==r.capture||t.once!==r.once||t.passive!==r.passive,i=t!==Vt&&(r===Vt||o);o&&this.element.removeEventListener(this.name,this,r),i&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},Ls=class{constructor(t,n,r){this.element=t,this.type=6,this._$AN=void 0,this._$AM=n,this.options=r}get _$AU(){return this._$AM._$AU}_$AI(t){Rr(this,t)}},fc={M:ga,P:Zn,A:ha,C:1,L:pc,R:Cs,D:cc,V:Rr,I:Vr,H:Ir,N:Rs,U:Is,B:Os,F:Ls},V_=Eo.litHtmlPolyfillSupport;V_?.(Oo,Vr),(Eo.litHtmlVersions??(Eo.litHtmlVersions=[])).push("3.3.1");var mt=(e,t,n)=>{let r=n?.renderBefore??t,o=r._$litPart$;if(o===void 0){let i=n?.renderBefore??null;r._$litPart$=o=new Vr(t.insertBefore(To(),i),i,void 0,n??{})}return o._$AI(e),o};var Ds="today",_c=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"},{value:"30d",label:"\uCD5C\uADFC 30\uC77C"},{value:"all",label:"\uC804\uCCB4"}],Qr=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"}];function Hn(e){return e==="today"?"today":"7d"}function va(e){return e==="today"||e==="7d"||e==="30d"||e==="all"}function Lr(e,t=Date.now()){switch(e){case"today":{let n=new Date(t);return n.setHours(0,0,0,0),n.getTime()}case"7d":return t-7*864e5;case"30d":return t-30*864e5;case"all":default:return}}function mc(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function gc(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function hc(){let e=null,t=[],n,r=new Set;function o(){for(let i of Array.from(r))try{i()}catch{}}return{get(){return e},getWorkspacesState(){return t},crossLanes(){return n},set(i,s,l){e=Array.isArray(i)?i:null,t=Array.isArray(s)?s:[],n=l===void 0?void 0:l!==null&&typeof l=="object"&&typeof l.revision=="number"&&Array.isArray(l.lanes)?{revision:l.revision,lanes:l.lanes}:null,o()},clear(){e=null,t=[],n=void 0,o()},subscribe(i){return r.add(i),()=>r.delete(i)}}}function bc(){let e=new Map,t=new Set;function n(o){return o.startsWith("session-log:")?o:`session-log:${o}`}function r(){for(let o of Array.from(t))try{o()}catch{}}return{set(o,i,s=null){e.set(n(o),{lines:Array.isArray(i)?[...i]:[],last_event_at:typeof s=="number"?s:null}),r()},append(o,i){let s=n(o),l=e.get(s)||{lines:[],last_event_at:null};l.lines=[...l.lines,i],l.last_event_at=Date.now(),e.set(s,l),r()},get(o){return e.get(n(o))||null},clear(o){typeof o=="string"?e.delete(n(o)):e.clear(),r()},subscribe(o){return t.add(o),()=>t.delete(o)}}}var xc=G_($c(),1);function Kt(e){return(0,xc.default)(`beads-ui:${e}`)}function lm(e){let n=Ac((e&&typeof e=="object"?e:{}).spec_id);return n?{path:n,source:"native",conflict:!1}:{path:"",source:"none",conflict:!1}}function Ac(e){return typeof e=="string"?e.trim():""}function cm(e){let t=e&&typeof e=="object"?e:{};return t.metadata&&typeof t.metadata=="object"?t.metadata:{}}var um=/^[A-Za-z0-9_.:-]+@[0-9a-fA-F]{40}$/;function eo(e){let t=lm(e),n=Ac(cm(e).spec_review),r=um.test(n),o=r&&n.slice(0,n.indexOf("@"))==="skipped";return t.source==="none"?{...t,evidence:"none",skipped:o}:{...t,evidence:r?"published":"draft",skipped:o}}function Ln(e){if(typeof e=="number")return Number.isFinite(e)?e:0;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:0}return 0}function Io(e,t){let n=Ln(e.created_at),r=Ln(t.created_at);if(n!==r)return n<r?1:-1;let o=e.priority??2,i=t.priority??2;if(o!==i)return o-i;let s=e.id,l=t.id;return s<l?-1:s>l?1:0}function Rc(e,t){let n=Ln(e.created_at),r=Ln(t.created_at);if(n!==r)return n<r?-1:1;let o=e.priority??2,i=t.priority??2;if(o!==i)return o-i;let s=e.id,l=t.id;return s<l?-1:s>l?1:0}function Ic(e,t){let n=Ln(e.updated_at),r=Ln(t.updated_at);if(n!==r)return n<r?1:-1;let o=e.id,i=t.id;return o<i?-1:o>i?1:0}function Lc(e,t){let n=e.priority??2,r=t.priority??2;if(n!==r)return n-r;let o=Ln(e.created_at),i=Ln(t.created_at);if(o!==i)return o<i?1:-1;let s=e.id,l=t.id;return s<l?-1:s>l?1:0}function Dc(e,t){let n=e.closed_at??0,r=t.closed_at??0;if(n!==r)return n<r?1:-1;let o=e?.id,i=t?.id;return o<i?-1:o>i?1:0}var qs=Object.freeze({priority:"asc",dependents:"desc",released:"desc",spec:"desc",created:"asc",updated:"desc"});function dm(e){return typeof e=="string"&&Object.prototype.hasOwnProperty.call(qs,e)}function wa(e){if(!e||typeof e!="object")return!1;let t=e;return dm(t.key)&&(t.dir==="asc"||t.dir==="desc")}function Sc(e){if(typeof e=="number")return Number.isFinite(e)?e:null;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:null}return null}function Ec(e,t){switch(t){case"priority":{let n=e.priority;return typeof n=="number"&&Number.isFinite(n)?n:null}case"dependents":{let n=e.dependents_info?e.dependents_info.count:null;return typeof n=="number"&&Number.isFinite(n)?n:null}case"released":{let n=e.release_info?e.release_info.last_released_at:null;return typeof n=="number"&&Number.isFinite(n)?n:null}case"spec":return eo(e).evidence==="published"?1:0;case"created":return Sc(e.created_at);case"updated":return Sc(e.updated_at);default:return null}}function Tc(e,t,n){let r=Ec(e,n.key),o=Ec(t,n.key);if(r===null||o===null)return r===o?0:r===null?1:-1;if(r===o)return 0;let i=r<o?-1:1;return n.dir==="desc"?-i:i}function Pc(e){let t=Array.isArray(e)?e.filter(wa):[];return(n,r)=>{for(let l of t){let a=Tc(n,r,l);if(a!==0)return a}let o=Tc(n,r,{key:"created",dir:"asc"});if(o!==0)return o;let i=n.id,s=r.id;return i<s?-1:i>s?1:0}}var pm=/^(?:[A-Za-z][A-Za-z0-9]*(?:-[A-Za-z0-9]+)+\s+)?(?:Task|Phase|T)\s*(\d+)/i;function Cc(e){let t=e&&e.metadata,n=t?t.task_order:void 0;if(n==null||n==="")return Number.POSITIVE_INFINITY;let r=Number(n);return Number.isFinite(r)?r:Number.POSITIVE_INFINITY}function Oc(e){let t=e&&e.title;if(typeof t!="string")return Number.POSITIVE_INFINITY;let n=pm.exec(t);if(!n)return Number.POSITIVE_INFINITY;let r=Number(n[1]);return Number.isFinite(r)?r:Number.POSITIVE_INFINITY}function Mc(e,t){let n=Cc(e),r=Cc(t);if(n!==r)return n<r?-1:1;let o=Oc(e),i=Oc(t);if(o!==i)return o<i?-1:1;let s=Ln(e&&e.created_at),l=Ln(t&&t.created_at);if(s!==l)return s<l?-1:1;let a=e&&e.id,u=t&&t.id;return a===u?0:String(a)<String(u)?-1:1}var ka=2**20;function to(e,t){let n=e&&e.id;return t&&typeof n=="string"&&Object.prototype.hasOwnProperty.call(t,n)&&typeof t[n]=="number"&&Number.isFinite(t[n])?t[n]:-Ln(e&&e.created_at)}function qc(e){return(t,n)=>{let r=to(t,e),o=to(n,e);if(r!==o)return r<o?-1:1;let i=t?.id,s=n?.id;return i<s?-1:i>s?1:0}}function $a(e,t,n){let r=Array.isArray(e)?e:[],o=r.length,i=Math.max(0,Math.min(t,o-1)),s=i-1>=0?r[i-1]:null,l=i+1<o?r[i+1]:null;if(!s&&!l)return{rank:0};if(!s)return{rank:to(l,n)-ka};if(!l)return{rank:to(s,n)+ka};let a=to(s,n),u=to(l,n),d=(a+u)/2;return a<d&&d<u?{rank:d}:{renormalize:r.map((p,_)=>({bead_id:p.id,rank:_*ka}))}}function xa(e,t={}){let n=Kt(`issue-store:${e}`),r=new Map,o=[],i=0,s=new Set,l=!1,a=t.sort||Io;function u(){for(let _ of Array.from(s))try{_()}catch{}}function d(){o=Array.from(r.values()).sort(a)}function p(_){if(l||!_||_.id!==e)return;let m=Number(_.revision)||0;if(n("apply %s rev=%d",_.type,m),!(m<=i&&_.type!=="snapshot")){if(_.type==="snapshot"){if(m<=i)return;r.clear();let v=Array.isArray(_.issues)?_.issues:[];for(let O of v)O&&typeof O.id=="string"&&O.id.length>0&&r.set(O.id,O);d(),i=m,u();return}if(_.type==="upsert"){let v=_.issue;if(v&&typeof v.id=="string"&&v.id.length>0){let O=r.get(v.id);if(!O)r.set(v.id,v);else{let R=Number.isFinite(O.updated_at)?O.updated_at:0,Q=Number.isFinite(v.updated_at)?v.updated_at:0;if(R<=Q){for(let ee of Object.keys(O))ee in v||delete O[ee];for(let[ee,K]of Object.entries(v))O[ee]=K}}d()}i=m,u()}else if(_.type==="delete"){let v=String(_.issue_id||"");v&&(r.delete(v),d()),i=m,u()}}}return{id:e,subscribe(_){return s.add(_),()=>{s.delete(_)}},applyPush:p,snapshot(){return o},size(){return r.size},getById(_){return r.get(_)},dispose(){l=!0,r.clear(),o=[],s.clear(),i=0}}}function Ns(e){let t=String(e.type||"").trim(),n={};if(e.params&&typeof e.params=="object"){let o=Object.keys(e.params).sort();for(let i of o){let s=e.params[i];n[i]=String(s)}}let r=new URLSearchParams(n).toString();return r.length>0?`${t}?${r}`:t}function Nc(e){let t=Kt("subs"),n=new Map,r=new Map;function o(l,a){t("applyDelta %s +%d ~%d -%d",l,(a.added||[]).length,(a.updated||[]).length,(a.removed||[]).length);let u=r.get(l);if(!u||u.size===0)return;let d=Array.isArray(a.added)?a.added:[],p=Array.isArray(a.updated)?a.updated:[],_=Array.isArray(a.removed)?a.removed:[];for(let m of Array.from(u)){let v=n.get(m);if(!v)continue;let O=v.itemsById;for(let R of d)typeof R=="string"&&R.length>0&&O.set(R,!0);for(let R of p)typeof R=="string"&&R.length>0&&O.set(R,!0);for(let R of _)typeof R=="string"&&R.length>0&&O.delete(R)}}async function i(l,a){let u=Ns(a);if(t("subscribe %s key=%s",l,u),!n.has(l))n.set(l,{key:u,itemsById:new Map});else{let p=n.get(l);if(p&&p.key!==u){let _=r.get(p.key);_&&(_.delete(l),_.size===0&&r.delete(p.key)),n.set(l,{key:u,itemsById:new Map})}}r.has(u)||r.set(u,new Set);let d=r.get(u);d&&d.add(l);try{await e("subscribe-list",{id:l,type:a.type,params:a.params})}catch(p){let _=n.get(l)||null;if(_){let m=r.get(_.key);m&&(m.delete(l),m.size===0&&r.delete(_.key))}throw n.delete(l),p}return async()=>{t("unsubscribe %s key=%s",l,u);try{await e("unsubscribe-list",{id:l})}catch{}let p=n.get(l)||null;if(p){let _=r.get(p.key);_&&(_.delete(l),_.size===0&&r.delete(p.key))}n.delete(l)}}return{subscribeList:i,_applyDelta:o,_subKeyOf:Ns,selectors:{getIds(l){let a=n.get(l);return a?Array.from(a.itemsById.keys()):[]},has(l,a){let u=n.get(l);return u?u.itemsById.has(a):!1},count(l){let a=n.get(l);return a?a.itemsById.size:0},getItemsById(l){let a=n.get(l),u={};if(!a)return u;for(let d of a.itemsById.keys())u[d]=!0;return u}}}}function jc(){let e=Kt("issue-stores"),t=new Map,n=new Map,r=new Set,o=new Map;function i(){for(let a of Array.from(r))try{a()}catch{}}function s(a,u,d){let p=u?Ns(u):"",_=n.get(a)||"",m=t.has(a);if(e("register %s key=%s (prev=%s)",a,p,_),m&&_&&p&&_!==p){let v=t.get(a);if(v)try{v.dispose()}catch{}let O=o.get(a);if(O){try{O()}catch{}o.delete(a)}let R=xa(a,d);t.set(a,R);let Q=R.subscribe(()=>i());o.set(a,Q)}else if(!m){let v=xa(a,d);t.set(a,v);let O=v.subscribe(()=>i());o.set(a,O)}return n.set(a,p),()=>l(a)}function l(a){e("unregister %s",a),n.delete(a);let u=t.get(a);u&&(u.dispose(),t.delete(a));let d=o.get(a);if(d){try{d()}catch{}o.delete(a)}}return{register:s,unregister:l,getStore(a){return t.get(a)||null},snapshotFor(a){let u=t.get(a);return u?u.snapshot().slice():[]},subscribe(a){return r.add(a),()=>r.delete(a)}}}function Fc(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function Bc(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function Aa(e,t){return`#/${e==="worker"||e==="monitor"?e:"board"}?issue=${encodeURIComponent(t)}`}function fm(e){let t=String(e||""),n=t.startsWith("#")?t.slice(1):t,r=n.indexOf("?"),o=r>=0?n.slice(r+1):"";if(o){let l=new URLSearchParams(o).get("issue");if(l)return decodeURIComponent(l)}let i=/^\/issue\/([^\s?#]+)/.exec(n);return i&&i[1]?decodeURIComponent(i[1]):null}function _m(e){let t=String(e||"");return/^#\/worker(\b|\/|$)/.test(t)?"worker":/^#\/monitor(\b|\/|$)/.test(t)?"monitor":"board"}function Uc(e){let t=Kt("router"),n=()=>{let r=window.location.hash||"",o=/^#\/issue\/([^\s?#]+)/.exec(r),i=o&&o[1]?decodeURIComponent(o[1]):fm(r),s=_m(r);if(t("hash change \u2192 view=%s id=%s",s,i),e.setState({selected_id:s==="worker"?null:i,view:s,worker:{selected_parent_id:s==="worker"?i:null}}),!!o||/^#\/(issues|epics)(\b|\/|\?|$)/.test(r)){let a=i?`#/${s}?issue=${encodeURIComponent(i)}`:`#/${s}`;window.location.hash!==a&&(window.location.hash=a)}};return{start(){window.addEventListener("hashchange",n),n()},stop(){window.removeEventListener("hashchange",n)},gotoIssue(r){let o=e.getState?e.getState():{view:"board"},i=o.view==="worker"||o.view==="monitor"?o.view:"board",s=Aa(i,r);t("goto issue %s (view=%s)",r,i),window.location.hash!==s?window.location.hash=s:e.setState({selected_id:i==="worker"?null:r,view:i,worker:{selected_parent_id:i==="worker"?r:null}})},gotoView(r){let o=e.getState?e.getState():{selected_id:null,worker:{selected_parent_id:null}},i=r==="worker"?o.worker?.selected_parent_id:o.selected_id,s=i?Aa(r,i):`#/${r}`;t("goto view %s (id=%s)",r,i||""),window.location.hash!==s?window.location.hash=s:e.setState({view:r,selected_id:r==="worker"?null:o.selected_id})}}}var mm=Object.freeze({workspace_config:{default_workspace:null}});function Wc(e){return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:mm.workspace_config.default_workspace}}}function zc(e={}){let t=Kt("state"),n={selected_id:e.selected_id??null,view:e.view??"board",filters:{status:e.filters?.status??"all",search:e.filters?.search??"",type:typeof e.filters?.type=="string"?e.filters?.type:""},board:{closed_filter:e.board?.closed_filter==="3"||e.board?.closed_filter==="7"||e.board?.closed_filter==="today"?e.board?.closed_filter:"today"},worker:{selected_parent_id:e.worker?.selected_parent_id??null,show_closed_children:Array.isArray(e.worker?.show_closed_children)?e.worker.show_closed_children:[]},workspace:{current:e.workspace?.current??null,available:e.workspace?.available??[],hidden:e.workspace?.hidden??[]},config:Wc(e.config)},r=new Set;function o(){for(let i of Array.from(r))try{i(n)}catch{}}return{getState(){return n},setState(i){let s={...n,...i,filters:{...n.filters,...i.filters||{}},board:{...n.board,...i.board||{}},worker:{...n.worker,...i.worker||{}},workspace:{current:i.workspace?.current!==void 0?i.workspace.current:n.workspace.current,available:i.workspace?.available!==void 0?i.workspace.available:n.workspace.available,hidden:i.workspace?.hidden!==void 0?i.workspace.hidden:n.workspace.hidden},config:i.config!==void 0?Wc(i.config):n.config},l=s.workspace.current?.path!==n.workspace.current?.path||s.workspace.available.length!==n.workspace.available.length||s.workspace.hidden.length!==n.workspace.hidden.length||s.workspace.hidden.some((u,d)=>u!==n.workspace.hidden[d]),a=s.config.workspace_config.default_workspace!==n.config.workspace_config.default_workspace;s.selected_id===n.selected_id&&s.view===n.view&&s.filters.status===n.filters.status&&s.filters.search===n.filters.search&&s.filters.type===n.filters.type&&s.board.closed_filter===n.board.closed_filter&&s.worker.selected_parent_id===n.worker.selected_parent_id&&s.worker.show_closed_children.length===n.worker.show_closed_children.length&&s.worker.show_closed_children.every((u,d)=>u===n.worker.show_closed_children[d])&&!l&&!a||(n=s,t("state change %o",{selected_id:n.selected_id,view:n.view,filters:n.filters,board:n.board,worker:n.worker,workspace:n.workspace.current?.path,config:{default_workspace:n.config.workspace_config.default_workspace}}),o())},subscribe(i){return r.add(i),()=>r.delete(i)}}}function Hc(e){let t=Kt("activity"),n=0,r=new Map,o=1;function i(){if(!e)return;let u=n>0;e.toggleAttribute("hidden",!u),e.setAttribute("aria-busy",u?"true":"false")}function s(){n+=1,t("start count=%d",n),i()}function l(){let u=n;n=Math.max(0,n-1),u<=0?t("done called but count was already %d",u):t("done count=%d\u2192%d",u,n),i()}function a(u){return async(p,_)=>{let m=o++,v=Date.now();r.set(m,{type:p,start_ts:v}),t("request start id=%d type=%s count=%d",m,p,n+1),s();let O=!1,R=()=>{O||(O=!0,r.delete(m),l())},Q=setTimeout(()=>{O||(t("request TIMEOUT id=%d type=%s elapsed=%dms",m,p,Date.now()-v),R())},3e4);try{let ee=await u(p,_),K=Date.now()-v;return t("request done id=%d type=%s elapsed=%dms",m,p,K),ee}catch(ee){let K=Date.now()-v;throw t("request error id=%d type=%s elapsed=%dms err=%o",m,p,K,ee),ee}finally{clearTimeout(Q),R()}}}return i(),{wrapSend:a,start:s,done:l,getCount:()=>n,getActiveRequests:()=>{let u=Date.now();return Array.from(r.entries()).map(([d,p])=>({id:d,type:p.type,elapsed_ms:u-p.start_ts}))}}}function _e(e,t="info",n=2800){let r=document.createElement("div");r.className="toast",r.textContent=e,r.style.position="fixed",r.style.right="12px",r.style.bottom="12px",r.style.zIndex="1000",r.style.color="#fff",r.style.padding="8px 10px",r.style.borderRadius="4px",r.style.fontSize="12px",t==="success"?r.style.background="#156d36":t==="warning"?r.style.background="#a36a00":t==="error"?r.style.background="#9f2011":r.style.background="rgba(0,0,0,0.85)",(document.body||document.documentElement).appendChild(r),setTimeout(()=>{try{r.remove()}catch{}},n)}function no(e=void 0,t=void 0){function n(){if(!t||typeof t.get!="function")return null;let i=t.get();return i&&i.order?i.order:{}}function r(i,s,l){let a=e&&e.snapshotFor?e.snapshotFor(i).slice():[];if(s==="closed")return a.sort(Dc),a;switch(l){case"created_desc":return a.sort(Io),a;case"created_asc":return a.sort(Rc),a;case"updated_desc":return a.sort(Ic),a;case"priority":return a.sort(Lc),a;case"manual":default:{let u=n();return u?a.sort(qc(u)):a.sort(Io),a}}}function o(i){let s=[];return e&&typeof e.subscribe=="function"&&s.push(e.subscribe(i)),t&&typeof t.subscribe=="function"&&s.push(t.subscribe(i)),()=>{for(let l of s)try{l()}catch{}}}return{selectBoardColumn:r,subscribe:o}}function ur(e){if(!e)return null;if(typeof e=="number")return Number.isFinite(e)?e:null;let t=Date.parse(e);return Number.isFinite(t)?t:null}function on(e){let t=ur(e);if(t===null)return"";let n=new Date(t),r=o=>String(o).padStart(2,"0");return`${n.getFullYear()}-${r(n.getMonth()+1)}-${r(n.getDate())} ${r(n.getHours())}:${r(n.getMinutes())}`}function mn(e,t){let n=ur(e);if(n===null)return"";let o=(typeof t=="number"?t:Date.now())-n;if(o<6e4)return"\uBC29\uAE08";let i=Math.floor(o/6e4);if(i<60)return`${i}\uBD84 \uC804`;let s=Math.floor(o/36e5);if(s<24)return`${s}\uC2DC\uAC04 \uC804`;let l=Math.floor(o/864e5);if(l<7)return`${l}\uC77C \uC804`;let a=Math.floor(l/7);if(l<30)return`${a}\uC8FC \uC804`;let u=Math.floor(l/30);return u<12?`${u}\uAC1C\uC6D4 \uC804`:`${Math.floor(l/365)}\uB144 \uC804`}function Kc(e){if(!Array.isArray(e))return null;let t=null,n=-1;for(let r of e){if(!r||r.status!=="in_progress")continue;let o=ur(r.updated_at)??0;if(t===null||o>n){t=r,n=o;continue}o===n&&String(r.id)<String(t.id)&&(t=r)}return t}function js(e){let t=e&&e.parent;return typeof t=="string"?t:t&&t.id?String(t.id):""}function Fs(e){let t=new Map;for(let r of e)r&&r.id&&!t.has(r.id)&&t.set(r.id,r);let n=new Map;for(let r of t.values()){let o=js(r);if(!o)continue;let i=n.get(o);i||(i=[],n.set(o,i)),i.push({id:r.id,title:r.title,status:r.status,metadata:r.metadata,workflow:r.workflow,created_at:r.created_at,updated_at:r.updated_at})}return n}function Bs(e,t){let n=e.get(t)||[],r=0;for(let i of n)(i.status==="resolved"||i.status==="closed")&&(r+=1);let o=Kc(n);return{total:n.length,count:r,current:o,children:n}}function Gc(e){let t=e.transport,n=e.uiOrderStore;function r(s,l){return"renormalize"in s?s.renormalize:[{bead_id:l,rank:s.rank}]}function o(s,l){let a={...s.order};for(let u of l)a[u.bead_id]=u.rank;n&&n.set({revision:s.revision,order:a})}async function i(s,l,a){if(!t||!n)return;let u=n.get()||{revision:0,order:{}},d=r($a(l,a,u.order),s);o(u,d);let p=await t("ui-order-set",{expected_revision:u.revision,entries:d});if(p&&p.conflict){let _={revision:typeof p.revision=="number"?p.revision:0,order:p.order||{}};n.set(_);let m=r($a(l,a,_.order),s);o(_,m);let v=await t("ui-order-set",{expected_revision:_.revision,entries:m});v&&v.applied&&n.set({revision:typeof v.revision=="number"?v.revision:0,order:v.order||{}})}else p&&p.applied&&n.set({revision:typeof p.revision=="number"?p.revision:0,order:p.order||{}})}return{applyReorder:i}}function Yc(e){if(typeof e!="string")return"";let t=e.indexOf("-");return t>0?e.slice(0,t):""}function Jn(e,t){let n=Yc(e),r=Yc(t);return n.length===0||r.length===0?!1:n!==r}function Us(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function Sa(e,t){return!t||typeof e!="string"||e.length===0||Us(t.visible_labels).includes(e)?!0:Us(t.hidden_labels).includes(e)?!1:!Us(t.hidden_prefixes).some(n=>n.length>0&&e.startsWith(n))}function Vc(e,t){return Us(e).filter(n=>Sa(n,t))}function dr(e,t){let n=e&&e.chips?e.chips[t]:void 0;return typeof n=="boolean"?n:!0}function gm(e){switch(e){case"in_progress":return"board-card__dot board-card__dot--progress";case"resolved":return"board-card__dot board-card__dot--resolved";case"closed":return"board-card__dot board-card__dot--closed";case"blocked":return"board-card__dot board-card__dot--blocked";default:return"board-card__dot"}}function hm(e,t,n,r,o){return c`<button
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
  </button>`}function Ws(e,t){let n=e.total||0,r=!!t.expanded,o=t.trailing??"",i=typeof t.empty_label=="string"&&t.empty_label.length>0?t.empty_label:null;if(n===0&&i===null)return"";let s=Array.isArray(e.children)?e.children:[],l=n>0?s.slice().sort(Mc):s;return c`
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
      @click=${v=>{v.preventDefault(),v.stopPropagation(),r(v,_,e)}}
    >
      <div class=${a} style=${d}>${l}</div>
      <div class=${u}>${p}</div>
    </button>
  `}function Jc(e){let t=e?e.doc:null;return!t||typeof t.path!="string"||t.path.length===0?null:t}function zs(e,t,n={}){if(!e||!e.stages)return"";let r=n.onOpenDoc,o=Qc[e.route]||Qc.spec_backed,i=e.stages,s=km(o,i,String(t||"open")),l=`\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uC9C4\uD589: ${o.map(u=>`${Xc[u]||u} ${u==="plan"?wm(i[u]||{}):Zc(i[u]||{})}`).join(" \xB7 ")}`,a=!!r&&o.some(u=>Jc(i[u]||{})!==null);return c`
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
  >`}function Ea(e){return e==="delegated"?"\uC704\uC784":e==="main"?"\uBA54\uC778":null}function Hs(e){return e.effort?`${e.actor}:${e.effort}`:e.actor}function er(e){return`${e.kind}:${Hs(e)}@${e.sha}`}function Ks(e,t){if(!e)return null;let n=Ea(e.kind),r=e.reason,o=e.kind==="delegated"?r===null:typeof r=="string"&&r.trim().length>0&&!/[\r\n]/.test(r);if(!n||!o)return null;let i=Ea(t?.kind),s=i!==null&&t?.kind!==e.kind,l=`\uACC4\uD68D \xB7 ${n}${s?` \u2192 ${i}`:""}`,a=`planned_execution ${e.kind}${typeof r=="string"?`:${r}`:""}`,u=t?` \xB7 exec_receipt ${er(t)}`:"";return{kind:e.kind,label:l,title:`${a}${u}`}}function nu(e,t){let n=Ks(e,t);return n?c`<span
        class="ctl-chip ctl-chip--planned"
        data-kind=${n.kind}
        title=${n.title}
        >${n.label}</span
      >`:null}function Em(e){if(!e)return null;let t=Ea(e.kind);return t?c`<span
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
        >${`exec ${l.kind==="delegated"?Hs(l):`main:${l.actor}`} \xB7 ${l.sha.slice(0,7)}`}</span
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
          title=${`\uC0DD\uC131 ${on(e.created_at)}`}
          >생성 ${t}</span
        >`:""}
    ${t&&n?c`<span class="board-card__time-sep">·</span>`:""}
    ${n?c`<span
          class="board-card__time"
          title=${`\uC218\uC815 ${on(e.updated_at)}`}
          >수정 ${n}</span
        >`:""}
  </span>`}function Om(e,t){let n=t.rollupFor?t.rollupFor(e.id):{total:0,count:0,current:null,children:[]};return Ws(n,{parent_id:e.id,expanded:t.isExpanded?t.isExpanded(e.id):!0,trailing:Cm(e),empty_label:"children \uC5C6\uC74C",childChips:Ta,onToggle:r=>t.onRollupToggle&&t.onRollupToggle(r,e.id),onChildClick:(r,o)=>t.onChildClick&&t.onChildClick(r,o)})}function Ta(e){let t=e?.workflow?.chips?.planned_execution,n=e?.workflow?.chips?.exec_receipt;return Ks(t,n)?c`<span class="board-card__roll-child-chips">
    ${nu(t,n)}
    ${Em(n)}
  </span>`:null}function Gs(e,t){let n=xm(e.priority);return c`
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
      ${e.workflow&&dr(t.policy||null,"stepper")?zs(e.workflow,e.status,{onOpenDoc:t.onOpenDoc}):""}
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
        ${e.items.map(i=>Gs(i,t))}
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
          ${e.items.length===0?c`<div class="deferred-popup__empty">Deferred 이슈 없음</div>`:e.items.map(r=>Gs(r,t))}
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
  `}var Pm=200,Mm={"ready-col":"open","in-progress-col":"in_progress","resolved-col":"resolved","closed-col":"closed"},qm=new Set(["blocked-col","ready-col","in-progress-col","resolved-col"]),su="beads-ui.board.sort",iu=new Set(["created_desc","created_asc","updated_desc","priority","manual"]);function Nm(){try{let e=window.localStorage.getItem(su);if(e&&iu.has(e))return e}catch{}return"created_desc"}function au(e,t){let n=Kt("views:board"),r=t.gotoIssue,o=t.issueStores,i=t.transport,s=t.uiOrderStore,l=t.displayPolicyStore,a=t.workerQueueStore,u=t.onClosedRangeChange,d=t.onNewIssue,p=t.openDoc,_=t.closedRange||Ds,m=o?no(o,s):null,v=Gc({transport:i,uiOrderStore:s}),O=[],R=[],Q=[],ee=[],K=[],L=[],I=!1,P=0,F=Nm(),G=new Map,q=new Map,N=new Map,H=new Set,W={search:"",priority:"",type:"",labels:[]},ne=!1,he=null;function qe(ue){return String(ue.status||"open")==="open"}function B(ue){return String(ue.status||"open")==="open"}function te(ue){let ke=W.search.trim().toLowerCase(),Ge=W.priority,rt=W.type,et=W.labels;return ue.filter(ht=>{if(ke){let je=String(ht.id||"").toLowerCase(),tt=String(ht.title||"").toLowerCase();if(!je.includes(ke)&&!tt.includes(ke))return!1}if(Ge!==""&&String(ht.priority)!==Ge||rt!==""&&String(ht.issue_type||"")!==rt)return!1;if(et.length>0){let je=Array.isArray(ht.labels)?ht.labels:[];if(!et.some(tt=>je.includes(tt)))return!1}return!0})}function me(){let ue=new Set;for(let ke of[O,R,Q,ee,K,L])for(let Ge of ke){let rt=Array.isArray(Ge.labels)?Ge.labels:[];for(let et of rt)typeof et=="string"&&et.length>0&&ue.add(et)}return Array.from(ue).sort()}function Te(){return W.search.trim()!==""||W.priority!==""||W.type!==""||W.labels.length>0}function C(){try{if(m){let ue=m.selectBoardColumn("tab:board:in-progress","in_progress",F),ke=m.selectBoardColumn("tab:board:blocked","blocked",F).filter(B),Ge=new Set(ue.map(j=>j.id)),rt=m.selectBoardColumn("tab:board:ready","ready",F).filter(j=>qe(j)&&!Ge.has(j.id)),et=m.selectBoardColumn("tab:board:resolved","resolved",F),ht=m.selectBoardColumn("tab:board:deferred","deferred",F),je=m.selectBoardColumn("tab:board:closed","closed").slice(0,Pm),tt=[...ke,...rt,...ue,...et,...je];se(tt);let Ne=new Set;for(let j of tt)j&&j.id&&!js(j)&&Ne.add(j.id);let S=!Te();O=S?Lo(ke,Ne):ke,R=S?Lo(rt,Ne):rt,Q=S?Lo(ue,Ne):ue,ee=S?Lo(et,Ne):et,K=ht,P=ht.length,L=S?Lo(je,Ne):je,G=new Map;for(let j of O)G.set(j.id,"open");for(let j of R)G.set(j.id,"open");for(let j of Q)G.set(j.id,"in_progress");for(let j of ee)G.set(j.id,"resolved");for(let j of K)G.set(j.id,"deferred");for(let j of L)G.set(j.id,"closed");q=new Map;for(let j of O)q.set(j.id,"blocked-col");for(let j of R)q.set(j.id,"ready-col");for(let j of Q)q.set(j.id,"in-progress-col");for(let j of ee)q.set(j.id,"resolved-col");for(let j of L)q.set(j.id,"closed-col")}Oe()}catch{O=[],R=[],Q=[],ee=[],K=[],L=[],N=new Map,Oe()}}function se(ue){N=Fs(ue)}function ve(ue){return Bs(N,ue)}function ye(ue){return!H.has(ue)}function De(ue,ke){ue.preventDefault(),ue.stopPropagation(),H.has(ke)?H.delete(ke):H.add(ke),Oe()}function ge(ue,ke){ue.preventDefault(),ue.stopPropagation(),r(ke)}function Re(ue,ke){ue.preventDefault(),ue.stopPropagation(),r(ke)}function Ze(ue,ke){he||r(ke)}function ft(ue,ke){ue.preventDefault(),ue.stopPropagation(),jm(ke).then(Ge=>{Ge&&_e("\uBCF5\uC0AC\uB428","success",1200)})}function X(ue,ke){he=ke,ue.dataTransfer&&(ue.dataTransfer.setData("text/plain",ke),ue.dataTransfer.effectAllowed="move"),ue.target.classList.add("board-card--dragging")}function J(ue){ue.target.classList.remove("board-card--dragging"),qt(),setTimeout(()=>{he=null},0)}function re(ue){let ke=String(ue.target.value||"");!ke||ke===_||(_=ke,u&&u(ke),Oe())}function ae(){return l?l.get():null}function Ee(ue){let ke=a?a.get():null,Ge=ke?ke.cleanup_failed:null;if(!Ge||typeof Ge!="object"||Array.isArray(Ge))return null;let rt=Ge[ue];return!rt||typeof rt!="object"||Array.isArray(rt)?null:rt}let fe={onCardClick:Ze,onCopyId:ft,onDragStart:X,onDragEnd:J,onClosedRangeChange:re,rollupFor:ve,isExpanded:ye,onRollupToggle:De,onChildClick:ge,onFromChipClick:Re,onOpenDoc:p?(ue,ke)=>p(ke):void 0,cleanupFailureFor:Ee,get policy(){return ae()}};function Pe(ue,ke){he||(Ke(),r(ke))}function Ue(ue,ke){ue.preventDefault(),ue.stopPropagation(),Ke(),r(ke)}let Qe={...fe,onCardClick:Pe,onChildClick:Ue,onFromChipClick:Ue,onOpenDoc:p?(ue,ke)=>{Ke(),p(ke)}:void 0,get policy(){return ae()}};function ze(ue){let ke=ue.target,Ge=e.querySelector(".board-filter__labels");ke&&Ge&&Ge.contains(ke)||xe()}function Y(ue){ue.key==="Escape"&&xe()}function V(){ne||(ne=!0,document.addEventListener("mousedown",ze),document.addEventListener("keydown",Y),Oe())}function xe(){ne&&(ne=!1,document.removeEventListener("mousedown",ze),document.removeEventListener("keydown",Y),Oe())}function bt(ue){ue.key==="Escape"&&Ke()}function _t(){I||(I=!0,document.addEventListener("keydown",bt),Oe())}function Ke(){I&&(I=!1,document.removeEventListener("keydown",bt),Oe())}let nt={onClose:Ke,onOverlayClick(ue){ue.target===ue.currentTarget&&Ke()}},x={onSearchInput(ue){W.search=String(ue.target.value||""),C()},onPriorityChange(ue){W.priority=String(ue.target.value||""),C()},onTypeChange(ue){W.type=String(ue.target.value||""),C()},onSortChange(ue){let ke=String(ue.target.value||"");if(!(!iu.has(ke)||ke===F)){F=ke;try{window.localStorage.setItem(su,ke)}catch{}C()}},onDeferredToggle(){I?Ke():_t()},onLabelMenuToggle(){ne?xe():V()},onLabelToggle(ue){let ke=W.labels.indexOf(ue);ke===-1?W.labels.push(ue):W.labels.splice(ke,1),C()},onLabelClear(){W.labels.length!==0&&(W.labels=[],C())},onNewIssue(){d&&d()}};function Z(){return c`
      <div class="board-view">
        ${ou(W,x,{sort_mode:F,deferred_popup_open:I,deferred_count:P,label_options:me(),label_menu_open:ne})}
        <div class="board-root">
          ${ro({title:"Blocked",id:"blocked-col",items:te(O)},fe)}
          ${ro({title:"Ready",id:"ready-col",items:te(R)},fe)}
          ${ro({title:"In progress",id:"in-progress-col",items:te(Q)},fe)}
          ${ro({title:"Resolved",id:"resolved-col",items:te(ee)},fe)}
          ${ro({title:"Closed",id:"closed-col",items:te(L),is_closed:!0,closed_range:_},fe)}
        </div>
        ${I?ru({items:te(K),count:P},Qe,nt):""}
      </div>
    `}function Oe(){mt(Z(),e),Ye()}function Ye(){try{let ue=e.querySelector("#deferred-popup");ue&&!ue.open&&(typeof ue.showModal=="function"?ue.showModal():ue.setAttribute("open",""));let ke=Array.from(e.querySelectorAll(".board-column, .deferred-popup__body"));for(let Ge of ke)Array.from(Ge.querySelectorAll(".board-card")).forEach((et,ht)=>{et.tabIndex=ht===0?0:-1})}catch{}}async function at(ue,ke){if(!i){_e("\uC5F0\uACB0\uB418\uC9C0 \uC54A\uC544 \uC0C1\uD0DC\uB97C \uBCC0\uACBD\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error");return}try{await i("update-status",{id:ue,status:ke}),_e("\uC0C1\uD0DC \uBCC0\uACBD\uB428","success",1500)}catch(Ge){n("update-status failed: %o",Ge),_e("\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328","error")}}function Fe(ue){switch(ue){case"blocked-col":return O;case"ready-col":return R;case"in-progress-col":return Q;case"resolved-col":return ee;default:return[]}}function Je(ue,ke,Ge){if(!i||!s)return;let rt=Fe(ue),et=rt.find(S=>S.id===ke);if(!et)return;let ht=rt.filter(S=>S.id!==ke),je=Ge.closest?Ge.closest(".board-card"):null,tt=ht.length;if(je){let S=je.getAttribute("data-issue-id");if(S===ke)return;let j=ht.findIndex(ce=>ce.id===S);j>=0&&(tt=j)}let Ne=ht.slice();Ne.splice(tt,0,et),v.applyReorder(ke,Ne,tt)}function qt(){for(let ue of Array.from(e.querySelectorAll(".board-column--drag-over")))ue.classList.remove("board-column--drag-over")}let lt=null;e.addEventListener("dragover",ue=>{ue.preventDefault(),ue.dataTransfer&&(ue.dataTransfer.dropEffect="move");let Ge=ue.target.closest(".board-column");Ge&&Ge!==lt&&(lt&&lt.classList.remove("board-column--drag-over"),Ge.classList.add("board-column--drag-over"),lt=Ge)}),e.addEventListener("dragleave",ue=>{let ke=ue.relatedTarget;(!ke||!e.contains(ke))&&lt&&(lt.classList.remove("board-column--drag-over"),lt=null)}),e.addEventListener("drop",ue=>{ue.preventDefault(),lt&&(lt.classList.remove("board-column--drag-over"),lt=null);let ke=ue.target,Ge=ke.closest(".board-column");if(!Ge)return;let rt=ue.dataTransfer?.getData("text/plain")||"";if(!rt)return;let et=Ge.id,ht=q.get(rt);if(ht&&ht===et){if(qm.has(et)){if(F!=="manual"){_e("\uC218\uB3D9(\uB4DC\uB798\uADF8) \uC815\uB82C \uBAA8\uB4DC\uC5D0\uC11C\uB9CC \uC21C\uC11C\uB97C \uBC14\uAFC0 \uC218 \uC788\uC2B5\uB2C8\uB2E4","warning",2e3);return}Je(et,rt,ke)}return}let je=Mm[et];if(!je){_e("\uC5EC\uAE30\uB85C\uB294 \uC62E\uAE38 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","warning",1500);return}G.get(rt)!==je&&at(rt,je)}),e.addEventListener("keydown",ue=>{let ke=ue.target;if(!(ke instanceof HTMLElement))return;let Ge=String(ke.tagName||"").toLowerCase();if(Ge==="input"||Ge==="textarea"||Ge==="select"||Ge==="button"||Ge==="a"||ke.isContentEditable===!0)return;let rt=ke.closest(".board-card");if(!rt)return;let et=String(ue.key||"");if(et==="Enter"||et===" "){ue.preventDefault();let Ne=rt.getAttribute("data-issue-id");Ne&&r(Ne);return}if(et!=="ArrowUp"&&et!=="ArrowDown"&&et!=="ArrowLeft"&&et!=="ArrowRight")return;ue.preventDefault();let ht=rt.closest(".board-column");if(!ht)return;let je=Array.from(ht.querySelectorAll(".board-card")),tt=je.indexOf(rt);if(et==="ArrowDown"&&tt<je.length-1){At(rt,je[tt+1]);return}if(et==="ArrowUp"&&tt>0){At(rt,je[tt-1]);return}if(et==="ArrowLeft"||et==="ArrowRight"){let Ne=Array.from(e.querySelectorAll(".board-column")),S=Ne.indexOf(ht),j=et==="ArrowRight"?1:-1,ce=S+j;for(;ce>=0&&ce<Ne.length;){let Ae=Ne[ce].querySelector(".board-card");if(Ae){At(rt,Ae);return}ce+=j}}});function At(ue,ke){try{ue.tabIndex=-1,ke.tabIndex=0,ke.focus()}catch{}}let Bt=null;m&&m.subscribe&&(Bt=m.subscribe(()=>{try{C()}catch{}}));let Pt=null;l&&l.subscribe&&(Pt=l.subscribe(()=>{try{C()}catch{}}));let Nt=null;return a&&a.subscribe&&(Nt=a.subscribe(()=>{Oe()})),{async load(){n("load"),C()},clear(){xe(),Ke(),Bt&&(Bt(),Bt=null),Pt&&(Pt(),Pt=null),Nt&&(Nt(),Nt=null),e.replaceChildren(),O=[],R=[],Q=[],ee=[],K=[],L=[],G=new Map,q=new Map}}}function Lo(e,t){return e.filter(n=>{let r=js(n);return!(r&&t.has(r))})}async function jm(e){try{if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")return await navigator.clipboard.writeText(String(e)),!0;let t=document.createElement("textarea");t.value=String(e),t.style.position="fixed",t.style.left="-9999px",document.body.appendChild(t),t.select();let n=!1;try{n=document.execCommand("copy")}finally{t.remove()}return n}catch{return!1}}var pn=e=>e??Vt;function Sn(e){return[typeof e.runner=="string"?e.runner:null,typeof e.model=="string"?e.model:null,typeof e.effort=="string"?e.effort:null,e.speed==="fast"?"Fast":null].filter(Boolean).join(" \xB7 ")}function Do(e){return typeof e.resumed_from!="string"||e.resumed_from.length===0?null:`${e.continuation_mode==="session"?"session \uC774\uC5B4\uBC1B\uC74C":e.continuation_mode==="fresh"?"\uC0C8 session\uC73C\uB85C \uC774\uC5B4\uBC1B\uC74C":"\uC774\uC804 attempt\uC5D0\uC11C \uC774\uC5B4\uBC1B\uC74C"} (from ${e.resumed_from})`}async function gn(e){let t=String(e);if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")try{return await navigator.clipboard.writeText(t),!0}catch{}try{let n=document.createElement("textarea");n.value=t,n.style.position="fixed",n.style.left="-9999px",document.body.appendChild(n),n.select();let r=!1;try{r=document.execCommand("copy")}finally{n.remove()}return r}catch{return!1}}var Fm=["workflow_mode","spec_review_model","spec_review_effort","spec_review_speed","plan_review_model","plan_review_effort","plan_review_speed","impl_review_model","impl_review_effort","impl_review_speed","impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed","quick_fix_impl_dispatch","quick_fix_impl_runtime","quick_fix_impl_model","quick_fix_impl_effort","quick_fix_impl_speed","orchestration_model","orchestration_effort","orchestration_speed","quick_fix_orchestration_model","quick_fix_orchestration_effort","quick_fix_orchestration_speed"],du=["orchestration_model","orchestration_effort","orchestration_speed"],pu=["quick_fix_orchestration_model","quick_fix_orchestration_effort","quick_fix_orchestration_speed"],Bm=[...du,...pu],lu={quick_fix_impl_dispatch:"impl_dispatch",quick_fix_impl_runtime:"impl_runtime",quick_fix_impl_model:"impl_model",quick_fix_impl_effort:"impl_effort",quick_fix_impl_speed:"impl_speed",quick_fix_orchestration_model:"orchestration_model",quick_fix_orchestration_effort:"orchestration_effort",quick_fix_orchestration_speed:"orchestration_speed"},cu={spec_review_effort:"spec_review_model",plan_review_effort:"plan_review_model",impl_review_effort:"impl_review_model"},uu={spec_review_speed:"spec_review_model",plan_review_speed:"plan_review_model",impl_review_speed:"impl_review_model"},Um=new Set(["native-fixed-posture","unsupported","claude-runner-model-default","catalog-validated","provider-tier-or-runtime-model-default","actual-effort"]);function nn(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function It(e){return typeof e=="string"&&e.length>0?e:null}function oo(e){return e.startsWith("gpt-")?e.slice(4):e}function kt(e,t,n,r,o){return{value:e,source:t,display:n,full_value:r,resolution:o}}function fu(e,t,n){let r=It(t[e]);if(r!==null)return{value:r,source:"pin"};let o=It(n[e]);return o===null?null:{value:o,source:"global"}}function fr(e,t,n,r){return fu(e,t,n)||{value:r,source:"base"}}function Ca(e,t,n,r){let o=n?.implementation?.model_catalog;if(t&&nn(o?.[t])){let s=It(o[t][e]);if(s!==null)return s}if(t&&Array.isArray(o?.[t])&&o[t].includes(e))return e;if(!t&&nn(o)){for(let s of Object.values(o))if(nn(s)){let l=It(s[e]);if(l!==null)return l}else if(Array.isArray(s)&&s.includes(e))return e}let i=r?.model_index?.[e];return It(r?.runners?.[i]?.models?.[e]?.id)||e}function Wm(e,t){return It(t?.review?.reviewers?.[e]?.model)||e}function Dn(e,t,n=!1){if(e==="default")return kt(e,t,`default (\uC77C\uBC18 \xB7 ${t==="pin"?"\uD540":"\uC804\uC5ED \uACE0\uC815"})`,e,"explicit");let r=n?oo(e):e;return kt(e,t,r,e,"explicit")}function _u(e,t,n){let r=t?.implementation?.model_catalog?.[e],o=[];nn(r)?o.push(...Object.keys(r)):Array.isArray(r)&&o.push(...r.filter(s=>typeof s=="string"));let i=n?.runners?.[e]?.models;if(nn(i))for(let s of Object.keys(i))o.includes(s)||o.push(s);return o}function zm(e,t){let n=[],r=e?.implementation?.model_catalog;nn(r)&&n.push(...Object.keys(r));let o=t?.runners;if(nn(o))for(let i of Object.keys(o))n.includes(i)||n.push(i);return n}function Hm(e,t,n){if(e===null)return{runtime:null,offered:!1};let r=!1;for(let o of zm(t,n)){let i=_u(o,t,n);if(i.length>0&&(r=!0),i.includes(e))return{runtime:o,offered:!0}}return{runtime:null,offered:r}}function Ys(e){return kt(e.value,e.source,`${e.value} (\uBE44\uD638\uD658)`,e.value,"incompatible")}function Oa(e,t,n){let r=fu(e,t,n);return r?Dn(r.value,r.source):kt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable")}function En(e){let t=nn(e.pin)?e.pin:{},n=nn(e.global)?e.global:{},r=nn(e.execution_defaults)?e.execution_defaults:null,o=r?.supported===!0&&nn(r.session)?r.session:null,i=r?.supported===!0&&nn(r.orchestration)?r.orchestration:null,s=nn(e.runner_catalog)?e.runner_catalog:null,l=It(n.quick_fix_impl_model),a=Hm(l,o,s),u={};if(o){let d=fr("workflow_mode",t,n,It(o.workflow_mode_default));u.workflow_mode=d.source==="base"?kt(d.value,"base",d.value||"\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",d.value,"default"):Dn(d.value,d.source);for(let K of["spec_review","plan_review","impl_review"]){let L=`${K}_model`,I=It(K==="plan_review"?d.value==="fast_track"?o.plan_review?.fast_track_default:o.plan_review?.standard_recommended:o.review?.default),P=fr(L,t,n,I);if(P.value===null)u[L]=kt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable");else if(P.value!=="self"&&P.value!=="skip"&&!nn(o.review?.reviewers?.[P.value]))u[L]=Ys(kt(P.value,P.source,"",null,"explicit"));else{let F=Wm(P.value,o);u[L]=kt(P.value,P.source,oo(F),F,P.source==="base"?"default":"explicit")}}for(let[K,L]of Object.entries(cu)){let I=u[L].value;if(I==="self"||I==="skip"){u[K]=kt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable");continue}let P=It(o.review?.reviewers?.[I||""]?.effort),F=fr(K,t,n,P);u[K]=F.value===null?kt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"):kt(F.value,F.source,F.value,F.value,F.source==="base"?"default":"explicit")}for(let[K,L]of Object.entries(uu)){let I=u[L];if(I.resolution==="incompatible"||I.value==="self"||I.value==="skip"){u[K]=kt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable");continue}if(I.resolution==="unavailable"){u[K]=kt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable");continue}let P=fr(K,t,n,"default");u[K]=P.source==="base"?kt("default","base","default (\uC77C\uBC18)","default","default"):Dn(P.value,P.source)}let p=nn(o.implementation?.default)?o.implementation.default:{},_=It(e.route),m=_!==null&&["quick_fix","spec_backed","full_plan"].includes(_),v=nn(o.implementation?.route_defaults)?o.implementation.route_defaults:{},O=m&&nn(v[_])?v[_]:{},R={},Q=!1;if(_==="quick_fix"){let K=It(t.impl_runtime),L=It(n.quick_fix_impl_runtime),I=K||L,P=I==="inherit"?It(e.controller_runtime):I;Q=l!==null&&a.runtime!==null&&(I===null||P===a.runtime);let F=It(t.impl_dispatch),G=It(n.quick_fix_impl_dispatch);if(F!==null)u.impl_dispatch=Dn(F,"pin"),R.impl_dispatch="pin";else if(G!==null)u.impl_dispatch=Dn(G,"global"),R.impl_dispatch="quick_fix";else if(Q)u.impl_dispatch=kt("delegated","global","\uC704\uC784 (\uBAA8\uB378 \uD568\uC758)","delegated","explicit"),R.impl_dispatch="implied";else{let q=It(O.dispatch)||It(p.dispatch);u.impl_dispatch=q?kt(q,"base",q,q,"default"):kt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"),R.impl_dispatch="base"}if(K!==null)u.impl_runtime=Dn(K,"pin"),R.impl_runtime="pin";else if(L!==null)u.impl_runtime=Dn(L,"global"),R.impl_runtime="quick_fix";else if(Q){let q=a.runtime;u.impl_runtime=kt(q,"global",`${q} (\uC720\uB3C4)`,q,"explicit"),R.impl_runtime="derived"}else{let q=fr("impl_runtime",{},n,It(p.runtime));u.impl_runtime=q.value===null?kt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"):kt(q.value,q.source,q.value,q.value,q.source==="base"?"default":"explicit"),R.impl_runtime=q.source}for(let q of["impl_model","impl_effort","impl_speed"]){let N=It(t[q]),H=It(n[`quick_fix_${q}`]),W;N!==null?(W={value:N,source:"pin"},R[q]="pin"):q==="impl_model"&&Q&&l!==null?(W={value:l,source:"global"},R[q]="quick_fix"):q!=="impl_model"&&H!==null?(W={value:H,source:"global"},R[q]="quick_fix"):(W=fr(q,{},n,It(p[q.replace("impl_","")])),R[q]=W.source),u[q]=W.value===null?kt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"):kt(W.value,W.source,W.value,W.value,W.source==="base"?"default":"explicit")}}else for(let K of["impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"]){let L=fr(K,t,n,K==="impl_dispatch"?It(O.dispatch)||It(p.dispatch):It(p[K.replace("impl_","")]));u[K]=L.value===null?kt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"):kt(L.value,L.source,L.value,L.value,L.source==="base"?"default":"explicit")}let ee=u.impl_dispatch.value==="main";if(ee?u.impl_dispatch.display=R.impl_dispatch==="quick_fix"?"\uBA54\uC778 (quick_fix)":"\uBA54\uC778":u.impl_dispatch.value==="delegated"&&(R.impl_dispatch==="quick_fix"?u.impl_dispatch.display="\uC704\uC784 (quick_fix)":R.impl_dispatch!=="implied"&&(u.impl_dispatch.display="\uC704\uC784")),u.impl_runtime.value==="inherit"&&(u.impl_runtime.display=e.controller_runtime?`inherit (${e.controller_runtime})`:"inherit (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_runtime.resolution="dynamic"),u.impl_model.value!==null){let K=u.impl_runtime.value==="inherit"?It(e.controller_runtime):u.impl_runtime.value,L=K?_u(K,o,s):[];_==="quick_fix"&&R.impl_model==="base"&&R.impl_runtime!=="base"&&L.length>0&&!L.includes(u.impl_model.value)&&(u.impl_model=kt("auto","base","auto","auto","default"));let I=u.impl_model.value;if(I!=="auto"&&L.length>0&&!L.includes(I))u.impl_model=Ys(u.impl_model);else{let P=Ca(I,K,o,s);u.impl_model.display=oo(P),u.impl_model.full_value=P,R.impl_model==="quick_fix"&&(u.impl_model.display=`${u.impl_model.display} (quick_fix)`)}}if(u.impl_effort.value==="auto"){let K=It(e.transport)||(u.impl_runtime.value==="codex"?"codex-native-spawn":u.impl_runtime.value==="claude"?"implement-claude":null),L=K?It(o.implementation?.effort_by_transport?.[K]?.auto):null;L&&!Um.has(L)?(u.impl_effort.display=`${L} (\uBE44\uD638\uD658)`,u.impl_effort.full_value=L,u.impl_effort.resolution="incompatible"):(u.impl_effort.display="auto (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_effort.resolution="dynamic")}R.impl_effort==="quick_fix"&&u.impl_effort.value!==null&&(u.impl_effort=kt(u.impl_effort.value,"global",`${u.impl_effort.value} (quick_fix)`,u.impl_effort.value,"explicit")),u.impl_speed.value==="default"&&(u.impl_speed=R.impl_speed==="quick_fix"?kt("default","global","default (quick_fix)","default","explicit"):u.impl_speed.source==="base"?kt("default","base","default (\uC77C\uBC18)","default","default"):Dn("default",u.impl_speed.source));for(let K of["impl_runtime","impl_effort","impl_speed"])R[K]==="quick_fix"&&u[K].value!==null&&!u[K].display.endsWith("(quick_fix)")&&(u[K].display=`${u[K].display} (quick_fix)`);if(_==="quick_fix"){l!==null&&!Q&&a.offered&&(u.quick_fix_impl_model=Ys(kt(l,"global","",l,"explicit")));for(let[K,L]of Object.entries(lu))!K.startsWith("quick_fix_orchestration_")&&!Object.hasOwn(u,K)&&(u[K]={...u[L]});u.impl_dispatch.source==="base"&&u.impl_dispatch.value==="main"&&(u.quick_fix_impl_dispatch=kt("main","base","\uBA54\uC778 (\uD558\uB124\uC2A4)","main","default"))}if(ee)for(let K of["impl_runtime","impl_model","impl_effort","impl_speed"])u[K]=kt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable")}else for(let d of Fm.filter(p=>!Bm.includes(p)))u[d]=Oa(d,t,n);if(!o){for(let[d,p]of Object.entries(cu))(u[p].value==="self"||u[p].value==="skip")&&(u[d]=kt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable"));for(let[d,p]of Object.entries(uu))(u[p].value==="self"||u[p].value==="skip")&&(u[d]=kt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable"));if(u.impl_dispatch.value==="main"){u.impl_dispatch.display="\uBA54\uC778";for(let d of["impl_runtime","impl_model","impl_effort","impl_speed"])u[d]=kt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable")}else u.impl_dispatch.value==="delegated"&&(u.impl_dispatch.display="\uC704\uC784"),u.impl_runtime.value==="inherit"&&(u.impl_runtime.display=e.controller_runtime?`inherit (${e.controller_runtime})`:"inherit (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_runtime.resolution="dynamic"),u.impl_effort.value==="auto"&&(u.impl_effort.display="auto (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_effort.resolution="dynamic")}for(let d of du){if(!i){u[d]=Oa(d,t,n);continue}let p=d.replace("orchestration_",""),_=It(i[p]),m=`quick_fix_${d}`,v=e.route==="quick_fix"?It(n[m]):null,O=It(t[d]),R=O!==null?{value:O,source:"pin"}:v!==null?{value:v,source:"global"}:fr(d,{},n,_),Q=O===null&&v!==null;if(d==="orchestration_effort"&&R.source==="base"){u[d]=kt(null,"base","CLI \uAE30\uBCF8 (\uBBF8\uC9C0\uC815)",null,"default");continue}if(R.value===null){u[d]=kt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable");continue}if(d==="orchestration_model"){let ee=R.source==="base"?It(i.model_id)||R.value:Ca(R.value,null,o,s);u[d]=kt(R.value,R.source,`${oo(ee)}${Q?" (quick_fix)":""}`,ee,R.source==="base"?"default":"explicit");continue}if(R.value==="default"){u[d]=Q?kt("default","global","default (quick_fix)","default","explicit"):R.source==="base"?kt("default","base","default (\uC77C\uBC18)","default","default"):Dn("default",R.source);continue}u[d]=Q?kt(R.value,"global",`${R.value} (quick_fix)`,R.value,"explicit"):Dn(R.value,R.source)}for(let d of pu){let p=lu[d];u[d]=u[p]?{...u[p]}:Oa(d,t,n)}if(o&&e.route!=="quick_fix")if(l===null){let d=u.orchestration_model.full_value;u.quick_fix_impl_model=kt(null,"base",d===null?"\uBA54\uC778":`\uBA54\uC778 (orchestration ${oo(d)})`,null,"default")}else if(a.runtime!==null){let d=Ca(l,a.runtime,o,s);u.quick_fix_impl_model=kt(l,"global",oo(d),d,"explicit")}else a.offered?u.quick_fix_impl_model=Ys(kt(l,"global","",null,"explicit")):u.quick_fix_impl_model=Dn(l,"global");return u}function Km(e,t){let n=t&&e.value==="default"?"default (\uC77C\uBC18)":e.display;if(!t||e.source==="pin")return`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 ${e.display}`;let r=e.source==="global"?"\uC804\uC5ED":"harness";return`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 ${n} (${r})`}function Vs(e){let t=nn(e.pin)?e.pin:{},n=nn(e.global)?e.global:{},r=nn(e.resolution_global)?{...e.resolution_global}:{};delete r[e.key];let o=p=>{let _={...r,...p};return En({pin:e.layer==="pin"?_:t,global:e.layer==="pin"?n:_,execution_defaults:e.execution_defaults,runner_catalog:e.runner_catalog,route:e.route,controller_runtime:e.controller_runtime})},i=e.layer==="pin"?t:n,s={...i};delete s[e.key];let l=o(s)[e.key],a=o(i)[e.key],u=It(i[e.key]),d=[...e.choices];return u!==null&&!d.includes(u)&&d.unshift(u),{unset_label:Km(l,e.layer==="pin"),full_value:l.full_value,unavailable:l.resolution==="unavailable",disabled:a?.resolution==="not_applicable",options:d.map(p=>{let _=o({...i,[e.key]:p})[e.key];return{value:p,label:_.display,full_value:_.full_value}})}}function Gm(e,t=document){let n=t.createElement("dialog");n.className="op-dialog continuation-dialog";let r=t.createElement("button"),o=t.createElement("button"),i=t.createElement("button"),s=t.createElement("h2"),l=t.createElement("p"),a=t.createElement("div");return a.className="op-dialog__actions",s.textContent="\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4",l.textContent=`${Sn(e.prior||{})||"\uC774\uC804 \uC124\uC815"} \u2192 ${Sn(e.current||{})||"\uD604\uC7AC \uC124\uC815"}`,r.type="button",r.className="op-btn",r.textContent="\uAE30\uC874 session \uC774\uC5B4\uD558\uAE30",r.disabled=e.prior_available===!1,o.type="button",o.className="op-btn",o.textContent="\uD604\uC7AC preset\uC73C\uB85C \uC0C8 session",i.type="button",i.className="op-btn",i.textContent="\uCDE8\uC18C",a.append(r,o,i),n.append(s,l,a),t.body.append(n),new Promise(u=>{let d=p=>{typeof n.close=="function"&&n.close(),n.remove(),u(p)};r.addEventListener("click",()=>d("prior_session")),o.addEventListener("click",()=>d("fresh_current")),i.addEventListener("click",()=>d(null)),n.addEventListener("cancel",p=>{p.preventDefault(),d(null)}),typeof n.showModal=="function"?n.showModal():n.setAttribute("open","")})}async function _r(e,t,n={}){let r=e;for(n.onResult?.(r);r?.continuation_mismatch;){let o=r.continuation_mismatch,i=await Gm(o);if(i===null)return r;r=await t(i,o.decision_token),n.onResult?.(r),r?.conflict&&n.refresh&&(r=await n.refresh(r),n.onResult?.(r))}return r}function mu(e,t=document){let n=e?.kind==="settlement",r=t.createElement("dialog");r.className="op-dialog resume-instructions-dialog";let o=t.createElement("h2"),i=t.createElement("textarea"),s=t.createElement("div"),l=t.createElement("button"),a=t.createElement("button"),u=[e?.bead_id,e?.tuple].filter(d=>typeof d=="string"&&d!=="").join(" \xB7 ");if(o.textContent=n?"\uCC29\uC9C0 \uC815\uC0B0 \uC7AC\uAC1C":"\uC138\uC158 \uC774\uC5B4\uD558\uAE30",i.placeholder="\uCD94\uAC00 \uC9C0\uCE68 (\uC120\uD0DD) \u2014 \uBE44\uC6CC\uB450\uBA74 \uAE30\uBCF8 \uC808\uCC28\uB85C \uC7AC\uAC1C",i.maxLength=4e3,s.className="op-dialog__actions resume-instructions-dialog__actions",l.type="button",l.className="op-btn op-btn--primary",l.textContent=n?"\uC815\uC0B0 \uC7AC\uAC1C":"\uC774\uC5B4\uD558\uAE30",a.type="button",a.className="op-btn",a.textContent="\uCDE8\uC18C",s.append(l,a),r.append(o),u!==""){let d=t.createElement("p");d.className="resume-instructions-dialog__target",d.textContent=u,r.append(d)}return r.append(i,s),t.body.append(r),new Promise(d=>{let p=!1,_=v=>{p||(p=!0,typeof r.close=="function"&&r.close(),r.remove(),d(v))},m=()=>_(i.value.trim());l.addEventListener("click",m),a.addEventListener("click",()=>_(null)),i.addEventListener("keydown",v=>{v.key==="Enter"&&(v.ctrlKey||v.metaKey)&&(v.preventDefault(),m())}),r.addEventListener("cancel",v=>{v.preventDefault(),_(null)}),typeof r.showModal=="function"?r.showModal():r.setAttribute("open",""),i.focus()})}async function so(e){let{context:t,transport:n,adopt:r}=e,o=await mu(t);if(o===null)return null;let i=o===""?{}:{instructions:o},s=await n({...i});if(r?.(s),s&&s.conflict&&(s=await n({...i}),r?.(s)),s=await _r(s,(l,a)=>n({...i,continuation:l,decision_token:a}),{onResult:r,refresh:()=>n({...i})}),s&&s.resumed===!1&&!s.conflict&&s.reason){let l=t?.kind==="settlement"?"\uC815\uC0B0 \uC7AC\uAC1C":"\uC774\uC5B4\uD558\uAE30";_e(`${l} \uAC70\uBD80: ${s.reason}`,"error",2400)}return s}function Ra(e){return`session:${e.provider}:${e.session_id}`}function Po(e){return`${e.provider} \xB7 ${e.session_id.slice(0,8)}`}function Ym(e,t){return e.current&&t==="in_progress"&&e.locality==="local"?"running":"done"}function io(e,t,n,r){return{attempt_id:Ra(e),session_ref:{bead_id:t,provider:e.provider,session_id:e.session_id},...typeof r=="string"&&r.length>0?{root_dir:r}:{},hide_prompt:!0,meta:{runner:e.provider,label:Po(e),session_id:e.session_id,...typeof e.resume_command=="string"&&e.resume_command.length>0?{resume_command:e.resume_command}:{},status:Ym(e,n)}}}var Ia="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4",Vm="\uBD84\uD574 \uC5C6\uC74C \u2014 \uCD1D\uB7C9\uB9CC \uBCF4\uACE0\uB428",gu="\uBD84\uD574 \uC5C6\uB294 leg";function Jt(e){return typeof e=="number"&&Number.isFinite(e)?e:0}var Gn=["input_tokens","output_tokens","cache_read_input_tokens","cache_creation_input_tokens"],ao=[...Gn,"reasoning_output_tokens"],Qm={codex:["implementation","review-consult"],claude:["subagent"]};function La(e){return!e||typeof e!="object"?!1:Number.isFinite(e.total_tokens)&&!Gn.some(t=>Number.isFinite(e[t]))}function Xm(e){return!e||typeof e!="object"?!1:ao.some(t=>Number.isFinite(e[t]))}function Da(e){let t=0;for(let n of Gn)t+=Jt(e?.[n]);return t}function Zm(e){return!e||typeof e!="object"?!1:Gn.some(t=>Number.isFinite(e[t]))}function hu(e){return!e||typeof e!="object"?!1:ao.some(t=>Number.isFinite(e[t]))||Number.isFinite(e.total_tokens)}function Jm(e){let t={};for(let n of ao)e&&Number.isFinite(e[n])&&(t[n]=e[n]);return t}function bu(e){let t={};for(let n of ao)Number.isFinite(e[n])&&(t[n]=e[n]);return Number.isFinite(e.total_tokens)&&(t.total_tokens=e.total_tokens),e.replayed===!0&&(t.replayed=!0),typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&(t.total_cost_usd=e.total_cost_usd),t}function yu(e,t){return La(t)?Jt(t.total_tokens):e==="codex"?Jt(t.input_tokens)+Jt(t.output_tokens):Da(t)}function eg(e){return e==="claude"?"Claude":"Codex"}function tg(e){return`\u03C4 ${ku(e)}`}function ng(e,t){let n=t.breakdown||{},r=Jt(t.total_only_subtotal);if(La(n)||r>0&&!Xm(n)){let u=[`\uCD1D ${t.subtotal.toLocaleString("en-US")}`,Vm];return t.replayed&&u.push(Ia),u.join(`
`)}let o=[`\uC785\uB825 ${Jt(n.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${Jt(n.output_tokens).toLocaleString("en-US")}`];e==="claude"?o.push(`\uCE90\uC2DC\uC77D\uAE30 ${Jt(n.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${Jt(n.cache_creation_input_tokens).toLocaleString("en-US")}`):(o.push(`\uCE90\uC2DC\uC77D\uAE30 ${Jt(n.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC4F0\uAE30 ${Jt(n.cache_creation_input_tokens).toLocaleString("en-US")}`),Number.isFinite(n.reasoning_output_tokens)&&o.push(`\uCD94\uB860\uCD9C\uB825 ${Jt(n.reasoning_output_tokens).toLocaleString("en-US")}`)),r>0&&o.push(`${gu} ${r.toLocaleString("en-US")}`);let i=e==="claude"?"\uC785\uB825 + \uCD9C\uB825 + \uCE90\uC2DC\uC77D\uAE30 + \uCE90\uC2DC\uC0DD\uC131":"\uC785\uB825 + \uCD9C\uB825",s=r>0?`${i} + ${gu}`:i,a=[e==="claude"?`Claude subtotal = ${s}`:`Codex subtotal = ${s}; \uCE90\uC2DC\uC77D\uAE30\xB7\uCE90\uC2DC\uC4F0\uAE30\xB7\uCD94\uB860\uCD9C\uB825\uC740 subtotal\uC5D0 \uD3EC\uD568\uB418\uC9C0 \uC54A\uB294 subset`,`\uCD1D ${t.subtotal.toLocaleString("en-US")}`,o.join(" \xB7 ")];return typeof t.total_cost_usd=="number"&&Number.isFinite(t.total_cost_usd)&&a.push(`$${t.total_cost_usd.toFixed(2)}`),t.replayed&&a.push(Ia),a.join(`
`)}function un(e){let t=[];if(!e||typeof e!="object"||!("providers"in e)||!e.providers)return t;for(let n of["claude","codex"]){let r=e.providers[n];r&&t.push({provider:n,label:`${eg(n)} ${tg(r.subtotal)}${typeof r.total_cost_usd=="number"&&Number.isFinite(r.total_cost_usd)?` \xB7 $${r.total_cost_usd.toFixed(2)}`:""}`,tooltip:ng(n,r)})}return t}function Xs(e){let t={},n={claude:!0,codex:!1},r={claude:0,codex:0};for(let o of e)if(!(!o||!o.providers))for(let i of["claude","codex"]){let s=o.providers[i];if(!s)continue;let l=t[i];l||(l={subtotal:0,breakdown:{}},t[i]=l),l.subtotal+=s.subtotal,Number.isFinite(s.total_only_subtotal)&&(l.total_only_subtotal=Jt(l.total_only_subtotal)+Jt(s.total_only_subtotal));for(let a of ao)Number.isFinite(s.breakdown[a])&&(l.breakdown[a]=Jt(l.breakdown[a])+Jt(s.breakdown[a]));s.replayed&&(l.replayed=!0),i==="claude"&&(typeof s.total_cost_usd=="number"&&Number.isFinite(s.total_cost_usd)?r.claude+=s.total_cost_usd:n.claude=!1)}return t.claude&&n.claude&&(t.claude.total_cost_usd=r.claude),Object.keys(t).length===0?null:{providers:t,roles:{}}}function Pa(e){return!e||typeof e!="object"?null:nr({attempt:{...e,bead_id:"__attempt__"}},"__attempt__")}function rg(e){return e==="codex"?"codex":"claude"}function Kn(){return{subtotal:0,breakdown:Jm(null),total_only:0,legs:[],replayed:!1,outer_count:0,outer_cost:0,outer_cost_count:0}}function Qs(e,t,n){e.subtotal+=t.subtotal,La(t.usage)&&(e.total_only+=t.subtotal);for(let r of ao)Number.isFinite(t.usage[r])&&(e.breakdown[r]=Jt(e.breakdown[r])+Jt(t.usage[r]));e.legs.push(t),t.replayed===!0&&(e.replayed=!0),n&&(e.outer_count+=1,typeof t.usage.total_cost_usd=="number"&&Number.isFinite(t.usage.total_cost_usd)&&(e.outer_cost+=t.usage.total_cost_usd,e.outer_cost_count+=1))}function vu(e,t){let n={subtotal:e.subtotal,breakdown:e.breakdown};return e.total_only>0&&(n.total_only_subtotal=e.total_only),t&&(n.legs=e.legs),e.replayed&&(n.replayed=!0),n}function ku(e){return e>=1e6?`${(e/1e6).toFixed(1)}M`:e>=1e3?`${(e/1e3).toFixed(1)}k`:String(e)}function lo(e){return Zm(e)?`\u03C4 ${ku(Da(e))}`:null}function tr(e){let t=lo(e);if(!t)return null;let n=e?.total_cost_usd;return typeof n=="number"&&Number.isFinite(n)?`${t} \xB7 $${n.toFixed(2)}`:t}function Mo(e){if(!e||typeof e!="object")return"";let t=[`\uC785\uB825 ${Jt(e.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${Jt(e.output_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC77D\uAE30 ${Jt(e.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${Jt(e.cache_creation_input_tokens).toLocaleString("en-US")}`];typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&t.push(`$${e.total_cost_usd.toFixed(2)}`);let n=[`\uCD1D ${Da(e).toLocaleString("en-US")}`,t.join(" \xB7 ")];return e.replayed&&n.push(Ia),n.join(`
`)}function nr(e,t){let n={claude:Kn(),codex:Kn()},r={orchestrator:{claude:Kn(),codex:Kn()},implementation:{claude:Kn(),codex:Kn()},"review-consult":{claude:Kn(),codex:Kn()},subagent:{claude:Kn(),codex:Kn()}},o=new Set;for(let l of Object.values(e||{})){if(!l||l.bead_id!==t)continue;let a=l.usage;if(hu(a)){let d=rg(l.runner),p=bu(a),_={provider:d,role:"orchestrator",attempt_id:String(l.attempt_id||""),usage:p,subtotal:yu(d,p)};p.replayed===!0&&(_.replayed=!0),typeof l.model=="string"&&(_.model=l.model),typeof l.session_id=="string"&&(_.session_id=l.session_id),Qs(n[d],_,!0),Qs(r.orchestrator[d],_,!0)}let u=Array.isArray(l.usage_legs)?l.usage_legs:[];for(let d of u){let p=d&&d.provider==="claude"?"claude":"codex";if(!d||d.provider!=="codex"&&d.provider!=="claude"||!Qm[p].includes(d.role)||!hu(d.usage))continue;let _=typeof d.receipt_id=="string"&&d.receipt_id.length>0?d.receipt_id:null;if(!_||o.has(_))continue;o.add(_);let m=bu(d.usage),v={provider:p,role:d.role,attempt_id:String(l.attempt_id||""),usage:m,subtotal:yu(p,m)};v.receipt_id=_,typeof d.agent_type=="string"&&(v.agent_type=d.agent_type),typeof d.agent_id=="string"&&(v.agent_id=d.agent_id),typeof d.model=="string"&&(v.model=d.model),typeof d.effort=="string"&&d.effort.trim().length>0&&(v.effort=d.effort),typeof d.session_id=="string"?v.session_id=d.session_id:typeof d.thread_id=="string"&&(v.session_id=d.thread_id),typeof d.turn_id=="string"&&(v.turn_id=d.turn_id),(typeof d.completed_at=="string"||typeof d.completed_at=="number"&&Number.isFinite(d.completed_at))&&(v.completed_at=d.completed_at),m.replayed===!0&&(v.replayed=!0),Qs(n[p],v,!1),Qs(r[v.role][p],v,!1)}}let i={};for(let l of["claude","codex"]){let a=n[l];if(a.legs.length===0)continue;let u=vu(a,!1);l==="claude"&&a.outer_count>0&&a.outer_cost_count===a.outer_count&&(u.total_cost_usd=a.outer_cost),i[l]=u}if(Object.keys(i).length===0)return null;let s={};for(let l of["orchestrator","implementation","review-consult","subagent"]){let a={};for(let u of["claude","codex"]){let d=r[l][u];d.legs.length>0&&(a[u]={...vu(d,!0),legs:d.legs})}Object.keys(a).length>0&&(s[l]=a)}return{providers:i,roles:s}}var og=".chip-popover, .judgement-chip";function co(e){let t=null,n=!1;function r(d){return t!==null&&t.bead_id===d.bead_id&&t.chip_key===d.chip_key}function o(d){t=r(d)?null:{...d},e()}function i(){t!==null&&(t=null,e())}function s(d){let p=d.target;t!==null&&(p&&typeof p.closest=="function"&&p.closest(og)||i())}function l(d){d.key==="Escape"&&i()}function a(){n||(n=!0,document.addEventListener("click",s),document.addEventListener("keydown",l))}function u(){n&&(n=!1,document.removeEventListener("click",s),document.removeEventListener("keydown",l))}return{toggle:o,close:i,isOpen:r,attach:a,detach:u}}function uo(e){return c`<div
    class="chip-popover"
    role="dialog"
    aria-label=${e.title}
  >
    <div class="chip-popover__title">${e.title}</div>
    <ul class="chip-popover__lines">
      ${e.lines.map(t=>c`<li>${t}</li>`)}
    </ul>
  </div>`}var wu={running:3,paused:2,failed:1};function rr(e){if(!e||typeof e!="object")return!1;let t=e.kind;return t==null||t==="implementation"}function $u(e){let t=Object.values(e||{}),n=new Map;for(let r of t){if(!r||typeof r.bead_id!="string"||r.bead_id.length===0||r.kind!=="review_session"||r.status!=="running")continue;let o=typeof r.started_at=="number"?r.started_at:null,i=n.get(r.bead_id);i&&(i.started_at??0)>(o??0)||n.set(r.bead_id,{attempt:r,origin:r.origin==="click"||r.origin==="auto"?r.origin:null,started_at:o})}return n}function xu(e,t){let n=Object.values(e||{}),r=new Set,o=new Map;for(let s of n)!s||typeof s.bead_id!="string"||(typeof s.resumed_from=="string"&&s.resumed_from.length>0&&r.add(s.resumed_from),rr(s)&&o.set(s.bead_id,s.attempt_id));let i=new Map;for(let s of n){if(!s||typeof s.bead_id!="string"||s.bead_id.length===0||!rr(s))continue;let l=null;if(s.status==="running")l="running";else if(s.status==="paused"&&!r.has(s.attempt_id))l="paused";else if(s.status==="failed"||s.status==="orphaned"){let d=t.get(s.bead_id),p=typeof d=="number"&&d>0&&typeof s.finished_at=="number"&&d>=s.finished_at;o.get(s.bead_id)===s.attempt_id&&!p&&typeof s.dismissed_at!="number"&&(l="failed")}if(!l)continue;let a=typeof s.started_at=="number"?s.started_at:null,u=i.get(s.bead_id);if(u){let d=wu[u.run_state],p=wu[l];if(d>p||d===p&&(u.started_at??0)>(a??0))continue}i.set(s.bead_id,{attempt:s,run_state:l,started_at:a})}return{winners:i,resumed_from_ids:r}}var Zs=["workflow_mode","spec_review_model","spec_review_effort","spec_review_speed","plan_review_model","plan_review_effort","plan_review_speed","impl_review_model","impl_review_effort","impl_review_speed","impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"],sg=["quick_fix_impl_dispatch","quick_fix_impl_runtime","quick_fix_impl_model","quick_fix_impl_effort","quick_fix_impl_speed"],qo=[...Zs.filter(e=>e!=="impl_dispatch"),...sg,"base_sync_accept_local_commits","bdui_url"],Au=["base_sync_accept_local_commits"],No="true";function Js(e){let t={};if(!fn(e))return t;for(let[n,r]of Object.entries(e)){if(Au.includes(n)){r===!0&&(t[n]=No);continue}typeof r=="string"&&(t[n]=r)}return t}function Su(e){let t;try{t=new URL(e)}catch{return!1}return(t.protocol==="http:"||t.protocol==="https:")&&e===t.origin}var Pn=["orchestration_model","orchestration_effort","orchestration_speed"],po=["quick_fix_orchestration_model","quick_fix_orchestration_effort","quick_fix_orchestration_speed"],Ma=Object.freeze({orchestration_model:"quick_fix_orchestration_model",orchestration_effort:"quick_fix_orchestration_effort",orchestration_speed:"quick_fix_orchestration_speed",impl_dispatch:"quick_fix_impl_dispatch",impl_runtime:"quick_fix_impl_runtime",impl_model:"quick_fix_impl_model",impl_effort:"quick_fix_impl_effort",impl_speed:"quick_fix_impl_speed"}),fo=[...Zs,...Pn],ig=qo.filter(e=>fo.includes(e));function ag(e,t){let n={},r=[];for(let[i,s]of Object.entries(Ma)){let l=e[i];if(!Object.hasOwn(e,i)){n[s]=null;continue}let a=t[s];if(typeof l!="string"||!Array.isArray(a)||!a.includes(l)){n[s]=null,r.push(`lane_incompatible:${s}`);continue}n[s]=l}let o=Object.keys(e).filter(i=>!Object.hasOwn(Ma,i));return{values:n,warnings:r,skipped_keys:o}}var jo=["delegated","main"],ei=["inherit","claude","codex"],Yn=["default","fast"],Fo=["standard","fast_track"],Bo=["codex","opus","fable","self","skip"],ti=["codex","fable","skip"],ni=["low","medium","high","xhigh"],Eu=["default","fast"],$n="auto";function fn(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function Tu(e){if(!fn(e)||!fn(e.runners))return[];let t=[];for(let[n,r]of Object.entries(e.runners))fn(r)&&fn(r.models)&&t.push([n,Object.keys(r.models)]);return t}function _o(e,t){let n=Tu(e),r=t&&t!=="inherit"?n.filter(([o])=>o===t):n;return[$n,...r.flatMap(([,o])=>o)]}function Cu(e,t,n,r){if(!fn(e)||!fn(e.runners))return[$n];let o=[];for(let[i,s]of Object.entries(e.runners))if(!(!fn(s)||!fn(s.models))&&!(t&&t!=="inherit"&&i!==t))for(let[l,a]of Object.entries(s.models)){if(n&&n!==$n&&l!==n)continue;let u=r(s,a);if(Array.isArray(u))for(let d of u)typeof d=="string"&&!o.includes(d)&&o.push(d)}return[$n,...o]}function Pr(e,t,n){return Cu(e,t,n,(r,o)=>fn(o)&&Array.isArray(o.efforts)?o.efforts:r.efforts)}function ri(e,t,n){return Cu(e,t,n,(r,o)=>fn(o)&&Array.isArray(o.orchestration_efforts)?o.orchestration_efforts:fn(o)&&Array.isArray(o.efforts)?o.efforts:r.efforts)}function mo(e,t){let n=Tu(e);return(t?n.filter(([o])=>o===t):n).flatMap(([,o])=>o)}function Ou(e,t,n){let r={impl_runtime:e?.impl_runtime,impl_model:e?.impl_model,impl_effort:e?.impl_effort},o=r.impl_runtime==="claude"||r.impl_runtime==="codex"?r.impl_runtime:r.impl_runtime==="inherit"?n:null;return o&&(r.impl_model&&!_o(t,o).includes(r.impl_model)&&(r.impl_model=void 0),r.impl_effort&&!Pr(t,o,r.impl_model||$n).includes(r.impl_effort)&&(r.impl_effort=void 0)),r}var lg={workflow_mode:"\uC6CC\uD06C\uD50C\uB85C \uBAA8\uB4DC",spec_review_model:"\uC2A4\uD399 \uB9AC\uBDF0\uC5B4",spec_review_effort:"\uC2A4\uD399 \uB9AC\uBDF0 effort",spec_review_speed:"\uC2A4\uD399 \uB9AC\uBDF0 \uC18D\uB3C4",plan_review_model:"\uACC4\uD68D \uB9AC\uBDF0\uC5B4",plan_review_effort:"\uACC4\uD68D \uB9AC\uBDF0 effort",plan_review_speed:"\uACC4\uD68D \uB9AC\uBDF0 \uC18D\uB3C4",impl_review_model:"\uAD6C\uD604 \uB9AC\uBDF0\uC5B4",impl_review_effort:"\uAD6C\uD604 \uB9AC\uBDF0 effort",impl_review_speed:"\uAD6C\uD604 \uB9AC\uBDF0 \uC18D\uB3C4",impl_runtime:"\uC704\uC784 \uB300\uC0C1",impl_model:"\uAD6C\uD604 \uBAA8\uB378",impl_effort:"\uAD6C\uD604 effort",impl_speed:"\uAD6C\uD604 \uC18D\uB3C4",orchestration_model:"\uC6CC\uCEE4 \uBAA8\uB378",orchestration_effort:"\uC6CC\uCEE4 effort",orchestration_speed:"\uC6CC\uCEE4 \uC18D\uB3C4"},cg={quick_fix_orchestration_model:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uBAA8\uB378",quick_fix_orchestration_effort:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 effort",quick_fix_orchestration_speed:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uC18D\uB3C4",quick_fix_impl_dispatch:"\uC2E4\uD589 \uBC29\uC2DD",quick_fix_impl_runtime:"\uC704\uC784 \uB300\uC0C1",quick_fix_impl_model:"\uBAA8\uB378",quick_fix_impl_effort:"effort",quick_fix_impl_speed:"\uC18D\uB3C4"},qa=[...ig,...Pn],ug=[...fo,...qo].filter((e,t,n)=>n.indexOf(e)===t&&!qa.includes(e));function Ru(e,t){let n=fn(e)?e:{},r=fn(t)?t:{},o=[];for(let s of qa){let l=n[s]??null,a=r[s]??null;l!==a&&o.push({key:s,label:lg[s]||s,before:l,after:a,kind:l===null?"added":a===null?"removed":"changed"})}let i=[];for(let s of[...ug,...Object.keys(r)])!qa.includes(s)&&!i.includes(s)&&Object.hasOwn(r,s)&&i.push(s);return{rows:o,ignored_keys:i}}function Iu(e,t,n){let r=fn(e)?e:{},o=ag(fn(t)?t:{},n),i=[];for(let s of Object.values(Ma)){let l=r[s]??null,a=o.values[s]??null;l!==a&&i.push({key:s,label:cg[s]||s,before:l,after:a,kind:l===null?"added":a===null?"removed":"changed"})}return{rows:i,ignored_keys:o.skipped_keys}}function Na(e,t,n,r,o,i,s=null){return Vs({key:e,choices:t,layer:"global",global:n,resolution_global:i,execution_defaults:r,runner_catalog:o,route:s})}function Lu(e,t){let n={};for(let r of qo){let o=e?.[r],i=t?.[r];if(o!==i){if(Au.includes(r)){n[r]=i===No?!0:null;continue}n[r]=typeof i=="string"&&i.length>0?i:null}}return n}function Du(e,t){let n={};for(let r of[...Pn,...po]){let o=e?.[r]??null,i=t?.[r]??null;o!==i&&(n[r]=typeof i=="string"&&i.length>0?i:null)}return n}var ja=[{id:"workflow",label:"\uC6CC\uD06C\uD50C\uB85C\uC6B0",keys:["workflow_mode"]},{id:"review",label:"\uB9AC\uBDF0",keys:["spec_review_model","spec_review_effort","spec_review_speed","plan_review_model","plan_review_effort","plan_review_speed","impl_review_model","impl_review_effort","impl_review_speed"]},{id:"implementation",label:"\uAD6C\uD604",keys:["impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"]},{id:"worker",label:"Worker",keys:[...Pn]}],mr={workflow_mode:"\uBAA8\uB4DC",spec_review_model:"\uC0AC\uC591 \uB9AC\uBDF0",spec_review_effort:"\uC0AC\uC591 \uB9AC\uBDF0 effort",spec_review_speed:"\uC0AC\uC591 \uB9AC\uBDF0 \uC18D\uB3C4",plan_review_model:"\uACC4\uD68D \uB9AC\uBDF0",plan_review_effort:"\uACC4\uD68D \uB9AC\uBDF0 effort",plan_review_speed:"\uACC4\uD68D \uB9AC\uBDF0 \uC18D\uB3C4",impl_review_model:"\uAD6C\uD604 \uB9AC\uBDF0",impl_review_effort:"\uAD6C\uD604 \uB9AC\uBDF0 effort",impl_review_speed:"\uAD6C\uD604 \uB9AC\uBDF0 \uC18D\uB3C4",impl_dispatch:"\uC2E4\uD589 \uBC29\uC2DD",impl_runtime:"\uC704\uC784 \uB300\uC0C1",impl_model:"\uBAA8\uB378",impl_effort:"effort",impl_speed:"\uC18D\uB3C4",orchestration_model:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uBAA8\uB378",orchestration_effort:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 effort",orchestration_speed:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uC18D\uB3C4"},oi={pin:"\uD540",global:"\uC804\uC5ED",base:"\uAE30\uBCF8"};function Fa(e,t,n,r,o,i=null){let s=En({pin:t,global:n,execution_defaults:r,runner_catalog:o,route:t&&typeof t.route=="string"?t.route:null,controller_runtime:i});return e.map(l=>({key:l,...s[l]}))}function Pu(e,t,n,r,o,i=null){let s={pin:0,global:0,base:0};for(let l of Fa(e,t,n,r,o,i))s[l.source]+=1;return s}function Mu(e,t,n){return{id:e,key:t,value:typeof n=="string"?n:""}}function qu(e,t,n){return typeof t!="string"||t.length===0?null:{id:e,preset_id:t,expected_revision:n}}var nx=[...Zs,...Pn];var Nu=["orchestration_model","orchestration_effort","orchestration_speed","spec_review_model","spec_review_effort","spec_review_speed","plan_review_model","plan_review_effort","plan_review_speed","impl_review_model","impl_review_effort","impl_review_speed","impl_runtime","impl_model","impl_effort"];function Uo(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function si(e){if(!Uo(e)||!Uo(e.runners))return null;let t=Object.entries(e.runners).filter(([,n])=>Uo(n)&&Uo(n.models));return t.length>0?t:null}function Mn(e,t){let n=si(e);if(!n||!t)return null;for(let[r,o]of n)if(Object.hasOwn(o.models,t))return r;return null}function ju(e,t){return Uo(t)&&Array.isArray(t.efforts)?t.efforts.slice():Array.isArray(e.efforts)?e.efforts.slice():[]}function Fu(e,t){let n=si(e);if(!n||!t)return[];for(let[,r]of n)if(Object.hasOwn(r.models,t))return ju(r,r.models[t]);return[]}function dg(e){let t=si(e);if(!t)return[];let n=[];for(let[,r]of t)for(let o of Object.values(r.models))for(let i of ju(r,o))n.includes(i)||n.push(i);return n}function pg(e,t){if(!t)return dg(e);let r=si(e)?.find(([i])=>i===t)?.[1];if(!r)return[];let o=[];for(let i of Object.keys(r.models))for(let s of Fu(e,i))o.includes(s)||o.push(s);return o}function Bu(e,t,n){let r={impl_runtime:e.impl_runtime||"",impl_model:e.impl_model||"",impl_effort:e.impl_effort||""},o=r.impl_runtime==="inherit"?n:r.impl_runtime==="claude"||r.impl_runtime==="codex"?r.impl_runtime:null;if(r.impl_runtime==="inherit"&&!o)return r.impl_model="",r.impl_effort="",r;let i=Mn(t,r.impl_model);if(r.impl_model&&(!o||i!==o))return r.impl_model="",r.impl_effort="",r;let s=r.impl_model?Fu(t,r.impl_model):pg(t,o);return r.impl_effort&&s.length>0&&!s.includes(r.impl_effort)&&(r.impl_effort=""),r}var Ba=new Set(["unavailable","not_applicable"]);function gr(e,t){if(typeof e!="object"||e===null)return null;let n=e[t];return typeof n=="object"&&n!==null?n:null}function Uu(e){return e.filter(t=>t!==null).join(" \xB7 ")}function hr(e,t){return t===null?null:`${mr[e]}: ${t.display} (${oi[t.source]})`}function Ua(e){return e.filter(t=>t!==null).join(`
`)}function Wa(e){if(typeof e!="object"||e===null)return null;let t=Sn(e);if(t==="")return null;let n=(r,o)=>typeof o=="string"&&o.length>0?`${r}: ${o}`:null;return{text:t,title:Ua(["\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \u2014 \uC774 attempt\uC5D0 \uAE30\uB85D\uB41C \uC2E4\uD589\uAC12",n("runner",e.runner),n(mr.orchestration_model,e.model),n(mr.orchestration_effort,e.effort),n(mr.orchestration_speed,e.speed)])}}function go(e,t){let n=gr(e,"orchestration_model");if(n===null||n.resolution==="unavailable")return null;let r=gr(e,"orchestration_effort"),o=gr(e,"orchestration_speed"),i=Uu([Mn(t,n.value??""),n.display,r!==null&&r.value!==null?r.display:null,o!==null&&o.value==="fast"?"Fast":null]);return i===""?null:{text:i,title:Ua(["\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \u2014 \uD604\uC7AC \uD574\uC11D\uAC12 (\uD540 > \uD050 \uAE30\uBCF8\uAC12)",hr("orchestration_model",n),hr("orchestration_effort",r),hr("orchestration_speed",o)])}}function fg(e,t){return e===null||e.value===null||Ba.has(e.resolution)?null:e.value!=="inherit"?e.value:t?`inherit\u2192${t}`:"inherit"}function _g(e){return e===null||Ba.has(e.resolution)?null:e.value==="auto"?"auto":e.display}function mg(e){return e===null?null:e.value==="auto"?"auto":Ba.has(e.resolution)?null:e.display}function Mr(e,t){if(typeof e!="object"||e===null)return null;let n=gr(e,"impl_dispatch"),r=gr(e,"impl_runtime"),o=gr(e,"impl_model"),i=gr(e,"impl_effort"),s=gr(e,"impl_speed"),l=n!==null&&n.value==="main"?"\uBA54\uC778":Uu([fg(r,t??null),_g(o),mg(i),s!==null&&s.value==="fast"?"Fast":null]);return l===""?null:{text:l,title:Ua(["\uC6CC\uCEE4(\uAD6C\uD604 \uC704\uC784) \u2014 \uD604\uC7AC \uD574\uC11D\uAC12 (\uD540 > \uC804\uC5ED kv > \uAE30\uBCF8). \uC2E4\uD589 \uC911\uC774\uBA74 \uC138\uC158\uC774 \uC2DC\uC791 \uC2DC \uACE0\uC815\uD55C \uAC12\uACFC \uB2E4\uB97C \uC218 \uC788\uC74C",hr("impl_dispatch",n),hr("impl_runtime",r),hr("impl_model",o),hr("impl_effort",i),hr("impl_speed",s)])}}var gg=Object.freeze(new Set(["push_not_contained","invalid_impl_review","premature_close","head_mismatch","foreign_deploy_unsupported","not_resolved"])),hg=Object.freeze(["delivery_unproven:"]);function ii(e){let t=e&&typeof e.reason=="string"?e.reason:"";if(t.length===0||gg.has(t))return"session";for(let n of hg)if(t.startsWith(n))return"session";return"settlement"}var bg=["hard_diagnosis","invariant_reasoning","verification_by_judgment","claude_bound"];var yg={hard_diagnosis:"\uC6D0\uC778\uC774 \uBD88\uBA85\uD655\uD558\uAC70\uB098 \uC7AC\uD604\uC774 \uBD88\uC548\uC815\uD574 \uAC00\uC124-\uAC80\uC99D \uB8E8\uD504\uAC00 \uD544\uC694\uD558\uB2E4",invariant_reasoning:"\uC815\uD569\uC131\uC774 \uC0C1\uD0DC\uAE30\uACC4\xB7\uB3D9\uC2DC\uC131\xB7\uBD88\uBCC0\uC2DD \uCD94\uB860\uC5D0 \uB2EC\uB824 \uC788\uB2E4",verification_by_judgment:"\uD14C\uC2A4\uD2B8\uAC00 \uBABB \uC7A1\uACE0 \uB9AC\uBDF0\uC5B4\uC758 \uCD94\uB860\uC73C\uB85C\uB9CC \uAC80\uC99D\uD560 \uC218 \uC788\uB2E4",claude_bound:"Claude \uC138\uC158 \uC790\uC0B0\xB7\uC758\uBBF8\uB860\uC5D0 \uAC15\uD558\uAC8C \uBB36\uC5EC \uC788\uB2E4"};function za(e){return(e&&Array.isArray(e.reasons)?e.reasons:[]).map(n=>yg[n]||"").filter(n=>n.length>0)}var Wu={orchestration_model:["fable"],impl_runtime:["claude"]},Ha={unapplied:"\uBBF8\uC801\uC6A9",applied:"\uC801\uC6A9\uB428",diverged:"\uCD94\uCC9C\uACFC \uB2E4\uB984"};function zu(e){return typeof e=="object"&&e!==null?e:null}function Hu(e,t){return typeof e=="string"&&t.includes(e)?e:""}function vg(e){return typeof e!="string"?[]:e.split("+").map(t=>t.trim()).filter(t=>bg.includes(t))}function Wo(e,t=e){let n=zu(e);if(!n)return null;let r=Hu(n.rec_orchestration_model,Wu.orchestration_model);if(r.length===0)return null;let o=Hu(n.rec_impl_runtime,Wu.impl_runtime),i={orchestration_model:r};o.length>0&&(i.impl_runtime=o);let s=zu(t)||{},l=Object.keys(i),a=0,u=0;for(let p of l){let _=s[p];typeof _=="string"&&_.length>0&&(a+=1,_===i[p]&&(u+=1))}let d=a===0?"unapplied":u===l.length?"applied":"diverged";return{reasons:vg(n.rec_reason),rec:i,state:d}}function ai(e){if(!e||typeof e!="object")return"";let t=za(e),n=Ha[e.state]||"",r=["\uBCF5\uC7A1\uD55C \uC791\uC5C5\uC73C\uB85C \uD310\uC815\uB428"];return t.length>0&&r.push(`\uC0AC\uC720: ${t.join(" \xB7 ")}`),n.length>0&&r.push(`\uC0C1\uD0DC: ${n}`),r.join(`
`)}function li(e){return e.replace(/\/+$/,"")}function kg(e,t){let n=li(e),r=li(t);return n===r||r.startsWith(`${n}/`)||n.startsWith(`${r}/`)}function ci(e,t){let n=new Set;for(let r of e)for(let o of t){if(!kg(r,o))continue;let i=li(r),s=li(o);n.add(i.length>=s.length?i:s)}return[...n].sort()}function Ka(e,t){return`${e}\0${t}`}function Ku(e){let t=new Map;for(let n of Array.isArray(e?.running)?e.running:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"running",state:"running"});for(let n of Array.isArray(e?.pr_wait)?e.pr_wait:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"pr_wait",state:"pr_wait"});for(let n of Array.isArray(e?.queue_groups)?e.queue_groups:[]){let r=Array.isArray(n.sublanes?.parallel)?n.sublanes.parallel:Array.isArray(n.items)?n.items:[];for(let o of r)t.set(o.id,{root_dir:o.root_dir,workspace_name:o.workspace_name,lane:"parallel",position:o.queue_position});for(let o of Array.isArray(n.sublanes?.serial)?n.sublanes.serial:[])for(let i of o.items)t.set(i.id,{root_dir:i.root_dir,workspace_name:i.workspace_name,lane:o.id,position:i.queue_position})}for(let n of Array.isArray(e?.runnable)?e.runnable:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"runnable",state:"runnable"});for(let n of Array.isArray(e?.done)?e.done:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"done",state:"done"});return t}function Ho(e,t){let n=Array.isArray(t)?t:[],r=e.indexOf("-"),o=r>0?e.slice(0,r):e;return n.some(i=>typeof i?.issue_prefix=="string"&&i.issue_prefix===o)?"internal":n.length>0&&n.every(i=>typeof i?.issue_prefix=="string")?"external":"unknown"}function zo(e){if(e.state==="running")return"\uC2E4\uD589\uC911";if(e.state==="pr_wait")return"PR \uB300\uAE30";if(e.state==="runnable")return"\uC2E4\uD589\uAC00\uB2A5";if(e.state==="done")return"\uC644\uB8CC";let t=e.lane==="parallel"?"\uBCD1\uB82C":e.lane;return`${e.workspace_name} \xB7 ${t} #${e.position}`}function Gu(e,t,n,r){let o=n.get(e);if(!!(o&&t&&o.root_dir===t.root_dir&&o.lane===t.lane&&typeof o.position=="number"&&typeof t.position=="number"&&o.position<t.position))return{id:e,label:`\u{1F512} ${e} (\uAC19\uC740 \uB808\uC778 \uC55E)`,location_label:"\uAC19\uC740 \uB808\uC778 \uC55E",scope:null,same_lane_ahead:!0};if(o)return{id:e,label:`\u{1F512} ${e} (${zo(o)})`,location_label:zo(o),scope:null,same_lane_ahead:!1};let s=Ho(e,r),l=s==="internal"?"\uBBF8\uC801\uC7AC":s==="external"?"\uC678\uBD80":"\uC704\uCE58 \uBBF8\uD655\uC778";return{id:e,label:`\u{1F512} ${e} (${l})`,location_label:l,scope:s,same_lane_ahead:!1}}function Yu(e){let t=Array.isArray(e)?e:[],n=new Map,r=new Map,o=new Map;for(let l of t)for(let a of Array.isArray(l.sublanes?.serial)?l.sublanes.serial:[]){let u=Ka(l.root_dir,a.id);n.set(u,{root_dir:l.root_dir,workspace_name:l.name,lane:a.id}),o.set(u,[]);for(let d of Array.isArray(a.items)?a.items:[])r.set(d.id,u)}for(let l of t)for(let a of Array.isArray(l.sublanes?.serial)?l.sublanes.serial:[]){let u=Ka(l.root_dir,a.id),d=Array.isArray(a.items)?a.items[0]:null,_=!!d&&d.queue_index===0&&(!Array.isArray(a.occupied_by)||a.occupied_by.length===0)&&Array.isArray(d.blocked_by)?d.blocked_by:[],m=o.get(u);if(m)for(let v of _){let O=r.get(v);O&&O!==u&&!m.includes(O)&&m.push(O)}}let i=(l,a)=>{let u=new Set,d=[l];for(;d.length>0;){let p=d.pop();if(p===a)return!0;!p||u.has(p)||(u.add(p),d.push(...o.get(p)||[]))}return!1},s=new Map;for(let[l,a]of o){let u=[];for(let d of a){let p=n.get(d);i(d,l)&&p&&u.push(p)}u.length>0&&s.set(l,u)}return s}function Vu(e,t){return Ka(e,t)}var wg=Object.freeze(["done","abandoned"]);function Qu(e){return!e||typeof e!="object"||Array.isArray(e)?!1:typeof e.phase=="string"&&!wg.includes(e.phase)}async function $g(e){let t=await gn(e);_e(t?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",t?"success":"error",1200)}function qr(e){return typeof e!="string"||e.length===0?"":c`<span class="worker-ev__copyline"
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
  >`}var Xu=Object.freeze(["spec_backed","full_plan","quick_fix"]);var xg="worker-ineligible";function Ko(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function Zu(e){return Ko(e).includes(xg)}var Ag=new Set(Xu),Ju=new WeakMap;function ho(e){return e&&typeof e=="object"?e:{}}function Sg(e){let t=Ju.get(e);if(t)return t;let n=td(e);return Ju.set(e,n),n}function ui(e,t){return(Array.isArray(e)?e:[]).findIndex(r=>r&&r.bead_id===t)}function Eg(e,t){if(e.length===0)return null;if(Sg(t).has(e))return{lane:"running"};if(ui(t.pr_wait,e)>=0)return{lane:"pr_wait"};let n=ui(t.queue,e);if(n>=0)return{lane:"parallel",index:n};for(let r of Array.isArray(t.serial_lanes)?t.serial_lanes:[]){if(!r||typeof r.id!="string"||!/^s[1-5]$/.test(r.id))continue;let o=ui(r.entries,e);if(o>=0)return{lane:r.id,index:o}}return ui(t.done,e)>=0?{lane:"done"}:null}function Ga(e,t){let n=Ag.has(e.route),r=e.route==="quick_fix";return{placeable:n&&!e.worker_ineligible&&!e.awaiting_user&&(r?e.has_description:e.spec==="published")&&t===null,route_ok:n,worker_ineligible:e.worker_ineligible,awaiting_user:e.awaiting_user,missing_description:r&&!e.has_description,spec:e.spec,location:t}}function Go(e,t){let n=ho(e),r=ho(t),o=eo(n),i=n.workflow?.route_source==="explicit"&&typeof n.workflow.route=="string"&&n.workflow.route||(typeof ho(n.metadata).route=="string"?ho(n.metadata).route:""),s=i==="quick_fix",l=!Object.hasOwn(n,"description")||typeof n.description=="string"&&n.description.trim().length>0,a=Object.hasOwn(n,"labels")&&Zu(n.labels),u=Object.hasOwn(ho(n.metadata),"awaiting_user"),d=Eg(typeof n.id=="string"?n.id:"",r);return Ga({route:i,spec:s?"n/a":o.conflict?"conflict":o.evidence,has_description:l,awaiting_user:u,worker_ineligible:a},d)}function Nr(e){let t=e.location;if(t)switch(t.lane){case"running":return"\uC2E4\uD589 \uC911\uC774\uB77C \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4";case"pr_wait":return"PR \uB300\uAE30 \uC911\uC774\uB77C \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4";case"done":return"\uC644\uB8CC \uB808\uC778\uC5D0 \uC788\uC5B4 \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4";case"parallel":return`\uC774\uBBF8 \uB300\uAE30 \uC911 \xB7 \uBCD1\uB82C #${t.index+1}`;default:return`\uC774\uBBF8 \uB300\uAE30 \uC911 \xB7 \uC9C1\uB82C ${t.lane.slice(1)} #${t.index+1}`}return e.placeable?"\uB300\uAE30 \uD050 \uB9E8 \uB4A4\uC5D0 \uCD94\uAC00":e.route_ok===!1?"route\uAC00 \uC815\uD574\uC9C0\uC9C0 \uC54A\uC544 \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":e.worker_ineligible?"worker-ineligible label\uB85C \uC6CC\uCEE4\uC5D0\uC11C \uC2E4\uD589\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":e.awaiting_user?"\uC0AC\uC6A9\uC790 \uB9AC\uBDF0\uB97C \uAE30\uB2E4\uB9AC\uB294 \uC911\uC774\uB77C \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":e.missing_description?"description\uC774 \uC5C6\uC5B4 \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":e.spec==="conflict"?"spec \uACBD\uB85C\uAC00 \uCDA9\uB3CC\uD574 \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"spec\uC774 \uBC1C\uD589\uB418\uC9C0 \uC54A\uC544 \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"}function Yo(e){let t=ho(e),n=typeof t.serial_lane_count=="number"&&Number.isInteger(t.serial_lane_count)&&t.serial_lane_count>0?Math.min(t.serial_lane_count,5):0,r=Array.isArray(t.serial_lanes)?t.serial_lanes:[],o=[];for(let s of r){if(o.length>=n)break;!s||typeof s.id!="string"||!/^s[1-5]$/.test(s.id)||!Array.isArray(s.entries)||o.push({id:s.id,label:`\uC9C1\uB82C ${s.id.slice(1)}`,count:s.entries.length})}return o.length===0?null:[{id:"parallel",label:"\uBCD1\uB82C",count:(Array.isArray(t.queue)?t.queue:[]).length},...o]}function ed(e){return/^s[1-5]$/.test(e)?`\uC9C1\uB82C ${e.slice(1)}`:"\uBCD1\uB82C"}function fi(e){return typeof e=="string"&&e.length>=7?e.slice(0,7):"\u2014"}function od(e){return e==="session"?"bead\uAC00 in_progress\uB85C \uC7A1\uD78C \uB4A4 \uB2EB\uD788\uAE30\uAE4C\uC9C0\uC758 \uACBD\uACFC":"attempt \uC2E4\uD589 \uC2DC\uAC04 \uD569\uC0B0 (\uC7AC\uAC1C \uC138\uC158 \uD3EC\uD568)"}function jr(e){if(typeof e!="number"||!Number.isFinite(e)||e<0)return"\u2014";if(e<1e3)return`${Math.round(e)}ms`;let t=e/1e3;if(t<60)return`${t.toFixed(1)}\uCD08`;let n=Math.floor(t/60);if(n<60)return`${n}\uBD84 ${Math.round(t-n*60)}\uCD08`;let r=Math.floor(n/60),o=n%60;return`${r}\uC2DC\uAC04 ${o}\uBD84`}function sd(e,t){if(typeof e!="object"||e===null)return[];let n=!1,r=!1;for(let o of Object.values(e)){if(typeof o!="object"||o===null)continue;let i=o;i.bead_id!==t||i.kind!=="review_session"||(n=!0,r=r||i.origin==="auto")}return n?[r?"\uB9AC\uBDF0 \xB7 \uC790\uB3D9":"\uB9AC\uBDF0"]:[]}function nd(e){return e==="auto"||e==="click"?e:null}function id(e,t){if(typeof e!="object"||e===null)return{active:!1,failure:null,origin:null};let n=!1,r=null,o=-1,i=null,s=null,l=-1;for(let a of Object.values(e)){if(typeof a!="object"||a===null)continue;let u=a;if(u.bead_id!==t||u.kind!=="review_session")continue;if(u.status==="pending"||u.status==="running"){n=!0;let p=typeof u.started_at=="number"?u.started_at:0;p>=o&&(o=p,r=nd(u.origin));continue}if(u.status!=="failed")continue;let d=typeof u.finished_at=="number"?u.finished_at:0;d>=l&&(l=d,i=typeof u.cause=="string"&&u.cause.length>0?u.cause:null,s=nd(u.origin))}return n?{active:!0,failure:null,origin:r}:{active:!1,failure:i,origin:s}}function ad(e,t){if(typeof e!="object"||e===null)return null;let n=0,r=!1;for(let o of Object.values(e)){if(typeof o!="object"||o===null)continue;let i=o;if(i.bead_id!==t)continue;let s=i.started_at,l=i.finished_at;typeof s!="number"||typeof l!="number"||!Number.isFinite(s)||!Number.isFinite(l)||l<s||(n+=l-s,r=!0)}return r?n:null}function _i(e){if(typeof e!="number"||!Number.isFinite(e)||e<=0)return"";let t=new Date(e);return`${String(t.getHours()).padStart(2,"0")}:${String(t.getMinutes()).padStart(2,"0")}`}function Tg(e,t){let n=Array.isArray(e)?e:[],r=Array.isArray(t)?t:[];if(n.length===0&&r.length===0)return null;let o=null;for(let s of n)s.kind!=="deploy"||s.state!=="succeeded"||typeof s.target_sha!="string"||(!o||(typeof s.finished_at=="number"?s.finished_at:0)>(typeof o.finished_at=="number"?o.finished_at:0))&&(o=s);let i=n.filter(s=>s.state==="failed"&&!s.dismissed&&!s.superseded_by).length+r.length;return{deploy:o?{sha:fi(o.target_sha),at:typeof o.finished_at=="number"?o.finished_at:null,elapsed_ms:typeof o.elapsed_ms=="number"?o.elapsed_ms:null}:null,unresolved:i,badge:i>0?{tone:"act",label:`\uD574\uACB0 \uD544\uC694 ${i}`}:{tone:"quiet",label:"\uBAA8\uB450 \uC815\uC0C1"}}}function ld(e,t){let n=Tg(e,t);return n?c`<button
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
            title=${n.deploy.at?on(n.deploy.at):""}
            >${_i(n.deploy.at)}${n.deploy.elapsed_ms!==null?` \xB7 ${jr(n.deploy.elapsed_ms)}`:""}</span
          >
        </span>`:""}
    <span class="worker-repo-strip__spacer"></span>
    <span
      class="worker-repo-strip__badge worker-repo-strip__badge--${n.badge.tone}"
      >${n.badge.label}</span
    >
  </button>`:""}function bo(e){let t=mn(e.created_at),n=mn(e.updated_at);return!t&&!n?"":c`<div class="worker-mini__meta">
    ${t?c`<span title=${`\uC0DD\uC131 ${on(e.created_at)}`}
          >생성 ${t}</span
        >`:""}${t&&n?c`<span>·</span>`:""}${n?c`<span title=${`\uC218\uC815 ${on(e.updated_at)}`}
          >수정 ${n}</span
        >`:""}
  </div>`}function Cg(e){return!e||e==="requested"?"\uBC31\uC5C5 \uC911":e==="abandoned"?"\uD3D0\uAE30 \uD3EC\uAE30\uB428":e==="backup_verified"||e==="signaled"?"runner \uC885\uB8CC \uC911":e==="merged_revert"||e.startsWith("revert_")?"revert PR \uB300\uAE30":e.startsWith("rollback_")?"\uC6D0\uBCF5 \uBC30\uD3EC \uC911":e==="runner_terminated"||e.startsWith("pr_")||e.includes("ref_")||e.includes("worktree")||e.startsWith("bead_")?"PR \uC815\uB9AC \uC911":`\uD3D0\uAE30 \uCC98\uB9AC \uC911 (${e})`}function Qo(e,t){return t==="merged"?`${e}: \uC774\uBBF8 merge\uB41C \uAD6C\uD604\uC785\uB2C8\uB2E4. \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 revert PR\uC744 \uC0DD\uC131\uD558\uBA70, \uC2E4\uC81C \uC6D0\uBCF5\uC740 \uC0AC\uB78C\uC774 \uADF8 PR\uC744 merge\uD55C \uB4A4 \uC644\uB8CC\uB429\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`:`${e}: \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 runner/PR/branch/worktree\uB97C \uC815\uB9AC\uD558\uACE0 \uC774\uC288\uB97C \uD6C4\uBCF4\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`}function Xo(e,t){return t.kind==="stale_work_backup_fresh"?`${e}: \uC2E4\uD328\uD55C \uBC31\uC5C5 \uC791\uC5C5\uC744 \uD3EC\uAE30\uD569\uB2C8\uB2E4. \uBC31\uC5C5\uC740 \uB9CC\uB4E4\uC5B4\uC9C0\uC9C0 \uC54A\uC558\uACE0 \uAE30\uC874 \uC791\uC5C5\uC740 \uADF8\uB300\uB85C \uB0A8\uC2B5\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`:`${e}: \uC2E4\uD328\uD55C \uD3D0\uAE30 \uC791\uC5C5\uC744 \uD3EC\uAE30\uD569\uB2C8\uB2E4. \uBC31\uC5C5\uACFC \uD3D0\uAE30\uB294 \uC218\uD589\uB418\uC9C0 \uC54A\uC558\uACE0 bead\uB294 \uD3D0\uAE30 \uC774\uC804 \uC0C1\uD0DC\uB85C \uB3CC\uC544\uAC11\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`}function mi(e){return e.kind==="stale_work_backup_fresh"?`\uBC31\uC5C5 \uD3EC\uAE30\uB428 \xB7 \uAE30\uC874 \uC791\uC5C5\uC740 \uADF8\uB300\uB85C \uB0A8\uC2B5\uB2C8\uB2E4 (\uC6D0\uC778: ${e.last_error})`:`\uD3D0\uAE30 \uD3EC\uAE30\uB428 \xB7 \uD3D0\uAE30\uB294 \uC218\uD589\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4 (\uC6D0\uC778: ${e.last_error})`}function gi(e){let t=["\uD3D0\uAE30 \uC644\uB8CC"];return e.operation_id&&t.push(`\uC791\uC5C5 ${e.operation_id}`),e.receipt?.archive_path&&t.push(`\uBC31\uC5C5 ${e.receipt.archive_path}`),e.receipt?.original_pr?.url&&t.push(`\uC6D0\uBCF8 PR ${e.receipt.original_pr.url}`),e.receipt?.revert_pr?.url&&t.push(`revert PR ${e.receipt.revert_pr.url}`),t.join(" \xB7 ")}function cd(e){return e?.startsWith("orphan_gitlink_content:")?`\uB9E4\uD551 \uC5C6\uB294 gitlink \uACBD\uB85C ${e.slice(23)}\uC5D0 \uB0B4\uC6A9\uC774 \uC788\uC2B5\uB2C8\uB2E4 \u2014 \uC800\uC7A5\uC18C\uC5D0\uC11C \uADF8 \uACBD\uB85C\uB97C \uC815\uB9AC\uD55C \uB4A4 \uC7AC\uC2DC\uB3C4\uD558\uAC70\uB098 \uD3EC\uAE30\uD558\uC138\uC694`:e==="dirty_submodule"?"\uC11C\uBE0C\uBAA8\uB4C8\uC5D0 \uBBF8\uCEE4\uBC0B \uBCC0\uACBD\uC774\uB098 \uBBF8\uCD08\uAE30\uD654 \uD56D\uBAA9\uC774 \uC788\uC2B5\uB2C8\uB2E4 \u2014 \uC815\uB9AC \uD6C4 \uC7AC\uC2DC\uB3C4\uD558\uC138\uC694":e==="submodule_observation_failed"?"\uC11C\uBE0C\uBAA8\uB4C8 \uC0C1\uD0DC\uB97C \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 (git \uC624\uB958) \u2014 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C git \uBA85\uB839\uC744 \uC9C1\uC811 \uD655\uC778\uD558\uC138\uC694":null}function or(e,t,n={}){let o=Object.values(e&&typeof e=="object"?e:{}).filter(_=>_&&_.bead_id===t&&Qu(_)).sort((_,m)=>(_.requested_at||0)-(m.requested_at||0)).at(-1),i=typeof n.attempt_id=="string"&&n.attempt_id.length>0?n.attempt_id:typeof o?.attempt_id=="string"?o.attempt_id:null,s=n.external?"\uC678\uBD80 PR\uC740 Worker\uAC00 \uC18C\uC720\uD558\uC9C0 \uC54A\uC544 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":n.done?"\uC644\uB8CC\uB41C \uC791\uC5C5\uC740 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":n.merge_active?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":n.merge_queued?"\uBA38\uC9C0 \uD050\uC5D0 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 [\uCDE8\uC18C]\uD558\uC138\uC694":n.conflict_active?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 \uC138\uC158\uC744 \uC815\uB9AC\uD558\uC138\uC694":n.cleanup_active?"\uC815\uB9AC \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":null,l=typeof o?.last_error=="string"?o.last_error:null,a=o?Cg(o.phase):null,u=o?.kind==="stale_work_backup_fresh",d=cd(l),p=n.merged||o?.mode==="merged_revert"?"merged":"unmerged";return{action:!n.external&&!n.done,enabled:!s&&(!o||!!l),label:u?l?"\uBC31\uC5C5 \uC815\uB9AC \uC7AC\uC2DC\uB3C4":"\uBC31\uC5C5 \uD6C4 \uC0C8\uB85C \uC2DC\uC791":l?"\uC7AC\uC2DC\uB3C4":"\uD3D0\uAE30",title:s||(l?d?`\uD3D0\uAE30 \uC2E4\uD328: ${l} \u2014 ${d}`:u?`\uBC31\uC5C5 \uB4A4 \uC815\uB9AC \uC2E4\uD328: ${l} \u2014 \uC6D0\uBCF8\uACFC \uAC80\uC99D \uC601\uC218\uC99D\uC744 \uBCF4\uC874\uD55C \uCC44 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:`\uD3D0\uAE30 \uC2E4\uD328: ${l} \u2014 \uAC19\uC740 \uC791\uC5C5\uC744 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:o?`${a||"\uD3D0\uAE30 \uCC98\uB9AC \uC911"} \u2014 \uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694`:p==="merged"?"\uBCD1\uD569\uB41C \uBCC0\uACBD\uC744 \uC6D0\uBCF5 PR\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4":"\uBC31\uC5C5 \uD6C4 runner\xB7PR\xB7\uC6CC\uD06C\uD2B8\uB9AC\xB7\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4"),attempt_id:i,operation:o||null,progress:a,error:l,confirmation:p,abandon:{action:!!o&&o.phase==="requested"&&!!l,label:u?"\uBC31\uC5C5 \uD3EC\uAE30":"\uD3D0\uAE30 \uD3EC\uAE30",title:u?"\uC2E4\uD328\uD55C \uBC31\uC5C5 \uC791\uC5C5\uC744 \uD3EC\uAE30\uD569\uB2C8\uB2E4 \u2014 \uC6D0\uBCF8\uC740 \uADF8\uB300\uB85C \uB0A8\uACE0 \uC0C8\uB85C \uC2DC\uC791\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4":"\uC2E4\uD328\uD55C \uD3D0\uAE30 \uC791\uC5C5\uC744 \uD3EC\uAE30\uD569\uB2C8\uB2E4 \u2014 \uBC31\uC5C5\xB7\uD3D0\uAE30\uB294 \uC218\uD589\uB418\uC9C0 \uC54A\uC558\uACE0 bead\uB294 \uD3D0\uAE30 \uC774\uC804 \uC0C1\uD0DC\uB85C \uB3CC\uC544\uAC11\uB2C8\uB2E4"}}}function ud(e){if(!e||e.quickfix_lane!==!0)return!1;let t=e.quickfix_landing;return!t||typeof t!="object"?!1:["repo_operations","branch_cleanup","parent_close"].includes(t.cursor)}function pi(e){let t=e.discard;if(!t||!t.operation)return"";let n=t.operation,r=cd(t.error),o=n.kind==="stale_work_backup_fresh"&&!t.error?null:n.backup?.path,i=n.original_pr,s=n.revert_pr;return c`<div
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
  </div>`}var Og={dirty_unique:"\uCD5C\uC2E0 base\uC5D0 \uC5C6\uB294 \uB85C\uCEEC \uBCC0\uACBD\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",untracked_present:"\uCD94\uC801\uB418\uC9C0 \uC54A\uC740 \uD30C\uC77C\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",branch_ahead:"\uB85C\uCEEC branch\uC5D0 \uACE0\uC720 commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",head_ahead:"worktree HEAD\uC5D0 \uACE0\uC720 commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",ahead_not_contained:"\uB85C\uCEEC branch\uC758 \uACE0\uC720 commit\uC774 \uCD5C\uC2E0 base\uC5D0 \uD3EC\uD568\uB410\uC74C\uC744 \uC99D\uBA85\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",ahead_merge_commit:"\uB85C\uCEEC branch\uC5D0 \uC790\uB3D9 \uC815\uB9AC\uD560 \uC218 \uC5C6\uB294 merge commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",ahead_submodule_path:"\uB85C\uCEEC branch\uC758 \uACE0\uC720 commit\uC774 submodule \uACBD\uB85C\uB97C \uBCC0\uACBD\uD569\uB2C8\uB2E4",archive_failed:"\uACE0\uC720 commit \uBC31\uC5C5\uC744 \uC548\uC804\uD558\uAC8C \uAC80\uC99D\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",ref_delete_failed:"\uD655\uC778\uB41C local branch\uB97C \uC548\uC804\uD558\uAC8C \uC0AD\uC81C\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",resume_available:"\uC774\uC5B4\uAC08 \uC218 \uC788\uB294 \uC774\uC804 Worker session\uC774 \uC788\uC2B5\uB2C8\uB2E4",observe_failed:"Git \uC0C1\uD0DC\uB97C \uC548\uC804\uD558\uAC8C \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",identity_changed:"\uD655\uC778 \uC911 worktree \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4",ownership_unknown:"Worker \uC18C\uC720 worktree\uC778\uC9C0 \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"};function dd(e,t=!1){if(!e||typeof e!="object")return null;let n=e;if(n.reason!=="worktree_stale_work"||!n.stale_work||typeof n.stale_work!="object")return null;let r=n.stale_work,o=r.residue==="branch"?"branch":"worktree",i=r.state==="unique"?"unique":"unknown",s=r.summary&&typeof r.summary=="object"?r.summary:{};function l(u){return Number.isInteger(s[u])?Number(s[u]):0}let a=typeof r.cause=="string"?r.cause:"observe_failed";return{residue:o,state:i,title:o==="branch"?"\uC774\uC804 \uBE0C\uB79C\uCE58 \uBCF4\uC874\uB428":i==="unique"?"\uC774\uC804 \uC791\uC5C5 \uBCF4\uC874\uB428":"\uC774\uC804 \uC791\uC5C5 \uC0C1\uD0DC \uD655\uC778 \uC2E4\uD328",cause:Og[a]||"\uC548\uC804\uD558\uAC8C \uC790\uB3D9 \uC815\uB9AC\uD560 \uC218 \uC5C6\uB294 \uC774\uC804 \uC791\uC5C5\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",summary:o==="branch"?`\uACE0\uC720 commit ${l("branch_ahead")}`:[`staged ${l("staged_count")}`,`unstaged ${l("unstaged_count")}`,`untracked ${l("untracked_count")}`,`branch ahead ${l("branch_ahead")}`,`HEAD ahead ${l("head_ahead")}`].join(" \xB7 "),action_id:typeof r.action_id=="string"?r.action_id:"",can_resume:r.can_resume===!0,can_continue:r.can_continue===!0,can_backup_fresh:r.can_backup_fresh===!0,can_recheck:r.can_recheck===!0,locked:t}}function hi(e,t={}){if(!e||!e.orchestration&&!e.worker)return"";let n=t.pin===!0?" exec-chip--pin":"",r=t.pin===!0?`
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
      >`:""}`}function Vo(e,t){let n=`worker-dep worker-dep--${t}${e.foreign?" worker-dep--foreign":""}`;return e.openable===!0?c`<button
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
  </button>`:""}function bi(e,t=""){if(!e)return t===""?"":c`<div class="worker-deps worker-deps--primary">
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
            >`:""}${n.map(d=>Vo(d,"pred"))}${t}${o.map(d=>Vo(d,"dependents"))}
      </div>`:""}${u?c`<div class="worker-deps worker-deps--secondary">
        ${r.map(d=>Vo(d,"released"))}${i.map(d=>Vo(Rg(d),"overlap"))}${s?c`<span
              class="worker-dep worker-dep--muted"
              title="겹침 판정 불가 — 아티팩트가 있으면 스펙/플랜 front-matter, 없으면 description \`## scope\`에 선언 필요"
              >scope 없음</span
            >`:""}
      </div>`:""}`}function fd(e,t=""){let n=(Array.isArray(e)?e:[]).filter(r=>typeof r=="string"&&r!=="").slice().sort();return n.length===0?"":c`<div class="worker-deps worker-deps--secondary">
    ${n.map(r=>Vo({id:r,label:`\uC774\uC6D4 \u2192 ${r}`,title:`\uC774\uC6D4\uB41C \uD6C4\uC18D ${r} \uC5F4\uAE30`,openable:!0,...t?{root_dir:t}:{}},"dependents"))}
  </div>`}function yi(e){return e?c`<button
    type="button"
    class="worker-dep worker-dep--lane mon-lane__chip"
    data-lane-id=${e.lane_id}
    title="이 연결 레인으로 이동"
  >
    ${e.label}
  </button>`:""}function vi(e){if(!e)return"";let t=e.chips||{},n=t.route||e.route,r=t.route_source==="derived"||e.route_source==="derived";return n?c`<span
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
  </button>`:""}function ki(e,t=!1){return e?c`<button
    type="button"
    class="ctl-chip ctl-chip--label judgement-chip worker-card__rec"
    data-chip-key="rec"
    data-state=${e.state}
    aria-expanded=${t?"true":"false"}
    title=${ai(e)}
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
  >`}function wi(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=Math.max(0,Math.min(4,Math.trunc(e)));return c`<span class="worker-pri" title=${`\uC6B0\uC120\uC21C\uC704 P${t}`}
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
            title=${`\uC644\uB8CC ${on(e.done_at)}`}
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
  >`,v=e.lane==="done"?"":vi(e.workflow),O=e.lane==="done"?"":_d(e.from_id),R=wi(e.priority),Q=c`<span class="worker-mini__title">${e.title}</span>`,ee=gd(e.pr_url,e.pr_number),K=r.map(ft=>ft===e.live_badge?c`<span
          class="worker-mini__badge worker-mini__badge--activity"
          title="서버가 이 PR을 처리하는 중입니다"
          ><span class="act-dot" aria-hidden="true"></span>${ft}</span
        >`:c`<span
          class="worker-mini__badge${e.alert?" worker-mini__badge--alert":""}"
          title=${ft===e.completion_badge&&e.completion_title||""}
          >${ft}</span
        >`),L=e.reason?c`<span class="worker-mini__reason">${e.reason}</span>`:"",I=o.length>0?o.map(ft=>c`<span class="worker-usage" title=${ft.tooltip}
              >${ft.label}</span
            >`):i?c`<span class="worker-usage" title=${Mo(e.usage)}
            >${i}</span
          >`:"",P=s?c`<span
        class="merge-step${s.failed?" merge-step--failed":""}"
        style=${`--progress: ${s.percent}%`}
        >${s.label}${s.index>0?c`<span class="merge-step__n"
              >${s.index}/${s.total}</span
            >`:""}</span
      >`:"",F=e.merge_action?c`<button
        type="button"
        class="worker-mini__merge"
        data-bead-id=${e.id}
        ?disabled=${e.merge_enabled===!1}
        title=${e.merge_title||""}
      >
        ${e.merge_label||"\uBA38\uC9C0"}
      </button>`:"",G=e.cancel_action?c`<button
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
        </button>`:"",H=q?.abandon.action?c`<button
        type="button"
        class="worker-mini__discard-abandon"
        data-bead-id=${e.id}
        data-operation-id=${q.operation.operation_id}
        data-operation-kind=${q.operation.kind||""}
        data-last-error=${q.error||""}
        title=${q.abandon.title}
      >
        ${q.abandon.label}
      </button>`:"",W=e.resolve_action?c`<button
        type="button"
        class="worker-mini__resolve"
        data-bead-id=${e.id}
        ?disabled=${e.resolve_enabled===!1}
        title=${e.resolve_title||"\uC2E4\uD328\uD55C \uC791\uC5C5\uC744 \uC774\uC5B4\uBC1B\uB294 \uB300\uD654\uD615 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4 (\uAE30\uB85D\uB41C \uC138\uC158\uC774 \uC788\uC73C\uBA74 fork)"}
      >
        세션에서 해결
      </button>`:"",ne=q?.abandon.action?c`${N}${H}${W}`:c`${W}${N}`,he=e.stale_work||null,qe=he?c`${he.can_resume||he.can_continue?c`<button
            type="button"
            class="worker-mini__stale-continue"
            data-bead-id=${e.id}
            data-action-id=${he.action_id}
            ?disabled=${he.locked}
          >
            기존 작업 이어가기
          </button>`:""}${he.can_backup_fresh?c`<button
            type="button"
            class="worker-mini__stale-backup"
            data-bead-id=${e.id}
            data-action-id=${he.action_id}
            ?disabled=${he.locked}
          >
            백업 후 새로 시작
          </button>`:""}${he.can_recheck?c`<button
            type="button"
            class="worker-mini__stale-recheck"
            data-bead-id=${e.id}
            data-action-id=${he.action_id}
            ?disabled=${he.locked}
          >
            다시 확인
          </button>`:""}`:"",B=he?c`<div class="worker-mini__stale">
        <strong>${he.title}</strong>
        <span>${he.summary}</span>
        <span>${he.cause}</span>
        ${he.can_backup_fresh?c`<small
              >Git-ignored dependency/build output은 archive에 포함되지
              않습니다</small
            >`:""}
      </div>`:"",te=e.revise_action?c`<button
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
        </button>`:"",me=!!(e.lane!=="pr_wait"&&!e.done&&e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker)),Te=ki(e.rec,br(e,"rec")),C=Mg(e,br(e,"receipt")),se=yi(e.cross_lane_chip),ve=qr(e.log_path),ye=_||se||v||O||me||Te||C||I||ve?c`<div class="worker-chips">
          ${_}${se}${v}${O}${me?hi(e.exec_chips,{pin:e.exec_chips_pinned===!0}):""}${Te}${C}${I}${ve}${di(e)}
        </div>`:"",De=bi(e.dependency_chips),ge=pi(e),Re=t.actions?t.actions:"",Ze=!!(s||e.merge_action||e.cancel_action||e.resolve_action||e.discard_action||q?.operation||e.revise_action||he);return c`<div
    class="worker-mini${l?" worker-mini--card":""}${n?"":" worker-mini--static"}${e.done?" worker-mini--done":""}${e.ghost?" worker-mini--ghost":""}${s?" worker-mini--merging":""}${s?.failed?" worker-mini--merge-failed":""}${e.external?" worker-mini--external":""}${e.search_match===!1?" is-dimmed":""}"
    style=${s?`--progress: ${s.percent}%`:""}
    draggable=${n?"true":"false"}
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    ${a?c`<div class="worker-mini__row1">
            ${_}${m}${R}${O}${ee}${Q}${Re}
          </div>
          ${fd(e.carried_to,e.root_dir)}
          <div class="worker-mini__row2">
            ${I}${u?c`<span
                  class="worker-mini__done-at"
                  title=${`\uC644\uB8CC ${on(e.done_at)}`}
                  >완료 ${u}</span
                >`:""}${typeof e.work_ms=="number"?c`<span
                  class="worker-mini__work"
                  title=${od(e.work_kind)}
                  >작업 ${jr(e.work_ms)}</span
                >`:""}${K}${P}
            <span class="worker-mini__actions"
              >${F}${G}${ne}</span
            >
            ${bo(e)}
          </div>`:l?c`<div class="worker-mini__head">
              ${d}${p}${m}${R}${ee}${K}${L}${Re}
            </div>
            <div class="worker-mini__body">${Q}${B}</div>
            ${De}${ye}${Ze?c`<div class="worker-mini__foot">
                  ${P}
                  <span class="worker-mini__actions"
                    >${F}${G}${ne}${te}${qe}</span
                  >
                  ${pi(e)}
                </div>`:""}
            ${bo(e)}`:c`<div class="worker-mini__line">
              ${d}${p}${m}${R}${Q}${ee}${K}${L}${P}${F}${G}${ne}${Re}
            </div>
            ${De}${ye}${ge} ${bo(e)}`}
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
      </button>`)}return c`${r}`}var hd={external_roundtrip:"\uD558\uB124\uC2A4 \uBC16 \uC0C1\uB300\uC640 \uC608\uCE21 \uBD88\uAC00 \uC655\uBCF5 \uBC18\uBCF5 \u2014 \uB2E4\uB978 rig \uC138\uC158\xB7\uC0AC\uB78C\xB7\uC678\uBD80 \uC2DC\uC2A4\uD15C",user_feedback_loop:"\uC9C4\uD589 \uC911 \uC0AC\uC6A9\uC790 \uD53C\uB4DC\uBC31 \uC5C6\uC774\uB294 \uD488\uC9C8\uC774 \uB0AE\uC74C \u2014 \uBB38\uC548\xB7\uC124\uACC4 \uC138\uBD80\xB7\uBC29\uD5A5 \uC120\uD0DD"};function Xa(e,t){if(t==="rec"){let n=e.rec;if(!n)return null;let r=Ha[n.state]||"";return{title:"\uBCF5\uC7A1\uD55C \uC791\uC5C5\uC73C\uB85C \uD310\uC815\uB428",lines:[...za(n),...r.length>0?[`\uC0C1\uD0DC: ${r}`]:[],"\uC801\uC6A9\uC740 \uC774\uC288 \uC0C1\uC138\uC758 \uC2E4\uD589 \uC124\uC815 \uD3B8\uC9D1\uAE30\uC5D0\uC11C"]}}if(t==="session_preferred"){if(e.session_preferred!==!0)return null;let n=hd[e.session_preferred_reason||""]||"";return{title:"\uC6CC\uCEE4\uB85C \uB3CC\uB9B4 \uC218 \uC788\uC9C0\uB9CC \uC138\uC158\uC774 \uB0AB\uB2E4",lines:n.length>0?[n]:[]}}if(t==="ineligible")return e.worker_ineligible!==!0?null:{title:"\uC6CC\uCEE4 \uC2E4\uD589 \uB300\uC0C1\uC774 \uC544\uB2C8\uB2E4",lines:["worker-ineligible \uB77C\uBCA8\uC774 \uBD99\uC5B4 \uC788\uB2E4 \u2014 \uB77C\uBCA8\uC740 \uC774\uC288 \uC0C1\uC138\uC758 \uB77C\uBCA8 \uC808\uC5D0\uC11C \uB5C0\uB2E4"]};if(t==="spec_after_blocker")return e.spec_after_blocker!==!0?null:{title:"\uC120\uD589 \uACB0\uACFC\uAC00 \uC124\uACC4 \uC804\uC81C \u2014 \uC2A4\uD399\uB3C4 \uC120\uD589 \uB4A4\uC5D0",lines:[`\uC120\uD589: ${(Array.isArray(e.blocked_by)?e.blocked_by:[]).join(" \xB7 ")}`,"\uC120\uD589\uC774 \uB2EB\uD788\uBA74 \uC774 \uD45C\uC2DC\uB294 \uC800\uC808\uB85C \uC0AC\uB77C\uC9C4\uB2E4 \u2014 \uB77C\uBCA8\uC740 \uC774\uC288 \uC0C1\uC138\uC758 \uB77C\uBCA8 \uC808\uC5D0\uC11C \uB5C0\uB2E4"]};if(t==="readiness"){let n=pd(e);return n?{title:n.title,lines:[]}:null}if(t==="receipt"){let n=md(e);return n.length===0?null:{title:"\uC2E4\uD589 \uC601\uC218\uC99D \uD68C\uACC4 \uC794\uC5EC \u2014 \uBA38\uC9C0\uB294 \uC9C4\uD589",lines:[...n.map(r=>Pg[r]||r),"\uC790\uB3D9 \uBA38\uC9C0 \uD310\uC815\uC5D0\uB294 \uC601\uD5A5\uC774 \uC5C6\uB2E4 \u2014 \uC815\uC815\uC740 bd update --set-metadata exec_receipt=\u2026 \uB85C"]}}if(t==="qfr"){let n=e.workflow?e.workflow.quick_fix_review:null;if(!n||n.state!=="reviewed"&&n.state!=="stale")return null;let r=Array.isArray(n.missing)?n.missing:[];return{title:n.state==="reviewed"?"quick_fix self-review \uC601\uC218\uC99D\uC774 \uC9C0\uAE08 \uBCF8\uBB38\uACFC \uC77C\uCE58\uD569\uB2C8\uB2E4":"quick_fix self-review \uC601\uC218\uC99D\uC774 \uC9C0\uAE08 \uBCF8\uBB38\uACFC \uB2E4\uB985\uB2C8\uB2E4",lines:r.length>0?r:["\uBE60\uC9C4 \uD56D\uBAA9 \uC5C6\uC74C"]}}return null}var Ng=["rec","receipt","session_preferred","ineligible","qfr","spec_after_blocker","readiness"];function $i(e,t){for(let n of Ng){if(!t(n))continue;let r=Xa(e,n);return r?{chip_key:n,content:r}:null}return null}function di(e){return e.chip_popover?uo(e.chip_popover.content):""}function br(e,t){return!!e.chip_popover&&e.chip_popover.chip_key===t}var Za="\uC0AC\uC6A9\uC790 \uB9AC\uBDF0 \uD544\uC694";function Ja(e,t=null,n={}){let r=e.worker_ineligible===!0,o=e.draggable&&!e.done&&!r,i=e.queue_placeable===!0&&!e.done&&!r,s=i&&t&&t.bead_id===e.id,l=e.session_preferred===!0,a=hd[e.session_preferred_reason||""]||"",u=e.workflow,d=e.missing_description===!0,p=e.awaiting_user===!0,_=typeof e.reason=="string"&&e.reason.startsWith("\u26D4"),m=br(e,"spec_after_blocker"),v=Ig(e.spec_after_blocker===!0,m),O=pd(e),R=br(e,"readiness"),Q=Lg(O,R),ee=c`${v}${m?di(e):""}${Q}${R?di(e):""}`,K=bi(e.dependency_chips,v===""&&Q===""?"":ee),L=e.workspace_name?c`<span class="worker-card__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:"",I=yi(e.cross_lane_chip),P=vi(u),F=_d(e.from_id),G=!!(e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker)),q=!r&&(e.blocked===!0||e.queue_placeable===!1);return c`<div
    class="worker-card${o?"":" worker-card--static"}${r?" worker-card--ineligible":""}${q?" worker-card--blocked":""}${e.search_match===!1?" is-dimmed":""}"
    draggable=${o?"true":"false"}
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    <div class="worker-card__head">
      ${o?c`<span class="worker-card__grip" aria-hidden="true">⠿</span>`:""}
      <span class="worker-card__id" title="클릭하면 ID 복사">${e.id}</span
      >${wi(e.priority)}
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
            </button>`:""}${ki(e.rec,br(e,"rec"))}${Dg(u,br(e,"qfr"))}
      ${m||R?"":di(e)}
    </div>
    <div class="worker-card__title">${e.title}</div>
    ${u?zs(u,e.status,{onOpenDoc:n.onOpenDoc}):""}${K}
    ${L||I||P||F||G?c`<div class="worker-chips">
          ${L}${I}${P}${F}${hi(e.exec_chips,{pin:n.exec_chips_mode==="pinned_only"})}
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
    <span class="worker-wait__area-name">${t}</span>`}function xi(e){let t=e.parallel,n=e.serial,r=t.drop||{};return c`<div class="worker-wait">
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
  </div>`}function Ai(e){return e.count?c`<section
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
  </section>`:""}var bd=[{step:"merge",label:"\uBA38\uC9C0",index:1},{step:"base",label:"base",index:2},{step:"verify",label:"\uAC80\uC99D",index:3},{step:"deploy",label:"\uBC30\uD3EC",index:4},{step:"child",label:"\uC790\uC2DD",index:5},{step:"branch",label:"\uBE0C\uB79C\uCE58",index:6},{step:"close",label:"close",index:7}],Zo=[{step:"base_containment",label:"base \uD3EC\uD568 \uD655\uC778"},{step:"repo_operations",label:"\uC800\uC7A5\uC18C \uC791\uC5C5"},{step:"post_merge_jobs",label:"\uBA38\uC9C0 \uD6C4 \uC7A1"},{step:"child_sweep",label:"\uC790\uC2DD \uC815\uB9AC"},{step:"branch_cleanup",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC"},{step:"parent_close",label:"\uBD80\uBAA8 close"}];function Si(e,t){let n=bd.find(o=>o.step===e);if(!n)return null;let r=bd.length;return{step:n.step,label:t,index:n.index,total:r,percent:Math.round(n.index/r*100)}}function yd(e){let t=Zo.findIndex(n=>n.step===e);return Zo.map((n,r)=>({step:n.step,label:n.label,state:t<0?"todo":r<t?"done":r===t?"stall":"todo"}))}function Fr(e){let t=Zo.find(n=>n.step===e);return t?t.label:typeof e=="string"?e:""}function Fg(e){let t=Zo.findIndex(n=>n.step===e);return t<0?null:{index:t+1,total:Zo.length}}function Ei(e){let t=Fg(e);return t?`\uBA38\uC9C0 \uC644\uB8CC \xB7 \uC815\uB9AC ${t.total}\uB2E8\uACC4 \uC911 ${t.index}\uB2E8\uACC4\uC5D0\uC11C \uBA48\uCDA4`:"\uBA38\uC9C0\uB428 \xB7 \uC815\uB9AC \uBBF8\uC644"}var tl=new Set(["queued","running","retry_pending"]),vd=new Set(["failed","succeeded"]),Bg={queued:"\uB300\uAE30",running:"\uC911",retry_pending:"\uC7AC\uC2DC\uB3C4 \uB300\uAE30",failed:"\uC2E4\uD328",succeeded:"\uC644\uB8CC \xB7 \uC815\uB9AC \uC7AC\uC2DC\uB3C4 \uB300\uAE30"},Jo={base_containment:{step:"base",label:"base \uD655\uC778 \uC911"},child_sweep:{step:"child",label:"\uC790\uC2DD \uC815\uB9AC \uC911"},branch_cleanup:{step:"branch",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC \uC911"},parent_close:{step:"close",label:"\uBD80\uBAA8 close \uC911"}},Ug={merging:{step:"merge",label:"\uBA38\uC9C0 \uC911"},base_containment:Jo.base_containment,child_sweep:Jo.child_sweep,branch_cleanup:Jo.branch_cleanup,parent_close:Jo.parent_close};function Wg(e){return typeof e=="string"&&/^[0-9a-f]{40}$/.test(e)}function zg(e,t,n){return!["verify","deploy"].includes(e.kind)||![...tl,...vd].includes(e.state)||![null,void 0,""].includes(e.superseded_by)||!Array.isArray(e.subjects)?!1:e.subjects.some(r=>r&&typeof r=="object"&&r.bead_id===t&&r.merged_sha===n)}function Hg(e,t){let n=(t.kind==="deploy"?2:1)-(e.kind==="deploy"?2:1);if(n!==0)return n;let r=u=>u.state==="succeeded"?1:2,o=r(t)-r(e);if(o!==0)return o;let i=typeof e.requested_at=="number"?e.requested_at:0,s=typeof t.requested_at=="number"?t.requested_at:0;if(i!==s)return s-i;let l=typeof e.operation_id=="string"?e.operation_id:"",a=typeof t.operation_id=="string"?t.operation_id:"";return l.localeCompare(a)}function el(e,t=!1){let n=e.kind,r=n==="verify"?"\uAC80\uC99D":"\uBC30\uD3EC",o=t?"failed":e.state,i=Bg[o];if(!i)return null;let s=Si(n,`${r} ${i}`);return s?{...s,active:tl.has(o),failed:o==="failed"}:null}function Kg(e){return!e||typeof e!="object"?null:Ug[e.step]||null}function es(e){if(!e||typeof e.bead_id!="string")return null;let t=e.bead_id,n=e.merge_progress&&typeof e.merge_progress=="object"?e.merge_progress:{},r=Kg(n),o=e.cleanup_failed&&typeof e.cleanup_failed=="object"?e.cleanup_failed:null,i=["post_merge_jobs","child_sweep","branch_cleanup","parent_close"].includes(typeof e.cleanup_cursor=="string"?e.cleanup_cursor:""),s=!i&&(e.cleanup_cursor==="repo_operations"||n.step==="repo_operations"),l=Wg(e.merge_sha)?e.merge_sha:null,a=!i&&l&&Array.isArray(e.repo_operations)?e.repo_operations.filter(v=>v&&typeof v=="object"&&zg(v,t,l)).sort(Hg):[],u=s?a:[],d=u.find(v=>tl.has(v.state));if(d)return el(d);if(o)return o.step==="repo_operations"&&a[0]?el(a[0],!0):null;let p=u.find(v=>vd.has(v.state)?v.state!=="succeeded"||e.cleanup_cursor==="repo_operations":!1);if(p)return el(p);if(r){let v=Si(r.step,r.label);return v?{...v,active:!0,failed:!1}:null}let _=typeof e.cleanup_cursor=="string"?Jo[e.cleanup_cursor]:null;if(!_)return null;let m=Si(_.step,_.label);return m?{...m,active:!0,failed:!1}:null}function Ti(e){return!!e&&e.step!=="merge"&&e.failed!==!0}var Gg="\uBBF8\uC801\uC7AC";function nl(e,t){let n=Jn(e,t.id);return{id:t.id,label:`\u26D3 ${t.id}`,title:`\uC120\uD589 \u2014 close\uB420 \uB54C\uAE4C\uC9C0 \uCD9C\uBC1C\uD558\uC9C0 \uC54A\uB294\uB2E4 (${t.location_label})`,...n?{foreign:!0}:{}}}var Yg=10080*60*1e3;function kd(e,t,n){let r=t.closed_at;if(typeof r!="number"||!Number.isFinite(r)||r<n-Yg)return null;let o=Jn(e,t.id),i=typeof t.root_dir=="string"?t.root_dir:"",s={id:t.id,label:`\u{1F513} ${t.id}`,title:`\uD574\uC81C \u2014 ${on(r)}\uC5D0 close\uB418\uC5B4 \uC774 \uC774\uC288\uAC00 \uD480\uB838\uB2E4`,...o?{foreign:!0}:{}};return o?i.length>0&&(s.openable=!0,s.root_dir=i):s.openable=!0,s}function wd(e,t){let n=Array.isArray(t.ids)?t.ids.filter(i=>typeof i=="string"&&i.length>0):[],r=t.root_dirs&&typeof t.root_dirs=="object"?t.root_dirs:{},o=[];for(let i of[...new Set(n)].sort()){let s=Jn(e,i),l=typeof r[i]=="string"?r[i]:"",a={id:i,label:`\u2192 ${i}`,title:"\uD6C4\uC18D \u2014 \uC774 \uC774\uC288\uAC00 close\uB418\uBA74 \uD480\uB9B0\uB2E4",...s?{foreign:!0}:{}};l.length>0?(a.openable=!0,a.root_dir=l):s||(a.openable=!0),o.push(a)}return o}function $d(e,t,n={}){let r=new Map,o=new Map;for(let i of t)o.has(i.id)||o.set(i.id,i.location_label);for(let[i,s]of e){if(typeof i!="string"||i.length===0)continue;let l=[];for(let a of Array.isArray(s)?s:[]){if(typeof a!="string"||a.length===0)continue;let u=nl(i,{id:a,location_label:o.get(a)||Gg}),d=n[a];u.foreign!==!0?u.openable=!0:typeof d=="string"&&d.length>0&&(u.openable=!0,u.root_dir=d),l.push(u)}l.length>0&&r.set(i,l)}return r}var Oi=1,ts=[{value:"repo_spec",label:"\uB808\uD3EC \xB7 spec \uC6B0\uC120"},{value:"repo_updated",label:"\uB808\uD3EC \xB7 \uCD5C\uC2E0 \uC218\uC815"},{value:"updated_flat",label:"\uCD5C\uC2E0 \uC218\uC815(\uB808\uD3EC \uBB34\uC2DC)"}],ns=[{value:"all",label:"\uC804\uCCB4"},{value:"ready",label:"\uCC29\uC218 \uAC00\uB2A5"},{value:"not_ready",label:"\uC900\uBE44 \uD544\uC694"}],vo={show_blocked:!0,readiness:"all"},xd={auto_merge:"\uC790\uB3D9 \uBA38\uC9C0",merged:"\uBA38\uC9C0",merge:"\uBA38\uC9C0",pr_stop:"PR \uC911\uB2E8",stopped:"\uC911\uB2E8",failed:"\uC2E4\uD328",refuted:"\uBC18\uC99D",no_delta:"\uBB34-delta"};function Vg(e,t){let n=null;for(let r of Object.values(e||{}))!r||r.bead_id!==t||!rr(r)||(n=typeof r.status=="string"?r.status:null);return n}function Qg(e,t){let n=null,r=-1/0;for(let o of Object.values(e)){if(!o||o.bead_id!==t||o.status==="running"||!rr(o))continue;let i=typeof o.finished_at=="number"?o.finished_at:typeof o.started_at=="number"?o.started_at:0;i>=r&&(r=i,n=o)}return n}function td(e){let t=it(e),n=new Map;for(let r of Array.isArray(t.done)?t.done:[])r&&typeof r.bead_id=="string"&&typeof r.added_at=="number"&&n.set(r.bead_id,r.added_at);return new Set(Rd(it(t.attempts),n).keys())}function Rd(e,t,n={}){let{winners:r,resumed_from_ids:o}=xu(e,t),i=new Map;for(let[s,l]of r){let a=l.attempt,u=l.run_state;if(Ld(a))continue;let d=l.started_at,p=typeof a.session_id=="string"&&a.session_id.length>0,m=ii(a.quickfix_landing)==="session",v=u!=="running"&&(p||!m)&&!o.has(a.attempt_id),O=!p&&m?"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":o.has(a.attempt_id)?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":null,R=it(n.observations?.[s]),Q=it(R.pr),ee=typeof a.merge_sha=="string"&&a.merge_sha.length>0||Q.state==="MERGED",K=or(n.discard_operations,s,{attempt_id:a.attempt_id,merged:ee}),L=u==="failed"?Sd(a,{resume_eligible:v,resume_reason:O,confirmation:K.confirmation,history:n.bead_timelines?.[s]}):null;i.set(s,{...Ad(a,e,u),started_at:d,...L?{failure:L}:{},can_pause:u==="running"&&p,can_resume:v})}for(let[s,l]of oh(e,t)){if(i.has(s))continue;let a=l.attempt,u=or(n.discard_operations,s,{attempt_id:a.attempt_id}),d=Dd(a),p=l.run_state==="provider_hold"?nh(a,{provider_hold:n.provider_hold,auto_resume_pending:n.auto_resume_pending,account_catalog:n.account_catalog,attempts:e,history:n.bead_timelines?.[s]}):null;i.set(s,{...Ad(a,e,l.run_state),started_at:typeof a.started_at=="number"?a.started_at:null,...l.run_state==="parked"?{failure:Sd(a,{resume_eligible:!1,resume_reason:"\uC138\uC158 \uB300\uAE30 \u2014 [\uC7AC\uC2DC\uB3C4]\uAC00 \uC0C8 attempt\uB97C \uB744\uC6C1\uB2C8\uB2E4",confirmation:u.confirmation,history:n.bead_timelines?.[s]})}:{},...l.run_state==="waiting"?{wait:Xg(a)}:{},...p?{hold:p}:{},...d?{retry:d}:{},can_pause:!1,can_resume:l.run_state==="provider_hold"})}return i}function Ad(e,t,n){return{attempt_id:typeof e.attempt_id=="string"?e.attempt_id:"",run_state:n,last_event_at:typeof e.last_event_at=="number"?e.last_event_at:null,last_activity:e.last_activity&&typeof e.last_activity=="object"?e.last_activity:null,legs:Array.isArray(e.legs)?e.legs:[],runner:typeof e.runner=="string"?e.runner:null,model:typeof e.model=="string"?e.model:null,effort:typeof e.effort=="string"?e.effort:null,speed:typeof e.speed=="string"?e.speed:null,resumed_from:typeof e.resumed_from=="string"?e.resumed_from:null,continuation_mode:e.continuation_mode==="session"||e.continuation_mode==="fresh"?e.continuation_mode:null,status:typeof e.status=="string"?e.status:null,usage:nr(t,e.bead_id)}}function Sd(e,t){let n=e.cause_detail&&typeof e.cause_detail=="object"?e.cause_detail:null;return{cause:typeof e.cause=="string"?e.cause:null,cause_detail:n,summary:n&&typeof n.summary=="string"?n.summary:null,bead_id:typeof e.bead_id=="string"?e.bead_id:"",finished_at:typeof e.finished_at=="number"?e.finished_at:null,runner:typeof e.runner=="string"?e.runner:null,model:typeof e.model=="string"?e.model:null,effort:typeof e.effort=="string"?e.effort:null,observed_effort:typeof e.observed_effort=="string"?e.observed_effort:null,speed:typeof e.speed=="string"?e.speed:null,attempt_id:typeof e.attempt_id=="string"?e.attempt_id:"",usage:e.usage&&typeof e.usage=="object"?e.usage:null,halted_auto_advance:e.halted_auto_advance===!0,quickfix_lane:e.quickfix_lane===!0,quickfix_landing:e.quickfix_landing&&typeof e.quickfix_landing=="object"?e.quickfix_landing:null,retry:Dd(e),resume_eligible:t.resume_eligible,resume_reason:t.resume_reason,landed:ud(e),confirmation:t.confirmation,...Id(t.history)}}function Id(e){if(!e||typeof e!="object")return{};let t=Array.isArray(e.events)?e.events:[],n=[];for(let o of t)!o||typeof o!="object"||typeof o.summary!="string"||o.summary.length===0||n.push({event_id:typeof o.event_id=="string"?o.event_id:"",kind:typeof o.kind=="string"?o.kind:"",summary:o.summary,at:typeof o.at=="number"?o.at:null});n.reverse();let r=typeof e.log_path=="string"&&e.log_path.length>0?e.log_path:null;return{...n.length>0?{timeline:n}:{},...r===null?{}:{log_path:r},...e.log_expired===!0?{log_expired:!0}:{},...e.log_unreadable===!0?{log_unreadable:!0}:{}}}function Xg(e){let t=e.cause_detail&&typeof e.cause_detail=="object"?e.cause_detail:null,n=Array.isArray(t?.blockers)?t.blockers:[],r=[];for(let o of n)!o||typeof o!="object"||typeof o.id!="string"||o.id.length===0||r.push({id:o.id,rig:typeof o.rig=="string"?o.rig:null,status:typeof o.status=="string"?o.status:""});return{summary:t&&typeof t.summary=="string"?t.summary:null,blockers:r,since:typeof e.finished_at=="number"?e.finished_at:null}}function Ld(e){return e?.status==="paused"&&typeof e.cause=="string"&&e.cause.startsWith("provider_outage:")}function Zg(e,t){let n=typeof e.runner=="string"?e.runner:"",r=it(t)[n];return!r||!Array.isArray(r.targets)?null:r.targets.find(o=>Array.isArray(o?.attempt_ids)&&o.attempt_ids.includes(e.attempt_id))||null}function Jg(e,t){if(e===null)return null;let n=it(t).claude;if(!Array.isArray(n))return null;let r=n.find(o=>o?.email===e);return r&&typeof r.alias=="string"&&r.alias.length>0?r.alias:null}function eh(e,t){let n=e,r=new Set;for(;n&&!r.has(n.attempt_id);){if(r.add(n.attempt_id),n.auto_resume_kind==="provider_outage")return!0;n=typeof n.resumed_from=="string"?t[n.resumed_from]:null}return!1}function th(e,t,n,r){if((Array.isArray(r.auto_resume_pending)?r.auto_resume_pending:[]).some(s=>s?.attempt_id===e.attempt_id))return"pending";let i=e.auto_resume_refused;return typeof i=="string"&&i.length>0?`refused:${i}`:n.startsWith("auto_resume_disarmed:")||t?.auto_switch==="cap"||eh(e,r.attempts)?"disarmed":null}function nh(e,t){let n=e.cause.slice(16),r=e.cause_detail&&typeof e.cause_detail=="object"?e.cause_detail:null,o=Zg(e,t.provider_hold),i=typeof o?.model=="string"&&o.model.length>0?o.model:typeof e.model=="string"&&e.model.length>0?e.model:null,s=typeof o?.account=="string"&&o.account.length>0?o.account:typeof e.claude_account=="string"&&e.claude_account.length>0?e.claude_account:null,l=typeof o?.last_error=="string"?o.last_error:"",a=th(e,o,l,{auto_resume_pending:t.auto_resume_pending,attempts:t.attempts}),u=typeof o?.resets_at=="number"?o.resets_at:typeof r?.resets_at=="number"?r.resets_at:null,d=typeof o?.next_probe_at=="number"?o.next_probe_at:null,p=Jg(s,t.account_catalog),_=Id(t.history);return{kind:o?.kind==="usage_limit"||n==="usage_limit"?"usage_limit":"outage",detail:n,...typeof r?.message=="string"?{message:r.message}:{},...typeof r?.summary=="string"?{summary:r.summary}:{},...i||s?{target:{...i?{model:i}:{},...s?{account:s}:{},...p?{account_alias:p}:{}}}:{},...u===null?{}:{resets_at:u},...a===null?{}:{auto_resume:a},...o?.auto_switch==="none"||o?.auto_switch==="disabled"?{auto_switch:o.auto_switch}:{},...d===null?{}:{next_probe_at:d},..._.log_path?{log_path:_.log_path}:{}}}function Dd(e){let t=e&&e.retry&&typeof e.retry=="object"?e.retry:null;return t?{cause:typeof t.cause=="string"?t.cause:null,attempts:typeof t.attempts=="number"?t.attempts:0,max:typeof t.max=="number"?t.max:0,next_at:typeof t.next_at=="number"?t.next_at:null}:null}var rh=new Set(["parked","retry_wait","waiting"]);function oh(e,t){let n=Object.values(e||{}),r=new Set(n.map(s=>s?.resumed_from).filter(s=>typeof s=="string")),o=new Map;for(let s of n)s&&typeof s.bead_id=="string"&&rr(s)&&o.set(s.bead_id,s.attempt_id);let i=new Map;for(let s of n){let l=Ld(s);if(!s||typeof s.bead_id!="string"||s.bead_id.length===0||!rr(s)||!rh.has(s.status)&&!l||o.get(s.bead_id)!==s.attempt_id||typeof s.dismissed_at=="number"||l&&r.has(s.attempt_id))continue;let a=t.get(s.bead_id);typeof a=="number"&&a>0&&typeof s.finished_at=="number"&&a>=s.finished_at||i.set(s.bead_id,{attempt:s,run_state:l?"provider_hold":s.status})}return i}function Ed(e,t){let n=e[t];if(!n)return"";if(n.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let r=typeof n.reason=="string"?n.reason:"";if(r==="prerequisite_unmet"&&Array.isArray(n.blockers)&&n.blockers.length>0)return"\u26D3 \uC120\uD589 \uB300\uAE30";let o=r.indexOf(":");return o>0&&o<r.length-1?`\u26D4 ${r.slice(0,o)} (${r.slice(o+1)})`:`\u26D4 ${r}`}function it(e){return e&&typeof e=="object"?e:{}}function sh(e){let t=it(e).badge_codes;return Array.isArray(t)?t.filter(n=>typeof n=="string"&&n.length>0):[]}function ih(e,t,n){let r=it(t);if(Object.keys(r).length===0)return null;let o=e.execution_defaults,i=e.runner_catalog,s=e.session_defaults;if(!o||!i||!s)return null;let l=_=>En({pin:_,global:s,execution_defaults:o,runner_catalog:i,route:n}),a,u;try{a=l(r),u=l(null)}catch{return null}let d=Td(go(a,i),go(u,i)),p=Td(Mr(a,null),Mr(u,null));return d||p?{orchestration:d,worker:p}:null}function Td(e,t){return!e||t&&t.text===e.text?null:e}function ah(e,t,n){let o=(t&&typeof t=="object"&&Array.isArray(t.released_by)?t.released_by:[]).filter(s=>s&&typeof s=="object"&&typeof s.id=="string").slice().sort((s,l)=>(typeof l.closed_at=="number"?l.closed_at:0)-(typeof s.closed_at=="number"?s.closed_at:0)),i=[];for(let s of o){let l=kd(e,s,n);l&&i.push(l)}return i.length===0?null:i}function sl(e,t){return typeof e!="string"||e.length===0||typeof t!="string"||t.length===0||t===e?null:`\u2192 ${t}`}var lh=new Set(["quick_fix","spec_backed","full_plan"]);function Cd(e){return typeof e=="string"&&lh.has(e)}function ch(e){let t={...it(e.session_defaults)};for(let n of["orchestration_model","orchestration_effort","orchestration_speed","quick_fix_orchestration_model","quick_fix_orchestration_effort","quick_fix_orchestration_speed"]){let r=e[n];typeof r=="string"&&(t[n]=r)}return t}function uh(e,t,n){let r=e.runner_catalog??null,o=ol(e,t,n,null);if(!o)return null;let i=Mn(r,o.orchestration_model.value??""),s=i===null?o:ol(e,t,n,i)||o,l=go(s,r),a=Mr(s,i);return l||a?{orchestration:l,worker:a}:null}function ol(e,t,n,r){let o=Cd(n)?n:Cd(t.route)?t.route:null;try{return En({pin:t,global:ch(e),execution_defaults:e.execution_defaults??null,runner_catalog:e.runner_catalog??null,route:o,controller_runtime:r})}catch{return null}}function dh(e,t,n){return!t||!Object.hasOwn(t,"metadata")?null:Mr(ol(e,it(t.metadata),t.route,n),n)}function il(e,t){let n=new Set,r=e;for(;r&&!n.has(r.attempt_id);){if(r.conflict_resolution===!0)return!0;n.add(r.attempt_id),r=typeof r.resumed_from=="string"&&r.resumed_from.length>0&&t.get(r.resumed_from)||null}return!1}function ph(e){let t={};for(let l of Gn)t[l]=0;let n=!1,r=0,o=0,i=0;for(let l of e){let a=l.usage;if(!a||typeof a!="object")continue;let u=!1;for(let d of Gn)Number.isFinite(a[d])&&(t[d]+=a[d],n=!0,u=!0);u&&(o+=1,Number.isFinite(a.total_cost_usd)&&(r+=a.total_cost_usd,i+=1))}o>0&&i===o&&(t.total_cost_usd=r);let s=e.map(l=>l.usage).filter(l=>l&&typeof l=="object"&&l.providers);return s.length>0?un(Xs(s)):n?tr(t):null}function Pd(e,t){let n=Ho(e,t);return n==="internal"?"\uBBF8\uC801\uC7AC":n==="external"?"\uC678\uBD80":"\uC704\uCE58 \uBBF8\uD655\uC778"}function fh(e,t,n){let r=t.get(e);if(!r)return Pd(e,n);if(typeof r.position=="number"){if(r.lane==="parallel")return`#${r.position}`;if(/^s[1-5]$/.test(r.lane))return`${r.lane} #${r.position}`}return zo(r)}function _h(e,t,n,r,o,i){let s=t.get(e);if(!s)return{label:i&&Ho(e,n)==="internal"?"\uC9C4\uD589 \uB300\uAE30":Pd(e,n),title:""};if(s.state==="runnable"&&i&&Ho(e,n)==="internal")return{label:"\uC9C4\uD589 \uB300\uAE30",title:""};if(typeof s.position=="number"&&(s.lane==="parallel"||/^s[1-5]$/.test(s.lane))){let a=r.get(e),u=s.lane==="parallel"?"\uBCD1\uB82C":s.lane,d=o.get(e);return{label:!!d&&d.reason==="prerequisite_unmet"&&Array.isArray(d.blockers)&&d.blockers.length>0?"\u26D3 \uC120\uD589 \uB300\uAE30":a&&a.length>0?"\u{1F512} \uB300\uAE30":"\uB300\uAE30",title:`${s.workspace_name||s.root_dir} ${u} #${s.position}`}}return{label:s.state==="running"?"\u25B6 \uC2E4\uD589\uC911":zo(s),title:""}}function mh(e,t){for(let n of Object.values(e||{}))if(n&&n.attempt_id===t&&typeof n.armed_by_lane=="string"&&n.armed_by_lane.length>0)return n.armed_by_lane;return null}function gh(e,t,n,r,o,i){return t==="draft"?{state:"draft",badge:"draft",run_label:null,can_stop:!1}:n.some(s=>i.failed_by_bead.get(s.id)===e)?{state:"failed",badge:"\u26D4 \uC2E4\uD328",run_label:"\u25B6 \uB2E4\uC2DC \uC9C4\uD589",can_stop:!1}:i.disarmed_lanes.has(e)?{state:"restart",badge:"\u23F8 \uC7AC\uC2DC\uC791",run_label:"\u25B6 \uC9C4\uD589",can_stop:!1}:n.some(s=>i.armed_by_bead.get(s.id)===e)?{state:"running",badge:"\u25B6 \uC9C4\uD589 \uC911",run_label:o.length>0?"\u25B6 \uC774\uC5B4\uC11C \uC9C4\uD589":null,can_stop:!0}:r?{state:"all_done",badge:"\uBAA8\uB450 \uC644\uB8CC",run_label:null,can_stop:!1}:{state:"confirmed",badge:"\uD655\uC815",run_label:"\u25B6 \uC9C4\uD589",can_stop:!1}}function hh(e,t,n,r,o,i,s,l){let a=[];return e.forEach((u,d)=>{let p=typeof u.id=="string"?u.id:"";if(p.length===0)return;let _=u.status==="confirmed"?"confirmed":"draft",m=Array.isArray(u.entries)?u.entries:[],v=[];m.forEach((ee,K)=>{let L=ee&&typeof ee.bead_id=="string"?ee.bead_id:"";if(L.length===0)return;let I=ee&&typeof ee.root_dir=="string"?ee.root_dir:"",P=n.get(L),F=P?P.state:void 0,G=F==="running"||F==="pr_wait"||F==="done",q=!P||F==="runnable",N=P&&P.lane==="parallel"&&typeof P.position=="number"?P.position-1:null,H=_h(L,n,r,t,l,_==="confirmed"),W=v.length>0?v[v.length-1]:null,ne=_==="confirmed"&&W!==null&&!W.done&&!(t.get(L)||[]).includes(W.id);v.push({id:L,title:o.get(L)||L,root_dir:P?P.root_dir:I,workspace_name:P?P.workspace_name:i.get(I)||"",seq:K+1,location_label:H.label,location_title:H.title,draggable:!G,fixed:G,done:F==="done",unplaced:q,mismatch:ne,...N!==null?{queue_index:N}:{}})}),v.forEach((ee,K)=>{ee.seq=K+1});let O=v.length>0&&v.every(ee=>ee.done),R=v.filter(ee=>!ee.fixed&&s.armed_by_bead.get(ee.id)!==p).map(ee=>ee.id),Q=gh(p,_,v,O,R,s);a.push({lane_id:p,status:_,draft:_==="draft",number:d+1,label:`\uC5F0\uACB0 ${d+1} \xB7 \uB808\uD3EC \uAC04`,rows:v,all_done:O,can_confirm:_==="draft"&&v.length>=2,has_mismatch:_==="confirmed"&&v.some(ee=>ee.mismatch),unlaunched:R,...Q})}),a}function bh(e,t,n){if(e.lane==="runnable"){let s=n.get(e.id);return s?s.length===0?{scope:[],state:"missing"}:{scope:s,state:"declared"}:{scope:[],state:void 0}}let r=t.get(e.root_dir),o=r?r[e.id]:void 0;if(!o||!Array.isArray(o.scope))return{scope:[],state:void 0};let i=o.scope.filter(s=>typeof s=="string"&&s.length>0);return{scope:i,state:i.length===0?"missing":"declared"}}function yh(e,t,n,r,o){let i=new Map;for(let a of[...e.running,...e.queue,...e.runnable,...e.pr_wait]){if(!t.has(a.root_dir))continue;let u=`${a.root_dir}\0${a.id}`,d=i.get(u);if(d){d.cards.push(a);continue}let{scope:p,state:_}=bh(a,t,n);_!==void 0&&(a.scope_state=_),i.set(u,{cards:[a],scope:p})}let s=new Map;for(let a of i.values()){let u=a.cards[0].scope_state;if(u!==void 0)for(let _ of a.cards)_.scope_state=u;if(a.scope.length===0)continue;let d=a.cards[0].root_dir,p=s.get(d);p?p.push(a):s.set(d,[a])}let l=(a,u,d)=>{let p=u.cards[0],_={id:p.id,title:p.title,location_label:fh(p.id,r,o),prefixes:d,...typeof p.root_dir=="string"&&p.root_dir.length>0?{root_dir:p.root_dir}:{}};for(let m of a.cards)m.overlap_chips?m.overlap_chips.push(_):m.overlap_chips=[_]};for(let a of s.values())for(let u=0;u<a.length;u+=1)for(let d=u+1;d<a.length;d+=1){let p=ci(a[u].scope,a[d].scope);p.length!==0&&(l(a[u],a[d],p),l(a[d],a[u],p))}}function Od(e,t,n){let r=n?n.get(t)?.root_dir:void 0,o=!Jn(e.id,t),i=typeof e.root_dir=="string"?e.root_dir:"",s=typeof r=="string"&&r.length>0?r:o&&i.length>0?i:"";return s.length>0?{openable:!0,root_dir:s}:o?{openable:!0}:{}}function vh(e,t,n,r){let o=new Set(e?e.ids:[]);for(let l of t&&Array.isArray(t.ids)?t.ids:[])typeof l=="string"&&l.length>0&&o.add(l);if(o.size===0)return{ids:[]};let i={},s={...e?e.root_dirs:{},...t&&t.root_dirs&&typeof t.root_dirs=="object"?t.root_dirs:{}};for(let l of o){let a=s[l];if(typeof a=="string"&&a.length>0){i[l]=a;continue}if(!Jn(n.id,l)){n.root_dir.length>0&&(i[l]=n.root_dir);continue}let u=r.get(l)?.root_dir;typeof u=="string"&&u.length>0&&(i[l]=u)}return{ids:[...o],root_dirs:i}}function rl(e){if(typeof e=="number")return Number.isFinite(e)?e:null;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:null}return null}function Ci(e){if(typeof e=="number"&&Number.isFinite(e))return e;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:0}return 0}function kh(e){let t=typeof e=="string"?e.trim().toLowerCase():"";return t.length===0?null:n=>{let r=typeof n.id=="string"?n.id.toLowerCase():"",o=typeof n.title=="string"?n.title.toLowerCase():"";return r.includes(t)||o.includes(t)}}function wh(e,t){let n=[e.runnable,e.runnable_all,e.queue,e.running,e.pr_wait,e.done,e.parallel_rows];for(let o of e.runnable_sections)n.push(o.items);let r=[];for(let o of e.queue_groups){n.push(o.items,o.sublanes.parallel);for(let i of o.sublanes.serial)n.push(i.items),r.push(i.occupants)}for(let o of n)for(let i of o)i.search_match=t(i);for(let o of r)for(let i of o)i.search_match=t(i)}function yr(e,t,n){let r=Array.isArray(e)?e:[],o=Array.isArray(t)?t:[],i=n&&typeof n.done_since=="number"?n.done_since:void 0,s={...vo,...n&&n.candidate_filter?n.candidate_filter:{}},l=n&&Object.hasOwn(n,"cross_lanes")?n.cross_lanes??null:void 0,a=n&&n.candidate_sort==="as_given"?"as_given":n&&ts.some(x=>x.value===n.candidate_sort)?n.candidate_sort:"repo_spec",u=n&&n.groups==="all"?"all":"nonempty",d=n&&n.candidate_hidden_counts==="per_control"?"per_control":"sequential",p=Date.now(),_=new Map;for(let x of o)x&&typeof x.root_dir=="string"&&_.set(x.root_dir,x);let m=new Map;for(let x of o)x&&typeof x.root_dir=="string"&&m.set(x.root_dir,x.name||x.root_dir);for(let x of r)x&&typeof x.root_dir=="string"&&m.set(x.root_dir,x.name||x.root_dir);let v=[],O=[],R=[],Q=[],ee=[],K=[],L=new Map,I=new Map,P=new Map,F=new Map,G=new Map,q=new Map,N=new Map,H=new Map,W=new Map,ne=new Map,he=new Map,qe=new Map,B=new Map,te=new Map,me=new Set,Te=new Map,C=new Map,se=new Map;for(let x of r){if(!x||typeof x.root_dir!="string")continue;let Z=x.root_dir,Oe=x.name||Z,Ye=_.get(Z),at=Ye&&typeof Ye.revision=="number"?Ye.revision:typeof x.revision=="number"?x.revision:0,Fe=it(x.attempts),Je=it(x.bead_titles);for(let[f,k]of Object.entries(Je))typeof k=="string"&&k.length>0&&se.set(f,k);let qt=it(x.bead_times),lt=it(x.pr_observations),At=it(x.admission);for(let[f,k]of Object.entries(At))k&&typeof k=="object"&&he.set(f,k);let Bt=it(x.revise_parked),Pt=it(x.merge_queue_state),Nt=it(x.cleanup_failed),ue=it(x.discard_operations),ke=it(x.bead_timelines),Ge=it(x.bead_blocked_by);Object.hasOwn(x,"bead_scope")&&Te.set(Z,it(x.bead_scope));let rt=it(x.bead_workflow),et=it(x.pr_activity),ht=Array.isArray(x.repo_operations)?x.repo_operations:[];H.set(Z,ht);let je=typeof x.declared_base=="string"?x.declared_base:null;N.set(Z,je),q.set(Z,Object.entries(Nt).map(([f,k])=>({bead_id:f,step:k&&k.step?k.step:"",reason:k&&k.reason?k.reason:"",at:k&&typeof k.at=="number"?k.at:null,detail:k&&typeof k.detail=="string"?k.detail:null,output_tail:k&&typeof k.output_tail=="string"&&k.output_tail?k.output_tail:void 0,log_path:k&&typeof k.log_path=="string"&&k.log_path?k.log_path:void 0,retry_count:k&&typeof k.retry_count=="number"&&Number.isInteger(k.retry_count)&&k.retry_count>0?k.retry_count:0,failure_code:k&&typeof k.failure_code=="string"?k.failure_code:void 0})));for(let[f,k]of Object.entries(it(x.bead_overlay)))k&&typeof k=="object"&&W.set(`${Z}\0${f}`,k);let tt=new Map;for(let f of Object.values(Fe))f&&typeof f.attempt_id=="string"&&tt.set(f.attempt_id,f);let Ne=Array.isArray(x.merge_queue)?x.merge_queue:[],S=new Set(Ne.filter(f=>f&&typeof f.bead_id=="string").map(f=>f.bead_id)),j=new Map(Ne.filter(f=>f&&typeof f.bead_id=="string").map(f=>[f.bead_id,f])),ce=new Map,Ae=new Map,be=new Map,yt=new Map;Ne.forEach((f,k)=>{f&&typeof f.bead_id=="string"&&(ce.set(f.bead_id,k+1),Ae.set(f.bead_id,f.resolution),be.set(f.bead_id,f.continuation_action||null),yt.set(f.bead_id,f.authority||null))});let wt=it(x.auto_merge_skips),$t=f=>{let k=wt[f];if(!k)return null;let U=it(it(lt[f]).pr).head_sha;return U&&U===k.head_sha?k.reason||"":null};G.set(Z,{positions:ce,resolutions:Ae,continuations:be,authorities:yt,state:{active:typeof Pt.active=="string"?Pt.active:null,failures:it(Pt.failures),waiting:Pt.waiting&&typeof Pt.waiting.bead_id=="string"&&typeof Pt.waiting.reason=="string"?Pt.waiting:null},auto_excluded:(Array.isArray(x.pr_wait)?x.pr_wait:[]).map(f=>f&&f.bead_id).filter(f=>typeof f=="string"&&$t(f)!==null),running:Ne.length>0});let xt=Array.isArray(x.queue)?x.queue:[];for(let f of[...xt,...Array.isArray(x.pr_wait)?x.pr_wait:[]])f&&typeof f.bead_id=="string"&&typeof f.armed_by_lane=="string"&&f.armed_by_lane.length>0&&B.set(f.bead_id,f.armed_by_lane);for(let f of Array.isArray(x.disarmed_on_load)?x.disarmed_on_load:[])typeof f=="string"&&f.length>0&&me.add(f);let Gt=(Array.isArray(x.serial_lanes)?x.serial_lanes:[]).filter(f=>f&&/^s[1-5]$/.test(f.id)&&Array.isArray(f.entries)),Ht=it(x.lane_states),Ut=typeof x.serial_lane_count=="number"?Math.max(0,Math.min(5,Math.floor(x.serial_lane_count))):Math.min(5,Gt.length);P.set(Z,Ut),F.set(Z,xt.length);let Et=new Map(Gt.map(f=>[f.id,f])),rn=new Map;for(let f of Gt)for(let k of f.entries)k&&typeof k.bead_id=="string"&&rn.set(k.bead_id,f.id);for(let[f,k]of Object.entries(it(x.bead_dependents))){let U=Array.isArray(k?.ids)?k.ids:[],ie=it(k?.root_dirs),le=qe.get(f)||{ids:new Set,root_dirs:{}};for(let Be of U)typeof Be=="string"&&Be.length>0&&le.ids.add(Be);for(let[Be,gt]of Object.entries(ie))typeof gt=="string"&&gt.length>0&&(le.root_dirs[Be]=gt);qe.set(f,le)}for(let[f,k]of Object.entries(Ge))Array.isArray(k)&&ne.set(f,k.filter(U=>typeof U=="string"&&U.length>0));let tn=Array.isArray(x.done)?x.done:[];for(let f of tn)f&&typeof f.bead_id=="string"&&K.push({id:f.bead_id,root_dir:Z,workspace_name:Oe});let Wt=new Map;for(let f of tn)f&&typeof f.bead_id=="string"&&typeof f.added_at=="number"&&Wt.set(f.bead_id,f.added_at);let Ot=f=>({id:f,title:Je[f]||f,root_dir:Z,workspace_name:Oe,expected_revision:at,draggable:!1,...it(qt[f]).created_at?{created_at:it(qt[f]).created_at}:{},...it(qt[f]).updated_at?{updated_at:it(qt[f]).updated_at}:{}}),Qt=f=>{let k=rt[f]?.chips?.pr;return k&&typeof k.number=="number"&&typeof k.url=="string"?{pr_number:k.number,pr_url:k.url}:{}},we=f=>Object.hasOwn(Ge,f)?{blocked_by:Array.isArray(Ge[f])?Ge[f].filter(k=>typeof k=="string"&&k.length>0):[]}:{},T=(f,k)=>{let U=we(f),ie=At[f],le=ie&&ie.reason==="prerequisite_unmet"&&Array.isArray(ie.blockers)?ie.blockers:[],Be=[...(k?.blockers||[]).map(vt=>vt.id),...le.map(vt=>vt.id)].filter(vt=>typeof vt=="string"&&vt.length>0);if(Be.length===0)return U;let gt=[...U.blocked_by||[]];for(let vt of Be)gt.includes(vt)||gt.push(vt);return{blocked_by:gt}},pe=new Set;for(let[f,k]of Rd(Fe,Wt,{discard_operations:ue,observations:lt,bead_timelines:ke,provider_hold:it(x.provider_hold),auto_resume_pending:Array.isArray(x.auto_resume_pending)?x.auto_resume_pending:[],account_catalog:it(x.account_catalog)})){pe.add(f);let U=k.run_state==="failed"?mh(Fe,k.attempt_id):null;U!==null&&te.set(f,U);let ie=tt.get(k.attempt_id)||null,le=W.get(`${Z}\0${f}`),Be=le&&le.rollup?le.rollup:null,gt=sl(je,ie?ie.target_base:null),vt=ie?il(ie,tt):!1,ct=ie&&ie.quickfix_lane===!0&&ie.quickfix_landing&&typeof ie.quickfix_landing=="object"?ie.quickfix_landing:null,A=ct&&typeof ct.reason=="string"&&ct.reason.length>0?ct.reason:null,$=ct?es({bead_id:f,merge_sha:ct.head_sha,cleanup_cursor:ct.cursor,cleanup_failed:A?{step:ct.cursor,reason:A}:null,repo_operations:ht}):null;O.push({...Ot(f),lane:"running",...T(f,k.wait),...rn.has(f)?{serial_lane_id:rn.get(f)}:{},attempt_id:k.attempt_id,run_state:k.run_state,status:k.status||void 0,workflow:rt[f]||null,can_pause:k.can_pause,can_resume:k.can_resume,started_at:k.started_at,last_event_at:k.last_event_at,last_activity:k.last_activity,legs:k.legs,runner:k.runner,model:k.model,effort:k.effort,speed:k.speed,resumed_from:k.resumed_from,continuation_mode:k.continuation_mode,usage:k.usage,failure:k.failure||null,hold:k.hold||null,wait:k.wait||null,retry:k.retry||null,exec_chips:{orchestration:Wa(k),worker:dh(it(Ye),le,k.runner||null)},discard:or(ue,f,{attempt_id:k.attempt_id,merged:k.failure?.confirmation==="merged"||it(lt[f]).pr?.state==="MERGED"}),...Be?{rollup:Be}:{},...vt?{conflict_resolution:!0}:{},...gt?{base_exception:gt}:{},...$?{landing:$}:{},badges:k.run_state==="paused"?["\u23F8 \uC77C\uC2DC\uC815\uC9C0"]:k.run_state==="failed"?["\u26A0 \uC2E4\uD328"]:k.run_state==="parked"?["\u23F8 \uC138\uC158 \uB300\uAE30"]:k.run_state==="retry_wait"?["\u21BB \uC7AC\uC2DC\uB3C4 \uB300\uAE30"]:k.run_state==="waiting"?["\u26D3 \uC120\uD589 \uB300\uAE30"]:k.run_state==="provider_hold"?["\uACF5\uAE09\uC790 \uBCF4\uB958"]:[],alert:k.run_state==="failed"})}for(let[f,k]of $u(Fe)){if(O.some(ie=>ie.id===f))continue;let U=k.attempt;O.push({...Ot(f),lane:"running",kind:"session",...we(f),attempt_id:typeof U.attempt_id=="string"?U.attempt_id:"",run_state:"running",status:"running",non_occupying:!0,workflow:rt[f]||null,can_pause:!1,can_resume:!1,started_at:k.started_at,last_event_at:typeof U.last_event_at=="number"?U.last_event_at:null,last_activity:U.last_activity&&typeof U.last_activity=="object"?U.last_activity:null,legs:Array.isArray(U.legs)?U.legs:[],runner:typeof U.runner=="string"?U.runner:null,model:typeof U.model=="string"?U.model:null,effort:typeof U.effort=="string"?U.effort:null,speed:typeof U.speed=="string"?U.speed:null,resumed_from:null,continuation_mode:null,usage:U.usage&&typeof U.usage=="object"?U.usage:null,exec_chips:{orchestration:Wa(U),worker:null},discard:or(ue,f,{merge_queued:!0}),badges:[k.origin==="auto"?"\uB9AC\uBDF0 \xB7 \uC790\uB3D9":"\uB9AC\uBDF0"],alert:!1})}for(let f of Array.isArray(x.session_active)?x.session_active:[]){let k=f&&f.bead_id;typeof k!="string"||pe.has(k)||(pe.add(k),Array.isArray(f.blocked_by)&&f.blocked_by.length>0&&ne.set(k,f.blocked_by.filter(U=>typeof U=="string"&&U.length>0)),typeof f.title=="string"&&f.title.length>0&&se.set(k,f.title),O.push({...Ot(k),title:f.title||Je[k]||k,lane:"running",kind:"session",status:"in_progress",started_at:rl(f.started_at)??rl(f.updated_at)??void 0,updated_at:rl(f.updated_at)??void 0,workflow:f.workflow||null,labels:Array.isArray(f.labels)?f.labels:[],spec_id:typeof f.spec_id=="string"?f.spec_id:"",blocked:f.blocked===!0,...Array.isArray(f.blocked_by)?{blocked_by:f.blocked_by.filter(U=>typeof U=="string"&&U.length>0)}:{},draggable:!1,can_pause:!1,can_resume:!1,exec_chips:null,usage:null,legs:[],last_activity:null,session_refs:Array.isArray(f.session_refs)?f.session_refs:[],badges:[],alert:!1}))}for(let f of Array.isArray(x.pr_wait)?x.pr_wait:[]){let k=f&&f.bead_id;if(typeof k!="string"||pe.has(k))continue;pe.add(k);let U=it(lt[k]),ie=it(U.pr),le=U.gate?it(U.gate):null,Be=S.has(k),gt=j.get(k)?.continuation_action||null,vt=!!gt&&gt.continuation===null,ct=Pt.active===k,A=f.external===!0,$=Nt[k]||null,Ie=it(et[k]),Me=es({bead_id:k,merge_sha:f.merge_sha,cleanup_cursor:f.cleanup_cursor,merge_progress:Ie.merge_progress||null,cleanup_failed:$,repo_operations:ht}),st=Ti(Me),St=!!le&&le.base_badge==="\uCDA9\uB3CC",jt=!!$&&["post_merge_jobs","child_sweep","branch_cleanup","parent_close"].includes($.step)&&!!le&&le.tier==="merged",en=A&&!!$&&!!le&&le.tier==="merged",Sr=!!le&&["closed_unmerged","review","undecidable"].includes(le.tier),kn=or(ue,k,{external:A,merge_active:ct||Me?.step==="merge",merge_queued:Be,cleanup_active:st,merged:!!$||le?.tier==="merged"}),Er=!!kn.operation,Kr=sh(U.receipt_check);R.push({...Ot(k),lane:"pr_wait",...we(k),...Kr.length>0?{receipt_badge:{codes:Kr}}:{},workflow:rt[k]||null,pr_number:typeof ie.number=="number"?ie.number:null,pr_url:typeof ie.url=="string"?ie.url:void 0,external:A,usage:nr(Fe,k),merge_step:Me,badges:vt?["\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694"]:Me?[le?.tier==="merged"?"\uBA38\uC9C0\uB428":"\uBA38\uC9C0 \uC911"]:$?[Fr($.step)?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${Fr($.step)}`:"\uC815\uB9AC \uBA48\uCDA4"]:typeof le?.gate_badge=="string"&&le.gate_badge.length>0?[le.gate_badge]:[],alert:Me?Me.failed===!0:!!$||Sr,reason:$&&Me?.active!==!0?Ei($.step):"PR \uB300\uAE30",merge_action:le?.tier==="merged"&&!jt&&!en?!1:!Be||vt,merge_enabled:!Er&&(vt||le?.enabled===!0||St||jt||en),merge_label:vt?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":en||jt?"\uC815\uB9AC \uC7AC\uC2DC\uB3C4":St&&!jt?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":void 0,merge_title:vt?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":Er?kn.error?`\uD3D0\uAE30 \uC2E4\uD328: ${kn.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${kn.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:en?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uB2E4\uC2DC \uC2DC\uB3C4\uD569\uB2C8\uB2E4":jt?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC2DC\uB3C4\uD569\uB2C8\uB2E4":St?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":le?.enabled===!0?`\uBA38\uC9C0 (${le.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4`:`\uBA38\uC9C0 \uBD88\uAC00: ${le?.reason||"\uAD00\uCE21 \uB300\uAE30"}`,cancel_action:Be&&!vt,cancel_enabled:!ct,continuation_mismatch:gt?.mismatch||null,discard:kn,discard_action:kn.action,discard_enabled:kn.enabled,discard_title:kn.title})}let Le=(f,k,U,ie)=>{let le=f&&f.bead_id;if(typeof le!="string"||pe.has(le))return null;pe.add(le);let Be=Bt[le],gt=or(ue,le),vt=gt.operation?gt:null,ct={...Ot(le),lane:k,workflow:rt[le]||null,draggable:!vt,discard:vt||void 0,reason:Ed(At,le),seq:U+1,queue_position:U+1,queue_index:U,queue_length:ie,badges:Be?["\u23F8 REVISE \uD30C\uD0B9"]:[],alert:!!Be,revise_action:!!Be,revise_enabled:!!Be&&!vt,revise_title:Be?Be.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${Be.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":""},A=T(le,null);return Object.hasOwn(A,"blocked_by")&&(ct.blocked_by=A.blocked_by),ct};for(let f=0;f<xt.length;f++){let k=Le(xt[f],"queue",f,xt.length);if(!k)continue;Q.push(k);let U=L.get(Z);U?U.push(k):L.set(Z,[k])}let y=f=>{let k=R.find(Be=>Be.id===f&&Be.root_dir===Z);if(k)return{id:f,title:k.title,badge:"PR \uB300\uAE30 \xB7 \uC810\uC720"};let U=O.find(Be=>Be.id===f&&Be.root_dir===Z),ie=U?U.run_state:Vg(Fe,f),le=ie==="failed"||ie==="orphaned"?"\uC2E4\uD328 \xB7 \uC810\uC720 \uC720\uC9C0":ie==="paused"?"\uC77C\uC2DC\uC815\uC9C0 \xB7 \uC810\uC720":"\uC2E4\uD589 \uC911 \xB7 \uC810\uC720";return{id:f,title:U?U.title:Ot(f).title,badge:le}},b=[];for(let f=0;f<Math.max(Ut,Gt.length);f++){let k=`s${f+1}`,U=Et.get(k),ie=U&&Array.isArray(U.entries)?U.entries:[],le=it(Ht[k]),Be=Array.isArray(le.occupied_by)?le.occupied_by.filter(ct=>typeof ct=="string"):[],gt=new Set(Be),vt=[];for(let ct=0;ct<ie.length;ct++){let A=ie[ct]&&ie[ct].bead_id;if(typeof A=="string"&&gt.has(A)){pe.add(A);continue}let $=Le(ie[ct],k,ct,ie.length);$&&(vt.push($),Q.push($))}vt.length===0&&Be.length===0&&(Ut<=1||f>=Ut)||b.push({id:k,index:f,items:vt,raw_length:ie.length,occupied_by:Be,occupants:Be.map(ct=>y(ct)),corrections:Array.isArray(le.corrections)?le.corrections.length:0,cycle:le.cycle===!0,...vt.length===0&&Be.length===0?{empty:!0}:{}})}I.set(Z,b);let M=Array.from({length:Ut},(f,k)=>{let U=`s${k+1}`,ie=Et.get(U),le=ie&&Array.isArray(ie.entries)?ie.entries:[],Be=it(Ht[U]);return{id:U,index:le.length,length:le.length,occupied_by:Array.isArray(Be.occupied_by)?Be.occupied_by.filter(gt=>typeof gt=="string"):[]}});for(let f of Array.isArray(x.runnable)?x.runnable:[]){let k=f&&f.bead_id;if(typeof k!="string"||pe.has(k))continue;pe.add(k);let U=f.workflow&&typeof f.workflow=="object"?f.workflow:null,ie=U&&typeof U.route=="string"&&U.route||(typeof f.route=="string"?f.route:null),le=ih(it(Ye),f.exec_pins,ie),Be=Wo(f.rec,f.exec_pins);Array.isArray(f.blocked_by)&&f.blocked_by.length>0&&ne.set(k,f.blocked_by.filter(en=>typeof en=="string"&&en.length>0)),typeof f.title=="string"&&f.title.length>0&&se.set(k,f.title),Array.isArray(f.scope)&&C.set(k,f.scope.filter(en=>typeof en=="string"&&en.length>0));let gt=Object.hasOwn(f,"eligible"),ct=!gt&&Object.hasOwn(f,"route")&&Object.hasOwn(f,"spec_state")&&Object.hasOwn(f,"has_description")&&Object.hasOwn(f,"awaiting_user")&&Object.hasOwn(f,"worker_ineligible")?Ga({route:typeof f.route=="string"?f.route:"",spec:f.spec_state,has_description:f.has_description===!0,awaiting_user:f.awaiting_user===!0,worker_ineligible:f.worker_ineligible===!0},null):null,A=gt?f.eligible!==!1:ct?ct.placeable:!0,$=ct?ct.worker_ineligible:f.worker_ineligible===!0,Ie=A&&!$,Me=ct?{route_ok:ct.route_ok,awaiting_user:ct.awaiting_user,missing_description:ct.missing_description,placement_spec:ct.spec}:Object.hasOwn(f,"route_ok")?{route_ok:f.route_ok===!0,awaiting_user:f.awaiting_user===!0,missing_description:f.missing_description===!0,placement_spec:f.placement_spec}:null,st=[];!gt&&ct&&!ct.placeable&&st.push(Nr(ct)),typeof f.reason=="string"&&f.reason.length>0&&st.push(f.reason);let St=Ed(At,k);St&&st.push(St);let jt=ah(k,f.release_info,p)?.map(en=>({...en,...Od({id:k,root_dir:Z},en.id)}));v.push({...Ot(k),title:f.title||Je[k]||k,lane:"runnable",draggable:!gt&&Ie,queue_placeable:Ie,...Me||{},...$?{worker_ineligible:!0}:{},...f.session_preferred===!0?{session_preferred:!0,session_preferred_reason:typeof f.session_preferred_reason=="string"?f.session_preferred_reason:""}:{},...f.spec_after_blocker===!0?{spec_after_blocker:!0}:{},...jt?{dependency_chips:{released:jt}}:{},...f.dependents_info&&typeof f.dependents_info=="object"?{dependents_info:f.dependents_info}:{},reason:st.join(" \xB7 "),created_at:f.created_at??void 0,updated_at:f.updated_at??void 0,status:typeof f.status=="string"?f.status:void 0,labels:Array.isArray(f.labels)?f.labels:[],spec_id:typeof f.spec_id=="string"?f.spec_id:"",published:f.published===!0,workflow:U||(ie?{route:ie,chips:{route:ie}}:null),...le?{exec_chips:le}:{},...Be?{rec:Be}:{},blocked:f.blocked===!0,...Array.isArray(f.blocked_by)?{blocked_by:f.blocked_by.filter(en=>typeof en=="string"&&en.length>0)}:{},place_index:xt.length,place_lanes:M})}for(let f of tn){let k=f&&f.bead_id;if(typeof k!="string"||pe.has(k)||(pe.add(k),i!==void 0&&typeof f.added_at=="number"&&f.added_at<i))continue;let U=Qg(Fe,k),ie=U&&typeof U.done_kind=="string"?U.done_kind:null;ee.push({...Ot(k),lane:"done",done:!0,done_layout:"three_line",usage:nr(Fe,k),work_ms:ad(Fe,k),done_at:typeof f.added_at=="number"?f.added_at:void 0,done_kind:ie,...Qt(k),badges:[...ie&&xd[ie]?[xd[ie]]:[],...sd(Fe,k)]})}for(let f of Array.isArray(x.session_done)?x.session_done:[]){let k=f&&(f.id||f.bead_id);typeof k!="string"||pe.has(k)||(pe.add(k),ee.push({...Ot(k),...f,id:k,root_dir:Z,workspace_name:Oe,expected_revision:at,lane:"done",done:!0}))}}if(W.size>0)for(let x of[...v,...Q,...O,...R,...ee]){let Z=W.get(`${x.root_dir}\0${x.id}`);if(!Z||(typeof Z.priority=="number"&&(x.priority=Z.priority),typeof Z.from_id=="string"&&Z.from_id.length>0&&(x.from_id=Z.from_id),x.lane==="done"&&Array.isArray(Z.carried_to)&&Z.carried_to.length>0&&(x.carried_to=Z.carried_to),!Object.hasOwn(Z,"metadata")))continue;let Oe=it(Z.metadata);if(x.rec=Wo(Oe),x.lane==="runnable"||x.lane.startsWith("s")||x.lane==="queue"){let Ye=uh(it(_.get(x.root_dir)),Oe,typeof Z.route=="string"&&Z.route.length>0?Z.route:it(x.workflow).route);Ye&&(x.exec_chips=Ye)}}let ve=new Map;o.forEach((x,Z)=>{x&&typeof x.root_dir=="string"&&ve.set(x.root_dir,Z)});let ye=n&&n.running_sort==="repo"?"repo":"started";O.sort((x,Z)=>{let Oe=x.kind==="session",Ye=Z.kind==="session";if(Oe!==Ye)return Oe?1:-1;if(Oe&&Ye){let Je=Ci(Z.updated_at)-Ci(x.updated_at);return Je!==0?Je:x.id.localeCompare(Z.id)}if(ye==="repo"){let Je=ve.get(x.root_dir)??Number.MAX_SAFE_INTEGER,qt=ve.get(Z.root_dir)??Number.MAX_SAFE_INTEGER;if(Je!==qt)return Je-qt}let at=typeof x.started_at=="number"&&Number.isFinite(x.started_at)?x.started_at:null,Fe=typeof Z.started_at=="number"&&Number.isFinite(Z.started_at)?Z.started_at:null;return at!==null&&Fe!==null&&at!==Fe?at-Fe:at===null&&Fe!==null?1:at!==null&&Fe===null?-1:x.id.localeCompare(Z.id)}),ee.sort((x,Z)=>(Z.done_at??0)-(x.done_at??0));let De=o.length>0?o:r.map(x=>({root_dir:x&&x.root_dir,name:x&&x.name,auto_advance:x&&x.auto_advance,auto_merge:x&&x.auto_merge,slots:x&&x.slots,revision:x&&x.revision,runner_catalog:x&&x.runner_catalog})),ge=new Set(v.map(x=>x.root_dir)),Re=new Map;for(let x of O)x.kind==="session"||x.run_state!=="running"||Re.set(x.root_dir,(Re.get(x.root_dir)||0)+1);let Ze=new Map;for(let x of ee){let Z=Ze.get(x.root_dir);Z?Z.push(x):Ze.set(x.root_dir,[x])}let ft={positions:new Map,resolutions:new Map,continuations:new Map,authorities:new Map,state:{active:null,failures:{},waiting:null},auto_excluded:[],running:!1},X=[];for(let x of De){if(!x||typeof x.root_dir!="string")continue;let Z=L.get(x.root_dir)||[],Oe=I.get(x.root_dir)||[],Ye=Z.length>0||Oe.some(Je=>Je.items.length>0||Je.occupied_by.length>0);if(u!=="all"&&!Ye&&!ge.has(x.root_dir))continue;let at=typeof x.slots=="number"&&x.slots>=Oi?x.slots:Oi,Fe=Re.get(x.root_dir)||0;X.push({live_count:Fe,over_cap:Fe>at,merge:G.get(x.root_dir)||ft,token_total:ph(Ze.get(x.root_dir)||[]),cleanup_failures:q.get(x.root_dir)||[],declared_base:N.get(x.root_dir)??null,repo_operations:H.get(x.root_dir)||[],root_dir:x.root_dir,name:x.name||x.root_dir,auto_advance:x.auto_advance===!0,auto_merge:x.auto_merge===!0,slots:at,revision:typeof x.revision=="number"?x.revision:0,runner_catalog:it(x.runner_catalog),items:Z,sublanes:{parallel:Z,serial:Oe},serial_lane_count:P.get(x.root_dir)||0,raw_queue_length:F.get(x.root_dir)||0})}let J={runnable:v,runnable_all:v,runnable_hidden:{blocked:0,readiness:0},runnable_sections:[],runnable_flat:a==="updated_flat"||a==="as_given",queue:Q,queue_groups:X,running:O,pr_wait:R,done:ee,parallel_rows:[],chain_lanes:[],cross_lanes_revision:l&&typeof l.revision=="number"?l.revision:null,cross_lanes_unreadable:l===null,parallel_raw_length:Object.fromEntries(F),owner_of:{}},re=Ku(J);for(let x of K)re.has(x.id)||re.set(x.id,{root_dir:x.root_dir,workspace_name:x.workspace_name,lane:"done",state:"done"});for(let x of[...J.queue,...J.runnable,...J.running,...J.pr_wait]){if(!Object.hasOwn(x,"blocked_by"))continue;let Z=re.get(x.id);x.blockers=(x.blocked_by||[]).map(Oe=>Gu(Oe,Z,re,o))}for(let x of[...J.queue,...J.runnable,...J.running,...J.pr_wait]){let Z=(x.blockers||[]).map(at=>({...nl(x.id,at),...Od(x,at.id,re)})),Oe=wd(x.id,vh(qe.get(x.id),x.dependents_info,x,re));if(Z.length===0&&Oe.length===0)continue;let Ye={...x.dependency_chips||{},...Z.length>0?{predecessors:Z}:{},...Oe.length>0?{dependents:Oe}:{}};x.dependency_chips=Ye}yh(J,Te,C,re,o);let ae=Yu(J.queue_groups);for(let x of J.queue_groups)for(let Z of x.sublanes.serial){let Oe=ae.get(Vu(x.root_dir,Z.id));Oe&&(Z.cross_wait_peers=Oe)}J.chain_lanes=hh(l&&Array.isArray(l.lanes)?l.lanes:[],ne,re,o,se,m,{armed_by_bead:B,failed_by_bead:te,disarmed_lanes:me},he);let Ee=new Map;for(let x of[...J.queue,...J.runnable])Ee.has(x.id)||Ee.set(x.id,x);let fe=new Set;for(let x of J.chain_lanes)for(let Z of x.rows){if(x.status==="confirmed"&&!Z.unplaced&&!Z.fixed&&fe.add(Z.id),!x.draft&&!Z.unplaced)continue;let Oe=Ee.get(Z.id);Oe&&(Oe.cross_lane_chip={lane_id:x.lane_id,number:x.number,status:x.status,label:x.draft?`\uC5F0\uACB0 ${x.number} (draft)`:`\uC5F0\uACB0 ${x.number}`})}let Pe=new Map(J.chain_lanes.map(x=>[x.lane_id,x.number]));for(let x of[...J.queue,...J.running]){let Z=B.get(x.id);if(typeof Z!="string"||Z.length===0)continue;let Oe=Pe.get(Z);x.armed_lane_chip=Oe===void 0?{lane_id:Z,label:"\u25B6 \uC9C4\uD589 \uC911 \xB7 \uB808\uC778 \uC5C6\uC74C",orphan:!0}:{lane_id:Z,label:`\u25B6 \uC5F0\uACB0 ${Oe}`,orphan:!1}}let Ue=[];for(let x of L.values())for(let Z of x)fe.has(Z.id)||Ue.push(Z);Ue.sort((x,Z)=>{let Oe=x.workspace_name.localeCompare(Z.workspace_name);return Oe!==0?Oe:(x.queue_index??0)-(Z.queue_index??0)}),J.parallel_rows=Ue;let Qe={};for(let[x,Z]of re)typeof Z.root_dir=="string"&&Z.root_dir.length>0&&(Qe[x]=Z.root_dir);for(let x of J.chain_lanes)for(let Z of x.rows)!Object.hasOwn(Qe,Z.id)&&Z.root_dir.length>0&&m.has(Z.root_dir)&&(Qe[Z.id]=Z.root_dir);J.owner_of=Qe;let ze=J.runnable.length;J.runnable_all=J.runnable.slice();let Y=J.runnable,V=x=>s.show_blocked||x.blocked!==!0,xe=x=>s.readiness==="all"||(s.readiness==="ready"?x.queue_placeable===!0:x.queue_placeable!==!0);if(d==="per_control"){let x=[],Z=0,Oe=0;for(let Ye of Y){let at=V(Ye),Fe=xe(Ye);at&&Fe?x.push(Ye):!at&&Fe?Z+=1:at&&!Fe&&(Oe+=1)}Y=x,J.runnable_hidden={blocked:Z,readiness:Oe}}else{Y=Y.filter(V);let x=Y.length;Y=Y.filter(xe),J.runnable_hidden={blocked:ze-x,readiness:x-Y.length}}let bt=(x,Z)=>{let Oe=Ci(Z.updated_at)-Ci(x.updated_at);return Oe!==0?Oe:x.id.localeCompare(Z.id)},Ke=a==="repo_spec"?(x,Z)=>{let Oe=x.queue_placeable===!0?0:1,Ye=Z.queue_placeable===!0?0:1;if(Oe!==Ye)return Oe-Ye;let at=x.published===!0?0:1,Fe=Z.published===!0?0:1;return at!==Fe?at-Fe:bt(x,Z)}:bt;if(a==="as_given")J.runnable=Y,J.runnable_sections=[];else if(a==="updated_flat")J.runnable=Y.slice().sort(bt),J.runnable_sections=[];else{let x=new Map;for(let Ye of Y){let at=x.get(Ye.root_dir);at?at.push(Ye):x.set(Ye.root_dir,[Ye])}let Z=[],Oe=[];for(let Ye of De){if(!Ye||typeof Ye.root_dir!="string")continue;let at=(x.get(Ye.root_dir)||[]).slice().sort(Ke);x.delete(Ye.root_dir),at.length!==0&&(Z.push({root_dir:Ye.root_dir,name:Ye.name||Ye.root_dir,items:at.map(Fe=>({...Fe,workspace_name:""}))}),Oe.push(...at))}for(let[Ye,at]of x){let Fe=at.slice().sort(Ke);Z.push({root_dir:Ye,name:Fe[0]?.workspace_name||Ye,items:Fe.map(Je=>({...Je,workspace_name:""}))}),Oe.push(...Fe)}J.runnable=Oe,J.runnable_sections=Z}let nt=kh(n?n.search:void 0);return nt&&wh(J,nt),J}function Md(e,t){let n=new Map(e.map((a,u)=>[a,u])),r=new Map(e.map(a=>[a,new Set]));for(let a of t)a.blocker!==a.blockee&&n.has(a.blocker)&&n.has(a.blockee)&&r.get(a.blockee).add(a.blocker);let o=new Set,i=[];for(;i.length<e.length;){let a=e.find(u=>{if(o.has(u))return!1;for(let d of r.get(u))if(!o.has(d))return!1;return!0});if(a===void 0)return{order:[...e],corrections:[],cycle:!0};o.add(a),i.push(a)}let s=[],l=new Map(i.map((a,u)=>[a,u]));for(let a of i){let u=null;for(let d of r.get(a)){let p=Number(n.get(a))<Number(n.get(d)),_=Number(l.get(a))>Number(l.get(d));p&&_&&(u===null||Number(l.get(d))>Number(l.get(u)))&&(u=d)}u!==null&&s.push({bead_id:a,after:u})}return{order:i,corrections:s,cycle:!1}}var $h="\uB2E4\uB978 \uB808\uD3EC \uC774\uC288\uB294 \uC774 \uC9C1\uB82C \uB808\uC778\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",Ri="\uC758\uC874 \uC790\uB8CC \uBBF8\uD655\uC815 \u2014 \uAD50\uC815 \uBCF4\uB958",xh="Worker \uD0ED \uC9C1\uB82C \uB808\uC778\uC5D0\uC11C \uBA3C\uC800 \uBE7C \uC8FC\uC138\uC694",Ah="\uC774\uBBF8 \uC9C4\uD589 \uC911\uC778 \uC774\uC288 \uC55E\uC5D0\uB294 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",ko="\uC5F0\uACB0 \uB808\uC778\uC774 \uC5C6\uC2B5\uB2C8\uB2E4";function rs(e,t){return`${e}\0${t}`}function Sh(e,t){let n=new Set(e),r=new Map;for(let o of e){let i=t.placed_members.has(o)?t.snapshot_blocked_by:t.runnable_blocked_by,s=i instanceof Map?i.get(o):void 0;if(!Array.isArray(s))return null;r.set(o,s.filter(l=>l!==o&&n.has(l)))}return r}function Eh(e,t){if(e.status!=="confirmed")return 0;let n=-1;return e.entries.forEach((r,o)=>{t.fixed_members.has(r.bead_id)&&(n=o)}),n+1}function is(e,t){let n=e.entries,r=n.map(p=>p.bead_id),o=Sh(r,t);if(o===null)return{entries:n,corrections:[],cycle:!1,held:!0,mismatched:[]};let i=[];for(let[p,_]of o)for(let m of _)i.push({blocker:m,blockee:p});let s=Eh(e,t),l=new Map(r.map((p,_)=>[p,_])),a=r.slice(0,s).filter(p=>o.get(p).some(_=>Number(l.get(_))>Number(l.get(p)))),u=Md(r.slice(s),i);if(u.cycle)return{entries:n,corrections:[],cycle:!0,held:!1,mismatched:a};let d=new Map(n.map(p=>[p.bead_id,p]));return{entries:[...n.slice(0,s),...u.order.map(p=>d.get(p))],corrections:u.corrections,cycle:!1,held:!1,mismatched:a}}function qd(e,t){let n=t.cross_lanes.get(e);return n===void 0?null:is(n,t)}function Th(e,t){if(!(t.corrections.length===0&&!t.cycle&&!t.held&&t.mismatched.length===0))return{lane_id:e,corrected:t.corrections.length,cycle:t.cycle,held:t.held,mismatched:t.mismatched}}function Ch(e){return`${e}\uC758 \uB808\uD3EC\uB97C \uC54C \uC218 \uC5C6\uC5B4 \uC758\uC874\uC744 \uBC14\uAFC0 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4`}function Oh(e){let t=new Map;for(let[n,r]of e)t.set(n,r.slice());return t}function ll(e,t,n){let r=new Set([t]),o=[t];for(;o.length>0;){let i=o.pop();for(let s of e.get(i)||[]){if(s===n)return!0;r.has(s)||(r.add(s),o.push(s))}}return!1}function Rh(e,t){let n=new Set;for(let[s,l]of t)for(let a of l)n.add(rs(s,a));let r=new Map,o=new Map;for(let s of e){let l=rs(s.a,s.b);r.set(l,s),o.set(l,s.type==="dep-add")}let i=[];for(let s of e){let l=rs(s.a,s.b);r.get(l)===s&&o.get(l)!==n.has(l)&&i.push(s)}return i}function Ih(e,t,n){let r=e.parallel_rows,o=Math.max(0,Math.min(r.length,n)),i=r[o];if(i&&i.root_dir===t)return i.queue_index;for(let s=o-1;s>=0;s--)if(r[s].root_dir===t)return r[s].queue_index+1;for(let s=o;s<r.length;s++)if(r[s].root_dir===t)return r[s].queue_index;return e.parallel_raw_length.get(t)??0}function Lh(e,t){return e.parallel_rows.some(n=>n.root_dir===t)}function al(e,t,n,r){return{type:"worker-queue-place",payload:{bead_id:e,...r?{lane:r}:{},index:n},root_dir:t}}function cl(e,t){let n=0;for(let r of e.cross_lanes.keys())if(n+=1,r===t)return n;return n+1}function as(e){let t=Oh(e.blocked_by_map),n=[],r=new Set,o={refusal:null},i=u=>{let d=e.owner_of.get(u);return typeof d!="string"||d.length===0?(o.refusal=Ch(u),null):d};return{graph:t,dep_ops:n,state:o,ownerOf:i,addDep:(u,d,p)=>{if(o.refusal!==null||u===d)return;let _=t.get(u)||[];if(_.includes(d))return;let m=i(u);if(m!==null){if(ll(t,d,u)){o.refusal=`\uC758\uC874 \uC0AC\uC774\uD074\uC774 \uC0DD\uAE41\uB2C8\uB2E4 \u2014 ${u}\uAC00 \uC774\uBBF8 ${d}\uB97C \uB9C9\uACE0 \uC788\uC2B5\uB2C8\uB2E4`;return}t.set(u,[..._,d]),p!==void 0&&r.add(rs(u,d)),n.push({type:"dep-add",a:u,b:d,root_dir:m,...p===void 0?{}:{lane_id:p}})}},removeDep:(u,d)=>{if(o.refusal!==null||u===d)return;let p=t.get(u)||[];if(!p.includes(d))return;let _=i(u);_!==null&&(t.set(u,p.filter(m=>m!==d)),n.push({type:"dep-remove",a:u,b:d,root_dir:_}))},laneCreated:(u,d)=>r.has(rs(u,d))}}function ls(e,t,n,r,o={}){if(e.state.refusal!==null)return{refused:e.state.refusal};let i=Rh(e.dep_ops,t.blocked_by_map),s=i.filter(d=>d.type==="dep-remove"),l=i.filter(d=>d.type==="dep-add"),a=o.disarm_ops??[],u=o.lane_id===void 0||o.correction===void 0?void 0:Th(o.lane_id,o.correction);return{lane_ops:n,ops:[...s,...a,...l,...r],lane_op_index:s.length+a.length,...u===void 0?{}:{correction:u}}}function Nd(e,t,n){for(let r=1;r<t.length;r+=1)e.addDep(t[r].bead_id,t[r-1].bead_id,n)}function os(e,t){return t>0&&e.entries[t]?.dep_created_by_lane===!0}function jd(e,t,n,r){if(t.status!=="confirmed")return[];let o=[],i=new Map;for(let s of r){let l=e.owner_of.get(s.bead_id)||s.root_dir;typeof l!="string"||l.length===0||i.set(l,[...i.get(l)||[],s.bead_id])}for(let[s,l]of i)o.push({type:"worker-queue-disarm",payload:{bead_ids:l,lane_id:n},root_dir:s});return o}function ss(e){return e.map(t=>({bead_id:t.bead_id,root_dir:t.root_dir}))}function Ii(e,t){return e.length===t.length&&e.every((n,r)=>n.bead_id===t[r].bead_id&&n.root_dir===t[r].root_dir)}function Li(e,t,n){let r=as(n),o=[],i=[],s=[],l,a=n.owner_lane_of.get(e.bead_id),u=e.kind==="chain"?e.lane_id??a:void 0,d=u===void 0?void 0:n.cross_lanes.get(u);if(t.kind==="repo-serial"&&e.root_dir!==t.root_dir)return{refused:$h};if(t.kind==="chain"){if(e.kind==="repo-serial")return{refused:xh};if(e.kind!=="chain"&&typeof a=="string"&&a!==t.lane_id&&n.cross_lanes.has(a))return{refused:`\uC774\uBBF8 \uC5F0\uACB0 ${cl(n,a)}\uC5D0 \uC788\uC2B5\uB2C8\uB2E4`};if(!n.cross_lanes.has(t.lane_id))return{refused:ko}}if(e.kind==="chain"&&d===void 0)return{refused:ko};let p=()=>{if(d===void 0||d.status!=="confirmed")return;let v=d.entries.findIndex(K=>K.bead_id===e.bead_id);if(v<0)return;let O=v>0?d.entries[v-1]:null,R=v+1<d.entries.length?d.entries[v+1]:null,Q=os(d,v),ee=R!==null&&os(d,v+1);Q&&O!==null&&r.removeDep(e.bead_id,O.bead_id),ee&&R!==null&&r.removeDep(R.bead_id,e.bead_id),(Q||ee)&&O!==null&&R!==null&&r.addDep(R.bead_id,O.bead_id,u)},_=(v,O)=>{let R=n.cross_lanes.get(v),Q=R.entries.findIndex(N=>N.bead_id===e.bead_id),ee=R.entries.filter(N=>N.bead_id!==e.bead_id),K=Math.max(0,Math.min(ee.length,Q>=0&&O>Q?O-1:O)),L=-1;if(ee.forEach((N,H)=>{n.fixed_members.has(N.bead_id)&&(L=H)}),K<=L){r.state.refusal=Ah;return}let I=Q>=0?R.entries[Q]:d?.entries.find(N=>N.bead_id===e.bead_id)??{bead_id:e.bead_id,root_dir:e.root_dir};l=is({status:R.status,entries:[...ee.slice(0,K),I,...ee.slice(K)]},n);let P=l.entries;if(Ii(P,R.entries)||o.push({type:"monitor-lane-update",payload:{lane_id:v,entries:ss(P)}}),R.status!=="confirmed")return;let F=P.findIndex(N=>N.bead_id===e.bead_id),G=F>0?P[F-1].bead_id:null,q=F+1<P.length?P[F+1].bead_id:null;if(G===null){q!==null&&r.addDep(q,e.bead_id,v);return}if(r.addDep(e.bead_id,G,v),q!==null&&(r.graph.get(q)||[]).includes(G)){let N=R.entries.findIndex(H=>H.bead_id===q);(r.laneCreated(q,G)||N>0&&R.entries[N-1].bead_id===G&&os(R,N))&&r.removeDep(q,G),r.addDep(q,e.bead_id,v)}},m=typeof e.queue_index=="number"?e.queue_index:n.queue_index_of.get(e.bead_id);if(e.kind==="chain"&&(p(),d!==void 0&&(t.kind!=="chain"||t.lane_id!==u)&&(s.push(...jd(n,d,u,d.entries.filter(v=>v.bead_id===e.bead_id))),o.push({type:"monitor-lane-update",payload:{lane_id:u,entries:ss(d.entries.filter(v=>v.bead_id!==e.bead_id))}}))),t.kind==="chain"&&_(t.lane_id,t.marker_index),r.state.refusal!==null)return{refused:r.state.refusal};if(t.kind==="candidate")e.kind!=="candidate"&&i.push({type:"worker-queue-remove",payload:{bead_id:e.bead_id},root_dir:e.root_dir});else if(t.kind==="parallel"){let v=Ih(n,e.root_dir,t.marker_index);if(e.kind==="candidate"||e.kind==="repo-serial")i.push(al(e.bead_id,e.root_dir,v));else if(e.kind==="parallel"){let O=n.parallel_rows,R=O[Math.max(0,Math.min(O.length,t.marker_index))];if(!(!!R&&R.bead_id===e.bead_id)&&Lh(n,e.root_dir)&&m!==void 0){let ee=m>v?v:v-1;ee>=0&&ee!==m&&i.push({type:"worker-queue-reorder",payload:{bead_id:e.bead_id,to_index:ee},root_dir:e.root_dir})}}}else if(t.kind==="chain"){let v=n.cross_lanes.get(t.lane_id);e.kind==="candidate"&&v.status==="confirmed"&&i.push(al(e.bead_id,e.root_dir,n.parallel_raw_length.get(e.root_dir)??0))}else if(e.kind==="repo-serial"&&e.lane_id===t.lane_id){if(m!==void 0&&t.index!==m){let v=m>t.index?t.index:t.index-1;v>=0&&v!==m&&i.push({type:"worker-queue-reorder",payload:{bead_id:e.bead_id,lane:t.lane_id,to_index:v},root_dir:e.root_dir})}}else i.push(al(e.bead_id,e.root_dir,t.index,t.lane_id));return ls(r,n,o,i,{disarm_ops:s,...t.kind==="chain"?{lane_id:t.lane_id,correction:l}:{}})}function Fd(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:ko};if(n.entries.length<2)return{refused:"\uD655\uC815\uD558\uB824\uBA74 \uBA64\uBC84\uAC00 2\uAC1C \uC774\uC0C1\uC774\uC5B4\uC57C \uD569\uB2C8\uB2E4"};let r=is(n,t);if(r.held)return{refused:Ri};let o=r.entries,i=as(t),s=[];Nd(i,o,e);let l=Ii(o,n.entries)?[]:[{type:"monitor-lane-update",payload:{lane_id:e,entries:ss(o)}}];return l.push({type:"monitor-lane-confirm",payload:{lane_id:e}}),ls(i,t,l,s,{lane_id:e,correction:r})}function Bd(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:ko};let r=is(n,t),o=r.entries,i=as(t),s=[];Nd(i,o,e);let l=Ii(o,n.entries)?[]:[{type:"monitor-lane-update",payload:{lane_id:e,entries:ss(o)}}];return ls(i,t,l,s,{lane_id:e,correction:r})}function Ud(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:ko};let r=is(n,t),o=r.entries;return ls(as(t),t,Ii(o,n.entries)?[]:[{type:"monitor-lane-update",payload:{lane_id:e,entries:ss(o)}}],[],{lane_id:e,correction:r})}function Wd(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:ko};let r=as(t);if(n.status==="confirmed")for(let o=1;o<n.entries.length;o+=1)os(n,o)&&r.removeDep(n.entries[o].bead_id,n.entries[o-1].bead_id);return ls(r,t,[{type:"monitor-lane-remove",payload:{lane_id:e}}],[],{disarm_ops:jd(t,n,e,n.entries)})}function zd(e,t){let n=t.cross_lanes.get(e);if(n===void 0||n.status!=="confirmed")return null;let r=[],o=[];for(let s=1;s<n.entries.length;s+=1){let l=`  ${n.entries[s].bead_id} \u2190 ${n.entries[s-1].bead_id}`;os(n,s)?r.push(l):o.push(`${l} (\uB808\uC778\uC774 \uB9CC\uB4E4\uC9C0 \uC54A\uC74C)`)}let i=`\uC5F0\uACB0 ${cl(t,e)}\uC744 \uC9C0\uC6C1\uB2C8\uB2E4.`;return r.length===0?`${i}
\uC758\uC874\uC740 \uADF8\uB300\uB85C \uB461\uB2C8\uB2E4`:[i,"\uD568\uAED8 \uC81C\uAC70\uD560 \uC758\uC874:",...r,...o.length===0?[]:["\uADF8\uB300\uB85C \uB450\uB294 \uC758\uC874:",...o]].join(`
`)}function Hd(e){let t=new Map;for(let n of e)n.type!=="dep-add"||typeof n.lane_id!="string"||t.set(n.lane_id,[...t.get(n.lane_id)||[],{bead_id:n.a,after:n.b}]);return[...t].map(([n,r])=>({lane_id:n,pairs:r}))}function Kd(e,t){let n=new Map(e.map((r,o)=>[r.bead_id,o]));return t.filter(r=>{let o=n.get(r.bead_id);return o!==void 0&&o>0&&e[o-1].bead_id===r.after})}function ul(e,t){if(e!==null){let n=t.owner_lane_of.get(e.bead_id);if(typeof n=="string"&&t.cross_lanes.has(n))return{refused:`\uC774\uBBF8 \uC5F0\uACB0 ${cl(t,n)}\uC5D0 \uC788\uC2B5\uB2C8\uB2E4`}}return{lane_ops:[{type:"monitor-lane-create",payload:{entries:e===null?[]:[e]}}],ops:[],lane_op_index:0}}var Dh="\uC0AC\uC774\uD074";function Ph(e){let t=new Map,n=r=>Array.isArray(r)?r.filter(o=>typeof o=="string"&&o.length>0):[];for(let r of Array.isArray(e)?e:[]){if(!r||typeof r!="object")continue;let o=r.bead_blocked_by&&typeof r.bead_blocked_by=="object"?r.bead_blocked_by:{};for(let[i,s]of Object.entries(o))Array.isArray(s)&&t.set(i,n(s));for(let i of[...Array.isArray(r.runnable)?r.runnable:[],...Array.isArray(r.session_active)?r.session_active:[]])i&&typeof i.bead_id=="string"&&Array.isArray(i.blocked_by)&&i.blocked_by.length>0&&t.set(i.bead_id,n(i.blocked_by))}return t}function dl(e,t,n){let r=yr(e,t),o=[],i=new Set,s=(a,u)=>{for(let d of a)i.has(d.id)||(i.add(d.id),o.push({bead_id:d.id,root_dir:d.root_dir,workspace_name:d.workspace_name,title:d.title,lane:u}))};s(r.running,"running"),s(r.pr_wait,"pr_wait"),s(r.queue,"queue"),s(r.runnable_all,"runnable");let l=n&&typeof n.root_dir=="string"&&n.root_dir.length?n.root_dir:null;return{issues:l===null?o:o.filter(a=>a.root_dir===l),blocked_by_map:Ph(e)}}function Gd(e,t){let n=new Map;for(let s of t.issues)!s||typeof s.bead_id!="string"||s.bead_id.length===0||n.has(s.bead_id)||n.set(s.bead_id,s);let r=n.get(e)?.root_dir,o=t.blocked_by_map.get(e)||[],i=[];for(let s of n.values()){if(s.bead_id===e||s.lane==="done"||o.includes(s.bead_id))continue;let l=ll(t.blocked_by_map,s.bead_id,e);i.push({...s,disabled:l,...l?{reason:Dh}:{}})}return i.sort((s,l)=>{let a=r!==void 0&&s.root_dir===r,u=r!==void 0&&l.root_dir===r;return a!==u?a?-1:1:s.bead_id.localeCompare(l.bead_id)}),i}function Yd(e,t){let n=t.trim().toLowerCase();return n.length===0?e.slice():e.filter(r=>r.bead_id.toLowerCase().includes(n)||r.title.toLowerCase().includes(n))}var{entries:rp,setPrototypeOf:Vd,isFrozen:Mh,getPrototypeOf:qh,getOwnPropertyDescriptor:Nh}=Object,{freeze:bn,seal:Cn,create:bl}=Object,{apply:yl,construct:vl}=typeof Reflect<"u"&&Reflect;bn||(bn=function(t){return t});Cn||(Cn=function(t){return t});yl||(yl=function(t,n){for(var r=arguments.length,o=new Array(r>2?r-2:0),i=2;i<r;i++)o[i-2]=arguments[i];return t.apply(n,o)});vl||(vl=function(t){for(var n=arguments.length,r=new Array(n>1?n-1:0),o=1;o<n;o++)r[o-1]=arguments[o];return new t(...r)});var Di=yn(Array.prototype.forEach),jh=yn(Array.prototype.lastIndexOf),Qd=yn(Array.prototype.pop),cs=yn(Array.prototype.push),Fh=yn(Array.prototype.splice),Mi=yn(String.prototype.toLowerCase),pl=yn(String.prototype.toString),fl=yn(String.prototype.match),us=yn(String.prototype.replace),Bh=yn(String.prototype.indexOf),Uh=yn(String.prototype.trim),Nn=yn(Object.prototype.hasOwnProperty),hn=yn(RegExp.prototype.test),ds=Wh(TypeError);function yn(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var n=arguments.length,r=new Array(n>1?n-1:0),o=1;o<n;o++)r[o-1]=arguments[o];return yl(e,t,r)}}function Wh(e){return function(){for(var t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];return vl(e,n)}}function Tt(e,t){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:Mi;Vd&&Vd(e,null);let r=t.length;for(;r--;){let o=t[r];if(typeof o=="string"){let i=n(o);i!==o&&(Mh(t)||(t[r]=i),o=i)}e[o]=!0}return e}function zh(e){for(let t=0;t<e.length;t++)Nn(e,t)||(e[t]=null);return e}function sr(e){let t=bl(null);for(let[n,r]of rp(e))Nn(e,n)&&(Array.isArray(r)?t[n]=zh(r):r&&typeof r=="object"&&r.constructor===Object?t[n]=sr(r):t[n]=r);return t}function ps(e,t){for(;e!==null;){let r=Nh(e,t);if(r){if(r.get)return yn(r.get);if(typeof r.value=="function")return yn(r.value)}e=qh(e)}function n(){return null}return n}var Xd=bn(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),_l=bn(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),ml=bn(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),Hh=bn(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),gl=bn(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),Kh=bn(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),Zd=bn(["#text"]),Jd=bn(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),hl=bn(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),ep=bn(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),Pi=bn(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),Gh=Cn(/\{\{[\w\W]*|[\w\W]*\}\}/gm),Yh=Cn(/<%[\w\W]*|[\w\W]*%>/gm),Vh=Cn(/\$\{[\w\W]*/gm),Qh=Cn(/^data-[\-\w.\u00B7-\uFFFF]+$/),Xh=Cn(/^aria-[\-\w]+$/),op=Cn(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),Zh=Cn(/^(?:\w+script|data):/i),Jh=Cn(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),sp=Cn(/^html$/i),eb=Cn(/^[a-z][.\w]*(-[.\w]+)+$/i),tp=Object.freeze({__proto__:null,ARIA_ATTR:Xh,ATTR_WHITESPACE:Jh,CUSTOM_ELEMENT:eb,DATA_ATTR:Qh,DOCTYPE_NAME:sp,ERB_EXPR:Yh,IS_ALLOWED_URI:op,IS_SCRIPT_OR_DATA:Zh,MUSTACHE_EXPR:Gh,TMPLIT_EXPR:Vh}),fs={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,progressingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},tb=function(){return typeof window>"u"?null:window},nb=function(t,n){if(typeof t!="object"||typeof t.createPolicy!="function")return null;let r=null,o="data-tt-policy-suffix";n&&n.hasAttribute(o)&&(r=n.getAttribute(o));let i="dompurify"+(r?"#"+r:"");try{return t.createPolicy(i,{createHTML(s){return s},createScriptURL(s){return s}})}catch{return console.warn("TrustedTypes policy "+i+" could not be created."),null}},np=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function ip(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:tb(),t=we=>ip(we);if(t.version="3.3.0",t.removed=[],!e||!e.document||e.document.nodeType!==fs.document||!e.Element)return t.isSupported=!1,t;let{document:n}=e,r=n,o=r.currentScript,{DocumentFragment:i,HTMLTemplateElement:s,Node:l,Element:a,NodeFilter:u,NamedNodeMap:d=e.NamedNodeMap||e.MozNamedAttrMap,HTMLFormElement:p,DOMParser:_,trustedTypes:m}=e,v=a.prototype,O=ps(v,"cloneNode"),R=ps(v,"remove"),Q=ps(v,"nextSibling"),ee=ps(v,"childNodes"),K=ps(v,"parentNode");if(typeof s=="function"){let we=n.createElement("template");we.content&&we.content.ownerDocument&&(n=we.content.ownerDocument)}let L,I="",{implementation:P,createNodeIterator:F,createDocumentFragment:G,getElementsByTagName:q}=n,{importNode:N}=r,H=np();t.isSupported=typeof rp=="function"&&typeof K=="function"&&P&&P.createHTMLDocument!==void 0;let{MUSTACHE_EXPR:W,ERB_EXPR:ne,TMPLIT_EXPR:he,DATA_ATTR:qe,ARIA_ATTR:B,IS_SCRIPT_OR_DATA:te,ATTR_WHITESPACE:me,CUSTOM_ELEMENT:Te}=tp,{IS_ALLOWED_URI:C}=tp,se=null,ve=Tt({},[...Xd,..._l,...ml,...gl,...Zd]),ye=null,De=Tt({},[...Jd,...hl,...ep,...Pi]),ge=Object.seal(bl(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),Re=null,Ze=null,ft=Object.seal(bl(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}})),X=!0,J=!0,re=!1,ae=!0,Ee=!1,fe=!0,Pe=!1,Ue=!1,Qe=!1,ze=!1,Y=!1,V=!1,xe=!0,bt=!1,_t="user-content-",Ke=!0,nt=!1,x={},Z=null,Oe=Tt({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]),Ye=null,at=Tt({},["audio","video","img","source","image","track"]),Fe=null,Je=Tt({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),qt="http://www.w3.org/1998/Math/MathML",lt="http://www.w3.org/2000/svg",At="http://www.w3.org/1999/xhtml",Bt=At,Pt=!1,Nt=null,ue=Tt({},[qt,lt,At],pl),ke=Tt({},["mi","mo","mn","ms","mtext"]),Ge=Tt({},["annotation-xml"]),rt=Tt({},["title","style","font","a","script"]),et=null,ht=["application/xhtml+xml","text/html"],je="text/html",tt=null,Ne=null,S=n.createElement("form"),j=function(T){return T instanceof RegExp||T instanceof Function},ce=function(){let T=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(Ne&&Ne===T)){if((!T||typeof T!="object")&&(T={}),T=sr(T),et=ht.indexOf(T.PARSER_MEDIA_TYPE)===-1?je:T.PARSER_MEDIA_TYPE,tt=et==="application/xhtml+xml"?pl:Mi,se=Nn(T,"ALLOWED_TAGS")?Tt({},T.ALLOWED_TAGS,tt):ve,ye=Nn(T,"ALLOWED_ATTR")?Tt({},T.ALLOWED_ATTR,tt):De,Nt=Nn(T,"ALLOWED_NAMESPACES")?Tt({},T.ALLOWED_NAMESPACES,pl):ue,Fe=Nn(T,"ADD_URI_SAFE_ATTR")?Tt(sr(Je),T.ADD_URI_SAFE_ATTR,tt):Je,Ye=Nn(T,"ADD_DATA_URI_TAGS")?Tt(sr(at),T.ADD_DATA_URI_TAGS,tt):at,Z=Nn(T,"FORBID_CONTENTS")?Tt({},T.FORBID_CONTENTS,tt):Oe,Re=Nn(T,"FORBID_TAGS")?Tt({},T.FORBID_TAGS,tt):sr({}),Ze=Nn(T,"FORBID_ATTR")?Tt({},T.FORBID_ATTR,tt):sr({}),x=Nn(T,"USE_PROFILES")?T.USE_PROFILES:!1,X=T.ALLOW_ARIA_ATTR!==!1,J=T.ALLOW_DATA_ATTR!==!1,re=T.ALLOW_UNKNOWN_PROTOCOLS||!1,ae=T.ALLOW_SELF_CLOSE_IN_ATTR!==!1,Ee=T.SAFE_FOR_TEMPLATES||!1,fe=T.SAFE_FOR_XML!==!1,Pe=T.WHOLE_DOCUMENT||!1,ze=T.RETURN_DOM||!1,Y=T.RETURN_DOM_FRAGMENT||!1,V=T.RETURN_TRUSTED_TYPE||!1,Qe=T.FORCE_BODY||!1,xe=T.SANITIZE_DOM!==!1,bt=T.SANITIZE_NAMED_PROPS||!1,Ke=T.KEEP_CONTENT!==!1,nt=T.IN_PLACE||!1,C=T.ALLOWED_URI_REGEXP||op,Bt=T.NAMESPACE||At,ke=T.MATHML_TEXT_INTEGRATION_POINTS||ke,Ge=T.HTML_INTEGRATION_POINTS||Ge,ge=T.CUSTOM_ELEMENT_HANDLING||{},T.CUSTOM_ELEMENT_HANDLING&&j(T.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(ge.tagNameCheck=T.CUSTOM_ELEMENT_HANDLING.tagNameCheck),T.CUSTOM_ELEMENT_HANDLING&&j(T.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(ge.attributeNameCheck=T.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),T.CUSTOM_ELEMENT_HANDLING&&typeof T.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(ge.allowCustomizedBuiltInElements=T.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),Ee&&(J=!1),Y&&(ze=!0),x&&(se=Tt({},Zd),ye=[],x.html===!0&&(Tt(se,Xd),Tt(ye,Jd)),x.svg===!0&&(Tt(se,_l),Tt(ye,hl),Tt(ye,Pi)),x.svgFilters===!0&&(Tt(se,ml),Tt(ye,hl),Tt(ye,Pi)),x.mathMl===!0&&(Tt(se,gl),Tt(ye,ep),Tt(ye,Pi))),T.ADD_TAGS&&(typeof T.ADD_TAGS=="function"?ft.tagCheck=T.ADD_TAGS:(se===ve&&(se=sr(se)),Tt(se,T.ADD_TAGS,tt))),T.ADD_ATTR&&(typeof T.ADD_ATTR=="function"?ft.attributeCheck=T.ADD_ATTR:(ye===De&&(ye=sr(ye)),Tt(ye,T.ADD_ATTR,tt))),T.ADD_URI_SAFE_ATTR&&Tt(Fe,T.ADD_URI_SAFE_ATTR,tt),T.FORBID_CONTENTS&&(Z===Oe&&(Z=sr(Z)),Tt(Z,T.FORBID_CONTENTS,tt)),Ke&&(se["#text"]=!0),Pe&&Tt(se,["html","head","body"]),se.table&&(Tt(se,["tbody"]),delete Re.tbody),T.TRUSTED_TYPES_POLICY){if(typeof T.TRUSTED_TYPES_POLICY.createHTML!="function")throw ds('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof T.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw ds('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');L=T.TRUSTED_TYPES_POLICY,I=L.createHTML("")}else L===void 0&&(L=nb(m,o)),L!==null&&typeof I=="string"&&(I=L.createHTML(""));bn&&bn(T),Ne=T}},Ae=Tt({},[..._l,...ml,...Hh]),be=Tt({},[...gl,...Kh]),yt=function(T){let pe=K(T);(!pe||!pe.tagName)&&(pe={namespaceURI:Bt,tagName:"template"});let Le=Mi(T.tagName),y=Mi(pe.tagName);return Nt[T.namespaceURI]?T.namespaceURI===lt?pe.namespaceURI===At?Le==="svg":pe.namespaceURI===qt?Le==="svg"&&(y==="annotation-xml"||ke[y]):!!Ae[Le]:T.namespaceURI===qt?pe.namespaceURI===At?Le==="math":pe.namespaceURI===lt?Le==="math"&&Ge[y]:!!be[Le]:T.namespaceURI===At?pe.namespaceURI===lt&&!Ge[y]||pe.namespaceURI===qt&&!ke[y]?!1:!be[Le]&&(rt[Le]||!Ae[Le]):!!(et==="application/xhtml+xml"&&Nt[T.namespaceURI]):!1},wt=function(T){cs(t.removed,{element:T});try{K(T).removeChild(T)}catch{R(T)}},$t=function(T,pe){try{cs(t.removed,{attribute:pe.getAttributeNode(T),from:pe})}catch{cs(t.removed,{attribute:null,from:pe})}if(pe.removeAttribute(T),T==="is")if(ze||Y)try{wt(pe)}catch{}else try{pe.setAttribute(T,"")}catch{}},xt=function(T){let pe=null,Le=null;if(Qe)T="<remove></remove>"+T;else{let M=fl(T,/^[\r\n\t ]+/);Le=M&&M[0]}et==="application/xhtml+xml"&&Bt===At&&(T='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+T+"</body></html>");let y=L?L.createHTML(T):T;if(Bt===At)try{pe=new _().parseFromString(y,et)}catch{}if(!pe||!pe.documentElement){pe=P.createDocument(Bt,"template",null);try{pe.documentElement.innerHTML=Pt?I:y}catch{}}let b=pe.body||pe.documentElement;return T&&Le&&b.insertBefore(n.createTextNode(Le),b.childNodes[0]||null),Bt===At?q.call(pe,Pe?"html":"body")[0]:Pe?pe.documentElement:b},Gt=function(T){return F.call(T.ownerDocument||T,T,u.SHOW_ELEMENT|u.SHOW_COMMENT|u.SHOW_TEXT|u.SHOW_PROCESSING_INSTRUCTION|u.SHOW_CDATA_SECTION,null)},Ht=function(T){return T instanceof p&&(typeof T.nodeName!="string"||typeof T.textContent!="string"||typeof T.removeChild!="function"||!(T.attributes instanceof d)||typeof T.removeAttribute!="function"||typeof T.setAttribute!="function"||typeof T.namespaceURI!="string"||typeof T.insertBefore!="function"||typeof T.hasChildNodes!="function")},Ut=function(T){return typeof l=="function"&&T instanceof l};function Et(we,T,pe){Di(we,Le=>{Le.call(t,T,pe,Ne)})}let rn=function(T){let pe=null;if(Et(H.beforeSanitizeElements,T,null),Ht(T))return wt(T),!0;let Le=tt(T.nodeName);if(Et(H.uponSanitizeElement,T,{tagName:Le,allowedTags:se}),fe&&T.hasChildNodes()&&!Ut(T.firstElementChild)&&hn(/<[/\w!]/g,T.innerHTML)&&hn(/<[/\w!]/g,T.textContent)||T.nodeType===fs.progressingInstruction||fe&&T.nodeType===fs.comment&&hn(/<[/\w]/g,T.data))return wt(T),!0;if(!(ft.tagCheck instanceof Function&&ft.tagCheck(Le))&&(!se[Le]||Re[Le])){if(!Re[Le]&&Wt(Le)&&(ge.tagNameCheck instanceof RegExp&&hn(ge.tagNameCheck,Le)||ge.tagNameCheck instanceof Function&&ge.tagNameCheck(Le)))return!1;if(Ke&&!Z[Le]){let y=K(T)||T.parentNode,b=ee(T)||T.childNodes;if(b&&y){let M=b.length;for(let f=M-1;f>=0;--f){let k=O(b[f],!0);k.__removalCount=(T.__removalCount||0)+1,y.insertBefore(k,Q(T))}}}return wt(T),!0}return T instanceof a&&!yt(T)||(Le==="noscript"||Le==="noembed"||Le==="noframes")&&hn(/<\/no(script|embed|frames)/i,T.innerHTML)?(wt(T),!0):(Ee&&T.nodeType===fs.text&&(pe=T.textContent,Di([W,ne,he],y=>{pe=us(pe,y," ")}),T.textContent!==pe&&(cs(t.removed,{element:T.cloneNode()}),T.textContent=pe)),Et(H.afterSanitizeElements,T,null),!1)},tn=function(T,pe,Le){if(xe&&(pe==="id"||pe==="name")&&(Le in n||Le in S))return!1;if(!(J&&!Ze[pe]&&hn(qe,pe))){if(!(X&&hn(B,pe))){if(!(ft.attributeCheck instanceof Function&&ft.attributeCheck(pe,T))){if(!ye[pe]||Ze[pe]){if(!(Wt(T)&&(ge.tagNameCheck instanceof RegExp&&hn(ge.tagNameCheck,T)||ge.tagNameCheck instanceof Function&&ge.tagNameCheck(T))&&(ge.attributeNameCheck instanceof RegExp&&hn(ge.attributeNameCheck,pe)||ge.attributeNameCheck instanceof Function&&ge.attributeNameCheck(pe,T))||pe==="is"&&ge.allowCustomizedBuiltInElements&&(ge.tagNameCheck instanceof RegExp&&hn(ge.tagNameCheck,Le)||ge.tagNameCheck instanceof Function&&ge.tagNameCheck(Le))))return!1}else if(!Fe[pe]){if(!hn(C,us(Le,me,""))){if(!((pe==="src"||pe==="xlink:href"||pe==="href")&&T!=="script"&&Bh(Le,"data:")===0&&Ye[T])){if(!(re&&!hn(te,us(Le,me,"")))){if(Le)return!1}}}}}}}return!0},Wt=function(T){return T!=="annotation-xml"&&fl(T,Te)},Ot=function(T){Et(H.beforeSanitizeAttributes,T,null);let{attributes:pe}=T;if(!pe||Ht(T))return;let Le={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:ye,forceKeepAttr:void 0},y=pe.length;for(;y--;){let b=pe[y],{name:M,namespaceURI:f,value:k}=b,U=tt(M),ie=k,le=M==="value"?ie:Uh(ie);if(Le.attrName=U,Le.attrValue=le,Le.keepAttr=!0,Le.forceKeepAttr=void 0,Et(H.uponSanitizeAttribute,T,Le),le=Le.attrValue,bt&&(U==="id"||U==="name")&&($t(M,T),le=_t+le),fe&&hn(/((--!?|])>)|<\/(style|title|textarea)/i,le)){$t(M,T);continue}if(U==="attributename"&&fl(le,"href")){$t(M,T);continue}if(Le.forceKeepAttr)continue;if(!Le.keepAttr){$t(M,T);continue}if(!ae&&hn(/\/>/i,le)){$t(M,T);continue}Ee&&Di([W,ne,he],gt=>{le=us(le,gt," ")});let Be=tt(T.nodeName);if(!tn(Be,U,le)){$t(M,T);continue}if(L&&typeof m=="object"&&typeof m.getAttributeType=="function"&&!f)switch(m.getAttributeType(Be,U)){case"TrustedHTML":{le=L.createHTML(le);break}case"TrustedScriptURL":{le=L.createScriptURL(le);break}}if(le!==ie)try{f?T.setAttributeNS(f,M,le):T.setAttribute(M,le),Ht(T)?wt(T):Qd(t.removed)}catch{$t(M,T)}}Et(H.afterSanitizeAttributes,T,null)},Qt=function we(T){let pe=null,Le=Gt(T);for(Et(H.beforeSanitizeShadowDOM,T,null);pe=Le.nextNode();)Et(H.uponSanitizeShadowNode,pe,null),rn(pe),Ot(pe),pe.content instanceof i&&we(pe.content);Et(H.afterSanitizeShadowDOM,T,null)};return t.sanitize=function(we){let T=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},pe=null,Le=null,y=null,b=null;if(Pt=!we,Pt&&(we="<!-->"),typeof we!="string"&&!Ut(we))if(typeof we.toString=="function"){if(we=we.toString(),typeof we!="string")throw ds("dirty is not a string, aborting")}else throw ds("toString is not a function");if(!t.isSupported)return we;if(Ue||ce(T),t.removed=[],typeof we=="string"&&(nt=!1),nt){if(we.nodeName){let k=tt(we.nodeName);if(!se[k]||Re[k])throw ds("root node is forbidden and cannot be sanitized in-place")}}else if(we instanceof l)pe=xt("<!---->"),Le=pe.ownerDocument.importNode(we,!0),Le.nodeType===fs.element&&Le.nodeName==="BODY"||Le.nodeName==="HTML"?pe=Le:pe.appendChild(Le);else{if(!ze&&!Ee&&!Pe&&we.indexOf("<")===-1)return L&&V?L.createHTML(we):we;if(pe=xt(we),!pe)return ze?null:V?I:""}pe&&Qe&&wt(pe.firstChild);let M=Gt(nt?we:pe);for(;y=M.nextNode();)rn(y),Ot(y),y.content instanceof i&&Qt(y.content);if(nt)return we;if(ze){if(Y)for(b=G.call(pe.ownerDocument);pe.firstChild;)b.appendChild(pe.firstChild);else b=pe;return(ye.shadowroot||ye.shadowrootmode)&&(b=N.call(r,b,!0)),b}let f=Pe?pe.outerHTML:pe.innerHTML;return Pe&&se["!doctype"]&&pe.ownerDocument&&pe.ownerDocument.doctype&&pe.ownerDocument.doctype.name&&hn(sp,pe.ownerDocument.doctype.name)&&(f="<!DOCTYPE "+pe.ownerDocument.doctype.name+`>
`+f),Ee&&Di([W,ne,he],k=>{f=us(f,k," ")}),L&&V?L.createHTML(f):f},t.setConfig=function(){let we=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};ce(we),Ue=!0},t.clearConfig=function(){Ne=null,Ue=!1},t.isValidAttribute=function(we,T,pe){Ne||ce({});let Le=tt(we),y=tt(T);return tn(Le,y,pe)},t.addHook=function(we,T){typeof T=="function"&&cs(H[we],T)},t.removeHook=function(we,T){if(T!==void 0){let pe=jh(H[we],T);return pe===-1?void 0:Fh(H[we],pe,1)[0]}return Qd(H[we])},t.removeHooks=function(we){H[we]=[]},t.removeAllHooks=function(){H=np()},t}var ap=ip();var ir={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},qi=e=>(...t)=>({_$litDirective$:e,values:t}),wo=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,n,r){this._$Ct=t,this._$AM=n,this._$Ci=r}_$AS(t,n){return this.update(t,n)}update(t,n){return this.render(...n)}};var _s=class extends wo{constructor(t){if(super(t),this.it=Vt,t.type!==ir.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===Vt||t==null)return this._t=void 0,this.it=t;if(t===Tn)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;let n=[t];return n.raw=n,this._t={_$litType$:this.constructor.resultType,strings:n,values:[]}}};_s.directiveName="unsafeHTML",_s.resultType=1;var lp=qi(_s);function xl(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var Ur=xl();function mp(e){Ur=e}var bs={exec:()=>null};function Lt(e,t=""){let n=typeof e=="string"?e:e.source,r={replace:(o,i)=>{let s=typeof i=="string"?i:i.source;return s=s.replace(vn.caret,"$1"),n=n.replace(o,s),r},getRegex:()=>new RegExp(n,t)};return r}var rb=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),vn={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i")},ob=/^(?:[ \t]*(?:\n|$))+/,sb=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,ib=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,ys=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,ab=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,Al=/(?:[*+-]|\d{1,9}[.)])/,gp=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,hp=Lt(gp).replace(/bull/g,Al).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),lb=Lt(gp).replace(/bull/g,Al).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),Sl=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,cb=/^[^\n]+/,El=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,ub=Lt(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",El).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),db=Lt(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,Al).getRegex(),Wi="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",Tl=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,pb=Lt("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",Tl).replace("tag",Wi).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),bp=Lt(Sl).replace("hr",ys).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Wi).getRegex(),fb=Lt(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",bp).getRegex(),Cl={blockquote:fb,code:sb,def:ub,fences:ib,heading:ab,hr:ys,html:pb,lheading:hp,list:db,newline:ob,paragraph:bp,table:bs,text:cb},cp=Lt("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",ys).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Wi).getRegex(),_b={...Cl,lheading:lb,table:cp,paragraph:Lt(Sl).replace("hr",ys).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",cp).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Wi).getRegex()},mb={...Cl,html:Lt(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",Tl).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:bs,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:Lt(Sl).replace("hr",ys).replace("heading",` *#{1,6} *[^
]`).replace("lheading",hp).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},gb=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,hb=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,yp=/^( {2,}|\\)\n(?!\s*$)/,bb=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,zi=/[\p{P}\p{S}]/u,Ol=/[\s\p{P}\p{S}]/u,vp=/[^\s\p{P}\p{S}]/u,yb=Lt(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,Ol).getRegex(),kp=/(?!~)[\p{P}\p{S}]/u,vb=/(?!~)[\s\p{P}\p{S}]/u,kb=/(?:[^\s\p{P}\p{S}]|~)/u,wb=Lt(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",rb?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),wp=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,$b=Lt(wp,"u").replace(/punct/g,zi).getRegex(),xb=Lt(wp,"u").replace(/punct/g,kp).getRegex(),$p="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",Ab=Lt($p,"gu").replace(/notPunctSpace/g,vp).replace(/punctSpace/g,Ol).replace(/punct/g,zi).getRegex(),Sb=Lt($p,"gu").replace(/notPunctSpace/g,kb).replace(/punctSpace/g,vb).replace(/punct/g,kp).getRegex(),Eb=Lt("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,vp).replace(/punctSpace/g,Ol).replace(/punct/g,zi).getRegex(),Tb=Lt(/\\(punct)/,"gu").replace(/punct/g,zi).getRegex(),Cb=Lt(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),Ob=Lt(Tl).replace("(?:-->|$)","-->").getRegex(),Rb=Lt("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",Ob).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),Fi=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,Ib=Lt(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",Fi).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),xp=Lt(/^!?\[(label)\]\[(ref)\]/).replace("label",Fi).replace("ref",El).getRegex(),Ap=Lt(/^!?\[(ref)\](?:\[\])?/).replace("ref",El).getRegex(),Lb=Lt("reflink|nolink(?!\\()","g").replace("reflink",xp).replace("nolink",Ap).getRegex(),up=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,Rl={_backpedal:bs,anyPunctuation:Tb,autolink:Cb,blockSkip:wb,br:yp,code:hb,del:bs,emStrongLDelim:$b,emStrongRDelimAst:Ab,emStrongRDelimUnd:Eb,escape:gb,link:Ib,nolink:Ap,punctuation:yb,reflink:xp,reflinkSearch:Lb,tag:Rb,text:bb,url:bs},Db={...Rl,link:Lt(/^!?\[(label)\]\((.*?)\)/).replace("label",Fi).getRegex(),reflink:Lt(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",Fi).getRegex()},kl={...Rl,emStrongRDelimAst:Sb,emStrongLDelim:xb,url:Lt(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",up).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:Lt(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",up).getRegex()},Pb={...kl,br:Lt(yp).replace("{2,}","*").getRegex(),text:Lt(kl.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},Ni={normal:Cl,gfm:_b,pedantic:mb},ms={normal:Rl,gfm:kl,breaks:Pb,pedantic:Db},Mb={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},dp=e=>Mb[e];function ar(e,t){if(t){if(vn.escapeTest.test(e))return e.replace(vn.escapeReplace,dp)}else if(vn.escapeTestNoEncode.test(e))return e.replace(vn.escapeReplaceNoEncode,dp);return e}function pp(e){try{e=encodeURI(e).replace(vn.percentDecode,"%")}catch{return null}return e}function fp(e,t){let n=e.replace(vn.findPipe,(i,s,l)=>{let a=!1,u=s;for(;--u>=0&&l[u]==="\\";)a=!a;return a?"|":" |"}),r=n.split(vn.splitPipe),o=0;if(r[0].trim()||r.shift(),r.length>0&&!r.at(-1)?.trim()&&r.pop(),t)if(r.length>t)r.splice(t);else for(;r.length<t;)r.push("");for(;o<r.length;o++)r[o]=r[o].trim().replace(vn.slashPipe,"|");return r}function gs(e,t,n){let r=e.length;if(r===0)return"";let o=0;for(;o<r;){let i=e.charAt(r-o-1);if(i===t&&!n)o++;else if(i!==t&&n)o++;else break}return e.slice(0,r-o)}function qb(e,t){if(e.indexOf(t[1])===-1)return-1;let n=0;for(let r=0;r<e.length;r++)if(e[r]==="\\")r++;else if(e[r]===t[0])n++;else if(e[r]===t[1]&&(n--,n<0))return r;return n>0?-2:-1}function _p(e,t,n,r,o){let i=t.href,s=t.title||null,l=e[1].replace(o.other.outputLinkReplace,"$1");r.state.inLink=!0;let a={type:e[0].charAt(0)==="!"?"image":"link",raw:n,href:i,title:s,text:l,tokens:r.inlineTokens(l)};return r.state.inLink=!1,a}function Nb(e,t,n){let r=e.match(n.other.indentCodeCompensation);if(r===null)return t;let o=r[1];return t.split(`
`).map(i=>{let s=i.match(n.other.beginningSpace);if(s===null)return i;let[l]=s;return l.length>=o.length?i.slice(o.length):i}).join(`
`)}var Bi=class{constructor(e){Ft(this,"options");Ft(this,"rules");Ft(this,"lexer");this.options=e||Ur}space(e){let t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){let t=this.rules.block.code.exec(e);if(t){let n=t[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?n:gs(n,`
`)}}}fences(e){let t=this.rules.block.fences.exec(e);if(t){let n=t[0],r=Nb(n,t[3]||"",this.rules);return{type:"code",raw:n,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:r}}}heading(e){let t=this.rules.block.heading.exec(e);if(t){let n=t[2].trim();if(this.rules.other.endingHash.test(n)){let r=gs(n,"#");(this.options.pedantic||!r||this.rules.other.endingSpaceChar.test(r))&&(n=r.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:n,tokens:this.lexer.inline(n)}}}hr(e){let t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:gs(t[0],`
`)}}blockquote(e){let t=this.rules.block.blockquote.exec(e);if(t){let n=gs(t[0],`
`).split(`
`),r="",o="",i=[];for(;n.length>0;){let s=!1,l=[],a;for(a=0;a<n.length;a++)if(this.rules.other.blockquoteStart.test(n[a]))l.push(n[a]),s=!0;else if(!s)l.push(n[a]);else break;n=n.slice(a);let u=l.join(`
`),d=u.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");r=r?`${r}
${u}`:u,o=o?`${o}
${d}`:d;let p=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(d,i,!0),this.lexer.state.top=p,n.length===0)break;let _=i.at(-1);if(_?.type==="code")break;if(_?.type==="blockquote"){let m=_,v=m.raw+`
`+n.join(`
`),O=this.blockquote(v);i[i.length-1]=O,r=r.substring(0,r.length-m.raw.length)+O.raw,o=o.substring(0,o.length-m.text.length)+O.text;break}else if(_?.type==="list"){let m=_,v=m.raw+`
`+n.join(`
`),O=this.list(v);i[i.length-1]=O,r=r.substring(0,r.length-_.raw.length)+O.raw,o=o.substring(0,o.length-m.raw.length)+O.raw,n=v.substring(i.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:r,tokens:i,text:o}}}list(e){let t=this.rules.block.list.exec(e);if(t){let n=t[1].trim(),r=n.length>1,o={type:"list",raw:"",ordered:r,start:r?+n.slice(0,-1):"",loose:!1,items:[]};n=r?`\\d{1,9}\\${n.slice(-1)}`:`\\${n}`,this.options.pedantic&&(n=r?n:"[*+-]");let i=this.rules.other.listItemRegex(n),s=!1;for(;e;){let a=!1,u="",d="";if(!(t=i.exec(e))||this.rules.block.hr.test(e))break;u=t[0],e=e.substring(u.length);let p=t[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,O=>" ".repeat(3*O.length)),_=e.split(`
`,1)[0],m=!p.trim(),v=0;if(this.options.pedantic?(v=2,d=p.trimStart()):m?v=t[1].length+1:(v=t[2].search(this.rules.other.nonSpaceChar),v=v>4?1:v,d=p.slice(v),v+=t[1].length),m&&this.rules.other.blankLine.test(_)&&(u+=_+`
`,e=e.substring(_.length+1),a=!0),!a){let O=this.rules.other.nextBulletRegex(v),R=this.rules.other.hrRegex(v),Q=this.rules.other.fencesBeginRegex(v),ee=this.rules.other.headingBeginRegex(v),K=this.rules.other.htmlBeginRegex(v);for(;e;){let L=e.split(`
`,1)[0],I;if(_=L,this.options.pedantic?(_=_.replace(this.rules.other.listReplaceNesting,"  "),I=_):I=_.replace(this.rules.other.tabCharGlobal,"    "),Q.test(_)||ee.test(_)||K.test(_)||O.test(_)||R.test(_))break;if(I.search(this.rules.other.nonSpaceChar)>=v||!_.trim())d+=`
`+I.slice(v);else{if(m||p.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||Q.test(p)||ee.test(p)||R.test(p))break;d+=`
`+_}!m&&!_.trim()&&(m=!0),u+=L+`
`,e=e.substring(L.length+1),p=I.slice(v)}}o.loose||(s?o.loose=!0:this.rules.other.doubleBlankLine.test(u)&&(s=!0)),o.items.push({type:"list_item",raw:u,task:!!this.options.gfm&&this.rules.other.listIsTask.test(d),loose:!1,text:d,tokens:[]}),o.raw+=u}let l=o.items.at(-1);if(l)l.raw=l.raw.trimEnd(),l.text=l.text.trimEnd();else return;o.raw=o.raw.trimEnd();for(let a of o.items){if(this.lexer.state.top=!1,a.tokens=this.lexer.blockTokens(a.text,[]),a.task){if(a.text=a.text.replace(this.rules.other.listReplaceTask,""),a.tokens[0]?.type==="text"||a.tokens[0]?.type==="paragraph"){a.tokens[0].raw=a.tokens[0].raw.replace(this.rules.other.listReplaceTask,""),a.tokens[0].text=a.tokens[0].text.replace(this.rules.other.listReplaceTask,"");for(let d=this.lexer.inlineQueue.length-1;d>=0;d--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[d].src)){this.lexer.inlineQueue[d].src=this.lexer.inlineQueue[d].src.replace(this.rules.other.listReplaceTask,"");break}}let u=this.rules.other.listTaskCheckbox.exec(a.raw);if(u){let d={type:"checkbox",raw:u[0]+" ",checked:u[0]!=="[ ]"};a.checked=d.checked,o.loose?a.tokens[0]&&["paragraph","text"].includes(a.tokens[0].type)&&"tokens"in a.tokens[0]&&a.tokens[0].tokens?(a.tokens[0].raw=d.raw+a.tokens[0].raw,a.tokens[0].text=d.raw+a.tokens[0].text,a.tokens[0].tokens.unshift(d)):a.tokens.unshift({type:"paragraph",raw:d.raw,text:d.raw,tokens:[d]}):a.tokens.unshift(d)}}if(!o.loose){let u=a.tokens.filter(p=>p.type==="space"),d=u.length>0&&u.some(p=>this.rules.other.anyLine.test(p.raw));o.loose=d}}if(o.loose)for(let a of o.items){a.loose=!0;for(let u of a.tokens)u.type==="text"&&(u.type="paragraph")}return o}}html(e){let t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){let t=this.rules.block.def.exec(e);if(t){let n=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),r=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",o=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:n,raw:t[0],href:r,title:o}}}table(e){let t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;let n=fp(t[1]),r=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),o=t[3]?.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],i={type:"table",raw:t[0],header:[],align:[],rows:[]};if(n.length===r.length){for(let s of r)this.rules.other.tableAlignRight.test(s)?i.align.push("right"):this.rules.other.tableAlignCenter.test(s)?i.align.push("center"):this.rules.other.tableAlignLeft.test(s)?i.align.push("left"):i.align.push(null);for(let s=0;s<n.length;s++)i.header.push({text:n[s],tokens:this.lexer.inline(n[s]),header:!0,align:i.align[s]});for(let s of o)i.rows.push(fp(s,i.header.length).map((l,a)=>({text:l,tokens:this.lexer.inline(l),header:!1,align:i.align[a]})));return i}}lheading(e){let t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){let t=this.rules.block.paragraph.exec(e);if(t){let n=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:n,tokens:this.lexer.inline(n)}}}text(e){let t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){let t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){let t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){let t=this.rules.inline.link.exec(e);if(t){let n=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(n)){if(!this.rules.other.endAngleBracket.test(n))return;let i=gs(n.slice(0,-1),"\\");if((n.length-i.length)%2===0)return}else{let i=qb(t[2],"()");if(i===-2)return;if(i>-1){let s=(t[0].indexOf("!")===0?5:4)+t[1].length+i;t[2]=t[2].substring(0,i),t[0]=t[0].substring(0,s).trim(),t[3]=""}}let r=t[2],o="";if(this.options.pedantic){let i=this.rules.other.pedanticHrefTitle.exec(r);i&&(r=i[1],o=i[3])}else o=t[3]?t[3].slice(1,-1):"";return r=r.trim(),this.rules.other.startAngleBracket.test(r)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(n)?r=r.slice(1):r=r.slice(1,-1)),_p(t,{href:r&&r.replace(this.rules.inline.anyPunctuation,"$1"),title:o&&o.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let n;if((n=this.rules.inline.reflink.exec(e))||(n=this.rules.inline.nolink.exec(e))){let r=(n[2]||n[1]).replace(this.rules.other.multipleSpaceGlobal," "),o=t[r.toLowerCase()];if(!o){let i=n[0].charAt(0);return{type:"text",raw:i,text:i}}return _p(n,o,n[0],this.lexer,this.rules)}}emStrong(e,t,n=""){let r=this.rules.inline.emStrongLDelim.exec(e);if(!(!r||r[3]&&n.match(this.rules.other.unicodeAlphaNumeric))&&(!(r[1]||r[2])||!n||this.rules.inline.punctuation.exec(n))){let o=[...r[0]].length-1,i,s,l=o,a=0,u=r[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(u.lastIndex=0,t=t.slice(-1*e.length+o);(r=u.exec(t))!=null;){if(i=r[1]||r[2]||r[3]||r[4]||r[5]||r[6],!i)continue;if(s=[...i].length,r[3]||r[4]){l+=s;continue}else if((r[5]||r[6])&&o%3&&!((o+s)%3)){a+=s;continue}if(l-=s,l>0)continue;s=Math.min(s,s+l+a);let d=[...r[0]][0].length,p=e.slice(0,o+r.index+d+s);if(Math.min(o,s)%2){let m=p.slice(1,-1);return{type:"em",raw:p,text:m,tokens:this.lexer.inlineTokens(m)}}let _=p.slice(2,-2);return{type:"strong",raw:p,text:_,tokens:this.lexer.inlineTokens(_)}}}}codespan(e){let t=this.rules.inline.code.exec(e);if(t){let n=t[2].replace(this.rules.other.newLineCharGlobal," "),r=this.rules.other.nonSpaceChar.test(n),o=this.rules.other.startingSpaceChar.test(n)&&this.rules.other.endingSpaceChar.test(n);return r&&o&&(n=n.substring(1,n.length-1)),{type:"codespan",raw:t[0],text:n}}}br(e){let t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){let t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){let t=this.rules.inline.autolink.exec(e);if(t){let n,r;return t[2]==="@"?(n=t[1],r="mailto:"+n):(n=t[1],r=n),{type:"link",raw:t[0],text:n,href:r,tokens:[{type:"text",raw:n,text:n}]}}}url(e){let t;if(t=this.rules.inline.url.exec(e)){let n,r;if(t[2]==="@")n=t[0],r="mailto:"+n;else{let o;do o=t[0],t[0]=this.rules.inline._backpedal.exec(t[0])?.[0]??"";while(o!==t[0]);n=t[0],t[1]==="www."?r="http://"+t[0]:r=t[0]}return{type:"link",raw:t[0],text:n,href:r,tokens:[{type:"text",raw:n,text:n}]}}}inlineText(e){let t=this.rules.inline.text.exec(e);if(t){let n=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:n}}}},jn=class wl{constructor(t){Ft(this,"tokens");Ft(this,"options");Ft(this,"state");Ft(this,"inlineQueue");Ft(this,"tokenizer");this.tokens=[],this.tokens.links=Object.create(null),this.options=t||Ur,this.options.tokenizer=this.options.tokenizer||new Bi,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let n={other:vn,block:Ni.normal,inline:ms.normal};this.options.pedantic?(n.block=Ni.pedantic,n.inline=ms.pedantic):this.options.gfm&&(n.block=Ni.gfm,this.options.breaks?n.inline=ms.breaks:n.inline=ms.gfm),this.tokenizer.rules=n}static get rules(){return{block:Ni,inline:ms}}static lex(t,n){return new wl(n).lex(t)}static lexInline(t,n){return new wl(n).inlineTokens(t)}lex(t){t=t.replace(vn.carriageReturn,`
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
`+o.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=s.text):n.push(o);continue}if(t){let s="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(s);break}else throw new Error(s)}}return this.state.top=!0,n}inline(t,n=[]){return this.inlineQueue.push({src:t,tokens:n}),n}inlineTokens(t,n=[]){let r=t,o=null;if(this.tokens.links){let a=Object.keys(this.tokens.links);if(a.length>0)for(;(o=this.tokenizer.rules.inline.reflinkSearch.exec(r))!=null;)a.includes(o[0].slice(o[0].lastIndexOf("[")+1,-1))&&(r=r.slice(0,o.index)+"["+"a".repeat(o[0].length-2)+"]"+r.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(o=this.tokenizer.rules.inline.anyPunctuation.exec(r))!=null;)r=r.slice(0,o.index)+"++"+r.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let i;for(;(o=this.tokenizer.rules.inline.blockSkip.exec(r))!=null;)i=o[2]?o[2].length:0,r=r.slice(0,o.index+i)+"["+"a".repeat(o[0].length-i-2)+"]"+r.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);r=this.options.hooks?.emStrongMask?.call({lexer:this},r)??r;let s=!1,l="";for(;t;){s||(l=""),s=!1;let a;if(this.options.extensions?.inline?.some(d=>(a=d.call({lexer:this},t,n))?(t=t.substring(a.raw.length),n.push(a),!0):!1))continue;if(a=this.tokenizer.escape(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.tag(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.link(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(a.raw.length);let d=n.at(-1);a.type==="text"&&d?.type==="text"?(d.raw+=a.raw,d.text+=a.text):n.push(a);continue}if(a=this.tokenizer.emStrong(t,r,l)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.codespan(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.br(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.del(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.autolink(t)){t=t.substring(a.raw.length),n.push(a);continue}if(!this.state.inLink&&(a=this.tokenizer.url(t))){t=t.substring(a.raw.length),n.push(a);continue}let u=t;if(this.options.extensions?.startInline){let d=1/0,p=t.slice(1),_;this.options.extensions.startInline.forEach(m=>{_=m.call({lexer:this},p),typeof _=="number"&&_>=0&&(d=Math.min(d,_))}),d<1/0&&d>=0&&(u=t.substring(0,d+1))}if(a=this.tokenizer.inlineText(u)){t=t.substring(a.raw.length),a.raw.slice(-1)!=="_"&&(l=a.raw.slice(-1)),s=!0;let d=n.at(-1);d?.type==="text"?(d.raw+=a.raw,d.text+=a.text):n.push(a);continue}if(t){let d="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(d);break}else throw new Error(d)}}return n}},Ui=class{constructor(e){Ft(this,"options");Ft(this,"parser");this.options=e||Ur}space(e){return""}code({text:e,lang:t,escaped:n}){let r=(t||"").match(vn.notSpaceStart)?.[0],o=e.replace(vn.endingNewline,"")+`
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
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${ar(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:n}){let r=this.parser.parseInline(n),o=pp(e);if(o===null)return r;e=o;let i='<a href="'+e+'"';return t&&(i+=' title="'+ar(t)+'"'),i+=">"+r+"</a>",i}image({href:e,title:t,text:n,tokens:r}){r&&(n=this.parser.parseInline(r,this.parser.textRenderer));let o=pp(e);if(o===null)return ar(n);e=o;let i=`<img src="${e}" alt="${n}"`;return t&&(i+=` title="${ar(t)}"`),i+=">",i}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:ar(e.text)}},Il=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}checkbox({raw:e}){return e}},Fn=class $l{constructor(t){Ft(this,"options");Ft(this,"renderer");Ft(this,"textRenderer");this.options=t||Ur,this.options.renderer=this.options.renderer||new Ui,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new Il}static parse(t,n){return new $l(n).parse(t)}static parseInline(t,n){return new $l(n).parseInline(t)}parse(t){let n="";for(let r=0;r<t.length;r++){let o=t[r];if(this.options.extensions?.renderers?.[o.type]){let s=o,l=this.options.extensions.renderers[s.type].call({parser:this},s);if(l!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(s.type)){n+=l||"";continue}}let i=o;switch(i.type){case"space":{n+=this.renderer.space(i);break}case"hr":{n+=this.renderer.hr(i);break}case"heading":{n+=this.renderer.heading(i);break}case"code":{n+=this.renderer.code(i);break}case"table":{n+=this.renderer.table(i);break}case"blockquote":{n+=this.renderer.blockquote(i);break}case"list":{n+=this.renderer.list(i);break}case"checkbox":{n+=this.renderer.checkbox(i);break}case"html":{n+=this.renderer.html(i);break}case"def":{n+=this.renderer.def(i);break}case"paragraph":{n+=this.renderer.paragraph(i);break}case"text":{n+=this.renderer.text(i);break}default:{let s='Token with "'+i.type+'" type was not found.';if(this.options.silent)return console.error(s),"";throw new Error(s)}}}return n}parseInline(t,n=this.renderer){let r="";for(let o=0;o<t.length;o++){let i=t[o];if(this.options.extensions?.renderers?.[i.type]){let l=this.options.extensions.renderers[i.type].call({parser:this},i);if(l!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(i.type)){r+=l||"";continue}}let s=i;switch(s.type){case"escape":{r+=n.text(s);break}case"html":{r+=n.html(s);break}case"link":{r+=n.link(s);break}case"image":{r+=n.image(s);break}case"checkbox":{r+=n.checkbox(s);break}case"strong":{r+=n.strong(s);break}case"em":{r+=n.em(s);break}case"codespan":{r+=n.codespan(s);break}case"br":{r+=n.br(s);break}case"del":{r+=n.del(s);break}case"text":{r+=n.text(s);break}default:{let l='Token with "'+s.type+'" type was not found.';if(this.options.silent)return console.error(l),"";throw new Error(l)}}}return r}},ji,hs=(ji=class{constructor(e){Ft(this,"options");Ft(this,"block");this.options=e||Ur}preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}emStrongMask(e){return e}provideLexer(){return this.block?jn.lex:jn.lexInline}provideParser(){return this.block?Fn.parse:Fn.parseInline}},Ft(ji,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens","emStrongMask"])),Ft(ji,"passThroughHooksRespectAsync",new Set(["preprocess","postprocess","processAllTokens"])),ji),jb=class{constructor(...e){Ft(this,"defaults",xl());Ft(this,"options",this.setOptions);Ft(this,"parse",this.parseMarkdown(!0));Ft(this,"parseInline",this.parseMarkdown(!1));Ft(this,"Parser",Fn);Ft(this,"Renderer",Ui);Ft(this,"TextRenderer",Il);Ft(this,"Lexer",jn);Ft(this,"Tokenizer",Bi);Ft(this,"Hooks",hs);this.use(...e)}walkTokens(e,t){let n=[];for(let r of e)switch(n=n.concat(t.call(this,r)),r.type){case"table":{let o=r;for(let i of o.header)n=n.concat(this.walkTokens(i.tokens,t));for(let i of o.rows)for(let s of i)n=n.concat(this.walkTokens(s.tokens,t));break}case"list":{let o=r;n=n.concat(this.walkTokens(o.items,t));break}default:{let o=r;this.defaults.extensions?.childTokens?.[o.type]?this.defaults.extensions.childTokens[o.type].forEach(i=>{let s=o[i].flat(1/0);n=n.concat(this.walkTokens(s,t))}):o.tokens&&(n=n.concat(this.walkTokens(o.tokens,t)))}}return n}use(...e){let t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(n=>{let r={...n};if(r.async=this.defaults.async||r.async||!1,n.extensions&&(n.extensions.forEach(o=>{if(!o.name)throw new Error("extension name required");if("renderer"in o){let i=t.renderers[o.name];i?t.renderers[o.name]=function(...s){let l=o.renderer.apply(this,s);return l===!1&&(l=i.apply(this,s)),l}:t.renderers[o.name]=o.renderer}if("tokenizer"in o){if(!o.level||o.level!=="block"&&o.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let i=t[o.level];i?i.unshift(o.tokenizer):t[o.level]=[o.tokenizer],o.start&&(o.level==="block"?t.startBlock?t.startBlock.push(o.start):t.startBlock=[o.start]:o.level==="inline"&&(t.startInline?t.startInline.push(o.start):t.startInline=[o.start]))}"childTokens"in o&&o.childTokens&&(t.childTokens[o.name]=o.childTokens)}),r.extensions=t),n.renderer){let o=this.defaults.renderer||new Ui(this.defaults);for(let i in n.renderer){if(!(i in o))throw new Error(`renderer '${i}' does not exist`);if(["options","parser"].includes(i))continue;let s=i,l=n.renderer[s],a=o[s];o[s]=(...u)=>{let d=l.apply(o,u);return d===!1&&(d=a.apply(o,u)),d||""}}r.renderer=o}if(n.tokenizer){let o=this.defaults.tokenizer||new Bi(this.defaults);for(let i in n.tokenizer){if(!(i in o))throw new Error(`tokenizer '${i}' does not exist`);if(["options","rules","lexer"].includes(i))continue;let s=i,l=n.tokenizer[s],a=o[s];o[s]=(...u)=>{let d=l.apply(o,u);return d===!1&&(d=a.apply(o,u)),d}}r.tokenizer=o}if(n.hooks){let o=this.defaults.hooks||new hs;for(let i in n.hooks){if(!(i in o))throw new Error(`hook '${i}' does not exist`);if(["options","block"].includes(i))continue;let s=i,l=n.hooks[s],a=o[s];hs.passThroughHooks.has(i)?o[s]=u=>{if(this.defaults.async&&hs.passThroughHooksRespectAsync.has(i))return(async()=>{let p=await l.call(o,u);return a.call(o,p)})();let d=l.call(o,u);return a.call(o,d)}:o[s]=(...u)=>{if(this.defaults.async)return(async()=>{let p=await l.apply(o,u);return p===!1&&(p=await a.apply(o,u)),p})();let d=l.apply(o,u);return d===!1&&(d=a.apply(o,u)),d}}r.hooks=o}if(n.walkTokens){let o=this.defaults.walkTokens,i=n.walkTokens;r.walkTokens=function(s){let l=[];return l.push(i.call(this,s)),o&&(l=l.concat(o.call(this,s))),l}}this.defaults={...this.defaults,...r}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return jn.lex(e,t??this.defaults)}parser(e,t){return Fn.parse(e,t??this.defaults)}parseMarkdown(e){return(t,n)=>{let r={...n},o={...this.defaults,...r},i=this.onError(!!o.silent,!!o.async);if(this.defaults.async===!0&&r.async===!1)return i(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof t>"u"||t===null)return i(new Error("marked(): input parameter is undefined or null"));if(typeof t!="string")return i(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(t)+", string expected"));if(o.hooks&&(o.hooks.options=o,o.hooks.block=e),o.async)return(async()=>{let s=o.hooks?await o.hooks.preprocess(t):t,l=await(o.hooks?await o.hooks.provideLexer():e?jn.lex:jn.lexInline)(s,o),a=o.hooks?await o.hooks.processAllTokens(l):l;o.walkTokens&&await Promise.all(this.walkTokens(a,o.walkTokens));let u=await(o.hooks?await o.hooks.provideParser():e?Fn.parse:Fn.parseInline)(a,o);return o.hooks?await o.hooks.postprocess(u):u})().catch(i);try{o.hooks&&(t=o.hooks.preprocess(t));let s=(o.hooks?o.hooks.provideLexer():e?jn.lex:jn.lexInline)(t,o);o.hooks&&(s=o.hooks.processAllTokens(s)),o.walkTokens&&this.walkTokens(s,o.walkTokens);let l=(o.hooks?o.hooks.provideParser():e?Fn.parse:Fn.parseInline)(s,o);return o.hooks&&(l=o.hooks.postprocess(l)),l}catch(s){return i(s)}}}onError(e,t){return n=>{if(n.message+=`
Please report this to https://github.com/markedjs/marked.`,e){let r="<p>An error occurred:</p><pre>"+ar(n.message+"",!0)+"</pre>";return t?Promise.resolve(r):r}if(t)return Promise.reject(n);throw n}}},Br=new jb;function Mt(e,t){return Br.parse(e,t)}Mt.options=Mt.setOptions=function(e){return Br.setOptions(e),Mt.defaults=Br.defaults,mp(Mt.defaults),Mt};Mt.getDefaults=xl;Mt.defaults=Ur;Mt.use=function(...e){return Br.use(...e),Mt.defaults=Br.defaults,mp(Mt.defaults),Mt};Mt.walkTokens=function(e,t){return Br.walkTokens(e,t)};Mt.parseInline=Br.parseInline;Mt.Parser=Fn;Mt.parser=Fn.parse;Mt.Renderer=Ui;Mt.TextRenderer=Il;Mt.Lexer=jn;Mt.lexer=jn.lex;Mt.Tokenizer=Bi;Mt.Hooks=hs;Mt.parse=Mt;var h0=Mt.options,b0=Mt.setOptions,y0=Mt.use,v0=Mt.walkTokens,k0=Mt.parseInline;var w0=Fn.parse,$0=jn.lex;function vr(e){let t=Mt.parse(e),n=ap.sanitize(t);return lp(n)}function lr(e,t){return c`<div class="prompt-block">
    <div class="prompt-block__label">${e}</div>
    <pre class="prompt-block__body">${t}</pre>
  </div>`}function $o(e){return e.loading?c`<div class="prompt-block__status">불러오는 중…</div>`:e.error?c`<div class="prompt-block__status prompt-block__status--error">
      프롬프트를 불러오지 못했습니다
    </div>`:""}function Hi(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),n=r=>String(r).padStart(2,"0");return`${t.getFullYear()}-${n(t.getMonth()+1)}-${n(t.getDate())} ${n(t.getHours())}:${n(t.getMinutes())}`}var Ep={Read:"\u{1F4D6}",Edit:"\u270E",MultiEdit:"\u270E",Write:"\u{1F4DD}",Bash:"\u26A1",Grep:"\u{1F50E}",Glob:"\u{1F50E}",Task:"\u{1F916}",Agent:"\u{1F916}",WebFetch:"\u{1F310}",WebSearch:"\u{1F310}"},Fb={command_execution:"\uBA85\uB839 \uC2E4\uD589",file_change:"\uD30C\uC77C \uBCC0\uACBD",mcp_call:"MCP \uD638\uCD9C",web_search:"\uC6F9 \uAC80\uC0C9",plan:"\uACC4\uD68D"},Bb=/^\s*([✓✗⊘])\s*(spec|impl|implementation|plan)\s*게이트\s*[—–-]\s*(\S+)\s+(APPROVE|REVISE|REJECT|BLOCK|SKIP)(?:\s*·\s*(.+))?/,Ub=/^\s*#{0,3}\s*Phase\s+\d+(?:\s*\/\s*\d+)?\s*(?:[·:—–-]\s*.+)?$/;function Bn(e){return!!e&&typeof e=="object"}function Ll(e){return typeof e!="string"||e.length===0?[]:e.split(/\r?\n/)}function Dl(e,t){let n=Ll(e),r=Ll(t),o=new Map;for(let l of n)o.set(l,(o.get(l)||0)+1);let i=0;for(let l of r){let a=o.get(l)||0;a>0?o.set(l,a-1):i+=1}let s=0;for(let l of o.values())s+=l;return{added:i,removed:s}}function Tp(e){let t="";typeof e=="string"?t=e:Array.isArray(e)?t=e.map(o=>Bn(o)&&typeof o.text=="string"?o.text:"").join(""):Bn(e)&&typeof e.text=="string"&&(t=e.text);let r=(String(t).split(/\r?\n/).find(o=>o.trim().length>0)||"").trim();return r.length>120?`${r.slice(0,117)}\u2026`:r}function Wb(e){let t=String(e.name||""),n=e.input||{},r={kind:"tool",tool:t,icon:Ep[t]||"\u{1F527}",input:n,expandable:!0};if((t==="Read"||t==="Write")&&(r.path=String(n.file_path||n.path||"")),t==="Write"&&(r.added=Ll(n.content).length),t==="Edit"){r.path=String(n.file_path||n.path||"");let{added:o,removed:i}=Dl(n.old_string,n.new_string);r.added=o,r.removed=i}if(t==="MultiEdit"){r.path=String(n.file_path||n.path||"");let o=0,i=0,s=Array.isArray(n.edits)?n.edits:[];for(let l of s){let a=Dl(Bn(l)?l.old_string:"",Bn(l)?l.new_string:"");o+=a.added,i+=a.removed}r.added=o,r.removed=i}return t==="Bash"&&(r.command=String(n.command||"")),(t==="Grep"||t==="Glob")&&(r.command=String(n.pattern||n.query||"")),t==="Agent"&&(typeof e.id=="string"&&e.id.length>0&&(r.launch_id=e.id),typeof n.description=="string"&&(r.command=n.description)),r}function Pl(e){return typeof e!="string"||e.trim().length===0?null:{kind:"thinking",text:e}}var zb=/<system-reminder>[\s\S]*?<\/system-reminder>/g;function Cp(e){let t;if(typeof e=="string")t=e;else if(Array.isArray(e))t=e.filter(r=>Bn(r)&&r.type==="text"&&typeof r.text=="string").map(r=>String(r.text)).join(`
`);else return null;let n=t.replace(zb,"").trim();return n.length>0?{kind:"user",text:n}:null}function Ml(e){let t=e.split(/\r?\n/).find(r=>r.trim().length>0)||"",n=Bb.exec(t);return n?{kind:"gate",gate:n[2]==="implementation"?"impl":n[2],reviewer:n[3],verdict:n[4],time:n[5]?n[5].trim():void 0,text:t.trim()}:Ub.test(t)&&t.trim().length<=80?{kind:"phase",text:t.trim()}:{kind:"assistant",text:e}}function Hb(e,t){if(e.subtype==="init"){let n=typeof e.model=="string"?e.model:"";return t.progress=null,[{kind:"thinking",text:n?`\uC138\uC158 \uC2DC\uC791 \xB7 ${n}`:"\uC138\uC158 \uC2DC\uC791"}]}if(e.subtype==="thinking_tokens"){let r=`\uC0DD\uAC01 \uC911\u2026 ${typeof e.estimated_tokens=="number"&&Number.isFinite(e.estimated_tokens)?Math.max(0,Math.round(e.estimated_tokens)):0} \uD1A0\uD070`;return t.progress?(t.progress.text=r,[]):(t.progress={kind:"thinking",text:r},[t.progress])}return[]}function Kb(e,t){let n=typeof e.parent_tool_use_id=="string"&&e.parent_tool_use_id.length>0?e.parent_tool_use_id:null;if(e.type==="assistant"){let r=e.message,o=r&&Array.isArray(r.content)?r.content:[],i=[];for(let s of o)if(Bn(s)){if(s.type==="text"&&typeof s.text=="string")i.push(Ml(s.text));else if(s.type==="thinking"){let l=Pl(s.thinking);l&&i.push(l)}else if(s.type==="tool_use"){let l=Wb(s);typeof s.id=="string"&&t.set(s.id,l),i.push(l)}}return n?Sp(i,n):i}if(e.type==="user"){let r=e.message,o=r&&Array.isArray(r.content)?r.content:[];for(let s of o)if(Bn(s)&&s.type==="tool_result"){let l=t.get(String(s.tool_use_id));if(l){let a=Tp(s.content);l.result=a,l.output=typeof s.content=="string"?s.content:a,s.is_error===!0&&(l.is_error=!0)}}let i=Cp(r&&r.content);return i?[i]:[]}if(e.type==="result"){let r=e.is_error===!1&&e.subtype==="success",o={kind:"result",success:r,text:typeof e.result=="string"?e.result:r?"DONE":""};return n?Sp([o],n):[o]}return[]}function Sp(e,t){for(let n of e)n.parent_tool_use_id=t;return e}function Gb(e){let t=typeof e.command=="string"?e.command:"",n=Tp(e.aggregated_output===void 0?e.output:e.aggregated_output),o=[typeof e.exit_code=="number"&&Number.isFinite(e.exit_code)?`exit ${e.exit_code}`:typeof e.status=="string"&&e.status.length>0?e.status:"",n].filter(s=>s.length>0).join(" \xB7 "),i={kind:"tool",tool:"shell",icon:Ep.Bash,command:t,input:{command:t},expandable:!0};return o.length>0&&(i.result=o),typeof e.aggregated_output=="string"&&(i.output=e.aggregated_output),i}function Yb(e){if(e.type==="item.completed"&&Bn(e.item)){let t=e.item;if(t.type==="agent_message"&&typeof t.text=="string")return[Ml(t.text)];if(t.type==="user_message"){let n=Cp(t.text);return n?[n]:[]}if(t.type==="reasoning"){let n=Pl(t.text);return n?[n]:[]}return t.type==="error"?[{kind:"error",text:String(t.message||"")}]:t.type==="command_execution"?[Gb(t)]:[]}if(e.type==="turn.completed")return[{kind:"result",success:!0,text:"DONE"}];if(e.type==="turn.failed"){let t=e.error;return[{kind:"error",text:t&&typeof t.message=="string"?t.message:"turn failed"}]}return e.type==="error"?[{kind:"error",text:String(e.message||"")}]:[]}function Vb(e){if(e.schema!=="codex-delegation-monitor-v1"||!Bn(e.event))return[];let t=e.event;if(t.type==="session.started"||t.type==="turn.started")return[];if((t.type==="item.started"||t.type==="item.completed")&&Bn(t.item)){let n=t.item;if(typeof n.id!="string"||n.id.length===0)return[];if(t.type==="item.completed"&&n.kind==="agent_message"&&typeof n.text=="string"&&n.text.trim().length>0)return[Ml(n.text)];if(t.type==="item.completed"&&n.kind==="reasoning"){let s=Pl(n.text);return s?[s]:[]}if(t.type!=="item.completed"||n.kind!=="activity"||typeof n.activity!="string")return[];let r=Fb[n.activity];if(!r)return[];let o,i;if(n.status==="completed")o="\uC644\uB8CC",i="\u2713";else if(n.status==="failed")o="\uC2E4\uD328",i="\u2717";else return[];return[{kind:"tool",tool:`${r} \xB7 ${o}`,icon:i,expandable:!1,result:""}]}return t.type==="turn.completed"&&t.status==="completed"?[{kind:"result",success:!0,text:"DONE"}]:t.type==="turn.failed"&&(t.status==="failed"||t.status==="interrupted")&&typeof t.error_code=="string"&&t.error_code.length>0?[{kind:"error",text:t.error_code}]:[]}function Qb(e){let t=e.type;return typeof t=="string"&&(t==="error"||t.startsWith("thread.")||t.startsWith("turn.")||t.startsWith("item."))}function Xb(e){let t=e;if(typeof e=="string"){let n=e.trim();if(n.length===0)return null;try{t=JSON.parse(n)}catch{return null}}return Bn(t)?t:null}function Op(e={}){let t=e.skip_delegated===!0,n=new Map,r={progress:null};return{push(o){let i=Xb(o);if(!i)return[];if(t&&typeof i.parent_tool_use_id=="string"&&i.parent_tool_use_id.length>0)return[];if(i.type==="system"&&i.schema!=="codex-delegation-monitor-v1")return Hb(i,r);let s=i.schema==="codex-delegation-monitor-v1"?Vb(i):Qb(i)?Yb(i):Kb(i,n);return s.length>0&&(r.progress=null),s}}}function ql(e){let t=[],n=Op(),r=Array.isArray(e)?e:[];for(let o of r)for(let i of n.push(o))t.push(i);return t}var Zb=5,Jb=10,ey=/Task\s+#(\d+)/,ty=/\bgh\s+pr\s+create\b|\bgit\s+push\b/,ny=/\bnpm\s+(?:run\s+)?(?:test|tsc|lint|build)\b|\bvitest\b/;function vs(e){return typeof e!="string"?"":(e.split(/\r?\n/).find(t=>t.trim().length>0)||"").trim()}function ry(e){return typeof e!="string"||e.length===0?0:e.split(/\r?\n/).length}function oy(e){for(let t=e.length-1;t>=0;t-=1){let n=e[t];if(n.kind==="phase"||n.kind==="gate")return n.text||null}return null}function sy(e){let t=new Map,n=0;for(let o of e){if(o.kind!=="tool")continue;n+=1;let i=o.input||{};if(o.tool==="TaskCreate"){let a=ey.exec(o.output||o.result||""),u=String(i.activeForm||i.subject||"").trim();if(!a||u.length===0)continue;t.set(a[1],{label:u,active:i.status==="in_progress"?n:0});continue}if(o.tool!=="TaskUpdate")continue;let s=t.get(String(i.taskId??""));if(!s)continue;let l=i.activeForm||i.subject;typeof l=="string"&&l.trim().length>0&&(s.label=l.trim()),typeof i.status=="string"&&(s.active=i.status==="in_progress"?n:0)}let r=null;for(let o of t.values())o.active>0&&(!r||o.active>r.active)&&(r=o);return r?r.label:null}function iy(e){if(e.tool==="Bash"){let t=e.command||"";return ty.test(t)?"~ PR/\uAC8C\uC2DC \uC911":ny.test(t)?"~ \uAC80\uC99D \uC911":null}return e.tool==="Edit"||e.tool==="Write"||e.tool==="MultiEdit"?"~ \uAD6C\uD604 \uC911":e.tool==="Read"||e.tool==="Grep"||e.tool==="Glob"?"~ \uD0D0\uC0C9 \uC911":null}function ay(e){let t=e.filter(o=>o.kind==="tool").slice(-Jb),n=new Map;t.forEach((o,i)=>{let s=iy(o);if(!s)return;let l=n.get(s)||{count:0,last:-1};l.count+=1,l.last=i,n.set(s,l)});let r=null;for(let[o,i]of n)(!r||i.count>r.count||i.count===r.count&&i.last>r.last)&&(r={label:o,count:i.count,last:i.last});return r?r.label:null}function ly(e){let t=oy(e);if(t)return{text:t,guess:!1};let n=sy(e);if(n)return{text:n,guess:!1};let r=ay(e);return r?{text:r,guess:!0}:null}function cy(e,t){if(typeof e!="number")return"";let n=Math.max(0,Math.floor((t-e)/1e3));return n<60?`${n}\uCD08 \uC804`:mn(e,t)}function xo(e,t={}){let{transport:n,sessionLogStore:r,onClose:o}=t,i=null,s=null,l=null,a=null,u=null,d=!1,p={},_=!0,m=new Set,v=new Set,O=null,R=null,Q=!1,ee=!1,K=!1,L=null,I=null;function P(){Q=!1,ee=!1,K=!1,L=null,I=null}async function F(Y){if(n){ee=!0,K=!1,Re();try{let V=await Promise.resolve(n("get-attempt-prompt",{attempt_id:Y,...u?{root_dir:u}:{}}));if(i!==Y)return;!V||typeof V!="object"||Array.isArray(V)?K=!0:(L=V,I=Y)}catch{i===Y&&(K=!0)}finally{i===Y&&(ee=!1,Re())}}}function G(){if(Q=!Q,Q&&i&&I!==i){F(i);return}Re()}function q(){if(!Q)return"";let Y=$o({loading:ee,error:K});if(Y)return c`<div class="sv__prompt" data-seam="attempt-prompt">
        ${Y}
      </div>`;if(!L)return"";if(L.missing)return c`<div class="sv__prompt" data-seam="attempt-prompt">
        <div class="prompt-block__status">
          기록 없음 — 프롬프트 기록 이전에 실행된 attempt입니다
        </div>
      </div>`;let V=Hi(L.recorded_at);return c`<div class="sv__prompt" data-seam="attempt-prompt">
      ${V?c`<div class="prompt-block__meta">${V} 발송</div>`:""}
      ${typeof L.task_prompt=="string"?lr("\uACFC\uC5C5 (user)",L.task_prompt):""}
      ${typeof L.system_prompt=="string"?lr("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",L.system_prompt):""}
    </div>`}function N(){if(!a||!r)return[];let Y=r.get(a);return ql(Y?Y.lines:[])}function H(){if(!a||!r)return null;let Y=r.get(a),V=Y?Y.last_event_at:null;return typeof V=="number"?V:null}function W(){return p.status==="running"}function ne(){if(W()&&i){R||(R=setInterval(()=>Re(),1e3));return}he()}function he(){R&&(clearInterval(R),R=null)}function qe(Y){let V=[],xe=0;for(;xe<Y.length;){let{idx:bt,line:_t}=Y[xe];if(_t.kind==="tool"){let Ke=xe;for(;Ke<Y.length&&Y[Ke].line.kind==="tool"&&Y[Ke].line.tool===_t.tool;)Ke+=1;if(Ke-xe>=Zb&&!v.has(bt)){V.push({kind:"group",idx:bt,tool:_t.tool||"",lines:Y.slice(xe,Ke)}),xe=Ke;continue}}V.push({kind:"line",idx:bt,line:_t}),xe+=1}return V}function B(Y){let V=[],xe=new Map;for(let Ke=0;Ke<Y.length;Ke+=1){let nt=Y[Ke],x=nt.parent_tool_use_id;if(typeof x=="string"&&x.length>0){let Z=xe.get(x);Z||(Z={kind:"subagent",idx:Ke,launch_id:x,agent_type:null,header:null,lines:[]},xe.set(x,Z),V.push(Z)),Z.lines.push({idx:Ke,line:nt});continue}if(nt.kind==="tool"&&nt.tool==="Agent"&&typeof nt.launch_id=="string"&&nt.launch_id.length>0){let Z=te(nt),Oe=xe.get(nt.launch_id);if(Oe){Oe.header={idx:Ke,line:nt},Oe.agent_type=Z;continue}let Ye={kind:"subagent",idx:Ke,launch_id:nt.launch_id,agent_type:Z,header:{idx:Ke,line:nt},lines:[]};xe.set(nt.launch_id,Ye),V.push(Ye);continue}V.push({kind:"entry",idx:Ke,line:nt})}let bt=[],_t=0;for(;_t<V.length;){if(V[_t].kind!=="entry"){bt.push(V[_t]),_t+=1;continue}let Ke=_t;for(;Ke<V.length&&V[Ke].kind==="entry";)Ke+=1;bt.push(...qe(V.slice(_t,Ke))),_t=Ke}return bt}function te(Y){let V=Y.input;return V&&typeof V.subagent_type=="string"?V.subagent_type:null}function me(Y){for(let V=Y.length-1;V>=0;V-=1){let xe=Y[V];if(xe.kind==="result"||xe.kind==="error")return null;if(xe.kind==="tool"&&!Object.hasOwn(xe,"result"))return xe}return null}function Te(Y){for(let V=Y.length-1;V>=0;V-=1)if(Y[V].kind==="thinking")return Y[V];return null}function C(Y,V){if(V.kind==="gate")return c`<div class="sv__gate">${V.text}</div>`;if(V.kind==="phase")return c`<div class="sv__phase">${V.text}</div>`;if(V.kind==="result")return c`<div
        class="sv__result${V.success?" sv__result--ok":" sv__result--fail"}"
      >
        <span class="sv__result-glyph">${V.success?"\u2713":"\u2717"}</span>
        <span class="sv__result-body"
          >${vr(V.text||(V.success?"DONE":"\uC2E4\uD328"))}</span
        >
      </div>`;if(V.kind==="thinking"){let xe=m.has(Y);return c`<div
        class="sv__think${xe?" sv__think--expanded":""}"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>ft(Y)}
      >
        <span class="sv__think-line">💭 ${vs(V.text)}</span>
        ${xe?c`<pre class="sv__think-expand">${V.text}</pre>`:""}
      </div>`}if(V.kind==="user"){let xe=m.has(Y);return c`<div
        class="sv__line sv__line--user${xe?" sv__line--expanded":""}"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>ft(Y)}
      >
        <span class="sv__user-line">▷ ${vs(V.text)}</span>
        ${xe?c`<pre class="sv__user-expand">${V.text}</pre>`:""}
      </div>`}if(V.kind==="error")return c`<div class="sv__error">⛔ ${V.text}</div>`;if(V.kind==="blocker")return c`<div class="sv__error">⛔ ${V.text}</div>`;if(V.kind==="tool"){let xe=m.has(Y),bt=V.tool==="Bash"?ry(V.command):0,_t=V.tool==="Bash"?bt>1?vs(V.command):V.command:V.path||V.command||"";return c`<div
        class="sv__tool${xe?" sv__tool--expanded":""}"
        role="button"
        tabindex="0"
        @click=${()=>ft(Y)}
      >
        <span class="sv__tool-line">
          <span class="sv__tool-icon">${V.icon}</span>
          <span class="sv__tool-name">${V.tool}</span>
          ${_t?c`<span class="sv__tool-detail">${_t}</span>`:""}
          ${bt>1?c`<span class="sv__tool-more">⋯ ${bt}줄</span>`:""}
          ${typeof V.added=="number"?c`<span class="sv__diff-add">+${V.added}</span>`:""}
          ${typeof V.removed=="number"?c`<span class="sv__diff-del">−${V.removed}</span>`:""}
          ${V.result?c`<span class="sv__tool-ok">→ ${V.result}</span>`:""}
        </span>
        ${xe?c`<pre class="sv__tool-expand">${se(V)}</pre>`:""}
      </div>`}return c`<div class="sv__as">${vr(V.text||"")}</div>`}function se(Y){let V=[];if(Y.tool==="Bash"&&typeof Y.command=="string"&&Y.command.length>0)V.push(Y.command);else if(Y.input!==void 0)try{V.push(`input: ${JSON.stringify(Y.input,null,2)}`)}catch{}return typeof Y.output=="string"&&Y.output.length>0&&V.push(`output:
${Y.output}`),V.join(`

`)}function ve(){if(!i)return c``;let Y=N(),V=(s?[p.agent_type,p.model,p.effort]:[p.runner,p.model,p.effort]).filter(Boolean).join(" \xB7 "),xe=p.session_id||"",bt=`\uB77C\uC774\uBE0C \uB530\uB77C\uAC00\uAE30 ${_?"ON":"OFF"}`,_t=W(),Ke=_t?cy(H(),Date.now()):"",nt=_t?me(Y):null,x=_t?Te(Y):null,Z=ly(Y);return c`<div class="sv" data-attempt-id=${i}>
      <div class="sv__bar">
        <span class="sv__id"
          >${p.label||(s?p.role||"":i)}</span
        >
        ${Z?c`<span
              class="sv__stage${Z.guess?" sv__stage--guess":""}"
              title=${Z.text}
              >${Z.text}</span
            >`:""}
        ${_t?c`<span
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
        ${V?c`<span class="sv__meta">${V}</span>`:""}
        ${p.worktree?c`<span class="sv__wt" title=${p.worktree}
              >${p.worktree}</span
            >`:""}
        ${s||d?"":c`<button
              type="button"
              class="sv__prompt-toggle${Q?" sv__prompt-toggle--on":""}"
              data-seam="attempt-prompt-toggle"
              aria-pressed=${Q?"true":"false"}
              aria-label="발송 프롬프트 보기"
              title="이 세션에 실제로 보낸 시스템·과업 프롬프트"
              @click=${G}
            >
              ✉ 프롬프트
            </button>`}
        <button
          type="button"
          class="sv__follow${_?" sv__follow--on":""}"
          aria-pressed=${_?"true":"false"}
          aria-label=${bt}
          @click=${X}
        >
          <span class="sv__follow-full">⇣ ${bt}</span>
          <span class="sv__follow-short">⇣ ${_?"ON":"OFF"}</span>
        </button>
        <button
          type="button"
          class="sv__close"
          aria-label="닫기"
          @click=${()=>ze()}
        >
          ✕
        </button>
      </div>
      ${s||d?"":q()}
      <div class="sv__body">
        ${Y.length===0?c`<div class="sv__empty">세션 로그 없음</div>`:B(Y).map(Oe=>Oe.kind==="subagent"?De(Oe):Oe.kind==="group"?ye(Oe):C(Oe.idx,Oe.line))}
      </div>
      ${nt||x?c`<div class="sv__now">
            <span class="sv__now-label">지금</span>
            ${nt?c`<span class="sv__now-icon">${nt.icon}</span>
                  <span class="sv__now-name">${nt.tool}</span>
                  <span class="sv__now-detail"
                    >${nt.tool==="Bash"?vs(nt.command):nt.path||nt.command||""}</span
                  >`:""}
            ${x?c`<span class="sv__now-think"
                  >💭 ${vs(x.text)}</span
                >`:""}
          </div>`:""}
    </div>`}function ye(Y){return c`<div
      class="sv__group"
      role="button"
      tabindex="0"
      title="펼치기"
      @click=${()=>ge(Y.idx)}
    >
      <span class="sv__group-icon">${Y.lines[0].line.icon}</span>
      <span class="sv__group-name">${Y.tool}</span>
      <span class="sv__group-count">${Y.lines.length}</span>
      <span class="sv__group-caret" aria-hidden="true">▸</span>
    </div>`}function De(Y){let V=v.has(Y.idx),xe=Y.header?Y.header.line:null,bt=xe?xe.is_error===!0?"\u2717":typeof xe.result=="string"?"\u2713":"\u27F3":"",_t=xe&&xe.command?xe.command:"";return c`<div class="sv__sub${V?" sv__sub--open":""}">
      <div
        class="sv__sub-head"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>ge(Y.idx)}
      >
        <span class="sv__sub-icon" aria-hidden="true">🤖</span>
        <span class="sv__sub-name">${Y.agent_type||"subagent"}</span>
        ${_t?c`<span class="sv__sub-detail">${_t}</span>`:""}
        <span class="sv__sub-count">${Y.lines.length}줄</span>
        ${bt?c`<span class="sv__sub-state">${bt}</span>`:""}
        ${V?"":c`<span class="sv__sub-caret" aria-hidden="true">▸</span>`}
      </div>
      ${V?c`<div class="sv__sub-body">
            ${qe(Y.lines).map(Ke=>Ke.kind==="group"?ye(Ke):C(Ke.idx,Ke.line))}
          </div>`:""}
    </div>`}function ge(Y){v.add(Y),Re()}function Re(){mt(ve(),e),ne(),_&&Ze()}function Ze(){let Y=e.querySelector(".sv__body");Y&&(Y.scrollTop=Y.scrollHeight)}function ft(Y){m.has(Y)?m.delete(Y):m.add(Y),Re()}function X(){_=!_,Re()}function J(Y){gn(Y).then(V=>{V?_e("\uBCF5\uC0AC\uB428","success",1200):_e("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function re(Y){!i||!Y||(p={...p,...Y},Re())}function ae(Y){let V=Y.target;if(!V||!V.classList||!V.classList.contains("sv__body"))return;!(V.scrollHeight-V.scrollTop-V.clientHeight<=4)&&_&&(_=!1,Re())}e.addEventListener("scroll",ae,!0);function Ee(Y){let V=Y.target;!V||typeof V.closest!="function"||e.contains(V)||V.closest("dialog")||V.closest(".md-viewer-root")||ze()}let fe=!1;function Pe(){fe||(document.addEventListener("mousedown",Ee),fe=!0)}function Ue(){fe&&(document.removeEventListener("mousedown",Ee),fe=!1)}function Qe(Y){let V=Y&&Y.attempt_id;if(!V)return;let xe=typeof Y.launch_id=="string"&&Y.launch_id.length>0?Y.launch_id:null,bt=Y.session_ref&&typeof Y.session_ref=="object"?Y.session_ref:null;if(xe&&bt)return;let _t=a;i=V,s=xe,l=bt,a=s?`session-log:${i}:${s}`:`session-log:${i}`,n&&_t&&_t!==a&&Promise.resolve(n("unsubscribe-session-log",{id:_t})).catch(()=>{}),u=typeof Y.root_dir=="string"&&Y.root_dir.length>0?Y.root_dir:null,p=Y.meta||{},d=Y.hide_prompt===!0,_=!0,m.clear(),v.clear(),P(),!O&&r&&(O=r.subscribe(Re)),n&&Promise.resolve(n("subscribe-session-log",{id:a,attempt_id:i,...s?{launch_id:s}:{},...l?{session_ref:l}:{},...u?{root_dir:u}:{}})).catch(()=>{}),Pe(),Re()}function ze(){let Y=a;Ue(),i=null,s=null,l=null,a=null,u=null,d=!1,m.clear(),v.clear(),P(),he(),n&&Y&&Promise.resolve(n("unsubscribe-session-log",{id:Y})).catch(()=>{}),mt(c``,e),o&&o()}return{open:Qe,updateMeta:re,close:ze,isOpen(){return i!==null},destroy(){he(),Ue(),O&&(O(),O=null),e.removeEventListener("scroll",ae,!0),i=null,s=null,l=null,a=null,u=null,d=!1,mt(c``,e)}}}function uy(e){let t=[],n=e?.workflow?.stages,r=n?.spec?.doc;r&&t.push({kind:"spec",path:r.path,missing_state:r.missing_state});let o=n?.plan?.doc;return o&&t.push({kind:"plan",path:o.path,missing_state:o.missing_state}),t}function Rp(e,t){let n=uy(e);return c`
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
  `}var dy="## \u{1F916} \uC791\uC5C5 \uBCF4\uACE0\uC11C",py=/^> (worker · attempt|session · sid) ([A-Za-z0-9._-]{1,64}) · (\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z)$/,fy=/^\*\*결론\*\* — (.+)$/;function Ki(e){if(typeof e!="string"||e.length===0)return null;let t=e.split(/\r?\n/);if(t[0]!==dy)return null;let n=py.exec(t[1]||"");if(!n)return null;let r=n[1].split(" ")[0],o=n[2],i=n[3],s=2;for(;s<t.length&&t[s].trim().length===0;)s+=1;let l=s<t.length?fy.exec(t[s]):null,a=l?l[1].replace(/\s+/g," ").trim():"",u=l?s+1:s;return{lane:r,identifier:o,timestamp:i,conclusion:a,body:t.slice(u).join(`
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
            ${l.map(a=>{let u=Ki(typeof a.text=="string"?a.text:"");return u?my(a,u,t,o.has(a.id)):gy(a)})}
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
  `}var{I:nA}=fc;var Pp=e=>e.strings===void 0;var hy={},Mp=(e,t=hy)=>e._$AH=t;var kr=qi(class extends wo{constructor(e){if(super(e),e.type!==ir.PROPERTY&&e.type!==ir.ATTRIBUTE&&e.type!==ir.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!Pp(e))throw Error("`live` bindings can only contain a single expression")}render(e){return e}update(e,[t]){if(t===Tn||t===Vt)return t;let n=e.element,r=e.name;if(e.type===ir.PROPERTY){if(t===n[r])return Tn}else if(e.type===ir.BOOLEAN_ATTRIBUTE){if(!!t===n.hasAttribute(r))return Tn}else if(e.type===ir.ATTRIBUTE&&n.getAttribute(r)===t+"")return Tn;return Mp(e),t}});var by=[{id:"spec",label:"spec \uB9AC\uBDF0",receipt:"spec_review",receipt_stage:null,fill_stage:"spec",stale_stage:"spec",hue:"spec"},{id:"plan",label:"\uACC4\uD68D \uB9AC\uBDF0",receipt:null,receipt_stage:"plan",fill_stage:"plan",stale_stage:"plan",hue:"plan"},{id:"impl",label:"\uAD6C\uD604",receipt:null,receipt_stage:null,fill_stage:"impl",stale_stage:null,hue:"impl"},{id:"impl_review",label:"impl \uB9AC\uBDF0",receipt:"impl_review",receipt_stage:null,fill_stage:null,stale_stage:"impl",hue:"impl"},{id:"pr",label:"PR",receipt:null,receipt_stage:null,fill_stage:"pr",stale_stage:null,hue:"pr"}],Nl={quick_fix:["impl","impl_review"],spec_backed:["spec","impl","impl_review","pr"],full_plan:["spec","plan","impl","impl_review","pr"]},qp={missing:"\uC2B9\uC778 \uD544\uC694",stale:"\uC7AC\uC2B9\uC778 \uD544\uC694",unknown:"\uC2B9\uC778 \uD655\uC778 \uBD88\uAC00"},yy={pin:"pin",global:"global",base:"base"};function vy(e){return c`<span
    class=${`detail-layer-rail detail-layer-rail--${yy[e]}`}
    data-source=${e}
    aria-hidden="true"
    ><i></i><i></i><i></i
  ></span>`}function ky(e,t,n){switch(e){case"workflow_mode":return Fo;case"spec_review_model":case"impl_review_model":return Bo;case"plan_review_model":return ti;case"spec_review_effort":case"plan_review_effort":case"impl_review_effort":return ni;case"spec_review_speed":case"plan_review_speed":case"impl_review_speed":return Yn;case"impl_dispatch":return jo;case"impl_runtime":return ei;case"impl_model":return _o(n,t.impl_runtime);case"impl_effort":return Pr(n,t.impl_runtime,t.impl_model);case"impl_speed":case"orchestration_speed":return Yn;case"orchestration_model":return mo(n,null);case"orchestration_effort":return Pr(n,void 0,t.orchestration_model||$n).filter(r=>r!==$n);default:return[]}}function wy(e,t){return c`<div class="detail-effective__row" data-key=${e.key}>
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
      >${oi[e.source]}</span
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
              ${r.filter(u=>a.keys.includes(u.key)).map(u=>{let d=Vs({key:u.key,choices:ky(u.key,s,e.catalog),layer:"pin",pin:e.metadata,global:e.workspace_values,execution_defaults:e.execution_defaults,runner_catalog:e.catalog,route:typeof e.metadata?.route=="string"?e.metadata.route:null,controller_runtime:e.controller_runtime||null});return wy(u,{expanded:e.expanded,options:d.options,default_label:d.unset_label,default_full_value:d.full_value,onEdit:t.onEdit})})}
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
  </details>`}function $y(e){let t=[];if(e.workflow_mode&&t.push(e.workflow_mode.display),e.impl_dispatch?.value==="main")t.push("\uBA54\uC778");else if(e.impl_dispatch?.value==="delegated"){let n=e.impl_runtime?` ${e.impl_runtime.display}`:"";t.push(`\uC704\uC784${n}`)}for(let n of["impl_model","impl_effort","impl_speed"])e[n]?.resolution!=="not_applicable"&&t.push(e[n]?.display||"\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00");return t.join(" \xB7 ")}function xy(e){if(!e||typeof e!="object")return null;let{kind:t,actor:n,effort:r,sha:o}=e;return typeof t!="string"||typeof n!="string"||typeof o!="string"?null:{kind:t,actor:n,effort:typeof r=="string"?r:null,sha:o}}function jp(e,t={}){let n=e&&typeof e.metadata=="object"&&e.metadata?e.metadata:{},r=e&&typeof e.workflow=="object"&&e.workflow?e.workflow:{},o=r.stages||{},i=r.route||n.route||null,s=typeof n.pr_url=="string"?n.pr_url:"",l=typeof n.exec_receipt=="string"?n.exec_receipt:"",a=xy(r.exec_receipt),u=a?er(a):l,d=a?`${a.kind}:${a.actor}`:l.split("@")[0],p=Ks(r.planned_execution,r.exec_receipt),_=r.chips?.pr?.number,m=typeof _=="number"?`PR #${_}`:"PR",v=Wo(n),O=v!==null&&t.isChipOpen?.("rec")===!0,R=O?Xa({rec:v},"rec"):null;return c`<section class="detail-summary" data-seam="detail-summary">
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
      ${v?c`<button
            type="button"
            class="detail-summary__chip detail-summary__chip--rec judgement-chip"
            data-chip-key="rec"
            data-state=${v.state}
            aria-expanded=${O?"true":"false"}
            title=${ai(v)}
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
      ${Ay(i).map(Q=>Sy(Q,n,o,{label:Q.id==="pr"?m:Q.label,href:Q.id==="pr"?s:""}))}
    </div>
  </section>`}function Ay(e){let n=typeof e=="string"&&Object.hasOwn(Nl,e)&&Nl[e]||Nl.spec_backed;return by.filter(r=>n.includes(r.id))}var Gi={on:"\uD1B5\uACFC",stale:"\uC7AC\uAC80\uD1A0 \uD544\uC694",current:"\uC9C4\uD589 \uC911",none:"\uBBF8\uB3C4\uB2EC"};function Sy(e,t,n,r){let o=Ey(e,t,n),i=e.fill_stage?n[e.fill_stage]:null,s=typeof i?.fill=="string"?i.fill:null,l=s?s==="full":o.length>0,a=!l&&s==="dim",u=e.stale_stage?n[e.stale_stage]?.stale===!0:!1,d=o&&o.split("@")[1]?.slice(0,7)||"",p=u?Gi.stale:l?Gi.on:a?Gi.current:Gi.none,_=Ty(e,n),m=`${r.label} \xB7 ${p}${_?` \xB7 ${_}`:""}${o?` \xB7 ${o}`:""}`,v=`detail-summary__gate${l?" detail-summary__gate--on":""}${a?" detail-summary__gate--current":""}${u?" detail-summary__gate--stale":""}${d?" detail-summary__gate--receipt":""}`,O=c`<span class="detail-summary__gate-label"
      >${r.label}</span
    >
    <span class="detail-summary__gate-rail"></span>
    <span class="detail-summary__gate-sha">${d}</span>`;return r.href?c`<a
      class=${v}
      data-gate=${e.id}
      data-hue=${e.hue}
      href=${r.href}
      target="_blank"
      rel="noreferrer"
      title=${m}
      >${O}</a
    >`:c`<span
    class=${v}
    data-gate=${e.id}
    data-hue=${e.hue}
    title=${m}
    >${O}</span
  >`}function Ey(e,t,n){if(e.receipt&&typeof t[e.receipt]=="string")return String(t[e.receipt]);if(e.receipt_stage){let r=n[e.receipt_stage]?.receipt;return typeof r=="string"?r:""}return""}function Ty(e,t){if(e.id!=="plan")return"";let n=t.plan?.approval_state;return typeof n=="string"&&Object.hasOwn(qp,n)?qp[n]:""}function Yi(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function Fp(e){return Yi(e)&&typeof e.key=="string"&&e.key.length>0&&typeof e.email=="string"&&e.email.length>0}function Bp(e,t){let n=e&&e[t];if(!Yi(n)||!Array.isArray(n.accounts))return null;let r=n.accounts.filter(Fp),o=Fp(n.active)?n.active:null;return{accounts:r,active:o||r.find(i=>i.active===!0)||null}}function zp(e){return typeof e.alias=="string"&&e.alias.length>0?` (${e.alias})`:""}function Vi(e){let t=typeof e.status=="string"&&e.status!=="ok"?` \xB7 ${e.status}`:"";return`${e.email}${zp(e)}${t}`}function Ao(e){let t=typeof e.plan=="string"&&e.plan.length>0?e.plan:"plan \uD655\uC778 \uBD88\uAC00";return`${e.email} \xB7 ${t}${zp(e)}`}function Cy(e,t,n){if(n!==null){let o=e==="claude"?Vi:Ao,i=t?t.accounts.find(s=>s.key===n):void 0;return`\uB808\uD3EC \uAE30\uBCF8\uAC12 \uC0AC\uC6A9(${i?o(i):n})`}return t?t.active?`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(${e==="claude"?t.active.email:Ao({...t.active,alias:null})})`:"\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(\uD655\uC778 \uBD88\uAC00)":"(\uAE30\uBCF8)"}function Up(e,t){if(!Yi(e)||e.state!=="usable"||!Yi(e.values))return null;let n=e.values[t];return typeof n=="string"&&n.length>0?n:null}function Wp(e){let t=e.provider_key==="claude"?Vi:Ao,n=!!e.provider?.accounts.some(r=>r.key===e.selected);return c`<div class="detail-kv" data-exec-account-row=${e.key}>
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
  </section>`}function Oy(e){return String(e||"").replace(/^docs\/(superpowers\/)?/,"")}function Ry(e){let t=/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(e);if(!t)return{front:null,body:e};let n=t[1].trim();return{front:n.length>0?n:null,body:e.slice(t[0].length)}}function Qi(e,t){let n=t.getWorkspacePath,r=t.fetchImpl||globalThis.fetch?.bind(globalThis),o=null,i="loading",s="",l=null,a="";function u(O){O.key==="Escape"&&o&&(O.preventDefault(),m())}document.addEventListener("keydown",u);function d(){return o?c`
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
    `:c``}function p(){mt(d(),e)}async function _(O,R={}){o=O,i="loading",s="",l=null,a="",p();let Q=R.workspace||(n?n():"");if(!Q){i="error",a="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4",p();return}if(!r){i="error",a="fetch\uB97C \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",p();return}let ee="/api/doc?workspace="+encodeURIComponent(Q)+"&path="+encodeURIComponent(O);try{let K=await r(ee),L=await K.json().catch(()=>({}));if(!K.ok||!L||L.ok!==!0){if(L?.error==="not_found"&&R.missing_state==="plan_pending"){i="pending",a="\uACC4\uD68D \uC791\uC131 \uC804 \xB7 \uACBD\uB85C\uB9CC \uC608\uC57D\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4",p();return}i="error",a="\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 ("+String(L&&L.error||K.status)+")",p();return}let I=Ry(String(L.content||""));l=I.front,s=I.body,i="ready",p()}catch{i="error",a="\uBB38\uC11C \uC694\uCCAD \uC2E4\uD328",p()}}function m(){o=null,mt(c``,e)}function v(){document.removeEventListener("keydown",u),m()}return{open:_,close:m,destroy:v}}var Iy=[{key:"input_tokens",label:"\uC785\uB825"},{key:"output_tokens",label:"\uCD9C\uB825"},{key:"cache_read_input_tokens",label:"\uCE90\uC2DC \uC77D\uAE30"}],Yp="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4",Xi=[{role:"implementation",provider:"codex"},{role:"review-consult",provider:"codex"},{role:"subagent",provider:"claude"}],Ly=new Set(["codex-runner","Explore","Plan","advisor","advisor-xhigh","claude-code-guide","statusline-setup"]);function Kp(e){return typeof e=="string"&&Ly.has(e)}var Dy=["running","done","failed","interrupted"],Py={running:"\u25CF",done:"\u2713",failed:"\u2717",interrupted:"\u26A0"};function My(e){return typeof e=="number"&&Number.isFinite(e)?e:0}function qy(e){let t=un(e);if(t.length>0)return t.map(o=>c`<span class="detail-usage-total" title=${o.tooltip}
          >${o.label}</span
        >`);let n=lo(e);if(!n||!e)return"";let r=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?` \xB7 $${e.total_cost_usd.toFixed(2)}`:"";return c`<span
      class="detail-usage-total"
      title="이 이슈의 모든 attempt 토큰 합계 (입력+출력+캐시)"
      >${n.replace(/^τ /,"\u03C4 \uCD1D ")}${r}</span
    >${e.replayed?c`<span class="detail-usage-partial" title=${Yp}
          >부분 집계</span
        >`:""}`}function Gp(e){return!e||!e.roles.orchestrator?null:{providers:e.roles.orchestrator,roles:{}}}function Bl(e){if(typeof e=="number")return ks(e);if(typeof e!="string")return"";let t=Date.parse(e);return Number.isFinite(t)?ks(t):""}function Ny(e){return typeof e=="string"?e.replace(/-\d{8}$/,""):""}function Vp(e,t,n){if(e.provider!=="claude"){let o=e.session_id?` \xB7 thread ${e.session_id}`:"",i=n?" \xB7 \uC774\uC804 \uB77C\uC6B4\uB4DC \uC2A4\uB808\uB4DC \uC774\uC5B4\uAC10":"";return{text:`${n?"\u21A9 ":""}${e.launch_id}`,title:`${e.launch_id}${o}${i}`}}let r=t&&typeof t.agent_id=="string"?t.agent_id:"";return r.length>0?{text:r.slice(0,8),title:r}:{text:e.launch_id.slice(-8),title:e.launch_id}}function jl(e){return e===null||typeof e=="string"&&e.trim().length>0}function Fl(e){return e===null||typeof e=="number"&&Number.isFinite(e)}function jy(e){if(!e||typeof e!="object"||Array.isArray(e))return null;let t=e,n=t.provider==="claude";return typeof t.launch_id!="string"||t.launch_id.length===0||!Xi.some(r=>r.role===t.role&&r.provider===t.provider)||!(n?jl(t.model):typeof t.model=="string"&&t.model.length>0)||!(!("effort"in t)||jl(t.effort))||!(!("agent_type"in t)||jl(t.agent_type))||typeof t.session_id!="string"||t.session_id.length===0||!Dy.includes(t.status)||!(t.turn_id===null||typeof t.turn_id=="string")?null:n?!Fl(t.started_at)||!Fl(t.last_event_at)||!Fl(t.completed_at)?null:t:typeof t.started_at!="number"||!Number.isFinite(t.started_at)||typeof t.last_event_at!="number"||!Number.isFinite(t.last_event_at)||!(t.completed_at===null||typeof t.completed_at=="string"&&Number.isFinite(Date.parse(t.completed_at)))?null:t}function Fy(e,t,n,r){let i=un({providers:{[t]:{subtotal:n.subtotal,breakdown:n.usage,...n.replayed?{replayed:!0}:{}}},roles:{}})[0],s=Vp({provider:t,launch_id:n.receipt_id,session_id:typeof n.session_id=="string"?n.session_id:void 0},n,r);return c`<div class="detail-session__leg detail-session__usage-detail">
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
  </div>`}function By(e,t,n,r,o){let i=e.status==="running"?null:t,l=(i?un({providers:{[e.provider]:{subtotal:i.subtotal,breakdown:i.usage,...i.replayed?{replayed:!0}:{}}},roles:{}}):[])[0],a=e.status==="running"?ks(e.last_event_at):i?Bl(i.completed_at):"",u=(e.provider==="claude"?["Claude",e.agent_type,Ny(e.model),e.effort]:["codex",e.model,e.effort]).filter(Boolean).join(" \xB7 "),d=Vp(e,i,o);return c`<button
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
  </button>`}function Uy(e,t){return e.role===t.role&&(e.model===null||t.model===void 0||e.model===t.model)&&e.session_id===t.session_id}function Wy(e,t,n){let r=[],o=new Set,i=Array.isArray(e.delegation_sessions)?e.delegation_sessions:[];for(let p of i){let _=jy(p);!_||o.has(_.launch_id)||Kp(_.agent_type)||(o.add(_.launch_id),r.push(_))}r.sort((p,_)=>(p.started_at||0)-(_.started_at||0));let s={};for(let{role:p,provider:_}of Xi){let m=t?t.roles[p]?.[_]:null;s[p]=m?[...m.legs]:[]}let l=Xi.flatMap(({role:p})=>s[p]),a=new Set,u=new Set,d=[];for(let{role:p,provider:_}of Xi){for(let m of r.filter(v=>v.role===p&&v.provider===_)){let v=l.find(R=>R.receipt_id===m.launch_id)||null;if(v&&!Uy(m,v))continue;v&&a.add(v.receipt_id);let O=_==="codex"&&u.has(m.session_id);d.push(By(m,v,e.attempt_id,n,O)),_==="codex"&&u.add(m.session_id)}for(let m of s[p])if(!a.has(m.receipt_id)&&!Kp(m.agent_type)){let v=typeof m.session_id=="string"&&m.session_id.length>0?m.session_id:null,O=_==="codex"&&v!==null&&u.has(v);d.push(Fy(p,_,m,O)),_==="codex"&&v!==null&&u.add(v)}}return d}function zy(e,t){let n=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?e.total_cost_usd:null,r=[...Iy,{key:"cache_creation_input_tokens",label:t==="codex"?"\uCE90\uC2DC \uC4F0\uAE30":"\uCE90\uC2DC \uC0DD\uC131"},...t==="codex"&&typeof e.reasoning_output_tokens=="number"&&Number.isFinite(e.reasoning_output_tokens)?[{key:"reasoning_output_tokens",label:"\uCD94\uB860 \uCD9C\uB825"}]:[]];return c`<div class="detail-session__usage-detail">
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
  </div>`}var Hy={running:"\u25CF",done:"\u2713",failed:"\u2717",orphaned:"\u26A0"};function ks(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),n=String(t.getHours()).padStart(2,"0"),r=String(t.getMinutes()).padStart(2,"0");return`${n}:${r}`}function Ky(e){if(typeof e.exec_default_preset_id!="string"||e.exec_default_preset_id.length===0)return"";let t=e.exec_values&&typeof e.exec_values=="object"?Object.entries(e.exec_values).filter(([,r])=>typeof r=="string"&&r.length>0).map(([r,o])=>`${r}=${o}`).join(" \xB7 "):"",n=typeof e.exec_default_preset_revision=="number"?` r${e.exec_default_preset_revision}`:"";return c`<div
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
      data-session-key=${Ra(e)}
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
      <span class="detail-session__time">${ks(e.last_event_at)}</span>
    </button>
    ${e.resume_command?c`<button
          type="button"
          class="op-btn detail-session__resume-cmd"
          title=${e.resume_command}
          @click=${o=>{o.stopPropagation(),t.onCopyResumeCommand&&e.resume_command&&t.onCopyResumeCommand(e.resume_command)}}
        >
          ⧉ 재개
        </button>`:""}
  </div>`}function Qp(e,t={},n={},r=[]){let o=Array.isArray(e)?e:[],i=Array.isArray(r)?r:[],s=[...i.filter(m=>m&&m.current===!0),...i.filter(m=>m&&m.current!==!0).sort((m,v)=>v.index-m.index)],l=s.map(m=>Yy(m,t)),a=n.expanded||new Set;if(o.length===0&&s.length===0)return c`
      <div class="detail-section-label">세션 이력</div>
      <div class="detail-empty" data-seam="session-history">세션 이력 없음</div>
    `;let u=new Set;for(let m of o)m&&typeof m.resumed_from=="string"&&m.resumed_from.length>0&&u.add(m.resumed_from);let d=m=>{if(!(m.status==="failed"||m.status==="orphaned"))return"";let O=typeof m.session_id=="string"&&m.session_id.length>0,R=u.has(m.attempt_id),Q=O&&!R,ee=O?R?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":"\uC774 \uC138\uC158\uC744 \uAC19\uC740 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C \uC774\uC5B4\uC11C \uC9C4\uD589":"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00";return c`<button
      type="button"
      class="op-btn detail-session__resume"
      data-attempt-id=${m.attempt_id}
      ?disabled=${!Q}
      title=${ee}
      @click=${K=>{K.stopPropagation(),Q&&t.onResume&&t.onResume(m.attempt_id)}}
    >
      ↻ 이어하기
    </button>`},p=m=>{if(!(m.status==="failed"||m.status==="orphaned")||typeof m.cause!="string"||m.cause==="")return"";let O=m.cause_detail,R=O&&typeof O.reason=="string"&&O.reason.length>0?typeof O.command=="string"&&O.command.length>0?`${O.reason} \xB7 ${O.command}`:O.reason:m.cause;return c`<div class="detail-session__cause" title=${R}>
      ${m.cause}
    </div>`},_=m=>{let v=Gp(Pa(m));if(un(v).length===0&&!lo(m.usage))return"";let O=a.has(m.attempt_id);return c`<button
      type="button"
      class="detail-session__usage-toggle"
      data-attempt-id=${m.attempt_id}
      aria-expanded=${O?"true":"false"}
      title=${O?"\uD1A0\uD070 \uB0B4\uC5ED \uC811\uAE30":"\uD1A0\uD070 \uB0B4\uC5ED \uD3BC\uCE58\uAE30"}
      @click=${R=>{R.stopPropagation(),t.onToggleUsage&&t.onToggleUsage(m.attempt_id)}}
    >
      τ 자세히
    </button>`};return c`
    <div class="detail-section-label">
      세션 이력${qy(n.total)}
    </div>
    <div class="detail-sessions" data-seam="session-history">
      ${l}${o.map(m=>{let v=Pa(m),O=Gp(v),R=un(O);return c`<div class="detail-session-row">
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
            ${R.length>0?R.map(Q=>c`<span
                      class="detail-session__usage"
                      title=${Q.tooltip}
                      >${Q.label}</span
                    >`):lo(m.usage)?c`<span class="detail-session__usage"
                    >${lo(m.usage)}</span
                  >`:""}
            <span class="detail-session__time">${ks(m.started_at)}</span>
          </button>
          ${_(m)} ${d(m)} ${p(m)} ${Ky(m)}
          ${a.has(m.attempt_id)&&m.usage?zy(m.usage,m.runner==="codex"?"codex":"claude"):""}
          ${Wy(m,v,t)}
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
      ${typeof n.default_task_prompt=="string"?lr("\uC608\uC0C1 \uAE30\uBCF8 \uACFC\uC5C5",n.default_task_prompt):""}`;let r=Hi(n.recorded_at);return c`<div class="detail-prompt__meta">
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
  `}var Qy=["open","in_progress","deferred","resolved","closed"],Xy=[0,1,2,3,4];function ef(e,t){let n=t.issueStores,r=t.onClose,o=t.transport,i=t.onNavigate,s=t.queueStore,l=t.execPresetStore,a=t.sessionLogStore,u=null,d=null,p={},_="",m=!1,v=[],O=!1,R=!1,Q={},ee={claude:null,codex:null},K=null,L=null,I=0,P=!1,F=!1,G="",q="",N="",H="",W=!1;function ne(){P=!1,F=!1,G="",q="",N="",H="",W=!1}function he(){ee={claude:null,codex:null},K=null,L=null,I+=1}async function qe(){if(!o)return null;try{let w=await Promise.resolve(o("get-workspace-accounts",{}));return w&&typeof w.state=="string"?w:null}catch{return null}}async function B(w){try{let D=await fetch(w);if(!D.ok)return null;let z=await D.json();if(!z||typeof z!="object"||!Array.isArray(z.accounts))return null;let $e=z.accounts.filter(We=>We!==null&&typeof We=="object"&&!Array.isArray(We));return{accounts:$e,active:$e.find(We=>We.active===!0)||null}}catch{return null}}async function te(w){L=w;let D=++I,[z,$e,We]=await Promise.all([B("/api/claude-usage"),B("/api/codex-usage"),qe()]);D!==I||w!==u||(ee={claude:z,codex:$e},K=We,ot())}let me=[],Te=null,C=null,se=!1,ve="",ye=!1,De=0,ge=new Set;function Re(){me=[],Te=null,C=null,se=!1,ve="",ye=!1,De+=1,ge.clear()}async function Ze(w){if(!o)return;let D=++De;try{let z=await Promise.resolve(o("get-comments",{id:w}));if(D!==De||w!==u)return;me=Array.isArray(z)?z:[],se=!1}catch{if(D!==De||w!==u)return;se=!0}ot()}function ft(){if(!o||!u)return;let w=d&&typeof d.comment_count=="number"?d.comment_count:null;if(Te!==u){Te=u,C=w,Ze(u);return}w!==null&&w!==C&&(C=w,Ze(u))}function X(w){ge.has(w)?ge.delete(w):ge.add(w),ot()}function J(w){let D=ve.trim().length===0;ve=w,D!==(w.trim().length===0)&&ot()}async function re(){let w=ve.trim();if(!o||!u||w.length===0||ye)return;let D=u;ye=!0,ot();let z=!1;try{let $e=await Promise.resolve(o("add-comment",{id:D,text:w}));Array.isArray($e)&&$e.length>0&&(z=!0,D===u&&(me=$e,se=!1,ve="",C=$e.length))}catch{z=!1}z||_e("\uB313\uAE00 \uCD94\uAC00 \uC2E4\uD328","error"),D===u&&(ye=!1),ot()}let ae={onToggle:X,onDraftInput:J,onSubmit:re},Ee=t.mdViewer||null,fe=null;Ee||(fe=document.createElement("div"),fe.className="md-viewer-root",document.body.appendChild(fe));let Pe=Ee||Qi(fe,{getWorkspacePath:t.getWorkspacePath||(()=>"")}),Ue=document.createElement("div");Ue.className="session-log-root",document.body.appendChild(Ue);let Qe=xo(Ue,{transport:o?(w,D)=>Promise.resolve(o(w,D)):void 0,sessionLogStore:a}),ze=!1,Y=!1,V=!1,xe=null,bt=null,_t=0;function Ke(w){return`${t.getWorkspacePath&&t.getWorkspacePath()||""}::${w}`}function nt(){ze=!1,Y=!1,V=!1,xe=null,bt=null,_t+=1}async function x(w){if(!o)return;let D=++_t;Y=!0,V=!1,ot();try{let z=await Promise.resolve(o("get-bead-prompt",{bead_id:w}));if(D!==_t)return;!z||typeof z!="object"||Array.isArray(z)?V=!0:(xe=z,bt=Ke(w))}catch{D===_t&&(V=!0)}finally{D===_t&&(Y=!1,ot())}}let Z=[],Oe=null,Ye=0;function at(w,D){return`${t.getWorkspacePath&&t.getWorkspacePath()||""}::${w}::${D}`}function Fe(){Z=[],Oe=null,Ye+=1}async function Je(w,D){if(!o)return;let z=++Ye,$e;try{$e=await Promise.resolve(o("get-session-refs",{bead_id:w}))}catch{$e=null}z!==Ye||D!==Oe||(Z=$e&&Array.isArray($e.sessions)?$e.sessions:[],ot())}function qt(){if(!o||!u)return;let w=d&&d.metadata,D=w&&typeof w=="object"&&typeof w.session_ref=="string"?w.session_ref:null;if(D===null){Fe();return}let z=at(u,D);Oe!==z&&(Z=[],Oe=z,Je(u,z))}let lt=[],At=[],Bt=Wr,Pt=null,Nt=0;function ue(w){return`${t.getWorkspacePath&&t.getWorkspacePath()||""}::${w}`}function ke(){lt=[],At=[],Bt=Wr,Pt=null,Nt+=1}async function Ge(w,D){if(!o)return;let z=++Nt,$e;try{$e=await Promise.resolve(o("get-bead-timeline",{bead_id:w}))}catch{$e=null}z!==Nt||D!==Pt||(lt=$e&&Array.isArray($e.events)?$e.events:[],At=$e&&Array.isArray($e.attempts)?$e.attempts:[],Bt=Wr,ot())}function rt(){if(!o||!u)return;let w=ue(u);Pt!==w&&(lt=[],At=[],Bt=Wr,Pt=w,Ge(u,w))}function et(){Bt+=Wr,ot()}function ht(){if(ze=!ze,ze&&u&&bt!==Ke(u)){xe=null,x(u);return}ot()}function je(){let w={};for(let z of At)z&&typeof z=="object"&&z.bead_id===u&&(w[String(z.attempt_id)]=z);let D=s?s.get():null;for(let z of D&&D.attempts?Object.values(D.attempts):[]){let $e=z;$e&&$e.bead_id===u&&(w[String($e.attempt_id)]=$e)}return w}function tt(){return u?Object.values(je()).sort((D,z)=>(z.started_at||0)-(D.started_at||0)).map(D=>({attempt_id:D.attempt_id,bead_id:D.bead_id,status:D.status,started_at:typeof D.started_at=="number"?D.started_at:null,runner:D.runner||null,model:D.model||null,effort:D.effort||D.observed_effort||null,speed:D.speed||null,session_id:D.session_id||null,resumed_from:D.resumed_from||null,continuation_mode:D.continuation_mode||null,dismissed_at:typeof D.dismissed_at=="number"?D.dismissed_at:null,cause:typeof D.cause=="string"?D.cause:null,cause_detail:D.cause_detail||null,exec_default_preset_id:typeof D.exec_default_preset_id=="string"?D.exec_default_preset_id:null,exec_default_preset_revision:typeof D.exec_default_preset_revision=="number"?D.exec_default_preset_revision:null,exec_values:D.exec_values&&typeof D.exec_values=="object"?D.exec_values:null,usage:D.usage||null,usage_legs:Array.isArray(D.usage_legs)?D.usage_legs:[],delegation_sessions:Array.isArray(D.delegation_sessions)?D.delegation_sessions:[]})):[]}function Ne(){return u?nr(je(),u):null}let S=new Set;function j(w){S.has(w)?S.delete(w):S.add(w),ot()}function ce(w){let D=s?s.get():null,z=D&&D.attempts?D.attempts[w]:null;Qe.open({attempt_id:w,meta:z?{runner:z.runner||void 0,model:z.model||void 0,effort:z.effort||void 0,status:z.status||void 0,session_id:z.session_id||void 0}:{}})}function Ae(w,D){let z=s?s.get():null,$e=z&&z.attempts?z.attempts[w]:null,ut=($e&&Array.isArray($e.delegation_sessions)?$e.delegation_sessions:[]).find(zt=>zt&&typeof zt=="object"&&zt.launch_id===D);ut&&Qe.open({attempt_id:w,launch_id:D,meta:{runner:ut.provider==="claude"?"claude":"codex",role:ut.role,...typeof ut.agent_type=="string"?{agent_type:ut.agent_type}:{},model:ut.model,effort:ut.effort,session_id:ut.session_id,status:ut.status}})}async function be(w){if(!o||!w)return;let D=o,z=()=>{let We=s?s.get():null;return We&&typeof We.revision=="number"?We.revision:0},$e=s?.get()?.attempts?.[w]||null;await so({context:{bead_id:$e?.bead_id||u||"",kind:"session",tuple:$e?Sn($e):""},transport:We=>D("worker-attempt-resume",{attempt_id:w,expected_revision:z(),...We}),adopt:We=>{We?.queue&&s?.set&&s.set(We.queue)}})}async function yt(w,D){if(!o||!w)return;let z=o,$e=()=>{let Xe=s?s.get():null;return{bead_id:w,...D==="parallel"?{}:{lane:D},expected_revision:Xe&&typeof Xe.revision=="number"?Xe.revision:0}},We=Xe=>{Xe?.queue&&s?.set&&s.set(Xe.queue)},ut=await Promise.resolve(z("worker-queue-place",$e()));if(We(ut),ut&&ut.conflict&&(ut=await Promise.resolve(z("worker-queue-place",$e())),We(ut)),ot(),!ut)return;if(ut.applied===!1&&typeof ut.admission_reason=="string"){_e(`\uB300\uAE30 \uC801\uC7AC \uAC70\uBD80: ${ut.admission_reason}`,"error",2400);return}if(ut.reason==="rejected"){_e("\uB300\uAE30 \uC801\uC7AC \uAC70\uBD80: rejected","error",2400);return}if(ut.applied===!1)return;let zt=ut.queue?Go({id:w},ut.queue).location:null;zt&&"index"in zt&&_e(`${ed(zt.lane)} \uB300\uAE30 #${zt.index+1}\uC5D0 \uCD94\uAC00`,"success",2400)}function wt(w,D){if(D){R=!0,ot();return}yt(w,"parallel")}function $t(w,D){let We=(w.target?.closest?.(".worker-card__place-lane")||null)?.dataset.lane;We&&(We!=="parallel"&&!/^s[1-5]$/.test(We)||(R=!1,ot(),yt(D,We)))}function xt(w){!w||!u||Qe.open(io(w,u,d&&d.status))}let Gt={onOpen:ce,onOpenDelegation:Ae,onResume:be,onToggleUsage:j,onOpenSessionRef:xt,onCopyResumeCommand:U};function Ht(){let w=s?s.get():null,D={...Q};for(let z of[...Pn,...po]){let $e=w&&w[z];typeof $e=="string"&&(D[z]=$e)}return D}async function Ut(){if(o){try{let w=await Promise.resolve(o("get-session-defaults",{}));Q=w&&w.values&&typeof w.values=="object"?w.values:{}}catch{Q={}}ot()}}function Et(){let w=s?s.get():null;return w&&w.runner_catalog||null}function rn(){let w=s?s.get():null;return w&&typeof w.execution_defaults=="object"?w.execution_defaults:null}function tn(){let w=d?.metadata&&typeof d.metadata=="object"?d.metadata:{},z=En({pin:{...w,...p},global:Ht(),execution_defaults:rn(),runner_catalog:Et(),route:typeof w.route=="string"?w.route:null}).orchestration_model.value||"";return Mn(Et(),z)}function Wt(){let w=l?l.get():null;return!w||typeof w.revision!="number"?null:{revision:w.revision,presets:Array.isArray(w.presets)?w.presets:[]}}function Ot(w){return w?.compatible===!1}function Qt(w){l&&w&&typeof w.revision=="number"&&Array.isArray(w.presets)&&l.set({revision:w.revision,presets:w.presets})}async function we(){let w=Wt(),D=w?.presets.find(z=>z.id===_);if(!(!o||!u||!w||!D||Ot(D)||m)){m=!0,v=[],ot();try{let z=await Promise.resolve(o("apply-impl-preset",qu(u,D.id,w.revision)));if(z&&z.conflict){Qt(z),_e("\uD504\uB9AC\uC14B\uC774 \uBCC0\uACBD\uB410\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uBAA9\uB85D\uC5D0\uC11C \uB2E4\uC2DC \uC801\uC6A9\uD558\uC138\uC694.","error",4e3);return}let $e=z&&Array.isArray(z.issue)?z.issue[0]:z?.issue;if(z&&z.applied&&$e&&typeof $e=="object"){d=$e,v=Array.isArray(z.skipped_orchestration_keys)?z.skipped_orchestration_keys.filter(We=>typeof We=="string"):[];for(let We of Nu)delete p[We];_e(v.length>0?"\uC2E4\uD589 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4. \uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 3\uD0A4\uB294 Bead\uC5D0 \uD540\uD560 \uC218 \uC5C6\uC5B4 \uAC74\uB108\uB6F0\uC5C8\uC2B5\uB2C8\uB2E4.":"\uC2E4\uD589 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4.","success",4e3);return}z&&z.error==="bd_readback_failed"?_e("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):_e("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}catch(z){z&&typeof z=="object"&&z.code==="bd_readback_failed"?_e("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):_e("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}finally{m=!1,ot()}}}let T=null;n&&n.subscribe&&(T=n.subscribe(()=>k()));let pe=null;s&&typeof s.subscribe=="function"&&(pe=s.subscribe(()=>{u&&ot()}));let Le=null,y=null;function b(){y&&(y(),y=null)}l&&typeof l.subscribe=="function"&&(Le=l.subscribe(()=>{u&&ot()}));function M(w){w.key==="Escape"&&u&&(w.preventDefault(),r())}document.addEventListener("keydown",M);let f=co(()=>ot());f.attach();function k(){if(u){if(n&&typeof n.snapshotFor=="function"){let w=n.snapshotFor("detail:"+u)||[];d=w.find(z=>z&&z.id===u)||w[0]||d}ft(),qt(),rt(),ot()}}function U(w){gn(w).then(D=>{D?_e("\uBCF5\uC0AC\uB428","success",1200):_e("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function ie(w){w.preventDefault(),w.stopPropagation(),u&&U(u)}function le(w,D){w.preventDefault(),w.stopPropagation(),U(D)}function Be(w,D,z){w.preventDefault(),w.stopPropagation(),Pe.open(D,{missing_state:z})}async function gt(w,D){let z=Object.hasOwn(p,w),$e=p[w];if(p[w]=D,ot(),!(!o||!u))try{let We=await Promise.resolve(o("update-exec-settings",Mu(u,w,D.length===0?null:D))),ut=Array.isArray(We)?We[0]:We;if(!ut||typeof ut!="object"||!ut.id)throw new Error("exec settings readback failed");d=ut,delete p[w],ot()}catch(We){throw z?p[w]=$e:delete p[w],ot(),_e("\uC2E4\uD589 \uC124\uC815 \uBCC0\uACBD \uC2E4\uD328","error"),We}}function vt(w){w.catch(()=>{})}async function ct(w,D){let z=d||{},$e=z.metadata&&typeof z.metadata=="object"?z.metadata:{},We={};for(let Xe of["impl_runtime","impl_model","impl_effort"])We[Xe]=Object.hasOwn(p,Xe)?p[Xe]:typeof $e[Xe]=="string"?$e[Xe]:"";We[w]=D;let ut=Bu(We,Et(),tn()),zt={};for(let Xe of["impl_runtime","impl_model","impl_effort"])zt[Xe]=p[Xe],p[Xe]=ut[Xe]||"";if(ot(),!(!o||!u))return Promise.resolve(o("update-impl-target",{id:u,...ut,orchestration_runtime:tn()})).then(Xe=>{let Rt=Array.isArray(Xe)?Xe[0]:Xe;if(!Rt||typeof Rt!="object"||!Rt.id)throw new Error("implementation target readback failed");d=Rt;for(let An of["impl_runtime","impl_model","impl_effort"])delete p[An];ot()}).catch(Xe=>{for(let Rt of["impl_runtime","impl_model","impl_effort"])zt[Rt]===void 0?delete p[Rt]:p[Rt]=zt[Rt];throw ot(),_e("\uAD6C\uD604 target \uBCC0\uACBD \uC2E4\uD328","error"),Xe})}async function A(w,D,z){if(!o||!u)return!1;try{let $e=await Promise.resolve(o(w,D)),We=Array.isArray($e)?$e[0]:$e;return We&&typeof We=="object"&&We.id?(d=We,!0):(_e(z,"error"),!1)}catch($e){return $e&&typeof $e=="object"&&$e.code==="bd_readback_failed"?(_e("\uC800\uC7A5\uB410\uC73C\uB098 \uD655\uC778 \uC2E4\uD328 \u2014 \uACE7 \uAC31\uC2E0\uB429\uB2C8\uB2E4","error"),{ok:!1,saved:!0}):(_e(z,"error"),!1)}}function $(w){setTimeout(()=>{try{let D=e.querySelector(w);D&&typeof D.focus=="function"&&D.focus()}catch{}},0)}function Ie(){P=!0,G=d&&d.title||"",ot(),$('.detail-edit__input[data-edit="title"]')}function Me(w){G=w.target.value}function st(){P=!1,G="",ot()}function St(){A("edit-text",{id:u,field:"title",value:G},"\uC81C\uBAA9 \uC800\uC7A5 \uC2E4\uD328").then(D=>{D===!0&&(P=!1,G=""),ot()})}function jt(){F=!0,q=d&&d.description||"",ot(),$('.detail-edit__textarea[data-edit="description"]')}function en(w){q=w.target.value}function Sr(){F=!1,q="",ot()}function kn(){A("edit-text",{id:u,field:"description",value:q},"\uC124\uBA85 \uC800\uC7A5 \uC2E4\uD328").then(D=>{D===!0&&(F=!1,q=""),ot()})}function Er(w,D,z,$e){if(w.key==="Escape"){w.stopPropagation(),z();return}w.key==="Enter"&&(!$e||w.ctrlKey||w.metaKey)&&(w.preventDefault(),D())}function Kr(w){let D=w.target.value;A("update-status",{id:u,status:D},"\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328").then(()=>ot())}function ca(w){let D=Number(w.target.value);A("update-priority",{id:u,priority:D},"\uC6B0\uC120\uC21C\uC704 \uBCC0\uACBD \uC2E4\uD328").then(()=>ot())}function ua(w){N=w.target.value}function Ss(){let w=N.trim();w.length!==0&&A("label-add",{id:u,label:w},"\uB77C\uBCA8 \uCD94\uAC00 \uC2E4\uD328").then(D=>{D===!0&&(N=""),ot()})}function Es(w){if(w.key==="Escape"){w.stopPropagation(),N="",ot();return}w.key==="Enter"&&(w.preventDefault(),Ss())}function da(w){A("label-remove",{id:u,label:w},"\uB77C\uBCA8 \uC81C\uAC70 \uC2E4\uD328").then(()=>ot())}let pa={onCopyPath:le,onOpenDoc:Be};function Gr(w){return typeof w=="string"?w:w&&typeof w=="object"?String(w.id||w.to||w.issue_id||w.depends_on||""):""}function Yr(w){return w&&typeof w=="object"?String(w.dependency_type||w.type||""):""}function h(w){switch(w){case"discovered-from":return{glyph:"\u21A9 ",relation:"\uBC1C\uACAC"};case"parent-child":return{glyph:"\u2338 ",relation:"\uC0C1\uC704"};case"related":return{glyph:"\u2194 ",relation:"\uAD00\uB828"};default:return w.length>0?{glyph:`${w} `,relation:w}:{glyph:"",relation:""}}}function g(w,D){let z=E(D),$e=[];return w.length>0&&$e.push(w),z&&$e.push(z),$e.length>0?$e.join(`
`):void 0}function E(w){if(!w||typeof w!="object")return;let D=typeof w.status=="string"?w.status:"",z=typeof w.title=="string"?w.title:"";return D.length>0&&z.length>0?`${D} \xB7 ${z}`:void 0}function oe(){return(t.getWorkspacePath&&t.getWorkspacePath()||"").trim()}function de(){return t.depCandidates?t.depCandidates():null}async function Ce(w,D,z){let $e=oe(),We=u;if(!We)return;if($e.length===0){_e("\uB808\uD3EC\uB97C \uC54C \uC218 \uC5C6\uC5B4 \uC758\uC874\uC744 \uBC14\uAFC0 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error");return}let ut=await A(w,{a:We,b:D,view_id:We,root_dir:$e},z),zt=ut===!0||ut!==!1&&ut.saved===!0;zt&&t.onDepChanged&&t.onDepChanged({type:w,a:We,b:D}),w==="dep-add"&&zt&&(H="",W=!1),ot()}function He(w){if(!u)return;let D=globalThis.confirm;typeof D=="function"&&!D(`${w}\uAC00 ${u}\uB97C \uB9C9\uB294 \uC5F0\uACB0\uC744 \uB04A\uC744\uAE4C\uC694?`)||Ce("dep-remove",w,"\uC758\uC874 \uD574\uC81C \uC2E4\uD328")}function Ct(w){w.disabled||Ce("dep-add",w.bead_id,"\uC758\uC874 \uCD94\uAC00 \uC2E4\uD328")}function Xt(w){H=w.target.value,W=!0,ot()}function dt(){W||(W=!0,ot())}function an(w,D){if(w.key==="Escape"){w.stopPropagation(),H="",W=!1,ot();return}w.key==="Enter"&&(w.preventDefault(),D.length===1&&!D[0].disabled&&Ct(D[0]))}function cn(w){return c`<div class="detail-dep-add">
      <input
        class="detail-dep-add__input"
        aria-label="막는 이슈 추가"
        placeholder="막는 이슈 추가"
        .value=${H}
        @focus=${dt}
        @input=${Xt}
        @keydown=${D=>an(D,w)}
      />
      ${W||H.length>0?c`<div class="detail-dep-add__list">
            ${w.length===0?c`<div class="detail-dep-add__empty">후보 없음</div>`:w.map(D=>c`<button
                      type="button"
                      class="detail-dep-add__cand"
                      data-dep-cand=${D.bead_id}
                      ?disabled=${D.disabled}
                      title=${pn(D.reason)}
                      @click=${()=>Ct(D)}
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
    </div>`}function Wn(w,D){let z=D.get(w.id),$e=i?c`<button
          type="button"
          class="detail-dep__link"
          title=${pn(w.title)}
          @click=${()=>z===void 0?i(w.id):i(w.id,z)}
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
            @click=${()=>He(w.id)}
          >
            ✕
          </button>`:""}</span
    >`}function _n(w){let D=Array.isArray(w.dependencies)?w.dependencies:[],z=Array.isArray(w.dependents)?w.dependents:[],$e=[];for(let Xe of D){let Rt=Gr(Xe);Rt.length>0&&Yr(Xe)==="blocks"&&$e.push({id:Rt,label:`\u26D3 ${Rt}`,kind:"pred",title:g("\uB9C9\uB294",Xe)})}for(let Xe of z){let Rt=Gr(Xe);Rt.length>0&&Yr(Xe)==="blocks"&&$e.push({id:Rt,label:`\u2192 ${Rt}`,kind:"succ",title:g("\uB9C9\uD788\uB294",Xe)})}for(let Xe of D){let Rt=Gr(Xe),An=Yr(Xe);if(Rt.length>0&&An!=="blocks"){let Se=h(An);$e.push({id:Rt,label:`${Se.glyph}${Rt}`,kind:"other",title:g(Se.relation,Xe)})}}let We=de(),ut=new Map;if(We)for(let Xe of We.issues)ut.has(Xe.bead_id)||ut.set(Xe.bead_id,Xe.root_dir);let zt=We&&u?Yd(Gd(u,We),H):[];return c`
      <div class="detail-section-label">의존성</div>
      ${$e.length===0?c`<div class="detail-empty">의존성 없음</div>`:c`<div class="detail-deps">
            ${$e.map(Xe=>Wn(Xe,ut))}
          </div>`}
      ${We===null?c`<div class="detail-empty">후보를 불러올 수 없음</div>`:cn(zt)}
    `}function dn(w){let D=w.metadata||{},z=w.workflow||{},$e=z.stages||{},We=$e.spec&&$e.spec.stale,ut=$e.impl&&$e.impl.stale,zt=z.quick_fix_review?.state==="stale",Xe=$e.plan||null,Rt=z.route_source==="derived",An=z.route||D.route||"\u2014";return c`
      <div class="detail-section-label">워크플로우</div>
      <div class="detail-kv">
        <span class="detail-kv__k">route</span>
        <span
          class="detail-kv__v${Rt?" detail-kv__v--derived":""}"
          title=${Rt?"route \uBBF8\uD540 (metadata unset)":"route"}
          >${Rt?"unset":An}</span
        >
      </div>
      ${z.route!=="quick_fix"||Object.hasOwn(D,"spec_review")?c`<div class="detail-kv">
            <span class="detail-kv__k">spec_review</span>
            <span class="detail-kv__v"
              >${D.spec_review||"\uC5C6\uC74C"}${We?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${z.route==="full_plan"?c`<div class="detail-kv">
              <span class="detail-kv__k">plan_review</span>
              <span class="detail-kv__v">${Xe?.receipt||"\uC5C6\uC74C"}</span>
            </div>
            <div class="detail-kv">
              <span class="detail-kv__k">plan_approval</span>
              <span class="detail-kv__v"
                >${Xe?.approval_receipt||"\uC5C6\uC74C"}${Xe?.approval_state==="stale"?" \xB7 stale":Xe?.approval_state==="unknown"?" \xB7 unknown":""}</span
              >
            </div>`:""}
      ${z.route!=="quick_fix"||Object.hasOwn(D,"impl_review")?c`<div class="detail-kv">
            <span class="detail-kv__k">impl_review</span>
            <span class="detail-kv__v"
              >${D.impl_review||"\uC5C6\uC74C"}${ut?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${z.resolver?c`<div class="detail-kv">
            <span class="detail-kv__k">↳ 충돌 해소</span>
            <span
              class="detail-kv__v detail-kv__v--resolver detail-kv__v--wrap"
              title=${`resolver-self:${z.resolver.attempt} \xB7 ${z.resolver.prior_sha} \u2192 ${z.resolver.sha}`}
              >${`${z.resolver.prior_sha.slice(0,7)} \u2192 ${z.resolver.sha.slice(0,7)}`}</span
            >
          </div>`:""}
      ${z.route==="quick_fix"||Object.hasOwn(D,"quick_fix_review")?c`<div class="detail-kv">
            <span class="detail-kv__k">quick_fix_review</span>
            <span class="detail-kv__v"
              >${D.quick_fix_review||"\uC5C6\uC74C"}${zt?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${z.planned_execution?c`<div class="detail-kv">
              <span class="detail-kv__k">planned_execution</span>
              <span class="detail-kv__v">${z.planned_execution.kind}</span>
            </div>
            ${z.planned_execution.kind==="main"?c`<div class="detail-kv">
                  <span class="detail-kv__k">planned_execution_reason</span>
                  <span class="detail-kv__v detail-kv__v--wrap"
                    >${z.planned_execution.reason}</span
                  >
                </div>`:""}`:""}
      ${z.exec_receipt?c`<div class="detail-kv">
            <span class="detail-kv__k">exec_receipt</span>
            <span class="detail-kv__v detail-kv__v--wrap"
              >${er(z.exec_receipt)}</span
            >
          </div>`:""}
      ${z.impl_entry?c`<div class="detail-kv">
            <span class="detail-kv__k">impl_entry</span>
            <span class="detail-kv__v"
              >${`${z.impl_entry.actor}@${z.impl_entry.sha}`}</span
            >
          </div>`:""}
      ${D.pr_url?c`<div class="detail-kv">
            <span class="detail-kv__k">pr_url</span>
            <span class="detail-kv__v detail-kv__v--wrap">${D.pr_url}</span>
          </div>`:""}
    `}let Rn={route:["quick_fix","spec_backed","full_plan"]};async function Qn(w,D){let z=D.target.value;if(w==="route"&&d&&d.metadata&&d.metadata.route==="full_plan"&&z!=="full_plan"&&!window.confirm(`full_plan \u2192 ${z||"(\uBBF8\uC124\uC815)"} \uC804\uD658: \uC800\uC7A5\uB41C plan \uC2B9\uC778\uC740 \uD3EC\uAE30\uB418\uBA70, plan \uD30C\uC77C\xB7\uB9C8\uCEE4 \uC815\uB9AC\uB294 \uC138\uC158 \uACC4\uC57D\uC774 \uC218\uD589\uD569\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`)){ot();return}await A("update-workflow-meta",{id:u,key:w,value:z},"\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uBA54\uD0C0 \uBCC0\uACBD \uC2E4\uD328"),ot()}function ln(w){let D=w.metadata||{};return c` ${(($e,We)=>{let ut=Rn[$e],zt=typeof D[$e]=="string"?D[$e]:"";return c`<div class="detail-kv">
        <span class="detail-kv__k">${$e}</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label=${$e}
          data-edit=${`wfmeta-${$e}`}
          @change=${Xe=>Qn($e,Xe)}
        >
          <option value="" ?selected=${!ut.includes(zt)}>
            ${We}
          </option>
          ${ut.map(Xe=>c`<option value=${Xe} ?selected=${zt===Xe}>${Xe}</option>`)}
        </select>
      </div>`})("route","(unset)")} `}function Xn(w,D){return P?c`
        <div class="detail-edit">
          <input
            class="detail-edit__input"
            data-edit="title"
            aria-label="제목 편집"
            .value=${G}
            @input=${Me}
            @keydown=${z=>Er(z,St,st,!1)}
          />
          <div class="detail-edit__actions">
            <button
              type="button"
              class="detail-edit__save"
              data-edit="title-save"
              @click=${St}
            >
              저장
            </button>
            <button
              type="button"
              class="detail-edit__cancel"
              data-edit="title-cancel"
              @click=${st}
            >
              취소
            </button>
          </div>
        </div>
      `:c`
      <div class="detail-title-row">
        <h2 class="detail-overlay__title">${w}</h2>
        ${un(D).map(z=>c`<span class="detail-usage-total" title=${z.tooltip}
              >${z.label}</span
            >`)}
        <button
          type="button"
          class="detail-edit-btn"
          data-edit="title"
          aria-label="제목 편집"
          @click=${Ie}
        >
          ✎
        </button>
      </div>
    `}function cr(w){let D=on(w.created_at),z=on(w.updated_at);return!D&&!z?c``:c`
      ${D?c`<div class="detail-kv">
            <span class="detail-kv__k">생성</span>
            <span class="detail-kv__v detail-kv__v--time">${D}</span>
          </div>`:""}
      ${z?c`<div class="detail-kv">
            <span class="detail-kv__k">수정</span>
            <span class="detail-kv__v detail-kv__v--time">${z}</span>
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
          ${Qy.map(z=>c`<option value=${z} ?selected=${z===w}>${z}</option>`)}
        </select>
      </div>
      <div class="detail-kv">
        <span class="detail-kv__k">priority</span>
        <select
          class="detail-kv__v"
          aria-label="priority"
          data-edit="priority"
          @change=${ca}
        >
          ${Xy.map(z=>c`<option value=${String(z)} ?selected=${z===D}>
                P${z}
              </option>`)}
        </select>
      </div>
    `}function zn(w){return c`
      <div class="detail-title-row">
        <div class="detail-overlay__section-label">설명</div>
        ${F?"":c`<button
              type="button"
              class="detail-edit-btn"
              data-edit="description"
              aria-label="설명 편집"
              @click=${jt}
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
    `}function Ve(w){let D=typeof w.notes=="string"?w.notes:"";return D.trim().length===0?c``:c`
      <div class="detail-overlay__section-label">노트</div>
      <div class="detail-overlay__notes">${D}</div>
    `}function Yt(w){let D=Array.isArray(w.labels)?w.labels:[];return c`
      <div class="detail-section-label">라벨</div>
      <div class="detail-labels">
        ${D.map(z=>c`<span class="detail-label-chip"
              >${z}<button
                type="button"
                class="detail-label-chip__x"
                data-label=${z}
                aria-label=${"\uB77C\uBCA8 \uC81C\uAC70: "+z}
                @click=${()=>da(z)}
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
            @input=${ua}
            @keydown=${Es}
          />
          <button
            type="button"
            class="detail-label-add__btn"
            @click=${Ss}
          >
            추가
          </button>
        </span>
      </div>
    `}function xn(){if(!u)return c``;let w=d||{},D=String(w.id||u),z=w.title||"(\uC81C\uBAA9 \uC5C6\uC74C)",$e=Ne(),We=w.status||"open",ut=typeof w.priority=="number"?Math.max(0,Math.min(4,w.priority)):"",zt=w.description||"",Xe=s?s.get():null,Rt=Xe&&We!=="closed"?Go({...w,id:D},Xe):null,An=Xe?Yo(Xe):null,Se={...w,metadata:{...w.metadata||{},...p}};return c`
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
              ${D}
            </button>
            ${Rt?c`<button
                  type="button"
                  class="op-btn op-btn--primary detail-overlay__place"
                  data-bead-id=${D}
                  ?disabled=${!Rt.placeable}
                  title=${Nr(Rt)}
                  @click=${()=>wt(D,An)}
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
          ${Rt&&R&&An?c`<div
                class="place-menu detail-overlay__place-menu"
                @click=${pt=>$t(pt,D)}
              >
                ${Qa(An,D)}
                <button
                  type="button"
                  class="op-btn op-btn--icon worker-card__place-cancel"
                  data-bead-id=${D}
                  title="레인 선택 취소"
                  aria-label="레인 선택 취소"
                  @click=${()=>{R=!1,ot()}}
                >
                  ✕
                </button>
              </div>`:""}
          ${Xn(z,$e)}
          ${jp(Se,{onChipToggle:pt=>f.toggle({bead_id:D,chip_key:pt}),isChipOpen:pt=>f.isOpen({bead_id:D,chip_key:pt})})}
          ${Np({metadata:Se.metadata,workspace_values:Ht(),catalog:Et(),execution_defaults:rn(),expanded:O,presets:Wt()?.presets||[],preset_id:_,preset_busy:m,skipped_orchestration_keys:v},{onToggle:pt=>{O=pt,ot()},onEdit:(pt,Zt)=>{if(pt==="impl_runtime"||pt==="impl_model"||pt==="impl_effort"){vt(ct(pt,Zt??""));return}vt(gt(pt,Zt??""))},onPresetSelect:pt=>{_=pt,v=[],ot()},onPresetApply:()=>{we()}})}
          ${Hp({md:Se.metadata,catalog:ee,workspace_defaults:K,handlers:{onExecChange:(pt,Zt)=>vt(gt(pt,Zt))}})}
          ${In(We,ut)} ${cr(w)}
          ${zn(zt)}
          ${Dp(me,ae,{expanded:ge,draft:ve,sending:ye,error:se})}
          ${Ve(w)} ${Yt(w)} ${_n(w)}
          ${dn(w)} ${ln(w)}
          ${Rp(w,pa)}
          ${Xp({expanded:ze,loading:Y,error:V,data:xe},{onToggle:ht})}
          ${Qp(tt(),Gt,{total:$e,expanded:S},Z)}
          ${Jp({events:lt,shown:Bt},{onMore:et})}
        </div>
      </div>
    `}function ot(){mt(xn(),e)}return{load(w){w!==u&&(p={},R=!1,_="",v=[],O=!1,ne(),Re(),nt(),Fe(),ke(),he()),u=w,d=null,!y&&t.subscribeCandidates&&(y=t.subscribeCandidates(()=>{u&&ot()})),k(),Ut(),L!==w&&te(w)},clear(){u=null,d=null,p={},R=!1,_="",m=!1,v=[],O=!1,ne(),Re(),nt(),Fe(),ke(),he(),b(),Pe.close(),Qe.close(),mt(c``,e)},destroy(){T&&(T(),T=null),pe&&(pe(),pe=null),Le&&(Le(),Le=null),b(),document.removeEventListener("keydown",M),f.detach(),Ee||(Pe.destroy(),fe&&fe.parentNode&&fe.parentNode.removeChild(fe)),Qe.destroy(),Ue.parentNode&&Ue.parentNode.removeChild(Ue),u=null,d=null,he(),_="",m=!1,v=[],Re(),nt(),Fe(),ke(),mt(c``,e)}}}function tf(e){let t=document.createElement("dialog");t.id="fatal-error-dialog",t.setAttribute("role","alertdialog"),t.setAttribute("aria-modal","true"),t.innerHTML=`
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
    </div>`,e.appendChild(t);let n=t.querySelector("#fatal-error-title"),r=t.querySelector("#fatal-error-message"),o=t.querySelector("#fatal-error-detail"),i=t.querySelector("#fatal-error-reload"),s=t.querySelector("#fatal-error-close"),l=()=>{if(typeof t.close=="function")try{t.close()}catch{}t.removeAttribute("open")},a=(u,d,p="")=>{n&&(n.textContent=u||"Unexpected Error"),r&&(r.textContent=d||"An unrecoverable error occurred.");let _=typeof p=="string"?p.trim():"";if(o&&(_.length>0?(o.textContent=_,o.removeAttribute("hidden")):(o.textContent="No additional diagnostics available.",o.setAttribute("hidden",""))),typeof t.showModal=="function")try{t.showModal(),t.setAttribute("open","")}catch{t.setAttribute("open","")}else t.setAttribute("open","")};return i&&i.addEventListener("click",()=>{window.location.reload()}),s&&s.addEventListener("click",()=>l()),t.addEventListener("cancel",u=>{u.preventDefault(),l()}),{open:a,close:l,getElement(){return t}}}var Zy="(max-width: 640px)";function Zi(e){if(typeof window.matchMedia!="function")return e(!1),()=>{};let t=window.matchMedia(Zy),n=!!t.matches;e(n);let r=o=>{let s=!!(typeof o=="object"&&o!==null&&typeof o.matches=="boolean"?o.matches:t.matches);s!==n&&(n=s,e(s))};return typeof t.addEventListener=="function"?(t.addEventListener("change",r),()=>{t.removeEventListener("change",r)}):typeof t.addListener=="function"?(t.addListener(r),()=>{typeof t.removeListener=="function"&&t.removeListener(r)}):()=>{}}function Jy(){return{lanes:{done:!0},areas:{}}}function ws(e){let t={};if(typeof e!="object"||e===null)return t;for(let[n,r]of Object.entries(e))typeof r=="boolean"&&(t[n]=r);return t}function ev(e){try{let t=window.localStorage.getItem(e);if(!t)return null;let n=JSON.parse(t);if(typeof n!="object"||n===null)return null;let r=n;return typeof r.lanes=="object"&&r.lanes!==null?{lanes:ws(r.lanes),areas:ws(r.areas)}:{lanes:ws(r),areas:{}}}catch{return null}}function nf(e,t){try{window.localStorage.setItem(e,JSON.stringify(t))}catch{}}function Ji(e,t=Jy()){let n={lanes:ws(t.lanes),areas:ws(t.areas)},r=ev(e),o={lanes:{...n.lanes,...r?r.lanes:{}},areas:{...n.areas,...r?r.areas:{}}};return{isCollapsed(i){return o.lanes[i]===!0},isAreaCollapsed(i){return o.areas[i]===!0},toggle(i){let s=o.lanes[i]!==!0;return o={...o,lanes:{...o.lanes,[i]:s}},nf(e,o),s},toggleArea(i){let s=o.areas[i]!==!0;return o={...o,areas:{...o.areas,[i]:s}},nf(e,o),s}}}function Ul(e){if(typeof e=="string"&&e.length>0)return e;if(e&&typeof e=="object"){let t=e;if(typeof t.message=="string"&&t.message.length>0)return t.message;if(typeof t.error=="string"&&t.error.length>0)return t.error;if(t.error&&typeof t.error=="object"&&typeof t.error.message=="string")return t.error.message}return"\uC694\uCCAD\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4"}function ea(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"&&t.length>0):[]}function ta(e){let{transport:t,console_el:n,getLanes:r,getWorkspaces:o,getCrossLanes:i,reproject:s,onCorrection:l,showToast:a,requestRender:u,adoptQueue:d,onDragBegin:p,candidate_drop:_}=e,m=[],v=null,O=!1,R=null,Q=null,ee=null;function K(){R!==null&&clearTimeout(R),R=setTimeout(()=>{R=null,O=!1},0)}function L(){return i()??null}function I(){let X=new Map,J=o();for(let re of Array.isArray(J)?J:[]){if(!re||typeof re!="object")continue;let ae=re.bead_blocked_by&&typeof re.bead_blocked_by=="object"?re.bead_blocked_by:{};for(let[Ee,fe]of Object.entries(ae))Array.isArray(fe)&&X.set(Ee,ea(fe));for(let Ee of[...Array.isArray(re.runnable)?re.runnable:[],...Array.isArray(re.session_active)?re.session_active:[]])Ee&&typeof Ee.bead_id=="string"&&Array.isArray(Ee.blocked_by)&&Ee.blocked_by.length>0&&X.set(Ee.bead_id,ea(Ee.blocked_by))}return X}function P(){let X=new Map,J=new Map,re=o();for(let ae of Array.isArray(re)?re:[]){if(!ae||typeof ae!="object")continue;let Ee=ae.bead_blocked_by&&typeof ae.bead_blocked_by=="object"?ae.bead_blocked_by:{};for(let[fe,Pe]of Object.entries(Ee))Array.isArray(Pe)&&X.set(fe,ea(Pe));for(let fe of Array.isArray(ae.runnable)?ae.runnable:[])fe&&typeof fe.bead_id=="string"&&Array.isArray(fe.blocked_by)&&J.set(fe.bead_id,ea(fe.blocked_by))}for(let ae of m)for(let Ee of[X,J]){let fe=Ee.get(ae.a);fe!==void 0&&Ee.set(ae.a,ae.type==="dep-remove"?fe.filter(Pe=>Pe!==ae.b):fe.includes(ae.b)?fe:[...fe,ae.b])}return{snapshot:X,runnable:J}}function F(){let X=I();for(let J of m){let re=(X.get(J.a)||[]).slice();J.type==="dep-remove"?X.set(J.a,re.filter(ae=>ae!==J.b)):re.includes(J.b)||X.set(J.a,[...re,J.b])}return X}function G(X=r(),J=L()){let re=new Map;for(let ze of Array.isArray(J?.lanes)?J.lanes:[]){let Y=new Map;for(let V of Array.isArray(ze?.entries)?ze.entries:[])V&&typeof V.bead_id=="string"&&Y.set(V.bead_id,V.dep_created_by_lane===!0);re.set(typeof ze?.id=="string"?ze.id:"",Y)}let ae=new Map,Ee=new Map,fe=new Set,Pe=new Set;for(let ze of X.chain_lanes){let Y=re.get(ze.lane_id);ae.set(ze.lane_id,{status:ze.status,entries:ze.rows.map((V,xe)=>({bead_id:V.id,root_dir:V.root_dir,...xe===0?{}:{dep_created_by_lane:Y?.get(V.id)===!0}}))});for(let V of ze.rows)Ee.set(V.id,ze.lane_id),V.fixed&&fe.add(V.id),V.unplaced||Pe.add(V.id)}let Ue=new Map;for(let ze of X.parallel_rows)typeof ze.queue_index=="number"&&Ue.set(ze.id,ze.queue_index);for(let ze of X.queue_groups)for(let Y of ze.sublanes.serial)for(let V of Y.items)typeof V.queue_index=="number"&&Ue.set(V.id,V.queue_index);let Qe=P();return{blocked_by_map:F(),snapshot_blocked_by:Qe.snapshot,runnable_blocked_by:Qe.runnable,owner_of:new Map(Object.entries(X.owner_of)),cross_lanes:ae,owner_lane_of:Ee,fixed_members:fe,placed_members:Pe,parallel_rows:X.parallel_rows.map(ze=>({bead_id:ze.id,root_dir:ze.root_dir,queue_index:ze.queue_index??0})),parallel_raw_length:new Map(Object.entries(X.parallel_raw_length)),queue_index_of:Ue}}function q(X,J){let re=r();for(let Ee of[...re.runnable,...re.queue,...re.running,...re.pr_wait,...re.done])if(!(Ee.non_occupying||Ee.id!==J)){if(Ee.root_dir===X)return Ee.expected_revision;break}let ae=re.queue_groups.find(Ee=>Ee.root_dir===X);return ae?ae.revision:0}async function N(X,J,re,ae){if(!t)return null;let fe=await t(X,{...J,...re?{root_dir:re}:{},expected_revision:ae});if(fe&&fe.conflict){fe.queue&&d?.(re,fe.queue);let Pe=fe.queue&&typeof fe.queue.revision=="number"?fe.queue.revision:ae;fe=await t(X,{...J,...re?{root_dir:re}:{},expected_revision:Pe})}return fe&&fe.queue&&d?.(re,fe.queue),fe}async function H(X,J,re,ae,Ee){try{let fe=await N(X,J,re,ae.get(re)??q(re,Ee.bead_id));return!fe||typeof fe.applied!="boolean"?(a("\uD050 \uC694\uCCAD\uC774 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error"),null):(fe.queue&&typeof fe.queue.revision=="number"&&ae.set(re,fe.queue.revision),fe.conflict?(a("\uD050\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD574 \uC8FC\uC138\uC694","error"),null):fe.applied===!1?(a(fe.admission_reason?`\uD050 \uC801\uC7AC \uAC70\uBD80: ${fe.admission_reason}`:"\uD050 \uC694\uCCAD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4","error"),null):fe.queue&&typeof fe.queue.revision=="number"?fe.queue.revision:ae.get(re)??0)}catch(fe){return a(Ul(fe),"error"),null}}async function W(X,J,re=new Map){if(X.type==="worker-queue-disarm"){try{let ae=await N(X.type,X.payload,X.root_dir,re.get(X.root_dir)??q(X.root_dir,J));ae&&ae.queue&&typeof ae.queue.revision=="number"&&re.set(X.root_dir,ae.queue.revision)}catch{}return!0}if(X.type==="worker-queue-place"||X.type==="worker-queue-reorder"||X.type==="worker-queue-remove")return await H(X.type,X.payload,X.root_dir,re,{bead_id:J})!==null;try{return(X.type==="dep-add"||X.type==="dep-remove")&&t&&await t(X.type,{a:X.a,b:X.b,...X.root_dir?{root_dir:X.root_dir}:{}}),!0}catch(ae){return a(Ul(ae),"error"),!1}}function ne(X){(X.type==="dep-add"||X.type==="dep-remove")&&(m=[...m,{type:X.type,a:X.a,b:X.b}])}async function he(X,J){if(!t)return{ok:!1};try{let re=await t(X.type,{...X.payload,expected_revision:J});return!re||typeof re.revision!="number"?(a("\uC5F0\uACB0 \uB808\uC778 \uC751\uB2F5\uC5D0 revision\uC774 \uC5C6\uC2B5\uB2C8\uB2E4","error"),{ok:!1}):{ok:!0,revision:re.revision}}catch(re){let ae=re,Ee=ae&&ae.code==="conflict"?ae.details?.cross_lanes:null;return Ee&&typeof Ee.revision=="number"&&Array.isArray(Ee.lanes)?{ok:!1,conflict:Ee}:(a(Ul(re),"error"),{ok:!1})}}async function qe(X,J,re){let ae=new Map,Ee=[],fe=X.ops.slice(0,X.lane_op_index),Pe=X.ops.slice(X.lane_op_index);for(let Qe of fe){if(!await W(Qe,re,ae))return{done:!0};ne(Qe)}let Ue=J;for(let Qe of X.lane_ops){if(Ue===null)return a("\uC5F0\uACB0 \uB808\uC778 \uC800\uC7A5\uC18C\uB97C \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error"),{done:!0};let ze=await he(Qe,Ue);if(!ze.ok)return ze.conflict?{done:!1,conflict:ze.conflict}:{done:!0};Ue=ze.revision}for(let Qe of Pe){if(!await W(Qe,re,ae))return{done:!0};ne(Qe),Qe.type==="dep-add"&&Ee.push(Qe)}for(let Qe of Hd(Ee))Ue=await B(Qe,Ue);return{done:!0}}async function B(X,J){if(J===null||!t)return J;let re=X.pairs,ae=J;for(let Ee=0;Ee<2;Ee+=1){if(re.length===0)return ae;try{let fe=await t("monitor-lane-provenance",{lane_id:X.lane_id,pairs:re.map(Pe=>({bead_id:Pe.bead_id,after:Pe.after,value:!0})),expected_revision:ae});return fe&&typeof fe.revision=="number"?fe.revision:ae}catch(fe){let Pe=fe,Ue=Pe&&Pe.code==="conflict"?Pe.details?.cross_lanes:null;if(!Ue||typeof Ue.revision!="number"||!Array.isArray(Ue.lanes))return ae;let Qe=Ue.lanes.find(ze=>ze&&ze.id===X.lane_id);re=Kd(Array.isArray(Qe?.entries)?Qe.entries:[],re),ae=Ue.revision}}return ae}async function te(X,J,re=[]){m=re,l("",0);let ae=r(),Ee=L();for(let fe=0;;fe+=1){let Pe=X(G(ae,Ee));if("refused"in Pe){a(Pe.refused,"error");break}let Ue=await qe(Pe,ae.cross_lanes_revision,J);if(Ue.done){Pe.correction&&l(Pe.correction.lane_id,Pe.correction.corrected);break}if(fe>=1){a("\uB808\uC778\uC774 \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4","error");break}let Qe=s(Ue.conflict);ae=Qe.lanes,Ee=Qe.raw_lanes}m=[],u()}async function me(X,J){await te(re=>Li(X,J,re),X.bead_id)}function Te(X,J){let re=J&&typeof J.closest=="function"?J.closest("[data-row-index]"):null;if(re&&X.contains(re)){let ae=Number(re.getAttribute("data-row-index"));return Number.isFinite(ae)?ae:0}return X.querySelectorAll("[data-row-index]").length}function C(X){let J=typeof X?.closest=="function"?X.closest(".worker-pane--collapsed[data-lane]"):null;if(!J)return null;let re=J.getAttribute("data-lane");return re==="queue"?{zone:J,target:{kind:"parallel",marker_index:r().parallel_rows.length}}:re==="candidate"&&_===!0?{zone:J,target:{kind:"candidate"}}:null}function se(X){let J=X.target;if(!v)return null;let re=typeof J?.closest=="function"?J.closest("[data-drop]"):null;if(!re)return C(J);let ae=re.getAttribute("data-drop");if(ae==="candidate")return{zone:re,target:{kind:"candidate"}};if(ae==="parallel")return{zone:re,target:{kind:"parallel",marker_index:Te(re,J)}};if(ae==="chain")return{zone:re,target:{kind:"chain",lane_id:re.getAttribute("data-lane-id")||"",marker_index:Te(re,J)}};if(ae==="repo-serial"){let Ee=re.getAttribute("data-root-dir")||"";if(Ee!==v.root_dir)return null;let fe=typeof J?.closest=="function"?J.closest("[data-queue-index]"):null,Pe=fe&&re.contains(fe)?fe.getAttribute("data-queue-index"):re.getAttribute("data-lane-length"),Ue=Number(Pe);return{zone:re,target:{kind:"repo-serial",root_dir:Ee,lane_id:re.getAttribute("data-lane-id")||"",index:Number.isFinite(Ue)?Ue:0}}}return null}function ve(){for(let X of Array.from(n.querySelectorAll(".is-drop-over")))X.classList.remove("is-drop-over")}function ye(X){Q=X.target instanceof Element?X.target:null}function De(X){let J=X.target,re=typeof J?.closest=="function"?J.closest('[draggable="true"][data-bead-id]'):null,ae=re?re.closest("[data-drag-kind]"):null;if(!ae)return;if(re&&Q&&re.contains(Q)&&typeof Q.closest=="function"&&Q.closest("input, button, a")){X.preventDefault();return}let Ee=ae.getAttribute("data-bead-id")||"",fe=ae.getAttribute("data-drag-kind")||"",Pe=ae.getAttribute("data-root-dir")||"";if(!Ee||!fe)return;let Ue=ae.getAttribute("data-queue-index")||"",Qe=Number(Ue),ze=ae.getAttribute("data-lane-id")||"";v={kind:fe,bead_id:Ee,root_dir:Pe,...Ue!==""&&Number.isFinite(Qe)?{queue_index:Qe}:{},...ze?{lane_id:ze}:{}},O=!0,p?.(),n.classList.add("is-dragging");try{X.dataTransfer?.setData("text/plain",Ee),X.dataTransfer&&(X.dataTransfer.effectAllowed="move")}catch{}}function ge(X){let J=se(X);J&&(X.preventDefault(),X.dataTransfer&&(X.dataTransfer.dropEffect="move"),J.zone.classList.add("is-drop-over"))}function Re(X){let J=X.target;typeof J?.closest=="function"&&(J.closest("[data-drop]")?.classList.remove("is-drop-over"),J.closest(".worker-pane--collapsed")?.classList.remove("is-drop-over"))}function Ze(){v=null,ve(),n.classList.remove("is-dragging"),K()}function ft(X){let J=se(X),re=v;v=null,ve(),n.classList.remove("is-dragging"),!(!J||!re)&&(X.preventDefault(),me(re,J.target))}return{attach(X){ee||(ee=X,X.addEventListener("pointerdown",ye),X.addEventListener("dragstart",De),X.addEventListener("dragover",ge),X.addEventListener("dragleave",Re),X.addEventListener("drop",ft),X.addEventListener("dragend",Ze))},detach(){R!==null&&(clearTimeout(R),R=null);let X=ee;ee=null,X&&(X.removeEventListener("pointerdown",ye),X.removeEventListener("dragstart",De),X.removeEventListener("dragover",ge),X.removeEventListener("dragleave",Re),X.removeEventListener("drop",ft),X.removeEventListener("dragend",Ze))},isDragging(){return v!==null},consumeClickSuppression(){let X=O;return O=!1,X},applyDrop:me,runPlanned:te,dropModel:G,sendOp:W,sendQueueCas:H,rememberDep:ne}}var Wl=Object.freeze({repo_ops_worktree_unowned:"\uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC\uAC00 \uC544\uC9C1 Worker \uC18C\uC720\uAC00 \uC544\uB2C8\uC5B4\uC11C \uC2A4\uD06C\uB9BD\uD2B8 \uC2E4\uD589 \uC804\uC5D0 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4.",verify_cmd_failed:"\uBA38\uC9C0 \uD6C4 \uAC80\uC99D \uBA85\uB839\uC774 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",gh_observation_failed:"GitHub\uC5D0\uC11C PR \uC0C1\uD0DC\uB97C \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",verify_script_failure:"\uAC80\uC99D \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",deploy_script_failure:"\uBC30\uD3EC \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",interrupted_without_terminal_exit:"\uC791\uC5C5\uC774 \uC885\uB8CC \uAE30\uB85D \uC5C6\uC774 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4.",manual_target_missing:"\uC218\uB3D9 \uBC30\uD3EC \uAE30\uB85D\uC5D0 \uD540\uB41C \uB300\uC0C1 SHA\uAC00 \uC5C6\uC5B4 \uC2E4\uD589\uD558\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4.",bootstrap_not_approved:"\uCCAB [deploy] \uC120\uC5B8\uC740 \uC0AC\uB78C \uC2B9\uC778 \uC5C6\uC774 \uC2E4\uD589\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4. Worker \uC124\uC815\uC758 [\uBC30\uD3EC \uC2E4\uD589]\uC73C\uB85C \uC6D0\uACA9 base tip\uC744 \uD55C \uBC88 \uBC30\uD3EC\uD55C \uB4A4 [\uC815\uC0B0 \uC7AC\uAC1C]\uB97C \uB204\uB974\uC138\uC694 \u2014 \uADF8 \uB4A4 \uBA38\uC9C0\uBD80\uD130\uB294 \uC790\uB3D9 \uBC30\uD3EC\uB429\uB2C8\uB2E4.",base_unresolved:"PR\uC774 \uC5B4\uB290 base \uBE0C\uB79C\uCE58\uB85C \uBA38\uC9C0\uB418\uB294\uC9C0 \uD655\uC815\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_ref_unobserved:"PR\uC758 base \uBE0C\uB79C\uCE58\uB97C \uC544\uC9C1 \uAD00\uCE21\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",merge_sha_unobserved:"\uBA38\uC9C0 \uCEE4\uBC0B SHA\uB97C \uC544\uC9C1 \uAD00\uCE21\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_fetch_failed:"\uC6D0\uACA9 base \uBE0C\uB79C\uCE58\uB97C fetch\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_rev_unavailable:"fetch\uD55C \uC6D0\uACA9 base \uBE0C\uB79C\uCE58\uC758 \uCEE4\uBC0B\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_ff_diverged:"\uB85C\uCEEC base \uBE0C\uB79C\uCE58\uAC00 \uC6D0\uACA9\uACFC \uAC08\uB77C\uC838 fast-forward\uB85C \uC815\uB82C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",deployment_target_not_covering_merge:"\uBC30\uD3EC \uB300\uC0C1 base\uAC00 \uC774 \uBA38\uC9C0 \uCEE4\uBC0B\uC744 \uD3EC\uD568\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.",deployment_candidate_ancestry_check_failed:"\uBC30\uD3EC \uB300\uC0C1 base\uAC00 \uC774 \uBA38\uC9C0 \uCEE4\uBC0B\uC744 \uD3EC\uD568\uD558\uB294\uC9C0 \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",verify_red:"\uBA38\uC9C0 \uD6C4 \uAC80\uC99D\uC774 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",cleanup_failed:"\uBA38\uC9C0 \uD6C4 \uC815\uB9AC\uAC00 \uB05D\uB098\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",retry_exhausted:"\uC790\uB3D9 \uC7AC\uC2DC\uB3C4\uB97C \uBAA8\uB450 \uC4F0\uACE0\uB3C4 \uAC19\uC740 \uC2E4\uD328\uAC00 \uC774\uC5B4\uC84C\uC2B5\uB2C8\uB2E4.",conflict_unresolved:"\uCDA9\uB3CC \uD574\uC18C\uAC00 \uB05D\uB098\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",internal_record_failed:"Worker \uB0B4\uBD80 \uAE30\uB85D\uC774 \uC2E4\uD328\uD574 \uC9C4\uD589\uC744 \uBA48\uCDC4\uC2B5\uB2C8\uB2E4.",foreign_landing_unpinned:"\uB2E4\uB978 \uC800\uC7A5\uC18C \uCC29\uC9C0\uC778\uB370 foreign_repo\xB7foreign_path\xB7foreign_base \uD540\uC774 \uC5C6\uAC70\uB098 \uD615\uC2DD\uC774 \uD2C0\uB9BD\uB2C8\uB2E4.",foreign_checkout_unavailable:"\uD540\uB41C \uB300\uC0C1 \uC800\uC7A5\uC18C \uCCB4\uD06C\uC544\uC6C3\uC774 \uC5C6\uAC70\uB098 foreign_repo\uC640 \uAC19\uC740 URL\uC758 remote\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4.",foreign_deploy_unsupported:"\uB300\uC0C1 \uC800\uC7A5\uC18C\uAC00 [deploy]\uB97C \uC120\uC5B8\uD574 Worker\uAC00 \uBC30\uD3EC \uC99D\uAC70\uB97C \uB9CC\uB4E4 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4. \uC138\uC158\uC774 \uBC30\uD3EC\uC640 \uB9C8\uAC10\uC744 \uC18C\uC720\uD569\uB2C8\uB2E4.",repair_lane_retired:"\uC790\uB3D9 \uC218\uB9AC \uB808\uC778\uC774 \uC740\uD1F4\uD574 \uC0AC\uB78C \uCC98\uB9AC\uB85C \uB118\uC5B4\uC654\uC2B5\uB2C8\uB2E4."});var rf={verify_failed:"\uAC80\uC99D \uC2E4\uD328",verify_cmd_failed:"\uAC80\uC99D \uC2E4\uD328",verify_script_failure:"\uAC80\uC99D \uC2E4\uD328",deploy_failed:"\uBC30\uD3EC \uC2E4\uD328",deploy_script_failure:"\uBC30\uD3EC \uC2E4\uD328",job_script_failure:"\uC7A1 \uC2E4\uD328",interrupted_without_terminal_exit:"\uC911\uB2E8\uB428",quickfix_landing_failed:"\uCC29\uC9C0 \uC2E4\uD328",runner_exit:"\uC138\uC158 \uC2E4\uD328",session_parked:"\uC138\uC158 \uB300\uAE30",session_ended_unresolved:"\uC138\uC158 \uC885\uB8CC",prerequisite_unmet:"\uC120\uD589 \uB300\uAE30",delivery_unproven:"\uCC29\uC9C0 \uC99D\uAC70 \uBD80\uC871"},of={overloaded_529:"Claude API \uACFC\uBD80\uD558(529)\uB85C \uBCF4\uB958",rate_limited_429:"Claude API \uC694\uCCAD \uD55C\uB3C4(429)\uB85C \uBCF4\uB958"},sf={"session_hard_stop:failure":"\uC138\uC158\uC774 \uC2E4\uD328\uB97C \uBCF4\uACE0\uD558\uACE0 \uC885\uB8CC","session_hard_stop:environment":"\uC138\uC158\uC774 \uD658\uACBD \uC624\uB958\uB97C \uBCF4\uACE0\uD558\uACE0 \uC885\uB8CC","resume_failed:transcript_missing":"\uC774\uC5B4\uD558\uAE30 \uB300\uC0C1 \uC138\uC158 \uAE30\uB85D\uC774 \uC5C6\uC74C \u2014 \uC0C8 \uC138\uC158\uC73C\uB85C \uB300\uCCB4"};function tv(e){return typeof e!="number"||!Number.isFinite(e)?"":new Date(e).toLocaleTimeString("ko-KR",{hour:"2-digit",minute:"2-digit"})}function nv(e,t){if(typeof e!="string"||!e.startsWith("provider_outage:"))return null;let n=e.slice(16);if(n==="usage_limit"){let o=t&&typeof t=="object"?t.resets_at:null,i=tv(o);return i?`\uACC4\uC815 \uC0AC\uC6A9 \uD55C\uB3C4\uB85C \uBCF4\uB958 \u2014 \uB9AC\uC14B ${i}`:"\uACC4\uC815 \uC0AC\uC6A9 \uD55C\uB3C4\uB85C \uBCF4\uB958"}if(Object.hasOwn(of,n))return of[n];let r=/^http_(5\d\d)$/.exec(n);return r?`Claude API \uC624\uB958(${r[1]})\uB85C \uBCF4\uB958`:null}function ra(e){return typeof e!="string"||e.length===0?[]:e.split(":").filter(t=>t.length>0)}function na(e){for(let t of ra(e)){if(Object.hasOwn(rf,t))return rf[t];if(t.startsWith("session_"))return"\uC138\uC158 \uC2E4\uD328"}return null}function lf(e){return ra(e).length===0?null:na(e)||"\uC2E4\uD328"}function zr(e){let t=null;for(let n of ra(e))Object.hasOwn(Wl,n)&&(t=Wl[n]);return t}function wr(e,t){if(typeof e=="string"&&Object.hasOwn(sf,e))return sf[e];let n=nv(e,t);if(n!==null)return n;let r=na(e),o=zr(e);return r&&o?`${r} \u2014 ${o}`:r||o?r||o:typeof e=="string"?e:""}function cf(e,t){let n=na(e)??na(t),r=zr(t)??zr(e);return n&&r?`${n} \u2014 ${r}`:n||r?n||r:typeof t=="string"?t:""}var rv=new Set(["repo_operation_timeout_unresolved"]);function ov(e){for(let t of ra(e))if(rv.has(t)||t.startsWith("repo_ops_"))return!0;return!1}function sv(e,t){return t.code==="interrupted"||t.interrupted===!0||e.failure_kind==="interrupted_without_terminal_exit"||t.code==="interrupted_without_terminal_exit"}function uf(e,t){if(!e||typeof e!="object")return"";let n=e.failure;if(!n||typeof n!="object"||ov(n.code))return"";if(n.code==="timeout"){let o=Number(t);return Number.isFinite(o)&&o>0?`\uD0C0\uC784\uC544\uC6C3 ${Math.round(o/1e3)}\uCD08 \uCD08\uACFC`:"\uD0C0\uC784\uC544\uC6C3 \uCD08\uACFC"}if(sv(e,n))return"\uC885\uB8CC \uAE30\uB85D \uC5C6\uC74C \u2014 \uC911\uB2E8\uB428";let r=typeof e.elapsed_ms=="number"&&Number.isFinite(e.elapsed_ms)&&e.elapsed_ms>=0?` \xB7 ${jr(e.elapsed_ms)}`:"";return typeof e.signal=="string"&&e.signal.length>0?`signal ${e.signal}${r}`:Number.isInteger(e.exit_code)?`exit ${e.exit_code}${r}`:""}var af={schema_unsupported:"\uD540\uB41C \uC815\uCC45 \uC2A4\uD0A4\uB9C8\uB97C \uC9C0\uC6D0\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4."};function df(e){if(!e||typeof e!="object")return"";let t=e.retry;if(!t||typeof t!="object")return"";if(typeof t.blocked_reason=="string"&&t.blocked_reason)return`\uC790\uB3D9 \uC7AC\uC2DC\uB3C4 \uBABB \uD568 \u2014 ${Object.hasOwn(af,t.blocked_reason)?af[t.blocked_reason]:t.blocked_reason}`;if(t.status==="absorbed"){let n=t.absorbed&&typeof t.absorbed=="object"?t.absorbed:null,r=wr(n?.first_failure?.code);return r?`\uC790\uB3D9 \uC7AC\uC2DC\uB3C4\uB85C \uD574\uC18C\uB428 \u2014 \uCCAB \uC2E4\uD328: ${r}`:"\uC790\uB3D9 \uC7AC\uC2DC\uB3C4\uB85C \uD574\uC18C\uB428"}if(e.state!=="failed")return"";if(t.status==="not_applicable")return"\uC7AC\uC2DC\uB3C4 \uB300\uC0C1 \uC544\uB2D8 \u2014 \uC2A4\uD06C\uB9BD\uD2B8 \uC2E4\uD589 \uC804 \uC2E4\uD328";if(t.status==="consumed"){let n=typeof t.first_fingerprint=="string"&&t.first_fingerprint?t.first_fingerprint:null;if(n===null)return"";if(n===e.failure?.fingerprint)return"\uC790\uB3D9 \uC7AC\uC2DC\uB3C4 1\uD68C \u2014 \uAC19\uC740 \uC2E4\uD328";let r=wr(t.first_failure?.code);return r?`\uC790\uB3D9 \uC7AC\uC2DC\uB3C4 1\uD68C \u2014 \uB2E4\uB978 \uC2E4\uD328: ${r}`:"\uC790\uB3D9 \uC7AC\uC2DC\uB3C4 1\uD68C \u2014 \uB2E4\uB978 \uC2E4\uD328"}return""}function iv(e){if(!Number.isFinite(e)||e<0)return"0s";let t=Math.floor(e/1e3),n=Math.floor(t/60),r=t%60;return n>0?`${n}m ${String(r).padStart(2,"0")}s`:`${r}s`}var pf=200;function av(e){return typeof e!="string"||e.length===0?"":e.length>pf?`${e.slice(0,pf)}\u2026`:e}function lv(e){let t=e&&e.attempts>0&&e.max>0?` ${e.attempts}/${e.max}`:"",n=e&&typeof e.next_at=="number"?` \xB7 ${new Date(e.next_at).toLocaleTimeString("ko-KR",{hour:"2-digit",minute:"2-digit"})}`:"";return`\u21BB \uC7AC\uC2DC\uB3C4 \uB300\uAE30${t}${n}`}function zl(e){return typeof e!="number"||!Number.isFinite(e)?"":new Date(e).toLocaleTimeString("ko-KR",{hour:"2-digit",minute:"2-digit"})}function cv(e){if(!e)return"";let t=e.auto_resume==="disarmed"?" \xB7 \uC218\uB3D9 \uC870\uCE58":"";if(e.kind==="usage_limit"){let r=zl(e.resets_at);if(!r)return`\u23F3 \uD55C\uB3C4 \uB300\uAE30 \xB7 \uB9AC\uC14B \uBBF8\uC0C1${t}`;let o=e.target?.account_alias||e.target?.account||"";return`\u23F3 \uD55C\uB3C4 \uB300\uAE30 ${r}${o?` \xB7 ${o}`:""}${t}`}let n=zl(e.next_probe_at);return`\u26A0\uFE0F \uACF5\uAE09\uC790 \uC7A5\uC560${n?` \xB7 \uB2E4\uC74C \uD504\uB85C\uBE0C ${n}`:""}${t}`}function _f(e){if(!e)return"";let t=Array.isArray(e.timeline)?e.timeline:[],n=typeof e.log_path=="string"?e.log_path:"",r=e.log_expired===!0,o=e.log_unreadable===!0;return t.length===0&&n.length===0&&!r&&!o?"":c`${t.length>0?c`<ol class="rtile__history" data-seam="tile-timeline">
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
    </div>`}function Hl(e,t,n=null,r={}){let o=e.kind==="session",i=o&&Array.isArray(e.session_refs)&&e.session_refs.find(Ee=>Ee&&Ee.current===!0)||null,s=e.failed===!0,l=s&&e.failure||null,a=e.parked===!0&&!s,u=e.retry_wait===!0&&!s&&!a,d=e.waiting===!0&&!s&&!a&&!u,p=e.provider_hold===!0&&!s&&!a&&!u&&!d,_=a&&e.failure||null,m=d&&e.wait||null,v=p&&e.hold||null,O=a||u||d||p,R=!!e.paused,Q=s||O?e.status_label||(a?"\uC138\uC158 \uB300\uAE30":u?"\uC7AC\uC2DC\uB3C4 \uB300\uAE30":d?"\uC120\uD589 \uB300\uAE30":p?"\uACF5\uAE09\uC790 \uBCF4\uB958":e.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328"):R?"\uC77C\uC2DC\uC815\uC9C0":typeof e.started_at=="number"?iv(t-e.started_at):"\u2014",ee=e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker)?e.exec_chips:null,K=Do(e),L=un(e.usage),I=tr(e.usage),P=e.conflict_resolution?R?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":"\uCDA9\uB3CC \uD574\uC18C":null,F=e.base_exception||null,G=e.landing,q=e.attempt_id&&e.attempt_id===n,N=r.monitor||null,H=_v(N),W=yi(N?.cross_lane_chip),ne=N?bi(N.dependency_chips):"",he=gv(N,t,R,o?{updated_at:e.updated_at??null,last_event_at:i&&i.locality==="local"?i.last_event_at:null}:null),qe=o&&e.workflow?.chips?.exec_receipt||null,B=vi(e.workflow),te=ki(e.rec,e.chip_popover?.chip_key==="rec"),me=e.chip_popover?uo(e.chip_popover.content):"",Te=qe?c`<span
        class="ctl-chip ctl-chip--exec-receipt"
        title=${`exec_receipt ${er(qe)}`}
        >${`${qe.kind}:${Hs(qe)}`}</span
      >`:"",C=i?c`<span
        class="ctl-chip ctl-chip--sref"
        title=${`${i.provider}:${i.session_id}@${i.host}${(e.session_refs||[]).length>=2?` \xB7 \uC774\uB825 ${(e.session_refs||[]).length}`:""}`}
        >${Po(i)}</span
      >`:"",se=H||W||B||C||Te||te?c`<div class="rtile__meta">
          ${H}${W}${B}${C}${Te}${te}${me}
        </div>`:"",ve=l?c`<button
          type="button"
          class="rtile__failure-badge"
          data-attempt-id=${l.attempt_id}
          aria-expanded=${l.open===!0?"true":"false"}
          aria-label="실패 상세"
        >
          ⛔ ${lf(l.cause)||"\uC2E4\uD328"}
        </button>
        ${l.halted_auto_advance?c`<span class="rtile__auto-halted">자동 진행 꺼짐</span>`:""}`:"",ye=a?c`<span
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
          >`:p&&v?c`<button
              type="button"
              class="rtile__held-badge rtile__provider-hold-badge"
              data-attempt-id=${e.attempt_id}
              aria-expanded=${v.open===!0?"true":"false"}
              aria-label="공급자 보류 상세"
            >
              ${cv(v)}
            </button>`:"",De=c`${P?c`<span class="worker-mini__badge">${P}</span>`:""}${F?c`<span
        class="worker-mini__badge"
        title="이 세션의 target base가 워크스페이스 선언 base와 다릅니다"
        >${F}</span
      >`:""}${ve}${ye}`,ge=o?"":bo(e),Re=ii(l?.quickfix_landing),Ze=Re==="settlement"?"\uC815\uC0B0 \uC7AC\uAC1C":"\uC774\uC5B4\uD558\uAE30",ft=Re==="settlement"?"\uCC29\uC9C0 \uC815\uC0B0\uC744 \uB2E4\uC2DC \uC2E4\uD589":"\uAC19\uC740 \uC138\uC158\uC73C\uB85C \uC774\uC5B4\uC11C \uC9C4\uD589",X=e.resolve_action?c`<button
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
        </button>`:"",ae=re?c`${J}${re}`:J;return c`<div
    class="rtile${q?" rtile--sel":""}${R?" rtile--paused":""}${s?" rtile--failed rtile--compact":""}${O?" rtile--held rtile--compact":""}${a?" rtile--parked":""}${u?" rtile--retry-wait":""}${d?" rtile--waiting":""}${o?" rtile--session":""}${p?" rtile--provider-hold":""}${e.search_match===!1?" is-dimmed":""}"
    data-bead-id=${e.bead_id}
    data-attempt-id=${e.attempt_id||""}
  >
    <div class="rtile__hd">
      <span
        class="rtile__dot${o?" rtile__dot--session":""}"
        aria-hidden="true"
      ></span>
      <span class="rtile__id" title="클릭하면 ID 복사">${e.bead_id}</span>
      ${wi(e.priority)}${K?c`<span class="rtile__resumed" title=${K}>↻</span>`:""}${De}
      <div class="rtile__hd-actions">
        ${o?c`${typeof e.started_at=="number"?c`<span class="rtile__elapsed">${Q}</span>`:""}${bv(i)}<span
                class="rtile__session-badge"
                title="Worker가 아닌 세션이 in_progress로 잡은 이슈"
                >세션</span
              >`:c`<span class="rtile__elapsed">${Q}</span>`}
        ${o||O?"":s?c`<button
                  type="button"
                  class="op-btn rtile__resume"
                  data-resume-kind=${Re}
                  ?disabled=${l?.resume_eligible===!1}
                  title=${l?.resume_eligible===!1?l.resume_reason||`${Ze} \uBD88\uAC00`:ft}
                  aria-label=${Ze}
                >
                  ↻ ${Ze}
                </button>
                ${ae}`:c`<button
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
                ${ae}`}${X}
      </div>
    </div>
    <div class="rtile__title">${e.title}</div>
    ${O?yv(a?"parked":u?"retry_wait":d?"waiting":"provider_hold",a?_:d?m:v,ae,d?ne:""):s?"":c`${he}${e.rollup?Ws(e.rollup,{parent_id:e.bead_id,expanded:e.rollup_expanded===!0,childChips:Ta}):""}
            ${G?c`<div class="rtile__landing">
                  <span
                    class="merge-step${G.failed?" merge-step--failed":""}"
                    style=${`--progress: ${G.percent}%`}
                    >${G.label}${G.index>0?c`<span class="merge-step__n"
                          >${G.index}/${G.total}</span
                        >`:""}</span
                  >
                </div>`:""}
            ${ne}
            ${o?se:H||W||B||ee||te||L.length>0||I?c`<div class="rtile__meta">
                    ${H}${W}${B}${hi(e.exec_chips)}${te}
                    ${L.length>0?L.map(Ee=>c`<span
                              class="worker-usage"
                              title=${Ee.tooltip}
                              >${Ee.label}</span
                            >`):I?c`<span
                            class="worker-usage"
                            title=${Mo(e.usage)}
                            >${I}</span
                          >`:""}${me}
                  </div>`:""}
            ${pi(e)} ${ge}
            <!-- 살아있음만 말하는 비의미적 액센트 (UI-58y2 데스크톱 §실행 타일).
         quick_fix landing의 실제 진행은 위의 별도 진행 줄이 소유한다.
         일시정지된 타일은 살아있지 않으므로 액센트도 없다. -->
            ${s||R?"":c`<div class="rtile__accent" aria-hidden="true"></div>`}`}
    ${uv(l,t)}${fv(v)}
  </div>`}function vv(e){let t=e.last_activity&&typeof e.last_activity=="object"?e.last_activity:null,n=Array.isArray(e.legs)?e.legs:[],r=e.dependency_chips||null;return!t&&n.length===0&&!r&&e.kind!=="session"?null:{...t?{last_activity:t}:{},...n.length>0?{legs:n}:{},...r?{dependency_chips:r}:{}}}function mf(e,t=Date.now(),n=null){let r=Array.isArray(e)?e:[];return c`<div class="worker-rungrid" id="worker-rungrid">
    ${r.length===0?c`<div class="worker-rungrid__empty">실행 세션 없음</div>`:r.map(o=>Hl(o,t,n,{monitor:vv(o)}))}
  </div>`}var sn="",kv=["impl_runtime","impl_model","impl_effort"],gf=["claude","codex"],wv=["claude_account","codex_account"],$v=5,oa=1;function On(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function sa(e,t){let n=t.transport,r=typeof t.root_dir=="string"&&t.root_dir.length>0?t.root_dir:null,o=t.notify||(S=>_e(S,"error",4e3)),i={},s={},l={},a={},u=[],d=!1,p={state:"absent",values:{},warnings:[]},_={},m={},v=Promise.resolve(),O=Promise.resolve(),R={claude:null,codex:null},Q=!1,ee=null,K={},L="",I="general",P="",F=!1,G=!1,q=!1,N=null,H=!1;function W(){let S=t.queue?t.queue():null;return On(S)?S:null}function ne(){let S=W();return S?S.runner_catalog:null}function he(){let S=W();return S&&On(S.execution_defaults)?S.execution_defaults:null}function qe(){let S=W();return!!(S&&Object.hasOwn(S,"quick_fix_orchestration_model"))}function B(){let S=t.implPresetStore?.get();return On(S)&&Array.isArray(S.presets)?S:null}function te(){return r===null?{}:{root_dir:r}}async function me(S,j){return H||!n?null:await n(S,j)}function Te(S){S&&On(S.queue)&&t.onQueueAdopt?.(S.queue)}async function C(S,j){let ce=W();if(!ce||H)return null;let Ae=await me(S,{...j,...te(),expected_revision:ce.revision});if(Te(Ae),r!==null&&Ae&&Ae.conflict){let be=Ae.queue&&typeof Ae.queue.revision=="number"?Ae.queue.revision:W()?.revision??ce.revision;Ae=await me(S,{...j,...te(),expected_revision:be}),Te(Ae)}return Ae}async function se(){d=!0,Ne();try{let S=await me("get-session-defaults",{...te()});i=Js(S?.values),s={...i},l={},a={},u=Array.isArray(S?.warnings)?S.warnings:[]}catch(S){u=["kv_read_failed"],o(`\uC138\uC158 \uAE30\uBCF8\uAC12\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4: ${S instanceof Error?S.message:String(S)}`)}finally{d=!1,Ne()}}function ve(S,j){let ce={...j};for(let Ae of qo){let be=s[Ae];be!==S[Ae]&&(typeof be=="string"?ce[Ae]=be:delete ce[Ae])}return ce}function ye(){O=O.then(()=>De())}async function De(){let S=Lu(i,s);if(Object.keys(S).length===0)return;let j={...s};try{let ce=await me("set-session-defaults",{values:S,...te()});i=Js(ce?.values),s=ve(j,i),u=Array.isArray(ce?.warnings)?ce.warnings:[]}catch(ce){o(`\uC138\uC158 \uAE30\uBCF8\uAC12 \uC800\uC7A5 \uC2E4\uD328: ${ce instanceof Error?ce.message:String(ce)}`)}Ne()}function ge(S,j){if(!On(S))return;let ce=S.state;p={state:ce==="usable"||ce==="unusable"||ce==="absent"?ce:"absent",values:On(S.values)?{...S.values}:{},warnings:Array.isArray(S.warnings)?S.warnings:[]},m={...p.values},j&&(_={...m})}async function Re(){try{ge(await me("get-workspace-accounts",{...te()}),!0)}catch(S){p={state:"unusable",values:{},warnings:["kv_read_failed"]},m={},_={},o(`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4: ${S instanceof Error?S.message:String(S)}`)}Ne()}async function Ze(S){try{let j=await fetch(S);if(!j.ok)return null;let ce=await j.json();if(!On(ce)||!Array.isArray(ce.accounts))return null;let Ae=ce.accounts.filter(be=>On(be)&&typeof be.key=="string"&&be.key.length>0&&typeof be.email=="string"&&be.email.length>0);return{accounts:Ae,active:Ae.find(be=>be.active===!0)||null}}catch{return null}}async function ft(){Q=!0;let[S,j]=await Promise.all([Ze("/api/claude-usage"),Ze("/api/codex-usage")]);H||(R={claude:S,codex:j},Ne())}function X(){let S={};for(let j of wv){let ce=Object.hasOwn(_,j)?_[j]:null,Ae=Object.hasOwn(m,j)?m[j]:null;ce!==Ae&&(S[j]=ce)}return S}async function J(){let S=X();if(Object.keys(S).length!==0){try{ge(await me("set-workspace-accounts",{values:S,...te()}),!1)}catch(j){o(`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12 \uC800\uC7A5 \uC2E4\uD328: ${j instanceof Error?j.message:String(j)}`)}Ne()}}function re(S,j){j===sn?delete _[S]:_[S]=j,Ne(),v=v.then(()=>J())}function ae(S,j){if(kv.includes(S)){Qe(S,j);return}j===sn?delete s[S]:s[S]=j,Ne(),ye()}function Ee(S,j){l[S]=j,delete a[S]}function fe(S,j,ce){if(l[S]=j,j.length>0&&!ce(j)){a[S]=!0,Ne();return}delete l[S],delete a[S],j.length===0?delete s[S]:s[S]=j,Ne(),ye()}function Pe(){let S=ht().orchestration_model,j=En({global:{orchestration_model:S??void 0},execution_defaults:he(),runner_catalog:ne()}).orchestration_model.value;return j?Mn(ne(),j):null}function Ue(S,j){typeof j=="string"&&j.length>0?s[S]=j:delete s[S]}function Qe(S,j){let ce=j===sn?void 0:j,Ae=Ou({impl_runtime:S==="impl_runtime"?ce:s.impl_runtime,impl_model:S==="impl_model"?ce:s.impl_model,impl_effort:S==="impl_effort"?ce:s.impl_effort},ne(),Pe());Ue("impl_runtime",Ae.impl_runtime),Ue("impl_model",Ae.impl_model),Ue("impl_effort",Ae.impl_effort),Ne(),ye()}async function ze(){let S=W();if(!S)return;let j={orchestration_model:S.orchestration_model??null,orchestration_effort:S.orchestration_effort??null,orchestration_speed:S.orchestration_speed??null,quick_fix_orchestration_model:S.quick_fix_orchestration_model??null,quick_fix_orchestration_effort:S.quick_fix_orchestration_effort??null,quick_fix_orchestration_speed:S.quick_fix_orchestration_speed??null},ce=Du(j,{...j,...K});if(Object.keys(ce).length!==0){try{let Ae=await C("worker-queue-set-orchestration-defaults",{values:ce});if(Ae&&Ae.applied===!1){o("Worker \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC");return}K={}}catch(Ae){o(`Worker \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${Ae instanceof Error?Ae.message:String(Ae)}`)}Ne()}}function Y(S,j){K[S]=j===sn?null:j,Ne(),ze()}function V(S){if(ee=S,!S){Ne();return}let j=ne(),ce=ht(),Ae=ce.orchestration_model;Ae&&!mo(j,S).includes(Ae)&&(K.orchestration_model=null,Ae=null);let be=ce.orchestration_effort;be&&!ri(j,S,Ae||$n).includes(be)&&(K.orchestration_effort=null),Ne(),ze()}async function xe(S){if(!(!W()||S<oa)){try{await C("worker-queue-set-slots",{slots:S})}catch(j){o(`slots \uC800\uC7A5 \uC2E4\uD328: ${j instanceof Error?j.message:String(j)}`)}Ne()}}async function bt(S){if(!(!W()||S<oa||S>$v)){try{await C("worker-queue-set-serial-lane-count",{count:S})}catch(j){o(`\uC9C1\uB82C \uB808\uC778 \uC800\uC7A5 \uC2E4\uD328: ${j instanceof Error?j.message:String(j)}`)}Ne()}}async function _t(S,j){let ce=S==="auto_advance"?"worker-automation-toggle":S==="auto_merge"?"worker-merge-auto-toggle":"worker-provider-auto-switch-toggle";try{await C(ce,{on:j})}catch(Ae){o(`\uC790\uB3D9\uD654 \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${Ae instanceof Error?Ae.message:String(Ae)}`)}Ne()}function Ke(){let S={},j=ht();for(let ce of fo){let Ae=Pn.includes(ce)?j[ce]:s[ce];typeof Ae=="string"&&Ae.length>0&&(S[ce]=Ae)}return S}async function nt(){let S=B();if(!S)return;let j=Ke();if(Object.keys(j).length===0){o("\uC800\uC7A5\uD560 \uC2E4\uD589 \uC124\uC815\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uBA3C\uC800 \uC2E4\uD589 \uAC12\uC744 \uC120\uD0DD\uD558\uC138\uC694");return}let ce=(S.presets||[]).find(be=>be.id===L),Ae=P.trim()||(ce?ce.name:"");if(!Ae){o("\uD504\uB9AC\uC14B \uC774\uB984\uC744 \uC785\uB825\uD558\uC138\uC694");return}try{let be=ce?await me("impl-preset-update",{expected_revision:S.revision,id:ce.id,name:Ae,settings:j}):await me("impl-preset-create",{expected_revision:S.revision,name:Ae,settings:j});if(be&&be.applied){if(P="",!ce&&Array.isArray(be.presets)){let yt=be.presets.find(wt=>wt.name===Ae);L=yt?yt.id:L}Ne()}else o("\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4"),Ne()}catch(be){o(`\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328: ${be instanceof Error?be.message:String(be)}`)}}async function x(){let S=B();if(!(!S||L.length===0))try{let j=await me("impl-preset-delete",{expected_revision:S.revision,id:L});j&&j.applied?(L="",Ne()):(o("\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328: \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4"),Ne())}catch(j){o(`\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328: ${j instanceof Error?j.message:String(j)}`)}}function Z(S){i=Js(S.values),s={...i},u=Array.isArray(S.warnings)?S.warnings:[],On(S.queue)&&(t.onQueueAdopt?.(S.queue),K={})}async function Oe(S){let j=B(),ce=W();if(!j||!ce||L.length===0||S==="quick_fix"&&!qe())return;let Ae=be=>({preset_id:L,expected_revision:j.revision,expected_queue_revision:be,...S==="quick_fix"?{lane:"quick_fix"}:{},...te()});try{let be=await me("apply-impl-preset-global",Ae(ce.revision));if(S==="quick_fix"&&be&&be.lane!=="quick_fix"){o("\uC11C\uBC84 \uC751\uB2F5\uC5D0 lane\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uD050 \uC2A4\uB0C5\uC0F7\uC744 \uB2E4\uC2DC \uBC1B\uC740 \uB4A4 \uD655\uC778\uD558\uC138\uC694"),Ne();return}if(be&&be.applied&&Z(be),r!==null&&be&&be.queue_applied===!1){let yt=be.queue&&typeof be.queue.revision=="number"?be.queue.revision:W()?.revision??ce.revision;if(be=await me("apply-impl-preset-global",Ae(yt)),S==="quick_fix"&&be&&be.lane!=="quick_fix"){o("\uC11C\uBC84 \uC751\uB2F5\uC5D0 lane\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uD050 \uC2A4\uB0C5\uC0F7\uC744 \uB2E4\uC2DC \uBC1B\uC740 \uB4A4 \uD655\uC778\uD558\uC138\uC694"),Ne();return}be&&be.applied&&Z(be)}be&&be.applied?be.queue_applied===!1&&o("\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uAC12\uC740 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC138\uC694"):be&&be.conflict&&o("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328: \uD504\uB9AC\uC14B\uC774 \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4")}catch(be){o(`\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328: ${be instanceof Error?be.message:String(be)}`)}Ne()}async function Ye(){G=!0,q=!1,Ne();try{let S=await me("get-worker-system-prompt",{});!S||typeof S!="object"||Array.isArray(S)?q=!0:N=S}catch{q=!0}finally{G=!1,Ne()}}function at(){if(F=!F,F&&!N){Ye();return}Ne()}function Fe(){let S=$o({loading:G,error:q});if(S)return S;if(!N)return"";let j=Array.isArray(N.variants)?N.variants:[];return c`<div class="settings-dialog__sp-body">
      ${N.target_base_placeholder?c`<div class="prompt-block__meta">
            \`${N.target_base_placeholder}\`는 디스패치 시점에 해석된
            base로 치환됩니다.
          </div>`:""}
      ${j.map(ce=>c`<div class="settings-dialog__sp-variant" data-variant=${ce.key}>
            <div class="settings-dialog__sp-cond">${ce.condition}</div>
            ${lr(ce.label,ce.system_prompt)}
          </div>`)}
    </div>`}function Je(){return c`<section
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
        aria-expanded=${F?"true":"false"}
        @click=${at}
      >
        ${F?"\uC811\uAE30":"\uC804\uBB38 \uBCF4\uAE30"}
      </button>
      ${F?Fe():""}
    </section>`}function qt(S,j,ce,Ae,be,yt,wt,$t){let xt=be[S]??sn,Gt=Na(S,ce,be,he(),ne(),wt,$t),Ht=Gt.options.find(Et=>Et.value===xt),Ut=xt===sn?Gt.full_value:Ht?.full_value;return c`<select
        class=${xt===sn?"settings-dialog__unset":""}
        data-key=${S}
        aria-label=${j}
        title=${Ut||""}
        ?disabled=${yt===!0||$t!=="quick_fix"&&Gt.disabled}
        .value=${kr(String(xt))}
        @change=${Et=>Ae(S,String(Et.target.value))}
      >
        <option value=${sn} ?selected=${xt===sn}>
          ${Gt.unset_label}
        </option>
        ${Gt.options.map(Et=>c`<option
              value=${Et.value}
              title=${Et.full_value||""}
              ?selected=${Et.value===xt}
            >
              ${Et.label}
            </option>`)}
      </select>
      ${xt===sn?c`<span class="settings-dialog__source-badge">기본</span>`:""}`}function lt(S,j,ce,Ae,be,yt=!1,wt,$t=null,xt=null){return c`<div
      class=${`settings-dialog__row${yt?" settings-dialog__row--off":""}`}
      title=${yt&&xt?xt:""}
    >
      <span class="settings-dialog__row-label">${j}</span>
      <span class="settings-dialog__controls">
        ${qt(S,j,ce,Ae,be,yt,wt,$t)}
      </span>
    </div>`}function At(S,j,ce,Ae,be,yt){let wt=Object.hasOwn(a,S),$t=l[S]??s[S]??sn;return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${j}</span>
      <span class="settings-dialog__controls">
        <input
          type="text"
          class=${`settings-dialog__text${wt?" settings-dialog__text--invalid":""}`}
          data-key=${S}
          aria-label=${j}
          aria-invalid=${String(wt)}
          placeholder=${ce}
          .value=${kr($t)}
          @input=${xt=>Ee(S,String(xt.target.value))}
          @change=${xt=>fe(S,String(xt.target.value).trim(),yt)}
        />
        ${$t.length===0?c`<span class="settings-dialog__source-badge">기본</span>`:""}
        <span class="settings-dialog__hint" data-key-hint=${S}
          >${wt?be:Ae}</span
        >
      </span>
    </div>`}function Bt(S,j,ce,Ae){return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${j}</span>
      <span class="settings-dialog__controls">
        <label class="settings-dialog__check">
          <input
            type="checkbox"
            data-key=${S}
            .checked=${s[S]===No}
            @change=${be=>ae(S,be.target.checked?No:sn)}
          />
          ${ce}
        </label>
        <span class="settings-dialog__hint" data-key-hint=${S}>${Ae}</span>
      </span>
    </div>`}function Pt(S,j){let ce=j?j.active:null;return On(ce)?`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(${S==="claude"?ce.email:Ao({...ce,alias:null})})`:"\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(\uD655\uC778 \uBD88\uAC00)"}function Nt(S,j,ce){let Ae=R[ce],be=Object.hasOwn(_,S)?_[S]:sn,yt=ce==="claude"?Vi:Ao,wt=!!Ae?.accounts.some($t=>$t.key===be);return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${j}</span>
      <span class="settings-dialog__controls">
        <select
          aria-label=${j}
          data-account-key=${S}
          @change=${$t=>re(S,String($t.target.value))}
        >
          <option value=${sn} ?selected=${be.length===0}>
            ${Pt(ce,Ae)}
          </option>
          ${be.length>0&&!wt?c`<option value=${be} selected>
                ${be} (목록에 없음)
              </option>`:""}
          ${Ae?.accounts.map($t=>c`<option value=${$t.key} ?selected=${$t.key===be}>
                ${yt($t)}
              </option>`)||""}
        </select>
        ${Ae?"":c`<span class="settings-dialog__hint"
              >계정 목록을 불러올 수 없습니다</span
            >`}
      </span>
    </div>`}function ue(){let S=p.warnings.join(", ");return p.state==="unusable"?`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12\uC744 \uD574\uC11D\uD560 \uC218 \uC5C6\uC5B4 \uC774 \uB808\uD3EC\uC758 \uB514\uC2A4\uD328\uCE58\uAC00 \uAC70\uBD80\uB429\uB2C8\uB2E4 \u2014 ${S} \xB7 \uACC4\uC815\uC744 \uB2E4\uC2DC \uACE0\uB974\uBA74 \uD574\uC18C\uB429\uB2C8\uB2E4`:p.warnings.length>0?`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12\uC5D0 \uC54C \uC218 \uC5C6\uB294 \uD0A4\uAC00 \uC788\uC2B5\uB2C8\uB2E4 \u2014 ${S}`:null}function ke(S,j,ce,Ae,be,yt){return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">
        <i
          class="settings-dialog__stage-dot"
          style=${`background: var(--stage-${j}-on)`}
        ></i>
        ${S}
      </span>
      <span class="settings-dialog__controls">
        ${qt(ce,`${S} \uBAA8\uB378`,Ae,ae,s,!1)}
        ${qt(be,`${S} effort`,ni,ae,s,!1)}
        ${qt(yt,`${S} \uC18D\uB3C4`,Eu,ae,s,!1)}
      </span>
    </div>`}function Ge(S,j,ce,Ae){return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${j}</span>
      <span class="settings-dialog__controls">
        <button
          type="button"
          class=${`settings-dialog__toggle${Ae?" is-on":""}`}
          data-automation=${S}
          aria-pressed=${Ae?"true":"false"}
          aria-label=${j}
          @click=${()=>_t(S,!Ae)}
        >
          ${Ae?"\uCF1C\uC9D0":"\uAEBC\uC9D0"}
        </button>
        <span class="settings-dialog__hint">${ce}</span>
      </span>
    </div>`}function rt(S,j,ce,Ae){return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${j}</span>
      <span class="settings-dialog__controls">
        <span class="settings-dialog__stepper" data-stepper=${S}>
          <button
            type="button"
            aria-label=${`${j} \uAC10\uC18C`}
            @click=${()=>Ae(ce-1)}
          >
            −
          </button>
          <span class="settings-dialog__stepper-value">${ce}</span>
          <button
            type="button"
            aria-label=${`${j} \uC99D\uAC00`}
            @click=${()=>Ae(ce+1)}
          >
            +
          </button>
        </span>
      </span>
    </div>`}function et(S,j){return c`<div class="settings-dialog__preset-diff" data-preset-diff>
      <div class="settings-dialog__preset-diff-head">
        ${S.rows.length>0?`\uBCC0\uACBD ${S.rows.length}\uAC1C \xB7 \uC801\uC6A9\uD558\uBA74 \uC544\uB798\uC640 \uAC19\uC774 \uBC14\uB01D\uB2C8\uB2E4`:"\uD604\uC7AC \uC124\uC815\uACFC \uAC19\uC2B5\uB2C8\uB2E4 \u2014 \uC801\uC6A9\uD560 \uBCC0\uACBD\uC774 \uC5C6\uC2B5\uB2C8\uB2E4"}
      </div>
      ${S.rows.map(ce=>c`<div
            class="settings-dialog__preset-diff-row"
            data-diff-kind=${ce.kind}
          >
            <span class="settings-dialog__preset-diff-label">${ce.label}</span>
            <span class="settings-dialog__preset-diff-value"
              >${ce.before??"\uAE30\uBCF8"}</span
            >
            <span class="settings-dialog__preset-diff-arrow">→</span>
            <span
              class="settings-dialog__preset-diff-value settings-dialog__preset-diff-after"
              >${ce.after??(j==="quick_fix"?"\uAE30\uBCF8(\uD574\uC81C \u2192 \uC77C\uBC18 \uD504\uB85C\uD30C\uC77C)":"\uAE30\uBCF8(\uD574\uC81C)")}</span
            >
          </div>`)}
      ${S.ignored_keys.length>0?c`<div class="settings-dialog__preset-diff-note">
            ${S.ignored_keys.join(", ")}은(는)
            ${j==="quick_fix"?"quick_fix \uB808\uC778":"\uC804\uC5ED"} 적용이 쓰지 않는
            키라 무시됩니다
          </div>`:""}
    </div>`}function ht(){let S=W(),j={};for(let ce of[...Pn,...po])j[ce]=Object.prototype.hasOwnProperty.call(K,ce)?K[ce]:S&&typeof S[ce]=="string"?S[ce]:null;return j}function je(){let S=ht(),j={};for(let ce of po)j[ce]=S[ce]??null;for(let ce of["quick_fix_impl_dispatch","quick_fix_impl_runtime","quick_fix_impl_model","quick_fix_impl_effort","quick_fix_impl_speed"])j[ce]=s[ce]??null;return j}function tt(){let S=ne(),j=s.impl_runtime,ce=s.impl_model,Ae=B(),be=W(),yt=ht(),wt=mo(S,ee),$t=_o(S,void 0).filter(b=>b!==$n),xt=Pr(S,void 0,void 0),Gt=ri(S,ee,yt.orchestration_model||$n).filter(b=>b!==$n),Ht=L?(Ae?.presets||[]).find(b=>b.id===L):null,Ut=Ht?Ru(Ke(),On(Ht.settings)?Ht.settings:{}):null,Et={quick_fix_orchestration_model:mo(S,null),quick_fix_orchestration_effort:ri(S,null,null).filter(b=>b!==$n),quick_fix_orchestration_speed:Yn,quick_fix_impl_dispatch:jo,quick_fix_impl_runtime:gf,quick_fix_impl_model:$t,quick_fix_impl_effort:xt,quick_fix_impl_speed:Yn},rn=Ht?Iu(je(),On(Ht.settings)?Ht.settings:{},Et):null,tn=I==="quick_fix"?rn:Ut,Wt=qe(),Ot=Wt?null:"\uC11C\uBC84\uAC00 quick_fix \uB808\uC778\uC744 \uC9C0\uC6D0\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4",Qt={...s,...yt},we=be&&typeof be.slots=="number"?be.slots:oa+1,T=be&&typeof be.serial_lane_count=="number"?be.serial_lane_count:oa,pe=he()?.supported===!0,Le=ue(),y=Na("workflow_mode",Fo,s,he(),S);return c`
      ${u.length>0?c`<div class="settings-dialog__banner" role="alert">
            워크스페이스 기본값을 일부 읽지 못했습니다 —
            ${u.join(", ")}
          </div>`:""}
      ${Le?c`<div
            class="settings-dialog__banner"
            data-account-warning
            role="alert"
          >
            ${Le}
          </div>`:""}
      ${pe?"":c`<div
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
                .value=${kr(L)}
                @change=${b=>{L=String(b.target.value),Ne()}}
              >
                <option value="" ?selected=${L===""}>
                  실행 프리셋…
                </option>
                ${(Ae?.presets||[]).map(b=>c`<option
                      value=${b.id}
                      ?selected=${b.id===L}
                    >
                      ${b.name}
                    </option>`)}
              </select>
              <button
                type="button"
                class="settings-dialog__btn settings-dialog__btn--primary op-btn"
                data-preset-apply-global
                data-preset-apply-general
                ?disabled=${!Ut||Ut.rows.length===0}
                @click=${()=>Oe("general")}
              >
                일반에 적용
              </button>
              <button
                type="button"
                class="settings-dialog__btn op-btn"
                data-preset-apply-quick-fix
                title=${Ot||""}
                ?disabled=${!Wt||!rn||rn.rows.length===0}
                @click=${()=>Oe("quick_fix")}
              >
                quick_fix 레인에 적용
              </button>
              <input
                type="text"
                class="settings-dialog__preset-name"
                placeholder=${L?"\uC774\uB984 (\uBE44\uC6B0\uBA74 \uC720\uC9C0)":"\uC0C8 \uD504\uB9AC\uC14B \uC774\uB984"}
                aria-label="프리셋 이름"
                .value=${kr(P)}
                @input=${b=>{P=String(b.target.value)}}
              />
              <button
                type="button"
                class="settings-dialog__btn"
                data-preset-save
                title=${L?"\uD604\uC7AC \uD654\uBA74\uC758 \uC2E4\uD589 \uC124\uC815\uC744 \uC774 \uD504\uB9AC\uC14B\uC5D0 \uC800\uC7A5\uD569\uB2C8\uB2E4 (\uD504\uB9AC\uC14B \u2192 \uC124\uC815 \uBC29\uD5A5\uC774 \uC544\uB2D8)":"\uD604\uC7AC \uD654\uBA74\uC758 \uC2E4\uD589 \uC124\uC815\uC744 \uC0C8 \uD504\uB9AC\uC14B\uC73C\uB85C \uC800\uC7A5\uD569\uB2C8\uB2E4"}
                @click=${nt}
              >
                ${L?"\uD604\uC7AC \uC124\uC815\uC73C\uB85C \uB36E\uC5B4\uC4F0\uAE30":"\uC0C8 \uD504\uB9AC\uC14B \uC800\uC7A5"}
              </button>
              <button
                type="button"
                class="settings-dialog__btn"
                data-preset-delete
                ?disabled=${L.length===0}
                @click=${x}
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
                aria-pressed=${String(I==="general")}
                @click=${()=>{I="general",Ne()}}
              >
                일반
              </button>
              <button
                type="button"
                data-preset-lane="quick_fix"
                aria-pressed=${String(I==="quick_fix")}
                @click=${()=>{I="quick_fix",Ne()}}
              >
                quick_fix
              </button>
            </div>
            ${tn?et(tn,I):""}

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">오케스트레이션</div>
              <div class="settings-dialog__row">
                <span class="settings-dialog__row-label">런타임</span>
                <span class="settings-dialog__controls">
                  <select
                    aria-label="런타임"
                    data-key="orchestration_runtime_filter"
                    .value=${kr(ee||sn)}
                    @change=${b=>{let M=String(b.target.value);V(M===sn?null:M)}}
                  >
                    <option value=${sn} ?selected=${!ee}>
                      전체
                    </option>
                    <option
                      value="claude"
                      ?selected=${ee==="claude"}
                    >
                      claude
                    </option>
                    <option
                      value="codex"
                      ?selected=${ee==="codex"}
                    >
                      codex
                    </option>
                  </select>
                  <span class="settings-dialog__hint"
                    >모델 목록을 좁힙니다</span
                  >
                </span>
              </div>
              ${lt("orchestration_model","\uBAA8\uB378",wt,Y,yt)}
              ${lt("orchestration_effort","effort",Gt,Y,yt)}
              ${lt("orchestration_speed","\uC18D\uB3C4",Yn,Y,yt)}
            </div>

            <div class="settings-dialog__group" data-exec-accounts-group>
              <div class="settings-dialog__group-title">실행 계정</div>
              ${Nt("claude_account","Claude","claude")}
              ${Nt("codex_account","Codex","codex")}
              <div class="settings-dialog__row">
                <span class="settings-dialog__row-label">한도 대응</span>
                <span class="settings-dialog__controls">
                  <label class="settings-dialog__check">
                    <input
                      type="checkbox"
                      data-provider-auto-switch
                      .checked=${be?.provider_auto_switch!==!1}
                      @change=${b=>_t("provider_auto_switch",b.target.checked)}
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
                      data-mode=${sn}
                      aria-pressed=${String(!s.workflow_mode)}
                      @click=${()=>ae("workflow_mode",sn)}
                    >
                      ${y.unset_label}
                    </button>
                    ${s.workflow_mode?"":c`<span class="settings-dialog__source-badge"
                          >기본</span
                        >`}
                    ${Fo.map(b=>c`<button
                          type="button"
                          data-mode=${b}
                          aria-pressed=${String(s.workflow_mode===b)}
                          @click=${()=>ae("workflow_mode",b)}
                        >
                          ${b}
                        </button>`)}
                  </span>
                </span>
              </div>
              ${At("bdui_url","beads-ui \uC8FC\uC18C","http://\uD638\uC2A4\uD2B8:3000","\uC138\uC158\uC774 Worker \uB808\uC778 \uBC30\uCE58\uB97C \uBB3C\uC5B4\uBCFC \uB54C \uC4F0\uB294 \uC8FC\uC18C\uC785\uB2C8\uB2E4","http:// \uB610\uB294 https:// \uB85C \uC2DC\uC791\uD558\uB294 \uC8FC\uC18C\uB9CC \uC800\uC7A5\uB429\uB2C8\uB2E4 (\uACBD\uB85C \uC5C6\uC774)",Su)}
              ${Bt("base_sync_accept_local_commits","base \uB3D9\uAE30\uD654","\uB85C\uCEEC base \uC0AC\uC6A9\uC790 \uCEE4\uBC0B \uC790\uB3D9 rebase+push","\uAEBC\uB450\uBA74 \uB85C\uCEEC base \uCCB4\uD06C\uC544\uC6C3\uC758 \uC0AC\uC6A9\uC790 \uCEE4\uBC0B\uC740 \uADF8\uB300\uB85C \uB0A8\uC2B5\uB2C8\uB2E4")}
            </div>

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">
                리뷰 게이트
                <span class="settings-dialog__hint">모델 · effort · 속도</span>
              </div>
              ${ke("\uC0AC\uC591 \uB9AC\uBDF0","spec","spec_review_model",Bo,"spec_review_effort","spec_review_speed")}
              ${ke("\uACC4\uD68D \uB9AC\uBDF0","plan","plan_review_model",ti,"plan_review_effort","plan_review_speed")}
              ${ke("\uAD6C\uD604 \uB9AC\uBDF0","impl","impl_review_model",Bo,"impl_review_effort","impl_review_speed")}
            </div>

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">
                구현
                <span class="settings-dialog__hint"
                  >이슈 핀이 있으면 핀이 우선합니다</span
                >
              </div>
              ${lt("impl_runtime","\uC704\uC784 \uB300\uC0C1",ei,ae,s)}
              ${lt("impl_model","\uBAA8\uB378",_o(S,j),ae,s)}
              ${lt("impl_effort","effort",Pr(S,j,ce),ae,s)}
              ${lt("impl_speed","\uC18D\uB3C4",Yn,ae,s)}
            </div>

            <div
              class="settings-dialog__group"
              data-quick-fix-group
              title=${Ot||""}
            >
              <div class="settings-dialog__group-title">
                quick_fix 레인
                <span class="settings-dialog__hint"
                  >${"\uBE44\uC5B4 \uC788\uB294 \uAC12\uC740 \uC77C\uBC18 \uD504\uB85C\uD30C\uC77C\uB85C \uB5A8\uC5B4\uC9D1\uB2C8\uB2E4. \uC774\uC288 \uD540\uC774 \uC788\uC73C\uBA74 \uD540\uC774 \uC6B0\uC120\uD569\uB2C8\uB2E4."}</span
                >
              </div>
              ${lt("quick_fix_orchestration_model","\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uBAA8\uB378",Et.quick_fix_orchestration_model,Y,yt,!Wt,Qt,"quick_fix",Ot)}
              ${lt("quick_fix_orchestration_effort","\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 effort",Et.quick_fix_orchestration_effort,Y,yt,!Wt,Qt,"quick_fix",Ot)}
              ${lt("quick_fix_orchestration_speed","\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uC18D\uB3C4",Yn,Y,yt,!Wt,Qt,"quick_fix",Ot)}
              ${lt("quick_fix_impl_dispatch","\uC2E4\uD589 \uBC29\uC2DD",jo,ae,s,!Wt,Qt,"quick_fix",Ot)}
              ${lt("quick_fix_impl_runtime","\uC704\uC784 \uB300\uC0C1",gf,ae,s,!Wt,Qt,"quick_fix",Ot)}
              ${lt("quick_fix_impl_model","\uBAA8\uB378",$t,ae,s,!Wt,Qt,"quick_fix",Ot)}
              ${lt("quick_fix_impl_effort","effort",xt,ae,s,!Wt,Qt,"quick_fix",Ot)}
              ${lt("quick_fix_impl_speed","\uC18D\uB3C4",Yn,ae,s,!Wt,Qt,"quick_fix",Ot)}
            </div>

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">
                자동화
                <span class="settings-dialog__hint"
                  >이 레포의 워커 큐가 스스로 진행하는 범위</span
                >
              </div>
              ${Ge("auto_advance","\uC790\uB3D9\uD654","\uC2AC\uB86F\uC774 \uBE44\uBA74 \uB300\uAE30 \uC55E \uD589\uC774 \uCD9C\uBC1C\uD569\uB2C8\uB2E4",be?.auto_advance===!0)}
              ${Ge("auto_merge","\uBA38\uC9C0","\uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4",be?.auto_merge===!0)}
              ${rt("slots","\uB3D9\uC2DC \uC2E4\uD589",we,b=>xe(b))}
              ${rt("serial-lane-count","\uC9C1\uB82C \uB808\uC778",T,b=>bt(b))}
            </div>
            ${Je()}
          `}
    `}function Ne(){H||mt(tt(),e)}return{load(){K={},I="general",l={},a={};let S=[se(),Re()];return Q||S.push(ft()),Promise.all(S).then(()=>{})},render:Ne,sessionDraft:()=>({...s}),destroy(){H=!0,mt(c``,e)}}}function ia(e){return c`<svg
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
  </svg>`}function hf(){return ia(Ro`<path d="M5.5 3.6 12 8l-6.5 4.4z" />`)}function bf(){return ia(Ro`<path d="M6 3.8v8.4M10 3.8v8.4" />`)}function yf(){return ia(Ro`<path
      d="M4.6 5.6v4.8M4.6 8.2h2.2A3.2 3.2 0 0 0 10 5"
    />
    <circle cx="4.6" cy="4" r="1.5" />
    <circle cx="4.6" cy="12" r="1.5" />
    <circle cx="11.4" cy="4" r="1.5" />`)}function vf(){return ia(Ro`<circle cx="8" cy="8" r="2.1" />
    <path
      d="M8 1.9v1.8M8 12.3v1.8M1.9 8h1.8M12.3 8h1.8M3.7 3.7l1.3 1.3M11 11l1.3 1.3M12.3 3.7 11 5M5 11l-1.3 1.3"
    />`)}function kf(e){return`${e} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}function wf(e){let t=(Array.isArray(e)?e:[]).map(l=>l&&l.usage).filter(l=>l&&typeof l=="object"&&"providers"in l);if(t.length>0)return un(Xs(t));let n={};for(let l of Gn)n[l]=0;let r=!1,o=0,i=0,s=0;for(let l of Array.isArray(e)?e:[]){let a=l&&l.usage;if(a&&typeof a=="object"){let u=!1;for(let d of Gn){let p=a[d];typeof p=="number"&&Number.isFinite(p)&&(n[d]+=p,r=!0,u=!0)}if(u){i+=1;let d=a.total_cost_usd;typeof d=="number"&&Number.isFinite(d)&&(o+=d,s+=1)}}}return i>0&&s===i&&(n.total_cost_usd=o),r?tr(n):null}function Un(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function Kl(e,t){let n=Un(e?.counts)?e.counts:null,r=n?n[t]:null;return typeof r=="number"&&Number.isFinite(r)?r:0}function xv(e,t){if(!Un(t))return e;let n={...e};for(let[r,o]of Object.entries(t))o!==void 0&&(n[r]=o);return n}function Av(e){if(!Un(e)||!Un(e.execution_defaults)||!Un(e.runner_catalog)||!Un(e.session_defaults))return null;let t={...e.session_defaults};for(let s of["orchestration_model","orchestration_effort","orchestration_speed"])typeof e[s]=="string"&&e[s].length>0&&(t[s]=e[s]);let n=En({global:t,execution_defaults:e.execution_defaults,runner_catalog:e.runner_catalog}),r=Mn(e.runner_catalog,n.orchestration_model.value??""),o=go(n,e.runner_catalog),i=Mr(n,r);return o===null&&i===null?null:{orchestration:o,worker:i}}function $f(e,t){let n=t.notify||(C=>_e(C,"error",4e3)),r=document.createElement("div");r.className="mon2-deck__main",e.appendChild(r);let o=document.createElement("div");o.className="mon2-deck__panel",o.hidden=!0;let i=document.createElement("div");i.className="mon2-deck__panel-hd";let s=document.createElement("span");s.className="mon2-deck__panel-title";let l=document.createElement("button");l.type="button",l.className="mon2-deck__panel-close",l.setAttribute("aria-label","\uC2E4\uD589 \uC124\uC815 \uB2EB\uAE30"),l.textContent="\u2715",i.append(s,l);let a=document.createElement("div");a.className="mon2-deck__panel-body",o.append(i,a),e.appendChild(o);let u=null,d=null,p=null,_=new Map;function m(){let C=t.workspacesState?t.workspacesState():[];return Array.isArray(C)?C.filter(se=>Un(se)):[]}function v(C){return m().find(se=>se.root_dir===C)||null}function O(C){return xv(v(C),_.get(C))}function R(){for(let C of m()){let se=_.get(C.root_dir);se&&typeof se.revision=="number"&&typeof C.revision=="number"&&C.revision>=se.revision&&_.delete(C.root_dir)}}async function Q(C,se,ve){let ye=t.transport,De=O(se);if(!(!ye||!Un(De))){try{let ge=await ye(C,{...ve,root_dir:se,expected_revision:De.revision});if(Un(ge?.queue)&&_.set(se,ge.queue),ge&&ge.conflict){let Re=Un(ge.queue)&&typeof ge.queue.revision=="number"?ge.queue.revision:O(se)?.revision;ge=await ye(C,{...ve,root_dir:se,expected_revision:Re}),Un(ge?.queue)&&_.set(se,ge.queue)}}catch(ge){n(`\uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${ge instanceof Error?ge.message:String(ge)}`)}te()}}function ee(C){u!==C&&(u=C,t.onFocusChange?.(u),te())}function K(C){ee(u===C?null:C)}function L(C){if(d===C){P();return}I(),d=C;let se=v(C);s.textContent=`${se?.name||C} \uC2E4\uD589 \uC124\uC815 \xB7 Worker \uD0ED \u2699 \uC2E4\uD589 \uD0ED\uACFC \uAC19\uC740 \uC800\uC7A5\uC18C`,o.hidden=!1,p=sa(a,{root_dir:C,queue:()=>O(C),transport:t.transport,implPresetStore:t.implPresetStore,notify:n,onQueueAdopt:ve=>{_.set(C,ve),te()}}),p.load(),te()}function I(){p?.destroy(),p=null}function P(C){I(),d=null,o.hidden=!0,s.textContent="",C!==!0&&te()}let F=()=>P();l.addEventListener("click",F);function G(C){C.key==="Escape"&&u!==null&&ee(null)}document.addEventListener("keydown",G);function q(C,se){let ve=Math.max(se,C,1);return c`<span
      class="mon2-deck__rail"
      role="img"
      aria-label=${`\uC2AC\uB86F ${se}\uAC1C \uC911 ${C}\uAC1C \uC2E4\uD589 \uC911`}
    >
      ${Array.from({length:ve},(ye,De)=>De<C?c`<i class="mon2-deck__slot is-run"></i>`:c`<i class="mon2-deck__slot"></i>`)}
    </span>`}function N(C){let se=C.auto_advance===!0,ve=C.auto_merge===!0;return c`<button
        type="button"
        class=${`mon2-deck__op mon2-deck__auto${se?" is-on":""}`}
        data-act="auto"
        aria-pressed=${se?"true":"false"}
        aria-label=${`${C.name} \uC790\uB3D9\uD654`}
        title=${se?"\uC790\uB3D9\uD654 \uCF1C\uC9D0 \u2014 \uC2AC\uB86F\uC774 \uBE44\uBA74 \uB2E4\uC74C \uD589\uC774 \uCD9C\uBC1C\uD569\uB2C8\uB2E4":"\uC790\uB3D9\uD654 \uAEBC\uC9D0 \u2014 \uB2E4\uC74C \uD589\uC740 \uC218\uB3D9\uC73C\uB85C\uB9CC \uCD9C\uBC1C\uD569\uB2C8\uB2E4"}
      >
        ${se?bf():hf()}
      </button>
      <button
        type="button"
        class=${`mon2-deck__op mon2-deck__merge${ve?" is-on":""}`}
        data-act="merge"
        aria-pressed=${ve?"true":"false"}
        aria-label=${`${C.name} \uC790\uB3D9 \uBA38\uC9C0`}
        title=${ve?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0"}
      >
        ${yf()}
      </button>
      <button
        type="button"
        class=${`mon2-deck__op mon2-deck__gear${d===C.root_dir?" is-on":""}`}
        data-act="gear"
        aria-expanded=${d===C.root_dir?"true":"false"}
        aria-label=${`${C.name} \uC2E4\uD589 \uC124\uC815`}
        title="이 레포의 실행 설정"
      >
        ${vf()}
      </button>`}function H(C){let se=Av(C);return se?c`<div class="mon2-deck__chips">
      ${se.orchestration?c`<span class="mon2-deck__chip" title=${se.orchestration.title}
            >오케 ${se.orchestration.text}</span
          >`:""}
      ${se.worker?c`<span class="mon2-deck__chip" title=${se.worker.title}
            >워커 ${se.worker.text}</span
          >`:""}
    </div>`:""}function W(C){let se=[];for(let[ve,ye]of[["queue","\uB300\uAE30"],["pr_wait","PR"],["session_active","\uC138\uC158"]]){let De=Kl(C,ve);De>0&&se.push(`${ye} ${De}`)}return se.join(" \xB7 ")}function ne(C){let se=Kl(C,"running"),ve=typeof C.slots=="number"?C.slots:1;return c`<div
      class=${`mon2-deck__tile${u===C.root_dir?" is-focus":""}`}
      role="button"
      tabindex="0"
      data-root-dir=${C.root_dir}
      aria-pressed=${u===C.root_dir?"true":"false"}
      title="클릭하면 이 레포만 선명하게 봅니다 (Esc로 해제)"
    >
      <div class="mon2-deck__tile-hd">
        <span class="mon2-deck__name" title=${C.root_dir}>${C.name}</span>
        <span
          class="mon2-deck__load"
          title=${`\uC2AC\uB86F ${ve}\uAC1C \uC911 ${se}\uAC1C \uC2E4\uD589 \uC911`}
        >
          <span class="mon2-deck__load-n">${se}/${ve}</span>
          ${q(se,ve)}
        </span>
        <button
          type="button"
          class="mon2-deck__worker"
          data-act="worker"
          aria-label=${`${C.name} Worker \uD0ED\uC73C\uB85C \uC774\uB3D9`}
          title="이 레포의 Worker 탭으로 이동"
        >
          ↗
        </button>
      </div>
      <div class="mon2-deck__tile-ft">
        <div class="mon2-deck__ops">${N(C)}</div>
        <span class="mon2-deck__counts">${W(C)}</span>
        ${H(C)}
      </div>
    </div>`}function he(C){let se=t.doneItems?t.doneItems():[],ve=t.rangeLabel?t.rangeLabel():"",ye=wf(Array.isArray(se)?se:[]),De=ge=>C.reduce((Re,Ze)=>Re+Kl(Ze,ge),0);return c`<div class="mon2-deck__bar">
      <span
        class="mon2-deck__total-counts"
        title=${`visible \uB808\uD3EC ${C.length}\uACF3\uC758 \uD569\uACC4\uC785\uB2C8\uB2E4 \u2014 \uC2E4\uD589\xB7\uB300\uAE30\xB7PR\uC740 \uC9C0\uAE08, \uC644\uB8CC\uB294 ${ve}`}
        >실행 ${De("running")} · 대기 ${De("queue")} · PR
        ${De("pr_wait")}${De("session_active")>0?` \xB7 \uC138\uC158 ${De("session_active")}`:""}
        · ${ve} 완료
        ${Array.isArray(se)?se.length:0}</span
      >
      ${ye===null?"":c`<span class="mon2-deck__total-tokens">
            ${typeof ye=="string"?c`<span
                  class="mon2-deck__tok"
                  title=${kf(ve)}
                  >${ye}</span
                >`:ye.map(ge=>c`<span
                      class="mon2-deck__tok"
                      data-provider=${ge.provider}
                      title=${ge.tooltip}
                      >${ge.label}</span
                    >`)}
          </span>`}
    </div>`}function qe(){let C=m();return C.length===0?"":c`${he(C)}
      <div class="mon2-deck__strip">
        ${C.map(se=>ne(se))}
      </div>`}function B(){u!==null&&!v(u)&&(u=null,t.onFocusChange?.(null))}function te(){R(),B(),d!==null&&!v(d)&&P(!0),mt(qe(),r),p?.render()}function me(C){let se=C.target;if(!se||typeof se.closest!="function")return;let ve=se.closest("[data-root-dir]");if(!ve)return;let ye=ve.getAttribute("data-root-dir")||"",De=se.closest("[data-act]")?.getAttribute("data-act");if(De==="worker"){t.gotoWorkerTab?.(ye);return}if(De==="auto"){Q("worker-automation-toggle",ye,{on:O(ye)?.auto_advance!==!0});return}if(De==="merge"){Q("worker-merge-auto-toggle",ye,{on:O(ye)?.auto_merge!==!0});return}if(De==="gear"){L(ye);return}K(ye)}function Te(C){if(C.key!=="Enter"&&C.key!==" ")return;let se=C.target;if(!se||typeof se.closest!="function")return;let ve=se.closest('[data-root-dir][role="button"]');!ve||ve!==se||(C.preventDefault(),K(ve.getAttribute("data-root-dir")||""))}return r.addEventListener("click",me),r.addEventListener("keydown",Te),{render:te,focusRoot:()=>u,panelRoot:()=>d,destroy(){document.removeEventListener("keydown",G),r.removeEventListener("click",me),r.removeEventListener("keydown",Te),l.removeEventListener("click",F),I(),mt(c``,r),e.replaceChildren()}}}var Sv=1e4,Ef="bdui.monitor.done-range",Tf="bdui.monitor.running_sort",Cf="bdui.monitor.candidate_sort",Of="beads-ui.monitor.candidate-filter",Rf="beads-ui.monitor.sections";function Ev(){try{let e=window.localStorage.getItem(Of);if(!e)return{...vo};let t=JSON.parse(e);return!t||typeof t!="object"?{...vo}:{show_blocked:typeof t.show_blocked=="boolean"?t.show_blocked:vo.show_blocked,readiness:ns.some(n=>n.value===t.readiness)?t.readiness:"all"}}catch{return{...vo}}}function xf(e){try{window.localStorage.setItem(Of,JSON.stringify({show_blocked:e.show_blocked,readiness:e.readiness}))}catch{}}function Tv(){try{let e=window.localStorage.getItem(Cf);return ts.some(t=>t.value===e)?e:"repo_spec"}catch{return"repo_spec"}}function Cv(e){try{window.localStorage.setItem(Cf,e)}catch{}}function Ov(){try{let e=window.localStorage.getItem(Rf);if(!e)return{};let t=JSON.parse(e);return t&&typeof t=="object"?t:{}}catch{return{}}}function Rv(e){try{window.localStorage.setItem(Rf,JSON.stringify(e))}catch{}}function Iv(){try{let e=window.localStorage.getItem(Ef);return e===null?"today":Hn(e)}catch{return"today"}}function Lv(e){try{window.localStorage.setItem(Ef,e)}catch{}}function Dv(){try{return window.localStorage.getItem(Tf)==="repo"?"repo":"started"}catch{return"started"}}function Pv(e){try{window.localStorage.setItem(Tf,e)}catch{}}var If="tab:monitor:pipeline",Mv=1e3,Af=[{lane:"runnable",pane:"candidate",title:"\uD6C4\uBCF4",empty:"\uC2E4\uD589 \uC790\uACA9\uC744 \uAC16\uCD98 \uC774\uC288 \uC5C6\uC74C"},{lane:"queue",pane:"queue",title:"\uB300\uAE30",empty:"\uD45C\uC2DC\uD560 \uB808\uD3EC \uC5C6\uC74C"},{lane:"running",pane:"running",title:"\uC2E4\uD589 \uC911",empty:"\uC2E4\uD589 \uC911 \uC5C6\uC74C"},{lane:"pr_wait",pane:"pr_wait",title:"PR \uB300\uAE30",empty:"PR \uC5C6\uC74C"},{lane:"done",pane:"done",title:"\uC644\uB8CC",empty:"\uC644\uB8CC \uAE30\uB85D \uC5C6\uC74C"}],qv=["queue","runnable","done"],Sf="\u2460\u2461\u2462\u2463\u2464\u2465\u2466\u2467\u2468\u2469\u246A\u246B\u246C\u246D\u246E\u246F\u2470\u2471\u2472\u2473";function Nv(e){return e>=1&&e<=Sf.length?Sf[e-1]:`(${e})`}function Lf(e,t){let n=Kt("views:monitor"),r=t.gotoIssue,o=t.pipelineStore,i=t.transport,s=t.getWorkspacePath,l=t.openDoc,a=t.switchWorkspace,u=t.router,d=t.now||(()=>Date.now()),p=t.confirm||(y=>typeof globalThis.confirm!="function"||globalThis.confirm(y)),_=Iv(),m=Dv(),v=Ev(),O=Tv(),R=Ov(),Q=Ji("beads-ui.monitor.lane-collapsed"),ee=!1,K=null,L=null,I=null,P=null,F=co(()=>je()),G=null,q=null,N=null,H=null;function W(y){return H===null&&(H=X()),qd(y,H)}function ne(y,b){he(),!(b<=0)&&(q={lane_id:y,corrected:b},N=setTimeout(()=>{N=null,q=null,je()},Sv))}function he(){N!==null&&(clearTimeout(N),N=null),q=null}function qe(){let y=Qr.find(b=>b.value===_);return y?y.label:""}let B=document.createElement("div");B.className="mon",e.appendChild(B);let te=document.createElement("div");te.className="worker-drawer-overlay",te.hidden=!0;let me=document.createElement("div");me.className="worker-drawer-overlay__backdrop";let Te=document.createElement("div");Te.className="worker-drawer-host mon2-drawer",te.append(me,Te),e.appendChild(te);let C=yr(null,null),se=new Map,ve=new Map,ye=null,De=null,ge=null,Re=xo(Te,{transport:i,sessionLogStore:t.sessionLogStore,onClose:()=>{L=null,te.hidden=!0,je()}}),Ze=ta({transport:i,console_el:B,getLanes:()=>C,getWorkspaces:()=>o&&o.get?o.get():null,getCrossLanes:wt,reproject:y=>({lanes:ht(y),raw_lanes:y}),onCorrection:ne,showToast:_e,requestRender:()=>je(),adoptQueue:(y,b)=>{ve.set(y,b)},onDragBegin:()=>{I=null},candidate_drop:!0}),{applyDrop:ft,dropModel:X,runPlanned:J,sendQueueCas:re}=Ze;async function ae(y,b,M,f,k=!0){if(!i||!M)return null;let U=await i(y,{...b,root_dir:M,expected_revision:f});if(U&&U.conflict&&k){U.queue&&ve.set(M,U.queue);let ie=U.queue&&typeof U.queue.revision=="number"?U.queue.revision:f;U=await i(y,{...b,root_dir:M,expected_revision:ie})}return U&&U.queue&&M&&ve.set(M,U.queue),U}function Ee(y,b){let M=ve.get(y),f=o&&o.get?o.get():null,k=(Array.isArray(f)?f:[]).find(ie=>ie?.root_dir===y);return(M||k)?.merge_queue?.find(ie=>ie.bead_id===b)?.continuation_action}async function fe(y,b,M,f){let k=await ae(y,b,M,f),U=ve.get(M)?.revision??k?.queue?.revision??f;return _r(k,(ie,le)=>ae(y,{...b,continuation:ie,decision_token:le},M,U,!1),{refresh:ie=>ae(y,b,M,ie?.queue?.revision??ve.get(M)?.revision??U,!1)})}async function Pe(y,b,M,f){let k=await _r({continuation_mismatch:f},(ie,le)=>ae("worker-merge-queue-add",{bead_id:b,continuation:ie,decision_token:le},y,M,!1)),U=k?.queue?.merge_queue?.find(ie=>ie.bead_id===b)?.continuation_action;k?.applied!==!0&&U?.continuation===null&&U.mismatch&&await Pe(y,b,k.queue.revision,U.mismatch)}async function Ue(y,b,M){let f=await ae("worker-discard",y,b,M);if(f&&f.discarded===!0){_e(gi(f),"success",5e3);return}if(f&&f.reason){_e(`\uD3D0\uAE30 \uC2E4\uD328: ${f.reason}`,"error");return}if(f&&f.accepted&&f.pending==="merged_revert"){_e("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success");return}if(f&&f.accepted){_e(`\uD3D0\uAE30 \uC9C4\uD589: ${f.phase||"\uBC31\uC5C5 \uC911"}`,"success");return}f&&!f.conflict&&_e("\uD3D0\uAE30 \uAC70\uBD80: unknown","error")}async function Qe(y,b,M,f){let k=await ae("worker-discard-abandon",y,b,M);if(k&&k.abandoned===!0){_e(mi(f),"success",5e3);return}if(k&&k.reason){_e(`\uD3D0\uAE30 \uD3EC\uAE30 \uAC70\uBD80: ${k.reason}`,"error");return}k&&!k.conflict&&_e("\uD3D0\uAE30 \uD3EC\uAE30 \uAC70\uBD80: unknown","error")}async function ze(y,b,M){return!i||!M?null:await i(y,{...b,root_dir:M})}async function Y(){let y=new Map;for(let b of C.pr_wait)y.has(b.root_dir)||y.set(b.root_dir,b.expected_revision);for(let[b,M]of y)await ae("worker-merge-queue-add-all",{},b,M)}function V(y){let b=R[y];return!!(b&&b.runnable===!0)}function xe(y){let b={...R[y]||{}};b.runnable=!b.runnable,R={...R,[y]:b},Rv(R),je()}function bt(y){Q.toggle(y),je()}function _t(y){Q.toggleArea(y),je()}function Ke(y){let b=y.dependency_chips||null,M=y.overlap_chips||[],f=y.scope_state==="missing",k=y.armed_lane_chip;return!b&&M.length===0&&!f&&!k?null:{...b||{},...M.length>0?{overlaps:M}:{},...f?{scope_missing:!0}:{},...k?{armed_lane:k}:{}}}function nt(y){return $i(y,b=>F.isOpen({bead_id:y.id,chip_key:b}))}function x(y){let b=Ke(y),M=nt(y);return b||M?{...y,...b?{dependency_chips:b}:{},...M?{chip_popover:M}:{}}:y}function Z(y){let b=V(y.root_dir);return c`<header class="mon2-sec__hd">
      <button
        type="button"
        class="mon2-sec__toggle"
        data-root-dir=${y.root_dir}
        data-section="runnable"
        aria-expanded=${b?"false":"true"}
        aria-label=${`${y.name} \uC139\uC158 ${b?"\uD3BC\uCE58\uAE30":"\uC811\uAE30"}`}
      >
        ${b?"\u25B8":"\u25BE"}
      </button>
      <span class="mon2-sec__name" title=${y.root_dir}>${y.name}</span>
      <span class="mon2-sec__count">${y.count}</span>
      <button
        type="button"
        class="mon2-sec__worker"
        data-root-dir=${y.root_dir}
        title="이 레포의 Worker 탭으로 이동"
      >
        Worker ↗
      </button>
    </header>`}function Oe(y,b){return c`<div
      class="mon2-item"
      data-bead-id=${y.id}
      data-drag-kind="candidate"
      data-root-dir=${y.root_dir}
    >
      ${b}
    </div>`}function Ye(y){if(I!==y.id)return null;let b=C.queue_groups.find(U=>U.root_dir===y.root_dir),M=y.place_lanes||[],f=C.cross_lanes_revision!==null,k=[{id:"parallel",label:"\uBCD1\uB82C",count:y.place_index??0}];for(let U of C.chain_lanes)k.push({id:`lane:${U.lane_id}`,label:`\uC5F0\uACB0 ${U.number} (${U.draft?"draft":"\uD655\uC815"}) \uB05D\uC5D0`,count:U.rows.length,group:"\uC5F0\uACB0 \uB808\uC778",disabled:!f});k.push({id:"new-lane",label:"+ \uC0C8 \uC5F0\uACB0 \uB808\uC778",group:"\uC5F0\uACB0 \uB808\uC778",disabled:!f,title:f?"\uC774 \uC774\uC288\uB9CC \uB4E0 draft \uB808\uC778\uC744 \uB9CC\uB4ED\uB2C8\uB2E4":"\uC5F0\uACB0 \uB808\uC778 \uC800\uC7A5\uC18C\uB97C \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"});for(let U of M)k.push({id:`serial:${U.id}`,label:`\uC9C1\uB82C ${Number(U.id.slice(1))}`,count:U.length,group:`${b?b.name:""} \uC9C1\uB82C`});return{bead_id:y.id,lanes:k}}function at(y){return Oe(y,c`${Ja(x(y),Ye(y),{exec_chips_mode:"pinned_only",onOpenDoc:l?(b,M)=>l(M,y.root_dir):void 0})}`)}function Fe(){return C.runnable_flat?c`<div class="mon2-flat" data-drop="candidate">
        ${C.runnable.map(y=>at(y))}
      </div>`:c`${C.runnable_sections.map(y=>{let b=V(y.root_dir);return c`<section
        class="mon2-sec${b?" is-collapsed":""}"
        data-root-dir=${y.root_dir}
        data-section="runnable"
      >
        ${Z({root_dir:y.root_dir,name:y.name,count:y.items.length})}
        ${b?"":c`<div
              class="mon2-sec__body"
              data-lane="candidate"
              data-drop="candidate"
            >
              ${y.items.map(M=>at(M))}
            </div>`}
      </section>`})}`}function Je(y,b){return c`<div
      class="mon2-item"
      data-bead-id=${y.id}
      data-drag-kind="parallel"
      data-root-dir=${y.root_dir}
      data-row-index=${b}
      data-queue-index=${String(y.queue_index??0)}
    >
      ${qn(x(y),{actions:yo(y,{nudgeable:!0})})}
    </div>`}function qt(y,b,M,f){return c`<div
      class="mon2-crow${b.fixed?" mon2-crow--fixed":""}"
      draggable=${b.draggable?"true":"false"}
      data-bead-id=${b.id}
      data-drag-kind="chain"
      data-root-dir=${b.root_dir}
      data-lane-id=${y.lane_id}
      data-row-index=${M}
      data-queue-index=${typeof b.queue_index=="number"?String(b.queue_index):""}
    >
      <span class="mon2-crow__seq" aria-hidden="true"
        >${Nv(b.seq)}</span
      >
      ${b.workspace_name?c`<span class="worker-mini__repo" title=${b.root_dir}
            >${b.workspace_name}</span
          >`:""}
      <span class="worker-mini__id" title="클릭하면 ID 복사">${b.id}</span>
      <span class="mon2-crow__title">${b.title}</span>
      ${b.mismatch?c`<span
            class="mon2-crow__mismatch"
            title="레인 순서가 주장하는 선행이 bd 의존에 없습니다 — 재적용으로 복구합니다"
            >⚠ 의존 없음</span
          >`:""}
      ${f.includes(b.id)?c`<span
            class="mon2-crow__mismatch"
            title="이미 실행된 뒤 의존이 바뀌었습니다 — 이 행은 움직일 수 없어 교정하지 않습니다"
            >⚠ 의존 순서와 다름</span
          >`:""}
      <span class="mon2-crow__where" title=${b.location_title}
        >${b.location_label}</span
      >
      <button
        type="button"
        class="mon2-crow__detach"
        data-bead-id=${b.id}
        title="연결에서 빼고 앞뒤를 이어 붙입니다"
        aria-label="연결에서 빼기"
      >
        ✕
      </button>
    </div>`}function lt(y){let b=C.cross_lanes_revision!==null,M=W(y.lane_id),f=M?.held===!0,k=M?.cycle===!0,U=M?M.mismatched:[],ie=q&&q.lane_id===y.lane_id?q.corrected:0;return c`<div class="mon2-clane" data-lane-id=${y.lane_id}>
      <header class="mon2-clane__hd">
        <span class="mon2-clane__name">${y.label}</span>
        <span class="mon2-clane__count">${y.rows.length}</span>
        <span class="mon2-clane__badge mon2-clane__badge--${y.state}"
          >${y.badge}</span
        >
        ${ie>0?c`<span
              class="mon2-clane__corrected"
              title="기존 blocks 의존이 드롭 순서를 이깁니다 — 그 순서로 다시 놓았습니다"
              >의존에 맞춰 ${ie}건 자동 교정</span
            >`:""}
        ${k?c`<span
              class="mon2-clane__cycle"
              title="멤버들의 blocks 의존이 순환합니다 — 어느 순서도 의존을 만족시키지 못합니다"
              >⛔ 의존 사이클 — 자동 교정 불가</span
            >`:""}
        ${f?c`<span
              class="mon2-clane__hold"
              title="멤버 한 명의 의존 자료가 이 스냅샷에 아직 없습니다 — 다음 스냅샷이 채우면 교정합니다"
              >${Ri}</span
            >`:""}
        ${y.draft?c`<button
              type="button"
              class="mon2-clane__confirm"
              data-lane-id=${y.lane_id}
              ?disabled=${!b||!y.can_confirm||f}
              title=${f?Ri:y.can_confirm?"\uC778\uC811 \uC758\uC874\uC744 \uAC78\uACE0 \uBBF8\uC801\uC7AC \uBA64\uBC84\uB97C \uAC01\uC790 \uB808\uD3EC \uBCD1\uB82C \uD050 \uB05D\uC5D0 \uC62C\uB9BD\uB2C8\uB2E4":"\uBA64\uBC84\uAC00 2\uAC1C \uC774\uC0C1\uC774\uC5B4\uC57C \uD655\uC815\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4"}
            >
              확정
            </button>`:""}
        ${y.run_label!==null?c`<button
              type="button"
              class="mon2-clane__run"
              data-lane-id=${y.lane_id}
              ?disabled=${!b}
              title="이 레인 멤버만 발차합니다 — 레포 자동 진행은 켜지 않습니다"
            >
              ${y.run_label}
            </button>`:""}
        ${y.state==="confirmed"&&y.has_mismatch?c`<button
              type="button"
              class="mon2-clane__reapply"
              data-lane-id=${y.lane_id}
              ?disabled=${!b}
              title="빠진 인접 의존을 다시 걸고 미적재 멤버를 다시 올립니다"
            >
              재적용
            </button>`:""}
        ${y.can_stop?c`<button
              type="button"
              class="mon2-clane__stop"
              data-lane-id=${y.lane_id}
              ?disabled=${!b}
              title="남은 멤버의 발차만 멈춥니다 — 도는 세션과 머지 큐 항목은 끝까지 갑니다"
            >
              ⏸ 정지
            </button>`:""}
        <button
          type="button"
          class="mon2-clane__remove"
          data-lane-id=${y.lane_id}
          ?disabled=${!b}
          title=${y.draft?"\uC774 draft \uB808\uC778\uC744 \uC9C0\uC6C1\uB2C8\uB2E4":"\uC774 \uB808\uC778\uACFC \uB808\uC778\uC774 \uB9CC\uB4E0 \uC758\uC874\uC744 \uD568\uAED8 \uC9C0\uC6C1\uB2C8\uB2E4"}
          aria-label="연결 레인 삭제"
        >
          ✕
        </button>
      </header>
      <div
        class="mon2-clane__body"
        data-drop="chain"
        data-lane-id=${y.lane_id}
      >
        ${y.rows.length===0?c`<div class="mon2-clane__hint">
              여기로 끌어다 놓으면 연결이 시작됩니다
            </div>`:y.rows.map((le,Be)=>qt(y,le,Be,U))}
      </div>
    </div>`}function At(y,b,M){return c`<div
      class="mon2-item"
      data-bead-id=${b.id}
      data-drag-kind="repo-serial"
      data-root-dir=${b.root_dir}
      data-lane-id=${y.id}
      data-row-index=${M}
      data-queue-index=${String(b.queue_index??0)}
    >
      ${qn(x(b),{actions:yo(b)})}
    </div>`}function Bt(y){if(y.length===0)return"";let b=y.length-1;return`${y[0].id} \uC810\uC720${b>0?` +${b}`:""}`}function Pt(y){return c`<div
      class="mon2-item mon2-item--ghost"
      data-bead-id=${y.id}
    >
      ${qn({id:y.id,title:y.title,lane:"running",draggable:!1,ghost:!0,badges:[y.badge]})}
    </div>`}function Nt(y,b){let M=b.occupants,f=b.cross_wait_peers||[];return{id:b.id,pane_id:"",title:`${y.name} \xB7 \uC9C1\uB82C ${b.index+1}`,rows:[...M.map(k=>Pt(k)),...b.items.map((k,U)=>At(b,k,U))],count:b.items.length,empty:b.empty===!0,...M.length>0?{badge:c`<span
              class="mon2-lane__occupant"
              title=${M.map(k=>`${k.id} \u2014 ${k.badge}`).join(`
`)}
              >${Bt(M)}</span
            >`,held:!0}:{},cycle:b.cycle,header_control:c`<button
        type="button"
        class="mon2-sec__worker"
        data-root-dir=${y.root_dir}
        title="이 레포의 Worker 탭으로 이동"
      >
        Worker ↗
      </button>`,...f.length>0?{after:c`${f.map(k=>c`<div class="mon2-lane__cross-wait">
                  ⚠ 상호 정지 — ${k.workspace_name}·${k.lane}과 교차 대기
                </div>`)}`}:{}}}function ue(){let y=C.cross_lanes_revision!==null,b=C.chain_lanes.some(M=>M.draft&&M.rows.length===0);return xi({parallel:{rows:C.parallel_rows.map((M,f)=>Je(M,f)),count:C.parallel_rows.length,collapsed:Q.isAreaCollapsed("parallel"),drop:{drop:"parallel"}},serial:{lanes:C.queue_groups.flatMap(M=>M.sublanes.serial.map(f=>({...Nt(M,f),drop:{drop:"repo-serial",root_dir:M.root_dir,lane_id:f.id,lane_length:String(f.raw_length)}}))),collapsed:Q.isAreaCollapsed("serial"),extra_panes:C.chain_lanes.map(M=>lt(M)),header_control:c`<button
          type="button"
          class="mon2-newlane"
          ?disabled=${b||!y}
          title=${y?b?"\uBE48 \uC5F0\uACB0 \uB808\uC778\uC774 \uC774\uBBF8 \uC788\uC2B5\uB2C8\uB2E4":"\uBE48 \uC5F0\uACB0 \uB808\uC778\uC744 \uD558\uB098 \uB9CC\uB4ED\uB2C8\uB2E4":"\uC5F0\uACB0 \uB808\uC778 \uC800\uC7A5\uC18C\uB97C \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"}
        >
          + 연결 레인
        </button>`,...C.cross_lanes_unreadable?{notice:c`<div class="mon2-clane__unreadable">
                연결 레인 저장소를 읽을 수 없음
              </div>`}:{}}})}function ke(y){return c`<div class="worker-rungrid">
      ${C.running.length===0?c`<div class="worker-rungrid__empty">실행 세션 없음</div>`:C.running.map(b=>Hl({bead_id:b.id,attempt_id:b.attempt_id||"",title:b.title,runner:b.runner??null,model:b.model??null,effort:b.effort??null,speed:b.speed??null,started_at:b.started_at??null,kind:b.kind,...b.kind==="session"?{updated_at:b.updated_at,session_refs:b.session_refs||[]}:{},workflow:b.workflow||null,resumed_from:b.resumed_from??null,continuation_mode:b.continuation_mode??null,paused:b.run_state==="paused",failed:b.run_state==="failed",parked:b.run_state==="parked",retry_wait:b.run_state==="retry_wait",waiting:b.run_state==="waiting",wait:b.wait||null,retry:b.retry||null,status:b.status,status_label:b.run_state==="failed"?"\uC2E4\uD328":b.run_state==="parked"?"\uC138\uC158 \uB300\uAE30":b.run_state==="retry_wait"?"\uC7AC\uC2DC\uB3C4 \uB300\uAE30":b.run_state==="waiting"?"\uC120\uD589 \uB300\uAE30":void 0,can_pause:b.can_pause!==!1,exec_chips:b.exec_chips||null,usage:b.usage||null,chip_popover:nt(b),discard:b.discard,failure:b.failure?{...b.failure,open:P===b.attempt_id}:null},y,L,{monitor:{repo:b.workspace_name,root_dir:b.root_dir,serial_lane_id:b.serial_lane_id,cross_lane_chip:b.cross_lane_chip||null,last_activity:b.last_activity||null,legs:b.legs||[],dependency_chips:Ke(b)}}))}
    </div>`}function Ge(y){let b={runnable:C.runnable,queue:C.queue,running:C.running,pr_wait:C.pr_wait,done:C.done},M=f=>{let k=b[f.lane],U=f.lane==="runnable"?C.runnable_flat?k.length>0?Fe():void 0:C.runnable_sections.length>0?Fe():void 0:f.lane==="queue"?C.queue_groups.length>0||C.chain_lanes.length>0||C.parallel_rows.length>0||C.cross_lanes_unreadable?ue():void 0:f.lane==="running"?ke(y):k.length>0?c`${k.map(ie=>qn(x(ie)))}`:void 0;return Vn({id:`monitor-${f.lane}`,lane:f.pane,title:f.title,items:k,count:k.length,src:f.lane==="runnable",empty:f.empty,body:U,live:f.lane==="running"&&k.length>0,collapsible:!0,collapsed:Q.isCollapsed(f.pane),controls:f.lane==="runnable"?rt():void 0,header_control:et(f.lane,k.length)})};if(ee){let f=qv.map(k=>Af.find(U=>U.lane===k)).filter(k=>k!==void 0);return c`<div class="mon2-deck"></div>
        <div class="worker-lanes-host">
          <div class="worker-lanes worker-lanes--mobile mon2-lanes">
            ${Ai({live:C.running.length>0,running_body:C.running.length>0?ke(y):"",pr_wait_rows:C.pr_wait.map(k=>qn(x(k))),count:C.running.length+C.pr_wait.length})}
            ${f.map(k=>M(k))}
          </div>
        </div>`}return c`<div class="mon2-deck"></div>
      <div class="worker-lanes-host">
        <div class="worker-lanes mon2-lanes">
          ${Af.map(f=>M(f))}
        </div>
      </div>`}function rt(){return c`<div class="worker-filter">
      <label class="worker-filter__tgl" title="blocked 이슈 표시">
        <input
          type="checkbox"
          class="mon-filter__blocked"
          .checked=${v.show_blocked}
        />
        🔒
        blocked${C.runnable_hidden.blocked>0?` ${C.runnable_hidden.blocked}`:""}
      </label>
      <div
        class="worker-filter__readiness"
        role="group"
        aria-label="준비도 필터"
      >
        ${ns.map(y=>c`<button
              type="button"
              class="mon-filter__readiness worker-filter__chip${v.readiness===y.value?" is-active":""}"
              data-readiness=${y.value}
              aria-pressed=${v.readiness===y.value?"true":"false"}
            >
              ${y.label}
            </button>`)}
        ${C.runnable_hidden.readiness>0?c`<span class="worker-filter__hidden"
              >숨김 ${C.runnable_hidden.readiness}</span
            >`:""}
      </div>
    </div>`}function et(y,b){return y==="runnable"?c`<select
        class="mon-candidate-sort worker-sort"
        aria-label="후보 정렬"
        title="후보 정렬"
        .value=${O}
      >
        ${ts.map(M=>c`<option
              value=${M.value}
              ?selected=${O===M.value}
            >
              ${M.label}
            </option>`)}
      </select>`:y==="running"?c`<select
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
      </select>`:y==="pr_wait"&&b>0?c`<button
        type="button"
        class="mon-lane-op mon-merge-all"
        title="자격이 생기는 PR을 각 레포의 머지 큐에 한 번에 넣습니다"
      >
        일괄 머지
      </button>`:y==="done"?c`<select
        class="mon-done-range worker-sort"
        aria-label="완료 기간"
        title="완료 기간"
        .value=${_}
      >
        ${Qr.map(M=>c`<option value=${M.value} ?selected=${_===M.value}>
              ${M.label}
            </option>`)}
      </select>`:""}function ht(y){let b=o&&o.get?o.get():null,M=o&&o.getWorkspacesState?o.getWorkspacesState():[],f=y===void 0?o&&o.crossLanes?o.crossLanes():void 0:y,k={done_since:Lr(_,d()),running_sort:m,candidate_filter:v,candidate_sort:O};return f!==void 0&&(k.cross_lanes=f),yr(b,M,k)}function je(){let y=d();C=ht(),H=null,se=new Map;for(let b of[...C.runnable,...C.queue,...C.running,...C.pr_wait,...C.done])!b.non_occupying&&!se.has(b.id)&&se.set(b.id,b);mt(Ge(y),B),Ne()?.render(),tt(),S()}function tt(){let y=new Map;for(let b of C.queue_groups)y.set(b.root_dir,b.auto_advance);for(let b of Array.from(B.querySelectorAll(".worker-wait__area--parallel .worker-mini__repo"))){let M=b.closest(".mon2-item")?.getAttribute("data-root-dir")||"",f=y.get(M);typeof f=="boolean"&&b.setAttribute("title",`${b.textContent||""} \xB7 ${f?"\uC790\uB3D9\uD654 \uCF1C\uC9D0":"\uC790\uB3D9\uD654 \uAEBC\uC9D0"}`)}}function Ne(){if(ge)return ge;let y=B.querySelector(".mon2-deck");return y?(ge=$f(y,{workspacesState:()=>o&&o.getWorkspacesState?o.getWorkspacesState():[],doneItems:()=>C.done,rangeLabel:qe,transport:i,implPresetStore:t.execPresetStore,gotoWorkerTab:ce,onFocusChange:b=>{G=b,S()}}),ge):null}function S(){B.classList.toggle("has-focus",G!==null);for(let y of Array.from(B.querySelectorAll(".mon2-sec[data-root-dir]")))y.classList.toggle("is-focus",G!==null&&y.getAttribute("data-root-dir")===G);for(let y of Array.from(B.querySelectorAll(".mon2-item[data-bead-id], .rtile[data-bead-id], .worker-mini[data-bead-id], .worker-card[data-bead-id]"))){let b=se.get(y.getAttribute("data-bead-id")||"");y.classList.toggle("is-focus",G!==null&&!!b&&b.root_dir===G)}for(let y of Array.from(B.querySelectorAll(".mon2-crow[data-root-dir]")))y.classList.toggle("is-focus",G!==null&&y.getAttribute("data-root-dir")===G)}function j(y,b){let M=s?s():void 0;if(!b||!M||b===M||!a){r(y);return}a(b).then(()=>{r(y)}).catch(f=>{n("workspace switch for %s failed: %o",b,f)})}function ce(y){if(!y)return;let b=s?s():void 0,M=()=>{try{u?.gotoView("worker")}catch(f){n("gotoView(worker) failed: %o",f)}};if(!a||b&&b===y){M();return}a(y).then(M).catch(f=>{n("workspace switch for %s failed: %o",y,f),_e("\uB808\uD3EC \uC804\uD658\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error")})}function Ae(y){gn(y).then(b=>{_e(b?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",b?"success":"error",1400)})}function be(y){let b=se.get(y)||null;return{item:b,root_dir:b?b.root_dir:"",revision:b?b.expected_revision:0}}async function yt(y,b,M){if(y!=="dep-add")return;let f=C.chain_lanes.find(k=>k.rows.some(U=>U.id===b));!f||!f.rows.some(k=>k.id===M)||await J(k=>Ud(f.lane_id,k),"",[{type:y,a:b,b:M}])}function wt(){return(o&&o.crossLanes?o.crossLanes():null)??null}async function $t(y,b){if(y==="run"){await Gt(b);return}if(y==="stop"){await Ht(b);return}if(y==="create"){await J(M=>ul(null,M),"");return}if(y==="remove"){let M=zd(b,X());if(M!==null&&!p(M))return;await J(f=>Wd(b,f),"");return}await J(M=>y==="confirm"?Fd(b,M):Bd(b,M),"")}function xt(y){let b=new Map;for(let M of y.rows){let f=C.owner_of[M.id]||M.root_dir;typeof f!="string"||f.length===0||b.set(f,[...b.get(f)||[],M.id])}return b}async function Gt(y){let b=C.chain_lanes.find(U=>U.lane_id===y);if(!b||C.cross_lanes_revision===null){je();return}he();let M=new Map,f=new Map,k=xt(b);for(let U of b.rows){if(U.fixed||typeof U.queue_index=="number")continue;let ie=C.owner_of[U.id]||U.root_dir;if(typeof ie!="string"||ie.length===0){_e(`${U.id}\uC758 \uB808\uD3EC\uB97C \uC54C \uC218 \uC5C6\uC5B4 \uC801\uC7AC\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4`,"error"),je();return}let le=f.get(ie)??0;if(await re("worker-queue-place",{bead_id:U.id,lane:"parallel",index:(C.parallel_raw_length[ie]??0)+le},ie,M,{bead_id:U.id})===null){je();return}f.set(ie,le+1)}for(let[U,ie]of k)if(await re("worker-queue-arm",{bead_ids:ie,lane_id:y},U,M,{bead_id:ie[0]})===null){_e("\uC77C\uBD80 \uB808\uD3EC\uC5D0\uC11C \uC9C4\uD589\uC744 \uCF1C\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 \u2014 [\u25B6 \uC774\uC5B4\uC11C \uC9C4\uD589]\uC73C\uB85C \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC138\uC694","error"),je();return}je()}async function Ht(y){let b=C.chain_lanes.find(f=>f.lane_id===y);if(!b||C.cross_lanes_revision===null){je();return}he();let M=new Map;for(let[f,k]of xt(b))if(await re("worker-queue-disarm",{lane_id:y},f,M,{bead_id:k[0]})===null)break;je()}async function Ut(y,b){let{root_dir:M,revision:f}=be(y);if(M.length===0){je();return}await re("worker-queue-disarm",{bead_ids:[y],lane_id:b},M,new Map([[M,f]]),{bead_id:y}),je()}async function Et(y,b){let M=se.get(y);if(!M){je();return}let f={kind:"candidate",bead_id:y,root_dir:M.root_dir};if(b==="new-lane"){await J(k=>ul({bead_id:y,root_dir:M.root_dir},k),y);return}if(b.startsWith("lane:")){let k=b.slice(5);if(!C.chain_lanes.find(ie=>ie.lane_id===k)){je();return}await J(ie=>Li(f,{kind:"chain",lane_id:k,marker_index:(ie.cross_lanes.get(k)?.entries??[]).length},ie),y);return}if(b.startsWith("serial:")){let k=b.slice(7),U=(M.place_lanes||[]).find(ie=>ie.id===k);await ft(f,{kind:"repo-serial",root_dir:M.root_dir,lane_id:k,index:U?U.index:0});return}await ft(f,{kind:"parallel",marker_index:C.parallel_rows.length})}async function rn(y,b){let M=C.parallel_rows,f=M.findIndex(gt=>gt.id===y);if(f<0)return;let k=M[f].root_dir,U=[];M.forEach((gt,vt)=>{gt.root_dir===k&&U.push(vt)});let ie=U.indexOf(f),le=U[ie+b];if(typeof le!="number")return;let Be=b===-1?le:U[ie+2]??Math.min(M.length,le+1);await ft({kind:"parallel",bead_id:y,root_dir:k,queue_index:M[f].queue_index??0},{kind:"parallel",marker_index:Be})}async function tn(y){for(let b of C.chain_lanes){let M=b.rows.find(f=>f.id===y);if(M){await ft({kind:"chain",bead_id:y,root_dir:M.root_dir,lane_id:b.lane_id,...typeof M.queue_index=="number"?{queue_index:M.queue_index}:{}},{kind:"parallel",marker_index:C.parallel_rows.length});return}}}function Wt(y){return{runner:y.runner||void 0,model:y.model||void 0,effort:y.effort||void 0,status:y.run_state==="running"?"running":y.run_state,worktree:y.root_dir}}function Ot(y,b){let{item:M,root_dir:f,revision:k}=be(b),U=M?.attempt_id||"",ie=y.classList;if(ie.contains("worker-mini__rowops-up")||ie.contains("worker-mini__rowops-down")){rn(b,ie.contains("worker-mini__rowops-up")?-1:1);return}if(ie.contains("worker-mini__rowops-remove")){ae("worker-queue-remove",{bead_id:b},f,k);return}if(ie.contains("mon2-crow__detach")){tn(b);return}if(ie.contains("worker-dep__open")){j(y.getAttribute("data-dep-id")||"",y.getAttribute("data-root-dir")||"");return}if(ie.contains("mon2-arm__release")){Ut(b,y.getAttribute("data-lane-id")||"");return}if(ie.contains("mon-lane__chip")){let le=y.getAttribute("data-lane-id")||"";B.querySelector(`.mon2-clane[data-lane-id="${le}"]`)?.scrollIntoView({block:"nearest"});return}if(ie.contains("judgement-chip")){let le=y.getAttribute("data-chip-key")||"";le&&F.toggle({bead_id:b,chip_key:le});return}if(ie.contains("rtile__failure-badge")){P=P===U?null:U,je();return}if(ie.contains("rtile__attempt-copy")){let le=y.getAttribute("data-attempt-id")||"";le&&gn(le).then(Be=>{_e(Be?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",Be?"success":"error",1400)});return}if(ie.contains("worker-card__place")){I=I===b?null:b,je();return}if(ie.contains("worker-card__place-cancel")){I=null,je();return}if(ie.contains("worker-card__place-lane")){let le=y.getAttribute("data-lane")||"parallel";I=null,Et(b,le);return}if(ie.contains("rtile__session")){if(M&&M.kind==="session"){let le=(M.session_refs||[]).find(Be=>Be&&Be.current===!0);le&&(te.hidden=!1,Re.open(io(le,b,"in_progress",f)),je());return}L=U,U&&M&&(te.hidden=!1,Re.open({attempt_id:U,root_dir:f,meta:Wt(M)})),je();return}if(ie.contains("rtile__pause")){ze("worker-attempt-pause",{attempt_id:U},f);return}if(ie.contains("rtile__resume")){so({context:{bead_id:b,kind:y.dataset.resumeKind==="settlement"?"settlement":"session",tuple:M?Sn(M):""},transport:le=>ae("worker-attempt-resume",{attempt_id:U,...le},f,ve.get(f)?.revision??be(b).revision,!1)});return}if(ie.contains("rtile__parked-retry")){ze("worker-parked-retry",{bead_id:b,attempt_id:U},f).then(le=>{le&&le.ok===!1&&_e(`\uC7AC\uC2DC\uB3C4 \uAC70\uBD80: ${le.reason==="not_latest"?"\uC774 bead\uC5D0 \uB354 \uC0C8\uB85C\uC6B4 \uC2DC\uB3C4\uAC00 \uC788\uC2B5\uB2C8\uB2E4":le.reason||""}`,"error")});return}if(ie.contains("rtile__discard-abandon")){let le={kind:y.dataset.operationKind||"",last_error:y.dataset.lastError||""};if(!p(Xo(b,le)))return;Qe({bead_id:b,operation_id:y.dataset.operationId||""},f,k,le);return}if(ie.contains("rtile__discard")){let le=y.dataset.confirmation==="merged"?"merged":"unmerged";if(!p(Qo(b,le)))return;Ue({bead_id:b,...U?{attempt_id:U}:{},...y.dataset.operationId?{operation_id:y.dataset.operationId}:{}},f,k);return}if(ie.contains("worker-mini__merge")){let le=Ee(f,b);le?.mismatch&&le.continuation===null?Pe(f,b,k,le.mismatch):ae("worker-merge-queue-add",{bead_id:b},f,k);return}if(ie.contains("worker-mini__merge-cancel")){ae("worker-merge-queue-remove",{bead_id:b},f,k);return}if(ie.contains("worker-mini__discard-abandon")){let le={kind:y.dataset.operationKind||"",last_error:y.dataset.lastError||""};if(!p(Xo(b,le)))return;Qe({bead_id:b,operation_id:y.dataset.operationId||""},f,k,le);return}if(ie.contains("worker-mini__discard")){let le=y.dataset.discardMode==="merged"?"merged":"unmerged";if(!p(Qo(b,le)))return;Ue({bead_id:b,...y.dataset.attemptId?{attempt_id:y.dataset.attemptId}:{},...y.dataset.operationId?{operation_id:y.dataset.operationId}:{}},f,k);return}if(ie.contains("worker-mini__revise-fix")){fe("worker-revise-fix",{bead_id:b},f,k);return}ie.contains("worker-mini__revise-approve")&&ae("worker-revise-approve",{bead_id:b},f,k)}function Qt(y){let b=Ze.consumeClickSuppression(),M=y.target;if(!M||typeof M.closest!="function"||M.closest("dialog")||M.closest(".worker-drawer-overlay")||M.closest("a"))return;let f=M.closest(".worker-card__id, .worker-mini__id, .rtile__id");if(f){y.preventDefault();let Ie=M.closest(".mon2-item, .rtile, .mon2-crow, .worker-mini")?.getAttribute("data-bead-id")||f.textContent?.trim()||"";Ie&&Ae(Ie);return}let k=M.closest(".worker-mini__repo, .worker-card__repo, .mon2-sec__worker");if(k){y.preventDefault();let $=k.getAttribute("data-root-dir")||se.get(M.closest(".mon2-item, .rtile, .worker-mini")?.getAttribute("data-bead-id")||"")?.root_dir||k.getAttribute("title")||"";ce($);return}let U=M.closest(".mon2-sec__toggle");if(U){y.preventDefault(),xe(U.getAttribute("data-root-dir")||"");return}let ie=M.closest(".worker-pane__toggle[data-lane]");if(ie){y.preventDefault();let $=ie.getAttribute("data-lane")||"";($==="candidate"||$==="queue"||$==="running"||$==="pr_wait"||$==="done")&&bt($);return}let le=M.closest(".worker-wait__area-toggle[data-area]");if(le){y.preventDefault(),_t(le.getAttribute("data-area")||"parallel");return}if(M.closest(".mon2-newlane")){y.preventDefault(),$t("create","");return}let Be=M.closest(".mon2-clane__confirm, .mon2-clane__reapply, .mon2-clane__remove, .mon2-clane__run, .mon2-clane__stop");if(Be){y.preventDefault();let $=Be.getAttribute("data-lane-id")||"",Ie=Be.classList;$t(Ie.contains("mon2-clane__confirm")?"confirm":Ie.contains("mon2-clane__reapply")?"reapply":Ie.contains("mon2-clane__run")?"run":Ie.contains("mon2-clane__stop")?"stop":"remove",$);return}if(M.closest(".mon-merge-all")){y.preventDefault(),Y();return}let gt=M.closest(".mon-filter__readiness");if(gt){y.preventDefault(),v={...v,readiness:gt.getAttribute("data-readiness")||"all"},xf(v),je();return}let vt=M.closest(".mon2-item, .rtile, .mon2-crow, .worker-mini, .worker-card");if(!vt)return;let ct=vt.getAttribute("data-bead-id")||"",A=M.closest("button");if(A){y.preventDefault(),Ot(A,ct);return}M.closest(".rtile__failure-pop, .chip-popover")||ct&&!b&&(y.preventDefault(),j(ct,vt.getAttribute("data-root-dir")||be(ct).root_dir))}function we(y){let b=y.target;if(!b||typeof b.closest!="function")return;let M=b.closest(".mon-filter__blocked");if(M){v={...v,show_blocked:M.checked},xf(v),je();return}let f=b.closest(".mon-candidate-sort");if(f){O=ts.some(ie=>ie.value===f.value)?f.value:"repo_spec",Cv(O),je();return}let k=b.closest(".mon-running-sort");if(k){m=k.value==="repo"?"repo":"started",Pv(m),je();return}let U=b.closest(".mon-done-range");U&&(_=Hn(U.value),Lv(_),je())}function T(y){let b=y.target,M=b&&typeof b.closest=="function"?f=>b.closest(f):()=>null;P&&!M(".rtile__failure-pop, .rtile__failure-badge")&&(P=null,je())}function pe(y){y.key!=="Escape"||P===null||(P=null,je())}e.addEventListener("click",Qt),e.addEventListener("change",we),document.addEventListener("click",T),document.addEventListener("keydown",pe),F.attach(),Ze.attach(e);{let y=!0;K=Zi(b=>{if(ee=b,y){y=!1;return}je()})}o&&typeof o.subscribe=="function"&&(ye=o.subscribe(()=>{try{ve.clear(),je()}catch{}}));function Le(){De!==null&&(clearInterval(De),De=null)}return{recorrectSharedLane:yt,load(){n("load"),je(),De===null&&(De=setInterval(()=>{try{je()}catch{}},Mv))},pause(){Le()},clear(){Le(),Ze.detach(),ye&&(ye(),ye=null),K&&(K(),K=null),Re.destroy(),te.hidden=!0,ge?.destroy(),ge=null,e.removeEventListener("click",Qt),e.removeEventListener("change",we),document.removeEventListener("click",T),document.removeEventListener("keydown",pe),F.detach(),e.replaceChildren()}}}function Df(e,t,n){let r=Kt("views:nav"),{global_element:o,repo_element:i}=e,s=null;function l(_){return m=>{m.preventDefault();let v=_==="monitor"&&a()==="monitor"?"worker":_;r("click tab %s",v),n.gotoView(v)}}function a(){let _=t.getState();return _.view==="worker"||_.view==="monitor"?_.view:"board"}function u(){let _=a();return c`
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
    `}function p(){o&&mt(u(),o),i&&mt(d(),i)}return p(),s=t.subscribe(()=>p()),{destroy(){s&&(s(),s=null),o&&mt(c``,o),i&&mt(c``,i)}}}var Pf=["bug","feature","task","epic","chore"];function Mf(e){switch((e||"").toString().toLowerCase()){case"bug":return"Bug";case"feature":return"Feature";case"task":return"Task";case"epic":return"Epic";case"chore":return"Chore";default:return""}}var qf=["Critical","High","Medium","Low","Backlog"];function Nf(e,t){let n=document.createElement("dialog");n.id="new-issue-dialog",n.setAttribute("role","dialog"),n.setAttribute("aria-modal","true"),n.innerHTML=`
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
  `,e.appendChild(n);let r=n.querySelector("#new-issue-form"),o=n.querySelector("#new-title"),i=n.querySelector("#new-type"),s=n.querySelector("#new-priority"),l=n.querySelector("#new-labels"),a=n.querySelector("#new-description"),u=n.querySelector("#new-issue-error"),d=n.querySelector("#btn-cancel"),p=n.querySelector("#btn-create"),_=n.querySelector(".new-issue__close");function m(){i.replaceChildren();let I=document.createElement("option");I.value="",I.textContent="\u2014 Select \u2014",i.appendChild(I);for(let P of Pf){let F=document.createElement("option");F.value=P,F.textContent=Mf(P),i.appendChild(F)}s.replaceChildren();for(let P=0;P<=4;P+=1){let F=document.createElement("option");F.value=String(P);let G=qf[P]||"Medium";F.textContent=`${P} \u2013 ${G}`,s.appendChild(F)}}m();function v(){try{typeof n.close=="function"?n.close():n.removeAttribute("open")}catch{n.removeAttribute("open")}}function O(I){o.disabled=I,i.disabled=I,s.disabled=I,l.disabled=I,a.disabled=I,d.disabled=I,p.disabled=I,p.textContent=I?"Creating\u2026":"Create"}function R(){u.textContent=""}function Q(I){u.textContent=I}function ee(){try{let I=window.localStorage.getItem("beads-ui.new.type");I?i.value=I:i.value="";let P=window.localStorage.getItem("beads-ui.new.priority");P&&/^\d$/.test(P)?s.value=P:s.value="2"}catch{i.value="",s.value="2"}}function K(){let I=i.value||"",P=s.value||"";I.length>0&&window.localStorage.setItem("beads-ui.new.type",I),P.length>0&&window.localStorage.setItem("beads-ui.new.priority",P)}async function L(){R();let I=String(o.value||"").trim();if(I.length===0){Q("Title is required"),o.focus();return}let P=Number(s.value||"2");if(!(P>=0&&P<=4)){Q("Priority must be 0..4"),s.focus();return}let F=String(i.value||""),G=String(a.value||""),q={title:I};F.length>0&&(q.type=F),String(P).length>0&&(q.priority=P),G.length>0&&(q.description=G),O(!0);try{await t("create-issue",q)}catch{O(!1),Q("Failed to create issue");return}K(),O(!1),v()}return n.addEventListener("cancel",I=>{I.preventDefault(),v()}),_.addEventListener("click",()=>v()),d.addEventListener("click",()=>v()),n.addEventListener("keydown",I=>{I.key==="Enter"&&(I.ctrlKey||I.metaKey)&&(I.preventDefault(),L())}),r.addEventListener("submit",I=>{I.preventDefault(),L()}),{open(){r.reset(),R(),ee();try{"showModal"in n&&typeof n.showModal=="function"?n.showModal():n.setAttribute("open","")}catch{n.setAttribute("open","")}setTimeout(()=>{try{o.focus()}catch{}},0)},close(){v()}}}var jv=[["route","route \uCE69"],["fast_track","\u26A1 fast_track \uCE69"],["pr","PR \uCE69"],["from","\u21A9 from \uCE69"],["blocked","blocked\xB7\uC0AC\uC6A9\uC790 \uB9AC\uBDF0 \uD544\uC694 \uCE69"],["stepper","stepper"]];function Fv(e,t){return Sa(e,t)?"shown":t.hidden_labels.includes(e)?"hidden_exact":"hidden_prefix"}function jf(e,t,n){return c`
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
  `}var Bv=[{id:"execution",label:"\uC2E4\uD589",glyph:"\u25C6"},{id:"display",label:"\uD45C\uC2DC",glyph:"\u25EB"}];function Uf(e,t){let{transport:n,policyStore:r,labelOptions:o}=t,i=t.notify||(ne=>_e(ne,"error",4e3)),s=document.createElement("dialog");s.id="settings-dialog",s.className="settings-dialog",s.setAttribute("role","dialog"),s.setAttribute("aria-modal","true"),s.setAttribute("aria-label","\uC124\uC815"),e.appendChild(s);let l="execution",a=!1,u="",d=null;function p(){if(d)return d;let ne=s.querySelector('[data-pane="execution"]');return ne?(d=sa(ne,{root_dir:null,queue:()=>t.queueStore?.get()??null,transport:n,implPresetStore:t.implPresetStore,notify:i,onQueueAdopt:he=>t.queueStore?.set?.(he)}),d):null}function _(){return c`
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
    `}function m(){let ne=r.get();return c`
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
        ${ne?c`
              ${jf(ne,o(),Q)}
              ${Ff(ne,u,{onDraft:he=>{u=he},onAdd:ee,onRemove:K})}
              ${Bf(ne,L)}
            `:c`<div class="settings-dialog__empty">
              표시 정책을 불러오는 중…
            </div>`}
      </section>
    `}async function v(ne){let he=r.get();if(he)try{let qe=await n("display-policy-set",{expected_revision:he.revision,policy:ne(he)});O(qe),qe&&qe.conflict&&qe.policy&&(qe=await n("display-policy-set",{expected_revision:qe.policy.revision,policy:ne(qe.policy)}),O(qe)),qe&&qe.conflict&&i("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC")}catch{i("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328")}}function O(ne){ne&&ne.policy&&typeof ne.policy=="object"&&r.set(ne.policy)}function R(ne){v(ne)}function Q(ne){let he=r.get();if(!he)return;let qe=!Uv(ne,he);R(B=>Wv(ne,B,qe))}function ee(){let ne=u.trim();ne.length!==0&&(u="",R(he=>he.hidden_prefixes.includes(ne)?{hidden_prefixes:he.hidden_prefixes}:{hidden_prefixes:[...he.hidden_prefixes,ne]}),I())}function K(ne){R(he=>({hidden_prefixes:he.hidden_prefixes.filter(qe=>qe!==ne)}))}function L(ne){let he=r.get();if(!he)return;let qe=he.chips[ne]===!1;R(()=>({chips:{[ne]:qe}}))}function I(){mt(c`
        <div class="settings-dialog__container">
          <nav
            class="settings-dialog__rail"
            role="tablist"
            aria-orientation="vertical"
          >
            <div class="settings-dialog__rail-title">설정</div>
            ${Bv.map(ne=>c`<button
                  type="button"
                  class="settings-dialog__tab"
                  role="tab"
                  data-tab=${ne.id}
                  aria-selected=${String(l===ne.id)}
                  aria-controls=${`settings-pane-${ne.id}`}
                  @click=${()=>P(ne.id)}
                >
                  <span class="settings-dialog__glyph">${ne.glyph}</span>
                  ${ne.label}
                </button>`)}
            <button
              type="button"
              class="settings-dialog__close"
              aria-label="닫기"
              @click=${W}
            >
              닫기
            </button>
          </nav>
          <div class="settings-dialog__panes">
            ${_()} ${m()}
          </div>
        </div>
      `,s),p()}function P(ne){l=ne,I()}let F=()=>{a=!1,t.onOpenChange?.(!1)};s.addEventListener("close",F),s.addEventListener("cancel",F);let G=ne=>{ne.target===s&&W()};s.addEventListener("click",G);let q=null;r.subscribe&&(q=r.subscribe(()=>{a&&I()}));let N=null;t.implPresetStore?.subscribe&&(N=t.implPresetStore.subscribe(()=>{a&&d?.render()}));function H(ne="execution"){a||(a=!0,t.onOpenChange?.(!0),l=ne,u="",I(),typeof s.showModal=="function"?s.showModal():s.setAttribute("open",""),p()?.load())}function W(){a&&(a=!1,t.onOpenChange?.(!1),typeof s.close=="function"?s.close():s.removeAttribute("open"))}return{open:H,close:W,sessionDraft:()=>d?.sessionDraft()??{},destroy(){a=!1,s.removeEventListener("close",F),s.removeEventListener("cancel",F),s.removeEventListener("click",G),q&&(q(),q=null),N&&(N(),N=null),d?.destroy(),d=null,s.remove()}}}function Uv(e,t){return t.visible_labels.includes(e)?!0:t.hidden_labels.includes(e)?!1:!t.hidden_prefixes.some(n=>n.length>0&&e.startsWith(n))}function Wv(e,t,n){if(!n)return{hidden_labels:t.hidden_labels.includes(e)?t.hidden_labels:[...t.hidden_labels,e],visible_labels:t.visible_labels.filter(i=>i!==e)};let r=t.hidden_labels.filter(i=>i!==e);return t.hidden_prefixes.some(i=>i.length>0&&e.startsWith(i))?{hidden_labels:r,visible_labels:t.visible_labels.includes(e)?t.visible_labels:[...t.visible_labels,e]}:{hidden_labels:r}}var zv=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],Wf="usage-meter-card",Hv="usage-meter-layer",Gl=600,Kv=["token_expired","relogin_required"];function zf(e){return String(e).padStart(2,"0")}function Gv(e,t){let n=Math.max(0,Math.ceil((e-t)/6e4)),r=Math.floor(n/1440),o=Math.floor(n%1440/60),i=n%60;return r>0?`${r}d${o>0?` ${o}h`:""}`:o>0?`${o}h${i>0?` ${i}m`:""}`:`${i}m`}function Hf(e,t=Date.now()){let n=Date.parse(e);if(!Number.isFinite(n))return"";let r=new Date(n),o=new Date(t),i=`${zf(r.getHours())}:${zf(r.getMinutes())}`,l=r.getFullYear()===o.getFullYear()&&r.getMonth()===o.getMonth()&&r.getDate()===o.getDate()?i:`${zv[r.getMonth()]} ${r.getDate()} ${i}`;return`${Gv(n,t)} \xB7 ${l}`}function Yv(e){let t=Math.max(0,Math.floor(e));return t<60?`${t}\uCD08 \uC804`:t<3600?`${Math.floor(t/60)}\uBD84 \uC804`:`${Math.floor(t/3600)}\uC2DC\uAC04 \uC804`}function Kf(e){return e>=85?"usage-meter__window--danger":e>=60?"usage-meter__window--warn":"usage-meter__window--success"}function Gf(e){let t=typeof e=="number"&&Number.isFinite(e)?e:0;return Math.min(100,Math.max(0,t))}var Yf=[{key:"claude",label:"Claude",endpoint:"/api/claude-usage",switch_endpoint:"/api/claude-account/switch",tool:"cswap"},{key:"codex",label:"Codex",endpoint:"/api/codex-usage",switch_endpoint:"/api/codex-account/switch",tool:"codex-auth"}];function Qf(e){let t=[];for(let n of e){if(!n||typeof n!="object")continue;let r=n;typeof r.key!="string"||r.key.length===0||typeof r.pct!="number"||!Number.isFinite(r.pct)||t.push({key:r.key,pct:r.pct,resetsAt:typeof r.resetsAt=="string"?r.resetsAt:""})}return t}function Vv(e){if(!e||typeof e!="object")return null;let t=e;return!Number.isInteger(t.number)||t.number<=0||typeof t.email!="string"||t.email.length===0||typeof t.status!="string"||t.status.length===0||typeof t.active!="boolean"||!Array.isArray(t.windows)?null:{number:t.number,email:t.email,alias:typeof t.alias=="string"&&t.alias.length>0?t.alias:null,plan:typeof t.plan=="string"&&t.plan.length>0?t.plan:null,active:t.active,status:t.status,windows:Qf(t.windows),fetchedAt:typeof t.fetchedAt=="string"?t.fetchedAt:null,ageSeconds:typeof t.ageSeconds=="number"&&Number.isFinite(t.ageSeconds)?t.ageSeconds:null}}function Qv(e,t){if(!e||typeof e!="object")return null;let n=e,r=[];if(Array.isArray(n.accounts))for(let i of n.accounts){let s=Vv(i);s&&r.push(s)}let o=n.available===!0&&Array.isArray(n.windows);return!o&&r.length===0?null:{available:o,windows:o?Qf(n.windows):[],ageSeconds:typeof n.ageSeconds=="number"&&Number.isFinite(n.ageSeconds)?n.ageSeconds:null,accounts:r,receivedAtMs:t,held:!1}}function Xv(e,t){if(!e||typeof e!="object")return{kind:"error"};let n=Qv(e,t);return n?{kind:"ok",snapshot:n}:Array.isArray(e.accounts)?{kind:"empty"}:{kind:"error"}}function Xf(e,t){return(e.ageSeconds===null?0:e.ageSeconds)+Math.max(0,t-e.receivedAtMs)/1e3}function Zv(e,t){return!e.held||Xf(e,t)<=Gl?e:{...e,available:!1,windows:[],accounts:[]}}function Vf(e,t){return`${e}:${t}`}function Zf(e){let t=!1,n=null,r=new Map,o=null,i=new Map,s=new Map,l=0,a=null;function u(){mt(c``,e),e.hidden=!0,p()}function d(){if(a===null){let B=e.ownerDocument;a=B.createElement("div"),a.id=Hv,a.className="usage-meter__layer",B.body.appendChild(a)}return a}function p(){a!==null&&(mt(c``,a),a.remove(),a=null)}function _(B){n!==B&&(n===null&&(document.addEventListener("mousedown",v),document.addEventListener("keydown",R),window.addEventListener("resize",O)),n=B)}function m(){n!==null&&(n=null,document.removeEventListener("mousedown",v),document.removeEventListener("keydown",R),window.removeEventListener("resize",O))}function v(B){let te=B.target;te&&(e.contains(te)||a!==null&&a.contains(te))||(m(),W())}function O(){W()}function R(B){B.key==="Escape"&&(m(),W())}function Q(B){n===B?m():_(B),W()}function ee(){m(),W()}async function K(B,te){if(r.has(B.key))return;let me=Vf(B.key,te);r.set(B.key,te),s.delete(me),W();let Te=null;try{Te=await(await fetch(B.switch_endpoint,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({number:te})})).json()}catch{Te=null}if(t)return;if(r.delete(B.key),!Te||Te.ok!==!0){let se=Te&&typeof Te.error=="string"&&Te.error.length>0?Te.error:"network_error";s.set(me,{kind:"error",text:`\uC804\uD658 \uC2E4\uD328 \u2014 ${se}`}),W();return}let C=Array.isArray(Te.warnings)?Te.warnings.filter(se=>typeof se=="string"&&se.length>0):[];C.length>0&&s.set(me,{kind:"warn",text:C.join(" \xB7 ")}),W(),await qe()}function L(B,te,me,Te){let C=Gf(B.pct),ve=`resets ${Hf(B.resetsAt,Te)}${te?` \xB7 ${me}`:""}`;return c`<span
      class="usage-meter__window ${Kf(C)}"
      style=${`--progress: ${C}%`}
      title=${ve}
    >
      <span class="usage-meter__label">${B.key}</span>
      <span class="usage-meter__track" aria-hidden="true">
        <span class="usage-meter__fill"></span>
      </span>
      <span class="usage-meter__pct">${C}%</span>
    </span>`}function I(B,te,me){let Te=Xf(te,me),C=te.available&&(te.held||Te>Gl),se=C?`${Math.floor(Te/60)}\uBD84 \uC804 \uCE21\uC815`:"",ve=te.accounts.filter(Re=>!Re.active).length,ye=`usage-meter__group${C?" usage-meter__group--stale":""}`,De=c`<span class="usage-meter__provider"
        >${B.label}</span
      >
      ${te.available?te.windows.map(Re=>L(Re,C,se,me)):c`<span class="usage-meter__empty">사용량 없음</span>`}
      ${ve>0?c`<span class="usage-meter__badge">+${ve}</span>`:""}`;if(te.accounts.length===0)return c`<span
        class=${ye}
        aria-label=${`${B.label} usage`}
        >${De}</span
      >`;let ge=n===B.key;return c`<button
      type="button"
      class=${`usage-meter__toggle ${ye}`}
      aria-label=${`${B.label} usage`}
      aria-expanded=${ge?"true":"false"}
      aria-controls=${Wf}
      @click=${()=>Q(B.key)}
    >
      ${De}
    </button>`}function P(B,te){return c`<span class="usage-meter" aria-label="Usage">
      ${B.map(me=>I(me.provider,me.snapshot,te))}
    </span>`}function F(B,te){let me=Gf(B.pct),Te=Hf(B.resetsAt,te);return c`<span
      class="usage-meter__account-window ${Kf(me)}"
      style=${`--progress: ${me}%`}
    >
      <span class="usage-meter__account-key">${B.key}</span>
      <span class="usage-meter__account-track" aria-hidden="true">
        <span class="usage-meter__account-fill"></span>
      </span>
      <span class="usage-meter__account-pct">${me}%</span>
      <span class="usage-meter__account-reset"
        >${Te.length>0?`\u21BB ${Te}`:""}</span
      >
    </span>`}function G(B,te){return Kv.includes(te)?`\uD1A0\uD070 \uB9CC\uB8CC \u2014 ${B.tool} \uC7AC\uB85C\uADF8\uC778 \uD544\uC694`:"\uC0AC\uC6A9\uB7C9 \uC5C6\uC74C"}function q(B,te,me){let Te=te.status==="ok",C=typeof te.ageSeconds=="number"&&te.ageSeconds>Gl,se=s.get(Vf(B.key,te.number)),ve=r.get(B.key),ye=ve!==void 0,De=ve===te.number,ge=["usage-meter__account"];return te.active&&ge.push("usage-meter__account--active"),Te||ge.push("usage-meter__account--unavailable"),C&&ge.push("usage-meter__account--stale"),c`<div class=${ge.join(" ")}>
      <div class="usage-meter__account-head">
        <span class="usage-meter__account-label" title=${te.email}
          >${te.alias===null?te.email:te.alias}</span
        >
        ${te.plan===null?"":c`<span class="usage-meter__account-tag">${te.plan}</span>`}
        ${te.active?c`<span
              class="usage-meter__account-tag usage-meter__account-tag--active"
              >active</span
            >`:""}
        ${te.ageSeconds===null?"":c`<span class="usage-meter__account-age"
              >${Yv(te.ageSeconds)}</span
            >`}
        ${te.active?"":c`<button
              type="button"
              class="usage-meter__switch"
              ?disabled=${ye}
              @click=${()=>{K(B,te.number)}}
            >
              ${De?"\uC804\uD658 \uC911\u2026":"\uC804\uD658"}
            </button>`}
      </div>
      ${Te?c`<div class="usage-meter__account-windows">
            ${te.windows.map(Re=>F(Re,me))}
          </div>`:c`<div class="usage-meter__account-status">
            ${G(B,te.status)}
          </div>`}
      ${se===void 0?"":c`<div
            class="usage-meter__account-message usage-meter__account-message--${se.kind}"
          >
            ${se.text}
          </div>`}
    </div>`}function N(B,te,me){let Te=te.accounts.filter(C=>C.active).length;return c`<section class="usage-meter__section">
      <h2 class="usage-meter__section-title">
        ${B.label} · 활성 ${Te} / 전체
        ${te.accounts.length}
      </h2>
      ${te.accounts.map(C=>q(B,C,me))}
    </section>`}function H(B,te){return c`<div
      class="usage-meter__card"
      id=${Wf}
      role="dialog"
      aria-label=${`${B.provider.label} \uACC4\uC815 \uC0AC\uC6A9\uB7C9`}
    >
      ${N(B.provider,B.snapshot,te)}
      <p class="usage-meter__note">전환은 새로 시작하는 세션부터 적용됩니다.</p>
    </div>`}function W(){let B=Date.now(),te=[];for(let Te of Yf){let C=i.get(Te.key);C&&te.push({provider:Te,snapshot:Zv(C,B)})}if(te.length===0){m(),u();return}let me=te.find(Te=>Te.provider.key===n&&Te.snapshot.accounts.length>0);me||m(),mt(P(te,B),e),e.hidden=!1,me?ne(me,B):p()}function ne(B,te){let me=d(),Te=e.getBoundingClientRect(),C=e.ownerDocument.documentElement.clientWidth;me.style.setProperty("--usage-meter-anchor-top",`${Te.bottom}px`),me.style.setProperty("--usage-meter-anchor-right",`${Math.max(0,C-Te.right)}px`),mt(c`<div
          class="usage-meter__scrim"
          aria-hidden="true"
          @mousedown=${ee}
        ></div>
        ${H(B,te)}`,me)}async function he(B){try{let te=await fetch(B.endpoint);return te.ok?Xv(await te.json(),Date.now()):{kind:"error"}}catch{return{kind:"error"}}}async function qe(){l+=1;let B=l,te=await Promise.all(Yf.map(async me=>({provider:me,read:await he(me)})));if(!(t||B!==l)){for(let me of te){let Te=me.provider.key;if(me.read.kind==="ok"){i.set(Te,me.read.snapshot);continue}if(me.read.kind==="empty"){i.delete(Te);continue}let C=i.get(Te);C!==void 0&&!C.held&&i.set(Te,{...C,held:!0})}W()}}return u(),qe(),o=setInterval(()=>{qe()},6e4),{destroy(){t=!0,o!==null&&(clearInterval(o),o=null),m(),u()}}}function $s(e){let t=e?.blocked_info;return t&&typeof t=="object"?Array.isArray(t.blockers)?t.blockers.filter(r=>typeof r=="string"&&r.length>0):[]:(Array.isArray(e?.dependencies)?e.dependencies:[]).map(r=>{if(typeof r=="string")return r;if(!r||typeof r!="object")return"";let o=r.type??r.dependency_type;return o!==void 0&&o!=="blocks"?"":r.depends_on_id||r.id||""}).filter(Boolean)}var t_="bdui.worker.candidate_sort",xs=Object.freeze([{id:"spec",label:"spec \uC6B0\uC120",chain:[{key:"spec",dir:"desc"},{key:"created",dir:"asc"}]},{id:"bottleneck",label:"\uBCD1\uBAA9 \uC6B0\uC120",chain:[{key:"priority",dir:"asc"},{key:"dependents",dir:"desc"},{key:"released",dir:"desc"}]},{id:"created",label:"\uCD5C\uC2E0 \uC0DD\uC131",chain:[{key:"created",dir:"desc"},{key:"priority",dir:"asc"}]},{id:"updated",label:"\uCD5C\uC2E0 \uC218\uC815",chain:[{key:"updated",dir:"desc"}]}]),aa=Object.freeze({preset:"spec"}),n_=3,r_=Object.freeze([{key:"priority",label:"\uC6B0\uC120\uC21C\uC704"},{key:"dependents",label:"\uD6C4\uC18D \uC218"},{key:"released",label:"\uD574\uC81C \uC2DC\uAC01"},{key:"spec",label:"spec \uC720\uBB34"},{key:"created",label:"\uC0DD\uC131"},{key:"updated",label:"\uC218\uC815"}]);function Jf(e){return xs.some(t=>t.id===e)}function e_(e){let t=xs.find(n=>n.id===e);return t?t.chain.map(n=>({...n})):[]}function Jv(e,t){return e.length===t.length&&e.every((n,r)=>n.key===t[r].key&&n.dir===t[r].dir)}function As(e){return e&&"preset"in e?e_(e.preset):e&&Array.isArray(e.chain)?e.chain.map(t=>({...t})):e_("spec")}function Yl(e){return e&&"preset"in e?e.preset:null}function Hr(e){if(typeof e=="string"){let i;try{i=JSON.parse(e)}catch{return Jf(e)?{preset:e}:aa}return Hr(i)}if(!e||typeof e!="object")return aa;let t=e;if(Jf(t.preset))return{preset:t.preset};let n=t.chain;if(!Array.isArray(n)||n.length===0||n.length>n_||!n.every(wa))return aa;let r=[];for(let i of n)r.some(s=>s.key===i.key)||r.push({key:i.key,dir:i.dir});let o=xs.find(i=>Jv(i.chain,r));return o?{preset:o.id}:{chain:r}}function o_(){try{return Hr(window.localStorage.getItem(t_))}catch{return aa}}function Vl(e){try{window.localStorage.setItem(t_,JSON.stringify(e))}catch{}}function s_(e,t,n){let r=e.map(a=>({...a}));if(!n)return r.slice(0,t);if(!Object.prototype.hasOwnProperty.call(qs,n))return r;let o=n;if(r.slice(0,t).some(a=>a.key===o))return r.slice(0,t);let i={key:o,dir:r[t]&&r[t].key===o?r[t].dir:qs[o]},s=r.slice(0,t),l=r.slice(t+1).filter(a=>a.key!==o);return[...s,i,...l].slice(0,n_)}function i_(e,t){return e.map((n,r)=>r===t?{key:n.key,dir:n.dir==="asc"?"desc":"asc"}:{...n})}function ek(e){let t=new Set(e.map(l=>l.id)),n=new Map,r=new Map;for(let l of e){let a=$s(l).filter(u=>t.has(u));n.set(l.id,a);for(let u of a){let d=r.get(u);d?d.push(l):r.set(u,[l])}}let o=new Set,i=[],s=l=>{o.add(l.id),i.push(l);for(let a of r.get(l.id)??[])!o.has(a.id)&&(n.get(a.id)??[]).every(u=>o.has(u))&&s(a)};for(;i.length<e.length;){let l=e.find(a=>!o.has(a.id)&&(n.get(a.id)??[]).every(u=>o.has(u)));s(l??e.find(a=>!o.has(a.id)))}return i}function a_(e,t){let n=Array.isArray(e)?e.slice():[];return n.sort(Pc(As(t))),ek(n)}function l_(e,t){let n=new Map;if(!e||typeof e!="object")return n;let r=e,o=[],i=new Set;for(let s of t){if(i.has(s.id))continue;i.add(s.id);let l=r[s.id];if(!l||!Array.isArray(l.scope))continue;let a=l.scope.filter(u=>typeof u=="string"&&u.length>0);if(a.length===0){n.set(s.id,{overlaps:[],scope_missing:!0});continue}n.set(s.id,{overlaps:[],scope_missing:!1}),o.push({member:s,scope:a})}for(let s=0;s<o.length;s+=1)for(let l=s+1;l<o.length;l+=1){let a=ci(o[s].scope,o[l].scope);if(a.length===0)continue;let u=o[s].member,d=o[l].member;n.get(u.id)?.overlaps.push({id:d.id,title:d.title,location_label:d.location_label,prefixes:a}),n.get(d.id)?.overlaps.push({id:u.id,title:u.title,location_label:u.location_label,prefixes:a})}return n}var c_=new Set(["sh","bash","zsh","dash","ksh"]),u_=/('(?:[^']*)'|"(?:\\.|[^"\\])*"|#.*|\$(?:\{[^}\n]*\}|[A-Za-z_][A-Za-z0-9_]*|[?#@*!$0-9-])|\b(?:if|then|else|elif|fi|for|while|until|do|done|case|esac|in|function|select|time)\b)/g;function d_(e){let t=e.split("/");return t[t.length-1]||""}function tk(e){let t=e.split(`
`,1)[0];if(!t.startsWith("#!"))return!1;let n=t.slice(2).trim().split(/\s+/).filter(Boolean);if(n.length===0)return!1;let r=d_(n[0]);if(r!=="env")return c_.has(r);let o=n.slice(1).find(i=>!i.startsWith("-")&&!i.includes("="));return o!==void 0&&c_.has(d_(o))}function nk(e){return e.startsWith("#")?"comment":e.startsWith("'")||e.startsWith('"')?"string":e.startsWith("$")?"variable":"keyword"}function rk(e){let t=[],n=0;u_.lastIndex=0;for(let r of e.matchAll(u_)){let o=r.index;o>n&&t.push({text:e.slice(n,o),kind:"plain"}),t.push({text:r[0],kind:nk(r[0])}),n=o+r[0].length}return n<e.length&&t.push({text:e.slice(n),kind:"plain"}),t.length===0&&t.push({text:e,kind:"plain"}),t}function ok(e){return{bad_request:"\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD\uC774 \uC62C\uBC14\uB974\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.",forbidden:"\uB4F1\uB85D\uB418\uC9C0 \uC54A\uC740 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uC758 \uC2A4\uD06C\uB9BD\uD2B8\uB294 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",lane_not_declared:"\uD604\uC7AC \uACE0\uC815 \uC120\uC5B8\uC5D0 \uD574\uB2F9 \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4.",stale_declaration:"\uC800\uC7A5\uC18C \uC791\uC5C5 \uC120\uC5B8\uC774 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uD654\uBA74\uC5D0\uC11C \uB2E4\uC2DC \uC5F4\uC5B4 \uC8FC\uC138\uC694.",too_large:"\uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uB108\uBB34 \uCEE4\uC11C \uD654\uBA74\uC5D0 \uD45C\uC2DC\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",unsupported_content:"\uD14D\uC2A4\uD2B8 \uD615\uC2DD\uC758 \uC2A4\uD06C\uB9BD\uD2B8\uB9CC \uD45C\uC2DC\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.",unreadable:"\uACE0\uC815\uB41C \uC2A4\uD06C\uB9BD\uD2B8 \uB0B4\uC6A9\uC744 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4."}[e]||"\uC2A4\uD06C\uB9BD\uD2B8\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4."}function p_(e){let t=e.getWorkspacePath,n=e.fetchImpl||globalThis.fetch?.bind(globalThis),r=document.createElement("div");r.className="repo-ops-script-viewer-root",document.body.appendChild(r);let o=null,i="loading",s="",l="",a=0,u=null,d=!1;function p(I,P){return P?rk(I).map(F=>F.kind==="plain"?F.text:c`<span
            class="repo-ops-script-viewer__token repo-ops-script-viewer__token--${F.kind}"
            >${F.text}</span
          >`):I}function _(){if(!o)return c``;let I=i==="ready"&&tk(s),P=i==="ready"?s.split(`
`):[];return c`<div
      class="repo-ops-script-viewer"
      role="dialog"
      aria-modal="true"
      aria-label=${`\uC2A4\uD06C\uB9BD\uD2B8 \uB0B4\uC6A9: ${o.path}`}
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
              @click=${()=>{v()}}
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
          ${i==="loading"?c`<div class="repo-ops-script-viewer__status">
                스크립트 불러오는 중…
              </div>`:i==="error"?c`<div
                  class="repo-ops-script-viewer__status repo-ops-script-viewer__status--error"
                >
                  ${l}
                </div>`:c`<div class="repo-ops-script-viewer__code" tabindex="0">
                  ${P.map((F,G)=>c`<div class="repo-ops-script-viewer__row">
                        <span
                          class="repo-ops-script-viewer__line-number"
                          aria-hidden="true"
                          >${G+1}</span
                        ><code class="repo-ops-script-viewer__code-line"
                          >${p(F,I)}</code
                        >
                      </div>`)}
                </div>`}
        </div>
      </section>
    </div>`}function m(){mt(_(),r)}async function v(){if(i!=="ready")return;let I=await gn(s);_e(I?"\uC2A4\uD06C\uB9BD\uD2B8 \uBCF5\uC0AC\uB428":"\uC2A4\uD06C\uB9BD\uD2B8 \uBCF5\uC0AC \uC2E4\uD328",I?"success":"error")}function O(I){I.key==="Escape"&&o&&(I.preventDefault(),K())}function R(){d||(document.addEventListener("keydown",O),d=!0)}function Q(){d&&(document.removeEventListener("keydown",O),d=!1)}async function ee(I,P=null){let F=++a;R(),o={...I},u=P||(document.activeElement instanceof HTMLElement?document.activeElement:null),i="loading",s="",l="",m(),r.querySelector(".repo-ops-script-viewer__close")?.focus();let q=t?t():"";if(!q){i="error",l="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4.",m();return}if(!n){i="error",l="\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD \uAE30\uB2A5\uC744 \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",m();return}let N="/api/repo-ops-script?workspace="+encodeURIComponent(q)+"&lane="+encodeURIComponent(I.lane)+"&base_sha="+encodeURIComponent(I.base_sha);try{let H=await n(N),W=await H.json().catch(()=>({}));if(F!==a)return;if((t?t():"")!==q){K();return}if(!H.ok||!W||W.ok!==!0){i="error",l=ok(W&&typeof W.error=="string"?W.error:""),m();return}o={lane:W.lane,base_sha:W.base_sha,path:W.path,base_ref:W.base_ref},s=String(W.content),i="ready",m()}catch{if(F!==a)return;i="error",l="\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",m()}}function K(){a+=1,Q(),o=null,s="",m();let I=u;u=null,I?.isConnected&&I.focus()}function L(){K(),r.remove()}return{open:ee,close:K,destroy:L}}var f_={deploy_not_declared:"\uC120\uC5B8 \uC5C6\uC74C",deploy_opted_out:"\uC774 workspace\uC5D0\uC11C \uBC30\uD3EC \uC2E4\uD589\uC774 \uAEBC\uC838 \uC788\uC74C",deploy_in_flight:"\uBC30\uD3EC \uC9C4\uD589 \uC911",target_unresolved:"\uB300\uC0C1 tip\uC744 \uD655\uC815\uD558\uC9C0 \uBABB\uD568",remote_history_not_monotonic:"\uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC\uC640 \uC6D0\uACA9 \uC774\uB825\uC774 \uAC08\uB77C\uC9D0"},sk=new Set(["queued","running","retry_pending"]);function __(e){let t=e.queueStore,n=e.transport,r=e.onChanged||(()=>{}),o=e.onOpenScript;function i(){return t&&t.get()||{}}function s(){let N=i();return typeof N.revision=="number"?N.revision:0}function l(N){t&&N&&N.queue&&typeof N.queue=="object"&&t.set(N.queue)}function a(){let N=i().workspace_info;return N&&typeof N=="object"?N:{}}function u(N,H){return c`<span
      class="worker-repo-ops__vd-badge worker-repo-ops__vd-badge--${N}"
      >${H}</span
    >`}function d(N){if(typeof N!="number"||!Number.isFinite(N))return"";let H=N/6e4;return Number.isInteger(H)?`timeout ${H}\uBD84`:`timeout ${Math.round(N/1e3)}\uCD08`}function p(N){let H=d(N);return H?u("config",H):""}function _(N,H,W){return c`<button
      type="button"
      class="worker-repo-ops__vd-cmd worker-repo-ops__vd-cmd--link"
      .textContent=${W.script}
      @click=${ne=>{o&&o({lane:N,base_sha:H.base_sha,path:W.script,base_ref:H.base_ref},ne.currentTarget)}}
    ></button>`}function m(){let N=i().repo_operations;return Array.isArray(N)?N:[]}function v(){let N=a().repo_ops,H=N&&typeof N=="object"?N.repo_id:null;return typeof H=="string"&&H?H:null}function O(){return m().some(N=>N&&N.kind==="deploy"&&sk.has(N.state))}function R(){let N=O(),H=v()===null;return c`<button
      type="button"
      class="worker-repo-ops__deploy-run"
      data-seam="repo-ops-deploy-run"
      ?disabled=${N||H}
      title=${N?"\uBC30\uD3EC \uC9C4\uD589 \uC911":H?"\uC800\uC7A5\uC18C\uB97C \uD655\uC778\uD560 \uC218 \uC5C6\uC74C":"\uC6D0\uACA9 base tip\uC5D0\uC11C \uBC30\uD3EC \uC2A4\uD06C\uB9BD\uD2B8\uB97C 1\uD68C \uC2E4\uD589\uD569\uB2C8\uB2E4"}
      @click=${()=>{P()}}
    >
      배포 실행
    </button>`}function Q(){let N=i().repo_ops_opt_out;return{verify:N?.verify===!0,deploy:N?.deploy===!0}}function ee(N,H){return c`<label class="worker-repo-ops__lane-run">
      <input
        type="checkbox"
        .checked=${!H}
        @change=${W=>{I(N,!W.target.checked)}}
      />
      이 workspace에서 실행
    </label>`}function K(N){let H=typeof N.base_sha=="string"?N.base_sha:"",W=`${N.source_path||"repo-ops/config.toml"} @ ${N.base_ref||"?"}${H?`@${H.slice(0,7)}`:""}`,ne=Q(),he=!!N.verify&&ne.verify,qe=!!N.deploy&&ne.deploy;return c`<section class="worker-repo-ops__vd" data-seam="repo-ops">
      <p class="worker-repo-ops__vd-title">
        저장소 작업 선언
        <span class="worker-repo-ops__vd-src">${W}</span>
      </p>
      <div
        class="worker-repo-ops__lane${he?" worker-repo-ops__lane--skipped":""}"
        data-lane="verify"
      >
        <span class="worker-repo-ops__lane-k">머지 전 검증</span>
        <span class="worker-repo-ops__lane-v"
          >${N.verify?c`${_("verify",N,N.verify)}
              ${p(N.verify.timeout_ms)}
              ${he?u("skipped","\uC774 workspace\uC5D0\uC11C \uAC74\uB108\uB700"):""}`:c`선언 없음${u("absent","verify \uC5C6\uC774 \uD310\uC815")}`}</span
        >
        <span class="worker-repo-ops__lane-d"
          >${he?"\uC774 workspace\uC5D0\uC11C\uB294 \uAC80\uC99D \uC5C6\uC774 \uD310\uC815\uD569\uB2C8\uB2E4.":N.verify?"\uBA38\uC9C0 \uC804\uC5D0 \uC774 \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uD1B5\uACFC\uD574\uC57C \uC790\uACA9\uC744 \uC5BB\uC2B5\uB2C8\uB2E4.":"\uBA38\uC9C0 \uC790\uACA9\uC740 PR/base/head \uC2E0\uC120\uB3C4\xB7mergeability\xB7\uB9AC\uBDF0 \uC601\uC218\uC99D\uC73C\uB85C\uB9CC \uD310\uC815\uD569\uB2C8\uB2E4."}</span
        >
        ${N.verify?ee("verify",ne.verify):""}
      </div>
      <div
        class="worker-repo-ops__lane${qe?" worker-repo-ops__lane--skipped":""}"
        data-lane="deploy"
      >
        <span class="worker-repo-ops__lane-k">머지 후 배포</span>
        <span class="worker-repo-ops__lane-v"
          >${N.deploy?c`${_("deploy",N,N.deploy)}
              ${p(N.deploy.timeout_ms)}
              ${qe?u("skipped","\uC774 workspace\uC5D0\uC11C \uAC74\uB108\uB700"):R()}`:c`선언 없음${u("absent","\uBC30\uD3EC \uC5C6\uC74C")}`}</span
        >
        <span class="worker-repo-ops__lane-d"
          >${qe?"\uC774 workspace\uC5D0\uC11C\uB294 \uBC30\uD3EC \uC5C6\uC774 \uACE7\uBC14\uB85C \uC815\uB9AC\uB85C \uB118\uC5B4\uAC11\uB2C8\uB2E4.":N.deploy?c`Worker가 <code>.worktrees/.repo-ops-deploy</code>에서 대상
                  SHA로 정렬한 뒤 1회 실행합니다.`:"\uBA38\uC9C0 \uD6C4 \uBC30\uD3EC \uB2E8\uACC4 \uC5C6\uC774 \uACE7\uBC14\uB85C \uC815\uB9AC\uB85C \uB118\uC5B4\uAC11\uB2C8\uB2E4."}</span
        >
        ${N.deploy?ee("deploy",ne.deploy):""}
      </div>
    </section>`}function L(N){let H=N.repo_ops&&typeof N.repo_ops=="object"?N.repo_ops:null;return H&&(H.status==="resolved"||H.status==="absent")?K(H):H&&(H.status==="pending"||H.status==="error")?c`<section class="worker-repo-ops__vd" data-seam="repo-ops">
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
          ${H.status==="pending"?"\uC120\uC5B8 \uD655\uC778 \uC911":c`선언 읽기
              실패${H.error_code?c` — <code>${H.error_code}</code>`:""}`}
        </div>
      </section>`:c`<section class="worker-repo-ops__vd" data-seam="repo-ops">
      <p class="worker-repo-ops__vd-title">저장소 작업 선언</p>
      <div class="worker-repo-ops__vd-line worker-repo-ops__vd-absent">
        선언 확인 중
      </div>
    </section>`}async function I(N,H){if(!n)return;let W=await n("worker-repo-ops-opt-out-toggle",{kind:N,opted_out:H,expected_revision:s()});if(l(W),W&&W.conflict){let ne=await n("worker-repo-ops-opt-out-toggle",{kind:N,opted_out:H,expected_revision:s()});l(ne)}r()}async function P(){let N=v();if(!n||N===null)return;let H=await n("worker-repo-operation-deploy-run",{repo_id:N});if(l(H),!H||H.ok!==!0){let W=H&&typeof H.reason=="string"?H.reason:"",ne=Object.hasOwn(f_,W)?f_[W]:W||"\uBC30\uD3EC \uC2E4\uD589\uC744 \uC2DC\uC791\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4";_e(`\uBC30\uD3EC \uC2E4\uD589 \uAC70\uBD80 \u2014 ${ne}`,"error")}else _e("\uBC30\uD3EC \uC2E4\uD589\uC744 \uC2DC\uC791\uD588\uC2B5\uB2C8\uB2E4","success");r()}let F={owned_deploy_worktree_fetch_detached_alignment_recreate:"\uC804\uC6A9 \uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC \uC815\uB82C\xB7\uBCF5\uAD6C",recovered_pre_execution_fetch_timeout_retry_once:"fetch \uD0C0\uC784\uC544\uC6C3 1\uD68C \uBCF5\uAD6C",repo_serial_lock_wait:"\uC800\uC7A5\uC18C \uC21C\uCC28 \uC2E4\uD589 \uB300\uAE30",restart_operation_adoption:"\uC7AC\uC2DC\uC791 \uD6C4 \uC791\uC5C5 \uC778\uACC4",exact_input_exit_zero_evidence_adoption:"\uB3D9\uC77C \uC785\uB825 \uC131\uACF5 \uC99D\uAC70 \uC778\uACC4",descendant_success_covers_ancestor_rows:"\uCD5C\uC2E0 SHA \uC131\uACF5\uC774 \uC774\uC804 \uD589 \uCEE4\uBC84",owned_verify_candidate_cleanup:"\uAC80\uC99D \uC784\uC2DC \uCCB4\uD06C\uC544\uC6C3 \uC815\uB9AC",bounded_single_script_retry_exceeded:"\uB2E8\uC77C \uC2A4\uD06C\uB9BD\uD2B8 \uC7AC\uC2DC\uB3C4 \uD55C\uB3C4 \uCD08\uACFC",repair_session_dispatch:"\uC2E4\uD328 \uD574\uACB0 \uC138\uC158 \uC790\uB3D9 \uC2E4\uD589",baseline_failure_ignore:"\uAE30\uC874 \uC2E4\uD328 \uBB34\uC2DC",config_or_script_deletion_to_bypass_gate:"\uC124\uC815\xB7\uC2A4\uD06C\uB9BD\uD2B8 \uC0AD\uC81C\uB85C \uAC8C\uC774\uD2B8 \uC6B0\uD68C",credential_entry:"\uC790\uACA9\uC99D\uBA85 \uC785\uB825\xB7\uCD9C\uB825",destructive_action:"\uD30C\uAD34\uC801 \uC791\uC5C5",history_rewrite:"\uD788\uC2A4\uD1A0\uB9AC \uC7AC\uC791\uC131",agent_self_report_as_success:"\uC138\uC158 \uC790\uAE30\uBCF4\uACE0\uB97C \uC131\uACF5 \uCC98\uB9AC"};function G(N,H,W){return c`<div class="worker-repo-ops__policy-group" data-policy=${W}>
      <div class="worker-repo-ops__policy-label">${N}</div>
      <ul class="worker-repo-ops__policy-list">
        ${H.map(ne=>c`<li data-token=${ne}>
              ${F[ne]||ne}
            </li>`)}
      </ul>
    </div>`}function q(){let N=i(),H=N.repo_operation_policy&&typeof N.repo_operation_policy=="object"?N.repo_operation_policy:null;return H?c`<section
      class="worker-repo-ops__repair"
      data-seam="repo-ops-policy"
    >
      <details class="worker-repo-ops__policy" data-seam="policy-lists">
        <summary>
          Worker 자동 처리 기준
          <span class="worker-repo-ops__policy-count"
            >자동 ${(H.worker_automatic||[]).length} · 금지
            ${(H.never_automatic||[]).length}</span
          >
        </summary>
        ${H.supported===!1?c`<div
              class="worker-repo-ops__policy-group"
              data-policy="policy-schema"
            >
              ${`\uACC4\uC57D \uC2A4\uD0A4\uB9C8 \uBD88\uC77C\uCE58 \u2014 \uC790\uB3D9 \uC7AC\uC2DC\uB3C4\uAC00 \uC815\uC9C0\uB418\uC5C8\uC2B5\uB2C8\uB2E4 (v${H.schema_version})`}
            </div>`:""}
        ${G("Worker\uAC00 \uC790\uB3D9 \uCC98\uB9AC",H.worker_automatic||[],"worker-automatic")}
        ${G("\uC790\uB3D9\uC73C\uB85C \uD558\uC9C0 \uC54A\uC74C",H.never_automatic||[],"never-automatic")}
      </details>
    </section>`:""}return{template(){return c`<details class="worker-repo-ops-settings">
        <summary class="worker-repo-ops-settings__summary">
          저장소 작업 · 검증/배포 선언
        </summary>
        ${L(a())} ${q()}
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
      title=${e.at?on(e.at):""}
      >${_i(e.at)||"\u2014"}</span
    >
    <span class="worker-ev__node" aria-hidden="true"
      ><span class="worker-ev__dot worker-ev__dot--${g_(e)}"></span
    ></span>
    <div class="worker-ev__body">
      <div class="worker-ev__line1">
        <span class="worker-ev__what">${ck(n)}</span>
        <span class="worker-ev__meta"
          >${n.target_base}@${fi(n.target_sha)}${typeof n.elapsed_ms=="number"?` \xB7 ${jr(n.elapsed_ms)}`:""}</span
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
      ${b_([{term:"\uC2E4\uD328 \uCF54\uB4DC",value:r?o:""},{term:"script",value:[n.script_path||"",n.script_blob_sha?`blob ${fi(n.script_blob_sha)}`:"",Number.isInteger(n.exit_code)?`exit ${n.exit_code}`:""].filter(Boolean).join(" \xB7 ")},{term:"\uB85C\uADF8",value:n.log_path||"",copy:!0},{term:"\uCD9C\uB825",value:n.output_tail||""}])}
    </div>
  </li>`}function bk(e){let t=e.cleanup,n=Fr(t.step);return c`<li
    class="worker-ev"
    data-bead-id=${t.bead_id}
    data-state="cleanup_stalled"
  >
    <span
      class="worker-ev__t"
      title=${e.at?on(e.at):""}
      >${_i(e.at)||"\u2014"}</span
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
  </section>`}function v_(e,t={}){let n=null;function r(){if(n===null){mt(c``,e);return}let s=pk(n.operations,n.cleanup_failures,{expanded:n.expanded});mt(yk({events:s.visible,hidden:s.hidden,expanded:n.expanded,repo:n.repo,repo_ops:n.repo_ops}),e)}e.addEventListener("click",s=>{let l=s.target;if(l?.closest?.('[data-seam="repo-ops-close"]')){i();return}l?.closest?.('[data-seam="repo-ops-more"]')&&n&&(n.expanded=!n.expanded,r())});function o(s){n={operations:s.operations,cleanup_failures:s.cleanup_failures,repo:s.repo||"",repo_ops:s.repo_ops||null,expanded:!1},r()}function i(){n!==null&&(n=null,r(),t.onClose&&t.onClose())}return{open:o,close:i,isOpen:()=>n!==null,refresh(s){n&&(n={operations:s.operations,cleanup_failures:s.cleanup_failures,repo:s.repo||"",repo_ops:s.repo_ops||null,expanded:n.expanded},r())}}}var vk="session-preferred",kk=["external_roundtrip","user_feedback_loop"];function k_(e,t){if(!Ko(e).includes(vk)||typeof t!="object"||t===null)return"";let n=t.session_preferred_reason;return typeof n=="string"&&kk.includes(n)?n:""}var wk="spec-after-blocker";function w_(e,t){return Ko(e).includes(wk)&&Array.isArray(t)&&t.length>0}var $k=Kt("views:worker:adapter"),xk="tab:worker:ready",Ak="tab:worker:blocked",Sk="tab:worker:in-progress",Ek="tab:worker:resolved",Tk="tab:worker:closed",Ck="\u{1F512} blocked",Ok={revision:0,auto_advance:!1,auto_merge:!1,slots:Oi,queue:[],serial_lanes:[],serial_lane_count:0,pr_wait:[],done:[]},Rk=["claude_account","codex_account"],Ik=[...fo,...Rk];function Lk(e){let t=e&&e.parent;return(typeof t=="string"?t.length>0:!!(t&&t.id))||/\.\d+$/.test(e&&e.id||"")}function Dk(e){let t=e&&typeof e=="object"?e.awaiting_user:void 0,n=typeof t=="string"?t.trim():"";return n.length>0?`${Za}: ${n}`:Za}function $r(e){return e&&typeof e=="object"?e:{}}function Pk(e){let t={};for(let n of Ik){let r=e[n];typeof r=="string"&&r.length>0&&(t[n]=r)}return t}function Mk(e){let t=new Map;for(let r of e){if(!r||typeof r.id!="string"||r.id.length===0)continue;let o=$r(r.metadata).carried_from;if(!(typeof o!="string"||o.length===0))for(let i of $s(r)){let s=t.get(i);s||(s=new Set,t.set(i,s)),s.add(r.id)}}let n=new Map;for(let[r,o]of t)n.set(r,[...o].sort());return n}function qk(e){let t=e.replace(/\/+$/,""),n=t.lastIndexOf("/");return n>=0?t.slice(n+1):t}function $_(e={}){let{queueStore:t,issueStores:n,transport:r,getWorkspacePath:o,onInvalidate:i}=e,s=n?no(n):null,l=new Map,a={},u=null,d=0,p=null,_=!1;function m(){_||!i||i()}function v(P){return u===P?a:{}}async function O(){if(!r||_)return;let P=o?.()||"";if(u===P||p&&p.key===P&&p.generation===d)return;let F=++d;p={key:P,generation:F};let G=null;try{G=await Promise.resolve(r("get-session-defaults",{}))}catch(q){if(F!==d)return;p=null,$k("get-session-defaults failed: %o",q),m();return}F===d&&(a=G&&typeof G.values=="object"&&G.values!==null?{...G.values}:{},u=P,p=null,m())}function R(){u=null,d+=1,O()}function Q(){for(let[P,F]of l)F==="failed"&&l.delete(P)}function ee(P,F){return s?s.selectBoardColumn(P,F):[]}function K(P,F,G,q){let N=new Set(G.map(B=>B.id)),H=new Set,W=new Map,ne=[];for(let B of[...F,...G]){if(H.has(B.id)||Lk(B))continue;let te=Go(B,P);te.location===null&&(H.add(B.id),W.set(B.id,te),ne.push(B))}let he=a_(ne,Hr(q)),qe=$r(P.bead_scope);return he.map(B=>{let te=W.get(B.id),me=eo(B),Te=me.evidence==="published",C=typeof B.workflow?.route=="string"&&B.workflow.route||(B.metadata&&typeof B.metadata.route=="string"?B.metadata.route:""),se=te.worker_ineligible,ve=se||!Object.hasOwn(B,"labels")?"":k_(B.labels,B.metadata),ye=N.has(B.id),De=ye?$s(B):[],ge=[];ye&&De.length===0&&ge.push(Ck),te.awaiting_user&&ge.push(Dk(B.metadata)),te.missing_description?ge.push("missing_description"):te.spec==="conflict"?ge.push("spec_id_conflict"):te.spec==="none"?ge.push("spec \uC5C6\uC74C"):te.spec==="draft"&&ge.push("spec \uBBF8\uBC1C\uD589(draft)");let Re=qe[B.id];return{bead_id:B.id,title:B.title||B.id,route:C,spec_id:me.conflict?"":me.path,published:Te,blocked:ye,blocked_by:De,labels:Array.isArray(B.labels)?B.labels:[],created_at:B.created_at,updated_at:B.updated_at,status:B.status,workflow:B.workflow||null,exec_pins:Pk($r(B.metadata)),rec:null,...Re&&Array.isArray(Re.scope)?{scope:Re.scope}:{},eligible:te.placeable,route_ok:te.route_ok,awaiting_user:te.awaiting_user,missing_description:te.missing_description,placement_spec:te.spec,reason:ge.join(" \xB7 "),worker_ineligible:se,session_preferred:ve.length>0,session_preferred_reason:ve,spec_after_blocker:w_(B.labels,De),release_info:B.release_info,dependents_info:B.dependents_info}})}function L(P){let[F,G,q,N,H]=P,W=Fs([...F,...G,...q,...N,...H]),ne=Mk([...F,...G,...q,...N]),he={},qe=(B,te)=>{if(!B||typeof B.id!="string"||B.id.length===0)return;let me=he[B.id]||(he[B.id]={});if(typeof B.priority=="number"&&!("priority"in me)&&(me.priority=B.priority),typeof B.from_id=="string"&&!("from_id"in me)&&(me.from_id=B.from_id),te&&!("metadata"in me)){me.metadata=$r(B.metadata);let Te=$r(B.workflow).route;typeof Te=="string"&&Te.length>0&&(me.route=Te)}};for(let B of[...F,...G,...q])qe(B,!0);for(let B of[...N,...H])qe(B,!1);for(let B of new Set([...Object.keys(he),...W.keys()])){let te=Bs(W,B);if(te.total>0){let me=he[B]||(he[B]={});me.rollup=te}}for(let[B,te]of ne){let me=he[B]||(he[B]={});me.carried_to=te}return he}function I(P,F,G,q){let N=new Set((Array.isArray(P.done)?P.done:[]).map(W=>W?.bead_id).filter(W=>typeof W=="string")),H=[];for(let W of F){let ne=ur(W.closed_at);if(typeof W.id!="string"||N.has(W.id)||ne===null||q!==void 0&&ne<q||typeof W.comment_count!="number"||W.comment_count<=0)continue;let he=`${G}\0${W.id}\0${String(W.updated_at)}\0${W.comment_count}`,qe=l.get(he);if(qe===void 0&&r&&(l.set(he,"pending"),Promise.resolve(r("get-comments",{id:W.id})).then(te=>{let me=Array.isArray(te)&&te.some(Te=>Ki(typeof Te?.text=="string"?Te.text:"")?.lane==="session");l.set(he,me?"session":"not-session"),m()}).catch(()=>{l.set(he,"failed"),m()})),qe!=="session")continue;let B=ur(W.started_at);H.push({id:W.id,title:W.title||W.id,reason:"",draggable:!1,done:!0,lane:"done",selectable:!1,selected:!1,badges:["\uC138\uC158 \uC791\uC5C5"],alert:!1,usage:null,work_ms:B!==null&&ne>=B?ne-B:null,work_kind:"session",done_at:ne,created_at:W.created_at,updated_at:W.updated_at})}return H}return{read(P){if(!t)return{workspaces:[],workspaces_state:[]};let F=t.get()||Ok,G=o?.()||"",q=P&&typeof P.done_since=="number"?P.done_since:void 0,N=ee(xk,"ready"),H=ee(Ak,"blocked"),W=ee(Sk,"in_progress"),ne=ee(Ek,"resolved"),he=ee(Tk,"closed");return{workspaces:[{...F,bead_titles:{...$r(F.bead_titles),...Object.fromEntries([...N,...H].filter(qe=>qe&&typeof qe.id=="string").map(qe=>[qe.id,qe.title||qe.id]))},root_dir:G,name:qk(G),runnable:K(F,N,H,P?P.candidate_sort:void 0),session_done:I(F,he,G,q),bead_overlay:L([N,H,W,ne,he])}],workspaces_state:[{root_dir:G,revision:F.revision,auto_advance:F.auto_advance,auto_merge:F.auto_merge,slots:typeof $r(F.workspace_info).slots=="number"?$r(F.workspace_info).slots:F.slots,runner_catalog:F.runner_catalog,execution_defaults:F.execution_defaults,session_defaults:v(G),orchestration_model:F.orchestration_model,orchestration_effort:F.orchestration_effort,orchestration_speed:F.orchestration_speed,quick_fix_orchestration_model:F.quick_fix_orchestration_model,quick_fix_orchestration_effort:F.quick_fix_orchestration_effort,quick_fix_orchestration_speed:F.quick_fix_orchestration_speed,issue_prefix:""}]}},ensureSessionDefaults(){O()},refreshSessionDefaults:R,notifyIssuesChanged:Q,destroy(){_=!0,d+=1,p=null,l.clear()}}}var la=1,x_=5,Nk={root_dir:"",name:"",auto_advance:!1,auto_merge:!1,slots:la,revision:0,runner_catalog:{},items:[],sublanes:{parallel:[],serial:[]},serial_lane_count:0,raw_queue_length:0,live_count:0,over_cap:!1,merge:{positions:new Map,resolutions:new Map,continuations:new Map,authorities:new Map,state:{active:null,failures:{},waiting:null},auto_excluded:[],running:!1},token_total:null,cleanup_failures:[],declared_base:null,repo_operations:[]};function Dt(e){return e&&typeof e=="object"?e:{}}var E_="beads-ui.worker.candidate-filter",Xl={show_blocked:!1,readiness:"all"};function jk(){try{let e=window.localStorage.getItem(E_);if(!e)return{...Xl};let t=JSON.parse(e);if(!t||typeof t!="object")return{...Xl};let n=t.readiness;return{show_blocked:t.show_blocked===!0,readiness:n==="ready"||n==="not_ready"?n:"all"}}catch{return{...Xl}}}function Fk(e){try{window.localStorage.setItem(E_,JSON.stringify(e))}catch{}}var T_="bdui.worker.done-range";function Bk(){try{let e=window.localStorage.getItem(T_);return e===null?"today":Hn(e)}catch{return"today"}}function Uk(e){try{window.localStorage.setItem(T_,e)}catch{}}function A_(e){let t=Array.isArray(e)&&e.length>0?e[0]:null;if(!t)return"";let n=typeof t.title=="string"?t.title:t.id||"";return n.length>22?`${n.slice(0,22)}\u2026`:n}function Wk(e){return e==="receipt_not_current"?"\uB9AC\uBDF0 \uD6C4\uC5D0\uB3C4 \uC601\uC218\uC99D\uC774 \uCD5C\uC885 head\uC5D0 \uC720\uD6A8\uD558\uC9C0 \uC54A\uC74C":e==="cancelled"?"\uB9AC\uBDF0 \uC138\uC158 \uCDE8\uC18C\uB428":e.startsWith("launch_failed:")?`\uB9AC\uBDF0 \uC138\uC158 \uC2DC\uC791 \uC2E4\uD328(${e.slice(14)})`:e.startsWith("session_failed:")?`\uB9AC\uBDF0 \uC138\uC158 \uBE44\uC815\uC0C1 \uC885\uB8CC(${e.slice(15)})`:`\uB9AC\uBDF0 \uC138\uC158 \uC2E4\uD328(${e})`}function S_(e){if(e.startsWith("receipt_unbacked:"))return`\uC2E4\uD589 \uC601\uC218\uC99D \uC790\uB3D9 \uAC80\uC99D \uBD88\uAC00(${e.slice(17)}) \u2014 [\uBA38\uC9C0] \uD074\uB9AD\uC73C\uB85C \uC218\uB3D9 \uC9C4\uD589 \uAC00\uB2A5`;switch(e){case"not_in_pr_wait":return"PR \uB300\uAE30 \uC0C1\uD0DC \uB3D9\uAE30\uD654 \uC2E4\uD328";case"resolution_round_cap":return"\uCDA9\uB3CC \uD574\uC18C 2\uD68C \uCD08\uACFC";case"resolution_rebase_cap":return"\uD050 \uC7AC\uCDA9\uB3CC 3\uD68C \uCD08\uACFC";case"resolution_timeout":return"\uCDA9\uB3CC \uD574\uC18C \uB300\uAE30 \uC2DC\uAC04 \uCD08\uACFC";case"resolution_refused":return"\uD574\uC18C \uC138\uC158 \uB514\uC2A4\uD328\uCE58 \uAC70\uBD80";case"worktree_missing":return"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uD574\uC18C \uD544\uC694";case"worktree_restore_branch_mismatch":return"\uC6CC\uD06C\uD2B8\uB9AC \uBCF5\uC6D0 \uC2E4\uD328 \u2014 \uBE0C\uB79C\uCE58 \uC774\uB984 \uBD88\uC77C\uCE58";case"worktree_restore_path_exists":return"\uC6CC\uD06C\uD2B8\uB9AC \uBCF5\uC6D0 \uC2E4\uD328 \u2014 \uACBD\uB85C \uC774\uBBF8 \uC788\uC74C";case"worktree_restore_branch_missing":return"\uC6CC\uD06C\uD2B8\uB9AC \uBCF5\uC6D0 \uC2E4\uD328 \u2014 origin\uC5D0 \uBE0C\uB79C\uCE58 \uC5C6\uC74C";case"worktree_restore_branch_diverged":return"\uC6CC\uD06C\uD2B8\uB9AC \uBCF5\uC6D0 \uC2E4\uD328 \u2014 \uB85C\uCEEC \uBE0C\uB79C\uCE58\uAC00 origin\uACFC \uB2E4\uB984";case"worktree_restore_failed":return"\uC6CC\uD06C\uD2B8\uB9AC \uBCF5\uC6D0 \uC2E4\uD328";case"merge_unconfirmed_timeout":return"\uBA38\uC9C0 \uD655\uC778 \uC2DC\uAC04 \uCD08\uACFC";case"pr_closed_unmerged":return"PR \uB2EB\uD798";case"merge_error":return"\uBA38\uC9C0 \uC624\uB958";case"spec_id_missing":return"\uC2A4\uD399 ID \uAE30\uB85D \uC5C6\uC74C";default:return e}}function zk(e){if(e==="lane_occupied")return"\uC2E4\uD589 \uB808\uC778\uC5D0 \uB0A8\uC544 \uC788\uC5B4 \uBA38\uC9C0 \uB300\uC0C1\uC774 \uC544\uB2D9\uB2C8\uB2E4";let t="\uBA38\uC9C0 \uD050\uC5D0 \uB123\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 (\uC774\uBBF8 \uB300\uAE30 \uC911\uC774\uAC70\uB098 \uB300\uC0C1 \uC544\uB2D8)";return typeof e=="string"&&e.length>0?`${t}: ${e}`:t}function Hk(e){switch(e){case"no_terminal_failure":return"\uC774 \uD589\uC5D0 \uC774\uC5B4\uBC1B\uC744 terminal \uC2E4\uD328 \uAE30\uB85D\uC774 \uC5C6\uC2B5\uB2C8\uB2E4";case"tmux_unavailable":return"tmux\uC5D0 \uB2FF\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 \u2014 \uC138\uC158\uC744 \uB744\uC6B0\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4";case"launch_failed:claude_not_found":return"claude \uC2E4\uD589 \uD30C\uC77C\uC744 PATH\uC5D0\uC11C \uCC3E\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4";case"launch_failed:new_session":return"tmux \uC138\uC158\uC744 \uB9CC\uB4E4\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4";case"launch_failed:new_window":return"tmux \uCC3D\uC744 \uB9CC\uB4E4\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4";case"launch_failed:exited":return"\uB744\uC6B4 \uC138\uC158\uC774 \uACE7\uBC14\uB85C \uC885\uB8CC\uB410\uC2B5\uB2C8\uB2E4";case"error":return"\uC138\uC158 \uAE30\uB3D9 \uC911 \uC624\uB958\uAC00 \uB0AC\uC2B5\uB2C8\uB2E4";default:return typeof e=="string"&&e.length>0?e:"\uC138\uC158\uC744 \uB744\uC6B0\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"}}function Kk(e){switch(e){case"no_session_ref":return"\uAE30\uB85D\uB41C \uC138\uC158 \uC5C6\uC74C";case"unsafe_session_id":return"\uC138\uC158 ID\uB97C \uC778\uC790\uB85C \uC4F8 \uC218 \uC5C6\uC74C";case"provider_mismatch":return"\uAE30\uB85D\uB41C \uC138\uC158\uC774 claude\uAC00 \uC544\uB2D8";case"not_local":return"\uAE30\uB85D\uB41C \uC138\uC158\uC758 transcript\uAC00 \uC774 \uAE30\uAE30\uC5D0 \uC5C6\uC74C";case"bd_unavailable":return"Bead \uBA54\uD0C0\uB370\uC774\uD130\uB97C \uC77D\uC9C0 \uBABB\uD568";default:return typeof e=="string"&&e.length>0?e:"\uC0AC\uC720 \uBBF8\uC0C1"}}function Gk(e){if(!e||typeof e!="object")return"\uC138\uC158 \uAE30\uB3D9 \uC751\uB2F5\uC744 \uBC1B\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4";if(e.conflict===!0)return"\uD050\uAC00 \uBC14\uB00C\uC5B4 \uD074\uB9AD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uB20C\uB7EC\uC8FC\uC138\uC694";if(e.session==="already_running")return"\uC774\uBBF8 \uC774 \uC774\uC288\uC758 \uD574\uACB0 \uC138\uC158\uC774 \uC5F4\uB824 \uC788\uC2B5\uB2C8\uB2E4";if(e.launched!==!0)return`\uC138\uC158\uC5D0\uC11C \uD574\uACB0 \uAC70\uBD80: ${Hk(e.reason)}`;let t=e.bridge_active===!0?"":" (Discord \uC911\uACC4 \uBE44\uD65C\uC131 \u2014 tmux\uC5D0\uC11C \uB2F5\uD558\uC138\uC694)";return e.mode==="fork"?`\uAE30\uB85D\uB41C \uC138\uC158\uC744 fork\uD574 \uB744\uC6E0\uC2B5\uB2C8\uB2E4${t}`:`\uC0C8 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4 \u2014 ${Kk(e.fallback_reason)}${t}`}function Yk(e){return e&&e.launched===!0?"success":"error"}function Vk(e){if(e==="worker_sessions_busy")return"\uD574\uC18C \uB300\uAE30 \u2014 \uC2E4\uD589 \uC2AC\uB86F \uB300\uAE30 \uC911";if(typeof e!="string"||!e.startsWith("completion_waiting:"))return null;let t=e.slice(19);if(t.length===0)return null;switch(t){case"gating":return"\uBA38\uC9C0 \uC870\uAC74 \uD655\uC778 \uC911";case"merging":return"\uBA38\uC9C0 \uC911";case"cleaning":return"\uB9C8\uBB34\uB9AC \uC911";case"paused":return"\uC790\uB3D9 \uC9C4\uD589 \uC77C\uC2DC\uC815\uC9C0";case"needs_human":return"\uD655\uC778 \uD544\uC694";default:return null}}function Qk(e){if(!e||typeof e!="object")return null;switch(e.state){case"waiting":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC911",live:!0};case"yielded":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uACC4\uC18D \uC911 \xB7 \uC644\uB8CC \uD6C4 \uC6B0\uC120 \uBA38\uC9C0",live:!0};case"ready":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC644\uB8CC \xB7 \uC7AC\uAC80\uC99D \uB300\uAE30",live:!1};default:return null}}var Xk=new Set(["paused","needs_human","waiting_metadata","reviewing","retrying"]),Zk=new Set(["waiting_metadata","reviewing","retrying"]),Zl=new Set(["review_receipt_missing","review_receipt_stale","review_receipt_invalid","review_receipt_undetermined"]);function Jk(e){let t=e&&typeof e=="object"?e.auto_resolution:null,n=t&&typeof t=="object"&&!Array.isArray(t)?t:null;if(!n||!e)return null;let r=typeof n.origin_reason=="string"&&n.origin_reason.length>0?`\uC6D0 \uC0AC\uC720: ${n.origin_reason}`:"";switch(e.phase){case"waiting_metadata":return{label:"\uC815\uC815 \uB300\uAE30",details:[r,"\uBA54\uD0C0\uB370\uC774\uD130 \uC815\uC815\uC774 \uAD00\uCE21\uB418\uBA74 \uC790\uB3D9 \uC7AC\uAC1C"].filter(Boolean),live:!1};case"retrying":{let o=Number.isInteger(n.attempts)?Math.max(0,Number(n.attempts)):0,i=Number.isInteger(n.attempt_cap)&&Number(n.attempt_cap)>0?Number(n.attempt_cap):0,s=typeof n.next_at=="number"?on(n.next_at):"",l=typeof n.last_error=="string"&&n.last_error.length>0?n.last_error:"";return{label:i>0?`\uC7AC\uC2DC\uB3C4 ${Math.min(o,i)}/${i}`:`\uC7AC\uC2DC\uB3C4 ${o}`,details:[r,s?`\uB2E4\uC74C \uC2DC\uAC01 ${s}`:"",l?`\uB9C8\uC9C0\uB9C9 \uC624\uB958: ${l}`:""].filter(Boolean),live:!0}}default:return null}}function ew(e){if(typeof e!="string")return"";for(let t of["retry_exhausted:","auto_review_exhausted:"])if(e.startsWith(t))return e.slice(t.length);return""}function tw(e,t=null){if(!e||typeof e!="object")return null;let n="";switch(e.phase){case"gating":n="\uBA38\uC9C0 \uC870\uAC74 \uD655\uC778 \uC911";break;case"merging":n="\uBA38\uC9C0 \uC911";break;case"cleaning":n="\uB9C8\uBB34\uB9AC \uC911";break;case"waiting_metadata":case"reviewing":case"retrying":if(!t)return null;n=t.label;break;case"paused":n="\uC790\uB3D9 \uC9C4\uD589 \uC77C\uC2DC\uC815\uC9C0";break;case"needs_human":n="\uD655\uC778 \uD544\uC694";break;case"completed":return null;default:return null}let r=[n];e.head_sha&&r.push(`head ${e.head_sha}`),e.base_sha&&r.push(`base ${e.base_sha}`),(e.failure_stage||e.failure_reason)&&r.push(`${e.failure_stage||"failure"} \xB7 ${e.failure_reason||"\uC6D0\uC778 \uBBF8\uC0C1"}`);let o=ew(e.terminal_reason);o&&r.push(`\uC6D0 \uC0AC\uC720: ${o}`);let i=e.phase==="needs_human"&&!o?zr(e.terminal_reason):null;i&&r.push(e.failure_stage?`${e.failure_stage} \xB7 ${i}`:i);for(let s of t?t.details:[])r.push(s);return e.active_attempt_id&&r.push(`attempt ${e.active_attempt_id}`),e.evidence&&r.push(e.evidence),e.log_path&&r.push(e.log_path),{badge:n,title:r.join(`
`),alert:e.phase==="needs_human",lock_actions:!Xk.has(e.phase)}}function nw(e){if(!e||typeof e!="object")return[];let t=e.blocking_codes;return Array.isArray(t)?t.filter(n=>typeof n=="string"&&n.length>0):[]}function rw(e){if(!e||typeof e!="object")return[];let t=e.badge_codes;return Array.isArray(t)?t.filter(n=>typeof n=="string"&&n.length>0):[]}function ow(e){let t=e.queue_failure?`\uBA38\uC9C0 \uC2E4\uD328 \uC6D0\uBB38: ${e.queue_failure}`:e.auto_skip?`\uC790\uB3D9 \uC81C\uC678 \uC6D0\uBB38: ${e.auto_skip}`:"",n=(i,s={})=>{let l=[s.title||"",t].filter(Boolean);return{label:i,title:l.join(`
`),live:s.live===!0,alert:s.alert===!0}};if(e.continuation_required)return n("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694",{alert:!0});if(e.queueing)return e.queueing==="cleanup"?n("\uC815\uB9AC \uC7AC\uC2DC\uB3C4 \uC694\uCCAD \uC911",{title:"\uC11C\uBC84 \uC751\uB2F5\uC744 \uAE30\uB2E4\uB9AC\uB294 \uC911\uC785\uB2C8\uB2E4",live:!0}):n("\uD050 \uB4F1\uB85D \uC911",{title:"\uBA38\uC9C0 \uD050\uC5D0 \uB123\uB294 \uC911 \u2014 \uC11C\uBC84 \uC751\uB2F5\uC744 \uAE30\uB2E4\uB9BD\uB2C8\uB2E4",live:!0});if(e.merge_step)return e.gate?.tier==="merged"?n("\uBA38\uC9C0\uB428",{title:e.merge_step.label,alert:e.merge_step.failed===!0}):n("\uBA38\uC9C0 \uC911",{title:e.merge_step.label,live:!0});if(e.conflict_badge)return n(e.conflict_badge,{live:e.conflict_live===!0});if(e.auto_resolution)return n(e.auto_resolution.label,{title:e.auto_resolution.details.join(`
`),live:e.auto_resolution.live===!0});if(e.recovery?.lock_actions)return n(e.recovery.badge,{title:e.recovery.title,live:!0});if(e.cleanup_failed)return n(e.cleanup_label?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${e.cleanup_label}`:"\uC815\uB9AC \uBA48\uCDA4",{title:e.cleanup_failed.reason||"",alert:!0});if(e.base_exception)return n("\uB2E4\uB978 base \uB300\uC0C1",{title:e.base_exception,alert:!0});let r=nw(e.receipt_check),o=e.conflicting||e.gate?.reason==="base_behind"||r.length>0;if(e.auto_pending&&o)return n("\uD655\uC778 \uC911",{title:"\uBA38\uC9C0 \uD050\uAC00 \uC790\uB3D9\uC73C\uB85C \uCC98\uB9AC \uC911 \u2014 \uB2E4\uC74C \uAD00\uCE21\uC744 \uAE30\uB2E4\uB9BD\uB2C8\uB2E4",live:!0});if(e.conflicting)return n("\uCDA9\uB3CC \uD574\uACB0 \uD544\uC694",{alert:!0});if(e.gate?.reason==="base_behind")return n("base \uAC31\uC2E0 \uD544\uC694",{alert:!0});if(Zl.has(e.gate?.reason)){let i=e.gate.reason==="review_receipt_stale"?"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC774 \uD604\uC7AC head\uC758 \uC870\uC0C1\uC774 \uC544\uB2D9\uB2C8\uB2E4 \u2014 \uD788\uC2A4\uD1A0\uB9AC \uC7AC\uC791\uC131\xB7\uBE0C\uB79C\uCE58 \uB9AC\uC14B \uBCF5\uAD6C \uACBD\uB85C\uC785\uB2C8\uB2E4. [\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0]\uAC00 \uC774 \uBCF4\uB958\uC758 \uCD9C\uAD6C\uC785\uB2C8\uB2E4":e.gate.reason==="review_receipt_invalid"?"\uB9AC\uBDF0 \uC601\uC218\uC99D \uAE30\uB85D\uC774 \uC131\uB9BD\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4 \u2014 [\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0]\uAC00 \uC774 \uBCF4\uB958\uC758 \uCD9C\uAD6C\uC785\uB2C8\uB2E4":e.gate.reason==="review_receipt_undetermined"?"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC758 ancestry probe\uB97C \uC644\uB8CC\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 \u2014 [\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0]\uAC00 \uC774 \uBCF4\uB958\uC758 \uCD9C\uAD6C\uC785\uB2C8\uB2E4":"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 [\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0]\uAC00 \uC774 \uBCF4\uB958\uC758 \uCD9C\uAD6C\uC785\uB2C8\uB2E4";if(e.review_session?.active===!0)return n(e.review_session.origin==="auto"?"\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694 \xB7 \uC790\uB3D9 \uB9AC\uBDF0 \uC138\uC158 \uC2E4\uD589 \uC911":"\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694 \xB7 \uB9AC\uBDF0 \uC138\uC158 \uC2E4\uD589 \uC911",{title:`${i}
\uB9AC\uBDF0 \uC138\uC158\uC774 \uC2E4\uD589 \uC911\uC785\uB2C8\uB2E4 \u2014 \uB05D\uB098\uBA74 \uC601\uC218\uC99D\uC744 \uB2E4\uC2DC \uD310\uC815\uD569\uB2C8\uB2E4`,live:!0});if(e.auto_review_wait==="slot")return n("\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694 \xB7 \uB9AC\uBDF0 \uC138\uC158 \uC2AC\uB86F \uB300\uAE30",{title:`${i}
\uC2E4\uD589 \uC2AC\uB86F\uC774 \uBE44\uBA74 \uC790\uB3D9\uC73C\uB85C \uB9AC\uBDF0 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4. \uC9C0\uAE08 \uD074\uB9AD\uD558\uBA74 \uC989\uC2DC \uB744\uC6C1\uB2C8\uB2E4`,live:!0});if(e.review_session?.failure){let s=e.review_dispatch?.state==="exhausted"&&e.review_session.origin==="auto";return n(`\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694 \xB7 ${s?"\uC790\uB3D9 \uB9AC\uBDF0 1\uD68C \uC18C\uC9C4 \xB7 ":""}${Wk(e.review_session.failure)}`,{title:`${i}
\uC9C1\uC804 \uB9AC\uBDF0 \uC138\uC158 \uC885\uB8CC \uC0AC\uC720: ${e.review_session.failure}`,alert:!0})}return n("\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694",{title:i,alert:!0})}return e.gate?.reason==="spec_id_missing"?n("\uC2A4\uD399 ID \uB204\uB77D",{title:"native spec_id \uBBF8\uAE30\uB85D \u2014 bd update --spec-id \uD544\uC694",alert:!0}):r.length>0?n(`\uC601\uC218\uC99D \uD655\uC778 \uD544\uC694 \xB7 ${r[0]}`,{title:`\uC131\uB9BD\uD558\uC9C0 \uC54A\uB294 \uC2E4\uD589 \uC601\uC218\uC99D \u2014 ${r.join(", ")}`,alert:!0}):e.recovery?n(e.recovery.badge,{title:e.recovery.title,alert:!0}):e.gate?.tier==="verify"&&e.gate.gate_badge==="\uAC80\uC99D \uC2E4\uD328"?n("\uAC80\uC99D \uC2E4\uD328",{title:e.gate.reason||"",alert:!0}):e.queue_failure?n(`\uBA38\uC9C0 \uC2E4\uD328 \u2014 ${S_(e.queue_failure)}`,{title:e.queue_failure,alert:!0}):e.auto_skip?n(`\uC790\uB3D9 \uC81C\uC678 \u2014 ${S_(e.auto_skip)}`,{title:e.auto_skip,alert:!0}):e.queued&&!e.queue_active?n(`\uBA38\uC9C0 \uB300\uAE30 #${e.queue_position}`):e.gate?.enabled===!0?n("\uBA38\uC9C0 \uAC00\uB2A5"):e.gate?.tier==="merged"?n("\uBA38\uC9C0\uB428"):e.gate?.tier==="closed_unmerged"?n("\uB2EB\uD798",{alert:!0}):e.activity?n("\uD655\uC778 \uC911",{live:!0}):e.gate?.tier==="undecidable"||e.gate?.reason==="mergeability_unknown"?n("\uC0C1\uD0DC \uD655\uC778 \uC2E4\uD328",{title:e.gate.reason||"",alert:!0}):e.gate?.tier==="unobserved"||e.gate?.tier==="verify"||e.gate?.gate_badge==="\uAD00\uCE21 \uB300\uAE30"?n("\uD655\uC778 \uC911"):e.gate?.gate_badge?n(e.gate.gate_badge,{title:e.gate.reason||"",alert:e.gate.enabled!==!0}):null}function sw(e,t,n,r,o=null,i=null,s=null,l=!1,a=null,u=!0,d=null,p=null,_=null,m={},v=!1,O={},R=null,Q={active:!1,failure:null,origin:null},ee=!1){let K=!!a&&a.position>0,L=!!a?.continuation_action&&a.continuation_action.continuation===null,I=!!a&&a.active===!0,P=a&&a.failure||null,F=Vk(a?a.waiting:null),G=n[e]||null,q=G&&G.gate?G.gate:null,N=G&&G.pr?G.pr:null,H=Qk(a?a.resolution:null),W=Jk(_),ne=tw(_,W),he=a&&a.authority||null,qe=a&&a.review_dispatch||null,B=a?.hold?.auto_review_wait==="slot"?"slot":null,te=!!_&&typeof _=="object"&&Zk.has(_.phase),me=K&&!I&&(!he||te||he.source==="automatic"&&!v),Te=s==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":H?H.badge:s==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC911":F,C=!!q&&q.base_badge==="\uCDA9\uB3CC",se=!!q&&q.enabled===!0,ve=es({bead_id:e,merge_sha:O.merge_sha,cleanup_cursor:O.cleanup_cursor,merge_progress:i&&i.merge_progress?i.merge_progress:null,cleanup_failed:r,repo_operations:O.repo_operations}),ye=Ti(ve),De=i&&!ve&&(i.queueing??null)?i.queueing:null,ge=!!r&&["repo_operations","post_merge_jobs","child_sweep","branch_cleanup","parent_close"].includes(r.step)&&!!q&&q.tier==="merged",Re=r&&r.step==="repo_operations"&&ve?.failed===!0&&(ve.step==="deploy"||ve.step==="verify")?ve.step:null,Ze=l&&!!r&&!!q&&q.tier==="merged",ft=me&&(se||C||q?.reason==="base_behind"||Zl.has(q?.reason)||ge||Ze),X=Zl.has(q?.reason),J=l&&C&&u===!1,re=or(m,e,{external:l,merge_active:I||ve?.step==="merge",merge_queued:K,conflict_active:!!s,cleanup_active:ye,merged:!!r||q?.tier==="merged"}),ae=!!re.operation,Ee=!!r||_?.phase==="needs_human"||!!re.error,fe=K&&!P&&!L&&!ge&&!(ne&&ne.lock_actions),Pe=ow({auto_pending:fe,continuation_required:L,queueing:De,merge_step:ve,conflict_badge:Te,conflict_live:H?.live===!0||s==="running",auto_resolution:W,recovery:ne,cleanup_failed:r,cleanup_label:r?Fr(r.step):null,base_exception:p,conflicting:C,gate:q,receipt_check:G&&G.receipt_check?G.receipt_check:null,queue_failure:P,auto_skip:d,queued:K,queue_active:I,queue_position:a?a.position:0,review_session:Q,review_dispatch:qe,auto_review_wait:B,activity:Te?null:i&&i.activity||null}),Ue=Pe?.live===!0&&Pe.title?c`<span title=${Pe.title}>${Pe.label}</span>`:Pe?.label||null,Qe=rw(G&&G.receipt_check?G.receipt_check:null);return{id:e,title:l?c`${t}<span class="muted"> · 세션</span>`:t,reason:r&&ve?.active!==!0?Ei(r.step):"PR \uB300\uAE30",draggable:!1,done:!0,lane:"pr_wait",...R?{dependency_chips:R}:{},external:l,pr_number:N&&typeof N.number=="number"?N.number:null,pr_url:N&&typeof N.url=="string"?N.url:"",completion_badge:Pe?.live!==!0&&Pe?.title?Pe.label:null,completion_title:Pe?.title||"",..._?.phase==="needs_human"&&typeof _.log_path=="string"&&_.log_path.length>0?{log_path:_.log_path}:{},...Qe.length>0?{receipt_badge:{codes:Qe}}:{},badges:Ue?[Ue]:[],live_badge:Pe?.live===!0?Ue:null,usage:o,alert:Pe?.alert===!0,merge_action:q?.tier==="merged"&&!ge&&!Ze?!1:!K||L||me||X,cancel_action:K&&!L,cancel_enabled:!I&&!(ne&&ne.lock_actions),cancel_title:ne&&ne.lock_actions?`${ne.badge} \u2014 \uC911\uB2E8\uD558\uB824\uBA74 \uC0C1\uB2E8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8\uC744 \uC0AC\uC6A9\uD558\uC138\uC694`:I?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"\uBA38\uC9C0 \uD050\uC5D0\uC11C \uC774 \uD56D\uBAA9\uC744 \uBE8D\uB2C8\uB2E4 (\uB2E4\uC2DC [\uBA38\uC9C0]\uB85C \uB123\uC744 \uC218 \uC788\uC2B5\uB2C8\uB2E4)",discard:re,discard_action:re.action,resolve_action:Ee,resolve_enabled:!ee,resolve_title:ee?"\uC138\uC158 \uAE30\uB3D9 \uC694\uCCAD \uC911 \u2014 \uC11C\uBC84 \uC751\uB2F5\uC744 \uAE30\uB2E4\uB9BD\uB2C8\uB2E4":"\uC774 \uC2E4\uD328\uB97C \uC0AC\uB78C\uC774 \uC774\uC5B4\uBC1B\uB294 \uB300\uD654\uD615 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4 \u2014 \uAE30\uB85D\uB41C \uC138\uC158\uC774 \uC788\uC73C\uBA74 fork\uD558\uACE0, \uC5C6\uC73C\uBA74 \uC0C8 \uC138\uC158\uC5D0 \uC0AC\uC720\uB97C \uC2E3\uC2B5\uB2C8\uB2E4",merge_step:ve,discard_enabled:re.enabled,discard_title:re.title,merge_enabled:!ve&&!De&&!s&&!ae&&!p&&!(ne&&ne.lock_actions)&&!J&&Q.active!==!0&&(se||C||q?.reason==="base_behind"||X||ge||Ze||ft||te&&!I),merge_label:L?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":ge||Ze?Re==="deploy"?"\uBC30\uD3EC \uC7AC\uC2DC\uB3C4 \uD6C4 \uC815\uB9AC":Re==="verify"?"\uAC80\uC99D \uC7AC\uC2DC\uB3C4 \uD6C4 \uC815\uB9AC":"\uC815\uB9AC \uC7AC\uC2DC\uB3C4":C&&!ve&&!ge?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":q?.reason==="base_behind"?"base \uAC31\uC2E0 \uD6C4 \uBA38\uC9C0":X?"\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0":me?"\uB2E4\uC2DC \uBA38\uC9C0":void 0,merge_title:ae?re.error?`\uD3D0\uAE30 \uC2E4\uD328: ${re.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${re.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:L?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":De?"\uC694\uCCAD\uC744 \uBCF4\uB0B4\uB294 \uC911 \u2014 \uC11C\uBC84 \uC751\uB2F5\uC744 \uAE30\uB2E4\uB9BD\uB2C8\uB2E4":ve?`\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 ${ve.label}`:Re?`\uBA38\uC9C0 \uC644\uB8CC \u2014 ${Re==="deploy"?"\uBC30\uD3EC":"\uAC80\uC99D"} \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD574 \uC815\uB9AC\uAC00 \uBA48\uCDC4\uC2B5\uB2C8\uB2E4. \uD074\uB9AD\uD558\uBA74 \uC800\uC7A5\uC18C \uC791\uC5C5\uBD80\uD130 \uC815\uB9AC\uB97C \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4`:Ze?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uB2E4\uC2DC \uC2DC\uB3C4\uD569\uB2C8\uB2E4":J?"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uC9C1\uC811 \uD574\uC18C\uD558\uC138\uC694":s==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC2E4\uD589 \uC911 \u2014 \uC644\uB8CC \uD6C4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":s==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC77C\uC2DC\uC815\uC9C0 \u2014 \uC7AC\uAC1C \uD6C4 \uC644\uB8CC\uB418\uBA74 \uBA38\uC9C0\uD558\uC138\uC694":ge?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC2DC\uB3C4\uD569\uB2C8\uB2E4":C?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":q?.reason==="base_behind"?"base\uB97C \uC790\uB3D9 \uAC31\uC2E0\uD55C \uB4A4 \uBA38\uC9C0\uD569\uB2C8\uB2E4":Q.active===!0?Q.origin==="auto"?"\uC790\uB3D9 \uB9AC\uBDF0 \uC138\uC158 \uC2E4\uD589 \uC911 \u2014 \uB05D\uB098\uBA74 \uC601\uC218\uC99D\uC744 \uB2E4\uC2DC \uD310\uC815\uD569\uB2C8\uB2E4":"\uB9AC\uBDF0 \uC138\uC158 \uC2E4\uD589 \uC911 \u2014 \uB05D\uB098\uBA74 \uC601\uC218\uC99D\uC744 \uB2E4\uC2DC \uD310\uC815\uD569\uB2C8\uB2E4":q?.reason==="review_receipt_missing"?"\uB9AC\uBDF0 \uC601\uC218\uC99D \uC5C6\uC74C \u2014 \uBA38\uC9C0 \uAC8C\uC774\uD2B8 \uBCF4\uB958\uC785\uB2C8\uB2E4. \uD074\uB9AD\uD558\uBA74 \uAE30\uB85D\uB41C \uC138\uC158\uC744 \uC774\uC5B4 \uB9AC\uBDF0\uB9CC \uC218\uD589\uC2DC\uD0A4\uACE0, \uC601\uC218\uC99D\uC774 \uCD5C\uC885 head\uC5D0 \uC720\uD6A8\uD574\uC9C0\uBA74 \uD050\uAC00 \uBA38\uC9C0\uD569\uB2C8\uB2E4":q?.reason==="review_receipt_stale"?"head \uC7AC\uC791\uC131\uB428(\uC601\uC218\uC99D\uC774 \uD604\uC7AC head\uC758 \uC870\uC0C1\uC774 \uC544\uB2D8) \u2014 \uBA38\uC9C0 \uAC8C\uC774\uD2B8 \uBCF4\uB958\uC785\uB2C8\uB2E4. \uD074\uB9AD\uD558\uBA74 \uAE30\uB85D\uB41C \uC138\uC158\uC744 \uC774\uC5B4 \uCD5C\uC885 head\uB97C \uB2E4\uC2DC \uB9AC\uBDF0\uC2DC\uD0A4\uACE0, \uC601\uC218\uC99D\uC774 \uC720\uD6A8\uD574\uC9C0\uBA74 \uD050\uAC00 \uBA38\uC9C0\uD569\uB2C8\uB2E4":q?.reason==="review_receipt_invalid"?"\uB9AC\uBDF0 \uC601\uC218\uC99D \uAE30\uB85D\uC774 \uC131\uB9BD\uD558\uC9C0 \uC54A\uC74C \u2014 \uBA38\uC9C0 \uAC8C\uC774\uD2B8 \uBCF4\uB958\uC785\uB2C8\uB2E4. \uD074\uB9AD\uD558\uBA74 \uAE30\uB85D\uB41C \uC138\uC158\uC744 \uC774\uC5B4 \uCD5C\uC885 head\uB97C \uB2E4\uC2DC \uB9AC\uBDF0\uC2DC\uD0A4\uACE0, \uC601\uC218\uC99D\uC774 \uC720\uD6A8\uD574\uC9C0\uBA74 \uD050\uAC00 \uBA38\uC9C0\uD569\uB2C8\uB2E4":q?.reason==="review_receipt_undetermined"?"\uB9AC\uBDF0 \uC601\uC218\uC99D ancestry probe \uBBF8\uC644\uB8CC \u2014 \uBA38\uC9C0 \uAC8C\uC774\uD2B8 \uBCF4\uB958\uC785\uB2C8\uB2E4. \uD074\uB9AD\uD558\uBA74 \uAE30\uB85D\uB41C \uC138\uC158\uC744 \uC774\uC5B4 \uCD5C\uC885 head\uB97C \uB2E4\uC2DC \uB9AC\uBDF0\uC2DC\uD0A4\uACE0, \uC0C8 \uC601\uC218\uC99D\uC774 \uCD5C\uC885 head\uC5D0 \uC720\uD6A8\uD574\uC9C0\uBA74 \uD050\uAC00 \uBA38\uC9C0\uD569\uB2C8\uB2E4":q?.reason==="spec_id_missing"?"native spec_id \uBBF8\uAE30\uB85D \u2014 bd update --spec-id\uB85C \uAE30\uB85D\uD55C \uB4A4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":se?`\uBA38\uC9C0 (${q.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4 (\uCC28\uB840\uAC00 \uB418\uBA74 \uB2E4\uC2DC \uD655\uC778)`:q&&q.tier==="merged"?"\uBA38\uC9C0\uB428 \u2014 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC \uC9C4\uD589 \uC911":`\uBA38\uC9C0 \uBD88\uAC00: ${q&&q.reason||"\uAD00\uCE21 \uB300\uAE30"}`}}function Jl(e,t={}){let{transport:n,issueStores:r,queueStore:o,sessionLogStore:i,gotoIssue:s,getWorkspacePath:l,switchWorkspace:a,openDoc:u,doneRange:d,onDoneRangeChange:p}=t,_=r?no(r):null,m=jk(),v=null,O=null,R=null,Q=null,ee=co(()=>$()),K=new Map,L=new Map,I=o_(),P=Yl(I)===null,F=d?Hn(d):Bk();function G(){let h=Qr.find(g=>g.value===F);return h?h.label:"\uC624\uB298"}let q=Ji("beads-ui.worker.lane-collapsed"),N=!1,H="";function W(){return H.trim().length>0}function ne(h){return W()?h.filter(g=>g.search_match===!0).length:void 0}let he=new Set,qe=new Set,B=new Set;function te(h,g){return!g?.error||!h?{}:{resolve_action:!0,resolve_enabled:!B.has(h),resolve_title:B.has(h)?"\uC138\uC158 \uAE30\uB3D9 \uC694\uCCAD \uC911 \u2014 \uC11C\uBC84 \uC751\uB2F5\uC744 \uAE30\uB2E4\uB9BD\uB2C8\uB2E4":"\uC2E4\uD328\uD55C \uD3D0\uAE30\uB97C \uC0AC\uB78C\uC774 \uC774\uC5B4\uBC1B\uB294 \uB300\uD654\uD615 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4 \u2014 \uAE30\uB85D\uB41C \uC138\uC158\uC774 \uC788\uC73C\uBA74 fork\uD558\uACE0, \uC5C6\uC73C\uBA74 \uC0C8 \uC138\uC158\uC5D0 \uC0AC\uC720\uB97C \uC2E3\uC2B5\uB2C8\uB2E4"}}let me=new Set,Te=new Set,C=new Set,se=null,ve=[],ye=$_({queueStore:o,issueStores:r,transport:n,getWorkspacePath:l,onInvalidate:()=>$()});function De(){ye.refreshSessionDefaults()}let ge=document.createElement("div");ge.className="worker-console";let Re=document.createElement("div");Re.className="worker-top";let Ze=document.createElement("div");Ze.className="worker-drawer-overlay",Ze.hidden=!0;let ft=document.createElement("div");ft.className="worker-drawer-overlay__backdrop";let X=document.createElement("div");X.className="worker-drawer-host";let J=document.createElement("div");J.className="worker-drawer-host",J.hidden=!0,Ze.append(ft,X,J);let re=document.createElement("div");re.className="worker-lanes-host",ge.append(Re,Ze,re),e.appendChild(ge);let ae=yr(null,null),Ee=[],fe=ta({transport:n,console_el:ge,getLanes:()=>ae,getWorkspaces:()=>Ee,getCrossLanes:()=>null,reproject:()=>({lanes:yt(),raw_lanes:null}),onCorrection:()=>{},showToast:_e,requestRender:()=>$(),adoptQueue:(h,g)=>{o&&o.set(g)},onDragBegin:()=>{v=null}}),Pe=null,Ue=xo(X,{transport:n,sessionLogStore:i,onClose:()=>{Pe=null,Ze.hidden=!0,$()}}),Qe=v_(J,{onClose:()=>{J.hidden=!0,Ze.hidden=!0,$()}}),ze=p_({getWorkspacePath:l||(()=>"")}),Y=l&&l()||"",V=__({queueStore:o,transport:n,onChanged:()=>$(),onOpenScript:(h,g)=>{ze.open(h,g)}});function xe(){return o&&o.get()||{revision:0,auto_advance:!1,auto_merge:!1,slots:la,queue:[],serial_lanes:[],serial_lane_count:0,pr_wait:[],done:[]}}function bt(h){for(let g of Object.values(Dt(xe().provider_hold)))for(let E of Array.isArray(g?.targets)?g.targets:[])if(Array.isArray(E?.attempt_ids)&&E.attempt_ids.includes(h))return E;return null}function _t(h){if(h?.status!=="ok")return{eligible:!1,reason:`\uACC4\uC815 \uC0C1\uD0DC ${String(h?.status||"\uBBF8\uC0C1")}`};let g=Array.isArray(h.windows)?h.windows:[],E=g.find(de=>de?.key==="5h"),oe=g.find(de=>de?.key==="7d");if(!E||typeof E.pct!="number")return{eligible:!1,reason:"5\uC2DC\uAC04 \uC0AC\uC6A9\uB7C9 \uBBF8\uAD00\uCE21"};if(E.pct>80)return{eligible:!1,reason:"5\uC2DC\uAC04 \uC0AC\uC6A9\uB7C9 80% \uCD08\uACFC"};if(oe){if(typeof oe.pct!="number")return{eligible:!1,reason:"7\uC77C \uC0AC\uC6A9\uB7C9 \uBBF8\uAD00\uCE21"};if(oe.pct>90)return{eligible:!1,reason:"7\uC77C \uC0AC\uC6A9\uB7C9 90% \uCD08\uACFC"}}return{eligible:!0,reason:""}}function Ke(h){let g=Dt(xe().attempts)[h];if(!g)return;let E=Dt(xe().runner_catalog),oe=Dt(E.runners),de=typeof g.runner=="string"&&oe[g.runner]?g.runner:Object.keys(oe)[0]||"",Ce=Dt(oe[de]),He=Dt(Ce.models),Ct=typeof g.model=="string"&&He[g.model]?g.model:typeof Ce.default_model=="string"?Ce.default_model:Object.keys(He)[0]||"",Xt=bt(h),dt=typeof g.claude_account=="string"?g.claude_account:typeof Xt?.account=="string"?Xt.account:"";Q={attempt_id:h,original_runner:de,runner:de,model:Ct,account:dt,fresh_current:!1},$()}function nt(){Q=null,$()}function x(){let h=Q;if(!h||!h.runner||!h.model||h.runner==="claude"&&!h.account)return;let g={runner:h.runner,model:h.model};h.runner==="claude"&&h.account&&(g.claude_account=h.account);let E=h.fresh_current||h.runner!==h.original_runner;Q=null,$(),lt(h.attempt_id,"session",{exec_override:g,...E?{continuation:"fresh_current",decision_token:{}}:{}})}function Z(){let h=Q;if(!h)return"";let g=Dt(Dt(xe().runner_catalog).runners),E=Array.isArray(Dt(xe().account_catalog).claude)?Dt(xe().account_catalog).claude:[],oe=h.runner!==h.original_runner;return c`<dialog
      class="op-dialog provider-resume-dialog"
      aria-label="다른 방법으로 이어하기"
    >
      <h2>다른 방법으로 이어하기</h2>
      <div class="provider-resume-dialog__fields">
        <label>
          러너
          <select class="provider-resume-dialog__runner">
            ${Object.keys(g).map(de=>c`<option
                  value=${de}
                  ?selected=${de===h.runner}
                >
                  ${de}
                </option>`)}
          </select>
        </label>
        <label>
          모델
          <select class="provider-resume-dialog__model">
            ${Object.entries(g).map(([de,Ce])=>c`<optgroup label=${de}>
                  ${Object.keys(Dt(Ce?.models)).map(He=>c`<option
                        value=${JSON.stringify([de,He])}
                        ?selected=${de===h.runner&&He===h.model}
                      >
                        ${He}
                      </option>`)}
                </optgroup>`)}
          </select>
        </label>
        ${h.runner==="claude"?c`<label>
              계정
              <select class="provider-resume-dialog__account">
                ${h.account?"":c`<option value="" selected>계정 선택</option>`}
                ${h.account&&!E.some(de=>de?.email===h.account)?c`<option value=${h.account} selected>
                      ${h.account} (목록에 없음)
                    </option>`:""}
                ${E.map(de=>{let Ce=_t(de),He=de.alias||de.email;return c`<option
                    value=${de.email}
                    ?selected=${de.email===h.account}
                    ?disabled=${!Ce.eligible}
                    title=${Ce.reason}
                  >
                    ${He}${Ce.reason?` \u2014 ${Ce.reason}`:""}
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
      ${oe||h.fresh_current?c`<p class="provider-resume-dialog__notice">
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
    </dialog>`}function Oe(h){if(!v||!h.some(E=>E.id===v))return null;let g=Yo(xe());return g?{bead_id:v,lanes:g}:null}function Ye(){return l&&l()||""}async function at(h,g){await fe.sendOp({type:"worker-queue-place",payload:{bead_id:h,...g==="parallel"?{}:{lane:g}},root_dir:Ye()},h)}function Fe(){let h=xe();return typeof h.revision=="number"?h.revision:0}function Je(h){h&&h.queue&&o&&o.set(h.queue)}async function qt(h){if(!n||!h)return;let g=await n("worker-attempt-pause",{attempt_id:h});g&&g.paused===!1&&g.reason&&_e(`\uC77C\uC2DC\uC815\uC9C0 \uAC70\uBD80: ${g.reason}`,"error",2400)}async function lt(h,g="session",E={}){if(!n||!h)return;let oe=n,de=xe().attempts?.[h]||null;await so({context:{bead_id:de?.bead_id||"",kind:g,tuple:de?Sn(de):""},transport:Ce=>oe("worker-attempt-resume",{attempt_id:h,expected_revision:Fe(),...E,...Ce}),adopt:Je})}async function At(h,g,E=!0){if(!n)return null;let oe=n,de=await oe(h,{...g,expected_revision:Fe()});return Je(de),de&&de.conflict&&E&&(de=await oe(h,{...g,expected_revision:Fe()}),Je(de)),de}async function Bt(h){if(!n||!h)return;let g=xe().merge_queue?.find(oe=>oe.bead_id===h)?.continuation_action;if(g?.mismatch&&g.continuation===null){await Ge(h,g.mismatch);return}he.add(h),$();let E;try{E=await At("worker-merge-queue-add",{bead_id:h})}catch{_e("\uBA38\uC9C0 \uD074\uB9AD\uC774 \uC11C\uBC84\uC5D0 \uC804\uB2EC\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4(\uC5F0\uACB0 \uBB38\uC81C) \u2014 \uC5F0\uACB0 \uBCF5\uAD6C \uD6C4 \uB2E4\uC2DC \uB20C\uB7EC\uC8FC\uC138\uC694","error",3200);return}finally{he.delete(h),$()}if(!(!E||E.applied)){if(E.conflict){_e("\uD050\uAC00 \uBC14\uB00C\uC5B4 \uBA38\uC9C0 \uD074\uB9AD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uB20C\uB7EC\uC8FC\uC138\uC694","error",2400);return}_e(zk(E.reason),"error",2400)}}async function Pt(h){if(!(!n||!h||qe.has(h))){qe.add(h),$();try{let g=await n("worker-cleanup-retry",{bead_id:h,expected_revision:Fe()});Je(g),g&&!g.retried&&!g.conflict&&g.reason&&_e(`\uC815\uB9AC \uC7AC\uC2DC\uB3C4 \uAC70\uBD80: ${g.reason}`,"error",2400)}finally{qe.delete(h),$()}}}async function Nt(h){if(!(!n||!h||B.has(h))){B.add(h),$();try{let g=await n("worker-resolve-in-session",{bead_id:h,expected_revision:Fe()});Je(g),_e(Gk(g),Yk(g),4e3)}finally{B.delete(h),$()}}}async function ue(h,g){let E=xe().hold;if(!n||!E||typeof E.since!="number")return;let oe=await n(h,{since:E.since});Je(oe),oe&&oe.ok===!1&&_e(`${g}: ${oe.reason==="hold_changed"?"\uD050 \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uD655\uC778\uD558\uC138\uC694":oe.reason||""}`,"error",2800)}async function ke(h,g){if(!n||!h||!g)return;let E=await n("worker-parked-retry",{bead_id:h,attempt_id:g});Je(E),E&&E.ok===!1&&_e(`\uC7AC\uC2DC\uB3C4 \uAC70\uBD80: ${E.reason==="not_latest"?"\uC774 bead\uC5D0 \uB354 \uC0C8\uB85C\uC6B4 \uC2DC\uB3C4\uAC00 \uC788\uC2B5\uB2C8\uB2E4":E.reason||""}`,"error",2800)}async function Ge(h,g){let E=await _r({continuation_mismatch:g},(de,Ce)=>At("worker-merge-queue-add",{bead_id:h,continuation:de,decision_token:Ce},!1)),oe=E?.queue?.merge_queue?.find(de=>de.bead_id===h)?.continuation_action;if(E?.applied!==!0&&oe?.continuation===null&&oe.mismatch){await Ge(h,oe.mismatch);return}E&&E.applied===!1&&!E.conflict&&_e("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD\uC774 \uCD5C\uC2E0 \uC0C1\uD0DC\uC640 \uC77C\uCE58\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4","error",2800)}async function rt(h){if(!n)return;let g=await At("worker-merge-auto-toggle",{on:h});!g||g.conflict||_e(h?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0 \u2014 \uB300\uAE30 \uD56D\uBAA9\uC744 \uBE44\uC6E0\uC2B5\uB2C8\uB2E4",h?"success":"info",2400)}async function et(h){if(!n||!h)return;let g=await At("worker-merge-queue-remove",{bead_id:h});g&&!g.conflict&&!g.applied&&g.reason==="merge_active"&&_e("\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error",2400)}async function ht(){await At("worker-merge-queue-remove",{all:!0})}async function je(h,g=null,E="unmerged",oe=null){if(!n||!h)return;let de=Qo(h,E);if(!(!!oe||typeof globalThis.confirm!="function"||globalThis.confirm(de)))return;let He=await n("worker-discard",{bead_id:h,...g?{attempt_id:g}:{},...oe?{operation_id:oe}:{},expected_revision:Fe()});if(Je(He),He&&He.conflict&&(He=await n("worker-discard",{bead_id:h,...g?{attempt_id:g}:{},...oe?{operation_id:oe}:{},expected_revision:Fe()}),Je(He)),He&&He.discarded===!0){_e(gi(He),"success",5e3);return}if(He&&He.reason){_e(`\uD3D0\uAE30 \uC2E4\uD328: ${He.reason}`,"error",2800);return}if(He&&He.accepted&&He.pending==="merged_revert"){_e("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success",2400);return}if(He&&He.accepted&&!He.discarded){_e(`\uD3D0\uAE30 \uC9C4\uD589: ${He.phase||"\uBC31\uC5C5 \uC911"}`,"success",2400);return}He&&!He.conflict&&_e("\uD3D0\uAE30 \uAC70\uBD80: unknown","error",2800)}async function tt(h,g,E){if(!n||!h||!g||typeof globalThis.confirm=="function"&&!globalThis.confirm(Xo(h,E)))return;let oe=await n("worker-discard-abandon",{bead_id:h,operation_id:g,expected_revision:Fe()});if(Je(oe),oe&&oe.conflict&&(oe=await n("worker-discard-abandon",{bead_id:h,operation_id:g,expected_revision:Fe()}),Je(oe)),oe&&oe.abandoned===!0){_e(mi(E),"success",5e3);return}if(oe&&oe.reason){_e(`\uD3D0\uAE30 \uD3EC\uAE30 \uAC70\uBD80: ${oe.reason}`,"error",2800);return}oe&&!oe.conflict&&_e("\uD3D0\uAE30 \uD3EC\uAE30 \uAC70\uBD80: unknown","error",2800)}async function Ne(h,g,E){if(!(!n||!g||!E||Te.has(g))){Te.add(g),$();try{let oe=await n(h,{bead_id:g,action_id:E,expected_revision:Fe()});Je(oe),oe?.conflict?_e("\uC774\uC804 \uC791\uC5C5 \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694.","error",2800):!oe?.ok&&oe?.reason&&_e(`\uC774\uC804 \uC791\uC5C5 \uCC98\uB9AC \uAC70\uBD80: ${String(oe.reason)}`,"error",2800)}finally{Te.delete(g),$()}}}async function S(h,g){if(!n||!g||me.has(g))return;me.add(g),$();let E;try{let oe=async(de={})=>await n(h,{bead_id:g,expected_revision:Fe(),...de});E=await oe(),Je(E),E&&E.conflict&&(E=await n(h,{bead_id:g,expected_revision:Fe()}),Je(E)),h==="worker-revise-fix"&&(E=await _r(E,(de,Ce)=>oe({continuation:de,decision_token:Ce}),{onResult:Je,refresh:()=>oe()}))}finally{me.delete(g),$()}if(!(!E||E.conflict)){if(E.ok){_e(h==="worker-revise-fix"?"\uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4 \u2014 \uC218\uB9AC \uD6C4 \uAD6C\uD604\uC774 \uC7AC\uB514\uC2A4\uD328\uCE58\uB429\uB2C8\uB2E4":"\uB378\uD0C0 \uC2B9\uC778 \uC644\uB8CC \u2014 \uC601\uC218\uC99D \uAC31\uC2E0 + \uD30C\uD0B9 \uD574\uC81C","success",2800);return}_e(`\uCC98\uBD84 \uAC70\uBD80: ${E.reason||""}`,"error",3e3)}}async function j(h){if(!n)return;let g=await n("worker-automation-toggle",{on:h,expected_revision:Fe()});Je(g),g&&g.conflict&&await n("worker-automation-toggle",{on:h,expected_revision:Fe()}).then(Je)}async function ce(h){if(!n||!h)return;let g=await n("worker-repo-operation-dismiss",{operation_id:h});Je(g),g&&g.ok===!1&&_e(`\uAE30\uB85D \uB2EB\uAE30 \uAC70\uBD80: ${g.reason||""}`,"error",3e3)}async function Ae(h){if(!n||!Number.isFinite(h))return;let g=Math.max(la,Math.floor(h)),E=await n("worker-queue-set-slots",{slots:g,expected_revision:Fe()});Je(E),E&&E.conflict&&await n("worker-queue-set-slots",{slots:g,expected_revision:Fe()}).then(Je)}async function be(h){if(!n||!Number.isInteger(h)||h<1||h>x_)return;let g=xe(),E=(Array.isArray(g.serial_lanes)?g.serial_lanes:[]).slice(h).reduce((Ce,He)=>Ce+(Array.isArray(He?.entries)?He.entries.length:0),0),oe=()=>({count:h,expected_revision:Fe()}),de=await n("worker-queue-set-serial-lane-count",oe());Je(de),de&&de.conflict&&(de=await n("worker-queue-set-serial-lane-count",oe()),Je(de)),de&&de.applied&&E>0&&_e(`\uC9C1\uB82C \uB808\uC778 \uCD95\uC18C \u2014 ${E}\uAC1C \uD56D\uBAA9\uC774 \uBCD1\uB82C \uB300\uAE30\uB85C \uC774\uB3D9`)}function yt(){let h=Lr(F),g=ye.read({candidate_sort:I,done_since:h});return Ee=g.workspaces,ae=yr(g.workspaces,g.workspaces_state,{done_since:h,candidate_filter:m,candidate_hidden_counts:"per_control",candidate_sort:"as_given",groups:"all",search:H}),ae}function wt(h){return h.queue_groups[0]||Nk}function $t(h){let g=h.dependency_chips||null,E={...g&&g.released?{released:g.released}:{},...g&&g.dependents?{dependents:g.dependents}:{}},oe=K.get(h.id),de=L.get(h.id)||null,Ce=oe&&oe.overlaps.length>0?oe.overlaps:null,He=!!oe&&oe.scope_missing;return!de&&!Ce&&!He&&Object.keys(E).length===0?null:{...E,...de?{predecessors:de}:{},...Ce?{overlaps:Ce}:{},...He?{scope_missing:!0}:{}}}function xt(h){return{...h,workspace_name:"",done_layout:void 0,dependency_chips:$t(h)||void 0,chip_popover:Gt(h)}}function Gt(h){return $i(h,g=>ee.isOpen({bead_id:h.id,chip_key:g}))}function Ht(){let h=xe(),g=new Map;for(let E of Object.values(Dt(h.lane_states))){let oe=Array.isArray(E?.corrections)?E.corrections:[];for(let de of oe)de&&typeof de.bead_id=="string"&&typeof de.after=="string"&&g.set(de.bead_id,de.after)}return{admission:Dt(h.admission),correction_after:g}}function Ut(h,g){let E=xt(h),oe=dd(g.admission[h.id]||null,!!h.discard||Te.has(h.id)),de=g.correction_after.get(h.id);return{...E,draggable:E.draggable===!0&&!oe,stale_work:oe,reason:oe?"":E.reason,badges:de?[`\u{1F517} ${de} \uB4A4 (blocks \uC790\uB3D9)`,...E.badges||[]]:E.badges,revise_enabled:E.revise_enabled===!0&&!me.has(h.id)}}function Et(h){let g=Ht();return wt(h).sublanes.parallel.map(E=>Ut(E,g))}function rn(h){let g=Ht();return wt(h).sublanes.serial.map(E=>{let oe=E.occupants.map(de=>({id:de.id,title:de.title,draggable:!1,lane:E.id,ghost:!0,badges:[de.badge],...typeof de.search_match=="boolean"?{search_match:de.search_match}:{}}));return{id:E.id,index:E.index+1,raw_length:E.raw_length,ghosts:oe,items:E.items.map(de=>Ut(de,g)),occupied:E.occupied_by.length>0,badge:E.occupants.length>0?E.occupants[0].badge:"\uB300\uAE30",cycle:E.cycle===!0}})}function tn(h){return h.runnable.map(g=>xt(g))}function Wt(h){return h.done.map(g=>xt(g))}function Ot(h){let g=h.running.filter(E=>E.non_occupying!==!0).map(E=>({...E,bead_id:E.id,attempt_id:E.attempt_id||"",paused:E.run_state==="paused",failed:E.run_state==="failed",parked:E.run_state==="parked",retry_wait:E.run_state==="retry_wait",waiting:E.run_state==="waiting",wait:E.wait||null,provider_hold:E.run_state==="provider_hold",hold:E.hold?{...E.hold,open:R===E.attempt_id}:null,status_label:E.run_state==="failed"?E.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328":E.run_state==="parked"?"\uC138\uC158 \uB300\uAE30":E.run_state==="retry_wait"?"\uC7AC\uC2DC\uB3C4 \uB300\uAE30":E.run_state==="waiting"?"\uC120\uD589 \uB300\uAE30":E.run_state==="provider_hold"?"\uACF5\uAE09\uC790 \uBCF4\uB958":void 0,can_pause:E.can_pause!==!1,workspace_name:"",dependency_chips:$t(E)||void 0,chip_popover:Gt(E),rollup_expanded:C.has(E.id),failure:E.failure?{...E.failure,open:O===E.attempt_id}:null,...te(E.id,E.discard)}));return[...g.filter(E=>E.failed===!0),...g.filter(E=>E.failed!==!0&&E.parked===!0),...g.filter(E=>E.failed!==!0&&E.parked!==!0)]}function Qt(h){return we(h).map(g=>({...g,chip_popover:Gt(g)}))}function we(h){if(se&&se.model===h)return se.rows;let g=xe(),E=wt(h),oe=Dt(g.attempts),de=Object.values(oe).filter(rr),Ce=new Map;for(let Ve of de)Ce.set(Ve.attempt_id,Ve);let He=new Map;for(let Ve of de)He.set(Ve.bead_id,Ve);let Ct=new Map;for(let Ve of[...h.pr_wait,...h.running,...h.queue,...h.runnable,...h.done])Ct.has(Ve.id)||Ct.set(Ve.id,Ve);let Xt=Ve=>{let Yt=null;for(let xn of de)!xn||xn.bead_id!==Ve||il(xn,Ce)||(Yt===null||(typeof xn.started_at=="number"?xn.started_at:0)>=(typeof Yt.started_at=="number"?Yt.started_at:0))&&(Yt=xn);return Yt&&typeof Yt.target_base=="string"?Yt.target_base:null},dt=new Map;for(let Ve of h.running)Ve.run_state==="failed"||Ve.conflict_resolution!==!0||(Ve.run_state!=="paused"?dt.set(Ve.id,"running"):dt.has(Ve.id)||dt.set(Ve.id,"paused"));let an=Dt(g.auto_merge_skips),cn=new Set(E.merge.auto_excluded),Wn=Dt(g.pr_observations),_n=Dt(g.pr_activity),dn=Dt(g.cleanup_failed),Rn=Dt(g.discard_operations),Qn=Dt(g.bead_workflow),ln=Dt(g.bead_titles),Xn=g.merge_queue_state||{active:null,failures:{}},cr=E.merge.state.waiting,In=new Map;for(let Ve of Array.isArray(g.merge_queue)?g.merge_queue:[])Ve&&typeof Ve=="object"&&Ve.bead_id&&In.set(Ve.bead_id,Ve);let zn=(Array.isArray(g.pr_wait)?g.pr_wait:[]).map(Ve=>{let Yt=Ct.get(Ve.bead_id);return{...sw(Ve.bead_id,Yt?.title||ln[Ve.bead_id]||Ve.bead_id,Wn,dn[Ve.bead_id]||null,nr(oe,Ve.bead_id),_n[Ve.bead_id]||(he.has(Ve.bead_id)?{activity:null,merge_progress:null,queueing:"merge"}:qe.has(Ve.bead_id)?{activity:null,merge_progress:null,queueing:"cleanup"}:null),dt.get(Ve.bead_id)||null,Ve.external===!0,{position:E.merge.positions.get(Ve.bead_id)||0,active:Xn.active===Ve.bead_id,failure:Dt(Xn.failures)[Ve.bead_id]||null,waiting:cr&&cr.bead_id===Ve.bead_id?cr.reason:null,resolution:E.merge.resolutions.get(Ve.bead_id),continuation_action:E.merge.continuations.get(Ve.bead_id),authority:E.merge.authorities.get(Ve.bead_id)||null,hold:In.get(Ve.bead_id)?.hold||null,review_dispatch:In.get(Ve.bead_id)?.review_dispatch||null},Ve.wt_present!==!1,g.auto_merge===!0&&cn.has(Ve.bead_id)?an[Ve.bead_id]?.reason||"":null,sl(E.declared_base,Xt(Ve.bead_id)),Dt(g.completion_status)[Ve.bead_id]||null,Rn,g.auto_merge===!0,{merge_sha:Ve.merge_sha,cleanup_cursor:Ve.cleanup_cursor,repo_operations:E.repo_operations},Yt?$t(Yt):null,id(oe,Ve.bead_id),B.has(Ve.bead_id)),...Yt?.search_match===void 0?{}:{search_match:Yt.search_match},workflow:Qn[Ve.bead_id]||null,priority:Yt?.priority,from_id:Yt?.from_id,...Yt?.created_at===void 0?{}:{created_at:Yt.created_at},...Yt?.updated_at===void 0?{}:{updated_at:Yt.updated_at}}});return se={model:h,rows:zn},zn}function T(h){let g=wt(h),E=[];for(let Ce of h.running)Ce.non_occupying!==!0&&E.push({id:Ce.id,title:Ce.title,location_label:"\uC2E4\uD589\uC911",kind:"running",lane_id:Ce.serial_lane_id??null});for(let Ce of h.pr_wait)E.push({id:Ce.id,title:Ce.title,location_label:"PR \uB300\uAE30",kind:"pr_wait",lane_id:null});for(let Ce of g.sublanes.serial)Ce.items.forEach((He,Ct)=>{E.push({id:He.id,title:He.title,location_label:`${Ce.id} #${Ct+1}`,kind:"serial",lane_id:Ce.id})});g.sublanes.parallel.forEach((Ce,He)=>{E.push({id:Ce.id,title:Ce.title,location_label:`#${He+1}`,kind:"parallel",lane_id:null})});for(let Ce of h.runnable)E.push({id:Ce.id,title:Ce.title,location_label:"\uD6C4\uBCF4",kind:"candidate",lane_id:null,queue_placeable:Ce.queue_placeable===!0});let oe=xe();K=l_(oe.bead_scope,E);let de=new Map;for(let Ce of[...h.running,...h.runnable])Array.isArray(Ce.blocked_by)&&Ce.blocked_by.length>0&&de.set(Ce.id,Ce.blocked_by);for(let[Ce,He]of Object.entries(Dt(oe.bead_blocked_by)))Array.isArray(He)&&de.set(Ce,He.filter(Ct=>typeof Ct=="string"&&Ct.length>0));L=$d(de,E,Dt(oe.blocker_workspaces))}function pe(h){let g=h.hold&&typeof h.hold=="object"?h.hold:null;if(!g||g.kind!=="env"&&g.kind!=="systemic")return"";let E=wr(g.cause)||String(g.cause||""),oe=Array.isArray(h.lineages)?h.lineages:[];if(g.kind==="env"){let Ce=oe.map(Ct=>Ct&&Ct.next_at).filter(Ct=>typeof Ct=="number").sort((Ct,Xt)=>Ct-Xt)[0],He=typeof Ce=="number"?` \xB7 \uB2E4\uC74C ${new Date(Ce).toLocaleTimeString("ko-KR",{hour:"2-digit",minute:"2-digit"})}`:"";return c`<div class="worker-hold worker-hold--env" role="status">
        <span class="worker-hold__text"
          >환경 보류: ${E} — 재시도 대기${He}</span
        >
        <button
          type="button"
          class="worker-hold__retry"
          title="예약된 재시도를 지금 실행합니다"
        >
          지금 재시도
        </button>
      </div>`}let de=(Array.isArray(g.bead_ids)?g.bead_ids:[]).filter(Ce=>typeof Ce=="string"&&Ce.length>0);return c`<div class="worker-hold worker-hold--systemic" role="alert">
      <span class="worker-hold__text"
        >${E}${de.length>0?` \u2014 bead ${de.join(", ")}`:""}</span
      >
      <button
        type="button"
        class="worker-hold__resume"
        title="정지를 풀고 멈춰 있던 bead를 다시 디스패치합니다"
      >
        재개
      </button>
    </div>`}function Le(h){let g=[];for(let[dt,an]of Object.entries(Dt(h.provider_hold)))for(let cn of Array.isArray(an?.targets)?an.targets:[])g.push({runner:dt,target:cn});if(g.length===0)return"";let E=g.find(dt=>dt.target?.kind==="outage");if(E){let dt=typeof E.target.next_probe_at=="number"?new Date(E.target.next_probe_at).toLocaleTimeString("ko-KR",{hour:"2-digit",minute:"2-digit"}):"";return c`<div class="worker-provider-gate" role="status">
        ⚠️ ${E.runner} 공급자 장애 — 신규 디스패치
        보류${dt?`, \uB2E4\uC74C \uD504\uB85C\uBE0C ${dt}`:""}
      </div>`}let oe=Array.isArray(Dt(h.account_catalog).claude)?Dt(h.account_catalog).claude:[],de=dt=>oe.find(cn=>cn?.email===dt)?.alias||dt,Ce=g.find(dt=>typeof dt.target?.account!="string"),He=dt=>typeof dt?.resets_at=="number"?new Date(dt.resets_at).toLocaleTimeString("ko-KR",{hour:"2-digit",minute:"2-digit"}):"";if(Ce){let dt=He(Ce.target);return c`<div class="worker-provider-gate" role="status">
        ⏳ ${Ce.runner} 사용 한도 — 계정 미확인이라 러너 전체 디스패치
        보류${dt?`, \uB9AC\uC14B ${dt}`:""}
      </div>`}let Ct=[...new Set(g.map(dt=>de(String(dt.target.account))))],Xt=He(g[0].target);return c`<div class="worker-provider-gate" role="status">
      ⏳ ${Ct.join(", ")} 사용 한도 —
      ${Ct.length>1?"\uADF8 \uACC4\uC815\uB4E4":"\uADF8 \uACC4\uC815"} 디스패치
      보류${Xt?`, \uB9AC\uC14B ${Xt}`:""}
    </div>`}function y(h){let g=xe(),E=wt(h),oe=E.sublanes.parallel,de=oe.length>0?oe[0].id:"\u2014",Ce=c`<button
      type="button"
      class="worker-play${g.auto_advance?" is-active":""}"
    >
      ${g.auto_advance?"\u23F8 \uC790\uB3D9\uD654 \uBA48\uCDA4":"\u25B6 \uC790\uB3D9\uD654"}
    </button>`,He=U(h),Ct=E.over_cap?c`<span
          class="worker-overcap"
          title="수동 재개(▶)는 슬롯 cap을 초과할 수 있습니다 — 자동 진행은 cap을 지킵니다"
          >cap 초과</span
        >`:"",Xt=g.auto_advance?0:(Array.isArray(g.queue)?g.queue:[]).filter(ln=>ln&&typeof ln.armed_by_lane=="string"&&ln.armed_by_lane.length>0).length,dt=Xt>0?c`<span
            class="worker-kpi__chip worker-kpi__chip--armed"
            title="모니터 연결 레인이 발차한 대기 행입니다 — 이 레포의 자동 진행은 꺼진 채입니다"
            >⏸ 자동 진행 꺼짐 · 연결 레인 ${Xt}건 진행 중</span
          >`:"",an=c`<span class="worker-kpi__chip worker-kpi__chip--running"
        >실행 <b>${E.live_count}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--pr"
        >PR 대기 <b>${Qt(h).length}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--done"
        >${G()} 완료 <b>${h.done.length}</b></span
      >`,cn=c`<span
      class="worker-kpi__chip worker-kpi__chip--base"
      title=${E.declared_base?"\uC774 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uC5B8\uD55C target base (docs/agents/repo-ops.toml). \uB514\uC2A4\uD328\uCE58 \uC2DC\uC810\uC758 \uAC80\uC99D\uC740 \uBCC4\uB3C4":"\uC120\uC5B8 \uD30C\uC77C\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 \u2014 target base \uD655\uC778 \uBD88\uAC00"}
      >base ${E.declared_base||"?"}</span
    >`,Wn=c`<label class="worker-tgl worker-slots"
        >동시 실행
        <input
          type="number"
          class="worker-slots__input"
          min=${la}
          step="1"
          .value=${String(E.slots)}
          title="동시에 실행할 세션 수 (최소 1 = 순차 실행)"
      /></label>
      <label
        class="worker-tgl worker-serial-lanes"
        title="고정 직렬 레인 수 (1~5). 축소 시 잘린 레인의 대기 항목은 병렬 대기로 돌아갑니다"
        >직렬 레인
        <select class="worker-serial-lane-count" aria-label="직렬 레인 수">
          ${Array.from({length:x_},(ln,Xn)=>Xn+1).map(ln=>c`<option
                value=${String(ln)}
                ?selected=${E.serial_lane_count===ln}
              >
                ${ln}
              </option>`)}
        </select>
      </label> `,_n=c`<input
      type="search"
      class="worker-search"
      placeholder="ID·제목 검색"
      aria-label="이슈 검색 (ID·제목)"
      .value=${H}
    />`,dn=ld(E.repo_operations,E.cleanup_failures),Rn=pe(g),Qn=Le(g);return N?c`<div class="worker-ribbon">
          ${Ce} ${He}
          <div class="worker-kpi worker-kpi--ribbon">
            ${Ct}${dt}${an}
          </div>
        </div>
        <div class="worker-ctrl worker-ctrl--mobile">
          <div class="worker-ctrl__ops">${Wn}${_n}</div>
          <div class="worker-kpi">${cn}</div>
        </div>
        ${Qn}${Rn}${dn}${V.template()}`:c`<div class="worker-ctrl">
        <div class="worker-ctrl__ops">
          ${Ce}${He}${Wn}${_n}
        </div>
        <div class="worker-kpi">
          ${Ct}${dt}${an}${cn}
          ${(Array.isArray(E.token_total)?E.token_total:E.token_total?[{label:E.token_total,tooltip:`${G()} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}]:[]).map(ln=>c`<span
                class="worker-kpi__chip worker-kpi__chip--tokens"
                title=${ln.tooltip}
                >${G()} 완료 · 누적 ${ln.label}</span
              >`)}
          <span class="worker-kpi__next worker-stat"
            >다음 <b>${de}</b></span
          >
        </div>
      </div>
      ${Qn}${Rn}${dn}${V.template()}`}function b(h){let g=h.runnable_hidden;return c`<div class="worker-filter">
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
        ${ns.map(E=>c`<button
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
    </div>`}function M(){let h=P?"custom":Yl(I)||"custom";return c`<select
      class="worker-sort"
      aria-label="후보 정렬"
      title="후보 정렬"
      .value=${h}
    >
      ${xs.map(g=>c`<option value=${g.id} ?selected=${h===g.id}>
            ${g.label}
          </option>`)}
      <option value="custom" ?selected=${h==="custom"}>
        사용자 지정…
      </option>
    </select>`}function f(){let h=As(I);return c`<div
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
            ${r_.map(oe=>c`<option
                  value=${oe.key}
                  ?selected=${!!E&&E.key===oe.key}
                >
                  ${oe.label}
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
        .value=${F}
      >
        ${Qr.map(h=>c`<option value=${h.value} ?selected=${F===h.value}>
              ${h.label}
            </option>`)}
      </select>
    </div>`}function U(h){let g=wt(h).merge,E=xe().auto_merge===!0;if(g.running)return c`<button
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
      </button>`;let oe=new Set(g.auto_excluded),de=Qt(h).filter(Ce=>Ce.merge_action&&Ce.merge_enabled&&!oe.has(Ce.id)).length;return c`<button
      type="button"
      class="worker-merge-all"
      title="켜 두면 자격이 생기는 PR을 계속 큐에 넣어 순서대로 충돌 해소·머지합니다"
    >
      ▶ 자동 머지${de>0?` ${de}`:""}
    </button>`}function ie(h,g){return c`<div
      data-bead-id=${h.id}
      data-drag-kind=${g.kind}
      data-root-dir=${g.root_dir}
      data-lane-id=${pn(g.lane_id)}
      data-row-index=${g.row_index}
      data-queue-index=${String(h.queue_index??0)}
    >
      ${qn({...h,...te(h.id,h.discard)},{actions:yo(h)})}
    </div>`}function le(h){let g=Et(h),E=Ye();return xi({parallel:{rows:g.map((oe,de)=>ie(oe,{kind:"parallel",root_dir:E,row_index:de})),count:g.length,collapsed:q.isAreaCollapsed("parallel"),drop:{drop:"parallel",root_dir:E}},serial:{lanes:rn(h).map(oe=>({id:oe.id,title:`\uC9C1\uB82C ${oe.index}`,rows:[...oe.ghosts.map(de=>qn({...de,...te(de.id,de.discard)},{actions:yo(de)})),...oe.items.map((de,Ce)=>ie(de,{kind:"repo-serial",root_dir:E,row_index:Ce,lane_id:oe.id}))],count:oe.ghosts.length+oe.items.length,match_count:ne([...oe.ghosts,...oe.items]),empty:oe.ghosts.length+oe.items.length===0,badge:oe.badge,held:oe.occupied,cycle:oe.cycle,drop:{drop:"repo-serial",root_dir:E,lane_id:oe.id,lane_length:String(oe.raw_length)}})),collapsed:q.isAreaCollapsed("serial")}})}function Be(h){return mf(Ot(h),Date.now(),Pe)}function gt(h){return h.running.some(g=>g.kind!=="session"&&g.run_state==="running")}function vt(h){let g=wt(h),E=tn(h),oe=Et(h),de=Wt(h),Ce=Qt(h),He=Ot(h),Ct=Vn({id:"worker-pane-candidate",lane:"candidate",title:"\uD6C4\uBCF4",items:E,match_count:ne(E),src:!0,empty:"\uD6C4\uBCF4 \uC5C6\uC74C",header_control:M(),header_row:P?f():void 0,controls:b(h),collapsible:!0,collapsed:q.isCollapsed("candidate"),place_menu:Oe(E),onOpenDoc:u?(dt,an)=>u(an):void 0}),Xt=Vn({id:"worker-pane-done",lane:"done",title:"\uC644\uB8CC",items:de,match_count:ne(de),empty:`${G()} \uC644\uB8CC \uC5C6\uC74C`,header_control:k(),collapsible:!0,collapsed:q.isCollapsed("done"),preview:N?Array.isArray(g.token_total)?g.token_total.map(dt=>dt.label).join(" \xB7 "):g.token_total||A_(de):void 0});return N?c`<div class="worker-lanes worker-lanes--mobile">
          ${Ai({live:gt(h),running_body:He.length>0?Be(h):"",pr_wait_rows:Ce.map(dt=>qn(dt)),count:He.length+Ce.length})}
          ${Vn({id:"worker-pane-queue",lane:"queue",title:"\uB300\uAE30",items:oe,count:oe.length,match_count:ne(oe),collapsible:!0,collapsed:q.isCollapsed("queue"),preview:A_(oe),body:le(h)})}
          ${Ct} ${Xt}
        </div>
        ${Z()}`:c`<div class="worker-lanes">
        ${Ct}
        ${Vn({id:"worker-pane-queue",lane:"queue",title:"\uB300\uAE30",items:oe,count:oe.length,match_count:ne(oe),collapsible:!0,collapsed:q.isCollapsed("queue"),body:le(h)})}
        ${Vn({id:"worker-pane-running",lane:"running",title:"\uC2E4\uD589 \uC911",items:He,match_count:ne(He),header_control:c`<span class="worker-pane__meta"
            >슬롯 ${g.slots}</span
          >`,live:gt(h),collapsible:!0,collapsed:q.isCollapsed("running"),body:Be(h)})}
        ${Vn({id:"worker-pane-pr-wait",lane:"pr_wait",title:"PR \uB300\uAE30",items:Ce,match_count:ne(Ce),empty:"PR \uB300\uAE30 \uC5C6\uC74C",collapsible:!0,collapsed:q.isCollapsed("pr_wait")})}
        ${Xt}
      </div>
      ${Z()}`}function ct(h){q.toggle(h),$()}function A(h){q.toggleArea(h),$()}function $(){let h=yt();T(h),mt(y(h),Re),mt(vt(h),re);let g=re.querySelector(".provider-resume-dialog");g&&!g.open&&(typeof g.showModal=="function"?g.showModal():g.setAttribute("open",""))}function Ie(){let h=!0,g=Zi(E=>{if(N=E,h){h=!1;return}$()});ve.push(g)}function Me(h){m=h,Fk(h),$()}function st(h){if(h==="custom"){P=!0,$();return}I=Hr(h),Vl(I),P=!1,$()}function St(h){I=Hr({chain:h}),Vl(I),$()}function jt(h){F=Hn(h),Uk(F),p?.(F),$()}function en(h){let g=h.target;if(Q){let dt=g?.closest?.(".provider-resume-dialog__runner");if(dt){let _n=Dt(Dt(xe().runner_catalog).runners),dn=Dt(_n[dt.value]),Rn=Object.keys(Dt(dn.models));Q={...Q,runner:dt.value,model:typeof dn.default_model=="string"?dn.default_model:Rn[0]||""},$();return}let an=g?.closest?.(".provider-resume-dialog__model");if(an){try{let[_n,dn]=JSON.parse(an.value);typeof _n=="string"&&typeof dn=="string"&&(Q={...Q,runner:_n,model:dn},$())}catch{}return}let cn=g?.closest?.(".provider-resume-dialog__account");if(cn){Q={...Q,account:cn.value},$();return}let Wn=g?.closest?.(".provider-resume-dialog__fresh-input");if(Wn){Q={...Q,fresh_current:Wn.checked},$();return}}let E=g?.closest?.(".worker-serial-lane-count");if(E){let dt=Number.parseInt(E.value,10);Number.isFinite(dt)&&be(dt).then($);return}let oe=h.target?.closest?.(".worker-filter__blocked");if(oe){Me({...m,show_blocked:oe.checked});return}let de=h.target?.closest?.(".worker-sort-chain__key");if(de){let dt=Number.parseInt(de.getAttribute("data-step")||"",10);Number.isFinite(dt)&&St(s_(As(I),dt,de.value));return}let Ce=h.target?.closest?.(".worker-done-range");if(Ce){jt(Ce.value);return}let He=h.target?.closest?.(".worker-sort");if(He){st(He.value);return}let Ct=h.target?.closest?.(".worker-slots__input");if(!Ct)return;let Xt=Number.parseInt(Ct.value,10);if(!Number.isFinite(Xt)){$();return}Ae(Xt).then($)}function Sr(h){return h?{runner:h.runner||void 0,model:h.model||void 0,effort:h.effort||void 0,worktree:h.worktree||void 0,status:h.status||void 0,session_id:h.session_id||void 0}:{}}function kn(){let h=wt(yt()),g=xe().workspace_info,E=g&&typeof g=="object"&&g.repo_ops&&typeof g.repo_ops=="object"?g.repo_ops:null;return{operations:h.repo_operations,cleanup_failures:h.cleanup_failures,repo:l&&l()||"",repo_ops:E}}function Er(){Pe&&Ue.close(),J.hidden=!1,Ze.hidden=!1,Qe.open(kn()),$()}function Kr(h){let g=xe(),E=g.attempts?g.attempts[h]:null;Pe=h,Qe.close(),J.hidden=!0,Ze.hidden=!1,Ue.open({attempt_id:h,meta:Sr(E)}),$()}function ca(h){let g=xe(),E=(Array.isArray(g.session_active)?g.session_active:[]).find(de=>de&&de.bead_id===h),oe=(E&&Array.isArray(E.session_refs)?E.session_refs:[]).find(de=>de&&de.current===!0);oe&&(Qe.close(),J.hidden=!0,Ze.hidden=!1,Ue.open(io(oe,h,"in_progress")),$())}function ua(){if(Qe.isOpen()&&Qe.refresh(kn()),!Pe)return;let h=xe(),g=h.attempts?h.attempts[Pe]:null;if(g){Ue.updateMeta(Sr(g));return}Ue.close()}function Ss(h,g){if(h.length===0||!s)return;let E=l?l():void 0;if(g.length===0||!E||g===E||!a){s(h);return}Promise.resolve(a(g)).then(()=>{s(h)}).catch(()=>{_e("\uB808\uD3EC \uC804\uD658\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error",2400)})}function Es(h){let g=h.target;if(g?.closest?.(".provider-resume-dialog__cancel")){nt();return}if(g?.closest?.(".provider-resume-dialog__confirm")){x();return}if(g?.closest?.(".provider-resume-dialog")||g?.closest?.(".worker-mini__grip"))return;let E=g?.closest?.(".worker-sort-chain__dir");if(E){let Se=Number.parseInt(E.getAttribute("data-step")||"",10);Number.isFinite(Se)&&St(i_(As(I),Se));return}let oe=g?.closest?.(".worker-dep__open");if(oe){Ss(oe.getAttribute("data-dep-id")||"",oe.getAttribute("data-root-dir")||"");return}let de=g?.closest?.(".judgement-chip");if(de){let Se=de.closest("[data-bead-id]"),pt=Se&&Se.getAttribute("data-bead-id")||"",Zt=de.getAttribute("data-chip-key")||"";pt&&Zt&&ee.toggle({bead_id:pt,chip_key:Zt});return}if(g?.closest?.(".chip-popover"))return;if(g?.closest?.(".worker-repo-strip")){Er();return}let Ce=g?.closest?.(".worker-repo-op__dismiss");if(Ce){ce(Ce.dataset.operationId||"");return}let He=g?.closest?.(".worker-cleanup__resume");if(He){let Se=He.dataset.beadId;Se&&Pt(Se);return}let Ct=g?.closest?.(".worker-cleanup__resolve");if(Ct){let Se=Ct.dataset.beadId;Se&&Nt(Se);return}if(g?.closest?.(".worker-hold__retry")){ue("worker-queue-hold-retry-now","\uC9C0\uAE08 \uC7AC\uC2DC\uB3C4 \uAC70\uBD80");return}if(g?.closest?.(".worker-hold__resume")){ue("worker-queue-hold-resume","\uC7AC\uAC1C \uAC70\uBD80");return}if(g?.closest?.(".worker-play")){j(!xe().auto_advance);return}let Xt=g?.closest?.(".worker-merge-all");if(Xt){Xt.classList.contains("worker-merge-all--stop")?xe().auto_merge===!0?rt(!1):ht():rt(!0);return}let dt=g?.closest?.(".worker-pane__toggle[data-lane]");if(dt){let Se=dt.dataset.lane;(Se==="candidate"||Se==="queue"||Se==="running"||Se==="pr_wait"||Se==="done")&&ct(Se);return}let an=g?.closest?.(".worker-wait__area-toggle[data-area]");if(an){let Se=an.dataset.area;(Se==="parallel"||Se==="serial")&&A(Se);return}let cn=g?.closest?.(".worker-card__place-lane");if(cn){let Se=cn.dataset.beadId,pt=cn.dataset.lane;Se&&(pt==="parallel"||/^s[1-5]$/.test(pt||""))&&(v=null,$(),at(Se,pt));return}if(g?.closest?.(".worker-card__place-cancel")){v=null,$();return}let _n=g?.closest?.(".worker-card__place");if(_n){let Se=_n.dataset.beadId;Se&&!_n.disabled&&(Yo(xe())?(v=Se,$()):at(Se,"parallel"));return}let dn=g?.closest?.(".worker-filter__chip");if(dn){let Se=dn.dataset.readiness;(Se==="all"||Se==="ready"||Se==="not_ready")&&Me({...m,readiness:Se});return}let Rn=g?.closest?.('[data-action="queue-remove"]');if(Rn){let Se=Rn.dataset.beadId||"";Se&&fe.sendOp({type:"worker-queue-remove",payload:{bead_id:Se},root_dir:Ye()},Se);return}let Qn=g?.closest?.(".worker-mini__merge");if(Qn){let Se=Qn.dataset.beadId||"";xe().cleanup_failed?.[Se]?Pt(Se):Bt(Se);return}let ln=g?.closest?.(".worker-mini__merge-cancel");if(ln){et(ln.dataset.beadId||"");return}let Xn=g?.closest?.(".worker-mini__resolve");if(Xn){Nt(Xn.dataset.beadId||"");return}let cr=g?.closest?.(".rtile__resolve");if(cr){let Se=cr.closest(".rtile");Nt(Se?.dataset.beadId||"");return}let In=g?.closest?.(".worker-mini__discard"),zn=g?.closest?.(".worker-mini__discard-abandon");if(zn){tt(zn.dataset.beadId||"",zn.dataset.operationId||"",{kind:zn.dataset.operationKind||"",last_error:zn.dataset.lastError||""});return}if(In){je(In.dataset.beadId||"",In.dataset.attemptId||null,In.dataset.discardMode==="merged"?"merged":"unmerged",In.dataset.operationId||null);return}let Ve=g?.closest?.(".worker-mini__stale-continue");if(Ve){Ne("worker-stale-work-continue",Ve.dataset.beadId||"",Ve.dataset.actionId||"");return}let Yt=g?.closest?.(".worker-mini__stale-backup");if(Yt){Ne("worker-stale-work-backup-fresh",Yt.dataset.beadId||"",Yt.dataset.actionId||"");return}let xn=g?.closest?.(".worker-mini__stale-recheck");if(xn){Ne("worker-stale-work-recheck",xn.dataset.beadId||"",xn.dataset.actionId||"");return}let ot=g?.closest?.(".worker-mini__revise-fix");if(ot){S("worker-revise-fix",ot.dataset.beadId||"");return}let w=g?.closest?.(".worker-mini__revise-approve");if(w){S("worker-revise-approve",w.dataset.beadId||"");return}if(g?.closest?.(".worker-mini__pr"))return;let D=g?.closest?.(".rtile__failure-badge");if(D){let Se=D.dataset.attemptId||"";O=O===Se?null:Se,$();return}let z=g?.closest?.(".rtile__provider-hold-badge");if(z){let Se=z.dataset.attemptId||"";R=R===Se?null:Se,$();return}let $e=g?.closest?.(".rtile__attempt-copy");if($e){let Se=$e.dataset.attemptId||"";Se&&gn(Se).then(pt=>{_e(pt?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",pt?"success":"error",1400)});return}if(g?.closest?.(".rtile__parked-retry")){let Se=g?.closest?.(".rtile");ke(Se?.dataset?.beadId||"",Se?.dataset?.attemptId||"");return}let We=g?.closest?.(".rtile__discard-abandon");if(We){let pt=g?.closest?.(".rtile")?.dataset?.beadId;pt&&tt(pt,We.dataset.operationId||"",{kind:We.dataset.operationKind||"",last_error:We.dataset.lastError||""});return}let ut=g?.closest?.(".rtile__discard");if(ut){let Se=g?.closest?.(".rtile"),pt=Se?.dataset?.beadId,Zt=Se?.dataset?.attemptId;pt&&je(pt,Zt||null,ut.dataset.confirmation==="merged"?"merged":"unmerged",ut.dataset.operationId||null);return}if(g?.closest?.(".rtile__pause")){let pt=g?.closest?.(".rtile")?.dataset?.attemptId;pt&&qt(pt);return}if(g?.closest?.(".rtile__resume-alternate")){let pt=g?.closest?.(".rtile")?.dataset?.attemptId;pt&&Ke(pt);return}if(g?.closest?.(".rtile__resume")){let Se=g?.closest?.(".rtile__resume"),Zt=g?.closest?.(".rtile")?.dataset?.attemptId;Zt&&lt(Zt,Se?.dataset?.resumeKind==="settlement"?"settlement":"session");return}if(g?.closest?.(".rtile__session")){let Se=g?.closest?.(".rtile"),pt=Se?.dataset?.attemptId;if(pt){Kr(pt);return}let Zt=Se?.dataset?.beadId;Zt&&ca(Zt);return}if(g?.closest?.(".rtile__failure-pop"))return;if(g?.closest?.(".worker-drawer-overlay__backdrop")){Qe.close(),Ue.close();return}if(g?.closest?.(".worker-drawer-host"))return;let zt=g?.closest?.(".rtile .board-card__roll-toggle");if(zt){let Se=zt.dataset.rollParent;Se&&(C.has(Se)?C.delete(Se):C.add(Se),$());return}let Xe=g?.closest?.(".rtile .board-card__roll-child");if(Xe){let Se=Xe.dataset.childId;Se&&s&&s(Se);return}let Rt=g?.closest?.(".rtile");if(Rt){if(g?.closest?.(".rtile__id")){let pt=Rt.dataset.beadId;pt&&gn(pt).then(Zt=>{Zt?_e("\uBCF5\uC0AC\uB428","success",1200):_e("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}let Se=Rt.dataset.beadId;Se&&s&&s(Se);return}let An=g?.closest?.(".worker-mini, .worker-card");if(An){let Se=An.dataset.beadId;if(g?.closest?.('[data-seam="log-path-copy"]'))return;if(g?.closest?.(".worker-mini__id, .worker-card__id")){Se&&gn(Se).then(Zt=>{Zt?_e("\uBCF5\uC0AC\uB428","success",1200):_e("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}let pt=g?.closest?.(".ctl-chip--from");if(pt){let Zt=pt.dataset.fromId;Zt&&s&&s(Zt);return}Se&&s&&s(Se)}}function da(h){let g=h.target;g?.closest?.(".worker-search")&&(H=g.value,$())}function pa(h){let g=h.target;h.key!=="Escape"||!g?.closest?.(".worker-search")||H.length===0||(H="",$())}fe.attach(e),e.addEventListener("click",Es),e.addEventListener("change",en),e.addEventListener("input",da),e.addEventListener("keydown",pa);function Gr(h){let g=h.target,E=g&&typeof g.closest=="function"?de=>g.closest(de):()=>null,oe=!1;O&&!E(".rtile__failure-pop, .rtile__failure-badge")&&(O=null,oe=!0),R&&!E(".rtile__provider-hold-pop, .rtile__provider-hold-badge")&&(R=null,oe=!0),oe&&$()}function Yr(h){h.key==="Escape"&&(O===null&&R===null&&Q===null||(O=null,R=null,Q=null,$()))}return document.addEventListener("click",Gr),document.addEventListener("keydown",Yr),ee.attach(),ve.push(()=>{document.removeEventListener("click",Gr),document.removeEventListener("keydown",Yr),ee.detach()}),Ie(),_&&ve.push(_.subscribe(()=>{ye.notifyIssuesChanged(),$()})),o&&ve.push(o.subscribe(()=>{let h=l&&l()||"";h!==Y&&(Y=h,ze.close()),$(),ua()})),$(),{load(){ye.ensureSessionDefaults(),$()},refreshSessionDefaults:De,destroy(){for(let h of ve.splice(0))try{h()}catch{}fe.detach(),e.removeEventListener("click",Es),e.removeEventListener("change",en),ye.destroy();try{Ue.destroy()}catch{}Ze.hidden=!0;try{ze.destroy()}catch{}mt(c``,e)}}}function ec(e){if(!e)return"Unknown";let t=e.split("/").filter(Boolean);return t.length>0?t[t.length-1]:"Unknown"}function C_(e,t,n,r=async()=>{},o=async()=>{}){let i=Kt("views:workspace-picker"),s=null,l=!1,a=!1,u=!1;async function d(P){let G=P.target.value,N=t.getState().workspace?.current?.path||"";if(G&&G!==N){i("switching workspace to %s",G),l=!0,I();try{await n(G)}catch(H){i("workspace switch failed: %o",H)}finally{l=!1,I()}}}async function p(){let P=t.getState(),F=P.workspace?.current?.path||P.workspace?.available?.[0]?.path||"";if(!(!F||a)){i("git-pulling workspace %s",F),a=!0,I();try{await r(F)}catch(G){i("workspace git pull failed: %o",G)}finally{a=!1,I()}}}function _(P){let F=P.target;F&&e.contains(F)||O()}function m(P){P.key==="Escape"&&O()}function v(){u||(u=!0,document.addEventListener("mousedown",_),document.addEventListener("keydown",m),I())}function O(){u&&(u=!1,document.removeEventListener("mousedown",_),document.removeEventListener("keydown",m),I())}function R(){u?O():v()}async function Q(P){let F=P.target,G=F.value,q=F.checked;i("toggling visibility %s \u2192 %s",G,String(q));try{await o(G,q)}catch(N){i("workspace visibility toggle failed: %o",N)}}function ee(P){return P?c`
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
    `:c``}function K(P,F){return c`
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
                ${P.map(G=>c`
                    <label
                      class="workspace-picker__manage-row"
                      title="${G.path}"
                    >
                      <input
                        type="checkbox"
                        class="workspace-picker__manage-checkbox"
                        value="${G.path}"
                        .checked=${!F.has(G.path)}
                        @change=${Q}
                      />
                      <span class="workspace-picker__manage-name"
                        >${ec(G.path)}</span
                      >
                    </label>
                  `)}
              </div>
            `:""}
      </div>
    `}function L(){let P=t.getState(),F=P.workspace?.current,G=P.workspace?.available||[],q=new Set(P.workspace?.hidden||[]),N=F?.path||G[0]?.path||"";if(G.length===0)return c``;let H=G.filter(W=>!q.has(W.path)||W.path===N);if(H.length<=1){let W=H[0]||G[0],ne=ec(W.path);return c`
        <div class="workspace-picker workspace-picker--single">
          <span class="workspace-picker__label" title="${W.path}"
            >${ne}</span
          >
          ${K(G,q)}
          ${ee(N)}
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
          ${H.map(W=>c`
              <option
                value="${W.path}"
                ?selected=${W.path===N}
                title="${W.path}"
              >
                ${ec(W.path)}
              </option>
            `)}
        </select>
        ${K(G,q)}
        ${ee(N)}
        ${l||a?c`<span
              class="workspace-picker__loading"
              aria-hidden="true"
            ></span>`:""}
      </div>
    `}function I(){mt(L(),e)}return I(),s=t.subscribe(()=>I()),{destroy(){s&&(s(),s=null),document.removeEventListener("mousedown",_),document.removeEventListener("keydown",m),mt(c``,e)}}}var O_=["update-status","edit-text","update-priority","create-issue","dep-add","dep-remove","update-assignee","update-exec-settings","update-impl-target","get-session-defaults","set-session-defaults","get-workspace-accounts","set-workspace-accounts","update-workflow-meta","label-add","label-remove","subscribe-list","unsubscribe-list","snapshot","upsert","delete","get-comments","add-comment","delete-issue","list-workspaces","set-workspace","set-workspace-visibility","get-workspace","workspace-changed","git-pull-workspace","subscribe-worker-queue","unsubscribe-worker-queue","worker-queue-snapshot","worker-queue-place","worker-queue-reorder","worker-queue-toggle","worker-automation-toggle","worker-provider-auto-switch-toggle","worker-repo-ops-opt-out-toggle","worker-repo-operation-dismiss","worker-repo-operation-deploy-run","worker-queue-set-slots","worker-queue-set-serial-lane-count","worker-queue-set-orchestration-defaults","worker-queue-remove","worker-attempt-pause","worker-attempt-stop","worker-attempt-resume","worker-cleanup-retry","worker-resolve-in-session","worker-parked-retry","worker-queue-hold-resume","worker-queue-hold-retry-now","worker-merge-queue-add","worker-merge-queue-add-all","worker-merge-auto-toggle","worker-merge-queue-remove","worker-discard","worker-discard-abandon","worker-stale-work-continue","worker-stale-work-backup-fresh","worker-stale-work-recheck","worker-pr-discard","worker-revise-fix","worker-revise-approve","subscribe-ui-order","unsubscribe-ui-order","ui-order-set","ui-order-snapshot","subscribe-display-policy","unsubscribe-display-policy","display-policy-set","display-policy-snapshot","subscribe-session-log","unsubscribe-session-log","session-log-snapshot","session-log-append","get-attempt-prompt","get-bead-prompt","get-bead-timeline","get-worker-system-prompt","get-session-refs","subscribe-monitor-pipeline","unsubscribe-monitor-pipeline","monitor-pipeline-snapshot","subscribe-impl-presets","unsubscribe-impl-presets","impl-presets-snapshot","impl-preset-create","impl-preset-update","impl-preset-delete","apply-impl-preset","apply-impl-preset-global","monitor-auto-toggle","monitor-lane-create","monitor-lane-update","monitor-lane-confirm","monitor-lane-remove"];function tc(){let e=Date.now().toString(36),t=Math.random().toString(36).slice(2,8);return`${e}-${t}`}function R_(e,t,n=tc()){return{id:n,type:e,payload:t}}function I_(e={}){let t=Kt("ws"),n={initialMs:e.backoff?.initialMs??1e3,maxMs:e.backoff?.maxMs??3e4,factor:e.backoff?.factor??2,jitterRatio:e.backoff?.jitterRatio??.2},r=()=>e.url&&e.url.length>0?e.url:typeof location<"u"?(location.protocol==="https:"?"wss://":"ws://")+location.host+"/ws":"ws://localhost/ws",o=null,i="closed",s=0,l=null,a=!0,u=new Map,d=[],p=new Map,_=new Set;function m(L){for(let I of Array.from(_))try{I(L)}catch{}}function v(){if(!a||l)return;i="reconnecting",t("ws reconnecting\u2026"),m(i);let L=Math.min(n.maxMs||0,(n.initialMs||0)*Math.pow(n.factor||1,s)),I=(n.jitterRatio||0)*L,P=Math.max(0,Math.round(L+(Math.random()*2-1)*I));t("ws retry in %d ms (attempt %d)",P,s+1),l=setTimeout(()=>{l=null,K()},P)}function O(L){try{o?.send(JSON.stringify(L))}catch(I){t("ws send failed",I)}}function R(){for(i="open",t("ws open"),m(i),s=0;d.length;){let L=d.shift();L&&O(L)}}function Q(L){let I;try{I=JSON.parse(String(L.data))}catch{t("ws received non-JSON message");return}if(!I||typeof I.id!="string"||typeof I.type!="string"){t("ws received invalid envelope");return}if(u.has(I.id)){let F=u.get(I.id);u.delete(I.id),I.ok?F?.resolve(I.payload):F?.reject(I.error||new Error("ws error"));return}let P=p.get(I.type);if(P&&P.size>0)for(let F of Array.from(P))try{F(I.payload)}catch(G){t("ws event handler error",G)}else t("ws received unhandled message type: %s",I.type)}function ee(){i="closed",t("ws closed"),m(i);for(let[L,I]of u.entries())I.reject(new Error("ws disconnected")),u.delete(L);s+=1,v()}function K(){if(!a)return;let L=r();try{o=new WebSocket(L),t("ws connecting %s",L),i="connecting",m(i),o.addEventListener("open",R),o.addEventListener("message",Q),o.addEventListener("error",()=>{}),o.addEventListener("close",ee)}catch(I){t("ws connect failed %o",I),v()}}return K(),{send(L,I){if(!O_.includes(L))return Promise.reject(new Error(`unknown message type: ${L}`));let P=tc(),F=R_(L,I,P);return t("send %s id=%s",L,P),new Promise((G,q)=>{u.set(P,{resolve:G,reject:q,type:L}),o&&o.readyState===o.OPEN?O(F):(t("queue %s id=%s (state=%s)",L,P,i),d.push(F))})},on(L,I){p.has(L)||p.set(L,new Set);let P=p.get(L);return P?.add(I),()=>{P?.delete(I)}},onConnection(L){return _.add(L),()=>{_.delete(L)}},reconnect(){a=!0,l&&(clearTimeout(l),l=null),s=0,K()},close(){a=!1,l&&(clearTimeout(l),l=null);try{o?.close()}catch{}},getState(){return i}}}function iw(){let e=window.__BDUI_BOOTSTRAP__;return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:null}}}async function aw(e,t){try{let r=await(await fetch("/api/config")).json();e.setState({config:r})}catch(n){t("config refresh failed",n)}}var nc=[["tab:board:ready","ready-issues"],["tab:board:blocked","blocked-issues"],["tab:board:in-progress","in-progress-issues"],["tab:board:resolved","resolved-issues"],["tab:board:deferred","deferred-issues"],["tab:board:closed","closed-issues"]],L_=[["tab:worker:ready","ready-issues"],["tab:worker:blocked","blocked-issues"],["tab:worker:in-progress","in-progress-issues"],["tab:worker:resolved","resolved-issues"],["tab:worker:closed","closed-issues"]],xr="tab:worker:closed",lw="bdui.worker.done-range",D_=If,P_="worker:queue",M_="ui:order",q_="ui:display-policy",N_="exec:presets",Ar="tab:board:closed",j_="beads-ui.board.closed-range";function cw(e){if(!e)return()=>{};function t(r){document.documentElement.style.setProperty("--app-header-h",`${Math.round(r)}px`)}if(t(e.getBoundingClientRect().height),typeof ResizeObserver!="function")return()=>{};let n=new ResizeObserver(r=>{for(let o of r)t(o.contentRect.height+uw(e))});return n.observe(e),()=>n.disconnect()}function uw(e){let t=getComputedStyle(e);return[t.paddingTop,t.paddingBottom,t.borderTopWidth,t.borderBottomWidth].reduce((r,o)=>r+(parseFloat(o)||0),0)}function dw(e){let t=Kt("main");t("bootstrap start"),cw(document.querySelector(".app-header"));let n=c`
    <section id="board-root" class="route board"></section>
    <section id="worker-root" class="route worker" hidden></section>
    <section id="monitor-root" class="route monitor" hidden></section>
    <section id="detail-panel" class="route detail" hidden></section>
  `;mt(n,e);let r=document.getElementById("global-nav"),o=document.getElementById("top-nav"),i=document.getElementById("repo-scope"),s=document.getElementById("usage-meter"),l=document.getElementById("board-root"),a=document.getElementById("worker-root"),u=document.getElementById("monitor-root"),d=document.getElementById("detail-panel");if(s&&Zf(s),l&&a&&u&&d){let ve=function(A,$){let Ie="Request failed",Me="";if(A&&typeof A=="object"){let St=A;if(typeof St.message=="string"&&St.message.length>0&&(Ie=St.message),typeof St.details=="string")Me=St.details;else if(St.details&&typeof St.details=="object")try{Me=JSON.stringify(St.details,null,2)}catch{Me=""}}else typeof A=="string"&&A.length>0&&(Ie=A);let st=$&&$.length>0?`Failed to load ${$}`:"Request failed";se.open(st,Ie,Me)},xe=function(A){return`${we.getState().workspace.current?.path||""}\0${A}`},bt=function(){Ee&&(Ee().catch(()=>{}),Ee=null),fe=null,Pe=null},Ke=function(A){Ue=A;let $=()=>{Ue!==A||we.getState().selected_id!==A||(Ue=null,_t(A))};if(!Y){ze.then($);return}$()},Oe=function(A,$,Ie,Me,st){return Ie!==Z[$]?(st().catch(()=>{}),!1):(A.set(Me,st),!0)},at=function(){let A=we.getState();At(A.view==="board"),Ge(A.view==="worker"),Ne(tt(A)),et(A.view==="board"||A.view==="worker"||Ye||!!A.selected_id)},qt=function(){let A=Lr(Fe);return A===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:A}}},lt=function(){let A=Lr(Je);return A===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:A}}},At=function(A){if(A)for(let[$,Ie]of nc){if(nt.has($)||x.has($))continue;let Me=$===Ar?qt():{type:Ie};try{Re.register($,Me)}catch(jt){t("register %s store failed: %o",$,jt)}x.add($);let st=Z.board,St=!1;ge.subscribeList($,Me).then(jt=>{St=!Oe(nt,"board",st,$,jt)}).catch(jt=>{t("subscribe %s failed: %o",$,jt),ve(jt,"board")}).finally(()=>{x.delete($),St&&at()})}else Nt()},Nt=function(){Z.board+=1;for(let[A]of nc){let $=nt.get(A);$&&($().catch(()=>{}),nt.delete(A));try{Re.unregister(A)}catch(Ie){t("unregister %s failed: %o",A,Ie)}}},Ge=function(A){if(!A){rt();return}for(let[$,Ie]of L_){if(ue.has($)||x.has($))continue;let Me=$===xr?lt():{type:Ie};try{Re.register($,Me)}catch(jt){t("register %s store failed: %o",$,jt)}x.add($);let st=Z.worker,St=!1;ge.subscribeList($,Me).then(jt=>{St=!Oe(ue,"worker",st,$,jt)}).catch(jt=>{t("subscribe %s failed: %o",$,jt),ve(jt,"worker")}).finally(()=>{x.delete($),St&&at()})}},rt=function(){Z.worker+=1;for(let[A]of L_){let $=ue.get(A);$&&($().catch(()=>{}),ue.delete(A));try{Re.unregister(A)}catch(Ie){t("unregister %s failed: %o",A,Ie)}}},et=function(A){if(!A){ht();return}ke||(De("subscribe-worker-queue",{id:P_}).catch($=>{t("subscribe-worker-queue failed: %o",$)}),ke=()=>De("unsubscribe-worker-queue",{id:P_}))},ht=function(){ke&&(ke().catch(()=>{}),ke=null)},tt=function(A){return A.view==="monitor"||A.selected_id!=null},Ne=function(A){if(!A){S();return}je||(De("subscribe-monitor-pipeline",{id:D_}).catch($=>{t("subscribe-monitor-pipeline failed: %o",$)}),je=()=>De("unsubscribe-monitor-pipeline",{id:D_}))},S=function(){je&&(je().catch(()=>{}),je=null)},ce=function(){j||(De("subscribe-ui-order",{id:M_}).catch(A=>{t("subscribe-ui-order failed: %o",A)}),j=()=>De("unsubscribe-ui-order",{id:M_}))},Ae=function(){j&&(j().catch(()=>{}),j=null),X.clear()},yt=function(){be||(De("subscribe-display-policy",{id:q_}).catch(A=>{t("subscribe-display-policy failed: %o",A)}),be=()=>De("unsubscribe-display-policy",{id:q_}))},wt=function(){be&&(be().catch(()=>{}),be=null),J.clear()},xt=function(){$t||(De("subscribe-impl-presets",{id:N_}).catch(A=>{t("subscribe-impl-presets failed: %o",A)}),$t=()=>De("unsubscribe-impl-presets",{id:N_}))},tn=function(A){if(!A)return"Unknown";let $=A.split("/").filter(Boolean);return $.length>0?$[$.length-1]:"Unknown"},U=function(A,$){k.open(A.path,{missing_state:A.missing_state,...$?{workspace:$}:{}})};var p=ve,_=xe,m=bt,v=Ke,O=Oe,R=at,Q=qt,ee=lt,K=At,L=Nt,I=Ge,P=rt,F=et,G=ht,q=tt,N=Ne,H=S,W=ce,ne=Ae,he=yt,qe=wt,B=xt,te=tn,me=U;let Te=document.getElementById("header-loading"),C=Hc(Te),se=tf(e),ye=I_(),De=C.wrapSend((A,$)=>ye.send(A,$)),ge=Nc(De),Re=jc(),Ze=Bc(),ft=hc(),X=Fc(),J=mc(),re=gc(),ae=bc();ye.on("impl-presets-snapshot",A=>{let $=A;$&&typeof $.revision=="number"&&Array.isArray($.presets)&&re.set({revision:$.revision,presets:$.presets})}),ye.on("monitor-pipeline-snapshot",A=>{let $=A;if(!(!$||!Array.isArray($.workspaces)))try{ft.set($.workspaces,$.workspaces_state,$.cross_lanes)}catch{}}),ye.on("ui-order-snapshot",A=>{let $=A;if($&&typeof $.revision=="number")try{X.set({revision:$.revision,order:$.order&&typeof $.order=="object"?$.order:{}})}catch{}}),ye.on("display-policy-snapshot",A=>{let $=A;if($&&$.policy&&typeof $.policy=="object")try{J.set($.policy)}catch{}}),ye.on("session-log-snapshot",A=>{let $=A;if($&&typeof $.id=="string")try{ae.set($.id,Array.isArray($.lines)?$.lines:[],typeof $.last_event_at=="number"?$.last_event_at:null)}catch{}}),ye.on("session-log-append",A=>{let $=A;if($&&typeof $.id=="string")try{ae.append($.id,$.event)}catch{}}),ye.on("snapshot",A=>{let $=A,Ie=$&&typeof $.id=="string"?$.id:"",Me=Ie?Re.getStore(Ie):null;if(Me&&$&&$.type==="snapshot")try{Me.applyPush($)}catch{}}),ye.on("upsert",A=>{let $=A,Ie=$&&typeof $.id=="string"?$.id:"",Me=Ie?Re.getStore(Ie):null;if(Me&&$&&$.type==="upsert")try{Me.applyPush($)}catch{}}),ye.on("delete",A=>{let $=A,Ie=$&&typeof $.id=="string"?$.id:"",Me=Ie?Re.getStore(Ie):null;if(Me&&$&&$.type==="delete")try{Me.applyPush($)}catch{}});let Ee=null,fe=null,Pe=null,Ue=null,Qe=()=>{},ze=new Promise(A=>{Qe=()=>A(void 0)}),Y=!1,V=!1;async function _t(A){let $=xe(A);if($===fe||$===Pe)return;Pe=$;let Ie=`detail:${A}`,Me={type:"issue-detail",params:{id:A}};try{Re.register(Ie,Me)}catch(st){t("register detail store failed: %o",st)}try{let st=await ge.subscribeList(Ie,Me);if(we.getState().selected_id!==A||xe(A)!==$){await st().catch(()=>{});return}Ee&&await Ee().catch(()=>{}),Ee=st,fe=$}catch(st){t("detail subscribe failed: %o",st),ve(st,"issue details")}finally{Pe===$&&(Pe=null)}}let nt=new Map,x=new Set,Z={board:0,worker:0},Ye=!1,Fe=Ds;try{let A=window.localStorage.getItem(j_);va(A)&&(Fe=A)}catch{}let Je="today";try{let A=window.localStorage.getItem(lw);A!==null&&(Je=Hn(A))}catch{}async function Bt(A){if(!va(A)||A===Fe)return;Fe=A;try{window.localStorage.setItem(j_,A)}catch{}let $=nt.get(Ar);if(!$)return;nt.delete(Ar),await $().catch(()=>{});let Ie=qt();try{Re.register(Ar,Ie)}catch(Me){t("register %s store failed: %o",Ar,Me)}try{let Me=await ge.subscribeList(Ar,Ie);nt.set(Ar,Me)}catch(Me){t("re-subscribe %s failed: %o",Ar,Me),ve(Me,"board")}}async function Pt(A){let $=Hn(A);if($===Je)return;Je=$;let Ie=ue.get(xr);if(!Ie)return;ue.delete(xr),await Ie().catch(()=>{});let Me=lt();try{Re.register(xr,Me)}catch(st){t("register %s store failed: %o",xr,st)}try{let st=await ge.subscribeList(xr,Me);ue.set(xr,st)}catch(st){t("re-subscribe %s failed: %o",xr,st),ve(st,"worker")}}let ue=new Map,ke=null,je=null,j=null,be=null,$t=null;async function Gt(){be=null,J.clear(),$t=null,re.clear(),ke=null,je=null,nt.clear(),ue.clear(),Z.board+=1,Z.worker+=1,xt();let A=we.getState().workspace.current?.path;if(A)try{await ye.send("set-workspace",{path:A})}catch(Ie){t("workspace restore after reconnect failed: %o",Ie);return}yt();let $=we.getState();At($.view==="board"),Ge($.view==="worker"),Ne(tt($)),et($.view==="board"||$.view==="worker"||!!$.selected_id)}async function Ht(){t("clearing all subscriptions for workspace switch"),Nt(),rt(),ht(),Ze.clear(),Ae(),ce(),wt(),yt(),bt();let A=we.getState();if(A.selected_id)try{Re.unregister(`detail:${A.selected_id}`)}catch{}let $=we.getState();At($.view==="board"),Ge($.view==="worker"),Ne(tt($)),et($.view==="board"||$.view==="worker"||!!$.selected_id),$.selected_id&&Ke($.selected_id)}async function Ut(A){t("requesting workspace switch to %s",A),V=!0;try{let $=await ye.send("set-workspace",{path:A});t("workspace switch result: %o",$),$&&$.workspace&&(we.setState({workspace:{current:{path:$.workspace.root_dir,database:$.workspace.db_path}}}),window.localStorage.setItem("beads-ui.workspace",A),$.changed&&(await Ht(),_e("Switched to "+tn(A),"success",2e3)))}catch($){throw t("workspace switch failed: %o",$),_e("Failed to switch workspace","error",3e3),$}finally{V=!1}}async function Et(A){t("requesting workspace git pull for %s",A);try{let $=await ye.send("git-pull-workspace",{});t("workspace git pull result: %o",$);let Ie=$?.status;if(Ie==="up_to_date"){_e("Already up to date","success",2e3);return}if(Ie==="stash_pop_conflict"){_e("Git pulled, but stash pop conflicted (check git stash list)","warning",4e3);return}_e("Git pulled "+tn(A),"success",2e3)}catch($){t("workspace git pull failed: %o",$);let Ie=$?.code,Me=$?.message;if(Ie==="rebase_conflict"){_e("Git pull conflicts \u2014 reverted (manual resolve required)","error",4e3);return}if(Ie==="rebase_conflict_abort_failed"){_e("Git pull conflicts AND rebase --abort failed \u2014 repo left mid-rebase, run 'git rebase --abort' manually","error",6e3);return}if(Ie==="busy"){_e("Git pull skipped: another operation is running","warning",3e3);return}let st=Me?`: ${Me}`:"";throw _e(`Git pull failed${st}`,"error",3e3),$}}async function rn(A,$){t("setting workspace visibility %s \u2192 %s",A,String($));try{await ye.send("set-workspace-visibility",{path:A,visible:$}),await Wt()}catch(Ie){t("workspace visibility update failed: %o",Ie),_e("Failed to update project visibility","error",3e3)}}async function Wt(){try{let A=await ye.send("list-workspaces",{});if(t("workspaces loaded: %o",A),A&&Array.isArray(A.workspaces)){let $=A.workspaces.map(St=>({path:St.path,database:St.database,pid:St.pid,version:St.version})),Ie=A.current?{path:A.current.root_dir,database:A.current.db_path}:null,Me=Array.isArray(A.hidden)?A.hidden.filter(St=>typeof St=="string"):[];we.setState({workspace:{current:Ie,available:$,hidden:Me}});let st=window.localStorage.getItem("beads-ui.workspace");st&&(!$.some(jt=>jt.path===st)||Me.includes(st)?window.localStorage.removeItem("beads-ui.workspace"):Ie&&st!==Ie.path&&(t("restoring saved workspace preference: %s",st),await Ut(st)))}}catch(A){t("failed to load workspaces: %o",A)}}ye.on("workspace-changed",A=>{t("workspace-changed event: %o",A),A&&A.root_dir&&(we.setState({workspace:{current:{path:A.root_dir,database:A.db_path}}}),Wt(),Ht())});let Ot=!1;if(typeof ye.onConnection=="function"){let A=$=>{t("ws state %s",$),$==="reconnecting"||$==="closed"?(Ot=!0,_e("Connection lost. Reconnecting\u2026","error",4e3)):$==="open"&&Ot&&(Ot=!1,_e("Reconnected","success",2200),aw(we,(Ie,Me)=>{t(`${Ie}: %o`,Me)}),Gt())};ye.onConnection(A)}let Qt="board";try{let A=window.localStorage.getItem("beads-ui.view");(A==="board"||A==="worker"||A==="monitor")&&(Qt=A)}catch(A){t("view parse error: %o",A)}let we=zc({config:iw(),view:Qt});ye.on("worker-queue-snapshot",A=>{let $=A;if(!$||!$.queue)return;let Ie=we.getState().workspace.current?.path;if(typeof Ie=="string"&&Ie.length>0&&$.root_dir!==Ie){t("dropping worker-queue snapshot for %s",String($.root_dir));return}try{Ze.set($.queue)}catch{}});let T=Uc(we);T.start();let pe=new Set(["get-comments","dep-add","dep-remove","impl-preset-create","impl-preset-update","impl-preset-delete","apply-impl-preset","apply-impl-preset-global","get-session-defaults","set-session-defaults","monitor-lane-create","monitor-lane-update","monitor-lane-confirm","monitor-lane-remove"]),Le=async(A,$)=>{try{return await De(A,$)}catch(Ie){if(pe.has(A))throw Ie;return[]}};Df({global_element:r,repo_element:o},we,T);let y=document.getElementById("workspace-picker");y&&C_(y,we,Ut,Et,rn);let b=Nf(e,(A,$)=>De(A,$));try{let A=document.getElementById("new-issue-btn");A&&A.addEventListener("click",()=>b.open())}catch{}let M=Uf(e,{policyStore:J,queueStore:Ze,implPresetStore:re,transport:(A,$)=>De(A,$),onOpenChange:A=>{let $=Ye;Ye=A,at(),$&&A===!1&&le.refreshSessionDefaults()},labelOptions:()=>{let A=new Set;for(let[$]of nc)for(let Ie of Re.snapshotFor($)||[]){let Me=Ie.labels;if(Array.isArray(Me))for(let st of Me)typeof st=="string"&&st.length>0&&A.add(st)}return Array.from(A).sort()}});try{let A=document.getElementById("display-settings-btn");A&&(A.setAttribute("aria-label","\uC124\uC815"),A.setAttribute("title","\uC124\uC815"),A.addEventListener("click",()=>M.open()))}catch{}let f=document.createElement("div");f.className="md-viewer-root",document.body.appendChild(f);let k=Qi(f,{getWorkspacePath:()=>we.getState().workspace.current?.path}),ie=au(l,{gotoIssue:A=>T.gotoIssue(A),issueStores:Re,transport:Le,workerQueueStore:Ze,uiOrderStore:X,displayPolicyStore:J,closedRange:Fe,onClosedRangeChange:A=>{Bt(A)},onNewIssue:()=>b.open(),openDoc:U}),le=Jl(a,{transport:Le,issueStores:Re,queueStore:Ze,sessionLogStore:ae,gotoIssue:A=>we.setState({selected_id:A}),getWorkspacePath:()=>we.getState().workspace.current?.path,switchWorkspace:A=>Ut(A),openDoc:U,doneRange:Je,onDoneRangeChange:A=>{Pt(A)}}),Be=Lf(u,{transport:Le,pipelineStore:ft,execPresetStore:re,sessionLogStore:ae,router:T,gotoIssue:A=>T.gotoIssue(A),getWorkspacePath:()=>we.getState().workspace.current?.path,switchWorkspace:A=>Ut(A),openDoc:U}),gt=ef(d,{issueStores:Re,transport:Le,queueStore:Ze,execPresetStore:re,sessionLogStore:ae,getWorkspacePath:()=>we.getState().workspace.current?.path,mdViewer:k,depCandidates:()=>{let A=ft.get();if(A===null)return null;let $=ft.getWorkspacesState(),Ie=we.getState();if(Ie.view==="monitor")return dl(A,$);let Me=Ie.workspace.current?.path;return Me?dl(A,$,{root_dir:Me}):null},subscribeCandidates:A=>ft.subscribe(A),onDepChanged:({type:A,a:$,b:Ie})=>{let Me=Be;A==="dep-add"&&Me&&typeof Me.recorrectSharedLane=="function"&&Me.recorrectSharedLane(A,$,Ie)},onNavigate:(A,$)=>{let Ie=()=>{we.getState().view==="worker"?we.setState({selected_id:A}):T.gotoIssue(A)},Me=we.getState().workspace.current?.path;if(typeof $!="string"||$.length===0||!Me||$===Me){Ie();return}Promise.resolve(Ut($)).then(Ie).catch(()=>{_e("\uB808\uD3EC \uC804\uD658\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error",2400)})},onClose:()=>{let A=we.getState();we.setState({selected_id:null});try{T.gotoView(A.view==="worker"||A.view==="monitor"?A.view:"board")}catch{}},onOpenExecPresets:()=>{M.open("execution")}}),vt=we.getState().selected_id;vt&&(d.hidden=!1,gt.load(vt),Ke(vt)),we.subscribe(A=>{let $=A.selected_id;$?(d.hidden=!1,gt.load($),V||Ke($)):(gt.clear(),d.hidden=!0,bt())});let ct=A=>{l.hidden=A.view!=="board",a.hidden=A.view!=="worker",u.hidden=A.view!=="monitor",i&&i.classList.toggle("is-quiet",A.view==="monitor"),At(A.view==="board"),Ge(A.view==="worker"),Ne(tt(A)),et(A.view==="board"||A.view==="worker"||Ye||!!A.selected_id),!A.selected_id&&A.view==="board"&&ie.load(),A.view==="worker"&&le.load(),A.view==="monitor"?Be.load():Be.pause(),window.localStorage.setItem("beads-ui.view",A.view)};we.subscribe(ct),ct(we.getState()),ce(),yt(),xt(),Wt().finally(()=>{Y=!0,Qe()}),window.addEventListener("keydown",A=>{let $=A.ctrlKey||A.metaKey,Ie=String(A.key||"").toLowerCase(),Me=A.target,st=Me&&Me.tagName?String(Me.tagName).toLowerCase():"",St=st==="input"||st==="textarea"||st==="select"||Me&&typeof Me.isContentEditable=="boolean"&&Me.isContentEditable;$&&Ie==="n"&&(St||(A.preventDefault(),b.open()))})}}typeof window<"u"&&typeof document<"u"&&window.addEventListener("DOMContentLoaded",()=>{try{let n=window.localStorage.getItem("beads-ui.theme"),r=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches,o=n==="dark"||n==="light"?n:r?"dark":"light";document.documentElement.setAttribute("data-theme",o);let i=document.getElementById("theme-switch");i&&(i.checked=o==="dark")}catch{}let e=document.getElementById("theme-switch");e&&e.addEventListener("change",()=>{let n=e.checked?"dark":"light";document.documentElement.setAttribute("data-theme",n),window.localStorage.setItem("beads-ui.theme",n)});let t=document.getElementById("app");t&&dw(t)});export{dw as bootstrap,iw as readBootstrapConfig,aw as refreshConfigSnapshot};
//# sourceMappingURL=main.bundle.js.map
