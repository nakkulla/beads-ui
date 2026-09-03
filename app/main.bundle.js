var q_=Object.create;var ua=Object.defineProperty;var N_=Object.getOwnPropertyDescriptor;var j_=Object.getOwnPropertyNames;var F_=Object.getPrototypeOf,B_=Object.prototype.hasOwnProperty;var U_=(e,t,n)=>t in e?ua(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var da=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var W_=(e,t,n,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let o of j_(t))!B_.call(e,o)&&o!==n&&ua(e,o,{get:()=>t[o],enumerable:!(r=N_(t,o))||r.enumerable});return e};var z_=(e,t,n)=>(n=e!=null?q_(F_(e)):{},W_(t||!e||!e.__esModule?ua(n,"default",{value:e,enumerable:!0}):n,e));var jt=(e,t,n)=>U_(e,typeof t!="symbol"?t+"":t,n);var bc=da((hw,hc)=>{var Xr=1e3,Zr=Xr*60,Jr=Zr*60,Pr=Jr*24,G_=Pr*7,Y_=Pr*365.25;hc.exports=function(e,t){t=t||{};var n=typeof e;if(n==="string"&&e.length>0)return V_(e);if(n==="number"&&isFinite(e))return t.long?X_(e):Q_(e);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(e))};function V_(e){if(e=String(e),!(e.length>100)){var t=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(e);if(t){var n=parseFloat(t[1]),r=(t[2]||"ms").toLowerCase();switch(r){case"years":case"year":case"yrs":case"yr":case"y":return n*Y_;case"weeks":case"week":case"w":return n*G_;case"days":case"day":case"d":return n*Pr;case"hours":case"hour":case"hrs":case"hr":case"h":return n*Jr;case"minutes":case"minute":case"mins":case"min":case"m":return n*Zr;case"seconds":case"second":case"secs":case"sec":case"s":return n*Xr;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return n;default:return}}}}function Q_(e){var t=Math.abs(e);return t>=Pr?Math.round(e/Pr)+"d":t>=Jr?Math.round(e/Jr)+"h":t>=Zr?Math.round(e/Zr)+"m":t>=Xr?Math.round(e/Xr)+"s":e+"ms"}function X_(e){var t=Math.abs(e);return t>=Pr?Ls(e,t,Pr,"day"):t>=Jr?Ls(e,t,Jr,"hour"):t>=Zr?Ls(e,t,Zr,"minute"):t>=Xr?Ls(e,t,Xr,"second"):e+" ms"}function Ls(e,t,n,r){var o=t>=n*1.5;return Math.round(e/n)+" "+r+(o?"s":"")}});var vc=da((bw,yc)=>{function Z_(e){n.debug=n,n.default=n,n.coerce=a,n.disable=s,n.enable=o,n.enabled=l,n.humanize=bc(),n.destroy=u,Object.keys(e).forEach(d=>{n[d]=e[d]}),n.names=[],n.skips=[],n.formatters={};function t(d){let p=0;for(let _=0;_<d.length;_++)p=(p<<5)-p+d.charCodeAt(_),p|=0;return n.colors[Math.abs(p)%n.colors.length]}n.selectColor=t;function n(d){let p,_=null,m,y;function C(...O){if(!C.enabled)return;let V=C,te=Number(new Date),W=te-(p||te);V.diff=W,V.prev=p,V.curr=te,p=te,O[0]=n.coerce(O[0]),typeof O[0]!="string"&&O.unshift("%O");let q=0;O[0]=O[0].replace(/%([a-zA-Z%])/g,(P,U)=>{if(P==="%%")return"%";q++;let Y=n.formatters[U];if(typeof Y=="function"){let N=O[q];P=Y.call(V,N),O.splice(q,1),q--}return P}),n.formatArgs.call(V,O),(V.log||n.log).apply(V,O)}return C.namespace=d,C.useColors=n.useColors(),C.color=n.selectColor(d),C.extend=r,C.destroy=n.destroy,Object.defineProperty(C,"enabled",{enumerable:!0,configurable:!1,get:()=>_!==null?_:(m!==n.namespaces&&(m=n.namespaces,y=n.enabled(d)),y),set:O=>{_=O}}),typeof n.init=="function"&&n.init(C),C}function r(d,p){let _=n(this.namespace+(typeof p>"u"?":":p)+d);return _.log=this.log,_}function o(d){n.save(d),n.namespaces=d,n.names=[],n.skips=[];let p=(typeof d=="string"?d:"").trim().replace(/\s+/g,",").split(",").filter(Boolean);for(let _ of p)_[0]==="-"?n.skips.push(_.slice(1)):n.names.push(_)}function i(d,p){let _=0,m=0,y=-1,C=0;for(;_<d.length;)if(m<p.length&&(p[m]===d[_]||p[m]==="*"))p[m]==="*"?(y=m,C=_,m++):(_++,m++);else if(y!==-1)m=y+1,C++,_=C;else return!1;for(;m<p.length&&p[m]==="*";)m++;return m===p.length}function s(){let d=[...n.names,...n.skips.map(p=>"-"+p)].join(",");return n.enable(""),d}function l(d){for(let p of n.skips)if(i(d,p))return!1;for(let p of n.names)if(i(d,p))return!0;return!1}function a(d){return d instanceof Error?d.stack||d.message:d}function u(){console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")}return n.enable(n.load()),n}yc.exports=Z_});var kc=da(($n,Ps)=>{$n.formatArgs=em;$n.save=tm;$n.load=nm;$n.useColors=J_;$n.storage=rm();$n.destroy=(()=>{let e=!1;return()=>{e||(e=!0,console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."))}})();$n.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"];function J_(){if(typeof window<"u"&&window.process&&(window.process.type==="renderer"||window.process.__nwjs))return!0;if(typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))return!1;let e;return typeof document<"u"&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||typeof window<"u"&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||typeof navigator<"u"&&navigator.userAgent&&(e=navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/))&&parseInt(e[1],10)>=31||typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)}function em(e){if(e[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+e[0]+(this.useColors?"%c ":" ")+"+"+Ps.exports.humanize(this.diff),!this.useColors)return;let t="color: "+this.color;e.splice(1,0,t,"color: inherit");let n=0,r=0;e[0].replace(/%[a-zA-Z%]/g,o=>{o!=="%%"&&(n++,o==="%c"&&(r=n))}),e.splice(r,0,t)}$n.log=console.debug||console.log||(()=>{});function tm(e){try{e?$n.storage.setItem("debug",e):$n.storage.removeItem("debug")}catch{}}function nm(){let e;try{e=$n.storage.getItem("debug")||$n.storage.getItem("DEBUG")}catch{}return!e&&typeof process<"u"&&"env"in process&&(e=process.env.DEBUG),e}function rm(){try{return localStorage}catch{}}Ps.exports=vc()($n);var{formatters:om}=Ps.exports;om.j=function(e){try{return JSON.stringify(e)}catch(t){return"[UnexpectedJSONParseError]: "+t.message}}});var Eo=globalThis,Ss=Eo.trustedTypes,tc=Ss?Ss.createPolicy("lit-html",{createHTML:e=>e}):void 0,fa="$lit$",Zn=`lit$${Math.random().toFixed(9).slice(2)}$`,_a="?"+Zn,H_=`<${_a}>`,Rr=document,To=()=>Rr.createComment(""),Co=e=>e===null||typeof e!="object"&&typeof e!="function",ma=Array.isArray,ac=e=>ma(e)||typeof e?.[Symbol.iterator]=="function",pa=`[ 	
\f\r]`,So=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,nc=/-->/g,rc=/>/g,Tr=RegExp(`>|${pa}(?:([^\\s"'>=/]+)(${pa}*=${pa}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),oc=/'/g,sc=/"/g,lc=/^(?:script|style|textarea|title)$/i,ga=e=>(t,...n)=>({_$litType$:e,strings:t,values:n}),c=ga(1),Oo=ga(2),uw=ga(3),Cn=Symbol.for("lit-noChange"),Kt=Symbol.for("lit-nothing"),ic=new WeakMap,Cr=Rr.createTreeWalker(Rr,129);function cc(e,t){if(!ma(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return tc!==void 0?tc.createHTML(t):t}var uc=(e,t)=>{let n=e.length-1,r=[],o,i=t===2?"<svg>":t===3?"<math>":"",s=So;for(let l=0;l<n;l++){let a=e[l],u,d,p=-1,_=0;for(;_<a.length&&(s.lastIndex=_,d=s.exec(a),d!==null);)_=s.lastIndex,s===So?d[1]==="!--"?s=nc:d[1]!==void 0?s=rc:d[2]!==void 0?(lc.test(d[2])&&(o=RegExp("</"+d[2],"g")),s=Tr):d[3]!==void 0&&(s=Tr):s===Tr?d[0]===">"?(s=o??So,p=-1):d[1]===void 0?p=-2:(p=s.lastIndex-d[2].length,u=d[1],s=d[3]===void 0?Tr:d[3]==='"'?sc:oc):s===sc||s===oc?s=Tr:s===nc||s===rc?s=So:(s=Tr,o=void 0);let m=s===Tr&&e[l+1].startsWith("/>")?" ":"";i+=s===So?a+H_:p>=0?(r.push(u),a.slice(0,p)+fa+a.slice(p)+Zn+m):a+Zn+(p===-2?l:m)}return[cc(e,i+(e[n]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),r]},Ro=class e{constructor({strings:t,_$litType$:n},r){let o;this.parts=[];let i=0,s=0,l=t.length-1,a=this.parts,[u,d]=uc(t,n);if(this.el=e.createElement(u,r),Cr.currentNode=this.el.content,n===2||n===3){let p=this.el.content.firstChild;p.replaceWith(...p.childNodes)}for(;(o=Cr.nextNode())!==null&&a.length<l;){if(o.nodeType===1){if(o.hasAttributes())for(let p of o.getAttributeNames())if(p.endsWith(fa)){let _=d[s++],m=o.getAttribute(p).split(Zn),y=/([.?@])?(.*)/.exec(_);a.push({type:1,index:i,name:y[2],strings:m,ctor:y[1]==="."?Ts:y[1]==="?"?Cs:y[1]==="@"?Rs:Ir}),o.removeAttribute(p)}else p.startsWith(Zn)&&(a.push({type:6,index:i}),o.removeAttribute(p));if(lc.test(o.tagName)){let p=o.textContent.split(Zn),_=p.length-1;if(_>0){o.textContent=Ss?Ss.emptyScript:"";for(let m=0;m<_;m++)o.append(p[m],To()),Cr.nextNode(),a.push({type:2,index:++i});o.append(p[_],To())}}}else if(o.nodeType===8)if(o.data===_a)a.push({type:2,index:i});else{let p=-1;for(;(p=o.data.indexOf(Zn,p+1))!==-1;)a.push({type:7,index:i}),p+=Zn.length-1}i++}}static createElement(t,n){let r=Rr.createElement("template");return r.innerHTML=t,r}};function Or(e,t,n=e,r){if(t===Cn)return t;let o=r!==void 0?n._$Co?.[r]:n._$Cl,i=Co(t)?void 0:t._$litDirective$;return o?.constructor!==i&&(o?._$AO?.(!1),i===void 0?o=void 0:(o=new i(e),o._$AT(e,n,r)),r!==void 0?(n._$Co??(n._$Co=[]))[r]=o:n._$Cl=o),o!==void 0&&(t=Or(e,o._$AS(e,t.values),o,r)),t}var Es=class{constructor(t,n){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=n}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:n},parts:r}=this._$AD,o=(t?.creationScope??Rr).importNode(n,!0);Cr.currentNode=o;let i=Cr.nextNode(),s=0,l=0,a=r[0];for(;a!==void 0;){if(s===a.index){let u;a.type===2?u=new Vr(i,i.nextSibling,this,t):a.type===1?u=new a.ctor(i,a.name,a.strings,this,t):a.type===6&&(u=new Os(i,this,t)),this._$AV.push(u),a=r[++l]}s!==a?.index&&(i=Cr.nextNode(),s++)}return Cr.currentNode=Rr,o}p(t){let n=0;for(let r of this._$AV)r!==void 0&&(r.strings!==void 0?(r._$AI(t,r,n),n+=r.strings.length-2):r._$AI(t[n])),n++}},Vr=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,n,r,o){this.type=2,this._$AH=Kt,this._$AN=void 0,this._$AA=t,this._$AB=n,this._$AM=r,this.options=o,this._$Cv=o?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,n=this._$AM;return n!==void 0&&t?.nodeType===11&&(t=n.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,n=this){t=Or(this,t,n),Co(t)?t===Kt||t==null||t===""?(this._$AH!==Kt&&this._$AR(),this._$AH=Kt):t!==this._$AH&&t!==Cn&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):ac(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==Kt&&Co(this._$AH)?this._$AA.nextSibling.data=t:this.T(Rr.createTextNode(t)),this._$AH=t}$(t){let{values:n,_$litType$:r}=t,o=typeof r=="number"?this._$AC(t):(r.el===void 0&&(r.el=Ro.createElement(cc(r.h,r.h[0]),this.options)),r);if(this._$AH?._$AD===o)this._$AH.p(n);else{let i=new Es(o,this),s=i.u(this.options);i.p(n),this.T(s),this._$AH=i}}_$AC(t){let n=ic.get(t.strings);return n===void 0&&ic.set(t.strings,n=new Ro(t)),n}k(t){ma(this._$AH)||(this._$AH=[],this._$AR());let n=this._$AH,r,o=0;for(let i of t)o===n.length?n.push(r=new e(this.O(To()),this.O(To()),this,this.options)):r=n[o],r._$AI(i),o++;o<n.length&&(this._$AR(r&&r._$AB.nextSibling,o),n.length=o)}_$AR(t=this._$AA.nextSibling,n){for(this._$AP?.(!1,!0,n);t!==this._$AB;){let r=t.nextSibling;t.remove(),t=r}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},Ir=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,n,r,o,i){this.type=1,this._$AH=Kt,this._$AN=void 0,this.element=t,this.name=n,this._$AM=o,this.options=i,r.length>2||r[0]!==""||r[1]!==""?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=Kt}_$AI(t,n=this,r,o){let i=this.strings,s=!1;if(i===void 0)t=Or(this,t,n,0),s=!Co(t)||t!==this._$AH&&t!==Cn,s&&(this._$AH=t);else{let l=t,a,u;for(t=i[0],a=0;a<i.length-1;a++)u=Or(this,l[r+a],n,a),u===Cn&&(u=this._$AH[a]),s||(s=!Co(u)||u!==this._$AH[a]),u===Kt?t=Kt:t!==Kt&&(t+=(u??"")+i[a+1]),this._$AH[a]=u}s&&!o&&this.j(t)}j(t){t===Kt?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},Ts=class extends Ir{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===Kt?void 0:t}},Cs=class extends Ir{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==Kt)}},Rs=class extends Ir{constructor(t,n,r,o,i){super(t,n,r,o,i),this.type=5}_$AI(t,n=this){if((t=Or(this,t,n,0)??Kt)===Cn)return;let r=this._$AH,o=t===Kt&&r!==Kt||t.capture!==r.capture||t.once!==r.once||t.passive!==r.passive,i=t!==Kt&&(r===Kt||o);o&&this.element.removeEventListener(this.name,this,r),i&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},Os=class{constructor(t,n,r){this.element=t,this.type=6,this._$AN=void 0,this._$AM=n,this.options=r}get _$AU(){return this._$AM._$AU}_$AI(t){Or(this,t)}},dc={M:fa,P:Zn,A:_a,C:1,L:uc,R:Es,D:ac,V:Or,I:Vr,H:Ir,N:Cs,U:Rs,B:Ts,F:Os},K_=Eo.litHtmlPolyfillSupport;K_?.(Ro,Vr),(Eo.litHtmlVersions??(Eo.litHtmlVersions=[])).push("3.3.1");var dt=(e,t,n)=>{let r=n?.renderBefore??t,o=r._$litPart$;if(o===void 0){let i=n?.renderBefore??null;r._$litPart$=o=new Vr(t.insertBefore(To(),i),i,void 0,n??{})}return o._$AI(e),o};var Is="today",pc=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"},{value:"30d",label:"\uCD5C\uADFC 30\uC77C"},{value:"all",label:"\uC804\uCCB4"}],Qr=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"}];function Hn(e){return e==="today"?"today":"7d"}function ha(e){return e==="today"||e==="7d"||e==="30d"||e==="all"}function Lr(e,t=Date.now()){switch(e){case"today":{let n=new Date(t);return n.setHours(0,0,0,0),n.getTime()}case"7d":return t-7*864e5;case"30d":return t-30*864e5;case"all":default:return}}function fc(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function _c(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function mc(){let e=null,t=[],n,r=new Set;function o(){for(let i of Array.from(r))try{i()}catch{}}return{get(){return e},getWorkspacesState(){return t},crossLanes(){return n},set(i,s,l){e=Array.isArray(i)?i:null,t=Array.isArray(s)?s:[],n=l===void 0?void 0:l!==null&&typeof l=="object"&&typeof l.revision=="number"&&Array.isArray(l.lanes)?{revision:l.revision,lanes:l.lanes}:null,o()},clear(){e=null,t=[],n=void 0,o()},subscribe(i){return r.add(i),()=>r.delete(i)}}}function gc(){let e=new Map,t=new Set;function n(o){return o.startsWith("session-log:")?o:`session-log:${o}`}function r(){for(let o of Array.from(t))try{o()}catch{}}return{set(o,i,s=null){e.set(n(o),{lines:Array.isArray(i)?[...i]:[],last_event_at:typeof s=="number"?s:null}),r()},append(o,i){let s=n(o),l=e.get(s)||{lines:[],last_event_at:null};l.lines=[...l.lines,i],l.last_event_at=Date.now(),e.set(s,l),r()},get(o){return e.get(n(o))||null},clear(o){typeof o=="string"?e.delete(n(o)):e.clear(),r()},subscribe(o){return t.add(o),()=>t.delete(o)}}}var wc=z_(kc(),1);function Wt(e){return(0,wc.default)(`beads-ui:${e}`)}function sm(e){let n=$c((e&&typeof e=="object"?e:{}).spec_id);return n?{path:n,source:"native",conflict:!1}:{path:"",source:"none",conflict:!1}}function $c(e){return typeof e=="string"?e.trim():""}function im(e){let t=e&&typeof e=="object"?e:{};return t.metadata&&typeof t.metadata=="object"?t.metadata:{}}var am=/^[A-Za-z0-9_.:-]+@[0-9a-fA-F]{40}$/;function eo(e){let t=sm(e),n=$c(im(e).spec_review),r=am.test(n),o=r&&n.slice(0,n.indexOf("@"))==="skipped";return t.source==="none"?{...t,evidence:"none",skipped:o}:{...t,evidence:r?"published":"draft",skipped:o}}function Ln(e){if(typeof e=="number")return Number.isFinite(e)?e:0;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:0}return 0}function Io(e,t){let n=Ln(e.created_at),r=Ln(t.created_at);if(n!==r)return n<r?1:-1;let o=e.priority??2,i=t.priority??2;if(o!==i)return o-i;let s=e.id,l=t.id;return s<l?-1:s>l?1:0}function Cc(e,t){let n=Ln(e.created_at),r=Ln(t.created_at);if(n!==r)return n<r?-1:1;let o=e.priority??2,i=t.priority??2;if(o!==i)return o-i;let s=e.id,l=t.id;return s<l?-1:s>l?1:0}function Rc(e,t){let n=Ln(e.updated_at),r=Ln(t.updated_at);if(n!==r)return n<r?1:-1;let o=e.id,i=t.id;return o<i?-1:o>i?1:0}function Oc(e,t){let n=e.priority??2,r=t.priority??2;if(n!==r)return n-r;let o=Ln(e.created_at),i=Ln(t.created_at);if(o!==i)return o<i?1:-1;let s=e.id,l=t.id;return s<l?-1:s>l?1:0}function Ic(e,t){let n=e.closed_at??0,r=t.closed_at??0;if(n!==r)return n<r?1:-1;let o=e?.id,i=t?.id;return o<i?-1:o>i?1:0}var Ds=Object.freeze({priority:"asc",dependents:"desc",released:"desc",spec:"desc",created:"asc",updated:"desc"});function lm(e){return typeof e=="string"&&Object.prototype.hasOwnProperty.call(Ds,e)}function ya(e){if(!e||typeof e!="object")return!1;let t=e;return lm(t.key)&&(t.dir==="asc"||t.dir==="desc")}function xc(e){if(typeof e=="number")return Number.isFinite(e)?e:null;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:null}return null}function Ac(e,t){switch(t){case"priority":{let n=e.priority;return typeof n=="number"&&Number.isFinite(n)?n:null}case"dependents":{let n=e.dependents_info?e.dependents_info.count:null;return typeof n=="number"&&Number.isFinite(n)?n:null}case"released":{let n=e.release_info?e.release_info.last_released_at:null;return typeof n=="number"&&Number.isFinite(n)?n:null}case"spec":return eo(e).evidence==="published"?1:0;case"created":return xc(e.created_at);case"updated":return xc(e.updated_at);default:return null}}function Sc(e,t,n){let r=Ac(e,n.key),o=Ac(t,n.key);if(r===null||o===null)return r===o?0:r===null?1:-1;if(r===o)return 0;let i=r<o?-1:1;return n.dir==="desc"?-i:i}function Lc(e){let t=Array.isArray(e)?e.filter(ya):[];return(n,r)=>{for(let l of t){let a=Sc(n,r,l);if(a!==0)return a}let o=Sc(n,r,{key:"created",dir:"asc"});if(o!==0)return o;let i=n.id,s=r.id;return i<s?-1:i>s?1:0}}var cm=/^(?:[A-Za-z][A-Za-z0-9]*(?:-[A-Za-z0-9]+)+\s+)?(?:Task|Phase|T)\s*(\d+)/i;function Ec(e){let t=e&&e.metadata,n=t?t.task_order:void 0;if(n==null||n==="")return Number.POSITIVE_INFINITY;let r=Number(n);return Number.isFinite(r)?r:Number.POSITIVE_INFINITY}function Tc(e){let t=e&&e.title;if(typeof t!="string")return Number.POSITIVE_INFINITY;let n=cm.exec(t);if(!n)return Number.POSITIVE_INFINITY;let r=Number(n[1]);return Number.isFinite(r)?r:Number.POSITIVE_INFINITY}function Pc(e,t){let n=Ec(e),r=Ec(t);if(n!==r)return n<r?-1:1;let o=Tc(e),i=Tc(t);if(o!==i)return o<i?-1:1;let s=Ln(e&&e.created_at),l=Ln(t&&t.created_at);if(s!==l)return s<l?-1:1;let a=e&&e.id,u=t&&t.id;return a===u?0:String(a)<String(u)?-1:1}var ba=2**20;function to(e,t){let n=e&&e.id;return t&&typeof n=="string"&&Object.prototype.hasOwnProperty.call(t,n)&&typeof t[n]=="number"&&Number.isFinite(t[n])?t[n]:-Ln(e&&e.created_at)}function Dc(e){return(t,n)=>{let r=to(t,e),o=to(n,e);if(r!==o)return r<o?-1:1;let i=t?.id,s=n?.id;return i<s?-1:i>s?1:0}}function va(e,t,n){let r=Array.isArray(e)?e:[],o=r.length,i=Math.max(0,Math.min(t,o-1)),s=i-1>=0?r[i-1]:null,l=i+1<o?r[i+1]:null;if(!s&&!l)return{rank:0};if(!s)return{rank:to(l,n)-ba};if(!l)return{rank:to(s,n)+ba};let a=to(s,n),u=to(l,n),d=(a+u)/2;return a<d&&d<u?{rank:d}:{renormalize:r.map((p,_)=>({bead_id:p.id,rank:_*ba}))}}function ka(e,t={}){let n=Wt(`issue-store:${e}`),r=new Map,o=[],i=0,s=new Set,l=!1,a=t.sort||Io;function u(){for(let _ of Array.from(s))try{_()}catch{}}function d(){o=Array.from(r.values()).sort(a)}function p(_){if(l||!_||_.id!==e)return;let m=Number(_.revision)||0;if(n("apply %s rev=%d",_.type,m),!(m<=i&&_.type!=="snapshot")){if(_.type==="snapshot"){if(m<=i)return;r.clear();let y=Array.isArray(_.issues)?_.issues:[];for(let C of y)C&&typeof C.id=="string"&&C.id.length>0&&r.set(C.id,C);d(),i=m,u();return}if(_.type==="upsert"){let y=_.issue;if(y&&typeof y.id=="string"&&y.id.length>0){let C=r.get(y.id);if(!C)r.set(y.id,y);else{let O=Number.isFinite(C.updated_at)?C.updated_at:0,V=Number.isFinite(y.updated_at)?y.updated_at:0;if(O<=V){for(let te of Object.keys(C))te in y||delete C[te];for(let[te,W]of Object.entries(y))C[te]=W}}d()}i=m,u()}else if(_.type==="delete"){let y=String(_.issue_id||"");y&&(r.delete(y),d()),i=m,u()}}}return{id:e,subscribe(_){return s.add(_),()=>{s.delete(_)}},applyPush:p,snapshot(){return o},size(){return r.size},getById(_){return r.get(_)},dispose(){l=!0,r.clear(),o=[],s.clear(),i=0}}}function Ms(e){let t=String(e.type||"").trim(),n={};if(e.params&&typeof e.params=="object"){let o=Object.keys(e.params).sort();for(let i of o){let s=e.params[i];n[i]=String(s)}}let r=new URLSearchParams(n).toString();return r.length>0?`${t}?${r}`:t}function Mc(e){let t=Wt("subs"),n=new Map,r=new Map;function o(l,a){t("applyDelta %s +%d ~%d -%d",l,(a.added||[]).length,(a.updated||[]).length,(a.removed||[]).length);let u=r.get(l);if(!u||u.size===0)return;let d=Array.isArray(a.added)?a.added:[],p=Array.isArray(a.updated)?a.updated:[],_=Array.isArray(a.removed)?a.removed:[];for(let m of Array.from(u)){let y=n.get(m);if(!y)continue;let C=y.itemsById;for(let O of d)typeof O=="string"&&O.length>0&&C.set(O,!0);for(let O of p)typeof O=="string"&&O.length>0&&C.set(O,!0);for(let O of _)typeof O=="string"&&O.length>0&&C.delete(O)}}async function i(l,a){let u=Ms(a);if(t("subscribe %s key=%s",l,u),!n.has(l))n.set(l,{key:u,itemsById:new Map});else{let p=n.get(l);if(p&&p.key!==u){let _=r.get(p.key);_&&(_.delete(l),_.size===0&&r.delete(p.key)),n.set(l,{key:u,itemsById:new Map})}}r.has(u)||r.set(u,new Set);let d=r.get(u);d&&d.add(l);try{await e("subscribe-list",{id:l,type:a.type,params:a.params})}catch(p){let _=n.get(l)||null;if(_){let m=r.get(_.key);m&&(m.delete(l),m.size===0&&r.delete(_.key))}throw n.delete(l),p}return async()=>{t("unsubscribe %s key=%s",l,u);try{await e("unsubscribe-list",{id:l})}catch{}let p=n.get(l)||null;if(p){let _=r.get(p.key);_&&(_.delete(l),_.size===0&&r.delete(p.key))}n.delete(l)}}return{subscribeList:i,_applyDelta:o,_subKeyOf:Ms,selectors:{getIds(l){let a=n.get(l);return a?Array.from(a.itemsById.keys()):[]},has(l,a){let u=n.get(l);return u?u.itemsById.has(a):!1},count(l){let a=n.get(l);return a?a.itemsById.size:0},getItemsById(l){let a=n.get(l),u={};if(!a)return u;for(let d of a.itemsById.keys())u[d]=!0;return u}}}}function qc(){let e=Wt("issue-stores"),t=new Map,n=new Map,r=new Set,o=new Map;function i(){for(let a of Array.from(r))try{a()}catch{}}function s(a,u,d){let p=u?Ms(u):"",_=n.get(a)||"",m=t.has(a);if(e("register %s key=%s (prev=%s)",a,p,_),m&&_&&p&&_!==p){let y=t.get(a);if(y)try{y.dispose()}catch{}let C=o.get(a);if(C){try{C()}catch{}o.delete(a)}let O=ka(a,d);t.set(a,O);let V=O.subscribe(()=>i());o.set(a,V)}else if(!m){let y=ka(a,d);t.set(a,y);let C=y.subscribe(()=>i());o.set(a,C)}return n.set(a,p),()=>l(a)}function l(a){e("unregister %s",a),n.delete(a);let u=t.get(a);u&&(u.dispose(),t.delete(a));let d=o.get(a);if(d){try{d()}catch{}o.delete(a)}}return{register:s,unregister:l,getStore(a){return t.get(a)||null},snapshotFor(a){let u=t.get(a);return u?u.snapshot().slice():[]},subscribe(a){return r.add(a),()=>r.delete(a)}}}function Nc(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function jc(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function wa(e,t){return`#/${e==="worker"||e==="monitor"?e:"board"}?issue=${encodeURIComponent(t)}`}function um(e){let t=String(e||""),n=t.startsWith("#")?t.slice(1):t,r=n.indexOf("?"),o=r>=0?n.slice(r+1):"";if(o){let l=new URLSearchParams(o).get("issue");if(l)return decodeURIComponent(l)}let i=/^\/issue\/([^\s?#]+)/.exec(n);return i&&i[1]?decodeURIComponent(i[1]):null}function dm(e){let t=String(e||"");return/^#\/worker(\b|\/|$)/.test(t)?"worker":/^#\/monitor(\b|\/|$)/.test(t)?"monitor":"board"}function Fc(e){let t=Wt("router"),n=()=>{let r=window.location.hash||"",o=/^#\/issue\/([^\s?#]+)/.exec(r),i=o&&o[1]?decodeURIComponent(o[1]):um(r),s=dm(r);if(t("hash change \u2192 view=%s id=%s",s,i),e.setState({selected_id:s==="worker"?null:i,view:s,worker:{selected_parent_id:s==="worker"?i:null}}),!!o||/^#\/(issues|epics)(\b|\/|\?|$)/.test(r)){let a=i?`#/${s}?issue=${encodeURIComponent(i)}`:`#/${s}`;window.location.hash!==a&&(window.location.hash=a)}};return{start(){window.addEventListener("hashchange",n),n()},stop(){window.removeEventListener("hashchange",n)},gotoIssue(r){let o=e.getState?e.getState():{view:"board"},i=o.view==="worker"||o.view==="monitor"?o.view:"board",s=wa(i,r);t("goto issue %s (view=%s)",r,i),window.location.hash!==s?window.location.hash=s:e.setState({selected_id:i==="worker"?null:r,view:i,worker:{selected_parent_id:i==="worker"?r:null}})},gotoView(r){let o=e.getState?e.getState():{selected_id:null,worker:{selected_parent_id:null}},i=r==="worker"?o.worker?.selected_parent_id:o.selected_id,s=i?wa(r,i):`#/${r}`;t("goto view %s (id=%s)",r,i||""),window.location.hash!==s?window.location.hash=s:e.setState({view:r,selected_id:r==="worker"?null:o.selected_id})}}}var pm=Object.freeze({workspace_config:{default_workspace:null}});function Bc(e){return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:pm.workspace_config.default_workspace}}}function Uc(e={}){let t=Wt("state"),n={selected_id:e.selected_id??null,view:e.view??"board",filters:{status:e.filters?.status??"all",search:e.filters?.search??"",type:typeof e.filters?.type=="string"?e.filters?.type:""},board:{closed_filter:e.board?.closed_filter==="3"||e.board?.closed_filter==="7"||e.board?.closed_filter==="today"?e.board?.closed_filter:"today"},worker:{selected_parent_id:e.worker?.selected_parent_id??null,show_closed_children:Array.isArray(e.worker?.show_closed_children)?e.worker.show_closed_children:[]},workspace:{current:e.workspace?.current??null,available:e.workspace?.available??[],hidden:e.workspace?.hidden??[]},config:Bc(e.config)},r=new Set;function o(){for(let i of Array.from(r))try{i(n)}catch{}}return{getState(){return n},setState(i){let s={...n,...i,filters:{...n.filters,...i.filters||{}},board:{...n.board,...i.board||{}},worker:{...n.worker,...i.worker||{}},workspace:{current:i.workspace?.current!==void 0?i.workspace.current:n.workspace.current,available:i.workspace?.available!==void 0?i.workspace.available:n.workspace.available,hidden:i.workspace?.hidden!==void 0?i.workspace.hidden:n.workspace.hidden},config:i.config!==void 0?Bc(i.config):n.config},l=s.workspace.current?.path!==n.workspace.current?.path||s.workspace.available.length!==n.workspace.available.length||s.workspace.hidden.length!==n.workspace.hidden.length||s.workspace.hidden.some((u,d)=>u!==n.workspace.hidden[d]),a=s.config.workspace_config.default_workspace!==n.config.workspace_config.default_workspace;s.selected_id===n.selected_id&&s.view===n.view&&s.filters.status===n.filters.status&&s.filters.search===n.filters.search&&s.filters.type===n.filters.type&&s.board.closed_filter===n.board.closed_filter&&s.worker.selected_parent_id===n.worker.selected_parent_id&&s.worker.show_closed_children.length===n.worker.show_closed_children.length&&s.worker.show_closed_children.every((u,d)=>u===n.worker.show_closed_children[d])&&!l&&!a||(n=s,t("state change %o",{selected_id:n.selected_id,view:n.view,filters:n.filters,board:n.board,worker:n.worker,workspace:n.workspace.current?.path,config:{default_workspace:n.config.workspace_config.default_workspace}}),o())},subscribe(i){return r.add(i),()=>r.delete(i)}}}function Wc(e){let t=Wt("activity"),n=0,r=new Map,o=1;function i(){if(!e)return;let u=n>0;e.toggleAttribute("hidden",!u),e.setAttribute("aria-busy",u?"true":"false")}function s(){n+=1,t("start count=%d",n),i()}function l(){let u=n;n=Math.max(0,n-1),u<=0?t("done called but count was already %d",u):t("done count=%d\u2192%d",u,n),i()}function a(u){return async(p,_)=>{let m=o++,y=Date.now();r.set(m,{type:p,start_ts:y}),t("request start id=%d type=%s count=%d",m,p,n+1),s();let C=!1,O=()=>{C||(C=!0,r.delete(m),l())},V=setTimeout(()=>{C||(t("request TIMEOUT id=%d type=%s elapsed=%dms",m,p,Date.now()-y),O())},3e4);try{let te=await u(p,_),W=Date.now()-y;return t("request done id=%d type=%s elapsed=%dms",m,p,W),te}catch(te){let W=Date.now()-y;throw t("request error id=%d type=%s elapsed=%dms err=%o",m,p,W,te),te}finally{clearTimeout(V),O()}}}return i(),{wrapSend:a,start:s,done:l,getCount:()=>n,getActiveRequests:()=>{let u=Date.now();return Array.from(r.entries()).map(([d,p])=>({id:d,type:p.type,elapsed_ms:u-p.start_ts}))}}}function ge(e,t="info",n=2800){let r=document.createElement("div");r.className="toast",r.textContent=e,r.style.position="fixed",r.style.right="12px",r.style.bottom="12px",r.style.zIndex="1000",r.style.color="#fff",r.style.padding="8px 10px",r.style.borderRadius="4px",r.style.fontSize="12px",t==="success"?r.style.background="#156d36":t==="warning"?r.style.background="#a36a00":t==="error"?r.style.background="#9f2011":r.style.background="rgba(0,0,0,0.85)",(document.body||document.documentElement).appendChild(r),setTimeout(()=>{try{r.remove()}catch{}},n)}function no(e=void 0,t=void 0){function n(){if(!t||typeof t.get!="function")return null;let i=t.get();return i&&i.order?i.order:{}}function r(i,s,l){let a=e&&e.snapshotFor?e.snapshotFor(i).slice():[];if(s==="closed")return a.sort(Ic),a;switch(l){case"created_desc":return a.sort(Io),a;case"created_asc":return a.sort(Cc),a;case"updated_desc":return a.sort(Rc),a;case"priority":return a.sort(Oc),a;case"manual":default:{let u=n();return u?a.sort(Dc(u)):a.sort(Io),a}}}function o(i){let s=[];return e&&typeof e.subscribe=="function"&&s.push(e.subscribe(i)),t&&typeof t.subscribe=="function"&&s.push(t.subscribe(i)),()=>{for(let l of s)try{l()}catch{}}}return{selectBoardColumn:r,subscribe:o}}function ur(e){if(!e)return null;if(typeof e=="number")return Number.isFinite(e)?e:null;let t=Date.parse(e);return Number.isFinite(t)?t:null}function nn(e){let t=ur(e);if(t===null)return"";let n=new Date(t),r=o=>String(o).padStart(2,"0");return`${n.getFullYear()}-${r(n.getMonth()+1)}-${r(n.getDate())} ${r(n.getHours())}:${r(n.getMinutes())}`}function _n(e,t){let n=ur(e);if(n===null)return"";let o=(typeof t=="number"?t:Date.now())-n;if(o<6e4)return"\uBC29\uAE08";let i=Math.floor(o/6e4);if(i<60)return`${i}\uBD84 \uC804`;let s=Math.floor(o/36e5);if(s<24)return`${s}\uC2DC\uAC04 \uC804`;let l=Math.floor(o/864e5);if(l<7)return`${l}\uC77C \uC804`;let a=Math.floor(l/7);if(l<30)return`${a}\uC8FC \uC804`;let u=Math.floor(l/30);return u<12?`${u}\uAC1C\uC6D4 \uC804`:`${Math.floor(l/365)}\uB144 \uC804`}function zc(e){if(!Array.isArray(e))return null;let t=null,n=-1;for(let r of e){if(!r||r.status!=="in_progress")continue;let o=ur(r.updated_at)??0;if(t===null||o>n){t=r,n=o;continue}o===n&&String(r.id)<String(t.id)&&(t=r)}return t}function qs(e){let t=e&&e.parent;return typeof t=="string"?t:t&&t.id?String(t.id):""}function Ns(e){let t=new Map;for(let r of e)r&&r.id&&!t.has(r.id)&&t.set(r.id,r);let n=new Map;for(let r of t.values()){let o=qs(r);if(!o)continue;let i=n.get(o);i||(i=[],n.set(o,i)),i.push({id:r.id,title:r.title,status:r.status,metadata:r.metadata,workflow:r.workflow,created_at:r.created_at,updated_at:r.updated_at})}return n}function js(e,t){let n=e.get(t)||[],r=0;for(let i of n)(i.status==="resolved"||i.status==="closed")&&(r+=1);let o=zc(n);return{total:n.length,count:r,current:o,children:n}}function Hc(e){let t=e.transport,n=e.uiOrderStore;function r(s,l){return"renormalize"in s?s.renormalize:[{bead_id:l,rank:s.rank}]}function o(s,l){let a={...s.order};for(let u of l)a[u.bead_id]=u.rank;n&&n.set({revision:s.revision,order:a})}async function i(s,l,a){if(!t||!n)return;let u=n.get()||{revision:0,order:{}},d=r(va(l,a,u.order),s);o(u,d);let p=await t("ui-order-set",{expected_revision:u.revision,entries:d});if(p&&p.conflict){let _={revision:typeof p.revision=="number"?p.revision:0,order:p.order||{}};n.set(_);let m=r(va(l,a,_.order),s);o(_,m);let y=await t("ui-order-set",{expected_revision:_.revision,entries:m});y&&y.applied&&n.set({revision:typeof y.revision=="number"?y.revision:0,order:y.order||{}})}else p&&p.applied&&n.set({revision:typeof p.revision=="number"?p.revision:0,order:p.order||{}})}return{applyReorder:i}}function Kc(e){if(typeof e!="string")return"";let t=e.indexOf("-");return t>0?e.slice(0,t):""}function Jn(e,t){let n=Kc(e),r=Kc(t);return n.length===0||r.length===0?!1:n!==r}function Fs(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function $a(e,t){return!t||typeof e!="string"||e.length===0||Fs(t.visible_labels).includes(e)?!0:Fs(t.hidden_labels).includes(e)?!1:!Fs(t.hidden_prefixes).some(n=>n.length>0&&e.startsWith(n))}function Gc(e,t){return Fs(e).filter(n=>$a(n,t))}function dr(e,t){let n=e&&e.chips?e.chips[t]:void 0;return typeof n=="boolean"?n:!0}function fm(e){switch(e){case"in_progress":return"board-card__dot board-card__dot--progress";case"resolved":return"board-card__dot board-card__dot--resolved";case"closed":return"board-card__dot board-card__dot--closed";case"blocked":return"board-card__dot board-card__dot--blocked";default:return"board-card__dot"}}function _m(e,t,n,r,o){return c`<button
    type="button"
    class="board-card__roll-toggle"
    data-roll-parent=${e}
    aria-expanded=${r?"true":"false"}
    @click=${o}
  >
    children ${t}/${n} ${r?"\u25B4":"\u25BE"}
  </button>`}function mm(e,t,n,r){return c`<button
    type="button"
    class="board-card__roll-child"
    data-child-id=${e.id}
    @click=${r?o=>r(o,e.id):void 0}
  >
    <span class=${fm(e.status)}>●</span>
    <span class="board-card__roll-child-ord">${t}</span>
    <span class="board-card__roll-child-title">${e.title||e.id}</span>
    ${n}
  </button>`}function Bs(e,t){let n=e.total||0,r=!!t.expanded,o=t.trailing??"",i=typeof t.empty_label=="string"&&t.empty_label.length>0?t.empty_label:null;if(n===0&&i===null)return"";let s=Array.isArray(e.children)?e.children:[],l=n>0?s.slice().sort(Pc):s;return c`
    <div class="board-card__roll">
      <div class="board-card__roll-meta">
        ${n>0?_m(t.parent_id,e.count,n,r,t.onToggle):c`<span class="board-card__roll-none">${i}</span>`}
        ${o}
      </div>
      ${n>0&&e.current?c`<div class="board-card__roll-current">
            └
            <span class="board-card__cur-child"
              >● ${e.current.title||e.current.id}</span
            >
          </div>`:""}
      ${r&&n>0?c`<div class="board-card__roll-list">
            ${l.map((a,u)=>mm(a,u+1,t.childChips?t.childChips(a):null,t.onChildClick))}
          </div>`:""}
    </div>
  `}var gm={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"mrg",close:"mrg"},Vc={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"merge",close:"close"},Yc={quick_fix:["impl","close"],spec_backed:["spec","impl","pr","merge"],full_plan:["spec","plan","impl","pr","merge"]},hm={review:"\u2713",skip:"\u2298"},pr={none:"\uBBF8\uB3C4\uB2EC",dim:"\uC9C4\uD589 \uC911",stale:"\uC7AC\uAC80\uD1A0 \uD544\uC694",review:"\uAC80\uD1A0 \uC644\uB8CC",skip:"\uAC80\uD1A0 \uC0DD\uB7B5",done:"\uC644\uB8CC"};function bm(e,t,n){if(!(n==="in_progress"||n==="resolved"))return null;for(let o of e){let i=t[o];if(i&&i.fill==="dim"&&i.stale!==!0)return o}return null}function Qc(e){let t=e&&e.fill||"none";return t==="none"?pr.none:e&&e.stale===!0?pr.stale:t==="dim"?pr.dim:e&&e.glyph==="review"?pr.review:e&&e.glyph==="skip"?pr.skip:pr.done}function ym(e){if(!e||e.fill==="none"||!e.approval_state)return Qc(e);let t=[];return e.glyph==="review"?t.push(pr.review):e.glyph==="skip"&&t.push(pr.skip),e.approval_state==="missing"?t.push("\uC2B9\uC778 \uD544\uC694"):e.approval_state==="stale"?t.push("\uC7AC\uC2B9\uC778 \uD544\uC694"):e.approval_state==="unknown"?t.push("\uC2B9\uC778 \uD655\uC778 \uBD88\uAC00"):t.push("\uC2B9\uC778 \uC644\uB8CC"),t.join(" \xB7 ")}function vm(e,t,n,r){let o=gm[e]||e,i=t&&t.fill||"none",s=!!t&&t.stale===!0,l=hm[t&&t.glyph||""]||"",a="bar";i==="dim"?a+=` b-${o} dim`:i==="full"&&(a+=` b-${o} full`),s&&(a+=" stale"),n&&(a+=" cur");let u=i==="none"?"lbl":`lbl l-${o} on`,d=n?`color: var(--stage-${o}-on)`:"",p=Vc[e]||e,_=r?Xc(t):null;if(!_)return c`
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
  `}function Xc(e){let t=e?e.doc:null;return!t||typeof t.path!="string"||t.path.length===0?null:t}function Us(e,t,n={}){if(!e||!e.stages)return"";let r=n.onOpenDoc,o=Yc[e.route]||Yc.spec_backed,i=e.stages,s=bm(o,i,String(t||"open")),l=`\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uC9C4\uD589: ${o.map(u=>`${Vc[u]||u} ${u==="plan"?ym(i[u]||{}):Qc(i[u]||{})}`).join(" \xB7 ")}`,a=!!r&&o.some(u=>Xc(i[u]||{})!==null);return c`
    <div
      class="stp"
      role=${a?"group":"img"}
      aria-label=${l}
    >
      ${o.map(u=>vm(u,i[u]||{},u===s,r))}
    </div>
  `}function km(e){return typeof e!="number"||!Number.isFinite(e)?"":`P${Math.max(0,Math.min(4,e))}`}var Zc=2;function Jc(e){let t=e.slice(0,Zc).join(", "),n=e.length-Zc;return`\u26D3 blocked: ${t}${n>0?` +${n}`:""}`}function wm(e,t){if(!t)return[];let n=[],r=Array.isArray(t.blockers)?t.blockers:[],o=[],i=[];for(let s of r)(Jn(e,s)?i:o).push(s);return o.length>0&&n.push(c`<span class="ctl-chip ctl-chip--blocked-dep"
        >${Jc(o)}</span
      >`),i.length>0&&n.push(c`<span class="ctl-chip ctl-chip--blocked-foreign"
        >${Jc(i)}</span
      >`),n}function $m(e){if(!e||typeof e!="object")return null;let t=e.awaiting_user;if(typeof t!="string")return null;let n=t.trim();return n.length===0?null:c`<span class="ctl-chip ctl-chip--blocked"
    >${`\u23F8 \uC0AC\uC6A9\uC790 \uB9AC\uBDF0 \uD544\uC694: ${n}`}</span
  >`}function xa(e){return e==="delegated"?"\uC704\uC784":e==="main"?"\uBA54\uC778":null}function Ws(e){return e.effort?`${e.actor}:${e.effort}`:e.actor}function er(e){return`${e.kind}:${Ws(e)}@${e.sha}`}function zs(e,t){if(!e)return null;let n=xa(e.kind),r=e.reason,o=e.kind==="delegated"?r===null:typeof r=="string"&&r.trim().length>0&&!/[\r\n]/.test(r);if(!n||!o)return null;let i=xa(t?.kind),s=i!==null&&t?.kind!==e.kind,l=`\uACC4\uD68D \xB7 ${n}${s?` \u2192 ${i}`:""}`,a=`planned_execution ${e.kind}${typeof r=="string"?`:${r}`:""}`,u=t?` \xB7 exec_receipt ${er(t)}`:"";return{kind:e.kind,label:l,title:`${a}${u}`}}function eu(e,t){let n=zs(e,t);return n?c`<span
        class="ctl-chip ctl-chip--planned"
        data-kind=${n.kind}
        title=${n.title}
        >${n.label}</span
      >`:null}function xm(e){if(!e)return null;let t=xa(e.kind);return t?c`<span
    class="ctl-chip ctl-chip--exec-receipt"
    title=${`exec_receipt ${er(e)}`}
    >${`\uC2E4\uD589 \xB7 ${t}`}</span
  >`:null}function Am(e,t){let n=t.policy||null,r=e.workflow&&e.workflow.chips||{},o=[];if(r.route&&dr(n,"route")){let l=r.route_source==="derived";o.push(c`<span
        class="ctl-chip ctl-chip--route${l?" is-derived":""}"
        title=${l?"route \uBBF8\uD540 (metadata unset)":"route"}
        >${l?"unset":r.route}</span
      >`)}if(r.fast_track&&dr(n,"fast_track")&&o.push(c`<span class="ctl-chip ctl-chip--ft">⚡ fast_track</span>`),r.pr&&dr(n,"pr")){let l=r.pr.number;o.push(c`<span class="ctl-chip ctl-chip--pr"
        >${`PR${l!=null?` #${l}`:""}`}</span
      >`)}let i=eu(r.planned_execution,r.exec_receipt);if(i&&o.push(i),r.exec_receipt){let l=r.exec_receipt;o.push(c`<span
        class="ctl-chip ctl-chip--exec-receipt"
        title=${`exec_receipt ${er(l)}`}
        >${`exec ${l.kind==="delegated"?Ws(l):`main:${l.actor}`} \xB7 ${l.sha.slice(0,7)}`}</span
      >`)}if(r.impl_entry){let l=r.impl_entry;o.push(c`<span
        class="ctl-chip ctl-chip--impl-entry"
        title=${`impl_entry ${l.actor}@${l.sha}`}
        >${`impl ${l.actor} \xB7 ${l.sha.slice(0,7)}`}</span
      >`)}for(let l of Gc(e.labels,n))o.push(c`<span class="ctl-chip ctl-chip--label">${l}</span>`);if(e.from_id&&dr(n,"from")&&o.push(c`<button
        type="button"
        class="ctl-chip ctl-chip--from"
        title=${`\uCD9C\uCC98 ${e.from_id} \uC5F4\uAE30`}
        @click=${l=>{l.stopPropagation(),t.onFromChipClick&&t.onFromChipClick(l,String(e.from_id))}}
      >
        ↩ from ${e.from_id}
      </button>`),dr(n,"blocked")){let l=$m(e.metadata);l&&o.push(l),o.push(...wm(e.id,e.blocked_info))}return t.cleanupFailureFor&&t.cleanupFailureFor(e.id)&&dr(n,"blocked")&&o.push(c`<span class="ctl-chip ctl-chip--cleanup">⚠ 정리 멈춤</span>`),o.length===0?"":c`<div class="board-card__chips">${o}</div>`}function Sm(e){let t=_n(e.created_at),n=_n(e.updated_at);return!t&&!n?"":c`<span class="board-card__times">
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
  </span>`}function Em(e,t){let n=t.rollupFor?t.rollupFor(e.id):{total:0,count:0,current:null,children:[]};return Bs(n,{parent_id:e.id,expanded:t.isExpanded?t.isExpanded(e.id):!0,trailing:Sm(e),empty_label:"children \uC5C6\uC74C",childChips:Aa,onToggle:r=>t.onRollupToggle&&t.onRollupToggle(r,e.id),onChildClick:(r,o)=>t.onChildClick&&t.onChildClick(r,o)})}function Aa(e){let t=e?.workflow?.chips?.planned_execution,n=e?.workflow?.chips?.exec_receipt;return zs(t,n)?c`<span class="board-card__roll-child-chips">
    ${eu(t,n)}
    ${xm(n)}
  </span>`:null}function Hs(e,t){let n=km(e.priority);return c`
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
      ${Am(e,t)}
      ${e.workflow&&dr(t.policy||null,"stepper")?Us(e.workflow,e.status,{onOpenDoc:t.onOpenDoc}):""}
      ${Em(e,t)}
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
              ${pc.map(i=>c`<option
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
        ${e.items.map(i=>Hs(i,t))}
      </div>
    </section>
  `}function tu(e,t,n){return c`
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
          ${e.items.length===0?c`<div class="deferred-popup__empty">Deferred 이슈 없음</div>`:e.items.map(r=>Hs(r,t))}
        </div>
      </div>
    </dialog>
  `}var Tm=[{value:"",label:"\uC6B0\uC120\uC21C\uC704"},{value:"0",label:"P0"},{value:"1",label:"P1"},{value:"2",label:"P2"},{value:"3",label:"P3"},{value:"4",label:"P4"}],Cm=[{value:"",label:"\uD0C0\uC785"},{value:"bug",label:"bug"},{value:"feature",label:"feature"},{value:"task",label:"task"},{value:"epic",label:"epic"},{value:"chore",label:"chore"}],Rm=[{value:"created_desc",label:"\uC0DD\uC131 \uCD5C\uC2E0\uC21C"},{value:"created_asc",label:"\uC0DD\uC131 \uC624\uB798\uB41C\uC21C"},{value:"updated_desc",label:"\uC218\uC815 \uCD5C\uC2E0\uC21C"},{value:"priority",label:"\uC6B0\uC120\uC21C\uC704\uC21C"},{value:"manual",label:"\uC218\uB3D9(\uB4DC\uB798\uADF8)"}];function Om(e,t,n){let r=e.labels.length,o=r>0?`\uB77C\uBCA8 ${r}`:"\uB77C\uBCA8";return c`
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
  `}function nu(e,t,n){return c`
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
        ${Tm.map(r=>c`<option
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
        ${Cm.map(r=>c`<option
              value=${r.value}
              ?selected=${e.type===r.value}
            >
              ${r.label}
            </option>`)}
      </select>
      ${Om(e,t,n)}
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
        ${Rm.map(r=>c`<option
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
  `}var Im=200,Lm={"ready-col":"open","in-progress-col":"in_progress","resolved-col":"resolved","closed-col":"closed"},Pm=new Set(["blocked-col","ready-col","in-progress-col","resolved-col"]),ru="beads-ui.board.sort",ou=new Set(["created_desc","created_asc","updated_desc","priority","manual"]);function Dm(){try{let e=window.localStorage.getItem(ru);if(e&&ou.has(e))return e}catch{}return"created_desc"}function su(e,t){let n=Wt("views:board"),r=t.gotoIssue,o=t.issueStores,i=t.transport,s=t.uiOrderStore,l=t.displayPolicyStore,a=t.workerQueueStore,u=t.onClosedRangeChange,d=t.onNewIssue,p=t.openDoc,_=t.closedRange||Is,m=o?no(o,s):null,y=Hc({transport:i,uiOrderStore:s}),C=[],O=[],V=[],te=[],W=[],q=[],I=!1,P=0,U=Dm(),Y=new Map,N=new Map,j=new Map,z=new Set,K={search:"",priority:"",type:"",labels:[]},oe=!1,ve=null;function Ne(ce){return String(ce.status||"open")==="open"}function F(ce){return String(ce.status||"open")==="open"}function X(ce){let be=K.search.trim().toLowerCase(),Ge=K.priority,rt=K.type,Re=K.labels;return ce.filter(E=>{if(be){let L=String(E.id||"").toLowerCase(),ne=String(E.title||"").toLowerCase();if(!L.includes(be)&&!ne.includes(be))return!1}if(Ge!==""&&String(E.priority)!==Ge||rt!==""&&String(E.issue_type||"")!==rt)return!1;if(Re.length>0){let L=Array.isArray(E.labels)?E.labels:[];if(!Re.some(ne=>L.includes(ne)))return!1}return!0})}function Ae(){let ce=new Set;for(let be of[C,O,V,te,W,q])for(let Ge of be){let rt=Array.isArray(Ge.labels)?Ge.labels:[];for(let Re of rt)typeof Re=="string"&&Re.length>0&&ce.add(Re)}return Array.from(ce).sort()}function Ee(){return K.search.trim()!==""||K.priority!==""||K.type!==""||K.labels.length>0}function R(){try{if(m){let ce=m.selectBoardColumn("tab:board:in-progress","in_progress",U),be=m.selectBoardColumn("tab:board:blocked","blocked",U).filter(F),Ge=new Set(ce.map(De=>De.id)),rt=m.selectBoardColumn("tab:board:ready","ready",U).filter(De=>Ne(De)&&!Ge.has(De.id)),Re=m.selectBoardColumn("tab:board:resolved","resolved",U),E=m.selectBoardColumn("tab:board:deferred","deferred",U),L=m.selectBoardColumn("tab:board:closed","closed").slice(0,Im),ne=[...be,...rt,...ce,...Re,...L];se(ne);let fe=new Set;for(let De of ne)De&&De.id&&!qs(De)&&fe.add(De.id);let _e=!Ee();C=_e?Lo(be,fe):be,O=_e?Lo(rt,fe):rt,V=_e?Lo(ce,fe):ce,te=_e?Lo(Re,fe):Re,W=E,P=E.length,q=_e?Lo(L,fe):L,Y=new Map;for(let De of C)Y.set(De.id,"open");for(let De of O)Y.set(De.id,"open");for(let De of V)Y.set(De.id,"in_progress");for(let De of te)Y.set(De.id,"resolved");for(let De of W)Y.set(De.id,"deferred");for(let De of q)Y.set(De.id,"closed");N=new Map;for(let De of C)N.set(De.id,"blocked-col");for(let De of O)N.set(De.id,"ready-col");for(let De of V)N.set(De.id,"in-progress-col");for(let De of te)N.set(De.id,"resolved-col");for(let De of q)N.set(De.id,"closed-col")}Le()}catch{C=[],O=[],V=[],te=[],W=[],q=[],j=new Map,Le()}}function se(ce){j=Ns(ce)}function ye(ce){return js(j,ce)}function ke(ce){return!z.has(ce)}function Me(ce,be){ce.preventDefault(),ce.stopPropagation(),z.has(be)?z.delete(be):z.add(be),Le()}function he(ce,be){ce.preventDefault(),ce.stopPropagation(),r(be)}function Ie(ce,be){ce.preventDefault(),ce.stopPropagation(),r(be)}function Ze(ce,be){ve||r(be)}function ut(ce,be){ce.preventDefault(),ce.stopPropagation(),Mm(be).then(Ge=>{Ge&&ge("\uBCF5\uC0AC\uB428","success",1200)})}function G(ce,be){ve=be,ce.dataTransfer&&(ce.dataTransfer.setData("text/plain",be),ce.dataTransfer.effectAllowed="move"),ce.target.classList.add("board-card--dragging")}function J(ce){ce.target.classList.remove("board-card--dragging"),Bt(),setTimeout(()=>{ve=null},0)}function re(ce){let be=String(ce.target.value||"");!be||be===_||(_=be,u&&u(be),Le())}function pe(){return l?l.get():null}function Se(ce){let be=a?a.get():null,Ge=be?be.cleanup_failed:null;if(!Ge||typeof Ge!="object"||Array.isArray(Ge))return null;let rt=Ge[ce];return!rt||typeof rt!="object"||Array.isArray(rt)?null:rt}let me={onCardClick:Ze,onCopyId:ut,onDragStart:G,onDragEnd:J,onClosedRangeChange:re,rollupFor:ye,isExpanded:ke,onRollupToggle:Me,onChildClick:he,onFromChipClick:Ie,onOpenDoc:p?(ce,be)=>p(be):void 0,cleanupFailureFor:Se,get policy(){return pe()}};function je(ce,be){ve||(Ke(),r(be))}function Be(ce,be){ce.preventDefault(),ce.stopPropagation(),Ke(),r(be)}let Qe={...me,onCardClick:je,onChildClick:Be,onFromChipClick:Be,onOpenDoc:p?(ce,be)=>{Ke(),p(be)}:void 0,get policy(){return pe()}};function He(ce){let be=ce.target,Ge=e.querySelector(".board-filter__labels");be&&Ge&&Ge.contains(be)||xe()}function ee(ce){ce.key==="Escape"&&xe()}function Q(){oe||(oe=!0,document.addEventListener("mousedown",He),document.addEventListener("keydown",ee),Le())}function xe(){oe&&(oe=!1,document.removeEventListener("mousedown",He),document.removeEventListener("keydown",ee),Le())}function _t(ce){ce.key==="Escape"&&Ke()}function pt(){I||(I=!0,document.addEventListener("keydown",_t),Le())}function Ke(){I&&(I=!1,document.removeEventListener("keydown",_t),Le())}let et={onClose:Ke,onOverlayClick(ce){ce.target===ce.currentTarget&&Ke()}},x={onSearchInput(ce){K.search=String(ce.target.value||""),R()},onPriorityChange(ce){K.priority=String(ce.target.value||""),R()},onTypeChange(ce){K.type=String(ce.target.value||""),R()},onSortChange(ce){let be=String(ce.target.value||"");if(!(!ou.has(be)||be===U)){U=be;try{window.localStorage.setItem(ru,be)}catch{}R()}},onDeferredToggle(){I?Ke():pt()},onLabelMenuToggle(){oe?xe():Q()},onLabelToggle(ce){let be=K.labels.indexOf(ce);be===-1?K.labels.push(ce):K.labels.splice(be,1),R()},onLabelClear(){K.labels.length!==0&&(K.labels=[],R())},onNewIssue(){d&&d()}};function Z(){return c`
      <div class="board-view">
        ${nu(K,x,{sort_mode:U,deferred_popup_open:I,deferred_count:P,label_options:Ae(),label_menu_open:oe})}
        <div class="board-root">
          ${ro({title:"Blocked",id:"blocked-col",items:X(C)},me)}
          ${ro({title:"Ready",id:"ready-col",items:X(O)},me)}
          ${ro({title:"In progress",id:"in-progress-col",items:X(V)},me)}
          ${ro({title:"Resolved",id:"resolved-col",items:X(te)},me)}
          ${ro({title:"Closed",id:"closed-col",items:X(q),is_closed:!0,closed_range:_},me)}
        </div>
        ${I?tu({items:X(W),count:P},Qe,et):""}
      </div>
    `}function Le(){dt(Z(),e),Ye()}function Ye(){try{let ce=e.querySelector("#deferred-popup");ce&&!ce.open&&(typeof ce.showModal=="function"?ce.showModal():ce.setAttribute("open",""));let be=Array.from(e.querySelectorAll(".board-column, .deferred-popup__body"));for(let Ge of be)Array.from(Ge.querySelectorAll(".board-card")).forEach((Re,E)=>{Re.tabIndex=E===0?0:-1})}catch{}}async function tt(ce,be){if(!i){ge("\uC5F0\uACB0\uB418\uC9C0 \uC54A\uC544 \uC0C1\uD0DC\uB97C \uBCC0\uACBD\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error");return}try{await i("update-status",{id:ce,status:be}),ge("\uC0C1\uD0DC \uBCC0\uACBD\uB428","success",1500)}catch(Ge){n("update-status failed: %o",Ge),ge("\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328","error")}}function Ce(ce){switch(ce){case"blocked-col":return C;case"ready-col":return O;case"in-progress-col":return V;case"resolved-col":return te;default:return[]}}function Je(ce,be,Ge){if(!i||!s)return;let rt=Ce(ce),Re=rt.find(_e=>_e.id===be);if(!Re)return;let E=rt.filter(_e=>_e.id!==be),L=Ge.closest?Ge.closest(".board-card"):null,ne=E.length;if(L){let _e=L.getAttribute("data-issue-id");if(_e===be)return;let De=E.findIndex(yt=>yt.id===_e);De>=0&&(ne=De)}let fe=E.slice();fe.splice(ne,0,Re),y.applyReorder(be,fe,ne)}function Bt(){for(let ce of Array.from(e.querySelectorAll(".board-column--drag-over")))ce.classList.remove("board-column--drag-over")}let kt=null;e.addEventListener("dragover",ce=>{ce.preventDefault(),ce.dataTransfer&&(ce.dataTransfer.dropEffect="move");let Ge=ce.target.closest(".board-column");Ge&&Ge!==kt&&(kt&&kt.classList.remove("board-column--drag-over"),Ge.classList.add("board-column--drag-over"),kt=Ge)}),e.addEventListener("dragleave",ce=>{let be=ce.relatedTarget;(!be||!e.contains(be))&&kt&&(kt.classList.remove("board-column--drag-over"),kt=null)}),e.addEventListener("drop",ce=>{ce.preventDefault(),kt&&(kt.classList.remove("board-column--drag-over"),kt=null);let be=ce.target,Ge=be.closest(".board-column");if(!Ge)return;let rt=ce.dataTransfer?.getData("text/plain")||"";if(!rt)return;let Re=Ge.id,E=N.get(rt);if(E&&E===Re){if(Pm.has(Re)){if(U!=="manual"){ge("\uC218\uB3D9(\uB4DC\uB798\uADF8) \uC815\uB82C \uBAA8\uB4DC\uC5D0\uC11C\uB9CC \uC21C\uC11C\uB97C \uBC14\uAFC0 \uC218 \uC788\uC2B5\uB2C8\uB2E4","warning",2e3);return}Je(Re,rt,be)}return}let L=Lm[Re];if(!L){ge("\uC5EC\uAE30\uB85C\uB294 \uC62E\uAE38 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","warning",1500);return}Y.get(rt)!==L&&tt(rt,L)}),e.addEventListener("keydown",ce=>{let be=ce.target;if(!(be instanceof HTMLElement))return;let Ge=String(be.tagName||"").toLowerCase();if(Ge==="input"||Ge==="textarea"||Ge==="select"||Ge==="button"||Ge==="a"||be.isContentEditable===!0)return;let rt=be.closest(".board-card");if(!rt)return;let Re=String(ce.key||"");if(Re==="Enter"||Re===" "){ce.preventDefault();let fe=rt.getAttribute("data-issue-id");fe&&r(fe);return}if(Re!=="ArrowUp"&&Re!=="ArrowDown"&&Re!=="ArrowLeft"&&Re!=="ArrowRight")return;ce.preventDefault();let E=rt.closest(".board-column");if(!E)return;let L=Array.from(E.querySelectorAll(".board-card")),ne=L.indexOf(rt);if(Re==="ArrowDown"&&ne<L.length-1){ht(rt,L[ne+1]);return}if(Re==="ArrowUp"&&ne>0){ht(rt,L[ne-1]);return}if(Re==="ArrowLeft"||Re==="ArrowRight"){let fe=Array.from(e.querySelectorAll(".board-column")),_e=fe.indexOf(E),De=Re==="ArrowRight"?1:-1,yt=_e+De;for(;yt>=0&&yt<fe.length;){let xt=fe[yt].querySelector(".board-card");if(xt){ht(rt,xt);return}yt+=De}}});function ht(ce,be){try{ce.tabIndex=-1,be.tabIndex=0,be.focus()}catch{}}let Dt=null;m&&m.subscribe&&(Dt=m.subscribe(()=>{try{R()}catch{}}));let Rt=null;l&&l.subscribe&&(Rt=l.subscribe(()=>{try{R()}catch{}}));let Mt=null;return a&&a.subscribe&&(Mt=a.subscribe(()=>{Le()})),{async load(){n("load"),R()},clear(){xe(),Ke(),Dt&&(Dt(),Dt=null),Rt&&(Rt(),Rt=null),Mt&&(Mt(),Mt=null),e.replaceChildren(),C=[],O=[],V=[],te=[],W=[],q=[],Y=new Map,N=new Map}}}function Lo(e,t){return e.filter(n=>{let r=qs(n);return!(r&&t.has(r))})}async function Mm(e){try{if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")return await navigator.clipboard.writeText(String(e)),!0;let t=document.createElement("textarea");t.value=String(e),t.style.position="fixed",t.style.left="-9999px",document.body.appendChild(t),t.select();let n=!1;try{n=document.execCommand("copy")}finally{t.remove()}return n}catch{return!1}}var pn=e=>e??Kt;function En(e){return[typeof e.runner=="string"?e.runner:null,typeof e.model=="string"?e.model:null,typeof e.effort=="string"?e.effort:null,e.speed==="fast"?"Fast":null].filter(Boolean).join(" \xB7 ")}function Po(e){return typeof e.resumed_from!="string"||e.resumed_from.length===0?null:`${e.continuation_mode==="session"?"session \uC774\uC5B4\uBC1B\uC74C":e.continuation_mode==="fresh"?"\uC0C8 session\uC73C\uB85C \uC774\uC5B4\uBC1B\uC74C":"\uC774\uC804 attempt\uC5D0\uC11C \uC774\uC5B4\uBC1B\uC74C"} (from ${e.resumed_from})`}async function mn(e){let t=String(e);if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")try{return await navigator.clipboard.writeText(t),!0}catch{}try{let n=document.createElement("textarea");n.value=t,n.style.position="fixed",n.style.left="-9999px",document.body.appendChild(n),n.select();let r=!1;try{r=document.execCommand("copy")}finally{n.remove()}return r}catch{return!1}}var qm=["workflow_mode","spec_review_model","spec_review_effort","spec_review_speed","plan_review_model","plan_review_effort","plan_review_speed","impl_review_model","impl_review_effort","impl_review_speed","impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed","quick_fix_impl_dispatch","quick_fix_impl_runtime","quick_fix_impl_model","quick_fix_impl_effort","quick_fix_impl_speed","orchestration_model","orchestration_effort","orchestration_speed","quick_fix_orchestration_model","quick_fix_orchestration_effort","quick_fix_orchestration_speed"],cu=["orchestration_model","orchestration_effort","orchestration_speed"],uu=["quick_fix_orchestration_model","quick_fix_orchestration_effort","quick_fix_orchestration_speed"],Nm=[...cu,...uu],iu={quick_fix_impl_dispatch:"impl_dispatch",quick_fix_impl_runtime:"impl_runtime",quick_fix_impl_model:"impl_model",quick_fix_impl_effort:"impl_effort",quick_fix_impl_speed:"impl_speed",quick_fix_orchestration_model:"orchestration_model",quick_fix_orchestration_effort:"orchestration_effort",quick_fix_orchestration_speed:"orchestration_speed"},au={spec_review_effort:"spec_review_model",plan_review_effort:"plan_review_model",impl_review_effort:"impl_review_model"},lu={spec_review_speed:"spec_review_model",plan_review_speed:"plan_review_model",impl_review_speed:"impl_review_model"},jm=new Set(["native-fixed-posture","unsupported","claude-runner-model-default","catalog-validated","provider-tier-or-runtime-model-default","actual-effort"]);function en(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function Ct(e){return typeof e=="string"&&e.length>0?e:null}function oo(e){return e.startsWith("gpt-")?e.slice(4):e}function gt(e,t,n,r,o){return{value:e,source:t,display:n,full_value:r,resolution:o}}function du(e,t,n){let r=Ct(t[e]);if(r!==null)return{value:r,source:"pin"};let o=Ct(n[e]);return o===null?null:{value:o,source:"global"}}function fr(e,t,n,r){return du(e,t,n)||{value:r,source:"base"}}function Sa(e,t,n,r){let o=n?.implementation?.model_catalog;if(t&&en(o?.[t])){let s=Ct(o[t][e]);if(s!==null)return s}if(t&&Array.isArray(o?.[t])&&o[t].includes(e))return e;if(!t&&en(o)){for(let s of Object.values(o))if(en(s)){let l=Ct(s[e]);if(l!==null)return l}else if(Array.isArray(s)&&s.includes(e))return e}let i=r?.model_index?.[e];return Ct(r?.runners?.[i]?.models?.[e]?.id)||e}function Fm(e,t){return Ct(t?.review?.reviewers?.[e]?.model)||e}function Pn(e,t,n=!1){if(e==="default")return gt(e,t,`default (\uC77C\uBC18 \xB7 ${t==="pin"?"\uD540":"\uC804\uC5ED \uACE0\uC815"})`,e,"explicit");let r=n?oo(e):e;return gt(e,t,r,e,"explicit")}function pu(e,t,n){let r=t?.implementation?.model_catalog?.[e],o=[];en(r)?o.push(...Object.keys(r)):Array.isArray(r)&&o.push(...r.filter(s=>typeof s=="string"));let i=n?.runners?.[e]?.models;if(en(i))for(let s of Object.keys(i))o.includes(s)||o.push(s);return o}function Bm(e,t){let n=[],r=e?.implementation?.model_catalog;en(r)&&n.push(...Object.keys(r));let o=t?.runners;if(en(o))for(let i of Object.keys(o))n.includes(i)||n.push(i);return n}function Um(e,t,n){if(e===null)return{runtime:null,offered:!1};let r=!1;for(let o of Bm(t,n)){let i=pu(o,t,n);if(i.length>0&&(r=!0),i.includes(e))return{runtime:o,offered:!0}}return{runtime:null,offered:r}}function Ks(e){return gt(e.value,e.source,`${e.value} (\uBE44\uD638\uD658)`,e.value,"incompatible")}function Ea(e,t,n){let r=du(e,t,n);return r?Pn(r.value,r.source):gt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable")}function Tn(e){let t=en(e.pin)?e.pin:{},n=en(e.global)?e.global:{},r=en(e.execution_defaults)?e.execution_defaults:null,o=r?.supported===!0&&en(r.session)?r.session:null,i=r?.supported===!0&&en(r.orchestration)?r.orchestration:null,s=en(e.runner_catalog)?e.runner_catalog:null,l=Ct(n.quick_fix_impl_model),a=Um(l,o,s),u={};if(o){let d=fr("workflow_mode",t,n,Ct(o.workflow_mode_default));u.workflow_mode=d.source==="base"?gt(d.value,"base",d.value||"\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",d.value,"default"):Pn(d.value,d.source);for(let W of["spec_review","plan_review","impl_review"]){let q=`${W}_model`,I=Ct(W==="plan_review"?d.value==="fast_track"?o.plan_review?.fast_track_default:o.plan_review?.standard_recommended:o.review?.default),P=fr(q,t,n,I);if(P.value===null)u[q]=gt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable");else if(P.value!=="self"&&P.value!=="skip"&&!en(o.review?.reviewers?.[P.value]))u[q]=Ks(gt(P.value,P.source,"",null,"explicit"));else{let U=Fm(P.value,o);u[q]=gt(P.value,P.source,oo(U),U,P.source==="base"?"default":"explicit")}}for(let[W,q]of Object.entries(au)){let I=u[q].value;if(I==="self"||I==="skip"){u[W]=gt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable");continue}let P=Ct(o.review?.reviewers?.[I||""]?.effort),U=fr(W,t,n,P);u[W]=U.value===null?gt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"):gt(U.value,U.source,U.value,U.value,U.source==="base"?"default":"explicit")}for(let[W,q]of Object.entries(lu)){let I=u[q];if(I.resolution==="incompatible"||I.value==="self"||I.value==="skip"){u[W]=gt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable");continue}if(I.resolution==="unavailable"){u[W]=gt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable");continue}let P=fr(W,t,n,"default");u[W]=P.source==="base"?gt("default","base","default (\uC77C\uBC18)","default","default"):Pn(P.value,P.source)}let p=en(o.implementation?.default)?o.implementation.default:{},_=Ct(e.route),m=_!==null&&["quick_fix","spec_backed","full_plan"].includes(_),y=en(o.implementation?.route_defaults)?o.implementation.route_defaults:{},C=m&&en(y[_])?y[_]:{},O={},V=!1;if(_==="quick_fix"){let W=Ct(t.impl_runtime),q=Ct(n.quick_fix_impl_runtime),I=W||q,P=I==="inherit"?Ct(e.controller_runtime):I;V=l!==null&&a.runtime!==null&&(I===null||P===a.runtime);let U=Ct(t.impl_dispatch),Y=Ct(n.quick_fix_impl_dispatch);if(U!==null)u.impl_dispatch=Pn(U,"pin"),O.impl_dispatch="pin";else if(Y!==null)u.impl_dispatch=Pn(Y,"global"),O.impl_dispatch="quick_fix";else if(V)u.impl_dispatch=gt("delegated","global","\uC704\uC784 (\uBAA8\uB378 \uD568\uC758)","delegated","explicit"),O.impl_dispatch="implied";else{let N=Ct(C.dispatch)||Ct(p.dispatch);u.impl_dispatch=N?gt(N,"base",N,N,"default"):gt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"),O.impl_dispatch="base"}if(W!==null)u.impl_runtime=Pn(W,"pin"),O.impl_runtime="pin";else if(q!==null)u.impl_runtime=Pn(q,"global"),O.impl_runtime="quick_fix";else if(V){let N=a.runtime;u.impl_runtime=gt(N,"global",`${N} (\uC720\uB3C4)`,N,"explicit"),O.impl_runtime="derived"}else{let N=fr("impl_runtime",{},n,Ct(p.runtime));u.impl_runtime=N.value===null?gt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"):gt(N.value,N.source,N.value,N.value,N.source==="base"?"default":"explicit"),O.impl_runtime=N.source}for(let N of["impl_model","impl_effort","impl_speed"]){let j=Ct(t[N]),z=Ct(n[`quick_fix_${N}`]),K;j!==null?(K={value:j,source:"pin"},O[N]="pin"):N==="impl_model"&&V&&l!==null?(K={value:l,source:"global"},O[N]="quick_fix"):N!=="impl_model"&&z!==null?(K={value:z,source:"global"},O[N]="quick_fix"):(K=fr(N,{},n,Ct(p[N.replace("impl_","")])),O[N]=K.source),u[N]=K.value===null?gt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"):gt(K.value,K.source,K.value,K.value,K.source==="base"?"default":"explicit")}}else for(let W of["impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"]){let q=fr(W,t,n,W==="impl_dispatch"?Ct(C.dispatch)||Ct(p.dispatch):Ct(p[W.replace("impl_","")]));u[W]=q.value===null?gt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"):gt(q.value,q.source,q.value,q.value,q.source==="base"?"default":"explicit")}let te=u.impl_dispatch.value==="main";if(te?u.impl_dispatch.display=O.impl_dispatch==="quick_fix"?"\uBA54\uC778 (quick_fix)":"\uBA54\uC778":u.impl_dispatch.value==="delegated"&&(O.impl_dispatch==="quick_fix"?u.impl_dispatch.display="\uC704\uC784 (quick_fix)":O.impl_dispatch!=="implied"&&(u.impl_dispatch.display="\uC704\uC784")),u.impl_runtime.value==="inherit"&&(u.impl_runtime.display=e.controller_runtime?`inherit (${e.controller_runtime})`:"inherit (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_runtime.resolution="dynamic"),u.impl_model.value!==null){let W=u.impl_runtime.value==="inherit"?Ct(e.controller_runtime):u.impl_runtime.value,q=W?pu(W,o,s):[];_==="quick_fix"&&O.impl_model==="base"&&O.impl_runtime!=="base"&&q.length>0&&!q.includes(u.impl_model.value)&&(u.impl_model=gt("auto","base","auto","auto","default"));let I=u.impl_model.value;if(I!=="auto"&&q.length>0&&!q.includes(I))u.impl_model=Ks(u.impl_model);else{let P=Sa(I,W,o,s);u.impl_model.display=oo(P),u.impl_model.full_value=P,O.impl_model==="quick_fix"&&(u.impl_model.display=`${u.impl_model.display} (quick_fix)`)}}if(u.impl_effort.value==="auto"){let W=Ct(e.transport)||(u.impl_runtime.value==="codex"?"codex-native-spawn":u.impl_runtime.value==="claude"?"implement-claude":null),q=W?Ct(o.implementation?.effort_by_transport?.[W]?.auto):null;q&&!jm.has(q)?(u.impl_effort.display=`${q} (\uBE44\uD638\uD658)`,u.impl_effort.full_value=q,u.impl_effort.resolution="incompatible"):(u.impl_effort.display="auto (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_effort.resolution="dynamic")}O.impl_effort==="quick_fix"&&u.impl_effort.value!==null&&(u.impl_effort=gt(u.impl_effort.value,"global",`${u.impl_effort.value} (quick_fix)`,u.impl_effort.value,"explicit")),u.impl_speed.value==="default"&&(u.impl_speed=O.impl_speed==="quick_fix"?gt("default","global","default (quick_fix)","default","explicit"):u.impl_speed.source==="base"?gt("default","base","default (\uC77C\uBC18)","default","default"):Pn("default",u.impl_speed.source));for(let W of["impl_runtime","impl_effort","impl_speed"])O[W]==="quick_fix"&&u[W].value!==null&&!u[W].display.endsWith("(quick_fix)")&&(u[W].display=`${u[W].display} (quick_fix)`);if(_==="quick_fix"){l!==null&&!V&&a.offered&&(u.quick_fix_impl_model=Ks(gt(l,"global","",l,"explicit")));for(let[W,q]of Object.entries(iu))!W.startsWith("quick_fix_orchestration_")&&!Object.hasOwn(u,W)&&(u[W]={...u[q]});u.impl_dispatch.source==="base"&&u.impl_dispatch.value==="main"&&(u.quick_fix_impl_dispatch=gt("main","base","\uBA54\uC778 (\uD558\uB124\uC2A4)","main","default"))}if(te)for(let W of["impl_runtime","impl_model","impl_effort","impl_speed"])u[W]=gt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable")}else for(let d of qm.filter(p=>!Nm.includes(p)))u[d]=Ea(d,t,n);if(!o){for(let[d,p]of Object.entries(au))(u[p].value==="self"||u[p].value==="skip")&&(u[d]=gt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable"));for(let[d,p]of Object.entries(lu))(u[p].value==="self"||u[p].value==="skip")&&(u[d]=gt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable"));if(u.impl_dispatch.value==="main"){u.impl_dispatch.display="\uBA54\uC778";for(let d of["impl_runtime","impl_model","impl_effort","impl_speed"])u[d]=gt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable")}else u.impl_dispatch.value==="delegated"&&(u.impl_dispatch.display="\uC704\uC784"),u.impl_runtime.value==="inherit"&&(u.impl_runtime.display=e.controller_runtime?`inherit (${e.controller_runtime})`:"inherit (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_runtime.resolution="dynamic"),u.impl_effort.value==="auto"&&(u.impl_effort.display="auto (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_effort.resolution="dynamic")}for(let d of cu){if(!i){u[d]=Ea(d,t,n);continue}let p=d.replace("orchestration_",""),_=Ct(i[p]),m=`quick_fix_${d}`,y=e.route==="quick_fix"?Ct(n[m]):null,C=Ct(t[d]),O=C!==null?{value:C,source:"pin"}:y!==null?{value:y,source:"global"}:fr(d,{},n,_),V=C===null&&y!==null;if(d==="orchestration_effort"&&O.source==="base"){u[d]=gt(null,"base","CLI \uAE30\uBCF8 (\uBBF8\uC9C0\uC815)",null,"default");continue}if(O.value===null){u[d]=gt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable");continue}if(d==="orchestration_model"){let te=O.source==="base"?Ct(i.model_id)||O.value:Sa(O.value,null,o,s);u[d]=gt(O.value,O.source,`${oo(te)}${V?" (quick_fix)":""}`,te,O.source==="base"?"default":"explicit");continue}if(O.value==="default"){u[d]=V?gt("default","global","default (quick_fix)","default","explicit"):O.source==="base"?gt("default","base","default (\uC77C\uBC18)","default","default"):Pn("default",O.source);continue}u[d]=V?gt(O.value,"global",`${O.value} (quick_fix)`,O.value,"explicit"):Pn(O.value,O.source)}for(let d of uu){let p=iu[d];u[d]=u[p]?{...u[p]}:Ea(d,t,n)}if(o&&e.route!=="quick_fix")if(l===null){let d=u.orchestration_model.full_value;u.quick_fix_impl_model=gt(null,"base",d===null?"\uBA54\uC778":`\uBA54\uC778 (orchestration ${oo(d)})`,null,"default")}else if(a.runtime!==null){let d=Sa(l,a.runtime,o,s);u.quick_fix_impl_model=gt(l,"global",oo(d),d,"explicit")}else a.offered?u.quick_fix_impl_model=Ks(gt(l,"global","",null,"explicit")):u.quick_fix_impl_model=Pn(l,"global");return u}function Wm(e,t){let n=t&&e.value==="default"?"default (\uC77C\uBC18)":e.display;if(!t||e.source==="pin")return`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 ${e.display}`;let r=e.source==="global"?"\uC804\uC5ED":"harness";return`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 ${n} (${r})`}function Gs(e){let t=en(e.pin)?e.pin:{},n=en(e.global)?e.global:{},r=en(e.resolution_global)?{...e.resolution_global}:{};delete r[e.key];let o=p=>{let _={...r,...p};return Tn({pin:e.layer==="pin"?_:t,global:e.layer==="pin"?n:_,execution_defaults:e.execution_defaults,runner_catalog:e.runner_catalog,route:e.route,controller_runtime:e.controller_runtime})},i=e.layer==="pin"?t:n,s={...i};delete s[e.key];let l=o(s)[e.key],a=o(i)[e.key],u=Ct(i[e.key]),d=[...e.choices];return u!==null&&!d.includes(u)&&d.unshift(u),{unset_label:Wm(l,e.layer==="pin"),full_value:l.full_value,unavailable:l.resolution==="unavailable",disabled:a?.resolution==="not_applicable",options:d.map(p=>{let _=o({...i,[e.key]:p})[e.key];return{value:p,label:_.display,full_value:_.full_value}})}}function zm(e,t=document){let n=t.createElement("dialog");n.className="op-dialog continuation-dialog";let r=t.createElement("button"),o=t.createElement("button"),i=t.createElement("button"),s=t.createElement("h2"),l=t.createElement("p"),a=t.createElement("div");return a.className="op-dialog__actions",s.textContent="\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4",l.textContent=`${En(e.prior||{})||"\uC774\uC804 \uC124\uC815"} \u2192 ${En(e.current||{})||"\uD604\uC7AC \uC124\uC815"}`,r.type="button",r.className="op-btn",r.textContent="\uAE30\uC874 session \uC774\uC5B4\uD558\uAE30",r.disabled=e.prior_available===!1,o.type="button",o.className="op-btn",o.textContent="\uD604\uC7AC preset\uC73C\uB85C \uC0C8 session",i.type="button",i.className="op-btn",i.textContent="\uCDE8\uC18C",a.append(r,o,i),n.append(s,l,a),t.body.append(n),new Promise(u=>{let d=p=>{typeof n.close=="function"&&n.close(),n.remove(),u(p)};r.addEventListener("click",()=>d("prior_session")),o.addEventListener("click",()=>d("fresh_current")),i.addEventListener("click",()=>d(null)),n.addEventListener("cancel",p=>{p.preventDefault(),d(null)}),typeof n.showModal=="function"?n.showModal():n.setAttribute("open","")})}async function _r(e,t,n={}){let r=e;for(n.onResult?.(r);r?.continuation_mismatch;){let o=r.continuation_mismatch,i=await zm(o);if(i===null)return r;r=await t(i,o.decision_token),n.onResult?.(r),r?.conflict&&n.refresh&&(r=await n.refresh(r),n.onResult?.(r))}return r}function fu(e,t=document){let n=e?.kind==="settlement",r=t.createElement("dialog");r.className="op-dialog resume-instructions-dialog";let o=t.createElement("h2"),i=t.createElement("textarea"),s=t.createElement("div"),l=t.createElement("button"),a=t.createElement("button"),u=[e?.bead_id,e?.tuple].filter(d=>typeof d=="string"&&d!=="").join(" \xB7 ");if(o.textContent=n?"\uCC29\uC9C0 \uC815\uC0B0 \uC7AC\uAC1C":"\uC138\uC158 \uC774\uC5B4\uD558\uAE30",i.placeholder="\uCD94\uAC00 \uC9C0\uCE68 (\uC120\uD0DD) \u2014 \uBE44\uC6CC\uB450\uBA74 \uAE30\uBCF8 \uC808\uCC28\uB85C \uC7AC\uAC1C",i.maxLength=4e3,s.className="op-dialog__actions resume-instructions-dialog__actions",l.type="button",l.className="op-btn op-btn--primary",l.textContent=n?"\uC815\uC0B0 \uC7AC\uAC1C":"\uC774\uC5B4\uD558\uAE30",a.type="button",a.className="op-btn",a.textContent="\uCDE8\uC18C",s.append(l,a),r.append(o),u!==""){let d=t.createElement("p");d.className="resume-instructions-dialog__target",d.textContent=u,r.append(d)}return r.append(i,s),t.body.append(r),new Promise(d=>{let p=!1,_=y=>{p||(p=!0,typeof r.close=="function"&&r.close(),r.remove(),d(y))},m=()=>_(i.value.trim());l.addEventListener("click",m),a.addEventListener("click",()=>_(null)),i.addEventListener("keydown",y=>{y.key==="Enter"&&(y.ctrlKey||y.metaKey)&&(y.preventDefault(),m())}),r.addEventListener("cancel",y=>{y.preventDefault(),_(null)}),typeof r.showModal=="function"?r.showModal():r.setAttribute("open",""),i.focus()})}async function so(e){let{context:t,transport:n,adopt:r}=e,o=await fu(t);if(o===null)return null;let i=o===""?{}:{instructions:o},s=await n({...i});if(r?.(s),s&&s.conflict&&(s=await n({...i}),r?.(s)),s=await _r(s,(l,a)=>n({...i,continuation:l,decision_token:a}),{onResult:r,refresh:()=>n({...i})}),s&&s.resumed===!1&&!s.conflict&&s.reason){let l=t?.kind==="settlement"?"\uC815\uC0B0 \uC7AC\uAC1C":"\uC774\uC5B4\uD558\uAE30";ge(`${l} \uAC70\uBD80: ${s.reason}`,"error",2400)}return s}function Ta(e){return`session:${e.provider}:${e.session_id}`}function Do(e){return`${e.provider} \xB7 ${e.session_id.slice(0,8)}`}function Hm(e,t){return e.current&&t==="in_progress"&&e.locality==="local"?"running":"done"}function io(e,t,n,r){return{attempt_id:Ta(e),session_ref:{bead_id:t,provider:e.provider,session_id:e.session_id},...typeof r=="string"&&r.length>0?{root_dir:r}:{},hide_prompt:!0,meta:{runner:e.provider,label:Do(e),session_id:e.session_id,...typeof e.resume_command=="string"&&e.resume_command.length>0?{resume_command:e.resume_command}:{},status:Hm(e,n)}}}var Ca="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4",Km="\uBD84\uD574 \uC5C6\uC74C \u2014 \uCD1D\uB7C9\uB9CC \uBCF4\uACE0\uB428",_u="\uBD84\uD574 \uC5C6\uB294 leg";function Qt(e){return typeof e=="number"&&Number.isFinite(e)?e:0}var Gn=["input_tokens","output_tokens","cache_read_input_tokens","cache_creation_input_tokens"],ao=[...Gn,"reasoning_output_tokens"],Gm={codex:["implementation","review-consult"],claude:["subagent"]};function Ra(e){return!e||typeof e!="object"?!1:Number.isFinite(e.total_tokens)&&!Gn.some(t=>Number.isFinite(e[t]))}function Ym(e){return!e||typeof e!="object"?!1:ao.some(t=>Number.isFinite(e[t]))}function Oa(e){let t=0;for(let n of Gn)t+=Qt(e?.[n]);return t}function Vm(e){return!e||typeof e!="object"?!1:Gn.some(t=>Number.isFinite(e[t]))}function mu(e){return!e||typeof e!="object"?!1:ao.some(t=>Number.isFinite(e[t]))||Number.isFinite(e.total_tokens)}function Qm(e){let t={};for(let n of ao)e&&Number.isFinite(e[n])&&(t[n]=e[n]);return t}function gu(e){let t={};for(let n of ao)Number.isFinite(e[n])&&(t[n]=e[n]);return Number.isFinite(e.total_tokens)&&(t.total_tokens=e.total_tokens),e.replayed===!0&&(t.replayed=!0),typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&(t.total_cost_usd=e.total_cost_usd),t}function hu(e,t){return Ra(t)?Qt(t.total_tokens):e==="codex"?Qt(t.input_tokens)+Qt(t.output_tokens):Oa(t)}function Xm(e){return e==="claude"?"Claude":"Codex"}function Zm(e){return`\u03C4 ${yu(e)}`}function Jm(e,t){let n=t.breakdown||{},r=Qt(t.total_only_subtotal);if(Ra(n)||r>0&&!Ym(n)){let u=[`\uCD1D ${t.subtotal.toLocaleString("en-US")}`,Km];return t.replayed&&u.push(Ca),u.join(`
`)}let o=[`\uC785\uB825 ${Qt(n.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${Qt(n.output_tokens).toLocaleString("en-US")}`];e==="claude"?o.push(`\uCE90\uC2DC\uC77D\uAE30 ${Qt(n.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${Qt(n.cache_creation_input_tokens).toLocaleString("en-US")}`):(o.push(`\uCE90\uC2DC\uC77D\uAE30 ${Qt(n.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC4F0\uAE30 ${Qt(n.cache_creation_input_tokens).toLocaleString("en-US")}`),Number.isFinite(n.reasoning_output_tokens)&&o.push(`\uCD94\uB860\uCD9C\uB825 ${Qt(n.reasoning_output_tokens).toLocaleString("en-US")}`)),r>0&&o.push(`${_u} ${r.toLocaleString("en-US")}`);let i=e==="claude"?"\uC785\uB825 + \uCD9C\uB825 + \uCE90\uC2DC\uC77D\uAE30 + \uCE90\uC2DC\uC0DD\uC131":"\uC785\uB825 + \uCD9C\uB825",s=r>0?`${i} + ${_u}`:i,a=[e==="claude"?`Claude subtotal = ${s}`:`Codex subtotal = ${s}; \uCE90\uC2DC\uC77D\uAE30\xB7\uCE90\uC2DC\uC4F0\uAE30\xB7\uCD94\uB860\uCD9C\uB825\uC740 subtotal\uC5D0 \uD3EC\uD568\uB418\uC9C0 \uC54A\uB294 subset`,`\uCD1D ${t.subtotal.toLocaleString("en-US")}`,o.join(" \xB7 ")];return typeof t.total_cost_usd=="number"&&Number.isFinite(t.total_cost_usd)&&a.push(`$${t.total_cost_usd.toFixed(2)}`),t.replayed&&a.push(Ca),a.join(`
`)}function un(e){let t=[];if(!e||typeof e!="object"||!("providers"in e)||!e.providers)return t;for(let n of["claude","codex"]){let r=e.providers[n];r&&t.push({provider:n,label:`${Xm(n)} ${Zm(r.subtotal)}${typeof r.total_cost_usd=="number"&&Number.isFinite(r.total_cost_usd)?` \xB7 $${r.total_cost_usd.toFixed(2)}`:""}`,tooltip:Jm(n,r)})}return t}function Vs(e){let t={},n={claude:!0,codex:!1},r={claude:0,codex:0};for(let o of e)if(!(!o||!o.providers))for(let i of["claude","codex"]){let s=o.providers[i];if(!s)continue;let l=t[i];l||(l={subtotal:0,breakdown:{}},t[i]=l),l.subtotal+=s.subtotal,Number.isFinite(s.total_only_subtotal)&&(l.total_only_subtotal=Qt(l.total_only_subtotal)+Qt(s.total_only_subtotal));for(let a of ao)Number.isFinite(s.breakdown[a])&&(l.breakdown[a]=Qt(l.breakdown[a])+Qt(s.breakdown[a]));s.replayed&&(l.replayed=!0),i==="claude"&&(typeof s.total_cost_usd=="number"&&Number.isFinite(s.total_cost_usd)?r.claude+=s.total_cost_usd:n.claude=!1)}return t.claude&&n.claude&&(t.claude.total_cost_usd=r.claude),Object.keys(t).length===0?null:{providers:t,roles:{}}}function Ia(e){return!e||typeof e!="object"?null:nr({attempt:{...e,bead_id:"__attempt__"}},"__attempt__")}function eg(e){return e==="codex"?"codex":"claude"}function Kn(){return{subtotal:0,breakdown:Qm(null),total_only:0,legs:[],replayed:!1,outer_count:0,outer_cost:0,outer_cost_count:0}}function Ys(e,t,n){e.subtotal+=t.subtotal,Ra(t.usage)&&(e.total_only+=t.subtotal);for(let r of ao)Number.isFinite(t.usage[r])&&(e.breakdown[r]=Qt(e.breakdown[r])+Qt(t.usage[r]));e.legs.push(t),t.replayed===!0&&(e.replayed=!0),n&&(e.outer_count+=1,typeof t.usage.total_cost_usd=="number"&&Number.isFinite(t.usage.total_cost_usd)&&(e.outer_cost+=t.usage.total_cost_usd,e.outer_cost_count+=1))}function bu(e,t){let n={subtotal:e.subtotal,breakdown:e.breakdown};return e.total_only>0&&(n.total_only_subtotal=e.total_only),t&&(n.legs=e.legs),e.replayed&&(n.replayed=!0),n}function yu(e){return e>=1e6?`${(e/1e6).toFixed(1)}M`:e>=1e3?`${(e/1e3).toFixed(1)}k`:String(e)}function lo(e){return Vm(e)?`\u03C4 ${yu(Oa(e))}`:null}function tr(e){let t=lo(e);if(!t)return null;let n=e?.total_cost_usd;return typeof n=="number"&&Number.isFinite(n)?`${t} \xB7 $${n.toFixed(2)}`:t}function Mo(e){if(!e||typeof e!="object")return"";let t=[`\uC785\uB825 ${Qt(e.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${Qt(e.output_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC77D\uAE30 ${Qt(e.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${Qt(e.cache_creation_input_tokens).toLocaleString("en-US")}`];typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&t.push(`$${e.total_cost_usd.toFixed(2)}`);let n=[`\uCD1D ${Oa(e).toLocaleString("en-US")}`,t.join(" \xB7 ")];return e.replayed&&n.push(Ca),n.join(`
`)}function nr(e,t){let n={claude:Kn(),codex:Kn()},r={orchestrator:{claude:Kn(),codex:Kn()},implementation:{claude:Kn(),codex:Kn()},"review-consult":{claude:Kn(),codex:Kn()},subagent:{claude:Kn(),codex:Kn()}},o=new Set;for(let l of Object.values(e||{})){if(!l||l.bead_id!==t)continue;let a=l.usage;if(mu(a)){let d=eg(l.runner),p=gu(a),_={provider:d,role:"orchestrator",attempt_id:String(l.attempt_id||""),usage:p,subtotal:hu(d,p)};p.replayed===!0&&(_.replayed=!0),typeof l.model=="string"&&(_.model=l.model),typeof l.session_id=="string"&&(_.session_id=l.session_id),Ys(n[d],_,!0),Ys(r.orchestrator[d],_,!0)}let u=Array.isArray(l.usage_legs)?l.usage_legs:[];for(let d of u){let p=d&&d.provider==="claude"?"claude":"codex";if(!d||d.provider!=="codex"&&d.provider!=="claude"||!Gm[p].includes(d.role)||!mu(d.usage))continue;let _=typeof d.receipt_id=="string"&&d.receipt_id.length>0?d.receipt_id:null;if(!_||o.has(_))continue;o.add(_);let m=gu(d.usage),y={provider:p,role:d.role,attempt_id:String(l.attempt_id||""),usage:m,subtotal:hu(p,m)};y.receipt_id=_,typeof d.agent_type=="string"&&(y.agent_type=d.agent_type),typeof d.agent_id=="string"&&(y.agent_id=d.agent_id),typeof d.model=="string"&&(y.model=d.model),typeof d.effort=="string"&&d.effort.trim().length>0&&(y.effort=d.effort),typeof d.session_id=="string"?y.session_id=d.session_id:typeof d.thread_id=="string"&&(y.session_id=d.thread_id),typeof d.turn_id=="string"&&(y.turn_id=d.turn_id),(typeof d.completed_at=="string"||typeof d.completed_at=="number"&&Number.isFinite(d.completed_at))&&(y.completed_at=d.completed_at),m.replayed===!0&&(y.replayed=!0),Ys(n[p],y,!1),Ys(r[y.role][p],y,!1)}}let i={};for(let l of["claude","codex"]){let a=n[l];if(a.legs.length===0)continue;let u=bu(a,!1);l==="claude"&&a.outer_count>0&&a.outer_cost_count===a.outer_count&&(u.total_cost_usd=a.outer_cost),i[l]=u}if(Object.keys(i).length===0)return null;let s={};for(let l of["orchestrator","implementation","review-consult","subagent"]){let a={};for(let u of["claude","codex"]){let d=r[l][u];d.legs.length>0&&(a[u]={...bu(d,!0),legs:d.legs})}Object.keys(a).length>0&&(s[l]=a)}return{providers:i,roles:s}}var tg=".chip-popover, .judgement-chip";function co(e){let t=null,n=!1;function r(d){return t!==null&&t.bead_id===d.bead_id&&t.chip_key===d.chip_key}function o(d){t=r(d)?null:{...d},e()}function i(){t!==null&&(t=null,e())}function s(d){let p=d.target;t!==null&&(p&&typeof p.closest=="function"&&p.closest(tg)||i())}function l(d){d.key==="Escape"&&i()}function a(){n||(n=!0,document.addEventListener("click",s),document.addEventListener("keydown",l))}function u(){n&&(n=!1,document.removeEventListener("click",s),document.removeEventListener("keydown",l))}return{toggle:o,close:i,isOpen:r,attach:a,detach:u}}function uo(e){return c`<div
    class="chip-popover"
    role="dialog"
    aria-label=${e.title}
  >
    <div class="chip-popover__title">${e.title}</div>
    <ul class="chip-popover__lines">
      ${e.lines.map(t=>c`<li>${t}</li>`)}
    </ul>
  </div>`}var vu={running:3,paused:2,failed:1};function rr(e){if(!e||typeof e!="object")return!1;let t=e.kind;return t==null||t==="implementation"}function ku(e){let t=Object.values(e||{}),n=new Map;for(let r of t){if(!r||typeof r.bead_id!="string"||r.bead_id.length===0||r.kind!=="review_session"||r.status!=="running")continue;let o=typeof r.started_at=="number"?r.started_at:null,i=n.get(r.bead_id);i&&(i.started_at??0)>(o??0)||n.set(r.bead_id,{attempt:r,origin:r.origin==="click"||r.origin==="auto"?r.origin:null,started_at:o})}return n}function wu(e,t){let n=Object.values(e||{}),r=new Set,o=new Map;for(let s of n)!s||typeof s.bead_id!="string"||(typeof s.resumed_from=="string"&&s.resumed_from.length>0&&r.add(s.resumed_from),rr(s)&&o.set(s.bead_id,s.attempt_id));let i=new Map;for(let s of n){if(!s||typeof s.bead_id!="string"||s.bead_id.length===0||!rr(s))continue;let l=null;if(s.status==="running")l="running";else if(s.status==="paused"&&!r.has(s.attempt_id))l="paused";else if(s.status==="failed"||s.status==="orphaned"){let d=t.get(s.bead_id),p=typeof d=="number"&&d>0&&typeof s.finished_at=="number"&&d>=s.finished_at;o.get(s.bead_id)===s.attempt_id&&!p&&typeof s.dismissed_at!="number"&&(l="failed")}if(!l)continue;let a=typeof s.started_at=="number"?s.started_at:null,u=i.get(s.bead_id);if(u){let d=vu[u.run_state],p=vu[l];if(d>p||d===p&&(u.started_at??0)>(a??0))continue}i.set(s.bead_id,{attempt:s,run_state:l,started_at:a})}return{winners:i,resumed_from_ids:r}}var Qs=["workflow_mode","spec_review_model","spec_review_effort","spec_review_speed","plan_review_model","plan_review_effort","plan_review_speed","impl_review_model","impl_review_effort","impl_review_speed","impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"],ng=["quick_fix_impl_dispatch","quick_fix_impl_runtime","quick_fix_impl_model","quick_fix_impl_effort","quick_fix_impl_speed"],Da=[...Qs.filter(e=>e!=="impl_dispatch"),...ng,"bdui_url"];function $u(e){let t;try{t=new URL(e)}catch{return!1}return(t.protocol==="http:"||t.protocol==="https:")&&e===t.origin}var Dn=["orchestration_model","orchestration_effort","orchestration_speed"],po=["quick_fix_orchestration_model","quick_fix_orchestration_effort","quick_fix_orchestration_speed"],La=Object.freeze({orchestration_model:"quick_fix_orchestration_model",orchestration_effort:"quick_fix_orchestration_effort",orchestration_speed:"quick_fix_orchestration_speed",impl_dispatch:"quick_fix_impl_dispatch",impl_runtime:"quick_fix_impl_runtime",impl_model:"quick_fix_impl_model",impl_effort:"quick_fix_impl_effort",impl_speed:"quick_fix_impl_speed"}),fo=[...Qs,...Dn],rg=Da.filter(e=>fo.includes(e));function og(e,t){let n={},r=[];for(let[i,s]of Object.entries(La)){let l=e[i];if(!Object.hasOwn(e,i)){n[s]=null;continue}let a=t[s];if(typeof l!="string"||!Array.isArray(a)||!a.includes(l)){n[s]=null,r.push(`lane_incompatible:${s}`);continue}n[s]=l}let o=Object.keys(e).filter(i=>!Object.hasOwn(La,i));return{values:n,warnings:r,skipped_keys:o}}var qo=["delegated","main"],Xs=["inherit","claude","codex"],Yn=["default","fast"],No=["standard","fast_track"],jo=["codex","opus","fable","self","skip"],Zs=["codex","fable","skip"],Js=["low","medium","high","xhigh"],xu=["default","fast"],xn="auto";function gn(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function Au(e){if(!gn(e)||!gn(e.runners))return[];let t=[];for(let[n,r]of Object.entries(e.runners))gn(r)&&gn(r.models)&&t.push([n,Object.keys(r.models)]);return t}function _o(e,t){let n=Au(e),r=t&&t!=="inherit"?n.filter(([o])=>o===t):n;return[xn,...r.flatMap(([,o])=>o)]}function Su(e,t,n,r){if(!gn(e)||!gn(e.runners))return[xn];let o=[];for(let[i,s]of Object.entries(e.runners))if(!(!gn(s)||!gn(s.models))&&!(t&&t!=="inherit"&&i!==t))for(let[l,a]of Object.entries(s.models)){if(n&&n!==xn&&l!==n)continue;let u=r(s,a);if(Array.isArray(u))for(let d of u)typeof d=="string"&&!o.includes(d)&&o.push(d)}return[xn,...o]}function Dr(e,t,n){return Su(e,t,n,(r,o)=>gn(o)&&Array.isArray(o.efforts)?o.efforts:r.efforts)}function ei(e,t,n){return Su(e,t,n,(r,o)=>gn(o)&&Array.isArray(o.orchestration_efforts)?o.orchestration_efforts:gn(o)&&Array.isArray(o.efforts)?o.efforts:r.efforts)}function mo(e,t){let n=Au(e);return(t?n.filter(([o])=>o===t):n).flatMap(([,o])=>o)}function Eu(e,t,n){let r={impl_runtime:e?.impl_runtime,impl_model:e?.impl_model,impl_effort:e?.impl_effort},o=r.impl_runtime==="claude"||r.impl_runtime==="codex"?r.impl_runtime:r.impl_runtime==="inherit"?n:null;return o&&(r.impl_model&&!_o(t,o).includes(r.impl_model)&&(r.impl_model=void 0),r.impl_effort&&!Dr(t,o,r.impl_model||xn).includes(r.impl_effort)&&(r.impl_effort=void 0)),r}var sg={workflow_mode:"\uC6CC\uD06C\uD50C\uB85C \uBAA8\uB4DC",spec_review_model:"\uC2A4\uD399 \uB9AC\uBDF0\uC5B4",spec_review_effort:"\uC2A4\uD399 \uB9AC\uBDF0 effort",spec_review_speed:"\uC2A4\uD399 \uB9AC\uBDF0 \uC18D\uB3C4",plan_review_model:"\uACC4\uD68D \uB9AC\uBDF0\uC5B4",plan_review_effort:"\uACC4\uD68D \uB9AC\uBDF0 effort",plan_review_speed:"\uACC4\uD68D \uB9AC\uBDF0 \uC18D\uB3C4",impl_review_model:"\uAD6C\uD604 \uB9AC\uBDF0\uC5B4",impl_review_effort:"\uAD6C\uD604 \uB9AC\uBDF0 effort",impl_review_speed:"\uAD6C\uD604 \uB9AC\uBDF0 \uC18D\uB3C4",impl_runtime:"\uC704\uC784 \uB300\uC0C1",impl_model:"\uAD6C\uD604 \uBAA8\uB378",impl_effort:"\uAD6C\uD604 effort",impl_speed:"\uAD6C\uD604 \uC18D\uB3C4",orchestration_model:"\uC6CC\uCEE4 \uBAA8\uB378",orchestration_effort:"\uC6CC\uCEE4 effort",orchestration_speed:"\uC6CC\uCEE4 \uC18D\uB3C4"},ig={quick_fix_orchestration_model:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uBAA8\uB378",quick_fix_orchestration_effort:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 effort",quick_fix_orchestration_speed:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uC18D\uB3C4",quick_fix_impl_dispatch:"\uC2E4\uD589 \uBC29\uC2DD",quick_fix_impl_runtime:"\uC704\uC784 \uB300\uC0C1",quick_fix_impl_model:"\uBAA8\uB378",quick_fix_impl_effort:"effort",quick_fix_impl_speed:"\uC18D\uB3C4"},Pa=[...rg,...Dn],ag=[...fo,...Da].filter((e,t,n)=>n.indexOf(e)===t&&!Pa.includes(e));function Tu(e,t){let n=gn(e)?e:{},r=gn(t)?t:{},o=[];for(let s of Pa){let l=n[s]??null,a=r[s]??null;l!==a&&o.push({key:s,label:sg[s]||s,before:l,after:a,kind:l===null?"added":a===null?"removed":"changed"})}let i=[];for(let s of[...ag,...Object.keys(r)])!Pa.includes(s)&&!i.includes(s)&&Object.hasOwn(r,s)&&i.push(s);return{rows:o,ignored_keys:i}}function Cu(e,t,n){let r=gn(e)?e:{},o=og(gn(t)?t:{},n),i=[];for(let s of Object.values(La)){let l=r[s]??null,a=o.values[s]??null;l!==a&&i.push({key:s,label:ig[s]||s,before:l,after:a,kind:l===null?"added":a===null?"removed":"changed"})}return{rows:i,ignored_keys:o.skipped_keys}}function Ma(e,t,n,r,o,i,s=null){return Gs({key:e,choices:t,layer:"global",global:n,resolution_global:i,execution_defaults:r,runner_catalog:o,route:s})}function Ru(e,t){let n={};for(let r of Da){let o=e?.[r],i=t?.[r];o!==i&&(n[r]=typeof i=="string"&&i.length>0?i:null)}return n}function Ou(e,t){let n={};for(let r of[...Dn,...po]){let o=e?.[r]??null,i=t?.[r]??null;o!==i&&(n[r]=typeof i=="string"&&i.length>0?i:null)}return n}var qa=[{id:"workflow",label:"\uC6CC\uD06C\uD50C\uB85C\uC6B0",keys:["workflow_mode"]},{id:"review",label:"\uB9AC\uBDF0",keys:["spec_review_model","spec_review_effort","spec_review_speed","plan_review_model","plan_review_effort","plan_review_speed","impl_review_model","impl_review_effort","impl_review_speed"]},{id:"implementation",label:"\uAD6C\uD604",keys:["impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"]},{id:"worker",label:"Worker",keys:[...Dn]}],mr={workflow_mode:"\uBAA8\uB4DC",spec_review_model:"\uC0AC\uC591 \uB9AC\uBDF0",spec_review_effort:"\uC0AC\uC591 \uB9AC\uBDF0 effort",spec_review_speed:"\uC0AC\uC591 \uB9AC\uBDF0 \uC18D\uB3C4",plan_review_model:"\uACC4\uD68D \uB9AC\uBDF0",plan_review_effort:"\uACC4\uD68D \uB9AC\uBDF0 effort",plan_review_speed:"\uACC4\uD68D \uB9AC\uBDF0 \uC18D\uB3C4",impl_review_model:"\uAD6C\uD604 \uB9AC\uBDF0",impl_review_effort:"\uAD6C\uD604 \uB9AC\uBDF0 effort",impl_review_speed:"\uAD6C\uD604 \uB9AC\uBDF0 \uC18D\uB3C4",impl_dispatch:"\uC2E4\uD589 \uBC29\uC2DD",impl_runtime:"\uC704\uC784 \uB300\uC0C1",impl_model:"\uBAA8\uB378",impl_effort:"effort",impl_speed:"\uC18D\uB3C4",orchestration_model:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uBAA8\uB378",orchestration_effort:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 effort",orchestration_speed:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uC18D\uB3C4"},ti={pin:"\uD540",global:"\uC804\uC5ED",base:"\uAE30\uBCF8"};function Na(e,t,n,r,o,i=null){let s=Tn({pin:t,global:n,execution_defaults:r,runner_catalog:o,route:t&&typeof t.route=="string"?t.route:null,controller_runtime:i});return e.map(l=>({key:l,...s[l]}))}function Iu(e,t,n,r,o,i=null){let s={pin:0,global:0,base:0};for(let l of Na(e,t,n,r,o,i))s[l.source]+=1;return s}function Lu(e,t,n){return{id:e,key:t,value:typeof n=="string"?n:""}}function Pu(e,t,n){return typeof t!="string"||t.length===0?null:{id:e,preset_id:t,expected_revision:n}}var J$=[...Qs,...Dn];var Du=["orchestration_model","orchestration_effort","orchestration_speed","spec_review_model","spec_review_effort","spec_review_speed","plan_review_model","plan_review_effort","plan_review_speed","impl_review_model","impl_review_effort","impl_review_speed","impl_runtime","impl_model","impl_effort"];function Fo(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function ni(e){if(!Fo(e)||!Fo(e.runners))return null;let t=Object.entries(e.runners).filter(([,n])=>Fo(n)&&Fo(n.models));return t.length>0?t:null}function Mn(e,t){let n=ni(e);if(!n||!t)return null;for(let[r,o]of n)if(Object.hasOwn(o.models,t))return r;return null}function Mu(e,t){return Fo(t)&&Array.isArray(t.efforts)?t.efforts.slice():Array.isArray(e.efforts)?e.efforts.slice():[]}function qu(e,t){let n=ni(e);if(!n||!t)return[];for(let[,r]of n)if(Object.hasOwn(r.models,t))return Mu(r,r.models[t]);return[]}function lg(e){let t=ni(e);if(!t)return[];let n=[];for(let[,r]of t)for(let o of Object.values(r.models))for(let i of Mu(r,o))n.includes(i)||n.push(i);return n}function cg(e,t){if(!t)return lg(e);let r=ni(e)?.find(([i])=>i===t)?.[1];if(!r)return[];let o=[];for(let i of Object.keys(r.models))for(let s of qu(e,i))o.includes(s)||o.push(s);return o}function Nu(e,t,n){let r={impl_runtime:e.impl_runtime||"",impl_model:e.impl_model||"",impl_effort:e.impl_effort||""},o=r.impl_runtime==="inherit"?n:r.impl_runtime==="claude"||r.impl_runtime==="codex"?r.impl_runtime:null;if(r.impl_runtime==="inherit"&&!o)return r.impl_model="",r.impl_effort="",r;let i=Mn(t,r.impl_model);if(r.impl_model&&(!o||i!==o))return r.impl_model="",r.impl_effort="",r;let s=r.impl_model?qu(t,r.impl_model):cg(t,o);return r.impl_effort&&s.length>0&&!s.includes(r.impl_effort)&&(r.impl_effort=""),r}var ja=new Set(["unavailable","not_applicable"]);function gr(e,t){if(typeof e!="object"||e===null)return null;let n=e[t];return typeof n=="object"&&n!==null?n:null}function ju(e){return e.filter(t=>t!==null).join(" \xB7 ")}function hr(e,t){return t===null?null:`${mr[e]}: ${t.display} (${ti[t.source]})`}function Fa(e){return e.filter(t=>t!==null).join(`
`)}function Ba(e){if(typeof e!="object"||e===null)return null;let t=En(e);if(t==="")return null;let n=(r,o)=>typeof o=="string"&&o.length>0?`${r}: ${o}`:null;return{text:t,title:Fa(["\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \u2014 \uC774 attempt\uC5D0 \uAE30\uB85D\uB41C \uC2E4\uD589\uAC12",n("runner",e.runner),n(mr.orchestration_model,e.model),n(mr.orchestration_effort,e.effort),n(mr.orchestration_speed,e.speed)])}}function go(e,t){let n=gr(e,"orchestration_model");if(n===null||n.resolution==="unavailable")return null;let r=gr(e,"orchestration_effort"),o=gr(e,"orchestration_speed"),i=ju([Mn(t,n.value??""),n.display,r!==null&&r.value!==null?r.display:null,o!==null&&o.value==="fast"?"Fast":null]);return i===""?null:{text:i,title:Fa(["\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \u2014 \uD604\uC7AC \uD574\uC11D\uAC12 (\uD540 > \uD050 \uAE30\uBCF8\uAC12)",hr("orchestration_model",n),hr("orchestration_effort",r),hr("orchestration_speed",o)])}}function ug(e,t){return e===null||e.value===null||ja.has(e.resolution)?null:e.value!=="inherit"?e.value:t?`inherit\u2192${t}`:"inherit"}function dg(e){return e===null||ja.has(e.resolution)?null:e.value==="auto"?"auto":e.display}function pg(e){return e===null?null:e.value==="auto"?"auto":ja.has(e.resolution)?null:e.display}function Mr(e,t){if(typeof e!="object"||e===null)return null;let n=gr(e,"impl_dispatch"),r=gr(e,"impl_runtime"),o=gr(e,"impl_model"),i=gr(e,"impl_effort"),s=gr(e,"impl_speed"),l=n!==null&&n.value==="main"?"\uBA54\uC778":ju([ug(r,t??null),dg(o),pg(i),s!==null&&s.value==="fast"?"Fast":null]);return l===""?null:{text:l,title:Fa(["\uC6CC\uCEE4(\uAD6C\uD604 \uC704\uC784) \u2014 \uD604\uC7AC \uD574\uC11D\uAC12 (\uD540 > \uC804\uC5ED kv > \uAE30\uBCF8). \uC2E4\uD589 \uC911\uC774\uBA74 \uC138\uC158\uC774 \uC2DC\uC791 \uC2DC \uACE0\uC815\uD55C \uAC12\uACFC \uB2E4\uB97C \uC218 \uC788\uC74C",hr("impl_dispatch",n),hr("impl_runtime",r),hr("impl_model",o),hr("impl_effort",i),hr("impl_speed",s)])}}var fg=Object.freeze(new Set(["push_not_contained","invalid_impl_review","premature_close","head_mismatch","foreign_deploy_unsupported","not_resolved"])),_g=Object.freeze(["delivery_unproven:"]);function ri(e){let t=e&&typeof e.reason=="string"?e.reason:"";if(t.length===0||fg.has(t))return"session";for(let n of _g)if(t.startsWith(n))return"session";return"settlement"}var mg=["hard_diagnosis","invariant_reasoning","verification_by_judgment","claude_bound"];var gg={hard_diagnosis:"\uC6D0\uC778\uC774 \uBD88\uBA85\uD655\uD558\uAC70\uB098 \uC7AC\uD604\uC774 \uBD88\uC548\uC815\uD574 \uAC00\uC124-\uAC80\uC99D \uB8E8\uD504\uAC00 \uD544\uC694\uD558\uB2E4",invariant_reasoning:"\uC815\uD569\uC131\uC774 \uC0C1\uD0DC\uAE30\uACC4\xB7\uB3D9\uC2DC\uC131\xB7\uBD88\uBCC0\uC2DD \uCD94\uB860\uC5D0 \uB2EC\uB824 \uC788\uB2E4",verification_by_judgment:"\uD14C\uC2A4\uD2B8\uAC00 \uBABB \uC7A1\uACE0 \uB9AC\uBDF0\uC5B4\uC758 \uCD94\uB860\uC73C\uB85C\uB9CC \uAC80\uC99D\uD560 \uC218 \uC788\uB2E4",claude_bound:"Claude \uC138\uC158 \uC790\uC0B0\xB7\uC758\uBBF8\uB860\uC5D0 \uAC15\uD558\uAC8C \uBB36\uC5EC \uC788\uB2E4"};function Ua(e){return(e&&Array.isArray(e.reasons)?e.reasons:[]).map(n=>gg[n]||"").filter(n=>n.length>0)}var Fu={orchestration_model:["fable"],impl_runtime:["claude"]},Wa={unapplied:"\uBBF8\uC801\uC6A9",applied:"\uC801\uC6A9\uB428",diverged:"\uCD94\uCC9C\uACFC \uB2E4\uB984"};function Bu(e){return typeof e=="object"&&e!==null?e:null}function Uu(e,t){return typeof e=="string"&&t.includes(e)?e:""}function hg(e){return typeof e!="string"?[]:e.split("+").map(t=>t.trim()).filter(t=>mg.includes(t))}function Bo(e,t=e){let n=Bu(e);if(!n)return null;let r=Uu(n.rec_orchestration_model,Fu.orchestration_model);if(r.length===0)return null;let o=Uu(n.rec_impl_runtime,Fu.impl_runtime),i={orchestration_model:r};o.length>0&&(i.impl_runtime=o);let s=Bu(t)||{},l=Object.keys(i),a=0,u=0;for(let p of l){let _=s[p];typeof _=="string"&&_.length>0&&(a+=1,_===i[p]&&(u+=1))}let d=a===0?"unapplied":u===l.length?"applied":"diverged";return{reasons:hg(n.rec_reason),rec:i,state:d}}function oi(e){if(!e||typeof e!="object")return"";let t=Ua(e),n=Wa[e.state]||"",r=["\uBCF5\uC7A1\uD55C \uC791\uC5C5\uC73C\uB85C \uD310\uC815\uB428"];return t.length>0&&r.push(`\uC0AC\uC720: ${t.join(" \xB7 ")}`),n.length>0&&r.push(`\uC0C1\uD0DC: ${n}`),r.join(`
`)}function si(e){return e.replace(/\/+$/,"")}function bg(e,t){let n=si(e),r=si(t);return n===r||r.startsWith(`${n}/`)||n.startsWith(`${r}/`)}function ii(e,t){let n=new Set;for(let r of e)for(let o of t){if(!bg(r,o))continue;let i=si(r),s=si(o);n.add(i.length>=s.length?i:s)}return[...n].sort()}function za(e,t){return`${e}\0${t}`}function Wu(e){let t=new Map;for(let n of Array.isArray(e?.running)?e.running:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"running",state:"running"});for(let n of Array.isArray(e?.pr_wait)?e.pr_wait:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"pr_wait",state:"pr_wait"});for(let n of Array.isArray(e?.queue_groups)?e.queue_groups:[]){let r=Array.isArray(n.sublanes?.parallel)?n.sublanes.parallel:Array.isArray(n.items)?n.items:[];for(let o of r)t.set(o.id,{root_dir:o.root_dir,workspace_name:o.workspace_name,lane:"parallel",position:o.queue_position});for(let o of Array.isArray(n.sublanes?.serial)?n.sublanes.serial:[])for(let i of o.items)t.set(i.id,{root_dir:i.root_dir,workspace_name:i.workspace_name,lane:o.id,position:i.queue_position})}for(let n of Array.isArray(e?.runnable)?e.runnable:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"runnable",state:"runnable"});for(let n of Array.isArray(e?.done)?e.done:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"done",state:"done"});return t}function Wo(e,t){let n=Array.isArray(t)?t:[],r=e.indexOf("-"),o=r>0?e.slice(0,r):e;return n.some(i=>typeof i?.issue_prefix=="string"&&i.issue_prefix===o)?"internal":n.length>0&&n.every(i=>typeof i?.issue_prefix=="string")?"external":"unknown"}function Uo(e){if(e.state==="running")return"\uC2E4\uD589\uC911";if(e.state==="pr_wait")return"PR \uB300\uAE30";if(e.state==="runnable")return"\uC2E4\uD589\uAC00\uB2A5";if(e.state==="done")return"\uC644\uB8CC";let t=e.lane==="parallel"?"\uBCD1\uB82C":e.lane;return`${e.workspace_name} \xB7 ${t} #${e.position}`}function zu(e,t,n,r){let o=n.get(e);if(!!(o&&t&&o.root_dir===t.root_dir&&o.lane===t.lane&&typeof o.position=="number"&&typeof t.position=="number"&&o.position<t.position))return{id:e,label:`\u{1F512} ${e} (\uAC19\uC740 \uB808\uC778 \uC55E)`,location_label:"\uAC19\uC740 \uB808\uC778 \uC55E",scope:null,same_lane_ahead:!0};if(o)return{id:e,label:`\u{1F512} ${e} (${Uo(o)})`,location_label:Uo(o),scope:null,same_lane_ahead:!1};let s=Wo(e,r),l=s==="internal"?"\uBBF8\uC801\uC7AC":s==="external"?"\uC678\uBD80":"\uC704\uCE58 \uBBF8\uD655\uC778";return{id:e,label:`\u{1F512} ${e} (${l})`,location_label:l,scope:s,same_lane_ahead:!1}}function Hu(e){let t=Array.isArray(e)?e:[],n=new Map,r=new Map,o=new Map;for(let l of t)for(let a of Array.isArray(l.sublanes?.serial)?l.sublanes.serial:[]){let u=za(l.root_dir,a.id);n.set(u,{root_dir:l.root_dir,workspace_name:l.name,lane:a.id}),o.set(u,[]);for(let d of Array.isArray(a.items)?a.items:[])r.set(d.id,u)}for(let l of t)for(let a of Array.isArray(l.sublanes?.serial)?l.sublanes.serial:[]){let u=za(l.root_dir,a.id),d=Array.isArray(a.items)?a.items[0]:null,_=!!d&&d.queue_index===0&&(!Array.isArray(a.occupied_by)||a.occupied_by.length===0)&&Array.isArray(d.blocked_by)?d.blocked_by:[],m=o.get(u);if(m)for(let y of _){let C=r.get(y);C&&C!==u&&!m.includes(C)&&m.push(C)}}let i=(l,a)=>{let u=new Set,d=[l];for(;d.length>0;){let p=d.pop();if(p===a)return!0;!p||u.has(p)||(u.add(p),d.push(...o.get(p)||[]))}return!1},s=new Map;for(let[l,a]of o){let u=[];for(let d of a){let p=n.get(d);i(d,l)&&p&&u.push(p)}u.length>0&&s.set(l,u)}return s}function Ku(e,t){return za(e,t)}var yg=Object.freeze(["done","abandoned"]);function Gu(e){return!e||typeof e!="object"||Array.isArray(e)?!1:typeof e.phase=="string"&&!yg.includes(e.phase)}async function vg(e){let t=await mn(e);ge(t?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",t?"success":"error",1200)}function qr(e){return typeof e!="string"||e.length===0?"":c`<span class="worker-ev__copyline"
    ><code class="worker-ev__path">${e}</code
    ><button
      type="button"
      class="worker-ev__copy"
      data-seam="log-path-copy"
      title="로그 경로 복사"
      aria-label=${`\uB85C\uADF8 \uACBD\uB85C \uBCF5\uC0AC: ${e}`}
      @click=${()=>{vg(e)}}
    >
      ⧉
    </button></span
  >`}var Yu=Object.freeze(["spec_backed","full_plan","quick_fix"]);var kg="worker-ineligible";function zo(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function Vu(e){return zo(e).includes(kg)}var wg=new Set(Yu),Qu=new WeakMap;function ho(e){return e&&typeof e=="object"?e:{}}function $g(e){let t=Qu.get(e);if(t)return t;let n=Zu(e);return Qu.set(e,n),n}function ai(e,t){return(Array.isArray(e)?e:[]).findIndex(r=>r&&r.bead_id===t)}function xg(e,t){if(e.length===0)return null;if($g(t).has(e))return{lane:"running"};if(ai(t.pr_wait,e)>=0)return{lane:"pr_wait"};let n=ai(t.queue,e);if(n>=0)return{lane:"parallel",index:n};for(let r of Array.isArray(t.serial_lanes)?t.serial_lanes:[]){if(!r||typeof r.id!="string"||!/^s[1-5]$/.test(r.id))continue;let o=ai(r.entries,e);if(o>=0)return{lane:r.id,index:o}}return ai(t.done,e)>=0?{lane:"done"}:null}function Ha(e,t){let n=wg.has(e.route),r=e.route==="quick_fix";return{placeable:n&&!e.worker_ineligible&&!e.awaiting_user&&(r?e.has_description:e.spec==="published")&&t===null,route_ok:n,worker_ineligible:e.worker_ineligible,awaiting_user:e.awaiting_user,missing_description:r&&!e.has_description,spec:e.spec,location:t}}function Ho(e,t){let n=ho(e),r=ho(t),o=eo(n),i=n.workflow?.route_source==="explicit"&&typeof n.workflow.route=="string"&&n.workflow.route||(typeof ho(n.metadata).route=="string"?ho(n.metadata).route:""),s=i==="quick_fix",l=!Object.hasOwn(n,"description")||typeof n.description=="string"&&n.description.trim().length>0,a=Object.hasOwn(n,"labels")&&Vu(n.labels),u=Object.hasOwn(ho(n.metadata),"awaiting_user"),d=xg(typeof n.id=="string"?n.id:"",r);return Ha({route:i,spec:s?"n/a":o.conflict?"conflict":o.evidence,has_description:l,awaiting_user:u,worker_ineligible:a},d)}function Nr(e){let t=e.location;if(t)switch(t.lane){case"running":return"\uC2E4\uD589 \uC911\uC774\uB77C \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4";case"pr_wait":return"PR \uB300\uAE30 \uC911\uC774\uB77C \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4";case"done":return"\uC644\uB8CC \uB808\uC778\uC5D0 \uC788\uC5B4 \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4";case"parallel":return`\uC774\uBBF8 \uB300\uAE30 \uC911 \xB7 \uBCD1\uB82C #${t.index+1}`;default:return`\uC774\uBBF8 \uB300\uAE30 \uC911 \xB7 \uC9C1\uB82C ${t.lane.slice(1)} #${t.index+1}`}return e.placeable?"\uB300\uAE30 \uD050 \uB9E8 \uB4A4\uC5D0 \uCD94\uAC00":e.route_ok===!1?"route\uAC00 \uC815\uD574\uC9C0\uC9C0 \uC54A\uC544 \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":e.worker_ineligible?"worker-ineligible label\uB85C \uC6CC\uCEE4\uC5D0\uC11C \uC2E4\uD589\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":e.awaiting_user?"\uC0AC\uC6A9\uC790 \uB9AC\uBDF0\uB97C \uAE30\uB2E4\uB9AC\uB294 \uC911\uC774\uB77C \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":e.missing_description?"description\uC774 \uC5C6\uC5B4 \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":e.spec==="conflict"?"spec \uACBD\uB85C\uAC00 \uCDA9\uB3CC\uD574 \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"spec\uC774 \uBC1C\uD589\uB418\uC9C0 \uC54A\uC544 \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"}function Ko(e){let t=ho(e),n=typeof t.serial_lane_count=="number"&&Number.isInteger(t.serial_lane_count)&&t.serial_lane_count>0?Math.min(t.serial_lane_count,5):0,r=Array.isArray(t.serial_lanes)?t.serial_lanes:[],o=[];for(let s of r){if(o.length>=n)break;!s||typeof s.id!="string"||!/^s[1-5]$/.test(s.id)||!Array.isArray(s.entries)||o.push({id:s.id,label:`\uC9C1\uB82C ${s.id.slice(1)}`,count:s.entries.length})}return o.length===0?null:[{id:"parallel",label:"\uBCD1\uB82C",count:(Array.isArray(t.queue)?t.queue:[]).length},...o]}function Xu(e){return/^s[1-5]$/.test(e)?`\uC9C1\uB82C ${e.slice(1)}`:"\uBCD1\uB82C"}function ui(e){return typeof e=="string"&&e.length>=7?e.slice(0,7):"\u2014"}function td(e){return e==="session"?"bead\uAC00 in_progress\uB85C \uC7A1\uD78C \uB4A4 \uB2EB\uD788\uAE30\uAE4C\uC9C0\uC758 \uACBD\uACFC":"attempt \uC2E4\uD589 \uC2DC\uAC04 \uD569\uC0B0 (\uC7AC\uAC1C \uC138\uC158 \uD3EC\uD568)"}function jr(e){if(typeof e!="number"||!Number.isFinite(e)||e<0)return"\u2014";if(e<1e3)return`${Math.round(e)}ms`;let t=e/1e3;if(t<60)return`${t.toFixed(1)}\uCD08`;let n=Math.floor(t/60);if(n<60)return`${n}\uBD84 ${Math.round(t-n*60)}\uCD08`;let r=Math.floor(n/60),o=n%60;return`${r}\uC2DC\uAC04 ${o}\uBD84`}function nd(e,t){if(typeof e!="object"||e===null)return[];let n=!1,r=!1;for(let o of Object.values(e)){if(typeof o!="object"||o===null)continue;let i=o;i.bead_id!==t||i.kind!=="review_session"||(n=!0,r=r||i.origin==="auto")}return n?[r?"\uB9AC\uBDF0 \xB7 \uC790\uB3D9":"\uB9AC\uBDF0"]:[]}function Ju(e){return e==="auto"||e==="click"?e:null}function rd(e,t){if(typeof e!="object"||e===null)return{active:!1,failure:null,origin:null};let n=!1,r=null,o=-1,i=null,s=null,l=-1;for(let a of Object.values(e)){if(typeof a!="object"||a===null)continue;let u=a;if(u.bead_id!==t||u.kind!=="review_session")continue;if(u.status==="pending"||u.status==="running"){n=!0;let p=typeof u.started_at=="number"?u.started_at:0;p>=o&&(o=p,r=Ju(u.origin));continue}if(u.status!=="failed")continue;let d=typeof u.finished_at=="number"?u.finished_at:0;d>=l&&(l=d,i=typeof u.cause=="string"&&u.cause.length>0?u.cause:null,s=Ju(u.origin))}return n?{active:!0,failure:null,origin:r}:{active:!1,failure:i,origin:s}}function od(e,t){if(typeof e!="object"||e===null)return null;let n=0,r=!1;for(let o of Object.values(e)){if(typeof o!="object"||o===null)continue;let i=o;if(i.bead_id!==t)continue;let s=i.started_at,l=i.finished_at;typeof s!="number"||typeof l!="number"||!Number.isFinite(s)||!Number.isFinite(l)||l<s||(n+=l-s,r=!0)}return r?n:null}function di(e){if(typeof e!="number"||!Number.isFinite(e)||e<=0)return"";let t=new Date(e);return`${String(t.getHours()).padStart(2,"0")}:${String(t.getMinutes()).padStart(2,"0")}`}function Ag(e,t){let n=Array.isArray(e)?e:[],r=Array.isArray(t)?t:[];if(n.length===0&&r.length===0)return null;let o=null;for(let s of n)s.kind!=="deploy"||s.state!=="succeeded"||typeof s.target_sha!="string"||(!o||(typeof s.finished_at=="number"?s.finished_at:0)>(typeof o.finished_at=="number"?o.finished_at:0))&&(o=s);let i=n.filter(s=>s.state==="failed"&&!s.dismissed&&!s.superseded_by).length+r.length;return{deploy:o?{sha:ui(o.target_sha),at:typeof o.finished_at=="number"?o.finished_at:null,elapsed_ms:typeof o.elapsed_ms=="number"?o.elapsed_ms:null}:null,unresolved:i,badge:i>0?{tone:"act",label:`\uD574\uACB0 \uD544\uC694 ${i}`}:{tone:"quiet",label:"\uBAA8\uB450 \uC815\uC0C1"}}}function sd(e,t){let n=Ag(e,t);return n?c`<button
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
            >${di(n.deploy.at)}${n.deploy.elapsed_ms!==null?` \xB7 ${jr(n.deploy.elapsed_ms)}`:""}</span
          >
        </span>`:""}
    <span class="worker-repo-strip__spacer"></span>
    <span
      class="worker-repo-strip__badge worker-repo-strip__badge--${n.badge.tone}"
      >${n.badge.label}</span
    >
  </button>`:""}function bo(e){let t=_n(e.created_at),n=_n(e.updated_at);return!t&&!n?"":c`<div class="worker-mini__meta">
    ${t?c`<span title=${`\uC0DD\uC131 ${nn(e.created_at)}`}
          >생성 ${t}</span
        >`:""}${t&&n?c`<span>·</span>`:""}${n?c`<span title=${`\uC218\uC815 ${nn(e.updated_at)}`}
          >수정 ${n}</span
        >`:""}
  </div>`}function Sg(e){return!e||e==="requested"?"\uBC31\uC5C5 \uC911":e==="abandoned"?"\uD3D0\uAE30 \uD3EC\uAE30\uB428":e==="backup_verified"||e==="signaled"?"runner \uC885\uB8CC \uC911":e==="merged_revert"||e.startsWith("revert_")?"revert PR \uB300\uAE30":e.startsWith("rollback_")?"\uC6D0\uBCF5 \uBC30\uD3EC \uC911":e==="runner_terminated"||e.startsWith("pr_")||e.includes("ref_")||e.includes("worktree")||e.startsWith("bead_")?"PR \uC815\uB9AC \uC911":`\uD3D0\uAE30 \uCC98\uB9AC \uC911 (${e})`}function Yo(e,t){return t==="merged"?`${e}: \uC774\uBBF8 merge\uB41C \uAD6C\uD604\uC785\uB2C8\uB2E4. \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 revert PR\uC744 \uC0DD\uC131\uD558\uBA70, \uC2E4\uC81C \uC6D0\uBCF5\uC740 \uC0AC\uB78C\uC774 \uADF8 PR\uC744 merge\uD55C \uB4A4 \uC644\uB8CC\uB429\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`:`${e}: \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 runner/PR/branch/worktree\uB97C \uC815\uB9AC\uD558\uACE0 \uC774\uC288\uB97C \uD6C4\uBCF4\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`}function Vo(e,t){return t.kind==="stale_work_backup_fresh"?`${e}: \uC2E4\uD328\uD55C \uBC31\uC5C5 \uC791\uC5C5\uC744 \uD3EC\uAE30\uD569\uB2C8\uB2E4. \uBC31\uC5C5\uC740 \uB9CC\uB4E4\uC5B4\uC9C0\uC9C0 \uC54A\uC558\uACE0 \uAE30\uC874 \uC791\uC5C5\uC740 \uADF8\uB300\uB85C \uB0A8\uC2B5\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`:`${e}: \uC2E4\uD328\uD55C \uD3D0\uAE30 \uC791\uC5C5\uC744 \uD3EC\uAE30\uD569\uB2C8\uB2E4. \uBC31\uC5C5\uACFC \uD3D0\uAE30\uB294 \uC218\uD589\uB418\uC9C0 \uC54A\uC558\uACE0 bead\uB294 \uD3D0\uAE30 \uC774\uC804 \uC0C1\uD0DC\uB85C \uB3CC\uC544\uAC11\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`}function pi(e){return e.kind==="stale_work_backup_fresh"?`\uBC31\uC5C5 \uD3EC\uAE30\uB428 \xB7 \uAE30\uC874 \uC791\uC5C5\uC740 \uADF8\uB300\uB85C \uB0A8\uC2B5\uB2C8\uB2E4 (\uC6D0\uC778: ${e.last_error})`:`\uD3D0\uAE30 \uD3EC\uAE30\uB428 \xB7 \uD3D0\uAE30\uB294 \uC218\uD589\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4 (\uC6D0\uC778: ${e.last_error})`}function fi(e){let t=["\uD3D0\uAE30 \uC644\uB8CC"];return e.operation_id&&t.push(`\uC791\uC5C5 ${e.operation_id}`),e.receipt?.archive_path&&t.push(`\uBC31\uC5C5 ${e.receipt.archive_path}`),e.receipt?.original_pr?.url&&t.push(`\uC6D0\uBCF8 PR ${e.receipt.original_pr.url}`),e.receipt?.revert_pr?.url&&t.push(`revert PR ${e.receipt.revert_pr.url}`),t.join(" \xB7 ")}function id(e){return e?.startsWith("orphan_gitlink_content:")?`\uB9E4\uD551 \uC5C6\uB294 gitlink \uACBD\uB85C ${e.slice(23)}\uC5D0 \uB0B4\uC6A9\uC774 \uC788\uC2B5\uB2C8\uB2E4 \u2014 \uC800\uC7A5\uC18C\uC5D0\uC11C \uADF8 \uACBD\uB85C\uB97C \uC815\uB9AC\uD55C \uB4A4 \uC7AC\uC2DC\uB3C4\uD558\uAC70\uB098 \uD3EC\uAE30\uD558\uC138\uC694`:e==="dirty_submodule"?"\uC11C\uBE0C\uBAA8\uB4C8\uC5D0 \uBBF8\uCEE4\uBC0B \uBCC0\uACBD\uC774\uB098 \uBBF8\uCD08\uAE30\uD654 \uD56D\uBAA9\uC774 \uC788\uC2B5\uB2C8\uB2E4 \u2014 \uC815\uB9AC \uD6C4 \uC7AC\uC2DC\uB3C4\uD558\uC138\uC694":e==="submodule_observation_failed"?"\uC11C\uBE0C\uBAA8\uB4C8 \uC0C1\uD0DC\uB97C \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 (git \uC624\uB958) \u2014 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C git \uBA85\uB839\uC744 \uC9C1\uC811 \uD655\uC778\uD558\uC138\uC694":null}function or(e,t,n={}){let o=Object.values(e&&typeof e=="object"?e:{}).filter(_=>_&&_.bead_id===t&&Gu(_)).sort((_,m)=>(_.requested_at||0)-(m.requested_at||0)).at(-1),i=typeof n.attempt_id=="string"&&n.attempt_id.length>0?n.attempt_id:typeof o?.attempt_id=="string"?o.attempt_id:null,s=n.external?"\uC678\uBD80 PR\uC740 Worker\uAC00 \uC18C\uC720\uD558\uC9C0 \uC54A\uC544 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":n.done?"\uC644\uB8CC\uB41C \uC791\uC5C5\uC740 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":n.merge_active?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":n.merge_queued?"\uBA38\uC9C0 \uD050\uC5D0 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 [\uCDE8\uC18C]\uD558\uC138\uC694":n.conflict_active?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 \uC138\uC158\uC744 \uC815\uB9AC\uD558\uC138\uC694":n.cleanup_active?"\uC815\uB9AC \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":null,l=typeof o?.last_error=="string"?o.last_error:null,a=o?Sg(o.phase):null,u=o?.kind==="stale_work_backup_fresh",d=id(l),p=n.merged||o?.mode==="merged_revert"?"merged":"unmerged";return{action:!n.external&&!n.done,enabled:!s&&(!o||!!l),label:u?l?"\uBC31\uC5C5 \uC815\uB9AC \uC7AC\uC2DC\uB3C4":"\uBC31\uC5C5 \uD6C4 \uC0C8\uB85C \uC2DC\uC791":l?"\uC7AC\uC2DC\uB3C4":"\uD3D0\uAE30",title:s||(l?d?`\uD3D0\uAE30 \uC2E4\uD328: ${l} \u2014 ${d}`:u?`\uBC31\uC5C5 \uB4A4 \uC815\uB9AC \uC2E4\uD328: ${l} \u2014 \uC6D0\uBCF8\uACFC \uAC80\uC99D \uC601\uC218\uC99D\uC744 \uBCF4\uC874\uD55C \uCC44 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:`\uD3D0\uAE30 \uC2E4\uD328: ${l} \u2014 \uAC19\uC740 \uC791\uC5C5\uC744 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:o?`${a||"\uD3D0\uAE30 \uCC98\uB9AC \uC911"} \u2014 \uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694`:p==="merged"?"\uBCD1\uD569\uB41C \uBCC0\uACBD\uC744 \uC6D0\uBCF5 PR\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4":"\uBC31\uC5C5 \uD6C4 runner\xB7PR\xB7\uC6CC\uD06C\uD2B8\uB9AC\xB7\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4"),attempt_id:i,operation:o||null,progress:a,error:l,confirmation:p,abandon:{action:!!o&&o.phase==="requested"&&!!l,label:u?"\uBC31\uC5C5 \uD3EC\uAE30":"\uD3D0\uAE30 \uD3EC\uAE30",title:u?"\uC2E4\uD328\uD55C \uBC31\uC5C5 \uC791\uC5C5\uC744 \uD3EC\uAE30\uD569\uB2C8\uB2E4 \u2014 \uC6D0\uBCF8\uC740 \uADF8\uB300\uB85C \uB0A8\uACE0 \uC0C8\uB85C \uC2DC\uC791\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4":"\uC2E4\uD328\uD55C \uD3D0\uAE30 \uC791\uC5C5\uC744 \uD3EC\uAE30\uD569\uB2C8\uB2E4 \u2014 \uBC31\uC5C5\xB7\uD3D0\uAE30\uB294 \uC218\uD589\uB418\uC9C0 \uC54A\uC558\uACE0 bead\uB294 \uD3D0\uAE30 \uC774\uC804 \uC0C1\uD0DC\uB85C \uB3CC\uC544\uAC11\uB2C8\uB2E4"}}}function ad(e){if(!e||e.quickfix_lane!==!0)return!1;let t=e.quickfix_landing;return!t||typeof t!="object"?!1:["repo_operations","branch_cleanup","parent_close"].includes(t.cursor)}function ci(e){let t=e.discard;if(!t||!t.operation)return"";let n=t.operation,r=id(t.error),o=n.kind==="stale_work_backup_fresh"&&!t.error?null:n.backup?.path,i=n.original_pr,s=n.revert_pr;return c`<div
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
  </div>`}var Eg={dirty_unique:"\uCD5C\uC2E0 base\uC5D0 \uC5C6\uB294 \uB85C\uCEEC \uBCC0\uACBD\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",untracked_present:"\uCD94\uC801\uB418\uC9C0 \uC54A\uC740 \uD30C\uC77C\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",branch_ahead:"\uB85C\uCEEC branch\uC5D0 \uACE0\uC720 commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",head_ahead:"worktree HEAD\uC5D0 \uACE0\uC720 commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",ahead_not_contained:"\uB85C\uCEEC branch\uC758 \uACE0\uC720 commit\uC774 \uCD5C\uC2E0 base\uC5D0 \uD3EC\uD568\uB410\uC74C\uC744 \uC99D\uBA85\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",ahead_merge_commit:"\uB85C\uCEEC branch\uC5D0 \uC790\uB3D9 \uC815\uB9AC\uD560 \uC218 \uC5C6\uB294 merge commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",ahead_submodule_path:"\uB85C\uCEEC branch\uC758 \uACE0\uC720 commit\uC774 submodule \uACBD\uB85C\uB97C \uBCC0\uACBD\uD569\uB2C8\uB2E4",archive_failed:"\uACE0\uC720 commit \uBC31\uC5C5\uC744 \uC548\uC804\uD558\uAC8C \uAC80\uC99D\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",ref_delete_failed:"\uD655\uC778\uB41C local branch\uB97C \uC548\uC804\uD558\uAC8C \uC0AD\uC81C\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",resume_available:"\uC774\uC5B4\uAC08 \uC218 \uC788\uB294 \uC774\uC804 Worker session\uC774 \uC788\uC2B5\uB2C8\uB2E4",observe_failed:"Git \uC0C1\uD0DC\uB97C \uC548\uC804\uD558\uAC8C \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",identity_changed:"\uD655\uC778 \uC911 worktree \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4",ownership_unknown:"Worker \uC18C\uC720 worktree\uC778\uC9C0 \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"};function ld(e,t=!1){if(!e||typeof e!="object")return null;let n=e;if(n.reason!=="worktree_stale_work"||!n.stale_work||typeof n.stale_work!="object")return null;let r=n.stale_work,o=r.residue==="branch"?"branch":"worktree",i=r.state==="unique"?"unique":"unknown",s=r.summary&&typeof r.summary=="object"?r.summary:{};function l(u){return Number.isInteger(s[u])?Number(s[u]):0}let a=typeof r.cause=="string"?r.cause:"observe_failed";return{residue:o,state:i,title:o==="branch"?"\uC774\uC804 \uBE0C\uB79C\uCE58 \uBCF4\uC874\uB428":i==="unique"?"\uC774\uC804 \uC791\uC5C5 \uBCF4\uC874\uB428":"\uC774\uC804 \uC791\uC5C5 \uC0C1\uD0DC \uD655\uC778 \uC2E4\uD328",cause:Eg[a]||"\uC548\uC804\uD558\uAC8C \uC790\uB3D9 \uC815\uB9AC\uD560 \uC218 \uC5C6\uB294 \uC774\uC804 \uC791\uC5C5\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",summary:o==="branch"?`\uACE0\uC720 commit ${l("branch_ahead")}`:[`staged ${l("staged_count")}`,`unstaged ${l("unstaged_count")}`,`untracked ${l("untracked_count")}`,`branch ahead ${l("branch_ahead")}`,`HEAD ahead ${l("head_ahead")}`].join(" \xB7 "),action_id:typeof r.action_id=="string"?r.action_id:"",can_resume:r.can_resume===!0,can_continue:r.can_continue===!0,can_backup_fresh:r.can_backup_fresh===!0,can_recheck:r.can_recheck===!0,locked:t}}function _i(e,t={}){if(!e||!e.orchestration&&!e.worker)return"";let n=t.pin===!0?" exec-chip--pin":"",r=t.pin===!0?`
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
      >`:""}`}function Go(e,t){let n=`worker-dep worker-dep--${t}${e.foreign?" worker-dep--foreign":""}`;return e.openable===!0?c`<button
        type="button"
        class=${`${n} worker-dep__open`}
        data-dep-id=${e.id}
        data-root-dir=${e.root_dir||""}
        title=${e.title||""}
      >
        ${e.label}
      </button>`:c`<span class=${n} title=${e.title||""}>${e.label}</span>`}function Tg(e){return{id:e.id,label:`\u29C9 ${e.id}`,title:[`\uACB9\uCE68 \xB7 ${e.location_label}`,...e.prefixes].join(`
`),openable:!0,...e.root_dir?{root_dir:e.root_dir}:{}}}function Ka(e){return Array.isArray(e)?e.slice().sort((t,n)=>t.id<n.id?-1:t.id>n.id?1:0):[]}function Cg(e,t=!1){return e?c`<button
    type="button"
    class="ctl-chip ctl-chip--label judgement-chip worker-card__spec-after-blocker"
    data-chip-key="spec_after_blocker"
    aria-expanded=${t?"true":"false"}
    title="선행의 결과가 설계 전제라 스펙도 선행 뒤에 씁니다"
  >
    스펙 대기
  </button>`:""}function cd(e){if(!Object.hasOwn(e,"route_ok")||e.queue_placeable===!0)return null;let t="";return e.route_ok===!1&&(t="\uB77C\uC6B0\uD305 \uD544\uC694"),t.length===0&&(e.worker_ineligible===!0||e.awaiting_user===!0)||(t.length===0&&e.missing_description===!0?t="\uBCF8\uBB38 \uD544\uC694":t.length===0&&e.placement_spec==="conflict"?t="\uC2A4\uD399 \uCDA9\uB3CC":t.length===0&&Object.hasOwn(e,"placement_spec")&&e.placement_spec!=="published"&&(t="\uC2A4\uD399 \uBBF8\uBC1C\uD589"),t.length===0)?null:{label:t,title:Nr({placeable:!1,route_ok:e.route_ok,worker_ineligible:e.worker_ineligible===!0,awaiting_user:e.awaiting_user===!0,missing_description:e.missing_description===!0,spec:e.placement_spec})}}function Rg(e,t){return e?c`<button
    type="button"
    class="ctl-chip ctl-chip--label judgement-chip worker-card__readiness"
    data-chip-key="readiness"
    aria-expanded=${t?"true":"false"}
    title=${e.title}
  >
    ${e.label}
  </button>`:""}function mi(e,t=""){if(!e)return t===""?"":c`<div class="worker-deps worker-deps--primary">
          ${t}
        </div>`;let n=Ka(e.predecessors),r=Array.isArray(e.released)?e.released:[],o=Ka(e.dependents),i=Ka(e.overlaps),s=e.scope_missing===!0,l=e.armed_lane||null,a=!!l||n.length>0||o.length>0||t!=="",u=r.length>0||i.length>0||s;return!a&&!u?"":c`${a?c`<div class="worker-deps worker-deps--primary">
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
            >`:""}${n.map(d=>Go(d,"pred"))}${t}${o.map(d=>Go(d,"dependents"))}
      </div>`:""}${u?c`<div class="worker-deps worker-deps--secondary">
        ${r.map(d=>Go(d,"released"))}${i.map(d=>Go(Tg(d),"overlap"))}${s?c`<span
              class="worker-dep worker-dep--muted"
              title="겹침 판정 불가 — 아티팩트가 있으면 스펙/플랜 front-matter, 없으면 description \`## scope\`에 선언 필요"
              >scope 없음</span
            >`:""}
      </div>`:""}`}function ud(e,t=""){let n=(Array.isArray(e)?e:[]).filter(r=>typeof r=="string"&&r!=="").slice().sort();return n.length===0?"":c`<div class="worker-deps worker-deps--secondary">
    ${n.map(r=>Go({id:r,label:`\uC774\uC6D4 \u2192 ${r}`,title:`\uC774\uC6D4\uB41C \uD6C4\uC18D ${r} \uC5F4\uAE30`,openable:!0,...t?{root_dir:t}:{}},"dependents"))}
  </div>`}function gi(e){return e?c`<button
    type="button"
    class="worker-dep worker-dep--lane mon-lane__chip"
    data-lane-id=${e.lane_id}
    title="이 연결 레인으로 이동"
  >
    ${e.label}
  </button>`:""}function hi(e){if(!e)return"";let t=e.chips||{},n=t.route||e.route,r=t.route_source==="derived"||e.route_source==="derived";return n?c`<span
    class="ctl-chip ctl-chip--route${r?" is-derived":""}"
    title=${r?"route \uBBF8\uD540 (metadata unset)":"route"}
    >${r?"unset":n}</span
  >`:""}function Og(e,t=!1){let n=e?e.quick_fix_review:null;if(!n)return"";let r=n.state;if(r!=="reviewed"&&r!=="stale")return"";let o=Array.isArray(n.missing)?n.missing:[],i=[r==="reviewed"?"quick_fix self-review \uC601\uC218\uC99D\uC774 \uC9C0\uAE08 \uBCF8\uBB38\uACFC \uC77C\uCE58\uD569\uB2C8\uB2E4":"quick_fix self-review \uC601\uC218\uC99D\uC774 \uC9C0\uAE08 \uBCF8\uBB38\uACFC \uB2E4\uB985\uB2C8\uB2E4",...o].join(`
`);return c`<button
    type="button"
    class="ctl-chip judgement-chip worker-card__qfr worker-card__qfr--${r}"
    data-chip-key="qfr"
    aria-expanded=${t?"true":"false"}
    title=${i}
  >
    ${r==="reviewed"?"\uB9AC\uBDF0 \u2713":"\uB9AC\uBDF0 stale"}
  </button>`}function dd(e){return e?c`<button
    type="button"
    class="ctl-chip ctl-chip--from"
    data-from-id=${e}
    title=${`\uCD9C\uCC98 ${e} \uC5F4\uAE30`}
  >
    ↩ from ${e}
  </button>`:""}function bi(e,t=!1){return e?c`<button
    type="button"
    class="ctl-chip ctl-chip--label judgement-chip worker-card__rec"
    data-chip-key="rec"
    data-state=${e.state}
    aria-expanded=${t?"true":"false"}
    title=${oi(e)}
  >
    ${"\uBCF5\uC7A1"}
  </button>`:""}var Ig={absent:"\uC2E4\uD589 \uC601\uC218\uC99D\uC774 \uAE30\uB85D\uB418\uC9C0 \uC54A\uC558\uB2E4 \u2014 \uACFC\uAC70 Bead\xB7\uC678\uBD80 \uACBD\uB85C PR\uC740 \uC6D0\uB798 \uC5C6\uB2E4",unparsable:"\uC601\uC218\uC99D \uAC12\uC744 \uC77D\uC744 \uC218 \uC5C6\uB2E4 \u2014 40hex SHA\uB098 `delegated:`/`main:` \uD615\uC2DD\uC774 \uC544\uB2C8\uB2E4",effort_unknown:"effort \uD1A0\uD070\uC774 harness \uC5B4\uD718 \uBC16\uC774\uB2E4 \u2014 \uBAA8\uB378\xB7SHA\xB7unit\uC740 \uC720\uD6A8\uD558\uB2E4",main_reason_retired:"`main:` \uC0AC\uC720\uAC00 \uACE0\uC815 4\uD1A0\uD070(bead\xB7quick_fix_default\xB7phase_line\xB7takeover) \uBC16\uC774\uB2E4",main_receipt_unbacked:"`main:` \uC0AC\uC720\uB97C \uB4B7\uBC1B\uCE68\uD558\uB294 \uBA54\uD0C0\uB370\uC774\uD130(impl_dispatch\xB7route\xB7planned_execution\xB7quick_fix \uAE30\uBCF8 dispatch)\uAC00 \uC5C6\uB2E4",takeover_lineage_missing:"`main:takeover`\uC778\uB370 resolved \uBAA8\uB378\uACFC \uC77C\uCE58\uD558\uB294 \uC644\uB8CC\uB41C \uC704\uC784 \uC138\uC158\uC774 \uC5C6\uB2E4",takeover_lineage_unobservable:"`main:takeover`\uC778\uB370 \uC704\uC784 \uACC4\uBCF4\uB97C \uBAA8\uB2C8\uD130\uAC00 \uBCFC \uC218 \uC5C6\uB2E4(Codex \uBC16 \uB7F0\uD0C0\uC784)"};function Lg(e,t=!1){let n=pd(e);if(n.length===0)return"";let r=n.length>1?`\uC601\uC218\uC99D \xB7 ${n[0]} +${n.length-1}`:`\uC601\uC218\uC99D \xB7 ${n[0]}`;return c`<button
    type="button"
    class="ctl-chip ctl-chip--label judgement-chip worker-card__receipt"
    data-chip-key="receipt"
    data-bead-id=${e.id}
    aria-expanded=${t?"true":"false"}
    title=${n.join(", ")}
  >
    ${r}
  </button>`}function pd(e){let t=e.receipt_badge?e.receipt_badge.codes:null;return Array.isArray(t)?t.filter(n=>typeof n=="string"&&n.length>0):[]}function fd(e,t){return!e||typeof t!="number"?"":c`<a
    class="worker-mini__pr"
    href=${e}
    target="_blank"
    rel="noreferrer noopener"
    title="PR 열기"
    >#${t} ↗</a
  >`}function yi(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=Math.max(0,Math.min(4,Math.trunc(e)));return c`<span class="worker-pri" title=${`\uC6B0\uC120\uC21C\uC704 P${t}`}
    >P${t}</span
  >`}function Pg(e){let t=Array.isArray(e.badges)?e.badges:[],n=un(e.usage),r=tr(e.usage),o=_n(e.done_at);return c`<div
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
      ${fd(e.pr_url,e.pr_number)}${o?c`<span
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
    ${ud(e.carried_to,e.root_dir)}
    <div class="worker-mini__row3">
      ${n.length>0?n.map(i=>c`<span class="worker-usage" title=${i.tooltip}
                >${i.label}</span
              >`):r?c`<span class="worker-usage" title=${Mo(e.usage)}
              >${r}</span
            >`:""}
      ${typeof e.work_ms=="number"?c`<span
            class="worker-mini__work"
            title=${td(e.work_kind)}
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
  </span>`}function qn(e,t={}){if(e.lane==="done"&&e.done_layout==="three_line")return Pg(e);let n=e.draggable&&!e.done,r=Array.isArray(e.badges)?e.badges:[],o=un(e.usage),i=tr(e.usage),s=e.merge_step||null,l=e.lane==="pr_wait"||!!e.revise_action||!!e.stale_work||e.discard?.abandon.action===!0,a=e.lane==="done"&&!l,u=a?_n(e.done_at):"",d=n?c`<span class="worker-mini__grip" aria-hidden="true">⠿</span>`:"",p=typeof e.seq=="number"?c`<span class="worker-mini__seq" aria-hidden="true"
          >${e.seq}</span
        >`:"",_=e.workspace_name?c`<span class="worker-mini__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:"",m=c`<span class="worker-mini__id" title="클릭하면 ID 복사"
    >${e.id}</span
  >`,y=e.lane==="done"?"":hi(e.workflow),C=e.lane==="done"?"":dd(e.from_id),O=yi(e.priority),V=c`<span class="worker-mini__title">${e.title}</span>`,te=fd(e.pr_url,e.pr_number),W=r.map(ut=>ut===e.live_badge?c`<span
          class="worker-mini__badge worker-mini__badge--activity"
          title="서버가 이 PR을 처리하는 중입니다"
          ><span class="act-dot" aria-hidden="true"></span>${ut}</span
        >`:c`<span
          class="worker-mini__badge${e.alert?" worker-mini__badge--alert":""}"
          title=${ut===e.completion_badge&&e.completion_title||""}
          >${ut}</span
        >`),q=e.reason?c`<span class="worker-mini__reason">${e.reason}</span>`:"",I=o.length>0?o.map(ut=>c`<span class="worker-usage" title=${ut.tooltip}
              >${ut.label}</span
            >`):i?c`<span class="worker-usage" title=${Mo(e.usage)}
            >${i}</span
          >`:"",P=s?c`<span
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
      </button>`:"",N=e.discard,j=N?.action||e.discard_action?c`<button
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
        </button>`:"",z=N?.abandon.action?c`<button
        type="button"
        class="worker-mini__discard-abandon"
        data-bead-id=${e.id}
        data-operation-id=${N.operation.operation_id}
        data-operation-kind=${N.operation.kind||""}
        data-last-error=${N.error||""}
        title=${N.abandon.title}
      >
        ${N.abandon.label}
      </button>`:"",K=e.resolve_action?c`<button
        type="button"
        class="worker-mini__resolve"
        data-bead-id=${e.id}
        ?disabled=${e.resolve_enabled===!1}
        title=${e.resolve_title||"\uC2E4\uD328\uD55C \uC791\uC5C5\uC744 \uC774\uC5B4\uBC1B\uB294 \uB300\uD654\uD615 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4 (\uAE30\uB85D\uB41C \uC138\uC158\uC774 \uC788\uC73C\uBA74 fork)"}
      >
        세션에서 해결
      </button>`:"",oe=N?.abandon.action?c`${j}${z}${K}`:c`${K}${j}`,ve=e.stale_work||null,Ne=ve?c`${ve.can_resume||ve.can_continue?c`<button
            type="button"
            class="worker-mini__stale-continue"
            data-bead-id=${e.id}
            data-action-id=${ve.action_id}
            ?disabled=${ve.locked}
          >
            기존 작업 이어가기
          </button>`:""}${ve.can_backup_fresh?c`<button
            type="button"
            class="worker-mini__stale-backup"
            data-bead-id=${e.id}
            data-action-id=${ve.action_id}
            ?disabled=${ve.locked}
          >
            백업 후 새로 시작
          </button>`:""}${ve.can_recheck?c`<button
            type="button"
            class="worker-mini__stale-recheck"
            data-bead-id=${e.id}
            data-action-id=${ve.action_id}
            ?disabled=${ve.locked}
          >
            다시 확인
          </button>`:""}`:"",F=ve?c`<div class="worker-mini__stale">
        <strong>${ve.title}</strong>
        <span>${ve.summary}</span>
        <span>${ve.cause}</span>
        ${ve.can_backup_fresh?c`<small
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
        </button>`:"",Ae=!!(e.lane!=="pr_wait"&&!e.done&&e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker)),Ee=bi(e.rec,br(e,"rec")),R=Lg(e,br(e,"receipt")),se=gi(e.cross_lane_chip),ye=qr(e.log_path),ke=_||se||y||C||Ae||Ee||R||I||ye?c`<div class="worker-chips">
          ${_}${se}${y}${C}${Ae?_i(e.exec_chips,{pin:e.exec_chips_pinned===!0}):""}${Ee}${R}${I}${ye}${li(e)}
        </div>`:"",Me=mi(e.dependency_chips),he=ci(e),Ie=t.actions?t.actions:"",Ze=!!(s||e.merge_action||e.cancel_action||e.resolve_action||e.discard_action||N?.operation||e.revise_action||ve);return c`<div
    class="worker-mini${l?" worker-mini--card":""}${n?"":" worker-mini--static"}${e.done?" worker-mini--done":""}${e.ghost?" worker-mini--ghost":""}${s?" worker-mini--merging":""}${s?.failed?" worker-mini--merge-failed":""}${e.external?" worker-mini--external":""}${e.search_match===!1?" is-dimmed":""}"
    style=${s?`--progress: ${s.percent}%`:""}
    draggable=${n?"true":"false"}
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    ${a?c`<div class="worker-mini__row1">
            ${_}${m}${O}${C}${te}${V}${Ie}
          </div>
          ${ud(e.carried_to,e.root_dir)}
          <div class="worker-mini__row2">
            ${I}${u?c`<span
                  class="worker-mini__done-at"
                  title=${`\uC644\uB8CC ${nn(e.done_at)}`}
                  >완료 ${u}</span
                >`:""}${typeof e.work_ms=="number"?c`<span
                  class="worker-mini__work"
                  title=${td(e.work_kind)}
                  >작업 ${jr(e.work_ms)}</span
                >`:""}${W}${P}
            <span class="worker-mini__actions"
              >${U}${Y}${oe}</span
            >
            ${bo(e)}
          </div>`:l?c`<div class="worker-mini__head">
              ${d}${p}${m}${O}${te}${W}${q}${Ie}
            </div>
            <div class="worker-mini__body">${V}${F}</div>
            ${Me}${ke}${Ze?c`<div class="worker-mini__foot">
                  ${P}
                  <span class="worker-mini__actions"
                    >${U}${Y}${oe}${X}${Ne}</span
                  >
                  ${ci(e)}
                </div>`:""}
            ${bo(e)}`:c`<div class="worker-mini__line">
              ${d}${p}${m}${O}${V}${te}${W}${q}${P}${U}${Y}${oe}${Ie}
            </div>
            ${Me}${ke}${he} ${bo(e)}`}
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
      </button>`)}return c`${r}`}var _d={external_roundtrip:"\uD558\uB124\uC2A4 \uBC16 \uC0C1\uB300\uC640 \uC608\uCE21 \uBD88\uAC00 \uC655\uBCF5 \uBC18\uBCF5 \u2014 \uB2E4\uB978 rig \uC138\uC158\xB7\uC0AC\uB78C\xB7\uC678\uBD80 \uC2DC\uC2A4\uD15C",user_feedback_loop:"\uC9C4\uD589 \uC911 \uC0AC\uC6A9\uC790 \uD53C\uB4DC\uBC31 \uC5C6\uC774\uB294 \uD488\uC9C8\uC774 \uB0AE\uC74C \u2014 \uBB38\uC548\xB7\uC124\uACC4 \uC138\uBD80\xB7\uBC29\uD5A5 \uC120\uD0DD"};function Va(e,t){if(t==="rec"){let n=e.rec;if(!n)return null;let r=Wa[n.state]||"";return{title:"\uBCF5\uC7A1\uD55C \uC791\uC5C5\uC73C\uB85C \uD310\uC815\uB428",lines:[...Ua(n),...r.length>0?[`\uC0C1\uD0DC: ${r}`]:[],"\uC801\uC6A9\uC740 \uC774\uC288 \uC0C1\uC138\uC758 \uC2E4\uD589 \uC124\uC815 \uD3B8\uC9D1\uAE30\uC5D0\uC11C"]}}if(t==="session_preferred"){if(e.session_preferred!==!0)return null;let n=_d[e.session_preferred_reason||""]||"";return{title:"\uC6CC\uCEE4\uB85C \uB3CC\uB9B4 \uC218 \uC788\uC9C0\uB9CC \uC138\uC158\uC774 \uB0AB\uB2E4",lines:n.length>0?[n]:[]}}if(t==="ineligible")return e.worker_ineligible!==!0?null:{title:"\uC6CC\uCEE4 \uC2E4\uD589 \uB300\uC0C1\uC774 \uC544\uB2C8\uB2E4",lines:["worker-ineligible \uB77C\uBCA8\uC774 \uBD99\uC5B4 \uC788\uB2E4 \u2014 \uB77C\uBCA8\uC740 \uC774\uC288 \uC0C1\uC138\uC758 \uB77C\uBCA8 \uC808\uC5D0\uC11C \uB5C0\uB2E4"]};if(t==="spec_after_blocker")return e.spec_after_blocker!==!0?null:{title:"\uC120\uD589 \uACB0\uACFC\uAC00 \uC124\uACC4 \uC804\uC81C \u2014 \uC2A4\uD399\uB3C4 \uC120\uD589 \uB4A4\uC5D0",lines:[`\uC120\uD589: ${(Array.isArray(e.blocked_by)?e.blocked_by:[]).join(" \xB7 ")}`,"\uC120\uD589\uC774 \uB2EB\uD788\uBA74 \uC774 \uD45C\uC2DC\uB294 \uC800\uC808\uB85C \uC0AC\uB77C\uC9C4\uB2E4 \u2014 \uB77C\uBCA8\uC740 \uC774\uC288 \uC0C1\uC138\uC758 \uB77C\uBCA8 \uC808\uC5D0\uC11C \uB5C0\uB2E4"]};if(t==="readiness"){let n=cd(e);return n?{title:n.title,lines:[]}:null}if(t==="receipt"){let n=pd(e);return n.length===0?null:{title:"\uC2E4\uD589 \uC601\uC218\uC99D \uD68C\uACC4 \uC794\uC5EC \u2014 \uBA38\uC9C0\uB294 \uC9C4\uD589",lines:[...n.map(r=>Ig[r]||r),"\uC790\uB3D9 \uBA38\uC9C0 \uD310\uC815\uC5D0\uB294 \uC601\uD5A5\uC774 \uC5C6\uB2E4 \u2014 \uC815\uC815\uC740 bd update --set-metadata exec_receipt=\u2026 \uB85C"]}}if(t==="qfr"){let n=e.workflow?e.workflow.quick_fix_review:null;if(!n||n.state!=="reviewed"&&n.state!=="stale")return null;let r=Array.isArray(n.missing)?n.missing:[];return{title:n.state==="reviewed"?"quick_fix self-review \uC601\uC218\uC99D\uC774 \uC9C0\uAE08 \uBCF8\uBB38\uACFC \uC77C\uCE58\uD569\uB2C8\uB2E4":"quick_fix self-review \uC601\uC218\uC99D\uC774 \uC9C0\uAE08 \uBCF8\uBB38\uACFC \uB2E4\uB985\uB2C8\uB2E4",lines:r.length>0?r:["\uBE60\uC9C4 \uD56D\uBAA9 \uC5C6\uC74C"]}}return null}var Dg=["rec","receipt","session_preferred","ineligible","qfr","spec_after_blocker","readiness"];function vi(e,t){for(let n of Dg){if(!t(n))continue;let r=Va(e,n);return r?{chip_key:n,content:r}:null}return null}function li(e){return e.chip_popover?uo(e.chip_popover.content):""}function br(e,t){return!!e.chip_popover&&e.chip_popover.chip_key===t}var Qa="\uC0AC\uC6A9\uC790 \uB9AC\uBDF0 \uD544\uC694";function Xa(e,t=null,n={}){let r=e.worker_ineligible===!0,o=e.draggable&&!e.done&&!r,i=e.queue_placeable===!0&&!e.done&&!r,s=i&&t&&t.bead_id===e.id,l=e.session_preferred===!0,a=_d[e.session_preferred_reason||""]||"",u=e.workflow,d=e.missing_description===!0,p=e.awaiting_user===!0,_=typeof e.reason=="string"&&e.reason.startsWith("\u26D4"),m=br(e,"spec_after_blocker"),y=Cg(e.spec_after_blocker===!0,m),C=cd(e),O=br(e,"readiness"),V=Rg(C,O),te=c`${y}${m?li(e):""}${V}${O?li(e):""}`,W=mi(e.dependency_chips,y===""&&V===""?"":te),q=e.workspace_name?c`<span class="worker-card__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:"",I=gi(e.cross_lane_chip),P=hi(u),U=dd(e.from_id),Y=!!(e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker)),N=!r&&(e.blocked===!0||e.queue_placeable===!1);return c`<div
    class="worker-card${o?"":" worker-card--static"}${r?" worker-card--ineligible":""}${N?" worker-card--blocked":""}${e.search_match===!1?" is-dimmed":""}"
    draggable=${o?"true":"false"}
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    <div class="worker-card__head">
      ${o?c`<span class="worker-card__grip" aria-hidden="true">⠿</span>`:""}
      <span class="worker-card__id" title="클릭하면 ID 복사">${e.id}</span
      >${yi(e.priority)}
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
            </button>`:""}${bi(e.rec,br(e,"rec"))}${Og(u,br(e,"qfr"))}
      ${m||O?"":li(e)}
    </div>
    <div class="worker-card__title">${e.title}</div>
    ${u?Us(u,e.status,{onOpenDoc:n.onOpenDoc}):""}${W}
    ${q||I||P||U||Y?c`<div class="worker-chips">
          ${q}${I}${P}${U}${_i(e.exec_chips,{pin:n.exec_chips_mode==="pinned_only"})}
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
                  </div>`:e.items.map(o=>e.lane==="candidate"?Xa(o,e.place_menu,{onOpenDoc:e.onOpenDoc}):qn(o))}
          </div>`}
  </section>`}function ed(e,t,n){return c`<button
      type="button"
      class="worker-wait__area-toggle"
      data-area=${e}
      aria-expanded=${n?"false":"true"}
      aria-label=${`${t} ${n?"\uD3BC\uCE58\uAE30":"\uC811\uAE30"}`}
    >
      ${n?"\u25B8":"\u25BE"}
    </button>
    <span class="worker-wait__area-name">${t}</span>`}function ki(e){let t=e.parallel,n=e.serial,r=t.drop||{};return c`<div class="worker-wait">
    <section
      class="worker-wait__area worker-wait__area--parallel${t.collapsed?" is-collapsed":""}"
      data-area="parallel"
    >
      <header class="worker-wait__area-hd">
        ${ed("parallel","\uBCD1\uB82C \uC601\uC5ED",t.collapsed)}
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
        ${ed("serial","\uC9C1\uB82C \uC601\uC5ED",n.collapsed)}
        ${n.header_control?n.header_control:""}
      </header>
      ${n.collapsed?"":c`<div class="worker-wait__area-body">
            ${n.notice?n.notice:""}
            ${n.extra_panes?n.extra_panes:""}
            ${n.lanes.map(o=>Mg(o))}
          </div>`}
    </section>
  </div>`}function Mg(e){let t=e.drop||{},n=e.badge?c`<span
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
  </div>`}function wi(e){return e.count?c`<section
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
  </section>`:""}var md=[{step:"merge",label:"\uBA38\uC9C0",index:1},{step:"base",label:"base",index:2},{step:"verify",label:"\uAC80\uC99D",index:3},{step:"deploy",label:"\uBC30\uD3EC",index:4},{step:"child",label:"\uC790\uC2DD",index:5},{step:"branch",label:"\uBE0C\uB79C\uCE58",index:6},{step:"close",label:"close",index:7}],Qo=[{step:"base_containment",label:"base \uD3EC\uD568 \uD655\uC778"},{step:"repo_operations",label:"\uC800\uC7A5\uC18C \uC791\uC5C5"},{step:"post_merge_jobs",label:"\uBA38\uC9C0 \uD6C4 \uC7A1"},{step:"child_sweep",label:"\uC790\uC2DD \uC815\uB9AC"},{step:"branch_cleanup",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC"},{step:"parent_close",label:"\uBD80\uBAA8 close"}];function $i(e,t){let n=md.find(o=>o.step===e);if(!n)return null;let r=md.length;return{step:n.step,label:t,index:n.index,total:r,percent:Math.round(n.index/r*100)}}function gd(e){let t=Qo.findIndex(n=>n.step===e);return Qo.map((n,r)=>({step:n.step,label:n.label,state:t<0?"todo":r<t?"done":r===t?"stall":"todo"}))}function Fr(e){let t=Qo.find(n=>n.step===e);return t?t.label:typeof e=="string"?e:""}function qg(e){let t=Qo.findIndex(n=>n.step===e);return t<0?null:{index:t+1,total:Qo.length}}function xi(e){let t=qg(e);return t?`\uBA38\uC9C0 \uC644\uB8CC \xB7 \uC815\uB9AC ${t.total}\uB2E8\uACC4 \uC911 ${t.index}\uB2E8\uACC4\uC5D0\uC11C \uBA48\uCDA4`:"\uBA38\uC9C0\uB428 \xB7 \uC815\uB9AC \uBBF8\uC644"}var Ja=new Set(["queued","running","retry_pending"]),hd=new Set(["failed","succeeded"]),Ng={queued:"\uB300\uAE30",running:"\uC911",retry_pending:"\uC7AC\uC2DC\uB3C4 \uB300\uAE30",failed:"\uC2E4\uD328",succeeded:"\uC644\uB8CC \xB7 \uC815\uB9AC \uC7AC\uC2DC\uB3C4 \uB300\uAE30"},Xo={base_containment:{step:"base",label:"base \uD655\uC778 \uC911"},child_sweep:{step:"child",label:"\uC790\uC2DD \uC815\uB9AC \uC911"},branch_cleanup:{step:"branch",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC \uC911"},parent_close:{step:"close",label:"\uBD80\uBAA8 close \uC911"}},jg={merging:{step:"merge",label:"\uBA38\uC9C0 \uC911"},base_containment:Xo.base_containment,child_sweep:Xo.child_sweep,branch_cleanup:Xo.branch_cleanup,parent_close:Xo.parent_close};function Fg(e){return typeof e=="string"&&/^[0-9a-f]{40}$/.test(e)}function Bg(e,t,n){return!["verify","deploy"].includes(e.kind)||![...Ja,...hd].includes(e.state)||![null,void 0,""].includes(e.superseded_by)||!Array.isArray(e.subjects)?!1:e.subjects.some(r=>r&&typeof r=="object"&&r.bead_id===t&&r.merged_sha===n)}function Ug(e,t){let n=(t.kind==="deploy"?2:1)-(e.kind==="deploy"?2:1);if(n!==0)return n;let r=u=>u.state==="succeeded"?1:2,o=r(t)-r(e);if(o!==0)return o;let i=typeof e.requested_at=="number"?e.requested_at:0,s=typeof t.requested_at=="number"?t.requested_at:0;if(i!==s)return s-i;let l=typeof e.operation_id=="string"?e.operation_id:"",a=typeof t.operation_id=="string"?t.operation_id:"";return l.localeCompare(a)}function Za(e,t=!1){let n=e.kind,r=n==="verify"?"\uAC80\uC99D":"\uBC30\uD3EC",o=t?"failed":e.state,i=Ng[o];if(!i)return null;let s=$i(n,`${r} ${i}`);return s?{...s,active:Ja.has(o),failed:o==="failed"}:null}function Wg(e){return!e||typeof e!="object"?null:jg[e.step]||null}function Zo(e){if(!e||typeof e.bead_id!="string")return null;let t=e.bead_id,n=e.merge_progress&&typeof e.merge_progress=="object"?e.merge_progress:{},r=Wg(n),o=e.cleanup_failed&&typeof e.cleanup_failed=="object"?e.cleanup_failed:null,i=["post_merge_jobs","child_sweep","branch_cleanup","parent_close"].includes(typeof e.cleanup_cursor=="string"?e.cleanup_cursor:""),s=!i&&(e.cleanup_cursor==="repo_operations"||n.step==="repo_operations"),l=Fg(e.merge_sha)?e.merge_sha:null,a=!i&&l&&Array.isArray(e.repo_operations)?e.repo_operations.filter(y=>y&&typeof y=="object"&&Bg(y,t,l)).sort(Ug):[],u=s?a:[],d=u.find(y=>Ja.has(y.state));if(d)return Za(d);if(o)return o.step==="repo_operations"&&a[0]?Za(a[0],!0):null;let p=u.find(y=>hd.has(y.state)?y.state!=="succeeded"||e.cleanup_cursor==="repo_operations":!1);if(p)return Za(p);if(r){let y=$i(r.step,r.label);return y?{...y,active:!0,failed:!1}:null}let _=typeof e.cleanup_cursor=="string"?Xo[e.cleanup_cursor]:null;if(!_)return null;let m=$i(_.step,_.label);return m?{...m,active:!0,failed:!1}:null}function Ai(e){return!!e&&e.step!=="merge"&&e.failed!==!0}var zg="\uBBF8\uC801\uC7AC";function el(e,t){let n=Jn(e,t.id);return{id:t.id,label:`\u26D3 ${t.id}`,title:`\uC120\uD589 \u2014 close\uB420 \uB54C\uAE4C\uC9C0 \uCD9C\uBC1C\uD558\uC9C0 \uC54A\uB294\uB2E4 (${t.location_label})`,...n?{foreign:!0}:{}}}var Hg=10080*60*1e3;function bd(e,t,n){let r=t.closed_at;if(typeof r!="number"||!Number.isFinite(r)||r<n-Hg)return null;let o=Jn(e,t.id),i=typeof t.root_dir=="string"?t.root_dir:"",s={id:t.id,label:`\u{1F513} ${t.id}`,title:`\uD574\uC81C \u2014 ${nn(r)}\uC5D0 close\uB418\uC5B4 \uC774 \uC774\uC288\uAC00 \uD480\uB838\uB2E4`,...o?{foreign:!0}:{}};return o?i.length>0&&(s.openable=!0,s.root_dir=i):s.openable=!0,s}function yd(e,t){let n=Array.isArray(t.ids)?t.ids.filter(i=>typeof i=="string"&&i.length>0):[],r=t.root_dirs&&typeof t.root_dirs=="object"?t.root_dirs:{},o=[];for(let i of[...new Set(n)].sort()){let s=Jn(e,i),l=typeof r[i]=="string"?r[i]:"",a={id:i,label:`\u2192 ${i}`,title:"\uD6C4\uC18D \u2014 \uC774 \uC774\uC288\uAC00 close\uB418\uBA74 \uD480\uB9B0\uB2E4",...s?{foreign:!0}:{}};l.length>0?(a.openable=!0,a.root_dir=l):s||(a.openable=!0),o.push(a)}return o}function vd(e,t,n={}){let r=new Map,o=new Map;for(let i of t)o.has(i.id)||o.set(i.id,i.location_label);for(let[i,s]of e){if(typeof i!="string"||i.length===0)continue;let l=[];for(let a of Array.isArray(s)?s:[]){if(typeof a!="string"||a.length===0)continue;let u=el(i,{id:a,location_label:o.get(a)||zg}),d=n[a];u.foreign!==!0?u.openable=!0:typeof d=="string"&&d.length>0&&(u.openable=!0,u.root_dir=d),l.push(u)}l.length>0&&r.set(i,l)}return r}var Ei=1,Jo=[{value:"repo_spec",label:"\uB808\uD3EC \xB7 spec \uC6B0\uC120"},{value:"repo_updated",label:"\uB808\uD3EC \xB7 \uCD5C\uC2E0 \uC218\uC815"},{value:"updated_flat",label:"\uCD5C\uC2E0 \uC218\uC815(\uB808\uD3EC \uBB34\uC2DC)"}],es=[{value:"all",label:"\uC804\uCCB4"},{value:"ready",label:"\uCC29\uC218 \uAC00\uB2A5"},{value:"not_ready",label:"\uC900\uBE44 \uD544\uC694"}],vo={show_blocked:!0,readiness:"all"},kd={auto_merge:"\uC790\uB3D9 \uBA38\uC9C0",merged:"\uBA38\uC9C0",merge:"\uBA38\uC9C0",pr_stop:"PR \uC911\uB2E8",stopped:"\uC911\uB2E8",failed:"\uC2E4\uD328",refuted:"\uBC18\uC99D",no_delta:"\uBB34-delta"};function Kg(e,t){let n=null;for(let r of Object.values(e||{}))!r||r.bead_id!==t||!rr(r)||(n=typeof r.status=="string"?r.status:null);return n}function Gg(e,t){let n=null,r=-1/0;for(let o of Object.values(e)){if(!o||o.bead_id!==t||o.status==="running"||!rr(o))continue;let i=typeof o.finished_at=="number"?o.finished_at:typeof o.started_at=="number"?o.started_at:0;i>=r&&(r=i,n=o)}return n}function Zu(e){let t=st(e),n=new Map;for(let r of Array.isArray(t.done)?t.done:[])r&&typeof r.bead_id=="string"&&typeof r.added_at=="number"&&n.set(r.bead_id,r.added_at);return new Set(Td(st(t.attempts),n).keys())}function Td(e,t,n={}){let{winners:r,resumed_from_ids:o}=wu(e,t),i=new Map;for(let[s,l]of r){let a=l.attempt,u=l.run_state;if(Rd(a))continue;let d=l.started_at,p=typeof a.session_id=="string"&&a.session_id.length>0,m=ri(a.quickfix_landing)==="session",y=u!=="running"&&(p||!m)&&!o.has(a.attempt_id),C=!p&&m?"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":o.has(a.attempt_id)?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":null,O=st(n.observations?.[s]),V=st(O.pr),te=typeof a.merge_sha=="string"&&a.merge_sha.length>0||V.state==="MERGED",W=or(n.discard_operations,s,{attempt_id:a.attempt_id,merged:te}),q=u==="failed"?$d(a,{resume_eligible:y,resume_reason:C,confirmation:W.confirmation,history:n.bead_timelines?.[s]}):null;i.set(s,{...wd(a,e,u),started_at:d,...q?{failure:q}:{},can_pause:u==="running"&&p,can_resume:y})}for(let[s,l]of th(e,t)){if(i.has(s))continue;let a=l.attempt,u=or(n.discard_operations,s,{attempt_id:a.attempt_id}),d=Od(a),p=l.run_state==="provider_hold"?Jg(a,{provider_hold:n.provider_hold,auto_resume_pending:n.auto_resume_pending,account_catalog:n.account_catalog,attempts:e,history:n.bead_timelines?.[s]}):null;i.set(s,{...wd(a,e,l.run_state),started_at:typeof a.started_at=="number"?a.started_at:null,...l.run_state==="parked"?{failure:$d(a,{resume_eligible:!1,resume_reason:"\uC138\uC158 \uB300\uAE30 \u2014 [\uC7AC\uC2DC\uB3C4]\uAC00 \uC0C8 attempt\uB97C \uB744\uC6C1\uB2C8\uB2E4",confirmation:u.confirmation,history:n.bead_timelines?.[s]})}:{},...l.run_state==="waiting"?{wait:Yg(a)}:{},...p?{hold:p}:{},...d?{retry:d}:{},can_pause:!1,can_resume:l.run_state==="provider_hold"})}return i}function wd(e,t,n){return{attempt_id:typeof e.attempt_id=="string"?e.attempt_id:"",run_state:n,last_event_at:typeof e.last_event_at=="number"?e.last_event_at:null,last_activity:e.last_activity&&typeof e.last_activity=="object"?e.last_activity:null,legs:Array.isArray(e.legs)?e.legs:[],runner:typeof e.runner=="string"?e.runner:null,model:typeof e.model=="string"?e.model:null,effort:typeof e.effort=="string"?e.effort:null,speed:typeof e.speed=="string"?e.speed:null,resumed_from:typeof e.resumed_from=="string"?e.resumed_from:null,continuation_mode:e.continuation_mode==="session"||e.continuation_mode==="fresh"?e.continuation_mode:null,status:typeof e.status=="string"?e.status:null,usage:nr(t,e.bead_id)}}function $d(e,t){let n=e.cause_detail&&typeof e.cause_detail=="object"?e.cause_detail:null;return{cause:typeof e.cause=="string"?e.cause:null,cause_detail:n,summary:n&&typeof n.summary=="string"?n.summary:null,bead_id:typeof e.bead_id=="string"?e.bead_id:"",finished_at:typeof e.finished_at=="number"?e.finished_at:null,runner:typeof e.runner=="string"?e.runner:null,model:typeof e.model=="string"?e.model:null,effort:typeof e.effort=="string"?e.effort:null,observed_effort:typeof e.observed_effort=="string"?e.observed_effort:null,speed:typeof e.speed=="string"?e.speed:null,attempt_id:typeof e.attempt_id=="string"?e.attempt_id:"",usage:e.usage&&typeof e.usage=="object"?e.usage:null,halted_auto_advance:e.halted_auto_advance===!0,quickfix_lane:e.quickfix_lane===!0,quickfix_landing:e.quickfix_landing&&typeof e.quickfix_landing=="object"?e.quickfix_landing:null,retry:Od(e),resume_eligible:t.resume_eligible,resume_reason:t.resume_reason,landed:ad(e),confirmation:t.confirmation,...Cd(t.history)}}function Cd(e){if(!e||typeof e!="object")return{};let t=Array.isArray(e.events)?e.events:[],n=[];for(let o of t)!o||typeof o!="object"||typeof o.summary!="string"||o.summary.length===0||n.push({event_id:typeof o.event_id=="string"?o.event_id:"",kind:typeof o.kind=="string"?o.kind:"",summary:o.summary,at:typeof o.at=="number"?o.at:null});n.reverse();let r=typeof e.log_path=="string"&&e.log_path.length>0?e.log_path:null;return{...n.length>0?{timeline:n}:{},...r===null?{}:{log_path:r},...e.log_expired===!0?{log_expired:!0}:{},...e.log_unreadable===!0?{log_unreadable:!0}:{}}}function Yg(e){let t=e.cause_detail&&typeof e.cause_detail=="object"?e.cause_detail:null,n=Array.isArray(t?.blockers)?t.blockers:[],r=[];for(let o of n)!o||typeof o!="object"||typeof o.id!="string"||o.id.length===0||r.push({id:o.id,rig:typeof o.rig=="string"?o.rig:null,status:typeof o.status=="string"?o.status:""});return{summary:t&&typeof t.summary=="string"?t.summary:null,blockers:r,since:typeof e.finished_at=="number"?e.finished_at:null}}function Rd(e){return e?.status==="paused"&&typeof e.cause=="string"&&e.cause.startsWith("provider_outage:")}function Vg(e,t){let n=typeof e.runner=="string"?e.runner:"",r=st(t)[n];return!r||!Array.isArray(r.targets)?null:r.targets.find(o=>Array.isArray(o?.attempt_ids)&&o.attempt_ids.includes(e.attempt_id))||null}function Qg(e,t){if(e===null)return null;let n=st(t).claude;if(!Array.isArray(n))return null;let r=n.find(o=>o?.email===e);return r&&typeof r.alias=="string"&&r.alias.length>0?r.alias:null}function Xg(e,t){let n=e,r=new Set;for(;n&&!r.has(n.attempt_id);){if(r.add(n.attempt_id),n.auto_resume_kind==="provider_outage")return!0;n=typeof n.resumed_from=="string"?t[n.resumed_from]:null}return!1}function Zg(e,t,n,r){if((Array.isArray(r.auto_resume_pending)?r.auto_resume_pending:[]).some(s=>s?.attempt_id===e.attempt_id))return"pending";let i=e.auto_resume_refused;return typeof i=="string"&&i.length>0?`refused:${i}`:n.startsWith("auto_resume_disarmed:")||t?.auto_switch==="cap"||Xg(e,r.attempts)?"disarmed":null}function Jg(e,t){let n=e.cause.slice(16),r=e.cause_detail&&typeof e.cause_detail=="object"?e.cause_detail:null,o=Vg(e,t.provider_hold),i=typeof o?.model=="string"&&o.model.length>0?o.model:typeof e.model=="string"&&e.model.length>0?e.model:null,s=typeof o?.account=="string"&&o.account.length>0?o.account:typeof e.claude_account=="string"&&e.claude_account.length>0?e.claude_account:null,l=typeof o?.last_error=="string"?o.last_error:"",a=Zg(e,o,l,{auto_resume_pending:t.auto_resume_pending,attempts:t.attempts}),u=typeof o?.resets_at=="number"?o.resets_at:typeof r?.resets_at=="number"?r.resets_at:null,d=typeof o?.next_probe_at=="number"?o.next_probe_at:null,p=Qg(s,t.account_catalog),_=Cd(t.history);return{kind:o?.kind==="usage_limit"||n==="usage_limit"?"usage_limit":"outage",detail:n,...typeof r?.message=="string"?{message:r.message}:{},...typeof r?.summary=="string"?{summary:r.summary}:{},...i||s?{target:{...i?{model:i}:{},...s?{account:s}:{},...p?{account_alias:p}:{}}}:{},...u===null?{}:{resets_at:u},...a===null?{}:{auto_resume:a},...o?.auto_switch==="none"||o?.auto_switch==="disabled"?{auto_switch:o.auto_switch}:{},...d===null?{}:{next_probe_at:d},..._.log_path?{log_path:_.log_path}:{}}}function Od(e){let t=e&&e.retry&&typeof e.retry=="object"?e.retry:null;return t?{cause:typeof t.cause=="string"?t.cause:null,attempts:typeof t.attempts=="number"?t.attempts:0,max:typeof t.max=="number"?t.max:0,next_at:typeof t.next_at=="number"?t.next_at:null}:null}var eh=new Set(["parked","retry_wait","waiting"]);function th(e,t){let n=Object.values(e||{}),r=new Set(n.map(s=>s?.resumed_from).filter(s=>typeof s=="string")),o=new Map;for(let s of n)s&&typeof s.bead_id=="string"&&rr(s)&&o.set(s.bead_id,s.attempt_id);let i=new Map;for(let s of n){let l=Rd(s);if(!s||typeof s.bead_id!="string"||s.bead_id.length===0||!rr(s)||!eh.has(s.status)&&!l||o.get(s.bead_id)!==s.attempt_id||typeof s.dismissed_at=="number"||l&&r.has(s.attempt_id))continue;let a=t.get(s.bead_id);typeof a=="number"&&a>0&&typeof s.finished_at=="number"&&a>=s.finished_at||i.set(s.bead_id,{attempt:s,run_state:l?"provider_hold":s.status})}return i}function xd(e,t){let n=e[t];if(!n)return"";if(n.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let r=typeof n.reason=="string"?n.reason:"";if(r==="prerequisite_unmet"&&Array.isArray(n.blockers)&&n.blockers.length>0)return"\u26D3 \uC120\uD589 \uB300\uAE30";let o=r.indexOf(":");return o>0&&o<r.length-1?`\u26D4 ${r.slice(0,o)} (${r.slice(o+1)})`:`\u26D4 ${r}`}function st(e){return e&&typeof e=="object"?e:{}}function nh(e){let t=st(e).badge_codes;return Array.isArray(t)?t.filter(n=>typeof n=="string"&&n.length>0):[]}function rh(e,t,n){let r=st(t);if(Object.keys(r).length===0)return null;let o=e.execution_defaults,i=e.runner_catalog,s=e.session_defaults;if(!o||!i||!s)return null;let l=_=>Tn({pin:_,global:s,execution_defaults:o,runner_catalog:i,route:n}),a,u;try{a=l(r),u=l(null)}catch{return null}let d=Ad(go(a,i),go(u,i)),p=Ad(Mr(a,null),Mr(u,null));return d||p?{orchestration:d,worker:p}:null}function Ad(e,t){return!e||t&&t.text===e.text?null:e}function oh(e,t,n){let o=(t&&typeof t=="object"&&Array.isArray(t.released_by)?t.released_by:[]).filter(s=>s&&typeof s=="object"&&typeof s.id=="string").slice().sort((s,l)=>(typeof l.closed_at=="number"?l.closed_at:0)-(typeof s.closed_at=="number"?s.closed_at:0)),i=[];for(let s of o){let l=bd(e,s,n);l&&i.push(l)}return i.length===0?null:i}function rl(e,t){return typeof e!="string"||e.length===0||typeof t!="string"||t.length===0||t===e?null:`\u2192 ${t}`}var sh=new Set(["quick_fix","spec_backed","full_plan"]);function Sd(e){return typeof e=="string"&&sh.has(e)}function ih(e){let t={...st(e.session_defaults)};for(let n of["orchestration_model","orchestration_effort","orchestration_speed","quick_fix_orchestration_model","quick_fix_orchestration_effort","quick_fix_orchestration_speed"]){let r=e[n];typeof r=="string"&&(t[n]=r)}return t}function ah(e,t,n){let r=e.runner_catalog??null,o=nl(e,t,n,null);if(!o)return null;let i=Mn(r,o.orchestration_model.value??""),s=i===null?o:nl(e,t,n,i)||o,l=go(s,r),a=Mr(s,i);return l||a?{orchestration:l,worker:a}:null}function nl(e,t,n,r){let o=Sd(n)?n:Sd(t.route)?t.route:null;try{return Tn({pin:t,global:ih(e),execution_defaults:e.execution_defaults??null,runner_catalog:e.runner_catalog??null,route:o,controller_runtime:r})}catch{return null}}function lh(e,t,n){return!t||!Object.hasOwn(t,"metadata")?null:Mr(nl(e,st(t.metadata),t.route,n),n)}function ol(e,t){let n=new Set,r=e;for(;r&&!n.has(r.attempt_id);){if(r.conflict_resolution===!0)return!0;n.add(r.attempt_id),r=typeof r.resumed_from=="string"&&r.resumed_from.length>0&&t.get(r.resumed_from)||null}return!1}function ch(e){let t={};for(let l of Gn)t[l]=0;let n=!1,r=0,o=0,i=0;for(let l of e){let a=l.usage;if(!a||typeof a!="object")continue;let u=!1;for(let d of Gn)Number.isFinite(a[d])&&(t[d]+=a[d],n=!0,u=!0);u&&(o+=1,Number.isFinite(a.total_cost_usd)&&(r+=a.total_cost_usd,i+=1))}o>0&&i===o&&(t.total_cost_usd=r);let s=e.map(l=>l.usage).filter(l=>l&&typeof l=="object"&&l.providers);return s.length>0?un(Vs(s)):n?tr(t):null}function Id(e,t){let n=Wo(e,t);return n==="internal"?"\uBBF8\uC801\uC7AC":n==="external"?"\uC678\uBD80":"\uC704\uCE58 \uBBF8\uD655\uC778"}function uh(e,t,n){let r=t.get(e);if(!r)return Id(e,n);if(typeof r.position=="number"){if(r.lane==="parallel")return`#${r.position}`;if(/^s[1-5]$/.test(r.lane))return`${r.lane} #${r.position}`}return Uo(r)}function dh(e,t,n,r,o,i){let s=t.get(e);if(!s)return{label:i&&Wo(e,n)==="internal"?"\uC9C4\uD589 \uB300\uAE30":Id(e,n),title:""};if(s.state==="runnable"&&i&&Wo(e,n)==="internal")return{label:"\uC9C4\uD589 \uB300\uAE30",title:""};if(typeof s.position=="number"&&(s.lane==="parallel"||/^s[1-5]$/.test(s.lane))){let a=r.get(e),u=s.lane==="parallel"?"\uBCD1\uB82C":s.lane,d=o.get(e);return{label:!!d&&d.reason==="prerequisite_unmet"&&Array.isArray(d.blockers)&&d.blockers.length>0?"\u26D3 \uC120\uD589 \uB300\uAE30":a&&a.length>0?"\u{1F512} \uB300\uAE30":"\uB300\uAE30",title:`${s.workspace_name||s.root_dir} ${u} #${s.position}`}}return{label:s.state==="running"?"\u25B6 \uC2E4\uD589\uC911":Uo(s),title:""}}function ph(e,t){for(let n of Object.values(e||{}))if(n&&n.attempt_id===t&&typeof n.armed_by_lane=="string"&&n.armed_by_lane.length>0)return n.armed_by_lane;return null}function fh(e,t,n,r,o,i){return t==="draft"?{state:"draft",badge:"draft",run_label:null,can_stop:!1}:n.some(s=>i.failed_by_bead.get(s.id)===e)?{state:"failed",badge:"\u26D4 \uC2E4\uD328",run_label:"\u25B6 \uB2E4\uC2DC \uC9C4\uD589",can_stop:!1}:i.disarmed_lanes.has(e)?{state:"restart",badge:"\u23F8 \uC7AC\uC2DC\uC791",run_label:"\u25B6 \uC9C4\uD589",can_stop:!1}:n.some(s=>i.armed_by_bead.get(s.id)===e)?{state:"running",badge:"\u25B6 \uC9C4\uD589 \uC911",run_label:o.length>0?"\u25B6 \uC774\uC5B4\uC11C \uC9C4\uD589":null,can_stop:!0}:r?{state:"all_done",badge:"\uBAA8\uB450 \uC644\uB8CC",run_label:null,can_stop:!1}:{state:"confirmed",badge:"\uD655\uC815",run_label:"\u25B6 \uC9C4\uD589",can_stop:!1}}function _h(e,t,n,r,o,i,s,l){let a=[];return e.forEach((u,d)=>{let p=typeof u.id=="string"?u.id:"";if(p.length===0)return;let _=u.status==="confirmed"?"confirmed":"draft",m=Array.isArray(u.entries)?u.entries:[],y=[];m.forEach((te,W)=>{let q=te&&typeof te.bead_id=="string"?te.bead_id:"";if(q.length===0)return;let I=te&&typeof te.root_dir=="string"?te.root_dir:"",P=n.get(q),U=P?P.state:void 0,Y=U==="running"||U==="pr_wait"||U==="done",N=!P||U==="runnable",j=P&&P.lane==="parallel"&&typeof P.position=="number"?P.position-1:null,z=dh(q,n,r,t,l,_==="confirmed"),K=y.length>0?y[y.length-1]:null,oe=_==="confirmed"&&K!==null&&!K.done&&!(t.get(q)||[]).includes(K.id);y.push({id:q,title:o.get(q)||q,root_dir:P?P.root_dir:I,workspace_name:P?P.workspace_name:i.get(I)||"",seq:W+1,location_label:z.label,location_title:z.title,draggable:!Y,fixed:Y,done:U==="done",unplaced:N,mismatch:oe,...j!==null?{queue_index:j}:{}})}),y.forEach((te,W)=>{te.seq=W+1});let C=y.length>0&&y.every(te=>te.done),O=y.filter(te=>!te.fixed&&s.armed_by_bead.get(te.id)!==p).map(te=>te.id),V=fh(p,_,y,C,O,s);a.push({lane_id:p,status:_,draft:_==="draft",number:d+1,label:`\uC5F0\uACB0 ${d+1} \xB7 \uB808\uD3EC \uAC04`,rows:y,all_done:C,can_confirm:_==="draft"&&y.length>=2,has_mismatch:_==="confirmed"&&y.some(te=>te.mismatch),unlaunched:O,...V})}),a}function mh(e,t,n){if(e.lane==="runnable"){let s=n.get(e.id);return s?s.length===0?{scope:[],state:"missing"}:{scope:s,state:"declared"}:{scope:[],state:void 0}}let r=t.get(e.root_dir),o=r?r[e.id]:void 0;if(!o||!Array.isArray(o.scope))return{scope:[],state:void 0};let i=o.scope.filter(s=>typeof s=="string"&&s.length>0);return{scope:i,state:i.length===0?"missing":"declared"}}function gh(e,t,n,r,o){let i=new Map;for(let a of[...e.running,...e.queue,...e.runnable,...e.pr_wait]){if(!t.has(a.root_dir))continue;let u=`${a.root_dir}\0${a.id}`,d=i.get(u);if(d){d.cards.push(a);continue}let{scope:p,state:_}=mh(a,t,n);_!==void 0&&(a.scope_state=_),i.set(u,{cards:[a],scope:p})}let s=new Map;for(let a of i.values()){let u=a.cards[0].scope_state;if(u!==void 0)for(let _ of a.cards)_.scope_state=u;if(a.scope.length===0)continue;let d=a.cards[0].root_dir,p=s.get(d);p?p.push(a):s.set(d,[a])}let l=(a,u,d)=>{let p=u.cards[0],_={id:p.id,title:p.title,location_label:uh(p.id,r,o),prefixes:d,...typeof p.root_dir=="string"&&p.root_dir.length>0?{root_dir:p.root_dir}:{}};for(let m of a.cards)m.overlap_chips?m.overlap_chips.push(_):m.overlap_chips=[_]};for(let a of s.values())for(let u=0;u<a.length;u+=1)for(let d=u+1;d<a.length;d+=1){let p=ii(a[u].scope,a[d].scope);p.length!==0&&(l(a[u],a[d],p),l(a[d],a[u],p))}}function Ed(e,t,n){let r=n?n.get(t)?.root_dir:void 0,o=!Jn(e.id,t),i=typeof e.root_dir=="string"?e.root_dir:"",s=typeof r=="string"&&r.length>0?r:o&&i.length>0?i:"";return s.length>0?{openable:!0,root_dir:s}:o?{openable:!0}:{}}function hh(e,t,n,r){let o=new Set(e?e.ids:[]);for(let l of t&&Array.isArray(t.ids)?t.ids:[])typeof l=="string"&&l.length>0&&o.add(l);if(o.size===0)return{ids:[]};let i={},s={...e?e.root_dirs:{},...t&&t.root_dirs&&typeof t.root_dirs=="object"?t.root_dirs:{}};for(let l of o){let a=s[l];if(typeof a=="string"&&a.length>0){i[l]=a;continue}if(!Jn(n.id,l)){n.root_dir.length>0&&(i[l]=n.root_dir);continue}let u=r.get(l)?.root_dir;typeof u=="string"&&u.length>0&&(i[l]=u)}return{ids:[...o],root_dirs:i}}function tl(e){if(typeof e=="number")return Number.isFinite(e)?e:null;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:null}return null}function Si(e){if(typeof e=="number"&&Number.isFinite(e))return e;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:0}return 0}function bh(e){let t=typeof e=="string"?e.trim().toLowerCase():"";return t.length===0?null:n=>{let r=typeof n.id=="string"?n.id.toLowerCase():"",o=typeof n.title=="string"?n.title.toLowerCase():"";return r.includes(t)||o.includes(t)}}function yh(e,t){let n=[e.runnable,e.runnable_all,e.queue,e.running,e.pr_wait,e.done,e.parallel_rows];for(let o of e.runnable_sections)n.push(o.items);let r=[];for(let o of e.queue_groups){n.push(o.items,o.sublanes.parallel);for(let i of o.sublanes.serial)n.push(i.items),r.push(i.occupants)}for(let o of n)for(let i of o)i.search_match=t(i);for(let o of r)for(let i of o)i.search_match=t(i)}function yr(e,t,n){let r=Array.isArray(e)?e:[],o=Array.isArray(t)?t:[],i=n&&typeof n.done_since=="number"?n.done_since:void 0,s={...vo,...n&&n.candidate_filter?n.candidate_filter:{}},l=n&&Object.hasOwn(n,"cross_lanes")?n.cross_lanes??null:void 0,a=n&&n.candidate_sort==="as_given"?"as_given":n&&Jo.some(x=>x.value===n.candidate_sort)?n.candidate_sort:"repo_spec",u=n&&n.groups==="all"?"all":"nonempty",d=n&&n.candidate_hidden_counts==="per_control"?"per_control":"sequential",p=Date.now(),_=new Map;for(let x of o)x&&typeof x.root_dir=="string"&&_.set(x.root_dir,x);let m=new Map;for(let x of o)x&&typeof x.root_dir=="string"&&m.set(x.root_dir,x.name||x.root_dir);for(let x of r)x&&typeof x.root_dir=="string"&&m.set(x.root_dir,x.name||x.root_dir);let y=[],C=[],O=[],V=[],te=[],W=[],q=new Map,I=new Map,P=new Map,U=new Map,Y=new Map,N=new Map,j=new Map,z=new Map,K=new Map,oe=new Map,ve=new Map,Ne=new Map,F=new Map,X=new Map,Ae=new Set,Ee=new Map,R=new Map,se=new Map;for(let x of r){if(!x||typeof x.root_dir!="string")continue;let Z=x.root_dir,Le=x.name||Z,Ye=_.get(Z),tt=Ye&&typeof Ye.revision=="number"?Ye.revision:typeof x.revision=="number"?x.revision:0,Ce=st(x.attempts),Je=st(x.bead_titles);for(let[f,k]of Object.entries(Je))typeof k=="string"&&k.length>0&&se.set(f,k);let Bt=st(x.bead_times),kt=st(x.pr_observations),ht=st(x.admission);for(let[f,k]of Object.entries(ht))k&&typeof k=="object"&&ve.set(f,k);let Dt=st(x.revise_parked),Rt=st(x.merge_queue_state),Mt=st(x.cleanup_failed),ce=st(x.discard_operations),be=st(x.bead_timelines),Ge=st(x.bead_blocked_by);Object.hasOwn(x,"bead_scope")&&Ee.set(Z,st(x.bead_scope));let rt=st(x.bead_workflow),Re=st(x.pr_activity),E=Array.isArray(x.repo_operations)?x.repo_operations:[];z.set(Z,E);let L=typeof x.declared_base=="string"?x.declared_base:null;j.set(Z,L),N.set(Z,Object.entries(Mt).map(([f,k])=>({bead_id:f,step:k&&k.step?k.step:"",reason:k&&k.reason?k.reason:"",at:k&&typeof k.at=="number"?k.at:null,detail:k&&typeof k.detail=="string"?k.detail:null,output_tail:k&&typeof k.output_tail=="string"&&k.output_tail?k.output_tail:void 0,log_path:k&&typeof k.log_path=="string"&&k.log_path?k.log_path:void 0,retry_count:k&&typeof k.retry_count=="number"&&Number.isInteger(k.retry_count)&&k.retry_count>0?k.retry_count:0,failure_code:k&&typeof k.failure_code=="string"?k.failure_code:void 0})));for(let[f,k]of Object.entries(st(x.bead_overlay)))k&&typeof k=="object"&&K.set(`${Z}\0${f}`,k);let ne=new Map;for(let f of Object.values(Ce))f&&typeof f.attempt_id=="string"&&ne.set(f.attempt_id,f);let fe=Array.isArray(x.merge_queue)?x.merge_queue:[],_e=new Set(fe.filter(f=>f&&typeof f.bead_id=="string").map(f=>f.bead_id)),De=new Map(fe.filter(f=>f&&typeof f.bead_id=="string").map(f=>[f.bead_id,f])),yt=new Map,xt=new Map,bt=new Map,Ut=new Map;fe.forEach((f,k)=>{f&&typeof f.bead_id=="string"&&(yt.set(f.bead_id,k+1),xt.set(f.bead_id,f.resolution),bt.set(f.bead_id,f.continuation_action||null),Ut.set(f.bead_id,f.authority||null))});let wt=st(x.auto_merge_skips),qt=f=>{let k=wt[f];if(!k)return null;let B=st(st(kt[f]).pr).head_sha;return B&&B===k.head_sha?k.reason||"":null};Y.set(Z,{positions:yt,resolutions:xt,continuations:bt,authorities:Ut,state:{active:typeof Rt.active=="string"?Rt.active:null,failures:st(Rt.failures),waiting:Rt.waiting&&typeof Rt.waiting.bead_id=="string"&&typeof Rt.waiting.reason=="string"?Rt.waiting:null},auto_excluded:(Array.isArray(x.pr_wait)?x.pr_wait:[]).map(f=>f&&f.bead_id).filter(f=>typeof f=="string"&&qt(f)!==null),running:fe.length>0});let At=Array.isArray(x.queue)?x.queue:[];for(let f of[...At,...Array.isArray(x.pr_wait)?x.pr_wait:[]])f&&typeof f.bead_id=="string"&&typeof f.armed_by_lane=="string"&&f.armed_by_lane.length>0&&F.set(f.bead_id,f.armed_by_lane);for(let f of Array.isArray(x.disarmed_on_load)?x.disarmed_on_load:[])typeof f=="string"&&f.length>0&&Ae.add(f);let Xt=(Array.isArray(x.serial_lanes)?x.serial_lanes:[]).filter(f=>f&&/^s[1-5]$/.test(f.id)&&Array.isArray(f.entries)),Jt=st(x.lane_states),Ot=typeof x.serial_lane_count=="number"?Math.max(0,Math.min(5,Math.floor(x.serial_lane_count))):Math.min(5,Xt.length);P.set(Z,Ot),U.set(Z,At.length);let St=new Map(Xt.map(f=>[f.id,f])),Gt=new Map;for(let f of Xt)for(let k of f.entries)k&&typeof k.bead_id=="string"&&Gt.set(k.bead_id,f.id);for(let[f,k]of Object.entries(st(x.bead_dependents))){let B=Array.isArray(k?.ids)?k.ids:[],ae=st(k?.root_dirs),le=Ne.get(f)||{ids:new Set,root_dirs:{}};for(let Ue of B)typeof Ue=="string"&&Ue.length>0&&le.ids.add(Ue);for(let[Ue,ft]of Object.entries(ae))typeof ft=="string"&&ft.length>0&&(le.root_dirs[Ue]=ft);Ne.set(f,le)}for(let[f,k]of Object.entries(Ge))Array.isArray(k)&&oe.set(f,k.filter(B=>typeof B=="string"&&B.length>0));let tn=Array.isArray(x.done)?x.done:[];for(let f of tn)f&&typeof f.bead_id=="string"&&W.push({id:f.bead_id,root_dir:Z,workspace_name:Le});let rn=new Map;for(let f of tn)f&&typeof f.bead_id=="string"&&typeof f.added_at=="number"&&rn.set(f.bead_id,f.added_at);let zt=f=>({id:f,title:Je[f]||f,root_dir:Z,workspace_name:Le,expected_revision:tt,draggable:!1,...st(Bt[f]).created_at?{created_at:st(Bt[f]).created_at}:{},...st(Bt[f]).updated_at?{updated_at:st(Bt[f]).updated_at}:{}}),on=f=>{let k=rt[f]?.chips?.pr;return k&&typeof k.number=="number"&&typeof k.url=="string"?{pr_number:k.number,pr_url:k.url}:{}},we=f=>Object.hasOwn(Ge,f)?{blocked_by:Array.isArray(Ge[f])?Ge[f].filter(k=>typeof k=="string"&&k.length>0):[]}:{},S=(f,k)=>{let B=we(f),ae=ht[f],le=ae&&ae.reason==="prerequisite_unmet"&&Array.isArray(ae.blockers)?ae.blockers:[],Ue=[...(k?.blockers||[]).map(mt=>mt.id),...le.map(mt=>mt.id)].filter(mt=>typeof mt=="string"&&mt.length>0);if(Ue.length===0)return B;let ft=[...B.blocked_by||[]];for(let mt of Ue)ft.includes(mt)||ft.push(mt);return{blocked_by:ft}},de=new Set;for(let[f,k]of Td(Ce,rn,{discard_operations:ce,observations:kt,bead_timelines:be,provider_hold:st(x.provider_hold),auto_resume_pending:Array.isArray(x.auto_resume_pending)?x.auto_resume_pending:[],account_catalog:st(x.account_catalog)})){de.add(f);let B=k.run_state==="failed"?ph(Ce,k.attempt_id):null;B!==null&&X.set(f,B);let ae=ne.get(k.attempt_id)||null,le=K.get(`${Z}\0${f}`),Ue=le&&le.rollup?le.rollup:null,ft=rl(L,ae?ae.target_base:null),mt=ae?ol(ae,ne):!1,it=ae&&ae.quickfix_lane===!0&&ae.quickfix_landing&&typeof ae.quickfix_landing=="object"?ae.quickfix_landing:null,A=it&&typeof it.reason=="string"&&it.reason.length>0?it.reason:null,$=it?Zo({bead_id:f,merge_sha:it.head_sha,cleanup_cursor:it.cursor,cleanup_failed:A?{step:it.cursor,reason:A}:null,repo_operations:E}):null;C.push({...zt(f),lane:"running",...S(f,k.wait),...Gt.has(f)?{serial_lane_id:Gt.get(f)}:{},attempt_id:k.attempt_id,run_state:k.run_state,status:k.status||void 0,workflow:rt[f]||null,can_pause:k.can_pause,can_resume:k.can_resume,started_at:k.started_at,last_event_at:k.last_event_at,last_activity:k.last_activity,legs:k.legs,runner:k.runner,model:k.model,effort:k.effort,speed:k.speed,resumed_from:k.resumed_from,continuation_mode:k.continuation_mode,usage:k.usage,failure:k.failure||null,hold:k.hold||null,wait:k.wait||null,retry:k.retry||null,exec_chips:{orchestration:Ba(k),worker:lh(st(Ye),le,k.runner||null)},discard:or(ce,f,{attempt_id:k.attempt_id,merged:k.failure?.confirmation==="merged"||st(kt[f]).pr?.state==="MERGED"}),...Ue?{rollup:Ue}:{},...mt?{conflict_resolution:!0}:{},...ft?{base_exception:ft}:{},...$?{landing:$}:{},badges:k.run_state==="paused"?["\u23F8 \uC77C\uC2DC\uC815\uC9C0"]:k.run_state==="failed"?["\u26A0 \uC2E4\uD328"]:k.run_state==="parked"?["\u23F8 \uC138\uC158 \uB300\uAE30"]:k.run_state==="retry_wait"?["\u21BB \uC7AC\uC2DC\uB3C4 \uB300\uAE30"]:k.run_state==="waiting"?["\u26D3 \uC120\uD589 \uB300\uAE30"]:k.run_state==="provider_hold"?["\uACF5\uAE09\uC790 \uBCF4\uB958"]:[],alert:k.run_state==="failed"})}for(let[f,k]of ku(Ce)){if(C.some(ae=>ae.id===f))continue;let B=k.attempt;C.push({...zt(f),lane:"running",kind:"session",...we(f),attempt_id:typeof B.attempt_id=="string"?B.attempt_id:"",run_state:"running",status:"running",non_occupying:!0,workflow:rt[f]||null,can_pause:!1,can_resume:!1,started_at:k.started_at,last_event_at:typeof B.last_event_at=="number"?B.last_event_at:null,last_activity:B.last_activity&&typeof B.last_activity=="object"?B.last_activity:null,legs:Array.isArray(B.legs)?B.legs:[],runner:typeof B.runner=="string"?B.runner:null,model:typeof B.model=="string"?B.model:null,effort:typeof B.effort=="string"?B.effort:null,speed:typeof B.speed=="string"?B.speed:null,resumed_from:null,continuation_mode:null,usage:B.usage&&typeof B.usage=="object"?B.usage:null,exec_chips:{orchestration:Ba(B),worker:null},discard:or(ce,f,{merge_queued:!0}),badges:[k.origin==="auto"?"\uB9AC\uBDF0 \xB7 \uC790\uB3D9":"\uB9AC\uBDF0"],alert:!1})}for(let f of Array.isArray(x.session_active)?x.session_active:[]){let k=f&&f.bead_id;typeof k!="string"||de.has(k)||(de.add(k),Array.isArray(f.blocked_by)&&f.blocked_by.length>0&&oe.set(k,f.blocked_by.filter(B=>typeof B=="string"&&B.length>0)),typeof f.title=="string"&&f.title.length>0&&se.set(k,f.title),C.push({...zt(k),title:f.title||Je[k]||k,lane:"running",kind:"session",status:"in_progress",started_at:tl(f.started_at)??tl(f.updated_at)??void 0,updated_at:tl(f.updated_at)??void 0,workflow:f.workflow||null,labels:Array.isArray(f.labels)?f.labels:[],spec_id:typeof f.spec_id=="string"?f.spec_id:"",blocked:f.blocked===!0,...Array.isArray(f.blocked_by)?{blocked_by:f.blocked_by.filter(B=>typeof B=="string"&&B.length>0)}:{},draggable:!1,can_pause:!1,can_resume:!1,exec_chips:null,usage:null,legs:[],last_activity:null,session_refs:Array.isArray(f.session_refs)?f.session_refs:[],badges:[],alert:!1}))}for(let f of Array.isArray(x.pr_wait)?x.pr_wait:[]){let k=f&&f.bead_id;if(typeof k!="string"||de.has(k))continue;de.add(k);let B=st(kt[k]),ae=st(B.pr),le=B.gate?st(B.gate):null,Ue=_e.has(k),ft=De.get(k)?.continuation_action||null,mt=!!ft&&ft.continuation===null,it=Rt.active===k,A=f.external===!0,$=Mt[k]||null,Pe=st(Re[k]),Fe=Zo({bead_id:k,merge_sha:f.merge_sha,cleanup_cursor:f.cleanup_cursor,merge_progress:Pe.merge_progress||null,cleanup_failed:$,repo_operations:E}),ot=Ai(Fe),vt=!!le&&le.base_badge==="\uCDA9\uB3CC",Nt=!!$&&["post_merge_jobs","child_sweep","branch_cleanup","parent_close"].includes($.step)&&!!le&&le.tier==="merged",Zt=A&&!!$&&!!le&&le.tier==="merged",Sr=!!le&&["closed_unmerged","review","undecidable"].includes(le.tier),wn=or(ce,k,{external:A,merge_active:it||Fe?.step==="merge",merge_queued:Ue,cleanup_active:ot,merged:!!$||le?.tier==="merged"}),Er=!!wn.operation,Kr=nh(B.receipt_check);O.push({...zt(k),lane:"pr_wait",...we(k),...Kr.length>0?{receipt_badge:{codes:Kr}}:{},workflow:rt[k]||null,pr_number:typeof ae.number=="number"?ae.number:null,pr_url:typeof ae.url=="string"?ae.url:void 0,external:A,usage:nr(Ce,k),merge_step:Fe,badges:mt?["\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694"]:Fe?[le?.tier==="merged"?"\uBA38\uC9C0\uB428":"\uBA38\uC9C0 \uC911"]:$?[Fr($.step)?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${Fr($.step)}`:"\uC815\uB9AC \uBA48\uCDA4"]:typeof le?.gate_badge=="string"&&le.gate_badge.length>0?[le.gate_badge]:[],alert:Fe?Fe.failed===!0:!!$||Sr,reason:$&&Fe?.active!==!0?xi($.step):"PR \uB300\uAE30",merge_action:le?.tier==="merged"&&!Nt&&!Zt?!1:!Ue||mt,merge_enabled:!Er&&(mt||le?.enabled===!0||vt||Nt||Zt),merge_label:mt?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":Zt||Nt?"\uC815\uB9AC \uC7AC\uC2DC\uB3C4":vt&&!Nt?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":void 0,merge_title:mt?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":Er?wn.error?`\uD3D0\uAE30 \uC2E4\uD328: ${wn.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${wn.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:Zt?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uB2E4\uC2DC \uC2DC\uB3C4\uD569\uB2C8\uB2E4":Nt?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC2DC\uB3C4\uD569\uB2C8\uB2E4":vt?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":le?.enabled===!0?`\uBA38\uC9C0 (${le.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4`:`\uBA38\uC9C0 \uBD88\uAC00: ${le?.reason||"\uAD00\uCE21 \uB300\uAE30"}`,cancel_action:Ue&&!mt,cancel_enabled:!it,continuation_mismatch:ft?.mismatch||null,discard:wn,discard_action:wn.action,discard_enabled:wn.enabled,discard_title:wn.title})}let qe=(f,k,B,ae)=>{let le=f&&f.bead_id;if(typeof le!="string"||de.has(le))return null;de.add(le);let Ue=Dt[le],ft=or(ce,le),mt=ft.operation?ft:null,it={...zt(le),lane:k,workflow:rt[le]||null,draggable:!mt,discard:mt||void 0,reason:xd(ht,le),seq:B+1,queue_position:B+1,queue_index:B,queue_length:ae,badges:Ue?["\u23F8 REVISE \uD30C\uD0B9"]:[],alert:!!Ue,revise_action:!!Ue,revise_enabled:!!Ue&&!mt,revise_title:Ue?Ue.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${Ue.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":""},A=S(le,null);return Object.hasOwn(A,"blocked_by")&&(it.blocked_by=A.blocked_by),it};for(let f=0;f<At.length;f++){let k=qe(At[f],"queue",f,At.length);if(!k)continue;V.push(k);let B=q.get(Z);B?B.push(k):q.set(Z,[k])}let b=f=>{let k=O.find(Ue=>Ue.id===f&&Ue.root_dir===Z);if(k)return{id:f,title:k.title,badge:"PR \uB300\uAE30 \xB7 \uC810\uC720"};let B=C.find(Ue=>Ue.id===f&&Ue.root_dir===Z),ae=B?B.run_state:Kg(Ce,f),le=ae==="failed"||ae==="orphaned"?"\uC2E4\uD328 \xB7 \uC810\uC720 \uC720\uC9C0":ae==="paused"?"\uC77C\uC2DC\uC815\uC9C0 \xB7 \uC810\uC720":"\uC2E4\uD589 \uC911 \xB7 \uC810\uC720";return{id:f,title:B?B.title:zt(f).title,badge:le}},v=[];for(let f=0;f<Math.max(Ot,Xt.length);f++){let k=`s${f+1}`,B=St.get(k),ae=B&&Array.isArray(B.entries)?B.entries:[],le=st(Jt[k]),Ue=Array.isArray(le.occupied_by)?le.occupied_by.filter(it=>typeof it=="string"):[],ft=new Set(Ue),mt=[];for(let it=0;it<ae.length;it++){let A=ae[it]&&ae[it].bead_id;if(typeof A=="string"&&ft.has(A)){de.add(A);continue}let $=qe(ae[it],k,it,ae.length);$&&(mt.push($),V.push($))}mt.length===0&&Ue.length===0&&(Ot<=1||f>=Ot)||v.push({id:k,index:f,items:mt,raw_length:ae.length,occupied_by:Ue,occupants:Ue.map(it=>b(it)),corrections:Array.isArray(le.corrections)?le.corrections.length:0,cycle:le.cycle===!0,...mt.length===0&&Ue.length===0?{empty:!0}:{}})}I.set(Z,v);let M=Array.from({length:Ot},(f,k)=>{let B=`s${k+1}`,ae=St.get(B),le=ae&&Array.isArray(ae.entries)?ae.entries:[],Ue=st(Jt[B]);return{id:B,index:le.length,length:le.length,occupied_by:Array.isArray(Ue.occupied_by)?Ue.occupied_by.filter(ft=>typeof ft=="string"):[]}});for(let f of Array.isArray(x.runnable)?x.runnable:[]){let k=f&&f.bead_id;if(typeof k!="string"||de.has(k))continue;de.add(k);let B=f.workflow&&typeof f.workflow=="object"?f.workflow:null,ae=B&&typeof B.route=="string"&&B.route||(typeof f.route=="string"?f.route:null),le=rh(st(Ye),f.exec_pins,ae),Ue=Bo(f.rec,f.exec_pins);Array.isArray(f.blocked_by)&&f.blocked_by.length>0&&oe.set(k,f.blocked_by.filter(Zt=>typeof Zt=="string"&&Zt.length>0)),typeof f.title=="string"&&f.title.length>0&&se.set(k,f.title),Array.isArray(f.scope)&&R.set(k,f.scope.filter(Zt=>typeof Zt=="string"&&Zt.length>0));let ft=Object.hasOwn(f,"eligible"),it=!ft&&Object.hasOwn(f,"route")&&Object.hasOwn(f,"spec_state")&&Object.hasOwn(f,"has_description")&&Object.hasOwn(f,"awaiting_user")&&Object.hasOwn(f,"worker_ineligible")?Ha({route:typeof f.route=="string"?f.route:"",spec:f.spec_state,has_description:f.has_description===!0,awaiting_user:f.awaiting_user===!0,worker_ineligible:f.worker_ineligible===!0},null):null,A=ft?f.eligible!==!1:it?it.placeable:!0,$=it?it.worker_ineligible:f.worker_ineligible===!0,Pe=A&&!$,Fe=it?{route_ok:it.route_ok,awaiting_user:it.awaiting_user,missing_description:it.missing_description,placement_spec:it.spec}:Object.hasOwn(f,"route_ok")?{route_ok:f.route_ok===!0,awaiting_user:f.awaiting_user===!0,missing_description:f.missing_description===!0,placement_spec:f.placement_spec}:null,ot=[];!ft&&it&&!it.placeable&&ot.push(Nr(it)),typeof f.reason=="string"&&f.reason.length>0&&ot.push(f.reason);let vt=xd(ht,k);vt&&ot.push(vt);let Nt=oh(k,f.release_info,p)?.map(Zt=>({...Zt,...Ed({id:k,root_dir:Z},Zt.id)}));y.push({...zt(k),title:f.title||Je[k]||k,lane:"runnable",draggable:!ft&&Pe,queue_placeable:Pe,...Fe||{},...$?{worker_ineligible:!0}:{},...f.session_preferred===!0?{session_preferred:!0,session_preferred_reason:typeof f.session_preferred_reason=="string"?f.session_preferred_reason:""}:{},...f.spec_after_blocker===!0?{spec_after_blocker:!0}:{},...Nt?{dependency_chips:{released:Nt}}:{},...f.dependents_info&&typeof f.dependents_info=="object"?{dependents_info:f.dependents_info}:{},reason:ot.join(" \xB7 "),created_at:f.created_at??void 0,updated_at:f.updated_at??void 0,status:typeof f.status=="string"?f.status:void 0,labels:Array.isArray(f.labels)?f.labels:[],spec_id:typeof f.spec_id=="string"?f.spec_id:"",published:f.published===!0,workflow:B||(ae?{route:ae,chips:{route:ae}}:null),...le?{exec_chips:le}:{},...Ue?{rec:Ue}:{},blocked:f.blocked===!0,...Array.isArray(f.blocked_by)?{blocked_by:f.blocked_by.filter(Zt=>typeof Zt=="string"&&Zt.length>0)}:{},place_index:At.length,place_lanes:M})}for(let f of tn){let k=f&&f.bead_id;if(typeof k!="string"||de.has(k)||(de.add(k),i!==void 0&&typeof f.added_at=="number"&&f.added_at<i))continue;let B=Gg(Ce,k),ae=B&&typeof B.done_kind=="string"?B.done_kind:null;te.push({...zt(k),lane:"done",done:!0,done_layout:"three_line",usage:nr(Ce,k),work_ms:od(Ce,k),done_at:typeof f.added_at=="number"?f.added_at:void 0,done_kind:ae,...on(k),badges:[...ae&&kd[ae]?[kd[ae]]:[],...nd(Ce,k)]})}for(let f of Array.isArray(x.session_done)?x.session_done:[]){let k=f&&(f.id||f.bead_id);typeof k!="string"||de.has(k)||(de.add(k),te.push({...zt(k),...f,id:k,root_dir:Z,workspace_name:Le,expected_revision:tt,lane:"done",done:!0}))}}if(K.size>0)for(let x of[...y,...V,...C,...O,...te]){let Z=K.get(`${x.root_dir}\0${x.id}`);if(!Z||(typeof Z.priority=="number"&&(x.priority=Z.priority),typeof Z.from_id=="string"&&Z.from_id.length>0&&(x.from_id=Z.from_id),x.lane==="done"&&Array.isArray(Z.carried_to)&&Z.carried_to.length>0&&(x.carried_to=Z.carried_to),!Object.hasOwn(Z,"metadata")))continue;let Le=st(Z.metadata);if(x.rec=Bo(Le),x.lane==="runnable"||x.lane.startsWith("s")||x.lane==="queue"){let Ye=ah(st(_.get(x.root_dir)),Le,typeof Z.route=="string"&&Z.route.length>0?Z.route:st(x.workflow).route);Ye&&(x.exec_chips=Ye)}}let ye=new Map;o.forEach((x,Z)=>{x&&typeof x.root_dir=="string"&&ye.set(x.root_dir,Z)});let ke=n&&n.running_sort==="repo"?"repo":"started";C.sort((x,Z)=>{let Le=x.kind==="session",Ye=Z.kind==="session";if(Le!==Ye)return Le?1:-1;if(Le&&Ye){let Je=Si(Z.updated_at)-Si(x.updated_at);return Je!==0?Je:x.id.localeCompare(Z.id)}if(ke==="repo"){let Je=ye.get(x.root_dir)??Number.MAX_SAFE_INTEGER,Bt=ye.get(Z.root_dir)??Number.MAX_SAFE_INTEGER;if(Je!==Bt)return Je-Bt}let tt=typeof x.started_at=="number"&&Number.isFinite(x.started_at)?x.started_at:null,Ce=typeof Z.started_at=="number"&&Number.isFinite(Z.started_at)?Z.started_at:null;return tt!==null&&Ce!==null&&tt!==Ce?tt-Ce:tt===null&&Ce!==null?1:tt!==null&&Ce===null?-1:x.id.localeCompare(Z.id)}),te.sort((x,Z)=>(Z.done_at??0)-(x.done_at??0));let Me=o.length>0?o:r.map(x=>({root_dir:x&&x.root_dir,name:x&&x.name,auto_advance:x&&x.auto_advance,auto_merge:x&&x.auto_merge,slots:x&&x.slots,revision:x&&x.revision,runner_catalog:x&&x.runner_catalog})),he=new Set(y.map(x=>x.root_dir)),Ie=new Map;for(let x of C)x.kind==="session"||x.run_state!=="running"||Ie.set(x.root_dir,(Ie.get(x.root_dir)||0)+1);let Ze=new Map;for(let x of te){let Z=Ze.get(x.root_dir);Z?Z.push(x):Ze.set(x.root_dir,[x])}let ut={positions:new Map,resolutions:new Map,continuations:new Map,authorities:new Map,state:{active:null,failures:{},waiting:null},auto_excluded:[],running:!1},G=[];for(let x of Me){if(!x||typeof x.root_dir!="string")continue;let Z=q.get(x.root_dir)||[],Le=I.get(x.root_dir)||[],Ye=Z.length>0||Le.some(Je=>Je.items.length>0||Je.occupied_by.length>0);if(u!=="all"&&!Ye&&!he.has(x.root_dir))continue;let tt=typeof x.slots=="number"&&x.slots>=Ei?x.slots:Ei,Ce=Ie.get(x.root_dir)||0;G.push({live_count:Ce,over_cap:Ce>tt,merge:Y.get(x.root_dir)||ut,token_total:ch(Ze.get(x.root_dir)||[]),cleanup_failures:N.get(x.root_dir)||[],declared_base:j.get(x.root_dir)??null,repo_operations:z.get(x.root_dir)||[],root_dir:x.root_dir,name:x.name||x.root_dir,auto_advance:x.auto_advance===!0,auto_merge:x.auto_merge===!0,slots:tt,revision:typeof x.revision=="number"?x.revision:0,runner_catalog:st(x.runner_catalog),items:Z,sublanes:{parallel:Z,serial:Le},serial_lane_count:P.get(x.root_dir)||0,raw_queue_length:U.get(x.root_dir)||0})}let J={runnable:y,runnable_all:y,runnable_hidden:{blocked:0,readiness:0},runnable_sections:[],runnable_flat:a==="updated_flat"||a==="as_given",queue:V,queue_groups:G,running:C,pr_wait:O,done:te,parallel_rows:[],chain_lanes:[],cross_lanes_revision:l&&typeof l.revision=="number"?l.revision:null,cross_lanes_unreadable:l===null,parallel_raw_length:Object.fromEntries(U),owner_of:{}},re=Wu(J);for(let x of W)re.has(x.id)||re.set(x.id,{root_dir:x.root_dir,workspace_name:x.workspace_name,lane:"done",state:"done"});for(let x of[...J.queue,...J.runnable,...J.running,...J.pr_wait]){if(!Object.hasOwn(x,"blocked_by"))continue;let Z=re.get(x.id);x.blockers=(x.blocked_by||[]).map(Le=>zu(Le,Z,re,o))}for(let x of[...J.queue,...J.runnable,...J.running,...J.pr_wait]){let Z=(x.blockers||[]).map(tt=>({...el(x.id,tt),...Ed(x,tt.id,re)})),Le=yd(x.id,hh(Ne.get(x.id),x.dependents_info,x,re));if(Z.length===0&&Le.length===0)continue;let Ye={...x.dependency_chips||{},...Z.length>0?{predecessors:Z}:{},...Le.length>0?{dependents:Le}:{}};x.dependency_chips=Ye}gh(J,Ee,R,re,o);let pe=Hu(J.queue_groups);for(let x of J.queue_groups)for(let Z of x.sublanes.serial){let Le=pe.get(Ku(x.root_dir,Z.id));Le&&(Z.cross_wait_peers=Le)}J.chain_lanes=_h(l&&Array.isArray(l.lanes)?l.lanes:[],oe,re,o,se,m,{armed_by_bead:F,failed_by_bead:X,disarmed_lanes:Ae},ve);let Se=new Map;for(let x of[...J.queue,...J.runnable])Se.has(x.id)||Se.set(x.id,x);let me=new Set;for(let x of J.chain_lanes)for(let Z of x.rows){if(x.status==="confirmed"&&!Z.unplaced&&!Z.fixed&&me.add(Z.id),!x.draft&&!Z.unplaced)continue;let Le=Se.get(Z.id);Le&&(Le.cross_lane_chip={lane_id:x.lane_id,number:x.number,status:x.status,label:x.draft?`\uC5F0\uACB0 ${x.number} (draft)`:`\uC5F0\uACB0 ${x.number}`})}let je=new Map(J.chain_lanes.map(x=>[x.lane_id,x.number]));for(let x of[...J.queue,...J.running]){let Z=F.get(x.id);if(typeof Z!="string"||Z.length===0)continue;let Le=je.get(Z);x.armed_lane_chip=Le===void 0?{lane_id:Z,label:"\u25B6 \uC9C4\uD589 \uC911 \xB7 \uB808\uC778 \uC5C6\uC74C",orphan:!0}:{lane_id:Z,label:`\u25B6 \uC5F0\uACB0 ${Le}`,orphan:!1}}let Be=[];for(let x of q.values())for(let Z of x)me.has(Z.id)||Be.push(Z);Be.sort((x,Z)=>{let Le=x.workspace_name.localeCompare(Z.workspace_name);return Le!==0?Le:(x.queue_index??0)-(Z.queue_index??0)}),J.parallel_rows=Be;let Qe={};for(let[x,Z]of re)typeof Z.root_dir=="string"&&Z.root_dir.length>0&&(Qe[x]=Z.root_dir);for(let x of J.chain_lanes)for(let Z of x.rows)!Object.hasOwn(Qe,Z.id)&&Z.root_dir.length>0&&m.has(Z.root_dir)&&(Qe[Z.id]=Z.root_dir);J.owner_of=Qe;let He=J.runnable.length;J.runnable_all=J.runnable.slice();let ee=J.runnable,Q=x=>s.show_blocked||x.blocked!==!0,xe=x=>s.readiness==="all"||(s.readiness==="ready"?x.queue_placeable===!0:x.queue_placeable!==!0);if(d==="per_control"){let x=[],Z=0,Le=0;for(let Ye of ee){let tt=Q(Ye),Ce=xe(Ye);tt&&Ce?x.push(Ye):!tt&&Ce?Z+=1:tt&&!Ce&&(Le+=1)}ee=x,J.runnable_hidden={blocked:Z,readiness:Le}}else{ee=ee.filter(Q);let x=ee.length;ee=ee.filter(xe),J.runnable_hidden={blocked:He-x,readiness:x-ee.length}}let _t=(x,Z)=>{let Le=Si(Z.updated_at)-Si(x.updated_at);return Le!==0?Le:x.id.localeCompare(Z.id)},Ke=a==="repo_spec"?(x,Z)=>{let Le=x.queue_placeable===!0?0:1,Ye=Z.queue_placeable===!0?0:1;if(Le!==Ye)return Le-Ye;let tt=x.published===!0?0:1,Ce=Z.published===!0?0:1;return tt!==Ce?tt-Ce:_t(x,Z)}:_t;if(a==="as_given")J.runnable=ee,J.runnable_sections=[];else if(a==="updated_flat")J.runnable=ee.slice().sort(_t),J.runnable_sections=[];else{let x=new Map;for(let Ye of ee){let tt=x.get(Ye.root_dir);tt?tt.push(Ye):x.set(Ye.root_dir,[Ye])}let Z=[],Le=[];for(let Ye of Me){if(!Ye||typeof Ye.root_dir!="string")continue;let tt=(x.get(Ye.root_dir)||[]).slice().sort(Ke);x.delete(Ye.root_dir),tt.length!==0&&(Z.push({root_dir:Ye.root_dir,name:Ye.name||Ye.root_dir,items:tt.map(Ce=>({...Ce,workspace_name:""}))}),Le.push(...tt))}for(let[Ye,tt]of x){let Ce=tt.slice().sort(Ke);Z.push({root_dir:Ye,name:Ce[0]?.workspace_name||Ye,items:Ce.map(Je=>({...Je,workspace_name:""}))}),Le.push(...Ce)}J.runnable=Le,J.runnable_sections=Z}let et=bh(n?n.search:void 0);return et&&yh(J,et),J}function Ld(e,t){let n=new Map(e.map((a,u)=>[a,u])),r=new Map(e.map(a=>[a,new Set]));for(let a of t)a.blocker!==a.blockee&&n.has(a.blocker)&&n.has(a.blockee)&&r.get(a.blockee).add(a.blocker);let o=new Set,i=[];for(;i.length<e.length;){let a=e.find(u=>{if(o.has(u))return!1;for(let d of r.get(u))if(!o.has(d))return!1;return!0});if(a===void 0)return{order:[...e],corrections:[],cycle:!0};o.add(a),i.push(a)}let s=[],l=new Map(i.map((a,u)=>[a,u]));for(let a of i){let u=null;for(let d of r.get(a)){let p=Number(n.get(a))<Number(n.get(d)),_=Number(l.get(a))>Number(l.get(d));p&&_&&(u===null||Number(l.get(d))>Number(l.get(u)))&&(u=d)}u!==null&&s.push({bead_id:a,after:u})}return{order:i,corrections:s,cycle:!1}}var vh="\uB2E4\uB978 \uB808\uD3EC \uC774\uC288\uB294 \uC774 \uC9C1\uB82C \uB808\uC778\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",Ti="\uC758\uC874 \uC790\uB8CC \uBBF8\uD655\uC815 \u2014 \uAD50\uC815 \uBCF4\uB958",kh="Worker \uD0ED \uC9C1\uB82C \uB808\uC778\uC5D0\uC11C \uBA3C\uC800 \uBE7C \uC8FC\uC138\uC694",wh="\uC774\uBBF8 \uC9C4\uD589 \uC911\uC778 \uC774\uC288 \uC55E\uC5D0\uB294 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",ko="\uC5F0\uACB0 \uB808\uC778\uC774 \uC5C6\uC2B5\uB2C8\uB2E4";function ts(e,t){return`${e}\0${t}`}function $h(e,t){let n=new Set(e),r=new Map;for(let o of e){let i=t.placed_members.has(o)?t.snapshot_blocked_by:t.runnable_blocked_by,s=i instanceof Map?i.get(o):void 0;if(!Array.isArray(s))return null;r.set(o,s.filter(l=>l!==o&&n.has(l)))}return r}function xh(e,t){if(e.status!=="confirmed")return 0;let n=-1;return e.entries.forEach((r,o)=>{t.fixed_members.has(r.bead_id)&&(n=o)}),n+1}function os(e,t){let n=e.entries,r=n.map(p=>p.bead_id),o=$h(r,t);if(o===null)return{entries:n,corrections:[],cycle:!1,held:!0,mismatched:[]};let i=[];for(let[p,_]of o)for(let m of _)i.push({blocker:m,blockee:p});let s=xh(e,t),l=new Map(r.map((p,_)=>[p,_])),a=r.slice(0,s).filter(p=>o.get(p).some(_=>Number(l.get(_))>Number(l.get(p)))),u=Ld(r.slice(s),i);if(u.cycle)return{entries:n,corrections:[],cycle:!0,held:!1,mismatched:a};let d=new Map(n.map(p=>[p.bead_id,p]));return{entries:[...n.slice(0,s),...u.order.map(p=>d.get(p))],corrections:u.corrections,cycle:!1,held:!1,mismatched:a}}function Pd(e,t){let n=t.cross_lanes.get(e);return n===void 0?null:os(n,t)}function Ah(e,t){if(!(t.corrections.length===0&&!t.cycle&&!t.held&&t.mismatched.length===0))return{lane_id:e,corrected:t.corrections.length,cycle:t.cycle,held:t.held,mismatched:t.mismatched}}function Sh(e){return`${e}\uC758 \uB808\uD3EC\uB97C \uC54C \uC218 \uC5C6\uC5B4 \uC758\uC874\uC744 \uBC14\uAFC0 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4`}function Eh(e){let t=new Map;for(let[n,r]of e)t.set(n,r.slice());return t}function il(e,t,n){let r=new Set([t]),o=[t];for(;o.length>0;){let i=o.pop();for(let s of e.get(i)||[]){if(s===n)return!0;r.has(s)||(r.add(s),o.push(s))}}return!1}function Th(e,t){let n=new Set;for(let[s,l]of t)for(let a of l)n.add(ts(s,a));let r=new Map,o=new Map;for(let s of e){let l=ts(s.a,s.b);r.set(l,s),o.set(l,s.type==="dep-add")}let i=[];for(let s of e){let l=ts(s.a,s.b);r.get(l)===s&&o.get(l)!==n.has(l)&&i.push(s)}return i}function Ch(e,t,n){let r=e.parallel_rows,o=Math.max(0,Math.min(r.length,n)),i=r[o];if(i&&i.root_dir===t)return i.queue_index;for(let s=o-1;s>=0;s--)if(r[s].root_dir===t)return r[s].queue_index+1;for(let s=o;s<r.length;s++)if(r[s].root_dir===t)return r[s].queue_index;return e.parallel_raw_length.get(t)??0}function Rh(e,t){return e.parallel_rows.some(n=>n.root_dir===t)}function sl(e,t,n,r){return{type:"worker-queue-place",payload:{bead_id:e,...r?{lane:r}:{},index:n},root_dir:t}}function al(e,t){let n=0;for(let r of e.cross_lanes.keys())if(n+=1,r===t)return n;return n+1}function ss(e){let t=Eh(e.blocked_by_map),n=[],r=new Set,o={refusal:null},i=u=>{let d=e.owner_of.get(u);return typeof d!="string"||d.length===0?(o.refusal=Sh(u),null):d};return{graph:t,dep_ops:n,state:o,ownerOf:i,addDep:(u,d,p)=>{if(o.refusal!==null||u===d)return;let _=t.get(u)||[];if(_.includes(d))return;let m=i(u);if(m!==null){if(il(t,d,u)){o.refusal=`\uC758\uC874 \uC0AC\uC774\uD074\uC774 \uC0DD\uAE41\uB2C8\uB2E4 \u2014 ${u}\uAC00 \uC774\uBBF8 ${d}\uB97C \uB9C9\uACE0 \uC788\uC2B5\uB2C8\uB2E4`;return}t.set(u,[..._,d]),p!==void 0&&r.add(ts(u,d)),n.push({type:"dep-add",a:u,b:d,root_dir:m,...p===void 0?{}:{lane_id:p}})}},removeDep:(u,d)=>{if(o.refusal!==null||u===d)return;let p=t.get(u)||[];if(!p.includes(d))return;let _=i(u);_!==null&&(t.set(u,p.filter(m=>m!==d)),n.push({type:"dep-remove",a:u,b:d,root_dir:_}))},laneCreated:(u,d)=>r.has(ts(u,d))}}function is(e,t,n,r,o={}){if(e.state.refusal!==null)return{refused:e.state.refusal};let i=Th(e.dep_ops,t.blocked_by_map),s=i.filter(d=>d.type==="dep-remove"),l=i.filter(d=>d.type==="dep-add"),a=o.disarm_ops??[],u=o.lane_id===void 0||o.correction===void 0?void 0:Ah(o.lane_id,o.correction);return{lane_ops:n,ops:[...s,...a,...l,...r],lane_op_index:s.length+a.length,...u===void 0?{}:{correction:u}}}function Dd(e,t,n){for(let r=1;r<t.length;r+=1)e.addDep(t[r].bead_id,t[r-1].bead_id,n)}function ns(e,t){return t>0&&e.entries[t]?.dep_created_by_lane===!0}function Md(e,t,n,r){if(t.status!=="confirmed")return[];let o=[],i=new Map;for(let s of r){let l=e.owner_of.get(s.bead_id)||s.root_dir;typeof l!="string"||l.length===0||i.set(l,[...i.get(l)||[],s.bead_id])}for(let[s,l]of i)o.push({type:"worker-queue-disarm",payload:{bead_ids:l,lane_id:n},root_dir:s});return o}function rs(e){return e.map(t=>({bead_id:t.bead_id,root_dir:t.root_dir}))}function Ci(e,t){return e.length===t.length&&e.every((n,r)=>n.bead_id===t[r].bead_id&&n.root_dir===t[r].root_dir)}function Ri(e,t,n){let r=ss(n),o=[],i=[],s=[],l,a=n.owner_lane_of.get(e.bead_id),u=e.kind==="chain"?e.lane_id??a:void 0,d=u===void 0?void 0:n.cross_lanes.get(u);if(t.kind==="repo-serial"&&e.root_dir!==t.root_dir)return{refused:vh};if(t.kind==="chain"){if(e.kind==="repo-serial")return{refused:kh};if(e.kind!=="chain"&&typeof a=="string"&&a!==t.lane_id&&n.cross_lanes.has(a))return{refused:`\uC774\uBBF8 \uC5F0\uACB0 ${al(n,a)}\uC5D0 \uC788\uC2B5\uB2C8\uB2E4`};if(!n.cross_lanes.has(t.lane_id))return{refused:ko}}if(e.kind==="chain"&&d===void 0)return{refused:ko};let p=()=>{if(d===void 0||d.status!=="confirmed")return;let y=d.entries.findIndex(W=>W.bead_id===e.bead_id);if(y<0)return;let C=y>0?d.entries[y-1]:null,O=y+1<d.entries.length?d.entries[y+1]:null,V=ns(d,y),te=O!==null&&ns(d,y+1);V&&C!==null&&r.removeDep(e.bead_id,C.bead_id),te&&O!==null&&r.removeDep(O.bead_id,e.bead_id),(V||te)&&C!==null&&O!==null&&r.addDep(O.bead_id,C.bead_id,u)},_=(y,C)=>{let O=n.cross_lanes.get(y),V=O.entries.findIndex(j=>j.bead_id===e.bead_id),te=O.entries.filter(j=>j.bead_id!==e.bead_id),W=Math.max(0,Math.min(te.length,V>=0&&C>V?C-1:C)),q=-1;if(te.forEach((j,z)=>{n.fixed_members.has(j.bead_id)&&(q=z)}),W<=q){r.state.refusal=wh;return}let I=V>=0?O.entries[V]:d?.entries.find(j=>j.bead_id===e.bead_id)??{bead_id:e.bead_id,root_dir:e.root_dir};l=os({status:O.status,entries:[...te.slice(0,W),I,...te.slice(W)]},n);let P=l.entries;if(Ci(P,O.entries)||o.push({type:"monitor-lane-update",payload:{lane_id:y,entries:rs(P)}}),O.status!=="confirmed")return;let U=P.findIndex(j=>j.bead_id===e.bead_id),Y=U>0?P[U-1].bead_id:null,N=U+1<P.length?P[U+1].bead_id:null;if(Y===null){N!==null&&r.addDep(N,e.bead_id,y);return}if(r.addDep(e.bead_id,Y,y),N!==null&&(r.graph.get(N)||[]).includes(Y)){let j=O.entries.findIndex(z=>z.bead_id===N);(r.laneCreated(N,Y)||j>0&&O.entries[j-1].bead_id===Y&&ns(O,j))&&r.removeDep(N,Y),r.addDep(N,e.bead_id,y)}},m=typeof e.queue_index=="number"?e.queue_index:n.queue_index_of.get(e.bead_id);if(e.kind==="chain"&&(p(),d!==void 0&&(t.kind!=="chain"||t.lane_id!==u)&&(s.push(...Md(n,d,u,d.entries.filter(y=>y.bead_id===e.bead_id))),o.push({type:"monitor-lane-update",payload:{lane_id:u,entries:rs(d.entries.filter(y=>y.bead_id!==e.bead_id))}}))),t.kind==="chain"&&_(t.lane_id,t.marker_index),r.state.refusal!==null)return{refused:r.state.refusal};if(t.kind==="candidate")e.kind!=="candidate"&&i.push({type:"worker-queue-remove",payload:{bead_id:e.bead_id},root_dir:e.root_dir});else if(t.kind==="parallel"){let y=Ch(n,e.root_dir,t.marker_index);if(e.kind==="candidate"||e.kind==="repo-serial")i.push(sl(e.bead_id,e.root_dir,y));else if(e.kind==="parallel"){let C=n.parallel_rows,O=C[Math.max(0,Math.min(C.length,t.marker_index))];if(!(!!O&&O.bead_id===e.bead_id)&&Rh(n,e.root_dir)&&m!==void 0){let te=m>y?y:y-1;te>=0&&te!==m&&i.push({type:"worker-queue-reorder",payload:{bead_id:e.bead_id,to_index:te},root_dir:e.root_dir})}}}else if(t.kind==="chain"){let y=n.cross_lanes.get(t.lane_id);e.kind==="candidate"&&y.status==="confirmed"&&i.push(sl(e.bead_id,e.root_dir,n.parallel_raw_length.get(e.root_dir)??0))}else if(e.kind==="repo-serial"&&e.lane_id===t.lane_id){if(m!==void 0&&t.index!==m){let y=m>t.index?t.index:t.index-1;y>=0&&y!==m&&i.push({type:"worker-queue-reorder",payload:{bead_id:e.bead_id,lane:t.lane_id,to_index:y},root_dir:e.root_dir})}}else i.push(sl(e.bead_id,e.root_dir,t.index,t.lane_id));return is(r,n,o,i,{disarm_ops:s,...t.kind==="chain"?{lane_id:t.lane_id,correction:l}:{}})}function qd(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:ko};if(n.entries.length<2)return{refused:"\uD655\uC815\uD558\uB824\uBA74 \uBA64\uBC84\uAC00 2\uAC1C \uC774\uC0C1\uC774\uC5B4\uC57C \uD569\uB2C8\uB2E4"};let r=os(n,t);if(r.held)return{refused:Ti};let o=r.entries,i=ss(t),s=[];Dd(i,o,e);let l=Ci(o,n.entries)?[]:[{type:"monitor-lane-update",payload:{lane_id:e,entries:rs(o)}}];return l.push({type:"monitor-lane-confirm",payload:{lane_id:e}}),is(i,t,l,s,{lane_id:e,correction:r})}function Nd(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:ko};let r=os(n,t),o=r.entries,i=ss(t),s=[];Dd(i,o,e);let l=Ci(o,n.entries)?[]:[{type:"monitor-lane-update",payload:{lane_id:e,entries:rs(o)}}];return is(i,t,l,s,{lane_id:e,correction:r})}function jd(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:ko};let r=os(n,t),o=r.entries;return is(ss(t),t,Ci(o,n.entries)?[]:[{type:"monitor-lane-update",payload:{lane_id:e,entries:rs(o)}}],[],{lane_id:e,correction:r})}function Fd(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:ko};let r=ss(t);if(n.status==="confirmed")for(let o=1;o<n.entries.length;o+=1)ns(n,o)&&r.removeDep(n.entries[o].bead_id,n.entries[o-1].bead_id);return is(r,t,[{type:"monitor-lane-remove",payload:{lane_id:e}}],[],{disarm_ops:Md(t,n,e,n.entries)})}function Bd(e,t){let n=t.cross_lanes.get(e);if(n===void 0||n.status!=="confirmed")return null;let r=[],o=[];for(let s=1;s<n.entries.length;s+=1){let l=`  ${n.entries[s].bead_id} \u2190 ${n.entries[s-1].bead_id}`;ns(n,s)?r.push(l):o.push(`${l} (\uB808\uC778\uC774 \uB9CC\uB4E4\uC9C0 \uC54A\uC74C)`)}let i=`\uC5F0\uACB0 ${al(t,e)}\uC744 \uC9C0\uC6C1\uB2C8\uB2E4.`;return r.length===0?`${i}
\uC758\uC874\uC740 \uADF8\uB300\uB85C \uB461\uB2C8\uB2E4`:[i,"\uD568\uAED8 \uC81C\uAC70\uD560 \uC758\uC874:",...r,...o.length===0?[]:["\uADF8\uB300\uB85C \uB450\uB294 \uC758\uC874:",...o]].join(`
`)}function Ud(e){let t=new Map;for(let n of e)n.type!=="dep-add"||typeof n.lane_id!="string"||t.set(n.lane_id,[...t.get(n.lane_id)||[],{bead_id:n.a,after:n.b}]);return[...t].map(([n,r])=>({lane_id:n,pairs:r}))}function Wd(e,t){let n=new Map(e.map((r,o)=>[r.bead_id,o]));return t.filter(r=>{let o=n.get(r.bead_id);return o!==void 0&&o>0&&e[o-1].bead_id===r.after})}function ll(e,t){if(e!==null){let n=t.owner_lane_of.get(e.bead_id);if(typeof n=="string"&&t.cross_lanes.has(n))return{refused:`\uC774\uBBF8 \uC5F0\uACB0 ${al(t,n)}\uC5D0 \uC788\uC2B5\uB2C8\uB2E4`}}return{lane_ops:[{type:"monitor-lane-create",payload:{entries:e===null?[]:[e]}}],ops:[],lane_op_index:0}}var Oh="\uC0AC\uC774\uD074";function Ih(e){let t=new Map,n=r=>Array.isArray(r)?r.filter(o=>typeof o=="string"&&o.length>0):[];for(let r of Array.isArray(e)?e:[]){if(!r||typeof r!="object")continue;let o=r.bead_blocked_by&&typeof r.bead_blocked_by=="object"?r.bead_blocked_by:{};for(let[i,s]of Object.entries(o))Array.isArray(s)&&t.set(i,n(s));for(let i of[...Array.isArray(r.runnable)?r.runnable:[],...Array.isArray(r.session_active)?r.session_active:[]])i&&typeof i.bead_id=="string"&&Array.isArray(i.blocked_by)&&i.blocked_by.length>0&&t.set(i.bead_id,n(i.blocked_by))}return t}function cl(e,t,n){let r=yr(e,t),o=[],i=new Set,s=(a,u)=>{for(let d of a)i.has(d.id)||(i.add(d.id),o.push({bead_id:d.id,root_dir:d.root_dir,workspace_name:d.workspace_name,title:d.title,lane:u}))};s(r.running,"running"),s(r.pr_wait,"pr_wait"),s(r.queue,"queue"),s(r.runnable_all,"runnable");let l=n&&typeof n.root_dir=="string"&&n.root_dir.length?n.root_dir:null;return{issues:l===null?o:o.filter(a=>a.root_dir===l),blocked_by_map:Ih(e)}}function zd(e,t){let n=new Map;for(let s of t.issues)!s||typeof s.bead_id!="string"||s.bead_id.length===0||n.has(s.bead_id)||n.set(s.bead_id,s);let r=n.get(e)?.root_dir,o=t.blocked_by_map.get(e)||[],i=[];for(let s of n.values()){if(s.bead_id===e||s.lane==="done"||o.includes(s.bead_id))continue;let l=il(t.blocked_by_map,s.bead_id,e);i.push({...s,disabled:l,...l?{reason:Oh}:{}})}return i.sort((s,l)=>{let a=r!==void 0&&s.root_dir===r,u=r!==void 0&&l.root_dir===r;return a!==u?a?-1:1:s.bead_id.localeCompare(l.bead_id)}),i}function Hd(e,t){let n=t.trim().toLowerCase();return n.length===0?e.slice():e.filter(r=>r.bead_id.toLowerCase().includes(n)||r.title.toLowerCase().includes(n))}var{entries:ep,setPrototypeOf:Kd,isFrozen:Lh,getPrototypeOf:Ph,getOwnPropertyDescriptor:Dh}=Object,{freeze:bn,seal:Rn,create:gl}=Object,{apply:hl,construct:bl}=typeof Reflect<"u"&&Reflect;bn||(bn=function(t){return t});Rn||(Rn=function(t){return t});hl||(hl=function(t,n){for(var r=arguments.length,o=new Array(r>2?r-2:0),i=2;i<r;i++)o[i-2]=arguments[i];return t.apply(n,o)});bl||(bl=function(t){for(var n=arguments.length,r=new Array(n>1?n-1:0),o=1;o<n;o++)r[o-1]=arguments[o];return new t(...r)});var Oi=yn(Array.prototype.forEach),Mh=yn(Array.prototype.lastIndexOf),Gd=yn(Array.prototype.pop),as=yn(Array.prototype.push),qh=yn(Array.prototype.splice),Li=yn(String.prototype.toLowerCase),ul=yn(String.prototype.toString),dl=yn(String.prototype.match),ls=yn(String.prototype.replace),Nh=yn(String.prototype.indexOf),jh=yn(String.prototype.trim),Nn=yn(Object.prototype.hasOwnProperty),hn=yn(RegExp.prototype.test),cs=Fh(TypeError);function yn(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var n=arguments.length,r=new Array(n>1?n-1:0),o=1;o<n;o++)r[o-1]=arguments[o];return hl(e,t,r)}}function Fh(e){return function(){for(var t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];return bl(e,n)}}function $t(e,t){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:Li;Kd&&Kd(e,null);let r=t.length;for(;r--;){let o=t[r];if(typeof o=="string"){let i=n(o);i!==o&&(Lh(t)||(t[r]=i),o=i)}e[o]=!0}return e}function Bh(e){for(let t=0;t<e.length;t++)Nn(e,t)||(e[t]=null);return e}function sr(e){let t=gl(null);for(let[n,r]of ep(e))Nn(e,n)&&(Array.isArray(r)?t[n]=Bh(r):r&&typeof r=="object"&&r.constructor===Object?t[n]=sr(r):t[n]=r);return t}function us(e,t){for(;e!==null;){let r=Dh(e,t);if(r){if(r.get)return yn(r.get);if(typeof r.value=="function")return yn(r.value)}e=Ph(e)}function n(){return null}return n}var Yd=bn(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),pl=bn(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),fl=bn(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),Uh=bn(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),_l=bn(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),Wh=bn(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),Vd=bn(["#text"]),Qd=bn(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),ml=bn(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),Xd=bn(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),Ii=bn(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),zh=Rn(/\{\{[\w\W]*|[\w\W]*\}\}/gm),Hh=Rn(/<%[\w\W]*|[\w\W]*%>/gm),Kh=Rn(/\$\{[\w\W]*/gm),Gh=Rn(/^data-[\-\w.\u00B7-\uFFFF]+$/),Yh=Rn(/^aria-[\-\w]+$/),tp=Rn(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),Vh=Rn(/^(?:\w+script|data):/i),Qh=Rn(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),np=Rn(/^html$/i),Xh=Rn(/^[a-z][.\w]*(-[.\w]+)+$/i),Zd=Object.freeze({__proto__:null,ARIA_ATTR:Yh,ATTR_WHITESPACE:Qh,CUSTOM_ELEMENT:Xh,DATA_ATTR:Gh,DOCTYPE_NAME:np,ERB_EXPR:Hh,IS_ALLOWED_URI:tp,IS_SCRIPT_OR_DATA:Vh,MUSTACHE_EXPR:zh,TMPLIT_EXPR:Kh}),ds={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,progressingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},Zh=function(){return typeof window>"u"?null:window},Jh=function(t,n){if(typeof t!="object"||typeof t.createPolicy!="function")return null;let r=null,o="data-tt-policy-suffix";n&&n.hasAttribute(o)&&(r=n.getAttribute(o));let i="dompurify"+(r?"#"+r:"");try{return t.createPolicy(i,{createHTML(s){return s},createScriptURL(s){return s}})}catch{return console.warn("TrustedTypes policy "+i+" could not be created."),null}},Jd=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function rp(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:Zh(),t=we=>rp(we);if(t.version="3.3.0",t.removed=[],!e||!e.document||e.document.nodeType!==ds.document||!e.Element)return t.isSupported=!1,t;let{document:n}=e,r=n,o=r.currentScript,{DocumentFragment:i,HTMLTemplateElement:s,Node:l,Element:a,NodeFilter:u,NamedNodeMap:d=e.NamedNodeMap||e.MozNamedAttrMap,HTMLFormElement:p,DOMParser:_,trustedTypes:m}=e,y=a.prototype,C=us(y,"cloneNode"),O=us(y,"remove"),V=us(y,"nextSibling"),te=us(y,"childNodes"),W=us(y,"parentNode");if(typeof s=="function"){let we=n.createElement("template");we.content&&we.content.ownerDocument&&(n=we.content.ownerDocument)}let q,I="",{implementation:P,createNodeIterator:U,createDocumentFragment:Y,getElementsByTagName:N}=n,{importNode:j}=r,z=Jd();t.isSupported=typeof ep=="function"&&typeof W=="function"&&P&&P.createHTMLDocument!==void 0;let{MUSTACHE_EXPR:K,ERB_EXPR:oe,TMPLIT_EXPR:ve,DATA_ATTR:Ne,ARIA_ATTR:F,IS_SCRIPT_OR_DATA:X,ATTR_WHITESPACE:Ae,CUSTOM_ELEMENT:Ee}=Zd,{IS_ALLOWED_URI:R}=Zd,se=null,ye=$t({},[...Yd,...pl,...fl,..._l,...Vd]),ke=null,Me=$t({},[...Qd,...ml,...Xd,...Ii]),he=Object.seal(gl(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),Ie=null,Ze=null,ut=Object.seal(gl(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}})),G=!0,J=!0,re=!1,pe=!0,Se=!1,me=!0,je=!1,Be=!1,Qe=!1,He=!1,ee=!1,Q=!1,xe=!0,_t=!1,pt="user-content-",Ke=!0,et=!1,x={},Z=null,Le=$t({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]),Ye=null,tt=$t({},["audio","video","img","source","image","track"]),Ce=null,Je=$t({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),Bt="http://www.w3.org/1998/Math/MathML",kt="http://www.w3.org/2000/svg",ht="http://www.w3.org/1999/xhtml",Dt=ht,Rt=!1,Mt=null,ce=$t({},[Bt,kt,ht],ul),be=$t({},["mi","mo","mn","ms","mtext"]),Ge=$t({},["annotation-xml"]),rt=$t({},["title","style","font","a","script"]),Re=null,E=["application/xhtml+xml","text/html"],L="text/html",ne=null,fe=null,_e=n.createElement("form"),De=function(S){return S instanceof RegExp||S instanceof Function},yt=function(){let S=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(fe&&fe===S)){if((!S||typeof S!="object")&&(S={}),S=sr(S),Re=E.indexOf(S.PARSER_MEDIA_TYPE)===-1?L:S.PARSER_MEDIA_TYPE,ne=Re==="application/xhtml+xml"?ul:Li,se=Nn(S,"ALLOWED_TAGS")?$t({},S.ALLOWED_TAGS,ne):ye,ke=Nn(S,"ALLOWED_ATTR")?$t({},S.ALLOWED_ATTR,ne):Me,Mt=Nn(S,"ALLOWED_NAMESPACES")?$t({},S.ALLOWED_NAMESPACES,ul):ce,Ce=Nn(S,"ADD_URI_SAFE_ATTR")?$t(sr(Je),S.ADD_URI_SAFE_ATTR,ne):Je,Ye=Nn(S,"ADD_DATA_URI_TAGS")?$t(sr(tt),S.ADD_DATA_URI_TAGS,ne):tt,Z=Nn(S,"FORBID_CONTENTS")?$t({},S.FORBID_CONTENTS,ne):Le,Ie=Nn(S,"FORBID_TAGS")?$t({},S.FORBID_TAGS,ne):sr({}),Ze=Nn(S,"FORBID_ATTR")?$t({},S.FORBID_ATTR,ne):sr({}),x=Nn(S,"USE_PROFILES")?S.USE_PROFILES:!1,G=S.ALLOW_ARIA_ATTR!==!1,J=S.ALLOW_DATA_ATTR!==!1,re=S.ALLOW_UNKNOWN_PROTOCOLS||!1,pe=S.ALLOW_SELF_CLOSE_IN_ATTR!==!1,Se=S.SAFE_FOR_TEMPLATES||!1,me=S.SAFE_FOR_XML!==!1,je=S.WHOLE_DOCUMENT||!1,He=S.RETURN_DOM||!1,ee=S.RETURN_DOM_FRAGMENT||!1,Q=S.RETURN_TRUSTED_TYPE||!1,Qe=S.FORCE_BODY||!1,xe=S.SANITIZE_DOM!==!1,_t=S.SANITIZE_NAMED_PROPS||!1,Ke=S.KEEP_CONTENT!==!1,et=S.IN_PLACE||!1,R=S.ALLOWED_URI_REGEXP||tp,Dt=S.NAMESPACE||ht,be=S.MATHML_TEXT_INTEGRATION_POINTS||be,Ge=S.HTML_INTEGRATION_POINTS||Ge,he=S.CUSTOM_ELEMENT_HANDLING||{},S.CUSTOM_ELEMENT_HANDLING&&De(S.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(he.tagNameCheck=S.CUSTOM_ELEMENT_HANDLING.tagNameCheck),S.CUSTOM_ELEMENT_HANDLING&&De(S.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(he.attributeNameCheck=S.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),S.CUSTOM_ELEMENT_HANDLING&&typeof S.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(he.allowCustomizedBuiltInElements=S.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),Se&&(J=!1),ee&&(He=!0),x&&(se=$t({},Vd),ke=[],x.html===!0&&($t(se,Yd),$t(ke,Qd)),x.svg===!0&&($t(se,pl),$t(ke,ml),$t(ke,Ii)),x.svgFilters===!0&&($t(se,fl),$t(ke,ml),$t(ke,Ii)),x.mathMl===!0&&($t(se,_l),$t(ke,Xd),$t(ke,Ii))),S.ADD_TAGS&&(typeof S.ADD_TAGS=="function"?ut.tagCheck=S.ADD_TAGS:(se===ye&&(se=sr(se)),$t(se,S.ADD_TAGS,ne))),S.ADD_ATTR&&(typeof S.ADD_ATTR=="function"?ut.attributeCheck=S.ADD_ATTR:(ke===Me&&(ke=sr(ke)),$t(ke,S.ADD_ATTR,ne))),S.ADD_URI_SAFE_ATTR&&$t(Ce,S.ADD_URI_SAFE_ATTR,ne),S.FORBID_CONTENTS&&(Z===Le&&(Z=sr(Z)),$t(Z,S.FORBID_CONTENTS,ne)),Ke&&(se["#text"]=!0),je&&$t(se,["html","head","body"]),se.table&&($t(se,["tbody"]),delete Ie.tbody),S.TRUSTED_TYPES_POLICY){if(typeof S.TRUSTED_TYPES_POLICY.createHTML!="function")throw cs('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof S.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw cs('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');q=S.TRUSTED_TYPES_POLICY,I=q.createHTML("")}else q===void 0&&(q=Jh(m,o)),q!==null&&typeof I=="string"&&(I=q.createHTML(""));bn&&bn(S),fe=S}},xt=$t({},[...pl,...fl,...Uh]),bt=$t({},[..._l,...Wh]),Ut=function(S){let de=W(S);(!de||!de.tagName)&&(de={namespaceURI:Dt,tagName:"template"});let qe=Li(S.tagName),b=Li(de.tagName);return Mt[S.namespaceURI]?S.namespaceURI===kt?de.namespaceURI===ht?qe==="svg":de.namespaceURI===Bt?qe==="svg"&&(b==="annotation-xml"||be[b]):!!xt[qe]:S.namespaceURI===Bt?de.namespaceURI===ht?qe==="math":de.namespaceURI===kt?qe==="math"&&Ge[b]:!!bt[qe]:S.namespaceURI===ht?de.namespaceURI===kt&&!Ge[b]||de.namespaceURI===Bt&&!be[b]?!1:!bt[qe]&&(rt[qe]||!xt[qe]):!!(Re==="application/xhtml+xml"&&Mt[S.namespaceURI]):!1},wt=function(S){as(t.removed,{element:S});try{W(S).removeChild(S)}catch{O(S)}},qt=function(S,de){try{as(t.removed,{attribute:de.getAttributeNode(S),from:de})}catch{as(t.removed,{attribute:null,from:de})}if(de.removeAttribute(S),S==="is")if(He||ee)try{wt(de)}catch{}else try{de.setAttribute(S,"")}catch{}},At=function(S){let de=null,qe=null;if(Qe)S="<remove></remove>"+S;else{let M=dl(S,/^[\r\n\t ]+/);qe=M&&M[0]}Re==="application/xhtml+xml"&&Dt===ht&&(S='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+S+"</body></html>");let b=q?q.createHTML(S):S;if(Dt===ht)try{de=new _().parseFromString(b,Re)}catch{}if(!de||!de.documentElement){de=P.createDocument(Dt,"template",null);try{de.documentElement.innerHTML=Rt?I:b}catch{}}let v=de.body||de.documentElement;return S&&qe&&v.insertBefore(n.createTextNode(qe),v.childNodes[0]||null),Dt===ht?N.call(de,je?"html":"body")[0]:je?de.documentElement:v},Xt=function(S){return U.call(S.ownerDocument||S,S,u.SHOW_ELEMENT|u.SHOW_COMMENT|u.SHOW_TEXT|u.SHOW_PROCESSING_INSTRUCTION|u.SHOW_CDATA_SECTION,null)},Jt=function(S){return S instanceof p&&(typeof S.nodeName!="string"||typeof S.textContent!="string"||typeof S.removeChild!="function"||!(S.attributes instanceof d)||typeof S.removeAttribute!="function"||typeof S.setAttribute!="function"||typeof S.namespaceURI!="string"||typeof S.insertBefore!="function"||typeof S.hasChildNodes!="function")},Ot=function(S){return typeof l=="function"&&S instanceof l};function St(we,S,de){Oi(we,qe=>{qe.call(t,S,de,fe)})}let Gt=function(S){let de=null;if(St(z.beforeSanitizeElements,S,null),Jt(S))return wt(S),!0;let qe=ne(S.nodeName);if(St(z.uponSanitizeElement,S,{tagName:qe,allowedTags:se}),me&&S.hasChildNodes()&&!Ot(S.firstElementChild)&&hn(/<[/\w!]/g,S.innerHTML)&&hn(/<[/\w!]/g,S.textContent)||S.nodeType===ds.progressingInstruction||me&&S.nodeType===ds.comment&&hn(/<[/\w]/g,S.data))return wt(S),!0;if(!(ut.tagCheck instanceof Function&&ut.tagCheck(qe))&&(!se[qe]||Ie[qe])){if(!Ie[qe]&&rn(qe)&&(he.tagNameCheck instanceof RegExp&&hn(he.tagNameCheck,qe)||he.tagNameCheck instanceof Function&&he.tagNameCheck(qe)))return!1;if(Ke&&!Z[qe]){let b=W(S)||S.parentNode,v=te(S)||S.childNodes;if(v&&b){let M=v.length;for(let f=M-1;f>=0;--f){let k=C(v[f],!0);k.__removalCount=(S.__removalCount||0)+1,b.insertBefore(k,V(S))}}}return wt(S),!0}return S instanceof a&&!Ut(S)||(qe==="noscript"||qe==="noembed"||qe==="noframes")&&hn(/<\/no(script|embed|frames)/i,S.innerHTML)?(wt(S),!0):(Se&&S.nodeType===ds.text&&(de=S.textContent,Oi([K,oe,ve],b=>{de=ls(de,b," ")}),S.textContent!==de&&(as(t.removed,{element:S.cloneNode()}),S.textContent=de)),St(z.afterSanitizeElements,S,null),!1)},tn=function(S,de,qe){if(xe&&(de==="id"||de==="name")&&(qe in n||qe in _e))return!1;if(!(J&&!Ze[de]&&hn(Ne,de))){if(!(G&&hn(F,de))){if(!(ut.attributeCheck instanceof Function&&ut.attributeCheck(de,S))){if(!ke[de]||Ze[de]){if(!(rn(S)&&(he.tagNameCheck instanceof RegExp&&hn(he.tagNameCheck,S)||he.tagNameCheck instanceof Function&&he.tagNameCheck(S))&&(he.attributeNameCheck instanceof RegExp&&hn(he.attributeNameCheck,de)||he.attributeNameCheck instanceof Function&&he.attributeNameCheck(de,S))||de==="is"&&he.allowCustomizedBuiltInElements&&(he.tagNameCheck instanceof RegExp&&hn(he.tagNameCheck,qe)||he.tagNameCheck instanceof Function&&he.tagNameCheck(qe))))return!1}else if(!Ce[de]){if(!hn(R,ls(qe,Ae,""))){if(!((de==="src"||de==="xlink:href"||de==="href")&&S!=="script"&&Nh(qe,"data:")===0&&Ye[S])){if(!(re&&!hn(X,ls(qe,Ae,"")))){if(qe)return!1}}}}}}}return!0},rn=function(S){return S!=="annotation-xml"&&dl(S,Ee)},zt=function(S){St(z.beforeSanitizeAttributes,S,null);let{attributes:de}=S;if(!de||Jt(S))return;let qe={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:ke,forceKeepAttr:void 0},b=de.length;for(;b--;){let v=de[b],{name:M,namespaceURI:f,value:k}=v,B=ne(M),ae=k,le=M==="value"?ae:jh(ae);if(qe.attrName=B,qe.attrValue=le,qe.keepAttr=!0,qe.forceKeepAttr=void 0,St(z.uponSanitizeAttribute,S,qe),le=qe.attrValue,_t&&(B==="id"||B==="name")&&(qt(M,S),le=pt+le),me&&hn(/((--!?|])>)|<\/(style|title|textarea)/i,le)){qt(M,S);continue}if(B==="attributename"&&dl(le,"href")){qt(M,S);continue}if(qe.forceKeepAttr)continue;if(!qe.keepAttr){qt(M,S);continue}if(!pe&&hn(/\/>/i,le)){qt(M,S);continue}Se&&Oi([K,oe,ve],ft=>{le=ls(le,ft," ")});let Ue=ne(S.nodeName);if(!tn(Ue,B,le)){qt(M,S);continue}if(q&&typeof m=="object"&&typeof m.getAttributeType=="function"&&!f)switch(m.getAttributeType(Ue,B)){case"TrustedHTML":{le=q.createHTML(le);break}case"TrustedScriptURL":{le=q.createScriptURL(le);break}}if(le!==ae)try{f?S.setAttributeNS(f,M,le):S.setAttribute(M,le),Jt(S)?wt(S):Gd(t.removed)}catch{qt(M,S)}}St(z.afterSanitizeAttributes,S,null)},on=function we(S){let de=null,qe=Xt(S);for(St(z.beforeSanitizeShadowDOM,S,null);de=qe.nextNode();)St(z.uponSanitizeShadowNode,de,null),Gt(de),zt(de),de.content instanceof i&&we(de.content);St(z.afterSanitizeShadowDOM,S,null)};return t.sanitize=function(we){let S=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},de=null,qe=null,b=null,v=null;if(Rt=!we,Rt&&(we="<!-->"),typeof we!="string"&&!Ot(we))if(typeof we.toString=="function"){if(we=we.toString(),typeof we!="string")throw cs("dirty is not a string, aborting")}else throw cs("toString is not a function");if(!t.isSupported)return we;if(Be||yt(S),t.removed=[],typeof we=="string"&&(et=!1),et){if(we.nodeName){let k=ne(we.nodeName);if(!se[k]||Ie[k])throw cs("root node is forbidden and cannot be sanitized in-place")}}else if(we instanceof l)de=At("<!---->"),qe=de.ownerDocument.importNode(we,!0),qe.nodeType===ds.element&&qe.nodeName==="BODY"||qe.nodeName==="HTML"?de=qe:de.appendChild(qe);else{if(!He&&!Se&&!je&&we.indexOf("<")===-1)return q&&Q?q.createHTML(we):we;if(de=At(we),!de)return He?null:Q?I:""}de&&Qe&&wt(de.firstChild);let M=Xt(et?we:de);for(;b=M.nextNode();)Gt(b),zt(b),b.content instanceof i&&on(b.content);if(et)return we;if(He){if(ee)for(v=Y.call(de.ownerDocument);de.firstChild;)v.appendChild(de.firstChild);else v=de;return(ke.shadowroot||ke.shadowrootmode)&&(v=j.call(r,v,!0)),v}let f=je?de.outerHTML:de.innerHTML;return je&&se["!doctype"]&&de.ownerDocument&&de.ownerDocument.doctype&&de.ownerDocument.doctype.name&&hn(np,de.ownerDocument.doctype.name)&&(f="<!DOCTYPE "+de.ownerDocument.doctype.name+`>
`+f),Se&&Oi([K,oe,ve],k=>{f=ls(f,k," ")}),q&&Q?q.createHTML(f):f},t.setConfig=function(){let we=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};yt(we),Be=!0},t.clearConfig=function(){fe=null,Be=!1},t.isValidAttribute=function(we,S,de){fe||yt({});let qe=ne(we),b=ne(S);return tn(qe,b,de)},t.addHook=function(we,S){typeof S=="function"&&as(z[we],S)},t.removeHook=function(we,S){if(S!==void 0){let de=Mh(z[we],S);return de===-1?void 0:qh(z[we],de,1)[0]}return Gd(z[we])},t.removeHooks=function(we){z[we]=[]},t.removeAllHooks=function(){z=Jd()},t}var op=rp();var ir={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},Pi=e=>(...t)=>({_$litDirective$:e,values:t}),wo=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,n,r){this._$Ct=t,this._$AM=n,this._$Ci=r}_$AS(t,n){return this.update(t,n)}update(t,n){return this.render(...n)}};var ps=class extends wo{constructor(t){if(super(t),this.it=Kt,t.type!==ir.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===Kt||t==null)return this._t=void 0,this.it=t;if(t===Cn)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;let n=[t];return n.raw=n,this._t={_$litType$:this.constructor.resultType,strings:n,values:[]}}};ps.directiveName="unsafeHTML",ps.resultType=1;var sp=Pi(ps);function wl(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var Ur=wl();function pp(e){Ur=e}var gs={exec:()=>null};function It(e,t=""){let n=typeof e=="string"?e:e.source,r={replace:(o,i)=>{let s=typeof i=="string"?i:i.source;return s=s.replace(vn.caret,"$1"),n=n.replace(o,s),r},getRegex:()=>new RegExp(n,t)};return r}var eb=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),vn={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i")},tb=/^(?:[ \t]*(?:\n|$))+/,nb=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,rb=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,hs=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,ob=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,$l=/(?:[*+-]|\d{1,9}[.)])/,fp=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,_p=It(fp).replace(/bull/g,$l).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),sb=It(fp).replace(/bull/g,$l).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),xl=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,ib=/^[^\n]+/,Al=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,ab=It(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",Al).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),lb=It(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,$l).getRegex(),Fi="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",Sl=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,cb=It("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",Sl).replace("tag",Fi).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),mp=It(xl).replace("hr",hs).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Fi).getRegex(),ub=It(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",mp).getRegex(),El={blockquote:ub,code:nb,def:ab,fences:rb,heading:ob,hr:hs,html:cb,lheading:_p,list:lb,newline:tb,paragraph:mp,table:gs,text:ib},ip=It("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",hs).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Fi).getRegex(),db={...El,lheading:sb,table:ip,paragraph:It(xl).replace("hr",hs).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",ip).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Fi).getRegex()},pb={...El,html:It(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",Sl).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:gs,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:It(xl).replace("hr",hs).replace("heading",` *#{1,6} *[^
]`).replace("lheading",_p).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},fb=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,_b=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,gp=/^( {2,}|\\)\n(?!\s*$)/,mb=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,Bi=/[\p{P}\p{S}]/u,Tl=/[\s\p{P}\p{S}]/u,hp=/[^\s\p{P}\p{S}]/u,gb=It(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,Tl).getRegex(),bp=/(?!~)[\p{P}\p{S}]/u,hb=/(?!~)[\s\p{P}\p{S}]/u,bb=/(?:[^\s\p{P}\p{S}]|~)/u,yb=It(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",eb?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),yp=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,vb=It(yp,"u").replace(/punct/g,Bi).getRegex(),kb=It(yp,"u").replace(/punct/g,bp).getRegex(),vp="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",wb=It(vp,"gu").replace(/notPunctSpace/g,hp).replace(/punctSpace/g,Tl).replace(/punct/g,Bi).getRegex(),$b=It(vp,"gu").replace(/notPunctSpace/g,bb).replace(/punctSpace/g,hb).replace(/punct/g,bp).getRegex(),xb=It("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,hp).replace(/punctSpace/g,Tl).replace(/punct/g,Bi).getRegex(),Ab=It(/\\(punct)/,"gu").replace(/punct/g,Bi).getRegex(),Sb=It(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),Eb=It(Sl).replace("(?:-->|$)","-->").getRegex(),Tb=It("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",Eb).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),qi=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,Cb=It(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",qi).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),kp=It(/^!?\[(label)\]\[(ref)\]/).replace("label",qi).replace("ref",Al).getRegex(),wp=It(/^!?\[(ref)\](?:\[\])?/).replace("ref",Al).getRegex(),Rb=It("reflink|nolink(?!\\()","g").replace("reflink",kp).replace("nolink",wp).getRegex(),ap=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,Cl={_backpedal:gs,anyPunctuation:Ab,autolink:Sb,blockSkip:yb,br:gp,code:_b,del:gs,emStrongLDelim:vb,emStrongRDelimAst:wb,emStrongRDelimUnd:xb,escape:fb,link:Cb,nolink:wp,punctuation:gb,reflink:kp,reflinkSearch:Rb,tag:Tb,text:mb,url:gs},Ob={...Cl,link:It(/^!?\[(label)\]\((.*?)\)/).replace("label",qi).getRegex(),reflink:It(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",qi).getRegex()},yl={...Cl,emStrongRDelimAst:$b,emStrongLDelim:kb,url:It(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",ap).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:It(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",ap).getRegex()},Ib={...yl,br:It(gp).replace("{2,}","*").getRegex(),text:It(yl.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},Di={normal:El,gfm:db,pedantic:pb},fs={normal:Cl,gfm:yl,breaks:Ib,pedantic:Ob},Lb={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},lp=e=>Lb[e];function ar(e,t){if(t){if(vn.escapeTest.test(e))return e.replace(vn.escapeReplace,lp)}else if(vn.escapeTestNoEncode.test(e))return e.replace(vn.escapeReplaceNoEncode,lp);return e}function cp(e){try{e=encodeURI(e).replace(vn.percentDecode,"%")}catch{return null}return e}function up(e,t){let n=e.replace(vn.findPipe,(i,s,l)=>{let a=!1,u=s;for(;--u>=0&&l[u]==="\\";)a=!a;return a?"|":" |"}),r=n.split(vn.splitPipe),o=0;if(r[0].trim()||r.shift(),r.length>0&&!r.at(-1)?.trim()&&r.pop(),t)if(r.length>t)r.splice(t);else for(;r.length<t;)r.push("");for(;o<r.length;o++)r[o]=r[o].trim().replace(vn.slashPipe,"|");return r}function _s(e,t,n){let r=e.length;if(r===0)return"";let o=0;for(;o<r;){let i=e.charAt(r-o-1);if(i===t&&!n)o++;else if(i!==t&&n)o++;else break}return e.slice(0,r-o)}function Pb(e,t){if(e.indexOf(t[1])===-1)return-1;let n=0;for(let r=0;r<e.length;r++)if(e[r]==="\\")r++;else if(e[r]===t[0])n++;else if(e[r]===t[1]&&(n--,n<0))return r;return n>0?-2:-1}function dp(e,t,n,r,o){let i=t.href,s=t.title||null,l=e[1].replace(o.other.outputLinkReplace,"$1");r.state.inLink=!0;let a={type:e[0].charAt(0)==="!"?"image":"link",raw:n,href:i,title:s,text:l,tokens:r.inlineTokens(l)};return r.state.inLink=!1,a}function Db(e,t,n){let r=e.match(n.other.indentCodeCompensation);if(r===null)return t;let o=r[1];return t.split(`
`).map(i=>{let s=i.match(n.other.beginningSpace);if(s===null)return i;let[l]=s;return l.length>=o.length?i.slice(o.length):i}).join(`
`)}var Ni=class{constructor(e){jt(this,"options");jt(this,"rules");jt(this,"lexer");this.options=e||Ur}space(e){let t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){let t=this.rules.block.code.exec(e);if(t){let n=t[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?n:_s(n,`
`)}}}fences(e){let t=this.rules.block.fences.exec(e);if(t){let n=t[0],r=Db(n,t[3]||"",this.rules);return{type:"code",raw:n,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:r}}}heading(e){let t=this.rules.block.heading.exec(e);if(t){let n=t[2].trim();if(this.rules.other.endingHash.test(n)){let r=_s(n,"#");(this.options.pedantic||!r||this.rules.other.endingSpaceChar.test(r))&&(n=r.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:n,tokens:this.lexer.inline(n)}}}hr(e){let t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:_s(t[0],`
`)}}blockquote(e){let t=this.rules.block.blockquote.exec(e);if(t){let n=_s(t[0],`
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
`,e=e.substring(_.length+1),a=!0),!a){let C=this.rules.other.nextBulletRegex(y),O=this.rules.other.hrRegex(y),V=this.rules.other.fencesBeginRegex(y),te=this.rules.other.headingBeginRegex(y),W=this.rules.other.htmlBeginRegex(y);for(;e;){let q=e.split(`
`,1)[0],I;if(_=q,this.options.pedantic?(_=_.replace(this.rules.other.listReplaceNesting,"  "),I=_):I=_.replace(this.rules.other.tabCharGlobal,"    "),V.test(_)||te.test(_)||W.test(_)||C.test(_)||O.test(_))break;if(I.search(this.rules.other.nonSpaceChar)>=y||!_.trim())d+=`
`+I.slice(y);else{if(m||p.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||V.test(p)||te.test(p)||O.test(p))break;d+=`
`+_}!m&&!_.trim()&&(m=!0),u+=q+`
`,e=e.substring(q.length+1),p=I.slice(y)}}o.loose||(s?o.loose=!0:this.rules.other.doubleBlankLine.test(u)&&(s=!0)),o.items.push({type:"list_item",raw:u,task:!!this.options.gfm&&this.rules.other.listIsTask.test(d),loose:!1,text:d,tokens:[]}),o.raw+=u}let l=o.items.at(-1);if(l)l.raw=l.raw.trimEnd(),l.text=l.text.trimEnd();else return;o.raw=o.raw.trimEnd();for(let a of o.items){if(this.lexer.state.top=!1,a.tokens=this.lexer.blockTokens(a.text,[]),a.task){if(a.text=a.text.replace(this.rules.other.listReplaceTask,""),a.tokens[0]?.type==="text"||a.tokens[0]?.type==="paragraph"){a.tokens[0].raw=a.tokens[0].raw.replace(this.rules.other.listReplaceTask,""),a.tokens[0].text=a.tokens[0].text.replace(this.rules.other.listReplaceTask,"");for(let d=this.lexer.inlineQueue.length-1;d>=0;d--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[d].src)){this.lexer.inlineQueue[d].src=this.lexer.inlineQueue[d].src.replace(this.rules.other.listReplaceTask,"");break}}let u=this.rules.other.listTaskCheckbox.exec(a.raw);if(u){let d={type:"checkbox",raw:u[0]+" ",checked:u[0]!=="[ ]"};a.checked=d.checked,o.loose?a.tokens[0]&&["paragraph","text"].includes(a.tokens[0].type)&&"tokens"in a.tokens[0]&&a.tokens[0].tokens?(a.tokens[0].raw=d.raw+a.tokens[0].raw,a.tokens[0].text=d.raw+a.tokens[0].text,a.tokens[0].tokens.unshift(d)):a.tokens.unshift({type:"paragraph",raw:d.raw,text:d.raw,tokens:[d]}):a.tokens.unshift(d)}}if(!o.loose){let u=a.tokens.filter(p=>p.type==="space"),d=u.length>0&&u.some(p=>this.rules.other.anyLine.test(p.raw));o.loose=d}}if(o.loose)for(let a of o.items){a.loose=!0;for(let u of a.tokens)u.type==="text"&&(u.type="paragraph")}return o}}html(e){let t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){let t=this.rules.block.def.exec(e);if(t){let n=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),r=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",o=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:n,raw:t[0],href:r,title:o}}}table(e){let t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;let n=up(t[1]),r=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),o=t[3]?.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],i={type:"table",raw:t[0],header:[],align:[],rows:[]};if(n.length===r.length){for(let s of r)this.rules.other.tableAlignRight.test(s)?i.align.push("right"):this.rules.other.tableAlignCenter.test(s)?i.align.push("center"):this.rules.other.tableAlignLeft.test(s)?i.align.push("left"):i.align.push(null);for(let s=0;s<n.length;s++)i.header.push({text:n[s],tokens:this.lexer.inline(n[s]),header:!0,align:i.align[s]});for(let s of o)i.rows.push(up(s,i.header.length).map((l,a)=>({text:l,tokens:this.lexer.inline(l),header:!1,align:i.align[a]})));return i}}lheading(e){let t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){let t=this.rules.block.paragraph.exec(e);if(t){let n=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:n,tokens:this.lexer.inline(n)}}}text(e){let t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){let t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){let t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){let t=this.rules.inline.link.exec(e);if(t){let n=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(n)){if(!this.rules.other.endAngleBracket.test(n))return;let i=_s(n.slice(0,-1),"\\");if((n.length-i.length)%2===0)return}else{let i=Pb(t[2],"()");if(i===-2)return;if(i>-1){let s=(t[0].indexOf("!")===0?5:4)+t[1].length+i;t[2]=t[2].substring(0,i),t[0]=t[0].substring(0,s).trim(),t[3]=""}}let r=t[2],o="";if(this.options.pedantic){let i=this.rules.other.pedanticHrefTitle.exec(r);i&&(r=i[1],o=i[3])}else o=t[3]?t[3].slice(1,-1):"";return r=r.trim(),this.rules.other.startAngleBracket.test(r)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(n)?r=r.slice(1):r=r.slice(1,-1)),dp(t,{href:r&&r.replace(this.rules.inline.anyPunctuation,"$1"),title:o&&o.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let n;if((n=this.rules.inline.reflink.exec(e))||(n=this.rules.inline.nolink.exec(e))){let r=(n[2]||n[1]).replace(this.rules.other.multipleSpaceGlobal," "),o=t[r.toLowerCase()];if(!o){let i=n[0].charAt(0);return{type:"text",raw:i,text:i}}return dp(n,o,n[0],this.lexer,this.rules)}}emStrong(e,t,n=""){let r=this.rules.inline.emStrongLDelim.exec(e);if(!(!r||r[3]&&n.match(this.rules.other.unicodeAlphaNumeric))&&(!(r[1]||r[2])||!n||this.rules.inline.punctuation.exec(n))){let o=[...r[0]].length-1,i,s,l=o,a=0,u=r[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(u.lastIndex=0,t=t.slice(-1*e.length+o);(r=u.exec(t))!=null;){if(i=r[1]||r[2]||r[3]||r[4]||r[5]||r[6],!i)continue;if(s=[...i].length,r[3]||r[4]){l+=s;continue}else if((r[5]||r[6])&&o%3&&!((o+s)%3)){a+=s;continue}if(l-=s,l>0)continue;s=Math.min(s,s+l+a);let d=[...r[0]][0].length,p=e.slice(0,o+r.index+d+s);if(Math.min(o,s)%2){let m=p.slice(1,-1);return{type:"em",raw:p,text:m,tokens:this.lexer.inlineTokens(m)}}let _=p.slice(2,-2);return{type:"strong",raw:p,text:_,tokens:this.lexer.inlineTokens(_)}}}}codespan(e){let t=this.rules.inline.code.exec(e);if(t){let n=t[2].replace(this.rules.other.newLineCharGlobal," "),r=this.rules.other.nonSpaceChar.test(n),o=this.rules.other.startingSpaceChar.test(n)&&this.rules.other.endingSpaceChar.test(n);return r&&o&&(n=n.substring(1,n.length-1)),{type:"codespan",raw:t[0],text:n}}}br(e){let t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){let t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){let t=this.rules.inline.autolink.exec(e);if(t){let n,r;return t[2]==="@"?(n=t[1],r="mailto:"+n):(n=t[1],r=n),{type:"link",raw:t[0],text:n,href:r,tokens:[{type:"text",raw:n,text:n}]}}}url(e){let t;if(t=this.rules.inline.url.exec(e)){let n,r;if(t[2]==="@")n=t[0],r="mailto:"+n;else{let o;do o=t[0],t[0]=this.rules.inline._backpedal.exec(t[0])?.[0]??"";while(o!==t[0]);n=t[0],t[1]==="www."?r="http://"+t[0]:r=t[0]}return{type:"link",raw:t[0],text:n,href:r,tokens:[{type:"text",raw:n,text:n}]}}}inlineText(e){let t=this.rules.inline.text.exec(e);if(t){let n=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:n}}}},jn=class vl{constructor(t){jt(this,"tokens");jt(this,"options");jt(this,"state");jt(this,"inlineQueue");jt(this,"tokenizer");this.tokens=[],this.tokens.links=Object.create(null),this.options=t||Ur,this.options.tokenizer=this.options.tokenizer||new Ni,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let n={other:vn,block:Di.normal,inline:fs.normal};this.options.pedantic?(n.block=Di.pedantic,n.inline=fs.pedantic):this.options.gfm&&(n.block=Di.gfm,this.options.breaks?n.inline=fs.breaks:n.inline=fs.gfm),this.tokenizer.rules=n}static get rules(){return{block:Di,inline:fs}}static lex(t,n){return new vl(n).lex(t)}static lexInline(t,n){return new vl(n).inlineTokens(t)}lex(t){t=t.replace(vn.carriageReturn,`
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
`+o.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=s.text):n.push(o);continue}if(t){let s="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(s);break}else throw new Error(s)}}return this.state.top=!0,n}inline(t,n=[]){return this.inlineQueue.push({src:t,tokens:n}),n}inlineTokens(t,n=[]){let r=t,o=null;if(this.tokens.links){let a=Object.keys(this.tokens.links);if(a.length>0)for(;(o=this.tokenizer.rules.inline.reflinkSearch.exec(r))!=null;)a.includes(o[0].slice(o[0].lastIndexOf("[")+1,-1))&&(r=r.slice(0,o.index)+"["+"a".repeat(o[0].length-2)+"]"+r.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(o=this.tokenizer.rules.inline.anyPunctuation.exec(r))!=null;)r=r.slice(0,o.index)+"++"+r.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let i;for(;(o=this.tokenizer.rules.inline.blockSkip.exec(r))!=null;)i=o[2]?o[2].length:0,r=r.slice(0,o.index+i)+"["+"a".repeat(o[0].length-i-2)+"]"+r.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);r=this.options.hooks?.emStrongMask?.call({lexer:this},r)??r;let s=!1,l="";for(;t;){s||(l=""),s=!1;let a;if(this.options.extensions?.inline?.some(d=>(a=d.call({lexer:this},t,n))?(t=t.substring(a.raw.length),n.push(a),!0):!1))continue;if(a=this.tokenizer.escape(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.tag(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.link(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(a.raw.length);let d=n.at(-1);a.type==="text"&&d?.type==="text"?(d.raw+=a.raw,d.text+=a.text):n.push(a);continue}if(a=this.tokenizer.emStrong(t,r,l)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.codespan(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.br(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.del(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.autolink(t)){t=t.substring(a.raw.length),n.push(a);continue}if(!this.state.inLink&&(a=this.tokenizer.url(t))){t=t.substring(a.raw.length),n.push(a);continue}let u=t;if(this.options.extensions?.startInline){let d=1/0,p=t.slice(1),_;this.options.extensions.startInline.forEach(m=>{_=m.call({lexer:this},p),typeof _=="number"&&_>=0&&(d=Math.min(d,_))}),d<1/0&&d>=0&&(u=t.substring(0,d+1))}if(a=this.tokenizer.inlineText(u)){t=t.substring(a.raw.length),a.raw.slice(-1)!=="_"&&(l=a.raw.slice(-1)),s=!0;let d=n.at(-1);d?.type==="text"?(d.raw+=a.raw,d.text+=a.text):n.push(a);continue}if(t){let d="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(d);break}else throw new Error(d)}}return n}},ji=class{constructor(e){jt(this,"options");jt(this,"parser");this.options=e||Ur}space(e){return""}code({text:e,lang:t,escaped:n}){let r=(t||"").match(vn.notSpaceStart)?.[0],o=e.replace(vn.endingNewline,"")+`
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
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${ar(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:n}){let r=this.parser.parseInline(n),o=cp(e);if(o===null)return r;e=o;let i='<a href="'+e+'"';return t&&(i+=' title="'+ar(t)+'"'),i+=">"+r+"</a>",i}image({href:e,title:t,text:n,tokens:r}){r&&(n=this.parser.parseInline(r,this.parser.textRenderer));let o=cp(e);if(o===null)return ar(n);e=o;let i=`<img src="${e}" alt="${n}"`;return t&&(i+=` title="${ar(t)}"`),i+=">",i}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:ar(e.text)}},Rl=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}checkbox({raw:e}){return e}},Fn=class kl{constructor(t){jt(this,"options");jt(this,"renderer");jt(this,"textRenderer");this.options=t||Ur,this.options.renderer=this.options.renderer||new ji,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new Rl}static parse(t,n){return new kl(n).parse(t)}static parseInline(t,n){return new kl(n).parseInline(t)}parse(t){let n="";for(let r=0;r<t.length;r++){let o=t[r];if(this.options.extensions?.renderers?.[o.type]){let s=o,l=this.options.extensions.renderers[s.type].call({parser:this},s);if(l!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(s.type)){n+=l||"";continue}}let i=o;switch(i.type){case"space":{n+=this.renderer.space(i);break}case"hr":{n+=this.renderer.hr(i);break}case"heading":{n+=this.renderer.heading(i);break}case"code":{n+=this.renderer.code(i);break}case"table":{n+=this.renderer.table(i);break}case"blockquote":{n+=this.renderer.blockquote(i);break}case"list":{n+=this.renderer.list(i);break}case"checkbox":{n+=this.renderer.checkbox(i);break}case"html":{n+=this.renderer.html(i);break}case"def":{n+=this.renderer.def(i);break}case"paragraph":{n+=this.renderer.paragraph(i);break}case"text":{n+=this.renderer.text(i);break}default:{let s='Token with "'+i.type+'" type was not found.';if(this.options.silent)return console.error(s),"";throw new Error(s)}}}return n}parseInline(t,n=this.renderer){let r="";for(let o=0;o<t.length;o++){let i=t[o];if(this.options.extensions?.renderers?.[i.type]){let l=this.options.extensions.renderers[i.type].call({parser:this},i);if(l!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(i.type)){r+=l||"";continue}}let s=i;switch(s.type){case"escape":{r+=n.text(s);break}case"html":{r+=n.html(s);break}case"link":{r+=n.link(s);break}case"image":{r+=n.image(s);break}case"checkbox":{r+=n.checkbox(s);break}case"strong":{r+=n.strong(s);break}case"em":{r+=n.em(s);break}case"codespan":{r+=n.codespan(s);break}case"br":{r+=n.br(s);break}case"del":{r+=n.del(s);break}case"text":{r+=n.text(s);break}default:{let l='Token with "'+s.type+'" type was not found.';if(this.options.silent)return console.error(l),"";throw new Error(l)}}}return r}},Mi,ms=(Mi=class{constructor(e){jt(this,"options");jt(this,"block");this.options=e||Ur}preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}emStrongMask(e){return e}provideLexer(){return this.block?jn.lex:jn.lexInline}provideParser(){return this.block?Fn.parse:Fn.parseInline}},jt(Mi,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens","emStrongMask"])),jt(Mi,"passThroughHooksRespectAsync",new Set(["preprocess","postprocess","processAllTokens"])),Mi),Mb=class{constructor(...e){jt(this,"defaults",wl());jt(this,"options",this.setOptions);jt(this,"parse",this.parseMarkdown(!0));jt(this,"parseInline",this.parseMarkdown(!1));jt(this,"Parser",Fn);jt(this,"Renderer",ji);jt(this,"TextRenderer",Rl);jt(this,"Lexer",jn);jt(this,"Tokenizer",Ni);jt(this,"Hooks",ms);this.use(...e)}walkTokens(e,t){let n=[];for(let r of e)switch(n=n.concat(t.call(this,r)),r.type){case"table":{let o=r;for(let i of o.header)n=n.concat(this.walkTokens(i.tokens,t));for(let i of o.rows)for(let s of i)n=n.concat(this.walkTokens(s.tokens,t));break}case"list":{let o=r;n=n.concat(this.walkTokens(o.items,t));break}default:{let o=r;this.defaults.extensions?.childTokens?.[o.type]?this.defaults.extensions.childTokens[o.type].forEach(i=>{let s=o[i].flat(1/0);n=n.concat(this.walkTokens(s,t))}):o.tokens&&(n=n.concat(this.walkTokens(o.tokens,t)))}}return n}use(...e){let t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(n=>{let r={...n};if(r.async=this.defaults.async||r.async||!1,n.extensions&&(n.extensions.forEach(o=>{if(!o.name)throw new Error("extension name required");if("renderer"in o){let i=t.renderers[o.name];i?t.renderers[o.name]=function(...s){let l=o.renderer.apply(this,s);return l===!1&&(l=i.apply(this,s)),l}:t.renderers[o.name]=o.renderer}if("tokenizer"in o){if(!o.level||o.level!=="block"&&o.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let i=t[o.level];i?i.unshift(o.tokenizer):t[o.level]=[o.tokenizer],o.start&&(o.level==="block"?t.startBlock?t.startBlock.push(o.start):t.startBlock=[o.start]:o.level==="inline"&&(t.startInline?t.startInline.push(o.start):t.startInline=[o.start]))}"childTokens"in o&&o.childTokens&&(t.childTokens[o.name]=o.childTokens)}),r.extensions=t),n.renderer){let o=this.defaults.renderer||new ji(this.defaults);for(let i in n.renderer){if(!(i in o))throw new Error(`renderer '${i}' does not exist`);if(["options","parser"].includes(i))continue;let s=i,l=n.renderer[s],a=o[s];o[s]=(...u)=>{let d=l.apply(o,u);return d===!1&&(d=a.apply(o,u)),d||""}}r.renderer=o}if(n.tokenizer){let o=this.defaults.tokenizer||new Ni(this.defaults);for(let i in n.tokenizer){if(!(i in o))throw new Error(`tokenizer '${i}' does not exist`);if(["options","rules","lexer"].includes(i))continue;let s=i,l=n.tokenizer[s],a=o[s];o[s]=(...u)=>{let d=l.apply(o,u);return d===!1&&(d=a.apply(o,u)),d}}r.tokenizer=o}if(n.hooks){let o=this.defaults.hooks||new ms;for(let i in n.hooks){if(!(i in o))throw new Error(`hook '${i}' does not exist`);if(["options","block"].includes(i))continue;let s=i,l=n.hooks[s],a=o[s];ms.passThroughHooks.has(i)?o[s]=u=>{if(this.defaults.async&&ms.passThroughHooksRespectAsync.has(i))return(async()=>{let p=await l.call(o,u);return a.call(o,p)})();let d=l.call(o,u);return a.call(o,d)}:o[s]=(...u)=>{if(this.defaults.async)return(async()=>{let p=await l.apply(o,u);return p===!1&&(p=await a.apply(o,u)),p})();let d=l.apply(o,u);return d===!1&&(d=a.apply(o,u)),d}}r.hooks=o}if(n.walkTokens){let o=this.defaults.walkTokens,i=n.walkTokens;r.walkTokens=function(s){let l=[];return l.push(i.call(this,s)),o&&(l=l.concat(o.call(this,s))),l}}this.defaults={...this.defaults,...r}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return jn.lex(e,t??this.defaults)}parser(e,t){return Fn.parse(e,t??this.defaults)}parseMarkdown(e){return(t,n)=>{let r={...n},o={...this.defaults,...r},i=this.onError(!!o.silent,!!o.async);if(this.defaults.async===!0&&r.async===!1)return i(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof t>"u"||t===null)return i(new Error("marked(): input parameter is undefined or null"));if(typeof t!="string")return i(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(t)+", string expected"));if(o.hooks&&(o.hooks.options=o,o.hooks.block=e),o.async)return(async()=>{let s=o.hooks?await o.hooks.preprocess(t):t,l=await(o.hooks?await o.hooks.provideLexer():e?jn.lex:jn.lexInline)(s,o),a=o.hooks?await o.hooks.processAllTokens(l):l;o.walkTokens&&await Promise.all(this.walkTokens(a,o.walkTokens));let u=await(o.hooks?await o.hooks.provideParser():e?Fn.parse:Fn.parseInline)(a,o);return o.hooks?await o.hooks.postprocess(u):u})().catch(i);try{o.hooks&&(t=o.hooks.preprocess(t));let s=(o.hooks?o.hooks.provideLexer():e?jn.lex:jn.lexInline)(t,o);o.hooks&&(s=o.hooks.processAllTokens(s)),o.walkTokens&&this.walkTokens(s,o.walkTokens);let l=(o.hooks?o.hooks.provideParser():e?Fn.parse:Fn.parseInline)(s,o);return o.hooks&&(l=o.hooks.postprocess(l)),l}catch(s){return i(s)}}}onError(e,t){return n=>{if(n.message+=`
Please report this to https://github.com/markedjs/marked.`,e){let r="<p>An error occurred:</p><pre>"+ar(n.message+"",!0)+"</pre>";return t?Promise.resolve(r):r}if(t)return Promise.reject(n);throw n}}},Br=new Mb;function Pt(e,t){return Br.parse(e,t)}Pt.options=Pt.setOptions=function(e){return Br.setOptions(e),Pt.defaults=Br.defaults,pp(Pt.defaults),Pt};Pt.getDefaults=wl;Pt.defaults=Ur;Pt.use=function(...e){return Br.use(...e),Pt.defaults=Br.defaults,pp(Pt.defaults),Pt};Pt.walkTokens=function(e,t){return Br.walkTokens(e,t)};Pt.parseInline=Br.parseInline;Pt.Parser=Fn;Pt.parser=Fn.parse;Pt.Renderer=ji;Pt.TextRenderer=Rl;Pt.Lexer=jn;Pt.lexer=jn.lex;Pt.Tokenizer=Ni;Pt.Hooks=ms;Pt.parse=Pt;var _0=Pt.options,m0=Pt.setOptions,g0=Pt.use,h0=Pt.walkTokens,b0=Pt.parseInline;var y0=Fn.parse,v0=jn.lex;function vr(e){let t=Pt.parse(e),n=op.sanitize(t);return sp(n)}function lr(e,t){return c`<div class="prompt-block">
    <div class="prompt-block__label">${e}</div>
    <pre class="prompt-block__body">${t}</pre>
  </div>`}function $o(e){return e.loading?c`<div class="prompt-block__status">불러오는 중…</div>`:e.error?c`<div class="prompt-block__status prompt-block__status--error">
      프롬프트를 불러오지 못했습니다
    </div>`:""}function Ui(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),n=r=>String(r).padStart(2,"0");return`${t.getFullYear()}-${n(t.getMonth()+1)}-${n(t.getDate())} ${n(t.getHours())}:${n(t.getMinutes())}`}var xp={Read:"\u{1F4D6}",Edit:"\u270E",MultiEdit:"\u270E",Write:"\u{1F4DD}",Bash:"\u26A1",Grep:"\u{1F50E}",Glob:"\u{1F50E}",Task:"\u{1F916}",Agent:"\u{1F916}",WebFetch:"\u{1F310}",WebSearch:"\u{1F310}"},qb={command_execution:"\uBA85\uB839 \uC2E4\uD589",file_change:"\uD30C\uC77C \uBCC0\uACBD",mcp_call:"MCP \uD638\uCD9C",web_search:"\uC6F9 \uAC80\uC0C9",plan:"\uACC4\uD68D"},Nb=/^\s*([✓✗⊘])\s*(spec|impl|implementation|plan)\s*게이트\s*[—–-]\s*(\S+)\s+(APPROVE|REVISE|REJECT|BLOCK|SKIP)(?:\s*·\s*(.+))?/,jb=/^\s*#{0,3}\s*Phase\s+\d+(?:\s*\/\s*\d+)?\s*(?:[·:—–-]\s*.+)?$/;function Bn(e){return!!e&&typeof e=="object"}function Ol(e){return typeof e!="string"||e.length===0?[]:e.split(/\r?\n/)}function Il(e,t){let n=Ol(e),r=Ol(t),o=new Map;for(let l of n)o.set(l,(o.get(l)||0)+1);let i=0;for(let l of r){let a=o.get(l)||0;a>0?o.set(l,a-1):i+=1}let s=0;for(let l of o.values())s+=l;return{added:i,removed:s}}function Ap(e){let t="";typeof e=="string"?t=e:Array.isArray(e)?t=e.map(o=>Bn(o)&&typeof o.text=="string"?o.text:"").join(""):Bn(e)&&typeof e.text=="string"&&(t=e.text);let r=(String(t).split(/\r?\n/).find(o=>o.trim().length>0)||"").trim();return r.length>120?`${r.slice(0,117)}\u2026`:r}function Fb(e){let t=String(e.name||""),n=e.input||{},r={kind:"tool",tool:t,icon:xp[t]||"\u{1F527}",input:n,expandable:!0};if((t==="Read"||t==="Write")&&(r.path=String(n.file_path||n.path||"")),t==="Write"&&(r.added=Ol(n.content).length),t==="Edit"){r.path=String(n.file_path||n.path||"");let{added:o,removed:i}=Il(n.old_string,n.new_string);r.added=o,r.removed=i}if(t==="MultiEdit"){r.path=String(n.file_path||n.path||"");let o=0,i=0,s=Array.isArray(n.edits)?n.edits:[];for(let l of s){let a=Il(Bn(l)?l.old_string:"",Bn(l)?l.new_string:"");o+=a.added,i+=a.removed}r.added=o,r.removed=i}return t==="Bash"&&(r.command=String(n.command||"")),(t==="Grep"||t==="Glob")&&(r.command=String(n.pattern||n.query||"")),t==="Agent"&&(typeof e.id=="string"&&e.id.length>0&&(r.launch_id=e.id),typeof n.description=="string"&&(r.command=n.description)),r}function Ll(e){return typeof e!="string"||e.trim().length===0?null:{kind:"thinking",text:e}}var Bb=/<system-reminder>[\s\S]*?<\/system-reminder>/g;function Sp(e){let t;if(typeof e=="string")t=e;else if(Array.isArray(e))t=e.filter(r=>Bn(r)&&r.type==="text"&&typeof r.text=="string").map(r=>String(r.text)).join(`
`);else return null;let n=t.replace(Bb,"").trim();return n.length>0?{kind:"user",text:n}:null}function Pl(e){let t=e.split(/\r?\n/).find(r=>r.trim().length>0)||"",n=Nb.exec(t);return n?{kind:"gate",gate:n[2]==="implementation"?"impl":n[2],reviewer:n[3],verdict:n[4],time:n[5]?n[5].trim():void 0,text:t.trim()}:jb.test(t)&&t.trim().length<=80?{kind:"phase",text:t.trim()}:{kind:"assistant",text:e}}function Ub(e,t){if(e.subtype==="init"){let n=typeof e.model=="string"?e.model:"";return t.progress=null,[{kind:"thinking",text:n?`\uC138\uC158 \uC2DC\uC791 \xB7 ${n}`:"\uC138\uC158 \uC2DC\uC791"}]}if(e.subtype==="thinking_tokens"){let r=`\uC0DD\uAC01 \uC911\u2026 ${typeof e.estimated_tokens=="number"&&Number.isFinite(e.estimated_tokens)?Math.max(0,Math.round(e.estimated_tokens)):0} \uD1A0\uD070`;return t.progress?(t.progress.text=r,[]):(t.progress={kind:"thinking",text:r},[t.progress])}return[]}function Wb(e,t){let n=typeof e.parent_tool_use_id=="string"&&e.parent_tool_use_id.length>0?e.parent_tool_use_id:null;if(e.type==="assistant"){let r=e.message,o=r&&Array.isArray(r.content)?r.content:[],i=[];for(let s of o)if(Bn(s)){if(s.type==="text"&&typeof s.text=="string")i.push(Pl(s.text));else if(s.type==="thinking"){let l=Ll(s.thinking);l&&i.push(l)}else if(s.type==="tool_use"){let l=Fb(s);typeof s.id=="string"&&t.set(s.id,l),i.push(l)}}return n?$p(i,n):i}if(e.type==="user"){let r=e.message,o=r&&Array.isArray(r.content)?r.content:[];for(let s of o)if(Bn(s)&&s.type==="tool_result"){let l=t.get(String(s.tool_use_id));if(l){let a=Ap(s.content);l.result=a,l.output=typeof s.content=="string"?s.content:a,s.is_error===!0&&(l.is_error=!0)}}let i=Sp(r&&r.content);return i?[i]:[]}if(e.type==="result"){let r=e.is_error===!1&&e.subtype==="success",o={kind:"result",success:r,text:typeof e.result=="string"?e.result:r?"DONE":""};return n?$p([o],n):[o]}return[]}function $p(e,t){for(let n of e)n.parent_tool_use_id=t;return e}function zb(e){let t=typeof e.command=="string"?e.command:"",n=Ap(e.aggregated_output===void 0?e.output:e.aggregated_output),o=[typeof e.exit_code=="number"&&Number.isFinite(e.exit_code)?`exit ${e.exit_code}`:typeof e.status=="string"&&e.status.length>0?e.status:"",n].filter(s=>s.length>0).join(" \xB7 "),i={kind:"tool",tool:"shell",icon:xp.Bash,command:t,input:{command:t},expandable:!0};return o.length>0&&(i.result=o),typeof e.aggregated_output=="string"&&(i.output=e.aggregated_output),i}function Hb(e){if(e.type==="item.completed"&&Bn(e.item)){let t=e.item;if(t.type==="agent_message"&&typeof t.text=="string")return[Pl(t.text)];if(t.type==="user_message"){let n=Sp(t.text);return n?[n]:[]}if(t.type==="reasoning"){let n=Ll(t.text);return n?[n]:[]}return t.type==="error"?[{kind:"error",text:String(t.message||"")}]:t.type==="command_execution"?[zb(t)]:[]}if(e.type==="turn.completed")return[{kind:"result",success:!0,text:"DONE"}];if(e.type==="turn.failed"){let t=e.error;return[{kind:"error",text:t&&typeof t.message=="string"?t.message:"turn failed"}]}return e.type==="error"?[{kind:"error",text:String(e.message||"")}]:[]}function Kb(e){if(e.schema!=="codex-delegation-monitor-v1"||!Bn(e.event))return[];let t=e.event;if(t.type==="session.started"||t.type==="turn.started")return[];if((t.type==="item.started"||t.type==="item.completed")&&Bn(t.item)){let n=t.item;if(typeof n.id!="string"||n.id.length===0)return[];if(t.type==="item.completed"&&n.kind==="agent_message"&&typeof n.text=="string"&&n.text.trim().length>0)return[Pl(n.text)];if(t.type==="item.completed"&&n.kind==="reasoning"){let s=Ll(n.text);return s?[s]:[]}if(t.type!=="item.completed"||n.kind!=="activity"||typeof n.activity!="string")return[];let r=qb[n.activity];if(!r)return[];let o,i;if(n.status==="completed")o="\uC644\uB8CC",i="\u2713";else if(n.status==="failed")o="\uC2E4\uD328",i="\u2717";else return[];return[{kind:"tool",tool:`${r} \xB7 ${o}`,icon:i,expandable:!1,result:""}]}return t.type==="turn.completed"&&t.status==="completed"?[{kind:"result",success:!0,text:"DONE"}]:t.type==="turn.failed"&&(t.status==="failed"||t.status==="interrupted")&&typeof t.error_code=="string"&&t.error_code.length>0?[{kind:"error",text:t.error_code}]:[]}function Gb(e){let t=e.type;return typeof t=="string"&&(t==="error"||t.startsWith("thread.")||t.startsWith("turn.")||t.startsWith("item."))}function Yb(e){let t=e;if(typeof e=="string"){let n=e.trim();if(n.length===0)return null;try{t=JSON.parse(n)}catch{return null}}return Bn(t)?t:null}function Ep(e={}){let t=e.skip_delegated===!0,n=new Map,r={progress:null};return{push(o){let i=Yb(o);if(!i)return[];if(t&&typeof i.parent_tool_use_id=="string"&&i.parent_tool_use_id.length>0)return[];if(i.type==="system"&&i.schema!=="codex-delegation-monitor-v1")return Ub(i,r);let s=i.schema==="codex-delegation-monitor-v1"?Kb(i):Gb(i)?Hb(i):Wb(i,n);return s.length>0&&(r.progress=null),s}}}function Dl(e){let t=[],n=Ep(),r=Array.isArray(e)?e:[];for(let o of r)for(let i of n.push(o))t.push(i);return t}var Vb=5,Qb=10,Xb=/Task\s+#(\d+)/,Zb=/\bgh\s+pr\s+create\b|\bgit\s+push\b/,Jb=/\bnpm\s+(?:run\s+)?(?:test|tsc|lint|build)\b|\bvitest\b/;function bs(e){return typeof e!="string"?"":(e.split(/\r?\n/).find(t=>t.trim().length>0)||"").trim()}function ey(e){return typeof e!="string"||e.length===0?0:e.split(/\r?\n/).length}function ty(e){for(let t=e.length-1;t>=0;t-=1){let n=e[t];if(n.kind==="phase"||n.kind==="gate")return n.text||null}return null}function ny(e){let t=new Map,n=0;for(let o of e){if(o.kind!=="tool")continue;n+=1;let i=o.input||{};if(o.tool==="TaskCreate"){let a=Xb.exec(o.output||o.result||""),u=String(i.activeForm||i.subject||"").trim();if(!a||u.length===0)continue;t.set(a[1],{label:u,active:i.status==="in_progress"?n:0});continue}if(o.tool!=="TaskUpdate")continue;let s=t.get(String(i.taskId??""));if(!s)continue;let l=i.activeForm||i.subject;typeof l=="string"&&l.trim().length>0&&(s.label=l.trim()),typeof i.status=="string"&&(s.active=i.status==="in_progress"?n:0)}let r=null;for(let o of t.values())o.active>0&&(!r||o.active>r.active)&&(r=o);return r?r.label:null}function ry(e){if(e.tool==="Bash"){let t=e.command||"";return Zb.test(t)?"~ PR/\uAC8C\uC2DC \uC911":Jb.test(t)?"~ \uAC80\uC99D \uC911":null}return e.tool==="Edit"||e.tool==="Write"||e.tool==="MultiEdit"?"~ \uAD6C\uD604 \uC911":e.tool==="Read"||e.tool==="Grep"||e.tool==="Glob"?"~ \uD0D0\uC0C9 \uC911":null}function oy(e){let t=e.filter(o=>o.kind==="tool").slice(-Qb),n=new Map;t.forEach((o,i)=>{let s=ry(o);if(!s)return;let l=n.get(s)||{count:0,last:-1};l.count+=1,l.last=i,n.set(s,l)});let r=null;for(let[o,i]of n)(!r||i.count>r.count||i.count===r.count&&i.last>r.last)&&(r={label:o,count:i.count,last:i.last});return r?r.label:null}function sy(e){let t=ty(e);if(t)return{text:t,guess:!1};let n=ny(e);if(n)return{text:n,guess:!1};let r=oy(e);return r?{text:r,guess:!0}:null}function iy(e,t){if(typeof e!="number")return"";let n=Math.max(0,Math.floor((t-e)/1e3));return n<60?`${n}\uCD08 \uC804`:_n(e,t)}function xo(e,t={}){let{transport:n,sessionLogStore:r,onClose:o}=t,i=null,s=null,l=null,a=null,u=null,d=!1,p={},_=!0,m=new Set,y=new Set,C=null,O=null,V=!1,te=!1,W=!1,q=null,I=null;function P(){V=!1,te=!1,W=!1,q=null,I=null}async function U(ee){if(n){te=!0,W=!1,Ie();try{let Q=await Promise.resolve(n("get-attempt-prompt",{attempt_id:ee,...u?{root_dir:u}:{}}));if(i!==ee)return;!Q||typeof Q!="object"||Array.isArray(Q)?W=!0:(q=Q,I=ee)}catch{i===ee&&(W=!0)}finally{i===ee&&(te=!1,Ie())}}}function Y(){if(V=!V,V&&i&&I!==i){U(i);return}Ie()}function N(){if(!V)return"";let ee=$o({loading:te,error:W});if(ee)return c`<div class="sv__prompt" data-seam="attempt-prompt">
        ${ee}
      </div>`;if(!q)return"";if(q.missing)return c`<div class="sv__prompt" data-seam="attempt-prompt">
        <div class="prompt-block__status">
          기록 없음 — 프롬프트 기록 이전에 실행된 attempt입니다
        </div>
      </div>`;let Q=Ui(q.recorded_at);return c`<div class="sv__prompt" data-seam="attempt-prompt">
      ${Q?c`<div class="prompt-block__meta">${Q} 발송</div>`:""}
      ${typeof q.task_prompt=="string"?lr("\uACFC\uC5C5 (user)",q.task_prompt):""}
      ${typeof q.system_prompt=="string"?lr("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",q.system_prompt):""}
    </div>`}function j(){if(!a||!r)return[];let ee=r.get(a);return Dl(ee?ee.lines:[])}function z(){if(!a||!r)return null;let ee=r.get(a),Q=ee?ee.last_event_at:null;return typeof Q=="number"?Q:null}function K(){return p.status==="running"}function oe(){if(K()&&i){O||(O=setInterval(()=>Ie(),1e3));return}ve()}function ve(){O&&(clearInterval(O),O=null)}function Ne(ee){let Q=[],xe=0;for(;xe<ee.length;){let{idx:_t,line:pt}=ee[xe];if(pt.kind==="tool"){let Ke=xe;for(;Ke<ee.length&&ee[Ke].line.kind==="tool"&&ee[Ke].line.tool===pt.tool;)Ke+=1;if(Ke-xe>=Vb&&!y.has(_t)){Q.push({kind:"group",idx:_t,tool:pt.tool||"",lines:ee.slice(xe,Ke)}),xe=Ke;continue}}Q.push({kind:"line",idx:_t,line:pt}),xe+=1}return Q}function F(ee){let Q=[],xe=new Map;for(let Ke=0;Ke<ee.length;Ke+=1){let et=ee[Ke],x=et.parent_tool_use_id;if(typeof x=="string"&&x.length>0){let Z=xe.get(x);Z||(Z={kind:"subagent",idx:Ke,launch_id:x,agent_type:null,header:null,lines:[]},xe.set(x,Z),Q.push(Z)),Z.lines.push({idx:Ke,line:et});continue}if(et.kind==="tool"&&et.tool==="Agent"&&typeof et.launch_id=="string"&&et.launch_id.length>0){let Z=X(et),Le=xe.get(et.launch_id);if(Le){Le.header={idx:Ke,line:et},Le.agent_type=Z;continue}let Ye={kind:"subagent",idx:Ke,launch_id:et.launch_id,agent_type:Z,header:{idx:Ke,line:et},lines:[]};xe.set(et.launch_id,Ye),Q.push(Ye);continue}Q.push({kind:"entry",idx:Ke,line:et})}let _t=[],pt=0;for(;pt<Q.length;){if(Q[pt].kind!=="entry"){_t.push(Q[pt]),pt+=1;continue}let Ke=pt;for(;Ke<Q.length&&Q[Ke].kind==="entry";)Ke+=1;_t.push(...Ne(Q.slice(pt,Ke))),pt=Ke}return _t}function X(ee){let Q=ee.input;return Q&&typeof Q.subagent_type=="string"?Q.subagent_type:null}function Ae(ee){for(let Q=ee.length-1;Q>=0;Q-=1){let xe=ee[Q];if(xe.kind==="result"||xe.kind==="error")return null;if(xe.kind==="tool"&&!Object.hasOwn(xe,"result"))return xe}return null}function Ee(ee){for(let Q=ee.length-1;Q>=0;Q-=1)if(ee[Q].kind==="thinking")return ee[Q];return null}function R(ee,Q){if(Q.kind==="gate")return c`<div class="sv__gate">${Q.text}</div>`;if(Q.kind==="phase")return c`<div class="sv__phase">${Q.text}</div>`;if(Q.kind==="result")return c`<div
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
        @click=${()=>ut(ee)}
      >
        <span class="sv__think-line">💭 ${bs(Q.text)}</span>
        ${xe?c`<pre class="sv__think-expand">${Q.text}</pre>`:""}
      </div>`}if(Q.kind==="user"){let xe=m.has(ee);return c`<div
        class="sv__line sv__line--user${xe?" sv__line--expanded":""}"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>ut(ee)}
      >
        <span class="sv__user-line">▷ ${bs(Q.text)}</span>
        ${xe?c`<pre class="sv__user-expand">${Q.text}</pre>`:""}
      </div>`}if(Q.kind==="error")return c`<div class="sv__error">⛔ ${Q.text}</div>`;if(Q.kind==="blocker")return c`<div class="sv__error">⛔ ${Q.text}</div>`;if(Q.kind==="tool"){let xe=m.has(ee),_t=Q.tool==="Bash"?ey(Q.command):0,pt=Q.tool==="Bash"?_t>1?bs(Q.command):Q.command:Q.path||Q.command||"";return c`<div
        class="sv__tool${xe?" sv__tool--expanded":""}"
        role="button"
        tabindex="0"
        @click=${()=>ut(ee)}
      >
        <span class="sv__tool-line">
          <span class="sv__tool-icon">${Q.icon}</span>
          <span class="sv__tool-name">${Q.tool}</span>
          ${pt?c`<span class="sv__tool-detail">${pt}</span>`:""}
          ${_t>1?c`<span class="sv__tool-more">⋯ ${_t}줄</span>`:""}
          ${typeof Q.added=="number"?c`<span class="sv__diff-add">+${Q.added}</span>`:""}
          ${typeof Q.removed=="number"?c`<span class="sv__diff-del">−${Q.removed}</span>`:""}
          ${Q.result?c`<span class="sv__tool-ok">→ ${Q.result}</span>`:""}
        </span>
        ${xe?c`<pre class="sv__tool-expand">${se(Q)}</pre>`:""}
      </div>`}return c`<div class="sv__as">${vr(Q.text||"")}</div>`}function se(ee){let Q=[];if(ee.tool==="Bash"&&typeof ee.command=="string"&&ee.command.length>0)Q.push(ee.command);else if(ee.input!==void 0)try{Q.push(`input: ${JSON.stringify(ee.input,null,2)}`)}catch{}return typeof ee.output=="string"&&ee.output.length>0&&Q.push(`output:
${ee.output}`),Q.join(`

`)}function ye(){if(!i)return c``;let ee=j(),Q=(s?[p.agent_type,p.model,p.effort]:[p.runner,p.model,p.effort]).filter(Boolean).join(" \xB7 "),xe=p.session_id||"",_t=`\uB77C\uC774\uBE0C \uB530\uB77C\uAC00\uAE30 ${_?"ON":"OFF"}`,pt=K(),Ke=pt?iy(z(),Date.now()):"",et=pt?Ae(ee):null,x=pt?Ee(ee):null,Z=sy(ee);return c`<div class="sv" data-attempt-id=${i}>
      <div class="sv__bar">
        <span class="sv__id"
          >${p.label||(s?p.role||"":i)}</span
        >
        ${Z?c`<span
              class="sv__stage${Z.guess?" sv__stage--guess":""}"
              title=${Z.text}
              >${Z.text}</span
            >`:""}
        ${pt?c`<span
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
          aria-label=${_t}
          @click=${G}
        >
          <span class="sv__follow-full">⇣ ${_t}</span>
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
      ${s||d?"":N()}
      <div class="sv__body">
        ${ee.length===0?c`<div class="sv__empty">세션 로그 없음</div>`:F(ee).map(Le=>Le.kind==="subagent"?Me(Le):Le.kind==="group"?ke(Le):R(Le.idx,Le.line))}
      </div>
      ${et||x?c`<div class="sv__now">
            <span class="sv__now-label">지금</span>
            ${et?c`<span class="sv__now-icon">${et.icon}</span>
                  <span class="sv__now-name">${et.tool}</span>
                  <span class="sv__now-detail"
                    >${et.tool==="Bash"?bs(et.command):et.path||et.command||""}</span
                  >`:""}
            ${x?c`<span class="sv__now-think"
                  >💭 ${bs(x.text)}</span
                >`:""}
          </div>`:""}
    </div>`}function ke(ee){return c`<div
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
    </div>`}function Me(ee){let Q=y.has(ee.idx),xe=ee.header?ee.header.line:null,_t=xe?xe.is_error===!0?"\u2717":typeof xe.result=="string"?"\u2713":"\u27F3":"",pt=xe&&xe.command?xe.command:"";return c`<div class="sv__sub${Q?" sv__sub--open":""}">
      <div
        class="sv__sub-head"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>he(ee.idx)}
      >
        <span class="sv__sub-icon" aria-hidden="true">🤖</span>
        <span class="sv__sub-name">${ee.agent_type||"subagent"}</span>
        ${pt?c`<span class="sv__sub-detail">${pt}</span>`:""}
        <span class="sv__sub-count">${ee.lines.length}줄</span>
        ${_t?c`<span class="sv__sub-state">${_t}</span>`:""}
        ${Q?"":c`<span class="sv__sub-caret" aria-hidden="true">▸</span>`}
      </div>
      ${Q?c`<div class="sv__sub-body">
            ${Ne(ee.lines).map(Ke=>Ke.kind==="group"?ke(Ke):R(Ke.idx,Ke.line))}
          </div>`:""}
    </div>`}function he(ee){y.add(ee),Ie()}function Ie(){dt(ye(),e),oe(),_&&Ze()}function Ze(){let ee=e.querySelector(".sv__body");ee&&(ee.scrollTop=ee.scrollHeight)}function ut(ee){m.has(ee)?m.delete(ee):m.add(ee),Ie()}function G(){_=!_,Ie()}function J(ee){mn(ee).then(Q=>{Q?ge("\uBCF5\uC0AC\uB428","success",1200):ge("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function re(ee){!i||!ee||(p={...p,...ee},Ie())}function pe(ee){let Q=ee.target;if(!Q||!Q.classList||!Q.classList.contains("sv__body"))return;!(Q.scrollHeight-Q.scrollTop-Q.clientHeight<=4)&&_&&(_=!1,Ie())}e.addEventListener("scroll",pe,!0);function Se(ee){let Q=ee.target;!Q||typeof Q.closest!="function"||e.contains(Q)||Q.closest("dialog")||Q.closest(".md-viewer-root")||He()}let me=!1;function je(){me||(document.addEventListener("mousedown",Se),me=!0)}function Be(){me&&(document.removeEventListener("mousedown",Se),me=!1)}function Qe(ee){let Q=ee&&ee.attempt_id;if(!Q)return;let xe=typeof ee.launch_id=="string"&&ee.launch_id.length>0?ee.launch_id:null,_t=ee.session_ref&&typeof ee.session_ref=="object"?ee.session_ref:null;if(xe&&_t)return;let pt=a;i=Q,s=xe,l=_t,a=s?`session-log:${i}:${s}`:`session-log:${i}`,n&&pt&&pt!==a&&Promise.resolve(n("unsubscribe-session-log",{id:pt})).catch(()=>{}),u=typeof ee.root_dir=="string"&&ee.root_dir.length>0?ee.root_dir:null,p=ee.meta||{},d=ee.hide_prompt===!0,_=!0,m.clear(),y.clear(),P(),!C&&r&&(C=r.subscribe(Ie)),n&&Promise.resolve(n("subscribe-session-log",{id:a,attempt_id:i,...s?{launch_id:s}:{},...l?{session_ref:l}:{},...u?{root_dir:u}:{}})).catch(()=>{}),je(),Ie()}function He(){let ee=a;Be(),i=null,s=null,l=null,a=null,u=null,d=!1,m.clear(),y.clear(),P(),ve(),n&&ee&&Promise.resolve(n("unsubscribe-session-log",{id:ee})).catch(()=>{}),dt(c``,e),o&&o()}return{open:Qe,updateMeta:re,close:He,isOpen(){return i!==null},destroy(){ve(),Be(),C&&(C(),C=null),e.removeEventListener("scroll",pe,!0),i=null,s=null,l=null,a=null,u=null,d=!1,dt(c``,e)}}}function ay(e){let t=[],n=e?.workflow?.stages,r=n?.spec?.doc;r&&t.push({kind:"spec",path:r.path,missing_state:r.missing_state});let o=n?.plan?.doc;return o&&t.push({kind:"plan",path:o.path,missing_state:o.missing_state}),t}function Tp(e,t){let n=ay(e);return c`
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
  `}var ly="## \u{1F916} \uC791\uC5C5 \uBCF4\uACE0\uC11C",cy=/^> (worker · attempt|session · sid) ([A-Za-z0-9._-]{1,64}) · (\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z)$/,uy=/^\*\*결론\*\* — (.+)$/;function Wi(e){if(typeof e!="string"||e.length===0)return null;let t=e.split(/\r?\n/);if(t[0]!==ly)return null;let n=cy.exec(t[1]||"");if(!n)return null;let r=n[1].split(" ")[0],o=n[2],i=n[3],s=2;for(;s<t.length&&t[s].trim().length===0;)s+=1;let l=s<t.length?uy.exec(t[s]):null,a=l?l[1].replace(/\s+/g," ").trim():"",u=l?s+1:s;return{lane:r,identifier:o,timestamp:i,conclusion:a,body:t.slice(u).join(`
`).trim()}}var Cp=20;function Rp(e){if(e==null||e==="")return"";let t=new Date(e);if(Number.isNaN(t.getTime()))return"";let n=String(t.getMonth()+1).padStart(2,"0"),r=String(t.getDate()).padStart(2,"0"),o=String(t.getHours()).padStart(2,"0"),i=String(t.getMinutes()).padStart(2,"0");return`${n}-${r} ${o}:${i}`}function dy(e){return e.length>Cp?`${e.slice(0,Cp)}\u2026`:e}function py(e,t,n,r){let o=`${t.lane} ${dy(t.identifier)}`;return c`<div class="detail-report">
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
        <span class="detail-report__time">${Rp(t.timestamp)}</span>
      </span>
      <span class="detail-report__concl">${t.conclusion}</span>
    </button>
    ${r&&t.body.length>0?c`<div class="detail-report__body">
          ${vr(t.body)}
        </div>`:""}
  </div>`}function fy(e){return c`<div class="detail-comment" data-comment-id=${e.id}>
    <div class="detail-comment__meta">
      <span class="detail-comment__author"
        >${e.author||"(\uC791\uC131\uC790 \uC5C6\uC74C)"}</span
      >
      <span class="detail-comment__time"
        >${Rp(e.created_at)}</span
      >
    </div>
    <div class="detail-comment__body">
      ${vr(typeof e.text=="string"?e.text:"")}
    </div>
  </div>`}function Op(e,t={},n={}){let r=Array.isArray(e)?e.filter(Boolean):[],o=n.expanded||new Set,i=typeof n.draft=="string"?n.draft:"",s=n.sending===!0,l=r.slice().sort((a,u)=>String(u.created_at||"").localeCompare(String(a.created_at||"")));return c`
    <div class="detail-section-label">댓글 (${r.length})</div>
    ${n.error?c`<div class="detail-empty" data-seam="comments-error">
          댓글을 불러오지 못했습니다
        </div>`:l.length===0?c`<div class="detail-empty" data-seam="comments">댓글 없음</div>`:c`<div class="detail-comments" data-seam="comments">
            ${l.map(a=>{let u=Wi(typeof a.text=="string"?a.text:"");return u?py(a,u,t,o.has(a.id)):fy(a)})}
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
  `}var{I:J0}=dc;var Ip=e=>e.strings===void 0;var _y={},Lp=(e,t=_y)=>e._$AH=t;var kr=Pi(class extends wo{constructor(e){if(super(e),e.type!==ir.PROPERTY&&e.type!==ir.ATTRIBUTE&&e.type!==ir.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!Ip(e))throw Error("`live` bindings can only contain a single expression")}render(e){return e}update(e,[t]){if(t===Cn||t===Kt)return t;let n=e.element,r=e.name;if(e.type===ir.PROPERTY){if(t===n[r])return Cn}else if(e.type===ir.BOOLEAN_ATTRIBUTE){if(!!t===n.hasAttribute(r))return Cn}else if(e.type===ir.ATTRIBUTE&&n.getAttribute(r)===t+"")return Cn;return Lp(e),t}});var my=[{id:"spec",label:"spec \uB9AC\uBDF0",receipt:"spec_review",receipt_stage:null,fill_stage:"spec",stale_stage:"spec",hue:"spec"},{id:"plan",label:"\uACC4\uD68D \uB9AC\uBDF0",receipt:null,receipt_stage:"plan",fill_stage:"plan",stale_stage:"plan",hue:"plan"},{id:"impl",label:"\uAD6C\uD604",receipt:null,receipt_stage:null,fill_stage:"impl",stale_stage:null,hue:"impl"},{id:"impl_review",label:"impl \uB9AC\uBDF0",receipt:"impl_review",receipt_stage:null,fill_stage:null,stale_stage:"impl",hue:"impl"},{id:"pr",label:"PR",receipt:null,receipt_stage:null,fill_stage:"pr",stale_stage:null,hue:"pr"}],Ml={quick_fix:["impl","impl_review"],spec_backed:["spec","impl","impl_review","pr"],full_plan:["spec","plan","impl","impl_review","pr"]},Pp={missing:"\uC2B9\uC778 \uD544\uC694",stale:"\uC7AC\uC2B9\uC778 \uD544\uC694",unknown:"\uC2B9\uC778 \uD655\uC778 \uBD88\uAC00"},gy={pin:"pin",global:"global",base:"base"};function hy(e){return c`<span
    class=${`detail-layer-rail detail-layer-rail--${gy[e]}`}
    data-source=${e}
    aria-hidden="true"
    ><i></i><i></i><i></i
  ></span>`}function by(e,t,n){switch(e){case"workflow_mode":return No;case"spec_review_model":case"impl_review_model":return jo;case"plan_review_model":return Zs;case"spec_review_effort":case"plan_review_effort":case"impl_review_effort":return Js;case"spec_review_speed":case"plan_review_speed":case"impl_review_speed":return Yn;case"impl_dispatch":return qo;case"impl_runtime":return Xs;case"impl_model":return _o(n,t.impl_runtime);case"impl_effort":return Dr(n,t.impl_runtime,t.impl_model);case"impl_speed":case"orchestration_speed":return Yn;case"orchestration_model":return mo(n,null);case"orchestration_effort":return Dr(n,void 0,t.orchestration_model||xn).filter(r=>r!==xn);default:return[]}}function yy(e,t){return c`<div class="detail-effective__row" data-key=${e.key}>
    ${hy(e.source)}
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
      >${ti[e.source]}</span
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
  </div>`}function Dp(e,t){let n=qa.flatMap(a=>a.keys),r=Na(n,e.metadata,e.workspace_values,e.execution_defaults,e.catalog,e.controller_runtime||null),o=Iu(n,e.metadata,e.workspace_values,e.execution_defaults,e.catalog,e.controller_runtime||null),i=Object.fromEntries(r.map(a=>[a.key,a])),s=Object.fromEntries(r.filter(a=>a.value!==null).map(a=>[a.key,a.value])),l=r.filter(a=>a.full_value&&a.display!==a.full_value).map(a=>a.full_value).join(" \xB7 ");return c`<details
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
        >${vy(i)}</span
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
          ${qa.map(a=>c`
              <div class="detail-effective__subhead">${a.label}</div>
              ${r.filter(u=>a.keys.includes(u.key)).map(u=>{let d=Gs({key:u.key,choices:by(u.key,s,e.catalog),layer:"pin",pin:e.metadata,global:e.workspace_values,execution_defaults:e.execution_defaults,runner_catalog:e.catalog,route:typeof e.metadata?.route=="string"?e.metadata.route:null,controller_runtime:e.controller_runtime||null});return yy(u,{expanded:e.expanded,options:d.options,default_label:d.unset_label,default_full_value:d.full_value,onEdit:t.onEdit})})}
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
  </details>`}function vy(e){let t=[];if(e.workflow_mode&&t.push(e.workflow_mode.display),e.impl_dispatch?.value==="main")t.push("\uBA54\uC778");else if(e.impl_dispatch?.value==="delegated"){let n=e.impl_runtime?` ${e.impl_runtime.display}`:"";t.push(`\uC704\uC784${n}`)}for(let n of["impl_model","impl_effort","impl_speed"])e[n]?.resolution!=="not_applicable"&&t.push(e[n]?.display||"\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00");return t.join(" \xB7 ")}function ky(e){if(!e||typeof e!="object")return null;let{kind:t,actor:n,effort:r,sha:o}=e;return typeof t!="string"||typeof n!="string"||typeof o!="string"?null:{kind:t,actor:n,effort:typeof r=="string"?r:null,sha:o}}function Mp(e,t={}){let n=e&&typeof e.metadata=="object"&&e.metadata?e.metadata:{},r=e&&typeof e.workflow=="object"&&e.workflow?e.workflow:{},o=r.stages||{},i=r.route||n.route||null,s=typeof n.pr_url=="string"?n.pr_url:"",l=typeof n.exec_receipt=="string"?n.exec_receipt:"",a=ky(r.exec_receipt),u=a?er(a):l,d=a?`${a.kind}:${a.actor}`:l.split("@")[0],p=zs(r.planned_execution,r.exec_receipt),_=r.chips?.pr?.number,m=typeof _=="number"?`PR #${_}`:"PR",y=Bo(n),C=y!==null&&t.isChipOpen?.("rec")===!0,O=C?Va({rec:y},"rec"):null;return c`<section class="detail-summary" data-seam="detail-summary">
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
            title=${oi(y)}
            @click=${()=>t.onChipToggle?.("rec")}
          >
            ${"\uBCF5\uC7A1"}
          </button>`:""}
    </div>
    ${O?uo(O):""}
    <div
      class="detail-summary__gates"
      role="group"
      aria-label="워크플로 게이트"
    >
      ${wy(i).map(V=>$y(V,n,o,{label:V.id==="pr"?m:V.label,href:V.id==="pr"?s:""}))}
    </div>
  </section>`}function wy(e){let n=typeof e=="string"&&Object.hasOwn(Ml,e)&&Ml[e]||Ml.spec_backed;return my.filter(r=>n.includes(r.id))}var zi={on:"\uD1B5\uACFC",stale:"\uC7AC\uAC80\uD1A0 \uD544\uC694",current:"\uC9C4\uD589 \uC911",none:"\uBBF8\uB3C4\uB2EC"};function $y(e,t,n,r){let o=xy(e,t,n),i=e.fill_stage?n[e.fill_stage]:null,s=typeof i?.fill=="string"?i.fill:null,l=s?s==="full":o.length>0,a=!l&&s==="dim",u=e.stale_stage?n[e.stale_stage]?.stale===!0:!1,d=o&&o.split("@")[1]?.slice(0,7)||"",p=u?zi.stale:l?zi.on:a?zi.current:zi.none,_=Ay(e,n),m=`${r.label} \xB7 ${p}${_?` \xB7 ${_}`:""}${o?` \xB7 ${o}`:""}`,y=`detail-summary__gate${l?" detail-summary__gate--on":""}${a?" detail-summary__gate--current":""}${u?" detail-summary__gate--stale":""}${d?" detail-summary__gate--receipt":""}`,C=c`<span class="detail-summary__gate-label"
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
  >`}function xy(e,t,n){if(e.receipt&&typeof t[e.receipt]=="string")return String(t[e.receipt]);if(e.receipt_stage){let r=n[e.receipt_stage]?.receipt;return typeof r=="string"?r:""}return""}function Ay(e,t){if(e.id!=="plan")return"";let n=t.plan?.approval_state;return typeof n=="string"&&Object.hasOwn(Pp,n)?Pp[n]:""}function Hi(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function qp(e){return Hi(e)&&typeof e.key=="string"&&e.key.length>0&&typeof e.email=="string"&&e.email.length>0}function Np(e,t){let n=e&&e[t];if(!Hi(n)||!Array.isArray(n.accounts))return null;let r=n.accounts.filter(qp),o=qp(n.active)?n.active:null;return{accounts:r,active:o||r.find(i=>i.active===!0)||null}}function Bp(e){return typeof e.alias=="string"&&e.alias.length>0?` (${e.alias})`:""}function Ki(e){let t=typeof e.status=="string"&&e.status!=="ok"?` \xB7 ${e.status}`:"";return`${e.email}${Bp(e)}${t}`}function Ao(e){let t=typeof e.plan=="string"&&e.plan.length>0?e.plan:"plan \uD655\uC778 \uBD88\uAC00";return`${e.email} \xB7 ${t}${Bp(e)}`}function Sy(e,t,n){if(n!==null){let o=e==="claude"?Ki:Ao,i=t?t.accounts.find(s=>s.key===n):void 0;return`\uB808\uD3EC \uAE30\uBCF8\uAC12 \uC0AC\uC6A9(${i?o(i):n})`}return t?t.active?`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(${e==="claude"?t.active.email:Ao({...t.active,alias:null})})`:"\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(\uD655\uC778 \uBD88\uAC00)":"(\uAE30\uBCF8)"}function jp(e,t){if(!Hi(e)||e.state!=="usable"||!Hi(e.values))return null;let n=e.values[t];return typeof n=="string"&&n.length>0?n:null}function Fp(e){let t=e.provider_key==="claude"?Ki:Ao,n=!!e.provider?.accounts.some(r=>r.key===e.selected);return c`<div class="detail-kv" data-exec-account-row=${e.key}>
    <span class="detail-kv__k">${e.title}</span>
    <span class="detail-kv__vgroup">
      <select
        class=${e.selected?"detail-kv__v detail-kv__v--sel":"detail-kv__v"}
        aria-label=${e.title}
        data-exec-key=${e.key}
        @change=${r=>e.handlers.onExecChange(e.key,r.target.value)}
      >
        <option value="" ?selected=${e.selected.length===0}>
          ${Sy(e.provider_key,e.provider,e.workspace_default)}
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
  </div>`}function Up({md:e,catalog:t,workspace_defaults:n=null,handlers:r}){let o=typeof e.claude_account=="string"?e.claude_account:"",i=typeof e.codex_account=="string"?e.codex_account:"";return c`<section class="exec-accounts" data-exec-accounts>
    <div class="detail-section-label">실행 계정</div>
    <div class="exec-settings-core">
      ${Fp({key:"claude_account",title:"Claude \uACC4\uC815",provider_key:"claude",provider:Np(t,"claude"),selected:o,workspace_default:jp(n,"claude_account"),handlers:r,hint:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uB7F0\uD0C0\uC784\uC774 claude\uC77C \uB54C \uC801\uC6A9\uB429\uB2C8\uB2E4"})}
      ${Fp({key:"codex_account",title:"Codex \uACC4\uC815",provider_key:"codex",provider:Np(t,"codex"),selected:i,workspace_default:jp(n,"codex_account"),handlers:r})}
    </div>
  </section>`}function Ey(e){return String(e||"").replace(/^docs\/(superpowers\/)?/,"")}function Ty(e){let t=/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(e);if(!t)return{front:null,body:e};let n=t[1].trim();return{front:n.length>0?n:null,body:e.slice(t[0].length)}}function Gi(e,t){let n=t.getWorkspacePath,r=t.fetchImpl||globalThis.fetch?.bind(globalThis),o=null,i="loading",s="",l=null,a="";function u(C){C.key==="Escape"&&o&&(C.preventDefault(),m())}document.addEventListener("keydown",u);function d(){return o?c`
      <div class="mv-overlay" role="dialog" aria-modal="true">
        <div class="mv-overlay__backdrop" @click=${()=>m()}></div>
        <div class="mv">
          <div class="mv__bar">
            <span class="mv__path" title=${o}
              >${Ey(o)}</span
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
    `:c``}function p(){dt(d(),e)}async function _(C,O={}){o=C,i="loading",s="",l=null,a="",p();let V=O.workspace||(n?n():"");if(!V){i="error",a="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4",p();return}if(!r){i="error",a="fetch\uB97C \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",p();return}let te="/api/doc?workspace="+encodeURIComponent(V)+"&path="+encodeURIComponent(C);try{let W=await r(te),q=await W.json().catch(()=>({}));if(!W.ok||!q||q.ok!==!0){if(q?.error==="not_found"&&O.missing_state==="plan_pending"){i="pending",a="\uACC4\uD68D \uC791\uC131 \uC804 \xB7 \uACBD\uB85C\uB9CC \uC608\uC57D\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4",p();return}i="error",a="\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 ("+String(q&&q.error||W.status)+")",p();return}let I=Ty(String(q.content||""));l=I.front,s=I.body,i="ready",p()}catch{i="error",a="\uBB38\uC11C \uC694\uCCAD \uC2E4\uD328",p()}}function m(){o=null,dt(c``,e)}function y(){document.removeEventListener("keydown",u),m()}return{open:_,close:m,destroy:y}}var Cy=[{key:"input_tokens",label:"\uC785\uB825"},{key:"output_tokens",label:"\uCD9C\uB825"},{key:"cache_read_input_tokens",label:"\uCE90\uC2DC \uC77D\uAE30"}],Hp="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4",Yi=[{role:"implementation",provider:"codex"},{role:"review-consult",provider:"codex"},{role:"subagent",provider:"claude"}],Ry=new Set(["codex-runner","Explore","Plan","advisor","advisor-xhigh","claude-code-guide","statusline-setup"]);function Wp(e){return typeof e=="string"&&Ry.has(e)}var Oy=["running","done","failed","interrupted"],Iy={running:"\u25CF",done:"\u2713",failed:"\u2717",interrupted:"\u26A0"};function Ly(e){return typeof e=="number"&&Number.isFinite(e)?e:0}function Py(e){let t=un(e);if(t.length>0)return t.map(o=>c`<span class="detail-usage-total" title=${o.tooltip}
          >${o.label}</span
        >`);let n=lo(e);if(!n||!e)return"";let r=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?` \xB7 $${e.total_cost_usd.toFixed(2)}`:"";return c`<span
      class="detail-usage-total"
      title="이 이슈의 모든 attempt 토큰 합계 (입력+출력+캐시)"
      >${n.replace(/^τ /,"\u03C4 \uCD1D ")}${r}</span
    >${e.replayed?c`<span class="detail-usage-partial" title=${Hp}
          >부분 집계</span
        >`:""}`}function zp(e){return!e||!e.roles.orchestrator?null:{providers:e.roles.orchestrator,roles:{}}}function jl(e){if(typeof e=="number")return ys(e);if(typeof e!="string")return"";let t=Date.parse(e);return Number.isFinite(t)?ys(t):""}function Dy(e){return typeof e=="string"?e.replace(/-\d{8}$/,""):""}function Kp(e,t,n){if(e.provider!=="claude"){let o=e.session_id?` \xB7 thread ${e.session_id}`:"",i=n?" \xB7 \uC774\uC804 \uB77C\uC6B4\uB4DC \uC2A4\uB808\uB4DC \uC774\uC5B4\uAC10":"";return{text:`${n?"\u21A9 ":""}${e.launch_id}`,title:`${e.launch_id}${o}${i}`}}let r=t&&typeof t.agent_id=="string"?t.agent_id:"";return r.length>0?{text:r.slice(0,8),title:r}:{text:e.launch_id.slice(-8),title:e.launch_id}}function ql(e){return e===null||typeof e=="string"&&e.trim().length>0}function Nl(e){return e===null||typeof e=="number"&&Number.isFinite(e)}function My(e){if(!e||typeof e!="object"||Array.isArray(e))return null;let t=e,n=t.provider==="claude";return typeof t.launch_id!="string"||t.launch_id.length===0||!Yi.some(r=>r.role===t.role&&r.provider===t.provider)||!(n?ql(t.model):typeof t.model=="string"&&t.model.length>0)||!(!("effort"in t)||ql(t.effort))||!(!("agent_type"in t)||ql(t.agent_type))||typeof t.session_id!="string"||t.session_id.length===0||!Oy.includes(t.status)||!(t.turn_id===null||typeof t.turn_id=="string")?null:n?!Nl(t.started_at)||!Nl(t.last_event_at)||!Nl(t.completed_at)?null:t:typeof t.started_at!="number"||!Number.isFinite(t.started_at)||typeof t.last_event_at!="number"||!Number.isFinite(t.last_event_at)||!(t.completed_at===null||typeof t.completed_at=="string"&&Number.isFinite(Date.parse(t.completed_at)))?null:t}function qy(e,t,n,r){let i=un({providers:{[t]:{subtotal:n.subtotal,breakdown:n.usage,...n.replayed?{replayed:!0}:{}}},roles:{}})[0],s=Kp({provider:t,launch_id:n.receipt_id,session_id:typeof n.session_id=="string"?n.session_id:void 0},n,r);return c`<div class="detail-session__leg detail-session__usage-detail">
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
    ${jl(n.completed_at)?c`<span class="detail-session__leg-time detail-session__time"
          >${jl(n.completed_at)}</span
        >`:""}
    ${i?c`<span class="detail-session__usage" title=${i.tooltip}
          >${i.label}</span
        >`:""}
  </div>`}function Ny(e,t,n,r,o){let i=e.status==="running"?null:t,l=(i?un({providers:{[e.provider]:{subtotal:i.subtotal,breakdown:i.usage,...i.replayed?{replayed:!0}:{}}},roles:{}}):[])[0],a=e.status==="running"?ys(e.last_event_at):i?jl(i.completed_at):"",u=(e.provider==="claude"?["Claude",e.agent_type,Dy(e.model),e.effort]:["codex",e.model,e.effort]).filter(Boolean).join(" \xB7 "),d=Kp(e,i,o);return c`<button
    type="button"
    class="detail-session__leg detail-session__usage-detail detail-session__leg--${e.status}"
    data-launch-id=${e.launch_id}
    @click=${()=>r.onOpenDelegation&&r.onOpenDelegation(n,e.launch_id)}
  >
    <span class="detail-session__leg-glyph" aria-hidden="true"
      >${Iy[e.status]}</span
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
  </button>`}function jy(e,t){return e.role===t.role&&(e.model===null||t.model===void 0||e.model===t.model)&&e.session_id===t.session_id}function Fy(e,t,n){let r=[],o=new Set,i=Array.isArray(e.delegation_sessions)?e.delegation_sessions:[];for(let p of i){let _=My(p);!_||o.has(_.launch_id)||Wp(_.agent_type)||(o.add(_.launch_id),r.push(_))}r.sort((p,_)=>(p.started_at||0)-(_.started_at||0));let s={};for(let{role:p,provider:_}of Yi){let m=t?t.roles[p]?.[_]:null;s[p]=m?[...m.legs]:[]}let l=Yi.flatMap(({role:p})=>s[p]),a=new Set,u=new Set,d=[];for(let{role:p,provider:_}of Yi){for(let m of r.filter(y=>y.role===p&&y.provider===_)){let y=l.find(O=>O.receipt_id===m.launch_id)||null;if(y&&!jy(m,y))continue;y&&a.add(y.receipt_id);let C=_==="codex"&&u.has(m.session_id);d.push(Ny(m,y,e.attempt_id,n,C)),_==="codex"&&u.add(m.session_id)}for(let m of s[p])if(!a.has(m.receipt_id)&&!Wp(m.agent_type)){let y=typeof m.session_id=="string"&&m.session_id.length>0?m.session_id:null,C=_==="codex"&&y!==null&&u.has(y);d.push(qy(p,_,m,C)),_==="codex"&&y!==null&&u.add(y)}}return d}function By(e,t){let n=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?e.total_cost_usd:null,r=[...Cy,{key:"cache_creation_input_tokens",label:t==="codex"?"\uCE90\uC2DC \uC4F0\uAE30":"\uCE90\uC2DC \uC0DD\uC131"},...t==="codex"&&typeof e.reasoning_output_tokens=="number"&&Number.isFinite(e.reasoning_output_tokens)?[{key:"reasoning_output_tokens",label:"\uCD94\uB860 \uCD9C\uB825"}]:[]];return c`<div class="detail-session__usage-detail">
    ${r.map(o=>c`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">${o.label}</span
          ><span class="detail-session__usage-value"
            >${Ly(e[o.key]).toLocaleString("en-US")}</span
          ></span
        >`)}
    ${n===null?"":c`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">비용</span
          ><span class="detail-session__usage-value"
            >$${n.toFixed(2)}</span
          ></span
        >`}
    ${e.replayed?c`<span class="detail-session__usage-note">${Hp}</span>`:""}
  </div>`}var Uy={running:"\u25CF",done:"\u2713",failed:"\u2717",orphaned:"\u26A0"};function ys(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),n=String(t.getHours()).padStart(2,"0"),r=String(t.getMinutes()).padStart(2,"0");return`${n}:${r}`}function Wy(e){if(typeof e.exec_default_preset_id!="string"||e.exec_default_preset_id.length===0)return"";let t=e.exec_values&&typeof e.exec_values=="object"?Object.entries(e.exec_values).filter(([,r])=>typeof r=="string"&&r.length>0).map(([r,o])=>`${r}=${o}`).join(" \xB7 "):"",n=typeof e.exec_default_preset_revision=="number"?` r${e.exec_default_preset_revision}`:"";return c`<div
    class="detail-session__preset-audit"
    data-attempt-preset-audit
  >
    <strong>외부 실행 preset</strong>
    <span>${e.exec_default_preset_id}${n}</span>
    ${t?c`<small>${t}</small>`:""}
    <small>내부 workflow 실행 영수증과 별도 기록</small>
  </div>`}var zy={remote:"\uB2E4\uB978 \uBA38\uC2E0 \uC138\uC158 \u2014 \uC774 \uC11C\uBC84\uC5D0 transcript \uC5C6\uC74C",missing:"transcript \uD30C\uC77C \uC5C6\uC74C"};function Hy(e,t){let n=zy[e.locality]||"",r=e.locality==="remote"?`${e.host} \xB7 \uB2E4\uB978 \uBA38\uC2E0`:e.locality==="missing"?`${e.host} \xB7 \uD30C\uC77C \uC5C6\uC74C`:e.host;return c`<div class="detail-session-row">
    <button
      type="button"
      class="detail-session detail-session--session"
      data-session-key=${Ta(e)}
      ?disabled=${n.length>0}
      title=${n}
      @click=${()=>{n.length===0&&t.onOpenSessionRef&&t.onOpenSessionRef(e)}}
    >
      <span class="detail-session__glyph">${e.current?"\u25D0":"\xB7"}</span>
      <span class="detail-session__id">${Do(e)}</span>
      <span class="detail-session__meta">${r}</span>
      <span class="detail-session__sid" title=${e.session_id}
        >${e.session_id.slice(0,8)}</span
      >
      <span class="detail-session__time">${ys(e.last_event_at)}</span>
    </button>
    ${e.resume_command?c`<button
          type="button"
          class="op-btn detail-session__resume-cmd"
          title=${e.resume_command}
          @click=${o=>{o.stopPropagation(),t.onCopyResumeCommand&&e.resume_command&&t.onCopyResumeCommand(e.resume_command)}}
        >
          ⧉ 재개
        </button>`:""}
  </div>`}function Gp(e,t={},n={},r=[]){let o=Array.isArray(e)?e:[],i=Array.isArray(r)?r:[],s=[...i.filter(m=>m&&m.current===!0),...i.filter(m=>m&&m.current!==!0).sort((m,y)=>y.index-m.index)],l=s.map(m=>Hy(m,t)),a=n.expanded||new Set;if(o.length===0&&s.length===0)return c`
      <div class="detail-section-label">세션 이력</div>
      <div class="detail-empty" data-seam="session-history">세션 이력 없음</div>
    `;let u=new Set;for(let m of o)m&&typeof m.resumed_from=="string"&&m.resumed_from.length>0&&u.add(m.resumed_from);let d=m=>{if(!(m.status==="failed"||m.status==="orphaned"))return"";let C=typeof m.session_id=="string"&&m.session_id.length>0,O=u.has(m.attempt_id),V=C&&!O,te=C?O?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":"\uC774 \uC138\uC158\uC744 \uAC19\uC740 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C \uC774\uC5B4\uC11C \uC9C4\uD589":"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00";return c`<button
      type="button"
      class="op-btn detail-session__resume"
      data-attempt-id=${m.attempt_id}
      ?disabled=${!V}
      title=${te}
      @click=${W=>{W.stopPropagation(),V&&t.onResume&&t.onResume(m.attempt_id)}}
    >
      ↻ 이어하기
    </button>`},p=m=>{if(!(m.status==="failed"||m.status==="orphaned")||typeof m.cause!="string"||m.cause==="")return"";let C=m.cause_detail,O=C&&typeof C.reason=="string"&&C.reason.length>0?typeof C.command=="string"&&C.command.length>0?`${C.reason} \xB7 ${C.command}`:C.reason:m.cause;return c`<div class="detail-session__cause" title=${O}>
      ${m.cause}
    </div>`},_=m=>{let y=zp(Ia(m));if(un(y).length===0&&!lo(m.usage))return"";let C=a.has(m.attempt_id);return c`<button
      type="button"
      class="detail-session__usage-toggle"
      data-attempt-id=${m.attempt_id}
      aria-expanded=${C?"true":"false"}
      title=${C?"\uD1A0\uD070 \uB0B4\uC5ED \uC811\uAE30":"\uD1A0\uD070 \uB0B4\uC5ED \uD3BC\uCE58\uAE30"}
      @click=${O=>{O.stopPropagation(),t.onToggleUsage&&t.onToggleUsage(m.attempt_id)}}
    >
      τ 자세히
    </button>`};return c`
    <div class="detail-section-label">
      세션 이력${Py(n.total)}
    </div>
    <div class="detail-sessions" data-seam="session-history">
      ${l}${o.map(m=>{let y=Ia(m),C=zp(y),O=un(C);return c`<div class="detail-session-row">
          <button
            type="button"
            class="detail-session detail-session--${m.status||"unknown"}"
            data-attempt-id=${m.attempt_id}
            @click=${()=>t.onOpen&&t.onOpen(m.attempt_id)}
          >
            <span class="detail-session__glyph"
              >${Uy[m.status||""]||"\xB7"}</span
            >
            <span class="detail-session__id">${m.attempt_id}</span>
            ${Po(m)?c`<span
                  class="detail-session__resumed"
                  title=${Po(m)}
                  >↻</span
                >`:""}
            <span class="detail-session__meta">${En(m)}</span>
            ${O.length>0?c`<span class="detail-session__role">orchestrator</span>`:""}
            ${m.session_id?c`<span class="detail-session__sid" title=${m.session_id}
                  >${String(m.session_id).slice(0,8)}</span
                >`:""}
            ${O.length>0?O.map(V=>c`<span
                      class="detail-session__usage"
                      title=${V.tooltip}
                      >${V.label}</span
                    >`):lo(m.usage)?c`<span class="detail-session__usage"
                    >${lo(m.usage)}</span
                  >`:""}
            <span class="detail-session__time">${ys(m.started_at)}</span>
          </button>
          ${_(m)} ${d(m)} ${p(m)} ${Wy(m)}
          ${a.has(m.attempt_id)&&m.usage?By(m.usage,m.runner==="codex"?"codex":"claude"):""}
          ${Fy(m,y,t)}
        </div>`})}
    </div>
  `}function Yp(e,t={}){return c`
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
          ${Ky(e)}
        </div>`:""}
  `}function Ky(e){let t=$o(e);if(t)return t;let n=e.data;if(!n)return"";if(n.missing)return c`<div class="detail-prompt__missing">
        기록 없음 — 아직 이 이슈로 디스패치된 세션이 없습니다. 아래는 다음
        디스패치가 보낼 기본 과업입니다.
      </div>
      ${typeof n.default_task_prompt=="string"?lr("\uC608\uC0C1 \uAE30\uBCF8 \uACFC\uC5C5",n.default_task_prompt):""}`;let r=Ui(n.recorded_at);return c`<div class="detail-prompt__meta">
      ${n.attempt_id}${r?` \xB7 ${r}`:""}
    </div>
    ${typeof n.task_prompt=="string"?lr("\uACFC\uC5C5 (user)",n.task_prompt):""}
    ${typeof n.system_prompt=="string"?lr("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",n.system_prompt):""}`}var Wr=10;function Vp(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),n=r=>String(r).padStart(2,"0");return`${n(t.getMonth()+1)}-${n(t.getDate())} ${n(t.getHours())}:${n(t.getMinutes())}`}function Qp(e,t={}){let r=(Array.isArray(e?.events)?e.events:[]).filter(l=>l&&typeof l.summary=="string"&&l.summary.trim().length>0);if(r.length===0)return"";let o=typeof e.shown=="number"&&e.shown>0?e.shown:Wr,i=r.slice(0,o),s=r.length-i.length;return c`
    <div class="detail-section-label">Worker 이력 (${r.length})</div>
    <ol class="detail-timeline" data-seam="worker-timeline">
      ${i.map(l=>c`<li class="detail-timeline__row">
            ${Vp(l.at)?c`<span class="detail-timeline__at"
                  >${Vp(l.at)}</span
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
  `}var Gy=["open","in_progress","deferred","resolved","closed"],Yy=[0,1,2,3,4];function Xp(e,t){let n=t.issueStores,r=t.onClose,o=t.transport,i=t.onNavigate,s=t.queueStore,l=t.execPresetStore,a=t.sessionLogStore,u=null,d=null,p={},_="",m=!1,y=[],C=!1,O=!1,V={},te={claude:null,codex:null},W=null,q=null,I=0,P=!1,U=!1,Y="",N="",j="",z="",K=!1;function oe(){P=!1,U=!1,Y="",N="",j="",z="",K=!1}function ve(){te={claude:null,codex:null},W=null,q=null,I+=1}async function Ne(){if(!o)return null;try{let w=await Promise.resolve(o("get-workspace-accounts",{}));return w&&typeof w.state=="string"?w:null}catch{return null}}async function F(w){try{let D=await fetch(w);if(!D.ok)return null;let H=await D.json();if(!H||typeof H!="object"||!Array.isArray(H.accounts))return null;let $e=H.accounts.filter(We=>We!==null&&typeof We=="object"&&!Array.isArray(We));return{accounts:$e,active:$e.find(We=>We.active===!0)||null}}catch{return null}}async function X(w){q=w;let D=++I,[H,$e,We]=await Promise.all([F("/api/claude-usage"),F("/api/codex-usage"),Ne()]);D!==I||w!==u||(te={claude:H,codex:$e},W=We,nt())}let Ae=[],Ee=null,R=null,se=!1,ye="",ke=!1,Me=0,he=new Set;function Ie(){Ae=[],Ee=null,R=null,se=!1,ye="",ke=!1,Me+=1,he.clear()}async function Ze(w){if(!o)return;let D=++Me;try{let H=await Promise.resolve(o("get-comments",{id:w}));if(D!==Me||w!==u)return;Ae=Array.isArray(H)?H:[],se=!1}catch{if(D!==Me||w!==u)return;se=!0}nt()}function ut(){if(!o||!u)return;let w=d&&typeof d.comment_count=="number"?d.comment_count:null;if(Ee!==u){Ee=u,R=w,Ze(u);return}w!==null&&w!==R&&(R=w,Ze(u))}function G(w){he.has(w)?he.delete(w):he.add(w),nt()}function J(w){let D=ye.trim().length===0;ye=w,D!==(w.trim().length===0)&&nt()}async function re(){let w=ye.trim();if(!o||!u||w.length===0||ke)return;let D=u;ke=!0,nt();let H=!1;try{let $e=await Promise.resolve(o("add-comment",{id:D,text:w}));Array.isArray($e)&&$e.length>0&&(H=!0,D===u&&(Ae=$e,se=!1,ye="",R=$e.length))}catch{H=!1}H||ge("\uB313\uAE00 \uCD94\uAC00 \uC2E4\uD328","error"),D===u&&(ke=!1),nt()}let pe={onToggle:G,onDraftInput:J,onSubmit:re},Se=t.mdViewer||null,me=null;Se||(me=document.createElement("div"),me.className="md-viewer-root",document.body.appendChild(me));let je=Se||Gi(me,{getWorkspacePath:t.getWorkspacePath||(()=>"")}),Be=document.createElement("div");Be.className="session-log-root",document.body.appendChild(Be);let Qe=xo(Be,{transport:o?(w,D)=>Promise.resolve(o(w,D)):void 0,sessionLogStore:a}),He=!1,ee=!1,Q=!1,xe=null,_t=null,pt=0;function Ke(w){return`${t.getWorkspacePath&&t.getWorkspacePath()||""}::${w}`}function et(){He=!1,ee=!1,Q=!1,xe=null,_t=null,pt+=1}async function x(w){if(!o)return;let D=++pt;ee=!0,Q=!1,nt();try{let H=await Promise.resolve(o("get-bead-prompt",{bead_id:w}));if(D!==pt)return;!H||typeof H!="object"||Array.isArray(H)?Q=!0:(xe=H,_t=Ke(w))}catch{D===pt&&(Q=!0)}finally{D===pt&&(ee=!1,nt())}}let Z=[],Le=null,Ye=0;function tt(w,D){return`${t.getWorkspacePath&&t.getWorkspacePath()||""}::${w}::${D}`}function Ce(){Z=[],Le=null,Ye+=1}async function Je(w,D){if(!o)return;let H=++Ye,$e;try{$e=await Promise.resolve(o("get-session-refs",{bead_id:w}))}catch{$e=null}H!==Ye||D!==Le||(Z=$e&&Array.isArray($e.sessions)?$e.sessions:[],nt())}function Bt(){if(!o||!u)return;let w=d&&d.metadata,D=w&&typeof w=="object"&&typeof w.session_ref=="string"?w.session_ref:null;if(D===null){Ce();return}let H=tt(u,D);Le!==H&&(Z=[],Le=H,Je(u,H))}let kt=[],ht=[],Dt=Wr,Rt=null,Mt=0;function ce(w){return`${t.getWorkspacePath&&t.getWorkspacePath()||""}::${w}`}function be(){kt=[],ht=[],Dt=Wr,Rt=null,Mt+=1}async function Ge(w,D){if(!o)return;let H=++Mt,$e;try{$e=await Promise.resolve(o("get-bead-timeline",{bead_id:w}))}catch{$e=null}H!==Mt||D!==Rt||(kt=$e&&Array.isArray($e.events)?$e.events:[],ht=$e&&Array.isArray($e.attempts)?$e.attempts:[],Dt=Wr,nt())}function rt(){if(!o||!u)return;let w=ce(u);Rt!==w&&(kt=[],ht=[],Dt=Wr,Rt=w,Ge(u,w))}function Re(){Dt+=Wr,nt()}function E(){if(He=!He,He&&u&&_t!==Ke(u)){xe=null,x(u);return}nt()}function L(){let w={};for(let H of ht)H&&typeof H=="object"&&H.bead_id===u&&(w[String(H.attempt_id)]=H);let D=s?s.get():null;for(let H of D&&D.attempts?Object.values(D.attempts):[]){let $e=H;$e&&$e.bead_id===u&&(w[String($e.attempt_id)]=$e)}return w}function ne(){return u?Object.values(L()).sort((D,H)=>(H.started_at||0)-(D.started_at||0)).map(D=>({attempt_id:D.attempt_id,bead_id:D.bead_id,status:D.status,started_at:typeof D.started_at=="number"?D.started_at:null,runner:D.runner||null,model:D.model||null,effort:D.effort||D.observed_effort||null,speed:D.speed||null,session_id:D.session_id||null,resumed_from:D.resumed_from||null,continuation_mode:D.continuation_mode||null,dismissed_at:typeof D.dismissed_at=="number"?D.dismissed_at:null,cause:typeof D.cause=="string"?D.cause:null,cause_detail:D.cause_detail||null,exec_default_preset_id:typeof D.exec_default_preset_id=="string"?D.exec_default_preset_id:null,exec_default_preset_revision:typeof D.exec_default_preset_revision=="number"?D.exec_default_preset_revision:null,exec_values:D.exec_values&&typeof D.exec_values=="object"?D.exec_values:null,usage:D.usage||null,usage_legs:Array.isArray(D.usage_legs)?D.usage_legs:[],delegation_sessions:Array.isArray(D.delegation_sessions)?D.delegation_sessions:[]})):[]}function fe(){return u?nr(L(),u):null}let _e=new Set;function De(w){_e.has(w)?_e.delete(w):_e.add(w),nt()}function yt(w){let D=s?s.get():null,H=D&&D.attempts?D.attempts[w]:null;Qe.open({attempt_id:w,meta:H?{runner:H.runner||void 0,model:H.model||void 0,effort:H.effort||void 0,status:H.status||void 0,session_id:H.session_id||void 0}:{}})}function xt(w,D){let H=s?s.get():null,$e=H&&H.attempts?H.attempts[w]:null,at=($e&&Array.isArray($e.delegation_sessions)?$e.delegation_sessions:[]).find(Ft=>Ft&&typeof Ft=="object"&&Ft.launch_id===D);at&&Qe.open({attempt_id:w,launch_id:D,meta:{runner:at.provider==="claude"?"claude":"codex",role:at.role,...typeof at.agent_type=="string"?{agent_type:at.agent_type}:{},model:at.model,effort:at.effort,session_id:at.session_id,status:at.status}})}async function bt(w){if(!o||!w)return;let D=o,H=()=>{let We=s?s.get():null;return We&&typeof We.revision=="number"?We.revision:0},$e=s?.get()?.attempts?.[w]||null;await so({context:{bead_id:$e?.bead_id||u||"",kind:"session",tuple:$e?En($e):""},transport:We=>D("worker-attempt-resume",{attempt_id:w,expected_revision:H(),...We}),adopt:We=>{We?.queue&&s?.set&&s.set(We.queue)}})}async function Ut(w,D){if(!o||!w)return;let H=o,$e=()=>{let Xe=s?s.get():null;return{bead_id:w,...D==="parallel"?{}:{lane:D},expected_revision:Xe&&typeof Xe.revision=="number"?Xe.revision:0}},We=Xe=>{Xe?.queue&&s?.set&&s.set(Xe.queue)},at=await Promise.resolve(H("worker-queue-place",$e()));if(We(at),at&&at.conflict&&(at=await Promise.resolve(H("worker-queue-place",$e())),We(at)),nt(),!at)return;if(at.applied===!1&&typeof at.admission_reason=="string"){ge(`\uB300\uAE30 \uC801\uC7AC \uAC70\uBD80: ${at.admission_reason}`,"error",2400);return}if(at.reason==="rejected"){ge("\uB300\uAE30 \uC801\uC7AC \uAC70\uBD80: rejected","error",2400);return}if(at.applied===!1)return;let Ft=at.queue?Ho({id:w},at.queue).location:null;Ft&&"index"in Ft&&ge(`${Xu(Ft.lane)} \uB300\uAE30 #${Ft.index+1}\uC5D0 \uCD94\uAC00`,"success",2400)}function wt(w,D){if(D){O=!0,nt();return}Ut(w,"parallel")}function qt(w,D){let We=(w.target?.closest?.(".worker-card__place-lane")||null)?.dataset.lane;We&&(We!=="parallel"&&!/^s[1-5]$/.test(We)||(O=!1,nt(),Ut(D,We)))}function At(w){!w||!u||Qe.open(io(w,u,d&&d.status))}let Xt={onOpen:yt,onOpenDelegation:xt,onResume:bt,onToggleUsage:De,onOpenSessionRef:At,onCopyResumeCommand:B};function Jt(){let w=s?s.get():null,D={...V};for(let H of[...Dn,...po]){let $e=w&&w[H];typeof $e=="string"&&(D[H]=$e)}return D}async function Ot(){if(o){try{let w=await Promise.resolve(o("get-session-defaults",{}));V=w&&w.values&&typeof w.values=="object"?w.values:{}}catch{V={}}nt()}}function St(){let w=s?s.get():null;return w&&w.runner_catalog||null}function Gt(){let w=s?s.get():null;return w&&typeof w.execution_defaults=="object"?w.execution_defaults:null}function tn(){let w=d?.metadata&&typeof d.metadata=="object"?d.metadata:{},H=Tn({pin:{...w,...p},global:Jt(),execution_defaults:Gt(),runner_catalog:St(),route:typeof w.route=="string"?w.route:null}).orchestration_model.value||"";return Mn(St(),H)}function rn(){let w=l?l.get():null;return!w||typeof w.revision!="number"?null:{revision:w.revision,presets:Array.isArray(w.presets)?w.presets:[]}}function zt(w){return w?.compatible===!1}function on(w){l&&w&&typeof w.revision=="number"&&Array.isArray(w.presets)&&l.set({revision:w.revision,presets:w.presets})}async function we(){let w=rn(),D=w?.presets.find(H=>H.id===_);if(!(!o||!u||!w||!D||zt(D)||m)){m=!0,y=[],nt();try{let H=await Promise.resolve(o("apply-impl-preset",Pu(u,D.id,w.revision)));if(H&&H.conflict){on(H),ge("\uD504\uB9AC\uC14B\uC774 \uBCC0\uACBD\uB410\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uBAA9\uB85D\uC5D0\uC11C \uB2E4\uC2DC \uC801\uC6A9\uD558\uC138\uC694.","error",4e3);return}let $e=H&&Array.isArray(H.issue)?H.issue[0]:H?.issue;if(H&&H.applied&&$e&&typeof $e=="object"){d=$e,y=Array.isArray(H.skipped_orchestration_keys)?H.skipped_orchestration_keys.filter(We=>typeof We=="string"):[];for(let We of Du)delete p[We];ge(y.length>0?"\uC2E4\uD589 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4. \uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 3\uD0A4\uB294 Bead\uC5D0 \uD540\uD560 \uC218 \uC5C6\uC5B4 \uAC74\uB108\uB6F0\uC5C8\uC2B5\uB2C8\uB2E4.":"\uC2E4\uD589 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4.","success",4e3);return}H&&H.error==="bd_readback_failed"?ge("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):ge("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}catch(H){H&&typeof H=="object"&&H.code==="bd_readback_failed"?ge("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):ge("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}finally{m=!1,nt()}}}let S=null;n&&n.subscribe&&(S=n.subscribe(()=>k()));let de=null;s&&typeof s.subscribe=="function"&&(de=s.subscribe(()=>{u&&nt()}));let qe=null,b=null;function v(){b&&(b(),b=null)}l&&typeof l.subscribe=="function"&&(qe=l.subscribe(()=>{u&&nt()}));function M(w){w.key==="Escape"&&u&&(w.preventDefault(),r())}document.addEventListener("keydown",M);let f=co(()=>nt());f.attach();function k(){if(u){if(n&&typeof n.snapshotFor=="function"){let w=n.snapshotFor("detail:"+u)||[];d=w.find(H=>H&&H.id===u)||w[0]||d}ut(),Bt(),rt(),nt()}}function B(w){mn(w).then(D=>{D?ge("\uBCF5\uC0AC\uB428","success",1200):ge("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function ae(w){w.preventDefault(),w.stopPropagation(),u&&B(u)}function le(w,D){w.preventDefault(),w.stopPropagation(),B(D)}function Ue(w,D,H){w.preventDefault(),w.stopPropagation(),je.open(D,{missing_state:H})}async function ft(w,D){let H=Object.hasOwn(p,w),$e=p[w];if(p[w]=D,nt(),!(!o||!u))try{let We=await Promise.resolve(o("update-exec-settings",Lu(u,w,D.length===0?null:D))),at=Array.isArray(We)?We[0]:We;if(!at||typeof at!="object"||!at.id)throw new Error("exec settings readback failed");d=at,delete p[w],nt()}catch(We){throw H?p[w]=$e:delete p[w],nt(),ge("\uC2E4\uD589 \uC124\uC815 \uBCC0\uACBD \uC2E4\uD328","error"),We}}function mt(w){w.catch(()=>{})}async function it(w,D){let H=d||{},$e=H.metadata&&typeof H.metadata=="object"?H.metadata:{},We={};for(let Xe of["impl_runtime","impl_model","impl_effort"])We[Xe]=Object.hasOwn(p,Xe)?p[Xe]:typeof $e[Xe]=="string"?$e[Xe]:"";We[w]=D;let at=Nu(We,St(),tn()),Ft={};for(let Xe of["impl_runtime","impl_model","impl_effort"])Ft[Xe]=p[Xe],p[Xe]=at[Xe]||"";if(nt(),!(!o||!u))return Promise.resolve(o("update-impl-target",{id:u,...at,orchestration_runtime:tn()})).then(Xe=>{let Tt=Array.isArray(Xe)?Xe[0]:Xe;if(!Tt||typeof Tt!="object"||!Tt.id)throw new Error("implementation target readback failed");d=Tt;for(let Sn of["impl_runtime","impl_model","impl_effort"])delete p[Sn];nt()}).catch(Xe=>{for(let Tt of["impl_runtime","impl_model","impl_effort"])Ft[Tt]===void 0?delete p[Tt]:p[Tt]=Ft[Tt];throw nt(),ge("\uAD6C\uD604 target \uBCC0\uACBD \uC2E4\uD328","error"),Xe})}async function A(w,D,H){if(!o||!u)return!1;try{let $e=await Promise.resolve(o(w,D)),We=Array.isArray($e)?$e[0]:$e;return We&&typeof We=="object"&&We.id?(d=We,!0):(ge(H,"error"),!1)}catch($e){return $e&&typeof $e=="object"&&$e.code==="bd_readback_failed"?(ge("\uC800\uC7A5\uB410\uC73C\uB098 \uD655\uC778 \uC2E4\uD328 \u2014 \uACE7 \uAC31\uC2E0\uB429\uB2C8\uB2E4","error"),{ok:!1,saved:!0}):(ge(H,"error"),!1)}}function $(w){setTimeout(()=>{try{let D=e.querySelector(w);D&&typeof D.focus=="function"&&D.focus()}catch{}},0)}function Pe(){P=!0,Y=d&&d.title||"",nt(),$('.detail-edit__input[data-edit="title"]')}function Fe(w){Y=w.target.value}function ot(){P=!1,Y="",nt()}function vt(){A("edit-text",{id:u,field:"title",value:Y},"\uC81C\uBAA9 \uC800\uC7A5 \uC2E4\uD328").then(D=>{D===!0&&(P=!1,Y=""),nt()})}function Nt(){U=!0,N=d&&d.description||"",nt(),$('.detail-edit__textarea[data-edit="description"]')}function Zt(w){N=w.target.value}function Sr(){U=!1,N="",nt()}function wn(){A("edit-text",{id:u,field:"description",value:N},"\uC124\uBA85 \uC800\uC7A5 \uC2E4\uD328").then(D=>{D===!0&&(U=!1,N=""),nt()})}function Er(w,D,H,$e){if(w.key==="Escape"){w.stopPropagation(),H();return}w.key==="Enter"&&(!$e||w.ctrlKey||w.metaKey)&&(w.preventDefault(),D())}function Kr(w){let D=w.target.value;A("update-status",{id:u,status:D},"\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328").then(()=>nt())}function ia(w){let D=Number(w.target.value);A("update-priority",{id:u,priority:D},"\uC6B0\uC120\uC21C\uC704 \uBCC0\uACBD \uC2E4\uD328").then(()=>nt())}function aa(w){j=w.target.value}function xs(){let w=j.trim();w.length!==0&&A("label-add",{id:u,label:w},"\uB77C\uBCA8 \uCD94\uAC00 \uC2E4\uD328").then(D=>{D===!0&&(j=""),nt()})}function As(w){if(w.key==="Escape"){w.stopPropagation(),j="",nt();return}w.key==="Enter"&&(w.preventDefault(),xs())}function la(w){A("label-remove",{id:u,label:w},"\uB77C\uBCA8 \uC81C\uAC70 \uC2E4\uD328").then(()=>nt())}let ca={onCopyPath:le,onOpenDoc:Ue};function Gr(w){return typeof w=="string"?w:w&&typeof w=="object"?String(w.id||w.to||w.issue_id||w.depends_on||""):""}function Yr(w){return w&&typeof w=="object"?String(w.dependency_type||w.type||""):""}function h(w){switch(w){case"discovered-from":return{glyph:"\u21A9 ",relation:"\uBC1C\uACAC"};case"parent-child":return{glyph:"\u2338 ",relation:"\uC0C1\uC704"};case"related":return{glyph:"\u2194 ",relation:"\uAD00\uB828"};default:return w.length>0?{glyph:`${w} `,relation:w}:{glyph:"",relation:""}}}function g(w,D){let H=T(D),$e=[];return w.length>0&&$e.push(w),H&&$e.push(H),$e.length>0?$e.join(`
`):void 0}function T(w){if(!w||typeof w!="object")return;let D=typeof w.status=="string"?w.status:"",H=typeof w.title=="string"?w.title:"";return D.length>0&&H.length>0?`${D} \xB7 ${H}`:void 0}function ie(){return(t.getWorkspacePath&&t.getWorkspacePath()||"").trim()}function ue(){return t.depCandidates?t.depCandidates():null}async function Oe(w,D,H){let $e=ie(),We=u;if(!We)return;if($e.length===0){ge("\uB808\uD3EC\uB97C \uC54C \uC218 \uC5C6\uC5B4 \uC758\uC874\uC744 \uBC14\uAFC0 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error");return}let at=await A(w,{a:We,b:D,view_id:We,root_dir:$e},H),Ft=at===!0||at!==!1&&at.saved===!0;Ft&&t.onDepChanged&&t.onDepChanged({type:w,a:We,b:D}),w==="dep-add"&&Ft&&(z="",K=!1),nt()}function ze(w){if(!u)return;let D=globalThis.confirm;typeof D=="function"&&!D(`${w}\uAC00 ${u}\uB97C \uB9C9\uB294 \uC5F0\uACB0\uC744 \uB04A\uC744\uAE4C\uC694?`)||Oe("dep-remove",w,"\uC758\uC874 \uD574\uC81C \uC2E4\uD328")}function Et(w){w.disabled||Oe("dep-add",w.bead_id,"\uC758\uC874 \uCD94\uAC00 \uC2E4\uD328")}function Yt(w){z=w.target.value,K=!0,nt()}function lt(){K||(K=!0,nt())}function sn(w,D){if(w.key==="Escape"){w.stopPropagation(),z="",K=!1,nt();return}w.key==="Enter"&&(w.preventDefault(),D.length===1&&!D[0].disabled&&Et(D[0]))}function cn(w){return c`<div class="detail-dep-add">
      <input
        class="detail-dep-add__input"
        aria-label="막는 이슈 추가"
        placeholder="막는 이슈 추가"
        .value=${z}
        @focus=${lt}
        @input=${Yt}
        @keydown=${D=>sn(D,w)}
      />
      ${K||z.length>0?c`<div class="detail-dep-add__list">
            ${w.length===0?c`<div class="detail-dep-add__empty">후보 없음</div>`:w.map(D=>c`<button
                      type="button"
                      class="detail-dep-add__cand"
                      data-dep-cand=${D.bead_id}
                      ?disabled=${D.disabled}
                      title=${pn(D.reason)}
                      @click=${()=>Et(D)}
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
    </div>`}function Wn(w,D){let H=D.get(w.id),$e=i?c`<button
          type="button"
          class="detail-dep__link"
          title=${pn(w.title)}
          @click=${()=>H===void 0?i(w.id):i(w.id,H)}
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
    >`}function fn(w){let D=Array.isArray(w.dependencies)?w.dependencies:[],H=Array.isArray(w.dependents)?w.dependents:[],$e=[];for(let Xe of D){let Tt=Gr(Xe);Tt.length>0&&Yr(Xe)==="blocks"&&$e.push({id:Tt,label:`\u26D3 ${Tt}`,kind:"pred",title:g("\uB9C9\uB294",Xe)})}for(let Xe of H){let Tt=Gr(Xe);Tt.length>0&&Yr(Xe)==="blocks"&&$e.push({id:Tt,label:`\u2192 ${Tt}`,kind:"succ",title:g("\uB9C9\uD788\uB294",Xe)})}for(let Xe of D){let Tt=Gr(Xe),Sn=Yr(Xe);if(Tt.length>0&&Sn!=="blocks"){let Te=h(Sn);$e.push({id:Tt,label:`${Te.glyph}${Tt}`,kind:"other",title:g(Te.relation,Xe)})}}let We=ue(),at=new Map;if(We)for(let Xe of We.issues)at.has(Xe.bead_id)||at.set(Xe.bead_id,Xe.root_dir);let Ft=We&&u?Hd(zd(u,We),z):[];return c`
      <div class="detail-section-label">의존성</div>
      ${$e.length===0?c`<div class="detail-empty">의존성 없음</div>`:c`<div class="detail-deps">
            ${$e.map(Xe=>Wn(Xe,at))}
          </div>`}
      ${We===null?c`<div class="detail-empty">후보를 불러올 수 없음</div>`:cn(Ft)}
    `}function dn(w){let D=w.metadata||{},H=w.workflow||{},$e=H.stages||{},We=$e.spec&&$e.spec.stale,at=$e.impl&&$e.impl.stale,Ft=H.quick_fix_review?.state==="stale",Xe=$e.plan||null,Tt=H.route_source==="derived",Sn=H.route||D.route||"\u2014";return c`
      <div class="detail-section-label">워크플로우</div>
      <div class="detail-kv">
        <span class="detail-kv__k">route</span>
        <span
          class="detail-kv__v${Tt?" detail-kv__v--derived":""}"
          title=${Tt?"route \uBBF8\uD540 (metadata unset)":"route"}
          >${Tt?"unset":Sn}</span
        >
      </div>
      ${H.route!=="quick_fix"||Object.hasOwn(D,"spec_review")?c`<div class="detail-kv">
            <span class="detail-kv__k">spec_review</span>
            <span class="detail-kv__v"
              >${D.spec_review||"\uC5C6\uC74C"}${We?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${H.route==="full_plan"?c`<div class="detail-kv">
              <span class="detail-kv__k">plan_review</span>
              <span class="detail-kv__v">${Xe?.receipt||"\uC5C6\uC74C"}</span>
            </div>
            <div class="detail-kv">
              <span class="detail-kv__k">plan_approval</span>
              <span class="detail-kv__v"
                >${Xe?.approval_receipt||"\uC5C6\uC74C"}${Xe?.approval_state==="stale"?" \xB7 stale":Xe?.approval_state==="unknown"?" \xB7 unknown":""}</span
              >
            </div>`:""}
      ${H.route!=="quick_fix"||Object.hasOwn(D,"impl_review")?c`<div class="detail-kv">
            <span class="detail-kv__k">impl_review</span>
            <span class="detail-kv__v"
              >${D.impl_review||"\uC5C6\uC74C"}${at?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${H.resolver?c`<div class="detail-kv">
            <span class="detail-kv__k">↳ 충돌 해소</span>
            <span
              class="detail-kv__v detail-kv__v--resolver detail-kv__v--wrap"
              title=${`resolver-self:${H.resolver.attempt} \xB7 ${H.resolver.prior_sha} \u2192 ${H.resolver.sha}`}
              >${`${H.resolver.prior_sha.slice(0,7)} \u2192 ${H.resolver.sha.slice(0,7)}`}</span
            >
          </div>`:""}
      ${H.route==="quick_fix"||Object.hasOwn(D,"quick_fix_review")?c`<div class="detail-kv">
            <span class="detail-kv__k">quick_fix_review</span>
            <span class="detail-kv__v"
              >${D.quick_fix_review||"\uC5C6\uC74C"}${Ft?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${H.planned_execution?c`<div class="detail-kv">
              <span class="detail-kv__k">planned_execution</span>
              <span class="detail-kv__v">${H.planned_execution.kind}</span>
            </div>
            ${H.planned_execution.kind==="main"?c`<div class="detail-kv">
                  <span class="detail-kv__k">planned_execution_reason</span>
                  <span class="detail-kv__v detail-kv__v--wrap"
                    >${H.planned_execution.reason}</span
                  >
                </div>`:""}`:""}
      ${H.exec_receipt?c`<div class="detail-kv">
            <span class="detail-kv__k">exec_receipt</span>
            <span class="detail-kv__v detail-kv__v--wrap"
              >${er(H.exec_receipt)}</span
            >
          </div>`:""}
      ${H.impl_entry?c`<div class="detail-kv">
            <span class="detail-kv__k">impl_entry</span>
            <span class="detail-kv__v"
              >${`${H.impl_entry.actor}@${H.impl_entry.sha}`}</span
            >
          </div>`:""}
      ${D.pr_url?c`<div class="detail-kv">
            <span class="detail-kv__k">pr_url</span>
            <span class="detail-kv__v detail-kv__v--wrap">${D.pr_url}</span>
          </div>`:""}
    `}let On={route:["quick_fix","spec_backed","full_plan"]};async function Qn(w,D){let H=D.target.value;if(w==="route"&&d&&d.metadata&&d.metadata.route==="full_plan"&&H!=="full_plan"&&!window.confirm(`full_plan \u2192 ${H||"(\uBBF8\uC124\uC815)"} \uC804\uD658: \uC800\uC7A5\uB41C plan \uC2B9\uC778\uC740 \uD3EC\uAE30\uB418\uBA70, plan \uD30C\uC77C\xB7\uB9C8\uCEE4 \uC815\uB9AC\uB294 \uC138\uC158 \uACC4\uC57D\uC774 \uC218\uD589\uD569\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`)){nt();return}await A("update-workflow-meta",{id:u,key:w,value:H},"\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uBA54\uD0C0 \uBCC0\uACBD \uC2E4\uD328"),nt()}function an(w){let D=w.metadata||{};return c` ${(($e,We)=>{let at=On[$e],Ft=typeof D[$e]=="string"?D[$e]:"";return c`<div class="detail-kv">
        <span class="detail-kv__k">${$e}</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label=${$e}
          data-edit=${`wfmeta-${$e}`}
          @change=${Xe=>Qn($e,Xe)}
        >
          <option value="" ?selected=${!at.includes(Ft)}>
            ${We}
          </option>
          ${at.map(Xe=>c`<option value=${Xe} ?selected=${Ft===Xe}>${Xe}</option>`)}
        </select>
      </div>`})("route","(unset)")} `}function Xn(w,D){return P?c`
        <div class="detail-edit">
          <input
            class="detail-edit__input"
            data-edit="title"
            aria-label="제목 편집"
            .value=${Y}
            @input=${Fe}
            @keydown=${H=>Er(H,vt,ot,!1)}
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
        ${un(D).map(H=>c`<span class="detail-usage-total" title=${H.tooltip}
              >${H.label}</span
            >`)}
        <button
          type="button"
          class="detail-edit-btn"
          data-edit="title"
          aria-label="제목 편집"
          @click=${Pe}
        >
          ✎
        </button>
      </div>
    `}function cr(w){let D=nn(w.created_at),H=nn(w.updated_at);return!D&&!H?c``:c`
      ${D?c`<div class="detail-kv">
            <span class="detail-kv__k">생성</span>
            <span class="detail-kv__v detail-kv__v--time">${D}</span>
          </div>`:""}
      ${H?c`<div class="detail-kv">
            <span class="detail-kv__k">수정</span>
            <span class="detail-kv__v detail-kv__v--time">${H}</span>
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
          ${Gy.map(H=>c`<option value=${H} ?selected=${H===w}>${H}</option>`)}
        </select>
      </div>
      <div class="detail-kv">
        <span class="detail-kv__k">priority</span>
        <select
          class="detail-kv__v"
          aria-label="priority"
          data-edit="priority"
          @change=${ia}
        >
          ${Yy.map(H=>c`<option value=${String(H)} ?selected=${H===D}>
                P${H}
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
              .value=${N}
              @input=${Zt}
              @keydown=${D=>Er(D,wn,Sr,!0)}
            ></textarea>
            <div class="detail-edit__actions">
              <button
                type="button"
                class="detail-edit__save"
                data-edit="description-save"
                @click=${wn}
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
    `}function Ht(w){let D=Array.isArray(w.labels)?w.labels:[];return c`
      <div class="detail-section-label">라벨</div>
      <div class="detail-labels">
        ${D.map(H=>c`<span class="detail-label-chip"
              >${H}<button
                type="button"
                class="detail-label-chip__x"
                data-label=${H}
                aria-label=${"\uB77C\uBCA8 \uC81C\uAC70: "+H}
                @click=${()=>la(H)}
              >
                ×
              </button></span
            >`)}
        <span class="detail-label-add">
          <input
            class="detail-label-add__input"
            aria-label="라벨 추가"
            placeholder="라벨 추가"
            .value=${j}
            @input=${aa}
            @keydown=${As}
          />
          <button
            type="button"
            class="detail-label-add__btn"
            @click=${xs}
          >
            추가
          </button>
        </span>
      </div>
    `}function An(){if(!u)return c``;let w=d||{},D=String(w.id||u),H=w.title||"(\uC81C\uBAA9 \uC5C6\uC74C)",$e=fe(),We=w.status||"open",at=typeof w.priority=="number"?Math.max(0,Math.min(4,w.priority)):"",Ft=w.description||"",Xe=s?s.get():null,Tt=Xe&&We!=="closed"?Ho({...w,id:D},Xe):null,Sn=Xe?Ko(Xe):null,Te={...w,metadata:{...w.metadata||{},...p}};return c`
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
              ${D}
            </button>
            ${Tt?c`<button
                  type="button"
                  class="op-btn op-btn--primary detail-overlay__place"
                  data-bead-id=${D}
                  ?disabled=${!Tt.placeable}
                  title=${Nr(Tt)}
                  @click=${()=>wt(D,Sn)}
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
          ${Tt&&O&&Sn?c`<div
                class="place-menu detail-overlay__place-menu"
                @click=${ct=>qt(ct,D)}
              >
                ${Ya(Sn,D)}
                <button
                  type="button"
                  class="op-btn op-btn--icon worker-card__place-cancel"
                  data-bead-id=${D}
                  title="레인 선택 취소"
                  aria-label="레인 선택 취소"
                  @click=${()=>{O=!1,nt()}}
                >
                  ✕
                </button>
              </div>`:""}
          ${Xn(H,$e)}
          ${Mp(Te,{onChipToggle:ct=>f.toggle({bead_id:D,chip_key:ct}),isChipOpen:ct=>f.isOpen({bead_id:D,chip_key:ct})})}
          ${Dp({metadata:Te.metadata,workspace_values:Jt(),catalog:St(),execution_defaults:Gt(),expanded:C,presets:rn()?.presets||[],preset_id:_,preset_busy:m,skipped_orchestration_keys:y},{onToggle:ct=>{C=ct,nt()},onEdit:(ct,Vt)=>{if(ct==="impl_runtime"||ct==="impl_model"||ct==="impl_effort"){mt(it(ct,Vt??""));return}mt(ft(ct,Vt??""))},onPresetSelect:ct=>{_=ct,y=[],nt()},onPresetApply:()=>{we()}})}
          ${Up({md:Te.metadata,catalog:te,workspace_defaults:W,handlers:{onExecChange:(ct,Vt)=>mt(ft(ct,Vt))}})}
          ${In(We,at)} ${cr(w)}
          ${zn(Ft)}
          ${Op(Ae,pe,{expanded:he,draft:ye,sending:ke,error:se})}
          ${Ve(w)} ${Ht(w)} ${fn(w)}
          ${dn(w)} ${an(w)}
          ${Tp(w,ca)}
          ${Yp({expanded:He,loading:ee,error:Q,data:xe},{onToggle:E})}
          ${Gp(ne(),Xt,{total:$e,expanded:_e},Z)}
          ${Qp({events:kt,shown:Dt},{onMore:Re})}
        </div>
      </div>
    `}function nt(){dt(An(),e)}return{load(w){w!==u&&(p={},O=!1,_="",y=[],C=!1,oe(),Ie(),et(),Ce(),be(),ve()),u=w,d=null,!b&&t.subscribeCandidates&&(b=t.subscribeCandidates(()=>{u&&nt()})),k(),Ot(),q!==w&&X(w)},clear(){u=null,d=null,p={},O=!1,_="",m=!1,y=[],C=!1,oe(),Ie(),et(),Ce(),be(),ve(),v(),je.close(),Qe.close(),dt(c``,e)},destroy(){S&&(S(),S=null),de&&(de(),de=null),qe&&(qe(),qe=null),v(),document.removeEventListener("keydown",M),f.detach(),Se||(je.destroy(),me&&me.parentNode&&me.parentNode.removeChild(me)),Qe.destroy(),Be.parentNode&&Be.parentNode.removeChild(Be),u=null,d=null,ve(),_="",m=!1,y=[],Ie(),et(),Ce(),be(),dt(c``,e)}}}function Zp(e){let t=document.createElement("dialog");t.id="fatal-error-dialog",t.setAttribute("role","alertdialog"),t.setAttribute("aria-modal","true"),t.innerHTML=`
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
    </div>`,e.appendChild(t);let n=t.querySelector("#fatal-error-title"),r=t.querySelector("#fatal-error-message"),o=t.querySelector("#fatal-error-detail"),i=t.querySelector("#fatal-error-reload"),s=t.querySelector("#fatal-error-close"),l=()=>{if(typeof t.close=="function")try{t.close()}catch{}t.removeAttribute("open")},a=(u,d,p="")=>{n&&(n.textContent=u||"Unexpected Error"),r&&(r.textContent=d||"An unrecoverable error occurred.");let _=typeof p=="string"?p.trim():"";if(o&&(_.length>0?(o.textContent=_,o.removeAttribute("hidden")):(o.textContent="No additional diagnostics available.",o.setAttribute("hidden",""))),typeof t.showModal=="function")try{t.showModal(),t.setAttribute("open","")}catch{t.setAttribute("open","")}else t.setAttribute("open","")};return i&&i.addEventListener("click",()=>{window.location.reload()}),s&&s.addEventListener("click",()=>l()),t.addEventListener("cancel",u=>{u.preventDefault(),l()}),{open:a,close:l,getElement(){return t}}}var Vy="(max-width: 640px)";function Vi(e){if(typeof window.matchMedia!="function")return e(!1),()=>{};let t=window.matchMedia(Vy),n=!!t.matches;e(n);let r=o=>{let s=!!(typeof o=="object"&&o!==null&&typeof o.matches=="boolean"?o.matches:t.matches);s!==n&&(n=s,e(s))};return typeof t.addEventListener=="function"?(t.addEventListener("change",r),()=>{t.removeEventListener("change",r)}):typeof t.addListener=="function"?(t.addListener(r),()=>{typeof t.removeListener=="function"&&t.removeListener(r)}):()=>{}}function Qy(){return{lanes:{done:!0},areas:{}}}function vs(e){let t={};if(typeof e!="object"||e===null)return t;for(let[n,r]of Object.entries(e))typeof r=="boolean"&&(t[n]=r);return t}function Xy(e){try{let t=window.localStorage.getItem(e);if(!t)return null;let n=JSON.parse(t);if(typeof n!="object"||n===null)return null;let r=n;return typeof r.lanes=="object"&&r.lanes!==null?{lanes:vs(r.lanes),areas:vs(r.areas)}:{lanes:vs(r),areas:{}}}catch{return null}}function Jp(e,t){try{window.localStorage.setItem(e,JSON.stringify(t))}catch{}}function Qi(e,t=Qy()){let n={lanes:vs(t.lanes),areas:vs(t.areas)},r=Xy(e),o={lanes:{...n.lanes,...r?r.lanes:{}},areas:{...n.areas,...r?r.areas:{}}};return{isCollapsed(i){return o.lanes[i]===!0},isAreaCollapsed(i){return o.areas[i]===!0},toggle(i){let s=o.lanes[i]!==!0;return o={...o,lanes:{...o.lanes,[i]:s}},Jp(e,o),s},toggleArea(i){let s=o.areas[i]!==!0;return o={...o,areas:{...o.areas,[i]:s}},Jp(e,o),s}}}function Fl(e){if(typeof e=="string"&&e.length>0)return e;if(e&&typeof e=="object"){let t=e;if(typeof t.message=="string"&&t.message.length>0)return t.message;if(typeof t.error=="string"&&t.error.length>0)return t.error;if(t.error&&typeof t.error=="object"&&typeof t.error.message=="string")return t.error.message}return"\uC694\uCCAD\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4"}function Xi(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"&&t.length>0):[]}function Zi(e){let{transport:t,console_el:n,getLanes:r,getWorkspaces:o,getCrossLanes:i,reproject:s,onCorrection:l,showToast:a,requestRender:u,adoptQueue:d,onDragBegin:p,candidate_drop:_}=e,m=[],y=null,C=!1,O=null,V=null,te=null;function W(){O!==null&&clearTimeout(O),O=setTimeout(()=>{O=null,C=!1},0)}function q(){return i()??null}function I(){let G=new Map,J=o();for(let re of Array.isArray(J)?J:[]){if(!re||typeof re!="object")continue;let pe=re.bead_blocked_by&&typeof re.bead_blocked_by=="object"?re.bead_blocked_by:{};for(let[Se,me]of Object.entries(pe))Array.isArray(me)&&G.set(Se,Xi(me));for(let Se of[...Array.isArray(re.runnable)?re.runnable:[],...Array.isArray(re.session_active)?re.session_active:[]])Se&&typeof Se.bead_id=="string"&&Array.isArray(Se.blocked_by)&&Se.blocked_by.length>0&&G.set(Se.bead_id,Xi(Se.blocked_by))}return G}function P(){let G=new Map,J=new Map,re=o();for(let pe of Array.isArray(re)?re:[]){if(!pe||typeof pe!="object")continue;let Se=pe.bead_blocked_by&&typeof pe.bead_blocked_by=="object"?pe.bead_blocked_by:{};for(let[me,je]of Object.entries(Se))Array.isArray(je)&&G.set(me,Xi(je));for(let me of Array.isArray(pe.runnable)?pe.runnable:[])me&&typeof me.bead_id=="string"&&Array.isArray(me.blocked_by)&&J.set(me.bead_id,Xi(me.blocked_by))}for(let pe of m)for(let Se of[G,J]){let me=Se.get(pe.a);me!==void 0&&Se.set(pe.a,pe.type==="dep-remove"?me.filter(je=>je!==pe.b):me.includes(pe.b)?me:[...me,pe.b])}return{snapshot:G,runnable:J}}function U(){let G=I();for(let J of m){let re=(G.get(J.a)||[]).slice();J.type==="dep-remove"?G.set(J.a,re.filter(pe=>pe!==J.b)):re.includes(J.b)||G.set(J.a,[...re,J.b])}return G}function Y(G=r(),J=q()){let re=new Map;for(let He of Array.isArray(J?.lanes)?J.lanes:[]){let ee=new Map;for(let Q of Array.isArray(He?.entries)?He.entries:[])Q&&typeof Q.bead_id=="string"&&ee.set(Q.bead_id,Q.dep_created_by_lane===!0);re.set(typeof He?.id=="string"?He.id:"",ee)}let pe=new Map,Se=new Map,me=new Set,je=new Set;for(let He of G.chain_lanes){let ee=re.get(He.lane_id);pe.set(He.lane_id,{status:He.status,entries:He.rows.map((Q,xe)=>({bead_id:Q.id,root_dir:Q.root_dir,...xe===0?{}:{dep_created_by_lane:ee?.get(Q.id)===!0}}))});for(let Q of He.rows)Se.set(Q.id,He.lane_id),Q.fixed&&me.add(Q.id),Q.unplaced||je.add(Q.id)}let Be=new Map;for(let He of G.parallel_rows)typeof He.queue_index=="number"&&Be.set(He.id,He.queue_index);for(let He of G.queue_groups)for(let ee of He.sublanes.serial)for(let Q of ee.items)typeof Q.queue_index=="number"&&Be.set(Q.id,Q.queue_index);let Qe=P();return{blocked_by_map:U(),snapshot_blocked_by:Qe.snapshot,runnable_blocked_by:Qe.runnable,owner_of:new Map(Object.entries(G.owner_of)),cross_lanes:pe,owner_lane_of:Se,fixed_members:me,placed_members:je,parallel_rows:G.parallel_rows.map(He=>({bead_id:He.id,root_dir:He.root_dir,queue_index:He.queue_index??0})),parallel_raw_length:new Map(Object.entries(G.parallel_raw_length)),queue_index_of:Be}}function N(G,J){let re=r();for(let Se of[...re.runnable,...re.queue,...re.running,...re.pr_wait,...re.done])if(!(Se.non_occupying||Se.id!==J)){if(Se.root_dir===G)return Se.expected_revision;break}let pe=re.queue_groups.find(Se=>Se.root_dir===G);return pe?pe.revision:0}async function j(G,J,re,pe){if(!t)return null;let me=await t(G,{...J,...re?{root_dir:re}:{},expected_revision:pe});if(me&&me.conflict){me.queue&&d?.(re,me.queue);let je=me.queue&&typeof me.queue.revision=="number"?me.queue.revision:pe;me=await t(G,{...J,...re?{root_dir:re}:{},expected_revision:je})}return me&&me.queue&&d?.(re,me.queue),me}async function z(G,J,re,pe,Se){try{let me=await j(G,J,re,pe.get(re)??N(re,Se.bead_id));return!me||typeof me.applied!="boolean"?(a("\uD050 \uC694\uCCAD\uC774 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error"),null):(me.queue&&typeof me.queue.revision=="number"&&pe.set(re,me.queue.revision),me.conflict?(a("\uD050\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD574 \uC8FC\uC138\uC694","error"),null):me.applied===!1?(a(me.admission_reason?`\uD050 \uC801\uC7AC \uAC70\uBD80: ${me.admission_reason}`:"\uD050 \uC694\uCCAD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4","error"),null):me.queue&&typeof me.queue.revision=="number"?me.queue.revision:pe.get(re)??0)}catch(me){return a(Fl(me),"error"),null}}async function K(G,J,re=new Map){if(G.type==="worker-queue-disarm"){try{let pe=await j(G.type,G.payload,G.root_dir,re.get(G.root_dir)??N(G.root_dir,J));pe&&pe.queue&&typeof pe.queue.revision=="number"&&re.set(G.root_dir,pe.queue.revision)}catch{}return!0}if(G.type==="worker-queue-place"||G.type==="worker-queue-reorder"||G.type==="worker-queue-remove")return await z(G.type,G.payload,G.root_dir,re,{bead_id:J})!==null;try{return(G.type==="dep-add"||G.type==="dep-remove")&&t&&await t(G.type,{a:G.a,b:G.b,...G.root_dir?{root_dir:G.root_dir}:{}}),!0}catch(pe){return a(Fl(pe),"error"),!1}}function oe(G){(G.type==="dep-add"||G.type==="dep-remove")&&(m=[...m,{type:G.type,a:G.a,b:G.b}])}async function ve(G,J){if(!t)return{ok:!1};try{let re=await t(G.type,{...G.payload,expected_revision:J});return!re||typeof re.revision!="number"?(a("\uC5F0\uACB0 \uB808\uC778 \uC751\uB2F5\uC5D0 revision\uC774 \uC5C6\uC2B5\uB2C8\uB2E4","error"),{ok:!1}):{ok:!0,revision:re.revision}}catch(re){let pe=re,Se=pe&&pe.code==="conflict"?pe.details?.cross_lanes:null;return Se&&typeof Se.revision=="number"&&Array.isArray(Se.lanes)?{ok:!1,conflict:Se}:(a(Fl(re),"error"),{ok:!1})}}async function Ne(G,J,re){let pe=new Map,Se=[],me=G.ops.slice(0,G.lane_op_index),je=G.ops.slice(G.lane_op_index);for(let Qe of me){if(!await K(Qe,re,pe))return{done:!0};oe(Qe)}let Be=J;for(let Qe of G.lane_ops){if(Be===null)return a("\uC5F0\uACB0 \uB808\uC778 \uC800\uC7A5\uC18C\uB97C \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error"),{done:!0};let He=await ve(Qe,Be);if(!He.ok)return He.conflict?{done:!1,conflict:He.conflict}:{done:!0};Be=He.revision}for(let Qe of je){if(!await K(Qe,re,pe))return{done:!0};oe(Qe),Qe.type==="dep-add"&&Se.push(Qe)}for(let Qe of Ud(Se))Be=await F(Qe,Be);return{done:!0}}async function F(G,J){if(J===null||!t)return J;let re=G.pairs,pe=J;for(let Se=0;Se<2;Se+=1){if(re.length===0)return pe;try{let me=await t("monitor-lane-provenance",{lane_id:G.lane_id,pairs:re.map(je=>({bead_id:je.bead_id,after:je.after,value:!0})),expected_revision:pe});return me&&typeof me.revision=="number"?me.revision:pe}catch(me){let je=me,Be=je&&je.code==="conflict"?je.details?.cross_lanes:null;if(!Be||typeof Be.revision!="number"||!Array.isArray(Be.lanes))return pe;let Qe=Be.lanes.find(He=>He&&He.id===G.lane_id);re=Wd(Array.isArray(Qe?.entries)?Qe.entries:[],re),pe=Be.revision}}return pe}async function X(G,J,re=[]){m=re,l("",0);let pe=r(),Se=q();for(let me=0;;me+=1){let je=G(Y(pe,Se));if("refused"in je){a(je.refused,"error");break}let Be=await Ne(je,pe.cross_lanes_revision,J);if(Be.done){je.correction&&l(je.correction.lane_id,je.correction.corrected);break}if(me>=1){a("\uB808\uC778\uC774 \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4","error");break}let Qe=s(Be.conflict);pe=Qe.lanes,Se=Qe.raw_lanes}m=[],u()}async function Ae(G,J){await X(re=>Ri(G,J,re),G.bead_id)}function Ee(G,J){let re=J&&typeof J.closest=="function"?J.closest("[data-row-index]"):null;if(re&&G.contains(re)){let pe=Number(re.getAttribute("data-row-index"));return Number.isFinite(pe)?pe:0}return G.querySelectorAll("[data-row-index]").length}function R(G){let J=typeof G?.closest=="function"?G.closest(".worker-pane--collapsed[data-lane]"):null;if(!J)return null;let re=J.getAttribute("data-lane");return re==="queue"?{zone:J,target:{kind:"parallel",marker_index:r().parallel_rows.length}}:re==="candidate"&&_===!0?{zone:J,target:{kind:"candidate"}}:null}function se(G){let J=G.target;if(!y)return null;let re=typeof J?.closest=="function"?J.closest("[data-drop]"):null;if(!re)return R(J);let pe=re.getAttribute("data-drop");if(pe==="candidate")return{zone:re,target:{kind:"candidate"}};if(pe==="parallel")return{zone:re,target:{kind:"parallel",marker_index:Ee(re,J)}};if(pe==="chain")return{zone:re,target:{kind:"chain",lane_id:re.getAttribute("data-lane-id")||"",marker_index:Ee(re,J)}};if(pe==="repo-serial"){let Se=re.getAttribute("data-root-dir")||"";if(Se!==y.root_dir)return null;let me=typeof J?.closest=="function"?J.closest("[data-queue-index]"):null,je=me&&re.contains(me)?me.getAttribute("data-queue-index"):re.getAttribute("data-lane-length"),Be=Number(je);return{zone:re,target:{kind:"repo-serial",root_dir:Se,lane_id:re.getAttribute("data-lane-id")||"",index:Number.isFinite(Be)?Be:0}}}return null}function ye(){for(let G of Array.from(n.querySelectorAll(".is-drop-over")))G.classList.remove("is-drop-over")}function ke(G){V=G.target instanceof Element?G.target:null}function Me(G){let J=G.target,re=typeof J?.closest=="function"?J.closest('[draggable="true"][data-bead-id]'):null,pe=re?re.closest("[data-drag-kind]"):null;if(!pe)return;if(re&&V&&re.contains(V)&&typeof V.closest=="function"&&V.closest("input, button, a")){G.preventDefault();return}let Se=pe.getAttribute("data-bead-id")||"",me=pe.getAttribute("data-drag-kind")||"",je=pe.getAttribute("data-root-dir")||"";if(!Se||!me)return;let Be=pe.getAttribute("data-queue-index")||"",Qe=Number(Be),He=pe.getAttribute("data-lane-id")||"";y={kind:me,bead_id:Se,root_dir:je,...Be!==""&&Number.isFinite(Qe)?{queue_index:Qe}:{},...He?{lane_id:He}:{}},C=!0,p?.(),n.classList.add("is-dragging");try{G.dataTransfer?.setData("text/plain",Se),G.dataTransfer&&(G.dataTransfer.effectAllowed="move")}catch{}}function he(G){let J=se(G);J&&(G.preventDefault(),G.dataTransfer&&(G.dataTransfer.dropEffect="move"),J.zone.classList.add("is-drop-over"))}function Ie(G){let J=G.target;typeof J?.closest=="function"&&(J.closest("[data-drop]")?.classList.remove("is-drop-over"),J.closest(".worker-pane--collapsed")?.classList.remove("is-drop-over"))}function Ze(){y=null,ye(),n.classList.remove("is-dragging"),W()}function ut(G){let J=se(G),re=y;y=null,ye(),n.classList.remove("is-dragging"),!(!J||!re)&&(G.preventDefault(),Ae(re,J.target))}return{attach(G){te||(te=G,G.addEventListener("pointerdown",ke),G.addEventListener("dragstart",Me),G.addEventListener("dragover",he),G.addEventListener("dragleave",Ie),G.addEventListener("drop",ut),G.addEventListener("dragend",Ze))},detach(){O!==null&&(clearTimeout(O),O=null);let G=te;te=null,G&&(G.removeEventListener("pointerdown",ke),G.removeEventListener("dragstart",Me),G.removeEventListener("dragover",he),G.removeEventListener("dragleave",Ie),G.removeEventListener("drop",ut),G.removeEventListener("dragend",Ze))},isDragging(){return y!==null},consumeClickSuppression(){let G=C;return C=!1,G},applyDrop:Ae,runPlanned:X,dropModel:Y,sendOp:K,sendQueueCas:z,rememberDep:oe}}var Bl=Object.freeze({repo_ops_worktree_unowned:"\uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC\uAC00 \uC544\uC9C1 Worker \uC18C\uC720\uAC00 \uC544\uB2C8\uC5B4\uC11C \uC2A4\uD06C\uB9BD\uD2B8 \uC2E4\uD589 \uC804\uC5D0 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4.",verify_cmd_failed:"\uBA38\uC9C0 \uD6C4 \uAC80\uC99D \uBA85\uB839\uC774 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",gh_observation_failed:"GitHub\uC5D0\uC11C PR \uC0C1\uD0DC\uB97C \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",verify_script_failure:"\uAC80\uC99D \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",deploy_script_failure:"\uBC30\uD3EC \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",interrupted_without_terminal_exit:"\uC791\uC5C5\uC774 \uC885\uB8CC \uAE30\uB85D \uC5C6\uC774 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4.",manual_target_missing:"\uC218\uB3D9 \uBC30\uD3EC \uAE30\uB85D\uC5D0 \uD540\uB41C \uB300\uC0C1 SHA\uAC00 \uC5C6\uC5B4 \uC2E4\uD589\uD558\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4.",bootstrap_not_approved:"\uCCAB [deploy] \uC120\uC5B8\uC740 \uC0AC\uB78C \uC2B9\uC778 \uC5C6\uC774 \uC2E4\uD589\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4. Worker \uC124\uC815\uC758 [\uBC30\uD3EC \uC2E4\uD589]\uC73C\uB85C \uC6D0\uACA9 base tip\uC744 \uD55C \uBC88 \uBC30\uD3EC\uD55C \uB4A4 [\uC815\uC0B0 \uC7AC\uAC1C]\uB97C \uB204\uB974\uC138\uC694 \u2014 \uADF8 \uB4A4 \uBA38\uC9C0\uBD80\uD130\uB294 \uC790\uB3D9 \uBC30\uD3EC\uB429\uB2C8\uB2E4.",base_unresolved:"PR\uC774 \uC5B4\uB290 base \uBE0C\uB79C\uCE58\uB85C \uBA38\uC9C0\uB418\uB294\uC9C0 \uD655\uC815\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_ref_unobserved:"PR\uC758 base \uBE0C\uB79C\uCE58\uB97C \uC544\uC9C1 \uAD00\uCE21\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",merge_sha_unobserved:"\uBA38\uC9C0 \uCEE4\uBC0B SHA\uB97C \uC544\uC9C1 \uAD00\uCE21\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_fetch_failed:"\uC6D0\uACA9 base \uBE0C\uB79C\uCE58\uB97C fetch\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_rev_unavailable:"fetch\uD55C \uC6D0\uACA9 base \uBE0C\uB79C\uCE58\uC758 \uCEE4\uBC0B\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_ff_diverged:"\uB85C\uCEEC base \uBE0C\uB79C\uCE58\uAC00 \uC6D0\uACA9\uACFC \uAC08\uB77C\uC838 fast-forward\uB85C \uC815\uB82C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",deployment_target_not_covering_merge:"\uBC30\uD3EC \uB300\uC0C1 base\uAC00 \uC774 \uBA38\uC9C0 \uCEE4\uBC0B\uC744 \uD3EC\uD568\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.",deployment_candidate_ancestry_check_failed:"\uBC30\uD3EC \uB300\uC0C1 base\uAC00 \uC774 \uBA38\uC9C0 \uCEE4\uBC0B\uC744 \uD3EC\uD568\uD558\uB294\uC9C0 \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",verify_red:"\uBA38\uC9C0 \uD6C4 \uAC80\uC99D\uC774 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",cleanup_failed:"\uBA38\uC9C0 \uD6C4 \uC815\uB9AC\uAC00 \uB05D\uB098\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",retry_exhausted:"\uC790\uB3D9 \uC7AC\uC2DC\uB3C4\uB97C \uBAA8\uB450 \uC4F0\uACE0\uB3C4 \uAC19\uC740 \uC2E4\uD328\uAC00 \uC774\uC5B4\uC84C\uC2B5\uB2C8\uB2E4.",conflict_unresolved:"\uCDA9\uB3CC \uD574\uC18C\uAC00 \uB05D\uB098\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",internal_record_failed:"Worker \uB0B4\uBD80 \uAE30\uB85D\uC774 \uC2E4\uD328\uD574 \uC9C4\uD589\uC744 \uBA48\uCDC4\uC2B5\uB2C8\uB2E4.",foreign_landing_unpinned:"\uB2E4\uB978 \uC800\uC7A5\uC18C \uCC29\uC9C0\uC778\uB370 foreign_repo\xB7foreign_path\xB7foreign_base \uD540\uC774 \uC5C6\uAC70\uB098 \uD615\uC2DD\uC774 \uD2C0\uB9BD\uB2C8\uB2E4.",foreign_checkout_unavailable:"\uD540\uB41C \uB300\uC0C1 \uC800\uC7A5\uC18C \uCCB4\uD06C\uC544\uC6C3\uC774 \uC5C6\uAC70\uB098 foreign_repo\uC640 \uAC19\uC740 URL\uC758 remote\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4.",foreign_deploy_unsupported:"\uB300\uC0C1 \uC800\uC7A5\uC18C\uAC00 [deploy]\uB97C \uC120\uC5B8\uD574 Worker\uAC00 \uBC30\uD3EC \uC99D\uAC70\uB97C \uB9CC\uB4E4 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4. \uC138\uC158\uC774 \uBC30\uD3EC\uC640 \uB9C8\uAC10\uC744 \uC18C\uC720\uD569\uB2C8\uB2E4.",repair_lane_retired:"\uC790\uB3D9 \uC218\uB9AC \uB808\uC778\uC774 \uC740\uD1F4\uD574 \uC0AC\uB78C \uCC98\uB9AC\uB85C \uB118\uC5B4\uC654\uC2B5\uB2C8\uB2E4."});var ef={verify_failed:"\uAC80\uC99D \uC2E4\uD328",verify_cmd_failed:"\uAC80\uC99D \uC2E4\uD328",verify_script_failure:"\uAC80\uC99D \uC2E4\uD328",deploy_failed:"\uBC30\uD3EC \uC2E4\uD328",deploy_script_failure:"\uBC30\uD3EC \uC2E4\uD328",job_script_failure:"\uC7A1 \uC2E4\uD328",interrupted_without_terminal_exit:"\uC911\uB2E8\uB428",quickfix_landing_failed:"\uCC29\uC9C0 \uC2E4\uD328",runner_exit:"\uC138\uC158 \uC2E4\uD328",session_parked:"\uC138\uC158 \uB300\uAE30",session_ended_unresolved:"\uC138\uC158 \uC885\uB8CC",prerequisite_unmet:"\uC120\uD589 \uB300\uAE30",delivery_unproven:"\uCC29\uC9C0 \uC99D\uAC70 \uBD80\uC871"},tf={overloaded_529:"Claude API \uACFC\uBD80\uD558(529)\uB85C \uBCF4\uB958",rate_limited_429:"Claude API \uC694\uCCAD \uD55C\uB3C4(429)\uB85C \uBCF4\uB958"},nf={"session_hard_stop:failure":"\uC138\uC158\uC774 \uC2E4\uD328\uB97C \uBCF4\uACE0\uD558\uACE0 \uC885\uB8CC","session_hard_stop:environment":"\uC138\uC158\uC774 \uD658\uACBD \uC624\uB958\uB97C \uBCF4\uACE0\uD558\uACE0 \uC885\uB8CC","resume_failed:transcript_missing":"\uC774\uC5B4\uD558\uAE30 \uB300\uC0C1 \uC138\uC158 \uAE30\uB85D\uC774 \uC5C6\uC74C \u2014 \uC0C8 \uC138\uC158\uC73C\uB85C \uB300\uCCB4"};function Zy(e){return typeof e!="number"||!Number.isFinite(e)?"":new Date(e).toLocaleTimeString("ko-KR",{hour:"2-digit",minute:"2-digit"})}function Jy(e,t){if(typeof e!="string"||!e.startsWith("provider_outage:"))return null;let n=e.slice(16);if(n==="usage_limit"){let o=t&&typeof t=="object"?t.resets_at:null,i=Zy(o);return i?`\uACC4\uC815 \uC0AC\uC6A9 \uD55C\uB3C4\uB85C \uBCF4\uB958 \u2014 \uB9AC\uC14B ${i}`:"\uACC4\uC815 \uC0AC\uC6A9 \uD55C\uB3C4\uB85C \uBCF4\uB958"}if(Object.hasOwn(tf,n))return tf[n];let r=/^http_(5\d\d)$/.exec(n);return r?`Claude API \uC624\uB958(${r[1]})\uB85C \uBCF4\uB958`:null}function ea(e){return typeof e!="string"||e.length===0?[]:e.split(":").filter(t=>t.length>0)}function Ji(e){for(let t of ea(e)){if(Object.hasOwn(ef,t))return ef[t];if(t.startsWith("session_"))return"\uC138\uC158 \uC2E4\uD328"}return null}function of(e){return ea(e).length===0?null:Ji(e)||"\uC2E4\uD328"}function zr(e){let t=null;for(let n of ea(e))Object.hasOwn(Bl,n)&&(t=Bl[n]);return t}function wr(e,t){if(typeof e=="string"&&Object.hasOwn(nf,e))return nf[e];let n=Jy(e,t);if(n!==null)return n;let r=Ji(e),o=zr(e);return r&&o?`${r} \u2014 ${o}`:r||o?r||o:typeof e=="string"?e:""}function sf(e,t){let n=Ji(e)??Ji(t),r=zr(t)??zr(e);return n&&r?`${n} \u2014 ${r}`:n||r?n||r:typeof t=="string"?t:""}var ev=new Set(["repo_operation_timeout_unresolved"]);function tv(e){for(let t of ea(e))if(ev.has(t)||t.startsWith("repo_ops_"))return!0;return!1}function nv(e,t){return t.code==="interrupted"||t.interrupted===!0||e.failure_kind==="interrupted_without_terminal_exit"||t.code==="interrupted_without_terminal_exit"}function af(e,t){if(!e||typeof e!="object")return"";let n=e.failure;if(!n||typeof n!="object"||tv(n.code))return"";if(n.code==="timeout"){let o=Number(t);return Number.isFinite(o)&&o>0?`\uD0C0\uC784\uC544\uC6C3 ${Math.round(o/1e3)}\uCD08 \uCD08\uACFC`:"\uD0C0\uC784\uC544\uC6C3 \uCD08\uACFC"}if(nv(e,n))return"\uC885\uB8CC \uAE30\uB85D \uC5C6\uC74C \u2014 \uC911\uB2E8\uB428";let r=typeof e.elapsed_ms=="number"&&Number.isFinite(e.elapsed_ms)&&e.elapsed_ms>=0?` \xB7 ${jr(e.elapsed_ms)}`:"";return typeof e.signal=="string"&&e.signal.length>0?`signal ${e.signal}${r}`:Number.isInteger(e.exit_code)?`exit ${e.exit_code}${r}`:""}var rf={schema_unsupported:"\uD540\uB41C \uC815\uCC45 \uC2A4\uD0A4\uB9C8\uB97C \uC9C0\uC6D0\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4."};function lf(e){if(!e||typeof e!="object")return"";let t=e.retry;if(!t||typeof t!="object")return"";if(typeof t.blocked_reason=="string"&&t.blocked_reason)return`\uC790\uB3D9 \uC7AC\uC2DC\uB3C4 \uBABB \uD568 \u2014 ${Object.hasOwn(rf,t.blocked_reason)?rf[t.blocked_reason]:t.blocked_reason}`;if(t.status==="absorbed"){let n=t.absorbed&&typeof t.absorbed=="object"?t.absorbed:null,r=wr(n?.first_failure?.code);return r?`\uC790\uB3D9 \uC7AC\uC2DC\uB3C4\uB85C \uD574\uC18C\uB428 \u2014 \uCCAB \uC2E4\uD328: ${r}`:"\uC790\uB3D9 \uC7AC\uC2DC\uB3C4\uB85C \uD574\uC18C\uB428"}if(e.state!=="failed")return"";if(t.status==="not_applicable")return"\uC7AC\uC2DC\uB3C4 \uB300\uC0C1 \uC544\uB2D8 \u2014 \uC2A4\uD06C\uB9BD\uD2B8 \uC2E4\uD589 \uC804 \uC2E4\uD328";if(t.status==="consumed"){let n=typeof t.first_fingerprint=="string"&&t.first_fingerprint?t.first_fingerprint:null;if(n===null)return"";if(n===e.failure?.fingerprint)return"\uC790\uB3D9 \uC7AC\uC2DC\uB3C4 1\uD68C \u2014 \uAC19\uC740 \uC2E4\uD328";let r=wr(t.first_failure?.code);return r?`\uC790\uB3D9 \uC7AC\uC2DC\uB3C4 1\uD68C \u2014 \uB2E4\uB978 \uC2E4\uD328: ${r}`:"\uC790\uB3D9 \uC7AC\uC2DC\uB3C4 1\uD68C \u2014 \uB2E4\uB978 \uC2E4\uD328"}return""}function rv(e){if(!Number.isFinite(e)||e<0)return"0s";let t=Math.floor(e/1e3),n=Math.floor(t/60),r=t%60;return n>0?`${n}m ${String(r).padStart(2,"0")}s`:`${r}s`}var cf=200;function ov(e){return typeof e!="string"||e.length===0?"":e.length>cf?`${e.slice(0,cf)}\u2026`:e}function sv(e){let t=e&&e.attempts>0&&e.max>0?` ${e.attempts}/${e.max}`:"",n=e&&typeof e.next_at=="number"?` \xB7 ${new Date(e.next_at).toLocaleTimeString("ko-KR",{hour:"2-digit",minute:"2-digit"})}`:"";return`\u21BB \uC7AC\uC2DC\uB3C4 \uB300\uAE30${t}${n}`}function Ul(e){return typeof e!="number"||!Number.isFinite(e)?"":new Date(e).toLocaleTimeString("ko-KR",{hour:"2-digit",minute:"2-digit"})}function iv(e){if(!e)return"";let t=e.auto_resume==="disarmed"?" \xB7 \uC218\uB3D9 \uC870\uCE58":"";if(e.kind==="usage_limit"){let r=Ul(e.resets_at);if(!r)return`\u23F3 \uD55C\uB3C4 \uB300\uAE30 \xB7 \uB9AC\uC14B \uBBF8\uC0C1${t}`;let o=e.target?.account_alias||e.target?.account||"";return`\u23F3 \uD55C\uB3C4 \uB300\uAE30 ${r}${o?` \xB7 ${o}`:""}${t}`}let n=Ul(e.next_probe_at);return`\u26A0\uFE0F \uACF5\uAE09\uC790 \uC7A5\uC560${n?` \xB7 \uB2E4\uC74C \uD504\uB85C\uBE0C ${n}`:""}${t}`}function df(e){if(!e)return"";let t=Array.isArray(e.timeline)?e.timeline:[],n=typeof e.log_path=="string"?e.log_path:"",r=e.log_expired===!0,o=e.log_unreadable===!0;return t.length===0&&n.length===0&&!r&&!o?"":c`${t.length>0?c`<ol class="rtile__history" data-seam="tile-timeline">
        ${t.map(i=>c`<li class="rtile__history-row">
              ${uf(i.at)?c`<span class="rtile__history-at"
                    >${uf(i.at)}</span
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
          </p>`:""}`}function uf(e){return typeof e!="number"||!Number.isFinite(e)?"":new Date(e).toLocaleTimeString("ko-KR",{hour:"2-digit",minute:"2-digit"})}function av(e,t){if(!e||e.open!==!0)return"";let n=zr(e.cause)||wr(e.cause,e.cause_detail),r=e.retry&&e.retry.attempts>0?`\uC790\uB3D9 \uC7AC\uC2DC\uB3C4 ${e.retry.attempts}\uD68C \u2014 \uAC19\uC740 \uC624\uB958`:"",o=e.cause_detail,i=e.quickfix_lane&&e.quickfix_landing?e.quickfix_landing:null,s=i?[i.cursor||null,typeof i.head_sha=="string"?i.head_sha.slice(0,7):null,i.reason||null].filter(Boolean).join(" \xB7 "):"",l=typeof e.finished_at=="number"?`${new Date(e.finished_at).toLocaleString("ko-KR")} \xB7 ${_n(e.finished_at,t)}`:"",a=[e.runner,e.model,e.observed_effort??e.effort,e.speed].filter(_=>typeof _=="string"&&_.length>0).join(" \xB7 "),u=e.usage?.total_cost_usd,d=typeof u=="number"&&Number.isFinite(u)?`$${u.toFixed(2)}`:"",p=df(e);return c`<div
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
  </div>`}function lv(e){return e==="pending"?"\uD68C\uBCF5 \uD6C4 \uC790\uB3D9 \uC7AC\uAC1C \uB300\uAE30":e==="disarmed"?"\uC790\uB3D9 \uC7AC\uAC1C \uC18C\uC9C4 \xB7 \uC218\uB3D9 \uC870\uCE58 \uD544\uC694":typeof e=="string"&&e.startsWith("refused:")?`\uC790\uB3D9 \uC7AC\uAC1C \uAC70\uBD80 \xB7 ${e.slice(8)}`:""}function cv(e){return e==="none"?"\uACC4\uC815 \uC804\uD658 \uC548 \uD568 \xB7 \uC870\uAC74\uC744 \uB9CC\uC871\uD558\uB294 \uB2E4\uB978 \uACC4\uC815 \uC5C6\uC74C":e==="disabled"?"\uACC4\uC815 \uC804\uD658 \uC548 \uD568 \xB7 \uC790\uB3D9 \uC804\uD658 \uAEBC\uC9D0":""}function uv(e){if(!e||e.open!==!0)return"";let t=[e.target?.model,e.target?.account_alias||e.target?.account].filter(i=>typeof i=="string"&&i.length>0).join(" \xB7 "),n=Ul(e.resets_at),r=lv(e.auto_resume),o=cv(e.auto_switch);return c`<div
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
  </div>`}function dv(e){return!e||!e.repo&&!e.serial_lane_id?"":c`${e.repo?c`<span
        class="worker-card__repo rtile__repo"
        title=${e.root_dir||""}
        >${e.repo}</span
      >`:""}${e.serial_lane_id?c`<span class="rtile__lane">${e.serial_lane_id}</span>`:""}`}var pv=new Set(["codex-runner"]);function fv(e,t,n,r=null){if(!e)return"";let o=e.last_activity||null,i=o&&typeof o.text=="string"?o.text:"",s=o&&typeof o.at=="number"?o.at:null,l=(r||!Array.isArray(e.legs)?[]:e.legs).filter(m=>m&&!(typeof m.agent_type=="string"&&pv.has(m.agent_type))),a=l.filter(m=>m&&m.state==="live"),u=l.filter(m=>m&&m.state!=="live"),d=r&&typeof r.last_event_at=="number"?_n(r.last_event_at,t):"",p=r?_n(r.updated_at,t):"",_=d?`\uCD5C\uADFC \uD65C\uB3D9 ${d}`:p?`\uAC31\uC2E0 ${p}`:"";return c`${i?c`<div class="rtile__activity${n?" is-paused":""}">
        <span class="rtile__activity-dot" aria-hidden="true"></span>
        <span class="rtile__activity-text">${i}</span>
        ${s!==null?c`<span class="rtile__activity-age"
              >${_n(s,t)}</span
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
      </div>`:""}`}var _v={remote:"\uB2E4\uB978 \uBA38\uC2E0 \uC138\uC158 \u2014 \uC774 \uC11C\uBC84\uC5D0 transcript \uC5C6\uC74C",missing:"transcript \uD30C\uC77C \uC5C6\uC74C"};function mv(e){if(!e)return"";let t=_v[e.locality]||"";return c`<button
    type="button"
    class="rtile__session"
    ?disabled=${t.length>0}
    title=${t||"\uB77C\uC774\uBE0C \uC138\uC158 \uC5F4\uAE30"}
    aria-label="라이브 세션 열기"
  >
    ▤ 세션
  </button>`}function gv(e,t,n,r=""){if(e==="provider_hold")return c`<div class="rtile__foot">
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
    </div>`;if(e==="retry_wait")return n?c`<div class="rtile__foot">${n}</div>`:"";let o=ov(t?.summary);if(e==="waiting")return c`${o?c`<p class="rtile__held-summary">${o}</p>`:""}${r}
      <div class="rtile__foot">${n}</div>`;let i=df(t);return c`${o?c`<p class="rtile__held-summary">${o}</p>`:""}${i}
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
    </div>`}function Wl(e,t,n=null,r={}){let o=e.kind==="session",i=o&&Array.isArray(e.session_refs)&&e.session_refs.find(Se=>Se&&Se.current===!0)||null,s=e.failed===!0,l=s&&e.failure||null,a=e.parked===!0&&!s,u=e.retry_wait===!0&&!s&&!a,d=e.waiting===!0&&!s&&!a&&!u,p=e.provider_hold===!0&&!s&&!a&&!u&&!d,_=a&&e.failure||null,m=d&&e.wait||null,y=p&&e.hold||null,C=a||u||d||p,O=!!e.paused,V=s||C?e.status_label||(a?"\uC138\uC158 \uB300\uAE30":u?"\uC7AC\uC2DC\uB3C4 \uB300\uAE30":d?"\uC120\uD589 \uB300\uAE30":p?"\uACF5\uAE09\uC790 \uBCF4\uB958":e.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328"):O?"\uC77C\uC2DC\uC815\uC9C0":typeof e.started_at=="number"?rv(t-e.started_at):"\u2014",te=e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker)?e.exec_chips:null,W=Po(e),q=un(e.usage),I=tr(e.usage),P=e.conflict_resolution?O?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":"\uCDA9\uB3CC \uD574\uC18C":null,U=e.base_exception||null,Y=e.landing,N=e.attempt_id&&e.attempt_id===n,j=r.monitor||null,z=dv(j),K=gi(j?.cross_lane_chip),oe=j?mi(j.dependency_chips):"",ve=fv(j,t,O,o?{updated_at:e.updated_at??null,last_event_at:i&&i.locality==="local"?i.last_event_at:null}:null),Ne=o&&e.workflow?.chips?.exec_receipt||null,F=hi(e.workflow),X=bi(e.rec,e.chip_popover?.chip_key==="rec"),Ae=e.chip_popover?uo(e.chip_popover.content):"",Ee=Ne?c`<span
        class="ctl-chip ctl-chip--exec-receipt"
        title=${`exec_receipt ${er(Ne)}`}
        >${`${Ne.kind}:${Ws(Ne)}`}</span
      >`:"",R=i?c`<span
        class="ctl-chip ctl-chip--sref"
        title=${`${i.provider}:${i.session_id}@${i.host}${(e.session_refs||[]).length>=2?` \xB7 \uC774\uB825 ${(e.session_refs||[]).length}`:""}`}
        >${Do(i)}</span
      >`:"",se=z||K||F||R||Ee||X?c`<div class="rtile__meta">
          ${z}${K}${F}${R}${Ee}${X}${Ae}
        </div>`:"",ye=l?c`<button
          type="button"
          class="rtile__failure-badge"
          data-attempt-id=${l.attempt_id}
          aria-expanded=${l.open===!0?"true":"false"}
          aria-label="실패 상세"
        >
          ⛔ ${of(l.cause)||"\uC2E4\uD328"}
        </button>
        ${l.halted_auto_advance?c`<span class="rtile__auto-halted">자동 진행 꺼짐</span>`:""}`:"",ke=a?c`<span
        class="rtile__held-badge"
        title="세션이 사용자 결정을 기다리며 정상 종료했습니다 — 큐는 계속 갑니다"
        >⏸ 세션 대기</span
      >`:u?c`<span
          class="rtile__held-badge"
          title="환경성 실패의 자동 재시도를 기다립니다 — 사람이 할 일은 없습니다"
          >${sv(e.retry)}</span
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
              ${iv(y)}
            </button>`:"",Me=c`${P?c`<span class="worker-mini__badge">${P}</span>`:""}${U?c`<span
        class="worker-mini__badge"
        title="이 세션의 target base가 워크스페이스 선언 base와 다릅니다"
        >${U}</span
      >`:""}${ye}${ke}`,he=o?"":bo(e),Ie=ri(l?.quickfix_landing),Ze=Ie==="settlement"?"\uC815\uC0B0 \uC7AC\uAC1C":"\uC774\uC5B4\uD558\uAE30",ut=Ie==="settlement"?"\uCC29\uC9C0 \uC815\uC0B0\uC744 \uB2E4\uC2DC \uC2E4\uD589":"\uAC19\uC740 \uC138\uC158\uC73C\uB85C \uC774\uC5B4\uC11C \uC9C4\uD589",G=e.resolve_action?c`<button
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
        </button>`:"",pe=re?c`${J}${re}`:J;return c`<div
    class="rtile${N?" rtile--sel":""}${O?" rtile--paused":""}${s?" rtile--failed rtile--compact":""}${C?" rtile--held rtile--compact":""}${a?" rtile--parked":""}${u?" rtile--retry-wait":""}${d?" rtile--waiting":""}${o?" rtile--session":""}${p?" rtile--provider-hold":""}${e.search_match===!1?" is-dimmed":""}"
    data-bead-id=${e.bead_id}
    data-attempt-id=${e.attempt_id||""}
  >
    <div class="rtile__hd">
      <span
        class="rtile__dot${o?" rtile__dot--session":""}"
        aria-hidden="true"
      ></span>
      <span class="rtile__id" title="클릭하면 ID 복사">${e.bead_id}</span>
      ${yi(e.priority)}${W?c`<span class="rtile__resumed" title=${W}>↻</span>`:""}${Me}
      <div class="rtile__hd-actions">
        ${o?c`${typeof e.started_at=="number"?c`<span class="rtile__elapsed">${V}</span>`:""}${mv(i)}<span
                class="rtile__session-badge"
                title="Worker가 아닌 세션이 in_progress로 잡은 이슈"
                >세션</span
              >`:c`<span class="rtile__elapsed">${V}</span>`}
        ${o||C?"":s?c`<button
                  type="button"
                  class="op-btn rtile__resume"
                  data-resume-kind=${Ie}
                  ?disabled=${l?.resume_eligible===!1}
                  title=${l?.resume_eligible===!1?l.resume_reason||`${Ze} \uBD88\uAC00`:ut}
                  aria-label=${Ze}
                >
                  ↻ ${Ze}
                </button>
                ${pe}`:c`<button
                  type="button"
                  class="rtile__session"
                  title="라이브 세션 열기"
                  aria-label="라이브 세션 열기"
                >
                  ▤ 세션
                </button>
                ${O?c`<button
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
                ${pe}`}${G}
      </div>
    </div>
    <div class="rtile__title">${e.title}</div>
    ${C?gv(a?"parked":u?"retry_wait":d?"waiting":"provider_hold",a?_:d?m:y,pe,d?oe:""):s?"":c`${ve}${e.rollup?Bs(e.rollup,{parent_id:e.bead_id,expanded:e.rollup_expanded===!0,childChips:Aa}):""}
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
            ${o?se:z||K||F||te||X||q.length>0||I?c`<div class="rtile__meta">
                    ${z}${K}${F}${_i(e.exec_chips)}${X}
                    ${q.length>0?q.map(Se=>c`<span
                              class="worker-usage"
                              title=${Se.tooltip}
                              >${Se.label}</span
                            >`):I?c`<span
                            class="worker-usage"
                            title=${Mo(e.usage)}
                            >${I}</span
                          >`:""}${Ae}
                  </div>`:""}
            ${ci(e)} ${he}
            <!-- 살아있음만 말하는 비의미적 액센트 (UI-58y2 데스크톱 §실행 타일).
         quick_fix landing의 실제 진행은 위의 별도 진행 줄이 소유한다.
         일시정지된 타일은 살아있지 않으므로 액센트도 없다. -->
            ${s||O?"":c`<div class="rtile__accent" aria-hidden="true"></div>`}`}
    ${av(l,t)}${uv(y)}
  </div>`}function hv(e){let t=e.last_activity&&typeof e.last_activity=="object"?e.last_activity:null,n=Array.isArray(e.legs)?e.legs:[],r=e.dependency_chips||null;return!t&&n.length===0&&!r&&e.kind!=="session"?null:{...t?{last_activity:t}:{},...n.length>0?{legs:n}:{},...r?{dependency_chips:r}:{}}}function pf(e,t=Date.now(),n=null){let r=Array.isArray(e)?e:[];return c`<div class="worker-rungrid" id="worker-rungrid">
    ${r.length===0?c`<div class="worker-rungrid__empty">실행 세션 없음</div>`:r.map(o=>Wl(o,t,n,{monitor:hv(o)}))}
  </div>`}var ln="",bv=["impl_runtime","impl_model","impl_effort"],ff=["claude","codex"],yv=["claude_account","codex_account"],vv=5,ta=1;function kn(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function na(e,t){let n=t.transport,r=typeof t.root_dir=="string"&&t.root_dir.length>0?t.root_dir:null,o=t.notify||(E=>ge(E,"error",4e3)),i={},s={},l={},a={},u=[],d=!1,p={state:"absent",values:{},warnings:[]},_={},m={},y=Promise.resolve(),C={claude:null,codex:null},O=!1,V=null,te={},W="",q="general",I="",P=!1,U=!1,Y=!1,N=null,j=!1;function z(){let E=t.queue?t.queue():null;return kn(E)?E:null}function K(){let E=z();return E?E.runner_catalog:null}function oe(){let E=z();return E&&kn(E.execution_defaults)?E.execution_defaults:null}function ve(){let E=z();return!!(E&&Object.hasOwn(E,"quick_fix_orchestration_model"))}function Ne(){let E=t.implPresetStore?.get();return kn(E)&&Array.isArray(E.presets)?E:null}function F(){return r===null?{}:{root_dir:r}}async function X(E,L){return j||!n?null:await n(E,L)}function Ae(E){E&&kn(E.queue)&&t.onQueueAdopt?.(E.queue)}async function Ee(E,L){let ne=z();if(!ne||j)return null;let fe=await X(E,{...L,...F(),expected_revision:ne.revision});if(Ae(fe),r!==null&&fe&&fe.conflict){let _e=fe.queue&&typeof fe.queue.revision=="number"?fe.queue.revision:z()?.revision??ne.revision;fe=await X(E,{...L,...F(),expected_revision:_e}),Ae(fe)}return fe}async function R(){d=!0,Re();try{let E=await X("get-session-defaults",{...F()});i=kn(E?.values)?{...E.values}:{},s={...i},l={},a={},u=Array.isArray(E?.warnings)?E.warnings:[]}catch(E){u=["kv_read_failed"],o(`\uC138\uC158 \uAE30\uBCF8\uAC12\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4: ${E instanceof Error?E.message:String(E)}`)}finally{d=!1,Re()}}async function se(){let E=Ru(i,s);if(Object.keys(E).length!==0){try{let L=await X("set-session-defaults",{values:E,...F()});i=kn(L?.values)?{...L.values}:{},s={...i},u=Array.isArray(L?.warnings)?L.warnings:[]}catch(L){o(`\uC138\uC158 \uAE30\uBCF8\uAC12 \uC800\uC7A5 \uC2E4\uD328: ${L instanceof Error?L.message:String(L)}`)}Re()}}function ye(E,L){if(!kn(E))return;let ne=E.state;p={state:ne==="usable"||ne==="unusable"||ne==="absent"?ne:"absent",values:kn(E.values)?{...E.values}:{},warnings:Array.isArray(E.warnings)?E.warnings:[]},m={...p.values},L&&(_={...m})}async function ke(){try{ye(await X("get-workspace-accounts",{...F()}),!0)}catch(E){p={state:"unusable",values:{},warnings:["kv_read_failed"]},m={},_={},o(`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4: ${E instanceof Error?E.message:String(E)}`)}Re()}async function Me(E){try{let L=await fetch(E);if(!L.ok)return null;let ne=await L.json();if(!kn(ne)||!Array.isArray(ne.accounts))return null;let fe=ne.accounts.filter(_e=>kn(_e)&&typeof _e.key=="string"&&_e.key.length>0&&typeof _e.email=="string"&&_e.email.length>0);return{accounts:fe,active:fe.find(_e=>_e.active===!0)||null}}catch{return null}}async function he(){O=!0;let[E,L]=await Promise.all([Me("/api/claude-usage"),Me("/api/codex-usage")]);j||(C={claude:E,codex:L},Re())}function Ie(){let E={};for(let L of yv){let ne=Object.hasOwn(_,L)?_[L]:null,fe=Object.hasOwn(m,L)?m[L]:null;ne!==fe&&(E[L]=ne)}return E}async function Ze(){let E=Ie();if(Object.keys(E).length!==0){try{ye(await X("set-workspace-accounts",{values:E,...F()}),!1)}catch(L){o(`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12 \uC800\uC7A5 \uC2E4\uD328: ${L instanceof Error?L.message:String(L)}`)}Re()}}function ut(E,L){L===ln?delete _[E]:_[E]=L,Re(),y=y.then(()=>Ze())}function G(E,L){if(bv.includes(E)){me(E,L);return}L===ln?delete s[E]:s[E]=L,Re(),se()}function J(E,L){l[E]=L,delete a[E]}function re(E,L,ne){if(l[E]=L,L.length>0&&!ne(L)){a[E]=!0,Re();return}delete l[E],delete a[E],L.length===0?delete s[E]:s[E]=L,Re(),se()}function pe(){let E=be().orchestration_model,L=Tn({global:{orchestration_model:E??void 0},execution_defaults:oe(),runner_catalog:K()}).orchestration_model.value;return L?Mn(K(),L):null}function Se(E,L){typeof L=="string"&&L.length>0?s[E]=L:delete s[E]}function me(E,L){let ne=L===ln?void 0:L,fe=Eu({impl_runtime:E==="impl_runtime"?ne:s.impl_runtime,impl_model:E==="impl_model"?ne:s.impl_model,impl_effort:E==="impl_effort"?ne:s.impl_effort},K(),pe());Se("impl_runtime",fe.impl_runtime),Se("impl_model",fe.impl_model),Se("impl_effort",fe.impl_effort),Re(),se()}async function je(){let E=z();if(!E)return;let L={orchestration_model:E.orchestration_model??null,orchestration_effort:E.orchestration_effort??null,orchestration_speed:E.orchestration_speed??null,quick_fix_orchestration_model:E.quick_fix_orchestration_model??null,quick_fix_orchestration_effort:E.quick_fix_orchestration_effort??null,quick_fix_orchestration_speed:E.quick_fix_orchestration_speed??null},ne=Ou(L,{...L,...te});if(Object.keys(ne).length!==0){try{let fe=await Ee("worker-queue-set-orchestration-defaults",{values:ne});if(fe&&fe.applied===!1){o("Worker \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC");return}te={}}catch(fe){o(`Worker \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${fe instanceof Error?fe.message:String(fe)}`)}Re()}}function Be(E,L){te[E]=L===ln?null:L,Re(),je()}function Qe(E){if(V=E,!E){Re();return}let L=K(),ne=be(),fe=ne.orchestration_model;fe&&!mo(L,E).includes(fe)&&(te.orchestration_model=null,fe=null);let _e=ne.orchestration_effort;_e&&!ei(L,E,fe||xn).includes(_e)&&(te.orchestration_effort=null),Re(),je()}async function He(E){if(!(!z()||E<ta)){try{await Ee("worker-queue-set-slots",{slots:E})}catch(L){o(`slots \uC800\uC7A5 \uC2E4\uD328: ${L instanceof Error?L.message:String(L)}`)}Re()}}async function ee(E){if(!(!z()||E<ta||E>vv)){try{await Ee("worker-queue-set-serial-lane-count",{count:E})}catch(L){o(`\uC9C1\uB82C \uB808\uC778 \uC800\uC7A5 \uC2E4\uD328: ${L instanceof Error?L.message:String(L)}`)}Re()}}async function Q(E,L){let ne=E==="auto_advance"?"worker-automation-toggle":E==="auto_merge"?"worker-merge-auto-toggle":"worker-provider-auto-switch-toggle";try{await Ee(ne,{on:L})}catch(fe){o(`\uC790\uB3D9\uD654 \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${fe instanceof Error?fe.message:String(fe)}`)}Re()}function xe(){let E={},L=be();for(let ne of fo){let fe=Dn.includes(ne)?L[ne]:s[ne];typeof fe=="string"&&fe.length>0&&(E[ne]=fe)}return E}async function _t(){let E=Ne();if(!E)return;let L=xe();if(Object.keys(L).length===0){o("\uC800\uC7A5\uD560 \uC2E4\uD589 \uC124\uC815\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uBA3C\uC800 \uC2E4\uD589 \uAC12\uC744 \uC120\uD0DD\uD558\uC138\uC694");return}let ne=(E.presets||[]).find(_e=>_e.id===W),fe=I.trim()||(ne?ne.name:"");if(!fe){o("\uD504\uB9AC\uC14B \uC774\uB984\uC744 \uC785\uB825\uD558\uC138\uC694");return}try{let _e=ne?await X("impl-preset-update",{expected_revision:E.revision,id:ne.id,name:fe,settings:L}):await X("impl-preset-create",{expected_revision:E.revision,name:fe,settings:L});if(_e&&_e.applied){if(I="",!ne&&Array.isArray(_e.presets)){let De=_e.presets.find(yt=>yt.name===fe);W=De?De.id:W}Re()}else o("\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4"),Re()}catch(_e){o(`\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328: ${_e instanceof Error?_e.message:String(_e)}`)}}async function pt(){let E=Ne();if(!(!E||W.length===0))try{let L=await X("impl-preset-delete",{expected_revision:E.revision,id:W});L&&L.applied?(W="",Re()):(o("\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328: \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4"),Re())}catch(L){o(`\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328: ${L instanceof Error?L.message:String(L)}`)}}function Ke(E){i=kn(E.values)?{...E.values}:{},s={...i},u=Array.isArray(E.warnings)?E.warnings:[],kn(E.queue)&&(t.onQueueAdopt?.(E.queue),te={})}async function et(E){let L=Ne(),ne=z();if(!L||!ne||W.length===0||E==="quick_fix"&&!ve())return;let fe=_e=>({preset_id:W,expected_revision:L.revision,expected_queue_revision:_e,...E==="quick_fix"?{lane:"quick_fix"}:{},...F()});try{let _e=await X("apply-impl-preset-global",fe(ne.revision));if(E==="quick_fix"&&_e&&_e.lane!=="quick_fix"){o("\uC11C\uBC84 \uC751\uB2F5\uC5D0 lane\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uD050 \uC2A4\uB0C5\uC0F7\uC744 \uB2E4\uC2DC \uBC1B\uC740 \uB4A4 \uD655\uC778\uD558\uC138\uC694"),Re();return}if(_e&&_e.applied&&Ke(_e),r!==null&&_e&&_e.queue_applied===!1){let De=_e.queue&&typeof _e.queue.revision=="number"?_e.queue.revision:z()?.revision??ne.revision;if(_e=await X("apply-impl-preset-global",fe(De)),E==="quick_fix"&&_e&&_e.lane!=="quick_fix"){o("\uC11C\uBC84 \uC751\uB2F5\uC5D0 lane\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uD050 \uC2A4\uB0C5\uC0F7\uC744 \uB2E4\uC2DC \uBC1B\uC740 \uB4A4 \uD655\uC778\uD558\uC138\uC694"),Re();return}_e&&_e.applied&&Ke(_e)}_e&&_e.applied?_e.queue_applied===!1&&o("\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uAC12\uC740 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC138\uC694"):_e&&_e.conflict&&o("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328: \uD504\uB9AC\uC14B\uC774 \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4")}catch(_e){o(`\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328: ${_e instanceof Error?_e.message:String(_e)}`)}Re()}async function x(){U=!0,Y=!1,Re();try{let E=await X("get-worker-system-prompt",{});!E||typeof E!="object"||Array.isArray(E)?Y=!0:N=E}catch{Y=!0}finally{U=!1,Re()}}function Z(){if(P=!P,P&&!N){x();return}Re()}function Le(){let E=$o({loading:U,error:Y});if(E)return E;if(!N)return"";let L=Array.isArray(N.variants)?N.variants:[];return c`<div class="settings-dialog__sp-body">
      ${N.target_base_placeholder?c`<div class="prompt-block__meta">
            \`${N.target_base_placeholder}\`는 디스패치 시점에 해석된
            base로 치환됩니다.
          </div>`:""}
      ${L.map(ne=>c`<div class="settings-dialog__sp-variant" data-variant=${ne.key}>
            <div class="settings-dialog__sp-cond">${ne.condition}</div>
            ${lr(ne.label,ne.system_prompt)}
          </div>`)}
    </div>`}function Ye(){return c`<section
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
        aria-expanded=${P?"true":"false"}
        @click=${Z}
      >
        ${P?"\uC811\uAE30":"\uC804\uBB38 \uBCF4\uAE30"}
      </button>
      ${P?Le():""}
    </section>`}function tt(E,L,ne,fe,_e,De,yt,xt){let bt=_e[E]??ln,Ut=Ma(E,ne,_e,oe(),K(),yt,xt),wt=Ut.options.find(At=>At.value===bt),qt=bt===ln?Ut.full_value:wt?.full_value;return c`<select
        class=${bt===ln?"settings-dialog__unset":""}
        data-key=${E}
        aria-label=${L}
        title=${qt||""}
        ?disabled=${De===!0||xt!=="quick_fix"&&Ut.disabled}
        .value=${kr(String(bt))}
        @change=${At=>fe(E,String(At.target.value))}
      >
        <option value=${ln} ?selected=${bt===ln}>
          ${Ut.unset_label}
        </option>
        ${Ut.options.map(At=>c`<option
              value=${At.value}
              title=${At.full_value||""}
              ?selected=${At.value===bt}
            >
              ${At.label}
            </option>`)}
      </select>
      ${bt===ln?c`<span class="settings-dialog__source-badge">기본</span>`:""}`}function Ce(E,L,ne,fe,_e,De=!1,yt,xt=null,bt=null){return c`<div
      class=${`settings-dialog__row${De?" settings-dialog__row--off":""}`}
      title=${De&&bt?bt:""}
    >
      <span class="settings-dialog__row-label">${L}</span>
      <span class="settings-dialog__controls">
        ${tt(E,L,ne,fe,_e,De,yt,xt)}
      </span>
    </div>`}function Je(E,L,ne,fe,_e,De){let yt=Object.hasOwn(a,E),xt=l[E]??s[E]??ln;return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${L}</span>
      <span class="settings-dialog__controls">
        <input
          type="text"
          class=${`settings-dialog__text${yt?" settings-dialog__text--invalid":""}`}
          data-key=${E}
          aria-label=${L}
          aria-invalid=${String(yt)}
          placeholder=${ne}
          .value=${kr(xt)}
          @input=${bt=>J(E,String(bt.target.value))}
          @change=${bt=>re(E,String(bt.target.value).trim(),De)}
        />
        ${xt.length===0?c`<span class="settings-dialog__source-badge">기본</span>`:""}
        <span class="settings-dialog__hint" data-key-hint=${E}
          >${yt?_e:fe}</span
        >
      </span>
    </div>`}function Bt(E,L){let ne=L?L.active:null;return kn(ne)?`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(${E==="claude"?ne.email:Ao({...ne,alias:null})})`:"\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(\uD655\uC778 \uBD88\uAC00)"}function kt(E,L,ne){let fe=C[ne],_e=Object.hasOwn(_,E)?_[E]:ln,De=ne==="claude"?Ki:Ao,yt=!!fe?.accounts.some(xt=>xt.key===_e);return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${L}</span>
      <span class="settings-dialog__controls">
        <select
          aria-label=${L}
          data-account-key=${E}
          @change=${xt=>ut(E,String(xt.target.value))}
        >
          <option value=${ln} ?selected=${_e.length===0}>
            ${Bt(ne,fe)}
          </option>
          ${_e.length>0&&!yt?c`<option value=${_e} selected>
                ${_e} (목록에 없음)
              </option>`:""}
          ${fe?.accounts.map(xt=>c`<option value=${xt.key} ?selected=${xt.key===_e}>
                ${De(xt)}
              </option>`)||""}
        </select>
        ${fe?"":c`<span class="settings-dialog__hint"
              >계정 목록을 불러올 수 없습니다</span
            >`}
      </span>
    </div>`}function ht(){let E=p.warnings.join(", ");return p.state==="unusable"?`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12\uC744 \uD574\uC11D\uD560 \uC218 \uC5C6\uC5B4 \uC774 \uB808\uD3EC\uC758 \uB514\uC2A4\uD328\uCE58\uAC00 \uAC70\uBD80\uB429\uB2C8\uB2E4 \u2014 ${E} \xB7 \uACC4\uC815\uC744 \uB2E4\uC2DC \uACE0\uB974\uBA74 \uD574\uC18C\uB429\uB2C8\uB2E4`:p.warnings.length>0?`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12\uC5D0 \uC54C \uC218 \uC5C6\uB294 \uD0A4\uAC00 \uC788\uC2B5\uB2C8\uB2E4 \u2014 ${E}`:null}function Dt(E,L,ne,fe,_e,De){return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">
        <i
          class="settings-dialog__stage-dot"
          style=${`background: var(--stage-${L}-on)`}
        ></i>
        ${E}
      </span>
      <span class="settings-dialog__controls">
        ${tt(ne,`${E} \uBAA8\uB378`,fe,G,s,!1)}
        ${tt(_e,`${E} effort`,Js,G,s,!1)}
        ${tt(De,`${E} \uC18D\uB3C4`,xu,G,s,!1)}
      </span>
    </div>`}function Rt(E,L,ne,fe){return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${L}</span>
      <span class="settings-dialog__controls">
        <button
          type="button"
          class=${`settings-dialog__toggle${fe?" is-on":""}`}
          data-automation=${E}
          aria-pressed=${fe?"true":"false"}
          aria-label=${L}
          @click=${()=>Q(E,!fe)}
        >
          ${fe?"\uCF1C\uC9D0":"\uAEBC\uC9D0"}
        </button>
        <span class="settings-dialog__hint">${ne}</span>
      </span>
    </div>`}function Mt(E,L,ne,fe){return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${L}</span>
      <span class="settings-dialog__controls">
        <span class="settings-dialog__stepper" data-stepper=${E}>
          <button
            type="button"
            aria-label=${`${L} \uAC10\uC18C`}
            @click=${()=>fe(ne-1)}
          >
            −
          </button>
          <span class="settings-dialog__stepper-value">${ne}</span>
          <button
            type="button"
            aria-label=${`${L} \uC99D\uAC00`}
            @click=${()=>fe(ne+1)}
          >
            +
          </button>
        </span>
      </span>
    </div>`}function ce(E,L){return c`<div class="settings-dialog__preset-diff" data-preset-diff>
      <div class="settings-dialog__preset-diff-head">
        ${E.rows.length>0?`\uBCC0\uACBD ${E.rows.length}\uAC1C \xB7 \uC801\uC6A9\uD558\uBA74 \uC544\uB798\uC640 \uAC19\uC774 \uBC14\uB01D\uB2C8\uB2E4`:"\uD604\uC7AC \uC124\uC815\uACFC \uAC19\uC2B5\uB2C8\uB2E4 \u2014 \uC801\uC6A9\uD560 \uBCC0\uACBD\uC774 \uC5C6\uC2B5\uB2C8\uB2E4"}
      </div>
      ${E.rows.map(ne=>c`<div
            class="settings-dialog__preset-diff-row"
            data-diff-kind=${ne.kind}
          >
            <span class="settings-dialog__preset-diff-label">${ne.label}</span>
            <span class="settings-dialog__preset-diff-value"
              >${ne.before??"\uAE30\uBCF8"}</span
            >
            <span class="settings-dialog__preset-diff-arrow">→</span>
            <span
              class="settings-dialog__preset-diff-value settings-dialog__preset-diff-after"
              >${ne.after??(L==="quick_fix"?"\uAE30\uBCF8(\uD574\uC81C \u2192 \uC77C\uBC18 \uD504\uB85C\uD30C\uC77C)":"\uAE30\uBCF8(\uD574\uC81C)")}</span
            >
          </div>`)}
      ${E.ignored_keys.length>0?c`<div class="settings-dialog__preset-diff-note">
            ${E.ignored_keys.join(", ")}은(는)
            ${L==="quick_fix"?"quick_fix \uB808\uC778":"\uC804\uC5ED"} 적용이 쓰지 않는
            키라 무시됩니다
          </div>`:""}
    </div>`}function be(){let E=z(),L={};for(let ne of[...Dn,...po])L[ne]=Object.prototype.hasOwnProperty.call(te,ne)?te[ne]:E&&typeof E[ne]=="string"?E[ne]:null;return L}function Ge(){let E=be(),L={};for(let ne of po)L[ne]=E[ne]??null;for(let ne of["quick_fix_impl_dispatch","quick_fix_impl_runtime","quick_fix_impl_model","quick_fix_impl_effort","quick_fix_impl_speed"])L[ne]=s[ne]??null;return L}function rt(){let E=K(),L=s.impl_runtime,ne=s.impl_model,fe=Ne(),_e=z(),De=be(),yt=mo(E,V),xt=_o(E,void 0).filter(S=>S!==xn),bt=Dr(E,void 0,void 0),Ut=ei(E,V,De.orchestration_model||xn).filter(S=>S!==xn),wt=W?(fe?.presets||[]).find(S=>S.id===W):null,qt=wt?Tu(xe(),kn(wt.settings)?wt.settings:{}):null,At={quick_fix_orchestration_model:mo(E,null),quick_fix_orchestration_effort:ei(E,null,null).filter(S=>S!==xn),quick_fix_orchestration_speed:Yn,quick_fix_impl_dispatch:qo,quick_fix_impl_runtime:ff,quick_fix_impl_model:xt,quick_fix_impl_effort:bt,quick_fix_impl_speed:Yn},Xt=wt?Cu(Ge(),kn(wt.settings)?wt.settings:{},At):null,Jt=q==="quick_fix"?Xt:qt,Ot=ve(),St=Ot?null:"\uC11C\uBC84\uAC00 quick_fix \uB808\uC778\uC744 \uC9C0\uC6D0\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4",Gt={...s,...De},tn=_e&&typeof _e.slots=="number"?_e.slots:ta+1,rn=_e&&typeof _e.serial_lane_count=="number"?_e.serial_lane_count:ta,zt=oe()?.supported===!0,on=ht(),we=Ma("workflow_mode",No,s,oe(),E);return c`
      ${u.length>0?c`<div class="settings-dialog__banner" role="alert">
            워크스페이스 기본값을 일부 읽지 못했습니다 —
            ${u.join(", ")}
          </div>`:""}
      ${on?c`<div
            class="settings-dialog__banner"
            data-account-warning
            role="alert"
          >
            ${on}
          </div>`:""}
      ${zt?"":c`<div
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
                @change=${S=>{W=String(S.target.value),Re()}}
              >
                <option value="" ?selected=${W===""}>
                  실행 프리셋…
                </option>
                ${(fe?.presets||[]).map(S=>c`<option
                      value=${S.id}
                      ?selected=${S.id===W}
                    >
                      ${S.name}
                    </option>`)}
              </select>
              <button
                type="button"
                class="settings-dialog__btn settings-dialog__btn--primary op-btn"
                data-preset-apply-global
                data-preset-apply-general
                ?disabled=${!qt||qt.rows.length===0}
                @click=${()=>et("general")}
              >
                일반에 적용
              </button>
              <button
                type="button"
                class="settings-dialog__btn op-btn"
                data-preset-apply-quick-fix
                title=${St||""}
                ?disabled=${!Ot||!Xt||Xt.rows.length===0}
                @click=${()=>et("quick_fix")}
              >
                quick_fix 레인에 적용
              </button>
              <input
                type="text"
                class="settings-dialog__preset-name"
                placeholder=${W?"\uC774\uB984 (\uBE44\uC6B0\uBA74 \uC720\uC9C0)":"\uC0C8 \uD504\uB9AC\uC14B \uC774\uB984"}
                aria-label="프리셋 이름"
                .value=${kr(I)}
                @input=${S=>{I=String(S.target.value)}}
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
                @click=${pt}
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
                aria-pressed=${String(q==="general")}
                @click=${()=>{q="general",Re()}}
              >
                일반
              </button>
              <button
                type="button"
                data-preset-lane="quick_fix"
                aria-pressed=${String(q==="quick_fix")}
                @click=${()=>{q="quick_fix",Re()}}
              >
                quick_fix
              </button>
            </div>
            ${Jt?ce(Jt,q):""}

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">오케스트레이션</div>
              <div class="settings-dialog__row">
                <span class="settings-dialog__row-label">런타임</span>
                <span class="settings-dialog__controls">
                  <select
                    aria-label="런타임"
                    data-key="orchestration_runtime_filter"
                    .value=${kr(V||ln)}
                    @change=${S=>{let de=String(S.target.value);Qe(de===ln?null:de)}}
                  >
                    <option value=${ln} ?selected=${!V}>
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
              ${Ce("orchestration_model","\uBAA8\uB378",yt,Be,De)}
              ${Ce("orchestration_effort","effort",Ut,Be,De)}
              ${Ce("orchestration_speed","\uC18D\uB3C4",Yn,Be,De)}
            </div>

            <div class="settings-dialog__group" data-exec-accounts-group>
              <div class="settings-dialog__group-title">실행 계정</div>
              ${kt("claude_account","Claude","claude")}
              ${kt("codex_account","Codex","codex")}
              <div class="settings-dialog__row">
                <span class="settings-dialog__row-label">한도 대응</span>
                <span class="settings-dialog__controls">
                  <label class="settings-dialog__check">
                    <input
                      type="checkbox"
                      data-provider-auto-switch
                      .checked=${_e?.provider_auto_switch!==!1}
                      @change=${S=>Q("provider_auto_switch",S.target.checked)}
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
                      data-mode=${ln}
                      aria-pressed=${String(!s.workflow_mode)}
                      @click=${()=>G("workflow_mode",ln)}
                    >
                      ${we.unset_label}
                    </button>
                    ${s.workflow_mode?"":c`<span class="settings-dialog__source-badge"
                          >기본</span
                        >`}
                    ${No.map(S=>c`<button
                          type="button"
                          data-mode=${S}
                          aria-pressed=${String(s.workflow_mode===S)}
                          @click=${()=>G("workflow_mode",S)}
                        >
                          ${S}
                        </button>`)}
                  </span>
                </span>
              </div>
              ${Je("bdui_url","beads-ui \uC8FC\uC18C","http://\uD638\uC2A4\uD2B8:3000","\uC138\uC158\uC774 Worker \uB808\uC778 \uBC30\uCE58\uB97C \uBB3C\uC5B4\uBCFC \uB54C \uC4F0\uB294 \uC8FC\uC18C\uC785\uB2C8\uB2E4","http:// \uB610\uB294 https:// \uB85C \uC2DC\uC791\uD558\uB294 \uC8FC\uC18C\uB9CC \uC800\uC7A5\uB429\uB2C8\uB2E4 (\uACBD\uB85C \uC5C6\uC774)",$u)}
            </div>

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">
                리뷰 게이트
                <span class="settings-dialog__hint">모델 · effort · 속도</span>
              </div>
              ${Dt("\uC0AC\uC591 \uB9AC\uBDF0","spec","spec_review_model",jo,"spec_review_effort","spec_review_speed")}
              ${Dt("\uACC4\uD68D \uB9AC\uBDF0","plan","plan_review_model",Zs,"plan_review_effort","plan_review_speed")}
              ${Dt("\uAD6C\uD604 \uB9AC\uBDF0","impl","impl_review_model",jo,"impl_review_effort","impl_review_speed")}
            </div>

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">
                구현
                <span class="settings-dialog__hint"
                  >이슈 핀이 있으면 핀이 우선합니다</span
                >
              </div>
              ${Ce("impl_runtime","\uC704\uC784 \uB300\uC0C1",Xs,G,s)}
              ${Ce("impl_model","\uBAA8\uB378",_o(E,L),G,s)}
              ${Ce("impl_effort","effort",Dr(E,L,ne),G,s)}
              ${Ce("impl_speed","\uC18D\uB3C4",Yn,G,s)}
            </div>

            <div
              class="settings-dialog__group"
              data-quick-fix-group
              title=${St||""}
            >
              <div class="settings-dialog__group-title">
                quick_fix 레인
                <span class="settings-dialog__hint"
                  >${"\uBE44\uC5B4 \uC788\uB294 \uAC12\uC740 \uC77C\uBC18 \uD504\uB85C\uD30C\uC77C\uB85C \uB5A8\uC5B4\uC9D1\uB2C8\uB2E4. \uC774\uC288 \uD540\uC774 \uC788\uC73C\uBA74 \uD540\uC774 \uC6B0\uC120\uD569\uB2C8\uB2E4."}</span
                >
              </div>
              ${Ce("quick_fix_orchestration_model","\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uBAA8\uB378",At.quick_fix_orchestration_model,Be,De,!Ot,Gt,"quick_fix",St)}
              ${Ce("quick_fix_orchestration_effort","\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 effort",At.quick_fix_orchestration_effort,Be,De,!Ot,Gt,"quick_fix",St)}
              ${Ce("quick_fix_orchestration_speed","\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uC18D\uB3C4",Yn,Be,De,!Ot,Gt,"quick_fix",St)}
              ${Ce("quick_fix_impl_dispatch","\uC2E4\uD589 \uBC29\uC2DD",qo,G,s,!Ot,Gt,"quick_fix",St)}
              ${Ce("quick_fix_impl_runtime","\uC704\uC784 \uB300\uC0C1",ff,G,s,!Ot,Gt,"quick_fix",St)}
              ${Ce("quick_fix_impl_model","\uBAA8\uB378",xt,G,s,!Ot,Gt,"quick_fix",St)}
              ${Ce("quick_fix_impl_effort","effort",bt,G,s,!Ot,Gt,"quick_fix",St)}
              ${Ce("quick_fix_impl_speed","\uC18D\uB3C4",Yn,G,s,!Ot,Gt,"quick_fix",St)}
            </div>

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">
                자동화
                <span class="settings-dialog__hint"
                  >이 레포의 워커 큐가 스스로 진행하는 범위</span
                >
              </div>
              ${Rt("auto_advance","\uC790\uB3D9\uD654","\uC2AC\uB86F\uC774 \uBE44\uBA74 \uB300\uAE30 \uC55E \uD589\uC774 \uCD9C\uBC1C\uD569\uB2C8\uB2E4",_e?.auto_advance===!0)}
              ${Rt("auto_merge","\uBA38\uC9C0","\uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4",_e?.auto_merge===!0)}
              ${Mt("slots","\uB3D9\uC2DC \uC2E4\uD589",tn,S=>He(S))}
              ${Mt("serial-lane-count","\uC9C1\uB82C \uB808\uC778",rn,S=>ee(S))}
            </div>
            ${Ye()}
          `}
    `}function Re(){j||dt(rt(),e)}return{load(){te={},q="general",l={},a={};let E=[R(),ke()];return O||E.push(he()),Promise.all(E).then(()=>{})},render:Re,sessionDraft:()=>({...s}),destroy(){j=!0,dt(c``,e)}}}function ra(e){return c`<svg
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
  </svg>`}function _f(){return ra(Oo`<path d="M5.5 3.6 12 8l-6.5 4.4z" />`)}function mf(){return ra(Oo`<path d="M6 3.8v8.4M10 3.8v8.4" />`)}function gf(){return ra(Oo`<path
      d="M4.6 5.6v4.8M4.6 8.2h2.2A3.2 3.2 0 0 0 10 5"
    />
    <circle cx="4.6" cy="4" r="1.5" />
    <circle cx="4.6" cy="12" r="1.5" />
    <circle cx="11.4" cy="4" r="1.5" />`)}function hf(){return ra(Oo`<circle cx="8" cy="8" r="2.1" />
    <path
      d="M8 1.9v1.8M8 12.3v1.8M1.9 8h1.8M12.3 8h1.8M3.7 3.7l1.3 1.3M11 11l1.3 1.3M12.3 3.7 11 5M5 11l-1.3 1.3"
    />`)}function bf(e){return`${e} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}function yf(e){let t=(Array.isArray(e)?e:[]).map(l=>l&&l.usage).filter(l=>l&&typeof l=="object"&&"providers"in l);if(t.length>0)return un(Vs(t));let n={};for(let l of Gn)n[l]=0;let r=!1,o=0,i=0,s=0;for(let l of Array.isArray(e)?e:[]){let a=l&&l.usage;if(a&&typeof a=="object"){let u=!1;for(let d of Gn){let p=a[d];typeof p=="number"&&Number.isFinite(p)&&(n[d]+=p,r=!0,u=!0)}if(u){i+=1;let d=a.total_cost_usd;typeof d=="number"&&Number.isFinite(d)&&(o+=d,s+=1)}}}return i>0&&s===i&&(n.total_cost_usd=o),r?tr(n):null}function Un(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function zl(e,t){let n=Un(e?.counts)?e.counts:null,r=n?n[t]:null;return typeof r=="number"&&Number.isFinite(r)?r:0}function kv(e,t){if(!Un(t))return e;let n={...e};for(let[r,o]of Object.entries(t))o!==void 0&&(n[r]=o);return n}function wv(e){if(!Un(e)||!Un(e.execution_defaults)||!Un(e.runner_catalog)||!Un(e.session_defaults))return null;let t={...e.session_defaults};for(let s of["orchestration_model","orchestration_effort","orchestration_speed"])typeof e[s]=="string"&&e[s].length>0&&(t[s]=e[s]);let n=Tn({global:t,execution_defaults:e.execution_defaults,runner_catalog:e.runner_catalog}),r=Mn(e.runner_catalog,n.orchestration_model.value??""),o=go(n,e.runner_catalog),i=Mr(n,r);return o===null&&i===null?null:{orchestration:o,worker:i}}function vf(e,t){let n=t.notify||(R=>ge(R,"error",4e3)),r=document.createElement("div");r.className="mon2-deck__main",e.appendChild(r);let o=document.createElement("div");o.className="mon2-deck__panel",o.hidden=!0;let i=document.createElement("div");i.className="mon2-deck__panel-hd";let s=document.createElement("span");s.className="mon2-deck__panel-title";let l=document.createElement("button");l.type="button",l.className="mon2-deck__panel-close",l.setAttribute("aria-label","\uC2E4\uD589 \uC124\uC815 \uB2EB\uAE30"),l.textContent="\u2715",i.append(s,l);let a=document.createElement("div");a.className="mon2-deck__panel-body",o.append(i,a),e.appendChild(o);let u=null,d=null,p=null,_=new Map;function m(){let R=t.workspacesState?t.workspacesState():[];return Array.isArray(R)?R.filter(se=>Un(se)):[]}function y(R){return m().find(se=>se.root_dir===R)||null}function C(R){return kv(y(R),_.get(R))}function O(){for(let R of m()){let se=_.get(R.root_dir);se&&typeof se.revision=="number"&&typeof R.revision=="number"&&R.revision>=se.revision&&_.delete(R.root_dir)}}async function V(R,se,ye){let ke=t.transport,Me=C(se);if(!(!ke||!Un(Me))){try{let he=await ke(R,{...ye,root_dir:se,expected_revision:Me.revision});if(Un(he?.queue)&&_.set(se,he.queue),he&&he.conflict){let Ie=Un(he.queue)&&typeof he.queue.revision=="number"?he.queue.revision:C(se)?.revision;he=await ke(R,{...ye,root_dir:se,expected_revision:Ie}),Un(he?.queue)&&_.set(se,he.queue)}}catch(he){n(`\uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${he instanceof Error?he.message:String(he)}`)}X()}}function te(R){u!==R&&(u=R,t.onFocusChange?.(u),X())}function W(R){te(u===R?null:R)}function q(R){if(d===R){P();return}I(),d=R;let se=y(R);s.textContent=`${se?.name||R} \uC2E4\uD589 \uC124\uC815 \xB7 Worker \uD0ED \u2699 \uC2E4\uD589 \uD0ED\uACFC \uAC19\uC740 \uC800\uC7A5\uC18C`,o.hidden=!1,p=na(a,{root_dir:R,queue:()=>C(R),transport:t.transport,implPresetStore:t.implPresetStore,notify:n,onQueueAdopt:ye=>{_.set(R,ye),X()}}),p.load(),X()}function I(){p?.destroy(),p=null}function P(R){I(),d=null,o.hidden=!0,s.textContent="",R!==!0&&X()}let U=()=>P();l.addEventListener("click",U);function Y(R){R.key==="Escape"&&u!==null&&te(null)}document.addEventListener("keydown",Y);function N(R,se){let ye=Math.max(se,R,1);return c`<span
      class="mon2-deck__rail"
      role="img"
      aria-label=${`\uC2AC\uB86F ${se}\uAC1C \uC911 ${R}\uAC1C \uC2E4\uD589 \uC911`}
    >
      ${Array.from({length:ye},(ke,Me)=>Me<R?c`<i class="mon2-deck__slot is-run"></i>`:c`<i class="mon2-deck__slot"></i>`)}
    </span>`}function j(R){let se=R.auto_advance===!0,ye=R.auto_merge===!0;return c`<button
        type="button"
        class=${`mon2-deck__op mon2-deck__auto${se?" is-on":""}`}
        data-act="auto"
        aria-pressed=${se?"true":"false"}
        aria-label=${`${R.name} \uC790\uB3D9\uD654`}
        title=${se?"\uC790\uB3D9\uD654 \uCF1C\uC9D0 \u2014 \uC2AC\uB86F\uC774 \uBE44\uBA74 \uB2E4\uC74C \uD589\uC774 \uCD9C\uBC1C\uD569\uB2C8\uB2E4":"\uC790\uB3D9\uD654 \uAEBC\uC9D0 \u2014 \uB2E4\uC74C \uD589\uC740 \uC218\uB3D9\uC73C\uB85C\uB9CC \uCD9C\uBC1C\uD569\uB2C8\uB2E4"}
      >
        ${se?mf():_f()}
      </button>
      <button
        type="button"
        class=${`mon2-deck__op mon2-deck__merge${ye?" is-on":""}`}
        data-act="merge"
        aria-pressed=${ye?"true":"false"}
        aria-label=${`${R.name} \uC790\uB3D9 \uBA38\uC9C0`}
        title=${ye?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0"}
      >
        ${gf()}
      </button>
      <button
        type="button"
        class=${`mon2-deck__op mon2-deck__gear${d===R.root_dir?" is-on":""}`}
        data-act="gear"
        aria-expanded=${d===R.root_dir?"true":"false"}
        aria-label=${`${R.name} \uC2E4\uD589 \uC124\uC815`}
        title="이 레포의 실행 설정"
      >
        ${hf()}
      </button>`}function z(R){let se=wv(R);return se?c`<div class="mon2-deck__chips">
      ${se.orchestration?c`<span class="mon2-deck__chip" title=${se.orchestration.title}
            >오케 ${se.orchestration.text}</span
          >`:""}
      ${se.worker?c`<span class="mon2-deck__chip" title=${se.worker.title}
            >워커 ${se.worker.text}</span
          >`:""}
    </div>`:""}function K(R){let se=[];for(let[ye,ke]of[["queue","\uB300\uAE30"],["pr_wait","PR"],["session_active","\uC138\uC158"]]){let Me=zl(R,ye);Me>0&&se.push(`${ke} ${Me}`)}return se.join(" \xB7 ")}function oe(R){let se=zl(R,"running"),ye=typeof R.slots=="number"?R.slots:1;return c`<div
      class=${`mon2-deck__tile${u===R.root_dir?" is-focus":""}`}
      role="button"
      tabindex="0"
      data-root-dir=${R.root_dir}
      aria-pressed=${u===R.root_dir?"true":"false"}
      title="클릭하면 이 레포만 선명하게 봅니다 (Esc로 해제)"
    >
      <div class="mon2-deck__tile-hd">
        <span class="mon2-deck__name" title=${R.root_dir}>${R.name}</span>
        <span
          class="mon2-deck__load"
          title=${`\uC2AC\uB86F ${ye}\uAC1C \uC911 ${se}\uAC1C \uC2E4\uD589 \uC911`}
        >
          <span class="mon2-deck__load-n">${se}/${ye}</span>
          ${N(se,ye)}
        </span>
        <button
          type="button"
          class="mon2-deck__worker"
          data-act="worker"
          aria-label=${`${R.name} Worker \uD0ED\uC73C\uB85C \uC774\uB3D9`}
          title="이 레포의 Worker 탭으로 이동"
        >
          ↗
        </button>
      </div>
      <div class="mon2-deck__tile-ft">
        <div class="mon2-deck__ops">${j(R)}</div>
        <span class="mon2-deck__counts">${K(R)}</span>
        ${z(R)}
      </div>
    </div>`}function ve(R){let se=t.doneItems?t.doneItems():[],ye=t.rangeLabel?t.rangeLabel():"",ke=yf(Array.isArray(se)?se:[]),Me=he=>R.reduce((Ie,Ze)=>Ie+zl(Ze,he),0);return c`<div class="mon2-deck__bar">
      <span
        class="mon2-deck__total-counts"
        title=${`visible \uB808\uD3EC ${R.length}\uACF3\uC758 \uD569\uACC4\uC785\uB2C8\uB2E4 \u2014 \uC2E4\uD589\xB7\uB300\uAE30\xB7PR\uC740 \uC9C0\uAE08, \uC644\uB8CC\uB294 ${ye}`}
        >실행 ${Me("running")} · 대기 ${Me("queue")} · PR
        ${Me("pr_wait")}${Me("session_active")>0?` \xB7 \uC138\uC158 ${Me("session_active")}`:""}
        · ${ye} 완료
        ${Array.isArray(se)?se.length:0}</span
      >
      ${ke===null?"":c`<span class="mon2-deck__total-tokens">
            ${typeof ke=="string"?c`<span
                  class="mon2-deck__tok"
                  title=${bf(ye)}
                  >${ke}</span
                >`:ke.map(he=>c`<span
                      class="mon2-deck__tok"
                      data-provider=${he.provider}
                      title=${he.tooltip}
                      >${he.label}</span
                    >`)}
          </span>`}
    </div>`}function Ne(){let R=m();return R.length===0?"":c`${ve(R)}
      <div class="mon2-deck__strip">
        ${R.map(se=>oe(se))}
      </div>`}function F(){u!==null&&!y(u)&&(u=null,t.onFocusChange?.(null))}function X(){O(),F(),d!==null&&!y(d)&&P(!0),dt(Ne(),r),p?.render()}function Ae(R){let se=R.target;if(!se||typeof se.closest!="function")return;let ye=se.closest("[data-root-dir]");if(!ye)return;let ke=ye.getAttribute("data-root-dir")||"",Me=se.closest("[data-act]")?.getAttribute("data-act");if(Me==="worker"){t.gotoWorkerTab?.(ke);return}if(Me==="auto"){V("worker-automation-toggle",ke,{on:C(ke)?.auto_advance!==!0});return}if(Me==="merge"){V("worker-merge-auto-toggle",ke,{on:C(ke)?.auto_merge!==!0});return}if(Me==="gear"){q(ke);return}W(ke)}function Ee(R){if(R.key!=="Enter"&&R.key!==" ")return;let se=R.target;if(!se||typeof se.closest!="function")return;let ye=se.closest('[data-root-dir][role="button"]');!ye||ye!==se||(R.preventDefault(),W(ye.getAttribute("data-root-dir")||""))}return r.addEventListener("click",Ae),r.addEventListener("keydown",Ee),{render:X,focusRoot:()=>u,panelRoot:()=>d,destroy(){document.removeEventListener("keydown",Y),r.removeEventListener("click",Ae),r.removeEventListener("keydown",Ee),l.removeEventListener("click",U),I(),dt(c``,r),e.replaceChildren()}}}var $v=1e4,xf="bdui.monitor.done-range",Af="bdui.monitor.running_sort",Sf="bdui.monitor.candidate_sort",Ef="beads-ui.monitor.candidate-filter",Tf="beads-ui.monitor.sections";function xv(){try{let e=window.localStorage.getItem(Ef);if(!e)return{...vo};let t=JSON.parse(e);return!t||typeof t!="object"?{...vo}:{show_blocked:typeof t.show_blocked=="boolean"?t.show_blocked:vo.show_blocked,readiness:es.some(n=>n.value===t.readiness)?t.readiness:"all"}}catch{return{...vo}}}function kf(e){try{window.localStorage.setItem(Ef,JSON.stringify({show_blocked:e.show_blocked,readiness:e.readiness}))}catch{}}function Av(){try{let e=window.localStorage.getItem(Sf);return Jo.some(t=>t.value===e)?e:"repo_spec"}catch{return"repo_spec"}}function Sv(e){try{window.localStorage.setItem(Sf,e)}catch{}}function Ev(){try{let e=window.localStorage.getItem(Tf);if(!e)return{};let t=JSON.parse(e);return t&&typeof t=="object"?t:{}}catch{return{}}}function Tv(e){try{window.localStorage.setItem(Tf,JSON.stringify(e))}catch{}}function Cv(){try{let e=window.localStorage.getItem(xf);return e===null?"today":Hn(e)}catch{return"today"}}function Rv(e){try{window.localStorage.setItem(xf,e)}catch{}}function Ov(){try{return window.localStorage.getItem(Af)==="repo"?"repo":"started"}catch{return"started"}}function Iv(e){try{window.localStorage.setItem(Af,e)}catch{}}var Cf="tab:monitor:pipeline",Lv=1e3,wf=[{lane:"runnable",pane:"candidate",title:"\uD6C4\uBCF4",empty:"\uC2E4\uD589 \uC790\uACA9\uC744 \uAC16\uCD98 \uC774\uC288 \uC5C6\uC74C"},{lane:"queue",pane:"queue",title:"\uB300\uAE30",empty:"\uD45C\uC2DC\uD560 \uB808\uD3EC \uC5C6\uC74C"},{lane:"running",pane:"running",title:"\uC2E4\uD589 \uC911",empty:"\uC2E4\uD589 \uC911 \uC5C6\uC74C"},{lane:"pr_wait",pane:"pr_wait",title:"PR \uB300\uAE30",empty:"PR \uC5C6\uC74C"},{lane:"done",pane:"done",title:"\uC644\uB8CC",empty:"\uC644\uB8CC \uAE30\uB85D \uC5C6\uC74C"}],Pv=["queue","runnable","done"],$f="\u2460\u2461\u2462\u2463\u2464\u2465\u2466\u2467\u2468\u2469\u246A\u246B\u246C\u246D\u246E\u246F\u2470\u2471\u2472\u2473";function Dv(e){return e>=1&&e<=$f.length?$f[e-1]:`(${e})`}function Rf(e,t){let n=Wt("views:monitor"),r=t.gotoIssue,o=t.pipelineStore,i=t.transport,s=t.getWorkspacePath,l=t.openDoc,a=t.switchWorkspace,u=t.router,d=t.now||(()=>Date.now()),p=t.confirm||(b=>typeof globalThis.confirm!="function"||globalThis.confirm(b)),_=Cv(),m=Ov(),y=xv(),C=Av(),O=Ev(),V=Qi("beads-ui.monitor.lane-collapsed"),te=!1,W=null,q=null,I=null,P=null,U=co(()=>L()),Y=null,N=null,j=null,z=null;function K(b){return z===null&&(z=G()),Pd(b,z)}function oe(b,v){ve(),!(v<=0)&&(N={lane_id:b,corrected:v},j=setTimeout(()=>{j=null,N=null,L()},$v))}function ve(){j!==null&&(clearTimeout(j),j=null),N=null}function Ne(){let b=Qr.find(v=>v.value===_);return b?b.label:""}let F=document.createElement("div");F.className="mon",e.appendChild(F);let X=document.createElement("div");X.className="worker-drawer-overlay",X.hidden=!0;let Ae=document.createElement("div");Ae.className="worker-drawer-overlay__backdrop";let Ee=document.createElement("div");Ee.className="worker-drawer-host mon2-drawer",X.append(Ae,Ee),e.appendChild(X);let R=yr(null,null),se=new Map,ye=new Map,ke=null,Me=null,he=null,Ie=xo(Ee,{transport:i,sessionLogStore:t.sessionLogStore,onClose:()=>{q=null,X.hidden=!0,L()}}),Ze=Zi({transport:i,console_el:F,getLanes:()=>R,getWorkspaces:()=>o&&o.get?o.get():null,getCrossLanes:wt,reproject:b=>({lanes:E(b),raw_lanes:b}),onCorrection:oe,showToast:ge,requestRender:()=>L(),adoptQueue:(b,v)=>{ye.set(b,v)},onDragBegin:()=>{I=null},candidate_drop:!0}),{applyDrop:ut,dropModel:G,runPlanned:J,sendQueueCas:re}=Ze;async function pe(b,v,M,f,k=!0){if(!i||!M)return null;let B=await i(b,{...v,root_dir:M,expected_revision:f});if(B&&B.conflict&&k){B.queue&&ye.set(M,B.queue);let ae=B.queue&&typeof B.queue.revision=="number"?B.queue.revision:f;B=await i(b,{...v,root_dir:M,expected_revision:ae})}return B&&B.queue&&M&&ye.set(M,B.queue),B}function Se(b,v){let M=ye.get(b),f=o&&o.get?o.get():null,k=(Array.isArray(f)?f:[]).find(ae=>ae?.root_dir===b);return(M||k)?.merge_queue?.find(ae=>ae.bead_id===v)?.continuation_action}async function me(b,v,M,f){let k=await pe(b,v,M,f),B=ye.get(M)?.revision??k?.queue?.revision??f;return _r(k,(ae,le)=>pe(b,{...v,continuation:ae,decision_token:le},M,B,!1),{refresh:ae=>pe(b,v,M,ae?.queue?.revision??ye.get(M)?.revision??B,!1)})}async function je(b,v,M,f){let k=await _r({continuation_mismatch:f},(ae,le)=>pe("worker-merge-queue-add",{bead_id:v,continuation:ae,decision_token:le},b,M,!1)),B=k?.queue?.merge_queue?.find(ae=>ae.bead_id===v)?.continuation_action;k?.applied!==!0&&B?.continuation===null&&B.mismatch&&await je(b,v,k.queue.revision,B.mismatch)}async function Be(b,v,M){let f=await pe("worker-discard",b,v,M);if(f&&f.discarded===!0){ge(fi(f),"success",5e3);return}if(f&&f.reason){ge(`\uD3D0\uAE30 \uC2E4\uD328: ${f.reason}`,"error");return}if(f&&f.accepted&&f.pending==="merged_revert"){ge("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success");return}if(f&&f.accepted){ge(`\uD3D0\uAE30 \uC9C4\uD589: ${f.phase||"\uBC31\uC5C5 \uC911"}`,"success");return}f&&!f.conflict&&ge("\uD3D0\uAE30 \uAC70\uBD80: unknown","error")}async function Qe(b,v,M,f){let k=await pe("worker-discard-abandon",b,v,M);if(k&&k.abandoned===!0){ge(pi(f),"success",5e3);return}if(k&&k.reason){ge(`\uD3D0\uAE30 \uD3EC\uAE30 \uAC70\uBD80: ${k.reason}`,"error");return}k&&!k.conflict&&ge("\uD3D0\uAE30 \uD3EC\uAE30 \uAC70\uBD80: unknown","error")}async function He(b,v,M){return!i||!M?null:await i(b,{...v,root_dir:M})}async function ee(){let b=new Map;for(let v of R.pr_wait)b.has(v.root_dir)||b.set(v.root_dir,v.expected_revision);for(let[v,M]of b)await pe("worker-merge-queue-add-all",{},v,M)}function Q(b){let v=O[b];return!!(v&&v.runnable===!0)}function xe(b){let v={...O[b]||{}};v.runnable=!v.runnable,O={...O,[b]:v},Tv(O),L()}function _t(b){V.toggle(b),L()}function pt(b){V.toggleArea(b),L()}function Ke(b){let v=b.dependency_chips||null,M=b.overlap_chips||[],f=b.scope_state==="missing",k=b.armed_lane_chip;return!v&&M.length===0&&!f&&!k?null:{...v||{},...M.length>0?{overlaps:M}:{},...f?{scope_missing:!0}:{},...k?{armed_lane:k}:{}}}function et(b){return vi(b,v=>U.isOpen({bead_id:b.id,chip_key:v}))}function x(b){let v=Ke(b),M=et(b);return v||M?{...b,...v?{dependency_chips:v}:{},...M?{chip_popover:M}:{}}:b}function Z(b){let v=Q(b.root_dir);return c`<header class="mon2-sec__hd">
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
    </header>`}function Le(b,v){return c`<div
      class="mon2-item"
      data-bead-id=${b.id}
      data-drag-kind="candidate"
      data-root-dir=${b.root_dir}
    >
      ${v}
    </div>`}function Ye(b){if(I!==b.id)return null;let v=R.queue_groups.find(B=>B.root_dir===b.root_dir),M=b.place_lanes||[],f=R.cross_lanes_revision!==null,k=[{id:"parallel",label:"\uBCD1\uB82C",count:b.place_index??0}];for(let B of R.chain_lanes)k.push({id:`lane:${B.lane_id}`,label:`\uC5F0\uACB0 ${B.number} (${B.draft?"draft":"\uD655\uC815"}) \uB05D\uC5D0`,count:B.rows.length,group:"\uC5F0\uACB0 \uB808\uC778",disabled:!f});k.push({id:"new-lane",label:"+ \uC0C8 \uC5F0\uACB0 \uB808\uC778",group:"\uC5F0\uACB0 \uB808\uC778",disabled:!f,title:f?"\uC774 \uC774\uC288\uB9CC \uB4E0 draft \uB808\uC778\uC744 \uB9CC\uB4ED\uB2C8\uB2E4":"\uC5F0\uACB0 \uB808\uC778 \uC800\uC7A5\uC18C\uB97C \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"});for(let B of M)k.push({id:`serial:${B.id}`,label:`\uC9C1\uB82C ${Number(B.id.slice(1))}`,count:B.length,group:`${v?v.name:""} \uC9C1\uB82C`});return{bead_id:b.id,lanes:k}}function tt(b){return Le(b,c`${Xa(x(b),Ye(b),{exec_chips_mode:"pinned_only",onOpenDoc:l?(v,M)=>l(M,b.root_dir):void 0})}`)}function Ce(){return R.runnable_flat?c`<div class="mon2-flat" data-drop="candidate">
        ${R.runnable.map(b=>tt(b))}
      </div>`:c`${R.runnable_sections.map(b=>{let v=Q(b.root_dir);return c`<section
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
              ${b.items.map(M=>tt(M))}
            </div>`}
      </section>`})}`}function Je(b,v){return c`<div
      class="mon2-item"
      data-bead-id=${b.id}
      data-drag-kind="parallel"
      data-root-dir=${b.root_dir}
      data-row-index=${v}
      data-queue-index=${String(b.queue_index??0)}
    >
      ${qn(x(b),{actions:yo(b,{nudgeable:!0})})}
    </div>`}function Bt(b,v,M,f){return c`<div
      class="mon2-crow${v.fixed?" mon2-crow--fixed":""}"
      draggable=${v.draggable?"true":"false"}
      data-bead-id=${v.id}
      data-drag-kind="chain"
      data-root-dir=${v.root_dir}
      data-lane-id=${b.lane_id}
      data-row-index=${M}
      data-queue-index=${typeof v.queue_index=="number"?String(v.queue_index):""}
    >
      <span class="mon2-crow__seq" aria-hidden="true"
        >${Dv(v.seq)}</span
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
    </div>`}function kt(b){let v=R.cross_lanes_revision!==null,M=K(b.lane_id),f=M?.held===!0,k=M?.cycle===!0,B=M?M.mismatched:[],ae=N&&N.lane_id===b.lane_id?N.corrected:0;return c`<div class="mon2-clane" data-lane-id=${b.lane_id}>
      <header class="mon2-clane__hd">
        <span class="mon2-clane__name">${b.label}</span>
        <span class="mon2-clane__count">${b.rows.length}</span>
        <span class="mon2-clane__badge mon2-clane__badge--${b.state}"
          >${b.badge}</span
        >
        ${ae>0?c`<span
              class="mon2-clane__corrected"
              title="기존 blocks 의존이 드롭 순서를 이깁니다 — 그 순서로 다시 놓았습니다"
              >의존에 맞춰 ${ae}건 자동 교정</span
            >`:""}
        ${k?c`<span
              class="mon2-clane__cycle"
              title="멤버들의 blocks 의존이 순환합니다 — 어느 순서도 의존을 만족시키지 못합니다"
              >⛔ 의존 사이클 — 자동 교정 불가</span
            >`:""}
        ${f?c`<span
              class="mon2-clane__hold"
              title="멤버 한 명의 의존 자료가 이 스냅샷에 아직 없습니다 — 다음 스냅샷이 채우면 교정합니다"
              >${Ti}</span
            >`:""}
        ${b.draft?c`<button
              type="button"
              class="mon2-clane__confirm"
              data-lane-id=${b.lane_id}
              ?disabled=${!v||!b.can_confirm||f}
              title=${f?Ti:b.can_confirm?"\uC778\uC811 \uC758\uC874\uC744 \uAC78\uACE0 \uBBF8\uC801\uC7AC \uBA64\uBC84\uB97C \uAC01\uC790 \uB808\uD3EC \uBCD1\uB82C \uD050 \uB05D\uC5D0 \uC62C\uB9BD\uB2C8\uB2E4":"\uBA64\uBC84\uAC00 2\uAC1C \uC774\uC0C1\uC774\uC5B4\uC57C \uD655\uC815\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4"}
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
            </div>`:b.rows.map((le,Ue)=>Bt(b,le,Ue,B))}
      </div>
    </div>`}function ht(b,v,M){return c`<div
      class="mon2-item"
      data-bead-id=${v.id}
      data-drag-kind="repo-serial"
      data-root-dir=${v.root_dir}
      data-lane-id=${b.id}
      data-row-index=${M}
      data-queue-index=${String(v.queue_index??0)}
    >
      ${qn(x(v),{actions:yo(v)})}
    </div>`}function Dt(b){if(b.length===0)return"";let v=b.length-1;return`${b[0].id} \uC810\uC720${v>0?` +${v}`:""}`}function Rt(b){return c`<div
      class="mon2-item mon2-item--ghost"
      data-bead-id=${b.id}
    >
      ${qn({id:b.id,title:b.title,lane:"running",draggable:!1,ghost:!0,badges:[b.badge]})}
    </div>`}function Mt(b,v){let M=v.occupants,f=v.cross_wait_peers||[];return{id:v.id,pane_id:"",title:`${b.name} \xB7 \uC9C1\uB82C ${v.index+1}`,rows:[...M.map(k=>Rt(k)),...v.items.map((k,B)=>ht(v,k,B))],count:v.items.length,empty:v.empty===!0,...M.length>0?{badge:c`<span
              class="mon2-lane__occupant"
              title=${M.map(k=>`${k.id} \u2014 ${k.badge}`).join(`
`)}
              >${Dt(M)}</span
            >`,held:!0}:{},cycle:v.cycle,header_control:c`<button
        type="button"
        class="mon2-sec__worker"
        data-root-dir=${b.root_dir}
        title="이 레포의 Worker 탭으로 이동"
      >
        Worker ↗
      </button>`,...f.length>0?{after:c`${f.map(k=>c`<div class="mon2-lane__cross-wait">
                  ⚠ 상호 정지 — ${k.workspace_name}·${k.lane}과 교차 대기
                </div>`)}`}:{}}}function ce(){let b=R.cross_lanes_revision!==null,v=R.chain_lanes.some(M=>M.draft&&M.rows.length===0);return ki({parallel:{rows:R.parallel_rows.map((M,f)=>Je(M,f)),count:R.parallel_rows.length,collapsed:V.isAreaCollapsed("parallel"),drop:{drop:"parallel"}},serial:{lanes:R.queue_groups.flatMap(M=>M.sublanes.serial.map(f=>({...Mt(M,f),drop:{drop:"repo-serial",root_dir:M.root_dir,lane_id:f.id,lane_length:String(f.raw_length)}}))),collapsed:V.isAreaCollapsed("serial"),extra_panes:R.chain_lanes.map(M=>kt(M)),header_control:c`<button
          type="button"
          class="mon2-newlane"
          ?disabled=${v||!b}
          title=${b?v?"\uBE48 \uC5F0\uACB0 \uB808\uC778\uC774 \uC774\uBBF8 \uC788\uC2B5\uB2C8\uB2E4":"\uBE48 \uC5F0\uACB0 \uB808\uC778\uC744 \uD558\uB098 \uB9CC\uB4ED\uB2C8\uB2E4":"\uC5F0\uACB0 \uB808\uC778 \uC800\uC7A5\uC18C\uB97C \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"}
        >
          + 연결 레인
        </button>`,...R.cross_lanes_unreadable?{notice:c`<div class="mon2-clane__unreadable">
                연결 레인 저장소를 읽을 수 없음
              </div>`}:{}}})}function be(b){return c`<div class="worker-rungrid">
      ${R.running.length===0?c`<div class="worker-rungrid__empty">실행 세션 없음</div>`:R.running.map(v=>Wl({bead_id:v.id,attempt_id:v.attempt_id||"",title:v.title,runner:v.runner??null,model:v.model??null,effort:v.effort??null,speed:v.speed??null,started_at:v.started_at??null,kind:v.kind,...v.kind==="session"?{updated_at:v.updated_at,session_refs:v.session_refs||[]}:{},workflow:v.workflow||null,resumed_from:v.resumed_from??null,continuation_mode:v.continuation_mode??null,paused:v.run_state==="paused",failed:v.run_state==="failed",parked:v.run_state==="parked",retry_wait:v.run_state==="retry_wait",waiting:v.run_state==="waiting",wait:v.wait||null,retry:v.retry||null,status:v.status,status_label:v.run_state==="failed"?"\uC2E4\uD328":v.run_state==="parked"?"\uC138\uC158 \uB300\uAE30":v.run_state==="retry_wait"?"\uC7AC\uC2DC\uB3C4 \uB300\uAE30":v.run_state==="waiting"?"\uC120\uD589 \uB300\uAE30":void 0,can_pause:v.can_pause!==!1,exec_chips:v.exec_chips||null,usage:v.usage||null,chip_popover:et(v),discard:v.discard,failure:v.failure?{...v.failure,open:P===v.attempt_id}:null},b,q,{monitor:{repo:v.workspace_name,root_dir:v.root_dir,serial_lane_id:v.serial_lane_id,cross_lane_chip:v.cross_lane_chip||null,last_activity:v.last_activity||null,legs:v.legs||[],dependency_chips:Ke(v)}}))}
    </div>`}function Ge(b){let v={runnable:R.runnable,queue:R.queue,running:R.running,pr_wait:R.pr_wait,done:R.done},M=f=>{let k=v[f.lane],B=f.lane==="runnable"?R.runnable_flat?k.length>0?Ce():void 0:R.runnable_sections.length>0?Ce():void 0:f.lane==="queue"?R.queue_groups.length>0||R.chain_lanes.length>0||R.parallel_rows.length>0||R.cross_lanes_unreadable?ce():void 0:f.lane==="running"?be(b):k.length>0?c`${k.map(ae=>qn(x(ae)))}`:void 0;return Vn({id:`monitor-${f.lane}`,lane:f.pane,title:f.title,items:k,count:k.length,src:f.lane==="runnable",empty:f.empty,body:B,live:f.lane==="running"&&k.length>0,collapsible:!0,collapsed:V.isCollapsed(f.pane),controls:f.lane==="runnable"?rt():void 0,header_control:Re(f.lane,k.length)})};if(te){let f=Pv.map(k=>wf.find(B=>B.lane===k)).filter(k=>k!==void 0);return c`<div class="mon2-deck"></div>
        <div class="worker-lanes-host">
          <div class="worker-lanes worker-lanes--mobile mon2-lanes">
            ${wi({live:R.running.length>0,running_body:R.running.length>0?be(b):"",pr_wait_rows:R.pr_wait.map(k=>qn(x(k))),count:R.running.length+R.pr_wait.length})}
            ${f.map(k=>M(k))}
          </div>
        </div>`}return c`<div class="mon2-deck"></div>
      <div class="worker-lanes-host">
        <div class="worker-lanes mon2-lanes">
          ${wf.map(f=>M(f))}
        </div>
      </div>`}function rt(){return c`<div class="worker-filter">
      <label class="worker-filter__tgl" title="blocked 이슈 표시">
        <input
          type="checkbox"
          class="mon-filter__blocked"
          .checked=${y.show_blocked}
        />
        🔒
        blocked${R.runnable_hidden.blocked>0?` ${R.runnable_hidden.blocked}`:""}
      </label>
      <div
        class="worker-filter__readiness"
        role="group"
        aria-label="준비도 필터"
      >
        ${es.map(b=>c`<button
              type="button"
              class="mon-filter__readiness worker-filter__chip${y.readiness===b.value?" is-active":""}"
              data-readiness=${b.value}
              aria-pressed=${y.readiness===b.value?"true":"false"}
            >
              ${b.label}
            </button>`)}
        ${R.runnable_hidden.readiness>0?c`<span class="worker-filter__hidden"
              >숨김 ${R.runnable_hidden.readiness}</span
            >`:""}
      </div>
    </div>`}function Re(b,v){return b==="runnable"?c`<select
        class="mon-candidate-sort worker-sort"
        aria-label="후보 정렬"
        title="후보 정렬"
        .value=${C}
      >
        ${Jo.map(M=>c`<option
              value=${M.value}
              ?selected=${C===M.value}
            >
              ${M.label}
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
        ${Qr.map(M=>c`<option value=${M.value} ?selected=${_===M.value}>
              ${M.label}
            </option>`)}
      </select>`:""}function E(b){let v=o&&o.get?o.get():null,M=o&&o.getWorkspacesState?o.getWorkspacesState():[],f=b===void 0?o&&o.crossLanes?o.crossLanes():void 0:b,k={done_since:Lr(_,d()),running_sort:m,candidate_filter:y,candidate_sort:C};return f!==void 0&&(k.cross_lanes=f),yr(v,M,k)}function L(){let b=d();R=E(),z=null,se=new Map;for(let v of[...R.runnable,...R.queue,...R.running,...R.pr_wait,...R.done])!v.non_occupying&&!se.has(v.id)&&se.set(v.id,v);dt(Ge(b),F),fe()?.render(),ne(),_e()}function ne(){let b=new Map;for(let v of R.queue_groups)b.set(v.root_dir,v.auto_advance);for(let v of Array.from(F.querySelectorAll(".worker-wait__area--parallel .worker-mini__repo"))){let M=v.closest(".mon2-item")?.getAttribute("data-root-dir")||"",f=b.get(M);typeof f=="boolean"&&v.setAttribute("title",`${v.textContent||""} \xB7 ${f?"\uC790\uB3D9\uD654 \uCF1C\uC9D0":"\uC790\uB3D9\uD654 \uAEBC\uC9D0"}`)}}function fe(){if(he)return he;let b=F.querySelector(".mon2-deck");return b?(he=vf(b,{workspacesState:()=>o&&o.getWorkspacesState?o.getWorkspacesState():[],doneItems:()=>R.done,rangeLabel:Ne,transport:i,implPresetStore:t.execPresetStore,gotoWorkerTab:yt,onFocusChange:v=>{Y=v,_e()}}),he):null}function _e(){F.classList.toggle("has-focus",Y!==null);for(let b of Array.from(F.querySelectorAll(".mon2-sec[data-root-dir]")))b.classList.toggle("is-focus",Y!==null&&b.getAttribute("data-root-dir")===Y);for(let b of Array.from(F.querySelectorAll(".mon2-item[data-bead-id], .rtile[data-bead-id], .worker-mini[data-bead-id], .worker-card[data-bead-id]"))){let v=se.get(b.getAttribute("data-bead-id")||"");b.classList.toggle("is-focus",Y!==null&&!!v&&v.root_dir===Y)}for(let b of Array.from(F.querySelectorAll(".mon2-crow[data-root-dir]")))b.classList.toggle("is-focus",Y!==null&&b.getAttribute("data-root-dir")===Y)}function De(b,v){let M=s?s():void 0;if(!v||!M||v===M||!a){r(b);return}a(v).then(()=>{r(b)}).catch(f=>{n("workspace switch for %s failed: %o",v,f)})}function yt(b){if(!b)return;let v=s?s():void 0,M=()=>{try{u?.gotoView("worker")}catch(f){n("gotoView(worker) failed: %o",f)}};if(!a||v&&v===b){M();return}a(b).then(M).catch(f=>{n("workspace switch for %s failed: %o",b,f),ge("\uB808\uD3EC \uC804\uD658\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error")})}function xt(b){mn(b).then(v=>{ge(v?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",v?"success":"error",1400)})}function bt(b){let v=se.get(b)||null;return{item:v,root_dir:v?v.root_dir:"",revision:v?v.expected_revision:0}}async function Ut(b,v,M){if(b!=="dep-add")return;let f=R.chain_lanes.find(k=>k.rows.some(B=>B.id===v));!f||!f.rows.some(k=>k.id===M)||await J(k=>jd(f.lane_id,k),"",[{type:b,a:v,b:M}])}function wt(){return(o&&o.crossLanes?o.crossLanes():null)??null}async function qt(b,v){if(b==="run"){await Xt(v);return}if(b==="stop"){await Jt(v);return}if(b==="create"){await J(M=>ll(null,M),"");return}if(b==="remove"){let M=Bd(v,G());if(M!==null&&!p(M))return;await J(f=>Fd(v,f),"");return}await J(M=>b==="confirm"?qd(v,M):Nd(v,M),"")}function At(b){let v=new Map;for(let M of b.rows){let f=R.owner_of[M.id]||M.root_dir;typeof f!="string"||f.length===0||v.set(f,[...v.get(f)||[],M.id])}return v}async function Xt(b){let v=R.chain_lanes.find(B=>B.lane_id===b);if(!v||R.cross_lanes_revision===null){L();return}ve();let M=new Map,f=new Map,k=At(v);for(let B of v.rows){if(B.fixed||typeof B.queue_index=="number")continue;let ae=R.owner_of[B.id]||B.root_dir;if(typeof ae!="string"||ae.length===0){ge(`${B.id}\uC758 \uB808\uD3EC\uB97C \uC54C \uC218 \uC5C6\uC5B4 \uC801\uC7AC\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4`,"error"),L();return}let le=f.get(ae)??0;if(await re("worker-queue-place",{bead_id:B.id,lane:"parallel",index:(R.parallel_raw_length[ae]??0)+le},ae,M,{bead_id:B.id})===null){L();return}f.set(ae,le+1)}for(let[B,ae]of k)if(await re("worker-queue-arm",{bead_ids:ae,lane_id:b},B,M,{bead_id:ae[0]})===null){ge("\uC77C\uBD80 \uB808\uD3EC\uC5D0\uC11C \uC9C4\uD589\uC744 \uCF1C\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 \u2014 [\u25B6 \uC774\uC5B4\uC11C \uC9C4\uD589]\uC73C\uB85C \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC138\uC694","error"),L();return}L()}async function Jt(b){let v=R.chain_lanes.find(f=>f.lane_id===b);if(!v||R.cross_lanes_revision===null){L();return}ve();let M=new Map;for(let[f,k]of At(v))if(await re("worker-queue-disarm",{lane_id:b},f,M,{bead_id:k[0]})===null)break;L()}async function Ot(b,v){let{root_dir:M,revision:f}=bt(b);if(M.length===0){L();return}await re("worker-queue-disarm",{bead_ids:[b],lane_id:v},M,new Map([[M,f]]),{bead_id:b}),L()}async function St(b,v){let M=se.get(b);if(!M){L();return}let f={kind:"candidate",bead_id:b,root_dir:M.root_dir};if(v==="new-lane"){await J(k=>ll({bead_id:b,root_dir:M.root_dir},k),b);return}if(v.startsWith("lane:")){let k=v.slice(5);if(!R.chain_lanes.find(ae=>ae.lane_id===k)){L();return}await J(ae=>Ri(f,{kind:"chain",lane_id:k,marker_index:(ae.cross_lanes.get(k)?.entries??[]).length},ae),b);return}if(v.startsWith("serial:")){let k=v.slice(7),B=(M.place_lanes||[]).find(ae=>ae.id===k);await ut(f,{kind:"repo-serial",root_dir:M.root_dir,lane_id:k,index:B?B.index:0});return}await ut(f,{kind:"parallel",marker_index:R.parallel_rows.length})}async function Gt(b,v){let M=R.parallel_rows,f=M.findIndex(ft=>ft.id===b);if(f<0)return;let k=M[f].root_dir,B=[];M.forEach((ft,mt)=>{ft.root_dir===k&&B.push(mt)});let ae=B.indexOf(f),le=B[ae+v];if(typeof le!="number")return;let Ue=v===-1?le:B[ae+2]??Math.min(M.length,le+1);await ut({kind:"parallel",bead_id:b,root_dir:k,queue_index:M[f].queue_index??0},{kind:"parallel",marker_index:Ue})}async function tn(b){for(let v of R.chain_lanes){let M=v.rows.find(f=>f.id===b);if(M){await ut({kind:"chain",bead_id:b,root_dir:M.root_dir,lane_id:v.lane_id,...typeof M.queue_index=="number"?{queue_index:M.queue_index}:{}},{kind:"parallel",marker_index:R.parallel_rows.length});return}}}function rn(b){return{runner:b.runner||void 0,model:b.model||void 0,effort:b.effort||void 0,status:b.run_state==="running"?"running":b.run_state,worktree:b.root_dir}}function zt(b,v){let{item:M,root_dir:f,revision:k}=bt(v),B=M?.attempt_id||"",ae=b.classList;if(ae.contains("worker-mini__rowops-up")||ae.contains("worker-mini__rowops-down")){Gt(v,ae.contains("worker-mini__rowops-up")?-1:1);return}if(ae.contains("worker-mini__rowops-remove")){pe("worker-queue-remove",{bead_id:v},f,k);return}if(ae.contains("mon2-crow__detach")){tn(v);return}if(ae.contains("worker-dep__open")){De(b.getAttribute("data-dep-id")||"",b.getAttribute("data-root-dir")||"");return}if(ae.contains("mon2-arm__release")){Ot(v,b.getAttribute("data-lane-id")||"");return}if(ae.contains("mon-lane__chip")){let le=b.getAttribute("data-lane-id")||"";F.querySelector(`.mon2-clane[data-lane-id="${le}"]`)?.scrollIntoView({block:"nearest"});return}if(ae.contains("judgement-chip")){let le=b.getAttribute("data-chip-key")||"";le&&U.toggle({bead_id:v,chip_key:le});return}if(ae.contains("rtile__failure-badge")){P=P===B?null:B,L();return}if(ae.contains("rtile__attempt-copy")){let le=b.getAttribute("data-attempt-id")||"";le&&mn(le).then(Ue=>{ge(Ue?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",Ue?"success":"error",1400)});return}if(ae.contains("worker-card__place")){I=I===v?null:v,L();return}if(ae.contains("worker-card__place-cancel")){I=null,L();return}if(ae.contains("worker-card__place-lane")){let le=b.getAttribute("data-lane")||"parallel";I=null,St(v,le);return}if(ae.contains("rtile__session")){if(M&&M.kind==="session"){let le=(M.session_refs||[]).find(Ue=>Ue&&Ue.current===!0);le&&(X.hidden=!1,Ie.open(io(le,v,"in_progress",f)),L());return}q=B,B&&M&&(X.hidden=!1,Ie.open({attempt_id:B,root_dir:f,meta:rn(M)})),L();return}if(ae.contains("rtile__pause")){He("worker-attempt-pause",{attempt_id:B},f);return}if(ae.contains("rtile__resume")){so({context:{bead_id:v,kind:b.dataset.resumeKind==="settlement"?"settlement":"session",tuple:M?En(M):""},transport:le=>pe("worker-attempt-resume",{attempt_id:B,...le},f,ye.get(f)?.revision??bt(v).revision,!1)});return}if(ae.contains("rtile__parked-retry")){He("worker-parked-retry",{bead_id:v,attempt_id:B},f).then(le=>{le&&le.ok===!1&&ge(`\uC7AC\uC2DC\uB3C4 \uAC70\uBD80: ${le.reason==="not_latest"?"\uC774 bead\uC5D0 \uB354 \uC0C8\uB85C\uC6B4 \uC2DC\uB3C4\uAC00 \uC788\uC2B5\uB2C8\uB2E4":le.reason||""}`,"error")});return}if(ae.contains("rtile__discard-abandon")){let le={kind:b.dataset.operationKind||"",last_error:b.dataset.lastError||""};if(!p(Vo(v,le)))return;Qe({bead_id:v,operation_id:b.dataset.operationId||""},f,k,le);return}if(ae.contains("rtile__discard")){let le=b.dataset.confirmation==="merged"?"merged":"unmerged";if(!p(Yo(v,le)))return;Be({bead_id:v,...B?{attempt_id:B}:{},...b.dataset.operationId?{operation_id:b.dataset.operationId}:{}},f,k);return}if(ae.contains("worker-mini__merge")){let le=Se(f,v);le?.mismatch&&le.continuation===null?je(f,v,k,le.mismatch):pe("worker-merge-queue-add",{bead_id:v},f,k);return}if(ae.contains("worker-mini__merge-cancel")){pe("worker-merge-queue-remove",{bead_id:v},f,k);return}if(ae.contains("worker-mini__discard-abandon")){let le={kind:b.dataset.operationKind||"",last_error:b.dataset.lastError||""};if(!p(Vo(v,le)))return;Qe({bead_id:v,operation_id:b.dataset.operationId||""},f,k,le);return}if(ae.contains("worker-mini__discard")){let le=b.dataset.discardMode==="merged"?"merged":"unmerged";if(!p(Yo(v,le)))return;Be({bead_id:v,...b.dataset.attemptId?{attempt_id:b.dataset.attemptId}:{},...b.dataset.operationId?{operation_id:b.dataset.operationId}:{}},f,k);return}if(ae.contains("worker-mini__revise-fix")){me("worker-revise-fix",{bead_id:v},f,k);return}ae.contains("worker-mini__revise-approve")&&pe("worker-revise-approve",{bead_id:v},f,k)}function on(b){let v=Ze.consumeClickSuppression(),M=b.target;if(!M||typeof M.closest!="function"||M.closest("dialog")||M.closest(".worker-drawer-overlay")||M.closest("a"))return;let f=M.closest(".worker-card__id, .worker-mini__id, .rtile__id");if(f){b.preventDefault();let Pe=M.closest(".mon2-item, .rtile, .mon2-crow, .worker-mini")?.getAttribute("data-bead-id")||f.textContent?.trim()||"";Pe&&xt(Pe);return}let k=M.closest(".worker-mini__repo, .worker-card__repo, .mon2-sec__worker");if(k){b.preventDefault();let $=k.getAttribute("data-root-dir")||se.get(M.closest(".mon2-item, .rtile, .worker-mini")?.getAttribute("data-bead-id")||"")?.root_dir||k.getAttribute("title")||"";yt($);return}let B=M.closest(".mon2-sec__toggle");if(B){b.preventDefault(),xe(B.getAttribute("data-root-dir")||"");return}let ae=M.closest(".worker-pane__toggle[data-lane]");if(ae){b.preventDefault();let $=ae.getAttribute("data-lane")||"";($==="candidate"||$==="queue"||$==="running"||$==="pr_wait"||$==="done")&&_t($);return}let le=M.closest(".worker-wait__area-toggle[data-area]");if(le){b.preventDefault(),pt(le.getAttribute("data-area")||"parallel");return}if(M.closest(".mon2-newlane")){b.preventDefault(),qt("create","");return}let Ue=M.closest(".mon2-clane__confirm, .mon2-clane__reapply, .mon2-clane__remove, .mon2-clane__run, .mon2-clane__stop");if(Ue){b.preventDefault();let $=Ue.getAttribute("data-lane-id")||"",Pe=Ue.classList;qt(Pe.contains("mon2-clane__confirm")?"confirm":Pe.contains("mon2-clane__reapply")?"reapply":Pe.contains("mon2-clane__run")?"run":Pe.contains("mon2-clane__stop")?"stop":"remove",$);return}if(M.closest(".mon-merge-all")){b.preventDefault(),ee();return}let ft=M.closest(".mon-filter__readiness");if(ft){b.preventDefault(),y={...y,readiness:ft.getAttribute("data-readiness")||"all"},kf(y),L();return}let mt=M.closest(".mon2-item, .rtile, .mon2-crow, .worker-mini, .worker-card");if(!mt)return;let it=mt.getAttribute("data-bead-id")||"",A=M.closest("button");if(A){b.preventDefault(),zt(A,it);return}M.closest(".rtile__failure-pop, .chip-popover")||it&&!v&&(b.preventDefault(),De(it,mt.getAttribute("data-root-dir")||bt(it).root_dir))}function we(b){let v=b.target;if(!v||typeof v.closest!="function")return;let M=v.closest(".mon-filter__blocked");if(M){y={...y,show_blocked:M.checked},kf(y),L();return}let f=v.closest(".mon-candidate-sort");if(f){C=Jo.some(ae=>ae.value===f.value)?f.value:"repo_spec",Sv(C),L();return}let k=v.closest(".mon-running-sort");if(k){m=k.value==="repo"?"repo":"started",Iv(m),L();return}let B=v.closest(".mon-done-range");B&&(_=Hn(B.value),Rv(_),L())}function S(b){let v=b.target,M=v&&typeof v.closest=="function"?f=>v.closest(f):()=>null;P&&!M(".rtile__failure-pop, .rtile__failure-badge")&&(P=null,L())}function de(b){b.key!=="Escape"||P===null||(P=null,L())}e.addEventListener("click",on),e.addEventListener("change",we),document.addEventListener("click",S),document.addEventListener("keydown",de),U.attach(),Ze.attach(e);{let b=!0;W=Vi(v=>{if(te=v,b){b=!1;return}L()})}o&&typeof o.subscribe=="function"&&(ke=o.subscribe(()=>{try{ye.clear(),L()}catch{}}));function qe(){Me!==null&&(clearInterval(Me),Me=null)}return{recorrectSharedLane:Ut,load(){n("load"),L(),Me===null&&(Me=setInterval(()=>{try{L()}catch{}},Lv))},pause(){qe()},clear(){qe(),Ze.detach(),ke&&(ke(),ke=null),W&&(W(),W=null),Ie.destroy(),X.hidden=!0,he?.destroy(),he=null,e.removeEventListener("click",on),e.removeEventListener("change",we),document.removeEventListener("click",S),document.removeEventListener("keydown",de),U.detach(),e.replaceChildren()}}}function Of(e,t,n){let r=Wt("views:nav"),{global_element:o,repo_element:i}=e,s=null;function l(_){return m=>{m.preventDefault();let y=_==="monitor"&&a()==="monitor"?"worker":_;r("click tab %s",y),n.gotoView(y)}}function a(){let _=t.getState();return _.view==="worker"||_.view==="monitor"?_.view:"board"}function u(){let _=a();return c`
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
    `}function p(){o&&dt(u(),o),i&&dt(d(),i)}return p(),s=t.subscribe(()=>p()),{destroy(){s&&(s(),s=null),o&&dt(c``,o),i&&dt(c``,i)}}}var If=["bug","feature","task","epic","chore"];function Lf(e){switch((e||"").toString().toLowerCase()){case"bug":return"Bug";case"feature":return"Feature";case"task":return"Task";case"epic":return"Epic";case"chore":return"Chore";default:return""}}var Pf=["Critical","High","Medium","Low","Backlog"];function Df(e,t){let n=document.createElement("dialog");n.id="new-issue-dialog",n.setAttribute("role","dialog"),n.setAttribute("aria-modal","true"),n.innerHTML=`
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
  `,e.appendChild(n);let r=n.querySelector("#new-issue-form"),o=n.querySelector("#new-title"),i=n.querySelector("#new-type"),s=n.querySelector("#new-priority"),l=n.querySelector("#new-labels"),a=n.querySelector("#new-description"),u=n.querySelector("#new-issue-error"),d=n.querySelector("#btn-cancel"),p=n.querySelector("#btn-create"),_=n.querySelector(".new-issue__close");function m(){i.replaceChildren();let I=document.createElement("option");I.value="",I.textContent="\u2014 Select \u2014",i.appendChild(I);for(let P of If){let U=document.createElement("option");U.value=P,U.textContent=Lf(P),i.appendChild(U)}s.replaceChildren();for(let P=0;P<=4;P+=1){let U=document.createElement("option");U.value=String(P);let Y=Pf[P]||"Medium";U.textContent=`${P} \u2013 ${Y}`,s.appendChild(U)}}m();function y(){try{typeof n.close=="function"?n.close():n.removeAttribute("open")}catch{n.removeAttribute("open")}}function C(I){o.disabled=I,i.disabled=I,s.disabled=I,l.disabled=I,a.disabled=I,d.disabled=I,p.disabled=I,p.textContent=I?"Creating\u2026":"Create"}function O(){u.textContent=""}function V(I){u.textContent=I}function te(){try{let I=window.localStorage.getItem("beads-ui.new.type");I?i.value=I:i.value="";let P=window.localStorage.getItem("beads-ui.new.priority");P&&/^\d$/.test(P)?s.value=P:s.value="2"}catch{i.value="",s.value="2"}}function W(){let I=i.value||"",P=s.value||"";I.length>0&&window.localStorage.setItem("beads-ui.new.type",I),P.length>0&&window.localStorage.setItem("beads-ui.new.priority",P)}async function q(){O();let I=String(o.value||"").trim();if(I.length===0){V("Title is required"),o.focus();return}let P=Number(s.value||"2");if(!(P>=0&&P<=4)){V("Priority must be 0..4"),s.focus();return}let U=String(i.value||""),Y=String(a.value||""),N={title:I};U.length>0&&(N.type=U),String(P).length>0&&(N.priority=P),Y.length>0&&(N.description=Y),C(!0);try{await t("create-issue",N)}catch{C(!1),V("Failed to create issue");return}W(),C(!1),y()}return n.addEventListener("cancel",I=>{I.preventDefault(),y()}),_.addEventListener("click",()=>y()),d.addEventListener("click",()=>y()),n.addEventListener("keydown",I=>{I.key==="Enter"&&(I.ctrlKey||I.metaKey)&&(I.preventDefault(),q())}),r.addEventListener("submit",I=>{I.preventDefault(),q()}),{open(){r.reset(),O(),te();try{"showModal"in n&&typeof n.showModal=="function"?n.showModal():n.setAttribute("open","")}catch{n.setAttribute("open","")}setTimeout(()=>{try{o.focus()}catch{}},0)},close(){y()}}}var Mv=[["route","route \uCE69"],["fast_track","\u26A1 fast_track \uCE69"],["pr","PR \uCE69"],["from","\u21A9 from \uCE69"],["blocked","blocked\xB7\uC0AC\uC6A9\uC790 \uB9AC\uBDF0 \uD544\uC694 \uCE69"],["stepper","stepper"]];function qv(e,t){return $a(e,t)?"shown":t.hidden_labels.includes(e)?"hidden_exact":"hidden_prefix"}function Mf(e,t,n){return c`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">라벨 표시</div>
      <p class="settings-dialog__hint-block">
        라벨을 눌러 표시/숨김을 전환합니다. prefix 규칙으로 숨겨진 라벨을 누르면
        그 라벨만 예외로 다시 표시됩니다.
      </p>
      ${t.length===0?c`<div class="settings-dialog__empty">라벨 없음</div>`:c`<div class="settings-dialog__pills">
            ${t.map(r=>{let o=qv(r,e);return c`<button
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
  `}function qf(e,t,n){return c`
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
  `}function Nf(e,t){return c`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">카드 표시 요소</div>
      <div class="settings-dialog__toggles">
        ${Mv.map(([n,r])=>c`<label class="settings-dialog__toggle">
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
  `}var Nv=[{id:"execution",label:"\uC2E4\uD589",glyph:"\u25C6"},{id:"display",label:"\uD45C\uC2DC",glyph:"\u25EB"}];function jf(e,t){let{transport:n,policyStore:r,labelOptions:o}=t,i=t.notify||(oe=>ge(oe,"error",4e3)),s=document.createElement("dialog");s.id="settings-dialog",s.className="settings-dialog",s.setAttribute("role","dialog"),s.setAttribute("aria-modal","true"),s.setAttribute("aria-label","\uC124\uC815"),e.appendChild(s);let l="execution",a=!1,u="",d=null;function p(){if(d)return d;let oe=s.querySelector('[data-pane="execution"]');return oe?(d=na(oe,{root_dir:null,queue:()=>t.queueStore?.get()??null,transport:n,implPresetStore:t.implPresetStore,notify:i,onQueueAdopt:ve=>t.queueStore?.set?.(ve)}),d):null}function _(){return c`
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
              ${Mf(oe,o(),V)}
              ${qf(oe,u,{onDraft:ve=>{u=ve},onAdd:te,onRemove:W})}
              ${Nf(oe,q)}
            `:c`<div class="settings-dialog__empty">
              표시 정책을 불러오는 중…
            </div>`}
      </section>
    `}async function y(oe){let ve=r.get();if(ve)try{let Ne=await n("display-policy-set",{expected_revision:ve.revision,policy:oe(ve)});C(Ne),Ne&&Ne.conflict&&Ne.policy&&(Ne=await n("display-policy-set",{expected_revision:Ne.policy.revision,policy:oe(Ne.policy)}),C(Ne)),Ne&&Ne.conflict&&i("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC")}catch{i("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328")}}function C(oe){oe&&oe.policy&&typeof oe.policy=="object"&&r.set(oe.policy)}function O(oe){y(oe)}function V(oe){let ve=r.get();if(!ve)return;let Ne=!jv(oe,ve);O(F=>Fv(oe,F,Ne))}function te(){let oe=u.trim();oe.length!==0&&(u="",O(ve=>ve.hidden_prefixes.includes(oe)?{hidden_prefixes:ve.hidden_prefixes}:{hidden_prefixes:[...ve.hidden_prefixes,oe]}),I())}function W(oe){O(ve=>({hidden_prefixes:ve.hidden_prefixes.filter(Ne=>Ne!==oe)}))}function q(oe){let ve=r.get();if(!ve)return;let Ne=ve.chips[oe]===!1;O(()=>({chips:{[oe]:Ne}}))}function I(){dt(c`
        <div class="settings-dialog__container">
          <nav
            class="settings-dialog__rail"
            role="tablist"
            aria-orientation="vertical"
          >
            <div class="settings-dialog__rail-title">설정</div>
            ${Nv.map(oe=>c`<button
                  type="button"
                  class="settings-dialog__tab"
                  role="tab"
                  data-tab=${oe.id}
                  aria-selected=${String(l===oe.id)}
                  aria-controls=${`settings-pane-${oe.id}`}
                  @click=${()=>P(oe.id)}
                >
                  <span class="settings-dialog__glyph">${oe.glyph}</span>
                  ${oe.label}
                </button>`)}
            <button
              type="button"
              class="settings-dialog__close"
              aria-label="닫기"
              @click=${K}
            >
              닫기
            </button>
          </nav>
          <div class="settings-dialog__panes">
            ${_()} ${m()}
          </div>
        </div>
      `,s),p()}function P(oe){l=oe,I()}let U=()=>{a=!1,t.onOpenChange?.(!1)};s.addEventListener("close",U),s.addEventListener("cancel",U);let Y=oe=>{oe.target===s&&K()};s.addEventListener("click",Y);let N=null;r.subscribe&&(N=r.subscribe(()=>{a&&I()}));let j=null;t.implPresetStore?.subscribe&&(j=t.implPresetStore.subscribe(()=>{a&&d?.render()}));function z(oe="execution"){a||(a=!0,t.onOpenChange?.(!0),l=oe,u="",I(),typeof s.showModal=="function"?s.showModal():s.setAttribute("open",""),p()?.load())}function K(){a&&(a=!1,t.onOpenChange?.(!1),typeof s.close=="function"?s.close():s.removeAttribute("open"))}return{open:z,close:K,sessionDraft:()=>d?.sessionDraft()??{},destroy(){a=!1,s.removeEventListener("close",U),s.removeEventListener("cancel",U),s.removeEventListener("click",Y),N&&(N(),N=null),j&&(j(),j=null),d?.destroy(),d=null,s.remove()}}}function jv(e,t){return t.visible_labels.includes(e)?!0:t.hidden_labels.includes(e)?!1:!t.hidden_prefixes.some(n=>n.length>0&&e.startsWith(n))}function Fv(e,t,n){if(!n)return{hidden_labels:t.hidden_labels.includes(e)?t.hidden_labels:[...t.hidden_labels,e],visible_labels:t.visible_labels.filter(i=>i!==e)};let r=t.hidden_labels.filter(i=>i!==e);return t.hidden_prefixes.some(i=>i.length>0&&e.startsWith(i))?{hidden_labels:r,visible_labels:t.visible_labels.includes(e)?t.visible_labels:[...t.visible_labels,e]}:{hidden_labels:r}}var Bv=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],Ff="usage-meter-card",Uv="usage-meter-layer",Hl=600,Wv=["token_expired","relogin_required"];function Bf(e){return String(e).padStart(2,"0")}function zv(e,t){let n=Math.max(0,Math.ceil((e-t)/6e4)),r=Math.floor(n/1440),o=Math.floor(n%1440/60),i=n%60;return r>0?`${r}d${o>0?` ${o}h`:""}`:o>0?`${o}h${i>0?` ${i}m`:""}`:`${i}m`}function Uf(e,t=Date.now()){let n=Date.parse(e);if(!Number.isFinite(n))return"";let r=new Date(n),o=new Date(t),i=`${Bf(r.getHours())}:${Bf(r.getMinutes())}`,l=r.getFullYear()===o.getFullYear()&&r.getMonth()===o.getMonth()&&r.getDate()===o.getDate()?i:`${Bv[r.getMonth()]} ${r.getDate()} ${i}`;return`${zv(n,t)} \xB7 ${l}`}function Hv(e){let t=Math.max(0,Math.floor(e));return t<60?`${t}\uCD08 \uC804`:t<3600?`${Math.floor(t/60)}\uBD84 \uC804`:`${Math.floor(t/3600)}\uC2DC\uAC04 \uC804`}function Wf(e){return e>=85?"usage-meter__window--danger":e>=60?"usage-meter__window--warn":"usage-meter__window--success"}function zf(e){let t=typeof e=="number"&&Number.isFinite(e)?e:0;return Math.min(100,Math.max(0,t))}var Hf=[{key:"claude",label:"Claude",endpoint:"/api/claude-usage",switch_endpoint:"/api/claude-account/switch",tool:"cswap"},{key:"codex",label:"Codex",endpoint:"/api/codex-usage",switch_endpoint:"/api/codex-account/switch",tool:"codex-auth"}];function Gf(e){let t=[];for(let n of e){if(!n||typeof n!="object")continue;let r=n;typeof r.key!="string"||r.key.length===0||typeof r.pct!="number"||!Number.isFinite(r.pct)||t.push({key:r.key,pct:r.pct,resetsAt:typeof r.resetsAt=="string"?r.resetsAt:""})}return t}function Kv(e){if(!e||typeof e!="object")return null;let t=e;return!Number.isInteger(t.number)||t.number<=0||typeof t.email!="string"||t.email.length===0||typeof t.status!="string"||t.status.length===0||typeof t.active!="boolean"||!Array.isArray(t.windows)?null:{number:t.number,email:t.email,alias:typeof t.alias=="string"&&t.alias.length>0?t.alias:null,plan:typeof t.plan=="string"&&t.plan.length>0?t.plan:null,active:t.active,status:t.status,windows:Gf(t.windows),fetchedAt:typeof t.fetchedAt=="string"?t.fetchedAt:null,ageSeconds:typeof t.ageSeconds=="number"&&Number.isFinite(t.ageSeconds)?t.ageSeconds:null}}function Gv(e,t){if(!e||typeof e!="object")return null;let n=e,r=[];if(Array.isArray(n.accounts))for(let i of n.accounts){let s=Kv(i);s&&r.push(s)}let o=n.available===!0&&Array.isArray(n.windows);return!o&&r.length===0?null:{available:o,windows:o?Gf(n.windows):[],ageSeconds:typeof n.ageSeconds=="number"&&Number.isFinite(n.ageSeconds)?n.ageSeconds:null,accounts:r,receivedAtMs:t,held:!1}}function Yv(e,t){if(!e||typeof e!="object")return{kind:"error"};let n=Gv(e,t);return n?{kind:"ok",snapshot:n}:Array.isArray(e.accounts)?{kind:"empty"}:{kind:"error"}}function Yf(e,t){return(e.ageSeconds===null?0:e.ageSeconds)+Math.max(0,t-e.receivedAtMs)/1e3}function Vv(e,t){return!e.held||Yf(e,t)<=Hl?e:{...e,available:!1,windows:[],accounts:[]}}function Kf(e,t){return`${e}:${t}`}function Vf(e){let t=!1,n=null,r=new Map,o=null,i=new Map,s=new Map,l=0,a=null;function u(){dt(c``,e),e.hidden=!0,p()}function d(){if(a===null){let F=e.ownerDocument;a=F.createElement("div"),a.id=Uv,a.className="usage-meter__layer",F.body.appendChild(a)}return a}function p(){a!==null&&(dt(c``,a),a.remove(),a=null)}function _(F){n!==F&&(n===null&&(document.addEventListener("mousedown",y),document.addEventListener("keydown",O),window.addEventListener("resize",C)),n=F)}function m(){n!==null&&(n=null,document.removeEventListener("mousedown",y),document.removeEventListener("keydown",O),window.removeEventListener("resize",C))}function y(F){let X=F.target;X&&(e.contains(X)||a!==null&&a.contains(X))||(m(),K())}function C(){K()}function O(F){F.key==="Escape"&&(m(),K())}function V(F){n===F?m():_(F),K()}function te(){m(),K()}async function W(F,X){if(r.has(F.key))return;let Ae=Kf(F.key,X);r.set(F.key,X),s.delete(Ae),K();let Ee=null;try{Ee=await(await fetch(F.switch_endpoint,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({number:X})})).json()}catch{Ee=null}if(t)return;if(r.delete(F.key),!Ee||Ee.ok!==!0){let se=Ee&&typeof Ee.error=="string"&&Ee.error.length>0?Ee.error:"network_error";s.set(Ae,{kind:"error",text:`\uC804\uD658 \uC2E4\uD328 \u2014 ${se}`}),K();return}let R=Array.isArray(Ee.warnings)?Ee.warnings.filter(se=>typeof se=="string"&&se.length>0):[];R.length>0&&s.set(Ae,{kind:"warn",text:R.join(" \xB7 ")}),K(),await Ne()}function q(F,X,Ae,Ee){let R=zf(F.pct),ye=`resets ${Uf(F.resetsAt,Ee)}${X?` \xB7 ${Ae}`:""}`;return c`<span
      class="usage-meter__window ${Wf(R)}"
      style=${`--progress: ${R}%`}
      title=${ye}
    >
      <span class="usage-meter__label">${F.key}</span>
      <span class="usage-meter__track" aria-hidden="true">
        <span class="usage-meter__fill"></span>
      </span>
      <span class="usage-meter__pct">${R}%</span>
    </span>`}function I(F,X,Ae){let Ee=Yf(X,Ae),R=X.available&&(X.held||Ee>Hl),se=R?`${Math.floor(Ee/60)}\uBD84 \uC804 \uCE21\uC815`:"",ye=X.accounts.filter(Ie=>!Ie.active).length,ke=`usage-meter__group${R?" usage-meter__group--stale":""}`,Me=c`<span class="usage-meter__provider"
        >${F.label}</span
      >
      ${X.available?X.windows.map(Ie=>q(Ie,R,se,Ae)):c`<span class="usage-meter__empty">사용량 없음</span>`}
      ${ye>0?c`<span class="usage-meter__badge">+${ye}</span>`:""}`;if(X.accounts.length===0)return c`<span
        class=${ke}
        aria-label=${`${F.label} usage`}
        >${Me}</span
      >`;let he=n===F.key;return c`<button
      type="button"
      class=${`usage-meter__toggle ${ke}`}
      aria-label=${`${F.label} usage`}
      aria-expanded=${he?"true":"false"}
      aria-controls=${Ff}
      @click=${()=>V(F.key)}
    >
      ${Me}
    </button>`}function P(F,X){return c`<span class="usage-meter" aria-label="Usage">
      ${F.map(Ae=>I(Ae.provider,Ae.snapshot,X))}
    </span>`}function U(F,X){let Ae=zf(F.pct),Ee=Uf(F.resetsAt,X);return c`<span
      class="usage-meter__account-window ${Wf(Ae)}"
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
    </span>`}function Y(F,X){return Wv.includes(X)?`\uD1A0\uD070 \uB9CC\uB8CC \u2014 ${F.tool} \uC7AC\uB85C\uADF8\uC778 \uD544\uC694`:"\uC0AC\uC6A9\uB7C9 \uC5C6\uC74C"}function N(F,X,Ae){let Ee=X.status==="ok",R=typeof X.ageSeconds=="number"&&X.ageSeconds>Hl,se=s.get(Kf(F.key,X.number)),ye=r.get(F.key),ke=ye!==void 0,Me=ye===X.number,he=["usage-meter__account"];return X.active&&he.push("usage-meter__account--active"),Ee||he.push("usage-meter__account--unavailable"),R&&he.push("usage-meter__account--stale"),c`<div class=${he.join(" ")}>
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
              >${Hv(X.ageSeconds)}</span
            >`}
        ${X.active?"":c`<button
              type="button"
              class="usage-meter__switch"
              ?disabled=${ke}
              @click=${()=>{W(F,X.number)}}
            >
              ${Me?"\uC804\uD658 \uC911\u2026":"\uC804\uD658"}
            </button>`}
      </div>
      ${Ee?c`<div class="usage-meter__account-windows">
            ${X.windows.map(Ie=>U(Ie,Ae))}
          </div>`:c`<div class="usage-meter__account-status">
            ${Y(F,X.status)}
          </div>`}
      ${se===void 0?"":c`<div
            class="usage-meter__account-message usage-meter__account-message--${se.kind}"
          >
            ${se.text}
          </div>`}
    </div>`}function j(F,X,Ae){let Ee=X.accounts.filter(R=>R.active).length;return c`<section class="usage-meter__section">
      <h2 class="usage-meter__section-title">
        ${F.label} · 활성 ${Ee} / 전체
        ${X.accounts.length}
      </h2>
      ${X.accounts.map(R=>N(F,R,Ae))}
    </section>`}function z(F,X){return c`<div
      class="usage-meter__card"
      id=${Ff}
      role="dialog"
      aria-label=${`${F.provider.label} \uACC4\uC815 \uC0AC\uC6A9\uB7C9`}
    >
      ${j(F.provider,F.snapshot,X)}
      <p class="usage-meter__note">전환은 새로 시작하는 세션부터 적용됩니다.</p>
    </div>`}function K(){let F=Date.now(),X=[];for(let Ee of Hf){let R=i.get(Ee.key);R&&X.push({provider:Ee,snapshot:Vv(R,F)})}if(X.length===0){m(),u();return}let Ae=X.find(Ee=>Ee.provider.key===n&&Ee.snapshot.accounts.length>0);Ae||m(),dt(P(X,F),e),e.hidden=!1,Ae?oe(Ae,F):p()}function oe(F,X){let Ae=d(),Ee=e.getBoundingClientRect(),R=e.ownerDocument.documentElement.clientWidth;Ae.style.setProperty("--usage-meter-anchor-top",`${Ee.bottom}px`),Ae.style.setProperty("--usage-meter-anchor-right",`${Math.max(0,R-Ee.right)}px`),dt(c`<div
          class="usage-meter__scrim"
          aria-hidden="true"
          @mousedown=${te}
        ></div>
        ${z(F,X)}`,Ae)}async function ve(F){try{let X=await fetch(F.endpoint);return X.ok?Yv(await X.json(),Date.now()):{kind:"error"}}catch{return{kind:"error"}}}async function Ne(){l+=1;let F=l,X=await Promise.all(Hf.map(async Ae=>({provider:Ae,read:await ve(Ae)})));if(!(t||F!==l)){for(let Ae of X){let Ee=Ae.provider.key;if(Ae.read.kind==="ok"){i.set(Ee,Ae.read.snapshot);continue}if(Ae.read.kind==="empty"){i.delete(Ee);continue}let R=i.get(Ee);R!==void 0&&!R.held&&i.set(Ee,{...R,held:!0})}K()}}return u(),Ne(),o=setInterval(()=>{Ne()},6e4),{destroy(){t=!0,o!==null&&(clearInterval(o),o=null),m(),u()}}}function ks(e){let t=e?.blocked_info;return t&&typeof t=="object"?Array.isArray(t.blockers)?t.blockers.filter(r=>typeof r=="string"&&r.length>0):[]:(Array.isArray(e?.dependencies)?e.dependencies:[]).map(r=>{if(typeof r=="string")return r;if(!r||typeof r!="object")return"";let o=r.type??r.dependency_type;return o!==void 0&&o!=="blocks"?"":r.depends_on_id||r.id||""}).filter(Boolean)}var Zf="bdui.worker.candidate_sort",ws=Object.freeze([{id:"spec",label:"spec \uC6B0\uC120",chain:[{key:"spec",dir:"desc"},{key:"created",dir:"asc"}]},{id:"bottleneck",label:"\uBCD1\uBAA9 \uC6B0\uC120",chain:[{key:"priority",dir:"asc"},{key:"dependents",dir:"desc"},{key:"released",dir:"desc"}]},{id:"created",label:"\uCD5C\uC2E0 \uC0DD\uC131",chain:[{key:"created",dir:"desc"},{key:"priority",dir:"asc"}]},{id:"updated",label:"\uCD5C\uC2E0 \uC218\uC815",chain:[{key:"updated",dir:"desc"}]}]),oa=Object.freeze({preset:"spec"}),Jf=3,e_=Object.freeze([{key:"priority",label:"\uC6B0\uC120\uC21C\uC704"},{key:"dependents",label:"\uD6C4\uC18D \uC218"},{key:"released",label:"\uD574\uC81C \uC2DC\uAC01"},{key:"spec",label:"spec \uC720\uBB34"},{key:"created",label:"\uC0DD\uC131"},{key:"updated",label:"\uC218\uC815"}]);function Qf(e){return ws.some(t=>t.id===e)}function Xf(e){let t=ws.find(n=>n.id===e);return t?t.chain.map(n=>({...n})):[]}function Qv(e,t){return e.length===t.length&&e.every((n,r)=>n.key===t[r].key&&n.dir===t[r].dir)}function $s(e){return e&&"preset"in e?Xf(e.preset):e&&Array.isArray(e.chain)?e.chain.map(t=>({...t})):Xf("spec")}function Kl(e){return e&&"preset"in e?e.preset:null}function Hr(e){if(typeof e=="string"){let i;try{i=JSON.parse(e)}catch{return Qf(e)?{preset:e}:oa}return Hr(i)}if(!e||typeof e!="object")return oa;let t=e;if(Qf(t.preset))return{preset:t.preset};let n=t.chain;if(!Array.isArray(n)||n.length===0||n.length>Jf||!n.every(ya))return oa;let r=[];for(let i of n)r.some(s=>s.key===i.key)||r.push({key:i.key,dir:i.dir});let o=ws.find(i=>Qv(i.chain,r));return o?{preset:o.id}:{chain:r}}function t_(){try{return Hr(window.localStorage.getItem(Zf))}catch{return oa}}function Gl(e){try{window.localStorage.setItem(Zf,JSON.stringify(e))}catch{}}function n_(e,t,n){let r=e.map(a=>({...a}));if(!n)return r.slice(0,t);if(!Object.prototype.hasOwnProperty.call(Ds,n))return r;let o=n;if(r.slice(0,t).some(a=>a.key===o))return r.slice(0,t);let i={key:o,dir:r[t]&&r[t].key===o?r[t].dir:Ds[o]},s=r.slice(0,t),l=r.slice(t+1).filter(a=>a.key!==o);return[...s,i,...l].slice(0,Jf)}function r_(e,t){return e.map((n,r)=>r===t?{key:n.key,dir:n.dir==="asc"?"desc":"asc"}:{...n})}function Xv(e){let t=new Set(e.map(l=>l.id)),n=new Map,r=new Map;for(let l of e){let a=ks(l).filter(u=>t.has(u));n.set(l.id,a);for(let u of a){let d=r.get(u);d?d.push(l):r.set(u,[l])}}let o=new Set,i=[],s=l=>{o.add(l.id),i.push(l);for(let a of r.get(l.id)??[])!o.has(a.id)&&(n.get(a.id)??[]).every(u=>o.has(u))&&s(a)};for(;i.length<e.length;){let l=e.find(a=>!o.has(a.id)&&(n.get(a.id)??[]).every(u=>o.has(u)));s(l??e.find(a=>!o.has(a.id)))}return i}function o_(e,t){let n=Array.isArray(e)?e.slice():[];return n.sort(Lc($s(t))),Xv(n)}function s_(e,t){let n=new Map;if(!e||typeof e!="object")return n;let r=e,o=[],i=new Set;for(let s of t){if(i.has(s.id))continue;i.add(s.id);let l=r[s.id];if(!l||!Array.isArray(l.scope))continue;let a=l.scope.filter(u=>typeof u=="string"&&u.length>0);if(a.length===0){n.set(s.id,{overlaps:[],scope_missing:!0});continue}n.set(s.id,{overlaps:[],scope_missing:!1}),o.push({member:s,scope:a})}for(let s=0;s<o.length;s+=1)for(let l=s+1;l<o.length;l+=1){let a=ii(o[s].scope,o[l].scope);if(a.length===0)continue;let u=o[s].member,d=o[l].member;n.get(u.id)?.overlaps.push({id:d.id,title:d.title,location_label:d.location_label,prefixes:a}),n.get(d.id)?.overlaps.push({id:u.id,title:u.title,location_label:u.location_label,prefixes:a})}return n}var i_=new Set(["sh","bash","zsh","dash","ksh"]),a_=/('(?:[^']*)'|"(?:\\.|[^"\\])*"|#.*|\$(?:\{[^}\n]*\}|[A-Za-z_][A-Za-z0-9_]*|[?#@*!$0-9-])|\b(?:if|then|else|elif|fi|for|while|until|do|done|case|esac|in|function|select|time)\b)/g;function l_(e){let t=e.split("/");return t[t.length-1]||""}function Zv(e){let t=e.split(`
`,1)[0];if(!t.startsWith("#!"))return!1;let n=t.slice(2).trim().split(/\s+/).filter(Boolean);if(n.length===0)return!1;let r=l_(n[0]);if(r!=="env")return i_.has(r);let o=n.slice(1).find(i=>!i.startsWith("-")&&!i.includes("="));return o!==void 0&&i_.has(l_(o))}function Jv(e){return e.startsWith("#")?"comment":e.startsWith("'")||e.startsWith('"')?"string":e.startsWith("$")?"variable":"keyword"}function ek(e){let t=[],n=0;a_.lastIndex=0;for(let r of e.matchAll(a_)){let o=r.index;o>n&&t.push({text:e.slice(n,o),kind:"plain"}),t.push({text:r[0],kind:Jv(r[0])}),n=o+r[0].length}return n<e.length&&t.push({text:e.slice(n),kind:"plain"}),t.length===0&&t.push({text:e,kind:"plain"}),t}function tk(e){return{bad_request:"\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD\uC774 \uC62C\uBC14\uB974\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.",forbidden:"\uB4F1\uB85D\uB418\uC9C0 \uC54A\uC740 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uC758 \uC2A4\uD06C\uB9BD\uD2B8\uB294 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",lane_not_declared:"\uD604\uC7AC \uACE0\uC815 \uC120\uC5B8\uC5D0 \uD574\uB2F9 \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4.",stale_declaration:"\uC800\uC7A5\uC18C \uC791\uC5C5 \uC120\uC5B8\uC774 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uD654\uBA74\uC5D0\uC11C \uB2E4\uC2DC \uC5F4\uC5B4 \uC8FC\uC138\uC694.",too_large:"\uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uB108\uBB34 \uCEE4\uC11C \uD654\uBA74\uC5D0 \uD45C\uC2DC\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",unsupported_content:"\uD14D\uC2A4\uD2B8 \uD615\uC2DD\uC758 \uC2A4\uD06C\uB9BD\uD2B8\uB9CC \uD45C\uC2DC\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.",unreadable:"\uACE0\uC815\uB41C \uC2A4\uD06C\uB9BD\uD2B8 \uB0B4\uC6A9\uC744 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4."}[e]||"\uC2A4\uD06C\uB9BD\uD2B8\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4."}function c_(e){let t=e.getWorkspacePath,n=e.fetchImpl||globalThis.fetch?.bind(globalThis),r=document.createElement("div");r.className="repo-ops-script-viewer-root",document.body.appendChild(r);let o=null,i="loading",s="",l="",a=0,u=null,d=!1;function p(I,P){return P?ek(I).map(U=>U.kind==="plain"?U.text:c`<span
            class="repo-ops-script-viewer__token repo-ops-script-viewer__token--${U.kind}"
            >${U.text}</span
          >`):I}function _(){if(!o)return c``;let I=i==="ready"&&Zv(s),P=i==="ready"?s.split(`
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
                  ${P.map((U,Y)=>c`<div class="repo-ops-script-viewer__row">
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
    </div>`}function m(){dt(_(),r)}async function y(){if(i!=="ready")return;let I=await mn(s);ge(I?"\uC2A4\uD06C\uB9BD\uD2B8 \uBCF5\uC0AC\uB428":"\uC2A4\uD06C\uB9BD\uD2B8 \uBCF5\uC0AC \uC2E4\uD328",I?"success":"error")}function C(I){I.key==="Escape"&&o&&(I.preventDefault(),W())}function O(){d||(document.addEventListener("keydown",C),d=!0)}function V(){d&&(document.removeEventListener("keydown",C),d=!1)}async function te(I,P=null){let U=++a;O(),o={...I},u=P||(document.activeElement instanceof HTMLElement?document.activeElement:null),i="loading",s="",l="",m(),r.querySelector(".repo-ops-script-viewer__close")?.focus();let N=t?t():"";if(!N){i="error",l="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4.",m();return}if(!n){i="error",l="\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD \uAE30\uB2A5\uC744 \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",m();return}let j="/api/repo-ops-script?workspace="+encodeURIComponent(N)+"&lane="+encodeURIComponent(I.lane)+"&base_sha="+encodeURIComponent(I.base_sha);try{let z=await n(j),K=await z.json().catch(()=>({}));if(U!==a)return;if((t?t():"")!==N){W();return}if(!z.ok||!K||K.ok!==!0){i="error",l=tk(K&&typeof K.error=="string"?K.error:""),m();return}o={lane:K.lane,base_sha:K.base_sha,path:K.path,base_ref:K.base_ref},s=String(K.content),i="ready",m()}catch{if(U!==a)return;i="error",l="\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",m()}}function W(){a+=1,V(),o=null,s="",m();let I=u;u=null,I?.isConnected&&I.focus()}function q(){W(),r.remove()}return{open:te,close:W,destroy:q}}var u_={deploy_not_declared:"\uC120\uC5B8 \uC5C6\uC74C",deploy_opted_out:"\uC774 workspace\uC5D0\uC11C \uBC30\uD3EC \uC2E4\uD589\uC774 \uAEBC\uC838 \uC788\uC74C",deploy_in_flight:"\uBC30\uD3EC \uC9C4\uD589 \uC911",target_unresolved:"\uB300\uC0C1 tip\uC744 \uD655\uC815\uD558\uC9C0 \uBABB\uD568",remote_history_not_monotonic:"\uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC\uC640 \uC6D0\uACA9 \uC774\uB825\uC774 \uAC08\uB77C\uC9D0"},nk=new Set(["queued","running","retry_pending"]);function d_(e){let t=e.queueStore,n=e.transport,r=e.onChanged||(()=>{}),o=e.onOpenScript;function i(){return t&&t.get()||{}}function s(){let j=i();return typeof j.revision=="number"?j.revision:0}function l(j){t&&j&&j.queue&&typeof j.queue=="object"&&t.set(j.queue)}function a(){let j=i().workspace_info;return j&&typeof j=="object"?j:{}}function u(j,z){return c`<span
      class="worker-repo-ops__vd-badge worker-repo-ops__vd-badge--${j}"
      >${z}</span
    >`}function d(j){if(typeof j!="number"||!Number.isFinite(j))return"";let z=j/6e4;return Number.isInteger(z)?`timeout ${z}\uBD84`:`timeout ${Math.round(j/1e3)}\uCD08`}function p(j){let z=d(j);return z?u("config",z):""}function _(j,z,K){return c`<button
      type="button"
      class="worker-repo-ops__vd-cmd worker-repo-ops__vd-cmd--link"
      .textContent=${K.script}
      @click=${oe=>{o&&o({lane:j,base_sha:z.base_sha,path:K.script,base_ref:z.base_ref},oe.currentTarget)}}
    ></button>`}function m(){let j=i().repo_operations;return Array.isArray(j)?j:[]}function y(){let j=a().repo_ops,z=j&&typeof j=="object"?j.repo_id:null;return typeof z=="string"&&z?z:null}function C(){return m().some(j=>j&&j.kind==="deploy"&&nk.has(j.state))}function O(){let j=C(),z=y()===null;return c`<button
      type="button"
      class="worker-repo-ops__deploy-run"
      data-seam="repo-ops-deploy-run"
      ?disabled=${j||z}
      title=${j?"\uBC30\uD3EC \uC9C4\uD589 \uC911":z?"\uC800\uC7A5\uC18C\uB97C \uD655\uC778\uD560 \uC218 \uC5C6\uC74C":"\uC6D0\uACA9 base tip\uC5D0\uC11C \uBC30\uD3EC \uC2A4\uD06C\uB9BD\uD2B8\uB97C 1\uD68C \uC2E4\uD589\uD569\uB2C8\uB2E4"}
      @click=${()=>{P()}}
    >
      배포 실행
    </button>`}function V(){let j=i().repo_ops_opt_out;return{verify:j?.verify===!0,deploy:j?.deploy===!0}}function te(j,z){return c`<label class="worker-repo-ops__lane-run">
      <input
        type="checkbox"
        .checked=${!z}
        @change=${K=>{I(j,!K.target.checked)}}
      />
      이 workspace에서 실행
    </label>`}function W(j){let z=typeof j.base_sha=="string"?j.base_sha:"",K=`${j.source_path||"repo-ops/config.toml"} @ ${j.base_ref||"?"}${z?`@${z.slice(0,7)}`:""}`,oe=V(),ve=!!j.verify&&oe.verify,Ne=!!j.deploy&&oe.deploy;return c`<section class="worker-repo-ops__vd" data-seam="repo-ops">
      <p class="worker-repo-ops__vd-title">
        저장소 작업 선언
        <span class="worker-repo-ops__vd-src">${K}</span>
      </p>
      <div
        class="worker-repo-ops__lane${ve?" worker-repo-ops__lane--skipped":""}"
        data-lane="verify"
      >
        <span class="worker-repo-ops__lane-k">머지 전 검증</span>
        <span class="worker-repo-ops__lane-v"
          >${j.verify?c`${_("verify",j,j.verify)}
              ${p(j.verify.timeout_ms)}
              ${ve?u("skipped","\uC774 workspace\uC5D0\uC11C \uAC74\uB108\uB700"):""}`:c`선언 없음${u("absent","verify \uC5C6\uC774 \uD310\uC815")}`}</span
        >
        <span class="worker-repo-ops__lane-d"
          >${ve?"\uC774 workspace\uC5D0\uC11C\uB294 \uAC80\uC99D \uC5C6\uC774 \uD310\uC815\uD569\uB2C8\uB2E4.":j.verify?"\uBA38\uC9C0 \uC804\uC5D0 \uC774 \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uD1B5\uACFC\uD574\uC57C \uC790\uACA9\uC744 \uC5BB\uC2B5\uB2C8\uB2E4.":"\uBA38\uC9C0 \uC790\uACA9\uC740 PR/base/head \uC2E0\uC120\uB3C4\xB7mergeability\xB7\uB9AC\uBDF0 \uC601\uC218\uC99D\uC73C\uB85C\uB9CC \uD310\uC815\uD569\uB2C8\uB2E4."}</span
        >
        ${j.verify?te("verify",oe.verify):""}
      </div>
      <div
        class="worker-repo-ops__lane${Ne?" worker-repo-ops__lane--skipped":""}"
        data-lane="deploy"
      >
        <span class="worker-repo-ops__lane-k">머지 후 배포</span>
        <span class="worker-repo-ops__lane-v"
          >${j.deploy?c`${_("deploy",j,j.deploy)}
              ${p(j.deploy.timeout_ms)}
              ${Ne?u("skipped","\uC774 workspace\uC5D0\uC11C \uAC74\uB108\uB700"):O()}`:c`선언 없음${u("absent","\uBC30\uD3EC \uC5C6\uC74C")}`}</span
        >
        <span class="worker-repo-ops__lane-d"
          >${Ne?"\uC774 workspace\uC5D0\uC11C\uB294 \uBC30\uD3EC \uC5C6\uC774 \uACE7\uBC14\uB85C \uC815\uB9AC\uB85C \uB118\uC5B4\uAC11\uB2C8\uB2E4.":j.deploy?c`Worker가 <code>.worktrees/.repo-ops-deploy</code>에서 대상
                  SHA로 정렬한 뒤 1회 실행합니다.`:"\uBA38\uC9C0 \uD6C4 \uBC30\uD3EC \uB2E8\uACC4 \uC5C6\uC774 \uACE7\uBC14\uB85C \uC815\uB9AC\uB85C \uB118\uC5B4\uAC11\uB2C8\uB2E4."}</span
        >
        ${j.deploy?te("deploy",oe.deploy):""}
      </div>
    </section>`}function q(j){let z=j.repo_ops&&typeof j.repo_ops=="object"?j.repo_ops:null;return z&&(z.status==="resolved"||z.status==="absent")?W(z):z&&(z.status==="pending"||z.status==="error")?c`<section class="worker-repo-ops__vd" data-seam="repo-ops">
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
    </section>`}async function I(j,z){if(!n)return;let K=await n("worker-repo-ops-opt-out-toggle",{kind:j,opted_out:z,expected_revision:s()});if(l(K),K&&K.conflict){let oe=await n("worker-repo-ops-opt-out-toggle",{kind:j,opted_out:z,expected_revision:s()});l(oe)}r()}async function P(){let j=y();if(!n||j===null)return;let z=await n("worker-repo-operation-deploy-run",{repo_id:j});if(l(z),!z||z.ok!==!0){let K=z&&typeof z.reason=="string"?z.reason:"",oe=Object.hasOwn(u_,K)?u_[K]:K||"\uBC30\uD3EC \uC2E4\uD589\uC744 \uC2DC\uC791\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4";ge(`\uBC30\uD3EC \uC2E4\uD589 \uAC70\uBD80 \u2014 ${oe}`,"error")}else ge("\uBC30\uD3EC \uC2E4\uD589\uC744 \uC2DC\uC791\uD588\uC2B5\uB2C8\uB2E4","success");r()}let U={owned_deploy_worktree_fetch_detached_alignment_recreate:"\uC804\uC6A9 \uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC \uC815\uB82C\xB7\uBCF5\uAD6C",recovered_pre_execution_fetch_timeout_retry_once:"fetch \uD0C0\uC784\uC544\uC6C3 1\uD68C \uBCF5\uAD6C",repo_serial_lock_wait:"\uC800\uC7A5\uC18C \uC21C\uCC28 \uC2E4\uD589 \uB300\uAE30",restart_operation_adoption:"\uC7AC\uC2DC\uC791 \uD6C4 \uC791\uC5C5 \uC778\uACC4",exact_input_exit_zero_evidence_adoption:"\uB3D9\uC77C \uC785\uB825 \uC131\uACF5 \uC99D\uAC70 \uC778\uACC4",descendant_success_covers_ancestor_rows:"\uCD5C\uC2E0 SHA \uC131\uACF5\uC774 \uC774\uC804 \uD589 \uCEE4\uBC84",owned_verify_candidate_cleanup:"\uAC80\uC99D \uC784\uC2DC \uCCB4\uD06C\uC544\uC6C3 \uC815\uB9AC",bounded_single_script_retry_exceeded:"\uB2E8\uC77C \uC2A4\uD06C\uB9BD\uD2B8 \uC7AC\uC2DC\uB3C4 \uD55C\uB3C4 \uCD08\uACFC",repair_session_dispatch:"\uC2E4\uD328 \uD574\uACB0 \uC138\uC158 \uC790\uB3D9 \uC2E4\uD589",baseline_failure_ignore:"\uAE30\uC874 \uC2E4\uD328 \uBB34\uC2DC",config_or_script_deletion_to_bypass_gate:"\uC124\uC815\xB7\uC2A4\uD06C\uB9BD\uD2B8 \uC0AD\uC81C\uB85C \uAC8C\uC774\uD2B8 \uC6B0\uD68C",credential_entry:"\uC790\uACA9\uC99D\uBA85 \uC785\uB825\xB7\uCD9C\uB825",destructive_action:"\uD30C\uAD34\uC801 \uC791\uC5C5",history_rewrite:"\uD788\uC2A4\uD1A0\uB9AC \uC7AC\uC791\uC131",agent_self_report_as_success:"\uC138\uC158 \uC790\uAE30\uBCF4\uACE0\uB97C \uC131\uACF5 \uCC98\uB9AC"};function Y(j,z,K){return c`<div class="worker-repo-ops__policy-group" data-policy=${K}>
      <div class="worker-repo-ops__policy-label">${j}</div>
      <ul class="worker-repo-ops__policy-list">
        ${z.map(oe=>c`<li data-token=${oe}>
              ${U[oe]||oe}
            </li>`)}
      </ul>
    </div>`}function N(){let j=i(),z=j.repo_operation_policy&&typeof j.repo_operation_policy=="object"?j.repo_operation_policy:null;return z?c`<section
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
        ${q(a())} ${N()}
      </details>`}}}var __=20,rk=5,ok=new Set(["failed","running","queued","retry_pending"]),Yl={verify:"\uBA38\uC9C0 \uC804 \uAC80\uC99D",deploy:"\uBA38\uC9C0 \uD6C4 \uBC30\uD3EC",job:"\uBA38\uC9C0 \uD6C4 \uC7A1"},p_={verify:"verify",deploy:"deploy",job:"deploy"};function sk(e){if(typeof e!="string")return"";let t=e.split("/").filter(n=>n.length>0);return t.length>0?t[t.length-1]:""}function ik(e){return!e||typeof e!="object"?"":e.kind==="job"?sk(e.script_path)||Yl.job:Object.hasOwn(Yl,e.kind)?Yl[e.kind]:e.kind}function ak(e,t,n=__){let r=[];for(let o of Array.isArray(e)?e:[])!o||typeof o!="object"||r.push({type:"operation",id:o.operation_id,at:typeof o.finished_at=="number"?o.finished_at:typeof o.requested_at=="number"?o.requested_at:null,operation:o});for(let o of Array.isArray(t)?t:[])!o||typeof o!="object"||r.push({type:"cleanup",id:o.bead_id,at:typeof o.at=="number"?o.at:null,cleanup:o});return r.sort((o,i)=>o.at===null&&i.at===null?String(o.id||"").localeCompare(String(i.id||"")):o.at===null?1:i.at===null?-1:i.at-o.at),r.slice(0,Math.max(0,n))}function lk(e){if(e.type==="cleanup")return!0;let t=e.operation;return ok.has(t.state)&&!t.dismissed&&!t.superseded_by}function ck(e,t,n={}){let r=ak(e,t,1/0),o=n.expanded===!0?__:rk,i=new Set(r.slice(0,o)),s=r.filter(l=>i.has(l)||lk(l));return{visible:s,hidden:r.length-s.length}}function f_(e){if(e.type==="cleanup")return"warn";let t=e.operation.state;return t==="succeeded"?"ok":t==="failed"?"fail":"live"}function uk(e){if(e.type==="cleanup")return"\uBA48\uCDA4";switch(e.operation.state){case"succeeded":return"\uC131\uACF5";case"failed":return"\uC2E4\uD328";case"retry_pending":return"\uC7AC\uC2DC\uB3C4 \uC911";case"running":return"\uC2E4\uD589 \uC911";default:return"\uB300\uAE30"}}function m_(e){let t=e.filter(n=>n.value);return t.length===0?"":c`<details class="worker-ev__details">
    <summary>세부</summary>
    <dl class="worker-ev__kv">
      ${t.map(n=>{let r=n.copy===!0?qr(n.value):n.value;return c`<div>
          <dt>${n.term}</dt>
          <dd>${r}</dd>
        </div>`})}
    </dl>
  </details>`}function g_(e,t="",n=!1){return!e&&!t?"":c`<p
    class="worker-ev__explain${n?" worker-ev__explain--warn":""}"
  >
    <span class="worker-ev__cause">${e}</span>${t?c`<br />${t}`:""}
  </p>`}function dk(e,t){if(!e||typeof e!="object")return;let n=t&&typeof t=="object"?t.kind:"";if(!Object.hasOwn(p_,n))return;let r=e[p_[n]],o=r&&typeof r=="object"?r.timeout_ms:void 0;return typeof o=="number"&&Number.isFinite(o)?o:void 0}function pk(e,t){let n=af(e,t),r=lf(e);return!n&&!r?"":c`<p class="worker-ev__why">
    ${n?c`<span class="worker-ev__why-line">${n}</span>`:""}${r?c`<span class="worker-ev__why-line">${r}</span>`:""}
  </p>`}function fk(e){return e.state!=="failed"||e.superseded_by||e.dismissed?"":c`<div class="worker-ev__acts">
    <button
      type="button"
      class="worker-ev__btn worker-repo-op__dismiss"
      data-operation-id=${e.operation_id}
      title="사람이 확인한 실패로 접수합니다 — 기록은 그대로 남고 해결 필요 집계에서만 빠집니다"
    >
      기록 닫기
    </button>
  </div>`}function _k(e,t){let n=e.operation,r=n.state==="failed",o=n.failure?n.failure.code:"";return c`<li
    class="worker-ev"
    data-operation-id=${n.operation_id}
    data-state=${n.state}
  >
    <span
      class="worker-ev__t"
      title=${e.at?nn(e.at):""}
      >${di(e.at)||"\u2014"}</span
    >
    <span class="worker-ev__node" aria-hidden="true"
      ><span class="worker-ev__dot worker-ev__dot--${f_(e)}"></span
    ></span>
    <div class="worker-ev__body">
      <div class="worker-ev__line1">
        <span class="worker-ev__what">${ik(n)}</span>
        <span class="worker-ev__meta"
          >${n.target_base}@${ui(n.target_sha)}${typeof n.elapsed_ms=="number"?` \xB7 ${jr(n.elapsed_ms)}`:""}</span
        >
        <span class="worker-ev__st worker-ev__st--${f_(e)}"
          >${uk(e)}</span
        >
        ${n.dismissed?c`<span class="worker-ev__st worker-ev__st--quiet">접수됨</span>`:""}
        ${n.superseded_by?c`<span class="worker-ev__st worker-ev__st--quiet">덮임</span>`:""}
        ${n.source==="manual"?c`<span
              class="worker-ev__st worker-ev__st--manual"
              title="사람이 배포 실행을 눌러 시작한 작업입니다"
              >수동</span
            >`:""}
      </div>
      ${r?g_(sf(n.failure_kind,o)):""}
      ${pk(n,dk(t,n))}
      ${fk(n)}
      ${m_([{term:"\uC2E4\uD328 \uCF54\uB4DC",value:r?o:""},{term:"script",value:[n.script_path||"",n.script_blob_sha?`blob ${ui(n.script_blob_sha)}`:"",Number.isInteger(n.exit_code)?`exit ${n.exit_code}`:""].filter(Boolean).join(" \xB7 ")},{term:"\uB85C\uADF8",value:n.log_path||"",copy:!0},{term:"\uCD9C\uB825",value:n.output_tail||""}])}
    </div>
  </li>`}function mk(e){let t=e.cleanup,n=Fr(t.step);return c`<li
    class="worker-ev"
    data-bead-id=${t.bead_id}
    data-state="cleanup_stalled"
  >
    <span
      class="worker-ev__t"
      title=${e.at?nn(e.at):""}
      >${di(e.at)||"\u2014"}</span
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
        ${gd(t.step).map(r=>c`<li
              class="worker-step worker-step--${r.state}"
              data-step=${r.step}
            >
              <span class="worker-step__pip" aria-hidden="true"></span>
              <span class="worker-step__lb">${r.label}</span>
            </li>`)}
      </ol>
      ${g_(wr(t.reason),typeof t.retry_count=="number"&&t.retry_count>0?`${t.retry_count}\uD68C \uC790\uB3D9 \uC7AC\uC2DC\uB3C4 \uD6C4\uC5D0\uB3C4 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4 \u2014 \uC815\uB9AC\uB97C \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uBA74 \uBA48\uCD98 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4.`:"\uC815\uB9AC\uB97C \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uBA74 \uBA48\uCD98 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4.",!0)}
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
      ${m_([{term:"\uC2E4\uD328 \uCF54\uB4DC",value:t.reason||""},{term:"\uC9C4\uB2E8",value:t.detail||""},{term:"\uB85C\uADF8",value:t.log_path||"",copy:!0},{term:"\uCD9C\uB825",value:t.output_tail||""}])}
    </div>
  </li>`}function gk(e){let t=typeof e.hidden=="number"?e.hidden:0,n=e.expanded===!0;return c`<section class="worker-repo-drawer" data-seam="repo-ops-timeline">
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
          ${e.events.map(r=>r.type==="cleanup"?mk(r):_k(r,e.repo_ops))}
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
  </section>`}function h_(e,t={}){let n=null;function r(){if(n===null){dt(c``,e);return}let s=ck(n.operations,n.cleanup_failures,{expanded:n.expanded});dt(gk({events:s.visible,hidden:s.hidden,expanded:n.expanded,repo:n.repo,repo_ops:n.repo_ops}),e)}e.addEventListener("click",s=>{let l=s.target;if(l?.closest?.('[data-seam="repo-ops-close"]')){i();return}l?.closest?.('[data-seam="repo-ops-more"]')&&n&&(n.expanded=!n.expanded,r())});function o(s){n={operations:s.operations,cleanup_failures:s.cleanup_failures,repo:s.repo||"",repo_ops:s.repo_ops||null,expanded:!1},r()}function i(){n!==null&&(n=null,r(),t.onClose&&t.onClose())}return{open:o,close:i,isOpen:()=>n!==null,refresh(s){n&&(n={operations:s.operations,cleanup_failures:s.cleanup_failures,repo:s.repo||"",repo_ops:s.repo_ops||null,expanded:n.expanded},r())}}}var hk="session-preferred",bk=["external_roundtrip","user_feedback_loop"];function b_(e,t){if(!zo(e).includes(hk)||typeof t!="object"||t===null)return"";let n=t.session_preferred_reason;return typeof n=="string"&&bk.includes(n)?n:""}var yk="spec-after-blocker";function y_(e,t){return zo(e).includes(yk)&&Array.isArray(t)&&t.length>0}var vk=Wt("views:worker:adapter"),kk="tab:worker:ready",wk="tab:worker:blocked",$k="tab:worker:in-progress",xk="tab:worker:resolved",Ak="tab:worker:closed",Sk="\u{1F512} blocked",Ek={revision:0,auto_advance:!1,auto_merge:!1,slots:Ei,queue:[],serial_lanes:[],serial_lane_count:0,pr_wait:[],done:[]},Tk=["claude_account","codex_account"],Ck=[...fo,...Tk];function Rk(e){let t=e&&e.parent;return(typeof t=="string"?t.length>0:!!(t&&t.id))||/\.\d+$/.test(e&&e.id||"")}function Ok(e){let t=e&&typeof e=="object"?e.awaiting_user:void 0,n=typeof t=="string"?t.trim():"";return n.length>0?`${Qa}: ${n}`:Qa}function $r(e){return e&&typeof e=="object"?e:{}}function Ik(e){let t={};for(let n of Ck){let r=e[n];typeof r=="string"&&r.length>0&&(t[n]=r)}return t}function Lk(e){let t=new Map;for(let r of e){if(!r||typeof r.id!="string"||r.id.length===0)continue;let o=$r(r.metadata).carried_from;if(!(typeof o!="string"||o.length===0))for(let i of ks(r)){let s=t.get(i);s||(s=new Set,t.set(i,s)),s.add(r.id)}}let n=new Map;for(let[r,o]of t)n.set(r,[...o].sort());return n}function Pk(e){let t=e.replace(/\/+$/,""),n=t.lastIndexOf("/");return n>=0?t.slice(n+1):t}function v_(e={}){let{queueStore:t,issueStores:n,transport:r,getWorkspacePath:o,onInvalidate:i}=e,s=n?no(n):null,l=new Map,a={},u=null,d=0,p=null,_=!1;function m(){_||!i||i()}function y(P){return u===P?a:{}}async function C(){if(!r||_)return;let P=o?.()||"";if(u===P||p&&p.key===P&&p.generation===d)return;let U=++d;p={key:P,generation:U};let Y=null;try{Y=await Promise.resolve(r("get-session-defaults",{}))}catch(N){if(U!==d)return;p=null,vk("get-session-defaults failed: %o",N),m();return}U===d&&(a=Y&&typeof Y.values=="object"&&Y.values!==null?{...Y.values}:{},u=P,p=null,m())}function O(){u=null,d+=1,C()}function V(){for(let[P,U]of l)U==="failed"&&l.delete(P)}function te(P,U){return s?s.selectBoardColumn(P,U):[]}function W(P,U,Y,N){let j=new Set(Y.map(F=>F.id)),z=new Set,K=new Map,oe=[];for(let F of[...U,...Y]){if(z.has(F.id)||Rk(F))continue;let X=Ho(F,P);X.location===null&&(z.add(F.id),K.set(F.id,X),oe.push(F))}let ve=o_(oe,Hr(N)),Ne=$r(P.bead_scope);return ve.map(F=>{let X=K.get(F.id),Ae=eo(F),Ee=Ae.evidence==="published",R=typeof F.workflow?.route=="string"&&F.workflow.route||(F.metadata&&typeof F.metadata.route=="string"?F.metadata.route:""),se=X.worker_ineligible,ye=se||!Object.hasOwn(F,"labels")?"":b_(F.labels,F.metadata),ke=j.has(F.id),Me=ke?ks(F):[],he=[];ke&&Me.length===0&&he.push(Sk),X.awaiting_user&&he.push(Ok(F.metadata)),X.missing_description?he.push("missing_description"):X.spec==="conflict"?he.push("spec_id_conflict"):X.spec==="none"?he.push("spec \uC5C6\uC74C"):X.spec==="draft"&&he.push("spec \uBBF8\uBC1C\uD589(draft)");let Ie=Ne[F.id];return{bead_id:F.id,title:F.title||F.id,route:R,spec_id:Ae.conflict?"":Ae.path,published:Ee,blocked:ke,blocked_by:Me,labels:Array.isArray(F.labels)?F.labels:[],created_at:F.created_at,updated_at:F.updated_at,status:F.status,workflow:F.workflow||null,exec_pins:Ik($r(F.metadata)),rec:null,...Ie&&Array.isArray(Ie.scope)?{scope:Ie.scope}:{},eligible:X.placeable,route_ok:X.route_ok,awaiting_user:X.awaiting_user,missing_description:X.missing_description,placement_spec:X.spec,reason:he.join(" \xB7 "),worker_ineligible:se,session_preferred:ye.length>0,session_preferred_reason:ye,spec_after_blocker:y_(F.labels,Me),release_info:F.release_info,dependents_info:F.dependents_info}})}function q(P){let[U,Y,N,j,z]=P,K=Ns([...U,...Y,...N,...j,...z]),oe=Lk([...U,...Y,...N,...j]),ve={},Ne=(F,X)=>{if(!F||typeof F.id!="string"||F.id.length===0)return;let Ae=ve[F.id]||(ve[F.id]={});if(typeof F.priority=="number"&&!("priority"in Ae)&&(Ae.priority=F.priority),typeof F.from_id=="string"&&!("from_id"in Ae)&&(Ae.from_id=F.from_id),X&&!("metadata"in Ae)){Ae.metadata=$r(F.metadata);let Ee=$r(F.workflow).route;typeof Ee=="string"&&Ee.length>0&&(Ae.route=Ee)}};for(let F of[...U,...Y,...N])Ne(F,!0);for(let F of[...j,...z])Ne(F,!1);for(let F of new Set([...Object.keys(ve),...K.keys()])){let X=js(K,F);if(X.total>0){let Ae=ve[F]||(ve[F]={});Ae.rollup=X}}for(let[F,X]of oe){let Ae=ve[F]||(ve[F]={});Ae.carried_to=X}return ve}function I(P,U,Y,N){let j=new Set((Array.isArray(P.done)?P.done:[]).map(K=>K?.bead_id).filter(K=>typeof K=="string")),z=[];for(let K of U){let oe=ur(K.closed_at);if(typeof K.id!="string"||j.has(K.id)||oe===null||N!==void 0&&oe<N||typeof K.comment_count!="number"||K.comment_count<=0)continue;let ve=`${Y}\0${K.id}\0${String(K.updated_at)}\0${K.comment_count}`,Ne=l.get(ve);if(Ne===void 0&&r&&(l.set(ve,"pending"),Promise.resolve(r("get-comments",{id:K.id})).then(X=>{let Ae=Array.isArray(X)&&X.some(Ee=>Wi(typeof Ee?.text=="string"?Ee.text:"")?.lane==="session");l.set(ve,Ae?"session":"not-session"),m()}).catch(()=>{l.set(ve,"failed"),m()})),Ne!=="session")continue;let F=ur(K.started_at);z.push({id:K.id,title:K.title||K.id,reason:"",draggable:!1,done:!0,lane:"done",selectable:!1,selected:!1,badges:["\uC138\uC158 \uC791\uC5C5"],alert:!1,usage:null,work_ms:F!==null&&oe>=F?oe-F:null,work_kind:"session",done_at:oe,created_at:K.created_at,updated_at:K.updated_at})}return z}return{read(P){if(!t)return{workspaces:[],workspaces_state:[]};let U=t.get()||Ek,Y=o?.()||"",N=P&&typeof P.done_since=="number"?P.done_since:void 0,j=te(kk,"ready"),z=te(wk,"blocked"),K=te($k,"in_progress"),oe=te(xk,"resolved"),ve=te(Ak,"closed");return{workspaces:[{...U,bead_titles:{...$r(U.bead_titles),...Object.fromEntries([...j,...z].filter(Ne=>Ne&&typeof Ne.id=="string").map(Ne=>[Ne.id,Ne.title||Ne.id]))},root_dir:Y,name:Pk(Y),runnable:W(U,j,z,P?P.candidate_sort:void 0),session_done:I(U,ve,Y,N),bead_overlay:q([j,z,K,oe,ve])}],workspaces_state:[{root_dir:Y,revision:U.revision,auto_advance:U.auto_advance,auto_merge:U.auto_merge,slots:typeof $r(U.workspace_info).slots=="number"?$r(U.workspace_info).slots:U.slots,runner_catalog:U.runner_catalog,execution_defaults:U.execution_defaults,session_defaults:y(Y),orchestration_model:U.orchestration_model,orchestration_effort:U.orchestration_effort,orchestration_speed:U.orchestration_speed,quick_fix_orchestration_model:U.quick_fix_orchestration_model,quick_fix_orchestration_effort:U.quick_fix_orchestration_effort,quick_fix_orchestration_speed:U.quick_fix_orchestration_speed,issue_prefix:""}]}},ensureSessionDefaults(){C()},refreshSessionDefaults:O,notifyIssuesChanged:V,destroy(){_=!0,d+=1,p=null,l.clear()}}}var sa=1,k_=5,Dk={root_dir:"",name:"",auto_advance:!1,auto_merge:!1,slots:sa,revision:0,runner_catalog:{},items:[],sublanes:{parallel:[],serial:[]},serial_lane_count:0,raw_queue_length:0,live_count:0,over_cap:!1,merge:{positions:new Map,resolutions:new Map,continuations:new Map,authorities:new Map,state:{active:null,failures:{},waiting:null},auto_excluded:[],running:!1},token_total:null,cleanup_failures:[],declared_base:null,repo_operations:[]};function Lt(e){return e&&typeof e=="object"?e:{}}var x_="beads-ui.worker.candidate-filter",Vl={show_blocked:!1,readiness:"all"};function Mk(){try{let e=window.localStorage.getItem(x_);if(!e)return{...Vl};let t=JSON.parse(e);if(!t||typeof t!="object")return{...Vl};let n=t.readiness;return{show_blocked:t.show_blocked===!0,readiness:n==="ready"||n==="not_ready"?n:"all"}}catch{return{...Vl}}}function qk(e){try{window.localStorage.setItem(x_,JSON.stringify(e))}catch{}}var A_="bdui.worker.done-range";function Nk(){try{let e=window.localStorage.getItem(A_);return e===null?"today":Hn(e)}catch{return"today"}}function jk(e){try{window.localStorage.setItem(A_,e)}catch{}}function w_(e){let t=Array.isArray(e)&&e.length>0?e[0]:null;if(!t)return"";let n=typeof t.title=="string"?t.title:t.id||"";return n.length>22?`${n.slice(0,22)}\u2026`:n}function Fk(e){return e==="receipt_not_current"?"\uB9AC\uBDF0 \uD6C4\uC5D0\uB3C4 \uC601\uC218\uC99D\uC774 \uCD5C\uC885 head\uC5D0 \uC720\uD6A8\uD558\uC9C0 \uC54A\uC74C":e==="cancelled"?"\uB9AC\uBDF0 \uC138\uC158 \uCDE8\uC18C\uB428":e.startsWith("launch_failed:")?`\uB9AC\uBDF0 \uC138\uC158 \uC2DC\uC791 \uC2E4\uD328(${e.slice(14)})`:e.startsWith("session_failed:")?`\uB9AC\uBDF0 \uC138\uC158 \uBE44\uC815\uC0C1 \uC885\uB8CC(${e.slice(15)})`:`\uB9AC\uBDF0 \uC138\uC158 \uC2E4\uD328(${e})`}function $_(e){if(e.startsWith("receipt_unbacked:"))return`\uC2E4\uD589 \uC601\uC218\uC99D \uC790\uB3D9 \uAC80\uC99D \uBD88\uAC00(${e.slice(17)}) \u2014 [\uBA38\uC9C0] \uD074\uB9AD\uC73C\uB85C \uC218\uB3D9 \uC9C4\uD589 \uAC00\uB2A5`;switch(e){case"not_in_pr_wait":return"PR \uB300\uAE30 \uC0C1\uD0DC \uB3D9\uAE30\uD654 \uC2E4\uD328";case"resolution_round_cap":return"\uCDA9\uB3CC \uD574\uC18C 2\uD68C \uCD08\uACFC";case"resolution_rebase_cap":return"\uD050 \uC7AC\uCDA9\uB3CC 3\uD68C \uCD08\uACFC";case"resolution_timeout":return"\uCDA9\uB3CC \uD574\uC18C \uB300\uAE30 \uC2DC\uAC04 \uCD08\uACFC";case"resolution_refused":return"\uD574\uC18C \uC138\uC158 \uB514\uC2A4\uD328\uCE58 \uAC70\uBD80";case"worktree_missing":return"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uD574\uC18C \uD544\uC694";case"worktree_restore_branch_mismatch":return"\uC6CC\uD06C\uD2B8\uB9AC \uBCF5\uC6D0 \uC2E4\uD328 \u2014 \uBE0C\uB79C\uCE58 \uC774\uB984 \uBD88\uC77C\uCE58";case"worktree_restore_path_exists":return"\uC6CC\uD06C\uD2B8\uB9AC \uBCF5\uC6D0 \uC2E4\uD328 \u2014 \uACBD\uB85C \uC774\uBBF8 \uC788\uC74C";case"worktree_restore_branch_missing":return"\uC6CC\uD06C\uD2B8\uB9AC \uBCF5\uC6D0 \uC2E4\uD328 \u2014 origin\uC5D0 \uBE0C\uB79C\uCE58 \uC5C6\uC74C";case"worktree_restore_branch_diverged":return"\uC6CC\uD06C\uD2B8\uB9AC \uBCF5\uC6D0 \uC2E4\uD328 \u2014 \uB85C\uCEEC \uBE0C\uB79C\uCE58\uAC00 origin\uACFC \uB2E4\uB984";case"worktree_restore_failed":return"\uC6CC\uD06C\uD2B8\uB9AC \uBCF5\uC6D0 \uC2E4\uD328";case"merge_unconfirmed_timeout":return"\uBA38\uC9C0 \uD655\uC778 \uC2DC\uAC04 \uCD08\uACFC";case"pr_closed_unmerged":return"PR \uB2EB\uD798";case"merge_error":return"\uBA38\uC9C0 \uC624\uB958";case"spec_id_missing":return"\uC2A4\uD399 ID \uAE30\uB85D \uC5C6\uC74C";default:return e}}function Bk(e){if(e==="lane_occupied")return"\uC2E4\uD589 \uB808\uC778\uC5D0 \uB0A8\uC544 \uC788\uC5B4 \uBA38\uC9C0 \uB300\uC0C1\uC774 \uC544\uB2D9\uB2C8\uB2E4";let t="\uBA38\uC9C0 \uD050\uC5D0 \uB123\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 (\uC774\uBBF8 \uB300\uAE30 \uC911\uC774\uAC70\uB098 \uB300\uC0C1 \uC544\uB2D8)";return typeof e=="string"&&e.length>0?`${t}: ${e}`:t}function Uk(e){switch(e){case"no_terminal_failure":return"\uC774 \uD589\uC5D0 \uC774\uC5B4\uBC1B\uC744 terminal \uC2E4\uD328 \uAE30\uB85D\uC774 \uC5C6\uC2B5\uB2C8\uB2E4";case"tmux_unavailable":return"tmux\uC5D0 \uB2FF\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 \u2014 \uC138\uC158\uC744 \uB744\uC6B0\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4";case"launch_failed:claude_not_found":return"claude \uC2E4\uD589 \uD30C\uC77C\uC744 PATH\uC5D0\uC11C \uCC3E\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4";case"launch_failed:new_session":return"tmux \uC138\uC158\uC744 \uB9CC\uB4E4\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4";case"launch_failed:new_window":return"tmux \uCC3D\uC744 \uB9CC\uB4E4\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4";case"launch_failed:exited":return"\uB744\uC6B4 \uC138\uC158\uC774 \uACE7\uBC14\uB85C \uC885\uB8CC\uB410\uC2B5\uB2C8\uB2E4";case"error":return"\uC138\uC158 \uAE30\uB3D9 \uC911 \uC624\uB958\uAC00 \uB0AC\uC2B5\uB2C8\uB2E4";default:return typeof e=="string"&&e.length>0?e:"\uC138\uC158\uC744 \uB744\uC6B0\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"}}function Wk(e){switch(e){case"no_session_ref":return"\uAE30\uB85D\uB41C \uC138\uC158 \uC5C6\uC74C";case"unsafe_session_id":return"\uC138\uC158 ID\uB97C \uC778\uC790\uB85C \uC4F8 \uC218 \uC5C6\uC74C";case"provider_mismatch":return"\uAE30\uB85D\uB41C \uC138\uC158\uC774 claude\uAC00 \uC544\uB2D8";case"not_local":return"\uAE30\uB85D\uB41C \uC138\uC158\uC758 transcript\uAC00 \uC774 \uAE30\uAE30\uC5D0 \uC5C6\uC74C";case"bd_unavailable":return"Bead \uBA54\uD0C0\uB370\uC774\uD130\uB97C \uC77D\uC9C0 \uBABB\uD568";default:return typeof e=="string"&&e.length>0?e:"\uC0AC\uC720 \uBBF8\uC0C1"}}function zk(e){if(!e||typeof e!="object")return"\uC138\uC158 \uAE30\uB3D9 \uC751\uB2F5\uC744 \uBC1B\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4";if(e.conflict===!0)return"\uD050\uAC00 \uBC14\uB00C\uC5B4 \uD074\uB9AD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uB20C\uB7EC\uC8FC\uC138\uC694";if(e.session==="already_running")return"\uC774\uBBF8 \uC774 \uC774\uC288\uC758 \uD574\uACB0 \uC138\uC158\uC774 \uC5F4\uB824 \uC788\uC2B5\uB2C8\uB2E4";if(e.launched!==!0)return`\uC138\uC158\uC5D0\uC11C \uD574\uACB0 \uAC70\uBD80: ${Uk(e.reason)}`;let t=e.bridge_active===!0?"":" (Discord \uC911\uACC4 \uBE44\uD65C\uC131 \u2014 tmux\uC5D0\uC11C \uB2F5\uD558\uC138\uC694)";return e.mode==="fork"?`\uAE30\uB85D\uB41C \uC138\uC158\uC744 fork\uD574 \uB744\uC6E0\uC2B5\uB2C8\uB2E4${t}`:`\uC0C8 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4 \u2014 ${Wk(e.fallback_reason)}${t}`}function Hk(e){return e&&e.launched===!0?"success":"error"}function Kk(e){if(e==="worker_sessions_busy")return"\uD574\uC18C \uB300\uAE30 \u2014 \uC2E4\uD589 \uC2AC\uB86F \uB300\uAE30 \uC911";if(typeof e!="string"||!e.startsWith("completion_waiting:"))return null;let t=e.slice(19);if(t.length===0)return null;switch(t){case"gating":return"\uBA38\uC9C0 \uC870\uAC74 \uD655\uC778 \uC911";case"merging":return"\uBA38\uC9C0 \uC911";case"cleaning":return"\uB9C8\uBB34\uB9AC \uC911";case"paused":return"\uC790\uB3D9 \uC9C4\uD589 \uC77C\uC2DC\uC815\uC9C0";case"needs_human":return"\uD655\uC778 \uD544\uC694";default:return null}}function Gk(e){if(!e||typeof e!="object")return null;switch(e.state){case"waiting":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC911",live:!0};case"yielded":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uACC4\uC18D \uC911 \xB7 \uC644\uB8CC \uD6C4 \uC6B0\uC120 \uBA38\uC9C0",live:!0};case"ready":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC644\uB8CC \xB7 \uC7AC\uAC80\uC99D \uB300\uAE30",live:!1};default:return null}}var Yk=new Set(["paused","needs_human","waiting_metadata","reviewing","retrying"]),Vk=new Set(["waiting_metadata","reviewing","retrying"]),Ql=new Set(["review_receipt_missing","review_receipt_stale","review_receipt_invalid","review_receipt_undetermined"]);function Qk(e){let t=e&&typeof e=="object"?e.auto_resolution:null,n=t&&typeof t=="object"&&!Array.isArray(t)?t:null;if(!n||!e)return null;let r=typeof n.origin_reason=="string"&&n.origin_reason.length>0?`\uC6D0 \uC0AC\uC720: ${n.origin_reason}`:"";switch(e.phase){case"waiting_metadata":return{label:"\uC815\uC815 \uB300\uAE30",details:[r,"\uBA54\uD0C0\uB370\uC774\uD130 \uC815\uC815\uC774 \uAD00\uCE21\uB418\uBA74 \uC790\uB3D9 \uC7AC\uAC1C"].filter(Boolean),live:!1};case"retrying":{let o=Number.isInteger(n.attempts)?Math.max(0,Number(n.attempts)):0,i=Number.isInteger(n.attempt_cap)&&Number(n.attempt_cap)>0?Number(n.attempt_cap):0,s=typeof n.next_at=="number"?nn(n.next_at):"",l=typeof n.last_error=="string"&&n.last_error.length>0?n.last_error:"";return{label:i>0?`\uC7AC\uC2DC\uB3C4 ${Math.min(o,i)}/${i}`:`\uC7AC\uC2DC\uB3C4 ${o}`,details:[r,s?`\uB2E4\uC74C \uC2DC\uAC01 ${s}`:"",l?`\uB9C8\uC9C0\uB9C9 \uC624\uB958: ${l}`:""].filter(Boolean),live:!0}}default:return null}}function Xk(e){if(typeof e!="string")return"";for(let t of["retry_exhausted:","auto_review_exhausted:"])if(e.startsWith(t))return e.slice(t.length);return""}function Zk(e,t=null){if(!e||typeof e!="object")return null;let n="";switch(e.phase){case"gating":n="\uBA38\uC9C0 \uC870\uAC74 \uD655\uC778 \uC911";break;case"merging":n="\uBA38\uC9C0 \uC911";break;case"cleaning":n="\uB9C8\uBB34\uB9AC \uC911";break;case"waiting_metadata":case"reviewing":case"retrying":if(!t)return null;n=t.label;break;case"paused":n="\uC790\uB3D9 \uC9C4\uD589 \uC77C\uC2DC\uC815\uC9C0";break;case"needs_human":n="\uD655\uC778 \uD544\uC694";break;case"completed":return null;default:return null}let r=[n];e.head_sha&&r.push(`head ${e.head_sha}`),e.base_sha&&r.push(`base ${e.base_sha}`),(e.failure_stage||e.failure_reason)&&r.push(`${e.failure_stage||"failure"} \xB7 ${e.failure_reason||"\uC6D0\uC778 \uBBF8\uC0C1"}`);let o=Xk(e.terminal_reason);o&&r.push(`\uC6D0 \uC0AC\uC720: ${o}`);let i=e.phase==="needs_human"&&!o?zr(e.terminal_reason):null;i&&r.push(e.failure_stage?`${e.failure_stage} \xB7 ${i}`:i);for(let s of t?t.details:[])r.push(s);return e.active_attempt_id&&r.push(`attempt ${e.active_attempt_id}`),e.evidence&&r.push(e.evidence),e.log_path&&r.push(e.log_path),{badge:n,title:r.join(`
`),alert:e.phase==="needs_human",lock_actions:!Yk.has(e.phase)}}function Jk(e){if(!e||typeof e!="object")return[];let t=e.blocking_codes;return Array.isArray(t)?t.filter(n=>typeof n=="string"&&n.length>0):[]}function ew(e){if(!e||typeof e!="object")return[];let t=e.badge_codes;return Array.isArray(t)?t.filter(n=>typeof n=="string"&&n.length>0):[]}function tw(e){let t=e.queue_failure?`\uBA38\uC9C0 \uC2E4\uD328 \uC6D0\uBB38: ${e.queue_failure}`:e.auto_skip?`\uC790\uB3D9 \uC81C\uC678 \uC6D0\uBB38: ${e.auto_skip}`:"",n=(i,s={})=>{let l=[s.title||"",t].filter(Boolean);return{label:i,title:l.join(`
`),live:s.live===!0,alert:s.alert===!0}};if(e.continuation_required)return n("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694",{alert:!0});if(e.queueing)return e.queueing==="cleanup"?n("\uC815\uB9AC \uC7AC\uC2DC\uB3C4 \uC694\uCCAD \uC911",{title:"\uC11C\uBC84 \uC751\uB2F5\uC744 \uAE30\uB2E4\uB9AC\uB294 \uC911\uC785\uB2C8\uB2E4",live:!0}):n("\uD050 \uB4F1\uB85D \uC911",{title:"\uBA38\uC9C0 \uD050\uC5D0 \uB123\uB294 \uC911 \u2014 \uC11C\uBC84 \uC751\uB2F5\uC744 \uAE30\uB2E4\uB9BD\uB2C8\uB2E4",live:!0});if(e.merge_step)return e.gate?.tier==="merged"?n("\uBA38\uC9C0\uB428",{title:e.merge_step.label,alert:e.merge_step.failed===!0}):n("\uBA38\uC9C0 \uC911",{title:e.merge_step.label,live:!0});if(e.conflict_badge)return n(e.conflict_badge,{live:e.conflict_live===!0});if(e.auto_resolution)return n(e.auto_resolution.label,{title:e.auto_resolution.details.join(`
`),live:e.auto_resolution.live===!0});if(e.recovery?.lock_actions)return n(e.recovery.badge,{title:e.recovery.title,live:!0});if(e.cleanup_failed)return n(e.cleanup_label?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${e.cleanup_label}`:"\uC815\uB9AC \uBA48\uCDA4",{title:e.cleanup_failed.reason||"",alert:!0});if(e.base_exception)return n("\uB2E4\uB978 base \uB300\uC0C1",{title:e.base_exception,alert:!0});let r=Jk(e.receipt_check),o=e.conflicting||e.gate?.reason==="base_behind"||r.length>0;if(e.auto_pending&&o)return n("\uD655\uC778 \uC911",{title:"\uBA38\uC9C0 \uD050\uAC00 \uC790\uB3D9\uC73C\uB85C \uCC98\uB9AC \uC911 \u2014 \uB2E4\uC74C \uAD00\uCE21\uC744 \uAE30\uB2E4\uB9BD\uB2C8\uB2E4",live:!0});if(e.conflicting)return n("\uCDA9\uB3CC \uD574\uACB0 \uD544\uC694",{alert:!0});if(e.gate?.reason==="base_behind")return n("base \uAC31\uC2E0 \uD544\uC694",{alert:!0});if(Ql.has(e.gate?.reason)){let i=e.gate.reason==="review_receipt_stale"?"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC774 \uD604\uC7AC head\uC758 \uC870\uC0C1\uC774 \uC544\uB2D9\uB2C8\uB2E4 \u2014 \uD788\uC2A4\uD1A0\uB9AC \uC7AC\uC791\uC131\xB7\uBE0C\uB79C\uCE58 \uB9AC\uC14B \uBCF5\uAD6C \uACBD\uB85C\uC785\uB2C8\uB2E4. [\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0]\uAC00 \uC774 \uBCF4\uB958\uC758 \uCD9C\uAD6C\uC785\uB2C8\uB2E4":e.gate.reason==="review_receipt_invalid"?"\uB9AC\uBDF0 \uC601\uC218\uC99D \uAE30\uB85D\uC774 \uC131\uB9BD\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4 \u2014 [\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0]\uAC00 \uC774 \uBCF4\uB958\uC758 \uCD9C\uAD6C\uC785\uB2C8\uB2E4":e.gate.reason==="review_receipt_undetermined"?"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC758 ancestry probe\uB97C \uC644\uB8CC\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 \u2014 [\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0]\uAC00 \uC774 \uBCF4\uB958\uC758 \uCD9C\uAD6C\uC785\uB2C8\uB2E4":"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 [\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0]\uAC00 \uC774 \uBCF4\uB958\uC758 \uCD9C\uAD6C\uC785\uB2C8\uB2E4";if(e.review_session?.active===!0)return n(e.review_session.origin==="auto"?"\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694 \xB7 \uC790\uB3D9 \uB9AC\uBDF0 \uC138\uC158 \uC2E4\uD589 \uC911":"\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694 \xB7 \uB9AC\uBDF0 \uC138\uC158 \uC2E4\uD589 \uC911",{title:`${i}
\uB9AC\uBDF0 \uC138\uC158\uC774 \uC2E4\uD589 \uC911\uC785\uB2C8\uB2E4 \u2014 \uB05D\uB098\uBA74 \uC601\uC218\uC99D\uC744 \uB2E4\uC2DC \uD310\uC815\uD569\uB2C8\uB2E4`,live:!0});if(e.auto_review_wait==="slot")return n("\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694 \xB7 \uB9AC\uBDF0 \uC138\uC158 \uC2AC\uB86F \uB300\uAE30",{title:`${i}
\uC2E4\uD589 \uC2AC\uB86F\uC774 \uBE44\uBA74 \uC790\uB3D9\uC73C\uB85C \uB9AC\uBDF0 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4. \uC9C0\uAE08 \uD074\uB9AD\uD558\uBA74 \uC989\uC2DC \uB744\uC6C1\uB2C8\uB2E4`,live:!0});if(e.review_session?.failure){let s=e.review_dispatch?.state==="exhausted"&&e.review_session.origin==="auto";return n(`\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694 \xB7 ${s?"\uC790\uB3D9 \uB9AC\uBDF0 1\uD68C \uC18C\uC9C4 \xB7 ":""}${Fk(e.review_session.failure)}`,{title:`${i}
\uC9C1\uC804 \uB9AC\uBDF0 \uC138\uC158 \uC885\uB8CC \uC0AC\uC720: ${e.review_session.failure}`,alert:!0})}return n("\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694",{title:i,alert:!0})}return e.gate?.reason==="spec_id_missing"?n("\uC2A4\uD399 ID \uB204\uB77D",{title:"native spec_id \uBBF8\uAE30\uB85D \u2014 bd update --spec-id \uD544\uC694",alert:!0}):r.length>0?n(`\uC601\uC218\uC99D \uD655\uC778 \uD544\uC694 \xB7 ${r[0]}`,{title:`\uC131\uB9BD\uD558\uC9C0 \uC54A\uB294 \uC2E4\uD589 \uC601\uC218\uC99D \u2014 ${r.join(", ")}`,alert:!0}):e.recovery?n(e.recovery.badge,{title:e.recovery.title,alert:!0}):e.gate?.tier==="verify"&&e.gate.gate_badge==="\uAC80\uC99D \uC2E4\uD328"?n("\uAC80\uC99D \uC2E4\uD328",{title:e.gate.reason||"",alert:!0}):e.queue_failure?n(`\uBA38\uC9C0 \uC2E4\uD328 \u2014 ${$_(e.queue_failure)}`,{title:e.queue_failure,alert:!0}):e.auto_skip?n(`\uC790\uB3D9 \uC81C\uC678 \u2014 ${$_(e.auto_skip)}`,{title:e.auto_skip,alert:!0}):e.queued&&!e.queue_active?n(`\uBA38\uC9C0 \uB300\uAE30 #${e.queue_position}`):e.gate?.enabled===!0?n("\uBA38\uC9C0 \uAC00\uB2A5"):e.gate?.tier==="merged"?n("\uBA38\uC9C0\uB428"):e.gate?.tier==="closed_unmerged"?n("\uB2EB\uD798",{alert:!0}):e.activity?n("\uD655\uC778 \uC911",{live:!0}):e.gate?.tier==="undecidable"||e.gate?.reason==="mergeability_unknown"?n("\uC0C1\uD0DC \uD655\uC778 \uC2E4\uD328",{title:e.gate.reason||"",alert:!0}):e.gate?.tier==="unobserved"||e.gate?.tier==="verify"||e.gate?.gate_badge==="\uAD00\uCE21 \uB300\uAE30"?n("\uD655\uC778 \uC911"):e.gate?.gate_badge?n(e.gate.gate_badge,{title:e.gate.reason||"",alert:e.gate.enabled!==!0}):null}function nw(e,t,n,r,o=null,i=null,s=null,l=!1,a=null,u=!0,d=null,p=null,_=null,m={},y=!1,C={},O=null,V={active:!1,failure:null,origin:null},te=!1){let W=!!a&&a.position>0,q=!!a?.continuation_action&&a.continuation_action.continuation===null,I=!!a&&a.active===!0,P=a&&a.failure||null,U=Kk(a?a.waiting:null),Y=n[e]||null,N=Y&&Y.gate?Y.gate:null,j=Y&&Y.pr?Y.pr:null,z=Gk(a?a.resolution:null),K=Qk(_),oe=Zk(_,K),ve=a&&a.authority||null,Ne=a&&a.review_dispatch||null,F=a?.hold?.auto_review_wait==="slot"?"slot":null,X=!!_&&typeof _=="object"&&Vk.has(_.phase),Ae=W&&!I&&(!ve||X||ve.source==="automatic"&&!y),Ee=s==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":z?z.badge:s==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC911":U,R=!!N&&N.base_badge==="\uCDA9\uB3CC",se=!!N&&N.enabled===!0,ye=Zo({bead_id:e,merge_sha:C.merge_sha,cleanup_cursor:C.cleanup_cursor,merge_progress:i&&i.merge_progress?i.merge_progress:null,cleanup_failed:r,repo_operations:C.repo_operations}),ke=Ai(ye),Me=i&&!ye&&(i.queueing??null)?i.queueing:null,he=!!r&&["repo_operations","post_merge_jobs","child_sweep","branch_cleanup","parent_close"].includes(r.step)&&!!N&&N.tier==="merged",Ie=r&&r.step==="repo_operations"&&ye?.failed===!0&&(ye.step==="deploy"||ye.step==="verify")?ye.step:null,Ze=l&&!!r&&!!N&&N.tier==="merged",ut=Ae&&(se||R||N?.reason==="base_behind"||Ql.has(N?.reason)||he||Ze),G=Ql.has(N?.reason),J=l&&R&&u===!1,re=or(m,e,{external:l,merge_active:I||ye?.step==="merge",merge_queued:W,conflict_active:!!s,cleanup_active:ke,merged:!!r||N?.tier==="merged"}),pe=!!re.operation,Se=!!r||_?.phase==="needs_human"||!!re.error,me=W&&!P&&!q&&!he&&!(oe&&oe.lock_actions),je=tw({auto_pending:me,continuation_required:q,queueing:Me,merge_step:ye,conflict_badge:Ee,conflict_live:z?.live===!0||s==="running",auto_resolution:K,recovery:oe,cleanup_failed:r,cleanup_label:r?Fr(r.step):null,base_exception:p,conflicting:R,gate:N,receipt_check:Y&&Y.receipt_check?Y.receipt_check:null,queue_failure:P,auto_skip:d,queued:W,queue_active:I,queue_position:a?a.position:0,review_session:V,review_dispatch:Ne,auto_review_wait:F,activity:Ee?null:i&&i.activity||null}),Be=je?.live===!0&&je.title?c`<span title=${je.title}>${je.label}</span>`:je?.label||null,Qe=ew(Y&&Y.receipt_check?Y.receipt_check:null);return{id:e,title:l?c`${t}<span class="muted"> · 세션</span>`:t,reason:r&&ye?.active!==!0?xi(r.step):"PR \uB300\uAE30",draggable:!1,done:!0,lane:"pr_wait",...O?{dependency_chips:O}:{},external:l,pr_number:j&&typeof j.number=="number"?j.number:null,pr_url:j&&typeof j.url=="string"?j.url:"",completion_badge:je?.live!==!0&&je?.title?je.label:null,completion_title:je?.title||"",..._?.phase==="needs_human"&&typeof _.log_path=="string"&&_.log_path.length>0?{log_path:_.log_path}:{},...Qe.length>0?{receipt_badge:{codes:Qe}}:{},badges:Be?[Be]:[],live_badge:je?.live===!0?Be:null,usage:o,alert:je?.alert===!0,merge_action:N?.tier==="merged"&&!he&&!Ze?!1:!W||q||Ae||G,cancel_action:W&&!q,cancel_enabled:!I&&!(oe&&oe.lock_actions),cancel_title:oe&&oe.lock_actions?`${oe.badge} \u2014 \uC911\uB2E8\uD558\uB824\uBA74 \uC0C1\uB2E8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8\uC744 \uC0AC\uC6A9\uD558\uC138\uC694`:I?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"\uBA38\uC9C0 \uD050\uC5D0\uC11C \uC774 \uD56D\uBAA9\uC744 \uBE8D\uB2C8\uB2E4 (\uB2E4\uC2DC [\uBA38\uC9C0]\uB85C \uB123\uC744 \uC218 \uC788\uC2B5\uB2C8\uB2E4)",discard:re,discard_action:re.action,resolve_action:Se,resolve_enabled:!te,resolve_title:te?"\uC138\uC158 \uAE30\uB3D9 \uC694\uCCAD \uC911 \u2014 \uC11C\uBC84 \uC751\uB2F5\uC744 \uAE30\uB2E4\uB9BD\uB2C8\uB2E4":"\uC774 \uC2E4\uD328\uB97C \uC0AC\uB78C\uC774 \uC774\uC5B4\uBC1B\uB294 \uB300\uD654\uD615 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4 \u2014 \uAE30\uB85D\uB41C \uC138\uC158\uC774 \uC788\uC73C\uBA74 fork\uD558\uACE0, \uC5C6\uC73C\uBA74 \uC0C8 \uC138\uC158\uC5D0 \uC0AC\uC720\uB97C \uC2E3\uC2B5\uB2C8\uB2E4",merge_step:ye,discard_enabled:re.enabled,discard_title:re.title,merge_enabled:!ye&&!Me&&!s&&!pe&&!p&&!(oe&&oe.lock_actions)&&!J&&V.active!==!0&&(se||R||N?.reason==="base_behind"||G||he||Ze||ut||X&&!I),merge_label:q?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":he||Ze?Ie==="deploy"?"\uBC30\uD3EC \uC7AC\uC2DC\uB3C4 \uD6C4 \uC815\uB9AC":Ie==="verify"?"\uAC80\uC99D \uC7AC\uC2DC\uB3C4 \uD6C4 \uC815\uB9AC":"\uC815\uB9AC \uC7AC\uC2DC\uB3C4":R&&!ye&&!he?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":N?.reason==="base_behind"?"base \uAC31\uC2E0 \uD6C4 \uBA38\uC9C0":G?"\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0":Ae?"\uB2E4\uC2DC \uBA38\uC9C0":void 0,merge_title:pe?re.error?`\uD3D0\uAE30 \uC2E4\uD328: ${re.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${re.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:q?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":Me?"\uC694\uCCAD\uC744 \uBCF4\uB0B4\uB294 \uC911 \u2014 \uC11C\uBC84 \uC751\uB2F5\uC744 \uAE30\uB2E4\uB9BD\uB2C8\uB2E4":ye?`\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 ${ye.label}`:Ie?`\uBA38\uC9C0 \uC644\uB8CC \u2014 ${Ie==="deploy"?"\uBC30\uD3EC":"\uAC80\uC99D"} \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD574 \uC815\uB9AC\uAC00 \uBA48\uCDC4\uC2B5\uB2C8\uB2E4. \uD074\uB9AD\uD558\uBA74 \uC800\uC7A5\uC18C \uC791\uC5C5\uBD80\uD130 \uC815\uB9AC\uB97C \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4`:Ze?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uB2E4\uC2DC \uC2DC\uB3C4\uD569\uB2C8\uB2E4":J?"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uC9C1\uC811 \uD574\uC18C\uD558\uC138\uC694":s==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC2E4\uD589 \uC911 \u2014 \uC644\uB8CC \uD6C4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":s==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC77C\uC2DC\uC815\uC9C0 \u2014 \uC7AC\uAC1C \uD6C4 \uC644\uB8CC\uB418\uBA74 \uBA38\uC9C0\uD558\uC138\uC694":he?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC2DC\uB3C4\uD569\uB2C8\uB2E4":R?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":N?.reason==="base_behind"?"base\uB97C \uC790\uB3D9 \uAC31\uC2E0\uD55C \uB4A4 \uBA38\uC9C0\uD569\uB2C8\uB2E4":V.active===!0?V.origin==="auto"?"\uC790\uB3D9 \uB9AC\uBDF0 \uC138\uC158 \uC2E4\uD589 \uC911 \u2014 \uB05D\uB098\uBA74 \uC601\uC218\uC99D\uC744 \uB2E4\uC2DC \uD310\uC815\uD569\uB2C8\uB2E4":"\uB9AC\uBDF0 \uC138\uC158 \uC2E4\uD589 \uC911 \u2014 \uB05D\uB098\uBA74 \uC601\uC218\uC99D\uC744 \uB2E4\uC2DC \uD310\uC815\uD569\uB2C8\uB2E4":N?.reason==="review_receipt_missing"?"\uB9AC\uBDF0 \uC601\uC218\uC99D \uC5C6\uC74C \u2014 \uBA38\uC9C0 \uAC8C\uC774\uD2B8 \uBCF4\uB958\uC785\uB2C8\uB2E4. \uD074\uB9AD\uD558\uBA74 \uAE30\uB85D\uB41C \uC138\uC158\uC744 \uC774\uC5B4 \uB9AC\uBDF0\uB9CC \uC218\uD589\uC2DC\uD0A4\uACE0, \uC601\uC218\uC99D\uC774 \uCD5C\uC885 head\uC5D0 \uC720\uD6A8\uD574\uC9C0\uBA74 \uD050\uAC00 \uBA38\uC9C0\uD569\uB2C8\uB2E4":N?.reason==="review_receipt_stale"?"head \uC7AC\uC791\uC131\uB428(\uC601\uC218\uC99D\uC774 \uD604\uC7AC head\uC758 \uC870\uC0C1\uC774 \uC544\uB2D8) \u2014 \uBA38\uC9C0 \uAC8C\uC774\uD2B8 \uBCF4\uB958\uC785\uB2C8\uB2E4. \uD074\uB9AD\uD558\uBA74 \uAE30\uB85D\uB41C \uC138\uC158\uC744 \uC774\uC5B4 \uCD5C\uC885 head\uB97C \uB2E4\uC2DC \uB9AC\uBDF0\uC2DC\uD0A4\uACE0, \uC601\uC218\uC99D\uC774 \uC720\uD6A8\uD574\uC9C0\uBA74 \uD050\uAC00 \uBA38\uC9C0\uD569\uB2C8\uB2E4":N?.reason==="review_receipt_invalid"?"\uB9AC\uBDF0 \uC601\uC218\uC99D \uAE30\uB85D\uC774 \uC131\uB9BD\uD558\uC9C0 \uC54A\uC74C \u2014 \uBA38\uC9C0 \uAC8C\uC774\uD2B8 \uBCF4\uB958\uC785\uB2C8\uB2E4. \uD074\uB9AD\uD558\uBA74 \uAE30\uB85D\uB41C \uC138\uC158\uC744 \uC774\uC5B4 \uCD5C\uC885 head\uB97C \uB2E4\uC2DC \uB9AC\uBDF0\uC2DC\uD0A4\uACE0, \uC601\uC218\uC99D\uC774 \uC720\uD6A8\uD574\uC9C0\uBA74 \uD050\uAC00 \uBA38\uC9C0\uD569\uB2C8\uB2E4":N?.reason==="review_receipt_undetermined"?"\uB9AC\uBDF0 \uC601\uC218\uC99D ancestry probe \uBBF8\uC644\uB8CC \u2014 \uBA38\uC9C0 \uAC8C\uC774\uD2B8 \uBCF4\uB958\uC785\uB2C8\uB2E4. \uD074\uB9AD\uD558\uBA74 \uAE30\uB85D\uB41C \uC138\uC158\uC744 \uC774\uC5B4 \uCD5C\uC885 head\uB97C \uB2E4\uC2DC \uB9AC\uBDF0\uC2DC\uD0A4\uACE0, \uC0C8 \uC601\uC218\uC99D\uC774 \uCD5C\uC885 head\uC5D0 \uC720\uD6A8\uD574\uC9C0\uBA74 \uD050\uAC00 \uBA38\uC9C0\uD569\uB2C8\uB2E4":N?.reason==="spec_id_missing"?"native spec_id \uBBF8\uAE30\uB85D \u2014 bd update --spec-id\uB85C \uAE30\uB85D\uD55C \uB4A4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":se?`\uBA38\uC9C0 (${N.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4 (\uCC28\uB840\uAC00 \uB418\uBA74 \uB2E4\uC2DC \uD655\uC778)`:N&&N.tier==="merged"?"\uBA38\uC9C0\uB428 \u2014 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC \uC9C4\uD589 \uC911":`\uBA38\uC9C0 \uBD88\uAC00: ${N&&N.reason||"\uAD00\uCE21 \uB300\uAE30"}`}}function Xl(e,t={}){let{transport:n,issueStores:r,queueStore:o,sessionLogStore:i,gotoIssue:s,getWorkspacePath:l,switchWorkspace:a,openDoc:u,doneRange:d,onDoneRangeChange:p}=t,_=r?no(r):null,m=Mk(),y=null,C=null,O=null,V=null,te=co(()=>$()),W=new Map,q=new Map,I=t_(),P=Kl(I)===null,U=d?Hn(d):Nk();function Y(){let h=Qr.find(g=>g.value===U);return h?h.label:"\uC624\uB298"}let N=Qi("beads-ui.worker.lane-collapsed"),j=!1,z="";function K(){return z.trim().length>0}function oe(h){return K()?h.filter(g=>g.search_match===!0).length:void 0}let ve=new Set,Ne=new Set,F=new Set;function X(h,g){return!g?.error||!h?{}:{resolve_action:!0,resolve_enabled:!F.has(h),resolve_title:F.has(h)?"\uC138\uC158 \uAE30\uB3D9 \uC694\uCCAD \uC911 \u2014 \uC11C\uBC84 \uC751\uB2F5\uC744 \uAE30\uB2E4\uB9BD\uB2C8\uB2E4":"\uC2E4\uD328\uD55C \uD3D0\uAE30\uB97C \uC0AC\uB78C\uC774 \uC774\uC5B4\uBC1B\uB294 \uB300\uD654\uD615 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4 \u2014 \uAE30\uB85D\uB41C \uC138\uC158\uC774 \uC788\uC73C\uBA74 fork\uD558\uACE0, \uC5C6\uC73C\uBA74 \uC0C8 \uC138\uC158\uC5D0 \uC0AC\uC720\uB97C \uC2E3\uC2B5\uB2C8\uB2E4"}}let Ae=new Set,Ee=new Set,R=new Set,se=null,ye=[],ke=v_({queueStore:o,issueStores:r,transport:n,getWorkspacePath:l,onInvalidate:()=>$()});function Me(){ke.refreshSessionDefaults()}let he=document.createElement("div");he.className="worker-console";let Ie=document.createElement("div");Ie.className="worker-top";let Ze=document.createElement("div");Ze.className="worker-drawer-overlay",Ze.hidden=!0;let ut=document.createElement("div");ut.className="worker-drawer-overlay__backdrop";let G=document.createElement("div");G.className="worker-drawer-host";let J=document.createElement("div");J.className="worker-drawer-host",J.hidden=!0,Ze.append(ut,G,J);let re=document.createElement("div");re.className="worker-lanes-host",he.append(Ie,Ze,re),e.appendChild(he);let pe=yr(null,null),Se=[],me=Zi({transport:n,console_el:he,getLanes:()=>pe,getWorkspaces:()=>Se,getCrossLanes:()=>null,reproject:()=>({lanes:Ut(),raw_lanes:null}),onCorrection:()=>{},showToast:ge,requestRender:()=>$(),adoptQueue:(h,g)=>{o&&o.set(g)},onDragBegin:()=>{y=null}}),je=null,Be=xo(G,{transport:n,sessionLogStore:i,onClose:()=>{je=null,Ze.hidden=!0,$()}}),Qe=h_(J,{onClose:()=>{J.hidden=!0,Ze.hidden=!0,$()}}),He=c_({getWorkspacePath:l||(()=>"")}),ee=l&&l()||"",Q=d_({queueStore:o,transport:n,onChanged:()=>$(),onOpenScript:(h,g)=>{He.open(h,g)}});function xe(){return o&&o.get()||{revision:0,auto_advance:!1,auto_merge:!1,slots:sa,queue:[],serial_lanes:[],serial_lane_count:0,pr_wait:[],done:[]}}function _t(h){for(let g of Object.values(Lt(xe().provider_hold)))for(let T of Array.isArray(g?.targets)?g.targets:[])if(Array.isArray(T?.attempt_ids)&&T.attempt_ids.includes(h))return T;return null}function pt(h){if(h?.status!=="ok")return{eligible:!1,reason:`\uACC4\uC815 \uC0C1\uD0DC ${String(h?.status||"\uBBF8\uC0C1")}`};let g=Array.isArray(h.windows)?h.windows:[],T=g.find(ue=>ue?.key==="5h"),ie=g.find(ue=>ue?.key==="7d");if(!T||typeof T.pct!="number")return{eligible:!1,reason:"5\uC2DC\uAC04 \uC0AC\uC6A9\uB7C9 \uBBF8\uAD00\uCE21"};if(T.pct>80)return{eligible:!1,reason:"5\uC2DC\uAC04 \uC0AC\uC6A9\uB7C9 80% \uCD08\uACFC"};if(ie){if(typeof ie.pct!="number")return{eligible:!1,reason:"7\uC77C \uC0AC\uC6A9\uB7C9 \uBBF8\uAD00\uCE21"};if(ie.pct>90)return{eligible:!1,reason:"7\uC77C \uC0AC\uC6A9\uB7C9 90% \uCD08\uACFC"}}return{eligible:!0,reason:""}}function Ke(h){let g=Lt(xe().attempts)[h];if(!g)return;let T=Lt(xe().runner_catalog),ie=Lt(T.runners),ue=typeof g.runner=="string"&&ie[g.runner]?g.runner:Object.keys(ie)[0]||"",Oe=Lt(ie[ue]),ze=Lt(Oe.models),Et=typeof g.model=="string"&&ze[g.model]?g.model:typeof Oe.default_model=="string"?Oe.default_model:Object.keys(ze)[0]||"",Yt=_t(h),lt=typeof g.claude_account=="string"?g.claude_account:typeof Yt?.account=="string"?Yt.account:"";V={attempt_id:h,original_runner:ue,runner:ue,model:Et,account:lt,fresh_current:!1},$()}function et(){V=null,$()}function x(){let h=V;if(!h||!h.runner||!h.model||h.runner==="claude"&&!h.account)return;let g={runner:h.runner,model:h.model};h.runner==="claude"&&h.account&&(g.claude_account=h.account);let T=h.fresh_current||h.runner!==h.original_runner;V=null,$(),kt(h.attempt_id,"session",{exec_override:g,...T?{continuation:"fresh_current",decision_token:{}}:{}})}function Z(){let h=V;if(!h)return"";let g=Lt(Lt(xe().runner_catalog).runners),T=Array.isArray(Lt(xe().account_catalog).claude)?Lt(xe().account_catalog).claude:[],ie=h.runner!==h.original_runner;return c`<dialog
      class="op-dialog provider-resume-dialog"
      aria-label="다른 방법으로 이어하기"
    >
      <h2>다른 방법으로 이어하기</h2>
      <div class="provider-resume-dialog__fields">
        <label>
          러너
          <select class="provider-resume-dialog__runner">
            ${Object.keys(g).map(ue=>c`<option
                  value=${ue}
                  ?selected=${ue===h.runner}
                >
                  ${ue}
                </option>`)}
          </select>
        </label>
        <label>
          모델
          <select class="provider-resume-dialog__model">
            ${Object.entries(g).map(([ue,Oe])=>c`<optgroup label=${ue}>
                  ${Object.keys(Lt(Oe?.models)).map(ze=>c`<option
                        value=${JSON.stringify([ue,ze])}
                        ?selected=${ue===h.runner&&ze===h.model}
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
                ${h.account&&!T.some(ue=>ue?.email===h.account)?c`<option value=${h.account} selected>
                      ${h.account} (목록에 없음)
                    </option>`:""}
                ${T.map(ue=>{let Oe=pt(ue),ze=ue.alias||ue.email;return c`<option
                    value=${ue.email}
                    ?selected=${ue.email===h.account}
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
    </dialog>`}function Le(h){if(!y||!h.some(T=>T.id===y))return null;let g=Ko(xe());return g?{bead_id:y,lanes:g}:null}function Ye(){return l&&l()||""}async function tt(h,g){await me.sendOp({type:"worker-queue-place",payload:{bead_id:h,...g==="parallel"?{}:{lane:g}},root_dir:Ye()},h)}function Ce(){let h=xe();return typeof h.revision=="number"?h.revision:0}function Je(h){h&&h.queue&&o&&o.set(h.queue)}async function Bt(h){if(!n||!h)return;let g=await n("worker-attempt-pause",{attempt_id:h});g&&g.paused===!1&&g.reason&&ge(`\uC77C\uC2DC\uC815\uC9C0 \uAC70\uBD80: ${g.reason}`,"error",2400)}async function kt(h,g="session",T={}){if(!n||!h)return;let ie=n,ue=xe().attempts?.[h]||null;await so({context:{bead_id:ue?.bead_id||"",kind:g,tuple:ue?En(ue):""},transport:Oe=>ie("worker-attempt-resume",{attempt_id:h,expected_revision:Ce(),...T,...Oe}),adopt:Je})}async function ht(h,g,T=!0){if(!n)return null;let ie=n,ue=await ie(h,{...g,expected_revision:Ce()});return Je(ue),ue&&ue.conflict&&T&&(ue=await ie(h,{...g,expected_revision:Ce()}),Je(ue)),ue}async function Dt(h){if(!n||!h)return;let g=xe().merge_queue?.find(ie=>ie.bead_id===h)?.continuation_action;if(g?.mismatch&&g.continuation===null){await Ge(h,g.mismatch);return}ve.add(h),$();let T;try{T=await ht("worker-merge-queue-add",{bead_id:h})}catch{ge("\uBA38\uC9C0 \uD074\uB9AD\uC774 \uC11C\uBC84\uC5D0 \uC804\uB2EC\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4(\uC5F0\uACB0 \uBB38\uC81C) \u2014 \uC5F0\uACB0 \uBCF5\uAD6C \uD6C4 \uB2E4\uC2DC \uB20C\uB7EC\uC8FC\uC138\uC694","error",3200);return}finally{ve.delete(h),$()}if(!(!T||T.applied)){if(T.conflict){ge("\uD050\uAC00 \uBC14\uB00C\uC5B4 \uBA38\uC9C0 \uD074\uB9AD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uB20C\uB7EC\uC8FC\uC138\uC694","error",2400);return}ge(Bk(T.reason),"error",2400)}}async function Rt(h){if(!(!n||!h||Ne.has(h))){Ne.add(h),$();try{let g=await n("worker-cleanup-retry",{bead_id:h,expected_revision:Ce()});Je(g),g&&!g.retried&&!g.conflict&&g.reason&&ge(`\uC815\uB9AC \uC7AC\uC2DC\uB3C4 \uAC70\uBD80: ${g.reason}`,"error",2400)}finally{Ne.delete(h),$()}}}async function Mt(h){if(!(!n||!h||F.has(h))){F.add(h),$();try{let g=await n("worker-resolve-in-session",{bead_id:h,expected_revision:Ce()});Je(g),ge(zk(g),Hk(g),4e3)}finally{F.delete(h),$()}}}async function ce(h,g){let T=xe().hold;if(!n||!T||typeof T.since!="number")return;let ie=await n(h,{since:T.since});Je(ie),ie&&ie.ok===!1&&ge(`${g}: ${ie.reason==="hold_changed"?"\uD050 \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uD655\uC778\uD558\uC138\uC694":ie.reason||""}`,"error",2800)}async function be(h,g){if(!n||!h||!g)return;let T=await n("worker-parked-retry",{bead_id:h,attempt_id:g});Je(T),T&&T.ok===!1&&ge(`\uC7AC\uC2DC\uB3C4 \uAC70\uBD80: ${T.reason==="not_latest"?"\uC774 bead\uC5D0 \uB354 \uC0C8\uB85C\uC6B4 \uC2DC\uB3C4\uAC00 \uC788\uC2B5\uB2C8\uB2E4":T.reason||""}`,"error",2800)}async function Ge(h,g){let T=await _r({continuation_mismatch:g},(ue,Oe)=>ht("worker-merge-queue-add",{bead_id:h,continuation:ue,decision_token:Oe},!1)),ie=T?.queue?.merge_queue?.find(ue=>ue.bead_id===h)?.continuation_action;if(T?.applied!==!0&&ie?.continuation===null&&ie.mismatch){await Ge(h,ie.mismatch);return}T&&T.applied===!1&&!T.conflict&&ge("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD\uC774 \uCD5C\uC2E0 \uC0C1\uD0DC\uC640 \uC77C\uCE58\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4","error",2800)}async function rt(h){if(!n)return;let g=await ht("worker-merge-auto-toggle",{on:h});!g||g.conflict||ge(h?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0 \u2014 \uB300\uAE30 \uD56D\uBAA9\uC744 \uBE44\uC6E0\uC2B5\uB2C8\uB2E4",h?"success":"info",2400)}async function Re(h){if(!n||!h)return;let g=await ht("worker-merge-queue-remove",{bead_id:h});g&&!g.conflict&&!g.applied&&g.reason==="merge_active"&&ge("\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error",2400)}async function E(){await ht("worker-merge-queue-remove",{all:!0})}async function L(h,g=null,T="unmerged",ie=null){if(!n||!h)return;let ue=Yo(h,T);if(!(!!ie||typeof globalThis.confirm!="function"||globalThis.confirm(ue)))return;let ze=await n("worker-discard",{bead_id:h,...g?{attempt_id:g}:{},...ie?{operation_id:ie}:{},expected_revision:Ce()});if(Je(ze),ze&&ze.conflict&&(ze=await n("worker-discard",{bead_id:h,...g?{attempt_id:g}:{},...ie?{operation_id:ie}:{},expected_revision:Ce()}),Je(ze)),ze&&ze.discarded===!0){ge(fi(ze),"success",5e3);return}if(ze&&ze.reason){ge(`\uD3D0\uAE30 \uC2E4\uD328: ${ze.reason}`,"error",2800);return}if(ze&&ze.accepted&&ze.pending==="merged_revert"){ge("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success",2400);return}if(ze&&ze.accepted&&!ze.discarded){ge(`\uD3D0\uAE30 \uC9C4\uD589: ${ze.phase||"\uBC31\uC5C5 \uC911"}`,"success",2400);return}ze&&!ze.conflict&&ge("\uD3D0\uAE30 \uAC70\uBD80: unknown","error",2800)}async function ne(h,g,T){if(!n||!h||!g||typeof globalThis.confirm=="function"&&!globalThis.confirm(Vo(h,T)))return;let ie=await n("worker-discard-abandon",{bead_id:h,operation_id:g,expected_revision:Ce()});if(Je(ie),ie&&ie.conflict&&(ie=await n("worker-discard-abandon",{bead_id:h,operation_id:g,expected_revision:Ce()}),Je(ie)),ie&&ie.abandoned===!0){ge(pi(T),"success",5e3);return}if(ie&&ie.reason){ge(`\uD3D0\uAE30 \uD3EC\uAE30 \uAC70\uBD80: ${ie.reason}`,"error",2800);return}ie&&!ie.conflict&&ge("\uD3D0\uAE30 \uD3EC\uAE30 \uAC70\uBD80: unknown","error",2800)}async function fe(h,g,T){if(!(!n||!g||!T||Ee.has(g))){Ee.add(g),$();try{let ie=await n(h,{bead_id:g,action_id:T,expected_revision:Ce()});Je(ie),ie?.conflict?ge("\uC774\uC804 \uC791\uC5C5 \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694.","error",2800):!ie?.ok&&ie?.reason&&ge(`\uC774\uC804 \uC791\uC5C5 \uCC98\uB9AC \uAC70\uBD80: ${String(ie.reason)}`,"error",2800)}finally{Ee.delete(g),$()}}}async function _e(h,g){if(!n||!g||Ae.has(g))return;Ae.add(g),$();let T;try{let ie=async(ue={})=>await n(h,{bead_id:g,expected_revision:Ce(),...ue});T=await ie(),Je(T),T&&T.conflict&&(T=await n(h,{bead_id:g,expected_revision:Ce()}),Je(T)),h==="worker-revise-fix"&&(T=await _r(T,(ue,Oe)=>ie({continuation:ue,decision_token:Oe}),{onResult:Je,refresh:()=>ie()}))}finally{Ae.delete(g),$()}if(!(!T||T.conflict)){if(T.ok){ge(h==="worker-revise-fix"?"\uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4 \u2014 \uC218\uB9AC \uD6C4 \uAD6C\uD604\uC774 \uC7AC\uB514\uC2A4\uD328\uCE58\uB429\uB2C8\uB2E4":"\uB378\uD0C0 \uC2B9\uC778 \uC644\uB8CC \u2014 \uC601\uC218\uC99D \uAC31\uC2E0 + \uD30C\uD0B9 \uD574\uC81C","success",2800);return}ge(`\uCC98\uBD84 \uAC70\uBD80: ${T.reason||""}`,"error",3e3)}}async function De(h){if(!n)return;let g=await n("worker-automation-toggle",{on:h,expected_revision:Ce()});Je(g),g&&g.conflict&&await n("worker-automation-toggle",{on:h,expected_revision:Ce()}).then(Je)}async function yt(h){if(!n||!h)return;let g=await n("worker-repo-operation-dismiss",{operation_id:h});Je(g),g&&g.ok===!1&&ge(`\uAE30\uB85D \uB2EB\uAE30 \uAC70\uBD80: ${g.reason||""}`,"error",3e3)}async function xt(h){if(!n||!Number.isFinite(h))return;let g=Math.max(sa,Math.floor(h)),T=await n("worker-queue-set-slots",{slots:g,expected_revision:Ce()});Je(T),T&&T.conflict&&await n("worker-queue-set-slots",{slots:g,expected_revision:Ce()}).then(Je)}async function bt(h){if(!n||!Number.isInteger(h)||h<1||h>k_)return;let g=xe(),T=(Array.isArray(g.serial_lanes)?g.serial_lanes:[]).slice(h).reduce((Oe,ze)=>Oe+(Array.isArray(ze?.entries)?ze.entries.length:0),0),ie=()=>({count:h,expected_revision:Ce()}),ue=await n("worker-queue-set-serial-lane-count",ie());Je(ue),ue&&ue.conflict&&(ue=await n("worker-queue-set-serial-lane-count",ie()),Je(ue)),ue&&ue.applied&&T>0&&ge(`\uC9C1\uB82C \uB808\uC778 \uCD95\uC18C \u2014 ${T}\uAC1C \uD56D\uBAA9\uC774 \uBCD1\uB82C \uB300\uAE30\uB85C \uC774\uB3D9`)}function Ut(){let h=Lr(U),g=ke.read({candidate_sort:I,done_since:h});return Se=g.workspaces,pe=yr(g.workspaces,g.workspaces_state,{done_since:h,candidate_filter:m,candidate_hidden_counts:"per_control",candidate_sort:"as_given",groups:"all",search:z}),pe}function wt(h){return h.queue_groups[0]||Dk}function qt(h){let g=h.dependency_chips||null,T={...g&&g.released?{released:g.released}:{},...g&&g.dependents?{dependents:g.dependents}:{}},ie=W.get(h.id),ue=q.get(h.id)||null,Oe=ie&&ie.overlaps.length>0?ie.overlaps:null,ze=!!ie&&ie.scope_missing;return!ue&&!Oe&&!ze&&Object.keys(T).length===0?null:{...T,...ue?{predecessors:ue}:{},...Oe?{overlaps:Oe}:{},...ze?{scope_missing:!0}:{}}}function At(h){return{...h,workspace_name:"",done_layout:void 0,dependency_chips:qt(h)||void 0,chip_popover:Xt(h)}}function Xt(h){return vi(h,g=>te.isOpen({bead_id:h.id,chip_key:g}))}function Jt(){let h=xe(),g=new Map;for(let T of Object.values(Lt(h.lane_states))){let ie=Array.isArray(T?.corrections)?T.corrections:[];for(let ue of ie)ue&&typeof ue.bead_id=="string"&&typeof ue.after=="string"&&g.set(ue.bead_id,ue.after)}return{admission:Lt(h.admission),correction_after:g}}function Ot(h,g){let T=At(h),ie=ld(g.admission[h.id]||null,!!h.discard||Ee.has(h.id)),ue=g.correction_after.get(h.id);return{...T,draggable:T.draggable===!0&&!ie,stale_work:ie,reason:ie?"":T.reason,badges:ue?[`\u{1F517} ${ue} \uB4A4 (blocks \uC790\uB3D9)`,...T.badges||[]]:T.badges,revise_enabled:T.revise_enabled===!0&&!Ae.has(h.id)}}function St(h){let g=Jt();return wt(h).sublanes.parallel.map(T=>Ot(T,g))}function Gt(h){let g=Jt();return wt(h).sublanes.serial.map(T=>{let ie=T.occupants.map(ue=>({id:ue.id,title:ue.title,draggable:!1,lane:T.id,ghost:!0,badges:[ue.badge],...typeof ue.search_match=="boolean"?{search_match:ue.search_match}:{}}));return{id:T.id,index:T.index+1,raw_length:T.raw_length,ghosts:ie,items:T.items.map(ue=>Ot(ue,g)),occupied:T.occupied_by.length>0,badge:T.occupants.length>0?T.occupants[0].badge:"\uB300\uAE30",cycle:T.cycle===!0}})}function tn(h){return h.runnable.map(g=>At(g))}function rn(h){return h.done.map(g=>At(g))}function zt(h){let g=h.running.filter(T=>T.non_occupying!==!0).map(T=>({...T,bead_id:T.id,attempt_id:T.attempt_id||"",paused:T.run_state==="paused",failed:T.run_state==="failed",parked:T.run_state==="parked",retry_wait:T.run_state==="retry_wait",waiting:T.run_state==="waiting",wait:T.wait||null,provider_hold:T.run_state==="provider_hold",hold:T.hold?{...T.hold,open:O===T.attempt_id}:null,status_label:T.run_state==="failed"?T.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328":T.run_state==="parked"?"\uC138\uC158 \uB300\uAE30":T.run_state==="retry_wait"?"\uC7AC\uC2DC\uB3C4 \uB300\uAE30":T.run_state==="waiting"?"\uC120\uD589 \uB300\uAE30":T.run_state==="provider_hold"?"\uACF5\uAE09\uC790 \uBCF4\uB958":void 0,can_pause:T.can_pause!==!1,workspace_name:"",dependency_chips:qt(T)||void 0,chip_popover:Xt(T),rollup_expanded:R.has(T.id),failure:T.failure?{...T.failure,open:C===T.attempt_id}:null,...X(T.id,T.discard)}));return[...g.filter(T=>T.failed===!0),...g.filter(T=>T.failed!==!0&&T.parked===!0),...g.filter(T=>T.failed!==!0&&T.parked!==!0)]}function on(h){return we(h).map(g=>({...g,chip_popover:Xt(g)}))}function we(h){if(se&&se.model===h)return se.rows;let g=xe(),T=wt(h),ie=Lt(g.attempts),ue=Object.values(ie).filter(rr),Oe=new Map;for(let Ve of ue)Oe.set(Ve.attempt_id,Ve);let ze=new Map;for(let Ve of ue)ze.set(Ve.bead_id,Ve);let Et=new Map;for(let Ve of[...h.pr_wait,...h.running,...h.queue,...h.runnable,...h.done])Et.has(Ve.id)||Et.set(Ve.id,Ve);let Yt=Ve=>{let Ht=null;for(let An of ue)!An||An.bead_id!==Ve||ol(An,Oe)||(Ht===null||(typeof An.started_at=="number"?An.started_at:0)>=(typeof Ht.started_at=="number"?Ht.started_at:0))&&(Ht=An);return Ht&&typeof Ht.target_base=="string"?Ht.target_base:null},lt=new Map;for(let Ve of h.running)Ve.run_state==="failed"||Ve.conflict_resolution!==!0||(Ve.run_state!=="paused"?lt.set(Ve.id,"running"):lt.has(Ve.id)||lt.set(Ve.id,"paused"));let sn=Lt(g.auto_merge_skips),cn=new Set(T.merge.auto_excluded),Wn=Lt(g.pr_observations),fn=Lt(g.pr_activity),dn=Lt(g.cleanup_failed),On=Lt(g.discard_operations),Qn=Lt(g.bead_workflow),an=Lt(g.bead_titles),Xn=g.merge_queue_state||{active:null,failures:{}},cr=T.merge.state.waiting,In=new Map;for(let Ve of Array.isArray(g.merge_queue)?g.merge_queue:[])Ve&&typeof Ve=="object"&&Ve.bead_id&&In.set(Ve.bead_id,Ve);let zn=(Array.isArray(g.pr_wait)?g.pr_wait:[]).map(Ve=>{let Ht=Et.get(Ve.bead_id);return{...nw(Ve.bead_id,Ht?.title||an[Ve.bead_id]||Ve.bead_id,Wn,dn[Ve.bead_id]||null,nr(ie,Ve.bead_id),fn[Ve.bead_id]||(ve.has(Ve.bead_id)?{activity:null,merge_progress:null,queueing:"merge"}:Ne.has(Ve.bead_id)?{activity:null,merge_progress:null,queueing:"cleanup"}:null),lt.get(Ve.bead_id)||null,Ve.external===!0,{position:T.merge.positions.get(Ve.bead_id)||0,active:Xn.active===Ve.bead_id,failure:Lt(Xn.failures)[Ve.bead_id]||null,waiting:cr&&cr.bead_id===Ve.bead_id?cr.reason:null,resolution:T.merge.resolutions.get(Ve.bead_id),continuation_action:T.merge.continuations.get(Ve.bead_id),authority:T.merge.authorities.get(Ve.bead_id)||null,hold:In.get(Ve.bead_id)?.hold||null,review_dispatch:In.get(Ve.bead_id)?.review_dispatch||null},Ve.wt_present!==!1,g.auto_merge===!0&&cn.has(Ve.bead_id)?sn[Ve.bead_id]?.reason||"":null,rl(T.declared_base,Yt(Ve.bead_id)),Lt(g.completion_status)[Ve.bead_id]||null,On,g.auto_merge===!0,{merge_sha:Ve.merge_sha,cleanup_cursor:Ve.cleanup_cursor,repo_operations:T.repo_operations},Ht?qt(Ht):null,rd(ie,Ve.bead_id),F.has(Ve.bead_id)),...Ht?.search_match===void 0?{}:{search_match:Ht.search_match},workflow:Qn[Ve.bead_id]||null,priority:Ht?.priority,from_id:Ht?.from_id,...Ht?.created_at===void 0?{}:{created_at:Ht.created_at},...Ht?.updated_at===void 0?{}:{updated_at:Ht.updated_at}}});return se={model:h,rows:zn},zn}function S(h){let g=wt(h),T=[];for(let Oe of h.running)Oe.non_occupying!==!0&&T.push({id:Oe.id,title:Oe.title,location_label:"\uC2E4\uD589\uC911",kind:"running",lane_id:Oe.serial_lane_id??null});for(let Oe of h.pr_wait)T.push({id:Oe.id,title:Oe.title,location_label:"PR \uB300\uAE30",kind:"pr_wait",lane_id:null});for(let Oe of g.sublanes.serial)Oe.items.forEach((ze,Et)=>{T.push({id:ze.id,title:ze.title,location_label:`${Oe.id} #${Et+1}`,kind:"serial",lane_id:Oe.id})});g.sublanes.parallel.forEach((Oe,ze)=>{T.push({id:Oe.id,title:Oe.title,location_label:`#${ze+1}`,kind:"parallel",lane_id:null})});for(let Oe of h.runnable)T.push({id:Oe.id,title:Oe.title,location_label:"\uD6C4\uBCF4",kind:"candidate",lane_id:null,queue_placeable:Oe.queue_placeable===!0});let ie=xe();W=s_(ie.bead_scope,T);let ue=new Map;for(let Oe of[...h.running,...h.runnable])Array.isArray(Oe.blocked_by)&&Oe.blocked_by.length>0&&ue.set(Oe.id,Oe.blocked_by);for(let[Oe,ze]of Object.entries(Lt(ie.bead_blocked_by)))Array.isArray(ze)&&ue.set(Oe,ze.filter(Et=>typeof Et=="string"&&Et.length>0));q=vd(ue,T,Lt(ie.blocker_workspaces))}function de(h){let g=h.hold&&typeof h.hold=="object"?h.hold:null;if(!g||g.kind!=="env"&&g.kind!=="systemic")return"";let T=wr(g.cause)||String(g.cause||""),ie=Array.isArray(h.lineages)?h.lineages:[];if(g.kind==="env"){let Oe=ie.map(Et=>Et&&Et.next_at).filter(Et=>typeof Et=="number").sort((Et,Yt)=>Et-Yt)[0],ze=typeof Oe=="number"?` \xB7 \uB2E4\uC74C ${new Date(Oe).toLocaleTimeString("ko-KR",{hour:"2-digit",minute:"2-digit"})}`:"";return c`<div class="worker-hold worker-hold--env" role="status">
        <span class="worker-hold__text"
          >환경 보류: ${T} — 재시도 대기${ze}</span
        >
        <button
          type="button"
          class="worker-hold__retry"
          title="예약된 재시도를 지금 실행합니다"
        >
          지금 재시도
        </button>
      </div>`}let ue=(Array.isArray(g.bead_ids)?g.bead_ids:[]).filter(Oe=>typeof Oe=="string"&&Oe.length>0);return c`<div class="worker-hold worker-hold--systemic" role="alert">
      <span class="worker-hold__text"
        >${T}${ue.length>0?` \u2014 bead ${ue.join(", ")}`:""}</span
      >
      <button
        type="button"
        class="worker-hold__resume"
        title="정지를 풀고 멈춰 있던 bead를 다시 디스패치합니다"
      >
        재개
      </button>
    </div>`}function qe(h){let g=[];for(let[lt,sn]of Object.entries(Lt(h.provider_hold)))for(let cn of Array.isArray(sn?.targets)?sn.targets:[])g.push({runner:lt,target:cn});if(g.length===0)return"";let T=g.find(lt=>lt.target?.kind==="outage");if(T){let lt=typeof T.target.next_probe_at=="number"?new Date(T.target.next_probe_at).toLocaleTimeString("ko-KR",{hour:"2-digit",minute:"2-digit"}):"";return c`<div class="worker-provider-gate" role="status">
        ⚠️ ${T.runner} 공급자 장애 — 신규 디스패치
        보류${lt?`, \uB2E4\uC74C \uD504\uB85C\uBE0C ${lt}`:""}
      </div>`}let ie=Array.isArray(Lt(h.account_catalog).claude)?Lt(h.account_catalog).claude:[],ue=lt=>ie.find(cn=>cn?.email===lt)?.alias||lt,Oe=g.find(lt=>typeof lt.target?.account!="string"),ze=lt=>typeof lt?.resets_at=="number"?new Date(lt.resets_at).toLocaleTimeString("ko-KR",{hour:"2-digit",minute:"2-digit"}):"";if(Oe){let lt=ze(Oe.target);return c`<div class="worker-provider-gate" role="status">
        ⏳ ${Oe.runner} 사용 한도 — 계정 미확인이라 러너 전체 디스패치
        보류${lt?`, \uB9AC\uC14B ${lt}`:""}
      </div>`}let Et=[...new Set(g.map(lt=>ue(String(lt.target.account))))],Yt=ze(g[0].target);return c`<div class="worker-provider-gate" role="status">
      ⏳ ${Et.join(", ")} 사용 한도 —
      ${Et.length>1?"\uADF8 \uACC4\uC815\uB4E4":"\uADF8 \uACC4\uC815"} 디스패치
      보류${Yt?`, \uB9AC\uC14B ${Yt}`:""}
    </div>`}function b(h){let g=xe(),T=wt(h),ie=T.sublanes.parallel,ue=ie.length>0?ie[0].id:"\u2014",Oe=c`<button
      type="button"
      class="worker-play${g.auto_advance?" is-active":""}"
    >
      ${g.auto_advance?"\u23F8 \uC790\uB3D9\uD654 \uBA48\uCDA4":"\u25B6 \uC790\uB3D9\uD654"}
    </button>`,ze=B(h),Et=T.over_cap?c`<span
          class="worker-overcap"
          title="수동 재개(▶)는 슬롯 cap을 초과할 수 있습니다 — 자동 진행은 cap을 지킵니다"
          >cap 초과</span
        >`:"",Yt=g.auto_advance?0:(Array.isArray(g.queue)?g.queue:[]).filter(an=>an&&typeof an.armed_by_lane=="string"&&an.armed_by_lane.length>0).length,lt=Yt>0?c`<span
            class="worker-kpi__chip worker-kpi__chip--armed"
            title="모니터 연결 레인이 발차한 대기 행입니다 — 이 레포의 자동 진행은 꺼진 채입니다"
            >⏸ 자동 진행 꺼짐 · 연결 레인 ${Yt}건 진행 중</span
          >`:"",sn=c`<span class="worker-kpi__chip worker-kpi__chip--running"
        >실행 <b>${T.live_count}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--pr"
        >PR 대기 <b>${on(h).length}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--done"
        >${Y()} 완료 <b>${h.done.length}</b></span
      >`,cn=c`<span
      class="worker-kpi__chip worker-kpi__chip--base"
      title=${T.declared_base?"\uC774 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uC5B8\uD55C target base (docs/agents/repo-ops.toml). \uB514\uC2A4\uD328\uCE58 \uC2DC\uC810\uC758 \uAC80\uC99D\uC740 \uBCC4\uB3C4":"\uC120\uC5B8 \uD30C\uC77C\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 \u2014 target base \uD655\uC778 \uBD88\uAC00"}
      >base ${T.declared_base||"?"}</span
    >`,Wn=c`<label class="worker-tgl worker-slots"
        >동시 실행
        <input
          type="number"
          class="worker-slots__input"
          min=${sa}
          step="1"
          .value=${String(T.slots)}
          title="동시에 실행할 세션 수 (최소 1 = 순차 실행)"
      /></label>
      <label
        class="worker-tgl worker-serial-lanes"
        title="고정 직렬 레인 수 (1~5). 축소 시 잘린 레인의 대기 항목은 병렬 대기로 돌아갑니다"
        >직렬 레인
        <select class="worker-serial-lane-count" aria-label="직렬 레인 수">
          ${Array.from({length:k_},(an,Xn)=>Xn+1).map(an=>c`<option
                value=${String(an)}
                ?selected=${T.serial_lane_count===an}
              >
                ${an}
              </option>`)}
        </select>
      </label> `,fn=c`<input
      type="search"
      class="worker-search"
      placeholder="ID·제목 검색"
      aria-label="이슈 검색 (ID·제목)"
      .value=${z}
    />`,dn=sd(T.repo_operations,T.cleanup_failures),On=de(g),Qn=qe(g);return j?c`<div class="worker-ribbon">
          ${Oe} ${ze}
          <div class="worker-kpi worker-kpi--ribbon">
            ${Et}${lt}${sn}
          </div>
        </div>
        <div class="worker-ctrl worker-ctrl--mobile">
          <div class="worker-ctrl__ops">${Wn}${fn}</div>
          <div class="worker-kpi">${cn}</div>
        </div>
        ${Qn}${On}${dn}${Q.template()}`:c`<div class="worker-ctrl">
        <div class="worker-ctrl__ops">
          ${Oe}${ze}${Wn}${fn}
        </div>
        <div class="worker-kpi">
          ${Et}${lt}${sn}${cn}
          ${(Array.isArray(T.token_total)?T.token_total:T.token_total?[{label:T.token_total,tooltip:`${Y()} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}]:[]).map(an=>c`<span
                class="worker-kpi__chip worker-kpi__chip--tokens"
                title=${an.tooltip}
                >${Y()} 완료 · 누적 ${an.label}</span
              >`)}
          <span class="worker-kpi__next worker-stat"
            >다음 <b>${ue}</b></span
          >
        </div>
      </div>
      ${Qn}${On}${dn}${Q.template()}`}function v(h){let g=h.runnable_hidden;return c`<div class="worker-filter">
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
        ${es.map(T=>c`<button
              type="button"
              class="worker-filter__chip${m.readiness===T.value?" is-active":""}"
              data-readiness=${T.value}
              aria-pressed=${m.readiness===T.value?"true":"false"}
            >
              ${T.label}
            </button>`)}
        ${g.readiness>0?c`<span class="worker-filter__hidden"
              >숨김 ${g.readiness}</span
            >`:""}
      </div>
    </div>`}function M(){let h=P?"custom":Kl(I)||"custom";return c`<select
      class="worker-sort"
      aria-label="후보 정렬"
      title="후보 정렬"
      .value=${h}
    >
      ${ws.map(g=>c`<option value=${g.id} ?selected=${h===g.id}>
            ${g.label}
          </option>`)}
      <option value="custom" ?selected=${h==="custom"}>
        사용자 지정…
      </option>
    </select>`}function f(){let h=$s(I);return c`<div
      class="worker-sort-chain"
      role="group"
      aria-label="후보 정렬 체인"
    >
      ${[0,1,2].map(g=>{let T=h[g];return c`<span class="worker-sort-chain__step">
          <select
            class="worker-sort-chain__key"
            data-step=${g}
            aria-label=${`${g+1}\uCC28 \uC815\uB82C \uD0A4`}
            .value=${T?T.key:""}
          >
            ${g===0?"":c`<option value="" ?selected=${!T}>없음</option>`}
            ${e_.map(ie=>c`<option
                  value=${ie.key}
                  ?selected=${!!T&&T.key===ie.key}
                >
                  ${ie.label}
                </option>`)}
          </select>
          ${T?c`<button
                type="button"
                class="worker-sort-chain__dir"
                data-step=${g}
                aria-label=${T.dir==="asc"?"\uC624\uB984\uCC28\uC21C":"\uB0B4\uB9BC\uCC28\uC21C"}
                title=${T.dir==="asc"?"\uC624\uB984\uCC28\uC21C":"\uB0B4\uB9BC\uCC28\uC21C"}
              >
                ${T.dir==="asc"?"\u2191":"\u2193"}
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
    </div>`}function B(h){let g=wt(h).merge,T=xe().auto_merge===!0;if(g.running)return c`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop${T?" is-active":""}"
        title=${T?"\uC790\uB3D9 \uBA38\uC9C0\uB97C \uB044\uACE0 \uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)":"\uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)"}
      >
        ${T?"\u23F8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8":"\uC77C\uAD04 \uBA38\uC9C0 \uC911\uB2E8"} ${g.positions.size}
      </button>`;if(T)return c`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop is-active"
        title="자동 머지 켜짐 — 자격이 생기는 PR을 계속 큐에 넣습니다. 클릭하면 끕니다"
      >
        ⏸ 자동 머지
      </button>`;let ie=new Set(g.auto_excluded),ue=on(h).filter(Oe=>Oe.merge_action&&Oe.merge_enabled&&!ie.has(Oe.id)).length;return c`<button
      type="button"
      class="worker-merge-all"
      title="켜 두면 자격이 생기는 PR을 계속 큐에 넣어 순서대로 충돌 해소·머지합니다"
    >
      ▶ 자동 머지${ue>0?` ${ue}`:""}
    </button>`}function ae(h,g){return c`<div
      data-bead-id=${h.id}
      data-drag-kind=${g.kind}
      data-root-dir=${g.root_dir}
      data-lane-id=${pn(g.lane_id)}
      data-row-index=${g.row_index}
      data-queue-index=${String(h.queue_index??0)}
    >
      ${qn({...h,...X(h.id,h.discard)},{actions:yo(h)})}
    </div>`}function le(h){let g=St(h),T=Ye();return ki({parallel:{rows:g.map((ie,ue)=>ae(ie,{kind:"parallel",root_dir:T,row_index:ue})),count:g.length,collapsed:N.isAreaCollapsed("parallel"),drop:{drop:"parallel",root_dir:T}},serial:{lanes:Gt(h).map(ie=>({id:ie.id,title:`\uC9C1\uB82C ${ie.index}`,rows:[...ie.ghosts.map(ue=>qn({...ue,...X(ue.id,ue.discard)},{actions:yo(ue)})),...ie.items.map((ue,Oe)=>ae(ue,{kind:"repo-serial",root_dir:T,row_index:Oe,lane_id:ie.id}))],count:ie.ghosts.length+ie.items.length,match_count:oe([...ie.ghosts,...ie.items]),empty:ie.ghosts.length+ie.items.length===0,badge:ie.badge,held:ie.occupied,cycle:ie.cycle,drop:{drop:"repo-serial",root_dir:T,lane_id:ie.id,lane_length:String(ie.raw_length)}})),collapsed:N.isAreaCollapsed("serial")}})}function Ue(h){return pf(zt(h),Date.now(),je)}function ft(h){return h.running.some(g=>g.kind!=="session"&&g.run_state==="running")}function mt(h){let g=wt(h),T=tn(h),ie=St(h),ue=rn(h),Oe=on(h),ze=zt(h),Et=Vn({id:"worker-pane-candidate",lane:"candidate",title:"\uD6C4\uBCF4",items:T,match_count:oe(T),src:!0,empty:"\uD6C4\uBCF4 \uC5C6\uC74C",header_control:M(),header_row:P?f():void 0,controls:v(h),collapsible:!0,collapsed:N.isCollapsed("candidate"),place_menu:Le(T),onOpenDoc:u?(lt,sn)=>u(sn):void 0}),Yt=Vn({id:"worker-pane-done",lane:"done",title:"\uC644\uB8CC",items:ue,match_count:oe(ue),empty:`${Y()} \uC644\uB8CC \uC5C6\uC74C`,header_control:k(),collapsible:!0,collapsed:N.isCollapsed("done"),preview:j?Array.isArray(g.token_total)?g.token_total.map(lt=>lt.label).join(" \xB7 "):g.token_total||w_(ue):void 0});return j?c`<div class="worker-lanes worker-lanes--mobile">
          ${wi({live:ft(h),running_body:ze.length>0?Ue(h):"",pr_wait_rows:Oe.map(lt=>qn(lt)),count:ze.length+Oe.length})}
          ${Vn({id:"worker-pane-queue",lane:"queue",title:"\uB300\uAE30",items:ie,count:ie.length,match_count:oe(ie),collapsible:!0,collapsed:N.isCollapsed("queue"),preview:w_(ie),body:le(h)})}
          ${Et} ${Yt}
        </div>
        ${Z()}`:c`<div class="worker-lanes">
        ${Et}
        ${Vn({id:"worker-pane-queue",lane:"queue",title:"\uB300\uAE30",items:ie,count:ie.length,match_count:oe(ie),collapsible:!0,collapsed:N.isCollapsed("queue"),body:le(h)})}
        ${Vn({id:"worker-pane-running",lane:"running",title:"\uC2E4\uD589 \uC911",items:ze,match_count:oe(ze),header_control:c`<span class="worker-pane__meta"
            >슬롯 ${g.slots}</span
          >`,live:ft(h),collapsible:!0,collapsed:N.isCollapsed("running"),body:Ue(h)})}
        ${Vn({id:"worker-pane-pr-wait",lane:"pr_wait",title:"PR \uB300\uAE30",items:Oe,match_count:oe(Oe),empty:"PR \uB300\uAE30 \uC5C6\uC74C",collapsible:!0,collapsed:N.isCollapsed("pr_wait")})}
        ${Yt}
      </div>
      ${Z()}`}function it(h){N.toggle(h),$()}function A(h){N.toggleArea(h),$()}function $(){let h=Ut();S(h),dt(b(h),Ie),dt(mt(h),re);let g=re.querySelector(".provider-resume-dialog");g&&!g.open&&(typeof g.showModal=="function"?g.showModal():g.setAttribute("open",""))}function Pe(){let h=!0,g=Vi(T=>{if(j=T,h){h=!1;return}$()});ye.push(g)}function Fe(h){m=h,qk(h),$()}function ot(h){if(h==="custom"){P=!0,$();return}I=Hr(h),Gl(I),P=!1,$()}function vt(h){I=Hr({chain:h}),Gl(I),$()}function Nt(h){U=Hn(h),jk(U),p?.(U),$()}function Zt(h){let g=h.target;if(V){let lt=g?.closest?.(".provider-resume-dialog__runner");if(lt){let fn=Lt(Lt(xe().runner_catalog).runners),dn=Lt(fn[lt.value]),On=Object.keys(Lt(dn.models));V={...V,runner:lt.value,model:typeof dn.default_model=="string"?dn.default_model:On[0]||""},$();return}let sn=g?.closest?.(".provider-resume-dialog__model");if(sn){try{let[fn,dn]=JSON.parse(sn.value);typeof fn=="string"&&typeof dn=="string"&&(V={...V,runner:fn,model:dn},$())}catch{}return}let cn=g?.closest?.(".provider-resume-dialog__account");if(cn){V={...V,account:cn.value},$();return}let Wn=g?.closest?.(".provider-resume-dialog__fresh-input");if(Wn){V={...V,fresh_current:Wn.checked},$();return}}let T=g?.closest?.(".worker-serial-lane-count");if(T){let lt=Number.parseInt(T.value,10);Number.isFinite(lt)&&bt(lt).then($);return}let ie=h.target?.closest?.(".worker-filter__blocked");if(ie){Fe({...m,show_blocked:ie.checked});return}let ue=h.target?.closest?.(".worker-sort-chain__key");if(ue){let lt=Number.parseInt(ue.getAttribute("data-step")||"",10);Number.isFinite(lt)&&vt(n_($s(I),lt,ue.value));return}let Oe=h.target?.closest?.(".worker-done-range");if(Oe){Nt(Oe.value);return}let ze=h.target?.closest?.(".worker-sort");if(ze){ot(ze.value);return}let Et=h.target?.closest?.(".worker-slots__input");if(!Et)return;let Yt=Number.parseInt(Et.value,10);if(!Number.isFinite(Yt)){$();return}xt(Yt).then($)}function Sr(h){return h?{runner:h.runner||void 0,model:h.model||void 0,effort:h.effort||void 0,worktree:h.worktree||void 0,status:h.status||void 0,session_id:h.session_id||void 0}:{}}function wn(){let h=wt(Ut()),g=xe().workspace_info,T=g&&typeof g=="object"&&g.repo_ops&&typeof g.repo_ops=="object"?g.repo_ops:null;return{operations:h.repo_operations,cleanup_failures:h.cleanup_failures,repo:l&&l()||"",repo_ops:T}}function Er(){je&&Be.close(),J.hidden=!1,Ze.hidden=!1,Qe.open(wn()),$()}function Kr(h){let g=xe(),T=g.attempts?g.attempts[h]:null;je=h,Qe.close(),J.hidden=!0,Ze.hidden=!1,Be.open({attempt_id:h,meta:Sr(T)}),$()}function ia(h){let g=xe(),T=(Array.isArray(g.session_active)?g.session_active:[]).find(ue=>ue&&ue.bead_id===h),ie=(T&&Array.isArray(T.session_refs)?T.session_refs:[]).find(ue=>ue&&ue.current===!0);ie&&(Qe.close(),J.hidden=!0,Ze.hidden=!1,Be.open(io(ie,h,"in_progress")),$())}function aa(){if(Qe.isOpen()&&Qe.refresh(wn()),!je)return;let h=xe(),g=h.attempts?h.attempts[je]:null;if(g){Be.updateMeta(Sr(g));return}Be.close()}function xs(h,g){if(h.length===0||!s)return;let T=l?l():void 0;if(g.length===0||!T||g===T||!a){s(h);return}Promise.resolve(a(g)).then(()=>{s(h)}).catch(()=>{ge("\uB808\uD3EC \uC804\uD658\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error",2400)})}function As(h){let g=h.target;if(g?.closest?.(".provider-resume-dialog__cancel")){et();return}if(g?.closest?.(".provider-resume-dialog__confirm")){x();return}if(g?.closest?.(".provider-resume-dialog")||g?.closest?.(".worker-mini__grip"))return;let T=g?.closest?.(".worker-sort-chain__dir");if(T){let Te=Number.parseInt(T.getAttribute("data-step")||"",10);Number.isFinite(Te)&&vt(r_($s(I),Te));return}let ie=g?.closest?.(".worker-dep__open");if(ie){xs(ie.getAttribute("data-dep-id")||"",ie.getAttribute("data-root-dir")||"");return}let ue=g?.closest?.(".judgement-chip");if(ue){let Te=ue.closest("[data-bead-id]"),ct=Te&&Te.getAttribute("data-bead-id")||"",Vt=ue.getAttribute("data-chip-key")||"";ct&&Vt&&te.toggle({bead_id:ct,chip_key:Vt});return}if(g?.closest?.(".chip-popover"))return;if(g?.closest?.(".worker-repo-strip")){Er();return}let Oe=g?.closest?.(".worker-repo-op__dismiss");if(Oe){yt(Oe.dataset.operationId||"");return}let ze=g?.closest?.(".worker-cleanup__resume");if(ze){let Te=ze.dataset.beadId;Te&&Rt(Te);return}let Et=g?.closest?.(".worker-cleanup__resolve");if(Et){let Te=Et.dataset.beadId;Te&&Mt(Te);return}if(g?.closest?.(".worker-hold__retry")){ce("worker-queue-hold-retry-now","\uC9C0\uAE08 \uC7AC\uC2DC\uB3C4 \uAC70\uBD80");return}if(g?.closest?.(".worker-hold__resume")){ce("worker-queue-hold-resume","\uC7AC\uAC1C \uAC70\uBD80");return}if(g?.closest?.(".worker-play")){De(!xe().auto_advance);return}let Yt=g?.closest?.(".worker-merge-all");if(Yt){Yt.classList.contains("worker-merge-all--stop")?xe().auto_merge===!0?rt(!1):E():rt(!0);return}let lt=g?.closest?.(".worker-pane__toggle[data-lane]");if(lt){let Te=lt.dataset.lane;(Te==="candidate"||Te==="queue"||Te==="running"||Te==="pr_wait"||Te==="done")&&it(Te);return}let sn=g?.closest?.(".worker-wait__area-toggle[data-area]");if(sn){let Te=sn.dataset.area;(Te==="parallel"||Te==="serial")&&A(Te);return}let cn=g?.closest?.(".worker-card__place-lane");if(cn){let Te=cn.dataset.beadId,ct=cn.dataset.lane;Te&&(ct==="parallel"||/^s[1-5]$/.test(ct||""))&&(y=null,$(),tt(Te,ct));return}if(g?.closest?.(".worker-card__place-cancel")){y=null,$();return}let fn=g?.closest?.(".worker-card__place");if(fn){let Te=fn.dataset.beadId;Te&&!fn.disabled&&(Ko(xe())?(y=Te,$()):tt(Te,"parallel"));return}let dn=g?.closest?.(".worker-filter__chip");if(dn){let Te=dn.dataset.readiness;(Te==="all"||Te==="ready"||Te==="not_ready")&&Fe({...m,readiness:Te});return}let On=g?.closest?.('[data-action="queue-remove"]');if(On){let Te=On.dataset.beadId||"";Te&&me.sendOp({type:"worker-queue-remove",payload:{bead_id:Te},root_dir:Ye()},Te);return}let Qn=g?.closest?.(".worker-mini__merge");if(Qn){let Te=Qn.dataset.beadId||"";xe().cleanup_failed?.[Te]?Rt(Te):Dt(Te);return}let an=g?.closest?.(".worker-mini__merge-cancel");if(an){Re(an.dataset.beadId||"");return}let Xn=g?.closest?.(".worker-mini__resolve");if(Xn){Mt(Xn.dataset.beadId||"");return}let cr=g?.closest?.(".rtile__resolve");if(cr){let Te=cr.closest(".rtile");Mt(Te?.dataset.beadId||"");return}let In=g?.closest?.(".worker-mini__discard"),zn=g?.closest?.(".worker-mini__discard-abandon");if(zn){ne(zn.dataset.beadId||"",zn.dataset.operationId||"",{kind:zn.dataset.operationKind||"",last_error:zn.dataset.lastError||""});return}if(In){L(In.dataset.beadId||"",In.dataset.attemptId||null,In.dataset.discardMode==="merged"?"merged":"unmerged",In.dataset.operationId||null);return}let Ve=g?.closest?.(".worker-mini__stale-continue");if(Ve){fe("worker-stale-work-continue",Ve.dataset.beadId||"",Ve.dataset.actionId||"");return}let Ht=g?.closest?.(".worker-mini__stale-backup");if(Ht){fe("worker-stale-work-backup-fresh",Ht.dataset.beadId||"",Ht.dataset.actionId||"");return}let An=g?.closest?.(".worker-mini__stale-recheck");if(An){fe("worker-stale-work-recheck",An.dataset.beadId||"",An.dataset.actionId||"");return}let nt=g?.closest?.(".worker-mini__revise-fix");if(nt){_e("worker-revise-fix",nt.dataset.beadId||"");return}let w=g?.closest?.(".worker-mini__revise-approve");if(w){_e("worker-revise-approve",w.dataset.beadId||"");return}if(g?.closest?.(".worker-mini__pr"))return;let D=g?.closest?.(".rtile__failure-badge");if(D){let Te=D.dataset.attemptId||"";C=C===Te?null:Te,$();return}let H=g?.closest?.(".rtile__provider-hold-badge");if(H){let Te=H.dataset.attemptId||"";O=O===Te?null:Te,$();return}let $e=g?.closest?.(".rtile__attempt-copy");if($e){let Te=$e.dataset.attemptId||"";Te&&mn(Te).then(ct=>{ge(ct?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",ct?"success":"error",1400)});return}if(g?.closest?.(".rtile__parked-retry")){let Te=g?.closest?.(".rtile");be(Te?.dataset?.beadId||"",Te?.dataset?.attemptId||"");return}let We=g?.closest?.(".rtile__discard-abandon");if(We){let ct=g?.closest?.(".rtile")?.dataset?.beadId;ct&&ne(ct,We.dataset.operationId||"",{kind:We.dataset.operationKind||"",last_error:We.dataset.lastError||""});return}let at=g?.closest?.(".rtile__discard");if(at){let Te=g?.closest?.(".rtile"),ct=Te?.dataset?.beadId,Vt=Te?.dataset?.attemptId;ct&&L(ct,Vt||null,at.dataset.confirmation==="merged"?"merged":"unmerged",at.dataset.operationId||null);return}if(g?.closest?.(".rtile__pause")){let ct=g?.closest?.(".rtile")?.dataset?.attemptId;ct&&Bt(ct);return}if(g?.closest?.(".rtile__resume-alternate")){let ct=g?.closest?.(".rtile")?.dataset?.attemptId;ct&&Ke(ct);return}if(g?.closest?.(".rtile__resume")){let Te=g?.closest?.(".rtile__resume"),Vt=g?.closest?.(".rtile")?.dataset?.attemptId;Vt&&kt(Vt,Te?.dataset?.resumeKind==="settlement"?"settlement":"session");return}if(g?.closest?.(".rtile__session")){let Te=g?.closest?.(".rtile"),ct=Te?.dataset?.attemptId;if(ct){Kr(ct);return}let Vt=Te?.dataset?.beadId;Vt&&ia(Vt);return}if(g?.closest?.(".rtile__failure-pop"))return;if(g?.closest?.(".worker-drawer-overlay__backdrop")){Qe.close(),Be.close();return}if(g?.closest?.(".worker-drawer-host"))return;let Ft=g?.closest?.(".rtile .board-card__roll-toggle");if(Ft){let Te=Ft.dataset.rollParent;Te&&(R.has(Te)?R.delete(Te):R.add(Te),$());return}let Xe=g?.closest?.(".rtile .board-card__roll-child");if(Xe){let Te=Xe.dataset.childId;Te&&s&&s(Te);return}let Tt=g?.closest?.(".rtile");if(Tt){if(g?.closest?.(".rtile__id")){let ct=Tt.dataset.beadId;ct&&mn(ct).then(Vt=>{Vt?ge("\uBCF5\uC0AC\uB428","success",1200):ge("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}let Te=Tt.dataset.beadId;Te&&s&&s(Te);return}let Sn=g?.closest?.(".worker-mini, .worker-card");if(Sn){let Te=Sn.dataset.beadId;if(g?.closest?.('[data-seam="log-path-copy"]'))return;if(g?.closest?.(".worker-mini__id, .worker-card__id")){Te&&mn(Te).then(Vt=>{Vt?ge("\uBCF5\uC0AC\uB428","success",1200):ge("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}let ct=g?.closest?.(".ctl-chip--from");if(ct){let Vt=ct.dataset.fromId;Vt&&s&&s(Vt);return}Te&&s&&s(Te)}}function la(h){let g=h.target;g?.closest?.(".worker-search")&&(z=g.value,$())}function ca(h){let g=h.target;h.key!=="Escape"||!g?.closest?.(".worker-search")||z.length===0||(z="",$())}me.attach(e),e.addEventListener("click",As),e.addEventListener("change",Zt),e.addEventListener("input",la),e.addEventListener("keydown",ca);function Gr(h){let g=h.target,T=g&&typeof g.closest=="function"?ue=>g.closest(ue):()=>null,ie=!1;C&&!T(".rtile__failure-pop, .rtile__failure-badge")&&(C=null,ie=!0),O&&!T(".rtile__provider-hold-pop, .rtile__provider-hold-badge")&&(O=null,ie=!0),ie&&$()}function Yr(h){h.key==="Escape"&&(C===null&&O===null&&V===null||(C=null,O=null,V=null,$()))}return document.addEventListener("click",Gr),document.addEventListener("keydown",Yr),te.attach(),ye.push(()=>{document.removeEventListener("click",Gr),document.removeEventListener("keydown",Yr),te.detach()}),Pe(),_&&ye.push(_.subscribe(()=>{ke.notifyIssuesChanged(),$()})),o&&ye.push(o.subscribe(()=>{let h=l&&l()||"";h!==ee&&(ee=h,He.close()),$(),aa()})),$(),{load(){ke.ensureSessionDefaults(),$()},refreshSessionDefaults:Me,destroy(){for(let h of ye.splice(0))try{h()}catch{}me.detach(),e.removeEventListener("click",As),e.removeEventListener("change",Zt),ke.destroy();try{Be.destroy()}catch{}Ze.hidden=!0;try{He.destroy()}catch{}dt(c``,e)}}}function Zl(e){if(!e)return"Unknown";let t=e.split("/").filter(Boolean);return t.length>0?t[t.length-1]:"Unknown"}function S_(e,t,n,r=async()=>{},o=async()=>{}){let i=Wt("views:workspace-picker"),s=null,l=!1,a=!1,u=!1;async function d(P){let Y=P.target.value,j=t.getState().workspace?.current?.path||"";if(Y&&Y!==j){i("switching workspace to %s",Y),l=!0,I();try{await n(Y)}catch(z){i("workspace switch failed: %o",z)}finally{l=!1,I()}}}async function p(){let P=t.getState(),U=P.workspace?.current?.path||P.workspace?.available?.[0]?.path||"";if(!(!U||a)){i("git-pulling workspace %s",U),a=!0,I();try{await r(U)}catch(Y){i("workspace git pull failed: %o",Y)}finally{a=!1,I()}}}function _(P){let U=P.target;U&&e.contains(U)||C()}function m(P){P.key==="Escape"&&C()}function y(){u||(u=!0,document.addEventListener("mousedown",_),document.addEventListener("keydown",m),I())}function C(){u&&(u=!1,document.removeEventListener("mousedown",_),document.removeEventListener("keydown",m),I())}function O(){u?C():y()}async function V(P){let U=P.target,Y=U.value,N=U.checked;i("toggling visibility %s \u2192 %s",Y,String(N));try{await o(Y,N)}catch(j){i("workspace visibility toggle failed: %o",j)}}function te(P){return P?c`
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
    `:c``}function W(P,U){return c`
      <div class="workspace-picker__manage">
        <button
          type="button"
          class="workspace-picker__manage-button"
          @click=${O}
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
                ${P.map(Y=>c`
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
                        >${Zl(Y.path)}</span
                      >
                    </label>
                  `)}
              </div>
            `:""}
      </div>
    `}function q(){let P=t.getState(),U=P.workspace?.current,Y=P.workspace?.available||[],N=new Set(P.workspace?.hidden||[]),j=U?.path||Y[0]?.path||"";if(Y.length===0)return c``;let z=Y.filter(K=>!N.has(K.path)||K.path===j);if(z.length<=1){let K=z[0]||Y[0],oe=Zl(K.path);return c`
        <div class="workspace-picker workspace-picker--single">
          <span class="workspace-picker__label" title="${K.path}"
            >${oe}</span
          >
          ${W(Y,N)}
          ${te(j)}
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
          ${z.map(K=>c`
              <option
                value="${K.path}"
                ?selected=${K.path===j}
                title="${K.path}"
              >
                ${Zl(K.path)}
              </option>
            `)}
        </select>
        ${W(Y,N)}
        ${te(j)}
        ${l||a?c`<span
              class="workspace-picker__loading"
              aria-hidden="true"
            ></span>`:""}
      </div>
    `}function I(){dt(q(),e)}return I(),s=t.subscribe(()=>I()),{destroy(){s&&(s(),s=null),document.removeEventListener("mousedown",_),document.removeEventListener("keydown",m),dt(c``,e)}}}var E_=["update-status","edit-text","update-priority","create-issue","dep-add","dep-remove","update-assignee","update-exec-settings","update-impl-target","get-session-defaults","set-session-defaults","get-workspace-accounts","set-workspace-accounts","update-workflow-meta","label-add","label-remove","subscribe-list","unsubscribe-list","snapshot","upsert","delete","get-comments","add-comment","delete-issue","list-workspaces","set-workspace","set-workspace-visibility","get-workspace","workspace-changed","git-pull-workspace","subscribe-worker-queue","unsubscribe-worker-queue","worker-queue-snapshot","worker-queue-place","worker-queue-reorder","worker-queue-toggle","worker-automation-toggle","worker-provider-auto-switch-toggle","worker-repo-ops-opt-out-toggle","worker-repo-operation-dismiss","worker-repo-operation-deploy-run","worker-queue-set-slots","worker-queue-set-serial-lane-count","worker-queue-set-orchestration-defaults","worker-queue-remove","worker-attempt-pause","worker-attempt-stop","worker-attempt-resume","worker-cleanup-retry","worker-resolve-in-session","worker-parked-retry","worker-queue-hold-resume","worker-queue-hold-retry-now","worker-merge-queue-add","worker-merge-queue-add-all","worker-merge-auto-toggle","worker-merge-queue-remove","worker-discard","worker-discard-abandon","worker-stale-work-continue","worker-stale-work-backup-fresh","worker-stale-work-recheck","worker-pr-discard","worker-revise-fix","worker-revise-approve","subscribe-ui-order","unsubscribe-ui-order","ui-order-set","ui-order-snapshot","subscribe-display-policy","unsubscribe-display-policy","display-policy-set","display-policy-snapshot","subscribe-session-log","unsubscribe-session-log","session-log-snapshot","session-log-append","get-attempt-prompt","get-bead-prompt","get-bead-timeline","get-worker-system-prompt","get-session-refs","subscribe-monitor-pipeline","unsubscribe-monitor-pipeline","monitor-pipeline-snapshot","subscribe-impl-presets","unsubscribe-impl-presets","impl-presets-snapshot","impl-preset-create","impl-preset-update","impl-preset-delete","apply-impl-preset","apply-impl-preset-global","monitor-auto-toggle","monitor-lane-create","monitor-lane-update","monitor-lane-confirm","monitor-lane-remove"];function Jl(){let e=Date.now().toString(36),t=Math.random().toString(36).slice(2,8);return`${e}-${t}`}function T_(e,t,n=Jl()){return{id:n,type:e,payload:t}}function C_(e={}){let t=Wt("ws"),n={initialMs:e.backoff?.initialMs??1e3,maxMs:e.backoff?.maxMs??3e4,factor:e.backoff?.factor??2,jitterRatio:e.backoff?.jitterRatio??.2},r=()=>e.url&&e.url.length>0?e.url:typeof location<"u"?(location.protocol==="https:"?"wss://":"ws://")+location.host+"/ws":"ws://localhost/ws",o=null,i="closed",s=0,l=null,a=!0,u=new Map,d=[],p=new Map,_=new Set;function m(q){for(let I of Array.from(_))try{I(q)}catch{}}function y(){if(!a||l)return;i="reconnecting",t("ws reconnecting\u2026"),m(i);let q=Math.min(n.maxMs||0,(n.initialMs||0)*Math.pow(n.factor||1,s)),I=(n.jitterRatio||0)*q,P=Math.max(0,Math.round(q+(Math.random()*2-1)*I));t("ws retry in %d ms (attempt %d)",P,s+1),l=setTimeout(()=>{l=null,W()},P)}function C(q){try{o?.send(JSON.stringify(q))}catch(I){t("ws send failed",I)}}function O(){for(i="open",t("ws open"),m(i),s=0;d.length;){let q=d.shift();q&&C(q)}}function V(q){let I;try{I=JSON.parse(String(q.data))}catch{t("ws received non-JSON message");return}if(!I||typeof I.id!="string"||typeof I.type!="string"){t("ws received invalid envelope");return}if(u.has(I.id)){let U=u.get(I.id);u.delete(I.id),I.ok?U?.resolve(I.payload):U?.reject(I.error||new Error("ws error"));return}let P=p.get(I.type);if(P&&P.size>0)for(let U of Array.from(P))try{U(I.payload)}catch(Y){t("ws event handler error",Y)}else t("ws received unhandled message type: %s",I.type)}function te(){i="closed",t("ws closed"),m(i);for(let[q,I]of u.entries())I.reject(new Error("ws disconnected")),u.delete(q);s+=1,y()}function W(){if(!a)return;let q=r();try{o=new WebSocket(q),t("ws connecting %s",q),i="connecting",m(i),o.addEventListener("open",O),o.addEventListener("message",V),o.addEventListener("error",()=>{}),o.addEventListener("close",te)}catch(I){t("ws connect failed %o",I),y()}}return W(),{send(q,I){if(!E_.includes(q))return Promise.reject(new Error(`unknown message type: ${q}`));let P=Jl(),U=T_(q,I,P);return t("send %s id=%s",q,P),new Promise((Y,N)=>{u.set(P,{resolve:Y,reject:N,type:q}),o&&o.readyState===o.OPEN?C(U):(t("queue %s id=%s (state=%s)",q,P,i),d.push(U))})},on(q,I){p.has(q)||p.set(q,new Set);let P=p.get(q);return P?.add(I),()=>{P?.delete(I)}},onConnection(q){return _.add(q),()=>{_.delete(q)}},reconnect(){a=!0,l&&(clearTimeout(l),l=null),s=0,W()},close(){a=!1,l&&(clearTimeout(l),l=null);try{o?.close()}catch{}},getState(){return i}}}function rw(){let e=window.__BDUI_BOOTSTRAP__;return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:null}}}async function ow(e,t){try{let r=await(await fetch("/api/config")).json();e.setState({config:r})}catch(n){t("config refresh failed",n)}}var ec=[["tab:board:ready","ready-issues"],["tab:board:blocked","blocked-issues"],["tab:board:in-progress","in-progress-issues"],["tab:board:resolved","resolved-issues"],["tab:board:deferred","deferred-issues"],["tab:board:closed","closed-issues"]],R_=[["tab:worker:ready","ready-issues"],["tab:worker:blocked","blocked-issues"],["tab:worker:in-progress","in-progress-issues"],["tab:worker:resolved","resolved-issues"],["tab:worker:closed","closed-issues"]],xr="tab:worker:closed",sw="bdui.worker.done-range",O_=Cf,I_="worker:queue",L_="ui:order",P_="ui:display-policy",D_="exec:presets",Ar="tab:board:closed",M_="beads-ui.board.closed-range";function iw(e){if(!e)return()=>{};function t(r){document.documentElement.style.setProperty("--app-header-h",`${Math.round(r)}px`)}if(t(e.getBoundingClientRect().height),typeof ResizeObserver!="function")return()=>{};let n=new ResizeObserver(r=>{for(let o of r)t(o.contentRect.height+aw(e))});return n.observe(e),()=>n.disconnect()}function aw(e){let t=getComputedStyle(e);return[t.paddingTop,t.paddingBottom,t.borderTopWidth,t.borderBottomWidth].reduce((r,o)=>r+(parseFloat(o)||0),0)}function lw(e){let t=Wt("main");t("bootstrap start"),iw(document.querySelector(".app-header"));let n=c`
    <section id="board-root" class="route board"></section>
    <section id="worker-root" class="route worker" hidden></section>
    <section id="monitor-root" class="route monitor" hidden></section>
    <section id="detail-panel" class="route detail" hidden></section>
  `;dt(n,e);let r=document.getElementById("global-nav"),o=document.getElementById("top-nav"),i=document.getElementById("repo-scope"),s=document.getElementById("usage-meter"),l=document.getElementById("board-root"),a=document.getElementById("worker-root"),u=document.getElementById("monitor-root"),d=document.getElementById("detail-panel");if(s&&Vf(s),l&&a&&u&&d){let ye=function(A,$){let Pe="Request failed",Fe="";if(A&&typeof A=="object"){let vt=A;if(typeof vt.message=="string"&&vt.message.length>0&&(Pe=vt.message),typeof vt.details=="string")Fe=vt.details;else if(vt.details&&typeof vt.details=="object")try{Fe=JSON.stringify(vt.details,null,2)}catch{Fe=""}}else typeof A=="string"&&A.length>0&&(Pe=A);let ot=$&&$.length>0?`Failed to load ${$}`:"Request failed";se.open(ot,Pe,Fe)},xe=function(A){return`${we.getState().workspace.current?.path||""}\0${A}`},_t=function(){Se&&(Se().catch(()=>{}),Se=null),me=null,je=null},Ke=function(A){Be=A;let $=()=>{Be!==A||we.getState().selected_id!==A||(Be=null,pt(A))};if(!ee){He.then($);return}$()},Le=function(A,$,Pe,Fe,ot){return Pe!==Z[$]?(ot().catch(()=>{}),!1):(A.set(Fe,ot),!0)},tt=function(){let A=we.getState();ht(A.view==="board"),Ge(A.view==="worker"),fe(ne(A)),Re(A.view==="board"||A.view==="worker"||Ye||!!A.selected_id)},Bt=function(){let A=Lr(Ce);return A===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:A}}},kt=function(){let A=Lr(Je);return A===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:A}}},ht=function(A){if(A)for(let[$,Pe]of ec){if(et.has($)||x.has($))continue;let Fe=$===Ar?Bt():{type:Pe};try{Ie.register($,Fe)}catch(Nt){t("register %s store failed: %o",$,Nt)}x.add($);let ot=Z.board,vt=!1;he.subscribeList($,Fe).then(Nt=>{vt=!Le(et,"board",ot,$,Nt)}).catch(Nt=>{t("subscribe %s failed: %o",$,Nt),ye(Nt,"board")}).finally(()=>{x.delete($),vt&&tt()})}else Mt()},Mt=function(){Z.board+=1;for(let[A]of ec){let $=et.get(A);$&&($().catch(()=>{}),et.delete(A));try{Ie.unregister(A)}catch(Pe){t("unregister %s failed: %o",A,Pe)}}},Ge=function(A){if(!A){rt();return}for(let[$,Pe]of R_){if(ce.has($)||x.has($))continue;let Fe=$===xr?kt():{type:Pe};try{Ie.register($,Fe)}catch(Nt){t("register %s store failed: %o",$,Nt)}x.add($);let ot=Z.worker,vt=!1;he.subscribeList($,Fe).then(Nt=>{vt=!Le(ce,"worker",ot,$,Nt)}).catch(Nt=>{t("subscribe %s failed: %o",$,Nt),ye(Nt,"worker")}).finally(()=>{x.delete($),vt&&tt()})}},rt=function(){Z.worker+=1;for(let[A]of R_){let $=ce.get(A);$&&($().catch(()=>{}),ce.delete(A));try{Ie.unregister(A)}catch(Pe){t("unregister %s failed: %o",A,Pe)}}},Re=function(A){if(!A){E();return}be||(Me("subscribe-worker-queue",{id:I_}).catch($=>{t("subscribe-worker-queue failed: %o",$)}),be=()=>Me("unsubscribe-worker-queue",{id:I_}))},E=function(){be&&(be().catch(()=>{}),be=null)},ne=function(A){return A.view==="monitor"||A.selected_id!=null},fe=function(A){if(!A){_e();return}L||(Me("subscribe-monitor-pipeline",{id:O_}).catch($=>{t("subscribe-monitor-pipeline failed: %o",$)}),L=()=>Me("unsubscribe-monitor-pipeline",{id:O_}))},_e=function(){L&&(L().catch(()=>{}),L=null)},yt=function(){De||(Me("subscribe-ui-order",{id:L_}).catch(A=>{t("subscribe-ui-order failed: %o",A)}),De=()=>Me("unsubscribe-ui-order",{id:L_}))},xt=function(){De&&(De().catch(()=>{}),De=null),G.clear()},Ut=function(){bt||(Me("subscribe-display-policy",{id:P_}).catch(A=>{t("subscribe-display-policy failed: %o",A)}),bt=()=>Me("unsubscribe-display-policy",{id:P_}))},wt=function(){bt&&(bt().catch(()=>{}),bt=null),J.clear()},At=function(){qt||(Me("subscribe-impl-presets",{id:D_}).catch(A=>{t("subscribe-impl-presets failed: %o",A)}),qt=()=>Me("unsubscribe-impl-presets",{id:D_}))},tn=function(A){if(!A)return"Unknown";let $=A.split("/").filter(Boolean);return $.length>0?$[$.length-1]:"Unknown"},B=function(A,$){k.open(A.path,{missing_state:A.missing_state,...$?{workspace:$}:{}})};var p=ye,_=xe,m=_t,y=Ke,C=Le,O=tt,V=Bt,te=kt,W=ht,q=Mt,I=Ge,P=rt,U=Re,Y=E,N=ne,j=fe,z=_e,K=yt,oe=xt,ve=Ut,Ne=wt,F=At,X=tn,Ae=B;let Ee=document.getElementById("header-loading"),R=Wc(Ee),se=Zp(e),ke=C_(),Me=R.wrapSend((A,$)=>ke.send(A,$)),he=Mc(Me),Ie=qc(),Ze=jc(),ut=mc(),G=Nc(),J=fc(),re=_c(),pe=gc();ke.on("impl-presets-snapshot",A=>{let $=A;$&&typeof $.revision=="number"&&Array.isArray($.presets)&&re.set({revision:$.revision,presets:$.presets})}),ke.on("monitor-pipeline-snapshot",A=>{let $=A;if(!(!$||!Array.isArray($.workspaces)))try{ut.set($.workspaces,$.workspaces_state,$.cross_lanes)}catch{}}),ke.on("ui-order-snapshot",A=>{let $=A;if($&&typeof $.revision=="number")try{G.set({revision:$.revision,order:$.order&&typeof $.order=="object"?$.order:{}})}catch{}}),ke.on("display-policy-snapshot",A=>{let $=A;if($&&$.policy&&typeof $.policy=="object")try{J.set($.policy)}catch{}}),ke.on("session-log-snapshot",A=>{let $=A;if($&&typeof $.id=="string")try{pe.set($.id,Array.isArray($.lines)?$.lines:[],typeof $.last_event_at=="number"?$.last_event_at:null)}catch{}}),ke.on("session-log-append",A=>{let $=A;if($&&typeof $.id=="string")try{pe.append($.id,$.event)}catch{}}),ke.on("snapshot",A=>{let $=A,Pe=$&&typeof $.id=="string"?$.id:"",Fe=Pe?Ie.getStore(Pe):null;if(Fe&&$&&$.type==="snapshot")try{Fe.applyPush($)}catch{}}),ke.on("upsert",A=>{let $=A,Pe=$&&typeof $.id=="string"?$.id:"",Fe=Pe?Ie.getStore(Pe):null;if(Fe&&$&&$.type==="upsert")try{Fe.applyPush($)}catch{}}),ke.on("delete",A=>{let $=A,Pe=$&&typeof $.id=="string"?$.id:"",Fe=Pe?Ie.getStore(Pe):null;if(Fe&&$&&$.type==="delete")try{Fe.applyPush($)}catch{}});let Se=null,me=null,je=null,Be=null,Qe=()=>{},He=new Promise(A=>{Qe=()=>A(void 0)}),ee=!1,Q=!1;async function pt(A){let $=xe(A);if($===me||$===je)return;je=$;let Pe=`detail:${A}`,Fe={type:"issue-detail",params:{id:A}};try{Ie.register(Pe,Fe)}catch(ot){t("register detail store failed: %o",ot)}try{let ot=await he.subscribeList(Pe,Fe);if(we.getState().selected_id!==A||xe(A)!==$){await ot().catch(()=>{});return}Se&&await Se().catch(()=>{}),Se=ot,me=$}catch(ot){t("detail subscribe failed: %o",ot),ye(ot,"issue details")}finally{je===$&&(je=null)}}let et=new Map,x=new Set,Z={board:0,worker:0},Ye=!1,Ce=Is;try{let A=window.localStorage.getItem(M_);ha(A)&&(Ce=A)}catch{}let Je="today";try{let A=window.localStorage.getItem(sw);A!==null&&(Je=Hn(A))}catch{}async function Dt(A){if(!ha(A)||A===Ce)return;Ce=A;try{window.localStorage.setItem(M_,A)}catch{}let $=et.get(Ar);if(!$)return;et.delete(Ar),await $().catch(()=>{});let Pe=Bt();try{Ie.register(Ar,Pe)}catch(Fe){t("register %s store failed: %o",Ar,Fe)}try{let Fe=await he.subscribeList(Ar,Pe);et.set(Ar,Fe)}catch(Fe){t("re-subscribe %s failed: %o",Ar,Fe),ye(Fe,"board")}}async function Rt(A){let $=Hn(A);if($===Je)return;Je=$;let Pe=ce.get(xr);if(!Pe)return;ce.delete(xr),await Pe().catch(()=>{});let Fe=kt();try{Ie.register(xr,Fe)}catch(ot){t("register %s store failed: %o",xr,ot)}try{let ot=await he.subscribeList(xr,Fe);ce.set(xr,ot)}catch(ot){t("re-subscribe %s failed: %o",xr,ot),ye(ot,"worker")}}let ce=new Map,be=null,L=null,De=null,bt=null,qt=null;async function Xt(){bt=null,J.clear(),qt=null,re.clear(),be=null,L=null,et.clear(),ce.clear(),Z.board+=1,Z.worker+=1,At();let A=we.getState().workspace.current?.path;if(A)try{await ke.send("set-workspace",{path:A})}catch(Pe){t("workspace restore after reconnect failed: %o",Pe);return}Ut();let $=we.getState();ht($.view==="board"),Ge($.view==="worker"),fe(ne($)),Re($.view==="board"||$.view==="worker"||!!$.selected_id)}async function Jt(){t("clearing all subscriptions for workspace switch"),Mt(),rt(),E(),Ze.clear(),xt(),yt(),wt(),Ut(),_t();let A=we.getState();if(A.selected_id)try{Ie.unregister(`detail:${A.selected_id}`)}catch{}let $=we.getState();ht($.view==="board"),Ge($.view==="worker"),fe(ne($)),Re($.view==="board"||$.view==="worker"||!!$.selected_id),$.selected_id&&Ke($.selected_id)}async function Ot(A){t("requesting workspace switch to %s",A),Q=!0;try{let $=await ke.send("set-workspace",{path:A});t("workspace switch result: %o",$),$&&$.workspace&&(we.setState({workspace:{current:{path:$.workspace.root_dir,database:$.workspace.db_path}}}),window.localStorage.setItem("beads-ui.workspace",A),$.changed&&(await Jt(),ge("Switched to "+tn(A),"success",2e3)))}catch($){throw t("workspace switch failed: %o",$),ge("Failed to switch workspace","error",3e3),$}finally{Q=!1}}async function St(A){t("requesting workspace git pull for %s",A);try{let $=await ke.send("git-pull-workspace",{});t("workspace git pull result: %o",$);let Pe=$?.status;if(Pe==="up_to_date"){ge("Already up to date","success",2e3);return}if(Pe==="stash_pop_conflict"){ge("Git pulled, but stash pop conflicted (check git stash list)","warning",4e3);return}ge("Git pulled "+tn(A),"success",2e3)}catch($){t("workspace git pull failed: %o",$);let Pe=$?.code,Fe=$?.message;if(Pe==="rebase_conflict"){ge("Git pull conflicts \u2014 reverted (manual resolve required)","error",4e3);return}if(Pe==="rebase_conflict_abort_failed"){ge("Git pull conflicts AND rebase --abort failed \u2014 repo left mid-rebase, run 'git rebase --abort' manually","error",6e3);return}if(Pe==="busy"){ge("Git pull skipped: another operation is running","warning",3e3);return}let ot=Fe?`: ${Fe}`:"";throw ge(`Git pull failed${ot}`,"error",3e3),$}}async function Gt(A,$){t("setting workspace visibility %s \u2192 %s",A,String($));try{await ke.send("set-workspace-visibility",{path:A,visible:$}),await rn()}catch(Pe){t("workspace visibility update failed: %o",Pe),ge("Failed to update project visibility","error",3e3)}}async function rn(){try{let A=await ke.send("list-workspaces",{});if(t("workspaces loaded: %o",A),A&&Array.isArray(A.workspaces)){let $=A.workspaces.map(vt=>({path:vt.path,database:vt.database,pid:vt.pid,version:vt.version})),Pe=A.current?{path:A.current.root_dir,database:A.current.db_path}:null,Fe=Array.isArray(A.hidden)?A.hidden.filter(vt=>typeof vt=="string"):[];we.setState({workspace:{current:Pe,available:$,hidden:Fe}});let ot=window.localStorage.getItem("beads-ui.workspace");ot&&(!$.some(Nt=>Nt.path===ot)||Fe.includes(ot)?window.localStorage.removeItem("beads-ui.workspace"):Pe&&ot!==Pe.path&&(t("restoring saved workspace preference: %s",ot),await Ot(ot)))}}catch(A){t("failed to load workspaces: %o",A)}}ke.on("workspace-changed",A=>{t("workspace-changed event: %o",A),A&&A.root_dir&&(we.setState({workspace:{current:{path:A.root_dir,database:A.db_path}}}),rn(),Jt())});let zt=!1;if(typeof ke.onConnection=="function"){let A=$=>{t("ws state %s",$),$==="reconnecting"||$==="closed"?(zt=!0,ge("Connection lost. Reconnecting\u2026","error",4e3)):$==="open"&&zt&&(zt=!1,ge("Reconnected","success",2200),ow(we,(Pe,Fe)=>{t(`${Pe}: %o`,Fe)}),Xt())};ke.onConnection(A)}let on="board";try{let A=window.localStorage.getItem("beads-ui.view");(A==="board"||A==="worker"||A==="monitor")&&(on=A)}catch(A){t("view parse error: %o",A)}let we=Uc({config:rw(),view:on});ke.on("worker-queue-snapshot",A=>{let $=A;if(!$||!$.queue)return;let Pe=we.getState().workspace.current?.path;if(typeof Pe=="string"&&Pe.length>0&&$.root_dir!==Pe){t("dropping worker-queue snapshot for %s",String($.root_dir));return}try{Ze.set($.queue)}catch{}});let S=Fc(we);S.start();let de=new Set(["get-comments","dep-add","dep-remove","impl-preset-create","impl-preset-update","impl-preset-delete","apply-impl-preset","apply-impl-preset-global","get-session-defaults","set-session-defaults","monitor-lane-create","monitor-lane-update","monitor-lane-confirm","monitor-lane-remove"]),qe=async(A,$)=>{try{return await Me(A,$)}catch(Pe){if(de.has(A))throw Pe;return[]}};Of({global_element:r,repo_element:o},we,S);let b=document.getElementById("workspace-picker");b&&S_(b,we,Ot,St,Gt);let v=Df(e,(A,$)=>Me(A,$));try{let A=document.getElementById("new-issue-btn");A&&A.addEventListener("click",()=>v.open())}catch{}let M=jf(e,{policyStore:J,queueStore:Ze,implPresetStore:re,transport:(A,$)=>Me(A,$),onOpenChange:A=>{let $=Ye;Ye=A,tt(),$&&A===!1&&le.refreshSessionDefaults()},labelOptions:()=>{let A=new Set;for(let[$]of ec)for(let Pe of Ie.snapshotFor($)||[]){let Fe=Pe.labels;if(Array.isArray(Fe))for(let ot of Fe)typeof ot=="string"&&ot.length>0&&A.add(ot)}return Array.from(A).sort()}});try{let A=document.getElementById("display-settings-btn");A&&(A.setAttribute("aria-label","\uC124\uC815"),A.setAttribute("title","\uC124\uC815"),A.addEventListener("click",()=>M.open()))}catch{}let f=document.createElement("div");f.className="md-viewer-root",document.body.appendChild(f);let k=Gi(f,{getWorkspacePath:()=>we.getState().workspace.current?.path}),ae=su(l,{gotoIssue:A=>S.gotoIssue(A),issueStores:Ie,transport:qe,workerQueueStore:Ze,uiOrderStore:G,displayPolicyStore:J,closedRange:Ce,onClosedRangeChange:A=>{Dt(A)},onNewIssue:()=>v.open(),openDoc:B}),le=Xl(a,{transport:qe,issueStores:Ie,queueStore:Ze,sessionLogStore:pe,gotoIssue:A=>we.setState({selected_id:A}),getWorkspacePath:()=>we.getState().workspace.current?.path,switchWorkspace:A=>Ot(A),openDoc:B,doneRange:Je,onDoneRangeChange:A=>{Rt(A)}}),Ue=Rf(u,{transport:qe,pipelineStore:ut,execPresetStore:re,sessionLogStore:pe,router:S,gotoIssue:A=>S.gotoIssue(A),getWorkspacePath:()=>we.getState().workspace.current?.path,switchWorkspace:A=>Ot(A),openDoc:B}),ft=Xp(d,{issueStores:Ie,transport:qe,queueStore:Ze,execPresetStore:re,sessionLogStore:pe,getWorkspacePath:()=>we.getState().workspace.current?.path,mdViewer:k,depCandidates:()=>{let A=ut.get();if(A===null)return null;let $=ut.getWorkspacesState(),Pe=we.getState();if(Pe.view==="monitor")return cl(A,$);let Fe=Pe.workspace.current?.path;return Fe?cl(A,$,{root_dir:Fe}):null},subscribeCandidates:A=>ut.subscribe(A),onDepChanged:({type:A,a:$,b:Pe})=>{let Fe=Ue;A==="dep-add"&&Fe&&typeof Fe.recorrectSharedLane=="function"&&Fe.recorrectSharedLane(A,$,Pe)},onNavigate:(A,$)=>{let Pe=()=>{we.getState().view==="worker"?we.setState({selected_id:A}):S.gotoIssue(A)},Fe=we.getState().workspace.current?.path;if(typeof $!="string"||$.length===0||!Fe||$===Fe){Pe();return}Promise.resolve(Ot($)).then(Pe).catch(()=>{ge("\uB808\uD3EC \uC804\uD658\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error",2400)})},onClose:()=>{let A=we.getState();we.setState({selected_id:null});try{S.gotoView(A.view==="worker"||A.view==="monitor"?A.view:"board")}catch{}},onOpenExecPresets:()=>{M.open("execution")}}),mt=we.getState().selected_id;mt&&(d.hidden=!1,ft.load(mt),Ke(mt)),we.subscribe(A=>{let $=A.selected_id;$?(d.hidden=!1,ft.load($),Q||Ke($)):(ft.clear(),d.hidden=!0,_t())});let it=A=>{l.hidden=A.view!=="board",a.hidden=A.view!=="worker",u.hidden=A.view!=="monitor",i&&i.classList.toggle("is-quiet",A.view==="monitor"),ht(A.view==="board"),Ge(A.view==="worker"),fe(ne(A)),Re(A.view==="board"||A.view==="worker"||Ye||!!A.selected_id),!A.selected_id&&A.view==="board"&&ae.load(),A.view==="worker"&&le.load(),A.view==="monitor"?Ue.load():Ue.pause(),window.localStorage.setItem("beads-ui.view",A.view)};we.subscribe(it),it(we.getState()),yt(),Ut(),At(),rn().finally(()=>{ee=!0,Qe()}),window.addEventListener("keydown",A=>{let $=A.ctrlKey||A.metaKey,Pe=String(A.key||"").toLowerCase(),Fe=A.target,ot=Fe&&Fe.tagName?String(Fe.tagName).toLowerCase():"",vt=ot==="input"||ot==="textarea"||ot==="select"||Fe&&typeof Fe.isContentEditable=="boolean"&&Fe.isContentEditable;$&&Pe==="n"&&(vt||(A.preventDefault(),v.open()))})}}typeof window<"u"&&typeof document<"u"&&window.addEventListener("DOMContentLoaded",()=>{try{let n=window.localStorage.getItem("beads-ui.theme"),r=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches,o=n==="dark"||n==="light"?n:r?"dark":"light";document.documentElement.setAttribute("data-theme",o);let i=document.getElementById("theme-switch");i&&(i.checked=o==="dark")}catch{}let e=document.getElementById("theme-switch");e&&e.addEventListener("change",()=>{let n=e.checked?"dark":"light";document.documentElement.setAttribute("data-theme",n),window.localStorage.setItem("beads-ui.theme",n)});let t=document.getElementById("app");t&&lw(t)});export{lw as bootstrap,rw as readBootstrapConfig,ow as refreshConfigSnapshot};
//# sourceMappingURL=main.bundle.js.map
