var X_=Object.create;var $a=Object.defineProperty;var Z_=Object.getOwnPropertyDescriptor;var J_=Object.getOwnPropertyNames;var em=Object.getPrototypeOf,tm=Object.prototype.hasOwnProperty;var nm=(e,t,n)=>t in e?$a(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var xa=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var rm=(e,t,n,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let o of J_(t))!tm.call(e,o)&&o!==n&&$a(e,o,{get:()=>t[o],enumerable:!(r=Z_(t,o))||r.enumerable});return e};var om=(e,t,n)=>(n=e!=null?X_(em(e)):{},rm(t||!e||!e.__esModule?$a(n,"default",{value:e,enumerable:!0}):n,e));var qt=(e,t,n)=>nm(e,typeof t!="symbol"?t+"":t,n);var Cc=xa((Iw,Tc)=>{var Qr=1e3,Xr=Qr*60,Zr=Xr*60,Dr=Zr*24,am=Dr*7,lm=Dr*365.25;Tc.exports=function(e,t){t=t||{};var n=typeof e;if(n==="string"&&e.length>0)return cm(e);if(n==="number"&&isFinite(e))return t.long?dm(e):um(e);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(e))};function cm(e){if(e=String(e),!(e.length>100)){var t=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(e);if(t){var n=parseFloat(t[1]),r=(t[2]||"ms").toLowerCase();switch(r){case"years":case"year":case"yrs":case"yr":case"y":return n*lm;case"weeks":case"week":case"w":return n*am;case"days":case"day":case"d":return n*Dr;case"hours":case"hour":case"hrs":case"hr":case"h":return n*Zr;case"minutes":case"minute":case"mins":case"min":case"m":return n*Xr;case"seconds":case"second":case"secs":case"sec":case"s":return n*Qr;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return n;default:return}}}}function um(e){var t=Math.abs(e);return t>=Dr?Math.round(e/Dr)+"d":t>=Zr?Math.round(e/Zr)+"h":t>=Xr?Math.round(e/Xr)+"m":t>=Qr?Math.round(e/Qr)+"s":e+"ms"}function dm(e){var t=Math.abs(e);return t>=Dr?zs(e,t,Dr,"day"):t>=Zr?zs(e,t,Zr,"hour"):t>=Xr?zs(e,t,Xr,"minute"):t>=Qr?zs(e,t,Qr,"second"):e+" ms"}function zs(e,t,n,r){var o=t>=n*1.5;return Math.round(e/n)+" "+r+(o?"s":"")}});var Oc=xa((Lw,Rc)=>{function pm(e){n.debug=n,n.default=n,n.coerce=a,n.disable=s,n.enable=o,n.enabled=l,n.humanize=Cc(),n.destroy=u,Object.keys(e).forEach(d=>{n[d]=e[d]}),n.names=[],n.skips=[],n.formatters={};function t(d){let p=0;for(let m=0;m<d.length;m++)p=(p<<5)-p+d.charCodeAt(m),p|=0;return n.colors[Math.abs(p)%n.colors.length]}n.selectColor=t;function n(d){let p,m=null,g,k;function T(...C){if(!T.enabled)return;let te=T,re=Number(new Date),X=re-(p||re);te.diff=X,te.prev=p,te.curr=re,p=re,C[0]=n.coerce(C[0]),typeof C[0]!="string"&&C.unshift("%O");let D=0;C[0]=C[0].replace(/%([a-zA-Z%])/g,(q,B)=>{if(q==="%%")return"%";D++;let K=n.formatters[B];if(typeof K=="function"){let F=C[D];q=K.call(te,F),C.splice(D,1),D--}return q}),n.formatArgs.call(te,C),(te.log||n.log).apply(te,C)}return T.namespace=d,T.useColors=n.useColors(),T.color=n.selectColor(d),T.extend=r,T.destroy=n.destroy,Object.defineProperty(T,"enabled",{enumerable:!0,configurable:!1,get:()=>m!==null?m:(g!==n.namespaces&&(g=n.namespaces,k=n.enabled(d)),k),set:C=>{m=C}}),typeof n.init=="function"&&n.init(T),T}function r(d,p){let m=n(this.namespace+(typeof p>"u"?":":p)+d);return m.log=this.log,m}function o(d){n.save(d),n.namespaces=d,n.names=[],n.skips=[];let p=(typeof d=="string"?d:"").trim().replace(/\s+/g,",").split(",").filter(Boolean);for(let m of p)m[0]==="-"?n.skips.push(m.slice(1)):n.names.push(m)}function i(d,p){let m=0,g=0,k=-1,T=0;for(;m<d.length;)if(g<p.length&&(p[g]===d[m]||p[g]==="*"))p[g]==="*"?(k=g,T=m,g++):(m++,g++);else if(k!==-1)g=k+1,T++,m=T;else return!1;for(;g<p.length&&p[g]==="*";)g++;return g===p.length}function s(){let d=[...n.names,...n.skips.map(p=>"-"+p)].join(",");return n.enable(""),d}function l(d){for(let p of n.skips)if(i(d,p))return!1;for(let p of n.names)if(i(d,p))return!0;return!1}function a(d){return d instanceof Error?d.stack||d.message:d}function u(){console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")}return n.enable(n.load()),n}Rc.exports=pm});var Ic=xa((kn,Hs)=>{kn.formatArgs=_m;kn.save=mm;kn.load=gm;kn.useColors=fm;kn.storage=hm();kn.destroy=(()=>{let e=!1;return()=>{e||(e=!0,console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."))}})();kn.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"];function fm(){if(typeof window<"u"&&window.process&&(window.process.type==="renderer"||window.process.__nwjs))return!0;if(typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))return!1;let e;return typeof document<"u"&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||typeof window<"u"&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||typeof navigator<"u"&&navigator.userAgent&&(e=navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/))&&parseInt(e[1],10)>=31||typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)}function _m(e){if(e[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+e[0]+(this.useColors?"%c ":" ")+"+"+Hs.exports.humanize(this.diff),!this.useColors)return;let t="color: "+this.color;e.splice(1,0,t,"color: inherit");let n=0,r=0;e[0].replace(/%[a-zA-Z%]/g,o=>{o!=="%%"&&(n++,o==="%c"&&(r=n))}),e.splice(r,0,t)}kn.log=console.debug||console.log||(()=>{});function mm(e){try{e?kn.storage.setItem("debug",e):kn.storage.removeItem("debug")}catch{}}function gm(){let e;try{e=kn.storage.getItem("debug")||kn.storage.getItem("DEBUG")}catch{}return!e&&typeof process<"u"&&"env"in process&&(e=process.env.DEBUG),e}function hm(){try{return localStorage}catch{}}Hs.exports=Oc()(kn);var{formatters:bm}=Hs.exports;bm.j=function(e){try{return JSON.stringify(e)}catch(t){return"[UnexpectedJSONParseError]: "+t.message}}});var Co=globalThis,qs=Co.trustedTypes,pc=qs?qs.createPolicy("lit-html",{createHTML:e=>e}):void 0,Sa="$lit$",Xn=`lit$${Math.random().toFixed(9).slice(2)}$`,Ea="?"+Xn,sm=`<${Ea}>`,Rr=document,Ro=()=>Rr.createComment(""),Oo=e=>e===null||typeof e!="object"&&typeof e!="function",Ta=Array.isArray,bc=e=>Ta(e)||typeof e?.[Symbol.iterator]=="function",Aa=`[ 	
\f\r]`,To=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,fc=/-->/g,_c=/>/g,Tr=RegExp(`>|${Aa}(?:([^\\s"'>=/]+)(${Aa}*=${Aa}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),mc=/'/g,gc=/"/g,yc=/^(?:script|style|textarea|title)$/i,Ca=e=>(t,...n)=>({_$litType$:e,strings:t,values:n}),c=Ca(1),Lo=Ca(2),Aw=Ca(3),Sn=Symbol.for("lit-noChange"),Yt=Symbol.for("lit-nothing"),hc=new WeakMap,Cr=Rr.createTreeWalker(Rr,129);function vc(e,t){if(!Ta(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return pc!==void 0?pc.createHTML(t):t}var kc=(e,t)=>{let n=e.length-1,r=[],o,i=t===2?"<svg>":t===3?"<math>":"",s=To;for(let l=0;l<n;l++){let a=e[l],u,d,p=-1,m=0;for(;m<a.length&&(s.lastIndex=m,d=s.exec(a),d!==null);)m=s.lastIndex,s===To?d[1]==="!--"?s=fc:d[1]!==void 0?s=_c:d[2]!==void 0?(yc.test(d[2])&&(o=RegExp("</"+d[2],"g")),s=Tr):d[3]!==void 0&&(s=Tr):s===Tr?d[0]===">"?(s=o??To,p=-1):d[1]===void 0?p=-2:(p=s.lastIndex-d[2].length,u=d[1],s=d[3]===void 0?Tr:d[3]==='"'?gc:mc):s===gc||s===mc?s=Tr:s===fc||s===_c?s=To:(s=Tr,o=void 0);let g=s===Tr&&e[l+1].startsWith("/>")?" ":"";i+=s===To?a+sm:p>=0?(r.push(u),a.slice(0,p)+Sa+a.slice(p)+Xn+g):a+Xn+(p===-2?l:g)}return[vc(e,i+(e[n]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),r]},Io=class e{constructor({strings:t,_$litType$:n},r){let o;this.parts=[];let i=0,s=0,l=t.length-1,a=this.parts,[u,d]=kc(t,n);if(this.el=e.createElement(u,r),Cr.currentNode=this.el.content,n===2||n===3){let p=this.el.content.firstChild;p.replaceWith(...p.childNodes)}for(;(o=Cr.nextNode())!==null&&a.length<l;){if(o.nodeType===1){if(o.hasAttributes())for(let p of o.getAttributeNames())if(p.endsWith(Sa)){let m=d[s++],g=o.getAttribute(p).split(Xn),k=/([.?@])?(.*)/.exec(m);a.push({type:1,index:i,name:k[2],strings:g,ctor:k[1]==="."?js:k[1]==="?"?Fs:k[1]==="@"?Bs:Ir}),o.removeAttribute(p)}else p.startsWith(Xn)&&(a.push({type:6,index:i}),o.removeAttribute(p));if(yc.test(o.tagName)){let p=o.textContent.split(Xn),m=p.length-1;if(m>0){o.textContent=qs?qs.emptyScript:"";for(let g=0;g<m;g++)o.append(p[g],Ro()),Cr.nextNode(),a.push({type:2,index:++i});o.append(p[m],Ro())}}}else if(o.nodeType===8)if(o.data===Ea)a.push({type:2,index:i});else{let p=-1;for(;(p=o.data.indexOf(Xn,p+1))!==-1;)a.push({type:7,index:i}),p+=Xn.length-1}i++}}static createElement(t,n){let r=Rr.createElement("template");return r.innerHTML=t,r}};function Or(e,t,n=e,r){if(t===Sn)return t;let o=r!==void 0?n._$Co?.[r]:n._$Cl,i=Oo(t)?void 0:t._$litDirective$;return o?.constructor!==i&&(o?._$AO?.(!1),i===void 0?o=void 0:(o=new i(e),o._$AT(e,n,r)),r!==void 0?(n._$Co??(n._$Co=[]))[r]=o:n._$Cl=o),o!==void 0&&(t=Or(e,o._$AS(e,t.values),o,r)),t}var Ns=class{constructor(t,n){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=n}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:n},parts:r}=this._$AD,o=(t?.creationScope??Rr).importNode(n,!0);Cr.currentNode=o;let i=Cr.nextNode(),s=0,l=0,a=r[0];for(;a!==void 0;){if(s===a.index){let u;a.type===2?u=new Yr(i,i.nextSibling,this,t):a.type===1?u=new a.ctor(i,a.name,a.strings,this,t):a.type===6&&(u=new Us(i,this,t)),this._$AV.push(u),a=r[++l]}s!==a?.index&&(i=Cr.nextNode(),s++)}return Cr.currentNode=Rr,o}p(t){let n=0;for(let r of this._$AV)r!==void 0&&(r.strings!==void 0?(r._$AI(t,r,n),n+=r.strings.length-2):r._$AI(t[n])),n++}},Yr=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,n,r,o){this.type=2,this._$AH=Yt,this._$AN=void 0,this._$AA=t,this._$AB=n,this._$AM=r,this.options=o,this._$Cv=o?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,n=this._$AM;return n!==void 0&&t?.nodeType===11&&(t=n.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,n=this){t=Or(this,t,n),Oo(t)?t===Yt||t==null||t===""?(this._$AH!==Yt&&this._$AR(),this._$AH=Yt):t!==this._$AH&&t!==Sn&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):bc(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==Yt&&Oo(this._$AH)?this._$AA.nextSibling.data=t:this.T(Rr.createTextNode(t)),this._$AH=t}$(t){let{values:n,_$litType$:r}=t,o=typeof r=="number"?this._$AC(t):(r.el===void 0&&(r.el=Io.createElement(vc(r.h,r.h[0]),this.options)),r);if(this._$AH?._$AD===o)this._$AH.p(n);else{let i=new Ns(o,this),s=i.u(this.options);i.p(n),this.T(s),this._$AH=i}}_$AC(t){let n=hc.get(t.strings);return n===void 0&&hc.set(t.strings,n=new Io(t)),n}k(t){Ta(this._$AH)||(this._$AH=[],this._$AR());let n=this._$AH,r,o=0;for(let i of t)o===n.length?n.push(r=new e(this.O(Ro()),this.O(Ro()),this,this.options)):r=n[o],r._$AI(i),o++;o<n.length&&(this._$AR(r&&r._$AB.nextSibling,o),n.length=o)}_$AR(t=this._$AA.nextSibling,n){for(this._$AP?.(!1,!0,n);t!==this._$AB;){let r=t.nextSibling;t.remove(),t=r}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},Ir=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,n,r,o,i){this.type=1,this._$AH=Yt,this._$AN=void 0,this.element=t,this.name=n,this._$AM=o,this.options=i,r.length>2||r[0]!==""||r[1]!==""?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=Yt}_$AI(t,n=this,r,o){let i=this.strings,s=!1;if(i===void 0)t=Or(this,t,n,0),s=!Oo(t)||t!==this._$AH&&t!==Sn,s&&(this._$AH=t);else{let l=t,a,u;for(t=i[0],a=0;a<i.length-1;a++)u=Or(this,l[r+a],n,a),u===Sn&&(u=this._$AH[a]),s||(s=!Oo(u)||u!==this._$AH[a]),u===Yt?t=Yt:t!==Yt&&(t+=(u??"")+i[a+1]),this._$AH[a]=u}s&&!o&&this.j(t)}j(t){t===Yt?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},js=class extends Ir{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===Yt?void 0:t}},Fs=class extends Ir{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==Yt)}},Bs=class extends Ir{constructor(t,n,r,o,i){super(t,n,r,o,i),this.type=5}_$AI(t,n=this){if((t=Or(this,t,n,0)??Yt)===Sn)return;let r=this._$AH,o=t===Yt&&r!==Yt||t.capture!==r.capture||t.once!==r.once||t.passive!==r.passive,i=t!==Yt&&(r===Yt||o);o&&this.element.removeEventListener(this.name,this,r),i&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},Us=class{constructor(t,n,r){this.element=t,this.type=6,this._$AN=void 0,this._$AM=n,this.options=r}get _$AU(){return this._$AM._$AU}_$AI(t){Or(this,t)}},wc={M:Sa,P:Xn,A:Ea,C:1,L:kc,R:Ns,D:bc,V:Or,I:Yr,H:Ir,N:Fs,U:Bs,B:js,F:Us},im=Co.litHtmlPolyfillSupport;im?.(Io,Yr),(Co.litHtmlVersions??(Co.litHtmlVersions=[])).push("3.3.1");var ct=(e,t,n)=>{let r=n?.renderBefore??t,o=r._$litPart$;if(o===void 0){let i=n?.renderBefore??null;r._$litPart$=o=new Yr(t.insertBefore(Ro(),i),i,void 0,n??{})}return o._$AI(e),o};var Ws="today",$c=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"},{value:"30d",label:"\uCD5C\uADFC 30\uC77C"},{value:"all",label:"\uC804\uCCB4"}],Vr=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"}];function Wn(e){return e==="today"?"today":"7d"}function Ra(e){return e==="today"||e==="7d"||e==="30d"||e==="all"}function Lr(e,t=Date.now()){switch(e){case"today":{let n=new Date(t);return n.setHours(0,0,0,0),n.getTime()}case"7d":return t-7*864e5;case"30d":return t-30*864e5;case"all":default:return}}function xc(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function Ac(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function Sc(){let e=null,t=[],n,r=new Set;function o(){for(let i of Array.from(r))try{i()}catch{}}return{get(){return e},getWorkspacesState(){return t},crossLanes(){return n},set(i,s,l){e=Array.isArray(i)?i:null,t=Array.isArray(s)?s:[],n=l===void 0?void 0:l!==null&&typeof l=="object"&&typeof l.revision=="number"&&Array.isArray(l.lanes)?{revision:l.revision,lanes:l.lanes}:null,o()},clear(){e=null,t=[],n=void 0,o()},subscribe(i){return r.add(i),()=>r.delete(i)}}}function Ec(){let e=new Map,t=new Set;function n(o){return o.startsWith("session-log:")?o:`session-log:${o}`}function r(){for(let o of Array.from(t))try{o()}catch{}}return{set(o,i,s=null){e.set(n(o),{lines:Array.isArray(i)?[...i]:[],last_event_at:typeof s=="number"?s:null}),r()},append(o,i){let s=n(o),l=e.get(s)||{lines:[],last_event_at:null};l.lines=[...l.lines,i],l.last_event_at=Date.now(),e.set(s,l),r()},get(o){return e.get(n(o))||null},clear(o){typeof o=="string"?e.delete(n(o)):e.clear(),r()},subscribe(o){return t.add(o),()=>t.delete(o)}}}var Lc=om(Ic(),1);function Ut(e){return(0,Lc.default)(`beads-ui:${e}`)}function ym(e){let n=Dc((e&&typeof e=="object"?e:{}).spec_id);return n?{path:n,source:"native",conflict:!1}:{path:"",source:"none",conflict:!1}}function Dc(e){return typeof e=="string"?e.trim():""}function vm(e){let t=e&&typeof e=="object"?e:{};return t.metadata&&typeof t.metadata=="object"?t.metadata:{}}var km=/^[A-Za-z0-9_.:-]+@[0-9a-fA-F]{40}$/;function Jr(e){let t=ym(e),n=Dc(vm(e).spec_review),r=km.test(n),o=r&&n.slice(0,n.indexOf("@"))==="skipped";return t.source==="none"?{...t,evidence:"none",skipped:o}:{...t,evidence:r?"published":"draft",skipped:o}}function In(e){if(typeof e=="number")return Number.isFinite(e)?e:0;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:0}return 0}function Do(e,t){let n=In(e.created_at),r=In(t.created_at);if(n!==r)return n<r?1:-1;let o=e.priority??2,i=t.priority??2;if(o!==i)return o-i;let s=e.id,l=t.id;return s<l?-1:s>l?1:0}function Fc(e,t){let n=In(e.created_at),r=In(t.created_at);if(n!==r)return n<r?-1:1;let o=e.priority??2,i=t.priority??2;if(o!==i)return o-i;let s=e.id,l=t.id;return s<l?-1:s>l?1:0}function Bc(e,t){let n=In(e.updated_at),r=In(t.updated_at);if(n!==r)return n<r?1:-1;let o=e.id,i=t.id;return o<i?-1:o>i?1:0}function Uc(e,t){let n=e.priority??2,r=t.priority??2;if(n!==r)return n-r;let o=In(e.created_at),i=In(t.created_at);if(o!==i)return o<i?1:-1;let s=e.id,l=t.id;return s<l?-1:s>l?1:0}function Wc(e,t){let n=e.closed_at??0,r=t.closed_at??0;if(n!==r)return n<r?1:-1;let o=e?.id,i=t?.id;return o<i?-1:o>i?1:0}var Ks=Object.freeze({priority:"asc",dependents:"desc",released:"desc",spec:"desc",created:"asc",updated:"desc"});function wm(e){return typeof e=="string"&&Object.prototype.hasOwnProperty.call(Ks,e)}function Ia(e){if(!e||typeof e!="object")return!1;let t=e;return wm(t.key)&&(t.dir==="asc"||t.dir==="desc")}function Pc(e){if(typeof e=="number")return Number.isFinite(e)?e:null;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:null}return null}function Mc(e,t){switch(t){case"priority":{let n=e.priority;return typeof n=="number"&&Number.isFinite(n)?n:null}case"dependents":{let n=e.dependents_info?e.dependents_info.count:null;return typeof n=="number"&&Number.isFinite(n)?n:null}case"released":{let n=e.release_info?e.release_info.last_released_at:null;return typeof n=="number"&&Number.isFinite(n)?n:null}case"spec":return Jr(e).evidence==="published"?1:0;case"created":return Pc(e.created_at);case"updated":return Pc(e.updated_at);default:return null}}function qc(e,t,n){let r=Mc(e,n.key),o=Mc(t,n.key);if(r===null||o===null)return r===o?0:r===null?1:-1;if(r===o)return 0;let i=r<o?-1:1;return n.dir==="desc"?-i:i}function zc(e){let t=Array.isArray(e)?e.filter(Ia):[];return(n,r)=>{for(let l of t){let a=qc(n,r,l);if(a!==0)return a}let o=qc(n,r,{key:"created",dir:"asc"});if(o!==0)return o;let i=n.id,s=r.id;return i<s?-1:i>s?1:0}}var $m=/^(?:[A-Za-z][A-Za-z0-9]*(?:-[A-Za-z0-9]+)+\s+)?(?:Task|Phase|T)\s*(\d+)/i;function Nc(e){let t=e&&e.metadata,n=t?t.task_order:void 0;if(n==null||n==="")return Number.POSITIVE_INFINITY;let r=Number(n);return Number.isFinite(r)?r:Number.POSITIVE_INFINITY}function jc(e){let t=e&&e.title;if(typeof t!="string")return Number.POSITIVE_INFINITY;let n=$m.exec(t);if(!n)return Number.POSITIVE_INFINITY;let r=Number(n[1]);return Number.isFinite(r)?r:Number.POSITIVE_INFINITY}function Hc(e,t){let n=Nc(e),r=Nc(t);if(n!==r)return n<r?-1:1;let o=jc(e),i=jc(t);if(o!==i)return o<i?-1:1;let s=In(e&&e.created_at),l=In(t&&t.created_at);if(s!==l)return s<l?-1:1;let a=e&&e.id,u=t&&t.id;return a===u?0:String(a)<String(u)?-1:1}var Oa=2**20;function eo(e,t){let n=e&&e.id;return t&&typeof n=="string"&&Object.prototype.hasOwnProperty.call(t,n)&&typeof t[n]=="number"&&Number.isFinite(t[n])?t[n]:-In(e&&e.created_at)}function Kc(e){return(t,n)=>{let r=eo(t,e),o=eo(n,e);if(r!==o)return r<o?-1:1;let i=t?.id,s=n?.id;return i<s?-1:i>s?1:0}}function La(e,t,n){let r=Array.isArray(e)?e:[],o=r.length,i=Math.max(0,Math.min(t,o-1)),s=i-1>=0?r[i-1]:null,l=i+1<o?r[i+1]:null;if(!s&&!l)return{rank:0};if(!s)return{rank:eo(l,n)-Oa};if(!l)return{rank:eo(s,n)+Oa};let a=eo(s,n),u=eo(l,n),d=(a+u)/2;return a<d&&d<u?{rank:d}:{renormalize:r.map((p,m)=>({bead_id:p.id,rank:m*Oa}))}}function Da(e,t={}){let n=Ut(`issue-store:${e}`),r=new Map,o=[],i=0,s=new Set,l=!1,a=t.sort||Do;function u(){for(let m of Array.from(s))try{m()}catch{}}function d(){o=Array.from(r.values()).sort(a)}function p(m){if(l||!m||m.id!==e)return;let g=Number(m.revision)||0;if(n("apply %s rev=%d",m.type,g),!(g<=i&&m.type!=="snapshot")){if(m.type==="snapshot"){if(g<=i)return;r.clear();let k=Array.isArray(m.issues)?m.issues:[];for(let T of k)T&&typeof T.id=="string"&&T.id.length>0&&r.set(T.id,T);d(),i=g,u();return}if(m.type==="upsert"){let k=m.issue;if(k&&typeof k.id=="string"&&k.id.length>0){let T=r.get(k.id);if(!T)r.set(k.id,k);else{let C=Number.isFinite(T.updated_at)?T.updated_at:0,te=Number.isFinite(k.updated_at)?k.updated_at:0;if(C<=te){for(let re of Object.keys(T))re in k||delete T[re];for(let[re,X]of Object.entries(k))T[re]=X}}d()}i=g,u()}else if(m.type==="delete"){let k=String(m.issue_id||"");k&&(r.delete(k),d()),i=g,u()}}}return{id:e,subscribe(m){return s.add(m),()=>{s.delete(m)}},applyPush:p,snapshot(){return o},size(){return r.size},getById(m){return r.get(m)},dispose(){l=!0,r.clear(),o=[],s.clear(),i=0}}}function Gs(e){let t=String(e.type||"").trim(),n={};if(e.params&&typeof e.params=="object"){let o=Object.keys(e.params).sort();for(let i of o){let s=e.params[i];n[i]=String(s)}}let r=new URLSearchParams(n).toString();return r.length>0?`${t}?${r}`:t}function Gc(e){let t=Ut("subs"),n=new Map,r=new Map;function o(l,a){t("applyDelta %s +%d ~%d -%d",l,(a.added||[]).length,(a.updated||[]).length,(a.removed||[]).length);let u=r.get(l);if(!u||u.size===0)return;let d=Array.isArray(a.added)?a.added:[],p=Array.isArray(a.updated)?a.updated:[],m=Array.isArray(a.removed)?a.removed:[];for(let g of Array.from(u)){let k=n.get(g);if(!k)continue;let T=k.itemsById;for(let C of d)typeof C=="string"&&C.length>0&&T.set(C,!0);for(let C of p)typeof C=="string"&&C.length>0&&T.set(C,!0);for(let C of m)typeof C=="string"&&C.length>0&&T.delete(C)}}async function i(l,a){let u=Gs(a);if(t("subscribe %s key=%s",l,u),!n.has(l))n.set(l,{key:u,itemsById:new Map});else{let p=n.get(l);if(p&&p.key!==u){let m=r.get(p.key);m&&(m.delete(l),m.size===0&&r.delete(p.key)),n.set(l,{key:u,itemsById:new Map})}}r.has(u)||r.set(u,new Set);let d=r.get(u);d&&d.add(l);try{await e("subscribe-list",{id:l,type:a.type,params:a.params})}catch(p){let m=n.get(l)||null;if(m){let g=r.get(m.key);g&&(g.delete(l),g.size===0&&r.delete(m.key))}throw n.delete(l),p}return async()=>{t("unsubscribe %s key=%s",l,u);try{await e("unsubscribe-list",{id:l})}catch{}let p=n.get(l)||null;if(p){let m=r.get(p.key);m&&(m.delete(l),m.size===0&&r.delete(p.key))}n.delete(l)}}return{subscribeList:i,_applyDelta:o,_subKeyOf:Gs,selectors:{getIds(l){let a=n.get(l);return a?Array.from(a.itemsById.keys()):[]},has(l,a){let u=n.get(l);return u?u.itemsById.has(a):!1},count(l){let a=n.get(l);return a?a.itemsById.size:0},getItemsById(l){let a=n.get(l),u={};if(!a)return u;for(let d of a.itemsById.keys())u[d]=!0;return u}}}}function Yc(){let e=Ut("issue-stores"),t=new Map,n=new Map,r=new Set,o=new Map;function i(){for(let a of Array.from(r))try{a()}catch{}}function s(a,u,d){let p=u?Gs(u):"",m=n.get(a)||"",g=t.has(a);if(e("register %s key=%s (prev=%s)",a,p,m),g&&m&&p&&m!==p){let k=t.get(a);if(k)try{k.dispose()}catch{}let T=o.get(a);if(T){try{T()}catch{}o.delete(a)}let C=Da(a,d);t.set(a,C);let te=C.subscribe(()=>i());o.set(a,te)}else if(!g){let k=Da(a,d);t.set(a,k);let T=k.subscribe(()=>i());o.set(a,T)}return n.set(a,p),()=>l(a)}function l(a){e("unregister %s",a),n.delete(a);let u=t.get(a);u&&(u.dispose(),t.delete(a));let d=o.get(a);if(d){try{d()}catch{}o.delete(a)}}return{register:s,unregister:l,getStore(a){return t.get(a)||null},snapshotFor(a){let u=t.get(a);return u?u.snapshot().slice():[]},subscribe(a){return r.add(a),()=>r.delete(a)}}}function Vc(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function Qc(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function Pa(e,t){return`#/${e==="worker"||e==="monitor"?e:"board"}?issue=${encodeURIComponent(t)}`}function xm(e){let t=String(e||""),n=t.startsWith("#")?t.slice(1):t,r=n.indexOf("?"),o=r>=0?n.slice(r+1):"";if(o){let l=new URLSearchParams(o).get("issue");if(l)return decodeURIComponent(l)}let i=/^\/issue\/([^\s?#]+)/.exec(n);return i&&i[1]?decodeURIComponent(i[1]):null}function Am(e){let t=String(e||"");return/^#\/worker(\b|\/|$)/.test(t)?"worker":/^#\/monitor(\b|\/|$)/.test(t)?"monitor":"board"}function Xc(e){let t=Ut("router"),n=()=>{let r=window.location.hash||"",o=/^#\/issue\/([^\s?#]+)/.exec(r),i=o&&o[1]?decodeURIComponent(o[1]):xm(r),s=Am(r);if(t("hash change \u2192 view=%s id=%s",s,i),e.setState({selected_id:s==="worker"?null:i,view:s,worker:{selected_parent_id:s==="worker"?i:null}}),!!o||/^#\/(issues|epics)(\b|\/|\?|$)/.test(r)){let a=i?`#/${s}?issue=${encodeURIComponent(i)}`:`#/${s}`;window.location.hash!==a&&(window.location.hash=a)}};return{start(){window.addEventListener("hashchange",n),n()},stop(){window.removeEventListener("hashchange",n)},gotoIssue(r){let o=e.getState?e.getState():{view:"board"},i=o.view==="worker"||o.view==="monitor"?o.view:"board",s=Pa(i,r);t("goto issue %s (view=%s)",r,i),window.location.hash!==s?window.location.hash=s:e.setState({selected_id:i==="worker"?null:r,view:i,worker:{selected_parent_id:i==="worker"?r:null}})},gotoView(r){let o=e.getState?e.getState():{selected_id:null,worker:{selected_parent_id:null}},i=r==="worker"?o.worker?.selected_parent_id:o.selected_id,s=i?Pa(r,i):`#/${r}`;t("goto view %s (id=%s)",r,i||""),window.location.hash!==s?window.location.hash=s:e.setState({view:r,selected_id:r==="worker"?null:o.selected_id})}}}var Sm=Object.freeze({workspace_config:{default_workspace:null}});function Zc(e){return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:Sm.workspace_config.default_workspace}}}function Jc(e={}){let t=Ut("state"),n={selected_id:e.selected_id??null,view:e.view??"board",filters:{status:e.filters?.status??"all",search:e.filters?.search??"",type:typeof e.filters?.type=="string"?e.filters?.type:""},board:{closed_filter:e.board?.closed_filter==="3"||e.board?.closed_filter==="7"||e.board?.closed_filter==="today"?e.board?.closed_filter:"today"},worker:{selected_parent_id:e.worker?.selected_parent_id??null,show_closed_children:Array.isArray(e.worker?.show_closed_children)?e.worker.show_closed_children:[]},workspace:{current:e.workspace?.current??null,available:e.workspace?.available??[],hidden:e.workspace?.hidden??[]},config:Zc(e.config)},r=new Set;function o(){for(let i of Array.from(r))try{i(n)}catch{}}return{getState(){return n},setState(i){let s={...n,...i,filters:{...n.filters,...i.filters||{}},board:{...n.board,...i.board||{}},worker:{...n.worker,...i.worker||{}},workspace:{current:i.workspace?.current!==void 0?i.workspace.current:n.workspace.current,available:i.workspace?.available!==void 0?i.workspace.available:n.workspace.available,hidden:i.workspace?.hidden!==void 0?i.workspace.hidden:n.workspace.hidden},config:i.config!==void 0?Zc(i.config):n.config},l=s.workspace.current?.path!==n.workspace.current?.path||s.workspace.available.length!==n.workspace.available.length||s.workspace.hidden.length!==n.workspace.hidden.length||s.workspace.hidden.some((u,d)=>u!==n.workspace.hidden[d]),a=s.config.workspace_config.default_workspace!==n.config.workspace_config.default_workspace;s.selected_id===n.selected_id&&s.view===n.view&&s.filters.status===n.filters.status&&s.filters.search===n.filters.search&&s.filters.type===n.filters.type&&s.board.closed_filter===n.board.closed_filter&&s.worker.selected_parent_id===n.worker.selected_parent_id&&s.worker.show_closed_children.length===n.worker.show_closed_children.length&&s.worker.show_closed_children.every((u,d)=>u===n.worker.show_closed_children[d])&&!l&&!a||(n=s,t("state change %o",{selected_id:n.selected_id,view:n.view,filters:n.filters,board:n.board,worker:n.worker,workspace:n.workspace.current?.path,config:{default_workspace:n.config.workspace_config.default_workspace}}),o())},subscribe(i){return r.add(i),()=>r.delete(i)}}}function eu(e){let t=Ut("activity"),n=0,r=new Map,o=1;function i(){if(!e)return;let u=n>0;e.toggleAttribute("hidden",!u),e.setAttribute("aria-busy",u?"true":"false")}function s(){n+=1,t("start count=%d",n),i()}function l(){let u=n;n=Math.max(0,n-1),u<=0?t("done called but count was already %d",u):t("done count=%d\u2192%d",u,n),i()}function a(u){return async(p,m)=>{let g=o++,k=Date.now();r.set(g,{type:p,start_ts:k}),t("request start id=%d type=%s count=%d",g,p,n+1),s();let T=!1,C=()=>{T||(T=!0,r.delete(g),l())},te=setTimeout(()=>{T||(t("request TIMEOUT id=%d type=%s elapsed=%dms",g,p,Date.now()-k),C())},3e4);try{let re=await u(p,m),X=Date.now()-k;return t("request done id=%d type=%s elapsed=%dms",g,p,X),re}catch(re){let X=Date.now()-k;throw t("request error id=%d type=%s elapsed=%dms err=%o",g,p,X,re),re}finally{clearTimeout(te),C()}}}return i(),{wrapSend:a,start:s,done:l,getCount:()=>n,getActiveRequests:()=>{let u=Date.now();return Array.from(r.entries()).map(([d,p])=>({id:d,type:p.type,elapsed_ms:u-p.start_ts}))}}}function ge(e,t="info",n=2800){let r=document.createElement("div");r.className="toast",r.textContent=e,r.style.position="fixed",r.style.right="12px",r.style.bottom="12px",r.style.zIndex="1000",r.style.color="#fff",r.style.padding="8px 10px",r.style.borderRadius="4px",r.style.fontSize="12px",t==="success"?r.style.background="#156d36":t==="warning"?r.style.background="#a36a00":t==="error"?r.style.background="#9f2011":r.style.background="rgba(0,0,0,0.85)",(document.body||document.documentElement).appendChild(r),setTimeout(()=>{try{r.remove()}catch{}},n)}function to(e=void 0,t=void 0){function n(){if(!t||typeof t.get!="function")return null;let i=t.get();return i&&i.order?i.order:{}}function r(i,s,l){let a=e&&e.snapshotFor?e.snapshotFor(i).slice():[];if(s==="closed")return a.sort(Wc),a;switch(l){case"created_desc":return a.sort(Do),a;case"created_asc":return a.sort(Fc),a;case"updated_desc":return a.sort(Bc),a;case"priority":return a.sort(Uc),a;case"manual":default:{let u=n();return u?a.sort(Kc(u)):a.sort(Do),a}}}function o(i){let s=[];return e&&typeof e.subscribe=="function"&&s.push(e.subscribe(i)),t&&typeof t.subscribe=="function"&&s.push(t.subscribe(i)),()=>{for(let l of s)try{l()}catch{}}}return{selectBoardColumn:r,subscribe:o}}function ur(e){if(!e)return null;if(typeof e=="number")return Number.isFinite(e)?e:null;let t=Date.parse(e);return Number.isFinite(t)?t:null}function on(e){let t=ur(e);if(t===null)return"";let n=new Date(t),r=o=>String(o).padStart(2,"0");return`${n.getFullYear()}-${r(n.getMonth()+1)}-${r(n.getDate())} ${r(n.getHours())}:${r(n.getMinutes())}`}function mn(e,t){let n=ur(e);if(n===null)return"";let o=(typeof t=="number"?t:Date.now())-n;if(o<6e4)return"\uBC29\uAE08";let i=Math.floor(o/6e4);if(i<60)return`${i}\uBD84 \uC804`;let s=Math.floor(o/36e5);if(s<24)return`${s}\uC2DC\uAC04 \uC804`;let l=Math.floor(o/864e5);if(l<7)return`${l}\uC77C \uC804`;let a=Math.floor(l/7);if(l<30)return`${a}\uC8FC \uC804`;let u=Math.floor(l/30);return u<12?`${u}\uAC1C\uC6D4 \uC804`:`${Math.floor(l/365)}\uB144 \uC804`}function tu(e){if(!Array.isArray(e))return null;let t=null,n=-1;for(let r of e){if(!r||r.status!=="in_progress")continue;let o=ur(r.updated_at)??0;if(t===null||o>n){t=r,n=o;continue}o===n&&String(r.id)<String(t.id)&&(t=r)}return t}function Ys(e){let t=e&&e.parent;return typeof t=="string"?t:t&&t.id?String(t.id):""}function Vs(e){let t=new Map;for(let r of e)r&&r.id&&!t.has(r.id)&&t.set(r.id,r);let n=new Map;for(let r of t.values()){let o=Ys(r);if(!o)continue;let i=n.get(o);i||(i=[],n.set(o,i)),i.push({id:r.id,title:r.title,status:r.status,metadata:r.metadata,workflow:r.workflow,created_at:r.created_at,updated_at:r.updated_at})}return n}function Qs(e,t){let n=e.get(t)||[],r=0;for(let i of n)(i.status==="resolved"||i.status==="closed")&&(r+=1);let o=tu(n);return{total:n.length,count:r,current:o,children:n}}function nu(e){let t=e.transport,n=e.uiOrderStore;function r(s,l){return"renormalize"in s?s.renormalize:[{bead_id:l,rank:s.rank}]}function o(s,l){let a={...s.order};for(let u of l)a[u.bead_id]=u.rank;n&&n.set({revision:s.revision,order:a})}async function i(s,l,a){if(!t||!n)return;let u=n.get()||{revision:0,order:{}},d=r(La(l,a,u.order),s);o(u,d);let p=await t("ui-order-set",{expected_revision:u.revision,entries:d});if(p&&p.conflict){let m={revision:typeof p.revision=="number"?p.revision:0,order:p.order||{}};n.set(m);let g=r(La(l,a,m.order),s);o(m,g);let k=await t("ui-order-set",{expected_revision:m.revision,entries:g});k&&k.applied&&n.set({revision:typeof k.revision=="number"?k.revision:0,order:k.order||{}})}else p&&p.applied&&n.set({revision:typeof p.revision=="number"?p.revision:0,order:p.order||{}})}return{applyReorder:i}}function ru(e){if(typeof e!="string")return"";let t=e.indexOf("-");return t>0?e.slice(0,t):""}function Zn(e,t){let n=ru(e),r=ru(t);return n.length===0||r.length===0?!1:n!==r}function Xs(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function Ma(e,t){return!t||typeof e!="string"||e.length===0||Xs(t.visible_labels).includes(e)?!0:Xs(t.hidden_labels).includes(e)?!1:!Xs(t.hidden_prefixes).some(n=>n.length>0&&e.startsWith(n))}function ou(e,t){return Xs(e).filter(n=>Ma(n,t))}function dr(e,t){let n=e&&e.chips?e.chips[t]:void 0;return typeof n=="boolean"?n:!0}function Em(e){switch(e){case"in_progress":return"board-card__dot board-card__dot--progress";case"resolved":return"board-card__dot board-card__dot--resolved";case"closed":return"board-card__dot board-card__dot--closed";case"blocked":return"board-card__dot board-card__dot--blocked";default:return"board-card__dot"}}function Tm(e,t,n,r,o){return c`<button
    type="button"
    class="board-card__roll-toggle"
    data-roll-parent=${e}
    aria-expanded=${r?"true":"false"}
    @click=${o}
  >
    children ${t}/${n} ${r?"\u25B4":"\u25BE"}
  </button>`}function Cm(e,t,n,r){return c`<button
    type="button"
    class="board-card__roll-child"
    data-child-id=${e.id}
    @click=${r?o=>r(o,e.id):void 0}
  >
    <span class=${Em(e.status)}>●</span>
    <span class="board-card__roll-child-ord">${t}</span>
    <span class="board-card__roll-child-title">${e.title||e.id}</span>
    ${n}
  </button>`}function Zs(e,t){let n=e.total||0,r=!!t.expanded,o=t.trailing??"",i=typeof t.empty_label=="string"&&t.empty_label.length>0?t.empty_label:null;if(n===0&&i===null)return"";let s=Array.isArray(e.children)?e.children:[],l=n>0?s.slice().sort(Hc):s;return c`
    <div class="board-card__roll">
      <div class="board-card__roll-meta">
        ${n>0?Tm(t.parent_id,e.count,n,r,t.onToggle):c`<span class="board-card__roll-none">${i}</span>`}
        ${o}
      </div>
      ${n>0&&e.current?c`<div class="board-card__roll-current">
            └
            <span class="board-card__cur-child"
              >● ${e.current.title||e.current.id}</span
            >
          </div>`:""}
      ${r&&n>0?c`<div class="board-card__roll-list">
            ${l.map((a,u)=>Cm(a,u+1,t.childChips?t.childChips(a):null,t.onChildClick))}
          </div>`:""}
    </div>
  `}var Rm={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"mrg",close:"mrg"},iu={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"merge",close:"close"},su={quick_fix:["impl","close"],spec_backed:["spec","impl","pr","merge"],full_plan:["spec","plan","impl","pr","merge"]},Om={review:"\u2713",skip:"\u2298"},pr={none:"\uBBF8\uB3C4\uB2EC",dim:"\uC9C4\uD589 \uC911",stale:"\uC7AC\uAC80\uD1A0 \uD544\uC694",review:"\uAC80\uD1A0 \uC644\uB8CC",skip:"\uAC80\uD1A0 \uC0DD\uB7B5",done:"\uC644\uB8CC"};function Im(e,t,n){if(!(n==="in_progress"||n==="resolved"))return null;for(let o of e){let i=t[o];if(i&&i.fill==="dim"&&i.stale!==!0)return o}return null}function au(e){let t=e&&e.fill||"none";return t==="none"?pr.none:e&&e.stale===!0?pr.stale:t==="dim"?pr.dim:e&&e.glyph==="review"?pr.review:e&&e.glyph==="skip"?pr.skip:pr.done}function Lm(e){if(!e||e.fill==="none"||!e.approval_state)return au(e);let t=[];return e.glyph==="review"?t.push(pr.review):e.glyph==="skip"&&t.push(pr.skip),e.approval_state==="missing"?t.push("\uC2B9\uC778 \uD544\uC694"):e.approval_state==="stale"?t.push("\uC7AC\uC2B9\uC778 \uD544\uC694"):e.approval_state==="unknown"?t.push("\uC2B9\uC778 \uD655\uC778 \uBD88\uAC00"):t.push("\uC2B9\uC778 \uC644\uB8CC"),t.join(" \xB7 ")}function Dm(e,t,n,r){let o=Rm[e]||e,i=t&&t.fill||"none",s=!!t&&t.stale===!0,l=Om[t&&t.glyph||""]||"",a="bar";i==="dim"?a+=` b-${o} dim`:i==="full"&&(a+=` b-${o} full`),s&&(a+=" stale"),n&&(a+=" cur");let u=i==="none"?"lbl":`lbl l-${o} on`,d=n?`color: var(--stage-${o}-on)`:"",p=iu[e]||e,m=r?lu(t):null;if(!m)return c`
      <div class="seg">
        <div class=${a} style=${d}>${l}</div>
        <div class=${u}>${p}</div>
      </div>
    `;let g=`${p} \uBB38\uC11C \uC5F4\uAE30 \xB7 ${m.path}`;return c`
    <button
      type="button"
      class="seg seg--doc"
      aria-label=${g}
      title=${g}
      @click=${k=>{k.preventDefault(),k.stopPropagation(),r(k,m,e)}}
    >
      <div class=${a} style=${d}>${l}</div>
      <div class=${u}>${p}</div>
    </button>
  `}function lu(e){let t=e?e.doc:null;return!t||typeof t.path!="string"||t.path.length===0?null:t}function Js(e,t,n={}){if(!e||!e.stages)return"";let r=n.onOpenDoc,o=su[e.route]||su.spec_backed,i=e.stages,s=Im(o,i,String(t||"open")),l=`\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uC9C4\uD589: ${o.map(u=>`${iu[u]||u} ${u==="plan"?Lm(i[u]||{}):au(i[u]||{})}`).join(" \xB7 ")}`,a=!!r&&o.some(u=>lu(i[u]||{})!==null);return c`
    <div
      class="stp"
      role=${a?"group":"img"}
      aria-label=${l}
    >
      ${o.map(u=>Dm(u,i[u]||{},u===s,r))}
    </div>
  `}function Pm(e){return typeof e!="number"||!Number.isFinite(e)?"":`P${Math.max(0,Math.min(4,e))}`}var cu=2;function uu(e){let t=e.slice(0,cu).join(", "),n=e.length-cu;return`\u26D3 blocked: ${t}${n>0?` +${n}`:""}`}function Mm(e,t){if(!t)return[];let n=[],r=Array.isArray(t.blockers)?t.blockers:[],o=[],i=[];for(let s of r)(Zn(e,s)?i:o).push(s);return o.length>0&&n.push(c`<span class="ctl-chip ctl-chip--blocked-dep"
        >${uu(o)}</span
      >`),i.length>0&&n.push(c`<span class="ctl-chip ctl-chip--blocked-foreign"
        >${uu(i)}</span
      >`),n}function qm(e){if(!e||typeof e!="object")return null;let t=e.awaiting_user;if(typeof t!="string")return null;let n=t.trim();return n.length===0?null:c`<span class="ctl-chip ctl-chip--blocked"
    >${`\u23F8 \uC0AC\uC6A9\uC790 \uB9AC\uBDF0 \uD544\uC694: ${n}`}</span
  >`}function qa(e){return e==="delegated"?"\uC704\uC784":e==="main"?"\uBA54\uC778":null}function ei(e){return e.effort?`${e.actor}:${e.effort}`:e.actor}function Jn(e){return`${e.kind}:${ei(e)}@${e.sha}`}function ti(e,t){if(!e)return null;let n=qa(e.kind),r=e.reason,o=e.kind==="delegated"?r===null:typeof r=="string"&&r.trim().length>0&&!/[\r\n]/.test(r);if(!n||!o)return null;let i=qa(t?.kind),s=i!==null&&t?.kind!==e.kind,l=`\uACC4\uD68D \xB7 ${n}${s?` \u2192 ${i}`:""}`,a=`planned_execution ${e.kind}${typeof r=="string"?`:${r}`:""}`,u=t?` \xB7 exec_receipt ${Jn(t)}`:"";return{kind:e.kind,label:l,title:`${a}${u}`}}function du(e,t){let n=ti(e,t);return n?c`<span
        class="ctl-chip ctl-chip--planned"
        data-kind=${n.kind}
        title=${n.title}
        >${n.label}</span
      >`:null}function Nm(e){if(!e)return null;let t=qa(e.kind);return t?c`<span
    class="ctl-chip ctl-chip--exec-receipt"
    title=${`exec_receipt ${Jn(e)}`}
    >${`\uC2E4\uD589 \xB7 ${t}`}</span
  >`:null}function jm(e,t){let n=t.policy||null,r=e.workflow&&e.workflow.chips||{},o=[];if(r.route&&dr(n,"route")){let l=r.route_source==="derived";o.push(c`<span
        class="ctl-chip ctl-chip--route${l?" is-derived":""}"
        title=${l?"route \uBBF8\uD540 (metadata unset)":"route"}
        >${l?"unset":r.route}</span
      >`)}if(r.fast_track&&dr(n,"fast_track")&&o.push(c`<span class="ctl-chip ctl-chip--ft">⚡ fast_track</span>`),r.pr&&dr(n,"pr")){let l=r.pr.number;o.push(c`<span class="ctl-chip ctl-chip--pr"
        >${`PR${l!=null?` #${l}`:""}`}</span
      >`)}let i=du(r.planned_execution,r.exec_receipt);if(i&&o.push(i),r.exec_receipt){let l=r.exec_receipt;o.push(c`<span
        class="ctl-chip ctl-chip--exec-receipt"
        title=${`exec_receipt ${Jn(l)}`}
        >${`exec ${l.kind==="delegated"?ei(l):`main:${l.actor}`} \xB7 ${l.sha.slice(0,7)}`}</span
      >`)}if(r.impl_entry){let l=r.impl_entry;o.push(c`<span
        class="ctl-chip ctl-chip--impl-entry"
        title=${`impl_entry ${l.actor}@${l.sha}`}
        >${`impl ${l.actor} \xB7 ${l.sha.slice(0,7)}`}</span
      >`)}for(let l of ou(e.labels,n))o.push(c`<span class="ctl-chip ctl-chip--label">${l}</span>`);if(e.from_id&&dr(n,"from")&&o.push(c`<button
        type="button"
        class="ctl-chip ctl-chip--from"
        title=${`\uCD9C\uCC98 ${e.from_id} \uC5F4\uAE30`}
        @click=${l=>{l.stopPropagation(),t.onFromChipClick&&t.onFromChipClick(l,String(e.from_id))}}
      >
        ↩ from ${e.from_id}
      </button>`),dr(n,"blocked")){let l=qm(e.metadata);l&&o.push(l),o.push(...Mm(e.id,e.blocked_info))}return t.cleanupFailureFor&&t.cleanupFailureFor(e.id)&&dr(n,"blocked")&&o.push(c`<span class="ctl-chip ctl-chip--cleanup">⚠ 정리 멈춤</span>`),o.length===0?"":c`<div class="board-card__chips">${o}</div>`}function Fm(e){let t=mn(e.created_at),n=mn(e.updated_at);return!t&&!n?"":c`<span class="board-card__times">
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
  </span>`}function Bm(e,t){let n=t.rollupFor?t.rollupFor(e.id):{total:0,count:0,current:null,children:[]};return Zs(n,{parent_id:e.id,expanded:t.isExpanded?t.isExpanded(e.id):!0,trailing:Fm(e),empty_label:"children \uC5C6\uC74C",childChips:Na,onToggle:r=>t.onRollupToggle&&t.onRollupToggle(r,e.id),onChildClick:(r,o)=>t.onChildClick&&t.onChildClick(r,o)})}function Na(e){let t=e?.workflow?.chips?.planned_execution,n=e?.workflow?.chips?.exec_receipt;return ti(t,n)?c`<span class="board-card__roll-child-chips">
    ${du(t,n)}
    ${Nm(n)}
  </span>`:null}function ni(e,t){let n=Pm(e.priority);return c`
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
      ${jm(e,t)}
      ${e.workflow&&dr(t.policy||null,"stepper")?Js(e.workflow,e.status,{onOpenDoc:t.onOpenDoc}):""}
      ${Bm(e,t)}
    </article>
  `}function no(e,t){let n=Array.isArray(e.items)?e.items.length:0,r=e.is_closed===!0;return c`
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
              ${$c.map(i=>c`<option
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
        ${e.items.map(i=>ni(i,t))}
      </div>
    </section>
  `}function pu(e,t,n){return c`
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
          ${e.items.length===0?c`<div class="deferred-popup__empty">Deferred 이슈 없음</div>`:e.items.map(r=>ni(r,t))}
        </div>
      </div>
    </dialog>
  `}var Um=[{value:"",label:"\uC6B0\uC120\uC21C\uC704"},{value:"0",label:"P0"},{value:"1",label:"P1"},{value:"2",label:"P2"},{value:"3",label:"P3"},{value:"4",label:"P4"}],Wm=[{value:"",label:"\uD0C0\uC785"},{value:"bug",label:"bug"},{value:"feature",label:"feature"},{value:"task",label:"task"},{value:"epic",label:"epic"},{value:"chore",label:"chore"}],zm=[{value:"created_desc",label:"\uC0DD\uC131 \uCD5C\uC2E0\uC21C"},{value:"created_asc",label:"\uC0DD\uC131 \uC624\uB798\uB41C\uC21C"},{value:"updated_desc",label:"\uC218\uC815 \uCD5C\uC2E0\uC21C"},{value:"priority",label:"\uC6B0\uC120\uC21C\uC704\uC21C"},{value:"manual",label:"\uC218\uB3D9(\uB4DC\uB798\uADF8)"}];function Hm(e,t,n){let r=e.labels.length,o=r>0?`\uB77C\uBCA8 ${r}`:"\uB77C\uBCA8";return c`
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
  `}function fu(e,t,n){return c`
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
        ${Um.map(r=>c`<option
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
        ${Wm.map(r=>c`<option
              value=${r.value}
              ?selected=${e.type===r.value}
            >
              ${r.label}
            </option>`)}
      </select>
      ${Hm(e,t,n)}
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
        ${zm.map(r=>c`<option
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
  `}var Km=200,Gm={"ready-col":"open","in-progress-col":"in_progress","resolved-col":"resolved","closed-col":"closed"},Ym=new Set(["blocked-col","ready-col","in-progress-col","resolved-col"]),_u="beads-ui.board.sort",mu=new Set(["created_desc","created_asc","updated_desc","priority","manual"]);function Vm(){try{let e=window.localStorage.getItem(_u);if(e&&mu.has(e))return e}catch{}return"created_desc"}function gu(e,t){let n=Ut("views:board"),r=t.gotoIssue,o=t.issueStores,i=t.transport,s=t.uiOrderStore,l=t.displayPolicyStore,a=t.workerQueueStore,u=t.onClosedRangeChange,d=t.onNewIssue,p=t.openDoc,m=t.closedRange||Ws,g=o?to(o,s):null,k=nu({transport:i,uiOrderStore:s}),T=[],C=[],te=[],re=[],X=[],D=[],O=!1,q=0,B=Vm(),K=new Map,F=new Map,N=new Map,Y=new Set,U={search:"",priority:"",type:"",labels:[]},ne=!1,ve=null;function Pe(ce){return String(ce.status||"open")==="open"}function H(ce){return String(ce.status||"open")==="open"}function ie(ce){let we=U.search.trim().toLowerCase(),Be=U.priority,Je=U.type,Ze=U.labels;return ce.filter(pt=>{if(we){let gt=String(pt.id||"").toLowerCase(),et=String(pt.title||"").toLowerCase();if(!gt.includes(we)&&!et.includes(we))return!1}if(Be!==""&&String(pt.priority)!==Be||Je!==""&&String(pt.issue_type||"")!==Je)return!1;if(Ze.length>0){let gt=Array.isArray(pt.labels)?pt.labels:[];if(!Ze.some(et=>gt.includes(et)))return!1}return!0})}function _e(){let ce=new Set;for(let we of[T,C,te,re,X,D])for(let Be of we){let Je=Array.isArray(Be.labels)?Be.labels:[];for(let Ze of Je)typeof Ze=="string"&&Ze.length>0&&ce.add(Ze)}return Array.from(ce).sort()}function Te(){return U.search.trim()!==""||U.priority!==""||U.type!==""||U.labels.length>0}function V(){try{if(g){let ce=g.selectBoardColumn("tab:board:in-progress","in_progress",B),we=g.selectBoardColumn("tab:board:blocked","blocked",B).filter(H),Be=new Set(ce.map(j=>j.id)),Je=g.selectBoardColumn("tab:board:ready","ready",B).filter(j=>Pe(j)&&!Be.has(j.id)),Ze=g.selectBoardColumn("tab:board:resolved","resolved",B),pt=g.selectBoardColumn("tab:board:deferred","deferred",B),gt=g.selectBoardColumn("tab:board:closed","closed").slice(0,Km),et=[...we,...Je,...ce,...Ze,...gt];le(et);let Ne=new Set;for(let j of et)j&&j.id&&!Ys(j)&&Ne.add(j.id);let S=!Te();T=S?Po(we,Ne):we,C=S?Po(Je,Ne):Je,te=S?Po(ce,Ne):ce,re=S?Po(Ze,Ne):Ze,X=pt,q=pt.length,D=S?Po(gt,Ne):gt,K=new Map;for(let j of T)K.set(j.id,"open");for(let j of C)K.set(j.id,"open");for(let j of te)K.set(j.id,"in_progress");for(let j of re)K.set(j.id,"resolved");for(let j of X)K.set(j.id,"deferred");for(let j of D)K.set(j.id,"closed");F=new Map;for(let j of T)F.set(j.id,"blocked-col");for(let j of C)F.set(j.id,"ready-col");for(let j of te)F.set(j.id,"in-progress-col");for(let j of re)F.set(j.id,"resolved-col");for(let j of D)F.set(j.id,"closed-col")}he()}catch{T=[],C=[],te=[],re=[],X=[],D=[],N=new Map,he()}}function le(ce){N=Vs(ce)}function Z(ce){return Qs(N,ce)}function be(ce){return!Y.has(ce)}function Oe(ce,we){ce.preventDefault(),ce.stopPropagation(),Y.has(we)?Y.delete(we):Y.add(we),he()}function ke(ce,we){ce.preventDefault(),ce.stopPropagation(),r(we)}function Ce(ce,we){ce.preventDefault(),ce.stopPropagation(),r(we)}function ot(ce,we){ve||r(we)}function st(ce,we){ce.preventDefault(),ce.stopPropagation(),Qm(we).then(Be=>{Be&&ge("\uBCF5\uC0AC\uB428","success",1200)})}function Q(ce,we){ve=we,ce.dataTransfer&&(ce.dataTransfer.setData("text/plain",we),ce.dataTransfer.effectAllowed="move"),ce.target.classList.add("board-card--dragging")}function oe(ce){ce.target.classList.remove("board-card--dragging"),Dt(),setTimeout(()=>{ve=null},0)}function se(ce){let we=String(ce.target.value||"");!we||we===m||(m=we,u&&u(we),he())}function pe(){return l?l.get():null}function Se(ce){let we=a?a.get():null,Be=we?we.cleanup_failed:null;if(!Be||typeof Be!="object"||Array.isArray(Be))return null;let Je=Be[ce];return!Je||typeof Je!="object"||Array.isArray(Je)?null:Je}let me={onCardClick:ot,onCopyId:st,onDragStart:Q,onDragEnd:oe,onClosedRangeChange:se,rollupFor:Z,isExpanded:be,onRollupToggle:Oe,onChildClick:ke,onFromChipClick:Ce,onOpenDoc:p?(ce,we)=>p(we):void 0,cleanupFailureFor:Se,get policy(){return pe()}};function Re(ce,we){ve||(We(),r(we))}function je(ce,we){ce.preventDefault(),ce.stopPropagation(),We(),r(we)}let Qe={...me,onCardClick:Re,onChildClick:je,onFromChipClick:je,onOpenDoc:p?(ce,we)=>{We(),p(we)}:void 0,get policy(){return pe()}};function Ue(ce){let we=ce.target,Be=e.querySelector(".board-filter__labels");we&&Be&&Be.contains(we)||qe()}function J(ce){ce.key==="Escape"&&qe()}function W(){ne||(ne=!0,document.addEventListener("mousedown",Ue),document.addEventListener("keydown",J),he())}function qe(){ne&&(ne=!1,document.removeEventListener("mousedown",Ue),document.removeEventListener("keydown",J),he())}function dt(ce){ce.key==="Escape"&&We()}function at(){O||(O=!0,document.addEventListener("keydown",dt),he())}function We(){O&&(O=!1,document.removeEventListener("keydown",dt),he())}let Xe={onClose:We,onOverlayClick(ce){ce.target===ce.currentTarget&&We()}},$={onSearchInput(ce){U.search=String(ce.target.value||""),V()},onPriorityChange(ce){U.priority=String(ce.target.value||""),V()},onTypeChange(ce){U.type=String(ce.target.value||""),V()},onSortChange(ce){let we=String(ce.target.value||"");if(!(!mu.has(we)||we===B)){B=we;try{window.localStorage.setItem(_u,we)}catch{}V()}},onDeferredToggle(){O?We():at()},onLabelMenuToggle(){ne?qe():W()},onLabelToggle(ce){let we=U.labels.indexOf(ce);we===-1?U.labels.push(ce):U.labels.splice(we,1),V()},onLabelClear(){U.labels.length!==0&&(U.labels=[],V())},onNewIssue(){d&&d()}};function G(){return c`
      <div class="board-view">
        ${fu(U,$,{sort_mode:B,deferred_popup_open:O,deferred_count:q,label_options:_e(),label_menu_open:ne})}
        <div class="board-root">
          ${no({title:"Blocked",id:"blocked-col",items:ie(T)},me)}
          ${no({title:"Ready",id:"ready-col",items:ie(C)},me)}
          ${no({title:"In progress",id:"in-progress-col",items:ie(te)},me)}
          ${no({title:"Resolved",id:"resolved-col",items:ie(re)},me)}
          ${no({title:"Closed",id:"closed-col",items:ie(D),is_closed:!0,closed_range:m},me)}
        </div>
        ${O?pu({items:ie(X),count:q},Qe,Xe):""}
      </div>
    `}function he(){ct(G(),e),Ke()}function Ke(){try{let ce=e.querySelector("#deferred-popup");ce&&!ce.open&&(typeof ce.showModal=="function"?ce.showModal():ce.setAttribute("open",""));let we=Array.from(e.querySelectorAll(".board-column, .deferred-popup__body"));for(let Be of we)Array.from(Be.querySelectorAll(".board-card")).forEach((Ze,pt)=>{Ze.tabIndex=pt===0?0:-1})}catch{}}async function it(ce,we){if(!i){ge("\uC5F0\uACB0\uB418\uC9C0 \uC54A\uC544 \uC0C1\uD0DC\uB97C \uBCC0\uACBD\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error");return}try{await i("update-status",{id:ce,status:we}),ge("\uC0C1\uD0DC \uBCC0\uACBD\uB428","success",1500)}catch(Be){n("update-status failed: %o",Be),ge("\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328","error")}}function ze(ce){switch(ce){case"blocked-col":return T;case"ready-col":return C;case"in-progress-col":return te;case"resolved-col":return re;default:return[]}}function Tt(ce,we,Be){if(!i||!s)return;let Je=ze(ce),Ze=Je.find(S=>S.id===we);if(!Ze)return;let pt=Je.filter(S=>S.id!==we),gt=Be.closest?Be.closest(".board-card"):null,et=pt.length;if(gt){let S=gt.getAttribute("data-issue-id");if(S===we)return;let j=pt.findIndex(z=>z.id===S);j>=0&&(et=j)}let Ne=pt.slice();Ne.splice(et,0,Ze),k.applyReorder(we,Ne,et)}function Dt(){for(let ce of Array.from(e.querySelectorAll(".board-column--drag-over")))ce.classList.remove("board-column--drag-over")}let nt=null;e.addEventListener("dragover",ce=>{ce.preventDefault(),ce.dataTransfer&&(ce.dataTransfer.dropEffect="move");let Be=ce.target.closest(".board-column");Be&&Be!==nt&&(nt&&nt.classList.remove("board-column--drag-over"),Be.classList.add("board-column--drag-over"),nt=Be)}),e.addEventListener("dragleave",ce=>{let we=ce.relatedTarget;(!we||!e.contains(we))&&nt&&(nt.classList.remove("board-column--drag-over"),nt=null)}),e.addEventListener("drop",ce=>{ce.preventDefault(),nt&&(nt.classList.remove("board-column--drag-over"),nt=null);let we=ce.target,Be=we.closest(".board-column");if(!Be)return;let Je=ce.dataTransfer?.getData("text/plain")||"";if(!Je)return;let Ze=Be.id,pt=F.get(Je);if(pt&&pt===Ze){if(Ym.has(Ze)){if(B!=="manual"){ge("\uC218\uB3D9(\uB4DC\uB798\uADF8) \uC815\uB82C \uBAA8\uB4DC\uC5D0\uC11C\uB9CC \uC21C\uC11C\uB97C \uBC14\uAFC0 \uC218 \uC788\uC2B5\uB2C8\uB2E4","warning",2e3);return}Tt(Ze,Je,we)}return}let gt=Gm[Ze];if(!gt){ge("\uC5EC\uAE30\uB85C\uB294 \uC62E\uAE38 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","warning",1500);return}K.get(Je)!==gt&&it(Je,gt)}),e.addEventListener("keydown",ce=>{let we=ce.target;if(!(we instanceof HTMLElement))return;let Be=String(we.tagName||"").toLowerCase();if(Be==="input"||Be==="textarea"||Be==="select"||Be==="button"||Be==="a"||we.isContentEditable===!0)return;let Je=we.closest(".board-card");if(!Je)return;let Ze=String(ce.key||"");if(Ze==="Enter"||Ze===" "){ce.preventDefault();let Ne=Je.getAttribute("data-issue-id");Ne&&r(Ne);return}if(Ze!=="ArrowUp"&&Ze!=="ArrowDown"&&Ze!=="ArrowLeft"&&Ze!=="ArrowRight")return;ce.preventDefault();let pt=Je.closest(".board-column");if(!pt)return;let gt=Array.from(pt.querySelectorAll(".board-card")),et=gt.indexOf(Je);if(Ze==="ArrowDown"&&et<gt.length-1){wt(Je,gt[et+1]);return}if(Ze==="ArrowUp"&&et>0){wt(Je,gt[et-1]);return}if(Ze==="ArrowLeft"||Ze==="ArrowRight"){let Ne=Array.from(e.querySelectorAll(".board-column")),S=Ne.indexOf(pt),j=Ze==="ArrowRight"?1:-1,z=S+j;for(;z>=0&&z<Ne.length;){let Ae=Ne[z].querySelector(".board-card");if(Ae){wt(Je,Ae);return}z+=j}}});function wt(ce,we){try{ce.tabIndex=-1,we.tabIndex=0,we.focus()}catch{}}let Mt=null;g&&g.subscribe&&(Mt=g.subscribe(()=>{try{V()}catch{}}));let Lt=null;l&&l.subscribe&&(Lt=l.subscribe(()=>{try{V()}catch{}}));let Bt=null;return a&&a.subscribe&&(Bt=a.subscribe(()=>{he()})),{async load(){n("load"),V()},clear(){qe(),We(),Mt&&(Mt(),Mt=null),Lt&&(Lt(),Lt=null),Bt&&(Bt(),Bt=null),e.replaceChildren(),T=[],C=[],te=[],re=[],X=[],D=[],K=new Map,F=new Map}}}function Po(e,t){return e.filter(n=>{let r=Ys(n);return!(r&&t.has(r))})}async function Qm(e){try{if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")return await navigator.clipboard.writeText(String(e)),!0;let t=document.createElement("textarea");t.value=String(e),t.style.position="fixed",t.style.left="-9999px",document.body.appendChild(t),t.select();let n=!1;try{n=document.execCommand("copy")}finally{t.remove()}return n}catch{return!1}}var dn=e=>e??Yt;function xn(e){return[typeof e.runner=="string"?e.runner:null,typeof e.model=="string"?e.model:null,typeof e.effort=="string"?e.effort:null,e.speed==="fast"?"Fast":null].filter(Boolean).join(" \xB7 ")}function Mo(e){return typeof e.resumed_from!="string"||e.resumed_from.length===0?null:`${e.continuation_mode==="session"?"session \uC774\uC5B4\uBC1B\uC74C":e.continuation_mode==="fresh"?"\uC0C8 session\uC73C\uB85C \uC774\uC5B4\uBC1B\uC74C":"\uC774\uC804 attempt\uC5D0\uC11C \uC774\uC5B4\uBC1B\uC74C"} (from ${e.resumed_from})`}async function gn(e){let t=String(e);if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")try{return await navigator.clipboard.writeText(t),!0}catch{}try{let n=document.createElement("textarea");n.value=t,n.style.position="fixed",n.style.left="-9999px",document.body.appendChild(n),n.select();let r=!1;try{r=document.execCommand("copy")}finally{n.remove()}return r}catch{return!1}}var Xm=["workflow_mode","spec_review_model","spec_review_effort","spec_review_speed","plan_review_model","plan_review_effort","plan_review_speed","impl_review_model","impl_review_effort","impl_review_speed","impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed","quick_fix_impl_dispatch","quick_fix_impl_runtime","quick_fix_impl_model","quick_fix_impl_effort","quick_fix_impl_speed","orchestration_model","orchestration_effort","orchestration_speed","quick_fix_orchestration_model","quick_fix_orchestration_effort","quick_fix_orchestration_speed"],vu=["orchestration_model","orchestration_effort","orchestration_speed"],ku=["quick_fix_orchestration_model","quick_fix_orchestration_effort","quick_fix_orchestration_speed"],Zm=[...vu,...ku],hu={quick_fix_impl_dispatch:"impl_dispatch",quick_fix_impl_runtime:"impl_runtime",quick_fix_impl_model:"impl_model",quick_fix_impl_effort:"impl_effort",quick_fix_impl_speed:"impl_speed",quick_fix_orchestration_model:"orchestration_model",quick_fix_orchestration_effort:"orchestration_effort",quick_fix_orchestration_speed:"orchestration_speed"},bu={spec_review_effort:"spec_review_model",plan_review_effort:"plan_review_model",impl_review_effort:"impl_review_model"},yu={spec_review_speed:"spec_review_model",plan_review_speed:"plan_review_model",impl_review_speed:"impl_review_model"},Jm=new Set(["native-fixed-posture","unsupported","claude-runner-model-default","catalog-validated","provider-tier-or-runtime-model-default","actual-effort"]);function tn(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function Rt(e){return typeof e=="string"&&e.length>0?e:null}function ro(e){return e.startsWith("gpt-")?e.slice(4):e}function mt(e,t,n,r,o){return{value:e,source:t,display:n,full_value:r,resolution:o}}function wu(e,t,n){let r=Rt(t[e]);if(r!==null)return{value:r,source:"pin"};let o=Rt(n[e]);return o===null?null:{value:o,source:"global"}}function fr(e,t,n,r){return wu(e,t,n)||{value:r,source:"base"}}function ja(e,t,n,r){let o=n?.implementation?.model_catalog;if(t&&tn(o?.[t])){let s=Rt(o[t][e]);if(s!==null)return s}if(t&&Array.isArray(o?.[t])&&o[t].includes(e))return e;if(!t&&tn(o)){for(let s of Object.values(o))if(tn(s)){let l=Rt(s[e]);if(l!==null)return l}else if(Array.isArray(s)&&s.includes(e))return e}let i=r?.model_index?.[e];return Rt(r?.runners?.[i]?.models?.[e]?.id)||e}function eg(e,t){return Rt(t?.review?.reviewers?.[e]?.model)||e}function Ln(e,t,n=!1){if(e==="default")return mt(e,t,`default (\uC77C\uBC18 \xB7 ${t==="pin"?"\uD540":"\uC804\uC5ED \uACE0\uC815"})`,e,"explicit");let r=n?ro(e):e;return mt(e,t,r,e,"explicit")}function $u(e,t,n){let r=t?.implementation?.model_catalog?.[e],o=[];tn(r)?o.push(...Object.keys(r)):Array.isArray(r)&&o.push(...r.filter(s=>typeof s=="string"));let i=n?.runners?.[e]?.models;if(tn(i))for(let s of Object.keys(i))o.includes(s)||o.push(s);return o}function tg(e,t){let n=[],r=e?.implementation?.model_catalog;tn(r)&&n.push(...Object.keys(r));let o=t?.runners;if(tn(o))for(let i of Object.keys(o))n.includes(i)||n.push(i);return n}function ng(e,t,n){if(e===null)return{runtime:null,offered:!1};let r=!1;for(let o of tg(t,n)){let i=$u(o,t,n);if(i.length>0&&(r=!0),i.includes(e))return{runtime:o,offered:!0}}return{runtime:null,offered:r}}function ri(e){return mt(e.value,e.source,`${e.value} (\uBE44\uD638\uD658)`,e.value,"incompatible")}function Fa(e,t,n){let r=wu(e,t,n);return r?Ln(r.value,r.source):mt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable")}function An(e){let t=tn(e.pin)?e.pin:{},n=tn(e.global)?e.global:{},r=tn(e.execution_defaults)?e.execution_defaults:null,o=r?.supported===!0&&tn(r.session)?r.session:null,i=r?.supported===!0&&tn(r.orchestration)?r.orchestration:null,s=tn(e.runner_catalog)?e.runner_catalog:null,l=Rt(n.quick_fix_impl_model),a=ng(l,o,s),u={};if(o){let d=fr("workflow_mode",t,n,Rt(o.workflow_mode_default));u.workflow_mode=d.source==="base"?mt(d.value,"base",d.value||"\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",d.value,"default"):Ln(d.value,d.source);for(let X of["spec_review","plan_review","impl_review"]){let D=`${X}_model`,O=Rt(X==="plan_review"?d.value==="fast_track"?o.plan_review?.fast_track_default:o.plan_review?.standard_recommended:o.review?.default),q=fr(D,t,n,O);if(q.value===null)u[D]=mt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable");else if(q.value!=="self"&&q.value!=="skip"&&!tn(o.review?.reviewers?.[q.value]))u[D]=ri(mt(q.value,q.source,"",null,"explicit"));else{let B=eg(q.value,o);u[D]=mt(q.value,q.source,ro(B),B,q.source==="base"?"default":"explicit")}}for(let[X,D]of Object.entries(bu)){let O=u[D].value;if(O==="self"||O==="skip"){u[X]=mt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable");continue}let q=Rt(o.review?.reviewers?.[O||""]?.effort),B=fr(X,t,n,q);u[X]=B.value===null?mt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"):mt(B.value,B.source,B.value,B.value,B.source==="base"?"default":"explicit")}for(let[X,D]of Object.entries(yu)){let O=u[D];if(O.resolution==="incompatible"||O.value==="self"||O.value==="skip"){u[X]=mt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable");continue}if(O.resolution==="unavailable"){u[X]=mt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable");continue}let q=fr(X,t,n,"default");u[X]=q.source==="base"?mt("default","base","default (\uC77C\uBC18)","default","default"):Ln(q.value,q.source)}let p=tn(o.implementation?.default)?o.implementation.default:{},m=Rt(e.route),g=m!==null&&["quick_fix","spec_backed","full_plan"].includes(m),k=tn(o.implementation?.route_defaults)?o.implementation.route_defaults:{},T=g&&tn(k[m])?k[m]:{},C={},te=!1;if(m==="quick_fix"){let X=Rt(t.impl_runtime),D=Rt(n.quick_fix_impl_runtime),O=X||D,q=O==="inherit"?Rt(e.controller_runtime):O;te=l!==null&&a.runtime!==null&&(O===null||q===a.runtime);let B=Rt(t.impl_dispatch),K=Rt(n.quick_fix_impl_dispatch);if(B!==null)u.impl_dispatch=Ln(B,"pin"),C.impl_dispatch="pin";else if(K!==null)u.impl_dispatch=Ln(K,"global"),C.impl_dispatch="quick_fix";else if(te)u.impl_dispatch=mt("delegated","global","\uC704\uC784 (\uBAA8\uB378 \uD568\uC758)","delegated","explicit"),C.impl_dispatch="implied";else{let F=Rt(T.dispatch)||Rt(p.dispatch);u.impl_dispatch=F?mt(F,"base",F,F,"default"):mt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"),C.impl_dispatch="base"}if(X!==null)u.impl_runtime=Ln(X,"pin"),C.impl_runtime="pin";else if(D!==null)u.impl_runtime=Ln(D,"global"),C.impl_runtime="quick_fix";else if(te){let F=a.runtime;u.impl_runtime=mt(F,"global",`${F} (\uC720\uB3C4)`,F,"explicit"),C.impl_runtime="derived"}else{let F=fr("impl_runtime",{},n,Rt(p.runtime));u.impl_runtime=F.value===null?mt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"):mt(F.value,F.source,F.value,F.value,F.source==="base"?"default":"explicit"),C.impl_runtime=F.source}for(let F of["impl_model","impl_effort","impl_speed"]){let N=Rt(t[F]),Y=Rt(n[`quick_fix_${F}`]),U;N!==null?(U={value:N,source:"pin"},C[F]="pin"):F==="impl_model"&&te&&l!==null?(U={value:l,source:"global"},C[F]="quick_fix"):F!=="impl_model"&&Y!==null?(U={value:Y,source:"global"},C[F]="quick_fix"):(U=fr(F,{},n,Rt(p[F.replace("impl_","")])),C[F]=U.source),u[F]=U.value===null?mt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"):mt(U.value,U.source,U.value,U.value,U.source==="base"?"default":"explicit")}}else for(let X of["impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"]){let D=fr(X,t,n,X==="impl_dispatch"?Rt(T.dispatch)||Rt(p.dispatch):Rt(p[X.replace("impl_","")]));u[X]=D.value===null?mt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"):mt(D.value,D.source,D.value,D.value,D.source==="base"?"default":"explicit")}let re=u.impl_dispatch.value==="main";if(re?u.impl_dispatch.display=C.impl_dispatch==="quick_fix"?"\uBA54\uC778 (quick_fix)":"\uBA54\uC778":u.impl_dispatch.value==="delegated"&&(C.impl_dispatch==="quick_fix"?u.impl_dispatch.display="\uC704\uC784 (quick_fix)":C.impl_dispatch!=="implied"&&(u.impl_dispatch.display="\uC704\uC784")),u.impl_runtime.value==="inherit"&&(u.impl_runtime.display=e.controller_runtime?`inherit (${e.controller_runtime})`:"inherit (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_runtime.resolution="dynamic"),u.impl_model.value!==null){let X=u.impl_runtime.value==="inherit"?Rt(e.controller_runtime):u.impl_runtime.value,D=X?$u(X,o,s):[];m==="quick_fix"&&C.impl_model==="base"&&C.impl_runtime!=="base"&&D.length>0&&!D.includes(u.impl_model.value)&&(u.impl_model=mt("auto","base","auto","auto","default"));let O=u.impl_model.value;if(O!=="auto"&&D.length>0&&!D.includes(O))u.impl_model=ri(u.impl_model);else{let q=ja(O,X,o,s);u.impl_model.display=ro(q),u.impl_model.full_value=q,C.impl_model==="quick_fix"&&(u.impl_model.display=`${u.impl_model.display} (quick_fix)`)}}if(u.impl_effort.value==="auto"){let X=Rt(e.transport)||(u.impl_runtime.value==="codex"?"codex-native-spawn":u.impl_runtime.value==="claude"?"implement-claude":null),D=X?Rt(o.implementation?.effort_by_transport?.[X]?.auto):null;D&&!Jm.has(D)?(u.impl_effort.display=`${D} (\uBE44\uD638\uD658)`,u.impl_effort.full_value=D,u.impl_effort.resolution="incompatible"):(u.impl_effort.display="auto (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_effort.resolution="dynamic")}C.impl_effort==="quick_fix"&&u.impl_effort.value!==null&&(u.impl_effort=mt(u.impl_effort.value,"global",`${u.impl_effort.value} (quick_fix)`,u.impl_effort.value,"explicit")),u.impl_speed.value==="default"&&(u.impl_speed=C.impl_speed==="quick_fix"?mt("default","global","default (quick_fix)","default","explicit"):u.impl_speed.source==="base"?mt("default","base","default (\uC77C\uBC18)","default","default"):Ln("default",u.impl_speed.source));for(let X of["impl_runtime","impl_effort","impl_speed"])C[X]==="quick_fix"&&u[X].value!==null&&!u[X].display.endsWith("(quick_fix)")&&(u[X].display=`${u[X].display} (quick_fix)`);if(m==="quick_fix"){l!==null&&!te&&a.offered&&(u.quick_fix_impl_model=ri(mt(l,"global","",l,"explicit")));for(let[X,D]of Object.entries(hu))!X.startsWith("quick_fix_orchestration_")&&!Object.hasOwn(u,X)&&(u[X]={...u[D]});u.impl_dispatch.source==="base"&&u.impl_dispatch.value==="main"&&(u.quick_fix_impl_dispatch=mt("main","base","\uBA54\uC778 (\uD558\uB124\uC2A4)","main","default"))}if(re)for(let X of["impl_runtime","impl_model","impl_effort","impl_speed"])u[X]=mt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable")}else for(let d of Xm.filter(p=>!Zm.includes(p)))u[d]=Fa(d,t,n);if(!o){for(let[d,p]of Object.entries(bu))(u[p].value==="self"||u[p].value==="skip")&&(u[d]=mt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable"));for(let[d,p]of Object.entries(yu))(u[p].value==="self"||u[p].value==="skip")&&(u[d]=mt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable"));if(u.impl_dispatch.value==="main"){u.impl_dispatch.display="\uBA54\uC778";for(let d of["impl_runtime","impl_model","impl_effort","impl_speed"])u[d]=mt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable")}else u.impl_dispatch.value==="delegated"&&(u.impl_dispatch.display="\uC704\uC784"),u.impl_runtime.value==="inherit"&&(u.impl_runtime.display=e.controller_runtime?`inherit (${e.controller_runtime})`:"inherit (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_runtime.resolution="dynamic"),u.impl_effort.value==="auto"&&(u.impl_effort.display="auto (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_effort.resolution="dynamic")}for(let d of vu){if(!i){u[d]=Fa(d,t,n);continue}let p=d.replace("orchestration_",""),m=Rt(i[p]),g=`quick_fix_${d}`,k=e.route==="quick_fix"?Rt(n[g]):null,T=Rt(t[d]),C=T!==null?{value:T,source:"pin"}:k!==null?{value:k,source:"global"}:fr(d,{},n,m),te=T===null&&k!==null;if(d==="orchestration_effort"&&C.source==="base"){u[d]=mt(null,"base","CLI \uAE30\uBCF8 (\uBBF8\uC9C0\uC815)",null,"default");continue}if(C.value===null){u[d]=mt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable");continue}if(d==="orchestration_model"){let re=C.source==="base"?Rt(i.model_id)||C.value:ja(C.value,null,o,s);u[d]=mt(C.value,C.source,`${ro(re)}${te?" (quick_fix)":""}`,re,C.source==="base"?"default":"explicit");continue}if(C.value==="default"){u[d]=te?mt("default","global","default (quick_fix)","default","explicit"):C.source==="base"?mt("default","base","default (\uC77C\uBC18)","default","default"):Ln("default",C.source);continue}u[d]=te?mt(C.value,"global",`${C.value} (quick_fix)`,C.value,"explicit"):Ln(C.value,C.source)}for(let d of ku){let p=hu[d];u[d]=u[p]?{...u[p]}:Fa(d,t,n)}if(o&&e.route!=="quick_fix")if(l===null){let d=u.orchestration_model.full_value;u.quick_fix_impl_model=mt(null,"base",d===null?"\uBA54\uC778":`\uBA54\uC778 (orchestration ${ro(d)})`,null,"default")}else if(a.runtime!==null){let d=ja(l,a.runtime,o,s);u.quick_fix_impl_model=mt(l,"global",ro(d),d,"explicit")}else a.offered?u.quick_fix_impl_model=ri(mt(l,"global","",null,"explicit")):u.quick_fix_impl_model=Ln(l,"global");return u}function rg(e,t){let n=t&&e.value==="default"?"default (\uC77C\uBC18)":e.display;if(!t||e.source==="pin")return`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 ${e.display}`;let r=e.source==="global"?"\uC804\uC5ED":"harness";return`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 ${n} (${r})`}function oi(e){let t=tn(e.pin)?e.pin:{},n=tn(e.global)?e.global:{},r=tn(e.resolution_global)?{...e.resolution_global}:{};delete r[e.key];let o=p=>{let m={...r,...p};return An({pin:e.layer==="pin"?m:t,global:e.layer==="pin"?n:m,execution_defaults:e.execution_defaults,runner_catalog:e.runner_catalog,route:e.route,controller_runtime:e.controller_runtime})},i=e.layer==="pin"?t:n,s={...i};delete s[e.key];let l=o(s)[e.key],a=o(i)[e.key],u=Rt(i[e.key]),d=[...e.choices];return u!==null&&!d.includes(u)&&d.unshift(u),{unset_label:rg(l,e.layer==="pin"),full_value:l.full_value,unavailable:l.resolution==="unavailable",disabled:a?.resolution==="not_applicable",options:d.map(p=>{let m=o({...i,[e.key]:p})[e.key];return{value:p,label:m.display,full_value:m.full_value}})}}function og(e,t=document){let n=t.createElement("dialog");n.className="op-dialog continuation-dialog";let r=t.createElement("button"),o=t.createElement("button"),i=t.createElement("button"),s=t.createElement("h2"),l=t.createElement("p"),a=t.createElement("div");return a.className="op-dialog__actions",s.textContent="\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4",l.textContent=`${xn(e.prior||{})||"\uC774\uC804 \uC124\uC815"} \u2192 ${xn(e.current||{})||"\uD604\uC7AC \uC124\uC815"}`,r.type="button",r.className="op-btn",r.textContent="\uAE30\uC874 session \uC774\uC5B4\uD558\uAE30",r.disabled=e.prior_available===!1,o.type="button",o.className="op-btn",o.textContent="\uD604\uC7AC preset\uC73C\uB85C \uC0C8 session",i.type="button",i.className="op-btn",i.textContent="\uCDE8\uC18C",a.append(r,o,i),n.append(s,l,a),t.body.append(n),new Promise(u=>{let d=p=>{typeof n.close=="function"&&n.close(),n.remove(),u(p)};r.addEventListener("click",()=>d("prior_session")),o.addEventListener("click",()=>d("fresh_current")),i.addEventListener("click",()=>d(null)),n.addEventListener("cancel",p=>{p.preventDefault(),d(null)}),typeof n.showModal=="function"?n.showModal():n.setAttribute("open","")})}async function _r(e,t,n={}){let r=e;for(n.onResult?.(r);r?.continuation_mismatch;){let o=r.continuation_mismatch,i=await og(o);if(i===null)return r;r=await t(i,o.decision_token),n.onResult?.(r),r?.conflict&&n.refresh&&(r=await n.refresh(r),n.onResult?.(r))}return r}function xu(e,t=document){let n=e?.kind==="settlement",r=t.createElement("dialog");r.className="op-dialog resume-instructions-dialog";let o=t.createElement("h2"),i=t.createElement("textarea"),s=t.createElement("div"),l=t.createElement("button"),a=t.createElement("button"),u=[e?.bead_id,e?.tuple].filter(d=>typeof d=="string"&&d!=="").join(" \xB7 ");if(o.textContent=n?"\uCC29\uC9C0 \uC815\uC0B0 \uC7AC\uAC1C":"\uC138\uC158 \uC774\uC5B4\uD558\uAE30",i.placeholder="\uCD94\uAC00 \uC9C0\uCE68 (\uC120\uD0DD) \u2014 \uBE44\uC6CC\uB450\uBA74 \uAE30\uBCF8 \uC808\uCC28\uB85C \uC7AC\uAC1C",i.maxLength=4e3,s.className="op-dialog__actions resume-instructions-dialog__actions",l.type="button",l.className="op-btn op-btn--primary",l.textContent=n?"\uC815\uC0B0 \uC7AC\uAC1C":"\uC774\uC5B4\uD558\uAE30",a.type="button",a.className="op-btn",a.textContent="\uCDE8\uC18C",s.append(l,a),r.append(o),u!==""){let d=t.createElement("p");d.className="resume-instructions-dialog__target",d.textContent=u,r.append(d)}return r.append(i,s),t.body.append(r),new Promise(d=>{let p=!1,m=k=>{p||(p=!0,typeof r.close=="function"&&r.close(),r.remove(),d(k))},g=()=>m(i.value.trim());l.addEventListener("click",g),a.addEventListener("click",()=>m(null)),i.addEventListener("keydown",k=>{k.key==="Enter"&&(k.ctrlKey||k.metaKey)&&(k.preventDefault(),g())}),r.addEventListener("cancel",k=>{k.preventDefault(),m(null)}),typeof r.showModal=="function"?r.showModal():r.setAttribute("open",""),i.focus()})}async function oo(e){let{context:t,transport:n,adopt:r}=e,o=await xu(t);if(o===null)return null;let i=o===""?{}:{instructions:o},s=await n({...i});if(r?.(s),s&&s.conflict&&(s=await n({...i}),r?.(s)),s=await _r(s,(l,a)=>n({...i,continuation:l,decision_token:a}),{onResult:r,refresh:()=>n({...i})}),s&&s.resumed===!1&&!s.conflict&&s.reason){let l=t?.kind==="settlement"?"\uC815\uC0B0 \uC7AC\uAC1C":"\uC774\uC5B4\uD558\uAE30";ge(`${l} \uAC70\uBD80: ${s.reason}`,"error",2400)}return s}function Ba(e){return`session:${e.provider}:${e.session_id}`}function qo(e){return`${e.provider} \xB7 ${e.session_id.slice(0,8)}`}function sg(e,t){return e.current&&t==="in_progress"&&e.locality==="local"?"running":"done"}function so(e,t,n,r){return{attempt_id:Ba(e),session_ref:{bead_id:t,provider:e.provider,session_id:e.session_id},...typeof r=="string"&&r.length>0?{root_dir:r}:{},hide_prompt:!0,meta:{runner:e.provider,label:qo(e),session_id:e.session_id,...typeof e.resume_command=="string"&&e.resume_command.length>0?{resume_command:e.resume_command}:{},status:sg(e,n)}}}var Ua="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4",ig="\uBD84\uD574 \uC5C6\uC74C \u2014 \uCD1D\uB7C9\uB9CC \uBCF4\uACE0\uB428",Au="\uBD84\uD574 \uC5C6\uB294 leg";function Vt(e){return typeof e=="number"&&Number.isFinite(e)?e:0}var Hn=["input_tokens","output_tokens","cache_read_input_tokens","cache_creation_input_tokens"],io=[...Hn,"reasoning_output_tokens"],ag={codex:["implementation","review-consult"],claude:["subagent"]};function Wa(e){return!e||typeof e!="object"?!1:Number.isFinite(e.total_tokens)&&!Hn.some(t=>Number.isFinite(e[t]))}function lg(e){return!e||typeof e!="object"?!1:io.some(t=>Number.isFinite(e[t]))}function za(e){let t=0;for(let n of Hn)t+=Vt(e?.[n]);return t}function cg(e){return!e||typeof e!="object"?!1:Hn.some(t=>Number.isFinite(e[t]))}function Su(e){return!e||typeof e!="object"?!1:io.some(t=>Number.isFinite(e[t]))||Number.isFinite(e.total_tokens)}function ug(e){let t={};for(let n of io)e&&Number.isFinite(e[n])&&(t[n]=e[n]);return t}function Eu(e){let t={};for(let n of io)Number.isFinite(e[n])&&(t[n]=e[n]);return Number.isFinite(e.total_tokens)&&(t.total_tokens=e.total_tokens),e.replayed===!0&&(t.replayed=!0),typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&(t.total_cost_usd=e.total_cost_usd),t}function Tu(e,t){return Wa(t)?Vt(t.total_tokens):e==="codex"?Vt(t.input_tokens)+Vt(t.output_tokens):za(t)}function dg(e){return e==="claude"?"Claude":"Codex"}function pg(e){return`\u03C4 ${Ru(e)}`}function fg(e,t){let n=t.breakdown||{},r=Vt(t.total_only_subtotal);if(Wa(n)||r>0&&!lg(n)){let u=[`\uCD1D ${t.subtotal.toLocaleString("en-US")}`,ig];return t.replayed&&u.push(Ua),u.join(`
`)}let o=[`\uC785\uB825 ${Vt(n.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${Vt(n.output_tokens).toLocaleString("en-US")}`];e==="claude"?o.push(`\uCE90\uC2DC\uC77D\uAE30 ${Vt(n.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${Vt(n.cache_creation_input_tokens).toLocaleString("en-US")}`):(o.push(`\uCE90\uC2DC\uC77D\uAE30 ${Vt(n.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC4F0\uAE30 ${Vt(n.cache_creation_input_tokens).toLocaleString("en-US")}`),Number.isFinite(n.reasoning_output_tokens)&&o.push(`\uCD94\uB860\uCD9C\uB825 ${Vt(n.reasoning_output_tokens).toLocaleString("en-US")}`)),r>0&&o.push(`${Au} ${r.toLocaleString("en-US")}`);let i=e==="claude"?"\uC785\uB825 + \uCD9C\uB825 + \uCE90\uC2DC\uC77D\uAE30 + \uCE90\uC2DC\uC0DD\uC131":"\uC785\uB825 + \uCD9C\uB825",s=r>0?`${i} + ${Au}`:i,a=[e==="claude"?`Claude subtotal = ${s}`:`Codex subtotal = ${s}; \uCE90\uC2DC\uC77D\uAE30\xB7\uCE90\uC2DC\uC4F0\uAE30\xB7\uCD94\uB860\uCD9C\uB825\uC740 subtotal\uC5D0 \uD3EC\uD568\uB418\uC9C0 \uC54A\uB294 subset`,`\uCD1D ${t.subtotal.toLocaleString("en-US")}`,o.join(" \xB7 ")];return typeof t.total_cost_usd=="number"&&Number.isFinite(t.total_cost_usd)&&a.push(`$${t.total_cost_usd.toFixed(2)}`),t.replayed&&a.push(Ua),a.join(`
`)}function ln(e){let t=[];if(!e||typeof e!="object"||!("providers"in e)||!e.providers)return t;for(let n of["claude","codex"]){let r=e.providers[n];r&&t.push({provider:n,label:`${dg(n)} ${pg(r.subtotal)}${typeof r.total_cost_usd=="number"&&Number.isFinite(r.total_cost_usd)?` \xB7 $${r.total_cost_usd.toFixed(2)}`:""}`,tooltip:fg(n,r)})}return t}function ii(e){let t={},n={claude:!0,codex:!1},r={claude:0,codex:0};for(let o of e)if(!(!o||!o.providers))for(let i of["claude","codex"]){let s=o.providers[i];if(!s)continue;let l=t[i];l||(l={subtotal:0,breakdown:{}},t[i]=l),l.subtotal+=s.subtotal,Number.isFinite(s.total_only_subtotal)&&(l.total_only_subtotal=Vt(l.total_only_subtotal)+Vt(s.total_only_subtotal));for(let a of io)Number.isFinite(s.breakdown[a])&&(l.breakdown[a]=Vt(l.breakdown[a])+Vt(s.breakdown[a]));s.replayed&&(l.replayed=!0),i==="claude"&&(typeof s.total_cost_usd=="number"&&Number.isFinite(s.total_cost_usd)?r.claude+=s.total_cost_usd:n.claude=!1)}return t.claude&&n.claude&&(t.claude.total_cost_usd=r.claude),Object.keys(t).length===0?null:{providers:t,roles:{}}}function Ha(e){return!e||typeof e!="object"?null:tr({attempt:{...e,bead_id:"__attempt__"}},"__attempt__")}function _g(e){return e==="codex"?"codex":"claude"}function zn(){return{subtotal:0,breakdown:ug(null),total_only:0,legs:[],replayed:!1,outer_count:0,outer_cost:0,outer_cost_count:0}}function si(e,t,n){e.subtotal+=t.subtotal,Wa(t.usage)&&(e.total_only+=t.subtotal);for(let r of io)Number.isFinite(t.usage[r])&&(e.breakdown[r]=Vt(e.breakdown[r])+Vt(t.usage[r]));e.legs.push(t),t.replayed===!0&&(e.replayed=!0),n&&(e.outer_count+=1,typeof t.usage.total_cost_usd=="number"&&Number.isFinite(t.usage.total_cost_usd)&&(e.outer_cost+=t.usage.total_cost_usd,e.outer_cost_count+=1))}function Cu(e,t){let n={subtotal:e.subtotal,breakdown:e.breakdown};return e.total_only>0&&(n.total_only_subtotal=e.total_only),t&&(n.legs=e.legs),e.replayed&&(n.replayed=!0),n}function Ru(e){return e>=1e6?`${(e/1e6).toFixed(1)}M`:e>=1e3?`${(e/1e3).toFixed(1)}k`:String(e)}function ao(e){return cg(e)?`\u03C4 ${Ru(za(e))}`:null}function er(e){let t=ao(e);if(!t)return null;let n=e?.total_cost_usd;return typeof n=="number"&&Number.isFinite(n)?`${t} \xB7 $${n.toFixed(2)}`:t}function No(e){if(!e||typeof e!="object")return"";let t=[`\uC785\uB825 ${Vt(e.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${Vt(e.output_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC77D\uAE30 ${Vt(e.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${Vt(e.cache_creation_input_tokens).toLocaleString("en-US")}`];typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&t.push(`$${e.total_cost_usd.toFixed(2)}`);let n=[`\uCD1D ${za(e).toLocaleString("en-US")}`,t.join(" \xB7 ")];return e.replayed&&n.push(Ua),n.join(`
`)}function tr(e,t){let n={claude:zn(),codex:zn()},r={orchestrator:{claude:zn(),codex:zn()},implementation:{claude:zn(),codex:zn()},"review-consult":{claude:zn(),codex:zn()},subagent:{claude:zn(),codex:zn()}},o=new Set;for(let l of Object.values(e||{})){if(!l||l.bead_id!==t)continue;let a=l.usage;if(Su(a)){let d=_g(l.runner),p=Eu(a),m={provider:d,role:"orchestrator",attempt_id:String(l.attempt_id||""),usage:p,subtotal:Tu(d,p)};p.replayed===!0&&(m.replayed=!0),typeof l.model=="string"&&(m.model=l.model),typeof l.session_id=="string"&&(m.session_id=l.session_id),si(n[d],m,!0),si(r.orchestrator[d],m,!0)}let u=Array.isArray(l.usage_legs)?l.usage_legs:[];for(let d of u){let p=d&&d.provider==="claude"?"claude":"codex";if(!d||d.provider!=="codex"&&d.provider!=="claude"||!ag[p].includes(d.role)||!Su(d.usage))continue;let m=typeof d.receipt_id=="string"&&d.receipt_id.length>0?d.receipt_id:null;if(!m||o.has(m))continue;o.add(m);let g=Eu(d.usage),k={provider:p,role:d.role,attempt_id:String(l.attempt_id||""),usage:g,subtotal:Tu(p,g)};k.receipt_id=m,typeof d.agent_type=="string"&&(k.agent_type=d.agent_type),typeof d.agent_id=="string"&&(k.agent_id=d.agent_id),typeof d.model=="string"&&(k.model=d.model),typeof d.effort=="string"&&d.effort.trim().length>0&&(k.effort=d.effort),typeof d.session_id=="string"?k.session_id=d.session_id:typeof d.thread_id=="string"&&(k.session_id=d.thread_id),typeof d.turn_id=="string"&&(k.turn_id=d.turn_id),(typeof d.completed_at=="string"||typeof d.completed_at=="number"&&Number.isFinite(d.completed_at))&&(k.completed_at=d.completed_at),g.replayed===!0&&(k.replayed=!0),si(n[p],k,!1),si(r[k.role][p],k,!1)}}let i={};for(let l of["claude","codex"]){let a=n[l];if(a.legs.length===0)continue;let u=Cu(a,!1);l==="claude"&&a.outer_count>0&&a.outer_cost_count===a.outer_count&&(u.total_cost_usd=a.outer_cost),i[l]=u}if(Object.keys(i).length===0)return null;let s={};for(let l of["orchestrator","implementation","review-consult","subagent"]){let a={};for(let u of["claude","codex"]){let d=r[l][u];d.legs.length>0&&(a[u]={...Cu(d,!0),legs:d.legs})}Object.keys(a).length>0&&(s[l]=a)}return{providers:i,roles:s}}var mg=".chip-popover, .judgement-chip";function lo(e){let t=null,n=!1;function r(d){return t!==null&&t.bead_id===d.bead_id&&t.chip_key===d.chip_key}function o(d){t=r(d)?null:{...d},e()}function i(){t!==null&&(t=null,e())}function s(d){let p=d.target;t!==null&&(p&&typeof p.closest=="function"&&p.closest(mg)||i())}function l(d){d.key==="Escape"&&i()}function a(){n||(n=!0,document.addEventListener("click",s),document.addEventListener("keydown",l))}function u(){n&&(n=!1,document.removeEventListener("click",s),document.removeEventListener("keydown",l))}return{toggle:o,close:i,isOpen:r,attach:a,detach:u}}function co(e){return c`<div
    class="chip-popover"
    role="dialog"
    aria-label=${e.title}
  >
    <div class="chip-popover__title">${e.title}</div>
    <ul class="chip-popover__lines">
      ${e.lines.map(t=>c`<li>${t}</li>`)}
    </ul>
  </div>`}var Ou={running:3,paused:2,failed:1};function nr(e){if(!e||typeof e!="object")return!1;let t=e.kind;return t==null||t==="implementation"}function Iu(e){let t=Object.values(e||{}),n=new Map;for(let r of t){if(!r||typeof r.bead_id!="string"||r.bead_id.length===0||r.kind!=="review_session"||r.status!=="running")continue;let o=typeof r.started_at=="number"?r.started_at:null,i=n.get(r.bead_id);i&&(i.started_at??0)>(o??0)||n.set(r.bead_id,{attempt:r,origin:r.origin==="click"||r.origin==="auto"?r.origin:null,started_at:o})}return n}function Lu(e,t){let n=Object.values(e||{}),r=new Set,o=new Map;for(let s of n)!s||typeof s.bead_id!="string"||(typeof s.resumed_from=="string"&&s.resumed_from.length>0&&r.add(s.resumed_from),nr(s)&&o.set(s.bead_id,s.attempt_id));let i=new Map;for(let s of n){if(!s||typeof s.bead_id!="string"||s.bead_id.length===0||!nr(s))continue;let l=null;if(s.status==="running")l="running";else if(s.status==="paused"&&!r.has(s.attempt_id))l="paused";else if(s.status==="failed"||s.status==="orphaned"){let d=t.get(s.bead_id),p=typeof d=="number"&&d>0&&typeof s.finished_at=="number"&&d>=s.finished_at;o.get(s.bead_id)===s.attempt_id&&!p&&typeof s.dismissed_at!="number"&&(l="failed")}if(!l)continue;let a=typeof s.started_at=="number"?s.started_at:null,u=i.get(s.bead_id);if(u){let d=Ou[u.run_state],p=Ou[l];if(d>p||d===p&&(u.started_at??0)>(a??0))continue}i.set(s.bead_id,{attempt:s,run_state:l,started_at:a})}return{winners:i,resumed_from_ids:r}}var ai=["workflow_mode","spec_review_model","spec_review_effort","spec_review_speed","plan_review_model","plan_review_effort","plan_review_speed","impl_review_model","impl_review_effort","impl_review_speed","impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"],gg=["quick_fix_impl_dispatch","quick_fix_impl_runtime","quick_fix_impl_model","quick_fix_impl_effort","quick_fix_impl_speed"],jo=[...ai.filter(e=>e!=="impl_dispatch"),...gg,"base_sync_accept_local_commits","bdui_url"],Du=["base_sync_accept_local_commits"],Fo="true";function li(e){let t={};if(!pn(e))return t;for(let[n,r]of Object.entries(e)){if(Du.includes(n)){r===!0&&(t[n]=Fo);continue}typeof r=="string"&&(t[n]=r)}return t}function Pu(e){let t;try{t=new URL(e)}catch{return!1}return(t.protocol==="http:"||t.protocol==="https:")&&e===t.origin}var Dn=["orchestration_model","orchestration_effort","orchestration_speed"],uo=["quick_fix_orchestration_model","quick_fix_orchestration_effort","quick_fix_orchestration_speed"],Ka=Object.freeze({orchestration_model:"quick_fix_orchestration_model",orchestration_effort:"quick_fix_orchestration_effort",orchestration_speed:"quick_fix_orchestration_speed",impl_dispatch:"quick_fix_impl_dispatch",impl_runtime:"quick_fix_impl_runtime",impl_model:"quick_fix_impl_model",impl_effort:"quick_fix_impl_effort",impl_speed:"quick_fix_impl_speed"}),po=[...ai,...Dn],hg=jo.filter(e=>po.includes(e));function bg(e,t){let n={},r=[];for(let[i,s]of Object.entries(Ka)){let l=e[i];if(!Object.hasOwn(e,i)){n[s]=null;continue}let a=t[s];if(typeof l!="string"||!Array.isArray(a)||!a.includes(l)){n[s]=null,r.push(`lane_incompatible:${s}`);continue}n[s]=l}let o=Object.keys(e).filter(i=>!Object.hasOwn(Ka,i));return{values:n,warnings:r,skipped_keys:o}}var Bo=["delegated","main"],ci=["inherit","claude","codex"],Kn=["default","fast"],Uo=["standard","fast_track"],Wo=["codex","opus","fable","self","skip"],ui=["codex","fable","skip"],di=["low","medium","high","xhigh"],Mu=["default","fast"],wn="auto";function pn(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function qu(e){if(!pn(e)||!pn(e.runners))return[];let t=[];for(let[n,r]of Object.entries(e.runners))pn(r)&&pn(r.models)&&t.push([n,Object.keys(r.models)]);return t}function fo(e,t){let n=qu(e),r=t&&t!=="inherit"?n.filter(([o])=>o===t):n;return[wn,...r.flatMap(([,o])=>o)]}function Nu(e,t,n,r){if(!pn(e)||!pn(e.runners))return[wn];let o=[];for(let[i,s]of Object.entries(e.runners))if(!(!pn(s)||!pn(s.models))&&!(t&&t!=="inherit"&&i!==t))for(let[l,a]of Object.entries(s.models)){if(n&&n!==wn&&l!==n)continue;let u=r(s,a);if(Array.isArray(u))for(let d of u)typeof d=="string"&&!o.includes(d)&&o.push(d)}return[wn,...o]}function Pr(e,t,n){return Nu(e,t,n,(r,o)=>pn(o)&&Array.isArray(o.efforts)?o.efforts:r.efforts)}function pi(e,t,n){return Nu(e,t,n,(r,o)=>pn(o)&&Array.isArray(o.orchestration_efforts)?o.orchestration_efforts:pn(o)&&Array.isArray(o.efforts)?o.efforts:r.efforts)}function _o(e,t){let n=qu(e);return(t?n.filter(([o])=>o===t):n).flatMap(([,o])=>o)}function ju(e,t,n){let r={impl_runtime:e?.impl_runtime,impl_model:e?.impl_model,impl_effort:e?.impl_effort},o=r.impl_runtime==="claude"||r.impl_runtime==="codex"?r.impl_runtime:r.impl_runtime==="inherit"?n:null;return o&&(r.impl_model&&!fo(t,o).includes(r.impl_model)&&(r.impl_model=void 0),r.impl_effort&&!Pr(t,o,r.impl_model||wn).includes(r.impl_effort)&&(r.impl_effort=void 0)),r}var yg={workflow_mode:"\uC6CC\uD06C\uD50C\uB85C \uBAA8\uB4DC",spec_review_model:"\uC2A4\uD399 \uB9AC\uBDF0\uC5B4",spec_review_effort:"\uC2A4\uD399 \uB9AC\uBDF0 effort",spec_review_speed:"\uC2A4\uD399 \uB9AC\uBDF0 \uC18D\uB3C4",plan_review_model:"\uACC4\uD68D \uB9AC\uBDF0\uC5B4",plan_review_effort:"\uACC4\uD68D \uB9AC\uBDF0 effort",plan_review_speed:"\uACC4\uD68D \uB9AC\uBDF0 \uC18D\uB3C4",impl_review_model:"\uAD6C\uD604 \uB9AC\uBDF0\uC5B4",impl_review_effort:"\uAD6C\uD604 \uB9AC\uBDF0 effort",impl_review_speed:"\uAD6C\uD604 \uB9AC\uBDF0 \uC18D\uB3C4",impl_runtime:"\uC704\uC784 \uB300\uC0C1",impl_model:"\uAD6C\uD604 \uBAA8\uB378",impl_effort:"\uAD6C\uD604 effort",impl_speed:"\uAD6C\uD604 \uC18D\uB3C4",orchestration_model:"\uC6CC\uCEE4 \uBAA8\uB378",orchestration_effort:"\uC6CC\uCEE4 effort",orchestration_speed:"\uC6CC\uCEE4 \uC18D\uB3C4"},vg={quick_fix_orchestration_model:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uBAA8\uB378",quick_fix_orchestration_effort:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 effort",quick_fix_orchestration_speed:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uC18D\uB3C4",quick_fix_impl_dispatch:"\uC2E4\uD589 \uBC29\uC2DD",quick_fix_impl_runtime:"\uC704\uC784 \uB300\uC0C1",quick_fix_impl_model:"\uBAA8\uB378",quick_fix_impl_effort:"effort",quick_fix_impl_speed:"\uC18D\uB3C4"},Ga=[...hg,...Dn],kg=[...po,...jo].filter((e,t,n)=>n.indexOf(e)===t&&!Ga.includes(e));function Fu(e,t){let n=pn(e)?e:{},r=pn(t)?t:{},o=[];for(let s of Ga){let l=n[s]??null,a=r[s]??null;l!==a&&o.push({key:s,label:yg[s]||s,before:l,after:a,kind:l===null?"added":a===null?"removed":"changed"})}let i=[];for(let s of[...kg,...Object.keys(r)])!Ga.includes(s)&&!i.includes(s)&&Object.hasOwn(r,s)&&i.push(s);return{rows:o,ignored_keys:i}}function Bu(e,t,n){let r=pn(e)?e:{},o=bg(pn(t)?t:{},n),i=[];for(let s of Object.values(Ka)){let l=r[s]??null,a=o.values[s]??null;l!==a&&i.push({key:s,label:vg[s]||s,before:l,after:a,kind:l===null?"added":a===null?"removed":"changed"})}return{rows:i,ignored_keys:o.skipped_keys}}function Ya(e,t,n,r,o,i,s=null){return oi({key:e,choices:t,layer:"global",global:n,resolution_global:i,execution_defaults:r,runner_catalog:o,route:s})}function Uu(e,t){let n={};for(let r of jo){let o=e?.[r],i=t?.[r];if(o!==i){if(Du.includes(r)){n[r]=i===Fo?!0:null;continue}n[r]=typeof i=="string"&&i.length>0?i:null}}return n}function Wu(e,t){let n={};for(let r of[...Dn,...uo]){let o=e?.[r]??null,i=t?.[r]??null;o!==i&&(n[r]=typeof i=="string"&&i.length>0?i:null)}return n}var Va=[{id:"workflow",label:"\uC6CC\uD06C\uD50C\uB85C\uC6B0",keys:["workflow_mode"]},{id:"review",label:"\uB9AC\uBDF0",keys:["spec_review_model","spec_review_effort","spec_review_speed","plan_review_model","plan_review_effort","plan_review_speed","impl_review_model","impl_review_effort","impl_review_speed"]},{id:"implementation",label:"\uAD6C\uD604",keys:["impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"]},{id:"worker",label:"Worker",keys:[...Dn]}],mr={workflow_mode:"\uBAA8\uB4DC",spec_review_model:"\uC0AC\uC591 \uB9AC\uBDF0",spec_review_effort:"\uC0AC\uC591 \uB9AC\uBDF0 effort",spec_review_speed:"\uC0AC\uC591 \uB9AC\uBDF0 \uC18D\uB3C4",plan_review_model:"\uACC4\uD68D \uB9AC\uBDF0",plan_review_effort:"\uACC4\uD68D \uB9AC\uBDF0 effort",plan_review_speed:"\uACC4\uD68D \uB9AC\uBDF0 \uC18D\uB3C4",impl_review_model:"\uAD6C\uD604 \uB9AC\uBDF0",impl_review_effort:"\uAD6C\uD604 \uB9AC\uBDF0 effort",impl_review_speed:"\uAD6C\uD604 \uB9AC\uBDF0 \uC18D\uB3C4",impl_dispatch:"\uC2E4\uD589 \uBC29\uC2DD",impl_runtime:"\uC704\uC784 \uB300\uC0C1",impl_model:"\uBAA8\uB378",impl_effort:"effort",impl_speed:"\uC18D\uB3C4",orchestration_model:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uBAA8\uB378",orchestration_effort:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 effort",orchestration_speed:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uC18D\uB3C4"},fi={pin:"\uD540",global:"\uC804\uC5ED",base:"\uAE30\uBCF8"};function Qa(e,t,n,r,o,i=null){let s=An({pin:t,global:n,execution_defaults:r,runner_catalog:o,route:t&&typeof t.route=="string"?t.route:null,controller_runtime:i});return e.map(l=>({key:l,...s[l]}))}function zu(e,t,n,r,o,i=null){let s={pin:0,global:0,base:0};for(let l of Qa(e,t,n,r,o,i))s[l.source]+=1;return s}function Hu(e,t,n){return{id:e,key:t,value:typeof n=="string"?n:""}}function Ku(e,t,n){return typeof t!="string"||t.length===0?null:{id:e,preset_id:t,expected_revision:n}}var _x=[...ai,...Dn];var Gu=["orchestration_model","orchestration_effort","orchestration_speed","spec_review_model","spec_review_effort","spec_review_speed","plan_review_model","plan_review_effort","plan_review_speed","impl_review_model","impl_review_effort","impl_review_speed","impl_runtime","impl_model","impl_effort"];function zo(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function _i(e){if(!zo(e)||!zo(e.runners))return null;let t=Object.entries(e.runners).filter(([,n])=>zo(n)&&zo(n.models));return t.length>0?t:null}function Pn(e,t){let n=_i(e);if(!n||!t)return null;for(let[r,o]of n)if(Object.hasOwn(o.models,t))return r;return null}function Yu(e,t){return zo(t)&&Array.isArray(t.efforts)?t.efforts.slice():Array.isArray(e.efforts)?e.efforts.slice():[]}function Vu(e,t){let n=_i(e);if(!n||!t)return[];for(let[,r]of n)if(Object.hasOwn(r.models,t))return Yu(r,r.models[t]);return[]}function wg(e){let t=_i(e);if(!t)return[];let n=[];for(let[,r]of t)for(let o of Object.values(r.models))for(let i of Yu(r,o))n.includes(i)||n.push(i);return n}function $g(e,t){if(!t)return wg(e);let r=_i(e)?.find(([i])=>i===t)?.[1];if(!r)return[];let o=[];for(let i of Object.keys(r.models))for(let s of Vu(e,i))o.includes(s)||o.push(s);return o}function Qu(e,t,n){let r={impl_runtime:e.impl_runtime||"",impl_model:e.impl_model||"",impl_effort:e.impl_effort||""},o=r.impl_runtime==="inherit"?n:r.impl_runtime==="claude"||r.impl_runtime==="codex"?r.impl_runtime:null;if(r.impl_runtime==="inherit"&&!o)return r.impl_model="",r.impl_effort="",r;let i=Pn(t,r.impl_model);if(r.impl_model&&(!o||i!==o))return r.impl_model="",r.impl_effort="",r;let s=r.impl_model?Vu(t,r.impl_model):$g(t,o);return r.impl_effort&&s.length>0&&!s.includes(r.impl_effort)&&(r.impl_effort=""),r}var Xa=new Set(["unavailable","not_applicable"]);function gr(e,t){if(typeof e!="object"||e===null)return null;let n=e[t];return typeof n=="object"&&n!==null?n:null}function Xu(e){return e.filter(t=>t!==null).join(" \xB7 ")}function hr(e,t){return t===null?null:`${mr[e]}: ${t.display} (${fi[t.source]})`}function Za(e){return e.filter(t=>t!==null).join(`
`)}function Ja(e){if(typeof e!="object"||e===null)return null;let t=xn(e);if(t==="")return null;let n=(r,o)=>typeof o=="string"&&o.length>0?`${r}: ${o}`:null;return{text:t,title:Za(["\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \u2014 \uC774 attempt\uC5D0 \uAE30\uB85D\uB41C \uC2E4\uD589\uAC12",n("runner",e.runner),n(mr.orchestration_model,e.model),n(mr.orchestration_effort,e.effort),n(mr.orchestration_speed,e.speed)])}}function mo(e,t){let n=gr(e,"orchestration_model");if(n===null||n.resolution==="unavailable")return null;let r=gr(e,"orchestration_effort"),o=gr(e,"orchestration_speed"),i=Xu([Pn(t,n.value??""),n.display,r!==null&&r.value!==null?r.display:null,o!==null&&o.value==="fast"?"Fast":null]);return i===""?null:{text:i,title:Za(["\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \u2014 \uD604\uC7AC \uD574\uC11D\uAC12 (\uD540 > \uD050 \uAE30\uBCF8\uAC12)",hr("orchestration_model",n),hr("orchestration_effort",r),hr("orchestration_speed",o)])}}function xg(e,t){return e===null||e.value===null||Xa.has(e.resolution)?null:e.value!=="inherit"?e.value:t?`inherit\u2192${t}`:"inherit"}function Ag(e){return e===null||Xa.has(e.resolution)?null:e.value==="auto"?"auto":e.display}function Sg(e){return e===null?null:e.value==="auto"?"auto":Xa.has(e.resolution)?null:e.display}function Mr(e,t){if(typeof e!="object"||e===null)return null;let n=gr(e,"impl_dispatch"),r=gr(e,"impl_runtime"),o=gr(e,"impl_model"),i=gr(e,"impl_effort"),s=gr(e,"impl_speed"),l=n!==null&&n.value==="main"?"\uBA54\uC778":Xu([xg(r,t??null),Ag(o),Sg(i),s!==null&&s.value==="fast"?"Fast":null]);return l===""?null:{text:l,title:Za(["\uC6CC\uCEE4(\uAD6C\uD604 \uC704\uC784) \u2014 \uD604\uC7AC \uD574\uC11D\uAC12 (\uD540 > \uC804\uC5ED kv > \uAE30\uBCF8). \uC2E4\uD589 \uC911\uC774\uBA74 \uC138\uC158\uC774 \uC2DC\uC791 \uC2DC \uACE0\uC815\uD55C \uAC12\uACFC \uB2E4\uB97C \uC218 \uC788\uC74C",hr("impl_dispatch",n),hr("impl_runtime",r),hr("impl_model",o),hr("impl_effort",i),hr("impl_speed",s)])}}var Eg=Object.freeze(new Set(["push_not_contained","invalid_impl_review","premature_close","head_mismatch","foreign_deploy_unsupported","not_resolved"])),Tg=Object.freeze(["delivery_unproven:"]);function mi(e){let t=e&&typeof e.reason=="string"?e.reason:"";if(t.length===0||Eg.has(t))return"session";for(let n of Tg)if(t.startsWith(n))return"session";return"settlement"}var Cg=["hard_diagnosis","invariant_reasoning","verification_by_judgment","claude_bound"];var Rg={hard_diagnosis:"\uC6D0\uC778\uC774 \uBD88\uBA85\uD655\uD558\uAC70\uB098 \uC7AC\uD604\uC774 \uBD88\uC548\uC815\uD574 \uAC00\uC124-\uAC80\uC99D \uB8E8\uD504\uAC00 \uD544\uC694\uD558\uB2E4",invariant_reasoning:"\uC815\uD569\uC131\uC774 \uC0C1\uD0DC\uAE30\uACC4\xB7\uB3D9\uC2DC\uC131\xB7\uBD88\uBCC0\uC2DD \uCD94\uB860\uC5D0 \uB2EC\uB824 \uC788\uB2E4",verification_by_judgment:"\uD14C\uC2A4\uD2B8\uAC00 \uBABB \uC7A1\uACE0 \uB9AC\uBDF0\uC5B4\uC758 \uCD94\uB860\uC73C\uB85C\uB9CC \uAC80\uC99D\uD560 \uC218 \uC788\uB2E4",claude_bound:"Claude \uC138\uC158 \uC790\uC0B0\xB7\uC758\uBBF8\uB860\uC5D0 \uAC15\uD558\uAC8C \uBB36\uC5EC \uC788\uB2E4"};function el(e){return(e&&Array.isArray(e.reasons)?e.reasons:[]).map(n=>Rg[n]||"").filter(n=>n.length>0)}var Zu={orchestration_model:["fable"],impl_runtime:["claude"]},tl={unapplied:"\uBBF8\uC801\uC6A9",applied:"\uC801\uC6A9\uB428",diverged:"\uCD94\uCC9C\uACFC \uB2E4\uB984"};function Ju(e){return typeof e=="object"&&e!==null?e:null}function ed(e,t){return typeof e=="string"&&t.includes(e)?e:""}function Og(e){return typeof e!="string"?[]:e.split("+").map(t=>t.trim()).filter(t=>Cg.includes(t))}function Ho(e,t=e){let n=Ju(e);if(!n)return null;let r=ed(n.rec_orchestration_model,Zu.orchestration_model);if(r.length===0)return null;let o=ed(n.rec_impl_runtime,Zu.impl_runtime),i={orchestration_model:r};o.length>0&&(i.impl_runtime=o);let s=Ju(t)||{},l=Object.keys(i),a=0,u=0;for(let p of l){let m=s[p];typeof m=="string"&&m.length>0&&(a+=1,m===i[p]&&(u+=1))}let d=a===0?"unapplied":u===l.length?"applied":"diverged";return{reasons:Og(n.rec_reason),rec:i,state:d}}function gi(e){if(!e||typeof e!="object")return"";let t=el(e),n=tl[e.state]||"",r=["\uBCF5\uC7A1\uD55C \uC791\uC5C5\uC73C\uB85C \uD310\uC815\uB428"];return t.length>0&&r.push(`\uC0AC\uC720: ${t.join(" \xB7 ")}`),n.length>0&&r.push(`\uC0C1\uD0DC: ${n}`),r.join(`
`)}function hi(e){return e.replace(/\/+$/,"")}function Ig(e,t){let n=hi(e),r=hi(t);return n===r||r.startsWith(`${n}/`)||n.startsWith(`${r}/`)}function bi(e,t){let n=new Set;for(let r of e)for(let o of t){if(!Ig(r,o))continue;let i=hi(r),s=hi(o);n.add(i.length>=s.length?i:s)}return[...n].sort()}function nl(e,t){return`${e}\0${t}`}function td(e){let t=new Map;for(let n of Array.isArray(e?.running)?e.running:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"running",state:"running"});for(let n of Array.isArray(e?.pr_wait)?e.pr_wait:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"pr_wait",state:"pr_wait"});for(let n of Array.isArray(e?.queue_groups)?e.queue_groups:[]){let r=Array.isArray(n.sublanes?.parallel)?n.sublanes.parallel:Array.isArray(n.items)?n.items:[];for(let o of r)t.set(o.id,{root_dir:o.root_dir,workspace_name:o.workspace_name,lane:"parallel",position:o.queue_position});for(let o of Array.isArray(n.sublanes?.serial)?n.sublanes.serial:[])for(let i of o.items)t.set(i.id,{root_dir:i.root_dir,workspace_name:i.workspace_name,lane:o.id,position:i.queue_position})}for(let n of Array.isArray(e?.runnable)?e.runnable:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"runnable",state:"runnable"});for(let n of Array.isArray(e?.done)?e.done:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"done",state:"done"});return t}function Go(e,t){let n=Array.isArray(t)?t:[],r=e.indexOf("-"),o=r>0?e.slice(0,r):e;return n.some(i=>typeof i?.issue_prefix=="string"&&i.issue_prefix===o)?"internal":n.length>0&&n.every(i=>typeof i?.issue_prefix=="string")?"external":"unknown"}function Ko(e){if(e.state==="running")return"\uC2E4\uD589\uC911";if(e.state==="pr_wait")return"PR \uB300\uAE30";if(e.state==="runnable")return"\uC2E4\uD589\uAC00\uB2A5";if(e.state==="done")return"\uC644\uB8CC";let t=e.lane==="parallel"?"\uBCD1\uB82C":e.lane;return`${e.workspace_name} \xB7 ${t} #${e.position}`}function nd(e,t,n,r){let o=n.get(e);if(!!(o&&t&&o.root_dir===t.root_dir&&o.lane===t.lane&&typeof o.position=="number"&&typeof t.position=="number"&&o.position<t.position))return{id:e,label:`\u{1F512} ${e} (\uAC19\uC740 \uB808\uC778 \uC55E)`,location_label:"\uAC19\uC740 \uB808\uC778 \uC55E",scope:null,same_lane_ahead:!0};if(o)return{id:e,label:`\u{1F512} ${e} (${Ko(o)})`,location_label:Ko(o),scope:null,same_lane_ahead:!1};let s=Go(e,r),l=s==="internal"?"\uBBF8\uC801\uC7AC":s==="external"?"\uC678\uBD80":"\uC704\uCE58 \uBBF8\uD655\uC778";return{id:e,label:`\u{1F512} ${e} (${l})`,location_label:l,scope:s,same_lane_ahead:!1}}function rd(e){let t=Array.isArray(e)?e:[],n=new Map,r=new Map,o=new Map;for(let l of t)for(let a of Array.isArray(l.sublanes?.serial)?l.sublanes.serial:[]){let u=nl(l.root_dir,a.id);n.set(u,{root_dir:l.root_dir,workspace_name:l.name,lane:a.id}),o.set(u,[]);for(let d of Array.isArray(a.items)?a.items:[])r.set(d.id,u)}for(let l of t)for(let a of Array.isArray(l.sublanes?.serial)?l.sublanes.serial:[]){let u=nl(l.root_dir,a.id),d=Array.isArray(a.items)?a.items[0]:null,m=!!d&&d.queue_index===0&&(!Array.isArray(a.occupied_by)||a.occupied_by.length===0)&&Array.isArray(d.blocked_by)?d.blocked_by:[],g=o.get(u);if(g)for(let k of m){let T=r.get(k);T&&T!==u&&!g.includes(T)&&g.push(T)}}let i=(l,a)=>{let u=new Set,d=[l];for(;d.length>0;){let p=d.pop();if(p===a)return!0;!p||u.has(p)||(u.add(p),d.push(...o.get(p)||[]))}return!1},s=new Map;for(let[l,a]of o){let u=[];for(let d of a){let p=n.get(d);i(d,l)&&p&&u.push(p)}u.length>0&&s.set(l,u)}return s}function od(e,t){return nl(e,t)}var Lg=Object.freeze(["done","abandoned"]);function sd(e){return!e||typeof e!="object"||Array.isArray(e)?!1:typeof e.phase=="string"&&!Lg.includes(e.phase)}async function Dg(e){let t=await gn(e);ge(t?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",t?"success":"error",1200)}function qr(e){return typeof e!="string"||e.length===0?"":c`<span class="worker-ev__copyline"
    ><code class="worker-ev__path">${e}</code
    ><button
      type="button"
      class="worker-ev__copy"
      data-seam="log-path-copy"
      title="로그 경로 복사"
      aria-label=${`\uB85C\uADF8 \uACBD\uB85C \uBCF5\uC0AC: ${e}`}
      @click=${()=>{Dg(e)}}
    >
      ⧉
    </button></span
  >`}var id=Object.freeze(["spec_backed","full_plan","quick_fix"]);var Pg="worker-ineligible";function Yo(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function ad(e){return Yo(e).includes(Pg)}var Mg=new Set(id),ld=new WeakMap;function go(e){return e&&typeof e=="object"?e:{}}function qg(e){let t=ld.get(e);if(t)return t;let n=ud(e);return ld.set(e,n),n}function yi(e,t){return(Array.isArray(e)?e:[]).findIndex(r=>r&&r.bead_id===t)}function Ng(e,t){if(e.length===0)return null;if(qg(t).has(e))return{lane:"running"};if(yi(t.pr_wait,e)>=0)return{lane:"pr_wait"};let n=yi(t.queue,e);if(n>=0)return{lane:"parallel",index:n};for(let r of Array.isArray(t.serial_lanes)?t.serial_lanes:[]){if(!r||typeof r.id!="string"||!/^s[1-5]$/.test(r.id))continue;let o=yi(r.entries,e);if(o>=0)return{lane:r.id,index:o}}return yi(t.done,e)>=0?{lane:"done"}:null}function rl(e,t){let n=Mg.has(e.route),r=e.route==="quick_fix";return{placeable:n&&!e.worker_ineligible&&!e.awaiting_user&&(r?e.has_description:e.spec==="published")&&t===null,route_ok:n,worker_ineligible:e.worker_ineligible,awaiting_user:e.awaiting_user,missing_description:r&&!e.has_description,spec:e.spec,location:t}}function Vo(e,t){let n=go(e),r=go(t),o=Jr(n),i=n.workflow?.route_source==="explicit"&&typeof n.workflow.route=="string"&&n.workflow.route||(typeof go(n.metadata).route=="string"?go(n.metadata).route:""),s=i==="quick_fix",l=!Object.hasOwn(n,"description")||typeof n.description=="string"&&n.description.trim().length>0,a=Object.hasOwn(n,"labels")&&ad(n.labels),u=Object.hasOwn(go(n.metadata),"awaiting_user"),d=Ng(typeof n.id=="string"?n.id:"",r);return rl({route:i,spec:s?"n/a":o.conflict?"conflict":o.evidence,has_description:l,awaiting_user:u,worker_ineligible:a},d)}function Nr(e){let t=e.location;if(t)switch(t.lane){case"running":return"\uC2E4\uD589 \uC911\uC774\uB77C \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4";case"pr_wait":return"PR \uB300\uAE30 \uC911\uC774\uB77C \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4";case"done":return"\uC644\uB8CC \uB808\uC778\uC5D0 \uC788\uC5B4 \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4";case"parallel":return`\uC774\uBBF8 \uB300\uAE30 \uC911 \xB7 \uBCD1\uB82C #${t.index+1}`;default:return`\uC774\uBBF8 \uB300\uAE30 \uC911 \xB7 \uC9C1\uB82C ${t.lane.slice(1)} #${t.index+1}`}return e.placeable?"\uB300\uAE30 \uD050 \uB9E8 \uB4A4\uC5D0 \uCD94\uAC00":e.route_ok===!1?"route\uAC00 \uC815\uD574\uC9C0\uC9C0 \uC54A\uC544 \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":e.worker_ineligible?"worker-ineligible label\uB85C \uC6CC\uCEE4\uC5D0\uC11C \uC2E4\uD589\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":e.awaiting_user?"\uC0AC\uC6A9\uC790 \uB9AC\uBDF0\uB97C \uAE30\uB2E4\uB9AC\uB294 \uC911\uC774\uB77C \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":e.missing_description?"description\uC774 \uC5C6\uC5B4 \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":e.spec==="conflict"?"spec \uACBD\uB85C\uAC00 \uCDA9\uB3CC\uD574 \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"spec\uC774 \uBC1C\uD589\uB418\uC9C0 \uC54A\uC544 \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"}function Qo(e){let t=go(e),n=typeof t.serial_lane_count=="number"&&Number.isInteger(t.serial_lane_count)&&t.serial_lane_count>0?Math.min(t.serial_lane_count,5):0,r=Array.isArray(t.serial_lanes)?t.serial_lanes:[],o=[];for(let s of r){if(o.length>=n)break;!s||typeof s.id!="string"||!/^s[1-5]$/.test(s.id)||!Array.isArray(s.entries)||o.push({id:s.id,label:`\uC9C1\uB82C ${s.id.slice(1)}`,count:s.entries.length})}return o.length===0?null:[{id:"parallel",label:"\uBCD1\uB82C",count:(Array.isArray(t.queue)?t.queue:[]).length},...o]}function cd(e){return/^s[1-5]$/.test(e)?`\uC9C1\uB82C ${e.slice(1)}`:"\uBCD1\uB82C"}function wi(e){return typeof e=="string"&&e.length>=7?e.slice(0,7):"\u2014"}function fd(e){return e==="session"?"bead\uAC00 in_progress\uB85C \uC7A1\uD78C \uB4A4 \uB2EB\uD788\uAE30\uAE4C\uC9C0\uC758 \uACBD\uACFC":"attempt \uC2E4\uD589 \uC2DC\uAC04 \uD569\uC0B0 (\uC7AC\uAC1C \uC138\uC158 \uD3EC\uD568)"}function jr(e){if(typeof e!="number"||!Number.isFinite(e)||e<0)return"\u2014";if(e<1e3)return`${Math.round(e)}ms`;let t=e/1e3;if(t<60)return`${t.toFixed(1)}\uCD08`;let n=Math.floor(t/60);if(n<60)return`${n}\uBD84 ${Math.round(t-n*60)}\uCD08`;let r=Math.floor(n/60),o=n%60;return`${r}\uC2DC\uAC04 ${o}\uBD84`}function _d(e,t){if(typeof e!="object"||e===null)return[];let n=!1,r=!1;for(let o of Object.values(e)){if(typeof o!="object"||o===null)continue;let i=o;i.bead_id!==t||i.kind!=="review_session"||(n=!0,r=r||i.origin==="auto")}return n?[r?"\uB9AC\uBDF0 \xB7 \uC790\uB3D9":"\uB9AC\uBDF0"]:[]}function dd(e){return e==="auto"||e==="click"?e:null}function md(e,t){if(typeof e!="object"||e===null)return{active:!1,failure:null,origin:null};let n=!1,r=null,o=-1,i=null,s=null,l=-1;for(let a of Object.values(e)){if(typeof a!="object"||a===null)continue;let u=a;if(u.bead_id!==t||u.kind!=="review_session")continue;if(u.status==="pending"||u.status==="running"){n=!0;let p=typeof u.started_at=="number"?u.started_at:0;p>=o&&(o=p,r=dd(u.origin));continue}if(u.status!=="failed")continue;let d=typeof u.finished_at=="number"?u.finished_at:0;d>=l&&(l=d,i=typeof u.cause=="string"&&u.cause.length>0?u.cause:null,s=dd(u.origin))}return n?{active:!0,failure:null,origin:r}:{active:!1,failure:i,origin:s}}function gd(e,t){if(typeof e!="object"||e===null)return null;let n=0,r=!1;for(let o of Object.values(e)){if(typeof o!="object"||o===null)continue;let i=o;if(i.bead_id!==t)continue;let s=i.started_at,l=i.finished_at;typeof s!="number"||typeof l!="number"||!Number.isFinite(s)||!Number.isFinite(l)||l<s||(n+=l-s,r=!0)}return r?n:null}function $i(e){if(typeof e!="number"||!Number.isFinite(e)||e<=0)return"";let t=new Date(e);return`${String(t.getHours()).padStart(2,"0")}:${String(t.getMinutes()).padStart(2,"0")}`}function jg(e,t){let n=Array.isArray(e)?e:[],r=Array.isArray(t)?t:[];if(n.length===0&&r.length===0)return null;let o=null;for(let s of n)s.kind!=="deploy"||s.state!=="succeeded"||typeof s.target_sha!="string"||(!o||(typeof s.finished_at=="number"?s.finished_at:0)>(typeof o.finished_at=="number"?o.finished_at:0))&&(o=s);let i=n.filter(s=>s.state==="failed"&&!s.dismissed&&!s.superseded_by).length+r.length;return{deploy:o?{sha:wi(o.target_sha),at:typeof o.finished_at=="number"?o.finished_at:null,elapsed_ms:typeof o.elapsed_ms=="number"?o.elapsed_ms:null}:null,unresolved:i,badge:i>0?{tone:"act",label:`\uD574\uACB0 \uD544\uC694 ${i}`}:{tone:"quiet",label:"\uBAA8\uB450 \uC815\uC0C1"}}}function hd(e,t){let n=jg(e,t);return n?c`<button
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
            >${$i(n.deploy.at)}${n.deploy.elapsed_ms!==null?` \xB7 ${jr(n.deploy.elapsed_ms)}`:""}</span
          >
        </span>`:""}
    <span class="worker-repo-strip__spacer"></span>
    <span
      class="worker-repo-strip__badge worker-repo-strip__badge--${n.badge.tone}"
      >${n.badge.label}</span
    >
  </button>`:""}function ho(e){let t=mn(e.created_at),n=mn(e.updated_at);return!t&&!n?"":c`<div class="worker-mini__meta">
    ${t?c`<span title=${`\uC0DD\uC131 ${on(e.created_at)}`}
          >생성 ${t}</span
        >`:""}${t&&n?c`<span>·</span>`:""}${n?c`<span title=${`\uC218\uC815 ${on(e.updated_at)}`}
          >수정 ${n}</span
        >`:""}
  </div>`}function Fg(e){return!e||e==="requested"?"\uBC31\uC5C5 \uC911":e==="abandoned"?"\uD3D0\uAE30 \uD3EC\uAE30\uB428":e==="backup_verified"||e==="signaled"?"runner \uC885\uB8CC \uC911":e==="merged_revert"||e.startsWith("revert_")?"revert PR \uB300\uAE30":e.startsWith("rollback_")?"\uC6D0\uBCF5 \uBC30\uD3EC \uC911":e==="runner_terminated"||e.startsWith("pr_")||e.includes("ref_")||e.includes("worktree")||e.startsWith("bead_")?"PR \uC815\uB9AC \uC911":`\uD3D0\uAE30 \uCC98\uB9AC \uC911 (${e})`}function Zo(e,t){return t==="merged"?`${e}: \uC774\uBBF8 merge\uB41C \uAD6C\uD604\uC785\uB2C8\uB2E4. \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 revert PR\uC744 \uC0DD\uC131\uD558\uBA70, \uC2E4\uC81C \uC6D0\uBCF5\uC740 \uC0AC\uB78C\uC774 \uADF8 PR\uC744 merge\uD55C \uB4A4 \uC644\uB8CC\uB429\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`:`${e}: \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 runner/PR/branch/worktree\uB97C \uC815\uB9AC\uD558\uACE0 \uC774\uC288\uB97C \uD6C4\uBCF4\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`}function Jo(e,t){return t.kind==="stale_work_backup_fresh"?`${e}: \uC2E4\uD328\uD55C \uBC31\uC5C5 \uC791\uC5C5\uC744 \uD3EC\uAE30\uD569\uB2C8\uB2E4. \uBC31\uC5C5\uC740 \uB9CC\uB4E4\uC5B4\uC9C0\uC9C0 \uC54A\uC558\uACE0 \uAE30\uC874 \uC791\uC5C5\uC740 \uADF8\uB300\uB85C \uB0A8\uC2B5\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`:`${e}: \uC2E4\uD328\uD55C \uD3D0\uAE30 \uC791\uC5C5\uC744 \uD3EC\uAE30\uD569\uB2C8\uB2E4. \uBC31\uC5C5\uACFC \uD3D0\uAE30\uB294 \uC218\uD589\uB418\uC9C0 \uC54A\uC558\uACE0 bead\uB294 \uD3D0\uAE30 \uC774\uC804 \uC0C1\uD0DC\uB85C \uB3CC\uC544\uAC11\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`}function xi(e){return e.kind==="stale_work_backup_fresh"?`\uBC31\uC5C5 \uD3EC\uAE30\uB428 \xB7 \uAE30\uC874 \uC791\uC5C5\uC740 \uADF8\uB300\uB85C \uB0A8\uC2B5\uB2C8\uB2E4 (\uC6D0\uC778: ${e.last_error})`:`\uD3D0\uAE30 \uD3EC\uAE30\uB428 \xB7 \uD3D0\uAE30\uB294 \uC218\uD589\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4 (\uC6D0\uC778: ${e.last_error})`}function Ai(e){let t=["\uD3D0\uAE30 \uC644\uB8CC"];return e.operation_id&&t.push(`\uC791\uC5C5 ${e.operation_id}`),e.receipt?.archive_path&&t.push(`\uBC31\uC5C5 ${e.receipt.archive_path}`),e.receipt?.original_pr?.url&&t.push(`\uC6D0\uBCF8 PR ${e.receipt.original_pr.url}`),e.receipt?.revert_pr?.url&&t.push(`revert PR ${e.receipt.revert_pr.url}`),t.join(" \xB7 ")}function bd(e){return e?.startsWith("orphan_gitlink_content:")?`\uB9E4\uD551 \uC5C6\uB294 gitlink \uACBD\uB85C ${e.slice(23)}\uC5D0 \uB0B4\uC6A9\uC774 \uC788\uC2B5\uB2C8\uB2E4 \u2014 \uC800\uC7A5\uC18C\uC5D0\uC11C \uADF8 \uACBD\uB85C\uB97C \uC815\uB9AC\uD55C \uB4A4 \uC7AC\uC2DC\uB3C4\uD558\uAC70\uB098 \uD3EC\uAE30\uD558\uC138\uC694`:e==="dirty_submodule"?"\uC11C\uBE0C\uBAA8\uB4C8\uC5D0 \uBBF8\uCEE4\uBC0B \uBCC0\uACBD\uC774\uB098 \uBBF8\uCD08\uAE30\uD654 \uD56D\uBAA9\uC774 \uC788\uC2B5\uB2C8\uB2E4 \u2014 \uC815\uB9AC \uD6C4 \uC7AC\uC2DC\uB3C4\uD558\uC138\uC694":e==="submodule_observation_failed"?"\uC11C\uBE0C\uBAA8\uB4C8 \uC0C1\uD0DC\uB97C \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 (git \uC624\uB958) \u2014 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C git \uBA85\uB839\uC744 \uC9C1\uC811 \uD655\uC778\uD558\uC138\uC694":null}function rr(e,t,n={}){let o=Object.values(e&&typeof e=="object"?e:{}).filter(m=>m&&m.bead_id===t&&sd(m)).sort((m,g)=>(m.requested_at||0)-(g.requested_at||0)).at(-1),i=typeof n.attempt_id=="string"&&n.attempt_id.length>0?n.attempt_id:typeof o?.attempt_id=="string"?o.attempt_id:null,s=n.external?"\uC678\uBD80 PR\uC740 Worker\uAC00 \uC18C\uC720\uD558\uC9C0 \uC54A\uC544 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":n.done?"\uC644\uB8CC\uB41C \uC791\uC5C5\uC740 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":n.merge_active?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":n.merge_queued?"\uBA38\uC9C0 \uD050\uC5D0 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 [\uCDE8\uC18C]\uD558\uC138\uC694":n.conflict_active?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 \uC138\uC158\uC744 \uC815\uB9AC\uD558\uC138\uC694":n.cleanup_active?"\uC815\uB9AC \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":null,l=typeof o?.last_error=="string"?o.last_error:null,a=o?Fg(o.phase):null,u=o?.kind==="stale_work_backup_fresh",d=bd(l),p=n.merged||o?.mode==="merged_revert"?"merged":"unmerged";return{action:!n.external&&!n.done,enabled:!s&&(!o||!!l),label:u?l?"\uBC31\uC5C5 \uC815\uB9AC \uC7AC\uC2DC\uB3C4":"\uBC31\uC5C5 \uD6C4 \uC0C8\uB85C \uC2DC\uC791":l?"\uC7AC\uC2DC\uB3C4":"\uD3D0\uAE30",title:s||(l?d?`\uD3D0\uAE30 \uC2E4\uD328: ${l} \u2014 ${d}`:u?`\uBC31\uC5C5 \uB4A4 \uC815\uB9AC \uC2E4\uD328: ${l} \u2014 \uC6D0\uBCF8\uACFC \uAC80\uC99D \uC601\uC218\uC99D\uC744 \uBCF4\uC874\uD55C \uCC44 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:`\uD3D0\uAE30 \uC2E4\uD328: ${l} \u2014 \uAC19\uC740 \uC791\uC5C5\uC744 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:o?`${a||"\uD3D0\uAE30 \uCC98\uB9AC \uC911"} \u2014 \uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694`:p==="merged"?"\uBCD1\uD569\uB41C \uBCC0\uACBD\uC744 \uC6D0\uBCF5 PR\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4":"\uBC31\uC5C5 \uD6C4 runner\xB7PR\xB7\uC6CC\uD06C\uD2B8\uB9AC\xB7\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4"),attempt_id:i,operation:o||null,progress:a,error:l,confirmation:p,abandon:{action:!!o&&o.phase==="requested"&&!!l,label:u?"\uBC31\uC5C5 \uD3EC\uAE30":"\uD3D0\uAE30 \uD3EC\uAE30",title:u?"\uC2E4\uD328\uD55C \uBC31\uC5C5 \uC791\uC5C5\uC744 \uD3EC\uAE30\uD569\uB2C8\uB2E4 \u2014 \uC6D0\uBCF8\uC740 \uADF8\uB300\uB85C \uB0A8\uACE0 \uC0C8\uB85C \uC2DC\uC791\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4":"\uC2E4\uD328\uD55C \uD3D0\uAE30 \uC791\uC5C5\uC744 \uD3EC\uAE30\uD569\uB2C8\uB2E4 \u2014 \uBC31\uC5C5\xB7\uD3D0\uAE30\uB294 \uC218\uD589\uB418\uC9C0 \uC54A\uC558\uACE0 bead\uB294 \uD3D0\uAE30 \uC774\uC804 \uC0C1\uD0DC\uB85C \uB3CC\uC544\uAC11\uB2C8\uB2E4"}}}function yd(e){if(!e||e.quickfix_lane!==!0)return!1;let t=e.quickfix_landing;return!t||typeof t!="object"?!1:["repo_operations","branch_cleanup","parent_close"].includes(t.cursor)}function ki(e){let t=e.discard;if(!t||!t.operation)return"";let n=t.operation,r=bd(t.error),o=n.kind==="stale_work_backup_fresh"&&!t.error?null:n.backup?.path,i=n.original_pr,s=n.revert_pr;return c`<div
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
  </div>`}var Bg={dirty_unique:"\uCD5C\uC2E0 base\uC5D0 \uC5C6\uB294 \uB85C\uCEEC \uBCC0\uACBD\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",untracked_present:"\uCD94\uC801\uB418\uC9C0 \uC54A\uC740 \uD30C\uC77C\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",branch_ahead:"\uB85C\uCEEC branch\uC5D0 \uACE0\uC720 commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",head_ahead:"worktree HEAD\uC5D0 \uACE0\uC720 commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",ahead_not_contained:"\uB85C\uCEEC branch\uC758 \uACE0\uC720 commit\uC774 \uCD5C\uC2E0 base\uC5D0 \uD3EC\uD568\uB410\uC74C\uC744 \uC99D\uBA85\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",ahead_merge_commit:"\uB85C\uCEEC branch\uC5D0 \uC790\uB3D9 \uC815\uB9AC\uD560 \uC218 \uC5C6\uB294 merge commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",ahead_submodule_path:"\uB85C\uCEEC branch\uC758 \uACE0\uC720 commit\uC774 submodule \uACBD\uB85C\uB97C \uBCC0\uACBD\uD569\uB2C8\uB2E4",archive_failed:"\uACE0\uC720 commit \uBC31\uC5C5\uC744 \uC548\uC804\uD558\uAC8C \uAC80\uC99D\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",ref_delete_failed:"\uD655\uC778\uB41C local branch\uB97C \uC548\uC804\uD558\uAC8C \uC0AD\uC81C\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",resume_available:"\uC774\uC5B4\uAC08 \uC218 \uC788\uB294 \uC774\uC804 Worker session\uC774 \uC788\uC2B5\uB2C8\uB2E4",observe_failed:"Git \uC0C1\uD0DC\uB97C \uC548\uC804\uD558\uAC8C \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",identity_changed:"\uD655\uC778 \uC911 worktree \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4",ownership_unknown:"Worker \uC18C\uC720 worktree\uC778\uC9C0 \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"};function vd(e,t=!1){if(!e||typeof e!="object")return null;let n=e;if(n.reason!=="worktree_stale_work"||!n.stale_work||typeof n.stale_work!="object")return null;let r=n.stale_work,o=r.residue==="branch"?"branch":"worktree",i=r.state==="unique"?"unique":"unknown",s=r.summary&&typeof r.summary=="object"?r.summary:{};function l(u){return Number.isInteger(s[u])?Number(s[u]):0}let a=typeof r.cause=="string"?r.cause:"observe_failed";return{residue:o,state:i,title:o==="branch"?"\uC774\uC804 \uBE0C\uB79C\uCE58 \uBCF4\uC874\uB428":i==="unique"?"\uC774\uC804 \uC791\uC5C5 \uBCF4\uC874\uB428":"\uC774\uC804 \uC791\uC5C5 \uC0C1\uD0DC \uD655\uC778 \uC2E4\uD328",cause:Bg[a]||"\uC548\uC804\uD558\uAC8C \uC790\uB3D9 \uC815\uB9AC\uD560 \uC218 \uC5C6\uB294 \uC774\uC804 \uC791\uC5C5\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",summary:o==="branch"?`\uACE0\uC720 commit ${l("branch_ahead")}`:[`staged ${l("staged_count")}`,`unstaged ${l("unstaged_count")}`,`untracked ${l("untracked_count")}`,`branch ahead ${l("branch_ahead")}`,`HEAD ahead ${l("head_ahead")}`].join(" \xB7 "),action_id:typeof r.action_id=="string"?r.action_id:"",can_resume:r.can_resume===!0,can_continue:r.can_continue===!0,can_backup_fresh:r.can_backup_fresh===!0,can_recheck:r.can_recheck===!0,locked:t}}function Si(e,t={}){if(!e||!e.orchestration&&!e.worker)return"";let n=t.pin===!0?" exec-chip--pin":"",r=t.pin===!0?`
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
      >`:""}`}function Xo(e,t){let n=`worker-dep worker-dep--${t}${e.foreign?" worker-dep--foreign":""}`;return e.openable===!0?c`<button
        type="button"
        class=${`${n} worker-dep__open`}
        data-dep-id=${e.id}
        data-root-dir=${e.root_dir||""}
        title=${e.title||""}
      >
        ${e.label}
      </button>`:c`<span class=${n} title=${e.title||""}>${e.label}</span>`}function Ug(e){return{id:e.id,label:`\u29C9 ${e.id}`,title:[`\uACB9\uCE68 \xB7 ${e.location_label}`,...e.prefixes].join(`
`),openable:!0,...e.root_dir?{root_dir:e.root_dir}:{}}}function ol(e){return Array.isArray(e)?e.slice().sort((t,n)=>t.id<n.id?-1:t.id>n.id?1:0):[]}function Wg(e,t=!1){return e?c`<button
    type="button"
    class="ctl-chip ctl-chip--label judgement-chip worker-card__spec-after-blocker"
    data-chip-key="spec_after_blocker"
    aria-expanded=${t?"true":"false"}
    title="선행의 결과가 설계 전제라 스펙도 선행 뒤에 씁니다"
  >
    스펙 대기
  </button>`:""}function kd(e){if(!Object.hasOwn(e,"route_ok")||e.queue_placeable===!0)return null;let t="";return e.route_ok===!1&&(t="\uB77C\uC6B0\uD305 \uD544\uC694"),t.length===0&&(e.worker_ineligible===!0||e.awaiting_user===!0)||(t.length===0&&e.missing_description===!0?t="\uBCF8\uBB38 \uD544\uC694":t.length===0&&e.placement_spec==="conflict"?t="\uC2A4\uD399 \uCDA9\uB3CC":t.length===0&&Object.hasOwn(e,"placement_spec")&&e.placement_spec!=="published"&&(t="\uC2A4\uD399 \uBBF8\uBC1C\uD589"),t.length===0)?null:{label:t,title:Nr({placeable:!1,route_ok:e.route_ok,worker_ineligible:e.worker_ineligible===!0,awaiting_user:e.awaiting_user===!0,missing_description:e.missing_description===!0,spec:e.placement_spec})}}function zg(e,t){return e?c`<button
    type="button"
    class="ctl-chip ctl-chip--label judgement-chip worker-card__readiness"
    data-chip-key="readiness"
    aria-expanded=${t?"true":"false"}
    title=${e.title}
  >
    ${e.label}
  </button>`:""}function Ei(e,t=""){if(!e)return t===""?"":c`<div class="worker-deps worker-deps--primary">
          ${t}
        </div>`;let n=ol(e.predecessors),r=Array.isArray(e.released)?e.released:[],o=ol(e.dependents),i=ol(e.overlaps),s=e.scope_missing===!0,l=e.armed_lane||null,a=!!l||n.length>0||o.length>0||t!=="",u=r.length>0||i.length>0||s;return!a&&!u?"":c`${a?c`<div class="worker-deps worker-deps--primary">
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
            >`:""}${n.map(d=>Xo(d,"pred"))}${t}${o.map(d=>Xo(d,"dependents"))}
      </div>`:""}${u?c`<div class="worker-deps worker-deps--secondary">
        ${r.map(d=>Xo(d,"released"))}${i.map(d=>Xo(Ug(d),"overlap"))}${s?c`<span
              class="worker-dep worker-dep--muted"
              title="겹침 판정 불가 — 아티팩트가 있으면 스펙/플랜 front-matter, 없으면 description \`## scope\`에 선언 필요"
              >scope 없음</span
            >`:""}
      </div>`:""}`}function wd(e,t=""){let n=(Array.isArray(e)?e:[]).filter(r=>typeof r=="string"&&r!=="").slice().sort();return n.length===0?"":c`<div class="worker-deps worker-deps--secondary">
    ${n.map(r=>Xo({id:r,label:`\uC774\uC6D4 \u2192 ${r}`,title:`\uC774\uC6D4\uB41C \uD6C4\uC18D ${r} \uC5F4\uAE30`,openable:!0,...t?{root_dir:t}:{}},"dependents"))}
  </div>`}function Ti(e){return e?c`<button
    type="button"
    class="worker-dep worker-dep--lane mon-lane__chip"
    data-lane-id=${e.lane_id}
    title="이 연결 레인으로 이동"
  >
    ${e.label}
  </button>`:""}function Ci(e){if(!e)return"";let t=e.chips||{},n=t.route||e.route,r=t.route_source==="derived"||e.route_source==="derived";return n?c`<span
    class="ctl-chip ctl-chip--route${r?" is-derived":""}"
    title=${r?"route \uBBF8\uD540 (metadata unset)":"route"}
    >${r?"unset":n}</span
  >`:""}function Hg(e,t=!1){let n=e?e.quick_fix_review:null;if(!n)return"";let r=n.state;if(r!=="reviewed"&&r!=="stale")return"";let o=Array.isArray(n.missing)?n.missing:[],i=[r==="reviewed"?"quick_fix self-review \uC601\uC218\uC99D\uC774 \uC9C0\uAE08 \uBCF8\uBB38\uACFC \uC77C\uCE58\uD569\uB2C8\uB2E4":"quick_fix self-review \uC601\uC218\uC99D\uC774 \uC9C0\uAE08 \uBCF8\uBB38\uACFC \uB2E4\uB985\uB2C8\uB2E4",...o].join(`
`);return c`<button
    type="button"
    class="ctl-chip judgement-chip worker-card__qfr worker-card__qfr--${r}"
    data-chip-key="qfr"
    aria-expanded=${t?"true":"false"}
    title=${i}
  >
    ${r==="reviewed"?"\uB9AC\uBDF0 \u2713":"\uB9AC\uBDF0 stale"}
  </button>`}function $d(e){return e?c`<button
    type="button"
    class="ctl-chip ctl-chip--from"
    data-from-id=${e}
    title=${`\uCD9C\uCC98 ${e} \uC5F4\uAE30`}
  >
    ↩ from ${e}
  </button>`:""}function Ri(e,t=!1){return e?c`<button
    type="button"
    class="ctl-chip ctl-chip--label judgement-chip worker-card__rec"
    data-chip-key="rec"
    data-state=${e.state}
    aria-expanded=${t?"true":"false"}
    title=${gi(e)}
  >
    ${"\uBCF5\uC7A1"}
  </button>`:""}var Kg={absent:"\uC2E4\uD589 \uC601\uC218\uC99D\uC774 \uAE30\uB85D\uB418\uC9C0 \uC54A\uC558\uB2E4 \u2014 \uACFC\uAC70 Bead\xB7\uC678\uBD80 \uACBD\uB85C PR\uC740 \uC6D0\uB798 \uC5C6\uB2E4",unparsable:"\uC601\uC218\uC99D \uAC12\uC744 \uC77D\uC744 \uC218 \uC5C6\uB2E4 \u2014 40hex SHA\uB098 `delegated:`/`main:` \uD615\uC2DD\uC774 \uC544\uB2C8\uB2E4",effort_unknown:"effort \uD1A0\uD070\uC774 harness \uC5B4\uD718 \uBC16\uC774\uB2E4 \u2014 \uBAA8\uB378\xB7SHA\xB7unit\uC740 \uC720\uD6A8\uD558\uB2E4",main_reason_retired:"`main:` \uC0AC\uC720\uAC00 \uACE0\uC815 4\uD1A0\uD070(bead\xB7quick_fix_default\xB7phase_line\xB7takeover) \uBC16\uC774\uB2E4",main_receipt_unbacked:"`main:` \uC0AC\uC720\uB97C \uB4B7\uBC1B\uCE68\uD558\uB294 \uBA54\uD0C0\uB370\uC774\uD130(impl_dispatch\xB7route\xB7planned_execution\xB7quick_fix \uAE30\uBCF8 dispatch)\uAC00 \uC5C6\uB2E4",takeover_lineage_missing:"`main:takeover`\uC778\uB370 resolved \uBAA8\uB378\uACFC \uC77C\uCE58\uD558\uB294 \uC644\uB8CC\uB41C \uC704\uC784 \uC138\uC158\uC774 \uC5C6\uB2E4",takeover_lineage_unobservable:"`main:takeover`\uC778\uB370 \uC704\uC784 \uACC4\uBCF4\uB97C \uBAA8\uB2C8\uD130\uAC00 \uBCFC \uC218 \uC5C6\uB2E4(Codex \uBC16 \uB7F0\uD0C0\uC784)"};function Gg(e,t=!1){let n=xd(e);if(n.length===0)return"";let r=n.length>1?`\uC601\uC218\uC99D \xB7 ${n[0]} +${n.length-1}`:`\uC601\uC218\uC99D \xB7 ${n[0]}`;return c`<button
    type="button"
    class="ctl-chip ctl-chip--label judgement-chip worker-card__receipt"
    data-chip-key="receipt"
    data-bead-id=${e.id}
    aria-expanded=${t?"true":"false"}
    title=${n.join(", ")}
  >
    ${r}
  </button>`}function xd(e){let t=e.receipt_badge?e.receipt_badge.codes:null;return Array.isArray(t)?t.filter(n=>typeof n=="string"&&n.length>0):[]}function Ad(e,t){return!e||typeof t!="number"?"":c`<a
    class="worker-mini__pr"
    href=${e}
    target="_blank"
    rel="noreferrer noopener"
    title="PR 열기"
    >#${t} ↗</a
  >`}function Oi(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=Math.max(0,Math.min(4,Math.trunc(e)));return c`<span class="worker-pri" title=${`\uC6B0\uC120\uC21C\uC704 P${t}`}
    >P${t}</span
  >`}function Yg(e){let t=Array.isArray(e.badges)?e.badges:[],n=ln(e.usage),r=er(e.usage),o=mn(e.done_at);return c`<div
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
      ${Ad(e.pr_url,e.pr_number)}${o?c`<span
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
    ${wd(e.carried_to,e.root_dir)}
    <div class="worker-mini__row3">
      ${n.length>0?n.map(i=>c`<span class="worker-usage" title=${i.tooltip}
                >${i.label}</span
              >`):r?c`<span class="worker-usage" title=${No(e.usage)}
              >${r}</span
            >`:""}
      ${typeof e.work_ms=="number"?c`<span
            class="worker-mini__work"
            title=${fd(e.work_kind)}
            >작업 ${jr(e.work_ms)}</span
          >`:""}
    </div>
  </div>`}function bo(e,t={}){if(!(e.draggable!==!0||e.done===!0))return c`<span class="worker-mini__rowops">
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
  </span>`}function Mn(e,t={}){if(e.lane==="done"&&e.done_layout==="three_line")return Yg(e);let n=e.draggable&&!e.done,r=Array.isArray(e.badges)?e.badges:[],o=ln(e.usage),i=er(e.usage),s=e.merge_step||null,l=e.lane==="pr_wait"||!!e.revise_action||!!e.stale_work||e.discard?.abandon.action===!0,a=e.lane==="done"&&!l,u=a?mn(e.done_at):"",d=n?c`<span class="worker-mini__grip" aria-hidden="true">⠿</span>`:"",p=typeof e.seq=="number"?c`<span class="worker-mini__seq" aria-hidden="true"
          >${e.seq}</span
        >`:"",m=e.workspace_name?c`<span class="worker-mini__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:"",g=c`<span class="worker-mini__id" title="클릭하면 ID 복사"
    >${e.id}</span
  >`,k=e.lane==="done"?"":Ci(e.workflow),T=e.lane==="done"?"":$d(e.from_id),C=Oi(e.priority),te=c`<span class="worker-mini__title">${e.title}</span>`,re=Ad(e.pr_url,e.pr_number),X=r.map(st=>st===e.live_badge?c`<span
          class="worker-mini__badge worker-mini__badge--activity"
          title="서버가 이 PR을 처리하는 중입니다"
          ><span class="act-dot" aria-hidden="true"></span>${st}</span
        >`:c`<span
          class="worker-mini__badge${e.alert?" worker-mini__badge--alert":""}"
          title=${st===e.completion_badge&&e.completion_title||""}
          >${st}</span
        >`),D=e.reason?c`<span class="worker-mini__reason">${e.reason}</span>`:"",O=o.length>0?o.map(st=>c`<span class="worker-usage" title=${st.tooltip}
              >${st.label}</span
            >`):i?c`<span class="worker-usage" title=${No(e.usage)}
            >${i}</span
          >`:"",q=s?c`<span
        class="merge-step${s.failed?" merge-step--failed":""}"
        style=${`--progress: ${s.percent}%`}
        >${s.label}${s.index>0?c`<span class="merge-step__n"
              >${s.index}/${s.total}</span
            >`:""}</span
      >`:"",B=e.merge_action?c`<button
        type="button"
        class="worker-mini__merge"
        data-bead-id=${e.id}
        ?disabled=${e.merge_enabled===!1}
        title=${e.merge_title||""}
      >
        ${e.merge_label||"\uBA38\uC9C0"}
      </button>`:"",K=e.cancel_action?c`<button
        type="button"
        class="worker-mini__merge-cancel"
        data-bead-id=${e.id}
        ?disabled=${e.cancel_enabled===!1}
        title=${e.cancel_title||""}
      >
        취소
      </button>`:"",F=e.discard,N=F?.action||e.discard_action?c`<button
          type="button"
          class="worker-mini__discard"
          data-bead-id=${e.id}
          data-attempt-id=${F?.attempt_id||""}
          data-operation-id=${F?.operation?.operation_id||""}
          data-discard-mode=${F?.confirmation||"unmerged"}
          ?disabled=${F?!F.enabled:e.discard_enabled===!1}
          title=${F?F.title:e.discard_enabled===!1?e.discard_title||"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"PR\uC744 \uB2EB\uACE0 \uC6CC\uD06C\uD2B8\uB9AC/\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4 (\uB418\uB3CC\uB9B4 \uC218 \uC5C6\uC74C). \uB2E4\uC2DC \uC2E4\uD589\uD558\uB824\uBA74 \uD6C4\uBCF4 \uB808\uC778\uC5D0\uC11C \uB300\uAE30 \uB808\uC778\uC73C\uB85C \uC62E\uAE30\uC138\uC694"}
        >
          ${F?.label||"\uD3D0\uAE30"}
        </button>`:"",Y=F?.abandon.action?c`<button
        type="button"
        class="worker-mini__discard-abandon"
        data-bead-id=${e.id}
        data-operation-id=${F.operation.operation_id}
        data-operation-kind=${F.operation.kind||""}
        data-last-error=${F.error||""}
        title=${F.abandon.title}
      >
        ${F.abandon.label}
      </button>`:"",U=e.resolve_action?c`<button
        type="button"
        class="worker-mini__resolve"
        data-bead-id=${e.id}
        ?disabled=${e.resolve_enabled===!1}
        title=${e.resolve_title||"\uC2E4\uD328\uD55C \uC791\uC5C5\uC744 \uC774\uC5B4\uBC1B\uB294 \uB300\uD654\uD615 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4 (\uAE30\uB85D\uB41C \uC138\uC158\uC774 \uC788\uC73C\uBA74 fork)"}
      >
        세션에서 해결
      </button>`:"",ne=F?.abandon.action?c`${N}${Y}${U}`:c`${U}${N}`,ve=e.stale_work||null,Pe=ve?c`${ve.can_resume||ve.can_continue?c`<button
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
          </button>`:""}`:"",H=ve?c`<div class="worker-mini__stale">
        <strong>${ve.title}</strong>
        <span>${ve.summary}</span>
        <span>${ve.cause}</span>
        ${ve.can_backup_fresh?c`<small
              >Git-ignored dependency/build output은 archive에 포함되지
              않습니다</small
            >`:""}
      </div>`:"",ie=e.revise_action?c`<button
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
        </button>`:"",_e=!!(e.lane!=="pr_wait"&&!e.done&&e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker)),Te=Ri(e.rec,br(e,"rec")),V=Gg(e,br(e,"receipt")),le=Ti(e.cross_lane_chip),Z=qr(e.log_path),be=m||le||k||T||_e||Te||V||O||Z?c`<div class="worker-chips">
          ${m}${le}${k}${T}${_e?Si(e.exec_chips,{pin:e.exec_chips_pinned===!0}):""}${Te}${V}${O}${Z}${vi(e)}
        </div>`:"",Oe=Ei(e.dependency_chips),ke=ki(e),Ce=t.actions?t.actions:"",ot=!!(s||e.merge_action||e.cancel_action||e.resolve_action||e.discard_action||F?.operation||e.revise_action||ve);return c`<div
    class="worker-mini${l?" worker-mini--card":""}${n?"":" worker-mini--static"}${e.done?" worker-mini--done":""}${e.ghost?" worker-mini--ghost":""}${s?" worker-mini--merging":""}${s?.failed?" worker-mini--merge-failed":""}${e.external?" worker-mini--external":""}${e.search_match===!1?" is-dimmed":""}"
    style=${s?`--progress: ${s.percent}%`:""}
    draggable=${n?"true":"false"}
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    ${a?c`<div class="worker-mini__row1">
            ${m}${g}${C}${T}${re}${te}${Ce}
          </div>
          ${wd(e.carried_to,e.root_dir)}
          <div class="worker-mini__row2">
            ${O}${u?c`<span
                  class="worker-mini__done-at"
                  title=${`\uC644\uB8CC ${on(e.done_at)}`}
                  >완료 ${u}</span
                >`:""}${typeof e.work_ms=="number"?c`<span
                  class="worker-mini__work"
                  title=${fd(e.work_kind)}
                  >작업 ${jr(e.work_ms)}</span
                >`:""}${X}${q}
            <span class="worker-mini__actions"
              >${B}${K}${ne}</span
            >
            ${ho(e)}
          </div>`:l?c`<div class="worker-mini__head">
              ${d}${p}${g}${C}${re}${X}${D}${Ce}
            </div>
            <div class="worker-mini__body">${te}${H}</div>
            ${Oe}${be}${ot?c`<div class="worker-mini__foot">
                  ${q}
                  <span class="worker-mini__actions"
                    >${B}${K}${ne}${ie}${Pe}</span
                  >
                  ${ki(e)}
                </div>`:""}
            ${ho(e)}`:c`<div class="worker-mini__line">
              ${d}${p}${g}${C}${te}${re}${X}${D}${q}${B}${K}${ne}${Ce}
            </div>
            ${Oe}${be}${ke} ${ho(e)}`}
  </div>`}function il(e,t){let n,r=[];for(let o of e){let i=o.group||"";i.length>0&&i!==n&&r.push(c`<div class="worker-card__place-group">${i}</div>`),n=i,r.push(c`<button
        type="button"
        class="worker-card__place-lane${i.length>0?" worker-card__place-lane--nested":""}"
        data-bead-id=${t}
        data-lane=${o.id}
        ?disabled=${o.disabled===!0}
        title=${o.title||`${o.label} \uB300\uAE30 \uB9E8 \uB4A4\uC5D0 \uCD94\uAC00`}
      >
        <span>${o.label}</span>
        ${typeof o.count=="number"?c`<span class="worker-card__place-count">${o.count}</span>`:""}
      </button>`)}return c`${r}`}var Sd={external_roundtrip:"\uD558\uB124\uC2A4 \uBC16 \uC0C1\uB300\uC640 \uC608\uCE21 \uBD88\uAC00 \uC655\uBCF5 \uBC18\uBCF5 \u2014 \uB2E4\uB978 rig \uC138\uC158\xB7\uC0AC\uB78C\xB7\uC678\uBD80 \uC2DC\uC2A4\uD15C",user_feedback_loop:"\uC9C4\uD589 \uC911 \uC0AC\uC6A9\uC790 \uD53C\uB4DC\uBC31 \uC5C6\uC774\uB294 \uD488\uC9C8\uC774 \uB0AE\uC74C \u2014 \uBB38\uC548\xB7\uC124\uACC4 \uC138\uBD80\xB7\uBC29\uD5A5 \uC120\uD0DD"};function al(e,t){if(t==="rec"){let n=e.rec;if(!n)return null;let r=tl[n.state]||"";return{title:"\uBCF5\uC7A1\uD55C \uC791\uC5C5\uC73C\uB85C \uD310\uC815\uB428",lines:[...el(n),...r.length>0?[`\uC0C1\uD0DC: ${r}`]:[],"\uC801\uC6A9\uC740 \uC774\uC288 \uC0C1\uC138\uC758 \uC2E4\uD589 \uC124\uC815 \uD3B8\uC9D1\uAE30\uC5D0\uC11C"]}}if(t==="session_preferred"){if(e.session_preferred!==!0)return null;let n=Sd[e.session_preferred_reason||""]||"";return{title:"\uC6CC\uCEE4\uB85C \uB3CC\uB9B4 \uC218 \uC788\uC9C0\uB9CC \uC138\uC158\uC774 \uB0AB\uB2E4",lines:n.length>0?[n]:[]}}if(t==="ineligible")return e.worker_ineligible!==!0?null:{title:"\uC6CC\uCEE4 \uC2E4\uD589 \uB300\uC0C1\uC774 \uC544\uB2C8\uB2E4",lines:["worker-ineligible \uB77C\uBCA8\uC774 \uBD99\uC5B4 \uC788\uB2E4 \u2014 \uB77C\uBCA8\uC740 \uC774\uC288 \uC0C1\uC138\uC758 \uB77C\uBCA8 \uC808\uC5D0\uC11C \uB5C0\uB2E4"]};if(t==="spec_after_blocker")return e.spec_after_blocker!==!0?null:{title:"\uC120\uD589 \uACB0\uACFC\uAC00 \uC124\uACC4 \uC804\uC81C \u2014 \uC2A4\uD399\uB3C4 \uC120\uD589 \uB4A4\uC5D0",lines:[`\uC120\uD589: ${(Array.isArray(e.blocked_by)?e.blocked_by:[]).join(" \xB7 ")}`,"\uC120\uD589\uC774 \uB2EB\uD788\uBA74 \uC774 \uD45C\uC2DC\uB294 \uC800\uC808\uB85C \uC0AC\uB77C\uC9C4\uB2E4 \u2014 \uB77C\uBCA8\uC740 \uC774\uC288 \uC0C1\uC138\uC758 \uB77C\uBCA8 \uC808\uC5D0\uC11C \uB5C0\uB2E4"]};if(t==="readiness"){let n=kd(e);return n?{title:n.title,lines:[]}:null}if(t==="receipt"){let n=xd(e);return n.length===0?null:{title:"\uC2E4\uD589 \uC601\uC218\uC99D \uD68C\uACC4 \uC794\uC5EC \u2014 \uBA38\uC9C0\uB294 \uC9C4\uD589",lines:[...n.map(r=>Kg[r]||r),"\uC790\uB3D9 \uBA38\uC9C0 \uD310\uC815\uC5D0\uB294 \uC601\uD5A5\uC774 \uC5C6\uB2E4 \u2014 \uC815\uC815\uC740 bd update --set-metadata exec_receipt=\u2026 \uB85C"]}}if(t==="qfr"){let n=e.workflow?e.workflow.quick_fix_review:null;if(!n||n.state!=="reviewed"&&n.state!=="stale")return null;let r=Array.isArray(n.missing)?n.missing:[];return{title:n.state==="reviewed"?"quick_fix self-review \uC601\uC218\uC99D\uC774 \uC9C0\uAE08 \uBCF8\uBB38\uACFC \uC77C\uCE58\uD569\uB2C8\uB2E4":"quick_fix self-review \uC601\uC218\uC99D\uC774 \uC9C0\uAE08 \uBCF8\uBB38\uACFC \uB2E4\uB985\uB2C8\uB2E4",lines:r.length>0?r:["\uBE60\uC9C4 \uD56D\uBAA9 \uC5C6\uC74C"]}}return null}var Vg=["rec","receipt","session_preferred","ineligible","qfr","spec_after_blocker","readiness"];function Ii(e,t){for(let n of Vg){if(!t(n))continue;let r=al(e,n);return r?{chip_key:n,content:r}:null}return null}function vi(e){return e.chip_popover?co(e.chip_popover.content):""}function br(e,t){return!!e.chip_popover&&e.chip_popover.chip_key===t}var ll="\uC0AC\uC6A9\uC790 \uB9AC\uBDF0 \uD544\uC694";function cl(e,t=null,n={}){let r=e.worker_ineligible===!0,o=e.draggable&&!e.done&&!r,i=e.queue_placeable===!0&&!e.done&&!r,s=i&&t&&t.bead_id===e.id,l=e.session_preferred===!0,a=Sd[e.session_preferred_reason||""]||"",u=e.workflow,d=e.missing_description===!0,p=e.awaiting_user===!0,m=typeof e.reason=="string"&&e.reason.startsWith("\u26D4"),g=br(e,"spec_after_blocker"),k=Wg(e.spec_after_blocker===!0,g),T=kd(e),C=br(e,"readiness"),te=zg(T,C),re=c`${k}${g?vi(e):""}${te}${C?vi(e):""}`,X=Ei(e.dependency_chips,k===""&&te===""?"":re),D=e.workspace_name?c`<span class="worker-card__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:"",O=Ti(e.cross_lane_chip),q=Ci(u),B=$d(e.from_id),K=!!(e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker)),F=!r&&(e.blocked===!0||e.queue_placeable===!1);return c`<div
    class="worker-card${o?"":" worker-card--static"}${r?" worker-card--ineligible":""}${F?" worker-card--blocked":""}${e.search_match===!1?" is-dimmed":""}"
    draggable=${o?"true":"false"}
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    <div class="worker-card__head">
      ${o?c`<span class="worker-card__grip" aria-hidden="true">⠿</span>`:""}
      <span class="worker-card__id" title="클릭하면 ID 복사">${e.id}</span
      >${Oi(e.priority)}
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
            </button>`:""}${Ri(e.rec,br(e,"rec"))}${Hg(u,br(e,"qfr"))}
      ${g||C?"":vi(e)}
    </div>
    <div class="worker-card__title">${e.title}</div>
    ${u?Js(u,e.status,{onOpenDoc:n.onOpenDoc}):""}${X}
    ${D||O||q||B||K?c`<div class="worker-chips">
          ${D}${O}${q}${B}${Si(e.exec_chips,{pin:n.exec_chips_mode==="pinned_only"})}
        </div>`:""}
    <div
      class="worker-card__foot${e.reason?"":" worker-card__foot--actions-only"}"
    >
      ${s?c`<div class="worker-card__place-menu">
            ${il(t.lanes,e.id)}
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
                  class="worker-card__reason${m?" worker-card__reason--danger":""}"
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
    ${ho(e)}
  </div>`}function Gn(e){let t=!!e.collapsible&&!!e.collapsed,n=typeof e.count=="number"?e.count:e.items.length,r=c`<span
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
                  </div>`:e.items.map(o=>e.lane==="candidate"?cl(o,e.place_menu,{onOpenDoc:e.onOpenDoc}):Mn(o))}
          </div>`}
  </section>`}function pd(e,t,n){return c`<button
      type="button"
      class="worker-wait__area-toggle"
      data-area=${e}
      aria-expanded=${n?"false":"true"}
      aria-label=${`${t} ${n?"\uD3BC\uCE58\uAE30":"\uC811\uAE30"}`}
    >
      ${n?"\u25B8":"\u25BE"}
    </button>
    <span class="worker-wait__area-name">${t}</span>`}function Li(e){let t=e.parallel,n=e.serial,r=t.drop||{};return c`<div class="worker-wait">
    <section
      class="worker-wait__area worker-wait__area--parallel${t.collapsed?" is-collapsed":""}"
      data-area="parallel"
    >
      <header class="worker-wait__area-hd">
        ${pd("parallel","\uBCD1\uB82C \uC601\uC5ED",t.collapsed)}
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
        ${pd("serial","\uC9C1\uB82C \uC601\uC5ED",n.collapsed)}
        ${n.header_control?n.header_control:""}
      </header>
      ${n.collapsed?"":c`<div class="worker-wait__area-body">
            ${n.notice?n.notice:""}
            ${n.extra_panes?n.extra_panes:""}
            ${n.lanes.map(o=>Qg(o))}
          </div>`}
    </section>
  </div>`}function Qg(e){let t=e.drop||{},n=e.badge?c`<span
        class="worker-lane__badge${e.held?" worker-lane__badge--held":""}"
        >${e.badge}</span
      >`:"";return c`<div
    class="worker-wait__lane${e.empty?" worker-wait__lane--empty":""}"
  >
    ${Gn({id:typeof e.pane_id=="string"?e.pane_id:`worker-pane-lane-${e.id}`,lane:e.id,title:e.title,items:[],count:e.count,match_count:e.match_count,empty:"\uBE44\uC5B4 \uC788\uC74C \u2014 \uD589\uC744 \uC5EC\uAE30\uB85C \uB4DC\uB798\uADF8",header_control:c`${n}${e.header_control?e.header_control:""}`,body:c`<div
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
  </div>`}function Di(e){return e.count?c`<section
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
  </section>`:""}var Ed=[{step:"merge",label:"\uBA38\uC9C0",index:1},{step:"base",label:"base",index:2},{step:"verify",label:"\uAC80\uC99D",index:3},{step:"deploy",label:"\uBC30\uD3EC",index:4},{step:"child",label:"\uC790\uC2DD",index:5},{step:"branch",label:"\uBE0C\uB79C\uCE58",index:6},{step:"close",label:"close",index:7}],es=[{step:"base_containment",label:"base \uD3EC\uD568 \uD655\uC778"},{step:"repo_operations",label:"\uC800\uC7A5\uC18C \uC791\uC5C5"},{step:"post_merge_jobs",label:"\uBA38\uC9C0 \uD6C4 \uC7A1"},{step:"child_sweep",label:"\uC790\uC2DD \uC815\uB9AC"},{step:"branch_cleanup",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC"},{step:"parent_close",label:"\uBD80\uBAA8 close"}];function Pi(e,t){let n=Ed.find(o=>o.step===e);if(!n)return null;let r=Ed.length;return{step:n.step,label:t,index:n.index,total:r,percent:Math.round(n.index/r*100)}}function Td(e){let t=es.findIndex(n=>n.step===e);return es.map((n,r)=>({step:n.step,label:n.label,state:t<0?"todo":r<t?"done":r===t?"stall":"todo"}))}function Fr(e){let t=es.find(n=>n.step===e);return t?t.label:typeof e=="string"?e:""}function Xg(e){let t=es.findIndex(n=>n.step===e);return t<0?null:{index:t+1,total:es.length}}function Mi(e){let t=Xg(e);return t?`\uBA38\uC9C0 \uC644\uB8CC \xB7 \uC815\uB9AC ${t.total}\uB2E8\uACC4 \uC911 ${t.index}\uB2E8\uACC4\uC5D0\uC11C \uBA48\uCDA4`:"\uBA38\uC9C0\uB428 \xB7 \uC815\uB9AC \uBBF8\uC644"}var dl=new Set(["queued","running","retry_pending"]),Cd=new Set(["failed","succeeded"]),Zg={queued:"\uB300\uAE30",running:"\uC911",retry_pending:"\uC7AC\uC2DC\uB3C4 \uB300\uAE30",failed:"\uC2E4\uD328",succeeded:"\uC644\uB8CC \xB7 \uC815\uB9AC \uC7AC\uC2DC\uB3C4 \uB300\uAE30"},ts={base_containment:{step:"base",label:"base \uD655\uC778 \uC911"},child_sweep:{step:"child",label:"\uC790\uC2DD \uC815\uB9AC \uC911"},branch_cleanup:{step:"branch",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC \uC911"},parent_close:{step:"close",label:"\uBD80\uBAA8 close \uC911"}},Jg={merging:{step:"merge",label:"\uBA38\uC9C0 \uC911"},base_containment:ts.base_containment,child_sweep:ts.child_sweep,branch_cleanup:ts.branch_cleanup,parent_close:ts.parent_close};function eh(e){return typeof e=="string"&&/^[0-9a-f]{40}$/.test(e)}function th(e,t,n){return!["verify","deploy"].includes(e.kind)||![...dl,...Cd].includes(e.state)||![null,void 0,""].includes(e.superseded_by)||!Array.isArray(e.subjects)?!1:e.subjects.some(r=>r&&typeof r=="object"&&r.bead_id===t&&r.merged_sha===n)}function nh(e,t){let n=(t.kind==="deploy"?2:1)-(e.kind==="deploy"?2:1);if(n!==0)return n;let r=u=>u.state==="succeeded"?1:2,o=r(t)-r(e);if(o!==0)return o;let i=typeof e.requested_at=="number"?e.requested_at:0,s=typeof t.requested_at=="number"?t.requested_at:0;if(i!==s)return s-i;let l=typeof e.operation_id=="string"?e.operation_id:"",a=typeof t.operation_id=="string"?t.operation_id:"";return l.localeCompare(a)}function ul(e,t=!1){let n=e.kind,r=n==="verify"?"\uAC80\uC99D":"\uBC30\uD3EC",o=t?"failed":e.state,i=Zg[o];if(!i)return null;let s=Pi(n,`${r} ${i}`);return s?{...s,active:dl.has(o),failed:o==="failed"}:null}function rh(e){return!e||typeof e!="object"?null:Jg[e.step]||null}function ns(e){if(!e||typeof e.bead_id!="string")return null;let t=e.bead_id,n=e.merge_progress&&typeof e.merge_progress=="object"?e.merge_progress:{},r=rh(n),o=e.cleanup_failed&&typeof e.cleanup_failed=="object"?e.cleanup_failed:null,i=["post_merge_jobs","child_sweep","branch_cleanup","parent_close"].includes(typeof e.cleanup_cursor=="string"?e.cleanup_cursor:""),s=!i&&(e.cleanup_cursor==="repo_operations"||n.step==="repo_operations"),l=eh(e.merge_sha)?e.merge_sha:null,a=!i&&l&&Array.isArray(e.repo_operations)?e.repo_operations.filter(k=>k&&typeof k=="object"&&th(k,t,l)).sort(nh):[],u=s?a:[],d=u.find(k=>dl.has(k.state));if(d)return ul(d);if(o)return o.step==="repo_operations"&&a[0]?ul(a[0],!0):null;let p=u.find(k=>Cd.has(k.state)?k.state!=="succeeded"||e.cleanup_cursor==="repo_operations":!1);if(p)return ul(p);if(r){let k=Pi(r.step,r.label);return k?{...k,active:!0,failed:!1}:null}let m=typeof e.cleanup_cursor=="string"?ts[e.cleanup_cursor]:null;if(!m)return null;let g=Pi(m.step,m.label);return g?{...g,active:!0,failed:!1}:null}function qi(e){return!!e&&e.step!=="merge"&&e.failed!==!0}var oh="\uBBF8\uC801\uC7AC";function pl(e,t){let n=Zn(e,t.id);return{id:t.id,label:`\u26D3 ${t.id}`,title:`\uC120\uD589 \u2014 close\uB420 \uB54C\uAE4C\uC9C0 \uCD9C\uBC1C\uD558\uC9C0 \uC54A\uB294\uB2E4 (${t.location_label})`,...n?{foreign:!0}:{}}}var sh=10080*60*1e3;function Rd(e,t,n){let r=t.closed_at;if(typeof r!="number"||!Number.isFinite(r)||r<n-sh)return null;let o=Zn(e,t.id),i=typeof t.root_dir=="string"?t.root_dir:"",s={id:t.id,label:`\u{1F513} ${t.id}`,title:`\uD574\uC81C \u2014 ${on(r)}\uC5D0 close\uB418\uC5B4 \uC774 \uC774\uC288\uAC00 \uD480\uB838\uB2E4`,...o?{foreign:!0}:{}};return o?i.length>0&&(s.openable=!0,s.root_dir=i):s.openable=!0,s}function Od(e,t){let n=Array.isArray(t.ids)?t.ids.filter(i=>typeof i=="string"&&i.length>0):[],r=t.root_dirs&&typeof t.root_dirs=="object"?t.root_dirs:{},o=[];for(let i of[...new Set(n)].sort()){let s=Zn(e,i),l=typeof r[i]=="string"?r[i]:"",a={id:i,label:`\u2192 ${i}`,title:"\uD6C4\uC18D \u2014 \uC774 \uC774\uC288\uAC00 close\uB418\uBA74 \uD480\uB9B0\uB2E4",...s?{foreign:!0}:{}};l.length>0?(a.openable=!0,a.root_dir=l):s||(a.openable=!0),o.push(a)}return o}function Id(e,t,n={}){let r=new Map,o=new Map;for(let i of t)o.has(i.id)||o.set(i.id,i.location_label);for(let[i,s]of e){if(typeof i!="string"||i.length===0)continue;let l=[];for(let a of Array.isArray(s)?s:[]){if(typeof a!="string"||a.length===0)continue;let u=pl(i,{id:a,location_label:o.get(a)||oh}),d=n[a];u.foreign!==!0?u.openable=!0:typeof d=="string"&&d.length>0&&(u.openable=!0,u.root_dir=d),l.push(u)}l.length>0&&r.set(i,l)}return r}var ji=1,rs=[{value:"repo_spec",label:"\uB808\uD3EC \xB7 spec \uC6B0\uC120"},{value:"repo_updated",label:"\uB808\uD3EC \xB7 \uCD5C\uC2E0 \uC218\uC815"},{value:"updated_flat",label:"\uCD5C\uC2E0 \uC218\uC815(\uB808\uD3EC \uBB34\uC2DC)"}],os=[{value:"all",label:"\uC804\uCCB4"},{value:"ready",label:"\uCC29\uC218 \uAC00\uB2A5"},{value:"not_ready",label:"\uC900\uBE44 \uD544\uC694"}],yo={show_blocked:!0,readiness:"all"},Ld={auto_merge:"\uC790\uB3D9 \uBA38\uC9C0",merged:"\uBA38\uC9C0",merge:"\uBA38\uC9C0",pr_stop:"PR \uC911\uB2E8",stopped:"\uC911\uB2E8",failed:"\uC2E4\uD328",refuted:"\uBC18\uC99D",no_delta:"\uBB34-delta"};function ih(e,t){let n=null;for(let r of Object.values(e||{}))!r||r.bead_id!==t||!nr(r)||(n=typeof r.status=="string"?r.status:null);return n}function ah(e,t){let n=null,r=-1/0;for(let o of Object.values(e)){if(!o||o.bead_id!==t||o.status==="running"||!nr(o))continue;let i=typeof o.finished_at=="number"?o.finished_at:typeof o.started_at=="number"?o.started_at:0;i>=r&&(r=i,n=o)}return n}function ud(e){let t=rt(e),n=new Map;for(let r of Array.isArray(t.done)?t.done:[])r&&typeof r.bead_id=="string"&&typeof r.added_at=="number"&&n.set(r.bead_id,r.added_at);return new Set(Fd(rt(t.attempts),n).keys())}function Fd(e,t,n={}){let{winners:r,resumed_from_ids:o}=Lu(e,t),i=new Map;for(let[s,l]of r){let a=l.attempt,u=l.run_state;if(Ud(a))continue;let d=l.started_at,p=typeof a.session_id=="string"&&a.session_id.length>0,g=mi(a.quickfix_landing)==="session",k=u!=="running"&&(p||!g)&&!o.has(a.attempt_id),T=!p&&g?"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":o.has(a.attempt_id)?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":null,C=rt(n.observations?.[s]),te=rt(C.pr),re=typeof a.merge_sha=="string"&&a.merge_sha.length>0||te.state==="MERGED",X=rr(n.discard_operations,s,{attempt_id:a.attempt_id,merged:re}),D=u==="failed"?Pd(a,{resume_eligible:k,resume_reason:T,confirmation:X.confirmation,history:n.bead_timelines?.[s]}):null;i.set(s,{...Dd(a,e,u),started_at:d,...D?{failure:D}:{},can_pause:u==="running"&&p,can_resume:k})}for(let[s,l]of mh(e,t)){if(i.has(s))continue;let a=l.attempt,u=rr(n.discard_operations,s,{attempt_id:a.attempt_id}),d=Wd(a),p=l.run_state==="provider_hold"?fh(a,{provider_hold:n.provider_hold,auto_resume_pending:n.auto_resume_pending,account_catalog:n.account_catalog,attempts:e,history:n.bead_timelines?.[s]}):null;i.set(s,{...Dd(a,e,l.run_state),started_at:typeof a.started_at=="number"?a.started_at:null,...l.run_state==="parked"?{failure:Pd(a,{resume_eligible:!1,resume_reason:"\uC138\uC158 \uB300\uAE30 \u2014 [\uC138\uC158\uC5D0\uC11C \uD574\uACB0]\uB85C \uBB38\uC758\uB97C \uC774\uC5B4\uAC11\uB2C8\uB2E4",confirmation:u.confirmation,history:n.bead_timelines?.[s]})}:{},...l.run_state==="waiting"?{wait:lh(a)}:{},...p?{hold:p}:{},...d?{retry:d}:{},can_pause:!1,can_resume:l.run_state==="provider_hold"})}return i}function Dd(e,t,n){return{attempt_id:typeof e.attempt_id=="string"?e.attempt_id:"",run_state:n,last_event_at:typeof e.last_event_at=="number"?e.last_event_at:null,last_activity:e.last_activity&&typeof e.last_activity=="object"?e.last_activity:null,legs:Array.isArray(e.legs)?e.legs:[],runner:typeof e.runner=="string"?e.runner:null,model:typeof e.model=="string"?e.model:null,effort:typeof e.effort=="string"?e.effort:null,speed:typeof e.speed=="string"?e.speed:null,resumed_from:typeof e.resumed_from=="string"?e.resumed_from:null,continuation_mode:e.continuation_mode==="session"||e.continuation_mode==="fresh"?e.continuation_mode:null,status:typeof e.status=="string"?e.status:null,usage:tr(t,e.bead_id)}}function Pd(e,t){let n=e.cause_detail&&typeof e.cause_detail=="object"?e.cause_detail:null;return{cause:typeof e.cause=="string"?e.cause:null,cause_detail:n,summary:n&&typeof n.summary=="string"?n.summary:null,bead_id:typeof e.bead_id=="string"?e.bead_id:"",finished_at:typeof e.finished_at=="number"?e.finished_at:null,runner:typeof e.runner=="string"?e.runner:null,model:typeof e.model=="string"?e.model:null,effort:typeof e.effort=="string"?e.effort:null,observed_effort:typeof e.observed_effort=="string"?e.observed_effort:null,speed:typeof e.speed=="string"?e.speed:null,attempt_id:typeof e.attempt_id=="string"?e.attempt_id:"",usage:e.usage&&typeof e.usage=="object"?e.usage:null,halted_auto_advance:e.halted_auto_advance===!0,quickfix_lane:e.quickfix_lane===!0,quickfix_landing:e.quickfix_landing&&typeof e.quickfix_landing=="object"?e.quickfix_landing:null,retry:Wd(e),resume_eligible:t.resume_eligible,resume_reason:t.resume_reason,landed:yd(e),confirmation:t.confirmation,...Bd(t.history)}}function Bd(e){if(!e||typeof e!="object")return{};let t=Array.isArray(e.events)?e.events:[],n=[];for(let o of t)!o||typeof o!="object"||typeof o.summary!="string"||o.summary.length===0||n.push({event_id:typeof o.event_id=="string"?o.event_id:"",kind:typeof o.kind=="string"?o.kind:"",summary:o.summary,at:typeof o.at=="number"?o.at:null});n.reverse();let r=typeof e.log_path=="string"&&e.log_path.length>0?e.log_path:null;return{...n.length>0?{timeline:n}:{},...r===null?{}:{log_path:r},...e.log_expired===!0?{log_expired:!0}:{},...e.log_unreadable===!0?{log_unreadable:!0}:{}}}function lh(e){let t=e.cause_detail&&typeof e.cause_detail=="object"?e.cause_detail:null,n=Array.isArray(t?.blockers)?t.blockers:[],r=[];for(let o of n)!o||typeof o!="object"||typeof o.id!="string"||o.id.length===0||r.push({id:o.id,rig:typeof o.rig=="string"?o.rig:null,status:typeof o.status=="string"?o.status:""});return{summary:t&&typeof t.summary=="string"?t.summary:null,blockers:r,since:typeof e.finished_at=="number"?e.finished_at:null}}function Ud(e){return e?.status==="paused"&&typeof e.cause=="string"&&e.cause.startsWith("provider_outage:")}function ch(e,t){let n=typeof e.runner=="string"?e.runner:"",r=rt(t)[n];return!r||!Array.isArray(r.targets)?null:r.targets.find(o=>Array.isArray(o?.attempt_ids)&&o.attempt_ids.includes(e.attempt_id))||null}function uh(e,t){if(e===null)return null;let n=rt(t).claude;if(!Array.isArray(n))return null;let r=n.find(o=>o?.email===e);return r&&typeof r.alias=="string"&&r.alias.length>0?r.alias:null}function dh(e,t){let n=e,r=new Set;for(;n&&!r.has(n.attempt_id);){if(r.add(n.attempt_id),n.auto_resume_kind==="provider_outage")return!0;n=typeof n.resumed_from=="string"?t[n.resumed_from]:null}return!1}function ph(e,t,n,r){if((Array.isArray(r.auto_resume_pending)?r.auto_resume_pending:[]).some(s=>s?.attempt_id===e.attempt_id))return"pending";let i=e.auto_resume_refused;return typeof i=="string"&&i.length>0?`refused:${i}`:n.startsWith("auto_resume_disarmed:")||t?.auto_switch==="cap"||dh(e,r.attempts)?"disarmed":null}function fh(e,t){let n=e.cause.slice(16),r=e.cause_detail&&typeof e.cause_detail=="object"?e.cause_detail:null,o=ch(e,t.provider_hold),i=typeof o?.model=="string"&&o.model.length>0?o.model:typeof e.model=="string"&&e.model.length>0?e.model:null,s=typeof o?.account=="string"&&o.account.length>0?o.account:typeof e.claude_account=="string"&&e.claude_account.length>0?e.claude_account:null,l=typeof o?.last_error=="string"?o.last_error:"",a=ph(e,o,l,{auto_resume_pending:t.auto_resume_pending,attempts:t.attempts}),u=typeof o?.resets_at=="number"?o.resets_at:typeof r?.resets_at=="number"?r.resets_at:null,d=typeof o?.next_probe_at=="number"?o.next_probe_at:null,p=uh(s,t.account_catalog),m=Bd(t.history);return{kind:o?.kind==="usage_limit"||n==="usage_limit"?"usage_limit":"outage",detail:n,...typeof r?.message=="string"?{message:r.message}:{},...typeof r?.summary=="string"?{summary:r.summary}:{},...i||s?{target:{...i?{model:i}:{},...s?{account:s}:{},...p?{account_alias:p}:{}}}:{},...u===null?{}:{resets_at:u},...a===null?{}:{auto_resume:a},...o?.auto_switch==="none"||o?.auto_switch==="disabled"?{auto_switch:o.auto_switch}:{},...d===null?{}:{next_probe_at:d},...m.log_path?{log_path:m.log_path}:{}}}function Wd(e){let t=e&&e.retry&&typeof e.retry=="object"?e.retry:null;return t?{cause:typeof t.cause=="string"?t.cause:null,attempts:typeof t.attempts=="number"?t.attempts:0,max:typeof t.max=="number"?t.max:0,next_at:typeof t.next_at=="number"?t.next_at:null}:null}var _h=new Set(["parked","retry_wait","waiting"]);function mh(e,t){let n=Object.values(e||{}),r=new Set(n.map(s=>s?.resumed_from).filter(s=>typeof s=="string")),o=new Map;for(let s of n)s&&typeof s.bead_id=="string"&&nr(s)&&o.set(s.bead_id,s.attempt_id);let i=new Map;for(let s of n){let l=Ud(s);if(!s||typeof s.bead_id!="string"||s.bead_id.length===0||!nr(s)||!_h.has(s.status)&&!l||o.get(s.bead_id)!==s.attempt_id||typeof s.dismissed_at=="number"||l&&r.has(s.attempt_id))continue;let a=t.get(s.bead_id);typeof a=="number"&&a>0&&typeof s.finished_at=="number"&&a>=s.finished_at||i.set(s.bead_id,{attempt:s,run_state:l?"provider_hold":s.status})}return i}function Md(e,t){let n=e[t];if(!n)return"";if(n.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let r=typeof n.reason=="string"?n.reason:"";if(r==="prerequisite_unmet"&&Array.isArray(n.blockers)&&n.blockers.length>0)return"\u26D3 \uC120\uD589 \uB300\uAE30";let o=r.indexOf(":");return o>0&&o<r.length-1?`\u26D4 ${r.slice(0,o)} (${r.slice(o+1)})`:`\u26D4 ${r}`}function rt(e){return e&&typeof e=="object"?e:{}}function gh(e){let t=rt(e).badge_codes;return Array.isArray(t)?t.filter(n=>typeof n=="string"&&n.length>0):[]}function hh(e,t,n){let r=rt(t);if(Object.keys(r).length===0)return null;let o=e.execution_defaults,i=e.runner_catalog,s=e.session_defaults;if(!o||!i||!s)return null;let l=m=>An({pin:m,global:s,execution_defaults:o,runner_catalog:i,route:n}),a,u;try{a=l(r),u=l(null)}catch{return null}let d=qd(mo(a,i),mo(u,i)),p=qd(Mr(a,null),Mr(u,null));return d||p?{orchestration:d,worker:p}:null}function qd(e,t){return!e||t&&t.text===e.text?null:e}function bh(e,t,n){let o=(t&&typeof t=="object"&&Array.isArray(t.released_by)?t.released_by:[]).filter(s=>s&&typeof s=="object"&&typeof s.id=="string").slice().sort((s,l)=>(typeof l.closed_at=="number"?l.closed_at:0)-(typeof s.closed_at=="number"?s.closed_at:0)),i=[];for(let s of o){let l=Rd(e,s,n);l&&i.push(l)}return i.length===0?null:i}function ml(e,t){return typeof e!="string"||e.length===0||typeof t!="string"||t.length===0||t===e?null:`\u2192 ${t}`}var yh=new Set(["quick_fix","spec_backed","full_plan"]);function Nd(e){return typeof e=="string"&&yh.has(e)}function vh(e){let t={...rt(e.session_defaults)};for(let n of["orchestration_model","orchestration_effort","orchestration_speed","quick_fix_orchestration_model","quick_fix_orchestration_effort","quick_fix_orchestration_speed"]){let r=e[n];typeof r=="string"&&(t[n]=r)}return t}function kh(e,t,n){let r=e.runner_catalog??null,o=_l(e,t,n,null);if(!o)return null;let i=Pn(r,o.orchestration_model.value??""),s=i===null?o:_l(e,t,n,i)||o,l=mo(s,r),a=Mr(s,i);return l||a?{orchestration:l,worker:a}:null}function _l(e,t,n,r){let o=Nd(n)?n:Nd(t.route)?t.route:null;try{return An({pin:t,global:vh(e),execution_defaults:e.execution_defaults??null,runner_catalog:e.runner_catalog??null,route:o,controller_runtime:r})}catch{return null}}function wh(e,t,n){return!t||!Object.hasOwn(t,"metadata")?null:Mr(_l(e,rt(t.metadata),t.route,n),n)}function gl(e,t){let n=new Set,r=e;for(;r&&!n.has(r.attempt_id);){if(r.conflict_resolution===!0)return!0;n.add(r.attempt_id),r=typeof r.resumed_from=="string"&&r.resumed_from.length>0&&t.get(r.resumed_from)||null}return!1}function $h(e){let t={};for(let l of Hn)t[l]=0;let n=!1,r=0,o=0,i=0;for(let l of e){let a=l.usage;if(!a||typeof a!="object")continue;let u=!1;for(let d of Hn)Number.isFinite(a[d])&&(t[d]+=a[d],n=!0,u=!0);u&&(o+=1,Number.isFinite(a.total_cost_usd)&&(r+=a.total_cost_usd,i+=1))}o>0&&i===o&&(t.total_cost_usd=r);let s=e.map(l=>l.usage).filter(l=>l&&typeof l=="object"&&l.providers);return s.length>0?ln(ii(s)):n?er(t):null}function zd(e,t){let n=Go(e,t);return n==="internal"?"\uBBF8\uC801\uC7AC":n==="external"?"\uC678\uBD80":"\uC704\uCE58 \uBBF8\uD655\uC778"}function xh(e,t,n){let r=t.get(e);if(!r)return zd(e,n);if(typeof r.position=="number"){if(r.lane==="parallel")return`#${r.position}`;if(/^s[1-5]$/.test(r.lane))return`${r.lane} #${r.position}`}return Ko(r)}function Ah(e,t,n,r,o,i){let s=t.get(e);if(!s)return{label:i&&Go(e,n)==="internal"?"\uC9C4\uD589 \uB300\uAE30":zd(e,n),title:""};if(s.state==="runnable"&&i&&Go(e,n)==="internal")return{label:"\uC9C4\uD589 \uB300\uAE30",title:""};if(typeof s.position=="number"&&(s.lane==="parallel"||/^s[1-5]$/.test(s.lane))){let a=r.get(e),u=s.lane==="parallel"?"\uBCD1\uB82C":s.lane,d=o.get(e);return{label:!!d&&d.reason==="prerequisite_unmet"&&Array.isArray(d.blockers)&&d.blockers.length>0?"\u26D3 \uC120\uD589 \uB300\uAE30":a&&a.length>0?"\u{1F512} \uB300\uAE30":"\uB300\uAE30",title:`${s.workspace_name||s.root_dir} ${u} #${s.position}`}}return{label:s.state==="running"?"\u25B6 \uC2E4\uD589\uC911":Ko(s),title:""}}function Sh(e,t){for(let n of Object.values(e||{}))if(n&&n.attempt_id===t&&typeof n.armed_by_lane=="string"&&n.armed_by_lane.length>0)return n.armed_by_lane;return null}function Eh(e,t,n,r,o,i){return t==="draft"?{state:"draft",badge:"draft",run_label:null,can_stop:!1}:n.some(s=>i.failed_by_bead.get(s.id)===e)?{state:"failed",badge:"\u26D4 \uC2E4\uD328",run_label:"\u25B6 \uB2E4\uC2DC \uC9C4\uD589",can_stop:!1}:i.disarmed_lanes.has(e)?{state:"restart",badge:"\u23F8 \uC7AC\uC2DC\uC791",run_label:"\u25B6 \uC9C4\uD589",can_stop:!1}:n.some(s=>i.armed_by_bead.get(s.id)===e)?{state:"running",badge:"\u25B6 \uC9C4\uD589 \uC911",run_label:o.length>0?"\u25B6 \uC774\uC5B4\uC11C \uC9C4\uD589":null,can_stop:!0}:r?{state:"all_done",badge:"\uBAA8\uB450 \uC644\uB8CC",run_label:null,can_stop:!1}:{state:"confirmed",badge:"\uD655\uC815",run_label:"\u25B6 \uC9C4\uD589",can_stop:!1}}function Th(e,t,n,r,o,i,s,l){let a=[];return e.forEach((u,d)=>{let p=typeof u.id=="string"?u.id:"";if(p.length===0)return;let m=u.status==="confirmed"?"confirmed":"draft",g=Array.isArray(u.entries)?u.entries:[],k=[];g.forEach((re,X)=>{let D=re&&typeof re.bead_id=="string"?re.bead_id:"";if(D.length===0)return;let O=re&&typeof re.root_dir=="string"?re.root_dir:"",q=n.get(D),B=q?q.state:void 0,K=B==="running"||B==="pr_wait"||B==="done",F=!q||B==="runnable",N=q&&q.lane==="parallel"&&typeof q.position=="number"?q.position-1:null,Y=Ah(D,n,r,t,l,m==="confirmed"),U=k.length>0?k[k.length-1]:null,ne=m==="confirmed"&&U!==null&&!U.done&&!(t.get(D)||[]).includes(U.id);k.push({id:D,title:o.get(D)||D,root_dir:q?q.root_dir:O,workspace_name:q?q.workspace_name:i.get(O)||"",seq:X+1,location_label:Y.label,location_title:Y.title,draggable:!K,fixed:K,done:B==="done",unplaced:F,mismatch:ne,...N!==null?{queue_index:N}:{}})}),k.forEach((re,X)=>{re.seq=X+1});let T=k.length>0&&k.every(re=>re.done),C=k.filter(re=>!re.fixed&&s.armed_by_bead.get(re.id)!==p).map(re=>re.id),te=Eh(p,m,k,T,C,s);a.push({lane_id:p,status:m,draft:m==="draft",number:d+1,label:`\uC5F0\uACB0 ${d+1} \xB7 \uB808\uD3EC \uAC04`,rows:k,all_done:T,can_confirm:m==="draft"&&k.length>=2,has_mismatch:m==="confirmed"&&k.some(re=>re.mismatch),unlaunched:C,...te})}),a}function Ch(e,t,n){if(e.lane==="runnable"){let s=n.get(e.id);return s?s.length===0?{scope:[],state:"missing"}:{scope:s,state:"declared"}:{scope:[],state:void 0}}let r=t.get(e.root_dir),o=r?r[e.id]:void 0;if(!o||!Array.isArray(o.scope))return{scope:[],state:void 0};let i=o.scope.filter(s=>typeof s=="string"&&s.length>0);return{scope:i,state:i.length===0?"missing":"declared"}}function Rh(e,t,n,r,o){let i=new Map;for(let a of[...e.running,...e.queue,...e.runnable,...e.pr_wait]){if(!t.has(a.root_dir))continue;let u=`${a.root_dir}\0${a.id}`,d=i.get(u);if(d){d.cards.push(a);continue}let{scope:p,state:m}=Ch(a,t,n);m!==void 0&&(a.scope_state=m),i.set(u,{cards:[a],scope:p})}let s=new Map;for(let a of i.values()){let u=a.cards[0].scope_state;if(u!==void 0)for(let m of a.cards)m.scope_state=u;if(a.scope.length===0)continue;let d=a.cards[0].root_dir,p=s.get(d);p?p.push(a):s.set(d,[a])}let l=(a,u,d)=>{let p=u.cards[0],m={id:p.id,title:p.title,location_label:xh(p.id,r,o),prefixes:d,...typeof p.root_dir=="string"&&p.root_dir.length>0?{root_dir:p.root_dir}:{}};for(let g of a.cards)g.overlap_chips?g.overlap_chips.push(m):g.overlap_chips=[m]};for(let a of s.values())for(let u=0;u<a.length;u+=1)for(let d=u+1;d<a.length;d+=1){let p=bi(a[u].scope,a[d].scope);p.length!==0&&(l(a[u],a[d],p),l(a[d],a[u],p))}}function jd(e,t,n){let r=n?n.get(t)?.root_dir:void 0,o=!Zn(e.id,t),i=typeof e.root_dir=="string"?e.root_dir:"",s=typeof r=="string"&&r.length>0?r:o&&i.length>0?i:"";return s.length>0?{openable:!0,root_dir:s}:o?{openable:!0}:{}}function Oh(e,t,n,r){let o=new Set(e?e.ids:[]);for(let l of t&&Array.isArray(t.ids)?t.ids:[])typeof l=="string"&&l.length>0&&o.add(l);if(o.size===0)return{ids:[]};let i={},s={...e?e.root_dirs:{},...t&&t.root_dirs&&typeof t.root_dirs=="object"?t.root_dirs:{}};for(let l of o){let a=s[l];if(typeof a=="string"&&a.length>0){i[l]=a;continue}if(!Zn(n.id,l)){n.root_dir.length>0&&(i[l]=n.root_dir);continue}let u=r.get(l)?.root_dir;typeof u=="string"&&u.length>0&&(i[l]=u)}return{ids:[...o],root_dirs:i}}function fl(e){if(typeof e=="number")return Number.isFinite(e)?e:null;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:null}return null}function Ni(e){if(typeof e=="number"&&Number.isFinite(e))return e;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:0}return 0}function Ih(e){let t=typeof e=="string"?e.trim().toLowerCase():"";return t.length===0?null:n=>{let r=typeof n.id=="string"?n.id.toLowerCase():"",o=typeof n.title=="string"?n.title.toLowerCase():"";return r.includes(t)||o.includes(t)}}function Lh(e,t){let n=[e.runnable,e.runnable_all,e.queue,e.running,e.pr_wait,e.done,e.parallel_rows];for(let o of e.runnable_sections)n.push(o.items);let r=[];for(let o of e.queue_groups){n.push(o.items,o.sublanes.parallel);for(let i of o.sublanes.serial)n.push(i.items),r.push(i.occupants)}for(let o of n)for(let i of o)i.search_match=t(i);for(let o of r)for(let i of o)i.search_match=t(i)}function yr(e,t,n){let r=Array.isArray(e)?e:[],o=Array.isArray(t)?t:[],i=n&&typeof n.done_since=="number"?n.done_since:void 0,s={...yo,...n&&n.candidate_filter?n.candidate_filter:{}},l=n&&Object.hasOwn(n,"cross_lanes")?n.cross_lanes??null:void 0,a=n&&n.candidate_sort==="as_given"?"as_given":n&&rs.some($=>$.value===n.candidate_sort)?n.candidate_sort:"repo_spec",u=n&&n.groups==="all"?"all":"nonempty",d=n&&n.candidate_hidden_counts==="per_control"?"per_control":"sequential",p=Date.now(),m=new Map;for(let $ of o)$&&typeof $.root_dir=="string"&&m.set($.root_dir,$);let g=new Map;for(let $ of o)$&&typeof $.root_dir=="string"&&g.set($.root_dir,$.name||$.root_dir);for(let $ of r)$&&typeof $.root_dir=="string"&&g.set($.root_dir,$.name||$.root_dir);let k=[],T=[],C=[],te=[],re=[],X=[],D=new Map,O=new Map,q=new Map,B=new Map,K=new Map,F=new Map,N=new Map,Y=new Map,U=new Map,ne=new Map,ve=new Map,Pe=new Map,H=new Map,ie=new Map,_e=new Set,Te=new Map,V=new Map,le=new Map;for(let $ of r){if(!$||typeof $.root_dir!="string")continue;let G=$.root_dir,he=$.name||G,Ke=m.get(G),it=Ke&&typeof Ke.revision=="number"?Ke.revision:typeof $.revision=="number"?$.revision:0,ze=rt($.attempts),Tt=rt($.bead_titles);for(let[x,L]of Object.entries(Tt))typeof L=="string"&&L.length>0&&le.set(x,L);let Dt=rt($.bead_times),nt=rt($.pr_observations),wt=rt($.admission);for(let[x,L]of Object.entries(wt))L&&typeof L=="object"&&ve.set(x,L);let Mt=rt($.revise_parked),Lt=rt($.merge_queue_state),Bt=rt($.cleanup_failed),ce=rt($.discard_operations),we=rt($.bead_timelines),Be=rt($.bead_blocked_by);Object.hasOwn($,"bead_scope")&&Te.set(G,rt($.bead_scope));let Je=rt($.bead_workflow),Ze=rt($.pr_activity),pt=Array.isArray($.repo_operations)?$.repo_operations:[];Y.set(G,pt);let gt=typeof $.declared_base=="string"?$.declared_base:null;N.set(G,gt),F.set(G,Object.entries(Bt).map(([x,L])=>({bead_id:x,step:L&&L.step?L.step:"",reason:L&&L.reason?L.reason:"",at:L&&typeof L.at=="number"?L.at:null,detail:L&&typeof L.detail=="string"?L.detail:null,output_tail:L&&typeof L.output_tail=="string"&&L.output_tail?L.output_tail:void 0,log_path:L&&typeof L.log_path=="string"&&L.log_path?L.log_path:void 0,retry_count:L&&typeof L.retry_count=="number"&&Number.isInteger(L.retry_count)&&L.retry_count>0?L.retry_count:0,failure_code:L&&typeof L.failure_code=="string"?L.failure_code:void 0})));for(let[x,L]of Object.entries(rt($.bead_overlay)))L&&typeof L=="object"&&U.set(`${G}\0${x}`,L);let et=new Map;for(let x of Object.values(ze))x&&typeof x.attempt_id=="string"&&et.set(x.attempt_id,x);let Ne=Array.isArray($.merge_queue)?$.merge_queue:[],S=new Set(Ne.filter(x=>x&&typeof x.bead_id=="string").map(x=>x.bead_id)),j=new Map(Ne.filter(x=>x&&typeof x.bead_id=="string").map(x=>[x.bead_id,x])),z=new Map,Ae=new Map,ye=new Map,ft=new Map;Ne.forEach((x,L)=>{x&&typeof x.bead_id=="string"&&(z.set(x.bead_id,L+1),Ae.set(x.bead_id,x.resolution),ye.set(x.bead_id,x.continuation_action||null),ft.set(x.bead_id,x.authority||null))});let $t=rt($.auto_merge_skips),yt=x=>{let L=$t[x];if(!L)return null;let Ee=rt(rt(nt[x]).pr).head_sha;return Ee&&Ee===L.head_sha?L.reason||"":null};K.set(G,{positions:z,resolutions:Ae,continuations:ye,authorities:ft,state:{active:typeof Lt.active=="string"?Lt.active:null,failures:rt(Lt.failures),waiting:Lt.waiting&&typeof Lt.waiting.bead_id=="string"&&typeof Lt.waiting.reason=="string"?Lt.waiting:null},auto_excluded:(Array.isArray($.pr_wait)?$.pr_wait:[]).map(x=>x&&x.bead_id).filter(x=>typeof x=="string"&&yt(x)!==null),running:Ne.length>0});let xt=Array.isArray($.queue)?$.queue:[];for(let x of[...xt,...Array.isArray($.pr_wait)?$.pr_wait:[]])x&&typeof x.bead_id=="string"&&typeof x.armed_by_lane=="string"&&x.armed_by_lane.length>0&&H.set(x.bead_id,x.armed_by_lane);for(let x of Array.isArray($.disarmed_on_load)?$.disarmed_on_load:[])typeof x=="string"&&x.length>0&&_e.add(x);let Nt=(Array.isArray($.serial_lanes)?$.serial_lanes:[]).filter(x=>x&&/^s[1-5]$/.test(x.id)&&Array.isArray(x.entries)),Wt=rt($.lane_states),jt=typeof $.serial_lane_count=="number"?Math.max(0,Math.min(5,Math.floor($.serial_lane_count))):Math.min(5,Nt.length);q.set(G,jt),B.set(G,xt.length);let kt=new Map(Nt.map(x=>[x.id,x])),Xt=new Map;for(let x of Nt)for(let L of x.entries)L&&typeof L.bead_id=="string"&&Xt.set(L.bead_id,x.id);for(let[x,L]of Object.entries(rt($.bead_dependents))){let Ee=Array.isArray(L?.ids)?L.ids:[],He=rt(L?.root_dirs),Le=Pe.get(x)||{ids:new Set,root_dirs:{}};for(let f of Ee)typeof f=="string"&&f.length>0&&Le.ids.add(f);for(let[f,h]of Object.entries(He))typeof h=="string"&&h.length>0&&(Le.root_dirs[f]=h);Pe.set(x,Le)}for(let[x,L]of Object.entries(Be))Array.isArray(L)&&ne.set(x,L.filter(Ee=>typeof Ee=="string"&&Ee.length>0));let Zt=Array.isArray($.done)?$.done:[];for(let x of Zt)x&&typeof x.bead_id=="string"&&X.push({id:x.bead_id,root_dir:G,workspace_name:he});let Ft=new Map;for(let x of Zt)x&&typeof x.bead_id=="string"&&typeof x.added_at=="number"&&Ft.set(x.bead_id,x.added_at);let Ot=x=>({id:x,title:Tt[x]||x,root_dir:G,workspace_name:he,expected_revision:it,draggable:!1,...rt(Dt[x]).created_at?{created_at:rt(Dt[x]).created_at}:{},...rt(Dt[x]).updated_at?{updated_at:rt(Dt[x]).updated_at}:{}}),Qt=x=>{let L=Je[x]?.chips?.pr;return L&&typeof L.number=="number"&&typeof L.url=="string"?{pr_number:L.number,pr_url:L.url}:{}},xe=x=>Object.hasOwn(Be,x)?{blocked_by:Array.isArray(Be[x])?Be[x].filter(L=>typeof L=="string"&&L.length>0):[]}:{},E=(x,L)=>{let Ee=xe(x),He=wt[x],Le=He&&He.reason==="prerequisite_unmet"&&Array.isArray(He.blockers)?He.blockers:[],f=[...(L?.blockers||[]).map(I=>I.id),...Le.map(I=>I.id)].filter(I=>typeof I=="string"&&I.length>0);if(f.length===0)return Ee;let h=[...Ee.blocked_by||[]];for(let I of f)h.includes(I)||h.push(I);return{blocked_by:h}},fe=new Set;for(let[x,L]of Fd(ze,Ft,{discard_operations:ce,observations:nt,bead_timelines:we,provider_hold:rt($.provider_hold),auto_resume_pending:Array.isArray($.auto_resume_pending)?$.auto_resume_pending:[],account_catalog:rt($.account_catalog)})){fe.add(x);let Ee=L.run_state==="failed"?Sh(ze,L.attempt_id):null;Ee!==null&&ie.set(x,Ee);let He=et.get(L.attempt_id)||null,Le=U.get(`${G}\0${x}`),f=Le&&Le.rollup?Le.rollup:null,h=ml(gt,He?He.target_base:null),I=He?gl(He,et):!1,M=He&&He.quickfix_lane===!0&&He.quickfix_landing&&typeof He.quickfix_landing=="object"?He.quickfix_landing:null,_=M&&typeof M.reason=="string"&&M.reason.length>0?M.reason:null,b=M?ns({bead_id:x,merge_sha:M.head_sha,cleanup_cursor:M.cursor,cleanup_failed:_?{step:M.cursor,reason:_}:null,repo_operations:pt}):null;T.push({...Ot(x),lane:"running",...E(x,L.wait),...Xt.has(x)?{serial_lane_id:Xt.get(x)}:{},attempt_id:L.attempt_id,run_state:L.run_state,status:L.status||void 0,workflow:Je[x]||null,can_pause:L.can_pause,can_resume:L.can_resume,started_at:L.started_at,last_event_at:L.last_event_at,last_activity:L.last_activity,legs:L.legs,runner:L.runner,model:L.model,effort:L.effort,speed:L.speed,resumed_from:L.resumed_from,continuation_mode:L.continuation_mode,usage:L.usage,failure:L.failure||null,hold:L.hold||null,wait:L.wait||null,retry:L.retry||null,exec_chips:{orchestration:Ja(L),worker:wh(rt(Ke),Le,L.runner||null)},discard:rr(ce,x,{attempt_id:L.attempt_id,merged:L.failure?.confirmation==="merged"||rt(nt[x]).pr?.state==="MERGED"}),...f?{rollup:f}:{},...I?{conflict_resolution:!0}:{},...h?{base_exception:h}:{},...b?{landing:b}:{},badges:L.run_state==="paused"?["\u23F8 \uC77C\uC2DC\uC815\uC9C0"]:L.run_state==="failed"?["\u26A0 \uC2E4\uD328"]:L.run_state==="parked"?["\u23F8 \uC138\uC158 \uB300\uAE30"]:L.run_state==="retry_wait"?["\u21BB \uC7AC\uC2DC\uB3C4 \uB300\uAE30"]:L.run_state==="waiting"?["\u26D3 \uC120\uD589 \uB300\uAE30"]:L.run_state==="provider_hold"?["\uACF5\uAE09\uC790 \uBCF4\uB958"]:[],alert:L.run_state==="failed"})}for(let[x,L]of Iu(ze)){if(T.some(He=>He.id===x))continue;let Ee=L.attempt;T.push({...Ot(x),lane:"running",kind:"session",...xe(x),attempt_id:typeof Ee.attempt_id=="string"?Ee.attempt_id:"",run_state:"running",status:"running",non_occupying:!0,workflow:Je[x]||null,can_pause:!1,can_resume:!1,started_at:L.started_at,last_event_at:typeof Ee.last_event_at=="number"?Ee.last_event_at:null,last_activity:Ee.last_activity&&typeof Ee.last_activity=="object"?Ee.last_activity:null,legs:Array.isArray(Ee.legs)?Ee.legs:[],runner:typeof Ee.runner=="string"?Ee.runner:null,model:typeof Ee.model=="string"?Ee.model:null,effort:typeof Ee.effort=="string"?Ee.effort:null,speed:typeof Ee.speed=="string"?Ee.speed:null,resumed_from:null,continuation_mode:null,usage:Ee.usage&&typeof Ee.usage=="object"?Ee.usage:null,exec_chips:{orchestration:Ja(Ee),worker:null},discard:rr(ce,x,{merge_queued:!0}),badges:[L.origin==="auto"?"\uB9AC\uBDF0 \xB7 \uC790\uB3D9":"\uB9AC\uBDF0"],alert:!1})}for(let x of Array.isArray($.session_active)?$.session_active:[]){let L=x&&x.bead_id;typeof L!="string"||fe.has(L)||(fe.add(L),Array.isArray(x.blocked_by)&&x.blocked_by.length>0&&ne.set(L,x.blocked_by.filter(Ee=>typeof Ee=="string"&&Ee.length>0)),typeof x.title=="string"&&x.title.length>0&&le.set(L,x.title),T.push({...Ot(L),title:x.title||Tt[L]||L,lane:"running",kind:"session",status:"in_progress",started_at:fl(x.started_at)??fl(x.updated_at)??void 0,updated_at:fl(x.updated_at)??void 0,workflow:x.workflow||null,labels:Array.isArray(x.labels)?x.labels:[],spec_id:typeof x.spec_id=="string"?x.spec_id:"",blocked:x.blocked===!0,...Array.isArray(x.blocked_by)?{blocked_by:x.blocked_by.filter(Ee=>typeof Ee=="string"&&Ee.length>0)}:{},draggable:!1,can_pause:!1,can_resume:!1,exec_chips:null,usage:null,legs:[],last_activity:null,session_refs:Array.isArray(x.session_refs)?x.session_refs:[],badges:[],alert:!1}))}for(let x of Array.isArray($.pr_wait)?$.pr_wait:[]){let L=x&&x.bead_id;if(typeof L!="string"||fe.has(L))continue;fe.add(L);let Ee=rt(nt[L]),He=rt(Ee.pr),Le=Ee.gate?rt(Ee.gate):null,f=S.has(L),h=j.get(L)?.continuation_action||null,I=!!h&&h.continuation===null,M=Lt.active===L,_=x.external===!0,b=Bt[L]||null,ee=rt(Ze[L]),de=ns({bead_id:L,merge_sha:x.merge_sha,cleanup_cursor:x.cleanup_cursor,merge_progress:ee.merge_progress||null,cleanup_failed:b,repo_operations:pt}),Fe=qi(de),_t=!!Le&&Le.base_badge==="\uCDA9\uB3CC",Et=!!b&&["post_merge_jobs","child_sweep","branch_cleanup","parent_close"].includes(b.step)&&!!Le&&Le.tier==="merged",zt=_&&!!b&&!!Le&&Le.tier==="merged",lr=!!Le&&["closed_unmerged","review","undecidable"].includes(Le.tier),Ht=rr(ce,L,{external:_,merge_active:M||de?.step==="merge",merge_queued:f,cleanup_active:Fe,merged:!!b||Le?.tier==="merged"}),un=!!Ht.operation,Sr=gh(Ee.receipt_check);C.push({...Ot(L),lane:"pr_wait",...xe(L),...Sr.length>0?{receipt_badge:{codes:Sr}}:{},workflow:Je[L]||null,pr_number:typeof He.number=="number"?He.number:null,pr_url:typeof He.url=="string"?He.url:void 0,external:_,usage:tr(ze,L),merge_step:de,badges:I?["\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694"]:de?[Le?.tier==="merged"?"\uBA38\uC9C0\uB428":"\uBA38\uC9C0 \uC911"]:b?[Fr(b.step)?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${Fr(b.step)}`:"\uC815\uB9AC \uBA48\uCDA4"]:typeof Le?.gate_badge=="string"&&Le.gate_badge.length>0?[Le.gate_badge]:[],alert:de?de.failed===!0:!!b||lr,reason:b&&de?.active!==!0?Mi(b.step):"PR \uB300\uAE30",merge_action:Le?.tier==="merged"&&!Et&&!zt?!1:!f||I,merge_enabled:!un&&(I||Le?.enabled===!0||_t||Et||zt),merge_label:I?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":zt||Et?"\uC815\uB9AC \uC7AC\uC2DC\uB3C4":_t&&!Et?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":void 0,merge_title:I?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":un?Ht.error?`\uD3D0\uAE30 \uC2E4\uD328: ${Ht.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${Ht.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:zt?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uB2E4\uC2DC \uC2DC\uB3C4\uD569\uB2C8\uB2E4":Et?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC2DC\uB3C4\uD569\uB2C8\uB2E4":_t?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":Le?.enabled===!0?`\uBA38\uC9C0 (${Le.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4`:`\uBA38\uC9C0 \uBD88\uAC00: ${Le?.reason||"\uAD00\uCE21 \uB300\uAE30"}`,cancel_action:f&&!I,cancel_enabled:!M,continuation_mismatch:h?.mismatch||null,discard:Ht,discard_action:Ht.action,discard_enabled:Ht.enabled,discard_title:Ht.title})}let Ie=(x,L,Ee,He)=>{let Le=x&&x.bead_id;if(typeof Le!="string"||fe.has(Le))return null;fe.add(Le);let f=Mt[Le],h=rr(ce,Le),I=h.operation?h:null,M={...Ot(Le),lane:L,workflow:Je[Le]||null,draggable:!I,discard:I||void 0,reason:Md(wt,Le),seq:Ee+1,queue_position:Ee+1,queue_index:Ee,queue_length:He,badges:f?["\u23F8 REVISE \uD30C\uD0B9"]:[],alert:!!f,revise_action:!!f,revise_enabled:!!f&&!I,revise_title:f?f.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${f.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":""},_=E(Le,null);return Object.hasOwn(_,"blocked_by")&&(M.blocked_by=_.blocked_by),M};for(let x=0;x<xt.length;x++){let L=Ie(xt[x],"queue",x,xt.length);if(!L)continue;te.push(L);let Ee=D.get(G);Ee?Ee.push(L):D.set(G,[L])}let ht=x=>{let L=C.find(f=>f.id===x&&f.root_dir===G);if(L)return{id:x,title:L.title,badge:"PR \uB300\uAE30 \xB7 \uC810\uC720"};let Ee=T.find(f=>f.id===x&&f.root_dir===G),He=Ee?Ee.run_state:ih(ze,x),Le=He==="failed"||He==="orphaned"?"\uC2E4\uD328 \xB7 \uC810\uC720 \uC720\uC9C0":He==="paused"?"\uC77C\uC2DC\uC815\uC9C0 \xB7 \uC810\uC720":"\uC2E4\uD589 \uC911 \xB7 \uC810\uC720";return{id:x,title:Ee?Ee.title:Ot(x).title,badge:Le}},Ye=[];for(let x=0;x<Math.max(jt,Nt.length);x++){let L=`s${x+1}`,Ee=kt.get(L),He=Ee&&Array.isArray(Ee.entries)?Ee.entries:[],Le=rt(Wt[L]),f=Array.isArray(Le.occupied_by)?Le.occupied_by.filter(M=>typeof M=="string"):[],h=new Set(f),I=[];for(let M=0;M<He.length;M++){let _=He[M]&&He[M].bead_id;if(typeof _=="string"&&h.has(_)){fe.add(_);continue}let b=Ie(He[M],L,M,He.length);b&&(I.push(b),te.push(b))}I.length===0&&f.length===0&&(jt<=1||x>=jt)||Ye.push({id:L,index:x,items:I,raw_length:He.length,occupied_by:f,occupants:f.map(M=>ht(M)),corrections:Array.isArray(Le.corrections)?Le.corrections.length:0,cycle:Le.cycle===!0,...I.length===0&&f.length===0?{empty:!0}:{}})}O.set(G,Ye);let St=Array.from({length:jt},(x,L)=>{let Ee=`s${L+1}`,He=kt.get(Ee),Le=He&&Array.isArray(He.entries)?He.entries:[],f=rt(Wt[Ee]);return{id:Ee,index:Le.length,length:Le.length,occupied_by:Array.isArray(f.occupied_by)?f.occupied_by.filter(h=>typeof h=="string"):[]}});for(let x of Array.isArray($.runnable)?$.runnable:[]){let L=x&&x.bead_id;if(typeof L!="string"||fe.has(L))continue;fe.add(L);let Ee=x.workflow&&typeof x.workflow=="object"?x.workflow:null,He=Ee&&typeof Ee.route=="string"&&Ee.route||(typeof x.route=="string"?x.route:null),Le=hh(rt(Ke),x.exec_pins,He),f=Ho(x.rec,x.exec_pins);Array.isArray(x.blocked_by)&&x.blocked_by.length>0&&ne.set(L,x.blocked_by.filter(zt=>typeof zt=="string"&&zt.length>0)),typeof x.title=="string"&&x.title.length>0&&le.set(L,x.title),Array.isArray(x.scope)&&V.set(L,x.scope.filter(zt=>typeof zt=="string"&&zt.length>0));let h=Object.hasOwn(x,"eligible"),M=!h&&Object.hasOwn(x,"route")&&Object.hasOwn(x,"spec_state")&&Object.hasOwn(x,"has_description")&&Object.hasOwn(x,"awaiting_user")&&Object.hasOwn(x,"worker_ineligible")?rl({route:typeof x.route=="string"?x.route:"",spec:x.spec_state,has_description:x.has_description===!0,awaiting_user:x.awaiting_user===!0,worker_ineligible:x.worker_ineligible===!0},null):null,_=h?x.eligible!==!1:M?M.placeable:!0,b=M?M.worker_ineligible:x.worker_ineligible===!0,ee=_&&!b,de=M?{route_ok:M.route_ok,awaiting_user:M.awaiting_user,missing_description:M.missing_description,placement_spec:M.spec}:Object.hasOwn(x,"route_ok")?{route_ok:x.route_ok===!0,awaiting_user:x.awaiting_user===!0,missing_description:x.missing_description===!0,placement_spec:x.placement_spec}:null,Fe=[];!h&&M&&!M.placeable&&Fe.push(Nr(M)),typeof x.reason=="string"&&x.reason.length>0&&Fe.push(x.reason);let _t=Md(wt,L);_t&&Fe.push(_t);let Et=bh(L,x.release_info,p)?.map(zt=>({...zt,...jd({id:L,root_dir:G},zt.id)}));k.push({...Ot(L),title:x.title||Tt[L]||L,lane:"runnable",draggable:!h&&ee,queue_placeable:ee,...de||{},...b?{worker_ineligible:!0}:{},...x.session_preferred===!0?{session_preferred:!0,session_preferred_reason:typeof x.session_preferred_reason=="string"?x.session_preferred_reason:""}:{},...x.spec_after_blocker===!0?{spec_after_blocker:!0}:{},...Et?{dependency_chips:{released:Et}}:{},...x.dependents_info&&typeof x.dependents_info=="object"?{dependents_info:x.dependents_info}:{},reason:Fe.join(" \xB7 "),created_at:x.created_at??void 0,updated_at:x.updated_at??void 0,status:typeof x.status=="string"?x.status:void 0,labels:Array.isArray(x.labels)?x.labels:[],spec_id:typeof x.spec_id=="string"?x.spec_id:"",published:x.published===!0,workflow:Ee||(He?{route:He,chips:{route:He}}:null),...Le?{exec_chips:Le}:{},...f?{rec:f}:{},blocked:x.blocked===!0,...Array.isArray(x.blocked_by)?{blocked_by:x.blocked_by.filter(zt=>typeof zt=="string"&&zt.length>0)}:{},place_index:xt.length,place_lanes:St})}for(let x of Zt){let L=x&&x.bead_id;if(typeof L!="string"||fe.has(L)||(fe.add(L),i!==void 0&&typeof x.added_at=="number"&&x.added_at<i))continue;let Ee=ah(ze,L),He=Ee&&typeof Ee.done_kind=="string"?Ee.done_kind:null;re.push({...Ot(L),lane:"done",done:!0,done_layout:"three_line",usage:tr(ze,L),work_ms:gd(ze,L),done_at:typeof x.added_at=="number"?x.added_at:void 0,done_kind:He,...Qt(L),badges:[...He&&Ld[He]?[Ld[He]]:[],..._d(ze,L)]})}for(let x of Array.isArray($.session_done)?$.session_done:[]){let L=x&&(x.id||x.bead_id);typeof L!="string"||fe.has(L)||(fe.add(L),re.push({...Ot(L),...x,id:L,root_dir:G,workspace_name:he,expected_revision:it,lane:"done",done:!0}))}}if(U.size>0)for(let $ of[...k,...te,...T,...C,...re]){let G=U.get(`${$.root_dir}\0${$.id}`);if(!G||(typeof G.priority=="number"&&($.priority=G.priority),typeof G.from_id=="string"&&G.from_id.length>0&&($.from_id=G.from_id),$.lane==="done"&&Array.isArray(G.carried_to)&&G.carried_to.length>0&&($.carried_to=G.carried_to),!Object.hasOwn(G,"metadata")))continue;let he=rt(G.metadata);if($.rec=Ho(he),$.lane==="runnable"||$.lane.startsWith("s")||$.lane==="queue"){let Ke=kh(rt(m.get($.root_dir)),he,typeof G.route=="string"&&G.route.length>0?G.route:rt($.workflow).route);Ke&&($.exec_chips=Ke)}}let Z=new Map;o.forEach(($,G)=>{$&&typeof $.root_dir=="string"&&Z.set($.root_dir,G)});let be=n&&n.running_sort==="repo"?"repo":"started";T.sort(($,G)=>{let he=$.kind==="session",Ke=G.kind==="session";if(he!==Ke)return he?1:-1;if(he&&Ke){let Tt=Ni(G.updated_at)-Ni($.updated_at);return Tt!==0?Tt:$.id.localeCompare(G.id)}if(be==="repo"){let Tt=Z.get($.root_dir)??Number.MAX_SAFE_INTEGER,Dt=Z.get(G.root_dir)??Number.MAX_SAFE_INTEGER;if(Tt!==Dt)return Tt-Dt}let it=typeof $.started_at=="number"&&Number.isFinite($.started_at)?$.started_at:null,ze=typeof G.started_at=="number"&&Number.isFinite(G.started_at)?G.started_at:null;return it!==null&&ze!==null&&it!==ze?it-ze:it===null&&ze!==null?1:it!==null&&ze===null?-1:$.id.localeCompare(G.id)}),re.sort(($,G)=>(G.done_at??0)-($.done_at??0));let Oe=o.length>0?o:r.map($=>({root_dir:$&&$.root_dir,name:$&&$.name,auto_advance:$&&$.auto_advance,auto_merge:$&&$.auto_merge,slots:$&&$.slots,revision:$&&$.revision,runner_catalog:$&&$.runner_catalog})),ke=new Set(k.map($=>$.root_dir)),Ce=new Map;for(let $ of T)$.kind==="session"||$.run_state!=="running"||Ce.set($.root_dir,(Ce.get($.root_dir)||0)+1);let ot=new Map;for(let $ of re){let G=ot.get($.root_dir);G?G.push($):ot.set($.root_dir,[$])}let st={positions:new Map,resolutions:new Map,continuations:new Map,authorities:new Map,state:{active:null,failures:{},waiting:null},auto_excluded:[],running:!1},Q=[];for(let $ of Oe){if(!$||typeof $.root_dir!="string")continue;let G=D.get($.root_dir)||[],he=O.get($.root_dir)||[],Ke=G.length>0||he.some(Tt=>Tt.items.length>0||Tt.occupied_by.length>0);if(u!=="all"&&!Ke&&!ke.has($.root_dir))continue;let it=typeof $.slots=="number"&&$.slots>=ji?$.slots:ji,ze=Ce.get($.root_dir)||0;Q.push({live_count:ze,over_cap:ze>it,merge:K.get($.root_dir)||st,token_total:$h(ot.get($.root_dir)||[]),cleanup_failures:F.get($.root_dir)||[],declared_base:N.get($.root_dir)??null,repo_operations:Y.get($.root_dir)||[],root_dir:$.root_dir,name:$.name||$.root_dir,auto_advance:$.auto_advance===!0,auto_merge:$.auto_merge===!0,slots:it,revision:typeof $.revision=="number"?$.revision:0,runner_catalog:rt($.runner_catalog),items:G,sublanes:{parallel:G,serial:he},serial_lane_count:q.get($.root_dir)||0,raw_queue_length:B.get($.root_dir)||0})}let oe={runnable:k,runnable_all:k,runnable_hidden:{blocked:0,readiness:0},runnable_sections:[],runnable_flat:a==="updated_flat"||a==="as_given",queue:te,queue_groups:Q,running:T,pr_wait:C,done:re,parallel_rows:[],chain_lanes:[],cross_lanes_revision:l&&typeof l.revision=="number"?l.revision:null,cross_lanes_unreadable:l===null,parallel_raw_length:Object.fromEntries(B),owner_of:{}},se=td(oe);for(let $ of X)se.has($.id)||se.set($.id,{root_dir:$.root_dir,workspace_name:$.workspace_name,lane:"done",state:"done"});for(let $ of[...oe.queue,...oe.runnable,...oe.running,...oe.pr_wait]){if(!Object.hasOwn($,"blocked_by"))continue;let G=se.get($.id);$.blockers=($.blocked_by||[]).map(he=>nd(he,G,se,o))}for(let $ of[...oe.queue,...oe.runnable,...oe.running,...oe.pr_wait]){let G=($.blockers||[]).map(it=>({...pl($.id,it),...jd($,it.id,se)})),he=Od($.id,Oh(Pe.get($.id),$.dependents_info,$,se));if(G.length===0&&he.length===0)continue;let Ke={...$.dependency_chips||{},...G.length>0?{predecessors:G}:{},...he.length>0?{dependents:he}:{}};$.dependency_chips=Ke}Rh(oe,Te,V,se,o);let pe=rd(oe.queue_groups);for(let $ of oe.queue_groups)for(let G of $.sublanes.serial){let he=pe.get(od($.root_dir,G.id));he&&(G.cross_wait_peers=he)}oe.chain_lanes=Th(l&&Array.isArray(l.lanes)?l.lanes:[],ne,se,o,le,g,{armed_by_bead:H,failed_by_bead:ie,disarmed_lanes:_e},ve);let Se=new Map;for(let $ of[...oe.queue,...oe.runnable])Se.has($.id)||Se.set($.id,$);let me=new Set;for(let $ of oe.chain_lanes)for(let G of $.rows){if($.status==="confirmed"&&!G.unplaced&&!G.fixed&&me.add(G.id),!$.draft&&!G.unplaced)continue;let he=Se.get(G.id);he&&(he.cross_lane_chip={lane_id:$.lane_id,number:$.number,status:$.status,label:$.draft?`\uC5F0\uACB0 ${$.number} (draft)`:`\uC5F0\uACB0 ${$.number}`})}let Re=new Map(oe.chain_lanes.map($=>[$.lane_id,$]));for(let $ of[...oe.queue,...oe.running]){let G=H.get($.id);if(typeof G!="string"||G.length===0)continue;let he=Re.get(G);$.armed_lane_chip=he===void 0||he.status==="draft"?{lane_id:G,label:"\u25B6 \uC9C4\uD589 \uC911 \xB7 \uB808\uC778 \uC5C6\uC74C",orphan:!0}:{lane_id:G,label:`\u25B6 \uC5F0\uACB0 ${he.number}`,orphan:!1}}let je=[];for(let $ of D.values())for(let G of $)me.has(G.id)||je.push(G);je.sort(($,G)=>{let he=$.workspace_name.localeCompare(G.workspace_name);return he!==0?he:($.queue_index??0)-(G.queue_index??0)}),oe.parallel_rows=je;let Qe={};for(let[$,G]of se)typeof G.root_dir=="string"&&G.root_dir.length>0&&(Qe[$]=G.root_dir);for(let $ of oe.chain_lanes)for(let G of $.rows)!Object.hasOwn(Qe,G.id)&&G.root_dir.length>0&&g.has(G.root_dir)&&(Qe[G.id]=G.root_dir);oe.owner_of=Qe;let Ue=oe.runnable.length;oe.runnable_all=oe.runnable.slice();let J=oe.runnable,W=$=>s.show_blocked||$.blocked!==!0,qe=$=>s.readiness==="all"||(s.readiness==="ready"?$.queue_placeable===!0:$.queue_placeable!==!0);if(d==="per_control"){let $=[],G=0,he=0;for(let Ke of J){let it=W(Ke),ze=qe(Ke);it&&ze?$.push(Ke):!it&&ze?G+=1:it&&!ze&&(he+=1)}J=$,oe.runnable_hidden={blocked:G,readiness:he}}else{J=J.filter(W);let $=J.length;J=J.filter(qe),oe.runnable_hidden={blocked:Ue-$,readiness:$-J.length}}let dt=($,G)=>{let he=Ni(G.updated_at)-Ni($.updated_at);return he!==0?he:$.id.localeCompare(G.id)},We=a==="repo_spec"?($,G)=>{let he=$.queue_placeable===!0?0:1,Ke=G.queue_placeable===!0?0:1;if(he!==Ke)return he-Ke;let it=$.published===!0?0:1,ze=G.published===!0?0:1;return it!==ze?it-ze:dt($,G)}:dt;if(a==="as_given")oe.runnable=J,oe.runnable_sections=[];else if(a==="updated_flat")oe.runnable=J.slice().sort(dt),oe.runnable_sections=[];else{let $=new Map;for(let Ke of J){let it=$.get(Ke.root_dir);it?it.push(Ke):$.set(Ke.root_dir,[Ke])}let G=[],he=[];for(let Ke of Oe){if(!Ke||typeof Ke.root_dir!="string")continue;let it=($.get(Ke.root_dir)||[]).slice().sort(We);$.delete(Ke.root_dir),it.length!==0&&(G.push({root_dir:Ke.root_dir,name:Ke.name||Ke.root_dir,items:it.map(ze=>({...ze,workspace_name:""}))}),he.push(...it))}for(let[Ke,it]of $){let ze=it.slice().sort(We);G.push({root_dir:Ke,name:ze[0]?.workspace_name||Ke,items:ze.map(Tt=>({...Tt,workspace_name:""}))}),he.push(...ze)}oe.runnable=he,oe.runnable_sections=G}let Xe=Ih(n?n.search:void 0);return Xe&&Lh(oe,Xe),oe}function Hd(e,t){let n=new Map(e.map((a,u)=>[a,u])),r=new Map(e.map(a=>[a,new Set]));for(let a of t)a.blocker!==a.blockee&&n.has(a.blocker)&&n.has(a.blockee)&&r.get(a.blockee).add(a.blocker);let o=new Set,i=[];for(;i.length<e.length;){let a=e.find(u=>{if(o.has(u))return!1;for(let d of r.get(u))if(!o.has(d))return!1;return!0});if(a===void 0)return{order:[...e],corrections:[],cycle:!0};o.add(a),i.push(a)}let s=[],l=new Map(i.map((a,u)=>[a,u]));for(let a of i){let u=null;for(let d of r.get(a)){let p=Number(n.get(a))<Number(n.get(d)),m=Number(l.get(a))>Number(l.get(d));p&&m&&(u===null||Number(l.get(d))>Number(l.get(u)))&&(u=d)}u!==null&&s.push({bead_id:a,after:u})}return{order:i,corrections:s,cycle:!1}}var Dh="\uB2E4\uB978 \uB808\uD3EC \uC774\uC288\uB294 \uC774 \uC9C1\uB82C \uB808\uC778\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",Fi="\uC758\uC874 \uC790\uB8CC \uBBF8\uD655\uC815 \u2014 \uAD50\uC815 \uBCF4\uB958",Ph="Worker \uD0ED \uC9C1\uB82C \uB808\uC778\uC5D0\uC11C \uBA3C\uC800 \uBE7C \uC8FC\uC138\uC694",Mh="\uC774\uBBF8 \uC9C4\uD589 \uC911\uC778 \uC774\uC288 \uC55E\uC5D0\uB294 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",vo="\uC5F0\uACB0 \uB808\uC778\uC774 \uC5C6\uC2B5\uB2C8\uB2E4";function ss(e,t){return`${e}\0${t}`}function qh(e,t){let n=new Set(e),r=new Map;for(let o of e){let i=t.placed_members.has(o)?t.snapshot_blocked_by:t.runnable_blocked_by,s=i instanceof Map?i.get(o):void 0;if(!Array.isArray(s))return null;r.set(o,s.filter(l=>l!==o&&n.has(l)))}return r}function Nh(e,t){if(e.status!=="confirmed")return 0;let n=-1;return e.entries.forEach((r,o)=>{t.fixed_members.has(r.bead_id)&&(n=o)}),n+1}function ls(e,t){let n=e.entries,r=n.map(p=>p.bead_id),o=qh(r,t);if(o===null)return{entries:n,corrections:[],cycle:!1,held:!0,mismatched:[]};let i=[];for(let[p,m]of o)for(let g of m)i.push({blocker:g,blockee:p});let s=Nh(e,t),l=new Map(r.map((p,m)=>[p,m])),a=r.slice(0,s).filter(p=>o.get(p).some(m=>Number(l.get(m))>Number(l.get(p)))),u=Hd(r.slice(s),i);if(u.cycle)return{entries:n,corrections:[],cycle:!0,held:!1,mismatched:a};let d=new Map(n.map(p=>[p.bead_id,p]));return{entries:[...n.slice(0,s),...u.order.map(p=>d.get(p))],corrections:u.corrections,cycle:!1,held:!1,mismatched:a}}function Gd(e,t){let n=t.cross_lanes.get(e);return n===void 0?null:ls(n,t)}function jh(e,t){if(!(t.corrections.length===0&&!t.cycle&&!t.held&&t.mismatched.length===0))return{lane_id:e,corrected:t.corrections.length,cycle:t.cycle,held:t.held,mismatched:t.mismatched}}function Fh(e){return`${e}\uC758 \uB808\uD3EC\uB97C \uC54C \uC218 \uC5C6\uC5B4 \uC758\uC874\uC744 \uBC14\uAFC0 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4`}function Bh(e){let t=new Map;for(let[n,r]of e)t.set(n,r.slice());return t}function hl(e,t,n){let r=new Set([t]),o=[t];for(;o.length>0;){let i=o.pop();for(let s of e.get(i)||[]){if(s===n)return!0;r.has(s)||(r.add(s),o.push(s))}}return!1}function Uh(e,t){let n=new Set;for(let[s,l]of t)for(let a of l)n.add(ss(s,a));let r=new Map,o=new Map;for(let s of e){let l=ss(s.a,s.b);r.set(l,s),o.set(l,s.type==="dep-add")}let i=[];for(let s of e){let l=ss(s.a,s.b);r.get(l)===s&&o.get(l)!==n.has(l)&&i.push(s)}return i}function Wh(e,t,n){let r=e.parallel_rows,o=Math.max(0,Math.min(r.length,n)),i=r[o];if(i&&i.root_dir===t)return i.queue_index;for(let s=o-1;s>=0;s--)if(r[s].root_dir===t)return r[s].queue_index+1;for(let s=o;s<r.length;s++)if(r[s].root_dir===t)return r[s].queue_index;return e.parallel_raw_length.get(t)??0}function zh(e,t){return e.parallel_rows.some(n=>n.root_dir===t)}function Kd(e,t,n,r){return{type:"worker-queue-place",payload:{bead_id:e,...r?{lane:r}:{},index:n},root_dir:t}}function bl(e,t){let n=0;for(let r of e.cross_lanes.keys())if(n+=1,r===t)return n;return n+1}function cs(e){let t=Bh(e.blocked_by_map),n=[],r=new Set,o={refusal:null},i=u=>{let d=e.owner_of.get(u);return typeof d!="string"||d.length===0?(o.refusal=Fh(u),null):d};return{graph:t,dep_ops:n,state:o,ownerOf:i,addDep:(u,d,p)=>{if(o.refusal!==null||u===d)return;let m=t.get(u)||[];if(m.includes(d))return;let g=i(u);if(g!==null){if(hl(t,d,u)){o.refusal=`\uC758\uC874 \uC0AC\uC774\uD074\uC774 \uC0DD\uAE41\uB2C8\uB2E4 \u2014 ${u}\uAC00 \uC774\uBBF8 ${d}\uB97C \uB9C9\uACE0 \uC788\uC2B5\uB2C8\uB2E4`;return}t.set(u,[...m,d]),p!==void 0&&r.add(ss(u,d)),n.push({type:"dep-add",a:u,b:d,root_dir:g,...p===void 0?{}:{lane_id:p}})}},removeDep:(u,d)=>{if(o.refusal!==null||u===d)return;let p=t.get(u)||[];if(!p.includes(d))return;let m=i(u);m!==null&&(t.set(u,p.filter(g=>g!==d)),n.push({type:"dep-remove",a:u,b:d,root_dir:m}))},laneCreated:(u,d)=>r.has(ss(u,d))}}function us(e,t,n,r,o={}){if(e.state.refusal!==null)return{refused:e.state.refusal};let i=Uh(e.dep_ops,t.blocked_by_map),s=i.filter(d=>d.type==="dep-remove"),l=i.filter(d=>d.type==="dep-add"),a=o.disarm_ops??[],u=o.lane_id===void 0||o.correction===void 0?void 0:jh(o.lane_id,o.correction);return{lane_ops:n,ops:[...s,...a,...l,...r],lane_op_index:s.length+a.length,...u===void 0?{}:{correction:u}}}function Yd(e,t,n){for(let r=1;r<t.length;r+=1)e.addDep(t[r].bead_id,t[r-1].bead_id,n)}function is(e,t){return t>0&&e.entries[t]?.dep_created_by_lane===!0}function Vd(e,t,n,r){if(t.status!=="confirmed")return[];let o=[],i=new Map;for(let s of r){let l=e.owner_of.get(s.bead_id)||s.root_dir;typeof l!="string"||l.length===0||i.set(l,[...i.get(l)||[],s.bead_id])}for(let[s,l]of i)o.push({type:"worker-queue-disarm",payload:{bead_ids:l,lane_id:n},root_dir:s});return o}function as(e){return e.map(t=>({bead_id:t.bead_id,root_dir:t.root_dir}))}function Bi(e,t){return e.length===t.length&&e.every((n,r)=>n.bead_id===t[r].bead_id&&n.root_dir===t[r].root_dir)}function Ui(e,t,n){let r=cs(n),o=[],i=[],s=[],l,a=n.owner_lane_of.get(e.bead_id),u=e.kind==="chain"?e.lane_id??a:void 0,d=u===void 0?void 0:n.cross_lanes.get(u);if(t.kind==="repo-serial"&&e.root_dir!==t.root_dir)return{refused:Dh};if(t.kind==="chain"){if(e.kind==="repo-serial")return{refused:Ph};if(e.kind!=="chain"&&typeof a=="string"&&a!==t.lane_id&&n.cross_lanes.has(a))return{refused:`\uC774\uBBF8 \uC5F0\uACB0 ${bl(n,a)}\uC5D0 \uC788\uC2B5\uB2C8\uB2E4`};if(!n.cross_lanes.has(t.lane_id))return{refused:vo}}if(e.kind==="chain"&&d===void 0)return{refused:vo};let p=()=>{if(d===void 0||d.status!=="confirmed")return;let k=d.entries.findIndex(X=>X.bead_id===e.bead_id);if(k<0)return;let T=k>0?d.entries[k-1]:null,C=k+1<d.entries.length?d.entries[k+1]:null,te=is(d,k),re=C!==null&&is(d,k+1);te&&T!==null&&r.removeDep(e.bead_id,T.bead_id),re&&C!==null&&r.removeDep(C.bead_id,e.bead_id),(te||re)&&T!==null&&C!==null&&r.addDep(C.bead_id,T.bead_id,u)},m=(k,T)=>{let C=n.cross_lanes.get(k),te=C.entries.findIndex(N=>N.bead_id===e.bead_id),re=C.entries.filter(N=>N.bead_id!==e.bead_id),X=Math.max(0,Math.min(re.length,te>=0&&T>te?T-1:T)),D=-1;if(re.forEach((N,Y)=>{n.fixed_members.has(N.bead_id)&&(D=Y)}),X<=D){r.state.refusal=Mh;return}let O=te>=0?C.entries[te]:d?.entries.find(N=>N.bead_id===e.bead_id)??{bead_id:e.bead_id,root_dir:e.root_dir};l=ls({status:C.status,entries:[...re.slice(0,X),O,...re.slice(X)]},n);let q=l.entries;if(Bi(q,C.entries)||o.push({type:"monitor-lane-update",payload:{lane_id:k,entries:as(q)}}),C.status!=="confirmed")return;let B=q.findIndex(N=>N.bead_id===e.bead_id),K=B>0?q[B-1].bead_id:null,F=B+1<q.length?q[B+1].bead_id:null;if(K===null){F!==null&&r.addDep(F,e.bead_id,k);return}if(r.addDep(e.bead_id,K,k),F!==null&&(r.graph.get(F)||[]).includes(K)){let N=C.entries.findIndex(Y=>Y.bead_id===F);(r.laneCreated(F,K)||N>0&&C.entries[N-1].bead_id===K&&is(C,N))&&r.removeDep(F,K),r.addDep(F,e.bead_id,k)}},g=typeof e.queue_index=="number"?e.queue_index:n.queue_index_of.get(e.bead_id);if(e.kind==="chain"&&(p(),d!==void 0&&(t.kind!=="chain"||t.lane_id!==u))){let k=d.entries.filter(C=>C.bead_id!==e.bead_id),T=d.status==="confirmed"&&k.length<2?d.entries:d.entries.filter(C=>C.bead_id===e.bead_id);s.push(...Vd(n,d,u,T)),o.push({type:"monitor-lane-update",payload:{lane_id:u,entries:as(k)}})}if(t.kind==="chain"&&m(t.lane_id,t.marker_index),r.state.refusal!==null)return{refused:r.state.refusal};if(t.kind==="candidate")e.kind!=="candidate"&&i.push({type:"worker-queue-remove",payload:{bead_id:e.bead_id},root_dir:e.root_dir});else if(t.kind==="parallel"){let k=Wh(n,e.root_dir,t.marker_index);if(e.kind==="candidate"||e.kind==="repo-serial")i.push(Kd(e.bead_id,e.root_dir,k));else if(e.kind==="parallel"){let T=n.parallel_rows,C=T[Math.max(0,Math.min(T.length,t.marker_index))];if(!(!!C&&C.bead_id===e.bead_id)&&zh(n,e.root_dir)&&g!==void 0){let re=g>k?k:k-1;re>=0&&re!==g&&i.push({type:"worker-queue-reorder",payload:{bead_id:e.bead_id,to_index:re},root_dir:e.root_dir})}}}else if(t.kind!=="chain")if(e.kind==="repo-serial"&&e.lane_id===t.lane_id){if(g!==void 0&&t.index!==g){let k=g>t.index?t.index:t.index-1;k>=0&&k!==g&&i.push({type:"worker-queue-reorder",payload:{bead_id:e.bead_id,lane:t.lane_id,to_index:k},root_dir:e.root_dir})}}else i.push(Kd(e.bead_id,e.root_dir,t.index,t.lane_id));return us(r,n,o,i,{disarm_ops:s,...t.kind==="chain"?{lane_id:t.lane_id,correction:l}:{}})}function Qd(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:vo};if(n.entries.length<2)return{refused:"\uD655\uC815\uD558\uB824\uBA74 \uBA64\uBC84\uAC00 2\uAC1C \uC774\uC0C1\uC774\uC5B4\uC57C \uD569\uB2C8\uB2E4"};let r=ls(n,t);if(r.held)return{refused:Fi};let o=r.entries,i=cs(t),s=[];Yd(i,o,e);let l=Bi(o,n.entries)?[]:[{type:"monitor-lane-update",payload:{lane_id:e,entries:as(o)}}];return l.push({type:"monitor-lane-confirm",payload:{lane_id:e}}),us(i,t,l,s,{lane_id:e,correction:r})}function Xd(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:vo};let r=ls(n,t),o=r.entries,i=cs(t),s=[];Yd(i,o,e);let l=Bi(o,n.entries)?[]:[{type:"monitor-lane-update",payload:{lane_id:e,entries:as(o)}}];return us(i,t,l,s,{lane_id:e,correction:r})}function Zd(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:vo};let r=ls(n,t),o=r.entries;return us(cs(t),t,Bi(o,n.entries)?[]:[{type:"monitor-lane-update",payload:{lane_id:e,entries:as(o)}}],[],{lane_id:e,correction:r})}function Jd(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:vo};let r=cs(t);if(n.status==="confirmed")for(let o=1;o<n.entries.length;o+=1)is(n,o)&&r.removeDep(n.entries[o].bead_id,n.entries[o-1].bead_id);return us(r,t,[{type:"monitor-lane-remove",payload:{lane_id:e}}],[],{disarm_ops:Vd(t,n,e,n.entries)})}function ep(e,t){let n=t.cross_lanes.get(e);if(n===void 0||n.status!=="confirmed")return null;let r=[],o=[];for(let s=1;s<n.entries.length;s+=1){let l=`  ${n.entries[s].bead_id} \u2190 ${n.entries[s-1].bead_id}`;is(n,s)?r.push(l):o.push(`${l} (\uB808\uC778\uC774 \uB9CC\uB4E4\uC9C0 \uC54A\uC74C)`)}let i=`\uC5F0\uACB0 ${bl(t,e)}\uC744 \uC9C0\uC6C1\uB2C8\uB2E4.`;return r.length===0?`${i}
\uC758\uC874\uC740 \uADF8\uB300\uB85C \uB461\uB2C8\uB2E4`:[i,"\uD568\uAED8 \uC81C\uAC70\uD560 \uC758\uC874:",...r,...o.length===0?[]:["\uADF8\uB300\uB85C \uB450\uB294 \uC758\uC874:",...o]].join(`
`)}function tp(e){let t=new Map;for(let n of e)n.type!=="dep-add"||typeof n.lane_id!="string"||t.set(n.lane_id,[...t.get(n.lane_id)||[],{bead_id:n.a,after:n.b}]);return[...t].map(([n,r])=>({lane_id:n,pairs:r}))}function np(e,t){let n=new Map(e.map((r,o)=>[r.bead_id,o]));return t.filter(r=>{let o=n.get(r.bead_id);return o!==void 0&&o>0&&e[o-1].bead_id===r.after})}function yl(e,t){if(e!==null){let n=t.owner_lane_of.get(e.bead_id);if(typeof n=="string"&&t.cross_lanes.has(n))return{refused:`\uC774\uBBF8 \uC5F0\uACB0 ${bl(t,n)}\uC5D0 \uC788\uC2B5\uB2C8\uB2E4`}}return{lane_ops:[{type:"monitor-lane-create",payload:{entries:e===null?[]:[e]}}],ops:[],lane_op_index:0}}var Hh="\uC0AC\uC774\uD074";function Kh(e){let t=new Map,n=r=>Array.isArray(r)?r.filter(o=>typeof o=="string"&&o.length>0):[];for(let r of Array.isArray(e)?e:[]){if(!r||typeof r!="object")continue;let o=r.bead_blocked_by&&typeof r.bead_blocked_by=="object"?r.bead_blocked_by:{};for(let[i,s]of Object.entries(o))Array.isArray(s)&&t.set(i,n(s));for(let i of[...Array.isArray(r.runnable)?r.runnable:[],...Array.isArray(r.session_active)?r.session_active:[]])i&&typeof i.bead_id=="string"&&Array.isArray(i.blocked_by)&&i.blocked_by.length>0&&t.set(i.bead_id,n(i.blocked_by))}return t}function vl(e,t,n){let r=yr(e,t),o=[],i=new Set,s=(a,u)=>{for(let d of a)i.has(d.id)||(i.add(d.id),o.push({bead_id:d.id,root_dir:d.root_dir,workspace_name:d.workspace_name,title:d.title,lane:u}))};s(r.running,"running"),s(r.pr_wait,"pr_wait"),s(r.queue,"queue"),s(r.runnable_all,"runnable");let l=n&&typeof n.root_dir=="string"&&n.root_dir.length?n.root_dir:null;return{issues:l===null?o:o.filter(a=>a.root_dir===l),blocked_by_map:Kh(e)}}function rp(e,t){let n=new Map;for(let s of t.issues)!s||typeof s.bead_id!="string"||s.bead_id.length===0||n.has(s.bead_id)||n.set(s.bead_id,s);let r=n.get(e)?.root_dir,o=t.blocked_by_map.get(e)||[],i=[];for(let s of n.values()){if(s.bead_id===e||s.lane==="done"||o.includes(s.bead_id))continue;let l=hl(t.blocked_by_map,s.bead_id,e);i.push({...s,disabled:l,...l?{reason:Hh}:{}})}return i.sort((s,l)=>{let a=r!==void 0&&s.root_dir===r,u=r!==void 0&&l.root_dir===r;return a!==u?a?-1:1:s.bead_id.localeCompare(l.bead_id)}),i}function op(e,t){let n=t.trim().toLowerCase();return n.length===0?e.slice():e.filter(r=>r.bead_id.toLowerCase().includes(n)||r.title.toLowerCase().includes(n))}var Gh=/^\S+-\S+$/;function sp(e){return Gh.test(e.trim())}var{entries:_p,setPrototypeOf:ip,isFrozen:Yh,getPrototypeOf:Vh,getOwnPropertyDescriptor:Qh}=Object,{freeze:bn,seal:En,create:El}=Object,{apply:Tl,construct:Cl}=typeof Reflect<"u"&&Reflect;bn||(bn=function(t){return t});En||(En=function(t){return t});Tl||(Tl=function(t,n){for(var r=arguments.length,o=new Array(r>2?r-2:0),i=2;i<r;i++)o[i-2]=arguments[i];return t.apply(n,o)});Cl||(Cl=function(t){for(var n=arguments.length,r=new Array(n>1?n-1:0),o=1;o<n;o++)r[o-1]=arguments[o];return new t(...r)});var Wi=yn(Array.prototype.forEach),Xh=yn(Array.prototype.lastIndexOf),ap=yn(Array.prototype.pop),ds=yn(Array.prototype.push),Zh=yn(Array.prototype.splice),Hi=yn(String.prototype.toLowerCase),kl=yn(String.prototype.toString),wl=yn(String.prototype.match),ps=yn(String.prototype.replace),Jh=yn(String.prototype.indexOf),eb=yn(String.prototype.trim),qn=yn(Object.prototype.hasOwnProperty),hn=yn(RegExp.prototype.test),fs=tb(TypeError);function yn(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var n=arguments.length,r=new Array(n>1?n-1:0),o=1;o<n;o++)r[o-1]=arguments[o];return Tl(e,t,r)}}function tb(e){return function(){for(var t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];return Cl(e,n)}}function At(e,t){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:Hi;ip&&ip(e,null);let r=t.length;for(;r--;){let o=t[r];if(typeof o=="string"){let i=n(o);i!==o&&(Yh(t)||(t[r]=i),o=i)}e[o]=!0}return e}function nb(e){for(let t=0;t<e.length;t++)qn(e,t)||(e[t]=null);return e}function or(e){let t=El(null);for(let[n,r]of _p(e))qn(e,n)&&(Array.isArray(r)?t[n]=nb(r):r&&typeof r=="object"&&r.constructor===Object?t[n]=or(r):t[n]=r);return t}function _s(e,t){for(;e!==null;){let r=Qh(e,t);if(r){if(r.get)return yn(r.get);if(typeof r.value=="function")return yn(r.value)}e=Vh(e)}function n(){return null}return n}var lp=bn(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),$l=bn(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),xl=bn(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),rb=bn(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),Al=bn(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),ob=bn(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),cp=bn(["#text"]),up=bn(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),Sl=bn(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),dp=bn(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),zi=bn(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),sb=En(/\{\{[\w\W]*|[\w\W]*\}\}/gm),ib=En(/<%[\w\W]*|[\w\W]*%>/gm),ab=En(/\$\{[\w\W]*/gm),lb=En(/^data-[\-\w.\u00B7-\uFFFF]+$/),cb=En(/^aria-[\-\w]+$/),mp=En(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),ub=En(/^(?:\w+script|data):/i),db=En(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),gp=En(/^html$/i),pb=En(/^[a-z][.\w]*(-[.\w]+)+$/i),pp=Object.freeze({__proto__:null,ARIA_ATTR:cb,ATTR_WHITESPACE:db,CUSTOM_ELEMENT:pb,DATA_ATTR:lb,DOCTYPE_NAME:gp,ERB_EXPR:ib,IS_ALLOWED_URI:mp,IS_SCRIPT_OR_DATA:ub,MUSTACHE_EXPR:sb,TMPLIT_EXPR:ab}),ms={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,progressingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},fb=function(){return typeof window>"u"?null:window},_b=function(t,n){if(typeof t!="object"||typeof t.createPolicy!="function")return null;let r=null,o="data-tt-policy-suffix";n&&n.hasAttribute(o)&&(r=n.getAttribute(o));let i="dompurify"+(r?"#"+r:"");try{return t.createPolicy(i,{createHTML(s){return s},createScriptURL(s){return s}})}catch{return console.warn("TrustedTypes policy "+i+" could not be created."),null}},fp=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function hp(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:fb(),t=xe=>hp(xe);if(t.version="3.3.0",t.removed=[],!e||!e.document||e.document.nodeType!==ms.document||!e.Element)return t.isSupported=!1,t;let{document:n}=e,r=n,o=r.currentScript,{DocumentFragment:i,HTMLTemplateElement:s,Node:l,Element:a,NodeFilter:u,NamedNodeMap:d=e.NamedNodeMap||e.MozNamedAttrMap,HTMLFormElement:p,DOMParser:m,trustedTypes:g}=e,k=a.prototype,T=_s(k,"cloneNode"),C=_s(k,"remove"),te=_s(k,"nextSibling"),re=_s(k,"childNodes"),X=_s(k,"parentNode");if(typeof s=="function"){let xe=n.createElement("template");xe.content&&xe.content.ownerDocument&&(n=xe.content.ownerDocument)}let D,O="",{implementation:q,createNodeIterator:B,createDocumentFragment:K,getElementsByTagName:F}=n,{importNode:N}=r,Y=fp();t.isSupported=typeof _p=="function"&&typeof X=="function"&&q&&q.createHTMLDocument!==void 0;let{MUSTACHE_EXPR:U,ERB_EXPR:ne,TMPLIT_EXPR:ve,DATA_ATTR:Pe,ARIA_ATTR:H,IS_SCRIPT_OR_DATA:ie,ATTR_WHITESPACE:_e,CUSTOM_ELEMENT:Te}=pp,{IS_ALLOWED_URI:V}=pp,le=null,Z=At({},[...lp,...$l,...xl,...Al,...cp]),be=null,Oe=At({},[...up,...Sl,...dp,...zi]),ke=Object.seal(El(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),Ce=null,ot=null,st=Object.seal(El(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}})),Q=!0,oe=!0,se=!1,pe=!0,Se=!1,me=!0,Re=!1,je=!1,Qe=!1,Ue=!1,J=!1,W=!1,qe=!0,dt=!1,at="user-content-",We=!0,Xe=!1,$={},G=null,he=At({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]),Ke=null,it=At({},["audio","video","img","source","image","track"]),ze=null,Tt=At({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),Dt="http://www.w3.org/1998/Math/MathML",nt="http://www.w3.org/2000/svg",wt="http://www.w3.org/1999/xhtml",Mt=wt,Lt=!1,Bt=null,ce=At({},[Dt,nt,wt],kl),we=At({},["mi","mo","mn","ms","mtext"]),Be=At({},["annotation-xml"]),Je=At({},["title","style","font","a","script"]),Ze=null,pt=["application/xhtml+xml","text/html"],gt="text/html",et=null,Ne=null,S=n.createElement("form"),j=function(E){return E instanceof RegExp||E instanceof Function},z=function(){let E=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(Ne&&Ne===E)){if((!E||typeof E!="object")&&(E={}),E=or(E),Ze=pt.indexOf(E.PARSER_MEDIA_TYPE)===-1?gt:E.PARSER_MEDIA_TYPE,et=Ze==="application/xhtml+xml"?kl:Hi,le=qn(E,"ALLOWED_TAGS")?At({},E.ALLOWED_TAGS,et):Z,be=qn(E,"ALLOWED_ATTR")?At({},E.ALLOWED_ATTR,et):Oe,Bt=qn(E,"ALLOWED_NAMESPACES")?At({},E.ALLOWED_NAMESPACES,kl):ce,ze=qn(E,"ADD_URI_SAFE_ATTR")?At(or(Tt),E.ADD_URI_SAFE_ATTR,et):Tt,Ke=qn(E,"ADD_DATA_URI_TAGS")?At(or(it),E.ADD_DATA_URI_TAGS,et):it,G=qn(E,"FORBID_CONTENTS")?At({},E.FORBID_CONTENTS,et):he,Ce=qn(E,"FORBID_TAGS")?At({},E.FORBID_TAGS,et):or({}),ot=qn(E,"FORBID_ATTR")?At({},E.FORBID_ATTR,et):or({}),$=qn(E,"USE_PROFILES")?E.USE_PROFILES:!1,Q=E.ALLOW_ARIA_ATTR!==!1,oe=E.ALLOW_DATA_ATTR!==!1,se=E.ALLOW_UNKNOWN_PROTOCOLS||!1,pe=E.ALLOW_SELF_CLOSE_IN_ATTR!==!1,Se=E.SAFE_FOR_TEMPLATES||!1,me=E.SAFE_FOR_XML!==!1,Re=E.WHOLE_DOCUMENT||!1,Ue=E.RETURN_DOM||!1,J=E.RETURN_DOM_FRAGMENT||!1,W=E.RETURN_TRUSTED_TYPE||!1,Qe=E.FORCE_BODY||!1,qe=E.SANITIZE_DOM!==!1,dt=E.SANITIZE_NAMED_PROPS||!1,We=E.KEEP_CONTENT!==!1,Xe=E.IN_PLACE||!1,V=E.ALLOWED_URI_REGEXP||mp,Mt=E.NAMESPACE||wt,we=E.MATHML_TEXT_INTEGRATION_POINTS||we,Be=E.HTML_INTEGRATION_POINTS||Be,ke=E.CUSTOM_ELEMENT_HANDLING||{},E.CUSTOM_ELEMENT_HANDLING&&j(E.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(ke.tagNameCheck=E.CUSTOM_ELEMENT_HANDLING.tagNameCheck),E.CUSTOM_ELEMENT_HANDLING&&j(E.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(ke.attributeNameCheck=E.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),E.CUSTOM_ELEMENT_HANDLING&&typeof E.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(ke.allowCustomizedBuiltInElements=E.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),Se&&(oe=!1),J&&(Ue=!0),$&&(le=At({},cp),be=[],$.html===!0&&(At(le,lp),At(be,up)),$.svg===!0&&(At(le,$l),At(be,Sl),At(be,zi)),$.svgFilters===!0&&(At(le,xl),At(be,Sl),At(be,zi)),$.mathMl===!0&&(At(le,Al),At(be,dp),At(be,zi))),E.ADD_TAGS&&(typeof E.ADD_TAGS=="function"?st.tagCheck=E.ADD_TAGS:(le===Z&&(le=or(le)),At(le,E.ADD_TAGS,et))),E.ADD_ATTR&&(typeof E.ADD_ATTR=="function"?st.attributeCheck=E.ADD_ATTR:(be===Oe&&(be=or(be)),At(be,E.ADD_ATTR,et))),E.ADD_URI_SAFE_ATTR&&At(ze,E.ADD_URI_SAFE_ATTR,et),E.FORBID_CONTENTS&&(G===he&&(G=or(G)),At(G,E.FORBID_CONTENTS,et)),We&&(le["#text"]=!0),Re&&At(le,["html","head","body"]),le.table&&(At(le,["tbody"]),delete Ce.tbody),E.TRUSTED_TYPES_POLICY){if(typeof E.TRUSTED_TYPES_POLICY.createHTML!="function")throw fs('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof E.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw fs('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');D=E.TRUSTED_TYPES_POLICY,O=D.createHTML("")}else D===void 0&&(D=_b(g,o)),D!==null&&typeof O=="string"&&(O=D.createHTML(""));bn&&bn(E),Ne=E}},Ae=At({},[...$l,...xl,...rb]),ye=At({},[...Al,...ob]),ft=function(E){let fe=X(E);(!fe||!fe.tagName)&&(fe={namespaceURI:Mt,tagName:"template"});let Ie=Hi(E.tagName),ht=Hi(fe.tagName);return Bt[E.namespaceURI]?E.namespaceURI===nt?fe.namespaceURI===wt?Ie==="svg":fe.namespaceURI===Dt?Ie==="svg"&&(ht==="annotation-xml"||we[ht]):!!Ae[Ie]:E.namespaceURI===Dt?fe.namespaceURI===wt?Ie==="math":fe.namespaceURI===nt?Ie==="math"&&Be[ht]:!!ye[Ie]:E.namespaceURI===wt?fe.namespaceURI===nt&&!Be[ht]||fe.namespaceURI===Dt&&!we[ht]?!1:!ye[Ie]&&(Je[Ie]||!Ae[Ie]):!!(Ze==="application/xhtml+xml"&&Bt[E.namespaceURI]):!1},$t=function(E){ds(t.removed,{element:E});try{X(E).removeChild(E)}catch{C(E)}},yt=function(E,fe){try{ds(t.removed,{attribute:fe.getAttributeNode(E),from:fe})}catch{ds(t.removed,{attribute:null,from:fe})}if(fe.removeAttribute(E),E==="is")if(Ue||J)try{$t(fe)}catch{}else try{fe.setAttribute(E,"")}catch{}},xt=function(E){let fe=null,Ie=null;if(Qe)E="<remove></remove>"+E;else{let St=wl(E,/^[\r\n\t ]+/);Ie=St&&St[0]}Ze==="application/xhtml+xml"&&Mt===wt&&(E='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+E+"</body></html>");let ht=D?D.createHTML(E):E;if(Mt===wt)try{fe=new m().parseFromString(ht,Ze)}catch{}if(!fe||!fe.documentElement){fe=q.createDocument(Mt,"template",null);try{fe.documentElement.innerHTML=Lt?O:ht}catch{}}let Ye=fe.body||fe.documentElement;return E&&Ie&&Ye.insertBefore(n.createTextNode(Ie),Ye.childNodes[0]||null),Mt===wt?F.call(fe,Re?"html":"body")[0]:Re?fe.documentElement:Ye},Nt=function(E){return B.call(E.ownerDocument||E,E,u.SHOW_ELEMENT|u.SHOW_COMMENT|u.SHOW_TEXT|u.SHOW_PROCESSING_INSTRUCTION|u.SHOW_CDATA_SECTION,null)},Wt=function(E){return E instanceof p&&(typeof E.nodeName!="string"||typeof E.textContent!="string"||typeof E.removeChild!="function"||!(E.attributes instanceof d)||typeof E.removeAttribute!="function"||typeof E.setAttribute!="function"||typeof E.namespaceURI!="string"||typeof E.insertBefore!="function"||typeof E.hasChildNodes!="function")},jt=function(E){return typeof l=="function"&&E instanceof l};function kt(xe,E,fe){Wi(xe,Ie=>{Ie.call(t,E,fe,Ne)})}let Xt=function(E){let fe=null;if(kt(Y.beforeSanitizeElements,E,null),Wt(E))return $t(E),!0;let Ie=et(E.nodeName);if(kt(Y.uponSanitizeElement,E,{tagName:Ie,allowedTags:le}),me&&E.hasChildNodes()&&!jt(E.firstElementChild)&&hn(/<[/\w!]/g,E.innerHTML)&&hn(/<[/\w!]/g,E.textContent)||E.nodeType===ms.progressingInstruction||me&&E.nodeType===ms.comment&&hn(/<[/\w]/g,E.data))return $t(E),!0;if(!(st.tagCheck instanceof Function&&st.tagCheck(Ie))&&(!le[Ie]||Ce[Ie])){if(!Ce[Ie]&&Ft(Ie)&&(ke.tagNameCheck instanceof RegExp&&hn(ke.tagNameCheck,Ie)||ke.tagNameCheck instanceof Function&&ke.tagNameCheck(Ie)))return!1;if(We&&!G[Ie]){let ht=X(E)||E.parentNode,Ye=re(E)||E.childNodes;if(Ye&&ht){let St=Ye.length;for(let x=St-1;x>=0;--x){let L=T(Ye[x],!0);L.__removalCount=(E.__removalCount||0)+1,ht.insertBefore(L,te(E))}}}return $t(E),!0}return E instanceof a&&!ft(E)||(Ie==="noscript"||Ie==="noembed"||Ie==="noframes")&&hn(/<\/no(script|embed|frames)/i,E.innerHTML)?($t(E),!0):(Se&&E.nodeType===ms.text&&(fe=E.textContent,Wi([U,ne,ve],ht=>{fe=ps(fe,ht," ")}),E.textContent!==fe&&(ds(t.removed,{element:E.cloneNode()}),E.textContent=fe)),kt(Y.afterSanitizeElements,E,null),!1)},Zt=function(E,fe,Ie){if(qe&&(fe==="id"||fe==="name")&&(Ie in n||Ie in S))return!1;if(!(oe&&!ot[fe]&&hn(Pe,fe))){if(!(Q&&hn(H,fe))){if(!(st.attributeCheck instanceof Function&&st.attributeCheck(fe,E))){if(!be[fe]||ot[fe]){if(!(Ft(E)&&(ke.tagNameCheck instanceof RegExp&&hn(ke.tagNameCheck,E)||ke.tagNameCheck instanceof Function&&ke.tagNameCheck(E))&&(ke.attributeNameCheck instanceof RegExp&&hn(ke.attributeNameCheck,fe)||ke.attributeNameCheck instanceof Function&&ke.attributeNameCheck(fe,E))||fe==="is"&&ke.allowCustomizedBuiltInElements&&(ke.tagNameCheck instanceof RegExp&&hn(ke.tagNameCheck,Ie)||ke.tagNameCheck instanceof Function&&ke.tagNameCheck(Ie))))return!1}else if(!ze[fe]){if(!hn(V,ps(Ie,_e,""))){if(!((fe==="src"||fe==="xlink:href"||fe==="href")&&E!=="script"&&Jh(Ie,"data:")===0&&Ke[E])){if(!(se&&!hn(ie,ps(Ie,_e,"")))){if(Ie)return!1}}}}}}}return!0},Ft=function(E){return E!=="annotation-xml"&&wl(E,Te)},Ot=function(E){kt(Y.beforeSanitizeAttributes,E,null);let{attributes:fe}=E;if(!fe||Wt(E))return;let Ie={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:be,forceKeepAttr:void 0},ht=fe.length;for(;ht--;){let Ye=fe[ht],{name:St,namespaceURI:x,value:L}=Ye,Ee=et(St),He=L,Le=St==="value"?He:eb(He);if(Ie.attrName=Ee,Ie.attrValue=Le,Ie.keepAttr=!0,Ie.forceKeepAttr=void 0,kt(Y.uponSanitizeAttribute,E,Ie),Le=Ie.attrValue,dt&&(Ee==="id"||Ee==="name")&&(yt(St,E),Le=at+Le),me&&hn(/((--!?|])>)|<\/(style|title|textarea)/i,Le)){yt(St,E);continue}if(Ee==="attributename"&&wl(Le,"href")){yt(St,E);continue}if(Ie.forceKeepAttr)continue;if(!Ie.keepAttr){yt(St,E);continue}if(!pe&&hn(/\/>/i,Le)){yt(St,E);continue}Se&&Wi([U,ne,ve],h=>{Le=ps(Le,h," ")});let f=et(E.nodeName);if(!Zt(f,Ee,Le)){yt(St,E);continue}if(D&&typeof g=="object"&&typeof g.getAttributeType=="function"&&!x)switch(g.getAttributeType(f,Ee)){case"TrustedHTML":{Le=D.createHTML(Le);break}case"TrustedScriptURL":{Le=D.createScriptURL(Le);break}}if(Le!==He)try{x?E.setAttributeNS(x,St,Le):E.setAttribute(St,Le),Wt(E)?$t(E):ap(t.removed)}catch{yt(St,E)}}kt(Y.afterSanitizeAttributes,E,null)},Qt=function xe(E){let fe=null,Ie=Nt(E);for(kt(Y.beforeSanitizeShadowDOM,E,null);fe=Ie.nextNode();)kt(Y.uponSanitizeShadowNode,fe,null),Xt(fe),Ot(fe),fe.content instanceof i&&xe(fe.content);kt(Y.afterSanitizeShadowDOM,E,null)};return t.sanitize=function(xe){let E=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},fe=null,Ie=null,ht=null,Ye=null;if(Lt=!xe,Lt&&(xe="<!-->"),typeof xe!="string"&&!jt(xe))if(typeof xe.toString=="function"){if(xe=xe.toString(),typeof xe!="string")throw fs("dirty is not a string, aborting")}else throw fs("toString is not a function");if(!t.isSupported)return xe;if(je||z(E),t.removed=[],typeof xe=="string"&&(Xe=!1),Xe){if(xe.nodeName){let L=et(xe.nodeName);if(!le[L]||Ce[L])throw fs("root node is forbidden and cannot be sanitized in-place")}}else if(xe instanceof l)fe=xt("<!---->"),Ie=fe.ownerDocument.importNode(xe,!0),Ie.nodeType===ms.element&&Ie.nodeName==="BODY"||Ie.nodeName==="HTML"?fe=Ie:fe.appendChild(Ie);else{if(!Ue&&!Se&&!Re&&xe.indexOf("<")===-1)return D&&W?D.createHTML(xe):xe;if(fe=xt(xe),!fe)return Ue?null:W?O:""}fe&&Qe&&$t(fe.firstChild);let St=Nt(Xe?xe:fe);for(;ht=St.nextNode();)Xt(ht),Ot(ht),ht.content instanceof i&&Qt(ht.content);if(Xe)return xe;if(Ue){if(J)for(Ye=K.call(fe.ownerDocument);fe.firstChild;)Ye.appendChild(fe.firstChild);else Ye=fe;return(be.shadowroot||be.shadowrootmode)&&(Ye=N.call(r,Ye,!0)),Ye}let x=Re?fe.outerHTML:fe.innerHTML;return Re&&le["!doctype"]&&fe.ownerDocument&&fe.ownerDocument.doctype&&fe.ownerDocument.doctype.name&&hn(gp,fe.ownerDocument.doctype.name)&&(x="<!DOCTYPE "+fe.ownerDocument.doctype.name+`>
`+x),Se&&Wi([U,ne,ve],L=>{x=ps(x,L," ")}),D&&W?D.createHTML(x):x},t.setConfig=function(){let xe=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};z(xe),je=!0},t.clearConfig=function(){Ne=null,je=!1},t.isValidAttribute=function(xe,E,fe){Ne||z({});let Ie=et(xe),ht=et(E);return Zt(Ie,ht,fe)},t.addHook=function(xe,E){typeof E=="function"&&ds(Y[xe],E)},t.removeHook=function(xe,E){if(E!==void 0){let fe=Xh(Y[xe],E);return fe===-1?void 0:Zh(Y[xe],fe,1)[0]}return ap(Y[xe])},t.removeHooks=function(xe){Y[xe]=[]},t.removeAllHooks=function(){Y=fp()},t}var bp=hp();var sr={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},Ki=e=>(...t)=>({_$litDirective$:e,values:t}),ko=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,n,r){this._$Ct=t,this._$AM=n,this._$Ci=r}_$AS(t,n){return this.update(t,n)}update(t,n){return this.render(...n)}};var gs=class extends ko{constructor(t){if(super(t),this.it=Yt,t.type!==sr.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===Yt||t==null)return this._t=void 0,this.it=t;if(t===Sn)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;let n=[t];return n.raw=n,this._t={_$litType$:this.constructor.resultType,strings:n,values:[]}}};gs.directiveName="unsafeHTML",gs.resultType=1;var yp=Ki(gs);function Ll(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var Ur=Ll();function Sp(e){Ur=e}var vs={exec:()=>null};function It(e,t=""){let n=typeof e=="string"?e:e.source,r={replace:(o,i)=>{let s=typeof i=="string"?i:i.source;return s=s.replace(vn.caret,"$1"),n=n.replace(o,s),r},getRegex:()=>new RegExp(n,t)};return r}var mb=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),vn={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i")},gb=/^(?:[ \t]*(?:\n|$))+/,hb=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,bb=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,ks=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,yb=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,Dl=/(?:[*+-]|\d{1,9}[.)])/,Ep=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,Tp=It(Ep).replace(/bull/g,Dl).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),vb=It(Ep).replace(/bull/g,Dl).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),Pl=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,kb=/^[^\n]+/,Ml=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,wb=It(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",Ml).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),$b=It(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,Dl).getRegex(),Zi="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",ql=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,xb=It("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",ql).replace("tag",Zi).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),Cp=It(Pl).replace("hr",ks).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Zi).getRegex(),Ab=It(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",Cp).getRegex(),Nl={blockquote:Ab,code:hb,def:wb,fences:bb,heading:yb,hr:ks,html:xb,lheading:Tp,list:$b,newline:gb,paragraph:Cp,table:vs,text:kb},vp=It("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",ks).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Zi).getRegex(),Sb={...Nl,lheading:vb,table:vp,paragraph:It(Pl).replace("hr",ks).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",vp).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Zi).getRegex()},Eb={...Nl,html:It(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",ql).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:vs,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:It(Pl).replace("hr",ks).replace("heading",` *#{1,6} *[^
]`).replace("lheading",Tp).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},Tb=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,Cb=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,Rp=/^( {2,}|\\)\n(?!\s*$)/,Rb=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,Ji=/[\p{P}\p{S}]/u,jl=/[\s\p{P}\p{S}]/u,Op=/[^\s\p{P}\p{S}]/u,Ob=It(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,jl).getRegex(),Ip=/(?!~)[\p{P}\p{S}]/u,Ib=/(?!~)[\s\p{P}\p{S}]/u,Lb=/(?:[^\s\p{P}\p{S}]|~)/u,Db=It(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",mb?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),Lp=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,Pb=It(Lp,"u").replace(/punct/g,Ji).getRegex(),Mb=It(Lp,"u").replace(/punct/g,Ip).getRegex(),Dp="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",qb=It(Dp,"gu").replace(/notPunctSpace/g,Op).replace(/punctSpace/g,jl).replace(/punct/g,Ji).getRegex(),Nb=It(Dp,"gu").replace(/notPunctSpace/g,Lb).replace(/punctSpace/g,Ib).replace(/punct/g,Ip).getRegex(),jb=It("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,Op).replace(/punctSpace/g,jl).replace(/punct/g,Ji).getRegex(),Fb=It(/\\(punct)/,"gu").replace(/punct/g,Ji).getRegex(),Bb=It(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),Ub=It(ql).replace("(?:-->|$)","-->").getRegex(),Wb=It("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",Ub).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),Vi=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,zb=It(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",Vi).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),Pp=It(/^!?\[(label)\]\[(ref)\]/).replace("label",Vi).replace("ref",Ml).getRegex(),Mp=It(/^!?\[(ref)\](?:\[\])?/).replace("ref",Ml).getRegex(),Hb=It("reflink|nolink(?!\\()","g").replace("reflink",Pp).replace("nolink",Mp).getRegex(),kp=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,Fl={_backpedal:vs,anyPunctuation:Fb,autolink:Bb,blockSkip:Db,br:Rp,code:Cb,del:vs,emStrongLDelim:Pb,emStrongRDelimAst:qb,emStrongRDelimUnd:jb,escape:Tb,link:zb,nolink:Mp,punctuation:Ob,reflink:Pp,reflinkSearch:Hb,tag:Wb,text:Rb,url:vs},Kb={...Fl,link:It(/^!?\[(label)\]\((.*?)\)/).replace("label",Vi).getRegex(),reflink:It(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",Vi).getRegex()},Rl={...Fl,emStrongRDelimAst:Nb,emStrongLDelim:Mb,url:It(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",kp).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:It(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",kp).getRegex()},Gb={...Rl,br:It(Rp).replace("{2,}","*").getRegex(),text:It(Rl.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},Gi={normal:Nl,gfm:Sb,pedantic:Eb},hs={normal:Fl,gfm:Rl,breaks:Gb,pedantic:Kb},Yb={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},wp=e=>Yb[e];function ir(e,t){if(t){if(vn.escapeTest.test(e))return e.replace(vn.escapeReplace,wp)}else if(vn.escapeTestNoEncode.test(e))return e.replace(vn.escapeReplaceNoEncode,wp);return e}function $p(e){try{e=encodeURI(e).replace(vn.percentDecode,"%")}catch{return null}return e}function xp(e,t){let n=e.replace(vn.findPipe,(i,s,l)=>{let a=!1,u=s;for(;--u>=0&&l[u]==="\\";)a=!a;return a?"|":" |"}),r=n.split(vn.splitPipe),o=0;if(r[0].trim()||r.shift(),r.length>0&&!r.at(-1)?.trim()&&r.pop(),t)if(r.length>t)r.splice(t);else for(;r.length<t;)r.push("");for(;o<r.length;o++)r[o]=r[o].trim().replace(vn.slashPipe,"|");return r}function bs(e,t,n){let r=e.length;if(r===0)return"";let o=0;for(;o<r;){let i=e.charAt(r-o-1);if(i===t&&!n)o++;else if(i!==t&&n)o++;else break}return e.slice(0,r-o)}function Vb(e,t){if(e.indexOf(t[1])===-1)return-1;let n=0;for(let r=0;r<e.length;r++)if(e[r]==="\\")r++;else if(e[r]===t[0])n++;else if(e[r]===t[1]&&(n--,n<0))return r;return n>0?-2:-1}function Ap(e,t,n,r,o){let i=t.href,s=t.title||null,l=e[1].replace(o.other.outputLinkReplace,"$1");r.state.inLink=!0;let a={type:e[0].charAt(0)==="!"?"image":"link",raw:n,href:i,title:s,text:l,tokens:r.inlineTokens(l)};return r.state.inLink=!1,a}function Qb(e,t,n){let r=e.match(n.other.indentCodeCompensation);if(r===null)return t;let o=r[1];return t.split(`
`).map(i=>{let s=i.match(n.other.beginningSpace);if(s===null)return i;let[l]=s;return l.length>=o.length?i.slice(o.length):i}).join(`
`)}var Qi=class{constructor(e){qt(this,"options");qt(this,"rules");qt(this,"lexer");this.options=e||Ur}space(e){let t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){let t=this.rules.block.code.exec(e);if(t){let n=t[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?n:bs(n,`
`)}}}fences(e){let t=this.rules.block.fences.exec(e);if(t){let n=t[0],r=Qb(n,t[3]||"",this.rules);return{type:"code",raw:n,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:r}}}heading(e){let t=this.rules.block.heading.exec(e);if(t){let n=t[2].trim();if(this.rules.other.endingHash.test(n)){let r=bs(n,"#");(this.options.pedantic||!r||this.rules.other.endingSpaceChar.test(r))&&(n=r.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:n,tokens:this.lexer.inline(n)}}}hr(e){let t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:bs(t[0],`
`)}}blockquote(e){let t=this.rules.block.blockquote.exec(e);if(t){let n=bs(t[0],`
`).split(`
`),r="",o="",i=[];for(;n.length>0;){let s=!1,l=[],a;for(a=0;a<n.length;a++)if(this.rules.other.blockquoteStart.test(n[a]))l.push(n[a]),s=!0;else if(!s)l.push(n[a]);else break;n=n.slice(a);let u=l.join(`
`),d=u.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");r=r?`${r}
${u}`:u,o=o?`${o}
${d}`:d;let p=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(d,i,!0),this.lexer.state.top=p,n.length===0)break;let m=i.at(-1);if(m?.type==="code")break;if(m?.type==="blockquote"){let g=m,k=g.raw+`
`+n.join(`
`),T=this.blockquote(k);i[i.length-1]=T,r=r.substring(0,r.length-g.raw.length)+T.raw,o=o.substring(0,o.length-g.text.length)+T.text;break}else if(m?.type==="list"){let g=m,k=g.raw+`
`+n.join(`
`),T=this.list(k);i[i.length-1]=T,r=r.substring(0,r.length-m.raw.length)+T.raw,o=o.substring(0,o.length-g.raw.length)+T.raw,n=k.substring(i.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:r,tokens:i,text:o}}}list(e){let t=this.rules.block.list.exec(e);if(t){let n=t[1].trim(),r=n.length>1,o={type:"list",raw:"",ordered:r,start:r?+n.slice(0,-1):"",loose:!1,items:[]};n=r?`\\d{1,9}\\${n.slice(-1)}`:`\\${n}`,this.options.pedantic&&(n=r?n:"[*+-]");let i=this.rules.other.listItemRegex(n),s=!1;for(;e;){let a=!1,u="",d="";if(!(t=i.exec(e))||this.rules.block.hr.test(e))break;u=t[0],e=e.substring(u.length);let p=t[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,T=>" ".repeat(3*T.length)),m=e.split(`
`,1)[0],g=!p.trim(),k=0;if(this.options.pedantic?(k=2,d=p.trimStart()):g?k=t[1].length+1:(k=t[2].search(this.rules.other.nonSpaceChar),k=k>4?1:k,d=p.slice(k),k+=t[1].length),g&&this.rules.other.blankLine.test(m)&&(u+=m+`
`,e=e.substring(m.length+1),a=!0),!a){let T=this.rules.other.nextBulletRegex(k),C=this.rules.other.hrRegex(k),te=this.rules.other.fencesBeginRegex(k),re=this.rules.other.headingBeginRegex(k),X=this.rules.other.htmlBeginRegex(k);for(;e;){let D=e.split(`
`,1)[0],O;if(m=D,this.options.pedantic?(m=m.replace(this.rules.other.listReplaceNesting,"  "),O=m):O=m.replace(this.rules.other.tabCharGlobal,"    "),te.test(m)||re.test(m)||X.test(m)||T.test(m)||C.test(m))break;if(O.search(this.rules.other.nonSpaceChar)>=k||!m.trim())d+=`
`+O.slice(k);else{if(g||p.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||te.test(p)||re.test(p)||C.test(p))break;d+=`
`+m}!g&&!m.trim()&&(g=!0),u+=D+`
`,e=e.substring(D.length+1),p=O.slice(k)}}o.loose||(s?o.loose=!0:this.rules.other.doubleBlankLine.test(u)&&(s=!0)),o.items.push({type:"list_item",raw:u,task:!!this.options.gfm&&this.rules.other.listIsTask.test(d),loose:!1,text:d,tokens:[]}),o.raw+=u}let l=o.items.at(-1);if(l)l.raw=l.raw.trimEnd(),l.text=l.text.trimEnd();else return;o.raw=o.raw.trimEnd();for(let a of o.items){if(this.lexer.state.top=!1,a.tokens=this.lexer.blockTokens(a.text,[]),a.task){if(a.text=a.text.replace(this.rules.other.listReplaceTask,""),a.tokens[0]?.type==="text"||a.tokens[0]?.type==="paragraph"){a.tokens[0].raw=a.tokens[0].raw.replace(this.rules.other.listReplaceTask,""),a.tokens[0].text=a.tokens[0].text.replace(this.rules.other.listReplaceTask,"");for(let d=this.lexer.inlineQueue.length-1;d>=0;d--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[d].src)){this.lexer.inlineQueue[d].src=this.lexer.inlineQueue[d].src.replace(this.rules.other.listReplaceTask,"");break}}let u=this.rules.other.listTaskCheckbox.exec(a.raw);if(u){let d={type:"checkbox",raw:u[0]+" ",checked:u[0]!=="[ ]"};a.checked=d.checked,o.loose?a.tokens[0]&&["paragraph","text"].includes(a.tokens[0].type)&&"tokens"in a.tokens[0]&&a.tokens[0].tokens?(a.tokens[0].raw=d.raw+a.tokens[0].raw,a.tokens[0].text=d.raw+a.tokens[0].text,a.tokens[0].tokens.unshift(d)):a.tokens.unshift({type:"paragraph",raw:d.raw,text:d.raw,tokens:[d]}):a.tokens.unshift(d)}}if(!o.loose){let u=a.tokens.filter(p=>p.type==="space"),d=u.length>0&&u.some(p=>this.rules.other.anyLine.test(p.raw));o.loose=d}}if(o.loose)for(let a of o.items){a.loose=!0;for(let u of a.tokens)u.type==="text"&&(u.type="paragraph")}return o}}html(e){let t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){let t=this.rules.block.def.exec(e);if(t){let n=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),r=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",o=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:n,raw:t[0],href:r,title:o}}}table(e){let t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;let n=xp(t[1]),r=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),o=t[3]?.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],i={type:"table",raw:t[0],header:[],align:[],rows:[]};if(n.length===r.length){for(let s of r)this.rules.other.tableAlignRight.test(s)?i.align.push("right"):this.rules.other.tableAlignCenter.test(s)?i.align.push("center"):this.rules.other.tableAlignLeft.test(s)?i.align.push("left"):i.align.push(null);for(let s=0;s<n.length;s++)i.header.push({text:n[s],tokens:this.lexer.inline(n[s]),header:!0,align:i.align[s]});for(let s of o)i.rows.push(xp(s,i.header.length).map((l,a)=>({text:l,tokens:this.lexer.inline(l),header:!1,align:i.align[a]})));return i}}lheading(e){let t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){let t=this.rules.block.paragraph.exec(e);if(t){let n=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:n,tokens:this.lexer.inline(n)}}}text(e){let t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){let t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){let t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){let t=this.rules.inline.link.exec(e);if(t){let n=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(n)){if(!this.rules.other.endAngleBracket.test(n))return;let i=bs(n.slice(0,-1),"\\");if((n.length-i.length)%2===0)return}else{let i=Vb(t[2],"()");if(i===-2)return;if(i>-1){let s=(t[0].indexOf("!")===0?5:4)+t[1].length+i;t[2]=t[2].substring(0,i),t[0]=t[0].substring(0,s).trim(),t[3]=""}}let r=t[2],o="";if(this.options.pedantic){let i=this.rules.other.pedanticHrefTitle.exec(r);i&&(r=i[1],o=i[3])}else o=t[3]?t[3].slice(1,-1):"";return r=r.trim(),this.rules.other.startAngleBracket.test(r)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(n)?r=r.slice(1):r=r.slice(1,-1)),Ap(t,{href:r&&r.replace(this.rules.inline.anyPunctuation,"$1"),title:o&&o.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let n;if((n=this.rules.inline.reflink.exec(e))||(n=this.rules.inline.nolink.exec(e))){let r=(n[2]||n[1]).replace(this.rules.other.multipleSpaceGlobal," "),o=t[r.toLowerCase()];if(!o){let i=n[0].charAt(0);return{type:"text",raw:i,text:i}}return Ap(n,o,n[0],this.lexer,this.rules)}}emStrong(e,t,n=""){let r=this.rules.inline.emStrongLDelim.exec(e);if(!(!r||r[3]&&n.match(this.rules.other.unicodeAlphaNumeric))&&(!(r[1]||r[2])||!n||this.rules.inline.punctuation.exec(n))){let o=[...r[0]].length-1,i,s,l=o,a=0,u=r[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(u.lastIndex=0,t=t.slice(-1*e.length+o);(r=u.exec(t))!=null;){if(i=r[1]||r[2]||r[3]||r[4]||r[5]||r[6],!i)continue;if(s=[...i].length,r[3]||r[4]){l+=s;continue}else if((r[5]||r[6])&&o%3&&!((o+s)%3)){a+=s;continue}if(l-=s,l>0)continue;s=Math.min(s,s+l+a);let d=[...r[0]][0].length,p=e.slice(0,o+r.index+d+s);if(Math.min(o,s)%2){let g=p.slice(1,-1);return{type:"em",raw:p,text:g,tokens:this.lexer.inlineTokens(g)}}let m=p.slice(2,-2);return{type:"strong",raw:p,text:m,tokens:this.lexer.inlineTokens(m)}}}}codespan(e){let t=this.rules.inline.code.exec(e);if(t){let n=t[2].replace(this.rules.other.newLineCharGlobal," "),r=this.rules.other.nonSpaceChar.test(n),o=this.rules.other.startingSpaceChar.test(n)&&this.rules.other.endingSpaceChar.test(n);return r&&o&&(n=n.substring(1,n.length-1)),{type:"codespan",raw:t[0],text:n}}}br(e){let t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){let t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){let t=this.rules.inline.autolink.exec(e);if(t){let n,r;return t[2]==="@"?(n=t[1],r="mailto:"+n):(n=t[1],r=n),{type:"link",raw:t[0],text:n,href:r,tokens:[{type:"text",raw:n,text:n}]}}}url(e){let t;if(t=this.rules.inline.url.exec(e)){let n,r;if(t[2]==="@")n=t[0],r="mailto:"+n;else{let o;do o=t[0],t[0]=this.rules.inline._backpedal.exec(t[0])?.[0]??"";while(o!==t[0]);n=t[0],t[1]==="www."?r="http://"+t[0]:r=t[0]}return{type:"link",raw:t[0],text:n,href:r,tokens:[{type:"text",raw:n,text:n}]}}}inlineText(e){let t=this.rules.inline.text.exec(e);if(t){let n=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:n}}}},Nn=class Ol{constructor(t){qt(this,"tokens");qt(this,"options");qt(this,"state");qt(this,"inlineQueue");qt(this,"tokenizer");this.tokens=[],this.tokens.links=Object.create(null),this.options=t||Ur,this.options.tokenizer=this.options.tokenizer||new Qi,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let n={other:vn,block:Gi.normal,inline:hs.normal};this.options.pedantic?(n.block=Gi.pedantic,n.inline=hs.pedantic):this.options.gfm&&(n.block=Gi.gfm,this.options.breaks?n.inline=hs.breaks:n.inline=hs.gfm),this.tokenizer.rules=n}static get rules(){return{block:Gi,inline:hs}}static lex(t,n){return new Ol(n).lex(t)}static lexInline(t,n){return new Ol(n).inlineTokens(t)}lex(t){t=t.replace(vn.carriageReturn,`
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
`+o.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=s.text):n.push(o);continue}if(t){let s="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(s);break}else throw new Error(s)}}return this.state.top=!0,n}inline(t,n=[]){return this.inlineQueue.push({src:t,tokens:n}),n}inlineTokens(t,n=[]){let r=t,o=null;if(this.tokens.links){let a=Object.keys(this.tokens.links);if(a.length>0)for(;(o=this.tokenizer.rules.inline.reflinkSearch.exec(r))!=null;)a.includes(o[0].slice(o[0].lastIndexOf("[")+1,-1))&&(r=r.slice(0,o.index)+"["+"a".repeat(o[0].length-2)+"]"+r.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(o=this.tokenizer.rules.inline.anyPunctuation.exec(r))!=null;)r=r.slice(0,o.index)+"++"+r.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let i;for(;(o=this.tokenizer.rules.inline.blockSkip.exec(r))!=null;)i=o[2]?o[2].length:0,r=r.slice(0,o.index+i)+"["+"a".repeat(o[0].length-i-2)+"]"+r.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);r=this.options.hooks?.emStrongMask?.call({lexer:this},r)??r;let s=!1,l="";for(;t;){s||(l=""),s=!1;let a;if(this.options.extensions?.inline?.some(d=>(a=d.call({lexer:this},t,n))?(t=t.substring(a.raw.length),n.push(a),!0):!1))continue;if(a=this.tokenizer.escape(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.tag(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.link(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(a.raw.length);let d=n.at(-1);a.type==="text"&&d?.type==="text"?(d.raw+=a.raw,d.text+=a.text):n.push(a);continue}if(a=this.tokenizer.emStrong(t,r,l)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.codespan(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.br(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.del(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.autolink(t)){t=t.substring(a.raw.length),n.push(a);continue}if(!this.state.inLink&&(a=this.tokenizer.url(t))){t=t.substring(a.raw.length),n.push(a);continue}let u=t;if(this.options.extensions?.startInline){let d=1/0,p=t.slice(1),m;this.options.extensions.startInline.forEach(g=>{m=g.call({lexer:this},p),typeof m=="number"&&m>=0&&(d=Math.min(d,m))}),d<1/0&&d>=0&&(u=t.substring(0,d+1))}if(a=this.tokenizer.inlineText(u)){t=t.substring(a.raw.length),a.raw.slice(-1)!=="_"&&(l=a.raw.slice(-1)),s=!0;let d=n.at(-1);d?.type==="text"?(d.raw+=a.raw,d.text+=a.text):n.push(a);continue}if(t){let d="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(d);break}else throw new Error(d)}}return n}},Xi=class{constructor(e){qt(this,"options");qt(this,"parser");this.options=e||Ur}space(e){return""}code({text:e,lang:t,escaped:n}){let r=(t||"").match(vn.notSpaceStart)?.[0],o=e.replace(vn.endingNewline,"")+`
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
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${ir(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:n}){let r=this.parser.parseInline(n),o=$p(e);if(o===null)return r;e=o;let i='<a href="'+e+'"';return t&&(i+=' title="'+ir(t)+'"'),i+=">"+r+"</a>",i}image({href:e,title:t,text:n,tokens:r}){r&&(n=this.parser.parseInline(r,this.parser.textRenderer));let o=$p(e);if(o===null)return ir(n);e=o;let i=`<img src="${e}" alt="${n}"`;return t&&(i+=` title="${ir(t)}"`),i+=">",i}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:ir(e.text)}},Bl=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}checkbox({raw:e}){return e}},jn=class Il{constructor(t){qt(this,"options");qt(this,"renderer");qt(this,"textRenderer");this.options=t||Ur,this.options.renderer=this.options.renderer||new Xi,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new Bl}static parse(t,n){return new Il(n).parse(t)}static parseInline(t,n){return new Il(n).parseInline(t)}parse(t){let n="";for(let r=0;r<t.length;r++){let o=t[r];if(this.options.extensions?.renderers?.[o.type]){let s=o,l=this.options.extensions.renderers[s.type].call({parser:this},s);if(l!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(s.type)){n+=l||"";continue}}let i=o;switch(i.type){case"space":{n+=this.renderer.space(i);break}case"hr":{n+=this.renderer.hr(i);break}case"heading":{n+=this.renderer.heading(i);break}case"code":{n+=this.renderer.code(i);break}case"table":{n+=this.renderer.table(i);break}case"blockquote":{n+=this.renderer.blockquote(i);break}case"list":{n+=this.renderer.list(i);break}case"checkbox":{n+=this.renderer.checkbox(i);break}case"html":{n+=this.renderer.html(i);break}case"def":{n+=this.renderer.def(i);break}case"paragraph":{n+=this.renderer.paragraph(i);break}case"text":{n+=this.renderer.text(i);break}default:{let s='Token with "'+i.type+'" type was not found.';if(this.options.silent)return console.error(s),"";throw new Error(s)}}}return n}parseInline(t,n=this.renderer){let r="";for(let o=0;o<t.length;o++){let i=t[o];if(this.options.extensions?.renderers?.[i.type]){let l=this.options.extensions.renderers[i.type].call({parser:this},i);if(l!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(i.type)){r+=l||"";continue}}let s=i;switch(s.type){case"escape":{r+=n.text(s);break}case"html":{r+=n.html(s);break}case"link":{r+=n.link(s);break}case"image":{r+=n.image(s);break}case"checkbox":{r+=n.checkbox(s);break}case"strong":{r+=n.strong(s);break}case"em":{r+=n.em(s);break}case"codespan":{r+=n.codespan(s);break}case"br":{r+=n.br(s);break}case"del":{r+=n.del(s);break}case"text":{r+=n.text(s);break}default:{let l='Token with "'+s.type+'" type was not found.';if(this.options.silent)return console.error(l),"";throw new Error(l)}}}return r}},Yi,ys=(Yi=class{constructor(e){qt(this,"options");qt(this,"block");this.options=e||Ur}preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}emStrongMask(e){return e}provideLexer(){return this.block?Nn.lex:Nn.lexInline}provideParser(){return this.block?jn.parse:jn.parseInline}},qt(Yi,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens","emStrongMask"])),qt(Yi,"passThroughHooksRespectAsync",new Set(["preprocess","postprocess","processAllTokens"])),Yi),Xb=class{constructor(...e){qt(this,"defaults",Ll());qt(this,"options",this.setOptions);qt(this,"parse",this.parseMarkdown(!0));qt(this,"parseInline",this.parseMarkdown(!1));qt(this,"Parser",jn);qt(this,"Renderer",Xi);qt(this,"TextRenderer",Bl);qt(this,"Lexer",Nn);qt(this,"Tokenizer",Qi);qt(this,"Hooks",ys);this.use(...e)}walkTokens(e,t){let n=[];for(let r of e)switch(n=n.concat(t.call(this,r)),r.type){case"table":{let o=r;for(let i of o.header)n=n.concat(this.walkTokens(i.tokens,t));for(let i of o.rows)for(let s of i)n=n.concat(this.walkTokens(s.tokens,t));break}case"list":{let o=r;n=n.concat(this.walkTokens(o.items,t));break}default:{let o=r;this.defaults.extensions?.childTokens?.[o.type]?this.defaults.extensions.childTokens[o.type].forEach(i=>{let s=o[i].flat(1/0);n=n.concat(this.walkTokens(s,t))}):o.tokens&&(n=n.concat(this.walkTokens(o.tokens,t)))}}return n}use(...e){let t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(n=>{let r={...n};if(r.async=this.defaults.async||r.async||!1,n.extensions&&(n.extensions.forEach(o=>{if(!o.name)throw new Error("extension name required");if("renderer"in o){let i=t.renderers[o.name];i?t.renderers[o.name]=function(...s){let l=o.renderer.apply(this,s);return l===!1&&(l=i.apply(this,s)),l}:t.renderers[o.name]=o.renderer}if("tokenizer"in o){if(!o.level||o.level!=="block"&&o.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let i=t[o.level];i?i.unshift(o.tokenizer):t[o.level]=[o.tokenizer],o.start&&(o.level==="block"?t.startBlock?t.startBlock.push(o.start):t.startBlock=[o.start]:o.level==="inline"&&(t.startInline?t.startInline.push(o.start):t.startInline=[o.start]))}"childTokens"in o&&o.childTokens&&(t.childTokens[o.name]=o.childTokens)}),r.extensions=t),n.renderer){let o=this.defaults.renderer||new Xi(this.defaults);for(let i in n.renderer){if(!(i in o))throw new Error(`renderer '${i}' does not exist`);if(["options","parser"].includes(i))continue;let s=i,l=n.renderer[s],a=o[s];o[s]=(...u)=>{let d=l.apply(o,u);return d===!1&&(d=a.apply(o,u)),d||""}}r.renderer=o}if(n.tokenizer){let o=this.defaults.tokenizer||new Qi(this.defaults);for(let i in n.tokenizer){if(!(i in o))throw new Error(`tokenizer '${i}' does not exist`);if(["options","rules","lexer"].includes(i))continue;let s=i,l=n.tokenizer[s],a=o[s];o[s]=(...u)=>{let d=l.apply(o,u);return d===!1&&(d=a.apply(o,u)),d}}r.tokenizer=o}if(n.hooks){let o=this.defaults.hooks||new ys;for(let i in n.hooks){if(!(i in o))throw new Error(`hook '${i}' does not exist`);if(["options","block"].includes(i))continue;let s=i,l=n.hooks[s],a=o[s];ys.passThroughHooks.has(i)?o[s]=u=>{if(this.defaults.async&&ys.passThroughHooksRespectAsync.has(i))return(async()=>{let p=await l.call(o,u);return a.call(o,p)})();let d=l.call(o,u);return a.call(o,d)}:o[s]=(...u)=>{if(this.defaults.async)return(async()=>{let p=await l.apply(o,u);return p===!1&&(p=await a.apply(o,u)),p})();let d=l.apply(o,u);return d===!1&&(d=a.apply(o,u)),d}}r.hooks=o}if(n.walkTokens){let o=this.defaults.walkTokens,i=n.walkTokens;r.walkTokens=function(s){let l=[];return l.push(i.call(this,s)),o&&(l=l.concat(o.call(this,s))),l}}this.defaults={...this.defaults,...r}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return Nn.lex(e,t??this.defaults)}parser(e,t){return jn.parse(e,t??this.defaults)}parseMarkdown(e){return(t,n)=>{let r={...n},o={...this.defaults,...r},i=this.onError(!!o.silent,!!o.async);if(this.defaults.async===!0&&r.async===!1)return i(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof t>"u"||t===null)return i(new Error("marked(): input parameter is undefined or null"));if(typeof t!="string")return i(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(t)+", string expected"));if(o.hooks&&(o.hooks.options=o,o.hooks.block=e),o.async)return(async()=>{let s=o.hooks?await o.hooks.preprocess(t):t,l=await(o.hooks?await o.hooks.provideLexer():e?Nn.lex:Nn.lexInline)(s,o),a=o.hooks?await o.hooks.processAllTokens(l):l;o.walkTokens&&await Promise.all(this.walkTokens(a,o.walkTokens));let u=await(o.hooks?await o.hooks.provideParser():e?jn.parse:jn.parseInline)(a,o);return o.hooks?await o.hooks.postprocess(u):u})().catch(i);try{o.hooks&&(t=o.hooks.preprocess(t));let s=(o.hooks?o.hooks.provideLexer():e?Nn.lex:Nn.lexInline)(t,o);o.hooks&&(s=o.hooks.processAllTokens(s)),o.walkTokens&&this.walkTokens(s,o.walkTokens);let l=(o.hooks?o.hooks.provideParser():e?jn.parse:jn.parseInline)(s,o);return o.hooks&&(l=o.hooks.postprocess(l)),l}catch(s){return i(s)}}}onError(e,t){return n=>{if(n.message+=`
Please report this to https://github.com/markedjs/marked.`,e){let r="<p>An error occurred:</p><pre>"+ir(n.message+"",!0)+"</pre>";return t?Promise.resolve(r):r}if(t)return Promise.reject(n);throw n}}},Br=new Xb;function Pt(e,t){return Br.parse(e,t)}Pt.options=Pt.setOptions=function(e){return Br.setOptions(e),Pt.defaults=Br.defaults,Sp(Pt.defaults),Pt};Pt.getDefaults=Ll;Pt.defaults=Ur;Pt.use=function(...e){return Br.use(...e),Pt.defaults=Br.defaults,Sp(Pt.defaults),Pt};Pt.walkTokens=function(e,t){return Br.walkTokens(e,t)};Pt.parseInline=Br.parseInline;Pt.Parser=jn;Pt.parser=jn.parse;Pt.Renderer=Xi;Pt.TextRenderer=Bl;Pt.Lexer=Nn;Pt.lexer=Nn.lex;Pt.Tokenizer=Qi;Pt.Hooks=ys;Pt.parse=Pt;var C0=Pt.options,R0=Pt.setOptions,O0=Pt.use,I0=Pt.walkTokens,L0=Pt.parseInline;var D0=jn.parse,P0=Nn.lex;function vr(e){let t=Pt.parse(e),n=bp.sanitize(t);return yp(n)}function ar(e,t){return c`<div class="prompt-block">
    <div class="prompt-block__label">${e}</div>
    <pre class="prompt-block__body">${t}</pre>
  </div>`}function wo(e){return e.loading?c`<div class="prompt-block__status">불러오는 중…</div>`:e.error?c`<div class="prompt-block__status prompt-block__status--error">
      프롬프트를 불러오지 못했습니다
    </div>`:""}function ea(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),n=r=>String(r).padStart(2,"0");return`${t.getFullYear()}-${n(t.getMonth()+1)}-${n(t.getDate())} ${n(t.getHours())}:${n(t.getMinutes())}`}var Np={Read:"\u{1F4D6}",Edit:"\u270E",MultiEdit:"\u270E",Write:"\u{1F4DD}",Bash:"\u26A1",Grep:"\u{1F50E}",Glob:"\u{1F50E}",Task:"\u{1F916}",Agent:"\u{1F916}",WebFetch:"\u{1F310}",WebSearch:"\u{1F310}"},Zb={command_execution:"\uBA85\uB839 \uC2E4\uD589",file_change:"\uD30C\uC77C \uBCC0\uACBD",mcp_call:"MCP \uD638\uCD9C",web_search:"\uC6F9 \uAC80\uC0C9",plan:"\uACC4\uD68D"},Jb=/^\s*([✓✗⊘])\s*(spec|impl|implementation|plan)\s*게이트\s*[—–-]\s*(\S+)\s+(APPROVE|REVISE|REJECT|BLOCK|SKIP)(?:\s*·\s*(.+))?/,ey=/^\s*#{0,3}\s*Phase\s+\d+(?:\s*\/\s*\d+)?\s*(?:[·:—–-]\s*.+)?$/;function Fn(e){return!!e&&typeof e=="object"}function Ul(e){return typeof e!="string"||e.length===0?[]:e.split(/\r?\n/)}function Wl(e,t){let n=Ul(e),r=Ul(t),o=new Map;for(let l of n)o.set(l,(o.get(l)||0)+1);let i=0;for(let l of r){let a=o.get(l)||0;a>0?o.set(l,a-1):i+=1}let s=0;for(let l of o.values())s+=l;return{added:i,removed:s}}function jp(e){let t="";typeof e=="string"?t=e:Array.isArray(e)?t=e.map(o=>Fn(o)&&typeof o.text=="string"?o.text:"").join(""):Fn(e)&&typeof e.text=="string"&&(t=e.text);let r=(String(t).split(/\r?\n/).find(o=>o.trim().length>0)||"").trim();return r.length>120?`${r.slice(0,117)}\u2026`:r}function ty(e){let t=String(e.name||""),n=e.input||{},r={kind:"tool",tool:t,icon:Np[t]||"\u{1F527}",input:n,expandable:!0};if((t==="Read"||t==="Write")&&(r.path=String(n.file_path||n.path||"")),t==="Write"&&(r.added=Ul(n.content).length),t==="Edit"){r.path=String(n.file_path||n.path||"");let{added:o,removed:i}=Wl(n.old_string,n.new_string);r.added=o,r.removed=i}if(t==="MultiEdit"){r.path=String(n.file_path||n.path||"");let o=0,i=0,s=Array.isArray(n.edits)?n.edits:[];for(let l of s){let a=Wl(Fn(l)?l.old_string:"",Fn(l)?l.new_string:"");o+=a.added,i+=a.removed}r.added=o,r.removed=i}return t==="Bash"&&(r.command=String(n.command||"")),(t==="Grep"||t==="Glob")&&(r.command=String(n.pattern||n.query||"")),t==="Agent"&&(typeof e.id=="string"&&e.id.length>0&&(r.launch_id=e.id),typeof n.description=="string"&&(r.command=n.description)),r}function zl(e){return typeof e!="string"||e.trim().length===0?null:{kind:"thinking",text:e}}var ny=/<system-reminder>[\s\S]*?<\/system-reminder>/g;function Fp(e){let t;if(typeof e=="string")t=e;else if(Array.isArray(e))t=e.filter(r=>Fn(r)&&r.type==="text"&&typeof r.text=="string").map(r=>String(r.text)).join(`
`);else return null;let n=t.replace(ny,"").trim();return n.length>0?{kind:"user",text:n}:null}function Hl(e){let t=e.split(/\r?\n/).find(r=>r.trim().length>0)||"",n=Jb.exec(t);return n?{kind:"gate",gate:n[2]==="implementation"?"impl":n[2],reviewer:n[3],verdict:n[4],time:n[5]?n[5].trim():void 0,text:t.trim()}:ey.test(t)&&t.trim().length<=80?{kind:"phase",text:t.trim()}:{kind:"assistant",text:e}}function ry(e,t){if(e.subtype==="init"){let n=typeof e.model=="string"?e.model:"";return t.progress=null,[{kind:"thinking",text:n?`\uC138\uC158 \uC2DC\uC791 \xB7 ${n}`:"\uC138\uC158 \uC2DC\uC791"}]}if(e.subtype==="thinking_tokens"){let r=`\uC0DD\uAC01 \uC911\u2026 ${typeof e.estimated_tokens=="number"&&Number.isFinite(e.estimated_tokens)?Math.max(0,Math.round(e.estimated_tokens)):0} \uD1A0\uD070`;return t.progress?(t.progress.text=r,[]):(t.progress={kind:"thinking",text:r},[t.progress])}return[]}function oy(e,t){let n=typeof e.parent_tool_use_id=="string"&&e.parent_tool_use_id.length>0?e.parent_tool_use_id:null;if(e.type==="assistant"){let r=e.message,o=r&&Array.isArray(r.content)?r.content:[],i=[];for(let s of o)if(Fn(s)){if(s.type==="text"&&typeof s.text=="string")i.push(Hl(s.text));else if(s.type==="thinking"){let l=zl(s.thinking);l&&i.push(l)}else if(s.type==="tool_use"){let l=ty(s);typeof s.id=="string"&&t.set(s.id,l),i.push(l)}}return n?qp(i,n):i}if(e.type==="user"){let r=e.message,o=r&&Array.isArray(r.content)?r.content:[];for(let s of o)if(Fn(s)&&s.type==="tool_result"){let l=t.get(String(s.tool_use_id));if(l){let a=jp(s.content);l.result=a,l.output=typeof s.content=="string"?s.content:a,s.is_error===!0&&(l.is_error=!0)}}let i=Fp(r&&r.content);return i?[i]:[]}if(e.type==="result"){let r=e.is_error===!1&&e.subtype==="success",o={kind:"result",success:r,text:typeof e.result=="string"?e.result:r?"DONE":""};return n?qp([o],n):[o]}return[]}function qp(e,t){for(let n of e)n.parent_tool_use_id=t;return e}function sy(e){let t=typeof e.command=="string"?e.command:"",n=jp(e.aggregated_output===void 0?e.output:e.aggregated_output),o=[typeof e.exit_code=="number"&&Number.isFinite(e.exit_code)?`exit ${e.exit_code}`:typeof e.status=="string"&&e.status.length>0?e.status:"",n].filter(s=>s.length>0).join(" \xB7 "),i={kind:"tool",tool:"shell",icon:Np.Bash,command:t,input:{command:t},expandable:!0};return o.length>0&&(i.result=o),typeof e.aggregated_output=="string"&&(i.output=e.aggregated_output),i}function iy(e){if(e.type==="item.completed"&&Fn(e.item)){let t=e.item;if(t.type==="agent_message"&&typeof t.text=="string")return[Hl(t.text)];if(t.type==="user_message"){let n=Fp(t.text);return n?[n]:[]}if(t.type==="reasoning"){let n=zl(t.text);return n?[n]:[]}return t.type==="error"?[{kind:"error",text:String(t.message||"")}]:t.type==="command_execution"?[sy(t)]:[]}if(e.type==="turn.completed")return[{kind:"result",success:!0,text:"DONE"}];if(e.type==="turn.failed"){let t=e.error;return[{kind:"error",text:t&&typeof t.message=="string"?t.message:"turn failed"}]}return e.type==="error"?[{kind:"error",text:String(e.message||"")}]:[]}function ay(e){if(e.schema!=="codex-delegation-monitor-v1"||!Fn(e.event))return[];let t=e.event;if(t.type==="session.started"||t.type==="turn.started")return[];if((t.type==="item.started"||t.type==="item.completed")&&Fn(t.item)){let n=t.item;if(typeof n.id!="string"||n.id.length===0)return[];if(t.type==="item.completed"&&n.kind==="agent_message"&&typeof n.text=="string"&&n.text.trim().length>0)return[Hl(n.text)];if(t.type==="item.completed"&&n.kind==="reasoning"){let s=zl(n.text);return s?[s]:[]}if(t.type!=="item.completed"||n.kind!=="activity"||typeof n.activity!="string")return[];let r=Zb[n.activity];if(!r)return[];let o,i;if(n.status==="completed")o="\uC644\uB8CC",i="\u2713";else if(n.status==="failed")o="\uC2E4\uD328",i="\u2717";else return[];return[{kind:"tool",tool:`${r} \xB7 ${o}`,icon:i,expandable:!1,result:""}]}return t.type==="turn.completed"&&t.status==="completed"?[{kind:"result",success:!0,text:"DONE"}]:t.type==="turn.failed"&&(t.status==="failed"||t.status==="interrupted")&&typeof t.error_code=="string"&&t.error_code.length>0?[{kind:"error",text:t.error_code}]:[]}function ly(e){let t=e.type;return typeof t=="string"&&(t==="error"||t.startsWith("thread.")||t.startsWith("turn.")||t.startsWith("item."))}function cy(e){let t=e;if(typeof e=="string"){let n=e.trim();if(n.length===0)return null;try{t=JSON.parse(n)}catch{return null}}return Fn(t)?t:null}function Bp(e={}){let t=e.skip_delegated===!0,n=new Map,r={progress:null};return{push(o){let i=cy(o);if(!i)return[];if(t&&typeof i.parent_tool_use_id=="string"&&i.parent_tool_use_id.length>0)return[];if(i.type==="system"&&i.schema!=="codex-delegation-monitor-v1")return ry(i,r);let s=i.schema==="codex-delegation-monitor-v1"?ay(i):ly(i)?iy(i):oy(i,n);return s.length>0&&(r.progress=null),s}}}function Kl(e){let t=[],n=Bp(),r=Array.isArray(e)?e:[];for(let o of r)for(let i of n.push(o))t.push(i);return t}var uy=5,dy=10,py=/Task\s+#(\d+)/,fy=/\bgh\s+pr\s+create\b|\bgit\s+push\b/,_y=/\bnpm\s+(?:run\s+)?(?:test|tsc|lint|build)\b|\bvitest\b/;function ws(e){return typeof e!="string"?"":(e.split(/\r?\n/).find(t=>t.trim().length>0)||"").trim()}function my(e){return typeof e!="string"||e.length===0?0:e.split(/\r?\n/).length}function gy(e){for(let t=e.length-1;t>=0;t-=1){let n=e[t];if(n.kind==="phase"||n.kind==="gate")return n.text||null}return null}function hy(e){let t=new Map,n=0;for(let o of e){if(o.kind!=="tool")continue;n+=1;let i=o.input||{};if(o.tool==="TaskCreate"){let a=py.exec(o.output||o.result||""),u=String(i.activeForm||i.subject||"").trim();if(!a||u.length===0)continue;t.set(a[1],{label:u,active:i.status==="in_progress"?n:0});continue}if(o.tool!=="TaskUpdate")continue;let s=t.get(String(i.taskId??""));if(!s)continue;let l=i.activeForm||i.subject;typeof l=="string"&&l.trim().length>0&&(s.label=l.trim()),typeof i.status=="string"&&(s.active=i.status==="in_progress"?n:0)}let r=null;for(let o of t.values())o.active>0&&(!r||o.active>r.active)&&(r=o);return r?r.label:null}function by(e){if(e.tool==="Bash"){let t=e.command||"";return fy.test(t)?"~ PR/\uAC8C\uC2DC \uC911":_y.test(t)?"~ \uAC80\uC99D \uC911":null}return e.tool==="Edit"||e.tool==="Write"||e.tool==="MultiEdit"?"~ \uAD6C\uD604 \uC911":e.tool==="Read"||e.tool==="Grep"||e.tool==="Glob"?"~ \uD0D0\uC0C9 \uC911":null}function yy(e){let t=e.filter(o=>o.kind==="tool").slice(-dy),n=new Map;t.forEach((o,i)=>{let s=by(o);if(!s)return;let l=n.get(s)||{count:0,last:-1};l.count+=1,l.last=i,n.set(s,l)});let r=null;for(let[o,i]of n)(!r||i.count>r.count||i.count===r.count&&i.last>r.last)&&(r={label:o,count:i.count,last:i.last});return r?r.label:null}function vy(e){let t=gy(e);if(t)return{text:t,guess:!1};let n=hy(e);if(n)return{text:n,guess:!1};let r=yy(e);return r?{text:r,guess:!0}:null}function ky(e,t){if(typeof e!="number")return"";let n=Math.max(0,Math.floor((t-e)/1e3));return n<60?`${n}\uCD08 \uC804`:mn(e,t)}function $o(e,t={}){let{transport:n,sessionLogStore:r,onClose:o}=t,i=null,s=null,l=null,a=null,u=null,d=!1,p={},m=!0,g=new Set,k=new Set,T=null,C=null,te=!1,re=!1,X=!1,D=null,O=null;function q(){te=!1,re=!1,X=!1,D=null,O=null}async function B(J){if(n){re=!0,X=!1,Ce();try{let W=await Promise.resolve(n("get-attempt-prompt",{attempt_id:J,...u?{root_dir:u}:{}}));if(i!==J)return;!W||typeof W!="object"||Array.isArray(W)?X=!0:(D=W,O=J)}catch{i===J&&(X=!0)}finally{i===J&&(re=!1,Ce())}}}function K(){if(te=!te,te&&i&&O!==i){B(i);return}Ce()}function F(){if(!te)return"";let J=wo({loading:re,error:X});if(J)return c`<div class="sv__prompt" data-seam="attempt-prompt">
        ${J}
      </div>`;if(!D)return"";if(D.missing)return c`<div class="sv__prompt" data-seam="attempt-prompt">
        <div class="prompt-block__status">
          기록 없음 — 프롬프트 기록 이전에 실행된 attempt입니다
        </div>
      </div>`;let W=ea(D.recorded_at);return c`<div class="sv__prompt" data-seam="attempt-prompt">
      ${W?c`<div class="prompt-block__meta">${W} 발송</div>`:""}
      ${typeof D.task_prompt=="string"?ar("\uACFC\uC5C5 (user)",D.task_prompt):""}
      ${typeof D.system_prompt=="string"?ar("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",D.system_prompt):""}
    </div>`}function N(){if(!a||!r)return[];let J=r.get(a);return Kl(J?J.lines:[])}function Y(){if(!a||!r)return null;let J=r.get(a),W=J?J.last_event_at:null;return typeof W=="number"?W:null}function U(){return p.status==="running"}function ne(){if(U()&&i){C||(C=setInterval(()=>Ce(),1e3));return}ve()}function ve(){C&&(clearInterval(C),C=null)}function Pe(J){let W=[],qe=0;for(;qe<J.length;){let{idx:dt,line:at}=J[qe];if(at.kind==="tool"){let We=qe;for(;We<J.length&&J[We].line.kind==="tool"&&J[We].line.tool===at.tool;)We+=1;if(We-qe>=uy&&!k.has(dt)){W.push({kind:"group",idx:dt,tool:at.tool||"",lines:J.slice(qe,We)}),qe=We;continue}}W.push({kind:"line",idx:dt,line:at}),qe+=1}return W}function H(J){let W=[],qe=new Map;for(let We=0;We<J.length;We+=1){let Xe=J[We],$=Xe.parent_tool_use_id;if(typeof $=="string"&&$.length>0){let G=qe.get($);G||(G={kind:"subagent",idx:We,launch_id:$,agent_type:null,header:null,lines:[]},qe.set($,G),W.push(G)),G.lines.push({idx:We,line:Xe});continue}if(Xe.kind==="tool"&&Xe.tool==="Agent"&&typeof Xe.launch_id=="string"&&Xe.launch_id.length>0){let G=ie(Xe),he=qe.get(Xe.launch_id);if(he){he.header={idx:We,line:Xe},he.agent_type=G;continue}let Ke={kind:"subagent",idx:We,launch_id:Xe.launch_id,agent_type:G,header:{idx:We,line:Xe},lines:[]};qe.set(Xe.launch_id,Ke),W.push(Ke);continue}W.push({kind:"entry",idx:We,line:Xe})}let dt=[],at=0;for(;at<W.length;){if(W[at].kind!=="entry"){dt.push(W[at]),at+=1;continue}let We=at;for(;We<W.length&&W[We].kind==="entry";)We+=1;dt.push(...Pe(W.slice(at,We))),at=We}return dt}function ie(J){let W=J.input;return W&&typeof W.subagent_type=="string"?W.subagent_type:null}function _e(J){for(let W=J.length-1;W>=0;W-=1){let qe=J[W];if(qe.kind==="result"||qe.kind==="error")return null;if(qe.kind==="tool"&&!Object.hasOwn(qe,"result"))return qe}return null}function Te(J){for(let W=J.length-1;W>=0;W-=1)if(J[W].kind==="thinking")return J[W];return null}function V(J,W){if(W.kind==="gate")return c`<div class="sv__gate">${W.text}</div>`;if(W.kind==="phase")return c`<div class="sv__phase">${W.text}</div>`;if(W.kind==="result")return c`<div
        class="sv__result${W.success?" sv__result--ok":" sv__result--fail"}"
      >
        <span class="sv__result-glyph">${W.success?"\u2713":"\u2717"}</span>
        <span class="sv__result-body"
          >${vr(W.text||(W.success?"DONE":"\uC2E4\uD328"))}</span
        >
      </div>`;if(W.kind==="thinking"){let qe=g.has(J);return c`<div
        class="sv__think${qe?" sv__think--expanded":""}"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>st(J)}
      >
        <span class="sv__think-line">💭 ${ws(W.text)}</span>
        ${qe?c`<pre class="sv__think-expand">${W.text}</pre>`:""}
      </div>`}if(W.kind==="user"){let qe=g.has(J);return c`<div
        class="sv__line sv__line--user${qe?" sv__line--expanded":""}"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>st(J)}
      >
        <span class="sv__user-line">▷ ${ws(W.text)}</span>
        ${qe?c`<pre class="sv__user-expand">${W.text}</pre>`:""}
      </div>`}if(W.kind==="error")return c`<div class="sv__error">⛔ ${W.text}</div>`;if(W.kind==="blocker")return c`<div class="sv__error">⛔ ${W.text}</div>`;if(W.kind==="tool"){let qe=g.has(J),dt=W.tool==="Bash"?my(W.command):0,at=W.tool==="Bash"?dt>1?ws(W.command):W.command:W.path||W.command||"";return c`<div
        class="sv__tool${qe?" sv__tool--expanded":""}"
        role="button"
        tabindex="0"
        @click=${()=>st(J)}
      >
        <span class="sv__tool-line">
          <span class="sv__tool-icon">${W.icon}</span>
          <span class="sv__tool-name">${W.tool}</span>
          ${at?c`<span class="sv__tool-detail">${at}</span>`:""}
          ${dt>1?c`<span class="sv__tool-more">⋯ ${dt}줄</span>`:""}
          ${typeof W.added=="number"?c`<span class="sv__diff-add">+${W.added}</span>`:""}
          ${typeof W.removed=="number"?c`<span class="sv__diff-del">−${W.removed}</span>`:""}
          ${W.result?c`<span class="sv__tool-ok">→ ${W.result}</span>`:""}
        </span>
        ${qe?c`<pre class="sv__tool-expand">${le(W)}</pre>`:""}
      </div>`}return c`<div class="sv__as">${vr(W.text||"")}</div>`}function le(J){let W=[];if(J.tool==="Bash"&&typeof J.command=="string"&&J.command.length>0)W.push(J.command);else if(J.input!==void 0)try{W.push(`input: ${JSON.stringify(J.input,null,2)}`)}catch{}return typeof J.output=="string"&&J.output.length>0&&W.push(`output:
${J.output}`),W.join(`

`)}function Z(){if(!i)return c``;let J=N(),W=(s?[p.agent_type,p.model,p.effort]:[p.runner,p.model,p.effort]).filter(Boolean).join(" \xB7 "),qe=p.session_id||"",dt=`\uB77C\uC774\uBE0C \uB530\uB77C\uAC00\uAE30 ${m?"ON":"OFF"}`,at=U(),We=at?ky(Y(),Date.now()):"",Xe=at?_e(J):null,$=at?Te(J):null,G=vy(J);return c`<div class="sv" data-attempt-id=${i}>
      <div class="sv__bar">
        <span class="sv__id"
          >${p.label||(s?p.role||"":i)}</span
        >
        ${G?c`<span
              class="sv__stage${G.guess?" sv__stage--guess":""}"
              title=${G.text}
              >${G.text}</span
            >`:""}
        ${at?c`<span
              class="sv__live"
              title="세션이 진행 중입니다"
              aria-label=${We?`\uC9C4\uD589 \uC911 \xB7 \uB9C8\uC9C0\uB9C9 \uC774\uBCA4\uD2B8 ${We}`:"\uC9C4\uD589 \uC911"}
              ><span class="sv__live-dot" aria-hidden="true"></span>${We?c`<span class="sv__live-ago">${We}</span>`:""}</span
            >`:""}
        ${qe?c`<button
              type="button"
              class="sv__session"
              title=${qe}
              aria-label=${`\uC138\uC158 ID \uBCF5\uC0AC: ${qe}`}
              @click=${()=>oe(qe)}
            >
              ⧉ ${qe.slice(0,8)}
            </button>`:""}
        ${p.resume_command?c`<button
              type="button"
              class="sv__resume-cmd"
              title=${p.resume_command}
              aria-label=${`\uC7AC\uAC1C \uBA85\uB839 \uBCF5\uC0AC: ${p.resume_command}`}
              @click=${()=>oe(p.resume_command||"")}
            >
              ⧉ 재개 명령
            </button>`:""}
        ${W?c`<span class="sv__meta">${W}</span>`:""}
        ${p.worktree?c`<span class="sv__wt" title=${p.worktree}
              >${p.worktree}</span
            >`:""}
        ${s||d?"":c`<button
              type="button"
              class="sv__prompt-toggle${te?" sv__prompt-toggle--on":""}"
              data-seam="attempt-prompt-toggle"
              aria-pressed=${te?"true":"false"}
              aria-label="발송 프롬프트 보기"
              title="이 세션에 실제로 보낸 시스템·과업 프롬프트"
              @click=${K}
            >
              ✉ 프롬프트
            </button>`}
        <button
          type="button"
          class="sv__follow${m?" sv__follow--on":""}"
          aria-pressed=${m?"true":"false"}
          aria-label=${dt}
          @click=${Q}
        >
          <span class="sv__follow-full">⇣ ${dt}</span>
          <span class="sv__follow-short">⇣ ${m?"ON":"OFF"}</span>
        </button>
        <button
          type="button"
          class="sv__close"
          aria-label="닫기"
          @click=${()=>Ue()}
        >
          ✕
        </button>
      </div>
      ${s||d?"":F()}
      <div class="sv__body">
        ${J.length===0?c`<div class="sv__empty">세션 로그 없음</div>`:H(J).map(he=>he.kind==="subagent"?Oe(he):he.kind==="group"?be(he):V(he.idx,he.line))}
      </div>
      ${Xe||$?c`<div class="sv__now">
            <span class="sv__now-label">지금</span>
            ${Xe?c`<span class="sv__now-icon">${Xe.icon}</span>
                  <span class="sv__now-name">${Xe.tool}</span>
                  <span class="sv__now-detail"
                    >${Xe.tool==="Bash"?ws(Xe.command):Xe.path||Xe.command||""}</span
                  >`:""}
            ${$?c`<span class="sv__now-think"
                  >💭 ${ws($.text)}</span
                >`:""}
          </div>`:""}
    </div>`}function be(J){return c`<div
      class="sv__group"
      role="button"
      tabindex="0"
      title="펼치기"
      @click=${()=>ke(J.idx)}
    >
      <span class="sv__group-icon">${J.lines[0].line.icon}</span>
      <span class="sv__group-name">${J.tool}</span>
      <span class="sv__group-count">${J.lines.length}</span>
      <span class="sv__group-caret" aria-hidden="true">▸</span>
    </div>`}function Oe(J){let W=k.has(J.idx),qe=J.header?J.header.line:null,dt=qe?qe.is_error===!0?"\u2717":typeof qe.result=="string"?"\u2713":"\u27F3":"",at=qe&&qe.command?qe.command:"";return c`<div class="sv__sub${W?" sv__sub--open":""}">
      <div
        class="sv__sub-head"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>ke(J.idx)}
      >
        <span class="sv__sub-icon" aria-hidden="true">🤖</span>
        <span class="sv__sub-name">${J.agent_type||"subagent"}</span>
        ${at?c`<span class="sv__sub-detail">${at}</span>`:""}
        <span class="sv__sub-count">${J.lines.length}줄</span>
        ${dt?c`<span class="sv__sub-state">${dt}</span>`:""}
        ${W?"":c`<span class="sv__sub-caret" aria-hidden="true">▸</span>`}
      </div>
      ${W?c`<div class="sv__sub-body">
            ${Pe(J.lines).map(We=>We.kind==="group"?be(We):V(We.idx,We.line))}
          </div>`:""}
    </div>`}function ke(J){k.add(J),Ce()}function Ce(){ct(Z(),e),ne(),m&&ot()}function ot(){let J=e.querySelector(".sv__body");J&&(J.scrollTop=J.scrollHeight)}function st(J){g.has(J)?g.delete(J):g.add(J),Ce()}function Q(){m=!m,Ce()}function oe(J){gn(J).then(W=>{W?ge("\uBCF5\uC0AC\uB428","success",1200):ge("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function se(J){!i||!J||(p={...p,...J},Ce())}function pe(J){let W=J.target;if(!W||!W.classList||!W.classList.contains("sv__body"))return;!(W.scrollHeight-W.scrollTop-W.clientHeight<=4)&&m&&(m=!1,Ce())}e.addEventListener("scroll",pe,!0);function Se(J){let W=J.target;!W||typeof W.closest!="function"||e.contains(W)||W.closest("dialog")||W.closest(".md-viewer-root")||Ue()}let me=!1;function Re(){me||(document.addEventListener("mousedown",Se),me=!0)}function je(){me&&(document.removeEventListener("mousedown",Se),me=!1)}function Qe(J){let W=J&&J.attempt_id;if(!W)return;let qe=typeof J.launch_id=="string"&&J.launch_id.length>0?J.launch_id:null,dt=J.session_ref&&typeof J.session_ref=="object"?J.session_ref:null;if(qe&&dt)return;let at=a;i=W,s=qe,l=dt,a=s?`session-log:${i}:${s}`:`session-log:${i}`,n&&at&&at!==a&&Promise.resolve(n("unsubscribe-session-log",{id:at})).catch(()=>{}),u=typeof J.root_dir=="string"&&J.root_dir.length>0?J.root_dir:null,p=J.meta||{},d=J.hide_prompt===!0,m=!0,g.clear(),k.clear(),q(),!T&&r&&(T=r.subscribe(Ce)),n&&Promise.resolve(n("subscribe-session-log",{id:a,attempt_id:i,...s?{launch_id:s}:{},...l?{session_ref:l}:{},...u?{root_dir:u}:{}})).catch(()=>{}),Re(),Ce()}function Ue(){let J=a;je(),i=null,s=null,l=null,a=null,u=null,d=!1,g.clear(),k.clear(),q(),ve(),n&&J&&Promise.resolve(n("unsubscribe-session-log",{id:J})).catch(()=>{}),ct(c``,e),o&&o()}return{open:Qe,updateMeta:se,close:Ue,isOpen(){return i!==null},destroy(){ve(),je(),T&&(T(),T=null),e.removeEventListener("scroll",pe,!0),i=null,s=null,l=null,a=null,u=null,d=!1,ct(c``,e)}}}function wy(e){let t=[],n=e?.workflow?.stages,r=n?.spec?.doc;r&&t.push({kind:"spec",path:r.path,missing_state:r.missing_state});let o=n?.plan?.doc;return o&&t.push({kind:"plan",path:o.path,missing_state:o.missing_state}),t}function Up(e,t){let n=wy(e);return c`
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
  `}var $y="## \u{1F916} \uC791\uC5C5 \uBCF4\uACE0\uC11C",xy=/^> (worker · attempt|session · sid) ([A-Za-z0-9._-]{1,64}) · (\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z)$/,Ay=/^\*\*결론\*\* — (.+)$/;function ta(e){if(typeof e!="string"||e.length===0)return null;let t=e.split(/\r?\n/);if(t[0]!==$y)return null;let n=xy.exec(t[1]||"");if(!n)return null;let r=n[1].split(" ")[0],o=n[2],i=n[3],s=2;for(;s<t.length&&t[s].trim().length===0;)s+=1;let l=s<t.length?Ay.exec(t[s]):null,a=l?l[1].replace(/\s+/g," ").trim():"",u=l?s+1:s;return{lane:r,identifier:o,timestamp:i,conclusion:a,body:t.slice(u).join(`
`).trim()}}var Wp=20;function zp(e){if(e==null||e==="")return"";let t=new Date(e);if(Number.isNaN(t.getTime()))return"";let n=String(t.getMonth()+1).padStart(2,"0"),r=String(t.getDate()).padStart(2,"0"),o=String(t.getHours()).padStart(2,"0"),i=String(t.getMinutes()).padStart(2,"0");return`${n}-${r} ${o}:${i}`}function Sy(e){return e.length>Wp?`${e.slice(0,Wp)}\u2026`:e}function Ey(e,t,n,r){let o=`${t.lane} ${Sy(t.identifier)}`;return c`<div class="detail-report">
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
        <span class="detail-report__time">${zp(t.timestamp)}</span>
      </span>
      <span class="detail-report__concl">${t.conclusion}</span>
    </button>
    ${r&&t.body.length>0?c`<div class="detail-report__body">
          ${vr(t.body)}
        </div>`:""}
  </div>`}function Ty(e){return c`<div class="detail-comment" data-comment-id=${e.id}>
    <div class="detail-comment__meta">
      <span class="detail-comment__author"
        >${e.author||"(\uC791\uC131\uC790 \uC5C6\uC74C)"}</span
      >
      <span class="detail-comment__time"
        >${zp(e.created_at)}</span
      >
    </div>
    <div class="detail-comment__body">
      ${vr(typeof e.text=="string"?e.text:"")}
    </div>
  </div>`}function Hp(e,t={},n={}){let r=Array.isArray(e)?e.filter(Boolean):[],o=n.expanded||new Set,i=typeof n.draft=="string"?n.draft:"",s=n.sending===!0,l=r.slice().sort((a,u)=>String(u.created_at||"").localeCompare(String(a.created_at||"")));return c`
    <div class="detail-section-label">댓글 (${r.length})</div>
    ${n.error?c`<div class="detail-empty" data-seam="comments-error">
          댓글을 불러오지 못했습니다
        </div>`:l.length===0?c`<div class="detail-empty" data-seam="comments">댓글 없음</div>`:c`<div class="detail-comments" data-seam="comments">
            ${l.map(a=>{let u=ta(typeof a.text=="string"?a.text:"");return u?Ey(a,u,t,o.has(a.id)):Ty(a)})}
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
  `}var{I:_A}=wc;var Kp=e=>e.strings===void 0;var Cy={},Gp=(e,t=Cy)=>e._$AH=t;var kr=Ki(class extends ko{constructor(e){if(super(e),e.type!==sr.PROPERTY&&e.type!==sr.ATTRIBUTE&&e.type!==sr.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!Kp(e))throw Error("`live` bindings can only contain a single expression")}render(e){return e}update(e,[t]){if(t===Sn||t===Yt)return t;let n=e.element,r=e.name;if(e.type===sr.PROPERTY){if(t===n[r])return Sn}else if(e.type===sr.BOOLEAN_ATTRIBUTE){if(!!t===n.hasAttribute(r))return Sn}else if(e.type===sr.ATTRIBUTE&&n.getAttribute(r)===t+"")return Sn;return Gp(e),t}});var Ry=[{id:"spec",label:"spec \uB9AC\uBDF0",receipt:"spec_review",receipt_stage:null,fill_stage:"spec",stale_stage:"spec",hue:"spec"},{id:"plan",label:"\uACC4\uD68D \uB9AC\uBDF0",receipt:null,receipt_stage:"plan",fill_stage:"plan",stale_stage:"plan",hue:"plan"},{id:"impl",label:"\uAD6C\uD604",receipt:null,receipt_stage:null,fill_stage:"impl",stale_stage:null,hue:"impl"},{id:"impl_review",label:"impl \uB9AC\uBDF0",receipt:"impl_review",receipt_stage:null,fill_stage:null,stale_stage:"impl",hue:"impl"},{id:"pr",label:"PR",receipt:null,receipt_stage:null,fill_stage:"pr",stale_stage:null,hue:"pr"}],Gl={quick_fix:["impl","impl_review"],spec_backed:["spec","impl","impl_review","pr"],full_plan:["spec","plan","impl","impl_review","pr"]},Yp={missing:"\uC2B9\uC778 \uD544\uC694",stale:"\uC7AC\uC2B9\uC778 \uD544\uC694",unknown:"\uC2B9\uC778 \uD655\uC778 \uBD88\uAC00"},Oy={pin:"pin",global:"global",base:"base"};function Iy(e){return c`<span
    class=${`detail-layer-rail detail-layer-rail--${Oy[e]}`}
    data-source=${e}
    aria-hidden="true"
    ><i></i><i></i><i></i
  ></span>`}function Ly(e,t,n){switch(e){case"workflow_mode":return Uo;case"spec_review_model":case"impl_review_model":return Wo;case"plan_review_model":return ui;case"spec_review_effort":case"plan_review_effort":case"impl_review_effort":return di;case"spec_review_speed":case"plan_review_speed":case"impl_review_speed":return Kn;case"impl_dispatch":return Bo;case"impl_runtime":return ci;case"impl_model":return fo(n,t.impl_runtime);case"impl_effort":return Pr(n,t.impl_runtime,t.impl_model);case"impl_speed":case"orchestration_speed":return Kn;case"orchestration_model":return _o(n,null);case"orchestration_effort":return Pr(n,void 0,t.orchestration_model||wn).filter(r=>r!==wn);default:return[]}}function Dy(e,t){return c`<div class="detail-effective__row" data-key=${e.key}>
    ${Iy(e.source)}
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
      >${fi[e.source]}</span
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
  </div>`}function Vp(e,t){let n=Va.flatMap(a=>a.keys),r=Qa(n,e.metadata,e.workspace_values,e.execution_defaults,e.catalog,e.controller_runtime||null),o=zu(n,e.metadata,e.workspace_values,e.execution_defaults,e.catalog,e.controller_runtime||null),i=Object.fromEntries(r.map(a=>[a.key,a])),s=Object.fromEntries(r.filter(a=>a.value!==null).map(a=>[a.key,a.value])),l=r.filter(a=>a.full_value&&a.display!==a.full_value).map(a=>a.full_value).join(" \xB7 ");return c`<details
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
        >${Py(i)}</span
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
          ${Va.map(a=>c`
              <div class="detail-effective__subhead">${a.label}</div>
              ${r.filter(u=>a.keys.includes(u.key)).map(u=>{let d=oi({key:u.key,choices:Ly(u.key,s,e.catalog),layer:"pin",pin:e.metadata,global:e.workspace_values,execution_defaults:e.execution_defaults,runner_catalog:e.catalog,route:typeof e.metadata?.route=="string"?e.metadata.route:null,controller_runtime:e.controller_runtime||null});return Dy(u,{expanded:e.expanded,options:d.options,default_label:d.unset_label,default_full_value:d.full_value,onEdit:t.onEdit})})}
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
  </details>`}function Py(e){let t=[];if(e.workflow_mode&&t.push(e.workflow_mode.display),e.impl_dispatch?.value==="main")t.push("\uBA54\uC778");else if(e.impl_dispatch?.value==="delegated"){let n=e.impl_runtime?` ${e.impl_runtime.display}`:"";t.push(`\uC704\uC784${n}`)}for(let n of["impl_model","impl_effort","impl_speed"])e[n]?.resolution!=="not_applicable"&&t.push(e[n]?.display||"\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00");return t.join(" \xB7 ")}function My(e){if(!e||typeof e!="object")return null;let{kind:t,actor:n,effort:r,sha:o}=e;return typeof t!="string"||typeof n!="string"||typeof o!="string"?null:{kind:t,actor:n,effort:typeof r=="string"?r:null,sha:o}}function Qp(e,t={}){let n=e&&typeof e.metadata=="object"&&e.metadata?e.metadata:{},r=e&&typeof e.workflow=="object"&&e.workflow?e.workflow:{},o=r.stages||{},i=r.route||n.route||null,s=typeof n.pr_url=="string"?n.pr_url:"",l=typeof n.exec_receipt=="string"?n.exec_receipt:"",a=My(r.exec_receipt),u=a?Jn(a):l,d=a?`${a.kind}:${a.actor}`:l.split("@")[0],p=ti(r.planned_execution,r.exec_receipt),m=r.chips?.pr?.number,g=typeof m=="number"?`PR #${m}`:"PR",k=Ho(n),T=k!==null&&t.isChipOpen?.("rec")===!0,C=T?al({rec:k},"rec"):null;return c`<section class="detail-summary" data-seam="detail-summary">
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
            >${g}</a
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
      ${k?c`<button
            type="button"
            class="detail-summary__chip detail-summary__chip--rec judgement-chip"
            data-chip-key="rec"
            data-state=${k.state}
            aria-expanded=${T?"true":"false"}
            title=${gi(k)}
            @click=${()=>t.onChipToggle?.("rec")}
          >
            ${"\uBCF5\uC7A1"}
          </button>`:""}
    </div>
    ${C?co(C):""}
    <div
      class="detail-summary__gates"
      role="group"
      aria-label="워크플로 게이트"
    >
      ${qy(i).map(te=>Ny(te,n,o,{label:te.id==="pr"?g:te.label,href:te.id==="pr"?s:""}))}
    </div>
  </section>`}function qy(e){let n=typeof e=="string"&&Object.hasOwn(Gl,e)&&Gl[e]||Gl.spec_backed;return Ry.filter(r=>n.includes(r.id))}var na={on:"\uD1B5\uACFC",stale:"\uC7AC\uAC80\uD1A0 \uD544\uC694",current:"\uC9C4\uD589 \uC911",none:"\uBBF8\uB3C4\uB2EC"};function Ny(e,t,n,r){let o=jy(e,t,n),i=e.fill_stage?n[e.fill_stage]:null,s=typeof i?.fill=="string"?i.fill:null,l=s?s==="full":o.length>0,a=!l&&s==="dim",u=e.stale_stage?n[e.stale_stage]?.stale===!0:!1,d=o&&o.split("@")[1]?.slice(0,7)||"",p=u?na.stale:l?na.on:a?na.current:na.none,m=Fy(e,n),g=`${r.label} \xB7 ${p}${m?` \xB7 ${m}`:""}${o?` \xB7 ${o}`:""}`,k=`detail-summary__gate${l?" detail-summary__gate--on":""}${a?" detail-summary__gate--current":""}${u?" detail-summary__gate--stale":""}${d?" detail-summary__gate--receipt":""}`,T=c`<span class="detail-summary__gate-label"
      >${r.label}</span
    >
    <span class="detail-summary__gate-rail"></span>
    <span class="detail-summary__gate-sha">${d}</span>`;return r.href?c`<a
      class=${k}
      data-gate=${e.id}
      data-hue=${e.hue}
      href=${r.href}
      target="_blank"
      rel="noreferrer"
      title=${g}
      >${T}</a
    >`:c`<span
    class=${k}
    data-gate=${e.id}
    data-hue=${e.hue}
    title=${g}
    >${T}</span
  >`}function jy(e,t,n){if(e.receipt&&typeof t[e.receipt]=="string")return String(t[e.receipt]);if(e.receipt_stage){let r=n[e.receipt_stage]?.receipt;return typeof r=="string"?r:""}return""}function Fy(e,t){if(e.id!=="plan")return"";let n=t.plan?.approval_state;return typeof n=="string"&&Object.hasOwn(Yp,n)?Yp[n]:""}function ra(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function Xp(e){return ra(e)&&typeof e.key=="string"&&e.key.length>0&&typeof e.email=="string"&&e.email.length>0}function Zp(e,t){let n=e&&e[t];if(!ra(n)||!Array.isArray(n.accounts))return null;let r=n.accounts.filter(Xp),o=Xp(n.active)?n.active:null;return{accounts:r,active:o||r.find(i=>i.active===!0)||null}}function tf(e){return typeof e.alias=="string"&&e.alias.length>0?` (${e.alias})`:""}function oa(e){let t=typeof e.status=="string"&&e.status!=="ok"?` \xB7 ${e.status}`:"";return`${e.email}${tf(e)}${t}`}function xo(e){let t=typeof e.plan=="string"&&e.plan.length>0?e.plan:"plan \uD655\uC778 \uBD88\uAC00";return`${e.email} \xB7 ${t}${tf(e)}`}function By(e,t,n){if(n!==null){let o=e==="claude"?oa:xo,i=t?t.accounts.find(s=>s.key===n):void 0;return`\uB808\uD3EC \uAE30\uBCF8\uAC12 \uC0AC\uC6A9(${i?o(i):n})`}return t?t.active?`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(${e==="claude"?t.active.email:xo({...t.active,alias:null})})`:"\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(\uD655\uC778 \uBD88\uAC00)":"(\uAE30\uBCF8)"}function Jp(e,t){if(!ra(e)||e.state!=="usable"||!ra(e.values))return null;let n=e.values[t];return typeof n=="string"&&n.length>0?n:null}function ef(e){let t=e.provider_key==="claude"?oa:xo,n=!!e.provider?.accounts.some(r=>r.key===e.selected);return c`<div class="detail-kv" data-exec-account-row=${e.key}>
    <span class="detail-kv__k">${e.title}</span>
    <span class="detail-kv__vgroup">
      <select
        class=${e.selected?"detail-kv__v detail-kv__v--sel":"detail-kv__v"}
        aria-label=${e.title}
        data-exec-key=${e.key}
        @change=${r=>e.handlers.onExecChange(e.key,r.target.value)}
      >
        <option value="" ?selected=${e.selected.length===0}>
          ${By(e.provider_key,e.provider,e.workspace_default)}
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
  </div>`}function nf({md:e,catalog:t,workspace_defaults:n=null,handlers:r}){let o=typeof e.claude_account=="string"?e.claude_account:"",i=typeof e.codex_account=="string"?e.codex_account:"";return c`<section class="exec-accounts" data-exec-accounts>
    <div class="detail-section-label">실행 계정</div>
    <div class="exec-settings-core">
      ${ef({key:"claude_account",title:"Claude \uACC4\uC815",provider_key:"claude",provider:Zp(t,"claude"),selected:o,workspace_default:Jp(n,"claude_account"),handlers:r,hint:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uB7F0\uD0C0\uC784\uC774 claude\uC77C \uB54C \uC801\uC6A9\uB429\uB2C8\uB2E4"})}
      ${ef({key:"codex_account",title:"Codex \uACC4\uC815",provider_key:"codex",provider:Zp(t,"codex"),selected:i,workspace_default:Jp(n,"codex_account"),handlers:r})}
    </div>
  </section>`}function Uy(e){return String(e||"").replace(/^docs\/(superpowers\/)?/,"")}function Wy(e){let t=/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(e);if(!t)return{front:null,body:e};let n=t[1].trim();return{front:n.length>0?n:null,body:e.slice(t[0].length)}}function sa(e,t){let n=t.getWorkspacePath,r=t.fetchImpl||globalThis.fetch?.bind(globalThis),o=null,i="loading",s="",l=null,a="";function u(T){T.key==="Escape"&&o&&(T.preventDefault(),g())}document.addEventListener("keydown",u);function d(){return o?c`
      <div class="mv-overlay" role="dialog" aria-modal="true">
        <div class="mv-overlay__backdrop" @click=${()=>g()}></div>
        <div class="mv">
          <div class="mv__bar">
            <span class="mv__path" title=${o}
              >${Uy(o)}</span
            >
            <button
              type="button"
              class="mv__close"
              aria-label="닫기"
              @click=${()=>g()}
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
    `:c``}function p(){ct(d(),e)}async function m(T,C={}){o=T,i="loading",s="",l=null,a="",p();let te=C.workspace||(n?n():"");if(!te){i="error",a="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4",p();return}if(!r){i="error",a="fetch\uB97C \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",p();return}let re="/api/doc?workspace="+encodeURIComponent(te)+"&path="+encodeURIComponent(T);try{let X=await r(re),D=await X.json().catch(()=>({}));if(!X.ok||!D||D.ok!==!0){if(D?.error==="not_found"&&C.missing_state==="plan_pending"){i="pending",a="\uACC4\uD68D \uC791\uC131 \uC804 \xB7 \uACBD\uB85C\uB9CC \uC608\uC57D\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4",p();return}i="error",a="\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 ("+String(D&&D.error||X.status)+")",p();return}let O=Wy(String(D.content||""));l=O.front,s=O.body,i="ready",p()}catch{i="error",a="\uBB38\uC11C \uC694\uCCAD \uC2E4\uD328",p()}}function g(){o=null,ct(c``,e)}function k(){document.removeEventListener("keydown",u),g()}return{open:m,close:g,destroy:k}}var zy=[{key:"input_tokens",label:"\uC785\uB825"},{key:"output_tokens",label:"\uCD9C\uB825"},{key:"cache_read_input_tokens",label:"\uCE90\uC2DC \uC77D\uAE30"}],sf="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4",ia=[{role:"implementation",provider:"codex"},{role:"review-consult",provider:"codex"},{role:"subagent",provider:"claude"}],Hy=new Set(["codex-runner","Explore","Plan","advisor","advisor-xhigh","claude-code-guide","statusline-setup"]);function rf(e){return typeof e=="string"&&Hy.has(e)}var Ky=["running","done","failed","interrupted"],Gy={running:"\u25CF",done:"\u2713",failed:"\u2717",interrupted:"\u26A0"};function Yy(e){return typeof e=="number"&&Number.isFinite(e)?e:0}function Vy(e){let t=ln(e);if(t.length>0)return t.map(o=>c`<span class="detail-usage-total" title=${o.tooltip}
          >${o.label}</span
        >`);let n=ao(e);if(!n||!e)return"";let r=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?` \xB7 $${e.total_cost_usd.toFixed(2)}`:"";return c`<span
      class="detail-usage-total"
      title="이 이슈의 모든 attempt 토큰 합계 (입력+출력+캐시)"
      >${n.replace(/^τ /,"\u03C4 \uCD1D ")}${r}</span
    >${e.replayed?c`<span class="detail-usage-partial" title=${sf}
          >부분 집계</span
        >`:""}`}function of(e){return!e||!e.roles.orchestrator?null:{providers:e.roles.orchestrator,roles:{}}}function Ql(e){if(typeof e=="number")return $s(e);if(typeof e!="string")return"";let t=Date.parse(e);return Number.isFinite(t)?$s(t):""}function Qy(e){return typeof e=="string"?e.replace(/-\d{8}$/,""):""}function af(e,t,n){if(e.provider!=="claude"){let o=e.session_id?` \xB7 thread ${e.session_id}`:"",i=n?" \xB7 \uC774\uC804 \uB77C\uC6B4\uB4DC \uC2A4\uB808\uB4DC \uC774\uC5B4\uAC10":"";return{text:`${n?"\u21A9 ":""}${e.launch_id}`,title:`${e.launch_id}${o}${i}`}}let r=t&&typeof t.agent_id=="string"?t.agent_id:"";return r.length>0?{text:r.slice(0,8),title:r}:{text:e.launch_id.slice(-8),title:e.launch_id}}function Yl(e){return e===null||typeof e=="string"&&e.trim().length>0}function Vl(e){return e===null||typeof e=="number"&&Number.isFinite(e)}function Xy(e){if(!e||typeof e!="object"||Array.isArray(e))return null;let t=e,n=t.provider==="claude";return typeof t.launch_id!="string"||t.launch_id.length===0||!ia.some(r=>r.role===t.role&&r.provider===t.provider)||!(n?Yl(t.model):typeof t.model=="string"&&t.model.length>0)||!(!("effort"in t)||Yl(t.effort))||!(!("agent_type"in t)||Yl(t.agent_type))||typeof t.session_id!="string"||t.session_id.length===0||!Ky.includes(t.status)||!(t.turn_id===null||typeof t.turn_id=="string")?null:n?!Vl(t.started_at)||!Vl(t.last_event_at)||!Vl(t.completed_at)?null:t:typeof t.started_at!="number"||!Number.isFinite(t.started_at)||typeof t.last_event_at!="number"||!Number.isFinite(t.last_event_at)||!(t.completed_at===null||typeof t.completed_at=="string"&&Number.isFinite(Date.parse(t.completed_at)))?null:t}function Zy(e,t,n,r){let i=ln({providers:{[t]:{subtotal:n.subtotal,breakdown:n.usage,...n.replayed?{replayed:!0}:{}}},roles:{}})[0],s=af({provider:t,launch_id:n.receipt_id,session_id:typeof n.session_id=="string"?n.session_id:void 0},n,r);return c`<div class="detail-session__leg detail-session__usage-detail">
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
    ${Ql(n.completed_at)?c`<span class="detail-session__leg-time detail-session__time"
          >${Ql(n.completed_at)}</span
        >`:""}
    ${i?c`<span class="detail-session__usage" title=${i.tooltip}
          >${i.label}</span
        >`:""}
  </div>`}function Jy(e,t,n,r,o){let i=e.status==="running"?null:t,l=(i?ln({providers:{[e.provider]:{subtotal:i.subtotal,breakdown:i.usage,...i.replayed?{replayed:!0}:{}}},roles:{}}):[])[0],a=e.status==="running"?$s(e.last_event_at):i?Ql(i.completed_at):"",u=(e.provider==="claude"?["Claude",e.agent_type,Qy(e.model),e.effort]:["codex",e.model,e.effort]).filter(Boolean).join(" \xB7 "),d=af(e,i,o);return c`<button
    type="button"
    class="detail-session__leg detail-session__usage-detail detail-session__leg--${e.status}"
    data-launch-id=${e.launch_id}
    @click=${()=>r.onOpenDelegation&&r.onOpenDelegation(n,e.launch_id)}
  >
    <span class="detail-session__leg-glyph" aria-hidden="true"
      >${Gy[e.status]}</span
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
  </button>`}function ev(e,t){return e.role===t.role&&(e.model===null||t.model===void 0||e.model===t.model)&&e.session_id===t.session_id}function tv(e,t,n){let r=[],o=new Set,i=Array.isArray(e.delegation_sessions)?e.delegation_sessions:[];for(let p of i){let m=Xy(p);!m||o.has(m.launch_id)||rf(m.agent_type)||(o.add(m.launch_id),r.push(m))}r.sort((p,m)=>(p.started_at||0)-(m.started_at||0));let s={};for(let{role:p,provider:m}of ia){let g=t?t.roles[p]?.[m]:null;s[p]=g?[...g.legs]:[]}let l=ia.flatMap(({role:p})=>s[p]),a=new Set,u=new Set,d=[];for(let{role:p,provider:m}of ia){for(let g of r.filter(k=>k.role===p&&k.provider===m)){let k=l.find(C=>C.receipt_id===g.launch_id)||null;if(k&&!ev(g,k))continue;k&&a.add(k.receipt_id);let T=m==="codex"&&u.has(g.session_id);d.push(Jy(g,k,e.attempt_id,n,T)),m==="codex"&&u.add(g.session_id)}for(let g of s[p])if(!a.has(g.receipt_id)&&!rf(g.agent_type)){let k=typeof g.session_id=="string"&&g.session_id.length>0?g.session_id:null,T=m==="codex"&&k!==null&&u.has(k);d.push(Zy(p,m,g,T)),m==="codex"&&k!==null&&u.add(k)}}return d}function nv(e,t){let n=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?e.total_cost_usd:null,r=[...zy,{key:"cache_creation_input_tokens",label:t==="codex"?"\uCE90\uC2DC \uC4F0\uAE30":"\uCE90\uC2DC \uC0DD\uC131"},...t==="codex"&&typeof e.reasoning_output_tokens=="number"&&Number.isFinite(e.reasoning_output_tokens)?[{key:"reasoning_output_tokens",label:"\uCD94\uB860 \uCD9C\uB825"}]:[]];return c`<div class="detail-session__usage-detail">
    ${r.map(o=>c`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">${o.label}</span
          ><span class="detail-session__usage-value"
            >${Yy(e[o.key]).toLocaleString("en-US")}</span
          ></span
        >`)}
    ${n===null?"":c`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">비용</span
          ><span class="detail-session__usage-value"
            >$${n.toFixed(2)}</span
          ></span
        >`}
    ${e.replayed?c`<span class="detail-session__usage-note">${sf}</span>`:""}
  </div>`}var rv={running:"\u25CF",done:"\u2713",failed:"\u2717",orphaned:"\u26A0"};function $s(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),n=String(t.getHours()).padStart(2,"0"),r=String(t.getMinutes()).padStart(2,"0");return`${n}:${r}`}function ov(e){if(typeof e.exec_default_preset_id!="string"||e.exec_default_preset_id.length===0)return"";let t=e.exec_values&&typeof e.exec_values=="object"?Object.entries(e.exec_values).filter(([,r])=>typeof r=="string"&&r.length>0).map(([r,o])=>`${r}=${o}`).join(" \xB7 "):"",n=typeof e.exec_default_preset_revision=="number"?` r${e.exec_default_preset_revision}`:"";return c`<div
    class="detail-session__preset-audit"
    data-attempt-preset-audit
  >
    <strong>외부 실행 preset</strong>
    <span>${e.exec_default_preset_id}${n}</span>
    ${t?c`<small>${t}</small>`:""}
    <small>내부 workflow 실행 영수증과 별도 기록</small>
  </div>`}var sv={remote:"\uB2E4\uB978 \uBA38\uC2E0 \uC138\uC158 \u2014 \uC774 \uC11C\uBC84\uC5D0 transcript \uC5C6\uC74C",missing:"transcript \uD30C\uC77C \uC5C6\uC74C"};function iv(e,t){let n=sv[e.locality]||"",r=e.locality==="remote"?`${e.host} \xB7 \uB2E4\uB978 \uBA38\uC2E0`:e.locality==="missing"?`${e.host} \xB7 \uD30C\uC77C \uC5C6\uC74C`:e.host;return c`<div class="detail-session-row">
    <button
      type="button"
      class="detail-session detail-session--session"
      data-session-key=${Ba(e)}
      ?disabled=${n.length>0}
      title=${n}
      @click=${()=>{n.length===0&&t.onOpenSessionRef&&t.onOpenSessionRef(e)}}
    >
      <span class="detail-session__glyph">${e.current?"\u25D0":"\xB7"}</span>
      <span class="detail-session__id">${qo(e)}</span>
      <span class="detail-session__meta">${r}</span>
      <span class="detail-session__sid" title=${e.session_id}
        >${e.session_id.slice(0,8)}</span
      >
      <span class="detail-session__time">${$s(e.last_event_at)}</span>
    </button>
    ${e.resume_command?c`<button
          type="button"
          class="op-btn detail-session__resume-cmd"
          title=${e.resume_command}
          @click=${o=>{o.stopPropagation(),t.onCopyResumeCommand&&e.resume_command&&t.onCopyResumeCommand(e.resume_command)}}
        >
          ⧉ 재개
        </button>`:""}
  </div>`}function lf(e,t={},n={},r=[]){let o=Array.isArray(e)?e:[],i=Array.isArray(r)?r:[],s=[...i.filter(g=>g&&g.current===!0),...i.filter(g=>g&&g.current!==!0).sort((g,k)=>k.index-g.index)],l=s.map(g=>iv(g,t)),a=n.expanded||new Set;if(o.length===0&&s.length===0)return c`
      <div class="detail-section-label">세션 이력</div>
      <div class="detail-empty" data-seam="session-history">세션 이력 없음</div>
    `;let u=new Set;for(let g of o)g&&typeof g.resumed_from=="string"&&g.resumed_from.length>0&&u.add(g.resumed_from);let d=g=>{if(!(g.status==="failed"||g.status==="orphaned"))return"";let T=typeof g.session_id=="string"&&g.session_id.length>0,C=u.has(g.attempt_id),te=T&&!C,re=T?C?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":"\uC774 \uC138\uC158\uC744 \uAC19\uC740 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C \uC774\uC5B4\uC11C \uC9C4\uD589":"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00";return c`<button
      type="button"
      class="op-btn detail-session__resume"
      data-attempt-id=${g.attempt_id}
      ?disabled=${!te}
      title=${re}
      @click=${X=>{X.stopPropagation(),te&&t.onResume&&t.onResume(g.attempt_id)}}
    >
      ↻ 이어하기
    </button>`},p=g=>{if(!(g.status==="failed"||g.status==="orphaned")||typeof g.cause!="string"||g.cause==="")return"";let T=g.cause_detail,C=T&&typeof T.reason=="string"&&T.reason.length>0?typeof T.command=="string"&&T.command.length>0?`${T.reason} \xB7 ${T.command}`:T.reason:g.cause;return c`<div class="detail-session__cause" title=${C}>
      ${g.cause}
    </div>`},m=g=>{let k=of(Ha(g));if(ln(k).length===0&&!ao(g.usage))return"";let T=a.has(g.attempt_id);return c`<button
      type="button"
      class="detail-session__usage-toggle"
      data-attempt-id=${g.attempt_id}
      aria-expanded=${T?"true":"false"}
      title=${T?"\uD1A0\uD070 \uB0B4\uC5ED \uC811\uAE30":"\uD1A0\uD070 \uB0B4\uC5ED \uD3BC\uCE58\uAE30"}
      @click=${C=>{C.stopPropagation(),t.onToggleUsage&&t.onToggleUsage(g.attempt_id)}}
    >
      τ 자세히
    </button>`};return c`
    <div class="detail-section-label">
      세션 이력${Vy(n.total)}
    </div>
    <div class="detail-sessions" data-seam="session-history">
      ${l}${o.map(g=>{let k=Ha(g),T=of(k),C=ln(T);return c`<div class="detail-session-row">
          <button
            type="button"
            class="detail-session detail-session--${g.status||"unknown"}"
            data-attempt-id=${g.attempt_id}
            @click=${()=>t.onOpen&&t.onOpen(g.attempt_id)}
          >
            <span class="detail-session__glyph"
              >${rv[g.status||""]||"\xB7"}</span
            >
            <span class="detail-session__id">${g.attempt_id}</span>
            ${Mo(g)?c`<span
                  class="detail-session__resumed"
                  title=${Mo(g)}
                  >↻</span
                >`:""}
            <span class="detail-session__meta">${xn(g)}</span>
            ${C.length>0?c`<span class="detail-session__role">orchestrator</span>`:""}
            ${g.session_id?c`<span class="detail-session__sid" title=${g.session_id}
                  >${String(g.session_id).slice(0,8)}</span
                >`:""}
            ${C.length>0?C.map(te=>c`<span
                      class="detail-session__usage"
                      title=${te.tooltip}
                      >${te.label}</span
                    >`):ao(g.usage)?c`<span class="detail-session__usage"
                    >${ao(g.usage)}</span
                  >`:""}
            <span class="detail-session__time">${$s(g.started_at)}</span>
          </button>
          ${m(g)} ${d(g)} ${p(g)} ${ov(g)}
          ${a.has(g.attempt_id)&&g.usage?nv(g.usage,g.runner==="codex"?"codex":"claude"):""}
          ${tv(g,k,t)}
        </div>`})}
    </div>
  `}function cf(e,t={}){return c`
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
          ${av(e)}
        </div>`:""}
  `}function av(e){let t=wo(e);if(t)return t;let n=e.data;if(!n)return"";if(n.missing)return c`<div class="detail-prompt__missing">
        기록 없음 — 아직 이 이슈로 디스패치된 세션이 없습니다. 아래는 다음
        디스패치가 보낼 기본 과업입니다.
      </div>
      ${typeof n.default_task_prompt=="string"?ar("\uC608\uC0C1 \uAE30\uBCF8 \uACFC\uC5C5",n.default_task_prompt):""}`;let r=ea(n.recorded_at);return c`<div class="detail-prompt__meta">
      ${n.attempt_id}${r?` \xB7 ${r}`:""}
    </div>
    ${typeof n.task_prompt=="string"?ar("\uACFC\uC5C5 (user)",n.task_prompt):""}
    ${typeof n.system_prompt=="string"?ar("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",n.system_prompt):""}`}var Wr=10;function uf(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),n=r=>String(r).padStart(2,"0");return`${n(t.getMonth()+1)}-${n(t.getDate())} ${n(t.getHours())}:${n(t.getMinutes())}`}function df(e,t={}){let r=(Array.isArray(e?.events)?e.events:[]).filter(l=>l&&typeof l.summary=="string"&&l.summary.trim().length>0);if(r.length===0)return"";let o=typeof e.shown=="number"&&e.shown>0?e.shown:Wr,i=r.slice(0,o),s=r.length-i.length;return c`
    <div class="detail-section-label">Worker 이력 (${r.length})</div>
    <ol class="detail-timeline" data-seam="worker-timeline">
      ${i.map(l=>c`<li class="detail-timeline__row">
            ${uf(l.at)?c`<span class="detail-timeline__at"
                  >${uf(l.at)}</span
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
  `}var lv=["open","in_progress","deferred","resolved","closed"],cv=[0,1,2,3,4];function pf(e,t){let n=t.issueStores,r=t.onClose,o=t.transport,i=t.onNavigate,s=t.queueStore,l=t.execPresetStore,a=t.sessionLogStore,u=null,d=null,p={},m="",g=!1,k=[],T=!1,C=!1,te={},re={claude:null,codex:null},X=null,D=null,O=0,q=!1,B=!1,K="",F="",N="",Y="",U=!1;function ne(){q=!1,B=!1,K="",F="",N="",Y="",U=!1}function ve(){re={claude:null,codex:null},X=null,D=null,O+=1}async function Pe(){if(!o)return null;try{let y=await Promise.resolve(o("get-workspace-accounts",{}));return y&&typeof y.state=="string"?y:null}catch{return null}}async function H(y){try{let P=await fetch(y);if(!P.ok)return null;let A=await P.json();if(!A||typeof A!="object"||!Array.isArray(A.accounts))return null;let ae=A.accounts.filter(De=>De!==null&&typeof De=="object"&&!Array.isArray(De));return{accounts:ae,active:ae.find(De=>De.active===!0)||null}}catch{return null}}async function ie(y){D=y;let P=++O,[A,ae,De]=await Promise.all([H("/api/claude-usage"),H("/api/codex-usage"),Pe()]);P!==O||y!==u||(re={claude:A,codex:ae},X=De,tt())}let _e=[],Te=null,V=null,le=!1,Z="",be=!1,Oe=0,ke=new Set;function Ce(){_e=[],Te=null,V=null,le=!1,Z="",be=!1,Oe+=1,ke.clear()}async function ot(y){if(!o)return;let P=++Oe;try{let A=await Promise.resolve(o("get-comments",{id:y}));if(P!==Oe||y!==u)return;_e=Array.isArray(A)?A:[],le=!1}catch{if(P!==Oe||y!==u)return;le=!0}tt()}function st(){if(!o||!u)return;let y=d&&typeof d.comment_count=="number"?d.comment_count:null;if(Te!==u){Te=u,V=y,ot(u);return}y!==null&&y!==V&&(V=y,ot(u))}function Q(y){ke.has(y)?ke.delete(y):ke.add(y),tt()}function oe(y){let P=Z.trim().length===0;Z=y,P!==(y.trim().length===0)&&tt()}async function se(){let y=Z.trim();if(!o||!u||y.length===0||be)return;let P=u;be=!0,tt();let A=!1;try{let ae=await Promise.resolve(o("add-comment",{id:P,text:y}));Array.isArray(ae)&&ae.length>0&&(A=!0,P===u&&(_e=ae,le=!1,Z="",V=ae.length))}catch{A=!1}A||ge("\uB313\uAE00 \uCD94\uAC00 \uC2E4\uD328","error"),P===u&&(be=!1),tt()}let pe={onToggle:Q,onDraftInput:oe,onSubmit:se},Se=t.mdViewer||null,me=null;Se||(me=document.createElement("div"),me.className="md-viewer-root",document.body.appendChild(me));let Re=Se||sa(me,{getWorkspacePath:t.getWorkspacePath||(()=>"")}),je=document.createElement("div");je.className="session-log-root",document.body.appendChild(je);let Qe=$o(je,{transport:o?(y,P)=>Promise.resolve(o(y,P)):void 0,sessionLogStore:a}),Ue=!1,J=!1,W=!1,qe=null,dt=null,at=0;function We(y){return`${t.getWorkspacePath&&t.getWorkspacePath()||""}::${y}`}function Xe(){Ue=!1,J=!1,W=!1,qe=null,dt=null,at+=1}async function $(y){if(!o)return;let P=++at;J=!0,W=!1,tt();try{let A=await Promise.resolve(o("get-bead-prompt",{bead_id:y}));if(P!==at)return;!A||typeof A!="object"||Array.isArray(A)?W=!0:(qe=A,dt=We(y))}catch{P===at&&(W=!0)}finally{P===at&&(J=!1,tt())}}let G=[],he=null,Ke=0;function it(y,P){return`${t.getWorkspacePath&&t.getWorkspacePath()||""}::${y}::${P}`}function ze(){G=[],he=null,Ke+=1}async function Tt(y,P){if(!o)return;let A=++Ke,ae;try{ae=await Promise.resolve(o("get-session-refs",{bead_id:y}))}catch{ae=null}A!==Ke||P!==he||(G=ae&&Array.isArray(ae.sessions)?ae.sessions:[],tt())}function Dt(){if(!o||!u)return;let y=d&&d.metadata,P=y&&typeof y=="object"&&typeof y.session_ref=="string"?y.session_ref:null;if(P===null){ze();return}let A=it(u,P);he!==A&&(G=[],he=A,Tt(u,A))}let nt=[],wt=[],Mt=Wr,Lt=null,Bt=0;function ce(y){return`${t.getWorkspacePath&&t.getWorkspacePath()||""}::${y}`}function we(){nt=[],wt=[],Mt=Wr,Lt=null,Bt+=1}async function Be(y,P){if(!o)return;let A=++Bt,ae;try{ae=await Promise.resolve(o("get-bead-timeline",{bead_id:y}))}catch{ae=null}A!==Bt||P!==Lt||(nt=ae&&Array.isArray(ae.events)?ae.events:[],wt=ae&&Array.isArray(ae.attempts)?ae.attempts:[],Mt=Wr,tt())}function Je(){if(!o||!u)return;let y=ce(u);Lt!==y&&(nt=[],wt=[],Mt=Wr,Lt=y,Be(u,y))}function Ze(){Mt+=Wr,tt()}function pt(){if(Ue=!Ue,Ue&&u&&dt!==We(u)){qe=null,$(u);return}tt()}function gt(){let y={};for(let A of wt)A&&typeof A=="object"&&A.bead_id===u&&(y[String(A.attempt_id)]=A);let P=s?s.get():null;for(let A of P&&P.attempts?Object.values(P.attempts):[]){let ae=A;ae&&ae.bead_id===u&&(y[String(ae.attempt_id)]=ae)}return y}function et(){return u?Object.values(gt()).sort((P,A)=>(A.started_at||0)-(P.started_at||0)).map(P=>({attempt_id:P.attempt_id,bead_id:P.bead_id,status:P.status,started_at:typeof P.started_at=="number"?P.started_at:null,runner:P.runner||null,model:P.model||null,effort:P.effort||P.observed_effort||null,speed:P.speed||null,session_id:P.session_id||null,resumed_from:P.resumed_from||null,continuation_mode:P.continuation_mode||null,dismissed_at:typeof P.dismissed_at=="number"?P.dismissed_at:null,cause:typeof P.cause=="string"?P.cause:null,cause_detail:P.cause_detail||null,exec_default_preset_id:typeof P.exec_default_preset_id=="string"?P.exec_default_preset_id:null,exec_default_preset_revision:typeof P.exec_default_preset_revision=="number"?P.exec_default_preset_revision:null,exec_values:P.exec_values&&typeof P.exec_values=="object"?P.exec_values:null,usage:P.usage||null,usage_legs:Array.isArray(P.usage_legs)?P.usage_legs:[],delegation_sessions:Array.isArray(P.delegation_sessions)?P.delegation_sessions:[]})):[]}function Ne(){return u?tr(gt(),u):null}let S=new Set;function j(y){S.has(y)?S.delete(y):S.add(y),tt()}function z(y){let P=s?s.get():null,A=P&&P.attempts?P.attempts[y]:null;Qe.open({attempt_id:y,meta:A?{runner:A.runner||void 0,model:A.model||void 0,effort:A.effort||void 0,status:A.status||void 0,session_id:A.session_id||void 0}:{}})}function Ae(y,P){let A=s?s.get():null,ae=A&&A.attempts?A.attempts[y]:null,ut=(ae&&Array.isArray(ae.delegation_sessions)?ae.delegation_sessions:[]).find(Gt=>Gt&&typeof Gt=="object"&&Gt.launch_id===P);ut&&Qe.open({attempt_id:y,launch_id:P,meta:{runner:ut.provider==="claude"?"claude":"codex",role:ut.role,...typeof ut.agent_type=="string"?{agent_type:ut.agent_type}:{},model:ut.model,effort:ut.effort,session_id:ut.session_id,status:ut.status}})}async function ye(y){if(!o||!y)return;let P=o,A=()=>{let De=s?s.get():null;return De&&typeof De.revision=="number"?De.revision:0},ae=s?.get()?.attempts?.[y]||null;await oo({context:{bead_id:ae?.bead_id||u||"",kind:"session",tuple:ae?xn(ae):""},transport:De=>P("worker-attempt-resume",{attempt_id:y,expected_revision:A(),...De}),adopt:De=>{De?.queue&&s?.set&&s.set(De.queue)}})}async function ft(y,P){if(!o||!y)return;let A=o,ae=()=>{let bt=s?s.get():null;return{bead_id:y,...P==="parallel"?{}:{lane:P},expected_revision:bt&&typeof bt.revision=="number"?bt.revision:0}},De=bt=>{bt?.queue&&s?.set&&s.set(bt.queue)},ut=await Promise.resolve(A("worker-queue-place",ae()));if(De(ut),ut&&ut.conflict&&(ut=await Promise.resolve(A("worker-queue-place",ae())),De(ut)),tt(),!ut)return;if(ut.applied===!1&&typeof ut.admission_reason=="string"){ge(`\uB300\uAE30 \uC801\uC7AC \uAC70\uBD80: ${ut.admission_reason}`,"error",2400);return}if(ut.reason==="rejected"){ge("\uB300\uAE30 \uC801\uC7AC \uAC70\uBD80: rejected","error",2400);return}if(ut.applied===!1)return;let Gt=ut.queue?Vo({id:y},ut.queue).location:null;Gt&&"index"in Gt&&ge(`${cd(Gt.lane)} \uB300\uAE30 #${Gt.index+1}\uC5D0 \uCD94\uAC00`,"success",2400)}function $t(y,P){if(P){C=!0,tt();return}ft(y,"parallel")}function yt(y,P){let De=(y.target?.closest?.(".worker-card__place-lane")||null)?.dataset.lane;De&&(De!=="parallel"&&!/^s[1-5]$/.test(De)||(C=!1,tt(),ft(P,De)))}function xt(y){!y||!u||Qe.open(so(y,u,d&&d.status))}let Nt={onOpen:z,onOpenDelegation:Ae,onResume:ye,onToggleUsage:j,onOpenSessionRef:xt,onCopyResumeCommand:Ee};function Wt(){let y=s?s.get():null,P={...te};for(let A of[...Dn,...uo]){let ae=y&&y[A];typeof ae=="string"&&(P[A]=ae)}return P}async function jt(){if(o){try{let y=await Promise.resolve(o("get-session-defaults",{}));te=y&&y.values&&typeof y.values=="object"?y.values:{}}catch{te={}}tt()}}function kt(){let y=s?s.get():null;return y&&y.runner_catalog||null}function Xt(){let y=s?s.get():null;return y&&typeof y.execution_defaults=="object"?y.execution_defaults:null}function Zt(){let y=d?.metadata&&typeof d.metadata=="object"?d.metadata:{},A=An({pin:{...y,...p},global:Wt(),execution_defaults:Xt(),runner_catalog:kt(),route:typeof y.route=="string"?y.route:null}).orchestration_model.value||"";return Pn(kt(),A)}function Ft(){let y=l?l.get():null;return!y||typeof y.revision!="number"?null:{revision:y.revision,presets:Array.isArray(y.presets)?y.presets:[]}}function Ot(y){return y?.compatible===!1}function Qt(y){l&&y&&typeof y.revision=="number"&&Array.isArray(y.presets)&&l.set({revision:y.revision,presets:y.presets})}async function xe(){let y=Ft(),P=y?.presets.find(A=>A.id===m);if(!(!o||!u||!y||!P||Ot(P)||g)){g=!0,k=[],tt();try{let A=await Promise.resolve(o("apply-impl-preset",Ku(u,P.id,y.revision)));if(A&&A.conflict){Qt(A),ge("\uD504\uB9AC\uC14B\uC774 \uBCC0\uACBD\uB410\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uBAA9\uB85D\uC5D0\uC11C \uB2E4\uC2DC \uC801\uC6A9\uD558\uC138\uC694.","error",4e3);return}let ae=A&&Array.isArray(A.issue)?A.issue[0]:A?.issue;if(A&&A.applied&&ae&&typeof ae=="object"){d=ae,k=Array.isArray(A.skipped_orchestration_keys)?A.skipped_orchestration_keys.filter(De=>typeof De=="string"):[];for(let De of Gu)delete p[De];ge(k.length>0?"\uC2E4\uD589 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4. \uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 3\uD0A4\uB294 Bead\uC5D0 \uD540\uD560 \uC218 \uC5C6\uC5B4 \uAC74\uB108\uB6F0\uC5C8\uC2B5\uB2C8\uB2E4.":"\uC2E4\uD589 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4.","success",4e3);return}A&&A.error==="bd_readback_failed"?ge("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):ge("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}catch(A){A&&typeof A=="object"&&A.code==="bd_readback_failed"?ge("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):ge("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}finally{g=!1,tt()}}}let E=null;n&&n.subscribe&&(E=n.subscribe(()=>L()));let fe=null;s&&typeof s.subscribe=="function"&&(fe=s.subscribe(()=>{u&&tt()}));let Ie=null,ht=null;function Ye(){ht&&(ht(),ht=null)}l&&typeof l.subscribe=="function"&&(Ie=l.subscribe(()=>{u&&tt()}));function St(y){y.key==="Escape"&&u&&(y.preventDefault(),r())}document.addEventListener("keydown",St);let x=lo(()=>tt());x.attach();function L(){if(u){if(n&&typeof n.snapshotFor=="function"){let y=n.snapshotFor("detail:"+u)||[];d=y.find(A=>A&&A.id===u)||y[0]||d}st(),Dt(),Je(),tt()}}function Ee(y){gn(y).then(P=>{P?ge("\uBCF5\uC0AC\uB428","success",1200):ge("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function He(y){y.preventDefault(),y.stopPropagation(),u&&Ee(u)}function Le(y,P){y.preventDefault(),y.stopPropagation(),Ee(P)}function f(y,P,A){y.preventDefault(),y.stopPropagation(),Re.open(P,{missing_state:A})}async function h(y,P){let A=Object.hasOwn(p,y),ae=p[y];if(p[y]=P,tt(),!(!o||!u))try{let De=await Promise.resolve(o("update-exec-settings",Hu(u,y,P.length===0?null:P))),ut=Array.isArray(De)?De[0]:De;if(!ut||typeof ut!="object"||!ut.id)throw new Error("exec settings readback failed");d=ut,delete p[y],tt()}catch(De){throw A?p[y]=ae:delete p[y],tt(),ge("\uC2E4\uD589 \uC124\uC815 \uBCC0\uACBD \uC2E4\uD328","error"),De}}function I(y){y.catch(()=>{})}async function M(y,P){let A=d||{},ae=A.metadata&&typeof A.metadata=="object"?A.metadata:{},De={};for(let bt of["impl_runtime","impl_model","impl_effort"])De[bt]=Object.hasOwn(p,bt)?p[bt]:typeof ae[bt]=="string"?ae[bt]:"";De[y]=P;let ut=Qu(De,kt(),Zt()),Gt={};for(let bt of["impl_runtime","impl_model","impl_effort"])Gt[bt]=p[bt],p[bt]=ut[bt]||"";if(tt(),!(!o||!u))return Promise.resolve(o("update-impl-target",{id:u,...ut,orchestration_runtime:Zt()})).then(bt=>{let vt=Array.isArray(bt)?bt[0]:bt;if(!vt||typeof vt!="object"||!vt.id)throw new Error("implementation target readback failed");d=vt;for(let rn of["impl_runtime","impl_model","impl_effort"])delete p[rn];tt()}).catch(bt=>{for(let vt of["impl_runtime","impl_model","impl_effort"])Gt[vt]===void 0?delete p[vt]:p[vt]=Gt[vt];throw tt(),ge("\uAD6C\uD604 target \uBCC0\uACBD \uC2E4\uD328","error"),bt})}async function _(y,P,A){if(!o||!u)return!1;try{let ae=await Promise.resolve(o(y,P)),De=Array.isArray(ae)?ae[0]:ae;return De&&typeof De=="object"&&De.id?(d=De,!0):(ge(A,"error"),!1)}catch(ae){return ae&&typeof ae=="object"&&ae.code==="bd_readback_failed"?(ge("\uC800\uC7A5\uB410\uC73C\uB098 \uD655\uC778 \uC2E4\uD328 \u2014 \uACE7 \uAC31\uC2E0\uB429\uB2C8\uB2E4","error"),{ok:!1,saved:!0}):(ge(b(A,ae),"error"),!1)}}function b(y,P){let A=P&&typeof P=="object"&&typeof P.message=="string"?P.message.trim():"";return A.length>0?`${y} \u2014 ${A}`:y}function ee(y){setTimeout(()=>{try{let P=e.querySelector(y);P&&typeof P.focus=="function"&&P.focus()}catch{}},0)}function de(){q=!0,K=d&&d.title||"",tt(),ee('.detail-edit__input[data-edit="title"]')}function Fe(y){K=y.target.value}function _t(){q=!1,K="",tt()}function Et(){_("edit-text",{id:u,field:"title",value:K},"\uC81C\uBAA9 \uC800\uC7A5 \uC2E4\uD328").then(P=>{P===!0&&(q=!1,K=""),tt()})}function zt(){B=!0,F=d&&d.description||"",tt(),ee('.detail-edit__textarea[data-edit="description"]')}function lr(y){F=y.target.value}function Ht(){B=!1,F="",tt()}function un(){_("edit-text",{id:u,field:"description",value:F},"\uC124\uBA85 \uC800\uC7A5 \uC2E4\uD328").then(P=>{P===!0&&(B=!1,F=""),tt()})}function Sr(y,P,A,ae){if(y.key==="Escape"){y.stopPropagation(),A();return}y.key==="Enter"&&(!ae||y.ctrlKey||y.metaKey)&&(y.preventDefault(),P())}function wa(y){let P=y.target.value;_("update-status",{id:u,status:P},"\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328").then(()=>tt())}function Ts(y){let P=Number(y.target.value);_("update-priority",{id:u,priority:P},"\uC6B0\uC120\uC21C\uC704 \uBCC0\uACBD \uC2E4\uD328").then(()=>tt())}function Cs(y){N=y.target.value}function w(){let y=N.trim();y.length!==0&&_("label-add",{id:u,label:y},"\uB77C\uBCA8 \uCD94\uAC00 \uC2E4\uD328").then(P=>{P===!0&&(N=""),tt()})}function v(y){if(y.key==="Escape"){y.stopPropagation(),N="",tt();return}y.key==="Enter"&&(y.preventDefault(),w())}function R(y){_("label-remove",{id:u,label:y},"\uB77C\uBCA8 \uC81C\uAC70 \uC2E4\uD328").then(()=>tt())}let ue={onCopyPath:Le,onOpenDoc:f};function $e(y){return typeof y=="string"?y:y&&typeof y=="object"?String(y.id||y.to||y.issue_id||y.depends_on||""):""}function Me(y){return y&&typeof y=="object"?String(y.dependency_type||y.type||""):""}function Ve(y){switch(y){case"discovered-from":return{glyph:"\u21A9 ",relation:"\uBC1C\uACAC"};case"parent-child":return{glyph:"\u2338 ",relation:"\uC0C1\uC704"};case"related":return{glyph:"\u2194 ",relation:"\uAD00\uB828"};default:return y.length>0?{glyph:`${y} `,relation:y}:{glyph:"",relation:""}}}function Ct(y,P){let A=Jt(P),ae=[];return y.length>0&&ae.push(y),A&&ae.push(A),ae.length>0?ae.join(`
`):void 0}function Jt(y){if(!y||typeof y!="object")return;let P=typeof y.status=="string"?y.status:"",A=typeof y.title=="string"?y.title:"";return P.length>0&&A.length>0?`${P} \xB7 ${A}`:void 0}function lt(){return(t.getWorkspacePath&&t.getWorkspacePath()||"").trim()}function fn(){return t.depCandidates?t.depCandidates():null}async function _n(y,P,A){let ae=lt(),De=u;if(!De)return;if(ae.length===0){ge("\uB808\uD3EC\uB97C \uC54C \uC218 \uC5C6\uC5B4 \uC758\uC874\uC744 \uBC14\uAFC0 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error");return}let ut=await _(y,{a:De,b:P,view_id:De,root_dir:ae},A),Gt=ut===!0||ut!==!1&&ut.saved===!0;Gt&&t.onDepChanged&&t.onDepChanged({type:y,a:De,b:P}),y==="dep-add"&&Gt&&(Y="",U=!1),tt()}function Er(y){if(!u)return;let P=globalThis.confirm;typeof P=="function"&&!P(`${y}\uAC00 ${u}\uB97C \uB9C9\uB294 \uC5F0\uACB0\uC744 \uB04A\uC744\uAE4C\uC694?`)||_n("dep-remove",y,"\uC758\uC874 \uD574\uC81C \uC2E4\uD328")}function Cn(y){y.disabled||Rn(y.bead_id)}function Rn(y){_n("dep-add",y,"\uC758\uC874 \uCD94\uAC00 \uC2E4\uD328")}function Yn(y,P){let A=Y.trim();return!sp(A)||A===u||P.includes(A)||y.some(ae=>ae.bead_id===A)?null:A}function Vn(y){Y=y.target.value,U=!0,tt()}function an(){U||(U=!0,tt())}function Qn(y,P,A){if(y.key==="Escape"){y.stopPropagation(),Y="",U=!1,tt();return}y.key==="Enter"&&(y.preventDefault(),P.length===1&&!P[0].disabled?Cn(P[0]):A!==null&&Rn(A))}function cr(y,P){return c`<div class="detail-dep-add">
      <input
        class="detail-dep-add__input"
        aria-label="막는 이슈 추가"
        placeholder="막는 이슈 추가"
        .value=${Y}
        @focus=${an}
        @input=${Vn}
        @keydown=${A=>Qn(A,y,P)}
      />
      ${U||Y.length>0?c`<div class="detail-dep-add__list">
            ${y.length===0&&P===null?c`<div class="detail-dep-add__empty">후보 없음</div>`:y.map(A=>c`<button
                      type="button"
                      class="detail-dep-add__cand"
                      data-dep-cand=${A.bead_id}
                      ?disabled=${A.disabled}
                      title=${dn(A.reason)}
                      @click=${()=>Cn(A)}
                    >
                      <span class="detail-dep-add__repo"
                        >${A.workspace_name}</span
                      >
                      <span class="detail-dep-add__id"
                        >${A.bead_id}</span
                      >
                      <span class="detail-dep-add__title"
                        >${A.title}</span
                      >
                    </button>`)}
            ${P===null?"":c`<button
                  type="button"
                  class="detail-dep-add__cand"
                  data-dep-cand=${P}
                  data-dep-direct="1"
                  @click=${()=>Rn(P)}
                >
                  <span class="detail-dep-add__id">${P}</span>
                  <span class="detail-dep-add__title">직접 추가</span>
                </button>`}
          </div>`:""}
    </div>`}function On(y,P){let A=P.get(y.id),ae=i?c`<button
          type="button"
          class="detail-dep__link"
          title=${dn(y.title)}
          @click=${()=>A===void 0?i(y.id):i(y.id,A)}
        >
          ${y.label}
        </button>`:c`<span class="detail-dep__link" title=${dn(y.title)}
          >${y.label}</span
        >`;return c`<span
      class=${`detail-dep detail-dep--${y.kind}${i?" detail-dep--link":""}`}
      >${ae}${y.kind==="pred"?c`<button
            type="button"
            class="detail-dep__unlink"
            data-dep-b=${y.id}
            aria-label=${"\uC758\uC874 \uD574\uC81C: "+y.id}
            @click=${()=>Er(y.id)}
          >
            ✕
          </button>`:""}</span
    >`}function Un(y){let P=Array.isArray(y.dependencies)?y.dependencies:[],A=Array.isArray(y.dependents)?y.dependents:[],ae=[];for(let vt of P){let rn=$e(vt);rn.length>0&&Me(vt)==="blocks"&&ae.push({id:rn,label:`\u26D3 ${rn}`,kind:"pred",title:Ct("\uB9C9\uB294",vt)})}for(let vt of A){let rn=$e(vt);rn.length>0&&Me(vt)==="blocks"&&ae.push({id:rn,label:`\u2192 ${rn}`,kind:"succ",title:Ct("\uB9C9\uD788\uB294",vt)})}for(let vt of P){let rn=$e(vt),Gr=Me(vt);if(rn.length>0&&Gr!=="blocks"){let en=Ve(Gr);ae.push({id:rn,label:`${en.glyph}${rn}`,kind:"other",title:Ct(en.relation,vt)})}}let De=fn(),ut=new Map;if(De)for(let vt of De.issues)ut.has(vt.bead_id)||ut.set(vt.bead_id,vt.root_dir);let Gt=De&&u?op(rp(u,De),Y):[],bt=Yn(Gt,ae.filter(vt=>vt.kind==="pred").map(vt=>vt.id));return c`
      <div class="detail-section-label">의존성</div>
      ${ae.length===0?c`<div class="detail-empty">의존성 없음</div>`:c`<div class="detail-deps">
            ${ae.map(vt=>On(vt,ut))}
          </div>`}
      ${De===null?c`<div class="detail-empty">후보를 불러올 수 없음</div>`:cr(Gt,bt)}
    `}function Ge(y){let P=y.metadata||{},A=y.workflow||{},ae=A.stages||{},De=ae.spec&&ae.spec.stale,ut=ae.impl&&ae.impl.stale,Gt=A.quick_fix_review?.state==="stale",bt=ae.plan||null,vt=A.route_source==="derived",rn=A.route||P.route||"\u2014";return c`
      <div class="detail-section-label">워크플로우</div>
      <div class="detail-kv">
        <span class="detail-kv__k">route</span>
        <span
          class="detail-kv__v${vt?" detail-kv__v--derived":""}"
          title=${vt?"route \uBBF8\uD540 (metadata unset)":"route"}
          >${vt?"unset":rn}</span
        >
      </div>
      ${A.route!=="quick_fix"||Object.hasOwn(P,"spec_review")?c`<div class="detail-kv">
            <span class="detail-kv__k">spec_review</span>
            <span class="detail-kv__v"
              >${P.spec_review||"\uC5C6\uC74C"}${De?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${A.route==="full_plan"?c`<div class="detail-kv">
              <span class="detail-kv__k">plan_review</span>
              <span class="detail-kv__v">${bt?.receipt||"\uC5C6\uC74C"}</span>
            </div>
            <div class="detail-kv">
              <span class="detail-kv__k">plan_approval</span>
              <span class="detail-kv__v"
                >${bt?.approval_receipt||"\uC5C6\uC74C"}${bt?.approval_state==="stale"?" \xB7 stale":bt?.approval_state==="unknown"?" \xB7 unknown":""}</span
              >
            </div>`:""}
      ${A.route!=="quick_fix"||Object.hasOwn(P,"impl_review")?c`<div class="detail-kv">
            <span class="detail-kv__k">impl_review</span>
            <span class="detail-kv__v"
              >${P.impl_review||"\uC5C6\uC74C"}${ut?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${A.resolver?c`<div class="detail-kv">
            <span class="detail-kv__k">↳ 충돌 해소</span>
            <span
              class="detail-kv__v detail-kv__v--resolver detail-kv__v--wrap"
              title=${`resolver-self:${A.resolver.attempt} \xB7 ${A.resolver.prior_sha} \u2192 ${A.resolver.sha}`}
              >${`${A.resolver.prior_sha.slice(0,7)} \u2192 ${A.resolver.sha.slice(0,7)}`}</span
            >
          </div>`:""}
      ${A.route==="quick_fix"||Object.hasOwn(P,"quick_fix_review")?c`<div class="detail-kv">
            <span class="detail-kv__k">quick_fix_review</span>
            <span class="detail-kv__v"
              >${P.quick_fix_review||"\uC5C6\uC74C"}${Gt?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${A.planned_execution?c`<div class="detail-kv">
              <span class="detail-kv__k">planned_execution</span>
              <span class="detail-kv__v">${A.planned_execution.kind}</span>
            </div>
            ${A.planned_execution.kind==="main"?c`<div class="detail-kv">
                  <span class="detail-kv__k">planned_execution_reason</span>
                  <span class="detail-kv__v detail-kv__v--wrap"
                    >${A.planned_execution.reason}</span
                  >
                </div>`:""}`:""}
      ${A.exec_receipt?c`<div class="detail-kv">
            <span class="detail-kv__k">exec_receipt</span>
            <span class="detail-kv__v detail-kv__v--wrap"
              >${Jn(A.exec_receipt)}</span
            >
          </div>`:""}
      ${A.impl_entry?c`<div class="detail-kv">
            <span class="detail-kv__k">impl_entry</span>
            <span class="detail-kv__v"
              >${`${A.impl_entry.actor}@${A.impl_entry.sha}`}</span
            >
          </div>`:""}
      ${P.pr_url?c`<div class="detail-kv">
            <span class="detail-kv__k">pr_url</span>
            <span class="detail-kv__v detail-kv__v--wrap">${P.pr_url}</span>
          </div>`:""}
    `}let Kt={route:["quick_fix","spec_backed","full_plan"]};async function $n(y,P){let A=P.target.value;if(y==="route"&&d&&d.metadata&&d.metadata.route==="full_plan"&&A!=="full_plan"&&!window.confirm(`full_plan \u2192 ${A||"(\uBBF8\uC124\uC815)"} \uC804\uD658: \uC800\uC7A5\uB41C plan \uC2B9\uC778\uC740 \uD3EC\uAE30\uB418\uBA70, plan \uD30C\uC77C\xB7\uB9C8\uCEE4 \uC815\uB9AC\uB294 \uC138\uC158 \uACC4\uC57D\uC774 \uC218\uD589\uD569\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`)){tt();return}await _("update-workflow-meta",{id:u,key:y,value:A},"\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uBA54\uD0C0 \uBCC0\uACBD \uC2E4\uD328"),tt()}function Rs(y){let P=y.metadata||{};return c` ${((ae,De)=>{let ut=Kt[ae],Gt=typeof P[ae]=="string"?P[ae]:"";return c`<div class="detail-kv">
        <span class="detail-kv__k">${ae}</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label=${ae}
          data-edit=${`wfmeta-${ae}`}
          @change=${bt=>$n(ae,bt)}
        >
          <option value="" ?selected=${!ut.includes(Gt)}>
            ${De}
          </option>
          ${ut.map(bt=>c`<option value=${bt} ?selected=${Gt===bt}>${bt}</option>`)}
        </select>
      </div>`})("route","(unset)")} `}function Os(y,P){return q?c`
        <div class="detail-edit">
          <input
            class="detail-edit__input"
            data-edit="title"
            aria-label="제목 편집"
            .value=${K}
            @input=${Fe}
            @keydown=${A=>Sr(A,Et,_t,!1)}
          />
          <div class="detail-edit__actions">
            <button
              type="button"
              class="detail-edit__save"
              data-edit="title-save"
              @click=${Et}
            >
              저장
            </button>
            <button
              type="button"
              class="detail-edit__cancel"
              data-edit="title-cancel"
              @click=${_t}
            >
              취소
            </button>
          </div>
        </div>
      `:c`
      <div class="detail-title-row">
        <h2 class="detail-overlay__title">${y}</h2>
        ${ln(P).map(A=>c`<span class="detail-usage-total" title=${A.tooltip}
              >${A.label}</span
            >`)}
        <button
          type="button"
          class="detail-edit-btn"
          data-edit="title"
          aria-label="제목 편집"
          @click=${de}
        >
          ✎
        </button>
      </div>
    `}function Is(y){let P=on(y.created_at),A=on(y.updated_at);return!P&&!A?c``:c`
      ${P?c`<div class="detail-kv">
            <span class="detail-kv__k">생성</span>
            <span class="detail-kv__v detail-kv__v--time">${P}</span>
          </div>`:""}
      ${A?c`<div class="detail-kv">
            <span class="detail-kv__k">수정</span>
            <span class="detail-kv__v detail-kv__v--time">${A}</span>
          </div>`:""}
    `}function Ls(y,P){return c`
      <div class="detail-section-label">속성 (수정 가능)</div>
      <div class="detail-kv">
        <span class="detail-kv__k">status</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label="status"
          data-edit="status"
          @change=${wa}
        >
          ${lv.map(A=>c`<option value=${A} ?selected=${A===y}>${A}</option>`)}
        </select>
      </div>
      <div class="detail-kv">
        <span class="detail-kv__k">priority</span>
        <select
          class="detail-kv__v"
          aria-label="priority"
          data-edit="priority"
          @change=${Ts}
        >
          ${cv.map(A=>c`<option value=${String(A)} ?selected=${A===P}>
                P${A}
              </option>`)}
        </select>
      </div>
    `}function Ds(y){return c`
      <div class="detail-title-row">
        <div class="detail-overlay__section-label">설명</div>
        ${B?"":c`<button
              type="button"
              class="detail-edit-btn"
              data-edit="description"
              aria-label="설명 편집"
              @click=${zt}
            >
              ✎
            </button>`}
      </div>
      ${B?c`<div class="detail-edit">
            <textarea
              class="detail-edit__textarea"
              data-edit="description"
              aria-label="설명 편집"
              rows="6"
              .value=${F}
              @input=${lr}
              @keydown=${P=>Sr(P,un,Ht,!0)}
            ></textarea>
            <div class="detail-edit__actions">
              <button
                type="button"
                class="detail-edit__save"
                data-edit="description-save"
                @click=${un}
              >
                저장
              </button>
              <button
                type="button"
                class="detail-edit__cancel"
                data-edit="description-cancel"
                @click=${Ht}
              >
                취소
              </button>
            </div>
          </div>`:c`<div class="detail-overlay__desc">
            ${y||"(\uC124\uBA85 \uC5C6\uC74C)"}
          </div>`}
    `}function Kr(y){let P=typeof y.notes=="string"?y.notes:"";return P.trim().length===0?c``:c`
      <div class="detail-overlay__section-label">노트</div>
      <div class="detail-overlay__notes">${P}</div>
    `}function Eo(y){let P=Array.isArray(y.labels)?y.labels:[];return c`
      <div class="detail-section-label">라벨</div>
      <div class="detail-labels">
        ${P.map(A=>c`<span class="detail-label-chip"
              >${A}<button
                type="button"
                class="detail-label-chip__x"
                data-label=${A}
                aria-label=${"\uB77C\uBCA8 \uC81C\uAC70: "+A}
                @click=${()=>R(A)}
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
            @input=${Cs}
            @keydown=${v}
          />
          <button
            type="button"
            class="detail-label-add__btn"
            @click=${w}
          >
            추가
          </button>
        </span>
      </div>
    `}function Ps(){if(!u)return c``;let y=d||{},P=String(y.id||u),A=y.title||"(\uC81C\uBAA9 \uC5C6\uC74C)",ae=Ne(),De=y.status||"open",ut=typeof y.priority=="number"?Math.max(0,Math.min(4,y.priority)):"",Gt=y.description||"",bt=s?s.get():null,vt=bt&&De!=="closed"?Vo({...y,id:P},bt):null,rn=bt?Qo(bt):null,Gr={...y,metadata:{...y.metadata||{},...p}};return c`
      <div class="detail-overlay" role="dialog" aria-modal="true">
        <div class="detail-overlay__backdrop" @click=${()=>r()}></div>
        <div class="detail-overlay__panel">
          <div class="detail-overlay__bar">
            <button
              type="button"
              class="detail-overlay__id"
              title="ID 복사"
              @click=${He}
            >
              ${P}
            </button>
            ${vt?c`<button
                  type="button"
                  class="op-btn op-btn--primary detail-overlay__place"
                  data-bead-id=${P}
                  ?disabled=${!vt.placeable}
                  title=${Nr(vt)}
                  @click=${()=>$t(P,rn)}
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
          ${vt&&C&&rn?c`<div
                class="place-menu detail-overlay__place-menu"
                @click=${en=>yt(en,P)}
              >
                ${il(rn,P)}
                <button
                  type="button"
                  class="op-btn op-btn--icon worker-card__place-cancel"
                  data-bead-id=${P}
                  title="레인 선택 취소"
                  aria-label="레인 선택 취소"
                  @click=${()=>{C=!1,tt()}}
                >
                  ✕
                </button>
              </div>`:""}
          ${Os(A,ae)}
          ${Qp(Gr,{onChipToggle:en=>x.toggle({bead_id:P,chip_key:en}),isChipOpen:en=>x.isOpen({bead_id:P,chip_key:en})})}
          ${Vp({metadata:Gr.metadata,workspace_values:Wt(),catalog:kt(),execution_defaults:Xt(),expanded:T,presets:Ft()?.presets||[],preset_id:m,preset_busy:g,skipped_orchestration_keys:k},{onToggle:en=>{T=en,tt()},onEdit:(en,Ms)=>{if(en==="impl_runtime"||en==="impl_model"||en==="impl_effort"){I(M(en,Ms??""));return}I(h(en,Ms??""))},onPresetSelect:en=>{m=en,k=[],tt()},onPresetApply:()=>{xe()}})}
          ${nf({md:Gr.metadata,catalog:re,workspace_defaults:X,handlers:{onExecChange:(en,Ms)=>I(h(en,Ms))}})}
          ${Ls(De,ut)} ${Is(y)}
          ${Ds(Gt)}
          ${Hp(_e,pe,{expanded:ke,draft:Z,sending:be,error:le})}
          ${Kr(y)} ${Eo(y)} ${Un(y)}
          ${Ge(y)} ${Rs(y)}
          ${Up(y,ue)}
          ${cf({expanded:Ue,loading:J,error:W,data:qe},{onToggle:pt})}
          ${lf(et(),Nt,{total:ae,expanded:S},G)}
          ${df({events:nt,shown:Mt},{onMore:Ze})}
        </div>
      </div>
    `}function tt(){ct(Ps(),e)}return{load(y){y!==u&&(p={},C=!1,m="",k=[],T=!1,ne(),Ce(),Xe(),ze(),we(),ve()),u=y,d=null,!ht&&t.subscribeCandidates&&(ht=t.subscribeCandidates(()=>{u&&tt()})),L(),jt(),D!==y&&ie(y)},clear(){u=null,d=null,p={},C=!1,m="",g=!1,k=[],T=!1,ne(),Ce(),Xe(),ze(),we(),ve(),Ye(),Re.close(),Qe.close(),ct(c``,e)},destroy(){E&&(E(),E=null),fe&&(fe(),fe=null),Ie&&(Ie(),Ie=null),Ye(),document.removeEventListener("keydown",St),x.detach(),Se||(Re.destroy(),me&&me.parentNode&&me.parentNode.removeChild(me)),Qe.destroy(),je.parentNode&&je.parentNode.removeChild(je),u=null,d=null,ve(),m="",g=!1,k=[],Ce(),Xe(),ze(),we(),ct(c``,e)}}}function ff(e){let t=document.createElement("dialog");t.id="fatal-error-dialog",t.setAttribute("role","alertdialog"),t.setAttribute("aria-modal","true"),t.innerHTML=`
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
    </div>`,e.appendChild(t);let n=t.querySelector("#fatal-error-title"),r=t.querySelector("#fatal-error-message"),o=t.querySelector("#fatal-error-detail"),i=t.querySelector("#fatal-error-reload"),s=t.querySelector("#fatal-error-close"),l=()=>{if(typeof t.close=="function")try{t.close()}catch{}t.removeAttribute("open")},a=(u,d,p="")=>{n&&(n.textContent=u||"Unexpected Error"),r&&(r.textContent=d||"An unrecoverable error occurred.");let m=typeof p=="string"?p.trim():"";if(o&&(m.length>0?(o.textContent=m,o.removeAttribute("hidden")):(o.textContent="No additional diagnostics available.",o.setAttribute("hidden",""))),typeof t.showModal=="function")try{t.showModal(),t.setAttribute("open","")}catch{t.setAttribute("open","")}else t.setAttribute("open","")};return i&&i.addEventListener("click",()=>{window.location.reload()}),s&&s.addEventListener("click",()=>l()),t.addEventListener("cancel",u=>{u.preventDefault(),l()}),{open:a,close:l,getElement(){return t}}}var uv="(max-width: 640px)";function aa(e){if(typeof window.matchMedia!="function")return e(!1),()=>{};let t=window.matchMedia(uv),n=!!t.matches;e(n);let r=o=>{let s=!!(typeof o=="object"&&o!==null&&typeof o.matches=="boolean"?o.matches:t.matches);s!==n&&(n=s,e(s))};return typeof t.addEventListener=="function"?(t.addEventListener("change",r),()=>{t.removeEventListener("change",r)}):typeof t.addListener=="function"?(t.addListener(r),()=>{typeof t.removeListener=="function"&&t.removeListener(r)}):()=>{}}function dv(){return{lanes:{done:!0},areas:{}}}function xs(e){let t={};if(typeof e!="object"||e===null)return t;for(let[n,r]of Object.entries(e))typeof r=="boolean"&&(t[n]=r);return t}function pv(e){try{let t=window.localStorage.getItem(e);if(!t)return null;let n=JSON.parse(t);if(typeof n!="object"||n===null)return null;let r=n;return typeof r.lanes=="object"&&r.lanes!==null?{lanes:xs(r.lanes),areas:xs(r.areas)}:{lanes:xs(r),areas:{}}}catch{return null}}function _f(e,t){try{window.localStorage.setItem(e,JSON.stringify(t))}catch{}}function la(e,t=dv()){let n={lanes:xs(t.lanes),areas:xs(t.areas)},r=pv(e),o={lanes:{...n.lanes,...r?r.lanes:{}},areas:{...n.areas,...r?r.areas:{}}};return{isCollapsed(i){return o.lanes[i]===!0},isAreaCollapsed(i){return o.areas[i]===!0},toggle(i){let s=o.lanes[i]!==!0;return o={...o,lanes:{...o.lanes,[i]:s}},_f(e,o),s},toggleArea(i){let s=o.areas[i]!==!0;return o={...o,areas:{...o.areas,[i]:s}},_f(e,o),s}}}function Xl(e){if(typeof e=="string"&&e.length>0)return e;if(e&&typeof e=="object"){let t=e;if(typeof t.message=="string"&&t.message.length>0)return t.message;if(typeof t.error=="string"&&t.error.length>0)return t.error;if(t.error&&typeof t.error=="object"&&typeof t.error.message=="string")return t.error.message}return"\uC694\uCCAD\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4"}function ca(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"&&t.length>0):[]}function ua(e){let{transport:t,console_el:n,getLanes:r,getWorkspaces:o,getCrossLanes:i,reproject:s,onCorrection:l,showToast:a,requestRender:u,adoptQueue:d,onDragBegin:p,candidate_drop:m}=e,g=[],k=null,T=!1,C=null,te=null,re=null;function X(){C!==null&&clearTimeout(C),C=setTimeout(()=>{C=null,T=!1},0)}function D(){return i()??null}function O(){let Q=new Map,oe=o();for(let se of Array.isArray(oe)?oe:[]){if(!se||typeof se!="object")continue;let pe=se.bead_blocked_by&&typeof se.bead_blocked_by=="object"?se.bead_blocked_by:{};for(let[Se,me]of Object.entries(pe))Array.isArray(me)&&Q.set(Se,ca(me));for(let Se of[...Array.isArray(se.runnable)?se.runnable:[],...Array.isArray(se.session_active)?se.session_active:[]])Se&&typeof Se.bead_id=="string"&&Array.isArray(Se.blocked_by)&&Se.blocked_by.length>0&&Q.set(Se.bead_id,ca(Se.blocked_by))}return Q}function q(){let Q=new Map,oe=new Map,se=o();for(let pe of Array.isArray(se)?se:[]){if(!pe||typeof pe!="object")continue;let Se=pe.bead_blocked_by&&typeof pe.bead_blocked_by=="object"?pe.bead_blocked_by:{};for(let[me,Re]of Object.entries(Se))Array.isArray(Re)&&Q.set(me,ca(Re));for(let me of Array.isArray(pe.runnable)?pe.runnable:[])me&&typeof me.bead_id=="string"&&Array.isArray(me.blocked_by)&&oe.set(me.bead_id,ca(me.blocked_by))}for(let pe of g)for(let Se of[Q,oe]){let me=Se.get(pe.a);me!==void 0&&Se.set(pe.a,pe.type==="dep-remove"?me.filter(Re=>Re!==pe.b):me.includes(pe.b)?me:[...me,pe.b])}return{snapshot:Q,runnable:oe}}function B(){let Q=O();for(let oe of g){let se=(Q.get(oe.a)||[]).slice();oe.type==="dep-remove"?Q.set(oe.a,se.filter(pe=>pe!==oe.b)):se.includes(oe.b)||Q.set(oe.a,[...se,oe.b])}return Q}function K(Q=r(),oe=D()){let se=new Map;for(let Ue of Array.isArray(oe?.lanes)?oe.lanes:[]){let J=new Map;for(let W of Array.isArray(Ue?.entries)?Ue.entries:[])W&&typeof W.bead_id=="string"&&J.set(W.bead_id,W.dep_created_by_lane===!0);se.set(typeof Ue?.id=="string"?Ue.id:"",J)}let pe=new Map,Se=new Map,me=new Set,Re=new Set;for(let Ue of Q.chain_lanes){let J=se.get(Ue.lane_id);pe.set(Ue.lane_id,{status:Ue.status,entries:Ue.rows.map((W,qe)=>({bead_id:W.id,root_dir:W.root_dir,...qe===0?{}:{dep_created_by_lane:J?.get(W.id)===!0}}))});for(let W of Ue.rows)Se.set(W.id,Ue.lane_id),W.fixed&&me.add(W.id),W.unplaced||Re.add(W.id)}let je=new Map;for(let Ue of Q.parallel_rows)typeof Ue.queue_index=="number"&&je.set(Ue.id,Ue.queue_index);for(let Ue of Q.queue_groups)for(let J of Ue.sublanes.serial)for(let W of J.items)typeof W.queue_index=="number"&&je.set(W.id,W.queue_index);let Qe=q();return{blocked_by_map:B(),snapshot_blocked_by:Qe.snapshot,runnable_blocked_by:Qe.runnable,owner_of:new Map(Object.entries(Q.owner_of)),cross_lanes:pe,owner_lane_of:Se,fixed_members:me,placed_members:Re,parallel_rows:Q.parallel_rows.map(Ue=>({bead_id:Ue.id,root_dir:Ue.root_dir,queue_index:Ue.queue_index??0})),parallel_raw_length:new Map(Object.entries(Q.parallel_raw_length)),queue_index_of:je}}function F(Q,oe){let se=r();for(let Se of[...se.runnable,...se.queue,...se.running,...se.pr_wait,...se.done])if(!(Se.non_occupying||Se.id!==oe)){if(Se.root_dir===Q)return Se.expected_revision;break}let pe=se.queue_groups.find(Se=>Se.root_dir===Q);return pe?pe.revision:0}async function N(Q,oe,se,pe){if(!t)return null;let me=await t(Q,{...oe,...se?{root_dir:se}:{},expected_revision:pe});if(me&&me.conflict){me.queue&&d?.(se,me.queue);let Re=me.queue&&typeof me.queue.revision=="number"?me.queue.revision:pe;me=await t(Q,{...oe,...se?{root_dir:se}:{},expected_revision:Re})}return me&&me.queue&&d?.(se,me.queue),me}async function Y(Q,oe,se,pe,Se){try{let me=await N(Q,oe,se,pe.get(se)??F(se,Se.bead_id));return!me||typeof me.applied!="boolean"?(a("\uD050 \uC694\uCCAD\uC774 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error"),null):(me.queue&&typeof me.queue.revision=="number"&&pe.set(se,me.queue.revision),me.conflict?(a("\uD050\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD574 \uC8FC\uC138\uC694","error"),null):me.applied===!1?(a(me.admission_reason?`\uD050 \uC801\uC7AC \uAC70\uBD80: ${me.admission_reason}`:"\uD050 \uC694\uCCAD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4","error"),null):me.queue&&typeof me.queue.revision=="number"?me.queue.revision:pe.get(se)??0)}catch(me){return a(Xl(me),"error"),null}}async function U(Q,oe,se=new Map){if(Q.type==="worker-queue-disarm"){try{let pe=await N(Q.type,Q.payload,Q.root_dir,se.get(Q.root_dir)??F(Q.root_dir,oe));pe&&pe.queue&&typeof pe.queue.revision=="number"&&se.set(Q.root_dir,pe.queue.revision)}catch{}return!0}if(Q.type==="worker-queue-place"||Q.type==="worker-queue-reorder"||Q.type==="worker-queue-remove")return await Y(Q.type,Q.payload,Q.root_dir,se,{bead_id:oe})!==null;try{return(Q.type==="dep-add"||Q.type==="dep-remove")&&t&&await t(Q.type,{a:Q.a,b:Q.b,...Q.root_dir?{root_dir:Q.root_dir}:{}}),!0}catch(pe){return a(Xl(pe),"error"),!1}}function ne(Q){(Q.type==="dep-add"||Q.type==="dep-remove")&&(g=[...g,{type:Q.type,a:Q.a,b:Q.b}])}async function ve(Q,oe){if(!t)return{ok:!1};try{let se=await t(Q.type,{...Q.payload,expected_revision:oe});return!se||typeof se.revision!="number"?(a("\uC5F0\uACB0 \uB808\uC778 \uC751\uB2F5\uC5D0 revision\uC774 \uC5C6\uC2B5\uB2C8\uB2E4","error"),{ok:!1}):{ok:!0,revision:se.revision}}catch(se){let pe=se,Se=pe&&pe.code==="conflict"?pe.details?.cross_lanes:null;return Se&&typeof Se.revision=="number"&&Array.isArray(Se.lanes)?{ok:!1,conflict:Se}:(a(Xl(se),"error"),{ok:!1})}}async function Pe(Q,oe,se){let pe=new Map,Se=[],me=Q.ops.slice(0,Q.lane_op_index),Re=Q.ops.slice(Q.lane_op_index);for(let Qe of me){if(!await U(Qe,se,pe))return{done:!0};ne(Qe)}let je=oe;for(let Qe of Q.lane_ops){if(je===null)return a("\uC5F0\uACB0 \uB808\uC778 \uC800\uC7A5\uC18C\uB97C \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error"),{done:!0};let Ue=await ve(Qe,je);if(!Ue.ok)return Ue.conflict?{done:!1,conflict:Ue.conflict}:{done:!0};je=Ue.revision}for(let Qe of Re){if(!await U(Qe,se,pe))return{done:!0};ne(Qe),Qe.type==="dep-add"&&Se.push(Qe)}for(let Qe of tp(Se))je=await H(Qe,je);return{done:!0}}async function H(Q,oe){if(oe===null||!t)return oe;let se=Q.pairs,pe=oe;for(let Se=0;Se<2;Se+=1){if(se.length===0)return pe;try{let me=await t("monitor-lane-provenance",{lane_id:Q.lane_id,pairs:se.map(Re=>({bead_id:Re.bead_id,after:Re.after,value:!0})),expected_revision:pe});return me&&typeof me.revision=="number"?me.revision:pe}catch(me){let Re=me,je=Re&&Re.code==="conflict"?Re.details?.cross_lanes:null;if(!je||typeof je.revision!="number"||!Array.isArray(je.lanes))return pe;let Qe=je.lanes.find(Ue=>Ue&&Ue.id===Q.lane_id);se=np(Array.isArray(Qe?.entries)?Qe.entries:[],se),pe=je.revision}}return pe}async function ie(Q,oe,se=[]){g=se,l("",0);let pe=r(),Se=D();for(let me=0;;me+=1){let Re=Q(K(pe,Se));if("refused"in Re){a(Re.refused,"error");break}let je=await Pe(Re,pe.cross_lanes_revision,oe);if(je.done){Re.correction&&l(Re.correction.lane_id,Re.correction.corrected);break}if(me>=1){a("\uB808\uC778\uC774 \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4","error");break}let Qe=s(je.conflict);pe=Qe.lanes,Se=Qe.raw_lanes}g=[],u()}async function _e(Q,oe){await ie(se=>Ui(Q,oe,se),Q.bead_id)}function Te(Q,oe){let se=oe&&typeof oe.closest=="function"?oe.closest("[data-row-index]"):null;if(se&&Q.contains(se)){let pe=Number(se.getAttribute("data-row-index"));return Number.isFinite(pe)?pe:0}return Q.querySelectorAll("[data-row-index]").length}function V(Q){let oe=typeof Q?.closest=="function"?Q.closest(".worker-pane--collapsed[data-lane]"):null;if(!oe)return null;let se=oe.getAttribute("data-lane");return se==="queue"?{zone:oe,target:{kind:"parallel",marker_index:r().parallel_rows.length}}:se==="candidate"&&m===!0?{zone:oe,target:{kind:"candidate"}}:null}function le(Q){let oe=Q.target;if(!k)return null;let se=typeof oe?.closest=="function"?oe.closest("[data-drop]"):null;if(!se)return V(oe);let pe=se.getAttribute("data-drop");if(pe==="candidate")return{zone:se,target:{kind:"candidate"}};if(pe==="parallel")return{zone:se,target:{kind:"parallel",marker_index:Te(se,oe)}};if(pe==="chain")return{zone:se,target:{kind:"chain",lane_id:se.getAttribute("data-lane-id")||"",marker_index:Te(se,oe)}};if(pe==="repo-serial"){let Se=se.getAttribute("data-root-dir")||"";if(Se!==k.root_dir)return null;let me=typeof oe?.closest=="function"?oe.closest("[data-queue-index]"):null,Re=me&&se.contains(me)?me.getAttribute("data-queue-index"):se.getAttribute("data-lane-length"),je=Number(Re);return{zone:se,target:{kind:"repo-serial",root_dir:Se,lane_id:se.getAttribute("data-lane-id")||"",index:Number.isFinite(je)?je:0}}}return null}function Z(){for(let Q of Array.from(n.querySelectorAll(".is-drop-over")))Q.classList.remove("is-drop-over")}function be(Q){te=Q.target instanceof Element?Q.target:null}function Oe(Q){let oe=Q.target,se=typeof oe?.closest=="function"?oe.closest('[draggable="true"][data-bead-id]'):null,pe=se?se.closest("[data-drag-kind]"):null;if(!pe)return;if(se&&te&&se.contains(te)&&typeof te.closest=="function"&&te.closest("input, button, a")){Q.preventDefault();return}let Se=pe.getAttribute("data-bead-id")||"",me=pe.getAttribute("data-drag-kind")||"",Re=pe.getAttribute("data-root-dir")||"";if(!Se||!me)return;let je=pe.getAttribute("data-queue-index")||"",Qe=Number(je),Ue=pe.getAttribute("data-lane-id")||"";k={kind:me,bead_id:Se,root_dir:Re,...je!==""&&Number.isFinite(Qe)?{queue_index:Qe}:{},...Ue?{lane_id:Ue}:{}},T=!0,p?.(),n.classList.add("is-dragging");try{Q.dataTransfer?.setData("text/plain",Se),Q.dataTransfer&&(Q.dataTransfer.effectAllowed="move")}catch{}}function ke(Q){let oe=le(Q);oe&&(Q.preventDefault(),Q.dataTransfer&&(Q.dataTransfer.dropEffect="move"),oe.zone.classList.add("is-drop-over"))}function Ce(Q){let oe=Q.target;typeof oe?.closest=="function"&&(oe.closest("[data-drop]")?.classList.remove("is-drop-over"),oe.closest(".worker-pane--collapsed")?.classList.remove("is-drop-over"))}function ot(){k=null,Z(),n.classList.remove("is-dragging"),X()}function st(Q){let oe=le(Q),se=k;k=null,Z(),n.classList.remove("is-dragging"),!(!oe||!se)&&(Q.preventDefault(),_e(se,oe.target))}return{attach(Q){re||(re=Q,Q.addEventListener("pointerdown",be),Q.addEventListener("dragstart",Oe),Q.addEventListener("dragover",ke),Q.addEventListener("dragleave",Ce),Q.addEventListener("drop",st),Q.addEventListener("dragend",ot))},detach(){C!==null&&(clearTimeout(C),C=null);let Q=re;re=null,Q&&(Q.removeEventListener("pointerdown",be),Q.removeEventListener("dragstart",Oe),Q.removeEventListener("dragover",ke),Q.removeEventListener("dragleave",Ce),Q.removeEventListener("drop",st),Q.removeEventListener("dragend",ot))},isDragging(){return k!==null},consumeClickSuppression(){let Q=T;return T=!1,Q},applyDrop:_e,runPlanned:ie,dropModel:K,sendOp:U,sendQueueCas:Y,rememberDep:ne}}function nn(e){return e&&typeof e=="object"?e:{}}function fv(e,t){for(let n of Object.values(nn(t.provider_hold)))for(let r of Array.isArray(n?.targets)?n.targets:[])if(Array.isArray(r?.attempt_ids)&&r.attempt_ids.includes(e))return r;return null}function _v(e){if(e?.status!=="ok")return{eligible:!1,reason:`\uACC4\uC815 \uC0C1\uD0DC ${String(e?.status||"\uBBF8\uC0C1")}`};let t=Array.isArray(e.windows)?e.windows:[],n=t.find(o=>o?.key==="5h"),r=t.find(o=>o?.key==="7d");if(!n||typeof n.pct!="number")return{eligible:!1,reason:"5\uC2DC\uAC04 \uC0AC\uC6A9\uB7C9 \uBBF8\uAD00\uCE21"};if(n.pct>80)return{eligible:!1,reason:"5\uC2DC\uAC04 \uC0AC\uC6A9\uB7C9 80% \uCD08\uACFC"};if(r){if(typeof r.pct!="number")return{eligible:!1,reason:"7\uC77C \uC0AC\uC6A9\uB7C9 \uBBF8\uAD00\uCE21"};if(r.pct>90)return{eligible:!1,reason:"7\uC77C \uC0AC\uC6A9\uB7C9 90% \uCD08\uACFC"}}return{eligible:!0,reason:""}}function da(e,t){let n=nn(nn(t).attempts)[e];if(!n)return null;let r=nn(nn(t).runner_catalog),o=nn(r.runners),i=typeof n.runner=="string"&&o[n.runner]?n.runner:Object.keys(o)[0]||"",s=nn(o[i]),l=nn(s.models),a=typeof n.model=="string"&&l[n.model]?n.model:typeof s.default_model=="string"?s.default_model:Object.keys(l)[0]||"",u=fv(e,nn(t)),d=typeof n.claude_account=="string"?n.claude_account:typeof u?.account=="string"?u.account:"";return{attempt_id:e,original_runner:i,runner:i,model:a,account:d,fresh_current:!1}}function pa(e,t,n){if(!e||!t||typeof t.closest!="function")return null;let r=t.closest(".provider-resume-dialog__runner");if(r){let l=nn(nn(nn(n).runner_catalog).runners),a=nn(l[r.value]),u=Object.keys(nn(a.models));return{...e,runner:r.value,model:typeof a.default_model=="string"?a.default_model:u[0]||""}}let o=t.closest(".provider-resume-dialog__model");if(o){try{let[l,a]=JSON.parse(o.value);if(typeof l=="string"&&typeof a=="string")return{...e,runner:l,model:a}}catch{}return e}let i=t.closest(".provider-resume-dialog__account");if(i)return{...e,account:i.value};let s=t.closest(".provider-resume-dialog__fresh-input");return s?{...e,fresh_current:s.checked}:null}function fa(e){if(!e||!e.runner||!e.model||e.runner==="claude"&&!e.account)return null;let t={runner:e.runner,model:e.model};e.runner==="claude"&&e.account&&(t.claude_account=e.account);let n=e.fresh_current||e.runner!==e.original_runner;return{attempt_id:e.attempt_id,payload:{exec_override:t,...n?{continuation:"fresh_current",decision_token:{}}:{}}}}function Ao(e,t){if(!e)return"";let n=nn(nn(nn(t).runner_catalog).runners),r=nn(nn(t).account_catalog),o=Array.isArray(r.claude)?r.claude:[],i=e.runner!==e.original_runner;return c`<dialog
    class="op-dialog provider-resume-dialog"
    aria-label="다른 방법으로 이어하기"
  >
    <h2>다른 방법으로 이어하기</h2>
    <div class="provider-resume-dialog__fields">
      <label>
        러너
        <select class="provider-resume-dialog__runner">
          ${Object.keys(n).map(s=>c`<option value=${s} ?selected=${s===e.runner}>
                ${s}
              </option>`)}
        </select>
      </label>
      <label>
        모델
        <select class="provider-resume-dialog__model">
          ${Object.entries(n).map(([s,l])=>c`<optgroup label=${s}>
                ${Object.keys(nn(l?.models)).map(a=>c`<option
                      value=${JSON.stringify([s,a])}
                      ?selected=${s===e.runner&&a===e.model}
                    >
                      ${a}
                    </option>`)}
              </optgroup>`)}
        </select>
      </label>
      ${e.runner==="claude"?c`<label>
            계정
            <select class="provider-resume-dialog__account">
              ${e.account?"":c`<option value="" selected>계정 선택</option>`}
              ${e.account&&!o.some(s=>s?.email===e.account)?c`<option value=${e.account} selected>
                    ${e.account} (목록에 없음)
                  </option>`:""}
              ${o.map(s=>{let l=_v(s),a=s.alias||s.email;return c`<option
                  value=${s.email}
                  ?selected=${s.email===e.account}
                  ?disabled=${!l.eligible}
                  title=${l.reason}
                >
                  ${a}${l.reason?` \u2014 ${l.reason}`:""}
                </option>`})}
            </select>
          </label>`:""}
      <label class="provider-resume-dialog__fresh">
        <input
          type="checkbox"
          class="provider-resume-dialog__fresh-input"
          .checked=${e.fresh_current}
        />
        새 세션으로
      </label>
    </div>
    ${i||e.fresh_current?c`<p class="provider-resume-dialog__notice">
          이전 세션 맥락을 요약 인계합니다
        </p>`:""}
    <div class="op-dialog__actions provider-resume-dialog__actions">
      <button type="button" class="op-btn provider-resume-dialog__cancel">
        취소
      </button>
      <button
        type="button"
        class="op-btn op-btn--primary provider-resume-dialog__confirm"
        ?disabled=${e.runner==="claude"&&!e.account}
        title=${e.runner==="claude"&&!e.account?"\uACC4\uC815\uC744 \uBA3C\uC800 \uACE0\uB974\uC138\uC694":""}
      >
        이어하기
      </button>
    </div>
  </dialog>`}function _a(e){let t=e?.querySelector?.(".provider-resume-dialog")||null;!t||t.open||(typeof t.showModal=="function"?t.showModal():t.setAttribute("open",""))}var Zl=Object.freeze({repo_ops_worktree_unowned:"\uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC\uAC00 \uC544\uC9C1 Worker \uC18C\uC720\uAC00 \uC544\uB2C8\uC5B4\uC11C \uC2A4\uD06C\uB9BD\uD2B8 \uC2E4\uD589 \uC804\uC5D0 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4.",verify_cmd_failed:"\uBA38\uC9C0 \uD6C4 \uAC80\uC99D \uBA85\uB839\uC774 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",gh_observation_failed:"GitHub\uC5D0\uC11C PR \uC0C1\uD0DC\uB97C \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",verify_script_failure:"\uAC80\uC99D \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",deploy_script_failure:"\uBC30\uD3EC \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",interrupted_without_terminal_exit:"\uC791\uC5C5\uC774 \uC885\uB8CC \uAE30\uB85D \uC5C6\uC774 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4.",manual_target_missing:"\uC218\uB3D9 \uBC30\uD3EC \uAE30\uB85D\uC5D0 \uD540\uB41C \uB300\uC0C1 SHA\uAC00 \uC5C6\uC5B4 \uC2E4\uD589\uD558\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4.",bootstrap_not_approved:"\uCCAB [deploy] \uC120\uC5B8\uC740 \uC0AC\uB78C \uC2B9\uC778 \uC5C6\uC774 \uC2E4\uD589\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4. Worker \uC124\uC815\uC758 [\uBC30\uD3EC \uC2E4\uD589]\uC73C\uB85C \uC6D0\uACA9 base tip\uC744 \uD55C \uBC88 \uBC30\uD3EC\uD55C \uB4A4 [\uC815\uC0B0 \uC7AC\uAC1C]\uB97C \uB204\uB974\uC138\uC694 \u2014 \uADF8 \uB4A4 \uBA38\uC9C0\uBD80\uD130\uB294 \uC790\uB3D9 \uBC30\uD3EC\uB429\uB2C8\uB2E4.",base_unresolved:"PR\uC774 \uC5B4\uB290 base \uBE0C\uB79C\uCE58\uB85C \uBA38\uC9C0\uB418\uB294\uC9C0 \uD655\uC815\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_ref_unobserved:"PR\uC758 base \uBE0C\uB79C\uCE58\uB97C \uC544\uC9C1 \uAD00\uCE21\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",merge_sha_unobserved:"\uBA38\uC9C0 \uCEE4\uBC0B SHA\uB97C \uC544\uC9C1 \uAD00\uCE21\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_fetch_failed:"\uC6D0\uACA9 base \uBE0C\uB79C\uCE58\uB97C fetch\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_rev_unavailable:"fetch\uD55C \uC6D0\uACA9 base \uBE0C\uB79C\uCE58\uC758 \uCEE4\uBC0B\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_ff_diverged:"\uB85C\uCEEC base \uBE0C\uB79C\uCE58\uAC00 \uC6D0\uACA9\uACFC \uAC08\uB77C\uC838 fast-forward\uB85C \uC815\uB82C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",deployment_target_not_covering_merge:"\uBC30\uD3EC \uB300\uC0C1 base\uAC00 \uC774 \uBA38\uC9C0 \uCEE4\uBC0B\uC744 \uD3EC\uD568\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.",deployment_candidate_ancestry_check_failed:"\uBC30\uD3EC \uB300\uC0C1 base\uAC00 \uC774 \uBA38\uC9C0 \uCEE4\uBC0B\uC744 \uD3EC\uD568\uD558\uB294\uC9C0 \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",verify_red:"\uBA38\uC9C0 \uD6C4 \uAC80\uC99D\uC774 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",cleanup_failed:"\uBA38\uC9C0 \uD6C4 \uC815\uB9AC\uAC00 \uB05D\uB098\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",retry_exhausted:"\uC790\uB3D9 \uC7AC\uC2DC\uB3C4\uB97C \uBAA8\uB450 \uC4F0\uACE0\uB3C4 \uAC19\uC740 \uC2E4\uD328\uAC00 \uC774\uC5B4\uC84C\uC2B5\uB2C8\uB2E4.",conflict_unresolved:"\uCDA9\uB3CC \uD574\uC18C\uAC00 \uB05D\uB098\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",internal_record_failed:"Worker \uB0B4\uBD80 \uAE30\uB85D\uC774 \uC2E4\uD328\uD574 \uC9C4\uD589\uC744 \uBA48\uCDC4\uC2B5\uB2C8\uB2E4.",foreign_landing_unpinned:"\uB2E4\uB978 \uC800\uC7A5\uC18C \uCC29\uC9C0\uC778\uB370 foreign_repo\xB7foreign_path\xB7foreign_base \uD540\uC774 \uC5C6\uAC70\uB098 \uD615\uC2DD\uC774 \uD2C0\uB9BD\uB2C8\uB2E4.",foreign_checkout_unavailable:"\uD540\uB41C \uB300\uC0C1 \uC800\uC7A5\uC18C \uCCB4\uD06C\uC544\uC6C3\uC774 \uC5C6\uAC70\uB098 foreign_repo\uC640 \uAC19\uC740 URL\uC758 remote\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4.",foreign_deploy_unsupported:"\uB300\uC0C1 \uC800\uC7A5\uC18C\uAC00 [deploy]\uB97C \uC120\uC5B8\uD574 Worker\uAC00 \uBC30\uD3EC \uC99D\uAC70\uB97C \uB9CC\uB4E4 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4. \uC138\uC158\uC774 \uBC30\uD3EC\uC640 \uB9C8\uAC10\uC744 \uC18C\uC720\uD569\uB2C8\uB2E4.",repair_lane_retired:"\uC790\uB3D9 \uC218\uB9AC \uB808\uC778\uC774 \uC740\uD1F4\uD574 \uC0AC\uB78C \uCC98\uB9AC\uB85C \uB118\uC5B4\uC654\uC2B5\uB2C8\uB2E4."});var mf={verify_failed:"\uAC80\uC99D \uC2E4\uD328",verify_cmd_failed:"\uAC80\uC99D \uC2E4\uD328",verify_script_failure:"\uAC80\uC99D \uC2E4\uD328",deploy_failed:"\uBC30\uD3EC \uC2E4\uD328",deploy_script_failure:"\uBC30\uD3EC \uC2E4\uD328",job_script_failure:"\uC7A1 \uC2E4\uD328",interrupted_without_terminal_exit:"\uC911\uB2E8\uB428",quickfix_landing_failed:"\uCC29\uC9C0 \uC2E4\uD328",runner_exit:"\uC138\uC158 \uC2E4\uD328",session_parked:"\uC138\uC158 \uB300\uAE30",session_ended_unresolved:"\uC138\uC158 \uC885\uB8CC",prerequisite_unmet:"\uC120\uD589 \uB300\uAE30",delivery_unproven:"\uCC29\uC9C0 \uC99D\uAC70 \uBD80\uC871"},gf={overloaded_529:"Claude API \uACFC\uBD80\uD558(529)\uB85C \uBCF4\uB958",rate_limited_429:"Claude API \uC694\uCCAD \uD55C\uB3C4(429)\uB85C \uBCF4\uB958"},hf={"session_hard_stop:failure":"\uC138\uC158\uC774 \uC2E4\uD328\uB97C \uBCF4\uACE0\uD558\uACE0 \uC885\uB8CC","session_hard_stop:environment":"\uC138\uC158\uC774 \uD658\uACBD \uC624\uB958\uB97C \uBCF4\uACE0\uD558\uACE0 \uC885\uB8CC","resume_failed:transcript_missing":"\uC774\uC5B4\uD558\uAE30 \uB300\uC0C1 \uC138\uC158 \uAE30\uB85D\uC774 \uC5C6\uC74C \u2014 \uC0C8 \uC138\uC158\uC73C\uB85C \uB300\uCCB4"};function mv(e){return typeof e!="number"||!Number.isFinite(e)?"":new Date(e).toLocaleTimeString("ko-KR",{hour:"2-digit",minute:"2-digit"})}function gv(e,t){if(typeof e!="string"||!e.startsWith("provider_outage:"))return null;let n=e.slice(16);if(n==="usage_limit"){let o=t&&typeof t=="object"?t.resets_at:null,i=mv(o);return i?`\uACC4\uC815 \uC0AC\uC6A9 \uD55C\uB3C4\uB85C \uBCF4\uB958 \u2014 \uB9AC\uC14B ${i}`:"\uACC4\uC815 \uC0AC\uC6A9 \uD55C\uB3C4\uB85C \uBCF4\uB958"}if(Object.hasOwn(gf,n))return gf[n];let r=/^http_(5\d\d)$/.exec(n);return r?`Claude API \uC624\uB958(${r[1]})\uB85C \uBCF4\uB958`:null}function ga(e){return typeof e!="string"||e.length===0?[]:e.split(":").filter(t=>t.length>0)}function ma(e){for(let t of ga(e)){if(Object.hasOwn(mf,t))return mf[t];if(t.startsWith("session_"))return"\uC138\uC158 \uC2E4\uD328"}return null}function yf(e){return ga(e).length===0?null:ma(e)||"\uC2E4\uD328"}function zr(e){let t=null;for(let n of ga(e))Object.hasOwn(Zl,n)&&(t=Zl[n]);return t}function wr(e,t){if(typeof e=="string"&&Object.hasOwn(hf,e))return hf[e];let n=gv(e,t);if(n!==null)return n;let r=ma(e),o=zr(e);return r&&o?`${r} \u2014 ${o}`:r||o?r||o:typeof e=="string"?e:""}function vf(e,t){let n=ma(e)??ma(t),r=zr(t)??zr(e);return n&&r?`${n} \u2014 ${r}`:n||r?n||r:typeof t=="string"?t:""}var hv=new Set(["repo_operation_timeout_unresolved"]);function bv(e){for(let t of ga(e))if(hv.has(t)||t.startsWith("repo_ops_"))return!0;return!1}function yv(e,t){return t.code==="interrupted"||t.interrupted===!0||e.failure_kind==="interrupted_without_terminal_exit"||t.code==="interrupted_without_terminal_exit"}function kf(e,t){if(!e||typeof e!="object")return"";let n=e.failure;if(!n||typeof n!="object"||bv(n.code))return"";if(n.code==="timeout"){let o=Number(t);return Number.isFinite(o)&&o>0?`\uD0C0\uC784\uC544\uC6C3 ${Math.round(o/1e3)}\uCD08 \uCD08\uACFC`:"\uD0C0\uC784\uC544\uC6C3 \uCD08\uACFC"}if(yv(e,n))return"\uC885\uB8CC \uAE30\uB85D \uC5C6\uC74C \u2014 \uC911\uB2E8\uB428";let r=typeof e.elapsed_ms=="number"&&Number.isFinite(e.elapsed_ms)&&e.elapsed_ms>=0?` \xB7 ${jr(e.elapsed_ms)}`:"";return typeof e.signal=="string"&&e.signal.length>0?`signal ${e.signal}${r}`:Number.isInteger(e.exit_code)?`exit ${e.exit_code}${r}`:""}var bf={schema_unsupported:"\uD540\uB41C \uC815\uCC45 \uC2A4\uD0A4\uB9C8\uB97C \uC9C0\uC6D0\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4."};function wf(e){if(!e||typeof e!="object")return"";let t=e.retry;if(!t||typeof t!="object")return"";if(typeof t.blocked_reason=="string"&&t.blocked_reason)return`\uC790\uB3D9 \uC7AC\uC2DC\uB3C4 \uBABB \uD568 \u2014 ${Object.hasOwn(bf,t.blocked_reason)?bf[t.blocked_reason]:t.blocked_reason}`;if(t.status==="absorbed"){let n=t.absorbed&&typeof t.absorbed=="object"?t.absorbed:null,r=wr(n?.first_failure?.code);return r?`\uC790\uB3D9 \uC7AC\uC2DC\uB3C4\uB85C \uD574\uC18C\uB428 \u2014 \uCCAB \uC2E4\uD328: ${r}`:"\uC790\uB3D9 \uC7AC\uC2DC\uB3C4\uB85C \uD574\uC18C\uB428"}if(e.state!=="failed")return"";if(t.status==="not_applicable")return"\uC7AC\uC2DC\uB3C4 \uB300\uC0C1 \uC544\uB2D8 \u2014 \uC2A4\uD06C\uB9BD\uD2B8 \uC2E4\uD589 \uC804 \uC2E4\uD328";if(t.status==="consumed"){let n=typeof t.first_fingerprint=="string"&&t.first_fingerprint?t.first_fingerprint:null;if(n===null)return"";if(n===e.failure?.fingerprint)return"\uC790\uB3D9 \uC7AC\uC2DC\uB3C4 1\uD68C \u2014 \uAC19\uC740 \uC2E4\uD328";let r=wr(t.first_failure?.code);return r?`\uC790\uB3D9 \uC7AC\uC2DC\uB3C4 1\uD68C \u2014 \uB2E4\uB978 \uC2E4\uD328: ${r}`:"\uC790\uB3D9 \uC7AC\uC2DC\uB3C4 1\uD68C \u2014 \uB2E4\uB978 \uC2E4\uD328"}return""}function vv(e){if(!Number.isFinite(e)||e<0)return"0s";let t=Math.floor(e/1e3),n=Math.floor(t/60),r=t%60;return n>0?`${n}m ${String(r).padStart(2,"0")}s`:`${r}s`}var $f=200;function kv(e){return typeof e!="string"||e.length===0?"":e.length>$f?`${e.slice(0,$f)}\u2026`:e}function wv(e){let t=e&&e.attempts>0&&e.max>0?` ${e.attempts}/${e.max}`:"",n=e&&typeof e.next_at=="number"?` \xB7 ${new Date(e.next_at).toLocaleTimeString("ko-KR",{hour:"2-digit",minute:"2-digit"})}`:"";return`\u21BB \uC7AC\uC2DC\uB3C4 \uB300\uAE30${t}${n}`}function Jl(e){return typeof e!="number"||!Number.isFinite(e)?"":new Date(e).toLocaleTimeString("ko-KR",{hour:"2-digit",minute:"2-digit"})}function $v(e){if(!e)return"";let t=e.auto_resume==="disarmed"?" \xB7 \uC218\uB3D9 \uC870\uCE58":"";if(e.kind==="usage_limit"){let r=Jl(e.resets_at);if(!r)return`\u23F3 \uD55C\uB3C4 \uB300\uAE30 \xB7 \uB9AC\uC14B \uBBF8\uC0C1${t}`;let o=e.target?.account_alias||e.target?.account||"";return`\u23F3 \uD55C\uB3C4 \uB300\uAE30 ${r}${o?` \xB7 ${o}`:""}${t}`}let n=Jl(e.next_probe_at);return`\u26A0\uFE0F \uACF5\uAE09\uC790 \uC7A5\uC560${n?` \xB7 \uB2E4\uC74C \uD504\uB85C\uBE0C ${n}`:""}${t}`}function Af(e){if(!e)return"";let t=Array.isArray(e.timeline)?e.timeline:[],n=typeof e.log_path=="string"?e.log_path:"",r=e.log_expired===!0,o=e.log_unreadable===!0;return t.length===0&&n.length===0&&!r&&!o?"":c`${t.length>0?c`<ol class="rtile__history" data-seam="tile-timeline">
        ${t.map(i=>c`<li class="rtile__history-row">
              ${xf(i.at)?c`<span class="rtile__history-at"
                    >${xf(i.at)}</span
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
          </p>`:""}`}function xf(e){return typeof e!="number"||!Number.isFinite(e)?"":new Date(e).toLocaleTimeString("ko-KR",{hour:"2-digit",minute:"2-digit"})}function xv(e,t){if(!e||e.open!==!0)return"";let n=zr(e.cause)||wr(e.cause,e.cause_detail),r=e.retry&&e.retry.attempts>0?`\uC790\uB3D9 \uC7AC\uC2DC\uB3C4 ${e.retry.attempts}\uD68C \u2014 \uAC19\uC740 \uC624\uB958`:"",o=e.cause_detail,i=e.quickfix_lane&&e.quickfix_landing?e.quickfix_landing:null,s=i?[i.cursor||null,typeof i.head_sha=="string"?i.head_sha.slice(0,7):null,i.reason||null].filter(Boolean).join(" \xB7 "):"",l=typeof e.finished_at=="number"?`${new Date(e.finished_at).toLocaleString("ko-KR")} \xB7 ${mn(e.finished_at,t)}`:"",a=[e.runner,e.model,e.observed_effort??e.effort,e.speed].filter(m=>typeof m=="string"&&m.length>0).join(" \xB7 "),u=e.usage?.total_cost_usd,d=typeof u=="number"&&Number.isFinite(u)?`$${u.toFixed(2)}`:"",p=Af(e);return c`<div
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
  </div>`}function Av(e){return e==="pending"?"\uD68C\uBCF5 \uD6C4 \uC790\uB3D9 \uC7AC\uAC1C \uB300\uAE30":e==="disarmed"?"\uC790\uB3D9 \uC7AC\uAC1C \uC18C\uC9C4 \xB7 \uC218\uB3D9 \uC870\uCE58 \uD544\uC694":typeof e=="string"&&e.startsWith("refused:")?`\uC790\uB3D9 \uC7AC\uAC1C \uAC70\uBD80 \xB7 ${e.slice(8)}`:""}function Sv(e){return e==="none"?"\uACC4\uC815 \uC804\uD658 \uC548 \uD568 \xB7 \uC870\uAC74\uC744 \uB9CC\uC871\uD558\uB294 \uB2E4\uB978 \uACC4\uC815 \uC5C6\uC74C":e==="disabled"?"\uACC4\uC815 \uC804\uD658 \uC548 \uD568 \xB7 \uC790\uB3D9 \uC804\uD658 \uAEBC\uC9D0":""}function Ev(e){if(!e||e.open!==!0)return"";let t=[e.target?.model,e.target?.account_alias||e.target?.account].filter(i=>typeof i=="string"&&i.length>0).join(" \xB7 "),n=Jl(e.resets_at),r=Av(e.auto_resume),o=Sv(e.auto_switch);return c`<div
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
  </div>`}function Tv(e){return!e||!e.repo&&!e.serial_lane_id?"":c`${e.repo?c`<span
        class="worker-card__repo rtile__repo"
        title=${e.root_dir||""}
        >${e.repo}</span
      >`:""}${e.serial_lane_id?c`<span class="rtile__lane">${e.serial_lane_id}</span>`:""}`}var Cv=new Set(["codex-runner"]);function Rv(e,t,n,r=null){if(!e)return"";let o=e.last_activity||null,i=o&&typeof o.text=="string"?o.text:"",s=o&&typeof o.at=="number"?o.at:null,l=(r||!Array.isArray(e.legs)?[]:e.legs).filter(g=>g&&!(typeof g.agent_type=="string"&&Cv.has(g.agent_type))),a=l.filter(g=>g&&g.state==="live"),u=l.filter(g=>g&&g.state!=="live"),d=r&&typeof r.last_event_at=="number"?mn(r.last_event_at,t):"",p=r?mn(r.updated_at,t):"",m=d?`\uCD5C\uADFC \uD65C\uB3D9 ${d}`:p?`\uAC31\uC2E0 ${p}`:"";return c`${i?c`<div class="rtile__activity${n?" is-paused":""}">
        <span class="rtile__activity-dot" aria-hidden="true"></span>
        <span class="rtile__activity-text">${i}</span>
        ${s!==null?c`<span class="rtile__activity-age"
              >${mn(s,t)}</span
            >`:""}
      </div>`:m?c`<div class="rtile__activity rtile__activity--session">
          <span class="rtile__activity-dot" aria-hidden="true"></span>
          <span class="rtile__activity-text">${m}</span>
        </div>`:""}${a.length>0||u.length>0?c`<div class="rtile__legs">
        ${a.map(g=>c`<span
              class="rtile__leg rtile__leg--live"
              title="이 세션이 띄운 서브에이전트/Codex 세션이 실행 중입니다"
              >위임 중 · ${g.label}</span
            >`)}${u.length>0?c`<span
              class="rtile__leg rtile__leg--done"
              title=${`\uC644\uB8CC\uB41C \uC704\uC784: ${u.map(g=>g.label).join(", ")}`}
              >위임 완료 ${u.length}</span
            >`:""}
      </div>`:""}`}var Ov={remote:"\uB2E4\uB978 \uBA38\uC2E0 \uC138\uC158 \u2014 \uC774 \uC11C\uBC84\uC5D0 transcript \uC5C6\uC74C",missing:"transcript \uD30C\uC77C \uC5C6\uC74C"};function Iv(e){if(!e)return"";let t=Ov[e.locality]||"";return c`<button
    type="button"
    class="rtile__session"
    ?disabled=${t.length>0}
    title=${t||"\uB77C\uC774\uBE0C \uC138\uC158 \uC5F4\uAE30"}
    aria-label="라이브 세션 열기"
  >
    ▤ 세션
  </button>`}function Lv(e,t,n,r="",o="",i=!1){if(e==="provider_hold")return c`<div class="rtile__foot">
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
    </div>`;if(e==="retry_wait")return n?c`<div class="rtile__foot">${n}</div>`:"";let s=kv(t?.summary);if(e==="waiting")return c`${s?c`<p class="rtile__held-summary">${s}</p>`:""}${r}
      <div class="rtile__foot">${n}</div>`;let l=Af(t);return c`${s?c`<p class="rtile__held-summary">${s}</p>`:""}${l}
    <div class="rtile__foot">
      ${i?c`${n}${o}`:c`${o}${n}`}
    </div>`}function ec(e,t,n=null,r={}){let o=e.kind==="session",i=o&&Array.isArray(e.session_refs)&&e.session_refs.find(Se=>Se&&Se.current===!0)||null,s=e.failed===!0,l=s&&e.failure||null,a=e.parked===!0&&!s,u=e.retry_wait===!0&&!s&&!a,d=e.waiting===!0&&!s&&!a&&!u,p=e.provider_hold===!0&&!s&&!a&&!u&&!d,m=a&&e.failure||null,g=d&&e.wait||null,k=p&&e.hold||null,T=a||u||d||p,C=!!e.paused,te=s||T?e.status_label||(a?"\uC138\uC158 \uB300\uAE30":u?"\uC7AC\uC2DC\uB3C4 \uB300\uAE30":d?"\uC120\uD589 \uB300\uAE30":p?"\uACF5\uAE09\uC790 \uBCF4\uB958":e.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328"):C?"\uC77C\uC2DC\uC815\uC9C0":typeof e.started_at=="number"?vv(t-e.started_at):"\u2014",re=e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker)?e.exec_chips:null,X=Mo(e),D=ln(e.usage),O=er(e.usage),q=e.conflict_resolution?C?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":"\uCDA9\uB3CC \uD574\uC18C":null,B=e.base_exception||null,K=e.landing,F=e.attempt_id&&e.attempt_id===n,N=r.monitor||null,Y=Tv(N),U=Ti(N?.cross_lane_chip),ne=N?Ei(N.dependency_chips):"",ve=Rv(N,t,C,o?{updated_at:e.updated_at??null,last_event_at:i&&i.locality==="local"?i.last_event_at:null}:null),Pe=o&&e.workflow?.chips?.exec_receipt||null,H=Ci(e.workflow),ie=Ri(e.rec,e.chip_popover?.chip_key==="rec"),_e=e.chip_popover?co(e.chip_popover.content):"",Te=Pe?c`<span
        class="ctl-chip ctl-chip--exec-receipt"
        title=${`exec_receipt ${Jn(Pe)}`}
        >${`${Pe.kind}:${ei(Pe)}`}</span
      >`:"",V=i?c`<span
        class="ctl-chip ctl-chip--sref"
        title=${`${i.provider}:${i.session_id}@${i.host}${(e.session_refs||[]).length>=2?` \xB7 \uC774\uB825 ${(e.session_refs||[]).length}`:""}`}
        >${qo(i)}</span
      >`:"",le=Y||U||H||V||Te||ie?c`<div class="rtile__meta">
          ${Y}${U}${H}${V}${Te}${ie}${_e}
        </div>`:"",Z=l?c`<button
          type="button"
          class="rtile__failure-badge"
          data-attempt-id=${l.attempt_id}
          aria-expanded=${l.open===!0?"true":"false"}
          aria-label="실패 상세"
        >
          ⛔ ${yf(l.cause)||"\uC2E4\uD328"}
        </button>
        ${l.halted_auto_advance?c`<span class="rtile__auto-halted">자동 진행 꺼짐</span>`:""}`:"",be=a?c`<span
        class="rtile__held-badge"
        title="세션이 사용자 결정을 기다리며 정상 종료했습니다 — 큐는 계속 갑니다"
        >⏸ 세션 대기</span
      >`:u?c`<span
          class="rtile__held-badge"
          title="환경성 실패의 자동 재시도를 기다립니다 — 사람이 할 일은 없습니다"
          >${wv(e.retry)}</span
        >`:d?c`<span
            class="rtile__held-badge"
            title="세션이 선행 미충족으로 착수를 거부했습니다 — 선행이 닫히면 저절로 다시 돕니다"
            >⛓ 선행 대기</span
          >`:p&&k?c`<button
              type="button"
              class="rtile__held-badge rtile__provider-hold-badge"
              data-attempt-id=${e.attempt_id}
              aria-expanded=${k.open===!0?"true":"false"}
              aria-label="공급자 보류 상세"
            >
              ${$v(k)}
            </button>`:"",Oe=c`${q?c`<span class="worker-mini__badge">${q}</span>`:""}${B?c`<span
        class="worker-mini__badge"
        title="이 세션의 target base가 워크스페이스 선언 base와 다릅니다"
        >${B}</span
      >`:""}${Z}${be}`,ke=o?"":ho(e),Ce=mi(l?.quickfix_landing),ot=Ce==="settlement"?"\uC815\uC0B0 \uC7AC\uAC1C":"\uC774\uC5B4\uD558\uAE30",st=Ce==="settlement"?"\uCC29\uC9C0 \uC815\uC0B0\uC744 \uB2E4\uC2DC \uC2E4\uD589":"\uAC19\uC740 \uC138\uC158\uC73C\uB85C \uC774\uC5B4\uC11C \uC9C4\uD589",Q=e.resolve_action?c`<button
        type="button"
        class="rtile__resolve"
        ?disabled=${e.resolve_enabled===!1}
        title=${e.resolve_title||"\uC774 \uC2E4\uD328\uB97C \uC0AC\uB78C\uC774 \uC774\uC5B4\uBC1B\uB294 \uB300\uD654\uD615 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4"}
        aria-label="세션에서 해결"
      >
        세션에서 해결
      </button>`:"",oe=e.discard?.action&&!(s&&l?.landed===!0)?c`<button
          type="button"
          class="rtile__discard"
          data-operation-id=${e.discard.operation?.operation_id||""}
          data-confirmation=${l?.confirmation||"unmerged"}
          ?disabled=${!e.discard.enabled}
          title=${e.discard.title}
          aria-label=${e.discard.label}
        >
          ${e.discard.label}
        </button>`:"",se=oe&&e.discard?.abandon?.action===!0?c`<button
          type="button"
          class="rtile__discard-abandon"
          data-operation-id=${e.discard.operation?.operation_id||""}
          data-operation-kind=${e.discard.operation?.kind||""}
          data-last-error=${e.discard.error||""}
          title=${e.discard.abandon.title}
          aria-label=${e.discard.abandon.label}
        >
          ${e.discard.abandon.label}
        </button>`:"",pe=se?c`${oe}${se}`:oe;return c`<div
    class="rtile${F?" rtile--sel":""}${C?" rtile--paused":""}${s?" rtile--failed rtile--compact":""}${T?" rtile--held rtile--compact":""}${a?" rtile--parked":""}${u?" rtile--retry-wait":""}${d?" rtile--waiting":""}${o?" rtile--session":""}${p?" rtile--provider-hold":""}${e.search_match===!1?" is-dimmed":""}"
    data-bead-id=${e.bead_id}
    data-attempt-id=${e.attempt_id||""}
  >
    <div class="rtile__hd">
      <span
        class="rtile__dot${o?" rtile__dot--session":""}"
        aria-hidden="true"
      ></span>
      <span class="rtile__id" title="클릭하면 ID 복사">${e.bead_id}</span>
      ${Oi(e.priority)}${X?c`<span class="rtile__resumed" title=${X}>↻</span>`:""}${Oe}
      <div class="rtile__hd-actions">
        ${o?c`${typeof e.started_at=="number"?c`<span class="rtile__elapsed">${te}</span>`:""}${Iv(i)}<span
                class="rtile__session-badge"
                title="Worker가 아닌 세션이 in_progress로 잡은 이슈"
                >세션</span
              >`:c`<span class="rtile__elapsed">${te}</span>`}
        ${o||T?"":s?c`<button
                  type="button"
                  class="op-btn rtile__resume"
                  data-resume-kind=${Ce}
                  ?disabled=${l?.resume_eligible===!1}
                  title=${l?.resume_eligible===!1?l.resume_reason||`${ot} \uBD88\uAC00`:st}
                  aria-label=${ot}
                >
                  ↻ ${ot}
                </button>
                ${pe}`:c`<button
                  type="button"
                  class="rtile__session"
                  title="라이브 세션 열기"
                  aria-label="라이브 세션 열기"
                >
                  ▤ 세션
                </button>
                ${C?c`<button
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
                ${pe}`}${a?"":Q}
      </div>
    </div>
    <div class="rtile__title">${e.title}</div>
    ${T?Lv(a?"parked":u?"retry_wait":d?"waiting":"provider_hold",a?m:d?g:k,pe,d?ne:"",a?Q:"",a&&!!e.discard?.error):s?"":c`${ve}${e.rollup?Zs(e.rollup,{parent_id:e.bead_id,expanded:e.rollup_expanded===!0,childChips:Na}):""}
            ${K?c`<div class="rtile__landing">
                  <span
                    class="merge-step${K.failed?" merge-step--failed":""}"
                    style=${`--progress: ${K.percent}%`}
                    >${K.label}${K.index>0?c`<span class="merge-step__n"
                          >${K.index}/${K.total}</span
                        >`:""}</span
                  >
                </div>`:""}
            ${ne}
            ${o?le:Y||U||H||re||ie||D.length>0||O?c`<div class="rtile__meta">
                    ${Y}${U}${H}${Si(e.exec_chips)}${ie}
                    ${D.length>0?D.map(Se=>c`<span
                              class="worker-usage"
                              title=${Se.tooltip}
                              >${Se.label}</span
                            >`):O?c`<span
                            class="worker-usage"
                            title=${No(e.usage)}
                            >${O}</span
                          >`:""}${_e}
                  </div>`:""}
            ${ki(e)} ${ke}
            <!-- 살아있음만 말하는 비의미적 액센트 (UI-58y2 데스크톱 §실행 타일).
         quick_fix landing의 실제 진행은 위의 별도 진행 줄이 소유한다.
         일시정지된 타일은 살아있지 않으므로 액센트도 없다. -->
            ${s||C?"":c`<div class="rtile__accent" aria-hidden="true"></div>`}`}
    ${xv(l,t)}${Ev(k)}
  </div>`}function Dv(e){let t=e.last_activity&&typeof e.last_activity=="object"?e.last_activity:null,n=Array.isArray(e.legs)?e.legs:[],r=e.dependency_chips||null;return!t&&n.length===0&&!r&&e.kind!=="session"?null:{...t?{last_activity:t}:{},...n.length>0?{legs:n}:{},...r?{dependency_chips:r}:{}}}function Sf(e,t=Date.now(),n=null){let r=Array.isArray(e)?e:[];return c`<div class="worker-rungrid" id="worker-rungrid">
    ${r.length===0?c`<div class="worker-rungrid__empty">실행 세션 없음</div>`:r.map(o=>ec(o,t,n,{monitor:Dv(o)}))}
  </div>`}function So(e,t,n=!1){let r=!!t.discard?.error;return!e||!r&&t.parked!==!0?{}:{resolve_action:!0,resolve_enabled:!n,resolve_title:n?"\uC138\uC158 \uAE30\uB3D9 \uC694\uCCAD \uC911 \u2014 \uC11C\uBC84 \uC751\uB2F5\uC744 \uAE30\uB2E4\uB9BD\uB2C8\uB2E4":r?"\uC2E4\uD328\uD55C \uD3D0\uAE30\uB97C \uC0AC\uB78C\uC774 \uC774\uC5B4\uBC1B\uB294 \uB300\uD654\uD615 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4 \u2014 \uAE30\uB85D\uB41C \uC138\uC158\uC774 \uC788\uC73C\uBA74 fork\uD558\uACE0, \uC5C6\uC73C\uBA74 \uC0C8 \uC138\uC158\uC5D0 \uC0AC\uC720\uB97C \uC2E3\uC2B5\uB2C8\uB2E4":"\uD30C\uD0B9\uC744 \uC0AC\uB78C\uC774 \uC774\uC5B4\uBC1B\uB294 \uB300\uD654\uD615 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4 \u2014 \uC0B4\uC544 \uC788\uB294 \uBB38\uC758 \uC138\uC158\uC774 \uC788\uC73C\uBA74 \uADF8 \uCC3D\uC744 \uAC00\uB9AC\uD0B5\uB2C8\uB2E4"}}var sn="",Pv=["impl_runtime","impl_model","impl_effort"],Ef=["claude","codex"],Mv=["claude_account","codex_account"],qv=5,ha=1;function Tn(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function ba(e,t){let n=t.transport,r=typeof t.root_dir=="string"&&t.root_dir.length>0?t.root_dir:null,o=t.notify||(S=>ge(S,"error",4e3)),i={},s={},l={},a={},u=[],d=!1,p={state:"absent",values:{},warnings:[]},m={},g={},k=Promise.resolve(),T=Promise.resolve(),C={claude:null,codex:null},te=!1,re=null,X={},D="",O="general",q="",B=!1,K=!1,F=!1,N=null,Y=!1;function U(){let S=t.queue?t.queue():null;return Tn(S)?S:null}function ne(){let S=U();return S?S.runner_catalog:null}function ve(){let S=U();return S&&Tn(S.execution_defaults)?S.execution_defaults:null}function Pe(){let S=U();return!!(S&&Object.hasOwn(S,"quick_fix_orchestration_model"))}function H(){let S=t.implPresetStore?.get();return Tn(S)&&Array.isArray(S.presets)?S:null}function ie(){return r===null?{}:{root_dir:r}}async function _e(S,j){return Y||!n?null:await n(S,j)}function Te(S){S&&Tn(S.queue)&&t.onQueueAdopt?.(S.queue)}async function V(S,j){let z=U();if(!z||Y)return null;let Ae=await _e(S,{...j,...ie(),expected_revision:z.revision});if(Te(Ae),r!==null&&Ae&&Ae.conflict){let ye=Ae.queue&&typeof Ae.queue.revision=="number"?Ae.queue.revision:U()?.revision??z.revision;Ae=await _e(S,{...j,...ie(),expected_revision:ye}),Te(Ae)}return Ae}async function le(){d=!0,Ne();try{let S=await _e("get-session-defaults",{...ie()});i=li(S?.values),s={...i},l={},a={},u=Array.isArray(S?.warnings)?S.warnings:[]}catch(S){u=["kv_read_failed"],o(`\uC138\uC158 \uAE30\uBCF8\uAC12\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4: ${S instanceof Error?S.message:String(S)}`)}finally{d=!1,Ne()}}function Z(S,j){let z={...j};for(let Ae of jo){let ye=s[Ae];ye!==S[Ae]&&(typeof ye=="string"?z[Ae]=ye:delete z[Ae])}return z}function be(){T=T.then(()=>Oe())}async function Oe(){let S=Uu(i,s);if(Object.keys(S).length===0)return;let j={...s};try{let z=await _e("set-session-defaults",{values:S,...ie()});i=li(z?.values),s=Z(j,i),u=Array.isArray(z?.warnings)?z.warnings:[]}catch(z){o(`\uC138\uC158 \uAE30\uBCF8\uAC12 \uC800\uC7A5 \uC2E4\uD328: ${z instanceof Error?z.message:String(z)}`)}Ne()}function ke(S,j){if(!Tn(S))return;let z=S.state;p={state:z==="usable"||z==="unusable"||z==="absent"?z:"absent",values:Tn(S.values)?{...S.values}:{},warnings:Array.isArray(S.warnings)?S.warnings:[]},g={...p.values},j&&(m={...g})}async function Ce(){try{ke(await _e("get-workspace-accounts",{...ie()}),!0)}catch(S){p={state:"unusable",values:{},warnings:["kv_read_failed"]},g={},m={},o(`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4: ${S instanceof Error?S.message:String(S)}`)}Ne()}async function ot(S){try{let j=await fetch(S);if(!j.ok)return null;let z=await j.json();if(!Tn(z)||!Array.isArray(z.accounts))return null;let Ae=z.accounts.filter(ye=>Tn(ye)&&typeof ye.key=="string"&&ye.key.length>0&&typeof ye.email=="string"&&ye.email.length>0);return{accounts:Ae,active:Ae.find(ye=>ye.active===!0)||null}}catch{return null}}async function st(){te=!0;let[S,j]=await Promise.all([ot("/api/claude-usage"),ot("/api/codex-usage")]);Y||(C={claude:S,codex:j},Ne())}function Q(){let S={};for(let j of Mv){let z=Object.hasOwn(m,j)?m[j]:null,Ae=Object.hasOwn(g,j)?g[j]:null;z!==Ae&&(S[j]=z)}return S}async function oe(){let S=Q();if(Object.keys(S).length!==0){try{ke(await _e("set-workspace-accounts",{values:S,...ie()}),!1)}catch(j){o(`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12 \uC800\uC7A5 \uC2E4\uD328: ${j instanceof Error?j.message:String(j)}`)}Ne()}}function se(S,j){j===sn?delete m[S]:m[S]=j,Ne(),k=k.then(()=>oe())}function pe(S,j){if(Pv.includes(S)){Qe(S,j);return}j===sn?delete s[S]:s[S]=j,Ne(),be()}function Se(S,j){l[S]=j,delete a[S]}function me(S,j,z){if(l[S]=j,j.length>0&&!z(j)){a[S]=!0,Ne();return}delete l[S],delete a[S],j.length===0?delete s[S]:s[S]=j,Ne(),be()}function Re(){let S=pt().orchestration_model,j=An({global:{orchestration_model:S??void 0},execution_defaults:ve(),runner_catalog:ne()}).orchestration_model.value;return j?Pn(ne(),j):null}function je(S,j){typeof j=="string"&&j.length>0?s[S]=j:delete s[S]}function Qe(S,j){let z=j===sn?void 0:j,Ae=ju({impl_runtime:S==="impl_runtime"?z:s.impl_runtime,impl_model:S==="impl_model"?z:s.impl_model,impl_effort:S==="impl_effort"?z:s.impl_effort},ne(),Re());je("impl_runtime",Ae.impl_runtime),je("impl_model",Ae.impl_model),je("impl_effort",Ae.impl_effort),Ne(),be()}async function Ue(){let S=U();if(!S)return;let j={orchestration_model:S.orchestration_model??null,orchestration_effort:S.orchestration_effort??null,orchestration_speed:S.orchestration_speed??null,quick_fix_orchestration_model:S.quick_fix_orchestration_model??null,quick_fix_orchestration_effort:S.quick_fix_orchestration_effort??null,quick_fix_orchestration_speed:S.quick_fix_orchestration_speed??null},z=Wu(j,{...j,...X});if(Object.keys(z).length!==0){try{let Ae=await V("worker-queue-set-orchestration-defaults",{values:z});if(Ae&&Ae.applied===!1){o("Worker \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC");return}X={}}catch(Ae){o(`Worker \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${Ae instanceof Error?Ae.message:String(Ae)}`)}Ne()}}function J(S,j){X[S]=j===sn?null:j,Ne(),Ue()}function W(S){if(re=S,!S){Ne();return}let j=ne(),z=pt(),Ae=z.orchestration_model;Ae&&!_o(j,S).includes(Ae)&&(X.orchestration_model=null,Ae=null);let ye=z.orchestration_effort;ye&&!pi(j,S,Ae||wn).includes(ye)&&(X.orchestration_effort=null),Ne(),Ue()}async function qe(S){if(!(!U()||S<ha)){try{await V("worker-queue-set-slots",{slots:S})}catch(j){o(`slots \uC800\uC7A5 \uC2E4\uD328: ${j instanceof Error?j.message:String(j)}`)}Ne()}}async function dt(S){if(!(!U()||S<ha||S>qv)){try{await V("worker-queue-set-serial-lane-count",{count:S})}catch(j){o(`\uC9C1\uB82C \uB808\uC778 \uC800\uC7A5 \uC2E4\uD328: ${j instanceof Error?j.message:String(j)}`)}Ne()}}async function at(S,j){let z=S==="auto_advance"?"worker-automation-toggle":S==="auto_merge"?"worker-merge-auto-toggle":"worker-provider-auto-switch-toggle";try{await V(z,{on:j})}catch(Ae){o(`\uC790\uB3D9\uD654 \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${Ae instanceof Error?Ae.message:String(Ae)}`)}Ne()}function We(){let S={},j=pt();for(let z of po){let Ae=Dn.includes(z)?j[z]:s[z];typeof Ae=="string"&&Ae.length>0&&(S[z]=Ae)}return S}async function Xe(){let S=H();if(!S)return;let j=We();if(Object.keys(j).length===0){o("\uC800\uC7A5\uD560 \uC2E4\uD589 \uC124\uC815\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uBA3C\uC800 \uC2E4\uD589 \uAC12\uC744 \uC120\uD0DD\uD558\uC138\uC694");return}let z=(S.presets||[]).find(ye=>ye.id===D),Ae=q.trim()||(z?z.name:"");if(!Ae){o("\uD504\uB9AC\uC14B \uC774\uB984\uC744 \uC785\uB825\uD558\uC138\uC694");return}try{let ye=z?await _e("impl-preset-update",{expected_revision:S.revision,id:z.id,name:Ae,settings:j}):await _e("impl-preset-create",{expected_revision:S.revision,name:Ae,settings:j});if(ye&&ye.applied){if(q="",!z&&Array.isArray(ye.presets)){let ft=ye.presets.find($t=>$t.name===Ae);D=ft?ft.id:D}Ne()}else o("\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4"),Ne()}catch(ye){o(`\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328: ${ye instanceof Error?ye.message:String(ye)}`)}}async function $(){let S=H();if(!(!S||D.length===0))try{let j=await _e("impl-preset-delete",{expected_revision:S.revision,id:D});j&&j.applied?(D="",Ne()):(o("\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328: \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4"),Ne())}catch(j){o(`\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328: ${j instanceof Error?j.message:String(j)}`)}}function G(S){i=li(S.values),s={...i},u=Array.isArray(S.warnings)?S.warnings:[],Tn(S.queue)&&(t.onQueueAdopt?.(S.queue),X={})}async function he(S){let j=H(),z=U();if(!j||!z||D.length===0||S==="quick_fix"&&!Pe())return;let Ae=ye=>({preset_id:D,expected_revision:j.revision,expected_queue_revision:ye,...S==="quick_fix"?{lane:"quick_fix"}:{},...ie()});try{let ye=await _e("apply-impl-preset-global",Ae(z.revision));if(S==="quick_fix"&&ye&&ye.lane!=="quick_fix"){o("\uC11C\uBC84 \uC751\uB2F5\uC5D0 lane\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uD050 \uC2A4\uB0C5\uC0F7\uC744 \uB2E4\uC2DC \uBC1B\uC740 \uB4A4 \uD655\uC778\uD558\uC138\uC694"),Ne();return}if(ye&&ye.applied&&G(ye),r!==null&&ye&&ye.queue_applied===!1){let ft=ye.queue&&typeof ye.queue.revision=="number"?ye.queue.revision:U()?.revision??z.revision;if(ye=await _e("apply-impl-preset-global",Ae(ft)),S==="quick_fix"&&ye&&ye.lane!=="quick_fix"){o("\uC11C\uBC84 \uC751\uB2F5\uC5D0 lane\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uD050 \uC2A4\uB0C5\uC0F7\uC744 \uB2E4\uC2DC \uBC1B\uC740 \uB4A4 \uD655\uC778\uD558\uC138\uC694"),Ne();return}ye&&ye.applied&&G(ye)}ye&&ye.applied?ye.queue_applied===!1&&o("\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uAC12\uC740 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC138\uC694"):ye&&ye.conflict&&o("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328: \uD504\uB9AC\uC14B\uC774 \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4")}catch(ye){o(`\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328: ${ye instanceof Error?ye.message:String(ye)}`)}Ne()}async function Ke(){K=!0,F=!1,Ne();try{let S=await _e("get-worker-system-prompt",{});!S||typeof S!="object"||Array.isArray(S)?F=!0:N=S}catch{F=!0}finally{K=!1,Ne()}}function it(){if(B=!B,B&&!N){Ke();return}Ne()}function ze(){let S=wo({loading:K,error:F});if(S)return S;if(!N)return"";let j=Array.isArray(N.variants)?N.variants:[];return c`<div class="settings-dialog__sp-body">
      ${N.target_base_placeholder?c`<div class="prompt-block__meta">
            \`${N.target_base_placeholder}\`는 디스패치 시점에 해석된
            base로 치환됩니다.
          </div>`:""}
      ${j.map(z=>c`<div class="settings-dialog__sp-variant" data-variant=${z.key}>
            <div class="settings-dialog__sp-cond">${z.condition}</div>
            ${ar(z.label,z.system_prompt)}
          </div>`)}
    </div>`}function Tt(){return c`<section
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
        aria-expanded=${B?"true":"false"}
        @click=${it}
      >
        ${B?"\uC811\uAE30":"\uC804\uBB38 \uBCF4\uAE30"}
      </button>
      ${B?ze():""}
    </section>`}function Dt(S,j,z,Ae,ye,ft,$t,yt){let xt=ye[S]??sn,Nt=Ya(S,z,ye,ve(),ne(),$t,yt),Wt=Nt.options.find(kt=>kt.value===xt),jt=xt===sn?Nt.full_value:Wt?.full_value;return c`<select
        class=${xt===sn?"settings-dialog__unset":""}
        data-key=${S}
        aria-label=${j}
        title=${jt||""}
        ?disabled=${ft===!0||yt!=="quick_fix"&&Nt.disabled}
        .value=${kr(String(xt))}
        @change=${kt=>Ae(S,String(kt.target.value))}
      >
        <option value=${sn} ?selected=${xt===sn}>
          ${Nt.unset_label}
        </option>
        ${Nt.options.map(kt=>c`<option
              value=${kt.value}
              title=${kt.full_value||""}
              ?selected=${kt.value===xt}
            >
              ${kt.label}
            </option>`)}
      </select>
      ${xt===sn?c`<span class="settings-dialog__source-badge">기본</span>`:""}`}function nt(S,j,z,Ae,ye,ft=!1,$t,yt=null,xt=null){return c`<div
      class=${`settings-dialog__row${ft?" settings-dialog__row--off":""}`}
      title=${ft&&xt?xt:""}
    >
      <span class="settings-dialog__row-label">${j}</span>
      <span class="settings-dialog__controls">
        ${Dt(S,j,z,Ae,ye,ft,$t,yt)}
      </span>
    </div>`}function wt(S,j,z,Ae,ye,ft){let $t=Object.hasOwn(a,S),yt=l[S]??s[S]??sn;return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${j}</span>
      <span class="settings-dialog__controls">
        <input
          type="text"
          class=${`settings-dialog__text${$t?" settings-dialog__text--invalid":""}`}
          data-key=${S}
          aria-label=${j}
          aria-invalid=${String($t)}
          placeholder=${z}
          .value=${kr(yt)}
          @input=${xt=>Se(S,String(xt.target.value))}
          @change=${xt=>me(S,String(xt.target.value).trim(),ft)}
        />
        ${yt.length===0?c`<span class="settings-dialog__source-badge">기본</span>`:""}
        <span class="settings-dialog__hint" data-key-hint=${S}
          >${$t?ye:Ae}</span
        >
      </span>
    </div>`}function Mt(S,j,z,Ae){return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${j}</span>
      <span class="settings-dialog__controls">
        <label class="settings-dialog__check">
          <input
            type="checkbox"
            data-key=${S}
            .checked=${s[S]===Fo}
            @change=${ye=>pe(S,ye.target.checked?Fo:sn)}
          />
          ${z}
        </label>
        <span class="settings-dialog__hint" data-key-hint=${S}>${Ae}</span>
      </span>
    </div>`}function Lt(S,j){let z=j?j.active:null;return Tn(z)?`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(${S==="claude"?z.email:xo({...z,alias:null})})`:"\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(\uD655\uC778 \uBD88\uAC00)"}function Bt(S,j,z){let Ae=C[z],ye=Object.hasOwn(m,S)?m[S]:sn,ft=z==="claude"?oa:xo,$t=!!Ae?.accounts.some(yt=>yt.key===ye);return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${j}</span>
      <span class="settings-dialog__controls">
        <select
          aria-label=${j}
          data-account-key=${S}
          @change=${yt=>se(S,String(yt.target.value))}
        >
          <option value=${sn} ?selected=${ye.length===0}>
            ${Lt(z,Ae)}
          </option>
          ${ye.length>0&&!$t?c`<option value=${ye} selected>
                ${ye} (목록에 없음)
              </option>`:""}
          ${Ae?.accounts.map(yt=>c`<option value=${yt.key} ?selected=${yt.key===ye}>
                ${ft(yt)}
              </option>`)||""}
        </select>
        ${Ae?"":c`<span class="settings-dialog__hint"
              >계정 목록을 불러올 수 없습니다</span
            >`}
      </span>
    </div>`}function ce(){let S=p.warnings.join(", ");return p.state==="unusable"?`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12\uC744 \uD574\uC11D\uD560 \uC218 \uC5C6\uC5B4 \uC774 \uB808\uD3EC\uC758 \uB514\uC2A4\uD328\uCE58\uAC00 \uAC70\uBD80\uB429\uB2C8\uB2E4 \u2014 ${S} \xB7 \uACC4\uC815\uC744 \uB2E4\uC2DC \uACE0\uB974\uBA74 \uD574\uC18C\uB429\uB2C8\uB2E4`:p.warnings.length>0?`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12\uC5D0 \uC54C \uC218 \uC5C6\uB294 \uD0A4\uAC00 \uC788\uC2B5\uB2C8\uB2E4 \u2014 ${S}`:null}function we(S,j,z,Ae,ye,ft){return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">
        <i
          class="settings-dialog__stage-dot"
          style=${`background: var(--stage-${j}-on)`}
        ></i>
        ${S}
      </span>
      <span class="settings-dialog__controls">
        ${Dt(z,`${S} \uBAA8\uB378`,Ae,pe,s,!1)}
        ${Dt(ye,`${S} effort`,di,pe,s,!1)}
        ${Dt(ft,`${S} \uC18D\uB3C4`,Mu,pe,s,!1)}
      </span>
    </div>`}function Be(S,j,z,Ae){return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${j}</span>
      <span class="settings-dialog__controls">
        <button
          type="button"
          class=${`settings-dialog__toggle${Ae?" is-on":""}`}
          data-automation=${S}
          aria-pressed=${Ae?"true":"false"}
          aria-label=${j}
          @click=${()=>at(S,!Ae)}
        >
          ${Ae?"\uCF1C\uC9D0":"\uAEBC\uC9D0"}
        </button>
        <span class="settings-dialog__hint">${z}</span>
      </span>
    </div>`}function Je(S,j,z,Ae){return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${j}</span>
      <span class="settings-dialog__controls">
        <span class="settings-dialog__stepper" data-stepper=${S}>
          <button
            type="button"
            aria-label=${`${j} \uAC10\uC18C`}
            @click=${()=>Ae(z-1)}
          >
            −
          </button>
          <span class="settings-dialog__stepper-value">${z}</span>
          <button
            type="button"
            aria-label=${`${j} \uC99D\uAC00`}
            @click=${()=>Ae(z+1)}
          >
            +
          </button>
        </span>
      </span>
    </div>`}function Ze(S,j){return c`<div class="settings-dialog__preset-diff" data-preset-diff>
      <div class="settings-dialog__preset-diff-head">
        ${S.rows.length>0?`\uBCC0\uACBD ${S.rows.length}\uAC1C \xB7 \uC801\uC6A9\uD558\uBA74 \uC544\uB798\uC640 \uAC19\uC774 \uBC14\uB01D\uB2C8\uB2E4`:"\uD604\uC7AC \uC124\uC815\uACFC \uAC19\uC2B5\uB2C8\uB2E4 \u2014 \uC801\uC6A9\uD560 \uBCC0\uACBD\uC774 \uC5C6\uC2B5\uB2C8\uB2E4"}
      </div>
      ${S.rows.map(z=>c`<div
            class="settings-dialog__preset-diff-row"
            data-diff-kind=${z.kind}
          >
            <span class="settings-dialog__preset-diff-label">${z.label}</span>
            <span class="settings-dialog__preset-diff-value"
              >${z.before??"\uAE30\uBCF8"}</span
            >
            <span class="settings-dialog__preset-diff-arrow">→</span>
            <span
              class="settings-dialog__preset-diff-value settings-dialog__preset-diff-after"
              >${z.after??(j==="quick_fix"?"\uAE30\uBCF8(\uD574\uC81C \u2192 \uC77C\uBC18 \uD504\uB85C\uD30C\uC77C)":"\uAE30\uBCF8(\uD574\uC81C)")}</span
            >
          </div>`)}
      ${S.ignored_keys.length>0?c`<div class="settings-dialog__preset-diff-note">
            ${S.ignored_keys.join(", ")}은(는)
            ${j==="quick_fix"?"quick_fix \uB808\uC778":"\uC804\uC5ED"} 적용이 쓰지 않는
            키라 무시됩니다
          </div>`:""}
    </div>`}function pt(){let S=U(),j={};for(let z of[...Dn,...uo])j[z]=Object.prototype.hasOwnProperty.call(X,z)?X[z]:S&&typeof S[z]=="string"?S[z]:null;return j}function gt(){let S=pt(),j={};for(let z of uo)j[z]=S[z]??null;for(let z of["quick_fix_impl_dispatch","quick_fix_impl_runtime","quick_fix_impl_model","quick_fix_impl_effort","quick_fix_impl_speed"])j[z]=s[z]??null;return j}function et(){let S=ne(),j=s.impl_runtime,z=s.impl_model,Ae=H(),ye=U(),ft=pt(),$t=_o(S,re),yt=fo(S,void 0).filter(Ye=>Ye!==wn),xt=Pr(S,void 0,void 0),Nt=pi(S,re,ft.orchestration_model||wn).filter(Ye=>Ye!==wn),Wt=D?(Ae?.presets||[]).find(Ye=>Ye.id===D):null,jt=Wt?Fu(We(),Tn(Wt.settings)?Wt.settings:{}):null,kt={quick_fix_orchestration_model:_o(S,null),quick_fix_orchestration_effort:pi(S,null,null).filter(Ye=>Ye!==wn),quick_fix_orchestration_speed:Kn,quick_fix_impl_dispatch:Bo,quick_fix_impl_runtime:Ef,quick_fix_impl_model:yt,quick_fix_impl_effort:xt,quick_fix_impl_speed:Kn},Xt=Wt?Bu(gt(),Tn(Wt.settings)?Wt.settings:{},kt):null,Zt=O==="quick_fix"?Xt:jt,Ft=Pe(),Ot=Ft?null:"\uC11C\uBC84\uAC00 quick_fix \uB808\uC778\uC744 \uC9C0\uC6D0\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4",Qt={...s,...ft},xe=ye&&typeof ye.slots=="number"?ye.slots:ha+1,E=ye&&typeof ye.serial_lane_count=="number"?ye.serial_lane_count:ha,fe=ve()?.supported===!0,Ie=ce(),ht=Ya("workflow_mode",Uo,s,ve(),S);return c`
      ${u.length>0?c`<div class="settings-dialog__banner" role="alert">
            워크스페이스 기본값을 일부 읽지 못했습니다 —
            ${u.join(", ")}
          </div>`:""}
      ${Ie?c`<div
            class="settings-dialog__banner"
            data-account-warning
            role="alert"
          >
            ${Ie}
          </div>`:""}
      ${fe?"":c`<div
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
                .value=${kr(D)}
                @change=${Ye=>{D=String(Ye.target.value),Ne()}}
              >
                <option value="" ?selected=${D===""}>
                  실행 프리셋…
                </option>
                ${(Ae?.presets||[]).map(Ye=>c`<option
                      value=${Ye.id}
                      ?selected=${Ye.id===D}
                    >
                      ${Ye.name}
                    </option>`)}
              </select>
              <button
                type="button"
                class="settings-dialog__btn settings-dialog__btn--primary op-btn"
                data-preset-apply-global
                data-preset-apply-general
                ?disabled=${!jt||jt.rows.length===0}
                @click=${()=>he("general")}
              >
                일반에 적용
              </button>
              <button
                type="button"
                class="settings-dialog__btn op-btn"
                data-preset-apply-quick-fix
                title=${Ot||""}
                ?disabled=${!Ft||!Xt||Xt.rows.length===0}
                @click=${()=>he("quick_fix")}
              >
                quick_fix 레인에 적용
              </button>
              <input
                type="text"
                class="settings-dialog__preset-name"
                placeholder=${D?"\uC774\uB984 (\uBE44\uC6B0\uBA74 \uC720\uC9C0)":"\uC0C8 \uD504\uB9AC\uC14B \uC774\uB984"}
                aria-label="프리셋 이름"
                .value=${kr(q)}
                @input=${Ye=>{q=String(Ye.target.value)}}
              />
              <button
                type="button"
                class="settings-dialog__btn"
                data-preset-save
                title=${D?"\uD604\uC7AC \uD654\uBA74\uC758 \uC2E4\uD589 \uC124\uC815\uC744 \uC774 \uD504\uB9AC\uC14B\uC5D0 \uC800\uC7A5\uD569\uB2C8\uB2E4 (\uD504\uB9AC\uC14B \u2192 \uC124\uC815 \uBC29\uD5A5\uC774 \uC544\uB2D8)":"\uD604\uC7AC \uD654\uBA74\uC758 \uC2E4\uD589 \uC124\uC815\uC744 \uC0C8 \uD504\uB9AC\uC14B\uC73C\uB85C \uC800\uC7A5\uD569\uB2C8\uB2E4"}
                @click=${Xe}
              >
                ${D?"\uD604\uC7AC \uC124\uC815\uC73C\uB85C \uB36E\uC5B4\uC4F0\uAE30":"\uC0C8 \uD504\uB9AC\uC14B \uC800\uC7A5"}
              </button>
              <button
                type="button"
                class="settings-dialog__btn"
                data-preset-delete
                ?disabled=${D.length===0}
                @click=${$}
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
                aria-pressed=${String(O==="general")}
                @click=${()=>{O="general",Ne()}}
              >
                일반
              </button>
              <button
                type="button"
                data-preset-lane="quick_fix"
                aria-pressed=${String(O==="quick_fix")}
                @click=${()=>{O="quick_fix",Ne()}}
              >
                quick_fix
              </button>
            </div>
            ${Zt?Ze(Zt,O):""}

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">오케스트레이션</div>
              <div class="settings-dialog__row">
                <span class="settings-dialog__row-label">런타임</span>
                <span class="settings-dialog__controls">
                  <select
                    aria-label="런타임"
                    data-key="orchestration_runtime_filter"
                    .value=${kr(re||sn)}
                    @change=${Ye=>{let St=String(Ye.target.value);W(St===sn?null:St)}}
                  >
                    <option value=${sn} ?selected=${!re}>
                      전체
                    </option>
                    <option
                      value="claude"
                      ?selected=${re==="claude"}
                    >
                      claude
                    </option>
                    <option
                      value="codex"
                      ?selected=${re==="codex"}
                    >
                      codex
                    </option>
                  </select>
                  <span class="settings-dialog__hint"
                    >모델 목록을 좁힙니다</span
                  >
                </span>
              </div>
              ${nt("orchestration_model","\uBAA8\uB378",$t,J,ft)}
              ${nt("orchestration_effort","effort",Nt,J,ft)}
              ${nt("orchestration_speed","\uC18D\uB3C4",Kn,J,ft)}
            </div>

            <div class="settings-dialog__group" data-exec-accounts-group>
              <div class="settings-dialog__group-title">실행 계정</div>
              ${Bt("claude_account","Claude","claude")}
              ${Bt("codex_account","Codex","codex")}
              <div class="settings-dialog__row">
                <span class="settings-dialog__row-label">한도 대응</span>
                <span class="settings-dialog__controls">
                  <label class="settings-dialog__check">
                    <input
                      type="checkbox"
                      data-provider-auto-switch
                      .checked=${ye?.provider_auto_switch!==!1}
                      @change=${Ye=>at("provider_auto_switch",Ye.target.checked)}
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
                      @click=${()=>pe("workflow_mode",sn)}
                    >
                      ${ht.unset_label}
                    </button>
                    ${s.workflow_mode?"":c`<span class="settings-dialog__source-badge"
                          >기본</span
                        >`}
                    ${Uo.map(Ye=>c`<button
                          type="button"
                          data-mode=${Ye}
                          aria-pressed=${String(s.workflow_mode===Ye)}
                          @click=${()=>pe("workflow_mode",Ye)}
                        >
                          ${Ye}
                        </button>`)}
                  </span>
                </span>
              </div>
              ${wt("bdui_url","beads-ui \uC8FC\uC18C","http://\uD638\uC2A4\uD2B8:3000","\uC138\uC158\uC774 Worker \uB808\uC778 \uBC30\uCE58\uB97C \uBB3C\uC5B4\uBCFC \uB54C \uC4F0\uB294 \uC8FC\uC18C\uC785\uB2C8\uB2E4","http:// \uB610\uB294 https:// \uB85C \uC2DC\uC791\uD558\uB294 \uC8FC\uC18C\uB9CC \uC800\uC7A5\uB429\uB2C8\uB2E4 (\uACBD\uB85C \uC5C6\uC774)",Pu)}
              ${Mt("base_sync_accept_local_commits","base \uB3D9\uAE30\uD654","\uB85C\uCEEC base \uC0AC\uC6A9\uC790 \uCEE4\uBC0B \uC790\uB3D9 rebase+push","\uAEBC\uB450\uBA74 \uB85C\uCEEC base \uCCB4\uD06C\uC544\uC6C3\uC758 \uC0AC\uC6A9\uC790 \uCEE4\uBC0B\uC740 \uADF8\uB300\uB85C \uB0A8\uC2B5\uB2C8\uB2E4")}
            </div>

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">
                리뷰 게이트
                <span class="settings-dialog__hint">모델 · effort · 속도</span>
              </div>
              ${we("\uC0AC\uC591 \uB9AC\uBDF0","spec","spec_review_model",Wo,"spec_review_effort","spec_review_speed")}
              ${we("\uACC4\uD68D \uB9AC\uBDF0","plan","plan_review_model",ui,"plan_review_effort","plan_review_speed")}
              ${we("\uAD6C\uD604 \uB9AC\uBDF0","impl","impl_review_model",Wo,"impl_review_effort","impl_review_speed")}
            </div>

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">
                구현
                <span class="settings-dialog__hint"
                  >이슈 핀이 있으면 핀이 우선합니다</span
                >
              </div>
              ${nt("impl_runtime","\uC704\uC784 \uB300\uC0C1",ci,pe,s)}
              ${nt("impl_model","\uBAA8\uB378",fo(S,j),pe,s)}
              ${nt("impl_effort","effort",Pr(S,j,z),pe,s)}
              ${nt("impl_speed","\uC18D\uB3C4",Kn,pe,s)}
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
              ${nt("quick_fix_orchestration_model","\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uBAA8\uB378",kt.quick_fix_orchestration_model,J,ft,!Ft,Qt,"quick_fix",Ot)}
              ${nt("quick_fix_orchestration_effort","\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 effort",kt.quick_fix_orchestration_effort,J,ft,!Ft,Qt,"quick_fix",Ot)}
              ${nt("quick_fix_orchestration_speed","\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uC18D\uB3C4",Kn,J,ft,!Ft,Qt,"quick_fix",Ot)}
              ${nt("quick_fix_impl_dispatch","\uC2E4\uD589 \uBC29\uC2DD",Bo,pe,s,!Ft,Qt,"quick_fix",Ot)}
              ${nt("quick_fix_impl_runtime","\uC704\uC784 \uB300\uC0C1",Ef,pe,s,!Ft,Qt,"quick_fix",Ot)}
              ${nt("quick_fix_impl_model","\uBAA8\uB378",yt,pe,s,!Ft,Qt,"quick_fix",Ot)}
              ${nt("quick_fix_impl_effort","effort",xt,pe,s,!Ft,Qt,"quick_fix",Ot)}
              ${nt("quick_fix_impl_speed","\uC18D\uB3C4",Kn,pe,s,!Ft,Qt,"quick_fix",Ot)}
            </div>

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">
                자동화
                <span class="settings-dialog__hint"
                  >이 레포의 워커 큐가 스스로 진행하는 범위</span
                >
              </div>
              ${Be("auto_advance","\uC790\uB3D9\uD654","\uC2AC\uB86F\uC774 \uBE44\uBA74 \uB300\uAE30 \uC55E \uD589\uC774 \uCD9C\uBC1C\uD569\uB2C8\uB2E4",ye?.auto_advance===!0)}
              ${Be("auto_merge","\uBA38\uC9C0","\uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4",ye?.auto_merge===!0)}
              ${Je("slots","\uB3D9\uC2DC \uC2E4\uD589",xe,Ye=>qe(Ye))}
              ${Je("serial-lane-count","\uC9C1\uB82C \uB808\uC778",E,Ye=>dt(Ye))}
            </div>
            ${Tt()}
          `}
    `}function Ne(){Y||ct(et(),e)}return{load(){X={},O="general",l={},a={};let S=[le(),Ce()];return te||S.push(st()),Promise.all(S).then(()=>{})},render:Ne,sessionDraft:()=>({...s}),destroy(){Y=!0,ct(c``,e)}}}function ya(e){return c`<svg
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
  </svg>`}function Tf(){return ya(Lo`<path d="M5.5 3.6 12 8l-6.5 4.4z" />`)}function Cf(){return ya(Lo`<path d="M6 3.8v8.4M10 3.8v8.4" />`)}function Rf(){return ya(Lo`<path
      d="M4.6 5.6v4.8M4.6 8.2h2.2A3.2 3.2 0 0 0 10 5"
    />
    <circle cx="4.6" cy="4" r="1.5" />
    <circle cx="4.6" cy="12" r="1.5" />
    <circle cx="11.4" cy="4" r="1.5" />`)}function Of(){return ya(Lo`<circle cx="8" cy="8" r="2.1" />
    <path
      d="M8 1.9v1.8M8 12.3v1.8M1.9 8h1.8M12.3 8h1.8M3.7 3.7l1.3 1.3M11 11l1.3 1.3M12.3 3.7 11 5M5 11l-1.3 1.3"
    />`)}function If(e){return`${e} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}function Lf(e){let t=(Array.isArray(e)?e:[]).map(l=>l&&l.usage).filter(l=>l&&typeof l=="object"&&"providers"in l);if(t.length>0)return ln(ii(t));let n={};for(let l of Hn)n[l]=0;let r=!1,o=0,i=0,s=0;for(let l of Array.isArray(e)?e:[]){let a=l&&l.usage;if(a&&typeof a=="object"){let u=!1;for(let d of Hn){let p=a[d];typeof p=="number"&&Number.isFinite(p)&&(n[d]+=p,r=!0,u=!0)}if(u){i+=1;let d=a.total_cost_usd;typeof d=="number"&&Number.isFinite(d)&&(o+=d,s+=1)}}}return i>0&&s===i&&(n.total_cost_usd=o),r?er(n):null}function Bn(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function tc(e,t){let n=Bn(e?.counts)?e.counts:null,r=n?n[t]:null;return typeof r=="number"&&Number.isFinite(r)?r:0}function Nv(e,t){if(!Bn(t))return e;let n={...e};for(let[r,o]of Object.entries(t))o!==void 0&&(n[r]=o);return n}function jv(e){if(!Bn(e)||!Bn(e.execution_defaults)||!Bn(e.runner_catalog)||!Bn(e.session_defaults))return null;let t={...e.session_defaults};for(let s of["orchestration_model","orchestration_effort","orchestration_speed"])typeof e[s]=="string"&&e[s].length>0&&(t[s]=e[s]);let n=An({global:t,execution_defaults:e.execution_defaults,runner_catalog:e.runner_catalog}),r=Pn(e.runner_catalog,n.orchestration_model.value??""),o=mo(n,e.runner_catalog),i=Mr(n,r);return o===null&&i===null?null:{orchestration:o,worker:i}}function Df(e,t){let n=t.notify||(V=>ge(V,"error",4e3)),r=document.createElement("div");r.className="mon2-deck__main",e.appendChild(r);let o=document.createElement("div");o.className="mon2-deck__panel",o.hidden=!0;let i=document.createElement("div");i.className="mon2-deck__panel-hd";let s=document.createElement("span");s.className="mon2-deck__panel-title";let l=document.createElement("button");l.type="button",l.className="mon2-deck__panel-close",l.setAttribute("aria-label","\uC2E4\uD589 \uC124\uC815 \uB2EB\uAE30"),l.textContent="\u2715",i.append(s,l);let a=document.createElement("div");a.className="mon2-deck__panel-body",o.append(i,a),e.appendChild(o);let u=null,d=null,p=null,m=new Map;function g(){let V=t.workspacesState?t.workspacesState():[];return Array.isArray(V)?V.filter(le=>Bn(le)):[]}function k(V){return g().find(le=>le.root_dir===V)||null}function T(V){return Nv(k(V),m.get(V))}function C(){for(let V of g()){let le=m.get(V.root_dir);le&&typeof le.revision=="number"&&typeof V.revision=="number"&&V.revision>=le.revision&&m.delete(V.root_dir)}}async function te(V,le,Z){let be=t.transport,Oe=T(le);if(!(!be||!Bn(Oe))){try{let ke=await be(V,{...Z,root_dir:le,expected_revision:Oe.revision});if(Bn(ke?.queue)&&m.set(le,ke.queue),ke&&ke.conflict){let Ce=Bn(ke.queue)&&typeof ke.queue.revision=="number"?ke.queue.revision:T(le)?.revision;ke=await be(V,{...Z,root_dir:le,expected_revision:Ce}),Bn(ke?.queue)&&m.set(le,ke.queue)}}catch(ke){n(`\uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${ke instanceof Error?ke.message:String(ke)}`)}ie()}}function re(V){u!==V&&(u=V,t.onFocusChange?.(u),ie())}function X(V){re(u===V?null:V)}function D(V){if(d===V){q();return}O(),d=V;let le=k(V);s.textContent=`${le?.name||V} \uC2E4\uD589 \uC124\uC815 \xB7 Worker \uD0ED \u2699 \uC2E4\uD589 \uD0ED\uACFC \uAC19\uC740 \uC800\uC7A5\uC18C`,o.hidden=!1,p=ba(a,{root_dir:V,queue:()=>T(V),transport:t.transport,implPresetStore:t.implPresetStore,notify:n,onQueueAdopt:Z=>{m.set(V,Z),ie()}}),p.load(),ie()}function O(){p?.destroy(),p=null}function q(V){O(),d=null,o.hidden=!0,s.textContent="",V!==!0&&ie()}let B=()=>q();l.addEventListener("click",B);function K(V){V.key==="Escape"&&u!==null&&re(null)}document.addEventListener("keydown",K);function F(V,le){let Z=Math.max(le,V,1);return c`<span
      class="mon2-deck__rail"
      role="img"
      aria-label=${`\uC2AC\uB86F ${le}\uAC1C \uC911 ${V}\uAC1C \uC2E4\uD589 \uC911`}
    >
      ${Array.from({length:Z},(be,Oe)=>Oe<V?c`<i class="mon2-deck__slot is-run"></i>`:c`<i class="mon2-deck__slot"></i>`)}
    </span>`}function N(V){let le=V.auto_advance===!0,Z=V.auto_merge===!0;return c`<button
        type="button"
        class=${`mon2-deck__op mon2-deck__auto${le?" is-on":""}`}
        data-act="auto"
        aria-pressed=${le?"true":"false"}
        aria-label=${`${V.name} \uC790\uB3D9\uD654`}
        title=${le?"\uC790\uB3D9\uD654 \uCF1C\uC9D0 \u2014 \uC2AC\uB86F\uC774 \uBE44\uBA74 \uB2E4\uC74C \uD589\uC774 \uCD9C\uBC1C\uD569\uB2C8\uB2E4":"\uC790\uB3D9\uD654 \uAEBC\uC9D0 \u2014 \uB2E4\uC74C \uD589\uC740 \uC218\uB3D9\uC73C\uB85C\uB9CC \uCD9C\uBC1C\uD569\uB2C8\uB2E4"}
      >
        ${le?Cf():Tf()}
      </button>
      <button
        type="button"
        class=${`mon2-deck__op mon2-deck__merge${Z?" is-on":""}`}
        data-act="merge"
        aria-pressed=${Z?"true":"false"}
        aria-label=${`${V.name} \uC790\uB3D9 \uBA38\uC9C0`}
        title=${Z?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0"}
      >
        ${Rf()}
      </button>
      <button
        type="button"
        class=${`mon2-deck__op mon2-deck__gear${d===V.root_dir?" is-on":""}`}
        data-act="gear"
        aria-expanded=${d===V.root_dir?"true":"false"}
        aria-label=${`${V.name} \uC2E4\uD589 \uC124\uC815`}
        title="이 레포의 실행 설정"
      >
        ${Of()}
      </button>`}function Y(V){let le=jv(V);return le?c`<div class="mon2-deck__chips">
      ${le.orchestration?c`<span class="mon2-deck__chip" title=${le.orchestration.title}
            >오케 ${le.orchestration.text}</span
          >`:""}
      ${le.worker?c`<span class="mon2-deck__chip" title=${le.worker.title}
            >워커 ${le.worker.text}</span
          >`:""}
    </div>`:""}function U(V){let le=[];for(let[Z,be]of[["queue","\uB300\uAE30"],["pr_wait","PR"],["session_active","\uC138\uC158"]]){let Oe=tc(V,Z);Oe>0&&le.push(`${be} ${Oe}`)}return le.join(" \xB7 ")}function ne(V){let le=tc(V,"running"),Z=typeof V.slots=="number"?V.slots:1;return c`<div
      class=${`mon2-deck__tile${u===V.root_dir?" is-focus":""}`}
      role="button"
      tabindex="0"
      data-root-dir=${V.root_dir}
      aria-pressed=${u===V.root_dir?"true":"false"}
      title="클릭하면 이 레포만 선명하게 봅니다 (Esc로 해제)"
    >
      <div class="mon2-deck__tile-hd">
        <span class="mon2-deck__name" title=${V.root_dir}>${V.name}</span>
        <span
          class="mon2-deck__load"
          title=${`\uC2AC\uB86F ${Z}\uAC1C \uC911 ${le}\uAC1C \uC2E4\uD589 \uC911`}
        >
          <span class="mon2-deck__load-n">${le}/${Z}</span>
          ${F(le,Z)}
        </span>
        <button
          type="button"
          class="mon2-deck__worker"
          data-act="worker"
          aria-label=${`${V.name} Worker \uD0ED\uC73C\uB85C \uC774\uB3D9`}
          title="이 레포의 Worker 탭으로 이동"
        >
          ↗
        </button>
      </div>
      <div class="mon2-deck__tile-ft">
        <div class="mon2-deck__ops">${N(V)}</div>
        <span class="mon2-deck__counts">${U(V)}</span>
        ${Y(V)}
      </div>
    </div>`}function ve(V){let le=t.doneItems?t.doneItems():[],Z=t.rangeLabel?t.rangeLabel():"",be=Lf(Array.isArray(le)?le:[]),Oe=ke=>V.reduce((Ce,ot)=>Ce+tc(ot,ke),0);return c`<div class="mon2-deck__bar">
      <span
        class="mon2-deck__total-counts"
        title=${`visible \uB808\uD3EC ${V.length}\uACF3\uC758 \uD569\uACC4\uC785\uB2C8\uB2E4 \u2014 \uC2E4\uD589\xB7\uB300\uAE30\xB7PR\uC740 \uC9C0\uAE08, \uC644\uB8CC\uB294 ${Z}`}
        >실행 ${Oe("running")} · 대기 ${Oe("queue")} · PR
        ${Oe("pr_wait")}${Oe("session_active")>0?` \xB7 \uC138\uC158 ${Oe("session_active")}`:""}
        · ${Z} 완료
        ${Array.isArray(le)?le.length:0}</span
      >
      ${be===null?"":c`<span class="mon2-deck__total-tokens">
            ${typeof be=="string"?c`<span
                  class="mon2-deck__tok"
                  title=${If(Z)}
                  >${be}</span
                >`:be.map(ke=>c`<span
                      class="mon2-deck__tok"
                      data-provider=${ke.provider}
                      title=${ke.tooltip}
                      >${ke.label}</span
                    >`)}
          </span>`}
    </div>`}function Pe(){let V=g();return V.length===0?"":c`${ve(V)}
      <div class="mon2-deck__strip">
        ${V.map(le=>ne(le))}
      </div>`}function H(){u!==null&&!k(u)&&(u=null,t.onFocusChange?.(null))}function ie(){C(),H(),d!==null&&!k(d)&&q(!0),ct(Pe(),r),p?.render()}function _e(V){let le=V.target;if(!le||typeof le.closest!="function")return;let Z=le.closest("[data-root-dir]");if(!Z)return;let be=Z.getAttribute("data-root-dir")||"",Oe=le.closest("[data-act]")?.getAttribute("data-act");if(Oe==="worker"){t.gotoWorkerTab?.(be);return}if(Oe==="auto"){te("worker-automation-toggle",be,{on:T(be)?.auto_advance!==!0});return}if(Oe==="merge"){te("worker-merge-auto-toggle",be,{on:T(be)?.auto_merge!==!0});return}if(Oe==="gear"){D(be);return}X(be)}function Te(V){if(V.key!=="Enter"&&V.key!==" ")return;let le=V.target;if(!le||typeof le.closest!="function")return;let Z=le.closest('[data-root-dir][role="button"]');!Z||Z!==le||(V.preventDefault(),X(Z.getAttribute("data-root-dir")||""))}return r.addEventListener("click",_e),r.addEventListener("keydown",Te),{render:ie,focusRoot:()=>u,panelRoot:()=>d,destroy(){document.removeEventListener("keydown",K),r.removeEventListener("click",_e),r.removeEventListener("keydown",Te),l.removeEventListener("click",B),O(),ct(c``,r),e.replaceChildren()}}}var Fv=1e4,Nf="bdui.monitor.done-range",jf="bdui.monitor.running_sort",Ff="bdui.monitor.candidate_sort",Bf="beads-ui.monitor.candidate-filter",Uf="beads-ui.monitor.sections";function Bv(){try{let e=window.localStorage.getItem(Bf);if(!e)return{...yo};let t=JSON.parse(e);return!t||typeof t!="object"?{...yo}:{show_blocked:typeof t.show_blocked=="boolean"?t.show_blocked:yo.show_blocked,readiness:os.some(n=>n.value===t.readiness)?t.readiness:"all"}}catch{return{...yo}}}function Pf(e){try{window.localStorage.setItem(Bf,JSON.stringify({show_blocked:e.show_blocked,readiness:e.readiness}))}catch{}}function Uv(){try{let e=window.localStorage.getItem(Ff);return rs.some(t=>t.value===e)?e:"repo_spec"}catch{return"repo_spec"}}function Wv(e){try{window.localStorage.setItem(Ff,e)}catch{}}function zv(){try{let e=window.localStorage.getItem(Uf);if(!e)return{};let t=JSON.parse(e);return t&&typeof t=="object"?t:{}}catch{return{}}}function Hv(e){try{window.localStorage.setItem(Uf,JSON.stringify(e))}catch{}}function Kv(){try{let e=window.localStorage.getItem(Nf);return e===null?"today":Wn(e)}catch{return"today"}}function Gv(e){try{window.localStorage.setItem(Nf,e)}catch{}}function Yv(){try{return window.localStorage.getItem(jf)==="repo"?"repo":"started"}catch{return"started"}}function Vv(e){try{window.localStorage.setItem(jf,e)}catch{}}var Wf="tab:monitor:pipeline",Qv=1e3,Mf=[{lane:"runnable",pane:"candidate",title:"\uD6C4\uBCF4",empty:"\uC2E4\uD589 \uC790\uACA9\uC744 \uAC16\uCD98 \uC774\uC288 \uC5C6\uC74C"},{lane:"queue",pane:"queue",title:"\uB300\uAE30",empty:"\uD45C\uC2DC\uD560 \uB808\uD3EC \uC5C6\uC74C"},{lane:"running",pane:"running",title:"\uC2E4\uD589 \uC911",empty:"\uC2E4\uD589 \uC911 \uC5C6\uC74C"},{lane:"pr_wait",pane:"pr_wait",title:"PR \uB300\uAE30",empty:"PR \uC5C6\uC74C"},{lane:"done",pane:"done",title:"\uC644\uB8CC",empty:"\uC644\uB8CC \uAE30\uB85D \uC5C6\uC74C"}],Xv=["queue","runnable","done"],qf="\u2460\u2461\u2462\u2463\u2464\u2465\u2466\u2467\u2468\u2469\u246A\u246B\u246C\u246D\u246E\u246F\u2470\u2471\u2472\u2473";function Zv(e){return e>=1&&e<=qf.length?qf[e-1]:`(${e})`}function zf(e,t){let n=Ut("views:monitor"),r=t.gotoIssue,o=t.pipelineStore,i=t.transport,s=t.getWorkspacePath,l=t.openDoc,a=t.switchWorkspace,u=t.router,d=t.now||(()=>Date.now()),p=t.confirm||(f=>typeof globalThis.confirm!="function"||globalThis.confirm(f)),m=Kv(),g=Yv(),k=Bv(),T=Uv(),C=zv(),te=la("beads-ui.monitor.lane-collapsed"),re=!1,X=null,D=null,O=null,q=null,B=null,K=null,F=lo(()=>z()),N=null,Y=null,U=null,ne=null;function ve(f){return ne===null&&(ne=pe()),Gd(f,ne)}function Pe(f,h){H(),!(h<=0)&&(Y={lane_id:f,corrected:h},U=setTimeout(()=>{U=null,Y=null,z()},Fv))}function H(){U!==null&&(clearTimeout(U),U=null),Y=null}function ie(){let f=Vr.find(h=>h.value===m);return f?f.label:""}let _e=document.createElement("div");_e.className="mon",e.appendChild(_e);let Te=document.createElement("div");Te.className="worker-drawer-overlay",Te.hidden=!0;let V=document.createElement("div");V.className="worker-drawer-overlay__backdrop";let le=document.createElement("div");le.className="worker-drawer-host mon2-drawer",Te.append(V,le),e.appendChild(Te);let Z=yr(null,null),be=new Map,Oe=new Map,ke=new Set,Ce=null,ot=null,st=null,Q=$o(le,{transport:i,sessionLogStore:t.sessionLogStore,onClose:()=>{D=null,Te.hidden=!0,z()}}),oe=ua({transport:i,console_el:_e,getLanes:()=>Z,getWorkspaces:()=>o&&o.get?o.get():null,getCrossLanes:jt,reproject:f=>({lanes:j(f),raw_lanes:f}),onCorrection:Pe,showToast:ge,requestRender:()=>z(),adoptQueue:(f,h)=>{Oe.set(f,h)},onDragBegin:()=>{O=null},candidate_drop:!0}),{applyDrop:se,dropModel:pe,runPlanned:Se,sendQueueCas:me}=oe;async function Re(f,h,I,M,_=!0){if(!i||!I)return null;let b=await i(f,{...h,root_dir:I,expected_revision:M});if(b&&b.conflict&&_){b.queue&&Oe.set(I,b.queue);let ee=b.queue&&typeof b.queue.revision=="number"?b.queue.revision:M;b=await i(f,{...h,root_dir:I,expected_revision:ee})}return b&&b.queue&&I&&Oe.set(I,b.queue),b}function je(f){let h=Oe.get(f);if(h)return h;let I=o&&o.get?o.get():null;return(Array.isArray(I)?I:[]).find(M=>M?.root_dir===f)||{}}function Qe(f,h){return je(f)?.merge_queue?.find(M=>M.bead_id===h)?.continuation_action}async function Ue(f,h,I,M){let _=await Re(f,h,I,M),b=Oe.get(I)?.revision??_?.queue?.revision??M;return _r(_,(ee,de)=>Re(f,{...h,continuation:ee,decision_token:de},I,b,!1),{refresh:ee=>Re(f,h,I,ee?.queue?.revision??Oe.get(I)?.revision??b,!1)})}async function J(f,h,I,M){let _=await _r({continuation_mismatch:M},(ee,de)=>Re("worker-merge-queue-add",{bead_id:h,continuation:ee,decision_token:de},f,I,!1)),b=_?.queue?.merge_queue?.find(ee=>ee.bead_id===h)?.continuation_action;_?.applied!==!0&&b?.continuation===null&&b.mismatch&&await J(f,h,_.queue.revision,b.mismatch)}async function W(f,h,I){let M=await Re("worker-discard",f,h,I);if(M&&M.discarded===!0){ge(Ai(M),"success",5e3);return}if(M&&M.reason){ge(`\uD3D0\uAE30 \uC2E4\uD328: ${M.reason}`,"error");return}if(M&&M.accepted&&M.pending==="merged_revert"){ge("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success");return}if(M&&M.accepted){ge(`\uD3D0\uAE30 \uC9C4\uD589: ${M.phase||"\uBC31\uC5C5 \uC911"}`,"success");return}M&&!M.conflict&&ge("\uD3D0\uAE30 \uAC70\uBD80: unknown","error")}async function qe(f,h,I,M){let _=await Re("worker-discard-abandon",f,h,I);if(_&&_.abandoned===!0){ge(xi(M),"success",5e3);return}if(_&&_.reason){ge(`\uD3D0\uAE30 \uD3EC\uAE30 \uAC70\uBD80: ${_.reason}`,"error");return}_&&!_.conflict&&ge("\uD3D0\uAE30 \uD3EC\uAE30 \uAC70\uBD80: unknown","error")}async function dt(f,h,I){return!i||!I?null:await i(f,{...h,root_dir:I})}async function at(f,h,I){if(!ke.has(f)){ke.add(f),z();try{let M=await Re("worker-resolve-in-session",{bead_id:f},h,I,!1);M?.session==="already_running"?ge(`\uC774\uBBF8 \uC5F4\uB824 \uC788\uC2B5\uB2C8\uB2E4 \xB7 ${M.tmux_window||"?"}`,"error"):M?.launched!==!0?ge(`\uC138\uC158 \uAE30\uB3D9 \uC2E4\uD328: ${M?.reason||"unknown"}`,"error"):M.mode!=="fork"&&ge(`\uC0C8 \uC138\uC158\uC73C\uB85C \uC2DC\uC791 (${M.fallback_reason||"unknown"})`,"success")}finally{ke.delete(f),z()}}}async function We(){let f=new Map;for(let h of Z.pr_wait)f.has(h.root_dir)||f.set(h.root_dir,h.expected_revision);for(let[h,I]of f)await Re("worker-merge-queue-add-all",{},h,I)}function Xe(f){let h=C[f];return!!(h&&h.runnable===!0)}function $(f){let h={...C[f]||{}};h.runnable=!h.runnable,C={...C,[f]:h},Hv(C),z()}function G(f){te.toggle(f),z()}function he(f){te.toggleArea(f),z()}function Ke(f){let h=f.dependency_chips||null,I=f.overlap_chips||[],M=f.scope_state==="missing",_=f.armed_lane_chip;return!h&&I.length===0&&!M&&!_?null:{...h||{},...I.length>0?{overlaps:I}:{},...M?{scope_missing:!0}:{},..._?{armed_lane:_}:{}}}function it(f){return Ii(f,h=>F.isOpen({bead_id:f.id,chip_key:h}))}function ze(f){let h=Ke(f),I=it(f);return h||I?{...f,...h?{dependency_chips:h}:{},...I?{chip_popover:I}:{}}:f}function Tt(f){let h=Xe(f.root_dir);return c`<header class="mon2-sec__hd">
      <button
        type="button"
        class="mon2-sec__toggle"
        data-root-dir=${f.root_dir}
        data-section="runnable"
        aria-expanded=${h?"false":"true"}
        aria-label=${`${f.name} \uC139\uC158 ${h?"\uD3BC\uCE58\uAE30":"\uC811\uAE30"}`}
      >
        ${h?"\u25B8":"\u25BE"}
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
    </header>`}function Dt(f,h){return c`<div
      class="mon2-item"
      data-bead-id=${f.id}
      data-drag-kind="candidate"
      data-root-dir=${f.root_dir}
    >
      ${h}
    </div>`}function nt(f){if(O!==f.id)return null;let h=Z.queue_groups.find(b=>b.root_dir===f.root_dir),I=f.place_lanes||[],M=Z.cross_lanes_revision!==null,_=[{id:"parallel",label:"\uBCD1\uB82C",count:f.place_index??0}];for(let b of Z.chain_lanes)_.push({id:`lane:${b.lane_id}`,label:`\uC5F0\uACB0 ${b.number} (${b.draft?"draft":"\uD655\uC815"}) \uB05D\uC5D0`,count:b.rows.length,group:"\uC5F0\uACB0 \uB808\uC778",disabled:!M});_.push({id:"new-lane",label:"+ \uC0C8 \uC5F0\uACB0 \uB808\uC778",group:"\uC5F0\uACB0 \uB808\uC778",disabled:!M,title:M?"\uC774 \uC774\uC288\uB9CC \uB4E0 draft \uB808\uC778\uC744 \uB9CC\uB4ED\uB2C8\uB2E4":"\uC5F0\uACB0 \uB808\uC778 \uC800\uC7A5\uC18C\uB97C \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"});for(let b of I)_.push({id:`serial:${b.id}`,label:`\uC9C1\uB82C ${Number(b.id.slice(1))}`,count:b.length,group:`${h?h.name:""} \uC9C1\uB82C`});return{bead_id:f.id,lanes:_}}function wt(f){return Dt(f,c`${cl(ze(f),nt(f),{exec_chips_mode:"pinned_only",onOpenDoc:l?(h,I)=>l(I,f.root_dir):void 0})}`)}function Mt(){return Z.runnable_flat?c`<div class="mon2-flat" data-drop="candidate">
        ${Z.runnable.map(f=>wt(f))}
      </div>`:c`${Z.runnable_sections.map(f=>{let h=Xe(f.root_dir);return c`<section
        class="mon2-sec${h?" is-collapsed":""}"
        data-root-dir=${f.root_dir}
        data-section="runnable"
      >
        ${Tt({root_dir:f.root_dir,name:f.name,count:f.items.length})}
        ${h?"":c`<div
              class="mon2-sec__body"
              data-lane="candidate"
              data-drop="candidate"
            >
              ${f.items.map(I=>wt(I))}
            </div>`}
      </section>`})}`}function Lt(f,h){return c`<div
      class="mon2-item"
      data-bead-id=${f.id}
      data-drag-kind="parallel"
      data-root-dir=${f.root_dir}
      data-row-index=${h}
      data-queue-index=${String(f.queue_index??0)}
    >
      ${Mn(ze(f),{actions:bo(f,{nudgeable:!0})})}
    </div>`}function Bt(f,h,I,M){return c`<div
      class="mon2-crow${h.fixed?" mon2-crow--fixed":""}"
      draggable=${h.draggable?"true":"false"}
      data-bead-id=${h.id}
      data-drag-kind="chain"
      data-root-dir=${h.root_dir}
      data-lane-id=${f.lane_id}
      data-row-index=${I}
      data-queue-index=${typeof h.queue_index=="number"?String(h.queue_index):""}
    >
      <span class="mon2-crow__seq" aria-hidden="true"
        >${Zv(h.seq)}</span
      >
      ${h.workspace_name?c`<span class="worker-mini__repo" title=${h.root_dir}
            >${h.workspace_name}</span
          >`:""}
      <span class="worker-mini__id" title="클릭하면 ID 복사">${h.id}</span>
      <span class="mon2-crow__title">${h.title}</span>
      ${h.mismatch?c`<span
            class="mon2-crow__mismatch"
            title="레인 순서가 주장하는 선행이 bd 의존에 없습니다 — 재적용으로 복구합니다"
            >⚠ 의존 없음</span
          >`:""}
      ${M.includes(h.id)?c`<span
            class="mon2-crow__mismatch"
            title="이미 실행된 뒤 의존이 바뀌었습니다 — 이 행은 움직일 수 없어 교정하지 않습니다"
            >⚠ 의존 순서와 다름</span
          >`:""}
      <span class="mon2-crow__where" title=${h.location_title}
        >${h.location_label}</span
      >
      <button
        type="button"
        class="mon2-crow__detach"
        data-bead-id=${h.id}
        title="연결에서 빼고 앞뒤를 이어 붙입니다"
        aria-label="연결에서 빼기"
      >
        ✕
      </button>
    </div>`}function ce(f){let h=Z.cross_lanes_revision!==null,I=ve(f.lane_id),M=I?.held===!0,_=I?.cycle===!0,b=I?I.mismatched:[],ee=Y&&Y.lane_id===f.lane_id?Y.corrected:0;return c`<div class="mon2-clane" data-lane-id=${f.lane_id}>
      <header class="mon2-clane__hd">
        <span class="mon2-clane__name">${f.label}</span>
        <span class="mon2-clane__count">${f.rows.length}</span>
        <span class="mon2-clane__badge mon2-clane__badge--${f.state}"
          >${f.badge}</span
        >
        ${ee>0?c`<span
              class="mon2-clane__corrected"
              title="기존 blocks 의존이 드롭 순서를 이깁니다 — 그 순서로 다시 놓았습니다"
              >의존에 맞춰 ${ee}건 자동 교정</span
            >`:""}
        ${_?c`<span
              class="mon2-clane__cycle"
              title="멤버들의 blocks 의존이 순환합니다 — 어느 순서도 의존을 만족시키지 못합니다"
              >⛔ 의존 사이클 — 자동 교정 불가</span
            >`:""}
        ${M?c`<span
              class="mon2-clane__hold"
              title="멤버 한 명의 의존 자료가 이 스냅샷에 아직 없습니다 — 다음 스냅샷이 채우면 교정합니다"
              >${Fi}</span
            >`:""}
        ${f.draft?c`<button
              type="button"
              class="mon2-clane__confirm"
              data-lane-id=${f.lane_id}
              ?disabled=${!h||!f.can_confirm||M}
              title=${M?Fi:f.can_confirm?"\uC778\uC811 \uC758\uC874\uC744 \uAC78\uACE0 \uBBF8\uC801\uC7AC \uBA64\uBC84\uB97C \uAC01\uC790 \uB808\uD3EC \uBCD1\uB82C \uD050 \uB05D\uC5D0 \uC62C\uB9BD\uB2C8\uB2E4":"\uBA64\uBC84\uAC00 2\uAC1C \uC774\uC0C1\uC774\uC5B4\uC57C \uD655\uC815\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4"}
            >
              확정
            </button>`:""}
        ${f.run_label!==null?c`<button
              type="button"
              class="mon2-clane__run"
              data-lane-id=${f.lane_id}
              ?disabled=${!h}
              title="이 레인 멤버만 발차합니다 — 레포 자동 진행은 켜지 않습니다"
            >
              ${f.run_label}
            </button>`:""}
        ${f.state==="confirmed"&&f.has_mismatch?c`<button
              type="button"
              class="mon2-clane__reapply"
              data-lane-id=${f.lane_id}
              ?disabled=${!h}
              title="빠진 인접 의존을 다시 걸고 미적재 멤버를 다시 올립니다"
            >
              재적용
            </button>`:""}
        ${f.can_stop?c`<button
              type="button"
              class="mon2-clane__stop"
              data-lane-id=${f.lane_id}
              ?disabled=${!h}
              title="남은 멤버의 발차만 멈춥니다 — 도는 세션과 머지 큐 항목은 끝까지 갑니다"
            >
              ⏸ 정지
            </button>`:""}
        <button
          type="button"
          class="mon2-clane__remove"
          data-lane-id=${f.lane_id}
          ?disabled=${!h}
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
            </div>`:f.rows.map((de,Fe)=>Bt(f,de,Fe,b))}
      </div>
    </div>`}function we(f,h,I){return c`<div
      class="mon2-item"
      data-bead-id=${h.id}
      data-drag-kind="repo-serial"
      data-root-dir=${h.root_dir}
      data-lane-id=${f.id}
      data-row-index=${I}
      data-queue-index=${String(h.queue_index??0)}
    >
      ${Mn(ze(h),{actions:bo(h)})}
    </div>`}function Be(f){if(f.length===0)return"";let h=f.length-1;return`${f[0].id} \uC810\uC720${h>0?` +${h}`:""}`}function Je(f){return c`<div
      class="mon2-item mon2-item--ghost"
      data-bead-id=${f.id}
    >
      ${Mn({id:f.id,title:f.title,lane:"running",draggable:!1,ghost:!0,badges:[f.badge]})}
    </div>`}function Ze(f,h){let I=h.occupants,M=h.cross_wait_peers||[];return{id:h.id,pane_id:"",title:`${f.name} \xB7 \uC9C1\uB82C ${h.index+1}`,rows:[...I.map(_=>Je(_)),...h.items.map((_,b)=>we(h,_,b))],count:h.items.length,empty:h.empty===!0,...I.length>0?{badge:c`<span
              class="mon2-lane__occupant"
              title=${I.map(_=>`${_.id} \u2014 ${_.badge}`).join(`
`)}
              >${Be(I)}</span
            >`,held:!0}:{},cycle:h.cycle,header_control:c`<button
        type="button"
        class="mon2-sec__worker"
        data-root-dir=${f.root_dir}
        title="이 레포의 Worker 탭으로 이동"
      >
        Worker ↗
      </button>`,...M.length>0?{after:c`${M.map(_=>c`<div class="mon2-lane__cross-wait">
                  ⚠ 상호 정지 — ${_.workspace_name}·${_.lane}과 교차 대기
                </div>`)}`}:{}}}function pt(){let f=Z.cross_lanes_revision!==null,h=Z.chain_lanes.some(I=>I.draft&&I.rows.length===0);return Li({parallel:{rows:Z.parallel_rows.map((I,M)=>Lt(I,M)),count:Z.parallel_rows.length,collapsed:te.isAreaCollapsed("parallel"),drop:{drop:"parallel"}},serial:{lanes:Z.queue_groups.flatMap(I=>I.sublanes.serial.map(M=>({...Ze(I,M),drop:{drop:"repo-serial",root_dir:I.root_dir,lane_id:M.id,lane_length:String(M.raw_length)}}))),collapsed:te.isAreaCollapsed("serial"),extra_panes:Z.chain_lanes.map(I=>ce(I)),header_control:c`<button
          type="button"
          class="mon2-newlane"
          ?disabled=${h||!f}
          title=${f?h?"\uBE48 \uC5F0\uACB0 \uB808\uC778\uC774 \uC774\uBBF8 \uC788\uC2B5\uB2C8\uB2E4":"\uBE48 \uC5F0\uACB0 \uB808\uC778\uC744 \uD558\uB098 \uB9CC\uB4ED\uB2C8\uB2E4":"\uC5F0\uACB0 \uB808\uC778 \uC800\uC7A5\uC18C\uB97C \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"}
        >
          + 연결 레인
        </button>`,...Z.cross_lanes_unreadable?{notice:c`<div class="mon2-clane__unreadable">
                연결 레인 저장소를 읽을 수 없음
              </div>`}:{}}})}function gt(f){return c`<div class="worker-rungrid">
      ${Z.running.length===0?c`<div class="worker-rungrid__empty">실행 세션 없음</div>`:Z.running.map(h=>ec({bead_id:h.id,attempt_id:h.attempt_id||"",title:h.title,runner:h.runner??null,model:h.model??null,effort:h.effort??null,speed:h.speed??null,started_at:h.started_at??null,kind:h.kind,...h.kind==="session"?{updated_at:h.updated_at,session_refs:h.session_refs||[]}:{},workflow:h.workflow||null,resumed_from:h.resumed_from??null,continuation_mode:h.continuation_mode??null,paused:h.run_state==="paused",failed:h.run_state==="failed",parked:h.run_state==="parked",retry_wait:h.run_state==="retry_wait",waiting:h.run_state==="waiting",wait:h.wait||null,provider_hold:h.run_state==="provider_hold",hold:h.hold?{...h.hold,open:B===h.attempt_id}:null,retry:h.retry||null,status:h.status,status_label:h.run_state==="failed"?"\uC2E4\uD328":h.run_state==="parked"?"\uC138\uC158 \uB300\uAE30":h.run_state==="retry_wait"?"\uC7AC\uC2DC\uB3C4 \uB300\uAE30":h.run_state==="waiting"?"\uC120\uD589 \uB300\uAE30":h.run_state==="provider_hold"?"\uACF5\uAE09\uC790 \uBCF4\uB958":void 0,can_pause:h.can_pause!==!1,exec_chips:h.exec_chips||null,usage:h.usage||null,chip_popover:it(h),discard:h.discard,failure:h.failure?{...h.failure,open:q===h.attempt_id}:null,...So(h.id,{discard:h.discard,parked:h.run_state==="parked"},ke.has(h.id))},f,D,{monitor:{repo:h.workspace_name,root_dir:h.root_dir,serial_lane_id:h.serial_lane_id,cross_lane_chip:h.cross_lane_chip||null,last_activity:h.last_activity||null,legs:h.legs||[],dependency_chips:Ke(h)}}))}
    </div>`}function et(f){let h={runnable:Z.runnable,queue:Z.queue,running:Z.running,pr_wait:Z.pr_wait,done:Z.done},I=M=>{let _=h[M.lane],b=M.lane==="runnable"?Z.runnable_flat?_.length>0?Mt():void 0:Z.runnable_sections.length>0?Mt():void 0:M.lane==="queue"?Z.queue_groups.length>0||Z.chain_lanes.length>0||Z.parallel_rows.length>0||Z.cross_lanes_unreadable?pt():void 0:M.lane==="running"?gt(f):_.length>0?c`${_.map(ee=>Mn(ze(ee)))}`:void 0;return Gn({id:`monitor-${M.lane}`,lane:M.pane,title:M.title,items:_,count:_.length,src:M.lane==="runnable",empty:M.empty,body:b,live:M.lane==="running"&&_.length>0,collapsible:!0,collapsed:te.isCollapsed(M.pane),controls:M.lane==="runnable"?Ne():void 0,header_control:S(M.lane,_.length)})};if(re){let M=Xv.map(_=>Mf.find(b=>b.lane===_)).filter(_=>_!==void 0);return c`<div class="mon2-deck"></div>
        <div class="worker-lanes-host">
          <div class="worker-lanes worker-lanes--mobile mon2-lanes">
            ${Di({live:Z.running.length>0,running_body:Z.running.length>0?gt(f):"",pr_wait_rows:Z.pr_wait.map(_=>Mn(ze(_))),count:Z.running.length+Z.pr_wait.length})}
            ${M.map(_=>I(_))}
          </div>
        </div>
        ${Ao(K?.draft||null,K?je(K.root_dir):{})}`}return c`<div class="mon2-deck"></div>
      <div class="worker-lanes-host">
        <div class="worker-lanes mon2-lanes">
          ${Mf.map(M=>I(M))}
        </div>
      </div>
      ${Ao(K?.draft||null,K?je(K.root_dir):{})}`}function Ne(){return c`<div class="worker-filter">
      <label class="worker-filter__tgl" title="blocked 이슈 표시">
        <input
          type="checkbox"
          class="mon-filter__blocked"
          .checked=${k.show_blocked}
        />
        🔒
        blocked${Z.runnable_hidden.blocked>0?` ${Z.runnable_hidden.blocked}`:""}
      </label>
      <div
        class="worker-filter__readiness"
        role="group"
        aria-label="준비도 필터"
      >
        ${os.map(f=>c`<button
              type="button"
              class="mon-filter__readiness worker-filter__chip${k.readiness===f.value?" is-active":""}"
              data-readiness=${f.value}
              aria-pressed=${k.readiness===f.value?"true":"false"}
            >
              ${f.label}
            </button>`)}
        ${Z.runnable_hidden.readiness>0?c`<span class="worker-filter__hidden"
              >숨김 ${Z.runnable_hidden.readiness}</span
            >`:""}
      </div>
    </div>`}function S(f,h){return f==="runnable"?c`<select
        class="mon-candidate-sort worker-sort"
        aria-label="후보 정렬"
        title="후보 정렬"
        .value=${T}
      >
        ${rs.map(I=>c`<option
              value=${I.value}
              ?selected=${T===I.value}
            >
              ${I.label}
            </option>`)}
      </select>`:f==="running"?c`<select
        class="mon-running-sort worker-sort"
        aria-label="실행중 정렬"
        title="실행중 정렬"
        .value=${g}
      >
        <option value="started" ?selected=${g==="started"}>
          시작순
        </option>
        <option value="repo" ?selected=${g==="repo"}>
          레포순
        </option>
      </select>`:f==="pr_wait"&&h>0?c`<button
        type="button"
        class="mon-lane-op mon-merge-all"
        title="자격이 생기는 PR을 각 레포의 머지 큐에 한 번에 넣습니다"
      >
        일괄 머지
      </button>`:f==="done"?c`<select
        class="mon-done-range worker-sort"
        aria-label="완료 기간"
        title="완료 기간"
        .value=${m}
      >
        ${Vr.map(I=>c`<option value=${I.value} ?selected=${m===I.value}>
              ${I.label}
            </option>`)}
      </select>`:""}function j(f){let h=o&&o.get?o.get():null,I=o&&o.getWorkspacesState?o.getWorkspacesState():[],M=f===void 0?o&&o.crossLanes?o.crossLanes():void 0:f,_={done_since:Lr(m,d()),running_sort:g,candidate_filter:k,candidate_sort:T};return M!==void 0&&(_.cross_lanes=M),yr(h,I,_)}function z(){let f=d();Z=j(),ne=null,be=new Map;for(let h of[...Z.runnable,...Z.queue,...Z.running,...Z.pr_wait,...Z.done])!h.non_occupying&&!be.has(h.id)&&be.set(h.id,h);ct(et(f),_e),_a(_e),ye()?.render(),Ae(),ft()}function Ae(){let f=new Map;for(let h of Z.queue_groups)f.set(h.root_dir,h.auto_advance);for(let h of Array.from(_e.querySelectorAll(".worker-wait__area--parallel .worker-mini__repo"))){let I=h.closest(".mon2-item")?.getAttribute("data-root-dir")||"",M=f.get(I);typeof M=="boolean"&&h.setAttribute("title",`${h.textContent||""} \xB7 ${M?"\uC790\uB3D9\uD654 \uCF1C\uC9D0":"\uC790\uB3D9\uD654 \uAEBC\uC9D0"}`)}}function ye(){if(st)return st;let f=_e.querySelector(".mon2-deck");return f?(st=Df(f,{workspacesState:()=>o&&o.getWorkspacesState?o.getWorkspacesState():[],doneItems:()=>Z.done,rangeLabel:ie,transport:i,implPresetStore:t.execPresetStore,gotoWorkerTab:yt,onFocusChange:h=>{N=h,ft()}}),st):null}function ft(){_e.classList.toggle("has-focus",N!==null);for(let f of Array.from(_e.querySelectorAll(".mon2-sec[data-root-dir]")))f.classList.toggle("is-focus",N!==null&&f.getAttribute("data-root-dir")===N);for(let f of Array.from(_e.querySelectorAll(".mon2-item[data-bead-id], .rtile[data-bead-id], .worker-mini[data-bead-id], .worker-card[data-bead-id]"))){let h=be.get(f.getAttribute("data-bead-id")||"");f.classList.toggle("is-focus",N!==null&&!!h&&h.root_dir===N)}for(let f of Array.from(_e.querySelectorAll(".mon2-crow[data-root-dir]")))f.classList.toggle("is-focus",N!==null&&f.getAttribute("data-root-dir")===N)}function $t(f,h){let I=s?s():void 0;if(!h||!I||h===I||!a){r(f);return}a(h).then(()=>{r(f)}).catch(M=>{n("workspace switch for %s failed: %o",h,M)})}function yt(f){if(!f)return;let h=s?s():void 0,I=()=>{try{u?.gotoView("worker")}catch(M){n("gotoView(worker) failed: %o",M)}};if(!a||h&&h===f){I();return}a(f).then(I).catch(M=>{n("workspace switch for %s failed: %o",f,M),ge("\uB808\uD3EC \uC804\uD658\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error")})}function xt(f){gn(f).then(h=>{ge(h?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",h?"success":"error",1400)})}function Nt(f){let h=be.get(f)||null;return{item:h,root_dir:h?h.root_dir:"",revision:h?h.expected_revision:0}}async function Wt(f,h,I){if(f!=="dep-add")return;let M=Z.chain_lanes.find(_=>_.rows.some(b=>b.id===h));!M||!M.rows.some(_=>_.id===I)||await Se(_=>Zd(M.lane_id,_),"",[{type:f,a:h,b:I}])}function jt(){return(o&&o.crossLanes?o.crossLanes():null)??null}async function kt(f,h){if(f==="run"){await Zt(h);return}if(f==="stop"){await Ft(h);return}if(f==="create"){await Se(I=>yl(null,I),"");return}if(f==="remove"){let I=ep(h,pe());if(I!==null&&!p(I))return;await Se(M=>Jd(h,M),"");return}await Se(I=>f==="confirm"?Qd(h,I):Xd(h,I),"")}function Xt(f){let h=new Map;for(let I of f.rows){let M=Z.owner_of[I.id]||I.root_dir;typeof M!="string"||M.length===0||h.set(M,[...h.get(M)||[],I.id])}return h}async function Zt(f){let h=Z.chain_lanes.find(b=>b.lane_id===f);if(!h||Z.cross_lanes_revision===null){z();return}H();let I=new Map,M=new Map,_=Xt(h);for(let b of h.rows){if(b.fixed||typeof b.queue_index=="number")continue;let ee=Z.owner_of[b.id]||b.root_dir;if(typeof ee!="string"||ee.length===0){ge(`${b.id}\uC758 \uB808\uD3EC\uB97C \uC54C \uC218 \uC5C6\uC5B4 \uC801\uC7AC\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4`,"error"),z();return}let de=M.get(ee)??0;if(await me("worker-queue-place",{bead_id:b.id,lane:"parallel",index:(Z.parallel_raw_length[ee]??0)+de},ee,I,{bead_id:b.id})===null){z();return}M.set(ee,de+1)}for(let[b,ee]of _)if(await me("worker-queue-arm",{bead_ids:ee,lane_id:f},b,I,{bead_id:ee[0]})===null){ge("\uC77C\uBD80 \uB808\uD3EC\uC5D0\uC11C \uC9C4\uD589\uC744 \uCF1C\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 \u2014 [\u25B6 \uC774\uC5B4\uC11C \uC9C4\uD589]\uC73C\uB85C \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC138\uC694","error"),z();return}z()}async function Ft(f){let h=Z.chain_lanes.find(M=>M.lane_id===f);if(!h||Z.cross_lanes_revision===null){z();return}H();let I=new Map;for(let[M,_]of Xt(h))if(await me("worker-queue-disarm",{lane_id:f},M,I,{bead_id:_[0]})===null)break;z()}async function Ot(f,h){let{root_dir:I,revision:M}=Nt(f);if(I.length===0){z();return}await me("worker-queue-disarm",{bead_ids:[f],lane_id:h},I,new Map([[I,M]]),{bead_id:f}),z()}async function Qt(f,h){let I=be.get(f);if(!I){z();return}let M={kind:"candidate",bead_id:f,root_dir:I.root_dir};if(h==="new-lane"){await Se(_=>yl({bead_id:f,root_dir:I.root_dir},_),f);return}if(h.startsWith("lane:")){let _=h.slice(5);if(!Z.chain_lanes.find(ee=>ee.lane_id===_)){z();return}await Se(ee=>Ui(M,{kind:"chain",lane_id:_,marker_index:(ee.cross_lanes.get(_)?.entries??[]).length},ee),f);return}if(h.startsWith("serial:")){let _=h.slice(7),b=(I.place_lanes||[]).find(ee=>ee.id===_);await se(M,{kind:"repo-serial",root_dir:I.root_dir,lane_id:_,index:b?b.index:0});return}await se(M,{kind:"parallel",marker_index:Z.parallel_rows.length})}async function xe(f,h){let I=Z.parallel_rows,M=I.findIndex(_t=>_t.id===f);if(M<0)return;let _=I[M].root_dir,b=[];I.forEach((_t,Et)=>{_t.root_dir===_&&b.push(Et)});let ee=b.indexOf(M),de=b[ee+h];if(typeof de!="number")return;let Fe=h===-1?de:b[ee+2]??Math.min(I.length,de+1);await se({kind:"parallel",bead_id:f,root_dir:_,queue_index:I[M].queue_index??0},{kind:"parallel",marker_index:Fe})}async function E(f){for(let h of Z.chain_lanes){let I=h.rows.find(M=>M.id===f);if(I){await se({kind:"chain",bead_id:f,root_dir:I.root_dir,lane_id:h.lane_id,...typeof I.queue_index=="number"?{queue_index:I.queue_index}:{}},{kind:"parallel",marker_index:Z.parallel_rows.length});return}}}function fe(f){return{runner:f.runner||void 0,model:f.model||void 0,effort:f.effort||void 0,status:f.run_state==="running"?"running":f.run_state,worktree:f.root_dir}}function Ie(f,h,I,M,_={}){let b=be.get(f)||null;oo({context:{bead_id:f,kind:M,tuple:b?xn(b):""},transport:ee=>Re("worker-attempt-resume",{attempt_id:h,..._,...ee},I,Oe.get(I)?.revision??Nt(f).revision,!1)})}function ht(){K=null,z()}function Ye(){let f=K,h=f?fa(f.draft):null;!f||!h||(K=null,z(),Ie(f.bead_id,h.attempt_id,f.root_dir,"session",h.payload))}function St(f,h){let{item:I,root_dir:M,revision:_}=Nt(h),b=I?.attempt_id||"",ee=f.classList;if(ee.contains("worker-mini__rowops-up")||ee.contains("worker-mini__rowops-down")){xe(h,ee.contains("worker-mini__rowops-up")?-1:1);return}if(ee.contains("worker-mini__rowops-remove")){Re("worker-queue-remove",{bead_id:h},M,_);return}if(ee.contains("mon2-crow__detach")){E(h);return}if(ee.contains("worker-dep__open")){$t(f.getAttribute("data-dep-id")||"",f.getAttribute("data-root-dir")||"");return}if(ee.contains("mon2-arm__release")){Ot(h,f.getAttribute("data-lane-id")||"");return}if(ee.contains("mon-lane__chip")){let de=f.getAttribute("data-lane-id")||"";_e.querySelector(`.mon2-clane[data-lane-id="${de}"]`)?.scrollIntoView({block:"nearest"});return}if(ee.contains("judgement-chip")){let de=f.getAttribute("data-chip-key")||"";de&&F.toggle({bead_id:h,chip_key:de});return}if(ee.contains("rtile__failure-badge")){q=q===b?null:b,z();return}if(ee.contains("rtile__provider-hold-badge")){B=B===b?null:b,z();return}if(ee.contains("rtile__attempt-copy")){let de=f.getAttribute("data-attempt-id")||"";de&&gn(de).then(Fe=>{ge(Fe?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",Fe?"success":"error",1400)});return}if(ee.contains("worker-card__place")){O=O===h?null:h,z();return}if(ee.contains("worker-card__place-cancel")){O=null,z();return}if(ee.contains("worker-card__place-lane")){let de=f.getAttribute("data-lane")||"parallel";O=null,Qt(h,de);return}if(ee.contains("rtile__session")){if(I&&I.kind==="session"){let de=(I.session_refs||[]).find(Fe=>Fe&&Fe.current===!0);de&&(Te.hidden=!1,Q.open(so(de,h,"in_progress",M)),z());return}D=b,b&&I&&(Te.hidden=!1,Q.open({attempt_id:b,root_dir:M,meta:fe(I)})),z();return}if(ee.contains("rtile__pause")){dt("worker-attempt-pause",{attempt_id:b},M);return}if(ee.contains("rtile__resume-alternate")){let de=da(b,je(M));de&&(K={root_dir:M,bead_id:h,draft:de},z());return}if(ee.contains("rtile__resume")){Ie(h,b,M,f.dataset.resumeKind==="settlement"?"settlement":"session");return}if(ee.contains("rtile__resolve")){at(h,M,Oe.get(M)?.revision??Nt(h).revision);return}if(ee.contains("rtile__discard-abandon")){let de={kind:f.dataset.operationKind||"",last_error:f.dataset.lastError||""};if(!p(Jo(h,de)))return;qe({bead_id:h,operation_id:f.dataset.operationId||""},M,_,de);return}if(ee.contains("rtile__discard")){let de=f.dataset.confirmation==="merged"?"merged":"unmerged";if(!p(Zo(h,de)))return;W({bead_id:h,...b?{attempt_id:b}:{},...f.dataset.operationId?{operation_id:f.dataset.operationId}:{}},M,_);return}if(ee.contains("worker-mini__merge")){let de=Qe(M,h);de?.mismatch&&de.continuation===null?J(M,h,_,de.mismatch):Re("worker-merge-queue-add",{bead_id:h},M,_);return}if(ee.contains("worker-mini__merge-cancel")){Re("worker-merge-queue-remove",{bead_id:h},M,_);return}if(ee.contains("worker-mini__discard-abandon")){let de={kind:f.dataset.operationKind||"",last_error:f.dataset.lastError||""};if(!p(Jo(h,de)))return;qe({bead_id:h,operation_id:f.dataset.operationId||""},M,_,de);return}if(ee.contains("worker-mini__discard")){let de=f.dataset.discardMode==="merged"?"merged":"unmerged";if(!p(Zo(h,de)))return;W({bead_id:h,...f.dataset.attemptId?{attempt_id:f.dataset.attemptId}:{},...f.dataset.operationId?{operation_id:f.dataset.operationId}:{}},M,_);return}if(ee.contains("worker-mini__revise-fix")){Ue("worker-revise-fix",{bead_id:h},M,_);return}ee.contains("worker-mini__revise-approve")&&Re("worker-revise-approve",{bead_id:h},M,_)}function x(f){let h=oe.consumeClickSuppression(),I=f.target;if(!I||typeof I.closest!="function")return;if(I.closest(".provider-resume-dialog__cancel")){ht();return}if(I.closest(".provider-resume-dialog__confirm")){Ye();return}if(I.closest("dialog")||I.closest(".worker-drawer-overlay")||I.closest("a"))return;let M=I.closest(".worker-card__id, .worker-mini__id, .rtile__id");if(M){f.preventDefault();let un=I.closest(".mon2-item, .rtile, .mon2-crow, .worker-mini")?.getAttribute("data-bead-id")||M.textContent?.trim()||"";un&&xt(un);return}let _=I.closest(".worker-mini__repo, .worker-card__repo, .mon2-sec__worker");if(_){f.preventDefault();let Ht=_.getAttribute("data-root-dir")||be.get(I.closest(".mon2-item, .rtile, .worker-mini")?.getAttribute("data-bead-id")||"")?.root_dir||_.getAttribute("title")||"";yt(Ht);return}let b=I.closest(".mon2-sec__toggle");if(b){f.preventDefault(),$(b.getAttribute("data-root-dir")||"");return}let ee=I.closest(".worker-pane__toggle[data-lane]");if(ee){f.preventDefault();let Ht=ee.getAttribute("data-lane")||"";(Ht==="candidate"||Ht==="queue"||Ht==="running"||Ht==="pr_wait"||Ht==="done")&&G(Ht);return}let de=I.closest(".worker-wait__area-toggle[data-area]");if(de){f.preventDefault(),he(de.getAttribute("data-area")||"parallel");return}if(I.closest(".mon2-newlane")){f.preventDefault(),kt("create","");return}let Fe=I.closest(".mon2-clane__confirm, .mon2-clane__reapply, .mon2-clane__remove, .mon2-clane__run, .mon2-clane__stop");if(Fe){f.preventDefault();let Ht=Fe.getAttribute("data-lane-id")||"",un=Fe.classList;kt(un.contains("mon2-clane__confirm")?"confirm":un.contains("mon2-clane__reapply")?"reapply":un.contains("mon2-clane__run")?"run":un.contains("mon2-clane__stop")?"stop":"remove",Ht);return}if(I.closest(".mon-merge-all")){f.preventDefault(),We();return}let _t=I.closest(".mon-filter__readiness");if(_t){f.preventDefault(),k={...k,readiness:_t.getAttribute("data-readiness")||"all"},Pf(k),z();return}let Et=I.closest(".mon2-item, .rtile, .mon2-crow, .worker-mini, .worker-card");if(!Et)return;let zt=Et.getAttribute("data-bead-id")||"",lr=I.closest("button");if(lr){f.preventDefault(),St(lr,zt);return}I.closest(".rtile__failure-pop, .chip-popover")||zt&&!h&&(f.preventDefault(),$t(zt,Et.getAttribute("data-root-dir")||Nt(zt).root_dir))}function L(f){let h=f.target;if(!h||typeof h.closest!="function")return;if(K){let ee=pa(K.draft,h,je(K.root_dir));if(ee){ee!==K.draft&&(K={...K,draft:ee},z());return}}let I=h.closest(".mon-filter__blocked");if(I){k={...k,show_blocked:I.checked},Pf(k),z();return}let M=h.closest(".mon-candidate-sort");if(M){T=rs.some(ee=>ee.value===M.value)?M.value:"repo_spec",Wv(T),z();return}let _=h.closest(".mon-running-sort");if(_){g=_.value==="repo"?"repo":"started",Vv(g),z();return}let b=h.closest(".mon-done-range");b&&(m=Wn(b.value),Gv(m),z())}function Ee(f){let h=f.target,I=h&&typeof h.closest=="function"?_=>h.closest(_):()=>null,M=!1;q&&!I(".rtile__failure-pop, .rtile__failure-badge")&&(q=null,M=!0),B&&!I(".rtile__provider-hold-pop, .rtile__provider-hold-badge")&&(B=null,M=!0),M&&z()}function He(f){f.key==="Escape"&&(q===null&&B===null&&K===null||(q=null,B=null,K=null,z()))}e.addEventListener("click",x),e.addEventListener("change",L),document.addEventListener("click",Ee),document.addEventListener("keydown",He),F.attach(),oe.attach(e);{let f=!0;X=aa(h=>{if(re=h,f){f=!1;return}z()})}o&&typeof o.subscribe=="function"&&(Ce=o.subscribe(()=>{try{Oe.clear(),z()}catch{}}));function Le(){ot!==null&&(clearInterval(ot),ot=null)}return{recorrectSharedLane:Wt,load(){n("load"),z(),ot===null&&(ot=setInterval(()=>{try{z()}catch{}},Qv))},pause(){Le()},clear(){Le(),oe.detach(),Ce&&(Ce(),Ce=null),X&&(X(),X=null),Q.destroy(),Te.hidden=!0,st?.destroy(),st=null,e.removeEventListener("click",x),e.removeEventListener("change",L),document.removeEventListener("click",Ee),document.removeEventListener("keydown",He),F.detach(),e.replaceChildren()}}}function Hf(e,t,n){let r=Ut("views:nav"),{global_element:o,repo_element:i}=e,s=null;function l(m){return g=>{g.preventDefault();let k=m==="monitor"&&a()==="monitor"?"worker":m;r("click tab %s",k),n.gotoView(k)}}function a(){let m=t.getState();return m.view==="worker"||m.view==="monitor"?m.view:"board"}function u(){let m=a();return c`
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
    `}function p(){o&&ct(u(),o),i&&ct(d(),i)}return p(),s=t.subscribe(()=>p()),{destroy(){s&&(s(),s=null),o&&ct(c``,o),i&&ct(c``,i)}}}var Kf=["bug","feature","task","epic","chore"];function Gf(e){switch((e||"").toString().toLowerCase()){case"bug":return"Bug";case"feature":return"Feature";case"task":return"Task";case"epic":return"Epic";case"chore":return"Chore";default:return""}}var Yf=["Critical","High","Medium","Low","Backlog"];function Vf(e,t){let n=document.createElement("dialog");n.id="new-issue-dialog",n.setAttribute("role","dialog"),n.setAttribute("aria-modal","true"),n.innerHTML=`
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
  `,e.appendChild(n);let r=n.querySelector("#new-issue-form"),o=n.querySelector("#new-title"),i=n.querySelector("#new-type"),s=n.querySelector("#new-priority"),l=n.querySelector("#new-labels"),a=n.querySelector("#new-description"),u=n.querySelector("#new-issue-error"),d=n.querySelector("#btn-cancel"),p=n.querySelector("#btn-create"),m=n.querySelector(".new-issue__close");function g(){i.replaceChildren();let O=document.createElement("option");O.value="",O.textContent="\u2014 Select \u2014",i.appendChild(O);for(let q of Kf){let B=document.createElement("option");B.value=q,B.textContent=Gf(q),i.appendChild(B)}s.replaceChildren();for(let q=0;q<=4;q+=1){let B=document.createElement("option");B.value=String(q);let K=Yf[q]||"Medium";B.textContent=`${q} \u2013 ${K}`,s.appendChild(B)}}g();function k(){try{typeof n.close=="function"?n.close():n.removeAttribute("open")}catch{n.removeAttribute("open")}}function T(O){o.disabled=O,i.disabled=O,s.disabled=O,l.disabled=O,a.disabled=O,d.disabled=O,p.disabled=O,p.textContent=O?"Creating\u2026":"Create"}function C(){u.textContent=""}function te(O){u.textContent=O}function re(){try{let O=window.localStorage.getItem("beads-ui.new.type");O?i.value=O:i.value="";let q=window.localStorage.getItem("beads-ui.new.priority");q&&/^\d$/.test(q)?s.value=q:s.value="2"}catch{i.value="",s.value="2"}}function X(){let O=i.value||"",q=s.value||"";O.length>0&&window.localStorage.setItem("beads-ui.new.type",O),q.length>0&&window.localStorage.setItem("beads-ui.new.priority",q)}async function D(){C();let O=String(o.value||"").trim();if(O.length===0){te("Title is required"),o.focus();return}let q=Number(s.value||"2");if(!(q>=0&&q<=4)){te("Priority must be 0..4"),s.focus();return}let B=String(i.value||""),K=String(a.value||""),F={title:O};B.length>0&&(F.type=B),String(q).length>0&&(F.priority=q),K.length>0&&(F.description=K),T(!0);try{await t("create-issue",F)}catch{T(!1),te("Failed to create issue");return}X(),T(!1),k()}return n.addEventListener("cancel",O=>{O.preventDefault(),k()}),m.addEventListener("click",()=>k()),d.addEventListener("click",()=>k()),n.addEventListener("keydown",O=>{O.key==="Enter"&&(O.ctrlKey||O.metaKey)&&(O.preventDefault(),D())}),r.addEventListener("submit",O=>{O.preventDefault(),D()}),{open(){r.reset(),C(),re();try{"showModal"in n&&typeof n.showModal=="function"?n.showModal():n.setAttribute("open","")}catch{n.setAttribute("open","")}setTimeout(()=>{try{o.focus()}catch{}},0)},close(){k()}}}var Jv=[["route","route \uCE69"],["fast_track","\u26A1 fast_track \uCE69"],["pr","PR \uCE69"],["from","\u21A9 from \uCE69"],["blocked","blocked\xB7\uC0AC\uC6A9\uC790 \uB9AC\uBDF0 \uD544\uC694 \uCE69"],["stepper","stepper"]];function ek(e,t){return Ma(e,t)?"shown":t.hidden_labels.includes(e)?"hidden_exact":"hidden_prefix"}function Qf(e,t,n){return c`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">라벨 표시</div>
      <p class="settings-dialog__hint-block">
        라벨을 눌러 표시/숨김을 전환합니다. prefix 규칙으로 숨겨진 라벨을 누르면
        그 라벨만 예외로 다시 표시됩니다.
      </p>
      ${t.length===0?c`<div class="settings-dialog__empty">라벨 없음</div>`:c`<div class="settings-dialog__pills">
            ${t.map(r=>{let o=ek(r,e);return c`<button
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
  `}function Xf(e,t,n){return c`
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
  `}function Zf(e,t){return c`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">카드 표시 요소</div>
      <div class="settings-dialog__toggles">
        ${Jv.map(([n,r])=>c`<label class="settings-dialog__toggle">
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
  `}var tk=[{id:"execution",label:"\uC2E4\uD589",glyph:"\u25C6"},{id:"display",label:"\uD45C\uC2DC",glyph:"\u25EB"}];function Jf(e,t){let{transport:n,policyStore:r,labelOptions:o}=t,i=t.notify||(ne=>ge(ne,"error",4e3)),s=document.createElement("dialog");s.id="settings-dialog",s.className="settings-dialog",s.setAttribute("role","dialog"),s.setAttribute("aria-modal","true"),s.setAttribute("aria-label","\uC124\uC815"),e.appendChild(s);let l="execution",a=!1,u="",d=null;function p(){if(d)return d;let ne=s.querySelector('[data-pane="execution"]');return ne?(d=ba(ne,{root_dir:null,queue:()=>t.queueStore?.get()??null,transport:n,implPresetStore:t.implPresetStore,notify:i,onQueueAdopt:ve=>t.queueStore?.set?.(ve)}),d):null}function m(){return c`
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
    `}function g(){let ne=r.get();return c`
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
              ${Qf(ne,o(),te)}
              ${Xf(ne,u,{onDraft:ve=>{u=ve},onAdd:re,onRemove:X})}
              ${Zf(ne,D)}
            `:c`<div class="settings-dialog__empty">
              표시 정책을 불러오는 중…
            </div>`}
      </section>
    `}async function k(ne){let ve=r.get();if(ve)try{let Pe=await n("display-policy-set",{expected_revision:ve.revision,policy:ne(ve)});T(Pe),Pe&&Pe.conflict&&Pe.policy&&(Pe=await n("display-policy-set",{expected_revision:Pe.policy.revision,policy:ne(Pe.policy)}),T(Pe)),Pe&&Pe.conflict&&i("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC")}catch{i("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328")}}function T(ne){ne&&ne.policy&&typeof ne.policy=="object"&&r.set(ne.policy)}function C(ne){k(ne)}function te(ne){let ve=r.get();if(!ve)return;let Pe=!nk(ne,ve);C(H=>rk(ne,H,Pe))}function re(){let ne=u.trim();ne.length!==0&&(u="",C(ve=>ve.hidden_prefixes.includes(ne)?{hidden_prefixes:ve.hidden_prefixes}:{hidden_prefixes:[...ve.hidden_prefixes,ne]}),O())}function X(ne){C(ve=>({hidden_prefixes:ve.hidden_prefixes.filter(Pe=>Pe!==ne)}))}function D(ne){let ve=r.get();if(!ve)return;let Pe=ve.chips[ne]===!1;C(()=>({chips:{[ne]:Pe}}))}function O(){ct(c`
        <div class="settings-dialog__container">
          <nav
            class="settings-dialog__rail"
            role="tablist"
            aria-orientation="vertical"
          >
            <div class="settings-dialog__rail-title">설정</div>
            ${tk.map(ne=>c`<button
                  type="button"
                  class="settings-dialog__tab"
                  role="tab"
                  data-tab=${ne.id}
                  aria-selected=${String(l===ne.id)}
                  aria-controls=${`settings-pane-${ne.id}`}
                  @click=${()=>q(ne.id)}
                >
                  <span class="settings-dialog__glyph">${ne.glyph}</span>
                  ${ne.label}
                </button>`)}
            <button
              type="button"
              class="settings-dialog__close"
              aria-label="닫기"
              @click=${U}
            >
              닫기
            </button>
          </nav>
          <div class="settings-dialog__panes">
            ${m()} ${g()}
          </div>
        </div>
      `,s),p()}function q(ne){l=ne,O()}let B=()=>{a=!1,t.onOpenChange?.(!1)};s.addEventListener("close",B),s.addEventListener("cancel",B);let K=ne=>{ne.target===s&&U()};s.addEventListener("click",K);let F=null;r.subscribe&&(F=r.subscribe(()=>{a&&O()}));let N=null;t.implPresetStore?.subscribe&&(N=t.implPresetStore.subscribe(()=>{a&&d?.render()}));function Y(ne="execution"){a||(a=!0,t.onOpenChange?.(!0),l=ne,u="",O(),typeof s.showModal=="function"?s.showModal():s.setAttribute("open",""),p()?.load())}function U(){a&&(a=!1,t.onOpenChange?.(!1),typeof s.close=="function"?s.close():s.removeAttribute("open"))}return{open:Y,close:U,sessionDraft:()=>d?.sessionDraft()??{},destroy(){a=!1,s.removeEventListener("close",B),s.removeEventListener("cancel",B),s.removeEventListener("click",K),F&&(F(),F=null),N&&(N(),N=null),d?.destroy(),d=null,s.remove()}}}function nk(e,t){return t.visible_labels.includes(e)?!0:t.hidden_labels.includes(e)?!1:!t.hidden_prefixes.some(n=>n.length>0&&e.startsWith(n))}function rk(e,t,n){if(!n)return{hidden_labels:t.hidden_labels.includes(e)?t.hidden_labels:[...t.hidden_labels,e],visible_labels:t.visible_labels.filter(i=>i!==e)};let r=t.hidden_labels.filter(i=>i!==e);return t.hidden_prefixes.some(i=>i.length>0&&e.startsWith(i))?{hidden_labels:r,visible_labels:t.visible_labels.includes(e)?t.visible_labels:[...t.visible_labels,e]}:{hidden_labels:r}}var ok=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],e_="usage-meter-card",sk="usage-meter-layer",nc=600,ik=["token_expired","relogin_required"];function t_(e){return String(e).padStart(2,"0")}function ak(e,t){let n=Math.max(0,Math.ceil((e-t)/6e4)),r=Math.floor(n/1440),o=Math.floor(n%1440/60),i=n%60;return r>0?`${r}d${o>0?` ${o}h`:""}`:o>0?`${o}h${i>0?` ${i}m`:""}`:`${i}m`}function n_(e,t=Date.now()){let n=Date.parse(e);if(!Number.isFinite(n))return"";let r=new Date(n),o=new Date(t),i=`${t_(r.getHours())}:${t_(r.getMinutes())}`,l=r.getFullYear()===o.getFullYear()&&r.getMonth()===o.getMonth()&&r.getDate()===o.getDate()?i:`${ok[r.getMonth()]} ${r.getDate()} ${i}`;return`${ak(n,t)} \xB7 ${l}`}function lk(e){let t=Math.max(0,Math.floor(e));return t<60?`${t}\uCD08 \uC804`:t<3600?`${Math.floor(t/60)}\uBD84 \uC804`:`${Math.floor(t/3600)}\uC2DC\uAC04 \uC804`}function r_(e){return e>=85?"usage-meter__window--danger":e>=60?"usage-meter__window--warn":"usage-meter__window--success"}function o_(e){let t=typeof e=="number"&&Number.isFinite(e)?e:0;return Math.min(100,Math.max(0,t))}var s_=[{key:"claude",label:"Claude",endpoint:"/api/claude-usage",switch_endpoint:"/api/claude-account/switch",tool:"cswap"},{key:"codex",label:"Codex",endpoint:"/api/codex-usage",switch_endpoint:"/api/codex-account/switch",tool:"codex-auth"}];function a_(e){let t=[];for(let n of e){if(!n||typeof n!="object")continue;let r=n;typeof r.key!="string"||r.key.length===0||typeof r.pct!="number"||!Number.isFinite(r.pct)||t.push({key:r.key,pct:r.pct,resetsAt:typeof r.resetsAt=="string"?r.resetsAt:""})}return t}function ck(e){if(!e||typeof e!="object")return null;let t=e;return!Number.isInteger(t.number)||t.number<=0||typeof t.email!="string"||t.email.length===0||typeof t.status!="string"||t.status.length===0||typeof t.active!="boolean"||!Array.isArray(t.windows)?null:{number:t.number,email:t.email,alias:typeof t.alias=="string"&&t.alias.length>0?t.alias:null,plan:typeof t.plan=="string"&&t.plan.length>0?t.plan:null,active:t.active,status:t.status,windows:a_(t.windows),fetchedAt:typeof t.fetchedAt=="string"?t.fetchedAt:null,ageSeconds:typeof t.ageSeconds=="number"&&Number.isFinite(t.ageSeconds)?t.ageSeconds:null}}function uk(e,t){if(!e||typeof e!="object")return null;let n=e,r=[];if(Array.isArray(n.accounts))for(let i of n.accounts){let s=ck(i);s&&r.push(s)}let o=n.available===!0&&Array.isArray(n.windows);return!o&&r.length===0?null:{available:o,windows:o?a_(n.windows):[],ageSeconds:typeof n.ageSeconds=="number"&&Number.isFinite(n.ageSeconds)?n.ageSeconds:null,accounts:r,receivedAtMs:t,held:!1}}function dk(e,t){if(!e||typeof e!="object")return{kind:"error"};let n=uk(e,t);return n?{kind:"ok",snapshot:n}:Array.isArray(e.accounts)?{kind:"empty"}:{kind:"error"}}function l_(e,t){return(e.ageSeconds===null?0:e.ageSeconds)+Math.max(0,t-e.receivedAtMs)/1e3}function pk(e,t){return!e.held||l_(e,t)<=nc?e:{...e,available:!1,windows:[],accounts:[]}}function i_(e,t){return`${e}:${t}`}function c_(e){let t=!1,n=null,r=new Map,o=null,i=new Map,s=new Map,l=0,a=null;function u(){ct(c``,e),e.hidden=!0,p()}function d(){if(a===null){let H=e.ownerDocument;a=H.createElement("div"),a.id=sk,a.className="usage-meter__layer",H.body.appendChild(a)}return a}function p(){a!==null&&(ct(c``,a),a.remove(),a=null)}function m(H){n!==H&&(n===null&&(document.addEventListener("mousedown",k),document.addEventListener("keydown",C),window.addEventListener("resize",T)),n=H)}function g(){n!==null&&(n=null,document.removeEventListener("mousedown",k),document.removeEventListener("keydown",C),window.removeEventListener("resize",T))}function k(H){let ie=H.target;ie&&(e.contains(ie)||a!==null&&a.contains(ie))||(g(),U())}function T(){U()}function C(H){H.key==="Escape"&&(g(),U())}function te(H){n===H?g():m(H),U()}function re(){g(),U()}async function X(H,ie){if(r.has(H.key))return;let _e=i_(H.key,ie);r.set(H.key,ie),s.delete(_e),U();let Te=null;try{Te=await(await fetch(H.switch_endpoint,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({number:ie})})).json()}catch{Te=null}if(t)return;if(r.delete(H.key),!Te||Te.ok!==!0){let le=Te&&typeof Te.error=="string"&&Te.error.length>0?Te.error:"network_error";s.set(_e,{kind:"error",text:`\uC804\uD658 \uC2E4\uD328 \u2014 ${le}`}),U();return}let V=Array.isArray(Te.warnings)?Te.warnings.filter(le=>typeof le=="string"&&le.length>0):[];V.length>0&&s.set(_e,{kind:"warn",text:V.join(" \xB7 ")}),U(),await Pe()}function D(H,ie,_e,Te){let V=o_(H.pct),Z=`resets ${n_(H.resetsAt,Te)}${ie?` \xB7 ${_e}`:""}`;return c`<span
      class="usage-meter__window ${r_(V)}"
      style=${`--progress: ${V}%`}
      title=${Z}
    >
      <span class="usage-meter__label">${H.key}</span>
      <span class="usage-meter__track" aria-hidden="true">
        <span class="usage-meter__fill"></span>
      </span>
      <span class="usage-meter__pct">${V}%</span>
    </span>`}function O(H,ie,_e){let Te=l_(ie,_e),V=ie.available&&(ie.held||Te>nc),le=V?`${Math.floor(Te/60)}\uBD84 \uC804 \uCE21\uC815`:"",Z=ie.accounts.filter(Ce=>!Ce.active).length,be=`usage-meter__group${V?" usage-meter__group--stale":""}`,Oe=c`<span class="usage-meter__provider"
        >${H.label}</span
      >
      ${ie.available?ie.windows.map(Ce=>D(Ce,V,le,_e)):c`<span class="usage-meter__empty">사용량 없음</span>`}
      ${Z>0?c`<span class="usage-meter__badge">+${Z}</span>`:""}`;if(ie.accounts.length===0)return c`<span
        class=${be}
        aria-label=${`${H.label} usage`}
        >${Oe}</span
      >`;let ke=n===H.key;return c`<button
      type="button"
      class=${`usage-meter__toggle ${be}`}
      aria-label=${`${H.label} usage`}
      aria-expanded=${ke?"true":"false"}
      aria-controls=${e_}
      @click=${()=>te(H.key)}
    >
      ${Oe}
    </button>`}function q(H,ie){return c`<span class="usage-meter" aria-label="Usage">
      ${H.map(_e=>O(_e.provider,_e.snapshot,ie))}
    </span>`}function B(H,ie){let _e=o_(H.pct),Te=n_(H.resetsAt,ie);return c`<span
      class="usage-meter__account-window ${r_(_e)}"
      style=${`--progress: ${_e}%`}
    >
      <span class="usage-meter__account-key">${H.key}</span>
      <span class="usage-meter__account-track" aria-hidden="true">
        <span class="usage-meter__account-fill"></span>
      </span>
      <span class="usage-meter__account-pct">${_e}%</span>
      <span class="usage-meter__account-reset"
        >${Te.length>0?`\u21BB ${Te}`:""}</span
      >
    </span>`}function K(H,ie){return ik.includes(ie)?`\uD1A0\uD070 \uB9CC\uB8CC \u2014 ${H.tool} \uC7AC\uB85C\uADF8\uC778 \uD544\uC694`:"\uC0AC\uC6A9\uB7C9 \uC5C6\uC74C"}function F(H,ie,_e){let Te=ie.status==="ok",V=typeof ie.ageSeconds=="number"&&ie.ageSeconds>nc,le=s.get(i_(H.key,ie.number)),Z=r.get(H.key),be=Z!==void 0,Oe=Z===ie.number,ke=["usage-meter__account"];return ie.active&&ke.push("usage-meter__account--active"),Te||ke.push("usage-meter__account--unavailable"),V&&ke.push("usage-meter__account--stale"),c`<div class=${ke.join(" ")}>
      <div class="usage-meter__account-head">
        <span class="usage-meter__account-label" title=${ie.email}
          >${ie.alias===null?ie.email:ie.alias}</span
        >
        ${ie.plan===null?"":c`<span class="usage-meter__account-tag">${ie.plan}</span>`}
        ${ie.active?c`<span
              class="usage-meter__account-tag usage-meter__account-tag--active"
              >active</span
            >`:""}
        ${ie.ageSeconds===null?"":c`<span class="usage-meter__account-age"
              >${lk(ie.ageSeconds)}</span
            >`}
        ${ie.active?"":c`<button
              type="button"
              class="usage-meter__switch"
              ?disabled=${be}
              @click=${()=>{X(H,ie.number)}}
            >
              ${Oe?"\uC804\uD658 \uC911\u2026":"\uC804\uD658"}
            </button>`}
      </div>
      ${Te?c`<div class="usage-meter__account-windows">
            ${ie.windows.map(Ce=>B(Ce,_e))}
          </div>`:c`<div class="usage-meter__account-status">
            ${K(H,ie.status)}
          </div>`}
      ${le===void 0?"":c`<div
            class="usage-meter__account-message usage-meter__account-message--${le.kind}"
          >
            ${le.text}
          </div>`}
    </div>`}function N(H,ie,_e){let Te=ie.accounts.filter(V=>V.active).length;return c`<section class="usage-meter__section">
      <h2 class="usage-meter__section-title">
        ${H.label} · 활성 ${Te} / 전체
        ${ie.accounts.length}
      </h2>
      ${ie.accounts.map(V=>F(H,V,_e))}
    </section>`}function Y(H,ie){return c`<div
      class="usage-meter__card"
      id=${e_}
      role="dialog"
      aria-label=${`${H.provider.label} \uACC4\uC815 \uC0AC\uC6A9\uB7C9`}
    >
      ${N(H.provider,H.snapshot,ie)}
      <p class="usage-meter__note">전환은 새로 시작하는 세션부터 적용됩니다.</p>
    </div>`}function U(){let H=Date.now(),ie=[];for(let Te of s_){let V=i.get(Te.key);V&&ie.push({provider:Te,snapshot:pk(V,H)})}if(ie.length===0){g(),u();return}let _e=ie.find(Te=>Te.provider.key===n&&Te.snapshot.accounts.length>0);_e||g(),ct(q(ie,H),e),e.hidden=!1,_e?ne(_e,H):p()}function ne(H,ie){let _e=d(),Te=e.getBoundingClientRect(),V=e.ownerDocument.documentElement.clientWidth;_e.style.setProperty("--usage-meter-anchor-top",`${Te.bottom}px`),_e.style.setProperty("--usage-meter-anchor-right",`${Math.max(0,V-Te.right)}px`),ct(c`<div
          class="usage-meter__scrim"
          aria-hidden="true"
          @mousedown=${re}
        ></div>
        ${Y(H,ie)}`,_e)}async function ve(H){try{let ie=await fetch(H.endpoint);return ie.ok?dk(await ie.json(),Date.now()):{kind:"error"}}catch{return{kind:"error"}}}async function Pe(){l+=1;let H=l,ie=await Promise.all(s_.map(async _e=>({provider:_e,read:await ve(_e)})));if(!(t||H!==l)){for(let _e of ie){let Te=_e.provider.key;if(_e.read.kind==="ok"){i.set(Te,_e.read.snapshot);continue}if(_e.read.kind==="empty"){i.delete(Te);continue}let V=i.get(Te);V!==void 0&&!V.held&&i.set(Te,{...V,held:!0})}U()}}return u(),Pe(),o=setInterval(()=>{Pe()},6e4),{destroy(){t=!0,o!==null&&(clearInterval(o),o=null),g(),u()}}}function As(e){let t=e?.blocked_info;return t&&typeof t=="object"?Array.isArray(t.blockers)?t.blockers.filter(r=>typeof r=="string"&&r.length>0):[]:(Array.isArray(e?.dependencies)?e.dependencies:[]).map(r=>{if(typeof r=="string")return r;if(!r||typeof r!="object")return"";let o=r.type??r.dependency_type;return o!==void 0&&o!=="blocks"?"":r.depends_on_id||r.id||""}).filter(Boolean)}var p_="bdui.worker.candidate_sort",Ss=Object.freeze([{id:"spec",label:"spec \uC6B0\uC120",chain:[{key:"spec",dir:"desc"},{key:"created",dir:"asc"}]},{id:"bottleneck",label:"\uBCD1\uBAA9 \uC6B0\uC120",chain:[{key:"priority",dir:"asc"},{key:"dependents",dir:"desc"},{key:"released",dir:"desc"}]},{id:"created",label:"\uCD5C\uC2E0 \uC0DD\uC131",chain:[{key:"created",dir:"desc"},{key:"priority",dir:"asc"}]},{id:"updated",label:"\uCD5C\uC2E0 \uC218\uC815",chain:[{key:"updated",dir:"desc"}]}]),va=Object.freeze({preset:"spec"}),f_=3,__=Object.freeze([{key:"priority",label:"\uC6B0\uC120\uC21C\uC704"},{key:"dependents",label:"\uD6C4\uC18D \uC218"},{key:"released",label:"\uD574\uC81C \uC2DC\uAC01"},{key:"spec",label:"spec \uC720\uBB34"},{key:"created",label:"\uC0DD\uC131"},{key:"updated",label:"\uC218\uC815"}]);function u_(e){return Ss.some(t=>t.id===e)}function d_(e){let t=Ss.find(n=>n.id===e);return t?t.chain.map(n=>({...n})):[]}function fk(e,t){return e.length===t.length&&e.every((n,r)=>n.key===t[r].key&&n.dir===t[r].dir)}function Es(e){return e&&"preset"in e?d_(e.preset):e&&Array.isArray(e.chain)?e.chain.map(t=>({...t})):d_("spec")}function rc(e){return e&&"preset"in e?e.preset:null}function Hr(e){if(typeof e=="string"){let i;try{i=JSON.parse(e)}catch{return u_(e)?{preset:e}:va}return Hr(i)}if(!e||typeof e!="object")return va;let t=e;if(u_(t.preset))return{preset:t.preset};let n=t.chain;if(!Array.isArray(n)||n.length===0||n.length>f_||!n.every(Ia))return va;let r=[];for(let i of n)r.some(s=>s.key===i.key)||r.push({key:i.key,dir:i.dir});let o=Ss.find(i=>fk(i.chain,r));return o?{preset:o.id}:{chain:r}}function m_(){try{return Hr(window.localStorage.getItem(p_))}catch{return va}}function oc(e){try{window.localStorage.setItem(p_,JSON.stringify(e))}catch{}}function g_(e,t,n){let r=e.map(a=>({...a}));if(!n)return r.slice(0,t);if(!Object.prototype.hasOwnProperty.call(Ks,n))return r;let o=n;if(r.slice(0,t).some(a=>a.key===o))return r.slice(0,t);let i={key:o,dir:r[t]&&r[t].key===o?r[t].dir:Ks[o]},s=r.slice(0,t),l=r.slice(t+1).filter(a=>a.key!==o);return[...s,i,...l].slice(0,f_)}function h_(e,t){return e.map((n,r)=>r===t?{key:n.key,dir:n.dir==="asc"?"desc":"asc"}:{...n})}function _k(e){let t=new Set(e.map(l=>l.id)),n=new Map,r=new Map;for(let l of e){let a=As(l).filter(u=>t.has(u));n.set(l.id,a);for(let u of a){let d=r.get(u);d?d.push(l):r.set(u,[l])}}let o=new Set,i=[],s=l=>{o.add(l.id),i.push(l);for(let a of r.get(l.id)??[])!o.has(a.id)&&(n.get(a.id)??[]).every(u=>o.has(u))&&s(a)};for(;i.length<e.length;){let l=e.find(a=>!o.has(a.id)&&(n.get(a.id)??[]).every(u=>o.has(u)));s(l??e.find(a=>!o.has(a.id)))}return i}function b_(e,t){let n=Array.isArray(e)?e.slice():[];return n.sort(zc(Es(t))),_k(n)}function y_(e,t){let n=new Map;if(!e||typeof e!="object")return n;let r=e,o=[],i=new Set;for(let s of t){if(i.has(s.id))continue;i.add(s.id);let l=r[s.id];if(!l||!Array.isArray(l.scope))continue;let a=l.scope.filter(u=>typeof u=="string"&&u.length>0);if(a.length===0){n.set(s.id,{overlaps:[],scope_missing:!0});continue}n.set(s.id,{overlaps:[],scope_missing:!1}),o.push({member:s,scope:a})}for(let s=0;s<o.length;s+=1)for(let l=s+1;l<o.length;l+=1){let a=bi(o[s].scope,o[l].scope);if(a.length===0)continue;let u=o[s].member,d=o[l].member;n.get(u.id)?.overlaps.push({id:d.id,title:d.title,location_label:d.location_label,prefixes:a}),n.get(d.id)?.overlaps.push({id:u.id,title:u.title,location_label:u.location_label,prefixes:a})}return n}var v_=new Set(["sh","bash","zsh","dash","ksh"]),k_=/('(?:[^']*)'|"(?:\\.|[^"\\])*"|#.*|\$(?:\{[^}\n]*\}|[A-Za-z_][A-Za-z0-9_]*|[?#@*!$0-9-])|\b(?:if|then|else|elif|fi|for|while|until|do|done|case|esac|in|function|select|time)\b)/g;function w_(e){let t=e.split("/");return t[t.length-1]||""}function mk(e){let t=e.split(`
`,1)[0];if(!t.startsWith("#!"))return!1;let n=t.slice(2).trim().split(/\s+/).filter(Boolean);if(n.length===0)return!1;let r=w_(n[0]);if(r!=="env")return v_.has(r);let o=n.slice(1).find(i=>!i.startsWith("-")&&!i.includes("="));return o!==void 0&&v_.has(w_(o))}function gk(e){return e.startsWith("#")?"comment":e.startsWith("'")||e.startsWith('"')?"string":e.startsWith("$")?"variable":"keyword"}function hk(e){let t=[],n=0;k_.lastIndex=0;for(let r of e.matchAll(k_)){let o=r.index;o>n&&t.push({text:e.slice(n,o),kind:"plain"}),t.push({text:r[0],kind:gk(r[0])}),n=o+r[0].length}return n<e.length&&t.push({text:e.slice(n),kind:"plain"}),t.length===0&&t.push({text:e,kind:"plain"}),t}function bk(e){return{bad_request:"\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD\uC774 \uC62C\uBC14\uB974\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.",forbidden:"\uB4F1\uB85D\uB418\uC9C0 \uC54A\uC740 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uC758 \uC2A4\uD06C\uB9BD\uD2B8\uB294 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",lane_not_declared:"\uD604\uC7AC \uACE0\uC815 \uC120\uC5B8\uC5D0 \uD574\uB2F9 \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4.",stale_declaration:"\uC800\uC7A5\uC18C \uC791\uC5C5 \uC120\uC5B8\uC774 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uD654\uBA74\uC5D0\uC11C \uB2E4\uC2DC \uC5F4\uC5B4 \uC8FC\uC138\uC694.",too_large:"\uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uB108\uBB34 \uCEE4\uC11C \uD654\uBA74\uC5D0 \uD45C\uC2DC\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",unsupported_content:"\uD14D\uC2A4\uD2B8 \uD615\uC2DD\uC758 \uC2A4\uD06C\uB9BD\uD2B8\uB9CC \uD45C\uC2DC\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.",unreadable:"\uACE0\uC815\uB41C \uC2A4\uD06C\uB9BD\uD2B8 \uB0B4\uC6A9\uC744 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4."}[e]||"\uC2A4\uD06C\uB9BD\uD2B8\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4."}function $_(e){let t=e.getWorkspacePath,n=e.fetchImpl||globalThis.fetch?.bind(globalThis),r=document.createElement("div");r.className="repo-ops-script-viewer-root",document.body.appendChild(r);let o=null,i="loading",s="",l="",a=0,u=null,d=!1;function p(O,q){return q?hk(O).map(B=>B.kind==="plain"?B.text:c`<span
            class="repo-ops-script-viewer__token repo-ops-script-viewer__token--${B.kind}"
            >${B.text}</span
          >`):O}function m(){if(!o)return c``;let O=i==="ready"&&mk(s),q=i==="ready"?s.split(`
`):[];return c`<div
      class="repo-ops-script-viewer"
      role="dialog"
      aria-modal="true"
      aria-label=${`\uC2A4\uD06C\uB9BD\uD2B8 \uB0B4\uC6A9: ${o.path}`}
    >
      <div
        class="repo-ops-script-viewer__backdrop"
        @click=${()=>X()}
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
              @click=${()=>{k()}}
            >
              복사
            </button>
            <button
              type="button"
              class="repo-ops-script-viewer__close"
              aria-label="스크립트 팝업 닫기"
              @click=${()=>X()}
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
                  ${q.map((B,K)=>c`<div class="repo-ops-script-viewer__row">
                        <span
                          class="repo-ops-script-viewer__line-number"
                          aria-hidden="true"
                          >${K+1}</span
                        ><code class="repo-ops-script-viewer__code-line"
                          >${p(B,O)}</code
                        >
                      </div>`)}
                </div>`}
        </div>
      </section>
    </div>`}function g(){ct(m(),r)}async function k(){if(i!=="ready")return;let O=await gn(s);ge(O?"\uC2A4\uD06C\uB9BD\uD2B8 \uBCF5\uC0AC\uB428":"\uC2A4\uD06C\uB9BD\uD2B8 \uBCF5\uC0AC \uC2E4\uD328",O?"success":"error")}function T(O){O.key==="Escape"&&o&&(O.preventDefault(),X())}function C(){d||(document.addEventListener("keydown",T),d=!0)}function te(){d&&(document.removeEventListener("keydown",T),d=!1)}async function re(O,q=null){let B=++a;C(),o={...O},u=q||(document.activeElement instanceof HTMLElement?document.activeElement:null),i="loading",s="",l="",g(),r.querySelector(".repo-ops-script-viewer__close")?.focus();let F=t?t():"";if(!F){i="error",l="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4.",g();return}if(!n){i="error",l="\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD \uAE30\uB2A5\uC744 \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",g();return}let N="/api/repo-ops-script?workspace="+encodeURIComponent(F)+"&lane="+encodeURIComponent(O.lane)+"&base_sha="+encodeURIComponent(O.base_sha);try{let Y=await n(N),U=await Y.json().catch(()=>({}));if(B!==a)return;if((t?t():"")!==F){X();return}if(!Y.ok||!U||U.ok!==!0){i="error",l=bk(U&&typeof U.error=="string"?U.error:""),g();return}o={lane:U.lane,base_sha:U.base_sha,path:U.path,base_ref:U.base_ref},s=String(U.content),i="ready",g()}catch{if(B!==a)return;i="error",l="\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",g()}}function X(){a+=1,te(),o=null,s="",g();let O=u;u=null,O?.isConnected&&O.focus()}function D(){X(),r.remove()}return{open:re,close:X,destroy:D}}var x_={deploy_not_declared:"\uC120\uC5B8 \uC5C6\uC74C",deploy_opted_out:"\uC774 workspace\uC5D0\uC11C \uBC30\uD3EC \uC2E4\uD589\uC774 \uAEBC\uC838 \uC788\uC74C",deploy_in_flight:"\uBC30\uD3EC \uC9C4\uD589 \uC911",target_unresolved:"\uB300\uC0C1 tip\uC744 \uD655\uC815\uD558\uC9C0 \uBABB\uD568",remote_history_not_monotonic:"\uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC\uC640 \uC6D0\uACA9 \uC774\uB825\uC774 \uAC08\uB77C\uC9D0"},yk=new Set(["queued","running","retry_pending"]);function A_(e){let t=e.queueStore,n=e.transport,r=e.onChanged||(()=>{}),o=e.onOpenScript;function i(){return t&&t.get()||{}}function s(){let N=i();return typeof N.revision=="number"?N.revision:0}function l(N){t&&N&&N.queue&&typeof N.queue=="object"&&t.set(N.queue)}function a(){let N=i().workspace_info;return N&&typeof N=="object"?N:{}}function u(N,Y){return c`<span
      class="worker-repo-ops__vd-badge worker-repo-ops__vd-badge--${N}"
      >${Y}</span
    >`}function d(N){if(typeof N!="number"||!Number.isFinite(N))return"";let Y=N/6e4;return Number.isInteger(Y)?`timeout ${Y}\uBD84`:`timeout ${Math.round(N/1e3)}\uCD08`}function p(N){let Y=d(N);return Y?u("config",Y):""}function m(N,Y,U){return c`<button
      type="button"
      class="worker-repo-ops__vd-cmd worker-repo-ops__vd-cmd--link"
      .textContent=${U.script}
      @click=${ne=>{o&&o({lane:N,base_sha:Y.base_sha,path:U.script,base_ref:Y.base_ref},ne.currentTarget)}}
    ></button>`}function g(){let N=i().repo_operations;return Array.isArray(N)?N:[]}function k(){let N=a().repo_ops,Y=N&&typeof N=="object"?N.repo_id:null;return typeof Y=="string"&&Y?Y:null}function T(){return g().some(N=>N&&N.kind==="deploy"&&yk.has(N.state))}function C(){let N=T(),Y=k()===null;return c`<button
      type="button"
      class="worker-repo-ops__deploy-run"
      data-seam="repo-ops-deploy-run"
      ?disabled=${N||Y}
      title=${N?"\uBC30\uD3EC \uC9C4\uD589 \uC911":Y?"\uC800\uC7A5\uC18C\uB97C \uD655\uC778\uD560 \uC218 \uC5C6\uC74C":"\uC6D0\uACA9 base tip\uC5D0\uC11C \uBC30\uD3EC \uC2A4\uD06C\uB9BD\uD2B8\uB97C 1\uD68C \uC2E4\uD589\uD569\uB2C8\uB2E4"}
      @click=${()=>{q()}}
    >
      배포 실행
    </button>`}function te(){let N=i().repo_ops_opt_out;return{verify:N?.verify===!0,deploy:N?.deploy===!0}}function re(N,Y){return c`<label class="worker-repo-ops__lane-run">
      <input
        type="checkbox"
        .checked=${!Y}
        @change=${U=>{O(N,!U.target.checked)}}
      />
      이 workspace에서 실행
    </label>`}function X(N){let Y=typeof N.base_sha=="string"?N.base_sha:"",U=`${N.source_path||"repo-ops/config.toml"} @ ${N.base_ref||"?"}${Y?`@${Y.slice(0,7)}`:""}`,ne=te(),ve=!!N.verify&&ne.verify,Pe=!!N.deploy&&ne.deploy;return c`<section class="worker-repo-ops__vd" data-seam="repo-ops">
      <p class="worker-repo-ops__vd-title">
        저장소 작업 선언
        <span class="worker-repo-ops__vd-src">${U}</span>
      </p>
      <div
        class="worker-repo-ops__lane${ve?" worker-repo-ops__lane--skipped":""}"
        data-lane="verify"
      >
        <span class="worker-repo-ops__lane-k">머지 전 검증</span>
        <span class="worker-repo-ops__lane-v"
          >${N.verify?c`${m("verify",N,N.verify)}
              ${p(N.verify.timeout_ms)}
              ${ve?u("skipped","\uC774 workspace\uC5D0\uC11C \uAC74\uB108\uB700"):""}`:c`선언 없음${u("absent","verify \uC5C6\uC774 \uD310\uC815")}`}</span
        >
        <span class="worker-repo-ops__lane-d"
          >${ve?"\uC774 workspace\uC5D0\uC11C\uB294 \uAC80\uC99D \uC5C6\uC774 \uD310\uC815\uD569\uB2C8\uB2E4.":N.verify?"\uBA38\uC9C0 \uC804\uC5D0 \uC774 \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uD1B5\uACFC\uD574\uC57C \uC790\uACA9\uC744 \uC5BB\uC2B5\uB2C8\uB2E4.":"\uBA38\uC9C0 \uC790\uACA9\uC740 PR/base/head \uC2E0\uC120\uB3C4\xB7mergeability\xB7\uB9AC\uBDF0 \uC601\uC218\uC99D\uC73C\uB85C\uB9CC \uD310\uC815\uD569\uB2C8\uB2E4."}</span
        >
        ${N.verify?re("verify",ne.verify):""}
      </div>
      <div
        class="worker-repo-ops__lane${Pe?" worker-repo-ops__lane--skipped":""}"
        data-lane="deploy"
      >
        <span class="worker-repo-ops__lane-k">머지 후 배포</span>
        <span class="worker-repo-ops__lane-v"
          >${N.deploy?c`${m("deploy",N,N.deploy)}
              ${p(N.deploy.timeout_ms)}
              ${Pe?u("skipped","\uC774 workspace\uC5D0\uC11C \uAC74\uB108\uB700"):C()}`:c`선언 없음${u("absent","\uBC30\uD3EC \uC5C6\uC74C")}`}</span
        >
        <span class="worker-repo-ops__lane-d"
          >${Pe?"\uC774 workspace\uC5D0\uC11C\uB294 \uBC30\uD3EC \uC5C6\uC774 \uACE7\uBC14\uB85C \uC815\uB9AC\uB85C \uB118\uC5B4\uAC11\uB2C8\uB2E4.":N.deploy?c`Worker가 <code>.worktrees/.repo-ops-deploy</code>에서 대상
                  SHA로 정렬한 뒤 1회 실행합니다.`:"\uBA38\uC9C0 \uD6C4 \uBC30\uD3EC \uB2E8\uACC4 \uC5C6\uC774 \uACE7\uBC14\uB85C \uC815\uB9AC\uB85C \uB118\uC5B4\uAC11\uB2C8\uB2E4."}</span
        >
        ${N.deploy?re("deploy",ne.deploy):""}
      </div>
    </section>`}function D(N){let Y=N.repo_ops&&typeof N.repo_ops=="object"?N.repo_ops:null;return Y&&(Y.status==="resolved"||Y.status==="absent")?X(Y):Y&&(Y.status==="pending"||Y.status==="error")?c`<section class="worker-repo-ops__vd" data-seam="repo-ops">
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
          ${Y.status==="pending"?"\uC120\uC5B8 \uD655\uC778 \uC911":c`선언 읽기
              실패${Y.error_code?c` — <code>${Y.error_code}</code>`:""}`}
        </div>
      </section>`:c`<section class="worker-repo-ops__vd" data-seam="repo-ops">
      <p class="worker-repo-ops__vd-title">저장소 작업 선언</p>
      <div class="worker-repo-ops__vd-line worker-repo-ops__vd-absent">
        선언 확인 중
      </div>
    </section>`}async function O(N,Y){if(!n)return;let U=await n("worker-repo-ops-opt-out-toggle",{kind:N,opted_out:Y,expected_revision:s()});if(l(U),U&&U.conflict){let ne=await n("worker-repo-ops-opt-out-toggle",{kind:N,opted_out:Y,expected_revision:s()});l(ne)}r()}async function q(){let N=k();if(!n||N===null)return;let Y=await n("worker-repo-operation-deploy-run",{repo_id:N});if(l(Y),!Y||Y.ok!==!0){let U=Y&&typeof Y.reason=="string"?Y.reason:"",ne=Object.hasOwn(x_,U)?x_[U]:U||"\uBC30\uD3EC \uC2E4\uD589\uC744 \uC2DC\uC791\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4";ge(`\uBC30\uD3EC \uC2E4\uD589 \uAC70\uBD80 \u2014 ${ne}`,"error")}else ge("\uBC30\uD3EC \uC2E4\uD589\uC744 \uC2DC\uC791\uD588\uC2B5\uB2C8\uB2E4","success");r()}let B={owned_deploy_worktree_fetch_detached_alignment_recreate:"\uC804\uC6A9 \uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC \uC815\uB82C\xB7\uBCF5\uAD6C",recovered_pre_execution_fetch_timeout_retry_once:"fetch \uD0C0\uC784\uC544\uC6C3 1\uD68C \uBCF5\uAD6C",repo_serial_lock_wait:"\uC800\uC7A5\uC18C \uC21C\uCC28 \uC2E4\uD589 \uB300\uAE30",restart_operation_adoption:"\uC7AC\uC2DC\uC791 \uD6C4 \uC791\uC5C5 \uC778\uACC4",exact_input_exit_zero_evidence_adoption:"\uB3D9\uC77C \uC785\uB825 \uC131\uACF5 \uC99D\uAC70 \uC778\uACC4",descendant_success_covers_ancestor_rows:"\uCD5C\uC2E0 SHA \uC131\uACF5\uC774 \uC774\uC804 \uD589 \uCEE4\uBC84",owned_verify_candidate_cleanup:"\uAC80\uC99D \uC784\uC2DC \uCCB4\uD06C\uC544\uC6C3 \uC815\uB9AC",bounded_single_script_retry_exceeded:"\uB2E8\uC77C \uC2A4\uD06C\uB9BD\uD2B8 \uC7AC\uC2DC\uB3C4 \uD55C\uB3C4 \uCD08\uACFC",repair_session_dispatch:"\uC2E4\uD328 \uD574\uACB0 \uC138\uC158 \uC790\uB3D9 \uC2E4\uD589",baseline_failure_ignore:"\uAE30\uC874 \uC2E4\uD328 \uBB34\uC2DC",config_or_script_deletion_to_bypass_gate:"\uC124\uC815\xB7\uC2A4\uD06C\uB9BD\uD2B8 \uC0AD\uC81C\uB85C \uAC8C\uC774\uD2B8 \uC6B0\uD68C",credential_entry:"\uC790\uACA9\uC99D\uBA85 \uC785\uB825\xB7\uCD9C\uB825",destructive_action:"\uD30C\uAD34\uC801 \uC791\uC5C5",history_rewrite:"\uD788\uC2A4\uD1A0\uB9AC \uC7AC\uC791\uC131",agent_self_report_as_success:"\uC138\uC158 \uC790\uAE30\uBCF4\uACE0\uB97C \uC131\uACF5 \uCC98\uB9AC"};function K(N,Y,U){return c`<div class="worker-repo-ops__policy-group" data-policy=${U}>
      <div class="worker-repo-ops__policy-label">${N}</div>
      <ul class="worker-repo-ops__policy-list">
        ${Y.map(ne=>c`<li data-token=${ne}>
              ${B[ne]||ne}
            </li>`)}
      </ul>
    </div>`}function F(){let N=i(),Y=N.repo_operation_policy&&typeof N.repo_operation_policy=="object"?N.repo_operation_policy:null;return Y?c`<section
      class="worker-repo-ops__repair"
      data-seam="repo-ops-policy"
    >
      <details class="worker-repo-ops__policy" data-seam="policy-lists">
        <summary>
          Worker 자동 처리 기준
          <span class="worker-repo-ops__policy-count"
            >자동 ${(Y.worker_automatic||[]).length} · 금지
            ${(Y.never_automatic||[]).length}</span
          >
        </summary>
        ${Y.supported===!1?c`<div
              class="worker-repo-ops__policy-group"
              data-policy="policy-schema"
            >
              ${`\uACC4\uC57D \uC2A4\uD0A4\uB9C8 \uBD88\uC77C\uCE58 \u2014 \uC790\uB3D9 \uC7AC\uC2DC\uB3C4\uAC00 \uC815\uC9C0\uB418\uC5C8\uC2B5\uB2C8\uB2E4 (v${Y.schema_version})`}
            </div>`:""}
        ${K("Worker\uAC00 \uC790\uB3D9 \uCC98\uB9AC",Y.worker_automatic||[],"worker-automatic")}
        ${K("\uC790\uB3D9\uC73C\uB85C \uD558\uC9C0 \uC54A\uC74C",Y.never_automatic||[],"never-automatic")}
      </details>
    </section>`:""}return{template(){return c`<details class="worker-repo-ops-settings">
        <summary class="worker-repo-ops-settings__summary">
          저장소 작업 · 검증/배포 선언
        </summary>
        ${D(a())} ${F()}
      </details>`}}}var T_=20,vk=5,kk=new Set(["failed","running","queued","retry_pending"]),sc={verify:"\uBA38\uC9C0 \uC804 \uAC80\uC99D",deploy:"\uBA38\uC9C0 \uD6C4 \uBC30\uD3EC",job:"\uBA38\uC9C0 \uD6C4 \uC7A1"},S_={verify:"verify",deploy:"deploy",job:"deploy"};function wk(e){if(typeof e!="string")return"";let t=e.split("/").filter(n=>n.length>0);return t.length>0?t[t.length-1]:""}function $k(e){return!e||typeof e!="object"?"":e.kind==="job"?wk(e.script_path)||sc.job:Object.hasOwn(sc,e.kind)?sc[e.kind]:e.kind}function xk(e,t,n=T_){let r=[];for(let o of Array.isArray(e)?e:[])!o||typeof o!="object"||r.push({type:"operation",id:o.operation_id,at:typeof o.finished_at=="number"?o.finished_at:typeof o.requested_at=="number"?o.requested_at:null,operation:o});for(let o of Array.isArray(t)?t:[])!o||typeof o!="object"||r.push({type:"cleanup",id:o.bead_id,at:typeof o.at=="number"?o.at:null,cleanup:o});return r.sort((o,i)=>o.at===null&&i.at===null?String(o.id||"").localeCompare(String(i.id||"")):o.at===null?1:i.at===null?-1:i.at-o.at),r.slice(0,Math.max(0,n))}function Ak(e){if(e.type==="cleanup")return!0;let t=e.operation;return kk.has(t.state)&&!t.dismissed&&!t.superseded_by}function Sk(e,t,n={}){let r=xk(e,t,1/0),o=n.expanded===!0?T_:vk,i=new Set(r.slice(0,o)),s=r.filter(l=>i.has(l)||Ak(l));return{visible:s,hidden:r.length-s.length}}function E_(e){if(e.type==="cleanup")return"warn";let t=e.operation.state;return t==="succeeded"?"ok":t==="failed"?"fail":"live"}function Ek(e){if(e.type==="cleanup")return"\uBA48\uCDA4";switch(e.operation.state){case"succeeded":return"\uC131\uACF5";case"failed":return"\uC2E4\uD328";case"retry_pending":return"\uC7AC\uC2DC\uB3C4 \uC911";case"running":return"\uC2E4\uD589 \uC911";default:return"\uB300\uAE30"}}function C_(e){let t=e.filter(n=>n.value);return t.length===0?"":c`<details class="worker-ev__details">
    <summary>세부</summary>
    <dl class="worker-ev__kv">
      ${t.map(n=>{let r=n.copy===!0?qr(n.value):n.value;return c`<div>
          <dt>${n.term}</dt>
          <dd>${r}</dd>
        </div>`})}
    </dl>
  </details>`}function R_(e,t="",n=!1){return!e&&!t?"":c`<p
    class="worker-ev__explain${n?" worker-ev__explain--warn":""}"
  >
    <span class="worker-ev__cause">${e}</span>${t?c`<br />${t}`:""}
  </p>`}function Tk(e,t){if(!e||typeof e!="object")return;let n=t&&typeof t=="object"?t.kind:"";if(!Object.hasOwn(S_,n))return;let r=e[S_[n]],o=r&&typeof r=="object"?r.timeout_ms:void 0;return typeof o=="number"&&Number.isFinite(o)?o:void 0}function Ck(e,t){let n=kf(e,t),r=wf(e);return!n&&!r?"":c`<p class="worker-ev__why">
    ${n?c`<span class="worker-ev__why-line">${n}</span>`:""}${r?c`<span class="worker-ev__why-line">${r}</span>`:""}
  </p>`}function Rk(e){return e.state!=="failed"||e.superseded_by||e.dismissed?"":c`<div class="worker-ev__acts">
    <button
      type="button"
      class="worker-ev__btn worker-repo-op__dismiss"
      data-operation-id=${e.operation_id}
      title="사람이 확인한 실패로 접수합니다 — 기록은 그대로 남고 해결 필요 집계에서만 빠집니다"
    >
      기록 닫기
    </button>
  </div>`}function Ok(e,t){let n=e.operation,r=n.state==="failed",o=n.failure?n.failure.code:"";return c`<li
    class="worker-ev"
    data-operation-id=${n.operation_id}
    data-state=${n.state}
  >
    <span
      class="worker-ev__t"
      title=${e.at?on(e.at):""}
      >${$i(e.at)||"\u2014"}</span
    >
    <span class="worker-ev__node" aria-hidden="true"
      ><span class="worker-ev__dot worker-ev__dot--${E_(e)}"></span
    ></span>
    <div class="worker-ev__body">
      <div class="worker-ev__line1">
        <span class="worker-ev__what">${$k(n)}</span>
        <span class="worker-ev__meta"
          >${n.target_base}@${wi(n.target_sha)}${typeof n.elapsed_ms=="number"?` \xB7 ${jr(n.elapsed_ms)}`:""}</span
        >
        <span class="worker-ev__st worker-ev__st--${E_(e)}"
          >${Ek(e)}</span
        >
        ${n.dismissed?c`<span class="worker-ev__st worker-ev__st--quiet">접수됨</span>`:""}
        ${n.superseded_by?c`<span class="worker-ev__st worker-ev__st--quiet">덮임</span>`:""}
        ${n.source==="manual"?c`<span
              class="worker-ev__st worker-ev__st--manual"
              title="사람이 배포 실행을 눌러 시작한 작업입니다"
              >수동</span
            >`:""}
      </div>
      ${r?R_(vf(n.failure_kind,o)):""}
      ${Ck(n,Tk(t,n))}
      ${Rk(n)}
      ${C_([{term:"\uC2E4\uD328 \uCF54\uB4DC",value:r?o:""},{term:"script",value:[n.script_path||"",n.script_blob_sha?`blob ${wi(n.script_blob_sha)}`:"",Number.isInteger(n.exit_code)?`exit ${n.exit_code}`:""].filter(Boolean).join(" \xB7 ")},{term:"\uB85C\uADF8",value:n.log_path||"",copy:!0},{term:"\uCD9C\uB825",value:n.output_tail||""}])}
    </div>
  </li>`}function Ik(e){let t=e.cleanup,n=Fr(t.step);return c`<li
    class="worker-ev"
    data-bead-id=${t.bead_id}
    data-state="cleanup_stalled"
  >
    <span
      class="worker-ev__t"
      title=${e.at?on(e.at):""}
      >${$i(e.at)||"\u2014"}</span
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
        ${Td(t.step).map(r=>c`<li
              class="worker-step worker-step--${r.state}"
              data-step=${r.step}
            >
              <span class="worker-step__pip" aria-hidden="true"></span>
              <span class="worker-step__lb">${r.label}</span>
            </li>`)}
      </ol>
      ${R_(wr(t.reason),typeof t.retry_count=="number"&&t.retry_count>0?`${t.retry_count}\uD68C \uC790\uB3D9 \uC7AC\uC2DC\uB3C4 \uD6C4\uC5D0\uB3C4 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4 \u2014 \uC815\uB9AC\uB97C \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uBA74 \uBA48\uCD98 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4.`:"\uC815\uB9AC\uB97C \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uBA74 \uBA48\uCD98 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4.",!0)}
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
      ${C_([{term:"\uC2E4\uD328 \uCF54\uB4DC",value:t.reason||""},{term:"\uC9C4\uB2E8",value:t.detail||""},{term:"\uB85C\uADF8",value:t.log_path||"",copy:!0},{term:"\uCD9C\uB825",value:t.output_tail||""}])}
    </div>
  </li>`}function Lk(e){let t=typeof e.hidden=="number"?e.hidden:0,n=e.expanded===!0;return c`<section class="worker-repo-drawer" data-seam="repo-ops-timeline">
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
          ${e.events.map(r=>r.type==="cleanup"?Ik(r):Ok(r,e.repo_ops))}
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
  </section>`}function O_(e,t={}){let n=null;function r(){if(n===null){ct(c``,e);return}let s=Sk(n.operations,n.cleanup_failures,{expanded:n.expanded});ct(Lk({events:s.visible,hidden:s.hidden,expanded:n.expanded,repo:n.repo,repo_ops:n.repo_ops}),e)}e.addEventListener("click",s=>{let l=s.target;if(l?.closest?.('[data-seam="repo-ops-close"]')){i();return}l?.closest?.('[data-seam="repo-ops-more"]')&&n&&(n.expanded=!n.expanded,r())});function o(s){n={operations:s.operations,cleanup_failures:s.cleanup_failures,repo:s.repo||"",repo_ops:s.repo_ops||null,expanded:!1},r()}function i(){n!==null&&(n=null,r(),t.onClose&&t.onClose())}return{open:o,close:i,isOpen:()=>n!==null,refresh(s){n&&(n={operations:s.operations,cleanup_failures:s.cleanup_failures,repo:s.repo||"",repo_ops:s.repo_ops||null,expanded:n.expanded},r())}}}var Dk="session-preferred",Pk=["external_roundtrip","user_feedback_loop"];function I_(e,t){if(!Yo(e).includes(Dk)||typeof t!="object"||t===null)return"";let n=t.session_preferred_reason;return typeof n=="string"&&Pk.includes(n)?n:""}var Mk="spec-after-blocker";function L_(e,t){return Yo(e).includes(Mk)&&Array.isArray(t)&&t.length>0}var qk=Ut("views:worker:adapter"),Nk="tab:worker:ready",jk="tab:worker:blocked",Fk="tab:worker:in-progress",Bk="tab:worker:resolved",Uk="tab:worker:closed",Wk="\u{1F512} blocked",zk={revision:0,auto_advance:!1,auto_merge:!1,slots:ji,queue:[],serial_lanes:[],serial_lane_count:0,pr_wait:[],done:[]},Hk=["claude_account","codex_account"],Kk=[...po,...Hk];function Gk(e){let t=e&&e.parent;return(typeof t=="string"?t.length>0:!!(t&&t.id))||/\.\d+$/.test(e&&e.id||"")}function Yk(e){let t=e&&typeof e=="object"?e.awaiting_user:void 0,n=typeof t=="string"?t.trim():"";return n.length>0?`${ll}: ${n}`:ll}function $r(e){return e&&typeof e=="object"?e:{}}function Vk(e){let t={};for(let n of Kk){let r=e[n];typeof r=="string"&&r.length>0&&(t[n]=r)}return t}function Qk(e){let t=new Map;for(let r of e){if(!r||typeof r.id!="string"||r.id.length===0)continue;let o=$r(r.metadata).carried_from;if(!(typeof o!="string"||o.length===0))for(let i of As(r)){let s=t.get(i);s||(s=new Set,t.set(i,s)),s.add(r.id)}}let n=new Map;for(let[r,o]of t)n.set(r,[...o].sort());return n}function Xk(e){let t=e.replace(/\/+$/,""),n=t.lastIndexOf("/");return n>=0?t.slice(n+1):t}function D_(e={}){let{queueStore:t,issueStores:n,transport:r,getWorkspacePath:o,onInvalidate:i}=e,s=n?to(n):null,l=new Map,a={},u=null,d=0,p=null,m=!1;function g(){m||!i||i()}function k(q){return u===q?a:{}}async function T(){if(!r||m)return;let q=o?.()||"";if(u===q||p&&p.key===q&&p.generation===d)return;let B=++d;p={key:q,generation:B};let K=null;try{K=await Promise.resolve(r("get-session-defaults",{}))}catch(F){if(B!==d)return;p=null,qk("get-session-defaults failed: %o",F),g();return}B===d&&(a=K&&typeof K.values=="object"&&K.values!==null?{...K.values}:{},u=q,p=null,g())}function C(){u=null,d+=1,T()}function te(){for(let[q,B]of l)B==="failed"&&l.delete(q)}function re(q,B){return s?s.selectBoardColumn(q,B):[]}function X(q,B,K,F){let N=new Set(K.map(H=>H.id)),Y=new Set,U=new Map,ne=[];for(let H of[...B,...K]){if(Y.has(H.id)||Gk(H))continue;let ie=Vo(H,q);ie.location===null&&(Y.add(H.id),U.set(H.id,ie),ne.push(H))}let ve=b_(ne,Hr(F)),Pe=$r(q.bead_scope);return ve.map(H=>{let ie=U.get(H.id),_e=Jr(H),Te=_e.evidence==="published",V=typeof H.workflow?.route=="string"&&H.workflow.route||(H.metadata&&typeof H.metadata.route=="string"?H.metadata.route:""),le=ie.worker_ineligible,Z=le||!Object.hasOwn(H,"labels")?"":I_(H.labels,H.metadata),be=N.has(H.id),Oe=be?As(H):[],ke=[];be&&Oe.length===0&&ke.push(Wk),ie.awaiting_user&&ke.push(Yk(H.metadata)),ie.missing_description?ke.push("missing_description"):ie.spec==="conflict"?ke.push("spec_id_conflict"):ie.spec==="none"?ke.push("spec \uC5C6\uC74C"):ie.spec==="draft"&&ke.push("spec \uBBF8\uBC1C\uD589(draft)");let Ce=Pe[H.id];return{bead_id:H.id,title:H.title||H.id,route:V,spec_id:_e.conflict?"":_e.path,published:Te,blocked:be,blocked_by:Oe,labels:Array.isArray(H.labels)?H.labels:[],created_at:H.created_at,updated_at:H.updated_at,status:H.status,workflow:H.workflow||null,exec_pins:Vk($r(H.metadata)),rec:null,...Ce&&Array.isArray(Ce.scope)?{scope:Ce.scope}:{},eligible:ie.placeable,route_ok:ie.route_ok,awaiting_user:ie.awaiting_user,missing_description:ie.missing_description,placement_spec:ie.spec,reason:ke.join(" \xB7 "),worker_ineligible:le,session_preferred:Z.length>0,session_preferred_reason:Z,spec_after_blocker:L_(H.labels,Oe),release_info:H.release_info,dependents_info:H.dependents_info}})}function D(q){let[B,K,F,N,Y]=q,U=Vs([...B,...K,...F,...N,...Y]),ne=Qk([...B,...K,...F,...N]),ve={},Pe=(H,ie)=>{if(!H||typeof H.id!="string"||H.id.length===0)return;let _e=ve[H.id]||(ve[H.id]={});if(typeof H.priority=="number"&&!("priority"in _e)&&(_e.priority=H.priority),typeof H.from_id=="string"&&!("from_id"in _e)&&(_e.from_id=H.from_id),ie&&!("metadata"in _e)){_e.metadata=$r(H.metadata);let Te=$r(H.workflow).route;typeof Te=="string"&&Te.length>0&&(_e.route=Te)}};for(let H of[...B,...K,...F])Pe(H,!0);for(let H of[...N,...Y])Pe(H,!1);for(let H of new Set([...Object.keys(ve),...U.keys()])){let ie=Qs(U,H);if(ie.total>0){let _e=ve[H]||(ve[H]={});_e.rollup=ie}}for(let[H,ie]of ne){let _e=ve[H]||(ve[H]={});_e.carried_to=ie}return ve}function O(q,B,K,F){let N=new Set((Array.isArray(q.done)?q.done:[]).map(U=>U?.bead_id).filter(U=>typeof U=="string")),Y=[];for(let U of B){let ne=ur(U.closed_at);if(typeof U.id!="string"||N.has(U.id)||ne===null||F!==void 0&&ne<F||typeof U.comment_count!="number"||U.comment_count<=0)continue;let ve=`${K}\0${U.id}\0${String(U.updated_at)}\0${U.comment_count}`,Pe=l.get(ve);if(Pe===void 0&&r&&(l.set(ve,"pending"),Promise.resolve(r("get-comments",{id:U.id})).then(ie=>{let _e=Array.isArray(ie)&&ie.some(Te=>ta(typeof Te?.text=="string"?Te.text:"")?.lane==="session");l.set(ve,_e?"session":"not-session"),g()}).catch(()=>{l.set(ve,"failed"),g()})),Pe!=="session")continue;let H=ur(U.started_at);Y.push({id:U.id,title:U.title||U.id,reason:"",draggable:!1,done:!0,lane:"done",selectable:!1,selected:!1,badges:["\uC138\uC158 \uC791\uC5C5"],alert:!1,usage:null,work_ms:H!==null&&ne>=H?ne-H:null,work_kind:"session",done_at:ne,created_at:U.created_at,updated_at:U.updated_at})}return Y}return{read(q){if(!t)return{workspaces:[],workspaces_state:[]};let B=t.get()||zk,K=o?.()||"",F=q&&typeof q.done_since=="number"?q.done_since:void 0,N=re(Nk,"ready"),Y=re(jk,"blocked"),U=re(Fk,"in_progress"),ne=re(Bk,"resolved"),ve=re(Uk,"closed");return{workspaces:[{...B,bead_titles:{...$r(B.bead_titles),...Object.fromEntries([...N,...Y].filter(Pe=>Pe&&typeof Pe.id=="string").map(Pe=>[Pe.id,Pe.title||Pe.id]))},root_dir:K,name:Xk(K),runnable:X(B,N,Y,q?q.candidate_sort:void 0),session_done:O(B,ve,K,F),bead_overlay:D([N,Y,U,ne,ve])}],workspaces_state:[{root_dir:K,revision:B.revision,auto_advance:B.auto_advance,auto_merge:B.auto_merge,slots:typeof $r(B.workspace_info).slots=="number"?$r(B.workspace_info).slots:B.slots,runner_catalog:B.runner_catalog,execution_defaults:B.execution_defaults,session_defaults:k(K),orchestration_model:B.orchestration_model,orchestration_effort:B.orchestration_effort,orchestration_speed:B.orchestration_speed,quick_fix_orchestration_model:B.quick_fix_orchestration_model,quick_fix_orchestration_effort:B.quick_fix_orchestration_effort,quick_fix_orchestration_speed:B.quick_fix_orchestration_speed,issue_prefix:""}]}},ensureSessionDefaults(){T()},refreshSessionDefaults:C,notifyIssuesChanged:te,destroy(){m=!0,d+=1,p=null,l.clear()}}}var ka=1,P_=5,Zk={root_dir:"",name:"",auto_advance:!1,auto_merge:!1,slots:ka,revision:0,runner_catalog:{},items:[],sublanes:{parallel:[],serial:[]},serial_lane_count:0,raw_queue_length:0,live_count:0,over_cap:!1,merge:{positions:new Map,resolutions:new Map,continuations:new Map,authorities:new Map,state:{active:null,failures:{},waiting:null},auto_excluded:[],running:!1},token_total:null,cleanup_failures:[],declared_base:null,repo_operations:[]};function cn(e){return e&&typeof e=="object"?e:{}}var N_="beads-ui.worker.candidate-filter",ic={show_blocked:!1,readiness:"all"};function Jk(){try{let e=window.localStorage.getItem(N_);if(!e)return{...ic};let t=JSON.parse(e);if(!t||typeof t!="object")return{...ic};let n=t.readiness;return{show_blocked:t.show_blocked===!0,readiness:n==="ready"||n==="not_ready"?n:"all"}}catch{return{...ic}}}function ew(e){try{window.localStorage.setItem(N_,JSON.stringify(e))}catch{}}var j_="bdui.worker.done-range";function tw(){try{let e=window.localStorage.getItem(j_);return e===null?"today":Wn(e)}catch{return"today"}}function nw(e){try{window.localStorage.setItem(j_,e)}catch{}}function M_(e){let t=Array.isArray(e)&&e.length>0?e[0]:null;if(!t)return"";let n=typeof t.title=="string"?t.title:t.id||"";return n.length>22?`${n.slice(0,22)}\u2026`:n}function rw(e){return e==="receipt_not_current"?"\uB9AC\uBDF0 \uD6C4\uC5D0\uB3C4 \uC601\uC218\uC99D\uC774 \uCD5C\uC885 head\uC5D0 \uC720\uD6A8\uD558\uC9C0 \uC54A\uC74C":e==="cancelled"?"\uB9AC\uBDF0 \uC138\uC158 \uCDE8\uC18C\uB428":e.startsWith("launch_failed:")?`\uB9AC\uBDF0 \uC138\uC158 \uC2DC\uC791 \uC2E4\uD328(${e.slice(14)})`:e.startsWith("session_failed:")?`\uB9AC\uBDF0 \uC138\uC158 \uBE44\uC815\uC0C1 \uC885\uB8CC(${e.slice(15)})`:`\uB9AC\uBDF0 \uC138\uC158 \uC2E4\uD328(${e})`}function q_(e){if(e.startsWith("receipt_unbacked:"))return`\uC2E4\uD589 \uC601\uC218\uC99D \uC790\uB3D9 \uAC80\uC99D \uBD88\uAC00(${e.slice(17)}) \u2014 [\uBA38\uC9C0] \uD074\uB9AD\uC73C\uB85C \uC218\uB3D9 \uC9C4\uD589 \uAC00\uB2A5`;switch(e){case"not_in_pr_wait":return"PR \uB300\uAE30 \uC0C1\uD0DC \uB3D9\uAE30\uD654 \uC2E4\uD328";case"resolution_round_cap":return"\uCDA9\uB3CC \uD574\uC18C 2\uD68C \uCD08\uACFC";case"resolution_rebase_cap":return"\uD050 \uC7AC\uCDA9\uB3CC 3\uD68C \uCD08\uACFC";case"resolution_timeout":return"\uCDA9\uB3CC \uD574\uC18C \uB300\uAE30 \uC2DC\uAC04 \uCD08\uACFC";case"resolution_refused":return"\uD574\uC18C \uC138\uC158 \uB514\uC2A4\uD328\uCE58 \uAC70\uBD80";case"worktree_missing":return"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uD574\uC18C \uD544\uC694";case"worktree_restore_branch_mismatch":return"\uC6CC\uD06C\uD2B8\uB9AC \uBCF5\uC6D0 \uC2E4\uD328 \u2014 \uBE0C\uB79C\uCE58 \uC774\uB984 \uBD88\uC77C\uCE58";case"worktree_restore_path_exists":return"\uC6CC\uD06C\uD2B8\uB9AC \uBCF5\uC6D0 \uC2E4\uD328 \u2014 \uACBD\uB85C \uC774\uBBF8 \uC788\uC74C";case"worktree_restore_branch_missing":return"\uC6CC\uD06C\uD2B8\uB9AC \uBCF5\uC6D0 \uC2E4\uD328 \u2014 origin\uC5D0 \uBE0C\uB79C\uCE58 \uC5C6\uC74C";case"worktree_restore_branch_diverged":return"\uC6CC\uD06C\uD2B8\uB9AC \uBCF5\uC6D0 \uC2E4\uD328 \u2014 \uB85C\uCEEC \uBE0C\uB79C\uCE58\uAC00 origin\uACFC \uB2E4\uB984";case"worktree_restore_failed":return"\uC6CC\uD06C\uD2B8\uB9AC \uBCF5\uC6D0 \uC2E4\uD328";case"merge_unconfirmed_timeout":return"\uBA38\uC9C0 \uD655\uC778 \uC2DC\uAC04 \uCD08\uACFC";case"pr_closed_unmerged":return"PR \uB2EB\uD798";case"merge_error":return"\uBA38\uC9C0 \uC624\uB958";case"spec_id_missing":return"\uC2A4\uD399 ID \uAE30\uB85D \uC5C6\uC74C";default:return e}}function ow(e){if(e==="lane_occupied")return"\uC2E4\uD589 \uB808\uC778\uC5D0 \uB0A8\uC544 \uC788\uC5B4 \uBA38\uC9C0 \uB300\uC0C1\uC774 \uC544\uB2D9\uB2C8\uB2E4";let t="\uBA38\uC9C0 \uD050\uC5D0 \uB123\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 (\uC774\uBBF8 \uB300\uAE30 \uC911\uC774\uAC70\uB098 \uB300\uC0C1 \uC544\uB2D8)";return typeof e=="string"&&e.length>0?`${t}: ${e}`:t}function sw(e){return!e||typeof e!="object"?"\uC138\uC158 \uAE30\uB3D9 \uC751\uB2F5\uC744 \uBC1B\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4":e.conflict===!0?"\uD050\uAC00 \uBC14\uB00C\uC5B4 \uD074\uB9AD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uB20C\uB7EC\uC8FC\uC138\uC694":e.session==="already_running"?`\uC774\uBBF8 \uC5F4\uB824 \uC788\uC2B5\uB2C8\uB2E4 \xB7 ${e.tmux_window||"?"}`:e.launched!==!0?`\uC138\uC158 \uAE30\uB3D9 \uC2E4\uD328: ${e.reason||"unknown"}`:e.mode==="fork"?null:`\uC0C8 \uC138\uC158\uC73C\uB85C \uC2DC\uC791 (${e.fallback_reason||"unknown"})`}function iw(e){return e&&e.launched===!0?"success":"error"}function aw(e){if(e==="worker_sessions_busy")return"\uD574\uC18C \uB300\uAE30 \u2014 \uC2E4\uD589 \uC2AC\uB86F \uB300\uAE30 \uC911";if(typeof e!="string"||!e.startsWith("completion_waiting:"))return null;let t=e.slice(19);if(t.length===0)return null;switch(t){case"gating":return"\uBA38\uC9C0 \uC870\uAC74 \uD655\uC778 \uC911";case"merging":return"\uBA38\uC9C0 \uC911";case"cleaning":return"\uB9C8\uBB34\uB9AC \uC911";case"paused":return"\uC790\uB3D9 \uC9C4\uD589 \uC77C\uC2DC\uC815\uC9C0";case"needs_human":return"\uD655\uC778 \uD544\uC694";default:return null}}function lw(e){if(!e||typeof e!="object")return null;switch(e.state){case"waiting":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC911",live:!0};case"yielded":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uACC4\uC18D \uC911 \xB7 \uC644\uB8CC \uD6C4 \uC6B0\uC120 \uBA38\uC9C0",live:!0};case"ready":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC644\uB8CC \xB7 \uC7AC\uAC80\uC99D \uB300\uAE30",live:!1};default:return null}}var cw=new Set(["paused","needs_human","waiting_metadata","reviewing","retrying"]),uw=new Set(["waiting_metadata","reviewing","retrying"]),ac=new Set(["review_receipt_missing","review_receipt_stale","review_receipt_invalid","review_receipt_undetermined"]);function dw(e){let t=e&&typeof e=="object"?e.auto_resolution:null,n=t&&typeof t=="object"&&!Array.isArray(t)?t:null;if(!n||!e)return null;let r=typeof n.origin_reason=="string"&&n.origin_reason.length>0?`\uC6D0 \uC0AC\uC720: ${n.origin_reason}`:"";switch(e.phase){case"waiting_metadata":return{label:"\uC815\uC815 \uB300\uAE30",details:[r,"\uBA54\uD0C0\uB370\uC774\uD130 \uC815\uC815\uC774 \uAD00\uCE21\uB418\uBA74 \uC790\uB3D9 \uC7AC\uAC1C"].filter(Boolean),live:!1};case"retrying":{let o=Number.isInteger(n.attempts)?Math.max(0,Number(n.attempts)):0,i=Number.isInteger(n.attempt_cap)&&Number(n.attempt_cap)>0?Number(n.attempt_cap):0,s=typeof n.next_at=="number"?on(n.next_at):"",l=typeof n.last_error=="string"&&n.last_error.length>0?n.last_error:"";return{label:i>0?`\uC7AC\uC2DC\uB3C4 ${Math.min(o,i)}/${i}`:`\uC7AC\uC2DC\uB3C4 ${o}`,details:[r,s?`\uB2E4\uC74C \uC2DC\uAC01 ${s}`:"",l?`\uB9C8\uC9C0\uB9C9 \uC624\uB958: ${l}`:""].filter(Boolean),live:!0}}default:return null}}function pw(e){if(typeof e!="string")return"";for(let t of["retry_exhausted:","auto_review_exhausted:"])if(e.startsWith(t))return e.slice(t.length);return""}function fw(e,t=null){if(!e||typeof e!="object")return null;let n="";switch(e.phase){case"gating":n="\uBA38\uC9C0 \uC870\uAC74 \uD655\uC778 \uC911";break;case"merging":n="\uBA38\uC9C0 \uC911";break;case"cleaning":n="\uB9C8\uBB34\uB9AC \uC911";break;case"waiting_metadata":case"reviewing":case"retrying":if(!t)return null;n=t.label;break;case"paused":n="\uC790\uB3D9 \uC9C4\uD589 \uC77C\uC2DC\uC815\uC9C0";break;case"needs_human":n="\uD655\uC778 \uD544\uC694";break;case"completed":return null;default:return null}let r=[n];e.head_sha&&r.push(`head ${e.head_sha}`),e.base_sha&&r.push(`base ${e.base_sha}`),(e.failure_stage||e.failure_reason)&&r.push(`${e.failure_stage||"failure"} \xB7 ${e.failure_reason||"\uC6D0\uC778 \uBBF8\uC0C1"}`);let o=pw(e.terminal_reason);o&&r.push(`\uC6D0 \uC0AC\uC720: ${o}`);let i=e.phase==="needs_human"&&!o?zr(e.terminal_reason):null;i&&r.push(e.failure_stage?`${e.failure_stage} \xB7 ${i}`:i);for(let s of t?t.details:[])r.push(s);return e.active_attempt_id&&r.push(`attempt ${e.active_attempt_id}`),e.evidence&&r.push(e.evidence),e.log_path&&r.push(e.log_path),{badge:n,title:r.join(`
`),alert:e.phase==="needs_human",lock_actions:!cw.has(e.phase)}}function _w(e){if(!e||typeof e!="object")return[];let t=e.blocking_codes;return Array.isArray(t)?t.filter(n=>typeof n=="string"&&n.length>0):[]}function mw(e){if(!e||typeof e!="object")return[];let t=e.badge_codes;return Array.isArray(t)?t.filter(n=>typeof n=="string"&&n.length>0):[]}function gw(e){let t=e.queue_failure?`\uBA38\uC9C0 \uC2E4\uD328 \uC6D0\uBB38: ${e.queue_failure}`:e.auto_skip?`\uC790\uB3D9 \uC81C\uC678 \uC6D0\uBB38: ${e.auto_skip}`:"",n=(i,s={})=>{let l=[s.title||"",t].filter(Boolean);return{label:i,title:l.join(`
`),live:s.live===!0,alert:s.alert===!0}};if(e.continuation_required)return n("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694",{alert:!0});if(e.queueing)return e.queueing==="cleanup"?n("\uC815\uB9AC \uC7AC\uC2DC\uB3C4 \uC694\uCCAD \uC911",{title:"\uC11C\uBC84 \uC751\uB2F5\uC744 \uAE30\uB2E4\uB9AC\uB294 \uC911\uC785\uB2C8\uB2E4",live:!0}):n("\uD050 \uB4F1\uB85D \uC911",{title:"\uBA38\uC9C0 \uD050\uC5D0 \uB123\uB294 \uC911 \u2014 \uC11C\uBC84 \uC751\uB2F5\uC744 \uAE30\uB2E4\uB9BD\uB2C8\uB2E4",live:!0});if(e.merge_step)return e.gate?.tier==="merged"?n("\uBA38\uC9C0\uB428",{title:e.merge_step.label,alert:e.merge_step.failed===!0}):n("\uBA38\uC9C0 \uC911",{title:e.merge_step.label,live:!0});if(e.conflict_badge)return n(e.conflict_badge,{live:e.conflict_live===!0});if(e.auto_resolution)return n(e.auto_resolution.label,{title:e.auto_resolution.details.join(`
`),live:e.auto_resolution.live===!0});if(e.recovery?.lock_actions)return n(e.recovery.badge,{title:e.recovery.title,live:!0});if(e.cleanup_failed)return n(e.cleanup_label?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${e.cleanup_label}`:"\uC815\uB9AC \uBA48\uCDA4",{title:e.cleanup_failed.reason||"",alert:!0});if(e.base_exception)return n("\uB2E4\uB978 base \uB300\uC0C1",{title:e.base_exception,alert:!0});let r=_w(e.receipt_check),o=e.conflicting||e.gate?.reason==="base_behind"||r.length>0;if(e.auto_pending&&o)return n("\uD655\uC778 \uC911",{title:"\uBA38\uC9C0 \uD050\uAC00 \uC790\uB3D9\uC73C\uB85C \uCC98\uB9AC \uC911 \u2014 \uB2E4\uC74C \uAD00\uCE21\uC744 \uAE30\uB2E4\uB9BD\uB2C8\uB2E4",live:!0});if(e.conflicting)return n("\uCDA9\uB3CC \uD574\uACB0 \uD544\uC694",{alert:!0});if(e.gate?.reason==="base_behind")return n("base \uAC31\uC2E0 \uD544\uC694",{alert:!0});if(ac.has(e.gate?.reason)){let i=e.gate.reason==="review_receipt_stale"?"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC774 \uD604\uC7AC head\uC758 \uC870\uC0C1\uC774 \uC544\uB2D9\uB2C8\uB2E4 \u2014 \uD788\uC2A4\uD1A0\uB9AC \uC7AC\uC791\uC131\xB7\uBE0C\uB79C\uCE58 \uB9AC\uC14B \uBCF5\uAD6C \uACBD\uB85C\uC785\uB2C8\uB2E4. [\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0]\uAC00 \uC774 \uBCF4\uB958\uC758 \uCD9C\uAD6C\uC785\uB2C8\uB2E4":e.gate.reason==="review_receipt_invalid"?"\uB9AC\uBDF0 \uC601\uC218\uC99D \uAE30\uB85D\uC774 \uC131\uB9BD\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4 \u2014 [\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0]\uAC00 \uC774 \uBCF4\uB958\uC758 \uCD9C\uAD6C\uC785\uB2C8\uB2E4":e.gate.reason==="review_receipt_undetermined"?"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC758 ancestry probe\uB97C \uC644\uB8CC\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 \u2014 [\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0]\uAC00 \uC774 \uBCF4\uB958\uC758 \uCD9C\uAD6C\uC785\uB2C8\uB2E4":"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 [\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0]\uAC00 \uC774 \uBCF4\uB958\uC758 \uCD9C\uAD6C\uC785\uB2C8\uB2E4";if(e.review_session?.active===!0)return n(e.review_session.origin==="auto"?"\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694 \xB7 \uC790\uB3D9 \uB9AC\uBDF0 \uC138\uC158 \uC2E4\uD589 \uC911":"\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694 \xB7 \uB9AC\uBDF0 \uC138\uC158 \uC2E4\uD589 \uC911",{title:`${i}
\uB9AC\uBDF0 \uC138\uC158\uC774 \uC2E4\uD589 \uC911\uC785\uB2C8\uB2E4 \u2014 \uB05D\uB098\uBA74 \uC601\uC218\uC99D\uC744 \uB2E4\uC2DC \uD310\uC815\uD569\uB2C8\uB2E4`,live:!0});if(e.auto_review_wait==="slot")return n("\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694 \xB7 \uB9AC\uBDF0 \uC138\uC158 \uC2AC\uB86F \uB300\uAE30",{title:`${i}
\uC2E4\uD589 \uC2AC\uB86F\uC774 \uBE44\uBA74 \uC790\uB3D9\uC73C\uB85C \uB9AC\uBDF0 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4. \uC9C0\uAE08 \uD074\uB9AD\uD558\uBA74 \uC989\uC2DC \uB744\uC6C1\uB2C8\uB2E4`,live:!0});if(e.review_session?.failure){let s=e.review_dispatch?.state==="exhausted"&&e.review_session.origin==="auto";return n(`\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694 \xB7 ${s?"\uC790\uB3D9 \uB9AC\uBDF0 1\uD68C \uC18C\uC9C4 \xB7 ":""}${rw(e.review_session.failure)}`,{title:`${i}
\uC9C1\uC804 \uB9AC\uBDF0 \uC138\uC158 \uC885\uB8CC \uC0AC\uC720: ${e.review_session.failure}`,alert:!0})}return n("\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694",{title:i,alert:!0})}return e.gate?.reason==="spec_id_missing"?n("\uC2A4\uD399 ID \uB204\uB77D",{title:"native spec_id \uBBF8\uAE30\uB85D \u2014 bd update --spec-id \uD544\uC694",alert:!0}):r.length>0?n(`\uC601\uC218\uC99D \uD655\uC778 \uD544\uC694 \xB7 ${r[0]}`,{title:`\uC131\uB9BD\uD558\uC9C0 \uC54A\uB294 \uC2E4\uD589 \uC601\uC218\uC99D \u2014 ${r.join(", ")}`,alert:!0}):e.recovery?n(e.recovery.badge,{title:e.recovery.title,alert:!0}):e.gate?.tier==="verify"&&e.gate.gate_badge==="\uAC80\uC99D \uC2E4\uD328"?n("\uAC80\uC99D \uC2E4\uD328",{title:e.gate.reason||"",alert:!0}):e.queue_failure?n(`\uBA38\uC9C0 \uC2E4\uD328 \u2014 ${q_(e.queue_failure)}`,{title:e.queue_failure,alert:!0}):e.auto_skip?n(`\uC790\uB3D9 \uC81C\uC678 \u2014 ${q_(e.auto_skip)}`,{title:e.auto_skip,alert:!0}):e.queued&&!e.queue_active?n(`\uBA38\uC9C0 \uB300\uAE30 #${e.queue_position}`):e.gate?.enabled===!0?n("\uBA38\uC9C0 \uAC00\uB2A5"):e.gate?.tier==="merged"?n("\uBA38\uC9C0\uB428"):e.gate?.tier==="closed_unmerged"?n("\uB2EB\uD798",{alert:!0}):e.activity?n("\uD655\uC778 \uC911",{live:!0}):e.gate?.tier==="undecidable"||e.gate?.reason==="mergeability_unknown"?n("\uC0C1\uD0DC \uD655\uC778 \uC2E4\uD328",{title:e.gate.reason||"",alert:!0}):e.gate?.tier==="unobserved"||e.gate?.tier==="verify"||e.gate?.gate_badge==="\uAD00\uCE21 \uB300\uAE30"?n("\uD655\uC778 \uC911"):e.gate?.gate_badge?n(e.gate.gate_badge,{title:e.gate.reason||"",alert:e.gate.enabled!==!0}):null}function hw(e,t,n,r,o=null,i=null,s=null,l=!1,a=null,u=!0,d=null,p=null,m=null,g={},k=!1,T={},C=null,te={active:!1,failure:null,origin:null},re=!1){let X=!!a&&a.position>0,D=!!a?.continuation_action&&a.continuation_action.continuation===null,O=!!a&&a.active===!0,q=a&&a.failure||null,B=aw(a?a.waiting:null),K=n[e]||null,F=K&&K.gate?K.gate:null,N=K&&K.pr?K.pr:null,Y=lw(a?a.resolution:null),U=dw(m),ne=fw(m,U),ve=a&&a.authority||null,Pe=a&&a.review_dispatch||null,H=a?.hold?.auto_review_wait==="slot"?"slot":null,ie=!!m&&typeof m=="object"&&uw.has(m.phase),_e=X&&!O&&(!ve||ie||ve.source==="automatic"&&!k),Te=s==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":Y?Y.badge:s==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC911":B,V=!!F&&F.base_badge==="\uCDA9\uB3CC",le=!!F&&F.enabled===!0,Z=ns({bead_id:e,merge_sha:T.merge_sha,cleanup_cursor:T.cleanup_cursor,merge_progress:i&&i.merge_progress?i.merge_progress:null,cleanup_failed:r,repo_operations:T.repo_operations}),be=qi(Z),Oe=i&&!Z&&(i.queueing??null)?i.queueing:null,ke=!!r&&["repo_operations","post_merge_jobs","child_sweep","branch_cleanup","parent_close"].includes(r.step)&&!!F&&F.tier==="merged",Ce=r&&r.step==="repo_operations"&&Z?.failed===!0&&(Z.step==="deploy"||Z.step==="verify")?Z.step:null,ot=l&&!!r&&!!F&&F.tier==="merged",st=_e&&(le||V||F?.reason==="base_behind"||ac.has(F?.reason)||ke||ot),Q=ac.has(F?.reason),oe=l&&V&&u===!1,se=rr(g,e,{external:l,merge_active:O||Z?.step==="merge",merge_queued:X,conflict_active:!!s,cleanup_active:be,merged:!!r||F?.tier==="merged"}),pe=!!se.operation,Se=!!r||m?.phase==="needs_human"||!!se.error,me=X&&!q&&!D&&!ke&&!(ne&&ne.lock_actions),Re=gw({auto_pending:me,continuation_required:D,queueing:Oe,merge_step:Z,conflict_badge:Te,conflict_live:Y?.live===!0||s==="running",auto_resolution:U,recovery:ne,cleanup_failed:r,cleanup_label:r?Fr(r.step):null,base_exception:p,conflicting:V,gate:F,receipt_check:K&&K.receipt_check?K.receipt_check:null,queue_failure:q,auto_skip:d,queued:X,queue_active:O,queue_position:a?a.position:0,review_session:te,review_dispatch:Pe,auto_review_wait:H,activity:Te?null:i&&i.activity||null}),je=Re?.live===!0&&Re.title?c`<span title=${Re.title}>${Re.label}</span>`:Re?.label||null,Qe=mw(K&&K.receipt_check?K.receipt_check:null);return{id:e,title:l?c`${t}<span class="muted"> · 세션</span>`:t,reason:r&&Z?.active!==!0?Mi(r.step):"PR \uB300\uAE30",draggable:!1,done:!0,lane:"pr_wait",...C?{dependency_chips:C}:{},external:l,pr_number:N&&typeof N.number=="number"?N.number:null,pr_url:N&&typeof N.url=="string"?N.url:"",completion_badge:Re?.live!==!0&&Re?.title?Re.label:null,completion_title:Re?.title||"",...m?.phase==="needs_human"&&typeof m.log_path=="string"&&m.log_path.length>0?{log_path:m.log_path}:{},...Qe.length>0?{receipt_badge:{codes:Qe}}:{},badges:je?[je]:[],live_badge:Re?.live===!0?je:null,usage:o,alert:Re?.alert===!0,merge_action:F?.tier==="merged"&&!ke&&!ot?!1:!X||D||_e||Q,cancel_action:X&&!D,cancel_enabled:!O&&!(ne&&ne.lock_actions),cancel_title:ne&&ne.lock_actions?`${ne.badge} \u2014 \uC911\uB2E8\uD558\uB824\uBA74 \uC0C1\uB2E8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8\uC744 \uC0AC\uC6A9\uD558\uC138\uC694`:O?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"\uBA38\uC9C0 \uD050\uC5D0\uC11C \uC774 \uD56D\uBAA9\uC744 \uBE8D\uB2C8\uB2E4 (\uB2E4\uC2DC [\uBA38\uC9C0]\uB85C \uB123\uC744 \uC218 \uC788\uC2B5\uB2C8\uB2E4)",discard:se,discard_action:se.action,resolve_action:Se,resolve_enabled:!re,resolve_title:re?"\uC138\uC158 \uAE30\uB3D9 \uC694\uCCAD \uC911 \u2014 \uC11C\uBC84 \uC751\uB2F5\uC744 \uAE30\uB2E4\uB9BD\uB2C8\uB2E4":"\uC774 \uC2E4\uD328\uB97C \uC0AC\uB78C\uC774 \uC774\uC5B4\uBC1B\uB294 \uB300\uD654\uD615 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4 \u2014 \uAE30\uB85D\uB41C \uC138\uC158\uC774 \uC788\uC73C\uBA74 fork\uD558\uACE0, \uC5C6\uC73C\uBA74 \uC0C8 \uC138\uC158\uC5D0 \uC0AC\uC720\uB97C \uC2E3\uC2B5\uB2C8\uB2E4",merge_step:Z,discard_enabled:se.enabled,discard_title:se.title,merge_enabled:!Z&&!Oe&&!s&&!pe&&!p&&!(ne&&ne.lock_actions)&&!oe&&te.active!==!0&&(le||V||F?.reason==="base_behind"||Q||ke||ot||st||ie&&!O),merge_label:D?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":ke||ot?Ce==="deploy"?"\uBC30\uD3EC \uC7AC\uC2DC\uB3C4 \uD6C4 \uC815\uB9AC":Ce==="verify"?"\uAC80\uC99D \uC7AC\uC2DC\uB3C4 \uD6C4 \uC815\uB9AC":"\uC815\uB9AC \uC7AC\uC2DC\uB3C4":V&&!Z&&!ke?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":F?.reason==="base_behind"?"base \uAC31\uC2E0 \uD6C4 \uBA38\uC9C0":Q?"\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0":_e?"\uB2E4\uC2DC \uBA38\uC9C0":void 0,merge_title:pe?se.error?`\uD3D0\uAE30 \uC2E4\uD328: ${se.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${se.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:D?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":Oe?"\uC694\uCCAD\uC744 \uBCF4\uB0B4\uB294 \uC911 \u2014 \uC11C\uBC84 \uC751\uB2F5\uC744 \uAE30\uB2E4\uB9BD\uB2C8\uB2E4":Z?`\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 ${Z.label}`:Ce?`\uBA38\uC9C0 \uC644\uB8CC \u2014 ${Ce==="deploy"?"\uBC30\uD3EC":"\uAC80\uC99D"} \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD574 \uC815\uB9AC\uAC00 \uBA48\uCDC4\uC2B5\uB2C8\uB2E4. \uD074\uB9AD\uD558\uBA74 \uC800\uC7A5\uC18C \uC791\uC5C5\uBD80\uD130 \uC815\uB9AC\uB97C \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4`:ot?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uB2E4\uC2DC \uC2DC\uB3C4\uD569\uB2C8\uB2E4":oe?"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uC9C1\uC811 \uD574\uC18C\uD558\uC138\uC694":s==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC2E4\uD589 \uC911 \u2014 \uC644\uB8CC \uD6C4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":s==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC77C\uC2DC\uC815\uC9C0 \u2014 \uC7AC\uAC1C \uD6C4 \uC644\uB8CC\uB418\uBA74 \uBA38\uC9C0\uD558\uC138\uC694":ke?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC2DC\uB3C4\uD569\uB2C8\uB2E4":V?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":F?.reason==="base_behind"?"base\uB97C \uC790\uB3D9 \uAC31\uC2E0\uD55C \uB4A4 \uBA38\uC9C0\uD569\uB2C8\uB2E4":te.active===!0?te.origin==="auto"?"\uC790\uB3D9 \uB9AC\uBDF0 \uC138\uC158 \uC2E4\uD589 \uC911 \u2014 \uB05D\uB098\uBA74 \uC601\uC218\uC99D\uC744 \uB2E4\uC2DC \uD310\uC815\uD569\uB2C8\uB2E4":"\uB9AC\uBDF0 \uC138\uC158 \uC2E4\uD589 \uC911 \u2014 \uB05D\uB098\uBA74 \uC601\uC218\uC99D\uC744 \uB2E4\uC2DC \uD310\uC815\uD569\uB2C8\uB2E4":F?.reason==="review_receipt_missing"?"\uB9AC\uBDF0 \uC601\uC218\uC99D \uC5C6\uC74C \u2014 \uBA38\uC9C0 \uAC8C\uC774\uD2B8 \uBCF4\uB958\uC785\uB2C8\uB2E4. \uD074\uB9AD\uD558\uBA74 \uAE30\uB85D\uB41C \uC138\uC158\uC744 \uC774\uC5B4 \uB9AC\uBDF0\uB9CC \uC218\uD589\uC2DC\uD0A4\uACE0, \uC601\uC218\uC99D\uC774 \uCD5C\uC885 head\uC5D0 \uC720\uD6A8\uD574\uC9C0\uBA74 \uD050\uAC00 \uBA38\uC9C0\uD569\uB2C8\uB2E4":F?.reason==="review_receipt_stale"?"head \uC7AC\uC791\uC131\uB428(\uC601\uC218\uC99D\uC774 \uD604\uC7AC head\uC758 \uC870\uC0C1\uC774 \uC544\uB2D8) \u2014 \uBA38\uC9C0 \uAC8C\uC774\uD2B8 \uBCF4\uB958\uC785\uB2C8\uB2E4. \uD074\uB9AD\uD558\uBA74 \uAE30\uB85D\uB41C \uC138\uC158\uC744 \uC774\uC5B4 \uCD5C\uC885 head\uB97C \uB2E4\uC2DC \uB9AC\uBDF0\uC2DC\uD0A4\uACE0, \uC601\uC218\uC99D\uC774 \uC720\uD6A8\uD574\uC9C0\uBA74 \uD050\uAC00 \uBA38\uC9C0\uD569\uB2C8\uB2E4":F?.reason==="review_receipt_invalid"?"\uB9AC\uBDF0 \uC601\uC218\uC99D \uAE30\uB85D\uC774 \uC131\uB9BD\uD558\uC9C0 \uC54A\uC74C \u2014 \uBA38\uC9C0 \uAC8C\uC774\uD2B8 \uBCF4\uB958\uC785\uB2C8\uB2E4. \uD074\uB9AD\uD558\uBA74 \uAE30\uB85D\uB41C \uC138\uC158\uC744 \uC774\uC5B4 \uCD5C\uC885 head\uB97C \uB2E4\uC2DC \uB9AC\uBDF0\uC2DC\uD0A4\uACE0, \uC601\uC218\uC99D\uC774 \uC720\uD6A8\uD574\uC9C0\uBA74 \uD050\uAC00 \uBA38\uC9C0\uD569\uB2C8\uB2E4":F?.reason==="review_receipt_undetermined"?"\uB9AC\uBDF0 \uC601\uC218\uC99D ancestry probe \uBBF8\uC644\uB8CC \u2014 \uBA38\uC9C0 \uAC8C\uC774\uD2B8 \uBCF4\uB958\uC785\uB2C8\uB2E4. \uD074\uB9AD\uD558\uBA74 \uAE30\uB85D\uB41C \uC138\uC158\uC744 \uC774\uC5B4 \uCD5C\uC885 head\uB97C \uB2E4\uC2DC \uB9AC\uBDF0\uC2DC\uD0A4\uACE0, \uC0C8 \uC601\uC218\uC99D\uC774 \uCD5C\uC885 head\uC5D0 \uC720\uD6A8\uD574\uC9C0\uBA74 \uD050\uAC00 \uBA38\uC9C0\uD569\uB2C8\uB2E4":F?.reason==="spec_id_missing"?"native spec_id \uBBF8\uAE30\uB85D \u2014 bd update --spec-id\uB85C \uAE30\uB85D\uD55C \uB4A4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":le?`\uBA38\uC9C0 (${F.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4 (\uCC28\uB840\uAC00 \uB418\uBA74 \uB2E4\uC2DC \uD655\uC778)`:F&&F.tier==="merged"?"\uBA38\uC9C0\uB428 \u2014 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC \uC9C4\uD589 \uC911":`\uBA38\uC9C0 \uBD88\uAC00: ${F&&F.reason||"\uAD00\uCE21 \uB300\uAE30"}`}}function lc(e,t={}){let{transport:n,issueStores:r,queueStore:o,sessionLogStore:i,gotoIssue:s,getWorkspacePath:l,switchWorkspace:a,openDoc:u,doneRange:d,onDoneRangeChange:p}=t,m=r?to(r):null,g=Jk(),k=null,T=null,C=null,te=null,re=lo(()=>f()),X=new Map,D=new Map,O=m_(),q=rc(O)===null,B=d?Wn(d):tw();function K(){let w=Vr.find(v=>v.value===B);return w?w.label:"\uC624\uB298"}let F=la("beads-ui.worker.lane-collapsed"),N=!1,Y="";function U(){return Y.trim().length>0}function ne(w){return U()?w.filter(v=>v.search_match===!0).length:void 0}let ve=new Set,Pe=new Set,H=new Set,ie=new Set,_e=new Set,Te=new Set,V=null,le=[],Z=D_({queueStore:o,issueStores:r,transport:n,getWorkspacePath:l,onInvalidate:()=>f()});function be(){Z.refreshSessionDefaults()}let Oe=document.createElement("div");Oe.className="worker-console";let ke=document.createElement("div");ke.className="worker-top";let Ce=document.createElement("div");Ce.className="worker-drawer-overlay",Ce.hidden=!0;let ot=document.createElement("div");ot.className="worker-drawer-overlay__backdrop";let st=document.createElement("div");st.className="worker-drawer-host";let Q=document.createElement("div");Q.className="worker-drawer-host",Q.hidden=!0,Ce.append(ot,st,Q);let oe=document.createElement("div");oe.className="worker-lanes-host",Oe.append(ke,Ce,oe),e.appendChild(Oe);let se=yr(null,null),pe=[],Se=ua({transport:n,console_el:Oe,getLanes:()=>se,getWorkspaces:()=>pe,getCrossLanes:()=>null,reproject:()=>({lanes:S(),raw_lanes:null}),onCorrection:()=>{},showToast:ge,requestRender:()=>f(),adoptQueue:(w,v)=>{o&&o.set(v)},onDragBegin:()=>{k=null}}),me=null,Re=$o(st,{transport:n,sessionLogStore:i,onClose:()=>{me=null,Ce.hidden=!0,f()}}),je=O_(Q,{onClose:()=>{Q.hidden=!0,Ce.hidden=!0,f()}}),Qe=$_({getWorkspacePath:l||(()=>"")}),Ue=l&&l()||"",J=A_({queueStore:o,transport:n,onChanged:()=>f(),onOpenScript:(w,v)=>{Qe.open(w,v)}});function W(){return o&&o.get()||{revision:0,auto_advance:!1,auto_merge:!1,slots:ka,queue:[],serial_lanes:[],serial_lane_count:0,pr_wait:[],done:[]}}function qe(w){let v=da(w,W());v&&(te=v,f())}function dt(){te=null,f()}function at(){let w=fa(te);w&&(te=null,f(),it(w.attempt_id,"session",w.payload))}function We(w){if(!k||!w.some(R=>R.id===k))return null;let v=Qo(W());return v?{bead_id:k,lanes:v}:null}function Xe(){return l&&l()||""}async function $(w,v){await Se.sendOp({type:"worker-queue-place",payload:{bead_id:w,...v==="parallel"?{}:{lane:v}},root_dir:Xe()},w)}function G(){let w=W();return typeof w.revision=="number"?w.revision:0}function he(w){w&&w.queue&&o&&o.set(w.queue)}async function Ke(w){if(!n||!w)return;let v=await n("worker-attempt-pause",{attempt_id:w});v&&v.paused===!1&&v.reason&&ge(`\uC77C\uC2DC\uC815\uC9C0 \uAC70\uBD80: ${v.reason}`,"error",2400)}async function it(w,v="session",R={}){if(!n||!w)return;let ue=n,$e=W().attempts?.[w]||null;await oo({context:{bead_id:$e?.bead_id||"",kind:v,tuple:$e?xn($e):""},transport:Me=>ue("worker-attempt-resume",{attempt_id:w,expected_revision:G(),...R,...Me}),adopt:he})}async function ze(w,v,R=!0){if(!n)return null;let ue=n,$e=await ue(w,{...v,expected_revision:G()});return he($e),$e&&$e.conflict&&R&&($e=await ue(w,{...v,expected_revision:G()}),he($e)),$e}async function Tt(w){if(!n||!w)return;let v=W().merge_queue?.find(ue=>ue.bead_id===w)?.continuation_action;if(v?.mismatch&&v.continuation===null){await Mt(w,v.mismatch);return}ve.add(w),f();let R;try{R=await ze("worker-merge-queue-add",{bead_id:w})}catch{ge("\uBA38\uC9C0 \uD074\uB9AD\uC774 \uC11C\uBC84\uC5D0 \uC804\uB2EC\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4(\uC5F0\uACB0 \uBB38\uC81C) \u2014 \uC5F0\uACB0 \uBCF5\uAD6C \uD6C4 \uB2E4\uC2DC \uB20C\uB7EC\uC8FC\uC138\uC694","error",3200);return}finally{ve.delete(w),f()}if(!(!R||R.applied)){if(R.conflict){ge("\uD050\uAC00 \uBC14\uB00C\uC5B4 \uBA38\uC9C0 \uD074\uB9AD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uB20C\uB7EC\uC8FC\uC138\uC694","error",2400);return}ge(ow(R.reason),"error",2400)}}async function Dt(w){if(!(!n||!w||Pe.has(w))){Pe.add(w),f();try{let v=await n("worker-cleanup-retry",{bead_id:w,expected_revision:G()});he(v),v&&!v.retried&&!v.conflict&&v.reason&&ge(`\uC815\uB9AC \uC7AC\uC2DC\uB3C4 \uAC70\uBD80: ${v.reason}`,"error",2400)}finally{Pe.delete(w),f()}}}async function nt(w){if(!(!n||!w||H.has(w))){H.add(w),f();try{let v=await n("worker-resolve-in-session",{bead_id:w,expected_revision:G()});he(v);let R=sw(v);R!==null&&ge(R,iw(v),4e3)}finally{H.delete(w),f()}}}async function wt(w,v){let R=W().hold;if(!n||!R||typeof R.since!="number")return;let ue=await n(w,{since:R.since});he(ue),ue&&ue.ok===!1&&ge(`${v}: ${ue.reason==="hold_changed"?"\uD050 \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uD655\uC778\uD558\uC138\uC694":ue.reason||""}`,"error",2800)}async function Mt(w,v){let R=await _r({continuation_mismatch:v},($e,Me)=>ze("worker-merge-queue-add",{bead_id:w,continuation:$e,decision_token:Me},!1)),ue=R?.queue?.merge_queue?.find($e=>$e.bead_id===w)?.continuation_action;if(R?.applied!==!0&&ue?.continuation===null&&ue.mismatch){await Mt(w,ue.mismatch);return}R&&R.applied===!1&&!R.conflict&&ge("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD\uC774 \uCD5C\uC2E0 \uC0C1\uD0DC\uC640 \uC77C\uCE58\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4","error",2800)}async function Lt(w){if(!n)return;let v=await ze("worker-merge-auto-toggle",{on:w});!v||v.conflict||ge(w?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0 \u2014 \uB300\uAE30 \uD56D\uBAA9\uC744 \uBE44\uC6E0\uC2B5\uB2C8\uB2E4",w?"success":"info",2400)}async function Bt(w){if(!n||!w)return;let v=await ze("worker-merge-queue-remove",{bead_id:w});v&&!v.conflict&&!v.applied&&v.reason==="merge_active"&&ge("\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error",2400)}async function ce(){await ze("worker-merge-queue-remove",{all:!0})}async function we(w,v=null,R="unmerged",ue=null){if(!n||!w)return;let $e=Zo(w,R);if(!(!!ue||typeof globalThis.confirm!="function"||globalThis.confirm($e)))return;let Ve=await n("worker-discard",{bead_id:w,...v?{attempt_id:v}:{},...ue?{operation_id:ue}:{},expected_revision:G()});if(he(Ve),Ve&&Ve.conflict&&(Ve=await n("worker-discard",{bead_id:w,...v?{attempt_id:v}:{},...ue?{operation_id:ue}:{},expected_revision:G()}),he(Ve)),Ve&&Ve.discarded===!0){ge(Ai(Ve),"success",5e3);return}if(Ve&&Ve.reason){ge(`\uD3D0\uAE30 \uC2E4\uD328: ${Ve.reason}`,"error",2800);return}if(Ve&&Ve.accepted&&Ve.pending==="merged_revert"){ge("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success",2400);return}if(Ve&&Ve.accepted&&!Ve.discarded){ge(`\uD3D0\uAE30 \uC9C4\uD589: ${Ve.phase||"\uBC31\uC5C5 \uC911"}`,"success",2400);return}Ve&&!Ve.conflict&&ge("\uD3D0\uAE30 \uAC70\uBD80: unknown","error",2800)}async function Be(w,v,R){if(!n||!w||!v||typeof globalThis.confirm=="function"&&!globalThis.confirm(Jo(w,R)))return;let ue=await n("worker-discard-abandon",{bead_id:w,operation_id:v,expected_revision:G()});if(he(ue),ue&&ue.conflict&&(ue=await n("worker-discard-abandon",{bead_id:w,operation_id:v,expected_revision:G()}),he(ue)),ue&&ue.abandoned===!0){ge(xi(R),"success",5e3);return}if(ue&&ue.reason){ge(`\uD3D0\uAE30 \uD3EC\uAE30 \uAC70\uBD80: ${ue.reason}`,"error",2800);return}ue&&!ue.conflict&&ge("\uD3D0\uAE30 \uD3EC\uAE30 \uAC70\uBD80: unknown","error",2800)}async function Je(w,v,R){if(!(!n||!v||!R||_e.has(v))){_e.add(v),f();try{let ue=await n(w,{bead_id:v,action_id:R,expected_revision:G()});he(ue),ue?.conflict?ge("\uC774\uC804 \uC791\uC5C5 \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694.","error",2800):!ue?.ok&&ue?.reason&&ge(`\uC774\uC804 \uC791\uC5C5 \uCC98\uB9AC \uAC70\uBD80: ${String(ue.reason)}`,"error",2800)}finally{_e.delete(v),f()}}}async function Ze(w,v){if(!n||!v||ie.has(v))return;ie.add(v),f();let R;try{let ue=async($e={})=>await n(w,{bead_id:v,expected_revision:G(),...$e});R=await ue(),he(R),R&&R.conflict&&(R=await n(w,{bead_id:v,expected_revision:G()}),he(R)),w==="worker-revise-fix"&&(R=await _r(R,($e,Me)=>ue({continuation:$e,decision_token:Me}),{onResult:he,refresh:()=>ue()}))}finally{ie.delete(v),f()}if(!(!R||R.conflict)){if(R.ok){ge(w==="worker-revise-fix"?"\uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4 \u2014 \uC218\uB9AC \uD6C4 \uAD6C\uD604\uC774 \uC7AC\uB514\uC2A4\uD328\uCE58\uB429\uB2C8\uB2E4":"\uB378\uD0C0 \uC2B9\uC778 \uC644\uB8CC \u2014 \uC601\uC218\uC99D \uAC31\uC2E0 + \uD30C\uD0B9 \uD574\uC81C","success",2800);return}ge(`\uCC98\uBD84 \uAC70\uBD80: ${R.reason||""}`,"error",3e3)}}async function pt(w){if(!n)return;let v=await n("worker-automation-toggle",{on:w,expected_revision:G()});he(v),v&&v.conflict&&await n("worker-automation-toggle",{on:w,expected_revision:G()}).then(he)}async function gt(w){if(!n||!w)return;let v=await n("worker-repo-operation-dismiss",{operation_id:w});he(v),v&&v.ok===!1&&ge(`\uAE30\uB85D \uB2EB\uAE30 \uAC70\uBD80: ${v.reason||""}`,"error",3e3)}async function et(w){if(!n||!Number.isFinite(w))return;let v=Math.max(ka,Math.floor(w)),R=await n("worker-queue-set-slots",{slots:v,expected_revision:G()});he(R),R&&R.conflict&&await n("worker-queue-set-slots",{slots:v,expected_revision:G()}).then(he)}async function Ne(w){if(!n||!Number.isInteger(w)||w<1||w>P_)return;let v=W(),R=(Array.isArray(v.serial_lanes)?v.serial_lanes:[]).slice(w).reduce((Me,Ve)=>Me+(Array.isArray(Ve?.entries)?Ve.entries.length:0),0),ue=()=>({count:w,expected_revision:G()}),$e=await n("worker-queue-set-serial-lane-count",ue());he($e),$e&&$e.conflict&&($e=await n("worker-queue-set-serial-lane-count",ue()),he($e)),$e&&$e.applied&&R>0&&ge(`\uC9C1\uB82C \uB808\uC778 \uCD95\uC18C \u2014 ${R}\uAC1C \uD56D\uBAA9\uC774 \uBCD1\uB82C \uB300\uAE30\uB85C \uC774\uB3D9`)}function S(){let w=Lr(B),v=Z.read({candidate_sort:O,done_since:w});return pe=v.workspaces,se=yr(v.workspaces,v.workspaces_state,{done_since:w,candidate_filter:g,candidate_hidden_counts:"per_control",candidate_sort:"as_given",groups:"all",search:Y}),se}function j(w){return w.queue_groups[0]||Zk}function z(w){let v=w.dependency_chips||null,R={...v&&v.released?{released:v.released}:{},...v&&v.dependents?{dependents:v.dependents}:{}},ue=X.get(w.id),$e=D.get(w.id)||null,Me=ue&&ue.overlaps.length>0?ue.overlaps:null,Ve=!!ue&&ue.scope_missing;return!$e&&!Me&&!Ve&&Object.keys(R).length===0?null:{...R,...$e?{predecessors:$e}:{},...Me?{overlaps:Me}:{},...Ve?{scope_missing:!0}:{}}}function Ae(w){return{...w,workspace_name:"",done_layout:void 0,dependency_chips:z(w)||void 0,chip_popover:ye(w)}}function ye(w){return Ii(w,v=>re.isOpen({bead_id:w.id,chip_key:v}))}function ft(){let w=W(),v=new Map;for(let R of Object.values(cn(w.lane_states))){let ue=Array.isArray(R?.corrections)?R.corrections:[];for(let $e of ue)$e&&typeof $e.bead_id=="string"&&typeof $e.after=="string"&&v.set($e.bead_id,$e.after)}return{admission:cn(w.admission),correction_after:v}}function $t(w,v){let R=Ae(w),ue=vd(v.admission[w.id]||null,!!w.discard||_e.has(w.id)),$e=v.correction_after.get(w.id);return{...R,draggable:R.draggable===!0&&!ue,stale_work:ue,reason:ue?"":R.reason,badges:$e?[`\u{1F517} ${$e} \uB4A4 (blocks \uC790\uB3D9)`,...R.badges||[]]:R.badges,revise_enabled:R.revise_enabled===!0&&!ie.has(w.id)}}function yt(w){let v=ft();return j(w).sublanes.parallel.map(R=>$t(R,v))}function xt(w){let v=ft();return j(w).sublanes.serial.map(R=>{let ue=R.occupants.map($e=>({id:$e.id,title:$e.title,draggable:!1,lane:R.id,ghost:!0,badges:[$e.badge],...typeof $e.search_match=="boolean"?{search_match:$e.search_match}:{}}));return{id:R.id,index:R.index+1,raw_length:R.raw_length,ghosts:ue,items:R.items.map($e=>$t($e,v)),occupied:R.occupied_by.length>0,badge:R.occupants.length>0?R.occupants[0].badge:"\uB300\uAE30",cycle:R.cycle===!0}})}function Nt(w){return w.runnable.map(v=>Ae(v))}function Wt(w){return w.done.map(v=>Ae(v))}function jt(w){let v=w.running.filter(R=>R.non_occupying!==!0).map(R=>({...R,bead_id:R.id,attempt_id:R.attempt_id||"",paused:R.run_state==="paused",failed:R.run_state==="failed",parked:R.run_state==="parked",retry_wait:R.run_state==="retry_wait",waiting:R.run_state==="waiting",wait:R.wait||null,provider_hold:R.run_state==="provider_hold",hold:R.hold?{...R.hold,open:C===R.attempt_id}:null,status_label:R.run_state==="failed"?R.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328":R.run_state==="parked"?"\uC138\uC158 \uB300\uAE30":R.run_state==="retry_wait"?"\uC7AC\uC2DC\uB3C4 \uB300\uAE30":R.run_state==="waiting"?"\uC120\uD589 \uB300\uAE30":R.run_state==="provider_hold"?"\uACF5\uAE09\uC790 \uBCF4\uB958":void 0,can_pause:R.can_pause!==!1,workspace_name:"",dependency_chips:z(R)||void 0,chip_popover:ye(R),rollup_expanded:Te.has(R.id),failure:R.failure?{...R.failure,open:T===R.attempt_id}:null,...So(R.id,{discard:R.discard,parked:R.run_state==="parked"},H.has(R.id))}));return[...v.filter(R=>R.failed===!0),...v.filter(R=>R.failed!==!0&&R.parked===!0),...v.filter(R=>R.failed!==!0&&R.parked!==!0)]}function kt(w){return Xt(w).map(v=>({...v,chip_popover:ye(v)}))}function Xt(w){if(V&&V.model===w)return V.rows;let v=W(),R=j(w),ue=cn(v.attempts),$e=Object.values(ue).filter(nr),Me=new Map;for(let Ge of $e)Me.set(Ge.attempt_id,Ge);let Ve=new Map;for(let Ge of $e)Ve.set(Ge.bead_id,Ge);let Ct=new Map;for(let Ge of[...w.pr_wait,...w.running,...w.queue,...w.runnable,...w.done])Ct.has(Ge.id)||Ct.set(Ge.id,Ge);let Jt=Ge=>{let Kt=null;for(let $n of $e)!$n||$n.bead_id!==Ge||gl($n,Me)||(Kt===null||(typeof $n.started_at=="number"?$n.started_at:0)>=(typeof Kt.started_at=="number"?Kt.started_at:0))&&(Kt=$n);return Kt&&typeof Kt.target_base=="string"?Kt.target_base:null},lt=new Map;for(let Ge of w.running)Ge.run_state==="failed"||Ge.conflict_resolution!==!0||(Ge.run_state!=="paused"?lt.set(Ge.id,"running"):lt.has(Ge.id)||lt.set(Ge.id,"paused"));let fn=cn(v.auto_merge_skips),_n=new Set(R.merge.auto_excluded),Er=cn(v.pr_observations),Cn=cn(v.pr_activity),Rn=cn(v.cleanup_failed),Yn=cn(v.discard_operations),Vn=cn(v.bead_workflow),an=cn(v.bead_titles),Qn=v.merge_queue_state||{active:null,failures:{}},cr=R.merge.state.waiting,On=new Map;for(let Ge of Array.isArray(v.merge_queue)?v.merge_queue:[])Ge&&typeof Ge=="object"&&Ge.bead_id&&On.set(Ge.bead_id,Ge);let Un=(Array.isArray(v.pr_wait)?v.pr_wait:[]).map(Ge=>{let Kt=Ct.get(Ge.bead_id);return{...hw(Ge.bead_id,Kt?.title||an[Ge.bead_id]||Ge.bead_id,Er,Rn[Ge.bead_id]||null,tr(ue,Ge.bead_id),Cn[Ge.bead_id]||(ve.has(Ge.bead_id)?{activity:null,merge_progress:null,queueing:"merge"}:Pe.has(Ge.bead_id)?{activity:null,merge_progress:null,queueing:"cleanup"}:null),lt.get(Ge.bead_id)||null,Ge.external===!0,{position:R.merge.positions.get(Ge.bead_id)||0,active:Qn.active===Ge.bead_id,failure:cn(Qn.failures)[Ge.bead_id]||null,waiting:cr&&cr.bead_id===Ge.bead_id?cr.reason:null,resolution:R.merge.resolutions.get(Ge.bead_id),continuation_action:R.merge.continuations.get(Ge.bead_id),authority:R.merge.authorities.get(Ge.bead_id)||null,hold:On.get(Ge.bead_id)?.hold||null,review_dispatch:On.get(Ge.bead_id)?.review_dispatch||null},Ge.wt_present!==!1,v.auto_merge===!0&&_n.has(Ge.bead_id)?fn[Ge.bead_id]?.reason||"":null,ml(R.declared_base,Jt(Ge.bead_id)),cn(v.completion_status)[Ge.bead_id]||null,Yn,v.auto_merge===!0,{merge_sha:Ge.merge_sha,cleanup_cursor:Ge.cleanup_cursor,repo_operations:R.repo_operations},Kt?z(Kt):null,md(ue,Ge.bead_id),H.has(Ge.bead_id)),...Kt?.search_match===void 0?{}:{search_match:Kt.search_match},workflow:Vn[Ge.bead_id]||null,priority:Kt?.priority,from_id:Kt?.from_id,...Kt?.created_at===void 0?{}:{created_at:Kt.created_at},...Kt?.updated_at===void 0?{}:{updated_at:Kt.updated_at}}});return V={model:w,rows:Un},Un}function Zt(w){let v=j(w),R=[];for(let Me of w.running)Me.non_occupying!==!0&&R.push({id:Me.id,title:Me.title,location_label:"\uC2E4\uD589\uC911",kind:"running",lane_id:Me.serial_lane_id??null});for(let Me of w.pr_wait)R.push({id:Me.id,title:Me.title,location_label:"PR \uB300\uAE30",kind:"pr_wait",lane_id:null});for(let Me of v.sublanes.serial)Me.items.forEach((Ve,Ct)=>{R.push({id:Ve.id,title:Ve.title,location_label:`${Me.id} #${Ct+1}`,kind:"serial",lane_id:Me.id})});v.sublanes.parallel.forEach((Me,Ve)=>{R.push({id:Me.id,title:Me.title,location_label:`#${Ve+1}`,kind:"parallel",lane_id:null})});for(let Me of w.runnable)R.push({id:Me.id,title:Me.title,location_label:"\uD6C4\uBCF4",kind:"candidate",lane_id:null,queue_placeable:Me.queue_placeable===!0});let ue=W();X=y_(ue.bead_scope,R);let $e=new Map;for(let Me of[...w.running,...w.runnable])Array.isArray(Me.blocked_by)&&Me.blocked_by.length>0&&$e.set(Me.id,Me.blocked_by);for(let[Me,Ve]of Object.entries(cn(ue.bead_blocked_by)))Array.isArray(Ve)&&$e.set(Me,Ve.filter(Ct=>typeof Ct=="string"&&Ct.length>0));D=Id($e,R,cn(ue.blocker_workspaces))}function Ft(w){let v=w.hold&&typeof w.hold=="object"?w.hold:null;if(!v||v.kind!=="env"&&v.kind!=="systemic")return"";let R=wr(v.cause)||String(v.cause||""),ue=Array.isArray(w.lineages)?w.lineages:[];if(v.kind==="env"){let Me=ue.map(Ct=>Ct&&Ct.next_at).filter(Ct=>typeof Ct=="number").sort((Ct,Jt)=>Ct-Jt)[0],Ve=typeof Me=="number"?` \xB7 \uB2E4\uC74C ${new Date(Me).toLocaleTimeString("ko-KR",{hour:"2-digit",minute:"2-digit"})}`:"";return c`<div class="worker-hold worker-hold--env" role="status">
        <span class="worker-hold__text"
          >환경 보류: ${R} — 재시도 대기${Ve}</span
        >
        <button
          type="button"
          class="worker-hold__retry"
          title="예약된 재시도를 지금 실행합니다"
        >
          지금 재시도
        </button>
      </div>`}let $e=(Array.isArray(v.bead_ids)?v.bead_ids:[]).filter(Me=>typeof Me=="string"&&Me.length>0);return c`<div class="worker-hold worker-hold--systemic" role="alert">
      <span class="worker-hold__text"
        >${R}${$e.length>0?` \u2014 bead ${$e.join(", ")}`:""}</span
      >
      <button
        type="button"
        class="worker-hold__resume"
        title="정지를 풀고 멈춰 있던 bead를 다시 디스패치합니다"
      >
        재개
      </button>
    </div>`}function Ot(w){let v=[];for(let[lt,fn]of Object.entries(cn(w.provider_hold)))for(let _n of Array.isArray(fn?.targets)?fn.targets:[])v.push({runner:lt,target:_n});if(v.length===0)return"";let R=v.find(lt=>lt.target?.kind==="outage");if(R){let lt=typeof R.target.next_probe_at=="number"?new Date(R.target.next_probe_at).toLocaleTimeString("ko-KR",{hour:"2-digit",minute:"2-digit"}):"";return c`<div class="worker-provider-gate" role="status">
        ⚠️ ${R.runner} 공급자 장애 — 신규 디스패치
        보류${lt?`, \uB2E4\uC74C \uD504\uB85C\uBE0C ${lt}`:""}
      </div>`}let ue=Array.isArray(cn(w.account_catalog).claude)?cn(w.account_catalog).claude:[],$e=lt=>ue.find(_n=>_n?.email===lt)?.alias||lt,Me=v.find(lt=>typeof lt.target?.account!="string"),Ve=lt=>typeof lt?.resets_at=="number"?new Date(lt.resets_at).toLocaleTimeString("ko-KR",{hour:"2-digit",minute:"2-digit"}):"";if(Me){let lt=Ve(Me.target);return c`<div class="worker-provider-gate" role="status">
        ⏳ ${Me.runner} 사용 한도 — 계정 미확인이라 러너 전체 디스패치
        보류${lt?`, \uB9AC\uC14B ${lt}`:""}
      </div>`}let Ct=[...new Set(v.map(lt=>$e(String(lt.target.account))))],Jt=Ve(v[0].target);return c`<div class="worker-provider-gate" role="status">
      ⏳ ${Ct.join(", ")} 사용 한도 —
      ${Ct.length>1?"\uADF8 \uACC4\uC815\uB4E4":"\uADF8 \uACC4\uC815"} 디스패치
      보류${Jt?`, \uB9AC\uC14B ${Jt}`:""}
    </div>`}function Qt(w){let v=W(),R=j(w),ue=R.sublanes.parallel,$e=ue.length>0?ue[0].id:"\u2014",Me=c`<button
      type="button"
      class="worker-play${v.auto_advance?" is-active":""}"
    >
      ${v.auto_advance?"\u23F8 \uC790\uB3D9\uD654 \uBA48\uCDA4":"\u25B6 \uC790\uB3D9\uD654"}
    </button>`,Ve=ht(w),Ct=R.over_cap?c`<span
          class="worker-overcap"
          title="수동 재개(▶)는 슬롯 cap을 초과할 수 있습니다 — 자동 진행은 cap을 지킵니다"
          >cap 초과</span
        >`:"",Jt=v.auto_advance?0:(Array.isArray(v.queue)?v.queue:[]).filter(an=>an&&typeof an.armed_by_lane=="string"&&an.armed_by_lane.length>0).length,lt=Jt>0?c`<span
            class="worker-kpi__chip worker-kpi__chip--armed"
            title="모니터 연결 레인이 발차한 대기 행입니다 — 이 레포의 자동 진행은 꺼진 채입니다"
            >⏸ 자동 진행 꺼짐 · 연결 레인 ${Jt}건 진행 중</span
          >`:"",fn=c`<span class="worker-kpi__chip worker-kpi__chip--running"
        >실행 <b>${R.live_count}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--pr"
        >PR 대기 <b>${kt(w).length}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--done"
        >${K()} 완료 <b>${w.done.length}</b></span
      >`,_n=c`<span
      class="worker-kpi__chip worker-kpi__chip--base"
      title=${R.declared_base?"\uC774 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uC5B8\uD55C target base (docs/agents/repo-ops.toml). \uB514\uC2A4\uD328\uCE58 \uC2DC\uC810\uC758 \uAC80\uC99D\uC740 \uBCC4\uB3C4":"\uC120\uC5B8 \uD30C\uC77C\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 \u2014 target base \uD655\uC778 \uBD88\uAC00"}
      >base ${R.declared_base||"?"}</span
    >`,Er=c`<label class="worker-tgl worker-slots"
        >동시 실행
        <input
          type="number"
          class="worker-slots__input"
          min=${ka}
          step="1"
          .value=${String(R.slots)}
          title="동시에 실행할 세션 수 (최소 1 = 순차 실행)"
      /></label>
      <label
        class="worker-tgl worker-serial-lanes"
        title="고정 직렬 레인 수 (1~5). 축소 시 잘린 레인의 대기 항목은 병렬 대기로 돌아갑니다"
        >직렬 레인
        <select class="worker-serial-lane-count" aria-label="직렬 레인 수">
          ${Array.from({length:P_},(an,Qn)=>Qn+1).map(an=>c`<option
                value=${String(an)}
                ?selected=${R.serial_lane_count===an}
              >
                ${an}
              </option>`)}
        </select>
      </label> `,Cn=c`<input
      type="search"
      class="worker-search"
      placeholder="ID·제목 검색"
      aria-label="이슈 검색 (ID·제목)"
      .value=${Y}
    />`,Rn=hd(R.repo_operations,R.cleanup_failures),Yn=Ft(v),Vn=Ot(v);return N?c`<div class="worker-ribbon">
          ${Me} ${Ve}
          <div class="worker-kpi worker-kpi--ribbon">
            ${Ct}${lt}${fn}
          </div>
        </div>
        <div class="worker-ctrl worker-ctrl--mobile">
          <div class="worker-ctrl__ops">${Er}${Cn}</div>
          <div class="worker-kpi">${_n}</div>
        </div>
        ${Vn}${Yn}${Rn}${J.template()}`:c`<div class="worker-ctrl">
        <div class="worker-ctrl__ops">
          ${Me}${Ve}${Er}${Cn}
        </div>
        <div class="worker-kpi">
          ${Ct}${lt}${fn}${_n}
          ${(Array.isArray(R.token_total)?R.token_total:R.token_total?[{label:R.token_total,tooltip:`${K()} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}]:[]).map(an=>c`<span
                class="worker-kpi__chip worker-kpi__chip--tokens"
                title=${an.tooltip}
                >${K()} 완료 · 누적 ${an.label}</span
              >`)}
          <span class="worker-kpi__next worker-stat"
            >다음 <b>${$e}</b></span
          >
        </div>
      </div>
      ${Vn}${Yn}${Rn}${J.template()}`}function xe(w){let v=w.runnable_hidden;return c`<div class="worker-filter">
      <label class="worker-filter__tgl" title="blocked 이슈 표시 (기본 숨김)">
        <input
          type="checkbox"
          class="worker-filter__blocked"
          .checked=${g.show_blocked}
        />
        🔒 blocked${v.blocked>0?` ${v.blocked}`:""}
      </label>
      <div
        class="worker-filter__readiness"
        role="group"
        aria-label="준비도 필터"
      >
        ${os.map(R=>c`<button
              type="button"
              class="worker-filter__chip${g.readiness===R.value?" is-active":""}"
              data-readiness=${R.value}
              aria-pressed=${g.readiness===R.value?"true":"false"}
            >
              ${R.label}
            </button>`)}
        ${v.readiness>0?c`<span class="worker-filter__hidden"
              >숨김 ${v.readiness}</span
            >`:""}
      </div>
    </div>`}function E(){let w=q?"custom":rc(O)||"custom";return c`<select
      class="worker-sort"
      aria-label="후보 정렬"
      title="후보 정렬"
      .value=${w}
    >
      ${Ss.map(v=>c`<option value=${v.id} ?selected=${w===v.id}>
            ${v.label}
          </option>`)}
      <option value="custom" ?selected=${w==="custom"}>
        사용자 지정…
      </option>
    </select>`}function fe(){let w=Es(O);return c`<div
      class="worker-sort-chain"
      role="group"
      aria-label="후보 정렬 체인"
    >
      ${[0,1,2].map(v=>{let R=w[v];return c`<span class="worker-sort-chain__step">
          <select
            class="worker-sort-chain__key"
            data-step=${v}
            aria-label=${`${v+1}\uCC28 \uC815\uB82C \uD0A4`}
            .value=${R?R.key:""}
          >
            ${v===0?"":c`<option value="" ?selected=${!R}>없음</option>`}
            ${__.map(ue=>c`<option
                  value=${ue.key}
                  ?selected=${!!R&&R.key===ue.key}
                >
                  ${ue.label}
                </option>`)}
          </select>
          ${R?c`<button
                type="button"
                class="worker-sort-chain__dir"
                data-step=${v}
                aria-label=${R.dir==="asc"?"\uC624\uB984\uCC28\uC21C":"\uB0B4\uB9BC\uCC28\uC21C"}
                title=${R.dir==="asc"?"\uC624\uB984\uCC28\uC21C":"\uB0B4\uB9BC\uCC28\uC21C"}
              >
                ${R.dir==="asc"?"\u2191":"\u2193"}
              </button>`:""}
        </span>`})}
    </div>`}function Ie(){return c`<div class="worker-done-controls">
      <select
        class="worker-sort worker-done-range"
        aria-label="완료 기간"
        title="완료 기간"
        .value=${B}
      >
        ${Vr.map(w=>c`<option value=${w.value} ?selected=${B===w.value}>
              ${w.label}
            </option>`)}
      </select>
    </div>`}function ht(w){let v=j(w).merge,R=W().auto_merge===!0;if(v.running)return c`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop${R?" is-active":""}"
        title=${R?"\uC790\uB3D9 \uBA38\uC9C0\uB97C \uB044\uACE0 \uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)":"\uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)"}
      >
        ${R?"\u23F8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8":"\uC77C\uAD04 \uBA38\uC9C0 \uC911\uB2E8"} ${v.positions.size}
      </button>`;if(R)return c`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop is-active"
        title="자동 머지 켜짐 — 자격이 생기는 PR을 계속 큐에 넣습니다. 클릭하면 끕니다"
      >
        ⏸ 자동 머지
      </button>`;let ue=new Set(v.auto_excluded),$e=kt(w).filter(Me=>Me.merge_action&&Me.merge_enabled&&!ue.has(Me.id)).length;return c`<button
      type="button"
      class="worker-merge-all"
      title="켜 두면 자격이 생기는 PR을 계속 큐에 넣어 순서대로 충돌 해소·머지합니다"
    >
      ▶ 자동 머지${$e>0?` ${$e}`:""}
    </button>`}function Ye(w,v){return c`<div
      data-bead-id=${w.id}
      data-drag-kind=${v.kind}
      data-root-dir=${v.root_dir}
      data-lane-id=${dn(v.lane_id)}
      data-row-index=${v.row_index}
      data-queue-index=${String(w.queue_index??0)}
    >
      ${Mn({...w,...So(w.id,{discard:w.discard,parked:!1},H.has(w.id))},{actions:bo(w)})}
    </div>`}function St(w){let v=yt(w),R=Xe();return Li({parallel:{rows:v.map((ue,$e)=>Ye(ue,{kind:"parallel",root_dir:R,row_index:$e})),count:v.length,collapsed:F.isAreaCollapsed("parallel"),drop:{drop:"parallel",root_dir:R}},serial:{lanes:xt(w).map(ue=>({id:ue.id,title:`\uC9C1\uB82C ${ue.index}`,rows:[...ue.ghosts.map($e=>Mn({...$e,...So($e.id,{discard:$e.discard,parked:!1},H.has($e.id))},{actions:bo($e)})),...ue.items.map(($e,Me)=>Ye($e,{kind:"repo-serial",root_dir:R,row_index:Me,lane_id:ue.id}))],count:ue.ghosts.length+ue.items.length,match_count:ne([...ue.ghosts,...ue.items]),empty:ue.ghosts.length+ue.items.length===0,badge:ue.badge,held:ue.occupied,cycle:ue.cycle,drop:{drop:"repo-serial",root_dir:R,lane_id:ue.id,lane_length:String(ue.raw_length)}})),collapsed:F.isAreaCollapsed("serial")}})}function x(w){return Sf(jt(w),Date.now(),me)}function L(w){return w.running.some(v=>v.kind!=="session"&&v.run_state==="running")}function Ee(w){let v=j(w),R=Nt(w),ue=yt(w),$e=Wt(w),Me=kt(w),Ve=jt(w),Ct=Gn({id:"worker-pane-candidate",lane:"candidate",title:"\uD6C4\uBCF4",items:R,match_count:ne(R),src:!0,empty:"\uD6C4\uBCF4 \uC5C6\uC74C",header_control:E(),header_row:q?fe():void 0,controls:xe(w),collapsible:!0,collapsed:F.isCollapsed("candidate"),place_menu:We(R),onOpenDoc:u?(lt,fn)=>u(fn):void 0}),Jt=Gn({id:"worker-pane-done",lane:"done",title:"\uC644\uB8CC",items:$e,match_count:ne($e),empty:`${K()} \uC644\uB8CC \uC5C6\uC74C`,header_control:Ie(),collapsible:!0,collapsed:F.isCollapsed("done"),preview:N?Array.isArray(v.token_total)?v.token_total.map(lt=>lt.label).join(" \xB7 "):v.token_total||M_($e):void 0});return N?c`<div class="worker-lanes worker-lanes--mobile">
          ${Di({live:L(w),running_body:Ve.length>0?x(w):"",pr_wait_rows:Me.map(lt=>Mn(lt)),count:Ve.length+Me.length})}
          ${Gn({id:"worker-pane-queue",lane:"queue",title:"\uB300\uAE30",items:ue,count:ue.length,match_count:ne(ue),collapsible:!0,collapsed:F.isCollapsed("queue"),preview:M_(ue),body:St(w)})}
          ${Ct} ${Jt}
        </div>
        ${Ao(te,W())}`:c`<div class="worker-lanes">
        ${Ct}
        ${Gn({id:"worker-pane-queue",lane:"queue",title:"\uB300\uAE30",items:ue,count:ue.length,match_count:ne(ue),collapsible:!0,collapsed:F.isCollapsed("queue"),body:St(w)})}
        ${Gn({id:"worker-pane-running",lane:"running",title:"\uC2E4\uD589 \uC911",items:Ve,match_count:ne(Ve),header_control:c`<span class="worker-pane__meta"
            >슬롯 ${v.slots}</span
          >`,live:L(w),collapsible:!0,collapsed:F.isCollapsed("running"),body:x(w)})}
        ${Gn({id:"worker-pane-pr-wait",lane:"pr_wait",title:"PR \uB300\uAE30",items:Me,match_count:ne(Me),empty:"PR \uB300\uAE30 \uC5C6\uC74C",collapsible:!0,collapsed:F.isCollapsed("pr_wait")})}
        ${Jt}
      </div>
      ${Ao(te,W())}`}function He(w){F.toggle(w),f()}function Le(w){F.toggleArea(w),f()}function f(){let w=S();Zt(w),ct(Qt(w),ke),ct(Ee(w),oe),_a(oe)}function h(){let w=!0,v=aa(R=>{if(N=R,w){w=!1;return}f()});le.push(v)}function I(w){g=w,ew(w),f()}function M(w){if(w==="custom"){q=!0,f();return}O=Hr(w),oc(O),q=!1,f()}function _(w){O=Hr({chain:w}),oc(O),f()}function b(w){B=Wn(w),nw(B),p?.(B),f()}function ee(w){let v=w.target;if(te){let lt=pa(te,v,W());if(lt){lt!==te&&(te=lt,f());return}}let R=v?.closest?.(".worker-serial-lane-count");if(R){let lt=Number.parseInt(R.value,10);Number.isFinite(lt)&&Ne(lt).then(f);return}let ue=w.target?.closest?.(".worker-filter__blocked");if(ue){I({...g,show_blocked:ue.checked});return}let $e=w.target?.closest?.(".worker-sort-chain__key");if($e){let lt=Number.parseInt($e.getAttribute("data-step")||"",10);Number.isFinite(lt)&&_(g_(Es(O),lt,$e.value));return}let Me=w.target?.closest?.(".worker-done-range");if(Me){b(Me.value);return}let Ve=w.target?.closest?.(".worker-sort");if(Ve){M(Ve.value);return}let Ct=w.target?.closest?.(".worker-slots__input");if(!Ct)return;let Jt=Number.parseInt(Ct.value,10);if(!Number.isFinite(Jt)){f();return}et(Jt).then(f)}function de(w){return w?{runner:w.runner||void 0,model:w.model||void 0,effort:w.effort||void 0,worktree:w.worktree||void 0,status:w.status||void 0,session_id:w.session_id||void 0}:{}}function Fe(){let w=j(S()),v=W().workspace_info,R=v&&typeof v=="object"&&v.repo_ops&&typeof v.repo_ops=="object"?v.repo_ops:null;return{operations:w.repo_operations,cleanup_failures:w.cleanup_failures,repo:l&&l()||"",repo_ops:R}}function _t(){me&&Re.close(),Q.hidden=!1,Ce.hidden=!1,je.open(Fe()),f()}function Et(w){let v=W(),R=v.attempts?v.attempts[w]:null;me=w,je.close(),Q.hidden=!0,Ce.hidden=!1,Re.open({attempt_id:w,meta:de(R)}),f()}function zt(w){let v=W(),R=(Array.isArray(v.session_active)?v.session_active:[]).find($e=>$e&&$e.bead_id===w),ue=(R&&Array.isArray(R.session_refs)?R.session_refs:[]).find($e=>$e&&$e.current===!0);ue&&(je.close(),Q.hidden=!0,Ce.hidden=!1,Re.open(so(ue,w,"in_progress")),f())}function lr(){if(je.isOpen()&&je.refresh(Fe()),!me)return;let w=W(),v=w.attempts?w.attempts[me]:null;if(v){Re.updateMeta(de(v));return}Re.close()}function Ht(w,v){if(w.length===0||!s)return;let R=l?l():void 0;if(v.length===0||!R||v===R||!a){s(w);return}Promise.resolve(a(v)).then(()=>{s(w)}).catch(()=>{ge("\uB808\uD3EC \uC804\uD658\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error",2400)})}function un(w){let v=w.target;if(v?.closest?.(".provider-resume-dialog__cancel")){dt();return}if(v?.closest?.(".provider-resume-dialog__confirm")){at();return}if(v?.closest?.(".provider-resume-dialog")||v?.closest?.(".worker-mini__grip"))return;let R=v?.closest?.(".worker-sort-chain__dir");if(R){let A=Number.parseInt(R.getAttribute("data-step")||"",10);Number.isFinite(A)&&_(h_(Es(O),A));return}let ue=v?.closest?.(".worker-dep__open");if(ue){Ht(ue.getAttribute("data-dep-id")||"",ue.getAttribute("data-root-dir")||"");return}let $e=v?.closest?.(".judgement-chip");if($e){let A=$e.closest("[data-bead-id]"),ae=A&&A.getAttribute("data-bead-id")||"",De=$e.getAttribute("data-chip-key")||"";ae&&De&&re.toggle({bead_id:ae,chip_key:De});return}if(v?.closest?.(".chip-popover"))return;if(v?.closest?.(".worker-repo-strip")){_t();return}let Me=v?.closest?.(".worker-repo-op__dismiss");if(Me){gt(Me.dataset.operationId||"");return}let Ve=v?.closest?.(".worker-cleanup__resume");if(Ve){let A=Ve.dataset.beadId;A&&Dt(A);return}let Ct=v?.closest?.(".worker-cleanup__resolve");if(Ct){let A=Ct.dataset.beadId;A&&nt(A);return}if(v?.closest?.(".worker-hold__retry")){wt("worker-queue-hold-retry-now","\uC9C0\uAE08 \uC7AC\uC2DC\uB3C4 \uAC70\uBD80");return}if(v?.closest?.(".worker-hold__resume")){wt("worker-queue-hold-resume","\uC7AC\uAC1C \uAC70\uBD80");return}if(v?.closest?.(".worker-play")){pt(!W().auto_advance);return}let Jt=v?.closest?.(".worker-merge-all");if(Jt){Jt.classList.contains("worker-merge-all--stop")?W().auto_merge===!0?Lt(!1):ce():Lt(!0);return}let lt=v?.closest?.(".worker-pane__toggle[data-lane]");if(lt){let A=lt.dataset.lane;(A==="candidate"||A==="queue"||A==="running"||A==="pr_wait"||A==="done")&&He(A);return}let fn=v?.closest?.(".worker-wait__area-toggle[data-area]");if(fn){let A=fn.dataset.area;(A==="parallel"||A==="serial")&&Le(A);return}let _n=v?.closest?.(".worker-card__place-lane");if(_n){let A=_n.dataset.beadId,ae=_n.dataset.lane;A&&(ae==="parallel"||/^s[1-5]$/.test(ae||""))&&(k=null,f(),$(A,ae));return}if(v?.closest?.(".worker-card__place-cancel")){k=null,f();return}let Cn=v?.closest?.(".worker-card__place");if(Cn){let A=Cn.dataset.beadId;A&&!Cn.disabled&&(Qo(W())?(k=A,f()):$(A,"parallel"));return}let Rn=v?.closest?.(".worker-filter__chip");if(Rn){let A=Rn.dataset.readiness;(A==="all"||A==="ready"||A==="not_ready")&&I({...g,readiness:A});return}let Yn=v?.closest?.('[data-action="queue-remove"]');if(Yn){let A=Yn.dataset.beadId||"";A&&Se.sendOp({type:"worker-queue-remove",payload:{bead_id:A},root_dir:Xe()},A);return}let Vn=v?.closest?.(".worker-mini__merge");if(Vn){let A=Vn.dataset.beadId||"";W().cleanup_failed?.[A]?Dt(A):Tt(A);return}let an=v?.closest?.(".worker-mini__merge-cancel");if(an){Bt(an.dataset.beadId||"");return}let Qn=v?.closest?.(".worker-mini__resolve");if(Qn){nt(Qn.dataset.beadId||"");return}let cr=v?.closest?.(".rtile__resolve");if(cr){let A=cr.closest(".rtile");nt(A?.dataset.beadId||"");return}let On=v?.closest?.(".worker-mini__discard"),Un=v?.closest?.(".worker-mini__discard-abandon");if(Un){Be(Un.dataset.beadId||"",Un.dataset.operationId||"",{kind:Un.dataset.operationKind||"",last_error:Un.dataset.lastError||""});return}if(On){we(On.dataset.beadId||"",On.dataset.attemptId||null,On.dataset.discardMode==="merged"?"merged":"unmerged",On.dataset.operationId||null);return}let Ge=v?.closest?.(".worker-mini__stale-continue");if(Ge){Je("worker-stale-work-continue",Ge.dataset.beadId||"",Ge.dataset.actionId||"");return}let Kt=v?.closest?.(".worker-mini__stale-backup");if(Kt){Je("worker-stale-work-backup-fresh",Kt.dataset.beadId||"",Kt.dataset.actionId||"");return}let $n=v?.closest?.(".worker-mini__stale-recheck");if($n){Je("worker-stale-work-recheck",$n.dataset.beadId||"",$n.dataset.actionId||"");return}let Rs=v?.closest?.(".worker-mini__revise-fix");if(Rs){Ze("worker-revise-fix",Rs.dataset.beadId||"");return}let Os=v?.closest?.(".worker-mini__revise-approve");if(Os){Ze("worker-revise-approve",Os.dataset.beadId||"");return}if(v?.closest?.(".worker-mini__pr"))return;let Is=v?.closest?.(".rtile__failure-badge");if(Is){let A=Is.dataset.attemptId||"";T=T===A?null:A,f();return}let Ls=v?.closest?.(".rtile__provider-hold-badge");if(Ls){let A=Ls.dataset.attemptId||"";C=C===A?null:A,f();return}let Ds=v?.closest?.(".rtile__attempt-copy");if(Ds){let A=Ds.dataset.attemptId||"";A&&gn(A).then(ae=>{ge(ae?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",ae?"success":"error",1400)});return}let Kr=v?.closest?.(".rtile__discard-abandon");if(Kr){let ae=v?.closest?.(".rtile")?.dataset?.beadId;ae&&Be(ae,Kr.dataset.operationId||"",{kind:Kr.dataset.operationKind||"",last_error:Kr.dataset.lastError||""});return}let Eo=v?.closest?.(".rtile__discard");if(Eo){let A=v?.closest?.(".rtile"),ae=A?.dataset?.beadId,De=A?.dataset?.attemptId;ae&&we(ae,De||null,Eo.dataset.confirmation==="merged"?"merged":"unmerged",Eo.dataset.operationId||null);return}if(v?.closest?.(".rtile__pause")){let ae=v?.closest?.(".rtile")?.dataset?.attemptId;ae&&Ke(ae);return}if(v?.closest?.(".rtile__resume-alternate")){let ae=v?.closest?.(".rtile")?.dataset?.attemptId;ae&&qe(ae);return}if(v?.closest?.(".rtile__resume")){let A=v?.closest?.(".rtile__resume"),De=v?.closest?.(".rtile")?.dataset?.attemptId;De&&it(De,A?.dataset?.resumeKind==="settlement"?"settlement":"session");return}if(v?.closest?.(".rtile__session")){let A=v?.closest?.(".rtile"),ae=A?.dataset?.attemptId;if(ae){Et(ae);return}let De=A?.dataset?.beadId;De&&zt(De);return}if(v?.closest?.(".rtile__failure-pop"))return;if(v?.closest?.(".worker-drawer-overlay__backdrop")){je.close(),Re.close();return}if(v?.closest?.(".worker-drawer-host"))return;let Ps=v?.closest?.(".rtile .board-card__roll-toggle");if(Ps){let A=Ps.dataset.rollParent;A&&(Te.has(A)?Te.delete(A):Te.add(A),f());return}let tt=v?.closest?.(".rtile .board-card__roll-child");if(tt){let A=tt.dataset.childId;A&&s&&s(A);return}let y=v?.closest?.(".rtile");if(y){if(v?.closest?.(".rtile__id")){let ae=y.dataset.beadId;ae&&gn(ae).then(De=>{De?ge("\uBCF5\uC0AC\uB428","success",1200):ge("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}let A=y.dataset.beadId;A&&s&&s(A);return}let P=v?.closest?.(".worker-mini, .worker-card");if(P){let A=P.dataset.beadId;if(v?.closest?.('[data-seam="log-path-copy"]'))return;if(v?.closest?.(".worker-mini__id, .worker-card__id")){A&&gn(A).then(De=>{De?ge("\uBCF5\uC0AC\uB428","success",1200):ge("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}let ae=v?.closest?.(".ctl-chip--from");if(ae){let De=ae.dataset.fromId;De&&s&&s(De);return}A&&s&&s(A)}}function Sr(w){let v=w.target;v?.closest?.(".worker-search")&&(Y=v.value,f())}function wa(w){let v=w.target;w.key!=="Escape"||!v?.closest?.(".worker-search")||Y.length===0||(Y="",f())}Se.attach(e),e.addEventListener("click",un),e.addEventListener("change",ee),e.addEventListener("input",Sr),e.addEventListener("keydown",wa);function Ts(w){let v=w.target,R=v&&typeof v.closest=="function"?$e=>v.closest($e):()=>null,ue=!1;T&&!R(".rtile__failure-pop, .rtile__failure-badge")&&(T=null,ue=!0),C&&!R(".rtile__provider-hold-pop, .rtile__provider-hold-badge")&&(C=null,ue=!0),ue&&f()}function Cs(w){w.key==="Escape"&&(T===null&&C===null&&te===null||(T=null,C=null,te=null,f()))}return document.addEventListener("click",Ts),document.addEventListener("keydown",Cs),re.attach(),le.push(()=>{document.removeEventListener("click",Ts),document.removeEventListener("keydown",Cs),re.detach()}),h(),m&&le.push(m.subscribe(()=>{Z.notifyIssuesChanged(),f()})),o&&le.push(o.subscribe(()=>{let w=l&&l()||"";w!==Ue&&(Ue=w,Qe.close()),f(),lr()})),f(),{load(){Z.ensureSessionDefaults(),f()},refreshSessionDefaults:be,destroy(){for(let w of le.splice(0))try{w()}catch{}Se.detach(),e.removeEventListener("click",un),e.removeEventListener("change",ee),Z.destroy();try{Re.destroy()}catch{}Ce.hidden=!0;try{Qe.destroy()}catch{}ct(c``,e)}}}function cc(e){if(!e)return"Unknown";let t=e.split("/").filter(Boolean);return t.length>0?t[t.length-1]:"Unknown"}function F_(e,t,n,r=async()=>{},o=async()=>{}){let i=Ut("views:workspace-picker"),s=null,l=!1,a=!1,u=!1;async function d(q){let K=q.target.value,N=t.getState().workspace?.current?.path||"";if(K&&K!==N){i("switching workspace to %s",K),l=!0,O();try{await n(K)}catch(Y){i("workspace switch failed: %o",Y)}finally{l=!1,O()}}}async function p(){let q=t.getState(),B=q.workspace?.current?.path||q.workspace?.available?.[0]?.path||"";if(!(!B||a)){i("git-pulling workspace %s",B),a=!0,O();try{await r(B)}catch(K){i("workspace git pull failed: %o",K)}finally{a=!1,O()}}}function m(q){let B=q.target;B&&e.contains(B)||T()}function g(q){q.key==="Escape"&&T()}function k(){u||(u=!0,document.addEventListener("mousedown",m),document.addEventListener("keydown",g),O())}function T(){u&&(u=!1,document.removeEventListener("mousedown",m),document.removeEventListener("keydown",g),O())}function C(){u?T():k()}async function te(q){let B=q.target,K=B.value,F=B.checked;i("toggling visibility %s \u2192 %s",K,String(F));try{await o(K,F)}catch(N){i("workspace visibility toggle failed: %o",N)}}function re(q){return q?c`
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
    `:c``}function X(q,B){return c`
      <div class="workspace-picker__manage">
        <button
          type="button"
          class="workspace-picker__manage-button"
          @click=${C}
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
                ${q.map(K=>c`
                    <label
                      class="workspace-picker__manage-row"
                      title="${K.path}"
                    >
                      <input
                        type="checkbox"
                        class="workspace-picker__manage-checkbox"
                        value="${K.path}"
                        .checked=${!B.has(K.path)}
                        @change=${te}
                      />
                      <span class="workspace-picker__manage-name"
                        >${cc(K.path)}</span
                      >
                    </label>
                  `)}
              </div>
            `:""}
      </div>
    `}function D(){let q=t.getState(),B=q.workspace?.current,K=q.workspace?.available||[],F=new Set(q.workspace?.hidden||[]),N=B?.path||K[0]?.path||"";if(K.length===0)return c``;let Y=K.filter(U=>!F.has(U.path)||U.path===N);if(Y.length<=1){let U=Y[0]||K[0],ne=cc(U.path);return c`
        <div class="workspace-picker workspace-picker--single">
          <span class="workspace-picker__label" title="${U.path}"
            >${ne}</span
          >
          ${X(K,F)}
          ${re(N)}
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
          ${Y.map(U=>c`
              <option
                value="${U.path}"
                ?selected=${U.path===N}
                title="${U.path}"
              >
                ${cc(U.path)}
              </option>
            `)}
        </select>
        ${X(K,F)}
        ${re(N)}
        ${l||a?c`<span
              class="workspace-picker__loading"
              aria-hidden="true"
            ></span>`:""}
      </div>
    `}function O(){ct(D(),e)}return O(),s=t.subscribe(()=>O()),{destroy(){s&&(s(),s=null),document.removeEventListener("mousedown",m),document.removeEventListener("keydown",g),ct(c``,e)}}}var B_=["update-status","edit-text","update-priority","create-issue","dep-add","dep-remove","update-assignee","update-exec-settings","update-impl-target","get-session-defaults","set-session-defaults","get-workspace-accounts","set-workspace-accounts","update-workflow-meta","label-add","label-remove","subscribe-list","unsubscribe-list","snapshot","upsert","delete","get-comments","add-comment","delete-issue","list-workspaces","set-workspace","set-workspace-visibility","get-workspace","workspace-changed","git-pull-workspace","subscribe-worker-queue","unsubscribe-worker-queue","worker-queue-snapshot","worker-queue-place","worker-queue-reorder","worker-queue-toggle","worker-automation-toggle","worker-provider-auto-switch-toggle","worker-repo-ops-opt-out-toggle","worker-repo-operation-dismiss","worker-repo-operation-deploy-run","worker-queue-set-slots","worker-queue-set-serial-lane-count","worker-queue-set-orchestration-defaults","worker-queue-remove","worker-queue-arm","worker-queue-disarm","worker-attempt-pause","worker-attempt-stop","worker-attempt-resume","worker-cleanup-retry","worker-resolve-in-session","worker-queue-hold-resume","worker-queue-hold-retry-now","worker-merge-queue-add","worker-merge-queue-add-all","worker-merge-auto-toggle","worker-merge-queue-remove","worker-discard","worker-discard-abandon","worker-stale-work-continue","worker-stale-work-backup-fresh","worker-stale-work-recheck","worker-pr-discard","worker-revise-fix","worker-revise-approve","subscribe-ui-order","unsubscribe-ui-order","ui-order-set","ui-order-snapshot","subscribe-display-policy","unsubscribe-display-policy","display-policy-set","display-policy-snapshot","subscribe-session-log","unsubscribe-session-log","session-log-snapshot","session-log-append","get-attempt-prompt","get-bead-prompt","get-bead-timeline","get-worker-system-prompt","get-session-refs","subscribe-monitor-pipeline","unsubscribe-monitor-pipeline","monitor-pipeline-snapshot","subscribe-impl-presets","unsubscribe-impl-presets","impl-presets-snapshot","impl-preset-create","impl-preset-update","impl-preset-delete","apply-impl-preset","apply-impl-preset-global","monitor-auto-toggle","monitor-lane-create","monitor-lane-update","monitor-lane-confirm","monitor-lane-remove","monitor-lane-provenance"];function uc(){let e=Date.now().toString(36),t=Math.random().toString(36).slice(2,8);return`${e}-${t}`}function U_(e,t,n=uc()){return{id:n,type:e,payload:t}}function W_(e={}){let t=Ut("ws"),n={initialMs:e.backoff?.initialMs??1e3,maxMs:e.backoff?.maxMs??3e4,factor:e.backoff?.factor??2,jitterRatio:e.backoff?.jitterRatio??.2},r=()=>e.url&&e.url.length>0?e.url:typeof location<"u"?(location.protocol==="https:"?"wss://":"ws://")+location.host+"/ws":"ws://localhost/ws",o=null,i="closed",s=0,l=null,a=!0,u=new Map,d=[],p=new Map,m=new Set;function g(D){for(let O of Array.from(m))try{O(D)}catch{}}function k(){if(!a||l)return;i="reconnecting",t("ws reconnecting\u2026"),g(i);let D=Math.min(n.maxMs||0,(n.initialMs||0)*Math.pow(n.factor||1,s)),O=(n.jitterRatio||0)*D,q=Math.max(0,Math.round(D+(Math.random()*2-1)*O));t("ws retry in %d ms (attempt %d)",q,s+1),l=setTimeout(()=>{l=null,X()},q)}function T(D){try{o?.send(JSON.stringify(D))}catch(O){t("ws send failed",O)}}function C(){for(i="open",t("ws open"),g(i),s=0;d.length;){let D=d.shift();D&&T(D)}}function te(D){let O;try{O=JSON.parse(String(D.data))}catch{t("ws received non-JSON message");return}if(!O||typeof O.id!="string"||typeof O.type!="string"){t("ws received invalid envelope");return}if(u.has(O.id)){let B=u.get(O.id);u.delete(O.id),O.ok?B?.resolve(O.payload):B?.reject(O.error||new Error("ws error"));return}let q=p.get(O.type);if(q&&q.size>0)for(let B of Array.from(q))try{B(O.payload)}catch(K){t("ws event handler error",K)}else t("ws received unhandled message type: %s",O.type)}function re(){i="closed",t("ws closed"),g(i);for(let[D,O]of u.entries())O.reject(new Error("ws disconnected")),u.delete(D);s+=1,k()}function X(){if(!a)return;let D=r();try{o=new WebSocket(D),t("ws connecting %s",D),i="connecting",g(i),o.addEventListener("open",C),o.addEventListener("message",te),o.addEventListener("error",()=>{}),o.addEventListener("close",re)}catch(O){t("ws connect failed %o",O),k()}}return X(),{send(D,O){if(!B_.includes(D))return Promise.reject(new Error(`unknown message type: ${D}`));let q=uc(),B=U_(D,O,q);return t("send %s id=%s",D,q),new Promise((K,F)=>{u.set(q,{resolve:K,reject:F,type:D}),o&&o.readyState===o.OPEN?T(B):(t("queue %s id=%s (state=%s)",D,q,i),d.push(B))})},on(D,O){p.has(D)||p.set(D,new Set);let q=p.get(D);return q?.add(O),()=>{q?.delete(O)}},onConnection(D){return m.add(D),()=>{m.delete(D)}},reconnect(){a=!0,l&&(clearTimeout(l),l=null),s=0,X()},close(){a=!1,l&&(clearTimeout(l),l=null);try{o?.close()}catch{}},getState(){return i}}}function bw(){let e=window.__BDUI_BOOTSTRAP__;return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:null}}}async function yw(e,t){try{let r=await(await fetch("/api/config")).json();e.setState({config:r})}catch(n){t("config refresh failed",n)}}var dc=[["tab:board:ready","ready-issues"],["tab:board:blocked","blocked-issues"],["tab:board:in-progress","in-progress-issues"],["tab:board:resolved","resolved-issues"],["tab:board:deferred","deferred-issues"],["tab:board:closed","closed-issues"]],z_=[["tab:worker:ready","ready-issues"],["tab:worker:blocked","blocked-issues"],["tab:worker:in-progress","in-progress-issues"],["tab:worker:resolved","resolved-issues"],["tab:worker:closed","closed-issues"]],xr="tab:worker:closed",vw="bdui.worker.done-range",H_=Wf,K_="worker:queue",G_="ui:order",Y_="ui:display-policy",V_="exec:presets",Ar="tab:board:closed",Q_="beads-ui.board.closed-range";function kw(e){if(!e)return()=>{};function t(r){document.documentElement.style.setProperty("--app-header-h",`${Math.round(r)}px`)}if(t(e.getBoundingClientRect().height),typeof ResizeObserver!="function")return()=>{};let n=new ResizeObserver(r=>{for(let o of r)t(o.contentRect.height+ww(e))});return n.observe(e),()=>n.disconnect()}function ww(e){let t=getComputedStyle(e);return[t.paddingTop,t.paddingBottom,t.borderTopWidth,t.borderBottomWidth].reduce((r,o)=>r+(parseFloat(o)||0),0)}function $w(e){let t=Ut("main");t("bootstrap start"),kw(document.querySelector(".app-header"));let n=c`
    <section id="board-root" class="route board"></section>
    <section id="worker-root" class="route worker" hidden></section>
    <section id="monitor-root" class="route monitor" hidden></section>
    <section id="detail-panel" class="route detail" hidden></section>
  `;ct(n,e);let r=document.getElementById("global-nav"),o=document.getElementById("top-nav"),i=document.getElementById("repo-scope"),s=document.getElementById("usage-meter"),l=document.getElementById("board-root"),a=document.getElementById("worker-root"),u=document.getElementById("monitor-root"),d=document.getElementById("detail-panel");if(s&&c_(s),l&&a&&u&&d){let Z=function(_,b){let ee="Request failed",de="";if(_&&typeof _=="object"){let _t=_;if(typeof _t.message=="string"&&_t.message.length>0&&(ee=_t.message),typeof _t.details=="string")de=_t.details;else if(_t.details&&typeof _t.details=="object")try{de=JSON.stringify(_t.details,null,2)}catch{de=""}}else typeof _=="string"&&_.length>0&&(ee=_);let Fe=b&&b.length>0?`Failed to load ${b}`:"Request failed";le.open(Fe,ee,de)},qe=function(_){return`${xe.getState().workspace.current?.path||""}\0${_}`},dt=function(){Se&&(Se().catch(()=>{}),Se=null),me=null,Re=null},We=function(_){je=_;let b=()=>{je!==_||xe.getState().selected_id!==_||(je=null,at(_))};if(!J){Ue.then(b);return}b()},he=function(_,b,ee,de,Fe){return ee!==G[b]?(Fe().catch(()=>{}),!1):(_.set(de,Fe),!0)},it=function(){let _=xe.getState();wt(_.view==="board"),Be(_.view==="worker"),Ne(et(_)),Ze(_.view==="board"||_.view==="worker"||Ke||!!_.selected_id)},Dt=function(){let _=Lr(ze);return _===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:_}}},nt=function(){let _=Lr(Tt);return _===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:_}}},wt=function(_){if(_)for(let[b,ee]of dc){if(Xe.has(b)||$.has(b))continue;let de=b===Ar?Dt():{type:ee};try{Ce.register(b,de)}catch(Et){t("register %s store failed: %o",b,Et)}$.add(b);let Fe=G.board,_t=!1;ke.subscribeList(b,de).then(Et=>{_t=!he(Xe,"board",Fe,b,Et)}).catch(Et=>{t("subscribe %s failed: %o",b,Et),Z(Et,"board")}).finally(()=>{$.delete(b),_t&&it()})}else Bt()},Bt=function(){G.board+=1;for(let[_]of dc){let b=Xe.get(_);b&&(b().catch(()=>{}),Xe.delete(_));try{Ce.unregister(_)}catch(ee){t("unregister %s failed: %o",_,ee)}}},Be=function(_){if(!_){Je();return}for(let[b,ee]of z_){if(ce.has(b)||$.has(b))continue;let de=b===xr?nt():{type:ee};try{Ce.register(b,de)}catch(Et){t("register %s store failed: %o",b,Et)}$.add(b);let Fe=G.worker,_t=!1;ke.subscribeList(b,de).then(Et=>{_t=!he(ce,"worker",Fe,b,Et)}).catch(Et=>{t("subscribe %s failed: %o",b,Et),Z(Et,"worker")}).finally(()=>{$.delete(b),_t&&it()})}},Je=function(){G.worker+=1;for(let[_]of z_){let b=ce.get(_);b&&(b().catch(()=>{}),ce.delete(_));try{Ce.unregister(_)}catch(ee){t("unregister %s failed: %o",_,ee)}}},Ze=function(_){if(!_){pt();return}we||(Oe("subscribe-worker-queue",{id:K_}).catch(b=>{t("subscribe-worker-queue failed: %o",b)}),we=()=>Oe("unsubscribe-worker-queue",{id:K_}))},pt=function(){we&&(we().catch(()=>{}),we=null)},et=function(_){return _.view==="monitor"||_.selected_id!=null},Ne=function(_){if(!_){S();return}gt||(Oe("subscribe-monitor-pipeline",{id:H_}).catch(b=>{t("subscribe-monitor-pipeline failed: %o",b)}),gt=()=>Oe("unsubscribe-monitor-pipeline",{id:H_}))},S=function(){gt&&(gt().catch(()=>{}),gt=null)},z=function(){j||(Oe("subscribe-ui-order",{id:G_}).catch(_=>{t("subscribe-ui-order failed: %o",_)}),j=()=>Oe("unsubscribe-ui-order",{id:G_}))},Ae=function(){j&&(j().catch(()=>{}),j=null),Q.clear()},ft=function(){ye||(Oe("subscribe-display-policy",{id:Y_}).catch(_=>{t("subscribe-display-policy failed: %o",_)}),ye=()=>Oe("unsubscribe-display-policy",{id:Y_}))},$t=function(){ye&&(ye().catch(()=>{}),ye=null),oe.clear()},xt=function(){yt||(Oe("subscribe-impl-presets",{id:V_}).catch(_=>{t("subscribe-impl-presets failed: %o",_)}),yt=()=>Oe("unsubscribe-impl-presets",{id:V_}))},Zt=function(_){if(!_)return"Unknown";let b=_.split("/").filter(Boolean);return b.length>0?b[b.length-1]:"Unknown"},Ee=function(_,b){L.open(_.path,{missing_state:_.missing_state,...b?{workspace:b}:{}})};var p=Z,m=qe,g=dt,k=We,T=he,C=it,te=Dt,re=nt,X=wt,D=Bt,O=Be,q=Je,B=Ze,K=pt,F=et,N=Ne,Y=S,U=z,ne=Ae,ve=ft,Pe=$t,H=xt,ie=Zt,_e=Ee;let Te=document.getElementById("header-loading"),V=eu(Te),le=ff(e),be=W_(),Oe=V.wrapSend((_,b)=>be.send(_,b)),ke=Gc(Oe),Ce=Yc(),ot=Qc(),st=Sc(),Q=Vc(),oe=xc(),se=Ac(),pe=Ec();be.on("impl-presets-snapshot",_=>{let b=_;b&&typeof b.revision=="number"&&Array.isArray(b.presets)&&se.set({revision:b.revision,presets:b.presets})}),be.on("monitor-pipeline-snapshot",_=>{let b=_;if(!(!b||!Array.isArray(b.workspaces)))try{st.set(b.workspaces,b.workspaces_state,b.cross_lanes)}catch{}}),be.on("ui-order-snapshot",_=>{let b=_;if(b&&typeof b.revision=="number")try{Q.set({revision:b.revision,order:b.order&&typeof b.order=="object"?b.order:{}})}catch{}}),be.on("display-policy-snapshot",_=>{let b=_;if(b&&b.policy&&typeof b.policy=="object")try{oe.set(b.policy)}catch{}}),be.on("session-log-snapshot",_=>{let b=_;if(b&&typeof b.id=="string")try{pe.set(b.id,Array.isArray(b.lines)?b.lines:[],typeof b.last_event_at=="number"?b.last_event_at:null)}catch{}}),be.on("session-log-append",_=>{let b=_;if(b&&typeof b.id=="string")try{pe.append(b.id,b.event)}catch{}}),be.on("snapshot",_=>{let b=_,ee=b&&typeof b.id=="string"?b.id:"",de=ee?Ce.getStore(ee):null;if(de&&b&&b.type==="snapshot")try{de.applyPush(b)}catch{}}),be.on("upsert",_=>{let b=_,ee=b&&typeof b.id=="string"?b.id:"",de=ee?Ce.getStore(ee):null;if(de&&b&&b.type==="upsert")try{de.applyPush(b)}catch{}}),be.on("delete",_=>{let b=_,ee=b&&typeof b.id=="string"?b.id:"",de=ee?Ce.getStore(ee):null;if(de&&b&&b.type==="delete")try{de.applyPush(b)}catch{}});let Se=null,me=null,Re=null,je=null,Qe=()=>{},Ue=new Promise(_=>{Qe=()=>_(void 0)}),J=!1,W=!1;async function at(_){let b=qe(_);if(b===me||b===Re)return;Re=b;let ee=`detail:${_}`,de={type:"issue-detail",params:{id:_}};try{Ce.register(ee,de)}catch(Fe){t("register detail store failed: %o",Fe)}try{let Fe=await ke.subscribeList(ee,de);if(xe.getState().selected_id!==_||qe(_)!==b){await Fe().catch(()=>{});return}Se&&await Se().catch(()=>{}),Se=Fe,me=b}catch(Fe){t("detail subscribe failed: %o",Fe),Z(Fe,"issue details")}finally{Re===b&&(Re=null)}}let Xe=new Map,$=new Set,G={board:0,worker:0},Ke=!1,ze=Ws;try{let _=window.localStorage.getItem(Q_);Ra(_)&&(ze=_)}catch{}let Tt="today";try{let _=window.localStorage.getItem(vw);_!==null&&(Tt=Wn(_))}catch{}async function Mt(_){if(!Ra(_)||_===ze)return;ze=_;try{window.localStorage.setItem(Q_,_)}catch{}let b=Xe.get(Ar);if(!b)return;Xe.delete(Ar),await b().catch(()=>{});let ee=Dt();try{Ce.register(Ar,ee)}catch(de){t("register %s store failed: %o",Ar,de)}try{let de=await ke.subscribeList(Ar,ee);Xe.set(Ar,de)}catch(de){t("re-subscribe %s failed: %o",Ar,de),Z(de,"board")}}async function Lt(_){let b=Wn(_);if(b===Tt)return;Tt=b;let ee=ce.get(xr);if(!ee)return;ce.delete(xr),await ee().catch(()=>{});let de=nt();try{Ce.register(xr,de)}catch(Fe){t("register %s store failed: %o",xr,Fe)}try{let Fe=await ke.subscribeList(xr,de);ce.set(xr,Fe)}catch(Fe){t("re-subscribe %s failed: %o",xr,Fe),Z(Fe,"worker")}}let ce=new Map,we=null,gt=null,j=null,ye=null,yt=null;async function Nt(){ye=null,oe.clear(),yt=null,se.clear(),we=null,gt=null,Xe.clear(),ce.clear(),G.board+=1,G.worker+=1,xt();let _=xe.getState().workspace.current?.path;if(_)try{await be.send("set-workspace",{path:_})}catch(ee){t("workspace restore after reconnect failed: %o",ee);return}ft();let b=xe.getState();wt(b.view==="board"),Be(b.view==="worker"),Ne(et(b)),Ze(b.view==="board"||b.view==="worker"||!!b.selected_id)}async function Wt(){t("clearing all subscriptions for workspace switch"),Bt(),Je(),pt(),ot.clear(),Ae(),z(),$t(),ft(),dt();let _=xe.getState();if(_.selected_id)try{Ce.unregister(`detail:${_.selected_id}`)}catch{}let b=xe.getState();wt(b.view==="board"),Be(b.view==="worker"),Ne(et(b)),Ze(b.view==="board"||b.view==="worker"||!!b.selected_id),b.selected_id&&We(b.selected_id)}async function jt(_){t("requesting workspace switch to %s",_),W=!0;try{let b=await be.send("set-workspace",{path:_});t("workspace switch result: %o",b),b&&b.workspace&&(xe.setState({workspace:{current:{path:b.workspace.root_dir,database:b.workspace.db_path}}}),window.localStorage.setItem("beads-ui.workspace",_),b.changed&&(await Wt(),ge("Switched to "+Zt(_),"success",2e3)))}catch(b){throw t("workspace switch failed: %o",b),ge("Failed to switch workspace","error",3e3),b}finally{W=!1}}async function kt(_){t("requesting workspace git pull for %s",_);try{let b=await be.send("git-pull-workspace",{});t("workspace git pull result: %o",b);let ee=b?.status;if(ee==="up_to_date"){ge("Already up to date","success",2e3);return}if(ee==="stash_pop_conflict"){ge("Git pulled, but stash pop conflicted (check git stash list)","warning",4e3);return}ge("Git pulled "+Zt(_),"success",2e3)}catch(b){t("workspace git pull failed: %o",b);let ee=b?.code,de=b?.message;if(ee==="rebase_conflict"){ge("Git pull conflicts \u2014 reverted (manual resolve required)","error",4e3);return}if(ee==="rebase_conflict_abort_failed"){ge("Git pull conflicts AND rebase --abort failed \u2014 repo left mid-rebase, run 'git rebase --abort' manually","error",6e3);return}if(ee==="busy"){ge("Git pull skipped: another operation is running","warning",3e3);return}let Fe=de?`: ${de}`:"";throw ge(`Git pull failed${Fe}`,"error",3e3),b}}async function Xt(_,b){t("setting workspace visibility %s \u2192 %s",_,String(b));try{await be.send("set-workspace-visibility",{path:_,visible:b}),await Ft()}catch(ee){t("workspace visibility update failed: %o",ee),ge("Failed to update project visibility","error",3e3)}}async function Ft(){try{let _=await be.send("list-workspaces",{});if(t("workspaces loaded: %o",_),_&&Array.isArray(_.workspaces)){let b=_.workspaces.map(_t=>({path:_t.path,database:_t.database,pid:_t.pid,version:_t.version})),ee=_.current?{path:_.current.root_dir,database:_.current.db_path}:null,de=Array.isArray(_.hidden)?_.hidden.filter(_t=>typeof _t=="string"):[];xe.setState({workspace:{current:ee,available:b,hidden:de}});let Fe=window.localStorage.getItem("beads-ui.workspace");Fe&&(!b.some(Et=>Et.path===Fe)||de.includes(Fe)?window.localStorage.removeItem("beads-ui.workspace"):ee&&Fe!==ee.path&&(t("restoring saved workspace preference: %s",Fe),await jt(Fe)))}}catch(_){t("failed to load workspaces: %o",_)}}be.on("workspace-changed",_=>{t("workspace-changed event: %o",_),_&&_.root_dir&&(xe.setState({workspace:{current:{path:_.root_dir,database:_.db_path}}}),Ft(),Wt())});let Ot=!1;if(typeof be.onConnection=="function"){let _=b=>{t("ws state %s",b),b==="reconnecting"||b==="closed"?(Ot=!0,ge("Connection lost. Reconnecting\u2026","error",4e3)):b==="open"&&Ot&&(Ot=!1,ge("Reconnected","success",2200),yw(xe,(ee,de)=>{t(`${ee}: %o`,de)}),Nt())};be.onConnection(_)}let Qt="board";try{let _=window.localStorage.getItem("beads-ui.view");(_==="board"||_==="worker"||_==="monitor")&&(Qt=_)}catch(_){t("view parse error: %o",_)}let xe=Jc({config:bw(),view:Qt});be.on("worker-queue-snapshot",_=>{let b=_;if(!b||!b.queue)return;let ee=xe.getState().workspace.current?.path;if(typeof ee=="string"&&ee.length>0&&b.root_dir!==ee){t("dropping worker-queue snapshot for %s",String(b.root_dir));return}try{ot.set(b.queue)}catch{}});let E=Xc(xe);E.start();let fe=new Set(["get-comments","dep-add","dep-remove","impl-preset-create","impl-preset-update","impl-preset-delete","apply-impl-preset","apply-impl-preset-global","get-session-defaults","set-session-defaults","monitor-lane-create","monitor-lane-update","monitor-lane-confirm","monitor-lane-remove"]),Ie=async(_,b)=>{try{return await Oe(_,b)}catch(ee){if(fe.has(_))throw ee;return[]}};Hf({global_element:r,repo_element:o},xe,E);let ht=document.getElementById("workspace-picker");ht&&F_(ht,xe,jt,kt,Xt);let Ye=Vf(e,(_,b)=>Oe(_,b));try{let _=document.getElementById("new-issue-btn");_&&_.addEventListener("click",()=>Ye.open())}catch{}let St=Jf(e,{policyStore:oe,queueStore:ot,implPresetStore:se,transport:(_,b)=>Oe(_,b),onOpenChange:_=>{let b=Ke;Ke=_,it(),b&&_===!1&&Le.refreshSessionDefaults()},labelOptions:()=>{let _=new Set;for(let[b]of dc)for(let ee of Ce.snapshotFor(b)||[]){let de=ee.labels;if(Array.isArray(de))for(let Fe of de)typeof Fe=="string"&&Fe.length>0&&_.add(Fe)}return Array.from(_).sort()}});try{let _=document.getElementById("display-settings-btn");_&&(_.setAttribute("aria-label","\uC124\uC815"),_.setAttribute("title","\uC124\uC815"),_.addEventListener("click",()=>St.open()))}catch{}let x=document.createElement("div");x.className="md-viewer-root",document.body.appendChild(x);let L=sa(x,{getWorkspacePath:()=>xe.getState().workspace.current?.path}),He=gu(l,{gotoIssue:_=>E.gotoIssue(_),issueStores:Ce,transport:Ie,workerQueueStore:ot,uiOrderStore:Q,displayPolicyStore:oe,closedRange:ze,onClosedRangeChange:_=>{Mt(_)},onNewIssue:()=>Ye.open(),openDoc:Ee}),Le=lc(a,{transport:Ie,issueStores:Ce,queueStore:ot,sessionLogStore:pe,gotoIssue:_=>xe.setState({selected_id:_}),getWorkspacePath:()=>xe.getState().workspace.current?.path,switchWorkspace:_=>jt(_),openDoc:Ee,doneRange:Tt,onDoneRangeChange:_=>{Lt(_)}}),f=zf(u,{transport:Ie,pipelineStore:st,execPresetStore:se,sessionLogStore:pe,router:E,gotoIssue:_=>E.gotoIssue(_),getWorkspacePath:()=>xe.getState().workspace.current?.path,switchWorkspace:_=>jt(_),openDoc:Ee}),h=pf(d,{issueStores:Ce,transport:Ie,queueStore:ot,execPresetStore:se,sessionLogStore:pe,getWorkspacePath:()=>xe.getState().workspace.current?.path,mdViewer:L,depCandidates:()=>{let _=st.get();if(_===null)return null;let b=st.getWorkspacesState(),ee=xe.getState();if(ee.view==="monitor")return vl(_,b);let de=ee.workspace.current?.path;return de?vl(_,b,{root_dir:de}):null},subscribeCandidates:_=>st.subscribe(_),onDepChanged:({type:_,a:b,b:ee})=>{let de=f;_==="dep-add"&&de&&typeof de.recorrectSharedLane=="function"&&de.recorrectSharedLane(_,b,ee)},onNavigate:(_,b)=>{let ee=()=>{xe.getState().view==="worker"?xe.setState({selected_id:_}):E.gotoIssue(_)},de=xe.getState().workspace.current?.path;if(typeof b!="string"||b.length===0||!de||b===de){ee();return}Promise.resolve(jt(b)).then(ee).catch(()=>{ge("\uB808\uD3EC \uC804\uD658\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error",2400)})},onClose:()=>{let _=xe.getState();xe.setState({selected_id:null});try{E.gotoView(_.view==="worker"||_.view==="monitor"?_.view:"board")}catch{}},onOpenExecPresets:()=>{St.open("execution")}}),I=xe.getState().selected_id;I&&(d.hidden=!1,h.load(I),We(I)),xe.subscribe(_=>{let b=_.selected_id;b?(d.hidden=!1,h.load(b),W||We(b)):(h.clear(),d.hidden=!0,dt())});let M=_=>{l.hidden=_.view!=="board",a.hidden=_.view!=="worker",u.hidden=_.view!=="monitor",i&&i.classList.toggle("is-quiet",_.view==="monitor"),wt(_.view==="board"),Be(_.view==="worker"),Ne(et(_)),Ze(_.view==="board"||_.view==="worker"||Ke||!!_.selected_id),!_.selected_id&&_.view==="board"&&He.load(),_.view==="worker"&&Le.load(),_.view==="monitor"?f.load():f.pause(),window.localStorage.setItem("beads-ui.view",_.view)};xe.subscribe(M),M(xe.getState()),z(),ft(),xt(),Ft().finally(()=>{J=!0,Qe()}),window.addEventListener("keydown",_=>{let b=_.ctrlKey||_.metaKey,ee=String(_.key||"").toLowerCase(),de=_.target,Fe=de&&de.tagName?String(de.tagName).toLowerCase():"",_t=Fe==="input"||Fe==="textarea"||Fe==="select"||de&&typeof de.isContentEditable=="boolean"&&de.isContentEditable;b&&ee==="n"&&(_t||(_.preventDefault(),Ye.open()))})}}typeof window<"u"&&typeof document<"u"&&window.addEventListener("DOMContentLoaded",()=>{try{let n=window.localStorage.getItem("beads-ui.theme"),r=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches,o=n==="dark"||n==="light"?n:r?"dark":"light";document.documentElement.setAttribute("data-theme",o);let i=document.getElementById("theme-switch");i&&(i.checked=o==="dark")}catch{}let e=document.getElementById("theme-switch");e&&e.addEventListener("change",()=>{let n=e.checked?"dark":"light";document.documentElement.setAttribute("data-theme",n),window.localStorage.setItem("beads-ui.theme",n)});let t=document.getElementById("app");t&&$w(t)});export{$w as bootstrap,bw as readBootstrapConfig,yw as refreshConfigSnapshot};
//# sourceMappingURL=main.bundle.js.map
