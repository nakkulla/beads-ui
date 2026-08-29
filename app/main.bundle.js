var Yf=Object.create;var Fi=Object.defineProperty;var Vf=Object.getOwnPropertyDescriptor;var Xf=Object.getOwnPropertyNames;var Qf=Object.getPrototypeOf,Zf=Object.prototype.hasOwnProperty;var Jf=(e,t,n)=>t in e?Fi(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var ji=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var e_=(e,t,n,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let o of Xf(t))!Zf.call(e,o)&&o!==n&&Fi(e,o,{get:()=>t[o],enumerable:!(r=Vf(t,o))||r.enumerable});return e};var t_=(e,t,n)=>(n=e!=null?Yf(Qf(e)):{},e_(t||!e||!e.__esModule?Fi(n,"default",{value:e,enumerable:!0}):n,e));var At=(e,t,n)=>Jf(e,typeof t!="symbol"?t+"":t,n);var Hl=ji((tw,zl)=>{var Ir=1e3,Mr=Ir*60,Dr=Mr*60,yr=Dr*24,o_=yr*7,s_=yr*365.25;zl.exports=function(e,t){t=t||{};var n=typeof e;if(n==="string"&&e.length>0)return i_(e);if(n==="number"&&isFinite(e))return t.long?l_(e):a_(e);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(e))};function i_(e){if(e=String(e),!(e.length>100)){var t=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(e);if(t){var n=parseFloat(t[1]),r=(t[2]||"ms").toLowerCase();switch(r){case"years":case"year":case"yrs":case"yr":case"y":return n*s_;case"weeks":case"week":case"w":return n*o_;case"days":case"day":case"d":return n*yr;case"hours":case"hour":case"hrs":case"hr":case"h":return n*Dr;case"minutes":case"minute":case"mins":case"min":case"m":return n*Mr;case"seconds":case"second":case"secs":case"sec":case"s":return n*Ir;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return n;default:return}}}}function a_(e){var t=Math.abs(e);return t>=yr?Math.round(e/yr)+"d":t>=Dr?Math.round(e/Dr)+"h":t>=Mr?Math.round(e/Mr)+"m":t>=Ir?Math.round(e/Ir)+"s":e+"ms"}function l_(e){var t=Math.abs(e);return t>=yr?fs(e,t,yr,"day"):t>=Dr?fs(e,t,Dr,"hour"):t>=Mr?fs(e,t,Mr,"minute"):t>=Ir?fs(e,t,Ir,"second"):e+" ms"}function fs(e,t,n,r){var o=t>=n*1.5;return Math.round(e/n)+" "+r+(o?"s":"")}});var Kl=ji((nw,Gl)=>{function c_(e){n.debug=n,n.default=n,n.coerce=a,n.disable=i,n.enable=o,n.enabled=l,n.humanize=Hl(),n.destroy=u,Object.keys(e).forEach(d=>{n[d]=e[d]}),n.names=[],n.skips=[],n.formatters={};function t(d){let f=0;for(let b=0;b<d.length;b++)f=(f<<5)-f+d.charCodeAt(b),f|=0;return n.colors[Math.abs(f)%n.colors.length]}n.selectColor=t;function n(d){let f,b=null,m,k;function R(...j){if(!R.enabled)return;let H=R,oe=Number(new Date),X=oe-(f||oe);H.diff=X,H.prev=f,H.curr=oe,f=oe,j[0]=n.coerce(j[0]),typeof j[0]!="string"&&j.unshift("%O");let q=0;j[0]=j[0].replace(/%([a-zA-Z%])/g,(I,F)=>{if(I==="%%")return"%";q++;let B=n.formatters[F];if(typeof B=="function"){let ae=j[q];I=B.call(H,ae),j.splice(q,1),q--}return I}),n.formatArgs.call(H,j),(H.log||n.log).apply(H,j)}return R.namespace=d,R.useColors=n.useColors(),R.color=n.selectColor(d),R.extend=r,R.destroy=n.destroy,Object.defineProperty(R,"enabled",{enumerable:!0,configurable:!1,get:()=>b!==null?b:(m!==n.namespaces&&(m=n.namespaces,k=n.enabled(d)),k),set:j=>{b=j}}),typeof n.init=="function"&&n.init(R),R}function r(d,f){let b=n(this.namespace+(typeof f>"u"?":":f)+d);return b.log=this.log,b}function o(d){n.save(d),n.namespaces=d,n.names=[],n.skips=[];let f=(typeof d=="string"?d:"").trim().replace(/\s+/g,",").split(",").filter(Boolean);for(let b of f)b[0]==="-"?n.skips.push(b.slice(1)):n.names.push(b)}function s(d,f){let b=0,m=0,k=-1,R=0;for(;b<d.length;)if(m<f.length&&(f[m]===d[b]||f[m]==="*"))f[m]==="*"?(k=m,R=b,m++):(b++,m++);else if(k!==-1)m=k+1,R++,b=R;else return!1;for(;m<f.length&&f[m]==="*";)m++;return m===f.length}function i(){let d=[...n.names,...n.skips.map(f=>"-"+f)].join(",");return n.enable(""),d}function l(d){for(let f of n.skips)if(s(d,f))return!1;for(let f of n.names)if(s(d,f))return!0;return!1}function a(d){return d instanceof Error?d.stack||d.message:d}function u(){console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")}return n.enable(n.load()),n}Gl.exports=c_});var Yl=ji((un,_s)=>{un.formatArgs=d_;un.save=p_;un.load=f_;un.useColors=u_;un.storage=__();un.destroy=(()=>{let e=!1;return()=>{e||(e=!0,console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."))}})();un.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"];function u_(){if(typeof window<"u"&&window.process&&(window.process.type==="renderer"||window.process.__nwjs))return!0;if(typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))return!1;let e;return typeof document<"u"&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||typeof window<"u"&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||typeof navigator<"u"&&navigator.userAgent&&(e=navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/))&&parseInt(e[1],10)>=31||typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)}function d_(e){if(e[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+e[0]+(this.useColors?"%c ":" ")+"+"+_s.exports.humanize(this.diff),!this.useColors)return;let t="color: "+this.color;e.splice(1,0,t,"color: inherit");let n=0,r=0;e[0].replace(/%[a-zA-Z%]/g,o=>{o!=="%%"&&(n++,o==="%c"&&(r=n))}),e.splice(r,0,t)}un.log=console.debug||console.log||(()=>{});function p_(e){try{e?un.storage.setItem("debug",e):un.storage.removeItem("debug")}catch{}}function f_(){let e;try{e=un.storage.getItem("debug")||un.storage.getItem("DEBUG")}catch{}return!e&&typeof process<"u"&&"env"in process&&(e=process.env.DEBUG),e}function __(){try{return localStorage}catch{}}_s.exports=Kl()(un);var{formatters:m_}=_s.exports;m_.j=function(e){try{return JSON.stringify(e)}catch(t){return"[UnexpectedJSONParseError]: "+t.message}}});var uo=globalThis,is=uo.trustedTypes,Tl=is?is.createPolicy("lit-html",{createHTML:e=>e}):void 0,Ui="$lit$",Bn=`lit$${Math.random().toFixed(9).slice(2)}$`,Wi="?"+Bn,n_=`<${Wi}>`,mr=document,po=()=>mr.createComment(""),fo=e=>e===null||typeof e!="object"&&typeof e!="function",zi=Array.isArray,Ml=e=>zi(e)||typeof e?.[Symbol.iterator]=="function",Bi=`[ 	
\f\r]`,co=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Cl=/-->/g,Rl=/>/g,fr=RegExp(`>|${Bi}(?:([^\\s"'>=/]+)(${Bi}*=${Bi}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Ol=/'/g,Ll=/"/g,Dl=/^(?:script|style|textarea|title)$/i,Hi=e=>(t,...n)=>({_$litType$:e,strings:t,values:n}),c=Hi(1),mo=Hi(2),Yv=Hi(3),yn=Symbol.for("lit-noChange"),Rt=Symbol.for("lit-nothing"),Il=new WeakMap,_r=mr.createTreeWalker(mr,129);function Pl(e,t){if(!zi(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return Tl!==void 0?Tl.createHTML(t):t}var Nl=(e,t)=>{let n=e.length-1,r=[],o,s=t===2?"<svg>":t===3?"<math>":"",i=co;for(let l=0;l<n;l++){let a=e[l],u,d,f=-1,b=0;for(;b<a.length&&(i.lastIndex=b,d=i.exec(a),d!==null);)b=i.lastIndex,i===co?d[1]==="!--"?i=Cl:d[1]!==void 0?i=Rl:d[2]!==void 0?(Dl.test(d[2])&&(o=RegExp("</"+d[2],"g")),i=fr):d[3]!==void 0&&(i=fr):i===fr?d[0]===">"?(i=o??co,f=-1):d[1]===void 0?f=-2:(f=i.lastIndex-d[2].length,u=d[1],i=d[3]===void 0?fr:d[3]==='"'?Ll:Ol):i===Ll||i===Ol?i=fr:i===Cl||i===Rl?i=co:(i=fr,o=void 0);let m=i===fr&&e[l+1].startsWith("/>")?" ":"";s+=i===co?a+n_:f>=0?(r.push(u),a.slice(0,f)+Ui+a.slice(f)+Bn+m):a+Bn+(f===-2?l:m)}return[Pl(e,s+(e[n]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),r]},_o=class e{constructor({strings:t,_$litType$:n},r){let o;this.parts=[];let s=0,i=0,l=t.length-1,a=this.parts,[u,d]=Nl(t,n);if(this.el=e.createElement(u,r),_r.currentNode=this.el.content,n===2||n===3){let f=this.el.content.firstChild;f.replaceWith(...f.childNodes)}for(;(o=_r.nextNode())!==null&&a.length<l;){if(o.nodeType===1){if(o.hasAttributes())for(let f of o.getAttributeNames())if(f.endsWith(Ui)){let b=d[i++],m=o.getAttribute(f).split(Bn),k=/([.?@])?(.*)/.exec(b);a.push({type:1,index:s,name:k[2],strings:m,ctor:k[1]==="."?ls:k[1]==="?"?cs:k[1]==="@"?us:hr}),o.removeAttribute(f)}else f.startsWith(Bn)&&(a.push({type:6,index:s}),o.removeAttribute(f));if(Dl.test(o.tagName)){let f=o.textContent.split(Bn),b=f.length-1;if(b>0){o.textContent=is?is.emptyScript:"";for(let m=0;m<b;m++)o.append(f[m],po()),_r.nextNode(),a.push({type:2,index:++s});o.append(f[b],po())}}}else if(o.nodeType===8)if(o.data===Wi)a.push({type:2,index:s});else{let f=-1;for(;(f=o.data.indexOf(Bn,f+1))!==-1;)a.push({type:7,index:s}),f+=Bn.length-1}s++}}static createElement(t,n){let r=mr.createElement("template");return r.innerHTML=t,r}};function gr(e,t,n=e,r){if(t===yn)return t;let o=r!==void 0?n._$Co?.[r]:n._$Cl,s=fo(t)?void 0:t._$litDirective$;return o?.constructor!==s&&(o?._$AO?.(!1),s===void 0?o=void 0:(o=new s(e),o._$AT(e,n,r)),r!==void 0?(n._$Co??(n._$Co=[]))[r]=o:n._$Cl=o),o!==void 0&&(t=gr(e,o._$AS(e,t.values),o,r)),t}var as=class{constructor(t,n){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=n}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:n},parts:r}=this._$AD,o=(t?.creationScope??mr).importNode(n,!0);_r.currentNode=o;let s=_r.nextNode(),i=0,l=0,a=r[0];for(;a!==void 0;){if(i===a.index){let u;a.type===2?u=new Or(s,s.nextSibling,this,t):a.type===1?u=new a.ctor(s,a.name,a.strings,this,t):a.type===6&&(u=new ds(s,this,t)),this._$AV.push(u),a=r[++l]}i!==a?.index&&(s=_r.nextNode(),i++)}return _r.currentNode=mr,o}p(t){let n=0;for(let r of this._$AV)r!==void 0&&(r.strings!==void 0?(r._$AI(t,r,n),n+=r.strings.length-2):r._$AI(t[n])),n++}},Or=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,n,r,o){this.type=2,this._$AH=Rt,this._$AN=void 0,this._$AA=t,this._$AB=n,this._$AM=r,this.options=o,this._$Cv=o?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,n=this._$AM;return n!==void 0&&t?.nodeType===11&&(t=n.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,n=this){t=gr(this,t,n),fo(t)?t===Rt||t==null||t===""?(this._$AH!==Rt&&this._$AR(),this._$AH=Rt):t!==this._$AH&&t!==yn&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Ml(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==Rt&&fo(this._$AH)?this._$AA.nextSibling.data=t:this.T(mr.createTextNode(t)),this._$AH=t}$(t){let{values:n,_$litType$:r}=t,o=typeof r=="number"?this._$AC(t):(r.el===void 0&&(r.el=_o.createElement(Pl(r.h,r.h[0]),this.options)),r);if(this._$AH?._$AD===o)this._$AH.p(n);else{let s=new as(o,this),i=s.u(this.options);s.p(n),this.T(i),this._$AH=s}}_$AC(t){let n=Il.get(t.strings);return n===void 0&&Il.set(t.strings,n=new _o(t)),n}k(t){zi(this._$AH)||(this._$AH=[],this._$AR());let n=this._$AH,r,o=0;for(let s of t)o===n.length?n.push(r=new e(this.O(po()),this.O(po()),this,this.options)):r=n[o],r._$AI(s),o++;o<n.length&&(this._$AR(r&&r._$AB.nextSibling,o),n.length=o)}_$AR(t=this._$AA.nextSibling,n){for(this._$AP?.(!1,!0,n);t!==this._$AB;){let r=t.nextSibling;t.remove(),t=r}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},hr=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,n,r,o,s){this.type=1,this._$AH=Rt,this._$AN=void 0,this.element=t,this.name=n,this._$AM=o,this.options=s,r.length>2||r[0]!==""||r[1]!==""?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=Rt}_$AI(t,n=this,r,o){let s=this.strings,i=!1;if(s===void 0)t=gr(this,t,n,0),i=!fo(t)||t!==this._$AH&&t!==yn,i&&(this._$AH=t);else{let l=t,a,u;for(t=s[0],a=0;a<s.length-1;a++)u=gr(this,l[r+a],n,a),u===yn&&(u=this._$AH[a]),i||(i=!fo(u)||u!==this._$AH[a]),u===Rt?t=Rt:t!==Rt&&(t+=(u??"")+s[a+1]),this._$AH[a]=u}i&&!o&&this.j(t)}j(t){t===Rt?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},ls=class extends hr{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===Rt?void 0:t}},cs=class extends hr{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==Rt)}},us=class extends hr{constructor(t,n,r,o,s){super(t,n,r,o,s),this.type=5}_$AI(t,n=this){if((t=gr(this,t,n,0)??Rt)===yn)return;let r=this._$AH,o=t===Rt&&r!==Rt||t.capture!==r.capture||t.once!==r.once||t.passive!==r.passive,s=t!==Rt&&(r===Rt||o);o&&this.element.removeEventListener(this.name,this,r),s&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},ds=class{constructor(t,n,r){this.element=t,this.type=6,this._$AN=void 0,this._$AM=n,this.options=r}get _$AU(){return this._$AM._$AU}_$AI(t){gr(this,t)}},ql={M:Ui,P:Bn,A:Wi,C:1,L:Nl,R:as,D:Ml,V:gr,I:Or,H:hr,N:cs,U:us,B:ls,F:ds},r_=uo.litHtmlPolyfillSupport;r_?.(_o,Or),(uo.litHtmlVersions??(uo.litHtmlVersions=[])).push("3.3.1");var st=(e,t,n)=>{let r=n?.renderBefore??t,o=r._$litPart$;if(o===void 0){let s=n?.renderBefore??null;r._$litPart$=o=new Or(t.insertBefore(po(),s),s,void 0,n??{})}return o._$AI(e),o};var ps="today",Fl=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"},{value:"30d",label:"\uCD5C\uADFC 30\uC77C"},{value:"all",label:"\uC804\uCCB4"}],Lr=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"}];function Ln(e){return e==="today"?"today":"7d"}function Gi(e){return e==="today"||e==="7d"||e==="30d"||e==="all"}function br(e,t=Date.now()){switch(e){case"today":{let n=new Date(t);return n.setHours(0,0,0,0),n.getTime()}case"7d":return t-7*864e5;case"30d":return t-30*864e5;case"all":default:return}}function jl(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function Bl(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function Ul(){let e=null,t=[],n,r=new Set;function o(){for(let s of Array.from(r))try{s()}catch{}}return{get(){return e},getWorkspacesState(){return t},crossLanes(){return n},set(s,i,l){e=Array.isArray(s)?s:null,t=Array.isArray(i)?i:[],n=l===void 0?void 0:l!==null&&typeof l=="object"&&typeof l.revision=="number"&&Array.isArray(l.lanes)?{revision:l.revision,lanes:l.lanes}:null,o()},clear(){e=null,t=[],n=void 0,o()},subscribe(s){return r.add(s),()=>r.delete(s)}}}function Wl(){let e=new Map,t=new Set;function n(o){return o.startsWith("session-log:")?o:`session-log:${o}`}function r(){for(let o of Array.from(t))try{o()}catch{}}return{set(o,s,i=null){e.set(n(o),{lines:Array.isArray(s)?[...s]:[],last_event_at:typeof i=="number"?i:null}),r()},append(o,s){let i=n(o),l=e.get(i)||{lines:[],last_event_at:null};l.lines=[...l.lines,s],l.last_event_at=Date.now(),e.set(i,l),r()},get(o){return e.get(n(o))||null},clear(o){typeof o=="string"?e.delete(n(o)):e.clear(),r()},subscribe(o){return t.add(o),()=>t.delete(o)}}}var Vl=t_(Yl(),1);function Ct(e){return(0,Vl.default)(`beads-ui:${e}`)}function g_(e){let n=Xl((e&&typeof e=="object"?e:{}).spec_id);return n?{path:n,source:"native",conflict:!1}:{path:"",source:"none",conflict:!1}}function Xl(e){return typeof e=="string"?e.trim():""}function h_(e){let t=e&&typeof e=="object"?e:{};return t.metadata&&typeof t.metadata=="object"?t.metadata:{}}var b_=/^[A-Za-z0-9_.:-]+@[0-9a-fA-F]{40}$/;function Pr(e){let t=g_(e),n=Xl(h_(e).spec_review),r=b_.test(n),o=r&&n.slice(0,n.indexOf("@"))==="skipped";return t.source==="none"?{...t,evidence:"none",skipped:o}:{...t,evidence:r?"published":"draft",skipped:o}}function $n(e){if(typeof e=="number")return Number.isFinite(e)?e:0;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:0}return 0}function go(e,t){let n=$n(e.created_at),r=$n(t.created_at);if(n!==r)return n<r?1:-1;let o=e.priority??2,s=t.priority??2;if(o!==s)return o-s;let i=e.id,l=t.id;return i<l?-1:i>l?1:0}function nc(e,t){let n=$n(e.created_at),r=$n(t.created_at);if(n!==r)return n<r?-1:1;let o=e.priority??2,s=t.priority??2;if(o!==s)return o-s;let i=e.id,l=t.id;return i<l?-1:i>l?1:0}function rc(e,t){let n=$n(e.updated_at),r=$n(t.updated_at);if(n!==r)return n<r?1:-1;let o=e.id,s=t.id;return o<s?-1:o>s?1:0}function oc(e,t){let n=e.priority??2,r=t.priority??2;if(n!==r)return n-r;let o=$n(e.created_at),s=$n(t.created_at);if(o!==s)return o<s?1:-1;let i=e.id,l=t.id;return i<l?-1:i>l?1:0}function sc(e,t){let n=e.closed_at??0,r=t.closed_at??0;if(n!==r)return n<r?1:-1;let o=e?.id,s=t?.id;return o<s?-1:o>s?1:0}var ms=Object.freeze({priority:"asc",dependents:"desc",released:"desc",spec:"desc",created:"asc",updated:"desc"});function y_(e){return typeof e=="string"&&Object.prototype.hasOwnProperty.call(ms,e)}function Yi(e){if(!e||typeof e!="object")return!1;let t=e;return y_(t.key)&&(t.dir==="asc"||t.dir==="desc")}function Ql(e){if(typeof e=="number")return Number.isFinite(e)?e:null;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:null}return null}function Zl(e,t){switch(t){case"priority":{let n=e.priority;return typeof n=="number"&&Number.isFinite(n)?n:null}case"dependents":{let n=e.dependents_info?e.dependents_info.count:null;return typeof n=="number"&&Number.isFinite(n)?n:null}case"released":{let n=e.release_info?e.release_info.last_released_at:null;return typeof n=="number"&&Number.isFinite(n)?n:null}case"spec":return Pr(e).evidence==="published"?1:0;case"created":return Ql(e.created_at);case"updated":return Ql(e.updated_at);default:return null}}function Jl(e,t,n){let r=Zl(e,n.key),o=Zl(t,n.key);if(r===null||o===null)return r===o?0:r===null?1:-1;if(r===o)return 0;let s=r<o?-1:1;return n.dir==="desc"?-s:s}function ic(e){let t=Array.isArray(e)?e.filter(Yi):[];return(n,r)=>{for(let l of t){let a=Jl(n,r,l);if(a!==0)return a}let o=Jl(n,r,{key:"created",dir:"asc"});if(o!==0)return o;let s=n.id,i=r.id;return s<i?-1:s>i?1:0}}var v_=/^(?:[A-Za-z][A-Za-z0-9]*(?:-[A-Za-z0-9]+)+\s+)?(?:Task|Phase|T)\s*(\d+)/i;function ec(e){let t=e&&e.metadata,n=t?t.task_order:void 0;if(n==null||n==="")return Number.POSITIVE_INFINITY;let r=Number(n);return Number.isFinite(r)?r:Number.POSITIVE_INFINITY}function tc(e){let t=e&&e.title;if(typeof t!="string")return Number.POSITIVE_INFINITY;let n=v_.exec(t);if(!n)return Number.POSITIVE_INFINITY;let r=Number(n[1]);return Number.isFinite(r)?r:Number.POSITIVE_INFINITY}function ac(e,t){let n=ec(e),r=ec(t);if(n!==r)return n<r?-1:1;let o=tc(e),s=tc(t);if(o!==s)return o<s?-1:1;let i=$n(e&&e.created_at),l=$n(t&&t.created_at);if(i!==l)return i<l?-1:1;let a=e&&e.id,u=t&&t.id;return a===u?0:String(a)<String(u)?-1:1}var Ki=2**20;function Nr(e,t){let n=e&&e.id;return t&&typeof n=="string"&&Object.prototype.hasOwnProperty.call(t,n)&&typeof t[n]=="number"&&Number.isFinite(t[n])?t[n]:-$n(e&&e.created_at)}function lc(e){return(t,n)=>{let r=Nr(t,e),o=Nr(n,e);if(r!==o)return r<o?-1:1;let s=t?.id,i=n?.id;return s<i?-1:s>i?1:0}}function Vi(e,t,n){let r=Array.isArray(e)?e:[],o=r.length,s=Math.max(0,Math.min(t,o-1)),i=s-1>=0?r[s-1]:null,l=s+1<o?r[s+1]:null;if(!i&&!l)return{rank:0};if(!i)return{rank:Nr(l,n)-Ki};if(!l)return{rank:Nr(i,n)+Ki};let a=Nr(i,n),u=Nr(l,n),d=(a+u)/2;return a<d&&d<u?{rank:d}:{renormalize:r.map((f,b)=>({bead_id:f.id,rank:b*Ki}))}}function Xi(e,t={}){let n=Ct(`issue-store:${e}`),r=new Map,o=[],s=0,i=new Set,l=!1,a=t.sort||go;function u(){for(let b of Array.from(i))try{b()}catch{}}function d(){o=Array.from(r.values()).sort(a)}function f(b){if(l||!b||b.id!==e)return;let m=Number(b.revision)||0;if(n("apply %s rev=%d",b.type,m),!(m<=s&&b.type!=="snapshot")){if(b.type==="snapshot"){if(m<=s)return;r.clear();let k=Array.isArray(b.issues)?b.issues:[];for(let R of k)R&&typeof R.id=="string"&&R.id.length>0&&r.set(R.id,R);d(),s=m,u();return}if(b.type==="upsert"){let k=b.issue;if(k&&typeof k.id=="string"&&k.id.length>0){let R=r.get(k.id);if(!R)r.set(k.id,k);else{let j=Number.isFinite(R.updated_at)?R.updated_at:0,H=Number.isFinite(k.updated_at)?k.updated_at:0;if(j<=H){for(let oe of Object.keys(R))oe in k||delete R[oe];for(let[oe,X]of Object.entries(k))R[oe]=X}}d()}s=m,u()}else if(b.type==="delete"){let k=String(b.issue_id||"");k&&(r.delete(k),d()),s=m,u()}}}return{id:e,subscribe(b){return i.add(b),()=>{i.delete(b)}},applyPush:f,snapshot(){return o},size(){return r.size},getById(b){return r.get(b)},dispose(){l=!0,r.clear(),o=[],i.clear(),s=0}}}function gs(e){let t=String(e.type||"").trim(),n={};if(e.params&&typeof e.params=="object"){let o=Object.keys(e.params).sort();for(let s of o){let i=e.params[s];n[s]=String(i)}}let r=new URLSearchParams(n).toString();return r.length>0?`${t}?${r}`:t}function cc(e){let t=Ct("subs"),n=new Map,r=new Map;function o(l,a){t("applyDelta %s +%d ~%d -%d",l,(a.added||[]).length,(a.updated||[]).length,(a.removed||[]).length);let u=r.get(l);if(!u||u.size===0)return;let d=Array.isArray(a.added)?a.added:[],f=Array.isArray(a.updated)?a.updated:[],b=Array.isArray(a.removed)?a.removed:[];for(let m of Array.from(u)){let k=n.get(m);if(!k)continue;let R=k.itemsById;for(let j of d)typeof j=="string"&&j.length>0&&R.set(j,!0);for(let j of f)typeof j=="string"&&j.length>0&&R.set(j,!0);for(let j of b)typeof j=="string"&&j.length>0&&R.delete(j)}}async function s(l,a){let u=gs(a);if(t("subscribe %s key=%s",l,u),!n.has(l))n.set(l,{key:u,itemsById:new Map});else{let f=n.get(l);if(f&&f.key!==u){let b=r.get(f.key);b&&(b.delete(l),b.size===0&&r.delete(f.key)),n.set(l,{key:u,itemsById:new Map})}}r.has(u)||r.set(u,new Set);let d=r.get(u);d&&d.add(l);try{await e("subscribe-list",{id:l,type:a.type,params:a.params})}catch(f){let b=n.get(l)||null;if(b){let m=r.get(b.key);m&&(m.delete(l),m.size===0&&r.delete(b.key))}throw n.delete(l),f}return async()=>{t("unsubscribe %s key=%s",l,u);try{await e("unsubscribe-list",{id:l})}catch{}let f=n.get(l)||null;if(f){let b=r.get(f.key);b&&(b.delete(l),b.size===0&&r.delete(f.key))}n.delete(l)}}return{subscribeList:s,_applyDelta:o,_subKeyOf:gs,selectors:{getIds(l){let a=n.get(l);return a?Array.from(a.itemsById.keys()):[]},has(l,a){let u=n.get(l);return u?u.itemsById.has(a):!1},count(l){let a=n.get(l);return a?a.itemsById.size:0},getItemsById(l){let a=n.get(l),u={};if(!a)return u;for(let d of a.itemsById.keys())u[d]=!0;return u}}}}function uc(){let e=Ct("issue-stores"),t=new Map,n=new Map,r=new Set,o=new Map;function s(){for(let a of Array.from(r))try{a()}catch{}}function i(a,u,d){let f=u?gs(u):"",b=n.get(a)||"",m=t.has(a);if(e("register %s key=%s (prev=%s)",a,f,b),m&&b&&f&&b!==f){let k=t.get(a);if(k)try{k.dispose()}catch{}let R=o.get(a);if(R){try{R()}catch{}o.delete(a)}let j=Xi(a,d);t.set(a,j);let H=j.subscribe(()=>s());o.set(a,H)}else if(!m){let k=Xi(a,d);t.set(a,k);let R=k.subscribe(()=>s());o.set(a,R)}return n.set(a,f),()=>l(a)}function l(a){e("unregister %s",a),n.delete(a);let u=t.get(a);u&&(u.dispose(),t.delete(a));let d=o.get(a);if(d){try{d()}catch{}o.delete(a)}}return{register:i,unregister:l,getStore(a){return t.get(a)||null},snapshotFor(a){let u=t.get(a);return u?u.snapshot().slice():[]},subscribe(a){return r.add(a),()=>r.delete(a)}}}function dc(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function pc(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function Qi(e,t){return`#/${e==="worker"||e==="monitor"?e:"board"}?issue=${encodeURIComponent(t)}`}function w_(e){let t=String(e||""),n=t.startsWith("#")?t.slice(1):t,r=n.indexOf("?"),o=r>=0?n.slice(r+1):"";if(o){let l=new URLSearchParams(o).get("issue");if(l)return decodeURIComponent(l)}let s=/^\/issue\/([^\s?#]+)/.exec(n);return s&&s[1]?decodeURIComponent(s[1]):null}function k_(e){let t=String(e||"");return/^#\/worker(\b|\/|$)/.test(t)?"worker":/^#\/monitor(\b|\/|$)/.test(t)?"monitor":"board"}function fc(e){let t=Ct("router"),n=()=>{let r=window.location.hash||"",o=/^#\/issue\/([^\s?#]+)/.exec(r),s=o&&o[1]?decodeURIComponent(o[1]):w_(r),i=k_(r);if(t("hash change \u2192 view=%s id=%s",i,s),e.setState({selected_id:i==="worker"?null:s,view:i,worker:{selected_parent_id:i==="worker"?s:null}}),!!o||/^#\/(issues|epics)(\b|\/|\?|$)/.test(r)){let a=s?`#/${i}?issue=${encodeURIComponent(s)}`:`#/${i}`;window.location.hash!==a&&(window.location.hash=a)}};return{start(){window.addEventListener("hashchange",n),n()},stop(){window.removeEventListener("hashchange",n)},gotoIssue(r){let o=e.getState?e.getState():{view:"board"},s=o.view==="worker"||o.view==="monitor"?o.view:"board",i=Qi(s,r);t("goto issue %s (view=%s)",r,s),window.location.hash!==i?window.location.hash=i:e.setState({selected_id:s==="worker"?null:r,view:s,worker:{selected_parent_id:s==="worker"?r:null}})},gotoView(r){let o=e.getState?e.getState():{selected_id:null,worker:{selected_parent_id:null}},s=r==="worker"?o.worker?.selected_parent_id:o.selected_id,i=s?Qi(r,s):`#/${r}`;t("goto view %s (id=%s)",r,s||""),window.location.hash!==i?window.location.hash=i:e.setState({view:r,selected_id:r==="worker"?null:o.selected_id})}}}var $_=Object.freeze({workspace_config:{default_workspace:null}});function _c(e){return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:$_.workspace_config.default_workspace}}}function mc(e={}){let t=Ct("state"),n={selected_id:e.selected_id??null,view:e.view??"board",filters:{status:e.filters?.status??"all",search:e.filters?.search??"",type:typeof e.filters?.type=="string"?e.filters?.type:""},board:{closed_filter:e.board?.closed_filter==="3"||e.board?.closed_filter==="7"||e.board?.closed_filter==="today"?e.board?.closed_filter:"today"},worker:{selected_parent_id:e.worker?.selected_parent_id??null,show_closed_children:Array.isArray(e.worker?.show_closed_children)?e.worker.show_closed_children:[]},workspace:{current:e.workspace?.current??null,available:e.workspace?.available??[],hidden:e.workspace?.hidden??[]},config:_c(e.config)},r=new Set;function o(){for(let s of Array.from(r))try{s(n)}catch{}}return{getState(){return n},setState(s){let i={...n,...s,filters:{...n.filters,...s.filters||{}},board:{...n.board,...s.board||{}},worker:{...n.worker,...s.worker||{}},workspace:{current:s.workspace?.current!==void 0?s.workspace.current:n.workspace.current,available:s.workspace?.available!==void 0?s.workspace.available:n.workspace.available,hidden:s.workspace?.hidden!==void 0?s.workspace.hidden:n.workspace.hidden},config:s.config!==void 0?_c(s.config):n.config},l=i.workspace.current?.path!==n.workspace.current?.path||i.workspace.available.length!==n.workspace.available.length||i.workspace.hidden.length!==n.workspace.hidden.length||i.workspace.hidden.some((u,d)=>u!==n.workspace.hidden[d]),a=i.config.workspace_config.default_workspace!==n.config.workspace_config.default_workspace;i.selected_id===n.selected_id&&i.view===n.view&&i.filters.status===n.filters.status&&i.filters.search===n.filters.search&&i.filters.type===n.filters.type&&i.board.closed_filter===n.board.closed_filter&&i.worker.selected_parent_id===n.worker.selected_parent_id&&i.worker.show_closed_children.length===n.worker.show_closed_children.length&&i.worker.show_closed_children.every((u,d)=>u===n.worker.show_closed_children[d])&&!l&&!a||(n=i,t("state change %o",{selected_id:n.selected_id,view:n.view,filters:n.filters,board:n.board,worker:n.worker,workspace:n.workspace.current?.path,config:{default_workspace:n.config.workspace_config.default_workspace}}),o())},subscribe(s){return r.add(s),()=>r.delete(s)}}}function gc(e){let t=Ct("activity"),n=0,r=new Map,o=1;function s(){if(!e)return;let u=n>0;e.toggleAttribute("hidden",!u),e.setAttribute("aria-busy",u?"true":"false")}function i(){n+=1,t("start count=%d",n),s()}function l(){let u=n;n=Math.max(0,n-1),u<=0?t("done called but count was already %d",u):t("done count=%d\u2192%d",u,n),s()}function a(u){return async(f,b)=>{let m=o++,k=Date.now();r.set(m,{type:f,start_ts:k}),t("request start id=%d type=%s count=%d",m,f,n+1),i();let R=!1,j=()=>{R||(R=!0,r.delete(m),l())},H=setTimeout(()=>{R||(t("request TIMEOUT id=%d type=%s elapsed=%dms",m,f,Date.now()-k),j())},3e4);try{let oe=await u(f,b),X=Date.now()-k;return t("request done id=%d type=%s elapsed=%dms",m,f,X),oe}catch(oe){let X=Date.now()-k;throw t("request error id=%d type=%s elapsed=%dms err=%o",m,f,X,oe),oe}finally{clearTimeout(H),j()}}}return s(),{wrapSend:a,start:i,done:l,getCount:()=>n,getActiveRequests:()=>{let u=Date.now();return Array.from(r.entries()).map(([d,f])=>({id:d,type:f.type,elapsed_ms:u-f.start_ts}))}}}function be(e,t="info",n=2800){let r=document.createElement("div");r.className="toast",r.textContent=e,r.style.position="fixed",r.style.right="12px",r.style.bottom="12px",r.style.zIndex="1000",r.style.color="#fff",r.style.padding="8px 10px",r.style.borderRadius="4px",r.style.fontSize="12px",t==="success"?r.style.background="#156d36":t==="warning"?r.style.background="#a36a00":t==="error"?r.style.background="#9f2011":r.style.background="rgba(0,0,0,0.85)",(document.body||document.documentElement).appendChild(r),setTimeout(()=>{try{r.remove()}catch{}},n)}function qr(e=void 0,t=void 0){function n(){if(!t||typeof t.get!="function")return null;let s=t.get();return s&&s.order?s.order:{}}function r(s,i,l){let a=e&&e.snapshotFor?e.snapshotFor(s).slice():[];if(i==="closed")return a.sort(sc),a;switch(l){case"created_desc":return a.sort(go),a;case"created_asc":return a.sort(nc),a;case"updated_desc":return a.sort(rc),a;case"priority":return a.sort(oc),a;case"manual":default:{let u=n();return u?a.sort(lc(u)):a.sort(go),a}}}function o(s){let i=[];return e&&typeof e.subscribe=="function"&&i.push(e.subscribe(s)),t&&typeof t.subscribe=="function"&&i.push(t.subscribe(s)),()=>{for(let l of i)try{l()}catch{}}}return{selectBoardColumn:r,subscribe:o}}function tr(e){if(!e)return null;if(typeof e=="number")return Number.isFinite(e)?e:null;let t=Date.parse(e);return Number.isFinite(t)?t:null}function Ht(e){let t=tr(e);if(t===null)return"";let n=new Date(t),r=o=>String(o).padStart(2,"0");return`${n.getFullYear()}-${r(n.getMonth()+1)}-${r(n.getDate())} ${r(n.getHours())}:${r(n.getMinutes())}`}function nn(e,t){let n=tr(e);if(n===null)return"";let o=(typeof t=="number"?t:Date.now())-n;if(o<6e4)return"\uBC29\uAE08";let s=Math.floor(o/6e4);if(s<60)return`${s}\uBD84 \uC804`;let i=Math.floor(o/36e5);if(i<24)return`${i}\uC2DC\uAC04 \uC804`;let l=Math.floor(o/864e5);if(l<7)return`${l}\uC77C \uC804`;let a=Math.floor(l/7);if(l<30)return`${a}\uC8FC \uC804`;let u=Math.floor(l/30);return u<12?`${u}\uAC1C\uC6D4 \uC804`:`${Math.floor(l/365)}\uB144 \uC804`}function hc(e){if(!Array.isArray(e))return null;let t=null,n=-1;for(let r of e){if(!r||r.status!=="in_progress")continue;let o=tr(r.updated_at)??0;if(t===null||o>n){t=r,n=o;continue}o===n&&String(r.id)<String(t.id)&&(t=r)}return t}function hs(e){let t=e&&e.parent;return typeof t=="string"?t:t&&t.id?String(t.id):""}function bs(e){let t=new Map;for(let r of e)r&&r.id&&!t.has(r.id)&&t.set(r.id,r);let n=new Map;for(let r of t.values()){let o=hs(r);if(!o)continue;let s=n.get(o);s||(s=[],n.set(o,s)),s.push({id:r.id,title:r.title,status:r.status,metadata:r.metadata,workflow:r.workflow,created_at:r.created_at,updated_at:r.updated_at})}return n}function ys(e,t){let n=e.get(t)||[],r=0;for(let s of n)(s.status==="resolved"||s.status==="closed")&&(r+=1);let o=hc(n);return{total:n.length,count:r,current:o,children:n}}function bc(e){let t=e.transport,n=e.uiOrderStore;function r(i,l){return"renormalize"in i?i.renormalize:[{bead_id:l,rank:i.rank}]}function o(i,l){let a={...i.order};for(let u of l)a[u.bead_id]=u.rank;n&&n.set({revision:i.revision,order:a})}async function s(i,l,a){if(!t||!n)return;let u=n.get()||{revision:0,order:{}},d=r(Vi(l,a,u.order),i);o(u,d);let f=await t("ui-order-set",{expected_revision:u.revision,entries:d});if(f&&f.conflict){let b={revision:typeof f.revision=="number"?f.revision:0,order:f.order||{}};n.set(b);let m=r(Vi(l,a,b.order),i);o(b,m);let k=await t("ui-order-set",{expected_revision:b.revision,entries:m});k&&k.applied&&n.set({revision:typeof k.revision=="number"?k.revision:0,order:k.order||{}})}else f&&f.applied&&n.set({revision:typeof f.revision=="number"?f.revision:0,order:f.order||{}})}return{applyReorder:s}}function yc(e){if(typeof e!="string")return"";let t=e.indexOf("-");return t>0?e.slice(0,t):""}function Un(e,t){let n=yc(e),r=yc(t);return n.length===0||r.length===0?!1:n!==r}function vs(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function Zi(e,t){return!t||typeof e!="string"||e.length===0||vs(t.visible_labels).includes(e)?!0:vs(t.hidden_labels).includes(e)?!1:!vs(t.hidden_prefixes).some(n=>n.length>0&&e.startsWith(n))}function vc(e,t){return vs(e).filter(n=>Zi(n,t))}function nr(e,t){let n=e&&e.chips?e.chips[t]:void 0;return typeof n=="boolean"?n:!0}function x_(e){switch(e){case"in_progress":return"board-card__dot board-card__dot--progress";case"resolved":return"board-card__dot board-card__dot--resolved";case"closed":return"board-card__dot board-card__dot--closed";case"blocked":return"board-card__dot board-card__dot--blocked";default:return"board-card__dot"}}function A_(e,t,n,r,o){return c`<button
    type="button"
    class="board-card__roll-toggle"
    data-roll-parent=${e}
    aria-expanded=${r?"true":"false"}
    @click=${o}
  >
    children ${t}/${n} ${r?"\u25B4":"\u25BE"}
  </button>`}function S_(e,t,n,r){return c`<button
    type="button"
    class="board-card__roll-child"
    data-child-id=${e.id}
    @click=${r?o=>r(o,e.id):void 0}
  >
    <span class=${x_(e.status)}>●</span>
    <span class="board-card__roll-child-ord">${t}</span>
    <span class="board-card__roll-child-title">${e.title||e.id}</span>
    ${n}
  </button>`}function ws(e,t){let n=e.total||0,r=!!t.expanded,o=t.trailing??"",s=typeof t.empty_label=="string"&&t.empty_label.length>0?t.empty_label:null;if(n===0&&s===null)return"";let i=Array.isArray(e.children)?e.children:[],l=n>0?i.slice().sort(ac):i;return c`
    <div class="board-card__roll">
      <div class="board-card__roll-meta">
        ${n>0?A_(t.parent_id,e.count,n,r,t.onToggle):c`<span class="board-card__roll-none">${s}</span>`}
        ${o}
      </div>
      ${n>0&&e.current?c`<div class="board-card__roll-current">
            └
            <span class="board-card__cur-child"
              >● ${e.current.title||e.current.id}</span
            >
          </div>`:""}
      ${r&&n>0?c`<div class="board-card__roll-list">
            ${l.map((a,u)=>S_(a,u+1,t.childChips?t.childChips(a):null,t.onChildClick))}
          </div>`:""}
    </div>
  `}var E_={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"mrg",close:"mrg"},kc={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"merge",close:"close"},wc={quick_fix:["impl","close"],spec_backed:["spec","impl","pr","merge"],full_plan:["spec","plan","impl","pr","merge"]},T_={review:"\u2713",skip:"\u2298"},rr={none:"\uBBF8\uB3C4\uB2EC",dim:"\uC9C4\uD589 \uC911",stale:"\uC7AC\uAC80\uD1A0 \uD544\uC694",review:"\uAC80\uD1A0 \uC644\uB8CC",skip:"\uAC80\uD1A0 \uC0DD\uB7B5",done:"\uC644\uB8CC"};function C_(e,t,n){if(!(n==="in_progress"||n==="resolved"))return null;for(let o of e){let s=t[o];if(s&&s.fill==="dim"&&s.stale!==!0)return o}return null}function $c(e){let t=e&&e.fill||"none";return t==="none"?rr.none:e&&e.stale===!0?rr.stale:t==="dim"?rr.dim:e&&e.glyph==="review"?rr.review:e&&e.glyph==="skip"?rr.skip:rr.done}function R_(e){if(!e||e.fill==="none"||!e.approval_state)return $c(e);let t=[];return e.glyph==="review"?t.push(rr.review):e.glyph==="skip"&&t.push(rr.skip),e.approval_state==="missing"?t.push("\uC2B9\uC778 \uD544\uC694"):e.approval_state==="stale"?t.push("\uC7AC\uC2B9\uC778 \uD544\uC694"):e.approval_state==="unknown"?t.push("\uC2B9\uC778 \uD655\uC778 \uBD88\uAC00"):t.push("\uC2B9\uC778 \uC644\uB8CC"),t.join(" \xB7 ")}function O_(e,t,n,r){let o=E_[e]||e,s=t&&t.fill||"none",i=!!t&&t.stale===!0,l=T_[t&&t.glyph||""]||"",a="bar";s==="dim"?a+=` b-${o} dim`:s==="full"&&(a+=` b-${o} full`),i&&(a+=" stale"),n&&(a+=" cur");let u=s==="none"?"lbl":`lbl l-${o} on`,d=n?`color: var(--stage-${o}-on)`:"",f=kc[e]||e,b=r?xc(t):null;if(!b)return c`
      <div class="seg">
        <div class=${a} style=${d}>${l}</div>
        <div class=${u}>${f}</div>
      </div>
    `;let m=`${f} \uBB38\uC11C \uC5F4\uAE30 \xB7 ${b.path}`;return c`
    <button
      type="button"
      class="seg seg--doc"
      aria-label=${m}
      title=${m}
      @click=${k=>{k.preventDefault(),k.stopPropagation(),r(k,b,e)}}
    >
      <div class=${a} style=${d}>${l}</div>
      <div class=${u}>${f}</div>
    </button>
  `}function xc(e){let t=e?e.doc:null;return!t||typeof t.path!="string"||t.path.length===0?null:t}function ks(e,t,n={}){if(!e||!e.stages)return"";let r=n.onOpenDoc,o=wc[e.route]||wc.spec_backed,s=e.stages,i=C_(o,s,String(t||"open")),l=`\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uC9C4\uD589: ${o.map(u=>`${kc[u]||u} ${u==="plan"?R_(s[u]||{}):$c(s[u]||{})}`).join(" \xB7 ")}`,a=!!r&&o.some(u=>xc(s[u]||{})!==null);return c`
    <div
      class="stp"
      role=${a?"group":"img"}
      aria-label=${l}
    >
      ${o.map(u=>O_(u,s[u]||{},u===i,r))}
    </div>
  `}function L_(e){return typeof e!="number"||!Number.isFinite(e)?"":`P${Math.max(0,Math.min(4,e))}`}var Ac=2;function Sc(e){let t=e.slice(0,Ac).join(", "),n=e.length-Ac;return`\u26D3 blocked: ${t}${n>0?` +${n}`:""}`}function I_(e,t){if(!t)return[];let n=[],r=Array.isArray(t.blockers)?t.blockers:[],o=[],s=[];for(let i of r)(Un(e,i)?s:o).push(i);return o.length>0&&n.push(c`<span class="ctl-chip ctl-chip--blocked-dep"
        >${Sc(o)}</span
      >`),s.length>0&&n.push(c`<span class="ctl-chip ctl-chip--blocked-foreign"
        >${Sc(s)}</span
      >`),n}function M_(e){if(!e||typeof e!="object")return null;let t=e.awaiting_user;if(typeof t!="string")return null;let n=t.trim();return n.length===0?null:c`<span class="ctl-chip ctl-chip--blocked"
    >${`\u23F8 \uC0AC\uC6A9\uC790 \uB9AC\uBDF0 \uD544\uC694: ${n}`}</span
  >`}function Ji(e){return e==="delegated"?"\uC704\uC784":e==="main"?"\uBA54\uC778":null}function $s(e){return e.effort?`${e.actor}:${e.effort}`:e.actor}function Wn(e){return`${e.kind}:${$s(e)}@${e.sha}`}function xs(e,t){if(!e)return null;let n=Ji(e.kind),r=e.reason,o=e.kind==="delegated"?r===null:typeof r=="string"&&r.trim().length>0&&!/[\r\n]/.test(r);if(!n||!o)return null;let s=Ji(t?.kind),i=s!==null&&t?.kind!==e.kind,l=`\uACC4\uD68D \xB7 ${n}${i?` \u2192 ${s}`:""}`,a=`planned_execution ${e.kind}${typeof r=="string"?`:${r}`:""}`,u=t?` \xB7 exec_receipt ${Wn(t)}`:"";return{kind:e.kind,label:l,title:`${a}${u}`}}function Ec(e,t){let n=xs(e,t);return n?c`<span
        class="ctl-chip ctl-chip--planned"
        data-kind=${n.kind}
        title=${n.title}
        >${n.label}</span
      >`:null}function D_(e){if(!e)return null;let t=Ji(e.kind);return t?c`<span
    class="ctl-chip ctl-chip--exec-receipt"
    title=${`exec_receipt ${Wn(e)}`}
    >${`\uC2E4\uD589 \xB7 ${t}`}</span
  >`:null}function P_(e,t){let n=t.policy||null,r=e.workflow&&e.workflow.chips||{},o=[];if(r.route&&nr(n,"route")){let l=r.route_source==="derived";o.push(c`<span
        class="ctl-chip ctl-chip--route${l?" is-derived":""}"
        title=${l?"route \uBBF8\uD540 (metadata unset)":"route"}
        >${l?"unset":r.route}</span
      >`)}if(r.fast_track&&nr(n,"fast_track")&&o.push(c`<span class="ctl-chip ctl-chip--ft">⚡ fast_track</span>`),r.pr&&nr(n,"pr")){let l=r.pr.number;o.push(c`<span class="ctl-chip ctl-chip--pr"
        >${`PR${l!=null?` #${l}`:""}`}</span
      >`)}let s=Ec(r.planned_execution,r.exec_receipt);if(s&&o.push(s),r.exec_receipt){let l=r.exec_receipt;o.push(c`<span
        class="ctl-chip ctl-chip--exec-receipt"
        title=${`exec_receipt ${Wn(l)}`}
        >${`exec ${l.kind==="delegated"?$s(l):`main:${l.actor}`} \xB7 ${l.sha.slice(0,7)}`}</span
      >`)}if(r.impl_entry){let l=r.impl_entry;o.push(c`<span
        class="ctl-chip ctl-chip--impl-entry"
        title=${`impl_entry ${l.actor}@${l.sha}`}
        >${`impl ${l.actor} \xB7 ${l.sha.slice(0,7)}`}</span
      >`)}for(let l of vc(e.labels,n))o.push(c`<span class="ctl-chip ctl-chip--label">${l}</span>`);if(e.from_id&&nr(n,"from")&&o.push(c`<button
        type="button"
        class="ctl-chip ctl-chip--from"
        title=${`\uCD9C\uCC98 ${e.from_id} \uC5F4\uAE30`}
        @click=${l=>{l.stopPropagation(),t.onFromChipClick&&t.onFromChipClick(l,String(e.from_id))}}
      >
        ↩ from ${e.from_id}
      </button>`),nr(n,"blocked")){let l=M_(e.metadata);l&&o.push(l),o.push(...I_(e.id,e.blocked_info))}return t.cleanupFailureFor&&t.cleanupFailureFor(e.id)&&nr(n,"blocked")&&o.push(c`<span class="ctl-chip ctl-chip--cleanup">⚠ 정리 멈춤</span>`),o.length===0?"":c`<div class="board-card__chips">${o}</div>`}function N_(e){let t=nn(e.created_at),n=nn(e.updated_at);return!t&&!n?"":c`<span class="board-card__times">
    ${t?c`<span
          class="board-card__time"
          title=${`\uC0DD\uC131 ${Ht(e.created_at)}`}
          >생성 ${t}</span
        >`:""}
    ${t&&n?c`<span class="board-card__time-sep">·</span>`:""}
    ${n?c`<span
          class="board-card__time"
          title=${`\uC218\uC815 ${Ht(e.updated_at)}`}
          >수정 ${n}</span
        >`:""}
  </span>`}function q_(e,t){let n=t.rollupFor?t.rollupFor(e.id):{total:0,count:0,current:null,children:[]};return ws(n,{parent_id:e.id,expanded:t.isExpanded?t.isExpanded(e.id):!0,trailing:N_(e),empty_label:"children \uC5C6\uC74C",childChips:ea,onToggle:r=>t.onRollupToggle&&t.onRollupToggle(r,e.id),onChildClick:(r,o)=>t.onChildClick&&t.onChildClick(r,o)})}function ea(e){let t=e?.workflow?.chips?.planned_execution,n=e?.workflow?.chips?.exec_receipt;return xs(t,n)?c`<span class="board-card__roll-child-chips">
    ${Ec(t,n)}
    ${D_(n)}
  </span>`:null}function As(e,t){let n=L_(e.priority);return c`
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
      ${P_(e,t)}
      ${e.workflow&&nr(t.policy||null,"stepper")?ks(e.workflow,e.status,{onOpenDoc:t.onOpenDoc}):""}
      ${q_(e,t)}
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
              ${Fl.map(s=>c`<option
                    value=${s.value}
                    ?selected=${s.value===e.closed_range}
                  >
                    ${s.label}
                  </option>`)}
            </select>`:""}
      </header>
      <div
        class="board-column__body"
        role="list"
        aria-labelledby=${e.id+"-header"}
      >
        ${e.items.map(s=>As(s,t))}
      </div>
    </section>
  `}function Tc(e,t,n){return c`
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
          ${e.items.length===0?c`<div class="deferred-popup__empty">Deferred 이슈 없음</div>`:e.items.map(r=>As(r,t))}
        </div>
      </div>
    </dialog>
  `}var F_=[{value:"",label:"\uC6B0\uC120\uC21C\uC704"},{value:"0",label:"P0"},{value:"1",label:"P1"},{value:"2",label:"P2"},{value:"3",label:"P3"},{value:"4",label:"P4"}],j_=[{value:"",label:"\uD0C0\uC785"},{value:"bug",label:"bug"},{value:"feature",label:"feature"},{value:"task",label:"task"},{value:"epic",label:"epic"},{value:"chore",label:"chore"}],B_=[{value:"created_desc",label:"\uC0DD\uC131 \uCD5C\uC2E0\uC21C"},{value:"created_asc",label:"\uC0DD\uC131 \uC624\uB798\uB41C\uC21C"},{value:"updated_desc",label:"\uC218\uC815 \uCD5C\uC2E0\uC21C"},{value:"priority",label:"\uC6B0\uC120\uC21C\uC704\uC21C"},{value:"manual",label:"\uC218\uB3D9(\uB4DC\uB798\uADF8)"}];function U_(e,t,n){let r=e.labels.length,o=r>0?`\uB77C\uBCA8 ${r}`:"\uB77C\uBCA8";return c`
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
            ${n.label_options.length===0?c`<div class="board-filter__label-empty">라벨 없음</div>`:n.label_options.map(s=>c`<label class="board-filter__label-row">
                      <input
                        type="checkbox"
                        .checked=${e.labels.includes(s)}
                        @change=${()=>t.onLabelToggle(s)}
                      />
                      <span>${s}</span>
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
  `}function Cc(e,t,n){return c`
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
        ${F_.map(r=>c`<option
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
        ${j_.map(r=>c`<option
              value=${r.value}
              ?selected=${e.type===r.value}
            >
              ${r.label}
            </option>`)}
      </select>
      ${U_(e,t,n)}
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
        ${B_.map(r=>c`<option
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
  `}var W_=200,z_={"ready-col":"open","in-progress-col":"in_progress","resolved-col":"resolved","closed-col":"closed"},H_=new Set(["blocked-col","ready-col","in-progress-col","resolved-col"]),Rc="beads-ui.board.sort",Oc=new Set(["created_desc","created_asc","updated_desc","priority","manual"]);function G_(){try{let e=window.localStorage.getItem(Rc);if(e&&Oc.has(e))return e}catch{}return"created_desc"}function Lc(e,t){let n=Ct("views:board"),r=t.gotoIssue,o=t.issueStores,s=t.transport,i=t.uiOrderStore,l=t.displayPolicyStore,a=t.workerQueueStore,u=t.onClosedRangeChange,d=t.onNewIssue,f=t.openDoc,b=t.closedRange||ps,m=o?qr(o,i):null,k=bc({transport:s,uiOrderStore:i}),R=[],j=[],H=[],oe=[],X=[],q=[],O=!1,I=0,F=G_(),B=new Map,ae=new Map,N=new Map,W=new Set,Z={search:"",priority:"",type:"",labels:[]},ee=!1,Se=null;function ge(T){return String(T.status||"open")==="open"}function ue(T){return String(T.status||"open")==="open"}function P(T){let K=Z.search.trim().toLowerCase(),Ie=Z.priority,Ue=Z.type,qe=Z.labels;return T.filter(tt=>{if(K){let Oe=String(tt.id||"").toLowerCase(),He=String(tt.title||"").toLowerCase();if(!Oe.includes(K)&&!He.includes(K))return!1}if(Ie!==""&&String(tt.priority)!==Ie||Ue!==""&&String(tt.issue_type||"")!==Ue)return!1;if(qe.length>0){let Oe=Array.isArray(tt.labels)?tt.labels:[];if(!qe.some(He=>Oe.includes(He)))return!1}return!0})}function we(){let T=new Set;for(let K of[R,j,H,oe,X,q])for(let Ie of K){let Ue=Array.isArray(Ie.labels)?Ie.labels:[];for(let qe of Ue)typeof qe=="string"&&qe.length>0&&T.add(qe)}return Array.from(T).sort()}function xe(){return Z.search.trim()!==""||Z.priority!==""||Z.type!==""||Z.labels.length>0}function E(){try{if(m){let T=m.selectBoardColumn("tab:board:in-progress","in_progress",F),K=m.selectBoardColumn("tab:board:blocked","blocked",F).filter(ue),Ie=new Set(T.map(ze=>ze.id)),Ue=m.selectBoardColumn("tab:board:ready","ready",F).filter(ze=>ge(ze)&&!Ie.has(ze.id)),qe=m.selectBoardColumn("tab:board:resolved","resolved",F),tt=m.selectBoardColumn("tab:board:deferred","deferred",F),Oe=m.selectBoardColumn("tab:board:closed","closed").slice(0,W_),He=[...K,...Ue,...T,...qe,...Oe];J(He);let Je=new Set;for(let ze of He)ze&&ze.id&&!hs(ze)&&Je.add(ze.id);let bt=!xe();R=bt?ho(K,Je):K,j=bt?ho(Ue,Je):Ue,H=bt?ho(T,Je):T,oe=bt?ho(qe,Je):qe,X=tt,I=tt.length,q=bt?ho(Oe,Je):Oe,B=new Map;for(let ze of R)B.set(ze.id,"open");for(let ze of j)B.set(ze.id,"open");for(let ze of H)B.set(ze.id,"in_progress");for(let ze of oe)B.set(ze.id,"resolved");for(let ze of X)B.set(ze.id,"deferred");for(let ze of q)B.set(ze.id,"closed");ae=new Map;for(let ze of R)ae.set(ze.id,"blocked-col");for(let ze of j)ae.set(ze.id,"ready-col");for(let ze of H)ae.set(ze.id,"in-progress-col");for(let ze of oe)ae.set(ze.id,"resolved-col");for(let ze of q)ae.set(ze.id,"closed-col")}je()}catch{R=[],j=[],H=[],oe=[],X=[],q=[],N=new Map,je()}}function J(T){N=bs(T)}function Ae(T){return ys(N,T)}function _e(T){return!W.has(T)}function ke(T,K){T.preventDefault(),T.stopPropagation(),W.has(K)?W.delete(K):W.add(K),je()}function me(T,K){T.preventDefault(),T.stopPropagation(),r(K)}function De(T,K){T.preventDefault(),T.stopPropagation(),r(K)}function ot(T,K){Se||r(K)}function Ye(T,K){T.preventDefault(),T.stopPropagation(),K_(K).then(Ie=>{Ie&&be("\uBCF5\uC0AC\uB428","success",1200)})}function M(T,K){Se=K,T.dataTransfer&&(T.dataTransfer.setData("text/plain",K),T.dataTransfer.effectAllowed="move"),T.target.classList.add("board-card--dragging")}function se(T){T.target.classList.remove("board-card--dragging"),$t(),setTimeout(()=>{Se=null},0)}function le(T){let K=String(T.target.value||"");!K||K===b||(b=K,u&&u(K),je())}function pe(){return l?l.get():null}function he(T){let K=a?a.get():null,Ie=K?K.cleanup_failed:null;if(!Ie||typeof Ie!="object"||Array.isArray(Ie))return null;let Ue=Ie[T];return!Ue||typeof Ue!="object"||Array.isArray(Ue)?null:Ue}let ce={onCardClick:ot,onCopyId:Ye,onDragStart:M,onDragEnd:se,onClosedRangeChange:le,rollupFor:Ae,isExpanded:_e,onRollupToggle:ke,onChildClick:me,onFromChipClick:De,onOpenDoc:f?(T,K)=>f(K):void 0,cleanupFailureFor:he,get policy(){return pe()}};function Fe(T,K){Se||(v(),r(K))}function Ge(T,K){T.preventDefault(),T.stopPropagation(),v(),r(K)}let Ze={...ce,onCardClick:Fe,onChildClick:Ge,onFromChipClick:Ge,onOpenDoc:f?(T,K)=>{v(),f(K)}:void 0,get policy(){return pe()}};function Pe(T){let K=T.target,Ie=e.querySelector(".board-filter__labels");K&&Ie&&Ie.contains(K)||Ne()}function Q(T){T.key==="Escape"&&Ne()}function U(){ee||(ee=!0,document.addEventListener("mousedown",Pe),document.addEventListener("keydown",Q),je())}function Ne(){ee&&(ee=!1,document.removeEventListener("mousedown",Pe),document.removeEventListener("keydown",Q),je())}function ut(T){T.key==="Escape"&&v()}function et(){O||(O=!0,document.addEventListener("keydown",ut),je())}function v(){O&&(O=!1,document.removeEventListener("keydown",ut),je())}let z={onClose:v,onOverlayClick(T){T.target===T.currentTarget&&v()}},Ee={onSearchInput(T){Z.search=String(T.target.value||""),E()},onPriorityChange(T){Z.priority=String(T.target.value||""),E()},onTypeChange(T){Z.type=String(T.target.value||""),E()},onSortChange(T){let K=String(T.target.value||"");if(!(!Oc.has(K)||K===F)){F=K;try{window.localStorage.setItem(Rc,K)}catch{}E()}},onDeferredToggle(){O?v():et()},onLabelMenuToggle(){ee?Ne():U()},onLabelToggle(T){let K=Z.labels.indexOf(T);K===-1?Z.labels.push(T):Z.labels.splice(K,1),E()},onLabelClear(){Z.labels.length!==0&&(Z.labels=[],E())},onNewIssue(){d&&d()}};function Ce(){return c`
      <div class="board-view">
        ${Cc(Z,Ee,{sort_mode:F,deferred_popup_open:O,deferred_count:I,label_options:we(),label_menu_open:ee})}
        <div class="board-root">
          ${Fr({title:"Blocked",id:"blocked-col",items:P(R)},ce)}
          ${Fr({title:"Ready",id:"ready-col",items:P(j)},ce)}
          ${Fr({title:"In progress",id:"in-progress-col",items:P(H)},ce)}
          ${Fr({title:"Resolved",id:"resolved-col",items:P(oe)},ce)}
          ${Fr({title:"Closed",id:"closed-col",items:P(q),is_closed:!0,closed_range:b},ce)}
        </div>
        ${O?Tc({items:P(X),count:I},Ze,z):""}
      </div>
    `}function je(){st(Ce(),e),Ve()}function Ve(){try{let T=e.querySelector("#deferred-popup");T&&!T.open&&(typeof T.showModal=="function"?T.showModal():T.setAttribute("open",""));let K=Array.from(e.querySelectorAll(".board-column, .deferred-popup__body"));for(let Ie of K)Array.from(Ie.querySelectorAll(".board-card")).forEach((qe,tt)=>{qe.tabIndex=tt===0?0:-1})}catch{}}async function pt(T,K){if(!s){be("\uC5F0\uACB0\uB418\uC9C0 \uC54A\uC544 \uC0C1\uD0DC\uB97C \uBCC0\uACBD\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error");return}try{await s("update-status",{id:T,status:K}),be("\uC0C1\uD0DC \uBCC0\uACBD\uB428","success",1500)}catch(Ie){n("update-status failed: %o",Ie),be("\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328","error")}}function kt(T){switch(T){case"blocked-col":return R;case"ready-col":return j;case"in-progress-col":return H;case"resolved-col":return oe;default:return[]}}function Lt(T,K,Ie){if(!s||!i)return;let Ue=kt(T),qe=Ue.find(bt=>bt.id===K);if(!qe)return;let tt=Ue.filter(bt=>bt.id!==K),Oe=Ie.closest?Ie.closest(".board-card"):null,He=tt.length;if(Oe){let bt=Oe.getAttribute("data-issue-id");if(bt===K)return;let ze=tt.findIndex(xt=>xt.id===bt);ze>=0&&(He=ze)}let Je=tt.slice();Je.splice(He,0,qe),k.applyReorder(K,Je,He)}function $t(){for(let T of Array.from(e.querySelectorAll(".board-column--drag-over")))T.classList.remove("board-column--drag-over")}let _t=null;e.addEventListener("dragover",T=>{T.preventDefault(),T.dataTransfer&&(T.dataTransfer.dropEffect="move");let Ie=T.target.closest(".board-column");Ie&&Ie!==_t&&(_t&&_t.classList.remove("board-column--drag-over"),Ie.classList.add("board-column--drag-over"),_t=Ie)}),e.addEventListener("dragleave",T=>{let K=T.relatedTarget;(!K||!e.contains(K))&&_t&&(_t.classList.remove("board-column--drag-over"),_t=null)}),e.addEventListener("drop",T=>{T.preventDefault(),_t&&(_t.classList.remove("board-column--drag-over"),_t=null);let K=T.target,Ie=K.closest(".board-column");if(!Ie)return;let Ue=T.dataTransfer?.getData("text/plain")||"";if(!Ue)return;let qe=Ie.id,tt=ae.get(Ue);if(tt&&tt===qe){if(H_.has(qe)){if(F!=="manual"){be("\uC218\uB3D9(\uB4DC\uB798\uADF8) \uC815\uB82C \uBAA8\uB4DC\uC5D0\uC11C\uB9CC \uC21C\uC11C\uB97C \uBC14\uAFC0 \uC218 \uC788\uC2B5\uB2C8\uB2E4","warning",2e3);return}Lt(qe,Ue,K)}return}let Oe=z_[qe];if(!Oe){be("\uC5EC\uAE30\uB85C\uB294 \uC62E\uAE38 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","warning",1500);return}B.get(Ue)!==Oe&&pt(Ue,Oe)}),e.addEventListener("keydown",T=>{let K=T.target;if(!(K instanceof HTMLElement))return;let Ie=String(K.tagName||"").toLowerCase();if(Ie==="input"||Ie==="textarea"||Ie==="select"||Ie==="button"||Ie==="a"||K.isContentEditable===!0)return;let Ue=K.closest(".board-card");if(!Ue)return;let qe=String(T.key||"");if(qe==="Enter"||qe===" "){T.preventDefault();let Je=Ue.getAttribute("data-issue-id");Je&&r(Je);return}if(qe!=="ArrowUp"&&qe!=="ArrowDown"&&qe!=="ArrowLeft"&&qe!=="ArrowRight")return;T.preventDefault();let tt=Ue.closest(".board-column");if(!tt)return;let Oe=Array.from(tt.querySelectorAll(".board-card")),He=Oe.indexOf(Ue);if(qe==="ArrowDown"&&He<Oe.length-1){Be(Ue,Oe[He+1]);return}if(qe==="ArrowUp"&&He>0){Be(Ue,Oe[He-1]);return}if(qe==="ArrowLeft"||qe==="ArrowRight"){let Je=Array.from(e.querySelectorAll(".board-column")),bt=Je.indexOf(tt),ze=qe==="ArrowRight"?1:-1,xt=bt+ze;for(;xt>=0&&xt<Je.length;){let qt=Je[xt].querySelector(".board-card");if(qt){Be(Ue,qt);return}xt+=ze}}});function Be(T,K){try{T.tabIndex=-1,K.tabIndex=0,K.focus()}catch{}}let L=null;m&&m.subscribe&&(L=m.subscribe(()=>{try{E()}catch{}}));let te=null;l&&l.subscribe&&(te=l.subscribe(()=>{try{E()}catch{}}));let ye=null;return a&&a.subscribe&&(ye=a.subscribe(()=>{je()})),{async load(){n("load"),E()},clear(){Ne(),v(),L&&(L(),L=null),te&&(te(),te=null),ye&&(ye(),ye=null),e.replaceChildren(),R=[],j=[],H=[],oe=[],X=[],q=[],B=new Map,ae=new Map}}}function ho(e,t){return e.filter(n=>{let r=hs(n);return!(r&&t.has(r))})}async function K_(e){try{if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")return await navigator.clipboard.writeText(String(e)),!0;let t=document.createElement("textarea");t.value=String(e),t.style.position="fixed",t.style.left="-9999px",document.body.appendChild(t),t.select();let n=!1;try{n=document.execCommand("copy")}finally{t.remove()}return n}catch{return!1}}var tn=e=>e??Rt;async function rn(e){let t=String(e);if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")try{return await navigator.clipboard.writeText(t),!0}catch{}try{let n=document.createElement("textarea");n.value=t,n.style.position="fixed",n.style.left="-9999px",document.body.appendChild(n),n.select();let r=!1;try{r=document.execCommand("copy")}finally{n.remove()}return r}catch{return!1}}function vr(e){return[typeof e.runner=="string"?e.runner:null,typeof e.model=="string"?e.model:null,typeof e.effort=="string"?e.effort:null,e.speed==="fast"?"Fast":null].filter(Boolean).join(" \xB7 ")}function bo(e){return typeof e.resumed_from!="string"||e.resumed_from.length===0?null:`${e.continuation_mode==="session"?"session \uC774\uC5B4\uBC1B\uC74C":e.continuation_mode==="fresh"?"\uC0C8 session\uC73C\uB85C \uC774\uC5B4\uBC1B\uC74C":"\uC774\uC804 attempt\uC5D0\uC11C \uC774\uC5B4\uBC1B\uC74C"} (from ${e.resumed_from})`}function Y_(e,t=document){let n=t.createElement("dialog");n.className="continuation-dialog";let r=t.createElement("button"),o=t.createElement("button"),s=t.createElement("button"),i=t.createElement("h2"),l=t.createElement("p");return i.textContent="\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4",l.textContent=`${vr(e.prior||{})||"\uC774\uC804 \uC124\uC815"} \u2192 ${vr(e.current||{})||"\uD604\uC7AC \uC124\uC815"}`,r.type="button",r.textContent="\uAE30\uC874 session \uC774\uC5B4\uD558\uAE30",r.disabled=e.prior_available===!1,o.type="button",o.textContent="\uD604\uC7AC preset\uC73C\uB85C \uC0C8 session",s.type="button",s.textContent="\uCDE8\uC18C",n.append(i,l,r,o,s),t.body.append(n),new Promise(a=>{let u=d=>{typeof n.close=="function"&&n.close(),n.remove(),a(d)};r.addEventListener("click",()=>u("prior_session")),o.addEventListener("click",()=>u("fresh_current")),s.addEventListener("click",()=>u(null)),n.addEventListener("cancel",d=>{d.preventDefault(),u(null)}),typeof n.showModal=="function"?n.showModal():n.setAttribute("open","")})}async function zn(e,t,n={}){let r=e;for(n.onResult?.(r);r?.continuation_mismatch;){let o=r.continuation_mismatch,s=await Y_(o);if(s===null)return r;r=await t(s,o.decision_token),n.onResult?.(r),r?.conflict&&n.refresh&&(r=await n.refresh(r),n.onResult?.(r))}return r}var V_=["workflow_mode","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed","quick_fix_impl_model","orchestration_model","orchestration_effort","orchestration_speed"],Ic={spec_review_effort:"spec_review_model",plan_review_effort:"plan_review_model",impl_review_effort:"impl_review_model"},X_=new Set(["native-fixed-posture","unsupported","claude-runner-model-default","catalog-validated","provider-tier-or-runtime-model-default","actual-effort"]);function Bt(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function Ot(e){return typeof e=="string"&&e.length>0?e:null}function jr(e){return e.startsWith("gpt-")?e.slice(4):e}function Tt(e,t,n,r,o){return{value:e,source:t,display:n,full_value:r,resolution:o}}function Dc(e,t,n){let r=Ot(t[e]);if(r!==null)return{value:r,source:"pin"};let o=Ot(n[e]);return o===null?null:{value:o,source:"global"}}function yo(e,t,n,r){return Dc(e,t,n)||{value:r,source:"base"}}function ta(e,t,n,r){let o=n?.implementation?.model_catalog;if(t&&Bt(o?.[t])){let i=Ot(o[t][e]);if(i!==null)return i}if(t&&Array.isArray(o?.[t])&&o[t].includes(e))return e;if(!t&&Bt(o)){for(let i of Object.values(o))if(Bt(i)){let l=Ot(i[e]);if(l!==null)return l}else if(Array.isArray(i)&&i.includes(e))return e}let s=r?.model_index?.[e];return Ot(r?.runners?.[s]?.models?.[e]?.id)||e}function Q_(e,t){return Ot(t?.review?.reviewers?.[e]?.model)||e}function Br(e,t,n=!1){if(e==="default")return Tt(e,t,`default (\uC77C\uBC18 \xB7 ${t==="pin"?"\uD540":"\uC804\uC5ED \uACE0\uC815"})`,e,"explicit");let r=n?jr(e):e;return Tt(e,t,r,e,"explicit")}function Pc(e,t,n){let r=t?.implementation?.model_catalog?.[e],o=[];Bt(r)?o.push(...Object.keys(r)):Array.isArray(r)&&o.push(...r.filter(i=>typeof i=="string"));let s=n?.runners?.[e]?.models;if(Bt(s))for(let i of Object.keys(s))o.includes(i)||o.push(i);return o}function Z_(e,t){let n=[],r=e?.implementation?.model_catalog;Bt(r)&&n.push(...Object.keys(r));let o=t?.runners;if(Bt(o))for(let s of Object.keys(o))n.includes(s)||n.push(s);return n}function J_(e,t,n){if(e===null)return{runtime:null,offered:!1};let r=!1;for(let o of Z_(t,n)){let s=Pc(o,t,n);if(s.length>0&&(r=!0),s.includes(e))return{runtime:o,offered:!0}}return{runtime:null,offered:r}}function na(e){return Tt(e.value,e.source,`${e.value} (\uBE44\uD638\uD658)`,e.value,"incompatible")}function Mc(e,t,n){let r=Dc(e,t,n);return r?Br(r.value,r.source):Tt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable")}function fn(e){let t=Bt(e.pin)?e.pin:{},n=Bt(e.global)?e.global:{},r=Bt(e.execution_defaults)?e.execution_defaults:null,o=r?.supported===!0&&Bt(r.session)?r.session:null,s=r?.supported===!0&&Bt(r.orchestration)?r.orchestration:null,i=Bt(e.runner_catalog)?e.runner_catalog:null,l=Ot(n.quick_fix_impl_model),a=J_(l,o,i),u={};if(o){let d=yo("workflow_mode",t,n,Ot(o.workflow_mode_default));u.workflow_mode=d.source==="base"?Tt(d.value,"base",d.value||"\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",d.value,"default"):Br(d.value,d.source);for(let X of["spec_review","plan_review","impl_review"]){let q=`${X}_model`,O=Ot(X==="plan_review"?d.value==="fast_track"?o.plan_review?.fast_track_default:o.plan_review?.standard_recommended:o.review?.default),I=yo(q,t,n,O);if(I.value===null)u[q]=Tt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable");else if(I.value!=="self"&&I.value!=="skip"&&!Bt(o.review?.reviewers?.[I.value]))u[q]=na(Tt(I.value,I.source,"",null,"explicit"));else{let F=Q_(I.value,o);u[q]=Tt(I.value,I.source,jr(F),F,I.source==="base"?"default":"explicit")}}for(let[X,q]of Object.entries(Ic)){let O=u[q].value;if(O==="self"||O==="skip"){u[X]=Tt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable");continue}let I=Ot(o.review?.reviewers?.[O||""]?.effort),F=yo(X,t,n,I);u[X]=F.value===null?Tt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"):Tt(F.value,F.source,F.value,F.value,F.source==="base"?"default":"explicit")}let f=Bt(o.implementation?.default)?o.implementation.default:{},b=Ot(e.route),m=b!==null&&["quick_fix","spec_backed","full_plan"].includes(b),k=Bt(o.implementation?.route_defaults)?o.implementation.route_defaults:{},R=m&&Bt(k[b])?k[b]:{};for(let X of["impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"]){let q=yo(X,t,n,X==="impl_dispatch"?Ot(R.dispatch)||Ot(f.dispatch):Ot(f[X.replace("impl_","")]));u[X]=q.value===null?Tt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"):Tt(q.value,q.source,q.value,q.value,q.source==="base"?"default":"explicit")}let j=Ot(t.impl_runtime),H=j==="inherit"?Ot(e.controller_runtime):j,oe=b==="quick_fix"&&Ot(t.impl_dispatch)===null&&a.runtime!==null&&(j===null||H===a.runtime);if(oe){let X=a.runtime,q=l;u.impl_dispatch=Tt("delegated","global","\uC704\uC784 (\uC804\uC5ED quick_fix)","delegated","explicit"),j===null&&(u.impl_runtime=Tt(X,"global",`${X} (\uC720\uB3C4)`,X,"explicit")),Ot(t.impl_model)===null&&(u.impl_model=Tt(q,"global",q,q,"explicit"))}if(u.impl_dispatch.value==="main"){u.impl_dispatch.display="\uBA54\uC778";for(let X of["impl_runtime","impl_model","impl_effort","impl_speed"])u[X]=Tt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable")}else{if(u.impl_dispatch.value==="delegated"&&!oe&&(u.impl_dispatch.display="\uC704\uC784"),u.impl_runtime.value==="inherit"&&(u.impl_runtime.display=e.controller_runtime?`inherit (${e.controller_runtime})`:"inherit (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_runtime.resolution="dynamic"),u.impl_model.value!==null){let X=u.impl_runtime.value==="inherit"?Ot(e.controller_runtime):u.impl_runtime.value,q=X?Pc(X,o,i):[];if(u.impl_model.value!=="auto"&&q.length>0&&!q.includes(u.impl_model.value))u.impl_model=na(u.impl_model);else{let O=ta(u.impl_model.value,X,o,i);u.impl_model.display=jr(O),u.impl_model.full_value=O}}if(u.impl_effort.value==="auto"){let X=Ot(e.transport)||(u.impl_runtime.value==="codex"?"codex-native-spawn":u.impl_runtime.value==="claude"?"implement-claude":null),q=X?Ot(o.implementation?.effort_by_transport?.[X]?.auto):null;q&&!X_.has(q)?(u.impl_effort.display=`${q} (\uBE44\uD638\uD658)`,u.impl_effort.full_value=q,u.impl_effort.resolution="incompatible"):(u.impl_effort.display="auto (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_effort.resolution="dynamic")}u.impl_speed.value==="default"&&(u.impl_speed=u.impl_speed.source==="base"?Tt("default","base","default (\uC77C\uBC18)","default","default"):Br("default",u.impl_speed.source))}}else for(let d of V_.filter(f=>!f.startsWith("orchestration_")))u[d]=Mc(d,t,n);if(!o){for(let[d,f]of Object.entries(Ic))(u[f].value==="self"||u[f].value==="skip")&&(u[d]=Tt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable"));if(u.impl_dispatch.value==="main"){u.impl_dispatch.display="\uBA54\uC778";for(let d of["impl_runtime","impl_model","impl_effort","impl_speed"])u[d]=Tt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable")}else u.impl_dispatch.value==="delegated"&&(u.impl_dispatch.display="\uC704\uC784"),u.impl_runtime.value==="inherit"&&(u.impl_runtime.display=e.controller_runtime?`inherit (${e.controller_runtime})`:"inherit (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_runtime.resolution="dynamic"),u.impl_effort.value==="auto"&&(u.impl_effort.display="auto (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_effort.resolution="dynamic")}for(let d of["orchestration_model","orchestration_effort","orchestration_speed"]){if(!s){u[d]=Mc(d,t,n);continue}let f=d.replace("orchestration_",""),b=Ot(s[f]),m=yo(d,t,n,b);if(d==="orchestration_effort"&&m.source==="base"){u[d]=Tt(null,"base","CLI \uAE30\uBCF8 (\uBBF8\uC9C0\uC815)",null,"default");continue}if(m.value===null){u[d]=Tt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable");continue}if(d==="orchestration_model"){let k=m.source==="base"?Ot(s.model_id)||m.value:ta(m.value,null,o,i);u[d]=Tt(m.value,m.source,jr(k),k,m.source==="base"?"default":"explicit");continue}if(m.value==="default"){u[d]=m.source==="base"?Tt("default","base","default (\uC77C\uBC18)","default","default"):Br("default",m.source);continue}u[d]=Br(m.value,m.source)}if(o)if(l===null){let d=u.orchestration_model.full_value;u.quick_fix_impl_model=Tt(null,"base",d===null?"\uBA54\uC778":`\uBA54\uC778 (orchestration ${jr(d)})`,null,"default")}else if(a.runtime!==null){let d=ta(l,a.runtime,o,i);u.quick_fix_impl_model=Tt(l,"global",jr(d),d,"explicit")}else a.offered?u.quick_fix_impl_model=na(Tt(l,"global","",null,"explicit")):u.quick_fix_impl_model=Br(l,"global");return u}function em(e,t){let n=t&&e.value==="default"?"default (\uC77C\uBC18)":e.display;if(!t||e.source==="pin")return`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 ${e.display}`;let r=e.source==="global"?"\uC804\uC5ED":"harness";return`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 ${n} (${r})`}function Ss(e){let t=Bt(e.pin)?e.pin:{},n=Bt(e.global)?e.global:{},r=Bt(e.resolution_global)?{...e.resolution_global}:{};delete r[e.key];let o=f=>{let b={...r,...f};return fn({pin:e.layer==="pin"?b:t,global:e.layer==="pin"?n:b,execution_defaults:e.execution_defaults,runner_catalog:e.runner_catalog,route:e.route,controller_runtime:e.controller_runtime})},s=e.layer==="pin"?t:n,i={...s};delete i[e.key];let l=o(i)[e.key],a=o(s)[e.key],u=Ot(s[e.key]),d=[...e.choices];return u!==null&&!d.includes(u)&&d.unshift(u),{unset_label:em(l,e.layer==="pin"),full_value:l.full_value,unavailable:l.resolution==="unavailable",disabled:a?.resolution==="not_applicable",options:d.map(f=>{let b=o({...s,[e.key]:f})[e.key];return{value:f,label:b.display,full_value:b.full_value}})}}function Ur(e=document){let t=e.createElement("dialog");t.className="resume-instructions-dialog";let n=e.createElement("h2"),r=e.createElement("textarea"),o=e.createElement("div"),s=e.createElement("button"),i=e.createElement("button");return n.textContent="\uC138\uC158 \uC774\uC5B4\uD558\uAE30",r.placeholder="\uCD94\uAC00 \uC9C0\uCE68 (\uC120\uD0DD) \u2014 \uBE44\uC6CC\uB450\uBA74 \uAE30\uBCF8 \uC808\uCC28\uB85C \uC7AC\uAC1C",r.maxLength=4e3,o.className="resume-instructions-dialog__actions",s.type="button",s.textContent="\uC774\uC5B4\uD558\uAE30",i.type="button",i.textContent="\uCDE8\uC18C",o.append(s,i),t.append(n,r,o),e.body.append(t),new Promise(l=>{let a=!1,u=f=>{a||(a=!0,typeof t.close=="function"&&t.close(),t.remove(),l(f))},d=()=>u(r.value.trim());s.addEventListener("click",d),i.addEventListener("click",()=>u(null)),r.addEventListener("keydown",f=>{f.key==="Enter"&&(f.ctrlKey||f.metaKey)&&(f.preventDefault(),d())}),t.addEventListener("cancel",f=>{f.preventDefault(),u(null)}),typeof t.showModal=="function"?t.showModal():t.setAttribute("open",""),r.focus()})}function ra(e){return`session:${e.provider}:${e.session_id}`}function vo(e){return`${e.provider} \xB7 ${e.session_id.slice(0,8)}`}function tm(e,t){return e.current&&t==="in_progress"&&e.locality==="local"?"running":"done"}function Wr(e,t,n,r){return{attempt_id:ra(e),session_ref:{bead_id:t,provider:e.provider,session_id:e.session_id},...typeof r=="string"&&r.length>0?{root_dir:r}:{},hide_prompt:!0,meta:{runner:e.provider,label:vo(e),session_id:e.session_id,...typeof e.resume_command=="string"&&e.resume_command.length>0?{resume_command:e.resume_command}:{},status:tm(e,n)}}}var oa="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4",nm="\uBD84\uD574 \uC5C6\uC74C \u2014 \uCD1D\uB7C9\uB9CC \uBCF4\uACE0\uB428",Nc="\uBD84\uD574 \uC5C6\uB294 leg";function Nt(e){return typeof e=="number"&&Number.isFinite(e)?e:0}var Mn=["input_tokens","output_tokens","cache_read_input_tokens","cache_creation_input_tokens"],zr=[...Mn,"reasoning_output_tokens"],rm={codex:["implementation","review-consult"],claude:["subagent"]};function sa(e){return!e||typeof e!="object"?!1:Number.isFinite(e.total_tokens)&&!Mn.some(t=>Number.isFinite(e[t]))}function om(e){return!e||typeof e!="object"?!1:zr.some(t=>Number.isFinite(e[t]))}function ia(e){let t=0;for(let n of Mn)t+=Nt(e?.[n]);return t}function sm(e){return!e||typeof e!="object"?!1:Mn.some(t=>Number.isFinite(e[t]))}function qc(e){return!e||typeof e!="object"?!1:zr.some(t=>Number.isFinite(e[t]))||Number.isFinite(e.total_tokens)}function im(e){let t={};for(let n of zr)e&&Number.isFinite(e[n])&&(t[n]=e[n]);return t}function Fc(e){let t={};for(let n of zr)Number.isFinite(e[n])&&(t[n]=e[n]);return Number.isFinite(e.total_tokens)&&(t.total_tokens=e.total_tokens),e.replayed===!0&&(t.replayed=!0),typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&(t.total_cost_usd=e.total_cost_usd),t}function jc(e,t){return sa(t)?Nt(t.total_tokens):e==="codex"?Nt(t.input_tokens)+Nt(t.output_tokens):ia(t)}function am(e){return e==="claude"?"Claude":"Codex"}function lm(e){return`\u03C4 ${Uc(e)}`}function cm(e,t){let n=t.breakdown||{},r=Nt(t.total_only_subtotal);if(sa(n)||r>0&&!om(n)){let u=[`\uCD1D ${t.subtotal.toLocaleString("en-US")}`,nm];return t.replayed&&u.push(oa),u.join(`
`)}let o=[`\uC785\uB825 ${Nt(n.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${Nt(n.output_tokens).toLocaleString("en-US")}`];e==="claude"?o.push(`\uCE90\uC2DC\uC77D\uAE30 ${Nt(n.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${Nt(n.cache_creation_input_tokens).toLocaleString("en-US")}`):(o.push(`\uCE90\uC2DC\uC77D\uAE30 ${Nt(n.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC4F0\uAE30 ${Nt(n.cache_creation_input_tokens).toLocaleString("en-US")}`),Number.isFinite(n.reasoning_output_tokens)&&o.push(`\uCD94\uB860\uCD9C\uB825 ${Nt(n.reasoning_output_tokens).toLocaleString("en-US")}`)),r>0&&o.push(`${Nc} ${r.toLocaleString("en-US")}`);let s=e==="claude"?"\uC785\uB825 + \uCD9C\uB825 + \uCE90\uC2DC\uC77D\uAE30 + \uCE90\uC2DC\uC0DD\uC131":"\uC785\uB825 + \uCD9C\uB825",i=r>0?`${s} + ${Nc}`:s,a=[e==="claude"?`Claude subtotal = ${i}`:`Codex subtotal = ${i}; \uCE90\uC2DC\uC77D\uAE30\xB7\uCE90\uC2DC\uC4F0\uAE30\xB7\uCD94\uB860\uCD9C\uB825\uC740 subtotal\uC5D0 \uD3EC\uD568\uB418\uC9C0 \uC54A\uB294 subset`,`\uCD1D ${t.subtotal.toLocaleString("en-US")}`,o.join(" \xB7 ")];return typeof t.total_cost_usd=="number"&&Number.isFinite(t.total_cost_usd)&&a.push(`$${t.total_cost_usd.toFixed(2)}`),t.replayed&&a.push(oa),a.join(`
`)}function Qt(e){let t=[];if(!e||typeof e!="object"||!("providers"in e)||!e.providers)return t;for(let n of["claude","codex"]){let r=e.providers[n];r&&t.push({provider:n,label:`${am(n)} ${lm(r.subtotal)}${typeof r.total_cost_usd=="number"&&Number.isFinite(r.total_cost_usd)?` \xB7 $${r.total_cost_usd.toFixed(2)}`:""}`,tooltip:cm(n,r)})}return t}function Ts(e){let t={},n={claude:!0,codex:!1},r={claude:0,codex:0};for(let o of e)if(!(!o||!o.providers))for(let s of["claude","codex"]){let i=o.providers[s];if(!i)continue;let l=t[s];l||(l={subtotal:0,breakdown:{}},t[s]=l),l.subtotal+=i.subtotal,Number.isFinite(i.total_only_subtotal)&&(l.total_only_subtotal=Nt(l.total_only_subtotal)+Nt(i.total_only_subtotal));for(let a of zr)Number.isFinite(i.breakdown[a])&&(l.breakdown[a]=Nt(l.breakdown[a])+Nt(i.breakdown[a]));i.replayed&&(l.replayed=!0),s==="claude"&&(typeof i.total_cost_usd=="number"&&Number.isFinite(i.total_cost_usd)?r.claude+=i.total_cost_usd:n.claude=!1)}return t.claude&&n.claude&&(t.claude.total_cost_usd=r.claude),Object.keys(t).length===0?null:{providers:t,roles:{}}}function aa(e){return!e||typeof e!="object"?null:Gn({attempt:{...e,bead_id:"__attempt__"}},"__attempt__")}function um(e){return e==="codex"?"codex":"claude"}function In(){return{subtotal:0,breakdown:im(null),total_only:0,legs:[],replayed:!1,outer_count:0,outer_cost:0,outer_cost_count:0}}function Es(e,t,n){e.subtotal+=t.subtotal,sa(t.usage)&&(e.total_only+=t.subtotal);for(let r of zr)Number.isFinite(t.usage[r])&&(e.breakdown[r]=Nt(e.breakdown[r])+Nt(t.usage[r]));e.legs.push(t),t.replayed===!0&&(e.replayed=!0),n&&(e.outer_count+=1,typeof t.usage.total_cost_usd=="number"&&Number.isFinite(t.usage.total_cost_usd)&&(e.outer_cost+=t.usage.total_cost_usd,e.outer_cost_count+=1))}function Bc(e,t){let n={subtotal:e.subtotal,breakdown:e.breakdown};return e.total_only>0&&(n.total_only_subtotal=e.total_only),t&&(n.legs=e.legs),e.replayed&&(n.replayed=!0),n}function Uc(e){return e>=1e6?`${(e/1e6).toFixed(1)}M`:e>=1e3?`${(e/1e3).toFixed(1)}k`:String(e)}function Hr(e){return sm(e)?`\u03C4 ${Uc(ia(e))}`:null}function Hn(e){let t=Hr(e);if(!t)return null;let n=e?.total_cost_usd;return typeof n=="number"&&Number.isFinite(n)?`${t} \xB7 $${n.toFixed(2)}`:t}function wo(e){if(!e||typeof e!="object")return"";let t=[`\uC785\uB825 ${Nt(e.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${Nt(e.output_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC77D\uAE30 ${Nt(e.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${Nt(e.cache_creation_input_tokens).toLocaleString("en-US")}`];typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&t.push(`$${e.total_cost_usd.toFixed(2)}`);let n=[`\uCD1D ${ia(e).toLocaleString("en-US")}`,t.join(" \xB7 ")];return e.replayed&&n.push(oa),n.join(`
`)}function Gn(e,t){let n={claude:In(),codex:In()},r={orchestrator:{claude:In(),codex:In()},implementation:{claude:In(),codex:In()},"review-consult":{claude:In(),codex:In()},subagent:{claude:In(),codex:In()}},o=new Set;for(let l of Object.values(e||{})){if(!l||l.bead_id!==t)continue;let a=l.usage;if(qc(a)){let d=um(l.runner),f=Fc(a),b={provider:d,role:"orchestrator",attempt_id:String(l.attempt_id||""),usage:f,subtotal:jc(d,f)};f.replayed===!0&&(b.replayed=!0),typeof l.model=="string"&&(b.model=l.model),typeof l.session_id=="string"&&(b.session_id=l.session_id),Es(n[d],b,!0),Es(r.orchestrator[d],b,!0)}let u=Array.isArray(l.usage_legs)?l.usage_legs:[];for(let d of u){let f=d&&d.provider==="claude"?"claude":"codex";if(!d||d.provider!=="codex"&&d.provider!=="claude"||!rm[f].includes(d.role)||!qc(d.usage))continue;let b=typeof d.receipt_id=="string"&&d.receipt_id.length>0?d.receipt_id:null;if(!b||o.has(b))continue;o.add(b);let m=Fc(d.usage),k={provider:f,role:d.role,attempt_id:String(l.attempt_id||""),usage:m,subtotal:jc(f,m)};k.receipt_id=b,typeof d.agent_type=="string"&&(k.agent_type=d.agent_type),typeof d.agent_id=="string"&&(k.agent_id=d.agent_id),typeof d.model=="string"&&(k.model=d.model),typeof d.effort=="string"&&d.effort.trim().length>0&&(k.effort=d.effort),typeof d.session_id=="string"?k.session_id=d.session_id:typeof d.thread_id=="string"&&(k.session_id=d.thread_id),typeof d.turn_id=="string"&&(k.turn_id=d.turn_id),(typeof d.completed_at=="string"||typeof d.completed_at=="number"&&Number.isFinite(d.completed_at))&&(k.completed_at=d.completed_at),m.replayed===!0&&(k.replayed=!0),Es(n[f],k,!1),Es(r[k.role][f],k,!1)}}let s={};for(let l of["claude","codex"]){let a=n[l];if(a.legs.length===0)continue;let u=Bc(a,!1);l==="claude"&&a.outer_count>0&&a.outer_cost_count===a.outer_count&&(u.total_cost_usd=a.outer_cost),s[l]=u}if(Object.keys(s).length===0)return null;let i={};for(let l of["orchestrator","implementation","review-consult","subagent"]){let a={};for(let u of["claude","codex"]){let d=r[l][u];d.legs.length>0&&(a[u]={...Bc(d,!0),legs:d.legs})}Object.keys(a).length>0&&(i[l]=a)}return{providers:s,roles:i}}var dm=".chip-popover, .judgement-chip";function Gr(e){let t=null,n=!1;function r(d){return t!==null&&t.bead_id===d.bead_id&&t.chip_key===d.chip_key}function o(d){t=r(d)?null:{...d},e()}function s(){t!==null&&(t=null,e())}function i(d){let f=d.target;t!==null&&(f&&typeof f.closest=="function"&&f.closest(dm)||s())}function l(d){d.key==="Escape"&&s()}function a(){n||(n=!0,document.addEventListener("click",i),document.addEventListener("keydown",l))}function u(){n&&(n=!1,document.removeEventListener("click",i),document.removeEventListener("keydown",l))}return{toggle:o,close:s,isOpen:r,attach:a,detach:u}}function Kr(e){return c`<div
    class="chip-popover"
    role="dialog"
    aria-label=${e.title}
  >
    <div class="chip-popover__title">${e.title}</div>
    <ul class="chip-popover__lines">
      ${e.lines.map(t=>c`<li>${t}</li>`)}
    </ul>
  </div>`}var Wc={running:3,paused:2,failed:1};function Kn(e){if(!e||typeof e!="object")return!1;let t=e.kind;return t==null||t==="implementation"}function zc(e){let t=Object.values(e||{}),n=new Map;for(let r of t){if(!r||typeof r.bead_id!="string"||r.bead_id.length===0||r.kind!=="review_session"||r.status!=="running")continue;let o=typeof r.started_at=="number"?r.started_at:null,s=n.get(r.bead_id);s&&(s.started_at??0)>(o??0)||n.set(r.bead_id,{attempt:r,origin:r.origin==="click"||r.origin==="auto"?r.origin:null,started_at:o})}return n}function Hc(e,t){let n=Object.values(e||{}),r=new Set,o=new Map;for(let i of n)!i||typeof i.bead_id!="string"||(typeof i.resumed_from=="string"&&i.resumed_from.length>0&&r.add(i.resumed_from),Kn(i)&&o.set(i.bead_id,i.attempt_id));let s=new Map;for(let i of n){if(!i||typeof i.bead_id!="string"||i.bead_id.length===0||!Kn(i))continue;let l=null;if(i.status==="running")l="running";else if(i.status==="paused"&&!r.has(i.attempt_id))l="paused";else if(i.status==="failed"||i.status==="orphaned"){let d=t.get(i.bead_id),f=typeof d=="number"&&d>0&&typeof i.finished_at=="number"&&d>=i.finished_at;o.get(i.bead_id)===i.attempt_id&&!f&&typeof i.dismissed_at!="number"&&(l="failed")}if(!l)continue;let a=typeof i.started_at=="number"?i.started_at:null,u=s.get(i.bead_id);if(u){let d=Wc[u.run_state],f=Wc[l];if(d>f||d===f&&(u.started_at??0)>(a??0))continue}s.set(i.bead_id,{attempt:i,run_state:l,started_at:a})}return{winners:s,resumed_from_ids:r}}var Cs=["workflow_mode","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"],ca=[...Cs.filter(e=>e!=="impl_dispatch"),"quick_fix_impl_model"],Yn=["orchestration_model","orchestration_effort","orchestration_speed"],Yr=[...Cs,...Yn],pm=ca.filter(e=>Yr.includes(e)),Gc=["delegated","main"],Rs=["inherit","claude","codex"],ko=["default","fast"],$o=["standard","fast_track"],xo=["codex","opus","fable","self","skip"],Os=["codex","fable","skip"],Ls=["low","medium","high","xhigh"],mn="auto";function _n(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function Kc(e){if(!_n(e)||!_n(e.runners))return[];let t=[];for(let[n,r]of Object.entries(e.runners))_n(r)&&_n(r.models)&&t.push([n,Object.keys(r.models)]);return t}function Vr(e,t){let n=Kc(e),r=t&&t!=="inherit"?n.filter(([o])=>o===t):n;return[mn,...r.flatMap(([,o])=>o)]}function Yc(e,t,n,r){if(!_n(e)||!_n(e.runners))return[mn];let o=[];for(let[s,i]of Object.entries(e.runners))if(!(!_n(i)||!_n(i.models))&&!(t&&t!=="inherit"&&s!==t))for(let[l,a]of Object.entries(i.models)){if(n&&n!==mn&&l!==n)continue;let u=r(i,a);if(Array.isArray(u))for(let d of u)typeof d=="string"&&!o.includes(d)&&o.push(d)}return[mn,...o]}function Xr(e,t,n){return Yc(e,t,n,(r,o)=>_n(o)&&Array.isArray(o.efforts)?o.efforts:r.efforts)}function ua(e,t,n){return Yc(e,t,n,(r,o)=>_n(o)&&Array.isArray(o.orchestration_efforts)?o.orchestration_efforts:_n(o)&&Array.isArray(o.efforts)?o.efforts:r.efforts)}function Ao(e,t){let n=Kc(e);return(t?n.filter(([o])=>o===t):n).flatMap(([,o])=>o)}function Vc(e,t,n){let r={impl_runtime:e?.impl_runtime,impl_model:e?.impl_model,impl_effort:e?.impl_effort},o=r.impl_runtime==="claude"||r.impl_runtime==="codex"?r.impl_runtime:r.impl_runtime==="inherit"?n:null;return o&&(r.impl_model&&!Vr(t,o).includes(r.impl_model)&&(r.impl_model=void 0),r.impl_effort&&!Xr(t,o,r.impl_model||mn).includes(r.impl_effort)&&(r.impl_effort=void 0)),r}var fm={workflow_mode:"\uC6CC\uD06C\uD50C\uB85C \uBAA8\uB4DC",spec_review_model:"\uC2A4\uD399 \uB9AC\uBDF0\uC5B4",spec_review_effort:"\uC2A4\uD399 \uB9AC\uBDF0 effort",plan_review_model:"\uACC4\uD68D \uB9AC\uBDF0\uC5B4",plan_review_effort:"\uACC4\uD68D \uB9AC\uBDF0 effort",impl_review_model:"\uAD6C\uD604 \uB9AC\uBDF0\uC5B4",impl_review_effort:"\uAD6C\uD604 \uB9AC\uBDF0 effort",impl_runtime:"\uC704\uC784 \uB300\uC0C1",impl_model:"\uAD6C\uD604 \uBAA8\uB378",impl_effort:"\uAD6C\uD604 effort",impl_speed:"\uAD6C\uD604 \uC18D\uB3C4",orchestration_model:"\uC6CC\uCEE4 \uBAA8\uB378",orchestration_effort:"\uC6CC\uCEE4 effort",orchestration_speed:"\uC6CC\uCEE4 \uC18D\uB3C4"},la=[...pm,...Yn],_m=[...Yr,...ca].filter((e,t,n)=>n.indexOf(e)===t&&!la.includes(e));function Xc(e,t){let n=_n(e)?e:{},r=_n(t)?t:{},o=[];for(let i of la){let l=n[i]??null,a=r[i]??null;l!==a&&o.push({key:i,label:fm[i]||i,before:l,after:a,kind:l===null?"added":a===null?"removed":"changed"})}let s=[];for(let i of[..._m,...Object.keys(r)])!la.includes(i)&&!s.includes(i)&&Object.hasOwn(r,i)&&s.push(i);return{rows:o,ignored_keys:s}}function da(e,t,n,r,o,s){return Ss({key:e,choices:t,layer:"global",global:n,resolution_global:s,execution_defaults:r,runner_catalog:o})}function Qc(e,t){let n={};for(let r of ca){let o=e?.[r],s=t?.[r];o!==s&&(n[r]=typeof s=="string"&&s.length>0?s:null)}return n}function Zc(e,t){let n={};for(let r of Yn){let o=e?.[r]??null,s=t?.[r]??null;o!==s&&(n[r]=typeof s=="string"&&s.length>0?s:null)}return n}var pa=[{id:"workflow",label:"\uC6CC\uD06C\uD50C\uB85C\uC6B0",keys:["workflow_mode"]},{id:"review",label:"\uB9AC\uBDF0",keys:["spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort"]},{id:"implementation",label:"\uAD6C\uD604",keys:["impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"]},{id:"worker",label:"Worker",keys:[...Yn]}],or={workflow_mode:"\uBAA8\uB4DC",spec_review_model:"\uC0AC\uC591 \uB9AC\uBDF0",spec_review_effort:"\uC0AC\uC591 \uB9AC\uBDF0 effort",plan_review_model:"\uACC4\uD68D \uB9AC\uBDF0",plan_review_effort:"\uACC4\uD68D \uB9AC\uBDF0 effort",impl_review_model:"\uAD6C\uD604 \uB9AC\uBDF0",impl_review_effort:"\uAD6C\uD604 \uB9AC\uBDF0 effort",impl_dispatch:"\uC2E4\uD589 \uBC29\uC2DD",impl_runtime:"\uC704\uC784 \uB300\uC0C1",impl_model:"\uBAA8\uB378",impl_effort:"effort",impl_speed:"\uC18D\uB3C4",orchestration_model:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uBAA8\uB378",orchestration_effort:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 effort",orchestration_speed:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uC18D\uB3C4"},Is={pin:"\uD540",global:"\uC804\uC5ED",base:"\uAE30\uBCF8"};function fa(e,t,n,r,o,s=null){let i=fn({pin:t,global:n,execution_defaults:r,runner_catalog:o,route:t&&typeof t.route=="string"?t.route:null,controller_runtime:s});return e.map(l=>({key:l,...i[l]}))}function Jc(e,t,n,r,o,s=null){let i={pin:0,global:0,base:0};for(let l of fa(e,t,n,r,o,s))i[l.source]+=1;return i}function eu(e,t,n){return{id:e,key:t,value:typeof n=="string"?n:""}}function tu(e,t,n){return typeof t!="string"||t.length===0?null:{id:e,preset_id:t,expected_revision:n}}var Ik=[...Cs,...Yn];var nu=["orchestration_model","orchestration_effort","orchestration_speed","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_runtime","impl_model","impl_effort"];function So(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function Ms(e){if(!So(e)||!So(e.runners))return null;let t=Object.entries(e.runners).filter(([,n])=>So(n)&&So(n.models));return t.length>0?t:null}function xn(e,t){let n=Ms(e);if(!n||!t)return null;for(let[r,o]of n)if(Object.hasOwn(o.models,t))return r;return null}function ru(e,t){return So(t)&&Array.isArray(t.efforts)?t.efforts.slice():Array.isArray(e.efforts)?e.efforts.slice():[]}function ou(e,t){let n=Ms(e);if(!n||!t)return[];for(let[,r]of n)if(Object.hasOwn(r.models,t))return ru(r,r.models[t]);return[]}function mm(e){let t=Ms(e);if(!t)return[];let n=[];for(let[,r]of t)for(let o of Object.values(r.models))for(let s of ru(r,o))n.includes(s)||n.push(s);return n}function gm(e,t){if(!t)return mm(e);let r=Ms(e)?.find(([s])=>s===t)?.[1];if(!r)return[];let o=[];for(let s of Object.keys(r.models))for(let i of ou(e,s))o.includes(i)||o.push(i);return o}function su(e,t,n){let r={impl_runtime:e.impl_runtime||"",impl_model:e.impl_model||"",impl_effort:e.impl_effort||""},o=r.impl_runtime==="inherit"?n:r.impl_runtime==="claude"||r.impl_runtime==="codex"?r.impl_runtime:null;if(r.impl_runtime==="inherit"&&!o)return r.impl_model="",r.impl_effort="",r;let s=xn(t,r.impl_model);if(r.impl_model&&(!o||s!==o))return r.impl_model="",r.impl_effort="",r;let i=r.impl_model?ou(t,r.impl_model):gm(t,o);return r.impl_effort&&i.length>0&&!i.includes(r.impl_effort)&&(r.impl_effort=""),r}var _a=new Set(["unavailable","not_applicable"]);function sr(e,t){if(typeof e!="object"||e===null)return null;let n=e[t];return typeof n=="object"&&n!==null?n:null}function iu(e){return e.filter(t=>t!==null).join(" \xB7 ")}function ir(e,t){return t===null?null:`${or[e]}: ${t.display} (${Is[t.source]})`}function ma(e){return e.filter(t=>t!==null).join(`
`)}function ga(e){if(typeof e!="object"||e===null)return null;let t=vr(e);if(t==="")return null;let n=(r,o)=>typeof o=="string"&&o.length>0?`${r}: ${o}`:null;return{text:t,title:ma(["\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \u2014 \uC774 attempt\uC5D0 \uAE30\uB85D\uB41C \uC2E4\uD589\uAC12",n("runner",e.runner),n(or.orchestration_model,e.model),n(or.orchestration_effort,e.effort),n(or.orchestration_speed,e.speed)])}}function Qr(e,t){let n=sr(e,"orchestration_model");if(n===null||n.resolution==="unavailable")return null;let r=sr(e,"orchestration_effort"),o=sr(e,"orchestration_speed"),s=iu([xn(t,n.value??""),n.display,r!==null&&r.value!==null?r.display:null,o!==null&&o.value==="fast"?"Fast":null]);return s===""?null:{text:s,title:ma(["\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \u2014 \uD604\uC7AC \uD574\uC11D\uAC12 (\uD540 > \uD050 \uAE30\uBCF8\uAC12)",ir("orchestration_model",n),ir("orchestration_effort",r),ir("orchestration_speed",o)])}}function hm(e,t){return e===null||e.value===null||_a.has(e.resolution)?null:e.value!=="inherit"?e.value:t?`inherit\u2192${t}`:"inherit"}function bm(e){return e===null||_a.has(e.resolution)?null:e.value==="auto"?"auto":e.display}function ym(e){return e===null?null:e.value==="auto"?"auto":_a.has(e.resolution)?null:e.display}function wr(e,t){if(typeof e!="object"||e===null)return null;let n=sr(e,"impl_dispatch"),r=sr(e,"impl_runtime"),o=sr(e,"impl_model"),s=sr(e,"impl_effort"),i=sr(e,"impl_speed"),l=n!==null&&n.value==="main"?"\uBA54\uC778":iu([hm(r,t??null),bm(o),ym(s),i!==null&&i.value==="fast"?"Fast":null]);return l===""?null:{text:l,title:ma(["\uC6CC\uCEE4(\uAD6C\uD604 \uC704\uC784) \u2014 \uD604\uC7AC \uD574\uC11D\uAC12 (\uD540 > \uC804\uC5ED kv > \uAE30\uBCF8). \uC2E4\uD589 \uC911\uC774\uBA74 \uC138\uC158\uC774 \uC2DC\uC791 \uC2DC \uACE0\uC815\uD55C \uAC12\uACFC \uB2E4\uB97C \uC218 \uC788\uC74C",ir("impl_dispatch",n),ir("impl_runtime",r),ir("impl_model",o),ir("impl_effort",s),ir("impl_speed",i)])}}var vm=Object.freeze(new Set(["push_not_contained","invalid_impl_review","premature_close","head_mismatch","foreign_deploy_unsupported","not_resolved"])),wm=Object.freeze(["delivery_unproven:"]);function Ds(e){let t=e&&typeof e.reason=="string"?e.reason:"";if(t.length===0||vm.has(t))return"session";for(let n of wm)if(t.startsWith(n))return"session";return"settlement"}var km=["hard_diagnosis","invariant_reasoning","verification_by_judgment","claude_bound"];var $m={hard_diagnosis:"\uC6D0\uC778\uC774 \uBD88\uBA85\uD655\uD558\uAC70\uB098 \uC7AC\uD604\uC774 \uBD88\uC548\uC815\uD574 \uAC00\uC124-\uAC80\uC99D \uB8E8\uD504\uAC00 \uD544\uC694\uD558\uB2E4",invariant_reasoning:"\uC815\uD569\uC131\uC774 \uC0C1\uD0DC\uAE30\uACC4\xB7\uB3D9\uC2DC\uC131\xB7\uBD88\uBCC0\uC2DD \uCD94\uB860\uC5D0 \uB2EC\uB824 \uC788\uB2E4",verification_by_judgment:"\uD14C\uC2A4\uD2B8\uAC00 \uBABB \uC7A1\uACE0 \uB9AC\uBDF0\uC5B4\uC758 \uCD94\uB860\uC73C\uB85C\uB9CC \uAC80\uC99D\uD560 \uC218 \uC788\uB2E4",claude_bound:"Claude \uC138\uC158 \uC790\uC0B0\xB7\uC758\uBBF8\uB860\uC5D0 \uAC15\uD558\uAC8C \uBB36\uC5EC \uC788\uB2E4"};function ha(e){return(e&&Array.isArray(e.reasons)?e.reasons:[]).map(n=>$m[n]||"").filter(n=>n.length>0)}var au={orchestration_model:["fable"],impl_runtime:["claude"]},ba={unapplied:"\uBBF8\uC801\uC6A9",applied:"\uC801\uC6A9\uB428",diverged:"\uCD94\uCC9C\uACFC \uB2E4\uB984"};function lu(e){return typeof e=="object"&&e!==null?e:null}function cu(e,t){return typeof e=="string"&&t.includes(e)?e:""}function xm(e){return typeof e!="string"?[]:e.split("+").map(t=>t.trim()).filter(t=>km.includes(t))}function Eo(e,t=e){let n=lu(e);if(!n)return null;let r=cu(n.rec_orchestration_model,au.orchestration_model);if(r.length===0)return null;let o=cu(n.rec_impl_runtime,au.impl_runtime),s={orchestration_model:r};o.length>0&&(s.impl_runtime=o);let i=lu(t)||{},l=Object.keys(s),a=0,u=0;for(let f of l){let b=i[f];typeof b=="string"&&b.length>0&&(a+=1,b===s[f]&&(u+=1))}let d=a===0?"unapplied":u===l.length?"applied":"diverged";return{reasons:xm(n.rec_reason),rec:s,state:d}}function Ps(e){if(!e||typeof e!="object")return"";let t=ha(e),n=ba[e.state]||"",r=["\uBCF5\uC7A1\uD55C \uC791\uC5C5\uC73C\uB85C \uD310\uC815\uB428"];return t.length>0&&r.push(`\uC0AC\uC720: ${t.join(" \xB7 ")}`),n.length>0&&r.push(`\uC0C1\uD0DC: ${n}`),r.join(`
`)}function Ns(e){return e.replace(/\/+$/,"")}function Am(e,t){let n=Ns(e),r=Ns(t);return n===r||r.startsWith(`${n}/`)||n.startsWith(`${r}/`)}function qs(e,t){let n=new Set;for(let r of e)for(let o of t){if(!Am(r,o))continue;let s=Ns(r),i=Ns(o);n.add(s.length>=i.length?s:i)}return[...n].sort()}function ya(e,t){return`${e}\0${t}`}function uu(e){let t=new Map;for(let n of Array.isArray(e?.running)?e.running:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"running",state:"running"});for(let n of Array.isArray(e?.pr_wait)?e.pr_wait:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"pr_wait",state:"pr_wait"});for(let n of Array.isArray(e?.queue_groups)?e.queue_groups:[]){let r=Array.isArray(n.sublanes?.parallel)?n.sublanes.parallel:Array.isArray(n.items)?n.items:[];for(let o of r)t.set(o.id,{root_dir:o.root_dir,workspace_name:o.workspace_name,lane:"parallel",position:o.queue_position});for(let o of Array.isArray(n.sublanes?.serial)?n.sublanes.serial:[])for(let s of o.items)t.set(s.id,{root_dir:s.root_dir,workspace_name:s.workspace_name,lane:o.id,position:s.queue_position})}for(let n of Array.isArray(e?.runnable)?e.runnable:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"runnable",state:"runnable"});for(let n of Array.isArray(e?.done)?e.done:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"done",state:"done"});return t}function va(e,t){let n=Array.isArray(t)?t:[],r=e.indexOf("-"),o=r>0?e.slice(0,r):e;return n.some(s=>typeof s?.issue_prefix=="string"&&s.issue_prefix===o)?"internal":n.length>0&&n.every(s=>typeof s?.issue_prefix=="string")?"external":"unknown"}function To(e){if(e.state==="running")return"\uC2E4\uD589\uC911";if(e.state==="pr_wait")return"PR \uB300\uAE30";if(e.state==="runnable")return"\uC2E4\uD589\uAC00\uB2A5";if(e.state==="done")return"\uC644\uB8CC";let t=e.lane==="parallel"?"\uBCD1\uB82C":e.lane;return`${e.workspace_name} \xB7 ${t} #${e.position}`}function du(e,t,n,r){let o=n.get(e);if(!!(o&&t&&o.root_dir===t.root_dir&&o.lane===t.lane&&typeof o.position=="number"&&typeof t.position=="number"&&o.position<t.position))return{id:e,label:`\u{1F512} ${e} (\uAC19\uC740 \uB808\uC778 \uC55E)`,location_label:"\uAC19\uC740 \uB808\uC778 \uC55E",scope:null,same_lane_ahead:!0};if(o)return{id:e,label:`\u{1F512} ${e} (${To(o)})`,location_label:To(o),scope:null,same_lane_ahead:!1};let i=va(e,r),l=i==="internal"?"\uBBF8\uC801\uC7AC":i==="external"?"\uC678\uBD80":"\uC704\uCE58 \uBBF8\uD655\uC778";return{id:e,label:`\u{1F512} ${e} (${l})`,location_label:l,scope:i,same_lane_ahead:!1}}function pu(e){let t=Array.isArray(e)?e:[],n=new Map,r=new Map,o=new Map;for(let l of t)for(let a of Array.isArray(l.sublanes?.serial)?l.sublanes.serial:[]){let u=ya(l.root_dir,a.id);n.set(u,{root_dir:l.root_dir,workspace_name:l.name,lane:a.id}),o.set(u,[]);for(let d of Array.isArray(a.items)?a.items:[])r.set(d.id,u)}for(let l of t)for(let a of Array.isArray(l.sublanes?.serial)?l.sublanes.serial:[]){let u=ya(l.root_dir,a.id),d=Array.isArray(a.items)?a.items[0]:null,b=!!d&&d.queue_index===0&&(!Array.isArray(a.occupied_by)||a.occupied_by.length===0)&&Array.isArray(d.blocked_by)?d.blocked_by:[],m=o.get(u);if(m)for(let k of b){let R=r.get(k);R&&R!==u&&!m.includes(R)&&m.push(R)}}let s=(l,a)=>{let u=new Set,d=[l];for(;d.length>0;){let f=d.pop();if(f===a)return!0;!f||u.has(f)||(u.add(f),d.push(...o.get(f)||[]))}return!1},i=new Map;for(let[l,a]of o){let u=[];for(let d of a){let f=n.get(d);s(d,l)&&f&&u.push(f)}u.length>0&&i.set(l,u)}return i}function fu(e,t){return ya(e,t)}async function Sm(e){let t=await rn(e);be(t?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",t?"success":"error",1200)}function Zr(e){return typeof e!="string"||e.length===0?"":c`<span class="worker-ev__copyline"
    ><code class="worker-ev__path">${e}</code
    ><button
      type="button"
      class="worker-ev__copy"
      data-seam="log-path-copy"
      title="로그 경로 복사"
      aria-label=${`\uB85C\uADF8 \uACBD\uB85C \uBCF5\uC0AC: ${e}`}
      @click=${()=>{Sm(e)}}
    >
      ⧉
    </button></span
  >`}function Bs(e){return typeof e=="string"&&e.length>=7?e.slice(0,7):"\u2014"}function gu(e){return e==="session"?"bead\uAC00 in_progress\uB85C \uC7A1\uD78C \uB4A4 \uB2EB\uD788\uAE30\uAE4C\uC9C0\uC758 \uACBD\uACFC":"attempt \uC2E4\uD589 \uC2DC\uAC04 \uD569\uC0B0 (\uC7AC\uAC1C \uC138\uC158 \uD3EC\uD568)"}function kr(e){if(typeof e!="number"||!Number.isFinite(e)||e<0)return"\u2014";if(e<1e3)return`${Math.round(e)}ms`;let t=e/1e3;if(t<60)return`${t.toFixed(1)}\uCD08`;let n=Math.floor(t/60);if(n<60)return`${n}\uBD84 ${Math.round(t-n*60)}\uCD08`;let r=Math.floor(n/60),o=n%60;return`${r}\uC2DC\uAC04 ${o}\uBD84`}function hu(e,t){if(typeof e!="object"||e===null)return[];let n=!1,r=!1;for(let o of Object.values(e)){if(typeof o!="object"||o===null)continue;let s=o;s.bead_id!==t||s.kind!=="review_session"||(n=!0,r=r||s.origin==="auto")}return n?[r?"\uB9AC\uBDF0 \xB7 \uC790\uB3D9":"\uB9AC\uBDF0"]:[]}function _u(e){return e==="auto"||e==="click"?e:null}function bu(e,t){if(typeof e!="object"||e===null)return{active:!1,failure:null,origin:null};let n=!1,r=null,o=-1,s=null,i=null,l=-1;for(let a of Object.values(e)){if(typeof a!="object"||a===null)continue;let u=a;if(u.bead_id!==t||u.kind!=="review_session")continue;if(u.status==="pending"||u.status==="running"){n=!0;let f=typeof u.started_at=="number"?u.started_at:0;f>=o&&(o=f,r=_u(u.origin));continue}if(u.status!=="failed")continue;let d=typeof u.finished_at=="number"?u.finished_at:0;d>=l&&(l=d,s=typeof u.cause=="string"&&u.cause.length>0?u.cause:null,i=_u(u.origin))}return n?{active:!0,failure:null,origin:r}:{active:!1,failure:s,origin:i}}function yu(e,t){if(typeof e!="object"||e===null)return null;let n=0,r=!1;for(let o of Object.values(e)){if(typeof o!="object"||o===null)continue;let s=o;if(s.bead_id!==t)continue;let i=s.started_at,l=s.finished_at;typeof i!="number"||typeof l!="number"||!Number.isFinite(i)||!Number.isFinite(l)||l<i||(n+=l-i,r=!0)}return r?n:null}function Us(e){if(typeof e!="number"||!Number.isFinite(e)||e<=0)return"";let t=new Date(e);return`${String(t.getHours()).padStart(2,"0")}:${String(t.getMinutes()).padStart(2,"0")}`}function Em(e,t){let n=Array.isArray(e)?e:[],r=Array.isArray(t)?t:[];if(n.length===0&&r.length===0)return null;let o=null;for(let i of n)i.kind!=="deploy"||i.state!=="succeeded"||typeof i.target_sha!="string"||(!o||(typeof i.finished_at=="number"?i.finished_at:0)>(typeof o.finished_at=="number"?o.finished_at:0))&&(o=i);let s=n.filter(i=>i.state==="failed"&&!i.dismissed&&!i.superseded_by).length+r.length;return{deploy:o?{sha:Bs(o.target_sha),at:typeof o.finished_at=="number"?o.finished_at:null,elapsed_ms:typeof o.elapsed_ms=="number"?o.elapsed_ms:null}:null,unresolved:s,badge:s>0?{tone:"act",label:`\uD574\uACB0 \uD544\uC694 ${s}`}:{tone:"quiet",label:"\uBAA8\uB450 \uC815\uC0C1"}}}function vu(e,t){let n=Em(e,t);return n?c`<button
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
            title=${n.deploy.at?Ht(n.deploy.at):""}
            >${Us(n.deploy.at)}${n.deploy.elapsed_ms!==null?` \xB7 ${kr(n.deploy.elapsed_ms)}`:""}</span
          >
        </span>`:""}
    <span class="worker-repo-strip__spacer"></span>
    <span
      class="worker-repo-strip__badge worker-repo-strip__badge--${n.badge.tone}"
      >${n.badge.label}</span
    >
  </button>`:""}function eo(e){let t=nn(e.created_at),n=nn(e.updated_at);return!t&&!n?"":c`<div class="worker-mini__meta">
    ${t?c`<span title=${`\uC0DD\uC131 ${Ht(e.created_at)}`}
          >생성 ${t}</span
        >`:""}${t&&n?c`<span>·</span>`:""}${n?c`<span title=${`\uC218\uC815 ${Ht(e.updated_at)}`}
          >수정 ${n}</span
        >`:""}
  </div>`}function Tm(e){return!e||e==="requested"?"\uBC31\uC5C5 \uC911":e==="backup_verified"||e==="signaled"?"runner \uC885\uB8CC \uC911":e==="merged_revert"||e.startsWith("revert_")?"revert PR \uB300\uAE30":e.startsWith("rollback_")?"\uC6D0\uBCF5 \uBC30\uD3EC \uC911":e==="runner_terminated"||e.startsWith("pr_")||e.includes("ref_")||e.includes("worktree")||e.startsWith("bead_")?"PR \uC815\uB9AC \uC911":`\uD3D0\uAE30 \uCC98\uB9AC \uC911 (${e})`}function Co(e,t){return t==="merged"?`${e}: \uC774\uBBF8 merge\uB41C \uAD6C\uD604\uC785\uB2C8\uB2E4. \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 revert PR\uC744 \uC0DD\uC131\uD558\uBA70, \uC2E4\uC81C \uC6D0\uBCF5\uC740 \uC0AC\uB78C\uC774 \uADF8 PR\uC744 merge\uD55C \uB4A4 \uC644\uB8CC\uB429\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`:`${e}: \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 runner/PR/branch/worktree\uB97C \uC815\uB9AC\uD558\uACE0 \uC774\uC288\uB97C \uD6C4\uBCF4\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`}function Ws(e){let t=["\uD3D0\uAE30 \uC644\uB8CC"];return e.operation_id&&t.push(`\uC791\uC5C5 ${e.operation_id}`),e.receipt?.archive_path&&t.push(`\uBC31\uC5C5 ${e.receipt.archive_path}`),e.receipt?.original_pr?.url&&t.push(`\uC6D0\uBCF8 PR ${e.receipt.original_pr.url}`),e.receipt?.revert_pr?.url&&t.push(`revert PR ${e.receipt.revert_pr.url}`),t.join(" \xB7 ")}function Vn(e,t,n={}){let o=Object.values(e&&typeof e=="object"?e:{}).filter(f=>f&&f.bead_id===t&&f.phase!=="done").sort((f,b)=>(f.requested_at||0)-(b.requested_at||0)).at(-1),s=typeof n.attempt_id=="string"&&n.attempt_id.length>0?n.attempt_id:typeof o?.attempt_id=="string"?o.attempt_id:null,i=n.external?"\uC678\uBD80 PR\uC740 Worker\uAC00 \uC18C\uC720\uD558\uC9C0 \uC54A\uC544 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":n.done?"\uC644\uB8CC\uB41C \uC791\uC5C5\uC740 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":n.merge_active?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":n.merge_queued?"\uBA38\uC9C0 \uD050\uC5D0 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 [\uCDE8\uC18C]\uD558\uC138\uC694":n.conflict_active?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 \uC138\uC158\uC744 \uC815\uB9AC\uD558\uC138\uC694":n.cleanup_active?"\uC815\uB9AC \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":null,l=typeof o?.last_error=="string"?o.last_error:null,a=o?Tm(o.phase):null,u=o?.kind==="stale_work_backup_fresh",d=n.merged||o?.mode==="merged_revert"?"merged":"unmerged";return{action:!n.external&&!n.done,enabled:!i&&(!o||!!l),label:u?l?"\uBC31\uC5C5 \uC815\uB9AC \uC7AC\uC2DC\uB3C4":"\uBC31\uC5C5 \uD6C4 \uC0C8\uB85C \uC2DC\uC791":l?"\uC7AC\uC2DC\uB3C4":"\uD3D0\uAE30",title:i||(l?u?`\uBC31\uC5C5 \uB4A4 \uC815\uB9AC \uC2E4\uD328: ${l} \u2014 \uC6D0\uBCF8\uACFC \uAC80\uC99D \uC601\uC218\uC99D\uC744 \uBCF4\uC874\uD55C \uCC44 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:`\uD3D0\uAE30 \uC2E4\uD328: ${l} \u2014 \uAC19\uC740 \uC791\uC5C5\uC744 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:o?`${a||"\uD3D0\uAE30 \uCC98\uB9AC \uC911"} \u2014 \uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694`:d==="merged"?"\uBCD1\uD569\uB41C \uBCC0\uACBD\uC744 \uC6D0\uBCF5 PR\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4":"\uBC31\uC5C5 \uD6C4 runner\xB7PR\xB7\uC6CC\uD06C\uD2B8\uB9AC\xB7\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4"),attempt_id:s,operation:o||null,progress:a,error:l,confirmation:d}}function wu(e){if(!e||e.quickfix_lane!==!0)return!1;let t=e.quickfix_landing;return!t||typeof t!="object"?!1:["repo_operations","branch_cleanup","parent_close"].includes(t.cursor)}function js(e){let t=e.discard;if(!t||!t.operation)return"";let n=t.operation,r=n.kind==="stale_work_backup_fresh"&&!t.error?null:n.backup?.path,o=n.original_pr,s=n.revert_pr;return c`<div
    class="worker-discard-receipt"
    role=${t.error?"alert":"status"}
  >
    <span>${t.progress}</span>
    ${t.error?c`<span>폐기 실패: ${t.error}</span>`:""}
    <code>작업: ${n.operation_id}</code>
    ${r?c`<code>백업: ${r}</code>`:t.error?c`<span>아직 아무것도 삭제하지 않음</span>`:""}
    ${o?.url?c`<a href=${o.url} target="_blank" rel="noreferrer noopener"
          >원본 PR #${o.number||"?"}</a
        >`:""}
    ${s?.url?c`<a href=${s.url} target="_blank" rel="noreferrer noopener"
          >revert PR #${s.number||"?"} ·
          ${s.state||"\uC0C1\uD0DC \uBBF8\uD655\uC778"}</a
        >`:""}
  </div>`}var Cm={dirty_unique:"\uCD5C\uC2E0 base\uC5D0 \uC5C6\uB294 \uB85C\uCEEC \uBCC0\uACBD\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",untracked_present:"\uCD94\uC801\uB418\uC9C0 \uC54A\uC740 \uD30C\uC77C\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",branch_ahead:"\uB85C\uCEEC branch\uC5D0 \uACE0\uC720 commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",head_ahead:"worktree HEAD\uC5D0 \uACE0\uC720 commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",ahead_not_contained:"\uB85C\uCEEC branch\uC758 \uACE0\uC720 commit\uC774 \uCD5C\uC2E0 base\uC5D0 \uD3EC\uD568\uB410\uC74C\uC744 \uC99D\uBA85\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",ahead_merge_commit:"\uB85C\uCEEC branch\uC5D0 \uC790\uB3D9 \uC815\uB9AC\uD560 \uC218 \uC5C6\uB294 merge commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",ahead_submodule_path:"\uB85C\uCEEC branch\uC758 \uACE0\uC720 commit\uC774 submodule \uACBD\uB85C\uB97C \uBCC0\uACBD\uD569\uB2C8\uB2E4",archive_failed:"\uACE0\uC720 commit \uBC31\uC5C5\uC744 \uC548\uC804\uD558\uAC8C \uAC80\uC99D\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",ref_delete_failed:"\uD655\uC778\uB41C local branch\uB97C \uC548\uC804\uD558\uAC8C \uC0AD\uC81C\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",resume_available:"\uC774\uC5B4\uAC08 \uC218 \uC788\uB294 \uC774\uC804 Worker session\uC774 \uC788\uC2B5\uB2C8\uB2E4",observe_failed:"Git \uC0C1\uD0DC\uB97C \uC548\uC804\uD558\uAC8C \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",identity_changed:"\uD655\uC778 \uC911 worktree \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4",ownership_unknown:"Worker \uC18C\uC720 worktree\uC778\uC9C0 \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"};function ku(e,t=!1){if(!e||typeof e!="object")return null;let n=e;if(n.reason!=="worktree_stale_work"||!n.stale_work||typeof n.stale_work!="object")return null;let r=n.stale_work,o=r.residue==="branch"?"branch":"worktree",s=r.state==="unique"?"unique":"unknown",i=r.summary&&typeof r.summary=="object"?r.summary:{};function l(u){return Number.isInteger(i[u])?Number(i[u]):0}let a=typeof r.cause=="string"?r.cause:"observe_failed";return{residue:o,state:s,title:o==="branch"?"\uC774\uC804 \uBE0C\uB79C\uCE58 \uBCF4\uC874\uB428":s==="unique"?"\uC774\uC804 \uC791\uC5C5 \uBCF4\uC874\uB428":"\uC774\uC804 \uC791\uC5C5 \uC0C1\uD0DC \uD655\uC778 \uC2E4\uD328",cause:Cm[a]||"\uC548\uC804\uD558\uAC8C \uC790\uB3D9 \uC815\uB9AC\uD560 \uC218 \uC5C6\uB294 \uC774\uC804 \uC791\uC5C5\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",summary:o==="branch"?`\uACE0\uC720 commit ${l("branch_ahead")}`:[`staged ${l("staged_count")}`,`unstaged ${l("unstaged_count")}`,`untracked ${l("untracked_count")}`,`branch ahead ${l("branch_ahead")}`,`HEAD ahead ${l("head_ahead")}`].join(" \xB7 "),action_id:typeof r.action_id=="string"?r.action_id:"",can_resume:r.can_resume===!0,can_continue:r.can_continue===!0,can_backup_fresh:r.can_backup_fresh===!0,can_recheck:r.can_recheck===!0,locked:t}}function zs(e,t={}){if(!e||!e.orchestration&&!e.worker)return"";let n=t.pin===!0?" exec-chip--pin":"",r=t.pin===!0?`
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
      >`:""}`}function Fs(e,t){let n=`worker-dep worker-dep--${t}${e.foreign?" worker-dep--foreign":""}`;return e.openable===!0?c`<button
        type="button"
        class=${`${n} worker-dep__open`}
        data-dep-id=${e.id}
        data-root-dir=${e.root_dir||""}
        title=${e.title||""}
      >
        ${e.label}
      </button>`:c`<span class=${n} title=${e.title||""}>${e.label}</span>`}function Rm(e){return{id:e.id,label:`\u29C9 ${e.id}`,title:[`\uACB9\uCE68 \xB7 ${e.location_label}`,...e.prefixes].join(`
`),openable:!0,...e.root_dir?{root_dir:e.root_dir}:{}}}function wa(e){return Array.isArray(e)?e.slice().sort((t,n)=>t.id<n.id?-1:t.id>n.id?1:0):[]}function Om(e,t=!1){return e?c`<button
    type="button"
    class="ctl-chip ctl-chip--label judgement-chip worker-card__spec-after-blocker"
    data-chip-key="spec_after_blocker"
    aria-expanded=${t?"true":"false"}
    title="선행의 결과가 설계 전제라 스펙도 선행 뒤에 씁니다"
  >
    스펙 대기
  </button>`:""}function Hs(e,t=""){if(!e)return t===""?"":c`<div class="worker-deps worker-deps--primary">
          ${t}
        </div>`;let n=wa(e.predecessors),r=Array.isArray(e.released)?e.released:[],o=wa(e.dependents),s=wa(e.overlaps),i=e.scope_missing===!0,l=e.armed_lane||null,a=!!l||n.length>0||o.length>0||t!=="",u=r.length>0||s.length>0||i;return!a&&!u?"":c`${a?c`<div class="worker-deps worker-deps--primary">
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
            >`:""}${n.map(d=>Fs(d,"pred"))}${t}${o.map(d=>Fs(d,"dependents"))}
      </div>`:""}${u?c`<div class="worker-deps worker-deps--secondary">
        ${r.map(d=>Fs(d,"released"))}${s.map(d=>Fs(Rm(d),"overlap"))}${i?c`<span
              class="worker-dep worker-dep--muted"
              title="겹침 판정 불가 — 아티팩트가 있으면 스펙/플랜 front-matter, 없으면 description \`## scope\`에 선언 필요"
              >scope 없음</span
            >`:""}
      </div>`:""}`}function Gs(e){return e?c`<button
    type="button"
    class="worker-dep worker-dep--lane mon-lane__chip"
    data-lane-id=${e.lane_id}
    title="이 연결 레인으로 이동"
  >
    ${e.label}
  </button>`:""}function Ks(e){if(!e)return"";let t=e.chips||{},n=t.route||e.route,r=t.route_source==="derived"||e.route_source==="derived";return n?c`<span
    class="ctl-chip ctl-chip--route${r?" is-derived":""}"
    title=${r?"route \uBBF8\uD540 (metadata unset)":"route"}
    >${r?"unset":n}</span
  >`:""}function Lm(e,t=!1){let n=e?e.quick_fix_review:null;if(!n)return"";let r=n.state;if(r!=="reviewed"&&r!=="stale")return"";let o=Array.isArray(n.missing)?n.missing:[],s=[r==="reviewed"?"quick_fix self-review \uC601\uC218\uC99D\uC774 \uC9C0\uAE08 \uBCF8\uBB38\uACFC \uC77C\uCE58\uD569\uB2C8\uB2E4":"quick_fix self-review \uC601\uC218\uC99D\uC774 \uC9C0\uAE08 \uBCF8\uBB38\uACFC \uB2E4\uB985\uB2C8\uB2E4",...o].join(`
`);return c`<button
    type="button"
    class="ctl-chip judgement-chip worker-card__qfr worker-card__qfr--${r}"
    data-chip-key="qfr"
    aria-expanded=${t?"true":"false"}
    title=${s}
  >
    ${r==="reviewed"?"\uB9AC\uBDF0 \u2713":"\uB9AC\uBDF0 stale"}
  </button>`}function $u(e){return e?c`<button
    type="button"
    class="ctl-chip ctl-chip--from"
    data-from-id=${e}
    title=${`\uCD9C\uCC98 ${e} \uC5F4\uAE30`}
  >
    ↩ from ${e}
  </button>`:""}function Ys(e,t=!1){return e?c`<button
    type="button"
    class="ctl-chip ctl-chip--label judgement-chip worker-card__rec"
    data-chip-key="rec"
    data-state=${e.state}
    aria-expanded=${t?"true":"false"}
    title=${Ps(e)}
  >
    ${"\uBCF5\uC7A1"}
  </button>`:""}function xu(e,t){return!e||typeof t!="number"?"":c`<a
    class="worker-mini__pr"
    href=${e}
    target="_blank"
    rel="noreferrer noopener"
    title="PR 열기"
    >#${t} ↗</a
  >`}function Vs(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=Math.max(0,Math.min(4,Math.trunc(e)));return c`<span class="worker-pri" title=${`\uC6B0\uC120\uC21C\uC704 P${t}`}
    >P${t}</span
  >`}function Im(e){let t=Array.isArray(e.badges)?e.badges:[],n=Qt(e.usage),r=Hn(e.usage),o=nn(e.done_at);return c`<div
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
      ${xu(e.pr_url,e.pr_number)}${o?c`<span
            class="worker-mini__done-at"
            title=${`\uC644\uB8CC ${Ht(e.done_at)}`}
            >완료 ${o}</span
          >`:""}
      ${t.map(s=>c`<span
            class="worker-mini__badge${e.alert?" worker-mini__badge--alert":""}"
            >${s}</span
          >`)}
    </div>
    <div class="worker-mini__row2">
      <span class="worker-mini__title">${e.title}</span>
    </div>
    <div class="worker-mini__row3">
      ${n.length>0?n.map(s=>c`<span class="worker-usage" title=${s.tooltip}
                >${s.label}</span
              >`):r?c`<span class="worker-usage" title=${wo(e.usage)}
              >${r}</span
            >`:""}
      ${typeof e.work_ms=="number"?c`<span
            class="worker-mini__work"
            title=${gu(e.work_kind)}
            >작업 ${kr(e.work_ms)}</span
          >`:""}
    </div>
  </div>`}function An(e,t={}){if(e.lane==="done"&&e.done_layout==="three_line")return Im(e);let n=e.draggable&&!e.done,r=Array.isArray(e.badges)?e.badges:[],o=Qt(e.usage),s=Hn(e.usage),i=e.merge_step||null,l=e.lane==="pr_wait"||!!e.revise_action||!!e.stale_work,a=e.lane==="done"&&!l,u=a?nn(e.done_at):"",d=n?c`<span class="worker-mini__grip" aria-hidden="true">⠿</span>`:"",f=typeof e.seq=="number"?c`<span class="worker-mini__seq" aria-hidden="true"
          >${e.seq}</span
        >`:"",b=e.workspace_name?c`<span class="worker-mini__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:"",m=c`<span class="worker-mini__id" title="클릭하면 ID 복사"
    >${e.id}</span
  >`,k=e.lane==="done"?"":Ks(e.workflow),R=e.lane==="done"?"":$u(e.from_id),j=Vs(e.priority),H=c`<span class="worker-mini__title">${e.title}</span>`,oe=xu(e.pr_url,e.pr_number),X=r.map(ke=>ke===e.live_badge?c`<span
          class="worker-mini__badge worker-mini__badge--activity"
          title="서버가 이 PR을 처리하는 중입니다"
          ><span class="act-dot" aria-hidden="true"></span>${ke}</span
        >`:c`<span
          class="worker-mini__badge${e.alert?" worker-mini__badge--alert":""}"
          title=${ke===e.completion_badge&&e.completion_title||""}
          >${ke}</span
        >`),q=e.reason?c`<span class="worker-mini__reason">${e.reason}</span>`:"",O=o.length>0?o.map(ke=>c`<span class="worker-usage" title=${ke.tooltip}
              >${ke.label}</span
            >`):s?c`<span class="worker-usage" title=${wo(e.usage)}
            >${s}</span
          >`:"",I=i?c`<span
        class="merge-step${i.failed?" merge-step--failed":""}"
        style=${`--progress: ${i.percent}%`}
        >${i.label}${i.index>0?c`<span class="merge-step__n"
              >${i.index}/${i.total}</span
            >`:""}</span
      >`:"",F=e.merge_action?c`<button
        type="button"
        class="worker-mini__merge"
        data-bead-id=${e.id}
        ?disabled=${e.merge_enabled===!1}
        title=${e.merge_title||""}
      >
        ${e.merge_label||"\uBA38\uC9C0"}
      </button>`:"",B=e.cancel_action?c`<button
        type="button"
        class="worker-mini__merge-cancel"
        data-bead-id=${e.id}
        ?disabled=${e.cancel_enabled===!1}
        title=${e.cancel_title||""}
      >
        취소
      </button>`:"",ae=e.discard,N=ae?.action||e.discard_action?c`<button
          type="button"
          class="worker-mini__discard"
          data-bead-id=${e.id}
          data-attempt-id=${ae?.attempt_id||""}
          data-operation-id=${ae?.operation?.operation_id||""}
          data-discard-mode=${ae?.confirmation||"unmerged"}
          ?disabled=${ae?!ae.enabled:e.discard_enabled===!1}
          title=${ae?ae.title:e.discard_enabled===!1?e.discard_title||"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"PR\uC744 \uB2EB\uACE0 \uC6CC\uD06C\uD2B8\uB9AC/\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4 (\uB418\uB3CC\uB9B4 \uC218 \uC5C6\uC74C). \uB2E4\uC2DC \uC2E4\uD589\uD558\uB824\uBA74 \uD6C4\uBCF4 \uB808\uC778\uC5D0\uC11C \uB300\uAE30 \uB808\uC778\uC73C\uB85C \uC62E\uAE30\uC138\uC694"}
        >
          ${ae?.label||"\uD3D0\uAE30"}
        </button>`:"",W=e.stale_work||null,Z=W?c`${W.can_resume||W.can_continue?c`<button
            type="button"
            class="worker-mini__stale-continue"
            data-bead-id=${e.id}
            data-action-id=${W.action_id}
            ?disabled=${W.locked}
          >
            기존 작업 이어가기
          </button>`:""}${W.can_backup_fresh?c`<button
            type="button"
            class="worker-mini__stale-backup"
            data-bead-id=${e.id}
            data-action-id=${W.action_id}
            ?disabled=${W.locked}
          >
            백업 후 새로 시작
          </button>`:""}${W.can_recheck?c`<button
            type="button"
            class="worker-mini__stale-recheck"
            data-bead-id=${e.id}
            data-action-id=${W.action_id}
            ?disabled=${W.locked}
          >
            다시 확인
          </button>`:""}`:"",ee=W?c`<div class="worker-mini__stale">
        <strong>${W.title}</strong>
        <span>${W.summary}</span>
        <span>${W.cause}</span>
        ${W.can_backup_fresh?c`<small
              >Git-ignored dependency/build output은 archive에 포함되지
              않습니다</small
            >`:""}
      </div>`:"",Se=e.revise_action?c`<button
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
        </button>`:"",ge=!!(e.lane!=="pr_wait"&&!e.done&&e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker)),ue=Ys(e.rec,Jr(e,"rec")),P=Gs(e.cross_lane_chip),we=Zr(e.log_path),xe=b||P||k||R||ge||ue||O||we?c`<div class="worker-chips">
          ${b}${P}${k}${R}${ge?zs(e.exec_chips,{pin:e.exec_chips_pinned===!0}):""}${ue}${O}${we}${ka(e)}
        </div>`:"",E=Hs(e.dependency_chips),J=js(e),Ae=t.actions?t.actions:"",_e=!!(i||e.merge_action||e.cancel_action||e.discard_action||ae?.operation||e.revise_action||W);return c`<div
    class="worker-mini${l?" worker-mini--card":""}${n?"":" worker-mini--static"}${e.done?" worker-mini--done":""}${e.ghost?" worker-mini--ghost":""}${i?" worker-mini--merging":""}${i?.failed?" worker-mini--merge-failed":""}${e.external?" worker-mini--external":""}"
    style=${i?`--progress: ${i.percent}%`:""}
    draggable=${n?"true":"false"}
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    ${a?c`<div class="worker-mini__row1">
            ${b}${m}${j}${R}${oe}${H}${Ae}
          </div>
          <div class="worker-mini__row2">
            ${O}${u?c`<span
                  class="worker-mini__done-at"
                  title=${`\uC644\uB8CC ${Ht(e.done_at)}`}
                  >완료 ${u}</span
                >`:""}${typeof e.work_ms=="number"?c`<span
                  class="worker-mini__work"
                  title=${gu(e.work_kind)}
                  >작업 ${kr(e.work_ms)}</span
                >`:""}${X}${I}
            <span class="worker-mini__actions"
              >${F}${B}${N}</span
            >
            ${eo(e)}
          </div>`:l?c`<div class="worker-mini__head">
              ${d}${f}${m}${j}${oe}${X}${q}${Ae}
            </div>
            <div class="worker-mini__body">${H}${ee}</div>
            ${E}${xe}${_e?c`<div class="worker-mini__foot">
                  ${I}
                  <span class="worker-mini__actions"
                    >${F}${B}${N}${Se}${Z}</span
                  >
                  ${js(e)}
                </div>`:""}
            ${eo(e)}`:c`<div class="worker-mini__line">
              ${d}${f}${m}${j}${H}${oe}${X}${q}${I}${F}${B}${N}${Ae}
            </div>
            ${E}${xe}${J} ${eo(e)}`}
  </div>`}function Mm(e,t){let n,r=[];for(let o of e){let s=o.group||"";s.length>0&&s!==n&&r.push(c`<div class="worker-card__place-group">${s}</div>`),n=s,r.push(c`<button
        type="button"
        class="worker-card__place-lane${s.length>0?" worker-card__place-lane--nested":""}"
        data-bead-id=${t}
        data-lane=${o.id}
        ?disabled=${o.disabled===!0}
        title=${o.title||`${o.label} \uB300\uAE30 \uB9E8 \uB4A4\uC5D0 \uCD94\uAC00`}
      >
        <span>${o.label}</span>
        ${typeof o.count=="number"?c`<span class="worker-card__place-count">${o.count}</span>`:""}
      </button>`)}return c`${r}`}var Au={external_roundtrip:"\uD558\uB124\uC2A4 \uBC16 \uC0C1\uB300\uC640 \uC608\uCE21 \uBD88\uAC00 \uC655\uBCF5 \uBC18\uBCF5 \u2014 \uB2E4\uB978 rig \uC138\uC158\xB7\uC0AC\uB78C\xB7\uC678\uBD80 \uC2DC\uC2A4\uD15C",user_feedback_loop:"\uC9C4\uD589 \uC911 \uC0AC\uC6A9\uC790 \uD53C\uB4DC\uBC31 \uC5C6\uC774\uB294 \uD488\uC9C8\uC774 \uB0AE\uC74C \u2014 \uBB38\uC548\xB7\uC124\uACC4 \uC138\uBD80\xB7\uBC29\uD5A5 \uC120\uD0DD"};function xa(e,t){if(t==="rec"){let n=e.rec;if(!n)return null;let r=ba[n.state]||"";return{title:"\uBCF5\uC7A1\uD55C \uC791\uC5C5\uC73C\uB85C \uD310\uC815\uB428",lines:[...ha(n),...r.length>0?[`\uC0C1\uD0DC: ${r}`]:[],"\uC801\uC6A9\uC740 \uC774\uC288 \uC0C1\uC138\uC758 \uC2E4\uD589 \uC124\uC815 \uD3B8\uC9D1\uAE30\uC5D0\uC11C"]}}if(t==="session_preferred"){if(e.session_preferred!==!0)return null;let n=Au[e.session_preferred_reason||""]||"";return{title:"\uC6CC\uCEE4\uB85C \uB3CC\uB9B4 \uC218 \uC788\uC9C0\uB9CC \uC138\uC158\uC774 \uB0AB\uB2E4",lines:n.length>0?[n]:[]}}if(t==="ineligible")return e.worker_ineligible!==!0?null:{title:"\uC6CC\uCEE4 \uC2E4\uD589 \uB300\uC0C1\uC774 \uC544\uB2C8\uB2E4",lines:["worker-ineligible \uB77C\uBCA8\uC774 \uBD99\uC5B4 \uC788\uB2E4 \u2014 \uB77C\uBCA8\uC740 \uC774\uC288 \uC0C1\uC138\uC758 \uB77C\uBCA8 \uC808\uC5D0\uC11C \uB5C0\uB2E4"]};if(t==="spec_after_blocker")return e.spec_after_blocker!==!0?null:{title:"\uC120\uD589 \uACB0\uACFC\uAC00 \uC124\uACC4 \uC804\uC81C \u2014 \uC2A4\uD399\uB3C4 \uC120\uD589 \uB4A4\uC5D0",lines:[`\uC120\uD589: ${(Array.isArray(e.blocked_by)?e.blocked_by:[]).join(" \xB7 ")}`,"\uC120\uD589\uC774 \uB2EB\uD788\uBA74 \uC774 \uD45C\uC2DC\uB294 \uC800\uC808\uB85C \uC0AC\uB77C\uC9C4\uB2E4 \u2014 \uB77C\uBCA8\uC740 \uC774\uC288 \uC0C1\uC138\uC758 \uB77C\uBCA8 \uC808\uC5D0\uC11C \uB5C0\uB2E4"]};if(t==="qfr"){let n=e.workflow?e.workflow.quick_fix_review:null;if(!n||n.state!=="reviewed"&&n.state!=="stale")return null;let r=Array.isArray(n.missing)?n.missing:[];return{title:n.state==="reviewed"?"quick_fix self-review \uC601\uC218\uC99D\uC774 \uC9C0\uAE08 \uBCF8\uBB38\uACFC \uC77C\uCE58\uD569\uB2C8\uB2E4":"quick_fix self-review \uC601\uC218\uC99D\uC774 \uC9C0\uAE08 \uBCF8\uBB38\uACFC \uB2E4\uB985\uB2C8\uB2E4",lines:r.length>0?r:["\uBE60\uC9C4 \uD56D\uBAA9 \uC5C6\uC74C"]}}return null}var Dm=["rec","session_preferred","ineligible","qfr","spec_after_blocker"];function Xs(e,t){for(let n of Dm){if(!t(n))continue;let r=xa(e,n);return r?{chip_key:n,content:r}:null}return null}function ka(e){return e.chip_popover?Kr(e.chip_popover.content):""}function Jr(e,t){return!!e.chip_popover&&e.chip_popover.chip_key===t}var Qs="\uC0AC\uC6A9\uC790 \uB9AC\uBDF0 \uD544\uC694";function Aa(e,t=null,n={}){let r=e.worker_ineligible===!0,o=e.draggable&&!e.done&&!r,s=e.queue_placeable===!0&&!e.done&&!r,i=s&&t&&t.bead_id===e.id,l=e.session_preferred===!0,a=Au[e.session_preferred_reason||""]||"",u=e.workflow,d=typeof e.reason=="string"?e.reason.split(" \xB7 "):[],f=d.includes("missing_description"),b=d.some(I=>I.startsWith(Qs)),m=typeof e.reason=="string"&&e.reason.startsWith("\u26D4"),k=Jr(e,"spec_after_blocker"),R=Om(e.spec_after_blocker===!0,k),j=Hs(e.dependency_chips,R===""?"":c`${R}${k?ka(e):""}`),H=e.workspace_name?c`<span class="worker-card__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:"",oe=Gs(e.cross_lane_chip),X=Ks(u),q=$u(e.from_id),O=!!(e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker));return c`<div
    class="worker-card${o?"":" worker-card--static"}${r?" worker-card--ineligible":""}"
    draggable=${o?"true":"false"}
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    <div class="worker-card__head">
      ${o?c`<span class="worker-card__grip" aria-hidden="true">⠿</span>`:""}
      <span class="worker-card__id" title="클릭하면 ID 복사">${e.id}</span
      >${Vs(e.priority)}
      ${r?c`<button
            type="button"
            class="ctl-chip ctl-chip--label judgement-chip worker-card__ineligible"
            data-chip-key="ineligible"
            aria-expanded=${Jr(e,"ineligible")?"true":"false"}
            title="worker-ineligible label이 붙어 워커 실행 대상이 아닙니다"
          >
            worker-ineligible
          </button>`:l?c`<button
              type="button"
              class="ctl-chip ctl-chip--label judgement-chip worker-card__session-preferred"
              data-chip-key="session_preferred"
              aria-expanded=${Jr(e,"session_preferred")?"true":"false"}
              title=${a}
            >
              세션 권장
            </button>`:""}${Ys(e.rec,Jr(e,"rec"))}${Lm(u,Jr(e,"qfr"))}
      ${k?"":ka(e)}
    </div>
    <div class="worker-card__title">${e.title}</div>
    ${u?ks(u,e.status,{onOpenDoc:n.onOpenDoc}):""}${j}
    ${H||oe||X||q||O?c`<div class="worker-chips">
          ${H}${oe}${X}${q}${zs(e.exec_chips,{pin:n.exec_chips_mode==="pinned_only"})}
        </div>`:""}
    <div
      class="worker-card__foot${e.reason?"":" worker-card__foot--actions-only"}"
    >
      ${i?c`<div class="worker-card__place-menu">
            ${Mm(t.lanes,e.id)}
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
                  class="worker-card__reason${m?" worker-card__reason--danger":""}"
                  >${e.reason}</span
                >`:""}
            <!-- 버튼식 큐 적재 (UI-58y2 §[대기로 ↴]): 후보 레인에서 대기로 가는
                 유일한 경로다 (UI-d13v §6). 막는 것은 예전 드래그와 같다 — spec
                 없는 후보만 막고, blocked-with-spec은 적재할 수 있다. 포인터
                 종류로 감추지 않는다: 드래그라는 대체 경로가 없다. -->
            <button
              type="button"
              class="worker-card__place"
              data-bead-id=${e.id}
              ?disabled=${!s}
              title=${s?"\uB300\uAE30 \uD050 \uB9E8 \uB4A4\uC5D0 \uCD94\uAC00":r?"worker-ineligible label\uB85C \uC6CC\uCEE4\uC5D0\uC11C \uC2E4\uD589\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":b?"\uC0AC\uC6A9\uC790 \uB9AC\uBDF0\uB97C \uAE30\uB2E4\uB9AC\uB294 \uC911\uC774\uB77C \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":f?"description\uC774 \uC5C6\uC5B4 \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"spec\uC774 \uC5C6\uC5B4 \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"}
            >
              대기로 ↴
            </button>`}
    </div>
    ${eo(e)}
  </div>`}function Dn(e){let t=!!e.collapsible&&!!e.collapsed,n=typeof e.count=="number"?e.count:e.items.length,r=c`<span
      class="worker-pane__dot worker-pane__dot--${e.lane}"
      aria-hidden="true"
    ></span>
    <span class="worker-pane__title">${e.title}</span>
    ${t&&e.preview?c`<span class="worker-pane__preview">${e.preview}</span>`:""}
    <span class="worker-pane__count">${n}</span>`;return c`<section
    class="worker-pane worker-pane--lane-${e.lane}${e.src?" worker-pane--src":""}${e.live?" worker-pane--live":""}${e.collapsible?" worker-pane--collapsible":""}${t?" worker-pane--collapsed":""}"
    id=${tn(e.id||void 0)}
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
                  </div>`:e.items.map(o=>e.lane==="candidate"?Aa(o,e.place_menu,{onOpenDoc:e.onOpenDoc}):An(o))}
          </div>`}
  </section>`}function mu(e,t,n){return c`<button
      type="button"
      class="worker-wait__area-toggle"
      data-area=${e}
      aria-expanded=${n?"false":"true"}
      aria-label=${`${t} ${n?"\uD3BC\uCE58\uAE30":"\uC811\uAE30"}`}
    >
      ${n?"\u25B8":"\u25BE"}
    </button>
    <span class="worker-wait__area-name">${t}</span>`}function Zs(e){let t=e.parallel,n=e.serial,r=t.drop||{};return c`<div class="worker-wait">
    <section
      class="worker-wait__area worker-wait__area--parallel${t.collapsed?" is-collapsed":""}"
      data-area="parallel"
    >
      <header class="worker-wait__area-hd">
        ${mu("parallel","\uBCD1\uB82C \uC601\uC5ED",t.collapsed)}
        <span class="worker-wait__area-count">${t.count}</span>
      </header>
      ${t.collapsed?"":c`<div
            class="worker-wait__area-body"
            data-drop=${tn(r.drop)}
            data-root-dir=${tn(r.root_dir)}
            data-lane-id=${tn(r.lane_id)}
            data-lane-length=${tn(r.lane_length)}
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
        ${mu("serial","\uC9C1\uB82C \uC601\uC5ED",n.collapsed)}
        ${n.header_control?n.header_control:""}
      </header>
      ${n.collapsed?"":c`<div class="worker-wait__area-body">
            ${n.notice?n.notice:""}
            ${n.extra_panes?n.extra_panes:""}
            ${n.lanes.map(o=>Pm(o))}
          </div>`}
    </section>
  </div>`}function Pm(e){let t=e.drop||{},n=e.badge?c`<span
        class="worker-lane__badge${e.held?" worker-lane__badge--held":""}"
        >${e.badge}</span
      >`:"";return c`<div
    class="worker-wait__lane${e.empty?" worker-wait__lane--empty":""}"
  >
    ${Dn({id:typeof e.pane_id=="string"?e.pane_id:`worker-pane-lane-${e.id}`,lane:e.id,title:e.title,items:[],count:e.count,empty:"\uBE44\uC5B4 \uC788\uC74C \u2014 \uD589\uC744 \uC5EC\uAE30\uB85C \uB4DC\uB798\uADF8",header_control:c`${n}${e.header_control?e.header_control:""}`,body:c`<div
        class="worker-wait__rows"
        data-drop=${tn(t.drop)}
        data-root-dir=${tn(t.root_dir)}
        data-lane-id=${tn(t.lane_id)}
        data-lane-length=${tn(t.lane_length)}
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
  </div>`}function Js(e){return e.count?c`<section
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
  </section>`:""}var Su=[{step:"merge",label:"\uBA38\uC9C0",index:1},{step:"base",label:"base",index:2},{step:"verify",label:"\uAC80\uC99D",index:3},{step:"deploy",label:"\uBC30\uD3EC",index:4},{step:"child",label:"\uC790\uC2DD",index:5},{step:"branch",label:"\uBE0C\uB79C\uCE58",index:6},{step:"close",label:"close",index:7}],Ro=[{step:"base_containment",label:"base \uD3EC\uD568 \uD655\uC778"},{step:"repo_operations",label:"\uC800\uC7A5\uC18C \uC791\uC5C5"},{step:"child_sweep",label:"\uC790\uC2DD \uC815\uB9AC"},{step:"branch_cleanup",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC"},{step:"parent_close",label:"\uBD80\uBAA8 close"}];function ei(e,t){let n=Su.find(o=>o.step===e);if(!n)return null;let r=Su.length;return{step:n.step,label:t,index:n.index,total:r,percent:Math.round(n.index/r*100)}}function Eu(e){let t=Ro.findIndex(n=>n.step===e);return Ro.map((n,r)=>({step:n.step,label:n.label,state:t<0?"todo":r<t?"done":r===t?"stall":"todo"}))}function $r(e){let t=Ro.find(n=>n.step===e);return t?t.label:typeof e=="string"?e:""}function Nm(e){let t=Ro.findIndex(n=>n.step===e);return t<0?null:{index:t+1,total:Ro.length}}function ti(e){let t=Nm(e);return t?`\uBA38\uC9C0 \uC644\uB8CC \xB7 \uC815\uB9AC ${t.total}\uB2E8\uACC4 \uC911 ${t.index}\uB2E8\uACC4\uC5D0\uC11C \uBA48\uCDA4`:"\uBA38\uC9C0\uB428 \xB7 \uC815\uB9AC \uBBF8\uC644"}var Ea=new Set(["queued","running","retry_pending"]),Tu=new Set(["failed","succeeded"]),qm={queued:"\uB300\uAE30",running:"\uC911",retry_pending:"\uC7AC\uC2DC\uB3C4 \uB300\uAE30",failed:"\uC2E4\uD328",succeeded:"\uC644\uB8CC \xB7 \uC815\uB9AC \uC7AC\uAC1C \uB300\uAE30"},Oo={base_containment:{step:"base",label:"base \uD655\uC778 \uC911"},child_sweep:{step:"child",label:"\uC790\uC2DD \uC815\uB9AC \uC911"},branch_cleanup:{step:"branch",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC \uC911"},parent_close:{step:"close",label:"\uBD80\uBAA8 close \uC911"}},Fm={merging:{step:"merge",label:"\uBA38\uC9C0 \uC911"},base_containment:Oo.base_containment,child_sweep:Oo.child_sweep,branch_cleanup:Oo.branch_cleanup,parent_close:Oo.parent_close};function jm(e){return typeof e=="string"&&/^[0-9a-f]{40}$/.test(e)}function Bm(e,t,n){return!["verify","deploy"].includes(e.kind)||![...Ea,...Tu].includes(e.state)||![null,void 0,""].includes(e.superseded_by)||!Array.isArray(e.subjects)?!1:e.subjects.some(r=>r&&typeof r=="object"&&r.bead_id===t&&r.merged_sha===n)}function Um(e,t){let n=(t.kind==="deploy"?2:1)-(e.kind==="deploy"?2:1);if(n!==0)return n;let r=u=>u.state==="succeeded"?1:2,o=r(t)-r(e);if(o!==0)return o;let s=typeof e.requested_at=="number"?e.requested_at:0,i=typeof t.requested_at=="number"?t.requested_at:0;if(s!==i)return i-s;let l=typeof e.operation_id=="string"?e.operation_id:"",a=typeof t.operation_id=="string"?t.operation_id:"";return l.localeCompare(a)}function Sa(e,t=!1){let n=e.kind,r=n==="verify"?"\uAC80\uC99D":"\uBC30\uD3EC",o=t?"failed":e.state,s=qm[o];if(!s)return null;let i=ei(n,`${r} ${s}`);return i?{...i,active:Ea.has(o),failed:o==="failed"}:null}function Wm(e){return!e||typeof e!="object"?null:Fm[e.step]||null}function Lo(e){if(!e||typeof e.bead_id!="string")return null;let t=e.bead_id,n=e.merge_progress&&typeof e.merge_progress=="object"?e.merge_progress:{},r=Wm(n),o=e.cleanup_failed&&typeof e.cleanup_failed=="object"?e.cleanup_failed:null,s=["child_sweep","branch_cleanup","parent_close"].includes(typeof e.cleanup_cursor=="string"?e.cleanup_cursor:""),i=!s&&(e.cleanup_cursor==="repo_operations"||n.step==="repo_operations"),l=jm(e.merge_sha)?e.merge_sha:null,a=!s&&l&&Array.isArray(e.repo_operations)?e.repo_operations.filter(k=>k&&typeof k=="object"&&Bm(k,t,l)).sort(Um):[],u=i?a:[],d=u.find(k=>Ea.has(k.state));if(d)return Sa(d);if(o)return o.step==="repo_operations"&&a[0]?Sa(a[0],!0):null;let f=u.find(k=>Tu.has(k.state)?k.state!=="succeeded"||e.cleanup_cursor==="repo_operations":!1);if(f)return Sa(f);if(r){let k=ei(r.step,r.label);return k?{...k,active:!0,failed:!1}:null}let b=typeof e.cleanup_cursor=="string"?Oo[e.cleanup_cursor]:null;if(!b)return null;let m=ei(b.step,b.label);return m?{...m,active:!0,failed:!1}:null}function ni(e){return!!e&&e.step!=="merge"&&e.failed!==!0}var zm="\uBBF8\uC801\uC7AC";function Ta(e,t){let n=Un(e,t.id);return{id:t.id,label:`\u26D3 ${t.id}`,title:`\uC120\uD589 \u2014 close\uB420 \uB54C\uAE4C\uC9C0 \uCD9C\uBC1C\uD558\uC9C0 \uC54A\uB294\uB2E4 (${t.location_label})`,...n?{foreign:!0}:{}}}var Hm=10080*60*1e3;function Cu(e,t,n){let r=t.closed_at;if(typeof r!="number"||!Number.isFinite(r)||r<n-Hm)return null;let o=Un(e,t.id),s=typeof t.root_dir=="string"?t.root_dir:"",i={id:t.id,label:`\u{1F513} ${t.id}`,title:`\uD574\uC81C \u2014 ${Ht(r)}\uC5D0 close\uB418\uC5B4 \uC774 \uC774\uC288\uAC00 \uD480\uB838\uB2E4`,...o?{foreign:!0}:{}};return o?s.length>0&&(i.openable=!0,i.root_dir=s):i.openable=!0,i}function Ru(e,t){let n=Array.isArray(t.ids)?t.ids.filter(s=>typeof s=="string"&&s.length>0):[],r=t.root_dirs&&typeof t.root_dirs=="object"?t.root_dirs:{},o=[];for(let s of[...new Set(n)].sort()){let i=Un(e,s),l=typeof r[s]=="string"?r[s]:"",a={id:s,label:`\u2192 ${s}`,title:"\uD6C4\uC18D \u2014 \uC774 \uC774\uC288\uAC00 close\uB418\uBA74 \uD480\uB9B0\uB2E4",...i?{foreign:!0}:{}};l.length>0?(a.openable=!0,a.root_dir=l):i||(a.openable=!0),o.push(a)}return o}function Ou(e,t,n={}){let r=new Map,o=new Map;for(let s of t)o.has(s.id)||o.set(s.id,s.location_label);for(let[s,i]of e){if(typeof s!="string"||s.length===0)continue;let l=[];for(let a of Array.isArray(i)?i:[]){if(typeof a!="string"||a.length===0)continue;let u=Ta(s,{id:a,location_label:o.get(a)||zm}),d=n[a];u.foreign!==!0?u.openable=!0:typeof d=="string"&&d.length>0&&(u.openable=!0,u.root_dir=d),l.push(u)}l.length>0&&r.set(s,l)}return r}var oi=1,Io=[{value:"repo_spec",label:"\uB808\uD3EC \xB7 spec \uC6B0\uC120"},{value:"repo_updated",label:"\uB808\uD3EC \xB7 \uCD5C\uC2E0 \uC218\uC815"},{value:"updated_flat",label:"\uCD5C\uC2E0 \uC218\uC815(\uB808\uD3EC \uBB34\uC2DC)"}],Oa=[{value:"all",label:"\uC804\uCCB4"},{value:"with",label:"spec \uC788\uC74C"},{value:"without",label:"spec \uC5C6\uC74C"}],to={show_blocked:!0,spec:"all"},Lu={auto_merge:"\uC790\uB3D9 \uBA38\uC9C0",merged:"\uBA38\uC9C0",merge:"\uBA38\uC9C0",pr_stop:"PR \uC911\uB2E8",stopped:"\uC911\uB2E8",failed:"\uC2E4\uD328"};function Gm(e,t){let n=null;for(let r of Object.values(e||{}))!r||r.bead_id!==t||!Kn(r)||(n=typeof r.status=="string"?r.status:null);return n}function Km(e,t){let n=null,r=-1/0;for(let o of Object.values(e)){if(!o||o.bead_id!==t||o.status==="running"||!Kn(o))continue;let s=typeof o.finished_at=="number"?o.finished_at:typeof o.started_at=="number"?o.started_at:0;s>=r&&(r=s,n=o)}return n}function Ym(e,t,n={}){let{winners:r,resumed_from_ids:o}=Hc(e,t),s=new Map;for(let[i,l]of r){let a=l.attempt,u=l.run_state,d=l.started_at,f=typeof a.session_id=="string"&&a.session_id.length>0,m=Ds(a.quickfix_landing)==="session",k=u!=="running"&&(f||!m)&&!o.has(a.attempt_id),R=!f&&m?"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":o.has(a.attempt_id)?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":null,j=ct(n.observations?.[i]),H=ct(j.pr),oe=typeof a.merge_sha=="string"&&a.merge_sha.length>0||H.state==="MERGED",X=Vn(n.discard_operations,i,{attempt_id:a.attempt_id,merged:oe}),q=u==="failed"?Mu(a,{resume_eligible:k,resume_reason:R,confirmation:X.confirmation,history:n.bead_timelines?.[i]}):null;s.set(i,{...Iu(a,e,u),started_at:d,...q?{failure:q}:{},can_pause:u==="running"&&f,can_resume:k})}for(let[i,l]of Zm(e,t)){if(s.has(i))continue;let a=l.attempt,u=Vn(n.discard_operations,i,{attempt_id:a.attempt_id}),d=Fu(a);s.set(i,{...Iu(a,e,l.run_state),started_at:typeof a.started_at=="number"?a.started_at:null,...l.run_state==="parked"?{failure:Mu(a,{resume_eligible:!1,resume_reason:"\uC138\uC158 \uB300\uAE30 \u2014 [\uC7AC\uC2DC\uB3C4]\uAC00 \uC0C8 attempt\uB97C \uB744\uC6C1\uB2C8\uB2E4",confirmation:u.confirmation,history:n.bead_timelines?.[i]})}:{},...l.run_state==="waiting"?{wait:Xm(a)}:{},...d?{retry:d}:{},can_pause:!1,can_resume:!1})}return s}function Iu(e,t,n){return{attempt_id:typeof e.attempt_id=="string"?e.attempt_id:"",run_state:n,last_event_at:typeof e.last_event_at=="number"?e.last_event_at:null,last_activity:e.last_activity&&typeof e.last_activity=="object"?e.last_activity:null,legs:Array.isArray(e.legs)?e.legs:[],runner:typeof e.runner=="string"?e.runner:null,model:typeof e.model=="string"?e.model:null,effort:typeof e.effort=="string"?e.effort:null,speed:typeof e.speed=="string"?e.speed:null,resumed_from:typeof e.resumed_from=="string"?e.resumed_from:null,continuation_mode:e.continuation_mode==="session"||e.continuation_mode==="fresh"?e.continuation_mode:null,status:typeof e.status=="string"?e.status:null,usage:Gn(t,e.bead_id)}}function Mu(e,t){let n=e.cause_detail&&typeof e.cause_detail=="object"?e.cause_detail:null;return{cause:typeof e.cause=="string"?e.cause:null,cause_detail:n,summary:n&&typeof n.summary=="string"?n.summary:null,bead_id:typeof e.bead_id=="string"?e.bead_id:"",finished_at:typeof e.finished_at=="number"?e.finished_at:null,runner:typeof e.runner=="string"?e.runner:null,model:typeof e.model=="string"?e.model:null,effort:typeof e.effort=="string"?e.effort:null,observed_effort:typeof e.observed_effort=="string"?e.observed_effort:null,speed:typeof e.speed=="string"?e.speed:null,attempt_id:typeof e.attempt_id=="string"?e.attempt_id:"",usage:e.usage&&typeof e.usage=="object"?e.usage:null,halted_auto_advance:e.halted_auto_advance===!0,quickfix_lane:e.quickfix_lane===!0,quickfix_landing:e.quickfix_landing&&typeof e.quickfix_landing=="object"?e.quickfix_landing:null,retry:Fu(e),resume_eligible:t.resume_eligible,resume_reason:t.resume_reason,landed:wu(e),confirmation:t.confirmation,...Vm(t.history)}}function Vm(e){if(!e||typeof e!="object")return{};let t=Array.isArray(e.events)?e.events:[],n=[];for(let o of t)!o||typeof o!="object"||typeof o.summary!="string"||o.summary.length===0||n.push({event_id:typeof o.event_id=="string"?o.event_id:"",kind:typeof o.kind=="string"?o.kind:"",summary:o.summary,at:typeof o.at=="number"?o.at:null});n.reverse();let r=typeof e.log_path=="string"&&e.log_path.length>0?e.log_path:null;return{...n.length>0?{timeline:n}:{},...r===null?{}:{log_path:r},...e.log_expired===!0?{log_expired:!0}:{},...e.log_unreadable===!0?{log_unreadable:!0}:{}}}function Xm(e){let t=e.cause_detail&&typeof e.cause_detail=="object"?e.cause_detail:null,n=Array.isArray(t?.blockers)?t.blockers:[],r=[];for(let o of n)!o||typeof o!="object"||typeof o.id!="string"||o.id.length===0||r.push({id:o.id,rig:typeof o.rig=="string"?o.rig:null,status:typeof o.status=="string"?o.status:""});return{summary:t&&typeof t.summary=="string"?t.summary:null,blockers:r,since:typeof e.finished_at=="number"?e.finished_at:null}}function Fu(e){let t=e&&e.retry&&typeof e.retry=="object"?e.retry:null;return t?{cause:typeof t.cause=="string"?t.cause:null,attempts:typeof t.attempts=="number"?t.attempts:0,max:typeof t.max=="number"?t.max:0,next_at:typeof t.next_at=="number"?t.next_at:null}:null}var Qm=new Set(["parked","retry_wait","waiting"]);function Zm(e,t){let n=Object.values(e||{}),r=new Map;for(let s of n)s&&typeof s.bead_id=="string"&&Kn(s)&&r.set(s.bead_id,s.attempt_id);let o=new Map;for(let s of n){if(!s||typeof s.bead_id!="string"||s.bead_id.length===0||!Kn(s)||!Qm.has(s.status)||r.get(s.bead_id)!==s.attempt_id||typeof s.dismissed_at=="number")continue;let i=t.get(s.bead_id);typeof i=="number"&&i>0&&typeof s.finished_at=="number"&&i>=s.finished_at||o.set(s.bead_id,{attempt:s,run_state:s.status})}return o}function Du(e,t){let n=e[t];if(!n)return"";if(n.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let r=typeof n.reason=="string"?n.reason:"",o=r.indexOf(":");return o>0&&o<r.length-1?`\u26D4 ${r.slice(0,o)} (${r.slice(o+1)})`:`\u26D4 ${r}`}function ct(e){return e&&typeof e=="object"?e:{}}function Jm(e,t,n){let r=ct(t);if(Object.keys(r).length===0)return null;let o=e.execution_defaults,s=e.runner_catalog,i=e.session_defaults;if(!o||!s||!i)return null;let l=b=>fn({pin:b,global:i,execution_defaults:o,runner_catalog:s,route:n}),a,u;try{a=l(r),u=l(null)}catch{return null}let d=Pu(Qr(a,s),Qr(u,s)),f=Pu(wr(a,null),wr(u,null));return d||f?{orchestration:d,worker:f}:null}function Pu(e,t){return!e||t&&t.text===e.text?null:e}function eg(e,t,n){let o=(t&&typeof t=="object"&&Array.isArray(t.released_by)?t.released_by:[]).filter(i=>i&&typeof i=="object"&&typeof i.id=="string").slice().sort((i,l)=>(typeof l.closed_at=="number"?l.closed_at:0)-(typeof i.closed_at=="number"?i.closed_at:0)),s=[];for(let i of o){let l=Cu(e,i,n);l&&s.push(l)}return s.length===0?null:s}function La(e,t){return typeof e!="string"||e.length===0||typeof t!="string"||t.length===0||t===e?null:`\u2192 ${t}`}var tg=new Set(["quick_fix","spec_backed","full_plan"]);function Nu(e){return typeof e=="string"&&tg.has(e)}function ng(e){let t={...ct(e.session_defaults)};for(let n of["orchestration_model","orchestration_effort","orchestration_speed"]){let r=e[n];typeof r=="string"&&(t[n]=r)}return t}function rg(e,t,n){let r=e.runner_catalog??null,o=Ra(e,t,n,null);if(!o)return null;let s=xn(r,o.orchestration_model.value??""),i=s===null?o:Ra(e,t,n,s)||o,l=Qr(i,r),a=wr(i,s);return l||a?{orchestration:l,worker:a}:null}function Ra(e,t,n,r){let o=Nu(n)?n:Nu(t.route)?t.route:null;try{return fn({pin:t,global:ng(e),execution_defaults:e.execution_defaults??null,runner_catalog:e.runner_catalog??null,route:o,controller_runtime:r})}catch{return null}}function og(e,t,n){return!t||!Object.hasOwn(t,"metadata")?null:wr(Ra(e,ct(t.metadata),t.route,n),n)}function Ia(e,t){let n=new Set,r=e;for(;r&&!n.has(r.attempt_id);){if(r.conflict_resolution===!0)return!0;n.add(r.attempt_id),r=typeof r.resumed_from=="string"&&r.resumed_from.length>0&&t.get(r.resumed_from)||null}return!1}function sg(e){let t={};for(let l of Mn)t[l]=0;let n=!1,r=0,o=0,s=0;for(let l of e){let a=l.usage;if(!a||typeof a!="object")continue;let u=!1;for(let d of Mn)Number.isFinite(a[d])&&(t[d]+=a[d],n=!0,u=!0);u&&(o+=1,Number.isFinite(a.total_cost_usd)&&(r+=a.total_cost_usd,s+=1))}o>0&&s===o&&(t.total_cost_usd=r);let i=e.map(l=>l.usage).filter(l=>l&&typeof l=="object"&&l.providers);return i.length>0?Qt(Ts(i)):n?Hn(t):null}function ju(e,t){let n=va(e,t);return n==="internal"?"\uBBF8\uC801\uC7AC":n==="external"?"\uC678\uBD80":"\uC704\uCE58 \uBBF8\uD655\uC778"}function ig(e,t,n){let r=t.get(e);if(!r)return ju(e,n);if(typeof r.position=="number"){if(r.lane==="parallel")return`#${r.position}`;if(/^s[1-5]$/.test(r.lane))return`${r.lane} #${r.position}`}return To(r)}function ag(e,t,n,r){let o=t.get(e);if(!o)return{label:ju(e,n),title:""};if(typeof o.position=="number"&&(o.lane==="parallel"||/^s[1-5]$/.test(o.lane))){let i=r.get(e),l=o.lane==="parallel"?"\uBCD1\uB82C":o.lane;return{label:i&&i.length>0?"\u{1F512} \uB300\uAE30":"\uB300\uAE30",title:`${o.workspace_name||o.root_dir} ${l} #${o.position}`}}return{label:o.state==="running"?"\u25B6 \uC2E4\uD589\uC911":To(o),title:""}}function lg(e,t){for(let n of Object.values(e||{}))if(n&&n.attempt_id===t&&typeof n.armed_by_lane=="string"&&n.armed_by_lane.length>0)return n.armed_by_lane;return null}function cg(e,t,n,r,o,s){return t==="draft"?{state:"draft",badge:"draft",run_label:null,can_stop:!1}:n.some(i=>s.failed_by_bead.get(i.id)===e)?{state:"failed",badge:"\u26D4 \uC2E4\uD328",run_label:"\u25B6 \uB2E4\uC2DC \uC9C4\uD589",can_stop:!1}:s.disarmed_lanes.has(e)?{state:"restart",badge:"\u23F8 \uC7AC\uC2DC\uC791",run_label:"\u25B6 \uC9C4\uD589",can_stop:!1}:n.some(i=>s.armed_by_bead.get(i.id)===e)?{state:"running",badge:"\u25B6 \uC9C4\uD589 \uC911",run_label:o.length>0?"\u25B6 \uC774\uC5B4\uC11C \uC9C4\uD589":null,can_stop:!0}:r?{state:"all_done",badge:"\uBAA8\uB450 \uC644\uB8CC",run_label:null,can_stop:!1}:{state:"confirmed",badge:"\uD655\uC815",run_label:"\u25B6 \uC9C4\uD589",can_stop:!1}}function ug(e,t,n,r,o,s,i){let l=[];return e.forEach((a,u)=>{let d=typeof a.id=="string"?a.id:"";if(d.length===0)return;let f=a.status==="confirmed"?"confirmed":"draft",b=Array.isArray(a.entries)?a.entries:[],m=[];b.forEach((H,oe)=>{let X=H&&typeof H.bead_id=="string"?H.bead_id:"";if(X.length===0)return;let q=H&&typeof H.root_dir=="string"?H.root_dir:"",O=n.get(X),I=O?O.state:void 0,F=I==="running"||I==="pr_wait"||I==="done",B=!O||I==="runnable",ae=O&&O.lane==="parallel"&&typeof O.position=="number"?O.position-1:null,N=ag(X,n,r,t),W=m.length>0?m[m.length-1].id:null,Z=f==="confirmed"&&W!==null&&!(t.get(X)||[]).includes(W);m.push({id:X,title:o.get(X)||X,root_dir:O?O.root_dir:q,workspace_name:O?O.workspace_name:s.get(q)||"",seq:oe+1,location_label:N.label,location_title:N.title,draggable:!F,fixed:F,done:I==="done",unplaced:B,mismatch:Z,...ae!==null?{queue_index:ae}:{}})}),m.forEach((H,oe)=>{H.seq=oe+1});let k=m.length>0&&m.every(H=>H.done),R=m.filter(H=>!H.fixed&&i.armed_by_bead.get(H.id)!==d).map(H=>H.id),j=cg(d,f,m,k,R,i);l.push({lane_id:d,status:f,draft:f==="draft",number:u+1,label:`\uC5F0\uACB0 ${u+1} \xB7 \uB808\uD3EC \uAC04`,rows:m,all_done:k,can_confirm:f==="draft"&&m.length>=2,has_mismatch:f==="confirmed"&&m.some(H=>H.mismatch||H.unplaced),unlaunched:R,...j})}),l}function dg(e,t,n){if(e.lane==="runnable"){let i=n.get(e.id);return i?i.length===0?{scope:[],state:"missing"}:{scope:i,state:"declared"}:{scope:[],state:void 0}}let r=t.get(e.root_dir),o=r?r[e.id]:void 0;if(!o||!Array.isArray(o.scope))return{scope:[],state:void 0};let s=o.scope.filter(i=>typeof i=="string"&&i.length>0);return{scope:s,state:s.length===0?"missing":"declared"}}function pg(e,t,n,r,o){let s=new Map;for(let a of[...e.running,...e.queue,...e.runnable,...e.pr_wait]){if(!t.has(a.root_dir))continue;let u=`${a.root_dir}\0${a.id}`,d=s.get(u);if(d){d.cards.push(a);continue}let{scope:f,state:b}=dg(a,t,n);b!==void 0&&(a.scope_state=b),s.set(u,{cards:[a],scope:f})}let i=new Map;for(let a of s.values()){let u=a.cards[0].scope_state;if(u!==void 0)for(let b of a.cards)b.scope_state=u;if(a.scope.length===0)continue;let d=a.cards[0].root_dir,f=i.get(d);f?f.push(a):i.set(d,[a])}let l=(a,u,d)=>{let f=u.cards[0],b={id:f.id,title:f.title,location_label:ig(f.id,r,o),prefixes:d,...typeof f.root_dir=="string"&&f.root_dir.length>0?{root_dir:f.root_dir}:{}};for(let m of a.cards)m.overlap_chips?m.overlap_chips.push(b):m.overlap_chips=[b]};for(let a of i.values())for(let u=0;u<a.length;u+=1)for(let d=u+1;d<a.length;d+=1){let f=qs(a[u].scope,a[d].scope);f.length!==0&&(l(a[u],a[d],f),l(a[d],a[u],f))}}function qu(e,t,n){let r=n?n.get(t)?.root_dir:void 0,o=!Un(e.id,t),s=typeof e.root_dir=="string"?e.root_dir:"",i=typeof r=="string"&&r.length>0?r:o&&s.length>0?s:"";return i.length>0?{openable:!0,root_dir:i}:o?{openable:!0}:{}}function fg(e,t,n,r){let o=new Set(e?e.ids:[]);for(let l of t&&Array.isArray(t.ids)?t.ids:[])typeof l=="string"&&l.length>0&&o.add(l);if(o.size===0)return{ids:[]};let s={},i={...e?e.root_dirs:{},...t&&t.root_dirs&&typeof t.root_dirs=="object"?t.root_dirs:{}};for(let l of o){let a=i[l];if(typeof a=="string"&&a.length>0){s[l]=a;continue}if(!Un(n.id,l)){n.root_dir.length>0&&(s[l]=n.root_dir);continue}let u=r.get(l)?.root_dir;typeof u=="string"&&u.length>0&&(s[l]=u)}return{ids:[...o],root_dirs:s}}function Ca(e){if(typeof e=="number")return Number.isFinite(e)?e:null;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:null}return null}function ri(e){if(typeof e=="number"&&Number.isFinite(e))return e;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:0}return 0}function ar(e,t,n){let r=Array.isArray(e)?e:[],o=Array.isArray(t)?t:[],s=n&&typeof n.done_since=="number"?n.done_since:void 0,i={...to,...n&&n.candidate_filter?n.candidate_filter:{}},l=n&&Object.hasOwn(n,"cross_lanes")?n.cross_lanes??null:void 0,a=n&&n.candidate_sort==="as_given"?"as_given":n&&Io.some(v=>v.value===n.candidate_sort)?n.candidate_sort:"repo_spec",u=n&&n.groups==="all"?"all":"nonempty",d=n&&n.candidate_hidden_counts==="per_control"?"per_control":"sequential",f=Date.now(),b=new Map;for(let v of o)v&&typeof v.root_dir=="string"&&b.set(v.root_dir,v);let m=new Map;for(let v of o)v&&typeof v.root_dir=="string"&&m.set(v.root_dir,v.name||v.root_dir);for(let v of r)v&&typeof v.root_dir=="string"&&m.set(v.root_dir,v.name||v.root_dir);let k=[],R=[],j=[],H=[],oe=[],X=[],q=new Map,O=new Map,I=new Map,F=new Map,B=new Map,ae=new Map,N=new Map,W=new Map,Z=new Map,ee=new Map,Se=new Map,ge=new Map,ue=new Map,P=new Set,we=new Map,xe=new Map,E=new Map;for(let v of r){if(!v||typeof v.root_dir!="string")continue;let z=v.root_dir,Ee=v.name||z,Ce=b.get(z),je=Ce&&typeof Ce.revision=="number"?Ce.revision:typeof v.revision=="number"?v.revision:0,Ve=ct(v.attempts),pt=ct(v.bead_titles);for(let[p,_]of Object.entries(pt))typeof _=="string"&&_.length>0&&E.set(p,_);let kt=ct(v.bead_times),Lt=ct(v.pr_observations),$t=ct(v.admission),_t=ct(v.revise_parked),Be=ct(v.merge_queue_state),L=ct(v.cleanup_failed),te=ct(v.discard_operations),ye=ct(v.bead_timelines),T=ct(v.bead_blocked_by);Object.hasOwn(v,"bead_scope")&&we.set(z,ct(v.bead_scope));let K=ct(v.bead_workflow),Ie=ct(v.pr_activity),Ue=Array.isArray(v.repo_operations)?v.repo_operations:[];W.set(z,Ue);let qe=typeof v.declared_base=="string"?v.declared_base:null;N.set(z,qe),ae.set(z,Object.entries(L).map(([p,_])=>({bead_id:p,step:_&&_.step?_.step:"",reason:_&&_.reason?_.reason:"",at:_&&typeof _.at=="number"?_.at:null,detail:_&&typeof _.detail=="string"?_.detail:null,output_tail:_&&typeof _.output_tail=="string"&&_.output_tail?_.output_tail:void 0,log_path:_&&typeof _.log_path=="string"&&_.log_path?_.log_path:void 0,retry_count:_&&typeof _.retry_count=="number"&&Number.isInteger(_.retry_count)&&_.retry_count>0?_.retry_count:0,failure_code:_&&typeof _.failure_code=="string"?_.failure_code:void 0})));for(let[p,_]of Object.entries(ct(v.bead_overlay)))_&&typeof _=="object"&&Z.set(`${z}\0${p}`,_);let tt=new Map;for(let p of Object.values(Ve))p&&typeof p.attempt_id=="string"&&tt.set(p.attempt_id,p);let Oe=Array.isArray(v.merge_queue)?v.merge_queue:[],He=new Set(Oe.filter(p=>p&&typeof p.bead_id=="string").map(p=>p.bead_id)),Je=new Map(Oe.filter(p=>p&&typeof p.bead_id=="string").map(p=>[p.bead_id,p])),bt=new Map,ze=new Map,xt=new Map,qt=new Map;Oe.forEach((p,_)=>{p&&typeof p.bead_id=="string"&&(bt.set(p.bead_id,_+1),ze.set(p.bead_id,p.resolution),xt.set(p.bead_id,p.continuation_action||null),qt.set(p.bead_id,p.authority||null))});let lt=ct(v.auto_merge_skips),Yt=p=>{let _=lt[p];if(!_)return null;let S=ct(ct(Lt[p]).pr).head_sha;return S&&S===_.head_sha?_.reason||"":null};B.set(z,{positions:bt,resolutions:ze,continuations:xt,authorities:qt,state:{active:typeof Be.active=="string"?Be.active:null,failures:ct(Be.failures),waiting:Be.waiting&&typeof Be.waiting.bead_id=="string"&&typeof Be.waiting.reason=="string"?Be.waiting:null},auto_excluded:(Array.isArray(v.pr_wait)?v.pr_wait:[]).map(p=>p&&p.bead_id).filter(p=>typeof p=="string"&&Yt(p)!==null),running:Oe.length>0});let St=Array.isArray(v.queue)?v.queue:[];for(let p of[...St,...Array.isArray(v.pr_wait)?v.pr_wait:[]])p&&typeof p.bead_id=="string"&&typeof p.armed_by_lane=="string"&&p.armed_by_lane.length>0&&ge.set(p.bead_id,p.armed_by_lane);for(let p of Array.isArray(v.disarmed_on_load)?v.disarmed_on_load:[])typeof p=="string"&&p.length>0&&P.add(p);let It=(Array.isArray(v.serial_lanes)?v.serial_lanes:[]).filter(p=>p&&/^s[1-5]$/.test(p.id)&&Array.isArray(p.entries)),Ut=ct(v.lane_states),Vt=typeof v.serial_lane_count=="number"?Math.max(0,Math.min(5,Math.floor(v.serial_lane_count))):Math.min(5,It.length);I.set(z,Vt),F.set(z,St.length);let Jt=new Map(It.map(p=>[p.id,p])),Wt=new Map;for(let p of It)for(let _ of p.entries)_&&typeof _.bead_id=="string"&&Wt.set(_.bead_id,p.id);for(let[p,_]of Object.entries(ct(v.bead_dependents))){let S=Array.isArray(_?.ids)?_.ids:[],Y=ct(_?.root_dirs),V=Se.get(p)||{ids:new Set,root_dirs:{}};for(let ie of S)typeof ie=="string"&&ie.length>0&&V.ids.add(ie);for(let[ie,$e]of Object.entries(Y))typeof $e=="string"&&$e.length>0&&(V.root_dirs[ie]=$e);Se.set(p,V)}for(let[p,_]of Object.entries(T))Array.isArray(_)&&ee.set(p,_.filter(S=>typeof S=="string"&&S.length>0));let Dt=Array.isArray(v.done)?v.done:[];for(let p of Dt)p&&typeof p.bead_id=="string"&&X.push({id:p.bead_id,root_dir:z,workspace_name:Ee});let cn=new Map;for(let p of Dt)p&&typeof p.bead_id=="string"&&typeof p.added_at=="number"&&cn.set(p.bead_id,p.added_at);let Mt=p=>({id:p,title:pt[p]||p,root_dir:z,workspace_name:Ee,expected_revision:je,draggable:!1,...ct(kt[p]).created_at?{created_at:ct(kt[p]).created_at}:{},...ct(kt[p]).updated_at?{updated_at:ct(kt[p]).updated_at}:{}}),Gt=p=>{let _=K[p]?.chips?.pr;return _&&typeof _.number=="number"&&typeof _.url=="string"?{pr_number:_.number,pr_url:_.url}:{}},Ft=p=>Object.hasOwn(T,p)?{blocked_by:Array.isArray(T[p])?T[p].filter(_=>typeof _=="string"&&_.length>0):[]}:{},en=(p,_)=>{let S=Ft(p),Y=(_?.blockers||[]).map(ie=>ie.id);if(Y.length===0)return S;let V=[...S.blocked_by||[]];for(let ie of Y)V.includes(ie)||V.push(ie);return{blocked_by:V}},de=new Set;for(let[p,_]of Ym(Ve,cn,{discard_operations:te,observations:Lt,bead_timelines:ye})){de.add(p);let S=_.run_state==="failed"?lg(Ve,_.attempt_id):null;S!==null&&ue.set(p,S);let Y=tt.get(_.attempt_id)||null,V=Z.get(`${z}\0${p}`),ie=V&&V.rollup?V.rollup:null,$e=La(qe,Y?Y.target_base:null),Xe=Y?Ia(Y,tt):!1,it=Y&&Y.quickfix_lane===!0&&Y.quickfix_landing&&typeof Y.quickfix_landing=="object"?Y.quickfix_landing:null,yt=it&&typeof it.reason=="string"&&it.reason.length>0?it.reason:null,mt=it?Lo({bead_id:p,merge_sha:it.head_sha,cleanup_cursor:it.cursor,cleanup_failed:yt?{step:it.cursor,reason:yt}:null,repo_operations:Ue}):null;R.push({...Mt(p),lane:"running",...en(p,_.wait),...Wt.has(p)?{serial_lane_id:Wt.get(p)}:{},attempt_id:_.attempt_id,run_state:_.run_state,status:_.status||void 0,workflow:K[p]||null,can_pause:_.can_pause,can_resume:_.can_resume,started_at:_.started_at,last_event_at:_.last_event_at,last_activity:_.last_activity,legs:_.legs,runner:_.runner,model:_.model,effort:_.effort,speed:_.speed,resumed_from:_.resumed_from,continuation_mode:_.continuation_mode,usage:_.usage,failure:_.failure||null,wait:_.wait||null,retry:_.retry||null,exec_chips:{orchestration:ga(_),worker:og(ct(Ce),V,_.runner||null)},discard:Vn(te,p,{attempt_id:_.attempt_id,merged:_.failure?.confirmation==="merged"||ct(Lt[p]).pr?.state==="MERGED"}),...ie?{rollup:ie}:{},...Xe?{conflict_resolution:!0}:{},...$e?{base_exception:$e}:{},...mt?{landing:mt}:{},badges:_.run_state==="paused"?["\u23F8 \uC77C\uC2DC\uC815\uC9C0"]:_.run_state==="failed"?["\u26A0 \uC2E4\uD328"]:_.run_state==="parked"?["\u23F8 \uC138\uC158 \uB300\uAE30"]:_.run_state==="retry_wait"?["\u21BB \uC7AC\uC2DC\uB3C4 \uB300\uAE30"]:_.run_state==="waiting"?["\u26D3 \uC120\uD589 \uB300\uAE30"]:[],alert:_.run_state==="failed"})}for(let[p,_]of zc(Ve)){if(R.some(Y=>Y.id===p))continue;let S=_.attempt;R.push({...Mt(p),lane:"running",kind:"session",...Ft(p),attempt_id:typeof S.attempt_id=="string"?S.attempt_id:"",run_state:"running",status:"running",non_occupying:!0,workflow:K[p]||null,can_pause:!1,can_resume:!1,started_at:_.started_at,last_event_at:typeof S.last_event_at=="number"?S.last_event_at:null,last_activity:S.last_activity&&typeof S.last_activity=="object"?S.last_activity:null,legs:Array.isArray(S.legs)?S.legs:[],runner:typeof S.runner=="string"?S.runner:null,model:typeof S.model=="string"?S.model:null,effort:typeof S.effort=="string"?S.effort:null,speed:typeof S.speed=="string"?S.speed:null,resumed_from:null,continuation_mode:null,usage:S.usage&&typeof S.usage=="object"?S.usage:null,exec_chips:{orchestration:ga(S),worker:null},discard:Vn(te,p,{merge_queued:!0}),badges:[_.origin==="auto"?"\uB9AC\uBDF0 \xB7 \uC790\uB3D9":"\uB9AC\uBDF0"],alert:!1})}for(let p of Array.isArray(v.session_active)?v.session_active:[]){let _=p&&p.bead_id;typeof _!="string"||de.has(_)||(de.add(_),Array.isArray(p.blocked_by)&&p.blocked_by.length>0&&ee.set(_,p.blocked_by.filter(S=>typeof S=="string"&&S.length>0)),typeof p.title=="string"&&p.title.length>0&&E.set(_,p.title),R.push({...Mt(_),title:p.title||pt[_]||_,lane:"running",kind:"session",status:"in_progress",started_at:Ca(p.started_at)??Ca(p.updated_at)??void 0,updated_at:Ca(p.updated_at)??void 0,workflow:p.workflow||null,labels:Array.isArray(p.labels)?p.labels:[],spec_id:typeof p.spec_id=="string"?p.spec_id:"",blocked:p.blocked===!0,...Array.isArray(p.blocked_by)?{blocked_by:p.blocked_by.filter(S=>typeof S=="string"&&S.length>0)}:{},draggable:!1,can_pause:!1,can_resume:!1,exec_chips:null,usage:null,legs:[],last_activity:null,session_refs:Array.isArray(p.session_refs)?p.session_refs:[],badges:[],alert:!1}))}for(let p of Array.isArray(v.pr_wait)?v.pr_wait:[]){let _=p&&p.bead_id;if(typeof _!="string"||de.has(_))continue;de.add(_);let S=ct(Lt[_]),Y=ct(S.pr),V=S.gate?ct(S.gate):null,ie=He.has(_),$e=Je.get(_)?.continuation_action||null,Xe=!!$e&&$e.continuation===null,it=Be.active===_,yt=p.external===!0,mt=L[_]||null,$=ct(Ie[_]),x=Lo({bead_id:_,merge_sha:p.merge_sha,cleanup_cursor:p.cleanup_cursor,merge_progress:$.merge_progress||null,cleanup_failed:mt,repo_operations:Ue}),Re=ni(x),g=!!V&&V.base_badge==="\uCDA9\uB3CC",h=!!mt&&["child_sweep","branch_cleanup","parent_close"].includes(mt.step)&&!!V&&V.tier==="merged",A=yt&&!!mt&&!!V&&V.tier==="merged",re=!!V&&["closed_unmerged","review","undecidable"].includes(V.tier),fe=Vn(te,_,{external:yt,merge_active:it||x?.step==="merge",merge_queued:ie,cleanup_active:Re,merged:!!mt||V?.tier==="merged"}),Te=!!fe.operation;j.push({...Mt(_),lane:"pr_wait",...Ft(_),workflow:K[_]||null,pr_number:typeof Y.number=="number"?Y.number:null,pr_url:typeof Y.url=="string"?Y.url:void 0,external:yt,usage:Gn(Ve,_),merge_step:x,badges:Xe?["\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694"]:x?[V?.tier==="merged"?"\uBA38\uC9C0\uB428":"\uBA38\uC9C0 \uC911"]:mt?[$r(mt.step)?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${$r(mt.step)}`:"\uC815\uB9AC \uBA48\uCDA4"]:typeof V?.gate_badge=="string"&&V.gate_badge.length>0?[V.gate_badge]:[],alert:x?x.failed===!0:!!mt||re,reason:mt&&x?.active!==!0?ti(mt.step):"PR \uB300\uAE30",merge_action:V?.tier==="merged"&&!h&&!A?!1:!ie||Xe,merge_enabled:!Te&&(Xe||V?.enabled===!0||g||h||A),merge_label:Xe?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":A||h?"\uC815\uB9AC \uC7AC\uAC1C":g&&!h?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":void 0,merge_title:Xe?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":Te?fe.error?`\uD3D0\uAE30 \uC2E4\uD328: ${fe.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${fe.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:A?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD569\uB2C8\uB2E4":h?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uC7AC\uAC1C\uD569\uB2C8\uB2E4":g?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":V?.enabled===!0?`\uBA38\uC9C0 (${V.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4`:`\uBA38\uC9C0 \uBD88\uAC00: ${V?.reason||"\uAD00\uCE21 \uB300\uAE30"}`,cancel_action:ie&&!Xe,cancel_enabled:!it,continuation_mismatch:$e?.mismatch||null,discard:fe,discard_action:fe.action,discard_enabled:fe.enabled,discard_title:fe.title})}let C=(p,_,S,Y)=>{let V=p&&p.bead_id;if(typeof V!="string"||de.has(V))return null;de.add(V);let ie=_t[V],$e=Vn(te,V),Xe=$e.operation?$e:null,it={...Mt(V),lane:_,workflow:K[V]||null,draggable:!Xe,discard:Xe||void 0,reason:Du($t,V),seq:S+1,queue_position:S+1,queue_index:S,queue_length:Y,badges:ie?["\u23F8 REVISE \uD30C\uD0B9"]:[],alert:!!ie,revise_action:!!ie,revise_enabled:!!ie&&!Xe,revise_title:ie?ie.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${ie.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":""},yt=Ft(V);return Object.hasOwn(yt,"blocked_by")&&(it.blocked_by=yt.blocked_by),it};for(let p=0;p<St.length;p++){let _=C(St[p],"queue",p,St.length);if(!_)continue;H.push(_);let S=q.get(z);S?S.push(_):q.set(z,[_])}let ne=p=>{let _=j.find(ie=>ie.id===p&&ie.root_dir===z);if(_)return{id:p,title:_.title,badge:"PR \uB300\uAE30 \xB7 \uC810\uC720"};let S=R.find(ie=>ie.id===p&&ie.root_dir===z),Y=S?S.run_state:Gm(Ve,p),V=Y==="failed"||Y==="orphaned"?"\uC2E4\uD328 \xB7 \uC810\uC720 \uC720\uC9C0":Y==="paused"?"\uC77C\uC2DC\uC815\uC9C0 \xB7 \uC810\uC720":"\uC2E4\uD589 \uC911 \xB7 \uC810\uC720";return{id:p,title:S?S.title:Mt(p).title,badge:V}},Le=[];for(let p=0;p<Math.max(Vt,It.length);p++){let _=`s${p+1}`,S=Jt.get(_),Y=S&&Array.isArray(S.entries)?S.entries:[],V=ct(Ut[_]),ie=Array.isArray(V.occupied_by)?V.occupied_by.filter(it=>typeof it=="string"):[],$e=new Set(ie),Xe=[];for(let it=0;it<Y.length;it++){let yt=Y[it]&&Y[it].bead_id;if(typeof yt=="string"&&$e.has(yt)){de.add(yt);continue}let mt=C(Y[it],_,it,Y.length);mt&&(Xe.push(mt),H.push(mt))}Xe.length===0&&ie.length===0&&(Vt<=1||p>=Vt)||Le.push({id:_,index:p,items:Xe,raw_length:Y.length,occupied_by:ie,occupants:ie.map(it=>ne(it)),corrections:Array.isArray(V.corrections)?V.corrections.length:0,cycle:V.cycle===!0,...Xe.length===0&&ie.length===0?{empty:!0}:{}})}O.set(z,Le);let y=Array.from({length:Vt},(p,_)=>{let S=`s${_+1}`,Y=Jt.get(S),V=Y&&Array.isArray(Y.entries)?Y.entries:[],ie=ct(Ut[S]);return{id:S,index:V.length,length:V.length,occupied_by:Array.isArray(ie.occupied_by)?ie.occupied_by.filter($e=>typeof $e=="string"):[]}});for(let p of Array.isArray(v.runnable)?v.runnable:[]){let _=p&&p.bead_id;if(typeof _!="string"||de.has(_))continue;de.add(_);let S=p.workflow&&typeof p.workflow=="object"?p.workflow:null,Y=S&&typeof S.route=="string"&&S.route||(typeof p.route=="string"?p.route:null),V=Jm(ct(Ce),p.exec_pins,Y),ie=Eo(p.rec,p.exec_pins);Array.isArray(p.blocked_by)&&p.blocked_by.length>0&&ee.set(_,p.blocked_by.filter(x=>typeof x=="string"&&x.length>0)),typeof p.title=="string"&&p.title.length>0&&E.set(_,p.title),Array.isArray(p.scope)&&xe.set(_,p.scope.filter(x=>typeof x=="string"&&x.length>0));let $e=p.eligible!==!1,Xe=p.worker_ineligible===!0,it=Object.hasOwn(p,"eligible"),yt=[];typeof p.reason=="string"&&p.reason.length>0&&yt.push(p.reason);let mt=Du($t,_);mt&&yt.push(mt);let $=eg(_,p.release_info,f)?.map(x=>({...x,...qu({id:_,root_dir:z},x.id)}));k.push({...Mt(_),title:p.title||pt[_]||_,lane:"runnable",draggable:!it,queue_placeable:$e&&!Xe,...Xe?{worker_ineligible:!0}:{},...p.session_preferred===!0?{session_preferred:!0,session_preferred_reason:typeof p.session_preferred_reason=="string"?p.session_preferred_reason:""}:{},...p.spec_after_blocker===!0?{spec_after_blocker:!0}:{},...$?{dependency_chips:{released:$}}:{},...p.dependents_info&&typeof p.dependents_info=="object"?{dependents_info:p.dependents_info}:{},reason:yt.join(" \xB7 "),created_at:p.created_at??void 0,updated_at:p.updated_at??void 0,status:typeof p.status=="string"?p.status:void 0,labels:Array.isArray(p.labels)?p.labels:[],spec_id:typeof p.spec_id=="string"?p.spec_id:"",published:p.published===!0,workflow:S||(Y?{route:Y,chips:{route:Y}}:null),...V?{exec_chips:V}:{},...ie?{rec:ie}:{},blocked:p.blocked===!0,...Array.isArray(p.blocked_by)?{blocked_by:p.blocked_by.filter(x=>typeof x=="string"&&x.length>0)}:{},place_index:St.length,place_lanes:y})}for(let p of Dt){let _=p&&p.bead_id;if(typeof _!="string"||de.has(_)||(de.add(_),s!==void 0&&typeof p.added_at=="number"&&p.added_at<s))continue;let S=Km(Ve,_),Y=S&&typeof S.done_kind=="string"?S.done_kind:null;oe.push({...Mt(_),lane:"done",done:!0,done_layout:"three_line",usage:Gn(Ve,_),work_ms:yu(Ve,_),done_at:typeof p.added_at=="number"?p.added_at:void 0,done_kind:Y,...Gt(_),badges:[...Y&&Lu[Y]?[Lu[Y]]:[],...hu(Ve,_)]})}for(let p of Array.isArray(v.session_done)?v.session_done:[]){let _=p&&(p.id||p.bead_id);typeof _!="string"||de.has(_)||(de.add(_),oe.push({...Mt(_),...p,id:_,root_dir:z,workspace_name:Ee,expected_revision:je,lane:"done",done:!0}))}}if(Z.size>0)for(let v of[...k,...H,...R,...j,...oe]){let z=Z.get(`${v.root_dir}\0${v.id}`);if(!z||(typeof z.priority=="number"&&(v.priority=z.priority),typeof z.from_id=="string"&&z.from_id.length>0&&(v.from_id=z.from_id),!Object.hasOwn(z,"metadata")))continue;let Ee=ct(z.metadata);if(v.rec=Eo(Ee),v.lane==="runnable"||v.lane.startsWith("s")||v.lane==="queue"){let Ce=rg(ct(b.get(v.root_dir)),Ee,typeof z.route=="string"&&z.route.length>0?z.route:ct(v.workflow).route);Ce&&(v.exec_chips=Ce)}}let J=new Map;o.forEach((v,z)=>{v&&typeof v.root_dir=="string"&&J.set(v.root_dir,z)});let Ae=n&&n.running_sort==="repo"?"repo":"started";R.sort((v,z)=>{let Ee=v.kind==="session",Ce=z.kind==="session";if(Ee!==Ce)return Ee?1:-1;if(Ee&&Ce){let pt=ri(z.updated_at)-ri(v.updated_at);return pt!==0?pt:v.id.localeCompare(z.id)}if(Ae==="repo"){let pt=J.get(v.root_dir)??Number.MAX_SAFE_INTEGER,kt=J.get(z.root_dir)??Number.MAX_SAFE_INTEGER;if(pt!==kt)return pt-kt}let je=typeof v.started_at=="number"&&Number.isFinite(v.started_at)?v.started_at:null,Ve=typeof z.started_at=="number"&&Number.isFinite(z.started_at)?z.started_at:null;return je!==null&&Ve!==null&&je!==Ve?je-Ve:je===null&&Ve!==null?1:je!==null&&Ve===null?-1:v.id.localeCompare(z.id)}),oe.sort((v,z)=>(z.done_at??0)-(v.done_at??0));let _e=o.length>0?o:r.map(v=>({root_dir:v&&v.root_dir,name:v&&v.name,auto_advance:v&&v.auto_advance,auto_merge:v&&v.auto_merge,slots:v&&v.slots,revision:v&&v.revision,runner_catalog:v&&v.runner_catalog})),ke=new Set(k.map(v=>v.root_dir)),me=new Map;for(let v of R)v.kind==="session"||v.run_state!=="running"||me.set(v.root_dir,(me.get(v.root_dir)||0)+1);let De=new Map;for(let v of oe){let z=De.get(v.root_dir);z?z.push(v):De.set(v.root_dir,[v])}let ot={positions:new Map,resolutions:new Map,continuations:new Map,authorities:new Map,state:{active:null,failures:{},waiting:null},auto_excluded:[],running:!1},Ye=[];for(let v of _e){if(!v||typeof v.root_dir!="string")continue;let z=q.get(v.root_dir)||[],Ee=O.get(v.root_dir)||[],Ce=z.length>0||Ee.some(pt=>pt.items.length>0||pt.occupied_by.length>0);if(u!=="all"&&!Ce&&!ke.has(v.root_dir))continue;let je=typeof v.slots=="number"&&v.slots>=oi?v.slots:oi,Ve=me.get(v.root_dir)||0;Ye.push({live_count:Ve,over_cap:Ve>je,merge:B.get(v.root_dir)||ot,token_total:sg(De.get(v.root_dir)||[]),cleanup_failures:ae.get(v.root_dir)||[],declared_base:N.get(v.root_dir)??null,repo_operations:W.get(v.root_dir)||[],root_dir:v.root_dir,name:v.name||v.root_dir,auto_advance:v.auto_advance===!0,auto_merge:v.auto_merge===!0,slots:je,revision:typeof v.revision=="number"?v.revision:0,runner_catalog:ct(v.runner_catalog),items:z,sublanes:{parallel:z,serial:Ee},serial_lane_count:I.get(v.root_dir)||0,raw_queue_length:F.get(v.root_dir)||0})}let M={runnable:k,runnable_all:k,runnable_hidden:{blocked:0,spec:0},runnable_sections:[],runnable_flat:a==="updated_flat"||a==="as_given",queue:H,queue_groups:Ye,running:R,pr_wait:j,done:oe,parallel_rows:[],chain_lanes:[],cross_lanes_revision:l&&typeof l.revision=="number"?l.revision:null,cross_lanes_unreadable:l===null,parallel_raw_length:Object.fromEntries(F),owner_of:{}},se=uu(M);for(let v of X)se.has(v.id)||se.set(v.id,{root_dir:v.root_dir,workspace_name:v.workspace_name,lane:"done",state:"done"});for(let v of[...M.queue,...M.runnable,...M.running,...M.pr_wait]){if(!Object.hasOwn(v,"blocked_by"))continue;let z=se.get(v.id);v.blockers=(v.blocked_by||[]).map(Ee=>du(Ee,z,se,o))}for(let v of[...M.queue,...M.runnable,...M.running,...M.pr_wait]){let z=(v.blockers||[]).map(je=>({...Ta(v.id,je),...qu(v,je.id,se)})),Ee=Ru(v.id,fg(Se.get(v.id),v.dependents_info,v,se));if(z.length===0&&Ee.length===0)continue;let Ce={...v.dependency_chips||{},...z.length>0?{predecessors:z}:{},...Ee.length>0?{dependents:Ee}:{}};v.dependency_chips=Ce}pg(M,we,xe,se,o);let le=pu(M.queue_groups);for(let v of M.queue_groups)for(let z of v.sublanes.serial){let Ee=le.get(fu(v.root_dir,z.id));Ee&&(z.cross_wait_peers=Ee)}M.chain_lanes=ug(l&&Array.isArray(l.lanes)?l.lanes:[],ee,se,o,E,m,{armed_by_bead:ge,failed_by_bead:ue,disarmed_lanes:P});let pe=new Map;for(let v of[...M.queue,...M.runnable])pe.has(v.id)||pe.set(v.id,v);let he=new Set;for(let v of M.chain_lanes)for(let z of v.rows){if(v.status==="confirmed"&&!z.unplaced&&!z.fixed&&he.add(z.id),!v.draft&&!z.unplaced)continue;let Ee=pe.get(z.id);Ee&&(Ee.cross_lane_chip={lane_id:v.lane_id,number:v.number,status:v.status,label:v.draft?`\uC5F0\uACB0 ${v.number} (draft)`:`\uC5F0\uACB0 ${v.number}`})}let ce=new Map(M.chain_lanes.map(v=>[v.lane_id,v.number]));for(let v of[...M.queue,...M.running]){let z=ge.get(v.id);if(typeof z!="string"||z.length===0)continue;let Ee=ce.get(z);v.armed_lane_chip=Ee===void 0?{lane_id:z,label:"\u25B6 \uC9C4\uD589 \uC911 \xB7 \uB808\uC778 \uC5C6\uC74C",orphan:!0}:{lane_id:z,label:`\u25B6 \uC5F0\uACB0 ${Ee}`,orphan:!1}}let Fe=[];for(let v of q.values())for(let z of v)he.has(z.id)||Fe.push(z);Fe.sort((v,z)=>{let Ee=v.workspace_name.localeCompare(z.workspace_name);return Ee!==0?Ee:(v.queue_index??0)-(z.queue_index??0)}),M.parallel_rows=Fe;let Ge={};for(let[v,z]of se)typeof z.root_dir=="string"&&z.root_dir.length>0&&(Ge[v]=z.root_dir);for(let v of M.chain_lanes)for(let z of v.rows)!Object.hasOwn(Ge,z.id)&&z.root_dir.length>0&&m.has(z.root_dir)&&(Ge[z.id]=z.root_dir);M.owner_of=Ge;let Ze=M.runnable.length;M.runnable_all=M.runnable.slice();let Pe=M.runnable,Q=v=>i.show_blocked||v.blocked!==!0,U=v=>i.spec==="all"||(i.spec==="with"?v.published===!0:v.published!==!0);if(d==="per_control"){let v=[],z=0,Ee=0;for(let Ce of Pe){let je=Q(Ce),Ve=U(Ce);je&&Ve?v.push(Ce):!je&&Ve?z+=1:je&&!Ve&&(Ee+=1)}Pe=v,M.runnable_hidden={blocked:z,spec:Ee}}else{Pe=Pe.filter(Q);let v=Pe.length;Pe=Pe.filter(U),M.runnable_hidden={blocked:Ze-v,spec:v-Pe.length}}let Ne=(v,z)=>{let Ee=ri(z.updated_at)-ri(v.updated_at);return Ee!==0?Ee:v.id.localeCompare(z.id)},et=a==="repo_spec"?(v,z)=>{let Ee=v.published===!0?0:1,Ce=z.published===!0?0:1;return Ee!==Ce?Ee-Ce:Ne(v,z)}:Ne;if(a==="as_given")M.runnable=Pe,M.runnable_sections=[];else if(a==="updated_flat")M.runnable=Pe.slice().sort(Ne),M.runnable_sections=[];else{let v=new Map;for(let Ce of Pe){let je=v.get(Ce.root_dir);je?je.push(Ce):v.set(Ce.root_dir,[Ce])}let z=[],Ee=[];for(let Ce of _e){if(!Ce||typeof Ce.root_dir!="string")continue;let je=(v.get(Ce.root_dir)||[]).slice().sort(et);v.delete(Ce.root_dir),je.length!==0&&(z.push({root_dir:Ce.root_dir,name:Ce.name||Ce.root_dir,items:je.map(Ve=>({...Ve,workspace_name:""}))}),Ee.push(...je))}for(let[Ce,je]of v){let Ve=je.slice().sort(et);z.push({root_dir:Ce,name:Ve[0]?.workspace_name||Ce,items:Ve.map(pt=>({...pt,workspace_name:""}))}),Ee.push(...Ve)}M.runnable=Ee,M.runnable_sections=z}return M}function Bu(e,t){let n=new Map(e.map((a,u)=>[a,u])),r=new Map(e.map(a=>[a,new Set]));for(let a of t)a.blocker!==a.blockee&&n.has(a.blocker)&&n.has(a.blockee)&&r.get(a.blockee).add(a.blocker);let o=new Set,s=[];for(;s.length<e.length;){let a=e.find(u=>{if(o.has(u))return!1;for(let d of r.get(u))if(!o.has(d))return!1;return!0});if(a===void 0)return{order:[...e],corrections:[],cycle:!0};o.add(a),s.push(a)}let i=[],l=new Map(s.map((a,u)=>[a,u]));for(let a of s){let u=null;for(let d of r.get(a)){let f=Number(n.get(a))<Number(n.get(d)),b=Number(l.get(a))>Number(l.get(d));f&&b&&(u===null||Number(l.get(d))>Number(l.get(u)))&&(u=d)}u!==null&&i.push({bead_id:a,after:u})}return{order:s,corrections:i,cycle:!1}}var _g="\uB2E4\uB978 \uB808\uD3EC \uC774\uC288\uB294 \uC774 \uC9C1\uB82C \uB808\uC778\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",ii="\uC758\uC874 \uC790\uB8CC \uBBF8\uD655\uC815 \u2014 \uAD50\uC815 \uBCF4\uB958",mg="Worker \uD0ED \uC9C1\uB82C \uB808\uC778\uC5D0\uC11C \uBA3C\uC800 \uBE7C \uC8FC\uC138\uC694",gg="\uC774\uBBF8 \uC9C4\uD589 \uC911\uC778 \uC774\uC288 \uC55E\uC5D0\uB294 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",no="\uC5F0\uACB0 \uB808\uC778\uC774 \uC5C6\uC2B5\uB2C8\uB2E4";function Mo(e,t){return`${e}\0${t}`}function hg(e,t){let n=new Set(e),r=new Map;for(let o of e){let s=t.placed_members.has(o)?t.snapshot_blocked_by:t.runnable_blocked_by,i=s instanceof Map?s.get(o):void 0;if(!Array.isArray(i))return null;r.set(o,i.filter(l=>l!==o&&n.has(l)))}return r}function bg(e,t){if(e.status!=="confirmed")return 0;let n=-1;return e.entries.forEach((r,o)=>{t.fixed_members.has(r.bead_id)&&(n=o)}),n+1}function No(e,t){let n=e.entries,r=n.map(f=>f.bead_id),o=hg(r,t);if(o===null)return{entries:n,corrections:[],cycle:!1,held:!0,mismatched:[]};let s=[];for(let[f,b]of o)for(let m of b)s.push({blocker:m,blockee:f});let i=bg(e,t),l=new Map(r.map((f,b)=>[f,b])),a=r.slice(0,i).filter(f=>o.get(f).some(b=>Number(l.get(b))>Number(l.get(f)))),u=Bu(r.slice(i),s);if(u.cycle)return{entries:n,corrections:[],cycle:!0,held:!1,mismatched:a};let d=new Map(n.map(f=>[f.bead_id,f]));return{entries:[...n.slice(0,i),...u.order.map(f=>d.get(f))],corrections:u.corrections,cycle:!1,held:!1,mismatched:a}}function Uu(e,t){let n=t.cross_lanes.get(e);return n===void 0?null:No(n,t)}function yg(e,t){if(!(t.corrections.length===0&&!t.cycle&&!t.held&&t.mismatched.length===0))return{lane_id:e,corrected:t.corrections.length,cycle:t.cycle,held:t.held,mismatched:t.mismatched}}function vg(e){return`${e}\uC758 \uB808\uD3EC\uB97C \uC54C \uC218 \uC5C6\uC5B4 \uC758\uC874\uC744 \uBC14\uAFC0 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4`}function wg(e){let t=new Map;for(let[n,r]of e)t.set(n,r.slice());return t}function Ma(e,t,n){let r=new Set([t]),o=[t];for(;o.length>0;){let s=o.pop();for(let i of e.get(s)||[]){if(i===n)return!0;r.has(i)||(r.add(i),o.push(i))}}return!1}function kg(e,t){let n=new Set;for(let[i,l]of t)for(let a of l)n.add(Mo(i,a));let r=new Map,o=new Map;for(let i of e){let l=Mo(i.a,i.b);r.set(l,i),o.set(l,i.type==="dep-add")}let s=[];for(let i of e){let l=Mo(i.a,i.b);r.get(l)===i&&o.get(l)!==n.has(l)&&s.push(i)}return s}function $g(e,t,n){let r=e.parallel_rows,o=Math.max(0,Math.min(r.length,n)),s=r[o];if(s&&s.root_dir===t)return s.queue_index;for(let i=o-1;i>=0;i--)if(r[i].root_dir===t)return r[i].queue_index+1;for(let i=o;i<r.length;i++)if(r[i].root_dir===t)return r[i].queue_index;return e.parallel_raw_length.get(t)??0}function xg(e,t){return e.parallel_rows.some(n=>n.root_dir===t)}function si(e,t,n,r){return{type:"worker-queue-place",payload:{bead_id:e,...r?{lane:r}:{},index:n},root_dir:t}}function Da(e,t){let n=0;for(let r of e.cross_lanes.keys())if(n+=1,r===t)return n;return n+1}function qo(e){let t=wg(e.blocked_by_map),n=[],r=new Set,o={refusal:null},s=u=>{let d=e.owner_of.get(u);return typeof d!="string"||d.length===0?(o.refusal=vg(u),null):d};return{graph:t,dep_ops:n,state:o,ownerOf:s,addDep:(u,d,f)=>{if(o.refusal!==null||u===d)return;let b=t.get(u)||[];if(b.includes(d))return;let m=s(u);if(m!==null){if(Ma(t,d,u)){o.refusal=`\uC758\uC874 \uC0AC\uC774\uD074\uC774 \uC0DD\uAE41\uB2C8\uB2E4 \u2014 ${u}\uAC00 \uC774\uBBF8 ${d}\uB97C \uB9C9\uACE0 \uC788\uC2B5\uB2C8\uB2E4`;return}t.set(u,[...b,d]),f!==void 0&&r.add(Mo(u,d)),n.push({type:"dep-add",a:u,b:d,root_dir:m,...f===void 0?{}:{lane_id:f}})}},removeDep:(u,d)=>{if(o.refusal!==null||u===d)return;let f=t.get(u)||[];if(!f.includes(d))return;let b=s(u);b!==null&&(t.set(u,f.filter(m=>m!==d)),n.push({type:"dep-remove",a:u,b:d,root_dir:b}))},laneCreated:(u,d)=>r.has(Mo(u,d))}}function Fo(e,t,n,r,o={}){if(e.state.refusal!==null)return{refused:e.state.refusal};let s=kg(e.dep_ops,t.blocked_by_map),i=s.filter(d=>d.type==="dep-remove"),l=s.filter(d=>d.type==="dep-add"),a=o.disarm_ops??[],u=o.lane_id===void 0||o.correction===void 0?void 0:yg(o.lane_id,o.correction);return{lane_ops:n,ops:[...i,...a,...l,...r],lane_op_index:i.length+a.length,...u===void 0?{}:{correction:u}}}function Wu(e,t,n){for(let r=1;r<t.length;r+=1)e.addDep(t[r].bead_id,t[r-1].bead_id,n)}function Do(e,t){return t>0&&e.entries[t]?.dep_created_by_lane===!0}function zu(e,t,n,r){if(t.status!=="confirmed")return[];let o=[],s=new Map;for(let i of r){let l=e.owner_of.get(i.bead_id)||i.root_dir;typeof l!="string"||l.length===0||s.set(l,[...s.get(l)||[],i.bead_id])}for(let[i,l]of s)o.push({type:"worker-queue-disarm",payload:{bead_ids:l,lane_id:n},root_dir:i});return o}function Hu(e,t,n,r){let o=new Map;for(let s of n){if(t.placed_members.has(s.bead_id))continue;let i=e.ownerOf(s.bead_id);if(i===null)return;let l=o.get(i)??0;r.push(si(s.bead_id,i,(t.parallel_raw_length.get(i)??0)+l)),o.set(i,l+1)}}function Po(e){return e.map(t=>({bead_id:t.bead_id,root_dir:t.root_dir}))}function ai(e,t){return e.length===t.length&&e.every((n,r)=>n.bead_id===t[r].bead_id&&n.root_dir===t[r].root_dir)}function li(e,t,n){let r=qo(n),o=[],s=[],i=[],l,a=n.owner_lane_of.get(e.bead_id),u=e.kind==="chain"?e.lane_id??a:void 0,d=u===void 0?void 0:n.cross_lanes.get(u);if(t.kind==="repo-serial"&&e.root_dir!==t.root_dir)return{refused:_g};if(t.kind==="chain"){if(e.kind==="repo-serial")return{refused:mg};if(e.kind!=="chain"&&typeof a=="string"&&a!==t.lane_id&&n.cross_lanes.has(a))return{refused:`\uC774\uBBF8 \uC5F0\uACB0 ${Da(n,a)}\uC5D0 \uC788\uC2B5\uB2C8\uB2E4`};if(!n.cross_lanes.has(t.lane_id))return{refused:no}}if(e.kind==="chain"&&d===void 0)return{refused:no};let f=()=>{if(d===void 0||d.status!=="confirmed")return;let k=d.entries.findIndex(X=>X.bead_id===e.bead_id);if(k<0)return;let R=k>0?d.entries[k-1]:null,j=k+1<d.entries.length?d.entries[k+1]:null,H=Do(d,k),oe=j!==null&&Do(d,k+1);H&&R!==null&&r.removeDep(e.bead_id,R.bead_id),oe&&j!==null&&r.removeDep(j.bead_id,e.bead_id),(H||oe)&&R!==null&&j!==null&&r.addDep(j.bead_id,R.bead_id,u)},b=(k,R)=>{let j=n.cross_lanes.get(k),H=j.entries.findIndex(N=>N.bead_id===e.bead_id),oe=j.entries.filter(N=>N.bead_id!==e.bead_id),X=Math.max(0,Math.min(oe.length,H>=0&&R>H?R-1:R)),q=-1;if(oe.forEach((N,W)=>{n.fixed_members.has(N.bead_id)&&(q=W)}),X<=q){r.state.refusal=gg;return}let O=H>=0?j.entries[H]:d?.entries.find(N=>N.bead_id===e.bead_id)??{bead_id:e.bead_id,root_dir:e.root_dir};l=No({status:j.status,entries:[...oe.slice(0,X),O,...oe.slice(X)]},n);let I=l.entries;if(ai(I,j.entries)||o.push({type:"monitor-lane-update",payload:{lane_id:k,entries:Po(I)}}),j.status!=="confirmed")return;let F=I.findIndex(N=>N.bead_id===e.bead_id),B=F>0?I[F-1].bead_id:null,ae=F+1<I.length?I[F+1].bead_id:null;if(B===null){ae!==null&&r.addDep(ae,e.bead_id,k);return}if(r.addDep(e.bead_id,B,k),ae!==null&&(r.graph.get(ae)||[]).includes(B)){let N=j.entries.findIndex(W=>W.bead_id===ae);(r.laneCreated(ae,B)||N>0&&j.entries[N-1].bead_id===B&&Do(j,N))&&r.removeDep(ae,B),r.addDep(ae,e.bead_id,k)}},m=typeof e.queue_index=="number"?e.queue_index:n.queue_index_of.get(e.bead_id);if(e.kind==="chain"&&(f(),d!==void 0&&(t.kind!=="chain"||t.lane_id!==u)&&(i.push(...zu(n,d,u,d.entries.filter(k=>k.bead_id===e.bead_id))),o.push({type:"monitor-lane-update",payload:{lane_id:u,entries:Po(d.entries.filter(k=>k.bead_id!==e.bead_id))}}))),t.kind==="chain"&&b(t.lane_id,t.marker_index),r.state.refusal!==null)return{refused:r.state.refusal};if(t.kind==="candidate")e.kind!=="candidate"&&s.push({type:"worker-queue-remove",payload:{bead_id:e.bead_id},root_dir:e.root_dir});else if(t.kind==="parallel"){let k=$g(n,e.root_dir,t.marker_index);if(e.kind==="candidate"||e.kind==="repo-serial")s.push(si(e.bead_id,e.root_dir,k));else if(e.kind==="parallel"){let R=n.parallel_rows,j=R[Math.max(0,Math.min(R.length,t.marker_index))];if(!(!!j&&j.bead_id===e.bead_id)&&xg(n,e.root_dir)&&m!==void 0){let oe=m>k?k:k-1;oe>=0&&oe!==m&&s.push({type:"worker-queue-reorder",payload:{bead_id:e.bead_id,to_index:oe},root_dir:e.root_dir})}}}else if(t.kind==="chain"){let k=n.cross_lanes.get(t.lane_id);e.kind==="candidate"&&k.status==="confirmed"&&s.push(si(e.bead_id,e.root_dir,n.parallel_raw_length.get(e.root_dir)??0))}else if(e.kind==="repo-serial"&&e.lane_id===t.lane_id){if(m!==void 0&&t.index!==m){let k=m>t.index?t.index:t.index-1;k>=0&&k!==m&&s.push({type:"worker-queue-reorder",payload:{bead_id:e.bead_id,lane:t.lane_id,to_index:k},root_dir:e.root_dir})}}else s.push(si(e.bead_id,e.root_dir,t.index,t.lane_id));return Fo(r,n,o,s,{disarm_ops:i,...t.kind==="chain"?{lane_id:t.lane_id,correction:l}:{}})}function Gu(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:no};if(n.entries.length<2)return{refused:"\uD655\uC815\uD558\uB824\uBA74 \uBA64\uBC84\uAC00 2\uAC1C \uC774\uC0C1\uC774\uC5B4\uC57C \uD569\uB2C8\uB2E4"};let r=No(n,t);if(r.held)return{refused:ii};let o=r.entries,s=qo(t),i=[];Wu(s,o,e),s.state.refusal===null&&Hu(s,t,o,i);let l=ai(o,n.entries)?[]:[{type:"monitor-lane-update",payload:{lane_id:e,entries:Po(o)}}];return l.push({type:"monitor-lane-confirm",payload:{lane_id:e}}),Fo(s,t,l,i,{lane_id:e,correction:r})}function Ku(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:no};let r=No(n,t),o=r.entries,s=qo(t),i=[];Wu(s,o,e),s.state.refusal===null&&Hu(s,t,o,i);let l=ai(o,n.entries)?[]:[{type:"monitor-lane-update",payload:{lane_id:e,entries:Po(o)}}];return Fo(s,t,l,i,{lane_id:e,correction:r})}function Yu(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:no};let r=No(n,t),o=r.entries;return Fo(qo(t),t,ai(o,n.entries)?[]:[{type:"monitor-lane-update",payload:{lane_id:e,entries:Po(o)}}],[],{lane_id:e,correction:r})}function Vu(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:no};let r=qo(t);if(n.status==="confirmed")for(let o=1;o<n.entries.length;o+=1)Do(n,o)&&r.removeDep(n.entries[o].bead_id,n.entries[o-1].bead_id);return Fo(r,t,[{type:"monitor-lane-remove",payload:{lane_id:e}}],[],{disarm_ops:zu(t,n,e,n.entries)})}function Xu(e,t){let n=t.cross_lanes.get(e);if(n===void 0||n.status!=="confirmed")return null;let r=[],o=[];for(let i=1;i<n.entries.length;i+=1){let l=`  ${n.entries[i].bead_id} \u2190 ${n.entries[i-1].bead_id}`;Do(n,i)?r.push(l):o.push(`${l} (\uB808\uC778\uC774 \uB9CC\uB4E4\uC9C0 \uC54A\uC74C)`)}let s=`\uC5F0\uACB0 ${Da(t,e)}\uC744 \uC9C0\uC6C1\uB2C8\uB2E4.`;return r.length===0?`${s}
\uC758\uC874\uC740 \uADF8\uB300\uB85C \uB461\uB2C8\uB2E4`:[s,"\uD568\uAED8 \uC81C\uAC70\uD560 \uC758\uC874:",...r,...o.length===0?[]:["\uADF8\uB300\uB85C \uB450\uB294 \uC758\uC874:",...o]].join(`
`)}function Qu(e){let t=new Map;for(let n of e)n.type!=="dep-add"||typeof n.lane_id!="string"||t.set(n.lane_id,[...t.get(n.lane_id)||[],{bead_id:n.a,after:n.b}]);return[...t].map(([n,r])=>({lane_id:n,pairs:r}))}function Zu(e,t){let n=new Map(e.map((r,o)=>[r.bead_id,o]));return t.filter(r=>{let o=n.get(r.bead_id);return o!==void 0&&o>0&&e[o-1].bead_id===r.after})}function Pa(e,t){if(e!==null){let n=t.owner_lane_of.get(e.bead_id);if(typeof n=="string"&&t.cross_lanes.has(n))return{refused:`\uC774\uBBF8 \uC5F0\uACB0 ${Da(t,n)}\uC5D0 \uC788\uC2B5\uB2C8\uB2E4`}}return{lane_ops:[{type:"monitor-lane-create",payload:{entries:e===null?[]:[e]}}],ops:[],lane_op_index:0}}var Ag="\uC0AC\uC774\uD074";function Sg(e){let t=new Map,n=r=>Array.isArray(r)?r.filter(o=>typeof o=="string"&&o.length>0):[];for(let r of Array.isArray(e)?e:[]){if(!r||typeof r!="object")continue;let o=r.bead_blocked_by&&typeof r.bead_blocked_by=="object"?r.bead_blocked_by:{};for(let[s,i]of Object.entries(o))Array.isArray(i)&&t.set(s,n(i));for(let s of[...Array.isArray(r.runnable)?r.runnable:[],...Array.isArray(r.session_active)?r.session_active:[]])s&&typeof s.bead_id=="string"&&Array.isArray(s.blocked_by)&&s.blocked_by.length>0&&t.set(s.bead_id,n(s.blocked_by))}return t}function Na(e,t,n){let r=ar(e,t),o=[],s=new Set,i=(a,u)=>{for(let d of a)s.has(d.id)||(s.add(d.id),o.push({bead_id:d.id,root_dir:d.root_dir,workspace_name:d.workspace_name,title:d.title,lane:u}))};i(r.running,"running"),i(r.pr_wait,"pr_wait"),i(r.queue,"queue"),i(r.runnable_all,"runnable");let l=n&&typeof n.root_dir=="string"&&n.root_dir.length?n.root_dir:null;return{issues:l===null?o:o.filter(a=>a.root_dir===l),blocked_by_map:Sg(e)}}function Ju(e,t){let n=new Map;for(let i of t.issues)!i||typeof i.bead_id!="string"||i.bead_id.length===0||n.has(i.bead_id)||n.set(i.bead_id,i);let r=n.get(e)?.root_dir,o=t.blocked_by_map.get(e)||[],s=[];for(let i of n.values()){if(i.bead_id===e||i.lane==="done"||o.includes(i.bead_id))continue;let l=Ma(t.blocked_by_map,i.bead_id,e);s.push({...i,disabled:l,...l?{reason:Ag}:{}})}return s.sort((i,l)=>{let a=r!==void 0&&i.root_dir===r,u=r!==void 0&&l.root_dir===r;return a!==u?a?-1:1:i.bead_id.localeCompare(l.bead_id)}),s}function ed(e,t){let n=t.trim().toLowerCase();return n.length===0?e.slice():e.filter(r=>r.bead_id.toLowerCase().includes(n)||r.title.toLowerCase().includes(n))}var{entries:cd,setPrototypeOf:td,isFrozen:Eg,getPrototypeOf:Tg,getOwnPropertyDescriptor:Cg}=Object,{freeze:sn,seal:vn,create:za}=Object,{apply:Ha,construct:Ga}=typeof Reflect<"u"&&Reflect;sn||(sn=function(t){return t});vn||(vn=function(t){return t});Ha||(Ha=function(t,n){for(var r=arguments.length,o=new Array(r>2?r-2:0),s=2;s<r;s++)o[s-2]=arguments[s];return t.apply(n,o)});Ga||(Ga=function(t){for(var n=arguments.length,r=new Array(n>1?n-1:0),o=1;o<n;o++)r[o-1]=arguments[o];return new t(...r)});var ci=an(Array.prototype.forEach),Rg=an(Array.prototype.lastIndexOf),nd=an(Array.prototype.pop),jo=an(Array.prototype.push),Og=an(Array.prototype.splice),di=an(String.prototype.toLowerCase),qa=an(String.prototype.toString),Fa=an(String.prototype.match),Bo=an(String.prototype.replace),Lg=an(String.prototype.indexOf),Ig=an(String.prototype.trim),Sn=an(Object.prototype.hasOwnProperty),on=an(RegExp.prototype.test),Uo=Mg(TypeError);function an(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var n=arguments.length,r=new Array(n>1?n-1:0),o=1;o<n;o++)r[o-1]=arguments[o];return Ha(e,t,r)}}function Mg(e){return function(){for(var t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];return Ga(e,n)}}function ft(e,t){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:di;td&&td(e,null);let r=t.length;for(;r--;){let o=t[r];if(typeof o=="string"){let s=n(o);s!==o&&(Eg(t)||(t[r]=s),o=s)}e[o]=!0}return e}function Dg(e){for(let t=0;t<e.length;t++)Sn(e,t)||(e[t]=null);return e}function Xn(e){let t=za(null);for(let[n,r]of cd(e))Sn(e,n)&&(Array.isArray(r)?t[n]=Dg(r):r&&typeof r=="object"&&r.constructor===Object?t[n]=Xn(r):t[n]=r);return t}function Wo(e,t){for(;e!==null;){let r=Cg(e,t);if(r){if(r.get)return an(r.get);if(typeof r.value=="function")return an(r.value)}e=Tg(e)}function n(){return null}return n}var rd=sn(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),ja=sn(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),Ba=sn(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),Pg=sn(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),Ua=sn(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),Ng=sn(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),od=sn(["#text"]),sd=sn(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),Wa=sn(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),id=sn(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),ui=sn(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),qg=vn(/\{\{[\w\W]*|[\w\W]*\}\}/gm),Fg=vn(/<%[\w\W]*|[\w\W]*%>/gm),jg=vn(/\$\{[\w\W]*/gm),Bg=vn(/^data-[\-\w.\u00B7-\uFFFF]+$/),Ug=vn(/^aria-[\-\w]+$/),ud=vn(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),Wg=vn(/^(?:\w+script|data):/i),zg=vn(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),dd=vn(/^html$/i),Hg=vn(/^[a-z][.\w]*(-[.\w]+)+$/i),ad=Object.freeze({__proto__:null,ARIA_ATTR:Ug,ATTR_WHITESPACE:zg,CUSTOM_ELEMENT:Hg,DATA_ATTR:Bg,DOCTYPE_NAME:dd,ERB_EXPR:Fg,IS_ALLOWED_URI:ud,IS_SCRIPT_OR_DATA:Wg,MUSTACHE_EXPR:qg,TMPLIT_EXPR:jg}),zo={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,progressingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},Gg=function(){return typeof window>"u"?null:window},Kg=function(t,n){if(typeof t!="object"||typeof t.createPolicy!="function")return null;let r=null,o="data-tt-policy-suffix";n&&n.hasAttribute(o)&&(r=n.getAttribute(o));let s="dompurify"+(r?"#"+r:"");try{return t.createPolicy(s,{createHTML(i){return i},createScriptURL(i){return i}})}catch{return console.warn("TrustedTypes policy "+s+" could not be created."),null}},ld=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function pd(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:Gg(),t=de=>pd(de);if(t.version="3.3.0",t.removed=[],!e||!e.document||e.document.nodeType!==zo.document||!e.Element)return t.isSupported=!1,t;let{document:n}=e,r=n,o=r.currentScript,{DocumentFragment:s,HTMLTemplateElement:i,Node:l,Element:a,NodeFilter:u,NamedNodeMap:d=e.NamedNodeMap||e.MozNamedAttrMap,HTMLFormElement:f,DOMParser:b,trustedTypes:m}=e,k=a.prototype,R=Wo(k,"cloneNode"),j=Wo(k,"remove"),H=Wo(k,"nextSibling"),oe=Wo(k,"childNodes"),X=Wo(k,"parentNode");if(typeof i=="function"){let de=n.createElement("template");de.content&&de.content.ownerDocument&&(n=de.content.ownerDocument)}let q,O="",{implementation:I,createNodeIterator:F,createDocumentFragment:B,getElementsByTagName:ae}=n,{importNode:N}=r,W=ld();t.isSupported=typeof cd=="function"&&typeof X=="function"&&I&&I.createHTMLDocument!==void 0;let{MUSTACHE_EXPR:Z,ERB_EXPR:ee,TMPLIT_EXPR:Se,DATA_ATTR:ge,ARIA_ATTR:ue,IS_SCRIPT_OR_DATA:P,ATTR_WHITESPACE:we,CUSTOM_ELEMENT:xe}=ad,{IS_ALLOWED_URI:E}=ad,J=null,Ae=ft({},[...rd,...ja,...Ba,...Ua,...od]),_e=null,ke=ft({},[...sd,...Wa,...id,...ui]),me=Object.seal(za(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),De=null,ot=null,Ye=Object.seal(za(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}})),M=!0,se=!0,le=!1,pe=!0,he=!1,ce=!0,Fe=!1,Ge=!1,Ze=!1,Pe=!1,Q=!1,U=!1,Ne=!0,ut=!1,et="user-content-",v=!0,z=!1,Ee={},Ce=null,je=ft({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]),Ve=null,pt=ft({},["audio","video","img","source","image","track"]),kt=null,Lt=ft({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),$t="http://www.w3.org/1998/Math/MathML",_t="http://www.w3.org/2000/svg",Be="http://www.w3.org/1999/xhtml",L=Be,te=!1,ye=null,T=ft({},[$t,_t,Be],qa),K=ft({},["mi","mo","mn","ms","mtext"]),Ie=ft({},["annotation-xml"]),Ue=ft({},["title","style","font","a","script"]),qe=null,tt=["application/xhtml+xml","text/html"],Oe="text/html",He=null,Je=null,bt=n.createElement("form"),ze=function(C){return C instanceof RegExp||C instanceof Function},xt=function(){let C=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(Je&&Je===C)){if((!C||typeof C!="object")&&(C={}),C=Xn(C),qe=tt.indexOf(C.PARSER_MEDIA_TYPE)===-1?Oe:C.PARSER_MEDIA_TYPE,He=qe==="application/xhtml+xml"?qa:di,J=Sn(C,"ALLOWED_TAGS")?ft({},C.ALLOWED_TAGS,He):Ae,_e=Sn(C,"ALLOWED_ATTR")?ft({},C.ALLOWED_ATTR,He):ke,ye=Sn(C,"ALLOWED_NAMESPACES")?ft({},C.ALLOWED_NAMESPACES,qa):T,kt=Sn(C,"ADD_URI_SAFE_ATTR")?ft(Xn(Lt),C.ADD_URI_SAFE_ATTR,He):Lt,Ve=Sn(C,"ADD_DATA_URI_TAGS")?ft(Xn(pt),C.ADD_DATA_URI_TAGS,He):pt,Ce=Sn(C,"FORBID_CONTENTS")?ft({},C.FORBID_CONTENTS,He):je,De=Sn(C,"FORBID_TAGS")?ft({},C.FORBID_TAGS,He):Xn({}),ot=Sn(C,"FORBID_ATTR")?ft({},C.FORBID_ATTR,He):Xn({}),Ee=Sn(C,"USE_PROFILES")?C.USE_PROFILES:!1,M=C.ALLOW_ARIA_ATTR!==!1,se=C.ALLOW_DATA_ATTR!==!1,le=C.ALLOW_UNKNOWN_PROTOCOLS||!1,pe=C.ALLOW_SELF_CLOSE_IN_ATTR!==!1,he=C.SAFE_FOR_TEMPLATES||!1,ce=C.SAFE_FOR_XML!==!1,Fe=C.WHOLE_DOCUMENT||!1,Pe=C.RETURN_DOM||!1,Q=C.RETURN_DOM_FRAGMENT||!1,U=C.RETURN_TRUSTED_TYPE||!1,Ze=C.FORCE_BODY||!1,Ne=C.SANITIZE_DOM!==!1,ut=C.SANITIZE_NAMED_PROPS||!1,v=C.KEEP_CONTENT!==!1,z=C.IN_PLACE||!1,E=C.ALLOWED_URI_REGEXP||ud,L=C.NAMESPACE||Be,K=C.MATHML_TEXT_INTEGRATION_POINTS||K,Ie=C.HTML_INTEGRATION_POINTS||Ie,me=C.CUSTOM_ELEMENT_HANDLING||{},C.CUSTOM_ELEMENT_HANDLING&&ze(C.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(me.tagNameCheck=C.CUSTOM_ELEMENT_HANDLING.tagNameCheck),C.CUSTOM_ELEMENT_HANDLING&&ze(C.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(me.attributeNameCheck=C.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),C.CUSTOM_ELEMENT_HANDLING&&typeof C.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(me.allowCustomizedBuiltInElements=C.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),he&&(se=!1),Q&&(Pe=!0),Ee&&(J=ft({},od),_e=[],Ee.html===!0&&(ft(J,rd),ft(_e,sd)),Ee.svg===!0&&(ft(J,ja),ft(_e,Wa),ft(_e,ui)),Ee.svgFilters===!0&&(ft(J,Ba),ft(_e,Wa),ft(_e,ui)),Ee.mathMl===!0&&(ft(J,Ua),ft(_e,id),ft(_e,ui))),C.ADD_TAGS&&(typeof C.ADD_TAGS=="function"?Ye.tagCheck=C.ADD_TAGS:(J===Ae&&(J=Xn(J)),ft(J,C.ADD_TAGS,He))),C.ADD_ATTR&&(typeof C.ADD_ATTR=="function"?Ye.attributeCheck=C.ADD_ATTR:(_e===ke&&(_e=Xn(_e)),ft(_e,C.ADD_ATTR,He))),C.ADD_URI_SAFE_ATTR&&ft(kt,C.ADD_URI_SAFE_ATTR,He),C.FORBID_CONTENTS&&(Ce===je&&(Ce=Xn(Ce)),ft(Ce,C.FORBID_CONTENTS,He)),v&&(J["#text"]=!0),Fe&&ft(J,["html","head","body"]),J.table&&(ft(J,["tbody"]),delete De.tbody),C.TRUSTED_TYPES_POLICY){if(typeof C.TRUSTED_TYPES_POLICY.createHTML!="function")throw Uo('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof C.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw Uo('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');q=C.TRUSTED_TYPES_POLICY,O=q.createHTML("")}else q===void 0&&(q=Kg(m,o)),q!==null&&typeof O=="string"&&(O=q.createHTML(""));sn&&sn(C),Je=C}},qt=ft({},[...ja,...Ba,...Pg]),lt=ft({},[...Ua,...Ng]),Yt=function(C){let ne=X(C);(!ne||!ne.tagName)&&(ne={namespaceURI:L,tagName:"template"});let Le=di(C.tagName),y=di(ne.tagName);return ye[C.namespaceURI]?C.namespaceURI===_t?ne.namespaceURI===Be?Le==="svg":ne.namespaceURI===$t?Le==="svg"&&(y==="annotation-xml"||K[y]):!!qt[Le]:C.namespaceURI===$t?ne.namespaceURI===Be?Le==="math":ne.namespaceURI===_t?Le==="math"&&Ie[y]:!!lt[Le]:C.namespaceURI===Be?ne.namespaceURI===_t&&!Ie[y]||ne.namespaceURI===$t&&!K[y]?!1:!lt[Le]&&(Ue[Le]||!qt[Le]):!!(qe==="application/xhtml+xml"&&ye[C.namespaceURI]):!1},St=function(C){jo(t.removed,{element:C});try{X(C).removeChild(C)}catch{j(C)}},It=function(C,ne){try{jo(t.removed,{attribute:ne.getAttributeNode(C),from:ne})}catch{jo(t.removed,{attribute:null,from:ne})}if(ne.removeAttribute(C),C==="is")if(Pe||Q)try{St(ne)}catch{}else try{ne.setAttribute(C,"")}catch{}},Ut=function(C){let ne=null,Le=null;if(Ze)C="<remove></remove>"+C;else{let _=Fa(C,/^[\r\n\t ]+/);Le=_&&_[0]}qe==="application/xhtml+xml"&&L===Be&&(C='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+C+"</body></html>");let y=q?q.createHTML(C):C;if(L===Be)try{ne=new b().parseFromString(y,qe)}catch{}if(!ne||!ne.documentElement){ne=I.createDocument(L,"template",null);try{ne.documentElement.innerHTML=te?O:y}catch{}}let p=ne.body||ne.documentElement;return C&&Le&&p.insertBefore(n.createTextNode(Le),p.childNodes[0]||null),L===Be?ae.call(ne,Fe?"html":"body")[0]:Fe?ne.documentElement:p},Vt=function(C){return F.call(C.ownerDocument||C,C,u.SHOW_ELEMENT|u.SHOW_COMMENT|u.SHOW_TEXT|u.SHOW_PROCESSING_INSTRUCTION|u.SHOW_CDATA_SECTION,null)},Jt=function(C){return C instanceof f&&(typeof C.nodeName!="string"||typeof C.textContent!="string"||typeof C.removeChild!="function"||!(C.attributes instanceof d)||typeof C.removeAttribute!="function"||typeof C.setAttribute!="function"||typeof C.namespaceURI!="string"||typeof C.insertBefore!="function"||typeof C.hasChildNodes!="function")},Wt=function(C){return typeof l=="function"&&C instanceof l};function Dt(de,C,ne){ci(de,Le=>{Le.call(t,C,ne,Je)})}let cn=function(C){let ne=null;if(Dt(W.beforeSanitizeElements,C,null),Jt(C))return St(C),!0;let Le=He(C.nodeName);if(Dt(W.uponSanitizeElement,C,{tagName:Le,allowedTags:J}),ce&&C.hasChildNodes()&&!Wt(C.firstElementChild)&&on(/<[/\w!]/g,C.innerHTML)&&on(/<[/\w!]/g,C.textContent)||C.nodeType===zo.progressingInstruction||ce&&C.nodeType===zo.comment&&on(/<[/\w]/g,C.data))return St(C),!0;if(!(Ye.tagCheck instanceof Function&&Ye.tagCheck(Le))&&(!J[Le]||De[Le])){if(!De[Le]&&Gt(Le)&&(me.tagNameCheck instanceof RegExp&&on(me.tagNameCheck,Le)||me.tagNameCheck instanceof Function&&me.tagNameCheck(Le)))return!1;if(v&&!Ce[Le]){let y=X(C)||C.parentNode,p=oe(C)||C.childNodes;if(p&&y){let _=p.length;for(let S=_-1;S>=0;--S){let Y=R(p[S],!0);Y.__removalCount=(C.__removalCount||0)+1,y.insertBefore(Y,H(C))}}}return St(C),!0}return C instanceof a&&!Yt(C)||(Le==="noscript"||Le==="noembed"||Le==="noframes")&&on(/<\/no(script|embed|frames)/i,C.innerHTML)?(St(C),!0):(he&&C.nodeType===zo.text&&(ne=C.textContent,ci([Z,ee,Se],y=>{ne=Bo(ne,y," ")}),C.textContent!==ne&&(jo(t.removed,{element:C.cloneNode()}),C.textContent=ne)),Dt(W.afterSanitizeElements,C,null),!1)},Mt=function(C,ne,Le){if(Ne&&(ne==="id"||ne==="name")&&(Le in n||Le in bt))return!1;if(!(se&&!ot[ne]&&on(ge,ne))){if(!(M&&on(ue,ne))){if(!(Ye.attributeCheck instanceof Function&&Ye.attributeCheck(ne,C))){if(!_e[ne]||ot[ne]){if(!(Gt(C)&&(me.tagNameCheck instanceof RegExp&&on(me.tagNameCheck,C)||me.tagNameCheck instanceof Function&&me.tagNameCheck(C))&&(me.attributeNameCheck instanceof RegExp&&on(me.attributeNameCheck,ne)||me.attributeNameCheck instanceof Function&&me.attributeNameCheck(ne,C))||ne==="is"&&me.allowCustomizedBuiltInElements&&(me.tagNameCheck instanceof RegExp&&on(me.tagNameCheck,Le)||me.tagNameCheck instanceof Function&&me.tagNameCheck(Le))))return!1}else if(!kt[ne]){if(!on(E,Bo(Le,we,""))){if(!((ne==="src"||ne==="xlink:href"||ne==="href")&&C!=="script"&&Lg(Le,"data:")===0&&Ve[C])){if(!(le&&!on(P,Bo(Le,we,"")))){if(Le)return!1}}}}}}}return!0},Gt=function(C){return C!=="annotation-xml"&&Fa(C,xe)},Ft=function(C){Dt(W.beforeSanitizeAttributes,C,null);let{attributes:ne}=C;if(!ne||Jt(C))return;let Le={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:_e,forceKeepAttr:void 0},y=ne.length;for(;y--;){let p=ne[y],{name:_,namespaceURI:S,value:Y}=p,V=He(_),ie=Y,$e=_==="value"?ie:Ig(ie);if(Le.attrName=V,Le.attrValue=$e,Le.keepAttr=!0,Le.forceKeepAttr=void 0,Dt(W.uponSanitizeAttribute,C,Le),$e=Le.attrValue,ut&&(V==="id"||V==="name")&&(It(_,C),$e=et+$e),ce&&on(/((--!?|])>)|<\/(style|title|textarea)/i,$e)){It(_,C);continue}if(V==="attributename"&&Fa($e,"href")){It(_,C);continue}if(Le.forceKeepAttr)continue;if(!Le.keepAttr){It(_,C);continue}if(!pe&&on(/\/>/i,$e)){It(_,C);continue}he&&ci([Z,ee,Se],it=>{$e=Bo($e,it," ")});let Xe=He(C.nodeName);if(!Mt(Xe,V,$e)){It(_,C);continue}if(q&&typeof m=="object"&&typeof m.getAttributeType=="function"&&!S)switch(m.getAttributeType(Xe,V)){case"TrustedHTML":{$e=q.createHTML($e);break}case"TrustedScriptURL":{$e=q.createScriptURL($e);break}}if($e!==ie)try{S?C.setAttributeNS(S,_,$e):C.setAttribute(_,$e),Jt(C)?St(C):nd(t.removed)}catch{It(_,C)}}Dt(W.afterSanitizeAttributes,C,null)},en=function de(C){let ne=null,Le=Vt(C);for(Dt(W.beforeSanitizeShadowDOM,C,null);ne=Le.nextNode();)Dt(W.uponSanitizeShadowNode,ne,null),cn(ne),Ft(ne),ne.content instanceof s&&de(ne.content);Dt(W.afterSanitizeShadowDOM,C,null)};return t.sanitize=function(de){let C=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},ne=null,Le=null,y=null,p=null;if(te=!de,te&&(de="<!-->"),typeof de!="string"&&!Wt(de))if(typeof de.toString=="function"){if(de=de.toString(),typeof de!="string")throw Uo("dirty is not a string, aborting")}else throw Uo("toString is not a function");if(!t.isSupported)return de;if(Ge||xt(C),t.removed=[],typeof de=="string"&&(z=!1),z){if(de.nodeName){let Y=He(de.nodeName);if(!J[Y]||De[Y])throw Uo("root node is forbidden and cannot be sanitized in-place")}}else if(de instanceof l)ne=Ut("<!---->"),Le=ne.ownerDocument.importNode(de,!0),Le.nodeType===zo.element&&Le.nodeName==="BODY"||Le.nodeName==="HTML"?ne=Le:ne.appendChild(Le);else{if(!Pe&&!he&&!Fe&&de.indexOf("<")===-1)return q&&U?q.createHTML(de):de;if(ne=Ut(de),!ne)return Pe?null:U?O:""}ne&&Ze&&St(ne.firstChild);let _=Vt(z?de:ne);for(;y=_.nextNode();)cn(y),Ft(y),y.content instanceof s&&en(y.content);if(z)return de;if(Pe){if(Q)for(p=B.call(ne.ownerDocument);ne.firstChild;)p.appendChild(ne.firstChild);else p=ne;return(_e.shadowroot||_e.shadowrootmode)&&(p=N.call(r,p,!0)),p}let S=Fe?ne.outerHTML:ne.innerHTML;return Fe&&J["!doctype"]&&ne.ownerDocument&&ne.ownerDocument.doctype&&ne.ownerDocument.doctype.name&&on(dd,ne.ownerDocument.doctype.name)&&(S="<!DOCTYPE "+ne.ownerDocument.doctype.name+`>
`+S),he&&ci([Z,ee,Se],Y=>{S=Bo(S,Y," ")}),q&&U?q.createHTML(S):S},t.setConfig=function(){let de=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};xt(de),Ge=!0},t.clearConfig=function(){Je=null,Ge=!1},t.isValidAttribute=function(de,C,ne){Je||xt({});let Le=He(de),y=He(C);return Mt(Le,y,ne)},t.addHook=function(de,C){typeof C=="function"&&jo(W[de],C)},t.removeHook=function(de,C){if(C!==void 0){let ne=Rg(W[de],C);return ne===-1?void 0:Og(W[de],ne,1)[0]}return nd(W[de])},t.removeHooks=function(de){W[de]=[]},t.removeAllHooks=function(){W=ld()},t}var fd=pd();var Qn={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},pi=e=>(...t)=>({_$litDirective$:e,values:t}),ro=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,n,r){this._$Ct=t,this._$AM=n,this._$Ci=r}_$AS(t,n){return this.update(t,n)}update(t,n){return this.render(...n)}};var Ho=class extends ro{constructor(t){if(super(t),this.it=Rt,t.type!==Qn.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===Rt||t==null)return this._t=void 0,this.it=t;if(t===yn)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;let n=[t];return n.raw=n,this._t={_$litType$:this.constructor.resultType,strings:n,values:[]}}};Ho.directiveName="unsafeHTML",Ho.resultType=1;var _d=pi(Ho);function Xa(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var Ar=Xa();function wd(e){Ar=e}var Vo={exec:()=>null};function ht(e,t=""){let n=typeof e=="string"?e:e.source,r={replace:(o,s)=>{let i=typeof s=="string"?s:s.source;return i=i.replace(ln.caret,"$1"),n=n.replace(o,i),r},getRegex:()=>new RegExp(n,t)};return r}var Yg=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),ln={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i")},Vg=/^(?:[ \t]*(?:\n|$))+/,Xg=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,Qg=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,Xo=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,Zg=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,Qa=/(?:[*+-]|\d{1,9}[.)])/,kd=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,$d=ht(kd).replace(/bull/g,Qa).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),Jg=ht(kd).replace(/bull/g,Qa).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),Za=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,eh=/^[^\n]+/,Ja=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,th=ht(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",Ja).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),nh=ht(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,Qa).getRegex(),bi="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",el=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,rh=ht("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",el).replace("tag",bi).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),xd=ht(Za).replace("hr",Xo).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",bi).getRegex(),oh=ht(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",xd).getRegex(),tl={blockquote:oh,code:Xg,def:th,fences:Qg,heading:Zg,hr:Xo,html:rh,lheading:$d,list:nh,newline:Vg,paragraph:xd,table:Vo,text:eh},md=ht("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",Xo).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",bi).getRegex(),sh={...tl,lheading:Jg,table:md,paragraph:ht(Za).replace("hr",Xo).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",md).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",bi).getRegex()},ih={...tl,html:ht(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",el).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:Vo,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:ht(Za).replace("hr",Xo).replace("heading",` *#{1,6} *[^
]`).replace("lheading",$d).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},ah=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,lh=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,Ad=/^( {2,}|\\)\n(?!\s*$)/,ch=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,yi=/[\p{P}\p{S}]/u,nl=/[\s\p{P}\p{S}]/u,Sd=/[^\s\p{P}\p{S}]/u,uh=ht(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,nl).getRegex(),Ed=/(?!~)[\p{P}\p{S}]/u,dh=/(?!~)[\s\p{P}\p{S}]/u,ph=/(?:[^\s\p{P}\p{S}]|~)/u,fh=ht(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",Yg?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),Td=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,_h=ht(Td,"u").replace(/punct/g,yi).getRegex(),mh=ht(Td,"u").replace(/punct/g,Ed).getRegex(),Cd="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",gh=ht(Cd,"gu").replace(/notPunctSpace/g,Sd).replace(/punctSpace/g,nl).replace(/punct/g,yi).getRegex(),hh=ht(Cd,"gu").replace(/notPunctSpace/g,ph).replace(/punctSpace/g,dh).replace(/punct/g,Ed).getRegex(),bh=ht("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,Sd).replace(/punctSpace/g,nl).replace(/punct/g,yi).getRegex(),yh=ht(/\\(punct)/,"gu").replace(/punct/g,yi).getRegex(),vh=ht(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),wh=ht(el).replace("(?:-->|$)","-->").getRegex(),kh=ht("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",wh).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),mi=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,$h=ht(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",mi).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),Rd=ht(/^!?\[(label)\]\[(ref)\]/).replace("label",mi).replace("ref",Ja).getRegex(),Od=ht(/^!?\[(ref)\](?:\[\])?/).replace("ref",Ja).getRegex(),xh=ht("reflink|nolink(?!\\()","g").replace("reflink",Rd).replace("nolink",Od).getRegex(),gd=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,rl={_backpedal:Vo,anyPunctuation:yh,autolink:vh,blockSkip:fh,br:Ad,code:lh,del:Vo,emStrongLDelim:_h,emStrongRDelimAst:gh,emStrongRDelimUnd:bh,escape:ah,link:$h,nolink:Od,punctuation:uh,reflink:Rd,reflinkSearch:xh,tag:kh,text:ch,url:Vo},Ah={...rl,link:ht(/^!?\[(label)\]\((.*?)\)/).replace("label",mi).getRegex(),reflink:ht(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",mi).getRegex()},Ka={...rl,emStrongRDelimAst:hh,emStrongLDelim:mh,url:ht(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",gd).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:ht(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",gd).getRegex()},Sh={...Ka,br:ht(Ad).replace("{2,}","*").getRegex(),text:ht(Ka.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},fi={normal:tl,gfm:sh,pedantic:ih},Go={normal:rl,gfm:Ka,breaks:Sh,pedantic:Ah},Eh={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},hd=e=>Eh[e];function Zn(e,t){if(t){if(ln.escapeTest.test(e))return e.replace(ln.escapeReplace,hd)}else if(ln.escapeTestNoEncode.test(e))return e.replace(ln.escapeReplaceNoEncode,hd);return e}function bd(e){try{e=encodeURI(e).replace(ln.percentDecode,"%")}catch{return null}return e}function yd(e,t){let n=e.replace(ln.findPipe,(s,i,l)=>{let a=!1,u=i;for(;--u>=0&&l[u]==="\\";)a=!a;return a?"|":" |"}),r=n.split(ln.splitPipe),o=0;if(r[0].trim()||r.shift(),r.length>0&&!r.at(-1)?.trim()&&r.pop(),t)if(r.length>t)r.splice(t);else for(;r.length<t;)r.push("");for(;o<r.length;o++)r[o]=r[o].trim().replace(ln.slashPipe,"|");return r}function Ko(e,t,n){let r=e.length;if(r===0)return"";let o=0;for(;o<r;){let s=e.charAt(r-o-1);if(s===t&&!n)o++;else if(s!==t&&n)o++;else break}return e.slice(0,r-o)}function Th(e,t){if(e.indexOf(t[1])===-1)return-1;let n=0;for(let r=0;r<e.length;r++)if(e[r]==="\\")r++;else if(e[r]===t[0])n++;else if(e[r]===t[1]&&(n--,n<0))return r;return n>0?-2:-1}function vd(e,t,n,r,o){let s=t.href,i=t.title||null,l=e[1].replace(o.other.outputLinkReplace,"$1");r.state.inLink=!0;let a={type:e[0].charAt(0)==="!"?"image":"link",raw:n,href:s,title:i,text:l,tokens:r.inlineTokens(l)};return r.state.inLink=!1,a}function Ch(e,t,n){let r=e.match(n.other.indentCodeCompensation);if(r===null)return t;let o=r[1];return t.split(`
`).map(s=>{let i=s.match(n.other.beginningSpace);if(i===null)return s;let[l]=i;return l.length>=o.length?s.slice(o.length):s}).join(`
`)}var gi=class{constructor(e){At(this,"options");At(this,"rules");At(this,"lexer");this.options=e||Ar}space(e){let t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){let t=this.rules.block.code.exec(e);if(t){let n=t[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?n:Ko(n,`
`)}}}fences(e){let t=this.rules.block.fences.exec(e);if(t){let n=t[0],r=Ch(n,t[3]||"",this.rules);return{type:"code",raw:n,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:r}}}heading(e){let t=this.rules.block.heading.exec(e);if(t){let n=t[2].trim();if(this.rules.other.endingHash.test(n)){let r=Ko(n,"#");(this.options.pedantic||!r||this.rules.other.endingSpaceChar.test(r))&&(n=r.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:n,tokens:this.lexer.inline(n)}}}hr(e){let t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:Ko(t[0],`
`)}}blockquote(e){let t=this.rules.block.blockquote.exec(e);if(t){let n=Ko(t[0],`
`).split(`
`),r="",o="",s=[];for(;n.length>0;){let i=!1,l=[],a;for(a=0;a<n.length;a++)if(this.rules.other.blockquoteStart.test(n[a]))l.push(n[a]),i=!0;else if(!i)l.push(n[a]);else break;n=n.slice(a);let u=l.join(`
`),d=u.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");r=r?`${r}
${u}`:u,o=o?`${o}
${d}`:d;let f=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(d,s,!0),this.lexer.state.top=f,n.length===0)break;let b=s.at(-1);if(b?.type==="code")break;if(b?.type==="blockquote"){let m=b,k=m.raw+`
`+n.join(`
`),R=this.blockquote(k);s[s.length-1]=R,r=r.substring(0,r.length-m.raw.length)+R.raw,o=o.substring(0,o.length-m.text.length)+R.text;break}else if(b?.type==="list"){let m=b,k=m.raw+`
`+n.join(`
`),R=this.list(k);s[s.length-1]=R,r=r.substring(0,r.length-b.raw.length)+R.raw,o=o.substring(0,o.length-m.raw.length)+R.raw,n=k.substring(s.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:r,tokens:s,text:o}}}list(e){let t=this.rules.block.list.exec(e);if(t){let n=t[1].trim(),r=n.length>1,o={type:"list",raw:"",ordered:r,start:r?+n.slice(0,-1):"",loose:!1,items:[]};n=r?`\\d{1,9}\\${n.slice(-1)}`:`\\${n}`,this.options.pedantic&&(n=r?n:"[*+-]");let s=this.rules.other.listItemRegex(n),i=!1;for(;e;){let a=!1,u="",d="";if(!(t=s.exec(e))||this.rules.block.hr.test(e))break;u=t[0],e=e.substring(u.length);let f=t[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,R=>" ".repeat(3*R.length)),b=e.split(`
`,1)[0],m=!f.trim(),k=0;if(this.options.pedantic?(k=2,d=f.trimStart()):m?k=t[1].length+1:(k=t[2].search(this.rules.other.nonSpaceChar),k=k>4?1:k,d=f.slice(k),k+=t[1].length),m&&this.rules.other.blankLine.test(b)&&(u+=b+`
`,e=e.substring(b.length+1),a=!0),!a){let R=this.rules.other.nextBulletRegex(k),j=this.rules.other.hrRegex(k),H=this.rules.other.fencesBeginRegex(k),oe=this.rules.other.headingBeginRegex(k),X=this.rules.other.htmlBeginRegex(k);for(;e;){let q=e.split(`
`,1)[0],O;if(b=q,this.options.pedantic?(b=b.replace(this.rules.other.listReplaceNesting,"  "),O=b):O=b.replace(this.rules.other.tabCharGlobal,"    "),H.test(b)||oe.test(b)||X.test(b)||R.test(b)||j.test(b))break;if(O.search(this.rules.other.nonSpaceChar)>=k||!b.trim())d+=`
`+O.slice(k);else{if(m||f.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||H.test(f)||oe.test(f)||j.test(f))break;d+=`
`+b}!m&&!b.trim()&&(m=!0),u+=q+`
`,e=e.substring(q.length+1),f=O.slice(k)}}o.loose||(i?o.loose=!0:this.rules.other.doubleBlankLine.test(u)&&(i=!0)),o.items.push({type:"list_item",raw:u,task:!!this.options.gfm&&this.rules.other.listIsTask.test(d),loose:!1,text:d,tokens:[]}),o.raw+=u}let l=o.items.at(-1);if(l)l.raw=l.raw.trimEnd(),l.text=l.text.trimEnd();else return;o.raw=o.raw.trimEnd();for(let a of o.items){if(this.lexer.state.top=!1,a.tokens=this.lexer.blockTokens(a.text,[]),a.task){if(a.text=a.text.replace(this.rules.other.listReplaceTask,""),a.tokens[0]?.type==="text"||a.tokens[0]?.type==="paragraph"){a.tokens[0].raw=a.tokens[0].raw.replace(this.rules.other.listReplaceTask,""),a.tokens[0].text=a.tokens[0].text.replace(this.rules.other.listReplaceTask,"");for(let d=this.lexer.inlineQueue.length-1;d>=0;d--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[d].src)){this.lexer.inlineQueue[d].src=this.lexer.inlineQueue[d].src.replace(this.rules.other.listReplaceTask,"");break}}let u=this.rules.other.listTaskCheckbox.exec(a.raw);if(u){let d={type:"checkbox",raw:u[0]+" ",checked:u[0]!=="[ ]"};a.checked=d.checked,o.loose?a.tokens[0]&&["paragraph","text"].includes(a.tokens[0].type)&&"tokens"in a.tokens[0]&&a.tokens[0].tokens?(a.tokens[0].raw=d.raw+a.tokens[0].raw,a.tokens[0].text=d.raw+a.tokens[0].text,a.tokens[0].tokens.unshift(d)):a.tokens.unshift({type:"paragraph",raw:d.raw,text:d.raw,tokens:[d]}):a.tokens.unshift(d)}}if(!o.loose){let u=a.tokens.filter(f=>f.type==="space"),d=u.length>0&&u.some(f=>this.rules.other.anyLine.test(f.raw));o.loose=d}}if(o.loose)for(let a of o.items){a.loose=!0;for(let u of a.tokens)u.type==="text"&&(u.type="paragraph")}return o}}html(e){let t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){let t=this.rules.block.def.exec(e);if(t){let n=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),r=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",o=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:n,raw:t[0],href:r,title:o}}}table(e){let t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;let n=yd(t[1]),r=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),o=t[3]?.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],s={type:"table",raw:t[0],header:[],align:[],rows:[]};if(n.length===r.length){for(let i of r)this.rules.other.tableAlignRight.test(i)?s.align.push("right"):this.rules.other.tableAlignCenter.test(i)?s.align.push("center"):this.rules.other.tableAlignLeft.test(i)?s.align.push("left"):s.align.push(null);for(let i=0;i<n.length;i++)s.header.push({text:n[i],tokens:this.lexer.inline(n[i]),header:!0,align:s.align[i]});for(let i of o)s.rows.push(yd(i,s.header.length).map((l,a)=>({text:l,tokens:this.lexer.inline(l),header:!1,align:s.align[a]})));return s}}lheading(e){let t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){let t=this.rules.block.paragraph.exec(e);if(t){let n=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:n,tokens:this.lexer.inline(n)}}}text(e){let t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){let t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){let t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){let t=this.rules.inline.link.exec(e);if(t){let n=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(n)){if(!this.rules.other.endAngleBracket.test(n))return;let s=Ko(n.slice(0,-1),"\\");if((n.length-s.length)%2===0)return}else{let s=Th(t[2],"()");if(s===-2)return;if(s>-1){let i=(t[0].indexOf("!")===0?5:4)+t[1].length+s;t[2]=t[2].substring(0,s),t[0]=t[0].substring(0,i).trim(),t[3]=""}}let r=t[2],o="";if(this.options.pedantic){let s=this.rules.other.pedanticHrefTitle.exec(r);s&&(r=s[1],o=s[3])}else o=t[3]?t[3].slice(1,-1):"";return r=r.trim(),this.rules.other.startAngleBracket.test(r)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(n)?r=r.slice(1):r=r.slice(1,-1)),vd(t,{href:r&&r.replace(this.rules.inline.anyPunctuation,"$1"),title:o&&o.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let n;if((n=this.rules.inline.reflink.exec(e))||(n=this.rules.inline.nolink.exec(e))){let r=(n[2]||n[1]).replace(this.rules.other.multipleSpaceGlobal," "),o=t[r.toLowerCase()];if(!o){let s=n[0].charAt(0);return{type:"text",raw:s,text:s}}return vd(n,o,n[0],this.lexer,this.rules)}}emStrong(e,t,n=""){let r=this.rules.inline.emStrongLDelim.exec(e);if(!(!r||r[3]&&n.match(this.rules.other.unicodeAlphaNumeric))&&(!(r[1]||r[2])||!n||this.rules.inline.punctuation.exec(n))){let o=[...r[0]].length-1,s,i,l=o,a=0,u=r[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(u.lastIndex=0,t=t.slice(-1*e.length+o);(r=u.exec(t))!=null;){if(s=r[1]||r[2]||r[3]||r[4]||r[5]||r[6],!s)continue;if(i=[...s].length,r[3]||r[4]){l+=i;continue}else if((r[5]||r[6])&&o%3&&!((o+i)%3)){a+=i;continue}if(l-=i,l>0)continue;i=Math.min(i,i+l+a);let d=[...r[0]][0].length,f=e.slice(0,o+r.index+d+i);if(Math.min(o,i)%2){let m=f.slice(1,-1);return{type:"em",raw:f,text:m,tokens:this.lexer.inlineTokens(m)}}let b=f.slice(2,-2);return{type:"strong",raw:f,text:b,tokens:this.lexer.inlineTokens(b)}}}}codespan(e){let t=this.rules.inline.code.exec(e);if(t){let n=t[2].replace(this.rules.other.newLineCharGlobal," "),r=this.rules.other.nonSpaceChar.test(n),o=this.rules.other.startingSpaceChar.test(n)&&this.rules.other.endingSpaceChar.test(n);return r&&o&&(n=n.substring(1,n.length-1)),{type:"codespan",raw:t[0],text:n}}}br(e){let t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){let t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){let t=this.rules.inline.autolink.exec(e);if(t){let n,r;return t[2]==="@"?(n=t[1],r="mailto:"+n):(n=t[1],r=n),{type:"link",raw:t[0],text:n,href:r,tokens:[{type:"text",raw:n,text:n}]}}}url(e){let t;if(t=this.rules.inline.url.exec(e)){let n,r;if(t[2]==="@")n=t[0],r="mailto:"+n;else{let o;do o=t[0],t[0]=this.rules.inline._backpedal.exec(t[0])?.[0]??"";while(o!==t[0]);n=t[0],t[1]==="www."?r="http://"+t[0]:r=t[0]}return{type:"link",raw:t[0],text:n,href:r,tokens:[{type:"text",raw:n,text:n}]}}}inlineText(e){let t=this.rules.inline.text.exec(e);if(t){let n=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:n}}}},En=class Ya{constructor(t){At(this,"tokens");At(this,"options");At(this,"state");At(this,"inlineQueue");At(this,"tokenizer");this.tokens=[],this.tokens.links=Object.create(null),this.options=t||Ar,this.options.tokenizer=this.options.tokenizer||new gi,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let n={other:ln,block:fi.normal,inline:Go.normal};this.options.pedantic?(n.block=fi.pedantic,n.inline=Go.pedantic):this.options.gfm&&(n.block=fi.gfm,this.options.breaks?n.inline=Go.breaks:n.inline=Go.gfm),this.tokenizer.rules=n}static get rules(){return{block:fi,inline:Go}}static lex(t,n){return new Ya(n).lex(t)}static lexInline(t,n){return new Ya(n).inlineTokens(t)}lex(t){t=t.replace(ln.carriageReturn,`
`),this.blockTokens(t,this.tokens);for(let n=0;n<this.inlineQueue.length;n++){let r=this.inlineQueue[n];this.inlineTokens(r.src,r.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(t,n=[],r=!1){for(this.options.pedantic&&(t=t.replace(ln.tabCharGlobal,"    ").replace(ln.spaceLine,""));t;){let o;if(this.options.extensions?.block?.some(i=>(o=i.call({lexer:this},t,n))?(t=t.substring(o.raw.length),n.push(o),!0):!1))continue;if(o=this.tokenizer.space(t)){t=t.substring(o.raw.length);let i=n.at(-1);o.raw.length===1&&i!==void 0?i.raw+=`
`:n.push(o);continue}if(o=this.tokenizer.code(t)){t=t.substring(o.raw.length);let i=n.at(-1);i?.type==="paragraph"||i?.type==="text"?(i.raw+=(i.raw.endsWith(`
`)?"":`
`)+o.raw,i.text+=`
`+o.text,this.inlineQueue.at(-1).src=i.text):n.push(o);continue}if(o=this.tokenizer.fences(t)){t=t.substring(o.raw.length),n.push(o);continue}if(o=this.tokenizer.heading(t)){t=t.substring(o.raw.length),n.push(o);continue}if(o=this.tokenizer.hr(t)){t=t.substring(o.raw.length),n.push(o);continue}if(o=this.tokenizer.blockquote(t)){t=t.substring(o.raw.length),n.push(o);continue}if(o=this.tokenizer.list(t)){t=t.substring(o.raw.length),n.push(o);continue}if(o=this.tokenizer.html(t)){t=t.substring(o.raw.length),n.push(o);continue}if(o=this.tokenizer.def(t)){t=t.substring(o.raw.length);let i=n.at(-1);i?.type==="paragraph"||i?.type==="text"?(i.raw+=(i.raw.endsWith(`
`)?"":`
`)+o.raw,i.text+=`
`+o.raw,this.inlineQueue.at(-1).src=i.text):this.tokens.links[o.tag]||(this.tokens.links[o.tag]={href:o.href,title:o.title},n.push(o));continue}if(o=this.tokenizer.table(t)){t=t.substring(o.raw.length),n.push(o);continue}if(o=this.tokenizer.lheading(t)){t=t.substring(o.raw.length),n.push(o);continue}let s=t;if(this.options.extensions?.startBlock){let i=1/0,l=t.slice(1),a;this.options.extensions.startBlock.forEach(u=>{a=u.call({lexer:this},l),typeof a=="number"&&a>=0&&(i=Math.min(i,a))}),i<1/0&&i>=0&&(s=t.substring(0,i+1))}if(this.state.top&&(o=this.tokenizer.paragraph(s))){let i=n.at(-1);r&&i?.type==="paragraph"?(i.raw+=(i.raw.endsWith(`
`)?"":`
`)+o.raw,i.text+=`
`+o.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=i.text):n.push(o),r=s.length!==t.length,t=t.substring(o.raw.length);continue}if(o=this.tokenizer.text(t)){t=t.substring(o.raw.length);let i=n.at(-1);i?.type==="text"?(i.raw+=(i.raw.endsWith(`
`)?"":`
`)+o.raw,i.text+=`
`+o.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=i.text):n.push(o);continue}if(t){let i="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(i);break}else throw new Error(i)}}return this.state.top=!0,n}inline(t,n=[]){return this.inlineQueue.push({src:t,tokens:n}),n}inlineTokens(t,n=[]){let r=t,o=null;if(this.tokens.links){let a=Object.keys(this.tokens.links);if(a.length>0)for(;(o=this.tokenizer.rules.inline.reflinkSearch.exec(r))!=null;)a.includes(o[0].slice(o[0].lastIndexOf("[")+1,-1))&&(r=r.slice(0,o.index)+"["+"a".repeat(o[0].length-2)+"]"+r.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(o=this.tokenizer.rules.inline.anyPunctuation.exec(r))!=null;)r=r.slice(0,o.index)+"++"+r.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let s;for(;(o=this.tokenizer.rules.inline.blockSkip.exec(r))!=null;)s=o[2]?o[2].length:0,r=r.slice(0,o.index+s)+"["+"a".repeat(o[0].length-s-2)+"]"+r.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);r=this.options.hooks?.emStrongMask?.call({lexer:this},r)??r;let i=!1,l="";for(;t;){i||(l=""),i=!1;let a;if(this.options.extensions?.inline?.some(d=>(a=d.call({lexer:this},t,n))?(t=t.substring(a.raw.length),n.push(a),!0):!1))continue;if(a=this.tokenizer.escape(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.tag(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.link(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(a.raw.length);let d=n.at(-1);a.type==="text"&&d?.type==="text"?(d.raw+=a.raw,d.text+=a.text):n.push(a);continue}if(a=this.tokenizer.emStrong(t,r,l)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.codespan(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.br(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.del(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.autolink(t)){t=t.substring(a.raw.length),n.push(a);continue}if(!this.state.inLink&&(a=this.tokenizer.url(t))){t=t.substring(a.raw.length),n.push(a);continue}let u=t;if(this.options.extensions?.startInline){let d=1/0,f=t.slice(1),b;this.options.extensions.startInline.forEach(m=>{b=m.call({lexer:this},f),typeof b=="number"&&b>=0&&(d=Math.min(d,b))}),d<1/0&&d>=0&&(u=t.substring(0,d+1))}if(a=this.tokenizer.inlineText(u)){t=t.substring(a.raw.length),a.raw.slice(-1)!=="_"&&(l=a.raw.slice(-1)),i=!0;let d=n.at(-1);d?.type==="text"?(d.raw+=a.raw,d.text+=a.text):n.push(a);continue}if(t){let d="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(d);break}else throw new Error(d)}}return n}},hi=class{constructor(e){At(this,"options");At(this,"parser");this.options=e||Ar}space(e){return""}code({text:e,lang:t,escaped:n}){let r=(t||"").match(ln.notSpaceStart)?.[0],o=e.replace(ln.endingNewline,"")+`
`;return r?'<pre><code class="language-'+Zn(r)+'">'+(n?o:Zn(o,!0))+`</code></pre>
`:"<pre><code>"+(n?o:Zn(o,!0))+`</code></pre>
`}blockquote({tokens:e}){return`<blockquote>
${this.parser.parse(e)}</blockquote>
`}html({text:e}){return e}def(e){return""}heading({tokens:e,depth:t}){return`<h${t}>${this.parser.parseInline(e)}</h${t}>
`}hr(e){return`<hr>
`}list(e){let t=e.ordered,n=e.start,r="";for(let i=0;i<e.items.length;i++){let l=e.items[i];r+=this.listitem(l)}let o=t?"ol":"ul",s=t&&n!==1?' start="'+n+'"':"";return"<"+o+s+`>
`+r+"</"+o+`>
`}listitem(e){return`<li>${this.parser.parse(e.tokens)}</li>
`}checkbox({checked:e}){return"<input "+(e?'checked="" ':"")+'disabled="" type="checkbox"> '}paragraph({tokens:e}){return`<p>${this.parser.parseInline(e)}</p>
`}table(e){let t="",n="";for(let o=0;o<e.header.length;o++)n+=this.tablecell(e.header[o]);t+=this.tablerow({text:n});let r="";for(let o=0;o<e.rows.length;o++){let s=e.rows[o];n="";for(let i=0;i<s.length;i++)n+=this.tablecell(s[i]);r+=this.tablerow({text:n})}return r&&(r=`<tbody>${r}</tbody>`),`<table>
<thead>
`+t+`</thead>
`+r+`</table>
`}tablerow({text:e}){return`<tr>
${e}</tr>
`}tablecell(e){let t=this.parser.parseInline(e.tokens),n=e.header?"th":"td";return(e.align?`<${n} align="${e.align}">`:`<${n}>`)+t+`</${n}>
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${Zn(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:n}){let r=this.parser.parseInline(n),o=bd(e);if(o===null)return r;e=o;let s='<a href="'+e+'"';return t&&(s+=' title="'+Zn(t)+'"'),s+=">"+r+"</a>",s}image({href:e,title:t,text:n,tokens:r}){r&&(n=this.parser.parseInline(r,this.parser.textRenderer));let o=bd(e);if(o===null)return Zn(n);e=o;let s=`<img src="${e}" alt="${n}"`;return t&&(s+=` title="${Zn(t)}"`),s+=">",s}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:Zn(e.text)}},ol=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}checkbox({raw:e}){return e}},Tn=class Va{constructor(t){At(this,"options");At(this,"renderer");At(this,"textRenderer");this.options=t||Ar,this.options.renderer=this.options.renderer||new hi,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new ol}static parse(t,n){return new Va(n).parse(t)}static parseInline(t,n){return new Va(n).parseInline(t)}parse(t){let n="";for(let r=0;r<t.length;r++){let o=t[r];if(this.options.extensions?.renderers?.[o.type]){let i=o,l=this.options.extensions.renderers[i.type].call({parser:this},i);if(l!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(i.type)){n+=l||"";continue}}let s=o;switch(s.type){case"space":{n+=this.renderer.space(s);break}case"hr":{n+=this.renderer.hr(s);break}case"heading":{n+=this.renderer.heading(s);break}case"code":{n+=this.renderer.code(s);break}case"table":{n+=this.renderer.table(s);break}case"blockquote":{n+=this.renderer.blockquote(s);break}case"list":{n+=this.renderer.list(s);break}case"checkbox":{n+=this.renderer.checkbox(s);break}case"html":{n+=this.renderer.html(s);break}case"def":{n+=this.renderer.def(s);break}case"paragraph":{n+=this.renderer.paragraph(s);break}case"text":{n+=this.renderer.text(s);break}default:{let i='Token with "'+s.type+'" type was not found.';if(this.options.silent)return console.error(i),"";throw new Error(i)}}}return n}parseInline(t,n=this.renderer){let r="";for(let o=0;o<t.length;o++){let s=t[o];if(this.options.extensions?.renderers?.[s.type]){let l=this.options.extensions.renderers[s.type].call({parser:this},s);if(l!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(s.type)){r+=l||"";continue}}let i=s;switch(i.type){case"escape":{r+=n.text(i);break}case"html":{r+=n.html(i);break}case"link":{r+=n.link(i);break}case"image":{r+=n.image(i);break}case"checkbox":{r+=n.checkbox(i);break}case"strong":{r+=n.strong(i);break}case"em":{r+=n.em(i);break}case"codespan":{r+=n.codespan(i);break}case"br":{r+=n.br(i);break}case"del":{r+=n.del(i);break}case"text":{r+=n.text(i);break}default:{let l='Token with "'+i.type+'" type was not found.';if(this.options.silent)return console.error(l),"";throw new Error(l)}}}return r}},_i,Yo=(_i=class{constructor(e){At(this,"options");At(this,"block");this.options=e||Ar}preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}emStrongMask(e){return e}provideLexer(){return this.block?En.lex:En.lexInline}provideParser(){return this.block?Tn.parse:Tn.parseInline}},At(_i,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens","emStrongMask"])),At(_i,"passThroughHooksRespectAsync",new Set(["preprocess","postprocess","processAllTokens"])),_i),Rh=class{constructor(...e){At(this,"defaults",Xa());At(this,"options",this.setOptions);At(this,"parse",this.parseMarkdown(!0));At(this,"parseInline",this.parseMarkdown(!1));At(this,"Parser",Tn);At(this,"Renderer",hi);At(this,"TextRenderer",ol);At(this,"Lexer",En);At(this,"Tokenizer",gi);At(this,"Hooks",Yo);this.use(...e)}walkTokens(e,t){let n=[];for(let r of e)switch(n=n.concat(t.call(this,r)),r.type){case"table":{let o=r;for(let s of o.header)n=n.concat(this.walkTokens(s.tokens,t));for(let s of o.rows)for(let i of s)n=n.concat(this.walkTokens(i.tokens,t));break}case"list":{let o=r;n=n.concat(this.walkTokens(o.items,t));break}default:{let o=r;this.defaults.extensions?.childTokens?.[o.type]?this.defaults.extensions.childTokens[o.type].forEach(s=>{let i=o[s].flat(1/0);n=n.concat(this.walkTokens(i,t))}):o.tokens&&(n=n.concat(this.walkTokens(o.tokens,t)))}}return n}use(...e){let t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(n=>{let r={...n};if(r.async=this.defaults.async||r.async||!1,n.extensions&&(n.extensions.forEach(o=>{if(!o.name)throw new Error("extension name required");if("renderer"in o){let s=t.renderers[o.name];s?t.renderers[o.name]=function(...i){let l=o.renderer.apply(this,i);return l===!1&&(l=s.apply(this,i)),l}:t.renderers[o.name]=o.renderer}if("tokenizer"in o){if(!o.level||o.level!=="block"&&o.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let s=t[o.level];s?s.unshift(o.tokenizer):t[o.level]=[o.tokenizer],o.start&&(o.level==="block"?t.startBlock?t.startBlock.push(o.start):t.startBlock=[o.start]:o.level==="inline"&&(t.startInline?t.startInline.push(o.start):t.startInline=[o.start]))}"childTokens"in o&&o.childTokens&&(t.childTokens[o.name]=o.childTokens)}),r.extensions=t),n.renderer){let o=this.defaults.renderer||new hi(this.defaults);for(let s in n.renderer){if(!(s in o))throw new Error(`renderer '${s}' does not exist`);if(["options","parser"].includes(s))continue;let i=s,l=n.renderer[i],a=o[i];o[i]=(...u)=>{let d=l.apply(o,u);return d===!1&&(d=a.apply(o,u)),d||""}}r.renderer=o}if(n.tokenizer){let o=this.defaults.tokenizer||new gi(this.defaults);for(let s in n.tokenizer){if(!(s in o))throw new Error(`tokenizer '${s}' does not exist`);if(["options","rules","lexer"].includes(s))continue;let i=s,l=n.tokenizer[i],a=o[i];o[i]=(...u)=>{let d=l.apply(o,u);return d===!1&&(d=a.apply(o,u)),d}}r.tokenizer=o}if(n.hooks){let o=this.defaults.hooks||new Yo;for(let s in n.hooks){if(!(s in o))throw new Error(`hook '${s}' does not exist`);if(["options","block"].includes(s))continue;let i=s,l=n.hooks[i],a=o[i];Yo.passThroughHooks.has(s)?o[i]=u=>{if(this.defaults.async&&Yo.passThroughHooksRespectAsync.has(s))return(async()=>{let f=await l.call(o,u);return a.call(o,f)})();let d=l.call(o,u);return a.call(o,d)}:o[i]=(...u)=>{if(this.defaults.async)return(async()=>{let f=await l.apply(o,u);return f===!1&&(f=await a.apply(o,u)),f})();let d=l.apply(o,u);return d===!1&&(d=a.apply(o,u)),d}}r.hooks=o}if(n.walkTokens){let o=this.defaults.walkTokens,s=n.walkTokens;r.walkTokens=function(i){let l=[];return l.push(s.call(this,i)),o&&(l=l.concat(o.call(this,i))),l}}this.defaults={...this.defaults,...r}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return En.lex(e,t??this.defaults)}parser(e,t){return Tn.parse(e,t??this.defaults)}parseMarkdown(e){return(t,n)=>{let r={...n},o={...this.defaults,...r},s=this.onError(!!o.silent,!!o.async);if(this.defaults.async===!0&&r.async===!1)return s(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof t>"u"||t===null)return s(new Error("marked(): input parameter is undefined or null"));if(typeof t!="string")return s(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(t)+", string expected"));if(o.hooks&&(o.hooks.options=o,o.hooks.block=e),o.async)return(async()=>{let i=o.hooks?await o.hooks.preprocess(t):t,l=await(o.hooks?await o.hooks.provideLexer():e?En.lex:En.lexInline)(i,o),a=o.hooks?await o.hooks.processAllTokens(l):l;o.walkTokens&&await Promise.all(this.walkTokens(a,o.walkTokens));let u=await(o.hooks?await o.hooks.provideParser():e?Tn.parse:Tn.parseInline)(a,o);return o.hooks?await o.hooks.postprocess(u):u})().catch(s);try{o.hooks&&(t=o.hooks.preprocess(t));let i=(o.hooks?o.hooks.provideLexer():e?En.lex:En.lexInline)(t,o);o.hooks&&(i=o.hooks.processAllTokens(i)),o.walkTokens&&this.walkTokens(i,o.walkTokens);let l=(o.hooks?o.hooks.provideParser():e?Tn.parse:Tn.parseInline)(i,o);return o.hooks&&(l=o.hooks.postprocess(l)),l}catch(i){return s(i)}}}onError(e,t){return n=>{if(n.message+=`
Please report this to https://github.com/markedjs/marked.`,e){let r="<p>An error occurred:</p><pre>"+Zn(n.message+"",!0)+"</pre>";return t?Promise.resolve(r):r}if(t)return Promise.reject(n);throw n}}},xr=new Rh;function wt(e,t){return xr.parse(e,t)}wt.options=wt.setOptions=function(e){return xr.setOptions(e),wt.defaults=xr.defaults,wd(wt.defaults),wt};wt.getDefaults=Xa;wt.defaults=Ar;wt.use=function(...e){return xr.use(...e),wt.defaults=xr.defaults,wd(wt.defaults),wt};wt.walkTokens=function(e,t){return xr.walkTokens(e,t)};wt.parseInline=xr.parseInline;wt.Parser=Tn;wt.parser=Tn.parse;wt.Renderer=hi;wt.TextRenderer=ol;wt.Lexer=En;wt.lexer=En.lex;wt.Tokenizer=gi;wt.Hooks=Yo;wt.parse=wt;var N$=wt.options,q$=wt.setOptions,F$=wt.use,j$=wt.walkTokens,B$=wt.parseInline;var U$=Tn.parse,W$=En.lex;function lr(e){let t=wt.parse(e),n=fd.sanitize(t);return _d(n)}function Jn(e,t){return c`<div class="prompt-block">
    <div class="prompt-block__label">${e}</div>
    <pre class="prompt-block__body">${t}</pre>
  </div>`}function oo(e){return e.loading?c`<div class="prompt-block__status">불러오는 중…</div>`:e.error?c`<div class="prompt-block__status prompt-block__status--error">
      프롬프트를 불러오지 못했습니다
    </div>`:""}function vi(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),n=r=>String(r).padStart(2,"0");return`${t.getFullYear()}-${n(t.getMonth()+1)}-${n(t.getDate())} ${n(t.getHours())}:${n(t.getMinutes())}`}var Id={Read:"\u{1F4D6}",Edit:"\u270E",MultiEdit:"\u270E",Write:"\u{1F4DD}",Bash:"\u26A1",Grep:"\u{1F50E}",Glob:"\u{1F50E}",Task:"\u{1F916}",Agent:"\u{1F916}",WebFetch:"\u{1F310}",WebSearch:"\u{1F310}"},Oh={command_execution:"\uBA85\uB839 \uC2E4\uD589",file_change:"\uD30C\uC77C \uBCC0\uACBD",mcp_call:"MCP \uD638\uCD9C",web_search:"\uC6F9 \uAC80\uC0C9",plan:"\uACC4\uD68D"},Lh=/^\s*([✓✗⊘])\s*(spec|impl|implementation|plan)\s*게이트\s*[—–-]\s*(\S+)\s+(APPROVE|REVISE|REJECT|BLOCK|SKIP)(?:\s*·\s*(.+))?/,Ih=/^\s*#{0,3}\s*Phase\s+\d+(?:\s*\/\s*\d+)?\s*(?:[·:—–-]\s*.+)?$/;function Cn(e){return!!e&&typeof e=="object"}function sl(e){return typeof e!="string"||e.length===0?[]:e.split(/\r?\n/)}function il(e,t){let n=sl(e),r=sl(t),o=new Map;for(let l of n)o.set(l,(o.get(l)||0)+1);let s=0;for(let l of r){let a=o.get(l)||0;a>0?o.set(l,a-1):s+=1}let i=0;for(let l of o.values())i+=l;return{added:s,removed:i}}function Md(e){let t="";typeof e=="string"?t=e:Array.isArray(e)?t=e.map(o=>Cn(o)&&typeof o.text=="string"?o.text:"").join(""):Cn(e)&&typeof e.text=="string"&&(t=e.text);let r=(String(t).split(/\r?\n/).find(o=>o.trim().length>0)||"").trim();return r.length>120?`${r.slice(0,117)}\u2026`:r}function Mh(e){let t=String(e.name||""),n=e.input||{},r={kind:"tool",tool:t,icon:Id[t]||"\u{1F527}",input:n,expandable:!0};if((t==="Read"||t==="Write")&&(r.path=String(n.file_path||n.path||"")),t==="Write"&&(r.added=sl(n.content).length),t==="Edit"){r.path=String(n.file_path||n.path||"");let{added:o,removed:s}=il(n.old_string,n.new_string);r.added=o,r.removed=s}if(t==="MultiEdit"){r.path=String(n.file_path||n.path||"");let o=0,s=0,i=Array.isArray(n.edits)?n.edits:[];for(let l of i){let a=il(Cn(l)?l.old_string:"",Cn(l)?l.new_string:"");o+=a.added,s+=a.removed}r.added=o,r.removed=s}return t==="Bash"&&(r.command=String(n.command||"")),(t==="Grep"||t==="Glob")&&(r.command=String(n.pattern||n.query||"")),t==="Agent"&&(typeof e.id=="string"&&e.id.length>0&&(r.launch_id=e.id),typeof n.description=="string"&&(r.command=n.description)),r}function al(e){return typeof e!="string"||e.trim().length===0?null:{kind:"thinking",text:e}}var Dh=/<system-reminder>[\s\S]*?<\/system-reminder>/g;function Dd(e){let t;if(typeof e=="string")t=e;else if(Array.isArray(e))t=e.filter(r=>Cn(r)&&r.type==="text"&&typeof r.text=="string").map(r=>String(r.text)).join(`
`);else return null;let n=t.replace(Dh,"").trim();return n.length>0?{kind:"user",text:n}:null}function ll(e){let t=e.split(/\r?\n/).find(r=>r.trim().length>0)||"",n=Lh.exec(t);return n?{kind:"gate",gate:n[2]==="implementation"?"impl":n[2],reviewer:n[3],verdict:n[4],time:n[5]?n[5].trim():void 0,text:t.trim()}:Ih.test(t)&&t.trim().length<=80?{kind:"phase",text:t.trim()}:{kind:"assistant",text:e}}function Ph(e,t){if(e.subtype==="init"){let n=typeof e.model=="string"?e.model:"";return t.progress=null,[{kind:"thinking",text:n?`\uC138\uC158 \uC2DC\uC791 \xB7 ${n}`:"\uC138\uC158 \uC2DC\uC791"}]}if(e.subtype==="thinking_tokens"){let r=`\uC0DD\uAC01 \uC911\u2026 ${typeof e.estimated_tokens=="number"&&Number.isFinite(e.estimated_tokens)?Math.max(0,Math.round(e.estimated_tokens)):0} \uD1A0\uD070`;return t.progress?(t.progress.text=r,[]):(t.progress={kind:"thinking",text:r},[t.progress])}return[]}function Nh(e,t){let n=typeof e.parent_tool_use_id=="string"&&e.parent_tool_use_id.length>0?e.parent_tool_use_id:null;if(e.type==="assistant"){let r=e.message,o=r&&Array.isArray(r.content)?r.content:[],s=[];for(let i of o)if(Cn(i)){if(i.type==="text"&&typeof i.text=="string")s.push(ll(i.text));else if(i.type==="thinking"){let l=al(i.thinking);l&&s.push(l)}else if(i.type==="tool_use"){let l=Mh(i);typeof i.id=="string"&&t.set(i.id,l),s.push(l)}}return n?Ld(s,n):s}if(e.type==="user"){let r=e.message,o=r&&Array.isArray(r.content)?r.content:[];for(let i of o)if(Cn(i)&&i.type==="tool_result"){let l=t.get(String(i.tool_use_id));if(l){let a=Md(i.content);l.result=a,l.output=typeof i.content=="string"?i.content:a,i.is_error===!0&&(l.is_error=!0)}}let s=Dd(r&&r.content);return s?[s]:[]}if(e.type==="result"){let r=e.is_error===!1&&e.subtype==="success",o={kind:"result",success:r,text:typeof e.result=="string"?e.result:r?"DONE":""};return n?Ld([o],n):[o]}return[]}function Ld(e,t){for(let n of e)n.parent_tool_use_id=t;return e}function qh(e){let t=typeof e.command=="string"?e.command:"",n=Md(e.aggregated_output===void 0?e.output:e.aggregated_output),o=[typeof e.exit_code=="number"&&Number.isFinite(e.exit_code)?`exit ${e.exit_code}`:typeof e.status=="string"&&e.status.length>0?e.status:"",n].filter(i=>i.length>0).join(" \xB7 "),s={kind:"tool",tool:"shell",icon:Id.Bash,command:t,input:{command:t},expandable:!0};return o.length>0&&(s.result=o),typeof e.aggregated_output=="string"&&(s.output=e.aggregated_output),s}function Fh(e){if(e.type==="item.completed"&&Cn(e.item)){let t=e.item;if(t.type==="agent_message"&&typeof t.text=="string")return[ll(t.text)];if(t.type==="user_message"){let n=Dd(t.text);return n?[n]:[]}if(t.type==="reasoning"){let n=al(t.text);return n?[n]:[]}return t.type==="error"?[{kind:"error",text:String(t.message||"")}]:t.type==="command_execution"?[qh(t)]:[]}if(e.type==="turn.completed")return[{kind:"result",success:!0,text:"DONE"}];if(e.type==="turn.failed"){let t=e.error;return[{kind:"error",text:t&&typeof t.message=="string"?t.message:"turn failed"}]}return e.type==="error"?[{kind:"error",text:String(e.message||"")}]:[]}function jh(e){if(e.schema!=="codex-delegation-monitor-v1"||!Cn(e.event))return[];let t=e.event;if(t.type==="session.started"||t.type==="turn.started")return[];if((t.type==="item.started"||t.type==="item.completed")&&Cn(t.item)){let n=t.item;if(typeof n.id!="string"||n.id.length===0)return[];if(t.type==="item.completed"&&n.kind==="agent_message"&&typeof n.text=="string"&&n.text.trim().length>0)return[ll(n.text)];if(t.type==="item.completed"&&n.kind==="reasoning"){let l=al(n.text);return l?[l]:[]}if(n.kind!=="activity"||typeof n.activity!="string")return[];let r=Oh[n.activity];if(!r)return[];let o="\uC2DC\uC791",s="\u2026",i={kind:"tool",tool:"",icon:s,expandable:!1};if(t.type==="item.completed"){if(n.status==="completed")o="\uC644\uB8CC",s="\u2713";else if(n.status==="failed")o="\uC2E4\uD328",s="\u2717";else return[];i.result=""}return i.tool=`${r} \xB7 ${o}`,i.icon=s,[i]}return t.type==="turn.completed"&&t.status==="completed"?[{kind:"result",success:!0,text:"DONE"}]:t.type==="turn.failed"&&(t.status==="failed"||t.status==="interrupted")&&typeof t.error_code=="string"&&t.error_code.length>0?[{kind:"error",text:t.error_code}]:[]}function Bh(e){let t=e.type;return typeof t=="string"&&(t==="error"||t.startsWith("thread.")||t.startsWith("turn.")||t.startsWith("item."))}function Uh(e){let t=e;if(typeof e=="string"){let n=e.trim();if(n.length===0)return null;try{t=JSON.parse(n)}catch{return null}}return Cn(t)?t:null}function Pd(e={}){let t=e.skip_delegated===!0,n=new Map,r={progress:null};return{push(o){let s=Uh(o);if(!s)return[];if(t&&typeof s.parent_tool_use_id=="string"&&s.parent_tool_use_id.length>0)return[];if(s.type==="system"&&s.schema!=="codex-delegation-monitor-v1")return Ph(s,r);let i=s.schema==="codex-delegation-monitor-v1"?jh(s):Bh(s)?Fh(s):Nh(s,n);return i.length>0&&(r.progress=null),i}}}function cl(e){let t=[],n=Pd(),r=Array.isArray(e)?e:[];for(let o of r)for(let s of n.push(o))t.push(s);return t}var Wh=5,zh=10,Hh=/Task\s+#(\d+)/,Gh=/\bgh\s+pr\s+create\b|\bgit\s+push\b/,Kh=/\bnpm\s+(?:run\s+)?(?:test|tsc|lint|build)\b|\bvitest\b/;function Qo(e){return typeof e!="string"?"":(e.split(/\r?\n/).find(t=>t.trim().length>0)||"").trim()}function Yh(e){return typeof e!="string"||e.length===0?0:e.split(/\r?\n/).length}function Vh(e){for(let t=e.length-1;t>=0;t-=1){let n=e[t];if(n.kind==="phase"||n.kind==="gate")return n.text||null}return null}function Xh(e){let t=new Map,n=0;for(let o of e){if(o.kind!=="tool")continue;n+=1;let s=o.input||{};if(o.tool==="TaskCreate"){let a=Hh.exec(o.output||o.result||""),u=String(s.activeForm||s.subject||"").trim();if(!a||u.length===0)continue;t.set(a[1],{label:u,active:s.status==="in_progress"?n:0});continue}if(o.tool!=="TaskUpdate")continue;let i=t.get(String(s.taskId??""));if(!i)continue;let l=s.activeForm||s.subject;typeof l=="string"&&l.trim().length>0&&(i.label=l.trim()),typeof s.status=="string"&&(i.active=s.status==="in_progress"?n:0)}let r=null;for(let o of t.values())o.active>0&&(!r||o.active>r.active)&&(r=o);return r?r.label:null}function Qh(e){if(e.tool==="Bash"){let t=e.command||"";return Gh.test(t)?"~ PR/\uAC8C\uC2DC \uC911":Kh.test(t)?"~ \uAC80\uC99D \uC911":null}return e.tool==="Edit"||e.tool==="Write"||e.tool==="MultiEdit"?"~ \uAD6C\uD604 \uC911":e.tool==="Read"||e.tool==="Grep"||e.tool==="Glob"?"~ \uD0D0\uC0C9 \uC911":null}function Zh(e){let t=e.filter(o=>o.kind==="tool").slice(-zh),n=new Map;t.forEach((o,s)=>{let i=Qh(o);if(!i)return;let l=n.get(i)||{count:0,last:-1};l.count+=1,l.last=s,n.set(i,l)});let r=null;for(let[o,s]of n)(!r||s.count>r.count||s.count===r.count&&s.last>r.last)&&(r={label:o,count:s.count,last:s.last});return r?r.label:null}function Jh(e){let t=Vh(e);if(t)return{text:t,guess:!1};let n=Xh(e);if(n)return{text:n,guess:!1};let r=Zh(e);return r?{text:r,guess:!0}:null}function eb(e,t){if(typeof e!="number")return"";let n=Math.max(0,Math.floor((t-e)/1e3));return n<60?`${n}\uCD08 \uC804`:nn(e,t)}function so(e,t={}){let{transport:n,sessionLogStore:r,onClose:o}=t,s=null,i=null,l=null,a=null,u=null,d=!1,f={},b=!0,m=new Set,k=new Set,R=null,j=null,H=!1,oe=!1,X=!1,q=null,O=null;function I(){H=!1,oe=!1,X=!1,q=null,O=null}async function F(Q){if(n){oe=!0,X=!1,De();try{let U=await Promise.resolve(n("get-attempt-prompt",{attempt_id:Q,...u?{root_dir:u}:{}}));if(s!==Q)return;!U||typeof U!="object"||Array.isArray(U)?X=!0:(q=U,O=Q)}catch{s===Q&&(X=!0)}finally{s===Q&&(oe=!1,De())}}}function B(){if(H=!H,H&&s&&O!==s){F(s);return}De()}function ae(){if(!H)return"";let Q=oo({loading:oe,error:X});if(Q)return c`<div class="sv__prompt" data-seam="attempt-prompt">
        ${Q}
      </div>`;if(!q)return"";if(q.missing)return c`<div class="sv__prompt" data-seam="attempt-prompt">
        <div class="prompt-block__status">
          기록 없음 — 프롬프트 기록 이전에 실행된 attempt입니다
        </div>
      </div>`;let U=vi(q.recorded_at);return c`<div class="sv__prompt" data-seam="attempt-prompt">
      ${U?c`<div class="prompt-block__meta">${U} 발송</div>`:""}
      ${typeof q.task_prompt=="string"?Jn("\uACFC\uC5C5 (user)",q.task_prompt):""}
      ${typeof q.system_prompt=="string"?Jn("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",q.system_prompt):""}
    </div>`}function N(){if(!a||!r)return[];let Q=r.get(a);return cl(Q?Q.lines:[])}function W(){if(!a||!r)return null;let Q=r.get(a),U=Q?Q.last_event_at:null;return typeof U=="number"?U:null}function Z(){return f.status==="running"}function ee(){if(Z()&&s){j||(j=setInterval(()=>De(),1e3));return}Se()}function Se(){j&&(clearInterval(j),j=null)}function ge(Q){let U=[],Ne=0;for(;Ne<Q.length;){let{idx:ut,line:et}=Q[Ne];if(et.kind==="tool"){let v=Ne;for(;v<Q.length&&Q[v].line.kind==="tool"&&Q[v].line.tool===et.tool;)v+=1;if(v-Ne>=Wh&&!k.has(ut)){U.push({kind:"group",idx:ut,tool:et.tool||"",lines:Q.slice(Ne,v)}),Ne=v;continue}}U.push({kind:"line",idx:ut,line:et}),Ne+=1}return U}function ue(Q){let U=[],Ne=new Map;for(let v=0;v<Q.length;v+=1){let z=Q[v],Ee=z.parent_tool_use_id;if(typeof Ee=="string"&&Ee.length>0){let Ce=Ne.get(Ee);Ce||(Ce={kind:"subagent",idx:v,launch_id:Ee,agent_type:null,header:null,lines:[]},Ne.set(Ee,Ce),U.push(Ce)),Ce.lines.push({idx:v,line:z});continue}if(z.kind==="tool"&&z.tool==="Agent"&&typeof z.launch_id=="string"&&z.launch_id.length>0){let Ce=P(z),je=Ne.get(z.launch_id);if(je){je.header={idx:v,line:z},je.agent_type=Ce;continue}let Ve={kind:"subagent",idx:v,launch_id:z.launch_id,agent_type:Ce,header:{idx:v,line:z},lines:[]};Ne.set(z.launch_id,Ve),U.push(Ve);continue}U.push({kind:"entry",idx:v,line:z})}let ut=[],et=0;for(;et<U.length;){if(U[et].kind!=="entry"){ut.push(U[et]),et+=1;continue}let v=et;for(;v<U.length&&U[v].kind==="entry";)v+=1;ut.push(...ge(U.slice(et,v))),et=v}return ut}function P(Q){let U=Q.input;return U&&typeof U.subagent_type=="string"?U.subagent_type:null}function we(Q){for(let U=Q.length-1;U>=0;U-=1){let Ne=Q[U];if(Ne.kind==="result"||Ne.kind==="error")return null;if(Ne.kind==="tool"&&!Object.hasOwn(Ne,"result"))return Ne}return null}function xe(Q){for(let U=Q.length-1;U>=0;U-=1)if(Q[U].kind==="thinking")return Q[U];return null}function E(Q,U){if(U.kind==="gate")return c`<div class="sv__gate">${U.text}</div>`;if(U.kind==="phase")return c`<div class="sv__phase">${U.text}</div>`;if(U.kind==="result")return c`<div
        class="sv__result${U.success?" sv__result--ok":" sv__result--fail"}"
      >
        <span class="sv__result-glyph">${U.success?"\u2713":"\u2717"}</span>
        <span class="sv__result-body"
          >${lr(U.text||(U.success?"DONE":"\uC2E4\uD328"))}</span
        >
      </div>`;if(U.kind==="thinking"){let Ne=m.has(Q);return c`<div
        class="sv__think${Ne?" sv__think--expanded":""}"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>Ye(Q)}
      >
        <span class="sv__think-line">💭 ${Qo(U.text)}</span>
        ${Ne?c`<pre class="sv__think-expand">${U.text}</pre>`:""}
      </div>`}if(U.kind==="user"){let Ne=m.has(Q);return c`<div
        class="sv__line sv__line--user${Ne?" sv__line--expanded":""}"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>Ye(Q)}
      >
        <span class="sv__user-line">▷ ${Qo(U.text)}</span>
        ${Ne?c`<pre class="sv__user-expand">${U.text}</pre>`:""}
      </div>`}if(U.kind==="error")return c`<div class="sv__error">⛔ ${U.text}</div>`;if(U.kind==="blocker")return c`<div class="sv__error">⛔ ${U.text}</div>`;if(U.kind==="tool"){let Ne=m.has(Q),ut=U.tool==="Bash"?Yh(U.command):0,et=U.tool==="Bash"?ut>1?Qo(U.command):U.command:U.path||U.command||"";return c`<div
        class="sv__tool${Ne?" sv__tool--expanded":""}"
        role="button"
        tabindex="0"
        @click=${()=>Ye(Q)}
      >
        <span class="sv__tool-line">
          <span class="sv__tool-icon">${U.icon}</span>
          <span class="sv__tool-name">${U.tool}</span>
          ${et?c`<span class="sv__tool-detail">${et}</span>`:""}
          ${ut>1?c`<span class="sv__tool-more">⋯ ${ut}줄</span>`:""}
          ${typeof U.added=="number"?c`<span class="sv__diff-add">+${U.added}</span>`:""}
          ${typeof U.removed=="number"?c`<span class="sv__diff-del">−${U.removed}</span>`:""}
          ${U.result?c`<span class="sv__tool-ok">→ ${U.result}</span>`:""}
        </span>
        ${Ne?c`<pre class="sv__tool-expand">${J(U)}</pre>`:""}
      </div>`}return c`<div class="sv__as">${lr(U.text||"")}</div>`}function J(Q){let U=[];if(Q.tool==="Bash"&&typeof Q.command=="string"&&Q.command.length>0)U.push(Q.command);else if(Q.input!==void 0)try{U.push(`input: ${JSON.stringify(Q.input,null,2)}`)}catch{}return typeof Q.output=="string"&&Q.output.length>0&&U.push(`output:
${Q.output}`),U.join(`

`)}function Ae(){if(!s)return c``;let Q=N(),U=(i?[f.agent_type,f.model,f.effort]:[f.runner,f.model,f.effort]).filter(Boolean).join(" \xB7 "),Ne=f.session_id||"",ut=`\uB77C\uC774\uBE0C \uB530\uB77C\uAC00\uAE30 ${b?"ON":"OFF"}`,et=Z(),v=et?eb(W(),Date.now()):"",z=et?we(Q):null,Ee=et?xe(Q):null,Ce=Jh(Q);return c`<div class="sv" data-attempt-id=${s}>
      <div class="sv__bar">
        <span class="sv__id"
          >${f.label||(i?f.role||"":s)}</span
        >
        ${Ce?c`<span
              class="sv__stage${Ce.guess?" sv__stage--guess":""}"
              title=${Ce.text}
              >${Ce.text}</span
            >`:""}
        ${et?c`<span
              class="sv__live"
              title="세션이 진행 중입니다"
              aria-label=${v?`\uC9C4\uD589 \uC911 \xB7 \uB9C8\uC9C0\uB9C9 \uC774\uBCA4\uD2B8 ${v}`:"\uC9C4\uD589 \uC911"}
              ><span class="sv__live-dot" aria-hidden="true"></span>${v?c`<span class="sv__live-ago">${v}</span>`:""}</span
            >`:""}
        ${Ne?c`<button
              type="button"
              class="sv__session"
              title=${Ne}
              aria-label=${`\uC138\uC158 ID \uBCF5\uC0AC: ${Ne}`}
              @click=${()=>se(Ne)}
            >
              ⧉ ${Ne.slice(0,8)}
            </button>`:""}
        ${f.resume_command?c`<button
              type="button"
              class="sv__resume-cmd"
              title=${f.resume_command}
              aria-label=${`\uC7AC\uAC1C \uBA85\uB839 \uBCF5\uC0AC: ${f.resume_command}`}
              @click=${()=>se(f.resume_command||"")}
            >
              ⧉ 재개 명령
            </button>`:""}
        ${U?c`<span class="sv__meta">${U}</span>`:""}
        ${f.worktree?c`<span class="sv__wt" title=${f.worktree}
              >${f.worktree}</span
            >`:""}
        ${i||d?"":c`<button
              type="button"
              class="sv__prompt-toggle${H?" sv__prompt-toggle--on":""}"
              data-seam="attempt-prompt-toggle"
              aria-pressed=${H?"true":"false"}
              aria-label="발송 프롬프트 보기"
              title="이 세션에 실제로 보낸 시스템·과업 프롬프트"
              @click=${B}
            >
              ✉ 프롬프트
            </button>`}
        <button
          type="button"
          class="sv__follow${b?" sv__follow--on":""}"
          aria-pressed=${b?"true":"false"}
          aria-label=${ut}
          @click=${M}
        >
          <span class="sv__follow-full">⇣ ${ut}</span>
          <span class="sv__follow-short">⇣ ${b?"ON":"OFF"}</span>
        </button>
        <button
          type="button"
          class="sv__close"
          aria-label="닫기"
          @click=${()=>Pe()}
        >
          ✕
        </button>
      </div>
      ${i||d?"":ae()}
      <div class="sv__body">
        ${Q.length===0?c`<div class="sv__empty">세션 로그 없음</div>`:ue(Q).map(je=>je.kind==="subagent"?ke(je):je.kind==="group"?_e(je):E(je.idx,je.line))}
      </div>
      ${z||Ee?c`<div class="sv__now">
            <span class="sv__now-label">지금</span>
            ${z?c`<span class="sv__now-icon">${z.icon}</span>
                  <span class="sv__now-name">${z.tool}</span>
                  <span class="sv__now-detail"
                    >${z.tool==="Bash"?Qo(z.command):z.path||z.command||""}</span
                  >`:""}
            ${Ee?c`<span class="sv__now-think"
                  >💭 ${Qo(Ee.text)}</span
                >`:""}
          </div>`:""}
    </div>`}function _e(Q){return c`<div
      class="sv__group"
      role="button"
      tabindex="0"
      title="펼치기"
      @click=${()=>me(Q.idx)}
    >
      <span class="sv__group-icon">${Q.lines[0].line.icon}</span>
      <span class="sv__group-name">${Q.tool}</span>
      <span class="sv__group-count">${Q.lines.length}</span>
      <span class="sv__group-caret" aria-hidden="true">▸</span>
    </div>`}function ke(Q){let U=k.has(Q.idx),Ne=Q.header?Q.header.line:null,ut=Ne?Ne.is_error===!0?"\u2717":typeof Ne.result=="string"?"\u2713":"\u27F3":"",et=Ne&&Ne.command?Ne.command:"";return c`<div class="sv__sub${U?" sv__sub--open":""}">
      <div
        class="sv__sub-head"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>me(Q.idx)}
      >
        <span class="sv__sub-icon" aria-hidden="true">🤖</span>
        <span class="sv__sub-name">${Q.agent_type||"subagent"}</span>
        ${et?c`<span class="sv__sub-detail">${et}</span>`:""}
        <span class="sv__sub-count">${Q.lines.length}줄</span>
        ${ut?c`<span class="sv__sub-state">${ut}</span>`:""}
        ${U?"":c`<span class="sv__sub-caret" aria-hidden="true">▸</span>`}
      </div>
      ${U?c`<div class="sv__sub-body">
            ${ge(Q.lines).map(v=>v.kind==="group"?_e(v):E(v.idx,v.line))}
          </div>`:""}
    </div>`}function me(Q){k.add(Q),De()}function De(){st(Ae(),e),ee(),b&&ot()}function ot(){let Q=e.querySelector(".sv__body");Q&&(Q.scrollTop=Q.scrollHeight)}function Ye(Q){m.has(Q)?m.delete(Q):m.add(Q),De()}function M(){b=!b,De()}function se(Q){rn(Q).then(U=>{U?be("\uBCF5\uC0AC\uB428","success",1200):be("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function le(Q){!s||!Q||(f={...f,...Q},De())}function pe(Q){let U=Q.target;if(!U||!U.classList||!U.classList.contains("sv__body"))return;!(U.scrollHeight-U.scrollTop-U.clientHeight<=4)&&b&&(b=!1,De())}e.addEventListener("scroll",pe,!0);function he(Q){let U=Q.target;!U||typeof U.closest!="function"||e.contains(U)||U.closest("dialog")||U.closest(".md-viewer-root")||Pe()}let ce=!1;function Fe(){ce||(document.addEventListener("mousedown",he),ce=!0)}function Ge(){ce&&(document.removeEventListener("mousedown",he),ce=!1)}function Ze(Q){let U=Q&&Q.attempt_id;if(!U)return;let Ne=typeof Q.launch_id=="string"&&Q.launch_id.length>0?Q.launch_id:null,ut=Q.session_ref&&typeof Q.session_ref=="object"?Q.session_ref:null;if(Ne&&ut)return;let et=a;s=U,i=Ne,l=ut,a=i?`session-log:${s}:${i}`:`session-log:${s}`,n&&et&&et!==a&&Promise.resolve(n("unsubscribe-session-log",{id:et})).catch(()=>{}),u=typeof Q.root_dir=="string"&&Q.root_dir.length>0?Q.root_dir:null,f=Q.meta||{},d=Q.hide_prompt===!0,b=!0,m.clear(),k.clear(),I(),!R&&r&&(R=r.subscribe(De)),n&&Promise.resolve(n("subscribe-session-log",{id:a,attempt_id:s,...i?{launch_id:i}:{},...l?{session_ref:l}:{},...u?{root_dir:u}:{}})).catch(()=>{}),Fe(),De()}function Pe(){let Q=a;Ge(),s=null,i=null,l=null,a=null,u=null,d=!1,m.clear(),k.clear(),I(),Se(),n&&Q&&Promise.resolve(n("unsubscribe-session-log",{id:Q})).catch(()=>{}),st(c``,e),o&&o()}return{open:Ze,updateMeta:le,close:Pe,isOpen(){return s!==null},destroy(){Se(),Ge(),R&&(R(),R=null),e.removeEventListener("scroll",pe,!0),s=null,i=null,l=null,a=null,u=null,d=!1,st(c``,e)}}}function tb(e){return["plan_review","plan_approval","plan_check"].some(t=>{let n=e[t];return typeof n=="string"&&n.trim().length>0})}function nb(e){let t=e&&e.metadata||{},n=Pr(e),r=[];return n.path&&r.push({kind:"spec",path:n.path,missing_state:n.evidence==="draft"?"spec_draft":null}),typeof t.plan_path=="string"&&t.plan_path.trim().length>0&&r.push({kind:"plan",path:t.plan_path.trim(),missing_state:tb(t)?null:"plan_pending"}),r}function Nd(e,t){let n=nb(e);return c`
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
  `}var rb="## \u{1F916} \uC791\uC5C5 \uBCF4\uACE0\uC11C",ob=/^> (worker · attempt|session · sid) ([A-Za-z0-9._-]{1,64}) · (\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z)$/,sb=/^\*\*결론\*\* — (.+)$/;function wi(e){if(typeof e!="string"||e.length===0)return null;let t=e.split(/\r?\n/);if(t[0]!==rb)return null;let n=ob.exec(t[1]||"");if(!n)return null;let r=n[1].split(" ")[0],o=n[2],s=n[3],i=2;for(;i<t.length&&t[i].trim().length===0;)i+=1;let l=i<t.length?sb.exec(t[i]):null,a=l?l[1].replace(/\s+/g," ").trim():"",u=l?i+1:i;return{lane:r,identifier:o,timestamp:s,conclusion:a,body:t.slice(u).join(`
`).trim()}}var qd=20;function Fd(e){if(e==null||e==="")return"";let t=new Date(e);if(Number.isNaN(t.getTime()))return"";let n=String(t.getMonth()+1).padStart(2,"0"),r=String(t.getDate()).padStart(2,"0"),o=String(t.getHours()).padStart(2,"0"),s=String(t.getMinutes()).padStart(2,"0");return`${n}-${r} ${o}:${s}`}function ib(e){return e.length>qd?`${e.slice(0,qd)}\u2026`:e}function ab(e,t,n,r){let o=`${t.lane} ${ib(t.identifier)}`;return c`<div class="detail-report">
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
        <span class="detail-report__time">${Fd(t.timestamp)}</span>
      </span>
      <span class="detail-report__concl">${t.conclusion}</span>
    </button>
    ${r&&t.body.length>0?c`<div class="detail-report__body">
          ${lr(t.body)}
        </div>`:""}
  </div>`}function lb(e){return c`<div class="detail-comment" data-comment-id=${e.id}>
    <div class="detail-comment__meta">
      <span class="detail-comment__author"
        >${e.author||"(\uC791\uC131\uC790 \uC5C6\uC74C)"}</span
      >
      <span class="detail-comment__time"
        >${Fd(e.created_at)}</span
      >
    </div>
    <div class="detail-comment__body">
      ${lr(typeof e.text=="string"?e.text:"")}
    </div>
  </div>`}function jd(e,t={},n={}){let r=Array.isArray(e)?e.filter(Boolean):[],o=n.expanded||new Set,s=typeof n.draft=="string"?n.draft:"",i=n.sending===!0,l=r.slice().sort((a,u)=>String(u.created_at||"").localeCompare(String(a.created_at||"")));return c`
    <div class="detail-section-label">댓글 (${r.length})</div>
    ${n.error?c`<div class="detail-empty" data-seam="comments-error">
          댓글을 불러오지 못했습니다
        </div>`:l.length===0?c`<div class="detail-empty" data-seam="comments">댓글 없음</div>`:c`<div class="detail-comments" data-seam="comments">
            ${l.map(a=>{let u=wi(typeof a.text=="string"?a.text:"");return u?ab(a,u,t,o.has(a.id)):lb(a)})}
          </div>`}
    <div class="detail-comment-compose">
      <textarea
        class="detail-comment-compose__input"
        aria-label="댓글 추가"
        placeholder="댓글 추가"
        rows="3"
        ?disabled=${i}
        .value=${s}
        @input=${a=>t.onDraftInput&&t.onDraftInput(a.target.value)}
      ></textarea>
      <div class="detail-comment-compose__row">
        <button
          type="button"
          class="detail-comment-compose__btn"
          ?disabled=${i||s.trim().length===0}
          @click=${()=>t.onSubmit&&t.onSubmit()}
        >
          댓글 추가
        </button>
      </div>
    </div>
  `}var{I:$x}=ql;var Bd=e=>e.strings===void 0;var cb={},Ud=(e,t=cb)=>e._$AH=t;var Sr=pi(class extends ro{constructor(e){if(super(e),e.type!==Qn.PROPERTY&&e.type!==Qn.ATTRIBUTE&&e.type!==Qn.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!Bd(e))throw Error("`live` bindings can only contain a single expression")}render(e){return e}update(e,[t]){if(t===yn||t===Rt)return t;let n=e.element,r=e.name;if(e.type===Qn.PROPERTY){if(t===n[r])return yn}else if(e.type===Qn.BOOLEAN_ATTRIBUTE){if(!!t===n.hasAttribute(r))return yn}else if(e.type===Qn.ATTRIBUTE&&n.getAttribute(r)===t+"")return yn;return Ud(e),t}});var ub=[{id:"spec",label:"spec \uB9AC\uBDF0",receipt:"spec_review",receipt_stage:null,fill_stage:"spec",stale_stage:"spec",hue:"spec"},{id:"plan",label:"\uACC4\uD68D \uB9AC\uBDF0",receipt:null,receipt_stage:"plan",fill_stage:"plan",stale_stage:"plan",hue:"plan"},{id:"impl",label:"\uAD6C\uD604",receipt:null,receipt_stage:null,fill_stage:"impl",stale_stage:null,hue:"impl"},{id:"impl_review",label:"impl \uB9AC\uBDF0",receipt:"impl_review",receipt_stage:null,fill_stage:null,stale_stage:"impl",hue:"impl"},{id:"pr",label:"PR",receipt:null,receipt_stage:null,fill_stage:"pr",stale_stage:null,hue:"pr"}],ul={quick_fix:["impl","impl_review"],spec_backed:["spec","impl","impl_review","pr"],full_plan:["spec","plan","impl","impl_review","pr"]},Wd={missing:"\uC2B9\uC778 \uD544\uC694",stale:"\uC7AC\uC2B9\uC778 \uD544\uC694",unknown:"\uC2B9\uC778 \uD655\uC778 \uBD88\uAC00"},db={pin:"pin",global:"global",base:"base"};function pb(e){return c`<span
    class=${`detail-layer-rail detail-layer-rail--${db[e]}`}
    data-source=${e}
    aria-hidden="true"
    ><i></i><i></i><i></i
  ></span>`}function fb(e,t,n){switch(e){case"workflow_mode":return $o;case"spec_review_model":case"impl_review_model":return xo;case"plan_review_model":return Os;case"spec_review_effort":case"plan_review_effort":case"impl_review_effort":return Ls;case"impl_dispatch":return Gc;case"impl_runtime":return Rs;case"impl_model":return Vr(n,t.impl_runtime);case"impl_effort":return Xr(n,t.impl_runtime,t.impl_model);case"impl_speed":case"orchestration_speed":return ko;case"orchestration_model":return Ao(n,null);case"orchestration_effort":return Xr(n,void 0,t.orchestration_model||mn).filter(r=>r!==mn);default:return[]}}function _b(e,t){return c`<div class="detail-effective__row" data-key=${e.key}>
    ${pb(e.source)}
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
      >${Is[e.source]}</span
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
  </div>`}function zd(e,t){let n=pa.flatMap(a=>a.keys),r=fa(n,e.metadata,e.workspace_values,e.execution_defaults,e.catalog,e.controller_runtime||null),o=Jc(n,e.metadata,e.workspace_values,e.execution_defaults,e.catalog,e.controller_runtime||null),s=Object.fromEntries(r.map(a=>[a.key,a])),i=Object.fromEntries(r.filter(a=>a.value!==null).map(a=>[a.key,a.value])),l=r.filter(a=>a.full_value&&a.display!==a.full_value).map(a=>a.full_value).join(" \xB7 ");return c`<details
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
        >${mb(s)}</span
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
          ${pa.map(a=>c`
              <div class="detail-effective__subhead">${a.label}</div>
              ${r.filter(u=>a.keys.includes(u.key)).map(u=>{let d=Ss({key:u.key,choices:fb(u.key,i,e.catalog),layer:"pin",pin:e.metadata,global:e.workspace_values,execution_defaults:e.execution_defaults,runner_catalog:e.catalog,route:typeof e.metadata?.route=="string"?e.metadata.route:null,controller_runtime:e.controller_runtime||null});return _b(u,{expanded:e.expanded,options:d.options,default_label:d.unset_label,default_full_value:d.full_value,onEdit:t.onEdit})})}
            `)}
          <div class="detail-effective__foot">
            <select
              data-impl-preset-select
              aria-label="실행 프리셋"
              .value=${Sr(e.preset_id)}
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
              >세션 키 12개를 핀으로 기록</span
            >
            ${(e.skipped_orchestration_keys||[]).length>0?c`<span
                  class="detail-effective__hint"
                  data-preset-skip-notice
                  >오케스트레이션 3키는 Bead에 핀할 수 없어 건너뜀</span
                >`:""}
          </div>
        </div>`:""}
  </details>`}function mb(e){let t=[];if(e.workflow_mode&&t.push(e.workflow_mode.display),e.impl_dispatch?.value==="main")t.push("\uBA54\uC778");else if(e.impl_dispatch?.value==="delegated"){let n=e.impl_runtime?` ${e.impl_runtime.display}`:"";t.push(`\uC704\uC784${n}`)}for(let n of["impl_model","impl_effort","impl_speed"])e[n]?.resolution!=="not_applicable"&&t.push(e[n]?.display||"\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00");return t.join(" \xB7 ")}function gb(e){if(!e||typeof e!="object")return null;let{kind:t,actor:n,effort:r,sha:o}=e;return typeof t!="string"||typeof n!="string"||typeof o!="string"?null:{kind:t,actor:n,effort:typeof r=="string"?r:null,sha:o}}function Hd(e,t={}){let n=e&&typeof e.metadata=="object"&&e.metadata?e.metadata:{},r=e&&typeof e.workflow=="object"&&e.workflow?e.workflow:{},o=r.stages||{},s=r.route||n.route||null,i=typeof n.pr_url=="string"?n.pr_url:"",l=typeof n.exec_receipt=="string"?n.exec_receipt:"",a=gb(r.exec_receipt),u=a?Wn(a):l,d=a?`${a.kind}:${a.actor}`:l.split("@")[0],f=xs(r.planned_execution,r.exec_receipt),b=r.chips?.pr?.number,m=typeof b=="number"?`PR #${b}`:"PR",k=Eo(n),R=k!==null&&t.isChipOpen?.("rec")===!0,j=R?xa({rec:k},"rec"):null;return c`<section class="detail-summary" data-seam="detail-summary">
    <div class="detail-summary__chips">
      <span class="detail-summary__chip detail-summary__chip--status"
        >${e?.status||"\u2014"}</span
      >
      ${s?c`<span class="detail-summary__chip detail-summary__chip--route"
            >${s}</span
          >`:""}
      ${n.workflow_mode==="fast_track"?c`<span class="detail-summary__chip detail-summary__chip--mode"
            >fast_track</span
          >`:""}
      ${i?c`<a
            class="detail-summary__chip detail-summary__chip--pr"
            href=${i}
            target="_blank"
            rel="noreferrer"
            >${m}</a
          >`:""}
      ${f?c`<span
            class="detail-summary__chip detail-summary__chip--planned ctl-chip--planned"
            data-kind=${f.kind}
            title=${f.title}
            >${f.label}</span
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
            aria-expanded=${R?"true":"false"}
            title=${Ps(k)}
            @click=${()=>t.onChipToggle?.("rec")}
          >
            ${"\uBCF5\uC7A1"}
          </button>`:""}
    </div>
    ${j?Kr(j):""}
    <div
      class="detail-summary__gates"
      role="group"
      aria-label="워크플로 게이트"
    >
      ${hb(s).map(H=>bb(H,n,o,{label:H.id==="pr"?m:H.label,href:H.id==="pr"?i:""}))}
    </div>
  </section>`}function hb(e){let n=typeof e=="string"&&Object.hasOwn(ul,e)&&ul[e]||ul.spec_backed;return ub.filter(r=>n.includes(r.id))}var ki={on:"\uD1B5\uACFC",stale:"\uC7AC\uAC80\uD1A0 \uD544\uC694",current:"\uC9C4\uD589 \uC911",none:"\uBBF8\uB3C4\uB2EC"};function bb(e,t,n,r){let o=yb(e,t,n),s=e.fill_stage?n[e.fill_stage]:null,i=typeof s?.fill=="string"?s.fill:null,l=i?i==="full":o.length>0,a=!l&&i==="dim",u=e.stale_stage?n[e.stale_stage]?.stale===!0:!1,d=o&&o.split("@")[1]?.slice(0,7)||"",f=u?ki.stale:l?ki.on:a?ki.current:ki.none,b=vb(e,n),m=`${r.label} \xB7 ${f}${b?` \xB7 ${b}`:""}${o?` \xB7 ${o}`:""}`,k=`detail-summary__gate${l?" detail-summary__gate--on":""}${a?" detail-summary__gate--current":""}${u?" detail-summary__gate--stale":""}${d?" detail-summary__gate--receipt":""}`,R=c`<span class="detail-summary__gate-label"
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
      title=${m}
      >${R}</a
    >`:c`<span
    class=${k}
    data-gate=${e.id}
    data-hue=${e.hue}
    title=${m}
    >${R}</span
  >`}function yb(e,t,n){if(e.receipt&&typeof t[e.receipt]=="string")return String(t[e.receipt]);if(e.receipt_stage){let r=n[e.receipt_stage]?.receipt;return typeof r=="string"?r:""}return""}function vb(e,t){if(e.id!=="plan")return"";let n=t.plan?.approval_state;return typeof n=="string"&&Object.hasOwn(Wd,n)?Wd[n]:""}function $i(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function Gd(e){return $i(e)&&typeof e.key=="string"&&e.key.length>0&&typeof e.email=="string"&&e.email.length>0}function Kd(e,t){let n=e&&e[t];if(!$i(n)||!Array.isArray(n.accounts))return null;let r=n.accounts.filter(Gd),o=Gd(n.active)?n.active:null;return{accounts:r,active:o||r.find(s=>s.active===!0)||null}}function Xd(e){return typeof e.alias=="string"&&e.alias.length>0?` (${e.alias})`:""}function xi(e){let t=typeof e.status=="string"&&e.status!=="ok"?` \xB7 ${e.status}`:"";return`${e.email}${Xd(e)}${t}`}function io(e){let t=typeof e.plan=="string"&&e.plan.length>0?e.plan:"plan \uD655\uC778 \uBD88\uAC00";return`${e.email} \xB7 ${t}${Xd(e)}`}function wb(e,t,n){if(n!==null){let o=e==="claude"?xi:io,s=t?t.accounts.find(i=>i.key===n):void 0;return`\uB808\uD3EC \uAE30\uBCF8\uAC12 \uC0AC\uC6A9(${s?o(s):n})`}return t?t.active?`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(${e==="claude"?t.active.email:io({...t.active,alias:null})})`:"\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(\uD655\uC778 \uBD88\uAC00)":"(\uAE30\uBCF8)"}function Yd(e,t){if(!$i(e)||e.state!=="usable"||!$i(e.values))return null;let n=e.values[t];return typeof n=="string"&&n.length>0?n:null}function Vd(e){let t=e.provider_key==="claude"?xi:io,n=!!e.provider?.accounts.some(r=>r.key===e.selected);return c`<div class="detail-kv" data-exec-account-row=${e.key}>
    <span class="detail-kv__k">${e.title}</span>
    <span class="detail-kv__vgroup">
      <select
        class=${e.selected?"detail-kv__v detail-kv__v--sel":"detail-kv__v"}
        aria-label=${e.title}
        data-exec-key=${e.key}
        @change=${r=>e.handlers.onExecChange(e.key,r.target.value)}
      >
        <option value="" ?selected=${e.selected.length===0}>
          ${wb(e.provider_key,e.provider,e.workspace_default)}
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
  </div>`}function Qd({md:e,catalog:t,workspace_defaults:n=null,handlers:r}){let o=typeof e.claude_account=="string"?e.claude_account:"",s=typeof e.codex_account=="string"?e.codex_account:"";return c`<section class="exec-accounts" data-exec-accounts>
    <div class="detail-section-label">실행 계정</div>
    <div class="exec-settings-core">
      ${Vd({key:"claude_account",title:"Claude \uACC4\uC815",provider_key:"claude",provider:Kd(t,"claude"),selected:o,workspace_default:Yd(n,"claude_account"),handlers:r,hint:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uB7F0\uD0C0\uC784\uC774 claude\uC77C \uB54C \uC801\uC6A9\uB429\uB2C8\uB2E4"})}
      ${Vd({key:"codex_account",title:"Codex \uACC4\uC815",provider_key:"codex",provider:Kd(t,"codex"),selected:s,workspace_default:Yd(n,"codex_account"),handlers:r})}
    </div>
  </section>`}function kb(e){return String(e||"").replace(/^docs\/(superpowers\/)?/,"")}function $b(e){let t=/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(e);if(!t)return{front:null,body:e};let n=t[1].trim();return{front:n.length>0?n:null,body:e.slice(t[0].length)}}function Ai(e,t){let n=t.getWorkspacePath,r=t.fetchImpl||globalThis.fetch?.bind(globalThis),o=null,s="loading",i="",l=null,a="";function u(R){R.key==="Escape"&&o&&(R.preventDefault(),m())}document.addEventListener("keydown",u);function d(){return o?c`
      <div class="mv-overlay" role="dialog" aria-modal="true">
        <div class="mv-overlay__backdrop" @click=${()=>m()}></div>
        <div class="mv">
          <div class="mv__bar">
            <span class="mv__path" title=${o}
              >${kb(o)}</span
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
            ${s==="loading"?c`<div class="mv__status">불러오는 중…</div>`:s==="pending"?c`<div class="mv__status">${a}</div>`:s==="error"?c`<div class="mv__status mv__status--error">
                      ${a||"\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"}
                    </div>`:c`${l===null?null:c`<pre class="mv__front">
${l}</pre
                        >`}${lr(i)}`}
          </div>
        </div>
      </div>
    `:c``}function f(){st(d(),e)}async function b(R,j={}){o=R,s="loading",i="",l=null,a="",f();let H=j.workspace||(n?n():"");if(!H){s="error",a="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4",f();return}if(!r){s="error",a="fetch\uB97C \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",f();return}let oe="/api/doc?workspace="+encodeURIComponent(H)+"&path="+encodeURIComponent(R);try{let X=await r(oe),q=await X.json().catch(()=>({}));if(!X.ok||!q||q.ok!==!0){if(q?.error==="not_found"&&j.missing_state==="plan_pending"){s="pending",a="\uACC4\uD68D \uC791\uC131 \uC804 \xB7 \uACBD\uB85C\uB9CC \uC608\uC57D\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4",f();return}s="error",a="\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 ("+String(q&&q.error||X.status)+")",f();return}let O=$b(String(q.content||""));l=O.front,i=O.body,s="ready",f()}catch{s="error",a="\uBB38\uC11C \uC694\uCCAD \uC2E4\uD328",f()}}function m(){o=null,st(c``,e)}function k(){document.removeEventListener("keydown",u),m()}return{open:b,close:m,destroy:k}}var xb=[{key:"input_tokens",label:"\uC785\uB825"},{key:"output_tokens",label:"\uCD9C\uB825"},{key:"cache_read_input_tokens",label:"\uCE90\uC2DC \uC77D\uAE30"}],ep="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4",Si=[{role:"implementation",provider:"codex"},{role:"review-consult",provider:"codex"},{role:"subagent",provider:"claude"}],Ab=new Set(["codex-runner","Explore","Plan","advisor","advisor-xhigh","claude-code-guide","statusline-setup"]);function Zd(e){return typeof e=="string"&&Ab.has(e)}var Sb=["running","done","failed","interrupted"],Eb={running:"\u25CF",done:"\u2713",failed:"\u2717",interrupted:"\u26A0"};function Tb(e){return typeof e=="number"&&Number.isFinite(e)?e:0}function Cb(e){let t=Qt(e);if(t.length>0)return t.map(o=>c`<span class="detail-usage-total" title=${o.tooltip}
          >${o.label}</span
        >`);let n=Hr(e);if(!n||!e)return"";let r=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?` \xB7 $${e.total_cost_usd.toFixed(2)}`:"";return c`<span
      class="detail-usage-total"
      title="이 이슈의 모든 attempt 토큰 합계 (입력+출력+캐시)"
      >${n.replace(/^τ /,"\u03C4 \uCD1D ")}${r}</span
    >${e.replayed?c`<span class="detail-usage-partial" title=${ep}
          >부분 집계</span
        >`:""}`}function Jd(e){return!e||!e.roles.orchestrator?null:{providers:e.roles.orchestrator,roles:{}}}function fl(e){if(typeof e=="number")return Zo(e);if(typeof e!="string")return"";let t=Date.parse(e);return Number.isFinite(t)?Zo(t):""}function Rb(e){return typeof e=="string"?e.replace(/-\d{8}$/,""):""}function Ob(e,t){if(e.provider!=="claude")return{text:e.session_id.slice(0,8),title:e.session_id};let n=t&&typeof t.agent_id=="string"?t.agent_id:"";return n.length>0?{text:n.slice(0,8),title:n}:{text:e.launch_id.slice(-8),title:e.launch_id}}function dl(e){return e===null||typeof e=="string"&&e.trim().length>0}function pl(e){return e===null||typeof e=="number"&&Number.isFinite(e)}function Lb(e){if(!e||typeof e!="object"||Array.isArray(e))return null;let t=e,n=t.provider==="claude";return typeof t.launch_id!="string"||t.launch_id.length===0||!Si.some(r=>r.role===t.role&&r.provider===t.provider)||!(n?dl(t.model):typeof t.model=="string"&&t.model.length>0)||!(!("effort"in t)||dl(t.effort))||!(!("agent_type"in t)||dl(t.agent_type))||typeof t.session_id!="string"||t.session_id.length===0||!Sb.includes(t.status)||!(t.turn_id===null||typeof t.turn_id=="string")?null:n?!pl(t.started_at)||!pl(t.last_event_at)||!pl(t.completed_at)?null:t:typeof t.started_at!="number"||!Number.isFinite(t.started_at)||typeof t.last_event_at!="number"||!Number.isFinite(t.last_event_at)||!(t.completed_at===null||typeof t.completed_at=="string"&&Number.isFinite(Date.parse(t.completed_at)))?null:t}function Ib(e,t,n){let o=Qt({providers:{[t]:{subtotal:n.subtotal,breakdown:n.usage,...n.replayed?{replayed:!0}:{}}},roles:{}})[0];return c`<div class="detail-session__leg detail-session__usage-detail">
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
    ${fl(n.completed_at)?c`<span class="detail-session__leg-time detail-session__time"
          >${fl(n.completed_at)}</span
        >`:""}
    ${o?c`<span class="detail-session__usage" title=${o.tooltip}
          >${o.label}</span
        >`:""}
  </div>`}function Mb(e,t,n,r){let o=e.status==="running"?null:t,i=(o?Qt({providers:{[e.provider]:{subtotal:o.subtotal,breakdown:o.usage,...o.replayed?{replayed:!0}:{}}},roles:{}}):[])[0],l=e.status==="running"?Zo(e.last_event_at):o?fl(o.completed_at):"",a=(e.provider==="claude"?["Claude",e.agent_type,Rb(e.model),e.effort]:["codex",e.model,e.effort]).filter(Boolean).join(" \xB7 "),u=Ob(e,o);return c`<button
    type="button"
    class="detail-session__leg detail-session__usage-detail detail-session__leg--${e.status}"
    data-launch-id=${e.launch_id}
    @click=${()=>r.onOpenDelegation&&r.onOpenDelegation(n,e.launch_id)}
  >
    <span class="detail-session__leg-glyph" aria-hidden="true"
      >${Eb[e.status]}</span
    >
    <span class="detail-session__leg-role detail-session__usage-label"
      >${e.role}</span
    >
    <span class="detail-session__leg-meta detail-session__usage-value"
      >${a}</span
    >
    <span
      class="detail-session__leg-sid detail-session__sid"
      title=${u.title}
      >${u.text}</span
    >
    ${l?c`<span class="detail-session__leg-time detail-session__time"
          >${l}</span
        >`:""}
    ${i?c`<span class="detail-session__usage" title=${i.tooltip}
          >${i.label}</span
        >`:""}
  </button>`}function Db(e,t){return e.role===t.role&&(e.model===null||t.model===void 0||e.model===t.model)&&e.session_id===t.session_id}function Pb(e,t,n){let r=[],o=new Set,s=Array.isArray(e.delegation_sessions)?e.delegation_sessions:[];for(let d of s){let f=Lb(d);!f||o.has(f.launch_id)||Zd(f.agent_type)||(o.add(f.launch_id),r.push(f))}r.sort((d,f)=>(d.started_at||0)-(f.started_at||0));let i={};for(let{role:d,provider:f}of Si){let b=t?t.roles[d]?.[f]:null;i[d]=b?[...b.legs]:[]}let l=Si.flatMap(({role:d})=>i[d]),a=new Set,u=[];for(let{role:d,provider:f}of Si){for(let b of r.filter(m=>m.role===d&&m.provider===f)){let m=l.find(k=>k.receipt_id===b.launch_id)||null;m&&!Db(b,m)||(m&&a.add(m.receipt_id),u.push(Mb(b,m,e.attempt_id,n)))}for(let b of i[d])!a.has(b.receipt_id)&&!Zd(b.agent_type)&&u.push(Ib(d,f,b))}return u}function Nb(e,t){let n=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?e.total_cost_usd:null,r=[...xb,{key:"cache_creation_input_tokens",label:t==="codex"?"\uCE90\uC2DC \uC4F0\uAE30":"\uCE90\uC2DC \uC0DD\uC131"},...t==="codex"&&typeof e.reasoning_output_tokens=="number"&&Number.isFinite(e.reasoning_output_tokens)?[{key:"reasoning_output_tokens",label:"\uCD94\uB860 \uCD9C\uB825"}]:[]];return c`<div class="detail-session__usage-detail">
    ${r.map(o=>c`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">${o.label}</span
          ><span class="detail-session__usage-value"
            >${Tb(e[o.key]).toLocaleString("en-US")}</span
          ></span
        >`)}
    ${n===null?"":c`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">비용</span
          ><span class="detail-session__usage-value"
            >$${n.toFixed(2)}</span
          ></span
        >`}
    ${e.replayed?c`<span class="detail-session__usage-note">${ep}</span>`:""}
  </div>`}var qb={running:"\u25CF",done:"\u2713",failed:"\u2717",orphaned:"\u26A0"};function Zo(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),n=String(t.getHours()).padStart(2,"0"),r=String(t.getMinutes()).padStart(2,"0");return`${n}:${r}`}function Fb(e){if(typeof e.exec_default_preset_id!="string"||e.exec_default_preset_id.length===0)return"";let t=e.exec_values&&typeof e.exec_values=="object"?Object.entries(e.exec_values).filter(([,r])=>typeof r=="string"&&r.length>0).map(([r,o])=>`${r}=${o}`).join(" \xB7 "):"",n=typeof e.exec_default_preset_revision=="number"?` r${e.exec_default_preset_revision}`:"";return c`<div
    class="detail-session__preset-audit"
    data-attempt-preset-audit
  >
    <strong>외부 실행 preset</strong>
    <span>${e.exec_default_preset_id}${n}</span>
    ${t?c`<small>${t}</small>`:""}
    <small>내부 workflow 실행 영수증과 별도 기록</small>
  </div>`}var jb={remote:"\uB2E4\uB978 \uBA38\uC2E0 \uC138\uC158 \u2014 \uC774 \uC11C\uBC84\uC5D0 transcript \uC5C6\uC74C",missing:"transcript \uD30C\uC77C \uC5C6\uC74C"};function Bb(e,t){let n=jb[e.locality]||"",r=e.locality==="remote"?`${e.host} \xB7 \uB2E4\uB978 \uBA38\uC2E0`:e.locality==="missing"?`${e.host} \xB7 \uD30C\uC77C \uC5C6\uC74C`:e.host;return c`<div class="detail-session-row">
    <button
      type="button"
      class="detail-session detail-session--session"
      data-session-key=${ra(e)}
      ?disabled=${n.length>0}
      title=${n}
      @click=${()=>{n.length===0&&t.onOpenSessionRef&&t.onOpenSessionRef(e)}}
    >
      <span class="detail-session__glyph">${e.current?"\u25D0":"\xB7"}</span>
      <span class="detail-session__id">${vo(e)}</span>
      <span class="detail-session__meta">${r}</span>
      <span class="detail-session__sid" title=${e.session_id}
        >${e.session_id.slice(0,8)}</span
      >
      <span class="detail-session__time">${Zo(e.last_event_at)}</span>
    </button>
    ${e.resume_command?c`<button
          type="button"
          class="detail-session__resume-cmd"
          title=${e.resume_command}
          @click=${o=>{o.stopPropagation(),t.onCopyResumeCommand&&e.resume_command&&t.onCopyResumeCommand(e.resume_command)}}
        >
          ⧉ 재개
        </button>`:""}
  </div>`}function tp(e,t={},n={},r=[]){let o=Array.isArray(e)?e:[],s=Array.isArray(r)?r:[],i=[...s.filter(m=>m&&m.current===!0),...s.filter(m=>m&&m.current!==!0).sort((m,k)=>k.index-m.index)],l=i.map(m=>Bb(m,t)),a=n.expanded||new Set;if(o.length===0&&i.length===0)return c`
      <div class="detail-section-label">세션 이력</div>
      <div class="detail-empty" data-seam="session-history">세션 이력 없음</div>
    `;let u=new Set;for(let m of o)m&&typeof m.resumed_from=="string"&&m.resumed_from.length>0&&u.add(m.resumed_from);let d=m=>{if(!(m.status==="failed"||m.status==="orphaned"))return"";let R=typeof m.session_id=="string"&&m.session_id.length>0,j=u.has(m.attempt_id),H=R&&!j,oe=R?j?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":"\uC774 \uC138\uC158\uC744 \uAC19\uC740 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C \uC774\uC5B4\uC11C \uC9C4\uD589":"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00";return c`<button
      type="button"
      class="detail-session__resume"
      data-attempt-id=${m.attempt_id}
      ?disabled=${!H}
      title=${oe}
      @click=${X=>{X.stopPropagation(),H&&t.onResume&&t.onResume(m.attempt_id)}}
    >
      ↻ 이어하기
    </button>`},f=m=>{if(!(m.status==="failed"||m.status==="orphaned")||typeof m.cause!="string"||m.cause==="")return"";let R=m.cause_detail,j=R&&typeof R.reason=="string"&&R.reason.length>0?typeof R.command=="string"&&R.command.length>0?`${R.reason} \xB7 ${R.command}`:R.reason:m.cause;return c`<div class="detail-session__cause" title=${j}>
      ${m.cause}
    </div>`},b=m=>{let k=Jd(aa(m));if(Qt(k).length===0&&!Hr(m.usage))return"";let R=a.has(m.attempt_id);return c`<button
      type="button"
      class="detail-session__usage-toggle"
      data-attempt-id=${m.attempt_id}
      aria-expanded=${R?"true":"false"}
      title=${R?"\uD1A0\uD070 \uB0B4\uC5ED \uC811\uAE30":"\uD1A0\uD070 \uB0B4\uC5ED \uD3BC\uCE58\uAE30"}
      @click=${j=>{j.stopPropagation(),t.onToggleUsage&&t.onToggleUsage(m.attempt_id)}}
    >
      τ 자세히
    </button>`};return c`
    <div class="detail-section-label">
      세션 이력${Cb(n.total)}
    </div>
    <div class="detail-sessions" data-seam="session-history">
      ${l}${o.map(m=>{let k=aa(m),R=Jd(k),j=Qt(R);return c`<div class="detail-session-row">
          <button
            type="button"
            class="detail-session detail-session--${m.status||"unknown"}"
            data-attempt-id=${m.attempt_id}
            @click=${()=>t.onOpen&&t.onOpen(m.attempt_id)}
          >
            <span class="detail-session__glyph"
              >${qb[m.status||""]||"\xB7"}</span
            >
            <span class="detail-session__id">${m.attempt_id}</span>
            ${bo(m)?c`<span
                  class="detail-session__resumed"
                  title=${bo(m)}
                  >↻</span
                >`:""}
            <span class="detail-session__meta">${vr(m)}</span>
            ${j.length>0?c`<span class="detail-session__role">orchestrator</span>`:""}
            ${m.session_id?c`<span class="detail-session__sid" title=${m.session_id}
                  >${String(m.session_id).slice(0,8)}</span
                >`:""}
            ${j.length>0?j.map(H=>c`<span
                      class="detail-session__usage"
                      title=${H.tooltip}
                      >${H.label}</span
                    >`):Hr(m.usage)?c`<span class="detail-session__usage"
                    >${Hr(m.usage)}</span
                  >`:""}
            <span class="detail-session__time">${Zo(m.started_at)}</span>
          </button>
          ${b(m)} ${d(m)} ${f(m)} ${Fb(m)}
          ${a.has(m.attempt_id)&&m.usage?Nb(m.usage,m.runner==="codex"?"codex":"claude"):""}
          ${Pb(m,k,t)}
        </div>`})}
    </div>
  `}function np(e,t={}){return c`
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
          ${Ub(e)}
        </div>`:""}
  `}function Ub(e){let t=oo(e);if(t)return t;let n=e.data;if(!n)return"";if(n.missing)return c`<div class="detail-prompt__missing">
        기록 없음 — 아직 이 이슈로 디스패치된 세션이 없습니다. 아래는 다음
        디스패치가 보낼 기본 과업입니다.
      </div>
      ${typeof n.default_task_prompt=="string"?Jn("\uC608\uC0C1 \uAE30\uBCF8 \uACFC\uC5C5",n.default_task_prompt):""}`;let r=vi(n.recorded_at);return c`<div class="detail-prompt__meta">
      ${n.attempt_id}${r?` \xB7 ${r}`:""}
    </div>
    ${typeof n.task_prompt=="string"?Jn("\uACFC\uC5C5 (user)",n.task_prompt):""}
    ${typeof n.system_prompt=="string"?Jn("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",n.system_prompt):""}`}var Er=10;function rp(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),n=r=>String(r).padStart(2,"0");return`${n(t.getMonth()+1)}-${n(t.getDate())} ${n(t.getHours())}:${n(t.getMinutes())}`}function op(e,t={}){let r=(Array.isArray(e?.events)?e.events:[]).filter(l=>l&&typeof l.summary=="string"&&l.summary.trim().length>0);if(r.length===0)return"";let o=typeof e.shown=="number"&&e.shown>0?e.shown:Er,s=r.slice(0,o),i=r.length-s.length;return c`
    <div class="detail-section-label">Worker 이력 (${r.length})</div>
    <ol class="detail-timeline" data-seam="worker-timeline">
      ${s.map(l=>c`<li class="detail-timeline__row">
            ${rp(l.at)?c`<span class="detail-timeline__at"
                  >${rp(l.at)}</span
                >`:""}
            <span class="detail-timeline__summary">${l.summary}</span>
          </li>`)}
    </ol>
    ${i>0?c`<button
          type="button"
          class="detail-timeline__more"
          data-seam="worker-timeline-more"
          @click=${()=>t.onMore&&t.onMore()}
        >
          더 보기 (${i})
        </button>`:""}
  `}var Wb=["open","in_progress","deferred","resolved","closed"],zb=[0,1,2,3,4];function sp(e,t){let n=t.issueStores,r=t.onClose,o=t.transport,s=t.onNavigate,i=t.queueStore,l=t.execPresetStore,a=t.sessionLogStore,u=null,d=null,f={},b="",m=!1,k=[],R=!1,j={},H={claude:null,codex:null},oe=null,X=null,q=0,O=!1,I=!1,F="",B="",ae="",N="",W=!1;function Z(){O=!1,I=!1,F="",B="",ae="",N="",W=!1}function ee(){H={claude:null,codex:null},oe=null,X=null,q+=1}async function Se(){if(!o)return null;try{let w=await Promise.resolve(o("get-workspace-accounts",{}));return w&&typeof w.state=="string"?w:null}catch{return null}}async function ge(w){try{let D=await fetch(w);if(!D.ok)return null;let G=await D.json();if(!G||typeof G!="object"||!Array.isArray(G.accounts))return null;let ve=G.accounts.filter(nt=>nt!==null&&typeof nt=="object"&&!Array.isArray(nt));return{accounts:ve,active:ve.find(nt=>nt.active===!0)||null}}catch{return null}}async function ue(w){X=w;let D=++q,[G,ve,nt]=await Promise.all([ge("/api/claude-usage"),ge("/api/codex-usage"),Se()]);D!==q||w!==u||(H={claude:G,codex:ve},oe=nt,at())}let P=[],we=null,xe=null,E=!1,J="",Ae=!1,_e=0,ke=new Set;function me(){P=[],we=null,xe=null,E=!1,J="",Ae=!1,_e+=1,ke.clear()}async function De(w){if(!o)return;let D=++_e;try{let G=await Promise.resolve(o("get-comments",{id:w}));if(D!==_e||w!==u)return;P=Array.isArray(G)?G:[],E=!1}catch{if(D!==_e||w!==u)return;E=!0}at()}function ot(){if(!o||!u)return;let w=d&&typeof d.comment_count=="number"?d.comment_count:null;if(we!==u){we=u,xe=w,De(u);return}w!==null&&w!==xe&&(xe=w,De(u))}function Ye(w){ke.has(w)?ke.delete(w):ke.add(w),at()}function M(w){let D=J.trim().length===0;J=w,D!==(w.trim().length===0)&&at()}async function se(){let w=J.trim();if(!o||!u||w.length===0||Ae)return;let D=u;Ae=!0,at();let G=!1;try{let ve=await Promise.resolve(o("add-comment",{id:D,text:w}));Array.isArray(ve)&&ve.length>0&&(G=!0,D===u&&(P=ve,E=!1,J="",xe=ve.length))}catch{G=!1}G||be("\uB313\uAE00 \uCD94\uAC00 \uC2E4\uD328","error"),D===u&&(Ae=!1),at()}let le={onToggle:Ye,onDraftInput:M,onSubmit:se},pe=t.mdViewer||null,he=null;pe||(he=document.createElement("div"),he.className="md-viewer-root",document.body.appendChild(he));let ce=pe||Ai(he,{getWorkspacePath:t.getWorkspacePath||(()=>"")}),Fe=document.createElement("div");Fe.className="session-log-root",document.body.appendChild(Fe);let Ge=so(Fe,{transport:o?(w,D)=>Promise.resolve(o(w,D)):void 0,sessionLogStore:a}),Ze=!1,Pe=!1,Q=!1,U=null,Ne=null,ut=0;function et(w){return`${t.getWorkspacePath&&t.getWorkspacePath()||""}::${w}`}function v(){Ze=!1,Pe=!1,Q=!1,U=null,Ne=null,ut+=1}async function z(w){if(!o)return;let D=++ut;Pe=!0,Q=!1,at();try{let G=await Promise.resolve(o("get-bead-prompt",{bead_id:w}));if(D!==ut)return;!G||typeof G!="object"||Array.isArray(G)?Q=!0:(U=G,Ne=et(w))}catch{D===ut&&(Q=!0)}finally{D===ut&&(Pe=!1,at())}}let Ee=[],Ce=null,je=0;function Ve(w,D){return`${t.getWorkspacePath&&t.getWorkspacePath()||""}::${w}::${D}`}function pt(){Ee=[],Ce=null,je+=1}async function kt(w,D){if(!o)return;let G=++je,ve;try{ve=await Promise.resolve(o("get-session-refs",{bead_id:w}))}catch{ve=null}G!==je||D!==Ce||(Ee=ve&&Array.isArray(ve.sessions)?ve.sessions:[],at())}function Lt(){if(!o||!u)return;let w=d&&d.metadata,D=w&&typeof w=="object"&&typeof w.session_ref=="string"?w.session_ref:null;if(D===null){pt();return}let G=Ve(u,D);Ce!==G&&(Ee=[],Ce=G,kt(u,G))}let $t=[],_t=[],Be=Er,L=null,te=0;function ye(w){return`${t.getWorkspacePath&&t.getWorkspacePath()||""}::${w}`}function T(){$t=[],_t=[],Be=Er,L=null,te+=1}async function K(w,D){if(!o)return;let G=++te,ve;try{ve=await Promise.resolve(o("get-bead-timeline",{bead_id:w}))}catch{ve=null}G!==te||D!==L||($t=ve&&Array.isArray(ve.events)?ve.events:[],_t=ve&&Array.isArray(ve.attempts)?ve.attempts:[],Be=Er,at())}function Ie(){if(!o||!u)return;let w=ye(u);L!==w&&($t=[],_t=[],Be=Er,L=w,K(u,w))}function Ue(){Be+=Er,at()}function qe(){if(Ze=!Ze,Ze&&u&&Ne!==et(u)){U=null,z(u);return}at()}function tt(){let w={};for(let G of _t)G&&typeof G=="object"&&G.bead_id===u&&(w[String(G.attempt_id)]=G);let D=i?i.get():null;for(let G of D&&D.attempts?Object.values(D.attempts):[]){let ve=G;ve&&ve.bead_id===u&&(w[String(ve.attempt_id)]=ve)}return w}function Oe(){return u?Object.values(tt()).sort((D,G)=>(G.started_at||0)-(D.started_at||0)).map(D=>({attempt_id:D.attempt_id,bead_id:D.bead_id,status:D.status,started_at:typeof D.started_at=="number"?D.started_at:null,runner:D.runner||null,model:D.model||null,effort:D.effort||D.observed_effort||null,speed:D.speed||null,session_id:D.session_id||null,resumed_from:D.resumed_from||null,continuation_mode:D.continuation_mode||null,dismissed_at:typeof D.dismissed_at=="number"?D.dismissed_at:null,cause:typeof D.cause=="string"?D.cause:null,cause_detail:D.cause_detail||null,exec_default_preset_id:typeof D.exec_default_preset_id=="string"?D.exec_default_preset_id:null,exec_default_preset_revision:typeof D.exec_default_preset_revision=="number"?D.exec_default_preset_revision:null,exec_values:D.exec_values&&typeof D.exec_values=="object"?D.exec_values:null,usage:D.usage||null,usage_legs:Array.isArray(D.usage_legs)?D.usage_legs:[],delegation_sessions:Array.isArray(D.delegation_sessions)?D.delegation_sessions:[]})):[]}function He(){return u?Gn(tt(),u):null}let Je=new Set;function bt(w){Je.has(w)?Je.delete(w):Je.add(w),at()}function ze(w){let D=i?i.get():null,G=D&&D.attempts?D.attempts[w]:null;Ge.open({attempt_id:w,meta:G?{runner:G.runner||void 0,model:G.model||void 0,effort:G.effort||void 0,status:G.status||void 0,session_id:G.session_id||void 0}:{}})}function xt(w,D){let G=i?i.get():null,ve=G&&G.attempts?G.attempts[w]:null,rt=(ve&&Array.isArray(ve.delegation_sessions)?ve.delegation_sessions:[]).find(gt=>gt&&typeof gt=="object"&&gt.launch_id===D);rt&&Ge.open({attempt_id:w,launch_id:D,meta:{runner:rt.provider==="claude"?"claude":"codex",role:rt.role,...typeof rt.agent_type=="string"?{agent_type:rt.agent_type}:{},model:rt.model,effort:rt.effort,session_id:rt.session_id,status:rt.status}})}async function qt(w){if(!o||!w)return;let D=await Ur();if(D===null)return;let G=()=>{let gt=i?i.get():null;return gt&&typeof gt.revision=="number"?gt.revision:0},ve=async(gt={},Qe=G())=>await o("worker-attempt-resume",{attempt_id:w,expected_revision:Qe,...D!==""?{instructions:D}:{},...gt}),nt=gt=>{gt?.queue&&i?.set&&i.set(gt.queue)},rt=await ve();if(nt(rt),rt&&rt.conflict){let gt=rt.queue&&typeof rt.queue.revision=="number"?rt.queue.revision:G();rt=await ve({},gt),nt(rt)}rt=await zn(rt,(gt,Qe)=>ve({continuation:gt,decision_token:Qe}),{onResult:nt,refresh:()=>ve()}),rt&&rt.resumed===!1&&!rt.conflict&&rt.reason&&be(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${rt.reason}`,"error",2400)}function lt(w){!w||!u||Ge.open(Wr(w,u,d&&d.status))}let Yt={onOpen:ze,onOpenDelegation:xt,onResume:qt,onToggleUsage:bt,onOpenSessionRef:lt,onCopyResumeCommand:p};function St(){let w=i?i.get():null,D={...j};for(let G of["orchestration_model","orchestration_effort","orchestration_speed"]){let ve=w&&w[G];typeof ve=="string"&&(D[G]=ve)}return D}async function It(){if(o){try{let w=await Promise.resolve(o("get-session-defaults",{}));j=w&&w.values&&typeof w.values=="object"?w.values:{}}catch{j={}}at()}}function Ut(){let w=i?i.get():null;return w&&w.runner_catalog||null}function Vt(){let w=i?i.get():null;return w&&typeof w.execution_defaults=="object"?w.execution_defaults:null}function Jt(){let w=d?.metadata&&typeof d.metadata=="object"?d.metadata:{},G=fn({pin:{...w,...f},global:St(),execution_defaults:Vt(),runner_catalog:Ut(),route:typeof w.route=="string"?w.route:null}).orchestration_model.value||"";return xn(Ut(),G)}function Wt(){let w=l?l.get():null;return!w||typeof w.revision!="number"?null:{revision:w.revision,presets:Array.isArray(w.presets)?w.presets:[]}}function Dt(w){return w?.compatible===!1}function cn(w){l&&w&&typeof w.revision=="number"&&Array.isArray(w.presets)&&l.set({revision:w.revision,presets:w.presets})}async function Mt(){let w=Wt(),D=w?.presets.find(G=>G.id===b);if(!(!o||!u||!w||!D||Dt(D)||m)){m=!0,k=[],at();try{let G=await Promise.resolve(o("apply-impl-preset",tu(u,D.id,w.revision)));if(G&&G.conflict){cn(G),be("\uD504\uB9AC\uC14B\uC774 \uBCC0\uACBD\uB410\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uBAA9\uB85D\uC5D0\uC11C \uB2E4\uC2DC \uC801\uC6A9\uD558\uC138\uC694.","error",4e3);return}let ve=G&&Array.isArray(G.issue)?G.issue[0]:G?.issue;if(G&&G.applied&&ve&&typeof ve=="object"){d=ve,k=Array.isArray(G.skipped_orchestration_keys)?G.skipped_orchestration_keys.filter(nt=>typeof nt=="string"):[];for(let nt of nu)delete f[nt];be(k.length>0?"\uC2E4\uD589 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4. \uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 3\uD0A4\uB294 Bead\uC5D0 \uD540\uD560 \uC218 \uC5C6\uC5B4 \uAC74\uB108\uB6F0\uC5C8\uC2B5\uB2C8\uB2E4.":"\uC2E4\uD589 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4.","success",4e3);return}G&&G.error==="bd_readback_failed"?be("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):be("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}catch(G){G&&typeof G=="object"&&G.code==="bd_readback_failed"?be("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):be("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}finally{m=!1,at()}}}let Gt=null;n&&n.subscribe&&(Gt=n.subscribe(()=>y()));let Ft=null;i&&typeof i.subscribe=="function"&&(Ft=i.subscribe(()=>{u&&at()}));let en=null,de=null;function C(){de&&(de(),de=null)}l&&typeof l.subscribe=="function"&&(en=l.subscribe(()=>{u&&at()}));function ne(w){w.key==="Escape"&&u&&(w.preventDefault(),r())}document.addEventListener("keydown",ne);let Le=Gr(()=>at());Le.attach();function y(){if(u){if(n&&typeof n.snapshotFor=="function"){let w=n.snapshotFor("detail:"+u)||[];d=w.find(G=>G&&G.id===u)||w[0]||d}ot(),Lt(),Ie(),at()}}function p(w){rn(w).then(D=>{D?be("\uBCF5\uC0AC\uB428","success",1200):be("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function _(w){w.preventDefault(),w.stopPropagation(),u&&p(u)}function S(w,D){w.preventDefault(),w.stopPropagation(),p(D)}function Y(w,D,G){w.preventDefault(),w.stopPropagation(),ce.open(D,{missing_state:G})}async function V(w,D){let G=Object.hasOwn(f,w),ve=f[w];if(f[w]=D,at(),!(!o||!u))try{let nt=await Promise.resolve(o("update-exec-settings",eu(u,w,D.length===0?null:D))),rt=Array.isArray(nt)?nt[0]:nt;if(!rt||typeof rt!="object"||!rt.id)throw new Error("exec settings readback failed");d=rt,delete f[w],at()}catch(nt){throw G?f[w]=ve:delete f[w],at(),be("\uC2E4\uD589 \uC124\uC815 \uBCC0\uACBD \uC2E4\uD328","error"),nt}}function ie(w){w.catch(()=>{})}async function $e(w,D){let G=d||{},ve=G.metadata&&typeof G.metadata=="object"?G.metadata:{},nt={};for(let Qe of["impl_runtime","impl_model","impl_effort"])nt[Qe]=Object.hasOwn(f,Qe)?f[Qe]:typeof ve[Qe]=="string"?ve[Qe]:"";nt[w]=D;let rt=su(nt,Ut(),Jt()),gt={};for(let Qe of["impl_runtime","impl_model","impl_effort"])gt[Qe]=f[Qe],f[Qe]=rt[Qe]||"";if(at(),!(!o||!u))return Promise.resolve(o("update-impl-target",{id:u,...rt,orchestration_runtime:Jt()})).then(Qe=>{let dt=Array.isArray(Qe)?Qe[0]:Qe;if(!dt||typeof dt!="object"||!dt.id)throw new Error("implementation target readback failed");d=dt;for(let kn of["impl_runtime","impl_model","impl_effort"])delete f[kn];at()}).catch(Qe=>{for(let dt of["impl_runtime","impl_model","impl_effort"])gt[dt]===void 0?delete f[dt]:f[dt]=gt[dt];throw at(),be("\uAD6C\uD604 target \uBCC0\uACBD \uC2E4\uD328","error"),Qe})}async function Xe(w,D,G){if(!o||!u)return!1;try{let ve=await Promise.resolve(o(w,D)),nt=Array.isArray(ve)?ve[0]:ve;return nt&&typeof nt=="object"&&nt.id?(d=nt,!0):(be(G,"error"),!1)}catch(ve){return ve&&typeof ve=="object"&&ve.code==="bd_readback_failed"?(be("\uC800\uC7A5\uB410\uC73C\uB098 \uD655\uC778 \uC2E4\uD328 \u2014 \uACE7 \uAC31\uC2E0\uB429\uB2C8\uB2E4","error"),{ok:!1,saved:!0}):(be(G,"error"),!1)}}function it(w){setTimeout(()=>{try{let D=e.querySelector(w);D&&typeof D.focus=="function"&&D.focus()}catch{}},0)}function yt(){O=!0,F=d&&d.title||"",at(),it('.detail-edit__input[data-edit="title"]')}function mt(w){F=w.target.value}function $(){O=!1,F="",at()}function x(){Xe("edit-text",{id:u,field:"title",value:F},"\uC81C\uBAA9 \uC800\uC7A5 \uC2E4\uD328").then(D=>{D===!0&&(O=!1,F=""),at()})}function Re(){I=!0,B=d&&d.description||"",at(),it('.detail-edit__textarea[data-edit="description"]')}function g(w){B=w.target.value}function h(){I=!1,B="",at()}function A(){Xe("edit-text",{id:u,field:"description",value:B},"\uC124\uBA85 \uC800\uC7A5 \uC2E4\uD328").then(D=>{D===!0&&(I=!1,B=""),at()})}function re(w,D,G,ve){if(w.key==="Escape"){w.stopPropagation(),G();return}w.key==="Enter"&&(!ve||w.ctrlKey||w.metaKey)&&(w.preventDefault(),D())}function fe(w){let D=w.target.value;Xe("update-status",{id:u,status:D},"\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328").then(()=>at())}function Te(w){let D=Number(w.target.value);Xe("update-priority",{id:u,priority:D},"\uC6B0\uC120\uC21C\uC704 \uBCC0\uACBD \uC2E4\uD328").then(()=>at())}function Ke(w){ae=w.target.value}function vt(){let w=ae.trim();w.length!==0&&Xe("label-add",{id:u,label:w},"\uB77C\uBCA8 \uCD94\uAC00 \uC2E4\uD328").then(D=>{D===!0&&(ae=""),at()})}function jt(w){if(w.key==="Escape"){w.stopPropagation(),ae="",at();return}w.key==="Enter"&&(w.preventDefault(),vt())}function Xt(w){Xe("label-remove",{id:u,label:w},"\uB77C\uBCA8 \uC81C\uAC70 \uC2E4\uD328").then(()=>at())}let gn={onCopyPath:S,onOpenDoc:Y};function Pn(w){return typeof w=="string"?w:w&&typeof w=="object"?String(w.id||w.to||w.issue_id||w.depends_on||""):""}function hn(w){return w&&typeof w=="object"?String(w.dependency_type||w.type||""):""}function Nn(w){switch(w){case"discovered-from":return{glyph:"\u21A9 ",relation:"\uBC1C\uACAC"};case"parent-child":return{glyph:"\u2338 ",relation:"\uC0C1\uC704"};case"related":return{glyph:"\u2194 ",relation:"\uAD00\uB828"};default:return w.length>0?{glyph:`${w} `,relation:w}:{glyph:"",relation:""}}}function wn(w,D){let G=Kt(D),ve=[];return w.length>0&&ve.push(w),G&&ve.push(G),ve.length>0?ve.join(`
`):void 0}function Kt(w){if(!w||typeof w!="object")return;let D=typeof w.status=="string"?w.status:"",G=typeof w.title=="string"?w.title:"";return D.length>0&&G.length>0?`${D} \xB7 ${G}`:void 0}function er(){return(t.getWorkspacePath&&t.getWorkspacePath()||"").trim()}function qn(){return t.depCandidates?t.depCandidates():null}async function Fn(w,D,G){let ve=er(),nt=u;if(!nt)return;if(ve.length===0){be("\uB808\uD3EC\uB97C \uC54C \uC218 \uC5C6\uC5B4 \uC758\uC874\uC744 \uBC14\uAFC0 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error");return}let rt=await Xe(w,{a:nt,b:D,view_id:nt,root_dir:ve},G),gt=rt===!0||rt!==!1&&rt.saved===!0;gt&&t.onDepChanged&&t.onDepChanged({type:w,a:nt,b:D}),w==="dep-add"&&gt&&(N="",W=!1),at()}function jn(w){if(!u)return;let D=globalThis.confirm;typeof D=="function"&&!D(`${w}\uAC00 ${u}\uB97C \uB9C9\uB294 \uC5F0\uACB0\uC744 \uB04A\uC744\uAE4C\uC694?`)||Fn("dep-remove",w,"\uC758\uC874 \uD574\uC81C \uC2E4\uD328")}function On(w){w.disabled||Fn("dep-add",w.bead_id,"\uC758\uC874 \uCD94\uAC00 \uC2E4\uD328")}function pr(w){N=w.target.value,W=!0,at()}function We(){W||(W=!0,at())}function Pt(w,D){if(w.key==="Escape"){w.stopPropagation(),N="",W=!1,at();return}w.key==="Enter"&&(w.preventDefault(),D.length===1&&!D[0].disabled&&On(D[0]))}function bn(w){return c`<div class="detail-dep-add">
      <input
        class="detail-dep-add__input"
        aria-label="막는 이슈 추가"
        placeholder="막는 이슈 추가"
        .value=${N}
        @focus=${We}
        @input=${pr}
        @keydown=${D=>Pt(D,w)}
      />
      ${W||N.length>0?c`<div class="detail-dep-add__list">
            ${w.length===0?c`<div class="detail-dep-add__empty">후보 없음</div>`:w.map(D=>c`<button
                      type="button"
                      class="detail-dep-add__cand"
                      data-dep-cand=${D.bead_id}
                      ?disabled=${D.disabled}
                      title=${tn(D.reason)}
                      @click=${()=>On(D)}
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
    </div>`}function ao(w,D){let G=D.get(w.id),ve=s?c`<button
          type="button"
          class="detail-dep__link"
          title=${tn(w.title)}
          @click=${()=>G===void 0?s(w.id):s(w.id,G)}
        >
          ${w.label}
        </button>`:c`<span class="detail-dep__link" title=${tn(w.title)}
          >${w.label}</span
        >`;return c`<span
      class=${`detail-dep detail-dep--${w.kind}${s?" detail-dep--link":""}`}
      >${ve}${w.kind==="pred"?c`<button
            type="button"
            class="detail-dep__unlink"
            data-dep-b=${w.id}
            aria-label=${"\uC758\uC874 \uD574\uC81C: "+w.id}
            @click=${()=>jn(w.id)}
          >
            ✕
          </button>`:""}</span
    >`}function rs(w){let D=Array.isArray(w.dependencies)?w.dependencies:[],G=Array.isArray(w.dependents)?w.dependents:[],ve=[];for(let Qe of D){let dt=Pn(Qe);dt.length>0&&hn(Qe)==="blocks"&&ve.push({id:dt,label:`\u26D3 ${dt}`,kind:"pred",title:wn("\uB9C9\uB294",Qe)})}for(let Qe of G){let dt=Pn(Qe);dt.length>0&&hn(Qe)==="blocks"&&ve.push({id:dt,label:`\u2192 ${dt}`,kind:"succ",title:wn("\uB9C9\uD788\uB294",Qe)})}for(let Qe of D){let dt=Pn(Qe),kn=hn(Qe);if(dt.length>0&&kn!=="blocks"){let El=Nn(kn);ve.push({id:dt,label:`${El.glyph}${dt}`,kind:"other",title:wn(El.relation,Qe)})}}let nt=qn(),rt=new Map;if(nt)for(let Qe of nt.issues)rt.has(Qe.bead_id)||rt.set(Qe.bead_id,Qe.root_dir);let gt=nt&&u?ed(Ju(u,nt),N):[];return c`
      <div class="detail-section-label">의존성</div>
      ${ve.length===0?c`<div class="detail-empty">의존성 없음</div>`:c`<div class="detail-deps">
            ${ve.map(Qe=>ao(Qe,rt))}
          </div>`}
      ${nt===null?c`<div class="detail-empty">후보를 불러올 수 없음</div>`:bn(gt)}
    `}function os(w){let D=w.metadata||{},G=w.workflow||{},ve=G.stages||{},nt=ve.spec&&ve.spec.stale,rt=ve.impl&&ve.impl.stale,gt=G.quick_fix_review?.state==="stale",Qe=ve.plan||null,dt=G.route_source==="derived",kn=G.route||D.route||"\u2014";return c`
      <div class="detail-section-label">워크플로우</div>
      <div class="detail-kv">
        <span class="detail-kv__k">route</span>
        <span
          class="detail-kv__v${dt?" detail-kv__v--derived":""}"
          title=${dt?"route \uBBF8\uD540 (metadata unset)":"route"}
          >${dt?"unset":kn}</span
        >
      </div>
      ${G.route!=="quick_fix"||Object.hasOwn(D,"spec_review")?c`<div class="detail-kv">
            <span class="detail-kv__k">spec_review</span>
            <span class="detail-kv__v"
              >${D.spec_review||"\uC5C6\uC74C"}${nt?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${G.route==="full_plan"?c`<div class="detail-kv">
              <span class="detail-kv__k">plan_review</span>
              <span class="detail-kv__v">${Qe?.receipt||"\uC5C6\uC74C"}</span>
            </div>
            <div class="detail-kv">
              <span class="detail-kv__k">plan_approval</span>
              <span class="detail-kv__v"
                >${Qe?.approval_receipt||"\uC5C6\uC74C"}${Qe?.approval_state==="stale"?" \xB7 stale":Qe?.approval_state==="unknown"?" \xB7 unknown":""}</span
              >
            </div>`:""}
      ${G.route!=="quick_fix"||Object.hasOwn(D,"impl_review")?c`<div class="detail-kv">
            <span class="detail-kv__k">impl_review</span>
            <span class="detail-kv__v"
              >${D.impl_review||"\uC5C6\uC74C"}${rt?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${G.resolver?c`<div class="detail-kv">
            <span class="detail-kv__k">↳ 충돌 해소</span>
            <span
              class="detail-kv__v detail-kv__v--resolver detail-kv__v--wrap"
              title=${`resolver-self:${G.resolver.attempt} \xB7 ${G.resolver.prior_sha} \u2192 ${G.resolver.sha}`}
              >${`${G.resolver.prior_sha.slice(0,7)} \u2192 ${G.resolver.sha.slice(0,7)}`}</span
            >
          </div>`:""}
      ${G.route==="quick_fix"||Object.hasOwn(D,"quick_fix_review")?c`<div class="detail-kv">
            <span class="detail-kv__k">quick_fix_review</span>
            <span class="detail-kv__v"
              >${D.quick_fix_review||"\uC5C6\uC74C"}${gt?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${G.planned_execution?c`<div class="detail-kv">
              <span class="detail-kv__k">planned_execution</span>
              <span class="detail-kv__v">${G.planned_execution.kind}</span>
            </div>
            ${G.planned_execution.kind==="main"?c`<div class="detail-kv">
                  <span class="detail-kv__k">planned_execution_reason</span>
                  <span class="detail-kv__v detail-kv__v--wrap"
                    >${G.planned_execution.reason}</span
                  >
                </div>`:""}`:""}
      ${G.exec_receipt?c`<div class="detail-kv">
            <span class="detail-kv__k">exec_receipt</span>
            <span class="detail-kv__v detail-kv__v--wrap"
              >${Wn(G.exec_receipt)}</span
            >
          </div>`:""}
      ${G.impl_entry?c`<div class="detail-kv">
            <span class="detail-kv__k">impl_entry</span>
            <span class="detail-kv__v"
              >${`${G.impl_entry.actor}@${G.impl_entry.sha}`}</span
            >
          </div>`:""}
      ${D.pr_url?c`<div class="detail-kv">
            <span class="detail-kv__k">pr_url</span>
            <span class="detail-kv__v detail-kv__v--wrap">${D.pr_url}</span>
          </div>`:""}
    `}let lo={route:["quick_fix","spec_backed","full_plan"]};async function ss(w,D){let G=D.target.value;if(w==="route"&&d&&d.metadata&&d.metadata.route==="full_plan"&&G!=="full_plan"&&!window.confirm(`full_plan \u2192 ${G||"(\uBBF8\uC124\uC815)"} \uC804\uD658: \uC800\uC7A5\uB41C plan \uC2B9\uC778\uC740 \uD3EC\uAE30\uB418\uBA70, plan \uD30C\uC77C\xB7\uB9C8\uCEE4 \uC815\uB9AC\uB294 \uC138\uC158 \uACC4\uC57D\uC774 \uC218\uD589\uD569\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`)){at();return}await Xe("update-workflow-meta",{id:u,key:w,value:G},"\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uBA54\uD0C0 \uBCC0\uACBD \uC2E4\uD328"),at()}function Me(w){let D=w.metadata||{};return c` ${((ve,nt)=>{let rt=lo[ve],gt=typeof D[ve]=="string"?D[ve]:"";return c`<div class="detail-kv">
        <span class="detail-kv__k">${ve}</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label=${ve}
          data-edit=${`wfmeta-${ve}`}
          @change=${Qe=>ss(ve,Qe)}
        >
          <option value="" ?selected=${!rt.includes(gt)}>
            ${nt}
          </option>
          ${rt.map(Qe=>c`<option value=${Qe} ?selected=${gt===Qe}>${Qe}</option>`)}
        </select>
      </div>`})("route","(unset)")} `}function Et(w,D){return O?c`
        <div class="detail-edit">
          <input
            class="detail-edit__input"
            data-edit="title"
            aria-label="제목 편집"
            .value=${F}
            @input=${mt}
            @keydown=${G=>re(G,x,$,!1)}
          />
          <div class="detail-edit__actions">
            <button
              type="button"
              class="detail-edit__save"
              data-edit="title-save"
              @click=${x}
            >
              저장
            </button>
            <button
              type="button"
              class="detail-edit__cancel"
              data-edit="title-cancel"
              @click=${$}
            >
              취소
            </button>
          </div>
        </div>
      `:c`
      <div class="detail-title-row">
        <h2 class="detail-overlay__title">${w}</h2>
        ${Qt(D).map(G=>c`<span class="detail-usage-total" title=${G.tooltip}
              >${G.label}</span
            >`)}
        <button
          type="button"
          class="detail-edit-btn"
          data-edit="title"
          aria-label="제목 편집"
          @click=${yt}
        >
          ✎
        </button>
      </div>
    `}function zt(w){let D=Ht(w.created_at),G=Ht(w.updated_at);return!D&&!G?c``:c`
      ${D?c`<div class="detail-kv">
            <span class="detail-kv__k">생성</span>
            <span class="detail-kv__v detail-kv__v--time">${D}</span>
          </div>`:""}
      ${G?c`<div class="detail-kv">
            <span class="detail-kv__k">수정</span>
            <span class="detail-kv__v detail-kv__v--time">${G}</span>
          </div>`:""}
    `}function Wf(w,D){return c`
      <div class="detail-section-label">속성 (수정 가능)</div>
      <div class="detail-kv">
        <span class="detail-kv__k">status</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label="status"
          data-edit="status"
          @change=${fe}
        >
          ${Wb.map(G=>c`<option value=${G} ?selected=${G===w}>${G}</option>`)}
        </select>
      </div>
      <div class="detail-kv">
        <span class="detail-kv__k">priority</span>
        <select
          class="detail-kv__v"
          aria-label="priority"
          data-edit="priority"
          @change=${Te}
        >
          ${zb.map(G=>c`<option value=${String(G)} ?selected=${G===D}>
                P${G}
              </option>`)}
        </select>
      </div>
    `}function zf(w){return c`
      <div class="detail-title-row">
        <div class="detail-overlay__section-label">설명</div>
        ${I?"":c`<button
              type="button"
              class="detail-edit-btn"
              data-edit="description"
              aria-label="설명 편집"
              @click=${Re}
            >
              ✎
            </button>`}
      </div>
      ${I?c`<div class="detail-edit">
            <textarea
              class="detail-edit__textarea"
              data-edit="description"
              aria-label="설명 편집"
              rows="6"
              .value=${B}
              @input=${g}
              @keydown=${D=>re(D,A,h,!0)}
            ></textarea>
            <div class="detail-edit__actions">
              <button
                type="button"
                class="detail-edit__save"
                data-edit="description-save"
                @click=${A}
              >
                저장
              </button>
              <button
                type="button"
                class="detail-edit__cancel"
                data-edit="description-cancel"
                @click=${h}
              >
                취소
              </button>
            </div>
          </div>`:c`<div class="detail-overlay__desc">
            ${w||"(\uC124\uBA85 \uC5C6\uC74C)"}
          </div>`}
    `}function Hf(w){let D=typeof w.notes=="string"?w.notes:"";return D.trim().length===0?c``:c`
      <div class="detail-overlay__section-label">노트</div>
      <div class="detail-overlay__notes">${D}</div>
    `}function Gf(w){let D=Array.isArray(w.labels)?w.labels:[];return c`
      <div class="detail-section-label">라벨</div>
      <div class="detail-labels">
        ${D.map(G=>c`<span class="detail-label-chip"
              >${G}<button
                type="button"
                class="detail-label-chip__x"
                data-label=${G}
                aria-label=${"\uB77C\uBCA8 \uC81C\uAC70: "+G}
                @click=${()=>Xt(G)}
              >
                ×
              </button></span
            >`)}
        <span class="detail-label-add">
          <input
            class="detail-label-add__input"
            aria-label="라벨 추가"
            placeholder="라벨 추가"
            .value=${ae}
            @input=${Ke}
            @keydown=${jt}
          />
          <button
            type="button"
            class="detail-label-add__btn"
            @click=${vt}
          >
            추가
          </button>
        </span>
      </div>
    `}function Kf(){if(!u)return c``;let w=d||{},D=String(w.id||u),G=w.title||"(\uC81C\uBAA9 \uC5C6\uC74C)",ve=He(),nt=w.status||"open",rt=typeof w.priority=="number"?Math.max(0,Math.min(4,w.priority)):"",gt=w.description||"",Qe={...w,metadata:{...w.metadata||{},...f}};return c`
      <div class="detail-overlay" role="dialog" aria-modal="true">
        <div class="detail-overlay__backdrop" @click=${()=>r()}></div>
        <div class="detail-overlay__panel">
          <div class="detail-overlay__bar">
            <button
              type="button"
              class="detail-overlay__id"
              title="ID 복사"
              @click=${_}
            >
              ${D}
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
          ${Et(G,ve)}
          ${Hd(Qe,{onChipToggle:dt=>Le.toggle({bead_id:D,chip_key:dt}),isChipOpen:dt=>Le.isOpen({bead_id:D,chip_key:dt})})}
          ${zd({metadata:Qe.metadata,workspace_values:St(),catalog:Ut(),execution_defaults:Vt(),expanded:R,presets:Wt()?.presets||[],preset_id:b,preset_busy:m,skipped_orchestration_keys:k},{onToggle:dt=>{R=dt,at()},onEdit:(dt,kn)=>{if(dt==="impl_runtime"||dt==="impl_model"||dt==="impl_effort"){ie($e(dt,kn??""));return}ie(V(dt,kn??""))},onPresetSelect:dt=>{b=dt,k=[],at()},onPresetApply:()=>{Mt()}})}
          ${Qd({md:Qe.metadata,catalog:H,workspace_defaults:oe,handlers:{onExecChange:(dt,kn)=>ie(V(dt,kn))}})}
          ${Wf(nt,rt)} ${zt(w)}
          ${zf(gt)}
          ${jd(P,le,{expanded:ke,draft:J,sending:Ae,error:E})}
          ${Hf(w)} ${Gf(w)} ${rs(w)}
          ${os(w)} ${Me(w)}
          ${Nd(w,gn)}
          ${np({expanded:Ze,loading:Pe,error:Q,data:U},{onToggle:qe})}
          ${tp(Oe(),Yt,{total:ve,expanded:Je},Ee)}
          ${op({events:$t,shown:Be},{onMore:Ue})}
        </div>
      </div>
    `}function at(){st(Kf(),e)}return{load(w){w!==u&&(f={},b="",k=[],R=!1,Z(),me(),v(),pt(),T(),ee()),u=w,d=null,!de&&t.subscribeCandidates&&(de=t.subscribeCandidates(()=>{u&&at()})),y(),It(),X!==w&&ue(w)},clear(){u=null,d=null,f={},b="",m=!1,k=[],R=!1,Z(),me(),v(),pt(),T(),ee(),C(),ce.close(),Ge.close(),st(c``,e)},destroy(){Gt&&(Gt(),Gt=null),Ft&&(Ft(),Ft=null),en&&(en(),en=null),C(),document.removeEventListener("keydown",ne),Le.detach(),pe||(ce.destroy(),he&&he.parentNode&&he.parentNode.removeChild(he)),Ge.destroy(),Fe.parentNode&&Fe.parentNode.removeChild(Fe),u=null,d=null,ee(),b="",m=!1,k=[],me(),v(),pt(),T(),st(c``,e)}}}function ip(e){let t=document.createElement("dialog");t.id="fatal-error-dialog",t.setAttribute("role","alertdialog"),t.setAttribute("aria-modal","true"),t.innerHTML=`
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
    </div>`,e.appendChild(t);let n=t.querySelector("#fatal-error-title"),r=t.querySelector("#fatal-error-message"),o=t.querySelector("#fatal-error-detail"),s=t.querySelector("#fatal-error-reload"),i=t.querySelector("#fatal-error-close"),l=()=>{if(typeof t.close=="function")try{t.close()}catch{}t.removeAttribute("open")},a=(u,d,f="")=>{n&&(n.textContent=u||"Unexpected Error"),r&&(r.textContent=d||"An unrecoverable error occurred.");let b=typeof f=="string"?f.trim():"";if(o&&(b.length>0?(o.textContent=b,o.removeAttribute("hidden")):(o.textContent="No additional diagnostics available.",o.setAttribute("hidden",""))),typeof t.showModal=="function")try{t.showModal(),t.setAttribute("open","")}catch{t.setAttribute("open","")}else t.setAttribute("open","")};return s&&s.addEventListener("click",()=>{window.location.reload()}),i&&i.addEventListener("click",()=>l()),t.addEventListener("cancel",u=>{u.preventDefault(),l()}),{open:a,close:l,getElement(){return t}}}var Hb="(max-width: 640px)";function Ei(e){if(typeof window.matchMedia!="function")return e(!1),()=>{};let t=window.matchMedia(Hb),n=!!t.matches;e(n);let r=o=>{let i=!!(typeof o=="object"&&o!==null&&typeof o.matches=="boolean"?o.matches:t.matches);i!==n&&(n=i,e(i))};return typeof t.addEventListener=="function"?(t.addEventListener("change",r),()=>{t.removeEventListener("change",r)}):typeof t.addListener=="function"?(t.addListener(r),()=>{typeof t.removeListener=="function"&&t.removeListener(r)}):()=>{}}function Gb(){return{lanes:{done:!0},areas:{}}}function Jo(e){let t={};if(typeof e!="object"||e===null)return t;for(let[n,r]of Object.entries(e))typeof r=="boolean"&&(t[n]=r);return t}function Kb(e){try{let t=window.localStorage.getItem(e);if(!t)return null;let n=JSON.parse(t);if(typeof n!="object"||n===null)return null;let r=n;return typeof r.lanes=="object"&&r.lanes!==null?{lanes:Jo(r.lanes),areas:Jo(r.areas)}:{lanes:Jo(r),areas:{}}}catch{return null}}function ap(e,t){try{window.localStorage.setItem(e,JSON.stringify(t))}catch{}}function Ti(e,t=Gb()){let n={lanes:Jo(t.lanes),areas:Jo(t.areas)},r=Kb(e),o={lanes:{...n.lanes,...r?r.lanes:{}},areas:{...n.areas,...r?r.areas:{}}};return{isCollapsed(s){return o.lanes[s]===!0},isAreaCollapsed(s){return o.areas[s]===!0},toggle(s){let i=o.lanes[s]!==!0;return o={...o,lanes:{...o.lanes,[s]:i}},ap(e,o),i},toggleArea(s){let i=o.areas[s]!==!0;return o={...o,areas:{...o.areas,[s]:i}},ap(e,o),i}}}function _l(e){if(typeof e=="string"&&e.length>0)return e;if(e&&typeof e=="object"){let t=e;if(typeof t.message=="string"&&t.message.length>0)return t.message;if(typeof t.error=="string"&&t.error.length>0)return t.error;if(t.error&&typeof t.error=="object"&&typeof t.error.message=="string")return t.error.message}return"\uC694\uCCAD\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4"}function Ci(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"&&t.length>0):[]}function Ri(e){let{transport:t,console_el:n,getLanes:r,getWorkspaces:o,getCrossLanes:s,reproject:i,onCorrection:l,showToast:a,requestRender:u,adoptQueue:d,onDragBegin:f,candidate_drop:b}=e,m=[],k=null,R=!1,j=null,H=null,oe=null;function X(){j!==null&&clearTimeout(j),j=setTimeout(()=>{j=null,R=!1},0)}function q(){return s()??null}function O(){let M=new Map,se=o();for(let le of Array.isArray(se)?se:[]){if(!le||typeof le!="object")continue;let pe=le.bead_blocked_by&&typeof le.bead_blocked_by=="object"?le.bead_blocked_by:{};for(let[he,ce]of Object.entries(pe))Array.isArray(ce)&&M.set(he,Ci(ce));for(let he of[...Array.isArray(le.runnable)?le.runnable:[],...Array.isArray(le.session_active)?le.session_active:[]])he&&typeof he.bead_id=="string"&&Array.isArray(he.blocked_by)&&he.blocked_by.length>0&&M.set(he.bead_id,Ci(he.blocked_by))}return M}function I(){let M=new Map,se=new Map,le=o();for(let pe of Array.isArray(le)?le:[]){if(!pe||typeof pe!="object")continue;let he=pe.bead_blocked_by&&typeof pe.bead_blocked_by=="object"?pe.bead_blocked_by:{};for(let[ce,Fe]of Object.entries(he))Array.isArray(Fe)&&M.set(ce,Ci(Fe));for(let ce of Array.isArray(pe.runnable)?pe.runnable:[])ce&&typeof ce.bead_id=="string"&&Array.isArray(ce.blocked_by)&&se.set(ce.bead_id,Ci(ce.blocked_by))}for(let pe of m)for(let he of[M,se]){let ce=he.get(pe.a);ce!==void 0&&he.set(pe.a,pe.type==="dep-remove"?ce.filter(Fe=>Fe!==pe.b):ce.includes(pe.b)?ce:[...ce,pe.b])}return{snapshot:M,runnable:se}}function F(){let M=O();for(let se of m){let le=(M.get(se.a)||[]).slice();se.type==="dep-remove"?M.set(se.a,le.filter(pe=>pe!==se.b)):le.includes(se.b)||M.set(se.a,[...le,se.b])}return M}function B(M=r(),se=q()){let le=new Map;for(let Pe of Array.isArray(se?.lanes)?se.lanes:[]){let Q=new Map;for(let U of Array.isArray(Pe?.entries)?Pe.entries:[])U&&typeof U.bead_id=="string"&&Q.set(U.bead_id,U.dep_created_by_lane===!0);le.set(typeof Pe?.id=="string"?Pe.id:"",Q)}let pe=new Map,he=new Map,ce=new Set,Fe=new Set;for(let Pe of M.chain_lanes){let Q=le.get(Pe.lane_id);pe.set(Pe.lane_id,{status:Pe.status,entries:Pe.rows.map((U,Ne)=>({bead_id:U.id,root_dir:U.root_dir,...Ne===0?{}:{dep_created_by_lane:Q?.get(U.id)===!0}}))});for(let U of Pe.rows)he.set(U.id,Pe.lane_id),U.fixed&&ce.add(U.id),U.unplaced||Fe.add(U.id)}let Ge=new Map;for(let Pe of M.parallel_rows)typeof Pe.queue_index=="number"&&Ge.set(Pe.id,Pe.queue_index);for(let Pe of M.queue_groups)for(let Q of Pe.sublanes.serial)for(let U of Q.items)typeof U.queue_index=="number"&&Ge.set(U.id,U.queue_index);let Ze=I();return{blocked_by_map:F(),snapshot_blocked_by:Ze.snapshot,runnable_blocked_by:Ze.runnable,owner_of:new Map(Object.entries(M.owner_of)),cross_lanes:pe,owner_lane_of:he,fixed_members:ce,placed_members:Fe,parallel_rows:M.parallel_rows.map(Pe=>({bead_id:Pe.id,root_dir:Pe.root_dir,queue_index:Pe.queue_index??0})),parallel_raw_length:new Map(Object.entries(M.parallel_raw_length)),queue_index_of:Ge}}function ae(M,se){let le=r();for(let he of[...le.runnable,...le.queue,...le.running,...le.pr_wait,...le.done])if(!(he.non_occupying||he.id!==se)){if(he.root_dir===M)return he.expected_revision;break}let pe=le.queue_groups.find(he=>he.root_dir===M);return pe?pe.revision:0}async function N(M,se,le,pe){if(!t)return null;let ce=await t(M,{...se,...le?{root_dir:le}:{},expected_revision:pe});if(ce&&ce.conflict){ce.queue&&d?.(le,ce.queue);let Fe=ce.queue&&typeof ce.queue.revision=="number"?ce.queue.revision:pe;ce=await t(M,{...se,...le?{root_dir:le}:{},expected_revision:Fe})}return ce&&ce.queue&&d?.(le,ce.queue),ce}async function W(M,se,le,pe,he){try{let ce=await N(M,se,le,pe.get(le)??ae(le,he.bead_id));return!ce||typeof ce.applied!="boolean"?(a("\uD050 \uC694\uCCAD\uC774 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error"),null):(ce.queue&&typeof ce.queue.revision=="number"&&pe.set(le,ce.queue.revision),ce.conflict?(a("\uD050\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD574 \uC8FC\uC138\uC694","error"),null):ce.applied===!1?(a(ce.admission_reason?`\uD050 \uC801\uC7AC \uAC70\uBD80: ${ce.admission_reason}`:"\uD050 \uC694\uCCAD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4","error"),null):ce.queue&&typeof ce.queue.revision=="number"?ce.queue.revision:pe.get(le)??0)}catch(ce){return a(_l(ce),"error"),null}}async function Z(M,se,le=new Map){if(M.type==="worker-queue-disarm"){try{let pe=await N(M.type,M.payload,M.root_dir,le.get(M.root_dir)??ae(M.root_dir,se));pe&&pe.queue&&typeof pe.queue.revision=="number"&&le.set(M.root_dir,pe.queue.revision)}catch{}return!0}if(M.type==="worker-queue-place"||M.type==="worker-queue-reorder"||M.type==="worker-queue-remove")return await W(M.type,M.payload,M.root_dir,le,{bead_id:se})!==null;try{return(M.type==="dep-add"||M.type==="dep-remove")&&t&&await t(M.type,{a:M.a,b:M.b,...M.root_dir?{root_dir:M.root_dir}:{}}),!0}catch(pe){return a(_l(pe),"error"),!1}}function ee(M){(M.type==="dep-add"||M.type==="dep-remove")&&(m=[...m,{type:M.type,a:M.a,b:M.b}])}async function Se(M,se){if(!t)return{ok:!1};try{let le=await t(M.type,{...M.payload,expected_revision:se});return!le||typeof le.revision!="number"?(a("\uC5F0\uACB0 \uB808\uC778 \uC751\uB2F5\uC5D0 revision\uC774 \uC5C6\uC2B5\uB2C8\uB2E4","error"),{ok:!1}):{ok:!0,revision:le.revision}}catch(le){let pe=le,he=pe&&pe.code==="conflict"?pe.details?.cross_lanes:null;return he&&typeof he.revision=="number"&&Array.isArray(he.lanes)?{ok:!1,conflict:he}:(a(_l(le),"error"),{ok:!1})}}async function ge(M,se,le){let pe=new Map,he=[],ce=M.ops.slice(0,M.lane_op_index),Fe=M.ops.slice(M.lane_op_index);for(let Ze of ce){if(!await Z(Ze,le,pe))return{done:!0};ee(Ze)}let Ge=se;for(let Ze of M.lane_ops){if(Ge===null)return a("\uC5F0\uACB0 \uB808\uC778 \uC800\uC7A5\uC18C\uB97C \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error"),{done:!0};let Pe=await Se(Ze,Ge);if(!Pe.ok)return Pe.conflict?{done:!1,conflict:Pe.conflict}:{done:!0};Ge=Pe.revision}for(let Ze of Fe){if(!await Z(Ze,le,pe))return{done:!0};ee(Ze),Ze.type==="dep-add"&&he.push(Ze)}for(let Ze of Qu(he))Ge=await ue(Ze,Ge);return{done:!0}}async function ue(M,se){if(se===null||!t)return se;let le=M.pairs,pe=se;for(let he=0;he<2;he+=1){if(le.length===0)return pe;try{let ce=await t("monitor-lane-provenance",{lane_id:M.lane_id,pairs:le.map(Fe=>({bead_id:Fe.bead_id,after:Fe.after,value:!0})),expected_revision:pe});return ce&&typeof ce.revision=="number"?ce.revision:pe}catch(ce){let Fe=ce,Ge=Fe&&Fe.code==="conflict"?Fe.details?.cross_lanes:null;if(!Ge||typeof Ge.revision!="number"||!Array.isArray(Ge.lanes))return pe;let Ze=Ge.lanes.find(Pe=>Pe&&Pe.id===M.lane_id);le=Zu(Array.isArray(Ze?.entries)?Ze.entries:[],le),pe=Ge.revision}}return pe}async function P(M,se,le=[]){m=le,l("",0);let pe=r(),he=q();for(let ce=0;;ce+=1){let Fe=M(B(pe,he));if("refused"in Fe){a(Fe.refused,"error");break}let Ge=await ge(Fe,pe.cross_lanes_revision,se);if(Ge.done){Fe.correction&&l(Fe.correction.lane_id,Fe.correction.corrected);break}if(ce>=1){a("\uB808\uC778\uC774 \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4","error");break}let Ze=i(Ge.conflict);pe=Ze.lanes,he=Ze.raw_lanes}m=[],u()}async function we(M,se){await P(le=>li(M,se,le),M.bead_id)}function xe(M,se){let le=se&&typeof se.closest=="function"?se.closest("[data-row-index]"):null;if(le&&M.contains(le)){let pe=Number(le.getAttribute("data-row-index"));return Number.isFinite(pe)?pe:0}return M.querySelectorAll("[data-row-index]").length}function E(M){let se=typeof M?.closest=="function"?M.closest(".worker-pane--collapsed[data-lane]"):null;if(!se)return null;let le=se.getAttribute("data-lane");return le==="queue"?{zone:se,target:{kind:"parallel",marker_index:r().parallel_rows.length}}:le==="candidate"&&b===!0?{zone:se,target:{kind:"candidate"}}:null}function J(M){let se=M.target;if(!k)return null;let le=typeof se?.closest=="function"?se.closest("[data-drop]"):null;if(!le)return E(se);let pe=le.getAttribute("data-drop");if(pe==="candidate")return{zone:le,target:{kind:"candidate"}};if(pe==="parallel")return{zone:le,target:{kind:"parallel",marker_index:xe(le,se)}};if(pe==="chain")return{zone:le,target:{kind:"chain",lane_id:le.getAttribute("data-lane-id")||"",marker_index:xe(le,se)}};if(pe==="repo-serial"){let he=le.getAttribute("data-root-dir")||"";if(he!==k.root_dir)return null;let ce=typeof se?.closest=="function"?se.closest("[data-queue-index]"):null,Fe=ce&&le.contains(ce)?ce.getAttribute("data-queue-index"):le.getAttribute("data-lane-length"),Ge=Number(Fe);return{zone:le,target:{kind:"repo-serial",root_dir:he,lane_id:le.getAttribute("data-lane-id")||"",index:Number.isFinite(Ge)?Ge:0}}}return null}function Ae(){for(let M of Array.from(n.querySelectorAll(".is-drop-over")))M.classList.remove("is-drop-over")}function _e(M){H=M.target instanceof Element?M.target:null}function ke(M){let se=M.target,le=typeof se?.closest=="function"?se.closest('[draggable="true"][data-bead-id]'):null,pe=le?le.closest("[data-drag-kind]"):null;if(!pe)return;if(le&&H&&le.contains(H)&&typeof H.closest=="function"&&H.closest("input, button, a")){M.preventDefault();return}let he=pe.getAttribute("data-bead-id")||"",ce=pe.getAttribute("data-drag-kind")||"",Fe=pe.getAttribute("data-root-dir")||"";if(!he||!ce)return;let Ge=pe.getAttribute("data-queue-index")||"",Ze=Number(Ge),Pe=pe.getAttribute("data-lane-id")||"";k={kind:ce,bead_id:he,root_dir:Fe,...Ge!==""&&Number.isFinite(Ze)?{queue_index:Ze}:{},...Pe?{lane_id:Pe}:{}},R=!0,f?.(),n.classList.add("is-dragging");try{M.dataTransfer?.setData("text/plain",he),M.dataTransfer&&(M.dataTransfer.effectAllowed="move")}catch{}}function me(M){let se=J(M);se&&(M.preventDefault(),M.dataTransfer&&(M.dataTransfer.dropEffect="move"),se.zone.classList.add("is-drop-over"))}function De(M){let se=M.target;typeof se?.closest=="function"&&(se.closest("[data-drop]")?.classList.remove("is-drop-over"),se.closest(".worker-pane--collapsed")?.classList.remove("is-drop-over"))}function ot(){k=null,Ae(),n.classList.remove("is-dragging"),X()}function Ye(M){let se=J(M),le=k;k=null,Ae(),n.classList.remove("is-dragging"),!(!se||!le)&&(M.preventDefault(),we(le,se.target))}return{attach(M){oe||(oe=M,M.addEventListener("pointerdown",_e),M.addEventListener("dragstart",ke),M.addEventListener("dragover",me),M.addEventListener("dragleave",De),M.addEventListener("drop",Ye),M.addEventListener("dragend",ot))},detach(){j!==null&&(clearTimeout(j),j=null);let M=oe;oe=null,M&&(M.removeEventListener("pointerdown",_e),M.removeEventListener("dragstart",ke),M.removeEventListener("dragover",me),M.removeEventListener("dragleave",De),M.removeEventListener("drop",Ye),M.removeEventListener("dragend",ot))},isDragging(){return k!==null},consumeClickSuppression(){let M=R;return R=!1,M},applyDrop:we,runPlanned:P,dropModel:B,sendOp:Z,sendQueueCas:W,rememberDep:ee}}var ml=Object.freeze({repo_ops_worktree_unowned:"\uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC\uAC00 \uC544\uC9C1 Worker \uC18C\uC720\uAC00 \uC544\uB2C8\uC5B4\uC11C \uC2A4\uD06C\uB9BD\uD2B8 \uC2E4\uD589 \uC804\uC5D0 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4.",verify_cmd_failed:"\uBA38\uC9C0 \uD6C4 \uAC80\uC99D \uBA85\uB839\uC774 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",gh_observation_failed:"GitHub\uC5D0\uC11C PR \uC0C1\uD0DC\uB97C \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",verify_script_failure:"\uAC80\uC99D \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",deploy_script_failure:"\uBC30\uD3EC \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",interrupted_without_terminal_exit:"\uC791\uC5C5\uC774 \uC885\uB8CC \uAE30\uB85D \uC5C6\uC774 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4.",manual_target_missing:"\uC218\uB3D9 \uBC30\uD3EC \uAE30\uB85D\uC5D0 \uD540\uB41C \uB300\uC0C1 SHA\uAC00 \uC5C6\uC5B4 \uC2E4\uD589\uD558\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4.",base_unresolved:"PR\uC774 \uC5B4\uB290 base \uBE0C\uB79C\uCE58\uB85C \uBA38\uC9C0\uB418\uB294\uC9C0 \uD655\uC815\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_ref_unobserved:"PR\uC758 base \uBE0C\uB79C\uCE58\uB97C \uC544\uC9C1 \uAD00\uCE21\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",merge_sha_unobserved:"\uBA38\uC9C0 \uCEE4\uBC0B SHA\uB97C \uC544\uC9C1 \uAD00\uCE21\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_fetch_failed:"\uC6D0\uACA9 base \uBE0C\uB79C\uCE58\uB97C fetch\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_rev_unavailable:"fetch\uD55C \uC6D0\uACA9 base \uBE0C\uB79C\uCE58\uC758 \uCEE4\uBC0B\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_ff_diverged:"\uB85C\uCEEC base \uBE0C\uB79C\uCE58\uAC00 \uC6D0\uACA9\uACFC \uAC08\uB77C\uC838 fast-forward\uB85C \uC815\uB82C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",deployment_target_not_covering_merge:"\uBC30\uD3EC \uB300\uC0C1 base\uAC00 \uC774 \uBA38\uC9C0 \uCEE4\uBC0B\uC744 \uD3EC\uD568\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.",deployment_candidate_ancestry_check_failed:"\uBC30\uD3EC \uB300\uC0C1 base\uAC00 \uC774 \uBA38\uC9C0 \uCEE4\uBC0B\uC744 \uD3EC\uD568\uD558\uB294\uC9C0 \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",verify_red:"\uBA38\uC9C0 \uD6C4 \uAC80\uC99D\uC774 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",cleanup_failed:"\uBA38\uC9C0 \uD6C4 \uC815\uB9AC\uAC00 \uB05D\uB098\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",retry_exhausted:"\uC790\uB3D9 \uC7AC\uC2DC\uB3C4\uB97C \uBAA8\uB450 \uC4F0\uACE0\uB3C4 \uAC19\uC740 \uC2E4\uD328\uAC00 \uC774\uC5B4\uC84C\uC2B5\uB2C8\uB2E4.",conflict_unresolved:"\uCDA9\uB3CC \uD574\uC18C\uAC00 \uB05D\uB098\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",internal_record_failed:"Worker \uB0B4\uBD80 \uAE30\uB85D\uC774 \uC2E4\uD328\uD574 \uC9C4\uD589\uC744 \uBA48\uCDC4\uC2B5\uB2C8\uB2E4.",foreign_landing_unpinned:"\uB2E4\uB978 \uC800\uC7A5\uC18C \uCC29\uC9C0\uC778\uB370 foreign_repo\xB7foreign_path\xB7foreign_base \uD540\uC774 \uC5C6\uAC70\uB098 \uD615\uC2DD\uC774 \uD2C0\uB9BD\uB2C8\uB2E4.",foreign_checkout_unavailable:"\uD540\uB41C \uB300\uC0C1 \uC800\uC7A5\uC18C \uCCB4\uD06C\uC544\uC6C3\uC774 \uC5C6\uAC70\uB098 foreign_repo\uC640 \uAC19\uC740 URL\uC758 remote\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4.",foreign_deploy_unsupported:"\uB300\uC0C1 \uC800\uC7A5\uC18C\uAC00 [deploy]\uB97C \uC120\uC5B8\uD574 Worker\uAC00 \uBC30\uD3EC \uC99D\uAC70\uB97C \uB9CC\uB4E4 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4. \uC138\uC158\uC774 \uBC30\uD3EC\uC640 \uB9C8\uAC10\uC744 \uC18C\uC720\uD569\uB2C8\uB2E4.",repair_lane_retired:"\uC790\uB3D9 \uC218\uB9AC \uB808\uC778\uC774 \uC740\uD1F4\uD574 \uC0AC\uB78C \uCC98\uB9AC\uB85C \uB118\uC5B4\uC654\uC2B5\uB2C8\uB2E4."});var lp={verify_failed:"\uAC80\uC99D \uC2E4\uD328",verify_cmd_failed:"\uAC80\uC99D \uC2E4\uD328",verify_script_failure:"\uAC80\uC99D \uC2E4\uD328",deploy_failed:"\uBC30\uD3EC \uC2E4\uD328",deploy_script_failure:"\uBC30\uD3EC \uC2E4\uD328",interrupted_without_terminal_exit:"\uC911\uB2E8\uB428",quickfix_landing_failed:"\uCC29\uC9C0 \uC2E4\uD328",runner_exit:"\uC138\uC158 \uC2E4\uD328",session_parked:"\uC138\uC158 \uB300\uAE30",session_ended_unresolved:"\uC138\uC158 \uC885\uB8CC",prerequisite_unmet:"\uC120\uD589 \uB300\uAE30",delivery_unproven:"\uCC29\uC9C0 \uC99D\uAC70 \uBD80\uC871"};function Li(e){return typeof e!="string"||e.length===0?[]:e.split(":").filter(t=>t.length>0)}function Oi(e){for(let t of Li(e)){if(Object.hasOwn(lp,t))return lp[t];if(t.startsWith("session_"))return"\uC138\uC158 \uC2E4\uD328"}return null}function up(e){return Li(e).length===0?null:Oi(e)||"\uC2E4\uD328"}function Tr(e){let t=null;for(let n of Li(e))Object.hasOwn(ml,n)&&(t=ml[n]);return t}function cr(e){let t=Oi(e),n=Tr(e);return t&&n?`${t} \u2014 ${n}`:t||n?t||n:typeof e=="string"?e:""}function dp(e,t){let n=Oi(e)??Oi(t),r=Tr(t)??Tr(e);return n&&r?`${n} \u2014 ${r}`:n||r?n||r:typeof t=="string"?t:""}var Yb=new Set(["repo_operation_timeout_unresolved"]);function Vb(e){for(let t of Li(e))if(Yb.has(t)||t.startsWith("repo_ops_"))return!0;return!1}function Xb(e,t){return t.code==="interrupted"||t.interrupted===!0||e.failure_kind==="interrupted_without_terminal_exit"||t.code==="interrupted_without_terminal_exit"}function pp(e,t){if(!e||typeof e!="object")return"";let n=e.failure;if(!n||typeof n!="object"||Vb(n.code))return"";if(n.code==="timeout"){let o=Number(t);return Number.isFinite(o)&&o>0?`\uD0C0\uC784\uC544\uC6C3 ${Math.round(o/1e3)}\uCD08 \uCD08\uACFC`:"\uD0C0\uC784\uC544\uC6C3 \uCD08\uACFC"}if(Xb(e,n))return"\uC885\uB8CC \uAE30\uB85D \uC5C6\uC74C \u2014 \uC911\uB2E8\uB428";let r=typeof e.elapsed_ms=="number"&&Number.isFinite(e.elapsed_ms)&&e.elapsed_ms>=0?` \xB7 ${kr(e.elapsed_ms)}`:"";return typeof e.signal=="string"&&e.signal.length>0?`signal ${e.signal}${r}`:Number.isInteger(e.exit_code)?`exit ${e.exit_code}${r}`:""}var cp={schema_unsupported:"\uD540\uB41C \uC815\uCC45 \uC2A4\uD0A4\uB9C8\uB97C \uC9C0\uC6D0\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4."};function fp(e){if(!e||typeof e!="object")return"";let t=e.retry;if(!t||typeof t!="object")return"";if(typeof t.blocked_reason=="string"&&t.blocked_reason)return`\uC790\uB3D9 \uC7AC\uC2DC\uB3C4 \uBABB \uD568 \u2014 ${Object.hasOwn(cp,t.blocked_reason)?cp[t.blocked_reason]:t.blocked_reason}`;if(t.status==="absorbed"){let n=t.absorbed&&typeof t.absorbed=="object"?t.absorbed:null,r=cr(n?.first_failure?.code);return r?`\uC790\uB3D9 \uC7AC\uC2DC\uB3C4\uB85C \uD574\uC18C\uB428 \u2014 \uCCAB \uC2E4\uD328: ${r}`:"\uC790\uB3D9 \uC7AC\uC2DC\uB3C4\uB85C \uD574\uC18C\uB428"}if(e.state!=="failed")return"";if(t.status==="not_applicable")return"\uC7AC\uC2DC\uB3C4 \uB300\uC0C1 \uC544\uB2D8 \u2014 \uC2A4\uD06C\uB9BD\uD2B8 \uC2E4\uD589 \uC804 \uC2E4\uD328";if(t.status==="consumed"){let n=typeof t.first_fingerprint=="string"&&t.first_fingerprint?t.first_fingerprint:null;if(n===null)return"";if(n===e.failure?.fingerprint)return"\uC790\uB3D9 \uC7AC\uC2DC\uB3C4 1\uD68C \u2014 \uAC19\uC740 \uC2E4\uD328";let r=cr(t.first_failure?.code);return r?`\uC790\uB3D9 \uC7AC\uC2DC\uB3C4 1\uD68C \u2014 \uB2E4\uB978 \uC2E4\uD328: ${r}`:"\uC790\uB3D9 \uC7AC\uC2DC\uB3C4 1\uD68C \u2014 \uB2E4\uB978 \uC2E4\uD328"}return""}function Qb(e){if(!Number.isFinite(e)||e<0)return"0s";let t=Math.floor(e/1e3),n=Math.floor(t/60),r=t%60;return n>0?`${n}m ${String(r).padStart(2,"0")}s`:`${r}s`}var _p=200;function Zb(e){return typeof e!="string"||e.length===0?"":e.length>_p?`${e.slice(0,_p)}\u2026`:e}function Jb(e){let t=e&&e.attempts>0&&e.max>0?` ${e.attempts}/${e.max}`:"",n=e&&typeof e.next_at=="number"?` \xB7 ${new Date(e.next_at).toLocaleTimeString("ko-KR",{hour:"2-digit",minute:"2-digit"})}`:"";return`\u21BB \uC7AC\uC2DC\uB3C4 \uB300\uAE30${t}${n}`}function gp(e){if(!e)return"";let t=Array.isArray(e.timeline)?e.timeline:[],n=typeof e.log_path=="string"?e.log_path:"",r=e.log_expired===!0,o=e.log_unreadable===!0;return t.length===0&&n.length===0&&!r&&!o?"":c`${t.length>0?c`<ol class="rtile__history" data-seam="tile-timeline">
        ${t.map(s=>c`<li class="rtile__history-row">
              ${mp(s.at)?c`<span class="rtile__history-at"
                    >${mp(s.at)}</span
                  >`:""}<span class="rtile__history-summary">${s.summary}</span>
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
            ${Zr(n)}
          </p>`:""}`}function mp(e){return typeof e!="number"||!Number.isFinite(e)?"":new Date(e).toLocaleTimeString("ko-KR",{hour:"2-digit",minute:"2-digit"})}function ey(e,t){if(!e||e.open!==!0)return"";let n=Tr(e.cause)||cr(e.cause),r=e.retry&&e.retry.attempts>0?`\uC790\uB3D9 \uC7AC\uC2DC\uB3C4 ${e.retry.attempts}\uD68C \u2014 \uAC19\uC740 \uC624\uB958`:"",o=e.cause_detail,s=e.quickfix_lane&&e.quickfix_landing?e.quickfix_landing:null,i=s?[s.cursor||null,typeof s.head_sha=="string"?s.head_sha.slice(0,7):null,s.reason||null].filter(Boolean).join(" \xB7 "):"",l=typeof e.finished_at=="number"?`${new Date(e.finished_at).toLocaleString("ko-KR")} \xB7 ${nn(e.finished_at,t)}`:"",a=[e.runner,e.model,e.observed_effort??e.effort,e.speed].filter(b=>typeof b=="string"&&b.length>0).join(" \xB7 "),u=e.usage?.total_cost_usd,d=typeof u=="number"&&Number.isFinite(u)?`$${u.toFixed(2)}`:"",f=gp(e);return c`<div
    class="rtile__failure-pop"
    role="dialog"
    aria-label="실패 상세"
  >
    <dl class="rtile__failure-kv">
      ${e.summary?c`<div>
            <dt>보고</dt>
            <dd>${e.summary}</dd>
          </div>`:""}
      ${f?c`<div>
            <dt>이력</dt>
            <dd>${f}</dd>
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
      ${i?c`<div>
            <dt>착지 단계</dt>
            <dd>${i}</dd>
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
  </div>`}function ty(e){return!e||!e.repo&&!e.serial_lane_id?"":c`${e.repo?c`<span
        class="worker-card__repo rtile__repo"
        title=${e.root_dir||""}
        >${e.repo}</span
      >`:""}${e.serial_lane_id?c`<span class="rtile__lane">${e.serial_lane_id}</span>`:""}`}var ny=new Set(["codex-runner"]);function ry(e,t,n,r=null){if(!e)return"";let o=e.last_activity||null,s=o&&typeof o.text=="string"?o.text:"",i=o&&typeof o.at=="number"?o.at:null,l=(r||!Array.isArray(e.legs)?[]:e.legs).filter(m=>m&&!(typeof m.agent_type=="string"&&ny.has(m.agent_type))),a=l.filter(m=>m&&m.state==="live"),u=l.filter(m=>m&&m.state!=="live"),d=r&&typeof r.last_event_at=="number"?nn(r.last_event_at,t):"",f=r?nn(r.updated_at,t):"",b=d?`\uCD5C\uADFC \uD65C\uB3D9 ${d}`:f?`\uAC31\uC2E0 ${f}`:"";return c`${s?c`<div class="rtile__activity${n?" is-paused":""}">
        <span class="rtile__activity-dot" aria-hidden="true"></span>
        <span class="rtile__activity-text">${s}</span>
        ${i!==null?c`<span class="rtile__activity-age"
              >${nn(i,t)}</span
            >`:""}
      </div>`:b?c`<div class="rtile__activity rtile__activity--session">
          <span class="rtile__activity-dot" aria-hidden="true"></span>
          <span class="rtile__activity-text">${b}</span>
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
      </div>`:""}`}var oy={remote:"\uB2E4\uB978 \uBA38\uC2E0 \uC138\uC158 \u2014 \uC774 \uC11C\uBC84\uC5D0 transcript \uC5C6\uC74C",missing:"transcript \uD30C\uC77C \uC5C6\uC74C"};function sy(e){if(!e)return"";let t=oy[e.locality]||"";return c`<button
    type="button"
    class="rtile__session"
    ?disabled=${t.length>0}
    title=${t||"\uB77C\uC774\uBE0C \uC138\uC158 \uC5F4\uAE30"}
    aria-label="라이브 세션 열기"
  >
    ▤ 세션
  </button>`}function iy(e,t,n,r=""){if(e==="retry_wait")return c`<div class="rtile__foot">${n}</div>`;let o=Zb(t?.summary);if(e==="waiting")return c`${o?c`<p class="rtile__held-summary">${o}</p>`:""}${r}
      <div class="rtile__foot">${n}</div>`;let s=gp(t);return c`${o?c`<p class="rtile__held-summary">${o}</p>`:""}${s}
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
    </div>`}function gl(e,t,n=null,r={}){let o=e.kind==="session",s=o&&Array.isArray(e.session_refs)&&e.session_refs.find(Ye=>Ye&&Ye.current===!0)||null,i=e.failed===!0,l=i&&e.failure||null,a=e.parked===!0&&!i,u=e.retry_wait===!0&&!i&&!a,d=e.waiting===!0&&!i&&!a&&!u,f=a&&e.failure||null,b=d&&e.wait||null,m=a||u||d,k=!!e.paused,R=i||m?e.status_label||(a?"\uC138\uC158 \uB300\uAE30":u?"\uC7AC\uC2DC\uB3C4 \uB300\uAE30":d?"\uC120\uD589 \uB300\uAE30":e.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328"):k?"\uC77C\uC2DC\uC815\uC9C0":typeof e.started_at=="number"?Qb(t-e.started_at):"\u2014",j=e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker)?e.exec_chips:null,H=bo(e),oe=Qt(e.usage),X=Hn(e.usage),q=e.conflict_resolution?k?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":"\uCDA9\uB3CC \uD574\uC18C":null,O=e.base_exception||null,I=e.landing,F=e.attempt_id&&e.attempt_id===n,B=r.monitor||null,ae=ty(B),N=Gs(B?.cross_lane_chip),W=B?Hs(B.dependency_chips):"",Z=ry(B,t,k,o?{updated_at:e.updated_at??null,last_event_at:s&&s.locality==="local"?s.last_event_at:null}:null),ee=o&&e.workflow?.chips?.exec_receipt||null,Se=Ks(e.workflow),ge=Ys(e.rec,e.chip_popover?.chip_key==="rec"),ue=e.chip_popover?Kr(e.chip_popover.content):"",P=ee?c`<span
        class="ctl-chip ctl-chip--exec-receipt"
        title=${`exec_receipt ${Wn(ee)}`}
        >${`${ee.kind}:${$s(ee)}`}</span
      >`:"",we=s?c`<span
        class="ctl-chip ctl-chip--sref"
        title=${`${s.provider}:${s.session_id}@${s.host}${(e.session_refs||[]).length>=2?` \xB7 \uC774\uB825 ${(e.session_refs||[]).length}`:""}`}
        >${vo(s)}</span
      >`:"",xe=ae||N||Se||we||P||ge?c`<div class="rtile__meta">
          ${ae}${N}${Se}${we}${P}${ge}${ue}
        </div>`:"",E=l?c`<button
          type="button"
          class="rtile__failure-badge"
          data-attempt-id=${l.attempt_id}
          aria-expanded=${l.open===!0?"true":"false"}
          aria-label="실패 상세"
        >
          ⛔ ${up(l.cause)||"\uC2E4\uD328"}
        </button>
        ${l.halted_auto_advance?c`<span class="rtile__auto-halted">자동 진행 꺼짐</span>`:""}`:"",J=a?c`<span
        class="rtile__held-badge"
        title="세션이 사용자 결정을 기다리며 정상 종료했습니다 — 큐는 계속 갑니다"
        >⏸ 세션 대기</span
      >`:u?c`<span
          class="rtile__held-badge"
          title="환경성 실패의 자동 재시도를 기다립니다 — 사람이 할 일은 없습니다"
          >${Jb(e.retry)}</span
        >`:d?c`<span
            class="rtile__held-badge"
            title="세션이 선행 미충족으로 착수를 거부했습니다 — 선행이 닫히면 저절로 다시 돕니다"
            >⛓ 선행 대기</span
          >`:"",Ae=c`${q?c`<span class="worker-mini__badge">${q}</span>`:""}${O?c`<span
        class="worker-mini__badge"
        title="이 세션의 target base가 워크스페이스 선언 base와 다릅니다"
        >${O}</span
      >`:""}${E}${J}`,_e=o?"":eo(e),ke=Ds(l?.quickfix_landing),me=ke==="settlement"?"\uC815\uC0B0 \uC7AC\uAC1C":"\uC774\uC5B4\uD558\uAE30",De=ke==="settlement"?"\uCC29\uC9C0 \uC815\uC0B0\uC744 \uB2E4\uC2DC \uC2E4\uD589":"\uAC19\uC740 \uC138\uC158\uC73C\uB85C \uC774\uC5B4\uC11C \uC9C4\uD589",ot=e.discard?.action&&!(i&&l?.landed===!0)?c`<button
          type="button"
          class="rtile__discard"
          data-operation-id=${e.discard.operation?.operation_id||""}
          data-confirmation=${l?.confirmation||"unmerged"}
          ?disabled=${!e.discard.enabled}
          title=${e.discard.title}
          aria-label=${e.discard.label}
        >
          ${e.discard.label}
        </button>`:"";return c`<div
    class="rtile${F?" rtile--sel":""}${k?" rtile--paused":""}${i?" rtile--failed rtile--compact":""}${m?" rtile--held rtile--compact":""}${a?" rtile--parked":""}${u?" rtile--retry-wait":""}${d?" rtile--waiting":""}${o?" rtile--session":""}"
    data-bead-id=${e.bead_id}
    data-attempt-id=${e.attempt_id||""}
  >
    <div class="rtile__hd">
      <span
        class="rtile__dot${o?" rtile__dot--session":""}"
        aria-hidden="true"
      ></span>
      <span class="rtile__id" title="클릭하면 ID 복사">${e.bead_id}</span>
      ${Vs(e.priority)}${H?c`<span class="rtile__resumed" title=${H}>↻</span>`:""}${Ae}
      <div class="rtile__hd-actions">
        ${o?c`${typeof e.started_at=="number"?c`<span class="rtile__elapsed">${R}</span>`:""}${sy(s)}<span
                class="rtile__session-badge"
                title="Worker가 아닌 세션이 in_progress로 잡은 이슈"
                >세션</span
              >`:c`<span class="rtile__elapsed">${R}</span>`}
        ${o||m?"":i?c`<button
                  type="button"
                  class="rtile__resume"
                  data-resume-kind=${ke}
                  ?disabled=${l?.resume_eligible===!1}
                  title=${l?.resume_eligible===!1?l.resume_reason||`${me} \uBD88\uAC00`:De}
                  aria-label=${me}
                >
                  ↻ ${me}
                </button>
                ${ot}`:c`<button
                  type="button"
                  class="rtile__session"
                  title="라이브 세션 열기"
                  aria-label="라이브 세션 열기"
                >
                  ▤ 세션
                </button>
                ${k?c`<button
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
                ${ot}`}
      </div>
    </div>
    <div class="rtile__title">${e.title}</div>
    ${m?iy(a?"parked":u?"retry_wait":"waiting",a?f:b,ot,d?W:""):i?"":c`${Z}${e.rollup?ws(e.rollup,{parent_id:e.bead_id,expanded:e.rollup_expanded===!0,childChips:ea}):""}
            ${I?c`<div class="rtile__landing">
                  <span
                    class="merge-step${I.failed?" merge-step--failed":""}"
                    style=${`--progress: ${I.percent}%`}
                    >${I.label}${I.index>0?c`<span class="merge-step__n"
                          >${I.index}/${I.total}</span
                        >`:""}</span
                  >
                </div>`:""}
            ${W}
            ${o?xe:ae||N||Se||j||ge||oe.length>0||X?c`<div class="rtile__meta">
                    ${ae}${N}${Se}${zs(e.exec_chips)}${ge}
                    ${oe.length>0?oe.map(Ye=>c`<span
                              class="worker-usage"
                              title=${Ye.tooltip}
                              >${Ye.label}</span
                            >`):X?c`<span
                            class="worker-usage"
                            title=${wo(e.usage)}
                            >${X}</span
                          >`:""}${ue}
                  </div>`:""}
            ${js(e)} ${_e}
            <!-- 살아있음만 말하는 비의미적 액센트 (UI-58y2 데스크톱 §실행 타일).
         quick_fix landing의 실제 진행은 위의 별도 진행 줄이 소유한다.
         일시정지된 타일은 살아있지 않으므로 액센트도 없다. -->
            ${i||k?"":c`<div class="rtile__accent" aria-hidden="true"></div>`}`}
    ${ey(l,t)}
  </div>`}function ay(e){let t=e.last_activity&&typeof e.last_activity=="object"?e.last_activity:null,n=Array.isArray(e.legs)?e.legs:[],r=e.dependency_chips||null;return!t&&n.length===0&&!r&&e.kind!=="session"?null:{...t?{last_activity:t}:{},...n.length>0?{legs:n}:{},...r?{dependency_chips:r}:{}}}function hp(e,t=Date.now(),n=null){let r=Array.isArray(e)?e:[];return c`<div class="worker-rungrid" id="worker-rungrid">
    ${r.length===0?c`<div class="worker-rungrid__empty">실행 세션 없음</div>`:r.map(o=>gl(o,t,n,{monitor:ay(o)}))}
  </div>`}var Zt="",ly=["impl_runtime","impl_model","impl_effort"],cy=["claude_account","codex_account"],uy=5,Ii=1;function dn(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function Mi(e,t){let n=t.transport,r=typeof t.root_dir=="string"&&t.root_dir.length>0?t.root_dir:null,o=t.notify||(L=>be(L,"error",4e3)),s={},i={},l=[],a=!1,u={state:"absent",values:{},warnings:[]},d={},f={},b=Promise.resolve(),m={claude:null,codex:null},k=!1,R=null,j={},H="",oe="",X=!1,q=!1,O=!1,I=null,F=!1;function B(){let L=t.queue?t.queue():null;return dn(L)?L:null}function ae(){let L=B();return L?L.runner_catalog:null}function N(){let L=B();return L&&dn(L.execution_defaults)?L.execution_defaults:null}function W(){let L=t.implPresetStore?.get();return dn(L)&&Array.isArray(L.presets)?L:null}function Z(){return r===null?{}:{root_dir:r}}async function ee(L,te){return F||!n?null:await n(L,te)}function Se(L){L&&dn(L.queue)&&t.onQueueAdopt?.(L.queue)}async function ge(L,te){let ye=B();if(!ye||F)return null;let T=await ee(L,{...te,...Z(),expected_revision:ye.revision});if(Se(T),r!==null&&T&&T.conflict){let K=T.queue&&typeof T.queue.revision=="number"?T.queue.revision:B()?.revision??ye.revision;T=await ee(L,{...te,...Z(),expected_revision:K}),Se(T)}return T}async function ue(){a=!0,Be();try{let L=await ee("get-session-defaults",{...Z()});s=dn(L?.values)?{...L.values}:{},i={...s},l=Array.isArray(L?.warnings)?L.warnings:[]}catch(L){l=["kv_read_failed"],o(`\uC138\uC158 \uAE30\uBCF8\uAC12\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4: ${L instanceof Error?L.message:String(L)}`)}finally{a=!1,Be()}}async function P(){let L=Qc(s,i);if(Object.keys(L).length!==0){try{let te=await ee("set-session-defaults",{values:L,...Z()});s=dn(te?.values)?{...te.values}:{},i={...s},l=Array.isArray(te?.warnings)?te.warnings:[]}catch(te){o(`\uC138\uC158 \uAE30\uBCF8\uAC12 \uC800\uC7A5 \uC2E4\uD328: ${te instanceof Error?te.message:String(te)}`)}Be()}}function we(L,te){if(!dn(L))return;let ye=L.state;u={state:ye==="usable"||ye==="unusable"||ye==="absent"?ye:"absent",values:dn(L.values)?{...L.values}:{},warnings:Array.isArray(L.warnings)?L.warnings:[]},f={...u.values},te&&(d={...f})}async function xe(){try{we(await ee("get-workspace-accounts",{...Z()}),!0)}catch(L){u={state:"unusable",values:{},warnings:["kv_read_failed"]},f={},d={},o(`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4: ${L instanceof Error?L.message:String(L)}`)}Be()}async function E(L){try{let te=await fetch(L);if(!te.ok)return null;let ye=await te.json();if(!dn(ye)||!Array.isArray(ye.accounts))return null;let T=ye.accounts.filter(K=>dn(K)&&typeof K.key=="string"&&K.key.length>0&&typeof K.email=="string"&&K.email.length>0);return{accounts:T,active:T.find(K=>K.active===!0)||null}}catch{return null}}async function J(){k=!0;let[L,te]=await Promise.all([E("/api/claude-usage"),E("/api/codex-usage")]);F||(m={claude:L,codex:te},Be())}function Ae(){let L={};for(let te of cy){let ye=Object.hasOwn(d,te)?d[te]:null,T=Object.hasOwn(f,te)?f[te]:null;ye!==T&&(L[te]=ye)}return L}async function _e(){let L=Ae();if(Object.keys(L).length!==0){try{we(await ee("set-workspace-accounts",{values:L,...Z()}),!1)}catch(te){o(`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12 \uC800\uC7A5 \uC2E4\uD328: ${te instanceof Error?te.message:String(te)}`)}Be()}}function ke(L,te){te===Zt?delete d[L]:d[L]=te,Be(),b=b.then(()=>_e())}function me(L,te){if(ly.includes(L)){Ye(L,te);return}te===Zt?delete i[L]:i[L]=te,Be(),P()}function De(){let L=$t().orchestration_model,te=fn({global:{orchestration_model:L??void 0},execution_defaults:N(),runner_catalog:ae()}).orchestration_model.value;return te?xn(ae(),te):null}function ot(L,te){typeof te=="string"&&te.length>0?i[L]=te:delete i[L]}function Ye(L,te){let ye=te===Zt?void 0:te,T=Vc({impl_runtime:L==="impl_runtime"?ye:i.impl_runtime,impl_model:L==="impl_model"?ye:i.impl_model,impl_effort:L==="impl_effort"?ye:i.impl_effort},ae(),De());ot("impl_runtime",T.impl_runtime),ot("impl_model",T.impl_model),ot("impl_effort",T.impl_effort),Be(),P()}async function M(){let L=B();if(!L)return;let te={orchestration_model:L.orchestration_model??null,orchestration_effort:L.orchestration_effort??null,orchestration_speed:L.orchestration_speed??null},ye=Zc(te,{...te,...j});if(Object.keys(ye).length!==0){try{let T=await ge("worker-queue-set-orchestration-defaults",{values:ye});if(T&&T.applied===!1){o("Worker \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC");return}j={}}catch(T){o(`Worker \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${T instanceof Error?T.message:String(T)}`)}Be()}}function se(L,te){j[L]=te===Zt?null:te,Be(),M()}function le(L){if(R=L,!L){Be();return}let te=ae(),ye=$t(),T=ye.orchestration_model;T&&!Ao(te,L).includes(T)&&(j.orchestration_model=null,T=null);let K=ye.orchestration_effort;K&&!ua(te,L,T||mn).includes(K)&&(j.orchestration_effort=null),Be(),M()}async function pe(L){if(!(!B()||L<Ii)){try{await ge("worker-queue-set-slots",{slots:L})}catch(te){o(`slots \uC800\uC7A5 \uC2E4\uD328: ${te instanceof Error?te.message:String(te)}`)}Be()}}async function he(L){if(!(!B()||L<Ii||L>uy)){try{await ge("worker-queue-set-serial-lane-count",{count:L})}catch(te){o(`\uC9C1\uB82C \uB808\uC778 \uC800\uC7A5 \uC2E4\uD328: ${te instanceof Error?te.message:String(te)}`)}Be()}}async function ce(L,te){let ye=L==="auto_advance"?"worker-automation-toggle":"worker-merge-auto-toggle";try{await ge(ye,{on:te})}catch(T){o(`\uC790\uB3D9\uD654 \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${T instanceof Error?T.message:String(T)}`)}Be()}function Fe(){let L={},te=$t();for(let ye of Yr){let T=Yn.includes(ye)?te[ye]:i[ye];typeof T=="string"&&T.length>0&&(L[ye]=T)}return L}async function Ge(){let L=W();if(!L)return;let te=Fe();if(Object.keys(te).length===0){o("\uC800\uC7A5\uD560 \uC2E4\uD589 \uC124\uC815\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uBA3C\uC800 \uC2E4\uD589 \uAC12\uC744 \uC120\uD0DD\uD558\uC138\uC694");return}let ye=(L.presets||[]).find(K=>K.id===H),T=oe.trim()||(ye?ye.name:"");if(!T){o("\uD504\uB9AC\uC14B \uC774\uB984\uC744 \uC785\uB825\uD558\uC138\uC694");return}try{let K=ye?await ee("impl-preset-update",{expected_revision:L.revision,id:ye.id,name:T,settings:te}):await ee("impl-preset-create",{expected_revision:L.revision,name:T,settings:te});if(K&&K.applied){if(oe="",!ye&&Array.isArray(K.presets)){let Ie=K.presets.find(Ue=>Ue.name===T);H=Ie?Ie.id:H}Be()}else o("\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4"),Be()}catch(K){o(`\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328: ${K instanceof Error?K.message:String(K)}`)}}async function Ze(){let L=W();if(!(!L||H.length===0))try{let te=await ee("impl-preset-delete",{expected_revision:L.revision,id:H});te&&te.applied?(H="",Be()):(o("\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328: \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4"),Be())}catch(te){o(`\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328: ${te instanceof Error?te.message:String(te)}`)}}function Pe(L){s=dn(L.values)?{...L.values}:{},i={...s},l=Array.isArray(L.warnings)?L.warnings:[],dn(L.queue)&&(t.onQueueAdopt?.(L.queue),j={})}async function Q(){let L=W(),te=B();if(!L||!te||H.length===0)return;let ye=T=>({preset_id:H,expected_revision:L.revision,expected_queue_revision:T,...Z()});try{let T=await ee("apply-impl-preset-global",ye(te.revision));if(T&&T.applied&&Pe(T),r!==null&&T&&T.queue_applied===!1){let K=T.queue&&typeof T.queue.revision=="number"?T.queue.revision:B()?.revision??te.revision;T=await ee("apply-impl-preset-global",ye(K)),T&&T.applied&&Pe(T)}T&&T.applied?T.queue_applied===!1&&o("\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uAC12\uC740 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC138\uC694"):T&&T.conflict&&o("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328: \uD504\uB9AC\uC14B\uC774 \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4")}catch(T){o(`\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328: ${T instanceof Error?T.message:String(T)}`)}Be()}async function U(){q=!0,O=!1,Be();try{let L=await ee("get-worker-system-prompt",{});!L||typeof L!="object"||Array.isArray(L)?O=!0:I=L}catch{O=!0}finally{q=!1,Be()}}function Ne(){if(X=!X,X&&!I){U();return}Be()}function ut(){let L=oo({loading:q,error:O});if(L)return L;if(!I)return"";let te=Array.isArray(I.variants)?I.variants:[];return c`<div class="settings-dialog__sp-body">
      ${I.target_base_placeholder?c`<div class="prompt-block__meta">
            \`${I.target_base_placeholder}\`는 디스패치 시점에 해석된
            base로 치환됩니다.
          </div>`:""}
      ${te.map(ye=>c`<div class="settings-dialog__sp-variant" data-variant=${ye.key}>
            <div class="settings-dialog__sp-cond">${ye.condition}</div>
            ${Jn(ye.label,ye.system_prompt)}
          </div>`)}
    </div>`}function et(){return c`<section
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
        @click=${Ne}
      >
        ${X?"\uC811\uAE30":"\uC804\uBB38 \uBCF4\uAE30"}
      </button>
      ${X?ut():""}
    </section>`}function v(L,te,ye,T,K,Ie,Ue){let qe=K[L]??Zt,tt=da(L,ye,K,N(),ae(),Ue),Oe=tt.options.find(Je=>Je.value===qe),He=qe===Zt?tt.full_value:Oe?.full_value;return c`<select
        class=${qe===Zt?"settings-dialog__unset":""}
        data-key=${L}
        aria-label=${te}
        title=${He||""}
        ?disabled=${Ie===!0||tt.disabled}
        .value=${Sr(String(qe))}
        @change=${Je=>T(L,String(Je.target.value))}
      >
        <option value=${Zt} ?selected=${qe===Zt}>
          ${tt.unset_label}
        </option>
        ${tt.options.map(Je=>c`<option
              value=${Je.value}
              title=${Je.full_value||""}
              ?selected=${Je.value===qe}
            >
              ${Je.label}
            </option>`)}
      </select>
      ${qe===Zt?c`<span class="settings-dialog__source-badge">기본</span>`:""}`}function z(L,te,ye,T,K,Ie=!1,Ue){return c`<div
      class=${`settings-dialog__row${Ie?" settings-dialog__row--off":""}`}
    >
      <span class="settings-dialog__row-label">${te}</span>
      <span class="settings-dialog__controls">
        ${v(L,te,ye,T,K,Ie,Ue)}
      </span>
    </div>`}function Ee(L,te){let ye=te?te.active:null;return dn(ye)?`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(${L==="claude"?ye.email:io({...ye,alias:null})})`:"\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(\uD655\uC778 \uBD88\uAC00)"}function Ce(L,te,ye){let T=m[ye],K=Object.hasOwn(d,L)?d[L]:Zt,Ie=ye==="claude"?xi:io,Ue=!!T?.accounts.some(qe=>qe.key===K);return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${te}</span>
      <span class="settings-dialog__controls">
        <select
          aria-label=${te}
          data-account-key=${L}
          @change=${qe=>ke(L,String(qe.target.value))}
        >
          <option value=${Zt} ?selected=${K.length===0}>
            ${Ee(ye,T)}
          </option>
          ${K.length>0&&!Ue?c`<option value=${K} selected>
                ${K} (목록에 없음)
              </option>`:""}
          ${T?.accounts.map(qe=>c`<option value=${qe.key} ?selected=${qe.key===K}>
                ${Ie(qe)}
              </option>`)||""}
        </select>
        ${T?"":c`<span class="settings-dialog__hint"
              >계정 목록을 불러올 수 없습니다</span
            >`}
      </span>
    </div>`}function je(){let L=u.warnings.join(", ");return u.state==="unusable"?`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12\uC744 \uD574\uC11D\uD560 \uC218 \uC5C6\uC5B4 \uC774 \uB808\uD3EC\uC758 \uB514\uC2A4\uD328\uCE58\uAC00 \uAC70\uBD80\uB429\uB2C8\uB2E4 \u2014 ${L} \xB7 \uACC4\uC815\uC744 \uB2E4\uC2DC \uACE0\uB974\uBA74 \uD574\uC18C\uB429\uB2C8\uB2E4`:u.warnings.length>0?`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12\uC5D0 \uC54C \uC218 \uC5C6\uB294 \uD0A4\uAC00 \uC788\uC2B5\uB2C8\uB2E4 \u2014 ${L}`:null}function Ve(L,te,ye,T,K){return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">
        <i
          class="settings-dialog__stage-dot"
          style=${`background: var(--stage-${te}-on)`}
        ></i>
        ${L}
      </span>
      <span class="settings-dialog__controls">
        ${v(ye,`${L} \uBAA8\uB378`,T,me,i,!1)}
        ${v(K,`${L} effort`,Ls,me,i,!1)}
      </span>
    </div>`}function pt(L,te,ye,T){return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${te}</span>
      <span class="settings-dialog__controls">
        <button
          type="button"
          class=${`settings-dialog__toggle${T?" is-on":""}`}
          data-automation=${L}
          aria-pressed=${T?"true":"false"}
          aria-label=${te}
          @click=${()=>ce(L,!T)}
        >
          ${T?"\uCF1C\uC9D0":"\uAEBC\uC9D0"}
        </button>
        <span class="settings-dialog__hint">${ye}</span>
      </span>
    </div>`}function kt(L,te,ye,T){return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${te}</span>
      <span class="settings-dialog__controls">
        <span class="settings-dialog__stepper" data-stepper=${L}>
          <button
            type="button"
            aria-label=${`${te} \uAC10\uC18C`}
            @click=${()=>T(ye-1)}
          >
            −
          </button>
          <span class="settings-dialog__stepper-value">${ye}</span>
          <button
            type="button"
            aria-label=${`${te} \uC99D\uAC00`}
            @click=${()=>T(ye+1)}
          >
            +
          </button>
        </span>
      </span>
    </div>`}function Lt(L){return c`<div class="settings-dialog__preset-diff" data-preset-diff>
      <div class="settings-dialog__preset-diff-head">
        ${L.rows.length>0?`\uBCC0\uACBD ${L.rows.length}\uAC1C \xB7 \uC801\uC6A9\uD558\uBA74 \uC544\uB798\uC640 \uAC19\uC774 \uBC14\uB01D\uB2C8\uB2E4`:"\uD604\uC7AC \uC124\uC815\uACFC \uAC19\uC2B5\uB2C8\uB2E4 \u2014 \uC801\uC6A9\uD560 \uBCC0\uACBD\uC774 \uC5C6\uC2B5\uB2C8\uB2E4"}
      </div>
      ${L.rows.map(te=>c`<div
            class="settings-dialog__preset-diff-row"
            data-diff-kind=${te.kind}
          >
            <span class="settings-dialog__preset-diff-label">${te.label}</span>
            <span class="settings-dialog__preset-diff-value"
              >${te.before??"\uAE30\uBCF8"}</span
            >
            <span class="settings-dialog__preset-diff-arrow">→</span>
            <span
              class="settings-dialog__preset-diff-value settings-dialog__preset-diff-after"
              >${te.after??"\uAE30\uBCF8(\uD574\uC81C)"}</span
            >
          </div>`)}
      ${L.ignored_keys.length>0?c`<div class="settings-dialog__preset-diff-note">
            ${L.ignored_keys.join(", ")}은(는) 전역 적용이 쓰지 않는 키라
            무시됩니다
          </div>`:""}
    </div>`}function $t(){let L=B(),te={};for(let ye of Yn)te[ye]=Object.prototype.hasOwnProperty.call(j,ye)?j[ye]:L&&typeof L[ye]=="string"?L[ye]:null;return te}function _t(){let L=ae(),te=i.impl_runtime,ye=i.impl_model,T=W(),K=B(),Ie=$t(),Ue=Ao(L,R),qe=Vr(L,void 0).filter(lt=>lt!==mn),tt=ua(L,R,Ie.orchestration_model||mn).filter(lt=>lt!==mn),Oe=H?(T?.presets||[]).find(lt=>lt.id===H):null,He=Oe?Xc(Fe(),dn(Oe.settings)?Oe.settings:{}):null,Je=K&&typeof K.slots=="number"?K.slots:Ii+1,bt=K&&typeof K.serial_lane_count=="number"?K.serial_lane_count:Ii,ze=N()?.supported===!0,xt=je(),qt=da("workflow_mode",$o,i,N(),L);return c`
      ${l.length>0?c`<div class="settings-dialog__banner" role="alert">
            워크스페이스 기본값을 일부 읽지 못했습니다 —
            ${l.join(", ")}
          </div>`:""}
      ${xt?c`<div
            class="settings-dialog__banner"
            data-account-warning
            role="alert"
          >
            ${xt}
          </div>`:""}
      ${ze?"":c`<div
            class="settings-dialog__banner settings-dialog__banner--projection"
            data-execution-defaults-warning
            role="alert"
          >
            실행 기본값 projection을 확인할 수 없습니다 — 기본값 확인 불가
          </div>`}
      ${a?c`<div class="settings-dialog__empty">불러오는 중…</div>`:c`
            <div class="settings-dialog__preset-bar">
              <select
                aria-label="실행 프리셋"
                .value=${Sr(H)}
                @change=${lt=>{H=String(lt.target.value),Be()}}
              >
                <option value="" ?selected=${H===""}>
                  실행 프리셋…
                </option>
                ${(T?.presets||[]).map(lt=>c`<option
                      value=${lt.id}
                      ?selected=${lt.id===H}
                    >
                      ${lt.name}
                    </option>`)}
              </select>
              <button
                type="button"
                class="settings-dialog__btn settings-dialog__btn--primary"
                data-preset-apply-global
                ?disabled=${!He||He.rows.length===0}
                @click=${Q}
              >
                적용
              </button>
              <input
                type="text"
                class="settings-dialog__preset-name"
                placeholder=${H?"\uC774\uB984 (\uBE44\uC6B0\uBA74 \uC720\uC9C0)":"\uC0C8 \uD504\uB9AC\uC14B \uC774\uB984"}
                aria-label="프리셋 이름"
                .value=${Sr(oe)}
                @input=${lt=>{oe=String(lt.target.value)}}
              />
              <button
                type="button"
                class="settings-dialog__btn"
                data-preset-save
                title=${H?"\uD604\uC7AC \uD654\uBA74\uC758 \uC2E4\uD589 \uC124\uC815\uC744 \uC774 \uD504\uB9AC\uC14B\uC5D0 \uC800\uC7A5\uD569\uB2C8\uB2E4 (\uD504\uB9AC\uC14B \u2192 \uC124\uC815 \uBC29\uD5A5\uC774 \uC544\uB2D8)":"\uD604\uC7AC \uD654\uBA74\uC758 \uC2E4\uD589 \uC124\uC815\uC744 \uC0C8 \uD504\uB9AC\uC14B\uC73C\uB85C \uC800\uC7A5\uD569\uB2C8\uB2E4"}
                @click=${Ge}
              >
                ${H?"\uD604\uC7AC \uC124\uC815\uC73C\uB85C \uB36E\uC5B4\uC4F0\uAE30":"\uC0C8 \uD504\uB9AC\uC14B \uC800\uC7A5"}
              </button>
              <button
                type="button"
                class="settings-dialog__btn"
                data-preset-delete
                ?disabled=${H.length===0}
                @click=${Ze}
              >
                삭제
              </button>
            </div>
            ${He?Lt(He):""}

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">오케스트레이션</div>
              <div class="settings-dialog__row">
                <span class="settings-dialog__row-label">런타임</span>
                <span class="settings-dialog__controls">
                  <select
                    aria-label="런타임"
                    data-key="orchestration_runtime_filter"
                    .value=${Sr(R||Zt)}
                    @change=${lt=>{let Yt=String(lt.target.value);le(Yt===Zt?null:Yt)}}
                  >
                    <option value=${Zt} ?selected=${!R}>
                      전체
                    </option>
                    <option
                      value="claude"
                      ?selected=${R==="claude"}
                    >
                      claude
                    </option>
                    <option
                      value="codex"
                      ?selected=${R==="codex"}
                    >
                      codex
                    </option>
                  </select>
                  <span class="settings-dialog__hint"
                    >모델 목록을 좁힙니다</span
                  >
                </span>
              </div>
              ${z("orchestration_model","\uBAA8\uB378",Ue,se,Ie)}
              ${z("orchestration_effort","effort",tt,se,Ie)}
              ${z("orchestration_speed","\uC18D\uB3C4",ko,se,Ie)}
            </div>

            <div class="settings-dialog__group" data-exec-accounts-group>
              <div class="settings-dialog__group-title">실행 계정</div>
              ${Ce("claude_account","Claude","claude")}
              ${Ce("codex_account","Codex","codex")}
            </div>

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">워크플로우</div>
              <div class="settings-dialog__row">
                <span class="settings-dialog__row-label">모드</span>
                <span class="settings-dialog__controls">
                  <span class="settings-dialog__seg" role="group">
                    <button
                      type="button"
                      data-mode=${Zt}
                      aria-pressed=${String(!i.workflow_mode)}
                      @click=${()=>me("workflow_mode",Zt)}
                    >
                      ${qt.unset_label}
                    </button>
                    ${i.workflow_mode?"":c`<span class="settings-dialog__source-badge"
                          >기본</span
                        >`}
                    ${$o.map(lt=>c`<button
                          type="button"
                          data-mode=${lt}
                          aria-pressed=${String(i.workflow_mode===lt)}
                          @click=${()=>me("workflow_mode",lt)}
                        >
                          ${lt}
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
              ${Ve("\uC0AC\uC591 \uB9AC\uBDF0","spec","spec_review_model",xo,"spec_review_effort")}
              ${Ve("\uACC4\uD68D \uB9AC\uBDF0","plan","plan_review_model",Os,"plan_review_effort")}
              ${Ve("\uAD6C\uD604 \uB9AC\uBDF0","impl","impl_review_model",xo,"impl_review_effort")}
            </div>

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">
                구현
                <span class="settings-dialog__hint"
                  >이슈 핀이 있으면 핀이 우선합니다</span
                >
              </div>
              ${z("impl_runtime","\uC704\uC784 \uB300\uC0C1",Rs,me,i)}
              ${z("impl_model","\uBAA8\uB378",Vr(L,te),me,i)}
              ${z("impl_effort","effort",Xr(L,te,ye),me,i)}
              ${z("impl_speed","\uC18D\uB3C4",ko,me,i)}
              ${z("quick_fix_impl_model","quick_fix \uAD6C\uD604 \uBAA8\uB378",qe,me,i,!1,{...i,...Ie})}
            </div>

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">
                자동화
                <span class="settings-dialog__hint"
                  >이 레포의 워커 큐가 스스로 진행하는 범위</span
                >
              </div>
              ${pt("auto_advance","\uC790\uB3D9\uD654","\uC2AC\uB86F\uC774 \uBE44\uBA74 \uB300\uAE30 \uC55E \uD589\uC774 \uCD9C\uBC1C\uD569\uB2C8\uB2E4",K?.auto_advance===!0)}
              ${pt("auto_merge","\uBA38\uC9C0","\uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4",K?.auto_merge===!0)}
              ${kt("slots","\uB3D9\uC2DC \uC2E4\uD589",Je,lt=>pe(lt))}
              ${kt("serial-lane-count","\uC9C1\uB82C \uB808\uC778",bt,lt=>he(lt))}
            </div>
            ${et()}
          `}
    `}function Be(){F||st(_t(),e)}return{load(){j={};let L=[ue(),xe()];return k||L.push(J()),Promise.all(L).then(()=>{})},render:Be,sessionDraft:()=>({...i}),destroy(){F=!0,st(c``,e)}}}function Di(e){return c`<svg
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
  </svg>`}function bp(){return Di(mo`<path d="M5.5 3.6 12 8l-6.5 4.4z" />`)}function yp(){return Di(mo`<path d="M6 3.8v8.4M10 3.8v8.4" />`)}function vp(){return Di(mo`<path
      d="M4.6 5.6v4.8M4.6 8.2h2.2A3.2 3.2 0 0 0 10 5"
    />
    <circle cx="4.6" cy="4" r="1.5" />
    <circle cx="4.6" cy="12" r="1.5" />
    <circle cx="11.4" cy="4" r="1.5" />`)}function wp(){return Di(mo`<circle cx="8" cy="8" r="2.1" />
    <path
      d="M8 1.9v1.8M8 12.3v1.8M1.9 8h1.8M12.3 8h1.8M3.7 3.7l1.3 1.3M11 11l1.3 1.3M12.3 3.7 11 5M5 11l-1.3 1.3"
    />`)}function kp(e){return`${e} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}function $p(e){let t=(Array.isArray(e)?e:[]).map(l=>l&&l.usage).filter(l=>l&&typeof l=="object"&&"providers"in l);if(t.length>0)return Qt(Ts(t));let n={};for(let l of Mn)n[l]=0;let r=!1,o=0,s=0,i=0;for(let l of Array.isArray(e)?e:[]){let a=l&&l.usage;if(a&&typeof a=="object"){let u=!1;for(let d of Mn){let f=a[d];typeof f=="number"&&Number.isFinite(f)&&(n[d]+=f,r=!0,u=!0)}if(u){s+=1;let d=a.total_cost_usd;typeof d=="number"&&Number.isFinite(d)&&(o+=d,i+=1)}}}return s>0&&i===s&&(n.total_cost_usd=o),r?Hn(n):null}function Rn(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function hl(e,t){let n=Rn(e?.counts)?e.counts:null,r=n?n[t]:null;return typeof r=="number"&&Number.isFinite(r)?r:0}function dy(e,t){if(!Rn(t))return e;let n={...e};for(let[r,o]of Object.entries(t))o!==void 0&&(n[r]=o);return n}function py(e){if(!Rn(e)||!Rn(e.execution_defaults)||!Rn(e.runner_catalog)||!Rn(e.session_defaults))return null;let t={...e.session_defaults};for(let i of["orchestration_model","orchestration_effort","orchestration_speed"])typeof e[i]=="string"&&e[i].length>0&&(t[i]=e[i]);let n=fn({global:t,execution_defaults:e.execution_defaults,runner_catalog:e.runner_catalog}),r=xn(e.runner_catalog,n.orchestration_model.value??""),o=Qr(n,e.runner_catalog),s=wr(n,r);return o===null&&s===null?null:{orchestration:o,worker:s}}function xp(e,t){let n=t.notify||(E=>be(E,"error",4e3)),r=document.createElement("div");r.className="mon2-deck__main",e.appendChild(r);let o=document.createElement("div");o.className="mon2-deck__panel",o.hidden=!0;let s=document.createElement("div");s.className="mon2-deck__panel-hd";let i=document.createElement("span");i.className="mon2-deck__panel-title";let l=document.createElement("button");l.type="button",l.className="mon2-deck__panel-close",l.setAttribute("aria-label","\uC2E4\uD589 \uC124\uC815 \uB2EB\uAE30"),l.textContent="\u2715",s.append(i,l);let a=document.createElement("div");a.className="mon2-deck__panel-body",o.append(s,a),e.appendChild(o);let u=null,d=null,f=null,b=new Map;function m(){let E=t.workspacesState?t.workspacesState():[];return Array.isArray(E)?E.filter(J=>Rn(J)):[]}function k(E){return m().find(J=>J.root_dir===E)||null}function R(E){return dy(k(E),b.get(E))}function j(){for(let E of m()){let J=b.get(E.root_dir);J&&typeof J.revision=="number"&&typeof E.revision=="number"&&E.revision>=J.revision&&b.delete(E.root_dir)}}async function H(E,J,Ae){let _e=t.transport,ke=R(J);if(!(!_e||!Rn(ke))){try{let me=await _e(E,{...Ae,root_dir:J,expected_revision:ke.revision});if(Rn(me?.queue)&&b.set(J,me.queue),me&&me.conflict){let De=Rn(me.queue)&&typeof me.queue.revision=="number"?me.queue.revision:R(J)?.revision;me=await _e(E,{...Ae,root_dir:J,expected_revision:De}),Rn(me?.queue)&&b.set(J,me.queue)}}catch(me){n(`\uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${me instanceof Error?me.message:String(me)}`)}P()}}function oe(E){u!==E&&(u=E,t.onFocusChange?.(u),P())}function X(E){oe(u===E?null:E)}function q(E){if(d===E){I();return}O(),d=E;let J=k(E);i.textContent=`${J?.name||E} \uC2E4\uD589 \uC124\uC815 \xB7 Worker \uD0ED \u2699 \uC2E4\uD589 \uD0ED\uACFC \uAC19\uC740 \uC800\uC7A5\uC18C`,o.hidden=!1,f=Mi(a,{root_dir:E,queue:()=>R(E),transport:t.transport,implPresetStore:t.implPresetStore,notify:n,onQueueAdopt:Ae=>{b.set(E,Ae),P()}}),f.load(),P()}function O(){f?.destroy(),f=null}function I(E){O(),d=null,o.hidden=!0,i.textContent="",E!==!0&&P()}let F=()=>I();l.addEventListener("click",F);function B(E){E.key==="Escape"&&u!==null&&oe(null)}document.addEventListener("keydown",B);function ae(E,J){let Ae=Math.max(J,E,1);return c`<span
      class="mon2-deck__rail"
      role="img"
      aria-label=${`\uC2AC\uB86F ${J}\uAC1C \uC911 ${E}\uAC1C \uC2E4\uD589 \uC911`}
    >
      ${Array.from({length:Ae},(_e,ke)=>ke<E?c`<i class="mon2-deck__slot is-run"></i>`:c`<i class="mon2-deck__slot"></i>`)}
    </span>`}function N(E){let J=E.auto_advance===!0,Ae=E.auto_merge===!0;return c`<button
        type="button"
        class=${`mon2-deck__op mon2-deck__auto${J?" is-on":""}`}
        data-act="auto"
        aria-pressed=${J?"true":"false"}
        aria-label=${`${E.name} \uC790\uB3D9\uD654`}
        title=${J?"\uC790\uB3D9\uD654 \uCF1C\uC9D0 \u2014 \uC2AC\uB86F\uC774 \uBE44\uBA74 \uB2E4\uC74C \uD589\uC774 \uCD9C\uBC1C\uD569\uB2C8\uB2E4":"\uC790\uB3D9\uD654 \uAEBC\uC9D0 \u2014 \uB2E4\uC74C \uD589\uC740 \uC218\uB3D9\uC73C\uB85C\uB9CC \uCD9C\uBC1C\uD569\uB2C8\uB2E4"}
      >
        ${J?yp():bp()}
      </button>
      <button
        type="button"
        class=${`mon2-deck__op mon2-deck__merge${Ae?" is-on":""}`}
        data-act="merge"
        aria-pressed=${Ae?"true":"false"}
        aria-label=${`${E.name} \uC790\uB3D9 \uBA38\uC9C0`}
        title=${Ae?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0"}
      >
        ${vp()}
      </button>
      <button
        type="button"
        class=${`mon2-deck__op mon2-deck__gear${d===E.root_dir?" is-on":""}`}
        data-act="gear"
        aria-expanded=${d===E.root_dir?"true":"false"}
        aria-label=${`${E.name} \uC2E4\uD589 \uC124\uC815`}
        title="이 레포의 실행 설정"
      >
        ${wp()}
      </button>`}function W(E){let J=py(E);return J?c`<div class="mon2-deck__chips">
      ${J.orchestration?c`<span class="mon2-deck__chip" title=${J.orchestration.title}
            >오케 ${J.orchestration.text}</span
          >`:""}
      ${J.worker?c`<span class="mon2-deck__chip" title=${J.worker.title}
            >워커 ${J.worker.text}</span
          >`:""}
    </div>`:""}function Z(E){let J=[];for(let[Ae,_e]of[["queue","\uB300\uAE30"],["pr_wait","PR"],["session_active","\uC138\uC158"]]){let ke=hl(E,Ae);ke>0&&J.push(`${_e} ${ke}`)}return J.join(" \xB7 ")}function ee(E){let J=hl(E,"running"),Ae=typeof E.slots=="number"?E.slots:1;return c`<div
      class=${`mon2-deck__tile${u===E.root_dir?" is-focus":""}`}
      role="button"
      tabindex="0"
      data-root-dir=${E.root_dir}
      aria-pressed=${u===E.root_dir?"true":"false"}
      title="클릭하면 이 레포만 선명하게 봅니다 (Esc로 해제)"
    >
      <div class="mon2-deck__tile-hd">
        <span class="mon2-deck__name" title=${E.root_dir}>${E.name}</span>
        <span
          class="mon2-deck__load"
          title=${`\uC2AC\uB86F ${Ae}\uAC1C \uC911 ${J}\uAC1C \uC2E4\uD589 \uC911`}
        >
          <span class="mon2-deck__load-n">${J}/${Ae}</span>
          ${ae(J,Ae)}
        </span>
        <button
          type="button"
          class="mon2-deck__worker"
          data-act="worker"
          aria-label=${`${E.name} Worker \uD0ED\uC73C\uB85C \uC774\uB3D9`}
          title="이 레포의 Worker 탭으로 이동"
        >
          ↗
        </button>
      </div>
      <div class="mon2-deck__tile-ft">
        <div class="mon2-deck__ops">${N(E)}</div>
        <span class="mon2-deck__counts">${Z(E)}</span>
        ${W(E)}
      </div>
    </div>`}function Se(E){let J=t.doneItems?t.doneItems():[],Ae=t.rangeLabel?t.rangeLabel():"",_e=$p(Array.isArray(J)?J:[]),ke=me=>E.reduce((De,ot)=>De+hl(ot,me),0);return c`<div class="mon2-deck__bar">
      <span
        class="mon2-deck__total-counts"
        title=${`visible \uB808\uD3EC ${E.length}\uACF3\uC758 \uD569\uACC4\uC785\uB2C8\uB2E4 \u2014 \uC2E4\uD589\xB7\uB300\uAE30\xB7PR\uC740 \uC9C0\uAE08, \uC644\uB8CC\uB294 ${Ae}`}
        >실행 ${ke("running")} · 대기 ${ke("queue")} · PR
        ${ke("pr_wait")}${ke("session_active")>0?` \xB7 \uC138\uC158 ${ke("session_active")}`:""}
        · ${Ae} 완료
        ${Array.isArray(J)?J.length:0}</span
      >
      ${_e===null?"":c`<span class="mon2-deck__total-tokens">
            ${typeof _e=="string"?c`<span
                  class="mon2-deck__tok"
                  title=${kp(Ae)}
                  >${_e}</span
                >`:_e.map(me=>c`<span
                      class="mon2-deck__tok"
                      data-provider=${me.provider}
                      title=${me.tooltip}
                      >${me.label}</span
                    >`)}
          </span>`}
    </div>`}function ge(){let E=m();return E.length===0?"":c`${Se(E)}
      <div class="mon2-deck__strip">
        ${E.map(J=>ee(J))}
      </div>`}function ue(){u!==null&&!k(u)&&(u=null,t.onFocusChange?.(null))}function P(){j(),ue(),d!==null&&!k(d)&&I(!0),st(ge(),r),f?.render()}function we(E){let J=E.target;if(!J||typeof J.closest!="function")return;let Ae=J.closest("[data-root-dir]");if(!Ae)return;let _e=Ae.getAttribute("data-root-dir")||"",ke=J.closest("[data-act]")?.getAttribute("data-act");if(ke==="worker"){t.gotoWorkerTab?.(_e);return}if(ke==="auto"){H("worker-automation-toggle",_e,{on:R(_e)?.auto_advance!==!0});return}if(ke==="merge"){H("worker-merge-auto-toggle",_e,{on:R(_e)?.auto_merge!==!0});return}if(ke==="gear"){q(_e);return}X(_e)}function xe(E){if(E.key!=="Enter"&&E.key!==" ")return;let J=E.target;if(!J||typeof J.closest!="function")return;let Ae=J.closest('[data-root-dir][role="button"]');!Ae||Ae!==J||(E.preventDefault(),X(Ae.getAttribute("data-root-dir")||""))}return r.addEventListener("click",we),r.addEventListener("keydown",xe),{render:P,focusRoot:()=>u,panelRoot:()=>d,destroy(){document.removeEventListener("keydown",B),r.removeEventListener("click",we),r.removeEventListener("keydown",xe),l.removeEventListener("click",F),O(),st(c``,r),e.replaceChildren()}}}var fy=1e4,Tp="bdui.monitor.done-range",Cp="bdui.monitor.running_sort",Rp="bdui.monitor.candidate_sort",Op="beads-ui.monitor.candidate-filter",Lp="beads-ui.monitor.sections";function _y(){try{let e=window.localStorage.getItem(Op);if(!e)return{...to};let t=JSON.parse(e);return!t||typeof t!="object"?{...to}:{show_blocked:typeof t.show_blocked=="boolean"?t.show_blocked:to.show_blocked,spec:Oa.some(n=>n.value===t.spec)?t.spec:"all"}}catch{return{...to}}}function Ap(e){try{window.localStorage.setItem(Op,JSON.stringify({show_blocked:e.show_blocked,spec:e.spec}))}catch{}}function my(){try{let e=window.localStorage.getItem(Rp);return Io.some(t=>t.value===e)?e:"repo_spec"}catch{return"repo_spec"}}function gy(e){try{window.localStorage.setItem(Rp,e)}catch{}}function hy(){try{let e=window.localStorage.getItem(Lp);if(!e)return{};let t=JSON.parse(e);return t&&typeof t=="object"?t:{}}catch{return{}}}function by(e){try{window.localStorage.setItem(Lp,JSON.stringify(e))}catch{}}function yy(){try{let e=window.localStorage.getItem(Tp);return e===null?"today":Ln(e)}catch{return"today"}}function vy(e){try{window.localStorage.setItem(Tp,e)}catch{}}function wy(){try{return window.localStorage.getItem(Cp)==="repo"?"repo":"started"}catch{return"started"}}function ky(e){try{window.localStorage.setItem(Cp,e)}catch{}}var Ip="tab:monitor:pipeline",$y=1e3,Sp=[{lane:"runnable",pane:"candidate",title:"\uD6C4\uBCF4",empty:"\uC2E4\uD589 \uC790\uACA9\uC744 \uAC16\uCD98 \uC774\uC288 \uC5C6\uC74C"},{lane:"queue",pane:"queue",title:"\uB300\uAE30",empty:"\uD45C\uC2DC\uD560 \uB808\uD3EC \uC5C6\uC74C"},{lane:"running",pane:"running",title:"\uC2E4\uD589 \uC911",empty:"\uC2E4\uD589 \uC911 \uC5C6\uC74C"},{lane:"pr_wait",pane:"pr_wait",title:"PR \uB300\uAE30",empty:"PR \uC5C6\uC74C"},{lane:"done",pane:"done",title:"\uC644\uB8CC",empty:"\uC644\uB8CC \uAE30\uB85D \uC5C6\uC74C"}],xy=["queue","runnable","done"],Ep="\u2460\u2461\u2462\u2463\u2464\u2465\u2466\u2467\u2468\u2469\u246A\u246B\u246C\u246D\u246E\u246F\u2470\u2471\u2472\u2473";function Ay(e){return e>=1&&e<=Ep.length?Ep[e-1]:`(${e})`}function Mp(e,t){let n=Ct("views:monitor"),r=t.gotoIssue,o=t.pipelineStore,s=t.transport,i=t.getWorkspacePath,l=t.openDoc,a=t.switchWorkspace,u=t.router,d=t.now||(()=>Date.now()),f=t.confirm||(y=>typeof globalThis.confirm!="function"||globalThis.confirm(y)),b=yy(),m=wy(),k=_y(),R=my(),j=hy(),H=Ti("beads-ui.monitor.lane-collapsed"),oe=!1,X=null,q=null,O=null,I=null,F=Gr(()=>Oe()),B=null,ae=null,N=null,W=null;function Z(y){return W===null&&(W=M()),Uu(y,W)}function ee(y,p){Se(),!(p<=0)&&(ae={lane_id:y,corrected:p},N=setTimeout(()=>{N=null,ae=null,Oe()},fy))}function Se(){N!==null&&(clearTimeout(N),N=null),ae=null}function ge(){let y=Lr.find(p=>p.value===b);return y?y.label:""}let ue=document.createElement("div");ue.className="mon",e.appendChild(ue);let P=document.createElement("div");P.className="worker-drawer-overlay",P.hidden=!0;let we=document.createElement("div");we.className="worker-drawer-overlay__backdrop";let xe=document.createElement("div");xe.className="worker-drawer-host mon2-drawer",P.append(we,xe),e.appendChild(P);let E=ar(null,null),J=new Map,Ae=new Map,_e=null,ke=null,me=null,De=so(xe,{transport:s,sessionLogStore:t.sessionLogStore,onClose:()=>{q=null,P.hidden=!0,Oe()}}),ot=Ri({transport:s,console_el:ue,getLanes:()=>E,getWorkspaces:()=>o&&o.get?o.get():null,getCrossLanes:St,reproject:y=>({lanes:tt(y),raw_lanes:y}),onCorrection:ee,showToast:be,requestRender:()=>Oe(),adoptQueue:(y,p)=>{Ae.set(y,p)},onDragBegin:()=>{O=null},candidate_drop:!0}),{applyDrop:Ye,dropModel:M,runPlanned:se,sendQueueCas:le}=ot;async function pe(y,p,_,S,Y=!0){if(!s||!_)return null;let V=await s(y,{...p,root_dir:_,expected_revision:S});if(V&&V.conflict&&Y){V.queue&&Ae.set(_,V.queue);let ie=V.queue&&typeof V.queue.revision=="number"?V.queue.revision:S;V=await s(y,{...p,root_dir:_,expected_revision:ie})}return V&&V.queue&&_&&Ae.set(_,V.queue),V}function he(y,p){let _=Ae.get(y),S=o&&o.get?o.get():null,Y=(Array.isArray(S)?S:[]).find(ie=>ie?.root_dir===y);return(_||Y)?.merge_queue?.find(ie=>ie.bead_id===p)?.continuation_action}async function ce(y,p,_,S){let Y=await pe(y,p,_,S),V=Ae.get(_)?.revision??Y?.queue?.revision??S;return zn(Y,(ie,$e)=>pe(y,{...p,continuation:ie,decision_token:$e},_,V,!1),{refresh:ie=>pe(y,p,_,ie?.queue?.revision??Ae.get(_)?.revision??V,!1)})}async function Fe(y,p,_,S){let Y=await zn({continuation_mismatch:S},(ie,$e)=>pe("worker-merge-queue-add",{bead_id:p,continuation:ie,decision_token:$e},y,_,!1)),V=Y?.queue?.merge_queue?.find(ie=>ie.bead_id===p)?.continuation_action;Y?.applied!==!0&&V?.continuation===null&&V.mismatch&&await Fe(y,p,Y.queue.revision,V.mismatch)}async function Ge(y,p,_){let S=await pe("worker-discard",y,p,_);if(S&&S.discarded===!0){be(Ws(S),"success",5e3);return}if(S&&S.reason){be(`\uD3D0\uAE30 \uC2E4\uD328: ${S.reason}`,"error");return}if(S&&S.accepted&&S.pending==="merged_revert"){be("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success");return}if(S&&S.accepted){be(`\uD3D0\uAE30 \uC9C4\uD589: ${S.phase||"\uBC31\uC5C5 \uC911"}`,"success");return}S&&!S.conflict&&be("\uD3D0\uAE30 \uAC70\uBD80: unknown","error")}async function Ze(y,p,_){return!s||!_?null:await s(y,{...p,root_dir:_})}async function Pe(){let y=new Map;for(let p of E.pr_wait)y.has(p.root_dir)||y.set(p.root_dir,p.expected_revision);for(let[p,_]of y)await pe("worker-merge-queue-add-all",{},p,_)}function Q(y){let p=j[y];return!!(p&&p.runnable===!0)}function U(y){let p={...j[y]||{}};p.runnable=!p.runnable,j={...j,[y]:p},by(j),Oe()}function Ne(y){H.toggle(y),Oe()}function ut(y){H.toggleArea(y),Oe()}function et(y){let p=y.dependency_chips||null,_=y.overlap_chips||[],S=y.scope_state==="missing",Y=y.armed_lane_chip;return!p&&_.length===0&&!S&&!Y?null:{...p||{},..._.length>0?{overlaps:_}:{},...S?{scope_missing:!0}:{},...Y?{armed_lane:Y}:{}}}function v(y){return Xs(y,p=>F.isOpen({bead_id:y.id,chip_key:p}))}function z(y){let p=et(y),_=v(y);return p||_?{...y,...p?{dependency_chips:p}:{},..._?{chip_popover:_}:{}}:y}function Ee(y){let p=Q(y.root_dir);return c`<header class="mon2-sec__hd">
      <button
        type="button"
        class="mon2-sec__toggle"
        data-root-dir=${y.root_dir}
        data-section="runnable"
        aria-expanded=${p?"false":"true"}
        aria-label=${`${y.name} \uC139\uC158 ${p?"\uD3BC\uCE58\uAE30":"\uC811\uAE30"}`}
      >
        ${p?"\u25B8":"\u25BE"}
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
    </header>`}function Ce(y,p){return c`<div
      class="mon2-item"
      data-bead-id=${y.id}
      data-drag-kind="candidate"
      data-root-dir=${y.root_dir}
    >
      ${p}
    </div>`}function je(y){if(O!==y.id)return null;let p=E.queue_groups.find(V=>V.root_dir===y.root_dir),_=y.place_lanes||[],S=E.cross_lanes_revision!==null,Y=[{id:"parallel",label:"\uBCD1\uB82C",count:y.place_index??0}];for(let V of E.chain_lanes)Y.push({id:`lane:${V.lane_id}`,label:`\uC5F0\uACB0 ${V.number} (${V.draft?"draft":"\uD655\uC815"}) \uB05D\uC5D0`,count:V.rows.length,group:"\uC5F0\uACB0 \uB808\uC778",disabled:!S});Y.push({id:"new-lane",label:"+ \uC0C8 \uC5F0\uACB0 \uB808\uC778",group:"\uC5F0\uACB0 \uB808\uC778",disabled:!S,title:S?"\uC774 \uC774\uC288\uB9CC \uB4E0 draft \uB808\uC778\uC744 \uB9CC\uB4ED\uB2C8\uB2E4":"\uC5F0\uACB0 \uB808\uC778 \uC800\uC7A5\uC18C\uB97C \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"});for(let V of _)Y.push({id:`serial:${V.id}`,label:`\uC9C1\uB82C ${Number(V.id.slice(1))}`,count:V.length,group:`${p?p.name:""} \uC9C1\uB82C`});return{bead_id:y.id,lanes:Y}}function Ve(y){return Ce(y,c`${Aa(z(y),je(y),{exec_chips_mode:"pinned_only",onOpenDoc:l?(p,_)=>l(_,y.root_dir):void 0})}`)}function pt(){return E.runnable_flat?c`<div class="mon2-flat" data-drop="candidate">
        ${E.runnable.map(y=>Ve(y))}
      </div>`:c`${E.runnable_sections.map(y=>{let p=Q(y.root_dir);return c`<section
        class="mon2-sec${p?" is-collapsed":""}"
        data-root-dir=${y.root_dir}
        data-section="runnable"
      >
        ${Ee({root_dir:y.root_dir,name:y.name,count:y.items.length})}
        ${p?"":c`<div
              class="mon2-sec__body"
              data-lane="candidate"
              data-drop="candidate"
            >
              ${y.items.map(_=>Ve(_))}
            </div>`}
      </section>`})}`}function kt(y,p=!1){return c`<span class="worker-mini__rowops">
      ${p?c`<button
              type="button"
              class="worker-mini__rowops-up"
              data-bead-id=${y.id}
              title="같은 레포 안에서 한 칸 위로"
              aria-label="한 칸 위로"
            >
              ↑
            </button>
            <button
              type="button"
              class="worker-mini__rowops-down"
              data-bead-id=${y.id}
              title="같은 레포 안에서 한 칸 아래로"
              aria-label="한 칸 아래로"
            >
              ↓
            </button>
            <button
              type="button"
              class="worker-mini__rowops-remove"
              data-bead-id=${y.id}
              title="대기에서 빼기"
              aria-label="대기에서 빼기"
            >
              ✕
            </button>`:""}
    </span>`}function Lt(y,p){return c`<div
      class="mon2-item"
      data-bead-id=${y.id}
      data-drag-kind="parallel"
      data-root-dir=${y.root_dir}
      data-row-index=${p}
      data-queue-index=${String(y.queue_index??0)}
    >
      ${An(z(y),{actions:kt(y,!0)})}
    </div>`}function $t(y,p,_,S){return c`<div
      class="mon2-crow${p.fixed?" mon2-crow--fixed":""}"
      draggable=${p.draggable?"true":"false"}
      data-bead-id=${p.id}
      data-drag-kind="chain"
      data-root-dir=${p.root_dir}
      data-lane-id=${y.lane_id}
      data-row-index=${_}
      data-queue-index=${typeof p.queue_index=="number"?String(p.queue_index):""}
    >
      <span class="mon2-crow__seq" aria-hidden="true"
        >${Ay(p.seq)}</span
      >
      ${p.workspace_name?c`<span class="worker-mini__repo" title=${p.root_dir}
            >${p.workspace_name}</span
          >`:""}
      <span class="worker-mini__id" title="클릭하면 ID 복사">${p.id}</span>
      <span class="mon2-crow__title">${p.title}</span>
      ${p.mismatch?c`<span
            class="mon2-crow__mismatch"
            title="레인 순서가 주장하는 선행이 bd 의존에 없습니다 — 재적용으로 복구합니다"
            >⚠ 의존 없음</span
          >`:""}
      ${S.includes(p.id)?c`<span
            class="mon2-crow__mismatch"
            title="이미 실행된 뒤 의존이 바뀌었습니다 — 이 행은 움직일 수 없어 교정하지 않습니다"
            >⚠ 의존 순서와 다름</span
          >`:""}
      <span class="mon2-crow__where" title=${p.location_title}
        >${p.location_label}</span
      >
      <button
        type="button"
        class="mon2-crow__detach"
        data-bead-id=${p.id}
        title="연결에서 빼고 앞뒤를 이어 붙입니다"
        aria-label="연결에서 빼기"
      >
        ✕
      </button>
    </div>`}function _t(y){let p=E.cross_lanes_revision!==null,_=Z(y.lane_id),S=_?.held===!0,Y=_?.cycle===!0,V=_?_.mismatched:[],ie=ae&&ae.lane_id===y.lane_id?ae.corrected:0;return c`<div class="mon2-clane" data-lane-id=${y.lane_id}>
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
        ${Y?c`<span
              class="mon2-clane__cycle"
              title="멤버들의 blocks 의존이 순환합니다 — 어느 순서도 의존을 만족시키지 못합니다"
              >⛔ 의존 사이클 — 자동 교정 불가</span
            >`:""}
        ${S?c`<span
              class="mon2-clane__hold"
              title="멤버 한 명의 의존 자료가 이 스냅샷에 아직 없습니다 — 다음 스냅샷이 채우면 교정합니다"
              >${ii}</span
            >`:""}
        ${y.draft?c`<button
              type="button"
              class="mon2-clane__confirm"
              data-lane-id=${y.lane_id}
              ?disabled=${!p||!y.can_confirm||S}
              title=${S?ii:y.can_confirm?"\uC778\uC811 \uC758\uC874\uC744 \uAC78\uACE0 \uBBF8\uC801\uC7AC \uBA64\uBC84\uB97C \uAC01\uC790 \uB808\uD3EC \uBCD1\uB82C \uD050 \uB05D\uC5D0 \uC62C\uB9BD\uB2C8\uB2E4":"\uBA64\uBC84\uAC00 2\uAC1C \uC774\uC0C1\uC774\uC5B4\uC57C \uD655\uC815\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4"}
            >
              확정
            </button>`:""}
        ${y.run_label!==null?c`<button
              type="button"
              class="mon2-clane__run"
              data-lane-id=${y.lane_id}
              ?disabled=${!p}
              title="이 레인 멤버만 발차합니다 — 레포 자동 진행은 켜지 않습니다"
            >
              ${y.run_label}
            </button>`:""}
        ${y.state==="confirmed"&&y.has_mismatch?c`<button
              type="button"
              class="mon2-clane__reapply"
              data-lane-id=${y.lane_id}
              ?disabled=${!p}
              title="빠진 인접 의존을 다시 걸고 미적재 멤버를 다시 올립니다"
            >
              재적용
            </button>`:""}
        ${y.can_stop?c`<button
              type="button"
              class="mon2-clane__stop"
              data-lane-id=${y.lane_id}
              ?disabled=${!p}
              title="남은 멤버의 발차만 멈춥니다 — 도는 세션과 머지 큐 항목은 끝까지 갑니다"
            >
              ⏸ 정지
            </button>`:""}
        <button
          type="button"
          class="mon2-clane__remove"
          data-lane-id=${y.lane_id}
          ?disabled=${!p}
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
            </div>`:y.rows.map(($e,Xe)=>$t(y,$e,Xe,V))}
      </div>
    </div>`}function Be(y,p,_){return c`<div
      class="mon2-item"
      data-bead-id=${p.id}
      data-drag-kind="repo-serial"
      data-root-dir=${p.root_dir}
      data-lane-id=${y.id}
      data-row-index=${_}
      data-queue-index=${String(p.queue_index??0)}
    >
      ${An(z(p),{actions:kt(p)})}
    </div>`}function L(y){if(y.length===0)return"";let p=y.length-1;return`${y[0].id} \uC810\uC720${p>0?` +${p}`:""}`}function te(y){return c`<div
      class="mon2-item mon2-item--ghost"
      data-bead-id=${y.id}
    >
      ${An({id:y.id,title:y.title,lane:"running",draggable:!1,ghost:!0,badges:[y.badge]})}
    </div>`}function ye(y,p){let _=p.occupants,S=p.cross_wait_peers||[];return{id:p.id,pane_id:"",title:`${y.name} \xB7 \uC9C1\uB82C ${p.index+1}`,rows:[..._.map(Y=>te(Y)),...p.items.map((Y,V)=>Be(p,Y,V))],count:p.items.length,empty:p.empty===!0,..._.length>0?{badge:c`<span
              class="mon2-lane__occupant"
              title=${_.map(Y=>`${Y.id} \u2014 ${Y.badge}`).join(`
`)}
              >${L(_)}</span
            >`,held:!0}:{},cycle:p.cycle,header_control:c`<button
        type="button"
        class="mon2-sec__worker"
        data-root-dir=${y.root_dir}
        title="이 레포의 Worker 탭으로 이동"
      >
        Worker ↗
      </button>`,...S.length>0?{after:c`${S.map(Y=>c`<div class="mon2-lane__cross-wait">
                  ⚠ 상호 정지 — ${Y.workspace_name}·${Y.lane}과 교차 대기
                </div>`)}`}:{}}}function T(){let y=E.cross_lanes_revision!==null,p=E.chain_lanes.some(_=>_.draft&&_.rows.length===0);return Zs({parallel:{rows:E.parallel_rows.map((_,S)=>Lt(_,S)),count:E.parallel_rows.length,collapsed:H.isAreaCollapsed("parallel"),drop:{drop:"parallel"}},serial:{lanes:E.queue_groups.flatMap(_=>_.sublanes.serial.map(S=>({...ye(_,S),drop:{drop:"repo-serial",root_dir:_.root_dir,lane_id:S.id,lane_length:String(S.raw_length)}}))),collapsed:H.isAreaCollapsed("serial"),extra_panes:E.chain_lanes.map(_=>_t(_)),header_control:c`<button
          type="button"
          class="mon2-newlane"
          ?disabled=${p||!y}
          title=${y?p?"\uBE48 \uC5F0\uACB0 \uB808\uC778\uC774 \uC774\uBBF8 \uC788\uC2B5\uB2C8\uB2E4":"\uBE48 \uC5F0\uACB0 \uB808\uC778\uC744 \uD558\uB098 \uB9CC\uB4ED\uB2C8\uB2E4":"\uC5F0\uACB0 \uB808\uC778 \uC800\uC7A5\uC18C\uB97C \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"}
        >
          + 연결 레인
        </button>`,...E.cross_lanes_unreadable?{notice:c`<div class="mon2-clane__unreadable">
                연결 레인 저장소를 읽을 수 없음
              </div>`}:{}}})}function K(y){return c`<div class="worker-rungrid">
      ${E.running.length===0?c`<div class="worker-rungrid__empty">실행 세션 없음</div>`:E.running.map(p=>gl({bead_id:p.id,attempt_id:p.attempt_id||"",title:p.title,runner:p.runner??null,model:p.model??null,effort:p.effort??null,speed:p.speed??null,started_at:p.started_at??null,kind:p.kind,...p.kind==="session"?{updated_at:p.updated_at,session_refs:p.session_refs||[]}:{},workflow:p.workflow||null,resumed_from:p.resumed_from??null,continuation_mode:p.continuation_mode??null,paused:p.run_state==="paused",failed:p.run_state==="failed",parked:p.run_state==="parked",retry_wait:p.run_state==="retry_wait",waiting:p.run_state==="waiting",wait:p.wait||null,retry:p.retry||null,status:p.status,status_label:p.run_state==="failed"?"\uC2E4\uD328":p.run_state==="parked"?"\uC138\uC158 \uB300\uAE30":p.run_state==="retry_wait"?"\uC7AC\uC2DC\uB3C4 \uB300\uAE30":p.run_state==="waiting"?"\uC120\uD589 \uB300\uAE30":void 0,can_pause:p.can_pause!==!1,exec_chips:p.exec_chips||null,usage:p.usage||null,chip_popover:v(p),discard:p.discard,failure:p.failure?{...p.failure,open:I===p.attempt_id}:null},y,q,{monitor:{repo:p.workspace_name,root_dir:p.root_dir,serial_lane_id:p.serial_lane_id,cross_lane_chip:p.cross_lane_chip||null,last_activity:p.last_activity||null,legs:p.legs||[],dependency_chips:et(p)}}))}
    </div>`}function Ie(y){let p={runnable:E.runnable,queue:E.queue,running:E.running,pr_wait:E.pr_wait,done:E.done},_=S=>{let Y=p[S.lane],V=S.lane==="runnable"?E.runnable_flat?Y.length>0?pt():void 0:E.runnable_sections.length>0?pt():void 0:S.lane==="queue"?E.queue_groups.length>0||E.chain_lanes.length>0||E.parallel_rows.length>0||E.cross_lanes_unreadable?T():void 0:S.lane==="running"?K(y):Y.length>0?c`${Y.map(ie=>An(z(ie)))}`:void 0;return Dn({id:`monitor-${S.lane}`,lane:S.pane,title:S.title,items:Y,count:Y.length,src:S.lane==="runnable",empty:S.empty,body:V,live:S.lane==="running"&&Y.length>0,collapsible:!0,collapsed:H.isCollapsed(S.pane),controls:S.lane==="runnable"?Ue():void 0,header_control:qe(S.lane,Y.length)})};if(oe){let S=xy.map(Y=>Sp.find(V=>V.lane===Y)).filter(Y=>Y!==void 0);return c`<div class="mon2-deck"></div>
        <div class="worker-lanes-host">
          <div class="worker-lanes worker-lanes--mobile mon2-lanes">
            ${Js({live:E.running.length>0,running_body:E.running.length>0?K(y):"",pr_wait_rows:E.pr_wait.map(Y=>An(z(Y))),count:E.running.length+E.pr_wait.length})}
            ${S.map(Y=>_(Y))}
          </div>
        </div>`}return c`<div class="mon2-deck"></div>
      <div class="worker-lanes-host">
        <div class="worker-lanes mon2-lanes">
          ${Sp.map(S=>_(S))}
        </div>
      </div>`}function Ue(){return c`<div class="worker-filter">
      <label class="worker-filter__tgl" title="blocked 이슈 표시">
        <input
          type="checkbox"
          class="mon-filter__blocked"
          .checked=${k.show_blocked}
        />
        🔒
        blocked${E.runnable_hidden.blocked>0?` ${E.runnable_hidden.blocked}`:""}
      </label>
      <div class="worker-filter__spec" role="group" aria-label="spec 필터">
        ${Oa.map(y=>c`<button
              type="button"
              class="mon-filter__spec worker-filter__chip${k.spec===y.value?" is-active":""}"
              data-spec=${y.value}
              aria-pressed=${k.spec===y.value?"true":"false"}
            >
              ${y.label}
            </button>`)}
        ${E.runnable_hidden.spec>0?c`<span class="worker-filter__hidden"
              >숨김 ${E.runnable_hidden.spec}</span
            >`:""}
      </div>
    </div>`}function qe(y,p){return y==="runnable"?c`<select
        class="mon-candidate-sort worker-sort"
        aria-label="후보 정렬"
        title="후보 정렬"
        .value=${R}
      >
        ${Io.map(_=>c`<option
              value=${_.value}
              ?selected=${R===_.value}
            >
              ${_.label}
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
      </select>`:y==="pr_wait"&&p>0?c`<button
        type="button"
        class="mon-lane-op mon-merge-all"
        title="자격이 생기는 PR을 각 레포의 머지 큐에 한 번에 넣습니다"
      >
        일괄 머지
      </button>`:y==="done"?c`<select
        class="mon-done-range worker-sort"
        aria-label="완료 기간"
        title="완료 기간"
        .value=${b}
      >
        ${Lr.map(_=>c`<option value=${_.value} ?selected=${b===_.value}>
              ${_.label}
            </option>`)}
      </select>`:""}function tt(y){let p=o&&o.get?o.get():null,_=o&&o.getWorkspacesState?o.getWorkspacesState():[],S=y===void 0?o&&o.crossLanes?o.crossLanes():void 0:y,Y={done_since:br(b,d()),running_sort:m,candidate_filter:k,candidate_sort:R};return S!==void 0&&(Y.cross_lanes=S),ar(p,_,Y)}function Oe(){let y=d();E=tt(),W=null,J=new Map;for(let p of[...E.runnable,...E.queue,...E.running,...E.pr_wait,...E.done])!p.non_occupying&&!J.has(p.id)&&J.set(p.id,p);st(Ie(y),ue),Je()?.render(),He(),bt()}function He(){let y=new Map;for(let p of E.queue_groups)y.set(p.root_dir,p.auto_advance);for(let p of Array.from(ue.querySelectorAll(".worker-wait__area--parallel .worker-mini__repo"))){let _=p.closest(".mon2-item")?.getAttribute("data-root-dir")||"",S=y.get(_);typeof S=="boolean"&&p.setAttribute("title",`${p.textContent||""} \xB7 ${S?"\uC790\uB3D9\uD654 \uCF1C\uC9D0":"\uC790\uB3D9\uD654 \uAEBC\uC9D0"}`)}}function Je(){if(me)return me;let y=ue.querySelector(".mon2-deck");return y?(me=xp(y,{workspacesState:()=>o&&o.getWorkspacesState?o.getWorkspacesState():[],doneItems:()=>E.done,rangeLabel:ge,transport:s,implPresetStore:t.execPresetStore,gotoWorkerTab:xt,onFocusChange:p=>{B=p,bt()}}),me):null}function bt(){ue.classList.toggle("has-focus",B!==null);for(let y of Array.from(ue.querySelectorAll(".mon2-sec[data-root-dir]")))y.classList.toggle("is-focus",B!==null&&y.getAttribute("data-root-dir")===B);for(let y of Array.from(ue.querySelectorAll(".mon2-item[data-bead-id], .rtile[data-bead-id], .worker-mini[data-bead-id], .worker-card[data-bead-id]"))){let p=J.get(y.getAttribute("data-bead-id")||"");y.classList.toggle("is-focus",B!==null&&!!p&&p.root_dir===B)}for(let y of Array.from(ue.querySelectorAll(".mon2-crow[data-root-dir]")))y.classList.toggle("is-focus",B!==null&&y.getAttribute("data-root-dir")===B)}function ze(y,p){let _=i?i():void 0;if(!p||!_||p===_||!a){r(y);return}a(p).then(()=>{r(y)}).catch(S=>{n("workspace switch for %s failed: %o",p,S)})}function xt(y){if(!y)return;let p=i?i():void 0,_=()=>{try{u?.gotoView("worker")}catch(S){n("gotoView(worker) failed: %o",S)}};if(!a||p&&p===y){_();return}a(y).then(_).catch(S=>{n("workspace switch for %s failed: %o",y,S),be("\uB808\uD3EC \uC804\uD658\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error")})}function qt(y){rn(y).then(p=>{be(p?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",p?"success":"error",1400)})}function lt(y){let p=J.get(y)||null;return{item:p,root_dir:p?p.root_dir:"",revision:p?p.expected_revision:0}}async function Yt(y,p,_){if(y!=="dep-add")return;let S=E.chain_lanes.find(Y=>Y.rows.some(V=>V.id===p));!S||!S.rows.some(Y=>Y.id===_)||await se(Y=>Yu(S.lane_id,Y),"",[{type:y,a:p,b:_}])}function St(){return(o&&o.crossLanes?o.crossLanes():null)??null}async function It(y,p){if(y==="run"){await Vt(p);return}if(y==="stop"){await Jt(p);return}if(y==="create"){await se(_=>Pa(null,_),"");return}if(y==="remove"){let _=Xu(p,M());if(_!==null&&!f(_))return;await se(S=>Vu(p,S),"");return}await se(_=>y==="confirm"?Gu(p,_):Ku(p,_),"")}function Ut(y){let p=new Map;for(let _ of y.rows){let S=E.owner_of[_.id]||_.root_dir;typeof S!="string"||S.length===0||p.set(S,[...p.get(S)||[],_.id])}return p}async function Vt(y){let p=E.chain_lanes.find(V=>V.lane_id===y);if(!p||E.cross_lanes_revision===null){Oe();return}Se();let _=new Map,S=new Map,Y=Ut(p);for(let V of p.rows){if(!V.unplaced)continue;let ie=E.owner_of[V.id]||V.root_dir;if(typeof ie!="string"||ie.length===0){be(`${V.id}\uC758 \uB808\uD3EC\uB97C \uC54C \uC218 \uC5C6\uC5B4 \uC801\uC7AC\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4`,"error"),Oe();return}let $e=S.get(ie)??0;if(await le("worker-queue-place",{bead_id:V.id,lane:"parallel",index:(E.parallel_raw_length[ie]??0)+$e},ie,_,{bead_id:V.id})===null){Oe();return}S.set(ie,$e+1)}for(let[V,ie]of Y)if(await le("worker-queue-arm",{bead_ids:ie,lane_id:y},V,_,{bead_id:ie[0]})===null){be("\uC77C\uBD80 \uB808\uD3EC\uC5D0\uC11C \uC9C4\uD589\uC744 \uCF1C\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 \u2014 [\u25B6 \uC774\uC5B4\uC11C \uC9C4\uD589]\uC73C\uB85C \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC138\uC694","error"),Oe();return}Oe()}async function Jt(y){let p=E.chain_lanes.find(S=>S.lane_id===y);if(!p||E.cross_lanes_revision===null){Oe();return}Se();let _=new Map;for(let[S,Y]of Ut(p))if(await le("worker-queue-disarm",{lane_id:y},S,_,{bead_id:Y[0]})===null)break;Oe()}async function Wt(y,p){let{root_dir:_,revision:S}=lt(y);if(_.length===0){Oe();return}await le("worker-queue-disarm",{bead_ids:[y],lane_id:p},_,new Map([[_,S]]),{bead_id:y}),Oe()}async function Dt(y,p){let _=J.get(y);if(!_){Oe();return}let S={kind:"candidate",bead_id:y,root_dir:_.root_dir};if(p==="new-lane"){await se(Y=>Pa({bead_id:y,root_dir:_.root_dir},Y),y);return}if(p.startsWith("lane:")){let Y=p.slice(5);if(!E.chain_lanes.find(ie=>ie.lane_id===Y)){Oe();return}await se(ie=>li(S,{kind:"chain",lane_id:Y,marker_index:(ie.cross_lanes.get(Y)?.entries??[]).length},ie),y);return}if(p.startsWith("serial:")){let Y=p.slice(7),V=(_.place_lanes||[]).find(ie=>ie.id===Y);await Ye(S,{kind:"repo-serial",root_dir:_.root_dir,lane_id:Y,index:V?V.index:0});return}await Ye(S,{kind:"parallel",marker_index:E.parallel_rows.length})}async function cn(y,p){let _=E.parallel_rows,S=_.findIndex(it=>it.id===y);if(S<0)return;let Y=_[S].root_dir,V=[];_.forEach((it,yt)=>{it.root_dir===Y&&V.push(yt)});let ie=V.indexOf(S),$e=V[ie+p];if(typeof $e!="number")return;let Xe=p===-1?$e:V[ie+2]??Math.min(_.length,$e+1);await Ye({kind:"parallel",bead_id:y,root_dir:Y,queue_index:_[S].queue_index??0},{kind:"parallel",marker_index:Xe})}async function Mt(y){for(let p of E.chain_lanes){let _=p.rows.find(S=>S.id===y);if(_){await Ye({kind:"chain",bead_id:y,root_dir:_.root_dir,lane_id:p.lane_id,...typeof _.queue_index=="number"?{queue_index:_.queue_index}:{}},{kind:"parallel",marker_index:E.parallel_rows.length});return}}}function Gt(y){return{runner:y.runner||void 0,model:y.model||void 0,effort:y.effort||void 0,status:y.run_state==="running"?"running":y.run_state,worktree:y.root_dir}}function Ft(y,p){let{item:_,root_dir:S,revision:Y}=lt(p),V=_?.attempt_id||"",ie=y.classList;if(ie.contains("worker-mini__rowops-up")||ie.contains("worker-mini__rowops-down")){cn(p,ie.contains("worker-mini__rowops-up")?-1:1);return}if(ie.contains("worker-mini__rowops-remove")){pe("worker-queue-remove",{bead_id:p},S,Y);return}if(ie.contains("mon2-crow__detach")){Mt(p);return}if(ie.contains("worker-dep__open")){ze(y.getAttribute("data-dep-id")||"",y.getAttribute("data-root-dir")||"");return}if(ie.contains("mon2-arm__release")){Wt(p,y.getAttribute("data-lane-id")||"");return}if(ie.contains("mon-lane__chip")){let $e=y.getAttribute("data-lane-id")||"";ue.querySelector(`.mon2-clane[data-lane-id="${$e}"]`)?.scrollIntoView({block:"nearest"});return}if(ie.contains("judgement-chip")){let $e=y.getAttribute("data-chip-key")||"";$e&&F.toggle({bead_id:p,chip_key:$e});return}if(ie.contains("rtile__failure-badge")){I=I===V?null:V,Oe();return}if(ie.contains("rtile__attempt-copy")){let $e=y.getAttribute("data-attempt-id")||"";$e&&rn($e).then(Xe=>{be(Xe?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",Xe?"success":"error",1400)});return}if(ie.contains("worker-card__place")){O=O===p?null:p,Oe();return}if(ie.contains("worker-card__place-cancel")){O=null,Oe();return}if(ie.contains("worker-card__place-lane")){let $e=y.getAttribute("data-lane")||"parallel";O=null,Dt(p,$e);return}if(ie.contains("rtile__session")){if(_&&_.kind==="session"){let $e=(_.session_refs||[]).find(Xe=>Xe&&Xe.current===!0);$e&&(P.hidden=!1,De.open(Wr($e,p,"in_progress",S)),Oe());return}q=V,V&&_&&(P.hidden=!1,De.open({attempt_id:V,root_dir:S,meta:Gt(_)})),Oe();return}if(ie.contains("rtile__pause")){Ze("worker-attempt-pause",{attempt_id:V},S);return}if(ie.contains("rtile__resume")){Ur().then($e=>{if($e!==null)return ce("worker-attempt-resume",{attempt_id:V,...$e!==""?{instructions:$e}:{}},S,Y)});return}if(ie.contains("rtile__parked-retry")){Ze("worker-parked-retry",{bead_id:p,attempt_id:V},S).then($e=>{$e&&$e.ok===!1&&be(`\uC7AC\uC2DC\uB3C4 \uAC70\uBD80: ${$e.reason==="not_latest"?"\uC774 bead\uC5D0 \uB354 \uC0C8\uB85C\uC6B4 \uC2DC\uB3C4\uAC00 \uC788\uC2B5\uB2C8\uB2E4":$e.reason||""}`,"error")});return}if(ie.contains("rtile__discard")){let $e=y.dataset.confirmation==="merged"?"merged":"unmerged";if(!f(Co(p,$e)))return;Ge({bead_id:p,...V?{attempt_id:V}:{},...y.dataset.operationId?{operation_id:y.dataset.operationId}:{}},S,Y);return}if(ie.contains("worker-mini__merge")){let $e=he(S,p);$e?.mismatch&&$e.continuation===null?Fe(S,p,Y,$e.mismatch):pe("worker-merge-queue-add",{bead_id:p},S,Y);return}if(ie.contains("worker-mini__merge-cancel")){pe("worker-merge-queue-remove",{bead_id:p},S,Y);return}if(ie.contains("worker-mini__discard")){let $e=y.dataset.discardMode==="merged"?"merged":"unmerged";if(!f(Co(p,$e)))return;Ge({bead_id:p,...y.dataset.attemptId?{attempt_id:y.dataset.attemptId}:{},...y.dataset.operationId?{operation_id:y.dataset.operationId}:{}},S,Y);return}if(ie.contains("worker-mini__revise-fix")){ce("worker-revise-fix",{bead_id:p},S,Y);return}ie.contains("worker-mini__revise-approve")&&pe("worker-revise-approve",{bead_id:p},S,Y)}function en(y){let p=ot.consumeClickSuppression(),_=y.target;if(!_||typeof _.closest!="function"||_.closest("dialog")||_.closest(".worker-drawer-overlay")||_.closest("a"))return;let S=_.closest(".worker-card__id, .worker-mini__id, .rtile__id");if(S){y.preventDefault();let Re=_.closest(".mon2-item, .rtile, .mon2-crow, .worker-mini")?.getAttribute("data-bead-id")||S.textContent?.trim()||"";Re&&qt(Re);return}let Y=_.closest(".worker-mini__repo, .worker-card__repo, .mon2-sec__worker");if(Y){y.preventDefault();let x=Y.getAttribute("data-root-dir")||J.get(_.closest(".mon2-item, .rtile, .worker-mini")?.getAttribute("data-bead-id")||"")?.root_dir||Y.getAttribute("title")||"";xt(x);return}let V=_.closest(".mon2-sec__toggle");if(V){y.preventDefault(),U(V.getAttribute("data-root-dir")||"");return}let ie=_.closest(".worker-pane__toggle[data-lane]");if(ie){y.preventDefault();let x=ie.getAttribute("data-lane")||"";(x==="candidate"||x==="queue"||x==="running"||x==="pr_wait"||x==="done")&&Ne(x);return}let $e=_.closest(".worker-wait__area-toggle[data-area]");if($e){y.preventDefault(),ut($e.getAttribute("data-area")||"parallel");return}if(_.closest(".mon2-newlane")){y.preventDefault(),It("create","");return}let Xe=_.closest(".mon2-clane__confirm, .mon2-clane__reapply, .mon2-clane__remove, .mon2-clane__run, .mon2-clane__stop");if(Xe){y.preventDefault();let x=Xe.getAttribute("data-lane-id")||"",Re=Xe.classList;It(Re.contains("mon2-clane__confirm")?"confirm":Re.contains("mon2-clane__reapply")?"reapply":Re.contains("mon2-clane__run")?"run":Re.contains("mon2-clane__stop")?"stop":"remove",x);return}if(_.closest(".mon-merge-all")){y.preventDefault(),Pe();return}let it=_.closest(".mon-filter__spec");if(it){y.preventDefault(),k={...k,spec:it.getAttribute("data-spec")||"all"},Ap(k),Oe();return}let yt=_.closest(".mon2-item, .rtile, .mon2-crow, .worker-mini, .worker-card");if(!yt)return;let mt=yt.getAttribute("data-bead-id")||"",$=_.closest("button");if($){y.preventDefault(),Ft($,mt);return}_.closest(".rtile__failure-pop, .chip-popover")||mt&&!p&&(y.preventDefault(),ze(mt,yt.getAttribute("data-root-dir")||lt(mt).root_dir))}function de(y){let p=y.target;if(!p||typeof p.closest!="function")return;let _=p.closest(".mon-filter__blocked");if(_){k={...k,show_blocked:_.checked},Ap(k),Oe();return}let S=p.closest(".mon-candidate-sort");if(S){R=Io.some(ie=>ie.value===S.value)?S.value:"repo_spec",gy(R),Oe();return}let Y=p.closest(".mon-running-sort");if(Y){m=Y.value==="repo"?"repo":"started",ky(m),Oe();return}let V=p.closest(".mon-done-range");V&&(b=Ln(V.value),vy(b),Oe())}function C(y){let p=y.target,_=p&&typeof p.closest=="function"?S=>p.closest(S):()=>null;I&&!_(".rtile__failure-pop, .rtile__failure-badge")&&(I=null,Oe())}function ne(y){y.key!=="Escape"||I===null||(I=null,Oe())}e.addEventListener("click",en),e.addEventListener("change",de),document.addEventListener("click",C),document.addEventListener("keydown",ne),F.attach(),ot.attach(e);{let y=!0;X=Ei(p=>{if(oe=p,y){y=!1;return}Oe()})}o&&typeof o.subscribe=="function"&&(_e=o.subscribe(()=>{try{Ae.clear(),Oe()}catch{}}));function Le(){ke!==null&&(clearInterval(ke),ke=null)}return{recorrectSharedLane:Yt,load(){n("load"),Oe(),ke===null&&(ke=setInterval(()=>{try{Oe()}catch{}},$y))},pause(){Le()},clear(){Le(),ot.detach(),_e&&(_e(),_e=null),X&&(X(),X=null),De.destroy(),P.hidden=!0,me?.destroy(),me=null,e.removeEventListener("click",en),e.removeEventListener("change",de),document.removeEventListener("click",C),document.removeEventListener("keydown",ne),F.detach(),e.replaceChildren()}}}function Dp(e,t,n){let r=Ct("views:nav"),{global_element:o,repo_element:s}=e,i=null;function l(b){return m=>{m.preventDefault();let k=b==="monitor"&&a()==="monitor"?"worker":b;r("click tab %s",k),n.gotoView(k)}}function a(){let b=t.getState();return b.view==="worker"||b.view==="monitor"?b.view:"board"}function u(){let b=a();return c`
      <a
        href="#/monitor"
        class="ctl-tab ctl-tab--monitor ${b==="monitor"?"is-active":""}"
        @click=${l("monitor")}
      >
        <span class="ctl-tab__dots" aria-hidden="true"
          ><i></i><i></i><i></i><i></i
        ></span>
        Monitor
      </a>
    `}function d(){let b=a();return c`
      <div class="ctl-tabs">
        <a
          href="#/board"
          class="ctl-tab ${b==="board"?"is-active":""}"
          @click=${l("board")}
          >Board</a
        >
        <a
          href="#/worker"
          class="ctl-tab ${b==="worker"?"is-active":""}"
          @click=${l("worker")}
          >Worker</a
        >
      </div>
    `}function f(){o&&st(u(),o),s&&st(d(),s)}return f(),i=t.subscribe(()=>f()),{destroy(){i&&(i(),i=null),o&&st(c``,o),s&&st(c``,s)}}}var Pp=["bug","feature","task","epic","chore"];function Np(e){switch((e||"").toString().toLowerCase()){case"bug":return"Bug";case"feature":return"Feature";case"task":return"Task";case"epic":return"Epic";case"chore":return"Chore";default:return""}}var qp=["Critical","High","Medium","Low","Backlog"];function Fp(e,t){let n=document.createElement("dialog");n.id="new-issue-dialog",n.setAttribute("role","dialog"),n.setAttribute("aria-modal","true"),n.innerHTML=`
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
  `,e.appendChild(n);let r=n.querySelector("#new-issue-form"),o=n.querySelector("#new-title"),s=n.querySelector("#new-type"),i=n.querySelector("#new-priority"),l=n.querySelector("#new-labels"),a=n.querySelector("#new-description"),u=n.querySelector("#new-issue-error"),d=n.querySelector("#btn-cancel"),f=n.querySelector("#btn-create"),b=n.querySelector(".new-issue__close");function m(){s.replaceChildren();let O=document.createElement("option");O.value="",O.textContent="\u2014 Select \u2014",s.appendChild(O);for(let I of Pp){let F=document.createElement("option");F.value=I,F.textContent=Np(I),s.appendChild(F)}i.replaceChildren();for(let I=0;I<=4;I+=1){let F=document.createElement("option");F.value=String(I);let B=qp[I]||"Medium";F.textContent=`${I} \u2013 ${B}`,i.appendChild(F)}}m();function k(){try{typeof n.close=="function"?n.close():n.removeAttribute("open")}catch{n.removeAttribute("open")}}function R(O){o.disabled=O,s.disabled=O,i.disabled=O,l.disabled=O,a.disabled=O,d.disabled=O,f.disabled=O,f.textContent=O?"Creating\u2026":"Create"}function j(){u.textContent=""}function H(O){u.textContent=O}function oe(){try{let O=window.localStorage.getItem("beads-ui.new.type");O?s.value=O:s.value="";let I=window.localStorage.getItem("beads-ui.new.priority");I&&/^\d$/.test(I)?i.value=I:i.value="2"}catch{s.value="",i.value="2"}}function X(){let O=s.value||"",I=i.value||"";O.length>0&&window.localStorage.setItem("beads-ui.new.type",O),I.length>0&&window.localStorage.setItem("beads-ui.new.priority",I)}async function q(){j();let O=String(o.value||"").trim();if(O.length===0){H("Title is required"),o.focus();return}let I=Number(i.value||"2");if(!(I>=0&&I<=4)){H("Priority must be 0..4"),i.focus();return}let F=String(s.value||""),B=String(a.value||""),ae={title:O};F.length>0&&(ae.type=F),String(I).length>0&&(ae.priority=I),B.length>0&&(ae.description=B),R(!0);try{await t("create-issue",ae)}catch{R(!1),H("Failed to create issue");return}X(),R(!1),k()}return n.addEventListener("cancel",O=>{O.preventDefault(),k()}),b.addEventListener("click",()=>k()),d.addEventListener("click",()=>k()),n.addEventListener("keydown",O=>{O.key==="Enter"&&(O.ctrlKey||O.metaKey)&&(O.preventDefault(),q())}),r.addEventListener("submit",O=>{O.preventDefault(),q()}),{open(){r.reset(),j(),oe();try{"showModal"in n&&typeof n.showModal=="function"?n.showModal():n.setAttribute("open","")}catch{n.setAttribute("open","")}setTimeout(()=>{try{o.focus()}catch{}},0)},close(){k()}}}var Sy=[["route","route \uCE69"],["fast_track","\u26A1 fast_track \uCE69"],["pr","PR \uCE69"],["from","\u21A9 from \uCE69"],["blocked","blocked\xB7\uC0AC\uC6A9\uC790 \uB9AC\uBDF0 \uD544\uC694 \uCE69"],["stepper","stepper"]];function Ey(e,t){return Zi(e,t)?"shown":t.hidden_labels.includes(e)?"hidden_exact":"hidden_prefix"}function jp(e,t,n){return c`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">라벨 표시</div>
      <p class="settings-dialog__hint-block">
        라벨을 눌러 표시/숨김을 전환합니다. prefix 규칙으로 숨겨진 라벨을 누르면
        그 라벨만 예외로 다시 표시됩니다.
      </p>
      ${t.length===0?c`<div class="settings-dialog__empty">라벨 없음</div>`:c`<div class="settings-dialog__pills">
            ${t.map(r=>{let o=Ey(r,e);return c`<button
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
  `}function Bp(e,t,n){return c`
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
  `}function Up(e,t){return c`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">카드 표시 요소</div>
      <div class="settings-dialog__toggles">
        ${Sy.map(([n,r])=>c`<label class="settings-dialog__toggle">
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
  `}var Ty=[{id:"execution",label:"\uC2E4\uD589",glyph:"\u25C6"},{id:"display",label:"\uD45C\uC2DC",glyph:"\u25EB"}];function Wp(e,t){let{transport:n,policyStore:r,labelOptions:o}=t,s=t.notify||(ee=>be(ee,"error",4e3)),i=document.createElement("dialog");i.id="settings-dialog",i.className="settings-dialog",i.setAttribute("role","dialog"),i.setAttribute("aria-modal","true"),i.setAttribute("aria-label","\uC124\uC815"),e.appendChild(i);let l="execution",a=!1,u="",d=null;function f(){if(d)return d;let ee=i.querySelector('[data-pane="execution"]');return ee?(d=Mi(ee,{root_dir:null,queue:()=>t.queueStore?.get()??null,transport:n,implPresetStore:t.implPresetStore,notify:s,onQueueAdopt:Se=>t.queueStore?.set?.(Se)}),d):null}function b(){return c`
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
    `}function m(){let ee=r.get();return c`
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
              ${jp(ee,o(),H)}
              ${Bp(ee,u,{onDraft:Se=>{u=Se},onAdd:oe,onRemove:X})}
              ${Up(ee,q)}
            `:c`<div class="settings-dialog__empty">
              표시 정책을 불러오는 중…
            </div>`}
      </section>
    `}async function k(ee){let Se=r.get();if(Se)try{let ge=await n("display-policy-set",{expected_revision:Se.revision,policy:ee(Se)});R(ge),ge&&ge.conflict&&ge.policy&&(ge=await n("display-policy-set",{expected_revision:ge.policy.revision,policy:ee(ge.policy)}),R(ge)),ge&&ge.conflict&&s("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC")}catch{s("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328")}}function R(ee){ee&&ee.policy&&typeof ee.policy=="object"&&r.set(ee.policy)}function j(ee){k(ee)}function H(ee){let Se=r.get();if(!Se)return;let ge=!Cy(ee,Se);j(ue=>Ry(ee,ue,ge))}function oe(){let ee=u.trim();ee.length!==0&&(u="",j(Se=>Se.hidden_prefixes.includes(ee)?{hidden_prefixes:Se.hidden_prefixes}:{hidden_prefixes:[...Se.hidden_prefixes,ee]}),O())}function X(ee){j(Se=>({hidden_prefixes:Se.hidden_prefixes.filter(ge=>ge!==ee)}))}function q(ee){let Se=r.get();if(!Se)return;let ge=Se.chips[ee]===!1;j(()=>({chips:{[ee]:ge}}))}function O(){st(c`
        <div class="settings-dialog__container">
          <nav
            class="settings-dialog__rail"
            role="tablist"
            aria-orientation="vertical"
          >
            <div class="settings-dialog__rail-title">설정</div>
            ${Ty.map(ee=>c`<button
                  type="button"
                  class="settings-dialog__tab"
                  role="tab"
                  data-tab=${ee.id}
                  aria-selected=${String(l===ee.id)}
                  aria-controls=${`settings-pane-${ee.id}`}
                  @click=${()=>I(ee.id)}
                >
                  <span class="settings-dialog__glyph">${ee.glyph}</span>
                  ${ee.label}
                </button>`)}
            <button
              type="button"
              class="settings-dialog__close"
              aria-label="닫기"
              @click=${Z}
            >
              닫기
            </button>
          </nav>
          <div class="settings-dialog__panes">
            ${b()} ${m()}
          </div>
        </div>
      `,i),f()}function I(ee){l=ee,O()}let F=()=>{a=!1,t.onOpenChange?.(!1)};i.addEventListener("close",F),i.addEventListener("cancel",F);let B=ee=>{ee.target===i&&Z()};i.addEventListener("click",B);let ae=null;r.subscribe&&(ae=r.subscribe(()=>{a&&O()}));let N=null;t.implPresetStore?.subscribe&&(N=t.implPresetStore.subscribe(()=>{a&&d?.render()}));function W(ee="execution"){a||(a=!0,t.onOpenChange?.(!0),l=ee,u="",O(),typeof i.showModal=="function"?i.showModal():i.setAttribute("open",""),f()?.load())}function Z(){a&&(a=!1,t.onOpenChange?.(!1),typeof i.close=="function"?i.close():i.removeAttribute("open"))}return{open:W,close:Z,sessionDraft:()=>d?.sessionDraft()??{},destroy(){a=!1,i.removeEventListener("close",F),i.removeEventListener("cancel",F),i.removeEventListener("click",B),ae&&(ae(),ae=null),N&&(N(),N=null),d?.destroy(),d=null,i.remove()}}}function Cy(e,t){return t.visible_labels.includes(e)?!0:t.hidden_labels.includes(e)?!1:!t.hidden_prefixes.some(n=>n.length>0&&e.startsWith(n))}function Ry(e,t,n){if(!n)return{hidden_labels:t.hidden_labels.includes(e)?t.hidden_labels:[...t.hidden_labels,e],visible_labels:t.visible_labels.filter(s=>s!==e)};let r=t.hidden_labels.filter(s=>s!==e);return t.hidden_prefixes.some(s=>s.length>0&&e.startsWith(s))?{hidden_labels:r,visible_labels:t.visible_labels.includes(e)?t.visible_labels:[...t.visible_labels,e]}:{hidden_labels:r}}var Oy=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],zp="usage-meter-card",Ly="usage-meter-layer",bl=600,Iy=["token_expired","relogin_required"];function Hp(e){return String(e).padStart(2,"0")}function My(e,t){let n=Math.max(0,Math.ceil((e-t)/6e4)),r=Math.floor(n/1440),o=Math.floor(n%1440/60),s=n%60;return r>0?`${r}d${o>0?` ${o}h`:""}`:o>0?`${o}h${s>0?` ${s}m`:""}`:`${s}m`}function Gp(e,t=Date.now()){let n=Date.parse(e);if(!Number.isFinite(n))return"";let r=new Date(n),o=new Date(t),s=`${Hp(r.getHours())}:${Hp(r.getMinutes())}`,l=r.getFullYear()===o.getFullYear()&&r.getMonth()===o.getMonth()&&r.getDate()===o.getDate()?s:`${Oy[r.getMonth()]} ${r.getDate()} ${s}`;return`${My(n,t)} \xB7 ${l}`}function Dy(e){let t=Math.max(0,Math.floor(e));return t<60?`${t}\uCD08 \uC804`:t<3600?`${Math.floor(t/60)}\uBD84 \uC804`:`${Math.floor(t/3600)}\uC2DC\uAC04 \uC804`}function Kp(e){return e>=85?"usage-meter__window--danger":e>=60?"usage-meter__window--warn":"usage-meter__window--success"}function Yp(e){let t=typeof e=="number"&&Number.isFinite(e)?e:0;return Math.min(100,Math.max(0,t))}var Vp=[{key:"claude",label:"Claude",endpoint:"/api/claude-usage",switch_endpoint:"/api/claude-account/switch",tool:"cswap"},{key:"codex",label:"Codex",endpoint:"/api/codex-usage",switch_endpoint:"/api/codex-account/switch",tool:"codex-auth"}];function Qp(e){let t=[];for(let n of e){if(!n||typeof n!="object")continue;let r=n;typeof r.key!="string"||r.key.length===0||typeof r.pct!="number"||!Number.isFinite(r.pct)||t.push({key:r.key,pct:r.pct,resetsAt:typeof r.resetsAt=="string"?r.resetsAt:""})}return t}function Py(e){if(!e||typeof e!="object")return null;let t=e;return!Number.isInteger(t.number)||t.number<=0||typeof t.email!="string"||t.email.length===0||typeof t.status!="string"||t.status.length===0||typeof t.active!="boolean"||!Array.isArray(t.windows)?null:{number:t.number,email:t.email,alias:typeof t.alias=="string"&&t.alias.length>0?t.alias:null,plan:typeof t.plan=="string"&&t.plan.length>0?t.plan:null,active:t.active,status:t.status,windows:Qp(t.windows),fetchedAt:typeof t.fetchedAt=="string"?t.fetchedAt:null,ageSeconds:typeof t.ageSeconds=="number"&&Number.isFinite(t.ageSeconds)?t.ageSeconds:null}}function Ny(e,t){if(!e||typeof e!="object")return null;let n=e,r=[];if(Array.isArray(n.accounts))for(let s of n.accounts){let i=Py(s);i&&r.push(i)}let o=n.available===!0&&Array.isArray(n.windows);return!o&&r.length===0?null:{available:o,windows:o?Qp(n.windows):[],ageSeconds:typeof n.ageSeconds=="number"&&Number.isFinite(n.ageSeconds)?n.ageSeconds:null,accounts:r,receivedAtMs:t,held:!1}}function qy(e,t){if(!e||typeof e!="object")return{kind:"error"};let n=Ny(e,t);return n?{kind:"ok",snapshot:n}:Array.isArray(e.accounts)?{kind:"empty"}:{kind:"error"}}function Zp(e,t){return(e.ageSeconds===null?0:e.ageSeconds)+Math.max(0,t-e.receivedAtMs)/1e3}function Fy(e,t){return!e.held||Zp(e,t)<=bl?e:{...e,available:!1,windows:[],accounts:[]}}function Xp(e,t){return`${e}:${t}`}function Jp(e){let t=!1,n=null,r=new Map,o=null,s=new Map,i=new Map,l=0,a=null;function u(){st(c``,e),e.hidden=!0,f()}function d(){if(a===null){let ue=e.ownerDocument;a=ue.createElement("div"),a.id=Ly,a.className="usage-meter__layer",ue.body.appendChild(a)}return a}function f(){a!==null&&(st(c``,a),a.remove(),a=null)}function b(ue){n!==ue&&(n===null&&(document.addEventListener("mousedown",k),document.addEventListener("keydown",j),window.addEventListener("resize",R)),n=ue)}function m(){n!==null&&(n=null,document.removeEventListener("mousedown",k),document.removeEventListener("keydown",j),window.removeEventListener("resize",R))}function k(ue){let P=ue.target;P&&(e.contains(P)||a!==null&&a.contains(P))||(m(),Z())}function R(){Z()}function j(ue){ue.key==="Escape"&&(m(),Z())}function H(ue){n===ue?m():b(ue),Z()}function oe(){m(),Z()}async function X(ue,P){if(r.has(ue.key))return;let we=Xp(ue.key,P);r.set(ue.key,P),i.delete(we),Z();let xe=null;try{xe=await(await fetch(ue.switch_endpoint,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({number:P})})).json()}catch{xe=null}if(t)return;if(r.delete(ue.key),!xe||xe.ok!==!0){let J=xe&&typeof xe.error=="string"&&xe.error.length>0?xe.error:"network_error";i.set(we,{kind:"error",text:`\uC804\uD658 \uC2E4\uD328 \u2014 ${J}`}),Z();return}let E=Array.isArray(xe.warnings)?xe.warnings.filter(J=>typeof J=="string"&&J.length>0):[];E.length>0&&i.set(we,{kind:"warn",text:E.join(" \xB7 ")}),Z(),await ge()}function q(ue,P,we,xe){let E=Yp(ue.pct),Ae=`resets ${Gp(ue.resetsAt,xe)}${P?` \xB7 ${we}`:""}`;return c`<span
      class="usage-meter__window ${Kp(E)}"
      style=${`--progress: ${E}%`}
      title=${Ae}
    >
      <span class="usage-meter__label">${ue.key}</span>
      <span class="usage-meter__track" aria-hidden="true">
        <span class="usage-meter__fill"></span>
      </span>
      <span class="usage-meter__pct">${E}%</span>
    </span>`}function O(ue,P,we){let xe=Zp(P,we),E=P.available&&(P.held||xe>bl),J=E?`${Math.floor(xe/60)}\uBD84 \uC804 \uCE21\uC815`:"",Ae=P.accounts.filter(De=>!De.active).length,_e=`usage-meter__group${E?" usage-meter__group--stale":""}`,ke=c`<span class="usage-meter__provider"
        >${ue.label}</span
      >
      ${P.available?P.windows.map(De=>q(De,E,J,we)):c`<span class="usage-meter__empty">사용량 없음</span>`}
      ${Ae>0?c`<span class="usage-meter__badge">+${Ae}</span>`:""}`;if(P.accounts.length===0)return c`<span
        class=${_e}
        aria-label=${`${ue.label} usage`}
        >${ke}</span
      >`;let me=n===ue.key;return c`<button
      type="button"
      class=${`usage-meter__toggle ${_e}`}
      aria-label=${`${ue.label} usage`}
      aria-expanded=${me?"true":"false"}
      aria-controls=${zp}
      @click=${()=>H(ue.key)}
    >
      ${ke}
    </button>`}function I(ue,P){return c`<span class="usage-meter" aria-label="Usage">
      ${ue.map(we=>O(we.provider,we.snapshot,P))}
    </span>`}function F(ue,P){let we=Yp(ue.pct),xe=Gp(ue.resetsAt,P);return c`<span
      class="usage-meter__account-window ${Kp(we)}"
      style=${`--progress: ${we}%`}
    >
      <span class="usage-meter__account-key">${ue.key}</span>
      <span class="usage-meter__account-track" aria-hidden="true">
        <span class="usage-meter__account-fill"></span>
      </span>
      <span class="usage-meter__account-pct">${we}%</span>
      <span class="usage-meter__account-reset"
        >${xe.length>0?`\u21BB ${xe}`:""}</span
      >
    </span>`}function B(ue,P){return Iy.includes(P)?`\uD1A0\uD070 \uB9CC\uB8CC \u2014 ${ue.tool} \uC7AC\uB85C\uADF8\uC778 \uD544\uC694`:"\uC0AC\uC6A9\uB7C9 \uC5C6\uC74C"}function ae(ue,P,we){let xe=P.status==="ok",E=typeof P.ageSeconds=="number"&&P.ageSeconds>bl,J=i.get(Xp(ue.key,P.number)),Ae=r.get(ue.key),_e=Ae!==void 0,ke=Ae===P.number,me=["usage-meter__account"];return P.active&&me.push("usage-meter__account--active"),xe||me.push("usage-meter__account--unavailable"),E&&me.push("usage-meter__account--stale"),c`<div class=${me.join(" ")}>
      <div class="usage-meter__account-head">
        <span class="usage-meter__account-label" title=${P.email}
          >${P.alias===null?P.email:P.alias}</span
        >
        ${P.plan===null?"":c`<span class="usage-meter__account-tag">${P.plan}</span>`}
        ${P.active?c`<span
              class="usage-meter__account-tag usage-meter__account-tag--active"
              >active</span
            >`:""}
        ${P.ageSeconds===null?"":c`<span class="usage-meter__account-age"
              >${Dy(P.ageSeconds)}</span
            >`}
        ${P.active?"":c`<button
              type="button"
              class="usage-meter__switch"
              ?disabled=${_e}
              @click=${()=>{X(ue,P.number)}}
            >
              ${ke?"\uC804\uD658 \uC911\u2026":"\uC804\uD658"}
            </button>`}
      </div>
      ${xe?c`<div class="usage-meter__account-windows">
            ${P.windows.map(De=>F(De,we))}
          </div>`:c`<div class="usage-meter__account-status">
            ${B(ue,P.status)}
          </div>`}
      ${J===void 0?"":c`<div
            class="usage-meter__account-message usage-meter__account-message--${J.kind}"
          >
            ${J.text}
          </div>`}
    </div>`}function N(ue,P,we){let xe=P.accounts.filter(E=>E.active).length;return c`<section class="usage-meter__section">
      <h2 class="usage-meter__section-title">
        ${ue.label} · 활성 ${xe} / 전체
        ${P.accounts.length}
      </h2>
      ${P.accounts.map(E=>ae(ue,E,we))}
    </section>`}function W(ue,P){return c`<div
      class="usage-meter__card"
      id=${zp}
      role="dialog"
      aria-label=${`${ue.provider.label} \uACC4\uC815 \uC0AC\uC6A9\uB7C9`}
    >
      ${N(ue.provider,ue.snapshot,P)}
      <p class="usage-meter__note">전환은 새로 시작하는 세션부터 적용됩니다.</p>
    </div>`}function Z(){let ue=Date.now(),P=[];for(let xe of Vp){let E=s.get(xe.key);E&&P.push({provider:xe,snapshot:Fy(E,ue)})}if(P.length===0){m(),u();return}let we=P.find(xe=>xe.provider.key===n&&xe.snapshot.accounts.length>0);we||m(),st(I(P,ue),e),e.hidden=!1,we?ee(we,ue):f()}function ee(ue,P){let we=d(),xe=e.getBoundingClientRect(),E=e.ownerDocument.documentElement.clientWidth;we.style.setProperty("--usage-meter-anchor-top",`${xe.bottom}px`),we.style.setProperty("--usage-meter-anchor-right",`${Math.max(0,E-xe.right)}px`),st(c`<div
          class="usage-meter__scrim"
          aria-hidden="true"
          @mousedown=${oe}
        ></div>
        ${W(ue,P)}`,we)}async function Se(ue){try{let P=await fetch(ue.endpoint);return P.ok?qy(await P.json(),Date.now()):{kind:"error"}}catch{return{kind:"error"}}}async function ge(){l+=1;let ue=l,P=await Promise.all(Vp.map(async we=>({provider:we,read:await Se(we)})));if(!(t||ue!==l)){for(let we of P){let xe=we.provider.key;if(we.read.kind==="ok"){s.set(xe,we.read.snapshot);continue}if(we.read.kind==="empty"){s.delete(xe);continue}let E=s.get(xe);E!==void 0&&!E.held&&s.set(xe,{...E,held:!0})}Z()}}return u(),ge(),o=setInterval(()=>{ge()},6e4),{destroy(){t=!0,o!==null&&(clearInterval(o),o=null),m(),u()}}}function Pi(e){let t=e?.blocked_info;return t&&typeof t=="object"?Array.isArray(t.blockers)?t.blockers.filter(r=>typeof r=="string"&&r.length>0):[]:(Array.isArray(e?.dependencies)?e.dependencies:[]).map(r=>{if(typeof r=="string")return r;if(!r||typeof r!="object")return"";let o=r.type??r.dependency_type;return o!==void 0&&o!=="blocks"?"":r.depends_on_id||r.id||""}).filter(Boolean)}var nf="bdui.worker.candidate_sort",es=Object.freeze([{id:"spec",label:"spec \uC6B0\uC120",chain:[{key:"spec",dir:"desc"},{key:"created",dir:"asc"}]},{id:"bottleneck",label:"\uBCD1\uBAA9 \uC6B0\uC120",chain:[{key:"priority",dir:"asc"},{key:"dependents",dir:"desc"},{key:"released",dir:"desc"}]},{id:"created",label:"\uCD5C\uC2E0 \uC0DD\uC131",chain:[{key:"created",dir:"desc"},{key:"priority",dir:"asc"}]},{id:"updated",label:"\uCD5C\uC2E0 \uC218\uC815",chain:[{key:"updated",dir:"desc"}]}]),Ni=Object.freeze({preset:"spec"}),rf=3,of=Object.freeze([{key:"priority",label:"\uC6B0\uC120\uC21C\uC704"},{key:"dependents",label:"\uD6C4\uC18D \uC218"},{key:"released",label:"\uD574\uC81C \uC2DC\uAC01"},{key:"spec",label:"spec \uC720\uBB34"},{key:"created",label:"\uC0DD\uC131"},{key:"updated",label:"\uC218\uC815"}]);function ef(e){return es.some(t=>t.id===e)}function tf(e){let t=es.find(n=>n.id===e);return t?t.chain.map(n=>({...n})):[]}function jy(e,t){return e.length===t.length&&e.every((n,r)=>n.key===t[r].key&&n.dir===t[r].dir)}function ts(e){return e&&"preset"in e?tf(e.preset):e&&Array.isArray(e.chain)?e.chain.map(t=>({...t})):tf("spec")}function yl(e){return e&&"preset"in e?e.preset:null}function Cr(e){if(typeof e=="string"){let s;try{s=JSON.parse(e)}catch{return ef(e)?{preset:e}:Ni}return Cr(s)}if(!e||typeof e!="object")return Ni;let t=e;if(ef(t.preset))return{preset:t.preset};let n=t.chain;if(!Array.isArray(n)||n.length===0||n.length>rf||!n.every(Yi))return Ni;let r=[];for(let s of n)r.some(i=>i.key===s.key)||r.push({key:s.key,dir:s.dir});let o=es.find(s=>jy(s.chain,r));return o?{preset:o.id}:{chain:r}}function sf(){try{return Cr(window.localStorage.getItem(nf))}catch{return Ni}}function vl(e){try{window.localStorage.setItem(nf,JSON.stringify(e))}catch{}}function af(e,t,n){let r=e.map(a=>({...a}));if(!n)return r.slice(0,t);if(!Object.prototype.hasOwnProperty.call(ms,n))return r;let o=n;if(r.slice(0,t).some(a=>a.key===o))return r.slice(0,t);let s={key:o,dir:r[t]&&r[t].key===o?r[t].dir:ms[o]},i=r.slice(0,t),l=r.slice(t+1).filter(a=>a.key!==o);return[...i,s,...l].slice(0,rf)}function lf(e,t){return e.map((n,r)=>r===t?{key:n.key,dir:n.dir==="asc"?"desc":"asc"}:{...n})}function By(e){let t=new Set(e.map(l=>l.id)),n=new Map,r=new Map;for(let l of e){let a=Pi(l).filter(u=>t.has(u));n.set(l.id,a);for(let u of a){let d=r.get(u);d?d.push(l):r.set(u,[l])}}let o=new Set,s=[],i=l=>{o.add(l.id),s.push(l);for(let a of r.get(l.id)??[])!o.has(a.id)&&(n.get(a.id)??[]).every(u=>o.has(u))&&i(a)};for(;s.length<e.length;){let l=e.find(a=>!o.has(a.id)&&(n.get(a.id)??[]).every(u=>o.has(u)));i(l??e.find(a=>!o.has(a.id)))}return s}function cf(e,t){let n=Array.isArray(e)?e.slice():[];return n.sort(ic(ts(t))),By(n)}function uf(e,t){let n=new Map;if(!e||typeof e!="object")return n;let r=e,o=[],s=new Set;for(let i of t){if(s.has(i.id))continue;s.add(i.id);let l=r[i.id];if(!l||!Array.isArray(l.scope))continue;let a=l.scope.filter(u=>typeof u=="string"&&u.length>0);if(a.length===0){n.set(i.id,{overlaps:[],scope_missing:!0});continue}n.set(i.id,{overlaps:[],scope_missing:!1}),o.push({member:i,scope:a})}for(let i=0;i<o.length;i+=1)for(let l=i+1;l<o.length;l+=1){let a=qs(o[i].scope,o[l].scope);if(a.length===0)continue;let u=o[i].member,d=o[l].member;n.get(u.id)?.overlaps.push({id:d.id,title:d.title,location_label:d.location_label,prefixes:a}),n.get(d.id)?.overlaps.push({id:u.id,title:u.title,location_label:u.location_label,prefixes:a})}return n}var df=new Set(["sh","bash","zsh","dash","ksh"]),pf=/('(?:[^']*)'|"(?:\\.|[^"\\])*"|#.*|\$(?:\{[^}\n]*\}|[A-Za-z_][A-Za-z0-9_]*|[?#@*!$0-9-])|\b(?:if|then|else|elif|fi|for|while|until|do|done|case|esac|in|function|select|time)\b)/g;function ff(e){let t=e.split("/");return t[t.length-1]||""}function Uy(e){let t=e.split(`
`,1)[0];if(!t.startsWith("#!"))return!1;let n=t.slice(2).trim().split(/\s+/).filter(Boolean);if(n.length===0)return!1;let r=ff(n[0]);if(r!=="env")return df.has(r);let o=n.slice(1).find(s=>!s.startsWith("-")&&!s.includes("="));return o!==void 0&&df.has(ff(o))}function Wy(e){return e.startsWith("#")?"comment":e.startsWith("'")||e.startsWith('"')?"string":e.startsWith("$")?"variable":"keyword"}function zy(e){let t=[],n=0;pf.lastIndex=0;for(let r of e.matchAll(pf)){let o=r.index;o>n&&t.push({text:e.slice(n,o),kind:"plain"}),t.push({text:r[0],kind:Wy(r[0])}),n=o+r[0].length}return n<e.length&&t.push({text:e.slice(n),kind:"plain"}),t.length===0&&t.push({text:e,kind:"plain"}),t}function Hy(e){return{bad_request:"\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD\uC774 \uC62C\uBC14\uB974\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.",forbidden:"\uB4F1\uB85D\uB418\uC9C0 \uC54A\uC740 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uC758 \uC2A4\uD06C\uB9BD\uD2B8\uB294 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",lane_not_declared:"\uD604\uC7AC \uACE0\uC815 \uC120\uC5B8\uC5D0 \uD574\uB2F9 \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4.",stale_declaration:"\uC800\uC7A5\uC18C \uC791\uC5C5 \uC120\uC5B8\uC774 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uD654\uBA74\uC5D0\uC11C \uB2E4\uC2DC \uC5F4\uC5B4 \uC8FC\uC138\uC694.",too_large:"\uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uB108\uBB34 \uCEE4\uC11C \uD654\uBA74\uC5D0 \uD45C\uC2DC\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",unsupported_content:"\uD14D\uC2A4\uD2B8 \uD615\uC2DD\uC758 \uC2A4\uD06C\uB9BD\uD2B8\uB9CC \uD45C\uC2DC\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.",unreadable:"\uACE0\uC815\uB41C \uC2A4\uD06C\uB9BD\uD2B8 \uB0B4\uC6A9\uC744 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4."}[e]||"\uC2A4\uD06C\uB9BD\uD2B8\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4."}function _f(e){let t=e.getWorkspacePath,n=e.fetchImpl||globalThis.fetch?.bind(globalThis),r=document.createElement("div");r.className="repo-ops-script-viewer-root",document.body.appendChild(r);let o=null,s="loading",i="",l="",a=0,u=null,d=!1;function f(O,I){return I?zy(O).map(F=>F.kind==="plain"?F.text:c`<span
            class="repo-ops-script-viewer__token repo-ops-script-viewer__token--${F.kind}"
            >${F.text}</span
          >`):O}function b(){if(!o)return c``;let O=s==="ready"&&Uy(i),I=s==="ready"?i.split(`
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
              ?disabled=${s!=="ready"}
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
          ${s==="loading"?c`<div class="repo-ops-script-viewer__status">
                스크립트 불러오는 중…
              </div>`:s==="error"?c`<div
                  class="repo-ops-script-viewer__status repo-ops-script-viewer__status--error"
                >
                  ${l}
                </div>`:c`<div class="repo-ops-script-viewer__code" tabindex="0">
                  ${I.map((F,B)=>c`<div class="repo-ops-script-viewer__row">
                        <span
                          class="repo-ops-script-viewer__line-number"
                          aria-hidden="true"
                          >${B+1}</span
                        ><code class="repo-ops-script-viewer__code-line"
                          >${f(F,O)}</code
                        >
                      </div>`)}
                </div>`}
        </div>
      </section>
    </div>`}function m(){st(b(),r)}async function k(){if(s!=="ready")return;let O=await rn(i);be(O?"\uC2A4\uD06C\uB9BD\uD2B8 \uBCF5\uC0AC\uB428":"\uC2A4\uD06C\uB9BD\uD2B8 \uBCF5\uC0AC \uC2E4\uD328",O?"success":"error")}function R(O){O.key==="Escape"&&o&&(O.preventDefault(),X())}function j(){d||(document.addEventListener("keydown",R),d=!0)}function H(){d&&(document.removeEventListener("keydown",R),d=!1)}async function oe(O,I=null){let F=++a;j(),o={...O},u=I||(document.activeElement instanceof HTMLElement?document.activeElement:null),s="loading",i="",l="",m(),r.querySelector(".repo-ops-script-viewer__close")?.focus();let ae=t?t():"";if(!ae){s="error",l="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4.",m();return}if(!n){s="error",l="\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD \uAE30\uB2A5\uC744 \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",m();return}let N="/api/repo-ops-script?workspace="+encodeURIComponent(ae)+"&lane="+encodeURIComponent(O.lane)+"&base_sha="+encodeURIComponent(O.base_sha);try{let W=await n(N),Z=await W.json().catch(()=>({}));if(F!==a)return;if((t?t():"")!==ae){X();return}if(!W.ok||!Z||Z.ok!==!0){s="error",l=Hy(Z&&typeof Z.error=="string"?Z.error:""),m();return}o={lane:Z.lane,base_sha:Z.base_sha,path:Z.path,base_ref:Z.base_ref},i=String(Z.content),s="ready",m()}catch{if(F!==a)return;s="error",l="\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",m()}}function X(){a+=1,H(),o=null,i="",m();let O=u;u=null,O?.isConnected&&O.focus()}function q(){X(),r.remove()}return{open:oe,close:X,destroy:q}}var mf={deploy_not_declared:"\uC120\uC5B8 \uC5C6\uC74C",deploy_opted_out:"\uC774 workspace\uC5D0\uC11C \uBC30\uD3EC \uC2E4\uD589\uC774 \uAEBC\uC838 \uC788\uC74C",deploy_in_flight:"\uBC30\uD3EC \uC9C4\uD589 \uC911",target_unresolved:"\uB300\uC0C1 tip\uC744 \uD655\uC815\uD558\uC9C0 \uBABB\uD568",remote_history_not_monotonic:"\uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC\uC640 \uC6D0\uACA9 \uC774\uB825\uC774 \uAC08\uB77C\uC9D0"},Gy=new Set(["queued","running","retry_pending"]);function gf(e){let t=e.queueStore,n=e.transport,r=e.onChanged||(()=>{}),o=e.onOpenScript;function s(){return t&&t.get()||{}}function i(){let N=s();return typeof N.revision=="number"?N.revision:0}function l(N){t&&N&&N.queue&&typeof N.queue=="object"&&t.set(N.queue)}function a(){let N=s().workspace_info;return N&&typeof N=="object"?N:{}}function u(N,W){return c`<span
      class="worker-repo-ops__vd-badge worker-repo-ops__vd-badge--${N}"
      >${W}</span
    >`}function d(N){if(typeof N!="number"||!Number.isFinite(N))return"";let W=N/6e4;return Number.isInteger(W)?`timeout ${W}\uBD84`:`timeout ${Math.round(N/1e3)}\uCD08`}function f(N){let W=d(N);return W?u("config",W):""}function b(N,W,Z){return c`<button
      type="button"
      class="worker-repo-ops__vd-cmd worker-repo-ops__vd-cmd--link"
      .textContent=${Z.script}
      @click=${ee=>{o&&o({lane:N,base_sha:W.base_sha,path:Z.script,base_ref:W.base_ref},ee.currentTarget)}}
    ></button>`}function m(){let N=s().repo_operations;return Array.isArray(N)?N:[]}function k(){let N=a().repo_ops,W=N&&typeof N=="object"?N.repo_id:null;return typeof W=="string"&&W?W:null}function R(){return m().some(N=>N&&N.kind==="deploy"&&Gy.has(N.state))}function j(){let N=R(),W=k()===null;return c`<button
      type="button"
      class="worker-repo-ops__deploy-run"
      data-seam="repo-ops-deploy-run"
      ?disabled=${N||W}
      title=${N?"\uBC30\uD3EC \uC9C4\uD589 \uC911":W?"\uC800\uC7A5\uC18C\uB97C \uD655\uC778\uD560 \uC218 \uC5C6\uC74C":"\uC6D0\uACA9 base tip\uC5D0\uC11C \uBC30\uD3EC \uC2A4\uD06C\uB9BD\uD2B8\uB97C 1\uD68C \uC2E4\uD589\uD569\uB2C8\uB2E4"}
      @click=${()=>{I()}}
    >
      배포 실행
    </button>`}function H(){let N=s().repo_ops_opt_out;return{verify:N?.verify===!0,deploy:N?.deploy===!0}}function oe(N,W){return c`<label class="worker-repo-ops__lane-run">
      <input
        type="checkbox"
        .checked=${!W}
        @change=${Z=>{O(N,!Z.target.checked)}}
      />
      이 workspace에서 실행
    </label>`}function X(N){let W=typeof N.base_sha=="string"?N.base_sha:"",Z=`${N.source_path||"repo-ops/config.toml"} @ ${N.base_ref||"?"}${W?`@${W.slice(0,7)}`:""}`,ee=H(),Se=!!N.verify&&ee.verify,ge=!!N.deploy&&ee.deploy;return c`<section class="worker-repo-ops__vd" data-seam="repo-ops">
      <p class="worker-repo-ops__vd-title">
        저장소 작업 선언
        <span class="worker-repo-ops__vd-src">${Z}</span>
      </p>
      <div
        class="worker-repo-ops__lane${Se?" worker-repo-ops__lane--skipped":""}"
        data-lane="verify"
      >
        <span class="worker-repo-ops__lane-k">머지 전 검증</span>
        <span class="worker-repo-ops__lane-v"
          >${N.verify?c`${b("verify",N,N.verify)}
              ${f(N.verify.timeout_ms)}
              ${Se?u("skipped","\uC774 workspace\uC5D0\uC11C \uAC74\uB108\uB700"):""}`:c`선언 없음${u("absent","verify \uC5C6\uC774 \uD310\uC815")}`}</span
        >
        <span class="worker-repo-ops__lane-d"
          >${Se?"\uC774 workspace\uC5D0\uC11C\uB294 \uAC80\uC99D \uC5C6\uC774 \uD310\uC815\uD569\uB2C8\uB2E4.":N.verify?"\uBA38\uC9C0 \uC804\uC5D0 \uC774 \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uD1B5\uACFC\uD574\uC57C \uC790\uACA9\uC744 \uC5BB\uC2B5\uB2C8\uB2E4.":"\uBA38\uC9C0 \uC790\uACA9\uC740 PR/base/head \uC2E0\uC120\uB3C4\xB7mergeability\xB7\uB9AC\uBDF0 \uC601\uC218\uC99D\uC73C\uB85C\uB9CC \uD310\uC815\uD569\uB2C8\uB2E4."}</span
        >
        ${N.verify?oe("verify",ee.verify):""}
      </div>
      <div
        class="worker-repo-ops__lane${ge?" worker-repo-ops__lane--skipped":""}"
        data-lane="deploy"
      >
        <span class="worker-repo-ops__lane-k">머지 후 배포</span>
        <span class="worker-repo-ops__lane-v"
          >${N.deploy?c`${b("deploy",N,N.deploy)}
              ${f(N.deploy.timeout_ms)}
              ${ge?u("skipped","\uC774 workspace\uC5D0\uC11C \uAC74\uB108\uB700"):j()}`:c`선언 없음${u("absent","\uBC30\uD3EC \uC5C6\uC74C")}`}</span
        >
        <span class="worker-repo-ops__lane-d"
          >${ge?"\uC774 workspace\uC5D0\uC11C\uB294 \uBC30\uD3EC \uC5C6\uC774 \uACE7\uBC14\uB85C \uC815\uB9AC\uB85C \uB118\uC5B4\uAC11\uB2C8\uB2E4.":N.deploy?c`Worker가 <code>.worktrees/.repo-ops-deploy</code>에서 대상
                  SHA로 정렬한 뒤 1회 실행합니다.`:"\uBA38\uC9C0 \uD6C4 \uBC30\uD3EC \uB2E8\uACC4 \uC5C6\uC774 \uACE7\uBC14\uB85C \uC815\uB9AC\uB85C \uB118\uC5B4\uAC11\uB2C8\uB2E4."}</span
        >
        ${N.deploy?oe("deploy",ee.deploy):""}
      </div>
    </section>`}function q(N){let W=N.repo_ops&&typeof N.repo_ops=="object"?N.repo_ops:null;return W&&(W.status==="resolved"||W.status==="absent")?X(W):W&&(W.status==="pending"||W.status==="error")?c`<section class="worker-repo-ops__vd" data-seam="repo-ops">
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
          ${W.status==="pending"?"\uC120\uC5B8 \uD655\uC778 \uC911":c`선언 읽기
              실패${W.error_code?c` — <code>${W.error_code}</code>`:""}`}
        </div>
      </section>`:c`<section class="worker-repo-ops__vd" data-seam="repo-ops">
      <p class="worker-repo-ops__vd-title">저장소 작업 선언</p>
      <div class="worker-repo-ops__vd-line worker-repo-ops__vd-absent">
        선언 확인 중
      </div>
    </section>`}async function O(N,W){if(!n)return;let Z=await n("worker-repo-ops-opt-out-toggle",{kind:N,opted_out:W,expected_revision:i()});if(l(Z),Z&&Z.conflict){let ee=await n("worker-repo-ops-opt-out-toggle",{kind:N,opted_out:W,expected_revision:i()});l(ee)}r()}async function I(){let N=k();if(!n||N===null)return;let W=await n("worker-repo-operation-deploy-run",{repo_id:N});if(l(W),!W||W.ok!==!0){let Z=W&&typeof W.reason=="string"?W.reason:"",ee=Object.hasOwn(mf,Z)?mf[Z]:Z||"\uBC30\uD3EC \uC2E4\uD589\uC744 \uC2DC\uC791\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4";be(`\uBC30\uD3EC \uC2E4\uD589 \uAC70\uBD80 \u2014 ${ee}`,"error")}else be("\uBC30\uD3EC \uC2E4\uD589\uC744 \uC2DC\uC791\uD588\uC2B5\uB2C8\uB2E4","success");r()}let F={owned_deploy_worktree_fetch_detached_alignment_recreate:"\uC804\uC6A9 \uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC \uC815\uB82C\xB7\uBCF5\uAD6C",recovered_pre_execution_fetch_timeout_retry_once:"fetch \uD0C0\uC784\uC544\uC6C3 1\uD68C \uBCF5\uAD6C",repo_serial_lock_wait:"\uC800\uC7A5\uC18C \uC21C\uCC28 \uC2E4\uD589 \uB300\uAE30",restart_operation_adoption:"\uC7AC\uC2DC\uC791 \uD6C4 \uC791\uC5C5 \uC778\uACC4",exact_input_exit_zero_evidence_adoption:"\uB3D9\uC77C \uC785\uB825 \uC131\uACF5 \uC99D\uAC70 \uC778\uACC4",descendant_success_covers_ancestor_rows:"\uCD5C\uC2E0 SHA \uC131\uACF5\uC774 \uC774\uC804 \uD589 \uCEE4\uBC84",owned_verify_candidate_cleanup:"\uAC80\uC99D \uC784\uC2DC \uCCB4\uD06C\uC544\uC6C3 \uC815\uB9AC",bounded_single_script_retry_exceeded:"\uB2E8\uC77C \uC2A4\uD06C\uB9BD\uD2B8 \uC7AC\uC2DC\uB3C4 \uD55C\uB3C4 \uCD08\uACFC",repair_session_dispatch:"\uC2E4\uD328 \uD574\uACB0 \uC138\uC158 \uC790\uB3D9 \uC2E4\uD589",baseline_failure_ignore:"\uAE30\uC874 \uC2E4\uD328 \uBB34\uC2DC",config_or_script_deletion_to_bypass_gate:"\uC124\uC815\xB7\uC2A4\uD06C\uB9BD\uD2B8 \uC0AD\uC81C\uB85C \uAC8C\uC774\uD2B8 \uC6B0\uD68C",credential_entry:"\uC790\uACA9\uC99D\uBA85 \uC785\uB825\xB7\uCD9C\uB825",destructive_action:"\uD30C\uAD34\uC801 \uC791\uC5C5",history_rewrite:"\uD788\uC2A4\uD1A0\uB9AC \uC7AC\uC791\uC131",agent_self_report_as_success:"\uC138\uC158 \uC790\uAE30\uBCF4\uACE0\uB97C \uC131\uACF5 \uCC98\uB9AC"};function B(N,W,Z){return c`<div class="worker-repo-ops__policy-group" data-policy=${Z}>
      <div class="worker-repo-ops__policy-label">${N}</div>
      <ul class="worker-repo-ops__policy-list">
        ${W.map(ee=>c`<li data-token=${ee}>
              ${F[ee]||ee}
            </li>`)}
      </ul>
    </div>`}function ae(){let N=s(),W=N.repo_operation_policy&&typeof N.repo_operation_policy=="object"?N.repo_operation_policy:null;return W?c`<section
      class="worker-repo-ops__repair"
      data-seam="repo-ops-policy"
    >
      <details class="worker-repo-ops__policy" data-seam="policy-lists">
        <summary>
          Worker 자동 처리 기준
          <span class="worker-repo-ops__policy-count"
            >자동 ${(W.worker_automatic||[]).length} · 금지
            ${(W.never_automatic||[]).length}</span
          >
        </summary>
        ${W.supported===!1?c`<div
              class="worker-repo-ops__policy-group"
              data-policy="policy-schema"
            >
              ${`\uACC4\uC57D \uC2A4\uD0A4\uB9C8 \uBD88\uC77C\uCE58 \u2014 \uC790\uB3D9 \uC7AC\uC2DC\uB3C4\uAC00 \uC815\uC9C0\uB418\uC5C8\uC2B5\uB2C8\uB2E4 (v${W.schema_version})`}
            </div>`:""}
        ${B("Worker\uAC00 \uC790\uB3D9 \uCC98\uB9AC",W.worker_automatic||[],"worker-automatic")}
        ${B("\uC790\uB3D9\uC73C\uB85C \uD558\uC9C0 \uC54A\uC74C",W.never_automatic||[],"never-automatic")}
      </details>
    </section>`:""}return{template(){return c`<details class="worker-repo-ops-settings">
        <summary class="worker-repo-ops-settings__summary">
          저장소 작업 · 검증/배포 선언
        </summary>
        ${q(a())} ${ae()}
      </details>`}}}var yf=20,Ky=5,Yy=new Set(["failed","running","queued","retry_pending"]),hf={verify:"\uBA38\uC9C0 \uC804 \uAC80\uC99D",deploy:"\uBA38\uC9C0 \uD6C4 \uBC30\uD3EC"};function Vy(e,t,n=yf){let r=[];for(let o of Array.isArray(e)?e:[])!o||typeof o!="object"||r.push({type:"operation",id:o.operation_id,at:typeof o.finished_at=="number"?o.finished_at:typeof o.requested_at=="number"?o.requested_at:null,operation:o});for(let o of Array.isArray(t)?t:[])!o||typeof o!="object"||r.push({type:"cleanup",id:o.bead_id,at:typeof o.at=="number"?o.at:null,cleanup:o});return r.sort((o,s)=>o.at===null&&s.at===null?String(o.id||"").localeCompare(String(s.id||"")):o.at===null?1:s.at===null?-1:s.at-o.at),r.slice(0,Math.max(0,n))}function Xy(e){if(e.type==="cleanup")return!0;let t=e.operation;return Yy.has(t.state)&&!t.dismissed&&!t.superseded_by}function Qy(e,t,n={}){let r=Vy(e,t,1/0),o=n.expanded===!0?yf:Ky,s=new Set(r.slice(0,o)),i=r.filter(l=>s.has(l)||Xy(l));return{visible:i,hidden:r.length-i.length}}function bf(e){if(e.type==="cleanup")return"warn";let t=e.operation.state;return t==="succeeded"?"ok":t==="failed"?"fail":"live"}function Zy(e){if(e.type==="cleanup")return"\uBA48\uCDA4";switch(e.operation.state){case"succeeded":return"\uC131\uACF5";case"failed":return"\uC2E4\uD328";case"retry_pending":return"\uC7AC\uC2DC\uB3C4 \uC911";case"running":return"\uC2E4\uD589 \uC911";default:return"\uB300\uAE30"}}function vf(e){let t=e.filter(n=>n.value);return t.length===0?"":c`<details class="worker-ev__details">
    <summary>세부</summary>
    <dl class="worker-ev__kv">
      ${t.map(n=>{let r=n.copy===!0?Zr(n.value):n.value;return c`<div>
          <dt>${n.term}</dt>
          <dd>${r}</dd>
        </div>`})}
    </dl>
  </details>`}function wf(e,t="",n=!1){return!e&&!t?"":c`<p
    class="worker-ev__explain${n?" worker-ev__explain--warn":""}"
  >
    <span class="worker-ev__cause">${e}</span>${t?c`<br />${t}`:""}
  </p>`}function Jy(e,t){if(!e||typeof e!="object")return;let n=t&&t.kind==="verify"?"verify":"deploy",r=e[n],o=r&&typeof r=="object"?r.timeout_ms:void 0;return typeof o=="number"&&Number.isFinite(o)?o:void 0}function ev(e,t){let n=pp(e,t),r=fp(e);return!n&&!r?"":c`<p class="worker-ev__why">
    ${n?c`<span class="worker-ev__why-line">${n}</span>`:""}${r?c`<span class="worker-ev__why-line">${r}</span>`:""}
  </p>`}function tv(e){return e.state!=="failed"||e.superseded_by||e.dismissed?"":c`<div class="worker-ev__acts">
    <button
      type="button"
      class="worker-ev__btn worker-repo-op__dismiss"
      data-operation-id=${e.operation_id}
      title="사람이 확인한 실패로 접수합니다 — 기록은 그대로 남고 해결 필요 집계에서만 빠집니다"
    >
      기록 닫기
    </button>
  </div>`}function nv(e,t){let n=e.operation,r=n.state==="failed",o=n.failure?n.failure.code:"";return c`<li
    class="worker-ev"
    data-operation-id=${n.operation_id}
    data-state=${n.state}
  >
    <span
      class="worker-ev__t"
      title=${e.at?Ht(e.at):""}
      >${Us(e.at)||"\u2014"}</span
    >
    <span class="worker-ev__node" aria-hidden="true"
      ><span class="worker-ev__dot worker-ev__dot--${bf(e)}"></span
    ></span>
    <div class="worker-ev__body">
      <div class="worker-ev__line1">
        <span class="worker-ev__what"
          >${Object.hasOwn(hf,n.kind)?hf[n.kind]:n.kind}</span
        >
        <span class="worker-ev__meta"
          >${n.target_base}@${Bs(n.target_sha)}${typeof n.elapsed_ms=="number"?` \xB7 ${kr(n.elapsed_ms)}`:""}</span
        >
        <span class="worker-ev__st worker-ev__st--${bf(e)}"
          >${Zy(e)}</span
        >
        ${n.dismissed?c`<span class="worker-ev__st worker-ev__st--quiet">접수됨</span>`:""}
        ${n.superseded_by?c`<span class="worker-ev__st worker-ev__st--quiet">덮임</span>`:""}
        ${n.source==="manual"?c`<span
              class="worker-ev__st worker-ev__st--manual"
              title="사람이 배포 실행을 눌러 시작한 작업입니다"
              >수동</span
            >`:""}
      </div>
      ${r?wf(dp(n.failure_kind,o)):""}
      ${ev(n,Jy(t,n))}
      ${tv(n)}
      ${vf([{term:"\uC2E4\uD328 \uCF54\uB4DC",value:r?o:""},{term:"script",value:[n.script_path||"",n.script_blob_sha?`blob ${Bs(n.script_blob_sha)}`:"",Number.isInteger(n.exit_code)?`exit ${n.exit_code}`:""].filter(Boolean).join(" \xB7 ")},{term:"\uB85C\uADF8",value:n.log_path||"",copy:!0},{term:"\uCD9C\uB825",value:n.output_tail||""}])}
    </div>
  </li>`}function rv(e){let t=e.cleanup,n=$r(t.step);return c`<li
    class="worker-ev"
    data-bead-id=${t.bead_id}
    data-state="cleanup_stalled"
  >
    <span
      class="worker-ev__t"
      title=${e.at?Ht(e.at):""}
      >${Us(e.at)||"\u2014"}</span
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
        ${Eu(t.step).map(r=>c`<li
              class="worker-step worker-step--${r.state}"
              data-step=${r.step}
            >
              <span class="worker-step__pip" aria-hidden="true"></span>
              <span class="worker-step__lb">${r.label}</span>
            </li>`)}
      </ol>
      ${wf(cr(t.reason),typeof t.retry_count=="number"&&t.retry_count>0?`${t.retry_count}\uD68C \uC790\uB3D9 \uC7AC\uC2DC\uB3C4 \uD6C4\uC5D0\uB3C4 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4 \u2014 \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD558\uBA74 \uBA48\uCD98 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4.`:"\uC815\uB9AC\uB97C \uC7AC\uAC1C\uD558\uBA74 \uBA48\uCD98 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4.",!0)}
      <div class="worker-ev__acts">
        <button
          type="button"
          class="worker-ev__btn worker-ev__btn--warn worker-cleanup__resume"
          data-bead-id=${t.bead_id}
        >
          정리 재개${n?` \u2014 ${n} \uB2E8\uACC4\uBD80\uD130`:""}
        </button>
      </div>
      ${vf([{term:"\uC2E4\uD328 \uCF54\uB4DC",value:t.reason||""},{term:"\uC9C4\uB2E8",value:t.detail||""},{term:"\uB85C\uADF8",value:t.log_path||"",copy:!0},{term:"\uCD9C\uB825",value:t.output_tail||""}])}
    </div>
  </li>`}function ov(e){let t=typeof e.hidden=="number"?e.hidden:0,n=e.expanded===!0;return c`<section class="worker-repo-drawer" data-seam="repo-ops-timeline">
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
          ${e.events.map(r=>r.type==="cleanup"?rv(r):nv(r,e.repo_ops))}
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
  </section>`}function kf(e,t={}){let n=null;function r(){if(n===null){st(c``,e);return}let i=Qy(n.operations,n.cleanup_failures,{expanded:n.expanded});st(ov({events:i.visible,hidden:i.hidden,expanded:n.expanded,repo:n.repo,repo_ops:n.repo_ops}),e)}e.addEventListener("click",i=>{let l=i.target;if(l?.closest?.('[data-seam="repo-ops-close"]')){s();return}l?.closest?.('[data-seam="repo-ops-more"]')&&n&&(n.expanded=!n.expanded,r())});function o(i){n={operations:i.operations,cleanup_failures:i.cleanup_failures,repo:i.repo||"",repo_ops:i.repo_ops||null,expanded:!1},r()}function s(){n!==null&&(n=null,r(),t.onClose&&t.onClose())}return{open:o,close:s,isOpen:()=>n!==null,refresh(i){n&&(n={operations:i.operations,cleanup_failures:i.cleanup_failures,repo:i.repo||"",repo_ops:i.repo_ops||null,expanded:n.expanded},r())}}}var sv="worker-ineligible";function ns(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function $f(e){return ns(e).includes(sv)}var iv="session-preferred",av=["external_roundtrip","user_feedback_loop"];function xf(e,t){if(!ns(e).includes(iv)||typeof t!="object"||t===null)return"";let n=t.session_preferred_reason;return typeof n=="string"&&av.includes(n)?n:""}var lv="spec-after-blocker";function Af(e,t){return ns(e).includes(lv)&&Array.isArray(t)&&t.length>0}var cv=Ct("views:worker:adapter"),uv="tab:worker:ready",dv="tab:worker:blocked",pv="tab:worker:in-progress",fv="tab:worker:resolved",_v="tab:worker:closed",mv="\u{1F512} blocked",gv={revision:0,auto_advance:!1,auto_merge:!1,slots:oi,queue:[],serial_lanes:[],serial_lane_count:0,pr_wait:[],done:[]},hv=["claude_account","codex_account"],bv=[...Yr,...hv];function yv(e){let t=e&&e.parent;return(typeof t=="string"?t.length>0:!!(t&&t.id))||/\.\d+$/.test(e&&e.id||"")}function vv(e){let t=e&&typeof e=="object"?e.awaiting_user:void 0,n=typeof t=="string"?t.trim():"";return n.length>0?`${Qs}: ${n}`:Qs}function Rr(e){return e&&typeof e=="object"?e:{}}function wv(e){let t={};for(let n of bv){let r=e[n];typeof r=="string"&&r.length>0&&(t[n]=r)}return t}function kv(e){let t=e.replace(/\/+$/,""),n=t.lastIndexOf("/");return n>=0?t.slice(n+1):t}function Sf(e={}){let{queueStore:t,issueStores:n,transport:r,getWorkspacePath:o,onInvalidate:s}=e,i=n?qr(n):null,l=new Map,a={},u=null,d=0,f=null,b=!1;function m(){b||!s||s()}function k(I){return u===I?a:{}}async function R(){if(!r||b)return;let I=o?.()||"";if(u===I||f&&f.key===I&&f.generation===d)return;let F=++d;f={key:I,generation:F};let B=null;try{B=await Promise.resolve(r("get-session-defaults",{}))}catch(ae){if(F!==d)return;f=null,cv("get-session-defaults failed: %o",ae),m();return}F===d&&(a=B&&typeof B.values=="object"&&B.values!==null?{...B.values}:{},u=I,f=null,m())}function j(){u=null,d+=1,R()}function H(){for(let[I,F]of l)F==="failed"&&l.delete(I)}function oe(I,F){return i?i.selectBoardColumn(I,F):[]}function X(I,F,B,ae){let N=Array.isArray(I.queue)?I.queue:[],W=new Set([...N.map(P=>P.bead_id),...(Array.isArray(I.serial_lanes)?I.serial_lanes:[]).flatMap(P=>(Array.isArray(P?.entries)?P.entries:[]).map(we=>we.bead_id)),...(Array.isArray(I.pr_wait)?I.pr_wait:[]).map(P=>P.bead_id),...(Array.isArray(I.done)?I.done:[]).map(P=>P.bead_id)]),Z=new Set(B.map(P=>P.id)),ee=new Set,Se=[];for(let P of[...F,...B])W.has(P.id)||ee.has(P.id)||yv(P)||(ee.add(P.id),Se.push(P));let ge=cf(Se,Cr(ae)),ue=Rr(I.bead_scope);return ge.map(P=>{let we=Pr(P),xe=we.evidence==="published",E=typeof P.workflow?.route=="string"&&P.workflow.route||(P.metadata&&typeof P.metadata.route=="string"?P.metadata.route:""),J=E==="quick_fix",Ae=!Object.hasOwn(P,"description")||typeof P.description=="string"&&P.description.trim().length>0,_e=Object.hasOwn(P,"labels")&&$f(P.labels),ke=_e||!Object.hasOwn(P,"labels")?"":xf(P.labels,P.metadata),me=P.metadata&&typeof P.metadata=="object"?Object.hasOwn(P.metadata,"awaiting_user"):!1,De=!_e&&!me&&(J?Ae:xe&&!we.conflict),ot=Z.has(P.id),Ye=ot?Pi(P):[],M=[];ot&&Ye.length===0&&M.push(mv),me&&M.push(vv(P.metadata)),J&&!Ae?M.push("missing_description"):!J&&we.conflict?M.push("spec_id_conflict"):!J&&we.evidence==="none"?M.push("spec \uC5C6\uC74C"):!J&&we.evidence==="draft"&&M.push("spec \uBBF8\uBC1C\uD589(draft)");let se=ue[P.id];return{bead_id:P.id,title:P.title||P.id,route:E,spec_id:we.conflict?"":we.path,published:xe,blocked:ot,blocked_by:Ye,labels:Array.isArray(P.labels)?P.labels:[],created_at:P.created_at,updated_at:P.updated_at,status:P.status,workflow:P.workflow||null,exec_pins:wv(Rr(P.metadata)),rec:null,...se&&Array.isArray(se.scope)?{scope:se.scope}:{},eligible:De,reason:M.join(" \xB7 "),worker_ineligible:_e,session_preferred:ke.length>0,session_preferred_reason:ke,spec_after_blocker:Af(P.labels,Ye),release_info:P.release_info,dependents_info:P.dependents_info}})}function q(I){let[F,B,ae,N,W]=I,Z=bs([...F,...B,...ae,...N,...W]),ee={},Se=(ge,ue)=>{if(!ge||typeof ge.id!="string"||ge.id.length===0)return;let P=ee[ge.id]||(ee[ge.id]={});if(typeof ge.priority=="number"&&!("priority"in P)&&(P.priority=ge.priority),typeof ge.from_id=="string"&&!("from_id"in P)&&(P.from_id=ge.from_id),ue&&!("metadata"in P)){P.metadata=Rr(ge.metadata);let we=Rr(ge.workflow).route;typeof we=="string"&&we.length>0&&(P.route=we)}};for(let ge of[...F,...B,...ae])Se(ge,!0);for(let ge of[...N,...W])Se(ge,!1);for(let ge of new Set([...Object.keys(ee),...Z.keys()])){let ue=ys(Z,ge);if(ue.total>0){let P=ee[ge]||(ee[ge]={});P.rollup=ue}}return ee}function O(I,F,B,ae){let N=new Set((Array.isArray(I.done)?I.done:[]).map(Z=>Z?.bead_id).filter(Z=>typeof Z=="string")),W=[];for(let Z of F){let ee=tr(Z.closed_at);if(typeof Z.id!="string"||N.has(Z.id)||ee===null||ae!==void 0&&ee<ae||typeof Z.comment_count!="number"||Z.comment_count<=0)continue;let Se=`${B}\0${Z.id}\0${String(Z.updated_at)}\0${Z.comment_count}`,ge=l.get(Se);if(ge===void 0&&r&&(l.set(Se,"pending"),Promise.resolve(r("get-comments",{id:Z.id})).then(P=>{let we=Array.isArray(P)&&P.some(xe=>wi(typeof xe?.text=="string"?xe.text:"")?.lane==="session");l.set(Se,we?"session":"not-session"),m()}).catch(()=>{l.set(Se,"failed"),m()})),ge!=="session")continue;let ue=tr(Z.started_at);W.push({id:Z.id,title:Z.title||Z.id,reason:"",draggable:!1,done:!0,lane:"done",selectable:!1,selected:!1,badges:["\uC138\uC158 \uC791\uC5C5"],alert:!1,usage:null,work_ms:ue!==null&&ee>=ue?ee-ue:null,work_kind:"session",done_at:ee,created_at:Z.created_at,updated_at:Z.updated_at})}return W}return{read(I){if(!t)return{workspaces:[],workspaces_state:[]};let F=t.get()||gv,B=o?.()||"",ae=I&&typeof I.done_since=="number"?I.done_since:void 0,N=oe(uv,"ready"),W=oe(dv,"blocked"),Z=oe(pv,"in_progress"),ee=oe(fv,"resolved"),Se=oe(_v,"closed");return{workspaces:[{...F,bead_titles:{...Rr(F.bead_titles),...Object.fromEntries([...N,...W].filter(ge=>ge&&typeof ge.id=="string").map(ge=>[ge.id,ge.title||ge.id]))},root_dir:B,name:kv(B),runnable:X(F,N,W,I?I.candidate_sort:void 0),session_done:O(F,Se,B,ae),bead_overlay:q([N,W,Z,ee,Se])}],workspaces_state:[{root_dir:B,revision:F.revision,auto_advance:F.auto_advance,auto_merge:F.auto_merge,slots:typeof Rr(F.workspace_info).slots=="number"?Rr(F.workspace_info).slots:F.slots,runner_catalog:F.runner_catalog,execution_defaults:F.execution_defaults,session_defaults:k(B),orchestration_model:F.orchestration_model,orchestration_effort:F.orchestration_effort,orchestration_speed:F.orchestration_speed,issue_prefix:""}]}},ensureSessionDefaults(){R()},refreshSessionDefaults:j,notifyIssuesChanged:H,destroy(){b=!0,d+=1,f=null,l.clear()}}}var qi=1,Ef=5,$v={root_dir:"",name:"",auto_advance:!1,auto_merge:!1,slots:qi,revision:0,runner_catalog:{},items:[],sublanes:{parallel:[],serial:[]},serial_lane_count:0,raw_queue_length:0,live_count:0,over_cap:!1,merge:{positions:new Map,resolutions:new Map,continuations:new Map,authorities:new Map,state:{active:null,failures:{},waiting:null},auto_excluded:[],running:!1},token_total:null,cleanup_failures:[],declared_base:null,repo_operations:[]};function pn(e){return e&&typeof e=="object"?e:{}}var Rf="beads-ui.worker.candidate-filter",wl={show_blocked:!1,spec:"all"};function xv(){try{let e=window.localStorage.getItem(Rf);if(!e)return{...wl};let t=JSON.parse(e);if(!t||typeof t!="object")return{...wl};let n=t.spec;return{show_blocked:t.show_blocked===!0,spec:n==="with"||n==="without"?n:"all"}}catch{return{...wl}}}function Av(e){try{window.localStorage.setItem(Rf,JSON.stringify(e))}catch{}}var Sv=[{value:"all",label:"\uC804\uCCB4"},{value:"with",label:"spec \uC788\uC74C"},{value:"without",label:"spec \uC5C6\uC74C"}],Of="bdui.worker.done-range";function Ev(){try{let e=window.localStorage.getItem(Of);return e===null?"today":Ln(e)}catch{return"today"}}function Tv(e){try{window.localStorage.setItem(Of,e)}catch{}}function Tf(e){let t=Array.isArray(e)&&e.length>0?e[0]:null;if(!t)return"";let n=typeof t.title=="string"?t.title:t.id||"";return n.length>22?`${n.slice(0,22)}\u2026`:n}function Cv(e){return e==="receipt_not_current"?"\uB9AC\uBDF0 \uD6C4\uC5D0\uB3C4 \uC601\uC218\uC99D\uC774 \uCD5C\uC885 head\uC5D0 \uC720\uD6A8\uD558\uC9C0 \uC54A\uC74C":e==="cancelled"?"\uB9AC\uBDF0 \uC138\uC158 \uCDE8\uC18C\uB428":e.startsWith("launch_failed:")?`\uB9AC\uBDF0 \uC138\uC158 \uC2DC\uC791 \uC2E4\uD328(${e.slice(14)})`:e.startsWith("session_failed:")?`\uB9AC\uBDF0 \uC138\uC158 \uBE44\uC815\uC0C1 \uC885\uB8CC(${e.slice(15)})`:`\uB9AC\uBDF0 \uC138\uC158 \uC2E4\uD328(${e})`}function Cf(e){if(e.startsWith("receipt_unbacked:"))return`\uC2E4\uD589 \uC601\uC218\uC99D \uC790\uB3D9 \uAC80\uC99D \uBD88\uAC00(${e.slice(17)}) \u2014 [\uBA38\uC9C0] \uD074\uB9AD\uC73C\uB85C \uC218\uB3D9 \uC9C4\uD589 \uAC00\uB2A5`;switch(e){case"not_in_pr_wait":return"PR \uB300\uAE30 \uC0C1\uD0DC \uB3D9\uAE30\uD654 \uC2E4\uD328";case"resolution_round_cap":return"\uCDA9\uB3CC \uD574\uC18C 2\uD68C \uCD08\uACFC";case"resolution_rebase_cap":return"\uD050 \uC7AC\uCDA9\uB3CC 3\uD68C \uCD08\uACFC";case"resolution_timeout":return"\uCDA9\uB3CC \uD574\uC18C \uB300\uAE30 \uC2DC\uAC04 \uCD08\uACFC";case"resolution_refused":return"\uD574\uC18C \uC138\uC158 \uB514\uC2A4\uD328\uCE58 \uAC70\uBD80";case"worktree_missing":return"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uD574\uC18C \uD544\uC694";case"worktree_restore_branch_mismatch":return"\uC6CC\uD06C\uD2B8\uB9AC \uBCF5\uC6D0 \uC2E4\uD328 \u2014 \uBE0C\uB79C\uCE58 \uC774\uB984 \uBD88\uC77C\uCE58";case"worktree_restore_path_exists":return"\uC6CC\uD06C\uD2B8\uB9AC \uBCF5\uC6D0 \uC2E4\uD328 \u2014 \uACBD\uB85C \uC774\uBBF8 \uC788\uC74C";case"worktree_restore_branch_missing":return"\uC6CC\uD06C\uD2B8\uB9AC \uBCF5\uC6D0 \uC2E4\uD328 \u2014 origin\uC5D0 \uBE0C\uB79C\uCE58 \uC5C6\uC74C";case"worktree_restore_branch_diverged":return"\uC6CC\uD06C\uD2B8\uB9AC \uBCF5\uC6D0 \uC2E4\uD328 \u2014 \uB85C\uCEEC \uBE0C\uB79C\uCE58\uAC00 origin\uACFC \uB2E4\uB984";case"worktree_restore_failed":return"\uC6CC\uD06C\uD2B8\uB9AC \uBCF5\uC6D0 \uC2E4\uD328";case"merge_unconfirmed_timeout":return"\uBA38\uC9C0 \uD655\uC778 \uC2DC\uAC04 \uCD08\uACFC";case"pr_closed_unmerged":return"PR \uB2EB\uD798";case"merge_error":return"\uBA38\uC9C0 \uC624\uB958";case"spec_id_missing":return"\uC2A4\uD399 ID \uAE30\uB85D \uC5C6\uC74C";default:return e}}function Rv(e){if(e==="lane_occupied")return"\uC2E4\uD589 \uB808\uC778\uC5D0 \uB0A8\uC544 \uC788\uC5B4 \uBA38\uC9C0 \uB300\uC0C1\uC774 \uC544\uB2D9\uB2C8\uB2E4";let t="\uBA38\uC9C0 \uD050\uC5D0 \uB123\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 (\uC774\uBBF8 \uB300\uAE30 \uC911\uC774\uAC70\uB098 \uB300\uC0C1 \uC544\uB2D8)";return typeof e=="string"&&e.length>0?`${t}: ${e}`:t}function Ov(e){if(e==="worker_sessions_busy")return"\uD574\uC18C \uB300\uAE30 \u2014 \uC2E4\uD589 \uC2AC\uB86F \uB300\uAE30 \uC911";if(typeof e!="string"||!e.startsWith("completion_waiting:"))return null;let t=e.slice(19);if(t.length===0)return null;switch(t){case"gating":return"\uBA38\uC9C0 \uC870\uAC74 \uD655\uC778 \uC911";case"merging":return"\uBA38\uC9C0 \uC911";case"cleaning":return"\uB9C8\uBB34\uB9AC \uC911";case"paused":return"\uC790\uB3D9 \uC9C4\uD589 \uC77C\uC2DC\uC815\uC9C0";case"needs_human":return"\uD655\uC778 \uD544\uC694";default:return null}}function Lv(e){if(!e||typeof e!="object")return null;switch(e.state){case"waiting":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC911",live:!0};case"yielded":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uACC4\uC18D \uC911 \xB7 \uC644\uB8CC \uD6C4 \uC6B0\uC120 \uBA38\uC9C0",live:!0};case"ready":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC644\uB8CC \xB7 \uC7AC\uAC80\uC99D \uB300\uAE30",live:!1};default:return null}}var Iv=new Set(["paused","needs_human","waiting_metadata","reviewing","retrying"]),Mv=new Set(["waiting_metadata","reviewing","retrying"]),kl=new Set(["review_receipt_missing","review_receipt_stale","review_receipt_invalid","review_receipt_undetermined"]);function Dv(e){let t=e&&typeof e=="object"?e.auto_resolution:null,n=t&&typeof t=="object"&&!Array.isArray(t)?t:null;if(!n||!e)return null;let r=typeof n.origin_reason=="string"&&n.origin_reason.length>0?`\uC6D0 \uC0AC\uC720: ${n.origin_reason}`:"";switch(e.phase){case"waiting_metadata":return{label:"\uC815\uC815 \uB300\uAE30",details:[r,"\uBA54\uD0C0\uB370\uC774\uD130 \uC815\uC815\uC774 \uAD00\uCE21\uB418\uBA74 \uC790\uB3D9 \uC7AC\uAC1C"].filter(Boolean),live:!1};case"retrying":{let o=Number.isInteger(n.attempts)?Math.max(0,Number(n.attempts)):0,s=Number.isInteger(n.attempt_cap)&&Number(n.attempt_cap)>0?Number(n.attempt_cap):0,i=typeof n.next_at=="number"?Ht(n.next_at):"",l=typeof n.last_error=="string"&&n.last_error.length>0?n.last_error:"";return{label:s>0?`\uC7AC\uC2DC\uB3C4 ${Math.min(o,s)}/${s}`:`\uC7AC\uC2DC\uB3C4 ${o}`,details:[r,i?`\uB2E4\uC74C \uC2DC\uAC01 ${i}`:"",l?`\uB9C8\uC9C0\uB9C9 \uC624\uB958: ${l}`:""].filter(Boolean),live:!0}}default:return null}}function Pv(e){if(typeof e!="string")return"";for(let t of["retry_exhausted:","auto_review_exhausted:"])if(e.startsWith(t))return e.slice(t.length);return""}function Nv(e,t=null){if(!e||typeof e!="object")return null;let n="";switch(e.phase){case"gating":n="\uBA38\uC9C0 \uC870\uAC74 \uD655\uC778 \uC911";break;case"merging":n="\uBA38\uC9C0 \uC911";break;case"cleaning":n="\uB9C8\uBB34\uB9AC \uC911";break;case"waiting_metadata":case"reviewing":case"retrying":if(!t)return null;n=t.label;break;case"paused":n="\uC790\uB3D9 \uC9C4\uD589 \uC77C\uC2DC\uC815\uC9C0";break;case"needs_human":n="\uD655\uC778 \uD544\uC694";break;case"completed":return null;default:return null}let r=[n];e.head_sha&&r.push(`head ${e.head_sha}`),e.base_sha&&r.push(`base ${e.base_sha}`),(e.failure_stage||e.failure_reason)&&r.push(`${e.failure_stage||"failure"} \xB7 ${e.failure_reason||"\uC6D0\uC778 \uBBF8\uC0C1"}`);let o=Pv(e.terminal_reason);o&&r.push(`\uC6D0 \uC0AC\uC720: ${o}`);let s=e.phase==="needs_human"&&!o?Tr(e.terminal_reason):null;s&&r.push(e.failure_stage?`${e.failure_stage} \xB7 ${s}`:s);for(let i of t?t.details:[])r.push(i);return e.active_attempt_id&&r.push(`attempt ${e.active_attempt_id}`),e.evidence&&r.push(e.evidence),e.log_path&&r.push(e.log_path),{badge:n,title:r.join(`
`),alert:e.phase==="needs_human",lock_actions:!Iv.has(e.phase)}}function qv(e){if(!e||typeof e!="object")return[];let t=e.blocking_codes;return Array.isArray(t)?t.filter(n=>typeof n=="string"&&n.length>0):[]}function Fv(e){let t=e.queue_failure?`\uBA38\uC9C0 \uC2E4\uD328 \uC6D0\uBB38: ${e.queue_failure}`:e.auto_skip?`\uC790\uB3D9 \uC81C\uC678 \uC6D0\uBB38: ${e.auto_skip}`:"",n=(s,i={})=>{let l=[i.title||"",t].filter(Boolean);return{label:s,title:l.join(`
`),live:i.live===!0,alert:i.alert===!0}};if(e.continuation_required)return n("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694",{alert:!0});if(e.queueing)return e.queueing==="cleanup"?n("\uC815\uB9AC \uC7AC\uAC1C \uC694\uCCAD \uC911",{title:"\uC11C\uBC84 \uC751\uB2F5\uC744 \uAE30\uB2E4\uB9AC\uB294 \uC911\uC785\uB2C8\uB2E4",live:!0}):n("\uD050 \uB4F1\uB85D \uC911",{title:"\uBA38\uC9C0 \uD050\uC5D0 \uB123\uB294 \uC911 \u2014 \uC11C\uBC84 \uC751\uB2F5\uC744 \uAE30\uB2E4\uB9BD\uB2C8\uB2E4",live:!0});if(e.merge_step)return e.gate?.tier==="merged"?n("\uBA38\uC9C0\uB428",{title:e.merge_step.label,alert:e.merge_step.failed===!0}):n("\uBA38\uC9C0 \uC911",{title:e.merge_step.label,live:!0});if(e.conflict_badge)return n(e.conflict_badge,{live:e.conflict_live===!0});if(e.auto_resolution)return n(e.auto_resolution.label,{title:e.auto_resolution.details.join(`
`),live:e.auto_resolution.live===!0});if(e.recovery?.lock_actions)return n(e.recovery.badge,{title:e.recovery.title,live:!0});if(e.cleanup_failed)return n(e.cleanup_label?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${e.cleanup_label}`:"\uC815\uB9AC \uBA48\uCDA4",{title:e.cleanup_failed.reason||"",alert:!0});if(e.base_exception)return n("\uB2E4\uB978 base \uB300\uC0C1",{title:e.base_exception,alert:!0});let r=qv(e.receipt_check),o=e.conflicting||e.gate?.reason==="base_behind"||r.length>0;if(e.auto_pending&&o)return n("\uD655\uC778 \uC911",{title:"\uBA38\uC9C0 \uD050\uAC00 \uC790\uB3D9\uC73C\uB85C \uCC98\uB9AC \uC911 \u2014 \uB2E4\uC74C \uAD00\uCE21\uC744 \uAE30\uB2E4\uB9BD\uB2C8\uB2E4",live:!0});if(e.conflicting)return n("\uCDA9\uB3CC \uD574\uACB0 \uD544\uC694",{alert:!0});if(e.gate?.reason==="base_behind")return n("base \uAC31\uC2E0 \uD544\uC694",{alert:!0});if(kl.has(e.gate?.reason)){let s=e.gate.reason==="review_receipt_stale"?"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC774 \uD604\uC7AC head\uC758 \uC870\uC0C1\uC774 \uC544\uB2D9\uB2C8\uB2E4 \u2014 \uD788\uC2A4\uD1A0\uB9AC \uC7AC\uC791\uC131\xB7\uBE0C\uB79C\uCE58 \uB9AC\uC14B \uBCF5\uAD6C \uACBD\uB85C\uC785\uB2C8\uB2E4. [\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0]\uAC00 \uC774 \uBCF4\uB958\uC758 \uCD9C\uAD6C\uC785\uB2C8\uB2E4":e.gate.reason==="review_receipt_invalid"?"\uB9AC\uBDF0 \uC601\uC218\uC99D \uAE30\uB85D\uC774 \uC131\uB9BD\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4 \u2014 [\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0]\uAC00 \uC774 \uBCF4\uB958\uC758 \uCD9C\uAD6C\uC785\uB2C8\uB2E4":e.gate.reason==="review_receipt_undetermined"?"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC758 ancestry probe\uB97C \uC644\uB8CC\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 \u2014 [\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0]\uAC00 \uC774 \uBCF4\uB958\uC758 \uCD9C\uAD6C\uC785\uB2C8\uB2E4":"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 [\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0]\uAC00 \uC774 \uBCF4\uB958\uC758 \uCD9C\uAD6C\uC785\uB2C8\uB2E4";if(e.review_session?.active===!0)return n(e.review_session.origin==="auto"?"\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694 \xB7 \uC790\uB3D9 \uB9AC\uBDF0 \uC138\uC158 \uC2E4\uD589 \uC911":"\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694 \xB7 \uB9AC\uBDF0 \uC138\uC158 \uC2E4\uD589 \uC911",{title:`${s}
\uB9AC\uBDF0 \uC138\uC158\uC774 \uC2E4\uD589 \uC911\uC785\uB2C8\uB2E4 \u2014 \uB05D\uB098\uBA74 \uC601\uC218\uC99D\uC744 \uB2E4\uC2DC \uD310\uC815\uD569\uB2C8\uB2E4`,live:!0});if(e.auto_review_wait==="slot")return n("\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694 \xB7 \uB9AC\uBDF0 \uC138\uC158 \uC2AC\uB86F \uB300\uAE30",{title:`${s}
\uC2E4\uD589 \uC2AC\uB86F\uC774 \uBE44\uBA74 \uC790\uB3D9\uC73C\uB85C \uB9AC\uBDF0 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4. \uC9C0\uAE08 \uD074\uB9AD\uD558\uBA74 \uC989\uC2DC \uB744\uC6C1\uB2C8\uB2E4`,live:!0});if(e.review_session?.failure){let i=e.review_dispatch?.state==="exhausted"&&e.review_session.origin==="auto";return n(`\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694 \xB7 ${i?"\uC790\uB3D9 \uB9AC\uBDF0 1\uD68C \uC18C\uC9C4 \xB7 ":""}${Cv(e.review_session.failure)}`,{title:`${s}
\uC9C1\uC804 \uB9AC\uBDF0 \uC138\uC158 \uC885\uB8CC \uC0AC\uC720: ${e.review_session.failure}`,alert:!0})}return n("\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694",{title:s,alert:!0})}return e.gate?.reason==="spec_id_missing"?n("\uC2A4\uD399 ID \uB204\uB77D",{title:"native spec_id \uBBF8\uAE30\uB85D \u2014 bd update --spec-id \uD544\uC694",alert:!0}):r.length>0?n(`\uC601\uC218\uC99D \uD655\uC778 \uD544\uC694 \xB7 ${r[0]}`,{title:`\uC131\uB9BD\uD558\uC9C0 \uC54A\uB294 \uC2E4\uD589 \uC601\uC218\uC99D \u2014 ${r.join(", ")}`,alert:!0}):e.recovery?n(e.recovery.badge,{title:e.recovery.title,alert:!0}):e.gate?.tier==="verify"&&e.gate.gate_badge==="\uAC80\uC99D \uC2E4\uD328"?n("\uAC80\uC99D \uC2E4\uD328",{title:e.gate.reason||"",alert:!0}):e.queue_failure?n(`\uBA38\uC9C0 \uC2E4\uD328 \u2014 ${Cf(e.queue_failure)}`,{title:e.queue_failure,alert:!0}):e.auto_skip?n(`\uC790\uB3D9 \uC81C\uC678 \u2014 ${Cf(e.auto_skip)}`,{title:e.auto_skip,alert:!0}):e.queued&&!e.queue_active?n(`\uBA38\uC9C0 \uB300\uAE30 #${e.queue_position}`):e.gate?.enabled===!0?n("\uBA38\uC9C0 \uAC00\uB2A5"):e.gate?.tier==="merged"?n("\uBA38\uC9C0\uB428"):e.gate?.tier==="closed_unmerged"?n("\uB2EB\uD798",{alert:!0}):e.activity?n("\uD655\uC778 \uC911",{live:!0}):e.gate?.tier==="undecidable"||e.gate?.reason==="mergeability_unknown"?n("\uC0C1\uD0DC \uD655\uC778 \uC2E4\uD328",{title:e.gate.reason||"",alert:!0}):e.gate?.tier==="unobserved"||e.gate?.tier==="verify"||e.gate?.gate_badge==="\uAD00\uCE21 \uB300\uAE30"?n("\uD655\uC778 \uC911"):e.gate?.gate_badge?n(e.gate.gate_badge,{title:e.gate.reason||"",alert:e.gate.enabled!==!0}):null}function jv(e,t,n,r,o=null,s=null,i=null,l=!1,a=null,u=!0,d=null,f=null,b=null,m={},k=!1,R={},j=null,H={active:!1,failure:null,origin:null}){let oe=!!a&&a.position>0,X=!!a?.continuation_action&&a.continuation_action.continuation===null,q=!!a&&a.active===!0,O=a&&a.failure||null,I=Ov(a?a.waiting:null),F=n[e]||null,B=F&&F.gate?F.gate:null,ae=F&&F.pr?F.pr:null,N=Lv(a?a.resolution:null),W=Dv(b),Z=Nv(b,W),ee=a&&a.authority||null,Se=a&&a.review_dispatch||null,ge=a?.hold?.auto_review_wait==="slot"?"slot":null,ue=!!b&&typeof b=="object"&&Mv.has(b.phase),P=oe&&!q&&(!ee||ue||ee.source==="automatic"&&!k),we=i==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":N?N.badge:i==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC911":I,xe=!!B&&B.base_badge==="\uCDA9\uB3CC",E=!!B&&B.enabled===!0,J=Lo({bead_id:e,merge_sha:R.merge_sha,cleanup_cursor:R.cleanup_cursor,merge_progress:s&&s.merge_progress?s.merge_progress:null,cleanup_failed:r,repo_operations:R.repo_operations}),Ae=ni(J),_e=s&&!J&&(s.queueing??null)?s.queueing:null,ke=!!r&&["repo_operations","child_sweep","branch_cleanup","parent_close"].includes(r.step)&&!!B&&B.tier==="merged",me=r&&r.step==="repo_operations"&&J?.failed===!0&&(J.step==="deploy"||J.step==="verify")?J.step:null,De=l&&!!r&&!!B&&B.tier==="merged",ot=P&&(E||xe||B?.reason==="base_behind"||kl.has(B?.reason)||ke||De),Ye=kl.has(B?.reason),M=l&&xe&&u===!1,se=Vn(m,e,{external:l,merge_active:q||J?.step==="merge",merge_queued:oe,conflict_active:!!i,cleanup_active:Ae,merged:!!r||B?.tier==="merged"}),le=!!se.operation,pe=oe&&!O&&!X&&!ke&&!(Z&&Z.lock_actions),he=Fv({auto_pending:pe,continuation_required:X,queueing:_e,merge_step:J,conflict_badge:we,conflict_live:N?.live===!0||i==="running",auto_resolution:W,recovery:Z,cleanup_failed:r,cleanup_label:r?$r(r.step):null,base_exception:f,conflicting:xe,gate:B,receipt_check:F&&F.receipt_check?F.receipt_check:null,queue_failure:O,auto_skip:d,queued:oe,queue_active:q,queue_position:a?a.position:0,review_session:H,review_dispatch:Se,auto_review_wait:ge,activity:we?null:s&&s.activity||null}),ce=he?.live===!0&&he.title?c`<span title=${he.title}>${he.label}</span>`:he?.label||null;return{id:e,title:l?c`${t}<span class="muted"> · 세션</span>`:t,reason:r&&J?.active!==!0?ti(r.step):"PR \uB300\uAE30",draggable:!1,done:!0,lane:"pr_wait",...j?{dependency_chips:j}:{},external:l,pr_number:ae&&typeof ae.number=="number"?ae.number:null,pr_url:ae&&typeof ae.url=="string"?ae.url:"",completion_badge:he?.live!==!0&&he?.title?he.label:null,completion_title:he?.title||"",...b?.phase==="needs_human"&&typeof b.log_path=="string"&&b.log_path.length>0?{log_path:b.log_path}:{},badges:ce?[ce]:[],live_badge:he?.live===!0?ce:null,usage:o,alert:he?.alert===!0,merge_action:B?.tier==="merged"&&!ke&&!De?!1:!oe||X||P||Ye,cancel_action:oe&&!X,cancel_enabled:!q&&!(Z&&Z.lock_actions),cancel_title:Z&&Z.lock_actions?`${Z.badge} \u2014 \uC911\uB2E8\uD558\uB824\uBA74 \uC0C1\uB2E8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8\uC744 \uC0AC\uC6A9\uD558\uC138\uC694`:q?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"\uBA38\uC9C0 \uD050\uC5D0\uC11C \uC774 \uD56D\uBAA9\uC744 \uBE8D\uB2C8\uB2E4 (\uB2E4\uC2DC [\uBA38\uC9C0]\uB85C \uB123\uC744 \uC218 \uC788\uC2B5\uB2C8\uB2E4)",discard:se,discard_action:se.action,merge_step:J,discard_enabled:se.enabled,discard_title:se.title,merge_enabled:!J&&!_e&&!i&&!le&&!f&&!(Z&&Z.lock_actions)&&!M&&H.active!==!0&&(E||xe||B?.reason==="base_behind"||Ye||ke||De||ot||ue&&!q),merge_label:X?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":ke||De?me==="deploy"?"\uBC30\uD3EC \uC7AC\uC2DC\uB3C4 \uD6C4 \uC815\uB9AC":me==="verify"?"\uAC80\uC99D \uC7AC\uC2DC\uB3C4 \uD6C4 \uC815\uB9AC":"\uC815\uB9AC \uC7AC\uAC1C":xe&&!J&&!ke?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":B?.reason==="base_behind"?"base \uAC31\uC2E0 \uD6C4 \uBA38\uC9C0":Ye?"\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0":P?"\uB2E4\uC2DC \uBA38\uC9C0":void 0,merge_title:le?se.error?`\uD3D0\uAE30 \uC2E4\uD328: ${se.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${se.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:X?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":_e?"\uC694\uCCAD\uC744 \uBCF4\uB0B4\uB294 \uC911 \u2014 \uC11C\uBC84 \uC751\uB2F5\uC744 \uAE30\uB2E4\uB9BD\uB2C8\uB2E4":J?`\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 ${J.label}`:me?`\uBA38\uC9C0 \uC644\uB8CC \u2014 ${me==="deploy"?"\uBC30\uD3EC":"\uAC80\uC99D"} \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD574 \uC815\uB9AC\uAC00 \uBA48\uCDC4\uC2B5\uB2C8\uB2E4. \uD074\uB9AD\uD558\uBA74 \uC800\uC7A5\uC18C \uC791\uC5C5\uBD80\uD130 \uC815\uB9AC\uB97C \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4`:De?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD569\uB2C8\uB2E4":M?"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uC9C1\uC811 \uD574\uC18C\uD558\uC138\uC694":i==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC2E4\uD589 \uC911 \u2014 \uC644\uB8CC \uD6C4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":i==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC77C\uC2DC\uC815\uC9C0 \u2014 \uC7AC\uAC1C \uD6C4 \uC644\uB8CC\uB418\uBA74 \uBA38\uC9C0\uD558\uC138\uC694":ke?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uC7AC\uAC1C\uD569\uB2C8\uB2E4":xe?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":B?.reason==="base_behind"?"base\uB97C \uC790\uB3D9 \uAC31\uC2E0\uD55C \uB4A4 \uBA38\uC9C0\uD569\uB2C8\uB2E4":H.active===!0?H.origin==="auto"?"\uC790\uB3D9 \uB9AC\uBDF0 \uC138\uC158 \uC2E4\uD589 \uC911 \u2014 \uB05D\uB098\uBA74 \uC601\uC218\uC99D\uC744 \uB2E4\uC2DC \uD310\uC815\uD569\uB2C8\uB2E4":"\uB9AC\uBDF0 \uC138\uC158 \uC2E4\uD589 \uC911 \u2014 \uB05D\uB098\uBA74 \uC601\uC218\uC99D\uC744 \uB2E4\uC2DC \uD310\uC815\uD569\uB2C8\uB2E4":B?.reason==="review_receipt_missing"?"\uB9AC\uBDF0 \uC601\uC218\uC99D \uC5C6\uC74C \u2014 \uBA38\uC9C0 \uAC8C\uC774\uD2B8 \uBCF4\uB958\uC785\uB2C8\uB2E4. \uD074\uB9AD\uD558\uBA74 \uAE30\uB85D\uB41C \uC138\uC158\uC744 \uC774\uC5B4 \uB9AC\uBDF0\uB9CC \uC218\uD589\uC2DC\uD0A4\uACE0, \uC601\uC218\uC99D\uC774 \uCD5C\uC885 head\uC5D0 \uC720\uD6A8\uD574\uC9C0\uBA74 \uD050\uAC00 \uBA38\uC9C0\uD569\uB2C8\uB2E4":B?.reason==="review_receipt_stale"?"head \uC7AC\uC791\uC131\uB428(\uC601\uC218\uC99D\uC774 \uD604\uC7AC head\uC758 \uC870\uC0C1\uC774 \uC544\uB2D8) \u2014 \uBA38\uC9C0 \uAC8C\uC774\uD2B8 \uBCF4\uB958\uC785\uB2C8\uB2E4. \uD074\uB9AD\uD558\uBA74 \uAE30\uB85D\uB41C \uC138\uC158\uC744 \uC774\uC5B4 \uCD5C\uC885 head\uB97C \uB2E4\uC2DC \uB9AC\uBDF0\uC2DC\uD0A4\uACE0, \uC601\uC218\uC99D\uC774 \uC720\uD6A8\uD574\uC9C0\uBA74 \uD050\uAC00 \uBA38\uC9C0\uD569\uB2C8\uB2E4":B?.reason==="review_receipt_invalid"?"\uB9AC\uBDF0 \uC601\uC218\uC99D \uAE30\uB85D\uC774 \uC131\uB9BD\uD558\uC9C0 \uC54A\uC74C \u2014 \uBA38\uC9C0 \uAC8C\uC774\uD2B8 \uBCF4\uB958\uC785\uB2C8\uB2E4. \uD074\uB9AD\uD558\uBA74 \uAE30\uB85D\uB41C \uC138\uC158\uC744 \uC774\uC5B4 \uCD5C\uC885 head\uB97C \uB2E4\uC2DC \uB9AC\uBDF0\uC2DC\uD0A4\uACE0, \uC601\uC218\uC99D\uC774 \uC720\uD6A8\uD574\uC9C0\uBA74 \uD050\uAC00 \uBA38\uC9C0\uD569\uB2C8\uB2E4":B?.reason==="review_receipt_undetermined"?"\uB9AC\uBDF0 \uC601\uC218\uC99D ancestry probe \uBBF8\uC644\uB8CC \u2014 \uBA38\uC9C0 \uAC8C\uC774\uD2B8 \uBCF4\uB958\uC785\uB2C8\uB2E4. \uD074\uB9AD\uD558\uBA74 \uAE30\uB85D\uB41C \uC138\uC158\uC744 \uC774\uC5B4 \uCD5C\uC885 head\uB97C \uB2E4\uC2DC \uB9AC\uBDF0\uC2DC\uD0A4\uACE0, \uC0C8 \uC601\uC218\uC99D\uC774 \uCD5C\uC885 head\uC5D0 \uC720\uD6A8\uD574\uC9C0\uBA74 \uD050\uAC00 \uBA38\uC9C0\uD569\uB2C8\uB2E4":B?.reason==="spec_id_missing"?"native spec_id \uBBF8\uAE30\uB85D \u2014 bd update --spec-id\uB85C \uAE30\uB85D\uD55C \uB4A4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":E?`\uBA38\uC9C0 (${B.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4 (\uCC28\uB840\uAC00 \uB418\uBA74 \uB2E4\uC2DC \uD655\uC778)`:B&&B.tier==="merged"?"\uBA38\uC9C0\uB428 \u2014 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC \uC9C4\uD589 \uC911":`\uBA38\uC9C0 \uBD88\uAC00: ${B&&B.reason||"\uAD00\uCE21 \uB300\uAE30"}`}}function $l(e,t={}){let{transport:n,issueStores:r,queueStore:o,sessionLogStore:s,gotoIssue:i,getWorkspacePath:l,switchWorkspace:a,openDoc:u,doneRange:d,onDoneRangeChange:f}=t,b=r?qr(r):null,m=xv(),k=null,R=null,j=Gr(()=>ne()),H=new Map,oe=new Map,X=sf(),q=yl(X)===null,O=d?Ln(d):Ev();function I(){let g=Lr.find(h=>h.value===O);return g?g.label:"\uC624\uB298"}let F=Ti("beads-ui.worker.lane-collapsed"),B=!1,ae=new Set,N=new Set,W=new Set,Z=new Set,ee=new Set,Se=null,ge=[],ue=Sf({queueStore:o,issueStores:r,transport:n,getWorkspacePath:l,onInvalidate:()=>ne()});function P(){ue.refreshSessionDefaults()}let we=document.createElement("div");we.className="worker-console";let xe=document.createElement("div");xe.className="worker-top";let E=document.createElement("div");E.className="worker-drawer-overlay",E.hidden=!0;let J=document.createElement("div");J.className="worker-drawer-overlay__backdrop";let Ae=document.createElement("div");Ae.className="worker-drawer-host";let _e=document.createElement("div");_e.className="worker-drawer-host",_e.hidden=!0,E.append(J,Ae,_e);let ke=document.createElement("div");ke.className="worker-lanes-host",we.append(xe,E,ke),e.appendChild(we);let me=ar(null,null),De=[],ot=Ri({transport:n,console_el:we,getLanes:()=>me,getWorkspaces:()=>De,getCrossLanes:()=>null,reproject:()=>({lanes:T(),raw_lanes:null}),onCorrection:()=>{},showToast:be,requestRender:()=>ne(),adoptQueue:(g,h)=>{o&&o.set(h)},onDragBegin:()=>{k=null}}),Ye=null,M=so(Ae,{transport:n,sessionLogStore:s,onClose:()=>{Ye=null,E.hidden=!0,ne()}}),se=kf(_e,{onClose:()=>{_e.hidden=!0,E.hidden=!0,ne()}}),le=_f({getWorkspacePath:l||(()=>"")}),pe=l&&l()||"",he=gf({queueStore:o,transport:n,onChanged:()=>ne(),onOpenScript:(g,h)=>{le.open(g,h)}});function ce(){return o&&o.get()||{revision:0,auto_advance:!1,auto_merge:!1,slots:qi,queue:[],serial_lanes:[],serial_lane_count:0,pr_wait:[],done:[]}}function Fe(){let g=ce(),h=typeof g.serial_lane_count=="number"&&Number.isInteger(g.serial_lane_count)&&g.serial_lane_count>0?Math.min(g.serial_lane_count,5):0,A=Array.isArray(g.serial_lanes)?g.serial_lanes:[],re=[];for(let Te of A){if(re.length>=h)break;!Te||typeof Te.id!="string"||!/^s[1-5]$/.test(Te.id)||!Array.isArray(Te.entries)||re.push({id:Te.id,label:`\uC9C1\uB82C ${Te.id.slice(1)}`,count:Te.entries.length})}return re.length===0?null:[{id:"parallel",label:"\uBCD1\uB82C",count:(Array.isArray(g.queue)?g.queue:[]).length},...re]}function Ge(g){if(!k||!g.some(A=>A.id===k))return null;let h=Fe();return h?{bead_id:k,lanes:h}:null}function Ze(){return l&&l()||""}async function Pe(g,h){await ot.sendOp({type:"worker-queue-place",payload:{bead_id:g,...h==="parallel"?{}:{lane:h}},root_dir:Ze()},g)}function Q(){let g=ce();return typeof g.revision=="number"?g.revision:0}function U(g){g&&g.queue&&o&&o.set(g.queue)}async function Ne(g){if(!n||!g)return;let h=await n("worker-attempt-pause",{attempt_id:g});h&&h.paused===!1&&h.reason&&be(`\uC77C\uC2DC\uC815\uC9C0 \uAC70\uBD80: ${h.reason}`,"error",2400)}async function ut(g,h="session"){if(!n||!g)return;let A=await Ur();if(A===null)return;let re=async(Te={})=>await n("worker-attempt-resume",{attempt_id:g,expected_revision:Q(),...A!==""?{instructions:A}:{},...Te}),fe=await re();U(fe),fe&&fe.conflict&&(fe=await re(),U(fe)),fe=await zn(fe,(Te,Ke)=>re({continuation:Te,decision_token:Ke}),{onResult:U,refresh:()=>re()}),fe&&fe.resumed===!1&&!fe.conflict&&fe.reason&&be(`${h==="settlement"?"\uC815\uC0B0 \uC7AC\uAC1C":"\uC774\uC5B4\uD558\uAE30"} \uAC70\uBD80: ${fe.reason}`,"error",2400)}async function et(g,h,A=!0){if(!n)return null;let re=n,fe=await re(g,{...h,expected_revision:Q()});return U(fe),fe&&fe.conflict&&A&&(fe=await re(g,{...h,expected_revision:Q()}),U(fe)),fe}async function v(g){if(!n||!g)return;let h=ce().merge_queue?.find(re=>re.bead_id===g)?.continuation_action;if(h?.mismatch&&h.continuation===null){await je(g,h.mismatch);return}ae.add(g),ne();let A;try{A=await et("worker-merge-queue-add",{bead_id:g})}catch{be("\uBA38\uC9C0 \uD074\uB9AD\uC774 \uC11C\uBC84\uC5D0 \uC804\uB2EC\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4(\uC5F0\uACB0 \uBB38\uC81C) \u2014 \uC5F0\uACB0 \uBCF5\uAD6C \uD6C4 \uB2E4\uC2DC \uB20C\uB7EC\uC8FC\uC138\uC694","error",3200);return}finally{ae.delete(g),ne()}if(!(!A||A.applied)){if(A.conflict){be("\uD050\uAC00 \uBC14\uB00C\uC5B4 \uBA38\uC9C0 \uD074\uB9AD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uB20C\uB7EC\uC8FC\uC138\uC694","error",2400);return}be(Rv(A.reason),"error",2400)}}async function z(g){if(!(!n||!g||N.has(g))){N.add(g),ne();try{let h=await n("worker-cleanup-retry",{bead_id:g,expected_revision:Q()});U(h),h&&!h.retried&&!h.conflict&&h.reason&&be(`\uC815\uB9AC \uC7AC\uAC1C \uAC70\uBD80: ${h.reason}`,"error",2400)}finally{N.delete(g),ne()}}}async function Ee(g,h){let A=ce().hold;if(!n||!A||typeof A.since!="number")return;let re=await n(g,{since:A.since});U(re),re&&re.ok===!1&&be(`${h}: ${re.reason==="hold_changed"?"\uD050 \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uD655\uC778\uD558\uC138\uC694":re.reason||""}`,"error",2800)}async function Ce(g,h){if(!n||!g||!h)return;let A=await n("worker-parked-retry",{bead_id:g,attempt_id:h});U(A),A&&A.ok===!1&&be(`\uC7AC\uC2DC\uB3C4 \uAC70\uBD80: ${A.reason==="not_latest"?"\uC774 bead\uC5D0 \uB354 \uC0C8\uB85C\uC6B4 \uC2DC\uB3C4\uAC00 \uC788\uC2B5\uB2C8\uB2E4":A.reason||""}`,"error",2800)}async function je(g,h){let A=await zn({continuation_mismatch:h},(fe,Te)=>et("worker-merge-queue-add",{bead_id:g,continuation:fe,decision_token:Te},!1)),re=A?.queue?.merge_queue?.find(fe=>fe.bead_id===g)?.continuation_action;if(A?.applied!==!0&&re?.continuation===null&&re.mismatch){await je(g,re.mismatch);return}A&&A.applied===!1&&!A.conflict&&be("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD\uC774 \uCD5C\uC2E0 \uC0C1\uD0DC\uC640 \uC77C\uCE58\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4","error",2800)}async function Ve(g){if(!n)return;let h=await et("worker-merge-auto-toggle",{on:g});!h||h.conflict||be(g?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0 \u2014 \uB300\uAE30 \uD56D\uBAA9\uC744 \uBE44\uC6E0\uC2B5\uB2C8\uB2E4",g?"success":"info",2400)}async function pt(g){if(!n||!g)return;let h=await et("worker-merge-queue-remove",{bead_id:g});h&&!h.conflict&&!h.applied&&h.reason==="merge_active"&&be("\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error",2400)}async function kt(){await et("worker-merge-queue-remove",{all:!0})}async function Lt(g,h=null,A="unmerged",re=null){if(!n||!g)return;let fe=Co(g,A);if(!(!!re||typeof globalThis.confirm!="function"||globalThis.confirm(fe)))return;let Ke=await n("worker-discard",{bead_id:g,...h?{attempt_id:h}:{},...re?{operation_id:re}:{},expected_revision:Q()});if(U(Ke),Ke&&Ke.conflict&&(Ke=await n("worker-discard",{bead_id:g,...h?{attempt_id:h}:{},...re?{operation_id:re}:{},expected_revision:Q()}),U(Ke)),Ke&&Ke.discarded===!0){be(Ws(Ke),"success",5e3);return}if(Ke&&Ke.reason){be(`\uD3D0\uAE30 \uC2E4\uD328: ${Ke.reason}`,"error",2800);return}if(Ke&&Ke.accepted&&Ke.pending==="merged_revert"){be("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success",2400);return}if(Ke&&Ke.accepted&&!Ke.discarded){be(`\uD3D0\uAE30 \uC9C4\uD589: ${Ke.phase||"\uBC31\uC5C5 \uC911"}`,"success",2400);return}Ke&&!Ke.conflict&&be("\uD3D0\uAE30 \uAC70\uBD80: unknown","error",2800)}async function $t(g,h,A){if(!(!n||!h||!A||Z.has(h))){Z.add(h),ne();try{let re=await n(g,{bead_id:h,action_id:A,expected_revision:Q()});U(re),re?.conflict?be("\uC774\uC804 \uC791\uC5C5 \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694.","error",2800):!re?.ok&&re?.reason&&be(`\uC774\uC804 \uC791\uC5C5 \uCC98\uB9AC \uAC70\uBD80: ${String(re.reason)}`,"error",2800)}finally{Z.delete(h),ne()}}}async function _t(g,h){if(!n||!h||W.has(h))return;W.add(h),ne();let A;try{let re=async(fe={})=>await n(g,{bead_id:h,expected_revision:Q(),...fe});A=await re(),U(A),A&&A.conflict&&(A=await n(g,{bead_id:h,expected_revision:Q()}),U(A)),g==="worker-revise-fix"&&(A=await zn(A,(fe,Te)=>re({continuation:fe,decision_token:Te}),{onResult:U,refresh:()=>re()}))}finally{W.delete(h),ne()}if(!(!A||A.conflict)){if(A.ok){be(g==="worker-revise-fix"?"\uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4 \u2014 \uC218\uB9AC \uD6C4 \uAD6C\uD604\uC774 \uC7AC\uB514\uC2A4\uD328\uCE58\uB429\uB2C8\uB2E4":"\uB378\uD0C0 \uC2B9\uC778 \uC644\uB8CC \u2014 \uC601\uC218\uC99D \uAC31\uC2E0 + \uD30C\uD0B9 \uD574\uC81C","success",2800);return}be(`\uCC98\uBD84 \uAC70\uBD80: ${A.reason||""}`,"error",3e3)}}async function Be(g){if(!n)return;let h=await n("worker-automation-toggle",{on:g,expected_revision:Q()});U(h),h&&h.conflict&&await n("worker-automation-toggle",{on:g,expected_revision:Q()}).then(U)}async function L(g){if(!n||!g)return;let h=await n("worker-repo-operation-dismiss",{operation_id:g});U(h),h&&h.ok===!1&&be(`\uAE30\uB85D \uB2EB\uAE30 \uAC70\uBD80: ${h.reason||""}`,"error",3e3)}async function te(g){if(!n||!Number.isFinite(g))return;let h=Math.max(qi,Math.floor(g)),A=await n("worker-queue-set-slots",{slots:h,expected_revision:Q()});U(A),A&&A.conflict&&await n("worker-queue-set-slots",{slots:h,expected_revision:Q()}).then(U)}async function ye(g){if(!n||!Number.isInteger(g)||g<1||g>Ef)return;let h=ce(),A=(Array.isArray(h.serial_lanes)?h.serial_lanes:[]).slice(g).reduce((Te,Ke)=>Te+(Array.isArray(Ke?.entries)?Ke.entries.length:0),0),re=()=>({count:g,expected_revision:Q()}),fe=await n("worker-queue-set-serial-lane-count",re());U(fe),fe&&fe.conflict&&(fe=await n("worker-queue-set-serial-lane-count",re()),U(fe)),fe&&fe.applied&&A>0&&be(`\uC9C1\uB82C \uB808\uC778 \uCD95\uC18C \u2014 ${A}\uAC1C \uD56D\uBAA9\uC774 \uBCD1\uB82C \uB300\uAE30\uB85C \uC774\uB3D9`)}function T(){let g=br(O),h=ue.read({candidate_sort:X,done_since:g});return De=h.workspaces,me=ar(h.workspaces,h.workspaces_state,{done_since:g,candidate_filter:m,candidate_hidden_counts:"per_control",candidate_sort:"as_given",groups:"all"}),me}function K(g){return g.queue_groups[0]||$v}function Ie(g){let h=g.dependency_chips||null,A={...h&&h.released?{released:h.released}:{},...h&&h.dependents?{dependents:h.dependents}:{}},re=H.get(g.id),fe=oe.get(g.id)||null,Te=re&&re.overlaps.length>0?re.overlaps:null,Ke=!!re&&re.scope_missing;return!fe&&!Te&&!Ke&&Object.keys(A).length===0?null:{...A,...fe?{predecessors:fe}:{},...Te?{overlaps:Te}:{},...Ke?{scope_missing:!0}:{}}}function Ue(g){return{...g,workspace_name:"",done_layout:void 0,dependency_chips:Ie(g)||void 0,chip_popover:qe(g)}}function qe(g){return Xs(g,h=>j.isOpen({bead_id:g.id,chip_key:h}))}function tt(){let g=ce(),h=new Map;for(let A of Object.values(pn(g.lane_states))){let re=Array.isArray(A?.corrections)?A.corrections:[];for(let fe of re)fe&&typeof fe.bead_id=="string"&&typeof fe.after=="string"&&h.set(fe.bead_id,fe.after)}return{admission:pn(g.admission),correction_after:h}}function Oe(g,h){let A=Ue(g),re=ku(h.admission[g.id]||null,!!g.discard||Z.has(g.id)),fe=h.correction_after.get(g.id);return{...A,draggable:A.draggable===!0&&!re,stale_work:re,reason:re?"":A.reason,badges:fe?[`\u{1F517} ${fe} \uB4A4 (blocks \uC790\uB3D9)`,...A.badges||[]]:A.badges,revise_enabled:A.revise_enabled===!0&&!W.has(g.id)}}function He(g){let h=tt();return K(g).sublanes.parallel.map(A=>Oe(A,h))}function Je(g){let h=tt();return K(g).sublanes.serial.map(A=>{let re=A.occupants.map(fe=>({id:fe.id,title:fe.title,draggable:!1,lane:A.id,ghost:!0,badges:[fe.badge]}));return{id:A.id,index:A.index+1,raw_length:A.raw_length,ghosts:re,items:A.items.map(fe=>Oe(fe,h)),occupied:A.occupied_by.length>0,badge:A.occupants.length>0?A.occupants[0].badge:"\uB300\uAE30",cycle:A.cycle===!0}})}function bt(g){return g.runnable.map(h=>Ue(h))}function ze(g){return g.done.map(h=>Ue(h))}function xt(g){let h=g.running.filter(A=>A.non_occupying!==!0).map(A=>({...A,bead_id:A.id,attempt_id:A.attempt_id||"",paused:A.run_state==="paused",failed:A.run_state==="failed",parked:A.run_state==="parked",retry_wait:A.run_state==="retry_wait",waiting:A.run_state==="waiting",wait:A.wait||null,status_label:A.run_state==="failed"?A.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328":A.run_state==="parked"?"\uC138\uC158 \uB300\uAE30":A.run_state==="retry_wait"?"\uC7AC\uC2DC\uB3C4 \uB300\uAE30":A.run_state==="waiting"?"\uC120\uD589 \uB300\uAE30":void 0,can_pause:A.can_pause!==!1,workspace_name:"",dependency_chips:Ie(A)||void 0,chip_popover:qe(A),rollup_expanded:ee.has(A.id),failure:A.failure?{...A.failure,open:R===A.attempt_id}:null}));return[...h.filter(A=>A.failed===!0),...h.filter(A=>A.failed!==!0&&A.parked===!0),...h.filter(A=>A.failed!==!0&&A.parked!==!0)]}function qt(g){if(Se&&Se.model===g)return Se.rows;let h=ce(),A=K(g),re=pn(h.attempts),fe=Object.values(re).filter(Kn),Te=new Map;for(let We of fe)Te.set(We.attempt_id,We);let Ke=new Map;for(let We of fe)Ke.set(We.bead_id,We);let vt=new Map;for(let We of[...g.pr_wait,...g.running,...g.queue,...g.runnable,...g.done])vt.has(We.id)||vt.set(We.id,We);let jt=We=>{let Pt=null;for(let bn of fe)!bn||bn.bead_id!==We||Ia(bn,Te)||(Pt===null||(typeof bn.started_at=="number"?bn.started_at:0)>=(typeof Pt.started_at=="number"?Pt.started_at:0))&&(Pt=bn);return Pt&&typeof Pt.target_base=="string"?Pt.target_base:null},Xt=new Map;for(let We of g.running)We.run_state==="failed"||We.conflict_resolution!==!0||(We.run_state!=="paused"?Xt.set(We.id,"running"):Xt.has(We.id)||Xt.set(We.id,"paused"));let gn=pn(h.auto_merge_skips),Pn=new Set(A.merge.auto_excluded),hn=pn(h.pr_observations),Nn=pn(h.pr_activity),wn=pn(h.cleanup_failed),Kt=pn(h.discard_operations),er=pn(h.bead_workflow),qn=pn(h.bead_titles),Fn=h.merge_queue_state||{active:null,failures:{}},jn=A.merge.state.waiting,On=new Map;for(let We of Array.isArray(h.merge_queue)?h.merge_queue:[])We&&typeof We=="object"&&We.bead_id&&On.set(We.bead_id,We);let pr=(Array.isArray(h.pr_wait)?h.pr_wait:[]).map(We=>{let Pt=vt.get(We.bead_id);return{...jv(We.bead_id,Pt?.title||qn[We.bead_id]||We.bead_id,hn,wn[We.bead_id]||null,Gn(re,We.bead_id),Nn[We.bead_id]||(ae.has(We.bead_id)?{activity:null,merge_progress:null,queueing:"merge"}:N.has(We.bead_id)?{activity:null,merge_progress:null,queueing:"cleanup"}:null),Xt.get(We.bead_id)||null,We.external===!0,{position:A.merge.positions.get(We.bead_id)||0,active:Fn.active===We.bead_id,failure:pn(Fn.failures)[We.bead_id]||null,waiting:jn&&jn.bead_id===We.bead_id?jn.reason:null,resolution:A.merge.resolutions.get(We.bead_id),continuation_action:A.merge.continuations.get(We.bead_id),authority:A.merge.authorities.get(We.bead_id)||null,hold:On.get(We.bead_id)?.hold||null,review_dispatch:On.get(We.bead_id)?.review_dispatch||null},We.wt_present!==!1,h.auto_merge===!0&&Pn.has(We.bead_id)?gn[We.bead_id]?.reason||"":null,La(A.declared_base,jt(We.bead_id)),pn(h.completion_status)[We.bead_id]||null,Kt,h.auto_merge===!0,{merge_sha:We.merge_sha,cleanup_cursor:We.cleanup_cursor,repo_operations:A.repo_operations},Pt?Ie(Pt):null,bu(re,We.bead_id)),workflow:er[We.bead_id]||null,priority:Pt?.priority,from_id:Pt?.from_id,...Pt?.created_at===void 0?{}:{created_at:Pt.created_at},...Pt?.updated_at===void 0?{}:{updated_at:Pt.updated_at}}});return Se={model:g,rows:pr},pr}function lt(g){let h=K(g),A=[];for(let Te of g.running)Te.non_occupying!==!0&&A.push({id:Te.id,title:Te.title,location_label:"\uC2E4\uD589\uC911",kind:"running",lane_id:Te.serial_lane_id??null});for(let Te of g.pr_wait)A.push({id:Te.id,title:Te.title,location_label:"PR \uB300\uAE30",kind:"pr_wait",lane_id:null});for(let Te of h.sublanes.serial)Te.items.forEach((Ke,vt)=>{A.push({id:Ke.id,title:Ke.title,location_label:`${Te.id} #${vt+1}`,kind:"serial",lane_id:Te.id})});h.sublanes.parallel.forEach((Te,Ke)=>{A.push({id:Te.id,title:Te.title,location_label:`#${Ke+1}`,kind:"parallel",lane_id:null})});for(let Te of g.runnable)A.push({id:Te.id,title:Te.title,location_label:"\uD6C4\uBCF4",kind:"candidate",lane_id:null,queue_placeable:Te.queue_placeable===!0});let re=ce();H=uf(re.bead_scope,A);let fe=new Map;for(let Te of[...g.running,...g.runnable])Array.isArray(Te.blocked_by)&&Te.blocked_by.length>0&&fe.set(Te.id,Te.blocked_by);for(let[Te,Ke]of Object.entries(pn(re.bead_blocked_by)))Array.isArray(Ke)&&fe.set(Te,Ke.filter(vt=>typeof vt=="string"&&vt.length>0));oe=Ou(fe,A,pn(re.blocker_workspaces))}function Yt(g){let h=g.hold&&typeof g.hold=="object"?g.hold:null;if(!h||h.kind!=="env"&&h.kind!=="systemic")return"";let A=cr(h.cause)||String(h.cause||""),re=Array.isArray(g.lineages)?g.lineages:[];if(h.kind==="env"){let Te=re.map(vt=>vt&&vt.next_at).filter(vt=>typeof vt=="number").sort((vt,jt)=>vt-jt)[0],Ke=typeof Te=="number"?` \xB7 \uB2E4\uC74C ${new Date(Te).toLocaleTimeString("ko-KR",{hour:"2-digit",minute:"2-digit"})}`:"";return c`<div class="worker-hold worker-hold--env" role="status">
        <span class="worker-hold__text"
          >환경 보류: ${A} — 재시도 대기${Ke}</span
        >
        <button
          type="button"
          class="worker-hold__retry"
          title="예약된 재시도를 지금 실행합니다"
        >
          지금 재시도
        </button>
      </div>`}let fe=(Array.isArray(h.bead_ids)?h.bead_ids:[]).filter(Te=>typeof Te=="string"&&Te.length>0);return c`<div class="worker-hold worker-hold--systemic" role="alert">
      <span class="worker-hold__text"
        >${A}${fe.length>0?` \u2014 bead ${fe.join(", ")}`:""}</span
      >
      <button
        type="button"
        class="worker-hold__resume"
        title="정지를 풀고 멈춰 있던 bead를 다시 디스패치합니다"
      >
        재개
      </button>
    </div>`}function St(g){let h=ce(),A=K(g),re=A.sublanes.parallel,fe=re.length>0?re[0].id:"\u2014",Te=c`<button
      type="button"
      class="worker-play${h.auto_advance?" is-active":""}"
    >
      ${h.auto_advance?"\u23F8 \uC790\uB3D9\uD654 \uBA48\uCDA4":"\u25B6 \uC790\uB3D9\uD654"}
    </button>`,Ke=Wt(g),vt=A.over_cap?c`<span
          class="worker-overcap"
          title="수동 재개(▶)는 슬롯 cap을 초과할 수 있습니다 — 자동 진행은 cap을 지킵니다"
          >cap 초과</span
        >`:"",jt=h.auto_advance?0:(Array.isArray(h.queue)?h.queue:[]).filter(Kt=>Kt&&typeof Kt.armed_by_lane=="string"&&Kt.armed_by_lane.length>0).length,Xt=jt>0?c`<span
            class="worker-kpi__chip worker-kpi__chip--armed"
            title="모니터 연결 레인이 발차한 대기 행입니다 — 이 레포의 자동 진행은 꺼진 채입니다"
            >⏸ 자동 진행 꺼짐 · 연결 레인 ${jt}건 진행 중</span
          >`:"",gn=c`<span class="worker-kpi__chip worker-kpi__chip--running"
        >실행 <b>${A.live_count}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--pr"
        >PR 대기 <b>${qt(g).length}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--done"
        >${I()} 완료 <b>${g.done.length}</b></span
      >`,Pn=c`<span
      class="worker-kpi__chip worker-kpi__chip--base"
      title=${A.declared_base?"\uC774 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uC5B8\uD55C target base (docs/agents/repo-ops.toml). \uB514\uC2A4\uD328\uCE58 \uC2DC\uC810\uC758 \uAC80\uC99D\uC740 \uBCC4\uB3C4":"\uC120\uC5B8 \uD30C\uC77C\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 \u2014 target base \uD655\uC778 \uBD88\uAC00"}
      >base ${A.declared_base||"?"}</span
    >`,hn=c`<label class="worker-tgl worker-slots"
        >동시 실행
        <input
          type="number"
          class="worker-slots__input"
          min=${qi}
          step="1"
          .value=${String(A.slots)}
          title="동시에 실행할 세션 수 (최소 1 = 순차 실행)"
      /></label>
      <label
        class="worker-tgl worker-serial-lanes"
        title="고정 직렬 레인 수 (1~5). 축소 시 잘린 레인의 대기 항목은 병렬 대기로 돌아갑니다"
        >직렬 레인
        <select class="worker-serial-lane-count" aria-label="직렬 레인 수">
          ${Array.from({length:Ef},(Kt,er)=>er+1).map(Kt=>c`<option
                value=${String(Kt)}
                ?selected=${A.serial_lane_count===Kt}
              >
                ${Kt}
              </option>`)}
        </select>
      </label> `,Nn=vu(A.repo_operations,A.cleanup_failures),wn=Yt(h);return B?c`<div class="worker-ribbon">
          ${Te} ${Ke}
          <div class="worker-kpi worker-kpi--ribbon">
            ${vt}${Xt}${gn}
          </div>
        </div>
        <div class="worker-ctrl worker-ctrl--mobile">
          <div class="worker-ctrl__ops">${hn}</div>
          <div class="worker-kpi">${Pn}</div>
        </div>
        ${wn}${Nn}${he.template()}`:c`<div class="worker-ctrl">
        <div class="worker-ctrl__ops">${Te}${Ke}${hn}</div>
        <div class="worker-kpi">
          ${vt}${Xt}${gn}${Pn}
          ${(Array.isArray(A.token_total)?A.token_total:A.token_total?[{label:A.token_total,tooltip:`${I()} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}]:[]).map(Kt=>c`<span
                class="worker-kpi__chip worker-kpi__chip--tokens"
                title=${Kt.tooltip}
                >${I()} 완료 · 누적 ${Kt.label}</span
              >`)}
          <span class="worker-kpi__next worker-stat"
            >다음 <b>${fe}</b></span
          >
        </div>
      </div>
      ${wn}${Nn}${he.template()}`}function It(g){let h=g.runnable_hidden;return c`<div class="worker-filter">
      <label class="worker-filter__tgl" title="blocked 이슈 표시 (기본 숨김)">
        <input
          type="checkbox"
          class="worker-filter__blocked"
          .checked=${m.show_blocked}
        />
        🔒 blocked${h.blocked>0?` ${h.blocked}`:""}
      </label>
      <div class="worker-filter__spec" role="group" aria-label="spec 필터">
        ${Sv.map(A=>c`<button
              type="button"
              class="worker-filter__chip${m.spec===A.value?" is-active":""}"
              data-spec=${A.value}
              aria-pressed=${m.spec===A.value?"true":"false"}
            >
              ${A.label}
            </button>`)}
        ${h.spec>0?c`<span class="worker-filter__hidden">숨김 ${h.spec}</span>`:""}
      </div>
    </div>`}function Ut(){let g=q?"custom":yl(X)||"custom";return c`<select
      class="worker-sort"
      aria-label="후보 정렬"
      title="후보 정렬"
      .value=${g}
    >
      ${es.map(h=>c`<option value=${h.id} ?selected=${g===h.id}>
            ${h.label}
          </option>`)}
      <option value="custom" ?selected=${g==="custom"}>
        사용자 지정…
      </option>
    </select>`}function Vt(){let g=ts(X);return c`<div
      class="worker-sort-chain"
      role="group"
      aria-label="후보 정렬 체인"
    >
      ${[0,1,2].map(h=>{let A=g[h];return c`<span class="worker-sort-chain__step">
          <select
            class="worker-sort-chain__key"
            data-step=${h}
            aria-label=${`${h+1}\uCC28 \uC815\uB82C \uD0A4`}
            .value=${A?A.key:""}
          >
            ${h===0?"":c`<option value="" ?selected=${!A}>없음</option>`}
            ${of.map(re=>c`<option
                  value=${re.key}
                  ?selected=${!!A&&A.key===re.key}
                >
                  ${re.label}
                </option>`)}
          </select>
          ${A?c`<button
                type="button"
                class="worker-sort-chain__dir"
                data-step=${h}
                aria-label=${A.dir==="asc"?"\uC624\uB984\uCC28\uC21C":"\uB0B4\uB9BC\uCC28\uC21C"}
                title=${A.dir==="asc"?"\uC624\uB984\uCC28\uC21C":"\uB0B4\uB9BC\uCC28\uC21C"}
              >
                ${A.dir==="asc"?"\u2191":"\u2193"}
              </button>`:""}
        </span>`})}
    </div>`}function Jt(){return c`<div class="worker-done-controls">
      <select
        class="worker-sort worker-done-range"
        aria-label="완료 기간"
        title="완료 기간"
        .value=${O}
      >
        ${Lr.map(g=>c`<option value=${g.value} ?selected=${O===g.value}>
              ${g.label}
            </option>`)}
      </select>
    </div>`}function Wt(g){let h=K(g).merge,A=ce().auto_merge===!0;if(h.running)return c`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop${A?" is-active":""}"
        title=${A?"\uC790\uB3D9 \uBA38\uC9C0\uB97C \uB044\uACE0 \uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)":"\uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)"}
      >
        ${A?"\u23F8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8":"\uC77C\uAD04 \uBA38\uC9C0 \uC911\uB2E8"} ${h.positions.size}
      </button>`;if(A)return c`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop is-active"
        title="자동 머지 켜짐 — 자격이 생기는 PR을 계속 큐에 넣습니다. 클릭하면 끕니다"
      >
        ⏸ 자동 머지
      </button>`;let re=new Set(h.auto_excluded),fe=qt(g).filter(Te=>Te.merge_action&&Te.merge_enabled&&!re.has(Te.id)).length;return c`<button
      type="button"
      class="worker-merge-all"
      title="켜 두면 자격이 생기는 PR을 계속 큐에 넣어 순서대로 충돌 해소·머지합니다"
    >
      ▶ 자동 머지${fe>0?` ${fe}`:""}
    </button>`}function Dt(g){if(!(g.draggable!==!0||g.done===!0))return c`<span class="worker-mini__rowops">
      <button
        type="button"
        class="worker-mini__rowops-remove"
        data-action="queue-remove"
        data-bead-id=${g.id}
        title="대기에서 빼기"
        aria-label="대기에서 빼기"
      >
        ✕
      </button>
    </span>`}function cn(g,h){return c`<div
      data-bead-id=${g.id}
      data-drag-kind=${h.kind}
      data-root-dir=${h.root_dir}
      data-lane-id=${tn(h.lane_id)}
      data-row-index=${h.row_index}
      data-queue-index=${String(g.queue_index??0)}
    >
      ${An(g,{actions:Dt(g)})}
    </div>`}function Mt(g){let h=He(g),A=Ze();return Zs({parallel:{rows:h.map((re,fe)=>cn(re,{kind:"parallel",root_dir:A,row_index:fe})),count:h.length,collapsed:F.isAreaCollapsed("parallel"),drop:{drop:"parallel",root_dir:A}},serial:{lanes:Je(g).map(re=>({id:re.id,title:`\uC9C1\uB82C ${re.index}`,rows:[...re.ghosts.map(fe=>An(fe,{actions:Dt(fe)})),...re.items.map((fe,Te)=>cn(fe,{kind:"repo-serial",root_dir:A,row_index:Te,lane_id:re.id}))],count:re.ghosts.length+re.items.length,empty:re.ghosts.length+re.items.length===0,badge:re.badge,held:re.occupied,cycle:re.cycle,drop:{drop:"repo-serial",root_dir:A,lane_id:re.id,lane_length:String(re.raw_length)}})),collapsed:F.isAreaCollapsed("serial")}})}function Gt(g){return hp(xt(g),Date.now(),Ye)}function Ft(g){return g.running.some(h=>h.kind!=="session"&&h.run_state==="running")}function en(g){let h=K(g),A=bt(g),re=He(g),fe=ze(g),Te=qt(g),Ke=xt(g),vt=Dn({id:"worker-pane-candidate",lane:"candidate",title:"\uD6C4\uBCF4",items:A,src:!0,empty:"\uD6C4\uBCF4 \uC5C6\uC74C",header_control:Ut(),header_row:q?Vt():void 0,controls:It(g),collapsible:!0,collapsed:F.isCollapsed("candidate"),place_menu:Ge(A),onOpenDoc:u?(Xt,gn)=>u(gn):void 0}),jt=Dn({id:"worker-pane-done",lane:"done",title:"\uC644\uB8CC",items:fe,empty:`${I()} \uC644\uB8CC \uC5C6\uC74C`,header_control:Jt(),collapsible:!0,collapsed:F.isCollapsed("done"),preview:B?Array.isArray(h.token_total)?h.token_total.map(Xt=>Xt.label).join(" \xB7 "):h.token_total||Tf(fe):void 0});return B?c`<div class="worker-lanes worker-lanes--mobile">
        ${Js({live:Ft(g),running_body:Ke.length>0?Gt(g):"",pr_wait_rows:Te.map(Xt=>An(Xt)),count:Ke.length+Te.length})}
        ${Dn({id:"worker-pane-queue",lane:"queue",title:"\uB300\uAE30",items:re,count:re.length,collapsible:!0,collapsed:F.isCollapsed("queue"),preview:Tf(re),body:Mt(g)})}
        ${vt} ${jt}
      </div>`:c`<div class="worker-lanes">
      ${vt}
      ${Dn({id:"worker-pane-queue",lane:"queue",title:"\uB300\uAE30",items:re,count:re.length,collapsible:!0,collapsed:F.isCollapsed("queue"),body:Mt(g)})}
      ${Dn({id:"worker-pane-running",lane:"running",title:"\uC2E4\uD589 \uC911",items:Ke,header_control:c`<span class="worker-pane__meta"
          >슬롯 ${h.slots}</span
        >`,live:Ft(g),collapsible:!0,collapsed:F.isCollapsed("running"),body:Gt(g)})}
      ${Dn({id:"worker-pane-pr-wait",lane:"pr_wait",title:"PR \uB300\uAE30",items:Te,empty:"PR \uB300\uAE30 \uC5C6\uC74C",collapsible:!0,collapsed:F.isCollapsed("pr_wait")})}
      ${jt}
    </div>`}function de(g){F.toggle(g),ne()}function C(g){F.toggleArea(g),ne()}function ne(){let g=T();lt(g),st(St(g),xe),st(en(g),ke)}function Le(){let g=!0,h=Ei(A=>{if(B=A,g){g=!1;return}ne()});ge.push(h)}function y(g){m=g,Av(g),ne()}function p(g){if(g==="custom"){q=!0,ne();return}X=Cr(g),vl(X),q=!1,ne()}function _(g){X=Cr({chain:g}),vl(X),ne()}function S(g){O=Ln(g),Tv(O),f?.(O),ne()}function Y(g){let h=g.target?.closest?.(".worker-serial-lane-count");if(h){let jt=Number.parseInt(h.value,10);Number.isFinite(jt)&&ye(jt).then(ne);return}let A=g.target?.closest?.(".worker-filter__blocked");if(A){y({...m,show_blocked:A.checked});return}let re=g.target?.closest?.(".worker-sort-chain__key");if(re){let jt=Number.parseInt(re.getAttribute("data-step")||"",10);Number.isFinite(jt)&&_(af(ts(X),jt,re.value));return}let fe=g.target?.closest?.(".worker-done-range");if(fe){S(fe.value);return}let Te=g.target?.closest?.(".worker-sort");if(Te){p(Te.value);return}let Ke=g.target?.closest?.(".worker-slots__input");if(!Ke)return;let vt=Number.parseInt(Ke.value,10);if(!Number.isFinite(vt)){ne();return}te(vt).then(ne)}function V(g){return g?{runner:g.runner||void 0,model:g.model||void 0,effort:g.effort||void 0,worktree:g.worktree||void 0,status:g.status||void 0,session_id:g.session_id||void 0}:{}}function ie(){let g=K(T()),h=ce().workspace_info,A=h&&typeof h=="object"&&h.repo_ops&&typeof h.repo_ops=="object"?h.repo_ops:null;return{operations:g.repo_operations,cleanup_failures:g.cleanup_failures,repo:l&&l()||"",repo_ops:A}}function $e(){Ye&&M.close(),_e.hidden=!1,E.hidden=!1,se.open(ie()),ne()}function Xe(g){let h=ce(),A=h.attempts?h.attempts[g]:null;Ye=g,se.close(),_e.hidden=!0,E.hidden=!1,M.open({attempt_id:g,meta:V(A)}),ne()}function it(g){let h=ce(),A=(Array.isArray(h.session_active)?h.session_active:[]).find(fe=>fe&&fe.bead_id===g),re=(A&&Array.isArray(A.session_refs)?A.session_refs:[]).find(fe=>fe&&fe.current===!0);re&&(se.close(),_e.hidden=!0,E.hidden=!1,M.open(Wr(re,g,"in_progress")),ne())}function yt(){if(se.isOpen()&&se.refresh(ie()),!Ye)return;let g=ce(),h=g.attempts?g.attempts[Ye]:null;if(h){M.updateMeta(V(h));return}M.close()}function mt(g,h){if(g.length===0||!i)return;let A=l?l():void 0;if(h.length===0||!A||h===A||!a){i(g);return}Promise.resolve(a(h)).then(()=>{i(g)}).catch(()=>{be("\uB808\uD3EC \uC804\uD658\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error",2400)})}function $(g){let h=g.target;if(h?.closest?.(".worker-mini__grip"))return;let A=h?.closest?.(".worker-sort-chain__dir");if(A){let Me=Number.parseInt(A.getAttribute("data-step")||"",10);Number.isFinite(Me)&&_(lf(ts(X),Me));return}let re=h?.closest?.(".worker-dep__open");if(re){mt(re.getAttribute("data-dep-id")||"",re.getAttribute("data-root-dir")||"");return}let fe=h?.closest?.(".judgement-chip");if(fe){let Me=fe.closest("[data-bead-id]"),Et=Me&&Me.getAttribute("data-bead-id")||"",zt=fe.getAttribute("data-chip-key")||"";Et&&zt&&j.toggle({bead_id:Et,chip_key:zt});return}if(h?.closest?.(".chip-popover"))return;if(h?.closest?.(".worker-repo-strip")){$e();return}let Te=h?.closest?.(".worker-repo-op__dismiss");if(Te){L(Te.dataset.operationId||"");return}let Ke=h?.closest?.(".worker-cleanup__resume");if(Ke){let Me=Ke.dataset.beadId;Me&&z(Me);return}if(h?.closest?.(".worker-hold__retry")){Ee("worker-queue-hold-retry-now","\uC9C0\uAE08 \uC7AC\uC2DC\uB3C4 \uAC70\uBD80");return}if(h?.closest?.(".worker-hold__resume")){Ee("worker-queue-hold-resume","\uC7AC\uAC1C \uAC70\uBD80");return}if(h?.closest?.(".worker-play")){Be(!ce().auto_advance);return}let vt=h?.closest?.(".worker-merge-all");if(vt){vt.classList.contains("worker-merge-all--stop")?ce().auto_merge===!0?Ve(!1):kt():Ve(!0);return}let jt=h?.closest?.(".worker-pane__toggle[data-lane]");if(jt){let Me=jt.dataset.lane;(Me==="candidate"||Me==="queue"||Me==="running"||Me==="pr_wait"||Me==="done")&&de(Me);return}let Xt=h?.closest?.(".worker-wait__area-toggle[data-area]");if(Xt){let Me=Xt.dataset.area;(Me==="parallel"||Me==="serial")&&C(Me);return}let gn=h?.closest?.(".worker-card__place-lane");if(gn){let Me=gn.dataset.beadId,Et=gn.dataset.lane;Me&&(Et==="parallel"||/^s[1-5]$/.test(Et||""))&&(k=null,ne(),Pe(Me,Et));return}if(h?.closest?.(".worker-card__place-cancel")){k=null,ne();return}let hn=h?.closest?.(".worker-card__place");if(hn){let Me=hn.dataset.beadId;Me&&!hn.disabled&&(Fe()?(k=Me,ne()):Pe(Me,"parallel"));return}let Nn=h?.closest?.(".worker-filter__chip");if(Nn){let Me=Nn.dataset.spec;(Me==="all"||Me==="with"||Me==="without")&&y({...m,spec:Me});return}let wn=h?.closest?.('[data-action="queue-remove"]');if(wn){let Me=wn.dataset.beadId||"";Me&&ot.sendOp({type:"worker-queue-remove",payload:{bead_id:Me},root_dir:Ze()},Me);return}let Kt=h?.closest?.(".worker-mini__merge");if(Kt){let Me=Kt.dataset.beadId||"";ce().cleanup_failed?.[Me]?z(Me):v(Me);return}let er=h?.closest?.(".worker-mini__merge-cancel");if(er){pt(er.dataset.beadId||"");return}let qn=h?.closest?.(".worker-mini__discard");if(qn){Lt(qn.dataset.beadId||"",qn.dataset.attemptId||null,qn.dataset.discardMode==="merged"?"merged":"unmerged",qn.dataset.operationId||null);return}let Fn=h?.closest?.(".worker-mini__stale-continue");if(Fn){$t("worker-stale-work-continue",Fn.dataset.beadId||"",Fn.dataset.actionId||"");return}let jn=h?.closest?.(".worker-mini__stale-backup");if(jn){$t("worker-stale-work-backup-fresh",jn.dataset.beadId||"",jn.dataset.actionId||"");return}let On=h?.closest?.(".worker-mini__stale-recheck");if(On){$t("worker-stale-work-recheck",On.dataset.beadId||"",On.dataset.actionId||"");return}let pr=h?.closest?.(".worker-mini__revise-fix");if(pr){_t("worker-revise-fix",pr.dataset.beadId||"");return}let We=h?.closest?.(".worker-mini__revise-approve");if(We){_t("worker-revise-approve",We.dataset.beadId||"");return}if(h?.closest?.(".worker-mini__pr"))return;let Pt=h?.closest?.(".rtile__failure-badge");if(Pt){let Me=Pt.dataset.attemptId||"";R=R===Me?null:Me,ne();return}let bn=h?.closest?.(".rtile__attempt-copy");if(bn){let Me=bn.dataset.attemptId||"";Me&&rn(Me).then(Et=>{be(Et?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",Et?"success":"error",1400)});return}if(h?.closest?.(".rtile__parked-retry")){let Me=h?.closest?.(".rtile");Ce(Me?.dataset?.beadId||"",Me?.dataset?.attemptId||"");return}let ao=h?.closest?.(".rtile__discard");if(ao){let Me=h?.closest?.(".rtile"),Et=Me?.dataset?.beadId,zt=Me?.dataset?.attemptId;Et&&Lt(Et,zt||null,ao.dataset.confirmation==="merged"?"merged":"unmerged",ao.dataset.operationId||null);return}if(h?.closest?.(".rtile__pause")){let Et=h?.closest?.(".rtile")?.dataset?.attemptId;Et&&Ne(Et);return}if(h?.closest?.(".rtile__resume")){let Me=h?.closest?.(".rtile__resume"),zt=h?.closest?.(".rtile")?.dataset?.attemptId;zt&&ut(zt,Me?.dataset?.resumeKind==="settlement"?"settlement":"session");return}if(h?.closest?.(".rtile__session")){let Me=h?.closest?.(".rtile"),Et=Me?.dataset?.attemptId;if(Et){Xe(Et);return}let zt=Me?.dataset?.beadId;zt&&it(zt);return}if(h?.closest?.(".rtile__failure-pop"))return;if(h?.closest?.(".worker-drawer-overlay__backdrop")){se.close(),M.close();return}if(h?.closest?.(".worker-drawer-host"))return;let rs=h?.closest?.(".rtile .board-card__roll-toggle");if(rs){let Me=rs.dataset.rollParent;Me&&(ee.has(Me)?ee.delete(Me):ee.add(Me),ne());return}let os=h?.closest?.(".rtile .board-card__roll-child");if(os){let Me=os.dataset.childId;Me&&i&&i(Me);return}let lo=h?.closest?.(".rtile");if(lo){if(h?.closest?.(".rtile__id")){let Et=lo.dataset.beadId;Et&&rn(Et).then(zt=>{zt?be("\uBCF5\uC0AC\uB428","success",1200):be("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}let Me=lo.dataset.beadId;Me&&i&&i(Me);return}let ss=h?.closest?.(".worker-mini, .worker-card");if(ss){let Me=ss.dataset.beadId;if(h?.closest?.('[data-seam="log-path-copy"]'))return;if(h?.closest?.(".worker-mini__id, .worker-card__id")){Me&&rn(Me).then(zt=>{zt?be("\uBCF5\uC0AC\uB428","success",1200):be("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}let Et=h?.closest?.(".ctl-chip--from");if(Et){let zt=Et.dataset.fromId;zt&&i&&i(zt);return}Me&&i&&i(Me)}}ot.attach(e),e.addEventListener("click",$),e.addEventListener("change",Y);function x(g){let h=g.target,A=h&&typeof h.closest=="function"?re=>h.closest(re):()=>null;R&&!A(".rtile__failure-pop, .rtile__failure-badge")&&(R=null,ne())}function Re(g){g.key!=="Escape"||R===null||(R=null,ne())}return document.addEventListener("click",x),document.addEventListener("keydown",Re),j.attach(),ge.push(()=>{document.removeEventListener("click",x),document.removeEventListener("keydown",Re),j.detach()}),Le(),b&&ge.push(b.subscribe(()=>{ue.notifyIssuesChanged(),ne()})),o&&ge.push(o.subscribe(()=>{let g=l&&l()||"";g!==pe&&(pe=g,le.close()),ne(),yt()})),ne(),{load(){ue.ensureSessionDefaults(),ne()},refreshSessionDefaults:P,destroy(){for(let g of ge.splice(0))try{g()}catch{}ot.detach(),e.removeEventListener("click",$),e.removeEventListener("change",Y),ue.destroy();try{M.destroy()}catch{}E.hidden=!0;try{le.destroy()}catch{}st(c``,e)}}}function xl(e){if(!e)return"Unknown";let t=e.split("/").filter(Boolean);return t.length>0?t[t.length-1]:"Unknown"}function Lf(e,t,n,r=async()=>{},o=async()=>{}){let s=Ct("views:workspace-picker"),i=null,l=!1,a=!1,u=!1;async function d(I){let B=I.target.value,N=t.getState().workspace?.current?.path||"";if(B&&B!==N){s("switching workspace to %s",B),l=!0,O();try{await n(B)}catch(W){s("workspace switch failed: %o",W)}finally{l=!1,O()}}}async function f(){let I=t.getState(),F=I.workspace?.current?.path||I.workspace?.available?.[0]?.path||"";if(!(!F||a)){s("git-pulling workspace %s",F),a=!0,O();try{await r(F)}catch(B){s("workspace git pull failed: %o",B)}finally{a=!1,O()}}}function b(I){let F=I.target;F&&e.contains(F)||R()}function m(I){I.key==="Escape"&&R()}function k(){u||(u=!0,document.addEventListener("mousedown",b),document.addEventListener("keydown",m),O())}function R(){u&&(u=!1,document.removeEventListener("mousedown",b),document.removeEventListener("keydown",m),O())}function j(){u?R():k()}async function H(I){let F=I.target,B=F.value,ae=F.checked;s("toggling visibility %s \u2192 %s",B,String(ae));try{await o(B,ae)}catch(N){s("workspace visibility toggle failed: %o",N)}}function oe(I){return I?c`
      <button
        type="button"
        class="workspace-picker__git-pull-button"
        @click=${f}
        ?disabled=${l||a}
        aria-label="Git Pull"
        title="Git Pull"
      >
        <span aria-hidden="true">⬇</span>
      </button>
    `:c``}function X(I,F){return c`
      <div class="workspace-picker__manage">
        <button
          type="button"
          class="workspace-picker__manage-button"
          @click=${j}
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
                ${I.map(B=>c`
                    <label
                      class="workspace-picker__manage-row"
                      title="${B.path}"
                    >
                      <input
                        type="checkbox"
                        class="workspace-picker__manage-checkbox"
                        value="${B.path}"
                        .checked=${!F.has(B.path)}
                        @change=${H}
                      />
                      <span class="workspace-picker__manage-name"
                        >${xl(B.path)}</span
                      >
                    </label>
                  `)}
              </div>
            `:""}
      </div>
    `}function q(){let I=t.getState(),F=I.workspace?.current,B=I.workspace?.available||[],ae=new Set(I.workspace?.hidden||[]),N=F?.path||B[0]?.path||"";if(B.length===0)return c``;let W=B.filter(Z=>!ae.has(Z.path)||Z.path===N);if(W.length<=1){let Z=W[0]||B[0],ee=xl(Z.path);return c`
        <div class="workspace-picker workspace-picker--single">
          <span class="workspace-picker__label" title="${Z.path}"
            >${ee}</span
          >
          ${X(B,ae)}
          ${oe(N)}
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
          ${W.map(Z=>c`
              <option
                value="${Z.path}"
                ?selected=${Z.path===N}
                title="${Z.path}"
              >
                ${xl(Z.path)}
              </option>
            `)}
        </select>
        ${X(B,ae)}
        ${oe(N)}
        ${l||a?c`<span
              class="workspace-picker__loading"
              aria-hidden="true"
            ></span>`:""}
      </div>
    `}function O(){st(q(),e)}return O(),i=t.subscribe(()=>O()),{destroy(){i&&(i(),i=null),document.removeEventListener("mousedown",b),document.removeEventListener("keydown",m),st(c``,e)}}}var If=["update-status","edit-text","update-priority","create-issue","dep-add","dep-remove","update-assignee","update-exec-settings","update-impl-target","get-session-defaults","set-session-defaults","get-workspace-accounts","set-workspace-accounts","update-workflow-meta","label-add","label-remove","subscribe-list","unsubscribe-list","snapshot","upsert","delete","get-comments","add-comment","delete-issue","list-workspaces","set-workspace","set-workspace-visibility","get-workspace","workspace-changed","git-pull-workspace","subscribe-worker-queue","unsubscribe-worker-queue","worker-queue-snapshot","worker-queue-place","worker-queue-reorder","worker-queue-toggle","worker-automation-toggle","worker-repo-ops-opt-out-toggle","worker-repo-operation-dismiss","worker-repo-operation-deploy-run","worker-queue-set-slots","worker-queue-set-serial-lane-count","worker-queue-set-orchestration-defaults","worker-queue-remove","worker-attempt-pause","worker-attempt-stop","worker-attempt-resume","worker-cleanup-retry","worker-parked-retry","worker-queue-hold-resume","worker-queue-hold-retry-now","worker-merge-queue-add","worker-merge-queue-add-all","worker-merge-auto-toggle","worker-merge-queue-remove","worker-discard","worker-stale-work-continue","worker-stale-work-backup-fresh","worker-stale-work-recheck","worker-pr-discard","worker-revise-fix","worker-revise-approve","subscribe-ui-order","unsubscribe-ui-order","ui-order-set","ui-order-snapshot","subscribe-display-policy","unsubscribe-display-policy","display-policy-set","display-policy-snapshot","subscribe-session-log","unsubscribe-session-log","session-log-snapshot","session-log-append","get-attempt-prompt","get-bead-prompt","get-bead-timeline","get-worker-system-prompt","get-session-refs","subscribe-monitor-pipeline","unsubscribe-monitor-pipeline","monitor-pipeline-snapshot","subscribe-impl-presets","unsubscribe-impl-presets","impl-presets-snapshot","impl-preset-create","impl-preset-update","impl-preset-delete","apply-impl-preset","apply-impl-preset-global","monitor-auto-toggle","monitor-lane-create","monitor-lane-update","monitor-lane-confirm","monitor-lane-remove"];function Al(){let e=Date.now().toString(36),t=Math.random().toString(36).slice(2,8);return`${e}-${t}`}function Mf(e,t,n=Al()){return{id:n,type:e,payload:t}}function Df(e={}){let t=Ct("ws"),n={initialMs:e.backoff?.initialMs??1e3,maxMs:e.backoff?.maxMs??3e4,factor:e.backoff?.factor??2,jitterRatio:e.backoff?.jitterRatio??.2},r=()=>e.url&&e.url.length>0?e.url:typeof location<"u"?(location.protocol==="https:"?"wss://":"ws://")+location.host+"/ws":"ws://localhost/ws",o=null,s="closed",i=0,l=null,a=!0,u=new Map,d=[],f=new Map,b=new Set;function m(q){for(let O of Array.from(b))try{O(q)}catch{}}function k(){if(!a||l)return;s="reconnecting",t("ws reconnecting\u2026"),m(s);let q=Math.min(n.maxMs||0,(n.initialMs||0)*Math.pow(n.factor||1,i)),O=(n.jitterRatio||0)*q,I=Math.max(0,Math.round(q+(Math.random()*2-1)*O));t("ws retry in %d ms (attempt %d)",I,i+1),l=setTimeout(()=>{l=null,X()},I)}function R(q){try{o?.send(JSON.stringify(q))}catch(O){t("ws send failed",O)}}function j(){for(s="open",t("ws open"),m(s),i=0;d.length;){let q=d.shift();q&&R(q)}}function H(q){let O;try{O=JSON.parse(String(q.data))}catch{t("ws received non-JSON message");return}if(!O||typeof O.id!="string"||typeof O.type!="string"){t("ws received invalid envelope");return}if(u.has(O.id)){let F=u.get(O.id);u.delete(O.id),O.ok?F?.resolve(O.payload):F?.reject(O.error||new Error("ws error"));return}let I=f.get(O.type);if(I&&I.size>0)for(let F of Array.from(I))try{F(O.payload)}catch(B){t("ws event handler error",B)}else t("ws received unhandled message type: %s",O.type)}function oe(){s="closed",t("ws closed"),m(s);for(let[q,O]of u.entries())O.reject(new Error("ws disconnected")),u.delete(q);i+=1,k()}function X(){if(!a)return;let q=r();try{o=new WebSocket(q),t("ws connecting %s",q),s="connecting",m(s),o.addEventListener("open",j),o.addEventListener("message",H),o.addEventListener("error",()=>{}),o.addEventListener("close",oe)}catch(O){t("ws connect failed %o",O),k()}}return X(),{send(q,O){if(!If.includes(q))return Promise.reject(new Error(`unknown message type: ${q}`));let I=Al(),F=Mf(q,O,I);return t("send %s id=%s",q,I),new Promise((B,ae)=>{u.set(I,{resolve:B,reject:ae,type:q}),o&&o.readyState===o.OPEN?R(F):(t("queue %s id=%s (state=%s)",q,I,s),d.push(F))})},on(q,O){f.has(q)||f.set(q,new Set);let I=f.get(q);return I?.add(O),()=>{I?.delete(O)}},onConnection(q){return b.add(q),()=>{b.delete(q)}},reconnect(){a=!0,l&&(clearTimeout(l),l=null),i=0,X()},close(){a=!1,l&&(clearTimeout(l),l=null);try{o?.close()}catch{}},getState(){return s}}}function Bv(){let e=window.__BDUI_BOOTSTRAP__;return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:null}}}async function Uv(e,t){try{let r=await(await fetch("/api/config")).json();e.setState({config:r})}catch(n){t("config refresh failed",n)}}var Sl=[["tab:board:ready","ready-issues"],["tab:board:blocked","blocked-issues"],["tab:board:in-progress","in-progress-issues"],["tab:board:resolved","resolved-issues"],["tab:board:deferred","deferred-issues"],["tab:board:closed","closed-issues"]],Pf=[["tab:worker:ready","ready-issues"],["tab:worker:blocked","blocked-issues"],["tab:worker:in-progress","in-progress-issues"],["tab:worker:resolved","resolved-issues"],["tab:worker:closed","closed-issues"]],ur="tab:worker:closed",Wv="bdui.worker.done-range",Nf=Ip,qf="worker:queue",Ff="ui:order",jf="ui:display-policy",Bf="exec:presets",dr="tab:board:closed",Uf="beads-ui.board.closed-range";function zv(e){if(!e)return()=>{};function t(r){document.documentElement.style.setProperty("--app-header-h",`${Math.round(r)}px`)}if(t(e.getBoundingClientRect().height),typeof ResizeObserver!="function")return()=>{};let n=new ResizeObserver(r=>{for(let o of r)t(o.contentRect.height+Hv(e))});return n.observe(e),()=>n.disconnect()}function Hv(e){let t=getComputedStyle(e);return[t.paddingTop,t.paddingBottom,t.borderTopWidth,t.borderBottomWidth].reduce((r,o)=>r+(parseFloat(o)||0),0)}function Gv(e){let t=Ct("main");t("bootstrap start"),zv(document.querySelector(".app-header"));let n=c`
    <section id="board-root" class="route board"></section>
    <section id="worker-root" class="route worker" hidden></section>
    <section id="monitor-root" class="route monitor" hidden></section>
    <section id="detail-panel" class="route detail" hidden></section>
  `;st(n,e);let r=document.getElementById("global-nav"),o=document.getElementById("top-nav"),s=document.getElementById("repo-scope"),i=document.getElementById("usage-meter"),l=document.getElementById("board-root"),a=document.getElementById("worker-root"),u=document.getElementById("monitor-root"),d=document.getElementById("detail-panel");if(i&&Jp(i),l&&a&&u&&d){let Ae=function($,x){let Re="Request failed",g="";if($&&typeof $=="object"){let A=$;if(typeof A.message=="string"&&A.message.length>0&&(Re=A.message),typeof A.details=="string")g=A.details;else if(A.details&&typeof A.details=="object")try{g=JSON.stringify(A.details,null,2)}catch{g=""}}else typeof $=="string"&&$.length>0&&(Re=$);let h=x&&x.length>0?`Failed to load ${x}`:"Request failed";J.open(h,Re,g)},Ne=function($){return`${de.getState().workspace.current?.path||""}\0${$}`},ut=function(){he&&(he().catch(()=>{}),he=null),ce=null,Fe=null},v=function($){Ge=$;let x=()=>{Ge!==$||de.getState().selected_id!==$||(Ge=null,et($))};if(!Q){Pe.then(x);return}x()},je=function($,x,Re,g,h){return Re!==Ce[x]?(h().catch(()=>{}),!1):($.set(g,h),!0)},pt=function(){let $=de.getState();Be($.view==="board"),Ie($.view==="worker"),Je(He($)),qe($.view==="board"||$.view==="worker"||Ve||!!$.selected_id)},$t=function(){let $=br(kt);return $===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:$}}},_t=function(){let $=br(Lt);return $===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:$}}},Be=function($){if($)for(let[x,Re]of Sl){if(z.has(x)||Ee.has(x))continue;let g=x===dr?$t():{type:Re};try{De.register(x,g)}catch(re){t("register %s store failed: %o",x,re)}Ee.add(x);let h=Ce.board,A=!1;me.subscribeList(x,g).then(re=>{A=!je(z,"board",h,x,re)}).catch(re=>{t("subscribe %s failed: %o",x,re),Ae(re,"board")}).finally(()=>{Ee.delete(x),A&&pt()})}else ye()},ye=function(){Ce.board+=1;for(let[$]of Sl){let x=z.get($);x&&(x().catch(()=>{}),z.delete($));try{De.unregister($)}catch(Re){t("unregister %s failed: %o",$,Re)}}},Ie=function($){if(!$){Ue();return}for(let[x,Re]of Pf){if(T.has(x)||Ee.has(x))continue;let g=x===ur?_t():{type:Re};try{De.register(x,g)}catch(re){t("register %s store failed: %o",x,re)}Ee.add(x);let h=Ce.worker,A=!1;me.subscribeList(x,g).then(re=>{A=!je(T,"worker",h,x,re)}).catch(re=>{t("subscribe %s failed: %o",x,re),Ae(re,"worker")}).finally(()=>{Ee.delete(x),A&&pt()})}},Ue=function(){Ce.worker+=1;for(let[$]of Pf){let x=T.get($);x&&(x().catch(()=>{}),T.delete($));try{De.unregister($)}catch(Re){t("unregister %s failed: %o",$,Re)}}},qe=function($){if(!$){tt();return}K||(ke("subscribe-worker-queue",{id:qf}).catch(x=>{t("subscribe-worker-queue failed: %o",x)}),K=()=>ke("unsubscribe-worker-queue",{id:qf}))},tt=function(){K&&(K().catch(()=>{}),K=null)},He=function($){return $.view==="monitor"||$.selected_id!=null},Je=function($){if(!$){bt();return}Oe||(ke("subscribe-monitor-pipeline",{id:Nf}).catch(x=>{t("subscribe-monitor-pipeline failed: %o",x)}),Oe=()=>ke("unsubscribe-monitor-pipeline",{id:Nf}))},bt=function(){Oe&&(Oe().catch(()=>{}),Oe=null)},xt=function(){ze||(ke("subscribe-ui-order",{id:Ff}).catch($=>{t("subscribe-ui-order failed: %o",$)}),ze=()=>ke("unsubscribe-ui-order",{id:Ff}))},qt=function(){ze&&(ze().catch(()=>{}),ze=null),M.clear()},Yt=function(){lt||(ke("subscribe-display-policy",{id:jf}).catch($=>{t("subscribe-display-policy failed: %o",$)}),lt=()=>ke("unsubscribe-display-policy",{id:jf}))},St=function(){lt&&(lt().catch(()=>{}),lt=null),se.clear()},Ut=function(){It||(ke("subscribe-impl-presets",{id:Bf}).catch($=>{t("subscribe-impl-presets failed: %o",$)}),It=()=>ke("unsubscribe-impl-presets",{id:Bf}))},Mt=function($){if(!$)return"Unknown";let x=$.split("/").filter(Boolean);return x.length>0?x[x.length-1]:"Unknown"},V=function($,x){Y.open($.path,{missing_state:$.missing_state,...x?{workspace:x}:{}})};var f=Ae,b=Ne,m=ut,k=v,R=je,j=pt,H=$t,oe=_t,X=Be,q=ye,O=Ie,I=Ue,F=qe,B=tt,ae=He,N=Je,W=bt,Z=xt,ee=qt,Se=Yt,ge=St,ue=Ut,P=Mt,we=V;let xe=document.getElementById("header-loading"),E=gc(xe),J=ip(e),_e=Df(),ke=E.wrapSend(($,x)=>_e.send($,x)),me=cc(ke),De=uc(),ot=pc(),Ye=Ul(),M=dc(),se=jl(),le=Bl(),pe=Wl();_e.on("impl-presets-snapshot",$=>{let x=$;x&&typeof x.revision=="number"&&Array.isArray(x.presets)&&le.set({revision:x.revision,presets:x.presets})}),_e.on("monitor-pipeline-snapshot",$=>{let x=$;if(!(!x||!Array.isArray(x.workspaces)))try{Ye.set(x.workspaces,x.workspaces_state,x.cross_lanes)}catch{}}),_e.on("ui-order-snapshot",$=>{let x=$;if(x&&typeof x.revision=="number")try{M.set({revision:x.revision,order:x.order&&typeof x.order=="object"?x.order:{}})}catch{}}),_e.on("display-policy-snapshot",$=>{let x=$;if(x&&x.policy&&typeof x.policy=="object")try{se.set(x.policy)}catch{}}),_e.on("session-log-snapshot",$=>{let x=$;if(x&&typeof x.id=="string")try{pe.set(x.id,Array.isArray(x.lines)?x.lines:[],typeof x.last_event_at=="number"?x.last_event_at:null)}catch{}}),_e.on("session-log-append",$=>{let x=$;if(x&&typeof x.id=="string")try{pe.append(x.id,x.event)}catch{}}),_e.on("snapshot",$=>{let x=$,Re=x&&typeof x.id=="string"?x.id:"",g=Re?De.getStore(Re):null;if(g&&x&&x.type==="snapshot")try{g.applyPush(x)}catch{}}),_e.on("upsert",$=>{let x=$,Re=x&&typeof x.id=="string"?x.id:"",g=Re?De.getStore(Re):null;if(g&&x&&x.type==="upsert")try{g.applyPush(x)}catch{}}),_e.on("delete",$=>{let x=$,Re=x&&typeof x.id=="string"?x.id:"",g=Re?De.getStore(Re):null;if(g&&x&&x.type==="delete")try{g.applyPush(x)}catch{}});let he=null,ce=null,Fe=null,Ge=null,Ze=()=>{},Pe=new Promise($=>{Ze=()=>$(void 0)}),Q=!1,U=!1;async function et($){let x=Ne($);if(x===ce||x===Fe)return;Fe=x;let Re=`detail:${$}`,g={type:"issue-detail",params:{id:$}};try{De.register(Re,g)}catch(h){t("register detail store failed: %o",h)}try{let h=await me.subscribeList(Re,g);if(de.getState().selected_id!==$||Ne($)!==x){await h().catch(()=>{});return}he&&await he().catch(()=>{}),he=h,ce=x}catch(h){t("detail subscribe failed: %o",h),Ae(h,"issue details")}finally{Fe===x&&(Fe=null)}}let z=new Map,Ee=new Set,Ce={board:0,worker:0},Ve=!1,kt=ps;try{let $=window.localStorage.getItem(Uf);Gi($)&&(kt=$)}catch{}let Lt="today";try{let $=window.localStorage.getItem(Wv);$!==null&&(Lt=Ln($))}catch{}async function L($){if(!Gi($)||$===kt)return;kt=$;try{window.localStorage.setItem(Uf,$)}catch{}let x=z.get(dr);if(!x)return;z.delete(dr),await x().catch(()=>{});let Re=$t();try{De.register(dr,Re)}catch(g){t("register %s store failed: %o",dr,g)}try{let g=await me.subscribeList(dr,Re);z.set(dr,g)}catch(g){t("re-subscribe %s failed: %o",dr,g),Ae(g,"board")}}async function te($){let x=Ln($);if(x===Lt)return;Lt=x;let Re=T.get(ur);if(!Re)return;T.delete(ur),await Re().catch(()=>{});let g=_t();try{De.register(ur,g)}catch(h){t("register %s store failed: %o",ur,h)}try{let h=await me.subscribeList(ur,g);T.set(ur,h)}catch(h){t("re-subscribe %s failed: %o",ur,h),Ae(h,"worker")}}let T=new Map,K=null,Oe=null,ze=null,lt=null,It=null;async function Vt(){lt=null,se.clear(),It=null,le.clear(),K=null,Oe=null,z.clear(),T.clear(),Ce.board+=1,Ce.worker+=1,Ut();let $=de.getState().workspace.current?.path;if($)try{await _e.send("set-workspace",{path:$})}catch(Re){t("workspace restore after reconnect failed: %o",Re);return}Yt();let x=de.getState();Be(x.view==="board"),Ie(x.view==="worker"),Je(He(x)),qe(x.view==="board"||x.view==="worker"||!!x.selected_id)}async function Jt(){t("clearing all subscriptions for workspace switch"),ye(),Ue(),tt(),ot.clear(),qt(),xt(),St(),Yt(),ut();let $=de.getState();if($.selected_id)try{De.unregister(`detail:${$.selected_id}`)}catch{}let x=de.getState();Be(x.view==="board"),Ie(x.view==="worker"),Je(He(x)),qe(x.view==="board"||x.view==="worker"||!!x.selected_id),x.selected_id&&v(x.selected_id)}async function Wt($){t("requesting workspace switch to %s",$),U=!0;try{let x=await _e.send("set-workspace",{path:$});t("workspace switch result: %o",x),x&&x.workspace&&(de.setState({workspace:{current:{path:x.workspace.root_dir,database:x.workspace.db_path}}}),window.localStorage.setItem("beads-ui.workspace",$),x.changed&&(await Jt(),be("Switched to "+Mt($),"success",2e3)))}catch(x){throw t("workspace switch failed: %o",x),be("Failed to switch workspace","error",3e3),x}finally{U=!1}}async function Dt($){t("requesting workspace git pull for %s",$);try{let x=await _e.send("git-pull-workspace",{});t("workspace git pull result: %o",x);let Re=x?.status;if(Re==="up_to_date"){be("Already up to date","success",2e3);return}if(Re==="stash_pop_conflict"){be("Git pulled, but stash pop conflicted (check git stash list)","warning",4e3);return}be("Git pulled "+Mt($),"success",2e3)}catch(x){t("workspace git pull failed: %o",x);let Re=x?.code,g=x?.message;if(Re==="rebase_conflict"){be("Git pull conflicts \u2014 reverted (manual resolve required)","error",4e3);return}if(Re==="rebase_conflict_abort_failed"){be("Git pull conflicts AND rebase --abort failed \u2014 repo left mid-rebase, run 'git rebase --abort' manually","error",6e3);return}if(Re==="busy"){be("Git pull skipped: another operation is running","warning",3e3);return}let h=g?`: ${g}`:"";throw be(`Git pull failed${h}`,"error",3e3),x}}async function cn($,x){t("setting workspace visibility %s \u2192 %s",$,String(x));try{await _e.send("set-workspace-visibility",{path:$,visible:x}),await Gt()}catch(Re){t("workspace visibility update failed: %o",Re),be("Failed to update project visibility","error",3e3)}}async function Gt(){try{let $=await _e.send("list-workspaces",{});if(t("workspaces loaded: %o",$),$&&Array.isArray($.workspaces)){let x=$.workspaces.map(A=>({path:A.path,database:A.database,pid:A.pid,version:A.version})),Re=$.current?{path:$.current.root_dir,database:$.current.db_path}:null,g=Array.isArray($.hidden)?$.hidden.filter(A=>typeof A=="string"):[];de.setState({workspace:{current:Re,available:x,hidden:g}});let h=window.localStorage.getItem("beads-ui.workspace");h&&(!x.some(re=>re.path===h)||g.includes(h)?window.localStorage.removeItem("beads-ui.workspace"):Re&&h!==Re.path&&(t("restoring saved workspace preference: %s",h),await Wt(h)))}}catch($){t("failed to load workspaces: %o",$)}}_e.on("workspace-changed",$=>{t("workspace-changed event: %o",$),$&&$.root_dir&&(de.setState({workspace:{current:{path:$.root_dir,database:$.db_path}}}),Gt(),Jt())});let Ft=!1;if(typeof _e.onConnection=="function"){let $=x=>{t("ws state %s",x),x==="reconnecting"||x==="closed"?(Ft=!0,be("Connection lost. Reconnecting\u2026","error",4e3)):x==="open"&&Ft&&(Ft=!1,be("Reconnected","success",2200),Uv(de,(Re,g)=>{t(`${Re}: %o`,g)}),Vt())};_e.onConnection($)}let en="board";try{let $=window.localStorage.getItem("beads-ui.view");($==="board"||$==="worker"||$==="monitor")&&(en=$)}catch($){t("view parse error: %o",$)}let de=mc({config:Bv(),view:en});_e.on("worker-queue-snapshot",$=>{let x=$;if(!x||!x.queue)return;let Re=de.getState().workspace.current?.path;if(typeof Re=="string"&&Re.length>0&&x.root_dir!==Re){t("dropping worker-queue snapshot for %s",String(x.root_dir));return}try{ot.set(x.queue)}catch{}});let C=fc(de);C.start();let ne=new Set(["get-comments","dep-add","dep-remove","impl-preset-create","impl-preset-update","impl-preset-delete","apply-impl-preset","apply-impl-preset-global","get-session-defaults","set-session-defaults","monitor-lane-create","monitor-lane-update","monitor-lane-confirm","monitor-lane-remove"]),Le=async($,x)=>{try{return await ke($,x)}catch(Re){if(ne.has($))throw Re;return[]}};Dp({global_element:r,repo_element:o},de,C);let y=document.getElementById("workspace-picker");y&&Lf(y,de,Wt,Dt,cn);let p=Fp(e,($,x)=>ke($,x));try{let $=document.getElementById("new-issue-btn");$&&$.addEventListener("click",()=>p.open())}catch{}let _=Wp(e,{policyStore:se,queueStore:ot,implPresetStore:le,transport:($,x)=>ke($,x),onOpenChange:$=>{let x=Ve;Ve=$,pt(),x&&$===!1&&$e.refreshSessionDefaults()},labelOptions:()=>{let $=new Set;for(let[x]of Sl)for(let Re of De.snapshotFor(x)||[]){let g=Re.labels;if(Array.isArray(g))for(let h of g)typeof h=="string"&&h.length>0&&$.add(h)}return Array.from($).sort()}});try{let $=document.getElementById("display-settings-btn");$&&($.setAttribute("aria-label","\uC124\uC815"),$.setAttribute("title","\uC124\uC815"),$.addEventListener("click",()=>_.open()))}catch{}let S=document.createElement("div");S.className="md-viewer-root",document.body.appendChild(S);let Y=Ai(S,{getWorkspacePath:()=>de.getState().workspace.current?.path}),ie=Lc(l,{gotoIssue:$=>C.gotoIssue($),issueStores:De,transport:Le,workerQueueStore:ot,uiOrderStore:M,displayPolicyStore:se,closedRange:kt,onClosedRangeChange:$=>{L($)},onNewIssue:()=>p.open(),openDoc:V}),$e=$l(a,{transport:Le,issueStores:De,queueStore:ot,sessionLogStore:pe,gotoIssue:$=>de.setState({selected_id:$}),getWorkspacePath:()=>de.getState().workspace.current?.path,switchWorkspace:$=>Wt($),openDoc:V,doneRange:Lt,onDoneRangeChange:$=>{te($)}}),Xe=Mp(u,{transport:Le,pipelineStore:Ye,execPresetStore:le,sessionLogStore:pe,router:C,gotoIssue:$=>C.gotoIssue($),getWorkspacePath:()=>de.getState().workspace.current?.path,switchWorkspace:$=>Wt($),openDoc:V}),it=sp(d,{issueStores:De,transport:Le,queueStore:ot,execPresetStore:le,sessionLogStore:pe,getWorkspacePath:()=>de.getState().workspace.current?.path,mdViewer:Y,depCandidates:()=>{let $=Ye.get();if($===null)return null;let x=Ye.getWorkspacesState(),Re=de.getState();if(Re.view==="monitor")return Na($,x);let g=Re.workspace.current?.path;return g?Na($,x,{root_dir:g}):null},subscribeCandidates:$=>Ye.subscribe($),onDepChanged:({type:$,a:x,b:Re})=>{let g=Xe;$==="dep-add"&&g&&typeof g.recorrectSharedLane=="function"&&g.recorrectSharedLane($,x,Re)},onNavigate:($,x)=>{let Re=()=>{de.getState().view==="worker"?de.setState({selected_id:$}):C.gotoIssue($)},g=de.getState().workspace.current?.path;if(typeof x!="string"||x.length===0||!g||x===g){Re();return}Promise.resolve(Wt(x)).then(Re).catch(()=>{be("\uB808\uD3EC \uC804\uD658\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error",2400)})},onClose:()=>{let $=de.getState();de.setState({selected_id:null});try{C.gotoView($.view==="worker"||$.view==="monitor"?$.view:"board")}catch{}},onOpenExecPresets:()=>{_.open("execution")}}),yt=de.getState().selected_id;yt&&(d.hidden=!1,it.load(yt),v(yt)),de.subscribe($=>{let x=$.selected_id;x?(d.hidden=!1,it.load(x),U||v(x)):(it.clear(),d.hidden=!0,ut())});let mt=$=>{l.hidden=$.view!=="board",a.hidden=$.view!=="worker",u.hidden=$.view!=="monitor",s&&s.classList.toggle("is-quiet",$.view==="monitor"),Be($.view==="board"),Ie($.view==="worker"),Je(He($)),qe($.view==="board"||$.view==="worker"||Ve||!!$.selected_id),!$.selected_id&&$.view==="board"&&ie.load(),$.view==="worker"&&$e.load(),$.view==="monitor"?Xe.load():Xe.pause(),window.localStorage.setItem("beads-ui.view",$.view)};de.subscribe(mt),mt(de.getState()),xt(),Yt(),Ut(),Gt().finally(()=>{Q=!0,Ze()}),window.addEventListener("keydown",$=>{let x=$.ctrlKey||$.metaKey,Re=String($.key||"").toLowerCase(),g=$.target,h=g&&g.tagName?String(g.tagName).toLowerCase():"",A=h==="input"||h==="textarea"||h==="select"||g&&typeof g.isContentEditable=="boolean"&&g.isContentEditable;x&&Re==="n"&&(A||($.preventDefault(),p.open()))})}}typeof window<"u"&&typeof document<"u"&&window.addEventListener("DOMContentLoaded",()=>{try{let n=window.localStorage.getItem("beads-ui.theme"),r=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches,o=n==="dark"||n==="light"?n:r?"dark":"light";document.documentElement.setAttribute("data-theme",o);let s=document.getElementById("theme-switch");s&&(s.checked=o==="dark")}catch{}let e=document.getElementById("theme-switch");e&&e.addEventListener("change",()=>{let n=e.checked?"dark":"light";document.documentElement.setAttribute("data-theme",n),window.localStorage.setItem("beads-ui.theme",n)});let t=document.getElementById("app");t&&Gv(t)});export{Gv as bootstrap,Bv as readBootstrapConfig,Uv as refreshConfigSnapshot};
//# sourceMappingURL=main.bundle.js.map
