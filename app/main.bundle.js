var D_=Object.create;var ca=Object.defineProperty;var M_=Object.getOwnPropertyDescriptor;var q_=Object.getOwnPropertyNames;var N_=Object.getPrototypeOf,j_=Object.prototype.hasOwnProperty;var F_=(e,t,n)=>t in e?ca(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var ua=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var B_=(e,t,n,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let o of q_(t))!j_.call(e,o)&&o!==n&&ca(e,o,{get:()=>t[o],enumerable:!(r=M_(t,o))||r.enumerable});return e};var U_=(e,t,n)=>(n=e!=null?D_(N_(e)):{},B_(t||!e||!e.__esModule?ca(n,"default",{value:e,enumerable:!0}):n,e));var qt=(e,t,n)=>F_(e,typeof t!="symbol"?t+"":t,n);var hc=ua((_w,gc)=>{var Vr=1e3,Qr=Vr*60,Xr=Qr*60,Ir=Xr*24,H_=Ir*7,K_=Ir*365.25;gc.exports=function(e,t){t=t||{};var n=typeof e;if(n==="string"&&e.length>0)return G_(e);if(n==="number"&&isFinite(e))return t.long?V_(e):Y_(e);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(e))};function G_(e){if(e=String(e),!(e.length>100)){var t=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(e);if(t){var n=parseFloat(t[1]),r=(t[2]||"ms").toLowerCase();switch(r){case"years":case"year":case"yrs":case"yr":case"y":return n*K_;case"weeks":case"week":case"w":return n*H_;case"days":case"day":case"d":return n*Ir;case"hours":case"hour":case"hrs":case"hr":case"h":return n*Xr;case"minutes":case"minute":case"mins":case"min":case"m":return n*Qr;case"seconds":case"second":case"secs":case"sec":case"s":return n*Vr;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return n;default:return}}}}function Y_(e){var t=Math.abs(e);return t>=Ir?Math.round(e/Ir)+"d":t>=Xr?Math.round(e/Xr)+"h":t>=Qr?Math.round(e/Qr)+"m":t>=Vr?Math.round(e/Vr)+"s":e+"ms"}function V_(e){var t=Math.abs(e);return t>=Ir?Cs(e,t,Ir,"day"):t>=Xr?Cs(e,t,Xr,"hour"):t>=Qr?Cs(e,t,Qr,"minute"):t>=Vr?Cs(e,t,Vr,"second"):e+" ms"}function Cs(e,t,n,r){var o=t>=n*1.5;return Math.round(e/n)+" "+r+(o?"s":"")}});var yc=ua((mw,bc)=>{function Q_(e){n.debug=n,n.default=n,n.coerce=a,n.disable=s,n.enable=o,n.enabled=l,n.humanize=hc(),n.destroy=u,Object.keys(e).forEach(d=>{n[d]=e[d]}),n.names=[],n.skips=[],n.formatters={};function t(d){let p=0;for(let m=0;m<d.length;m++)p=(p<<5)-p+d.charCodeAt(m),p|=0;return n.colors[Math.abs(p)%n.colors.length]}n.selectColor=t;function n(d){let p,m=null,_,w;function R(...I){if(!R.enabled)return;let U=R,se=Number(new Date),W=se-(p||se);U.diff=W,U.prev=p,U.curr=se,p=se,I[0]=n.coerce(I[0]),typeof I[0]!="string"&&I.unshift("%O");let j=0;I[0]=I[0].replace(/%([a-zA-Z%])/g,(q,z)=>{if(q==="%%")return"%";j++;let Y=n.formatters[z];if(typeof Y=="function"){let N=I[j];q=Y.call(U,N),I.splice(j,1),j--}return q}),n.formatArgs.call(U,I),(U.log||n.log).apply(U,I)}return R.namespace=d,R.useColors=n.useColors(),R.color=n.selectColor(d),R.extend=r,R.destroy=n.destroy,Object.defineProperty(R,"enabled",{enumerable:!0,configurable:!1,get:()=>m!==null?m:(_!==n.namespaces&&(_=n.namespaces,w=n.enabled(d)),w),set:I=>{m=I}}),typeof n.init=="function"&&n.init(R),R}function r(d,p){let m=n(this.namespace+(typeof p>"u"?":":p)+d);return m.log=this.log,m}function o(d){n.save(d),n.namespaces=d,n.names=[],n.skips=[];let p=(typeof d=="string"?d:"").trim().replace(/\s+/g,",").split(",").filter(Boolean);for(let m of p)m[0]==="-"?n.skips.push(m.slice(1)):n.names.push(m)}function i(d,p){let m=0,_=0,w=-1,R=0;for(;m<d.length;)if(_<p.length&&(p[_]===d[m]||p[_]==="*"))p[_]==="*"?(w=_,R=m,_++):(m++,_++);else if(w!==-1)_=w+1,R++,m=R;else return!1;for(;_<p.length&&p[_]==="*";)_++;return _===p.length}function s(){let d=[...n.names,...n.skips.map(p=>"-"+p)].join(",");return n.enable(""),d}function l(d){for(let p of n.skips)if(i(d,p))return!1;for(let p of n.names)if(i(d,p))return!0;return!1}function a(d){return d instanceof Error?d.stack||d.message:d}function u(){console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")}return n.enable(n.load()),n}bc.exports=Q_});var vc=ua((wn,Rs)=>{wn.formatArgs=Z_;wn.save=J_;wn.load=em;wn.useColors=X_;wn.storage=tm();wn.destroy=(()=>{let e=!1;return()=>{e||(e=!0,console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."))}})();wn.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"];function X_(){if(typeof window<"u"&&window.process&&(window.process.type==="renderer"||window.process.__nwjs))return!0;if(typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))return!1;let e;return typeof document<"u"&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||typeof window<"u"&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||typeof navigator<"u"&&navigator.userAgent&&(e=navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/))&&parseInt(e[1],10)>=31||typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)}function Z_(e){if(e[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+e[0]+(this.useColors?"%c ":" ")+"+"+Rs.exports.humanize(this.diff),!this.useColors)return;let t="color: "+this.color;e.splice(1,0,t,"color: inherit");let n=0,r=0;e[0].replace(/%[a-zA-Z%]/g,o=>{o!=="%%"&&(n++,o==="%c"&&(r=n))}),e.splice(r,0,t)}wn.log=console.debug||console.log||(()=>{});function J_(e){try{e?wn.storage.setItem("debug",e):wn.storage.removeItem("debug")}catch{}}function em(){let e;try{e=wn.storage.getItem("debug")||wn.storage.getItem("DEBUG")}catch{}return!e&&typeof process<"u"&&"env"in process&&(e=process.env.DEBUG),e}function tm(){try{return localStorage}catch{}}Rs.exports=yc()(wn);var{formatters:nm}=Rs.exports;nm.j=function(e){try{return JSON.stringify(e)}catch(t){return"[UnexpectedJSONParseError]: "+t.message}}});var Ao=globalThis,ws=Ao.trustedTypes,ec=ws?ws.createPolicy("lit-html",{createHTML:e=>e}):void 0,pa="$lit$",Xn=`lit$${Math.random().toFixed(9).slice(2)}$`,fa="?"+Xn,W_=`<${fa}>`,Tr=document,So=()=>Tr.createComment(""),Eo=e=>e===null||typeof e!="object"&&typeof e!="function",_a=Array.isArray,ic=e=>_a(e)||typeof e?.[Symbol.iterator]=="function",da=`[ 	
\f\r]`,xo=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,tc=/-->/g,nc=/>/g,Sr=RegExp(`>|${da}(?:([^\\s"'>=/]+)(${da}*=${da}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),rc=/'/g,oc=/"/g,ac=/^(?:script|style|textarea|title)$/i,ma=e=>(t,...n)=>({_$litType$:e,strings:t,values:n}),c=ma(1),Co=ma(2),aw=ma(3),Tn=Symbol.for("lit-noChange"),zt=Symbol.for("lit-nothing"),sc=new WeakMap,Er=Tr.createTreeWalker(Tr,129);function lc(e,t){if(!_a(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return ec!==void 0?ec.createHTML(t):t}var cc=(e,t)=>{let n=e.length-1,r=[],o,i=t===2?"<svg>":t===3?"<math>":"",s=xo;for(let l=0;l<n;l++){let a=e[l],u,d,p=-1,m=0;for(;m<a.length&&(s.lastIndex=m,d=s.exec(a),d!==null);)m=s.lastIndex,s===xo?d[1]==="!--"?s=tc:d[1]!==void 0?s=nc:d[2]!==void 0?(ac.test(d[2])&&(o=RegExp("</"+d[2],"g")),s=Sr):d[3]!==void 0&&(s=Sr):s===Sr?d[0]===">"?(s=o??xo,p=-1):d[1]===void 0?p=-2:(p=s.lastIndex-d[2].length,u=d[1],s=d[3]===void 0?Sr:d[3]==='"'?oc:rc):s===oc||s===rc?s=Sr:s===tc||s===nc?s=xo:(s=Sr,o=void 0);let _=s===Sr&&e[l+1].startsWith("/>")?" ":"";i+=s===xo?a+W_:p>=0?(r.push(u),a.slice(0,p)+pa+a.slice(p)+Xn+_):a+Xn+(p===-2?l:_)}return[lc(e,i+(e[n]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),r]},To=class e{constructor({strings:t,_$litType$:n},r){let o;this.parts=[];let i=0,s=0,l=t.length-1,a=this.parts,[u,d]=cc(t,n);if(this.el=e.createElement(u,r),Er.currentNode=this.el.content,n===2||n===3){let p=this.el.content.firstChild;p.replaceWith(...p.childNodes)}for(;(o=Er.nextNode())!==null&&a.length<l;){if(o.nodeType===1){if(o.hasAttributes())for(let p of o.getAttributeNames())if(p.endsWith(pa)){let m=d[s++],_=o.getAttribute(p).split(Xn),w=/([.?@])?(.*)/.exec(m);a.push({type:1,index:i,name:w[2],strings:_,ctor:w[1]==="."?xs:w[1]==="?"?As:w[1]==="@"?Ss:Rr}),o.removeAttribute(p)}else p.startsWith(Xn)&&(a.push({type:6,index:i}),o.removeAttribute(p));if(ac.test(o.tagName)){let p=o.textContent.split(Xn),m=p.length-1;if(m>0){o.textContent=ws?ws.emptyScript:"";for(let _=0;_<m;_++)o.append(p[_],So()),Er.nextNode(),a.push({type:2,index:++i});o.append(p[m],So())}}}else if(o.nodeType===8)if(o.data===fa)a.push({type:2,index:i});else{let p=-1;for(;(p=o.data.indexOf(Xn,p+1))!==-1;)a.push({type:7,index:i}),p+=Xn.length-1}i++}}static createElement(t,n){let r=Tr.createElement("template");return r.innerHTML=t,r}};function Cr(e,t,n=e,r){if(t===Tn)return t;let o=r!==void 0?n._$Co?.[r]:n._$Cl,i=Eo(t)?void 0:t._$litDirective$;return o?.constructor!==i&&(o?._$AO?.(!1),i===void 0?o=void 0:(o=new i(e),o._$AT(e,n,r)),r!==void 0?(n._$Co??(n._$Co=[]))[r]=o:n._$Cl=o),o!==void 0&&(t=Cr(e,o._$AS(e,t.values),o,r)),t}var $s=class{constructor(t,n){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=n}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:n},parts:r}=this._$AD,o=(t?.creationScope??Tr).importNode(n,!0);Er.currentNode=o;let i=Er.nextNode(),s=0,l=0,a=r[0];for(;a!==void 0;){if(s===a.index){let u;a.type===2?u=new Gr(i,i.nextSibling,this,t):a.type===1?u=new a.ctor(i,a.name,a.strings,this,t):a.type===6&&(u=new Es(i,this,t)),this._$AV.push(u),a=r[++l]}s!==a?.index&&(i=Er.nextNode(),s++)}return Er.currentNode=Tr,o}p(t){let n=0;for(let r of this._$AV)r!==void 0&&(r.strings!==void 0?(r._$AI(t,r,n),n+=r.strings.length-2):r._$AI(t[n])),n++}},Gr=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,n,r,o){this.type=2,this._$AH=zt,this._$AN=void 0,this._$AA=t,this._$AB=n,this._$AM=r,this.options=o,this._$Cv=o?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,n=this._$AM;return n!==void 0&&t?.nodeType===11&&(t=n.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,n=this){t=Cr(this,t,n),Eo(t)?t===zt||t==null||t===""?(this._$AH!==zt&&this._$AR(),this._$AH=zt):t!==this._$AH&&t!==Tn&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):ic(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==zt&&Eo(this._$AH)?this._$AA.nextSibling.data=t:this.T(Tr.createTextNode(t)),this._$AH=t}$(t){let{values:n,_$litType$:r}=t,o=typeof r=="number"?this._$AC(t):(r.el===void 0&&(r.el=To.createElement(lc(r.h,r.h[0]),this.options)),r);if(this._$AH?._$AD===o)this._$AH.p(n);else{let i=new $s(o,this),s=i.u(this.options);i.p(n),this.T(s),this._$AH=i}}_$AC(t){let n=sc.get(t.strings);return n===void 0&&sc.set(t.strings,n=new To(t)),n}k(t){_a(this._$AH)||(this._$AH=[],this._$AR());let n=this._$AH,r,o=0;for(let i of t)o===n.length?n.push(r=new e(this.O(So()),this.O(So()),this,this.options)):r=n[o],r._$AI(i),o++;o<n.length&&(this._$AR(r&&r._$AB.nextSibling,o),n.length=o)}_$AR(t=this._$AA.nextSibling,n){for(this._$AP?.(!1,!0,n);t!==this._$AB;){let r=t.nextSibling;t.remove(),t=r}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},Rr=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,n,r,o,i){this.type=1,this._$AH=zt,this._$AN=void 0,this.element=t,this.name=n,this._$AM=o,this.options=i,r.length>2||r[0]!==""||r[1]!==""?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=zt}_$AI(t,n=this,r,o){let i=this.strings,s=!1;if(i===void 0)t=Cr(this,t,n,0),s=!Eo(t)||t!==this._$AH&&t!==Tn,s&&(this._$AH=t);else{let l=t,a,u;for(t=i[0],a=0;a<i.length-1;a++)u=Cr(this,l[r+a],n,a),u===Tn&&(u=this._$AH[a]),s||(s=!Eo(u)||u!==this._$AH[a]),u===zt?t=zt:t!==zt&&(t+=(u??"")+i[a+1]),this._$AH[a]=u}s&&!o&&this.j(t)}j(t){t===zt?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},xs=class extends Rr{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===zt?void 0:t}},As=class extends Rr{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==zt)}},Ss=class extends Rr{constructor(t,n,r,o,i){super(t,n,r,o,i),this.type=5}_$AI(t,n=this){if((t=Cr(this,t,n,0)??zt)===Tn)return;let r=this._$AH,o=t===zt&&r!==zt||t.capture!==r.capture||t.once!==r.once||t.passive!==r.passive,i=t!==zt&&(r===zt||o);o&&this.element.removeEventListener(this.name,this,r),i&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},Es=class{constructor(t,n,r){this.element=t,this.type=6,this._$AN=void 0,this._$AM=n,this.options=r}get _$AU(){return this._$AM._$AU}_$AI(t){Cr(this,t)}},uc={M:pa,P:Xn,A:fa,C:1,L:cc,R:$s,D:ic,V:Cr,I:Gr,H:Rr,N:As,U:Ss,B:xs,F:Es},z_=Ao.litHtmlPolyfillSupport;z_?.(To,Gr),(Ao.litHtmlVersions??(Ao.litHtmlVersions=[])).push("3.3.1");var dt=(e,t,n)=>{let r=n?.renderBefore??t,o=r._$litPart$;if(o===void 0){let i=n?.renderBefore??null;r._$litPart$=o=new Gr(t.insertBefore(So(),i),i,void 0,n??{})}return o._$AI(e),o};var Ts="today",dc=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"},{value:"30d",label:"\uCD5C\uADFC 30\uC77C"},{value:"all",label:"\uC804\uCCB4"}],Yr=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"}];function zn(e){return e==="today"?"today":"7d"}function ga(e){return e==="today"||e==="7d"||e==="30d"||e==="all"}function Or(e,t=Date.now()){switch(e){case"today":{let n=new Date(t);return n.setHours(0,0,0,0),n.getTime()}case"7d":return t-7*864e5;case"30d":return t-30*864e5;case"all":default:return}}function pc(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function fc(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function _c(){let e=null,t=[],n,r=new Set;function o(){for(let i of Array.from(r))try{i()}catch{}}return{get(){return e},getWorkspacesState(){return t},crossLanes(){return n},set(i,s,l){e=Array.isArray(i)?i:null,t=Array.isArray(s)?s:[],n=l===void 0?void 0:l!==null&&typeof l=="object"&&typeof l.revision=="number"&&Array.isArray(l.lanes)?{revision:l.revision,lanes:l.lanes}:null,o()},clear(){e=null,t=[],n=void 0,o()},subscribe(i){return r.add(i),()=>r.delete(i)}}}function mc(){let e=new Map,t=new Set;function n(o){return o.startsWith("session-log:")?o:`session-log:${o}`}function r(){for(let o of Array.from(t))try{o()}catch{}}return{set(o,i,s=null){e.set(n(o),{lines:Array.isArray(i)?[...i]:[],last_event_at:typeof s=="number"?s:null}),r()},append(o,i){let s=n(o),l=e.get(s)||{lines:[],last_event_at:null};l.lines=[...l.lines,i],l.last_event_at=Date.now(),e.set(s,l),r()},get(o){return e.get(n(o))||null},clear(o){typeof o=="string"?e.delete(n(o)):e.clear(),r()},subscribe(o){return t.add(o),()=>t.delete(o)}}}var kc=U_(vc(),1);function Ft(e){return(0,kc.default)(`beads-ui:${e}`)}function rm(e){let n=wc((e&&typeof e=="object"?e:{}).spec_id);return n?{path:n,source:"native",conflict:!1}:{path:"",source:"none",conflict:!1}}function wc(e){return typeof e=="string"?e.trim():""}function om(e){let t=e&&typeof e=="object"?e:{};return t.metadata&&typeof t.metadata=="object"?t.metadata:{}}var sm=/^[A-Za-z0-9_.:-]+@[0-9a-fA-F]{40}$/;function Zr(e){let t=rm(e),n=wc(om(e).spec_review),r=sm.test(n),o=r&&n.slice(0,n.indexOf("@"))==="skipped";return t.source==="none"?{...t,evidence:"none",skipped:o}:{...t,evidence:r?"published":"draft",skipped:o}}function In(e){if(typeof e=="number")return Number.isFinite(e)?e:0;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:0}return 0}function Ro(e,t){let n=In(e.created_at),r=In(t.created_at);if(n!==r)return n<r?1:-1;let o=e.priority??2,i=t.priority??2;if(o!==i)return o-i;let s=e.id,l=t.id;return s<l?-1:s>l?1:0}function Tc(e,t){let n=In(e.created_at),r=In(t.created_at);if(n!==r)return n<r?-1:1;let o=e.priority??2,i=t.priority??2;if(o!==i)return o-i;let s=e.id,l=t.id;return s<l?-1:s>l?1:0}function Cc(e,t){let n=In(e.updated_at),r=In(t.updated_at);if(n!==r)return n<r?1:-1;let o=e.id,i=t.id;return o<i?-1:o>i?1:0}function Rc(e,t){let n=e.priority??2,r=t.priority??2;if(n!==r)return n-r;let o=In(e.created_at),i=In(t.created_at);if(o!==i)return o<i?1:-1;let s=e.id,l=t.id;return s<l?-1:s>l?1:0}function Oc(e,t){let n=e.closed_at??0,r=t.closed_at??0;if(n!==r)return n<r?1:-1;let o=e?.id,i=t?.id;return o<i?-1:o>i?1:0}var Os=Object.freeze({priority:"asc",dependents:"desc",released:"desc",spec:"desc",created:"asc",updated:"desc"});function im(e){return typeof e=="string"&&Object.prototype.hasOwnProperty.call(Os,e)}function ba(e){if(!e||typeof e!="object")return!1;let t=e;return im(t.key)&&(t.dir==="asc"||t.dir==="desc")}function $c(e){if(typeof e=="number")return Number.isFinite(e)?e:null;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:null}return null}function xc(e,t){switch(t){case"priority":{let n=e.priority;return typeof n=="number"&&Number.isFinite(n)?n:null}case"dependents":{let n=e.dependents_info?e.dependents_info.count:null;return typeof n=="number"&&Number.isFinite(n)?n:null}case"released":{let n=e.release_info?e.release_info.last_released_at:null;return typeof n=="number"&&Number.isFinite(n)?n:null}case"spec":return Zr(e).evidence==="published"?1:0;case"created":return $c(e.created_at);case"updated":return $c(e.updated_at);default:return null}}function Ac(e,t,n){let r=xc(e,n.key),o=xc(t,n.key);if(r===null||o===null)return r===o?0:r===null?1:-1;if(r===o)return 0;let i=r<o?-1:1;return n.dir==="desc"?-i:i}function Ic(e){let t=Array.isArray(e)?e.filter(ba):[];return(n,r)=>{for(let l of t){let a=Ac(n,r,l);if(a!==0)return a}let o=Ac(n,r,{key:"created",dir:"asc"});if(o!==0)return o;let i=n.id,s=r.id;return i<s?-1:i>s?1:0}}var am=/^(?:[A-Za-z][A-Za-z0-9]*(?:-[A-Za-z0-9]+)+\s+)?(?:Task|Phase|T)\s*(\d+)/i;function Sc(e){let t=e&&e.metadata,n=t?t.task_order:void 0;if(n==null||n==="")return Number.POSITIVE_INFINITY;let r=Number(n);return Number.isFinite(r)?r:Number.POSITIVE_INFINITY}function Ec(e){let t=e&&e.title;if(typeof t!="string")return Number.POSITIVE_INFINITY;let n=am.exec(t);if(!n)return Number.POSITIVE_INFINITY;let r=Number(n[1]);return Number.isFinite(r)?r:Number.POSITIVE_INFINITY}function Lc(e,t){let n=Sc(e),r=Sc(t);if(n!==r)return n<r?-1:1;let o=Ec(e),i=Ec(t);if(o!==i)return o<i?-1:1;let s=In(e&&e.created_at),l=In(t&&t.created_at);if(s!==l)return s<l?-1:1;let a=e&&e.id,u=t&&t.id;return a===u?0:String(a)<String(u)?-1:1}var ha=2**20;function Jr(e,t){let n=e&&e.id;return t&&typeof n=="string"&&Object.prototype.hasOwnProperty.call(t,n)&&typeof t[n]=="number"&&Number.isFinite(t[n])?t[n]:-In(e&&e.created_at)}function Pc(e){return(t,n)=>{let r=Jr(t,e),o=Jr(n,e);if(r!==o)return r<o?-1:1;let i=t?.id,s=n?.id;return i<s?-1:i>s?1:0}}function ya(e,t,n){let r=Array.isArray(e)?e:[],o=r.length,i=Math.max(0,Math.min(t,o-1)),s=i-1>=0?r[i-1]:null,l=i+1<o?r[i+1]:null;if(!s&&!l)return{rank:0};if(!s)return{rank:Jr(l,n)-ha};if(!l)return{rank:Jr(s,n)+ha};let a=Jr(s,n),u=Jr(l,n),d=(a+u)/2;return a<d&&d<u?{rank:d}:{renormalize:r.map((p,m)=>({bead_id:p.id,rank:m*ha}))}}function va(e,t={}){let n=Ft(`issue-store:${e}`),r=new Map,o=[],i=0,s=new Set,l=!1,a=t.sort||Ro;function u(){for(let m of Array.from(s))try{m()}catch{}}function d(){o=Array.from(r.values()).sort(a)}function p(m){if(l||!m||m.id!==e)return;let _=Number(m.revision)||0;if(n("apply %s rev=%d",m.type,_),!(_<=i&&m.type!=="snapshot")){if(m.type==="snapshot"){if(_<=i)return;r.clear();let w=Array.isArray(m.issues)?m.issues:[];for(let R of w)R&&typeof R.id=="string"&&R.id.length>0&&r.set(R.id,R);d(),i=_,u();return}if(m.type==="upsert"){let w=m.issue;if(w&&typeof w.id=="string"&&w.id.length>0){let R=r.get(w.id);if(!R)r.set(w.id,w);else{let I=Number.isFinite(R.updated_at)?R.updated_at:0,U=Number.isFinite(w.updated_at)?w.updated_at:0;if(I<=U){for(let se of Object.keys(R))se in w||delete R[se];for(let[se,W]of Object.entries(w))R[se]=W}}d()}i=_,u()}else if(m.type==="delete"){let w=String(m.issue_id||"");w&&(r.delete(w),d()),i=_,u()}}}return{id:e,subscribe(m){return s.add(m),()=>{s.delete(m)}},applyPush:p,snapshot(){return o},size(){return r.size},getById(m){return r.get(m)},dispose(){l=!0,r.clear(),o=[],s.clear(),i=0}}}function Is(e){let t=String(e.type||"").trim(),n={};if(e.params&&typeof e.params=="object"){let o=Object.keys(e.params).sort();for(let i of o){let s=e.params[i];n[i]=String(s)}}let r=new URLSearchParams(n).toString();return r.length>0?`${t}?${r}`:t}function Dc(e){let t=Ft("subs"),n=new Map,r=new Map;function o(l,a){t("applyDelta %s +%d ~%d -%d",l,(a.added||[]).length,(a.updated||[]).length,(a.removed||[]).length);let u=r.get(l);if(!u||u.size===0)return;let d=Array.isArray(a.added)?a.added:[],p=Array.isArray(a.updated)?a.updated:[],m=Array.isArray(a.removed)?a.removed:[];for(let _ of Array.from(u)){let w=n.get(_);if(!w)continue;let R=w.itemsById;for(let I of d)typeof I=="string"&&I.length>0&&R.set(I,!0);for(let I of p)typeof I=="string"&&I.length>0&&R.set(I,!0);for(let I of m)typeof I=="string"&&I.length>0&&R.delete(I)}}async function i(l,a){let u=Is(a);if(t("subscribe %s key=%s",l,u),!n.has(l))n.set(l,{key:u,itemsById:new Map});else{let p=n.get(l);if(p&&p.key!==u){let m=r.get(p.key);m&&(m.delete(l),m.size===0&&r.delete(p.key)),n.set(l,{key:u,itemsById:new Map})}}r.has(u)||r.set(u,new Set);let d=r.get(u);d&&d.add(l);try{await e("subscribe-list",{id:l,type:a.type,params:a.params})}catch(p){let m=n.get(l)||null;if(m){let _=r.get(m.key);_&&(_.delete(l),_.size===0&&r.delete(m.key))}throw n.delete(l),p}return async()=>{t("unsubscribe %s key=%s",l,u);try{await e("unsubscribe-list",{id:l})}catch{}let p=n.get(l)||null;if(p){let m=r.get(p.key);m&&(m.delete(l),m.size===0&&r.delete(p.key))}n.delete(l)}}return{subscribeList:i,_applyDelta:o,_subKeyOf:Is,selectors:{getIds(l){let a=n.get(l);return a?Array.from(a.itemsById.keys()):[]},has(l,a){let u=n.get(l);return u?u.itemsById.has(a):!1},count(l){let a=n.get(l);return a?a.itemsById.size:0},getItemsById(l){let a=n.get(l),u={};if(!a)return u;for(let d of a.itemsById.keys())u[d]=!0;return u}}}}function Mc(){let e=Ft("issue-stores"),t=new Map,n=new Map,r=new Set,o=new Map;function i(){for(let a of Array.from(r))try{a()}catch{}}function s(a,u,d){let p=u?Is(u):"",m=n.get(a)||"",_=t.has(a);if(e("register %s key=%s (prev=%s)",a,p,m),_&&m&&p&&m!==p){let w=t.get(a);if(w)try{w.dispose()}catch{}let R=o.get(a);if(R){try{R()}catch{}o.delete(a)}let I=va(a,d);t.set(a,I);let U=I.subscribe(()=>i());o.set(a,U)}else if(!_){let w=va(a,d);t.set(a,w);let R=w.subscribe(()=>i());o.set(a,R)}return n.set(a,p),()=>l(a)}function l(a){e("unregister %s",a),n.delete(a);let u=t.get(a);u&&(u.dispose(),t.delete(a));let d=o.get(a);if(d){try{d()}catch{}o.delete(a)}}return{register:s,unregister:l,getStore(a){return t.get(a)||null},snapshotFor(a){let u=t.get(a);return u?u.snapshot().slice():[]},subscribe(a){return r.add(a),()=>r.delete(a)}}}function qc(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function Nc(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function ka(e,t){return`#/${e==="worker"||e==="monitor"?e:"board"}?issue=${encodeURIComponent(t)}`}function lm(e){let t=String(e||""),n=t.startsWith("#")?t.slice(1):t,r=n.indexOf("?"),o=r>=0?n.slice(r+1):"";if(o){let l=new URLSearchParams(o).get("issue");if(l)return decodeURIComponent(l)}let i=/^\/issue\/([^\s?#]+)/.exec(n);return i&&i[1]?decodeURIComponent(i[1]):null}function cm(e){let t=String(e||"");return/^#\/worker(\b|\/|$)/.test(t)?"worker":/^#\/monitor(\b|\/|$)/.test(t)?"monitor":"board"}function jc(e){let t=Ft("router"),n=()=>{let r=window.location.hash||"",o=/^#\/issue\/([^\s?#]+)/.exec(r),i=o&&o[1]?decodeURIComponent(o[1]):lm(r),s=cm(r);if(t("hash change \u2192 view=%s id=%s",s,i),e.setState({selected_id:s==="worker"?null:i,view:s,worker:{selected_parent_id:s==="worker"?i:null}}),!!o||/^#\/(issues|epics)(\b|\/|\?|$)/.test(r)){let a=i?`#/${s}?issue=${encodeURIComponent(i)}`:`#/${s}`;window.location.hash!==a&&(window.location.hash=a)}};return{start(){window.addEventListener("hashchange",n),n()},stop(){window.removeEventListener("hashchange",n)},gotoIssue(r){let o=e.getState?e.getState():{view:"board"},i=o.view==="worker"||o.view==="monitor"?o.view:"board",s=ka(i,r);t("goto issue %s (view=%s)",r,i),window.location.hash!==s?window.location.hash=s:e.setState({selected_id:i==="worker"?null:r,view:i,worker:{selected_parent_id:i==="worker"?r:null}})},gotoView(r){let o=e.getState?e.getState():{selected_id:null,worker:{selected_parent_id:null}},i=r==="worker"?o.worker?.selected_parent_id:o.selected_id,s=i?ka(r,i):`#/${r}`;t("goto view %s (id=%s)",r,i||""),window.location.hash!==s?window.location.hash=s:e.setState({view:r,selected_id:r==="worker"?null:o.selected_id})}}}var um=Object.freeze({workspace_config:{default_workspace:null}});function Fc(e){return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:um.workspace_config.default_workspace}}}function Bc(e={}){let t=Ft("state"),n={selected_id:e.selected_id??null,view:e.view??"board",filters:{status:e.filters?.status??"all",search:e.filters?.search??"",type:typeof e.filters?.type=="string"?e.filters?.type:""},board:{closed_filter:e.board?.closed_filter==="3"||e.board?.closed_filter==="7"||e.board?.closed_filter==="today"?e.board?.closed_filter:"today"},worker:{selected_parent_id:e.worker?.selected_parent_id??null,show_closed_children:Array.isArray(e.worker?.show_closed_children)?e.worker.show_closed_children:[]},workspace:{current:e.workspace?.current??null,available:e.workspace?.available??[],hidden:e.workspace?.hidden??[]},config:Fc(e.config)},r=new Set;function o(){for(let i of Array.from(r))try{i(n)}catch{}}return{getState(){return n},setState(i){let s={...n,...i,filters:{...n.filters,...i.filters||{}},board:{...n.board,...i.board||{}},worker:{...n.worker,...i.worker||{}},workspace:{current:i.workspace?.current!==void 0?i.workspace.current:n.workspace.current,available:i.workspace?.available!==void 0?i.workspace.available:n.workspace.available,hidden:i.workspace?.hidden!==void 0?i.workspace.hidden:n.workspace.hidden},config:i.config!==void 0?Fc(i.config):n.config},l=s.workspace.current?.path!==n.workspace.current?.path||s.workspace.available.length!==n.workspace.available.length||s.workspace.hidden.length!==n.workspace.hidden.length||s.workspace.hidden.some((u,d)=>u!==n.workspace.hidden[d]),a=s.config.workspace_config.default_workspace!==n.config.workspace_config.default_workspace;s.selected_id===n.selected_id&&s.view===n.view&&s.filters.status===n.filters.status&&s.filters.search===n.filters.search&&s.filters.type===n.filters.type&&s.board.closed_filter===n.board.closed_filter&&s.worker.selected_parent_id===n.worker.selected_parent_id&&s.worker.show_closed_children.length===n.worker.show_closed_children.length&&s.worker.show_closed_children.every((u,d)=>u===n.worker.show_closed_children[d])&&!l&&!a||(n=s,t("state change %o",{selected_id:n.selected_id,view:n.view,filters:n.filters,board:n.board,worker:n.worker,workspace:n.workspace.current?.path,config:{default_workspace:n.config.workspace_config.default_workspace}}),o())},subscribe(i){return r.add(i),()=>r.delete(i)}}}function Uc(e){let t=Ft("activity"),n=0,r=new Map,o=1;function i(){if(!e)return;let u=n>0;e.toggleAttribute("hidden",!u),e.setAttribute("aria-busy",u?"true":"false")}function s(){n+=1,t("start count=%d",n),i()}function l(){let u=n;n=Math.max(0,n-1),u<=0?t("done called but count was already %d",u):t("done count=%d\u2192%d",u,n),i()}function a(u){return async(p,m)=>{let _=o++,w=Date.now();r.set(_,{type:p,start_ts:w}),t("request start id=%d type=%s count=%d",_,p,n+1),s();let R=!1,I=()=>{R||(R=!0,r.delete(_),l())},U=setTimeout(()=>{R||(t("request TIMEOUT id=%d type=%s elapsed=%dms",_,p,Date.now()-w),I())},3e4);try{let se=await u(p,m),W=Date.now()-w;return t("request done id=%d type=%s elapsed=%dms",_,p,W),se}catch(se){let W=Date.now()-w;throw t("request error id=%d type=%s elapsed=%dms err=%o",_,p,W,se),se}finally{clearTimeout(U),I()}}}return i(),{wrapSend:a,start:s,done:l,getCount:()=>n,getActiveRequests:()=>{let u=Date.now();return Array.from(r.entries()).map(([d,p])=>({id:d,type:p.type,elapsed_ms:u-p.start_ts}))}}}function be(e,t="info",n=2800){let r=document.createElement("div");r.className="toast",r.textContent=e,r.style.position="fixed",r.style.right="12px",r.style.bottom="12px",r.style.zIndex="1000",r.style.color="#fff",r.style.padding="8px 10px",r.style.borderRadius="4px",r.style.fontSize="12px",t==="success"?r.style.background="#156d36":t==="warning"?r.style.background="#a36a00":t==="error"?r.style.background="#9f2011":r.style.background="rgba(0,0,0,0.85)",(document.body||document.documentElement).appendChild(r),setTimeout(()=>{try{r.remove()}catch{}},n)}function eo(e=void 0,t=void 0){function n(){if(!t||typeof t.get!="function")return null;let i=t.get();return i&&i.order?i.order:{}}function r(i,s,l){let a=e&&e.snapshotFor?e.snapshotFor(i).slice():[];if(s==="closed")return a.sort(Oc),a;switch(l){case"created_desc":return a.sort(Ro),a;case"created_asc":return a.sort(Tc),a;case"updated_desc":return a.sort(Cc),a;case"priority":return a.sort(Rc),a;case"manual":default:{let u=n();return u?a.sort(Pc(u)):a.sort(Ro),a}}}function o(i){let s=[];return e&&typeof e.subscribe=="function"&&s.push(e.subscribe(i)),t&&typeof t.subscribe=="function"&&s.push(t.subscribe(i)),()=>{for(let l of s)try{l()}catch{}}}return{selectBoardColumn:r,subscribe:o}}function ur(e){if(!e)return null;if(typeof e=="number")return Number.isFinite(e)?e:null;let t=Date.parse(e);return Number.isFinite(t)?t:null}function tn(e){let t=ur(e);if(t===null)return"";let n=new Date(t),r=o=>String(o).padStart(2,"0");return`${n.getFullYear()}-${r(n.getMonth()+1)}-${r(n.getDate())} ${r(n.getHours())}:${r(n.getMinutes())}`}function fn(e,t){let n=ur(e);if(n===null)return"";let o=(typeof t=="number"?t:Date.now())-n;if(o<6e4)return"\uBC29\uAE08";let i=Math.floor(o/6e4);if(i<60)return`${i}\uBD84 \uC804`;let s=Math.floor(o/36e5);if(s<24)return`${s}\uC2DC\uAC04 \uC804`;let l=Math.floor(o/864e5);if(l<7)return`${l}\uC77C \uC804`;let a=Math.floor(l/7);if(l<30)return`${a}\uC8FC \uC804`;let u=Math.floor(l/30);return u<12?`${u}\uAC1C\uC6D4 \uC804`:`${Math.floor(l/365)}\uB144 \uC804`}function Wc(e){if(!Array.isArray(e))return null;let t=null,n=-1;for(let r of e){if(!r||r.status!=="in_progress")continue;let o=ur(r.updated_at)??0;if(t===null||o>n){t=r,n=o;continue}o===n&&String(r.id)<String(t.id)&&(t=r)}return t}function Ls(e){let t=e&&e.parent;return typeof t=="string"?t:t&&t.id?String(t.id):""}function Ps(e){let t=new Map;for(let r of e)r&&r.id&&!t.has(r.id)&&t.set(r.id,r);let n=new Map;for(let r of t.values()){let o=Ls(r);if(!o)continue;let i=n.get(o);i||(i=[],n.set(o,i)),i.push({id:r.id,title:r.title,status:r.status,metadata:r.metadata,workflow:r.workflow,created_at:r.created_at,updated_at:r.updated_at})}return n}function Ds(e,t){let n=e.get(t)||[],r=0;for(let i of n)(i.status==="resolved"||i.status==="closed")&&(r+=1);let o=Wc(n);return{total:n.length,count:r,current:o,children:n}}function zc(e){let t=e.transport,n=e.uiOrderStore;function r(s,l){return"renormalize"in s?s.renormalize:[{bead_id:l,rank:s.rank}]}function o(s,l){let a={...s.order};for(let u of l)a[u.bead_id]=u.rank;n&&n.set({revision:s.revision,order:a})}async function i(s,l,a){if(!t||!n)return;let u=n.get()||{revision:0,order:{}},d=r(ya(l,a,u.order),s);o(u,d);let p=await t("ui-order-set",{expected_revision:u.revision,entries:d});if(p&&p.conflict){let m={revision:typeof p.revision=="number"?p.revision:0,order:p.order||{}};n.set(m);let _=r(ya(l,a,m.order),s);o(m,_);let w=await t("ui-order-set",{expected_revision:m.revision,entries:_});w&&w.applied&&n.set({revision:typeof w.revision=="number"?w.revision:0,order:w.order||{}})}else p&&p.applied&&n.set({revision:typeof p.revision=="number"?p.revision:0,order:p.order||{}})}return{applyReorder:i}}function Hc(e){if(typeof e!="string")return"";let t=e.indexOf("-");return t>0?e.slice(0,t):""}function Zn(e,t){let n=Hc(e),r=Hc(t);return n.length===0||r.length===0?!1:n!==r}function Ms(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function wa(e,t){return!t||typeof e!="string"||e.length===0||Ms(t.visible_labels).includes(e)?!0:Ms(t.hidden_labels).includes(e)?!1:!Ms(t.hidden_prefixes).some(n=>n.length>0&&e.startsWith(n))}function Kc(e,t){return Ms(e).filter(n=>wa(n,t))}function dr(e,t){let n=e&&e.chips?e.chips[t]:void 0;return typeof n=="boolean"?n:!0}function dm(e){switch(e){case"in_progress":return"board-card__dot board-card__dot--progress";case"resolved":return"board-card__dot board-card__dot--resolved";case"closed":return"board-card__dot board-card__dot--closed";case"blocked":return"board-card__dot board-card__dot--blocked";default:return"board-card__dot"}}function pm(e,t,n,r,o){return c`<button
    type="button"
    class="board-card__roll-toggle"
    data-roll-parent=${e}
    aria-expanded=${r?"true":"false"}
    @click=${o}
  >
    children ${t}/${n} ${r?"\u25B4":"\u25BE"}
  </button>`}function fm(e,t,n,r){return c`<button
    type="button"
    class="board-card__roll-child"
    data-child-id=${e.id}
    @click=${r?o=>r(o,e.id):void 0}
  >
    <span class=${dm(e.status)}>●</span>
    <span class="board-card__roll-child-ord">${t}</span>
    <span class="board-card__roll-child-title">${e.title||e.id}</span>
    ${n}
  </button>`}function qs(e,t){let n=e.total||0,r=!!t.expanded,o=t.trailing??"",i=typeof t.empty_label=="string"&&t.empty_label.length>0?t.empty_label:null;if(n===0&&i===null)return"";let s=Array.isArray(e.children)?e.children:[],l=n>0?s.slice().sort(Lc):s;return c`
    <div class="board-card__roll">
      <div class="board-card__roll-meta">
        ${n>0?pm(t.parent_id,e.count,n,r,t.onToggle):c`<span class="board-card__roll-none">${i}</span>`}
        ${o}
      </div>
      ${n>0&&e.current?c`<div class="board-card__roll-current">
            └
            <span class="board-card__cur-child"
              >● ${e.current.title||e.current.id}</span
            >
          </div>`:""}
      ${r&&n>0?c`<div class="board-card__roll-list">
            ${l.map((a,u)=>fm(a,u+1,t.childChips?t.childChips(a):null,t.onChildClick))}
          </div>`:""}
    </div>
  `}var _m={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"mrg",close:"mrg"},Yc={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"merge",close:"close"},Gc={quick_fix:["impl","close"],spec_backed:["spec","impl","pr","merge"],full_plan:["spec","plan","impl","pr","merge"]},mm={review:"\u2713",skip:"\u2298"},pr={none:"\uBBF8\uB3C4\uB2EC",dim:"\uC9C4\uD589 \uC911",stale:"\uC7AC\uAC80\uD1A0 \uD544\uC694",review:"\uAC80\uD1A0 \uC644\uB8CC",skip:"\uAC80\uD1A0 \uC0DD\uB7B5",done:"\uC644\uB8CC"};function gm(e,t,n){if(!(n==="in_progress"||n==="resolved"))return null;for(let o of e){let i=t[o];if(i&&i.fill==="dim"&&i.stale!==!0)return o}return null}function Vc(e){let t=e&&e.fill||"none";return t==="none"?pr.none:e&&e.stale===!0?pr.stale:t==="dim"?pr.dim:e&&e.glyph==="review"?pr.review:e&&e.glyph==="skip"?pr.skip:pr.done}function hm(e){if(!e||e.fill==="none"||!e.approval_state)return Vc(e);let t=[];return e.glyph==="review"?t.push(pr.review):e.glyph==="skip"&&t.push(pr.skip),e.approval_state==="missing"?t.push("\uC2B9\uC778 \uD544\uC694"):e.approval_state==="stale"?t.push("\uC7AC\uC2B9\uC778 \uD544\uC694"):e.approval_state==="unknown"?t.push("\uC2B9\uC778 \uD655\uC778 \uBD88\uAC00"):t.push("\uC2B9\uC778 \uC644\uB8CC"),t.join(" \xB7 ")}function bm(e,t,n,r){let o=_m[e]||e,i=t&&t.fill||"none",s=!!t&&t.stale===!0,l=mm[t&&t.glyph||""]||"",a="bar";i==="dim"?a+=` b-${o} dim`:i==="full"&&(a+=` b-${o} full`),s&&(a+=" stale"),n&&(a+=" cur");let u=i==="none"?"lbl":`lbl l-${o} on`,d=n?`color: var(--stage-${o}-on)`:"",p=Yc[e]||e,m=r?Qc(t):null;if(!m)return c`
      <div class="seg">
        <div class=${a} style=${d}>${l}</div>
        <div class=${u}>${p}</div>
      </div>
    `;let _=`${p} \uBB38\uC11C \uC5F4\uAE30 \xB7 ${m.path}`;return c`
    <button
      type="button"
      class="seg seg--doc"
      aria-label=${_}
      title=${_}
      @click=${w=>{w.preventDefault(),w.stopPropagation(),r(w,m,e)}}
    >
      <div class=${a} style=${d}>${l}</div>
      <div class=${u}>${p}</div>
    </button>
  `}function Qc(e){let t=e?e.doc:null;return!t||typeof t.path!="string"||t.path.length===0?null:t}function Ns(e,t,n={}){if(!e||!e.stages)return"";let r=n.onOpenDoc,o=Gc[e.route]||Gc.spec_backed,i=e.stages,s=gm(o,i,String(t||"open")),l=`\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uC9C4\uD589: ${o.map(u=>`${Yc[u]||u} ${u==="plan"?hm(i[u]||{}):Vc(i[u]||{})}`).join(" \xB7 ")}`,a=!!r&&o.some(u=>Qc(i[u]||{})!==null);return c`
    <div
      class="stp"
      role=${a?"group":"img"}
      aria-label=${l}
    >
      ${o.map(u=>bm(u,i[u]||{},u===s,r))}
    </div>
  `}function ym(e){return typeof e!="number"||!Number.isFinite(e)?"":`P${Math.max(0,Math.min(4,e))}`}var Xc=2;function Zc(e){let t=e.slice(0,Xc).join(", "),n=e.length-Xc;return`\u26D3 blocked: ${t}${n>0?` +${n}`:""}`}function vm(e,t){if(!t)return[];let n=[],r=Array.isArray(t.blockers)?t.blockers:[],o=[],i=[];for(let s of r)(Zn(e,s)?i:o).push(s);return o.length>0&&n.push(c`<span class="ctl-chip ctl-chip--blocked-dep"
        >${Zc(o)}</span
      >`),i.length>0&&n.push(c`<span class="ctl-chip ctl-chip--blocked-foreign"
        >${Zc(i)}</span
      >`),n}function km(e){if(!e||typeof e!="object")return null;let t=e.awaiting_user;if(typeof t!="string")return null;let n=t.trim();return n.length===0?null:c`<span class="ctl-chip ctl-chip--blocked"
    >${`\u23F8 \uC0AC\uC6A9\uC790 \uB9AC\uBDF0 \uD544\uC694: ${n}`}</span
  >`}function $a(e){return e==="delegated"?"\uC704\uC784":e==="main"?"\uBA54\uC778":null}function js(e){return e.effort?`${e.actor}:${e.effort}`:e.actor}function Jn(e){return`${e.kind}:${js(e)}@${e.sha}`}function Fs(e,t){if(!e)return null;let n=$a(e.kind),r=e.reason,o=e.kind==="delegated"?r===null:typeof r=="string"&&r.trim().length>0&&!/[\r\n]/.test(r);if(!n||!o)return null;let i=$a(t?.kind),s=i!==null&&t?.kind!==e.kind,l=`\uACC4\uD68D \xB7 ${n}${s?` \u2192 ${i}`:""}`,a=`planned_execution ${e.kind}${typeof r=="string"?`:${r}`:""}`,u=t?` \xB7 exec_receipt ${Jn(t)}`:"";return{kind:e.kind,label:l,title:`${a}${u}`}}function Jc(e,t){let n=Fs(e,t);return n?c`<span
        class="ctl-chip ctl-chip--planned"
        data-kind=${n.kind}
        title=${n.title}
        >${n.label}</span
      >`:null}function wm(e){if(!e)return null;let t=$a(e.kind);return t?c`<span
    class="ctl-chip ctl-chip--exec-receipt"
    title=${`exec_receipt ${Jn(e)}`}
    >${`\uC2E4\uD589 \xB7 ${t}`}</span
  >`:null}function $m(e,t){let n=t.policy||null,r=e.workflow&&e.workflow.chips||{},o=[];if(r.route&&dr(n,"route")){let l=r.route_source==="derived";o.push(c`<span
        class="ctl-chip ctl-chip--route${l?" is-derived":""}"
        title=${l?"route \uBBF8\uD540 (metadata unset)":"route"}
        >${l?"unset":r.route}</span
      >`)}if(r.fast_track&&dr(n,"fast_track")&&o.push(c`<span class="ctl-chip ctl-chip--ft">⚡ fast_track</span>`),r.pr&&dr(n,"pr")){let l=r.pr.number;o.push(c`<span class="ctl-chip ctl-chip--pr"
        >${`PR${l!=null?` #${l}`:""}`}</span
      >`)}let i=Jc(r.planned_execution,r.exec_receipt);if(i&&o.push(i),r.exec_receipt){let l=r.exec_receipt;o.push(c`<span
        class="ctl-chip ctl-chip--exec-receipt"
        title=${`exec_receipt ${Jn(l)}`}
        >${`exec ${l.kind==="delegated"?js(l):`main:${l.actor}`} \xB7 ${l.sha.slice(0,7)}`}</span
      >`)}if(r.impl_entry){let l=r.impl_entry;o.push(c`<span
        class="ctl-chip ctl-chip--impl-entry"
        title=${`impl_entry ${l.actor}@${l.sha}`}
        >${`impl ${l.actor} \xB7 ${l.sha.slice(0,7)}`}</span
      >`)}for(let l of Kc(e.labels,n))o.push(c`<span class="ctl-chip ctl-chip--label">${l}</span>`);if(e.from_id&&dr(n,"from")&&o.push(c`<button
        type="button"
        class="ctl-chip ctl-chip--from"
        title=${`\uCD9C\uCC98 ${e.from_id} \uC5F4\uAE30`}
        @click=${l=>{l.stopPropagation(),t.onFromChipClick&&t.onFromChipClick(l,String(e.from_id))}}
      >
        ↩ from ${e.from_id}
      </button>`),dr(n,"blocked")){let l=km(e.metadata);l&&o.push(l),o.push(...vm(e.id,e.blocked_info))}return t.cleanupFailureFor&&t.cleanupFailureFor(e.id)&&dr(n,"blocked")&&o.push(c`<span class="ctl-chip ctl-chip--cleanup">⚠ 정리 멈춤</span>`),o.length===0?"":c`<div class="board-card__chips">${o}</div>`}function xm(e){let t=fn(e.created_at),n=fn(e.updated_at);return!t&&!n?"":c`<span class="board-card__times">
    ${t?c`<span
          class="board-card__time"
          title=${`\uC0DD\uC131 ${tn(e.created_at)}`}
          >생성 ${t}</span
        >`:""}
    ${t&&n?c`<span class="board-card__time-sep">·</span>`:""}
    ${n?c`<span
          class="board-card__time"
          title=${`\uC218\uC815 ${tn(e.updated_at)}`}
          >수정 ${n}</span
        >`:""}
  </span>`}function Am(e,t){let n=t.rollupFor?t.rollupFor(e.id):{total:0,count:0,current:null,children:[]};return qs(n,{parent_id:e.id,expanded:t.isExpanded?t.isExpanded(e.id):!0,trailing:xm(e),empty_label:"children \uC5C6\uC74C",childChips:xa,onToggle:r=>t.onRollupToggle&&t.onRollupToggle(r,e.id),onChildClick:(r,o)=>t.onChildClick&&t.onChildClick(r,o)})}function xa(e){let t=e?.workflow?.chips?.planned_execution,n=e?.workflow?.chips?.exec_receipt;return Fs(t,n)?c`<span class="board-card__roll-child-chips">
    ${Jc(t,n)}
    ${wm(n)}
  </span>`:null}function Bs(e,t){let n=ym(e.priority);return c`
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
      ${$m(e,t)}
      ${e.workflow&&dr(t.policy||null,"stepper")?Ns(e.workflow,e.status,{onOpenDoc:t.onOpenDoc}):""}
      ${Am(e,t)}
    </article>
  `}function to(e,t){let n=Array.isArray(e.items)?e.items.length:0,r=e.is_closed===!0;return c`
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
              ${dc.map(i=>c`<option
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
        ${e.items.map(i=>Bs(i,t))}
      </div>
    </section>
  `}function eu(e,t,n){return c`
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
          ${e.items.length===0?c`<div class="deferred-popup__empty">Deferred 이슈 없음</div>`:e.items.map(r=>Bs(r,t))}
        </div>
      </div>
    </dialog>
  `}var Sm=[{value:"",label:"\uC6B0\uC120\uC21C\uC704"},{value:"0",label:"P0"},{value:"1",label:"P1"},{value:"2",label:"P2"},{value:"3",label:"P3"},{value:"4",label:"P4"}],Em=[{value:"",label:"\uD0C0\uC785"},{value:"bug",label:"bug"},{value:"feature",label:"feature"},{value:"task",label:"task"},{value:"epic",label:"epic"},{value:"chore",label:"chore"}],Tm=[{value:"created_desc",label:"\uC0DD\uC131 \uCD5C\uC2E0\uC21C"},{value:"created_asc",label:"\uC0DD\uC131 \uC624\uB798\uB41C\uC21C"},{value:"updated_desc",label:"\uC218\uC815 \uCD5C\uC2E0\uC21C"},{value:"priority",label:"\uC6B0\uC120\uC21C\uC704\uC21C"},{value:"manual",label:"\uC218\uB3D9(\uB4DC\uB798\uADF8)"}];function Cm(e,t,n){let r=e.labels.length,o=r>0?`\uB77C\uBCA8 ${r}`:"\uB77C\uBCA8";return c`
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
  `}function tu(e,t,n){return c`
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
        ${Sm.map(r=>c`<option
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
        ${Em.map(r=>c`<option
              value=${r.value}
              ?selected=${e.type===r.value}
            >
              ${r.label}
            </option>`)}
      </select>
      ${Cm(e,t,n)}
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
        ${Tm.map(r=>c`<option
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
  `}var Rm=200,Om={"ready-col":"open","in-progress-col":"in_progress","resolved-col":"resolved","closed-col":"closed"},Im=new Set(["blocked-col","ready-col","in-progress-col","resolved-col"]),nu="beads-ui.board.sort",ru=new Set(["created_desc","created_asc","updated_desc","priority","manual"]);function Lm(){try{let e=window.localStorage.getItem(nu);if(e&&ru.has(e))return e}catch{}return"created_desc"}function ou(e,t){let n=Ft("views:board"),r=t.gotoIssue,o=t.issueStores,i=t.transport,s=t.uiOrderStore,l=t.displayPolicyStore,a=t.workerQueueStore,u=t.onClosedRangeChange,d=t.onNewIssue,p=t.openDoc,m=t.closedRange||Ts,_=o?eo(o,s):null,w=zc({transport:i,uiOrderStore:s}),R=[],I=[],U=[],se=[],W=[],j=[],O=!1,q=0,z=Lm(),Y=new Map,N=new Map,F=new Map,H=new Set,G={search:"",priority:"",type:"",labels:[]},ee=!1,ye=null;function qe(ae){return String(ae.status||"open")==="open"}function B(ae){return String(ae.status||"open")==="open"}function X(ae){let me=G.search.trim().toLowerCase(),Ge=G.priority,lt=G.type,Oe=G.labels;return ae.filter(E=>{if(me){let L=String(E.id||"").toLowerCase(),Z=String(E.title||"").toLowerCase();if(!L.includes(me)&&!Z.includes(me))return!1}if(Ge!==""&&String(E.priority)!==Ge||lt!==""&&String(E.issue_type||"")!==lt)return!1;if(Oe.length>0){let L=Array.isArray(E.labels)?E.labels:[];if(!Oe.some(Z=>L.includes(Z)))return!1}return!0})}function Se(){let ae=new Set;for(let me of[R,I,U,se,W,j])for(let Ge of me){let lt=Array.isArray(Ge.labels)?Ge.labels:[];for(let Oe of lt)typeof Oe=="string"&&Oe.length>0&&ae.add(Oe)}return Array.from(ae).sort()}function Ee(){return G.search.trim()!==""||G.priority!==""||G.type!==""||G.labels.length>0}function C(){try{if(_){let ae=_.selectBoardColumn("tab:board:in-progress","in_progress",z),me=_.selectBoardColumn("tab:board:blocked","blocked",z).filter(B),Ge=new Set(ae.map(Pe=>Pe.id)),lt=_.selectBoardColumn("tab:board:ready","ready",z).filter(Pe=>qe(Pe)&&!Ge.has(Pe.id)),Oe=_.selectBoardColumn("tab:board:resolved","resolved",z),E=_.selectBoardColumn("tab:board:deferred","deferred",z),L=_.selectBoardColumn("tab:board:closed","closed").slice(0,Rm),Z=[...me,...lt,...ae,...Oe,...L];re(Z);let pe=new Set;for(let Pe of Z)Pe&&Pe.id&&!Ls(Pe)&&pe.add(Pe.id);let fe=!Ee();R=fe?Oo(me,pe):me,I=fe?Oo(lt,pe):lt,U=fe?Oo(ae,pe):ae,se=fe?Oo(Oe,pe):Oe,W=E,q=E.length,j=fe?Oo(L,pe):L,Y=new Map;for(let Pe of R)Y.set(Pe.id,"open");for(let Pe of I)Y.set(Pe.id,"open");for(let Pe of U)Y.set(Pe.id,"in_progress");for(let Pe of se)Y.set(Pe.id,"resolved");for(let Pe of W)Y.set(Pe.id,"deferred");for(let Pe of j)Y.set(Pe.id,"closed");N=new Map;for(let Pe of R)N.set(Pe.id,"blocked-col");for(let Pe of I)N.set(Pe.id,"ready-col");for(let Pe of U)N.set(Pe.id,"in-progress-col");for(let Pe of se)N.set(Pe.id,"resolved-col");for(let Pe of j)N.set(Pe.id,"closed-col")}je()}catch{R=[],I=[],U=[],se=[],W=[],j=[],F=new Map,je()}}function re(ae){F=Ps(ae)}function ke(ae){return Ds(F,ae)}function ve(ae){return!H.has(ae)}function Me(ae,me){ae.preventDefault(),ae.stopPropagation(),H.has(me)?H.delete(me):H.add(me),je()}function he(ae,me){ae.preventDefault(),ae.stopPropagation(),r(me)}function Le(ae,me){ae.preventDefault(),ae.stopPropagation(),r(me)}function Xe(ae,me){ye||r(me)}function it(ae,me){ae.preventDefault(),ae.stopPropagation(),Pm(me).then(Ge=>{Ge&&be("\uBCF5\uC0AC\uB428","success",1200)})}function P(ae,me){ye=me,ae.dataTransfer&&(ae.dataTransfer.setData("text/plain",me),ae.dataTransfer.effectAllowed="move"),ae.target.classList.add("board-card--dragging")}function ce(ae){ae.target.classList.remove("board-card--dragging"),Gt(),setTimeout(()=>{ye=null},0)}function ie(ae){let me=String(ae.target.value||"");!me||me===m||(m=me,u&&u(me),je())}function de(){return l?l.get():null}function Te(ae){let me=a?a.get():null,Ge=me?me.cleanup_failed:null;if(!Ge||typeof Ge!="object"||Array.isArray(Ge))return null;let lt=Ge[ae];return!lt||typeof lt!="object"||Array.isArray(lt)?null:lt}let _e={onCardClick:Xe,onCopyId:it,onDragStart:P,onDragEnd:ce,onClosedRangeChange:ie,rollupFor:ke,isExpanded:ve,onRollupToggle:Me,onChildClick:he,onFromChipClick:Le,onOpenDoc:p?(ae,me)=>p(me):void 0,cleanupFailureFor:Te,get policy(){return de()}};function De(ae,me){ye||(Ke(),r(me))}function Be(ae,me){ae.preventDefault(),ae.stopPropagation(),Ke(),r(me)}let Qe={..._e,onCardClick:De,onChildClick:Be,onFromChipClick:Be,onOpenDoc:p?(ae,me)=>{Ke(),p(me)}:void 0,get policy(){return de()}};function Fe(ae){let me=ae.target,Ge=e.querySelector(".board-filter__labels");me&&Ge&&Ge.contains(me)||$e()}function te(ae){ae.key==="Escape"&&$e()}function V(){ee||(ee=!0,document.addEventListener("mousedown",Fe),document.addEventListener("keydown",te),je())}function $e(){ee&&(ee=!1,document.removeEventListener("mousedown",Fe),document.removeEventListener("keydown",te),je())}function _t(ae){ae.key==="Escape"&&Ke()}function at(){O||(O=!0,document.addEventListener("keydown",_t),je())}function Ke(){O&&(O=!1,document.removeEventListener("keydown",_t),je())}let $={onClose:Ke,onOverlayClick(ae){ae.target===ae.currentTarget&&Ke()}},J={onSearchInput(ae){G.search=String(ae.target.value||""),C()},onPriorityChange(ae){G.priority=String(ae.target.value||""),C()},onTypeChange(ae){G.type=String(ae.target.value||""),C()},onSortChange(ae){let me=String(ae.target.value||"");if(!(!ru.has(me)||me===z)){z=me;try{window.localStorage.setItem(nu,me)}catch{}C()}},onDeferredToggle(){O?Ke():at()},onLabelMenuToggle(){ee?$e():V()},onLabelToggle(ae){let me=G.labels.indexOf(ae);me===-1?G.labels.push(ae):G.labels.splice(me,1),C()},onLabelClear(){G.labels.length!==0&&(G.labels=[],C())},onNewIssue(){d&&d()}};function Re(){return c`
      <div class="board-view">
        ${tu(G,J,{sort_mode:z,deferred_popup_open:O,deferred_count:q,label_options:Se(),label_menu_open:ee})}
        <div class="board-root">
          ${to({title:"Blocked",id:"blocked-col",items:X(R)},_e)}
          ${to({title:"Ready",id:"ready-col",items:X(I)},_e)}
          ${to({title:"In progress",id:"in-progress-col",items:X(U)},_e)}
          ${to({title:"Resolved",id:"resolved-col",items:X(se)},_e)}
          ${to({title:"Closed",id:"closed-col",items:X(j),is_closed:!0,closed_range:m},_e)}
        </div>
        ${O?eu({items:X(W),count:q},Qe,$):""}
      </div>
    `}function je(){dt(Re(),e),Je()}function Je(){try{let ae=e.querySelector("#deferred-popup");ae&&!ae.open&&(typeof ae.showModal=="function"?ae.showModal():ae.setAttribute("open",""));let me=Array.from(e.querySelectorAll(".board-column, .deferred-popup__body"));for(let Ge of me)Array.from(Ge.querySelectorAll(".board-card")).forEach((Oe,E)=>{Oe.tabIndex=E===0?0:-1})}catch{}}async function et(ae,me){if(!i){be("\uC5F0\uACB0\uB418\uC9C0 \uC54A\uC544 \uC0C1\uD0DC\uB97C \uBCC0\uACBD\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error");return}try{await i("update-status",{id:ae,status:me}),be("\uC0C1\uD0DC \uBCC0\uACBD\uB428","success",1500)}catch(Ge){n("update-status failed: %o",Ge),be("\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328","error")}}function Ue(ae){switch(ae){case"blocked-col":return R;case"ready-col":return I;case"in-progress-col":return U;case"resolved-col":return se;default:return[]}}function ct(ae,me,Ge){if(!i||!s)return;let lt=Ue(ae),Oe=lt.find(fe=>fe.id===me);if(!Oe)return;let E=lt.filter(fe=>fe.id!==me),L=Ge.closest?Ge.closest(".board-card"):null,Z=E.length;if(L){let fe=L.getAttribute("data-issue-id");if(fe===me)return;let Pe=E.findIndex(ht=>ht.id===fe);Pe>=0&&(Z=Pe)}let pe=E.slice();pe.splice(Z,0,Oe),w.applyReorder(me,pe,Z)}function Gt(){for(let ae of Array.from(e.querySelectorAll(".board-column--drag-over")))ae.classList.remove("board-column--drag-over")}let At=null;e.addEventListener("dragover",ae=>{ae.preventDefault(),ae.dataTransfer&&(ae.dataTransfer.dropEffect="move");let Ge=ae.target.closest(".board-column");Ge&&Ge!==At&&(At&&At.classList.remove("board-column--drag-over"),Ge.classList.add("board-column--drag-over"),At=Ge)}),e.addEventListener("dragleave",ae=>{let me=ae.relatedTarget;(!me||!e.contains(me))&&At&&(At.classList.remove("board-column--drag-over"),At=null)}),e.addEventListener("drop",ae=>{ae.preventDefault(),At&&(At.classList.remove("board-column--drag-over"),At=null);let me=ae.target,Ge=me.closest(".board-column");if(!Ge)return;let lt=ae.dataTransfer?.getData("text/plain")||"";if(!lt)return;let Oe=Ge.id,E=N.get(lt);if(E&&E===Oe){if(Im.has(Oe)){if(z!=="manual"){be("\uC218\uB3D9(\uB4DC\uB798\uADF8) \uC815\uB82C \uBAA8\uB4DC\uC5D0\uC11C\uB9CC \uC21C\uC11C\uB97C \uBC14\uAFC0 \uC218 \uC788\uC2B5\uB2C8\uB2E4","warning",2e3);return}ct(Oe,lt,me)}return}let L=Om[Oe];if(!L){be("\uC5EC\uAE30\uB85C\uB294 \uC62E\uAE38 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","warning",1500);return}Y.get(lt)!==L&&et(lt,L)}),e.addEventListener("keydown",ae=>{let me=ae.target;if(!(me instanceof HTMLElement))return;let Ge=String(me.tagName||"").toLowerCase();if(Ge==="input"||Ge==="textarea"||Ge==="select"||Ge==="button"||Ge==="a"||me.isContentEditable===!0)return;let lt=me.closest(".board-card");if(!lt)return;let Oe=String(ae.key||"");if(Oe==="Enter"||Oe===" "){ae.preventDefault();let pe=lt.getAttribute("data-issue-id");pe&&r(pe);return}if(Oe!=="ArrowUp"&&Oe!=="ArrowDown"&&Oe!=="ArrowLeft"&&Oe!=="ArrowRight")return;ae.preventDefault();let E=lt.closest(".board-column");if(!E)return;let L=Array.from(E.querySelectorAll(".board-card")),Z=L.indexOf(lt);if(Oe==="ArrowDown"&&Z<L.length-1){kt(lt,L[Z+1]);return}if(Oe==="ArrowUp"&&Z>0){kt(lt,L[Z-1]);return}if(Oe==="ArrowLeft"||Oe==="ArrowRight"){let pe=Array.from(e.querySelectorAll(".board-column")),fe=pe.indexOf(E),Pe=Oe==="ArrowRight"?1:-1,ht=fe+Pe;for(;ht>=0&&ht<pe.length;){let $t=pe[ht].querySelector(".board-card");if($t){kt(lt,$t);return}ht+=Pe}}});function kt(ae,me){try{ae.tabIndex=-1,me.tabIndex=0,me.focus()}catch{}}let wt=null;_&&_.subscribe&&(wt=_.subscribe(()=>{try{C()}catch{}}));let jt=null;l&&l.subscribe&&(jt=l.subscribe(()=>{try{C()}catch{}}));let Lt=null;return a&&a.subscribe&&(Lt=a.subscribe(()=>{je()})),{async load(){n("load"),C()},clear(){$e(),Ke(),wt&&(wt(),wt=null),jt&&(jt(),jt=null),Lt&&(Lt(),Lt=null),e.replaceChildren(),R=[],I=[],U=[],se=[],W=[],j=[],Y=new Map,N=new Map}}}function Oo(e,t){return e.filter(n=>{let r=Ls(n);return!(r&&t.has(r))})}async function Pm(e){try{if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")return await navigator.clipboard.writeText(String(e)),!0;let t=document.createElement("textarea");t.value=String(e),t.style.position="fixed",t.style.left="-9999px",document.body.appendChild(t),t.select();let n=!1;try{n=document.execCommand("copy")}finally{t.remove()}return n}catch{return!1}}var dn=e=>e??zt;function Sn(e){return[typeof e.runner=="string"?e.runner:null,typeof e.model=="string"?e.model:null,typeof e.effort=="string"?e.effort:null,e.speed==="fast"?"Fast":null].filter(Boolean).join(" \xB7 ")}function Io(e){return typeof e.resumed_from!="string"||e.resumed_from.length===0?null:`${e.continuation_mode==="session"?"session \uC774\uC5B4\uBC1B\uC74C":e.continuation_mode==="fresh"?"\uC0C8 session\uC73C\uB85C \uC774\uC5B4\uBC1B\uC74C":"\uC774\uC804 attempt\uC5D0\uC11C \uC774\uC5B4\uBC1B\uC74C"} (from ${e.resumed_from})`}async function _n(e){let t=String(e);if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")try{return await navigator.clipboard.writeText(t),!0}catch{}try{let n=document.createElement("textarea");n.value=t,n.style.position="fixed",n.style.left="-9999px",document.body.appendChild(n),n.select();let r=!1;try{r=document.execCommand("copy")}finally{n.remove()}return r}catch{return!1}}var Dm=["workflow_mode","spec_review_model","spec_review_effort","spec_review_speed","plan_review_model","plan_review_effort","plan_review_speed","impl_review_model","impl_review_effort","impl_review_speed","impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed","quick_fix_impl_dispatch","quick_fix_impl_runtime","quick_fix_impl_model","quick_fix_impl_effort","quick_fix_impl_speed","orchestration_model","orchestration_effort","orchestration_speed","quick_fix_orchestration_model","quick_fix_orchestration_effort","quick_fix_orchestration_speed"],lu=["orchestration_model","orchestration_effort","orchestration_speed"],cu=["quick_fix_orchestration_model","quick_fix_orchestration_effort","quick_fix_orchestration_speed"],Mm=[...lu,...cu],su={quick_fix_impl_dispatch:"impl_dispatch",quick_fix_impl_runtime:"impl_runtime",quick_fix_impl_model:"impl_model",quick_fix_impl_effort:"impl_effort",quick_fix_impl_speed:"impl_speed",quick_fix_orchestration_model:"orchestration_model",quick_fix_orchestration_effort:"orchestration_effort",quick_fix_orchestration_speed:"orchestration_speed"},iu={spec_review_effort:"spec_review_model",plan_review_effort:"plan_review_model",impl_review_effort:"impl_review_model"},au={spec_review_speed:"spec_review_model",plan_review_speed:"plan_review_model",impl_review_speed:"impl_review_model"},qm=new Set(["native-fixed-posture","unsupported","claude-runner-model-default","catalog-validated","provider-tier-or-runtime-model-default","actual-effort"]);function Jt(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function Tt(e){return typeof e=="string"&&e.length>0?e:null}function no(e){return e.startsWith("gpt-")?e.slice(4):e}function ft(e,t,n,r,o){return{value:e,source:t,display:n,full_value:r,resolution:o}}function uu(e,t,n){let r=Tt(t[e]);if(r!==null)return{value:r,source:"pin"};let o=Tt(n[e]);return o===null?null:{value:o,source:"global"}}function fr(e,t,n,r){return uu(e,t,n)||{value:r,source:"base"}}function Aa(e,t,n,r){let o=n?.implementation?.model_catalog;if(t&&Jt(o?.[t])){let s=Tt(o[t][e]);if(s!==null)return s}if(t&&Array.isArray(o?.[t])&&o[t].includes(e))return e;if(!t&&Jt(o)){for(let s of Object.values(o))if(Jt(s)){let l=Tt(s[e]);if(l!==null)return l}else if(Array.isArray(s)&&s.includes(e))return e}let i=r?.model_index?.[e];return Tt(r?.runners?.[i]?.models?.[e]?.id)||e}function Nm(e,t){return Tt(t?.review?.reviewers?.[e]?.model)||e}function Ln(e,t,n=!1){if(e==="default")return ft(e,t,`default (\uC77C\uBC18 \xB7 ${t==="pin"?"\uD540":"\uC804\uC5ED \uACE0\uC815"})`,e,"explicit");let r=n?no(e):e;return ft(e,t,r,e,"explicit")}function du(e,t,n){let r=t?.implementation?.model_catalog?.[e],o=[];Jt(r)?o.push(...Object.keys(r)):Array.isArray(r)&&o.push(...r.filter(s=>typeof s=="string"));let i=n?.runners?.[e]?.models;if(Jt(i))for(let s of Object.keys(i))o.includes(s)||o.push(s);return o}function jm(e,t){let n=[],r=e?.implementation?.model_catalog;Jt(r)&&n.push(...Object.keys(r));let o=t?.runners;if(Jt(o))for(let i of Object.keys(o))n.includes(i)||n.push(i);return n}function Fm(e,t,n){if(e===null)return{runtime:null,offered:!1};let r=!1;for(let o of jm(t,n)){let i=du(o,t,n);if(i.length>0&&(r=!0),i.includes(e))return{runtime:o,offered:!0}}return{runtime:null,offered:r}}function Us(e){return ft(e.value,e.source,`${e.value} (\uBE44\uD638\uD658)`,e.value,"incompatible")}function Sa(e,t,n){let r=uu(e,t,n);return r?Ln(r.value,r.source):ft(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable")}function En(e){let t=Jt(e.pin)?e.pin:{},n=Jt(e.global)?e.global:{},r=Jt(e.execution_defaults)?e.execution_defaults:null,o=r?.supported===!0&&Jt(r.session)?r.session:null,i=r?.supported===!0&&Jt(r.orchestration)?r.orchestration:null,s=Jt(e.runner_catalog)?e.runner_catalog:null,l=Tt(n.quick_fix_impl_model),a=Fm(l,o,s),u={};if(o){let d=fr("workflow_mode",t,n,Tt(o.workflow_mode_default));u.workflow_mode=d.source==="base"?ft(d.value,"base",d.value||"\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",d.value,"default"):Ln(d.value,d.source);for(let W of["spec_review","plan_review","impl_review"]){let j=`${W}_model`,O=Tt(W==="plan_review"?d.value==="fast_track"?o.plan_review?.fast_track_default:o.plan_review?.standard_recommended:o.review?.default),q=fr(j,t,n,O);if(q.value===null)u[j]=ft(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable");else if(q.value!=="self"&&q.value!=="skip"&&!Jt(o.review?.reviewers?.[q.value]))u[j]=Us(ft(q.value,q.source,"",null,"explicit"));else{let z=Nm(q.value,o);u[j]=ft(q.value,q.source,no(z),z,q.source==="base"?"default":"explicit")}}for(let[W,j]of Object.entries(iu)){let O=u[j].value;if(O==="self"||O==="skip"){u[W]=ft(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable");continue}let q=Tt(o.review?.reviewers?.[O||""]?.effort),z=fr(W,t,n,q);u[W]=z.value===null?ft(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"):ft(z.value,z.source,z.value,z.value,z.source==="base"?"default":"explicit")}for(let[W,j]of Object.entries(au)){let O=u[j];if(O.resolution==="incompatible"||O.value==="self"||O.value==="skip"){u[W]=ft(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable");continue}if(O.resolution==="unavailable"){u[W]=ft(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable");continue}let q=fr(W,t,n,"default");u[W]=q.source==="base"?ft("default","base","default (\uC77C\uBC18)","default","default"):Ln(q.value,q.source)}let p=Jt(o.implementation?.default)?o.implementation.default:{},m=Tt(e.route),_=m!==null&&["quick_fix","spec_backed","full_plan"].includes(m),w=Jt(o.implementation?.route_defaults)?o.implementation.route_defaults:{},R=_&&Jt(w[m])?w[m]:{},I={},U=!1;if(m==="quick_fix"){let W=Tt(t.impl_runtime),j=Tt(n.quick_fix_impl_runtime),O=W||j,q=O==="inherit"?Tt(e.controller_runtime):O;U=l!==null&&a.runtime!==null&&(O===null||q===a.runtime);let z=Tt(t.impl_dispatch),Y=Tt(n.quick_fix_impl_dispatch);if(z!==null)u.impl_dispatch=Ln(z,"pin"),I.impl_dispatch="pin";else if(Y!==null)u.impl_dispatch=Ln(Y,"global"),I.impl_dispatch="quick_fix";else if(U)u.impl_dispatch=ft("delegated","global","\uC704\uC784 (\uBAA8\uB378 \uD568\uC758)","delegated","explicit"),I.impl_dispatch="implied";else{let N=Tt(R.dispatch)||Tt(p.dispatch);u.impl_dispatch=N?ft(N,"base",N,N,"default"):ft(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"),I.impl_dispatch="base"}if(W!==null)u.impl_runtime=Ln(W,"pin"),I.impl_runtime="pin";else if(j!==null)u.impl_runtime=Ln(j,"global"),I.impl_runtime="quick_fix";else if(U){let N=a.runtime;u.impl_runtime=ft(N,"global",`${N} (\uC720\uB3C4)`,N,"explicit"),I.impl_runtime="derived"}else{let N=fr("impl_runtime",{},n,Tt(p.runtime));u.impl_runtime=N.value===null?ft(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"):ft(N.value,N.source,N.value,N.value,N.source==="base"?"default":"explicit"),I.impl_runtime=N.source}for(let N of["impl_model","impl_effort","impl_speed"]){let F=Tt(t[N]),H=Tt(n[`quick_fix_${N}`]),G;F!==null?(G={value:F,source:"pin"},I[N]="pin"):N==="impl_model"&&U&&l!==null?(G={value:l,source:"global"},I[N]="quick_fix"):N!=="impl_model"&&H!==null?(G={value:H,source:"global"},I[N]="quick_fix"):(G=fr(N,{},n,Tt(p[N.replace("impl_","")])),I[N]=G.source),u[N]=G.value===null?ft(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"):ft(G.value,G.source,G.value,G.value,G.source==="base"?"default":"explicit")}}else for(let W of["impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"]){let j=fr(W,t,n,W==="impl_dispatch"?Tt(R.dispatch)||Tt(p.dispatch):Tt(p[W.replace("impl_","")]));u[W]=j.value===null?ft(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"):ft(j.value,j.source,j.value,j.value,j.source==="base"?"default":"explicit")}let se=u.impl_dispatch.value==="main";if(se?u.impl_dispatch.display=I.impl_dispatch==="quick_fix"?"\uBA54\uC778 (quick_fix)":"\uBA54\uC778":u.impl_dispatch.value==="delegated"&&(I.impl_dispatch==="quick_fix"?u.impl_dispatch.display="\uC704\uC784 (quick_fix)":I.impl_dispatch!=="implied"&&(u.impl_dispatch.display="\uC704\uC784")),u.impl_runtime.value==="inherit"&&(u.impl_runtime.display=e.controller_runtime?`inherit (${e.controller_runtime})`:"inherit (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_runtime.resolution="dynamic"),u.impl_model.value!==null){let W=u.impl_runtime.value==="inherit"?Tt(e.controller_runtime):u.impl_runtime.value,j=W?du(W,o,s):[];m==="quick_fix"&&I.impl_model==="base"&&I.impl_runtime!=="base"&&j.length>0&&!j.includes(u.impl_model.value)&&(u.impl_model=ft("auto","base","auto","auto","default"));let O=u.impl_model.value;if(O!=="auto"&&j.length>0&&!j.includes(O))u.impl_model=Us(u.impl_model);else{let q=Aa(O,W,o,s);u.impl_model.display=no(q),u.impl_model.full_value=q,I.impl_model==="quick_fix"&&(u.impl_model.display=`${u.impl_model.display} (quick_fix)`)}}if(u.impl_effort.value==="auto"){let W=Tt(e.transport)||(u.impl_runtime.value==="codex"?"codex-native-spawn":u.impl_runtime.value==="claude"?"implement-claude":null),j=W?Tt(o.implementation?.effort_by_transport?.[W]?.auto):null;j&&!qm.has(j)?(u.impl_effort.display=`${j} (\uBE44\uD638\uD658)`,u.impl_effort.full_value=j,u.impl_effort.resolution="incompatible"):(u.impl_effort.display="auto (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_effort.resolution="dynamic")}I.impl_effort==="quick_fix"&&u.impl_effort.value!==null&&(u.impl_effort=ft(u.impl_effort.value,"global",`${u.impl_effort.value} (quick_fix)`,u.impl_effort.value,"explicit")),u.impl_speed.value==="default"&&(u.impl_speed=I.impl_speed==="quick_fix"?ft("default","global","default (quick_fix)","default","explicit"):u.impl_speed.source==="base"?ft("default","base","default (\uC77C\uBC18)","default","default"):Ln("default",u.impl_speed.source));for(let W of["impl_runtime","impl_effort","impl_speed"])I[W]==="quick_fix"&&u[W].value!==null&&!u[W].display.endsWith("(quick_fix)")&&(u[W].display=`${u[W].display} (quick_fix)`);if(m==="quick_fix"){l!==null&&!U&&a.offered&&(u.quick_fix_impl_model=Us(ft(l,"global","",l,"explicit")));for(let[W,j]of Object.entries(su))!W.startsWith("quick_fix_orchestration_")&&!Object.hasOwn(u,W)&&(u[W]={...u[j]});u.impl_dispatch.source==="base"&&u.impl_dispatch.value==="main"&&(u.quick_fix_impl_dispatch=ft("main","base","\uBA54\uC778 (\uD558\uB124\uC2A4)","main","default"))}if(se)for(let W of["impl_runtime","impl_model","impl_effort","impl_speed"])u[W]=ft(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable")}else for(let d of Dm.filter(p=>!Mm.includes(p)))u[d]=Sa(d,t,n);if(!o){for(let[d,p]of Object.entries(iu))(u[p].value==="self"||u[p].value==="skip")&&(u[d]=ft(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable"));for(let[d,p]of Object.entries(au))(u[p].value==="self"||u[p].value==="skip")&&(u[d]=ft(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable"));if(u.impl_dispatch.value==="main"){u.impl_dispatch.display="\uBA54\uC778";for(let d of["impl_runtime","impl_model","impl_effort","impl_speed"])u[d]=ft(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable")}else u.impl_dispatch.value==="delegated"&&(u.impl_dispatch.display="\uC704\uC784"),u.impl_runtime.value==="inherit"&&(u.impl_runtime.display=e.controller_runtime?`inherit (${e.controller_runtime})`:"inherit (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_runtime.resolution="dynamic"),u.impl_effort.value==="auto"&&(u.impl_effort.display="auto (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_effort.resolution="dynamic")}for(let d of lu){if(!i){u[d]=Sa(d,t,n);continue}let p=d.replace("orchestration_",""),m=Tt(i[p]),_=`quick_fix_${d}`,w=e.route==="quick_fix"?Tt(n[_]):null,R=Tt(t[d]),I=R!==null?{value:R,source:"pin"}:w!==null?{value:w,source:"global"}:fr(d,{},n,m),U=R===null&&w!==null;if(d==="orchestration_effort"&&I.source==="base"){u[d]=ft(null,"base","CLI \uAE30\uBCF8 (\uBBF8\uC9C0\uC815)",null,"default");continue}if(I.value===null){u[d]=ft(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable");continue}if(d==="orchestration_model"){let se=I.source==="base"?Tt(i.model_id)||I.value:Aa(I.value,null,o,s);u[d]=ft(I.value,I.source,`${no(se)}${U?" (quick_fix)":""}`,se,I.source==="base"?"default":"explicit");continue}if(I.value==="default"){u[d]=U?ft("default","global","default (quick_fix)","default","explicit"):I.source==="base"?ft("default","base","default (\uC77C\uBC18)","default","default"):Ln("default",I.source);continue}u[d]=U?ft(I.value,"global",`${I.value} (quick_fix)`,I.value,"explicit"):Ln(I.value,I.source)}for(let d of cu){let p=su[d];u[d]=u[p]?{...u[p]}:Sa(d,t,n)}if(o&&e.route!=="quick_fix")if(l===null){let d=u.orchestration_model.full_value;u.quick_fix_impl_model=ft(null,"base",d===null?"\uBA54\uC778":`\uBA54\uC778 (orchestration ${no(d)})`,null,"default")}else if(a.runtime!==null){let d=Aa(l,a.runtime,o,s);u.quick_fix_impl_model=ft(l,"global",no(d),d,"explicit")}else a.offered?u.quick_fix_impl_model=Us(ft(l,"global","",null,"explicit")):u.quick_fix_impl_model=Ln(l,"global");return u}function Bm(e,t){let n=t&&e.value==="default"?"default (\uC77C\uBC18)":e.display;if(!t||e.source==="pin")return`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 ${e.display}`;let r=e.source==="global"?"\uC804\uC5ED":"harness";return`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 ${n} (${r})`}function Ws(e){let t=Jt(e.pin)?e.pin:{},n=Jt(e.global)?e.global:{},r=Jt(e.resolution_global)?{...e.resolution_global}:{};delete r[e.key];let o=p=>{let m={...r,...p};return En({pin:e.layer==="pin"?m:t,global:e.layer==="pin"?n:m,execution_defaults:e.execution_defaults,runner_catalog:e.runner_catalog,route:e.route,controller_runtime:e.controller_runtime})},i=e.layer==="pin"?t:n,s={...i};delete s[e.key];let l=o(s)[e.key],a=o(i)[e.key],u=Tt(i[e.key]),d=[...e.choices];return u!==null&&!d.includes(u)&&d.unshift(u),{unset_label:Bm(l,e.layer==="pin"),full_value:l.full_value,unavailable:l.resolution==="unavailable",disabled:a?.resolution==="not_applicable",options:d.map(p=>{let m=o({...i,[e.key]:p})[e.key];return{value:p,label:m.display,full_value:m.full_value}})}}function Um(e,t=document){let n=t.createElement("dialog");n.className="op-dialog continuation-dialog";let r=t.createElement("button"),o=t.createElement("button"),i=t.createElement("button"),s=t.createElement("h2"),l=t.createElement("p"),a=t.createElement("div");return a.className="op-dialog__actions",s.textContent="\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4",l.textContent=`${Sn(e.prior||{})||"\uC774\uC804 \uC124\uC815"} \u2192 ${Sn(e.current||{})||"\uD604\uC7AC \uC124\uC815"}`,r.type="button",r.className="op-btn",r.textContent="\uAE30\uC874 session \uC774\uC5B4\uD558\uAE30",r.disabled=e.prior_available===!1,o.type="button",o.className="op-btn",o.textContent="\uD604\uC7AC preset\uC73C\uB85C \uC0C8 session",i.type="button",i.className="op-btn",i.textContent="\uCDE8\uC18C",a.append(r,o,i),n.append(s,l,a),t.body.append(n),new Promise(u=>{let d=p=>{typeof n.close=="function"&&n.close(),n.remove(),u(p)};r.addEventListener("click",()=>d("prior_session")),o.addEventListener("click",()=>d("fresh_current")),i.addEventListener("click",()=>d(null)),n.addEventListener("cancel",p=>{p.preventDefault(),d(null)}),typeof n.showModal=="function"?n.showModal():n.setAttribute("open","")})}async function _r(e,t,n={}){let r=e;for(n.onResult?.(r);r?.continuation_mismatch;){let o=r.continuation_mismatch,i=await Um(o);if(i===null)return r;r=await t(i,o.decision_token),n.onResult?.(r),r?.conflict&&n.refresh&&(r=await n.refresh(r),n.onResult?.(r))}return r}function pu(e,t=document){let n=e?.kind==="settlement",r=t.createElement("dialog");r.className="op-dialog resume-instructions-dialog";let o=t.createElement("h2"),i=t.createElement("textarea"),s=t.createElement("div"),l=t.createElement("button"),a=t.createElement("button"),u=[e?.bead_id,e?.tuple].filter(d=>typeof d=="string"&&d!=="").join(" \xB7 ");if(o.textContent=n?"\uCC29\uC9C0 \uC815\uC0B0 \uC7AC\uAC1C":"\uC138\uC158 \uC774\uC5B4\uD558\uAE30",i.placeholder="\uCD94\uAC00 \uC9C0\uCE68 (\uC120\uD0DD) \u2014 \uBE44\uC6CC\uB450\uBA74 \uAE30\uBCF8 \uC808\uCC28\uB85C \uC7AC\uAC1C",i.maxLength=4e3,s.className="op-dialog__actions resume-instructions-dialog__actions",l.type="button",l.className="op-btn op-btn--primary",l.textContent=n?"\uC815\uC0B0 \uC7AC\uAC1C":"\uC774\uC5B4\uD558\uAE30",a.type="button",a.className="op-btn",a.textContent="\uCDE8\uC18C",s.append(l,a),r.append(o),u!==""){let d=t.createElement("p");d.className="resume-instructions-dialog__target",d.textContent=u,r.append(d)}return r.append(i,s),t.body.append(r),new Promise(d=>{let p=!1,m=w=>{p||(p=!0,typeof r.close=="function"&&r.close(),r.remove(),d(w))},_=()=>m(i.value.trim());l.addEventListener("click",_),a.addEventListener("click",()=>m(null)),i.addEventListener("keydown",w=>{w.key==="Enter"&&(w.ctrlKey||w.metaKey)&&(w.preventDefault(),_())}),r.addEventListener("cancel",w=>{w.preventDefault(),m(null)}),typeof r.showModal=="function"?r.showModal():r.setAttribute("open",""),i.focus()})}async function ro(e){let{context:t,transport:n,adopt:r}=e,o=await pu(t);if(o===null)return null;let i=o===""?{}:{instructions:o},s=await n({...i});if(r?.(s),s&&s.conflict&&(s=await n({...i}),r?.(s)),s=await _r(s,(l,a)=>n({...i,continuation:l,decision_token:a}),{onResult:r,refresh:()=>n({...i})}),s&&s.resumed===!1&&!s.conflict&&s.reason){let l=t?.kind==="settlement"?"\uC815\uC0B0 \uC7AC\uAC1C":"\uC774\uC5B4\uD558\uAE30";be(`${l} \uAC70\uBD80: ${s.reason}`,"error",2400)}return s}function Ea(e){return`session:${e.provider}:${e.session_id}`}function Lo(e){return`${e.provider} \xB7 ${e.session_id.slice(0,8)}`}function Wm(e,t){return e.current&&t==="in_progress"&&e.locality==="local"?"running":"done"}function oo(e,t,n,r){return{attempt_id:Ea(e),session_ref:{bead_id:t,provider:e.provider,session_id:e.session_id},...typeof r=="string"&&r.length>0?{root_dir:r}:{},hide_prompt:!0,meta:{runner:e.provider,label:Lo(e),session_id:e.session_id,...typeof e.resume_command=="string"&&e.resume_command.length>0?{resume_command:e.resume_command}:{},status:Wm(e,n)}}}var Ta="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4",zm="\uBD84\uD574 \uC5C6\uC74C \u2014 \uCD1D\uB7C9\uB9CC \uBCF4\uACE0\uB428",fu="\uBD84\uD574 \uC5C6\uB294 leg";function Xt(e){return typeof e=="number"&&Number.isFinite(e)?e:0}var Kn=["input_tokens","output_tokens","cache_read_input_tokens","cache_creation_input_tokens"],so=[...Kn,"reasoning_output_tokens"],Hm={codex:["implementation","review-consult"],claude:["subagent"]};function Ca(e){return!e||typeof e!="object"?!1:Number.isFinite(e.total_tokens)&&!Kn.some(t=>Number.isFinite(e[t]))}function Km(e){return!e||typeof e!="object"?!1:so.some(t=>Number.isFinite(e[t]))}function Ra(e){let t=0;for(let n of Kn)t+=Xt(e?.[n]);return t}function Gm(e){return!e||typeof e!="object"?!1:Kn.some(t=>Number.isFinite(e[t]))}function _u(e){return!e||typeof e!="object"?!1:so.some(t=>Number.isFinite(e[t]))||Number.isFinite(e.total_tokens)}function Ym(e){let t={};for(let n of so)e&&Number.isFinite(e[n])&&(t[n]=e[n]);return t}function mu(e){let t={};for(let n of so)Number.isFinite(e[n])&&(t[n]=e[n]);return Number.isFinite(e.total_tokens)&&(t.total_tokens=e.total_tokens),e.replayed===!0&&(t.replayed=!0),typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&(t.total_cost_usd=e.total_cost_usd),t}function gu(e,t){return Ca(t)?Xt(t.total_tokens):e==="codex"?Xt(t.input_tokens)+Xt(t.output_tokens):Ra(t)}function Vm(e){return e==="claude"?"Claude":"Codex"}function Qm(e){return`\u03C4 ${bu(e)}`}function Xm(e,t){let n=t.breakdown||{},r=Xt(t.total_only_subtotal);if(Ca(n)||r>0&&!Km(n)){let u=[`\uCD1D ${t.subtotal.toLocaleString("en-US")}`,zm];return t.replayed&&u.push(Ta),u.join(`
`)}let o=[`\uC785\uB825 ${Xt(n.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${Xt(n.output_tokens).toLocaleString("en-US")}`];e==="claude"?o.push(`\uCE90\uC2DC\uC77D\uAE30 ${Xt(n.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${Xt(n.cache_creation_input_tokens).toLocaleString("en-US")}`):(o.push(`\uCE90\uC2DC\uC77D\uAE30 ${Xt(n.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC4F0\uAE30 ${Xt(n.cache_creation_input_tokens).toLocaleString("en-US")}`),Number.isFinite(n.reasoning_output_tokens)&&o.push(`\uCD94\uB860\uCD9C\uB825 ${Xt(n.reasoning_output_tokens).toLocaleString("en-US")}`)),r>0&&o.push(`${fu} ${r.toLocaleString("en-US")}`);let i=e==="claude"?"\uC785\uB825 + \uCD9C\uB825 + \uCE90\uC2DC\uC77D\uAE30 + \uCE90\uC2DC\uC0DD\uC131":"\uC785\uB825 + \uCD9C\uB825",s=r>0?`${i} + ${fu}`:i,a=[e==="claude"?`Claude subtotal = ${s}`:`Codex subtotal = ${s}; \uCE90\uC2DC\uC77D\uAE30\xB7\uCE90\uC2DC\uC4F0\uAE30\xB7\uCD94\uB860\uCD9C\uB825\uC740 subtotal\uC5D0 \uD3EC\uD568\uB418\uC9C0 \uC54A\uB294 subset`,`\uCD1D ${t.subtotal.toLocaleString("en-US")}`,o.join(" \xB7 ")];return typeof t.total_cost_usd=="number"&&Number.isFinite(t.total_cost_usd)&&a.push(`$${t.total_cost_usd.toFixed(2)}`),t.replayed&&a.push(Ta),a.join(`
`)}function cn(e){let t=[];if(!e||typeof e!="object"||!("providers"in e)||!e.providers)return t;for(let n of["claude","codex"]){let r=e.providers[n];r&&t.push({provider:n,label:`${Vm(n)} ${Qm(r.subtotal)}${typeof r.total_cost_usd=="number"&&Number.isFinite(r.total_cost_usd)?` \xB7 $${r.total_cost_usd.toFixed(2)}`:""}`,tooltip:Xm(n,r)})}return t}function Hs(e){let t={},n={claude:!0,codex:!1},r={claude:0,codex:0};for(let o of e)if(!(!o||!o.providers))for(let i of["claude","codex"]){let s=o.providers[i];if(!s)continue;let l=t[i];l||(l={subtotal:0,breakdown:{}},t[i]=l),l.subtotal+=s.subtotal,Number.isFinite(s.total_only_subtotal)&&(l.total_only_subtotal=Xt(l.total_only_subtotal)+Xt(s.total_only_subtotal));for(let a of so)Number.isFinite(s.breakdown[a])&&(l.breakdown[a]=Xt(l.breakdown[a])+Xt(s.breakdown[a]));s.replayed&&(l.replayed=!0),i==="claude"&&(typeof s.total_cost_usd=="number"&&Number.isFinite(s.total_cost_usd)?r.claude+=s.total_cost_usd:n.claude=!1)}return t.claude&&n.claude&&(t.claude.total_cost_usd=r.claude),Object.keys(t).length===0?null:{providers:t,roles:{}}}function Oa(e){return!e||typeof e!="object"?null:tr({attempt:{...e,bead_id:"__attempt__"}},"__attempt__")}function Zm(e){return e==="codex"?"codex":"claude"}function Hn(){return{subtotal:0,breakdown:Ym(null),total_only:0,legs:[],replayed:!1,outer_count:0,outer_cost:0,outer_cost_count:0}}function zs(e,t,n){e.subtotal+=t.subtotal,Ca(t.usage)&&(e.total_only+=t.subtotal);for(let r of so)Number.isFinite(t.usage[r])&&(e.breakdown[r]=Xt(e.breakdown[r])+Xt(t.usage[r]));e.legs.push(t),t.replayed===!0&&(e.replayed=!0),n&&(e.outer_count+=1,typeof t.usage.total_cost_usd=="number"&&Number.isFinite(t.usage.total_cost_usd)&&(e.outer_cost+=t.usage.total_cost_usd,e.outer_cost_count+=1))}function hu(e,t){let n={subtotal:e.subtotal,breakdown:e.breakdown};return e.total_only>0&&(n.total_only_subtotal=e.total_only),t&&(n.legs=e.legs),e.replayed&&(n.replayed=!0),n}function bu(e){return e>=1e6?`${(e/1e6).toFixed(1)}M`:e>=1e3?`${(e/1e3).toFixed(1)}k`:String(e)}function io(e){return Gm(e)?`\u03C4 ${bu(Ra(e))}`:null}function er(e){let t=io(e);if(!t)return null;let n=e?.total_cost_usd;return typeof n=="number"&&Number.isFinite(n)?`${t} \xB7 $${n.toFixed(2)}`:t}function Po(e){if(!e||typeof e!="object")return"";let t=[`\uC785\uB825 ${Xt(e.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${Xt(e.output_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC77D\uAE30 ${Xt(e.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${Xt(e.cache_creation_input_tokens).toLocaleString("en-US")}`];typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&t.push(`$${e.total_cost_usd.toFixed(2)}`);let n=[`\uCD1D ${Ra(e).toLocaleString("en-US")}`,t.join(" \xB7 ")];return e.replayed&&n.push(Ta),n.join(`
`)}function tr(e,t){let n={claude:Hn(),codex:Hn()},r={orchestrator:{claude:Hn(),codex:Hn()},implementation:{claude:Hn(),codex:Hn()},"review-consult":{claude:Hn(),codex:Hn()},subagent:{claude:Hn(),codex:Hn()}},o=new Set;for(let l of Object.values(e||{})){if(!l||l.bead_id!==t)continue;let a=l.usage;if(_u(a)){let d=Zm(l.runner),p=mu(a),m={provider:d,role:"orchestrator",attempt_id:String(l.attempt_id||""),usage:p,subtotal:gu(d,p)};p.replayed===!0&&(m.replayed=!0),typeof l.model=="string"&&(m.model=l.model),typeof l.session_id=="string"&&(m.session_id=l.session_id),zs(n[d],m,!0),zs(r.orchestrator[d],m,!0)}let u=Array.isArray(l.usage_legs)?l.usage_legs:[];for(let d of u){let p=d&&d.provider==="claude"?"claude":"codex";if(!d||d.provider!=="codex"&&d.provider!=="claude"||!Hm[p].includes(d.role)||!_u(d.usage))continue;let m=typeof d.receipt_id=="string"&&d.receipt_id.length>0?d.receipt_id:null;if(!m||o.has(m))continue;o.add(m);let _=mu(d.usage),w={provider:p,role:d.role,attempt_id:String(l.attempt_id||""),usage:_,subtotal:gu(p,_)};w.receipt_id=m,typeof d.agent_type=="string"&&(w.agent_type=d.agent_type),typeof d.agent_id=="string"&&(w.agent_id=d.agent_id),typeof d.model=="string"&&(w.model=d.model),typeof d.effort=="string"&&d.effort.trim().length>0&&(w.effort=d.effort),typeof d.session_id=="string"?w.session_id=d.session_id:typeof d.thread_id=="string"&&(w.session_id=d.thread_id),typeof d.turn_id=="string"&&(w.turn_id=d.turn_id),(typeof d.completed_at=="string"||typeof d.completed_at=="number"&&Number.isFinite(d.completed_at))&&(w.completed_at=d.completed_at),_.replayed===!0&&(w.replayed=!0),zs(n[p],w,!1),zs(r[w.role][p],w,!1)}}let i={};for(let l of["claude","codex"]){let a=n[l];if(a.legs.length===0)continue;let u=hu(a,!1);l==="claude"&&a.outer_count>0&&a.outer_cost_count===a.outer_count&&(u.total_cost_usd=a.outer_cost),i[l]=u}if(Object.keys(i).length===0)return null;let s={};for(let l of["orchestrator","implementation","review-consult","subagent"]){let a={};for(let u of["claude","codex"]){let d=r[l][u];d.legs.length>0&&(a[u]={...hu(d,!0),legs:d.legs})}Object.keys(a).length>0&&(s[l]=a)}return{providers:i,roles:s}}var Jm=".chip-popover, .judgement-chip";function ao(e){let t=null,n=!1;function r(d){return t!==null&&t.bead_id===d.bead_id&&t.chip_key===d.chip_key}function o(d){t=r(d)?null:{...d},e()}function i(){t!==null&&(t=null,e())}function s(d){let p=d.target;t!==null&&(p&&typeof p.closest=="function"&&p.closest(Jm)||i())}function l(d){d.key==="Escape"&&i()}function a(){n||(n=!0,document.addEventListener("click",s),document.addEventListener("keydown",l))}function u(){n&&(n=!1,document.removeEventListener("click",s),document.removeEventListener("keydown",l))}return{toggle:o,close:i,isOpen:r,attach:a,detach:u}}function lo(e){return c`<div
    class="chip-popover"
    role="dialog"
    aria-label=${e.title}
  >
    <div class="chip-popover__title">${e.title}</div>
    <ul class="chip-popover__lines">
      ${e.lines.map(t=>c`<li>${t}</li>`)}
    </ul>
  </div>`}var yu={running:3,paused:2,failed:1};function nr(e){if(!e||typeof e!="object")return!1;let t=e.kind;return t==null||t==="implementation"}function vu(e){let t=Object.values(e||{}),n=new Map;for(let r of t){if(!r||typeof r.bead_id!="string"||r.bead_id.length===0||r.kind!=="review_session"||r.status!=="running")continue;let o=typeof r.started_at=="number"?r.started_at:null,i=n.get(r.bead_id);i&&(i.started_at??0)>(o??0)||n.set(r.bead_id,{attempt:r,origin:r.origin==="click"||r.origin==="auto"?r.origin:null,started_at:o})}return n}function ku(e,t){let n=Object.values(e||{}),r=new Set,o=new Map;for(let s of n)!s||typeof s.bead_id!="string"||(typeof s.resumed_from=="string"&&s.resumed_from.length>0&&r.add(s.resumed_from),nr(s)&&o.set(s.bead_id,s.attempt_id));let i=new Map;for(let s of n){if(!s||typeof s.bead_id!="string"||s.bead_id.length===0||!nr(s))continue;let l=null;if(s.status==="running")l="running";else if(s.status==="paused"&&!r.has(s.attempt_id))l="paused";else if(s.status==="failed"||s.status==="orphaned"){let d=t.get(s.bead_id),p=typeof d=="number"&&d>0&&typeof s.finished_at=="number"&&d>=s.finished_at;o.get(s.bead_id)===s.attempt_id&&!p&&typeof s.dismissed_at!="number"&&(l="failed")}if(!l)continue;let a=typeof s.started_at=="number"?s.started_at:null,u=i.get(s.bead_id);if(u){let d=yu[u.run_state],p=yu[l];if(d>p||d===p&&(u.started_at??0)>(a??0))continue}i.set(s.bead_id,{attempt:s,run_state:l,started_at:a})}return{winners:i,resumed_from_ids:r}}var Ks=["workflow_mode","spec_review_model","spec_review_effort","spec_review_speed","plan_review_model","plan_review_effort","plan_review_speed","impl_review_model","impl_review_effort","impl_review_speed","impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"],eg=["quick_fix_impl_dispatch","quick_fix_impl_runtime","quick_fix_impl_model","quick_fix_impl_effort","quick_fix_impl_speed"],Pa=[...Ks.filter(e=>e!=="impl_dispatch"),...eg,"bdui_url"];function wu(e){let t;try{t=new URL(e)}catch{return!1}return(t.protocol==="http:"||t.protocol==="https:")&&e===t.origin}var Pn=["orchestration_model","orchestration_effort","orchestration_speed"],co=["quick_fix_orchestration_model","quick_fix_orchestration_effort","quick_fix_orchestration_speed"],Ia=Object.freeze({orchestration_model:"quick_fix_orchestration_model",orchestration_effort:"quick_fix_orchestration_effort",orchestration_speed:"quick_fix_orchestration_speed",impl_dispatch:"quick_fix_impl_dispatch",impl_runtime:"quick_fix_impl_runtime",impl_model:"quick_fix_impl_model",impl_effort:"quick_fix_impl_effort",impl_speed:"quick_fix_impl_speed"}),uo=[...Ks,...Pn],tg=Pa.filter(e=>uo.includes(e));function ng(e,t){let n={},r=[];for(let[i,s]of Object.entries(Ia)){let l=e[i];if(!Object.hasOwn(e,i)){n[s]=null;continue}let a=t[s];if(typeof l!="string"||!Array.isArray(a)||!a.includes(l)){n[s]=null,r.push(`lane_incompatible:${s}`);continue}n[s]=l}let o=Object.keys(e).filter(i=>!Object.hasOwn(Ia,i));return{values:n,warnings:r,skipped_keys:o}}var Do=["delegated","main"],Gs=["inherit","claude","codex"],Gn=["default","fast"],Mo=["standard","fast_track"],qo=["codex","opus","fable","self","skip"],Ys=["codex","fable","skip"],Vs=["low","medium","high","xhigh"],$u=["default","fast"],$n="auto";function mn(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function xu(e){if(!mn(e)||!mn(e.runners))return[];let t=[];for(let[n,r]of Object.entries(e.runners))mn(r)&&mn(r.models)&&t.push([n,Object.keys(r.models)]);return t}function po(e,t){let n=xu(e),r=t&&t!=="inherit"?n.filter(([o])=>o===t):n;return[$n,...r.flatMap(([,o])=>o)]}function Au(e,t,n,r){if(!mn(e)||!mn(e.runners))return[$n];let o=[];for(let[i,s]of Object.entries(e.runners))if(!(!mn(s)||!mn(s.models))&&!(t&&t!=="inherit"&&i!==t))for(let[l,a]of Object.entries(s.models)){if(n&&n!==$n&&l!==n)continue;let u=r(s,a);if(Array.isArray(u))for(let d of u)typeof d=="string"&&!o.includes(d)&&o.push(d)}return[$n,...o]}function Lr(e,t,n){return Au(e,t,n,(r,o)=>mn(o)&&Array.isArray(o.efforts)?o.efforts:r.efforts)}function Qs(e,t,n){return Au(e,t,n,(r,o)=>mn(o)&&Array.isArray(o.orchestration_efforts)?o.orchestration_efforts:mn(o)&&Array.isArray(o.efforts)?o.efforts:r.efforts)}function fo(e,t){let n=xu(e);return(t?n.filter(([o])=>o===t):n).flatMap(([,o])=>o)}function Su(e,t,n){let r={impl_runtime:e?.impl_runtime,impl_model:e?.impl_model,impl_effort:e?.impl_effort},o=r.impl_runtime==="claude"||r.impl_runtime==="codex"?r.impl_runtime:r.impl_runtime==="inherit"?n:null;return o&&(r.impl_model&&!po(t,o).includes(r.impl_model)&&(r.impl_model=void 0),r.impl_effort&&!Lr(t,o,r.impl_model||$n).includes(r.impl_effort)&&(r.impl_effort=void 0)),r}var rg={workflow_mode:"\uC6CC\uD06C\uD50C\uB85C \uBAA8\uB4DC",spec_review_model:"\uC2A4\uD399 \uB9AC\uBDF0\uC5B4",spec_review_effort:"\uC2A4\uD399 \uB9AC\uBDF0 effort",spec_review_speed:"\uC2A4\uD399 \uB9AC\uBDF0 \uC18D\uB3C4",plan_review_model:"\uACC4\uD68D \uB9AC\uBDF0\uC5B4",plan_review_effort:"\uACC4\uD68D \uB9AC\uBDF0 effort",plan_review_speed:"\uACC4\uD68D \uB9AC\uBDF0 \uC18D\uB3C4",impl_review_model:"\uAD6C\uD604 \uB9AC\uBDF0\uC5B4",impl_review_effort:"\uAD6C\uD604 \uB9AC\uBDF0 effort",impl_review_speed:"\uAD6C\uD604 \uB9AC\uBDF0 \uC18D\uB3C4",impl_runtime:"\uC704\uC784 \uB300\uC0C1",impl_model:"\uAD6C\uD604 \uBAA8\uB378",impl_effort:"\uAD6C\uD604 effort",impl_speed:"\uAD6C\uD604 \uC18D\uB3C4",orchestration_model:"\uC6CC\uCEE4 \uBAA8\uB378",orchestration_effort:"\uC6CC\uCEE4 effort",orchestration_speed:"\uC6CC\uCEE4 \uC18D\uB3C4"},og={quick_fix_orchestration_model:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uBAA8\uB378",quick_fix_orchestration_effort:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 effort",quick_fix_orchestration_speed:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uC18D\uB3C4",quick_fix_impl_dispatch:"\uC2E4\uD589 \uBC29\uC2DD",quick_fix_impl_runtime:"\uC704\uC784 \uB300\uC0C1",quick_fix_impl_model:"\uBAA8\uB378",quick_fix_impl_effort:"effort",quick_fix_impl_speed:"\uC18D\uB3C4"},La=[...tg,...Pn],sg=[...uo,...Pa].filter((e,t,n)=>n.indexOf(e)===t&&!La.includes(e));function Eu(e,t){let n=mn(e)?e:{},r=mn(t)?t:{},o=[];for(let s of La){let l=n[s]??null,a=r[s]??null;l!==a&&o.push({key:s,label:rg[s]||s,before:l,after:a,kind:l===null?"added":a===null?"removed":"changed"})}let i=[];for(let s of[...sg,...Object.keys(r)])!La.includes(s)&&!i.includes(s)&&Object.hasOwn(r,s)&&i.push(s);return{rows:o,ignored_keys:i}}function Tu(e,t,n){let r=mn(e)?e:{},o=ng(mn(t)?t:{},n),i=[];for(let s of Object.values(Ia)){let l=r[s]??null,a=o.values[s]??null;l!==a&&i.push({key:s,label:og[s]||s,before:l,after:a,kind:l===null?"added":a===null?"removed":"changed"})}return{rows:i,ignored_keys:o.skipped_keys}}function Da(e,t,n,r,o,i,s=null){return Ws({key:e,choices:t,layer:"global",global:n,resolution_global:i,execution_defaults:r,runner_catalog:o,route:s})}function Cu(e,t){let n={};for(let r of Pa){let o=e?.[r],i=t?.[r];o!==i&&(n[r]=typeof i=="string"&&i.length>0?i:null)}return n}function Ru(e,t){let n={};for(let r of[...Pn,...co]){let o=e?.[r]??null,i=t?.[r]??null;o!==i&&(n[r]=typeof i=="string"&&i.length>0?i:null)}return n}var Ma=[{id:"workflow",label:"\uC6CC\uD06C\uD50C\uB85C\uC6B0",keys:["workflow_mode"]},{id:"review",label:"\uB9AC\uBDF0",keys:["spec_review_model","spec_review_effort","spec_review_speed","plan_review_model","plan_review_effort","plan_review_speed","impl_review_model","impl_review_effort","impl_review_speed"]},{id:"implementation",label:"\uAD6C\uD604",keys:["impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"]},{id:"worker",label:"Worker",keys:[...Pn]}],mr={workflow_mode:"\uBAA8\uB4DC",spec_review_model:"\uC0AC\uC591 \uB9AC\uBDF0",spec_review_effort:"\uC0AC\uC591 \uB9AC\uBDF0 effort",spec_review_speed:"\uC0AC\uC591 \uB9AC\uBDF0 \uC18D\uB3C4",plan_review_model:"\uACC4\uD68D \uB9AC\uBDF0",plan_review_effort:"\uACC4\uD68D \uB9AC\uBDF0 effort",plan_review_speed:"\uACC4\uD68D \uB9AC\uBDF0 \uC18D\uB3C4",impl_review_model:"\uAD6C\uD604 \uB9AC\uBDF0",impl_review_effort:"\uAD6C\uD604 \uB9AC\uBDF0 effort",impl_review_speed:"\uAD6C\uD604 \uB9AC\uBDF0 \uC18D\uB3C4",impl_dispatch:"\uC2E4\uD589 \uBC29\uC2DD",impl_runtime:"\uC704\uC784 \uB300\uC0C1",impl_model:"\uBAA8\uB378",impl_effort:"effort",impl_speed:"\uC18D\uB3C4",orchestration_model:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uBAA8\uB378",orchestration_effort:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 effort",orchestration_speed:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uC18D\uB3C4"},Xs={pin:"\uD540",global:"\uC804\uC5ED",base:"\uAE30\uBCF8"};function qa(e,t,n,r,o,i=null){let s=En({pin:t,global:n,execution_defaults:r,runner_catalog:o,route:t&&typeof t.route=="string"?t.route:null,controller_runtime:i});return e.map(l=>({key:l,...s[l]}))}function Ou(e,t,n,r,o,i=null){let s={pin:0,global:0,base:0};for(let l of qa(e,t,n,r,o,i))s[l.source]+=1;return s}function Iu(e,t,n){return{id:e,key:t,value:typeof n=="string"?n:""}}function Lu(e,t,n){return typeof t!="string"||t.length===0?null:{id:e,preset_id:t,expected_revision:n}}var Q$=[...Ks,...Pn];var Pu=["orchestration_model","orchestration_effort","orchestration_speed","spec_review_model","spec_review_effort","spec_review_speed","plan_review_model","plan_review_effort","plan_review_speed","impl_review_model","impl_review_effort","impl_review_speed","impl_runtime","impl_model","impl_effort"];function No(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function Zs(e){if(!No(e)||!No(e.runners))return null;let t=Object.entries(e.runners).filter(([,n])=>No(n)&&No(n.models));return t.length>0?t:null}function Dn(e,t){let n=Zs(e);if(!n||!t)return null;for(let[r,o]of n)if(Object.hasOwn(o.models,t))return r;return null}function Du(e,t){return No(t)&&Array.isArray(t.efforts)?t.efforts.slice():Array.isArray(e.efforts)?e.efforts.slice():[]}function Mu(e,t){let n=Zs(e);if(!n||!t)return[];for(let[,r]of n)if(Object.hasOwn(r.models,t))return Du(r,r.models[t]);return[]}function ig(e){let t=Zs(e);if(!t)return[];let n=[];for(let[,r]of t)for(let o of Object.values(r.models))for(let i of Du(r,o))n.includes(i)||n.push(i);return n}function ag(e,t){if(!t)return ig(e);let r=Zs(e)?.find(([i])=>i===t)?.[1];if(!r)return[];let o=[];for(let i of Object.keys(r.models))for(let s of Mu(e,i))o.includes(s)||o.push(s);return o}function qu(e,t,n){let r={impl_runtime:e.impl_runtime||"",impl_model:e.impl_model||"",impl_effort:e.impl_effort||""},o=r.impl_runtime==="inherit"?n:r.impl_runtime==="claude"||r.impl_runtime==="codex"?r.impl_runtime:null;if(r.impl_runtime==="inherit"&&!o)return r.impl_model="",r.impl_effort="",r;let i=Dn(t,r.impl_model);if(r.impl_model&&(!o||i!==o))return r.impl_model="",r.impl_effort="",r;let s=r.impl_model?Mu(t,r.impl_model):ag(t,o);return r.impl_effort&&s.length>0&&!s.includes(r.impl_effort)&&(r.impl_effort=""),r}var Na=new Set(["unavailable","not_applicable"]);function gr(e,t){if(typeof e!="object"||e===null)return null;let n=e[t];return typeof n=="object"&&n!==null?n:null}function Nu(e){return e.filter(t=>t!==null).join(" \xB7 ")}function hr(e,t){return t===null?null:`${mr[e]}: ${t.display} (${Xs[t.source]})`}function ja(e){return e.filter(t=>t!==null).join(`
`)}function Fa(e){if(typeof e!="object"||e===null)return null;let t=Sn(e);if(t==="")return null;let n=(r,o)=>typeof o=="string"&&o.length>0?`${r}: ${o}`:null;return{text:t,title:ja(["\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \u2014 \uC774 attempt\uC5D0 \uAE30\uB85D\uB41C \uC2E4\uD589\uAC12",n("runner",e.runner),n(mr.orchestration_model,e.model),n(mr.orchestration_effort,e.effort),n(mr.orchestration_speed,e.speed)])}}function _o(e,t){let n=gr(e,"orchestration_model");if(n===null||n.resolution==="unavailable")return null;let r=gr(e,"orchestration_effort"),o=gr(e,"orchestration_speed"),i=Nu([Dn(t,n.value??""),n.display,r!==null&&r.value!==null?r.display:null,o!==null&&o.value==="fast"?"Fast":null]);return i===""?null:{text:i,title:ja(["\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \u2014 \uD604\uC7AC \uD574\uC11D\uAC12 (\uD540 > \uD050 \uAE30\uBCF8\uAC12)",hr("orchestration_model",n),hr("orchestration_effort",r),hr("orchestration_speed",o)])}}function lg(e,t){return e===null||e.value===null||Na.has(e.resolution)?null:e.value!=="inherit"?e.value:t?`inherit\u2192${t}`:"inherit"}function cg(e){return e===null||Na.has(e.resolution)?null:e.value==="auto"?"auto":e.display}function ug(e){return e===null?null:e.value==="auto"?"auto":Na.has(e.resolution)?null:e.display}function Pr(e,t){if(typeof e!="object"||e===null)return null;let n=gr(e,"impl_dispatch"),r=gr(e,"impl_runtime"),o=gr(e,"impl_model"),i=gr(e,"impl_effort"),s=gr(e,"impl_speed"),l=n!==null&&n.value==="main"?"\uBA54\uC778":Nu([lg(r,t??null),cg(o),ug(i),s!==null&&s.value==="fast"?"Fast":null]);return l===""?null:{text:l,title:ja(["\uC6CC\uCEE4(\uAD6C\uD604 \uC704\uC784) \u2014 \uD604\uC7AC \uD574\uC11D\uAC12 (\uD540 > \uC804\uC5ED kv > \uAE30\uBCF8). \uC2E4\uD589 \uC911\uC774\uBA74 \uC138\uC158\uC774 \uC2DC\uC791 \uC2DC \uACE0\uC815\uD55C \uAC12\uACFC \uB2E4\uB97C \uC218 \uC788\uC74C",hr("impl_dispatch",n),hr("impl_runtime",r),hr("impl_model",o),hr("impl_effort",i),hr("impl_speed",s)])}}var dg=Object.freeze(new Set(["push_not_contained","invalid_impl_review","premature_close","head_mismatch","foreign_deploy_unsupported","not_resolved"])),pg=Object.freeze(["delivery_unproven:"]);function Js(e){let t=e&&typeof e.reason=="string"?e.reason:"";if(t.length===0||dg.has(t))return"session";for(let n of pg)if(t.startsWith(n))return"session";return"settlement"}var fg=["hard_diagnosis","invariant_reasoning","verification_by_judgment","claude_bound"];var _g={hard_diagnosis:"\uC6D0\uC778\uC774 \uBD88\uBA85\uD655\uD558\uAC70\uB098 \uC7AC\uD604\uC774 \uBD88\uC548\uC815\uD574 \uAC00\uC124-\uAC80\uC99D \uB8E8\uD504\uAC00 \uD544\uC694\uD558\uB2E4",invariant_reasoning:"\uC815\uD569\uC131\uC774 \uC0C1\uD0DC\uAE30\uACC4\xB7\uB3D9\uC2DC\uC131\xB7\uBD88\uBCC0\uC2DD \uCD94\uB860\uC5D0 \uB2EC\uB824 \uC788\uB2E4",verification_by_judgment:"\uD14C\uC2A4\uD2B8\uAC00 \uBABB \uC7A1\uACE0 \uB9AC\uBDF0\uC5B4\uC758 \uCD94\uB860\uC73C\uB85C\uB9CC \uAC80\uC99D\uD560 \uC218 \uC788\uB2E4",claude_bound:"Claude \uC138\uC158 \uC790\uC0B0\xB7\uC758\uBBF8\uB860\uC5D0 \uAC15\uD558\uAC8C \uBB36\uC5EC \uC788\uB2E4"};function Ba(e){return(e&&Array.isArray(e.reasons)?e.reasons:[]).map(n=>_g[n]||"").filter(n=>n.length>0)}var ju={orchestration_model:["fable"],impl_runtime:["claude"]},Ua={unapplied:"\uBBF8\uC801\uC6A9",applied:"\uC801\uC6A9\uB428",diverged:"\uCD94\uCC9C\uACFC \uB2E4\uB984"};function Fu(e){return typeof e=="object"&&e!==null?e:null}function Bu(e,t){return typeof e=="string"&&t.includes(e)?e:""}function mg(e){return typeof e!="string"?[]:e.split("+").map(t=>t.trim()).filter(t=>fg.includes(t))}function jo(e,t=e){let n=Fu(e);if(!n)return null;let r=Bu(n.rec_orchestration_model,ju.orchestration_model);if(r.length===0)return null;let o=Bu(n.rec_impl_runtime,ju.impl_runtime),i={orchestration_model:r};o.length>0&&(i.impl_runtime=o);let s=Fu(t)||{},l=Object.keys(i),a=0,u=0;for(let p of l){let m=s[p];typeof m=="string"&&m.length>0&&(a+=1,m===i[p]&&(u+=1))}let d=a===0?"unapplied":u===l.length?"applied":"diverged";return{reasons:mg(n.rec_reason),rec:i,state:d}}function ei(e){if(!e||typeof e!="object")return"";let t=Ba(e),n=Ua[e.state]||"",r=["\uBCF5\uC7A1\uD55C \uC791\uC5C5\uC73C\uB85C \uD310\uC815\uB428"];return t.length>0&&r.push(`\uC0AC\uC720: ${t.join(" \xB7 ")}`),n.length>0&&r.push(`\uC0C1\uD0DC: ${n}`),r.join(`
`)}function ti(e){return e.replace(/\/+$/,"")}function gg(e,t){let n=ti(e),r=ti(t);return n===r||r.startsWith(`${n}/`)||n.startsWith(`${r}/`)}function ni(e,t){let n=new Set;for(let r of e)for(let o of t){if(!gg(r,o))continue;let i=ti(r),s=ti(o);n.add(i.length>=s.length?i:s)}return[...n].sort()}function Wa(e,t){return`${e}\0${t}`}function Uu(e){let t=new Map;for(let n of Array.isArray(e?.running)?e.running:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"running",state:"running"});for(let n of Array.isArray(e?.pr_wait)?e.pr_wait:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"pr_wait",state:"pr_wait"});for(let n of Array.isArray(e?.queue_groups)?e.queue_groups:[]){let r=Array.isArray(n.sublanes?.parallel)?n.sublanes.parallel:Array.isArray(n.items)?n.items:[];for(let o of r)t.set(o.id,{root_dir:o.root_dir,workspace_name:o.workspace_name,lane:"parallel",position:o.queue_position});for(let o of Array.isArray(n.sublanes?.serial)?n.sublanes.serial:[])for(let i of o.items)t.set(i.id,{root_dir:i.root_dir,workspace_name:i.workspace_name,lane:o.id,position:i.queue_position})}for(let n of Array.isArray(e?.runnable)?e.runnable:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"runnable",state:"runnable"});for(let n of Array.isArray(e?.done)?e.done:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"done",state:"done"});return t}function za(e,t){let n=Array.isArray(t)?t:[],r=e.indexOf("-"),o=r>0?e.slice(0,r):e;return n.some(i=>typeof i?.issue_prefix=="string"&&i.issue_prefix===o)?"internal":n.length>0&&n.every(i=>typeof i?.issue_prefix=="string")?"external":"unknown"}function Fo(e){if(e.state==="running")return"\uC2E4\uD589\uC911";if(e.state==="pr_wait")return"PR \uB300\uAE30";if(e.state==="runnable")return"\uC2E4\uD589\uAC00\uB2A5";if(e.state==="done")return"\uC644\uB8CC";let t=e.lane==="parallel"?"\uBCD1\uB82C":e.lane;return`${e.workspace_name} \xB7 ${t} #${e.position}`}function Wu(e,t,n,r){let o=n.get(e);if(!!(o&&t&&o.root_dir===t.root_dir&&o.lane===t.lane&&typeof o.position=="number"&&typeof t.position=="number"&&o.position<t.position))return{id:e,label:`\u{1F512} ${e} (\uAC19\uC740 \uB808\uC778 \uC55E)`,location_label:"\uAC19\uC740 \uB808\uC778 \uC55E",scope:null,same_lane_ahead:!0};if(o)return{id:e,label:`\u{1F512} ${e} (${Fo(o)})`,location_label:Fo(o),scope:null,same_lane_ahead:!1};let s=za(e,r),l=s==="internal"?"\uBBF8\uC801\uC7AC":s==="external"?"\uC678\uBD80":"\uC704\uCE58 \uBBF8\uD655\uC778";return{id:e,label:`\u{1F512} ${e} (${l})`,location_label:l,scope:s,same_lane_ahead:!1}}function zu(e){let t=Array.isArray(e)?e:[],n=new Map,r=new Map,o=new Map;for(let l of t)for(let a of Array.isArray(l.sublanes?.serial)?l.sublanes.serial:[]){let u=Wa(l.root_dir,a.id);n.set(u,{root_dir:l.root_dir,workspace_name:l.name,lane:a.id}),o.set(u,[]);for(let d of Array.isArray(a.items)?a.items:[])r.set(d.id,u)}for(let l of t)for(let a of Array.isArray(l.sublanes?.serial)?l.sublanes.serial:[]){let u=Wa(l.root_dir,a.id),d=Array.isArray(a.items)?a.items[0]:null,m=!!d&&d.queue_index===0&&(!Array.isArray(a.occupied_by)||a.occupied_by.length===0)&&Array.isArray(d.blocked_by)?d.blocked_by:[],_=o.get(u);if(_)for(let w of m){let R=r.get(w);R&&R!==u&&!_.includes(R)&&_.push(R)}}let i=(l,a)=>{let u=new Set,d=[l];for(;d.length>0;){let p=d.pop();if(p===a)return!0;!p||u.has(p)||(u.add(p),d.push(...o.get(p)||[]))}return!1},s=new Map;for(let[l,a]of o){let u=[];for(let d of a){let p=n.get(d);i(d,l)&&p&&u.push(p)}u.length>0&&s.set(l,u)}return s}function Hu(e,t){return Wa(e,t)}var hg=Object.freeze(["done","abandoned"]);function Ku(e){return!e||typeof e!="object"||Array.isArray(e)?!1:typeof e.phase=="string"&&!hg.includes(e.phase)}async function bg(e){let t=await _n(e);be(t?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",t?"success":"error",1200)}function Dr(e){return typeof e!="string"||e.length===0?"":c`<span class="worker-ev__copyline"
    ><code class="worker-ev__path">${e}</code
    ><button
      type="button"
      class="worker-ev__copy"
      data-seam="log-path-copy"
      title="로그 경로 복사"
      aria-label=${`\uB85C\uADF8 \uACBD\uB85C \uBCF5\uC0AC: ${e}`}
      @click=${()=>{bg(e)}}
    >
      ⧉
    </button></span
  >`}var yg="worker-ineligible";function Bo(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function Gu(e){return Bo(e).includes(yg)}var Yu=new WeakMap;function mo(e){return e&&typeof e=="object"?e:{}}function vg(e){let t=Yu.get(e);if(t)return t;let n=Qu(e);return Yu.set(e,n),n}function ri(e,t){return(Array.isArray(e)?e:[]).findIndex(r=>r&&r.bead_id===t)}function kg(e,t){if(e.length===0)return null;if(vg(t).has(e))return{lane:"running"};if(ri(t.pr_wait,e)>=0)return{lane:"pr_wait"};let n=ri(t.queue,e);if(n>=0)return{lane:"parallel",index:n};for(let r of Array.isArray(t.serial_lanes)?t.serial_lanes:[]){if(!r||typeof r.id!="string"||!/^s[1-5]$/.test(r.id))continue;let o=ri(r.entries,e);if(o>=0)return{lane:r.id,index:o}}return ri(t.done,e)>=0?{lane:"done"}:null}function Uo(e,t){let n=mo(e),r=mo(t),o=Zr(n),s=(typeof n.workflow?.route=="string"&&n.workflow.route||(typeof mo(n.metadata).route=="string"?mo(n.metadata).route:""))==="quick_fix",l=!Object.hasOwn(n,"description")||typeof n.description=="string"&&n.description.trim().length>0,a=Object.hasOwn(n,"labels")&&Gu(n.labels),u=Object.hasOwn(mo(n.metadata),"awaiting_user"),d=!a&&!u&&(s?l:o.evidence==="published"&&!o.conflict),p=kg(typeof n.id=="string"?n.id:"",r);return{placeable:d&&p===null,worker_ineligible:a,awaiting_user:u,missing_description:s&&!l,spec:s?"n/a":o.conflict?"conflict":o.evidence,location:p}}function oi(e){let t=e.location;if(t)switch(t.lane){case"running":return"\uC2E4\uD589 \uC911\uC774\uB77C \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4";case"pr_wait":return"PR \uB300\uAE30 \uC911\uC774\uB77C \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4";case"done":return"\uC644\uB8CC \uB808\uC778\uC5D0 \uC788\uC5B4 \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4";case"parallel":return`\uC774\uBBF8 \uB300\uAE30 \uC911 \xB7 \uBCD1\uB82C #${t.index+1}`;default:return`\uC774\uBBF8 \uB300\uAE30 \uC911 \xB7 \uC9C1\uB82C ${t.lane.slice(1)} #${t.index+1}`}return e.placeable?"\uB300\uAE30 \uD050 \uB9E8 \uB4A4\uC5D0 \uCD94\uAC00":e.worker_ineligible?"worker-ineligible label\uB85C \uC6CC\uCEE4\uC5D0\uC11C \uC2E4\uD589\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":e.awaiting_user?"\uC0AC\uC6A9\uC790 \uB9AC\uBDF0\uB97C \uAE30\uB2E4\uB9AC\uB294 \uC911\uC774\uB77C \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":e.missing_description?"description\uC774 \uC5C6\uC5B4 \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"spec\uC774 \uC5C6\uC5B4 \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"}function Wo(e){let t=mo(e),n=typeof t.serial_lane_count=="number"&&Number.isInteger(t.serial_lane_count)&&t.serial_lane_count>0?Math.min(t.serial_lane_count,5):0,r=Array.isArray(t.serial_lanes)?t.serial_lanes:[],o=[];for(let s of r){if(o.length>=n)break;!s||typeof s.id!="string"||!/^s[1-5]$/.test(s.id)||!Array.isArray(s.entries)||o.push({id:s.id,label:`\uC9C1\uB82C ${s.id.slice(1)}`,count:s.entries.length})}return o.length===0?null:[{id:"parallel",label:"\uBCD1\uB82C",count:(Array.isArray(t.queue)?t.queue:[]).length},...o]}function Vu(e){return/^s[1-5]$/.test(e)?`\uC9C1\uB82C ${e.slice(1)}`:"\uBCD1\uB82C"}function ii(e){return typeof e=="string"&&e.length>=7?e.slice(0,7):"\u2014"}function Ju(e){return e==="session"?"bead\uAC00 in_progress\uB85C \uC7A1\uD78C \uB4A4 \uB2EB\uD788\uAE30\uAE4C\uC9C0\uC758 \uACBD\uACFC":"attempt \uC2E4\uD589 \uC2DC\uAC04 \uD569\uC0B0 (\uC7AC\uAC1C \uC138\uC158 \uD3EC\uD568)"}function qr(e){if(typeof e!="number"||!Number.isFinite(e)||e<0)return"\u2014";if(e<1e3)return`${Math.round(e)}ms`;let t=e/1e3;if(t<60)return`${t.toFixed(1)}\uCD08`;let n=Math.floor(t/60);if(n<60)return`${n}\uBD84 ${Math.round(t-n*60)}\uCD08`;let r=Math.floor(n/60),o=n%60;return`${r}\uC2DC\uAC04 ${o}\uBD84`}function ed(e,t){if(typeof e!="object"||e===null)return[];let n=!1,r=!1;for(let o of Object.values(e)){if(typeof o!="object"||o===null)continue;let i=o;i.bead_id!==t||i.kind!=="review_session"||(n=!0,r=r||i.origin==="auto")}return n?[r?"\uB9AC\uBDF0 \xB7 \uC790\uB3D9":"\uB9AC\uBDF0"]:[]}function Xu(e){return e==="auto"||e==="click"?e:null}function td(e,t){if(typeof e!="object"||e===null)return{active:!1,failure:null,origin:null};let n=!1,r=null,o=-1,i=null,s=null,l=-1;for(let a of Object.values(e)){if(typeof a!="object"||a===null)continue;let u=a;if(u.bead_id!==t||u.kind!=="review_session")continue;if(u.status==="pending"||u.status==="running"){n=!0;let p=typeof u.started_at=="number"?u.started_at:0;p>=o&&(o=p,r=Xu(u.origin));continue}if(u.status!=="failed")continue;let d=typeof u.finished_at=="number"?u.finished_at:0;d>=l&&(l=d,i=typeof u.cause=="string"&&u.cause.length>0?u.cause:null,s=Xu(u.origin))}return n?{active:!0,failure:null,origin:r}:{active:!1,failure:i,origin:s}}function nd(e,t){if(typeof e!="object"||e===null)return null;let n=0,r=!1;for(let o of Object.values(e)){if(typeof o!="object"||o===null)continue;let i=o;if(i.bead_id!==t)continue;let s=i.started_at,l=i.finished_at;typeof s!="number"||typeof l!="number"||!Number.isFinite(s)||!Number.isFinite(l)||l<s||(n+=l-s,r=!0)}return r?n:null}function ai(e){if(typeof e!="number"||!Number.isFinite(e)||e<=0)return"";let t=new Date(e);return`${String(t.getHours()).padStart(2,"0")}:${String(t.getMinutes()).padStart(2,"0")}`}function wg(e,t){let n=Array.isArray(e)?e:[],r=Array.isArray(t)?t:[];if(n.length===0&&r.length===0)return null;let o=null;for(let s of n)s.kind!=="deploy"||s.state!=="succeeded"||typeof s.target_sha!="string"||(!o||(typeof s.finished_at=="number"?s.finished_at:0)>(typeof o.finished_at=="number"?o.finished_at:0))&&(o=s);let i=n.filter(s=>s.state==="failed"&&!s.dismissed&&!s.superseded_by).length+r.length;return{deploy:o?{sha:ii(o.target_sha),at:typeof o.finished_at=="number"?o.finished_at:null,elapsed_ms:typeof o.elapsed_ms=="number"?o.elapsed_ms:null}:null,unresolved:i,badge:i>0?{tone:"act",label:`\uD574\uACB0 \uD544\uC694 ${i}`}:{tone:"quiet",label:"\uBAA8\uB450 \uC815\uC0C1"}}}function rd(e,t){let n=wg(e,t);return n?c`<button
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
            title=${n.deploy.at?tn(n.deploy.at):""}
            >${ai(n.deploy.at)}${n.deploy.elapsed_ms!==null?` \xB7 ${qr(n.deploy.elapsed_ms)}`:""}</span
          >
        </span>`:""}
    <span class="worker-repo-strip__spacer"></span>
    <span
      class="worker-repo-strip__badge worker-repo-strip__badge--${n.badge.tone}"
      >${n.badge.label}</span
    >
  </button>`:""}function go(e){let t=fn(e.created_at),n=fn(e.updated_at);return!t&&!n?"":c`<div class="worker-mini__meta">
    ${t?c`<span title=${`\uC0DD\uC131 ${tn(e.created_at)}`}
          >생성 ${t}</span
        >`:""}${t&&n?c`<span>·</span>`:""}${n?c`<span title=${`\uC218\uC815 ${tn(e.updated_at)}`}
          >수정 ${n}</span
        >`:""}
  </div>`}function $g(e){return!e||e==="requested"?"\uBC31\uC5C5 \uC911":e==="abandoned"?"\uD3D0\uAE30 \uD3EC\uAE30\uB428":e==="backup_verified"||e==="signaled"?"runner \uC885\uB8CC \uC911":e==="merged_revert"||e.startsWith("revert_")?"revert PR \uB300\uAE30":e.startsWith("rollback_")?"\uC6D0\uBCF5 \uBC30\uD3EC \uC911":e==="runner_terminated"||e.startsWith("pr_")||e.includes("ref_")||e.includes("worktree")||e.startsWith("bead_")?"PR \uC815\uB9AC \uC911":`\uD3D0\uAE30 \uCC98\uB9AC \uC911 (${e})`}function Ho(e,t){return t==="merged"?`${e}: \uC774\uBBF8 merge\uB41C \uAD6C\uD604\uC785\uB2C8\uB2E4. \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 revert PR\uC744 \uC0DD\uC131\uD558\uBA70, \uC2E4\uC81C \uC6D0\uBCF5\uC740 \uC0AC\uB78C\uC774 \uADF8 PR\uC744 merge\uD55C \uB4A4 \uC644\uB8CC\uB429\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`:`${e}: \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 runner/PR/branch/worktree\uB97C \uC815\uB9AC\uD558\uACE0 \uC774\uC288\uB97C \uD6C4\uBCF4\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`}function Ko(e,t){return t.kind==="stale_work_backup_fresh"?`${e}: \uC2E4\uD328\uD55C \uBC31\uC5C5 \uC791\uC5C5\uC744 \uD3EC\uAE30\uD569\uB2C8\uB2E4. \uBC31\uC5C5\uC740 \uB9CC\uB4E4\uC5B4\uC9C0\uC9C0 \uC54A\uC558\uACE0 \uAE30\uC874 \uC791\uC5C5\uC740 \uADF8\uB300\uB85C \uB0A8\uC2B5\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`:`${e}: \uC2E4\uD328\uD55C \uD3D0\uAE30 \uC791\uC5C5\uC744 \uD3EC\uAE30\uD569\uB2C8\uB2E4. \uBC31\uC5C5\uACFC \uD3D0\uAE30\uB294 \uC218\uD589\uB418\uC9C0 \uC54A\uC558\uACE0 bead\uB294 \uD3D0\uAE30 \uC774\uC804 \uC0C1\uD0DC\uB85C \uB3CC\uC544\uAC11\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`}function li(e){return e.kind==="stale_work_backup_fresh"?`\uBC31\uC5C5 \uD3EC\uAE30\uB428 \xB7 \uAE30\uC874 \uC791\uC5C5\uC740 \uADF8\uB300\uB85C \uB0A8\uC2B5\uB2C8\uB2E4 (\uC6D0\uC778: ${e.last_error})`:`\uD3D0\uAE30 \uD3EC\uAE30\uB428 \xB7 \uD3D0\uAE30\uB294 \uC218\uD589\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4 (\uC6D0\uC778: ${e.last_error})`}function ci(e){let t=["\uD3D0\uAE30 \uC644\uB8CC"];return e.operation_id&&t.push(`\uC791\uC5C5 ${e.operation_id}`),e.receipt?.archive_path&&t.push(`\uBC31\uC5C5 ${e.receipt.archive_path}`),e.receipt?.original_pr?.url&&t.push(`\uC6D0\uBCF8 PR ${e.receipt.original_pr.url}`),e.receipt?.revert_pr?.url&&t.push(`revert PR ${e.receipt.revert_pr.url}`),t.join(" \xB7 ")}function od(e){return e?.startsWith("orphan_gitlink_content:")?`\uB9E4\uD551 \uC5C6\uB294 gitlink \uACBD\uB85C ${e.slice(23)}\uC5D0 \uB0B4\uC6A9\uC774 \uC788\uC2B5\uB2C8\uB2E4 \u2014 \uC800\uC7A5\uC18C\uC5D0\uC11C \uADF8 \uACBD\uB85C\uB97C \uC815\uB9AC\uD55C \uB4A4 \uC7AC\uC2DC\uB3C4\uD558\uAC70\uB098 \uD3EC\uAE30\uD558\uC138\uC694`:e==="dirty_submodule"?"\uC11C\uBE0C\uBAA8\uB4C8\uC5D0 \uBBF8\uCEE4\uBC0B \uBCC0\uACBD\uC774\uB098 \uBBF8\uCD08\uAE30\uD654 \uD56D\uBAA9\uC774 \uC788\uC2B5\uB2C8\uB2E4 \u2014 \uC815\uB9AC \uD6C4 \uC7AC\uC2DC\uB3C4\uD558\uC138\uC694":e==="submodule_observation_failed"?"\uC11C\uBE0C\uBAA8\uB4C8 \uC0C1\uD0DC\uB97C \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 (git \uC624\uB958) \u2014 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C git \uBA85\uB839\uC744 \uC9C1\uC811 \uD655\uC778\uD558\uC138\uC694":null}function rr(e,t,n={}){let o=Object.values(e&&typeof e=="object"?e:{}).filter(m=>m&&m.bead_id===t&&Ku(m)).sort((m,_)=>(m.requested_at||0)-(_.requested_at||0)).at(-1),i=typeof n.attempt_id=="string"&&n.attempt_id.length>0?n.attempt_id:typeof o?.attempt_id=="string"?o.attempt_id:null,s=n.external?"\uC678\uBD80 PR\uC740 Worker\uAC00 \uC18C\uC720\uD558\uC9C0 \uC54A\uC544 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":n.done?"\uC644\uB8CC\uB41C \uC791\uC5C5\uC740 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":n.merge_active?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":n.merge_queued?"\uBA38\uC9C0 \uD050\uC5D0 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 [\uCDE8\uC18C]\uD558\uC138\uC694":n.conflict_active?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 \uC138\uC158\uC744 \uC815\uB9AC\uD558\uC138\uC694":n.cleanup_active?"\uC815\uB9AC \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":null,l=typeof o?.last_error=="string"?o.last_error:null,a=o?$g(o.phase):null,u=o?.kind==="stale_work_backup_fresh",d=od(l),p=n.merged||o?.mode==="merged_revert"?"merged":"unmerged";return{action:!n.external&&!n.done,enabled:!s&&(!o||!!l),label:u?l?"\uBC31\uC5C5 \uC815\uB9AC \uC7AC\uC2DC\uB3C4":"\uBC31\uC5C5 \uD6C4 \uC0C8\uB85C \uC2DC\uC791":l?"\uC7AC\uC2DC\uB3C4":"\uD3D0\uAE30",title:s||(l?d?`\uD3D0\uAE30 \uC2E4\uD328: ${l} \u2014 ${d}`:u?`\uBC31\uC5C5 \uB4A4 \uC815\uB9AC \uC2E4\uD328: ${l} \u2014 \uC6D0\uBCF8\uACFC \uAC80\uC99D \uC601\uC218\uC99D\uC744 \uBCF4\uC874\uD55C \uCC44 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:`\uD3D0\uAE30 \uC2E4\uD328: ${l} \u2014 \uAC19\uC740 \uC791\uC5C5\uC744 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:o?`${a||"\uD3D0\uAE30 \uCC98\uB9AC \uC911"} \u2014 \uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694`:p==="merged"?"\uBCD1\uD569\uB41C \uBCC0\uACBD\uC744 \uC6D0\uBCF5 PR\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4":"\uBC31\uC5C5 \uD6C4 runner\xB7PR\xB7\uC6CC\uD06C\uD2B8\uB9AC\xB7\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4"),attempt_id:i,operation:o||null,progress:a,error:l,confirmation:p,abandon:{action:!!o&&o.phase==="requested"&&!!l,label:u?"\uBC31\uC5C5 \uD3EC\uAE30":"\uD3D0\uAE30 \uD3EC\uAE30",title:u?"\uC2E4\uD328\uD55C \uBC31\uC5C5 \uC791\uC5C5\uC744 \uD3EC\uAE30\uD569\uB2C8\uB2E4 \u2014 \uC6D0\uBCF8\uC740 \uADF8\uB300\uB85C \uB0A8\uACE0 \uC0C8\uB85C \uC2DC\uC791\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4":"\uC2E4\uD328\uD55C \uD3D0\uAE30 \uC791\uC5C5\uC744 \uD3EC\uAE30\uD569\uB2C8\uB2E4 \u2014 \uBC31\uC5C5\xB7\uD3D0\uAE30\uB294 \uC218\uD589\uB418\uC9C0 \uC54A\uC558\uACE0 bead\uB294 \uD3D0\uAE30 \uC774\uC804 \uC0C1\uD0DC\uB85C \uB3CC\uC544\uAC11\uB2C8\uB2E4"}}}function sd(e){if(!e||e.quickfix_lane!==!0)return!1;let t=e.quickfix_landing;return!t||typeof t!="object"?!1:["repo_operations","branch_cleanup","parent_close"].includes(t.cursor)}function si(e){let t=e.discard;if(!t||!t.operation)return"";let n=t.operation,r=od(t.error),o=n.kind==="stale_work_backup_fresh"&&!t.error?null:n.backup?.path,i=n.original_pr,s=n.revert_pr;return c`<div
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
  </div>`}var xg={dirty_unique:"\uCD5C\uC2E0 base\uC5D0 \uC5C6\uB294 \uB85C\uCEEC \uBCC0\uACBD\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",untracked_present:"\uCD94\uC801\uB418\uC9C0 \uC54A\uC740 \uD30C\uC77C\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",branch_ahead:"\uB85C\uCEEC branch\uC5D0 \uACE0\uC720 commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",head_ahead:"worktree HEAD\uC5D0 \uACE0\uC720 commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",ahead_not_contained:"\uB85C\uCEEC branch\uC758 \uACE0\uC720 commit\uC774 \uCD5C\uC2E0 base\uC5D0 \uD3EC\uD568\uB410\uC74C\uC744 \uC99D\uBA85\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",ahead_merge_commit:"\uB85C\uCEEC branch\uC5D0 \uC790\uB3D9 \uC815\uB9AC\uD560 \uC218 \uC5C6\uB294 merge commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",ahead_submodule_path:"\uB85C\uCEEC branch\uC758 \uACE0\uC720 commit\uC774 submodule \uACBD\uB85C\uB97C \uBCC0\uACBD\uD569\uB2C8\uB2E4",archive_failed:"\uACE0\uC720 commit \uBC31\uC5C5\uC744 \uC548\uC804\uD558\uAC8C \uAC80\uC99D\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",ref_delete_failed:"\uD655\uC778\uB41C local branch\uB97C \uC548\uC804\uD558\uAC8C \uC0AD\uC81C\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",resume_available:"\uC774\uC5B4\uAC08 \uC218 \uC788\uB294 \uC774\uC804 Worker session\uC774 \uC788\uC2B5\uB2C8\uB2E4",observe_failed:"Git \uC0C1\uD0DC\uB97C \uC548\uC804\uD558\uAC8C \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",identity_changed:"\uD655\uC778 \uC911 worktree \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4",ownership_unknown:"Worker \uC18C\uC720 worktree\uC778\uC9C0 \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"};function id(e,t=!1){if(!e||typeof e!="object")return null;let n=e;if(n.reason!=="worktree_stale_work"||!n.stale_work||typeof n.stale_work!="object")return null;let r=n.stale_work,o=r.residue==="branch"?"branch":"worktree",i=r.state==="unique"?"unique":"unknown",s=r.summary&&typeof r.summary=="object"?r.summary:{};function l(u){return Number.isInteger(s[u])?Number(s[u]):0}let a=typeof r.cause=="string"?r.cause:"observe_failed";return{residue:o,state:i,title:o==="branch"?"\uC774\uC804 \uBE0C\uB79C\uCE58 \uBCF4\uC874\uB428":i==="unique"?"\uC774\uC804 \uC791\uC5C5 \uBCF4\uC874\uB428":"\uC774\uC804 \uC791\uC5C5 \uC0C1\uD0DC \uD655\uC778 \uC2E4\uD328",cause:xg[a]||"\uC548\uC804\uD558\uAC8C \uC790\uB3D9 \uC815\uB9AC\uD560 \uC218 \uC5C6\uB294 \uC774\uC804 \uC791\uC5C5\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",summary:o==="branch"?`\uACE0\uC720 commit ${l("branch_ahead")}`:[`staged ${l("staged_count")}`,`unstaged ${l("unstaged_count")}`,`untracked ${l("untracked_count")}`,`branch ahead ${l("branch_ahead")}`,`HEAD ahead ${l("head_ahead")}`].join(" \xB7 "),action_id:typeof r.action_id=="string"?r.action_id:"",can_resume:r.can_resume===!0,can_continue:r.can_continue===!0,can_backup_fresh:r.can_backup_fresh===!0,can_recheck:r.can_recheck===!0,locked:t}}function ui(e,t={}){if(!e||!e.orchestration&&!e.worker)return"";let n=t.pin===!0?" exec-chip--pin":"",r=t.pin===!0?`
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
      >`:""}`}function zo(e,t){let n=`worker-dep worker-dep--${t}${e.foreign?" worker-dep--foreign":""}`;return e.openable===!0?c`<button
        type="button"
        class=${`${n} worker-dep__open`}
        data-dep-id=${e.id}
        data-root-dir=${e.root_dir||""}
        title=${e.title||""}
      >
        ${e.label}
      </button>`:c`<span class=${n} title=${e.title||""}>${e.label}</span>`}function Ag(e){return{id:e.id,label:`\u29C9 ${e.id}`,title:[`\uACB9\uCE68 \xB7 ${e.location_label}`,...e.prefixes].join(`
`),openable:!0,...e.root_dir?{root_dir:e.root_dir}:{}}}function Ha(e){return Array.isArray(e)?e.slice().sort((t,n)=>t.id<n.id?-1:t.id>n.id?1:0):[]}function Sg(e,t=!1){return e?c`<button
    type="button"
    class="ctl-chip ctl-chip--label judgement-chip worker-card__spec-after-blocker"
    data-chip-key="spec_after_blocker"
    aria-expanded=${t?"true":"false"}
    title="선행의 결과가 설계 전제라 스펙도 선행 뒤에 씁니다"
  >
    스펙 대기
  </button>`:""}function di(e,t=""){if(!e)return t===""?"":c`<div class="worker-deps worker-deps--primary">
          ${t}
        </div>`;let n=Ha(e.predecessors),r=Array.isArray(e.released)?e.released:[],o=Ha(e.dependents),i=Ha(e.overlaps),s=e.scope_missing===!0,l=e.armed_lane||null,a=!!l||n.length>0||o.length>0||t!=="",u=r.length>0||i.length>0||s;return!a&&!u?"":c`${a?c`<div class="worker-deps worker-deps--primary">
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
            >`:""}${n.map(d=>zo(d,"pred"))}${t}${o.map(d=>zo(d,"dependents"))}
      </div>`:""}${u?c`<div class="worker-deps worker-deps--secondary">
        ${r.map(d=>zo(d,"released"))}${i.map(d=>zo(Ag(d),"overlap"))}${s?c`<span
              class="worker-dep worker-dep--muted"
              title="겹침 판정 불가 — 아티팩트가 있으면 스펙/플랜 front-matter, 없으면 description \`## scope\`에 선언 필요"
              >scope 없음</span
            >`:""}
      </div>`:""}`}function ad(e,t=""){let n=(Array.isArray(e)?e:[]).filter(r=>typeof r=="string"&&r!=="").slice().sort();return n.length===0?"":c`<div class="worker-deps worker-deps--secondary">
    ${n.map(r=>zo({id:r,label:`\uC774\uC6D4 \u2192 ${r}`,title:`\uC774\uC6D4\uB41C \uD6C4\uC18D ${r} \uC5F4\uAE30`,openable:!0,...t?{root_dir:t}:{}},"dependents"))}
  </div>`}function pi(e){return e?c`<button
    type="button"
    class="worker-dep worker-dep--lane mon-lane__chip"
    data-lane-id=${e.lane_id}
    title="이 연결 레인으로 이동"
  >
    ${e.label}
  </button>`:""}function fi(e){if(!e)return"";let t=e.chips||{},n=t.route||e.route,r=t.route_source==="derived"||e.route_source==="derived";return n?c`<span
    class="ctl-chip ctl-chip--route${r?" is-derived":""}"
    title=${r?"route \uBBF8\uD540 (metadata unset)":"route"}
    >${r?"unset":n}</span
  >`:""}function Eg(e,t=!1){let n=e?e.quick_fix_review:null;if(!n)return"";let r=n.state;if(r!=="reviewed"&&r!=="stale")return"";let o=Array.isArray(n.missing)?n.missing:[],i=[r==="reviewed"?"quick_fix self-review \uC601\uC218\uC99D\uC774 \uC9C0\uAE08 \uBCF8\uBB38\uACFC \uC77C\uCE58\uD569\uB2C8\uB2E4":"quick_fix self-review \uC601\uC218\uC99D\uC774 \uC9C0\uAE08 \uBCF8\uBB38\uACFC \uB2E4\uB985\uB2C8\uB2E4",...o].join(`
`);return c`<button
    type="button"
    class="ctl-chip judgement-chip worker-card__qfr worker-card__qfr--${r}"
    data-chip-key="qfr"
    aria-expanded=${t?"true":"false"}
    title=${i}
  >
    ${r==="reviewed"?"\uB9AC\uBDF0 \u2713":"\uB9AC\uBDF0 stale"}
  </button>`}function ld(e){return e?c`<button
    type="button"
    class="ctl-chip ctl-chip--from"
    data-from-id=${e}
    title=${`\uCD9C\uCC98 ${e} \uC5F4\uAE30`}
  >
    ↩ from ${e}
  </button>`:""}function _i(e,t=!1){return e?c`<button
    type="button"
    class="ctl-chip ctl-chip--label judgement-chip worker-card__rec"
    data-chip-key="rec"
    data-state=${e.state}
    aria-expanded=${t?"true":"false"}
    title=${ei(e)}
  >
    ${"\uBCF5\uC7A1"}
  </button>`:""}var Tg={absent:"\uC2E4\uD589 \uC601\uC218\uC99D\uC774 \uAE30\uB85D\uB418\uC9C0 \uC54A\uC558\uB2E4 \u2014 \uACFC\uAC70 Bead\xB7\uC678\uBD80 \uACBD\uB85C PR\uC740 \uC6D0\uB798 \uC5C6\uB2E4",unparsable:"\uC601\uC218\uC99D \uAC12\uC744 \uC77D\uC744 \uC218 \uC5C6\uB2E4 \u2014 40hex SHA\uB098 `delegated:`/`main:` \uD615\uC2DD\uC774 \uC544\uB2C8\uB2E4",effort_unknown:"effort \uD1A0\uD070\uC774 harness \uC5B4\uD718 \uBC16\uC774\uB2E4 \u2014 \uBAA8\uB378\xB7SHA\xB7unit\uC740 \uC720\uD6A8\uD558\uB2E4",main_reason_retired:"`main:` \uC0AC\uC720\uAC00 \uACE0\uC815 4\uD1A0\uD070(bead\xB7quick_fix_default\xB7phase_line\xB7takeover) \uBC16\uC774\uB2E4",main_receipt_unbacked:"`main:` \uC0AC\uC720\uB97C \uB4B7\uBC1B\uCE68\uD558\uB294 \uBA54\uD0C0\uB370\uC774\uD130(impl_dispatch\xB7route\xB7planned_execution\xB7quick_fix \uAE30\uBCF8 dispatch)\uAC00 \uC5C6\uB2E4",takeover_lineage_missing:"`main:takeover`\uC778\uB370 resolved \uBAA8\uB378\uACFC \uC77C\uCE58\uD558\uB294 \uC644\uB8CC\uB41C \uC704\uC784 \uC138\uC158\uC774 \uC5C6\uB2E4",takeover_lineage_unobservable:"`main:takeover`\uC778\uB370 \uC704\uC784 \uACC4\uBCF4\uB97C \uBAA8\uB2C8\uD130\uAC00 \uBCFC \uC218 \uC5C6\uB2E4(Codex \uBC16 \uB7F0\uD0C0\uC784)"};function Cg(e,t=!1){let n=cd(e);if(n.length===0)return"";let r=n.length>1?`\uC601\uC218\uC99D \xB7 ${n[0]} +${n.length-1}`:`\uC601\uC218\uC99D \xB7 ${n[0]}`;return c`<button
    type="button"
    class="ctl-chip ctl-chip--label judgement-chip worker-card__receipt"
    data-chip-key="receipt"
    data-bead-id=${e.id}
    aria-expanded=${t?"true":"false"}
    title=${n.join(", ")}
  >
    ${r}
  </button>`}function cd(e){let t=e.receipt_badge?e.receipt_badge.codes:null;return Array.isArray(t)?t.filter(n=>typeof n=="string"&&n.length>0):[]}function ud(e,t){return!e||typeof t!="number"?"":c`<a
    class="worker-mini__pr"
    href=${e}
    target="_blank"
    rel="noreferrer noopener"
    title="PR 열기"
    >#${t} ↗</a
  >`}function mi(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=Math.max(0,Math.min(4,Math.trunc(e)));return c`<span class="worker-pri" title=${`\uC6B0\uC120\uC21C\uC704 P${t}`}
    >P${t}</span
  >`}function Rg(e){let t=Array.isArray(e.badges)?e.badges:[],n=cn(e.usage),r=er(e.usage),o=fn(e.done_at);return c`<div
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
      ${ud(e.pr_url,e.pr_number)}${o?c`<span
            class="worker-mini__done-at"
            title=${`\uC644\uB8CC ${tn(e.done_at)}`}
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
    ${ad(e.carried_to,e.root_dir)}
    <div class="worker-mini__row3">
      ${n.length>0?n.map(i=>c`<span class="worker-usage" title=${i.tooltip}
                >${i.label}</span
              >`):r?c`<span class="worker-usage" title=${Po(e.usage)}
              >${r}</span
            >`:""}
      ${typeof e.work_ms=="number"?c`<span
            class="worker-mini__work"
            title=${Ju(e.work_kind)}
            >작업 ${qr(e.work_ms)}</span
          >`:""}
    </div>
  </div>`}function ho(e,t={}){if(!(e.draggable!==!0||e.done===!0))return c`<span class="worker-mini__rowops">
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
  </span>`}function Mn(e,t={}){if(e.lane==="done"&&e.done_layout==="three_line")return Rg(e);let n=e.draggable&&!e.done,r=Array.isArray(e.badges)?e.badges:[],o=cn(e.usage),i=er(e.usage),s=e.merge_step||null,l=e.lane==="pr_wait"||!!e.revise_action||!!e.stale_work||e.discard?.abandon.action===!0,a=e.lane==="done"&&!l,u=a?fn(e.done_at):"",d=n?c`<span class="worker-mini__grip" aria-hidden="true">⠿</span>`:"",p=typeof e.seq=="number"?c`<span class="worker-mini__seq" aria-hidden="true"
          >${e.seq}</span
        >`:"",m=e.workspace_name?c`<span class="worker-mini__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:"",_=c`<span class="worker-mini__id" title="클릭하면 ID 복사"
    >${e.id}</span
  >`,w=e.lane==="done"?"":fi(e.workflow),R=e.lane==="done"?"":ld(e.from_id),I=mi(e.priority),U=c`<span class="worker-mini__title">${e.title}</span>`,se=ud(e.pr_url,e.pr_number),W=r.map(it=>it===e.live_badge?c`<span
          class="worker-mini__badge worker-mini__badge--activity"
          title="서버가 이 PR을 처리하는 중입니다"
          ><span class="act-dot" aria-hidden="true"></span>${it}</span
        >`:c`<span
          class="worker-mini__badge${e.alert?" worker-mini__badge--alert":""}"
          title=${it===e.completion_badge&&e.completion_title||""}
          >${it}</span
        >`),j=e.reason?c`<span class="worker-mini__reason">${e.reason}</span>`:"",O=o.length>0?o.map(it=>c`<span class="worker-usage" title=${it.tooltip}
              >${it.label}</span
            >`):i?c`<span class="worker-usage" title=${Po(e.usage)}
            >${i}</span
          >`:"",q=s?c`<span
        class="merge-step${s.failed?" merge-step--failed":""}"
        style=${`--progress: ${s.percent}%`}
        >${s.label}${s.index>0?c`<span class="merge-step__n"
              >${s.index}/${s.total}</span
            >`:""}</span
      >`:"",z=e.merge_action?c`<button
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
      </button>`:"",N=e.discard,F=N?.action||e.discard_action?c`<button
          type="button"
          class="worker-mini__discard"
          data-bead-id=${e.id}
          data-attempt-id=${N?.attempt_id||""}
          data-operation-id=${N?.operation?.operation_id||""}
          data-discard-mode=${N?.confirmation||"unmerged"}
          ?disabled=${N?!N.enabled:e.discard_enabled===!1}
          title=${N?N.title:e.discard_enabled===!1?e.discard_title||"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"PR\uC744 \uB2EB\uACE0 \uC6CC\uD06C\uD2B8\uB9AC/\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4 (\uB418\uB3CC\uB9B4 \uC218 \uC5C6\uC74C). \uB2E4\uC2DC \uC2E4\uD589\uD558\uB824\uBA74 \uD6C4\uBCF4 \uB808\uC778\uC5D0\uC11C \uB300\uAE30 \uB808\uC778\uC73C\uB85C \uC62E\uAE30\uC138\uC694"}
        >
          ${N?.label||"\uD3D0\uAE30"}
        </button>`:"",H=N?.abandon.action?c`<button
        type="button"
        class="worker-mini__discard-abandon"
        data-bead-id=${e.id}
        data-operation-id=${N.operation.operation_id}
        data-operation-kind=${N.operation.kind||""}
        data-last-error=${N.error||""}
        title=${N.abandon.title}
      >
        ${N.abandon.label}
      </button>`:"",G=e.resolve_action?c`<button
        type="button"
        class="worker-mini__resolve"
        data-bead-id=${e.id}
        ?disabled=${e.resolve_enabled===!1}
        title=${e.resolve_title||"\uC2E4\uD328\uD55C \uC791\uC5C5\uC744 \uC774\uC5B4\uBC1B\uB294 \uB300\uD654\uD615 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4 (\uAE30\uB85D\uB41C \uC138\uC158\uC774 \uC788\uC73C\uBA74 fork)"}
      >
        세션에서 해결
      </button>`:"",ee=N?.abandon.action?c`${F}${H}${G}`:c`${G}${F}`,ye=e.stale_work||null,qe=ye?c`${ye.can_resume||ye.can_continue?c`<button
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
          </button>`:""}`:"",B=ye?c`<div class="worker-mini__stale">
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
        </button>`:"",Se=!!(e.lane!=="pr_wait"&&!e.done&&e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker)),Ee=_i(e.rec,Mr(e,"rec")),C=Cg(e,Mr(e,"receipt")),re=pi(e.cross_lane_chip),ke=Dr(e.log_path),ve=m||re||w||R||Se||Ee||C||O||ke?c`<div class="worker-chips">
          ${m}${re}${w}${R}${Se?ui(e.exec_chips,{pin:e.exec_chips_pinned===!0}):""}${Ee}${C}${O}${ke}${Ka(e)}
        </div>`:"",Me=di(e.dependency_chips),he=si(e),Le=t.actions?t.actions:"",Xe=!!(s||e.merge_action||e.cancel_action||e.resolve_action||e.discard_action||N?.operation||e.revise_action||ye);return c`<div
    class="worker-mini${l?" worker-mini--card":""}${n?"":" worker-mini--static"}${e.done?" worker-mini--done":""}${e.ghost?" worker-mini--ghost":""}${s?" worker-mini--merging":""}${s?.failed?" worker-mini--merge-failed":""}${e.external?" worker-mini--external":""}${e.search_match===!1?" is-dimmed":""}"
    style=${s?`--progress: ${s.percent}%`:""}
    draggable=${n?"true":"false"}
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    ${a?c`<div class="worker-mini__row1">
            ${m}${_}${I}${R}${se}${U}${Le}
          </div>
          ${ad(e.carried_to,e.root_dir)}
          <div class="worker-mini__row2">
            ${O}${u?c`<span
                  class="worker-mini__done-at"
                  title=${`\uC644\uB8CC ${tn(e.done_at)}`}
                  >완료 ${u}</span
                >`:""}${typeof e.work_ms=="number"?c`<span
                  class="worker-mini__work"
                  title=${Ju(e.work_kind)}
                  >작업 ${qr(e.work_ms)}</span
                >`:""}${W}${q}
            <span class="worker-mini__actions"
              >${z}${Y}${ee}</span
            >
            ${go(e)}
          </div>`:l?c`<div class="worker-mini__head">
              ${d}${p}${_}${I}${se}${W}${j}${Le}
            </div>
            <div class="worker-mini__body">${U}${B}</div>
            ${Me}${ve}${Xe?c`<div class="worker-mini__foot">
                  ${q}
                  <span class="worker-mini__actions"
                    >${z}${Y}${ee}${X}${qe}</span
                  >
                  ${si(e)}
                </div>`:""}
            ${go(e)}`:c`<div class="worker-mini__line">
              ${d}${p}${_}${I}${U}${se}${W}${j}${q}${z}${Y}${ee}${Le}
            </div>
            ${Me}${ve}${he} ${go(e)}`}
  </div>`}function Ya(e,t){let n,r=[];for(let o of e){let i=o.group||"";i.length>0&&i!==n&&r.push(c`<div class="worker-card__place-group">${i}</div>`),n=i,r.push(c`<button
        type="button"
        class="worker-card__place-lane${i.length>0?" worker-card__place-lane--nested":""}"
        data-bead-id=${t}
        data-lane=${o.id}
        ?disabled=${o.disabled===!0}
        title=${o.title||`${o.label} \uB300\uAE30 \uB9E8 \uB4A4\uC5D0 \uCD94\uAC00`}
      >
        <span>${o.label}</span>
        ${typeof o.count=="number"?c`<span class="worker-card__place-count">${o.count}</span>`:""}
      </button>`)}return c`${r}`}var dd={external_roundtrip:"\uD558\uB124\uC2A4 \uBC16 \uC0C1\uB300\uC640 \uC608\uCE21 \uBD88\uAC00 \uC655\uBCF5 \uBC18\uBCF5 \u2014 \uB2E4\uB978 rig \uC138\uC158\xB7\uC0AC\uB78C\xB7\uC678\uBD80 \uC2DC\uC2A4\uD15C",user_feedback_loop:"\uC9C4\uD589 \uC911 \uC0AC\uC6A9\uC790 \uD53C\uB4DC\uBC31 \uC5C6\uC774\uB294 \uD488\uC9C8\uC774 \uB0AE\uC74C \u2014 \uBB38\uC548\xB7\uC124\uACC4 \uC138\uBD80\xB7\uBC29\uD5A5 \uC120\uD0DD"};function Va(e,t){if(t==="rec"){let n=e.rec;if(!n)return null;let r=Ua[n.state]||"";return{title:"\uBCF5\uC7A1\uD55C \uC791\uC5C5\uC73C\uB85C \uD310\uC815\uB428",lines:[...Ba(n),...r.length>0?[`\uC0C1\uD0DC: ${r}`]:[],"\uC801\uC6A9\uC740 \uC774\uC288 \uC0C1\uC138\uC758 \uC2E4\uD589 \uC124\uC815 \uD3B8\uC9D1\uAE30\uC5D0\uC11C"]}}if(t==="session_preferred"){if(e.session_preferred!==!0)return null;let n=dd[e.session_preferred_reason||""]||"";return{title:"\uC6CC\uCEE4\uB85C \uB3CC\uB9B4 \uC218 \uC788\uC9C0\uB9CC \uC138\uC158\uC774 \uB0AB\uB2E4",lines:n.length>0?[n]:[]}}if(t==="ineligible")return e.worker_ineligible!==!0?null:{title:"\uC6CC\uCEE4 \uC2E4\uD589 \uB300\uC0C1\uC774 \uC544\uB2C8\uB2E4",lines:["worker-ineligible \uB77C\uBCA8\uC774 \uBD99\uC5B4 \uC788\uB2E4 \u2014 \uB77C\uBCA8\uC740 \uC774\uC288 \uC0C1\uC138\uC758 \uB77C\uBCA8 \uC808\uC5D0\uC11C \uB5C0\uB2E4"]};if(t==="spec_after_blocker")return e.spec_after_blocker!==!0?null:{title:"\uC120\uD589 \uACB0\uACFC\uAC00 \uC124\uACC4 \uC804\uC81C \u2014 \uC2A4\uD399\uB3C4 \uC120\uD589 \uB4A4\uC5D0",lines:[`\uC120\uD589: ${(Array.isArray(e.blocked_by)?e.blocked_by:[]).join(" \xB7 ")}`,"\uC120\uD589\uC774 \uB2EB\uD788\uBA74 \uC774 \uD45C\uC2DC\uB294 \uC800\uC808\uB85C \uC0AC\uB77C\uC9C4\uB2E4 \u2014 \uB77C\uBCA8\uC740 \uC774\uC288 \uC0C1\uC138\uC758 \uB77C\uBCA8 \uC808\uC5D0\uC11C \uB5C0\uB2E4"]};if(t==="receipt"){let n=cd(e);return n.length===0?null:{title:"\uC2E4\uD589 \uC601\uC218\uC99D \uD68C\uACC4 \uC794\uC5EC \u2014 \uBA38\uC9C0\uB294 \uC9C4\uD589",lines:[...n.map(r=>Tg[r]||r),"\uC790\uB3D9 \uBA38\uC9C0 \uD310\uC815\uC5D0\uB294 \uC601\uD5A5\uC774 \uC5C6\uB2E4 \u2014 \uC815\uC815\uC740 bd update --set-metadata exec_receipt=\u2026 \uB85C"]}}if(t==="qfr"){let n=e.workflow?e.workflow.quick_fix_review:null;if(!n||n.state!=="reviewed"&&n.state!=="stale")return null;let r=Array.isArray(n.missing)?n.missing:[];return{title:n.state==="reviewed"?"quick_fix self-review \uC601\uC218\uC99D\uC774 \uC9C0\uAE08 \uBCF8\uBB38\uACFC \uC77C\uCE58\uD569\uB2C8\uB2E4":"quick_fix self-review \uC601\uC218\uC99D\uC774 \uC9C0\uAE08 \uBCF8\uBB38\uACFC \uB2E4\uB985\uB2C8\uB2E4",lines:r.length>0?r:["\uBE60\uC9C4 \uD56D\uBAA9 \uC5C6\uC74C"]}}return null}var Og=["rec","receipt","session_preferred","ineligible","qfr","spec_after_blocker"];function gi(e,t){for(let n of Og){if(!t(n))continue;let r=Va(e,n);return r?{chip_key:n,content:r}:null}return null}function Ka(e){return e.chip_popover?lo(e.chip_popover.content):""}function Mr(e,t){return!!e.chip_popover&&e.chip_popover.chip_key===t}var hi="\uC0AC\uC6A9\uC790 \uB9AC\uBDF0 \uD544\uC694";function Qa(e,t=null,n={}){let r=e.worker_ineligible===!0,o=e.draggable&&!e.done&&!r,i=e.queue_placeable===!0&&!e.done&&!r,s=i&&t&&t.bead_id===e.id,l=e.session_preferred===!0,a=dd[e.session_preferred_reason||""]||"",u=e.workflow,d=typeof e.reason=="string"?e.reason.split(" \xB7 "):[],p=d.includes("missing_description"),m=d.some(q=>q.startsWith(hi)),_=typeof e.reason=="string"&&e.reason.startsWith("\u26D4"),w=Mr(e,"spec_after_blocker"),R=Sg(e.spec_after_blocker===!0,w),I=di(e.dependency_chips,R===""?"":c`${R}${w?Ka(e):""}`),U=e.workspace_name?c`<span class="worker-card__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:"",se=pi(e.cross_lane_chip),W=fi(u),j=ld(e.from_id),O=!!(e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker));return c`<div
    class="worker-card${o?"":" worker-card--static"}${r?" worker-card--ineligible":""}${e.search_match===!1?" is-dimmed":""}"
    draggable=${o?"true":"false"}
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    <div class="worker-card__head">
      ${o?c`<span class="worker-card__grip" aria-hidden="true">⠿</span>`:""}
      <span class="worker-card__id" title="클릭하면 ID 복사">${e.id}</span
      >${mi(e.priority)}
      ${r?c`<button
            type="button"
            class="ctl-chip ctl-chip--label judgement-chip worker-card__ineligible"
            data-chip-key="ineligible"
            aria-expanded=${Mr(e,"ineligible")?"true":"false"}
            title="worker-ineligible label이 붙어 워커 실행 대상이 아닙니다"
          >
            worker-ineligible
          </button>`:l?c`<button
              type="button"
              class="ctl-chip ctl-chip--label judgement-chip worker-card__session-preferred"
              data-chip-key="session_preferred"
              aria-expanded=${Mr(e,"session_preferred")?"true":"false"}
              title=${a}
            >
              세션 권장
            </button>`:""}${_i(e.rec,Mr(e,"rec"))}${Eg(u,Mr(e,"qfr"))}
      ${w?"":Ka(e)}
    </div>
    <div class="worker-card__title">${e.title}</div>
    ${u?Ns(u,e.status,{onOpenDoc:n.onOpenDoc}):""}${I}
    ${U||se||W||j||O?c`<div class="worker-chips">
          ${U}${se}${W}${j}${ui(e.exec_chips,{pin:n.exec_chips_mode==="pinned_only"})}
        </div>`:""}
    <div
      class="worker-card__foot${e.reason?"":" worker-card__foot--actions-only"}"
    >
      ${s?c`<div class="worker-card__place-menu">
            ${Ya(t.lanes,e.id)}
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
                 유일한 경로다 (UI-d13v §6). 막는 것은 예전 드래그와 같다 — spec
                 없는 후보만 막고, blocked-with-spec은 적재할 수 있다. 포인터
                 종류로 감추지 않는다: 드래그라는 대체 경로가 없다. -->
            <button
              type="button"
              class="op-btn op-btn--primary worker-card__place"
              data-bead-id=${e.id}
              ?disabled=${!i}
              title=${oi({placeable:i,worker_ineligible:r,awaiting_user:m,missing_description:p})}
            >
              ↴ 대기로
            </button>`}
    </div>
    ${go(e)}
  </div>`}function Yn(e){let t=!!e.collapsible&&!!e.collapsed,n=typeof e.count=="number"?e.count:e.items.length,r=c`<span
      class="worker-pane__dot worker-pane__dot--${e.lane}"
      aria-hidden="true"
    ></span>
    <span class="worker-pane__title">${e.title}</span>
    ${t&&e.preview?c`<span class="worker-pane__preview">${e.preview}</span>`:""}
    <span class="worker-pane__count">${n}</span>
    ${typeof e.match_count=="number"?c`<span class="worker-pane__match">일치 ${e.match_count}</span>`:""}`;return c`<section
    class="worker-pane worker-pane--lane-${e.lane}${e.src?" worker-pane--src":""}${e.live?" worker-pane--live":""}${e.collapsible?" worker-pane--collapsible":""}${t?" worker-pane--collapsed":""}"
    id=${dn(e.id||void 0)}
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
                  </div>`:e.items.map(o=>e.lane==="candidate"?Qa(o,e.place_menu,{onOpenDoc:e.onOpenDoc}):Mn(o))}
          </div>`}
  </section>`}function Zu(e,t,n){return c`<button
      type="button"
      class="worker-wait__area-toggle"
      data-area=${e}
      aria-expanded=${n?"false":"true"}
      aria-label=${`${t} ${n?"\uD3BC\uCE58\uAE30":"\uC811\uAE30"}`}
    >
      ${n?"\u25B8":"\u25BE"}
    </button>
    <span class="worker-wait__area-name">${t}</span>`}function bi(e){let t=e.parallel,n=e.serial,r=t.drop||{};return c`<div class="worker-wait">
    <section
      class="worker-wait__area worker-wait__area--parallel${t.collapsed?" is-collapsed":""}"
      data-area="parallel"
    >
      <header class="worker-wait__area-hd">
        ${Zu("parallel","\uBCD1\uB82C \uC601\uC5ED",t.collapsed)}
        <span class="worker-wait__area-count">${t.count}</span>
      </header>
      ${t.collapsed?"":c`<div
            class="worker-wait__area-body"
            data-drop=${dn(r.drop)}
            data-root-dir=${dn(r.root_dir)}
            data-lane-id=${dn(r.lane_id)}
            data-lane-length=${dn(r.lane_length)}
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
        ${Zu("serial","\uC9C1\uB82C \uC601\uC5ED",n.collapsed)}
        ${n.header_control?n.header_control:""}
      </header>
      ${n.collapsed?"":c`<div class="worker-wait__area-body">
            ${n.notice?n.notice:""}
            ${n.extra_panes?n.extra_panes:""}
            ${n.lanes.map(o=>Ig(o))}
          </div>`}
    </section>
  </div>`}function Ig(e){let t=e.drop||{},n=e.badge?c`<span
        class="worker-lane__badge${e.held?" worker-lane__badge--held":""}"
        >${e.badge}</span
      >`:"";return c`<div
    class="worker-wait__lane${e.empty?" worker-wait__lane--empty":""}"
  >
    ${Yn({id:typeof e.pane_id=="string"?e.pane_id:`worker-pane-lane-${e.id}`,lane:e.id,title:e.title,items:[],count:e.count,match_count:e.match_count,empty:"\uBE44\uC5B4 \uC788\uC74C \u2014 \uD589\uC744 \uC5EC\uAE30\uB85C \uB4DC\uB798\uADF8",header_control:c`${n}${e.header_control?e.header_control:""}`,body:c`<div
        class="worker-wait__rows"
        data-drop=${dn(t.drop)}
        data-root-dir=${dn(t.root_dir)}
        data-lane-id=${dn(t.lane_id)}
        data-lane-length=${dn(t.lane_length)}
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
  </div>`}function yi(e){return e.count?c`<section
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
  </section>`:""}var pd=[{step:"merge",label:"\uBA38\uC9C0",index:1},{step:"base",label:"base",index:2},{step:"verify",label:"\uAC80\uC99D",index:3},{step:"deploy",label:"\uBC30\uD3EC",index:4},{step:"child",label:"\uC790\uC2DD",index:5},{step:"branch",label:"\uBE0C\uB79C\uCE58",index:6},{step:"close",label:"close",index:7}],Go=[{step:"base_containment",label:"base \uD3EC\uD568 \uD655\uC778"},{step:"repo_operations",label:"\uC800\uC7A5\uC18C \uC791\uC5C5"},{step:"post_merge_jobs",label:"\uBA38\uC9C0 \uD6C4 \uC7A1"},{step:"child_sweep",label:"\uC790\uC2DD \uC815\uB9AC"},{step:"branch_cleanup",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC"},{step:"parent_close",label:"\uBD80\uBAA8 close"}];function vi(e,t){let n=pd.find(o=>o.step===e);if(!n)return null;let r=pd.length;return{step:n.step,label:t,index:n.index,total:r,percent:Math.round(n.index/r*100)}}function fd(e){let t=Go.findIndex(n=>n.step===e);return Go.map((n,r)=>({step:n.step,label:n.label,state:t<0?"todo":r<t?"done":r===t?"stall":"todo"}))}function Nr(e){let t=Go.find(n=>n.step===e);return t?t.label:typeof e=="string"?e:""}function Lg(e){let t=Go.findIndex(n=>n.step===e);return t<0?null:{index:t+1,total:Go.length}}function ki(e){let t=Lg(e);return t?`\uBA38\uC9C0 \uC644\uB8CC \xB7 \uC815\uB9AC ${t.total}\uB2E8\uACC4 \uC911 ${t.index}\uB2E8\uACC4\uC5D0\uC11C \uBA48\uCDA4`:"\uBA38\uC9C0\uB428 \xB7 \uC815\uB9AC \uBBF8\uC644"}var Za=new Set(["queued","running","retry_pending"]),_d=new Set(["failed","succeeded"]),Pg={queued:"\uB300\uAE30",running:"\uC911",retry_pending:"\uC7AC\uC2DC\uB3C4 \uB300\uAE30",failed:"\uC2E4\uD328",succeeded:"\uC644\uB8CC \xB7 \uC815\uB9AC \uC7AC\uC2DC\uB3C4 \uB300\uAE30"},Yo={base_containment:{step:"base",label:"base \uD655\uC778 \uC911"},child_sweep:{step:"child",label:"\uC790\uC2DD \uC815\uB9AC \uC911"},branch_cleanup:{step:"branch",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC \uC911"},parent_close:{step:"close",label:"\uBD80\uBAA8 close \uC911"}},Dg={merging:{step:"merge",label:"\uBA38\uC9C0 \uC911"},base_containment:Yo.base_containment,child_sweep:Yo.child_sweep,branch_cleanup:Yo.branch_cleanup,parent_close:Yo.parent_close};function Mg(e){return typeof e=="string"&&/^[0-9a-f]{40}$/.test(e)}function qg(e,t,n){return!["verify","deploy"].includes(e.kind)||![...Za,..._d].includes(e.state)||![null,void 0,""].includes(e.superseded_by)||!Array.isArray(e.subjects)?!1:e.subjects.some(r=>r&&typeof r=="object"&&r.bead_id===t&&r.merged_sha===n)}function Ng(e,t){let n=(t.kind==="deploy"?2:1)-(e.kind==="deploy"?2:1);if(n!==0)return n;let r=u=>u.state==="succeeded"?1:2,o=r(t)-r(e);if(o!==0)return o;let i=typeof e.requested_at=="number"?e.requested_at:0,s=typeof t.requested_at=="number"?t.requested_at:0;if(i!==s)return s-i;let l=typeof e.operation_id=="string"?e.operation_id:"",a=typeof t.operation_id=="string"?t.operation_id:"";return l.localeCompare(a)}function Xa(e,t=!1){let n=e.kind,r=n==="verify"?"\uAC80\uC99D":"\uBC30\uD3EC",o=t?"failed":e.state,i=Pg[o];if(!i)return null;let s=vi(n,`${r} ${i}`);return s?{...s,active:Za.has(o),failed:o==="failed"}:null}function jg(e){return!e||typeof e!="object"?null:Dg[e.step]||null}function Vo(e){if(!e||typeof e.bead_id!="string")return null;let t=e.bead_id,n=e.merge_progress&&typeof e.merge_progress=="object"?e.merge_progress:{},r=jg(n),o=e.cleanup_failed&&typeof e.cleanup_failed=="object"?e.cleanup_failed:null,i=["post_merge_jobs","child_sweep","branch_cleanup","parent_close"].includes(typeof e.cleanup_cursor=="string"?e.cleanup_cursor:""),s=!i&&(e.cleanup_cursor==="repo_operations"||n.step==="repo_operations"),l=Mg(e.merge_sha)?e.merge_sha:null,a=!i&&l&&Array.isArray(e.repo_operations)?e.repo_operations.filter(w=>w&&typeof w=="object"&&qg(w,t,l)).sort(Ng):[],u=s?a:[],d=u.find(w=>Za.has(w.state));if(d)return Xa(d);if(o)return o.step==="repo_operations"&&a[0]?Xa(a[0],!0):null;let p=u.find(w=>_d.has(w.state)?w.state!=="succeeded"||e.cleanup_cursor==="repo_operations":!1);if(p)return Xa(p);if(r){let w=vi(r.step,r.label);return w?{...w,active:!0,failed:!1}:null}let m=typeof e.cleanup_cursor=="string"?Yo[e.cleanup_cursor]:null;if(!m)return null;let _=vi(m.step,m.label);return _?{..._,active:!0,failed:!1}:null}function wi(e){return!!e&&e.step!=="merge"&&e.failed!==!0}var Fg="\uBBF8\uC801\uC7AC";function Ja(e,t){let n=Zn(e,t.id);return{id:t.id,label:`\u26D3 ${t.id}`,title:`\uC120\uD589 \u2014 close\uB420 \uB54C\uAE4C\uC9C0 \uCD9C\uBC1C\uD558\uC9C0 \uC54A\uB294\uB2E4 (${t.location_label})`,...n?{foreign:!0}:{}}}var Bg=10080*60*1e3;function md(e,t,n){let r=t.closed_at;if(typeof r!="number"||!Number.isFinite(r)||r<n-Bg)return null;let o=Zn(e,t.id),i=typeof t.root_dir=="string"?t.root_dir:"",s={id:t.id,label:`\u{1F513} ${t.id}`,title:`\uD574\uC81C \u2014 ${tn(r)}\uC5D0 close\uB418\uC5B4 \uC774 \uC774\uC288\uAC00 \uD480\uB838\uB2E4`,...o?{foreign:!0}:{}};return o?i.length>0&&(s.openable=!0,s.root_dir=i):s.openable=!0,s}function gd(e,t){let n=Array.isArray(t.ids)?t.ids.filter(i=>typeof i=="string"&&i.length>0):[],r=t.root_dirs&&typeof t.root_dirs=="object"?t.root_dirs:{},o=[];for(let i of[...new Set(n)].sort()){let s=Zn(e,i),l=typeof r[i]=="string"?r[i]:"",a={id:i,label:`\u2192 ${i}`,title:"\uD6C4\uC18D \u2014 \uC774 \uC774\uC288\uAC00 close\uB418\uBA74 \uD480\uB9B0\uB2E4",...s?{foreign:!0}:{}};l.length>0?(a.openable=!0,a.root_dir=l):s||(a.openable=!0),o.push(a)}return o}function hd(e,t,n={}){let r=new Map,o=new Map;for(let i of t)o.has(i.id)||o.set(i.id,i.location_label);for(let[i,s]of e){if(typeof i!="string"||i.length===0)continue;let l=[];for(let a of Array.isArray(s)?s:[]){if(typeof a!="string"||a.length===0)continue;let u=Ja(i,{id:a,location_label:o.get(a)||Fg}),d=n[a];u.foreign!==!0?u.openable=!0:typeof d=="string"&&d.length>0&&(u.openable=!0,u.root_dir=d),l.push(u)}l.length>0&&r.set(i,l)}return r}var xi=1,Qo=[{value:"repo_spec",label:"\uB808\uD3EC \xB7 spec \uC6B0\uC120"},{value:"repo_updated",label:"\uB808\uD3EC \xB7 \uCD5C\uC2E0 \uC218\uC815"},{value:"updated_flat",label:"\uCD5C\uC2E0 \uC218\uC815(\uB808\uD3EC \uBB34\uC2DC)"}],nl=[{value:"all",label:"\uC804\uCCB4"},{value:"with",label:"spec \uC788\uC74C"},{value:"without",label:"spec \uC5C6\uC74C"}],bo={show_blocked:!0,spec:"all"},bd={auto_merge:"\uC790\uB3D9 \uBA38\uC9C0",merged:"\uBA38\uC9C0",merge:"\uBA38\uC9C0",pr_stop:"PR \uC911\uB2E8",stopped:"\uC911\uB2E8",failed:"\uC2E4\uD328",refuted:"\uBC18\uC99D",no_delta:"\uBB34-delta"};function Ug(e,t){let n=null;for(let r of Object.values(e||{}))!r||r.bead_id!==t||!nr(r)||(n=typeof r.status=="string"?r.status:null);return n}function Wg(e,t){let n=null,r=-1/0;for(let o of Object.values(e)){if(!o||o.bead_id!==t||o.status==="running"||!nr(o))continue;let i=typeof o.finished_at=="number"?o.finished_at:typeof o.started_at=="number"?o.started_at:0;i>=r&&(r=i,n=o)}return n}function Qu(e){let t=tt(e),n=new Map;for(let r of Array.isArray(t.done)?t.done:[])r&&typeof r.bead_id=="string"&&typeof r.added_at=="number"&&n.set(r.bead_id,r.added_at);return new Set(Ad(tt(t.attempts),n).keys())}function Ad(e,t,n={}){let{winners:r,resumed_from_ids:o}=ku(e,t),i=new Map;for(let[s,l]of r){let a=l.attempt,u=l.run_state;if(Ed(a))continue;let d=l.started_at,p=typeof a.session_id=="string"&&a.session_id.length>0,_=Js(a.quickfix_landing)==="session",w=u!=="running"&&(p||!_)&&!o.has(a.attempt_id),R=!p&&_?"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":o.has(a.attempt_id)?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":null,I=tt(n.observations?.[s]),U=tt(I.pr),se=typeof a.merge_sha=="string"&&a.merge_sha.length>0||U.state==="MERGED",W=rr(n.discard_operations,s,{attempt_id:a.attempt_id,merged:se}),j=u==="failed"?vd(a,{resume_eligible:w,resume_reason:R,confirmation:W.confirmation,history:n.bead_timelines?.[s]}):null;i.set(s,{...yd(a,e,u),started_at:d,...j?{failure:j}:{},can_pause:u==="running"&&p,can_resume:w})}for(let[s,l]of Xg(e,t)){if(i.has(s))continue;let a=l.attempt,u=rr(n.discard_operations,s,{attempt_id:a.attempt_id}),d=Td(a),p=l.run_state==="provider_hold"?Vg(a,{provider_hold:n.provider_hold,auto_resume_pending:n.auto_resume_pending,account_catalog:n.account_catalog,attempts:e,history:n.bead_timelines?.[s]}):null;i.set(s,{...yd(a,e,l.run_state),started_at:typeof a.started_at=="number"?a.started_at:null,...l.run_state==="parked"?{failure:vd(a,{resume_eligible:!1,resume_reason:"\uC138\uC158 \uB300\uAE30 \u2014 [\uC7AC\uC2DC\uB3C4]\uAC00 \uC0C8 attempt\uB97C \uB744\uC6C1\uB2C8\uB2E4",confirmation:u.confirmation,history:n.bead_timelines?.[s]})}:{},...l.run_state==="waiting"?{wait:zg(a)}:{},...p?{hold:p}:{},...d?{retry:d}:{},can_pause:!1,can_resume:l.run_state==="provider_hold"})}return i}function yd(e,t,n){return{attempt_id:typeof e.attempt_id=="string"?e.attempt_id:"",run_state:n,last_event_at:typeof e.last_event_at=="number"?e.last_event_at:null,last_activity:e.last_activity&&typeof e.last_activity=="object"?e.last_activity:null,legs:Array.isArray(e.legs)?e.legs:[],runner:typeof e.runner=="string"?e.runner:null,model:typeof e.model=="string"?e.model:null,effort:typeof e.effort=="string"?e.effort:null,speed:typeof e.speed=="string"?e.speed:null,resumed_from:typeof e.resumed_from=="string"?e.resumed_from:null,continuation_mode:e.continuation_mode==="session"||e.continuation_mode==="fresh"?e.continuation_mode:null,status:typeof e.status=="string"?e.status:null,usage:tr(t,e.bead_id)}}function vd(e,t){let n=e.cause_detail&&typeof e.cause_detail=="object"?e.cause_detail:null;return{cause:typeof e.cause=="string"?e.cause:null,cause_detail:n,summary:n&&typeof n.summary=="string"?n.summary:null,bead_id:typeof e.bead_id=="string"?e.bead_id:"",finished_at:typeof e.finished_at=="number"?e.finished_at:null,runner:typeof e.runner=="string"?e.runner:null,model:typeof e.model=="string"?e.model:null,effort:typeof e.effort=="string"?e.effort:null,observed_effort:typeof e.observed_effort=="string"?e.observed_effort:null,speed:typeof e.speed=="string"?e.speed:null,attempt_id:typeof e.attempt_id=="string"?e.attempt_id:"",usage:e.usage&&typeof e.usage=="object"?e.usage:null,halted_auto_advance:e.halted_auto_advance===!0,quickfix_lane:e.quickfix_lane===!0,quickfix_landing:e.quickfix_landing&&typeof e.quickfix_landing=="object"?e.quickfix_landing:null,retry:Td(e),resume_eligible:t.resume_eligible,resume_reason:t.resume_reason,landed:sd(e),confirmation:t.confirmation,...Sd(t.history)}}function Sd(e){if(!e||typeof e!="object")return{};let t=Array.isArray(e.events)?e.events:[],n=[];for(let o of t)!o||typeof o!="object"||typeof o.summary!="string"||o.summary.length===0||n.push({event_id:typeof o.event_id=="string"?o.event_id:"",kind:typeof o.kind=="string"?o.kind:"",summary:o.summary,at:typeof o.at=="number"?o.at:null});n.reverse();let r=typeof e.log_path=="string"&&e.log_path.length>0?e.log_path:null;return{...n.length>0?{timeline:n}:{},...r===null?{}:{log_path:r},...e.log_expired===!0?{log_expired:!0}:{},...e.log_unreadable===!0?{log_unreadable:!0}:{}}}function zg(e){let t=e.cause_detail&&typeof e.cause_detail=="object"?e.cause_detail:null,n=Array.isArray(t?.blockers)?t.blockers:[],r=[];for(let o of n)!o||typeof o!="object"||typeof o.id!="string"||o.id.length===0||r.push({id:o.id,rig:typeof o.rig=="string"?o.rig:null,status:typeof o.status=="string"?o.status:""});return{summary:t&&typeof t.summary=="string"?t.summary:null,blockers:r,since:typeof e.finished_at=="number"?e.finished_at:null}}function Ed(e){return e?.status==="paused"&&typeof e.cause=="string"&&e.cause.startsWith("provider_outage:")}function Hg(e,t){let n=typeof e.runner=="string"?e.runner:"",r=tt(t)[n];return!r||!Array.isArray(r.targets)?null:r.targets.find(o=>Array.isArray(o?.attempt_ids)&&o.attempt_ids.includes(e.attempt_id))||null}function Kg(e,t){if(e===null)return null;let n=tt(t).claude;if(!Array.isArray(n))return null;let r=n.find(o=>o?.email===e);return r&&typeof r.alias=="string"&&r.alias.length>0?r.alias:null}function Gg(e,t){let n=e,r=new Set;for(;n&&!r.has(n.attempt_id);){if(r.add(n.attempt_id),n.auto_resume_kind==="provider_outage")return!0;n=typeof n.resumed_from=="string"?t[n.resumed_from]:null}return!1}function Yg(e,t,n,r){if((Array.isArray(r.auto_resume_pending)?r.auto_resume_pending:[]).some(s=>s?.attempt_id===e.attempt_id))return"pending";let i=e.auto_resume_refused;return typeof i=="string"&&i.length>0?`refused:${i}`:n.startsWith("auto_resume_disarmed:")||t?.auto_switch==="cap"||Gg(e,r.attempts)?"disarmed":null}function Vg(e,t){let n=e.cause.slice(16),r=e.cause_detail&&typeof e.cause_detail=="object"?e.cause_detail:null,o=Hg(e,t.provider_hold),i=typeof o?.model=="string"&&o.model.length>0?o.model:typeof e.model=="string"&&e.model.length>0?e.model:null,s=typeof o?.account=="string"&&o.account.length>0?o.account:typeof e.claude_account=="string"&&e.claude_account.length>0?e.claude_account:null,l=typeof o?.last_error=="string"?o.last_error:"",a=Yg(e,o,l,{auto_resume_pending:t.auto_resume_pending,attempts:t.attempts}),u=typeof o?.resets_at=="number"?o.resets_at:typeof r?.resets_at=="number"?r.resets_at:null,d=typeof o?.next_probe_at=="number"?o.next_probe_at:null,p=Kg(s,t.account_catalog),m=Sd(t.history);return{kind:o?.kind==="usage_limit"||n==="usage_limit"?"usage_limit":"outage",detail:n,...typeof r?.message=="string"?{message:r.message}:{},...typeof r?.summary=="string"?{summary:r.summary}:{},...i||s?{target:{...i?{model:i}:{},...s?{account:s}:{},...p?{account_alias:p}:{}}}:{},...u===null?{}:{resets_at:u},...a===null?{}:{auto_resume:a},...o?.auto_switch==="none"||o?.auto_switch==="disabled"?{auto_switch:o.auto_switch}:{},...d===null?{}:{next_probe_at:d},...m.log_path?{log_path:m.log_path}:{}}}function Td(e){let t=e&&e.retry&&typeof e.retry=="object"?e.retry:null;return t?{cause:typeof t.cause=="string"?t.cause:null,attempts:typeof t.attempts=="number"?t.attempts:0,max:typeof t.max=="number"?t.max:0,next_at:typeof t.next_at=="number"?t.next_at:null}:null}var Qg=new Set(["parked","retry_wait","waiting"]);function Xg(e,t){let n=Object.values(e||{}),r=new Set(n.map(s=>s?.resumed_from).filter(s=>typeof s=="string")),o=new Map;for(let s of n)s&&typeof s.bead_id=="string"&&nr(s)&&o.set(s.bead_id,s.attempt_id);let i=new Map;for(let s of n){let l=Ed(s);if(!s||typeof s.bead_id!="string"||s.bead_id.length===0||!nr(s)||!Qg.has(s.status)&&!l||o.get(s.bead_id)!==s.attempt_id||typeof s.dismissed_at=="number"||l&&r.has(s.attempt_id))continue;let a=t.get(s.bead_id);typeof a=="number"&&a>0&&typeof s.finished_at=="number"&&a>=s.finished_at||i.set(s.bead_id,{attempt:s,run_state:l?"provider_hold":s.status})}return i}function kd(e,t){let n=e[t];if(!n)return"";if(n.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let r=typeof n.reason=="string"?n.reason:"",o=r.indexOf(":");return o>0&&o<r.length-1?`\u26D4 ${r.slice(0,o)} (${r.slice(o+1)})`:`\u26D4 ${r}`}function tt(e){return e&&typeof e=="object"?e:{}}function Zg(e){let t=tt(e).badge_codes;return Array.isArray(t)?t.filter(n=>typeof n=="string"&&n.length>0):[]}function Jg(e,t,n){let r=tt(t);if(Object.keys(r).length===0)return null;let o=e.execution_defaults,i=e.runner_catalog,s=e.session_defaults;if(!o||!i||!s)return null;let l=m=>En({pin:m,global:s,execution_defaults:o,runner_catalog:i,route:n}),a,u;try{a=l(r),u=l(null)}catch{return null}let d=wd(_o(a,i),_o(u,i)),p=wd(Pr(a,null),Pr(u,null));return d||p?{orchestration:d,worker:p}:null}function wd(e,t){return!e||t&&t.text===e.text?null:e}function eh(e,t,n){let o=(t&&typeof t=="object"&&Array.isArray(t.released_by)?t.released_by:[]).filter(s=>s&&typeof s=="object"&&typeof s.id=="string").slice().sort((s,l)=>(typeof l.closed_at=="number"?l.closed_at:0)-(typeof s.closed_at=="number"?s.closed_at:0)),i=[];for(let s of o){let l=md(e,s,n);l&&i.push(l)}return i.length===0?null:i}function rl(e,t){return typeof e!="string"||e.length===0||typeof t!="string"||t.length===0||t===e?null:`\u2192 ${t}`}var th=new Set(["quick_fix","spec_backed","full_plan"]);function $d(e){return typeof e=="string"&&th.has(e)}function nh(e){let t={...tt(e.session_defaults)};for(let n of["orchestration_model","orchestration_effort","orchestration_speed","quick_fix_orchestration_model","quick_fix_orchestration_effort","quick_fix_orchestration_speed"]){let r=e[n];typeof r=="string"&&(t[n]=r)}return t}function rh(e,t,n){let r=e.runner_catalog??null,o=tl(e,t,n,null);if(!o)return null;let i=Dn(r,o.orchestration_model.value??""),s=i===null?o:tl(e,t,n,i)||o,l=_o(s,r),a=Pr(s,i);return l||a?{orchestration:l,worker:a}:null}function tl(e,t,n,r){let o=$d(n)?n:$d(t.route)?t.route:null;try{return En({pin:t,global:nh(e),execution_defaults:e.execution_defaults??null,runner_catalog:e.runner_catalog??null,route:o,controller_runtime:r})}catch{return null}}function oh(e,t,n){return!t||!Object.hasOwn(t,"metadata")?null:Pr(tl(e,tt(t.metadata),t.route,n),n)}function ol(e,t){let n=new Set,r=e;for(;r&&!n.has(r.attempt_id);){if(r.conflict_resolution===!0)return!0;n.add(r.attempt_id),r=typeof r.resumed_from=="string"&&r.resumed_from.length>0&&t.get(r.resumed_from)||null}return!1}function sh(e){let t={};for(let l of Kn)t[l]=0;let n=!1,r=0,o=0,i=0;for(let l of e){let a=l.usage;if(!a||typeof a!="object")continue;let u=!1;for(let d of Kn)Number.isFinite(a[d])&&(t[d]+=a[d],n=!0,u=!0);u&&(o+=1,Number.isFinite(a.total_cost_usd)&&(r+=a.total_cost_usd,i+=1))}o>0&&i===o&&(t.total_cost_usd=r);let s=e.map(l=>l.usage).filter(l=>l&&typeof l=="object"&&l.providers);return s.length>0?cn(Hs(s)):n?er(t):null}function Cd(e,t){let n=za(e,t);return n==="internal"?"\uBBF8\uC801\uC7AC":n==="external"?"\uC678\uBD80":"\uC704\uCE58 \uBBF8\uD655\uC778"}function ih(e,t,n){let r=t.get(e);if(!r)return Cd(e,n);if(typeof r.position=="number"){if(r.lane==="parallel")return`#${r.position}`;if(/^s[1-5]$/.test(r.lane))return`${r.lane} #${r.position}`}return Fo(r)}function ah(e,t,n,r){let o=t.get(e);if(!o)return{label:Cd(e,n),title:""};if(typeof o.position=="number"&&(o.lane==="parallel"||/^s[1-5]$/.test(o.lane))){let s=r.get(e),l=o.lane==="parallel"?"\uBCD1\uB82C":o.lane;return{label:s&&s.length>0?"\u{1F512} \uB300\uAE30":"\uB300\uAE30",title:`${o.workspace_name||o.root_dir} ${l} #${o.position}`}}return{label:o.state==="running"?"\u25B6 \uC2E4\uD589\uC911":Fo(o),title:""}}function lh(e,t){for(let n of Object.values(e||{}))if(n&&n.attempt_id===t&&typeof n.armed_by_lane=="string"&&n.armed_by_lane.length>0)return n.armed_by_lane;return null}function ch(e,t,n,r,o,i){return t==="draft"?{state:"draft",badge:"draft",run_label:null,can_stop:!1}:n.some(s=>i.failed_by_bead.get(s.id)===e)?{state:"failed",badge:"\u26D4 \uC2E4\uD328",run_label:"\u25B6 \uB2E4\uC2DC \uC9C4\uD589",can_stop:!1}:i.disarmed_lanes.has(e)?{state:"restart",badge:"\u23F8 \uC7AC\uC2DC\uC791",run_label:"\u25B6 \uC9C4\uD589",can_stop:!1}:n.some(s=>i.armed_by_bead.get(s.id)===e)?{state:"running",badge:"\u25B6 \uC9C4\uD589 \uC911",run_label:o.length>0?"\u25B6 \uC774\uC5B4\uC11C \uC9C4\uD589":null,can_stop:!0}:r?{state:"all_done",badge:"\uBAA8\uB450 \uC644\uB8CC",run_label:null,can_stop:!1}:{state:"confirmed",badge:"\uD655\uC815",run_label:"\u25B6 \uC9C4\uD589",can_stop:!1}}function uh(e,t,n,r,o,i,s){let l=[];return e.forEach((a,u)=>{let d=typeof a.id=="string"?a.id:"";if(d.length===0)return;let p=a.status==="confirmed"?"confirmed":"draft",m=Array.isArray(a.entries)?a.entries:[],_=[];m.forEach((U,se)=>{let W=U&&typeof U.bead_id=="string"?U.bead_id:"";if(W.length===0)return;let j=U&&typeof U.root_dir=="string"?U.root_dir:"",O=n.get(W),q=O?O.state:void 0,z=q==="running"||q==="pr_wait"||q==="done",Y=!O||q==="runnable",N=O&&O.lane==="parallel"&&typeof O.position=="number"?O.position-1:null,F=ah(W,n,r,t),H=_.length>0?_[_.length-1].id:null,G=p==="confirmed"&&H!==null&&!(t.get(W)||[]).includes(H);_.push({id:W,title:o.get(W)||W,root_dir:O?O.root_dir:j,workspace_name:O?O.workspace_name:i.get(j)||"",seq:se+1,location_label:F.label,location_title:F.title,draggable:!z,fixed:z,done:q==="done",unplaced:Y,mismatch:G,...N!==null?{queue_index:N}:{}})}),_.forEach((U,se)=>{U.seq=se+1});let w=_.length>0&&_.every(U=>U.done),R=_.filter(U=>!U.fixed&&s.armed_by_bead.get(U.id)!==d).map(U=>U.id),I=ch(d,p,_,w,R,s);l.push({lane_id:d,status:p,draft:p==="draft",number:u+1,label:`\uC5F0\uACB0 ${u+1} \xB7 \uB808\uD3EC \uAC04`,rows:_,all_done:w,can_confirm:p==="draft"&&_.length>=2,has_mismatch:p==="confirmed"&&_.some(U=>U.mismatch||U.unplaced),unlaunched:R,...I})}),l}function dh(e,t,n){if(e.lane==="runnable"){let s=n.get(e.id);return s?s.length===0?{scope:[],state:"missing"}:{scope:s,state:"declared"}:{scope:[],state:void 0}}let r=t.get(e.root_dir),o=r?r[e.id]:void 0;if(!o||!Array.isArray(o.scope))return{scope:[],state:void 0};let i=o.scope.filter(s=>typeof s=="string"&&s.length>0);return{scope:i,state:i.length===0?"missing":"declared"}}function ph(e,t,n,r,o){let i=new Map;for(let a of[...e.running,...e.queue,...e.runnable,...e.pr_wait]){if(!t.has(a.root_dir))continue;let u=`${a.root_dir}\0${a.id}`,d=i.get(u);if(d){d.cards.push(a);continue}let{scope:p,state:m}=dh(a,t,n);m!==void 0&&(a.scope_state=m),i.set(u,{cards:[a],scope:p})}let s=new Map;for(let a of i.values()){let u=a.cards[0].scope_state;if(u!==void 0)for(let m of a.cards)m.scope_state=u;if(a.scope.length===0)continue;let d=a.cards[0].root_dir,p=s.get(d);p?p.push(a):s.set(d,[a])}let l=(a,u,d)=>{let p=u.cards[0],m={id:p.id,title:p.title,location_label:ih(p.id,r,o),prefixes:d,...typeof p.root_dir=="string"&&p.root_dir.length>0?{root_dir:p.root_dir}:{}};for(let _ of a.cards)_.overlap_chips?_.overlap_chips.push(m):_.overlap_chips=[m]};for(let a of s.values())for(let u=0;u<a.length;u+=1)for(let d=u+1;d<a.length;d+=1){let p=ni(a[u].scope,a[d].scope);p.length!==0&&(l(a[u],a[d],p),l(a[d],a[u],p))}}function xd(e,t,n){let r=n?n.get(t)?.root_dir:void 0,o=!Zn(e.id,t),i=typeof e.root_dir=="string"?e.root_dir:"",s=typeof r=="string"&&r.length>0?r:o&&i.length>0?i:"";return s.length>0?{openable:!0,root_dir:s}:o?{openable:!0}:{}}function fh(e,t,n,r){let o=new Set(e?e.ids:[]);for(let l of t&&Array.isArray(t.ids)?t.ids:[])typeof l=="string"&&l.length>0&&o.add(l);if(o.size===0)return{ids:[]};let i={},s={...e?e.root_dirs:{},...t&&t.root_dirs&&typeof t.root_dirs=="object"?t.root_dirs:{}};for(let l of o){let a=s[l];if(typeof a=="string"&&a.length>0){i[l]=a;continue}if(!Zn(n.id,l)){n.root_dir.length>0&&(i[l]=n.root_dir);continue}let u=r.get(l)?.root_dir;typeof u=="string"&&u.length>0&&(i[l]=u)}return{ids:[...o],root_dirs:i}}function el(e){if(typeof e=="number")return Number.isFinite(e)?e:null;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:null}return null}function $i(e){if(typeof e=="number"&&Number.isFinite(e))return e;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:0}return 0}function _h(e){let t=typeof e=="string"?e.trim().toLowerCase():"";return t.length===0?null:n=>{let r=typeof n.id=="string"?n.id.toLowerCase():"",o=typeof n.title=="string"?n.title.toLowerCase():"";return r.includes(t)||o.includes(t)}}function mh(e,t){let n=[e.runnable,e.runnable_all,e.queue,e.running,e.pr_wait,e.done,e.parallel_rows];for(let o of e.runnable_sections)n.push(o.items);let r=[];for(let o of e.queue_groups){n.push(o.items,o.sublanes.parallel);for(let i of o.sublanes.serial)n.push(i.items),r.push(i.occupants)}for(let o of n)for(let i of o)i.search_match=t(i);for(let o of r)for(let i of o)i.search_match=t(i)}function br(e,t,n){let r=Array.isArray(e)?e:[],o=Array.isArray(t)?t:[],i=n&&typeof n.done_since=="number"?n.done_since:void 0,s={...bo,...n&&n.candidate_filter?n.candidate_filter:{}},l=n&&Object.hasOwn(n,"cross_lanes")?n.cross_lanes??null:void 0,a=n&&n.candidate_sort==="as_given"?"as_given":n&&Qo.some($=>$.value===n.candidate_sort)?n.candidate_sort:"repo_spec",u=n&&n.groups==="all"?"all":"nonempty",d=n&&n.candidate_hidden_counts==="per_control"?"per_control":"sequential",p=Date.now(),m=new Map;for(let $ of o)$&&typeof $.root_dir=="string"&&m.set($.root_dir,$);let _=new Map;for(let $ of o)$&&typeof $.root_dir=="string"&&_.set($.root_dir,$.name||$.root_dir);for(let $ of r)$&&typeof $.root_dir=="string"&&_.set($.root_dir,$.name||$.root_dir);let w=[],R=[],I=[],U=[],se=[],W=[],j=new Map,O=new Map,q=new Map,z=new Map,Y=new Map,N=new Map,F=new Map,H=new Map,G=new Map,ee=new Map,ye=new Map,qe=new Map,B=new Map,X=new Set,Se=new Map,Ee=new Map,C=new Map;for(let $ of r){if(!$||typeof $.root_dir!="string")continue;let J=$.root_dir,Re=$.name||J,je=m.get(J),Je=je&&typeof je.revision=="number"?je.revision:typeof $.revision=="number"?$.revision:0,et=tt($.attempts),Ue=tt($.bead_titles);for(let[f,g]of Object.entries(Ue))typeof g=="string"&&g.length>0&&C.set(f,g);let ct=tt($.bead_times),Gt=tt($.pr_observations),At=tt($.admission),kt=tt($.revise_parked),wt=tt($.merge_queue_state),jt=tt($.cleanup_failed),Lt=tt($.discard_operations),ae=tt($.bead_timelines),me=tt($.bead_blocked_by);Object.hasOwn($,"bead_scope")&&Se.set(J,tt($.bead_scope));let Ge=tt($.bead_workflow),lt=tt($.pr_activity),Oe=Array.isArray($.repo_operations)?$.repo_operations:[];H.set(J,Oe);let E=typeof $.declared_base=="string"?$.declared_base:null;F.set(J,E),N.set(J,Object.entries(jt).map(([f,g])=>({bead_id:f,step:g&&g.step?g.step:"",reason:g&&g.reason?g.reason:"",at:g&&typeof g.at=="number"?g.at:null,detail:g&&typeof g.detail=="string"?g.detail:null,output_tail:g&&typeof g.output_tail=="string"&&g.output_tail?g.output_tail:void 0,log_path:g&&typeof g.log_path=="string"&&g.log_path?g.log_path:void 0,retry_count:g&&typeof g.retry_count=="number"&&Number.isInteger(g.retry_count)&&g.retry_count>0?g.retry_count:0,failure_code:g&&typeof g.failure_code=="string"?g.failure_code:void 0})));for(let[f,g]of Object.entries(tt($.bead_overlay)))g&&typeof g=="object"&&G.set(`${J}\0${f}`,g);let L=new Map;for(let f of Object.values(et))f&&typeof f.attempt_id=="string"&&L.set(f.attempt_id,f);let Z=Array.isArray($.merge_queue)?$.merge_queue:[],pe=new Set(Z.filter(f=>f&&typeof f.bead_id=="string").map(f=>f.bead_id)),fe=new Map(Z.filter(f=>f&&typeof f.bead_id=="string").map(f=>[f.bead_id,f])),Pe=new Map,ht=new Map,$t=new Map,gt=new Map;Z.forEach((f,g)=>{f&&typeof f.bead_id=="string"&&(Pe.set(f.bead_id,g+1),ht.set(f.bead_id,f.resolution),$t.set(f.bead_id,f.continuation_action||null),gt.set(f.bead_id,f.authority||null))});let Bt=tt($.auto_merge_skips),bt=f=>{let g=Bt[f];if(!g)return null;let M=tt(tt(Gt[f]).pr).head_sha;return M&&M===g.head_sha?g.reason||"":null};Y.set(J,{positions:Pe,resolutions:ht,continuations:$t,authorities:gt,state:{active:typeof wt.active=="string"?wt.active:null,failures:tt(wt.failures),waiting:wt.waiting&&typeof wt.waiting.bead_id=="string"&&typeof wt.waiting.reason=="string"?wt.waiting:null},auto_excluded:(Array.isArray($.pr_wait)?$.pr_wait:[]).map(f=>f&&f.bead_id).filter(f=>typeof f=="string"&&bt(f)!==null),running:Z.length>0});let Ct=Array.isArray($.queue)?$.queue:[];for(let f of[...Ct,...Array.isArray($.pr_wait)?$.pr_wait:[]])f&&typeof f.bead_id=="string"&&typeof f.armed_by_lane=="string"&&f.armed_by_lane.length>0&&qe.set(f.bead_id,f.armed_by_lane);for(let f of Array.isArray($.disarmed_on_load)?$.disarmed_on_load:[])typeof f=="string"&&f.length>0&&X.add(f);let Rt=(Array.isArray($.serial_lanes)?$.serial_lanes:[]).filter(f=>f&&/^s[1-5]$/.test(f.id)&&Array.isArray(f.entries)),en=tt($.lane_states),Yt=typeof $.serial_lane_count=="number"?Math.max(0,Math.min(5,Math.floor($.serial_lane_count))):Math.min(5,Rt.length);q.set(J,Yt),z.set(J,Ct.length);let Dt=new Map(Rt.map(f=>[f.id,f])),xt=new Map;for(let f of Rt)for(let g of f.entries)g&&typeof g.bead_id=="string"&&xt.set(g.bead_id,f.id);for(let[f,g]of Object.entries(tt($.bead_dependents))){let M=Array.isArray(g?.ids)?g.ids:[],Q=tt(g?.root_dirs),ne=ye.get(f)||{ids:new Set,root_dirs:{}};for(let ue of M)typeof ue=="string"&&ue.length>0&&ne.ids.add(ue);for(let[ue,ut]of Object.entries(Q))typeof ut=="string"&&ut.length>0&&(ne.root_dirs[ue]=ut);ye.set(f,ne)}for(let[f,g]of Object.entries(me))Array.isArray(g)&&ee.set(f,g.filter(M=>typeof M=="string"&&M.length>0));let Ht=Array.isArray($.done)?$.done:[];for(let f of Ht)f&&typeof f.bead_id=="string"&&W.push({id:f.bead_id,root_dir:J,workspace_name:Re});let nn=new Map;for(let f of Ht)f&&typeof f.bead_id=="string"&&typeof f.added_at=="number"&&nn.set(f.bead_id,f.added_at);let Ut=f=>({id:f,title:Ue[f]||f,root_dir:J,workspace_name:Re,expected_revision:Je,draggable:!1,...tt(ct[f]).created_at?{created_at:tt(ct[f]).created_at}:{},...tt(ct[f]).updated_at?{updated_at:tt(ct[f]).updated_at}:{}}),an=f=>{let g=Ge[f]?.chips?.pr;return g&&typeof g.number=="number"&&typeof g.url=="string"?{pr_number:g.number,pr_url:g.url}:{}},Zt=f=>Object.hasOwn(me,f)?{blocked_by:Array.isArray(me[f])?me[f].filter(g=>typeof g=="string"&&g.length>0):[]}:{},xe=(f,g)=>{let M=Zt(f),Q=(g?.blockers||[]).map(ue=>ue.id);if(Q.length===0)return M;let ne=[...M.blocked_by||[]];for(let ue of Q)ne.includes(ue)||ne.push(ue);return{blocked_by:ne}},A=new Set;for(let[f,g]of Ad(et,nn,{discard_operations:Lt,observations:Gt,bead_timelines:ae,provider_hold:tt($.provider_hold),auto_resume_pending:Array.isArray($.auto_resume_pending)?$.auto_resume_pending:[],account_catalog:tt($.account_catalog)})){A.add(f);let M=g.run_state==="failed"?lh(et,g.attempt_id):null;M!==null&&B.set(f,M);let Q=L.get(g.attempt_id)||null,ne=G.get(`${J}\0${f}`),ue=ne&&ne.rollup?ne.rollup:null,ut=rl(E,Q?Q.target_base:null),mt=Q?ol(Q,L):!1,pt=Q&&Q.quickfix_lane===!0&&Q.quickfix_landing&&typeof Q.quickfix_landing=="object"?Q.quickfix_landing:null,Mt=pt&&typeof pt.reason=="string"&&pt.reason.length>0?pt.reason:null,S=pt?Vo({bead_id:f,merge_sha:pt.head_sha,cleanup_cursor:pt.cursor,cleanup_failed:Mt?{step:pt.cursor,reason:Mt}:null,repo_operations:Oe}):null;R.push({...Ut(f),lane:"running",...xe(f,g.wait),...xt.has(f)?{serial_lane_id:xt.get(f)}:{},attempt_id:g.attempt_id,run_state:g.run_state,status:g.status||void 0,workflow:Ge[f]||null,can_pause:g.can_pause,can_resume:g.can_resume,started_at:g.started_at,last_event_at:g.last_event_at,last_activity:g.last_activity,legs:g.legs,runner:g.runner,model:g.model,effort:g.effort,speed:g.speed,resumed_from:g.resumed_from,continuation_mode:g.continuation_mode,usage:g.usage,failure:g.failure||null,hold:g.hold||null,wait:g.wait||null,retry:g.retry||null,exec_chips:{orchestration:Fa(g),worker:oh(tt(je),ne,g.runner||null)},discard:rr(Lt,f,{attempt_id:g.attempt_id,merged:g.failure?.confirmation==="merged"||tt(Gt[f]).pr?.state==="MERGED"}),...ue?{rollup:ue}:{},...mt?{conflict_resolution:!0}:{},...ut?{base_exception:ut}:{},...S?{landing:S}:{},badges:g.run_state==="paused"?["\u23F8 \uC77C\uC2DC\uC815\uC9C0"]:g.run_state==="failed"?["\u26A0 \uC2E4\uD328"]:g.run_state==="parked"?["\u23F8 \uC138\uC158 \uB300\uAE30"]:g.run_state==="retry_wait"?["\u21BB \uC7AC\uC2DC\uB3C4 \uB300\uAE30"]:g.run_state==="waiting"?["\u26D3 \uC120\uD589 \uB300\uAE30"]:g.run_state==="provider_hold"?["\uACF5\uAE09\uC790 \uBCF4\uB958"]:[],alert:g.run_state==="failed"})}for(let[f,g]of vu(et)){if(R.some(Q=>Q.id===f))continue;let M=g.attempt;R.push({...Ut(f),lane:"running",kind:"session",...Zt(f),attempt_id:typeof M.attempt_id=="string"?M.attempt_id:"",run_state:"running",status:"running",non_occupying:!0,workflow:Ge[f]||null,can_pause:!1,can_resume:!1,started_at:g.started_at,last_event_at:typeof M.last_event_at=="number"?M.last_event_at:null,last_activity:M.last_activity&&typeof M.last_activity=="object"?M.last_activity:null,legs:Array.isArray(M.legs)?M.legs:[],runner:typeof M.runner=="string"?M.runner:null,model:typeof M.model=="string"?M.model:null,effort:typeof M.effort=="string"?M.effort:null,speed:typeof M.speed=="string"?M.speed:null,resumed_from:null,continuation_mode:null,usage:M.usage&&typeof M.usage=="object"?M.usage:null,exec_chips:{orchestration:Fa(M),worker:null},discard:rr(Lt,f,{merge_queued:!0}),badges:[g.origin==="auto"?"\uB9AC\uBDF0 \xB7 \uC790\uB3D9":"\uB9AC\uBDF0"],alert:!1})}for(let f of Array.isArray($.session_active)?$.session_active:[]){let g=f&&f.bead_id;typeof g!="string"||A.has(g)||(A.add(g),Array.isArray(f.blocked_by)&&f.blocked_by.length>0&&ee.set(g,f.blocked_by.filter(M=>typeof M=="string"&&M.length>0)),typeof f.title=="string"&&f.title.length>0&&C.set(g,f.title),R.push({...Ut(g),title:f.title||Ue[g]||g,lane:"running",kind:"session",status:"in_progress",started_at:el(f.started_at)??el(f.updated_at)??void 0,updated_at:el(f.updated_at)??void 0,workflow:f.workflow||null,labels:Array.isArray(f.labels)?f.labels:[],spec_id:typeof f.spec_id=="string"?f.spec_id:"",blocked:f.blocked===!0,...Array.isArray(f.blocked_by)?{blocked_by:f.blocked_by.filter(M=>typeof M=="string"&&M.length>0)}:{},draggable:!1,can_pause:!1,can_resume:!1,exec_chips:null,usage:null,legs:[],last_activity:null,session_refs:Array.isArray(f.session_refs)?f.session_refs:[],badges:[],alert:!1}))}for(let f of Array.isArray($.pr_wait)?$.pr_wait:[]){let g=f&&f.bead_id;if(typeof g!="string"||A.has(g))continue;A.add(g);let M=tt(Gt[g]),Q=tt(M.pr),ne=M.gate?tt(M.gate):null,ue=pe.has(g),ut=fe.get(g)?.continuation_action||null,mt=!!ut&&ut.continuation===null,pt=wt.active===g,Mt=f.external===!0,S=jt[g]||null,x=tt(lt[g]),Ae=Vo({bead_id:g,merge_sha:f.merge_sha,cleanup_cursor:f.cleanup_cursor,merge_progress:x.merge_progress||null,cleanup_failed:S,repo_operations:Oe}),We=wi(Ae),rt=!!ne&&ne.base_badge==="\uCDA9\uB3CC",yt=!!S&&["post_merge_jobs","child_sweep","branch_cleanup","parent_close"].includes(S.step)&&!!ne&&ne.tier==="merged",Kt=Mt&&!!S&&!!ne&&ne.tier==="merged",zr=!!ne&&["closed_unmerged","review","undecidable"].includes(ne.tier),kn=rr(Lt,g,{external:Mt,merge_active:pt||Ae?.step==="merge",merge_queued:ue,cleanup_active:We,merged:!!S||ne?.tier==="merged"}),lr=!!kn.operation,Ar=Zg(M.receipt_check);I.push({...Ut(g),lane:"pr_wait",...Zt(g),...Ar.length>0?{receipt_badge:{codes:Ar}}:{},workflow:Ge[g]||null,pr_number:typeof Q.number=="number"?Q.number:null,pr_url:typeof Q.url=="string"?Q.url:void 0,external:Mt,usage:tr(et,g),merge_step:Ae,badges:mt?["\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694"]:Ae?[ne?.tier==="merged"?"\uBA38\uC9C0\uB428":"\uBA38\uC9C0 \uC911"]:S?[Nr(S.step)?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${Nr(S.step)}`:"\uC815\uB9AC \uBA48\uCDA4"]:typeof ne?.gate_badge=="string"&&ne.gate_badge.length>0?[ne.gate_badge]:[],alert:Ae?Ae.failed===!0:!!S||zr,reason:S&&Ae?.active!==!0?ki(S.step):"PR \uB300\uAE30",merge_action:ne?.tier==="merged"&&!yt&&!Kt?!1:!ue||mt,merge_enabled:!lr&&(mt||ne?.enabled===!0||rt||yt||Kt),merge_label:mt?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":Kt||yt?"\uC815\uB9AC \uC7AC\uC2DC\uB3C4":rt&&!yt?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":void 0,merge_title:mt?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":lr?kn.error?`\uD3D0\uAE30 \uC2E4\uD328: ${kn.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${kn.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:Kt?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uB2E4\uC2DC \uC2DC\uB3C4\uD569\uB2C8\uB2E4":yt?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC2DC\uB3C4\uD569\uB2C8\uB2E4":rt?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":ne?.enabled===!0?`\uBA38\uC9C0 (${ne.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4`:`\uBA38\uC9C0 \uBD88\uAC00: ${ne?.reason||"\uAD00\uCE21 \uB300\uAE30"}`,cancel_action:ue&&!mt,cancel_enabled:!pt,continuation_mismatch:ut?.mismatch||null,discard:kn,discard_action:kn.action,discard_enabled:kn.enabled,discard_title:kn.title})}let ge=(f,g,M,Q)=>{let ne=f&&f.bead_id;if(typeof ne!="string"||A.has(ne))return null;A.add(ne);let ue=kt[ne],ut=rr(Lt,ne),mt=ut.operation?ut:null,pt={...Ut(ne),lane:g,workflow:Ge[ne]||null,draggable:!mt,discard:mt||void 0,reason:kd(At,ne),seq:M+1,queue_position:M+1,queue_index:M,queue_length:Q,badges:ue?["\u23F8 REVISE \uD30C\uD0B9"]:[],alert:!!ue,revise_action:!!ue,revise_enabled:!!ue&&!mt,revise_title:ue?ue.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${ue.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":""},Mt=Zt(ne);return Object.hasOwn(Mt,"blocked_by")&&(pt.blocked_by=Mt.blocked_by),pt};for(let f=0;f<Ct.length;f++){let g=ge(Ct[f],"queue",f,Ct.length);if(!g)continue;U.push(g);let M=j.get(J);M?M.push(g):j.set(J,[g])}let Ne=f=>{let g=I.find(ue=>ue.id===f&&ue.root_dir===J);if(g)return{id:f,title:g.title,badge:"PR \uB300\uAE30 \xB7 \uC810\uC720"};let M=R.find(ue=>ue.id===f&&ue.root_dir===J),Q=M?M.run_state:Ug(et,f),ne=Q==="failed"||Q==="orphaned"?"\uC2E4\uD328 \xB7 \uC810\uC720 \uC720\uC9C0":Q==="paused"?"\uC77C\uC2DC\uC815\uC9C0 \xB7 \uC810\uC720":"\uC2E4\uD589 \uC911 \xB7 \uC810\uC720";return{id:f,title:M?M.title:Ut(f).title,badge:ne}},y=[];for(let f=0;f<Math.max(Yt,Rt.length);f++){let g=`s${f+1}`,M=Dt.get(g),Q=M&&Array.isArray(M.entries)?M.entries:[],ne=tt(en[g]),ue=Array.isArray(ne.occupied_by)?ne.occupied_by.filter(pt=>typeof pt=="string"):[],ut=new Set(ue),mt=[];for(let pt=0;pt<Q.length;pt++){let Mt=Q[pt]&&Q[pt].bead_id;if(typeof Mt=="string"&&ut.has(Mt)){A.add(Mt);continue}let S=ge(Q[pt],g,pt,Q.length);S&&(mt.push(S),U.push(S))}mt.length===0&&ue.length===0&&(Yt<=1||f>=Yt)||y.push({id:g,index:f,items:mt,raw_length:Q.length,occupied_by:ue,occupants:ue.map(pt=>Ne(pt)),corrections:Array.isArray(ne.corrections)?ne.corrections.length:0,cycle:ne.cycle===!0,...mt.length===0&&ue.length===0?{empty:!0}:{}})}O.set(J,y);let v=Array.from({length:Yt},(f,g)=>{let M=`s${g+1}`,Q=Dt.get(M),ne=Q&&Array.isArray(Q.entries)?Q.entries:[],ue=tt(en[M]);return{id:M,index:ne.length,length:ne.length,occupied_by:Array.isArray(ue.occupied_by)?ue.occupied_by.filter(ut=>typeof ut=="string"):[]}});for(let f of Array.isArray($.runnable)?$.runnable:[]){let g=f&&f.bead_id;if(typeof g!="string"||A.has(g))continue;A.add(g);let M=f.workflow&&typeof f.workflow=="object"?f.workflow:null,Q=M&&typeof M.route=="string"&&M.route||(typeof f.route=="string"?f.route:null),ne=Jg(tt(je),f.exec_pins,Q),ue=jo(f.rec,f.exec_pins);Array.isArray(f.blocked_by)&&f.blocked_by.length>0&&ee.set(g,f.blocked_by.filter(Ae=>typeof Ae=="string"&&Ae.length>0)),typeof f.title=="string"&&f.title.length>0&&C.set(g,f.title),Array.isArray(f.scope)&&Ee.set(g,f.scope.filter(Ae=>typeof Ae=="string"&&Ae.length>0));let ut=f.eligible!==!1,mt=f.worker_ineligible===!0,pt=Object.hasOwn(f,"eligible"),Mt=[];typeof f.reason=="string"&&f.reason.length>0&&Mt.push(f.reason);let S=kd(At,g);S&&Mt.push(S);let x=eh(g,f.release_info,p)?.map(Ae=>({...Ae,...xd({id:g,root_dir:J},Ae.id)}));w.push({...Ut(g),title:f.title||Ue[g]||g,lane:"runnable",draggable:!pt,queue_placeable:ut&&!mt,...mt?{worker_ineligible:!0}:{},...f.session_preferred===!0?{session_preferred:!0,session_preferred_reason:typeof f.session_preferred_reason=="string"?f.session_preferred_reason:""}:{},...f.spec_after_blocker===!0?{spec_after_blocker:!0}:{},...x?{dependency_chips:{released:x}}:{},...f.dependents_info&&typeof f.dependents_info=="object"?{dependents_info:f.dependents_info}:{},reason:Mt.join(" \xB7 "),created_at:f.created_at??void 0,updated_at:f.updated_at??void 0,status:typeof f.status=="string"?f.status:void 0,labels:Array.isArray(f.labels)?f.labels:[],spec_id:typeof f.spec_id=="string"?f.spec_id:"",published:f.published===!0,workflow:M||(Q?{route:Q,chips:{route:Q}}:null),...ne?{exec_chips:ne}:{},...ue?{rec:ue}:{},blocked:f.blocked===!0,...Array.isArray(f.blocked_by)?{blocked_by:f.blocked_by.filter(Ae=>typeof Ae=="string"&&Ae.length>0)}:{},place_index:Ct.length,place_lanes:v})}for(let f of Ht){let g=f&&f.bead_id;if(typeof g!="string"||A.has(g)||(A.add(g),i!==void 0&&typeof f.added_at=="number"&&f.added_at<i))continue;let M=Wg(et,g),Q=M&&typeof M.done_kind=="string"?M.done_kind:null;se.push({...Ut(g),lane:"done",done:!0,done_layout:"three_line",usage:tr(et,g),work_ms:nd(et,g),done_at:typeof f.added_at=="number"?f.added_at:void 0,done_kind:Q,...an(g),badges:[...Q&&bd[Q]?[bd[Q]]:[],...ed(et,g)]})}for(let f of Array.isArray($.session_done)?$.session_done:[]){let g=f&&(f.id||f.bead_id);typeof g!="string"||A.has(g)||(A.add(g),se.push({...Ut(g),...f,id:g,root_dir:J,workspace_name:Re,expected_revision:Je,lane:"done",done:!0}))}}if(G.size>0)for(let $ of[...w,...U,...R,...I,...se]){let J=G.get(`${$.root_dir}\0${$.id}`);if(!J||(typeof J.priority=="number"&&($.priority=J.priority),typeof J.from_id=="string"&&J.from_id.length>0&&($.from_id=J.from_id),$.lane==="done"&&Array.isArray(J.carried_to)&&J.carried_to.length>0&&($.carried_to=J.carried_to),!Object.hasOwn(J,"metadata")))continue;let Re=tt(J.metadata);if($.rec=jo(Re),$.lane==="runnable"||$.lane.startsWith("s")||$.lane==="queue"){let je=rh(tt(m.get($.root_dir)),Re,typeof J.route=="string"&&J.route.length>0?J.route:tt($.workflow).route);je&&($.exec_chips=je)}}let re=new Map;o.forEach(($,J)=>{$&&typeof $.root_dir=="string"&&re.set($.root_dir,J)});let ke=n&&n.running_sort==="repo"?"repo":"started";R.sort(($,J)=>{let Re=$.kind==="session",je=J.kind==="session";if(Re!==je)return Re?1:-1;if(Re&&je){let Ue=$i(J.updated_at)-$i($.updated_at);return Ue!==0?Ue:$.id.localeCompare(J.id)}if(ke==="repo"){let Ue=re.get($.root_dir)??Number.MAX_SAFE_INTEGER,ct=re.get(J.root_dir)??Number.MAX_SAFE_INTEGER;if(Ue!==ct)return Ue-ct}let Je=typeof $.started_at=="number"&&Number.isFinite($.started_at)?$.started_at:null,et=typeof J.started_at=="number"&&Number.isFinite(J.started_at)?J.started_at:null;return Je!==null&&et!==null&&Je!==et?Je-et:Je===null&&et!==null?1:Je!==null&&et===null?-1:$.id.localeCompare(J.id)}),se.sort(($,J)=>(J.done_at??0)-($.done_at??0));let ve=o.length>0?o:r.map($=>({root_dir:$&&$.root_dir,name:$&&$.name,auto_advance:$&&$.auto_advance,auto_merge:$&&$.auto_merge,slots:$&&$.slots,revision:$&&$.revision,runner_catalog:$&&$.runner_catalog})),Me=new Set(w.map($=>$.root_dir)),he=new Map;for(let $ of R)$.kind==="session"||$.run_state!=="running"||he.set($.root_dir,(he.get($.root_dir)||0)+1);let Le=new Map;for(let $ of se){let J=Le.get($.root_dir);J?J.push($):Le.set($.root_dir,[$])}let Xe={positions:new Map,resolutions:new Map,continuations:new Map,authorities:new Map,state:{active:null,failures:{},waiting:null},auto_excluded:[],running:!1},it=[];for(let $ of ve){if(!$||typeof $.root_dir!="string")continue;let J=j.get($.root_dir)||[],Re=O.get($.root_dir)||[],je=J.length>0||Re.some(Ue=>Ue.items.length>0||Ue.occupied_by.length>0);if(u!=="all"&&!je&&!Me.has($.root_dir))continue;let Je=typeof $.slots=="number"&&$.slots>=xi?$.slots:xi,et=he.get($.root_dir)||0;it.push({live_count:et,over_cap:et>Je,merge:Y.get($.root_dir)||Xe,token_total:sh(Le.get($.root_dir)||[]),cleanup_failures:N.get($.root_dir)||[],declared_base:F.get($.root_dir)??null,repo_operations:H.get($.root_dir)||[],root_dir:$.root_dir,name:$.name||$.root_dir,auto_advance:$.auto_advance===!0,auto_merge:$.auto_merge===!0,slots:Je,revision:typeof $.revision=="number"?$.revision:0,runner_catalog:tt($.runner_catalog),items:J,sublanes:{parallel:J,serial:Re},serial_lane_count:q.get($.root_dir)||0,raw_queue_length:z.get($.root_dir)||0})}let P={runnable:w,runnable_all:w,runnable_hidden:{blocked:0,spec:0},runnable_sections:[],runnable_flat:a==="updated_flat"||a==="as_given",queue:U,queue_groups:it,running:R,pr_wait:I,done:se,parallel_rows:[],chain_lanes:[],cross_lanes_revision:l&&typeof l.revision=="number"?l.revision:null,cross_lanes_unreadable:l===null,parallel_raw_length:Object.fromEntries(z),owner_of:{}},ce=Uu(P);for(let $ of W)ce.has($.id)||ce.set($.id,{root_dir:$.root_dir,workspace_name:$.workspace_name,lane:"done",state:"done"});for(let $ of[...P.queue,...P.runnable,...P.running,...P.pr_wait]){if(!Object.hasOwn($,"blocked_by"))continue;let J=ce.get($.id);$.blockers=($.blocked_by||[]).map(Re=>Wu(Re,J,ce,o))}for(let $ of[...P.queue,...P.runnable,...P.running,...P.pr_wait]){let J=($.blockers||[]).map(Je=>({...Ja($.id,Je),...xd($,Je.id,ce)})),Re=gd($.id,fh(ye.get($.id),$.dependents_info,$,ce));if(J.length===0&&Re.length===0)continue;let je={...$.dependency_chips||{},...J.length>0?{predecessors:J}:{},...Re.length>0?{dependents:Re}:{}};$.dependency_chips=je}ph(P,Se,Ee,ce,o);let ie=zu(P.queue_groups);for(let $ of P.queue_groups)for(let J of $.sublanes.serial){let Re=ie.get(Hu($.root_dir,J.id));Re&&(J.cross_wait_peers=Re)}P.chain_lanes=uh(l&&Array.isArray(l.lanes)?l.lanes:[],ee,ce,o,C,_,{armed_by_bead:qe,failed_by_bead:B,disarmed_lanes:X});let de=new Map;for(let $ of[...P.queue,...P.runnable])de.has($.id)||de.set($.id,$);let Te=new Set;for(let $ of P.chain_lanes)for(let J of $.rows){if($.status==="confirmed"&&!J.unplaced&&!J.fixed&&Te.add(J.id),!$.draft&&!J.unplaced)continue;let Re=de.get(J.id);Re&&(Re.cross_lane_chip={lane_id:$.lane_id,number:$.number,status:$.status,label:$.draft?`\uC5F0\uACB0 ${$.number} (draft)`:`\uC5F0\uACB0 ${$.number}`})}let _e=new Map(P.chain_lanes.map($=>[$.lane_id,$.number]));for(let $ of[...P.queue,...P.running]){let J=qe.get($.id);if(typeof J!="string"||J.length===0)continue;let Re=_e.get(J);$.armed_lane_chip=Re===void 0?{lane_id:J,label:"\u25B6 \uC9C4\uD589 \uC911 \xB7 \uB808\uC778 \uC5C6\uC74C",orphan:!0}:{lane_id:J,label:`\u25B6 \uC5F0\uACB0 ${Re}`,orphan:!1}}let De=[];for(let $ of j.values())for(let J of $)Te.has(J.id)||De.push(J);De.sort(($,J)=>{let Re=$.workspace_name.localeCompare(J.workspace_name);return Re!==0?Re:($.queue_index??0)-(J.queue_index??0)}),P.parallel_rows=De;let Be={};for(let[$,J]of ce)typeof J.root_dir=="string"&&J.root_dir.length>0&&(Be[$]=J.root_dir);for(let $ of P.chain_lanes)for(let J of $.rows)!Object.hasOwn(Be,J.id)&&J.root_dir.length>0&&_.has(J.root_dir)&&(Be[J.id]=J.root_dir);P.owner_of=Be;let Qe=P.runnable.length;P.runnable_all=P.runnable.slice();let Fe=P.runnable,te=$=>s.show_blocked||$.blocked!==!0,V=$=>s.spec==="all"||(s.spec==="with"?$.published===!0:$.published!==!0);if(d==="per_control"){let $=[],J=0,Re=0;for(let je of Fe){let Je=te(je),et=V(je);Je&&et?$.push(je):!Je&&et?J+=1:Je&&!et&&(Re+=1)}Fe=$,P.runnable_hidden={blocked:J,spec:Re}}else{Fe=Fe.filter(te);let $=Fe.length;Fe=Fe.filter(V),P.runnable_hidden={blocked:Qe-$,spec:$-Fe.length}}let $e=($,J)=>{let Re=$i(J.updated_at)-$i($.updated_at);return Re!==0?Re:$.id.localeCompare(J.id)},at=a==="repo_spec"?($,J)=>{let Re=$.published===!0?0:1,je=J.published===!0?0:1;return Re!==je?Re-je:$e($,J)}:$e;if(a==="as_given")P.runnable=Fe,P.runnable_sections=[];else if(a==="updated_flat")P.runnable=Fe.slice().sort($e),P.runnable_sections=[];else{let $=new Map;for(let je of Fe){let Je=$.get(je.root_dir);Je?Je.push(je):$.set(je.root_dir,[je])}let J=[],Re=[];for(let je of ve){if(!je||typeof je.root_dir!="string")continue;let Je=($.get(je.root_dir)||[]).slice().sort(at);$.delete(je.root_dir),Je.length!==0&&(J.push({root_dir:je.root_dir,name:je.name||je.root_dir,items:Je.map(et=>({...et,workspace_name:""}))}),Re.push(...Je))}for(let[je,Je]of $){let et=Je.slice().sort(at);J.push({root_dir:je,name:et[0]?.workspace_name||je,items:et.map(Ue=>({...Ue,workspace_name:""}))}),Re.push(...et)}P.runnable=Re,P.runnable_sections=J}let Ke=_h(n?n.search:void 0);return Ke&&mh(P,Ke),P}function Rd(e,t){let n=new Map(e.map((a,u)=>[a,u])),r=new Map(e.map(a=>[a,new Set]));for(let a of t)a.blocker!==a.blockee&&n.has(a.blocker)&&n.has(a.blockee)&&r.get(a.blockee).add(a.blocker);let o=new Set,i=[];for(;i.length<e.length;){let a=e.find(u=>{if(o.has(u))return!1;for(let d of r.get(u))if(!o.has(d))return!1;return!0});if(a===void 0)return{order:[...e],corrections:[],cycle:!0};o.add(a),i.push(a)}let s=[],l=new Map(i.map((a,u)=>[a,u]));for(let a of i){let u=null;for(let d of r.get(a)){let p=Number(n.get(a))<Number(n.get(d)),m=Number(l.get(a))>Number(l.get(d));p&&m&&(u===null||Number(l.get(d))>Number(l.get(u)))&&(u=d)}u!==null&&s.push({bead_id:a,after:u})}return{order:i,corrections:s,cycle:!1}}var gh="\uB2E4\uB978 \uB808\uD3EC \uC774\uC288\uB294 \uC774 \uC9C1\uB82C \uB808\uC778\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",Si="\uC758\uC874 \uC790\uB8CC \uBBF8\uD655\uC815 \u2014 \uAD50\uC815 \uBCF4\uB958",hh="Worker \uD0ED \uC9C1\uB82C \uB808\uC778\uC5D0\uC11C \uBA3C\uC800 \uBE7C \uC8FC\uC138\uC694",bh="\uC774\uBBF8 \uC9C4\uD589 \uC911\uC778 \uC774\uC288 \uC55E\uC5D0\uB294 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",yo="\uC5F0\uACB0 \uB808\uC778\uC774 \uC5C6\uC2B5\uB2C8\uB2E4";function Xo(e,t){return`${e}\0${t}`}function yh(e,t){let n=new Set(e),r=new Map;for(let o of e){let i=t.placed_members.has(o)?t.snapshot_blocked_by:t.runnable_blocked_by,s=i instanceof Map?i.get(o):void 0;if(!Array.isArray(s))return null;r.set(o,s.filter(l=>l!==o&&n.has(l)))}return r}function vh(e,t){if(e.status!=="confirmed")return 0;let n=-1;return e.entries.forEach((r,o)=>{t.fixed_members.has(r.bead_id)&&(n=o)}),n+1}function es(e,t){let n=e.entries,r=n.map(p=>p.bead_id),o=yh(r,t);if(o===null)return{entries:n,corrections:[],cycle:!1,held:!0,mismatched:[]};let i=[];for(let[p,m]of o)for(let _ of m)i.push({blocker:_,blockee:p});let s=vh(e,t),l=new Map(r.map((p,m)=>[p,m])),a=r.slice(0,s).filter(p=>o.get(p).some(m=>Number(l.get(m))>Number(l.get(p)))),u=Rd(r.slice(s),i);if(u.cycle)return{entries:n,corrections:[],cycle:!0,held:!1,mismatched:a};let d=new Map(n.map(p=>[p.bead_id,p]));return{entries:[...n.slice(0,s),...u.order.map(p=>d.get(p))],corrections:u.corrections,cycle:!1,held:!1,mismatched:a}}function Od(e,t){let n=t.cross_lanes.get(e);return n===void 0?null:es(n,t)}function kh(e,t){if(!(t.corrections.length===0&&!t.cycle&&!t.held&&t.mismatched.length===0))return{lane_id:e,corrected:t.corrections.length,cycle:t.cycle,held:t.held,mismatched:t.mismatched}}function wh(e){return`${e}\uC758 \uB808\uD3EC\uB97C \uC54C \uC218 \uC5C6\uC5B4 \uC758\uC874\uC744 \uBC14\uAFC0 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4`}function $h(e){let t=new Map;for(let[n,r]of e)t.set(n,r.slice());return t}function sl(e,t,n){let r=new Set([t]),o=[t];for(;o.length>0;){let i=o.pop();for(let s of e.get(i)||[]){if(s===n)return!0;r.has(s)||(r.add(s),o.push(s))}}return!1}function xh(e,t){let n=new Set;for(let[s,l]of t)for(let a of l)n.add(Xo(s,a));let r=new Map,o=new Map;for(let s of e){let l=Xo(s.a,s.b);r.set(l,s),o.set(l,s.type==="dep-add")}let i=[];for(let s of e){let l=Xo(s.a,s.b);r.get(l)===s&&o.get(l)!==n.has(l)&&i.push(s)}return i}function Ah(e,t,n){let r=e.parallel_rows,o=Math.max(0,Math.min(r.length,n)),i=r[o];if(i&&i.root_dir===t)return i.queue_index;for(let s=o-1;s>=0;s--)if(r[s].root_dir===t)return r[s].queue_index+1;for(let s=o;s<r.length;s++)if(r[s].root_dir===t)return r[s].queue_index;return e.parallel_raw_length.get(t)??0}function Sh(e,t){return e.parallel_rows.some(n=>n.root_dir===t)}function Ai(e,t,n,r){return{type:"worker-queue-place",payload:{bead_id:e,...r?{lane:r}:{},index:n},root_dir:t}}function il(e,t){let n=0;for(let r of e.cross_lanes.keys())if(n+=1,r===t)return n;return n+1}function ts(e){let t=$h(e.blocked_by_map),n=[],r=new Set,o={refusal:null},i=u=>{let d=e.owner_of.get(u);return typeof d!="string"||d.length===0?(o.refusal=wh(u),null):d};return{graph:t,dep_ops:n,state:o,ownerOf:i,addDep:(u,d,p)=>{if(o.refusal!==null||u===d)return;let m=t.get(u)||[];if(m.includes(d))return;let _=i(u);if(_!==null){if(sl(t,d,u)){o.refusal=`\uC758\uC874 \uC0AC\uC774\uD074\uC774 \uC0DD\uAE41\uB2C8\uB2E4 \u2014 ${u}\uAC00 \uC774\uBBF8 ${d}\uB97C \uB9C9\uACE0 \uC788\uC2B5\uB2C8\uB2E4`;return}t.set(u,[...m,d]),p!==void 0&&r.add(Xo(u,d)),n.push({type:"dep-add",a:u,b:d,root_dir:_,...p===void 0?{}:{lane_id:p}})}},removeDep:(u,d)=>{if(o.refusal!==null||u===d)return;let p=t.get(u)||[];if(!p.includes(d))return;let m=i(u);m!==null&&(t.set(u,p.filter(_=>_!==d)),n.push({type:"dep-remove",a:u,b:d,root_dir:m}))},laneCreated:(u,d)=>r.has(Xo(u,d))}}function ns(e,t,n,r,o={}){if(e.state.refusal!==null)return{refused:e.state.refusal};let i=xh(e.dep_ops,t.blocked_by_map),s=i.filter(d=>d.type==="dep-remove"),l=i.filter(d=>d.type==="dep-add"),a=o.disarm_ops??[],u=o.lane_id===void 0||o.correction===void 0?void 0:kh(o.lane_id,o.correction);return{lane_ops:n,ops:[...s,...a,...l,...r],lane_op_index:s.length+a.length,...u===void 0?{}:{correction:u}}}function Id(e,t,n){for(let r=1;r<t.length;r+=1)e.addDep(t[r].bead_id,t[r-1].bead_id,n)}function Zo(e,t){return t>0&&e.entries[t]?.dep_created_by_lane===!0}function Ld(e,t,n,r){if(t.status!=="confirmed")return[];let o=[],i=new Map;for(let s of r){let l=e.owner_of.get(s.bead_id)||s.root_dir;typeof l!="string"||l.length===0||i.set(l,[...i.get(l)||[],s.bead_id])}for(let[s,l]of i)o.push({type:"worker-queue-disarm",payload:{bead_ids:l,lane_id:n},root_dir:s});return o}function Pd(e,t,n,r){let o=new Map;for(let i of n){if(t.placed_members.has(i.bead_id))continue;let s=e.ownerOf(i.bead_id);if(s===null)return;let l=o.get(s)??0;r.push(Ai(i.bead_id,s,(t.parallel_raw_length.get(s)??0)+l)),o.set(s,l+1)}}function Jo(e){return e.map(t=>({bead_id:t.bead_id,root_dir:t.root_dir}))}function Ei(e,t){return e.length===t.length&&e.every((n,r)=>n.bead_id===t[r].bead_id&&n.root_dir===t[r].root_dir)}function Ti(e,t,n){let r=ts(n),o=[],i=[],s=[],l,a=n.owner_lane_of.get(e.bead_id),u=e.kind==="chain"?e.lane_id??a:void 0,d=u===void 0?void 0:n.cross_lanes.get(u);if(t.kind==="repo-serial"&&e.root_dir!==t.root_dir)return{refused:gh};if(t.kind==="chain"){if(e.kind==="repo-serial")return{refused:hh};if(e.kind!=="chain"&&typeof a=="string"&&a!==t.lane_id&&n.cross_lanes.has(a))return{refused:`\uC774\uBBF8 \uC5F0\uACB0 ${il(n,a)}\uC5D0 \uC788\uC2B5\uB2C8\uB2E4`};if(!n.cross_lanes.has(t.lane_id))return{refused:yo}}if(e.kind==="chain"&&d===void 0)return{refused:yo};let p=()=>{if(d===void 0||d.status!=="confirmed")return;let w=d.entries.findIndex(W=>W.bead_id===e.bead_id);if(w<0)return;let R=w>0?d.entries[w-1]:null,I=w+1<d.entries.length?d.entries[w+1]:null,U=Zo(d,w),se=I!==null&&Zo(d,w+1);U&&R!==null&&r.removeDep(e.bead_id,R.bead_id),se&&I!==null&&r.removeDep(I.bead_id,e.bead_id),(U||se)&&R!==null&&I!==null&&r.addDep(I.bead_id,R.bead_id,u)},m=(w,R)=>{let I=n.cross_lanes.get(w),U=I.entries.findIndex(F=>F.bead_id===e.bead_id),se=I.entries.filter(F=>F.bead_id!==e.bead_id),W=Math.max(0,Math.min(se.length,U>=0&&R>U?R-1:R)),j=-1;if(se.forEach((F,H)=>{n.fixed_members.has(F.bead_id)&&(j=H)}),W<=j){r.state.refusal=bh;return}let O=U>=0?I.entries[U]:d?.entries.find(F=>F.bead_id===e.bead_id)??{bead_id:e.bead_id,root_dir:e.root_dir};l=es({status:I.status,entries:[...se.slice(0,W),O,...se.slice(W)]},n);let q=l.entries;if(Ei(q,I.entries)||o.push({type:"monitor-lane-update",payload:{lane_id:w,entries:Jo(q)}}),I.status!=="confirmed")return;let z=q.findIndex(F=>F.bead_id===e.bead_id),Y=z>0?q[z-1].bead_id:null,N=z+1<q.length?q[z+1].bead_id:null;if(Y===null){N!==null&&r.addDep(N,e.bead_id,w);return}if(r.addDep(e.bead_id,Y,w),N!==null&&(r.graph.get(N)||[]).includes(Y)){let F=I.entries.findIndex(H=>H.bead_id===N);(r.laneCreated(N,Y)||F>0&&I.entries[F-1].bead_id===Y&&Zo(I,F))&&r.removeDep(N,Y),r.addDep(N,e.bead_id,w)}},_=typeof e.queue_index=="number"?e.queue_index:n.queue_index_of.get(e.bead_id);if(e.kind==="chain"&&(p(),d!==void 0&&(t.kind!=="chain"||t.lane_id!==u)&&(s.push(...Ld(n,d,u,d.entries.filter(w=>w.bead_id===e.bead_id))),o.push({type:"monitor-lane-update",payload:{lane_id:u,entries:Jo(d.entries.filter(w=>w.bead_id!==e.bead_id))}}))),t.kind==="chain"&&m(t.lane_id,t.marker_index),r.state.refusal!==null)return{refused:r.state.refusal};if(t.kind==="candidate")e.kind!=="candidate"&&i.push({type:"worker-queue-remove",payload:{bead_id:e.bead_id},root_dir:e.root_dir});else if(t.kind==="parallel"){let w=Ah(n,e.root_dir,t.marker_index);if(e.kind==="candidate"||e.kind==="repo-serial")i.push(Ai(e.bead_id,e.root_dir,w));else if(e.kind==="parallel"){let R=n.parallel_rows,I=R[Math.max(0,Math.min(R.length,t.marker_index))];if(!(!!I&&I.bead_id===e.bead_id)&&Sh(n,e.root_dir)&&_!==void 0){let se=_>w?w:w-1;se>=0&&se!==_&&i.push({type:"worker-queue-reorder",payload:{bead_id:e.bead_id,to_index:se},root_dir:e.root_dir})}}}else if(t.kind==="chain"){let w=n.cross_lanes.get(t.lane_id);e.kind==="candidate"&&w.status==="confirmed"&&i.push(Ai(e.bead_id,e.root_dir,n.parallel_raw_length.get(e.root_dir)??0))}else if(e.kind==="repo-serial"&&e.lane_id===t.lane_id){if(_!==void 0&&t.index!==_){let w=_>t.index?t.index:t.index-1;w>=0&&w!==_&&i.push({type:"worker-queue-reorder",payload:{bead_id:e.bead_id,lane:t.lane_id,to_index:w},root_dir:e.root_dir})}}else i.push(Ai(e.bead_id,e.root_dir,t.index,t.lane_id));return ns(r,n,o,i,{disarm_ops:s,...t.kind==="chain"?{lane_id:t.lane_id,correction:l}:{}})}function Dd(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:yo};if(n.entries.length<2)return{refused:"\uD655\uC815\uD558\uB824\uBA74 \uBA64\uBC84\uAC00 2\uAC1C \uC774\uC0C1\uC774\uC5B4\uC57C \uD569\uB2C8\uB2E4"};let r=es(n,t);if(r.held)return{refused:Si};let o=r.entries,i=ts(t),s=[];Id(i,o,e),i.state.refusal===null&&Pd(i,t,o,s);let l=Ei(o,n.entries)?[]:[{type:"monitor-lane-update",payload:{lane_id:e,entries:Jo(o)}}];return l.push({type:"monitor-lane-confirm",payload:{lane_id:e}}),ns(i,t,l,s,{lane_id:e,correction:r})}function Md(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:yo};let r=es(n,t),o=r.entries,i=ts(t),s=[];Id(i,o,e),i.state.refusal===null&&Pd(i,t,o,s);let l=Ei(o,n.entries)?[]:[{type:"monitor-lane-update",payload:{lane_id:e,entries:Jo(o)}}];return ns(i,t,l,s,{lane_id:e,correction:r})}function qd(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:yo};let r=es(n,t),o=r.entries;return ns(ts(t),t,Ei(o,n.entries)?[]:[{type:"monitor-lane-update",payload:{lane_id:e,entries:Jo(o)}}],[],{lane_id:e,correction:r})}function Nd(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:yo};let r=ts(t);if(n.status==="confirmed")for(let o=1;o<n.entries.length;o+=1)Zo(n,o)&&r.removeDep(n.entries[o].bead_id,n.entries[o-1].bead_id);return ns(r,t,[{type:"monitor-lane-remove",payload:{lane_id:e}}],[],{disarm_ops:Ld(t,n,e,n.entries)})}function jd(e,t){let n=t.cross_lanes.get(e);if(n===void 0||n.status!=="confirmed")return null;let r=[],o=[];for(let s=1;s<n.entries.length;s+=1){let l=`  ${n.entries[s].bead_id} \u2190 ${n.entries[s-1].bead_id}`;Zo(n,s)?r.push(l):o.push(`${l} (\uB808\uC778\uC774 \uB9CC\uB4E4\uC9C0 \uC54A\uC74C)`)}let i=`\uC5F0\uACB0 ${il(t,e)}\uC744 \uC9C0\uC6C1\uB2C8\uB2E4.`;return r.length===0?`${i}
\uC758\uC874\uC740 \uADF8\uB300\uB85C \uB461\uB2C8\uB2E4`:[i,"\uD568\uAED8 \uC81C\uAC70\uD560 \uC758\uC874:",...r,...o.length===0?[]:["\uADF8\uB300\uB85C \uB450\uB294 \uC758\uC874:",...o]].join(`
`)}function Fd(e){let t=new Map;for(let n of e)n.type!=="dep-add"||typeof n.lane_id!="string"||t.set(n.lane_id,[...t.get(n.lane_id)||[],{bead_id:n.a,after:n.b}]);return[...t].map(([n,r])=>({lane_id:n,pairs:r}))}function Bd(e,t){let n=new Map(e.map((r,o)=>[r.bead_id,o]));return t.filter(r=>{let o=n.get(r.bead_id);return o!==void 0&&o>0&&e[o-1].bead_id===r.after})}function al(e,t){if(e!==null){let n=t.owner_lane_of.get(e.bead_id);if(typeof n=="string"&&t.cross_lanes.has(n))return{refused:`\uC774\uBBF8 \uC5F0\uACB0 ${il(t,n)}\uC5D0 \uC788\uC2B5\uB2C8\uB2E4`}}return{lane_ops:[{type:"monitor-lane-create",payload:{entries:e===null?[]:[e]}}],ops:[],lane_op_index:0}}var Eh="\uC0AC\uC774\uD074";function Th(e){let t=new Map,n=r=>Array.isArray(r)?r.filter(o=>typeof o=="string"&&o.length>0):[];for(let r of Array.isArray(e)?e:[]){if(!r||typeof r!="object")continue;let o=r.bead_blocked_by&&typeof r.bead_blocked_by=="object"?r.bead_blocked_by:{};for(let[i,s]of Object.entries(o))Array.isArray(s)&&t.set(i,n(s));for(let i of[...Array.isArray(r.runnable)?r.runnable:[],...Array.isArray(r.session_active)?r.session_active:[]])i&&typeof i.bead_id=="string"&&Array.isArray(i.blocked_by)&&i.blocked_by.length>0&&t.set(i.bead_id,n(i.blocked_by))}return t}function ll(e,t,n){let r=br(e,t),o=[],i=new Set,s=(a,u)=>{for(let d of a)i.has(d.id)||(i.add(d.id),o.push({bead_id:d.id,root_dir:d.root_dir,workspace_name:d.workspace_name,title:d.title,lane:u}))};s(r.running,"running"),s(r.pr_wait,"pr_wait"),s(r.queue,"queue"),s(r.runnable_all,"runnable");let l=n&&typeof n.root_dir=="string"&&n.root_dir.length?n.root_dir:null;return{issues:l===null?o:o.filter(a=>a.root_dir===l),blocked_by_map:Th(e)}}function Ud(e,t){let n=new Map;for(let s of t.issues)!s||typeof s.bead_id!="string"||s.bead_id.length===0||n.has(s.bead_id)||n.set(s.bead_id,s);let r=n.get(e)?.root_dir,o=t.blocked_by_map.get(e)||[],i=[];for(let s of n.values()){if(s.bead_id===e||s.lane==="done"||o.includes(s.bead_id))continue;let l=sl(t.blocked_by_map,s.bead_id,e);i.push({...s,disabled:l,...l?{reason:Eh}:{}})}return i.sort((s,l)=>{let a=r!==void 0&&s.root_dir===r,u=r!==void 0&&l.root_dir===r;return a!==u?a?-1:1:s.bead_id.localeCompare(l.bead_id)}),i}function Wd(e,t){let n=t.trim().toLowerCase();return n.length===0?e.slice():e.filter(r=>r.bead_id.toLowerCase().includes(n)||r.title.toLowerCase().includes(n))}var{entries:Zd,setPrototypeOf:zd,isFrozen:Ch,getPrototypeOf:Rh,getOwnPropertyDescriptor:Oh}=Object,{freeze:hn,seal:Cn,create:ml}=Object,{apply:gl,construct:hl}=typeof Reflect<"u"&&Reflect;hn||(hn=function(t){return t});Cn||(Cn=function(t){return t});gl||(gl=function(t,n){for(var r=arguments.length,o=new Array(r>2?r-2:0),i=2;i<r;i++)o[i-2]=arguments[i];return t.apply(n,o)});hl||(hl=function(t){for(var n=arguments.length,r=new Array(n>1?n-1:0),o=1;o<n;o++)r[o-1]=arguments[o];return new t(...r)});var Ci=bn(Array.prototype.forEach),Ih=bn(Array.prototype.lastIndexOf),Hd=bn(Array.prototype.pop),rs=bn(Array.prototype.push),Lh=bn(Array.prototype.splice),Oi=bn(String.prototype.toLowerCase),cl=bn(String.prototype.toString),ul=bn(String.prototype.match),os=bn(String.prototype.replace),Ph=bn(String.prototype.indexOf),Dh=bn(String.prototype.trim),qn=bn(Object.prototype.hasOwnProperty),gn=bn(RegExp.prototype.test),ss=Mh(TypeError);function bn(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var n=arguments.length,r=new Array(n>1?n-1:0),o=1;o<n;o++)r[o-1]=arguments[o];return gl(e,t,r)}}function Mh(e){return function(){for(var t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];return hl(e,n)}}function vt(e,t){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:Oi;zd&&zd(e,null);let r=t.length;for(;r--;){let o=t[r];if(typeof o=="string"){let i=n(o);i!==o&&(Ch(t)||(t[r]=i),o=i)}e[o]=!0}return e}function qh(e){for(let t=0;t<e.length;t++)qn(e,t)||(e[t]=null);return e}function or(e){let t=ml(null);for(let[n,r]of Zd(e))qn(e,n)&&(Array.isArray(r)?t[n]=qh(r):r&&typeof r=="object"&&r.constructor===Object?t[n]=or(r):t[n]=r);return t}function is(e,t){for(;e!==null;){let r=Oh(e,t);if(r){if(r.get)return bn(r.get);if(typeof r.value=="function")return bn(r.value)}e=Rh(e)}function n(){return null}return n}var Kd=hn(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),dl=hn(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),pl=hn(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),Nh=hn(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),fl=hn(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),jh=hn(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),Gd=hn(["#text"]),Yd=hn(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),_l=hn(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),Vd=hn(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),Ri=hn(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),Fh=Cn(/\{\{[\w\W]*|[\w\W]*\}\}/gm),Bh=Cn(/<%[\w\W]*|[\w\W]*%>/gm),Uh=Cn(/\$\{[\w\W]*/gm),Wh=Cn(/^data-[\-\w.\u00B7-\uFFFF]+$/),zh=Cn(/^aria-[\-\w]+$/),Jd=Cn(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),Hh=Cn(/^(?:\w+script|data):/i),Kh=Cn(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),ep=Cn(/^html$/i),Gh=Cn(/^[a-z][.\w]*(-[.\w]+)+$/i),Qd=Object.freeze({__proto__:null,ARIA_ATTR:zh,ATTR_WHITESPACE:Kh,CUSTOM_ELEMENT:Gh,DATA_ATTR:Wh,DOCTYPE_NAME:ep,ERB_EXPR:Bh,IS_ALLOWED_URI:Jd,IS_SCRIPT_OR_DATA:Hh,MUSTACHE_EXPR:Fh,TMPLIT_EXPR:Uh}),as={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,progressingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},Yh=function(){return typeof window>"u"?null:window},Vh=function(t,n){if(typeof t!="object"||typeof t.createPolicy!="function")return null;let r=null,o="data-tt-policy-suffix";n&&n.hasAttribute(o)&&(r=n.getAttribute(o));let i="dompurify"+(r?"#"+r:"");try{return t.createPolicy(i,{createHTML(s){return s},createScriptURL(s){return s}})}catch{return console.warn("TrustedTypes policy "+i+" could not be created."),null}},Xd=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function tp(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:Yh(),t=xe=>tp(xe);if(t.version="3.3.0",t.removed=[],!e||!e.document||e.document.nodeType!==as.document||!e.Element)return t.isSupported=!1,t;let{document:n}=e,r=n,o=r.currentScript,{DocumentFragment:i,HTMLTemplateElement:s,Node:l,Element:a,NodeFilter:u,NamedNodeMap:d=e.NamedNodeMap||e.MozNamedAttrMap,HTMLFormElement:p,DOMParser:m,trustedTypes:_}=e,w=a.prototype,R=is(w,"cloneNode"),I=is(w,"remove"),U=is(w,"nextSibling"),se=is(w,"childNodes"),W=is(w,"parentNode");if(typeof s=="function"){let xe=n.createElement("template");xe.content&&xe.content.ownerDocument&&(n=xe.content.ownerDocument)}let j,O="",{implementation:q,createNodeIterator:z,createDocumentFragment:Y,getElementsByTagName:N}=n,{importNode:F}=r,H=Xd();t.isSupported=typeof Zd=="function"&&typeof W=="function"&&q&&q.createHTMLDocument!==void 0;let{MUSTACHE_EXPR:G,ERB_EXPR:ee,TMPLIT_EXPR:ye,DATA_ATTR:qe,ARIA_ATTR:B,IS_SCRIPT_OR_DATA:X,ATTR_WHITESPACE:Se,CUSTOM_ELEMENT:Ee}=Qd,{IS_ALLOWED_URI:C}=Qd,re=null,ke=vt({},[...Kd,...dl,...pl,...fl,...Gd]),ve=null,Me=vt({},[...Yd,..._l,...Vd,...Ri]),he=Object.seal(ml(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),Le=null,Xe=null,it=Object.seal(ml(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}})),P=!0,ce=!0,ie=!1,de=!0,Te=!1,_e=!0,De=!1,Be=!1,Qe=!1,Fe=!1,te=!1,V=!1,$e=!0,_t=!1,at="user-content-",Ke=!0,$=!1,J={},Re=null,je=vt({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]),Je=null,et=vt({},["audio","video","img","source","image","track"]),Ue=null,ct=vt({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),Gt="http://www.w3.org/1998/Math/MathML",At="http://www.w3.org/2000/svg",kt="http://www.w3.org/1999/xhtml",wt=kt,jt=!1,Lt=null,ae=vt({},[Gt,At,kt],cl),me=vt({},["mi","mo","mn","ms","mtext"]),Ge=vt({},["annotation-xml"]),lt=vt({},["title","style","font","a","script"]),Oe=null,E=["application/xhtml+xml","text/html"],L="text/html",Z=null,pe=null,fe=n.createElement("form"),Pe=function(A){return A instanceof RegExp||A instanceof Function},ht=function(){let A=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(pe&&pe===A)){if((!A||typeof A!="object")&&(A={}),A=or(A),Oe=E.indexOf(A.PARSER_MEDIA_TYPE)===-1?L:A.PARSER_MEDIA_TYPE,Z=Oe==="application/xhtml+xml"?cl:Oi,re=qn(A,"ALLOWED_TAGS")?vt({},A.ALLOWED_TAGS,Z):ke,ve=qn(A,"ALLOWED_ATTR")?vt({},A.ALLOWED_ATTR,Z):Me,Lt=qn(A,"ALLOWED_NAMESPACES")?vt({},A.ALLOWED_NAMESPACES,cl):ae,Ue=qn(A,"ADD_URI_SAFE_ATTR")?vt(or(ct),A.ADD_URI_SAFE_ATTR,Z):ct,Je=qn(A,"ADD_DATA_URI_TAGS")?vt(or(et),A.ADD_DATA_URI_TAGS,Z):et,Re=qn(A,"FORBID_CONTENTS")?vt({},A.FORBID_CONTENTS,Z):je,Le=qn(A,"FORBID_TAGS")?vt({},A.FORBID_TAGS,Z):or({}),Xe=qn(A,"FORBID_ATTR")?vt({},A.FORBID_ATTR,Z):or({}),J=qn(A,"USE_PROFILES")?A.USE_PROFILES:!1,P=A.ALLOW_ARIA_ATTR!==!1,ce=A.ALLOW_DATA_ATTR!==!1,ie=A.ALLOW_UNKNOWN_PROTOCOLS||!1,de=A.ALLOW_SELF_CLOSE_IN_ATTR!==!1,Te=A.SAFE_FOR_TEMPLATES||!1,_e=A.SAFE_FOR_XML!==!1,De=A.WHOLE_DOCUMENT||!1,Fe=A.RETURN_DOM||!1,te=A.RETURN_DOM_FRAGMENT||!1,V=A.RETURN_TRUSTED_TYPE||!1,Qe=A.FORCE_BODY||!1,$e=A.SANITIZE_DOM!==!1,_t=A.SANITIZE_NAMED_PROPS||!1,Ke=A.KEEP_CONTENT!==!1,$=A.IN_PLACE||!1,C=A.ALLOWED_URI_REGEXP||Jd,wt=A.NAMESPACE||kt,me=A.MATHML_TEXT_INTEGRATION_POINTS||me,Ge=A.HTML_INTEGRATION_POINTS||Ge,he=A.CUSTOM_ELEMENT_HANDLING||{},A.CUSTOM_ELEMENT_HANDLING&&Pe(A.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(he.tagNameCheck=A.CUSTOM_ELEMENT_HANDLING.tagNameCheck),A.CUSTOM_ELEMENT_HANDLING&&Pe(A.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(he.attributeNameCheck=A.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),A.CUSTOM_ELEMENT_HANDLING&&typeof A.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(he.allowCustomizedBuiltInElements=A.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),Te&&(ce=!1),te&&(Fe=!0),J&&(re=vt({},Gd),ve=[],J.html===!0&&(vt(re,Kd),vt(ve,Yd)),J.svg===!0&&(vt(re,dl),vt(ve,_l),vt(ve,Ri)),J.svgFilters===!0&&(vt(re,pl),vt(ve,_l),vt(ve,Ri)),J.mathMl===!0&&(vt(re,fl),vt(ve,Vd),vt(ve,Ri))),A.ADD_TAGS&&(typeof A.ADD_TAGS=="function"?it.tagCheck=A.ADD_TAGS:(re===ke&&(re=or(re)),vt(re,A.ADD_TAGS,Z))),A.ADD_ATTR&&(typeof A.ADD_ATTR=="function"?it.attributeCheck=A.ADD_ATTR:(ve===Me&&(ve=or(ve)),vt(ve,A.ADD_ATTR,Z))),A.ADD_URI_SAFE_ATTR&&vt(Ue,A.ADD_URI_SAFE_ATTR,Z),A.FORBID_CONTENTS&&(Re===je&&(Re=or(Re)),vt(Re,A.FORBID_CONTENTS,Z)),Ke&&(re["#text"]=!0),De&&vt(re,["html","head","body"]),re.table&&(vt(re,["tbody"]),delete Le.tbody),A.TRUSTED_TYPES_POLICY){if(typeof A.TRUSTED_TYPES_POLICY.createHTML!="function")throw ss('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof A.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw ss('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');j=A.TRUSTED_TYPES_POLICY,O=j.createHTML("")}else j===void 0&&(j=Vh(_,o)),j!==null&&typeof O=="string"&&(O=j.createHTML(""));hn&&hn(A),pe=A}},$t=vt({},[...dl,...pl,...Nh]),gt=vt({},[...fl,...jh]),Bt=function(A){let ge=W(A);(!ge||!ge.tagName)&&(ge={namespaceURI:wt,tagName:"template"});let Ne=Oi(A.tagName),y=Oi(ge.tagName);return Lt[A.namespaceURI]?A.namespaceURI===At?ge.namespaceURI===kt?Ne==="svg":ge.namespaceURI===Gt?Ne==="svg"&&(y==="annotation-xml"||me[y]):!!$t[Ne]:A.namespaceURI===Gt?ge.namespaceURI===kt?Ne==="math":ge.namespaceURI===At?Ne==="math"&&Ge[y]:!!gt[Ne]:A.namespaceURI===kt?ge.namespaceURI===At&&!Ge[y]||ge.namespaceURI===Gt&&!me[y]?!1:!gt[Ne]&&(lt[Ne]||!$t[Ne]):!!(Oe==="application/xhtml+xml"&&Lt[A.namespaceURI]):!1},bt=function(A){rs(t.removed,{element:A});try{W(A).removeChild(A)}catch{I(A)}},Ct=function(A,ge){try{rs(t.removed,{attribute:ge.getAttributeNode(A),from:ge})}catch{rs(t.removed,{attribute:null,from:ge})}if(ge.removeAttribute(A),A==="is")if(Fe||te)try{bt(ge)}catch{}else try{ge.setAttribute(A,"")}catch{}},Rt=function(A){let ge=null,Ne=null;if(Qe)A="<remove></remove>"+A;else{let f=ul(A,/^[\r\n\t ]+/);Ne=f&&f[0]}Oe==="application/xhtml+xml"&&wt===kt&&(A='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+A+"</body></html>");let y=j?j.createHTML(A):A;if(wt===kt)try{ge=new m().parseFromString(y,Oe)}catch{}if(!ge||!ge.documentElement){ge=q.createDocument(wt,"template",null);try{ge.documentElement.innerHTML=jt?O:y}catch{}}let v=ge.body||ge.documentElement;return A&&Ne&&v.insertBefore(n.createTextNode(Ne),v.childNodes[0]||null),wt===kt?N.call(ge,De?"html":"body")[0]:De?ge.documentElement:v},en=function(A){return z.call(A.ownerDocument||A,A,u.SHOW_ELEMENT|u.SHOW_COMMENT|u.SHOW_TEXT|u.SHOW_PROCESSING_INSTRUCTION|u.SHOW_CDATA_SECTION,null)},Yt=function(A){return A instanceof p&&(typeof A.nodeName!="string"||typeof A.textContent!="string"||typeof A.removeChild!="function"||!(A.attributes instanceof d)||typeof A.removeAttribute!="function"||typeof A.setAttribute!="function"||typeof A.namespaceURI!="string"||typeof A.insertBefore!="function"||typeof A.hasChildNodes!="function")},Dt=function(A){return typeof l=="function"&&A instanceof l};function xt(xe,A,ge){Ci(xe,Ne=>{Ne.call(t,A,ge,pe)})}let Ht=function(A){let ge=null;if(xt(H.beforeSanitizeElements,A,null),Yt(A))return bt(A),!0;let Ne=Z(A.nodeName);if(xt(H.uponSanitizeElement,A,{tagName:Ne,allowedTags:re}),_e&&A.hasChildNodes()&&!Dt(A.firstElementChild)&&gn(/<[/\w!]/g,A.innerHTML)&&gn(/<[/\w!]/g,A.textContent)||A.nodeType===as.progressingInstruction||_e&&A.nodeType===as.comment&&gn(/<[/\w]/g,A.data))return bt(A),!0;if(!(it.tagCheck instanceof Function&&it.tagCheck(Ne))&&(!re[Ne]||Le[Ne])){if(!Le[Ne]&&Ut(Ne)&&(he.tagNameCheck instanceof RegExp&&gn(he.tagNameCheck,Ne)||he.tagNameCheck instanceof Function&&he.tagNameCheck(Ne)))return!1;if(Ke&&!Re[Ne]){let y=W(A)||A.parentNode,v=se(A)||A.childNodes;if(v&&y){let f=v.length;for(let g=f-1;g>=0;--g){let M=R(v[g],!0);M.__removalCount=(A.__removalCount||0)+1,y.insertBefore(M,U(A))}}}return bt(A),!0}return A instanceof a&&!Bt(A)||(Ne==="noscript"||Ne==="noembed"||Ne==="noframes")&&gn(/<\/no(script|embed|frames)/i,A.innerHTML)?(bt(A),!0):(Te&&A.nodeType===as.text&&(ge=A.textContent,Ci([G,ee,ye],y=>{ge=os(ge,y," ")}),A.textContent!==ge&&(rs(t.removed,{element:A.cloneNode()}),A.textContent=ge)),xt(H.afterSanitizeElements,A,null),!1)},nn=function(A,ge,Ne){if($e&&(ge==="id"||ge==="name")&&(Ne in n||Ne in fe))return!1;if(!(ce&&!Xe[ge]&&gn(qe,ge))){if(!(P&&gn(B,ge))){if(!(it.attributeCheck instanceof Function&&it.attributeCheck(ge,A))){if(!ve[ge]||Xe[ge]){if(!(Ut(A)&&(he.tagNameCheck instanceof RegExp&&gn(he.tagNameCheck,A)||he.tagNameCheck instanceof Function&&he.tagNameCheck(A))&&(he.attributeNameCheck instanceof RegExp&&gn(he.attributeNameCheck,ge)||he.attributeNameCheck instanceof Function&&he.attributeNameCheck(ge,A))||ge==="is"&&he.allowCustomizedBuiltInElements&&(he.tagNameCheck instanceof RegExp&&gn(he.tagNameCheck,Ne)||he.tagNameCheck instanceof Function&&he.tagNameCheck(Ne))))return!1}else if(!Ue[ge]){if(!gn(C,os(Ne,Se,""))){if(!((ge==="src"||ge==="xlink:href"||ge==="href")&&A!=="script"&&Ph(Ne,"data:")===0&&Je[A])){if(!(ie&&!gn(X,os(Ne,Se,"")))){if(Ne)return!1}}}}}}}return!0},Ut=function(A){return A!=="annotation-xml"&&ul(A,Ee)},an=function(A){xt(H.beforeSanitizeAttributes,A,null);let{attributes:ge}=A;if(!ge||Yt(A))return;let Ne={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:ve,forceKeepAttr:void 0},y=ge.length;for(;y--;){let v=ge[y],{name:f,namespaceURI:g,value:M}=v,Q=Z(f),ne=M,ue=f==="value"?ne:Dh(ne);if(Ne.attrName=Q,Ne.attrValue=ue,Ne.keepAttr=!0,Ne.forceKeepAttr=void 0,xt(H.uponSanitizeAttribute,A,Ne),ue=Ne.attrValue,_t&&(Q==="id"||Q==="name")&&(Ct(f,A),ue=at+ue),_e&&gn(/((--!?|])>)|<\/(style|title|textarea)/i,ue)){Ct(f,A);continue}if(Q==="attributename"&&ul(ue,"href")){Ct(f,A);continue}if(Ne.forceKeepAttr)continue;if(!Ne.keepAttr){Ct(f,A);continue}if(!de&&gn(/\/>/i,ue)){Ct(f,A);continue}Te&&Ci([G,ee,ye],mt=>{ue=os(ue,mt," ")});let ut=Z(A.nodeName);if(!nn(ut,Q,ue)){Ct(f,A);continue}if(j&&typeof _=="object"&&typeof _.getAttributeType=="function"&&!g)switch(_.getAttributeType(ut,Q)){case"TrustedHTML":{ue=j.createHTML(ue);break}case"TrustedScriptURL":{ue=j.createScriptURL(ue);break}}if(ue!==ne)try{g?A.setAttributeNS(g,f,ue):A.setAttribute(f,ue),Yt(A)?bt(A):Hd(t.removed)}catch{Ct(f,A)}}xt(H.afterSanitizeAttributes,A,null)},Zt=function xe(A){let ge=null,Ne=en(A);for(xt(H.beforeSanitizeShadowDOM,A,null);ge=Ne.nextNode();)xt(H.uponSanitizeShadowNode,ge,null),Ht(ge),an(ge),ge.content instanceof i&&xe(ge.content);xt(H.afterSanitizeShadowDOM,A,null)};return t.sanitize=function(xe){let A=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},ge=null,Ne=null,y=null,v=null;if(jt=!xe,jt&&(xe="<!-->"),typeof xe!="string"&&!Dt(xe))if(typeof xe.toString=="function"){if(xe=xe.toString(),typeof xe!="string")throw ss("dirty is not a string, aborting")}else throw ss("toString is not a function");if(!t.isSupported)return xe;if(Be||ht(A),t.removed=[],typeof xe=="string"&&($=!1),$){if(xe.nodeName){let M=Z(xe.nodeName);if(!re[M]||Le[M])throw ss("root node is forbidden and cannot be sanitized in-place")}}else if(xe instanceof l)ge=Rt("<!---->"),Ne=ge.ownerDocument.importNode(xe,!0),Ne.nodeType===as.element&&Ne.nodeName==="BODY"||Ne.nodeName==="HTML"?ge=Ne:ge.appendChild(Ne);else{if(!Fe&&!Te&&!De&&xe.indexOf("<")===-1)return j&&V?j.createHTML(xe):xe;if(ge=Rt(xe),!ge)return Fe?null:V?O:""}ge&&Qe&&bt(ge.firstChild);let f=en($?xe:ge);for(;y=f.nextNode();)Ht(y),an(y),y.content instanceof i&&Zt(y.content);if($)return xe;if(Fe){if(te)for(v=Y.call(ge.ownerDocument);ge.firstChild;)v.appendChild(ge.firstChild);else v=ge;return(ve.shadowroot||ve.shadowrootmode)&&(v=F.call(r,v,!0)),v}let g=De?ge.outerHTML:ge.innerHTML;return De&&re["!doctype"]&&ge.ownerDocument&&ge.ownerDocument.doctype&&ge.ownerDocument.doctype.name&&gn(ep,ge.ownerDocument.doctype.name)&&(g="<!DOCTYPE "+ge.ownerDocument.doctype.name+`>
`+g),Te&&Ci([G,ee,ye],M=>{g=os(g,M," ")}),j&&V?j.createHTML(g):g},t.setConfig=function(){let xe=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};ht(xe),Be=!0},t.clearConfig=function(){pe=null,Be=!1},t.isValidAttribute=function(xe,A,ge){pe||ht({});let Ne=Z(xe),y=Z(A);return nn(Ne,y,ge)},t.addHook=function(xe,A){typeof A=="function"&&rs(H[xe],A)},t.removeHook=function(xe,A){if(A!==void 0){let ge=Ih(H[xe],A);return ge===-1?void 0:Lh(H[xe],ge,1)[0]}return Hd(H[xe])},t.removeHooks=function(xe){H[xe]=[]},t.removeAllHooks=function(){H=Xd()},t}var np=tp();var sr={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},Ii=e=>(...t)=>({_$litDirective$:e,values:t}),vo=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,n,r){this._$Ct=t,this._$AM=n,this._$Ci=r}_$AS(t,n){return this.update(t,n)}update(t,n){return this.render(...n)}};var ls=class extends vo{constructor(t){if(super(t),this.it=zt,t.type!==sr.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===zt||t==null)return this._t=void 0,this.it=t;if(t===Tn)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;let n=[t];return n.raw=n,this._t={_$litType$:this.constructor.resultType,strings:n,values:[]}}};ls.directiveName="unsafeHTML",ls.resultType=1;var rp=Ii(ls);function kl(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var Fr=kl();function up(e){Fr=e}var ps={exec:()=>null};function Ot(e,t=""){let n=typeof e=="string"?e:e.source,r={replace:(o,i)=>{let s=typeof i=="string"?i:i.source;return s=s.replace(yn.caret,"$1"),n=n.replace(o,s),r},getRegex:()=>new RegExp(n,t)};return r}var Qh=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),yn={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i")},Xh=/^(?:[ \t]*(?:\n|$))+/,Zh=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,Jh=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,fs=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,eb=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,wl=/(?:[*+-]|\d{1,9}[.)])/,dp=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,pp=Ot(dp).replace(/bull/g,wl).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),tb=Ot(dp).replace(/bull/g,wl).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),$l=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,nb=/^[^\n]+/,xl=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,rb=Ot(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",xl).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),ob=Ot(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,wl).getRegex(),Ni="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",Al=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,sb=Ot("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",Al).replace("tag",Ni).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),fp=Ot($l).replace("hr",fs).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Ni).getRegex(),ib=Ot(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",fp).getRegex(),Sl={blockquote:ib,code:Zh,def:rb,fences:Jh,heading:eb,hr:fs,html:sb,lheading:pp,list:ob,newline:Xh,paragraph:fp,table:ps,text:nb},op=Ot("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",fs).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Ni).getRegex(),ab={...Sl,lheading:tb,table:op,paragraph:Ot($l).replace("hr",fs).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",op).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Ni).getRegex()},lb={...Sl,html:Ot(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",Al).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:ps,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:Ot($l).replace("hr",fs).replace("heading",` *#{1,6} *[^
]`).replace("lheading",pp).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},cb=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,ub=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,_p=/^( {2,}|\\)\n(?!\s*$)/,db=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,ji=/[\p{P}\p{S}]/u,El=/[\s\p{P}\p{S}]/u,mp=/[^\s\p{P}\p{S}]/u,pb=Ot(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,El).getRegex(),gp=/(?!~)[\p{P}\p{S}]/u,fb=/(?!~)[\s\p{P}\p{S}]/u,_b=/(?:[^\s\p{P}\p{S}]|~)/u,mb=Ot(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",Qh?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),hp=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,gb=Ot(hp,"u").replace(/punct/g,ji).getRegex(),hb=Ot(hp,"u").replace(/punct/g,gp).getRegex(),bp="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",bb=Ot(bp,"gu").replace(/notPunctSpace/g,mp).replace(/punctSpace/g,El).replace(/punct/g,ji).getRegex(),yb=Ot(bp,"gu").replace(/notPunctSpace/g,_b).replace(/punctSpace/g,fb).replace(/punct/g,gp).getRegex(),vb=Ot("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,mp).replace(/punctSpace/g,El).replace(/punct/g,ji).getRegex(),kb=Ot(/\\(punct)/,"gu").replace(/punct/g,ji).getRegex(),wb=Ot(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),$b=Ot(Al).replace("(?:-->|$)","-->").getRegex(),xb=Ot("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",$b).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),Di=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,Ab=Ot(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",Di).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),yp=Ot(/^!?\[(label)\]\[(ref)\]/).replace("label",Di).replace("ref",xl).getRegex(),vp=Ot(/^!?\[(ref)\](?:\[\])?/).replace("ref",xl).getRegex(),Sb=Ot("reflink|nolink(?!\\()","g").replace("reflink",yp).replace("nolink",vp).getRegex(),sp=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,Tl={_backpedal:ps,anyPunctuation:kb,autolink:wb,blockSkip:mb,br:_p,code:ub,del:ps,emStrongLDelim:gb,emStrongRDelimAst:bb,emStrongRDelimUnd:vb,escape:cb,link:Ab,nolink:vp,punctuation:pb,reflink:yp,reflinkSearch:Sb,tag:xb,text:db,url:ps},Eb={...Tl,link:Ot(/^!?\[(label)\]\((.*?)\)/).replace("label",Di).getRegex(),reflink:Ot(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",Di).getRegex()},bl={...Tl,emStrongRDelimAst:yb,emStrongLDelim:hb,url:Ot(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",sp).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:Ot(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",sp).getRegex()},Tb={...bl,br:Ot(_p).replace("{2,}","*").getRegex(),text:Ot(bl.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},Li={normal:Sl,gfm:ab,pedantic:lb},cs={normal:Tl,gfm:bl,breaks:Tb,pedantic:Eb},Cb={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},ip=e=>Cb[e];function ir(e,t){if(t){if(yn.escapeTest.test(e))return e.replace(yn.escapeReplace,ip)}else if(yn.escapeTestNoEncode.test(e))return e.replace(yn.escapeReplaceNoEncode,ip);return e}function ap(e){try{e=encodeURI(e).replace(yn.percentDecode,"%")}catch{return null}return e}function lp(e,t){let n=e.replace(yn.findPipe,(i,s,l)=>{let a=!1,u=s;for(;--u>=0&&l[u]==="\\";)a=!a;return a?"|":" |"}),r=n.split(yn.splitPipe),o=0;if(r[0].trim()||r.shift(),r.length>0&&!r.at(-1)?.trim()&&r.pop(),t)if(r.length>t)r.splice(t);else for(;r.length<t;)r.push("");for(;o<r.length;o++)r[o]=r[o].trim().replace(yn.slashPipe,"|");return r}function us(e,t,n){let r=e.length;if(r===0)return"";let o=0;for(;o<r;){let i=e.charAt(r-o-1);if(i===t&&!n)o++;else if(i!==t&&n)o++;else break}return e.slice(0,r-o)}function Rb(e,t){if(e.indexOf(t[1])===-1)return-1;let n=0;for(let r=0;r<e.length;r++)if(e[r]==="\\")r++;else if(e[r]===t[0])n++;else if(e[r]===t[1]&&(n--,n<0))return r;return n>0?-2:-1}function cp(e,t,n,r,o){let i=t.href,s=t.title||null,l=e[1].replace(o.other.outputLinkReplace,"$1");r.state.inLink=!0;let a={type:e[0].charAt(0)==="!"?"image":"link",raw:n,href:i,title:s,text:l,tokens:r.inlineTokens(l)};return r.state.inLink=!1,a}function Ob(e,t,n){let r=e.match(n.other.indentCodeCompensation);if(r===null)return t;let o=r[1];return t.split(`
`).map(i=>{let s=i.match(n.other.beginningSpace);if(s===null)return i;let[l]=s;return l.length>=o.length?i.slice(o.length):i}).join(`
`)}var Mi=class{constructor(e){qt(this,"options");qt(this,"rules");qt(this,"lexer");this.options=e||Fr}space(e){let t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){let t=this.rules.block.code.exec(e);if(t){let n=t[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?n:us(n,`
`)}}}fences(e){let t=this.rules.block.fences.exec(e);if(t){let n=t[0],r=Ob(n,t[3]||"",this.rules);return{type:"code",raw:n,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:r}}}heading(e){let t=this.rules.block.heading.exec(e);if(t){let n=t[2].trim();if(this.rules.other.endingHash.test(n)){let r=us(n,"#");(this.options.pedantic||!r||this.rules.other.endingSpaceChar.test(r))&&(n=r.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:n,tokens:this.lexer.inline(n)}}}hr(e){let t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:us(t[0],`
`)}}blockquote(e){let t=this.rules.block.blockquote.exec(e);if(t){let n=us(t[0],`
`).split(`
`),r="",o="",i=[];for(;n.length>0;){let s=!1,l=[],a;for(a=0;a<n.length;a++)if(this.rules.other.blockquoteStart.test(n[a]))l.push(n[a]),s=!0;else if(!s)l.push(n[a]);else break;n=n.slice(a);let u=l.join(`
`),d=u.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");r=r?`${r}
${u}`:u,o=o?`${o}
${d}`:d;let p=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(d,i,!0),this.lexer.state.top=p,n.length===0)break;let m=i.at(-1);if(m?.type==="code")break;if(m?.type==="blockquote"){let _=m,w=_.raw+`
`+n.join(`
`),R=this.blockquote(w);i[i.length-1]=R,r=r.substring(0,r.length-_.raw.length)+R.raw,o=o.substring(0,o.length-_.text.length)+R.text;break}else if(m?.type==="list"){let _=m,w=_.raw+`
`+n.join(`
`),R=this.list(w);i[i.length-1]=R,r=r.substring(0,r.length-m.raw.length)+R.raw,o=o.substring(0,o.length-_.raw.length)+R.raw,n=w.substring(i.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:r,tokens:i,text:o}}}list(e){let t=this.rules.block.list.exec(e);if(t){let n=t[1].trim(),r=n.length>1,o={type:"list",raw:"",ordered:r,start:r?+n.slice(0,-1):"",loose:!1,items:[]};n=r?`\\d{1,9}\\${n.slice(-1)}`:`\\${n}`,this.options.pedantic&&(n=r?n:"[*+-]");let i=this.rules.other.listItemRegex(n),s=!1;for(;e;){let a=!1,u="",d="";if(!(t=i.exec(e))||this.rules.block.hr.test(e))break;u=t[0],e=e.substring(u.length);let p=t[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,R=>" ".repeat(3*R.length)),m=e.split(`
`,1)[0],_=!p.trim(),w=0;if(this.options.pedantic?(w=2,d=p.trimStart()):_?w=t[1].length+1:(w=t[2].search(this.rules.other.nonSpaceChar),w=w>4?1:w,d=p.slice(w),w+=t[1].length),_&&this.rules.other.blankLine.test(m)&&(u+=m+`
`,e=e.substring(m.length+1),a=!0),!a){let R=this.rules.other.nextBulletRegex(w),I=this.rules.other.hrRegex(w),U=this.rules.other.fencesBeginRegex(w),se=this.rules.other.headingBeginRegex(w),W=this.rules.other.htmlBeginRegex(w);for(;e;){let j=e.split(`
`,1)[0],O;if(m=j,this.options.pedantic?(m=m.replace(this.rules.other.listReplaceNesting,"  "),O=m):O=m.replace(this.rules.other.tabCharGlobal,"    "),U.test(m)||se.test(m)||W.test(m)||R.test(m)||I.test(m))break;if(O.search(this.rules.other.nonSpaceChar)>=w||!m.trim())d+=`
`+O.slice(w);else{if(_||p.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||U.test(p)||se.test(p)||I.test(p))break;d+=`
`+m}!_&&!m.trim()&&(_=!0),u+=j+`
`,e=e.substring(j.length+1),p=O.slice(w)}}o.loose||(s?o.loose=!0:this.rules.other.doubleBlankLine.test(u)&&(s=!0)),o.items.push({type:"list_item",raw:u,task:!!this.options.gfm&&this.rules.other.listIsTask.test(d),loose:!1,text:d,tokens:[]}),o.raw+=u}let l=o.items.at(-1);if(l)l.raw=l.raw.trimEnd(),l.text=l.text.trimEnd();else return;o.raw=o.raw.trimEnd();for(let a of o.items){if(this.lexer.state.top=!1,a.tokens=this.lexer.blockTokens(a.text,[]),a.task){if(a.text=a.text.replace(this.rules.other.listReplaceTask,""),a.tokens[0]?.type==="text"||a.tokens[0]?.type==="paragraph"){a.tokens[0].raw=a.tokens[0].raw.replace(this.rules.other.listReplaceTask,""),a.tokens[0].text=a.tokens[0].text.replace(this.rules.other.listReplaceTask,"");for(let d=this.lexer.inlineQueue.length-1;d>=0;d--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[d].src)){this.lexer.inlineQueue[d].src=this.lexer.inlineQueue[d].src.replace(this.rules.other.listReplaceTask,"");break}}let u=this.rules.other.listTaskCheckbox.exec(a.raw);if(u){let d={type:"checkbox",raw:u[0]+" ",checked:u[0]!=="[ ]"};a.checked=d.checked,o.loose?a.tokens[0]&&["paragraph","text"].includes(a.tokens[0].type)&&"tokens"in a.tokens[0]&&a.tokens[0].tokens?(a.tokens[0].raw=d.raw+a.tokens[0].raw,a.tokens[0].text=d.raw+a.tokens[0].text,a.tokens[0].tokens.unshift(d)):a.tokens.unshift({type:"paragraph",raw:d.raw,text:d.raw,tokens:[d]}):a.tokens.unshift(d)}}if(!o.loose){let u=a.tokens.filter(p=>p.type==="space"),d=u.length>0&&u.some(p=>this.rules.other.anyLine.test(p.raw));o.loose=d}}if(o.loose)for(let a of o.items){a.loose=!0;for(let u of a.tokens)u.type==="text"&&(u.type="paragraph")}return o}}html(e){let t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){let t=this.rules.block.def.exec(e);if(t){let n=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),r=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",o=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:n,raw:t[0],href:r,title:o}}}table(e){let t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;let n=lp(t[1]),r=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),o=t[3]?.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],i={type:"table",raw:t[0],header:[],align:[],rows:[]};if(n.length===r.length){for(let s of r)this.rules.other.tableAlignRight.test(s)?i.align.push("right"):this.rules.other.tableAlignCenter.test(s)?i.align.push("center"):this.rules.other.tableAlignLeft.test(s)?i.align.push("left"):i.align.push(null);for(let s=0;s<n.length;s++)i.header.push({text:n[s],tokens:this.lexer.inline(n[s]),header:!0,align:i.align[s]});for(let s of o)i.rows.push(lp(s,i.header.length).map((l,a)=>({text:l,tokens:this.lexer.inline(l),header:!1,align:i.align[a]})));return i}}lheading(e){let t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){let t=this.rules.block.paragraph.exec(e);if(t){let n=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:n,tokens:this.lexer.inline(n)}}}text(e){let t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){let t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){let t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){let t=this.rules.inline.link.exec(e);if(t){let n=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(n)){if(!this.rules.other.endAngleBracket.test(n))return;let i=us(n.slice(0,-1),"\\");if((n.length-i.length)%2===0)return}else{let i=Rb(t[2],"()");if(i===-2)return;if(i>-1){let s=(t[0].indexOf("!")===0?5:4)+t[1].length+i;t[2]=t[2].substring(0,i),t[0]=t[0].substring(0,s).trim(),t[3]=""}}let r=t[2],o="";if(this.options.pedantic){let i=this.rules.other.pedanticHrefTitle.exec(r);i&&(r=i[1],o=i[3])}else o=t[3]?t[3].slice(1,-1):"";return r=r.trim(),this.rules.other.startAngleBracket.test(r)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(n)?r=r.slice(1):r=r.slice(1,-1)),cp(t,{href:r&&r.replace(this.rules.inline.anyPunctuation,"$1"),title:o&&o.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let n;if((n=this.rules.inline.reflink.exec(e))||(n=this.rules.inline.nolink.exec(e))){let r=(n[2]||n[1]).replace(this.rules.other.multipleSpaceGlobal," "),o=t[r.toLowerCase()];if(!o){let i=n[0].charAt(0);return{type:"text",raw:i,text:i}}return cp(n,o,n[0],this.lexer,this.rules)}}emStrong(e,t,n=""){let r=this.rules.inline.emStrongLDelim.exec(e);if(!(!r||r[3]&&n.match(this.rules.other.unicodeAlphaNumeric))&&(!(r[1]||r[2])||!n||this.rules.inline.punctuation.exec(n))){let o=[...r[0]].length-1,i,s,l=o,a=0,u=r[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(u.lastIndex=0,t=t.slice(-1*e.length+o);(r=u.exec(t))!=null;){if(i=r[1]||r[2]||r[3]||r[4]||r[5]||r[6],!i)continue;if(s=[...i].length,r[3]||r[4]){l+=s;continue}else if((r[5]||r[6])&&o%3&&!((o+s)%3)){a+=s;continue}if(l-=s,l>0)continue;s=Math.min(s,s+l+a);let d=[...r[0]][0].length,p=e.slice(0,o+r.index+d+s);if(Math.min(o,s)%2){let _=p.slice(1,-1);return{type:"em",raw:p,text:_,tokens:this.lexer.inlineTokens(_)}}let m=p.slice(2,-2);return{type:"strong",raw:p,text:m,tokens:this.lexer.inlineTokens(m)}}}}codespan(e){let t=this.rules.inline.code.exec(e);if(t){let n=t[2].replace(this.rules.other.newLineCharGlobal," "),r=this.rules.other.nonSpaceChar.test(n),o=this.rules.other.startingSpaceChar.test(n)&&this.rules.other.endingSpaceChar.test(n);return r&&o&&(n=n.substring(1,n.length-1)),{type:"codespan",raw:t[0],text:n}}}br(e){let t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){let t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){let t=this.rules.inline.autolink.exec(e);if(t){let n,r;return t[2]==="@"?(n=t[1],r="mailto:"+n):(n=t[1],r=n),{type:"link",raw:t[0],text:n,href:r,tokens:[{type:"text",raw:n,text:n}]}}}url(e){let t;if(t=this.rules.inline.url.exec(e)){let n,r;if(t[2]==="@")n=t[0],r="mailto:"+n;else{let o;do o=t[0],t[0]=this.rules.inline._backpedal.exec(t[0])?.[0]??"";while(o!==t[0]);n=t[0],t[1]==="www."?r="http://"+t[0]:r=t[0]}return{type:"link",raw:t[0],text:n,href:r,tokens:[{type:"text",raw:n,text:n}]}}}inlineText(e){let t=this.rules.inline.text.exec(e);if(t){let n=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:n}}}},Nn=class yl{constructor(t){qt(this,"tokens");qt(this,"options");qt(this,"state");qt(this,"inlineQueue");qt(this,"tokenizer");this.tokens=[],this.tokens.links=Object.create(null),this.options=t||Fr,this.options.tokenizer=this.options.tokenizer||new Mi,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let n={other:yn,block:Li.normal,inline:cs.normal};this.options.pedantic?(n.block=Li.pedantic,n.inline=cs.pedantic):this.options.gfm&&(n.block=Li.gfm,this.options.breaks?n.inline=cs.breaks:n.inline=cs.gfm),this.tokenizer.rules=n}static get rules(){return{block:Li,inline:cs}}static lex(t,n){return new yl(n).lex(t)}static lexInline(t,n){return new yl(n).inlineTokens(t)}lex(t){t=t.replace(yn.carriageReturn,`
`),this.blockTokens(t,this.tokens);for(let n=0;n<this.inlineQueue.length;n++){let r=this.inlineQueue[n];this.inlineTokens(r.src,r.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(t,n=[],r=!1){for(this.options.pedantic&&(t=t.replace(yn.tabCharGlobal,"    ").replace(yn.spaceLine,""));t;){let o;if(this.options.extensions?.block?.some(s=>(o=s.call({lexer:this},t,n))?(t=t.substring(o.raw.length),n.push(o),!0):!1))continue;if(o=this.tokenizer.space(t)){t=t.substring(o.raw.length);let s=n.at(-1);o.raw.length===1&&s!==void 0?s.raw+=`
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
`+o.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=s.text):n.push(o);continue}if(t){let s="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(s);break}else throw new Error(s)}}return this.state.top=!0,n}inline(t,n=[]){return this.inlineQueue.push({src:t,tokens:n}),n}inlineTokens(t,n=[]){let r=t,o=null;if(this.tokens.links){let a=Object.keys(this.tokens.links);if(a.length>0)for(;(o=this.tokenizer.rules.inline.reflinkSearch.exec(r))!=null;)a.includes(o[0].slice(o[0].lastIndexOf("[")+1,-1))&&(r=r.slice(0,o.index)+"["+"a".repeat(o[0].length-2)+"]"+r.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(o=this.tokenizer.rules.inline.anyPunctuation.exec(r))!=null;)r=r.slice(0,o.index)+"++"+r.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let i;for(;(o=this.tokenizer.rules.inline.blockSkip.exec(r))!=null;)i=o[2]?o[2].length:0,r=r.slice(0,o.index+i)+"["+"a".repeat(o[0].length-i-2)+"]"+r.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);r=this.options.hooks?.emStrongMask?.call({lexer:this},r)??r;let s=!1,l="";for(;t;){s||(l=""),s=!1;let a;if(this.options.extensions?.inline?.some(d=>(a=d.call({lexer:this},t,n))?(t=t.substring(a.raw.length),n.push(a),!0):!1))continue;if(a=this.tokenizer.escape(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.tag(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.link(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(a.raw.length);let d=n.at(-1);a.type==="text"&&d?.type==="text"?(d.raw+=a.raw,d.text+=a.text):n.push(a);continue}if(a=this.tokenizer.emStrong(t,r,l)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.codespan(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.br(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.del(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.autolink(t)){t=t.substring(a.raw.length),n.push(a);continue}if(!this.state.inLink&&(a=this.tokenizer.url(t))){t=t.substring(a.raw.length),n.push(a);continue}let u=t;if(this.options.extensions?.startInline){let d=1/0,p=t.slice(1),m;this.options.extensions.startInline.forEach(_=>{m=_.call({lexer:this},p),typeof m=="number"&&m>=0&&(d=Math.min(d,m))}),d<1/0&&d>=0&&(u=t.substring(0,d+1))}if(a=this.tokenizer.inlineText(u)){t=t.substring(a.raw.length),a.raw.slice(-1)!=="_"&&(l=a.raw.slice(-1)),s=!0;let d=n.at(-1);d?.type==="text"?(d.raw+=a.raw,d.text+=a.text):n.push(a);continue}if(t){let d="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(d);break}else throw new Error(d)}}return n}},qi=class{constructor(e){qt(this,"options");qt(this,"parser");this.options=e||Fr}space(e){return""}code({text:e,lang:t,escaped:n}){let r=(t||"").match(yn.notSpaceStart)?.[0],o=e.replace(yn.endingNewline,"")+`
`;return r?'<pre><code class="language-'+ir(r)+'">'+(n?o:ir(o,!0))+`</code></pre>
`:"<pre><code>"+(n?o:ir(o,!0))+`</code></pre>
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
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${ir(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:n}){let r=this.parser.parseInline(n),o=ap(e);if(o===null)return r;e=o;let i='<a href="'+e+'"';return t&&(i+=' title="'+ir(t)+'"'),i+=">"+r+"</a>",i}image({href:e,title:t,text:n,tokens:r}){r&&(n=this.parser.parseInline(r,this.parser.textRenderer));let o=ap(e);if(o===null)return ir(n);e=o;let i=`<img src="${e}" alt="${n}"`;return t&&(i+=` title="${ir(t)}"`),i+=">",i}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:ir(e.text)}},Cl=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}checkbox({raw:e}){return e}},jn=class vl{constructor(t){qt(this,"options");qt(this,"renderer");qt(this,"textRenderer");this.options=t||Fr,this.options.renderer=this.options.renderer||new qi,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new Cl}static parse(t,n){return new vl(n).parse(t)}static parseInline(t,n){return new vl(n).parseInline(t)}parse(t){let n="";for(let r=0;r<t.length;r++){let o=t[r];if(this.options.extensions?.renderers?.[o.type]){let s=o,l=this.options.extensions.renderers[s.type].call({parser:this},s);if(l!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(s.type)){n+=l||"";continue}}let i=o;switch(i.type){case"space":{n+=this.renderer.space(i);break}case"hr":{n+=this.renderer.hr(i);break}case"heading":{n+=this.renderer.heading(i);break}case"code":{n+=this.renderer.code(i);break}case"table":{n+=this.renderer.table(i);break}case"blockquote":{n+=this.renderer.blockquote(i);break}case"list":{n+=this.renderer.list(i);break}case"checkbox":{n+=this.renderer.checkbox(i);break}case"html":{n+=this.renderer.html(i);break}case"def":{n+=this.renderer.def(i);break}case"paragraph":{n+=this.renderer.paragraph(i);break}case"text":{n+=this.renderer.text(i);break}default:{let s='Token with "'+i.type+'" type was not found.';if(this.options.silent)return console.error(s),"";throw new Error(s)}}}return n}parseInline(t,n=this.renderer){let r="";for(let o=0;o<t.length;o++){let i=t[o];if(this.options.extensions?.renderers?.[i.type]){let l=this.options.extensions.renderers[i.type].call({parser:this},i);if(l!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(i.type)){r+=l||"";continue}}let s=i;switch(s.type){case"escape":{r+=n.text(s);break}case"html":{r+=n.html(s);break}case"link":{r+=n.link(s);break}case"image":{r+=n.image(s);break}case"checkbox":{r+=n.checkbox(s);break}case"strong":{r+=n.strong(s);break}case"em":{r+=n.em(s);break}case"codespan":{r+=n.codespan(s);break}case"br":{r+=n.br(s);break}case"del":{r+=n.del(s);break}case"text":{r+=n.text(s);break}default:{let l='Token with "'+s.type+'" type was not found.';if(this.options.silent)return console.error(l),"";throw new Error(l)}}}return r}},Pi,ds=(Pi=class{constructor(e){qt(this,"options");qt(this,"block");this.options=e||Fr}preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}emStrongMask(e){return e}provideLexer(){return this.block?Nn.lex:Nn.lexInline}provideParser(){return this.block?jn.parse:jn.parseInline}},qt(Pi,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens","emStrongMask"])),qt(Pi,"passThroughHooksRespectAsync",new Set(["preprocess","postprocess","processAllTokens"])),Pi),Ib=class{constructor(...e){qt(this,"defaults",kl());qt(this,"options",this.setOptions);qt(this,"parse",this.parseMarkdown(!0));qt(this,"parseInline",this.parseMarkdown(!1));qt(this,"Parser",jn);qt(this,"Renderer",qi);qt(this,"TextRenderer",Cl);qt(this,"Lexer",Nn);qt(this,"Tokenizer",Mi);qt(this,"Hooks",ds);this.use(...e)}walkTokens(e,t){let n=[];for(let r of e)switch(n=n.concat(t.call(this,r)),r.type){case"table":{let o=r;for(let i of o.header)n=n.concat(this.walkTokens(i.tokens,t));for(let i of o.rows)for(let s of i)n=n.concat(this.walkTokens(s.tokens,t));break}case"list":{let o=r;n=n.concat(this.walkTokens(o.items,t));break}default:{let o=r;this.defaults.extensions?.childTokens?.[o.type]?this.defaults.extensions.childTokens[o.type].forEach(i=>{let s=o[i].flat(1/0);n=n.concat(this.walkTokens(s,t))}):o.tokens&&(n=n.concat(this.walkTokens(o.tokens,t)))}}return n}use(...e){let t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(n=>{let r={...n};if(r.async=this.defaults.async||r.async||!1,n.extensions&&(n.extensions.forEach(o=>{if(!o.name)throw new Error("extension name required");if("renderer"in o){let i=t.renderers[o.name];i?t.renderers[o.name]=function(...s){let l=o.renderer.apply(this,s);return l===!1&&(l=i.apply(this,s)),l}:t.renderers[o.name]=o.renderer}if("tokenizer"in o){if(!o.level||o.level!=="block"&&o.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let i=t[o.level];i?i.unshift(o.tokenizer):t[o.level]=[o.tokenizer],o.start&&(o.level==="block"?t.startBlock?t.startBlock.push(o.start):t.startBlock=[o.start]:o.level==="inline"&&(t.startInline?t.startInline.push(o.start):t.startInline=[o.start]))}"childTokens"in o&&o.childTokens&&(t.childTokens[o.name]=o.childTokens)}),r.extensions=t),n.renderer){let o=this.defaults.renderer||new qi(this.defaults);for(let i in n.renderer){if(!(i in o))throw new Error(`renderer '${i}' does not exist`);if(["options","parser"].includes(i))continue;let s=i,l=n.renderer[s],a=o[s];o[s]=(...u)=>{let d=l.apply(o,u);return d===!1&&(d=a.apply(o,u)),d||""}}r.renderer=o}if(n.tokenizer){let o=this.defaults.tokenizer||new Mi(this.defaults);for(let i in n.tokenizer){if(!(i in o))throw new Error(`tokenizer '${i}' does not exist`);if(["options","rules","lexer"].includes(i))continue;let s=i,l=n.tokenizer[s],a=o[s];o[s]=(...u)=>{let d=l.apply(o,u);return d===!1&&(d=a.apply(o,u)),d}}r.tokenizer=o}if(n.hooks){let o=this.defaults.hooks||new ds;for(let i in n.hooks){if(!(i in o))throw new Error(`hook '${i}' does not exist`);if(["options","block"].includes(i))continue;let s=i,l=n.hooks[s],a=o[s];ds.passThroughHooks.has(i)?o[s]=u=>{if(this.defaults.async&&ds.passThroughHooksRespectAsync.has(i))return(async()=>{let p=await l.call(o,u);return a.call(o,p)})();let d=l.call(o,u);return a.call(o,d)}:o[s]=(...u)=>{if(this.defaults.async)return(async()=>{let p=await l.apply(o,u);return p===!1&&(p=await a.apply(o,u)),p})();let d=l.apply(o,u);return d===!1&&(d=a.apply(o,u)),d}}r.hooks=o}if(n.walkTokens){let o=this.defaults.walkTokens,i=n.walkTokens;r.walkTokens=function(s){let l=[];return l.push(i.call(this,s)),o&&(l=l.concat(o.call(this,s))),l}}this.defaults={...this.defaults,...r}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return Nn.lex(e,t??this.defaults)}parser(e,t){return jn.parse(e,t??this.defaults)}parseMarkdown(e){return(t,n)=>{let r={...n},o={...this.defaults,...r},i=this.onError(!!o.silent,!!o.async);if(this.defaults.async===!0&&r.async===!1)return i(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof t>"u"||t===null)return i(new Error("marked(): input parameter is undefined or null"));if(typeof t!="string")return i(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(t)+", string expected"));if(o.hooks&&(o.hooks.options=o,o.hooks.block=e),o.async)return(async()=>{let s=o.hooks?await o.hooks.preprocess(t):t,l=await(o.hooks?await o.hooks.provideLexer():e?Nn.lex:Nn.lexInline)(s,o),a=o.hooks?await o.hooks.processAllTokens(l):l;o.walkTokens&&await Promise.all(this.walkTokens(a,o.walkTokens));let u=await(o.hooks?await o.hooks.provideParser():e?jn.parse:jn.parseInline)(a,o);return o.hooks?await o.hooks.postprocess(u):u})().catch(i);try{o.hooks&&(t=o.hooks.preprocess(t));let s=(o.hooks?o.hooks.provideLexer():e?Nn.lex:Nn.lexInline)(t,o);o.hooks&&(s=o.hooks.processAllTokens(s)),o.walkTokens&&this.walkTokens(s,o.walkTokens);let l=(o.hooks?o.hooks.provideParser():e?jn.parse:jn.parseInline)(s,o);return o.hooks&&(l=o.hooks.postprocess(l)),l}catch(s){return i(s)}}}onError(e,t){return n=>{if(n.message+=`
Please report this to https://github.com/markedjs/marked.`,e){let r="<p>An error occurred:</p><pre>"+ir(n.message+"",!0)+"</pre>";return t?Promise.resolve(r):r}if(t)return Promise.reject(n);throw n}}},jr=new Ib;function Pt(e,t){return jr.parse(e,t)}Pt.options=Pt.setOptions=function(e){return jr.setOptions(e),Pt.defaults=jr.defaults,up(Pt.defaults),Pt};Pt.getDefaults=kl;Pt.defaults=Fr;Pt.use=function(...e){return jr.use(...e),Pt.defaults=jr.defaults,up(Pt.defaults),Pt};Pt.walkTokens=function(e,t){return jr.walkTokens(e,t)};Pt.parseInline=jr.parseInline;Pt.Parser=jn;Pt.parser=jn.parse;Pt.Renderer=qi;Pt.TextRenderer=Cl;Pt.Lexer=Nn;Pt.lexer=Nn.lex;Pt.Tokenizer=Mi;Pt.Hooks=ds;Pt.parse=Pt;var l0=Pt.options,c0=Pt.setOptions,u0=Pt.use,d0=Pt.walkTokens,p0=Pt.parseInline;var f0=jn.parse,_0=Nn.lex;function yr(e){let t=Pt.parse(e),n=np.sanitize(t);return rp(n)}function ar(e,t){return c`<div class="prompt-block">
    <div class="prompt-block__label">${e}</div>
    <pre class="prompt-block__body">${t}</pre>
  </div>`}function ko(e){return e.loading?c`<div class="prompt-block__status">불러오는 중…</div>`:e.error?c`<div class="prompt-block__status prompt-block__status--error">
      프롬프트를 불러오지 못했습니다
    </div>`:""}function Fi(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),n=r=>String(r).padStart(2,"0");return`${t.getFullYear()}-${n(t.getMonth()+1)}-${n(t.getDate())} ${n(t.getHours())}:${n(t.getMinutes())}`}var wp={Read:"\u{1F4D6}",Edit:"\u270E",MultiEdit:"\u270E",Write:"\u{1F4DD}",Bash:"\u26A1",Grep:"\u{1F50E}",Glob:"\u{1F50E}",Task:"\u{1F916}",Agent:"\u{1F916}",WebFetch:"\u{1F310}",WebSearch:"\u{1F310}"},Lb={command_execution:"\uBA85\uB839 \uC2E4\uD589",file_change:"\uD30C\uC77C \uBCC0\uACBD",mcp_call:"MCP \uD638\uCD9C",web_search:"\uC6F9 \uAC80\uC0C9",plan:"\uACC4\uD68D"},Pb=/^\s*([✓✗⊘])\s*(spec|impl|implementation|plan)\s*게이트\s*[—–-]\s*(\S+)\s+(APPROVE|REVISE|REJECT|BLOCK|SKIP)(?:\s*·\s*(.+))?/,Db=/^\s*#{0,3}\s*Phase\s+\d+(?:\s*\/\s*\d+)?\s*(?:[·:—–-]\s*.+)?$/;function Fn(e){return!!e&&typeof e=="object"}function Rl(e){return typeof e!="string"||e.length===0?[]:e.split(/\r?\n/)}function Ol(e,t){let n=Rl(e),r=Rl(t),o=new Map;for(let l of n)o.set(l,(o.get(l)||0)+1);let i=0;for(let l of r){let a=o.get(l)||0;a>0?o.set(l,a-1):i+=1}let s=0;for(let l of o.values())s+=l;return{added:i,removed:s}}function $p(e){let t="";typeof e=="string"?t=e:Array.isArray(e)?t=e.map(o=>Fn(o)&&typeof o.text=="string"?o.text:"").join(""):Fn(e)&&typeof e.text=="string"&&(t=e.text);let r=(String(t).split(/\r?\n/).find(o=>o.trim().length>0)||"").trim();return r.length>120?`${r.slice(0,117)}\u2026`:r}function Mb(e){let t=String(e.name||""),n=e.input||{},r={kind:"tool",tool:t,icon:wp[t]||"\u{1F527}",input:n,expandable:!0};if((t==="Read"||t==="Write")&&(r.path=String(n.file_path||n.path||"")),t==="Write"&&(r.added=Rl(n.content).length),t==="Edit"){r.path=String(n.file_path||n.path||"");let{added:o,removed:i}=Ol(n.old_string,n.new_string);r.added=o,r.removed=i}if(t==="MultiEdit"){r.path=String(n.file_path||n.path||"");let o=0,i=0,s=Array.isArray(n.edits)?n.edits:[];for(let l of s){let a=Ol(Fn(l)?l.old_string:"",Fn(l)?l.new_string:"");o+=a.added,i+=a.removed}r.added=o,r.removed=i}return t==="Bash"&&(r.command=String(n.command||"")),(t==="Grep"||t==="Glob")&&(r.command=String(n.pattern||n.query||"")),t==="Agent"&&(typeof e.id=="string"&&e.id.length>0&&(r.launch_id=e.id),typeof n.description=="string"&&(r.command=n.description)),r}function Il(e){return typeof e!="string"||e.trim().length===0?null:{kind:"thinking",text:e}}var qb=/<system-reminder>[\s\S]*?<\/system-reminder>/g;function xp(e){let t;if(typeof e=="string")t=e;else if(Array.isArray(e))t=e.filter(r=>Fn(r)&&r.type==="text"&&typeof r.text=="string").map(r=>String(r.text)).join(`
`);else return null;let n=t.replace(qb,"").trim();return n.length>0?{kind:"user",text:n}:null}function Ll(e){let t=e.split(/\r?\n/).find(r=>r.trim().length>0)||"",n=Pb.exec(t);return n?{kind:"gate",gate:n[2]==="implementation"?"impl":n[2],reviewer:n[3],verdict:n[4],time:n[5]?n[5].trim():void 0,text:t.trim()}:Db.test(t)&&t.trim().length<=80?{kind:"phase",text:t.trim()}:{kind:"assistant",text:e}}function Nb(e,t){if(e.subtype==="init"){let n=typeof e.model=="string"?e.model:"";return t.progress=null,[{kind:"thinking",text:n?`\uC138\uC158 \uC2DC\uC791 \xB7 ${n}`:"\uC138\uC158 \uC2DC\uC791"}]}if(e.subtype==="thinking_tokens"){let r=`\uC0DD\uAC01 \uC911\u2026 ${typeof e.estimated_tokens=="number"&&Number.isFinite(e.estimated_tokens)?Math.max(0,Math.round(e.estimated_tokens)):0} \uD1A0\uD070`;return t.progress?(t.progress.text=r,[]):(t.progress={kind:"thinking",text:r},[t.progress])}return[]}function jb(e,t){let n=typeof e.parent_tool_use_id=="string"&&e.parent_tool_use_id.length>0?e.parent_tool_use_id:null;if(e.type==="assistant"){let r=e.message,o=r&&Array.isArray(r.content)?r.content:[],i=[];for(let s of o)if(Fn(s)){if(s.type==="text"&&typeof s.text=="string")i.push(Ll(s.text));else if(s.type==="thinking"){let l=Il(s.thinking);l&&i.push(l)}else if(s.type==="tool_use"){let l=Mb(s);typeof s.id=="string"&&t.set(s.id,l),i.push(l)}}return n?kp(i,n):i}if(e.type==="user"){let r=e.message,o=r&&Array.isArray(r.content)?r.content:[];for(let s of o)if(Fn(s)&&s.type==="tool_result"){let l=t.get(String(s.tool_use_id));if(l){let a=$p(s.content);l.result=a,l.output=typeof s.content=="string"?s.content:a,s.is_error===!0&&(l.is_error=!0)}}let i=xp(r&&r.content);return i?[i]:[]}if(e.type==="result"){let r=e.is_error===!1&&e.subtype==="success",o={kind:"result",success:r,text:typeof e.result=="string"?e.result:r?"DONE":""};return n?kp([o],n):[o]}return[]}function kp(e,t){for(let n of e)n.parent_tool_use_id=t;return e}function Fb(e){let t=typeof e.command=="string"?e.command:"",n=$p(e.aggregated_output===void 0?e.output:e.aggregated_output),o=[typeof e.exit_code=="number"&&Number.isFinite(e.exit_code)?`exit ${e.exit_code}`:typeof e.status=="string"&&e.status.length>0?e.status:"",n].filter(s=>s.length>0).join(" \xB7 "),i={kind:"tool",tool:"shell",icon:wp.Bash,command:t,input:{command:t},expandable:!0};return o.length>0&&(i.result=o),typeof e.aggregated_output=="string"&&(i.output=e.aggregated_output),i}function Bb(e){if(e.type==="item.completed"&&Fn(e.item)){let t=e.item;if(t.type==="agent_message"&&typeof t.text=="string")return[Ll(t.text)];if(t.type==="user_message"){let n=xp(t.text);return n?[n]:[]}if(t.type==="reasoning"){let n=Il(t.text);return n?[n]:[]}return t.type==="error"?[{kind:"error",text:String(t.message||"")}]:t.type==="command_execution"?[Fb(t)]:[]}if(e.type==="turn.completed")return[{kind:"result",success:!0,text:"DONE"}];if(e.type==="turn.failed"){let t=e.error;return[{kind:"error",text:t&&typeof t.message=="string"?t.message:"turn failed"}]}return e.type==="error"?[{kind:"error",text:String(e.message||"")}]:[]}function Ub(e){if(e.schema!=="codex-delegation-monitor-v1"||!Fn(e.event))return[];let t=e.event;if(t.type==="session.started"||t.type==="turn.started")return[];if((t.type==="item.started"||t.type==="item.completed")&&Fn(t.item)){let n=t.item;if(typeof n.id!="string"||n.id.length===0)return[];if(t.type==="item.completed"&&n.kind==="agent_message"&&typeof n.text=="string"&&n.text.trim().length>0)return[Ll(n.text)];if(t.type==="item.completed"&&n.kind==="reasoning"){let s=Il(n.text);return s?[s]:[]}if(t.type!=="item.completed"||n.kind!=="activity"||typeof n.activity!="string")return[];let r=Lb[n.activity];if(!r)return[];let o,i;if(n.status==="completed")o="\uC644\uB8CC",i="\u2713";else if(n.status==="failed")o="\uC2E4\uD328",i="\u2717";else return[];return[{kind:"tool",tool:`${r} \xB7 ${o}`,icon:i,expandable:!1,result:""}]}return t.type==="turn.completed"&&t.status==="completed"?[{kind:"result",success:!0,text:"DONE"}]:t.type==="turn.failed"&&(t.status==="failed"||t.status==="interrupted")&&typeof t.error_code=="string"&&t.error_code.length>0?[{kind:"error",text:t.error_code}]:[]}function Wb(e){let t=e.type;return typeof t=="string"&&(t==="error"||t.startsWith("thread.")||t.startsWith("turn.")||t.startsWith("item."))}function zb(e){let t=e;if(typeof e=="string"){let n=e.trim();if(n.length===0)return null;try{t=JSON.parse(n)}catch{return null}}return Fn(t)?t:null}function Ap(e={}){let t=e.skip_delegated===!0,n=new Map,r={progress:null};return{push(o){let i=zb(o);if(!i)return[];if(t&&typeof i.parent_tool_use_id=="string"&&i.parent_tool_use_id.length>0)return[];if(i.type==="system"&&i.schema!=="codex-delegation-monitor-v1")return Nb(i,r);let s=i.schema==="codex-delegation-monitor-v1"?Ub(i):Wb(i)?Bb(i):jb(i,n);return s.length>0&&(r.progress=null),s}}}function Pl(e){let t=[],n=Ap(),r=Array.isArray(e)?e:[];for(let o of r)for(let i of n.push(o))t.push(i);return t}var Hb=5,Kb=10,Gb=/Task\s+#(\d+)/,Yb=/\bgh\s+pr\s+create\b|\bgit\s+push\b/,Vb=/\bnpm\s+(?:run\s+)?(?:test|tsc|lint|build)\b|\bvitest\b/;function _s(e){return typeof e!="string"?"":(e.split(/\r?\n/).find(t=>t.trim().length>0)||"").trim()}function Qb(e){return typeof e!="string"||e.length===0?0:e.split(/\r?\n/).length}function Xb(e){for(let t=e.length-1;t>=0;t-=1){let n=e[t];if(n.kind==="phase"||n.kind==="gate")return n.text||null}return null}function Zb(e){let t=new Map,n=0;for(let o of e){if(o.kind!=="tool")continue;n+=1;let i=o.input||{};if(o.tool==="TaskCreate"){let a=Gb.exec(o.output||o.result||""),u=String(i.activeForm||i.subject||"").trim();if(!a||u.length===0)continue;t.set(a[1],{label:u,active:i.status==="in_progress"?n:0});continue}if(o.tool!=="TaskUpdate")continue;let s=t.get(String(i.taskId??""));if(!s)continue;let l=i.activeForm||i.subject;typeof l=="string"&&l.trim().length>0&&(s.label=l.trim()),typeof i.status=="string"&&(s.active=i.status==="in_progress"?n:0)}let r=null;for(let o of t.values())o.active>0&&(!r||o.active>r.active)&&(r=o);return r?r.label:null}function Jb(e){if(e.tool==="Bash"){let t=e.command||"";return Yb.test(t)?"~ PR/\uAC8C\uC2DC \uC911":Vb.test(t)?"~ \uAC80\uC99D \uC911":null}return e.tool==="Edit"||e.tool==="Write"||e.tool==="MultiEdit"?"~ \uAD6C\uD604 \uC911":e.tool==="Read"||e.tool==="Grep"||e.tool==="Glob"?"~ \uD0D0\uC0C9 \uC911":null}function ey(e){let t=e.filter(o=>o.kind==="tool").slice(-Kb),n=new Map;t.forEach((o,i)=>{let s=Jb(o);if(!s)return;let l=n.get(s)||{count:0,last:-1};l.count+=1,l.last=i,n.set(s,l)});let r=null;for(let[o,i]of n)(!r||i.count>r.count||i.count===r.count&&i.last>r.last)&&(r={label:o,count:i.count,last:i.last});return r?r.label:null}function ty(e){let t=Xb(e);if(t)return{text:t,guess:!1};let n=Zb(e);if(n)return{text:n,guess:!1};let r=ey(e);return r?{text:r,guess:!0}:null}function ny(e,t){if(typeof e!="number")return"";let n=Math.max(0,Math.floor((t-e)/1e3));return n<60?`${n}\uCD08 \uC804`:fn(e,t)}function wo(e,t={}){let{transport:n,sessionLogStore:r,onClose:o}=t,i=null,s=null,l=null,a=null,u=null,d=!1,p={},m=!0,_=new Set,w=new Set,R=null,I=null,U=!1,se=!1,W=!1,j=null,O=null;function q(){U=!1,se=!1,W=!1,j=null,O=null}async function z(te){if(n){se=!0,W=!1,Le();try{let V=await Promise.resolve(n("get-attempt-prompt",{attempt_id:te,...u?{root_dir:u}:{}}));if(i!==te)return;!V||typeof V!="object"||Array.isArray(V)?W=!0:(j=V,O=te)}catch{i===te&&(W=!0)}finally{i===te&&(se=!1,Le())}}}function Y(){if(U=!U,U&&i&&O!==i){z(i);return}Le()}function N(){if(!U)return"";let te=ko({loading:se,error:W});if(te)return c`<div class="sv__prompt" data-seam="attempt-prompt">
        ${te}
      </div>`;if(!j)return"";if(j.missing)return c`<div class="sv__prompt" data-seam="attempt-prompt">
        <div class="prompt-block__status">
          기록 없음 — 프롬프트 기록 이전에 실행된 attempt입니다
        </div>
      </div>`;let V=Fi(j.recorded_at);return c`<div class="sv__prompt" data-seam="attempt-prompt">
      ${V?c`<div class="prompt-block__meta">${V} 발송</div>`:""}
      ${typeof j.task_prompt=="string"?ar("\uACFC\uC5C5 (user)",j.task_prompt):""}
      ${typeof j.system_prompt=="string"?ar("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",j.system_prompt):""}
    </div>`}function F(){if(!a||!r)return[];let te=r.get(a);return Pl(te?te.lines:[])}function H(){if(!a||!r)return null;let te=r.get(a),V=te?te.last_event_at:null;return typeof V=="number"?V:null}function G(){return p.status==="running"}function ee(){if(G()&&i){I||(I=setInterval(()=>Le(),1e3));return}ye()}function ye(){I&&(clearInterval(I),I=null)}function qe(te){let V=[],$e=0;for(;$e<te.length;){let{idx:_t,line:at}=te[$e];if(at.kind==="tool"){let Ke=$e;for(;Ke<te.length&&te[Ke].line.kind==="tool"&&te[Ke].line.tool===at.tool;)Ke+=1;if(Ke-$e>=Hb&&!w.has(_t)){V.push({kind:"group",idx:_t,tool:at.tool||"",lines:te.slice($e,Ke)}),$e=Ke;continue}}V.push({kind:"line",idx:_t,line:at}),$e+=1}return V}function B(te){let V=[],$e=new Map;for(let Ke=0;Ke<te.length;Ke+=1){let $=te[Ke],J=$.parent_tool_use_id;if(typeof J=="string"&&J.length>0){let Re=$e.get(J);Re||(Re={kind:"subagent",idx:Ke,launch_id:J,agent_type:null,header:null,lines:[]},$e.set(J,Re),V.push(Re)),Re.lines.push({idx:Ke,line:$});continue}if($.kind==="tool"&&$.tool==="Agent"&&typeof $.launch_id=="string"&&$.launch_id.length>0){let Re=X($),je=$e.get($.launch_id);if(je){je.header={idx:Ke,line:$},je.agent_type=Re;continue}let Je={kind:"subagent",idx:Ke,launch_id:$.launch_id,agent_type:Re,header:{idx:Ke,line:$},lines:[]};$e.set($.launch_id,Je),V.push(Je);continue}V.push({kind:"entry",idx:Ke,line:$})}let _t=[],at=0;for(;at<V.length;){if(V[at].kind!=="entry"){_t.push(V[at]),at+=1;continue}let Ke=at;for(;Ke<V.length&&V[Ke].kind==="entry";)Ke+=1;_t.push(...qe(V.slice(at,Ke))),at=Ke}return _t}function X(te){let V=te.input;return V&&typeof V.subagent_type=="string"?V.subagent_type:null}function Se(te){for(let V=te.length-1;V>=0;V-=1){let $e=te[V];if($e.kind==="result"||$e.kind==="error")return null;if($e.kind==="tool"&&!Object.hasOwn($e,"result"))return $e}return null}function Ee(te){for(let V=te.length-1;V>=0;V-=1)if(te[V].kind==="thinking")return te[V];return null}function C(te,V){if(V.kind==="gate")return c`<div class="sv__gate">${V.text}</div>`;if(V.kind==="phase")return c`<div class="sv__phase">${V.text}</div>`;if(V.kind==="result")return c`<div
        class="sv__result${V.success?" sv__result--ok":" sv__result--fail"}"
      >
        <span class="sv__result-glyph">${V.success?"\u2713":"\u2717"}</span>
        <span class="sv__result-body"
          >${yr(V.text||(V.success?"DONE":"\uC2E4\uD328"))}</span
        >
      </div>`;if(V.kind==="thinking"){let $e=_.has(te);return c`<div
        class="sv__think${$e?" sv__think--expanded":""}"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>it(te)}
      >
        <span class="sv__think-line">💭 ${_s(V.text)}</span>
        ${$e?c`<pre class="sv__think-expand">${V.text}</pre>`:""}
      </div>`}if(V.kind==="user"){let $e=_.has(te);return c`<div
        class="sv__line sv__line--user${$e?" sv__line--expanded":""}"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>it(te)}
      >
        <span class="sv__user-line">▷ ${_s(V.text)}</span>
        ${$e?c`<pre class="sv__user-expand">${V.text}</pre>`:""}
      </div>`}if(V.kind==="error")return c`<div class="sv__error">⛔ ${V.text}</div>`;if(V.kind==="blocker")return c`<div class="sv__error">⛔ ${V.text}</div>`;if(V.kind==="tool"){let $e=_.has(te),_t=V.tool==="Bash"?Qb(V.command):0,at=V.tool==="Bash"?_t>1?_s(V.command):V.command:V.path||V.command||"";return c`<div
        class="sv__tool${$e?" sv__tool--expanded":""}"
        role="button"
        tabindex="0"
        @click=${()=>it(te)}
      >
        <span class="sv__tool-line">
          <span class="sv__tool-icon">${V.icon}</span>
          <span class="sv__tool-name">${V.tool}</span>
          ${at?c`<span class="sv__tool-detail">${at}</span>`:""}
          ${_t>1?c`<span class="sv__tool-more">⋯ ${_t}줄</span>`:""}
          ${typeof V.added=="number"?c`<span class="sv__diff-add">+${V.added}</span>`:""}
          ${typeof V.removed=="number"?c`<span class="sv__diff-del">−${V.removed}</span>`:""}
          ${V.result?c`<span class="sv__tool-ok">→ ${V.result}</span>`:""}
        </span>
        ${$e?c`<pre class="sv__tool-expand">${re(V)}</pre>`:""}
      </div>`}return c`<div class="sv__as">${yr(V.text||"")}</div>`}function re(te){let V=[];if(te.tool==="Bash"&&typeof te.command=="string"&&te.command.length>0)V.push(te.command);else if(te.input!==void 0)try{V.push(`input: ${JSON.stringify(te.input,null,2)}`)}catch{}return typeof te.output=="string"&&te.output.length>0&&V.push(`output:
${te.output}`),V.join(`

`)}function ke(){if(!i)return c``;let te=F(),V=(s?[p.agent_type,p.model,p.effort]:[p.runner,p.model,p.effort]).filter(Boolean).join(" \xB7 "),$e=p.session_id||"",_t=`\uB77C\uC774\uBE0C \uB530\uB77C\uAC00\uAE30 ${m?"ON":"OFF"}`,at=G(),Ke=at?ny(H(),Date.now()):"",$=at?Se(te):null,J=at?Ee(te):null,Re=ty(te);return c`<div class="sv" data-attempt-id=${i}>
      <div class="sv__bar">
        <span class="sv__id"
          >${p.label||(s?p.role||"":i)}</span
        >
        ${Re?c`<span
              class="sv__stage${Re.guess?" sv__stage--guess":""}"
              title=${Re.text}
              >${Re.text}</span
            >`:""}
        ${at?c`<span
              class="sv__live"
              title="세션이 진행 중입니다"
              aria-label=${Ke?`\uC9C4\uD589 \uC911 \xB7 \uB9C8\uC9C0\uB9C9 \uC774\uBCA4\uD2B8 ${Ke}`:"\uC9C4\uD589 \uC911"}
              ><span class="sv__live-dot" aria-hidden="true"></span>${Ke?c`<span class="sv__live-ago">${Ke}</span>`:""}</span
            >`:""}
        ${$e?c`<button
              type="button"
              class="sv__session"
              title=${$e}
              aria-label=${`\uC138\uC158 ID \uBCF5\uC0AC: ${$e}`}
              @click=${()=>ce($e)}
            >
              ⧉ ${$e.slice(0,8)}
            </button>`:""}
        ${p.resume_command?c`<button
              type="button"
              class="sv__resume-cmd"
              title=${p.resume_command}
              aria-label=${`\uC7AC\uAC1C \uBA85\uB839 \uBCF5\uC0AC: ${p.resume_command}`}
              @click=${()=>ce(p.resume_command||"")}
            >
              ⧉ 재개 명령
            </button>`:""}
        ${V?c`<span class="sv__meta">${V}</span>`:""}
        ${p.worktree?c`<span class="sv__wt" title=${p.worktree}
              >${p.worktree}</span
            >`:""}
        ${s||d?"":c`<button
              type="button"
              class="sv__prompt-toggle${U?" sv__prompt-toggle--on":""}"
              data-seam="attempt-prompt-toggle"
              aria-pressed=${U?"true":"false"}
              aria-label="발송 프롬프트 보기"
              title="이 세션에 실제로 보낸 시스템·과업 프롬프트"
              @click=${Y}
            >
              ✉ 프롬프트
            </button>`}
        <button
          type="button"
          class="sv__follow${m?" sv__follow--on":""}"
          aria-pressed=${m?"true":"false"}
          aria-label=${_t}
          @click=${P}
        >
          <span class="sv__follow-full">⇣ ${_t}</span>
          <span class="sv__follow-short">⇣ ${m?"ON":"OFF"}</span>
        </button>
        <button
          type="button"
          class="sv__close"
          aria-label="닫기"
          @click=${()=>Fe()}
        >
          ✕
        </button>
      </div>
      ${s||d?"":N()}
      <div class="sv__body">
        ${te.length===0?c`<div class="sv__empty">세션 로그 없음</div>`:B(te).map(je=>je.kind==="subagent"?Me(je):je.kind==="group"?ve(je):C(je.idx,je.line))}
      </div>
      ${$||J?c`<div class="sv__now">
            <span class="sv__now-label">지금</span>
            ${$?c`<span class="sv__now-icon">${$.icon}</span>
                  <span class="sv__now-name">${$.tool}</span>
                  <span class="sv__now-detail"
                    >${$.tool==="Bash"?_s($.command):$.path||$.command||""}</span
                  >`:""}
            ${J?c`<span class="sv__now-think"
                  >💭 ${_s(J.text)}</span
                >`:""}
          </div>`:""}
    </div>`}function ve(te){return c`<div
      class="sv__group"
      role="button"
      tabindex="0"
      title="펼치기"
      @click=${()=>he(te.idx)}
    >
      <span class="sv__group-icon">${te.lines[0].line.icon}</span>
      <span class="sv__group-name">${te.tool}</span>
      <span class="sv__group-count">${te.lines.length}</span>
      <span class="sv__group-caret" aria-hidden="true">▸</span>
    </div>`}function Me(te){let V=w.has(te.idx),$e=te.header?te.header.line:null,_t=$e?$e.is_error===!0?"\u2717":typeof $e.result=="string"?"\u2713":"\u27F3":"",at=$e&&$e.command?$e.command:"";return c`<div class="sv__sub${V?" sv__sub--open":""}">
      <div
        class="sv__sub-head"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>he(te.idx)}
      >
        <span class="sv__sub-icon" aria-hidden="true">🤖</span>
        <span class="sv__sub-name">${te.agent_type||"subagent"}</span>
        ${at?c`<span class="sv__sub-detail">${at}</span>`:""}
        <span class="sv__sub-count">${te.lines.length}줄</span>
        ${_t?c`<span class="sv__sub-state">${_t}</span>`:""}
        ${V?"":c`<span class="sv__sub-caret" aria-hidden="true">▸</span>`}
      </div>
      ${V?c`<div class="sv__sub-body">
            ${qe(te.lines).map(Ke=>Ke.kind==="group"?ve(Ke):C(Ke.idx,Ke.line))}
          </div>`:""}
    </div>`}function he(te){w.add(te),Le()}function Le(){dt(ke(),e),ee(),m&&Xe()}function Xe(){let te=e.querySelector(".sv__body");te&&(te.scrollTop=te.scrollHeight)}function it(te){_.has(te)?_.delete(te):_.add(te),Le()}function P(){m=!m,Le()}function ce(te){_n(te).then(V=>{V?be("\uBCF5\uC0AC\uB428","success",1200):be("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function ie(te){!i||!te||(p={...p,...te},Le())}function de(te){let V=te.target;if(!V||!V.classList||!V.classList.contains("sv__body"))return;!(V.scrollHeight-V.scrollTop-V.clientHeight<=4)&&m&&(m=!1,Le())}e.addEventListener("scroll",de,!0);function Te(te){let V=te.target;!V||typeof V.closest!="function"||e.contains(V)||V.closest("dialog")||V.closest(".md-viewer-root")||Fe()}let _e=!1;function De(){_e||(document.addEventListener("mousedown",Te),_e=!0)}function Be(){_e&&(document.removeEventListener("mousedown",Te),_e=!1)}function Qe(te){let V=te&&te.attempt_id;if(!V)return;let $e=typeof te.launch_id=="string"&&te.launch_id.length>0?te.launch_id:null,_t=te.session_ref&&typeof te.session_ref=="object"?te.session_ref:null;if($e&&_t)return;let at=a;i=V,s=$e,l=_t,a=s?`session-log:${i}:${s}`:`session-log:${i}`,n&&at&&at!==a&&Promise.resolve(n("unsubscribe-session-log",{id:at})).catch(()=>{}),u=typeof te.root_dir=="string"&&te.root_dir.length>0?te.root_dir:null,p=te.meta||{},d=te.hide_prompt===!0,m=!0,_.clear(),w.clear(),q(),!R&&r&&(R=r.subscribe(Le)),n&&Promise.resolve(n("subscribe-session-log",{id:a,attempt_id:i,...s?{launch_id:s}:{},...l?{session_ref:l}:{},...u?{root_dir:u}:{}})).catch(()=>{}),De(),Le()}function Fe(){let te=a;Be(),i=null,s=null,l=null,a=null,u=null,d=!1,_.clear(),w.clear(),q(),ye(),n&&te&&Promise.resolve(n("unsubscribe-session-log",{id:te})).catch(()=>{}),dt(c``,e),o&&o()}return{open:Qe,updateMeta:ie,close:Fe,isOpen(){return i!==null},destroy(){ye(),Be(),R&&(R(),R=null),e.removeEventListener("scroll",de,!0),i=null,s=null,l=null,a=null,u=null,d=!1,dt(c``,e)}}}function ry(e){let t=[],n=e?.workflow?.stages,r=n?.spec?.doc;r&&t.push({kind:"spec",path:r.path,missing_state:r.missing_state});let o=n?.plan?.doc;return o&&t.push({kind:"plan",path:o.path,missing_state:o.missing_state}),t}function Sp(e,t){let n=ry(e);return c`
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
  `}var oy="## \u{1F916} \uC791\uC5C5 \uBCF4\uACE0\uC11C",sy=/^> (worker · attempt|session · sid) ([A-Za-z0-9._-]{1,64}) · (\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z)$/,iy=/^\*\*결론\*\* — (.+)$/;function Bi(e){if(typeof e!="string"||e.length===0)return null;let t=e.split(/\r?\n/);if(t[0]!==oy)return null;let n=sy.exec(t[1]||"");if(!n)return null;let r=n[1].split(" ")[0],o=n[2],i=n[3],s=2;for(;s<t.length&&t[s].trim().length===0;)s+=1;let l=s<t.length?iy.exec(t[s]):null,a=l?l[1].replace(/\s+/g," ").trim():"",u=l?s+1:s;return{lane:r,identifier:o,timestamp:i,conclusion:a,body:t.slice(u).join(`
`).trim()}}var Ep=20;function Tp(e){if(e==null||e==="")return"";let t=new Date(e);if(Number.isNaN(t.getTime()))return"";let n=String(t.getMonth()+1).padStart(2,"0"),r=String(t.getDate()).padStart(2,"0"),o=String(t.getHours()).padStart(2,"0"),i=String(t.getMinutes()).padStart(2,"0");return`${n}-${r} ${o}:${i}`}function ay(e){return e.length>Ep?`${e.slice(0,Ep)}\u2026`:e}function ly(e,t,n,r){let o=`${t.lane} ${ay(t.identifier)}`;return c`<div class="detail-report">
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
        <span class="detail-report__time">${Tp(t.timestamp)}</span>
      </span>
      <span class="detail-report__concl">${t.conclusion}</span>
    </button>
    ${r&&t.body.length>0?c`<div class="detail-report__body">
          ${yr(t.body)}
        </div>`:""}
  </div>`}function cy(e){return c`<div class="detail-comment" data-comment-id=${e.id}>
    <div class="detail-comment__meta">
      <span class="detail-comment__author"
        >${e.author||"(\uC791\uC131\uC790 \uC5C6\uC74C)"}</span
      >
      <span class="detail-comment__time"
        >${Tp(e.created_at)}</span
      >
    </div>
    <div class="detail-comment__body">
      ${yr(typeof e.text=="string"?e.text:"")}
    </div>
  </div>`}function Cp(e,t={},n={}){let r=Array.isArray(e)?e.filter(Boolean):[],o=n.expanded||new Set,i=typeof n.draft=="string"?n.draft:"",s=n.sending===!0,l=r.slice().sort((a,u)=>String(u.created_at||"").localeCompare(String(a.created_at||"")));return c`
    <div class="detail-section-label">댓글 (${r.length})</div>
    ${n.error?c`<div class="detail-empty" data-seam="comments-error">
          댓글을 불러오지 못했습니다
        </div>`:l.length===0?c`<div class="detail-empty" data-seam="comments">댓글 없음</div>`:c`<div class="detail-comments" data-seam="comments">
            ${l.map(a=>{let u=Bi(typeof a.text=="string"?a.text:"");return u?ly(a,u,t,o.has(a.id)):cy(a)})}
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
  `}var{I:G0}=uc;var Rp=e=>e.strings===void 0;var uy={},Op=(e,t=uy)=>e._$AH=t;var vr=Ii(class extends vo{constructor(e){if(super(e),e.type!==sr.PROPERTY&&e.type!==sr.ATTRIBUTE&&e.type!==sr.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!Rp(e))throw Error("`live` bindings can only contain a single expression")}render(e){return e}update(e,[t]){if(t===Tn||t===zt)return t;let n=e.element,r=e.name;if(e.type===sr.PROPERTY){if(t===n[r])return Tn}else if(e.type===sr.BOOLEAN_ATTRIBUTE){if(!!t===n.hasAttribute(r))return Tn}else if(e.type===sr.ATTRIBUTE&&n.getAttribute(r)===t+"")return Tn;return Op(e),t}});var dy=[{id:"spec",label:"spec \uB9AC\uBDF0",receipt:"spec_review",receipt_stage:null,fill_stage:"spec",stale_stage:"spec",hue:"spec"},{id:"plan",label:"\uACC4\uD68D \uB9AC\uBDF0",receipt:null,receipt_stage:"plan",fill_stage:"plan",stale_stage:"plan",hue:"plan"},{id:"impl",label:"\uAD6C\uD604",receipt:null,receipt_stage:null,fill_stage:"impl",stale_stage:null,hue:"impl"},{id:"impl_review",label:"impl \uB9AC\uBDF0",receipt:"impl_review",receipt_stage:null,fill_stage:null,stale_stage:"impl",hue:"impl"},{id:"pr",label:"PR",receipt:null,receipt_stage:null,fill_stage:"pr",stale_stage:null,hue:"pr"}],Dl={quick_fix:["impl","impl_review"],spec_backed:["spec","impl","impl_review","pr"],full_plan:["spec","plan","impl","impl_review","pr"]},Ip={missing:"\uC2B9\uC778 \uD544\uC694",stale:"\uC7AC\uC2B9\uC778 \uD544\uC694",unknown:"\uC2B9\uC778 \uD655\uC778 \uBD88\uAC00"},py={pin:"pin",global:"global",base:"base"};function fy(e){return c`<span
    class=${`detail-layer-rail detail-layer-rail--${py[e]}`}
    data-source=${e}
    aria-hidden="true"
    ><i></i><i></i><i></i
  ></span>`}function _y(e,t,n){switch(e){case"workflow_mode":return Mo;case"spec_review_model":case"impl_review_model":return qo;case"plan_review_model":return Ys;case"spec_review_effort":case"plan_review_effort":case"impl_review_effort":return Vs;case"spec_review_speed":case"plan_review_speed":case"impl_review_speed":return Gn;case"impl_dispatch":return Do;case"impl_runtime":return Gs;case"impl_model":return po(n,t.impl_runtime);case"impl_effort":return Lr(n,t.impl_runtime,t.impl_model);case"impl_speed":case"orchestration_speed":return Gn;case"orchestration_model":return fo(n,null);case"orchestration_effort":return Lr(n,void 0,t.orchestration_model||$n).filter(r=>r!==$n);default:return[]}}function my(e,t){return c`<div class="detail-effective__row" data-key=${e.key}>
    ${fy(e.source)}
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
      >${Xs[e.source]}</span
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
  </div>`}function Lp(e,t){let n=Ma.flatMap(a=>a.keys),r=qa(n,e.metadata,e.workspace_values,e.execution_defaults,e.catalog,e.controller_runtime||null),o=Ou(n,e.metadata,e.workspace_values,e.execution_defaults,e.catalog,e.controller_runtime||null),i=Object.fromEntries(r.map(a=>[a.key,a])),s=Object.fromEntries(r.filter(a=>a.value!==null).map(a=>[a.key,a.value])),l=r.filter(a=>a.full_value&&a.display!==a.full_value).map(a=>a.full_value).join(" \xB7 ");return c`<details
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
        >${gy(i)}</span
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
          ${Ma.map(a=>c`
              <div class="detail-effective__subhead">${a.label}</div>
              ${r.filter(u=>a.keys.includes(u.key)).map(u=>{let d=Ws({key:u.key,choices:_y(u.key,s,e.catalog),layer:"pin",pin:e.metadata,global:e.workspace_values,execution_defaults:e.execution_defaults,runner_catalog:e.catalog,route:typeof e.metadata?.route=="string"?e.metadata.route:null,controller_runtime:e.controller_runtime||null});return my(u,{expanded:e.expanded,options:d.options,default_label:d.unset_label,default_full_value:d.full_value,onEdit:t.onEdit})})}
            `)}
          <div class="detail-effective__foot">
            <select
              data-impl-preset-select
              aria-label="실행 프리셋"
              .value=${vr(e.preset_id)}
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
  </details>`}function gy(e){let t=[];if(e.workflow_mode&&t.push(e.workflow_mode.display),e.impl_dispatch?.value==="main")t.push("\uBA54\uC778");else if(e.impl_dispatch?.value==="delegated"){let n=e.impl_runtime?` ${e.impl_runtime.display}`:"";t.push(`\uC704\uC784${n}`)}for(let n of["impl_model","impl_effort","impl_speed"])e[n]?.resolution!=="not_applicable"&&t.push(e[n]?.display||"\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00");return t.join(" \xB7 ")}function hy(e){if(!e||typeof e!="object")return null;let{kind:t,actor:n,effort:r,sha:o}=e;return typeof t!="string"||typeof n!="string"||typeof o!="string"?null:{kind:t,actor:n,effort:typeof r=="string"?r:null,sha:o}}function Pp(e,t={}){let n=e&&typeof e.metadata=="object"&&e.metadata?e.metadata:{},r=e&&typeof e.workflow=="object"&&e.workflow?e.workflow:{},o=r.stages||{},i=r.route||n.route||null,s=typeof n.pr_url=="string"?n.pr_url:"",l=typeof n.exec_receipt=="string"?n.exec_receipt:"",a=hy(r.exec_receipt),u=a?Jn(a):l,d=a?`${a.kind}:${a.actor}`:l.split("@")[0],p=Fs(r.planned_execution,r.exec_receipt),m=r.chips?.pr?.number,_=typeof m=="number"?`PR #${m}`:"PR",w=jo(n),R=w!==null&&t.isChipOpen?.("rec")===!0,I=R?Va({rec:w},"rec"):null;return c`<section class="detail-summary" data-seam="detail-summary">
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
            >${_}</a
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
      ${w?c`<button
            type="button"
            class="detail-summary__chip detail-summary__chip--rec judgement-chip"
            data-chip-key="rec"
            data-state=${w.state}
            aria-expanded=${R?"true":"false"}
            title=${ei(w)}
            @click=${()=>t.onChipToggle?.("rec")}
          >
            ${"\uBCF5\uC7A1"}
          </button>`:""}
    </div>
    ${I?lo(I):""}
    <div
      class="detail-summary__gates"
      role="group"
      aria-label="워크플로 게이트"
    >
      ${by(i).map(U=>yy(U,n,o,{label:U.id==="pr"?_:U.label,href:U.id==="pr"?s:""}))}
    </div>
  </section>`}function by(e){let n=typeof e=="string"&&Object.hasOwn(Dl,e)&&Dl[e]||Dl.spec_backed;return dy.filter(r=>n.includes(r.id))}var Ui={on:"\uD1B5\uACFC",stale:"\uC7AC\uAC80\uD1A0 \uD544\uC694",current:"\uC9C4\uD589 \uC911",none:"\uBBF8\uB3C4\uB2EC"};function yy(e,t,n,r){let o=vy(e,t,n),i=e.fill_stage?n[e.fill_stage]:null,s=typeof i?.fill=="string"?i.fill:null,l=s?s==="full":o.length>0,a=!l&&s==="dim",u=e.stale_stage?n[e.stale_stage]?.stale===!0:!1,d=o&&o.split("@")[1]?.slice(0,7)||"",p=u?Ui.stale:l?Ui.on:a?Ui.current:Ui.none,m=ky(e,n),_=`${r.label} \xB7 ${p}${m?` \xB7 ${m}`:""}${o?` \xB7 ${o}`:""}`,w=`detail-summary__gate${l?" detail-summary__gate--on":""}${a?" detail-summary__gate--current":""}${u?" detail-summary__gate--stale":""}${d?" detail-summary__gate--receipt":""}`,R=c`<span class="detail-summary__gate-label"
      >${r.label}</span
    >
    <span class="detail-summary__gate-rail"></span>
    <span class="detail-summary__gate-sha">${d}</span>`;return r.href?c`<a
      class=${w}
      data-gate=${e.id}
      data-hue=${e.hue}
      href=${r.href}
      target="_blank"
      rel="noreferrer"
      title=${_}
      >${R}</a
    >`:c`<span
    class=${w}
    data-gate=${e.id}
    data-hue=${e.hue}
    title=${_}
    >${R}</span
  >`}function vy(e,t,n){if(e.receipt&&typeof t[e.receipt]=="string")return String(t[e.receipt]);if(e.receipt_stage){let r=n[e.receipt_stage]?.receipt;return typeof r=="string"?r:""}return""}function ky(e,t){if(e.id!=="plan")return"";let n=t.plan?.approval_state;return typeof n=="string"&&Object.hasOwn(Ip,n)?Ip[n]:""}function Wi(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function Dp(e){return Wi(e)&&typeof e.key=="string"&&e.key.length>0&&typeof e.email=="string"&&e.email.length>0}function Mp(e,t){let n=e&&e[t];if(!Wi(n)||!Array.isArray(n.accounts))return null;let r=n.accounts.filter(Dp),o=Dp(n.active)?n.active:null;return{accounts:r,active:o||r.find(i=>i.active===!0)||null}}function jp(e){return typeof e.alias=="string"&&e.alias.length>0?` (${e.alias})`:""}function zi(e){let t=typeof e.status=="string"&&e.status!=="ok"?` \xB7 ${e.status}`:"";return`${e.email}${jp(e)}${t}`}function $o(e){let t=typeof e.plan=="string"&&e.plan.length>0?e.plan:"plan \uD655\uC778 \uBD88\uAC00";return`${e.email} \xB7 ${t}${jp(e)}`}function wy(e,t,n){if(n!==null){let o=e==="claude"?zi:$o,i=t?t.accounts.find(s=>s.key===n):void 0;return`\uB808\uD3EC \uAE30\uBCF8\uAC12 \uC0AC\uC6A9(${i?o(i):n})`}return t?t.active?`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(${e==="claude"?t.active.email:$o({...t.active,alias:null})})`:"\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(\uD655\uC778 \uBD88\uAC00)":"(\uAE30\uBCF8)"}function qp(e,t){if(!Wi(e)||e.state!=="usable"||!Wi(e.values))return null;let n=e.values[t];return typeof n=="string"&&n.length>0?n:null}function Np(e){let t=e.provider_key==="claude"?zi:$o,n=!!e.provider?.accounts.some(r=>r.key===e.selected);return c`<div class="detail-kv" data-exec-account-row=${e.key}>
    <span class="detail-kv__k">${e.title}</span>
    <span class="detail-kv__vgroup">
      <select
        class=${e.selected?"detail-kv__v detail-kv__v--sel":"detail-kv__v"}
        aria-label=${e.title}
        data-exec-key=${e.key}
        @change=${r=>e.handlers.onExecChange(e.key,r.target.value)}
      >
        <option value="" ?selected=${e.selected.length===0}>
          ${wy(e.provider_key,e.provider,e.workspace_default)}
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
  </div>`}function Fp({md:e,catalog:t,workspace_defaults:n=null,handlers:r}){let o=typeof e.claude_account=="string"?e.claude_account:"",i=typeof e.codex_account=="string"?e.codex_account:"";return c`<section class="exec-accounts" data-exec-accounts>
    <div class="detail-section-label">실행 계정</div>
    <div class="exec-settings-core">
      ${Np({key:"claude_account",title:"Claude \uACC4\uC815",provider_key:"claude",provider:Mp(t,"claude"),selected:o,workspace_default:qp(n,"claude_account"),handlers:r,hint:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uB7F0\uD0C0\uC784\uC774 claude\uC77C \uB54C \uC801\uC6A9\uB429\uB2C8\uB2E4"})}
      ${Np({key:"codex_account",title:"Codex \uACC4\uC815",provider_key:"codex",provider:Mp(t,"codex"),selected:i,workspace_default:qp(n,"codex_account"),handlers:r})}
    </div>
  </section>`}function $y(e){return String(e||"").replace(/^docs\/(superpowers\/)?/,"")}function xy(e){let t=/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(e);if(!t)return{front:null,body:e};let n=t[1].trim();return{front:n.length>0?n:null,body:e.slice(t[0].length)}}function Hi(e,t){let n=t.getWorkspacePath,r=t.fetchImpl||globalThis.fetch?.bind(globalThis),o=null,i="loading",s="",l=null,a="";function u(R){R.key==="Escape"&&o&&(R.preventDefault(),_())}document.addEventListener("keydown",u);function d(){return o?c`
      <div class="mv-overlay" role="dialog" aria-modal="true">
        <div class="mv-overlay__backdrop" @click=${()=>_()}></div>
        <div class="mv">
          <div class="mv__bar">
            <span class="mv__path" title=${o}
              >${$y(o)}</span
            >
            <button
              type="button"
              class="mv__close"
              aria-label="닫기"
              @click=${()=>_()}
            >
              ✕
            </button>
          </div>
          <div class="mv__body">
            ${i==="loading"?c`<div class="mv__status">불러오는 중…</div>`:i==="pending"?c`<div class="mv__status">${a}</div>`:i==="error"?c`<div class="mv__status mv__status--error">
                      ${a||"\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"}
                    </div>`:c`${l===null?null:c`<pre class="mv__front">
${l}</pre
                        >`}${yr(s)}`}
          </div>
        </div>
      </div>
    `:c``}function p(){dt(d(),e)}async function m(R,I={}){o=R,i="loading",s="",l=null,a="",p();let U=I.workspace||(n?n():"");if(!U){i="error",a="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4",p();return}if(!r){i="error",a="fetch\uB97C \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",p();return}let se="/api/doc?workspace="+encodeURIComponent(U)+"&path="+encodeURIComponent(R);try{let W=await r(se),j=await W.json().catch(()=>({}));if(!W.ok||!j||j.ok!==!0){if(j?.error==="not_found"&&I.missing_state==="plan_pending"){i="pending",a="\uACC4\uD68D \uC791\uC131 \uC804 \xB7 \uACBD\uB85C\uB9CC \uC608\uC57D\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4",p();return}i="error",a="\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 ("+String(j&&j.error||W.status)+")",p();return}let O=xy(String(j.content||""));l=O.front,s=O.body,i="ready",p()}catch{i="error",a="\uBB38\uC11C \uC694\uCCAD \uC2E4\uD328",p()}}function _(){o=null,dt(c``,e)}function w(){document.removeEventListener("keydown",u),_()}return{open:m,close:_,destroy:w}}var Ay=[{key:"input_tokens",label:"\uC785\uB825"},{key:"output_tokens",label:"\uCD9C\uB825"},{key:"cache_read_input_tokens",label:"\uCE90\uC2DC \uC77D\uAE30"}],Wp="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4",Ki=[{role:"implementation",provider:"codex"},{role:"review-consult",provider:"codex"},{role:"subagent",provider:"claude"}],Sy=new Set(["codex-runner","Explore","Plan","advisor","advisor-xhigh","claude-code-guide","statusline-setup"]);function Bp(e){return typeof e=="string"&&Sy.has(e)}var Ey=["running","done","failed","interrupted"],Ty={running:"\u25CF",done:"\u2713",failed:"\u2717",interrupted:"\u26A0"};function Cy(e){return typeof e=="number"&&Number.isFinite(e)?e:0}function Ry(e){let t=cn(e);if(t.length>0)return t.map(o=>c`<span class="detail-usage-total" title=${o.tooltip}
          >${o.label}</span
        >`);let n=io(e);if(!n||!e)return"";let r=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?` \xB7 $${e.total_cost_usd.toFixed(2)}`:"";return c`<span
      class="detail-usage-total"
      title="이 이슈의 모든 attempt 토큰 합계 (입력+출력+캐시)"
      >${n.replace(/^τ /,"\u03C4 \uCD1D ")}${r}</span
    >${e.replayed?c`<span class="detail-usage-partial" title=${Wp}
          >부분 집계</span
        >`:""}`}function Up(e){return!e||!e.roles.orchestrator?null:{providers:e.roles.orchestrator,roles:{}}}function Nl(e){if(typeof e=="number")return ms(e);if(typeof e!="string")return"";let t=Date.parse(e);return Number.isFinite(t)?ms(t):""}function Oy(e){return typeof e=="string"?e.replace(/-\d{8}$/,""):""}function zp(e,t,n){if(e.provider!=="claude"){let o=e.session_id?` \xB7 thread ${e.session_id}`:"",i=n?" \xB7 \uC774\uC804 \uB77C\uC6B4\uB4DC \uC2A4\uB808\uB4DC \uC774\uC5B4\uAC10":"";return{text:`${n?"\u21A9 ":""}${e.launch_id}`,title:`${e.launch_id}${o}${i}`}}let r=t&&typeof t.agent_id=="string"?t.agent_id:"";return r.length>0?{text:r.slice(0,8),title:r}:{text:e.launch_id.slice(-8),title:e.launch_id}}function Ml(e){return e===null||typeof e=="string"&&e.trim().length>0}function ql(e){return e===null||typeof e=="number"&&Number.isFinite(e)}function Iy(e){if(!e||typeof e!="object"||Array.isArray(e))return null;let t=e,n=t.provider==="claude";return typeof t.launch_id!="string"||t.launch_id.length===0||!Ki.some(r=>r.role===t.role&&r.provider===t.provider)||!(n?Ml(t.model):typeof t.model=="string"&&t.model.length>0)||!(!("effort"in t)||Ml(t.effort))||!(!("agent_type"in t)||Ml(t.agent_type))||typeof t.session_id!="string"||t.session_id.length===0||!Ey.includes(t.status)||!(t.turn_id===null||typeof t.turn_id=="string")?null:n?!ql(t.started_at)||!ql(t.last_event_at)||!ql(t.completed_at)?null:t:typeof t.started_at!="number"||!Number.isFinite(t.started_at)||typeof t.last_event_at!="number"||!Number.isFinite(t.last_event_at)||!(t.completed_at===null||typeof t.completed_at=="string"&&Number.isFinite(Date.parse(t.completed_at)))?null:t}function Ly(e,t,n,r){let i=cn({providers:{[t]:{subtotal:n.subtotal,breakdown:n.usage,...n.replayed?{replayed:!0}:{}}},roles:{}})[0],s=zp({provider:t,launch_id:n.receipt_id,session_id:typeof n.session_id=="string"?n.session_id:void 0},n,r);return c`<div class="detail-session__leg detail-session__usage-detail">
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
    ${Nl(n.completed_at)?c`<span class="detail-session__leg-time detail-session__time"
          >${Nl(n.completed_at)}</span
        >`:""}
    ${i?c`<span class="detail-session__usage" title=${i.tooltip}
          >${i.label}</span
        >`:""}
  </div>`}function Py(e,t,n,r,o){let i=e.status==="running"?null:t,l=(i?cn({providers:{[e.provider]:{subtotal:i.subtotal,breakdown:i.usage,...i.replayed?{replayed:!0}:{}}},roles:{}}):[])[0],a=e.status==="running"?ms(e.last_event_at):i?Nl(i.completed_at):"",u=(e.provider==="claude"?["Claude",e.agent_type,Oy(e.model),e.effort]:["codex",e.model,e.effort]).filter(Boolean).join(" \xB7 "),d=zp(e,i,o);return c`<button
    type="button"
    class="detail-session__leg detail-session__usage-detail detail-session__leg--${e.status}"
    data-launch-id=${e.launch_id}
    @click=${()=>r.onOpenDelegation&&r.onOpenDelegation(n,e.launch_id)}
  >
    <span class="detail-session__leg-glyph" aria-hidden="true"
      >${Ty[e.status]}</span
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
  </button>`}function Dy(e,t){return e.role===t.role&&(e.model===null||t.model===void 0||e.model===t.model)&&e.session_id===t.session_id}function My(e,t,n){let r=[],o=new Set,i=Array.isArray(e.delegation_sessions)?e.delegation_sessions:[];for(let p of i){let m=Iy(p);!m||o.has(m.launch_id)||Bp(m.agent_type)||(o.add(m.launch_id),r.push(m))}r.sort((p,m)=>(p.started_at||0)-(m.started_at||0));let s={};for(let{role:p,provider:m}of Ki){let _=t?t.roles[p]?.[m]:null;s[p]=_?[..._.legs]:[]}let l=Ki.flatMap(({role:p})=>s[p]),a=new Set,u=new Set,d=[];for(let{role:p,provider:m}of Ki){for(let _ of r.filter(w=>w.role===p&&w.provider===m)){let w=l.find(I=>I.receipt_id===_.launch_id)||null;if(w&&!Dy(_,w))continue;w&&a.add(w.receipt_id);let R=m==="codex"&&u.has(_.session_id);d.push(Py(_,w,e.attempt_id,n,R)),m==="codex"&&u.add(_.session_id)}for(let _ of s[p])if(!a.has(_.receipt_id)&&!Bp(_.agent_type)){let w=typeof _.session_id=="string"&&_.session_id.length>0?_.session_id:null,R=m==="codex"&&w!==null&&u.has(w);d.push(Ly(p,m,_,R)),m==="codex"&&w!==null&&u.add(w)}}return d}function qy(e,t){let n=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?e.total_cost_usd:null,r=[...Ay,{key:"cache_creation_input_tokens",label:t==="codex"?"\uCE90\uC2DC \uC4F0\uAE30":"\uCE90\uC2DC \uC0DD\uC131"},...t==="codex"&&typeof e.reasoning_output_tokens=="number"&&Number.isFinite(e.reasoning_output_tokens)?[{key:"reasoning_output_tokens",label:"\uCD94\uB860 \uCD9C\uB825"}]:[]];return c`<div class="detail-session__usage-detail">
    ${r.map(o=>c`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">${o.label}</span
          ><span class="detail-session__usage-value"
            >${Cy(e[o.key]).toLocaleString("en-US")}</span
          ></span
        >`)}
    ${n===null?"":c`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">비용</span
          ><span class="detail-session__usage-value"
            >$${n.toFixed(2)}</span
          ></span
        >`}
    ${e.replayed?c`<span class="detail-session__usage-note">${Wp}</span>`:""}
  </div>`}var Ny={running:"\u25CF",done:"\u2713",failed:"\u2717",orphaned:"\u26A0"};function ms(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),n=String(t.getHours()).padStart(2,"0"),r=String(t.getMinutes()).padStart(2,"0");return`${n}:${r}`}function jy(e){if(typeof e.exec_default_preset_id!="string"||e.exec_default_preset_id.length===0)return"";let t=e.exec_values&&typeof e.exec_values=="object"?Object.entries(e.exec_values).filter(([,r])=>typeof r=="string"&&r.length>0).map(([r,o])=>`${r}=${o}`).join(" \xB7 "):"",n=typeof e.exec_default_preset_revision=="number"?` r${e.exec_default_preset_revision}`:"";return c`<div
    class="detail-session__preset-audit"
    data-attempt-preset-audit
  >
    <strong>외부 실행 preset</strong>
    <span>${e.exec_default_preset_id}${n}</span>
    ${t?c`<small>${t}</small>`:""}
    <small>내부 workflow 실행 영수증과 별도 기록</small>
  </div>`}var Fy={remote:"\uB2E4\uB978 \uBA38\uC2E0 \uC138\uC158 \u2014 \uC774 \uC11C\uBC84\uC5D0 transcript \uC5C6\uC74C",missing:"transcript \uD30C\uC77C \uC5C6\uC74C"};function By(e,t){let n=Fy[e.locality]||"",r=e.locality==="remote"?`${e.host} \xB7 \uB2E4\uB978 \uBA38\uC2E0`:e.locality==="missing"?`${e.host} \xB7 \uD30C\uC77C \uC5C6\uC74C`:e.host;return c`<div class="detail-session-row">
    <button
      type="button"
      class="detail-session detail-session--session"
      data-session-key=${Ea(e)}
      ?disabled=${n.length>0}
      title=${n}
      @click=${()=>{n.length===0&&t.onOpenSessionRef&&t.onOpenSessionRef(e)}}
    >
      <span class="detail-session__glyph">${e.current?"\u25D0":"\xB7"}</span>
      <span class="detail-session__id">${Lo(e)}</span>
      <span class="detail-session__meta">${r}</span>
      <span class="detail-session__sid" title=${e.session_id}
        >${e.session_id.slice(0,8)}</span
      >
      <span class="detail-session__time">${ms(e.last_event_at)}</span>
    </button>
    ${e.resume_command?c`<button
          type="button"
          class="op-btn detail-session__resume-cmd"
          title=${e.resume_command}
          @click=${o=>{o.stopPropagation(),t.onCopyResumeCommand&&e.resume_command&&t.onCopyResumeCommand(e.resume_command)}}
        >
          ⧉ 재개
        </button>`:""}
  </div>`}function Hp(e,t={},n={},r=[]){let o=Array.isArray(e)?e:[],i=Array.isArray(r)?r:[],s=[...i.filter(_=>_&&_.current===!0),...i.filter(_=>_&&_.current!==!0).sort((_,w)=>w.index-_.index)],l=s.map(_=>By(_,t)),a=n.expanded||new Set;if(o.length===0&&s.length===0)return c`
      <div class="detail-section-label">세션 이력</div>
      <div class="detail-empty" data-seam="session-history">세션 이력 없음</div>
    `;let u=new Set;for(let _ of o)_&&typeof _.resumed_from=="string"&&_.resumed_from.length>0&&u.add(_.resumed_from);let d=_=>{if(!(_.status==="failed"||_.status==="orphaned"))return"";let R=typeof _.session_id=="string"&&_.session_id.length>0,I=u.has(_.attempt_id),U=R&&!I,se=R?I?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":"\uC774 \uC138\uC158\uC744 \uAC19\uC740 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C \uC774\uC5B4\uC11C \uC9C4\uD589":"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00";return c`<button
      type="button"
      class="op-btn detail-session__resume"
      data-attempt-id=${_.attempt_id}
      ?disabled=${!U}
      title=${se}
      @click=${W=>{W.stopPropagation(),U&&t.onResume&&t.onResume(_.attempt_id)}}
    >
      ↻ 이어하기
    </button>`},p=_=>{if(!(_.status==="failed"||_.status==="orphaned")||typeof _.cause!="string"||_.cause==="")return"";let R=_.cause_detail,I=R&&typeof R.reason=="string"&&R.reason.length>0?typeof R.command=="string"&&R.command.length>0?`${R.reason} \xB7 ${R.command}`:R.reason:_.cause;return c`<div class="detail-session__cause" title=${I}>
      ${_.cause}
    </div>`},m=_=>{let w=Up(Oa(_));if(cn(w).length===0&&!io(_.usage))return"";let R=a.has(_.attempt_id);return c`<button
      type="button"
      class="detail-session__usage-toggle"
      data-attempt-id=${_.attempt_id}
      aria-expanded=${R?"true":"false"}
      title=${R?"\uD1A0\uD070 \uB0B4\uC5ED \uC811\uAE30":"\uD1A0\uD070 \uB0B4\uC5ED \uD3BC\uCE58\uAE30"}
      @click=${I=>{I.stopPropagation(),t.onToggleUsage&&t.onToggleUsage(_.attempt_id)}}
    >
      τ 자세히
    </button>`};return c`
    <div class="detail-section-label">
      세션 이력${Ry(n.total)}
    </div>
    <div class="detail-sessions" data-seam="session-history">
      ${l}${o.map(_=>{let w=Oa(_),R=Up(w),I=cn(R);return c`<div class="detail-session-row">
          <button
            type="button"
            class="detail-session detail-session--${_.status||"unknown"}"
            data-attempt-id=${_.attempt_id}
            @click=${()=>t.onOpen&&t.onOpen(_.attempt_id)}
          >
            <span class="detail-session__glyph"
              >${Ny[_.status||""]||"\xB7"}</span
            >
            <span class="detail-session__id">${_.attempt_id}</span>
            ${Io(_)?c`<span
                  class="detail-session__resumed"
                  title=${Io(_)}
                  >↻</span
                >`:""}
            <span class="detail-session__meta">${Sn(_)}</span>
            ${I.length>0?c`<span class="detail-session__role">orchestrator</span>`:""}
            ${_.session_id?c`<span class="detail-session__sid" title=${_.session_id}
                  >${String(_.session_id).slice(0,8)}</span
                >`:""}
            ${I.length>0?I.map(U=>c`<span
                      class="detail-session__usage"
                      title=${U.tooltip}
                      >${U.label}</span
                    >`):io(_.usage)?c`<span class="detail-session__usage"
                    >${io(_.usage)}</span
                  >`:""}
            <span class="detail-session__time">${ms(_.started_at)}</span>
          </button>
          ${m(_)} ${d(_)} ${p(_)} ${jy(_)}
          ${a.has(_.attempt_id)&&_.usage?qy(_.usage,_.runner==="codex"?"codex":"claude"):""}
          ${My(_,w,t)}
        </div>`})}
    </div>
  `}function Kp(e,t={}){return c`
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
          ${Uy(e)}
        </div>`:""}
  `}function Uy(e){let t=ko(e);if(t)return t;let n=e.data;if(!n)return"";if(n.missing)return c`<div class="detail-prompt__missing">
        기록 없음 — 아직 이 이슈로 디스패치된 세션이 없습니다. 아래는 다음
        디스패치가 보낼 기본 과업입니다.
      </div>
      ${typeof n.default_task_prompt=="string"?ar("\uC608\uC0C1 \uAE30\uBCF8 \uACFC\uC5C5",n.default_task_prompt):""}`;let r=Fi(n.recorded_at);return c`<div class="detail-prompt__meta">
      ${n.attempt_id}${r?` \xB7 ${r}`:""}
    </div>
    ${typeof n.task_prompt=="string"?ar("\uACFC\uC5C5 (user)",n.task_prompt):""}
    ${typeof n.system_prompt=="string"?ar("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",n.system_prompt):""}`}var Br=10;function Gp(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),n=r=>String(r).padStart(2,"0");return`${n(t.getMonth()+1)}-${n(t.getDate())} ${n(t.getHours())}:${n(t.getMinutes())}`}function Yp(e,t={}){let r=(Array.isArray(e?.events)?e.events:[]).filter(l=>l&&typeof l.summary=="string"&&l.summary.trim().length>0);if(r.length===0)return"";let o=typeof e.shown=="number"&&e.shown>0?e.shown:Br,i=r.slice(0,o),s=r.length-i.length;return c`
    <div class="detail-section-label">Worker 이력 (${r.length})</div>
    <ol class="detail-timeline" data-seam="worker-timeline">
      ${i.map(l=>c`<li class="detail-timeline__row">
            ${Gp(l.at)?c`<span class="detail-timeline__at"
                  >${Gp(l.at)}</span
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
  `}var Wy=["open","in_progress","deferred","resolved","closed"],zy=[0,1,2,3,4];function Vp(e,t){let n=t.issueStores,r=t.onClose,o=t.transport,i=t.onNavigate,s=t.queueStore,l=t.execPresetStore,a=t.sessionLogStore,u=null,d=null,p={},m="",_=!1,w=[],R=!1,I=!1,U={},se={claude:null,codex:null},W=null,j=null,O=0,q=!1,z=!1,Y="",N="",F="",H="",G=!1;function ee(){q=!1,z=!1,Y="",N="",F="",H="",G=!1}function ye(){se={claude:null,codex:null},W=null,j=null,O+=1}async function qe(){if(!o)return null;try{let k=await Promise.resolve(o("get-workspace-accounts",{}));return k&&typeof k.state=="string"?k:null}catch{return null}}async function B(k){try{let D=await fetch(k);if(!D.ok)return null;let K=await D.json();if(!K||typeof K!="object"||!Array.isArray(K.accounts))return null;let we=K.accounts.filter(ze=>ze!==null&&typeof ze=="object"&&!Array.isArray(ze));return{accounts:we,active:we.find(ze=>ze.active===!0)||null}}catch{return null}}async function X(k){j=k;let D=++O,[K,we,ze]=await Promise.all([B("/api/claude-usage"),B("/api/codex-usage"),qe()]);D!==O||k!==u||(se={claude:K,codex:we},W=ze,Ze())}let Se=[],Ee=null,C=null,re=!1,ke="",ve=!1,Me=0,he=new Set;function Le(){Se=[],Ee=null,C=null,re=!1,ke="",ve=!1,Me+=1,he.clear()}async function Xe(k){if(!o)return;let D=++Me;try{let K=await Promise.resolve(o("get-comments",{id:k}));if(D!==Me||k!==u)return;Se=Array.isArray(K)?K:[],re=!1}catch{if(D!==Me||k!==u)return;re=!0}Ze()}function it(){if(!o||!u)return;let k=d&&typeof d.comment_count=="number"?d.comment_count:null;if(Ee!==u){Ee=u,C=k,Xe(u);return}k!==null&&k!==C&&(C=k,Xe(u))}function P(k){he.has(k)?he.delete(k):he.add(k),Ze()}function ce(k){let D=ke.trim().length===0;ke=k,D!==(k.trim().length===0)&&Ze()}async function ie(){let k=ke.trim();if(!o||!u||k.length===0||ve)return;let D=u;ve=!0,Ze();let K=!1;try{let we=await Promise.resolve(o("add-comment",{id:D,text:k}));Array.isArray(we)&&we.length>0&&(K=!0,D===u&&(Se=we,re=!1,ke="",C=we.length))}catch{K=!1}K||be("\uB313\uAE00 \uCD94\uAC00 \uC2E4\uD328","error"),D===u&&(ve=!1),Ze()}let de={onToggle:P,onDraftInput:ce,onSubmit:ie},Te=t.mdViewer||null,_e=null;Te||(_e=document.createElement("div"),_e.className="md-viewer-root",document.body.appendChild(_e));let De=Te||Hi(_e,{getWorkspacePath:t.getWorkspacePath||(()=>"")}),Be=document.createElement("div");Be.className="session-log-root",document.body.appendChild(Be);let Qe=wo(Be,{transport:o?(k,D)=>Promise.resolve(o(k,D)):void 0,sessionLogStore:a}),Fe=!1,te=!1,V=!1,$e=null,_t=null,at=0;function Ke(k){return`${t.getWorkspacePath&&t.getWorkspacePath()||""}::${k}`}function $(){Fe=!1,te=!1,V=!1,$e=null,_t=null,at+=1}async function J(k){if(!o)return;let D=++at;te=!0,V=!1,Ze();try{let K=await Promise.resolve(o("get-bead-prompt",{bead_id:k}));if(D!==at)return;!K||typeof K!="object"||Array.isArray(K)?V=!0:($e=K,_t=Ke(k))}catch{D===at&&(V=!0)}finally{D===at&&(te=!1,Ze())}}let Re=[],je=null,Je=0;function et(k,D){return`${t.getWorkspacePath&&t.getWorkspacePath()||""}::${k}::${D}`}function Ue(){Re=[],je=null,Je+=1}async function ct(k,D){if(!o)return;let K=++Je,we;try{we=await Promise.resolve(o("get-session-refs",{bead_id:k}))}catch{we=null}K!==Je||D!==je||(Re=we&&Array.isArray(we.sessions)?we.sessions:[],Ze())}function Gt(){if(!o||!u)return;let k=d&&d.metadata,D=k&&typeof k=="object"&&typeof k.session_ref=="string"?k.session_ref:null;if(D===null){Ue();return}let K=et(u,D);je!==K&&(Re=[],je=K,ct(u,K))}let At=[],kt=[],wt=Br,jt=null,Lt=0;function ae(k){return`${t.getWorkspacePath&&t.getWorkspacePath()||""}::${k}`}function me(){At=[],kt=[],wt=Br,jt=null,Lt+=1}async function Ge(k,D){if(!o)return;let K=++Lt,we;try{we=await Promise.resolve(o("get-bead-timeline",{bead_id:k}))}catch{we=null}K!==Lt||D!==jt||(At=we&&Array.isArray(we.events)?we.events:[],kt=we&&Array.isArray(we.attempts)?we.attempts:[],wt=Br,Ze())}function lt(){if(!o||!u)return;let k=ae(u);jt!==k&&(At=[],kt=[],wt=Br,jt=k,Ge(u,k))}function Oe(){wt+=Br,Ze()}function E(){if(Fe=!Fe,Fe&&u&&_t!==Ke(u)){$e=null,J(u);return}Ze()}function L(){let k={};for(let K of kt)K&&typeof K=="object"&&K.bead_id===u&&(k[String(K.attempt_id)]=K);let D=s?s.get():null;for(let K of D&&D.attempts?Object.values(D.attempts):[]){let we=K;we&&we.bead_id===u&&(k[String(we.attempt_id)]=we)}return k}function Z(){return u?Object.values(L()).sort((D,K)=>(K.started_at||0)-(D.started_at||0)).map(D=>({attempt_id:D.attempt_id,bead_id:D.bead_id,status:D.status,started_at:typeof D.started_at=="number"?D.started_at:null,runner:D.runner||null,model:D.model||null,effort:D.effort||D.observed_effort||null,speed:D.speed||null,session_id:D.session_id||null,resumed_from:D.resumed_from||null,continuation_mode:D.continuation_mode||null,dismissed_at:typeof D.dismissed_at=="number"?D.dismissed_at:null,cause:typeof D.cause=="string"?D.cause:null,cause_detail:D.cause_detail||null,exec_default_preset_id:typeof D.exec_default_preset_id=="string"?D.exec_default_preset_id:null,exec_default_preset_revision:typeof D.exec_default_preset_revision=="number"?D.exec_default_preset_revision:null,exec_values:D.exec_values&&typeof D.exec_values=="object"?D.exec_values:null,usage:D.usage||null,usage_legs:Array.isArray(D.usage_legs)?D.usage_legs:[],delegation_sessions:Array.isArray(D.delegation_sessions)?D.delegation_sessions:[]})):[]}function pe(){return u?tr(L(),u):null}let fe=new Set;function Pe(k){fe.has(k)?fe.delete(k):fe.add(k),Ze()}function ht(k){let D=s?s.get():null,K=D&&D.attempts?D.attempts[k]:null;Qe.open({attempt_id:k,meta:K?{runner:K.runner||void 0,model:K.model||void 0,effort:K.effort||void 0,status:K.status||void 0,session_id:K.session_id||void 0}:{}})}function $t(k,D){let K=s?s.get():null,we=K&&K.attempts?K.attempts[k]:null,nt=(we&&Array.isArray(we.delegation_sessions)?we.delegation_sessions:[]).find(Nt=>Nt&&typeof Nt=="object"&&Nt.launch_id===D);nt&&Qe.open({attempt_id:k,launch_id:D,meta:{runner:nt.provider==="claude"?"claude":"codex",role:nt.role,...typeof nt.agent_type=="string"?{agent_type:nt.agent_type}:{},model:nt.model,effort:nt.effort,session_id:nt.session_id,status:nt.status}})}async function gt(k){if(!o||!k)return;let D=o,K=()=>{let ze=s?s.get():null;return ze&&typeof ze.revision=="number"?ze.revision:0},we=s?.get()?.attempts?.[k]||null;await ro({context:{bead_id:we?.bead_id||u||"",kind:"session",tuple:we?Sn(we):""},transport:ze=>D("worker-attempt-resume",{attempt_id:k,expected_revision:K(),...ze}),adopt:ze=>{ze?.queue&&s?.set&&s.set(ze.queue)}})}async function Bt(k,D){if(!o||!k)return;let K=o,we=()=>{let Ve=s?s.get():null;return{bead_id:k,...D==="parallel"?{}:{lane:D},expected_revision:Ve&&typeof Ve.revision=="number"?Ve.revision:0}},ze=Ve=>{Ve?.queue&&s?.set&&s.set(Ve.queue)},nt=await Promise.resolve(K("worker-queue-place",we()));if(ze(nt),nt&&nt.conflict&&(nt=await Promise.resolve(K("worker-queue-place",we())),ze(nt)),Ze(),!nt)return;if(nt.applied===!1&&typeof nt.admission_reason=="string"){be(`\uB300\uAE30 \uC801\uC7AC \uAC70\uBD80: ${nt.admission_reason}`,"error",2400);return}if(nt.reason==="rejected"){be("\uB300\uAE30 \uC801\uC7AC \uAC70\uBD80: rejected","error",2400);return}if(nt.applied===!1)return;let Nt=nt.queue?Uo({id:k},nt.queue).location:null;Nt&&"index"in Nt&&be(`${Vu(Nt.lane)} \uB300\uAE30 #${Nt.index+1}\uC5D0 \uCD94\uAC00`,"success",2400)}function bt(k,D){if(D){I=!0,Ze();return}Bt(k,"parallel")}function Ct(k,D){let ze=(k.target?.closest?.(".worker-card__place-lane")||null)?.dataset.lane;ze&&(ze!=="parallel"&&!/^s[1-5]$/.test(ze)||(I=!1,Ze(),Bt(D,ze)))}function Rt(k){!k||!u||Qe.open(oo(k,u,d&&d.status))}let en={onOpen:ht,onOpenDelegation:$t,onResume:gt,onToggleUsage:Pe,onOpenSessionRef:Rt,onCopyResumeCommand:Q};function Yt(){let k=s?s.get():null,D={...U};for(let K of[...Pn,...co]){let we=k&&k[K];typeof we=="string"&&(D[K]=we)}return D}async function Dt(){if(o){try{let k=await Promise.resolve(o("get-session-defaults",{}));U=k&&k.values&&typeof k.values=="object"?k.values:{}}catch{U={}}Ze()}}function xt(){let k=s?s.get():null;return k&&k.runner_catalog||null}function Ht(){let k=s?s.get():null;return k&&typeof k.execution_defaults=="object"?k.execution_defaults:null}function nn(){let k=d?.metadata&&typeof d.metadata=="object"?d.metadata:{},K=En({pin:{...k,...p},global:Yt(),execution_defaults:Ht(),runner_catalog:xt(),route:typeof k.route=="string"?k.route:null}).orchestration_model.value||"";return Dn(xt(),K)}function Ut(){let k=l?l.get():null;return!k||typeof k.revision!="number"?null:{revision:k.revision,presets:Array.isArray(k.presets)?k.presets:[]}}function an(k){return k?.compatible===!1}function Zt(k){l&&k&&typeof k.revision=="number"&&Array.isArray(k.presets)&&l.set({revision:k.revision,presets:k.presets})}async function xe(){let k=Ut(),D=k?.presets.find(K=>K.id===m);if(!(!o||!u||!k||!D||an(D)||_)){_=!0,w=[],Ze();try{let K=await Promise.resolve(o("apply-impl-preset",Lu(u,D.id,k.revision)));if(K&&K.conflict){Zt(K),be("\uD504\uB9AC\uC14B\uC774 \uBCC0\uACBD\uB410\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uBAA9\uB85D\uC5D0\uC11C \uB2E4\uC2DC \uC801\uC6A9\uD558\uC138\uC694.","error",4e3);return}let we=K&&Array.isArray(K.issue)?K.issue[0]:K?.issue;if(K&&K.applied&&we&&typeof we=="object"){d=we,w=Array.isArray(K.skipped_orchestration_keys)?K.skipped_orchestration_keys.filter(ze=>typeof ze=="string"):[];for(let ze of Pu)delete p[ze];be(w.length>0?"\uC2E4\uD589 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4. \uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 3\uD0A4\uB294 Bead\uC5D0 \uD540\uD560 \uC218 \uC5C6\uC5B4 \uAC74\uB108\uB6F0\uC5C8\uC2B5\uB2C8\uB2E4.":"\uC2E4\uD589 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4.","success",4e3);return}K&&K.error==="bd_readback_failed"?be("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):be("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}catch(K){K&&typeof K=="object"&&K.code==="bd_readback_failed"?be("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):be("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}finally{_=!1,Ze()}}}let A=null;n&&n.subscribe&&(A=n.subscribe(()=>M()));let ge=null;s&&typeof s.subscribe=="function"&&(ge=s.subscribe(()=>{u&&Ze()}));let Ne=null,y=null;function v(){y&&(y(),y=null)}l&&typeof l.subscribe=="function"&&(Ne=l.subscribe(()=>{u&&Ze()}));function f(k){k.key==="Escape"&&u&&(k.preventDefault(),r())}document.addEventListener("keydown",f);let g=ao(()=>Ze());g.attach();function M(){if(u){if(n&&typeof n.snapshotFor=="function"){let k=n.snapshotFor("detail:"+u)||[];d=k.find(K=>K&&K.id===u)||k[0]||d}it(),Gt(),lt(),Ze()}}function Q(k){_n(k).then(D=>{D?be("\uBCF5\uC0AC\uB428","success",1200):be("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function ne(k){k.preventDefault(),k.stopPropagation(),u&&Q(u)}function ue(k,D){k.preventDefault(),k.stopPropagation(),Q(D)}function ut(k,D,K){k.preventDefault(),k.stopPropagation(),De.open(D,{missing_state:K})}async function mt(k,D){let K=Object.hasOwn(p,k),we=p[k];if(p[k]=D,Ze(),!(!o||!u))try{let ze=await Promise.resolve(o("update-exec-settings",Iu(u,k,D.length===0?null:D))),nt=Array.isArray(ze)?ze[0]:ze;if(!nt||typeof nt!="object"||!nt.id)throw new Error("exec settings readback failed");d=nt,delete p[k],Ze()}catch(ze){throw K?p[k]=we:delete p[k],Ze(),be("\uC2E4\uD589 \uC124\uC815 \uBCC0\uACBD \uC2E4\uD328","error"),ze}}function pt(k){k.catch(()=>{})}async function Mt(k,D){let K=d||{},we=K.metadata&&typeof K.metadata=="object"?K.metadata:{},ze={};for(let Ve of["impl_runtime","impl_model","impl_effort"])ze[Ve]=Object.hasOwn(p,Ve)?p[Ve]:typeof we[Ve]=="string"?we[Ve]:"";ze[k]=D;let nt=qu(ze,xt(),nn()),Nt={};for(let Ve of["impl_runtime","impl_model","impl_effort"])Nt[Ve]=p[Ve],p[Ve]=nt[Ve]||"";if(Ze(),!(!o||!u))return Promise.resolve(o("update-impl-target",{id:u,...nt,orchestration_runtime:nn()})).then(Ve=>{let Et=Array.isArray(Ve)?Ve[0]:Ve;if(!Et||typeof Et!="object"||!Et.id)throw new Error("implementation target readback failed");d=Et;for(let An of["impl_runtime","impl_model","impl_effort"])delete p[An];Ze()}).catch(Ve=>{for(let Et of["impl_runtime","impl_model","impl_effort"])Nt[Et]===void 0?delete p[Et]:p[Et]=Nt[Et];throw Ze(),be("\uAD6C\uD604 target \uBCC0\uACBD \uC2E4\uD328","error"),Ve})}async function S(k,D,K){if(!o||!u)return!1;try{let we=await Promise.resolve(o(k,D)),ze=Array.isArray(we)?we[0]:we;return ze&&typeof ze=="object"&&ze.id?(d=ze,!0):(be(K,"error"),!1)}catch(we){return we&&typeof we=="object"&&we.code==="bd_readback_failed"?(be("\uC800\uC7A5\uB410\uC73C\uB098 \uD655\uC778 \uC2E4\uD328 \u2014 \uACE7 \uAC31\uC2E0\uB429\uB2C8\uB2E4","error"),{ok:!1,saved:!0}):(be(K,"error"),!1)}}function x(k){setTimeout(()=>{try{let D=e.querySelector(k);D&&typeof D.focus=="function"&&D.focus()}catch{}},0)}function Ae(){q=!0,Y=d&&d.title||"",Ze(),x('.detail-edit__input[data-edit="title"]')}function We(k){Y=k.target.value}function rt(){q=!1,Y="",Ze()}function yt(){S("edit-text",{id:u,field:"title",value:Y},"\uC81C\uBAA9 \uC800\uC7A5 \uC2E4\uD328").then(D=>{D===!0&&(q=!1,Y=""),Ze()})}function Kt(){z=!0,N=d&&d.description||"",Ze(),x('.detail-edit__textarea[data-edit="description"]')}function zr(k){N=k.target.value}function kn(){z=!1,N="",Ze()}function lr(){S("edit-text",{id:u,field:"description",value:N},"\uC124\uBA85 \uC800\uC7A5 \uC2E4\uD328").then(D=>{D===!0&&(z=!1,N=""),Ze()})}function Ar(k,D,K,we){if(k.key==="Escape"){k.stopPropagation(),K();return}k.key==="Enter"&&(!we||k.ctrlKey||k.metaKey)&&(k.preventDefault(),D())}function oa(k){let D=k.target.value;S("update-status",{id:u,status:D},"\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328").then(()=>Ze())}function sa(k){let D=Number(k.target.value);S("update-priority",{id:u,priority:D},"\uC6B0\uC120\uC21C\uC704 \uBCC0\uACBD \uC2E4\uD328").then(()=>Ze())}function ia(k){F=k.target.value}function vs(){let k=F.trim();k.length!==0&&S("label-add",{id:u,label:k},"\uB77C\uBCA8 \uCD94\uAC00 \uC2E4\uD328").then(D=>{D===!0&&(F=""),Ze()})}function ks(k){if(k.key==="Escape"){k.stopPropagation(),F="",Ze();return}k.key==="Enter"&&(k.preventDefault(),vs())}function aa(k){S("label-remove",{id:u,label:k},"\uB77C\uBCA8 \uC81C\uAC70 \uC2E4\uD328").then(()=>Ze())}let la={onCopyPath:ue,onOpenDoc:ut};function Hr(k){return typeof k=="string"?k:k&&typeof k=="object"?String(k.id||k.to||k.issue_id||k.depends_on||""):""}function Kr(k){return k&&typeof k=="object"?String(k.dependency_type||k.type||""):""}function b(k){switch(k){case"discovered-from":return{glyph:"\u21A9 ",relation:"\uBC1C\uACAC"};case"parent-child":return{glyph:"\u2338 ",relation:"\uC0C1\uC704"};case"related":return{glyph:"\u2194 ",relation:"\uAD00\uB828"};default:return k.length>0?{glyph:`${k} `,relation:k}:{glyph:"",relation:""}}}function h(k,D){let K=T(D),we=[];return k.length>0&&we.push(k),K&&we.push(K),we.length>0?we.join(`
`):void 0}function T(k){if(!k||typeof k!="object")return;let D=typeof k.status=="string"?k.status:"",K=typeof k.title=="string"?k.title:"";return D.length>0&&K.length>0?`${D} \xB7 ${K}`:void 0}function oe(){return(t.getWorkspacePath&&t.getWorkspacePath()||"").trim()}function le(){return t.depCandidates?t.depCandidates():null}async function Ie(k,D,K){let we=oe(),ze=u;if(!ze)return;if(we.length===0){be("\uB808\uD3EC\uB97C \uC54C \uC218 \uC5C6\uC5B4 \uC758\uC874\uC744 \uBC14\uAFC0 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error");return}let nt=await S(k,{a:ze,b:D,view_id:ze,root_dir:we},K),Nt=nt===!0||nt!==!1&&nt.saved===!0;Nt&&t.onDepChanged&&t.onDepChanged({type:k,a:ze,b:D}),k==="dep-add"&&Nt&&(H="",G=!1),Ze()}function He(k){if(!u)return;let D=globalThis.confirm;typeof D=="function"&&!D(`${k}\uAC00 ${u}\uB97C \uB9C9\uB294 \uC5F0\uACB0\uC744 \uB04A\uC744\uAE4C\uC694?`)||Ie("dep-remove",k,"\uC758\uC874 \uD574\uC81C \uC2E4\uD328")}function St(k){k.disabled||Ie("dep-add",k.bead_id,"\uC758\uC874 \uCD94\uAC00 \uC2E4\uD328")}function Vt(k){H=k.target.value,G=!0,Ze()}function ot(){G||(G=!0,Ze())}function rn(k,D){if(k.key==="Escape"){k.stopPropagation(),H="",G=!1,Ze();return}k.key==="Enter"&&(k.preventDefault(),D.length===1&&!D[0].disabled&&St(D[0]))}function ln(k){return c`<div class="detail-dep-add">
      <input
        class="detail-dep-add__input"
        aria-label="막는 이슈 추가"
        placeholder="막는 이슈 추가"
        .value=${H}
        @focus=${ot}
        @input=${Vt}
        @keydown=${D=>rn(D,k)}
      />
      ${G||H.length>0?c`<div class="detail-dep-add__list">
            ${k.length===0?c`<div class="detail-dep-add__empty">후보 없음</div>`:k.map(D=>c`<button
                      type="button"
                      class="detail-dep-add__cand"
                      data-dep-cand=${D.bead_id}
                      ?disabled=${D.disabled}
                      title=${dn(D.reason)}
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
    </div>`}function Un(k,D){let K=D.get(k.id),we=i?c`<button
          type="button"
          class="detail-dep__link"
          title=${dn(k.title)}
          @click=${()=>K===void 0?i(k.id):i(k.id,K)}
        >
          ${k.label}
        </button>`:c`<span class="detail-dep__link" title=${dn(k.title)}
          >${k.label}</span
        >`;return c`<span
      class=${`detail-dep detail-dep--${k.kind}${i?" detail-dep--link":""}`}
      >${we}${k.kind==="pred"?c`<button
            type="button"
            class="detail-dep__unlink"
            data-dep-b=${k.id}
            aria-label=${"\uC758\uC874 \uD574\uC81C: "+k.id}
            @click=${()=>He(k.id)}
          >
            ✕
          </button>`:""}</span
    >`}function pn(k){let D=Array.isArray(k.dependencies)?k.dependencies:[],K=Array.isArray(k.dependents)?k.dependents:[],we=[];for(let Ve of D){let Et=Hr(Ve);Et.length>0&&Kr(Ve)==="blocks"&&we.push({id:Et,label:`\u26D3 ${Et}`,kind:"pred",title:h("\uB9C9\uB294",Ve)})}for(let Ve of K){let Et=Hr(Ve);Et.length>0&&Kr(Ve)==="blocks"&&we.push({id:Et,label:`\u2192 ${Et}`,kind:"succ",title:h("\uB9C9\uD788\uB294",Ve)})}for(let Ve of D){let Et=Hr(Ve),An=Kr(Ve);if(Et.length>0&&An!=="blocks"){let Ce=b(An);we.push({id:Et,label:`${Ce.glyph}${Et}`,kind:"other",title:h(Ce.relation,Ve)})}}let ze=le(),nt=new Map;if(ze)for(let Ve of ze.issues)nt.has(Ve.bead_id)||nt.set(Ve.bead_id,Ve.root_dir);let Nt=ze&&u?Wd(Ud(u,ze),H):[];return c`
      <div class="detail-section-label">의존성</div>
      ${we.length===0?c`<div class="detail-empty">의존성 없음</div>`:c`<div class="detail-deps">
            ${we.map(Ve=>Un(Ve,nt))}
          </div>`}
      ${ze===null?c`<div class="detail-empty">후보를 불러올 수 없음</div>`:ln(Nt)}
    `}function un(k){let D=k.metadata||{},K=k.workflow||{},we=K.stages||{},ze=we.spec&&we.spec.stale,nt=we.impl&&we.impl.stale,Nt=K.quick_fix_review?.state==="stale",Ve=we.plan||null,Et=K.route_source==="derived",An=K.route||D.route||"\u2014";return c`
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
              >${D.spec_review||"\uC5C6\uC74C"}${ze?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${K.route==="full_plan"?c`<div class="detail-kv">
              <span class="detail-kv__k">plan_review</span>
              <span class="detail-kv__v">${Ve?.receipt||"\uC5C6\uC74C"}</span>
            </div>
            <div class="detail-kv">
              <span class="detail-kv__k">plan_approval</span>
              <span class="detail-kv__v"
                >${Ve?.approval_receipt||"\uC5C6\uC74C"}${Ve?.approval_state==="stale"?" \xB7 stale":Ve?.approval_state==="unknown"?" \xB7 unknown":""}</span
              >
            </div>`:""}
      ${K.route!=="quick_fix"||Object.hasOwn(D,"impl_review")?c`<div class="detail-kv">
            <span class="detail-kv__k">impl_review</span>
            <span class="detail-kv__v"
              >${D.impl_review||"\uC5C6\uC74C"}${nt?" \xB7 stale":""}</span
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
              >${D.quick_fix_review||"\uC5C6\uC74C"}${Nt?" \xB7 stale":""}</span
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
              >${Jn(K.exec_receipt)}</span
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
    `}let Rn={route:["quick_fix","spec_backed","full_plan"]};async function Vn(k,D){let K=D.target.value;if(k==="route"&&d&&d.metadata&&d.metadata.route==="full_plan"&&K!=="full_plan"&&!window.confirm(`full_plan \u2192 ${K||"(\uBBF8\uC124\uC815)"} \uC804\uD658: \uC800\uC7A5\uB41C plan \uC2B9\uC778\uC740 \uD3EC\uAE30\uB418\uBA70, plan \uD30C\uC77C\xB7\uB9C8\uCEE4 \uC815\uB9AC\uB294 \uC138\uC158 \uACC4\uC57D\uC774 \uC218\uD589\uD569\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`)){Ze();return}await S("update-workflow-meta",{id:u,key:k,value:K},"\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uBA54\uD0C0 \uBCC0\uACBD \uC2E4\uD328"),Ze()}function on(k){let D=k.metadata||{};return c` ${((we,ze)=>{let nt=Rn[we],Nt=typeof D[we]=="string"?D[we]:"";return c`<div class="detail-kv">
        <span class="detail-kv__k">${we}</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label=${we}
          data-edit=${`wfmeta-${we}`}
          @change=${Ve=>Vn(we,Ve)}
        >
          <option value="" ?selected=${!nt.includes(Nt)}>
            ${ze}
          </option>
          ${nt.map(Ve=>c`<option value=${Ve} ?selected=${Nt===Ve}>${Ve}</option>`)}
        </select>
      </div>`})("route","(unset)")} `}function Qn(k,D){return q?c`
        <div class="detail-edit">
          <input
            class="detail-edit__input"
            data-edit="title"
            aria-label="제목 편집"
            .value=${Y}
            @input=${We}
            @keydown=${K=>Ar(K,yt,rt,!1)}
          />
          <div class="detail-edit__actions">
            <button
              type="button"
              class="detail-edit__save"
              data-edit="title-save"
              @click=${yt}
            >
              저장
            </button>
            <button
              type="button"
              class="detail-edit__cancel"
              data-edit="title-cancel"
              @click=${rt}
            >
              취소
            </button>
          </div>
        </div>
      `:c`
      <div class="detail-title-row">
        <h2 class="detail-overlay__title">${k}</h2>
        ${cn(D).map(K=>c`<span class="detail-usage-total" title=${K.tooltip}
              >${K.label}</span
            >`)}
        <button
          type="button"
          class="detail-edit-btn"
          data-edit="title"
          aria-label="제목 편집"
          @click=${Ae}
        >
          ✎
        </button>
      </div>
    `}function cr(k){let D=tn(k.created_at),K=tn(k.updated_at);return!D&&!K?c``:c`
      ${D?c`<div class="detail-kv">
            <span class="detail-kv__k">생성</span>
            <span class="detail-kv__v detail-kv__v--time">${D}</span>
          </div>`:""}
      ${K?c`<div class="detail-kv">
            <span class="detail-kv__k">수정</span>
            <span class="detail-kv__v detail-kv__v--time">${K}</span>
          </div>`:""}
    `}function On(k,D){return c`
      <div class="detail-section-label">속성 (수정 가능)</div>
      <div class="detail-kv">
        <span class="detail-kv__k">status</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label="status"
          data-edit="status"
          @change=${oa}
        >
          ${Wy.map(K=>c`<option value=${K} ?selected=${K===k}>${K}</option>`)}
        </select>
      </div>
      <div class="detail-kv">
        <span class="detail-kv__k">priority</span>
        <select
          class="detail-kv__v"
          aria-label="priority"
          data-edit="priority"
          @change=${sa}
        >
          ${zy.map(K=>c`<option value=${String(K)} ?selected=${K===D}>
                P${K}
              </option>`)}
        </select>
      </div>
    `}function Wn(k){return c`
      <div class="detail-title-row">
        <div class="detail-overlay__section-label">설명</div>
        ${z?"":c`<button
              type="button"
              class="detail-edit-btn"
              data-edit="description"
              aria-label="설명 편집"
              @click=${Kt}
            >
              ✎
            </button>`}
      </div>
      ${z?c`<div class="detail-edit">
            <textarea
              class="detail-edit__textarea"
              data-edit="description"
              aria-label="설명 편집"
              rows="6"
              .value=${N}
              @input=${zr}
              @keydown=${D=>Ar(D,lr,kn,!0)}
            ></textarea>
            <div class="detail-edit__actions">
              <button
                type="button"
                class="detail-edit__save"
                data-edit="description-save"
                @click=${lr}
              >
                저장
              </button>
              <button
                type="button"
                class="detail-edit__cancel"
                data-edit="description-cancel"
                @click=${kn}
              >
                취소
              </button>
            </div>
          </div>`:c`<div class="detail-overlay__desc">
            ${k||"(\uC124\uBA85 \uC5C6\uC74C)"}
          </div>`}
    `}function Ye(k){let D=typeof k.notes=="string"?k.notes:"";return D.trim().length===0?c``:c`
      <div class="detail-overlay__section-label">노트</div>
      <div class="detail-overlay__notes">${D}</div>
    `}function Wt(k){let D=Array.isArray(k.labels)?k.labels:[];return c`
      <div class="detail-section-label">라벨</div>
      <div class="detail-labels">
        ${D.map(K=>c`<span class="detail-label-chip"
              >${K}<button
                type="button"
                class="detail-label-chip__x"
                data-label=${K}
                aria-label=${"\uB77C\uBCA8 \uC81C\uAC70: "+K}
                @click=${()=>aa(K)}
              >
                ×
              </button></span
            >`)}
        <span class="detail-label-add">
          <input
            class="detail-label-add__input"
            aria-label="라벨 추가"
            placeholder="라벨 추가"
            .value=${F}
            @input=${ia}
            @keydown=${ks}
          />
          <button
            type="button"
            class="detail-label-add__btn"
            @click=${vs}
          >
            추가
          </button>
        </span>
      </div>
    `}function xn(){if(!u)return c``;let k=d||{},D=String(k.id||u),K=k.title||"(\uC81C\uBAA9 \uC5C6\uC74C)",we=pe(),ze=k.status||"open",nt=typeof k.priority=="number"?Math.max(0,Math.min(4,k.priority)):"",Nt=k.description||"",Ve=s?s.get():null,Et=Ve&&ze!=="closed"?Uo({...k,id:D},Ve):null,An=Ve?Wo(Ve):null,Ce={...k,metadata:{...k.metadata||{},...p}};return c`
      <div class="detail-overlay" role="dialog" aria-modal="true">
        <div class="detail-overlay__backdrop" @click=${()=>r()}></div>
        <div class="detail-overlay__panel">
          <div class="detail-overlay__bar">
            <button
              type="button"
              class="detail-overlay__id"
              title="ID 복사"
              @click=${ne}
            >
              ${D}
            </button>
            ${Et?c`<button
                  type="button"
                  class="op-btn op-btn--primary detail-overlay__place"
                  data-bead-id=${D}
                  ?disabled=${!Et.placeable}
                  title=${oi(Et)}
                  @click=${()=>bt(D,An)}
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
          ${Et&&I&&An?c`<div
                class="place-menu detail-overlay__place-menu"
                @click=${st=>Ct(st,D)}
              >
                ${Ya(An,D)}
                <button
                  type="button"
                  class="op-btn op-btn--icon worker-card__place-cancel"
                  data-bead-id=${D}
                  title="레인 선택 취소"
                  aria-label="레인 선택 취소"
                  @click=${()=>{I=!1,Ze()}}
                >
                  ✕
                </button>
              </div>`:""}
          ${Qn(K,we)}
          ${Pp(Ce,{onChipToggle:st=>g.toggle({bead_id:D,chip_key:st}),isChipOpen:st=>g.isOpen({bead_id:D,chip_key:st})})}
          ${Lp({metadata:Ce.metadata,workspace_values:Yt(),catalog:xt(),execution_defaults:Ht(),expanded:R,presets:Ut()?.presets||[],preset_id:m,preset_busy:_,skipped_orchestration_keys:w},{onToggle:st=>{R=st,Ze()},onEdit:(st,Qt)=>{if(st==="impl_runtime"||st==="impl_model"||st==="impl_effort"){pt(Mt(st,Qt??""));return}pt(mt(st,Qt??""))},onPresetSelect:st=>{m=st,w=[],Ze()},onPresetApply:()=>{xe()}})}
          ${Fp({md:Ce.metadata,catalog:se,workspace_defaults:W,handlers:{onExecChange:(st,Qt)=>pt(mt(st,Qt))}})}
          ${On(ze,nt)} ${cr(k)}
          ${Wn(Nt)}
          ${Cp(Se,de,{expanded:he,draft:ke,sending:ve,error:re})}
          ${Ye(k)} ${Wt(k)} ${pn(k)}
          ${un(k)} ${on(k)}
          ${Sp(k,la)}
          ${Kp({expanded:Fe,loading:te,error:V,data:$e},{onToggle:E})}
          ${Hp(Z(),en,{total:we,expanded:fe},Re)}
          ${Yp({events:At,shown:wt},{onMore:Oe})}
        </div>
      </div>
    `}function Ze(){dt(xn(),e)}return{load(k){k!==u&&(p={},I=!1,m="",w=[],R=!1,ee(),Le(),$(),Ue(),me(),ye()),u=k,d=null,!y&&t.subscribeCandidates&&(y=t.subscribeCandidates(()=>{u&&Ze()})),M(),Dt(),j!==k&&X(k)},clear(){u=null,d=null,p={},I=!1,m="",_=!1,w=[],R=!1,ee(),Le(),$(),Ue(),me(),ye(),v(),De.close(),Qe.close(),dt(c``,e)},destroy(){A&&(A(),A=null),ge&&(ge(),ge=null),Ne&&(Ne(),Ne=null),v(),document.removeEventListener("keydown",f),g.detach(),Te||(De.destroy(),_e&&_e.parentNode&&_e.parentNode.removeChild(_e)),Qe.destroy(),Be.parentNode&&Be.parentNode.removeChild(Be),u=null,d=null,ye(),m="",_=!1,w=[],Le(),$(),Ue(),me(),dt(c``,e)}}}function Qp(e){let t=document.createElement("dialog");t.id="fatal-error-dialog",t.setAttribute("role","alertdialog"),t.setAttribute("aria-modal","true"),t.innerHTML=`
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
    </div>`,e.appendChild(t);let n=t.querySelector("#fatal-error-title"),r=t.querySelector("#fatal-error-message"),o=t.querySelector("#fatal-error-detail"),i=t.querySelector("#fatal-error-reload"),s=t.querySelector("#fatal-error-close"),l=()=>{if(typeof t.close=="function")try{t.close()}catch{}t.removeAttribute("open")},a=(u,d,p="")=>{n&&(n.textContent=u||"Unexpected Error"),r&&(r.textContent=d||"An unrecoverable error occurred.");let m=typeof p=="string"?p.trim():"";if(o&&(m.length>0?(o.textContent=m,o.removeAttribute("hidden")):(o.textContent="No additional diagnostics available.",o.setAttribute("hidden",""))),typeof t.showModal=="function")try{t.showModal(),t.setAttribute("open","")}catch{t.setAttribute("open","")}else t.setAttribute("open","")};return i&&i.addEventListener("click",()=>{window.location.reload()}),s&&s.addEventListener("click",()=>l()),t.addEventListener("cancel",u=>{u.preventDefault(),l()}),{open:a,close:l,getElement(){return t}}}var Hy="(max-width: 640px)";function Gi(e){if(typeof window.matchMedia!="function")return e(!1),()=>{};let t=window.matchMedia(Hy),n=!!t.matches;e(n);let r=o=>{let s=!!(typeof o=="object"&&o!==null&&typeof o.matches=="boolean"?o.matches:t.matches);s!==n&&(n=s,e(s))};return typeof t.addEventListener=="function"?(t.addEventListener("change",r),()=>{t.removeEventListener("change",r)}):typeof t.addListener=="function"?(t.addListener(r),()=>{typeof t.removeListener=="function"&&t.removeListener(r)}):()=>{}}function Ky(){return{lanes:{done:!0},areas:{}}}function gs(e){let t={};if(typeof e!="object"||e===null)return t;for(let[n,r]of Object.entries(e))typeof r=="boolean"&&(t[n]=r);return t}function Gy(e){try{let t=window.localStorage.getItem(e);if(!t)return null;let n=JSON.parse(t);if(typeof n!="object"||n===null)return null;let r=n;return typeof r.lanes=="object"&&r.lanes!==null?{lanes:gs(r.lanes),areas:gs(r.areas)}:{lanes:gs(r),areas:{}}}catch{return null}}function Xp(e,t){try{window.localStorage.setItem(e,JSON.stringify(t))}catch{}}function Yi(e,t=Ky()){let n={lanes:gs(t.lanes),areas:gs(t.areas)},r=Gy(e),o={lanes:{...n.lanes,...r?r.lanes:{}},areas:{...n.areas,...r?r.areas:{}}};return{isCollapsed(i){return o.lanes[i]===!0},isAreaCollapsed(i){return o.areas[i]===!0},toggle(i){let s=o.lanes[i]!==!0;return o={...o,lanes:{...o.lanes,[i]:s}},Xp(e,o),s},toggleArea(i){let s=o.areas[i]!==!0;return o={...o,areas:{...o.areas,[i]:s}},Xp(e,o),s}}}function jl(e){if(typeof e=="string"&&e.length>0)return e;if(e&&typeof e=="object"){let t=e;if(typeof t.message=="string"&&t.message.length>0)return t.message;if(typeof t.error=="string"&&t.error.length>0)return t.error;if(t.error&&typeof t.error=="object"&&typeof t.error.message=="string")return t.error.message}return"\uC694\uCCAD\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4"}function Vi(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"&&t.length>0):[]}function Qi(e){let{transport:t,console_el:n,getLanes:r,getWorkspaces:o,getCrossLanes:i,reproject:s,onCorrection:l,showToast:a,requestRender:u,adoptQueue:d,onDragBegin:p,candidate_drop:m}=e,_=[],w=null,R=!1,I=null,U=null,se=null;function W(){I!==null&&clearTimeout(I),I=setTimeout(()=>{I=null,R=!1},0)}function j(){return i()??null}function O(){let P=new Map,ce=o();for(let ie of Array.isArray(ce)?ce:[]){if(!ie||typeof ie!="object")continue;let de=ie.bead_blocked_by&&typeof ie.bead_blocked_by=="object"?ie.bead_blocked_by:{};for(let[Te,_e]of Object.entries(de))Array.isArray(_e)&&P.set(Te,Vi(_e));for(let Te of[...Array.isArray(ie.runnable)?ie.runnable:[],...Array.isArray(ie.session_active)?ie.session_active:[]])Te&&typeof Te.bead_id=="string"&&Array.isArray(Te.blocked_by)&&Te.blocked_by.length>0&&P.set(Te.bead_id,Vi(Te.blocked_by))}return P}function q(){let P=new Map,ce=new Map,ie=o();for(let de of Array.isArray(ie)?ie:[]){if(!de||typeof de!="object")continue;let Te=de.bead_blocked_by&&typeof de.bead_blocked_by=="object"?de.bead_blocked_by:{};for(let[_e,De]of Object.entries(Te))Array.isArray(De)&&P.set(_e,Vi(De));for(let _e of Array.isArray(de.runnable)?de.runnable:[])_e&&typeof _e.bead_id=="string"&&Array.isArray(_e.blocked_by)&&ce.set(_e.bead_id,Vi(_e.blocked_by))}for(let de of _)for(let Te of[P,ce]){let _e=Te.get(de.a);_e!==void 0&&Te.set(de.a,de.type==="dep-remove"?_e.filter(De=>De!==de.b):_e.includes(de.b)?_e:[..._e,de.b])}return{snapshot:P,runnable:ce}}function z(){let P=O();for(let ce of _){let ie=(P.get(ce.a)||[]).slice();ce.type==="dep-remove"?P.set(ce.a,ie.filter(de=>de!==ce.b)):ie.includes(ce.b)||P.set(ce.a,[...ie,ce.b])}return P}function Y(P=r(),ce=j()){let ie=new Map;for(let Fe of Array.isArray(ce?.lanes)?ce.lanes:[]){let te=new Map;for(let V of Array.isArray(Fe?.entries)?Fe.entries:[])V&&typeof V.bead_id=="string"&&te.set(V.bead_id,V.dep_created_by_lane===!0);ie.set(typeof Fe?.id=="string"?Fe.id:"",te)}let de=new Map,Te=new Map,_e=new Set,De=new Set;for(let Fe of P.chain_lanes){let te=ie.get(Fe.lane_id);de.set(Fe.lane_id,{status:Fe.status,entries:Fe.rows.map((V,$e)=>({bead_id:V.id,root_dir:V.root_dir,...$e===0?{}:{dep_created_by_lane:te?.get(V.id)===!0}}))});for(let V of Fe.rows)Te.set(V.id,Fe.lane_id),V.fixed&&_e.add(V.id),V.unplaced||De.add(V.id)}let Be=new Map;for(let Fe of P.parallel_rows)typeof Fe.queue_index=="number"&&Be.set(Fe.id,Fe.queue_index);for(let Fe of P.queue_groups)for(let te of Fe.sublanes.serial)for(let V of te.items)typeof V.queue_index=="number"&&Be.set(V.id,V.queue_index);let Qe=q();return{blocked_by_map:z(),snapshot_blocked_by:Qe.snapshot,runnable_blocked_by:Qe.runnable,owner_of:new Map(Object.entries(P.owner_of)),cross_lanes:de,owner_lane_of:Te,fixed_members:_e,placed_members:De,parallel_rows:P.parallel_rows.map(Fe=>({bead_id:Fe.id,root_dir:Fe.root_dir,queue_index:Fe.queue_index??0})),parallel_raw_length:new Map(Object.entries(P.parallel_raw_length)),queue_index_of:Be}}function N(P,ce){let ie=r();for(let Te of[...ie.runnable,...ie.queue,...ie.running,...ie.pr_wait,...ie.done])if(!(Te.non_occupying||Te.id!==ce)){if(Te.root_dir===P)return Te.expected_revision;break}let de=ie.queue_groups.find(Te=>Te.root_dir===P);return de?de.revision:0}async function F(P,ce,ie,de){if(!t)return null;let _e=await t(P,{...ce,...ie?{root_dir:ie}:{},expected_revision:de});if(_e&&_e.conflict){_e.queue&&d?.(ie,_e.queue);let De=_e.queue&&typeof _e.queue.revision=="number"?_e.queue.revision:de;_e=await t(P,{...ce,...ie?{root_dir:ie}:{},expected_revision:De})}return _e&&_e.queue&&d?.(ie,_e.queue),_e}async function H(P,ce,ie,de,Te){try{let _e=await F(P,ce,ie,de.get(ie)??N(ie,Te.bead_id));return!_e||typeof _e.applied!="boolean"?(a("\uD050 \uC694\uCCAD\uC774 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error"),null):(_e.queue&&typeof _e.queue.revision=="number"&&de.set(ie,_e.queue.revision),_e.conflict?(a("\uD050\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD574 \uC8FC\uC138\uC694","error"),null):_e.applied===!1?(a(_e.admission_reason?`\uD050 \uC801\uC7AC \uAC70\uBD80: ${_e.admission_reason}`:"\uD050 \uC694\uCCAD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4","error"),null):_e.queue&&typeof _e.queue.revision=="number"?_e.queue.revision:de.get(ie)??0)}catch(_e){return a(jl(_e),"error"),null}}async function G(P,ce,ie=new Map){if(P.type==="worker-queue-disarm"){try{let de=await F(P.type,P.payload,P.root_dir,ie.get(P.root_dir)??N(P.root_dir,ce));de&&de.queue&&typeof de.queue.revision=="number"&&ie.set(P.root_dir,de.queue.revision)}catch{}return!0}if(P.type==="worker-queue-place"||P.type==="worker-queue-reorder"||P.type==="worker-queue-remove")return await H(P.type,P.payload,P.root_dir,ie,{bead_id:ce})!==null;try{return(P.type==="dep-add"||P.type==="dep-remove")&&t&&await t(P.type,{a:P.a,b:P.b,...P.root_dir?{root_dir:P.root_dir}:{}}),!0}catch(de){return a(jl(de),"error"),!1}}function ee(P){(P.type==="dep-add"||P.type==="dep-remove")&&(_=[..._,{type:P.type,a:P.a,b:P.b}])}async function ye(P,ce){if(!t)return{ok:!1};try{let ie=await t(P.type,{...P.payload,expected_revision:ce});return!ie||typeof ie.revision!="number"?(a("\uC5F0\uACB0 \uB808\uC778 \uC751\uB2F5\uC5D0 revision\uC774 \uC5C6\uC2B5\uB2C8\uB2E4","error"),{ok:!1}):{ok:!0,revision:ie.revision}}catch(ie){let de=ie,Te=de&&de.code==="conflict"?de.details?.cross_lanes:null;return Te&&typeof Te.revision=="number"&&Array.isArray(Te.lanes)?{ok:!1,conflict:Te}:(a(jl(ie),"error"),{ok:!1})}}async function qe(P,ce,ie){let de=new Map,Te=[],_e=P.ops.slice(0,P.lane_op_index),De=P.ops.slice(P.lane_op_index);for(let Qe of _e){if(!await G(Qe,ie,de))return{done:!0};ee(Qe)}let Be=ce;for(let Qe of P.lane_ops){if(Be===null)return a("\uC5F0\uACB0 \uB808\uC778 \uC800\uC7A5\uC18C\uB97C \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error"),{done:!0};let Fe=await ye(Qe,Be);if(!Fe.ok)return Fe.conflict?{done:!1,conflict:Fe.conflict}:{done:!0};Be=Fe.revision}for(let Qe of De){if(!await G(Qe,ie,de))return{done:!0};ee(Qe),Qe.type==="dep-add"&&Te.push(Qe)}for(let Qe of Fd(Te))Be=await B(Qe,Be);return{done:!0}}async function B(P,ce){if(ce===null||!t)return ce;let ie=P.pairs,de=ce;for(let Te=0;Te<2;Te+=1){if(ie.length===0)return de;try{let _e=await t("monitor-lane-provenance",{lane_id:P.lane_id,pairs:ie.map(De=>({bead_id:De.bead_id,after:De.after,value:!0})),expected_revision:de});return _e&&typeof _e.revision=="number"?_e.revision:de}catch(_e){let De=_e,Be=De&&De.code==="conflict"?De.details?.cross_lanes:null;if(!Be||typeof Be.revision!="number"||!Array.isArray(Be.lanes))return de;let Qe=Be.lanes.find(Fe=>Fe&&Fe.id===P.lane_id);ie=Bd(Array.isArray(Qe?.entries)?Qe.entries:[],ie),de=Be.revision}}return de}async function X(P,ce,ie=[]){_=ie,l("",0);let de=r(),Te=j();for(let _e=0;;_e+=1){let De=P(Y(de,Te));if("refused"in De){a(De.refused,"error");break}let Be=await qe(De,de.cross_lanes_revision,ce);if(Be.done){De.correction&&l(De.correction.lane_id,De.correction.corrected);break}if(_e>=1){a("\uB808\uC778\uC774 \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4","error");break}let Qe=s(Be.conflict);de=Qe.lanes,Te=Qe.raw_lanes}_=[],u()}async function Se(P,ce){await X(ie=>Ti(P,ce,ie),P.bead_id)}function Ee(P,ce){let ie=ce&&typeof ce.closest=="function"?ce.closest("[data-row-index]"):null;if(ie&&P.contains(ie)){let de=Number(ie.getAttribute("data-row-index"));return Number.isFinite(de)?de:0}return P.querySelectorAll("[data-row-index]").length}function C(P){let ce=typeof P?.closest=="function"?P.closest(".worker-pane--collapsed[data-lane]"):null;if(!ce)return null;let ie=ce.getAttribute("data-lane");return ie==="queue"?{zone:ce,target:{kind:"parallel",marker_index:r().parallel_rows.length}}:ie==="candidate"&&m===!0?{zone:ce,target:{kind:"candidate"}}:null}function re(P){let ce=P.target;if(!w)return null;let ie=typeof ce?.closest=="function"?ce.closest("[data-drop]"):null;if(!ie)return C(ce);let de=ie.getAttribute("data-drop");if(de==="candidate")return{zone:ie,target:{kind:"candidate"}};if(de==="parallel")return{zone:ie,target:{kind:"parallel",marker_index:Ee(ie,ce)}};if(de==="chain")return{zone:ie,target:{kind:"chain",lane_id:ie.getAttribute("data-lane-id")||"",marker_index:Ee(ie,ce)}};if(de==="repo-serial"){let Te=ie.getAttribute("data-root-dir")||"";if(Te!==w.root_dir)return null;let _e=typeof ce?.closest=="function"?ce.closest("[data-queue-index]"):null,De=_e&&ie.contains(_e)?_e.getAttribute("data-queue-index"):ie.getAttribute("data-lane-length"),Be=Number(De);return{zone:ie,target:{kind:"repo-serial",root_dir:Te,lane_id:ie.getAttribute("data-lane-id")||"",index:Number.isFinite(Be)?Be:0}}}return null}function ke(){for(let P of Array.from(n.querySelectorAll(".is-drop-over")))P.classList.remove("is-drop-over")}function ve(P){U=P.target instanceof Element?P.target:null}function Me(P){let ce=P.target,ie=typeof ce?.closest=="function"?ce.closest('[draggable="true"][data-bead-id]'):null,de=ie?ie.closest("[data-drag-kind]"):null;if(!de)return;if(ie&&U&&ie.contains(U)&&typeof U.closest=="function"&&U.closest("input, button, a")){P.preventDefault();return}let Te=de.getAttribute("data-bead-id")||"",_e=de.getAttribute("data-drag-kind")||"",De=de.getAttribute("data-root-dir")||"";if(!Te||!_e)return;let Be=de.getAttribute("data-queue-index")||"",Qe=Number(Be),Fe=de.getAttribute("data-lane-id")||"";w={kind:_e,bead_id:Te,root_dir:De,...Be!==""&&Number.isFinite(Qe)?{queue_index:Qe}:{},...Fe?{lane_id:Fe}:{}},R=!0,p?.(),n.classList.add("is-dragging");try{P.dataTransfer?.setData("text/plain",Te),P.dataTransfer&&(P.dataTransfer.effectAllowed="move")}catch{}}function he(P){let ce=re(P);ce&&(P.preventDefault(),P.dataTransfer&&(P.dataTransfer.dropEffect="move"),ce.zone.classList.add("is-drop-over"))}function Le(P){let ce=P.target;typeof ce?.closest=="function"&&(ce.closest("[data-drop]")?.classList.remove("is-drop-over"),ce.closest(".worker-pane--collapsed")?.classList.remove("is-drop-over"))}function Xe(){w=null,ke(),n.classList.remove("is-dragging"),W()}function it(P){let ce=re(P),ie=w;w=null,ke(),n.classList.remove("is-dragging"),!(!ce||!ie)&&(P.preventDefault(),Se(ie,ce.target))}return{attach(P){se||(se=P,P.addEventListener("pointerdown",ve),P.addEventListener("dragstart",Me),P.addEventListener("dragover",he),P.addEventListener("dragleave",Le),P.addEventListener("drop",it),P.addEventListener("dragend",Xe))},detach(){I!==null&&(clearTimeout(I),I=null);let P=se;se=null,P&&(P.removeEventListener("pointerdown",ve),P.removeEventListener("dragstart",Me),P.removeEventListener("dragover",he),P.removeEventListener("dragleave",Le),P.removeEventListener("drop",it),P.removeEventListener("dragend",Xe))},isDragging(){return w!==null},consumeClickSuppression(){let P=R;return R=!1,P},applyDrop:Se,runPlanned:X,dropModel:Y,sendOp:G,sendQueueCas:H,rememberDep:ee}}var Fl=Object.freeze({repo_ops_worktree_unowned:"\uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC\uAC00 \uC544\uC9C1 Worker \uC18C\uC720\uAC00 \uC544\uB2C8\uC5B4\uC11C \uC2A4\uD06C\uB9BD\uD2B8 \uC2E4\uD589 \uC804\uC5D0 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4.",verify_cmd_failed:"\uBA38\uC9C0 \uD6C4 \uAC80\uC99D \uBA85\uB839\uC774 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",gh_observation_failed:"GitHub\uC5D0\uC11C PR \uC0C1\uD0DC\uB97C \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",verify_script_failure:"\uAC80\uC99D \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",deploy_script_failure:"\uBC30\uD3EC \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",interrupted_without_terminal_exit:"\uC791\uC5C5\uC774 \uC885\uB8CC \uAE30\uB85D \uC5C6\uC774 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4.",manual_target_missing:"\uC218\uB3D9 \uBC30\uD3EC \uAE30\uB85D\uC5D0 \uD540\uB41C \uB300\uC0C1 SHA\uAC00 \uC5C6\uC5B4 \uC2E4\uD589\uD558\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4.",bootstrap_not_approved:"\uCCAB [deploy] \uC120\uC5B8\uC740 \uC0AC\uB78C \uC2B9\uC778 \uC5C6\uC774 \uC2E4\uD589\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4. Worker \uC124\uC815\uC758 [\uBC30\uD3EC \uC2E4\uD589]\uC73C\uB85C \uC6D0\uACA9 base tip\uC744 \uD55C \uBC88 \uBC30\uD3EC\uD55C \uB4A4 [\uC815\uC0B0 \uC7AC\uAC1C]\uB97C \uB204\uB974\uC138\uC694 \u2014 \uADF8 \uB4A4 \uBA38\uC9C0\uBD80\uD130\uB294 \uC790\uB3D9 \uBC30\uD3EC\uB429\uB2C8\uB2E4.",base_unresolved:"PR\uC774 \uC5B4\uB290 base \uBE0C\uB79C\uCE58\uB85C \uBA38\uC9C0\uB418\uB294\uC9C0 \uD655\uC815\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_ref_unobserved:"PR\uC758 base \uBE0C\uB79C\uCE58\uB97C \uC544\uC9C1 \uAD00\uCE21\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",merge_sha_unobserved:"\uBA38\uC9C0 \uCEE4\uBC0B SHA\uB97C \uC544\uC9C1 \uAD00\uCE21\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_fetch_failed:"\uC6D0\uACA9 base \uBE0C\uB79C\uCE58\uB97C fetch\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_rev_unavailable:"fetch\uD55C \uC6D0\uACA9 base \uBE0C\uB79C\uCE58\uC758 \uCEE4\uBC0B\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_ff_diverged:"\uB85C\uCEEC base \uBE0C\uB79C\uCE58\uAC00 \uC6D0\uACA9\uACFC \uAC08\uB77C\uC838 fast-forward\uB85C \uC815\uB82C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",deployment_target_not_covering_merge:"\uBC30\uD3EC \uB300\uC0C1 base\uAC00 \uC774 \uBA38\uC9C0 \uCEE4\uBC0B\uC744 \uD3EC\uD568\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.",deployment_candidate_ancestry_check_failed:"\uBC30\uD3EC \uB300\uC0C1 base\uAC00 \uC774 \uBA38\uC9C0 \uCEE4\uBC0B\uC744 \uD3EC\uD568\uD558\uB294\uC9C0 \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",verify_red:"\uBA38\uC9C0 \uD6C4 \uAC80\uC99D\uC774 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",cleanup_failed:"\uBA38\uC9C0 \uD6C4 \uC815\uB9AC\uAC00 \uB05D\uB098\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",retry_exhausted:"\uC790\uB3D9 \uC7AC\uC2DC\uB3C4\uB97C \uBAA8\uB450 \uC4F0\uACE0\uB3C4 \uAC19\uC740 \uC2E4\uD328\uAC00 \uC774\uC5B4\uC84C\uC2B5\uB2C8\uB2E4.",conflict_unresolved:"\uCDA9\uB3CC \uD574\uC18C\uAC00 \uB05D\uB098\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",internal_record_failed:"Worker \uB0B4\uBD80 \uAE30\uB85D\uC774 \uC2E4\uD328\uD574 \uC9C4\uD589\uC744 \uBA48\uCDC4\uC2B5\uB2C8\uB2E4.",foreign_landing_unpinned:"\uB2E4\uB978 \uC800\uC7A5\uC18C \uCC29\uC9C0\uC778\uB370 foreign_repo\xB7foreign_path\xB7foreign_base \uD540\uC774 \uC5C6\uAC70\uB098 \uD615\uC2DD\uC774 \uD2C0\uB9BD\uB2C8\uB2E4.",foreign_checkout_unavailable:"\uD540\uB41C \uB300\uC0C1 \uC800\uC7A5\uC18C \uCCB4\uD06C\uC544\uC6C3\uC774 \uC5C6\uAC70\uB098 foreign_repo\uC640 \uAC19\uC740 URL\uC758 remote\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4.",foreign_deploy_unsupported:"\uB300\uC0C1 \uC800\uC7A5\uC18C\uAC00 [deploy]\uB97C \uC120\uC5B8\uD574 Worker\uAC00 \uBC30\uD3EC \uC99D\uAC70\uB97C \uB9CC\uB4E4 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4. \uC138\uC158\uC774 \uBC30\uD3EC\uC640 \uB9C8\uAC10\uC744 \uC18C\uC720\uD569\uB2C8\uB2E4.",repair_lane_retired:"\uC790\uB3D9 \uC218\uB9AC \uB808\uC778\uC774 \uC740\uD1F4\uD574 \uC0AC\uB78C \uCC98\uB9AC\uB85C \uB118\uC5B4\uC654\uC2B5\uB2C8\uB2E4."});var Zp={verify_failed:"\uAC80\uC99D \uC2E4\uD328",verify_cmd_failed:"\uAC80\uC99D \uC2E4\uD328",verify_script_failure:"\uAC80\uC99D \uC2E4\uD328",deploy_failed:"\uBC30\uD3EC \uC2E4\uD328",deploy_script_failure:"\uBC30\uD3EC \uC2E4\uD328",job_script_failure:"\uC7A1 \uC2E4\uD328",interrupted_without_terminal_exit:"\uC911\uB2E8\uB428",quickfix_landing_failed:"\uCC29\uC9C0 \uC2E4\uD328",runner_exit:"\uC138\uC158 \uC2E4\uD328",session_parked:"\uC138\uC158 \uB300\uAE30",session_ended_unresolved:"\uC138\uC158 \uC885\uB8CC",prerequisite_unmet:"\uC120\uD589 \uB300\uAE30",delivery_unproven:"\uCC29\uC9C0 \uC99D\uAC70 \uBD80\uC871"},Jp={overloaded_529:"Claude API \uACFC\uBD80\uD558(529)\uB85C \uBCF4\uB958",rate_limited_429:"Claude API \uC694\uCCAD \uD55C\uB3C4(429)\uB85C \uBCF4\uB958"},ef={"session_hard_stop:failure":"\uC138\uC158\uC774 \uC2E4\uD328\uB97C \uBCF4\uACE0\uD558\uACE0 \uC885\uB8CC","session_hard_stop:environment":"\uC138\uC158\uC774 \uD658\uACBD \uC624\uB958\uB97C \uBCF4\uACE0\uD558\uACE0 \uC885\uB8CC","resume_failed:transcript_missing":"\uC774\uC5B4\uD558\uAE30 \uB300\uC0C1 \uC138\uC158 \uAE30\uB85D\uC774 \uC5C6\uC74C \u2014 \uC0C8 \uC138\uC158\uC73C\uB85C \uB300\uCCB4"};function Yy(e){return typeof e!="number"||!Number.isFinite(e)?"":new Date(e).toLocaleTimeString("ko-KR",{hour:"2-digit",minute:"2-digit"})}function Vy(e,t){if(typeof e!="string"||!e.startsWith("provider_outage:"))return null;let n=e.slice(16);if(n==="usage_limit"){let o=t&&typeof t=="object"?t.resets_at:null,i=Yy(o);return i?`\uACC4\uC815 \uC0AC\uC6A9 \uD55C\uB3C4\uB85C \uBCF4\uB958 \u2014 \uB9AC\uC14B ${i}`:"\uACC4\uC815 \uC0AC\uC6A9 \uD55C\uB3C4\uB85C \uBCF4\uB958"}if(Object.hasOwn(Jp,n))return Jp[n];let r=/^http_(5\d\d)$/.exec(n);return r?`Claude API \uC624\uB958(${r[1]})\uB85C \uBCF4\uB958`:null}function Zi(e){return typeof e!="string"||e.length===0?[]:e.split(":").filter(t=>t.length>0)}function Xi(e){for(let t of Zi(e)){if(Object.hasOwn(Zp,t))return Zp[t];if(t.startsWith("session_"))return"\uC138\uC158 \uC2E4\uD328"}return null}function nf(e){return Zi(e).length===0?null:Xi(e)||"\uC2E4\uD328"}function Ur(e){let t=null;for(let n of Zi(e))Object.hasOwn(Fl,n)&&(t=Fl[n]);return t}function kr(e,t){if(typeof e=="string"&&Object.hasOwn(ef,e))return ef[e];let n=Vy(e,t);if(n!==null)return n;let r=Xi(e),o=Ur(e);return r&&o?`${r} \u2014 ${o}`:r||o?r||o:typeof e=="string"?e:""}function rf(e,t){let n=Xi(e)??Xi(t),r=Ur(t)??Ur(e);return n&&r?`${n} \u2014 ${r}`:n||r?n||r:typeof t=="string"?t:""}var Qy=new Set(["repo_operation_timeout_unresolved"]);function Xy(e){for(let t of Zi(e))if(Qy.has(t)||t.startsWith("repo_ops_"))return!0;return!1}function Zy(e,t){return t.code==="interrupted"||t.interrupted===!0||e.failure_kind==="interrupted_without_terminal_exit"||t.code==="interrupted_without_terminal_exit"}function of(e,t){if(!e||typeof e!="object")return"";let n=e.failure;if(!n||typeof n!="object"||Xy(n.code))return"";if(n.code==="timeout"){let o=Number(t);return Number.isFinite(o)&&o>0?`\uD0C0\uC784\uC544\uC6C3 ${Math.round(o/1e3)}\uCD08 \uCD08\uACFC`:"\uD0C0\uC784\uC544\uC6C3 \uCD08\uACFC"}if(Zy(e,n))return"\uC885\uB8CC \uAE30\uB85D \uC5C6\uC74C \u2014 \uC911\uB2E8\uB428";let r=typeof e.elapsed_ms=="number"&&Number.isFinite(e.elapsed_ms)&&e.elapsed_ms>=0?` \xB7 ${qr(e.elapsed_ms)}`:"";return typeof e.signal=="string"&&e.signal.length>0?`signal ${e.signal}${r}`:Number.isInteger(e.exit_code)?`exit ${e.exit_code}${r}`:""}var tf={schema_unsupported:"\uD540\uB41C \uC815\uCC45 \uC2A4\uD0A4\uB9C8\uB97C \uC9C0\uC6D0\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4."};function sf(e){if(!e||typeof e!="object")return"";let t=e.retry;if(!t||typeof t!="object")return"";if(typeof t.blocked_reason=="string"&&t.blocked_reason)return`\uC790\uB3D9 \uC7AC\uC2DC\uB3C4 \uBABB \uD568 \u2014 ${Object.hasOwn(tf,t.blocked_reason)?tf[t.blocked_reason]:t.blocked_reason}`;if(t.status==="absorbed"){let n=t.absorbed&&typeof t.absorbed=="object"?t.absorbed:null,r=kr(n?.first_failure?.code);return r?`\uC790\uB3D9 \uC7AC\uC2DC\uB3C4\uB85C \uD574\uC18C\uB428 \u2014 \uCCAB \uC2E4\uD328: ${r}`:"\uC790\uB3D9 \uC7AC\uC2DC\uB3C4\uB85C \uD574\uC18C\uB428"}if(e.state!=="failed")return"";if(t.status==="not_applicable")return"\uC7AC\uC2DC\uB3C4 \uB300\uC0C1 \uC544\uB2D8 \u2014 \uC2A4\uD06C\uB9BD\uD2B8 \uC2E4\uD589 \uC804 \uC2E4\uD328";if(t.status==="consumed"){let n=typeof t.first_fingerprint=="string"&&t.first_fingerprint?t.first_fingerprint:null;if(n===null)return"";if(n===e.failure?.fingerprint)return"\uC790\uB3D9 \uC7AC\uC2DC\uB3C4 1\uD68C \u2014 \uAC19\uC740 \uC2E4\uD328";let r=kr(t.first_failure?.code);return r?`\uC790\uB3D9 \uC7AC\uC2DC\uB3C4 1\uD68C \u2014 \uB2E4\uB978 \uC2E4\uD328: ${r}`:"\uC790\uB3D9 \uC7AC\uC2DC\uB3C4 1\uD68C \u2014 \uB2E4\uB978 \uC2E4\uD328"}return""}function Jy(e){if(!Number.isFinite(e)||e<0)return"0s";let t=Math.floor(e/1e3),n=Math.floor(t/60),r=t%60;return n>0?`${n}m ${String(r).padStart(2,"0")}s`:`${r}s`}var af=200;function ev(e){return typeof e!="string"||e.length===0?"":e.length>af?`${e.slice(0,af)}\u2026`:e}function tv(e){let t=e&&e.attempts>0&&e.max>0?` ${e.attempts}/${e.max}`:"",n=e&&typeof e.next_at=="number"?` \xB7 ${new Date(e.next_at).toLocaleTimeString("ko-KR",{hour:"2-digit",minute:"2-digit"})}`:"";return`\u21BB \uC7AC\uC2DC\uB3C4 \uB300\uAE30${t}${n}`}function Bl(e){return typeof e!="number"||!Number.isFinite(e)?"":new Date(e).toLocaleTimeString("ko-KR",{hour:"2-digit",minute:"2-digit"})}function nv(e){if(!e)return"";let t=e.auto_resume==="disarmed"?" \xB7 \uC218\uB3D9 \uC870\uCE58":"";if(e.kind==="usage_limit"){let r=Bl(e.resets_at);if(!r)return`\u23F3 \uD55C\uB3C4 \uB300\uAE30 \xB7 \uB9AC\uC14B \uBBF8\uC0C1${t}`;let o=e.target?.account_alias||e.target?.account||"";return`\u23F3 \uD55C\uB3C4 \uB300\uAE30 ${r}${o?` \xB7 ${o}`:""}${t}`}let n=Bl(e.next_probe_at);return`\u26A0\uFE0F \uACF5\uAE09\uC790 \uC7A5\uC560${n?` \xB7 \uB2E4\uC74C \uD504\uB85C\uBE0C ${n}`:""}${t}`}function cf(e){if(!e)return"";let t=Array.isArray(e.timeline)?e.timeline:[],n=typeof e.log_path=="string"?e.log_path:"",r=e.log_expired===!0,o=e.log_unreadable===!0;return t.length===0&&n.length===0&&!r&&!o?"":c`${t.length>0?c`<ol class="rtile__history" data-seam="tile-timeline">
        ${t.map(i=>c`<li class="rtile__history-row">
              ${lf(i.at)?c`<span class="rtile__history-at"
                    >${lf(i.at)}</span
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
            ${Dr(n)}
          </p>`:""}`}function lf(e){return typeof e!="number"||!Number.isFinite(e)?"":new Date(e).toLocaleTimeString("ko-KR",{hour:"2-digit",minute:"2-digit"})}function rv(e,t){if(!e||e.open!==!0)return"";let n=Ur(e.cause)||kr(e.cause,e.cause_detail),r=e.retry&&e.retry.attempts>0?`\uC790\uB3D9 \uC7AC\uC2DC\uB3C4 ${e.retry.attempts}\uD68C \u2014 \uAC19\uC740 \uC624\uB958`:"",o=e.cause_detail,i=e.quickfix_lane&&e.quickfix_landing?e.quickfix_landing:null,s=i?[i.cursor||null,typeof i.head_sha=="string"?i.head_sha.slice(0,7):null,i.reason||null].filter(Boolean).join(" \xB7 "):"",l=typeof e.finished_at=="number"?`${new Date(e.finished_at).toLocaleString("ko-KR")} \xB7 ${fn(e.finished_at,t)}`:"",a=[e.runner,e.model,e.observed_effort??e.effort,e.speed].filter(m=>typeof m=="string"&&m.length>0).join(" \xB7 "),u=e.usage?.total_cost_usd,d=typeof u=="number"&&Number.isFinite(u)?`$${u.toFixed(2)}`:"",p=cf(e);return c`<div
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
  </div>`}function ov(e){return e==="pending"?"\uD68C\uBCF5 \uD6C4 \uC790\uB3D9 \uC7AC\uAC1C \uB300\uAE30":e==="disarmed"?"\uC790\uB3D9 \uC7AC\uAC1C \uC18C\uC9C4 \xB7 \uC218\uB3D9 \uC870\uCE58 \uD544\uC694":typeof e=="string"&&e.startsWith("refused:")?`\uC790\uB3D9 \uC7AC\uAC1C \uAC70\uBD80 \xB7 ${e.slice(8)}`:""}function sv(e){return e==="none"?"\uACC4\uC815 \uC804\uD658 \uC548 \uD568 \xB7 \uC870\uAC74\uC744 \uB9CC\uC871\uD558\uB294 \uB2E4\uB978 \uACC4\uC815 \uC5C6\uC74C":e==="disabled"?"\uACC4\uC815 \uC804\uD658 \uC548 \uD568 \xB7 \uC790\uB3D9 \uC804\uD658 \uAEBC\uC9D0":""}function iv(e){if(!e||e.open!==!0)return"";let t=[e.target?.model,e.target?.account_alias||e.target?.account].filter(i=>typeof i=="string"&&i.length>0).join(" \xB7 "),n=Bl(e.resets_at),r=ov(e.auto_resume),o=sv(e.auto_switch);return c`<div
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
            <dd>${Dr(e.log_path)}</dd>
          </div>`:""}
    </dl>
  </div>`}function av(e){return!e||!e.repo&&!e.serial_lane_id?"":c`${e.repo?c`<span
        class="worker-card__repo rtile__repo"
        title=${e.root_dir||""}
        >${e.repo}</span
      >`:""}${e.serial_lane_id?c`<span class="rtile__lane">${e.serial_lane_id}</span>`:""}`}var lv=new Set(["codex-runner"]);function cv(e,t,n,r=null){if(!e)return"";let o=e.last_activity||null,i=o&&typeof o.text=="string"?o.text:"",s=o&&typeof o.at=="number"?o.at:null,l=(r||!Array.isArray(e.legs)?[]:e.legs).filter(_=>_&&!(typeof _.agent_type=="string"&&lv.has(_.agent_type))),a=l.filter(_=>_&&_.state==="live"),u=l.filter(_=>_&&_.state!=="live"),d=r&&typeof r.last_event_at=="number"?fn(r.last_event_at,t):"",p=r?fn(r.updated_at,t):"",m=d?`\uCD5C\uADFC \uD65C\uB3D9 ${d}`:p?`\uAC31\uC2E0 ${p}`:"";return c`${i?c`<div class="rtile__activity${n?" is-paused":""}">
        <span class="rtile__activity-dot" aria-hidden="true"></span>
        <span class="rtile__activity-text">${i}</span>
        ${s!==null?c`<span class="rtile__activity-age"
              >${fn(s,t)}</span
            >`:""}
      </div>`:m?c`<div class="rtile__activity rtile__activity--session">
          <span class="rtile__activity-dot" aria-hidden="true"></span>
          <span class="rtile__activity-text">${m}</span>
        </div>`:""}${a.length>0||u.length>0?c`<div class="rtile__legs">
        ${a.map(_=>c`<span
              class="rtile__leg rtile__leg--live"
              title="이 세션이 띄운 서브에이전트/Codex 세션이 실행 중입니다"
              >위임 중 · ${_.label}</span
            >`)}${u.length>0?c`<span
              class="rtile__leg rtile__leg--done"
              title=${`\uC644\uB8CC\uB41C \uC704\uC784: ${u.map(_=>_.label).join(", ")}`}
              >위임 완료 ${u.length}</span
            >`:""}
      </div>`:""}`}var uv={remote:"\uB2E4\uB978 \uBA38\uC2E0 \uC138\uC158 \u2014 \uC774 \uC11C\uBC84\uC5D0 transcript \uC5C6\uC74C",missing:"transcript \uD30C\uC77C \uC5C6\uC74C"};function dv(e){if(!e)return"";let t=uv[e.locality]||"";return c`<button
    type="button"
    class="rtile__session"
    ?disabled=${t.length>0}
    title=${t||"\uB77C\uC774\uBE0C \uC138\uC158 \uC5F4\uAE30"}
    aria-label="라이브 세션 열기"
  >
    ▤ 세션
  </button>`}function pv(e,t,n,r=""){if(e==="provider_hold")return c`<div class="rtile__foot">
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
    </div>`;if(e==="retry_wait")return n?c`<div class="rtile__foot">${n}</div>`:"";let o=ev(t?.summary);if(e==="waiting")return c`${o?c`<p class="rtile__held-summary">${o}</p>`:""}${r}
      <div class="rtile__foot">${n}</div>`;let i=cf(t);return c`${o?c`<p class="rtile__held-summary">${o}</p>`:""}${i}
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
    </div>`}function Ul(e,t,n=null,r={}){let o=e.kind==="session",i=o&&Array.isArray(e.session_refs)&&e.session_refs.find(Te=>Te&&Te.current===!0)||null,s=e.failed===!0,l=s&&e.failure||null,a=e.parked===!0&&!s,u=e.retry_wait===!0&&!s&&!a,d=e.waiting===!0&&!s&&!a&&!u,p=e.provider_hold===!0&&!s&&!a&&!u&&!d,m=a&&e.failure||null,_=d&&e.wait||null,w=p&&e.hold||null,R=a||u||d||p,I=!!e.paused,U=s||R?e.status_label||(a?"\uC138\uC158 \uB300\uAE30":u?"\uC7AC\uC2DC\uB3C4 \uB300\uAE30":d?"\uC120\uD589 \uB300\uAE30":p?"\uACF5\uAE09\uC790 \uBCF4\uB958":e.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328"):I?"\uC77C\uC2DC\uC815\uC9C0":typeof e.started_at=="number"?Jy(t-e.started_at):"\u2014",se=e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker)?e.exec_chips:null,W=Io(e),j=cn(e.usage),O=er(e.usage),q=e.conflict_resolution?I?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":"\uCDA9\uB3CC \uD574\uC18C":null,z=e.base_exception||null,Y=e.landing,N=e.attempt_id&&e.attempt_id===n,F=r.monitor||null,H=av(F),G=pi(F?.cross_lane_chip),ee=F?di(F.dependency_chips):"",ye=cv(F,t,I,o?{updated_at:e.updated_at??null,last_event_at:i&&i.locality==="local"?i.last_event_at:null}:null),qe=o&&e.workflow?.chips?.exec_receipt||null,B=fi(e.workflow),X=_i(e.rec,e.chip_popover?.chip_key==="rec"),Se=e.chip_popover?lo(e.chip_popover.content):"",Ee=qe?c`<span
        class="ctl-chip ctl-chip--exec-receipt"
        title=${`exec_receipt ${Jn(qe)}`}
        >${`${qe.kind}:${js(qe)}`}</span
      >`:"",C=i?c`<span
        class="ctl-chip ctl-chip--sref"
        title=${`${i.provider}:${i.session_id}@${i.host}${(e.session_refs||[]).length>=2?` \xB7 \uC774\uB825 ${(e.session_refs||[]).length}`:""}`}
        >${Lo(i)}</span
      >`:"",re=H||G||B||C||Ee||X?c`<div class="rtile__meta">
          ${H}${G}${B}${C}${Ee}${X}${Se}
        </div>`:"",ke=l?c`<button
          type="button"
          class="rtile__failure-badge"
          data-attempt-id=${l.attempt_id}
          aria-expanded=${l.open===!0?"true":"false"}
          aria-label="실패 상세"
        >
          ⛔ ${nf(l.cause)||"\uC2E4\uD328"}
        </button>
        ${l.halted_auto_advance?c`<span class="rtile__auto-halted">자동 진행 꺼짐</span>`:""}`:"",ve=a?c`<span
        class="rtile__held-badge"
        title="세션이 사용자 결정을 기다리며 정상 종료했습니다 — 큐는 계속 갑니다"
        >⏸ 세션 대기</span
      >`:u?c`<span
          class="rtile__held-badge"
          title="환경성 실패의 자동 재시도를 기다립니다 — 사람이 할 일은 없습니다"
          >${tv(e.retry)}</span
        >`:d?c`<span
            class="rtile__held-badge"
            title="세션이 선행 미충족으로 착수를 거부했습니다 — 선행이 닫히면 저절로 다시 돕니다"
            >⛓ 선행 대기</span
          >`:p&&w?c`<button
              type="button"
              class="rtile__held-badge rtile__provider-hold-badge"
              data-attempt-id=${e.attempt_id}
              aria-expanded=${w.open===!0?"true":"false"}
              aria-label="공급자 보류 상세"
            >
              ${nv(w)}
            </button>`:"",Me=c`${q?c`<span class="worker-mini__badge">${q}</span>`:""}${z?c`<span
        class="worker-mini__badge"
        title="이 세션의 target base가 워크스페이스 선언 base와 다릅니다"
        >${z}</span
      >`:""}${ke}${ve}`,he=o?"":go(e),Le=Js(l?.quickfix_landing),Xe=Le==="settlement"?"\uC815\uC0B0 \uC7AC\uAC1C":"\uC774\uC5B4\uD558\uAE30",it=Le==="settlement"?"\uCC29\uC9C0 \uC815\uC0B0\uC744 \uB2E4\uC2DC \uC2E4\uD589":"\uAC19\uC740 \uC138\uC158\uC73C\uB85C \uC774\uC5B4\uC11C \uC9C4\uD589",P=e.resolve_action?c`<button
        type="button"
        class="rtile__resolve"
        ?disabled=${e.resolve_enabled===!1}
        title=${e.resolve_title||"\uC774 \uC2E4\uD328\uB97C \uC0AC\uB78C\uC774 \uC774\uC5B4\uBC1B\uB294 \uB300\uD654\uD615 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4"}
        aria-label="세션에서 해결"
      >
        세션에서 해결
      </button>`:"",ce=e.discard?.action&&!(s&&l?.landed===!0)?c`<button
          type="button"
          class="rtile__discard"
          data-operation-id=${e.discard.operation?.operation_id||""}
          data-confirmation=${l?.confirmation||"unmerged"}
          ?disabled=${!e.discard.enabled}
          title=${e.discard.title}
          aria-label=${e.discard.label}
        >
          ${e.discard.label}
        </button>`:"",ie=ce&&e.discard?.abandon?.action===!0?c`<button
          type="button"
          class="rtile__discard-abandon"
          data-operation-id=${e.discard.operation?.operation_id||""}
          data-operation-kind=${e.discard.operation?.kind||""}
          data-last-error=${e.discard.error||""}
          title=${e.discard.abandon.title}
          aria-label=${e.discard.abandon.label}
        >
          ${e.discard.abandon.label}
        </button>`:"",de=ie?c`${ce}${ie}`:ce;return c`<div
    class="rtile${N?" rtile--sel":""}${I?" rtile--paused":""}${s?" rtile--failed rtile--compact":""}${R?" rtile--held rtile--compact":""}${a?" rtile--parked":""}${u?" rtile--retry-wait":""}${d?" rtile--waiting":""}${o?" rtile--session":""}${p?" rtile--provider-hold":""}${e.search_match===!1?" is-dimmed":""}"
    data-bead-id=${e.bead_id}
    data-attempt-id=${e.attempt_id||""}
  >
    <div class="rtile__hd">
      <span
        class="rtile__dot${o?" rtile__dot--session":""}"
        aria-hidden="true"
      ></span>
      <span class="rtile__id" title="클릭하면 ID 복사">${e.bead_id}</span>
      ${mi(e.priority)}${W?c`<span class="rtile__resumed" title=${W}>↻</span>`:""}${Me}
      <div class="rtile__hd-actions">
        ${o?c`${typeof e.started_at=="number"?c`<span class="rtile__elapsed">${U}</span>`:""}${dv(i)}<span
                class="rtile__session-badge"
                title="Worker가 아닌 세션이 in_progress로 잡은 이슈"
                >세션</span
              >`:c`<span class="rtile__elapsed">${U}</span>`}
        ${o||R?"":s?c`<button
                  type="button"
                  class="op-btn rtile__resume"
                  data-resume-kind=${Le}
                  ?disabled=${l?.resume_eligible===!1}
                  title=${l?.resume_eligible===!1?l.resume_reason||`${Xe} \uBD88\uAC00`:it}
                  aria-label=${Xe}
                >
                  ↻ ${Xe}
                </button>
                ${de}`:c`<button
                  type="button"
                  class="rtile__session"
                  title="라이브 세션 열기"
                  aria-label="라이브 세션 열기"
                >
                  ▤ 세션
                </button>
                ${I?c`<button
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
                ${de}`}${P}
      </div>
    </div>
    <div class="rtile__title">${e.title}</div>
    ${R?pv(a?"parked":u?"retry_wait":d?"waiting":"provider_hold",a?m:d?_:w,de,d?ee:""):s?"":c`${ye}${e.rollup?qs(e.rollup,{parent_id:e.bead_id,expanded:e.rollup_expanded===!0,childChips:xa}):""}
            ${Y?c`<div class="rtile__landing">
                  <span
                    class="merge-step${Y.failed?" merge-step--failed":""}"
                    style=${`--progress: ${Y.percent}%`}
                    >${Y.label}${Y.index>0?c`<span class="merge-step__n"
                          >${Y.index}/${Y.total}</span
                        >`:""}</span
                  >
                </div>`:""}
            ${ee}
            ${o?re:H||G||B||se||X||j.length>0||O?c`<div class="rtile__meta">
                    ${H}${G}${B}${ui(e.exec_chips)}${X}
                    ${j.length>0?j.map(Te=>c`<span
                              class="worker-usage"
                              title=${Te.tooltip}
                              >${Te.label}</span
                            >`):O?c`<span
                            class="worker-usage"
                            title=${Po(e.usage)}
                            >${O}</span
                          >`:""}${Se}
                  </div>`:""}
            ${si(e)} ${he}
            <!-- 살아있음만 말하는 비의미적 액센트 (UI-58y2 데스크톱 §실행 타일).
         quick_fix landing의 실제 진행은 위의 별도 진행 줄이 소유한다.
         일시정지된 타일은 살아있지 않으므로 액센트도 없다. -->
            ${s||I?"":c`<div class="rtile__accent" aria-hidden="true"></div>`}`}
    ${rv(l,t)}${iv(w)}
  </div>`}function fv(e){let t=e.last_activity&&typeof e.last_activity=="object"?e.last_activity:null,n=Array.isArray(e.legs)?e.legs:[],r=e.dependency_chips||null;return!t&&n.length===0&&!r&&e.kind!=="session"?null:{...t?{last_activity:t}:{},...n.length>0?{legs:n}:{},...r?{dependency_chips:r}:{}}}function uf(e,t=Date.now(),n=null){let r=Array.isArray(e)?e:[];return c`<div class="worker-rungrid" id="worker-rungrid">
    ${r.length===0?c`<div class="worker-rungrid__empty">실행 세션 없음</div>`:r.map(o=>Ul(o,t,n,{monitor:fv(o)}))}
  </div>`}var sn="",_v=["impl_runtime","impl_model","impl_effort"],df=["claude","codex"],mv=["claude_account","codex_account"],gv=5,Ji=1;function vn(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function ea(e,t){let n=t.transport,r=typeof t.root_dir=="string"&&t.root_dir.length>0?t.root_dir:null,o=t.notify||(E=>be(E,"error",4e3)),i={},s={},l={},a={},u=[],d=!1,p={state:"absent",values:{},warnings:[]},m={},_={},w=Promise.resolve(),R={claude:null,codex:null},I=!1,U=null,se={},W="",j="general",O="",q=!1,z=!1,Y=!1,N=null,F=!1;function H(){let E=t.queue?t.queue():null;return vn(E)?E:null}function G(){let E=H();return E?E.runner_catalog:null}function ee(){let E=H();return E&&vn(E.execution_defaults)?E.execution_defaults:null}function ye(){let E=H();return!!(E&&Object.hasOwn(E,"quick_fix_orchestration_model"))}function qe(){let E=t.implPresetStore?.get();return vn(E)&&Array.isArray(E.presets)?E:null}function B(){return r===null?{}:{root_dir:r}}async function X(E,L){return F||!n?null:await n(E,L)}function Se(E){E&&vn(E.queue)&&t.onQueueAdopt?.(E.queue)}async function Ee(E,L){let Z=H();if(!Z||F)return null;let pe=await X(E,{...L,...B(),expected_revision:Z.revision});if(Se(pe),r!==null&&pe&&pe.conflict){let fe=pe.queue&&typeof pe.queue.revision=="number"?pe.queue.revision:H()?.revision??Z.revision;pe=await X(E,{...L,...B(),expected_revision:fe}),Se(pe)}return pe}async function C(){d=!0,Oe();try{let E=await X("get-session-defaults",{...B()});i=vn(E?.values)?{...E.values}:{},s={...i},l={},a={},u=Array.isArray(E?.warnings)?E.warnings:[]}catch(E){u=["kv_read_failed"],o(`\uC138\uC158 \uAE30\uBCF8\uAC12\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4: ${E instanceof Error?E.message:String(E)}`)}finally{d=!1,Oe()}}async function re(){let E=Cu(i,s);if(Object.keys(E).length!==0){try{let L=await X("set-session-defaults",{values:E,...B()});i=vn(L?.values)?{...L.values}:{},s={...i},u=Array.isArray(L?.warnings)?L.warnings:[]}catch(L){o(`\uC138\uC158 \uAE30\uBCF8\uAC12 \uC800\uC7A5 \uC2E4\uD328: ${L instanceof Error?L.message:String(L)}`)}Oe()}}function ke(E,L){if(!vn(E))return;let Z=E.state;p={state:Z==="usable"||Z==="unusable"||Z==="absent"?Z:"absent",values:vn(E.values)?{...E.values}:{},warnings:Array.isArray(E.warnings)?E.warnings:[]},_={...p.values},L&&(m={..._})}async function ve(){try{ke(await X("get-workspace-accounts",{...B()}),!0)}catch(E){p={state:"unusable",values:{},warnings:["kv_read_failed"]},_={},m={},o(`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4: ${E instanceof Error?E.message:String(E)}`)}Oe()}async function Me(E){try{let L=await fetch(E);if(!L.ok)return null;let Z=await L.json();if(!vn(Z)||!Array.isArray(Z.accounts))return null;let pe=Z.accounts.filter(fe=>vn(fe)&&typeof fe.key=="string"&&fe.key.length>0&&typeof fe.email=="string"&&fe.email.length>0);return{accounts:pe,active:pe.find(fe=>fe.active===!0)||null}}catch{return null}}async function he(){I=!0;let[E,L]=await Promise.all([Me("/api/claude-usage"),Me("/api/codex-usage")]);F||(R={claude:E,codex:L},Oe())}function Le(){let E={};for(let L of mv){let Z=Object.hasOwn(m,L)?m[L]:null,pe=Object.hasOwn(_,L)?_[L]:null;Z!==pe&&(E[L]=Z)}return E}async function Xe(){let E=Le();if(Object.keys(E).length!==0){try{ke(await X("set-workspace-accounts",{values:E,...B()}),!1)}catch(L){o(`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12 \uC800\uC7A5 \uC2E4\uD328: ${L instanceof Error?L.message:String(L)}`)}Oe()}}function it(E,L){L===sn?delete m[E]:m[E]=L,Oe(),w=w.then(()=>Xe())}function P(E,L){if(_v.includes(E)){_e(E,L);return}L===sn?delete s[E]:s[E]=L,Oe(),re()}function ce(E,L){l[E]=L,delete a[E]}function ie(E,L,Z){if(l[E]=L,L.length>0&&!Z(L)){a[E]=!0,Oe();return}delete l[E],delete a[E],L.length===0?delete s[E]:s[E]=L,Oe(),re()}function de(){let E=me().orchestration_model,L=En({global:{orchestration_model:E??void 0},execution_defaults:ee(),runner_catalog:G()}).orchestration_model.value;return L?Dn(G(),L):null}function Te(E,L){typeof L=="string"&&L.length>0?s[E]=L:delete s[E]}function _e(E,L){let Z=L===sn?void 0:L,pe=Su({impl_runtime:E==="impl_runtime"?Z:s.impl_runtime,impl_model:E==="impl_model"?Z:s.impl_model,impl_effort:E==="impl_effort"?Z:s.impl_effort},G(),de());Te("impl_runtime",pe.impl_runtime),Te("impl_model",pe.impl_model),Te("impl_effort",pe.impl_effort),Oe(),re()}async function De(){let E=H();if(!E)return;let L={orchestration_model:E.orchestration_model??null,orchestration_effort:E.orchestration_effort??null,orchestration_speed:E.orchestration_speed??null,quick_fix_orchestration_model:E.quick_fix_orchestration_model??null,quick_fix_orchestration_effort:E.quick_fix_orchestration_effort??null,quick_fix_orchestration_speed:E.quick_fix_orchestration_speed??null},Z=Ru(L,{...L,...se});if(Object.keys(Z).length!==0){try{let pe=await Ee("worker-queue-set-orchestration-defaults",{values:Z});if(pe&&pe.applied===!1){o("Worker \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC");return}se={}}catch(pe){o(`Worker \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${pe instanceof Error?pe.message:String(pe)}`)}Oe()}}function Be(E,L){se[E]=L===sn?null:L,Oe(),De()}function Qe(E){if(U=E,!E){Oe();return}let L=G(),Z=me(),pe=Z.orchestration_model;pe&&!fo(L,E).includes(pe)&&(se.orchestration_model=null,pe=null);let fe=Z.orchestration_effort;fe&&!Qs(L,E,pe||$n).includes(fe)&&(se.orchestration_effort=null),Oe(),De()}async function Fe(E){if(!(!H()||E<Ji)){try{await Ee("worker-queue-set-slots",{slots:E})}catch(L){o(`slots \uC800\uC7A5 \uC2E4\uD328: ${L instanceof Error?L.message:String(L)}`)}Oe()}}async function te(E){if(!(!H()||E<Ji||E>gv)){try{await Ee("worker-queue-set-serial-lane-count",{count:E})}catch(L){o(`\uC9C1\uB82C \uB808\uC778 \uC800\uC7A5 \uC2E4\uD328: ${L instanceof Error?L.message:String(L)}`)}Oe()}}async function V(E,L){let Z=E==="auto_advance"?"worker-automation-toggle":E==="auto_merge"?"worker-merge-auto-toggle":"worker-provider-auto-switch-toggle";try{await Ee(Z,{on:L})}catch(pe){o(`\uC790\uB3D9\uD654 \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${pe instanceof Error?pe.message:String(pe)}`)}Oe()}function $e(){let E={},L=me();for(let Z of uo){let pe=Pn.includes(Z)?L[Z]:s[Z];typeof pe=="string"&&pe.length>0&&(E[Z]=pe)}return E}async function _t(){let E=qe();if(!E)return;let L=$e();if(Object.keys(L).length===0){o("\uC800\uC7A5\uD560 \uC2E4\uD589 \uC124\uC815\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uBA3C\uC800 \uC2E4\uD589 \uAC12\uC744 \uC120\uD0DD\uD558\uC138\uC694");return}let Z=(E.presets||[]).find(fe=>fe.id===W),pe=O.trim()||(Z?Z.name:"");if(!pe){o("\uD504\uB9AC\uC14B \uC774\uB984\uC744 \uC785\uB825\uD558\uC138\uC694");return}try{let fe=Z?await X("impl-preset-update",{expected_revision:E.revision,id:Z.id,name:pe,settings:L}):await X("impl-preset-create",{expected_revision:E.revision,name:pe,settings:L});if(fe&&fe.applied){if(O="",!Z&&Array.isArray(fe.presets)){let Pe=fe.presets.find(ht=>ht.name===pe);W=Pe?Pe.id:W}Oe()}else o("\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4"),Oe()}catch(fe){o(`\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328: ${fe instanceof Error?fe.message:String(fe)}`)}}async function at(){let E=qe();if(!(!E||W.length===0))try{let L=await X("impl-preset-delete",{expected_revision:E.revision,id:W});L&&L.applied?(W="",Oe()):(o("\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328: \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4"),Oe())}catch(L){o(`\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328: ${L instanceof Error?L.message:String(L)}`)}}function Ke(E){i=vn(E.values)?{...E.values}:{},s={...i},u=Array.isArray(E.warnings)?E.warnings:[],vn(E.queue)&&(t.onQueueAdopt?.(E.queue),se={})}async function $(E){let L=qe(),Z=H();if(!L||!Z||W.length===0||E==="quick_fix"&&!ye())return;let pe=fe=>({preset_id:W,expected_revision:L.revision,expected_queue_revision:fe,...E==="quick_fix"?{lane:"quick_fix"}:{},...B()});try{let fe=await X("apply-impl-preset-global",pe(Z.revision));if(E==="quick_fix"&&fe&&fe.lane!=="quick_fix"){o("\uC11C\uBC84 \uC751\uB2F5\uC5D0 lane\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uD050 \uC2A4\uB0C5\uC0F7\uC744 \uB2E4\uC2DC \uBC1B\uC740 \uB4A4 \uD655\uC778\uD558\uC138\uC694"),Oe();return}if(fe&&fe.applied&&Ke(fe),r!==null&&fe&&fe.queue_applied===!1){let Pe=fe.queue&&typeof fe.queue.revision=="number"?fe.queue.revision:H()?.revision??Z.revision;if(fe=await X("apply-impl-preset-global",pe(Pe)),E==="quick_fix"&&fe&&fe.lane!=="quick_fix"){o("\uC11C\uBC84 \uC751\uB2F5\uC5D0 lane\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uD050 \uC2A4\uB0C5\uC0F7\uC744 \uB2E4\uC2DC \uBC1B\uC740 \uB4A4 \uD655\uC778\uD558\uC138\uC694"),Oe();return}fe&&fe.applied&&Ke(fe)}fe&&fe.applied?fe.queue_applied===!1&&o("\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uAC12\uC740 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC138\uC694"):fe&&fe.conflict&&o("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328: \uD504\uB9AC\uC14B\uC774 \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4")}catch(fe){o(`\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328: ${fe instanceof Error?fe.message:String(fe)}`)}Oe()}async function J(){z=!0,Y=!1,Oe();try{let E=await X("get-worker-system-prompt",{});!E||typeof E!="object"||Array.isArray(E)?Y=!0:N=E}catch{Y=!0}finally{z=!1,Oe()}}function Re(){if(q=!q,q&&!N){J();return}Oe()}function je(){let E=ko({loading:z,error:Y});if(E)return E;if(!N)return"";let L=Array.isArray(N.variants)?N.variants:[];return c`<div class="settings-dialog__sp-body">
      ${N.target_base_placeholder?c`<div class="prompt-block__meta">
            \`${N.target_base_placeholder}\`는 디스패치 시점에 해석된
            base로 치환됩니다.
          </div>`:""}
      ${L.map(Z=>c`<div class="settings-dialog__sp-variant" data-variant=${Z.key}>
            <div class="settings-dialog__sp-cond">${Z.condition}</div>
            ${ar(Z.label,Z.system_prompt)}
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
        aria-expanded=${q?"true":"false"}
        @click=${Re}
      >
        ${q?"\uC811\uAE30":"\uC804\uBB38 \uBCF4\uAE30"}
      </button>
      ${q?je():""}
    </section>`}function et(E,L,Z,pe,fe,Pe,ht,$t){let gt=fe[E]??sn,Bt=Da(E,Z,fe,ee(),G(),ht,$t),bt=Bt.options.find(Rt=>Rt.value===gt),Ct=gt===sn?Bt.full_value:bt?.full_value;return c`<select
        class=${gt===sn?"settings-dialog__unset":""}
        data-key=${E}
        aria-label=${L}
        title=${Ct||""}
        ?disabled=${Pe===!0||$t!=="quick_fix"&&Bt.disabled}
        .value=${vr(String(gt))}
        @change=${Rt=>pe(E,String(Rt.target.value))}
      >
        <option value=${sn} ?selected=${gt===sn}>
          ${Bt.unset_label}
        </option>
        ${Bt.options.map(Rt=>c`<option
              value=${Rt.value}
              title=${Rt.full_value||""}
              ?selected=${Rt.value===gt}
            >
              ${Rt.label}
            </option>`)}
      </select>
      ${gt===sn?c`<span class="settings-dialog__source-badge">기본</span>`:""}`}function Ue(E,L,Z,pe,fe,Pe=!1,ht,$t=null,gt=null){return c`<div
      class=${`settings-dialog__row${Pe?" settings-dialog__row--off":""}`}
      title=${Pe&&gt?gt:""}
    >
      <span class="settings-dialog__row-label">${L}</span>
      <span class="settings-dialog__controls">
        ${et(E,L,Z,pe,fe,Pe,ht,$t)}
      </span>
    </div>`}function ct(E,L,Z,pe,fe,Pe){let ht=Object.hasOwn(a,E),$t=l[E]??s[E]??sn;return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${L}</span>
      <span class="settings-dialog__controls">
        <input
          type="text"
          class=${`settings-dialog__text${ht?" settings-dialog__text--invalid":""}`}
          data-key=${E}
          aria-label=${L}
          aria-invalid=${String(ht)}
          placeholder=${Z}
          .value=${vr($t)}
          @input=${gt=>ce(E,String(gt.target.value))}
          @change=${gt=>ie(E,String(gt.target.value).trim(),Pe)}
        />
        ${$t.length===0?c`<span class="settings-dialog__source-badge">기본</span>`:""}
        <span class="settings-dialog__hint" data-key-hint=${E}
          >${ht?fe:pe}</span
        >
      </span>
    </div>`}function Gt(E,L){let Z=L?L.active:null;return vn(Z)?`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(${E==="claude"?Z.email:$o({...Z,alias:null})})`:"\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(\uD655\uC778 \uBD88\uAC00)"}function At(E,L,Z){let pe=R[Z],fe=Object.hasOwn(m,E)?m[E]:sn,Pe=Z==="claude"?zi:$o,ht=!!pe?.accounts.some($t=>$t.key===fe);return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${L}</span>
      <span class="settings-dialog__controls">
        <select
          aria-label=${L}
          data-account-key=${E}
          @change=${$t=>it(E,String($t.target.value))}
        >
          <option value=${sn} ?selected=${fe.length===0}>
            ${Gt(Z,pe)}
          </option>
          ${fe.length>0&&!ht?c`<option value=${fe} selected>
                ${fe} (목록에 없음)
              </option>`:""}
          ${pe?.accounts.map($t=>c`<option value=${$t.key} ?selected=${$t.key===fe}>
                ${Pe($t)}
              </option>`)||""}
        </select>
        ${pe?"":c`<span class="settings-dialog__hint"
              >계정 목록을 불러올 수 없습니다</span
            >`}
      </span>
    </div>`}function kt(){let E=p.warnings.join(", ");return p.state==="unusable"?`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12\uC744 \uD574\uC11D\uD560 \uC218 \uC5C6\uC5B4 \uC774 \uB808\uD3EC\uC758 \uB514\uC2A4\uD328\uCE58\uAC00 \uAC70\uBD80\uB429\uB2C8\uB2E4 \u2014 ${E} \xB7 \uACC4\uC815\uC744 \uB2E4\uC2DC \uACE0\uB974\uBA74 \uD574\uC18C\uB429\uB2C8\uB2E4`:p.warnings.length>0?`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12\uC5D0 \uC54C \uC218 \uC5C6\uB294 \uD0A4\uAC00 \uC788\uC2B5\uB2C8\uB2E4 \u2014 ${E}`:null}function wt(E,L,Z,pe,fe,Pe){return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">
        <i
          class="settings-dialog__stage-dot"
          style=${`background: var(--stage-${L}-on)`}
        ></i>
        ${E}
      </span>
      <span class="settings-dialog__controls">
        ${et(Z,`${E} \uBAA8\uB378`,pe,P,s,!1)}
        ${et(fe,`${E} effort`,Vs,P,s,!1)}
        ${et(Pe,`${E} \uC18D\uB3C4`,$u,P,s,!1)}
      </span>
    </div>`}function jt(E,L,Z,pe){return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${L}</span>
      <span class="settings-dialog__controls">
        <button
          type="button"
          class=${`settings-dialog__toggle${pe?" is-on":""}`}
          data-automation=${E}
          aria-pressed=${pe?"true":"false"}
          aria-label=${L}
          @click=${()=>V(E,!pe)}
        >
          ${pe?"\uCF1C\uC9D0":"\uAEBC\uC9D0"}
        </button>
        <span class="settings-dialog__hint">${Z}</span>
      </span>
    </div>`}function Lt(E,L,Z,pe){return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${L}</span>
      <span class="settings-dialog__controls">
        <span class="settings-dialog__stepper" data-stepper=${E}>
          <button
            type="button"
            aria-label=${`${L} \uAC10\uC18C`}
            @click=${()=>pe(Z-1)}
          >
            −
          </button>
          <span class="settings-dialog__stepper-value">${Z}</span>
          <button
            type="button"
            aria-label=${`${L} \uC99D\uAC00`}
            @click=${()=>pe(Z+1)}
          >
            +
          </button>
        </span>
      </span>
    </div>`}function ae(E,L){return c`<div class="settings-dialog__preset-diff" data-preset-diff>
      <div class="settings-dialog__preset-diff-head">
        ${E.rows.length>0?`\uBCC0\uACBD ${E.rows.length}\uAC1C \xB7 \uC801\uC6A9\uD558\uBA74 \uC544\uB798\uC640 \uAC19\uC774 \uBC14\uB01D\uB2C8\uB2E4`:"\uD604\uC7AC \uC124\uC815\uACFC \uAC19\uC2B5\uB2C8\uB2E4 \u2014 \uC801\uC6A9\uD560 \uBCC0\uACBD\uC774 \uC5C6\uC2B5\uB2C8\uB2E4"}
      </div>
      ${E.rows.map(Z=>c`<div
            class="settings-dialog__preset-diff-row"
            data-diff-kind=${Z.kind}
          >
            <span class="settings-dialog__preset-diff-label">${Z.label}</span>
            <span class="settings-dialog__preset-diff-value"
              >${Z.before??"\uAE30\uBCF8"}</span
            >
            <span class="settings-dialog__preset-diff-arrow">→</span>
            <span
              class="settings-dialog__preset-diff-value settings-dialog__preset-diff-after"
              >${Z.after??(L==="quick_fix"?"\uAE30\uBCF8(\uD574\uC81C \u2192 \uC77C\uBC18 \uD504\uB85C\uD30C\uC77C)":"\uAE30\uBCF8(\uD574\uC81C)")}</span
            >
          </div>`)}
      ${E.ignored_keys.length>0?c`<div class="settings-dialog__preset-diff-note">
            ${E.ignored_keys.join(", ")}은(는)
            ${L==="quick_fix"?"quick_fix \uB808\uC778":"\uC804\uC5ED"} 적용이 쓰지 않는
            키라 무시됩니다
          </div>`:""}
    </div>`}function me(){let E=H(),L={};for(let Z of[...Pn,...co])L[Z]=Object.prototype.hasOwnProperty.call(se,Z)?se[Z]:E&&typeof E[Z]=="string"?E[Z]:null;return L}function Ge(){let E=me(),L={};for(let Z of co)L[Z]=E[Z]??null;for(let Z of["quick_fix_impl_dispatch","quick_fix_impl_runtime","quick_fix_impl_model","quick_fix_impl_effort","quick_fix_impl_speed"])L[Z]=s[Z]??null;return L}function lt(){let E=G(),L=s.impl_runtime,Z=s.impl_model,pe=qe(),fe=H(),Pe=me(),ht=fo(E,U),$t=po(E,void 0).filter(A=>A!==$n),gt=Lr(E,void 0,void 0),Bt=Qs(E,U,Pe.orchestration_model||$n).filter(A=>A!==$n),bt=W?(pe?.presets||[]).find(A=>A.id===W):null,Ct=bt?Eu($e(),vn(bt.settings)?bt.settings:{}):null,Rt={quick_fix_orchestration_model:fo(E,null),quick_fix_orchestration_effort:Qs(E,null,null).filter(A=>A!==$n),quick_fix_orchestration_speed:Gn,quick_fix_impl_dispatch:Do,quick_fix_impl_runtime:df,quick_fix_impl_model:$t,quick_fix_impl_effort:gt,quick_fix_impl_speed:Gn},en=bt?Tu(Ge(),vn(bt.settings)?bt.settings:{},Rt):null,Yt=j==="quick_fix"?en:Ct,Dt=ye(),xt=Dt?null:"\uC11C\uBC84\uAC00 quick_fix \uB808\uC778\uC744 \uC9C0\uC6D0\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4",Ht={...s,...Pe},nn=fe&&typeof fe.slots=="number"?fe.slots:Ji+1,Ut=fe&&typeof fe.serial_lane_count=="number"?fe.serial_lane_count:Ji,an=ee()?.supported===!0,Zt=kt(),xe=Da("workflow_mode",Mo,s,ee(),E);return c`
      ${u.length>0?c`<div class="settings-dialog__banner" role="alert">
            워크스페이스 기본값을 일부 읽지 못했습니다 —
            ${u.join(", ")}
          </div>`:""}
      ${Zt?c`<div
            class="settings-dialog__banner"
            data-account-warning
            role="alert"
          >
            ${Zt}
          </div>`:""}
      ${an?"":c`<div
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
                .value=${vr(W)}
                @change=${A=>{W=String(A.target.value),Oe()}}
              >
                <option value="" ?selected=${W===""}>
                  실행 프리셋…
                </option>
                ${(pe?.presets||[]).map(A=>c`<option
                      value=${A.id}
                      ?selected=${A.id===W}
                    >
                      ${A.name}
                    </option>`)}
              </select>
              <button
                type="button"
                class="settings-dialog__btn settings-dialog__btn--primary op-btn"
                data-preset-apply-global
                data-preset-apply-general
                ?disabled=${!Ct||Ct.rows.length===0}
                @click=${()=>$("general")}
              >
                일반에 적용
              </button>
              <button
                type="button"
                class="settings-dialog__btn op-btn"
                data-preset-apply-quick-fix
                title=${xt||""}
                ?disabled=${!Dt||!en||en.rows.length===0}
                @click=${()=>$("quick_fix")}
              >
                quick_fix 레인에 적용
              </button>
              <input
                type="text"
                class="settings-dialog__preset-name"
                placeholder=${W?"\uC774\uB984 (\uBE44\uC6B0\uBA74 \uC720\uC9C0)":"\uC0C8 \uD504\uB9AC\uC14B \uC774\uB984"}
                aria-label="프리셋 이름"
                .value=${vr(O)}
                @input=${A=>{O=String(A.target.value)}}
              />
              <button
                type="button"
                class="settings-dialog__btn"
                data-preset-save
                title=${W?"\uD604\uC7AC \uD654\uBA74\uC758 \uC2E4\uD589 \uC124\uC815\uC744 \uC774 \uD504\uB9AC\uC14B\uC5D0 \uC800\uC7A5\uD569\uB2C8\uB2E4 (\uD504\uB9AC\uC14B \u2192 \uC124\uC815 \uBC29\uD5A5\uC774 \uC544\uB2D8)":"\uD604\uC7AC \uD654\uBA74\uC758 \uC2E4\uD589 \uC124\uC815\uC744 \uC0C8 \uD504\uB9AC\uC14B\uC73C\uB85C \uC800\uC7A5\uD569\uB2C8\uB2E4"}
                @click=${_t}
              >
                ${W?"\uD604\uC7AC \uC124\uC815\uC73C\uB85C \uB36E\uC5B4\uC4F0\uAE30":"\uC0C8 \uD504\uB9AC\uC14B \uC800\uC7A5"}
              </button>
              <button
                type="button"
                class="settings-dialog__btn"
                data-preset-delete
                ?disabled=${W.length===0}
                @click=${at}
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
                aria-pressed=${String(j==="general")}
                @click=${()=>{j="general",Oe()}}
              >
                일반
              </button>
              <button
                type="button"
                data-preset-lane="quick_fix"
                aria-pressed=${String(j==="quick_fix")}
                @click=${()=>{j="quick_fix",Oe()}}
              >
                quick_fix
              </button>
            </div>
            ${Yt?ae(Yt,j):""}

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">오케스트레이션</div>
              <div class="settings-dialog__row">
                <span class="settings-dialog__row-label">런타임</span>
                <span class="settings-dialog__controls">
                  <select
                    aria-label="런타임"
                    data-key="orchestration_runtime_filter"
                    .value=${vr(U||sn)}
                    @change=${A=>{let ge=String(A.target.value);Qe(ge===sn?null:ge)}}
                  >
                    <option value=${sn} ?selected=${!U}>
                      전체
                    </option>
                    <option
                      value="claude"
                      ?selected=${U==="claude"}
                    >
                      claude
                    </option>
                    <option
                      value="codex"
                      ?selected=${U==="codex"}
                    >
                      codex
                    </option>
                  </select>
                  <span class="settings-dialog__hint"
                    >모델 목록을 좁힙니다</span
                  >
                </span>
              </div>
              ${Ue("orchestration_model","\uBAA8\uB378",ht,Be,Pe)}
              ${Ue("orchestration_effort","effort",Bt,Be,Pe)}
              ${Ue("orchestration_speed","\uC18D\uB3C4",Gn,Be,Pe)}
            </div>

            <div class="settings-dialog__group" data-exec-accounts-group>
              <div class="settings-dialog__group-title">실행 계정</div>
              ${At("claude_account","Claude","claude")}
              ${At("codex_account","Codex","codex")}
              <div class="settings-dialog__row">
                <span class="settings-dialog__row-label">한도 대응</span>
                <span class="settings-dialog__controls">
                  <label class="settings-dialog__check">
                    <input
                      type="checkbox"
                      data-provider-auto-switch
                      .checked=${fe?.provider_auto_switch!==!1}
                      @change=${A=>V("provider_auto_switch",A.target.checked)}
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
                      @click=${()=>P("workflow_mode",sn)}
                    >
                      ${xe.unset_label}
                    </button>
                    ${s.workflow_mode?"":c`<span class="settings-dialog__source-badge"
                          >기본</span
                        >`}
                    ${Mo.map(A=>c`<button
                          type="button"
                          data-mode=${A}
                          aria-pressed=${String(s.workflow_mode===A)}
                          @click=${()=>P("workflow_mode",A)}
                        >
                          ${A}
                        </button>`)}
                  </span>
                </span>
              </div>
              ${ct("bdui_url","beads-ui \uC8FC\uC18C","http://\uD638\uC2A4\uD2B8:3000","\uC138\uC158\uC774 Worker \uB808\uC778 \uBC30\uCE58\uB97C \uBB3C\uC5B4\uBCFC \uB54C \uC4F0\uB294 \uC8FC\uC18C\uC785\uB2C8\uB2E4","http:// \uB610\uB294 https:// \uB85C \uC2DC\uC791\uD558\uB294 \uC8FC\uC18C\uB9CC \uC800\uC7A5\uB429\uB2C8\uB2E4 (\uACBD\uB85C \uC5C6\uC774)",wu)}
            </div>

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">
                리뷰 게이트
                <span class="settings-dialog__hint">모델 · effort · 속도</span>
              </div>
              ${wt("\uC0AC\uC591 \uB9AC\uBDF0","spec","spec_review_model",qo,"spec_review_effort","spec_review_speed")}
              ${wt("\uACC4\uD68D \uB9AC\uBDF0","plan","plan_review_model",Ys,"plan_review_effort","plan_review_speed")}
              ${wt("\uAD6C\uD604 \uB9AC\uBDF0","impl","impl_review_model",qo,"impl_review_effort","impl_review_speed")}
            </div>

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">
                구현
                <span class="settings-dialog__hint"
                  >이슈 핀이 있으면 핀이 우선합니다</span
                >
              </div>
              ${Ue("impl_runtime","\uC704\uC784 \uB300\uC0C1",Gs,P,s)}
              ${Ue("impl_model","\uBAA8\uB378",po(E,L),P,s)}
              ${Ue("impl_effort","effort",Lr(E,L,Z),P,s)}
              ${Ue("impl_speed","\uC18D\uB3C4",Gn,P,s)}
            </div>

            <div
              class="settings-dialog__group"
              data-quick-fix-group
              title=${xt||""}
            >
              <div class="settings-dialog__group-title">
                quick_fix 레인
                <span class="settings-dialog__hint"
                  >${"\uBE44\uC5B4 \uC788\uB294 \uAC12\uC740 \uC77C\uBC18 \uD504\uB85C\uD30C\uC77C\uB85C \uB5A8\uC5B4\uC9D1\uB2C8\uB2E4. \uC774\uC288 \uD540\uC774 \uC788\uC73C\uBA74 \uD540\uC774 \uC6B0\uC120\uD569\uB2C8\uB2E4."}</span
                >
              </div>
              ${Ue("quick_fix_orchestration_model","\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uBAA8\uB378",Rt.quick_fix_orchestration_model,Be,Pe,!Dt,Ht,"quick_fix",xt)}
              ${Ue("quick_fix_orchestration_effort","\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 effort",Rt.quick_fix_orchestration_effort,Be,Pe,!Dt,Ht,"quick_fix",xt)}
              ${Ue("quick_fix_orchestration_speed","\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uC18D\uB3C4",Gn,Be,Pe,!Dt,Ht,"quick_fix",xt)}
              ${Ue("quick_fix_impl_dispatch","\uC2E4\uD589 \uBC29\uC2DD",Do,P,s,!Dt,Ht,"quick_fix",xt)}
              ${Ue("quick_fix_impl_runtime","\uC704\uC784 \uB300\uC0C1",df,P,s,!Dt,Ht,"quick_fix",xt)}
              ${Ue("quick_fix_impl_model","\uBAA8\uB378",$t,P,s,!Dt,Ht,"quick_fix",xt)}
              ${Ue("quick_fix_impl_effort","effort",gt,P,s,!Dt,Ht,"quick_fix",xt)}
              ${Ue("quick_fix_impl_speed","\uC18D\uB3C4",Gn,P,s,!Dt,Ht,"quick_fix",xt)}
            </div>

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">
                자동화
                <span class="settings-dialog__hint"
                  >이 레포의 워커 큐가 스스로 진행하는 범위</span
                >
              </div>
              ${jt("auto_advance","\uC790\uB3D9\uD654","\uC2AC\uB86F\uC774 \uBE44\uBA74 \uB300\uAE30 \uC55E \uD589\uC774 \uCD9C\uBC1C\uD569\uB2C8\uB2E4",fe?.auto_advance===!0)}
              ${jt("auto_merge","\uBA38\uC9C0","\uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4",fe?.auto_merge===!0)}
              ${Lt("slots","\uB3D9\uC2DC \uC2E4\uD589",nn,A=>Fe(A))}
              ${Lt("serial-lane-count","\uC9C1\uB82C \uB808\uC778",Ut,A=>te(A))}
            </div>
            ${Je()}
          `}
    `}function Oe(){F||dt(lt(),e)}return{load(){se={},j="general",l={},a={};let E=[C(),ve()];return I||E.push(he()),Promise.all(E).then(()=>{})},render:Oe,sessionDraft:()=>({...s}),destroy(){F=!0,dt(c``,e)}}}function ta(e){return c`<svg
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
  </svg>`}function pf(){return ta(Co`<path d="M5.5 3.6 12 8l-6.5 4.4z" />`)}function ff(){return ta(Co`<path d="M6 3.8v8.4M10 3.8v8.4" />`)}function _f(){return ta(Co`<path
      d="M4.6 5.6v4.8M4.6 8.2h2.2A3.2 3.2 0 0 0 10 5"
    />
    <circle cx="4.6" cy="4" r="1.5" />
    <circle cx="4.6" cy="12" r="1.5" />
    <circle cx="11.4" cy="4" r="1.5" />`)}function mf(){return ta(Co`<circle cx="8" cy="8" r="2.1" />
    <path
      d="M8 1.9v1.8M8 12.3v1.8M1.9 8h1.8M12.3 8h1.8M3.7 3.7l1.3 1.3M11 11l1.3 1.3M12.3 3.7 11 5M5 11l-1.3 1.3"
    />`)}function gf(e){return`${e} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}function hf(e){let t=(Array.isArray(e)?e:[]).map(l=>l&&l.usage).filter(l=>l&&typeof l=="object"&&"providers"in l);if(t.length>0)return cn(Hs(t));let n={};for(let l of Kn)n[l]=0;let r=!1,o=0,i=0,s=0;for(let l of Array.isArray(e)?e:[]){let a=l&&l.usage;if(a&&typeof a=="object"){let u=!1;for(let d of Kn){let p=a[d];typeof p=="number"&&Number.isFinite(p)&&(n[d]+=p,r=!0,u=!0)}if(u){i+=1;let d=a.total_cost_usd;typeof d=="number"&&Number.isFinite(d)&&(o+=d,s+=1)}}}return i>0&&s===i&&(n.total_cost_usd=o),r?er(n):null}function Bn(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function Wl(e,t){let n=Bn(e?.counts)?e.counts:null,r=n?n[t]:null;return typeof r=="number"&&Number.isFinite(r)?r:0}function hv(e,t){if(!Bn(t))return e;let n={...e};for(let[r,o]of Object.entries(t))o!==void 0&&(n[r]=o);return n}function bv(e){if(!Bn(e)||!Bn(e.execution_defaults)||!Bn(e.runner_catalog)||!Bn(e.session_defaults))return null;let t={...e.session_defaults};for(let s of["orchestration_model","orchestration_effort","orchestration_speed"])typeof e[s]=="string"&&e[s].length>0&&(t[s]=e[s]);let n=En({global:t,execution_defaults:e.execution_defaults,runner_catalog:e.runner_catalog}),r=Dn(e.runner_catalog,n.orchestration_model.value??""),o=_o(n,e.runner_catalog),i=Pr(n,r);return o===null&&i===null?null:{orchestration:o,worker:i}}function bf(e,t){let n=t.notify||(C=>be(C,"error",4e3)),r=document.createElement("div");r.className="mon2-deck__main",e.appendChild(r);let o=document.createElement("div");o.className="mon2-deck__panel",o.hidden=!0;let i=document.createElement("div");i.className="mon2-deck__panel-hd";let s=document.createElement("span");s.className="mon2-deck__panel-title";let l=document.createElement("button");l.type="button",l.className="mon2-deck__panel-close",l.setAttribute("aria-label","\uC2E4\uD589 \uC124\uC815 \uB2EB\uAE30"),l.textContent="\u2715",i.append(s,l);let a=document.createElement("div");a.className="mon2-deck__panel-body",o.append(i,a),e.appendChild(o);let u=null,d=null,p=null,m=new Map;function _(){let C=t.workspacesState?t.workspacesState():[];return Array.isArray(C)?C.filter(re=>Bn(re)):[]}function w(C){return _().find(re=>re.root_dir===C)||null}function R(C){return hv(w(C),m.get(C))}function I(){for(let C of _()){let re=m.get(C.root_dir);re&&typeof re.revision=="number"&&typeof C.revision=="number"&&C.revision>=re.revision&&m.delete(C.root_dir)}}async function U(C,re,ke){let ve=t.transport,Me=R(re);if(!(!ve||!Bn(Me))){try{let he=await ve(C,{...ke,root_dir:re,expected_revision:Me.revision});if(Bn(he?.queue)&&m.set(re,he.queue),he&&he.conflict){let Le=Bn(he.queue)&&typeof he.queue.revision=="number"?he.queue.revision:R(re)?.revision;he=await ve(C,{...ke,root_dir:re,expected_revision:Le}),Bn(he?.queue)&&m.set(re,he.queue)}}catch(he){n(`\uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${he instanceof Error?he.message:String(he)}`)}X()}}function se(C){u!==C&&(u=C,t.onFocusChange?.(u),X())}function W(C){se(u===C?null:C)}function j(C){if(d===C){q();return}O(),d=C;let re=w(C);s.textContent=`${re?.name||C} \uC2E4\uD589 \uC124\uC815 \xB7 Worker \uD0ED \u2699 \uC2E4\uD589 \uD0ED\uACFC \uAC19\uC740 \uC800\uC7A5\uC18C`,o.hidden=!1,p=ea(a,{root_dir:C,queue:()=>R(C),transport:t.transport,implPresetStore:t.implPresetStore,notify:n,onQueueAdopt:ke=>{m.set(C,ke),X()}}),p.load(),X()}function O(){p?.destroy(),p=null}function q(C){O(),d=null,o.hidden=!0,s.textContent="",C!==!0&&X()}let z=()=>q();l.addEventListener("click",z);function Y(C){C.key==="Escape"&&u!==null&&se(null)}document.addEventListener("keydown",Y);function N(C,re){let ke=Math.max(re,C,1);return c`<span
      class="mon2-deck__rail"
      role="img"
      aria-label=${`\uC2AC\uB86F ${re}\uAC1C \uC911 ${C}\uAC1C \uC2E4\uD589 \uC911`}
    >
      ${Array.from({length:ke},(ve,Me)=>Me<C?c`<i class="mon2-deck__slot is-run"></i>`:c`<i class="mon2-deck__slot"></i>`)}
    </span>`}function F(C){let re=C.auto_advance===!0,ke=C.auto_merge===!0;return c`<button
        type="button"
        class=${`mon2-deck__op mon2-deck__auto${re?" is-on":""}`}
        data-act="auto"
        aria-pressed=${re?"true":"false"}
        aria-label=${`${C.name} \uC790\uB3D9\uD654`}
        title=${re?"\uC790\uB3D9\uD654 \uCF1C\uC9D0 \u2014 \uC2AC\uB86F\uC774 \uBE44\uBA74 \uB2E4\uC74C \uD589\uC774 \uCD9C\uBC1C\uD569\uB2C8\uB2E4":"\uC790\uB3D9\uD654 \uAEBC\uC9D0 \u2014 \uB2E4\uC74C \uD589\uC740 \uC218\uB3D9\uC73C\uB85C\uB9CC \uCD9C\uBC1C\uD569\uB2C8\uB2E4"}
      >
        ${re?ff():pf()}
      </button>
      <button
        type="button"
        class=${`mon2-deck__op mon2-deck__merge${ke?" is-on":""}`}
        data-act="merge"
        aria-pressed=${ke?"true":"false"}
        aria-label=${`${C.name} \uC790\uB3D9 \uBA38\uC9C0`}
        title=${ke?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0"}
      >
        ${_f()}
      </button>
      <button
        type="button"
        class=${`mon2-deck__op mon2-deck__gear${d===C.root_dir?" is-on":""}`}
        data-act="gear"
        aria-expanded=${d===C.root_dir?"true":"false"}
        aria-label=${`${C.name} \uC2E4\uD589 \uC124\uC815`}
        title="이 레포의 실행 설정"
      >
        ${mf()}
      </button>`}function H(C){let re=bv(C);return re?c`<div class="mon2-deck__chips">
      ${re.orchestration?c`<span class="mon2-deck__chip" title=${re.orchestration.title}
            >오케 ${re.orchestration.text}</span
          >`:""}
      ${re.worker?c`<span class="mon2-deck__chip" title=${re.worker.title}
            >워커 ${re.worker.text}</span
          >`:""}
    </div>`:""}function G(C){let re=[];for(let[ke,ve]of[["queue","\uB300\uAE30"],["pr_wait","PR"],["session_active","\uC138\uC158"]]){let Me=Wl(C,ke);Me>0&&re.push(`${ve} ${Me}`)}return re.join(" \xB7 ")}function ee(C){let re=Wl(C,"running"),ke=typeof C.slots=="number"?C.slots:1;return c`<div
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
          title=${`\uC2AC\uB86F ${ke}\uAC1C \uC911 ${re}\uAC1C \uC2E4\uD589 \uC911`}
        >
          <span class="mon2-deck__load-n">${re}/${ke}</span>
          ${N(re,ke)}
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
        <div class="mon2-deck__ops">${F(C)}</div>
        <span class="mon2-deck__counts">${G(C)}</span>
        ${H(C)}
      </div>
    </div>`}function ye(C){let re=t.doneItems?t.doneItems():[],ke=t.rangeLabel?t.rangeLabel():"",ve=hf(Array.isArray(re)?re:[]),Me=he=>C.reduce((Le,Xe)=>Le+Wl(Xe,he),0);return c`<div class="mon2-deck__bar">
      <span
        class="mon2-deck__total-counts"
        title=${`visible \uB808\uD3EC ${C.length}\uACF3\uC758 \uD569\uACC4\uC785\uB2C8\uB2E4 \u2014 \uC2E4\uD589\xB7\uB300\uAE30\xB7PR\uC740 \uC9C0\uAE08, \uC644\uB8CC\uB294 ${ke}`}
        >실행 ${Me("running")} · 대기 ${Me("queue")} · PR
        ${Me("pr_wait")}${Me("session_active")>0?` \xB7 \uC138\uC158 ${Me("session_active")}`:""}
        · ${ke} 완료
        ${Array.isArray(re)?re.length:0}</span
      >
      ${ve===null?"":c`<span class="mon2-deck__total-tokens">
            ${typeof ve=="string"?c`<span
                  class="mon2-deck__tok"
                  title=${gf(ke)}
                  >${ve}</span
                >`:ve.map(he=>c`<span
                      class="mon2-deck__tok"
                      data-provider=${he.provider}
                      title=${he.tooltip}
                      >${he.label}</span
                    >`)}
          </span>`}
    </div>`}function qe(){let C=_();return C.length===0?"":c`${ye(C)}
      <div class="mon2-deck__strip">
        ${C.map(re=>ee(re))}
      </div>`}function B(){u!==null&&!w(u)&&(u=null,t.onFocusChange?.(null))}function X(){I(),B(),d!==null&&!w(d)&&q(!0),dt(qe(),r),p?.render()}function Se(C){let re=C.target;if(!re||typeof re.closest!="function")return;let ke=re.closest("[data-root-dir]");if(!ke)return;let ve=ke.getAttribute("data-root-dir")||"",Me=re.closest("[data-act]")?.getAttribute("data-act");if(Me==="worker"){t.gotoWorkerTab?.(ve);return}if(Me==="auto"){U("worker-automation-toggle",ve,{on:R(ve)?.auto_advance!==!0});return}if(Me==="merge"){U("worker-merge-auto-toggle",ve,{on:R(ve)?.auto_merge!==!0});return}if(Me==="gear"){j(ve);return}W(ve)}function Ee(C){if(C.key!=="Enter"&&C.key!==" ")return;let re=C.target;if(!re||typeof re.closest!="function")return;let ke=re.closest('[data-root-dir][role="button"]');!ke||ke!==re||(C.preventDefault(),W(ke.getAttribute("data-root-dir")||""))}return r.addEventListener("click",Se),r.addEventListener("keydown",Ee),{render:X,focusRoot:()=>u,panelRoot:()=>d,destroy(){document.removeEventListener("keydown",Y),r.removeEventListener("click",Se),r.removeEventListener("keydown",Ee),l.removeEventListener("click",z),O(),dt(c``,r),e.replaceChildren()}}}var yv=1e4,wf="bdui.monitor.done-range",$f="bdui.monitor.running_sort",xf="bdui.monitor.candidate_sort",Af="beads-ui.monitor.candidate-filter",Sf="beads-ui.monitor.sections";function vv(){try{let e=window.localStorage.getItem(Af);if(!e)return{...bo};let t=JSON.parse(e);return!t||typeof t!="object"?{...bo}:{show_blocked:typeof t.show_blocked=="boolean"?t.show_blocked:bo.show_blocked,spec:nl.some(n=>n.value===t.spec)?t.spec:"all"}}catch{return{...bo}}}function yf(e){try{window.localStorage.setItem(Af,JSON.stringify({show_blocked:e.show_blocked,spec:e.spec}))}catch{}}function kv(){try{let e=window.localStorage.getItem(xf);return Qo.some(t=>t.value===e)?e:"repo_spec"}catch{return"repo_spec"}}function wv(e){try{window.localStorage.setItem(xf,e)}catch{}}function $v(){try{let e=window.localStorage.getItem(Sf);if(!e)return{};let t=JSON.parse(e);return t&&typeof t=="object"?t:{}}catch{return{}}}function xv(e){try{window.localStorage.setItem(Sf,JSON.stringify(e))}catch{}}function Av(){try{let e=window.localStorage.getItem(wf);return e===null?"today":zn(e)}catch{return"today"}}function Sv(e){try{window.localStorage.setItem(wf,e)}catch{}}function Ev(){try{return window.localStorage.getItem($f)==="repo"?"repo":"started"}catch{return"started"}}function Tv(e){try{window.localStorage.setItem($f,e)}catch{}}var Ef="tab:monitor:pipeline",Cv=1e3,vf=[{lane:"runnable",pane:"candidate",title:"\uD6C4\uBCF4",empty:"\uC2E4\uD589 \uC790\uACA9\uC744 \uAC16\uCD98 \uC774\uC288 \uC5C6\uC74C"},{lane:"queue",pane:"queue",title:"\uB300\uAE30",empty:"\uD45C\uC2DC\uD560 \uB808\uD3EC \uC5C6\uC74C"},{lane:"running",pane:"running",title:"\uC2E4\uD589 \uC911",empty:"\uC2E4\uD589 \uC911 \uC5C6\uC74C"},{lane:"pr_wait",pane:"pr_wait",title:"PR \uB300\uAE30",empty:"PR \uC5C6\uC74C"},{lane:"done",pane:"done",title:"\uC644\uB8CC",empty:"\uC644\uB8CC \uAE30\uB85D \uC5C6\uC74C"}],Rv=["queue","runnable","done"],kf="\u2460\u2461\u2462\u2463\u2464\u2465\u2466\u2467\u2468\u2469\u246A\u246B\u246C\u246D\u246E\u246F\u2470\u2471\u2472\u2473";function Ov(e){return e>=1&&e<=kf.length?kf[e-1]:`(${e})`}function Tf(e,t){let n=Ft("views:monitor"),r=t.gotoIssue,o=t.pipelineStore,i=t.transport,s=t.getWorkspacePath,l=t.openDoc,a=t.switchWorkspace,u=t.router,d=t.now||(()=>Date.now()),p=t.confirm||(y=>typeof globalThis.confirm!="function"||globalThis.confirm(y)),m=Av(),_=Ev(),w=vv(),R=kv(),I=$v(),U=Yi("beads-ui.monitor.lane-collapsed"),se=!1,W=null,j=null,O=null,q=null,z=ao(()=>L()),Y=null,N=null,F=null,H=null;function G(y){return H===null&&(H=P()),Od(y,H)}function ee(y,v){ye(),!(v<=0)&&(N={lane_id:y,corrected:v},F=setTimeout(()=>{F=null,N=null,L()},yv))}function ye(){F!==null&&(clearTimeout(F),F=null),N=null}function qe(){let y=Yr.find(v=>v.value===m);return y?y.label:""}let B=document.createElement("div");B.className="mon",e.appendChild(B);let X=document.createElement("div");X.className="worker-drawer-overlay",X.hidden=!0;let Se=document.createElement("div");Se.className="worker-drawer-overlay__backdrop";let Ee=document.createElement("div");Ee.className="worker-drawer-host mon2-drawer",X.append(Se,Ee),e.appendChild(X);let C=br(null,null),re=new Map,ke=new Map,ve=null,Me=null,he=null,Le=wo(Ee,{transport:i,sessionLogStore:t.sessionLogStore,onClose:()=>{j=null,X.hidden=!0,L()}}),Xe=Qi({transport:i,console_el:B,getLanes:()=>C,getWorkspaces:()=>o&&o.get?o.get():null,getCrossLanes:bt,reproject:y=>({lanes:E(y),raw_lanes:y}),onCorrection:ee,showToast:be,requestRender:()=>L(),adoptQueue:(y,v)=>{ke.set(y,v)},onDragBegin:()=>{O=null},candidate_drop:!0}),{applyDrop:it,dropModel:P,runPlanned:ce,sendQueueCas:ie}=Xe;async function de(y,v,f,g,M=!0){if(!i||!f)return null;let Q=await i(y,{...v,root_dir:f,expected_revision:g});if(Q&&Q.conflict&&M){Q.queue&&ke.set(f,Q.queue);let ne=Q.queue&&typeof Q.queue.revision=="number"?Q.queue.revision:g;Q=await i(y,{...v,root_dir:f,expected_revision:ne})}return Q&&Q.queue&&f&&ke.set(f,Q.queue),Q}function Te(y,v){let f=ke.get(y),g=o&&o.get?o.get():null,M=(Array.isArray(g)?g:[]).find(ne=>ne?.root_dir===y);return(f||M)?.merge_queue?.find(ne=>ne.bead_id===v)?.continuation_action}async function _e(y,v,f,g){let M=await de(y,v,f,g),Q=ke.get(f)?.revision??M?.queue?.revision??g;return _r(M,(ne,ue)=>de(y,{...v,continuation:ne,decision_token:ue},f,Q,!1),{refresh:ne=>de(y,v,f,ne?.queue?.revision??ke.get(f)?.revision??Q,!1)})}async function De(y,v,f,g){let M=await _r({continuation_mismatch:g},(ne,ue)=>de("worker-merge-queue-add",{bead_id:v,continuation:ne,decision_token:ue},y,f,!1)),Q=M?.queue?.merge_queue?.find(ne=>ne.bead_id===v)?.continuation_action;M?.applied!==!0&&Q?.continuation===null&&Q.mismatch&&await De(y,v,M.queue.revision,Q.mismatch)}async function Be(y,v,f){let g=await de("worker-discard",y,v,f);if(g&&g.discarded===!0){be(ci(g),"success",5e3);return}if(g&&g.reason){be(`\uD3D0\uAE30 \uC2E4\uD328: ${g.reason}`,"error");return}if(g&&g.accepted&&g.pending==="merged_revert"){be("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success");return}if(g&&g.accepted){be(`\uD3D0\uAE30 \uC9C4\uD589: ${g.phase||"\uBC31\uC5C5 \uC911"}`,"success");return}g&&!g.conflict&&be("\uD3D0\uAE30 \uAC70\uBD80: unknown","error")}async function Qe(y,v,f,g){let M=await de("worker-discard-abandon",y,v,f);if(M&&M.abandoned===!0){be(li(g),"success",5e3);return}if(M&&M.reason){be(`\uD3D0\uAE30 \uD3EC\uAE30 \uAC70\uBD80: ${M.reason}`,"error");return}M&&!M.conflict&&be("\uD3D0\uAE30 \uD3EC\uAE30 \uAC70\uBD80: unknown","error")}async function Fe(y,v,f){return!i||!f?null:await i(y,{...v,root_dir:f})}async function te(){let y=new Map;for(let v of C.pr_wait)y.has(v.root_dir)||y.set(v.root_dir,v.expected_revision);for(let[v,f]of y)await de("worker-merge-queue-add-all",{},v,f)}function V(y){let v=I[y];return!!(v&&v.runnable===!0)}function $e(y){let v={...I[y]||{}};v.runnable=!v.runnable,I={...I,[y]:v},xv(I),L()}function _t(y){U.toggle(y),L()}function at(y){U.toggleArea(y),L()}function Ke(y){let v=y.dependency_chips||null,f=y.overlap_chips||[],g=y.scope_state==="missing",M=y.armed_lane_chip;return!v&&f.length===0&&!g&&!M?null:{...v||{},...f.length>0?{overlaps:f}:{},...g?{scope_missing:!0}:{},...M?{armed_lane:M}:{}}}function $(y){return gi(y,v=>z.isOpen({bead_id:y.id,chip_key:v}))}function J(y){let v=Ke(y),f=$(y);return v||f?{...y,...v?{dependency_chips:v}:{},...f?{chip_popover:f}:{}}:y}function Re(y){let v=V(y.root_dir);return c`<header class="mon2-sec__hd">
      <button
        type="button"
        class="mon2-sec__toggle"
        data-root-dir=${y.root_dir}
        data-section="runnable"
        aria-expanded=${v?"false":"true"}
        aria-label=${`${y.name} \uC139\uC158 ${v?"\uD3BC\uCE58\uAE30":"\uC811\uAE30"}`}
      >
        ${v?"\u25B8":"\u25BE"}
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
    </header>`}function je(y,v){return c`<div
      class="mon2-item"
      data-bead-id=${y.id}
      data-drag-kind="candidate"
      data-root-dir=${y.root_dir}
    >
      ${v}
    </div>`}function Je(y){if(O!==y.id)return null;let v=C.queue_groups.find(Q=>Q.root_dir===y.root_dir),f=y.place_lanes||[],g=C.cross_lanes_revision!==null,M=[{id:"parallel",label:"\uBCD1\uB82C",count:y.place_index??0}];for(let Q of C.chain_lanes)M.push({id:`lane:${Q.lane_id}`,label:`\uC5F0\uACB0 ${Q.number} (${Q.draft?"draft":"\uD655\uC815"}) \uB05D\uC5D0`,count:Q.rows.length,group:"\uC5F0\uACB0 \uB808\uC778",disabled:!g});M.push({id:"new-lane",label:"+ \uC0C8 \uC5F0\uACB0 \uB808\uC778",group:"\uC5F0\uACB0 \uB808\uC778",disabled:!g,title:g?"\uC774 \uC774\uC288\uB9CC \uB4E0 draft \uB808\uC778\uC744 \uB9CC\uB4ED\uB2C8\uB2E4":"\uC5F0\uACB0 \uB808\uC778 \uC800\uC7A5\uC18C\uB97C \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"});for(let Q of f)M.push({id:`serial:${Q.id}`,label:`\uC9C1\uB82C ${Number(Q.id.slice(1))}`,count:Q.length,group:`${v?v.name:""} \uC9C1\uB82C`});return{bead_id:y.id,lanes:M}}function et(y){return je(y,c`${Qa(J(y),Je(y),{exec_chips_mode:"pinned_only",onOpenDoc:l?(v,f)=>l(f,y.root_dir):void 0})}`)}function Ue(){return C.runnable_flat?c`<div class="mon2-flat" data-drop="candidate">
        ${C.runnable.map(y=>et(y))}
      </div>`:c`${C.runnable_sections.map(y=>{let v=V(y.root_dir);return c`<section
        class="mon2-sec${v?" is-collapsed":""}"
        data-root-dir=${y.root_dir}
        data-section="runnable"
      >
        ${Re({root_dir:y.root_dir,name:y.name,count:y.items.length})}
        ${v?"":c`<div
              class="mon2-sec__body"
              data-lane="candidate"
              data-drop="candidate"
            >
              ${y.items.map(f=>et(f))}
            </div>`}
      </section>`})}`}function ct(y,v){return c`<div
      class="mon2-item"
      data-bead-id=${y.id}
      data-drag-kind="parallel"
      data-root-dir=${y.root_dir}
      data-row-index=${v}
      data-queue-index=${String(y.queue_index??0)}
    >
      ${Mn(J(y),{actions:ho(y,{nudgeable:!0})})}
    </div>`}function Gt(y,v,f,g){return c`<div
      class="mon2-crow${v.fixed?" mon2-crow--fixed":""}"
      draggable=${v.draggable?"true":"false"}
      data-bead-id=${v.id}
      data-drag-kind="chain"
      data-root-dir=${v.root_dir}
      data-lane-id=${y.lane_id}
      data-row-index=${f}
      data-queue-index=${typeof v.queue_index=="number"?String(v.queue_index):""}
    >
      <span class="mon2-crow__seq" aria-hidden="true"
        >${Ov(v.seq)}</span
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
      ${g.includes(v.id)?c`<span
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
    </div>`}function At(y){let v=C.cross_lanes_revision!==null,f=G(y.lane_id),g=f?.held===!0,M=f?.cycle===!0,Q=f?f.mismatched:[],ne=N&&N.lane_id===y.lane_id?N.corrected:0;return c`<div class="mon2-clane" data-lane-id=${y.lane_id}>
      <header class="mon2-clane__hd">
        <span class="mon2-clane__name">${y.label}</span>
        <span class="mon2-clane__count">${y.rows.length}</span>
        <span class="mon2-clane__badge mon2-clane__badge--${y.state}"
          >${y.badge}</span
        >
        ${ne>0?c`<span
              class="mon2-clane__corrected"
              title="기존 blocks 의존이 드롭 순서를 이깁니다 — 그 순서로 다시 놓았습니다"
              >의존에 맞춰 ${ne}건 자동 교정</span
            >`:""}
        ${M?c`<span
              class="mon2-clane__cycle"
              title="멤버들의 blocks 의존이 순환합니다 — 어느 순서도 의존을 만족시키지 못합니다"
              >⛔ 의존 사이클 — 자동 교정 불가</span
            >`:""}
        ${g?c`<span
              class="mon2-clane__hold"
              title="멤버 한 명의 의존 자료가 이 스냅샷에 아직 없습니다 — 다음 스냅샷이 채우면 교정합니다"
              >${Si}</span
            >`:""}
        ${y.draft?c`<button
              type="button"
              class="mon2-clane__confirm"
              data-lane-id=${y.lane_id}
              ?disabled=${!v||!y.can_confirm||g}
              title=${g?Si:y.can_confirm?"\uC778\uC811 \uC758\uC874\uC744 \uAC78\uACE0 \uBBF8\uC801\uC7AC \uBA64\uBC84\uB97C \uAC01\uC790 \uB808\uD3EC \uBCD1\uB82C \uD050 \uB05D\uC5D0 \uC62C\uB9BD\uB2C8\uB2E4":"\uBA64\uBC84\uAC00 2\uAC1C \uC774\uC0C1\uC774\uC5B4\uC57C \uD655\uC815\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4"}
            >
              확정
            </button>`:""}
        ${y.run_label!==null?c`<button
              type="button"
              class="mon2-clane__run"
              data-lane-id=${y.lane_id}
              ?disabled=${!v}
              title="이 레인 멤버만 발차합니다 — 레포 자동 진행은 켜지 않습니다"
            >
              ${y.run_label}
            </button>`:""}
        ${y.state==="confirmed"&&y.has_mismatch?c`<button
              type="button"
              class="mon2-clane__reapply"
              data-lane-id=${y.lane_id}
              ?disabled=${!v}
              title="빠진 인접 의존을 다시 걸고 미적재 멤버를 다시 올립니다"
            >
              재적용
            </button>`:""}
        ${y.can_stop?c`<button
              type="button"
              class="mon2-clane__stop"
              data-lane-id=${y.lane_id}
              ?disabled=${!v}
              title="남은 멤버의 발차만 멈춥니다 — 도는 세션과 머지 큐 항목은 끝까지 갑니다"
            >
              ⏸ 정지
            </button>`:""}
        <button
          type="button"
          class="mon2-clane__remove"
          data-lane-id=${y.lane_id}
          ?disabled=${!v}
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
            </div>`:y.rows.map((ue,ut)=>Gt(y,ue,ut,Q))}
      </div>
    </div>`}function kt(y,v,f){return c`<div
      class="mon2-item"
      data-bead-id=${v.id}
      data-drag-kind="repo-serial"
      data-root-dir=${v.root_dir}
      data-lane-id=${y.id}
      data-row-index=${f}
      data-queue-index=${String(v.queue_index??0)}
    >
      ${Mn(J(v),{actions:ho(v)})}
    </div>`}function wt(y){if(y.length===0)return"";let v=y.length-1;return`${y[0].id} \uC810\uC720${v>0?` +${v}`:""}`}function jt(y){return c`<div
      class="mon2-item mon2-item--ghost"
      data-bead-id=${y.id}
    >
      ${Mn({id:y.id,title:y.title,lane:"running",draggable:!1,ghost:!0,badges:[y.badge]})}
    </div>`}function Lt(y,v){let f=v.occupants,g=v.cross_wait_peers||[];return{id:v.id,pane_id:"",title:`${y.name} \xB7 \uC9C1\uB82C ${v.index+1}`,rows:[...f.map(M=>jt(M)),...v.items.map((M,Q)=>kt(v,M,Q))],count:v.items.length,empty:v.empty===!0,...f.length>0?{badge:c`<span
              class="mon2-lane__occupant"
              title=${f.map(M=>`${M.id} \u2014 ${M.badge}`).join(`
`)}
              >${wt(f)}</span
            >`,held:!0}:{},cycle:v.cycle,header_control:c`<button
        type="button"
        class="mon2-sec__worker"
        data-root-dir=${y.root_dir}
        title="이 레포의 Worker 탭으로 이동"
      >
        Worker ↗
      </button>`,...g.length>0?{after:c`${g.map(M=>c`<div class="mon2-lane__cross-wait">
                  ⚠ 상호 정지 — ${M.workspace_name}·${M.lane}과 교차 대기
                </div>`)}`}:{}}}function ae(){let y=C.cross_lanes_revision!==null,v=C.chain_lanes.some(f=>f.draft&&f.rows.length===0);return bi({parallel:{rows:C.parallel_rows.map((f,g)=>ct(f,g)),count:C.parallel_rows.length,collapsed:U.isAreaCollapsed("parallel"),drop:{drop:"parallel"}},serial:{lanes:C.queue_groups.flatMap(f=>f.sublanes.serial.map(g=>({...Lt(f,g),drop:{drop:"repo-serial",root_dir:f.root_dir,lane_id:g.id,lane_length:String(g.raw_length)}}))),collapsed:U.isAreaCollapsed("serial"),extra_panes:C.chain_lanes.map(f=>At(f)),header_control:c`<button
          type="button"
          class="mon2-newlane"
          ?disabled=${v||!y}
          title=${y?v?"\uBE48 \uC5F0\uACB0 \uB808\uC778\uC774 \uC774\uBBF8 \uC788\uC2B5\uB2C8\uB2E4":"\uBE48 \uC5F0\uACB0 \uB808\uC778\uC744 \uD558\uB098 \uB9CC\uB4ED\uB2C8\uB2E4":"\uC5F0\uACB0 \uB808\uC778 \uC800\uC7A5\uC18C\uB97C \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"}
        >
          + 연결 레인
        </button>`,...C.cross_lanes_unreadable?{notice:c`<div class="mon2-clane__unreadable">
                연결 레인 저장소를 읽을 수 없음
              </div>`}:{}}})}function me(y){return c`<div class="worker-rungrid">
      ${C.running.length===0?c`<div class="worker-rungrid__empty">실행 세션 없음</div>`:C.running.map(v=>Ul({bead_id:v.id,attempt_id:v.attempt_id||"",title:v.title,runner:v.runner??null,model:v.model??null,effort:v.effort??null,speed:v.speed??null,started_at:v.started_at??null,kind:v.kind,...v.kind==="session"?{updated_at:v.updated_at,session_refs:v.session_refs||[]}:{},workflow:v.workflow||null,resumed_from:v.resumed_from??null,continuation_mode:v.continuation_mode??null,paused:v.run_state==="paused",failed:v.run_state==="failed",parked:v.run_state==="parked",retry_wait:v.run_state==="retry_wait",waiting:v.run_state==="waiting",wait:v.wait||null,retry:v.retry||null,status:v.status,status_label:v.run_state==="failed"?"\uC2E4\uD328":v.run_state==="parked"?"\uC138\uC158 \uB300\uAE30":v.run_state==="retry_wait"?"\uC7AC\uC2DC\uB3C4 \uB300\uAE30":v.run_state==="waiting"?"\uC120\uD589 \uB300\uAE30":void 0,can_pause:v.can_pause!==!1,exec_chips:v.exec_chips||null,usage:v.usage||null,chip_popover:$(v),discard:v.discard,failure:v.failure?{...v.failure,open:q===v.attempt_id}:null},y,j,{monitor:{repo:v.workspace_name,root_dir:v.root_dir,serial_lane_id:v.serial_lane_id,cross_lane_chip:v.cross_lane_chip||null,last_activity:v.last_activity||null,legs:v.legs||[],dependency_chips:Ke(v)}}))}
    </div>`}function Ge(y){let v={runnable:C.runnable,queue:C.queue,running:C.running,pr_wait:C.pr_wait,done:C.done},f=g=>{let M=v[g.lane],Q=g.lane==="runnable"?C.runnable_flat?M.length>0?Ue():void 0:C.runnable_sections.length>0?Ue():void 0:g.lane==="queue"?C.queue_groups.length>0||C.chain_lanes.length>0||C.parallel_rows.length>0||C.cross_lanes_unreadable?ae():void 0:g.lane==="running"?me(y):M.length>0?c`${M.map(ne=>Mn(J(ne)))}`:void 0;return Yn({id:`monitor-${g.lane}`,lane:g.pane,title:g.title,items:M,count:M.length,src:g.lane==="runnable",empty:g.empty,body:Q,live:g.lane==="running"&&M.length>0,collapsible:!0,collapsed:U.isCollapsed(g.pane),controls:g.lane==="runnable"?lt():void 0,header_control:Oe(g.lane,M.length)})};if(se){let g=Rv.map(M=>vf.find(Q=>Q.lane===M)).filter(M=>M!==void 0);return c`<div class="mon2-deck"></div>
        <div class="worker-lanes-host">
          <div class="worker-lanes worker-lanes--mobile mon2-lanes">
            ${yi({live:C.running.length>0,running_body:C.running.length>0?me(y):"",pr_wait_rows:C.pr_wait.map(M=>Mn(J(M))),count:C.running.length+C.pr_wait.length})}
            ${g.map(M=>f(M))}
          </div>
        </div>`}return c`<div class="mon2-deck"></div>
      <div class="worker-lanes-host">
        <div class="worker-lanes mon2-lanes">
          ${vf.map(g=>f(g))}
        </div>
      </div>`}function lt(){return c`<div class="worker-filter">
      <label class="worker-filter__tgl" title="blocked 이슈 표시">
        <input
          type="checkbox"
          class="mon-filter__blocked"
          .checked=${w.show_blocked}
        />
        🔒
        blocked${C.runnable_hidden.blocked>0?` ${C.runnable_hidden.blocked}`:""}
      </label>
      <div class="worker-filter__spec" role="group" aria-label="spec 필터">
        ${nl.map(y=>c`<button
              type="button"
              class="mon-filter__spec worker-filter__chip${w.spec===y.value?" is-active":""}"
              data-spec=${y.value}
              aria-pressed=${w.spec===y.value?"true":"false"}
            >
              ${y.label}
            </button>`)}
        ${C.runnable_hidden.spec>0?c`<span class="worker-filter__hidden"
              >숨김 ${C.runnable_hidden.spec}</span
            >`:""}
      </div>
    </div>`}function Oe(y,v){return y==="runnable"?c`<select
        class="mon-candidate-sort worker-sort"
        aria-label="후보 정렬"
        title="후보 정렬"
        .value=${R}
      >
        ${Qo.map(f=>c`<option
              value=${f.value}
              ?selected=${R===f.value}
            >
              ${f.label}
            </option>`)}
      </select>`:y==="running"?c`<select
        class="mon-running-sort worker-sort"
        aria-label="실행중 정렬"
        title="실행중 정렬"
        .value=${_}
      >
        <option value="started" ?selected=${_==="started"}>
          시작순
        </option>
        <option value="repo" ?selected=${_==="repo"}>
          레포순
        </option>
      </select>`:y==="pr_wait"&&v>0?c`<button
        type="button"
        class="mon-lane-op mon-merge-all"
        title="자격이 생기는 PR을 각 레포의 머지 큐에 한 번에 넣습니다"
      >
        일괄 머지
      </button>`:y==="done"?c`<select
        class="mon-done-range worker-sort"
        aria-label="완료 기간"
        title="완료 기간"
        .value=${m}
      >
        ${Yr.map(f=>c`<option value=${f.value} ?selected=${m===f.value}>
              ${f.label}
            </option>`)}
      </select>`:""}function E(y){let v=o&&o.get?o.get():null,f=o&&o.getWorkspacesState?o.getWorkspacesState():[],g=y===void 0?o&&o.crossLanes?o.crossLanes():void 0:y,M={done_since:Or(m,d()),running_sort:_,candidate_filter:w,candidate_sort:R};return g!==void 0&&(M.cross_lanes=g),br(v,f,M)}function L(){let y=d();C=E(),H=null,re=new Map;for(let v of[...C.runnable,...C.queue,...C.running,...C.pr_wait,...C.done])!v.non_occupying&&!re.has(v.id)&&re.set(v.id,v);dt(Ge(y),B),pe()?.render(),Z(),fe()}function Z(){let y=new Map;for(let v of C.queue_groups)y.set(v.root_dir,v.auto_advance);for(let v of Array.from(B.querySelectorAll(".worker-wait__area--parallel .worker-mini__repo"))){let f=v.closest(".mon2-item")?.getAttribute("data-root-dir")||"",g=y.get(f);typeof g=="boolean"&&v.setAttribute("title",`${v.textContent||""} \xB7 ${g?"\uC790\uB3D9\uD654 \uCF1C\uC9D0":"\uC790\uB3D9\uD654 \uAEBC\uC9D0"}`)}}function pe(){if(he)return he;let y=B.querySelector(".mon2-deck");return y?(he=bf(y,{workspacesState:()=>o&&o.getWorkspacesState?o.getWorkspacesState():[],doneItems:()=>C.done,rangeLabel:qe,transport:i,implPresetStore:t.execPresetStore,gotoWorkerTab:ht,onFocusChange:v=>{Y=v,fe()}}),he):null}function fe(){B.classList.toggle("has-focus",Y!==null);for(let y of Array.from(B.querySelectorAll(".mon2-sec[data-root-dir]")))y.classList.toggle("is-focus",Y!==null&&y.getAttribute("data-root-dir")===Y);for(let y of Array.from(B.querySelectorAll(".mon2-item[data-bead-id], .rtile[data-bead-id], .worker-mini[data-bead-id], .worker-card[data-bead-id]"))){let v=re.get(y.getAttribute("data-bead-id")||"");y.classList.toggle("is-focus",Y!==null&&!!v&&v.root_dir===Y)}for(let y of Array.from(B.querySelectorAll(".mon2-crow[data-root-dir]")))y.classList.toggle("is-focus",Y!==null&&y.getAttribute("data-root-dir")===Y)}function Pe(y,v){let f=s?s():void 0;if(!v||!f||v===f||!a){r(y);return}a(v).then(()=>{r(y)}).catch(g=>{n("workspace switch for %s failed: %o",v,g)})}function ht(y){if(!y)return;let v=s?s():void 0,f=()=>{try{u?.gotoView("worker")}catch(g){n("gotoView(worker) failed: %o",g)}};if(!a||v&&v===y){f();return}a(y).then(f).catch(g=>{n("workspace switch for %s failed: %o",y,g),be("\uB808\uD3EC \uC804\uD658\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error")})}function $t(y){_n(y).then(v=>{be(v?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",v?"success":"error",1400)})}function gt(y){let v=re.get(y)||null;return{item:v,root_dir:v?v.root_dir:"",revision:v?v.expected_revision:0}}async function Bt(y,v,f){if(y!=="dep-add")return;let g=C.chain_lanes.find(M=>M.rows.some(Q=>Q.id===v));!g||!g.rows.some(M=>M.id===f)||await ce(M=>qd(g.lane_id,M),"",[{type:y,a:v,b:f}])}function bt(){return(o&&o.crossLanes?o.crossLanes():null)??null}async function Ct(y,v){if(y==="run"){await en(v);return}if(y==="stop"){await Yt(v);return}if(y==="create"){await ce(f=>al(null,f),"");return}if(y==="remove"){let f=jd(v,P());if(f!==null&&!p(f))return;await ce(g=>Nd(v,g),"");return}await ce(f=>y==="confirm"?Dd(v,f):Md(v,f),"")}function Rt(y){let v=new Map;for(let f of y.rows){let g=C.owner_of[f.id]||f.root_dir;typeof g!="string"||g.length===0||v.set(g,[...v.get(g)||[],f.id])}return v}async function en(y){let v=C.chain_lanes.find(Q=>Q.lane_id===y);if(!v||C.cross_lanes_revision===null){L();return}ye();let f=new Map,g=new Map,M=Rt(v);for(let Q of v.rows){if(!Q.unplaced)continue;let ne=C.owner_of[Q.id]||Q.root_dir;if(typeof ne!="string"||ne.length===0){be(`${Q.id}\uC758 \uB808\uD3EC\uB97C \uC54C \uC218 \uC5C6\uC5B4 \uC801\uC7AC\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4`,"error"),L();return}let ue=g.get(ne)??0;if(await ie("worker-queue-place",{bead_id:Q.id,lane:"parallel",index:(C.parallel_raw_length[ne]??0)+ue},ne,f,{bead_id:Q.id})===null){L();return}g.set(ne,ue+1)}for(let[Q,ne]of M)if(await ie("worker-queue-arm",{bead_ids:ne,lane_id:y},Q,f,{bead_id:ne[0]})===null){be("\uC77C\uBD80 \uB808\uD3EC\uC5D0\uC11C \uC9C4\uD589\uC744 \uCF1C\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 \u2014 [\u25B6 \uC774\uC5B4\uC11C \uC9C4\uD589]\uC73C\uB85C \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC138\uC694","error"),L();return}L()}async function Yt(y){let v=C.chain_lanes.find(g=>g.lane_id===y);if(!v||C.cross_lanes_revision===null){L();return}ye();let f=new Map;for(let[g,M]of Rt(v))if(await ie("worker-queue-disarm",{lane_id:y},g,f,{bead_id:M[0]})===null)break;L()}async function Dt(y,v){let{root_dir:f,revision:g}=gt(y);if(f.length===0){L();return}await ie("worker-queue-disarm",{bead_ids:[y],lane_id:v},f,new Map([[f,g]]),{bead_id:y}),L()}async function xt(y,v){let f=re.get(y);if(!f){L();return}let g={kind:"candidate",bead_id:y,root_dir:f.root_dir};if(v==="new-lane"){await ce(M=>al({bead_id:y,root_dir:f.root_dir},M),y);return}if(v.startsWith("lane:")){let M=v.slice(5);if(!C.chain_lanes.find(ne=>ne.lane_id===M)){L();return}await ce(ne=>Ti(g,{kind:"chain",lane_id:M,marker_index:(ne.cross_lanes.get(M)?.entries??[]).length},ne),y);return}if(v.startsWith("serial:")){let M=v.slice(7),Q=(f.place_lanes||[]).find(ne=>ne.id===M);await it(g,{kind:"repo-serial",root_dir:f.root_dir,lane_id:M,index:Q?Q.index:0});return}await it(g,{kind:"parallel",marker_index:C.parallel_rows.length})}async function Ht(y,v){let f=C.parallel_rows,g=f.findIndex(mt=>mt.id===y);if(g<0)return;let M=f[g].root_dir,Q=[];f.forEach((mt,pt)=>{mt.root_dir===M&&Q.push(pt)});let ne=Q.indexOf(g),ue=Q[ne+v];if(typeof ue!="number")return;let ut=v===-1?ue:Q[ne+2]??Math.min(f.length,ue+1);await it({kind:"parallel",bead_id:y,root_dir:M,queue_index:f[g].queue_index??0},{kind:"parallel",marker_index:ut})}async function nn(y){for(let v of C.chain_lanes){let f=v.rows.find(g=>g.id===y);if(f){await it({kind:"chain",bead_id:y,root_dir:f.root_dir,lane_id:v.lane_id,...typeof f.queue_index=="number"?{queue_index:f.queue_index}:{}},{kind:"parallel",marker_index:C.parallel_rows.length});return}}}function Ut(y){return{runner:y.runner||void 0,model:y.model||void 0,effort:y.effort||void 0,status:y.run_state==="running"?"running":y.run_state,worktree:y.root_dir}}function an(y,v){let{item:f,root_dir:g,revision:M}=gt(v),Q=f?.attempt_id||"",ne=y.classList;if(ne.contains("worker-mini__rowops-up")||ne.contains("worker-mini__rowops-down")){Ht(v,ne.contains("worker-mini__rowops-up")?-1:1);return}if(ne.contains("worker-mini__rowops-remove")){de("worker-queue-remove",{bead_id:v},g,M);return}if(ne.contains("mon2-crow__detach")){nn(v);return}if(ne.contains("worker-dep__open")){Pe(y.getAttribute("data-dep-id")||"",y.getAttribute("data-root-dir")||"");return}if(ne.contains("mon2-arm__release")){Dt(v,y.getAttribute("data-lane-id")||"");return}if(ne.contains("mon-lane__chip")){let ue=y.getAttribute("data-lane-id")||"";B.querySelector(`.mon2-clane[data-lane-id="${ue}"]`)?.scrollIntoView({block:"nearest"});return}if(ne.contains("judgement-chip")){let ue=y.getAttribute("data-chip-key")||"";ue&&z.toggle({bead_id:v,chip_key:ue});return}if(ne.contains("rtile__failure-badge")){q=q===Q?null:Q,L();return}if(ne.contains("rtile__attempt-copy")){let ue=y.getAttribute("data-attempt-id")||"";ue&&_n(ue).then(ut=>{be(ut?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",ut?"success":"error",1400)});return}if(ne.contains("worker-card__place")){O=O===v?null:v,L();return}if(ne.contains("worker-card__place-cancel")){O=null,L();return}if(ne.contains("worker-card__place-lane")){let ue=y.getAttribute("data-lane")||"parallel";O=null,xt(v,ue);return}if(ne.contains("rtile__session")){if(f&&f.kind==="session"){let ue=(f.session_refs||[]).find(ut=>ut&&ut.current===!0);ue&&(X.hidden=!1,Le.open(oo(ue,v,"in_progress",g)),L());return}j=Q,Q&&f&&(X.hidden=!1,Le.open({attempt_id:Q,root_dir:g,meta:Ut(f)})),L();return}if(ne.contains("rtile__pause")){Fe("worker-attempt-pause",{attempt_id:Q},g);return}if(ne.contains("rtile__resume")){ro({context:{bead_id:v,kind:y.dataset.resumeKind==="settlement"?"settlement":"session",tuple:f?Sn(f):""},transport:ue=>de("worker-attempt-resume",{attempt_id:Q,...ue},g,ke.get(g)?.revision??gt(v).revision,!1)});return}if(ne.contains("rtile__parked-retry")){Fe("worker-parked-retry",{bead_id:v,attempt_id:Q},g).then(ue=>{ue&&ue.ok===!1&&be(`\uC7AC\uC2DC\uB3C4 \uAC70\uBD80: ${ue.reason==="not_latest"?"\uC774 bead\uC5D0 \uB354 \uC0C8\uB85C\uC6B4 \uC2DC\uB3C4\uAC00 \uC788\uC2B5\uB2C8\uB2E4":ue.reason||""}`,"error")});return}if(ne.contains("rtile__discard-abandon")){let ue={kind:y.dataset.operationKind||"",last_error:y.dataset.lastError||""};if(!p(Ko(v,ue)))return;Qe({bead_id:v,operation_id:y.dataset.operationId||""},g,M,ue);return}if(ne.contains("rtile__discard")){let ue=y.dataset.confirmation==="merged"?"merged":"unmerged";if(!p(Ho(v,ue)))return;Be({bead_id:v,...Q?{attempt_id:Q}:{},...y.dataset.operationId?{operation_id:y.dataset.operationId}:{}},g,M);return}if(ne.contains("worker-mini__merge")){let ue=Te(g,v);ue?.mismatch&&ue.continuation===null?De(g,v,M,ue.mismatch):de("worker-merge-queue-add",{bead_id:v},g,M);return}if(ne.contains("worker-mini__merge-cancel")){de("worker-merge-queue-remove",{bead_id:v},g,M);return}if(ne.contains("worker-mini__discard-abandon")){let ue={kind:y.dataset.operationKind||"",last_error:y.dataset.lastError||""};if(!p(Ko(v,ue)))return;Qe({bead_id:v,operation_id:y.dataset.operationId||""},g,M,ue);return}if(ne.contains("worker-mini__discard")){let ue=y.dataset.discardMode==="merged"?"merged":"unmerged";if(!p(Ho(v,ue)))return;Be({bead_id:v,...y.dataset.attemptId?{attempt_id:y.dataset.attemptId}:{},...y.dataset.operationId?{operation_id:y.dataset.operationId}:{}},g,M);return}if(ne.contains("worker-mini__revise-fix")){_e("worker-revise-fix",{bead_id:v},g,M);return}ne.contains("worker-mini__revise-approve")&&de("worker-revise-approve",{bead_id:v},g,M)}function Zt(y){let v=Xe.consumeClickSuppression(),f=y.target;if(!f||typeof f.closest!="function"||f.closest("dialog")||f.closest(".worker-drawer-overlay")||f.closest("a"))return;let g=f.closest(".worker-card__id, .worker-mini__id, .rtile__id");if(g){y.preventDefault();let Ae=f.closest(".mon2-item, .rtile, .mon2-crow, .worker-mini")?.getAttribute("data-bead-id")||g.textContent?.trim()||"";Ae&&$t(Ae);return}let M=f.closest(".worker-mini__repo, .worker-card__repo, .mon2-sec__worker");if(M){y.preventDefault();let x=M.getAttribute("data-root-dir")||re.get(f.closest(".mon2-item, .rtile, .worker-mini")?.getAttribute("data-bead-id")||"")?.root_dir||M.getAttribute("title")||"";ht(x);return}let Q=f.closest(".mon2-sec__toggle");if(Q){y.preventDefault(),$e(Q.getAttribute("data-root-dir")||"");return}let ne=f.closest(".worker-pane__toggle[data-lane]");if(ne){y.preventDefault();let x=ne.getAttribute("data-lane")||"";(x==="candidate"||x==="queue"||x==="running"||x==="pr_wait"||x==="done")&&_t(x);return}let ue=f.closest(".worker-wait__area-toggle[data-area]");if(ue){y.preventDefault(),at(ue.getAttribute("data-area")||"parallel");return}if(f.closest(".mon2-newlane")){y.preventDefault(),Ct("create","");return}let ut=f.closest(".mon2-clane__confirm, .mon2-clane__reapply, .mon2-clane__remove, .mon2-clane__run, .mon2-clane__stop");if(ut){y.preventDefault();let x=ut.getAttribute("data-lane-id")||"",Ae=ut.classList;Ct(Ae.contains("mon2-clane__confirm")?"confirm":Ae.contains("mon2-clane__reapply")?"reapply":Ae.contains("mon2-clane__run")?"run":Ae.contains("mon2-clane__stop")?"stop":"remove",x);return}if(f.closest(".mon-merge-all")){y.preventDefault(),te();return}let mt=f.closest(".mon-filter__spec");if(mt){y.preventDefault(),w={...w,spec:mt.getAttribute("data-spec")||"all"},yf(w),L();return}let pt=f.closest(".mon2-item, .rtile, .mon2-crow, .worker-mini, .worker-card");if(!pt)return;let Mt=pt.getAttribute("data-bead-id")||"",S=f.closest("button");if(S){y.preventDefault(),an(S,Mt);return}f.closest(".rtile__failure-pop, .chip-popover")||Mt&&!v&&(y.preventDefault(),Pe(Mt,pt.getAttribute("data-root-dir")||gt(Mt).root_dir))}function xe(y){let v=y.target;if(!v||typeof v.closest!="function")return;let f=v.closest(".mon-filter__blocked");if(f){w={...w,show_blocked:f.checked},yf(w),L();return}let g=v.closest(".mon-candidate-sort");if(g){R=Qo.some(ne=>ne.value===g.value)?g.value:"repo_spec",wv(R),L();return}let M=v.closest(".mon-running-sort");if(M){_=M.value==="repo"?"repo":"started",Tv(_),L();return}let Q=v.closest(".mon-done-range");Q&&(m=zn(Q.value),Sv(m),L())}function A(y){let v=y.target,f=v&&typeof v.closest=="function"?g=>v.closest(g):()=>null;q&&!f(".rtile__failure-pop, .rtile__failure-badge")&&(q=null,L())}function ge(y){y.key!=="Escape"||q===null||(q=null,L())}e.addEventListener("click",Zt),e.addEventListener("change",xe),document.addEventListener("click",A),document.addEventListener("keydown",ge),z.attach(),Xe.attach(e);{let y=!0;W=Gi(v=>{if(se=v,y){y=!1;return}L()})}o&&typeof o.subscribe=="function"&&(ve=o.subscribe(()=>{try{ke.clear(),L()}catch{}}));function Ne(){Me!==null&&(clearInterval(Me),Me=null)}return{recorrectSharedLane:Bt,load(){n("load"),L(),Me===null&&(Me=setInterval(()=>{try{L()}catch{}},Cv))},pause(){Ne()},clear(){Ne(),Xe.detach(),ve&&(ve(),ve=null),W&&(W(),W=null),Le.destroy(),X.hidden=!0,he?.destroy(),he=null,e.removeEventListener("click",Zt),e.removeEventListener("change",xe),document.removeEventListener("click",A),document.removeEventListener("keydown",ge),z.detach(),e.replaceChildren()}}}function Cf(e,t,n){let r=Ft("views:nav"),{global_element:o,repo_element:i}=e,s=null;function l(m){return _=>{_.preventDefault();let w=m==="monitor"&&a()==="monitor"?"worker":m;r("click tab %s",w),n.gotoView(w)}}function a(){let m=t.getState();return m.view==="worker"||m.view==="monitor"?m.view:"board"}function u(){let m=a();return c`
      <a
        href="#/monitor"
        class="ctl-tab ctl-tab--monitor ${m==="monitor"?"is-active":""}"
        @click=${l("monitor")}
      >
        <span class="ctl-tab__dots" aria-hidden="true"
          ><i></i><i></i><i></i><i></i
        ></span>
        Monitor
      </a>
    `}function d(){let m=a();return c`
      <div class="ctl-tabs">
        <a
          href="#/board"
          class="ctl-tab ${m==="board"?"is-active":""}"
          @click=${l("board")}
          >Board</a
        >
        <a
          href="#/worker"
          class="ctl-tab ${m==="worker"?"is-active":""}"
          @click=${l("worker")}
          >Worker</a
        >
      </div>
    `}function p(){o&&dt(u(),o),i&&dt(d(),i)}return p(),s=t.subscribe(()=>p()),{destroy(){s&&(s(),s=null),o&&dt(c``,o),i&&dt(c``,i)}}}var Rf=["bug","feature","task","epic","chore"];function Of(e){switch((e||"").toString().toLowerCase()){case"bug":return"Bug";case"feature":return"Feature";case"task":return"Task";case"epic":return"Epic";case"chore":return"Chore";default:return""}}var If=["Critical","High","Medium","Low","Backlog"];function Lf(e,t){let n=document.createElement("dialog");n.id="new-issue-dialog",n.setAttribute("role","dialog"),n.setAttribute("aria-modal","true"),n.innerHTML=`
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
  `,e.appendChild(n);let r=n.querySelector("#new-issue-form"),o=n.querySelector("#new-title"),i=n.querySelector("#new-type"),s=n.querySelector("#new-priority"),l=n.querySelector("#new-labels"),a=n.querySelector("#new-description"),u=n.querySelector("#new-issue-error"),d=n.querySelector("#btn-cancel"),p=n.querySelector("#btn-create"),m=n.querySelector(".new-issue__close");function _(){i.replaceChildren();let O=document.createElement("option");O.value="",O.textContent="\u2014 Select \u2014",i.appendChild(O);for(let q of Rf){let z=document.createElement("option");z.value=q,z.textContent=Of(q),i.appendChild(z)}s.replaceChildren();for(let q=0;q<=4;q+=1){let z=document.createElement("option");z.value=String(q);let Y=If[q]||"Medium";z.textContent=`${q} \u2013 ${Y}`,s.appendChild(z)}}_();function w(){try{typeof n.close=="function"?n.close():n.removeAttribute("open")}catch{n.removeAttribute("open")}}function R(O){o.disabled=O,i.disabled=O,s.disabled=O,l.disabled=O,a.disabled=O,d.disabled=O,p.disabled=O,p.textContent=O?"Creating\u2026":"Create"}function I(){u.textContent=""}function U(O){u.textContent=O}function se(){try{let O=window.localStorage.getItem("beads-ui.new.type");O?i.value=O:i.value="";let q=window.localStorage.getItem("beads-ui.new.priority");q&&/^\d$/.test(q)?s.value=q:s.value="2"}catch{i.value="",s.value="2"}}function W(){let O=i.value||"",q=s.value||"";O.length>0&&window.localStorage.setItem("beads-ui.new.type",O),q.length>0&&window.localStorage.setItem("beads-ui.new.priority",q)}async function j(){I();let O=String(o.value||"").trim();if(O.length===0){U("Title is required"),o.focus();return}let q=Number(s.value||"2");if(!(q>=0&&q<=4)){U("Priority must be 0..4"),s.focus();return}let z=String(i.value||""),Y=String(a.value||""),N={title:O};z.length>0&&(N.type=z),String(q).length>0&&(N.priority=q),Y.length>0&&(N.description=Y),R(!0);try{await t("create-issue",N)}catch{R(!1),U("Failed to create issue");return}W(),R(!1),w()}return n.addEventListener("cancel",O=>{O.preventDefault(),w()}),m.addEventListener("click",()=>w()),d.addEventListener("click",()=>w()),n.addEventListener("keydown",O=>{O.key==="Enter"&&(O.ctrlKey||O.metaKey)&&(O.preventDefault(),j())}),r.addEventListener("submit",O=>{O.preventDefault(),j()}),{open(){r.reset(),I(),se();try{"showModal"in n&&typeof n.showModal=="function"?n.showModal():n.setAttribute("open","")}catch{n.setAttribute("open","")}setTimeout(()=>{try{o.focus()}catch{}},0)},close(){w()}}}var Iv=[["route","route \uCE69"],["fast_track","\u26A1 fast_track \uCE69"],["pr","PR \uCE69"],["from","\u21A9 from \uCE69"],["blocked","blocked\xB7\uC0AC\uC6A9\uC790 \uB9AC\uBDF0 \uD544\uC694 \uCE69"],["stepper","stepper"]];function Lv(e,t){return wa(e,t)?"shown":t.hidden_labels.includes(e)?"hidden_exact":"hidden_prefix"}function Pf(e,t,n){return c`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">라벨 표시</div>
      <p class="settings-dialog__hint-block">
        라벨을 눌러 표시/숨김을 전환합니다. prefix 규칙으로 숨겨진 라벨을 누르면
        그 라벨만 예외로 다시 표시됩니다.
      </p>
      ${t.length===0?c`<div class="settings-dialog__empty">라벨 없음</div>`:c`<div class="settings-dialog__pills">
            ${t.map(r=>{let o=Lv(r,e);return c`<button
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
  `}function Df(e,t,n){return c`
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
  `}function Mf(e,t){return c`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">카드 표시 요소</div>
      <div class="settings-dialog__toggles">
        ${Iv.map(([n,r])=>c`<label class="settings-dialog__toggle">
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
  `}var Pv=[{id:"execution",label:"\uC2E4\uD589",glyph:"\u25C6"},{id:"display",label:"\uD45C\uC2DC",glyph:"\u25EB"}];function qf(e,t){let{transport:n,policyStore:r,labelOptions:o}=t,i=t.notify||(ee=>be(ee,"error",4e3)),s=document.createElement("dialog");s.id="settings-dialog",s.className="settings-dialog",s.setAttribute("role","dialog"),s.setAttribute("aria-modal","true"),s.setAttribute("aria-label","\uC124\uC815"),e.appendChild(s);let l="execution",a=!1,u="",d=null;function p(){if(d)return d;let ee=s.querySelector('[data-pane="execution"]');return ee?(d=ea(ee,{root_dir:null,queue:()=>t.queueStore?.get()??null,transport:n,implPresetStore:t.implPresetStore,notify:i,onQueueAdopt:ye=>t.queueStore?.set?.(ye)}),d):null}function m(){return c`
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
    `}function _(){let ee=r.get();return c`
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
        ${ee?c`
              ${Pf(ee,o(),U)}
              ${Df(ee,u,{onDraft:ye=>{u=ye},onAdd:se,onRemove:W})}
              ${Mf(ee,j)}
            `:c`<div class="settings-dialog__empty">
              표시 정책을 불러오는 중…
            </div>`}
      </section>
    `}async function w(ee){let ye=r.get();if(ye)try{let qe=await n("display-policy-set",{expected_revision:ye.revision,policy:ee(ye)});R(qe),qe&&qe.conflict&&qe.policy&&(qe=await n("display-policy-set",{expected_revision:qe.policy.revision,policy:ee(qe.policy)}),R(qe)),qe&&qe.conflict&&i("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC")}catch{i("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328")}}function R(ee){ee&&ee.policy&&typeof ee.policy=="object"&&r.set(ee.policy)}function I(ee){w(ee)}function U(ee){let ye=r.get();if(!ye)return;let qe=!Dv(ee,ye);I(B=>Mv(ee,B,qe))}function se(){let ee=u.trim();ee.length!==0&&(u="",I(ye=>ye.hidden_prefixes.includes(ee)?{hidden_prefixes:ye.hidden_prefixes}:{hidden_prefixes:[...ye.hidden_prefixes,ee]}),O())}function W(ee){I(ye=>({hidden_prefixes:ye.hidden_prefixes.filter(qe=>qe!==ee)}))}function j(ee){let ye=r.get();if(!ye)return;let qe=ye.chips[ee]===!1;I(()=>({chips:{[ee]:qe}}))}function O(){dt(c`
        <div class="settings-dialog__container">
          <nav
            class="settings-dialog__rail"
            role="tablist"
            aria-orientation="vertical"
          >
            <div class="settings-dialog__rail-title">설정</div>
            ${Pv.map(ee=>c`<button
                  type="button"
                  class="settings-dialog__tab"
                  role="tab"
                  data-tab=${ee.id}
                  aria-selected=${String(l===ee.id)}
                  aria-controls=${`settings-pane-${ee.id}`}
                  @click=${()=>q(ee.id)}
                >
                  <span class="settings-dialog__glyph">${ee.glyph}</span>
                  ${ee.label}
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
            ${m()} ${_()}
          </div>
        </div>
      `,s),p()}function q(ee){l=ee,O()}let z=()=>{a=!1,t.onOpenChange?.(!1)};s.addEventListener("close",z),s.addEventListener("cancel",z);let Y=ee=>{ee.target===s&&G()};s.addEventListener("click",Y);let N=null;r.subscribe&&(N=r.subscribe(()=>{a&&O()}));let F=null;t.implPresetStore?.subscribe&&(F=t.implPresetStore.subscribe(()=>{a&&d?.render()}));function H(ee="execution"){a||(a=!0,t.onOpenChange?.(!0),l=ee,u="",O(),typeof s.showModal=="function"?s.showModal():s.setAttribute("open",""),p()?.load())}function G(){a&&(a=!1,t.onOpenChange?.(!1),typeof s.close=="function"?s.close():s.removeAttribute("open"))}return{open:H,close:G,sessionDraft:()=>d?.sessionDraft()??{},destroy(){a=!1,s.removeEventListener("close",z),s.removeEventListener("cancel",z),s.removeEventListener("click",Y),N&&(N(),N=null),F&&(F(),F=null),d?.destroy(),d=null,s.remove()}}}function Dv(e,t){return t.visible_labels.includes(e)?!0:t.hidden_labels.includes(e)?!1:!t.hidden_prefixes.some(n=>n.length>0&&e.startsWith(n))}function Mv(e,t,n){if(!n)return{hidden_labels:t.hidden_labels.includes(e)?t.hidden_labels:[...t.hidden_labels,e],visible_labels:t.visible_labels.filter(i=>i!==e)};let r=t.hidden_labels.filter(i=>i!==e);return t.hidden_prefixes.some(i=>i.length>0&&e.startsWith(i))?{hidden_labels:r,visible_labels:t.visible_labels.includes(e)?t.visible_labels:[...t.visible_labels,e]}:{hidden_labels:r}}var qv=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],Nf="usage-meter-card",Nv="usage-meter-layer",zl=600,jv=["token_expired","relogin_required"];function jf(e){return String(e).padStart(2,"0")}function Fv(e,t){let n=Math.max(0,Math.ceil((e-t)/6e4)),r=Math.floor(n/1440),o=Math.floor(n%1440/60),i=n%60;return r>0?`${r}d${o>0?` ${o}h`:""}`:o>0?`${o}h${i>0?` ${i}m`:""}`:`${i}m`}function Ff(e,t=Date.now()){let n=Date.parse(e);if(!Number.isFinite(n))return"";let r=new Date(n),o=new Date(t),i=`${jf(r.getHours())}:${jf(r.getMinutes())}`,l=r.getFullYear()===o.getFullYear()&&r.getMonth()===o.getMonth()&&r.getDate()===o.getDate()?i:`${qv[r.getMonth()]} ${r.getDate()} ${i}`;return`${Fv(n,t)} \xB7 ${l}`}function Bv(e){let t=Math.max(0,Math.floor(e));return t<60?`${t}\uCD08 \uC804`:t<3600?`${Math.floor(t/60)}\uBD84 \uC804`:`${Math.floor(t/3600)}\uC2DC\uAC04 \uC804`}function Bf(e){return e>=85?"usage-meter__window--danger":e>=60?"usage-meter__window--warn":"usage-meter__window--success"}function Uf(e){let t=typeof e=="number"&&Number.isFinite(e)?e:0;return Math.min(100,Math.max(0,t))}var Wf=[{key:"claude",label:"Claude",endpoint:"/api/claude-usage",switch_endpoint:"/api/claude-account/switch",tool:"cswap"},{key:"codex",label:"Codex",endpoint:"/api/codex-usage",switch_endpoint:"/api/codex-account/switch",tool:"codex-auth"}];function Hf(e){let t=[];for(let n of e){if(!n||typeof n!="object")continue;let r=n;typeof r.key!="string"||r.key.length===0||typeof r.pct!="number"||!Number.isFinite(r.pct)||t.push({key:r.key,pct:r.pct,resetsAt:typeof r.resetsAt=="string"?r.resetsAt:""})}return t}function Uv(e){if(!e||typeof e!="object")return null;let t=e;return!Number.isInteger(t.number)||t.number<=0||typeof t.email!="string"||t.email.length===0||typeof t.status!="string"||t.status.length===0||typeof t.active!="boolean"||!Array.isArray(t.windows)?null:{number:t.number,email:t.email,alias:typeof t.alias=="string"&&t.alias.length>0?t.alias:null,plan:typeof t.plan=="string"&&t.plan.length>0?t.plan:null,active:t.active,status:t.status,windows:Hf(t.windows),fetchedAt:typeof t.fetchedAt=="string"?t.fetchedAt:null,ageSeconds:typeof t.ageSeconds=="number"&&Number.isFinite(t.ageSeconds)?t.ageSeconds:null}}function Wv(e,t){if(!e||typeof e!="object")return null;let n=e,r=[];if(Array.isArray(n.accounts))for(let i of n.accounts){let s=Uv(i);s&&r.push(s)}let o=n.available===!0&&Array.isArray(n.windows);return!o&&r.length===0?null:{available:o,windows:o?Hf(n.windows):[],ageSeconds:typeof n.ageSeconds=="number"&&Number.isFinite(n.ageSeconds)?n.ageSeconds:null,accounts:r,receivedAtMs:t,held:!1}}function zv(e,t){if(!e||typeof e!="object")return{kind:"error"};let n=Wv(e,t);return n?{kind:"ok",snapshot:n}:Array.isArray(e.accounts)?{kind:"empty"}:{kind:"error"}}function Kf(e,t){return(e.ageSeconds===null?0:e.ageSeconds)+Math.max(0,t-e.receivedAtMs)/1e3}function Hv(e,t){return!e.held||Kf(e,t)<=zl?e:{...e,available:!1,windows:[],accounts:[]}}function zf(e,t){return`${e}:${t}`}function Gf(e){let t=!1,n=null,r=new Map,o=null,i=new Map,s=new Map,l=0,a=null;function u(){dt(c``,e),e.hidden=!0,p()}function d(){if(a===null){let B=e.ownerDocument;a=B.createElement("div"),a.id=Nv,a.className="usage-meter__layer",B.body.appendChild(a)}return a}function p(){a!==null&&(dt(c``,a),a.remove(),a=null)}function m(B){n!==B&&(n===null&&(document.addEventListener("mousedown",w),document.addEventListener("keydown",I),window.addEventListener("resize",R)),n=B)}function _(){n!==null&&(n=null,document.removeEventListener("mousedown",w),document.removeEventListener("keydown",I),window.removeEventListener("resize",R))}function w(B){let X=B.target;X&&(e.contains(X)||a!==null&&a.contains(X))||(_(),G())}function R(){G()}function I(B){B.key==="Escape"&&(_(),G())}function U(B){n===B?_():m(B),G()}function se(){_(),G()}async function W(B,X){if(r.has(B.key))return;let Se=zf(B.key,X);r.set(B.key,X),s.delete(Se),G();let Ee=null;try{Ee=await(await fetch(B.switch_endpoint,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({number:X})})).json()}catch{Ee=null}if(t)return;if(r.delete(B.key),!Ee||Ee.ok!==!0){let re=Ee&&typeof Ee.error=="string"&&Ee.error.length>0?Ee.error:"network_error";s.set(Se,{kind:"error",text:`\uC804\uD658 \uC2E4\uD328 \u2014 ${re}`}),G();return}let C=Array.isArray(Ee.warnings)?Ee.warnings.filter(re=>typeof re=="string"&&re.length>0):[];C.length>0&&s.set(Se,{kind:"warn",text:C.join(" \xB7 ")}),G(),await qe()}function j(B,X,Se,Ee){let C=Uf(B.pct),ke=`resets ${Ff(B.resetsAt,Ee)}${X?` \xB7 ${Se}`:""}`;return c`<span
      class="usage-meter__window ${Bf(C)}"
      style=${`--progress: ${C}%`}
      title=${ke}
    >
      <span class="usage-meter__label">${B.key}</span>
      <span class="usage-meter__track" aria-hidden="true">
        <span class="usage-meter__fill"></span>
      </span>
      <span class="usage-meter__pct">${C}%</span>
    </span>`}function O(B,X,Se){let Ee=Kf(X,Se),C=X.available&&(X.held||Ee>zl),re=C?`${Math.floor(Ee/60)}\uBD84 \uC804 \uCE21\uC815`:"",ke=X.accounts.filter(Le=>!Le.active).length,ve=`usage-meter__group${C?" usage-meter__group--stale":""}`,Me=c`<span class="usage-meter__provider"
        >${B.label}</span
      >
      ${X.available?X.windows.map(Le=>j(Le,C,re,Se)):c`<span class="usage-meter__empty">사용량 없음</span>`}
      ${ke>0?c`<span class="usage-meter__badge">+${ke}</span>`:""}`;if(X.accounts.length===0)return c`<span
        class=${ve}
        aria-label=${`${B.label} usage`}
        >${Me}</span
      >`;let he=n===B.key;return c`<button
      type="button"
      class=${`usage-meter__toggle ${ve}`}
      aria-label=${`${B.label} usage`}
      aria-expanded=${he?"true":"false"}
      aria-controls=${Nf}
      @click=${()=>U(B.key)}
    >
      ${Me}
    </button>`}function q(B,X){return c`<span class="usage-meter" aria-label="Usage">
      ${B.map(Se=>O(Se.provider,Se.snapshot,X))}
    </span>`}function z(B,X){let Se=Uf(B.pct),Ee=Ff(B.resetsAt,X);return c`<span
      class="usage-meter__account-window ${Bf(Se)}"
      style=${`--progress: ${Se}%`}
    >
      <span class="usage-meter__account-key">${B.key}</span>
      <span class="usage-meter__account-track" aria-hidden="true">
        <span class="usage-meter__account-fill"></span>
      </span>
      <span class="usage-meter__account-pct">${Se}%</span>
      <span class="usage-meter__account-reset"
        >${Ee.length>0?`\u21BB ${Ee}`:""}</span
      >
    </span>`}function Y(B,X){return jv.includes(X)?`\uD1A0\uD070 \uB9CC\uB8CC \u2014 ${B.tool} \uC7AC\uB85C\uADF8\uC778 \uD544\uC694`:"\uC0AC\uC6A9\uB7C9 \uC5C6\uC74C"}function N(B,X,Se){let Ee=X.status==="ok",C=typeof X.ageSeconds=="number"&&X.ageSeconds>zl,re=s.get(zf(B.key,X.number)),ke=r.get(B.key),ve=ke!==void 0,Me=ke===X.number,he=["usage-meter__account"];return X.active&&he.push("usage-meter__account--active"),Ee||he.push("usage-meter__account--unavailable"),C&&he.push("usage-meter__account--stale"),c`<div class=${he.join(" ")}>
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
              >${Bv(X.ageSeconds)}</span
            >`}
        ${X.active?"":c`<button
              type="button"
              class="usage-meter__switch"
              ?disabled=${ve}
              @click=${()=>{W(B,X.number)}}
            >
              ${Me?"\uC804\uD658 \uC911\u2026":"\uC804\uD658"}
            </button>`}
      </div>
      ${Ee?c`<div class="usage-meter__account-windows">
            ${X.windows.map(Le=>z(Le,Se))}
          </div>`:c`<div class="usage-meter__account-status">
            ${Y(B,X.status)}
          </div>`}
      ${re===void 0?"":c`<div
            class="usage-meter__account-message usage-meter__account-message--${re.kind}"
          >
            ${re.text}
          </div>`}
    </div>`}function F(B,X,Se){let Ee=X.accounts.filter(C=>C.active).length;return c`<section class="usage-meter__section">
      <h2 class="usage-meter__section-title">
        ${B.label} · 활성 ${Ee} / 전체
        ${X.accounts.length}
      </h2>
      ${X.accounts.map(C=>N(B,C,Se))}
    </section>`}function H(B,X){return c`<div
      class="usage-meter__card"
      id=${Nf}
      role="dialog"
      aria-label=${`${B.provider.label} \uACC4\uC815 \uC0AC\uC6A9\uB7C9`}
    >
      ${F(B.provider,B.snapshot,X)}
      <p class="usage-meter__note">전환은 새로 시작하는 세션부터 적용됩니다.</p>
    </div>`}function G(){let B=Date.now(),X=[];for(let Ee of Wf){let C=i.get(Ee.key);C&&X.push({provider:Ee,snapshot:Hv(C,B)})}if(X.length===0){_(),u();return}let Se=X.find(Ee=>Ee.provider.key===n&&Ee.snapshot.accounts.length>0);Se||_(),dt(q(X,B),e),e.hidden=!1,Se?ee(Se,B):p()}function ee(B,X){let Se=d(),Ee=e.getBoundingClientRect(),C=e.ownerDocument.documentElement.clientWidth;Se.style.setProperty("--usage-meter-anchor-top",`${Ee.bottom}px`),Se.style.setProperty("--usage-meter-anchor-right",`${Math.max(0,C-Ee.right)}px`),dt(c`<div
          class="usage-meter__scrim"
          aria-hidden="true"
          @mousedown=${se}
        ></div>
        ${H(B,X)}`,Se)}async function ye(B){try{let X=await fetch(B.endpoint);return X.ok?zv(await X.json(),Date.now()):{kind:"error"}}catch{return{kind:"error"}}}async function qe(){l+=1;let B=l,X=await Promise.all(Wf.map(async Se=>({provider:Se,read:await ye(Se)})));if(!(t||B!==l)){for(let Se of X){let Ee=Se.provider.key;if(Se.read.kind==="ok"){i.set(Ee,Se.read.snapshot);continue}if(Se.read.kind==="empty"){i.delete(Ee);continue}let C=i.get(Ee);C!==void 0&&!C.held&&i.set(Ee,{...C,held:!0})}G()}}return u(),qe(),o=setInterval(()=>{qe()},6e4),{destroy(){t=!0,o!==null&&(clearInterval(o),o=null),_(),u()}}}function hs(e){let t=e?.blocked_info;return t&&typeof t=="object"?Array.isArray(t.blockers)?t.blockers.filter(r=>typeof r=="string"&&r.length>0):[]:(Array.isArray(e?.dependencies)?e.dependencies:[]).map(r=>{if(typeof r=="string")return r;if(!r||typeof r!="object")return"";let o=r.type??r.dependency_type;return o!==void 0&&o!=="blocks"?"":r.depends_on_id||r.id||""}).filter(Boolean)}var Qf="bdui.worker.candidate_sort",bs=Object.freeze([{id:"spec",label:"spec \uC6B0\uC120",chain:[{key:"spec",dir:"desc"},{key:"created",dir:"asc"}]},{id:"bottleneck",label:"\uBCD1\uBAA9 \uC6B0\uC120",chain:[{key:"priority",dir:"asc"},{key:"dependents",dir:"desc"},{key:"released",dir:"desc"}]},{id:"created",label:"\uCD5C\uC2E0 \uC0DD\uC131",chain:[{key:"created",dir:"desc"},{key:"priority",dir:"asc"}]},{id:"updated",label:"\uCD5C\uC2E0 \uC218\uC815",chain:[{key:"updated",dir:"desc"}]}]),na=Object.freeze({preset:"spec"}),Xf=3,Zf=Object.freeze([{key:"priority",label:"\uC6B0\uC120\uC21C\uC704"},{key:"dependents",label:"\uD6C4\uC18D \uC218"},{key:"released",label:"\uD574\uC81C \uC2DC\uAC01"},{key:"spec",label:"spec \uC720\uBB34"},{key:"created",label:"\uC0DD\uC131"},{key:"updated",label:"\uC218\uC815"}]);function Yf(e){return bs.some(t=>t.id===e)}function Vf(e){let t=bs.find(n=>n.id===e);return t?t.chain.map(n=>({...n})):[]}function Kv(e,t){return e.length===t.length&&e.every((n,r)=>n.key===t[r].key&&n.dir===t[r].dir)}function ys(e){return e&&"preset"in e?Vf(e.preset):e&&Array.isArray(e.chain)?e.chain.map(t=>({...t})):Vf("spec")}function Hl(e){return e&&"preset"in e?e.preset:null}function Wr(e){if(typeof e=="string"){let i;try{i=JSON.parse(e)}catch{return Yf(e)?{preset:e}:na}return Wr(i)}if(!e||typeof e!="object")return na;let t=e;if(Yf(t.preset))return{preset:t.preset};let n=t.chain;if(!Array.isArray(n)||n.length===0||n.length>Xf||!n.every(ba))return na;let r=[];for(let i of n)r.some(s=>s.key===i.key)||r.push({key:i.key,dir:i.dir});let o=bs.find(i=>Kv(i.chain,r));return o?{preset:o.id}:{chain:r}}function Jf(){try{return Wr(window.localStorage.getItem(Qf))}catch{return na}}function Kl(e){try{window.localStorage.setItem(Qf,JSON.stringify(e))}catch{}}function e_(e,t,n){let r=e.map(a=>({...a}));if(!n)return r.slice(0,t);if(!Object.prototype.hasOwnProperty.call(Os,n))return r;let o=n;if(r.slice(0,t).some(a=>a.key===o))return r.slice(0,t);let i={key:o,dir:r[t]&&r[t].key===o?r[t].dir:Os[o]},s=r.slice(0,t),l=r.slice(t+1).filter(a=>a.key!==o);return[...s,i,...l].slice(0,Xf)}function t_(e,t){return e.map((n,r)=>r===t?{key:n.key,dir:n.dir==="asc"?"desc":"asc"}:{...n})}function Gv(e){let t=new Set(e.map(l=>l.id)),n=new Map,r=new Map;for(let l of e){let a=hs(l).filter(u=>t.has(u));n.set(l.id,a);for(let u of a){let d=r.get(u);d?d.push(l):r.set(u,[l])}}let o=new Set,i=[],s=l=>{o.add(l.id),i.push(l);for(let a of r.get(l.id)??[])!o.has(a.id)&&(n.get(a.id)??[]).every(u=>o.has(u))&&s(a)};for(;i.length<e.length;){let l=e.find(a=>!o.has(a.id)&&(n.get(a.id)??[]).every(u=>o.has(u)));s(l??e.find(a=>!o.has(a.id)))}return i}function n_(e,t){let n=Array.isArray(e)?e.slice():[];return n.sort(Ic(ys(t))),Gv(n)}function r_(e,t){let n=new Map;if(!e||typeof e!="object")return n;let r=e,o=[],i=new Set;for(let s of t){if(i.has(s.id))continue;i.add(s.id);let l=r[s.id];if(!l||!Array.isArray(l.scope))continue;let a=l.scope.filter(u=>typeof u=="string"&&u.length>0);if(a.length===0){n.set(s.id,{overlaps:[],scope_missing:!0});continue}n.set(s.id,{overlaps:[],scope_missing:!1}),o.push({member:s,scope:a})}for(let s=0;s<o.length;s+=1)for(let l=s+1;l<o.length;l+=1){let a=ni(o[s].scope,o[l].scope);if(a.length===0)continue;let u=o[s].member,d=o[l].member;n.get(u.id)?.overlaps.push({id:d.id,title:d.title,location_label:d.location_label,prefixes:a}),n.get(d.id)?.overlaps.push({id:u.id,title:u.title,location_label:u.location_label,prefixes:a})}return n}var o_=new Set(["sh","bash","zsh","dash","ksh"]),s_=/('(?:[^']*)'|"(?:\\.|[^"\\])*"|#.*|\$(?:\{[^}\n]*\}|[A-Za-z_][A-Za-z0-9_]*|[?#@*!$0-9-])|\b(?:if|then|else|elif|fi|for|while|until|do|done|case|esac|in|function|select|time)\b)/g;function i_(e){let t=e.split("/");return t[t.length-1]||""}function Yv(e){let t=e.split(`
`,1)[0];if(!t.startsWith("#!"))return!1;let n=t.slice(2).trim().split(/\s+/).filter(Boolean);if(n.length===0)return!1;let r=i_(n[0]);if(r!=="env")return o_.has(r);let o=n.slice(1).find(i=>!i.startsWith("-")&&!i.includes("="));return o!==void 0&&o_.has(i_(o))}function Vv(e){return e.startsWith("#")?"comment":e.startsWith("'")||e.startsWith('"')?"string":e.startsWith("$")?"variable":"keyword"}function Qv(e){let t=[],n=0;s_.lastIndex=0;for(let r of e.matchAll(s_)){let o=r.index;o>n&&t.push({text:e.slice(n,o),kind:"plain"}),t.push({text:r[0],kind:Vv(r[0])}),n=o+r[0].length}return n<e.length&&t.push({text:e.slice(n),kind:"plain"}),t.length===0&&t.push({text:e,kind:"plain"}),t}function Xv(e){return{bad_request:"\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD\uC774 \uC62C\uBC14\uB974\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.",forbidden:"\uB4F1\uB85D\uB418\uC9C0 \uC54A\uC740 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uC758 \uC2A4\uD06C\uB9BD\uD2B8\uB294 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",lane_not_declared:"\uD604\uC7AC \uACE0\uC815 \uC120\uC5B8\uC5D0 \uD574\uB2F9 \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4.",stale_declaration:"\uC800\uC7A5\uC18C \uC791\uC5C5 \uC120\uC5B8\uC774 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uD654\uBA74\uC5D0\uC11C \uB2E4\uC2DC \uC5F4\uC5B4 \uC8FC\uC138\uC694.",too_large:"\uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uB108\uBB34 \uCEE4\uC11C \uD654\uBA74\uC5D0 \uD45C\uC2DC\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",unsupported_content:"\uD14D\uC2A4\uD2B8 \uD615\uC2DD\uC758 \uC2A4\uD06C\uB9BD\uD2B8\uB9CC \uD45C\uC2DC\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.",unreadable:"\uACE0\uC815\uB41C \uC2A4\uD06C\uB9BD\uD2B8 \uB0B4\uC6A9\uC744 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4."}[e]||"\uC2A4\uD06C\uB9BD\uD2B8\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4."}function a_(e){let t=e.getWorkspacePath,n=e.fetchImpl||globalThis.fetch?.bind(globalThis),r=document.createElement("div");r.className="repo-ops-script-viewer-root",document.body.appendChild(r);let o=null,i="loading",s="",l="",a=0,u=null,d=!1;function p(O,q){return q?Qv(O).map(z=>z.kind==="plain"?z.text:c`<span
            class="repo-ops-script-viewer__token repo-ops-script-viewer__token--${z.kind}"
            >${z.text}</span
          >`):O}function m(){if(!o)return c``;let O=i==="ready"&&Yv(s),q=i==="ready"?s.split(`
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
              @click=${()=>{w()}}
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
                  ${q.map((z,Y)=>c`<div class="repo-ops-script-viewer__row">
                        <span
                          class="repo-ops-script-viewer__line-number"
                          aria-hidden="true"
                          >${Y+1}</span
                        ><code class="repo-ops-script-viewer__code-line"
                          >${p(z,O)}</code
                        >
                      </div>`)}
                </div>`}
        </div>
      </section>
    </div>`}function _(){dt(m(),r)}async function w(){if(i!=="ready")return;let O=await _n(s);be(O?"\uC2A4\uD06C\uB9BD\uD2B8 \uBCF5\uC0AC\uB428":"\uC2A4\uD06C\uB9BD\uD2B8 \uBCF5\uC0AC \uC2E4\uD328",O?"success":"error")}function R(O){O.key==="Escape"&&o&&(O.preventDefault(),W())}function I(){d||(document.addEventListener("keydown",R),d=!0)}function U(){d&&(document.removeEventListener("keydown",R),d=!1)}async function se(O,q=null){let z=++a;I(),o={...O},u=q||(document.activeElement instanceof HTMLElement?document.activeElement:null),i="loading",s="",l="",_(),r.querySelector(".repo-ops-script-viewer__close")?.focus();let N=t?t():"";if(!N){i="error",l="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4.",_();return}if(!n){i="error",l="\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD \uAE30\uB2A5\uC744 \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",_();return}let F="/api/repo-ops-script?workspace="+encodeURIComponent(N)+"&lane="+encodeURIComponent(O.lane)+"&base_sha="+encodeURIComponent(O.base_sha);try{let H=await n(F),G=await H.json().catch(()=>({}));if(z!==a)return;if((t?t():"")!==N){W();return}if(!H.ok||!G||G.ok!==!0){i="error",l=Xv(G&&typeof G.error=="string"?G.error:""),_();return}o={lane:G.lane,base_sha:G.base_sha,path:G.path,base_ref:G.base_ref},s=String(G.content),i="ready",_()}catch{if(z!==a)return;i="error",l="\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",_()}}function W(){a+=1,U(),o=null,s="",_();let O=u;u=null,O?.isConnected&&O.focus()}function j(){W(),r.remove()}return{open:se,close:W,destroy:j}}var l_={deploy_not_declared:"\uC120\uC5B8 \uC5C6\uC74C",deploy_opted_out:"\uC774 workspace\uC5D0\uC11C \uBC30\uD3EC \uC2E4\uD589\uC774 \uAEBC\uC838 \uC788\uC74C",deploy_in_flight:"\uBC30\uD3EC \uC9C4\uD589 \uC911",target_unresolved:"\uB300\uC0C1 tip\uC744 \uD655\uC815\uD558\uC9C0 \uBABB\uD568",remote_history_not_monotonic:"\uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC\uC640 \uC6D0\uACA9 \uC774\uB825\uC774 \uAC08\uB77C\uC9D0"},Zv=new Set(["queued","running","retry_pending"]);function c_(e){let t=e.queueStore,n=e.transport,r=e.onChanged||(()=>{}),o=e.onOpenScript;function i(){return t&&t.get()||{}}function s(){let F=i();return typeof F.revision=="number"?F.revision:0}function l(F){t&&F&&F.queue&&typeof F.queue=="object"&&t.set(F.queue)}function a(){let F=i().workspace_info;return F&&typeof F=="object"?F:{}}function u(F,H){return c`<span
      class="worker-repo-ops__vd-badge worker-repo-ops__vd-badge--${F}"
      >${H}</span
    >`}function d(F){if(typeof F!="number"||!Number.isFinite(F))return"";let H=F/6e4;return Number.isInteger(H)?`timeout ${H}\uBD84`:`timeout ${Math.round(F/1e3)}\uCD08`}function p(F){let H=d(F);return H?u("config",H):""}function m(F,H,G){return c`<button
      type="button"
      class="worker-repo-ops__vd-cmd worker-repo-ops__vd-cmd--link"
      .textContent=${G.script}
      @click=${ee=>{o&&o({lane:F,base_sha:H.base_sha,path:G.script,base_ref:H.base_ref},ee.currentTarget)}}
    ></button>`}function _(){let F=i().repo_operations;return Array.isArray(F)?F:[]}function w(){let F=a().repo_ops,H=F&&typeof F=="object"?F.repo_id:null;return typeof H=="string"&&H?H:null}function R(){return _().some(F=>F&&F.kind==="deploy"&&Zv.has(F.state))}function I(){let F=R(),H=w()===null;return c`<button
      type="button"
      class="worker-repo-ops__deploy-run"
      data-seam="repo-ops-deploy-run"
      ?disabled=${F||H}
      title=${F?"\uBC30\uD3EC \uC9C4\uD589 \uC911":H?"\uC800\uC7A5\uC18C\uB97C \uD655\uC778\uD560 \uC218 \uC5C6\uC74C":"\uC6D0\uACA9 base tip\uC5D0\uC11C \uBC30\uD3EC \uC2A4\uD06C\uB9BD\uD2B8\uB97C 1\uD68C \uC2E4\uD589\uD569\uB2C8\uB2E4"}
      @click=${()=>{q()}}
    >
      배포 실행
    </button>`}function U(){let F=i().repo_ops_opt_out;return{verify:F?.verify===!0,deploy:F?.deploy===!0}}function se(F,H){return c`<label class="worker-repo-ops__lane-run">
      <input
        type="checkbox"
        .checked=${!H}
        @change=${G=>{O(F,!G.target.checked)}}
      />
      이 workspace에서 실행
    </label>`}function W(F){let H=typeof F.base_sha=="string"?F.base_sha:"",G=`${F.source_path||"repo-ops/config.toml"} @ ${F.base_ref||"?"}${H?`@${H.slice(0,7)}`:""}`,ee=U(),ye=!!F.verify&&ee.verify,qe=!!F.deploy&&ee.deploy;return c`<section class="worker-repo-ops__vd" data-seam="repo-ops">
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
          >${F.verify?c`${m("verify",F,F.verify)}
              ${p(F.verify.timeout_ms)}
              ${ye?u("skipped","\uC774 workspace\uC5D0\uC11C \uAC74\uB108\uB700"):""}`:c`선언 없음${u("absent","verify \uC5C6\uC774 \uD310\uC815")}`}</span
        >
        <span class="worker-repo-ops__lane-d"
          >${ye?"\uC774 workspace\uC5D0\uC11C\uB294 \uAC80\uC99D \uC5C6\uC774 \uD310\uC815\uD569\uB2C8\uB2E4.":F.verify?"\uBA38\uC9C0 \uC804\uC5D0 \uC774 \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uD1B5\uACFC\uD574\uC57C \uC790\uACA9\uC744 \uC5BB\uC2B5\uB2C8\uB2E4.":"\uBA38\uC9C0 \uC790\uACA9\uC740 PR/base/head \uC2E0\uC120\uB3C4\xB7mergeability\xB7\uB9AC\uBDF0 \uC601\uC218\uC99D\uC73C\uB85C\uB9CC \uD310\uC815\uD569\uB2C8\uB2E4."}</span
        >
        ${F.verify?se("verify",ee.verify):""}
      </div>
      <div
        class="worker-repo-ops__lane${qe?" worker-repo-ops__lane--skipped":""}"
        data-lane="deploy"
      >
        <span class="worker-repo-ops__lane-k">머지 후 배포</span>
        <span class="worker-repo-ops__lane-v"
          >${F.deploy?c`${m("deploy",F,F.deploy)}
              ${p(F.deploy.timeout_ms)}
              ${qe?u("skipped","\uC774 workspace\uC5D0\uC11C \uAC74\uB108\uB700"):I()}`:c`선언 없음${u("absent","\uBC30\uD3EC \uC5C6\uC74C")}`}</span
        >
        <span class="worker-repo-ops__lane-d"
          >${qe?"\uC774 workspace\uC5D0\uC11C\uB294 \uBC30\uD3EC \uC5C6\uC774 \uACE7\uBC14\uB85C \uC815\uB9AC\uB85C \uB118\uC5B4\uAC11\uB2C8\uB2E4.":F.deploy?c`Worker가 <code>.worktrees/.repo-ops-deploy</code>에서 대상
                  SHA로 정렬한 뒤 1회 실행합니다.`:"\uBA38\uC9C0 \uD6C4 \uBC30\uD3EC \uB2E8\uACC4 \uC5C6\uC774 \uACE7\uBC14\uB85C \uC815\uB9AC\uB85C \uB118\uC5B4\uAC11\uB2C8\uB2E4."}</span
        >
        ${F.deploy?se("deploy",ee.deploy):""}
      </div>
    </section>`}function j(F){let H=F.repo_ops&&typeof F.repo_ops=="object"?F.repo_ops:null;return H&&(H.status==="resolved"||H.status==="absent")?W(H):H&&(H.status==="pending"||H.status==="error")?c`<section class="worker-repo-ops__vd" data-seam="repo-ops">
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
    </section>`}async function O(F,H){if(!n)return;let G=await n("worker-repo-ops-opt-out-toggle",{kind:F,opted_out:H,expected_revision:s()});if(l(G),G&&G.conflict){let ee=await n("worker-repo-ops-opt-out-toggle",{kind:F,opted_out:H,expected_revision:s()});l(ee)}r()}async function q(){let F=w();if(!n||F===null)return;let H=await n("worker-repo-operation-deploy-run",{repo_id:F});if(l(H),!H||H.ok!==!0){let G=H&&typeof H.reason=="string"?H.reason:"",ee=Object.hasOwn(l_,G)?l_[G]:G||"\uBC30\uD3EC \uC2E4\uD589\uC744 \uC2DC\uC791\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4";be(`\uBC30\uD3EC \uC2E4\uD589 \uAC70\uBD80 \u2014 ${ee}`,"error")}else be("\uBC30\uD3EC \uC2E4\uD589\uC744 \uC2DC\uC791\uD588\uC2B5\uB2C8\uB2E4","success");r()}let z={owned_deploy_worktree_fetch_detached_alignment_recreate:"\uC804\uC6A9 \uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC \uC815\uB82C\xB7\uBCF5\uAD6C",recovered_pre_execution_fetch_timeout_retry_once:"fetch \uD0C0\uC784\uC544\uC6C3 1\uD68C \uBCF5\uAD6C",repo_serial_lock_wait:"\uC800\uC7A5\uC18C \uC21C\uCC28 \uC2E4\uD589 \uB300\uAE30",restart_operation_adoption:"\uC7AC\uC2DC\uC791 \uD6C4 \uC791\uC5C5 \uC778\uACC4",exact_input_exit_zero_evidence_adoption:"\uB3D9\uC77C \uC785\uB825 \uC131\uACF5 \uC99D\uAC70 \uC778\uACC4",descendant_success_covers_ancestor_rows:"\uCD5C\uC2E0 SHA \uC131\uACF5\uC774 \uC774\uC804 \uD589 \uCEE4\uBC84",owned_verify_candidate_cleanup:"\uAC80\uC99D \uC784\uC2DC \uCCB4\uD06C\uC544\uC6C3 \uC815\uB9AC",bounded_single_script_retry_exceeded:"\uB2E8\uC77C \uC2A4\uD06C\uB9BD\uD2B8 \uC7AC\uC2DC\uB3C4 \uD55C\uB3C4 \uCD08\uACFC",repair_session_dispatch:"\uC2E4\uD328 \uD574\uACB0 \uC138\uC158 \uC790\uB3D9 \uC2E4\uD589",baseline_failure_ignore:"\uAE30\uC874 \uC2E4\uD328 \uBB34\uC2DC",config_or_script_deletion_to_bypass_gate:"\uC124\uC815\xB7\uC2A4\uD06C\uB9BD\uD2B8 \uC0AD\uC81C\uB85C \uAC8C\uC774\uD2B8 \uC6B0\uD68C",credential_entry:"\uC790\uACA9\uC99D\uBA85 \uC785\uB825\xB7\uCD9C\uB825",destructive_action:"\uD30C\uAD34\uC801 \uC791\uC5C5",history_rewrite:"\uD788\uC2A4\uD1A0\uB9AC \uC7AC\uC791\uC131",agent_self_report_as_success:"\uC138\uC158 \uC790\uAE30\uBCF4\uACE0\uB97C \uC131\uACF5 \uCC98\uB9AC"};function Y(F,H,G){return c`<div class="worker-repo-ops__policy-group" data-policy=${G}>
      <div class="worker-repo-ops__policy-label">${F}</div>
      <ul class="worker-repo-ops__policy-list">
        ${H.map(ee=>c`<li data-token=${ee}>
              ${z[ee]||ee}
            </li>`)}
      </ul>
    </div>`}function N(){let F=i(),H=F.repo_operation_policy&&typeof F.repo_operation_policy=="object"?F.repo_operation_policy:null;return H?c`<section
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
        ${Y("Worker\uAC00 \uC790\uB3D9 \uCC98\uB9AC",H.worker_automatic||[],"worker-automatic")}
        ${Y("\uC790\uB3D9\uC73C\uB85C \uD558\uC9C0 \uC54A\uC74C",H.never_automatic||[],"never-automatic")}
      </details>
    </section>`:""}return{template(){return c`<details class="worker-repo-ops-settings">
        <summary class="worker-repo-ops-settings__summary">
          저장소 작업 · 검증/배포 선언
        </summary>
        ${j(a())} ${N()}
      </details>`}}}var p_=20,Jv=5,ek=new Set(["failed","running","queued","retry_pending"]),Gl={verify:"\uBA38\uC9C0 \uC804 \uAC80\uC99D",deploy:"\uBA38\uC9C0 \uD6C4 \uBC30\uD3EC",job:"\uBA38\uC9C0 \uD6C4 \uC7A1"},u_={verify:"verify",deploy:"deploy",job:"deploy"};function tk(e){if(typeof e!="string")return"";let t=e.split("/").filter(n=>n.length>0);return t.length>0?t[t.length-1]:""}function nk(e){return!e||typeof e!="object"?"":e.kind==="job"?tk(e.script_path)||Gl.job:Object.hasOwn(Gl,e.kind)?Gl[e.kind]:e.kind}function rk(e,t,n=p_){let r=[];for(let o of Array.isArray(e)?e:[])!o||typeof o!="object"||r.push({type:"operation",id:o.operation_id,at:typeof o.finished_at=="number"?o.finished_at:typeof o.requested_at=="number"?o.requested_at:null,operation:o});for(let o of Array.isArray(t)?t:[])!o||typeof o!="object"||r.push({type:"cleanup",id:o.bead_id,at:typeof o.at=="number"?o.at:null,cleanup:o});return r.sort((o,i)=>o.at===null&&i.at===null?String(o.id||"").localeCompare(String(i.id||"")):o.at===null?1:i.at===null?-1:i.at-o.at),r.slice(0,Math.max(0,n))}function ok(e){if(e.type==="cleanup")return!0;let t=e.operation;return ek.has(t.state)&&!t.dismissed&&!t.superseded_by}function sk(e,t,n={}){let r=rk(e,t,1/0),o=n.expanded===!0?p_:Jv,i=new Set(r.slice(0,o)),s=r.filter(l=>i.has(l)||ok(l));return{visible:s,hidden:r.length-s.length}}function d_(e){if(e.type==="cleanup")return"warn";let t=e.operation.state;return t==="succeeded"?"ok":t==="failed"?"fail":"live"}function ik(e){if(e.type==="cleanup")return"\uBA48\uCDA4";switch(e.operation.state){case"succeeded":return"\uC131\uACF5";case"failed":return"\uC2E4\uD328";case"retry_pending":return"\uC7AC\uC2DC\uB3C4 \uC911";case"running":return"\uC2E4\uD589 \uC911";default:return"\uB300\uAE30"}}function f_(e){let t=e.filter(n=>n.value);return t.length===0?"":c`<details class="worker-ev__details">
    <summary>세부</summary>
    <dl class="worker-ev__kv">
      ${t.map(n=>{let r=n.copy===!0?Dr(n.value):n.value;return c`<div>
          <dt>${n.term}</dt>
          <dd>${r}</dd>
        </div>`})}
    </dl>
  </details>`}function __(e,t="",n=!1){return!e&&!t?"":c`<p
    class="worker-ev__explain${n?" worker-ev__explain--warn":""}"
  >
    <span class="worker-ev__cause">${e}</span>${t?c`<br />${t}`:""}
  </p>`}function ak(e,t){if(!e||typeof e!="object")return;let n=t&&typeof t=="object"?t.kind:"";if(!Object.hasOwn(u_,n))return;let r=e[u_[n]],o=r&&typeof r=="object"?r.timeout_ms:void 0;return typeof o=="number"&&Number.isFinite(o)?o:void 0}function lk(e,t){let n=of(e,t),r=sf(e);return!n&&!r?"":c`<p class="worker-ev__why">
    ${n?c`<span class="worker-ev__why-line">${n}</span>`:""}${r?c`<span class="worker-ev__why-line">${r}</span>`:""}
  </p>`}function ck(e){return e.state!=="failed"||e.superseded_by||e.dismissed?"":c`<div class="worker-ev__acts">
    <button
      type="button"
      class="worker-ev__btn worker-repo-op__dismiss"
      data-operation-id=${e.operation_id}
      title="사람이 확인한 실패로 접수합니다 — 기록은 그대로 남고 해결 필요 집계에서만 빠집니다"
    >
      기록 닫기
    </button>
  </div>`}function uk(e,t){let n=e.operation,r=n.state==="failed",o=n.failure?n.failure.code:"";return c`<li
    class="worker-ev"
    data-operation-id=${n.operation_id}
    data-state=${n.state}
  >
    <span
      class="worker-ev__t"
      title=${e.at?tn(e.at):""}
      >${ai(e.at)||"\u2014"}</span
    >
    <span class="worker-ev__node" aria-hidden="true"
      ><span class="worker-ev__dot worker-ev__dot--${d_(e)}"></span
    ></span>
    <div class="worker-ev__body">
      <div class="worker-ev__line1">
        <span class="worker-ev__what">${nk(n)}</span>
        <span class="worker-ev__meta"
          >${n.target_base}@${ii(n.target_sha)}${typeof n.elapsed_ms=="number"?` \xB7 ${qr(n.elapsed_ms)}`:""}</span
        >
        <span class="worker-ev__st worker-ev__st--${d_(e)}"
          >${ik(e)}</span
        >
        ${n.dismissed?c`<span class="worker-ev__st worker-ev__st--quiet">접수됨</span>`:""}
        ${n.superseded_by?c`<span class="worker-ev__st worker-ev__st--quiet">덮임</span>`:""}
        ${n.source==="manual"?c`<span
              class="worker-ev__st worker-ev__st--manual"
              title="사람이 배포 실행을 눌러 시작한 작업입니다"
              >수동</span
            >`:""}
      </div>
      ${r?__(rf(n.failure_kind,o)):""}
      ${lk(n,ak(t,n))}
      ${ck(n)}
      ${f_([{term:"\uC2E4\uD328 \uCF54\uB4DC",value:r?o:""},{term:"script",value:[n.script_path||"",n.script_blob_sha?`blob ${ii(n.script_blob_sha)}`:"",Number.isInteger(n.exit_code)?`exit ${n.exit_code}`:""].filter(Boolean).join(" \xB7 ")},{term:"\uB85C\uADF8",value:n.log_path||"",copy:!0},{term:"\uCD9C\uB825",value:n.output_tail||""}])}
    </div>
  </li>`}function dk(e){let t=e.cleanup,n=Nr(t.step);return c`<li
    class="worker-ev"
    data-bead-id=${t.bead_id}
    data-state="cleanup_stalled"
  >
    <span
      class="worker-ev__t"
      title=${e.at?tn(e.at):""}
      >${ai(e.at)||"\u2014"}</span
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
        ${fd(t.step).map(r=>c`<li
              class="worker-step worker-step--${r.state}"
              data-step=${r.step}
            >
              <span class="worker-step__pip" aria-hidden="true"></span>
              <span class="worker-step__lb">${r.label}</span>
            </li>`)}
      </ol>
      ${__(kr(t.reason),typeof t.retry_count=="number"&&t.retry_count>0?`${t.retry_count}\uD68C \uC790\uB3D9 \uC7AC\uC2DC\uB3C4 \uD6C4\uC5D0\uB3C4 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4 \u2014 \uC815\uB9AC\uB97C \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uBA74 \uBA48\uCD98 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4.`:"\uC815\uB9AC\uB97C \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uBA74 \uBA48\uCD98 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4.",!0)}
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
      ${f_([{term:"\uC2E4\uD328 \uCF54\uB4DC",value:t.reason||""},{term:"\uC9C4\uB2E8",value:t.detail||""},{term:"\uB85C\uADF8",value:t.log_path||"",copy:!0},{term:"\uCD9C\uB825",value:t.output_tail||""}])}
    </div>
  </li>`}function pk(e){let t=typeof e.hidden=="number"?e.hidden:0,n=e.expanded===!0;return c`<section class="worker-repo-drawer" data-seam="repo-ops-timeline">
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
          ${e.events.map(r=>r.type==="cleanup"?dk(r):uk(r,e.repo_ops))}
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
  </section>`}function m_(e,t={}){let n=null;function r(){if(n===null){dt(c``,e);return}let s=sk(n.operations,n.cleanup_failures,{expanded:n.expanded});dt(pk({events:s.visible,hidden:s.hidden,expanded:n.expanded,repo:n.repo,repo_ops:n.repo_ops}),e)}e.addEventListener("click",s=>{let l=s.target;if(l?.closest?.('[data-seam="repo-ops-close"]')){i();return}l?.closest?.('[data-seam="repo-ops-more"]')&&n&&(n.expanded=!n.expanded,r())});function o(s){n={operations:s.operations,cleanup_failures:s.cleanup_failures,repo:s.repo||"",repo_ops:s.repo_ops||null,expanded:!1},r()}function i(){n!==null&&(n=null,r(),t.onClose&&t.onClose())}return{open:o,close:i,isOpen:()=>n!==null,refresh(s){n&&(n={operations:s.operations,cleanup_failures:s.cleanup_failures,repo:s.repo||"",repo_ops:s.repo_ops||null,expanded:n.expanded},r())}}}var fk="session-preferred",_k=["external_roundtrip","user_feedback_loop"];function g_(e,t){if(!Bo(e).includes(fk)||typeof t!="object"||t===null)return"";let n=t.session_preferred_reason;return typeof n=="string"&&_k.includes(n)?n:""}var mk="spec-after-blocker";function h_(e,t){return Bo(e).includes(mk)&&Array.isArray(t)&&t.length>0}var gk=Ft("views:worker:adapter"),hk="tab:worker:ready",bk="tab:worker:blocked",yk="tab:worker:in-progress",vk="tab:worker:resolved",kk="tab:worker:closed",wk="\u{1F512} blocked",$k={revision:0,auto_advance:!1,auto_merge:!1,slots:xi,queue:[],serial_lanes:[],serial_lane_count:0,pr_wait:[],done:[]},xk=["claude_account","codex_account"],Ak=[...uo,...xk];function Sk(e){let t=e&&e.parent;return(typeof t=="string"?t.length>0:!!(t&&t.id))||/\.\d+$/.test(e&&e.id||"")}function Ek(e){let t=e&&typeof e=="object"?e.awaiting_user:void 0,n=typeof t=="string"?t.trim():"";return n.length>0?`${hi}: ${n}`:hi}function wr(e){return e&&typeof e=="object"?e:{}}function Tk(e){let t={};for(let n of Ak){let r=e[n];typeof r=="string"&&r.length>0&&(t[n]=r)}return t}function Ck(e){let t=new Map;for(let r of e){if(!r||typeof r.id!="string"||r.id.length===0)continue;let o=wr(r.metadata).carried_from;if(!(typeof o!="string"||o.length===0))for(let i of hs(r)){let s=t.get(i);s||(s=new Set,t.set(i,s)),s.add(r.id)}}let n=new Map;for(let[r,o]of t)n.set(r,[...o].sort());return n}function Rk(e){let t=e.replace(/\/+$/,""),n=t.lastIndexOf("/");return n>=0?t.slice(n+1):t}function b_(e={}){let{queueStore:t,issueStores:n,transport:r,getWorkspacePath:o,onInvalidate:i}=e,s=n?eo(n):null,l=new Map,a={},u=null,d=0,p=null,m=!1;function _(){m||!i||i()}function w(q){return u===q?a:{}}async function R(){if(!r||m)return;let q=o?.()||"";if(u===q||p&&p.key===q&&p.generation===d)return;let z=++d;p={key:q,generation:z};let Y=null;try{Y=await Promise.resolve(r("get-session-defaults",{}))}catch(N){if(z!==d)return;p=null,gk("get-session-defaults failed: %o",N),_();return}z===d&&(a=Y&&typeof Y.values=="object"&&Y.values!==null?{...Y.values}:{},u=q,p=null,_())}function I(){u=null,d+=1,R()}function U(){for(let[q,z]of l)z==="failed"&&l.delete(q)}function se(q,z){return s?s.selectBoardColumn(q,z):[]}function W(q,z,Y,N){let F=new Set(Y.map(B=>B.id)),H=new Set,G=new Map,ee=[];for(let B of[...z,...Y]){if(H.has(B.id)||Sk(B))continue;let X=Uo(B,q);X.location===null&&(H.add(B.id),G.set(B.id,X),ee.push(B))}let ye=n_(ee,Wr(N)),qe=wr(q.bead_scope);return ye.map(B=>{let X=G.get(B.id),Se=Zr(B),Ee=Se.evidence==="published",C=typeof B.workflow?.route=="string"&&B.workflow.route||(B.metadata&&typeof B.metadata.route=="string"?B.metadata.route:""),re=X.worker_ineligible,ke=re||!Object.hasOwn(B,"labels")?"":g_(B.labels,B.metadata),ve=F.has(B.id),Me=ve?hs(B):[],he=[];ve&&Me.length===0&&he.push(wk),X.awaiting_user&&he.push(Ek(B.metadata)),X.missing_description?he.push("missing_description"):X.spec==="conflict"?he.push("spec_id_conflict"):X.spec==="none"?he.push("spec \uC5C6\uC74C"):X.spec==="draft"&&he.push("spec \uBBF8\uBC1C\uD589(draft)");let Le=qe[B.id];return{bead_id:B.id,title:B.title||B.id,route:C,spec_id:Se.conflict?"":Se.path,published:Ee,blocked:ve,blocked_by:Me,labels:Array.isArray(B.labels)?B.labels:[],created_at:B.created_at,updated_at:B.updated_at,status:B.status,workflow:B.workflow||null,exec_pins:Tk(wr(B.metadata)),rec:null,...Le&&Array.isArray(Le.scope)?{scope:Le.scope}:{},eligible:X.placeable,reason:he.join(" \xB7 "),worker_ineligible:re,session_preferred:ke.length>0,session_preferred_reason:ke,spec_after_blocker:h_(B.labels,Me),release_info:B.release_info,dependents_info:B.dependents_info}})}function j(q){let[z,Y,N,F,H]=q,G=Ps([...z,...Y,...N,...F,...H]),ee=Ck([...z,...Y,...N,...F]),ye={},qe=(B,X)=>{if(!B||typeof B.id!="string"||B.id.length===0)return;let Se=ye[B.id]||(ye[B.id]={});if(typeof B.priority=="number"&&!("priority"in Se)&&(Se.priority=B.priority),typeof B.from_id=="string"&&!("from_id"in Se)&&(Se.from_id=B.from_id),X&&!("metadata"in Se)){Se.metadata=wr(B.metadata);let Ee=wr(B.workflow).route;typeof Ee=="string"&&Ee.length>0&&(Se.route=Ee)}};for(let B of[...z,...Y,...N])qe(B,!0);for(let B of[...F,...H])qe(B,!1);for(let B of new Set([...Object.keys(ye),...G.keys()])){let X=Ds(G,B);if(X.total>0){let Se=ye[B]||(ye[B]={});Se.rollup=X}}for(let[B,X]of ee){let Se=ye[B]||(ye[B]={});Se.carried_to=X}return ye}function O(q,z,Y,N){let F=new Set((Array.isArray(q.done)?q.done:[]).map(G=>G?.bead_id).filter(G=>typeof G=="string")),H=[];for(let G of z){let ee=ur(G.closed_at);if(typeof G.id!="string"||F.has(G.id)||ee===null||N!==void 0&&ee<N||typeof G.comment_count!="number"||G.comment_count<=0)continue;let ye=`${Y}\0${G.id}\0${String(G.updated_at)}\0${G.comment_count}`,qe=l.get(ye);if(qe===void 0&&r&&(l.set(ye,"pending"),Promise.resolve(r("get-comments",{id:G.id})).then(X=>{let Se=Array.isArray(X)&&X.some(Ee=>Bi(typeof Ee?.text=="string"?Ee.text:"")?.lane==="session");l.set(ye,Se?"session":"not-session"),_()}).catch(()=>{l.set(ye,"failed"),_()})),qe!=="session")continue;let B=ur(G.started_at);H.push({id:G.id,title:G.title||G.id,reason:"",draggable:!1,done:!0,lane:"done",selectable:!1,selected:!1,badges:["\uC138\uC158 \uC791\uC5C5"],alert:!1,usage:null,work_ms:B!==null&&ee>=B?ee-B:null,work_kind:"session",done_at:ee,created_at:G.created_at,updated_at:G.updated_at})}return H}return{read(q){if(!t)return{workspaces:[],workspaces_state:[]};let z=t.get()||$k,Y=o?.()||"",N=q&&typeof q.done_since=="number"?q.done_since:void 0,F=se(hk,"ready"),H=se(bk,"blocked"),G=se(yk,"in_progress"),ee=se(vk,"resolved"),ye=se(kk,"closed");return{workspaces:[{...z,bead_titles:{...wr(z.bead_titles),...Object.fromEntries([...F,...H].filter(qe=>qe&&typeof qe.id=="string").map(qe=>[qe.id,qe.title||qe.id]))},root_dir:Y,name:Rk(Y),runnable:W(z,F,H,q?q.candidate_sort:void 0),session_done:O(z,ye,Y,N),bead_overlay:j([F,H,G,ee,ye])}],workspaces_state:[{root_dir:Y,revision:z.revision,auto_advance:z.auto_advance,auto_merge:z.auto_merge,slots:typeof wr(z.workspace_info).slots=="number"?wr(z.workspace_info).slots:z.slots,runner_catalog:z.runner_catalog,execution_defaults:z.execution_defaults,session_defaults:w(Y),orchestration_model:z.orchestration_model,orchestration_effort:z.orchestration_effort,orchestration_speed:z.orchestration_speed,quick_fix_orchestration_model:z.quick_fix_orchestration_model,quick_fix_orchestration_effort:z.quick_fix_orchestration_effort,quick_fix_orchestration_speed:z.quick_fix_orchestration_speed,issue_prefix:""}]}},ensureSessionDefaults(){R()},refreshSessionDefaults:I,notifyIssuesChanged:U,destroy(){m=!0,d+=1,p=null,l.clear()}}}var ra=1,y_=5,Ok={root_dir:"",name:"",auto_advance:!1,auto_merge:!1,slots:ra,revision:0,runner_catalog:{},items:[],sublanes:{parallel:[],serial:[]},serial_lane_count:0,raw_queue_length:0,live_count:0,over_cap:!1,merge:{positions:new Map,resolutions:new Map,continuations:new Map,authorities:new Map,state:{active:null,failures:{},waiting:null},auto_excluded:[],running:!1},token_total:null,cleanup_failures:[],declared_base:null,repo_operations:[]};function It(e){return e&&typeof e=="object"?e:{}}var w_="beads-ui.worker.candidate-filter",Yl={show_blocked:!1,spec:"all"};function Ik(){try{let e=window.localStorage.getItem(w_);if(!e)return{...Yl};let t=JSON.parse(e);if(!t||typeof t!="object")return{...Yl};let n=t.spec;return{show_blocked:t.show_blocked===!0,spec:n==="with"||n==="without"?n:"all"}}catch{return{...Yl}}}function Lk(e){try{window.localStorage.setItem(w_,JSON.stringify(e))}catch{}}var Pk=[{value:"all",label:"\uC804\uCCB4"},{value:"with",label:"spec \uC788\uC74C"},{value:"without",label:"spec \uC5C6\uC74C"}],$_="bdui.worker.done-range";function Dk(){try{let e=window.localStorage.getItem($_);return e===null?"today":zn(e)}catch{return"today"}}function Mk(e){try{window.localStorage.setItem($_,e)}catch{}}function v_(e){let t=Array.isArray(e)&&e.length>0?e[0]:null;if(!t)return"";let n=typeof t.title=="string"?t.title:t.id||"";return n.length>22?`${n.slice(0,22)}\u2026`:n}function qk(e){return e==="receipt_not_current"?"\uB9AC\uBDF0 \uD6C4\uC5D0\uB3C4 \uC601\uC218\uC99D\uC774 \uCD5C\uC885 head\uC5D0 \uC720\uD6A8\uD558\uC9C0 \uC54A\uC74C":e==="cancelled"?"\uB9AC\uBDF0 \uC138\uC158 \uCDE8\uC18C\uB428":e.startsWith("launch_failed:")?`\uB9AC\uBDF0 \uC138\uC158 \uC2DC\uC791 \uC2E4\uD328(${e.slice(14)})`:e.startsWith("session_failed:")?`\uB9AC\uBDF0 \uC138\uC158 \uBE44\uC815\uC0C1 \uC885\uB8CC(${e.slice(15)})`:`\uB9AC\uBDF0 \uC138\uC158 \uC2E4\uD328(${e})`}function k_(e){if(e.startsWith("receipt_unbacked:"))return`\uC2E4\uD589 \uC601\uC218\uC99D \uC790\uB3D9 \uAC80\uC99D \uBD88\uAC00(${e.slice(17)}) \u2014 [\uBA38\uC9C0] \uD074\uB9AD\uC73C\uB85C \uC218\uB3D9 \uC9C4\uD589 \uAC00\uB2A5`;switch(e){case"not_in_pr_wait":return"PR \uB300\uAE30 \uC0C1\uD0DC \uB3D9\uAE30\uD654 \uC2E4\uD328";case"resolution_round_cap":return"\uCDA9\uB3CC \uD574\uC18C 2\uD68C \uCD08\uACFC";case"resolution_rebase_cap":return"\uD050 \uC7AC\uCDA9\uB3CC 3\uD68C \uCD08\uACFC";case"resolution_timeout":return"\uCDA9\uB3CC \uD574\uC18C \uB300\uAE30 \uC2DC\uAC04 \uCD08\uACFC";case"resolution_refused":return"\uD574\uC18C \uC138\uC158 \uB514\uC2A4\uD328\uCE58 \uAC70\uBD80";case"worktree_missing":return"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uD574\uC18C \uD544\uC694";case"worktree_restore_branch_mismatch":return"\uC6CC\uD06C\uD2B8\uB9AC \uBCF5\uC6D0 \uC2E4\uD328 \u2014 \uBE0C\uB79C\uCE58 \uC774\uB984 \uBD88\uC77C\uCE58";case"worktree_restore_path_exists":return"\uC6CC\uD06C\uD2B8\uB9AC \uBCF5\uC6D0 \uC2E4\uD328 \u2014 \uACBD\uB85C \uC774\uBBF8 \uC788\uC74C";case"worktree_restore_branch_missing":return"\uC6CC\uD06C\uD2B8\uB9AC \uBCF5\uC6D0 \uC2E4\uD328 \u2014 origin\uC5D0 \uBE0C\uB79C\uCE58 \uC5C6\uC74C";case"worktree_restore_branch_diverged":return"\uC6CC\uD06C\uD2B8\uB9AC \uBCF5\uC6D0 \uC2E4\uD328 \u2014 \uB85C\uCEEC \uBE0C\uB79C\uCE58\uAC00 origin\uACFC \uB2E4\uB984";case"worktree_restore_failed":return"\uC6CC\uD06C\uD2B8\uB9AC \uBCF5\uC6D0 \uC2E4\uD328";case"merge_unconfirmed_timeout":return"\uBA38\uC9C0 \uD655\uC778 \uC2DC\uAC04 \uCD08\uACFC";case"pr_closed_unmerged":return"PR \uB2EB\uD798";case"merge_error":return"\uBA38\uC9C0 \uC624\uB958";case"spec_id_missing":return"\uC2A4\uD399 ID \uAE30\uB85D \uC5C6\uC74C";default:return e}}function Nk(e){if(e==="lane_occupied")return"\uC2E4\uD589 \uB808\uC778\uC5D0 \uB0A8\uC544 \uC788\uC5B4 \uBA38\uC9C0 \uB300\uC0C1\uC774 \uC544\uB2D9\uB2C8\uB2E4";let t="\uBA38\uC9C0 \uD050\uC5D0 \uB123\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 (\uC774\uBBF8 \uB300\uAE30 \uC911\uC774\uAC70\uB098 \uB300\uC0C1 \uC544\uB2D8)";return typeof e=="string"&&e.length>0?`${t}: ${e}`:t}function jk(e){switch(e){case"no_terminal_failure":return"\uC774 \uD589\uC5D0 \uC774\uC5B4\uBC1B\uC744 terminal \uC2E4\uD328 \uAE30\uB85D\uC774 \uC5C6\uC2B5\uB2C8\uB2E4";case"tmux_unavailable":return"tmux\uC5D0 \uB2FF\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 \u2014 \uC138\uC158\uC744 \uB744\uC6B0\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4";case"launch_failed:claude_not_found":return"claude \uC2E4\uD589 \uD30C\uC77C\uC744 PATH\uC5D0\uC11C \uCC3E\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4";case"launch_failed:new_session":return"tmux \uC138\uC158\uC744 \uB9CC\uB4E4\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4";case"launch_failed:new_window":return"tmux \uCC3D\uC744 \uB9CC\uB4E4\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4";case"launch_failed:exited":return"\uB744\uC6B4 \uC138\uC158\uC774 \uACE7\uBC14\uB85C \uC885\uB8CC\uB410\uC2B5\uB2C8\uB2E4";case"error":return"\uC138\uC158 \uAE30\uB3D9 \uC911 \uC624\uB958\uAC00 \uB0AC\uC2B5\uB2C8\uB2E4";default:return typeof e=="string"&&e.length>0?e:"\uC138\uC158\uC744 \uB744\uC6B0\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"}}function Fk(e){switch(e){case"no_session_ref":return"\uAE30\uB85D\uB41C \uC138\uC158 \uC5C6\uC74C";case"unsafe_session_id":return"\uC138\uC158 ID\uB97C \uC778\uC790\uB85C \uC4F8 \uC218 \uC5C6\uC74C";case"provider_mismatch":return"\uAE30\uB85D\uB41C \uC138\uC158\uC774 claude\uAC00 \uC544\uB2D8";case"not_local":return"\uAE30\uB85D\uB41C \uC138\uC158\uC758 transcript\uAC00 \uC774 \uAE30\uAE30\uC5D0 \uC5C6\uC74C";case"bd_unavailable":return"Bead \uBA54\uD0C0\uB370\uC774\uD130\uB97C \uC77D\uC9C0 \uBABB\uD568";default:return typeof e=="string"&&e.length>0?e:"\uC0AC\uC720 \uBBF8\uC0C1"}}function Bk(e){if(!e||typeof e!="object")return"\uC138\uC158 \uAE30\uB3D9 \uC751\uB2F5\uC744 \uBC1B\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4";if(e.conflict===!0)return"\uD050\uAC00 \uBC14\uB00C\uC5B4 \uD074\uB9AD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uB20C\uB7EC\uC8FC\uC138\uC694";if(e.session==="already_running")return"\uC774\uBBF8 \uC774 \uC774\uC288\uC758 \uD574\uACB0 \uC138\uC158\uC774 \uC5F4\uB824 \uC788\uC2B5\uB2C8\uB2E4";if(e.launched!==!0)return`\uC138\uC158\uC5D0\uC11C \uD574\uACB0 \uAC70\uBD80: ${jk(e.reason)}`;let t=e.bridge_active===!0?"":" (Discord \uC911\uACC4 \uBE44\uD65C\uC131 \u2014 tmux\uC5D0\uC11C \uB2F5\uD558\uC138\uC694)";return e.mode==="fork"?`\uAE30\uB85D\uB41C \uC138\uC158\uC744 fork\uD574 \uB744\uC6E0\uC2B5\uB2C8\uB2E4${t}`:`\uC0C8 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4 \u2014 ${Fk(e.fallback_reason)}${t}`}function Uk(e){return e&&e.launched===!0?"success":"error"}function Wk(e){if(e==="worker_sessions_busy")return"\uD574\uC18C \uB300\uAE30 \u2014 \uC2E4\uD589 \uC2AC\uB86F \uB300\uAE30 \uC911";if(typeof e!="string"||!e.startsWith("completion_waiting:"))return null;let t=e.slice(19);if(t.length===0)return null;switch(t){case"gating":return"\uBA38\uC9C0 \uC870\uAC74 \uD655\uC778 \uC911";case"merging":return"\uBA38\uC9C0 \uC911";case"cleaning":return"\uB9C8\uBB34\uB9AC \uC911";case"paused":return"\uC790\uB3D9 \uC9C4\uD589 \uC77C\uC2DC\uC815\uC9C0";case"needs_human":return"\uD655\uC778 \uD544\uC694";default:return null}}function zk(e){if(!e||typeof e!="object")return null;switch(e.state){case"waiting":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC911",live:!0};case"yielded":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uACC4\uC18D \uC911 \xB7 \uC644\uB8CC \uD6C4 \uC6B0\uC120 \uBA38\uC9C0",live:!0};case"ready":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC644\uB8CC \xB7 \uC7AC\uAC80\uC99D \uB300\uAE30",live:!1};default:return null}}var Hk=new Set(["paused","needs_human","waiting_metadata","reviewing","retrying"]),Kk=new Set(["waiting_metadata","reviewing","retrying"]),Vl=new Set(["review_receipt_missing","review_receipt_stale","review_receipt_invalid","review_receipt_undetermined"]);function Gk(e){let t=e&&typeof e=="object"?e.auto_resolution:null,n=t&&typeof t=="object"&&!Array.isArray(t)?t:null;if(!n||!e)return null;let r=typeof n.origin_reason=="string"&&n.origin_reason.length>0?`\uC6D0 \uC0AC\uC720: ${n.origin_reason}`:"";switch(e.phase){case"waiting_metadata":return{label:"\uC815\uC815 \uB300\uAE30",details:[r,"\uBA54\uD0C0\uB370\uC774\uD130 \uC815\uC815\uC774 \uAD00\uCE21\uB418\uBA74 \uC790\uB3D9 \uC7AC\uAC1C"].filter(Boolean),live:!1};case"retrying":{let o=Number.isInteger(n.attempts)?Math.max(0,Number(n.attempts)):0,i=Number.isInteger(n.attempt_cap)&&Number(n.attempt_cap)>0?Number(n.attempt_cap):0,s=typeof n.next_at=="number"?tn(n.next_at):"",l=typeof n.last_error=="string"&&n.last_error.length>0?n.last_error:"";return{label:i>0?`\uC7AC\uC2DC\uB3C4 ${Math.min(o,i)}/${i}`:`\uC7AC\uC2DC\uB3C4 ${o}`,details:[r,s?`\uB2E4\uC74C \uC2DC\uAC01 ${s}`:"",l?`\uB9C8\uC9C0\uB9C9 \uC624\uB958: ${l}`:""].filter(Boolean),live:!0}}default:return null}}function Yk(e){if(typeof e!="string")return"";for(let t of["retry_exhausted:","auto_review_exhausted:"])if(e.startsWith(t))return e.slice(t.length);return""}function Vk(e,t=null){if(!e||typeof e!="object")return null;let n="";switch(e.phase){case"gating":n="\uBA38\uC9C0 \uC870\uAC74 \uD655\uC778 \uC911";break;case"merging":n="\uBA38\uC9C0 \uC911";break;case"cleaning":n="\uB9C8\uBB34\uB9AC \uC911";break;case"waiting_metadata":case"reviewing":case"retrying":if(!t)return null;n=t.label;break;case"paused":n="\uC790\uB3D9 \uC9C4\uD589 \uC77C\uC2DC\uC815\uC9C0";break;case"needs_human":n="\uD655\uC778 \uD544\uC694";break;case"completed":return null;default:return null}let r=[n];e.head_sha&&r.push(`head ${e.head_sha}`),e.base_sha&&r.push(`base ${e.base_sha}`),(e.failure_stage||e.failure_reason)&&r.push(`${e.failure_stage||"failure"} \xB7 ${e.failure_reason||"\uC6D0\uC778 \uBBF8\uC0C1"}`);let o=Yk(e.terminal_reason);o&&r.push(`\uC6D0 \uC0AC\uC720: ${o}`);let i=e.phase==="needs_human"&&!o?Ur(e.terminal_reason):null;i&&r.push(e.failure_stage?`${e.failure_stage} \xB7 ${i}`:i);for(let s of t?t.details:[])r.push(s);return e.active_attempt_id&&r.push(`attempt ${e.active_attempt_id}`),e.evidence&&r.push(e.evidence),e.log_path&&r.push(e.log_path),{badge:n,title:r.join(`
`),alert:e.phase==="needs_human",lock_actions:!Hk.has(e.phase)}}function Qk(e){if(!e||typeof e!="object")return[];let t=e.blocking_codes;return Array.isArray(t)?t.filter(n=>typeof n=="string"&&n.length>0):[]}function Xk(e){if(!e||typeof e!="object")return[];let t=e.badge_codes;return Array.isArray(t)?t.filter(n=>typeof n=="string"&&n.length>0):[]}function Zk(e){let t=e.queue_failure?`\uBA38\uC9C0 \uC2E4\uD328 \uC6D0\uBB38: ${e.queue_failure}`:e.auto_skip?`\uC790\uB3D9 \uC81C\uC678 \uC6D0\uBB38: ${e.auto_skip}`:"",n=(i,s={})=>{let l=[s.title||"",t].filter(Boolean);return{label:i,title:l.join(`
`),live:s.live===!0,alert:s.alert===!0}};if(e.continuation_required)return n("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694",{alert:!0});if(e.queueing)return e.queueing==="cleanup"?n("\uC815\uB9AC \uC7AC\uC2DC\uB3C4 \uC694\uCCAD \uC911",{title:"\uC11C\uBC84 \uC751\uB2F5\uC744 \uAE30\uB2E4\uB9AC\uB294 \uC911\uC785\uB2C8\uB2E4",live:!0}):n("\uD050 \uB4F1\uB85D \uC911",{title:"\uBA38\uC9C0 \uD050\uC5D0 \uB123\uB294 \uC911 \u2014 \uC11C\uBC84 \uC751\uB2F5\uC744 \uAE30\uB2E4\uB9BD\uB2C8\uB2E4",live:!0});if(e.merge_step)return e.gate?.tier==="merged"?n("\uBA38\uC9C0\uB428",{title:e.merge_step.label,alert:e.merge_step.failed===!0}):n("\uBA38\uC9C0 \uC911",{title:e.merge_step.label,live:!0});if(e.conflict_badge)return n(e.conflict_badge,{live:e.conflict_live===!0});if(e.auto_resolution)return n(e.auto_resolution.label,{title:e.auto_resolution.details.join(`
`),live:e.auto_resolution.live===!0});if(e.recovery?.lock_actions)return n(e.recovery.badge,{title:e.recovery.title,live:!0});if(e.cleanup_failed)return n(e.cleanup_label?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${e.cleanup_label}`:"\uC815\uB9AC \uBA48\uCDA4",{title:e.cleanup_failed.reason||"",alert:!0});if(e.base_exception)return n("\uB2E4\uB978 base \uB300\uC0C1",{title:e.base_exception,alert:!0});let r=Qk(e.receipt_check),o=e.conflicting||e.gate?.reason==="base_behind"||r.length>0;if(e.auto_pending&&o)return n("\uD655\uC778 \uC911",{title:"\uBA38\uC9C0 \uD050\uAC00 \uC790\uB3D9\uC73C\uB85C \uCC98\uB9AC \uC911 \u2014 \uB2E4\uC74C \uAD00\uCE21\uC744 \uAE30\uB2E4\uB9BD\uB2C8\uB2E4",live:!0});if(e.conflicting)return n("\uCDA9\uB3CC \uD574\uACB0 \uD544\uC694",{alert:!0});if(e.gate?.reason==="base_behind")return n("base \uAC31\uC2E0 \uD544\uC694",{alert:!0});if(Vl.has(e.gate?.reason)){let i=e.gate.reason==="review_receipt_stale"?"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC774 \uD604\uC7AC head\uC758 \uC870\uC0C1\uC774 \uC544\uB2D9\uB2C8\uB2E4 \u2014 \uD788\uC2A4\uD1A0\uB9AC \uC7AC\uC791\uC131\xB7\uBE0C\uB79C\uCE58 \uB9AC\uC14B \uBCF5\uAD6C \uACBD\uB85C\uC785\uB2C8\uB2E4. [\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0]\uAC00 \uC774 \uBCF4\uB958\uC758 \uCD9C\uAD6C\uC785\uB2C8\uB2E4":e.gate.reason==="review_receipt_invalid"?"\uB9AC\uBDF0 \uC601\uC218\uC99D \uAE30\uB85D\uC774 \uC131\uB9BD\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4 \u2014 [\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0]\uAC00 \uC774 \uBCF4\uB958\uC758 \uCD9C\uAD6C\uC785\uB2C8\uB2E4":e.gate.reason==="review_receipt_undetermined"?"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC758 ancestry probe\uB97C \uC644\uB8CC\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 \u2014 [\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0]\uAC00 \uC774 \uBCF4\uB958\uC758 \uCD9C\uAD6C\uC785\uB2C8\uB2E4":"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 [\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0]\uAC00 \uC774 \uBCF4\uB958\uC758 \uCD9C\uAD6C\uC785\uB2C8\uB2E4";if(e.review_session?.active===!0)return n(e.review_session.origin==="auto"?"\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694 \xB7 \uC790\uB3D9 \uB9AC\uBDF0 \uC138\uC158 \uC2E4\uD589 \uC911":"\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694 \xB7 \uB9AC\uBDF0 \uC138\uC158 \uC2E4\uD589 \uC911",{title:`${i}
\uB9AC\uBDF0 \uC138\uC158\uC774 \uC2E4\uD589 \uC911\uC785\uB2C8\uB2E4 \u2014 \uB05D\uB098\uBA74 \uC601\uC218\uC99D\uC744 \uB2E4\uC2DC \uD310\uC815\uD569\uB2C8\uB2E4`,live:!0});if(e.auto_review_wait==="slot")return n("\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694 \xB7 \uB9AC\uBDF0 \uC138\uC158 \uC2AC\uB86F \uB300\uAE30",{title:`${i}
\uC2E4\uD589 \uC2AC\uB86F\uC774 \uBE44\uBA74 \uC790\uB3D9\uC73C\uB85C \uB9AC\uBDF0 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4. \uC9C0\uAE08 \uD074\uB9AD\uD558\uBA74 \uC989\uC2DC \uB744\uC6C1\uB2C8\uB2E4`,live:!0});if(e.review_session?.failure){let s=e.review_dispatch?.state==="exhausted"&&e.review_session.origin==="auto";return n(`\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694 \xB7 ${s?"\uC790\uB3D9 \uB9AC\uBDF0 1\uD68C \uC18C\uC9C4 \xB7 ":""}${qk(e.review_session.failure)}`,{title:`${i}
\uC9C1\uC804 \uB9AC\uBDF0 \uC138\uC158 \uC885\uB8CC \uC0AC\uC720: ${e.review_session.failure}`,alert:!0})}return n("\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694",{title:i,alert:!0})}return e.gate?.reason==="spec_id_missing"?n("\uC2A4\uD399 ID \uB204\uB77D",{title:"native spec_id \uBBF8\uAE30\uB85D \u2014 bd update --spec-id \uD544\uC694",alert:!0}):r.length>0?n(`\uC601\uC218\uC99D \uD655\uC778 \uD544\uC694 \xB7 ${r[0]}`,{title:`\uC131\uB9BD\uD558\uC9C0 \uC54A\uB294 \uC2E4\uD589 \uC601\uC218\uC99D \u2014 ${r.join(", ")}`,alert:!0}):e.recovery?n(e.recovery.badge,{title:e.recovery.title,alert:!0}):e.gate?.tier==="verify"&&e.gate.gate_badge==="\uAC80\uC99D \uC2E4\uD328"?n("\uAC80\uC99D \uC2E4\uD328",{title:e.gate.reason||"",alert:!0}):e.queue_failure?n(`\uBA38\uC9C0 \uC2E4\uD328 \u2014 ${k_(e.queue_failure)}`,{title:e.queue_failure,alert:!0}):e.auto_skip?n(`\uC790\uB3D9 \uC81C\uC678 \u2014 ${k_(e.auto_skip)}`,{title:e.auto_skip,alert:!0}):e.queued&&!e.queue_active?n(`\uBA38\uC9C0 \uB300\uAE30 #${e.queue_position}`):e.gate?.enabled===!0?n("\uBA38\uC9C0 \uAC00\uB2A5"):e.gate?.tier==="merged"?n("\uBA38\uC9C0\uB428"):e.gate?.tier==="closed_unmerged"?n("\uB2EB\uD798",{alert:!0}):e.activity?n("\uD655\uC778 \uC911",{live:!0}):e.gate?.tier==="undecidable"||e.gate?.reason==="mergeability_unknown"?n("\uC0C1\uD0DC \uD655\uC778 \uC2E4\uD328",{title:e.gate.reason||"",alert:!0}):e.gate?.tier==="unobserved"||e.gate?.tier==="verify"||e.gate?.gate_badge==="\uAD00\uCE21 \uB300\uAE30"?n("\uD655\uC778 \uC911"):e.gate?.gate_badge?n(e.gate.gate_badge,{title:e.gate.reason||"",alert:e.gate.enabled!==!0}):null}function Jk(e,t,n,r,o=null,i=null,s=null,l=!1,a=null,u=!0,d=null,p=null,m=null,_={},w=!1,R={},I=null,U={active:!1,failure:null,origin:null},se=!1){let W=!!a&&a.position>0,j=!!a?.continuation_action&&a.continuation_action.continuation===null,O=!!a&&a.active===!0,q=a&&a.failure||null,z=Wk(a?a.waiting:null),Y=n[e]||null,N=Y&&Y.gate?Y.gate:null,F=Y&&Y.pr?Y.pr:null,H=zk(a?a.resolution:null),G=Gk(m),ee=Vk(m,G),ye=a&&a.authority||null,qe=a&&a.review_dispatch||null,B=a?.hold?.auto_review_wait==="slot"?"slot":null,X=!!m&&typeof m=="object"&&Kk.has(m.phase),Se=W&&!O&&(!ye||X||ye.source==="automatic"&&!w),Ee=s==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":H?H.badge:s==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC911":z,C=!!N&&N.base_badge==="\uCDA9\uB3CC",re=!!N&&N.enabled===!0,ke=Vo({bead_id:e,merge_sha:R.merge_sha,cleanup_cursor:R.cleanup_cursor,merge_progress:i&&i.merge_progress?i.merge_progress:null,cleanup_failed:r,repo_operations:R.repo_operations}),ve=wi(ke),Me=i&&!ke&&(i.queueing??null)?i.queueing:null,he=!!r&&["repo_operations","post_merge_jobs","child_sweep","branch_cleanup","parent_close"].includes(r.step)&&!!N&&N.tier==="merged",Le=r&&r.step==="repo_operations"&&ke?.failed===!0&&(ke.step==="deploy"||ke.step==="verify")?ke.step:null,Xe=l&&!!r&&!!N&&N.tier==="merged",it=Se&&(re||C||N?.reason==="base_behind"||Vl.has(N?.reason)||he||Xe),P=Vl.has(N?.reason),ce=l&&C&&u===!1,ie=rr(_,e,{external:l,merge_active:O||ke?.step==="merge",merge_queued:W,conflict_active:!!s,cleanup_active:ve,merged:!!r||N?.tier==="merged"}),de=!!ie.operation,Te=!!r||m?.phase==="needs_human"||!!ie.error,_e=W&&!q&&!j&&!he&&!(ee&&ee.lock_actions),De=Zk({auto_pending:_e,continuation_required:j,queueing:Me,merge_step:ke,conflict_badge:Ee,conflict_live:H?.live===!0||s==="running",auto_resolution:G,recovery:ee,cleanup_failed:r,cleanup_label:r?Nr(r.step):null,base_exception:p,conflicting:C,gate:N,receipt_check:Y&&Y.receipt_check?Y.receipt_check:null,queue_failure:q,auto_skip:d,queued:W,queue_active:O,queue_position:a?a.position:0,review_session:U,review_dispatch:qe,auto_review_wait:B,activity:Ee?null:i&&i.activity||null}),Be=De?.live===!0&&De.title?c`<span title=${De.title}>${De.label}</span>`:De?.label||null,Qe=Xk(Y&&Y.receipt_check?Y.receipt_check:null);return{id:e,title:l?c`${t}<span class="muted"> · 세션</span>`:t,reason:r&&ke?.active!==!0?ki(r.step):"PR \uB300\uAE30",draggable:!1,done:!0,lane:"pr_wait",...I?{dependency_chips:I}:{},external:l,pr_number:F&&typeof F.number=="number"?F.number:null,pr_url:F&&typeof F.url=="string"?F.url:"",completion_badge:De?.live!==!0&&De?.title?De.label:null,completion_title:De?.title||"",...m?.phase==="needs_human"&&typeof m.log_path=="string"&&m.log_path.length>0?{log_path:m.log_path}:{},...Qe.length>0?{receipt_badge:{codes:Qe}}:{},badges:Be?[Be]:[],live_badge:De?.live===!0?Be:null,usage:o,alert:De?.alert===!0,merge_action:N?.tier==="merged"&&!he&&!Xe?!1:!W||j||Se||P,cancel_action:W&&!j,cancel_enabled:!O&&!(ee&&ee.lock_actions),cancel_title:ee&&ee.lock_actions?`${ee.badge} \u2014 \uC911\uB2E8\uD558\uB824\uBA74 \uC0C1\uB2E8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8\uC744 \uC0AC\uC6A9\uD558\uC138\uC694`:O?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"\uBA38\uC9C0 \uD050\uC5D0\uC11C \uC774 \uD56D\uBAA9\uC744 \uBE8D\uB2C8\uB2E4 (\uB2E4\uC2DC [\uBA38\uC9C0]\uB85C \uB123\uC744 \uC218 \uC788\uC2B5\uB2C8\uB2E4)",discard:ie,discard_action:ie.action,resolve_action:Te,resolve_enabled:!se,resolve_title:se?"\uC138\uC158 \uAE30\uB3D9 \uC694\uCCAD \uC911 \u2014 \uC11C\uBC84 \uC751\uB2F5\uC744 \uAE30\uB2E4\uB9BD\uB2C8\uB2E4":"\uC774 \uC2E4\uD328\uB97C \uC0AC\uB78C\uC774 \uC774\uC5B4\uBC1B\uB294 \uB300\uD654\uD615 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4 \u2014 \uAE30\uB85D\uB41C \uC138\uC158\uC774 \uC788\uC73C\uBA74 fork\uD558\uACE0, \uC5C6\uC73C\uBA74 \uC0C8 \uC138\uC158\uC5D0 \uC0AC\uC720\uB97C \uC2E3\uC2B5\uB2C8\uB2E4",merge_step:ke,discard_enabled:ie.enabled,discard_title:ie.title,merge_enabled:!ke&&!Me&&!s&&!de&&!p&&!(ee&&ee.lock_actions)&&!ce&&U.active!==!0&&(re||C||N?.reason==="base_behind"||P||he||Xe||it||X&&!O),merge_label:j?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":he||Xe?Le==="deploy"?"\uBC30\uD3EC \uC7AC\uC2DC\uB3C4 \uD6C4 \uC815\uB9AC":Le==="verify"?"\uAC80\uC99D \uC7AC\uC2DC\uB3C4 \uD6C4 \uC815\uB9AC":"\uC815\uB9AC \uC7AC\uC2DC\uB3C4":C&&!ke&&!he?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":N?.reason==="base_behind"?"base \uAC31\uC2E0 \uD6C4 \uBA38\uC9C0":P?"\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0":Se?"\uB2E4\uC2DC \uBA38\uC9C0":void 0,merge_title:de?ie.error?`\uD3D0\uAE30 \uC2E4\uD328: ${ie.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${ie.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:j?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":Me?"\uC694\uCCAD\uC744 \uBCF4\uB0B4\uB294 \uC911 \u2014 \uC11C\uBC84 \uC751\uB2F5\uC744 \uAE30\uB2E4\uB9BD\uB2C8\uB2E4":ke?`\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 ${ke.label}`:Le?`\uBA38\uC9C0 \uC644\uB8CC \u2014 ${Le==="deploy"?"\uBC30\uD3EC":"\uAC80\uC99D"} \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD574 \uC815\uB9AC\uAC00 \uBA48\uCDC4\uC2B5\uB2C8\uB2E4. \uD074\uB9AD\uD558\uBA74 \uC800\uC7A5\uC18C \uC791\uC5C5\uBD80\uD130 \uC815\uB9AC\uB97C \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4`:Xe?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uB2E4\uC2DC \uC2DC\uB3C4\uD569\uB2C8\uB2E4":ce?"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uC9C1\uC811 \uD574\uC18C\uD558\uC138\uC694":s==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC2E4\uD589 \uC911 \u2014 \uC644\uB8CC \uD6C4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":s==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC77C\uC2DC\uC815\uC9C0 \u2014 \uC7AC\uAC1C \uD6C4 \uC644\uB8CC\uB418\uBA74 \uBA38\uC9C0\uD558\uC138\uC694":he?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC2DC\uB3C4\uD569\uB2C8\uB2E4":C?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":N?.reason==="base_behind"?"base\uB97C \uC790\uB3D9 \uAC31\uC2E0\uD55C \uB4A4 \uBA38\uC9C0\uD569\uB2C8\uB2E4":U.active===!0?U.origin==="auto"?"\uC790\uB3D9 \uB9AC\uBDF0 \uC138\uC158 \uC2E4\uD589 \uC911 \u2014 \uB05D\uB098\uBA74 \uC601\uC218\uC99D\uC744 \uB2E4\uC2DC \uD310\uC815\uD569\uB2C8\uB2E4":"\uB9AC\uBDF0 \uC138\uC158 \uC2E4\uD589 \uC911 \u2014 \uB05D\uB098\uBA74 \uC601\uC218\uC99D\uC744 \uB2E4\uC2DC \uD310\uC815\uD569\uB2C8\uB2E4":N?.reason==="review_receipt_missing"?"\uB9AC\uBDF0 \uC601\uC218\uC99D \uC5C6\uC74C \u2014 \uBA38\uC9C0 \uAC8C\uC774\uD2B8 \uBCF4\uB958\uC785\uB2C8\uB2E4. \uD074\uB9AD\uD558\uBA74 \uAE30\uB85D\uB41C \uC138\uC158\uC744 \uC774\uC5B4 \uB9AC\uBDF0\uB9CC \uC218\uD589\uC2DC\uD0A4\uACE0, \uC601\uC218\uC99D\uC774 \uCD5C\uC885 head\uC5D0 \uC720\uD6A8\uD574\uC9C0\uBA74 \uD050\uAC00 \uBA38\uC9C0\uD569\uB2C8\uB2E4":N?.reason==="review_receipt_stale"?"head \uC7AC\uC791\uC131\uB428(\uC601\uC218\uC99D\uC774 \uD604\uC7AC head\uC758 \uC870\uC0C1\uC774 \uC544\uB2D8) \u2014 \uBA38\uC9C0 \uAC8C\uC774\uD2B8 \uBCF4\uB958\uC785\uB2C8\uB2E4. \uD074\uB9AD\uD558\uBA74 \uAE30\uB85D\uB41C \uC138\uC158\uC744 \uC774\uC5B4 \uCD5C\uC885 head\uB97C \uB2E4\uC2DC \uB9AC\uBDF0\uC2DC\uD0A4\uACE0, \uC601\uC218\uC99D\uC774 \uC720\uD6A8\uD574\uC9C0\uBA74 \uD050\uAC00 \uBA38\uC9C0\uD569\uB2C8\uB2E4":N?.reason==="review_receipt_invalid"?"\uB9AC\uBDF0 \uC601\uC218\uC99D \uAE30\uB85D\uC774 \uC131\uB9BD\uD558\uC9C0 \uC54A\uC74C \u2014 \uBA38\uC9C0 \uAC8C\uC774\uD2B8 \uBCF4\uB958\uC785\uB2C8\uB2E4. \uD074\uB9AD\uD558\uBA74 \uAE30\uB85D\uB41C \uC138\uC158\uC744 \uC774\uC5B4 \uCD5C\uC885 head\uB97C \uB2E4\uC2DC \uB9AC\uBDF0\uC2DC\uD0A4\uACE0, \uC601\uC218\uC99D\uC774 \uC720\uD6A8\uD574\uC9C0\uBA74 \uD050\uAC00 \uBA38\uC9C0\uD569\uB2C8\uB2E4":N?.reason==="review_receipt_undetermined"?"\uB9AC\uBDF0 \uC601\uC218\uC99D ancestry probe \uBBF8\uC644\uB8CC \u2014 \uBA38\uC9C0 \uAC8C\uC774\uD2B8 \uBCF4\uB958\uC785\uB2C8\uB2E4. \uD074\uB9AD\uD558\uBA74 \uAE30\uB85D\uB41C \uC138\uC158\uC744 \uC774\uC5B4 \uCD5C\uC885 head\uB97C \uB2E4\uC2DC \uB9AC\uBDF0\uC2DC\uD0A4\uACE0, \uC0C8 \uC601\uC218\uC99D\uC774 \uCD5C\uC885 head\uC5D0 \uC720\uD6A8\uD574\uC9C0\uBA74 \uD050\uAC00 \uBA38\uC9C0\uD569\uB2C8\uB2E4":N?.reason==="spec_id_missing"?"native spec_id \uBBF8\uAE30\uB85D \u2014 bd update --spec-id\uB85C \uAE30\uB85D\uD55C \uB4A4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":re?`\uBA38\uC9C0 (${N.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4 (\uCC28\uB840\uAC00 \uB418\uBA74 \uB2E4\uC2DC \uD655\uC778)`:N&&N.tier==="merged"?"\uBA38\uC9C0\uB428 \u2014 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC \uC9C4\uD589 \uC911":`\uBA38\uC9C0 \uBD88\uAC00: ${N&&N.reason||"\uAD00\uCE21 \uB300\uAE30"}`}}function Ql(e,t={}){let{transport:n,issueStores:r,queueStore:o,sessionLogStore:i,gotoIssue:s,getWorkspacePath:l,switchWorkspace:a,openDoc:u,doneRange:d,onDoneRangeChange:p}=t,m=r?eo(r):null,_=Ik(),w=null,R=null,I=null,U=null,se=ao(()=>x()),W=new Map,j=new Map,O=Jf(),q=Hl(O)===null,z=d?zn(d):Dk();function Y(){let b=Yr.find(h=>h.value===z);return b?b.label:"\uC624\uB298"}let N=Yi("beads-ui.worker.lane-collapsed"),F=!1,H="";function G(){return H.trim().length>0}function ee(b){return G()?b.filter(h=>h.search_match===!0).length:void 0}let ye=new Set,qe=new Set,B=new Set;function X(b,h){return!h?.error||!b?{}:{resolve_action:!0,resolve_enabled:!B.has(b),resolve_title:B.has(b)?"\uC138\uC158 \uAE30\uB3D9 \uC694\uCCAD \uC911 \u2014 \uC11C\uBC84 \uC751\uB2F5\uC744 \uAE30\uB2E4\uB9BD\uB2C8\uB2E4":"\uC2E4\uD328\uD55C \uD3D0\uAE30\uB97C \uC0AC\uB78C\uC774 \uC774\uC5B4\uBC1B\uB294 \uB300\uD654\uD615 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4 \u2014 \uAE30\uB85D\uB41C \uC138\uC158\uC774 \uC788\uC73C\uBA74 fork\uD558\uACE0, \uC5C6\uC73C\uBA74 \uC0C8 \uC138\uC158\uC5D0 \uC0AC\uC720\uB97C \uC2E3\uC2B5\uB2C8\uB2E4"}}let Se=new Set,Ee=new Set,C=new Set,re=null,ke=[],ve=b_({queueStore:o,issueStores:r,transport:n,getWorkspacePath:l,onInvalidate:()=>x()});function Me(){ve.refreshSessionDefaults()}let he=document.createElement("div");he.className="worker-console";let Le=document.createElement("div");Le.className="worker-top";let Xe=document.createElement("div");Xe.className="worker-drawer-overlay",Xe.hidden=!0;let it=document.createElement("div");it.className="worker-drawer-overlay__backdrop";let P=document.createElement("div");P.className="worker-drawer-host";let ce=document.createElement("div");ce.className="worker-drawer-host",ce.hidden=!0,Xe.append(it,P,ce);let ie=document.createElement("div");ie.className="worker-lanes-host",he.append(Le,Xe,ie),e.appendChild(he);let de=br(null,null),Te=[],_e=Qi({transport:n,console_el:he,getLanes:()=>de,getWorkspaces:()=>Te,getCrossLanes:()=>null,reproject:()=>({lanes:Bt(),raw_lanes:null}),onCorrection:()=>{},showToast:be,requestRender:()=>x(),adoptQueue:(b,h)=>{o&&o.set(h)},onDragBegin:()=>{w=null}}),De=null,Be=wo(P,{transport:n,sessionLogStore:i,onClose:()=>{De=null,Xe.hidden=!0,x()}}),Qe=m_(ce,{onClose:()=>{ce.hidden=!0,Xe.hidden=!0,x()}}),Fe=a_({getWorkspacePath:l||(()=>"")}),te=l&&l()||"",V=c_({queueStore:o,transport:n,onChanged:()=>x(),onOpenScript:(b,h)=>{Fe.open(b,h)}});function $e(){return o&&o.get()||{revision:0,auto_advance:!1,auto_merge:!1,slots:ra,queue:[],serial_lanes:[],serial_lane_count:0,pr_wait:[],done:[]}}function _t(b){for(let h of Object.values(It($e().provider_hold)))for(let T of Array.isArray(h?.targets)?h.targets:[])if(Array.isArray(T?.attempt_ids)&&T.attempt_ids.includes(b))return T;return null}function at(b){if(b?.status!=="ok")return{eligible:!1,reason:`\uACC4\uC815 \uC0C1\uD0DC ${String(b?.status||"\uBBF8\uC0C1")}`};let h=Array.isArray(b.windows)?b.windows:[],T=h.find(le=>le?.key==="5h"),oe=h.find(le=>le?.key==="7d");if(!T||typeof T.pct!="number")return{eligible:!1,reason:"5\uC2DC\uAC04 \uC0AC\uC6A9\uB7C9 \uBBF8\uAD00\uCE21"};if(T.pct>80)return{eligible:!1,reason:"5\uC2DC\uAC04 \uC0AC\uC6A9\uB7C9 80% \uCD08\uACFC"};if(oe){if(typeof oe.pct!="number")return{eligible:!1,reason:"7\uC77C \uC0AC\uC6A9\uB7C9 \uBBF8\uAD00\uCE21"};if(oe.pct>90)return{eligible:!1,reason:"7\uC77C \uC0AC\uC6A9\uB7C9 90% \uCD08\uACFC"}}return{eligible:!0,reason:""}}function Ke(b){let h=It($e().attempts)[b];if(!h)return;let T=It($e().runner_catalog),oe=It(T.runners),le=typeof h.runner=="string"&&oe[h.runner]?h.runner:Object.keys(oe)[0]||"",Ie=It(oe[le]),He=It(Ie.models),St=typeof h.model=="string"&&He[h.model]?h.model:typeof Ie.default_model=="string"?Ie.default_model:Object.keys(He)[0]||"",Vt=_t(b),ot=typeof h.claude_account=="string"?h.claude_account:typeof Vt?.account=="string"?Vt.account:"";U={attempt_id:b,original_runner:le,runner:le,model:St,account:ot,fresh_current:!1},x()}function $(){U=null,x()}function J(){let b=U;if(!b||!b.runner||!b.model||b.runner==="claude"&&!b.account)return;let h={runner:b.runner,model:b.model};b.runner==="claude"&&b.account&&(h.claude_account=b.account);let T=b.fresh_current||b.runner!==b.original_runner;U=null,x(),At(b.attempt_id,"session",{exec_override:h,...T?{continuation:"fresh_current",decision_token:{}}:{}})}function Re(){let b=U;if(!b)return"";let h=It(It($e().runner_catalog).runners),T=Array.isArray(It($e().account_catalog).claude)?It($e().account_catalog).claude:[],oe=b.runner!==b.original_runner;return c`<dialog
      class="op-dialog provider-resume-dialog"
      aria-label="다른 방법으로 이어하기"
    >
      <h2>다른 방법으로 이어하기</h2>
      <div class="provider-resume-dialog__fields">
        <label>
          러너
          <select class="provider-resume-dialog__runner">
            ${Object.keys(h).map(le=>c`<option
                  value=${le}
                  ?selected=${le===b.runner}
                >
                  ${le}
                </option>`)}
          </select>
        </label>
        <label>
          모델
          <select class="provider-resume-dialog__model">
            ${Object.entries(h).map(([le,Ie])=>c`<optgroup label=${le}>
                  ${Object.keys(It(Ie?.models)).map(He=>c`<option
                        value=${JSON.stringify([le,He])}
                        ?selected=${le===b.runner&&He===b.model}
                      >
                        ${He}
                      </option>`)}
                </optgroup>`)}
          </select>
        </label>
        ${b.runner==="claude"?c`<label>
              계정
              <select class="provider-resume-dialog__account">
                ${b.account?"":c`<option value="" selected>계정 선택</option>`}
                ${b.account&&!T.some(le=>le?.email===b.account)?c`<option value=${b.account} selected>
                      ${b.account} (목록에 없음)
                    </option>`:""}
                ${T.map(le=>{let Ie=at(le),He=le.alias||le.email;return c`<option
                    value=${le.email}
                    ?selected=${le.email===b.account}
                    ?disabled=${!Ie.eligible}
                    title=${Ie.reason}
                  >
                    ${He}${Ie.reason?` \u2014 ${Ie.reason}`:""}
                  </option>`})}
              </select>
            </label>`:""}
        <label class="provider-resume-dialog__fresh">
          <input
            type="checkbox"
            class="provider-resume-dialog__fresh-input"
            .checked=${b.fresh_current}
          />
          새 세션으로
        </label>
      </div>
      ${oe||b.fresh_current?c`<p class="provider-resume-dialog__notice">
            이전 세션 맥락을 요약 인계합니다
          </p>`:""}
      <div class="op-dialog__actions provider-resume-dialog__actions">
        <button type="button" class="op-btn provider-resume-dialog__cancel">
          취소
        </button>
        <button
          type="button"
          class="op-btn op-btn--primary provider-resume-dialog__confirm"
          ?disabled=${b.runner==="claude"&&!b.account}
          title=${b.runner==="claude"&&!b.account?"\uACC4\uC815\uC744 \uBA3C\uC800 \uACE0\uB974\uC138\uC694":""}
        >
          이어하기
        </button>
      </div>
    </dialog>`}function je(b){if(!w||!b.some(T=>T.id===w))return null;let h=Wo($e());return h?{bead_id:w,lanes:h}:null}function Je(){return l&&l()||""}async function et(b,h){await _e.sendOp({type:"worker-queue-place",payload:{bead_id:b,...h==="parallel"?{}:{lane:h}},root_dir:Je()},b)}function Ue(){let b=$e();return typeof b.revision=="number"?b.revision:0}function ct(b){b&&b.queue&&o&&o.set(b.queue)}async function Gt(b){if(!n||!b)return;let h=await n("worker-attempt-pause",{attempt_id:b});h&&h.paused===!1&&h.reason&&be(`\uC77C\uC2DC\uC815\uC9C0 \uAC70\uBD80: ${h.reason}`,"error",2400)}async function At(b,h="session",T={}){if(!n||!b)return;let oe=n,le=$e().attempts?.[b]||null;await ro({context:{bead_id:le?.bead_id||"",kind:h,tuple:le?Sn(le):""},transport:Ie=>oe("worker-attempt-resume",{attempt_id:b,expected_revision:Ue(),...T,...Ie}),adopt:ct})}async function kt(b,h,T=!0){if(!n)return null;let oe=n,le=await oe(b,{...h,expected_revision:Ue()});return ct(le),le&&le.conflict&&T&&(le=await oe(b,{...h,expected_revision:Ue()}),ct(le)),le}async function wt(b){if(!n||!b)return;let h=$e().merge_queue?.find(oe=>oe.bead_id===b)?.continuation_action;if(h?.mismatch&&h.continuation===null){await Ge(b,h.mismatch);return}ye.add(b),x();let T;try{T=await kt("worker-merge-queue-add",{bead_id:b})}catch{be("\uBA38\uC9C0 \uD074\uB9AD\uC774 \uC11C\uBC84\uC5D0 \uC804\uB2EC\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4(\uC5F0\uACB0 \uBB38\uC81C) \u2014 \uC5F0\uACB0 \uBCF5\uAD6C \uD6C4 \uB2E4\uC2DC \uB20C\uB7EC\uC8FC\uC138\uC694","error",3200);return}finally{ye.delete(b),x()}if(!(!T||T.applied)){if(T.conflict){be("\uD050\uAC00 \uBC14\uB00C\uC5B4 \uBA38\uC9C0 \uD074\uB9AD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uB20C\uB7EC\uC8FC\uC138\uC694","error",2400);return}be(Nk(T.reason),"error",2400)}}async function jt(b){if(!(!n||!b||qe.has(b))){qe.add(b),x();try{let h=await n("worker-cleanup-retry",{bead_id:b,expected_revision:Ue()});ct(h),h&&!h.retried&&!h.conflict&&h.reason&&be(`\uC815\uB9AC \uC7AC\uC2DC\uB3C4 \uAC70\uBD80: ${h.reason}`,"error",2400)}finally{qe.delete(b),x()}}}async function Lt(b){if(!(!n||!b||B.has(b))){B.add(b),x();try{let h=await n("worker-resolve-in-session",{bead_id:b,expected_revision:Ue()});ct(h),be(Bk(h),Uk(h),4e3)}finally{B.delete(b),x()}}}async function ae(b,h){let T=$e().hold;if(!n||!T||typeof T.since!="number")return;let oe=await n(b,{since:T.since});ct(oe),oe&&oe.ok===!1&&be(`${h}: ${oe.reason==="hold_changed"?"\uD050 \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uD655\uC778\uD558\uC138\uC694":oe.reason||""}`,"error",2800)}async function me(b,h){if(!n||!b||!h)return;let T=await n("worker-parked-retry",{bead_id:b,attempt_id:h});ct(T),T&&T.ok===!1&&be(`\uC7AC\uC2DC\uB3C4 \uAC70\uBD80: ${T.reason==="not_latest"?"\uC774 bead\uC5D0 \uB354 \uC0C8\uB85C\uC6B4 \uC2DC\uB3C4\uAC00 \uC788\uC2B5\uB2C8\uB2E4":T.reason||""}`,"error",2800)}async function Ge(b,h){let T=await _r({continuation_mismatch:h},(le,Ie)=>kt("worker-merge-queue-add",{bead_id:b,continuation:le,decision_token:Ie},!1)),oe=T?.queue?.merge_queue?.find(le=>le.bead_id===b)?.continuation_action;if(T?.applied!==!0&&oe?.continuation===null&&oe.mismatch){await Ge(b,oe.mismatch);return}T&&T.applied===!1&&!T.conflict&&be("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD\uC774 \uCD5C\uC2E0 \uC0C1\uD0DC\uC640 \uC77C\uCE58\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4","error",2800)}async function lt(b){if(!n)return;let h=await kt("worker-merge-auto-toggle",{on:b});!h||h.conflict||be(b?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0 \u2014 \uB300\uAE30 \uD56D\uBAA9\uC744 \uBE44\uC6E0\uC2B5\uB2C8\uB2E4",b?"success":"info",2400)}async function Oe(b){if(!n||!b)return;let h=await kt("worker-merge-queue-remove",{bead_id:b});h&&!h.conflict&&!h.applied&&h.reason==="merge_active"&&be("\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error",2400)}async function E(){await kt("worker-merge-queue-remove",{all:!0})}async function L(b,h=null,T="unmerged",oe=null){if(!n||!b)return;let le=Ho(b,T);if(!(!!oe||typeof globalThis.confirm!="function"||globalThis.confirm(le)))return;let He=await n("worker-discard",{bead_id:b,...h?{attempt_id:h}:{},...oe?{operation_id:oe}:{},expected_revision:Ue()});if(ct(He),He&&He.conflict&&(He=await n("worker-discard",{bead_id:b,...h?{attempt_id:h}:{},...oe?{operation_id:oe}:{},expected_revision:Ue()}),ct(He)),He&&He.discarded===!0){be(ci(He),"success",5e3);return}if(He&&He.reason){be(`\uD3D0\uAE30 \uC2E4\uD328: ${He.reason}`,"error",2800);return}if(He&&He.accepted&&He.pending==="merged_revert"){be("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success",2400);return}if(He&&He.accepted&&!He.discarded){be(`\uD3D0\uAE30 \uC9C4\uD589: ${He.phase||"\uBC31\uC5C5 \uC911"}`,"success",2400);return}He&&!He.conflict&&be("\uD3D0\uAE30 \uAC70\uBD80: unknown","error",2800)}async function Z(b,h,T){if(!n||!b||!h||typeof globalThis.confirm=="function"&&!globalThis.confirm(Ko(b,T)))return;let oe=await n("worker-discard-abandon",{bead_id:b,operation_id:h,expected_revision:Ue()});if(ct(oe),oe&&oe.conflict&&(oe=await n("worker-discard-abandon",{bead_id:b,operation_id:h,expected_revision:Ue()}),ct(oe)),oe&&oe.abandoned===!0){be(li(T),"success",5e3);return}if(oe&&oe.reason){be(`\uD3D0\uAE30 \uD3EC\uAE30 \uAC70\uBD80: ${oe.reason}`,"error",2800);return}oe&&!oe.conflict&&be("\uD3D0\uAE30 \uD3EC\uAE30 \uAC70\uBD80: unknown","error",2800)}async function pe(b,h,T){if(!(!n||!h||!T||Ee.has(h))){Ee.add(h),x();try{let oe=await n(b,{bead_id:h,action_id:T,expected_revision:Ue()});ct(oe),oe?.conflict?be("\uC774\uC804 \uC791\uC5C5 \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694.","error",2800):!oe?.ok&&oe?.reason&&be(`\uC774\uC804 \uC791\uC5C5 \uCC98\uB9AC \uAC70\uBD80: ${String(oe.reason)}`,"error",2800)}finally{Ee.delete(h),x()}}}async function fe(b,h){if(!n||!h||Se.has(h))return;Se.add(h),x();let T;try{let oe=async(le={})=>await n(b,{bead_id:h,expected_revision:Ue(),...le});T=await oe(),ct(T),T&&T.conflict&&(T=await n(b,{bead_id:h,expected_revision:Ue()}),ct(T)),b==="worker-revise-fix"&&(T=await _r(T,(le,Ie)=>oe({continuation:le,decision_token:Ie}),{onResult:ct,refresh:()=>oe()}))}finally{Se.delete(h),x()}if(!(!T||T.conflict)){if(T.ok){be(b==="worker-revise-fix"?"\uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4 \u2014 \uC218\uB9AC \uD6C4 \uAD6C\uD604\uC774 \uC7AC\uB514\uC2A4\uD328\uCE58\uB429\uB2C8\uB2E4":"\uB378\uD0C0 \uC2B9\uC778 \uC644\uB8CC \u2014 \uC601\uC218\uC99D \uAC31\uC2E0 + \uD30C\uD0B9 \uD574\uC81C","success",2800);return}be(`\uCC98\uBD84 \uAC70\uBD80: ${T.reason||""}`,"error",3e3)}}async function Pe(b){if(!n)return;let h=await n("worker-automation-toggle",{on:b,expected_revision:Ue()});ct(h),h&&h.conflict&&await n("worker-automation-toggle",{on:b,expected_revision:Ue()}).then(ct)}async function ht(b){if(!n||!b)return;let h=await n("worker-repo-operation-dismiss",{operation_id:b});ct(h),h&&h.ok===!1&&be(`\uAE30\uB85D \uB2EB\uAE30 \uAC70\uBD80: ${h.reason||""}`,"error",3e3)}async function $t(b){if(!n||!Number.isFinite(b))return;let h=Math.max(ra,Math.floor(b)),T=await n("worker-queue-set-slots",{slots:h,expected_revision:Ue()});ct(T),T&&T.conflict&&await n("worker-queue-set-slots",{slots:h,expected_revision:Ue()}).then(ct)}async function gt(b){if(!n||!Number.isInteger(b)||b<1||b>y_)return;let h=$e(),T=(Array.isArray(h.serial_lanes)?h.serial_lanes:[]).slice(b).reduce((Ie,He)=>Ie+(Array.isArray(He?.entries)?He.entries.length:0),0),oe=()=>({count:b,expected_revision:Ue()}),le=await n("worker-queue-set-serial-lane-count",oe());ct(le),le&&le.conflict&&(le=await n("worker-queue-set-serial-lane-count",oe()),ct(le)),le&&le.applied&&T>0&&be(`\uC9C1\uB82C \uB808\uC778 \uCD95\uC18C \u2014 ${T}\uAC1C \uD56D\uBAA9\uC774 \uBCD1\uB82C \uB300\uAE30\uB85C \uC774\uB3D9`)}function Bt(){let b=Or(z),h=ve.read({candidate_sort:O,done_since:b});return Te=h.workspaces,de=br(h.workspaces,h.workspaces_state,{done_since:b,candidate_filter:_,candidate_hidden_counts:"per_control",candidate_sort:"as_given",groups:"all",search:H}),de}function bt(b){return b.queue_groups[0]||Ok}function Ct(b){let h=b.dependency_chips||null,T={...h&&h.released?{released:h.released}:{},...h&&h.dependents?{dependents:h.dependents}:{}},oe=W.get(b.id),le=j.get(b.id)||null,Ie=oe&&oe.overlaps.length>0?oe.overlaps:null,He=!!oe&&oe.scope_missing;return!le&&!Ie&&!He&&Object.keys(T).length===0?null:{...T,...le?{predecessors:le}:{},...Ie?{overlaps:Ie}:{},...He?{scope_missing:!0}:{}}}function Rt(b){return{...b,workspace_name:"",done_layout:void 0,dependency_chips:Ct(b)||void 0,chip_popover:en(b)}}function en(b){return gi(b,h=>se.isOpen({bead_id:b.id,chip_key:h}))}function Yt(){let b=$e(),h=new Map;for(let T of Object.values(It(b.lane_states))){let oe=Array.isArray(T?.corrections)?T.corrections:[];for(let le of oe)le&&typeof le.bead_id=="string"&&typeof le.after=="string"&&h.set(le.bead_id,le.after)}return{admission:It(b.admission),correction_after:h}}function Dt(b,h){let T=Rt(b),oe=id(h.admission[b.id]||null,!!b.discard||Ee.has(b.id)),le=h.correction_after.get(b.id);return{...T,draggable:T.draggable===!0&&!oe,stale_work:oe,reason:oe?"":T.reason,badges:le?[`\u{1F517} ${le} \uB4A4 (blocks \uC790\uB3D9)`,...T.badges||[]]:T.badges,revise_enabled:T.revise_enabled===!0&&!Se.has(b.id)}}function xt(b){let h=Yt();return bt(b).sublanes.parallel.map(T=>Dt(T,h))}function Ht(b){let h=Yt();return bt(b).sublanes.serial.map(T=>{let oe=T.occupants.map(le=>({id:le.id,title:le.title,draggable:!1,lane:T.id,ghost:!0,badges:[le.badge],...typeof le.search_match=="boolean"?{search_match:le.search_match}:{}}));return{id:T.id,index:T.index+1,raw_length:T.raw_length,ghosts:oe,items:T.items.map(le=>Dt(le,h)),occupied:T.occupied_by.length>0,badge:T.occupants.length>0?T.occupants[0].badge:"\uB300\uAE30",cycle:T.cycle===!0}})}function nn(b){return b.runnable.map(h=>Rt(h))}function Ut(b){return b.done.map(h=>Rt(h))}function an(b){let h=b.running.filter(T=>T.non_occupying!==!0).map(T=>({...T,bead_id:T.id,attempt_id:T.attempt_id||"",paused:T.run_state==="paused",failed:T.run_state==="failed",parked:T.run_state==="parked",retry_wait:T.run_state==="retry_wait",waiting:T.run_state==="waiting",wait:T.wait||null,provider_hold:T.run_state==="provider_hold",hold:T.hold?{...T.hold,open:I===T.attempt_id}:null,status_label:T.run_state==="failed"?T.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328":T.run_state==="parked"?"\uC138\uC158 \uB300\uAE30":T.run_state==="retry_wait"?"\uC7AC\uC2DC\uB3C4 \uB300\uAE30":T.run_state==="waiting"?"\uC120\uD589 \uB300\uAE30":T.run_state==="provider_hold"?"\uACF5\uAE09\uC790 \uBCF4\uB958":void 0,can_pause:T.can_pause!==!1,workspace_name:"",dependency_chips:Ct(T)||void 0,chip_popover:en(T),rollup_expanded:C.has(T.id),failure:T.failure?{...T.failure,open:R===T.attempt_id}:null,...X(T.id,T.discard)}));return[...h.filter(T=>T.failed===!0),...h.filter(T=>T.failed!==!0&&T.parked===!0),...h.filter(T=>T.failed!==!0&&T.parked!==!0)]}function Zt(b){return xe(b).map(h=>({...h,chip_popover:en(h)}))}function xe(b){if(re&&re.model===b)return re.rows;let h=$e(),T=bt(b),oe=It(h.attempts),le=Object.values(oe).filter(nr),Ie=new Map;for(let Ye of le)Ie.set(Ye.attempt_id,Ye);let He=new Map;for(let Ye of le)He.set(Ye.bead_id,Ye);let St=new Map;for(let Ye of[...b.pr_wait,...b.running,...b.queue,...b.runnable,...b.done])St.has(Ye.id)||St.set(Ye.id,Ye);let Vt=Ye=>{let Wt=null;for(let xn of le)!xn||xn.bead_id!==Ye||ol(xn,Ie)||(Wt===null||(typeof xn.started_at=="number"?xn.started_at:0)>=(typeof Wt.started_at=="number"?Wt.started_at:0))&&(Wt=xn);return Wt&&typeof Wt.target_base=="string"?Wt.target_base:null},ot=new Map;for(let Ye of b.running)Ye.run_state==="failed"||Ye.conflict_resolution!==!0||(Ye.run_state!=="paused"?ot.set(Ye.id,"running"):ot.has(Ye.id)||ot.set(Ye.id,"paused"));let rn=It(h.auto_merge_skips),ln=new Set(T.merge.auto_excluded),Un=It(h.pr_observations),pn=It(h.pr_activity),un=It(h.cleanup_failed),Rn=It(h.discard_operations),Vn=It(h.bead_workflow),on=It(h.bead_titles),Qn=h.merge_queue_state||{active:null,failures:{}},cr=T.merge.state.waiting,On=new Map;for(let Ye of Array.isArray(h.merge_queue)?h.merge_queue:[])Ye&&typeof Ye=="object"&&Ye.bead_id&&On.set(Ye.bead_id,Ye);let Wn=(Array.isArray(h.pr_wait)?h.pr_wait:[]).map(Ye=>{let Wt=St.get(Ye.bead_id);return{...Jk(Ye.bead_id,Wt?.title||on[Ye.bead_id]||Ye.bead_id,Un,un[Ye.bead_id]||null,tr(oe,Ye.bead_id),pn[Ye.bead_id]||(ye.has(Ye.bead_id)?{activity:null,merge_progress:null,queueing:"merge"}:qe.has(Ye.bead_id)?{activity:null,merge_progress:null,queueing:"cleanup"}:null),ot.get(Ye.bead_id)||null,Ye.external===!0,{position:T.merge.positions.get(Ye.bead_id)||0,active:Qn.active===Ye.bead_id,failure:It(Qn.failures)[Ye.bead_id]||null,waiting:cr&&cr.bead_id===Ye.bead_id?cr.reason:null,resolution:T.merge.resolutions.get(Ye.bead_id),continuation_action:T.merge.continuations.get(Ye.bead_id),authority:T.merge.authorities.get(Ye.bead_id)||null,hold:On.get(Ye.bead_id)?.hold||null,review_dispatch:On.get(Ye.bead_id)?.review_dispatch||null},Ye.wt_present!==!1,h.auto_merge===!0&&ln.has(Ye.bead_id)?rn[Ye.bead_id]?.reason||"":null,rl(T.declared_base,Vt(Ye.bead_id)),It(h.completion_status)[Ye.bead_id]||null,Rn,h.auto_merge===!0,{merge_sha:Ye.merge_sha,cleanup_cursor:Ye.cleanup_cursor,repo_operations:T.repo_operations},Wt?Ct(Wt):null,td(oe,Ye.bead_id),B.has(Ye.bead_id)),...Wt?.search_match===void 0?{}:{search_match:Wt.search_match},workflow:Vn[Ye.bead_id]||null,priority:Wt?.priority,from_id:Wt?.from_id,...Wt?.created_at===void 0?{}:{created_at:Wt.created_at},...Wt?.updated_at===void 0?{}:{updated_at:Wt.updated_at}}});return re={model:b,rows:Wn},Wn}function A(b){let h=bt(b),T=[];for(let Ie of b.running)Ie.non_occupying!==!0&&T.push({id:Ie.id,title:Ie.title,location_label:"\uC2E4\uD589\uC911",kind:"running",lane_id:Ie.serial_lane_id??null});for(let Ie of b.pr_wait)T.push({id:Ie.id,title:Ie.title,location_label:"PR \uB300\uAE30",kind:"pr_wait",lane_id:null});for(let Ie of h.sublanes.serial)Ie.items.forEach((He,St)=>{T.push({id:He.id,title:He.title,location_label:`${Ie.id} #${St+1}`,kind:"serial",lane_id:Ie.id})});h.sublanes.parallel.forEach((Ie,He)=>{T.push({id:Ie.id,title:Ie.title,location_label:`#${He+1}`,kind:"parallel",lane_id:null})});for(let Ie of b.runnable)T.push({id:Ie.id,title:Ie.title,location_label:"\uD6C4\uBCF4",kind:"candidate",lane_id:null,queue_placeable:Ie.queue_placeable===!0});let oe=$e();W=r_(oe.bead_scope,T);let le=new Map;for(let Ie of[...b.running,...b.runnable])Array.isArray(Ie.blocked_by)&&Ie.blocked_by.length>0&&le.set(Ie.id,Ie.blocked_by);for(let[Ie,He]of Object.entries(It(oe.bead_blocked_by)))Array.isArray(He)&&le.set(Ie,He.filter(St=>typeof St=="string"&&St.length>0));j=hd(le,T,It(oe.blocker_workspaces))}function ge(b){let h=b.hold&&typeof b.hold=="object"?b.hold:null;if(!h||h.kind!=="env"&&h.kind!=="systemic")return"";let T=kr(h.cause)||String(h.cause||""),oe=Array.isArray(b.lineages)?b.lineages:[];if(h.kind==="env"){let Ie=oe.map(St=>St&&St.next_at).filter(St=>typeof St=="number").sort((St,Vt)=>St-Vt)[0],He=typeof Ie=="number"?` \xB7 \uB2E4\uC74C ${new Date(Ie).toLocaleTimeString("ko-KR",{hour:"2-digit",minute:"2-digit"})}`:"";return c`<div class="worker-hold worker-hold--env" role="status">
        <span class="worker-hold__text"
          >환경 보류: ${T} — 재시도 대기${He}</span
        >
        <button
          type="button"
          class="worker-hold__retry"
          title="예약된 재시도를 지금 실행합니다"
        >
          지금 재시도
        </button>
      </div>`}let le=(Array.isArray(h.bead_ids)?h.bead_ids:[]).filter(Ie=>typeof Ie=="string"&&Ie.length>0);return c`<div class="worker-hold worker-hold--systemic" role="alert">
      <span class="worker-hold__text"
        >${T}${le.length>0?` \u2014 bead ${le.join(", ")}`:""}</span
      >
      <button
        type="button"
        class="worker-hold__resume"
        title="정지를 풀고 멈춰 있던 bead를 다시 디스패치합니다"
      >
        재개
      </button>
    </div>`}function Ne(b){let h=[];for(let[ot,rn]of Object.entries(It(b.provider_hold)))for(let ln of Array.isArray(rn?.targets)?rn.targets:[])h.push({runner:ot,target:ln});if(h.length===0)return"";let T=h.find(ot=>ot.target?.kind==="outage");if(T){let ot=typeof T.target.next_probe_at=="number"?new Date(T.target.next_probe_at).toLocaleTimeString("ko-KR",{hour:"2-digit",minute:"2-digit"}):"";return c`<div class="worker-provider-gate" role="status">
        ⚠️ ${T.runner} 공급자 장애 — 신규 디스패치
        보류${ot?`, \uB2E4\uC74C \uD504\uB85C\uBE0C ${ot}`:""}
      </div>`}let oe=Array.isArray(It(b.account_catalog).claude)?It(b.account_catalog).claude:[],le=ot=>oe.find(ln=>ln?.email===ot)?.alias||ot,Ie=h.find(ot=>typeof ot.target?.account!="string"),He=ot=>typeof ot?.resets_at=="number"?new Date(ot.resets_at).toLocaleTimeString("ko-KR",{hour:"2-digit",minute:"2-digit"}):"";if(Ie){let ot=He(Ie.target);return c`<div class="worker-provider-gate" role="status">
        ⏳ ${Ie.runner} 사용 한도 — 계정 미확인이라 러너 전체 디스패치
        보류${ot?`, \uB9AC\uC14B ${ot}`:""}
      </div>`}let St=[...new Set(h.map(ot=>le(String(ot.target.account))))],Vt=He(h[0].target);return c`<div class="worker-provider-gate" role="status">
      ⏳ ${St.join(", ")} 사용 한도 —
      ${St.length>1?"\uADF8 \uACC4\uC815\uB4E4":"\uADF8 \uACC4\uC815"} 디스패치
      보류${Vt?`, \uB9AC\uC14B ${Vt}`:""}
    </div>`}function y(b){let h=$e(),T=bt(b),oe=T.sublanes.parallel,le=oe.length>0?oe[0].id:"\u2014",Ie=c`<button
      type="button"
      class="worker-play${h.auto_advance?" is-active":""}"
    >
      ${h.auto_advance?"\u23F8 \uC790\uB3D9\uD654 \uBA48\uCDA4":"\u25B6 \uC790\uB3D9\uD654"}
    </button>`,He=Q(b),St=T.over_cap?c`<span
          class="worker-overcap"
          title="수동 재개(▶)는 슬롯 cap을 초과할 수 있습니다 — 자동 진행은 cap을 지킵니다"
          >cap 초과</span
        >`:"",Vt=h.auto_advance?0:(Array.isArray(h.queue)?h.queue:[]).filter(on=>on&&typeof on.armed_by_lane=="string"&&on.armed_by_lane.length>0).length,ot=Vt>0?c`<span
            class="worker-kpi__chip worker-kpi__chip--armed"
            title="모니터 연결 레인이 발차한 대기 행입니다 — 이 레포의 자동 진행은 꺼진 채입니다"
            >⏸ 자동 진행 꺼짐 · 연결 레인 ${Vt}건 진행 중</span
          >`:"",rn=c`<span class="worker-kpi__chip worker-kpi__chip--running"
        >실행 <b>${T.live_count}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--pr"
        >PR 대기 <b>${Zt(b).length}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--done"
        >${Y()} 완료 <b>${b.done.length}</b></span
      >`,ln=c`<span
      class="worker-kpi__chip worker-kpi__chip--base"
      title=${T.declared_base?"\uC774 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uC5B8\uD55C target base (docs/agents/repo-ops.toml). \uB514\uC2A4\uD328\uCE58 \uC2DC\uC810\uC758 \uAC80\uC99D\uC740 \uBCC4\uB3C4":"\uC120\uC5B8 \uD30C\uC77C\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 \u2014 target base \uD655\uC778 \uBD88\uAC00"}
      >base ${T.declared_base||"?"}</span
    >`,Un=c`<label class="worker-tgl worker-slots"
        >동시 실행
        <input
          type="number"
          class="worker-slots__input"
          min=${ra}
          step="1"
          .value=${String(T.slots)}
          title="동시에 실행할 세션 수 (최소 1 = 순차 실행)"
      /></label>
      <label
        class="worker-tgl worker-serial-lanes"
        title="고정 직렬 레인 수 (1~5). 축소 시 잘린 레인의 대기 항목은 병렬 대기로 돌아갑니다"
        >직렬 레인
        <select class="worker-serial-lane-count" aria-label="직렬 레인 수">
          ${Array.from({length:y_},(on,Qn)=>Qn+1).map(on=>c`<option
                value=${String(on)}
                ?selected=${T.serial_lane_count===on}
              >
                ${on}
              </option>`)}
        </select>
      </label> `,pn=c`<input
      type="search"
      class="worker-search"
      placeholder="ID·제목 검색"
      aria-label="이슈 검색 (ID·제목)"
      .value=${H}
    />`,un=rd(T.repo_operations,T.cleanup_failures),Rn=ge(h),Vn=Ne(h);return F?c`<div class="worker-ribbon">
          ${Ie} ${He}
          <div class="worker-kpi worker-kpi--ribbon">
            ${St}${ot}${rn}
          </div>
        </div>
        <div class="worker-ctrl worker-ctrl--mobile">
          <div class="worker-ctrl__ops">${Un}${pn}</div>
          <div class="worker-kpi">${ln}</div>
        </div>
        ${Vn}${Rn}${un}${V.template()}`:c`<div class="worker-ctrl">
        <div class="worker-ctrl__ops">
          ${Ie}${He}${Un}${pn}
        </div>
        <div class="worker-kpi">
          ${St}${ot}${rn}${ln}
          ${(Array.isArray(T.token_total)?T.token_total:T.token_total?[{label:T.token_total,tooltip:`${Y()} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}]:[]).map(on=>c`<span
                class="worker-kpi__chip worker-kpi__chip--tokens"
                title=${on.tooltip}
                >${Y()} 완료 · 누적 ${on.label}</span
              >`)}
          <span class="worker-kpi__next worker-stat"
            >다음 <b>${le}</b></span
          >
        </div>
      </div>
      ${Vn}${Rn}${un}${V.template()}`}function v(b){let h=b.runnable_hidden;return c`<div class="worker-filter">
      <label class="worker-filter__tgl" title="blocked 이슈 표시 (기본 숨김)">
        <input
          type="checkbox"
          class="worker-filter__blocked"
          .checked=${_.show_blocked}
        />
        🔒 blocked${h.blocked>0?` ${h.blocked}`:""}
      </label>
      <div class="worker-filter__spec" role="group" aria-label="spec 필터">
        ${Pk.map(T=>c`<button
              type="button"
              class="worker-filter__chip${_.spec===T.value?" is-active":""}"
              data-spec=${T.value}
              aria-pressed=${_.spec===T.value?"true":"false"}
            >
              ${T.label}
            </button>`)}
        ${h.spec>0?c`<span class="worker-filter__hidden">숨김 ${h.spec}</span>`:""}
      </div>
    </div>`}function f(){let b=q?"custom":Hl(O)||"custom";return c`<select
      class="worker-sort"
      aria-label="후보 정렬"
      title="후보 정렬"
      .value=${b}
    >
      ${bs.map(h=>c`<option value=${h.id} ?selected=${b===h.id}>
            ${h.label}
          </option>`)}
      <option value="custom" ?selected=${b==="custom"}>
        사용자 지정…
      </option>
    </select>`}function g(){let b=ys(O);return c`<div
      class="worker-sort-chain"
      role="group"
      aria-label="후보 정렬 체인"
    >
      ${[0,1,2].map(h=>{let T=b[h];return c`<span class="worker-sort-chain__step">
          <select
            class="worker-sort-chain__key"
            data-step=${h}
            aria-label=${`${h+1}\uCC28 \uC815\uB82C \uD0A4`}
            .value=${T?T.key:""}
          >
            ${h===0?"":c`<option value="" ?selected=${!T}>없음</option>`}
            ${Zf.map(oe=>c`<option
                  value=${oe.key}
                  ?selected=${!!T&&T.key===oe.key}
                >
                  ${oe.label}
                </option>`)}
          </select>
          ${T?c`<button
                type="button"
                class="worker-sort-chain__dir"
                data-step=${h}
                aria-label=${T.dir==="asc"?"\uC624\uB984\uCC28\uC21C":"\uB0B4\uB9BC\uCC28\uC21C"}
                title=${T.dir==="asc"?"\uC624\uB984\uCC28\uC21C":"\uB0B4\uB9BC\uCC28\uC21C"}
              >
                ${T.dir==="asc"?"\u2191":"\u2193"}
              </button>`:""}
        </span>`})}
    </div>`}function M(){return c`<div class="worker-done-controls">
      <select
        class="worker-sort worker-done-range"
        aria-label="완료 기간"
        title="완료 기간"
        .value=${z}
      >
        ${Yr.map(b=>c`<option value=${b.value} ?selected=${z===b.value}>
              ${b.label}
            </option>`)}
      </select>
    </div>`}function Q(b){let h=bt(b).merge,T=$e().auto_merge===!0;if(h.running)return c`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop${T?" is-active":""}"
        title=${T?"\uC790\uB3D9 \uBA38\uC9C0\uB97C \uB044\uACE0 \uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)":"\uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)"}
      >
        ${T?"\u23F8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8":"\uC77C\uAD04 \uBA38\uC9C0 \uC911\uB2E8"} ${h.positions.size}
      </button>`;if(T)return c`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop is-active"
        title="자동 머지 켜짐 — 자격이 생기는 PR을 계속 큐에 넣습니다. 클릭하면 끕니다"
      >
        ⏸ 자동 머지
      </button>`;let oe=new Set(h.auto_excluded),le=Zt(b).filter(Ie=>Ie.merge_action&&Ie.merge_enabled&&!oe.has(Ie.id)).length;return c`<button
      type="button"
      class="worker-merge-all"
      title="켜 두면 자격이 생기는 PR을 계속 큐에 넣어 순서대로 충돌 해소·머지합니다"
    >
      ▶ 자동 머지${le>0?` ${le}`:""}
    </button>`}function ne(b,h){return c`<div
      data-bead-id=${b.id}
      data-drag-kind=${h.kind}
      data-root-dir=${h.root_dir}
      data-lane-id=${dn(h.lane_id)}
      data-row-index=${h.row_index}
      data-queue-index=${String(b.queue_index??0)}
    >
      ${Mn({...b,...X(b.id,b.discard)},{actions:ho(b)})}
    </div>`}function ue(b){let h=xt(b),T=Je();return bi({parallel:{rows:h.map((oe,le)=>ne(oe,{kind:"parallel",root_dir:T,row_index:le})),count:h.length,collapsed:N.isAreaCollapsed("parallel"),drop:{drop:"parallel",root_dir:T}},serial:{lanes:Ht(b).map(oe=>({id:oe.id,title:`\uC9C1\uB82C ${oe.index}`,rows:[...oe.ghosts.map(le=>Mn({...le,...X(le.id,le.discard)},{actions:ho(le)})),...oe.items.map((le,Ie)=>ne(le,{kind:"repo-serial",root_dir:T,row_index:Ie,lane_id:oe.id}))],count:oe.ghosts.length+oe.items.length,match_count:ee([...oe.ghosts,...oe.items]),empty:oe.ghosts.length+oe.items.length===0,badge:oe.badge,held:oe.occupied,cycle:oe.cycle,drop:{drop:"repo-serial",root_dir:T,lane_id:oe.id,lane_length:String(oe.raw_length)}})),collapsed:N.isAreaCollapsed("serial")}})}function ut(b){return uf(an(b),Date.now(),De)}function mt(b){return b.running.some(h=>h.kind!=="session"&&h.run_state==="running")}function pt(b){let h=bt(b),T=nn(b),oe=xt(b),le=Ut(b),Ie=Zt(b),He=an(b),St=Yn({id:"worker-pane-candidate",lane:"candidate",title:"\uD6C4\uBCF4",items:T,match_count:ee(T),src:!0,empty:"\uD6C4\uBCF4 \uC5C6\uC74C",header_control:f(),header_row:q?g():void 0,controls:v(b),collapsible:!0,collapsed:N.isCollapsed("candidate"),place_menu:je(T),onOpenDoc:u?(ot,rn)=>u(rn):void 0}),Vt=Yn({id:"worker-pane-done",lane:"done",title:"\uC644\uB8CC",items:le,match_count:ee(le),empty:`${Y()} \uC644\uB8CC \uC5C6\uC74C`,header_control:M(),collapsible:!0,collapsed:N.isCollapsed("done"),preview:F?Array.isArray(h.token_total)?h.token_total.map(ot=>ot.label).join(" \xB7 "):h.token_total||v_(le):void 0});return F?c`<div class="worker-lanes worker-lanes--mobile">
          ${yi({live:mt(b),running_body:He.length>0?ut(b):"",pr_wait_rows:Ie.map(ot=>Mn(ot)),count:He.length+Ie.length})}
          ${Yn({id:"worker-pane-queue",lane:"queue",title:"\uB300\uAE30",items:oe,count:oe.length,match_count:ee(oe),collapsible:!0,collapsed:N.isCollapsed("queue"),preview:v_(oe),body:ue(b)})}
          ${St} ${Vt}
        </div>
        ${Re()}`:c`<div class="worker-lanes">
        ${St}
        ${Yn({id:"worker-pane-queue",lane:"queue",title:"\uB300\uAE30",items:oe,count:oe.length,match_count:ee(oe),collapsible:!0,collapsed:N.isCollapsed("queue"),body:ue(b)})}
        ${Yn({id:"worker-pane-running",lane:"running",title:"\uC2E4\uD589 \uC911",items:He,match_count:ee(He),header_control:c`<span class="worker-pane__meta"
            >슬롯 ${h.slots}</span
          >`,live:mt(b),collapsible:!0,collapsed:N.isCollapsed("running"),body:ut(b)})}
        ${Yn({id:"worker-pane-pr-wait",lane:"pr_wait",title:"PR \uB300\uAE30",items:Ie,match_count:ee(Ie),empty:"PR \uB300\uAE30 \uC5C6\uC74C",collapsible:!0,collapsed:N.isCollapsed("pr_wait")})}
        ${Vt}
      </div>
      ${Re()}`}function Mt(b){N.toggle(b),x()}function S(b){N.toggleArea(b),x()}function x(){let b=Bt();A(b),dt(y(b),Le),dt(pt(b),ie);let h=ie.querySelector(".provider-resume-dialog");h&&!h.open&&(typeof h.showModal=="function"?h.showModal():h.setAttribute("open",""))}function Ae(){let b=!0,h=Gi(T=>{if(F=T,b){b=!1;return}x()});ke.push(h)}function We(b){_=b,Lk(b),x()}function rt(b){if(b==="custom"){q=!0,x();return}O=Wr(b),Kl(O),q=!1,x()}function yt(b){O=Wr({chain:b}),Kl(O),x()}function Kt(b){z=zn(b),Mk(z),p?.(z),x()}function zr(b){let h=b.target;if(U){let ot=h?.closest?.(".provider-resume-dialog__runner");if(ot){let pn=It(It($e().runner_catalog).runners),un=It(pn[ot.value]),Rn=Object.keys(It(un.models));U={...U,runner:ot.value,model:typeof un.default_model=="string"?un.default_model:Rn[0]||""},x();return}let rn=h?.closest?.(".provider-resume-dialog__model");if(rn){try{let[pn,un]=JSON.parse(rn.value);typeof pn=="string"&&typeof un=="string"&&(U={...U,runner:pn,model:un},x())}catch{}return}let ln=h?.closest?.(".provider-resume-dialog__account");if(ln){U={...U,account:ln.value},x();return}let Un=h?.closest?.(".provider-resume-dialog__fresh-input");if(Un){U={...U,fresh_current:Un.checked},x();return}}let T=h?.closest?.(".worker-serial-lane-count");if(T){let ot=Number.parseInt(T.value,10);Number.isFinite(ot)&&gt(ot).then(x);return}let oe=b.target?.closest?.(".worker-filter__blocked");if(oe){We({..._,show_blocked:oe.checked});return}let le=b.target?.closest?.(".worker-sort-chain__key");if(le){let ot=Number.parseInt(le.getAttribute("data-step")||"",10);Number.isFinite(ot)&&yt(e_(ys(O),ot,le.value));return}let Ie=b.target?.closest?.(".worker-done-range");if(Ie){Kt(Ie.value);return}let He=b.target?.closest?.(".worker-sort");if(He){rt(He.value);return}let St=b.target?.closest?.(".worker-slots__input");if(!St)return;let Vt=Number.parseInt(St.value,10);if(!Number.isFinite(Vt)){x();return}$t(Vt).then(x)}function kn(b){return b?{runner:b.runner||void 0,model:b.model||void 0,effort:b.effort||void 0,worktree:b.worktree||void 0,status:b.status||void 0,session_id:b.session_id||void 0}:{}}function lr(){let b=bt(Bt()),h=$e().workspace_info,T=h&&typeof h=="object"&&h.repo_ops&&typeof h.repo_ops=="object"?h.repo_ops:null;return{operations:b.repo_operations,cleanup_failures:b.cleanup_failures,repo:l&&l()||"",repo_ops:T}}function Ar(){De&&Be.close(),ce.hidden=!1,Xe.hidden=!1,Qe.open(lr()),x()}function oa(b){let h=$e(),T=h.attempts?h.attempts[b]:null;De=b,Qe.close(),ce.hidden=!0,Xe.hidden=!1,Be.open({attempt_id:b,meta:kn(T)}),x()}function sa(b){let h=$e(),T=(Array.isArray(h.session_active)?h.session_active:[]).find(le=>le&&le.bead_id===b),oe=(T&&Array.isArray(T.session_refs)?T.session_refs:[]).find(le=>le&&le.current===!0);oe&&(Qe.close(),ce.hidden=!0,Xe.hidden=!1,Be.open(oo(oe,b,"in_progress")),x())}function ia(){if(Qe.isOpen()&&Qe.refresh(lr()),!De)return;let b=$e(),h=b.attempts?b.attempts[De]:null;if(h){Be.updateMeta(kn(h));return}Be.close()}function vs(b,h){if(b.length===0||!s)return;let T=l?l():void 0;if(h.length===0||!T||h===T||!a){s(b);return}Promise.resolve(a(h)).then(()=>{s(b)}).catch(()=>{be("\uB808\uD3EC \uC804\uD658\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error",2400)})}function ks(b){let h=b.target;if(h?.closest?.(".provider-resume-dialog__cancel")){$();return}if(h?.closest?.(".provider-resume-dialog__confirm")){J();return}if(h?.closest?.(".provider-resume-dialog")||h?.closest?.(".worker-mini__grip"))return;let T=h?.closest?.(".worker-sort-chain__dir");if(T){let Ce=Number.parseInt(T.getAttribute("data-step")||"",10);Number.isFinite(Ce)&&yt(t_(ys(O),Ce));return}let oe=h?.closest?.(".worker-dep__open");if(oe){vs(oe.getAttribute("data-dep-id")||"",oe.getAttribute("data-root-dir")||"");return}let le=h?.closest?.(".judgement-chip");if(le){let Ce=le.closest("[data-bead-id]"),st=Ce&&Ce.getAttribute("data-bead-id")||"",Qt=le.getAttribute("data-chip-key")||"";st&&Qt&&se.toggle({bead_id:st,chip_key:Qt});return}if(h?.closest?.(".chip-popover"))return;if(h?.closest?.(".worker-repo-strip")){Ar();return}let Ie=h?.closest?.(".worker-repo-op__dismiss");if(Ie){ht(Ie.dataset.operationId||"");return}let He=h?.closest?.(".worker-cleanup__resume");if(He){let Ce=He.dataset.beadId;Ce&&jt(Ce);return}let St=h?.closest?.(".worker-cleanup__resolve");if(St){let Ce=St.dataset.beadId;Ce&&Lt(Ce);return}if(h?.closest?.(".worker-hold__retry")){ae("worker-queue-hold-retry-now","\uC9C0\uAE08 \uC7AC\uC2DC\uB3C4 \uAC70\uBD80");return}if(h?.closest?.(".worker-hold__resume")){ae("worker-queue-hold-resume","\uC7AC\uAC1C \uAC70\uBD80");return}if(h?.closest?.(".worker-play")){Pe(!$e().auto_advance);return}let Vt=h?.closest?.(".worker-merge-all");if(Vt){Vt.classList.contains("worker-merge-all--stop")?$e().auto_merge===!0?lt(!1):E():lt(!0);return}let ot=h?.closest?.(".worker-pane__toggle[data-lane]");if(ot){let Ce=ot.dataset.lane;(Ce==="candidate"||Ce==="queue"||Ce==="running"||Ce==="pr_wait"||Ce==="done")&&Mt(Ce);return}let rn=h?.closest?.(".worker-wait__area-toggle[data-area]");if(rn){let Ce=rn.dataset.area;(Ce==="parallel"||Ce==="serial")&&S(Ce);return}let ln=h?.closest?.(".worker-card__place-lane");if(ln){let Ce=ln.dataset.beadId,st=ln.dataset.lane;Ce&&(st==="parallel"||/^s[1-5]$/.test(st||""))&&(w=null,x(),et(Ce,st));return}if(h?.closest?.(".worker-card__place-cancel")){w=null,x();return}let pn=h?.closest?.(".worker-card__place");if(pn){let Ce=pn.dataset.beadId;Ce&&!pn.disabled&&(Wo($e())?(w=Ce,x()):et(Ce,"parallel"));return}let un=h?.closest?.(".worker-filter__chip");if(un){let Ce=un.dataset.spec;(Ce==="all"||Ce==="with"||Ce==="without")&&We({..._,spec:Ce});return}let Rn=h?.closest?.('[data-action="queue-remove"]');if(Rn){let Ce=Rn.dataset.beadId||"";Ce&&_e.sendOp({type:"worker-queue-remove",payload:{bead_id:Ce},root_dir:Je()},Ce);return}let Vn=h?.closest?.(".worker-mini__merge");if(Vn){let Ce=Vn.dataset.beadId||"";$e().cleanup_failed?.[Ce]?jt(Ce):wt(Ce);return}let on=h?.closest?.(".worker-mini__merge-cancel");if(on){Oe(on.dataset.beadId||"");return}let Qn=h?.closest?.(".worker-mini__resolve");if(Qn){Lt(Qn.dataset.beadId||"");return}let cr=h?.closest?.(".rtile__resolve");if(cr){let Ce=cr.closest(".rtile");Lt(Ce?.dataset.beadId||"");return}let On=h?.closest?.(".worker-mini__discard"),Wn=h?.closest?.(".worker-mini__discard-abandon");if(Wn){Z(Wn.dataset.beadId||"",Wn.dataset.operationId||"",{kind:Wn.dataset.operationKind||"",last_error:Wn.dataset.lastError||""});return}if(On){L(On.dataset.beadId||"",On.dataset.attemptId||null,On.dataset.discardMode==="merged"?"merged":"unmerged",On.dataset.operationId||null);return}let Ye=h?.closest?.(".worker-mini__stale-continue");if(Ye){pe("worker-stale-work-continue",Ye.dataset.beadId||"",Ye.dataset.actionId||"");return}let Wt=h?.closest?.(".worker-mini__stale-backup");if(Wt){pe("worker-stale-work-backup-fresh",Wt.dataset.beadId||"",Wt.dataset.actionId||"");return}let xn=h?.closest?.(".worker-mini__stale-recheck");if(xn){pe("worker-stale-work-recheck",xn.dataset.beadId||"",xn.dataset.actionId||"");return}let Ze=h?.closest?.(".worker-mini__revise-fix");if(Ze){fe("worker-revise-fix",Ze.dataset.beadId||"");return}let k=h?.closest?.(".worker-mini__revise-approve");if(k){fe("worker-revise-approve",k.dataset.beadId||"");return}if(h?.closest?.(".worker-mini__pr"))return;let D=h?.closest?.(".rtile__failure-badge");if(D){let Ce=D.dataset.attemptId||"";R=R===Ce?null:Ce,x();return}let K=h?.closest?.(".rtile__provider-hold-badge");if(K){let Ce=K.dataset.attemptId||"";I=I===Ce?null:Ce,x();return}let we=h?.closest?.(".rtile__attempt-copy");if(we){let Ce=we.dataset.attemptId||"";Ce&&_n(Ce).then(st=>{be(st?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",st?"success":"error",1400)});return}if(h?.closest?.(".rtile__parked-retry")){let Ce=h?.closest?.(".rtile");me(Ce?.dataset?.beadId||"",Ce?.dataset?.attemptId||"");return}let ze=h?.closest?.(".rtile__discard-abandon");if(ze){let st=h?.closest?.(".rtile")?.dataset?.beadId;st&&Z(st,ze.dataset.operationId||"",{kind:ze.dataset.operationKind||"",last_error:ze.dataset.lastError||""});return}let nt=h?.closest?.(".rtile__discard");if(nt){let Ce=h?.closest?.(".rtile"),st=Ce?.dataset?.beadId,Qt=Ce?.dataset?.attemptId;st&&L(st,Qt||null,nt.dataset.confirmation==="merged"?"merged":"unmerged",nt.dataset.operationId||null);return}if(h?.closest?.(".rtile__pause")){let st=h?.closest?.(".rtile")?.dataset?.attemptId;st&&Gt(st);return}if(h?.closest?.(".rtile__resume-alternate")){let st=h?.closest?.(".rtile")?.dataset?.attemptId;st&&Ke(st);return}if(h?.closest?.(".rtile__resume")){let Ce=h?.closest?.(".rtile__resume"),Qt=h?.closest?.(".rtile")?.dataset?.attemptId;Qt&&At(Qt,Ce?.dataset?.resumeKind==="settlement"?"settlement":"session");return}if(h?.closest?.(".rtile__session")){let Ce=h?.closest?.(".rtile"),st=Ce?.dataset?.attemptId;if(st){oa(st);return}let Qt=Ce?.dataset?.beadId;Qt&&sa(Qt);return}if(h?.closest?.(".rtile__failure-pop"))return;if(h?.closest?.(".worker-drawer-overlay__backdrop")){Qe.close(),Be.close();return}if(h?.closest?.(".worker-drawer-host"))return;let Nt=h?.closest?.(".rtile .board-card__roll-toggle");if(Nt){let Ce=Nt.dataset.rollParent;Ce&&(C.has(Ce)?C.delete(Ce):C.add(Ce),x());return}let Ve=h?.closest?.(".rtile .board-card__roll-child");if(Ve){let Ce=Ve.dataset.childId;Ce&&s&&s(Ce);return}let Et=h?.closest?.(".rtile");if(Et){if(h?.closest?.(".rtile__id")){let st=Et.dataset.beadId;st&&_n(st).then(Qt=>{Qt?be("\uBCF5\uC0AC\uB428","success",1200):be("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}let Ce=Et.dataset.beadId;Ce&&s&&s(Ce);return}let An=h?.closest?.(".worker-mini, .worker-card");if(An){let Ce=An.dataset.beadId;if(h?.closest?.('[data-seam="log-path-copy"]'))return;if(h?.closest?.(".worker-mini__id, .worker-card__id")){Ce&&_n(Ce).then(Qt=>{Qt?be("\uBCF5\uC0AC\uB428","success",1200):be("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}let st=h?.closest?.(".ctl-chip--from");if(st){let Qt=st.dataset.fromId;Qt&&s&&s(Qt);return}Ce&&s&&s(Ce)}}function aa(b){let h=b.target;h?.closest?.(".worker-search")&&(H=h.value,x())}function la(b){let h=b.target;b.key!=="Escape"||!h?.closest?.(".worker-search")||H.length===0||(H="",x())}_e.attach(e),e.addEventListener("click",ks),e.addEventListener("change",zr),e.addEventListener("input",aa),e.addEventListener("keydown",la);function Hr(b){let h=b.target,T=h&&typeof h.closest=="function"?le=>h.closest(le):()=>null,oe=!1;R&&!T(".rtile__failure-pop, .rtile__failure-badge")&&(R=null,oe=!0),I&&!T(".rtile__provider-hold-pop, .rtile__provider-hold-badge")&&(I=null,oe=!0),oe&&x()}function Kr(b){b.key==="Escape"&&(R===null&&I===null&&U===null||(R=null,I=null,U=null,x()))}return document.addEventListener("click",Hr),document.addEventListener("keydown",Kr),se.attach(),ke.push(()=>{document.removeEventListener("click",Hr),document.removeEventListener("keydown",Kr),se.detach()}),Ae(),m&&ke.push(m.subscribe(()=>{ve.notifyIssuesChanged(),x()})),o&&ke.push(o.subscribe(()=>{let b=l&&l()||"";b!==te&&(te=b,Fe.close()),x(),ia()})),x(),{load(){ve.ensureSessionDefaults(),x()},refreshSessionDefaults:Me,destroy(){for(let b of ke.splice(0))try{b()}catch{}_e.detach(),e.removeEventListener("click",ks),e.removeEventListener("change",zr),ve.destroy();try{Be.destroy()}catch{}Xe.hidden=!0;try{Fe.destroy()}catch{}dt(c``,e)}}}function Xl(e){if(!e)return"Unknown";let t=e.split("/").filter(Boolean);return t.length>0?t[t.length-1]:"Unknown"}function x_(e,t,n,r=async()=>{},o=async()=>{}){let i=Ft("views:workspace-picker"),s=null,l=!1,a=!1,u=!1;async function d(q){let Y=q.target.value,F=t.getState().workspace?.current?.path||"";if(Y&&Y!==F){i("switching workspace to %s",Y),l=!0,O();try{await n(Y)}catch(H){i("workspace switch failed: %o",H)}finally{l=!1,O()}}}async function p(){let q=t.getState(),z=q.workspace?.current?.path||q.workspace?.available?.[0]?.path||"";if(!(!z||a)){i("git-pulling workspace %s",z),a=!0,O();try{await r(z)}catch(Y){i("workspace git pull failed: %o",Y)}finally{a=!1,O()}}}function m(q){let z=q.target;z&&e.contains(z)||R()}function _(q){q.key==="Escape"&&R()}function w(){u||(u=!0,document.addEventListener("mousedown",m),document.addEventListener("keydown",_),O())}function R(){u&&(u=!1,document.removeEventListener("mousedown",m),document.removeEventListener("keydown",_),O())}function I(){u?R():w()}async function U(q){let z=q.target,Y=z.value,N=z.checked;i("toggling visibility %s \u2192 %s",Y,String(N));try{await o(Y,N)}catch(F){i("workspace visibility toggle failed: %o",F)}}function se(q){return q?c`
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
    `:c``}function W(q,z){return c`
      <div class="workspace-picker__manage">
        <button
          type="button"
          class="workspace-picker__manage-button"
          @click=${I}
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
                ${q.map(Y=>c`
                    <label
                      class="workspace-picker__manage-row"
                      title="${Y.path}"
                    >
                      <input
                        type="checkbox"
                        class="workspace-picker__manage-checkbox"
                        value="${Y.path}"
                        .checked=${!z.has(Y.path)}
                        @change=${U}
                      />
                      <span class="workspace-picker__manage-name"
                        >${Xl(Y.path)}</span
                      >
                    </label>
                  `)}
              </div>
            `:""}
      </div>
    `}function j(){let q=t.getState(),z=q.workspace?.current,Y=q.workspace?.available||[],N=new Set(q.workspace?.hidden||[]),F=z?.path||Y[0]?.path||"";if(Y.length===0)return c``;let H=Y.filter(G=>!N.has(G.path)||G.path===F);if(H.length<=1){let G=H[0]||Y[0],ee=Xl(G.path);return c`
        <div class="workspace-picker workspace-picker--single">
          <span class="workspace-picker__label" title="${G.path}"
            >${ee}</span
          >
          ${W(Y,N)}
          ${se(F)}
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
          ${H.map(G=>c`
              <option
                value="${G.path}"
                ?selected=${G.path===F}
                title="${G.path}"
              >
                ${Xl(G.path)}
              </option>
            `)}
        </select>
        ${W(Y,N)}
        ${se(F)}
        ${l||a?c`<span
              class="workspace-picker__loading"
              aria-hidden="true"
            ></span>`:""}
      </div>
    `}function O(){dt(j(),e)}return O(),s=t.subscribe(()=>O()),{destroy(){s&&(s(),s=null),document.removeEventListener("mousedown",m),document.removeEventListener("keydown",_),dt(c``,e)}}}var A_=["update-status","edit-text","update-priority","create-issue","dep-add","dep-remove","update-assignee","update-exec-settings","update-impl-target","get-session-defaults","set-session-defaults","get-workspace-accounts","set-workspace-accounts","update-workflow-meta","label-add","label-remove","subscribe-list","unsubscribe-list","snapshot","upsert","delete","get-comments","add-comment","delete-issue","list-workspaces","set-workspace","set-workspace-visibility","get-workspace","workspace-changed","git-pull-workspace","subscribe-worker-queue","unsubscribe-worker-queue","worker-queue-snapshot","worker-queue-place","worker-queue-reorder","worker-queue-toggle","worker-automation-toggle","worker-provider-auto-switch-toggle","worker-repo-ops-opt-out-toggle","worker-repo-operation-dismiss","worker-repo-operation-deploy-run","worker-queue-set-slots","worker-queue-set-serial-lane-count","worker-queue-set-orchestration-defaults","worker-queue-remove","worker-attempt-pause","worker-attempt-stop","worker-attempt-resume","worker-cleanup-retry","worker-resolve-in-session","worker-parked-retry","worker-queue-hold-resume","worker-queue-hold-retry-now","worker-merge-queue-add","worker-merge-queue-add-all","worker-merge-auto-toggle","worker-merge-queue-remove","worker-discard","worker-discard-abandon","worker-stale-work-continue","worker-stale-work-backup-fresh","worker-stale-work-recheck","worker-pr-discard","worker-revise-fix","worker-revise-approve","subscribe-ui-order","unsubscribe-ui-order","ui-order-set","ui-order-snapshot","subscribe-display-policy","unsubscribe-display-policy","display-policy-set","display-policy-snapshot","subscribe-session-log","unsubscribe-session-log","session-log-snapshot","session-log-append","get-attempt-prompt","get-bead-prompt","get-bead-timeline","get-worker-system-prompt","get-session-refs","subscribe-monitor-pipeline","unsubscribe-monitor-pipeline","monitor-pipeline-snapshot","subscribe-impl-presets","unsubscribe-impl-presets","impl-presets-snapshot","impl-preset-create","impl-preset-update","impl-preset-delete","apply-impl-preset","apply-impl-preset-global","monitor-auto-toggle","monitor-lane-create","monitor-lane-update","monitor-lane-confirm","monitor-lane-remove"];function Zl(){let e=Date.now().toString(36),t=Math.random().toString(36).slice(2,8);return`${e}-${t}`}function S_(e,t,n=Zl()){return{id:n,type:e,payload:t}}function E_(e={}){let t=Ft("ws"),n={initialMs:e.backoff?.initialMs??1e3,maxMs:e.backoff?.maxMs??3e4,factor:e.backoff?.factor??2,jitterRatio:e.backoff?.jitterRatio??.2},r=()=>e.url&&e.url.length>0?e.url:typeof location<"u"?(location.protocol==="https:"?"wss://":"ws://")+location.host+"/ws":"ws://localhost/ws",o=null,i="closed",s=0,l=null,a=!0,u=new Map,d=[],p=new Map,m=new Set;function _(j){for(let O of Array.from(m))try{O(j)}catch{}}function w(){if(!a||l)return;i="reconnecting",t("ws reconnecting\u2026"),_(i);let j=Math.min(n.maxMs||0,(n.initialMs||0)*Math.pow(n.factor||1,s)),O=(n.jitterRatio||0)*j,q=Math.max(0,Math.round(j+(Math.random()*2-1)*O));t("ws retry in %d ms (attempt %d)",q,s+1),l=setTimeout(()=>{l=null,W()},q)}function R(j){try{o?.send(JSON.stringify(j))}catch(O){t("ws send failed",O)}}function I(){for(i="open",t("ws open"),_(i),s=0;d.length;){let j=d.shift();j&&R(j)}}function U(j){let O;try{O=JSON.parse(String(j.data))}catch{t("ws received non-JSON message");return}if(!O||typeof O.id!="string"||typeof O.type!="string"){t("ws received invalid envelope");return}if(u.has(O.id)){let z=u.get(O.id);u.delete(O.id),O.ok?z?.resolve(O.payload):z?.reject(O.error||new Error("ws error"));return}let q=p.get(O.type);if(q&&q.size>0)for(let z of Array.from(q))try{z(O.payload)}catch(Y){t("ws event handler error",Y)}else t("ws received unhandled message type: %s",O.type)}function se(){i="closed",t("ws closed"),_(i);for(let[j,O]of u.entries())O.reject(new Error("ws disconnected")),u.delete(j);s+=1,w()}function W(){if(!a)return;let j=r();try{o=new WebSocket(j),t("ws connecting %s",j),i="connecting",_(i),o.addEventListener("open",I),o.addEventListener("message",U),o.addEventListener("error",()=>{}),o.addEventListener("close",se)}catch(O){t("ws connect failed %o",O),w()}}return W(),{send(j,O){if(!A_.includes(j))return Promise.reject(new Error(`unknown message type: ${j}`));let q=Zl(),z=S_(j,O,q);return t("send %s id=%s",j,q),new Promise((Y,N)=>{u.set(q,{resolve:Y,reject:N,type:j}),o&&o.readyState===o.OPEN?R(z):(t("queue %s id=%s (state=%s)",j,q,i),d.push(z))})},on(j,O){p.has(j)||p.set(j,new Set);let q=p.get(j);return q?.add(O),()=>{q?.delete(O)}},onConnection(j){return m.add(j),()=>{m.delete(j)}},reconnect(){a=!0,l&&(clearTimeout(l),l=null),s=0,W()},close(){a=!1,l&&(clearTimeout(l),l=null);try{o?.close()}catch{}},getState(){return i}}}function ew(){let e=window.__BDUI_BOOTSTRAP__;return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:null}}}async function tw(e,t){try{let r=await(await fetch("/api/config")).json();e.setState({config:r})}catch(n){t("config refresh failed",n)}}var Jl=[["tab:board:ready","ready-issues"],["tab:board:blocked","blocked-issues"],["tab:board:in-progress","in-progress-issues"],["tab:board:resolved","resolved-issues"],["tab:board:deferred","deferred-issues"],["tab:board:closed","closed-issues"]],T_=[["tab:worker:ready","ready-issues"],["tab:worker:blocked","blocked-issues"],["tab:worker:in-progress","in-progress-issues"],["tab:worker:resolved","resolved-issues"],["tab:worker:closed","closed-issues"]],$r="tab:worker:closed",nw="bdui.worker.done-range",C_=Ef,R_="worker:queue",O_="ui:order",I_="ui:display-policy",L_="exec:presets",xr="tab:board:closed",P_="beads-ui.board.closed-range";function rw(e){if(!e)return()=>{};function t(r){document.documentElement.style.setProperty("--app-header-h",`${Math.round(r)}px`)}if(t(e.getBoundingClientRect().height),typeof ResizeObserver!="function")return()=>{};let n=new ResizeObserver(r=>{for(let o of r)t(o.contentRect.height+ow(e))});return n.observe(e),()=>n.disconnect()}function ow(e){let t=getComputedStyle(e);return[t.paddingTop,t.paddingBottom,t.borderTopWidth,t.borderBottomWidth].reduce((r,o)=>r+(parseFloat(o)||0),0)}function sw(e){let t=Ft("main");t("bootstrap start"),rw(document.querySelector(".app-header"));let n=c`
    <section id="board-root" class="route board"></section>
    <section id="worker-root" class="route worker" hidden></section>
    <section id="monitor-root" class="route monitor" hidden></section>
    <section id="detail-panel" class="route detail" hidden></section>
  `;dt(n,e);let r=document.getElementById("global-nav"),o=document.getElementById("top-nav"),i=document.getElementById("repo-scope"),s=document.getElementById("usage-meter"),l=document.getElementById("board-root"),a=document.getElementById("worker-root"),u=document.getElementById("monitor-root"),d=document.getElementById("detail-panel");if(s&&Gf(s),l&&a&&u&&d){let ke=function(S,x){let Ae="Request failed",We="";if(S&&typeof S=="object"){let yt=S;if(typeof yt.message=="string"&&yt.message.length>0&&(Ae=yt.message),typeof yt.details=="string")We=yt.details;else if(yt.details&&typeof yt.details=="object")try{We=JSON.stringify(yt.details,null,2)}catch{We=""}}else typeof S=="string"&&S.length>0&&(Ae=S);let rt=x&&x.length>0?`Failed to load ${x}`:"Request failed";re.open(rt,Ae,We)},$e=function(S){return`${xe.getState().workspace.current?.path||""}\0${S}`},_t=function(){Te&&(Te().catch(()=>{}),Te=null),_e=null,De=null},Ke=function(S){Be=S;let x=()=>{Be!==S||xe.getState().selected_id!==S||(Be=null,at(S))};if(!te){Fe.then(x);return}x()},je=function(S,x,Ae,We,rt){return Ae!==Re[x]?(rt().catch(()=>{}),!1):(S.set(We,rt),!0)},et=function(){let S=xe.getState();kt(S.view==="board"),Ge(S.view==="worker"),pe(Z(S)),Oe(S.view==="board"||S.view==="worker"||Je||!!S.selected_id)},Gt=function(){let S=Or(Ue);return S===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:S}}},At=function(){let S=Or(ct);return S===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:S}}},kt=function(S){if(S)for(let[x,Ae]of Jl){if($.has(x)||J.has(x))continue;let We=x===xr?Gt():{type:Ae};try{Le.register(x,We)}catch(Kt){t("register %s store failed: %o",x,Kt)}J.add(x);let rt=Re.board,yt=!1;he.subscribeList(x,We).then(Kt=>{yt=!je($,"board",rt,x,Kt)}).catch(Kt=>{t("subscribe %s failed: %o",x,Kt),ke(Kt,"board")}).finally(()=>{J.delete(x),yt&&et()})}else Lt()},Lt=function(){Re.board+=1;for(let[S]of Jl){let x=$.get(S);x&&(x().catch(()=>{}),$.delete(S));try{Le.unregister(S)}catch(Ae){t("unregister %s failed: %o",S,Ae)}}},Ge=function(S){if(!S){lt();return}for(let[x,Ae]of T_){if(ae.has(x)||J.has(x))continue;let We=x===$r?At():{type:Ae};try{Le.register(x,We)}catch(Kt){t("register %s store failed: %o",x,Kt)}J.add(x);let rt=Re.worker,yt=!1;he.subscribeList(x,We).then(Kt=>{yt=!je(ae,"worker",rt,x,Kt)}).catch(Kt=>{t("subscribe %s failed: %o",x,Kt),ke(Kt,"worker")}).finally(()=>{J.delete(x),yt&&et()})}},lt=function(){Re.worker+=1;for(let[S]of T_){let x=ae.get(S);x&&(x().catch(()=>{}),ae.delete(S));try{Le.unregister(S)}catch(Ae){t("unregister %s failed: %o",S,Ae)}}},Oe=function(S){if(!S){E();return}me||(Me("subscribe-worker-queue",{id:R_}).catch(x=>{t("subscribe-worker-queue failed: %o",x)}),me=()=>Me("unsubscribe-worker-queue",{id:R_}))},E=function(){me&&(me().catch(()=>{}),me=null)},Z=function(S){return S.view==="monitor"||S.selected_id!=null},pe=function(S){if(!S){fe();return}L||(Me("subscribe-monitor-pipeline",{id:C_}).catch(x=>{t("subscribe-monitor-pipeline failed: %o",x)}),L=()=>Me("unsubscribe-monitor-pipeline",{id:C_}))},fe=function(){L&&(L().catch(()=>{}),L=null)},ht=function(){Pe||(Me("subscribe-ui-order",{id:O_}).catch(S=>{t("subscribe-ui-order failed: %o",S)}),Pe=()=>Me("unsubscribe-ui-order",{id:O_}))},$t=function(){Pe&&(Pe().catch(()=>{}),Pe=null),P.clear()},Bt=function(){gt||(Me("subscribe-display-policy",{id:I_}).catch(S=>{t("subscribe-display-policy failed: %o",S)}),gt=()=>Me("unsubscribe-display-policy",{id:I_}))},bt=function(){gt&&(gt().catch(()=>{}),gt=null),ce.clear()},Rt=function(){Ct||(Me("subscribe-impl-presets",{id:L_}).catch(S=>{t("subscribe-impl-presets failed: %o",S)}),Ct=()=>Me("unsubscribe-impl-presets",{id:L_}))},nn=function(S){if(!S)return"Unknown";let x=S.split("/").filter(Boolean);return x.length>0?x[x.length-1]:"Unknown"},Q=function(S,x){M.open(S.path,{missing_state:S.missing_state,...x?{workspace:x}:{}})};var p=ke,m=$e,_=_t,w=Ke,R=je,I=et,U=Gt,se=At,W=kt,j=Lt,O=Ge,q=lt,z=Oe,Y=E,N=Z,F=pe,H=fe,G=ht,ee=$t,ye=Bt,qe=bt,B=Rt,X=nn,Se=Q;let Ee=document.getElementById("header-loading"),C=Uc(Ee),re=Qp(e),ve=E_(),Me=C.wrapSend((S,x)=>ve.send(S,x)),he=Dc(Me),Le=Mc(),Xe=Nc(),it=_c(),P=qc(),ce=pc(),ie=fc(),de=mc();ve.on("impl-presets-snapshot",S=>{let x=S;x&&typeof x.revision=="number"&&Array.isArray(x.presets)&&ie.set({revision:x.revision,presets:x.presets})}),ve.on("monitor-pipeline-snapshot",S=>{let x=S;if(!(!x||!Array.isArray(x.workspaces)))try{it.set(x.workspaces,x.workspaces_state,x.cross_lanes)}catch{}}),ve.on("ui-order-snapshot",S=>{let x=S;if(x&&typeof x.revision=="number")try{P.set({revision:x.revision,order:x.order&&typeof x.order=="object"?x.order:{}})}catch{}}),ve.on("display-policy-snapshot",S=>{let x=S;if(x&&x.policy&&typeof x.policy=="object")try{ce.set(x.policy)}catch{}}),ve.on("session-log-snapshot",S=>{let x=S;if(x&&typeof x.id=="string")try{de.set(x.id,Array.isArray(x.lines)?x.lines:[],typeof x.last_event_at=="number"?x.last_event_at:null)}catch{}}),ve.on("session-log-append",S=>{let x=S;if(x&&typeof x.id=="string")try{de.append(x.id,x.event)}catch{}}),ve.on("snapshot",S=>{let x=S,Ae=x&&typeof x.id=="string"?x.id:"",We=Ae?Le.getStore(Ae):null;if(We&&x&&x.type==="snapshot")try{We.applyPush(x)}catch{}}),ve.on("upsert",S=>{let x=S,Ae=x&&typeof x.id=="string"?x.id:"",We=Ae?Le.getStore(Ae):null;if(We&&x&&x.type==="upsert")try{We.applyPush(x)}catch{}}),ve.on("delete",S=>{let x=S,Ae=x&&typeof x.id=="string"?x.id:"",We=Ae?Le.getStore(Ae):null;if(We&&x&&x.type==="delete")try{We.applyPush(x)}catch{}});let Te=null,_e=null,De=null,Be=null,Qe=()=>{},Fe=new Promise(S=>{Qe=()=>S(void 0)}),te=!1,V=!1;async function at(S){let x=$e(S);if(x===_e||x===De)return;De=x;let Ae=`detail:${S}`,We={type:"issue-detail",params:{id:S}};try{Le.register(Ae,We)}catch(rt){t("register detail store failed: %o",rt)}try{let rt=await he.subscribeList(Ae,We);if(xe.getState().selected_id!==S||$e(S)!==x){await rt().catch(()=>{});return}Te&&await Te().catch(()=>{}),Te=rt,_e=x}catch(rt){t("detail subscribe failed: %o",rt),ke(rt,"issue details")}finally{De===x&&(De=null)}}let $=new Map,J=new Set,Re={board:0,worker:0},Je=!1,Ue=Ts;try{let S=window.localStorage.getItem(P_);ga(S)&&(Ue=S)}catch{}let ct="today";try{let S=window.localStorage.getItem(nw);S!==null&&(ct=zn(S))}catch{}async function wt(S){if(!ga(S)||S===Ue)return;Ue=S;try{window.localStorage.setItem(P_,S)}catch{}let x=$.get(xr);if(!x)return;$.delete(xr),await x().catch(()=>{});let Ae=Gt();try{Le.register(xr,Ae)}catch(We){t("register %s store failed: %o",xr,We)}try{let We=await he.subscribeList(xr,Ae);$.set(xr,We)}catch(We){t("re-subscribe %s failed: %o",xr,We),ke(We,"board")}}async function jt(S){let x=zn(S);if(x===ct)return;ct=x;let Ae=ae.get($r);if(!Ae)return;ae.delete($r),await Ae().catch(()=>{});let We=At();try{Le.register($r,We)}catch(rt){t("register %s store failed: %o",$r,rt)}try{let rt=await he.subscribeList($r,We);ae.set($r,rt)}catch(rt){t("re-subscribe %s failed: %o",$r,rt),ke(rt,"worker")}}let ae=new Map,me=null,L=null,Pe=null,gt=null,Ct=null;async function en(){gt=null,ce.clear(),Ct=null,ie.clear(),me=null,L=null,$.clear(),ae.clear(),Re.board+=1,Re.worker+=1,Rt();let S=xe.getState().workspace.current?.path;if(S)try{await ve.send("set-workspace",{path:S})}catch(Ae){t("workspace restore after reconnect failed: %o",Ae);return}Bt();let x=xe.getState();kt(x.view==="board"),Ge(x.view==="worker"),pe(Z(x)),Oe(x.view==="board"||x.view==="worker"||!!x.selected_id)}async function Yt(){t("clearing all subscriptions for workspace switch"),Lt(),lt(),E(),Xe.clear(),$t(),ht(),bt(),Bt(),_t();let S=xe.getState();if(S.selected_id)try{Le.unregister(`detail:${S.selected_id}`)}catch{}let x=xe.getState();kt(x.view==="board"),Ge(x.view==="worker"),pe(Z(x)),Oe(x.view==="board"||x.view==="worker"||!!x.selected_id),x.selected_id&&Ke(x.selected_id)}async function Dt(S){t("requesting workspace switch to %s",S),V=!0;try{let x=await ve.send("set-workspace",{path:S});t("workspace switch result: %o",x),x&&x.workspace&&(xe.setState({workspace:{current:{path:x.workspace.root_dir,database:x.workspace.db_path}}}),window.localStorage.setItem("beads-ui.workspace",S),x.changed&&(await Yt(),be("Switched to "+nn(S),"success",2e3)))}catch(x){throw t("workspace switch failed: %o",x),be("Failed to switch workspace","error",3e3),x}finally{V=!1}}async function xt(S){t("requesting workspace git pull for %s",S);try{let x=await ve.send("git-pull-workspace",{});t("workspace git pull result: %o",x);let Ae=x?.status;if(Ae==="up_to_date"){be("Already up to date","success",2e3);return}if(Ae==="stash_pop_conflict"){be("Git pulled, but stash pop conflicted (check git stash list)","warning",4e3);return}be("Git pulled "+nn(S),"success",2e3)}catch(x){t("workspace git pull failed: %o",x);let Ae=x?.code,We=x?.message;if(Ae==="rebase_conflict"){be("Git pull conflicts \u2014 reverted (manual resolve required)","error",4e3);return}if(Ae==="rebase_conflict_abort_failed"){be("Git pull conflicts AND rebase --abort failed \u2014 repo left mid-rebase, run 'git rebase --abort' manually","error",6e3);return}if(Ae==="busy"){be("Git pull skipped: another operation is running","warning",3e3);return}let rt=We?`: ${We}`:"";throw be(`Git pull failed${rt}`,"error",3e3),x}}async function Ht(S,x){t("setting workspace visibility %s \u2192 %s",S,String(x));try{await ve.send("set-workspace-visibility",{path:S,visible:x}),await Ut()}catch(Ae){t("workspace visibility update failed: %o",Ae),be("Failed to update project visibility","error",3e3)}}async function Ut(){try{let S=await ve.send("list-workspaces",{});if(t("workspaces loaded: %o",S),S&&Array.isArray(S.workspaces)){let x=S.workspaces.map(yt=>({path:yt.path,database:yt.database,pid:yt.pid,version:yt.version})),Ae=S.current?{path:S.current.root_dir,database:S.current.db_path}:null,We=Array.isArray(S.hidden)?S.hidden.filter(yt=>typeof yt=="string"):[];xe.setState({workspace:{current:Ae,available:x,hidden:We}});let rt=window.localStorage.getItem("beads-ui.workspace");rt&&(!x.some(Kt=>Kt.path===rt)||We.includes(rt)?window.localStorage.removeItem("beads-ui.workspace"):Ae&&rt!==Ae.path&&(t("restoring saved workspace preference: %s",rt),await Dt(rt)))}}catch(S){t("failed to load workspaces: %o",S)}}ve.on("workspace-changed",S=>{t("workspace-changed event: %o",S),S&&S.root_dir&&(xe.setState({workspace:{current:{path:S.root_dir,database:S.db_path}}}),Ut(),Yt())});let an=!1;if(typeof ve.onConnection=="function"){let S=x=>{t("ws state %s",x),x==="reconnecting"||x==="closed"?(an=!0,be("Connection lost. Reconnecting\u2026","error",4e3)):x==="open"&&an&&(an=!1,be("Reconnected","success",2200),tw(xe,(Ae,We)=>{t(`${Ae}: %o`,We)}),en())};ve.onConnection(S)}let Zt="board";try{let S=window.localStorage.getItem("beads-ui.view");(S==="board"||S==="worker"||S==="monitor")&&(Zt=S)}catch(S){t("view parse error: %o",S)}let xe=Bc({config:ew(),view:Zt});ve.on("worker-queue-snapshot",S=>{let x=S;if(!x||!x.queue)return;let Ae=xe.getState().workspace.current?.path;if(typeof Ae=="string"&&Ae.length>0&&x.root_dir!==Ae){t("dropping worker-queue snapshot for %s",String(x.root_dir));return}try{Xe.set(x.queue)}catch{}});let A=jc(xe);A.start();let ge=new Set(["get-comments","dep-add","dep-remove","impl-preset-create","impl-preset-update","impl-preset-delete","apply-impl-preset","apply-impl-preset-global","get-session-defaults","set-session-defaults","monitor-lane-create","monitor-lane-update","monitor-lane-confirm","monitor-lane-remove"]),Ne=async(S,x)=>{try{return await Me(S,x)}catch(Ae){if(ge.has(S))throw Ae;return[]}};Cf({global_element:r,repo_element:o},xe,A);let y=document.getElementById("workspace-picker");y&&x_(y,xe,Dt,xt,Ht);let v=Lf(e,(S,x)=>Me(S,x));try{let S=document.getElementById("new-issue-btn");S&&S.addEventListener("click",()=>v.open())}catch{}let f=qf(e,{policyStore:ce,queueStore:Xe,implPresetStore:ie,transport:(S,x)=>Me(S,x),onOpenChange:S=>{let x=Je;Je=S,et(),x&&S===!1&&ue.refreshSessionDefaults()},labelOptions:()=>{let S=new Set;for(let[x]of Jl)for(let Ae of Le.snapshotFor(x)||[]){let We=Ae.labels;if(Array.isArray(We))for(let rt of We)typeof rt=="string"&&rt.length>0&&S.add(rt)}return Array.from(S).sort()}});try{let S=document.getElementById("display-settings-btn");S&&(S.setAttribute("aria-label","\uC124\uC815"),S.setAttribute("title","\uC124\uC815"),S.addEventListener("click",()=>f.open()))}catch{}let g=document.createElement("div");g.className="md-viewer-root",document.body.appendChild(g);let M=Hi(g,{getWorkspacePath:()=>xe.getState().workspace.current?.path}),ne=ou(l,{gotoIssue:S=>A.gotoIssue(S),issueStores:Le,transport:Ne,workerQueueStore:Xe,uiOrderStore:P,displayPolicyStore:ce,closedRange:Ue,onClosedRangeChange:S=>{wt(S)},onNewIssue:()=>v.open(),openDoc:Q}),ue=Ql(a,{transport:Ne,issueStores:Le,queueStore:Xe,sessionLogStore:de,gotoIssue:S=>xe.setState({selected_id:S}),getWorkspacePath:()=>xe.getState().workspace.current?.path,switchWorkspace:S=>Dt(S),openDoc:Q,doneRange:ct,onDoneRangeChange:S=>{jt(S)}}),ut=Tf(u,{transport:Ne,pipelineStore:it,execPresetStore:ie,sessionLogStore:de,router:A,gotoIssue:S=>A.gotoIssue(S),getWorkspacePath:()=>xe.getState().workspace.current?.path,switchWorkspace:S=>Dt(S),openDoc:Q}),mt=Vp(d,{issueStores:Le,transport:Ne,queueStore:Xe,execPresetStore:ie,sessionLogStore:de,getWorkspacePath:()=>xe.getState().workspace.current?.path,mdViewer:M,depCandidates:()=>{let S=it.get();if(S===null)return null;let x=it.getWorkspacesState(),Ae=xe.getState();if(Ae.view==="monitor")return ll(S,x);let We=Ae.workspace.current?.path;return We?ll(S,x,{root_dir:We}):null},subscribeCandidates:S=>it.subscribe(S),onDepChanged:({type:S,a:x,b:Ae})=>{let We=ut;S==="dep-add"&&We&&typeof We.recorrectSharedLane=="function"&&We.recorrectSharedLane(S,x,Ae)},onNavigate:(S,x)=>{let Ae=()=>{xe.getState().view==="worker"?xe.setState({selected_id:S}):A.gotoIssue(S)},We=xe.getState().workspace.current?.path;if(typeof x!="string"||x.length===0||!We||x===We){Ae();return}Promise.resolve(Dt(x)).then(Ae).catch(()=>{be("\uB808\uD3EC \uC804\uD658\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error",2400)})},onClose:()=>{let S=xe.getState();xe.setState({selected_id:null});try{A.gotoView(S.view==="worker"||S.view==="monitor"?S.view:"board")}catch{}},onOpenExecPresets:()=>{f.open("execution")}}),pt=xe.getState().selected_id;pt&&(d.hidden=!1,mt.load(pt),Ke(pt)),xe.subscribe(S=>{let x=S.selected_id;x?(d.hidden=!1,mt.load(x),V||Ke(x)):(mt.clear(),d.hidden=!0,_t())});let Mt=S=>{l.hidden=S.view!=="board",a.hidden=S.view!=="worker",u.hidden=S.view!=="monitor",i&&i.classList.toggle("is-quiet",S.view==="monitor"),kt(S.view==="board"),Ge(S.view==="worker"),pe(Z(S)),Oe(S.view==="board"||S.view==="worker"||Je||!!S.selected_id),!S.selected_id&&S.view==="board"&&ne.load(),S.view==="worker"&&ue.load(),S.view==="monitor"?ut.load():ut.pause(),window.localStorage.setItem("beads-ui.view",S.view)};xe.subscribe(Mt),Mt(xe.getState()),ht(),Bt(),Rt(),Ut().finally(()=>{te=!0,Qe()}),window.addEventListener("keydown",S=>{let x=S.ctrlKey||S.metaKey,Ae=String(S.key||"").toLowerCase(),We=S.target,rt=We&&We.tagName?String(We.tagName).toLowerCase():"",yt=rt==="input"||rt==="textarea"||rt==="select"||We&&typeof We.isContentEditable=="boolean"&&We.isContentEditable;x&&Ae==="n"&&(yt||(S.preventDefault(),v.open()))})}}typeof window<"u"&&typeof document<"u"&&window.addEventListener("DOMContentLoaded",()=>{try{let n=window.localStorage.getItem("beads-ui.theme"),r=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches,o=n==="dark"||n==="light"?n:r?"dark":"light";document.documentElement.setAttribute("data-theme",o);let i=document.getElementById("theme-switch");i&&(i.checked=o==="dark")}catch{}let e=document.getElementById("theme-switch");e&&e.addEventListener("change",()=>{let n=e.checked?"dark":"light";document.documentElement.setAttribute("data-theme",n),window.localStorage.setItem("beads-ui.theme",n)});let t=document.getElementById("app");t&&sw(t)});export{sw as bootstrap,ew as readBootstrapConfig,tw as refreshConfigSnapshot};
//# sourceMappingURL=main.bundle.js.map
