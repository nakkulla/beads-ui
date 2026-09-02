var e_=Object.create;var zi=Object.defineProperty;var t_=Object.getOwnPropertyDescriptor;var n_=Object.getOwnPropertyNames;var r_=Object.getPrototypeOf,o_=Object.prototype.hasOwnProperty;var s_=(e,t,n)=>t in e?zi(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var Hi=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var i_=(e,t,n,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let o of n_(t))!o_.call(e,o)&&o!==n&&zi(e,o,{get:()=>t[o],enumerable:!(r=t_(t,o))||r.enumerable});return e};var a_=(e,t,n)=>(n=e!=null?e_(r_(e)):{},i_(t||!e||!e.__esModule?zi(n,"default",{value:e,enumerable:!0}):n,e));var Tt=(e,t,n)=>s_(e,typeof t!="symbol"?t+"":t,n);var Ql=Hi((bw,Xl)=>{var qr=1e3,jr=qr*60,Fr=jr*60,xr=Fr*24,u_=xr*7,d_=xr*365.25;Xl.exports=function(e,t){t=t||{};var n=typeof e;if(n==="string"&&e.length>0)return p_(e);if(n==="number"&&isFinite(e))return t.long?__(e):f_(e);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(e))};function p_(e){if(e=String(e),!(e.length>100)){var t=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(e);if(t){var n=parseFloat(t[1]),r=(t[2]||"ms").toLowerCase();switch(r){case"years":case"year":case"yrs":case"yr":case"y":return n*d_;case"weeks":case"week":case"w":return n*u_;case"days":case"day":case"d":return n*xr;case"hours":case"hour":case"hrs":case"hr":case"h":return n*Fr;case"minutes":case"minute":case"mins":case"min":case"m":return n*jr;case"seconds":case"second":case"secs":case"sec":case"s":return n*qr;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return n;default:return}}}}function f_(e){var t=Math.abs(e);return t>=xr?Math.round(e/xr)+"d":t>=Fr?Math.round(e/Fr)+"h":t>=jr?Math.round(e/jr)+"m":t>=qr?Math.round(e/qr)+"s":e+"ms"}function __(e){var t=Math.abs(e);return t>=xr?vs(e,t,xr,"day"):t>=Fr?vs(e,t,Fr,"hour"):t>=jr?vs(e,t,jr,"minute"):t>=qr?vs(e,t,qr,"second"):e+" ms"}function vs(e,t,n,r){var o=t>=n*1.5;return Math.round(e/n)+" "+r+(o?"s":"")}});var Jl=Hi((yw,Zl)=>{function m_(e){n.debug=n,n.default=n,n.coerce=a,n.disable=i,n.enable=o,n.enabled=l,n.humanize=Ql(),n.destroy=u,Object.keys(e).forEach(p=>{n[p]=e[p]}),n.names=[],n.skips=[],n.formatters={};function t(p){let f=0;for(let g=0;g<p.length;g++)f=(f<<5)-f+p.charCodeAt(g),f|=0;return n.colors[Math.abs(f)%n.colors.length]}n.selectColor=t;function n(p){let f,g=null,m,k;function R(...B){if(!R.enabled)return;let X=R,se=Number(new Date),j=se-(f||se);X.diff=j,X.prev=f,X.curr=se,f=se,B[0]=n.coerce(B[0]),typeof B[0]!="string"&&B.unshift("%O");let q=0;B[0]=B[0].replace(/%([a-zA-Z%])/g,(I,F)=>{if(I==="%%")return"%";q++;let V=n.formatters[F];if(typeof V=="function"){let Q=B[q];I=V.call(X,Q),B.splice(q,1),q--}return I}),n.formatArgs.call(X,B),(X.log||n.log).apply(X,B)}return R.namespace=p,R.useColors=n.useColors(),R.color=n.selectColor(p),R.extend=r,R.destroy=n.destroy,Object.defineProperty(R,"enabled",{enumerable:!0,configurable:!1,get:()=>g!==null?g:(m!==n.namespaces&&(m=n.namespaces,k=n.enabled(p)),k),set:B=>{g=B}}),typeof n.init=="function"&&n.init(R),R}function r(p,f){let g=n(this.namespace+(typeof f>"u"?":":f)+p);return g.log=this.log,g}function o(p){n.save(p),n.namespaces=p,n.names=[],n.skips=[];let f=(typeof p=="string"?p:"").trim().replace(/\s+/g,",").split(",").filter(Boolean);for(let g of f)g[0]==="-"?n.skips.push(g.slice(1)):n.names.push(g)}function s(p,f){let g=0,m=0,k=-1,R=0;for(;g<p.length;)if(m<f.length&&(f[m]===p[g]||f[m]==="*"))f[m]==="*"?(k=m,R=g,m++):(g++,m++);else if(k!==-1)m=k+1,R++,g=R;else return!1;for(;m<f.length&&f[m]==="*";)m++;return m===f.length}function i(){let p=[...n.names,...n.skips.map(f=>"-"+f)].join(",");return n.enable(""),p}function l(p){for(let f of n.skips)if(s(p,f))return!1;for(let f of n.names)if(s(p,f))return!0;return!1}function a(p){return p instanceof Error?p.stack||p.message:p}function u(){console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")}return n.enable(n.load()),n}Zl.exports=m_});var ec=Hi((pn,ws)=>{pn.formatArgs=h_;pn.save=b_;pn.load=y_;pn.useColors=g_;pn.storage=v_();pn.destroy=(()=>{let e=!1;return()=>{e||(e=!0,console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."))}})();pn.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"];function g_(){if(typeof window<"u"&&window.process&&(window.process.type==="renderer"||window.process.__nwjs))return!0;if(typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))return!1;let e;return typeof document<"u"&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||typeof window<"u"&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||typeof navigator<"u"&&navigator.userAgent&&(e=navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/))&&parseInt(e[1],10)>=31||typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)}function h_(e){if(e[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+e[0]+(this.useColors?"%c ":" ")+"+"+ws.exports.humanize(this.diff),!this.useColors)return;let t="color: "+this.color;e.splice(1,0,t,"color: inherit");let n=0,r=0;e[0].replace(/%[a-zA-Z%]/g,o=>{o!=="%%"&&(n++,o==="%c"&&(r=n))}),e.splice(r,0,t)}pn.log=console.debug||console.log||(()=>{});function b_(e){try{e?pn.storage.setItem("debug",e):pn.storage.removeItem("debug")}catch{}}function y_(){let e;try{e=pn.storage.getItem("debug")||pn.storage.getItem("DEBUG")}catch{}return!e&&typeof process<"u"&&"env"in process&&(e=process.env.DEBUG),e}function v_(){try{return localStorage}catch{}}ws.exports=Jl()(pn);var{formatters:w_}=ws.exports;w_.j=function(e){try{return JSON.stringify(e)}catch(t){return"[UnexpectedJSONParseError]: "+t.message}}});var go=globalThis,fs=go.trustedTypes,Pl=fs?fs.createPolicy("lit-html",{createHTML:e=>e}):void 0,Ki="$lit$",Bn=`lit$${Math.random().toFixed(9).slice(2)}$`,Yi="?"+Bn,l_=`<${Yi}>`,vr=document,ho=()=>vr.createComment(""),bo=e=>e===null||typeof e!="object"&&typeof e!="function",Vi=Array.isArray,Fl=e=>Vi(e)||typeof e?.[Symbol.iterator]=="function",Gi=`[ 	
\f\r]`,mo=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Dl=/-->/g,Ml=/>/g,br=RegExp(`>|${Gi}(?:([^\\s"'>=/]+)(${Gi}*=${Gi}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Nl=/'/g,ql=/"/g,Bl=/^(?:script|style|textarea|title)$/i,Xi=e=>(t,...n)=>({_$litType$:e,strings:t,values:n}),c=Xi(1),vo=Xi(2),dw=Xi(3),wn=Symbol.for("lit-noChange"),Pt=Symbol.for("lit-nothing"),jl=new WeakMap,yr=vr.createTreeWalker(vr,129);function Ul(e,t){if(!Vi(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return Pl!==void 0?Pl.createHTML(t):t}var Wl=(e,t)=>{let n=e.length-1,r=[],o,s=t===2?"<svg>":t===3?"<math>":"",i=mo;for(let l=0;l<n;l++){let a=e[l],u,p,f=-1,g=0;for(;g<a.length&&(i.lastIndex=g,p=i.exec(a),p!==null);)g=i.lastIndex,i===mo?p[1]==="!--"?i=Dl:p[1]!==void 0?i=Ml:p[2]!==void 0?(Bl.test(p[2])&&(o=RegExp("</"+p[2],"g")),i=br):p[3]!==void 0&&(i=br):i===br?p[0]===">"?(i=o??mo,f=-1):p[1]===void 0?f=-2:(f=i.lastIndex-p[2].length,u=p[1],i=p[3]===void 0?br:p[3]==='"'?ql:Nl):i===ql||i===Nl?i=br:i===Dl||i===Ml?i=mo:(i=br,o=void 0);let m=i===br&&e[l+1].startsWith("/>")?" ":"";s+=i===mo?a+l_:f>=0?(r.push(u),a.slice(0,f)+Ki+a.slice(f)+Bn+m):a+Bn+(f===-2?l:m)}return[Ul(e,s+(e[n]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),r]},yo=class e{constructor({strings:t,_$litType$:n},r){let o;this.parts=[];let s=0,i=0,l=t.length-1,a=this.parts,[u,p]=Wl(t,n);if(this.el=e.createElement(u,r),yr.currentNode=this.el.content,n===2||n===3){let f=this.el.content.firstChild;f.replaceWith(...f.childNodes)}for(;(o=yr.nextNode())!==null&&a.length<l;){if(o.nodeType===1){if(o.hasAttributes())for(let f of o.getAttributeNames())if(f.endsWith(Ki)){let g=p[i++],m=o.getAttribute(f).split(Bn),k=/([.?@])?(.*)/.exec(g);a.push({type:1,index:s,name:k[2],strings:m,ctor:k[1]==="."?ms:k[1]==="?"?gs:k[1]==="@"?hs:kr}),o.removeAttribute(f)}else f.startsWith(Bn)&&(a.push({type:6,index:s}),o.removeAttribute(f));if(Bl.test(o.tagName)){let f=o.textContent.split(Bn),g=f.length-1;if(g>0){o.textContent=fs?fs.emptyScript:"";for(let m=0;m<g;m++)o.append(f[m],ho()),yr.nextNode(),a.push({type:2,index:++s});o.append(f[g],ho())}}}else if(o.nodeType===8)if(o.data===Yi)a.push({type:2,index:s});else{let f=-1;for(;(f=o.data.indexOf(Bn,f+1))!==-1;)a.push({type:7,index:s}),f+=Bn.length-1}s++}}static createElement(t,n){let r=vr.createElement("template");return r.innerHTML=t,r}};function wr(e,t,n=e,r){if(t===wn)return t;let o=r!==void 0?n._$Co?.[r]:n._$Cl,s=bo(t)?void 0:t._$litDirective$;return o?.constructor!==s&&(o?._$AO?.(!1),s===void 0?o=void 0:(o=new s(e),o._$AT(e,n,r)),r!==void 0?(n._$Co??(n._$Co=[]))[r]=o:n._$Cl=o),o!==void 0&&(t=wr(e,o._$AS(e,t.values),o,r)),t}var _s=class{constructor(t,n){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=n}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:n},parts:r}=this._$AD,o=(t?.creationScope??vr).importNode(n,!0);yr.currentNode=o;let s=yr.nextNode(),i=0,l=0,a=r[0];for(;a!==void 0;){if(i===a.index){let u;a.type===2?u=new Mr(s,s.nextSibling,this,t):a.type===1?u=new a.ctor(s,a.name,a.strings,this,t):a.type===6&&(u=new bs(s,this,t)),this._$AV.push(u),a=r[++l]}i!==a?.index&&(s=yr.nextNode(),i++)}return yr.currentNode=vr,o}p(t){let n=0;for(let r of this._$AV)r!==void 0&&(r.strings!==void 0?(r._$AI(t,r,n),n+=r.strings.length-2):r._$AI(t[n])),n++}},Mr=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,n,r,o){this.type=2,this._$AH=Pt,this._$AN=void 0,this._$AA=t,this._$AB=n,this._$AM=r,this.options=o,this._$Cv=o?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,n=this._$AM;return n!==void 0&&t?.nodeType===11&&(t=n.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,n=this){t=wr(this,t,n),bo(t)?t===Pt||t==null||t===""?(this._$AH!==Pt&&this._$AR(),this._$AH=Pt):t!==this._$AH&&t!==wn&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Fl(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==Pt&&bo(this._$AH)?this._$AA.nextSibling.data=t:this.T(vr.createTextNode(t)),this._$AH=t}$(t){let{values:n,_$litType$:r}=t,o=typeof r=="number"?this._$AC(t):(r.el===void 0&&(r.el=yo.createElement(Ul(r.h,r.h[0]),this.options)),r);if(this._$AH?._$AD===o)this._$AH.p(n);else{let s=new _s(o,this),i=s.u(this.options);s.p(n),this.T(i),this._$AH=s}}_$AC(t){let n=jl.get(t.strings);return n===void 0&&jl.set(t.strings,n=new yo(t)),n}k(t){Vi(this._$AH)||(this._$AH=[],this._$AR());let n=this._$AH,r,o=0;for(let s of t)o===n.length?n.push(r=new e(this.O(ho()),this.O(ho()),this,this.options)):r=n[o],r._$AI(s),o++;o<n.length&&(this._$AR(r&&r._$AB.nextSibling,o),n.length=o)}_$AR(t=this._$AA.nextSibling,n){for(this._$AP?.(!1,!0,n);t!==this._$AB;){let r=t.nextSibling;t.remove(),t=r}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},kr=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,n,r,o,s){this.type=1,this._$AH=Pt,this._$AN=void 0,this.element=t,this.name=n,this._$AM=o,this.options=s,r.length>2||r[0]!==""||r[1]!==""?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=Pt}_$AI(t,n=this,r,o){let s=this.strings,i=!1;if(s===void 0)t=wr(this,t,n,0),i=!bo(t)||t!==this._$AH&&t!==wn,i&&(this._$AH=t);else{let l=t,a,u;for(t=s[0],a=0;a<s.length-1;a++)u=wr(this,l[r+a],n,a),u===wn&&(u=this._$AH[a]),i||(i=!bo(u)||u!==this._$AH[a]),u===Pt?t=Pt:t!==Pt&&(t+=(u??"")+s[a+1]),this._$AH[a]=u}i&&!o&&this.j(t)}j(t){t===Pt?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},ms=class extends kr{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===Pt?void 0:t}},gs=class extends kr{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==Pt)}},hs=class extends kr{constructor(t,n,r,o,s){super(t,n,r,o,s),this.type=5}_$AI(t,n=this){if((t=wr(this,t,n,0)??Pt)===wn)return;let r=this._$AH,o=t===Pt&&r!==Pt||t.capture!==r.capture||t.once!==r.once||t.passive!==r.passive,s=t!==Pt&&(r===Pt||o);o&&this.element.removeEventListener(this.name,this,r),s&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},bs=class{constructor(t,n,r){this.element=t,this.type=6,this._$AN=void 0,this._$AM=n,this.options=r}get _$AU(){return this._$AM._$AU}_$AI(t){wr(this,t)}},zl={M:Ki,P:Bn,A:Yi,C:1,L:Wl,R:_s,D:Fl,V:wr,I:Mr,H:kr,N:gs,U:hs,B:ms,F:bs},c_=go.litHtmlPolyfillSupport;c_?.(yo,Mr),(go.litHtmlVersions??(go.litHtmlVersions=[])).push("3.3.1");var ot=(e,t,n)=>{let r=n?.renderBefore??t,o=r._$litPart$;if(o===void 0){let s=n?.renderBefore??null;r._$litPart$=o=new Mr(t.insertBefore(ho(),s),s,void 0,n??{})}return o._$AI(e),o};var ys="today",Hl=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"},{value:"30d",label:"\uCD5C\uADFC 30\uC77C"},{value:"all",label:"\uC804\uCCB4"}],Nr=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"}];function Dn(e){return e==="today"?"today":"7d"}function Qi(e){return e==="today"||e==="7d"||e==="30d"||e==="all"}function $r(e,t=Date.now()){switch(e){case"today":{let n=new Date(t);return n.setHours(0,0,0,0),n.getTime()}case"7d":return t-7*864e5;case"30d":return t-30*864e5;case"all":default:return}}function Gl(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function Kl(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function Yl(){let e=null,t=[],n,r=new Set;function o(){for(let s of Array.from(r))try{s()}catch{}}return{get(){return e},getWorkspacesState(){return t},crossLanes(){return n},set(s,i,l){e=Array.isArray(s)?s:null,t=Array.isArray(i)?i:[],n=l===void 0?void 0:l!==null&&typeof l=="object"&&typeof l.revision=="number"&&Array.isArray(l.lanes)?{revision:l.revision,lanes:l.lanes}:null,o()},clear(){e=null,t=[],n=void 0,o()},subscribe(s){return r.add(s),()=>r.delete(s)}}}function Vl(){let e=new Map,t=new Set;function n(o){return o.startsWith("session-log:")?o:`session-log:${o}`}function r(){for(let o of Array.from(t))try{o()}catch{}}return{set(o,s,i=null){e.set(n(o),{lines:Array.isArray(s)?[...s]:[],last_event_at:typeof i=="number"?i:null}),r()},append(o,s){let i=n(o),l=e.get(i)||{lines:[],last_event_at:null};l.lines=[...l.lines,s],l.last_event_at=Date.now(),e.set(i,l),r()},get(o){return e.get(n(o))||null},clear(o){typeof o=="string"?e.delete(n(o)):e.clear(),r()},subscribe(o){return t.add(o),()=>t.delete(o)}}}var tc=a_(ec(),1);function It(e){return(0,tc.default)(`beads-ui:${e}`)}function k_(e){let n=nc((e&&typeof e=="object"?e:{}).spec_id);return n?{path:n,source:"native",conflict:!1}:{path:"",source:"none",conflict:!1}}function nc(e){return typeof e=="string"?e.trim():""}function $_(e){let t=e&&typeof e=="object"?e:{};return t.metadata&&typeof t.metadata=="object"?t.metadata:{}}var x_=/^[A-Za-z0-9_.:-]+@[0-9a-fA-F]{40}$/;function Br(e){let t=k_(e),n=nc($_(e).spec_review),r=x_.test(n),o=r&&n.slice(0,n.indexOf("@"))==="skipped";return t.source==="none"?{...t,evidence:"none",skipped:o}:{...t,evidence:r?"published":"draft",skipped:o}}function Sn(e){if(typeof e=="number")return Number.isFinite(e)?e:0;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:0}return 0}function wo(e,t){let n=Sn(e.created_at),r=Sn(t.created_at);if(n!==r)return n<r?1:-1;let o=e.priority??2,s=t.priority??2;if(o!==s)return o-s;let i=e.id,l=t.id;return i<l?-1:i>l?1:0}function lc(e,t){let n=Sn(e.created_at),r=Sn(t.created_at);if(n!==r)return n<r?-1:1;let o=e.priority??2,s=t.priority??2;if(o!==s)return o-s;let i=e.id,l=t.id;return i<l?-1:i>l?1:0}function cc(e,t){let n=Sn(e.updated_at),r=Sn(t.updated_at);if(n!==r)return n<r?1:-1;let o=e.id,s=t.id;return o<s?-1:o>s?1:0}function uc(e,t){let n=e.priority??2,r=t.priority??2;if(n!==r)return n-r;let o=Sn(e.created_at),s=Sn(t.created_at);if(o!==s)return o<s?1:-1;let i=e.id,l=t.id;return i<l?-1:i>l?1:0}function dc(e,t){let n=e.closed_at??0,r=t.closed_at??0;if(n!==r)return n<r?1:-1;let o=e?.id,s=t?.id;return o<s?-1:o>s?1:0}var ks=Object.freeze({priority:"asc",dependents:"desc",released:"desc",spec:"desc",created:"asc",updated:"desc"});function A_(e){return typeof e=="string"&&Object.prototype.hasOwnProperty.call(ks,e)}function Ji(e){if(!e||typeof e!="object")return!1;let t=e;return A_(t.key)&&(t.dir==="asc"||t.dir==="desc")}function rc(e){if(typeof e=="number")return Number.isFinite(e)?e:null;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:null}return null}function oc(e,t){switch(t){case"priority":{let n=e.priority;return typeof n=="number"&&Number.isFinite(n)?n:null}case"dependents":{let n=e.dependents_info?e.dependents_info.count:null;return typeof n=="number"&&Number.isFinite(n)?n:null}case"released":{let n=e.release_info?e.release_info.last_released_at:null;return typeof n=="number"&&Number.isFinite(n)?n:null}case"spec":return Br(e).evidence==="published"?1:0;case"created":return rc(e.created_at);case"updated":return rc(e.updated_at);default:return null}}function sc(e,t,n){let r=oc(e,n.key),o=oc(t,n.key);if(r===null||o===null)return r===o?0:r===null?1:-1;if(r===o)return 0;let s=r<o?-1:1;return n.dir==="desc"?-s:s}function pc(e){let t=Array.isArray(e)?e.filter(Ji):[];return(n,r)=>{for(let l of t){let a=sc(n,r,l);if(a!==0)return a}let o=sc(n,r,{key:"created",dir:"asc"});if(o!==0)return o;let s=n.id,i=r.id;return s<i?-1:s>i?1:0}}var S_=/^(?:[A-Za-z][A-Za-z0-9]*(?:-[A-Za-z0-9]+)+\s+)?(?:Task|Phase|T)\s*(\d+)/i;function ic(e){let t=e&&e.metadata,n=t?t.task_order:void 0;if(n==null||n==="")return Number.POSITIVE_INFINITY;let r=Number(n);return Number.isFinite(r)?r:Number.POSITIVE_INFINITY}function ac(e){let t=e&&e.title;if(typeof t!="string")return Number.POSITIVE_INFINITY;let n=S_.exec(t);if(!n)return Number.POSITIVE_INFINITY;let r=Number(n[1]);return Number.isFinite(r)?r:Number.POSITIVE_INFINITY}function fc(e,t){let n=ic(e),r=ic(t);if(n!==r)return n<r?-1:1;let o=ac(e),s=ac(t);if(o!==s)return o<s?-1:1;let i=Sn(e&&e.created_at),l=Sn(t&&t.created_at);if(i!==l)return i<l?-1:1;let a=e&&e.id,u=t&&t.id;return a===u?0:String(a)<String(u)?-1:1}var Zi=2**20;function Ur(e,t){let n=e&&e.id;return t&&typeof n=="string"&&Object.prototype.hasOwnProperty.call(t,n)&&typeof t[n]=="number"&&Number.isFinite(t[n])?t[n]:-Sn(e&&e.created_at)}function _c(e){return(t,n)=>{let r=Ur(t,e),o=Ur(n,e);if(r!==o)return r<o?-1:1;let s=t?.id,i=n?.id;return s<i?-1:s>i?1:0}}function ea(e,t,n){let r=Array.isArray(e)?e:[],o=r.length,s=Math.max(0,Math.min(t,o-1)),i=s-1>=0?r[s-1]:null,l=s+1<o?r[s+1]:null;if(!i&&!l)return{rank:0};if(!i)return{rank:Ur(l,n)-Zi};if(!l)return{rank:Ur(i,n)+Zi};let a=Ur(i,n),u=Ur(l,n),p=(a+u)/2;return a<p&&p<u?{rank:p}:{renormalize:r.map((f,g)=>({bead_id:f.id,rank:g*Zi}))}}function ta(e,t={}){let n=It(`issue-store:${e}`),r=new Map,o=[],s=0,i=new Set,l=!1,a=t.sort||wo;function u(){for(let g of Array.from(i))try{g()}catch{}}function p(){o=Array.from(r.values()).sort(a)}function f(g){if(l||!g||g.id!==e)return;let m=Number(g.revision)||0;if(n("apply %s rev=%d",g.type,m),!(m<=s&&g.type!=="snapshot")){if(g.type==="snapshot"){if(m<=s)return;r.clear();let k=Array.isArray(g.issues)?g.issues:[];for(let R of k)R&&typeof R.id=="string"&&R.id.length>0&&r.set(R.id,R);p(),s=m,u();return}if(g.type==="upsert"){let k=g.issue;if(k&&typeof k.id=="string"&&k.id.length>0){let R=r.get(k.id);if(!R)r.set(k.id,k);else{let B=Number.isFinite(R.updated_at)?R.updated_at:0,X=Number.isFinite(k.updated_at)?k.updated_at:0;if(B<=X){for(let se of Object.keys(R))se in k||delete R[se];for(let[se,j]of Object.entries(k))R[se]=j}}p()}s=m,u()}else if(g.type==="delete"){let k=String(g.issue_id||"");k&&(r.delete(k),p()),s=m,u()}}}return{id:e,subscribe(g){return i.add(g),()=>{i.delete(g)}},applyPush:f,snapshot(){return o},size(){return r.size},getById(g){return r.get(g)},dispose(){l=!0,r.clear(),o=[],i.clear(),s=0}}}function $s(e){let t=String(e.type||"").trim(),n={};if(e.params&&typeof e.params=="object"){let o=Object.keys(e.params).sort();for(let s of o){let i=e.params[s];n[s]=String(i)}}let r=new URLSearchParams(n).toString();return r.length>0?`${t}?${r}`:t}function mc(e){let t=It("subs"),n=new Map,r=new Map;function o(l,a){t("applyDelta %s +%d ~%d -%d",l,(a.added||[]).length,(a.updated||[]).length,(a.removed||[]).length);let u=r.get(l);if(!u||u.size===0)return;let p=Array.isArray(a.added)?a.added:[],f=Array.isArray(a.updated)?a.updated:[],g=Array.isArray(a.removed)?a.removed:[];for(let m of Array.from(u)){let k=n.get(m);if(!k)continue;let R=k.itemsById;for(let B of p)typeof B=="string"&&B.length>0&&R.set(B,!0);for(let B of f)typeof B=="string"&&B.length>0&&R.set(B,!0);for(let B of g)typeof B=="string"&&B.length>0&&R.delete(B)}}async function s(l,a){let u=$s(a);if(t("subscribe %s key=%s",l,u),!n.has(l))n.set(l,{key:u,itemsById:new Map});else{let f=n.get(l);if(f&&f.key!==u){let g=r.get(f.key);g&&(g.delete(l),g.size===0&&r.delete(f.key)),n.set(l,{key:u,itemsById:new Map})}}r.has(u)||r.set(u,new Set);let p=r.get(u);p&&p.add(l);try{await e("subscribe-list",{id:l,type:a.type,params:a.params})}catch(f){let g=n.get(l)||null;if(g){let m=r.get(g.key);m&&(m.delete(l),m.size===0&&r.delete(g.key))}throw n.delete(l),f}return async()=>{t("unsubscribe %s key=%s",l,u);try{await e("unsubscribe-list",{id:l})}catch{}let f=n.get(l)||null;if(f){let g=r.get(f.key);g&&(g.delete(l),g.size===0&&r.delete(f.key))}n.delete(l)}}return{subscribeList:s,_applyDelta:o,_subKeyOf:$s,selectors:{getIds(l){let a=n.get(l);return a?Array.from(a.itemsById.keys()):[]},has(l,a){let u=n.get(l);return u?u.itemsById.has(a):!1},count(l){let a=n.get(l);return a?a.itemsById.size:0},getItemsById(l){let a=n.get(l),u={};if(!a)return u;for(let p of a.itemsById.keys())u[p]=!0;return u}}}}function gc(){let e=It("issue-stores"),t=new Map,n=new Map,r=new Set,o=new Map;function s(){for(let a of Array.from(r))try{a()}catch{}}function i(a,u,p){let f=u?$s(u):"",g=n.get(a)||"",m=t.has(a);if(e("register %s key=%s (prev=%s)",a,f,g),m&&g&&f&&g!==f){let k=t.get(a);if(k)try{k.dispose()}catch{}let R=o.get(a);if(R){try{R()}catch{}o.delete(a)}let B=ta(a,p);t.set(a,B);let X=B.subscribe(()=>s());o.set(a,X)}else if(!m){let k=ta(a,p);t.set(a,k);let R=k.subscribe(()=>s());o.set(a,R)}return n.set(a,f),()=>l(a)}function l(a){e("unregister %s",a),n.delete(a);let u=t.get(a);u&&(u.dispose(),t.delete(a));let p=o.get(a);if(p){try{p()}catch{}o.delete(a)}}return{register:i,unregister:l,getStore(a){return t.get(a)||null},snapshotFor(a){let u=t.get(a);return u?u.snapshot().slice():[]},subscribe(a){return r.add(a),()=>r.delete(a)}}}function hc(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function bc(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function na(e,t){return`#/${e==="worker"||e==="monitor"?e:"board"}?issue=${encodeURIComponent(t)}`}function E_(e){let t=String(e||""),n=t.startsWith("#")?t.slice(1):t,r=n.indexOf("?"),o=r>=0?n.slice(r+1):"";if(o){let l=new URLSearchParams(o).get("issue");if(l)return decodeURIComponent(l)}let s=/^\/issue\/([^\s?#]+)/.exec(n);return s&&s[1]?decodeURIComponent(s[1]):null}function T_(e){let t=String(e||"");return/^#\/worker(\b|\/|$)/.test(t)?"worker":/^#\/monitor(\b|\/|$)/.test(t)?"monitor":"board"}function yc(e){let t=It("router"),n=()=>{let r=window.location.hash||"",o=/^#\/issue\/([^\s?#]+)/.exec(r),s=o&&o[1]?decodeURIComponent(o[1]):E_(r),i=T_(r);if(t("hash change \u2192 view=%s id=%s",i,s),e.setState({selected_id:i==="worker"?null:s,view:i,worker:{selected_parent_id:i==="worker"?s:null}}),!!o||/^#\/(issues|epics)(\b|\/|\?|$)/.test(r)){let a=s?`#/${i}?issue=${encodeURIComponent(s)}`:`#/${i}`;window.location.hash!==a&&(window.location.hash=a)}};return{start(){window.addEventListener("hashchange",n),n()},stop(){window.removeEventListener("hashchange",n)},gotoIssue(r){let o=e.getState?e.getState():{view:"board"},s=o.view==="worker"||o.view==="monitor"?o.view:"board",i=na(s,r);t("goto issue %s (view=%s)",r,s),window.location.hash!==i?window.location.hash=i:e.setState({selected_id:s==="worker"?null:r,view:s,worker:{selected_parent_id:s==="worker"?r:null}})},gotoView(r){let o=e.getState?e.getState():{selected_id:null,worker:{selected_parent_id:null}},s=r==="worker"?o.worker?.selected_parent_id:o.selected_id,i=s?na(r,s):`#/${r}`;t("goto view %s (id=%s)",r,s||""),window.location.hash!==i?window.location.hash=i:e.setState({view:r,selected_id:r==="worker"?null:o.selected_id})}}}var C_=Object.freeze({workspace_config:{default_workspace:null}});function vc(e){return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:C_.workspace_config.default_workspace}}}function wc(e={}){let t=It("state"),n={selected_id:e.selected_id??null,view:e.view??"board",filters:{status:e.filters?.status??"all",search:e.filters?.search??"",type:typeof e.filters?.type=="string"?e.filters?.type:""},board:{closed_filter:e.board?.closed_filter==="3"||e.board?.closed_filter==="7"||e.board?.closed_filter==="today"?e.board?.closed_filter:"today"},worker:{selected_parent_id:e.worker?.selected_parent_id??null,show_closed_children:Array.isArray(e.worker?.show_closed_children)?e.worker.show_closed_children:[]},workspace:{current:e.workspace?.current??null,available:e.workspace?.available??[],hidden:e.workspace?.hidden??[]},config:vc(e.config)},r=new Set;function o(){for(let s of Array.from(r))try{s(n)}catch{}}return{getState(){return n},setState(s){let i={...n,...s,filters:{...n.filters,...s.filters||{}},board:{...n.board,...s.board||{}},worker:{...n.worker,...s.worker||{}},workspace:{current:s.workspace?.current!==void 0?s.workspace.current:n.workspace.current,available:s.workspace?.available!==void 0?s.workspace.available:n.workspace.available,hidden:s.workspace?.hidden!==void 0?s.workspace.hidden:n.workspace.hidden},config:s.config!==void 0?vc(s.config):n.config},l=i.workspace.current?.path!==n.workspace.current?.path||i.workspace.available.length!==n.workspace.available.length||i.workspace.hidden.length!==n.workspace.hidden.length||i.workspace.hidden.some((u,p)=>u!==n.workspace.hidden[p]),a=i.config.workspace_config.default_workspace!==n.config.workspace_config.default_workspace;i.selected_id===n.selected_id&&i.view===n.view&&i.filters.status===n.filters.status&&i.filters.search===n.filters.search&&i.filters.type===n.filters.type&&i.board.closed_filter===n.board.closed_filter&&i.worker.selected_parent_id===n.worker.selected_parent_id&&i.worker.show_closed_children.length===n.worker.show_closed_children.length&&i.worker.show_closed_children.every((u,p)=>u===n.worker.show_closed_children[p])&&!l&&!a||(n=i,t("state change %o",{selected_id:n.selected_id,view:n.view,filters:n.filters,board:n.board,worker:n.worker,workspace:n.workspace.current?.path,config:{default_workspace:n.config.workspace_config.default_workspace}}),o())},subscribe(s){return r.add(s),()=>r.delete(s)}}}function kc(e){let t=It("activity"),n=0,r=new Map,o=1;function s(){if(!e)return;let u=n>0;e.toggleAttribute("hidden",!u),e.setAttribute("aria-busy",u?"true":"false")}function i(){n+=1,t("start count=%d",n),s()}function l(){let u=n;n=Math.max(0,n-1),u<=0?t("done called but count was already %d",u):t("done count=%d\u2192%d",u,n),s()}function a(u){return async(f,g)=>{let m=o++,k=Date.now();r.set(m,{type:f,start_ts:k}),t("request start id=%d type=%s count=%d",m,f,n+1),i();let R=!1,B=()=>{R||(R=!0,r.delete(m),l())},X=setTimeout(()=>{R||(t("request TIMEOUT id=%d type=%s elapsed=%dms",m,f,Date.now()-k),B())},3e4);try{let se=await u(f,g),j=Date.now()-k;return t("request done id=%d type=%s elapsed=%dms",m,f,j),se}catch(se){let j=Date.now()-k;throw t("request error id=%d type=%s elapsed=%dms err=%o",m,f,j,se),se}finally{clearTimeout(X),B()}}}return s(),{wrapSend:a,start:i,done:l,getCount:()=>n,getActiveRequests:()=>{let u=Date.now();return Array.from(r.entries()).map(([p,f])=>({id:p,type:f.type,elapsed_ms:u-f.start_ts}))}}}function ye(e,t="info",n=2800){let r=document.createElement("div");r.className="toast",r.textContent=e,r.style.position="fixed",r.style.right="12px",r.style.bottom="12px",r.style.zIndex="1000",r.style.color="#fff",r.style.padding="8px 10px",r.style.borderRadius="4px",r.style.fontSize="12px",t==="success"?r.style.background="#156d36":t==="warning"?r.style.background="#a36a00":t==="error"?r.style.background="#9f2011":r.style.background="rgba(0,0,0,0.85)",(document.body||document.documentElement).appendChild(r),setTimeout(()=>{try{r.remove()}catch{}},n)}function Wr(e=void 0,t=void 0){function n(){if(!t||typeof t.get!="function")return null;let s=t.get();return s&&s.order?s.order:{}}function r(s,i,l){let a=e&&e.snapshotFor?e.snapshotFor(s).slice():[];if(i==="closed")return a.sort(dc),a;switch(l){case"created_desc":return a.sort(wo),a;case"created_asc":return a.sort(lc),a;case"updated_desc":return a.sort(cc),a;case"priority":return a.sort(uc),a;case"manual":default:{let u=n();return u?a.sort(_c(u)):a.sort(wo),a}}}function o(s){let i=[];return e&&typeof e.subscribe=="function"&&i.push(e.subscribe(s)),t&&typeof t.subscribe=="function"&&i.push(t.subscribe(s)),()=>{for(let l of i)try{l()}catch{}}}return{selectBoardColumn:r,subscribe:o}}function nr(e){if(!e)return null;if(typeof e=="number")return Number.isFinite(e)?e:null;let t=Date.parse(e);return Number.isFinite(t)?t:null}function Zt(e){let t=nr(e);if(t===null)return"";let n=new Date(t),r=o=>String(o).padStart(2,"0");return`${n.getFullYear()}-${r(n.getMonth()+1)}-${r(n.getDate())} ${r(n.getHours())}:${r(n.getMinutes())}`}function sn(e,t){let n=nr(e);if(n===null)return"";let o=(typeof t=="number"?t:Date.now())-n;if(o<6e4)return"\uBC29\uAE08";let s=Math.floor(o/6e4);if(s<60)return`${s}\uBD84 \uC804`;let i=Math.floor(o/36e5);if(i<24)return`${i}\uC2DC\uAC04 \uC804`;let l=Math.floor(o/864e5);if(l<7)return`${l}\uC77C \uC804`;let a=Math.floor(l/7);if(l<30)return`${a}\uC8FC \uC804`;let u=Math.floor(l/30);return u<12?`${u}\uAC1C\uC6D4 \uC804`:`${Math.floor(l/365)}\uB144 \uC804`}function $c(e){if(!Array.isArray(e))return null;let t=null,n=-1;for(let r of e){if(!r||r.status!=="in_progress")continue;let o=nr(r.updated_at)??0;if(t===null||o>n){t=r,n=o;continue}o===n&&String(r.id)<String(t.id)&&(t=r)}return t}function xs(e){let t=e&&e.parent;return typeof t=="string"?t:t&&t.id?String(t.id):""}function As(e){let t=new Map;for(let r of e)r&&r.id&&!t.has(r.id)&&t.set(r.id,r);let n=new Map;for(let r of t.values()){let o=xs(r);if(!o)continue;let s=n.get(o);s||(s=[],n.set(o,s)),s.push({id:r.id,title:r.title,status:r.status,metadata:r.metadata,workflow:r.workflow,created_at:r.created_at,updated_at:r.updated_at})}return n}function Ss(e,t){let n=e.get(t)||[],r=0;for(let s of n)(s.status==="resolved"||s.status==="closed")&&(r+=1);let o=$c(n);return{total:n.length,count:r,current:o,children:n}}function xc(e){let t=e.transport,n=e.uiOrderStore;function r(i,l){return"renormalize"in i?i.renormalize:[{bead_id:l,rank:i.rank}]}function o(i,l){let a={...i.order};for(let u of l)a[u.bead_id]=u.rank;n&&n.set({revision:i.revision,order:a})}async function s(i,l,a){if(!t||!n)return;let u=n.get()||{revision:0,order:{}},p=r(ea(l,a,u.order),i);o(u,p);let f=await t("ui-order-set",{expected_revision:u.revision,entries:p});if(f&&f.conflict){let g={revision:typeof f.revision=="number"?f.revision:0,order:f.order||{}};n.set(g);let m=r(ea(l,a,g.order),i);o(g,m);let k=await t("ui-order-set",{expected_revision:g.revision,entries:m});k&&k.applied&&n.set({revision:typeof k.revision=="number"?k.revision:0,order:k.order||{}})}else f&&f.applied&&n.set({revision:typeof f.revision=="number"?f.revision:0,order:f.order||{}})}return{applyReorder:s}}function Ac(e){if(typeof e!="string")return"";let t=e.indexOf("-");return t>0?e.slice(0,t):""}function Un(e,t){let n=Ac(e),r=Ac(t);return n.length===0||r.length===0?!1:n!==r}function Es(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function ra(e,t){return!t||typeof e!="string"||e.length===0||Es(t.visible_labels).includes(e)?!0:Es(t.hidden_labels).includes(e)?!1:!Es(t.hidden_prefixes).some(n=>n.length>0&&e.startsWith(n))}function Sc(e,t){return Es(e).filter(n=>ra(n,t))}function rr(e,t){let n=e&&e.chips?e.chips[t]:void 0;return typeof n=="boolean"?n:!0}function R_(e){switch(e){case"in_progress":return"board-card__dot board-card__dot--progress";case"resolved":return"board-card__dot board-card__dot--resolved";case"closed":return"board-card__dot board-card__dot--closed";case"blocked":return"board-card__dot board-card__dot--blocked";default:return"board-card__dot"}}function O_(e,t,n,r,o){return c`<button
    type="button"
    class="board-card__roll-toggle"
    data-roll-parent=${e}
    aria-expanded=${r?"true":"false"}
    @click=${o}
  >
    children ${t}/${n} ${r?"\u25B4":"\u25BE"}
  </button>`}function I_(e,t,n,r){return c`<button
    type="button"
    class="board-card__roll-child"
    data-child-id=${e.id}
    @click=${r?o=>r(o,e.id):void 0}
  >
    <span class=${R_(e.status)}>●</span>
    <span class="board-card__roll-child-ord">${t}</span>
    <span class="board-card__roll-child-title">${e.title||e.id}</span>
    ${n}
  </button>`}function Ts(e,t){let n=e.total||0,r=!!t.expanded,o=t.trailing??"",s=typeof t.empty_label=="string"&&t.empty_label.length>0?t.empty_label:null;if(n===0&&s===null)return"";let i=Array.isArray(e.children)?e.children:[],l=n>0?i.slice().sort(fc):i;return c`
    <div class="board-card__roll">
      <div class="board-card__roll-meta">
        ${n>0?O_(t.parent_id,e.count,n,r,t.onToggle):c`<span class="board-card__roll-none">${s}</span>`}
        ${o}
      </div>
      ${n>0&&e.current?c`<div class="board-card__roll-current">
            └
            <span class="board-card__cur-child"
              >● ${e.current.title||e.current.id}</span
            >
          </div>`:""}
      ${r&&n>0?c`<div class="board-card__roll-list">
            ${l.map((a,u)=>I_(a,u+1,t.childChips?t.childChips(a):null,t.onChildClick))}
          </div>`:""}
    </div>
  `}var L_={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"mrg",close:"mrg"},Tc={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"merge",close:"close"},Ec={quick_fix:["impl","close"],spec_backed:["spec","impl","pr","merge"],full_plan:["spec","plan","impl","pr","merge"]},P_={review:"\u2713",skip:"\u2298"},or={none:"\uBBF8\uB3C4\uB2EC",dim:"\uC9C4\uD589 \uC911",stale:"\uC7AC\uAC80\uD1A0 \uD544\uC694",review:"\uAC80\uD1A0 \uC644\uB8CC",skip:"\uAC80\uD1A0 \uC0DD\uB7B5",done:"\uC644\uB8CC"};function D_(e,t,n){if(!(n==="in_progress"||n==="resolved"))return null;for(let o of e){let s=t[o];if(s&&s.fill==="dim"&&s.stale!==!0)return o}return null}function Cc(e){let t=e&&e.fill||"none";return t==="none"?or.none:e&&e.stale===!0?or.stale:t==="dim"?or.dim:e&&e.glyph==="review"?or.review:e&&e.glyph==="skip"?or.skip:or.done}function M_(e){if(!e||e.fill==="none"||!e.approval_state)return Cc(e);let t=[];return e.glyph==="review"?t.push(or.review):e.glyph==="skip"&&t.push(or.skip),e.approval_state==="missing"?t.push("\uC2B9\uC778 \uD544\uC694"):e.approval_state==="stale"?t.push("\uC7AC\uC2B9\uC778 \uD544\uC694"):e.approval_state==="unknown"?t.push("\uC2B9\uC778 \uD655\uC778 \uBD88\uAC00"):t.push("\uC2B9\uC778 \uC644\uB8CC"),t.join(" \xB7 ")}function N_(e,t,n,r){let o=L_[e]||e,s=t&&t.fill||"none",i=!!t&&t.stale===!0,l=P_[t&&t.glyph||""]||"",a="bar";s==="dim"?a+=` b-${o} dim`:s==="full"&&(a+=` b-${o} full`),i&&(a+=" stale"),n&&(a+=" cur");let u=s==="none"?"lbl":`lbl l-${o} on`,p=n?`color: var(--stage-${o}-on)`:"",f=Tc[e]||e,g=r?Rc(t):null;if(!g)return c`
      <div class="seg">
        <div class=${a} style=${p}>${l}</div>
        <div class=${u}>${f}</div>
      </div>
    `;let m=`${f} \uBB38\uC11C \uC5F4\uAE30 \xB7 ${g.path}`;return c`
    <button
      type="button"
      class="seg seg--doc"
      aria-label=${m}
      title=${m}
      @click=${k=>{k.preventDefault(),k.stopPropagation(),r(k,g,e)}}
    >
      <div class=${a} style=${p}>${l}</div>
      <div class=${u}>${f}</div>
    </button>
  `}function Rc(e){let t=e?e.doc:null;return!t||typeof t.path!="string"||t.path.length===0?null:t}function Cs(e,t,n={}){if(!e||!e.stages)return"";let r=n.onOpenDoc,o=Ec[e.route]||Ec.spec_backed,s=e.stages,i=D_(o,s,String(t||"open")),l=`\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uC9C4\uD589: ${o.map(u=>`${Tc[u]||u} ${u==="plan"?M_(s[u]||{}):Cc(s[u]||{})}`).join(" \xB7 ")}`,a=!!r&&o.some(u=>Rc(s[u]||{})!==null);return c`
    <div
      class="stp"
      role=${a?"group":"img"}
      aria-label=${l}
    >
      ${o.map(u=>N_(u,s[u]||{},u===i,r))}
    </div>
  `}function q_(e){return typeof e!="number"||!Number.isFinite(e)?"":`P${Math.max(0,Math.min(4,e))}`}var Oc=2;function Ic(e){let t=e.slice(0,Oc).join(", "),n=e.length-Oc;return`\u26D3 blocked: ${t}${n>0?` +${n}`:""}`}function j_(e,t){if(!t)return[];let n=[],r=Array.isArray(t.blockers)?t.blockers:[],o=[],s=[];for(let i of r)(Un(e,i)?s:o).push(i);return o.length>0&&n.push(c`<span class="ctl-chip ctl-chip--blocked-dep"
        >${Ic(o)}</span
      >`),s.length>0&&n.push(c`<span class="ctl-chip ctl-chip--blocked-foreign"
        >${Ic(s)}</span
      >`),n}function F_(e){if(!e||typeof e!="object")return null;let t=e.awaiting_user;if(typeof t!="string")return null;let n=t.trim();return n.length===0?null:c`<span class="ctl-chip ctl-chip--blocked"
    >${`\u23F8 \uC0AC\uC6A9\uC790 \uB9AC\uBDF0 \uD544\uC694: ${n}`}</span
  >`}function oa(e){return e==="delegated"?"\uC704\uC784":e==="main"?"\uBA54\uC778":null}function Rs(e){return e.effort?`${e.actor}:${e.effort}`:e.actor}function Wn(e){return`${e.kind}:${Rs(e)}@${e.sha}`}function Os(e,t){if(!e)return null;let n=oa(e.kind),r=e.reason,o=e.kind==="delegated"?r===null:typeof r=="string"&&r.trim().length>0&&!/[\r\n]/.test(r);if(!n||!o)return null;let s=oa(t?.kind),i=s!==null&&t?.kind!==e.kind,l=`\uACC4\uD68D \xB7 ${n}${i?` \u2192 ${s}`:""}`,a=`planned_execution ${e.kind}${typeof r=="string"?`:${r}`:""}`,u=t?` \xB7 exec_receipt ${Wn(t)}`:"";return{kind:e.kind,label:l,title:`${a}${u}`}}function Lc(e,t){let n=Os(e,t);return n?c`<span
        class="ctl-chip ctl-chip--planned"
        data-kind=${n.kind}
        title=${n.title}
        >${n.label}</span
      >`:null}function B_(e){if(!e)return null;let t=oa(e.kind);return t?c`<span
    class="ctl-chip ctl-chip--exec-receipt"
    title=${`exec_receipt ${Wn(e)}`}
    >${`\uC2E4\uD589 \xB7 ${t}`}</span
  >`:null}function U_(e,t){let n=t.policy||null,r=e.workflow&&e.workflow.chips||{},o=[];if(r.route&&rr(n,"route")){let l=r.route_source==="derived";o.push(c`<span
        class="ctl-chip ctl-chip--route${l?" is-derived":""}"
        title=${l?"route \uBBF8\uD540 (metadata unset)":"route"}
        >${l?"unset":r.route}</span
      >`)}if(r.fast_track&&rr(n,"fast_track")&&o.push(c`<span class="ctl-chip ctl-chip--ft">⚡ fast_track</span>`),r.pr&&rr(n,"pr")){let l=r.pr.number;o.push(c`<span class="ctl-chip ctl-chip--pr"
        >${`PR${l!=null?` #${l}`:""}`}</span
      >`)}let s=Lc(r.planned_execution,r.exec_receipt);if(s&&o.push(s),r.exec_receipt){let l=r.exec_receipt;o.push(c`<span
        class="ctl-chip ctl-chip--exec-receipt"
        title=${`exec_receipt ${Wn(l)}`}
        >${`exec ${l.kind==="delegated"?Rs(l):`main:${l.actor}`} \xB7 ${l.sha.slice(0,7)}`}</span
      >`)}if(r.impl_entry){let l=r.impl_entry;o.push(c`<span
        class="ctl-chip ctl-chip--impl-entry"
        title=${`impl_entry ${l.actor}@${l.sha}`}
        >${`impl ${l.actor} \xB7 ${l.sha.slice(0,7)}`}</span
      >`)}for(let l of Sc(e.labels,n))o.push(c`<span class="ctl-chip ctl-chip--label">${l}</span>`);if(e.from_id&&rr(n,"from")&&o.push(c`<button
        type="button"
        class="ctl-chip ctl-chip--from"
        title=${`\uCD9C\uCC98 ${e.from_id} \uC5F4\uAE30`}
        @click=${l=>{l.stopPropagation(),t.onFromChipClick&&t.onFromChipClick(l,String(e.from_id))}}
      >
        ↩ from ${e.from_id}
      </button>`),rr(n,"blocked")){let l=F_(e.metadata);l&&o.push(l),o.push(...j_(e.id,e.blocked_info))}return t.cleanupFailureFor&&t.cleanupFailureFor(e.id)&&rr(n,"blocked")&&o.push(c`<span class="ctl-chip ctl-chip--cleanup">⚠ 정리 멈춤</span>`),o.length===0?"":c`<div class="board-card__chips">${o}</div>`}function W_(e){let t=sn(e.created_at),n=sn(e.updated_at);return!t&&!n?"":c`<span class="board-card__times">
    ${t?c`<span
          class="board-card__time"
          title=${`\uC0DD\uC131 ${Zt(e.created_at)}`}
          >생성 ${t}</span
        >`:""}
    ${t&&n?c`<span class="board-card__time-sep">·</span>`:""}
    ${n?c`<span
          class="board-card__time"
          title=${`\uC218\uC815 ${Zt(e.updated_at)}`}
          >수정 ${n}</span
        >`:""}
  </span>`}function z_(e,t){let n=t.rollupFor?t.rollupFor(e.id):{total:0,count:0,current:null,children:[]};return Ts(n,{parent_id:e.id,expanded:t.isExpanded?t.isExpanded(e.id):!0,trailing:W_(e),empty_label:"children \uC5C6\uC74C",childChips:sa,onToggle:r=>t.onRollupToggle&&t.onRollupToggle(r,e.id),onChildClick:(r,o)=>t.onChildClick&&t.onChildClick(r,o)})}function sa(e){let t=e?.workflow?.chips?.planned_execution,n=e?.workflow?.chips?.exec_receipt;return Os(t,n)?c`<span class="board-card__roll-child-chips">
    ${Lc(t,n)}
    ${B_(n)}
  </span>`:null}function Is(e,t){let n=q_(e.priority);return c`
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
      ${e.workflow&&rr(t.policy||null,"stepper")?Cs(e.workflow,e.status,{onOpenDoc:t.onOpenDoc}):""}
      ${z_(e,t)}
    </article>
  `}function zr(e,t){let n=Array.isArray(e.items)?e.items.length:0,r=e.is_closed===!0;return c`
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
              ${Hl.map(s=>c`<option
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
        ${e.items.map(s=>Is(s,t))}
      </div>
    </section>
  `}function Pc(e,t,n){return c`
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
          ${e.items.length===0?c`<div class="deferred-popup__empty">Deferred 이슈 없음</div>`:e.items.map(r=>Is(r,t))}
        </div>
      </div>
    </dialog>
  `}var H_=[{value:"",label:"\uC6B0\uC120\uC21C\uC704"},{value:"0",label:"P0"},{value:"1",label:"P1"},{value:"2",label:"P2"},{value:"3",label:"P3"},{value:"4",label:"P4"}],G_=[{value:"",label:"\uD0C0\uC785"},{value:"bug",label:"bug"},{value:"feature",label:"feature"},{value:"task",label:"task"},{value:"epic",label:"epic"},{value:"chore",label:"chore"}],K_=[{value:"created_desc",label:"\uC0DD\uC131 \uCD5C\uC2E0\uC21C"},{value:"created_asc",label:"\uC0DD\uC131 \uC624\uB798\uB41C\uC21C"},{value:"updated_desc",label:"\uC218\uC815 \uCD5C\uC2E0\uC21C"},{value:"priority",label:"\uC6B0\uC120\uC21C\uC704\uC21C"},{value:"manual",label:"\uC218\uB3D9(\uB4DC\uB798\uADF8)"}];function Y_(e,t,n){let r=e.labels.length,o=r>0?`\uB77C\uBCA8 ${r}`:"\uB77C\uBCA8";return c`
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
  `}function Dc(e,t,n){return c`
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
  `}var V_=200,X_={"ready-col":"open","in-progress-col":"in_progress","resolved-col":"resolved","closed-col":"closed"},Q_=new Set(["blocked-col","ready-col","in-progress-col","resolved-col"]),Mc="beads-ui.board.sort",Nc=new Set(["created_desc","created_asc","updated_desc","priority","manual"]);function Z_(){try{let e=window.localStorage.getItem(Mc);if(e&&Nc.has(e))return e}catch{}return"created_desc"}function qc(e,t){let n=It("views:board"),r=t.gotoIssue,o=t.issueStores,s=t.transport,i=t.uiOrderStore,l=t.displayPolicyStore,a=t.workerQueueStore,u=t.onClosedRangeChange,p=t.onNewIssue,f=t.openDoc,g=t.closedRange||ys,m=o?Wr(o,i):null,k=xc({transport:s,uiOrderStore:i}),R=[],B=[],X=[],se=[],j=[],q=[],C=!1,I=0,F=Z_(),V=new Map,Q=new Map,P=new Map,K=new Set,H={search:"",priority:"",type:"",labels:[]},ee=!1,ke=null;function Re(ae){return String(ae.status||"open")==="open"}function ne(ae){return String(ae.status||"open")==="open"}function D(ae){let ie=H.search.trim().toLowerCase(),$=H.priority,M=H.type,oe=H.labels;return ae.filter(te=>{if(ie){let le=String(te.id||"").toLowerCase(),Fe=String(te.title||"").toLowerCase();if(!le.includes(ie)&&!Fe.includes(ie))return!1}if($!==""&&String(te.priority)!==$||M!==""&&String(te.issue_type||"")!==M)return!1;if(oe.length>0){let le=Array.isArray(te.labels)?te.labels:[];if(!oe.some(Fe=>le.includes(Fe)))return!1}return!0})}function ve(){let ae=new Set;for(let ie of[R,B,X,se,j,q])for(let $ of ie){let M=Array.isArray($.labels)?$.labels:[];for(let oe of M)typeof oe=="string"&&oe.length>0&&ae.add(oe)}return Array.from(ae).sort()}function Ee(){return H.search.trim()!==""||H.priority!==""||H.type!==""||H.labels.length>0}function T(){try{if(m){let ae=m.selectBoardColumn("tab:board:in-progress","in_progress",F),ie=m.selectBoardColumn("tab:board:blocked","blocked",F).filter(ne),$=new Set(ae.map(Ue=>Ue.id)),M=m.selectBoardColumn("tab:board:ready","ready",F).filter(Ue=>Re(Ue)&&!$.has(Ue.id)),oe=m.selectBoardColumn("tab:board:resolved","resolved",F),te=m.selectBoardColumn("tab:board:deferred","deferred",F),le=m.selectBoardColumn("tab:board:closed","closed").slice(0,V_),Fe=[...ie,...M,...ae,...oe,...le];Z(Fe);let Ke=new Set;for(let Ue of Fe)Ue&&Ue.id&&!xs(Ue)&&Ke.add(Ue.id);let Je=!Ee();R=Je?ko(ie,Ke):ie,B=Je?ko(M,Ke):M,X=Je?ko(ae,Ke):ae,se=Je?ko(oe,Ke):oe,j=te,I=te.length,q=Je?ko(le,Ke):le,V=new Map;for(let Ue of R)V.set(Ue.id,"open");for(let Ue of B)V.set(Ue.id,"open");for(let Ue of X)V.set(Ue.id,"in_progress");for(let Ue of se)V.set(Ue.id,"resolved");for(let Ue of j)V.set(Ue.id,"deferred");for(let Ue of q)V.set(Ue.id,"closed");Q=new Map;for(let Ue of R)Q.set(Ue.id,"blocked-col");for(let Ue of B)Q.set(Ue.id,"ready-col");for(let Ue of X)Q.set(Ue.id,"in-progress-col");for(let Ue of se)Q.set(Ue.id,"resolved-col");for(let Ue of q)Q.set(Ue.id,"closed-col")}Be()}catch{R=[],B=[],X=[],se=[],j=[],q=[],P=new Map,Be()}}function Z(ae){P=As(ae)}function we(ae){return Ss(P,ae)}function he(ae){return!K.has(ae)}function Te(ae,ie){ae.preventDefault(),ae.stopPropagation(),K.has(ie)?K.delete(ie):K.add(ie),Be()}function ge(ae,ie){ae.preventDefault(),ae.stopPropagation(),r(ie)}function Oe(ae,ie){ae.preventDefault(),ae.stopPropagation(),r(ie)}function Ge(ae,ie){ke||r(ie)}function et(ae,ie){ae.preventDefault(),ae.stopPropagation(),J_(ie).then($=>{$&&ye("\uBCF5\uC0AC\uB428","success",1200)})}function L(ae,ie){ke=ie,ae.dataTransfer&&(ae.dataTransfer.setData("text/plain",ie),ae.dataTransfer.effectAllowed="move"),ae.target.classList.add("board-card--dragging")}function ue(ae){ae.target.classList.remove("board-card--dragging"),Nt(),setTimeout(()=>{ke=null},0)}function re(ae){let ie=String(ae.target.value||"");!ie||ie===g||(g=ie,u&&u(ie),Be())}function pe(){return l?l.get():null}function Ce(ae){let ie=a?a.get():null,$=ie?ie.cleanup_failed:null;if(!$||typeof $!="object"||Array.isArray($))return null;let M=$[ae];return!M||typeof M!="object"||Array.isArray(M)?null:M}let _e={onCardClick:Ge,onCopyId:et,onDragStart:L,onDragEnd:ue,onClosedRangeChange:re,rollupFor:we,isExpanded:he,onRollupToggle:Te,onChildClick:ge,onFromChipClick:Oe,onOpenDoc:f?(ae,ie)=>f(ie):void 0,cleanupFailureFor:Ce,get policy(){return pe()}};function xe(ae,ie){ke||(b(),r(ie))}function We(ae,ie){ae.preventDefault(),ae.stopPropagation(),b(),r(ie)}let Qe={..._e,onCardClick:xe,onChildClick:We,onFromChipClick:We,onOpenDoc:f?(ae,ie)=>{b(),f(ie)}:void 0,get policy(){return pe()}};function qe(ae){let ie=ae.target,$=e.querySelector(".board-filter__labels");ie&&$&&$.contains(ie)||Ae()}function J(ae){ae.key==="Escape"&&Ae()}function U(){ee||(ee=!0,document.addEventListener("mousedown",qe),document.addEventListener("keydown",J),Be())}function Ae(){ee&&(ee=!1,document.removeEventListener("mousedown",qe),document.removeEventListener("keydown",J),Be())}function lt(ae){ae.key==="Escape"&&b()}function st(){C||(C=!0,document.addEventListener("keydown",lt),Be())}function b(){C&&(C=!1,document.removeEventListener("keydown",lt),Be())}let z={onClose:b,onOverlayClick(ae){ae.target===ae.currentTarget&&b()}},Ie={onSearchInput(ae){H.search=String(ae.target.value||""),T()},onPriorityChange(ae){H.priority=String(ae.target.value||""),T()},onTypeChange(ae){H.type=String(ae.target.value||""),T()},onSortChange(ae){let ie=String(ae.target.value||"");if(!(!Nc.has(ie)||ie===F)){F=ie;try{window.localStorage.setItem(Mc,ie)}catch{}T()}},onDeferredToggle(){C?b():st()},onLabelMenuToggle(){ee?Ae():U()},onLabelToggle(ae){let ie=H.labels.indexOf(ae);ie===-1?H.labels.push(ae):H.labels.splice(ie,1),T()},onLabelClear(){H.labels.length!==0&&(H.labels=[],T())},onNewIssue(){p&&p()}};function Le(){return c`
      <div class="board-view">
        ${Dc(H,Ie,{sort_mode:F,deferred_popup_open:C,deferred_count:I,label_options:ve(),label_menu_open:ee})}
        <div class="board-root">
          ${zr({title:"Blocked",id:"blocked-col",items:D(R)},_e)}
          ${zr({title:"Ready",id:"ready-col",items:D(B)},_e)}
          ${zr({title:"In progress",id:"in-progress-col",items:D(X)},_e)}
          ${zr({title:"Resolved",id:"resolved-col",items:D(se)},_e)}
          ${zr({title:"Closed",id:"closed-col",items:D(q),is_closed:!0,closed_range:g},_e)}
        </div>
        ${C?Pc({items:D(j),count:I},Qe,z):""}
      </div>
    `}function Be(){ot(Le(),e),He()}function He(){try{let ae=e.querySelector("#deferred-popup");ae&&!ae.open&&(typeof ae.showModal=="function"?ae.showModal():ae.setAttribute("open",""));let ie=Array.from(e.querySelectorAll(".board-column, .deferred-popup__body"));for(let $ of ie)Array.from($.querySelectorAll(".board-card")).forEach((oe,te)=>{oe.tabIndex=te===0?0:-1})}catch{}}async function pt(ae,ie){if(!s){ye("\uC5F0\uACB0\uB418\uC9C0 \uC54A\uC544 \uC0C1\uD0DC\uB97C \uBCC0\uACBD\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error");return}try{await s("update-status",{id:ae,status:ie}),ye("\uC0C1\uD0DC \uBCC0\uACBD\uB428","success",1500)}catch($){n("update-status failed: %o",$),ye("\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328","error")}}function xt(ae){switch(ae){case"blocked-col":return R;case"ready-col":return B;case"in-progress-col":return X;case"resolved-col":return se;default:return[]}}function Mt(ae,ie,$){if(!s||!i)return;let M=xt(ae),oe=M.find(Je=>Je.id===ie);if(!oe)return;let te=M.filter(Je=>Je.id!==ie),le=$.closest?$.closest(".board-card"):null,Fe=te.length;if(le){let Je=le.getAttribute("data-issue-id");if(Je===ie)return;let Ue=te.findIndex(kt=>kt.id===Je);Ue>=0&&(Fe=Ue)}let Ke=te.slice();Ke.splice(Fe,0,oe),k.applyReorder(ie,Ke,Fe)}function Nt(){for(let ae of Array.from(e.querySelectorAll(".board-column--drag-over")))ae.classList.remove("board-column--drag-over")}let mt=null;e.addEventListener("dragover",ae=>{ae.preventDefault(),ae.dataTransfer&&(ae.dataTransfer.dropEffect="move");let $=ae.target.closest(".board-column");$&&$!==mt&&(mt&&mt.classList.remove("board-column--drag-over"),$.classList.add("board-column--drag-over"),mt=$)}),e.addEventListener("dragleave",ae=>{let ie=ae.relatedTarget;(!ie||!e.contains(ie))&&mt&&(mt.classList.remove("board-column--drag-over"),mt=null)}),e.addEventListener("drop",ae=>{ae.preventDefault(),mt&&(mt.classList.remove("board-column--drag-over"),mt=null);let ie=ae.target,$=ie.closest(".board-column");if(!$)return;let M=ae.dataTransfer?.getData("text/plain")||"";if(!M)return;let oe=$.id,te=Q.get(M);if(te&&te===oe){if(Q_.has(oe)){if(F!=="manual"){ye("\uC218\uB3D9(\uB4DC\uB798\uADF8) \uC815\uB82C \uBAA8\uB4DC\uC5D0\uC11C\uB9CC \uC21C\uC11C\uB97C \uBC14\uAFC0 \uC218 \uC788\uC2B5\uB2C8\uB2E4","warning",2e3);return}Mt(oe,M,ie)}return}let le=X_[oe];if(!le){ye("\uC5EC\uAE30\uB85C\uB294 \uC62E\uAE38 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","warning",1500);return}V.get(M)!==le&&pt(M,le)}),e.addEventListener("keydown",ae=>{let ie=ae.target;if(!(ie instanceof HTMLElement))return;let $=String(ie.tagName||"").toLowerCase();if($==="input"||$==="textarea"||$==="select"||$==="button"||$==="a"||ie.isContentEditable===!0)return;let M=ie.closest(".board-card");if(!M)return;let oe=String(ae.key||"");if(oe==="Enter"||oe===" "){ae.preventDefault();let Ke=M.getAttribute("data-issue-id");Ke&&r(Ke);return}if(oe!=="ArrowUp"&&oe!=="ArrowDown"&&oe!=="ArrowLeft"&&oe!=="ArrowRight")return;ae.preventDefault();let te=M.closest(".board-column");if(!te)return;let le=Array.from(te.querySelectorAll(".board-card")),Fe=le.indexOf(M);if(oe==="ArrowDown"&&Fe<le.length-1){ct(M,le[Fe+1]);return}if(oe==="ArrowUp"&&Fe>0){ct(M,le[Fe-1]);return}if(oe==="ArrowLeft"||oe==="ArrowRight"){let Ke=Array.from(e.querySelectorAll(".board-column")),Je=Ke.indexOf(te),Ue=oe==="ArrowRight"?1:-1,kt=Je+Ue;for(;kt>=0&&kt<Ke.length;){let qt=Ke[kt].querySelector(".board-card");if(qt){ct(M,qt);return}kt+=Ue}}});function ct(ae,ie){try{ae.tabIndex=-1,ie.tabIndex=0,ie.focus()}catch{}}let At=null;m&&m.subscribe&&(At=m.subscribe(()=>{try{T()}catch{}}));let Rt=null;l&&l.subscribe&&(Rt=l.subscribe(()=>{try{T()}catch{}}));let Lt=null;return a&&a.subscribe&&(Lt=a.subscribe(()=>{Be()})),{async load(){n("load"),T()},clear(){Ae(),b(),At&&(At(),At=null),Rt&&(Rt(),Rt=null),Lt&&(Lt(),Lt=null),e.replaceChildren(),R=[],B=[],X=[],se=[],j=[],q=[],V=new Map,Q=new Map}}}function ko(e,t){return e.filter(n=>{let r=xs(n);return!(r&&t.has(r))})}async function J_(e){try{if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")return await navigator.clipboard.writeText(String(e)),!0;let t=document.createElement("textarea");t.value=String(e),t.style.position="fixed",t.style.left="-9999px",document.body.appendChild(t),t.select();let n=!1;try{n=document.execCommand("copy")}finally{t.remove()}return n}catch{return!1}}var on=e=>e??Pt;async function an(e){let t=String(e);if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")try{return await navigator.clipboard.writeText(t),!0}catch{}try{let n=document.createElement("textarea");n.value=t,n.style.position="fixed",n.style.left="-9999px",document.body.appendChild(n),n.select();let r=!1;try{r=document.execCommand("copy")}finally{n.remove()}return r}catch{return!1}}function Ar(e){return[typeof e.runner=="string"?e.runner:null,typeof e.model=="string"?e.model:null,typeof e.effort=="string"?e.effort:null,e.speed==="fast"?"Fast":null].filter(Boolean).join(" \xB7 ")}function $o(e){return typeof e.resumed_from!="string"||e.resumed_from.length===0?null:`${e.continuation_mode==="session"?"session \uC774\uC5B4\uBC1B\uC74C":e.continuation_mode==="fresh"?"\uC0C8 session\uC73C\uB85C \uC774\uC5B4\uBC1B\uC74C":"\uC774\uC804 attempt\uC5D0\uC11C \uC774\uC5B4\uBC1B\uC74C"} (from ${e.resumed_from})`}function em(e,t=document){let n=t.createElement("dialog");n.className="continuation-dialog";let r=t.createElement("button"),o=t.createElement("button"),s=t.createElement("button"),i=t.createElement("h2"),l=t.createElement("p");return i.textContent="\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4",l.textContent=`${Ar(e.prior||{})||"\uC774\uC804 \uC124\uC815"} \u2192 ${Ar(e.current||{})||"\uD604\uC7AC \uC124\uC815"}`,r.type="button",r.textContent="\uAE30\uC874 session \uC774\uC5B4\uD558\uAE30",r.disabled=e.prior_available===!1,o.type="button",o.textContent="\uD604\uC7AC preset\uC73C\uB85C \uC0C8 session",s.type="button",s.textContent="\uCDE8\uC18C",n.append(i,l,r,o,s),t.body.append(n),new Promise(a=>{let u=p=>{typeof n.close=="function"&&n.close(),n.remove(),a(p)};r.addEventListener("click",()=>u("prior_session")),o.addEventListener("click",()=>u("fresh_current")),s.addEventListener("click",()=>u(null)),n.addEventListener("cancel",p=>{p.preventDefault(),u(null)}),typeof n.showModal=="function"?n.showModal():n.setAttribute("open","")})}async function zn(e,t,n={}){let r=e;for(n.onResult?.(r);r?.continuation_mismatch;){let o=r.continuation_mismatch,s=await em(o);if(s===null)return r;r=await t(s,o.decision_token),n.onResult?.(r),r?.conflict&&n.refresh&&(r=await n.refresh(r),n.onResult?.(r))}return r}var tm=["workflow_mode","spec_review_model","spec_review_effort","spec_review_speed","plan_review_model","plan_review_effort","plan_review_speed","impl_review_model","impl_review_effort","impl_review_speed","impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed","quick_fix_impl_model","orchestration_model","orchestration_effort","orchestration_speed"],jc={spec_review_effort:"spec_review_model",plan_review_effort:"plan_review_model",impl_review_effort:"impl_review_model"},Fc={spec_review_speed:"spec_review_model",plan_review_speed:"plan_review_model",impl_review_speed:"impl_review_model"},nm=new Set(["native-fixed-posture","unsupported","claude-runner-model-default","catalog-validated","provider-tier-or-runtime-model-default","actual-effort"]);function Gt(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function Dt(e){return typeof e=="string"&&e.length>0?e:null}function Gr(e){return e.startsWith("gpt-")?e.slice(4):e}function wt(e,t,n,r,o){return{value:e,source:t,display:n,full_value:r,resolution:o}}function Uc(e,t,n){let r=Dt(t[e]);if(r!==null)return{value:r,source:"pin"};let o=Dt(n[e]);return o===null?null:{value:o,source:"global"}}function Hr(e,t,n,r){return Uc(e,t,n)||{value:r,source:"base"}}function ia(e,t,n,r){let o=n?.implementation?.model_catalog;if(t&&Gt(o?.[t])){let i=Dt(o[t][e]);if(i!==null)return i}if(t&&Array.isArray(o?.[t])&&o[t].includes(e))return e;if(!t&&Gt(o)){for(let i of Object.values(o))if(Gt(i)){let l=Dt(i[e]);if(l!==null)return l}else if(Array.isArray(i)&&i.includes(e))return e}let s=r?.model_index?.[e];return Dt(r?.runners?.[s]?.models?.[e]?.id)||e}function rm(e,t){return Dt(t?.review?.reviewers?.[e]?.model)||e}function Sr(e,t,n=!1){if(e==="default")return wt(e,t,`default (\uC77C\uBC18 \xB7 ${t==="pin"?"\uD540":"\uC804\uC5ED \uACE0\uC815"})`,e,"explicit");let r=n?Gr(e):e;return wt(e,t,r,e,"explicit")}function Wc(e,t,n){let r=t?.implementation?.model_catalog?.[e],o=[];Gt(r)?o.push(...Object.keys(r)):Array.isArray(r)&&o.push(...r.filter(i=>typeof i=="string"));let s=n?.runners?.[e]?.models;if(Gt(s))for(let i of Object.keys(s))o.includes(i)||o.push(i);return o}function om(e,t){let n=[],r=e?.implementation?.model_catalog;Gt(r)&&n.push(...Object.keys(r));let o=t?.runners;if(Gt(o))for(let s of Object.keys(o))n.includes(s)||n.push(s);return n}function sm(e,t,n){if(e===null)return{runtime:null,offered:!1};let r=!1;for(let o of om(t,n)){let s=Wc(o,t,n);if(s.length>0&&(r=!0),s.includes(e))return{runtime:o,offered:!0}}return{runtime:null,offered:r}}function aa(e){return wt(e.value,e.source,`${e.value} (\uBE44\uD638\uD658)`,e.value,"incompatible")}function Bc(e,t,n){let r=Uc(e,t,n);return r?Sr(r.value,r.source):wt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable")}function gn(e){let t=Gt(e.pin)?e.pin:{},n=Gt(e.global)?e.global:{},r=Gt(e.execution_defaults)?e.execution_defaults:null,o=r?.supported===!0&&Gt(r.session)?r.session:null,s=r?.supported===!0&&Gt(r.orchestration)?r.orchestration:null,i=Gt(e.runner_catalog)?e.runner_catalog:null,l=Dt(n.quick_fix_impl_model),a=sm(l,o,i),u={};if(o){let p=Hr("workflow_mode",t,n,Dt(o.workflow_mode_default));u.workflow_mode=p.source==="base"?wt(p.value,"base",p.value||"\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",p.value,"default"):Sr(p.value,p.source);for(let j of["spec_review","plan_review","impl_review"]){let q=`${j}_model`,C=Dt(j==="plan_review"?p.value==="fast_track"?o.plan_review?.fast_track_default:o.plan_review?.standard_recommended:o.review?.default),I=Hr(q,t,n,C);if(I.value===null)u[q]=wt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable");else if(I.value!=="self"&&I.value!=="skip"&&!Gt(o.review?.reviewers?.[I.value]))u[q]=aa(wt(I.value,I.source,"",null,"explicit"));else{let F=rm(I.value,o);u[q]=wt(I.value,I.source,Gr(F),F,I.source==="base"?"default":"explicit")}}for(let[j,q]of Object.entries(jc)){let C=u[q].value;if(C==="self"||C==="skip"){u[j]=wt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable");continue}let I=Dt(o.review?.reviewers?.[C||""]?.effort),F=Hr(j,t,n,I);u[j]=F.value===null?wt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"):wt(F.value,F.source,F.value,F.value,F.source==="base"?"default":"explicit")}for(let[j,q]of Object.entries(Fc)){let C=u[q];if(C.resolution==="incompatible"||C.value==="self"||C.value==="skip"){u[j]=wt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable");continue}if(C.resolution==="unavailable"){u[j]=wt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable");continue}let I=Hr(j,t,n,"default");u[j]=I.source==="base"?wt("default","base","default (\uC77C\uBC18)","default","default"):Sr(I.value,I.source)}let f=Gt(o.implementation?.default)?o.implementation.default:{},g=Dt(e.route),m=g!==null&&["quick_fix","spec_backed","full_plan"].includes(g),k=Gt(o.implementation?.route_defaults)?o.implementation.route_defaults:{},R=m&&Gt(k[g])?k[g]:{};for(let j of["impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"]){let q=Hr(j,t,n,j==="impl_dispatch"?Dt(R.dispatch)||Dt(f.dispatch):Dt(f[j.replace("impl_","")]));u[j]=q.value===null?wt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"):wt(q.value,q.source,q.value,q.value,q.source==="base"?"default":"explicit")}let B=Dt(t.impl_runtime),X=B==="inherit"?Dt(e.controller_runtime):B,se=g==="quick_fix"&&Dt(t.impl_dispatch)===null&&a.runtime!==null&&(B===null||X===a.runtime);if(se){let j=a.runtime,q=l;u.impl_dispatch=wt("delegated","global","\uC704\uC784 (\uC804\uC5ED quick_fix)","delegated","explicit"),B===null&&(u.impl_runtime=wt(j,"global",`${j} (\uC720\uB3C4)`,j,"explicit")),Dt(t.impl_model)===null&&(u.impl_model=wt(q,"global",q,q,"explicit"))}if(u.impl_dispatch.value==="main"){u.impl_dispatch.display="\uBA54\uC778";for(let j of["impl_runtime","impl_model","impl_effort","impl_speed"])u[j]=wt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable")}else{if(u.impl_dispatch.value==="delegated"&&!se&&(u.impl_dispatch.display="\uC704\uC784"),u.impl_runtime.value==="inherit"&&(u.impl_runtime.display=e.controller_runtime?`inherit (${e.controller_runtime})`:"inherit (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_runtime.resolution="dynamic"),u.impl_model.value!==null){let j=u.impl_runtime.value==="inherit"?Dt(e.controller_runtime):u.impl_runtime.value,q=j?Wc(j,o,i):[];if(u.impl_model.value!=="auto"&&q.length>0&&!q.includes(u.impl_model.value))u.impl_model=aa(u.impl_model);else{let C=ia(u.impl_model.value,j,o,i);u.impl_model.display=Gr(C),u.impl_model.full_value=C}}if(u.impl_effort.value==="auto"){let j=Dt(e.transport)||(u.impl_runtime.value==="codex"?"codex-native-spawn":u.impl_runtime.value==="claude"?"implement-claude":null),q=j?Dt(o.implementation?.effort_by_transport?.[j]?.auto):null;q&&!nm.has(q)?(u.impl_effort.display=`${q} (\uBE44\uD638\uD658)`,u.impl_effort.full_value=q,u.impl_effort.resolution="incompatible"):(u.impl_effort.display="auto (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_effort.resolution="dynamic")}u.impl_speed.value==="default"&&(u.impl_speed=u.impl_speed.source==="base"?wt("default","base","default (\uC77C\uBC18)","default","default"):Sr("default",u.impl_speed.source))}}else for(let p of tm.filter(f=>!f.startsWith("orchestration_")))u[p]=Bc(p,t,n);if(!o){for(let[p,f]of Object.entries(jc))(u[f].value==="self"||u[f].value==="skip")&&(u[p]=wt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable"));for(let[p,f]of Object.entries(Fc))(u[f].value==="self"||u[f].value==="skip")&&(u[p]=wt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable"));if(u.impl_dispatch.value==="main"){u.impl_dispatch.display="\uBA54\uC778";for(let p of["impl_runtime","impl_model","impl_effort","impl_speed"])u[p]=wt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable")}else u.impl_dispatch.value==="delegated"&&(u.impl_dispatch.display="\uC704\uC784"),u.impl_runtime.value==="inherit"&&(u.impl_runtime.display=e.controller_runtime?`inherit (${e.controller_runtime})`:"inherit (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_runtime.resolution="dynamic"),u.impl_effort.value==="auto"&&(u.impl_effort.display="auto (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_effort.resolution="dynamic")}for(let p of["orchestration_model","orchestration_effort","orchestration_speed"]){if(!s){u[p]=Bc(p,t,n);continue}let f=p.replace("orchestration_",""),g=Dt(s[f]),m=Hr(p,t,n,g);if(p==="orchestration_effort"&&m.source==="base"){u[p]=wt(null,"base","CLI \uAE30\uBCF8 (\uBBF8\uC9C0\uC815)",null,"default");continue}if(m.value===null){u[p]=wt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable");continue}if(p==="orchestration_model"){let k=m.source==="base"?Dt(s.model_id)||m.value:ia(m.value,null,o,i);u[p]=wt(m.value,m.source,Gr(k),k,m.source==="base"?"default":"explicit");continue}if(m.value==="default"){u[p]=m.source==="base"?wt("default","base","default (\uC77C\uBC18)","default","default"):Sr("default",m.source);continue}u[p]=Sr(m.value,m.source)}if(o)if(l===null){let p=u.orchestration_model.full_value;u.quick_fix_impl_model=wt(null,"base",p===null?"\uBA54\uC778":`\uBA54\uC778 (orchestration ${Gr(p)})`,null,"default")}else if(a.runtime!==null){let p=ia(l,a.runtime,o,i);u.quick_fix_impl_model=wt(l,"global",Gr(p),p,"explicit")}else a.offered?u.quick_fix_impl_model=aa(wt(l,"global","",null,"explicit")):u.quick_fix_impl_model=Sr(l,"global");return u}function im(e,t){let n=t&&e.value==="default"?"default (\uC77C\uBC18)":e.display;if(!t||e.source==="pin")return`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 ${e.display}`;let r=e.source==="global"?"\uC804\uC5ED":"harness";return`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 ${n} (${r})`}function Ls(e){let t=Gt(e.pin)?e.pin:{},n=Gt(e.global)?e.global:{},r=Gt(e.resolution_global)?{...e.resolution_global}:{};delete r[e.key];let o=f=>{let g={...r,...f};return gn({pin:e.layer==="pin"?g:t,global:e.layer==="pin"?n:g,execution_defaults:e.execution_defaults,runner_catalog:e.runner_catalog,route:e.route,controller_runtime:e.controller_runtime})},s=e.layer==="pin"?t:n,i={...s};delete i[e.key];let l=o(i)[e.key],a=o(s)[e.key],u=Dt(s[e.key]),p=[...e.choices];return u!==null&&!p.includes(u)&&p.unshift(u),{unset_label:im(l,e.layer==="pin"),full_value:l.full_value,unavailable:l.resolution==="unavailable",disabled:a?.resolution==="not_applicable",options:p.map(f=>{let g=o({...s,[e.key]:f})[e.key];return{value:f,label:g.display,full_value:g.full_value}})}}function Kr(e=document){let t=e.createElement("dialog");t.className="resume-instructions-dialog";let n=e.createElement("h2"),r=e.createElement("textarea"),o=e.createElement("div"),s=e.createElement("button"),i=e.createElement("button");return n.textContent="\uC138\uC158 \uC774\uC5B4\uD558\uAE30",r.placeholder="\uCD94\uAC00 \uC9C0\uCE68 (\uC120\uD0DD) \u2014 \uBE44\uC6CC\uB450\uBA74 \uAE30\uBCF8 \uC808\uCC28\uB85C \uC7AC\uAC1C",r.maxLength=4e3,o.className="resume-instructions-dialog__actions",s.type="button",s.textContent="\uC774\uC5B4\uD558\uAE30",i.type="button",i.textContent="\uCDE8\uC18C",o.append(s,i),t.append(n,r,o),e.body.append(t),new Promise(l=>{let a=!1,u=f=>{a||(a=!0,typeof t.close=="function"&&t.close(),t.remove(),l(f))},p=()=>u(r.value.trim());s.addEventListener("click",p),i.addEventListener("click",()=>u(null)),r.addEventListener("keydown",f=>{f.key==="Enter"&&(f.ctrlKey||f.metaKey)&&(f.preventDefault(),p())}),t.addEventListener("cancel",f=>{f.preventDefault(),u(null)}),typeof t.showModal=="function"?t.showModal():t.setAttribute("open",""),r.focus()})}function la(e){return`session:${e.provider}:${e.session_id}`}function xo(e){return`${e.provider} \xB7 ${e.session_id.slice(0,8)}`}function am(e,t){return e.current&&t==="in_progress"&&e.locality==="local"?"running":"done"}function Yr(e,t,n,r){return{attempt_id:la(e),session_ref:{bead_id:t,provider:e.provider,session_id:e.session_id},...typeof r=="string"&&r.length>0?{root_dir:r}:{},hide_prompt:!0,meta:{runner:e.provider,label:xo(e),session_id:e.session_id,...typeof e.resume_command=="string"&&e.resume_command.length>0?{resume_command:e.resume_command}:{},status:am(e,n)}}}var ca="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4",lm="\uBD84\uD574 \uC5C6\uC74C \u2014 \uCD1D\uB7C9\uB9CC \uBCF4\uACE0\uB428",zc="\uBD84\uD574 \uC5C6\uB294 leg";function Ut(e){return typeof e=="number"&&Number.isFinite(e)?e:0}var Nn=["input_tokens","output_tokens","cache_read_input_tokens","cache_creation_input_tokens"],Vr=[...Nn,"reasoning_output_tokens"],cm={codex:["implementation","review-consult"],claude:["subagent"]};function ua(e){return!e||typeof e!="object"?!1:Number.isFinite(e.total_tokens)&&!Nn.some(t=>Number.isFinite(e[t]))}function um(e){return!e||typeof e!="object"?!1:Vr.some(t=>Number.isFinite(e[t]))}function da(e){let t=0;for(let n of Nn)t+=Ut(e?.[n]);return t}function dm(e){return!e||typeof e!="object"?!1:Nn.some(t=>Number.isFinite(e[t]))}function Hc(e){return!e||typeof e!="object"?!1:Vr.some(t=>Number.isFinite(e[t]))||Number.isFinite(e.total_tokens)}function pm(e){let t={};for(let n of Vr)e&&Number.isFinite(e[n])&&(t[n]=e[n]);return t}function Gc(e){let t={};for(let n of Vr)Number.isFinite(e[n])&&(t[n]=e[n]);return Number.isFinite(e.total_tokens)&&(t.total_tokens=e.total_tokens),e.replayed===!0&&(t.replayed=!0),typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&(t.total_cost_usd=e.total_cost_usd),t}function Kc(e,t){return ua(t)?Ut(t.total_tokens):e==="codex"?Ut(t.input_tokens)+Ut(t.output_tokens):da(t)}function fm(e){return e==="claude"?"Claude":"Codex"}function _m(e){return`\u03C4 ${Vc(e)}`}function mm(e,t){let n=t.breakdown||{},r=Ut(t.total_only_subtotal);if(ua(n)||r>0&&!um(n)){let u=[`\uCD1D ${t.subtotal.toLocaleString("en-US")}`,lm];return t.replayed&&u.push(ca),u.join(`
`)}let o=[`\uC785\uB825 ${Ut(n.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${Ut(n.output_tokens).toLocaleString("en-US")}`];e==="claude"?o.push(`\uCE90\uC2DC\uC77D\uAE30 ${Ut(n.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${Ut(n.cache_creation_input_tokens).toLocaleString("en-US")}`):(o.push(`\uCE90\uC2DC\uC77D\uAE30 ${Ut(n.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC4F0\uAE30 ${Ut(n.cache_creation_input_tokens).toLocaleString("en-US")}`),Number.isFinite(n.reasoning_output_tokens)&&o.push(`\uCD94\uB860\uCD9C\uB825 ${Ut(n.reasoning_output_tokens).toLocaleString("en-US")}`)),r>0&&o.push(`${zc} ${r.toLocaleString("en-US")}`);let s=e==="claude"?"\uC785\uB825 + \uCD9C\uB825 + \uCE90\uC2DC\uC77D\uAE30 + \uCE90\uC2DC\uC0DD\uC131":"\uC785\uB825 + \uCD9C\uB825",i=r>0?`${s} + ${zc}`:s,a=[e==="claude"?`Claude subtotal = ${i}`:`Codex subtotal = ${i}; \uCE90\uC2DC\uC77D\uAE30\xB7\uCE90\uC2DC\uC4F0\uAE30\xB7\uCD94\uB860\uCD9C\uB825\uC740 subtotal\uC5D0 \uD3EC\uD568\uB418\uC9C0 \uC54A\uB294 subset`,`\uCD1D ${t.subtotal.toLocaleString("en-US")}`,o.join(" \xB7 ")];return typeof t.total_cost_usd=="number"&&Number.isFinite(t.total_cost_usd)&&a.push(`$${t.total_cost_usd.toFixed(2)}`),t.replayed&&a.push(ca),a.join(`
`)}function rn(e){let t=[];if(!e||typeof e!="object"||!("providers"in e)||!e.providers)return t;for(let n of["claude","codex"]){let r=e.providers[n];r&&t.push({provider:n,label:`${fm(n)} ${_m(r.subtotal)}${typeof r.total_cost_usd=="number"&&Number.isFinite(r.total_cost_usd)?` \xB7 $${r.total_cost_usd.toFixed(2)}`:""}`,tooltip:mm(n,r)})}return t}function Ds(e){let t={},n={claude:!0,codex:!1},r={claude:0,codex:0};for(let o of e)if(!(!o||!o.providers))for(let s of["claude","codex"]){let i=o.providers[s];if(!i)continue;let l=t[s];l||(l={subtotal:0,breakdown:{}},t[s]=l),l.subtotal+=i.subtotal,Number.isFinite(i.total_only_subtotal)&&(l.total_only_subtotal=Ut(l.total_only_subtotal)+Ut(i.total_only_subtotal));for(let a of Vr)Number.isFinite(i.breakdown[a])&&(l.breakdown[a]=Ut(l.breakdown[a])+Ut(i.breakdown[a]));i.replayed&&(l.replayed=!0),s==="claude"&&(typeof i.total_cost_usd=="number"&&Number.isFinite(i.total_cost_usd)?r.claude+=i.total_cost_usd:n.claude=!1)}return t.claude&&n.claude&&(t.claude.total_cost_usd=r.claude),Object.keys(t).length===0?null:{providers:t,roles:{}}}function pa(e){return!e||typeof e!="object"?null:Gn({attempt:{...e,bead_id:"__attempt__"}},"__attempt__")}function gm(e){return e==="codex"?"codex":"claude"}function Mn(){return{subtotal:0,breakdown:pm(null),total_only:0,legs:[],replayed:!1,outer_count:0,outer_cost:0,outer_cost_count:0}}function Ps(e,t,n){e.subtotal+=t.subtotal,ua(t.usage)&&(e.total_only+=t.subtotal);for(let r of Vr)Number.isFinite(t.usage[r])&&(e.breakdown[r]=Ut(e.breakdown[r])+Ut(t.usage[r]));e.legs.push(t),t.replayed===!0&&(e.replayed=!0),n&&(e.outer_count+=1,typeof t.usage.total_cost_usd=="number"&&Number.isFinite(t.usage.total_cost_usd)&&(e.outer_cost+=t.usage.total_cost_usd,e.outer_cost_count+=1))}function Yc(e,t){let n={subtotal:e.subtotal,breakdown:e.breakdown};return e.total_only>0&&(n.total_only_subtotal=e.total_only),t&&(n.legs=e.legs),e.replayed&&(n.replayed=!0),n}function Vc(e){return e>=1e6?`${(e/1e6).toFixed(1)}M`:e>=1e3?`${(e/1e3).toFixed(1)}k`:String(e)}function Xr(e){return dm(e)?`\u03C4 ${Vc(da(e))}`:null}function Hn(e){let t=Xr(e);if(!t)return null;let n=e?.total_cost_usd;return typeof n=="number"&&Number.isFinite(n)?`${t} \xB7 $${n.toFixed(2)}`:t}function Ao(e){if(!e||typeof e!="object")return"";let t=[`\uC785\uB825 ${Ut(e.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${Ut(e.output_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC77D\uAE30 ${Ut(e.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${Ut(e.cache_creation_input_tokens).toLocaleString("en-US")}`];typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&t.push(`$${e.total_cost_usd.toFixed(2)}`);let n=[`\uCD1D ${da(e).toLocaleString("en-US")}`,t.join(" \xB7 ")];return e.replayed&&n.push(ca),n.join(`
`)}function Gn(e,t){let n={claude:Mn(),codex:Mn()},r={orchestrator:{claude:Mn(),codex:Mn()},implementation:{claude:Mn(),codex:Mn()},"review-consult":{claude:Mn(),codex:Mn()},subagent:{claude:Mn(),codex:Mn()}},o=new Set;for(let l of Object.values(e||{})){if(!l||l.bead_id!==t)continue;let a=l.usage;if(Hc(a)){let p=gm(l.runner),f=Gc(a),g={provider:p,role:"orchestrator",attempt_id:String(l.attempt_id||""),usage:f,subtotal:Kc(p,f)};f.replayed===!0&&(g.replayed=!0),typeof l.model=="string"&&(g.model=l.model),typeof l.session_id=="string"&&(g.session_id=l.session_id),Ps(n[p],g,!0),Ps(r.orchestrator[p],g,!0)}let u=Array.isArray(l.usage_legs)?l.usage_legs:[];for(let p of u){let f=p&&p.provider==="claude"?"claude":"codex";if(!p||p.provider!=="codex"&&p.provider!=="claude"||!cm[f].includes(p.role)||!Hc(p.usage))continue;let g=typeof p.receipt_id=="string"&&p.receipt_id.length>0?p.receipt_id:null;if(!g||o.has(g))continue;o.add(g);let m=Gc(p.usage),k={provider:f,role:p.role,attempt_id:String(l.attempt_id||""),usage:m,subtotal:Kc(f,m)};k.receipt_id=g,typeof p.agent_type=="string"&&(k.agent_type=p.agent_type),typeof p.agent_id=="string"&&(k.agent_id=p.agent_id),typeof p.model=="string"&&(k.model=p.model),typeof p.effort=="string"&&p.effort.trim().length>0&&(k.effort=p.effort),typeof p.session_id=="string"?k.session_id=p.session_id:typeof p.thread_id=="string"&&(k.session_id=p.thread_id),typeof p.turn_id=="string"&&(k.turn_id=p.turn_id),(typeof p.completed_at=="string"||typeof p.completed_at=="number"&&Number.isFinite(p.completed_at))&&(k.completed_at=p.completed_at),m.replayed===!0&&(k.replayed=!0),Ps(n[f],k,!1),Ps(r[k.role][f],k,!1)}}let s={};for(let l of["claude","codex"]){let a=n[l];if(a.legs.length===0)continue;let u=Yc(a,!1);l==="claude"&&a.outer_count>0&&a.outer_cost_count===a.outer_count&&(u.total_cost_usd=a.outer_cost),s[l]=u}if(Object.keys(s).length===0)return null;let i={};for(let l of["orchestrator","implementation","review-consult","subagent"]){let a={};for(let u of["claude","codex"]){let p=r[l][u];p.legs.length>0&&(a[u]={...Yc(p,!0),legs:p.legs})}Object.keys(a).length>0&&(i[l]=a)}return{providers:s,roles:i}}var hm=".chip-popover, .judgement-chip";function Qr(e){let t=null,n=!1;function r(p){return t!==null&&t.bead_id===p.bead_id&&t.chip_key===p.chip_key}function o(p){t=r(p)?null:{...p},e()}function s(){t!==null&&(t=null,e())}function i(p){let f=p.target;t!==null&&(f&&typeof f.closest=="function"&&f.closest(hm)||s())}function l(p){p.key==="Escape"&&s()}function a(){n||(n=!0,document.addEventListener("click",i),document.addEventListener("keydown",l))}function u(){n&&(n=!1,document.removeEventListener("click",i),document.removeEventListener("keydown",l))}return{toggle:o,close:s,isOpen:r,attach:a,detach:u}}function Zr(e){return c`<div
    class="chip-popover"
    role="dialog"
    aria-label=${e.title}
  >
    <div class="chip-popover__title">${e.title}</div>
    <ul class="chip-popover__lines">
      ${e.lines.map(t=>c`<li>${t}</li>`)}
    </ul>
  </div>`}var Xc={running:3,paused:2,failed:1};function Kn(e){if(!e||typeof e!="object")return!1;let t=e.kind;return t==null||t==="implementation"}function Qc(e){let t=Object.values(e||{}),n=new Map;for(let r of t){if(!r||typeof r.bead_id!="string"||r.bead_id.length===0||r.kind!=="review_session"||r.status!=="running")continue;let o=typeof r.started_at=="number"?r.started_at:null,s=n.get(r.bead_id);s&&(s.started_at??0)>(o??0)||n.set(r.bead_id,{attempt:r,origin:r.origin==="click"||r.origin==="auto"?r.origin:null,started_at:o})}return n}function Zc(e,t){let n=Object.values(e||{}),r=new Set,o=new Map;for(let i of n)!i||typeof i.bead_id!="string"||(typeof i.resumed_from=="string"&&i.resumed_from.length>0&&r.add(i.resumed_from),Kn(i)&&o.set(i.bead_id,i.attempt_id));let s=new Map;for(let i of n){if(!i||typeof i.bead_id!="string"||i.bead_id.length===0||!Kn(i))continue;let l=null;if(i.status==="running")l="running";else if(i.status==="paused"&&!r.has(i.attempt_id))l="paused";else if(i.status==="failed"||i.status==="orphaned"){let p=t.get(i.bead_id),f=typeof p=="number"&&p>0&&typeof i.finished_at=="number"&&p>=i.finished_at;o.get(i.bead_id)===i.attempt_id&&!f&&typeof i.dismissed_at!="number"&&(l="failed")}if(!l)continue;let a=typeof i.started_at=="number"?i.started_at:null,u=s.get(i.bead_id);if(u){let p=Xc[u.run_state],f=Xc[l];if(p>f||p===f&&(u.started_at??0)>(a??0))continue}s.set(i.bead_id,{attempt:i,run_state:l,started_at:a})}return{winners:s,resumed_from_ids:r}}var Ms=["workflow_mode","spec_review_model","spec_review_effort","spec_review_speed","plan_review_model","plan_review_effort","plan_review_speed","impl_review_model","impl_review_effort","impl_review_speed","impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"],_a=[...Ms.filter(e=>e!=="impl_dispatch"),"quick_fix_impl_model","bdui_url"];function Jc(e){let t;try{t=new URL(e)}catch{return!1}return(t.protocol==="http:"||t.protocol==="https:")&&e===t.origin}var Yn=["orchestration_model","orchestration_effort","orchestration_speed"],Jr=[...Ms,...Yn],bm=_a.filter(e=>Jr.includes(e)),eu=["delegated","main"],Ns=["inherit","claude","codex"],eo=["default","fast"],So=["standard","fast_track"],Eo=["codex","opus","fable","self","skip"],qs=["codex","fable","skip"],js=["low","medium","high","xhigh"],tu=["default","fast"],bn="auto";function hn(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function nu(e){if(!hn(e)||!hn(e.runners))return[];let t=[];for(let[n,r]of Object.entries(e.runners))hn(r)&&hn(r.models)&&t.push([n,Object.keys(r.models)]);return t}function to(e,t){let n=nu(e),r=t&&t!=="inherit"?n.filter(([o])=>o===t):n;return[bn,...r.flatMap(([,o])=>o)]}function ru(e,t,n,r){if(!hn(e)||!hn(e.runners))return[bn];let o=[];for(let[s,i]of Object.entries(e.runners))if(!(!hn(i)||!hn(i.models))&&!(t&&t!=="inherit"&&s!==t))for(let[l,a]of Object.entries(i.models)){if(n&&n!==bn&&l!==n)continue;let u=r(i,a);if(Array.isArray(u))for(let p of u)typeof p=="string"&&!o.includes(p)&&o.push(p)}return[bn,...o]}function no(e,t,n){return ru(e,t,n,(r,o)=>hn(o)&&Array.isArray(o.efforts)?o.efforts:r.efforts)}function ma(e,t,n){return ru(e,t,n,(r,o)=>hn(o)&&Array.isArray(o.orchestration_efforts)?o.orchestration_efforts:hn(o)&&Array.isArray(o.efforts)?o.efforts:r.efforts)}function To(e,t){let n=nu(e);return(t?n.filter(([o])=>o===t):n).flatMap(([,o])=>o)}function ou(e,t,n){let r={impl_runtime:e?.impl_runtime,impl_model:e?.impl_model,impl_effort:e?.impl_effort},o=r.impl_runtime==="claude"||r.impl_runtime==="codex"?r.impl_runtime:r.impl_runtime==="inherit"?n:null;return o&&(r.impl_model&&!to(t,o).includes(r.impl_model)&&(r.impl_model=void 0),r.impl_effort&&!no(t,o,r.impl_model||bn).includes(r.impl_effort)&&(r.impl_effort=void 0)),r}var ym={workflow_mode:"\uC6CC\uD06C\uD50C\uB85C \uBAA8\uB4DC",spec_review_model:"\uC2A4\uD399 \uB9AC\uBDF0\uC5B4",spec_review_effort:"\uC2A4\uD399 \uB9AC\uBDF0 effort",spec_review_speed:"\uC2A4\uD399 \uB9AC\uBDF0 \uC18D\uB3C4",plan_review_model:"\uACC4\uD68D \uB9AC\uBDF0\uC5B4",plan_review_effort:"\uACC4\uD68D \uB9AC\uBDF0 effort",plan_review_speed:"\uACC4\uD68D \uB9AC\uBDF0 \uC18D\uB3C4",impl_review_model:"\uAD6C\uD604 \uB9AC\uBDF0\uC5B4",impl_review_effort:"\uAD6C\uD604 \uB9AC\uBDF0 effort",impl_review_speed:"\uAD6C\uD604 \uB9AC\uBDF0 \uC18D\uB3C4",impl_runtime:"\uC704\uC784 \uB300\uC0C1",impl_model:"\uAD6C\uD604 \uBAA8\uB378",impl_effort:"\uAD6C\uD604 effort",impl_speed:"\uAD6C\uD604 \uC18D\uB3C4",orchestration_model:"\uC6CC\uCEE4 \uBAA8\uB378",orchestration_effort:"\uC6CC\uCEE4 effort",orchestration_speed:"\uC6CC\uCEE4 \uC18D\uB3C4"},fa=[...bm,...Yn],vm=[...Jr,..._a].filter((e,t,n)=>n.indexOf(e)===t&&!fa.includes(e));function su(e,t){let n=hn(e)?e:{},r=hn(t)?t:{},o=[];for(let i of fa){let l=n[i]??null,a=r[i]??null;l!==a&&o.push({key:i,label:ym[i]||i,before:l,after:a,kind:l===null?"added":a===null?"removed":"changed"})}let s=[];for(let i of[...vm,...Object.keys(r)])!fa.includes(i)&&!s.includes(i)&&Object.hasOwn(r,i)&&s.push(i);return{rows:o,ignored_keys:s}}function ga(e,t,n,r,o,s){return Ls({key:e,choices:t,layer:"global",global:n,resolution_global:s,execution_defaults:r,runner_catalog:o})}function iu(e,t){let n={};for(let r of _a){let o=e?.[r],s=t?.[r];o!==s&&(n[r]=typeof s=="string"&&s.length>0?s:null)}return n}function au(e,t){let n={};for(let r of Yn){let o=e?.[r]??null,s=t?.[r]??null;o!==s&&(n[r]=typeof s=="string"&&s.length>0?s:null)}return n}var ha=[{id:"workflow",label:"\uC6CC\uD06C\uD50C\uB85C\uC6B0",keys:["workflow_mode"]},{id:"review",label:"\uB9AC\uBDF0",keys:["spec_review_model","spec_review_effort","spec_review_speed","plan_review_model","plan_review_effort","plan_review_speed","impl_review_model","impl_review_effort","impl_review_speed"]},{id:"implementation",label:"\uAD6C\uD604",keys:["impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"]},{id:"worker",label:"Worker",keys:[...Yn]}],sr={workflow_mode:"\uBAA8\uB4DC",spec_review_model:"\uC0AC\uC591 \uB9AC\uBDF0",spec_review_effort:"\uC0AC\uC591 \uB9AC\uBDF0 effort",spec_review_speed:"\uC0AC\uC591 \uB9AC\uBDF0 \uC18D\uB3C4",plan_review_model:"\uACC4\uD68D \uB9AC\uBDF0",plan_review_effort:"\uACC4\uD68D \uB9AC\uBDF0 effort",plan_review_speed:"\uACC4\uD68D \uB9AC\uBDF0 \uC18D\uB3C4",impl_review_model:"\uAD6C\uD604 \uB9AC\uBDF0",impl_review_effort:"\uAD6C\uD604 \uB9AC\uBDF0 effort",impl_review_speed:"\uAD6C\uD604 \uB9AC\uBDF0 \uC18D\uB3C4",impl_dispatch:"\uC2E4\uD589 \uBC29\uC2DD",impl_runtime:"\uC704\uC784 \uB300\uC0C1",impl_model:"\uBAA8\uB378",impl_effort:"effort",impl_speed:"\uC18D\uB3C4",orchestration_model:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uBAA8\uB378",orchestration_effort:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 effort",orchestration_speed:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uC18D\uB3C4"},Fs={pin:"\uD540",global:"\uC804\uC5ED",base:"\uAE30\uBCF8"};function ba(e,t,n,r,o,s=null){let i=gn({pin:t,global:n,execution_defaults:r,runner_catalog:o,route:t&&typeof t.route=="string"?t.route:null,controller_runtime:s});return e.map(l=>({key:l,...i[l]}))}function lu(e,t,n,r,o,s=null){let i={pin:0,global:0,base:0};for(let l of ba(e,t,n,r,o,s))i[l.source]+=1;return i}function cu(e,t,n){return{id:e,key:t,value:typeof n=="string"?n:""}}function uu(e,t,n){return typeof t!="string"||t.length===0?null:{id:e,preset_id:t,expected_revision:n}}var Xk=[...Ms,...Yn];var du=["orchestration_model","orchestration_effort","orchestration_speed","spec_review_model","spec_review_effort","spec_review_speed","plan_review_model","plan_review_effort","plan_review_speed","impl_review_model","impl_review_effort","impl_review_speed","impl_runtime","impl_model","impl_effort"];function Co(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function Bs(e){if(!Co(e)||!Co(e.runners))return null;let t=Object.entries(e.runners).filter(([,n])=>Co(n)&&Co(n.models));return t.length>0?t:null}function En(e,t){let n=Bs(e);if(!n||!t)return null;for(let[r,o]of n)if(Object.hasOwn(o.models,t))return r;return null}function pu(e,t){return Co(t)&&Array.isArray(t.efforts)?t.efforts.slice():Array.isArray(e.efforts)?e.efforts.slice():[]}function fu(e,t){let n=Bs(e);if(!n||!t)return[];for(let[,r]of n)if(Object.hasOwn(r.models,t))return pu(r,r.models[t]);return[]}function wm(e){let t=Bs(e);if(!t)return[];let n=[];for(let[,r]of t)for(let o of Object.values(r.models))for(let s of pu(r,o))n.includes(s)||n.push(s);return n}function km(e,t){if(!t)return wm(e);let r=Bs(e)?.find(([s])=>s===t)?.[1];if(!r)return[];let o=[];for(let s of Object.keys(r.models))for(let i of fu(e,s))o.includes(i)||o.push(i);return o}function _u(e,t,n){let r={impl_runtime:e.impl_runtime||"",impl_model:e.impl_model||"",impl_effort:e.impl_effort||""},o=r.impl_runtime==="inherit"?n:r.impl_runtime==="claude"||r.impl_runtime==="codex"?r.impl_runtime:null;if(r.impl_runtime==="inherit"&&!o)return r.impl_model="",r.impl_effort="",r;let s=En(t,r.impl_model);if(r.impl_model&&(!o||s!==o))return r.impl_model="",r.impl_effort="",r;let i=r.impl_model?fu(t,r.impl_model):km(t,o);return r.impl_effort&&i.length>0&&!i.includes(r.impl_effort)&&(r.impl_effort=""),r}var ya=new Set(["unavailable","not_applicable"]);function ir(e,t){if(typeof e!="object"||e===null)return null;let n=e[t];return typeof n=="object"&&n!==null?n:null}function mu(e){return e.filter(t=>t!==null).join(" \xB7 ")}function ar(e,t){return t===null?null:`${sr[e]}: ${t.display} (${Fs[t.source]})`}function va(e){return e.filter(t=>t!==null).join(`
`)}function wa(e){if(typeof e!="object"||e===null)return null;let t=Ar(e);if(t==="")return null;let n=(r,o)=>typeof o=="string"&&o.length>0?`${r}: ${o}`:null;return{text:t,title:va(["\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \u2014 \uC774 attempt\uC5D0 \uAE30\uB85D\uB41C \uC2E4\uD589\uAC12",n("runner",e.runner),n(sr.orchestration_model,e.model),n(sr.orchestration_effort,e.effort),n(sr.orchestration_speed,e.speed)])}}function ro(e,t){let n=ir(e,"orchestration_model");if(n===null||n.resolution==="unavailable")return null;let r=ir(e,"orchestration_effort"),o=ir(e,"orchestration_speed"),s=mu([En(t,n.value??""),n.display,r!==null&&r.value!==null?r.display:null,o!==null&&o.value==="fast"?"Fast":null]);return s===""?null:{text:s,title:va(["\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \u2014 \uD604\uC7AC \uD574\uC11D\uAC12 (\uD540 > \uD050 \uAE30\uBCF8\uAC12)",ar("orchestration_model",n),ar("orchestration_effort",r),ar("orchestration_speed",o)])}}function $m(e,t){return e===null||e.value===null||ya.has(e.resolution)?null:e.value!=="inherit"?e.value:t?`inherit\u2192${t}`:"inherit"}function xm(e){return e===null||ya.has(e.resolution)?null:e.value==="auto"?"auto":e.display}function Am(e){return e===null?null:e.value==="auto"?"auto":ya.has(e.resolution)?null:e.display}function Er(e,t){if(typeof e!="object"||e===null)return null;let n=ir(e,"impl_dispatch"),r=ir(e,"impl_runtime"),o=ir(e,"impl_model"),s=ir(e,"impl_effort"),i=ir(e,"impl_speed"),l=n!==null&&n.value==="main"?"\uBA54\uC778":mu([$m(r,t??null),xm(o),Am(s),i!==null&&i.value==="fast"?"Fast":null]);return l===""?null:{text:l,title:va(["\uC6CC\uCEE4(\uAD6C\uD604 \uC704\uC784) \u2014 \uD604\uC7AC \uD574\uC11D\uAC12 (\uD540 > \uC804\uC5ED kv > \uAE30\uBCF8). \uC2E4\uD589 \uC911\uC774\uBA74 \uC138\uC158\uC774 \uC2DC\uC791 \uC2DC \uACE0\uC815\uD55C \uAC12\uACFC \uB2E4\uB97C \uC218 \uC788\uC74C",ar("impl_dispatch",n),ar("impl_runtime",r),ar("impl_model",o),ar("impl_effort",s),ar("impl_speed",i)])}}var Sm=Object.freeze(new Set(["push_not_contained","invalid_impl_review","premature_close","head_mismatch","foreign_deploy_unsupported","not_resolved"])),Em=Object.freeze(["delivery_unproven:"]);function Us(e){let t=e&&typeof e.reason=="string"?e.reason:"";if(t.length===0||Sm.has(t))return"session";for(let n of Em)if(t.startsWith(n))return"session";return"settlement"}var Tm=["hard_diagnosis","invariant_reasoning","verification_by_judgment","claude_bound"];var Cm={hard_diagnosis:"\uC6D0\uC778\uC774 \uBD88\uBA85\uD655\uD558\uAC70\uB098 \uC7AC\uD604\uC774 \uBD88\uC548\uC815\uD574 \uAC00\uC124-\uAC80\uC99D \uB8E8\uD504\uAC00 \uD544\uC694\uD558\uB2E4",invariant_reasoning:"\uC815\uD569\uC131\uC774 \uC0C1\uD0DC\uAE30\uACC4\xB7\uB3D9\uC2DC\uC131\xB7\uBD88\uBCC0\uC2DD \uCD94\uB860\uC5D0 \uB2EC\uB824 \uC788\uB2E4",verification_by_judgment:"\uD14C\uC2A4\uD2B8\uAC00 \uBABB \uC7A1\uACE0 \uB9AC\uBDF0\uC5B4\uC758 \uCD94\uB860\uC73C\uB85C\uB9CC \uAC80\uC99D\uD560 \uC218 \uC788\uB2E4",claude_bound:"Claude \uC138\uC158 \uC790\uC0B0\xB7\uC758\uBBF8\uB860\uC5D0 \uAC15\uD558\uAC8C \uBB36\uC5EC \uC788\uB2E4"};function ka(e){return(e&&Array.isArray(e.reasons)?e.reasons:[]).map(n=>Cm[n]||"").filter(n=>n.length>0)}var gu={orchestration_model:["fable"],impl_runtime:["claude"]},$a={unapplied:"\uBBF8\uC801\uC6A9",applied:"\uC801\uC6A9\uB428",diverged:"\uCD94\uCC9C\uACFC \uB2E4\uB984"};function hu(e){return typeof e=="object"&&e!==null?e:null}function bu(e,t){return typeof e=="string"&&t.includes(e)?e:""}function Rm(e){return typeof e!="string"?[]:e.split("+").map(t=>t.trim()).filter(t=>Tm.includes(t))}function Ro(e,t=e){let n=hu(e);if(!n)return null;let r=bu(n.rec_orchestration_model,gu.orchestration_model);if(r.length===0)return null;let o=bu(n.rec_impl_runtime,gu.impl_runtime),s={orchestration_model:r};o.length>0&&(s.impl_runtime=o);let i=hu(t)||{},l=Object.keys(s),a=0,u=0;for(let f of l){let g=i[f];typeof g=="string"&&g.length>0&&(a+=1,g===s[f]&&(u+=1))}let p=a===0?"unapplied":u===l.length?"applied":"diverged";return{reasons:Rm(n.rec_reason),rec:s,state:p}}function Ws(e){if(!e||typeof e!="object")return"";let t=ka(e),n=$a[e.state]||"",r=["\uBCF5\uC7A1\uD55C \uC791\uC5C5\uC73C\uB85C \uD310\uC815\uB428"];return t.length>0&&r.push(`\uC0AC\uC720: ${t.join(" \xB7 ")}`),n.length>0&&r.push(`\uC0C1\uD0DC: ${n}`),r.join(`
`)}function zs(e){return e.replace(/\/+$/,"")}function Om(e,t){let n=zs(e),r=zs(t);return n===r||r.startsWith(`${n}/`)||n.startsWith(`${r}/`)}function Hs(e,t){let n=new Set;for(let r of e)for(let o of t){if(!Om(r,o))continue;let s=zs(r),i=zs(o);n.add(s.length>=i.length?s:i)}return[...n].sort()}function xa(e,t){return`${e}\0${t}`}function yu(e){let t=new Map;for(let n of Array.isArray(e?.running)?e.running:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"running",state:"running"});for(let n of Array.isArray(e?.pr_wait)?e.pr_wait:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"pr_wait",state:"pr_wait"});for(let n of Array.isArray(e?.queue_groups)?e.queue_groups:[]){let r=Array.isArray(n.sublanes?.parallel)?n.sublanes.parallel:Array.isArray(n.items)?n.items:[];for(let o of r)t.set(o.id,{root_dir:o.root_dir,workspace_name:o.workspace_name,lane:"parallel",position:o.queue_position});for(let o of Array.isArray(n.sublanes?.serial)?n.sublanes.serial:[])for(let s of o.items)t.set(s.id,{root_dir:s.root_dir,workspace_name:s.workspace_name,lane:o.id,position:s.queue_position})}for(let n of Array.isArray(e?.runnable)?e.runnable:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"runnable",state:"runnable"});for(let n of Array.isArray(e?.done)?e.done:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"done",state:"done"});return t}function Aa(e,t){let n=Array.isArray(t)?t:[],r=e.indexOf("-"),o=r>0?e.slice(0,r):e;return n.some(s=>typeof s?.issue_prefix=="string"&&s.issue_prefix===o)?"internal":n.length>0&&n.every(s=>typeof s?.issue_prefix=="string")?"external":"unknown"}function Oo(e){if(e.state==="running")return"\uC2E4\uD589\uC911";if(e.state==="pr_wait")return"PR \uB300\uAE30";if(e.state==="runnable")return"\uC2E4\uD589\uAC00\uB2A5";if(e.state==="done")return"\uC644\uB8CC";let t=e.lane==="parallel"?"\uBCD1\uB82C":e.lane;return`${e.workspace_name} \xB7 ${t} #${e.position}`}function vu(e,t,n,r){let o=n.get(e);if(!!(o&&t&&o.root_dir===t.root_dir&&o.lane===t.lane&&typeof o.position=="number"&&typeof t.position=="number"&&o.position<t.position))return{id:e,label:`\u{1F512} ${e} (\uAC19\uC740 \uB808\uC778 \uC55E)`,location_label:"\uAC19\uC740 \uB808\uC778 \uC55E",scope:null,same_lane_ahead:!0};if(o)return{id:e,label:`\u{1F512} ${e} (${Oo(o)})`,location_label:Oo(o),scope:null,same_lane_ahead:!1};let i=Aa(e,r),l=i==="internal"?"\uBBF8\uC801\uC7AC":i==="external"?"\uC678\uBD80":"\uC704\uCE58 \uBBF8\uD655\uC778";return{id:e,label:`\u{1F512} ${e} (${l})`,location_label:l,scope:i,same_lane_ahead:!1}}function wu(e){let t=Array.isArray(e)?e:[],n=new Map,r=new Map,o=new Map;for(let l of t)for(let a of Array.isArray(l.sublanes?.serial)?l.sublanes.serial:[]){let u=xa(l.root_dir,a.id);n.set(u,{root_dir:l.root_dir,workspace_name:l.name,lane:a.id}),o.set(u,[]);for(let p of Array.isArray(a.items)?a.items:[])r.set(p.id,u)}for(let l of t)for(let a of Array.isArray(l.sublanes?.serial)?l.sublanes.serial:[]){let u=xa(l.root_dir,a.id),p=Array.isArray(a.items)?a.items[0]:null,g=!!p&&p.queue_index===0&&(!Array.isArray(a.occupied_by)||a.occupied_by.length===0)&&Array.isArray(p.blocked_by)?p.blocked_by:[],m=o.get(u);if(m)for(let k of g){let R=r.get(k);R&&R!==u&&!m.includes(R)&&m.push(R)}}let s=(l,a)=>{let u=new Set,p=[l];for(;p.length>0;){let f=p.pop();if(f===a)return!0;!f||u.has(f)||(u.add(f),p.push(...o.get(f)||[]))}return!1},i=new Map;for(let[l,a]of o){let u=[];for(let p of a){let f=n.get(p);s(p,l)&&f&&u.push(f)}u.length>0&&i.set(l,u)}return i}function ku(e,t){return xa(e,t)}async function Im(e){let t=await an(e);ye(t?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",t?"success":"error",1200)}function oo(e){return typeof e!="string"||e.length===0?"":c`<span class="worker-ev__copyline"
    ><code class="worker-ev__path">${e}</code
    ><button
      type="button"
      class="worker-ev__copy"
      data-seam="log-path-copy"
      title="로그 경로 복사"
      aria-label=${`\uB85C\uADF8 \uACBD\uB85C \uBCF5\uC0AC: ${e}`}
      @click=${()=>{Im(e)}}
    >
      ⧉
    </button></span
  >`}function Ks(e){return typeof e=="string"&&e.length>=7?e.slice(0,7):"\u2014"}function Au(e){return e==="session"?"bead\uAC00 in_progress\uB85C \uC7A1\uD78C \uB4A4 \uB2EB\uD788\uAE30\uAE4C\uC9C0\uC758 \uACBD\uACFC":"attempt \uC2E4\uD589 \uC2DC\uAC04 \uD569\uC0B0 (\uC7AC\uAC1C \uC138\uC158 \uD3EC\uD568)"}function Cr(e){if(typeof e!="number"||!Number.isFinite(e)||e<0)return"\u2014";if(e<1e3)return`${Math.round(e)}ms`;let t=e/1e3;if(t<60)return`${t.toFixed(1)}\uCD08`;let n=Math.floor(t/60);if(n<60)return`${n}\uBD84 ${Math.round(t-n*60)}\uCD08`;let r=Math.floor(n/60),o=n%60;return`${r}\uC2DC\uAC04 ${o}\uBD84`}function Su(e,t){if(typeof e!="object"||e===null)return[];let n=!1,r=!1;for(let o of Object.values(e)){if(typeof o!="object"||o===null)continue;let s=o;s.bead_id!==t||s.kind!=="review_session"||(n=!0,r=r||s.origin==="auto")}return n?[r?"\uB9AC\uBDF0 \xB7 \uC790\uB3D9":"\uB9AC\uBDF0"]:[]}function $u(e){return e==="auto"||e==="click"?e:null}function Eu(e,t){if(typeof e!="object"||e===null)return{active:!1,failure:null,origin:null};let n=!1,r=null,o=-1,s=null,i=null,l=-1;for(let a of Object.values(e)){if(typeof a!="object"||a===null)continue;let u=a;if(u.bead_id!==t||u.kind!=="review_session")continue;if(u.status==="pending"||u.status==="running"){n=!0;let f=typeof u.started_at=="number"?u.started_at:0;f>=o&&(o=f,r=$u(u.origin));continue}if(u.status!=="failed")continue;let p=typeof u.finished_at=="number"?u.finished_at:0;p>=l&&(l=p,s=typeof u.cause=="string"&&u.cause.length>0?u.cause:null,i=$u(u.origin))}return n?{active:!0,failure:null,origin:r}:{active:!1,failure:s,origin:i}}function Tu(e,t){if(typeof e!="object"||e===null)return null;let n=0,r=!1;for(let o of Object.values(e)){if(typeof o!="object"||o===null)continue;let s=o;if(s.bead_id!==t)continue;let i=s.started_at,l=s.finished_at;typeof i!="number"||typeof l!="number"||!Number.isFinite(i)||!Number.isFinite(l)||l<i||(n+=l-i,r=!0)}return r?n:null}function Ys(e){if(typeof e!="number"||!Number.isFinite(e)||e<=0)return"";let t=new Date(e);return`${String(t.getHours()).padStart(2,"0")}:${String(t.getMinutes()).padStart(2,"0")}`}function Lm(e,t){let n=Array.isArray(e)?e:[],r=Array.isArray(t)?t:[];if(n.length===0&&r.length===0)return null;let o=null;for(let i of n)i.kind!=="deploy"||i.state!=="succeeded"||typeof i.target_sha!="string"||(!o||(typeof i.finished_at=="number"?i.finished_at:0)>(typeof o.finished_at=="number"?o.finished_at:0))&&(o=i);let s=n.filter(i=>i.state==="failed"&&!i.dismissed&&!i.superseded_by).length+r.length;return{deploy:o?{sha:Ks(o.target_sha),at:typeof o.finished_at=="number"?o.finished_at:null,elapsed_ms:typeof o.elapsed_ms=="number"?o.elapsed_ms:null}:null,unresolved:s,badge:s>0?{tone:"act",label:`\uD574\uACB0 \uD544\uC694 ${s}`}:{tone:"quiet",label:"\uBAA8\uB450 \uC815\uC0C1"}}}function Cu(e,t){let n=Lm(e,t);return n?c`<button
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
            title=${n.deploy.at?Zt(n.deploy.at):""}
            >${Ys(n.deploy.at)}${n.deploy.elapsed_ms!==null?` \xB7 ${Cr(n.deploy.elapsed_ms)}`:""}</span
          >
        </span>`:""}
    <span class="worker-repo-strip__spacer"></span>
    <span
      class="worker-repo-strip__badge worker-repo-strip__badge--${n.badge.tone}"
      >${n.badge.label}</span
    >
  </button>`:""}function so(e){let t=sn(e.created_at),n=sn(e.updated_at);return!t&&!n?"":c`<div class="worker-mini__meta">
    ${t?c`<span title=${`\uC0DD\uC131 ${Zt(e.created_at)}`}
          >생성 ${t}</span
        >`:""}${t&&n?c`<span>·</span>`:""}${n?c`<span title=${`\uC218\uC815 ${Zt(e.updated_at)}`}
          >수정 ${n}</span
        >`:""}
  </div>`}function Pm(e){return!e||e==="requested"?"\uBC31\uC5C5 \uC911":e==="backup_verified"||e==="signaled"?"runner \uC885\uB8CC \uC911":e==="merged_revert"||e.startsWith("revert_")?"revert PR \uB300\uAE30":e.startsWith("rollback_")?"\uC6D0\uBCF5 \uBC30\uD3EC \uC911":e==="runner_terminated"||e.startsWith("pr_")||e.includes("ref_")||e.includes("worktree")||e.startsWith("bead_")?"PR \uC815\uB9AC \uC911":`\uD3D0\uAE30 \uCC98\uB9AC \uC911 (${e})`}function Lo(e,t){return t==="merged"?`${e}: \uC774\uBBF8 merge\uB41C \uAD6C\uD604\uC785\uB2C8\uB2E4. \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 revert PR\uC744 \uC0DD\uC131\uD558\uBA70, \uC2E4\uC81C \uC6D0\uBCF5\uC740 \uC0AC\uB78C\uC774 \uADF8 PR\uC744 merge\uD55C \uB4A4 \uC644\uB8CC\uB429\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`:`${e}: \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 runner/PR/branch/worktree\uB97C \uC815\uB9AC\uD558\uACE0 \uC774\uC288\uB97C \uD6C4\uBCF4\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`}function Vs(e){let t=["\uD3D0\uAE30 \uC644\uB8CC"];return e.operation_id&&t.push(`\uC791\uC5C5 ${e.operation_id}`),e.receipt?.archive_path&&t.push(`\uBC31\uC5C5 ${e.receipt.archive_path}`),e.receipt?.original_pr?.url&&t.push(`\uC6D0\uBCF8 PR ${e.receipt.original_pr.url}`),e.receipt?.revert_pr?.url&&t.push(`revert PR ${e.receipt.revert_pr.url}`),t.join(" \xB7 ")}function Vn(e,t,n={}){let o=Object.values(e&&typeof e=="object"?e:{}).filter(f=>f&&f.bead_id===t&&f.phase!=="done").sort((f,g)=>(f.requested_at||0)-(g.requested_at||0)).at(-1),s=typeof n.attempt_id=="string"&&n.attempt_id.length>0?n.attempt_id:typeof o?.attempt_id=="string"?o.attempt_id:null,i=n.external?"\uC678\uBD80 PR\uC740 Worker\uAC00 \uC18C\uC720\uD558\uC9C0 \uC54A\uC544 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":n.done?"\uC644\uB8CC\uB41C \uC791\uC5C5\uC740 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":n.merge_active?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":n.merge_queued?"\uBA38\uC9C0 \uD050\uC5D0 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 [\uCDE8\uC18C]\uD558\uC138\uC694":n.conflict_active?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 \uC138\uC158\uC744 \uC815\uB9AC\uD558\uC138\uC694":n.cleanup_active?"\uC815\uB9AC \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":null,l=typeof o?.last_error=="string"?o.last_error:null,a=o?Pm(o.phase):null,u=o?.kind==="stale_work_backup_fresh",p=n.merged||o?.mode==="merged_revert"?"merged":"unmerged";return{action:!n.external&&!n.done,enabled:!i&&(!o||!!l),label:u?l?"\uBC31\uC5C5 \uC815\uB9AC \uC7AC\uC2DC\uB3C4":"\uBC31\uC5C5 \uD6C4 \uC0C8\uB85C \uC2DC\uC791":l?"\uC7AC\uC2DC\uB3C4":"\uD3D0\uAE30",title:i||(l?u?`\uBC31\uC5C5 \uB4A4 \uC815\uB9AC \uC2E4\uD328: ${l} \u2014 \uC6D0\uBCF8\uACFC \uAC80\uC99D \uC601\uC218\uC99D\uC744 \uBCF4\uC874\uD55C \uCC44 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:`\uD3D0\uAE30 \uC2E4\uD328: ${l} \u2014 \uAC19\uC740 \uC791\uC5C5\uC744 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:o?`${a||"\uD3D0\uAE30 \uCC98\uB9AC \uC911"} \u2014 \uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694`:p==="merged"?"\uBCD1\uD569\uB41C \uBCC0\uACBD\uC744 \uC6D0\uBCF5 PR\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4":"\uBC31\uC5C5 \uD6C4 runner\xB7PR\xB7\uC6CC\uD06C\uD2B8\uB9AC\xB7\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4"),attempt_id:s,operation:o||null,progress:a,error:l,confirmation:p}}function Ru(e){if(!e||e.quickfix_lane!==!0)return!1;let t=e.quickfix_landing;return!t||typeof t!="object"?!1:["repo_operations","branch_cleanup","parent_close"].includes(t.cursor)}function Gs(e){let t=e.discard;if(!t||!t.operation)return"";let n=t.operation,r=n.kind==="stale_work_backup_fresh"&&!t.error?null:n.backup?.path,o=n.original_pr,s=n.revert_pr;return c`<div
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
  </div>`}var Dm={dirty_unique:"\uCD5C\uC2E0 base\uC5D0 \uC5C6\uB294 \uB85C\uCEEC \uBCC0\uACBD\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",untracked_present:"\uCD94\uC801\uB418\uC9C0 \uC54A\uC740 \uD30C\uC77C\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",branch_ahead:"\uB85C\uCEEC branch\uC5D0 \uACE0\uC720 commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",head_ahead:"worktree HEAD\uC5D0 \uACE0\uC720 commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",ahead_not_contained:"\uB85C\uCEEC branch\uC758 \uACE0\uC720 commit\uC774 \uCD5C\uC2E0 base\uC5D0 \uD3EC\uD568\uB410\uC74C\uC744 \uC99D\uBA85\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",ahead_merge_commit:"\uB85C\uCEEC branch\uC5D0 \uC790\uB3D9 \uC815\uB9AC\uD560 \uC218 \uC5C6\uB294 merge commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",ahead_submodule_path:"\uB85C\uCEEC branch\uC758 \uACE0\uC720 commit\uC774 submodule \uACBD\uB85C\uB97C \uBCC0\uACBD\uD569\uB2C8\uB2E4",archive_failed:"\uACE0\uC720 commit \uBC31\uC5C5\uC744 \uC548\uC804\uD558\uAC8C \uAC80\uC99D\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",ref_delete_failed:"\uD655\uC778\uB41C local branch\uB97C \uC548\uC804\uD558\uAC8C \uC0AD\uC81C\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",resume_available:"\uC774\uC5B4\uAC08 \uC218 \uC788\uB294 \uC774\uC804 Worker session\uC774 \uC788\uC2B5\uB2C8\uB2E4",observe_failed:"Git \uC0C1\uD0DC\uB97C \uC548\uC804\uD558\uAC8C \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",identity_changed:"\uD655\uC778 \uC911 worktree \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4",ownership_unknown:"Worker \uC18C\uC720 worktree\uC778\uC9C0 \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"};function Ou(e,t=!1){if(!e||typeof e!="object")return null;let n=e;if(n.reason!=="worktree_stale_work"||!n.stale_work||typeof n.stale_work!="object")return null;let r=n.stale_work,o=r.residue==="branch"?"branch":"worktree",s=r.state==="unique"?"unique":"unknown",i=r.summary&&typeof r.summary=="object"?r.summary:{};function l(u){return Number.isInteger(i[u])?Number(i[u]):0}let a=typeof r.cause=="string"?r.cause:"observe_failed";return{residue:o,state:s,title:o==="branch"?"\uC774\uC804 \uBE0C\uB79C\uCE58 \uBCF4\uC874\uB428":s==="unique"?"\uC774\uC804 \uC791\uC5C5 \uBCF4\uC874\uB428":"\uC774\uC804 \uC791\uC5C5 \uC0C1\uD0DC \uD655\uC778 \uC2E4\uD328",cause:Dm[a]||"\uC548\uC804\uD558\uAC8C \uC790\uB3D9 \uC815\uB9AC\uD560 \uC218 \uC5C6\uB294 \uC774\uC804 \uC791\uC5C5\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",summary:o==="branch"?`\uACE0\uC720 commit ${l("branch_ahead")}`:[`staged ${l("staged_count")}`,`unstaged ${l("unstaged_count")}`,`untracked ${l("untracked_count")}`,`branch ahead ${l("branch_ahead")}`,`HEAD ahead ${l("head_ahead")}`].join(" \xB7 "),action_id:typeof r.action_id=="string"?r.action_id:"",can_resume:r.can_resume===!0,can_continue:r.can_continue===!0,can_backup_fresh:r.can_backup_fresh===!0,can_recheck:r.can_recheck===!0,locked:t}}function Xs(e,t={}){if(!e||!e.orchestration&&!e.worker)return"";let n=t.pin===!0?" exec-chip--pin":"",r=t.pin===!0?`
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
      >`:""}`}function Io(e,t){let n=`worker-dep worker-dep--${t}${e.foreign?" worker-dep--foreign":""}`;return e.openable===!0?c`<button
        type="button"
        class=${`${n} worker-dep__open`}
        data-dep-id=${e.id}
        data-root-dir=${e.root_dir||""}
        title=${e.title||""}
      >
        ${e.label}
      </button>`:c`<span class=${n} title=${e.title||""}>${e.label}</span>`}function Mm(e){return{id:e.id,label:`\u29C9 ${e.id}`,title:[`\uACB9\uCE68 \xB7 ${e.location_label}`,...e.prefixes].join(`
`),openable:!0,...e.root_dir?{root_dir:e.root_dir}:{}}}function Sa(e){return Array.isArray(e)?e.slice().sort((t,n)=>t.id<n.id?-1:t.id>n.id?1:0):[]}function Nm(e,t=!1){return e?c`<button
    type="button"
    class="ctl-chip ctl-chip--label judgement-chip worker-card__spec-after-blocker"
    data-chip-key="spec_after_blocker"
    aria-expanded=${t?"true":"false"}
    title="선행의 결과가 설계 전제라 스펙도 선행 뒤에 씁니다"
  >
    스펙 대기
  </button>`:""}function Qs(e,t=""){if(!e)return t===""?"":c`<div class="worker-deps worker-deps--primary">
          ${t}
        </div>`;let n=Sa(e.predecessors),r=Array.isArray(e.released)?e.released:[],o=Sa(e.dependents),s=Sa(e.overlaps),i=e.scope_missing===!0,l=e.armed_lane||null,a=!!l||n.length>0||o.length>0||t!=="",u=r.length>0||s.length>0||i;return!a&&!u?"":c`${a?c`<div class="worker-deps worker-deps--primary">
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
            >`:""}${n.map(p=>Io(p,"pred"))}${t}${o.map(p=>Io(p,"dependents"))}
      </div>`:""}${u?c`<div class="worker-deps worker-deps--secondary">
        ${r.map(p=>Io(p,"released"))}${s.map(p=>Io(Mm(p),"overlap"))}${i?c`<span
              class="worker-dep worker-dep--muted"
              title="겹침 판정 불가 — 아티팩트가 있으면 스펙/플랜 front-matter, 없으면 description \`## scope\`에 선언 필요"
              >scope 없음</span
            >`:""}
      </div>`:""}`}function Iu(e,t=""){let n=(Array.isArray(e)?e:[]).filter(r=>typeof r=="string"&&r!=="").slice().sort();return n.length===0?"":c`<div class="worker-deps worker-deps--secondary">
    ${n.map(r=>Io({id:r,label:`\uC774\uC6D4 \u2192 ${r}`,title:`\uC774\uC6D4\uB41C \uD6C4\uC18D ${r} \uC5F4\uAE30`,openable:!0,...t?{root_dir:t}:{}},"dependents"))}
  </div>`}function Zs(e){return e?c`<button
    type="button"
    class="worker-dep worker-dep--lane mon-lane__chip"
    data-lane-id=${e.lane_id}
    title="이 연결 레인으로 이동"
  >
    ${e.label}
  </button>`:""}function Js(e){if(!e)return"";let t=e.chips||{},n=t.route||e.route,r=t.route_source==="derived"||e.route_source==="derived";return n?c`<span
    class="ctl-chip ctl-chip--route${r?" is-derived":""}"
    title=${r?"route \uBBF8\uD540 (metadata unset)":"route"}
    >${r?"unset":n}</span
  >`:""}function qm(e,t=!1){let n=e?e.quick_fix_review:null;if(!n)return"";let r=n.state;if(r!=="reviewed"&&r!=="stale")return"";let o=Array.isArray(n.missing)?n.missing:[],s=[r==="reviewed"?"quick_fix self-review \uC601\uC218\uC99D\uC774 \uC9C0\uAE08 \uBCF8\uBB38\uACFC \uC77C\uCE58\uD569\uB2C8\uB2E4":"quick_fix self-review \uC601\uC218\uC99D\uC774 \uC9C0\uAE08 \uBCF8\uBB38\uACFC \uB2E4\uB985\uB2C8\uB2E4",...o].join(`
`);return c`<button
    type="button"
    class="ctl-chip judgement-chip worker-card__qfr worker-card__qfr--${r}"
    data-chip-key="qfr"
    aria-expanded=${t?"true":"false"}
    title=${s}
  >
    ${r==="reviewed"?"\uB9AC\uBDF0 \u2713":"\uB9AC\uBDF0 stale"}
  </button>`}function Lu(e){return e?c`<button
    type="button"
    class="ctl-chip ctl-chip--from"
    data-from-id=${e}
    title=${`\uCD9C\uCC98 ${e} \uC5F4\uAE30`}
  >
    ↩ from ${e}
  </button>`:""}function ei(e,t=!1){return e?c`<button
    type="button"
    class="ctl-chip ctl-chip--label judgement-chip worker-card__rec"
    data-chip-key="rec"
    data-state=${e.state}
    aria-expanded=${t?"true":"false"}
    title=${Ws(e)}
  >
    ${"\uBCF5\uC7A1"}
  </button>`:""}var jm={absent:"\uC2E4\uD589 \uC601\uC218\uC99D\uC774 \uAE30\uB85D\uB418\uC9C0 \uC54A\uC558\uB2E4 \u2014 \uACFC\uAC70 Bead\xB7\uC678\uBD80 \uACBD\uB85C PR\uC740 \uC6D0\uB798 \uC5C6\uB2E4",unparsable:"\uC601\uC218\uC99D \uAC12\uC744 \uC77D\uC744 \uC218 \uC5C6\uB2E4 \u2014 40hex SHA\uB098 `delegated:`/`main:` \uD615\uC2DD\uC774 \uC544\uB2C8\uB2E4",effort_unknown:"effort \uD1A0\uD070\uC774 harness \uC5B4\uD718 \uBC16\uC774\uB2E4 \u2014 \uBAA8\uB378\xB7SHA\xB7unit\uC740 \uC720\uD6A8\uD558\uB2E4",main_reason_retired:"`main:` \uC0AC\uC720\uAC00 \uACE0\uC815 4\uD1A0\uD070(bead\xB7quick_fix_default\xB7phase_line\xB7takeover) \uBC16\uC774\uB2E4",main_receipt_unbacked:"`main:` \uC0AC\uC720\uB97C \uB4B7\uBC1B\uCE68\uD558\uB294 \uBA54\uD0C0\uB370\uC774\uD130(impl_dispatch\xB7route\xB7planned_execution\xB7quick_fix \uAE30\uBCF8 dispatch)\uAC00 \uC5C6\uB2E4",takeover_lineage_missing:"`main:takeover`\uC778\uB370 resolved \uBAA8\uB378\uACFC \uC77C\uCE58\uD558\uB294 \uC644\uB8CC\uB41C \uC704\uC784 \uC138\uC158\uC774 \uC5C6\uB2E4",takeover_lineage_unobservable:"`main:takeover`\uC778\uB370 \uC704\uC784 \uACC4\uBCF4\uB97C \uBAA8\uB2C8\uD130\uAC00 \uBCFC \uC218 \uC5C6\uB2E4(Codex \uBC16 \uB7F0\uD0C0\uC784)"};function Fm(e,t=!1){let n=Pu(e);if(n.length===0)return"";let r=n.length>1?`\uC601\uC218\uC99D \xB7 ${n[0]} +${n.length-1}`:`\uC601\uC218\uC99D \xB7 ${n[0]}`;return c`<button
    type="button"
    class="ctl-chip ctl-chip--label judgement-chip worker-card__receipt"
    data-chip-key="receipt"
    data-bead-id=${e.id}
    aria-expanded=${t?"true":"false"}
    title=${n.join(", ")}
  >
    ${r}
  </button>`}function Pu(e){let t=e.receipt_badge?e.receipt_badge.codes:null;return Array.isArray(t)?t.filter(n=>typeof n=="string"&&n.length>0):[]}function Du(e,t){return!e||typeof t!="number"?"":c`<a
    class="worker-mini__pr"
    href=${e}
    target="_blank"
    rel="noreferrer noopener"
    title="PR 열기"
    >#${t} ↗</a
  >`}function ti(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=Math.max(0,Math.min(4,Math.trunc(e)));return c`<span class="worker-pri" title=${`\uC6B0\uC120\uC21C\uC704 P${t}`}
    >P${t}</span
  >`}function Bm(e){let t=Array.isArray(e.badges)?e.badges:[],n=rn(e.usage),r=Hn(e.usage),o=sn(e.done_at);return c`<div
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
      ${Du(e.pr_url,e.pr_number)}${o?c`<span
            class="worker-mini__done-at"
            title=${`\uC644\uB8CC ${Zt(e.done_at)}`}
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
    ${Iu(e.carried_to,e.root_dir)}
    <div class="worker-mini__row3">
      ${n.length>0?n.map(s=>c`<span class="worker-usage" title=${s.tooltip}
                >${s.label}</span
              >`):r?c`<span class="worker-usage" title=${Ao(e.usage)}
              >${r}</span
            >`:""}
      ${typeof e.work_ms=="number"?c`<span
            class="worker-mini__work"
            title=${Au(e.work_kind)}
            >작업 ${Cr(e.work_ms)}</span
          >`:""}
    </div>
  </div>`}function Tn(e,t={}){if(e.lane==="done"&&e.done_layout==="three_line")return Bm(e);let n=e.draggable&&!e.done,r=Array.isArray(e.badges)?e.badges:[],o=rn(e.usage),s=Hn(e.usage),i=e.merge_step||null,l=e.lane==="pr_wait"||!!e.revise_action||!!e.stale_work,a=e.lane==="done"&&!l,u=a?sn(e.done_at):"",p=n?c`<span class="worker-mini__grip" aria-hidden="true">⠿</span>`:"",f=typeof e.seq=="number"?c`<span class="worker-mini__seq" aria-hidden="true"
          >${e.seq}</span
        >`:"",g=e.workspace_name?c`<span class="worker-mini__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:"",m=c`<span class="worker-mini__id" title="클릭하면 ID 복사"
    >${e.id}</span
  >`,k=e.lane==="done"?"":Js(e.workflow),R=e.lane==="done"?"":Lu(e.from_id),B=ti(e.priority),X=c`<span class="worker-mini__title">${e.title}</span>`,se=Du(e.pr_url,e.pr_number),j=r.map(Oe=>Oe===e.live_badge?c`<span
          class="worker-mini__badge worker-mini__badge--activity"
          title="서버가 이 PR을 처리하는 중입니다"
          ><span class="act-dot" aria-hidden="true"></span>${Oe}</span
        >`:c`<span
          class="worker-mini__badge${e.alert?" worker-mini__badge--alert":""}"
          title=${Oe===e.completion_badge&&e.completion_title||""}
          >${Oe}</span
        >`),q=e.reason?c`<span class="worker-mini__reason">${e.reason}</span>`:"",C=o.length>0?o.map(Oe=>c`<span class="worker-usage" title=${Oe.tooltip}
              >${Oe.label}</span
            >`):s?c`<span class="worker-usage" title=${Ao(e.usage)}
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
      </button>`:"",V=e.cancel_action?c`<button
        type="button"
        class="worker-mini__merge-cancel"
        data-bead-id=${e.id}
        ?disabled=${e.cancel_enabled===!1}
        title=${e.cancel_title||""}
      >
        취소
      </button>`:"",Q=e.discard,P=Q?.action||e.discard_action?c`<button
          type="button"
          class="worker-mini__discard"
          data-bead-id=${e.id}
          data-attempt-id=${Q?.attempt_id||""}
          data-operation-id=${Q?.operation?.operation_id||""}
          data-discard-mode=${Q?.confirmation||"unmerged"}
          ?disabled=${Q?!Q.enabled:e.discard_enabled===!1}
          title=${Q?Q.title:e.discard_enabled===!1?e.discard_title||"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"PR\uC744 \uB2EB\uACE0 \uC6CC\uD06C\uD2B8\uB9AC/\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4 (\uB418\uB3CC\uB9B4 \uC218 \uC5C6\uC74C). \uB2E4\uC2DC \uC2E4\uD589\uD558\uB824\uBA74 \uD6C4\uBCF4 \uB808\uC778\uC5D0\uC11C \uB300\uAE30 \uB808\uC778\uC73C\uB85C \uC62E\uAE30\uC138\uC694"}
        >
          ${Q?.label||"\uD3D0\uAE30"}
        </button>`:"",K=e.resolve_action?c`<button
        type="button"
        class="worker-mini__resolve"
        data-bead-id=${e.id}
        ?disabled=${e.resolve_enabled===!1}
        title=${e.resolve_title||"\uC2E4\uD328\uD55C \uC791\uC5C5\uC744 \uC774\uC5B4\uBC1B\uB294 \uB300\uD654\uD615 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4 (\uAE30\uB85D\uB41C \uC138\uC158\uC774 \uC788\uC73C\uBA74 fork)"}
      >
        세션에서 해결
      </button>`:"",H=e.stale_work||null,ee=H?c`${H.can_resume||H.can_continue?c`<button
            type="button"
            class="worker-mini__stale-continue"
            data-bead-id=${e.id}
            data-action-id=${H.action_id}
            ?disabled=${H.locked}
          >
            기존 작업 이어가기
          </button>`:""}${H.can_backup_fresh?c`<button
            type="button"
            class="worker-mini__stale-backup"
            data-bead-id=${e.id}
            data-action-id=${H.action_id}
            ?disabled=${H.locked}
          >
            백업 후 새로 시작
          </button>`:""}${H.can_recheck?c`<button
            type="button"
            class="worker-mini__stale-recheck"
            data-bead-id=${e.id}
            data-action-id=${H.action_id}
            ?disabled=${H.locked}
          >
            다시 확인
          </button>`:""}`:"",ke=H?c`<div class="worker-mini__stale">
        <strong>${H.title}</strong>
        <span>${H.summary}</span>
        <span>${H.cause}</span>
        ${H.can_backup_fresh?c`<small
              >Git-ignored dependency/build output은 archive에 포함되지
              않습니다</small
            >`:""}
      </div>`:"",Re=e.revise_action?c`<button
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
        </button>`:"",ne=!!(e.lane!=="pr_wait"&&!e.done&&e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker)),D=ei(e.rec,Tr(e,"rec")),ve=Fm(e,Tr(e,"receipt")),Ee=Zs(e.cross_lane_chip),T=oo(e.log_path),Z=g||Ee||k||R||ne||D||ve||C||T?c`<div class="worker-chips">
          ${g}${Ee}${k}${R}${ne?Xs(e.exec_chips,{pin:e.exec_chips_pinned===!0}):""}${D}${ve}${C}${T}${Ea(e)}
        </div>`:"",we=Qs(e.dependency_chips),he=Gs(e),Te=t.actions?t.actions:"",ge=!!(i||e.merge_action||e.cancel_action||e.resolve_action||e.discard_action||Q?.operation||e.revise_action||H);return c`<div
    class="worker-mini${l?" worker-mini--card":""}${n?"":" worker-mini--static"}${e.done?" worker-mini--done":""}${e.ghost?" worker-mini--ghost":""}${i?" worker-mini--merging":""}${i?.failed?" worker-mini--merge-failed":""}${e.external?" worker-mini--external":""}"
    style=${i?`--progress: ${i.percent}%`:""}
    draggable=${n?"true":"false"}
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    ${a?c`<div class="worker-mini__row1">
            ${g}${m}${B}${R}${se}${X}${Te}
          </div>
          ${Iu(e.carried_to,e.root_dir)}
          <div class="worker-mini__row2">
            ${C}${u?c`<span
                  class="worker-mini__done-at"
                  title=${`\uC644\uB8CC ${Zt(e.done_at)}`}
                  >완료 ${u}</span
                >`:""}${typeof e.work_ms=="number"?c`<span
                  class="worker-mini__work"
                  title=${Au(e.work_kind)}
                  >작업 ${Cr(e.work_ms)}</span
                >`:""}${j}${I}
            <span class="worker-mini__actions"
              >${F}${V}${K}${P}</span
            >
            ${so(e)}
          </div>`:l?c`<div class="worker-mini__head">
              ${p}${f}${m}${B}${se}${j}${q}${Te}
            </div>
            <div class="worker-mini__body">${X}${ke}</div>
            ${we}${Z}${ge?c`<div class="worker-mini__foot">
                  ${I}
                  <span class="worker-mini__actions"
                    >${F}${V}${K}${P}${Re}${ee}</span
                  >
                  ${Gs(e)}
                </div>`:""}
            ${so(e)}`:c`<div class="worker-mini__line">
              ${p}${f}${m}${B}${X}${se}${j}${q}${I}${F}${V}${K}${P}${Te}
            </div>
            ${we}${Z}${he} ${so(e)}`}
  </div>`}function Um(e,t){let n,r=[];for(let o of e){let s=o.group||"";s.length>0&&s!==n&&r.push(c`<div class="worker-card__place-group">${s}</div>`),n=s,r.push(c`<button
        type="button"
        class="worker-card__place-lane${s.length>0?" worker-card__place-lane--nested":""}"
        data-bead-id=${t}
        data-lane=${o.id}
        ?disabled=${o.disabled===!0}
        title=${o.title||`${o.label} \uB300\uAE30 \uB9E8 \uB4A4\uC5D0 \uCD94\uAC00`}
      >
        <span>${o.label}</span>
        ${typeof o.count=="number"?c`<span class="worker-card__place-count">${o.count}</span>`:""}
      </button>`)}return c`${r}`}var Mu={external_roundtrip:"\uD558\uB124\uC2A4 \uBC16 \uC0C1\uB300\uC640 \uC608\uCE21 \uBD88\uAC00 \uC655\uBCF5 \uBC18\uBCF5 \u2014 \uB2E4\uB978 rig \uC138\uC158\xB7\uC0AC\uB78C\xB7\uC678\uBD80 \uC2DC\uC2A4\uD15C",user_feedback_loop:"\uC9C4\uD589 \uC911 \uC0AC\uC6A9\uC790 \uD53C\uB4DC\uBC31 \uC5C6\uC774\uB294 \uD488\uC9C8\uC774 \uB0AE\uC74C \u2014 \uBB38\uC548\xB7\uC124\uACC4 \uC138\uBD80\xB7\uBC29\uD5A5 \uC120\uD0DD"};function Ca(e,t){if(t==="rec"){let n=e.rec;if(!n)return null;let r=$a[n.state]||"";return{title:"\uBCF5\uC7A1\uD55C \uC791\uC5C5\uC73C\uB85C \uD310\uC815\uB428",lines:[...ka(n),...r.length>0?[`\uC0C1\uD0DC: ${r}`]:[],"\uC801\uC6A9\uC740 \uC774\uC288 \uC0C1\uC138\uC758 \uC2E4\uD589 \uC124\uC815 \uD3B8\uC9D1\uAE30\uC5D0\uC11C"]}}if(t==="session_preferred"){if(e.session_preferred!==!0)return null;let n=Mu[e.session_preferred_reason||""]||"";return{title:"\uC6CC\uCEE4\uB85C \uB3CC\uB9B4 \uC218 \uC788\uC9C0\uB9CC \uC138\uC158\uC774 \uB0AB\uB2E4",lines:n.length>0?[n]:[]}}if(t==="ineligible")return e.worker_ineligible!==!0?null:{title:"\uC6CC\uCEE4 \uC2E4\uD589 \uB300\uC0C1\uC774 \uC544\uB2C8\uB2E4",lines:["worker-ineligible \uB77C\uBCA8\uC774 \uBD99\uC5B4 \uC788\uB2E4 \u2014 \uB77C\uBCA8\uC740 \uC774\uC288 \uC0C1\uC138\uC758 \uB77C\uBCA8 \uC808\uC5D0\uC11C \uB5C0\uB2E4"]};if(t==="spec_after_blocker")return e.spec_after_blocker!==!0?null:{title:"\uC120\uD589 \uACB0\uACFC\uAC00 \uC124\uACC4 \uC804\uC81C \u2014 \uC2A4\uD399\uB3C4 \uC120\uD589 \uB4A4\uC5D0",lines:[`\uC120\uD589: ${(Array.isArray(e.blocked_by)?e.blocked_by:[]).join(" \xB7 ")}`,"\uC120\uD589\uC774 \uB2EB\uD788\uBA74 \uC774 \uD45C\uC2DC\uB294 \uC800\uC808\uB85C \uC0AC\uB77C\uC9C4\uB2E4 \u2014 \uB77C\uBCA8\uC740 \uC774\uC288 \uC0C1\uC138\uC758 \uB77C\uBCA8 \uC808\uC5D0\uC11C \uB5C0\uB2E4"]};if(t==="receipt"){let n=Pu(e);return n.length===0?null:{title:"\uC2E4\uD589 \uC601\uC218\uC99D \uD68C\uACC4 \uC794\uC5EC \u2014 \uBA38\uC9C0\uB294 \uC9C4\uD589",lines:[...n.map(r=>jm[r]||r),"\uC790\uB3D9 \uBA38\uC9C0 \uD310\uC815\uC5D0\uB294 \uC601\uD5A5\uC774 \uC5C6\uB2E4 \u2014 \uC815\uC815\uC740 bd update --set-metadata exec_receipt=\u2026 \uB85C"]}}if(t==="qfr"){let n=e.workflow?e.workflow.quick_fix_review:null;if(!n||n.state!=="reviewed"&&n.state!=="stale")return null;let r=Array.isArray(n.missing)?n.missing:[];return{title:n.state==="reviewed"?"quick_fix self-review \uC601\uC218\uC99D\uC774 \uC9C0\uAE08 \uBCF8\uBB38\uACFC \uC77C\uCE58\uD569\uB2C8\uB2E4":"quick_fix self-review \uC601\uC218\uC99D\uC774 \uC9C0\uAE08 \uBCF8\uBB38\uACFC \uB2E4\uB985\uB2C8\uB2E4",lines:r.length>0?r:["\uBE60\uC9C4 \uD56D\uBAA9 \uC5C6\uC74C"]}}return null}var Wm=["rec","receipt","session_preferred","ineligible","qfr","spec_after_blocker"];function ni(e,t){for(let n of Wm){if(!t(n))continue;let r=Ca(e,n);return r?{chip_key:n,content:r}:null}return null}function Ea(e){return e.chip_popover?Zr(e.chip_popover.content):""}function Tr(e,t){return!!e.chip_popover&&e.chip_popover.chip_key===t}var ri="\uC0AC\uC6A9\uC790 \uB9AC\uBDF0 \uD544\uC694";function Ra(e,t=null,n={}){let r=e.worker_ineligible===!0,o=e.draggable&&!e.done&&!r,s=e.queue_placeable===!0&&!e.done&&!r,i=s&&t&&t.bead_id===e.id,l=e.session_preferred===!0,a=Mu[e.session_preferred_reason||""]||"",u=e.workflow,p=typeof e.reason=="string"?e.reason.split(" \xB7 "):[],f=p.includes("missing_description"),g=p.some(I=>I.startsWith(ri)),m=typeof e.reason=="string"&&e.reason.startsWith("\u26D4"),k=Tr(e,"spec_after_blocker"),R=Nm(e.spec_after_blocker===!0,k),B=Qs(e.dependency_chips,R===""?"":c`${R}${k?Ea(e):""}`),X=e.workspace_name?c`<span class="worker-card__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:"",se=Zs(e.cross_lane_chip),j=Js(u),q=Lu(e.from_id),C=!!(e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker));return c`<div
    class="worker-card${o?"":" worker-card--static"}${r?" worker-card--ineligible":""}"
    draggable=${o?"true":"false"}
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    <div class="worker-card__head">
      ${o?c`<span class="worker-card__grip" aria-hidden="true">⠿</span>`:""}
      <span class="worker-card__id" title="클릭하면 ID 복사">${e.id}</span
      >${ti(e.priority)}
      ${r?c`<button
            type="button"
            class="ctl-chip ctl-chip--label judgement-chip worker-card__ineligible"
            data-chip-key="ineligible"
            aria-expanded=${Tr(e,"ineligible")?"true":"false"}
            title="worker-ineligible label이 붙어 워커 실행 대상이 아닙니다"
          >
            worker-ineligible
          </button>`:l?c`<button
              type="button"
              class="ctl-chip ctl-chip--label judgement-chip worker-card__session-preferred"
              data-chip-key="session_preferred"
              aria-expanded=${Tr(e,"session_preferred")?"true":"false"}
              title=${a}
            >
              세션 권장
            </button>`:""}${ei(e.rec,Tr(e,"rec"))}${qm(u,Tr(e,"qfr"))}
      ${k?"":Ea(e)}
    </div>
    <div class="worker-card__title">${e.title}</div>
    ${u?Cs(u,e.status,{onOpenDoc:n.onOpenDoc}):""}${B}
    ${X||se||j||q||C?c`<div class="worker-chips">
          ${X}${se}${j}${q}${Xs(e.exec_chips,{pin:n.exec_chips_mode==="pinned_only"})}
        </div>`:""}
    <div
      class="worker-card__foot${e.reason?"":" worker-card__foot--actions-only"}"
    >
      ${i?c`<div class="worker-card__place-menu">
            ${Um(t.lanes,e.id)}
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
              title=${s?"\uB300\uAE30 \uD050 \uB9E8 \uB4A4\uC5D0 \uCD94\uAC00":r?"worker-ineligible label\uB85C \uC6CC\uCEE4\uC5D0\uC11C \uC2E4\uD589\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":g?"\uC0AC\uC6A9\uC790 \uB9AC\uBDF0\uB97C \uAE30\uB2E4\uB9AC\uB294 \uC911\uC774\uB77C \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":f?"description\uC774 \uC5C6\uC5B4 \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"spec\uC774 \uC5C6\uC5B4 \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"}
            >
              대기로 ↴
            </button>`}
    </div>
    ${so(e)}
  </div>`}function qn(e){let t=!!e.collapsible&&!!e.collapsed,n=typeof e.count=="number"?e.count:e.items.length,r=c`<span
      class="worker-pane__dot worker-pane__dot--${e.lane}"
      aria-hidden="true"
    ></span>
    <span class="worker-pane__title">${e.title}</span>
    ${t&&e.preview?c`<span class="worker-pane__preview">${e.preview}</span>`:""}
    <span class="worker-pane__count">${n}</span>`;return c`<section
    class="worker-pane worker-pane--lane-${e.lane}${e.src?" worker-pane--src":""}${e.live?" worker-pane--live":""}${e.collapsible?" worker-pane--collapsible":""}${t?" worker-pane--collapsed":""}"
    id=${on(e.id||void 0)}
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
                  </div>`:e.items.map(o=>e.lane==="candidate"?Ra(o,e.place_menu,{onOpenDoc:e.onOpenDoc}):Tn(o))}
          </div>`}
  </section>`}function xu(e,t,n){return c`<button
      type="button"
      class="worker-wait__area-toggle"
      data-area=${e}
      aria-expanded=${n?"false":"true"}
      aria-label=${`${t} ${n?"\uD3BC\uCE58\uAE30":"\uC811\uAE30"}`}
    >
      ${n?"\u25B8":"\u25BE"}
    </button>
    <span class="worker-wait__area-name">${t}</span>`}function oi(e){let t=e.parallel,n=e.serial,r=t.drop||{};return c`<div class="worker-wait">
    <section
      class="worker-wait__area worker-wait__area--parallel${t.collapsed?" is-collapsed":""}"
      data-area="parallel"
    >
      <header class="worker-wait__area-hd">
        ${xu("parallel","\uBCD1\uB82C \uC601\uC5ED",t.collapsed)}
        <span class="worker-wait__area-count">${t.count}</span>
      </header>
      ${t.collapsed?"":c`<div
            class="worker-wait__area-body"
            data-drop=${on(r.drop)}
            data-root-dir=${on(r.root_dir)}
            data-lane-id=${on(r.lane_id)}
            data-lane-length=${on(r.lane_length)}
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
        ${xu("serial","\uC9C1\uB82C \uC601\uC5ED",n.collapsed)}
        ${n.header_control?n.header_control:""}
      </header>
      ${n.collapsed?"":c`<div class="worker-wait__area-body">
            ${n.notice?n.notice:""}
            ${n.extra_panes?n.extra_panes:""}
            ${n.lanes.map(o=>zm(o))}
          </div>`}
    </section>
  </div>`}function zm(e){let t=e.drop||{},n=e.badge?c`<span
        class="worker-lane__badge${e.held?" worker-lane__badge--held":""}"
        >${e.badge}</span
      >`:"";return c`<div
    class="worker-wait__lane${e.empty?" worker-wait__lane--empty":""}"
  >
    ${qn({id:typeof e.pane_id=="string"?e.pane_id:`worker-pane-lane-${e.id}`,lane:e.id,title:e.title,items:[],count:e.count,empty:"\uBE44\uC5B4 \uC788\uC74C \u2014 \uD589\uC744 \uC5EC\uAE30\uB85C \uB4DC\uB798\uADF8",header_control:c`${n}${e.header_control?e.header_control:""}`,body:c`<div
        class="worker-wait__rows"
        data-drop=${on(t.drop)}
        data-root-dir=${on(t.root_dir)}
        data-lane-id=${on(t.lane_id)}
        data-lane-length=${on(t.lane_length)}
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
  </div>`}function si(e){return e.count?c`<section
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
  </section>`:""}var Nu=[{step:"merge",label:"\uBA38\uC9C0",index:1},{step:"base",label:"base",index:2},{step:"verify",label:"\uAC80\uC99D",index:3},{step:"deploy",label:"\uBC30\uD3EC",index:4},{step:"child",label:"\uC790\uC2DD",index:5},{step:"branch",label:"\uBE0C\uB79C\uCE58",index:6},{step:"close",label:"close",index:7}],Po=[{step:"base_containment",label:"base \uD3EC\uD568 \uD655\uC778"},{step:"repo_operations",label:"\uC800\uC7A5\uC18C \uC791\uC5C5"},{step:"post_merge_jobs",label:"\uBA38\uC9C0 \uD6C4 \uC7A1"},{step:"child_sweep",label:"\uC790\uC2DD \uC815\uB9AC"},{step:"branch_cleanup",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC"},{step:"parent_close",label:"\uBD80\uBAA8 close"}];function ii(e,t){let n=Nu.find(o=>o.step===e);if(!n)return null;let r=Nu.length;return{step:n.step,label:t,index:n.index,total:r,percent:Math.round(n.index/r*100)}}function qu(e){let t=Po.findIndex(n=>n.step===e);return Po.map((n,r)=>({step:n.step,label:n.label,state:t<0?"todo":r<t?"done":r===t?"stall":"todo"}))}function Rr(e){let t=Po.find(n=>n.step===e);return t?t.label:typeof e=="string"?e:""}function Hm(e){let t=Po.findIndex(n=>n.step===e);return t<0?null:{index:t+1,total:Po.length}}function ai(e){let t=Hm(e);return t?`\uBA38\uC9C0 \uC644\uB8CC \xB7 \uC815\uB9AC ${t.total}\uB2E8\uACC4 \uC911 ${t.index}\uB2E8\uACC4\uC5D0\uC11C \uBA48\uCDA4`:"\uBA38\uC9C0\uB428 \xB7 \uC815\uB9AC \uBBF8\uC644"}var Ia=new Set(["queued","running","retry_pending"]),ju=new Set(["failed","succeeded"]),Gm={queued:"\uB300\uAE30",running:"\uC911",retry_pending:"\uC7AC\uC2DC\uB3C4 \uB300\uAE30",failed:"\uC2E4\uD328",succeeded:"\uC644\uB8CC \xB7 \uC815\uB9AC \uC7AC\uC2DC\uB3C4 \uB300\uAE30"},Do={base_containment:{step:"base",label:"base \uD655\uC778 \uC911"},child_sweep:{step:"child",label:"\uC790\uC2DD \uC815\uB9AC \uC911"},branch_cleanup:{step:"branch",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC \uC911"},parent_close:{step:"close",label:"\uBD80\uBAA8 close \uC911"}},Km={merging:{step:"merge",label:"\uBA38\uC9C0 \uC911"},base_containment:Do.base_containment,child_sweep:Do.child_sweep,branch_cleanup:Do.branch_cleanup,parent_close:Do.parent_close};function Ym(e){return typeof e=="string"&&/^[0-9a-f]{40}$/.test(e)}function Vm(e,t,n){return!["verify","deploy"].includes(e.kind)||![...Ia,...ju].includes(e.state)||![null,void 0,""].includes(e.superseded_by)||!Array.isArray(e.subjects)?!1:e.subjects.some(r=>r&&typeof r=="object"&&r.bead_id===t&&r.merged_sha===n)}function Xm(e,t){let n=(t.kind==="deploy"?2:1)-(e.kind==="deploy"?2:1);if(n!==0)return n;let r=u=>u.state==="succeeded"?1:2,o=r(t)-r(e);if(o!==0)return o;let s=typeof e.requested_at=="number"?e.requested_at:0,i=typeof t.requested_at=="number"?t.requested_at:0;if(s!==i)return i-s;let l=typeof e.operation_id=="string"?e.operation_id:"",a=typeof t.operation_id=="string"?t.operation_id:"";return l.localeCompare(a)}function Oa(e,t=!1){let n=e.kind,r=n==="verify"?"\uAC80\uC99D":"\uBC30\uD3EC",o=t?"failed":e.state,s=Gm[o];if(!s)return null;let i=ii(n,`${r} ${s}`);return i?{...i,active:Ia.has(o),failed:o==="failed"}:null}function Qm(e){return!e||typeof e!="object"?null:Km[e.step]||null}function Mo(e){if(!e||typeof e.bead_id!="string")return null;let t=e.bead_id,n=e.merge_progress&&typeof e.merge_progress=="object"?e.merge_progress:{},r=Qm(n),o=e.cleanup_failed&&typeof e.cleanup_failed=="object"?e.cleanup_failed:null,s=["post_merge_jobs","child_sweep","branch_cleanup","parent_close"].includes(typeof e.cleanup_cursor=="string"?e.cleanup_cursor:""),i=!s&&(e.cleanup_cursor==="repo_operations"||n.step==="repo_operations"),l=Ym(e.merge_sha)?e.merge_sha:null,a=!s&&l&&Array.isArray(e.repo_operations)?e.repo_operations.filter(k=>k&&typeof k=="object"&&Vm(k,t,l)).sort(Xm):[],u=i?a:[],p=u.find(k=>Ia.has(k.state));if(p)return Oa(p);if(o)return o.step==="repo_operations"&&a[0]?Oa(a[0],!0):null;let f=u.find(k=>ju.has(k.state)?k.state!=="succeeded"||e.cleanup_cursor==="repo_operations":!1);if(f)return Oa(f);if(r){let k=ii(r.step,r.label);return k?{...k,active:!0,failed:!1}:null}let g=typeof e.cleanup_cursor=="string"?Do[e.cleanup_cursor]:null;if(!g)return null;let m=ii(g.step,g.label);return m?{...m,active:!0,failed:!1}:null}function li(e){return!!e&&e.step!=="merge"&&e.failed!==!0}var Zm="\uBBF8\uC801\uC7AC";function La(e,t){let n=Un(e,t.id);return{id:t.id,label:`\u26D3 ${t.id}`,title:`\uC120\uD589 \u2014 close\uB420 \uB54C\uAE4C\uC9C0 \uCD9C\uBC1C\uD558\uC9C0 \uC54A\uB294\uB2E4 (${t.location_label})`,...n?{foreign:!0}:{}}}var Jm=10080*60*1e3;function Fu(e,t,n){let r=t.closed_at;if(typeof r!="number"||!Number.isFinite(r)||r<n-Jm)return null;let o=Un(e,t.id),s=typeof t.root_dir=="string"?t.root_dir:"",i={id:t.id,label:`\u{1F513} ${t.id}`,title:`\uD574\uC81C \u2014 ${Zt(r)}\uC5D0 close\uB418\uC5B4 \uC774 \uC774\uC288\uAC00 \uD480\uB838\uB2E4`,...o?{foreign:!0}:{}};return o?s.length>0&&(i.openable=!0,i.root_dir=s):i.openable=!0,i}function Bu(e,t){let n=Array.isArray(t.ids)?t.ids.filter(s=>typeof s=="string"&&s.length>0):[],r=t.root_dirs&&typeof t.root_dirs=="object"?t.root_dirs:{},o=[];for(let s of[...new Set(n)].sort()){let i=Un(e,s),l=typeof r[s]=="string"?r[s]:"",a={id:s,label:`\u2192 ${s}`,title:"\uD6C4\uC18D \u2014 \uC774 \uC774\uC288\uAC00 close\uB418\uBA74 \uD480\uB9B0\uB2E4",...i?{foreign:!0}:{}};l.length>0?(a.openable=!0,a.root_dir=l):i||(a.openable=!0),o.push(a)}return o}function Uu(e,t,n={}){let r=new Map,o=new Map;for(let s of t)o.has(s.id)||o.set(s.id,s.location_label);for(let[s,i]of e){if(typeof s!="string"||s.length===0)continue;let l=[];for(let a of Array.isArray(i)?i:[]){if(typeof a!="string"||a.length===0)continue;let u=La(s,{id:a,location_label:o.get(a)||Zm}),p=n[a];u.foreign!==!0?u.openable=!0:typeof p=="string"&&p.length>0&&(u.openable=!0,u.root_dir=p),l.push(u)}l.length>0&&r.set(s,l)}return r}var ui=1,No=[{value:"repo_spec",label:"\uB808\uD3EC \xB7 spec \uC6B0\uC120"},{value:"repo_updated",label:"\uB808\uD3EC \xB7 \uCD5C\uC2E0 \uC218\uC815"},{value:"updated_flat",label:"\uCD5C\uC2E0 \uC218\uC815(\uB808\uD3EC \uBB34\uC2DC)"}],Ma=[{value:"all",label:"\uC804\uCCB4"},{value:"with",label:"spec \uC788\uC74C"},{value:"without",label:"spec \uC5C6\uC74C"}],io={show_blocked:!0,spec:"all"},Wu={auto_merge:"\uC790\uB3D9 \uBA38\uC9C0",merged:"\uBA38\uC9C0",merge:"\uBA38\uC9C0",pr_stop:"PR \uC911\uB2E8",stopped:"\uC911\uB2E8",failed:"\uC2E4\uD328",refuted:"\uBC18\uC99D",no_delta:"\uBB34-delta"};function eg(e,t){let n=null;for(let r of Object.values(e||{}))!r||r.bead_id!==t||!Kn(r)||(n=typeof r.status=="string"?r.status:null);return n}function tg(e,t){let n=null,r=-1/0;for(let o of Object.values(e)){if(!o||o.bead_id!==t||o.status==="running"||!Kn(o))continue;let s=typeof o.finished_at=="number"?o.finished_at:typeof o.started_at=="number"?o.started_at:0;s>=r&&(r=s,n=o)}return n}function ng(e,t,n={}){let{winners:r,resumed_from_ids:o}=Zc(e,t),s=new Map;for(let[i,l]of r){let a=l.attempt,u=l.run_state,p=l.started_at,f=typeof a.session_id=="string"&&a.session_id.length>0,m=Us(a.quickfix_landing)==="session",k=u!=="running"&&(f||!m)&&!o.has(a.attempt_id),R=!f&&m?"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":o.has(a.attempt_id)?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":null,B=at(n.observations?.[i]),X=at(B.pr),se=typeof a.merge_sha=="string"&&a.merge_sha.length>0||X.state==="MERGED",j=Vn(n.discard_operations,i,{attempt_id:a.attempt_id,merged:se}),q=u==="failed"?Hu(a,{resume_eligible:k,resume_reason:R,confirmation:j.confirmation,history:n.bead_timelines?.[i]}):null;s.set(i,{...zu(a,e,u),started_at:p,...q?{failure:q}:{},can_pause:u==="running"&&f,can_resume:k})}for(let[i,l]of ig(e,t)){if(s.has(i))continue;let a=l.attempt,u=Vn(n.discard_operations,i,{attempt_id:a.attempt_id}),p=Xu(a);s.set(i,{...zu(a,e,l.run_state),started_at:typeof a.started_at=="number"?a.started_at:null,...l.run_state==="parked"?{failure:Hu(a,{resume_eligible:!1,resume_reason:"\uC138\uC158 \uB300\uAE30 \u2014 [\uC7AC\uC2DC\uB3C4]\uAC00 \uC0C8 attempt\uB97C \uB744\uC6C1\uB2C8\uB2E4",confirmation:u.confirmation,history:n.bead_timelines?.[i]})}:{},...l.run_state==="waiting"?{wait:og(a)}:{},...p?{retry:p}:{},can_pause:!1,can_resume:!1})}return s}function zu(e,t,n){return{attempt_id:typeof e.attempt_id=="string"?e.attempt_id:"",run_state:n,last_event_at:typeof e.last_event_at=="number"?e.last_event_at:null,last_activity:e.last_activity&&typeof e.last_activity=="object"?e.last_activity:null,legs:Array.isArray(e.legs)?e.legs:[],runner:typeof e.runner=="string"?e.runner:null,model:typeof e.model=="string"?e.model:null,effort:typeof e.effort=="string"?e.effort:null,speed:typeof e.speed=="string"?e.speed:null,resumed_from:typeof e.resumed_from=="string"?e.resumed_from:null,continuation_mode:e.continuation_mode==="session"||e.continuation_mode==="fresh"?e.continuation_mode:null,status:typeof e.status=="string"?e.status:null,usage:Gn(t,e.bead_id)}}function Hu(e,t){let n=e.cause_detail&&typeof e.cause_detail=="object"?e.cause_detail:null;return{cause:typeof e.cause=="string"?e.cause:null,cause_detail:n,summary:n&&typeof n.summary=="string"?n.summary:null,bead_id:typeof e.bead_id=="string"?e.bead_id:"",finished_at:typeof e.finished_at=="number"?e.finished_at:null,runner:typeof e.runner=="string"?e.runner:null,model:typeof e.model=="string"?e.model:null,effort:typeof e.effort=="string"?e.effort:null,observed_effort:typeof e.observed_effort=="string"?e.observed_effort:null,speed:typeof e.speed=="string"?e.speed:null,attempt_id:typeof e.attempt_id=="string"?e.attempt_id:"",usage:e.usage&&typeof e.usage=="object"?e.usage:null,halted_auto_advance:e.halted_auto_advance===!0,quickfix_lane:e.quickfix_lane===!0,quickfix_landing:e.quickfix_landing&&typeof e.quickfix_landing=="object"?e.quickfix_landing:null,retry:Xu(e),resume_eligible:t.resume_eligible,resume_reason:t.resume_reason,landed:Ru(e),confirmation:t.confirmation,...rg(t.history)}}function rg(e){if(!e||typeof e!="object")return{};let t=Array.isArray(e.events)?e.events:[],n=[];for(let o of t)!o||typeof o!="object"||typeof o.summary!="string"||o.summary.length===0||n.push({event_id:typeof o.event_id=="string"?o.event_id:"",kind:typeof o.kind=="string"?o.kind:"",summary:o.summary,at:typeof o.at=="number"?o.at:null});n.reverse();let r=typeof e.log_path=="string"&&e.log_path.length>0?e.log_path:null;return{...n.length>0?{timeline:n}:{},...r===null?{}:{log_path:r},...e.log_expired===!0?{log_expired:!0}:{},...e.log_unreadable===!0?{log_unreadable:!0}:{}}}function og(e){let t=e.cause_detail&&typeof e.cause_detail=="object"?e.cause_detail:null,n=Array.isArray(t?.blockers)?t.blockers:[],r=[];for(let o of n)!o||typeof o!="object"||typeof o.id!="string"||o.id.length===0||r.push({id:o.id,rig:typeof o.rig=="string"?o.rig:null,status:typeof o.status=="string"?o.status:""});return{summary:t&&typeof t.summary=="string"?t.summary:null,blockers:r,since:typeof e.finished_at=="number"?e.finished_at:null}}function Xu(e){let t=e&&e.retry&&typeof e.retry=="object"?e.retry:null;return t?{cause:typeof t.cause=="string"?t.cause:null,attempts:typeof t.attempts=="number"?t.attempts:0,max:typeof t.max=="number"?t.max:0,next_at:typeof t.next_at=="number"?t.next_at:null}:null}var sg=new Set(["parked","retry_wait","waiting"]);function ig(e,t){let n=Object.values(e||{}),r=new Map;for(let s of n)s&&typeof s.bead_id=="string"&&Kn(s)&&r.set(s.bead_id,s.attempt_id);let o=new Map;for(let s of n){if(!s||typeof s.bead_id!="string"||s.bead_id.length===0||!Kn(s)||!sg.has(s.status)||r.get(s.bead_id)!==s.attempt_id||typeof s.dismissed_at=="number")continue;let i=t.get(s.bead_id);typeof i=="number"&&i>0&&typeof s.finished_at=="number"&&i>=s.finished_at||o.set(s.bead_id,{attempt:s,run_state:s.status})}return o}function Gu(e,t){let n=e[t];if(!n)return"";if(n.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let r=typeof n.reason=="string"?n.reason:"",o=r.indexOf(":");return o>0&&o<r.length-1?`\u26D4 ${r.slice(0,o)} (${r.slice(o+1)})`:`\u26D4 ${r}`}function at(e){return e&&typeof e=="object"?e:{}}function ag(e){let t=at(e).badge_codes;return Array.isArray(t)?t.filter(n=>typeof n=="string"&&n.length>0):[]}function lg(e,t,n){let r=at(t);if(Object.keys(r).length===0)return null;let o=e.execution_defaults,s=e.runner_catalog,i=e.session_defaults;if(!o||!s||!i)return null;let l=g=>gn({pin:g,global:i,execution_defaults:o,runner_catalog:s,route:n}),a,u;try{a=l(r),u=l(null)}catch{return null}let p=Ku(ro(a,s),ro(u,s)),f=Ku(Er(a,null),Er(u,null));return p||f?{orchestration:p,worker:f}:null}function Ku(e,t){return!e||t&&t.text===e.text?null:e}function cg(e,t,n){let o=(t&&typeof t=="object"&&Array.isArray(t.released_by)?t.released_by:[]).filter(i=>i&&typeof i=="object"&&typeof i.id=="string").slice().sort((i,l)=>(typeof l.closed_at=="number"?l.closed_at:0)-(typeof i.closed_at=="number"?i.closed_at:0)),s=[];for(let i of o){let l=Fu(e,i,n);l&&s.push(l)}return s.length===0?null:s}function Na(e,t){return typeof e!="string"||e.length===0||typeof t!="string"||t.length===0||t===e?null:`\u2192 ${t}`}var ug=new Set(["quick_fix","spec_backed","full_plan"]);function Yu(e){return typeof e=="string"&&ug.has(e)}function dg(e){let t={...at(e.session_defaults)};for(let n of["orchestration_model","orchestration_effort","orchestration_speed"]){let r=e[n];typeof r=="string"&&(t[n]=r)}return t}function pg(e,t,n){let r=e.runner_catalog??null,o=Da(e,t,n,null);if(!o)return null;let s=En(r,o.orchestration_model.value??""),i=s===null?o:Da(e,t,n,s)||o,l=ro(i,r),a=Er(i,s);return l||a?{orchestration:l,worker:a}:null}function Da(e,t,n,r){let o=Yu(n)?n:Yu(t.route)?t.route:null;try{return gn({pin:t,global:dg(e),execution_defaults:e.execution_defaults??null,runner_catalog:e.runner_catalog??null,route:o,controller_runtime:r})}catch{return null}}function fg(e,t,n){return!t||!Object.hasOwn(t,"metadata")?null:Er(Da(e,at(t.metadata),t.route,n),n)}function qa(e,t){let n=new Set,r=e;for(;r&&!n.has(r.attempt_id);){if(r.conflict_resolution===!0)return!0;n.add(r.attempt_id),r=typeof r.resumed_from=="string"&&r.resumed_from.length>0&&t.get(r.resumed_from)||null}return!1}function _g(e){let t={};for(let l of Nn)t[l]=0;let n=!1,r=0,o=0,s=0;for(let l of e){let a=l.usage;if(!a||typeof a!="object")continue;let u=!1;for(let p of Nn)Number.isFinite(a[p])&&(t[p]+=a[p],n=!0,u=!0);u&&(o+=1,Number.isFinite(a.total_cost_usd)&&(r+=a.total_cost_usd,s+=1))}o>0&&s===o&&(t.total_cost_usd=r);let i=e.map(l=>l.usage).filter(l=>l&&typeof l=="object"&&l.providers);return i.length>0?rn(Ds(i)):n?Hn(t):null}function Qu(e,t){let n=Aa(e,t);return n==="internal"?"\uBBF8\uC801\uC7AC":n==="external"?"\uC678\uBD80":"\uC704\uCE58 \uBBF8\uD655\uC778"}function mg(e,t,n){let r=t.get(e);if(!r)return Qu(e,n);if(typeof r.position=="number"){if(r.lane==="parallel")return`#${r.position}`;if(/^s[1-5]$/.test(r.lane))return`${r.lane} #${r.position}`}return Oo(r)}function gg(e,t,n,r){let o=t.get(e);if(!o)return{label:Qu(e,n),title:""};if(typeof o.position=="number"&&(o.lane==="parallel"||/^s[1-5]$/.test(o.lane))){let i=r.get(e),l=o.lane==="parallel"?"\uBCD1\uB82C":o.lane;return{label:i&&i.length>0?"\u{1F512} \uB300\uAE30":"\uB300\uAE30",title:`${o.workspace_name||o.root_dir} ${l} #${o.position}`}}return{label:o.state==="running"?"\u25B6 \uC2E4\uD589\uC911":Oo(o),title:""}}function hg(e,t){for(let n of Object.values(e||{}))if(n&&n.attempt_id===t&&typeof n.armed_by_lane=="string"&&n.armed_by_lane.length>0)return n.armed_by_lane;return null}function bg(e,t,n,r,o,s){return t==="draft"?{state:"draft",badge:"draft",run_label:null,can_stop:!1}:n.some(i=>s.failed_by_bead.get(i.id)===e)?{state:"failed",badge:"\u26D4 \uC2E4\uD328",run_label:"\u25B6 \uB2E4\uC2DC \uC9C4\uD589",can_stop:!1}:s.disarmed_lanes.has(e)?{state:"restart",badge:"\u23F8 \uC7AC\uC2DC\uC791",run_label:"\u25B6 \uC9C4\uD589",can_stop:!1}:n.some(i=>s.armed_by_bead.get(i.id)===e)?{state:"running",badge:"\u25B6 \uC9C4\uD589 \uC911",run_label:o.length>0?"\u25B6 \uC774\uC5B4\uC11C \uC9C4\uD589":null,can_stop:!0}:r?{state:"all_done",badge:"\uBAA8\uB450 \uC644\uB8CC",run_label:null,can_stop:!1}:{state:"confirmed",badge:"\uD655\uC815",run_label:"\u25B6 \uC9C4\uD589",can_stop:!1}}function yg(e,t,n,r,o,s,i){let l=[];return e.forEach((a,u)=>{let p=typeof a.id=="string"?a.id:"";if(p.length===0)return;let f=a.status==="confirmed"?"confirmed":"draft",g=Array.isArray(a.entries)?a.entries:[],m=[];g.forEach((X,se)=>{let j=X&&typeof X.bead_id=="string"?X.bead_id:"";if(j.length===0)return;let q=X&&typeof X.root_dir=="string"?X.root_dir:"",C=n.get(j),I=C?C.state:void 0,F=I==="running"||I==="pr_wait"||I==="done",V=!C||I==="runnable",Q=C&&C.lane==="parallel"&&typeof C.position=="number"?C.position-1:null,P=gg(j,n,r,t),K=m.length>0?m[m.length-1].id:null,H=f==="confirmed"&&K!==null&&!(t.get(j)||[]).includes(K);m.push({id:j,title:o.get(j)||j,root_dir:C?C.root_dir:q,workspace_name:C?C.workspace_name:s.get(q)||"",seq:se+1,location_label:P.label,location_title:P.title,draggable:!F,fixed:F,done:I==="done",unplaced:V,mismatch:H,...Q!==null?{queue_index:Q}:{}})}),m.forEach((X,se)=>{X.seq=se+1});let k=m.length>0&&m.every(X=>X.done),R=m.filter(X=>!X.fixed&&i.armed_by_bead.get(X.id)!==p).map(X=>X.id),B=bg(p,f,m,k,R,i);l.push({lane_id:p,status:f,draft:f==="draft",number:u+1,label:`\uC5F0\uACB0 ${u+1} \xB7 \uB808\uD3EC \uAC04`,rows:m,all_done:k,can_confirm:f==="draft"&&m.length>=2,has_mismatch:f==="confirmed"&&m.some(X=>X.mismatch||X.unplaced),unlaunched:R,...B})}),l}function vg(e,t,n){if(e.lane==="runnable"){let i=n.get(e.id);return i?i.length===0?{scope:[],state:"missing"}:{scope:i,state:"declared"}:{scope:[],state:void 0}}let r=t.get(e.root_dir),o=r?r[e.id]:void 0;if(!o||!Array.isArray(o.scope))return{scope:[],state:void 0};let s=o.scope.filter(i=>typeof i=="string"&&i.length>0);return{scope:s,state:s.length===0?"missing":"declared"}}function wg(e,t,n,r,o){let s=new Map;for(let a of[...e.running,...e.queue,...e.runnable,...e.pr_wait]){if(!t.has(a.root_dir))continue;let u=`${a.root_dir}\0${a.id}`,p=s.get(u);if(p){p.cards.push(a);continue}let{scope:f,state:g}=vg(a,t,n);g!==void 0&&(a.scope_state=g),s.set(u,{cards:[a],scope:f})}let i=new Map;for(let a of s.values()){let u=a.cards[0].scope_state;if(u!==void 0)for(let g of a.cards)g.scope_state=u;if(a.scope.length===0)continue;let p=a.cards[0].root_dir,f=i.get(p);f?f.push(a):i.set(p,[a])}let l=(a,u,p)=>{let f=u.cards[0],g={id:f.id,title:f.title,location_label:mg(f.id,r,o),prefixes:p,...typeof f.root_dir=="string"&&f.root_dir.length>0?{root_dir:f.root_dir}:{}};for(let m of a.cards)m.overlap_chips?m.overlap_chips.push(g):m.overlap_chips=[g]};for(let a of i.values())for(let u=0;u<a.length;u+=1)for(let p=u+1;p<a.length;p+=1){let f=Hs(a[u].scope,a[p].scope);f.length!==0&&(l(a[u],a[p],f),l(a[p],a[u],f))}}function Vu(e,t,n){let r=n?n.get(t)?.root_dir:void 0,o=!Un(e.id,t),s=typeof e.root_dir=="string"?e.root_dir:"",i=typeof r=="string"&&r.length>0?r:o&&s.length>0?s:"";return i.length>0?{openable:!0,root_dir:i}:o?{openable:!0}:{}}function kg(e,t,n,r){let o=new Set(e?e.ids:[]);for(let l of t&&Array.isArray(t.ids)?t.ids:[])typeof l=="string"&&l.length>0&&o.add(l);if(o.size===0)return{ids:[]};let s={},i={...e?e.root_dirs:{},...t&&t.root_dirs&&typeof t.root_dirs=="object"?t.root_dirs:{}};for(let l of o){let a=i[l];if(typeof a=="string"&&a.length>0){s[l]=a;continue}if(!Un(n.id,l)){n.root_dir.length>0&&(s[l]=n.root_dir);continue}let u=r.get(l)?.root_dir;typeof u=="string"&&u.length>0&&(s[l]=u)}return{ids:[...o],root_dirs:s}}function Pa(e){if(typeof e=="number")return Number.isFinite(e)?e:null;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:null}return null}function ci(e){if(typeof e=="number"&&Number.isFinite(e))return e;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:0}return 0}function lr(e,t,n){let r=Array.isArray(e)?e:[],o=Array.isArray(t)?t:[],s=n&&typeof n.done_since=="number"?n.done_since:void 0,i={...io,...n&&n.candidate_filter?n.candidate_filter:{}},l=n&&Object.hasOwn(n,"cross_lanes")?n.cross_lanes??null:void 0,a=n&&n.candidate_sort==="as_given"?"as_given":n&&No.some(b=>b.value===n.candidate_sort)?n.candidate_sort:"repo_spec",u=n&&n.groups==="all"?"all":"nonempty",p=n&&n.candidate_hidden_counts==="per_control"?"per_control":"sequential",f=Date.now(),g=new Map;for(let b of o)b&&typeof b.root_dir=="string"&&g.set(b.root_dir,b);let m=new Map;for(let b of o)b&&typeof b.root_dir=="string"&&m.set(b.root_dir,b.name||b.root_dir);for(let b of r)b&&typeof b.root_dir=="string"&&m.set(b.root_dir,b.name||b.root_dir);let k=[],R=[],B=[],X=[],se=[],j=[],q=new Map,C=new Map,I=new Map,F=new Map,V=new Map,Q=new Map,P=new Map,K=new Map,H=new Map,ee=new Map,ke=new Map,Re=new Map,ne=new Map,D=new Set,ve=new Map,Ee=new Map,T=new Map;for(let b of r){if(!b||typeof b.root_dir!="string")continue;let z=b.root_dir,Ie=b.name||z,Le=g.get(z),Be=Le&&typeof Le.revision=="number"?Le.revision:typeof b.revision=="number"?b.revision:0,He=at(b.attempts),pt=at(b.bead_titles);for(let[d,_]of Object.entries(pt))typeof _=="string"&&_.length>0&&T.set(d,_);let xt=at(b.bead_times),Mt=at(b.pr_observations),Nt=at(b.admission),mt=at(b.revise_parked),ct=at(b.merge_queue_state),At=at(b.cleanup_failed),Rt=at(b.discard_operations),Lt=at(b.bead_timelines),ae=at(b.bead_blocked_by);Object.hasOwn(b,"bead_scope")&&ve.set(z,at(b.bead_scope));let ie=at(b.bead_workflow),$=at(b.pr_activity),M=Array.isArray(b.repo_operations)?b.repo_operations:[];K.set(z,M);let oe=typeof b.declared_base=="string"?b.declared_base:null;P.set(z,oe),Q.set(z,Object.entries(At).map(([d,_])=>({bead_id:d,step:_&&_.step?_.step:"",reason:_&&_.reason?_.reason:"",at:_&&typeof _.at=="number"?_.at:null,detail:_&&typeof _.detail=="string"?_.detail:null,output_tail:_&&typeof _.output_tail=="string"&&_.output_tail?_.output_tail:void 0,log_path:_&&typeof _.log_path=="string"&&_.log_path?_.log_path:void 0,retry_count:_&&typeof _.retry_count=="number"&&Number.isInteger(_.retry_count)&&_.retry_count>0?_.retry_count:0,failure_code:_&&typeof _.failure_code=="string"?_.failure_code:void 0})));for(let[d,_]of Object.entries(at(b.bead_overlay)))_&&typeof _=="object"&&H.set(`${z}\0${d}`,_);let te=new Map;for(let d of Object.values(He))d&&typeof d.attempt_id=="string"&&te.set(d.attempt_id,d);let le=Array.isArray(b.merge_queue)?b.merge_queue:[],Fe=new Set(le.filter(d=>d&&typeof d.bead_id=="string").map(d=>d.bead_id)),Ke=new Map(le.filter(d=>d&&typeof d.bead_id=="string").map(d=>[d.bead_id,d])),Je=new Map,Ue=new Map,kt=new Map,qt=new Map;le.forEach((d,_)=>{d&&typeof d.bead_id=="string"&&(Je.set(d.bead_id,_+1),Ue.set(d.bead_id,d.resolution),kt.set(d.bead_id,d.continuation_action||null),qt.set(d.bead_id,d.authority||null))});let yt=at(b.auto_merge_skips),Jt=d=>{let _=yt[d];if(!_)return null;let S=at(at(Mt[d]).pr).head_sha;return S&&S===_.head_sha?_.reason||"":null};V.set(z,{positions:Je,resolutions:Ue,continuations:kt,authorities:qt,state:{active:typeof ct.active=="string"?ct.active:null,failures:at(ct.failures),waiting:ct.waiting&&typeof ct.waiting.bead_id=="string"&&typeof ct.waiting.reason=="string"?ct.waiting:null},auto_excluded:(Array.isArray(b.pr_wait)?b.pr_wait:[]).map(d=>d&&d.bead_id).filter(d=>typeof d=="string"&&Jt(d)!==null),running:le.length>0});let St=Array.isArray(b.queue)?b.queue:[];for(let d of[...St,...Array.isArray(b.pr_wait)?b.pr_wait:[]])d&&typeof d.bead_id=="string"&&typeof d.armed_by_lane=="string"&&d.armed_by_lane.length>0&&Re.set(d.bead_id,d.armed_by_lane);for(let d of Array.isArray(b.disarmed_on_load)?b.disarmed_on_load:[])typeof d=="string"&&d.length>0&&D.add(d);let Ot=(Array.isArray(b.serial_lanes)?b.serial_lanes:[]).filter(d=>d&&/^s[1-5]$/.test(d.id)&&Array.isArray(d.entries)),Wt=at(b.lane_states),ut=typeof b.serial_lane_count=="number"?Math.max(0,Math.min(5,Math.floor(b.serial_lane_count))):Math.min(5,Ot.length);I.set(z,ut),F.set(z,St.length);let Kt=new Map(Ot.map(d=>[d.id,d])),Yt=new Map;for(let d of Ot)for(let _ of d.entries)_&&typeof _.bead_id=="string"&&Yt.set(_.bead_id,d.id);for(let[d,_]of Object.entries(at(b.bead_dependents))){let S=Array.isArray(_?.ids)?_.ids:[],G=at(_?.root_dirs),Y=ke.get(d)||{ids:new Set,root_dirs:{}};for(let ce of S)typeof ce=="string"&&ce.length>0&&Y.ids.add(ce);for(let[ce,Se]of Object.entries(G))typeof Se=="string"&&Se.length>0&&(Y.root_dirs[ce]=Se);ke.set(d,Y)}for(let[d,_]of Object.entries(ae))Array.isArray(_)&&ee.set(d,_.filter(S=>typeof S=="string"&&S.length>0));let zt=Array.isArray(b.done)?b.done:[];for(let d of zt)d&&typeof d.bead_id=="string"&&j.push({id:d.bead_id,root_dir:z,workspace_name:Ie});let mn=new Map;for(let d of zt)d&&typeof d.bead_id=="string"&&typeof d.added_at=="number"&&mn.set(d.bead_id,d.added_at);let jt=d=>({id:d,title:pt[d]||d,root_dir:z,workspace_name:Ie,expected_revision:Be,draggable:!1,...at(xt[d]).created_at?{created_at:at(xt[d]).created_at}:{},...at(xt[d]).updated_at?{updated_at:at(xt[d]).updated_at}:{}}),en=d=>{let _=ie[d]?.chips?.pr;return _&&typeof _.number=="number"&&typeof _.url=="string"?{pr_number:_.number,pr_url:_.url}:{}},Ht=d=>Object.hasOwn(ae,d)?{blocked_by:Array.isArray(ae[d])?ae[d].filter(_=>typeof _=="string"&&_.length>0):[]}:{},nn=(d,_)=>{let S=Ht(d),G=(_?.blockers||[]).map(ce=>ce.id);if(G.length===0)return S;let Y=[...S.blocked_by||[]];for(let ce of G)Y.includes(ce)||Y.push(ce);return{blocked_by:Y}},fe=new Set;for(let[d,_]of ng(He,mn,{discard_operations:Rt,observations:Mt,bead_timelines:Lt})){fe.add(d);let S=_.run_state==="failed"?hg(He,_.attempt_id):null;S!==null&&ne.set(d,S);let G=te.get(_.attempt_id)||null,Y=H.get(`${z}\0${d}`),ce=Y&&Y.rollup?Y.rollup:null,Se=Na(oe,G?G.target_base:null),Ye=G?qa(G,te):!1,rt=G&&G.quickfix_lane===!0&&G.quickfix_landing&&typeof G.quickfix_landing=="object"?G.quickfix_landing:null,vt=rt&&typeof rt.reason=="string"&&rt.reason.length>0?rt.reason:null,gt=rt?Mo({bead_id:d,merge_sha:rt.head_sha,cleanup_cursor:rt.cursor,cleanup_failed:vt?{step:rt.cursor,reason:vt}:null,repo_operations:M}):null;R.push({...jt(d),lane:"running",...nn(d,_.wait),...Yt.has(d)?{serial_lane_id:Yt.get(d)}:{},attempt_id:_.attempt_id,run_state:_.run_state,status:_.status||void 0,workflow:ie[d]||null,can_pause:_.can_pause,can_resume:_.can_resume,started_at:_.started_at,last_event_at:_.last_event_at,last_activity:_.last_activity,legs:_.legs,runner:_.runner,model:_.model,effort:_.effort,speed:_.speed,resumed_from:_.resumed_from,continuation_mode:_.continuation_mode,usage:_.usage,failure:_.failure||null,wait:_.wait||null,retry:_.retry||null,exec_chips:{orchestration:wa(_),worker:fg(at(Le),Y,_.runner||null)},discard:Vn(Rt,d,{attempt_id:_.attempt_id,merged:_.failure?.confirmation==="merged"||at(Mt[d]).pr?.state==="MERGED"}),...ce?{rollup:ce}:{},...Ye?{conflict_resolution:!0}:{},...Se?{base_exception:Se}:{},...gt?{landing:gt}:{},badges:_.run_state==="paused"?["\u23F8 \uC77C\uC2DC\uC815\uC9C0"]:_.run_state==="failed"?["\u26A0 \uC2E4\uD328"]:_.run_state==="parked"?["\u23F8 \uC138\uC158 \uB300\uAE30"]:_.run_state==="retry_wait"?["\u21BB \uC7AC\uC2DC\uB3C4 \uB300\uAE30"]:_.run_state==="waiting"?["\u26D3 \uC120\uD589 \uB300\uAE30"]:[],alert:_.run_state==="failed"})}for(let[d,_]of Qc(He)){if(R.some(G=>G.id===d))continue;let S=_.attempt;R.push({...jt(d),lane:"running",kind:"session",...Ht(d),attempt_id:typeof S.attempt_id=="string"?S.attempt_id:"",run_state:"running",status:"running",non_occupying:!0,workflow:ie[d]||null,can_pause:!1,can_resume:!1,started_at:_.started_at,last_event_at:typeof S.last_event_at=="number"?S.last_event_at:null,last_activity:S.last_activity&&typeof S.last_activity=="object"?S.last_activity:null,legs:Array.isArray(S.legs)?S.legs:[],runner:typeof S.runner=="string"?S.runner:null,model:typeof S.model=="string"?S.model:null,effort:typeof S.effort=="string"?S.effort:null,speed:typeof S.speed=="string"?S.speed:null,resumed_from:null,continuation_mode:null,usage:S.usage&&typeof S.usage=="object"?S.usage:null,exec_chips:{orchestration:wa(S),worker:null},discard:Vn(Rt,d,{merge_queued:!0}),badges:[_.origin==="auto"?"\uB9AC\uBDF0 \xB7 \uC790\uB3D9":"\uB9AC\uBDF0"],alert:!1})}for(let d of Array.isArray(b.session_active)?b.session_active:[]){let _=d&&d.bead_id;typeof _!="string"||fe.has(_)||(fe.add(_),Array.isArray(d.blocked_by)&&d.blocked_by.length>0&&ee.set(_,d.blocked_by.filter(S=>typeof S=="string"&&S.length>0)),typeof d.title=="string"&&d.title.length>0&&T.set(_,d.title),R.push({...jt(_),title:d.title||pt[_]||_,lane:"running",kind:"session",status:"in_progress",started_at:Pa(d.started_at)??Pa(d.updated_at)??void 0,updated_at:Pa(d.updated_at)??void 0,workflow:d.workflow||null,labels:Array.isArray(d.labels)?d.labels:[],spec_id:typeof d.spec_id=="string"?d.spec_id:"",blocked:d.blocked===!0,...Array.isArray(d.blocked_by)?{blocked_by:d.blocked_by.filter(S=>typeof S=="string"&&S.length>0)}:{},draggable:!1,can_pause:!1,can_resume:!1,exec_chips:null,usage:null,legs:[],last_activity:null,session_refs:Array.isArray(d.session_refs)?d.session_refs:[],badges:[],alert:!1}))}for(let d of Array.isArray(b.pr_wait)?b.pr_wait:[]){let _=d&&d.bead_id;if(typeof _!="string"||fe.has(_))continue;fe.add(_);let S=at(Mt[_]),G=at(S.pr),Y=S.gate?at(S.gate):null,ce=Fe.has(_),Se=Ke.get(_)?.continuation_action||null,Ye=!!Se&&Se.continuation===null,rt=ct.active===_,vt=d.external===!0,gt=At[_]||null,x=at($[_]),A=Mo({bead_id:_,merge_sha:d.merge_sha,cleanup_cursor:d.cleanup_cursor,merge_progress:x.merge_progress||null,cleanup_failed:gt,repo_operations:M}),Pe=li(A),je=!!Y&&Y.base_badge==="\uCDA9\uB3CC",Ze=!!gt&&["post_merge_jobs","child_sweep","branch_cleanup","parent_close"].includes(gt.step)&&!!Y&&Y.tier==="merged",_t=vt&&!!gt&&!!Y&&Y.tier==="merged",y=!!Y&&["closed_unmerged","review","undecidable"].includes(Y.tier),v=Vn(Rt,_,{external:vt,merge_active:rt||A?.step==="merge",merge_queued:ce,cleanup_active:Pe,merged:!!gt||Y?.tier==="merged"}),O=!!v.operation,de=ag(S.receipt_check);B.push({...jt(_),lane:"pr_wait",...Ht(_),...de.length>0?{receipt_badge:{codes:de}}:{},workflow:ie[_]||null,pr_number:typeof G.number=="number"?G.number:null,pr_url:typeof G.url=="string"?G.url:void 0,external:vt,usage:Gn(He,_),merge_step:A,badges:Ye?["\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694"]:A?[Y?.tier==="merged"?"\uBA38\uC9C0\uB428":"\uBA38\uC9C0 \uC911"]:gt?[Rr(gt.step)?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${Rr(gt.step)}`:"\uC815\uB9AC \uBA48\uCDA4"]:typeof Y?.gate_badge=="string"&&Y.gate_badge.length>0?[Y.gate_badge]:[],alert:A?A.failed===!0:!!gt||y,reason:gt&&A?.active!==!0?ai(gt.step):"PR \uB300\uAE30",merge_action:Y?.tier==="merged"&&!Ze&&!_t?!1:!ce||Ye,merge_enabled:!O&&(Ye||Y?.enabled===!0||je||Ze||_t),merge_label:Ye?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":_t||Ze?"\uC815\uB9AC \uC7AC\uC2DC\uB3C4":je&&!Ze?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":void 0,merge_title:Ye?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":O?v.error?`\uD3D0\uAE30 \uC2E4\uD328: ${v.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${v.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:_t?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uB2E4\uC2DC \uC2DC\uB3C4\uD569\uB2C8\uB2E4":Ze?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC2DC\uB3C4\uD569\uB2C8\uB2E4":je?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":Y?.enabled===!0?`\uBA38\uC9C0 (${Y.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4`:`\uBA38\uC9C0 \uBD88\uAC00: ${Y?.reason||"\uAD00\uCE21 \uB300\uAE30"}`,cancel_action:ce&&!Ye,cancel_enabled:!rt,continuation_mismatch:Se?.mismatch||null,discard:v,discard_action:v.action,discard_enabled:v.enabled,discard_title:v.title})}let E=(d,_,S,G)=>{let Y=d&&d.bead_id;if(typeof Y!="string"||fe.has(Y))return null;fe.add(Y);let ce=mt[Y],Se=Vn(Rt,Y),Ye=Se.operation?Se:null,rt={...jt(Y),lane:_,workflow:ie[Y]||null,draggable:!Ye,discard:Ye||void 0,reason:Gu(Nt,Y),seq:S+1,queue_position:S+1,queue_index:S,queue_length:G,badges:ce?["\u23F8 REVISE \uD30C\uD0B9"]:[],alert:!!ce,revise_action:!!ce,revise_enabled:!!ce&&!Ye,revise_title:ce?ce.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${ce.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":""},vt=Ht(Y);return Object.hasOwn(vt,"blocked_by")&&(rt.blocked_by=vt.blocked_by),rt};for(let d=0;d<St.length;d++){let _=E(St[d],"queue",d,St.length);if(!_)continue;X.push(_);let S=q.get(z);S?S.push(_):q.set(z,[_])}let me=d=>{let _=B.find(ce=>ce.id===d&&ce.root_dir===z);if(_)return{id:d,title:_.title,badge:"PR \uB300\uAE30 \xB7 \uC810\uC720"};let S=R.find(ce=>ce.id===d&&ce.root_dir===z),G=S?S.run_state:eg(He,d),Y=G==="failed"||G==="orphaned"?"\uC2E4\uD328 \xB7 \uC810\uC720 \uC720\uC9C0":G==="paused"?"\uC77C\uC2DC\uC815\uC9C0 \xB7 \uC810\uC720":"\uC2E4\uD589 \uC911 \xB7 \uC810\uC720";return{id:d,title:S?S.title:jt(d).title,badge:Y}},De=[];for(let d=0;d<Math.max(ut,Ot.length);d++){let _=`s${d+1}`,S=Kt.get(_),G=S&&Array.isArray(S.entries)?S.entries:[],Y=at(Wt[_]),ce=Array.isArray(Y.occupied_by)?Y.occupied_by.filter(rt=>typeof rt=="string"):[],Se=new Set(ce),Ye=[];for(let rt=0;rt<G.length;rt++){let vt=G[rt]&&G[rt].bead_id;if(typeof vt=="string"&&Se.has(vt)){fe.add(vt);continue}let gt=E(G[rt],_,rt,G.length);gt&&(Ye.push(gt),X.push(gt))}Ye.length===0&&ce.length===0&&(ut<=1||d>=ut)||De.push({id:_,index:d,items:Ye,raw_length:G.length,occupied_by:ce,occupants:ce.map(rt=>me(rt)),corrections:Array.isArray(Y.corrections)?Y.corrections.length:0,cycle:Y.cycle===!0,...Ye.length===0&&ce.length===0?{empty:!0}:{}})}C.set(z,De);let h=Array.from({length:ut},(d,_)=>{let S=`s${_+1}`,G=Kt.get(S),Y=G&&Array.isArray(G.entries)?G.entries:[],ce=at(Wt[S]);return{id:S,index:Y.length,length:Y.length,occupied_by:Array.isArray(ce.occupied_by)?ce.occupied_by.filter(Se=>typeof Se=="string"):[]}});for(let d of Array.isArray(b.runnable)?b.runnable:[]){let _=d&&d.bead_id;if(typeof _!="string"||fe.has(_))continue;fe.add(_);let S=d.workflow&&typeof d.workflow=="object"?d.workflow:null,G=S&&typeof S.route=="string"&&S.route||(typeof d.route=="string"?d.route:null),Y=lg(at(Le),d.exec_pins,G),ce=Ro(d.rec,d.exec_pins);Array.isArray(d.blocked_by)&&d.blocked_by.length>0&&ee.set(_,d.blocked_by.filter(A=>typeof A=="string"&&A.length>0)),typeof d.title=="string"&&d.title.length>0&&T.set(_,d.title),Array.isArray(d.scope)&&Ee.set(_,d.scope.filter(A=>typeof A=="string"&&A.length>0));let Se=d.eligible!==!1,Ye=d.worker_ineligible===!0,rt=Object.hasOwn(d,"eligible"),vt=[];typeof d.reason=="string"&&d.reason.length>0&&vt.push(d.reason);let gt=Gu(Nt,_);gt&&vt.push(gt);let x=cg(_,d.release_info,f)?.map(A=>({...A,...Vu({id:_,root_dir:z},A.id)}));k.push({...jt(_),title:d.title||pt[_]||_,lane:"runnable",draggable:!rt,queue_placeable:Se&&!Ye,...Ye?{worker_ineligible:!0}:{},...d.session_preferred===!0?{session_preferred:!0,session_preferred_reason:typeof d.session_preferred_reason=="string"?d.session_preferred_reason:""}:{},...d.spec_after_blocker===!0?{spec_after_blocker:!0}:{},...x?{dependency_chips:{released:x}}:{},...d.dependents_info&&typeof d.dependents_info=="object"?{dependents_info:d.dependents_info}:{},reason:vt.join(" \xB7 "),created_at:d.created_at??void 0,updated_at:d.updated_at??void 0,status:typeof d.status=="string"?d.status:void 0,labels:Array.isArray(d.labels)?d.labels:[],spec_id:typeof d.spec_id=="string"?d.spec_id:"",published:d.published===!0,workflow:S||(G?{route:G,chips:{route:G}}:null),...Y?{exec_chips:Y}:{},...ce?{rec:ce}:{},blocked:d.blocked===!0,...Array.isArray(d.blocked_by)?{blocked_by:d.blocked_by.filter(A=>typeof A=="string"&&A.length>0)}:{},place_index:St.length,place_lanes:h})}for(let d of zt){let _=d&&d.bead_id;if(typeof _!="string"||fe.has(_)||(fe.add(_),s!==void 0&&typeof d.added_at=="number"&&d.added_at<s))continue;let S=tg(He,_),G=S&&typeof S.done_kind=="string"?S.done_kind:null;se.push({...jt(_),lane:"done",done:!0,done_layout:"three_line",usage:Gn(He,_),work_ms:Tu(He,_),done_at:typeof d.added_at=="number"?d.added_at:void 0,done_kind:G,...en(_),badges:[...G&&Wu[G]?[Wu[G]]:[],...Su(He,_)]})}for(let d of Array.isArray(b.session_done)?b.session_done:[]){let _=d&&(d.id||d.bead_id);typeof _!="string"||fe.has(_)||(fe.add(_),se.push({...jt(_),...d,id:_,root_dir:z,workspace_name:Ie,expected_revision:Be,lane:"done",done:!0}))}}if(H.size>0)for(let b of[...k,...X,...R,...B,...se]){let z=H.get(`${b.root_dir}\0${b.id}`);if(!z||(typeof z.priority=="number"&&(b.priority=z.priority),typeof z.from_id=="string"&&z.from_id.length>0&&(b.from_id=z.from_id),b.lane==="done"&&Array.isArray(z.carried_to)&&z.carried_to.length>0&&(b.carried_to=z.carried_to),!Object.hasOwn(z,"metadata")))continue;let Ie=at(z.metadata);if(b.rec=Ro(Ie),b.lane==="runnable"||b.lane.startsWith("s")||b.lane==="queue"){let Le=pg(at(g.get(b.root_dir)),Ie,typeof z.route=="string"&&z.route.length>0?z.route:at(b.workflow).route);Le&&(b.exec_chips=Le)}}let Z=new Map;o.forEach((b,z)=>{b&&typeof b.root_dir=="string"&&Z.set(b.root_dir,z)});let we=n&&n.running_sort==="repo"?"repo":"started";R.sort((b,z)=>{let Ie=b.kind==="session",Le=z.kind==="session";if(Ie!==Le)return Ie?1:-1;if(Ie&&Le){let pt=ci(z.updated_at)-ci(b.updated_at);return pt!==0?pt:b.id.localeCompare(z.id)}if(we==="repo"){let pt=Z.get(b.root_dir)??Number.MAX_SAFE_INTEGER,xt=Z.get(z.root_dir)??Number.MAX_SAFE_INTEGER;if(pt!==xt)return pt-xt}let Be=typeof b.started_at=="number"&&Number.isFinite(b.started_at)?b.started_at:null,He=typeof z.started_at=="number"&&Number.isFinite(z.started_at)?z.started_at:null;return Be!==null&&He!==null&&Be!==He?Be-He:Be===null&&He!==null?1:Be!==null&&He===null?-1:b.id.localeCompare(z.id)}),se.sort((b,z)=>(z.done_at??0)-(b.done_at??0));let he=o.length>0?o:r.map(b=>({root_dir:b&&b.root_dir,name:b&&b.name,auto_advance:b&&b.auto_advance,auto_merge:b&&b.auto_merge,slots:b&&b.slots,revision:b&&b.revision,runner_catalog:b&&b.runner_catalog})),Te=new Set(k.map(b=>b.root_dir)),ge=new Map;for(let b of R)b.kind==="session"||b.run_state!=="running"||ge.set(b.root_dir,(ge.get(b.root_dir)||0)+1);let Oe=new Map;for(let b of se){let z=Oe.get(b.root_dir);z?z.push(b):Oe.set(b.root_dir,[b])}let Ge={positions:new Map,resolutions:new Map,continuations:new Map,authorities:new Map,state:{active:null,failures:{},waiting:null},auto_excluded:[],running:!1},et=[];for(let b of he){if(!b||typeof b.root_dir!="string")continue;let z=q.get(b.root_dir)||[],Ie=C.get(b.root_dir)||[],Le=z.length>0||Ie.some(pt=>pt.items.length>0||pt.occupied_by.length>0);if(u!=="all"&&!Le&&!Te.has(b.root_dir))continue;let Be=typeof b.slots=="number"&&b.slots>=ui?b.slots:ui,He=ge.get(b.root_dir)||0;et.push({live_count:He,over_cap:He>Be,merge:V.get(b.root_dir)||Ge,token_total:_g(Oe.get(b.root_dir)||[]),cleanup_failures:Q.get(b.root_dir)||[],declared_base:P.get(b.root_dir)??null,repo_operations:K.get(b.root_dir)||[],root_dir:b.root_dir,name:b.name||b.root_dir,auto_advance:b.auto_advance===!0,auto_merge:b.auto_merge===!0,slots:Be,revision:typeof b.revision=="number"?b.revision:0,runner_catalog:at(b.runner_catalog),items:z,sublanes:{parallel:z,serial:Ie},serial_lane_count:I.get(b.root_dir)||0,raw_queue_length:F.get(b.root_dir)||0})}let L={runnable:k,runnable_all:k,runnable_hidden:{blocked:0,spec:0},runnable_sections:[],runnable_flat:a==="updated_flat"||a==="as_given",queue:X,queue_groups:et,running:R,pr_wait:B,done:se,parallel_rows:[],chain_lanes:[],cross_lanes_revision:l&&typeof l.revision=="number"?l.revision:null,cross_lanes_unreadable:l===null,parallel_raw_length:Object.fromEntries(F),owner_of:{}},ue=yu(L);for(let b of j)ue.has(b.id)||ue.set(b.id,{root_dir:b.root_dir,workspace_name:b.workspace_name,lane:"done",state:"done"});for(let b of[...L.queue,...L.runnable,...L.running,...L.pr_wait]){if(!Object.hasOwn(b,"blocked_by"))continue;let z=ue.get(b.id);b.blockers=(b.blocked_by||[]).map(Ie=>vu(Ie,z,ue,o))}for(let b of[...L.queue,...L.runnable,...L.running,...L.pr_wait]){let z=(b.blockers||[]).map(Be=>({...La(b.id,Be),...Vu(b,Be.id,ue)})),Ie=Bu(b.id,kg(ke.get(b.id),b.dependents_info,b,ue));if(z.length===0&&Ie.length===0)continue;let Le={...b.dependency_chips||{},...z.length>0?{predecessors:z}:{},...Ie.length>0?{dependents:Ie}:{}};b.dependency_chips=Le}wg(L,ve,Ee,ue,o);let re=wu(L.queue_groups);for(let b of L.queue_groups)for(let z of b.sublanes.serial){let Ie=re.get(ku(b.root_dir,z.id));Ie&&(z.cross_wait_peers=Ie)}L.chain_lanes=yg(l&&Array.isArray(l.lanes)?l.lanes:[],ee,ue,o,T,m,{armed_by_bead:Re,failed_by_bead:ne,disarmed_lanes:D});let pe=new Map;for(let b of[...L.queue,...L.runnable])pe.has(b.id)||pe.set(b.id,b);let Ce=new Set;for(let b of L.chain_lanes)for(let z of b.rows){if(b.status==="confirmed"&&!z.unplaced&&!z.fixed&&Ce.add(z.id),!b.draft&&!z.unplaced)continue;let Ie=pe.get(z.id);Ie&&(Ie.cross_lane_chip={lane_id:b.lane_id,number:b.number,status:b.status,label:b.draft?`\uC5F0\uACB0 ${b.number} (draft)`:`\uC5F0\uACB0 ${b.number}`})}let _e=new Map(L.chain_lanes.map(b=>[b.lane_id,b.number]));for(let b of[...L.queue,...L.running]){let z=Re.get(b.id);if(typeof z!="string"||z.length===0)continue;let Ie=_e.get(z);b.armed_lane_chip=Ie===void 0?{lane_id:z,label:"\u25B6 \uC9C4\uD589 \uC911 \xB7 \uB808\uC778 \uC5C6\uC74C",orphan:!0}:{lane_id:z,label:`\u25B6 \uC5F0\uACB0 ${Ie}`,orphan:!1}}let xe=[];for(let b of q.values())for(let z of b)Ce.has(z.id)||xe.push(z);xe.sort((b,z)=>{let Ie=b.workspace_name.localeCompare(z.workspace_name);return Ie!==0?Ie:(b.queue_index??0)-(z.queue_index??0)}),L.parallel_rows=xe;let We={};for(let[b,z]of ue)typeof z.root_dir=="string"&&z.root_dir.length>0&&(We[b]=z.root_dir);for(let b of L.chain_lanes)for(let z of b.rows)!Object.hasOwn(We,z.id)&&z.root_dir.length>0&&m.has(z.root_dir)&&(We[z.id]=z.root_dir);L.owner_of=We;let Qe=L.runnable.length;L.runnable_all=L.runnable.slice();let qe=L.runnable,J=b=>i.show_blocked||b.blocked!==!0,U=b=>i.spec==="all"||(i.spec==="with"?b.published===!0:b.published!==!0);if(p==="per_control"){let b=[],z=0,Ie=0;for(let Le of qe){let Be=J(Le),He=U(Le);Be&&He?b.push(Le):!Be&&He?z+=1:Be&&!He&&(Ie+=1)}qe=b,L.runnable_hidden={blocked:z,spec:Ie}}else{qe=qe.filter(J);let b=qe.length;qe=qe.filter(U),L.runnable_hidden={blocked:Qe-b,spec:b-qe.length}}let Ae=(b,z)=>{let Ie=ci(z.updated_at)-ci(b.updated_at);return Ie!==0?Ie:b.id.localeCompare(z.id)},st=a==="repo_spec"?(b,z)=>{let Ie=b.published===!0?0:1,Le=z.published===!0?0:1;return Ie!==Le?Ie-Le:Ae(b,z)}:Ae;if(a==="as_given")L.runnable=qe,L.runnable_sections=[];else if(a==="updated_flat")L.runnable=qe.slice().sort(Ae),L.runnable_sections=[];else{let b=new Map;for(let Le of qe){let Be=b.get(Le.root_dir);Be?Be.push(Le):b.set(Le.root_dir,[Le])}let z=[],Ie=[];for(let Le of he){if(!Le||typeof Le.root_dir!="string")continue;let Be=(b.get(Le.root_dir)||[]).slice().sort(st);b.delete(Le.root_dir),Be.length!==0&&(z.push({root_dir:Le.root_dir,name:Le.name||Le.root_dir,items:Be.map(He=>({...He,workspace_name:""}))}),Ie.push(...Be))}for(let[Le,Be]of b){let He=Be.slice().sort(st);z.push({root_dir:Le,name:He[0]?.workspace_name||Le,items:He.map(pt=>({...pt,workspace_name:""}))}),Ie.push(...He)}L.runnable=Ie,L.runnable_sections=z}return L}function Zu(e,t){let n=new Map(e.map((a,u)=>[a,u])),r=new Map(e.map(a=>[a,new Set]));for(let a of t)a.blocker!==a.blockee&&n.has(a.blocker)&&n.has(a.blockee)&&r.get(a.blockee).add(a.blocker);let o=new Set,s=[];for(;s.length<e.length;){let a=e.find(u=>{if(o.has(u))return!1;for(let p of r.get(u))if(!o.has(p))return!1;return!0});if(a===void 0)return{order:[...e],corrections:[],cycle:!0};o.add(a),s.push(a)}let i=[],l=new Map(s.map((a,u)=>[a,u]));for(let a of s){let u=null;for(let p of r.get(a)){let f=Number(n.get(a))<Number(n.get(p)),g=Number(l.get(a))>Number(l.get(p));f&&g&&(u===null||Number(l.get(p))>Number(l.get(u)))&&(u=p)}u!==null&&i.push({bead_id:a,after:u})}return{order:s,corrections:i,cycle:!1}}var $g="\uB2E4\uB978 \uB808\uD3EC \uC774\uC288\uB294 \uC774 \uC9C1\uB82C \uB808\uC778\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",pi="\uC758\uC874 \uC790\uB8CC \uBBF8\uD655\uC815 \u2014 \uAD50\uC815 \uBCF4\uB958",xg="Worker \uD0ED \uC9C1\uB82C \uB808\uC778\uC5D0\uC11C \uBA3C\uC800 \uBE7C \uC8FC\uC138\uC694",Ag="\uC774\uBBF8 \uC9C4\uD589 \uC911\uC778 \uC774\uC288 \uC55E\uC5D0\uB294 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",ao="\uC5F0\uACB0 \uB808\uC778\uC774 \uC5C6\uC2B5\uB2C8\uB2E4";function qo(e,t){return`${e}\0${t}`}function Sg(e,t){let n=new Set(e),r=new Map;for(let o of e){let s=t.placed_members.has(o)?t.snapshot_blocked_by:t.runnable_blocked_by,i=s instanceof Map?s.get(o):void 0;if(!Array.isArray(i))return null;r.set(o,i.filter(l=>l!==o&&n.has(l)))}return r}function Eg(e,t){if(e.status!=="confirmed")return 0;let n=-1;return e.entries.forEach((r,o)=>{t.fixed_members.has(r.bead_id)&&(n=o)}),n+1}function Bo(e,t){let n=e.entries,r=n.map(f=>f.bead_id),o=Sg(r,t);if(o===null)return{entries:n,corrections:[],cycle:!1,held:!0,mismatched:[]};let s=[];for(let[f,g]of o)for(let m of g)s.push({blocker:m,blockee:f});let i=Eg(e,t),l=new Map(r.map((f,g)=>[f,g])),a=r.slice(0,i).filter(f=>o.get(f).some(g=>Number(l.get(g))>Number(l.get(f)))),u=Zu(r.slice(i),s);if(u.cycle)return{entries:n,corrections:[],cycle:!0,held:!1,mismatched:a};let p=new Map(n.map(f=>[f.bead_id,f]));return{entries:[...n.slice(0,i),...u.order.map(f=>p.get(f))],corrections:u.corrections,cycle:!1,held:!1,mismatched:a}}function Ju(e,t){let n=t.cross_lanes.get(e);return n===void 0?null:Bo(n,t)}function Tg(e,t){if(!(t.corrections.length===0&&!t.cycle&&!t.held&&t.mismatched.length===0))return{lane_id:e,corrected:t.corrections.length,cycle:t.cycle,held:t.held,mismatched:t.mismatched}}function Cg(e){return`${e}\uC758 \uB808\uD3EC\uB97C \uC54C \uC218 \uC5C6\uC5B4 \uC758\uC874\uC744 \uBC14\uAFC0 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4`}function Rg(e){let t=new Map;for(let[n,r]of e)t.set(n,r.slice());return t}function ja(e,t,n){let r=new Set([t]),o=[t];for(;o.length>0;){let s=o.pop();for(let i of e.get(s)||[]){if(i===n)return!0;r.has(i)||(r.add(i),o.push(i))}}return!1}function Og(e,t){let n=new Set;for(let[i,l]of t)for(let a of l)n.add(qo(i,a));let r=new Map,o=new Map;for(let i of e){let l=qo(i.a,i.b);r.set(l,i),o.set(l,i.type==="dep-add")}let s=[];for(let i of e){let l=qo(i.a,i.b);r.get(l)===i&&o.get(l)!==n.has(l)&&s.push(i)}return s}function Ig(e,t,n){let r=e.parallel_rows,o=Math.max(0,Math.min(r.length,n)),s=r[o];if(s&&s.root_dir===t)return s.queue_index;for(let i=o-1;i>=0;i--)if(r[i].root_dir===t)return r[i].queue_index+1;for(let i=o;i<r.length;i++)if(r[i].root_dir===t)return r[i].queue_index;return e.parallel_raw_length.get(t)??0}function Lg(e,t){return e.parallel_rows.some(n=>n.root_dir===t)}function di(e,t,n,r){return{type:"worker-queue-place",payload:{bead_id:e,...r?{lane:r}:{},index:n},root_dir:t}}function Fa(e,t){let n=0;for(let r of e.cross_lanes.keys())if(n+=1,r===t)return n;return n+1}function Uo(e){let t=Rg(e.blocked_by_map),n=[],r=new Set,o={refusal:null},s=u=>{let p=e.owner_of.get(u);return typeof p!="string"||p.length===0?(o.refusal=Cg(u),null):p};return{graph:t,dep_ops:n,state:o,ownerOf:s,addDep:(u,p,f)=>{if(o.refusal!==null||u===p)return;let g=t.get(u)||[];if(g.includes(p))return;let m=s(u);if(m!==null){if(ja(t,p,u)){o.refusal=`\uC758\uC874 \uC0AC\uC774\uD074\uC774 \uC0DD\uAE41\uB2C8\uB2E4 \u2014 ${u}\uAC00 \uC774\uBBF8 ${p}\uB97C \uB9C9\uACE0 \uC788\uC2B5\uB2C8\uB2E4`;return}t.set(u,[...g,p]),f!==void 0&&r.add(qo(u,p)),n.push({type:"dep-add",a:u,b:p,root_dir:m,...f===void 0?{}:{lane_id:f}})}},removeDep:(u,p)=>{if(o.refusal!==null||u===p)return;let f=t.get(u)||[];if(!f.includes(p))return;let g=s(u);g!==null&&(t.set(u,f.filter(m=>m!==p)),n.push({type:"dep-remove",a:u,b:p,root_dir:g}))},laneCreated:(u,p)=>r.has(qo(u,p))}}function Wo(e,t,n,r,o={}){if(e.state.refusal!==null)return{refused:e.state.refusal};let s=Og(e.dep_ops,t.blocked_by_map),i=s.filter(p=>p.type==="dep-remove"),l=s.filter(p=>p.type==="dep-add"),a=o.disarm_ops??[],u=o.lane_id===void 0||o.correction===void 0?void 0:Tg(o.lane_id,o.correction);return{lane_ops:n,ops:[...i,...a,...l,...r],lane_op_index:i.length+a.length,...u===void 0?{}:{correction:u}}}function ed(e,t,n){for(let r=1;r<t.length;r+=1)e.addDep(t[r].bead_id,t[r-1].bead_id,n)}function jo(e,t){return t>0&&e.entries[t]?.dep_created_by_lane===!0}function td(e,t,n,r){if(t.status!=="confirmed")return[];let o=[],s=new Map;for(let i of r){let l=e.owner_of.get(i.bead_id)||i.root_dir;typeof l!="string"||l.length===0||s.set(l,[...s.get(l)||[],i.bead_id])}for(let[i,l]of s)o.push({type:"worker-queue-disarm",payload:{bead_ids:l,lane_id:n},root_dir:i});return o}function nd(e,t,n,r){let o=new Map;for(let s of n){if(t.placed_members.has(s.bead_id))continue;let i=e.ownerOf(s.bead_id);if(i===null)return;let l=o.get(i)??0;r.push(di(s.bead_id,i,(t.parallel_raw_length.get(i)??0)+l)),o.set(i,l+1)}}function Fo(e){return e.map(t=>({bead_id:t.bead_id,root_dir:t.root_dir}))}function fi(e,t){return e.length===t.length&&e.every((n,r)=>n.bead_id===t[r].bead_id&&n.root_dir===t[r].root_dir)}function _i(e,t,n){let r=Uo(n),o=[],s=[],i=[],l,a=n.owner_lane_of.get(e.bead_id),u=e.kind==="chain"?e.lane_id??a:void 0,p=u===void 0?void 0:n.cross_lanes.get(u);if(t.kind==="repo-serial"&&e.root_dir!==t.root_dir)return{refused:$g};if(t.kind==="chain"){if(e.kind==="repo-serial")return{refused:xg};if(e.kind!=="chain"&&typeof a=="string"&&a!==t.lane_id&&n.cross_lanes.has(a))return{refused:`\uC774\uBBF8 \uC5F0\uACB0 ${Fa(n,a)}\uC5D0 \uC788\uC2B5\uB2C8\uB2E4`};if(!n.cross_lanes.has(t.lane_id))return{refused:ao}}if(e.kind==="chain"&&p===void 0)return{refused:ao};let f=()=>{if(p===void 0||p.status!=="confirmed")return;let k=p.entries.findIndex(j=>j.bead_id===e.bead_id);if(k<0)return;let R=k>0?p.entries[k-1]:null,B=k+1<p.entries.length?p.entries[k+1]:null,X=jo(p,k),se=B!==null&&jo(p,k+1);X&&R!==null&&r.removeDep(e.bead_id,R.bead_id),se&&B!==null&&r.removeDep(B.bead_id,e.bead_id),(X||se)&&R!==null&&B!==null&&r.addDep(B.bead_id,R.bead_id,u)},g=(k,R)=>{let B=n.cross_lanes.get(k),X=B.entries.findIndex(P=>P.bead_id===e.bead_id),se=B.entries.filter(P=>P.bead_id!==e.bead_id),j=Math.max(0,Math.min(se.length,X>=0&&R>X?R-1:R)),q=-1;if(se.forEach((P,K)=>{n.fixed_members.has(P.bead_id)&&(q=K)}),j<=q){r.state.refusal=Ag;return}let C=X>=0?B.entries[X]:p?.entries.find(P=>P.bead_id===e.bead_id)??{bead_id:e.bead_id,root_dir:e.root_dir};l=Bo({status:B.status,entries:[...se.slice(0,j),C,...se.slice(j)]},n);let I=l.entries;if(fi(I,B.entries)||o.push({type:"monitor-lane-update",payload:{lane_id:k,entries:Fo(I)}}),B.status!=="confirmed")return;let F=I.findIndex(P=>P.bead_id===e.bead_id),V=F>0?I[F-1].bead_id:null,Q=F+1<I.length?I[F+1].bead_id:null;if(V===null){Q!==null&&r.addDep(Q,e.bead_id,k);return}if(r.addDep(e.bead_id,V,k),Q!==null&&(r.graph.get(Q)||[]).includes(V)){let P=B.entries.findIndex(K=>K.bead_id===Q);(r.laneCreated(Q,V)||P>0&&B.entries[P-1].bead_id===V&&jo(B,P))&&r.removeDep(Q,V),r.addDep(Q,e.bead_id,k)}},m=typeof e.queue_index=="number"?e.queue_index:n.queue_index_of.get(e.bead_id);if(e.kind==="chain"&&(f(),p!==void 0&&(t.kind!=="chain"||t.lane_id!==u)&&(i.push(...td(n,p,u,p.entries.filter(k=>k.bead_id===e.bead_id))),o.push({type:"monitor-lane-update",payload:{lane_id:u,entries:Fo(p.entries.filter(k=>k.bead_id!==e.bead_id))}}))),t.kind==="chain"&&g(t.lane_id,t.marker_index),r.state.refusal!==null)return{refused:r.state.refusal};if(t.kind==="candidate")e.kind!=="candidate"&&s.push({type:"worker-queue-remove",payload:{bead_id:e.bead_id},root_dir:e.root_dir});else if(t.kind==="parallel"){let k=Ig(n,e.root_dir,t.marker_index);if(e.kind==="candidate"||e.kind==="repo-serial")s.push(di(e.bead_id,e.root_dir,k));else if(e.kind==="parallel"){let R=n.parallel_rows,B=R[Math.max(0,Math.min(R.length,t.marker_index))];if(!(!!B&&B.bead_id===e.bead_id)&&Lg(n,e.root_dir)&&m!==void 0){let se=m>k?k:k-1;se>=0&&se!==m&&s.push({type:"worker-queue-reorder",payload:{bead_id:e.bead_id,to_index:se},root_dir:e.root_dir})}}}else if(t.kind==="chain"){let k=n.cross_lanes.get(t.lane_id);e.kind==="candidate"&&k.status==="confirmed"&&s.push(di(e.bead_id,e.root_dir,n.parallel_raw_length.get(e.root_dir)??0))}else if(e.kind==="repo-serial"&&e.lane_id===t.lane_id){if(m!==void 0&&t.index!==m){let k=m>t.index?t.index:t.index-1;k>=0&&k!==m&&s.push({type:"worker-queue-reorder",payload:{bead_id:e.bead_id,lane:t.lane_id,to_index:k},root_dir:e.root_dir})}}else s.push(di(e.bead_id,e.root_dir,t.index,t.lane_id));return Wo(r,n,o,s,{disarm_ops:i,...t.kind==="chain"?{lane_id:t.lane_id,correction:l}:{}})}function rd(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:ao};if(n.entries.length<2)return{refused:"\uD655\uC815\uD558\uB824\uBA74 \uBA64\uBC84\uAC00 2\uAC1C \uC774\uC0C1\uC774\uC5B4\uC57C \uD569\uB2C8\uB2E4"};let r=Bo(n,t);if(r.held)return{refused:pi};let o=r.entries,s=Uo(t),i=[];ed(s,o,e),s.state.refusal===null&&nd(s,t,o,i);let l=fi(o,n.entries)?[]:[{type:"monitor-lane-update",payload:{lane_id:e,entries:Fo(o)}}];return l.push({type:"monitor-lane-confirm",payload:{lane_id:e}}),Wo(s,t,l,i,{lane_id:e,correction:r})}function od(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:ao};let r=Bo(n,t),o=r.entries,s=Uo(t),i=[];ed(s,o,e),s.state.refusal===null&&nd(s,t,o,i);let l=fi(o,n.entries)?[]:[{type:"monitor-lane-update",payload:{lane_id:e,entries:Fo(o)}}];return Wo(s,t,l,i,{lane_id:e,correction:r})}function sd(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:ao};let r=Bo(n,t),o=r.entries;return Wo(Uo(t),t,fi(o,n.entries)?[]:[{type:"monitor-lane-update",payload:{lane_id:e,entries:Fo(o)}}],[],{lane_id:e,correction:r})}function id(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:ao};let r=Uo(t);if(n.status==="confirmed")for(let o=1;o<n.entries.length;o+=1)jo(n,o)&&r.removeDep(n.entries[o].bead_id,n.entries[o-1].bead_id);return Wo(r,t,[{type:"monitor-lane-remove",payload:{lane_id:e}}],[],{disarm_ops:td(t,n,e,n.entries)})}function ad(e,t){let n=t.cross_lanes.get(e);if(n===void 0||n.status!=="confirmed")return null;let r=[],o=[];for(let i=1;i<n.entries.length;i+=1){let l=`  ${n.entries[i].bead_id} \u2190 ${n.entries[i-1].bead_id}`;jo(n,i)?r.push(l):o.push(`${l} (\uB808\uC778\uC774 \uB9CC\uB4E4\uC9C0 \uC54A\uC74C)`)}let s=`\uC5F0\uACB0 ${Fa(t,e)}\uC744 \uC9C0\uC6C1\uB2C8\uB2E4.`;return r.length===0?`${s}
\uC758\uC874\uC740 \uADF8\uB300\uB85C \uB461\uB2C8\uB2E4`:[s,"\uD568\uAED8 \uC81C\uAC70\uD560 \uC758\uC874:",...r,...o.length===0?[]:["\uADF8\uB300\uB85C \uB450\uB294 \uC758\uC874:",...o]].join(`
`)}function ld(e){let t=new Map;for(let n of e)n.type!=="dep-add"||typeof n.lane_id!="string"||t.set(n.lane_id,[...t.get(n.lane_id)||[],{bead_id:n.a,after:n.b}]);return[...t].map(([n,r])=>({lane_id:n,pairs:r}))}function cd(e,t){let n=new Map(e.map((r,o)=>[r.bead_id,o]));return t.filter(r=>{let o=n.get(r.bead_id);return o!==void 0&&o>0&&e[o-1].bead_id===r.after})}function Ba(e,t){if(e!==null){let n=t.owner_lane_of.get(e.bead_id);if(typeof n=="string"&&t.cross_lanes.has(n))return{refused:`\uC774\uBBF8 \uC5F0\uACB0 ${Fa(t,n)}\uC5D0 \uC788\uC2B5\uB2C8\uB2E4`}}return{lane_ops:[{type:"monitor-lane-create",payload:{entries:e===null?[]:[e]}}],ops:[],lane_op_index:0}}var Pg="\uC0AC\uC774\uD074";function Dg(e){let t=new Map,n=r=>Array.isArray(r)?r.filter(o=>typeof o=="string"&&o.length>0):[];for(let r of Array.isArray(e)?e:[]){if(!r||typeof r!="object")continue;let o=r.bead_blocked_by&&typeof r.bead_blocked_by=="object"?r.bead_blocked_by:{};for(let[s,i]of Object.entries(o))Array.isArray(i)&&t.set(s,n(i));for(let s of[...Array.isArray(r.runnable)?r.runnable:[],...Array.isArray(r.session_active)?r.session_active:[]])s&&typeof s.bead_id=="string"&&Array.isArray(s.blocked_by)&&s.blocked_by.length>0&&t.set(s.bead_id,n(s.blocked_by))}return t}function Ua(e,t,n){let r=lr(e,t),o=[],s=new Set,i=(a,u)=>{for(let p of a)s.has(p.id)||(s.add(p.id),o.push({bead_id:p.id,root_dir:p.root_dir,workspace_name:p.workspace_name,title:p.title,lane:u}))};i(r.running,"running"),i(r.pr_wait,"pr_wait"),i(r.queue,"queue"),i(r.runnable_all,"runnable");let l=n&&typeof n.root_dir=="string"&&n.root_dir.length?n.root_dir:null;return{issues:l===null?o:o.filter(a=>a.root_dir===l),blocked_by_map:Dg(e)}}function ud(e,t){let n=new Map;for(let i of t.issues)!i||typeof i.bead_id!="string"||i.bead_id.length===0||n.has(i.bead_id)||n.set(i.bead_id,i);let r=n.get(e)?.root_dir,o=t.blocked_by_map.get(e)||[],s=[];for(let i of n.values()){if(i.bead_id===e||i.lane==="done"||o.includes(i.bead_id))continue;let l=ja(t.blocked_by_map,i.bead_id,e);s.push({...i,disabled:l,...l?{reason:Pg}:{}})}return s.sort((i,l)=>{let a=r!==void 0&&i.root_dir===r,u=r!==void 0&&l.root_dir===r;return a!==u?a?-1:1:i.bead_id.localeCompare(l.bead_id)}),s}function dd(e,t){let n=t.trim().toLowerCase();return n.length===0?e.slice():e.filter(r=>r.bead_id.toLowerCase().includes(n)||r.title.toLowerCase().includes(n))}var{entries:vd,setPrototypeOf:pd,isFrozen:Mg,getPrototypeOf:Ng,getOwnPropertyDescriptor:qg}=Object,{freeze:cn,seal:kn,create:Va}=Object,{apply:Xa,construct:Qa}=typeof Reflect<"u"&&Reflect;cn||(cn=function(t){return t});kn||(kn=function(t){return t});Xa||(Xa=function(t,n){for(var r=arguments.length,o=new Array(r>2?r-2:0),s=2;s<r;s++)o[s-2]=arguments[s];return t.apply(n,o)});Qa||(Qa=function(t){for(var n=arguments.length,r=new Array(n>1?n-1:0),o=1;o<n;o++)r[o-1]=arguments[o];return new t(...r)});var mi=un(Array.prototype.forEach),jg=un(Array.prototype.lastIndexOf),fd=un(Array.prototype.pop),zo=un(Array.prototype.push),Fg=un(Array.prototype.splice),hi=un(String.prototype.toLowerCase),Wa=un(String.prototype.toString),za=un(String.prototype.match),Ho=un(String.prototype.replace),Bg=un(String.prototype.indexOf),Ug=un(String.prototype.trim),Cn=un(Object.prototype.hasOwnProperty),ln=un(RegExp.prototype.test),Go=Wg(TypeError);function un(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var n=arguments.length,r=new Array(n>1?n-1:0),o=1;o<n;o++)r[o-1]=arguments[o];return Xa(e,t,r)}}function Wg(e){return function(){for(var t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];return Qa(e,n)}}function ft(e,t){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:hi;pd&&pd(e,null);let r=t.length;for(;r--;){let o=t[r];if(typeof o=="string"){let s=n(o);s!==o&&(Mg(t)||(t[r]=s),o=s)}e[o]=!0}return e}function zg(e){for(let t=0;t<e.length;t++)Cn(e,t)||(e[t]=null);return e}function Xn(e){let t=Va(null);for(let[n,r]of vd(e))Cn(e,n)&&(Array.isArray(r)?t[n]=zg(r):r&&typeof r=="object"&&r.constructor===Object?t[n]=Xn(r):t[n]=r);return t}function Ko(e,t){for(;e!==null;){let r=qg(e,t);if(r){if(r.get)return un(r.get);if(typeof r.value=="function")return un(r.value)}e=Ng(e)}function n(){return null}return n}var _d=cn(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),Ha=cn(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),Ga=cn(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),Hg=cn(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),Ka=cn(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),Gg=cn(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),md=cn(["#text"]),gd=cn(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),Ya=cn(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),hd=cn(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),gi=cn(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),Kg=kn(/\{\{[\w\W]*|[\w\W]*\}\}/gm),Yg=kn(/<%[\w\W]*|[\w\W]*%>/gm),Vg=kn(/\$\{[\w\W]*/gm),Xg=kn(/^data-[\-\w.\u00B7-\uFFFF]+$/),Qg=kn(/^aria-[\-\w]+$/),wd=kn(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),Zg=kn(/^(?:\w+script|data):/i),Jg=kn(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),kd=kn(/^html$/i),eh=kn(/^[a-z][.\w]*(-[.\w]+)+$/i),bd=Object.freeze({__proto__:null,ARIA_ATTR:Qg,ATTR_WHITESPACE:Jg,CUSTOM_ELEMENT:eh,DATA_ATTR:Xg,DOCTYPE_NAME:kd,ERB_EXPR:Yg,IS_ALLOWED_URI:wd,IS_SCRIPT_OR_DATA:Zg,MUSTACHE_EXPR:Kg,TMPLIT_EXPR:Vg}),Yo={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,progressingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},th=function(){return typeof window>"u"?null:window},nh=function(t,n){if(typeof t!="object"||typeof t.createPolicy!="function")return null;let r=null,o="data-tt-policy-suffix";n&&n.hasAttribute(o)&&(r=n.getAttribute(o));let s="dompurify"+(r?"#"+r:"");try{return t.createPolicy(s,{createHTML(i){return i},createScriptURL(i){return i}})}catch{return console.warn("TrustedTypes policy "+s+" could not be created."),null}},yd=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function $d(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:th(),t=fe=>$d(fe);if(t.version="3.3.0",t.removed=[],!e||!e.document||e.document.nodeType!==Yo.document||!e.Element)return t.isSupported=!1,t;let{document:n}=e,r=n,o=r.currentScript,{DocumentFragment:s,HTMLTemplateElement:i,Node:l,Element:a,NodeFilter:u,NamedNodeMap:p=e.NamedNodeMap||e.MozNamedAttrMap,HTMLFormElement:f,DOMParser:g,trustedTypes:m}=e,k=a.prototype,R=Ko(k,"cloneNode"),B=Ko(k,"remove"),X=Ko(k,"nextSibling"),se=Ko(k,"childNodes"),j=Ko(k,"parentNode");if(typeof i=="function"){let fe=n.createElement("template");fe.content&&fe.content.ownerDocument&&(n=fe.content.ownerDocument)}let q,C="",{implementation:I,createNodeIterator:F,createDocumentFragment:V,getElementsByTagName:Q}=n,{importNode:P}=r,K=yd();t.isSupported=typeof vd=="function"&&typeof j=="function"&&I&&I.createHTMLDocument!==void 0;let{MUSTACHE_EXPR:H,ERB_EXPR:ee,TMPLIT_EXPR:ke,DATA_ATTR:Re,ARIA_ATTR:ne,IS_SCRIPT_OR_DATA:D,ATTR_WHITESPACE:ve,CUSTOM_ELEMENT:Ee}=bd,{IS_ALLOWED_URI:T}=bd,Z=null,we=ft({},[..._d,...Ha,...Ga,...Ka,...md]),he=null,Te=ft({},[...gd,...Ya,...hd,...gi]),ge=Object.seal(Va(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),Oe=null,Ge=null,et=Object.seal(Va(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}})),L=!0,ue=!0,re=!1,pe=!0,Ce=!1,_e=!0,xe=!1,We=!1,Qe=!1,qe=!1,J=!1,U=!1,Ae=!0,lt=!1,st="user-content-",b=!0,z=!1,Ie={},Le=null,Be=ft({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]),He=null,pt=ft({},["audio","video","img","source","image","track"]),xt=null,Mt=ft({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),Nt="http://www.w3.org/1998/Math/MathML",mt="http://www.w3.org/2000/svg",ct="http://www.w3.org/1999/xhtml",At=ct,Rt=!1,Lt=null,ae=ft({},[Nt,mt,ct],Wa),ie=ft({},["mi","mo","mn","ms","mtext"]),$=ft({},["annotation-xml"]),M=ft({},["title","style","font","a","script"]),oe=null,te=["application/xhtml+xml","text/html"],le="text/html",Fe=null,Ke=null,Je=n.createElement("form"),Ue=function(E){return E instanceof RegExp||E instanceof Function},kt=function(){let E=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(Ke&&Ke===E)){if((!E||typeof E!="object")&&(E={}),E=Xn(E),oe=te.indexOf(E.PARSER_MEDIA_TYPE)===-1?le:E.PARSER_MEDIA_TYPE,Fe=oe==="application/xhtml+xml"?Wa:hi,Z=Cn(E,"ALLOWED_TAGS")?ft({},E.ALLOWED_TAGS,Fe):we,he=Cn(E,"ALLOWED_ATTR")?ft({},E.ALLOWED_ATTR,Fe):Te,Lt=Cn(E,"ALLOWED_NAMESPACES")?ft({},E.ALLOWED_NAMESPACES,Wa):ae,xt=Cn(E,"ADD_URI_SAFE_ATTR")?ft(Xn(Mt),E.ADD_URI_SAFE_ATTR,Fe):Mt,He=Cn(E,"ADD_DATA_URI_TAGS")?ft(Xn(pt),E.ADD_DATA_URI_TAGS,Fe):pt,Le=Cn(E,"FORBID_CONTENTS")?ft({},E.FORBID_CONTENTS,Fe):Be,Oe=Cn(E,"FORBID_TAGS")?ft({},E.FORBID_TAGS,Fe):Xn({}),Ge=Cn(E,"FORBID_ATTR")?ft({},E.FORBID_ATTR,Fe):Xn({}),Ie=Cn(E,"USE_PROFILES")?E.USE_PROFILES:!1,L=E.ALLOW_ARIA_ATTR!==!1,ue=E.ALLOW_DATA_ATTR!==!1,re=E.ALLOW_UNKNOWN_PROTOCOLS||!1,pe=E.ALLOW_SELF_CLOSE_IN_ATTR!==!1,Ce=E.SAFE_FOR_TEMPLATES||!1,_e=E.SAFE_FOR_XML!==!1,xe=E.WHOLE_DOCUMENT||!1,qe=E.RETURN_DOM||!1,J=E.RETURN_DOM_FRAGMENT||!1,U=E.RETURN_TRUSTED_TYPE||!1,Qe=E.FORCE_BODY||!1,Ae=E.SANITIZE_DOM!==!1,lt=E.SANITIZE_NAMED_PROPS||!1,b=E.KEEP_CONTENT!==!1,z=E.IN_PLACE||!1,T=E.ALLOWED_URI_REGEXP||wd,At=E.NAMESPACE||ct,ie=E.MATHML_TEXT_INTEGRATION_POINTS||ie,$=E.HTML_INTEGRATION_POINTS||$,ge=E.CUSTOM_ELEMENT_HANDLING||{},E.CUSTOM_ELEMENT_HANDLING&&Ue(E.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(ge.tagNameCheck=E.CUSTOM_ELEMENT_HANDLING.tagNameCheck),E.CUSTOM_ELEMENT_HANDLING&&Ue(E.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(ge.attributeNameCheck=E.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),E.CUSTOM_ELEMENT_HANDLING&&typeof E.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(ge.allowCustomizedBuiltInElements=E.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),Ce&&(ue=!1),J&&(qe=!0),Ie&&(Z=ft({},md),he=[],Ie.html===!0&&(ft(Z,_d),ft(he,gd)),Ie.svg===!0&&(ft(Z,Ha),ft(he,Ya),ft(he,gi)),Ie.svgFilters===!0&&(ft(Z,Ga),ft(he,Ya),ft(he,gi)),Ie.mathMl===!0&&(ft(Z,Ka),ft(he,hd),ft(he,gi))),E.ADD_TAGS&&(typeof E.ADD_TAGS=="function"?et.tagCheck=E.ADD_TAGS:(Z===we&&(Z=Xn(Z)),ft(Z,E.ADD_TAGS,Fe))),E.ADD_ATTR&&(typeof E.ADD_ATTR=="function"?et.attributeCheck=E.ADD_ATTR:(he===Te&&(he=Xn(he)),ft(he,E.ADD_ATTR,Fe))),E.ADD_URI_SAFE_ATTR&&ft(xt,E.ADD_URI_SAFE_ATTR,Fe),E.FORBID_CONTENTS&&(Le===Be&&(Le=Xn(Le)),ft(Le,E.FORBID_CONTENTS,Fe)),b&&(Z["#text"]=!0),xe&&ft(Z,["html","head","body"]),Z.table&&(ft(Z,["tbody"]),delete Oe.tbody),E.TRUSTED_TYPES_POLICY){if(typeof E.TRUSTED_TYPES_POLICY.createHTML!="function")throw Go('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof E.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw Go('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');q=E.TRUSTED_TYPES_POLICY,C=q.createHTML("")}else q===void 0&&(q=nh(m,o)),q!==null&&typeof C=="string"&&(C=q.createHTML(""));cn&&cn(E),Ke=E}},qt=ft({},[...Ha,...Ga,...Hg]),yt=ft({},[...Ka,...Gg]),Jt=function(E){let me=j(E);(!me||!me.tagName)&&(me={namespaceURI:At,tagName:"template"});let De=hi(E.tagName),h=hi(me.tagName);return Lt[E.namespaceURI]?E.namespaceURI===mt?me.namespaceURI===ct?De==="svg":me.namespaceURI===Nt?De==="svg"&&(h==="annotation-xml"||ie[h]):!!qt[De]:E.namespaceURI===Nt?me.namespaceURI===ct?De==="math":me.namespaceURI===mt?De==="math"&&$[h]:!!yt[De]:E.namespaceURI===ct?me.namespaceURI===mt&&!$[h]||me.namespaceURI===Nt&&!ie[h]?!1:!yt[De]&&(M[De]||!qt[De]):!!(oe==="application/xhtml+xml"&&Lt[E.namespaceURI]):!1},St=function(E){zo(t.removed,{element:E});try{j(E).removeChild(E)}catch{B(E)}},Ot=function(E,me){try{zo(t.removed,{attribute:me.getAttributeNode(E),from:me})}catch{zo(t.removed,{attribute:null,from:me})}if(me.removeAttribute(E),E==="is")if(qe||J)try{St(me)}catch{}else try{me.setAttribute(E,"")}catch{}},Wt=function(E){let me=null,De=null;if(Qe)E="<remove></remove>"+E;else{let _=za(E,/^[\r\n\t ]+/);De=_&&_[0]}oe==="application/xhtml+xml"&&At===ct&&(E='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+E+"</body></html>");let h=q?q.createHTML(E):E;if(At===ct)try{me=new g().parseFromString(h,oe)}catch{}if(!me||!me.documentElement){me=I.createDocument(At,"template",null);try{me.documentElement.innerHTML=Rt?C:h}catch{}}let d=me.body||me.documentElement;return E&&De&&d.insertBefore(n.createTextNode(De),d.childNodes[0]||null),At===ct?Q.call(me,xe?"html":"body")[0]:xe?me.documentElement:d},ut=function(E){return F.call(E.ownerDocument||E,E,u.SHOW_ELEMENT|u.SHOW_COMMENT|u.SHOW_TEXT|u.SHOW_PROCESSING_INSTRUCTION|u.SHOW_CDATA_SECTION,null)},Kt=function(E){return E instanceof f&&(typeof E.nodeName!="string"||typeof E.textContent!="string"||typeof E.removeChild!="function"||!(E.attributes instanceof p)||typeof E.removeAttribute!="function"||typeof E.setAttribute!="function"||typeof E.namespaceURI!="string"||typeof E.insertBefore!="function"||typeof E.hasChildNodes!="function")},Yt=function(E){return typeof l=="function"&&E instanceof l};function zt(fe,E,me){mi(fe,De=>{De.call(t,E,me,Ke)})}let mn=function(E){let me=null;if(zt(K.beforeSanitizeElements,E,null),Kt(E))return St(E),!0;let De=Fe(E.nodeName);if(zt(K.uponSanitizeElement,E,{tagName:De,allowedTags:Z}),_e&&E.hasChildNodes()&&!Yt(E.firstElementChild)&&ln(/<[/\w!]/g,E.innerHTML)&&ln(/<[/\w!]/g,E.textContent)||E.nodeType===Yo.progressingInstruction||_e&&E.nodeType===Yo.comment&&ln(/<[/\w]/g,E.data))return St(E),!0;if(!(et.tagCheck instanceof Function&&et.tagCheck(De))&&(!Z[De]||Oe[De])){if(!Oe[De]&&en(De)&&(ge.tagNameCheck instanceof RegExp&&ln(ge.tagNameCheck,De)||ge.tagNameCheck instanceof Function&&ge.tagNameCheck(De)))return!1;if(b&&!Le[De]){let h=j(E)||E.parentNode,d=se(E)||E.childNodes;if(d&&h){let _=d.length;for(let S=_-1;S>=0;--S){let G=R(d[S],!0);G.__removalCount=(E.__removalCount||0)+1,h.insertBefore(G,X(E))}}}return St(E),!0}return E instanceof a&&!Jt(E)||(De==="noscript"||De==="noembed"||De==="noframes")&&ln(/<\/no(script|embed|frames)/i,E.innerHTML)?(St(E),!0):(Ce&&E.nodeType===Yo.text&&(me=E.textContent,mi([H,ee,ke],h=>{me=Ho(me,h," ")}),E.textContent!==me&&(zo(t.removed,{element:E.cloneNode()}),E.textContent=me)),zt(K.afterSanitizeElements,E,null),!1)},jt=function(E,me,De){if(Ae&&(me==="id"||me==="name")&&(De in n||De in Je))return!1;if(!(ue&&!Ge[me]&&ln(Re,me))){if(!(L&&ln(ne,me))){if(!(et.attributeCheck instanceof Function&&et.attributeCheck(me,E))){if(!he[me]||Ge[me]){if(!(en(E)&&(ge.tagNameCheck instanceof RegExp&&ln(ge.tagNameCheck,E)||ge.tagNameCheck instanceof Function&&ge.tagNameCheck(E))&&(ge.attributeNameCheck instanceof RegExp&&ln(ge.attributeNameCheck,me)||ge.attributeNameCheck instanceof Function&&ge.attributeNameCheck(me,E))||me==="is"&&ge.allowCustomizedBuiltInElements&&(ge.tagNameCheck instanceof RegExp&&ln(ge.tagNameCheck,De)||ge.tagNameCheck instanceof Function&&ge.tagNameCheck(De))))return!1}else if(!xt[me]){if(!ln(T,Ho(De,ve,""))){if(!((me==="src"||me==="xlink:href"||me==="href")&&E!=="script"&&Bg(De,"data:")===0&&He[E])){if(!(re&&!ln(D,Ho(De,ve,"")))){if(De)return!1}}}}}}}return!0},en=function(E){return E!=="annotation-xml"&&za(E,Ee)},Ht=function(E){zt(K.beforeSanitizeAttributes,E,null);let{attributes:me}=E;if(!me||Kt(E))return;let De={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:he,forceKeepAttr:void 0},h=me.length;for(;h--;){let d=me[h],{name:_,namespaceURI:S,value:G}=d,Y=Fe(_),ce=G,Se=_==="value"?ce:Ug(ce);if(De.attrName=Y,De.attrValue=Se,De.keepAttr=!0,De.forceKeepAttr=void 0,zt(K.uponSanitizeAttribute,E,De),Se=De.attrValue,lt&&(Y==="id"||Y==="name")&&(Ot(_,E),Se=st+Se),_e&&ln(/((--!?|])>)|<\/(style|title|textarea)/i,Se)){Ot(_,E);continue}if(Y==="attributename"&&za(Se,"href")){Ot(_,E);continue}if(De.forceKeepAttr)continue;if(!De.keepAttr){Ot(_,E);continue}if(!pe&&ln(/\/>/i,Se)){Ot(_,E);continue}Ce&&mi([H,ee,ke],rt=>{Se=Ho(Se,rt," ")});let Ye=Fe(E.nodeName);if(!jt(Ye,Y,Se)){Ot(_,E);continue}if(q&&typeof m=="object"&&typeof m.getAttributeType=="function"&&!S)switch(m.getAttributeType(Ye,Y)){case"TrustedHTML":{Se=q.createHTML(Se);break}case"TrustedScriptURL":{Se=q.createScriptURL(Se);break}}if(Se!==ce)try{S?E.setAttributeNS(S,_,Se):E.setAttribute(_,Se),Kt(E)?St(E):fd(t.removed)}catch{Ot(_,E)}}zt(K.afterSanitizeAttributes,E,null)},nn=function fe(E){let me=null,De=ut(E);for(zt(K.beforeSanitizeShadowDOM,E,null);me=De.nextNode();)zt(K.uponSanitizeShadowNode,me,null),mn(me),Ht(me),me.content instanceof s&&fe(me.content);zt(K.afterSanitizeShadowDOM,E,null)};return t.sanitize=function(fe){let E=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},me=null,De=null,h=null,d=null;if(Rt=!fe,Rt&&(fe="<!-->"),typeof fe!="string"&&!Yt(fe))if(typeof fe.toString=="function"){if(fe=fe.toString(),typeof fe!="string")throw Go("dirty is not a string, aborting")}else throw Go("toString is not a function");if(!t.isSupported)return fe;if(We||kt(E),t.removed=[],typeof fe=="string"&&(z=!1),z){if(fe.nodeName){let G=Fe(fe.nodeName);if(!Z[G]||Oe[G])throw Go("root node is forbidden and cannot be sanitized in-place")}}else if(fe instanceof l)me=Wt("<!---->"),De=me.ownerDocument.importNode(fe,!0),De.nodeType===Yo.element&&De.nodeName==="BODY"||De.nodeName==="HTML"?me=De:me.appendChild(De);else{if(!qe&&!Ce&&!xe&&fe.indexOf("<")===-1)return q&&U?q.createHTML(fe):fe;if(me=Wt(fe),!me)return qe?null:U?C:""}me&&Qe&&St(me.firstChild);let _=ut(z?fe:me);for(;h=_.nextNode();)mn(h),Ht(h),h.content instanceof s&&nn(h.content);if(z)return fe;if(qe){if(J)for(d=V.call(me.ownerDocument);me.firstChild;)d.appendChild(me.firstChild);else d=me;return(he.shadowroot||he.shadowrootmode)&&(d=P.call(r,d,!0)),d}let S=xe?me.outerHTML:me.innerHTML;return xe&&Z["!doctype"]&&me.ownerDocument&&me.ownerDocument.doctype&&me.ownerDocument.doctype.name&&ln(kd,me.ownerDocument.doctype.name)&&(S="<!DOCTYPE "+me.ownerDocument.doctype.name+`>
`+S),Ce&&mi([H,ee,ke],G=>{S=Ho(S,G," ")}),q&&U?q.createHTML(S):S},t.setConfig=function(){let fe=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};kt(fe),We=!0},t.clearConfig=function(){Ke=null,We=!1},t.isValidAttribute=function(fe,E,me){Ke||kt({});let De=Fe(fe),h=Fe(E);return jt(De,h,me)},t.addHook=function(fe,E){typeof E=="function"&&zo(K[fe],E)},t.removeHook=function(fe,E){if(E!==void 0){let me=jg(K[fe],E);return me===-1?void 0:Fg(K[fe],me,1)[0]}return fd(K[fe])},t.removeHooks=function(fe){K[fe]=[]},t.removeAllHooks=function(){K=yd()},t}var xd=$d();var Qn={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},bi=e=>(...t)=>({_$litDirective$:e,values:t}),lo=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,n,r){this._$Ct=t,this._$AM=n,this._$Ci=r}_$AS(t,n){return this.update(t,n)}update(t,n){return this.render(...n)}};var Vo=class extends lo{constructor(t){if(super(t),this.it=Pt,t.type!==Qn.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===Pt||t==null)return this._t=void 0,this.it=t;if(t===wn)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;let n=[t];return n.raw=n,this._t={_$litType$:this.constructor.resultType,strings:n,values:[]}}};Vo.directiveName="unsafeHTML",Vo.resultType=1;var Ad=bi(Vo);function tl(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var Ir=tl();function Id(e){Ir=e}var Jo={exec:()=>null};function bt(e,t=""){let n=typeof e=="string"?e:e.source,r={replace:(o,s)=>{let i=typeof s=="string"?s:s.source;return i=i.replace(dn.caret,"$1"),n=n.replace(o,i),r},getRegex:()=>new RegExp(n,t)};return r}var rh=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),dn={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i")},oh=/^(?:[ \t]*(?:\n|$))+/,sh=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,ih=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,es=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,ah=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,nl=/(?:[*+-]|\d{1,9}[.)])/,Ld=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,Pd=bt(Ld).replace(/bull/g,nl).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),lh=bt(Ld).replace(/bull/g,nl).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),rl=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,ch=/^[^\n]+/,ol=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,uh=bt(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",ol).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),dh=bt(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,nl).getRegex(),xi="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",sl=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,ph=bt("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",sl).replace("tag",xi).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),Dd=bt(rl).replace("hr",es).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",xi).getRegex(),fh=bt(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",Dd).getRegex(),il={blockquote:fh,code:sh,def:uh,fences:ih,heading:ah,hr:es,html:ph,lheading:Pd,list:dh,newline:oh,paragraph:Dd,table:Jo,text:ch},Sd=bt("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",es).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",xi).getRegex(),_h={...il,lheading:lh,table:Sd,paragraph:bt(rl).replace("hr",es).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",Sd).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",xi).getRegex()},mh={...il,html:bt(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",sl).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:Jo,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:bt(rl).replace("hr",es).replace("heading",` *#{1,6} *[^
]`).replace("lheading",Pd).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},gh=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,hh=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,Md=/^( {2,}|\\)\n(?!\s*$)/,bh=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,Ai=/[\p{P}\p{S}]/u,al=/[\s\p{P}\p{S}]/u,Nd=/[^\s\p{P}\p{S}]/u,yh=bt(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,al).getRegex(),qd=/(?!~)[\p{P}\p{S}]/u,vh=/(?!~)[\s\p{P}\p{S}]/u,wh=/(?:[^\s\p{P}\p{S}]|~)/u,kh=bt(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",rh?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),jd=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,$h=bt(jd,"u").replace(/punct/g,Ai).getRegex(),xh=bt(jd,"u").replace(/punct/g,qd).getRegex(),Fd="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",Ah=bt(Fd,"gu").replace(/notPunctSpace/g,Nd).replace(/punctSpace/g,al).replace(/punct/g,Ai).getRegex(),Sh=bt(Fd,"gu").replace(/notPunctSpace/g,wh).replace(/punctSpace/g,vh).replace(/punct/g,qd).getRegex(),Eh=bt("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,Nd).replace(/punctSpace/g,al).replace(/punct/g,Ai).getRegex(),Th=bt(/\\(punct)/,"gu").replace(/punct/g,Ai).getRegex(),Ch=bt(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),Rh=bt(sl).replace("(?:-->|$)","-->").getRegex(),Oh=bt("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",Rh).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),wi=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,Ih=bt(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",wi).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),Bd=bt(/^!?\[(label)\]\[(ref)\]/).replace("label",wi).replace("ref",ol).getRegex(),Ud=bt(/^!?\[(ref)\](?:\[\])?/).replace("ref",ol).getRegex(),Lh=bt("reflink|nolink(?!\\()","g").replace("reflink",Bd).replace("nolink",Ud).getRegex(),Ed=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,ll={_backpedal:Jo,anyPunctuation:Th,autolink:Ch,blockSkip:kh,br:Md,code:hh,del:Jo,emStrongLDelim:$h,emStrongRDelimAst:Ah,emStrongRDelimUnd:Eh,escape:gh,link:Ih,nolink:Ud,punctuation:yh,reflink:Bd,reflinkSearch:Lh,tag:Oh,text:bh,url:Jo},Ph={...ll,link:bt(/^!?\[(label)\]\((.*?)\)/).replace("label",wi).getRegex(),reflink:bt(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",wi).getRegex()},Za={...ll,emStrongRDelimAst:Sh,emStrongLDelim:xh,url:bt(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",Ed).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:bt(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",Ed).getRegex()},Dh={...Za,br:bt(Md).replace("{2,}","*").getRegex(),text:bt(Za.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},yi={normal:il,gfm:_h,pedantic:mh},Xo={normal:ll,gfm:Za,breaks:Dh,pedantic:Ph},Mh={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},Td=e=>Mh[e];function Zn(e,t){if(t){if(dn.escapeTest.test(e))return e.replace(dn.escapeReplace,Td)}else if(dn.escapeTestNoEncode.test(e))return e.replace(dn.escapeReplaceNoEncode,Td);return e}function Cd(e){try{e=encodeURI(e).replace(dn.percentDecode,"%")}catch{return null}return e}function Rd(e,t){let n=e.replace(dn.findPipe,(s,i,l)=>{let a=!1,u=i;for(;--u>=0&&l[u]==="\\";)a=!a;return a?"|":" |"}),r=n.split(dn.splitPipe),o=0;if(r[0].trim()||r.shift(),r.length>0&&!r.at(-1)?.trim()&&r.pop(),t)if(r.length>t)r.splice(t);else for(;r.length<t;)r.push("");for(;o<r.length;o++)r[o]=r[o].trim().replace(dn.slashPipe,"|");return r}function Qo(e,t,n){let r=e.length;if(r===0)return"";let o=0;for(;o<r;){let s=e.charAt(r-o-1);if(s===t&&!n)o++;else if(s!==t&&n)o++;else break}return e.slice(0,r-o)}function Nh(e,t){if(e.indexOf(t[1])===-1)return-1;let n=0;for(let r=0;r<e.length;r++)if(e[r]==="\\")r++;else if(e[r]===t[0])n++;else if(e[r]===t[1]&&(n--,n<0))return r;return n>0?-2:-1}function Od(e,t,n,r,o){let s=t.href,i=t.title||null,l=e[1].replace(o.other.outputLinkReplace,"$1");r.state.inLink=!0;let a={type:e[0].charAt(0)==="!"?"image":"link",raw:n,href:s,title:i,text:l,tokens:r.inlineTokens(l)};return r.state.inLink=!1,a}function qh(e,t,n){let r=e.match(n.other.indentCodeCompensation);if(r===null)return t;let o=r[1];return t.split(`
`).map(s=>{let i=s.match(n.other.beginningSpace);if(i===null)return s;let[l]=i;return l.length>=o.length?s.slice(o.length):s}).join(`
`)}var ki=class{constructor(e){Tt(this,"options");Tt(this,"rules");Tt(this,"lexer");this.options=e||Ir}space(e){let t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){let t=this.rules.block.code.exec(e);if(t){let n=t[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?n:Qo(n,`
`)}}}fences(e){let t=this.rules.block.fences.exec(e);if(t){let n=t[0],r=qh(n,t[3]||"",this.rules);return{type:"code",raw:n,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:r}}}heading(e){let t=this.rules.block.heading.exec(e);if(t){let n=t[2].trim();if(this.rules.other.endingHash.test(n)){let r=Qo(n,"#");(this.options.pedantic||!r||this.rules.other.endingSpaceChar.test(r))&&(n=r.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:n,tokens:this.lexer.inline(n)}}}hr(e){let t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:Qo(t[0],`
`)}}blockquote(e){let t=this.rules.block.blockquote.exec(e);if(t){let n=Qo(t[0],`
`).split(`
`),r="",o="",s=[];for(;n.length>0;){let i=!1,l=[],a;for(a=0;a<n.length;a++)if(this.rules.other.blockquoteStart.test(n[a]))l.push(n[a]),i=!0;else if(!i)l.push(n[a]);else break;n=n.slice(a);let u=l.join(`
`),p=u.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");r=r?`${r}
${u}`:u,o=o?`${o}
${p}`:p;let f=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(p,s,!0),this.lexer.state.top=f,n.length===0)break;let g=s.at(-1);if(g?.type==="code")break;if(g?.type==="blockquote"){let m=g,k=m.raw+`
`+n.join(`
`),R=this.blockquote(k);s[s.length-1]=R,r=r.substring(0,r.length-m.raw.length)+R.raw,o=o.substring(0,o.length-m.text.length)+R.text;break}else if(g?.type==="list"){let m=g,k=m.raw+`
`+n.join(`
`),R=this.list(k);s[s.length-1]=R,r=r.substring(0,r.length-g.raw.length)+R.raw,o=o.substring(0,o.length-m.raw.length)+R.raw,n=k.substring(s.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:r,tokens:s,text:o}}}list(e){let t=this.rules.block.list.exec(e);if(t){let n=t[1].trim(),r=n.length>1,o={type:"list",raw:"",ordered:r,start:r?+n.slice(0,-1):"",loose:!1,items:[]};n=r?`\\d{1,9}\\${n.slice(-1)}`:`\\${n}`,this.options.pedantic&&(n=r?n:"[*+-]");let s=this.rules.other.listItemRegex(n),i=!1;for(;e;){let a=!1,u="",p="";if(!(t=s.exec(e))||this.rules.block.hr.test(e))break;u=t[0],e=e.substring(u.length);let f=t[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,R=>" ".repeat(3*R.length)),g=e.split(`
`,1)[0],m=!f.trim(),k=0;if(this.options.pedantic?(k=2,p=f.trimStart()):m?k=t[1].length+1:(k=t[2].search(this.rules.other.nonSpaceChar),k=k>4?1:k,p=f.slice(k),k+=t[1].length),m&&this.rules.other.blankLine.test(g)&&(u+=g+`
`,e=e.substring(g.length+1),a=!0),!a){let R=this.rules.other.nextBulletRegex(k),B=this.rules.other.hrRegex(k),X=this.rules.other.fencesBeginRegex(k),se=this.rules.other.headingBeginRegex(k),j=this.rules.other.htmlBeginRegex(k);for(;e;){let q=e.split(`
`,1)[0],C;if(g=q,this.options.pedantic?(g=g.replace(this.rules.other.listReplaceNesting,"  "),C=g):C=g.replace(this.rules.other.tabCharGlobal,"    "),X.test(g)||se.test(g)||j.test(g)||R.test(g)||B.test(g))break;if(C.search(this.rules.other.nonSpaceChar)>=k||!g.trim())p+=`
`+C.slice(k);else{if(m||f.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||X.test(f)||se.test(f)||B.test(f))break;p+=`
`+g}!m&&!g.trim()&&(m=!0),u+=q+`
`,e=e.substring(q.length+1),f=C.slice(k)}}o.loose||(i?o.loose=!0:this.rules.other.doubleBlankLine.test(u)&&(i=!0)),o.items.push({type:"list_item",raw:u,task:!!this.options.gfm&&this.rules.other.listIsTask.test(p),loose:!1,text:p,tokens:[]}),o.raw+=u}let l=o.items.at(-1);if(l)l.raw=l.raw.trimEnd(),l.text=l.text.trimEnd();else return;o.raw=o.raw.trimEnd();for(let a of o.items){if(this.lexer.state.top=!1,a.tokens=this.lexer.blockTokens(a.text,[]),a.task){if(a.text=a.text.replace(this.rules.other.listReplaceTask,""),a.tokens[0]?.type==="text"||a.tokens[0]?.type==="paragraph"){a.tokens[0].raw=a.tokens[0].raw.replace(this.rules.other.listReplaceTask,""),a.tokens[0].text=a.tokens[0].text.replace(this.rules.other.listReplaceTask,"");for(let p=this.lexer.inlineQueue.length-1;p>=0;p--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[p].src)){this.lexer.inlineQueue[p].src=this.lexer.inlineQueue[p].src.replace(this.rules.other.listReplaceTask,"");break}}let u=this.rules.other.listTaskCheckbox.exec(a.raw);if(u){let p={type:"checkbox",raw:u[0]+" ",checked:u[0]!=="[ ]"};a.checked=p.checked,o.loose?a.tokens[0]&&["paragraph","text"].includes(a.tokens[0].type)&&"tokens"in a.tokens[0]&&a.tokens[0].tokens?(a.tokens[0].raw=p.raw+a.tokens[0].raw,a.tokens[0].text=p.raw+a.tokens[0].text,a.tokens[0].tokens.unshift(p)):a.tokens.unshift({type:"paragraph",raw:p.raw,text:p.raw,tokens:[p]}):a.tokens.unshift(p)}}if(!o.loose){let u=a.tokens.filter(f=>f.type==="space"),p=u.length>0&&u.some(f=>this.rules.other.anyLine.test(f.raw));o.loose=p}}if(o.loose)for(let a of o.items){a.loose=!0;for(let u of a.tokens)u.type==="text"&&(u.type="paragraph")}return o}}html(e){let t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){let t=this.rules.block.def.exec(e);if(t){let n=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),r=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",o=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:n,raw:t[0],href:r,title:o}}}table(e){let t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;let n=Rd(t[1]),r=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),o=t[3]?.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],s={type:"table",raw:t[0],header:[],align:[],rows:[]};if(n.length===r.length){for(let i of r)this.rules.other.tableAlignRight.test(i)?s.align.push("right"):this.rules.other.tableAlignCenter.test(i)?s.align.push("center"):this.rules.other.tableAlignLeft.test(i)?s.align.push("left"):s.align.push(null);for(let i=0;i<n.length;i++)s.header.push({text:n[i],tokens:this.lexer.inline(n[i]),header:!0,align:s.align[i]});for(let i of o)s.rows.push(Rd(i,s.header.length).map((l,a)=>({text:l,tokens:this.lexer.inline(l),header:!1,align:s.align[a]})));return s}}lheading(e){let t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){let t=this.rules.block.paragraph.exec(e);if(t){let n=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:n,tokens:this.lexer.inline(n)}}}text(e){let t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){let t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){let t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){let t=this.rules.inline.link.exec(e);if(t){let n=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(n)){if(!this.rules.other.endAngleBracket.test(n))return;let s=Qo(n.slice(0,-1),"\\");if((n.length-s.length)%2===0)return}else{let s=Nh(t[2],"()");if(s===-2)return;if(s>-1){let i=(t[0].indexOf("!")===0?5:4)+t[1].length+s;t[2]=t[2].substring(0,s),t[0]=t[0].substring(0,i).trim(),t[3]=""}}let r=t[2],o="";if(this.options.pedantic){let s=this.rules.other.pedanticHrefTitle.exec(r);s&&(r=s[1],o=s[3])}else o=t[3]?t[3].slice(1,-1):"";return r=r.trim(),this.rules.other.startAngleBracket.test(r)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(n)?r=r.slice(1):r=r.slice(1,-1)),Od(t,{href:r&&r.replace(this.rules.inline.anyPunctuation,"$1"),title:o&&o.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let n;if((n=this.rules.inline.reflink.exec(e))||(n=this.rules.inline.nolink.exec(e))){let r=(n[2]||n[1]).replace(this.rules.other.multipleSpaceGlobal," "),o=t[r.toLowerCase()];if(!o){let s=n[0].charAt(0);return{type:"text",raw:s,text:s}}return Od(n,o,n[0],this.lexer,this.rules)}}emStrong(e,t,n=""){let r=this.rules.inline.emStrongLDelim.exec(e);if(!(!r||r[3]&&n.match(this.rules.other.unicodeAlphaNumeric))&&(!(r[1]||r[2])||!n||this.rules.inline.punctuation.exec(n))){let o=[...r[0]].length-1,s,i,l=o,a=0,u=r[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(u.lastIndex=0,t=t.slice(-1*e.length+o);(r=u.exec(t))!=null;){if(s=r[1]||r[2]||r[3]||r[4]||r[5]||r[6],!s)continue;if(i=[...s].length,r[3]||r[4]){l+=i;continue}else if((r[5]||r[6])&&o%3&&!((o+i)%3)){a+=i;continue}if(l-=i,l>0)continue;i=Math.min(i,i+l+a);let p=[...r[0]][0].length,f=e.slice(0,o+r.index+p+i);if(Math.min(o,i)%2){let m=f.slice(1,-1);return{type:"em",raw:f,text:m,tokens:this.lexer.inlineTokens(m)}}let g=f.slice(2,-2);return{type:"strong",raw:f,text:g,tokens:this.lexer.inlineTokens(g)}}}}codespan(e){let t=this.rules.inline.code.exec(e);if(t){let n=t[2].replace(this.rules.other.newLineCharGlobal," "),r=this.rules.other.nonSpaceChar.test(n),o=this.rules.other.startingSpaceChar.test(n)&&this.rules.other.endingSpaceChar.test(n);return r&&o&&(n=n.substring(1,n.length-1)),{type:"codespan",raw:t[0],text:n}}}br(e){let t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){let t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){let t=this.rules.inline.autolink.exec(e);if(t){let n,r;return t[2]==="@"?(n=t[1],r="mailto:"+n):(n=t[1],r=n),{type:"link",raw:t[0],text:n,href:r,tokens:[{type:"text",raw:n,text:n}]}}}url(e){let t;if(t=this.rules.inline.url.exec(e)){let n,r;if(t[2]==="@")n=t[0],r="mailto:"+n;else{let o;do o=t[0],t[0]=this.rules.inline._backpedal.exec(t[0])?.[0]??"";while(o!==t[0]);n=t[0],t[1]==="www."?r="http://"+t[0]:r=t[0]}return{type:"link",raw:t[0],text:n,href:r,tokens:[{type:"text",raw:n,text:n}]}}}inlineText(e){let t=this.rules.inline.text.exec(e);if(t){let n=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:n}}}},Rn=class Ja{constructor(t){Tt(this,"tokens");Tt(this,"options");Tt(this,"state");Tt(this,"inlineQueue");Tt(this,"tokenizer");this.tokens=[],this.tokens.links=Object.create(null),this.options=t||Ir,this.options.tokenizer=this.options.tokenizer||new ki,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let n={other:dn,block:yi.normal,inline:Xo.normal};this.options.pedantic?(n.block=yi.pedantic,n.inline=Xo.pedantic):this.options.gfm&&(n.block=yi.gfm,this.options.breaks?n.inline=Xo.breaks:n.inline=Xo.gfm),this.tokenizer.rules=n}static get rules(){return{block:yi,inline:Xo}}static lex(t,n){return new Ja(n).lex(t)}static lexInline(t,n){return new Ja(n).inlineTokens(t)}lex(t){t=t.replace(dn.carriageReturn,`
`),this.blockTokens(t,this.tokens);for(let n=0;n<this.inlineQueue.length;n++){let r=this.inlineQueue[n];this.inlineTokens(r.src,r.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(t,n=[],r=!1){for(this.options.pedantic&&(t=t.replace(dn.tabCharGlobal,"    ").replace(dn.spaceLine,""));t;){let o;if(this.options.extensions?.block?.some(i=>(o=i.call({lexer:this},t,n))?(t=t.substring(o.raw.length),n.push(o),!0):!1))continue;if(o=this.tokenizer.space(t)){t=t.substring(o.raw.length);let i=n.at(-1);o.raw.length===1&&i!==void 0?i.raw+=`
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
`+o.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=i.text):n.push(o);continue}if(t){let i="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(i);break}else throw new Error(i)}}return this.state.top=!0,n}inline(t,n=[]){return this.inlineQueue.push({src:t,tokens:n}),n}inlineTokens(t,n=[]){let r=t,o=null;if(this.tokens.links){let a=Object.keys(this.tokens.links);if(a.length>0)for(;(o=this.tokenizer.rules.inline.reflinkSearch.exec(r))!=null;)a.includes(o[0].slice(o[0].lastIndexOf("[")+1,-1))&&(r=r.slice(0,o.index)+"["+"a".repeat(o[0].length-2)+"]"+r.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(o=this.tokenizer.rules.inline.anyPunctuation.exec(r))!=null;)r=r.slice(0,o.index)+"++"+r.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let s;for(;(o=this.tokenizer.rules.inline.blockSkip.exec(r))!=null;)s=o[2]?o[2].length:0,r=r.slice(0,o.index+s)+"["+"a".repeat(o[0].length-s-2)+"]"+r.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);r=this.options.hooks?.emStrongMask?.call({lexer:this},r)??r;let i=!1,l="";for(;t;){i||(l=""),i=!1;let a;if(this.options.extensions?.inline?.some(p=>(a=p.call({lexer:this},t,n))?(t=t.substring(a.raw.length),n.push(a),!0):!1))continue;if(a=this.tokenizer.escape(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.tag(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.link(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(a.raw.length);let p=n.at(-1);a.type==="text"&&p?.type==="text"?(p.raw+=a.raw,p.text+=a.text):n.push(a);continue}if(a=this.tokenizer.emStrong(t,r,l)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.codespan(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.br(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.del(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.autolink(t)){t=t.substring(a.raw.length),n.push(a);continue}if(!this.state.inLink&&(a=this.tokenizer.url(t))){t=t.substring(a.raw.length),n.push(a);continue}let u=t;if(this.options.extensions?.startInline){let p=1/0,f=t.slice(1),g;this.options.extensions.startInline.forEach(m=>{g=m.call({lexer:this},f),typeof g=="number"&&g>=0&&(p=Math.min(p,g))}),p<1/0&&p>=0&&(u=t.substring(0,p+1))}if(a=this.tokenizer.inlineText(u)){t=t.substring(a.raw.length),a.raw.slice(-1)!=="_"&&(l=a.raw.slice(-1)),i=!0;let p=n.at(-1);p?.type==="text"?(p.raw+=a.raw,p.text+=a.text):n.push(a);continue}if(t){let p="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(p);break}else throw new Error(p)}}return n}},$i=class{constructor(e){Tt(this,"options");Tt(this,"parser");this.options=e||Ir}space(e){return""}code({text:e,lang:t,escaped:n}){let r=(t||"").match(dn.notSpaceStart)?.[0],o=e.replace(dn.endingNewline,"")+`
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
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${Zn(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:n}){let r=this.parser.parseInline(n),o=Cd(e);if(o===null)return r;e=o;let s='<a href="'+e+'"';return t&&(s+=' title="'+Zn(t)+'"'),s+=">"+r+"</a>",s}image({href:e,title:t,text:n,tokens:r}){r&&(n=this.parser.parseInline(r,this.parser.textRenderer));let o=Cd(e);if(o===null)return Zn(n);e=o;let s=`<img src="${e}" alt="${n}"`;return t&&(s+=` title="${Zn(t)}"`),s+=">",s}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:Zn(e.text)}},cl=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}checkbox({raw:e}){return e}},On=class el{constructor(t){Tt(this,"options");Tt(this,"renderer");Tt(this,"textRenderer");this.options=t||Ir,this.options.renderer=this.options.renderer||new $i,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new cl}static parse(t,n){return new el(n).parse(t)}static parseInline(t,n){return new el(n).parseInline(t)}parse(t){let n="";for(let r=0;r<t.length;r++){let o=t[r];if(this.options.extensions?.renderers?.[o.type]){let i=o,l=this.options.extensions.renderers[i.type].call({parser:this},i);if(l!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(i.type)){n+=l||"";continue}}let s=o;switch(s.type){case"space":{n+=this.renderer.space(s);break}case"hr":{n+=this.renderer.hr(s);break}case"heading":{n+=this.renderer.heading(s);break}case"code":{n+=this.renderer.code(s);break}case"table":{n+=this.renderer.table(s);break}case"blockquote":{n+=this.renderer.blockquote(s);break}case"list":{n+=this.renderer.list(s);break}case"checkbox":{n+=this.renderer.checkbox(s);break}case"html":{n+=this.renderer.html(s);break}case"def":{n+=this.renderer.def(s);break}case"paragraph":{n+=this.renderer.paragraph(s);break}case"text":{n+=this.renderer.text(s);break}default:{let i='Token with "'+s.type+'" type was not found.';if(this.options.silent)return console.error(i),"";throw new Error(i)}}}return n}parseInline(t,n=this.renderer){let r="";for(let o=0;o<t.length;o++){let s=t[o];if(this.options.extensions?.renderers?.[s.type]){let l=this.options.extensions.renderers[s.type].call({parser:this},s);if(l!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(s.type)){r+=l||"";continue}}let i=s;switch(i.type){case"escape":{r+=n.text(i);break}case"html":{r+=n.html(i);break}case"link":{r+=n.link(i);break}case"image":{r+=n.image(i);break}case"checkbox":{r+=n.checkbox(i);break}case"strong":{r+=n.strong(i);break}case"em":{r+=n.em(i);break}case"codespan":{r+=n.codespan(i);break}case"br":{r+=n.br(i);break}case"del":{r+=n.del(i);break}case"text":{r+=n.text(i);break}default:{let l='Token with "'+i.type+'" type was not found.';if(this.options.silent)return console.error(l),"";throw new Error(l)}}}return r}},vi,Zo=(vi=class{constructor(e){Tt(this,"options");Tt(this,"block");this.options=e||Ir}preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}emStrongMask(e){return e}provideLexer(){return this.block?Rn.lex:Rn.lexInline}provideParser(){return this.block?On.parse:On.parseInline}},Tt(vi,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens","emStrongMask"])),Tt(vi,"passThroughHooksRespectAsync",new Set(["preprocess","postprocess","processAllTokens"])),vi),jh=class{constructor(...e){Tt(this,"defaults",tl());Tt(this,"options",this.setOptions);Tt(this,"parse",this.parseMarkdown(!0));Tt(this,"parseInline",this.parseMarkdown(!1));Tt(this,"Parser",On);Tt(this,"Renderer",$i);Tt(this,"TextRenderer",cl);Tt(this,"Lexer",Rn);Tt(this,"Tokenizer",ki);Tt(this,"Hooks",Zo);this.use(...e)}walkTokens(e,t){let n=[];for(let r of e)switch(n=n.concat(t.call(this,r)),r.type){case"table":{let o=r;for(let s of o.header)n=n.concat(this.walkTokens(s.tokens,t));for(let s of o.rows)for(let i of s)n=n.concat(this.walkTokens(i.tokens,t));break}case"list":{let o=r;n=n.concat(this.walkTokens(o.items,t));break}default:{let o=r;this.defaults.extensions?.childTokens?.[o.type]?this.defaults.extensions.childTokens[o.type].forEach(s=>{let i=o[s].flat(1/0);n=n.concat(this.walkTokens(i,t))}):o.tokens&&(n=n.concat(this.walkTokens(o.tokens,t)))}}return n}use(...e){let t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(n=>{let r={...n};if(r.async=this.defaults.async||r.async||!1,n.extensions&&(n.extensions.forEach(o=>{if(!o.name)throw new Error("extension name required");if("renderer"in o){let s=t.renderers[o.name];s?t.renderers[o.name]=function(...i){let l=o.renderer.apply(this,i);return l===!1&&(l=s.apply(this,i)),l}:t.renderers[o.name]=o.renderer}if("tokenizer"in o){if(!o.level||o.level!=="block"&&o.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let s=t[o.level];s?s.unshift(o.tokenizer):t[o.level]=[o.tokenizer],o.start&&(o.level==="block"?t.startBlock?t.startBlock.push(o.start):t.startBlock=[o.start]:o.level==="inline"&&(t.startInline?t.startInline.push(o.start):t.startInline=[o.start]))}"childTokens"in o&&o.childTokens&&(t.childTokens[o.name]=o.childTokens)}),r.extensions=t),n.renderer){let o=this.defaults.renderer||new $i(this.defaults);for(let s in n.renderer){if(!(s in o))throw new Error(`renderer '${s}' does not exist`);if(["options","parser"].includes(s))continue;let i=s,l=n.renderer[i],a=o[i];o[i]=(...u)=>{let p=l.apply(o,u);return p===!1&&(p=a.apply(o,u)),p||""}}r.renderer=o}if(n.tokenizer){let o=this.defaults.tokenizer||new ki(this.defaults);for(let s in n.tokenizer){if(!(s in o))throw new Error(`tokenizer '${s}' does not exist`);if(["options","rules","lexer"].includes(s))continue;let i=s,l=n.tokenizer[i],a=o[i];o[i]=(...u)=>{let p=l.apply(o,u);return p===!1&&(p=a.apply(o,u)),p}}r.tokenizer=o}if(n.hooks){let o=this.defaults.hooks||new Zo;for(let s in n.hooks){if(!(s in o))throw new Error(`hook '${s}' does not exist`);if(["options","block"].includes(s))continue;let i=s,l=n.hooks[i],a=o[i];Zo.passThroughHooks.has(s)?o[i]=u=>{if(this.defaults.async&&Zo.passThroughHooksRespectAsync.has(s))return(async()=>{let f=await l.call(o,u);return a.call(o,f)})();let p=l.call(o,u);return a.call(o,p)}:o[i]=(...u)=>{if(this.defaults.async)return(async()=>{let f=await l.apply(o,u);return f===!1&&(f=await a.apply(o,u)),f})();let p=l.apply(o,u);return p===!1&&(p=a.apply(o,u)),p}}r.hooks=o}if(n.walkTokens){let o=this.defaults.walkTokens,s=n.walkTokens;r.walkTokens=function(i){let l=[];return l.push(s.call(this,i)),o&&(l=l.concat(o.call(this,i))),l}}this.defaults={...this.defaults,...r}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return Rn.lex(e,t??this.defaults)}parser(e,t){return On.parse(e,t??this.defaults)}parseMarkdown(e){return(t,n)=>{let r={...n},o={...this.defaults,...r},s=this.onError(!!o.silent,!!o.async);if(this.defaults.async===!0&&r.async===!1)return s(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof t>"u"||t===null)return s(new Error("marked(): input parameter is undefined or null"));if(typeof t!="string")return s(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(t)+", string expected"));if(o.hooks&&(o.hooks.options=o,o.hooks.block=e),o.async)return(async()=>{let i=o.hooks?await o.hooks.preprocess(t):t,l=await(o.hooks?await o.hooks.provideLexer():e?Rn.lex:Rn.lexInline)(i,o),a=o.hooks?await o.hooks.processAllTokens(l):l;o.walkTokens&&await Promise.all(this.walkTokens(a,o.walkTokens));let u=await(o.hooks?await o.hooks.provideParser():e?On.parse:On.parseInline)(a,o);return o.hooks?await o.hooks.postprocess(u):u})().catch(s);try{o.hooks&&(t=o.hooks.preprocess(t));let i=(o.hooks?o.hooks.provideLexer():e?Rn.lex:Rn.lexInline)(t,o);o.hooks&&(i=o.hooks.processAllTokens(i)),o.walkTokens&&this.walkTokens(i,o.walkTokens);let l=(o.hooks?o.hooks.provideParser():e?On.parse:On.parseInline)(i,o);return o.hooks&&(l=o.hooks.postprocess(l)),l}catch(i){return s(i)}}}onError(e,t){return n=>{if(n.message+=`
Please report this to https://github.com/markedjs/marked.`,e){let r="<p>An error occurred:</p><pre>"+Zn(n.message+"",!0)+"</pre>";return t?Promise.resolve(r):r}if(t)return Promise.reject(n);throw n}}},Or=new jh;function $t(e,t){return Or.parse(e,t)}$t.options=$t.setOptions=function(e){return Or.setOptions(e),$t.defaults=Or.defaults,Id($t.defaults),$t};$t.getDefaults=tl;$t.defaults=Ir;$t.use=function(...e){return Or.use(...e),$t.defaults=Or.defaults,Id($t.defaults),$t};$t.walkTokens=function(e,t){return Or.walkTokens(e,t)};$t.parseInline=Or.parseInline;$t.Parser=On;$t.parser=On.parse;$t.Renderer=$i;$t.TextRenderer=cl;$t.Lexer=Rn;$t.lexer=Rn.lex;$t.Tokenizer=ki;$t.Hooks=Zo;$t.parse=$t;var ex=$t.options,tx=$t.setOptions,nx=$t.use,rx=$t.walkTokens,ox=$t.parseInline;var sx=On.parse,ix=Rn.lex;function cr(e){let t=$t.parse(e),n=xd.sanitize(t);return Ad(n)}function Jn(e,t){return c`<div class="prompt-block">
    <div class="prompt-block__label">${e}</div>
    <pre class="prompt-block__body">${t}</pre>
  </div>`}function co(e){return e.loading?c`<div class="prompt-block__status">불러오는 중…</div>`:e.error?c`<div class="prompt-block__status prompt-block__status--error">
      프롬프트를 불러오지 못했습니다
    </div>`:""}function Si(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),n=r=>String(r).padStart(2,"0");return`${t.getFullYear()}-${n(t.getMonth()+1)}-${n(t.getDate())} ${n(t.getHours())}:${n(t.getMinutes())}`}var zd={Read:"\u{1F4D6}",Edit:"\u270E",MultiEdit:"\u270E",Write:"\u{1F4DD}",Bash:"\u26A1",Grep:"\u{1F50E}",Glob:"\u{1F50E}",Task:"\u{1F916}",Agent:"\u{1F916}",WebFetch:"\u{1F310}",WebSearch:"\u{1F310}"},Fh={command_execution:"\uBA85\uB839 \uC2E4\uD589",file_change:"\uD30C\uC77C \uBCC0\uACBD",mcp_call:"MCP \uD638\uCD9C",web_search:"\uC6F9 \uAC80\uC0C9",plan:"\uACC4\uD68D"},Bh=/^\s*([✓✗⊘])\s*(spec|impl|implementation|plan)\s*게이트\s*[—–-]\s*(\S+)\s+(APPROVE|REVISE|REJECT|BLOCK|SKIP)(?:\s*·\s*(.+))?/,Uh=/^\s*#{0,3}\s*Phase\s+\d+(?:\s*\/\s*\d+)?\s*(?:[·:—–-]\s*.+)?$/;function In(e){return!!e&&typeof e=="object"}function ul(e){return typeof e!="string"||e.length===0?[]:e.split(/\r?\n/)}function dl(e,t){let n=ul(e),r=ul(t),o=new Map;for(let l of n)o.set(l,(o.get(l)||0)+1);let s=0;for(let l of r){let a=o.get(l)||0;a>0?o.set(l,a-1):s+=1}let i=0;for(let l of o.values())i+=l;return{added:s,removed:i}}function Hd(e){let t="";typeof e=="string"?t=e:Array.isArray(e)?t=e.map(o=>In(o)&&typeof o.text=="string"?o.text:"").join(""):In(e)&&typeof e.text=="string"&&(t=e.text);let r=(String(t).split(/\r?\n/).find(o=>o.trim().length>0)||"").trim();return r.length>120?`${r.slice(0,117)}\u2026`:r}function Wh(e){let t=String(e.name||""),n=e.input||{},r={kind:"tool",tool:t,icon:zd[t]||"\u{1F527}",input:n,expandable:!0};if((t==="Read"||t==="Write")&&(r.path=String(n.file_path||n.path||"")),t==="Write"&&(r.added=ul(n.content).length),t==="Edit"){r.path=String(n.file_path||n.path||"");let{added:o,removed:s}=dl(n.old_string,n.new_string);r.added=o,r.removed=s}if(t==="MultiEdit"){r.path=String(n.file_path||n.path||"");let o=0,s=0,i=Array.isArray(n.edits)?n.edits:[];for(let l of i){let a=dl(In(l)?l.old_string:"",In(l)?l.new_string:"");o+=a.added,s+=a.removed}r.added=o,r.removed=s}return t==="Bash"&&(r.command=String(n.command||"")),(t==="Grep"||t==="Glob")&&(r.command=String(n.pattern||n.query||"")),t==="Agent"&&(typeof e.id=="string"&&e.id.length>0&&(r.launch_id=e.id),typeof n.description=="string"&&(r.command=n.description)),r}function pl(e){return typeof e!="string"||e.trim().length===0?null:{kind:"thinking",text:e}}var zh=/<system-reminder>[\s\S]*?<\/system-reminder>/g;function Gd(e){let t;if(typeof e=="string")t=e;else if(Array.isArray(e))t=e.filter(r=>In(r)&&r.type==="text"&&typeof r.text=="string").map(r=>String(r.text)).join(`
`);else return null;let n=t.replace(zh,"").trim();return n.length>0?{kind:"user",text:n}:null}function fl(e){let t=e.split(/\r?\n/).find(r=>r.trim().length>0)||"",n=Bh.exec(t);return n?{kind:"gate",gate:n[2]==="implementation"?"impl":n[2],reviewer:n[3],verdict:n[4],time:n[5]?n[5].trim():void 0,text:t.trim()}:Uh.test(t)&&t.trim().length<=80?{kind:"phase",text:t.trim()}:{kind:"assistant",text:e}}function Hh(e,t){if(e.subtype==="init"){let n=typeof e.model=="string"?e.model:"";return t.progress=null,[{kind:"thinking",text:n?`\uC138\uC158 \uC2DC\uC791 \xB7 ${n}`:"\uC138\uC158 \uC2DC\uC791"}]}if(e.subtype==="thinking_tokens"){let r=`\uC0DD\uAC01 \uC911\u2026 ${typeof e.estimated_tokens=="number"&&Number.isFinite(e.estimated_tokens)?Math.max(0,Math.round(e.estimated_tokens)):0} \uD1A0\uD070`;return t.progress?(t.progress.text=r,[]):(t.progress={kind:"thinking",text:r},[t.progress])}return[]}function Gh(e,t){let n=typeof e.parent_tool_use_id=="string"&&e.parent_tool_use_id.length>0?e.parent_tool_use_id:null;if(e.type==="assistant"){let r=e.message,o=r&&Array.isArray(r.content)?r.content:[],s=[];for(let i of o)if(In(i)){if(i.type==="text"&&typeof i.text=="string")s.push(fl(i.text));else if(i.type==="thinking"){let l=pl(i.thinking);l&&s.push(l)}else if(i.type==="tool_use"){let l=Wh(i);typeof i.id=="string"&&t.set(i.id,l),s.push(l)}}return n?Wd(s,n):s}if(e.type==="user"){let r=e.message,o=r&&Array.isArray(r.content)?r.content:[];for(let i of o)if(In(i)&&i.type==="tool_result"){let l=t.get(String(i.tool_use_id));if(l){let a=Hd(i.content);l.result=a,l.output=typeof i.content=="string"?i.content:a,i.is_error===!0&&(l.is_error=!0)}}let s=Gd(r&&r.content);return s?[s]:[]}if(e.type==="result"){let r=e.is_error===!1&&e.subtype==="success",o={kind:"result",success:r,text:typeof e.result=="string"?e.result:r?"DONE":""};return n?Wd([o],n):[o]}return[]}function Wd(e,t){for(let n of e)n.parent_tool_use_id=t;return e}function Kh(e){let t=typeof e.command=="string"?e.command:"",n=Hd(e.aggregated_output===void 0?e.output:e.aggregated_output),o=[typeof e.exit_code=="number"&&Number.isFinite(e.exit_code)?`exit ${e.exit_code}`:typeof e.status=="string"&&e.status.length>0?e.status:"",n].filter(i=>i.length>0).join(" \xB7 "),s={kind:"tool",tool:"shell",icon:zd.Bash,command:t,input:{command:t},expandable:!0};return o.length>0&&(s.result=o),typeof e.aggregated_output=="string"&&(s.output=e.aggregated_output),s}function Yh(e){if(e.type==="item.completed"&&In(e.item)){let t=e.item;if(t.type==="agent_message"&&typeof t.text=="string")return[fl(t.text)];if(t.type==="user_message"){let n=Gd(t.text);return n?[n]:[]}if(t.type==="reasoning"){let n=pl(t.text);return n?[n]:[]}return t.type==="error"?[{kind:"error",text:String(t.message||"")}]:t.type==="command_execution"?[Kh(t)]:[]}if(e.type==="turn.completed")return[{kind:"result",success:!0,text:"DONE"}];if(e.type==="turn.failed"){let t=e.error;return[{kind:"error",text:t&&typeof t.message=="string"?t.message:"turn failed"}]}return e.type==="error"?[{kind:"error",text:String(e.message||"")}]:[]}function Vh(e){if(e.schema!=="codex-delegation-monitor-v1"||!In(e.event))return[];let t=e.event;if(t.type==="session.started"||t.type==="turn.started")return[];if((t.type==="item.started"||t.type==="item.completed")&&In(t.item)){let n=t.item;if(typeof n.id!="string"||n.id.length===0)return[];if(t.type==="item.completed"&&n.kind==="agent_message"&&typeof n.text=="string"&&n.text.trim().length>0)return[fl(n.text)];if(t.type==="item.completed"&&n.kind==="reasoning"){let l=pl(n.text);return l?[l]:[]}if(n.kind!=="activity"||typeof n.activity!="string")return[];let r=Fh[n.activity];if(!r)return[];let o="\uC2DC\uC791",s="\u2026",i={kind:"tool",tool:"",icon:s,expandable:!1};if(t.type==="item.completed"){if(n.status==="completed")o="\uC644\uB8CC",s="\u2713";else if(n.status==="failed")o="\uC2E4\uD328",s="\u2717";else return[];i.result=""}return i.tool=`${r} \xB7 ${o}`,i.icon=s,[i]}return t.type==="turn.completed"&&t.status==="completed"?[{kind:"result",success:!0,text:"DONE"}]:t.type==="turn.failed"&&(t.status==="failed"||t.status==="interrupted")&&typeof t.error_code=="string"&&t.error_code.length>0?[{kind:"error",text:t.error_code}]:[]}function Xh(e){let t=e.type;return typeof t=="string"&&(t==="error"||t.startsWith("thread.")||t.startsWith("turn.")||t.startsWith("item."))}function Qh(e){let t=e;if(typeof e=="string"){let n=e.trim();if(n.length===0)return null;try{t=JSON.parse(n)}catch{return null}}return In(t)?t:null}function Kd(e={}){let t=e.skip_delegated===!0,n=new Map,r={progress:null};return{push(o){let s=Qh(o);if(!s)return[];if(t&&typeof s.parent_tool_use_id=="string"&&s.parent_tool_use_id.length>0)return[];if(s.type==="system"&&s.schema!=="codex-delegation-monitor-v1")return Hh(s,r);let i=s.schema==="codex-delegation-monitor-v1"?Vh(s):Xh(s)?Yh(s):Gh(s,n);return i.length>0&&(r.progress=null),i}}}function _l(e){let t=[],n=Kd(),r=Array.isArray(e)?e:[];for(let o of r)for(let s of n.push(o))t.push(s);return t}var Zh=5,Jh=10,eb=/Task\s+#(\d+)/,tb=/\bgh\s+pr\s+create\b|\bgit\s+push\b/,nb=/\bnpm\s+(?:run\s+)?(?:test|tsc|lint|build)\b|\bvitest\b/;function ts(e){return typeof e!="string"?"":(e.split(/\r?\n/).find(t=>t.trim().length>0)||"").trim()}function rb(e){return typeof e!="string"||e.length===0?0:e.split(/\r?\n/).length}function ob(e){for(let t=e.length-1;t>=0;t-=1){let n=e[t];if(n.kind==="phase"||n.kind==="gate")return n.text||null}return null}function sb(e){let t=new Map,n=0;for(let o of e){if(o.kind!=="tool")continue;n+=1;let s=o.input||{};if(o.tool==="TaskCreate"){let a=eb.exec(o.output||o.result||""),u=String(s.activeForm||s.subject||"").trim();if(!a||u.length===0)continue;t.set(a[1],{label:u,active:s.status==="in_progress"?n:0});continue}if(o.tool!=="TaskUpdate")continue;let i=t.get(String(s.taskId??""));if(!i)continue;let l=s.activeForm||s.subject;typeof l=="string"&&l.trim().length>0&&(i.label=l.trim()),typeof s.status=="string"&&(i.active=s.status==="in_progress"?n:0)}let r=null;for(let o of t.values())o.active>0&&(!r||o.active>r.active)&&(r=o);return r?r.label:null}function ib(e){if(e.tool==="Bash"){let t=e.command||"";return tb.test(t)?"~ PR/\uAC8C\uC2DC \uC911":nb.test(t)?"~ \uAC80\uC99D \uC911":null}return e.tool==="Edit"||e.tool==="Write"||e.tool==="MultiEdit"?"~ \uAD6C\uD604 \uC911":e.tool==="Read"||e.tool==="Grep"||e.tool==="Glob"?"~ \uD0D0\uC0C9 \uC911":null}function ab(e){let t=e.filter(o=>o.kind==="tool").slice(-Jh),n=new Map;t.forEach((o,s)=>{let i=ib(o);if(!i)return;let l=n.get(i)||{count:0,last:-1};l.count+=1,l.last=s,n.set(i,l)});let r=null;for(let[o,s]of n)(!r||s.count>r.count||s.count===r.count&&s.last>r.last)&&(r={label:o,count:s.count,last:s.last});return r?r.label:null}function lb(e){let t=ob(e);if(t)return{text:t,guess:!1};let n=sb(e);if(n)return{text:n,guess:!1};let r=ab(e);return r?{text:r,guess:!0}:null}function cb(e,t){if(typeof e!="number")return"";let n=Math.max(0,Math.floor((t-e)/1e3));return n<60?`${n}\uCD08 \uC804`:sn(e,t)}function uo(e,t={}){let{transport:n,sessionLogStore:r,onClose:o}=t,s=null,i=null,l=null,a=null,u=null,p=!1,f={},g=!0,m=new Set,k=new Set,R=null,B=null,X=!1,se=!1,j=!1,q=null,C=null;function I(){X=!1,se=!1,j=!1,q=null,C=null}async function F(J){if(n){se=!0,j=!1,Oe();try{let U=await Promise.resolve(n("get-attempt-prompt",{attempt_id:J,...u?{root_dir:u}:{}}));if(s!==J)return;!U||typeof U!="object"||Array.isArray(U)?j=!0:(q=U,C=J)}catch{s===J&&(j=!0)}finally{s===J&&(se=!1,Oe())}}}function V(){if(X=!X,X&&s&&C!==s){F(s);return}Oe()}function Q(){if(!X)return"";let J=co({loading:se,error:j});if(J)return c`<div class="sv__prompt" data-seam="attempt-prompt">
        ${J}
      </div>`;if(!q)return"";if(q.missing)return c`<div class="sv__prompt" data-seam="attempt-prompt">
        <div class="prompt-block__status">
          기록 없음 — 프롬프트 기록 이전에 실행된 attempt입니다
        </div>
      </div>`;let U=Si(q.recorded_at);return c`<div class="sv__prompt" data-seam="attempt-prompt">
      ${U?c`<div class="prompt-block__meta">${U} 발송</div>`:""}
      ${typeof q.task_prompt=="string"?Jn("\uACFC\uC5C5 (user)",q.task_prompt):""}
      ${typeof q.system_prompt=="string"?Jn("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",q.system_prompt):""}
    </div>`}function P(){if(!a||!r)return[];let J=r.get(a);return _l(J?J.lines:[])}function K(){if(!a||!r)return null;let J=r.get(a),U=J?J.last_event_at:null;return typeof U=="number"?U:null}function H(){return f.status==="running"}function ee(){if(H()&&s){B||(B=setInterval(()=>Oe(),1e3));return}ke()}function ke(){B&&(clearInterval(B),B=null)}function Re(J){let U=[],Ae=0;for(;Ae<J.length;){let{idx:lt,line:st}=J[Ae];if(st.kind==="tool"){let b=Ae;for(;b<J.length&&J[b].line.kind==="tool"&&J[b].line.tool===st.tool;)b+=1;if(b-Ae>=Zh&&!k.has(lt)){U.push({kind:"group",idx:lt,tool:st.tool||"",lines:J.slice(Ae,b)}),Ae=b;continue}}U.push({kind:"line",idx:lt,line:st}),Ae+=1}return U}function ne(J){let U=[],Ae=new Map;for(let b=0;b<J.length;b+=1){let z=J[b],Ie=z.parent_tool_use_id;if(typeof Ie=="string"&&Ie.length>0){let Le=Ae.get(Ie);Le||(Le={kind:"subagent",idx:b,launch_id:Ie,agent_type:null,header:null,lines:[]},Ae.set(Ie,Le),U.push(Le)),Le.lines.push({idx:b,line:z});continue}if(z.kind==="tool"&&z.tool==="Agent"&&typeof z.launch_id=="string"&&z.launch_id.length>0){let Le=D(z),Be=Ae.get(z.launch_id);if(Be){Be.header={idx:b,line:z},Be.agent_type=Le;continue}let He={kind:"subagent",idx:b,launch_id:z.launch_id,agent_type:Le,header:{idx:b,line:z},lines:[]};Ae.set(z.launch_id,He),U.push(He);continue}U.push({kind:"entry",idx:b,line:z})}let lt=[],st=0;for(;st<U.length;){if(U[st].kind!=="entry"){lt.push(U[st]),st+=1;continue}let b=st;for(;b<U.length&&U[b].kind==="entry";)b+=1;lt.push(...Re(U.slice(st,b))),st=b}return lt}function D(J){let U=J.input;return U&&typeof U.subagent_type=="string"?U.subagent_type:null}function ve(J){for(let U=J.length-1;U>=0;U-=1){let Ae=J[U];if(Ae.kind==="result"||Ae.kind==="error")return null;if(Ae.kind==="tool"&&!Object.hasOwn(Ae,"result"))return Ae}return null}function Ee(J){for(let U=J.length-1;U>=0;U-=1)if(J[U].kind==="thinking")return J[U];return null}function T(J,U){if(U.kind==="gate")return c`<div class="sv__gate">${U.text}</div>`;if(U.kind==="phase")return c`<div class="sv__phase">${U.text}</div>`;if(U.kind==="result")return c`<div
        class="sv__result${U.success?" sv__result--ok":" sv__result--fail"}"
      >
        <span class="sv__result-glyph">${U.success?"\u2713":"\u2717"}</span>
        <span class="sv__result-body"
          >${cr(U.text||(U.success?"DONE":"\uC2E4\uD328"))}</span
        >
      </div>`;if(U.kind==="thinking"){let Ae=m.has(J);return c`<div
        class="sv__think${Ae?" sv__think--expanded":""}"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>et(J)}
      >
        <span class="sv__think-line">💭 ${ts(U.text)}</span>
        ${Ae?c`<pre class="sv__think-expand">${U.text}</pre>`:""}
      </div>`}if(U.kind==="user"){let Ae=m.has(J);return c`<div
        class="sv__line sv__line--user${Ae?" sv__line--expanded":""}"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>et(J)}
      >
        <span class="sv__user-line">▷ ${ts(U.text)}</span>
        ${Ae?c`<pre class="sv__user-expand">${U.text}</pre>`:""}
      </div>`}if(U.kind==="error")return c`<div class="sv__error">⛔ ${U.text}</div>`;if(U.kind==="blocker")return c`<div class="sv__error">⛔ ${U.text}</div>`;if(U.kind==="tool"){let Ae=m.has(J),lt=U.tool==="Bash"?rb(U.command):0,st=U.tool==="Bash"?lt>1?ts(U.command):U.command:U.path||U.command||"";return c`<div
        class="sv__tool${Ae?" sv__tool--expanded":""}"
        role="button"
        tabindex="0"
        @click=${()=>et(J)}
      >
        <span class="sv__tool-line">
          <span class="sv__tool-icon">${U.icon}</span>
          <span class="sv__tool-name">${U.tool}</span>
          ${st?c`<span class="sv__tool-detail">${st}</span>`:""}
          ${lt>1?c`<span class="sv__tool-more">⋯ ${lt}줄</span>`:""}
          ${typeof U.added=="number"?c`<span class="sv__diff-add">+${U.added}</span>`:""}
          ${typeof U.removed=="number"?c`<span class="sv__diff-del">−${U.removed}</span>`:""}
          ${U.result?c`<span class="sv__tool-ok">→ ${U.result}</span>`:""}
        </span>
        ${Ae?c`<pre class="sv__tool-expand">${Z(U)}</pre>`:""}
      </div>`}return c`<div class="sv__as">${cr(U.text||"")}</div>`}function Z(J){let U=[];if(J.tool==="Bash"&&typeof J.command=="string"&&J.command.length>0)U.push(J.command);else if(J.input!==void 0)try{U.push(`input: ${JSON.stringify(J.input,null,2)}`)}catch{}return typeof J.output=="string"&&J.output.length>0&&U.push(`output:
${J.output}`),U.join(`

`)}function we(){if(!s)return c``;let J=P(),U=(i?[f.agent_type,f.model,f.effort]:[f.runner,f.model,f.effort]).filter(Boolean).join(" \xB7 "),Ae=f.session_id||"",lt=`\uB77C\uC774\uBE0C \uB530\uB77C\uAC00\uAE30 ${g?"ON":"OFF"}`,st=H(),b=st?cb(K(),Date.now()):"",z=st?ve(J):null,Ie=st?Ee(J):null,Le=lb(J);return c`<div class="sv" data-attempt-id=${s}>
      <div class="sv__bar">
        <span class="sv__id"
          >${f.label||(i?f.role||"":s)}</span
        >
        ${Le?c`<span
              class="sv__stage${Le.guess?" sv__stage--guess":""}"
              title=${Le.text}
              >${Le.text}</span
            >`:""}
        ${st?c`<span
              class="sv__live"
              title="세션이 진행 중입니다"
              aria-label=${b?`\uC9C4\uD589 \uC911 \xB7 \uB9C8\uC9C0\uB9C9 \uC774\uBCA4\uD2B8 ${b}`:"\uC9C4\uD589 \uC911"}
              ><span class="sv__live-dot" aria-hidden="true"></span>${b?c`<span class="sv__live-ago">${b}</span>`:""}</span
            >`:""}
        ${Ae?c`<button
              type="button"
              class="sv__session"
              title=${Ae}
              aria-label=${`\uC138\uC158 ID \uBCF5\uC0AC: ${Ae}`}
              @click=${()=>ue(Ae)}
            >
              ⧉ ${Ae.slice(0,8)}
            </button>`:""}
        ${f.resume_command?c`<button
              type="button"
              class="sv__resume-cmd"
              title=${f.resume_command}
              aria-label=${`\uC7AC\uAC1C \uBA85\uB839 \uBCF5\uC0AC: ${f.resume_command}`}
              @click=${()=>ue(f.resume_command||"")}
            >
              ⧉ 재개 명령
            </button>`:""}
        ${U?c`<span class="sv__meta">${U}</span>`:""}
        ${f.worktree?c`<span class="sv__wt" title=${f.worktree}
              >${f.worktree}</span
            >`:""}
        ${i||p?"":c`<button
              type="button"
              class="sv__prompt-toggle${X?" sv__prompt-toggle--on":""}"
              data-seam="attempt-prompt-toggle"
              aria-pressed=${X?"true":"false"}
              aria-label="발송 프롬프트 보기"
              title="이 세션에 실제로 보낸 시스템·과업 프롬프트"
              @click=${V}
            >
              ✉ 프롬프트
            </button>`}
        <button
          type="button"
          class="sv__follow${g?" sv__follow--on":""}"
          aria-pressed=${g?"true":"false"}
          aria-label=${lt}
          @click=${L}
        >
          <span class="sv__follow-full">⇣ ${lt}</span>
          <span class="sv__follow-short">⇣ ${g?"ON":"OFF"}</span>
        </button>
        <button
          type="button"
          class="sv__close"
          aria-label="닫기"
          @click=${()=>qe()}
        >
          ✕
        </button>
      </div>
      ${i||p?"":Q()}
      <div class="sv__body">
        ${J.length===0?c`<div class="sv__empty">세션 로그 없음</div>`:ne(J).map(Be=>Be.kind==="subagent"?Te(Be):Be.kind==="group"?he(Be):T(Be.idx,Be.line))}
      </div>
      ${z||Ie?c`<div class="sv__now">
            <span class="sv__now-label">지금</span>
            ${z?c`<span class="sv__now-icon">${z.icon}</span>
                  <span class="sv__now-name">${z.tool}</span>
                  <span class="sv__now-detail"
                    >${z.tool==="Bash"?ts(z.command):z.path||z.command||""}</span
                  >`:""}
            ${Ie?c`<span class="sv__now-think"
                  >💭 ${ts(Ie.text)}</span
                >`:""}
          </div>`:""}
    </div>`}function he(J){return c`<div
      class="sv__group"
      role="button"
      tabindex="0"
      title="펼치기"
      @click=${()=>ge(J.idx)}
    >
      <span class="sv__group-icon">${J.lines[0].line.icon}</span>
      <span class="sv__group-name">${J.tool}</span>
      <span class="sv__group-count">${J.lines.length}</span>
      <span class="sv__group-caret" aria-hidden="true">▸</span>
    </div>`}function Te(J){let U=k.has(J.idx),Ae=J.header?J.header.line:null,lt=Ae?Ae.is_error===!0?"\u2717":typeof Ae.result=="string"?"\u2713":"\u27F3":"",st=Ae&&Ae.command?Ae.command:"";return c`<div class="sv__sub${U?" sv__sub--open":""}">
      <div
        class="sv__sub-head"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>ge(J.idx)}
      >
        <span class="sv__sub-icon" aria-hidden="true">🤖</span>
        <span class="sv__sub-name">${J.agent_type||"subagent"}</span>
        ${st?c`<span class="sv__sub-detail">${st}</span>`:""}
        <span class="sv__sub-count">${J.lines.length}줄</span>
        ${lt?c`<span class="sv__sub-state">${lt}</span>`:""}
        ${U?"":c`<span class="sv__sub-caret" aria-hidden="true">▸</span>`}
      </div>
      ${U?c`<div class="sv__sub-body">
            ${Re(J.lines).map(b=>b.kind==="group"?he(b):T(b.idx,b.line))}
          </div>`:""}
    </div>`}function ge(J){k.add(J),Oe()}function Oe(){ot(we(),e),ee(),g&&Ge()}function Ge(){let J=e.querySelector(".sv__body");J&&(J.scrollTop=J.scrollHeight)}function et(J){m.has(J)?m.delete(J):m.add(J),Oe()}function L(){g=!g,Oe()}function ue(J){an(J).then(U=>{U?ye("\uBCF5\uC0AC\uB428","success",1200):ye("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function re(J){!s||!J||(f={...f,...J},Oe())}function pe(J){let U=J.target;if(!U||!U.classList||!U.classList.contains("sv__body"))return;!(U.scrollHeight-U.scrollTop-U.clientHeight<=4)&&g&&(g=!1,Oe())}e.addEventListener("scroll",pe,!0);function Ce(J){let U=J.target;!U||typeof U.closest!="function"||e.contains(U)||U.closest("dialog")||U.closest(".md-viewer-root")||qe()}let _e=!1;function xe(){_e||(document.addEventListener("mousedown",Ce),_e=!0)}function We(){_e&&(document.removeEventListener("mousedown",Ce),_e=!1)}function Qe(J){let U=J&&J.attempt_id;if(!U)return;let Ae=typeof J.launch_id=="string"&&J.launch_id.length>0?J.launch_id:null,lt=J.session_ref&&typeof J.session_ref=="object"?J.session_ref:null;if(Ae&&lt)return;let st=a;s=U,i=Ae,l=lt,a=i?`session-log:${s}:${i}`:`session-log:${s}`,n&&st&&st!==a&&Promise.resolve(n("unsubscribe-session-log",{id:st})).catch(()=>{}),u=typeof J.root_dir=="string"&&J.root_dir.length>0?J.root_dir:null,f=J.meta||{},p=J.hide_prompt===!0,g=!0,m.clear(),k.clear(),I(),!R&&r&&(R=r.subscribe(Oe)),n&&Promise.resolve(n("subscribe-session-log",{id:a,attempt_id:s,...i?{launch_id:i}:{},...l?{session_ref:l}:{},...u?{root_dir:u}:{}})).catch(()=>{}),xe(),Oe()}function qe(){let J=a;We(),s=null,i=null,l=null,a=null,u=null,p=!1,m.clear(),k.clear(),I(),ke(),n&&J&&Promise.resolve(n("unsubscribe-session-log",{id:J})).catch(()=>{}),ot(c``,e),o&&o()}return{open:Qe,updateMeta:re,close:qe,isOpen(){return s!==null},destroy(){ke(),We(),R&&(R(),R=null),e.removeEventListener("scroll",pe,!0),s=null,i=null,l=null,a=null,u=null,p=!1,ot(c``,e)}}}function ub(e){return["plan_review","plan_approval","plan_check"].some(t=>{let n=e[t];return typeof n=="string"&&n.trim().length>0})}function db(e){let t=e&&e.metadata||{},n=Br(e),r=[];return n.path&&r.push({kind:"spec",path:n.path,missing_state:n.evidence==="draft"?"spec_draft":null}),typeof t.plan_path=="string"&&t.plan_path.trim().length>0&&r.push({kind:"plan",path:t.plan_path.trim(),missing_state:ub(t)?null:"plan_pending"}),r}function Yd(e,t){let n=db(e);return c`
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
  `}var pb="## \u{1F916} \uC791\uC5C5 \uBCF4\uACE0\uC11C",fb=/^> (worker · attempt|session · sid) ([A-Za-z0-9._-]{1,64}) · (\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z)$/,_b=/^\*\*결론\*\* — (.+)$/;function Ei(e){if(typeof e!="string"||e.length===0)return null;let t=e.split(/\r?\n/);if(t[0]!==pb)return null;let n=fb.exec(t[1]||"");if(!n)return null;let r=n[1].split(" ")[0],o=n[2],s=n[3],i=2;for(;i<t.length&&t[i].trim().length===0;)i+=1;let l=i<t.length?_b.exec(t[i]):null,a=l?l[1].replace(/\s+/g," ").trim():"",u=l?i+1:i;return{lane:r,identifier:o,timestamp:s,conclusion:a,body:t.slice(u).join(`
`).trim()}}var Vd=20;function Xd(e){if(e==null||e==="")return"";let t=new Date(e);if(Number.isNaN(t.getTime()))return"";let n=String(t.getMonth()+1).padStart(2,"0"),r=String(t.getDate()).padStart(2,"0"),o=String(t.getHours()).padStart(2,"0"),s=String(t.getMinutes()).padStart(2,"0");return`${n}-${r} ${o}:${s}`}function mb(e){return e.length>Vd?`${e.slice(0,Vd)}\u2026`:e}function gb(e,t,n,r){let o=`${t.lane} ${mb(t.identifier)}`;return c`<div class="detail-report">
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
        <span class="detail-report__time">${Xd(t.timestamp)}</span>
      </span>
      <span class="detail-report__concl">${t.conclusion}</span>
    </button>
    ${r&&t.body.length>0?c`<div class="detail-report__body">
          ${cr(t.body)}
        </div>`:""}
  </div>`}function hb(e){return c`<div class="detail-comment" data-comment-id=${e.id}>
    <div class="detail-comment__meta">
      <span class="detail-comment__author"
        >${e.author||"(\uC791\uC131\uC790 \uC5C6\uC74C)"}</span
      >
      <span class="detail-comment__time"
        >${Xd(e.created_at)}</span
      >
    </div>
    <div class="detail-comment__body">
      ${cr(typeof e.text=="string"?e.text:"")}
    </div>
  </div>`}function Qd(e,t={},n={}){let r=Array.isArray(e)?e.filter(Boolean):[],o=n.expanded||new Set,s=typeof n.draft=="string"?n.draft:"",i=n.sending===!0,l=r.slice().sort((a,u)=>String(u.created_at||"").localeCompare(String(a.created_at||"")));return c`
    <div class="detail-section-label">댓글 (${r.length})</div>
    ${n.error?c`<div class="detail-empty" data-seam="comments-error">
          댓글을 불러오지 못했습니다
        </div>`:l.length===0?c`<div class="detail-empty" data-seam="comments">댓글 없음</div>`:c`<div class="detail-comments" data-seam="comments">
            ${l.map(a=>{let u=Ei(typeof a.text=="string"?a.text:"");return u?gb(a,u,t,o.has(a.id)):hb(a)})}
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
  `}var{I:Fx}=zl;var Zd=e=>e.strings===void 0;var bb={},Jd=(e,t=bb)=>e._$AH=t;var ur=bi(class extends lo{constructor(e){if(super(e),e.type!==Qn.PROPERTY&&e.type!==Qn.ATTRIBUTE&&e.type!==Qn.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!Zd(e))throw Error("`live` bindings can only contain a single expression")}render(e){return e}update(e,[t]){if(t===wn||t===Pt)return t;let n=e.element,r=e.name;if(e.type===Qn.PROPERTY){if(t===n[r])return wn}else if(e.type===Qn.BOOLEAN_ATTRIBUTE){if(!!t===n.hasAttribute(r))return wn}else if(e.type===Qn.ATTRIBUTE&&n.getAttribute(r)===t+"")return wn;return Jd(e),t}});var yb=[{id:"spec",label:"spec \uB9AC\uBDF0",receipt:"spec_review",receipt_stage:null,fill_stage:"spec",stale_stage:"spec",hue:"spec"},{id:"plan",label:"\uACC4\uD68D \uB9AC\uBDF0",receipt:null,receipt_stage:"plan",fill_stage:"plan",stale_stage:"plan",hue:"plan"},{id:"impl",label:"\uAD6C\uD604",receipt:null,receipt_stage:null,fill_stage:"impl",stale_stage:null,hue:"impl"},{id:"impl_review",label:"impl \uB9AC\uBDF0",receipt:"impl_review",receipt_stage:null,fill_stage:null,stale_stage:"impl",hue:"impl"},{id:"pr",label:"PR",receipt:null,receipt_stage:null,fill_stage:"pr",stale_stage:null,hue:"pr"}],ml={quick_fix:["impl","impl_review"],spec_backed:["spec","impl","impl_review","pr"],full_plan:["spec","plan","impl","impl_review","pr"]},ep={missing:"\uC2B9\uC778 \uD544\uC694",stale:"\uC7AC\uC2B9\uC778 \uD544\uC694",unknown:"\uC2B9\uC778 \uD655\uC778 \uBD88\uAC00"},vb={pin:"pin",global:"global",base:"base"};function wb(e){return c`<span
    class=${`detail-layer-rail detail-layer-rail--${vb[e]}`}
    data-source=${e}
    aria-hidden="true"
    ><i></i><i></i><i></i
  ></span>`}function kb(e,t,n){switch(e){case"workflow_mode":return So;case"spec_review_model":case"impl_review_model":return Eo;case"plan_review_model":return qs;case"spec_review_effort":case"plan_review_effort":case"impl_review_effort":return js;case"spec_review_speed":case"plan_review_speed":case"impl_review_speed":return eo;case"impl_dispatch":return eu;case"impl_runtime":return Ns;case"impl_model":return to(n,t.impl_runtime);case"impl_effort":return no(n,t.impl_runtime,t.impl_model);case"impl_speed":case"orchestration_speed":return eo;case"orchestration_model":return To(n,null);case"orchestration_effort":return no(n,void 0,t.orchestration_model||bn).filter(r=>r!==bn);default:return[]}}function $b(e,t){return c`<div class="detail-effective__row" data-key=${e.key}>
    ${wb(e.source)}
    <span class="detail-effective__k"
      >${sr[e.key]||e.key}</span
    >
    <span
      class=${`detail-effective__v${e.source==="base"?" detail-effective__v--dim":""}`}
      title=${e.full_value||""}
      >${e.display}</span
    >
    <span
      class=${`detail-effective__badge detail-effective__badge--${e.source}`}
      >${Fs[e.source]}</span
    >
    ${t.expanded?c`<select
          class="detail-effective__edit"
          data-edit-key=${e.key}
          aria-label=${`${sr[e.key]||e.key} \uD3B8\uC9D1`}
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
  </div>`}function tp(e,t){let n=ha.flatMap(a=>a.keys),r=ba(n,e.metadata,e.workspace_values,e.execution_defaults,e.catalog,e.controller_runtime||null),o=lu(n,e.metadata,e.workspace_values,e.execution_defaults,e.catalog,e.controller_runtime||null),s=Object.fromEntries(r.map(a=>[a.key,a])),i=Object.fromEntries(r.filter(a=>a.value!==null).map(a=>[a.key,a.value])),l=r.filter(a=>a.full_value&&a.display!==a.full_value).map(a=>a.full_value).join(" \xB7 ");return c`<details
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
        >${xb(s)}</span
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
          ${ha.map(a=>c`
              <div class="detail-effective__subhead">${a.label}</div>
              ${r.filter(u=>a.keys.includes(u.key)).map(u=>{let p=Ls({key:u.key,choices:kb(u.key,i,e.catalog),layer:"pin",pin:e.metadata,global:e.workspace_values,execution_defaults:e.execution_defaults,runner_catalog:e.catalog,route:typeof e.metadata?.route=="string"?e.metadata.route:null,controller_runtime:e.controller_runtime||null});return $b(u,{expanded:e.expanded,options:p.options,default_label:p.unset_label,default_full_value:p.full_value,onEdit:t.onEdit})})}
            `)}
          <div class="detail-effective__foot">
            <select
              data-impl-preset-select
              aria-label="실행 프리셋"
              .value=${ur(e.preset_id)}
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
  </details>`}function xb(e){let t=[];if(e.workflow_mode&&t.push(e.workflow_mode.display),e.impl_dispatch?.value==="main")t.push("\uBA54\uC778");else if(e.impl_dispatch?.value==="delegated"){let n=e.impl_runtime?` ${e.impl_runtime.display}`:"";t.push(`\uC704\uC784${n}`)}for(let n of["impl_model","impl_effort","impl_speed"])e[n]?.resolution!=="not_applicable"&&t.push(e[n]?.display||"\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00");return t.join(" \xB7 ")}function Ab(e){if(!e||typeof e!="object")return null;let{kind:t,actor:n,effort:r,sha:o}=e;return typeof t!="string"||typeof n!="string"||typeof o!="string"?null:{kind:t,actor:n,effort:typeof r=="string"?r:null,sha:o}}function np(e,t={}){let n=e&&typeof e.metadata=="object"&&e.metadata?e.metadata:{},r=e&&typeof e.workflow=="object"&&e.workflow?e.workflow:{},o=r.stages||{},s=r.route||n.route||null,i=typeof n.pr_url=="string"?n.pr_url:"",l=typeof n.exec_receipt=="string"?n.exec_receipt:"",a=Ab(r.exec_receipt),u=a?Wn(a):l,p=a?`${a.kind}:${a.actor}`:l.split("@")[0],f=Os(r.planned_execution,r.exec_receipt),g=r.chips?.pr?.number,m=typeof g=="number"?`PR #${g}`:"PR",k=Ro(n),R=k!==null&&t.isChipOpen?.("rec")===!0,B=R?Ca({rec:k},"rec"):null;return c`<section class="detail-summary" data-seam="detail-summary">
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
            >${p}${a?.effort?c`${" "}<span
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
            title=${Ws(k)}
            @click=${()=>t.onChipToggle?.("rec")}
          >
            ${"\uBCF5\uC7A1"}
          </button>`:""}
    </div>
    ${B?Zr(B):""}
    <div
      class="detail-summary__gates"
      role="group"
      aria-label="워크플로 게이트"
    >
      ${Sb(s).map(X=>Eb(X,n,o,{label:X.id==="pr"?m:X.label,href:X.id==="pr"?i:""}))}
    </div>
  </section>`}function Sb(e){let n=typeof e=="string"&&Object.hasOwn(ml,e)&&ml[e]||ml.spec_backed;return yb.filter(r=>n.includes(r.id))}var Ti={on:"\uD1B5\uACFC",stale:"\uC7AC\uAC80\uD1A0 \uD544\uC694",current:"\uC9C4\uD589 \uC911",none:"\uBBF8\uB3C4\uB2EC"};function Eb(e,t,n,r){let o=Tb(e,t,n),s=e.fill_stage?n[e.fill_stage]:null,i=typeof s?.fill=="string"?s.fill:null,l=i?i==="full":o.length>0,a=!l&&i==="dim",u=e.stale_stage?n[e.stale_stage]?.stale===!0:!1,p=o&&o.split("@")[1]?.slice(0,7)||"",f=u?Ti.stale:l?Ti.on:a?Ti.current:Ti.none,g=Cb(e,n),m=`${r.label} \xB7 ${f}${g?` \xB7 ${g}`:""}${o?` \xB7 ${o}`:""}`,k=`detail-summary__gate${l?" detail-summary__gate--on":""}${a?" detail-summary__gate--current":""}${u?" detail-summary__gate--stale":""}${p?" detail-summary__gate--receipt":""}`,R=c`<span class="detail-summary__gate-label"
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
      title=${m}
      >${R}</a
    >`:c`<span
    class=${k}
    data-gate=${e.id}
    data-hue=${e.hue}
    title=${m}
    >${R}</span
  >`}function Tb(e,t,n){if(e.receipt&&typeof t[e.receipt]=="string")return String(t[e.receipt]);if(e.receipt_stage){let r=n[e.receipt_stage]?.receipt;return typeof r=="string"?r:""}return""}function Cb(e,t){if(e.id!=="plan")return"";let n=t.plan?.approval_state;return typeof n=="string"&&Object.hasOwn(ep,n)?ep[n]:""}function Ci(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function rp(e){return Ci(e)&&typeof e.key=="string"&&e.key.length>0&&typeof e.email=="string"&&e.email.length>0}function op(e,t){let n=e&&e[t];if(!Ci(n)||!Array.isArray(n.accounts))return null;let r=n.accounts.filter(rp),o=rp(n.active)?n.active:null;return{accounts:r,active:o||r.find(s=>s.active===!0)||null}}function ap(e){return typeof e.alias=="string"&&e.alias.length>0?` (${e.alias})`:""}function Ri(e){let t=typeof e.status=="string"&&e.status!=="ok"?` \xB7 ${e.status}`:"";return`${e.email}${ap(e)}${t}`}function po(e){let t=typeof e.plan=="string"&&e.plan.length>0?e.plan:"plan \uD655\uC778 \uBD88\uAC00";return`${e.email} \xB7 ${t}${ap(e)}`}function Rb(e,t,n){if(n!==null){let o=e==="claude"?Ri:po,s=t?t.accounts.find(i=>i.key===n):void 0;return`\uB808\uD3EC \uAE30\uBCF8\uAC12 \uC0AC\uC6A9(${s?o(s):n})`}return t?t.active?`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(${e==="claude"?t.active.email:po({...t.active,alias:null})})`:"\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(\uD655\uC778 \uBD88\uAC00)":"(\uAE30\uBCF8)"}function sp(e,t){if(!Ci(e)||e.state!=="usable"||!Ci(e.values))return null;let n=e.values[t];return typeof n=="string"&&n.length>0?n:null}function ip(e){let t=e.provider_key==="claude"?Ri:po,n=!!e.provider?.accounts.some(r=>r.key===e.selected);return c`<div class="detail-kv" data-exec-account-row=${e.key}>
    <span class="detail-kv__k">${e.title}</span>
    <span class="detail-kv__vgroup">
      <select
        class=${e.selected?"detail-kv__v detail-kv__v--sel":"detail-kv__v"}
        aria-label=${e.title}
        data-exec-key=${e.key}
        @change=${r=>e.handlers.onExecChange(e.key,r.target.value)}
      >
        <option value="" ?selected=${e.selected.length===0}>
          ${Rb(e.provider_key,e.provider,e.workspace_default)}
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
  </div>`}function lp({md:e,catalog:t,workspace_defaults:n=null,handlers:r}){let o=typeof e.claude_account=="string"?e.claude_account:"",s=typeof e.codex_account=="string"?e.codex_account:"";return c`<section class="exec-accounts" data-exec-accounts>
    <div class="detail-section-label">실행 계정</div>
    <div class="exec-settings-core">
      ${ip({key:"claude_account",title:"Claude \uACC4\uC815",provider_key:"claude",provider:op(t,"claude"),selected:o,workspace_default:sp(n,"claude_account"),handlers:r,hint:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uB7F0\uD0C0\uC784\uC774 claude\uC77C \uB54C \uC801\uC6A9\uB429\uB2C8\uB2E4"})}
      ${ip({key:"codex_account",title:"Codex \uACC4\uC815",provider_key:"codex",provider:op(t,"codex"),selected:s,workspace_default:sp(n,"codex_account"),handlers:r})}
    </div>
  </section>`}function Ob(e){return String(e||"").replace(/^docs\/(superpowers\/)?/,"")}function Ib(e){let t=/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(e);if(!t)return{front:null,body:e};let n=t[1].trim();return{front:n.length>0?n:null,body:e.slice(t[0].length)}}function Oi(e,t){let n=t.getWorkspacePath,r=t.fetchImpl||globalThis.fetch?.bind(globalThis),o=null,s="loading",i="",l=null,a="";function u(R){R.key==="Escape"&&o&&(R.preventDefault(),m())}document.addEventListener("keydown",u);function p(){return o?c`
      <div class="mv-overlay" role="dialog" aria-modal="true">
        <div class="mv-overlay__backdrop" @click=${()=>m()}></div>
        <div class="mv">
          <div class="mv__bar">
            <span class="mv__path" title=${o}
              >${Ob(o)}</span
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
                        >`}${cr(i)}`}
          </div>
        </div>
      </div>
    `:c``}function f(){ot(p(),e)}async function g(R,B={}){o=R,s="loading",i="",l=null,a="",f();let X=B.workspace||(n?n():"");if(!X){s="error",a="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4",f();return}if(!r){s="error",a="fetch\uB97C \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",f();return}let se="/api/doc?workspace="+encodeURIComponent(X)+"&path="+encodeURIComponent(R);try{let j=await r(se),q=await j.json().catch(()=>({}));if(!j.ok||!q||q.ok!==!0){if(q?.error==="not_found"&&B.missing_state==="plan_pending"){s="pending",a="\uACC4\uD68D \uC791\uC131 \uC804 \xB7 \uACBD\uB85C\uB9CC \uC608\uC57D\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4",f();return}s="error",a="\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 ("+String(q&&q.error||j.status)+")",f();return}let C=Ib(String(q.content||""));l=C.front,i=C.body,s="ready",f()}catch{s="error",a="\uBB38\uC11C \uC694\uCCAD \uC2E4\uD328",f()}}function m(){o=null,ot(c``,e)}function k(){document.removeEventListener("keydown",u),m()}return{open:g,close:m,destroy:k}}var Lb=[{key:"input_tokens",label:"\uC785\uB825"},{key:"output_tokens",label:"\uCD9C\uB825"},{key:"cache_read_input_tokens",label:"\uCE90\uC2DC \uC77D\uAE30"}],dp="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4",Ii=[{role:"implementation",provider:"codex"},{role:"review-consult",provider:"codex"},{role:"subagent",provider:"claude"}],Pb=new Set(["codex-runner","Explore","Plan","advisor","advisor-xhigh","claude-code-guide","statusline-setup"]);function cp(e){return typeof e=="string"&&Pb.has(e)}var Db=["running","done","failed","interrupted"],Mb={running:"\u25CF",done:"\u2713",failed:"\u2717",interrupted:"\u26A0"};function Nb(e){return typeof e=="number"&&Number.isFinite(e)?e:0}function qb(e){let t=rn(e);if(t.length>0)return t.map(o=>c`<span class="detail-usage-total" title=${o.tooltip}
          >${o.label}</span
        >`);let n=Xr(e);if(!n||!e)return"";let r=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?` \xB7 $${e.total_cost_usd.toFixed(2)}`:"";return c`<span
      class="detail-usage-total"
      title="이 이슈의 모든 attempt 토큰 합계 (입력+출력+캐시)"
      >${n.replace(/^τ /,"\u03C4 \uCD1D ")}${r}</span
    >${e.replayed?c`<span class="detail-usage-partial" title=${dp}
          >부분 집계</span
        >`:""}`}function up(e){return!e||!e.roles.orchestrator?null:{providers:e.roles.orchestrator,roles:{}}}function bl(e){if(typeof e=="number")return ns(e);if(typeof e!="string")return"";let t=Date.parse(e);return Number.isFinite(t)?ns(t):""}function jb(e){return typeof e=="string"?e.replace(/-\d{8}$/,""):""}function Fb(e,t){if(e.provider!=="claude")return{text:e.session_id.slice(0,8),title:e.session_id};let n=t&&typeof t.agent_id=="string"?t.agent_id:"";return n.length>0?{text:n.slice(0,8),title:n}:{text:e.launch_id.slice(-8),title:e.launch_id}}function gl(e){return e===null||typeof e=="string"&&e.trim().length>0}function hl(e){return e===null||typeof e=="number"&&Number.isFinite(e)}function Bb(e){if(!e||typeof e!="object"||Array.isArray(e))return null;let t=e,n=t.provider==="claude";return typeof t.launch_id!="string"||t.launch_id.length===0||!Ii.some(r=>r.role===t.role&&r.provider===t.provider)||!(n?gl(t.model):typeof t.model=="string"&&t.model.length>0)||!(!("effort"in t)||gl(t.effort))||!(!("agent_type"in t)||gl(t.agent_type))||typeof t.session_id!="string"||t.session_id.length===0||!Db.includes(t.status)||!(t.turn_id===null||typeof t.turn_id=="string")?null:n?!hl(t.started_at)||!hl(t.last_event_at)||!hl(t.completed_at)?null:t:typeof t.started_at!="number"||!Number.isFinite(t.started_at)||typeof t.last_event_at!="number"||!Number.isFinite(t.last_event_at)||!(t.completed_at===null||typeof t.completed_at=="string"&&Number.isFinite(Date.parse(t.completed_at)))?null:t}function Ub(e,t,n){let o=rn({providers:{[t]:{subtotal:n.subtotal,breakdown:n.usage,...n.replayed?{replayed:!0}:{}}},roles:{}})[0];return c`<div class="detail-session__leg detail-session__usage-detail">
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
    ${bl(n.completed_at)?c`<span class="detail-session__leg-time detail-session__time"
          >${bl(n.completed_at)}</span
        >`:""}
    ${o?c`<span class="detail-session__usage" title=${o.tooltip}
          >${o.label}</span
        >`:""}
  </div>`}function Wb(e,t,n,r){let o=e.status==="running"?null:t,i=(o?rn({providers:{[e.provider]:{subtotal:o.subtotal,breakdown:o.usage,...o.replayed?{replayed:!0}:{}}},roles:{}}):[])[0],l=e.status==="running"?ns(e.last_event_at):o?bl(o.completed_at):"",a=(e.provider==="claude"?["Claude",e.agent_type,jb(e.model),e.effort]:["codex",e.model,e.effort]).filter(Boolean).join(" \xB7 "),u=Fb(e,o);return c`<button
    type="button"
    class="detail-session__leg detail-session__usage-detail detail-session__leg--${e.status}"
    data-launch-id=${e.launch_id}
    @click=${()=>r.onOpenDelegation&&r.onOpenDelegation(n,e.launch_id)}
  >
    <span class="detail-session__leg-glyph" aria-hidden="true"
      >${Mb[e.status]}</span
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
  </button>`}function zb(e,t){return e.role===t.role&&(e.model===null||t.model===void 0||e.model===t.model)&&e.session_id===t.session_id}function Hb(e,t,n){let r=[],o=new Set,s=Array.isArray(e.delegation_sessions)?e.delegation_sessions:[];for(let p of s){let f=Bb(p);!f||o.has(f.launch_id)||cp(f.agent_type)||(o.add(f.launch_id),r.push(f))}r.sort((p,f)=>(p.started_at||0)-(f.started_at||0));let i={};for(let{role:p,provider:f}of Ii){let g=t?t.roles[p]?.[f]:null;i[p]=g?[...g.legs]:[]}let l=Ii.flatMap(({role:p})=>i[p]),a=new Set,u=[];for(let{role:p,provider:f}of Ii){for(let g of r.filter(m=>m.role===p&&m.provider===f)){let m=l.find(k=>k.receipt_id===g.launch_id)||null;m&&!zb(g,m)||(m&&a.add(m.receipt_id),u.push(Wb(g,m,e.attempt_id,n)))}for(let g of i[p])!a.has(g.receipt_id)&&!cp(g.agent_type)&&u.push(Ub(p,f,g))}return u}function Gb(e,t){let n=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?e.total_cost_usd:null,r=[...Lb,{key:"cache_creation_input_tokens",label:t==="codex"?"\uCE90\uC2DC \uC4F0\uAE30":"\uCE90\uC2DC \uC0DD\uC131"},...t==="codex"&&typeof e.reasoning_output_tokens=="number"&&Number.isFinite(e.reasoning_output_tokens)?[{key:"reasoning_output_tokens",label:"\uCD94\uB860 \uCD9C\uB825"}]:[]];return c`<div class="detail-session__usage-detail">
    ${r.map(o=>c`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">${o.label}</span
          ><span class="detail-session__usage-value"
            >${Nb(e[o.key]).toLocaleString("en-US")}</span
          ></span
        >`)}
    ${n===null?"":c`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">비용</span
          ><span class="detail-session__usage-value"
            >$${n.toFixed(2)}</span
          ></span
        >`}
    ${e.replayed?c`<span class="detail-session__usage-note">${dp}</span>`:""}
  </div>`}var Kb={running:"\u25CF",done:"\u2713",failed:"\u2717",orphaned:"\u26A0"};function ns(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),n=String(t.getHours()).padStart(2,"0"),r=String(t.getMinutes()).padStart(2,"0");return`${n}:${r}`}function Yb(e){if(typeof e.exec_default_preset_id!="string"||e.exec_default_preset_id.length===0)return"";let t=e.exec_values&&typeof e.exec_values=="object"?Object.entries(e.exec_values).filter(([,r])=>typeof r=="string"&&r.length>0).map(([r,o])=>`${r}=${o}`).join(" \xB7 "):"",n=typeof e.exec_default_preset_revision=="number"?` r${e.exec_default_preset_revision}`:"";return c`<div
    class="detail-session__preset-audit"
    data-attempt-preset-audit
  >
    <strong>외부 실행 preset</strong>
    <span>${e.exec_default_preset_id}${n}</span>
    ${t?c`<small>${t}</small>`:""}
    <small>내부 workflow 실행 영수증과 별도 기록</small>
  </div>`}var Vb={remote:"\uB2E4\uB978 \uBA38\uC2E0 \uC138\uC158 \u2014 \uC774 \uC11C\uBC84\uC5D0 transcript \uC5C6\uC74C",missing:"transcript \uD30C\uC77C \uC5C6\uC74C"};function Xb(e,t){let n=Vb[e.locality]||"",r=e.locality==="remote"?`${e.host} \xB7 \uB2E4\uB978 \uBA38\uC2E0`:e.locality==="missing"?`${e.host} \xB7 \uD30C\uC77C \uC5C6\uC74C`:e.host;return c`<div class="detail-session-row">
    <button
      type="button"
      class="detail-session detail-session--session"
      data-session-key=${la(e)}
      ?disabled=${n.length>0}
      title=${n}
      @click=${()=>{n.length===0&&t.onOpenSessionRef&&t.onOpenSessionRef(e)}}
    >
      <span class="detail-session__glyph">${e.current?"\u25D0":"\xB7"}</span>
      <span class="detail-session__id">${xo(e)}</span>
      <span class="detail-session__meta">${r}</span>
      <span class="detail-session__sid" title=${e.session_id}
        >${e.session_id.slice(0,8)}</span
      >
      <span class="detail-session__time">${ns(e.last_event_at)}</span>
    </button>
    ${e.resume_command?c`<button
          type="button"
          class="detail-session__resume-cmd"
          title=${e.resume_command}
          @click=${o=>{o.stopPropagation(),t.onCopyResumeCommand&&e.resume_command&&t.onCopyResumeCommand(e.resume_command)}}
        >
          ⧉ 재개
        </button>`:""}
  </div>`}function pp(e,t={},n={},r=[]){let o=Array.isArray(e)?e:[],s=Array.isArray(r)?r:[],i=[...s.filter(m=>m&&m.current===!0),...s.filter(m=>m&&m.current!==!0).sort((m,k)=>k.index-m.index)],l=i.map(m=>Xb(m,t)),a=n.expanded||new Set;if(o.length===0&&i.length===0)return c`
      <div class="detail-section-label">세션 이력</div>
      <div class="detail-empty" data-seam="session-history">세션 이력 없음</div>
    `;let u=new Set;for(let m of o)m&&typeof m.resumed_from=="string"&&m.resumed_from.length>0&&u.add(m.resumed_from);let p=m=>{if(!(m.status==="failed"||m.status==="orphaned"))return"";let R=typeof m.session_id=="string"&&m.session_id.length>0,B=u.has(m.attempt_id),X=R&&!B,se=R?B?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":"\uC774 \uC138\uC158\uC744 \uAC19\uC740 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C \uC774\uC5B4\uC11C \uC9C4\uD589":"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00";return c`<button
      type="button"
      class="detail-session__resume"
      data-attempt-id=${m.attempt_id}
      ?disabled=${!X}
      title=${se}
      @click=${j=>{j.stopPropagation(),X&&t.onResume&&t.onResume(m.attempt_id)}}
    >
      ↻ 이어하기
    </button>`},f=m=>{if(!(m.status==="failed"||m.status==="orphaned")||typeof m.cause!="string"||m.cause==="")return"";let R=m.cause_detail,B=R&&typeof R.reason=="string"&&R.reason.length>0?typeof R.command=="string"&&R.command.length>0?`${R.reason} \xB7 ${R.command}`:R.reason:m.cause;return c`<div class="detail-session__cause" title=${B}>
      ${m.cause}
    </div>`},g=m=>{let k=up(pa(m));if(rn(k).length===0&&!Xr(m.usage))return"";let R=a.has(m.attempt_id);return c`<button
      type="button"
      class="detail-session__usage-toggle"
      data-attempt-id=${m.attempt_id}
      aria-expanded=${R?"true":"false"}
      title=${R?"\uD1A0\uD070 \uB0B4\uC5ED \uC811\uAE30":"\uD1A0\uD070 \uB0B4\uC5ED \uD3BC\uCE58\uAE30"}
      @click=${B=>{B.stopPropagation(),t.onToggleUsage&&t.onToggleUsage(m.attempt_id)}}
    >
      τ 자세히
    </button>`};return c`
    <div class="detail-section-label">
      세션 이력${qb(n.total)}
    </div>
    <div class="detail-sessions" data-seam="session-history">
      ${l}${o.map(m=>{let k=pa(m),R=up(k),B=rn(R);return c`<div class="detail-session-row">
          <button
            type="button"
            class="detail-session detail-session--${m.status||"unknown"}"
            data-attempt-id=${m.attempt_id}
            @click=${()=>t.onOpen&&t.onOpen(m.attempt_id)}
          >
            <span class="detail-session__glyph"
              >${Kb[m.status||""]||"\xB7"}</span
            >
            <span class="detail-session__id">${m.attempt_id}</span>
            ${$o(m)?c`<span
                  class="detail-session__resumed"
                  title=${$o(m)}
                  >↻</span
                >`:""}
            <span class="detail-session__meta">${Ar(m)}</span>
            ${B.length>0?c`<span class="detail-session__role">orchestrator</span>`:""}
            ${m.session_id?c`<span class="detail-session__sid" title=${m.session_id}
                  >${String(m.session_id).slice(0,8)}</span
                >`:""}
            ${B.length>0?B.map(X=>c`<span
                      class="detail-session__usage"
                      title=${X.tooltip}
                      >${X.label}</span
                    >`):Xr(m.usage)?c`<span class="detail-session__usage"
                    >${Xr(m.usage)}</span
                  >`:""}
            <span class="detail-session__time">${ns(m.started_at)}</span>
          </button>
          ${g(m)} ${p(m)} ${f(m)} ${Yb(m)}
          ${a.has(m.attempt_id)&&m.usage?Gb(m.usage,m.runner==="codex"?"codex":"claude"):""}
          ${Hb(m,k,t)}
        </div>`})}
    </div>
  `}function fp(e,t={}){return c`
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
          ${Qb(e)}
        </div>`:""}
  `}function Qb(e){let t=co(e);if(t)return t;let n=e.data;if(!n)return"";if(n.missing)return c`<div class="detail-prompt__missing">
        기록 없음 — 아직 이 이슈로 디스패치된 세션이 없습니다. 아래는 다음
        디스패치가 보낼 기본 과업입니다.
      </div>
      ${typeof n.default_task_prompt=="string"?Jn("\uC608\uC0C1 \uAE30\uBCF8 \uACFC\uC5C5",n.default_task_prompt):""}`;let r=Si(n.recorded_at);return c`<div class="detail-prompt__meta">
      ${n.attempt_id}${r?` \xB7 ${r}`:""}
    </div>
    ${typeof n.task_prompt=="string"?Jn("\uACFC\uC5C5 (user)",n.task_prompt):""}
    ${typeof n.system_prompt=="string"?Jn("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",n.system_prompt):""}`}var Lr=10;function _p(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),n=r=>String(r).padStart(2,"0");return`${n(t.getMonth()+1)}-${n(t.getDate())} ${n(t.getHours())}:${n(t.getMinutes())}`}function mp(e,t={}){let r=(Array.isArray(e?.events)?e.events:[]).filter(l=>l&&typeof l.summary=="string"&&l.summary.trim().length>0);if(r.length===0)return"";let o=typeof e.shown=="number"&&e.shown>0?e.shown:Lr,s=r.slice(0,o),i=r.length-s.length;return c`
    <div class="detail-section-label">Worker 이력 (${r.length})</div>
    <ol class="detail-timeline" data-seam="worker-timeline">
      ${s.map(l=>c`<li class="detail-timeline__row">
            ${_p(l.at)?c`<span class="detail-timeline__at"
                  >${_p(l.at)}</span
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
  `}var Zb=["open","in_progress","deferred","resolved","closed"],Jb=[0,1,2,3,4];function gp(e,t){let n=t.issueStores,r=t.onClose,o=t.transport,s=t.onNavigate,i=t.queueStore,l=t.execPresetStore,a=t.sessionLogStore,u=null,p=null,f={},g="",m=!1,k=[],R=!1,B={},X={claude:null,codex:null},se=null,j=null,q=0,C=!1,I=!1,F="",V="",Q="",P="",K=!1;function H(){C=!1,I=!1,F="",V="",Q="",P="",K=!1}function ee(){X={claude:null,codex:null},se=null,j=null,q+=1}async function ke(){if(!o)return null;try{let w=await Promise.resolve(o("get-workspace-accounts",{}));return w&&typeof w.state=="string"?w:null}catch{return null}}async function Re(w){try{let N=await fetch(w);if(!N.ok)return null;let W=await N.json();if(!W||typeof W!="object"||!Array.isArray(W.accounts))return null;let $e=W.accounts.filter(tt=>tt!==null&&typeof tt=="object"&&!Array.isArray(tt));return{accounts:$e,active:$e.find(tt=>tt.active===!0)||null}}catch{return null}}async function ne(w){j=w;let N=++q,[W,$e,tt]=await Promise.all([Re("/api/claude-usage"),Re("/api/codex-usage"),ke()]);N!==q||w!==u||(X={claude:W,codex:$e},se=tt,it())}let D=[],ve=null,Ee=null,T=!1,Z="",we=!1,he=0,Te=new Set;function ge(){D=[],ve=null,Ee=null,T=!1,Z="",we=!1,he+=1,Te.clear()}async function Oe(w){if(!o)return;let N=++he;try{let W=await Promise.resolve(o("get-comments",{id:w}));if(N!==he||w!==u)return;D=Array.isArray(W)?W:[],T=!1}catch{if(N!==he||w!==u)return;T=!0}it()}function Ge(){if(!o||!u)return;let w=p&&typeof p.comment_count=="number"?p.comment_count:null;if(ve!==u){ve=u,Ee=w,Oe(u);return}w!==null&&w!==Ee&&(Ee=w,Oe(u))}function et(w){Te.has(w)?Te.delete(w):Te.add(w),it()}function L(w){let N=Z.trim().length===0;Z=w,N!==(w.trim().length===0)&&it()}async function ue(){let w=Z.trim();if(!o||!u||w.length===0||we)return;let N=u;we=!0,it();let W=!1;try{let $e=await Promise.resolve(o("add-comment",{id:N,text:w}));Array.isArray($e)&&$e.length>0&&(W=!0,N===u&&(D=$e,T=!1,Z="",Ee=$e.length))}catch{W=!1}W||ye("\uB313\uAE00 \uCD94\uAC00 \uC2E4\uD328","error"),N===u&&(we=!1),it()}let re={onToggle:et,onDraftInput:L,onSubmit:ue},pe=t.mdViewer||null,Ce=null;pe||(Ce=document.createElement("div"),Ce.className="md-viewer-root",document.body.appendChild(Ce));let _e=pe||Oi(Ce,{getWorkspacePath:t.getWorkspacePath||(()=>"")}),xe=document.createElement("div");xe.className="session-log-root",document.body.appendChild(xe);let We=uo(xe,{transport:o?(w,N)=>Promise.resolve(o(w,N)):void 0,sessionLogStore:a}),Qe=!1,qe=!1,J=!1,U=null,Ae=null,lt=0;function st(w){return`${t.getWorkspacePath&&t.getWorkspacePath()||""}::${w}`}function b(){Qe=!1,qe=!1,J=!1,U=null,Ae=null,lt+=1}async function z(w){if(!o)return;let N=++lt;qe=!0,J=!1,it();try{let W=await Promise.resolve(o("get-bead-prompt",{bead_id:w}));if(N!==lt)return;!W||typeof W!="object"||Array.isArray(W)?J=!0:(U=W,Ae=st(w))}catch{N===lt&&(J=!0)}finally{N===lt&&(qe=!1,it())}}let Ie=[],Le=null,Be=0;function He(w,N){return`${t.getWorkspacePath&&t.getWorkspacePath()||""}::${w}::${N}`}function pt(){Ie=[],Le=null,Be+=1}async function xt(w,N){if(!o)return;let W=++Be,$e;try{$e=await Promise.resolve(o("get-session-refs",{bead_id:w}))}catch{$e=null}W!==Be||N!==Le||(Ie=$e&&Array.isArray($e.sessions)?$e.sessions:[],it())}function Mt(){if(!o||!u)return;let w=p&&p.metadata,N=w&&typeof w=="object"&&typeof w.session_ref=="string"?w.session_ref:null;if(N===null){pt();return}let W=He(u,N);Le!==W&&(Ie=[],Le=W,xt(u,W))}let Nt=[],mt=[],ct=Lr,At=null,Rt=0;function Lt(w){return`${t.getWorkspacePath&&t.getWorkspacePath()||""}::${w}`}function ae(){Nt=[],mt=[],ct=Lr,At=null,Rt+=1}async function ie(w,N){if(!o)return;let W=++Rt,$e;try{$e=await Promise.resolve(o("get-bead-timeline",{bead_id:w}))}catch{$e=null}W!==Rt||N!==At||(Nt=$e&&Array.isArray($e.events)?$e.events:[],mt=$e&&Array.isArray($e.attempts)?$e.attempts:[],ct=Lr,it())}function $(){if(!o||!u)return;let w=Lt(u);At!==w&&(Nt=[],mt=[],ct=Lr,At=w,ie(u,w))}function M(){ct+=Lr,it()}function oe(){if(Qe=!Qe,Qe&&u&&Ae!==st(u)){U=null,z(u);return}it()}function te(){let w={};for(let W of mt)W&&typeof W=="object"&&W.bead_id===u&&(w[String(W.attempt_id)]=W);let N=i?i.get():null;for(let W of N&&N.attempts?Object.values(N.attempts):[]){let $e=W;$e&&$e.bead_id===u&&(w[String($e.attempt_id)]=$e)}return w}function le(){return u?Object.values(te()).sort((N,W)=>(W.started_at||0)-(N.started_at||0)).map(N=>({attempt_id:N.attempt_id,bead_id:N.bead_id,status:N.status,started_at:typeof N.started_at=="number"?N.started_at:null,runner:N.runner||null,model:N.model||null,effort:N.effort||N.observed_effort||null,speed:N.speed||null,session_id:N.session_id||null,resumed_from:N.resumed_from||null,continuation_mode:N.continuation_mode||null,dismissed_at:typeof N.dismissed_at=="number"?N.dismissed_at:null,cause:typeof N.cause=="string"?N.cause:null,cause_detail:N.cause_detail||null,exec_default_preset_id:typeof N.exec_default_preset_id=="string"?N.exec_default_preset_id:null,exec_default_preset_revision:typeof N.exec_default_preset_revision=="number"?N.exec_default_preset_revision:null,exec_values:N.exec_values&&typeof N.exec_values=="object"?N.exec_values:null,usage:N.usage||null,usage_legs:Array.isArray(N.usage_legs)?N.usage_legs:[],delegation_sessions:Array.isArray(N.delegation_sessions)?N.delegation_sessions:[]})):[]}function Fe(){return u?Gn(te(),u):null}let Ke=new Set;function Je(w){Ke.has(w)?Ke.delete(w):Ke.add(w),it()}function Ue(w){let N=i?i.get():null,W=N&&N.attempts?N.attempts[w]:null;We.open({attempt_id:w,meta:W?{runner:W.runner||void 0,model:W.model||void 0,effort:W.effort||void 0,status:W.status||void 0,session_id:W.session_id||void 0}:{}})}function kt(w,N){let W=i?i.get():null,$e=W&&W.attempts?W.attempts[w]:null,nt=($e&&Array.isArray($e.delegation_sessions)?$e.delegation_sessions:[]).find(ht=>ht&&typeof ht=="object"&&ht.launch_id===N);nt&&We.open({attempt_id:w,launch_id:N,meta:{runner:nt.provider==="claude"?"claude":"codex",role:nt.role,...typeof nt.agent_type=="string"?{agent_type:nt.agent_type}:{},model:nt.model,effort:nt.effort,session_id:nt.session_id,status:nt.status}})}async function qt(w){if(!o||!w)return;let N=await Kr();if(N===null)return;let W=()=>{let ht=i?i.get():null;return ht&&typeof ht.revision=="number"?ht.revision:0},$e=async(ht={},Xe=W())=>await o("worker-attempt-resume",{attempt_id:w,expected_revision:Xe,...N!==""?{instructions:N}:{},...ht}),tt=ht=>{ht?.queue&&i?.set&&i.set(ht.queue)},nt=await $e();if(tt(nt),nt&&nt.conflict){let ht=nt.queue&&typeof nt.queue.revision=="number"?nt.queue.revision:W();nt=await $e({},ht),tt(nt)}nt=await zn(nt,(ht,Xe)=>$e({continuation:ht,decision_token:Xe}),{onResult:tt,refresh:()=>$e()}),nt&&nt.resumed===!1&&!nt.conflict&&nt.reason&&ye(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${nt.reason}`,"error",2400)}function yt(w){!w||!u||We.open(Yr(w,u,p&&p.status))}let Jt={onOpen:Ue,onOpenDelegation:kt,onResume:qt,onToggleUsage:Je,onOpenSessionRef:yt,onCopyResumeCommand:d};function St(){let w=i?i.get():null,N={...B};for(let W of["orchestration_model","orchestration_effort","orchestration_speed"]){let $e=w&&w[W];typeof $e=="string"&&(N[W]=$e)}return N}async function Ot(){if(o){try{let w=await Promise.resolve(o("get-session-defaults",{}));B=w&&w.values&&typeof w.values=="object"?w.values:{}}catch{B={}}it()}}function Wt(){let w=i?i.get():null;return w&&w.runner_catalog||null}function ut(){let w=i?i.get():null;return w&&typeof w.execution_defaults=="object"?w.execution_defaults:null}function Kt(){let w=p?.metadata&&typeof p.metadata=="object"?p.metadata:{},W=gn({pin:{...w,...f},global:St(),execution_defaults:ut(),runner_catalog:Wt(),route:typeof w.route=="string"?w.route:null}).orchestration_model.value||"";return En(Wt(),W)}function Yt(){let w=l?l.get():null;return!w||typeof w.revision!="number"?null:{revision:w.revision,presets:Array.isArray(w.presets)?w.presets:[]}}function zt(w){return w?.compatible===!1}function mn(w){l&&w&&typeof w.revision=="number"&&Array.isArray(w.presets)&&l.set({revision:w.revision,presets:w.presets})}async function jt(){let w=Yt(),N=w?.presets.find(W=>W.id===g);if(!(!o||!u||!w||!N||zt(N)||m)){m=!0,k=[],it();try{let W=await Promise.resolve(o("apply-impl-preset",uu(u,N.id,w.revision)));if(W&&W.conflict){mn(W),ye("\uD504\uB9AC\uC14B\uC774 \uBCC0\uACBD\uB410\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uBAA9\uB85D\uC5D0\uC11C \uB2E4\uC2DC \uC801\uC6A9\uD558\uC138\uC694.","error",4e3);return}let $e=W&&Array.isArray(W.issue)?W.issue[0]:W?.issue;if(W&&W.applied&&$e&&typeof $e=="object"){p=$e,k=Array.isArray(W.skipped_orchestration_keys)?W.skipped_orchestration_keys.filter(tt=>typeof tt=="string"):[];for(let tt of du)delete f[tt];ye(k.length>0?"\uC2E4\uD589 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4. \uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 3\uD0A4\uB294 Bead\uC5D0 \uD540\uD560 \uC218 \uC5C6\uC5B4 \uAC74\uB108\uB6F0\uC5C8\uC2B5\uB2C8\uB2E4.":"\uC2E4\uD589 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4.","success",4e3);return}W&&W.error==="bd_readback_failed"?ye("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):ye("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}catch(W){W&&typeof W=="object"&&W.code==="bd_readback_failed"?ye("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):ye("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}finally{m=!1,it()}}}let en=null;n&&n.subscribe&&(en=n.subscribe(()=>h()));let Ht=null;i&&typeof i.subscribe=="function"&&(Ht=i.subscribe(()=>{u&&it()}));let nn=null,fe=null;function E(){fe&&(fe(),fe=null)}l&&typeof l.subscribe=="function"&&(nn=l.subscribe(()=>{u&&it()}));function me(w){w.key==="Escape"&&u&&(w.preventDefault(),r())}document.addEventListener("keydown",me);let De=Qr(()=>it());De.attach();function h(){if(u){if(n&&typeof n.snapshotFor=="function"){let w=n.snapshotFor("detail:"+u)||[];p=w.find(W=>W&&W.id===u)||w[0]||p}Ge(),Mt(),$(),it()}}function d(w){an(w).then(N=>{N?ye("\uBCF5\uC0AC\uB428","success",1200):ye("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function _(w){w.preventDefault(),w.stopPropagation(),u&&d(u)}function S(w,N){w.preventDefault(),w.stopPropagation(),d(N)}function G(w,N,W){w.preventDefault(),w.stopPropagation(),_e.open(N,{missing_state:W})}async function Y(w,N){let W=Object.hasOwn(f,w),$e=f[w];if(f[w]=N,it(),!(!o||!u))try{let tt=await Promise.resolve(o("update-exec-settings",cu(u,w,N.length===0?null:N))),nt=Array.isArray(tt)?tt[0]:tt;if(!nt||typeof nt!="object"||!nt.id)throw new Error("exec settings readback failed");p=nt,delete f[w],it()}catch(tt){throw W?f[w]=$e:delete f[w],it(),ye("\uC2E4\uD589 \uC124\uC815 \uBCC0\uACBD \uC2E4\uD328","error"),tt}}function ce(w){w.catch(()=>{})}async function Se(w,N){let W=p||{},$e=W.metadata&&typeof W.metadata=="object"?W.metadata:{},tt={};for(let Xe of["impl_runtime","impl_model","impl_effort"])tt[Xe]=Object.hasOwn(f,Xe)?f[Xe]:typeof $e[Xe]=="string"?$e[Xe]:"";tt[w]=N;let nt=_u(tt,Wt(),Kt()),ht={};for(let Xe of["impl_runtime","impl_model","impl_effort"])ht[Xe]=f[Xe],f[Xe]=nt[Xe]||"";if(it(),!(!o||!u))return Promise.resolve(o("update-impl-target",{id:u,...nt,orchestration_runtime:Kt()})).then(Xe=>{let dt=Array.isArray(Xe)?Xe[0]:Xe;if(!dt||typeof dt!="object"||!dt.id)throw new Error("implementation target readback failed");p=dt;for(let An of["impl_runtime","impl_model","impl_effort"])delete f[An];it()}).catch(Xe=>{for(let dt of["impl_runtime","impl_model","impl_effort"])ht[dt]===void 0?delete f[dt]:f[dt]=ht[dt];throw it(),ye("\uAD6C\uD604 target \uBCC0\uACBD \uC2E4\uD328","error"),Xe})}async function Ye(w,N,W){if(!o||!u)return!1;try{let $e=await Promise.resolve(o(w,N)),tt=Array.isArray($e)?$e[0]:$e;return tt&&typeof tt=="object"&&tt.id?(p=tt,!0):(ye(W,"error"),!1)}catch($e){return $e&&typeof $e=="object"&&$e.code==="bd_readback_failed"?(ye("\uC800\uC7A5\uB410\uC73C\uB098 \uD655\uC778 \uC2E4\uD328 \u2014 \uACE7 \uAC31\uC2E0\uB429\uB2C8\uB2E4","error"),{ok:!1,saved:!0}):(ye(W,"error"),!1)}}function rt(w){setTimeout(()=>{try{let N=e.querySelector(w);N&&typeof N.focus=="function"&&N.focus()}catch{}},0)}function vt(){C=!0,F=p&&p.title||"",it(),rt('.detail-edit__input[data-edit="title"]')}function gt(w){F=w.target.value}function x(){C=!1,F="",it()}function A(){Ye("edit-text",{id:u,field:"title",value:F},"\uC81C\uBAA9 \uC800\uC7A5 \uC2E4\uD328").then(N=>{N===!0&&(C=!1,F=""),it()})}function Pe(){I=!0,V=p&&p.description||"",it(),rt('.detail-edit__textarea[data-edit="description"]')}function je(w){V=w.target.value}function Ze(){I=!1,V="",it()}function _t(){Ye("edit-text",{id:u,field:"description",value:V},"\uC124\uBA85 \uC800\uC7A5 \uC2E4\uD328").then(N=>{N===!0&&(I=!1,V=""),it()})}function y(w,N,W,$e){if(w.key==="Escape"){w.stopPropagation(),W();return}w.key==="Enter"&&(!$e||w.ctrlKey||w.metaKey)&&(w.preventDefault(),N())}function v(w){let N=w.target.value;Ye("update-status",{id:u,status:N},"\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328").then(()=>it())}function O(w){let N=Number(w.target.value);Ye("update-priority",{id:u,priority:N},"\uC6B0\uC120\uC21C\uC704 \uBCC0\uACBD \uC2E4\uD328").then(()=>it())}function de(w){Q=w.target.value}function be(){let w=Q.trim();w.length!==0&&Ye("label-add",{id:u,label:w},"\uB77C\uBCA8 \uCD94\uAC00 \uC2E4\uD328").then(N=>{N===!0&&(Q=""),it()})}function Me(w){if(w.key==="Escape"){w.stopPropagation(),Q="",it();return}w.key==="Enter"&&(w.preventDefault(),be())}function Ve(w){Ye("label-remove",{id:u,label:w},"\uB77C\uBCA8 \uC81C\uAC70 \uC2E4\uD328").then(()=>it())}let Et={onCopyPath:S,onOpenDoc:G};function Ft(w){return typeof w=="string"?w:w&&typeof w=="object"?String(w.id||w.to||w.issue_id||w.depends_on||""):""}function Vt(w){return w&&typeof w=="object"?String(w.dependency_type||w.type||""):""}function $n(w){switch(w){case"discovered-from":return{glyph:"\u21A9 ",relation:"\uBC1C\uACAC"};case"parent-child":return{glyph:"\u2338 ",relation:"\uC0C1\uC704"};case"related":return{glyph:"\u2194 ",relation:"\uAD00\uB828"};default:return w.length>0?{glyph:`${w} `,relation:w}:{glyph:"",relation:""}}}function yn(w,N){let W=mr(N),$e=[];return w.length>0&&$e.push(w),W&&$e.push(W),$e.length>0?$e.join(`
`):void 0}function mr(w){if(!w||typeof w!="object")return;let N=typeof w.status=="string"?w.status:"",W=typeof w.title=="string"?w.title:"";return N.length>0&&W.length>0?`${N} \xB7 ${W}`:void 0}function Pn(){return(t.getWorkspacePath&&t.getWorkspacePath()||"").trim()}function jn(){return t.depCandidates?t.depCandidates():null}async function Xt(w,N,W){let $e=Pn(),tt=u;if(!tt)return;if($e.length===0){ye("\uB808\uD3EC\uB97C \uC54C \uC218 \uC5C6\uC5B4 \uC758\uC874\uC744 \uBC14\uAFC0 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error");return}let nt=await Ye(w,{a:tt,b:N,view_id:tt,root_dir:$e},W),ht=nt===!0||nt!==!1&&nt.saved===!0;ht&&t.onDepChanged&&t.onDepChanged({type:w,a:tt,b:N}),w==="dep-add"&&ht&&(P="",K=!1),it()}function er(w){if(!u)return;let N=globalThis.confirm;typeof N=="function"&&!N(`${w}\uAC00 ${u}\uB97C \uB9C9\uB294 \uC5F0\uACB0\uC744 \uB04A\uC744\uAE4C\uC694?`)||Xt("dep-remove",w,"\uC758\uC874 \uD574\uC81C \uC2E4\uD328")}function gr(w){w.disabled||Xt("dep-add",w.bead_id,"\uC758\uC874 \uCD94\uAC00 \uC2E4\uD328")}function hr(w){P=w.target.value,K=!0,it()}function xn(){K||(K=!0,it())}function Fn(w,N){if(w.key==="Escape"){w.stopPropagation(),P="",K=!1,it();return}w.key==="Enter"&&(w.preventDefault(),N.length===1&&!N[0].disabled&&gr(N[0]))}function tr(w){return c`<div class="detail-dep-add">
      <input
        class="detail-dep-add__input"
        aria-label="막는 이슈 추가"
        placeholder="막는 이슈 추가"
        .value=${P}
        @focus=${xn}
        @input=${hr}
        @keydown=${N=>Fn(N,w)}
      />
      ${K||P.length>0?c`<div class="detail-dep-add__list">
            ${w.length===0?c`<div class="detail-dep-add__empty">후보 없음</div>`:w.map(N=>c`<button
                      type="button"
                      class="detail-dep-add__cand"
                      data-dep-cand=${N.bead_id}
                      ?disabled=${N.disabled}
                      title=${on(N.reason)}
                      @click=${()=>gr(N)}
                    >
                      <span class="detail-dep-add__repo"
                        >${N.workspace_name}</span
                      >
                      <span class="detail-dep-add__id"
                        >${N.bead_id}</span
                      >
                      <span class="detail-dep-add__title"
                        >${N.title}</span
                      >
                    </button>`)}
          </div>`:""}
    </div>`}function ze(w,N){let W=N.get(w.id),$e=s?c`<button
          type="button"
          class="detail-dep__link"
          title=${on(w.title)}
          @click=${()=>W===void 0?s(w.id):s(w.id,W)}
        >
          ${w.label}
        </button>`:c`<span class="detail-dep__link" title=${on(w.title)}
          >${w.label}</span
        >`;return c`<span
      class=${`detail-dep detail-dep--${w.kind}${s?" detail-dep--link":""}`}
      >${$e}${w.kind==="pred"?c`<button
            type="button"
            class="detail-dep__unlink"
            data-dep-b=${w.id}
            aria-label=${"\uC758\uC874 \uD574\uC81C: "+w.id}
            @click=${()=>er(w.id)}
          >
            ✕
          </button>`:""}</span
    >`}function Bt(w){let N=Array.isArray(w.dependencies)?w.dependencies:[],W=Array.isArray(w.dependents)?w.dependents:[],$e=[];for(let Xe of N){let dt=Ft(Xe);dt.length>0&&Vt(Xe)==="blocks"&&$e.push({id:dt,label:`\u26D3 ${dt}`,kind:"pred",title:yn("\uB9C9\uB294",Xe)})}for(let Xe of W){let dt=Ft(Xe);dt.length>0&&Vt(Xe)==="blocks"&&$e.push({id:dt,label:`\u2192 ${dt}`,kind:"succ",title:yn("\uB9C9\uD788\uB294",Xe)})}for(let Xe of N){let dt=Ft(Xe),An=Vt(Xe);if(dt.length>0&&An!=="blocks"){let Ll=$n(An);$e.push({id:dt,label:`${Ll.glyph}${dt}`,kind:"other",title:yn(Ll.relation,Xe)})}}let tt=jn(),nt=new Map;if(tt)for(let Xe of tt.issues)nt.has(Xe.bead_id)||nt.set(Xe.bead_id,Xe.root_dir);let ht=tt&&u?dd(ud(u,tt),P):[];return c`
      <div class="detail-section-label">의존성</div>
      ${$e.length===0?c`<div class="detail-empty">의존성 없음</div>`:c`<div class="detail-deps">
            ${$e.map(Xe=>ze(Xe,nt))}
          </div>`}
      ${tt===null?c`<div class="detail-empty">후보를 불러올 수 없음</div>`:tr(ht)}
    `}function vn(w){let N=w.metadata||{},W=w.workflow||{},$e=W.stages||{},tt=$e.spec&&$e.spec.stale,nt=$e.impl&&$e.impl.stale,ht=W.quick_fix_review?.state==="stale",Xe=$e.plan||null,dt=W.route_source==="derived",An=W.route||N.route||"\u2014";return c`
      <div class="detail-section-label">워크플로우</div>
      <div class="detail-kv">
        <span class="detail-kv__k">route</span>
        <span
          class="detail-kv__v${dt?" detail-kv__v--derived":""}"
          title=${dt?"route \uBBF8\uD540 (metadata unset)":"route"}
          >${dt?"unset":An}</span
        >
      </div>
      ${W.route!=="quick_fix"||Object.hasOwn(N,"spec_review")?c`<div class="detail-kv">
            <span class="detail-kv__k">spec_review</span>
            <span class="detail-kv__v"
              >${N.spec_review||"\uC5C6\uC74C"}${tt?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${W.route==="full_plan"?c`<div class="detail-kv">
              <span class="detail-kv__k">plan_review</span>
              <span class="detail-kv__v">${Xe?.receipt||"\uC5C6\uC74C"}</span>
            </div>
            <div class="detail-kv">
              <span class="detail-kv__k">plan_approval</span>
              <span class="detail-kv__v"
                >${Xe?.approval_receipt||"\uC5C6\uC74C"}${Xe?.approval_state==="stale"?" \xB7 stale":Xe?.approval_state==="unknown"?" \xB7 unknown":""}</span
              >
            </div>`:""}
      ${W.route!=="quick_fix"||Object.hasOwn(N,"impl_review")?c`<div class="detail-kv">
            <span class="detail-kv__k">impl_review</span>
            <span class="detail-kv__v"
              >${N.impl_review||"\uC5C6\uC74C"}${nt?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${W.resolver?c`<div class="detail-kv">
            <span class="detail-kv__k">↳ 충돌 해소</span>
            <span
              class="detail-kv__v detail-kv__v--resolver detail-kv__v--wrap"
              title=${`resolver-self:${W.resolver.attempt} \xB7 ${W.resolver.prior_sha} \u2192 ${W.resolver.sha}`}
              >${`${W.resolver.prior_sha.slice(0,7)} \u2192 ${W.resolver.sha.slice(0,7)}`}</span
            >
          </div>`:""}
      ${W.route==="quick_fix"||Object.hasOwn(N,"quick_fix_review")?c`<div class="detail-kv">
            <span class="detail-kv__k">quick_fix_review</span>
            <span class="detail-kv__v"
              >${N.quick_fix_review||"\uC5C6\uC74C"}${ht?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${W.planned_execution?c`<div class="detail-kv">
              <span class="detail-kv__k">planned_execution</span>
              <span class="detail-kv__v">${W.planned_execution.kind}</span>
            </div>
            ${W.planned_execution.kind==="main"?c`<div class="detail-kv">
                  <span class="detail-kv__k">planned_execution_reason</span>
                  <span class="detail-kv__v detail-kv__v--wrap"
                    >${W.planned_execution.reason}</span
                  >
                </div>`:""}`:""}
      ${W.exec_receipt?c`<div class="detail-kv">
            <span class="detail-kv__k">exec_receipt</span>
            <span class="detail-kv__v detail-kv__v--wrap"
              >${Wn(W.exec_receipt)}</span
            >
          </div>`:""}
      ${W.impl_entry?c`<div class="detail-kv">
            <span class="detail-kv__k">impl_entry</span>
            <span class="detail-kv__v"
              >${`${W.impl_entry.actor}@${W.impl_entry.sha}`}</span
            >
          </div>`:""}
      ${N.pr_url?c`<div class="detail-kv">
            <span class="detail-kv__k">pr_url</span>
            <span class="detail-kv__v detail-kv__v--wrap">${N.pr_url}</span>
          </div>`:""}
    `}let ls={route:["quick_fix","spec_backed","full_plan"]};async function cs(w,N){let W=N.target.value;if(w==="route"&&p&&p.metadata&&p.metadata.route==="full_plan"&&W!=="full_plan"&&!window.confirm(`full_plan \u2192 ${W||"(\uBBF8\uC124\uC815)"} \uC804\uD658: \uC800\uC7A5\uB41C plan \uC2B9\uC778\uC740 \uD3EC\uAE30\uB418\uBA70, plan \uD30C\uC77C\xB7\uB9C8\uCEE4 \uC815\uB9AC\uB294 \uC138\uC158 \uACC4\uC57D\uC774 \uC218\uD589\uD569\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`)){it();return}await Ye("update-workflow-meta",{id:u,key:w,value:W},"\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uBA54\uD0C0 \uBCC0\uACBD \uC2E4\uD328"),it()}function fo(w){let N=w.metadata||{};return c` ${(($e,tt)=>{let nt=ls[$e],ht=typeof N[$e]=="string"?N[$e]:"";return c`<div class="detail-kv">
        <span class="detail-kv__k">${$e}</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label=${$e}
          data-edit=${`wfmeta-${$e}`}
          @change=${Xe=>cs($e,Xe)}
        >
          <option value="" ?selected=${!nt.includes(ht)}>
            ${tt}
          </option>
          ${nt.map(Xe=>c`<option value=${Xe} ?selected=${ht===Xe}>${Xe}</option>`)}
        </select>
      </div>`})("route","(unset)")} `}function us(w,N){return C?c`
        <div class="detail-edit">
          <input
            class="detail-edit__input"
            data-edit="title"
            aria-label="제목 편집"
            .value=${F}
            @input=${gt}
            @keydown=${W=>y(W,A,x,!1)}
          />
          <div class="detail-edit__actions">
            <button
              type="button"
              class="detail-edit__save"
              data-edit="title-save"
              @click=${A}
            >
              저장
            </button>
            <button
              type="button"
              class="detail-edit__cancel"
              data-edit="title-cancel"
              @click=${x}
            >
              취소
            </button>
          </div>
        </div>
      `:c`
      <div class="detail-title-row">
        <h2 class="detail-overlay__title">${w}</h2>
        ${rn(N).map(W=>c`<span class="detail-usage-total" title=${W.tooltip}
              >${W.label}</span
            >`)}
        <button
          type="button"
          class="detail-edit-btn"
          data-edit="title"
          aria-label="제목 편집"
          @click=${vt}
        >
          ✎
        </button>
      </div>
    `}function ds(w){let N=Zt(w.created_at),W=Zt(w.updated_at);return!N&&!W?c``:c`
      ${N?c`<div class="detail-kv">
            <span class="detail-kv__k">생성</span>
            <span class="detail-kv__v detail-kv__v--time">${N}</span>
          </div>`:""}
      ${W?c`<div class="detail-kv">
            <span class="detail-kv__k">수정</span>
            <span class="detail-kv__v detail-kv__v--time">${W}</span>
          </div>`:""}
    `}function _o(w,N){return c`
      <div class="detail-section-label">속성 (수정 가능)</div>
      <div class="detail-kv">
        <span class="detail-kv__k">status</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label="status"
          data-edit="status"
          @change=${v}
        >
          ${Zb.map(W=>c`<option value=${W} ?selected=${W===w}>${W}</option>`)}
        </select>
      </div>
      <div class="detail-kv">
        <span class="detail-kv__k">priority</span>
        <select
          class="detail-kv__v"
          aria-label="priority"
          data-edit="priority"
          @change=${O}
        >
          ${Jb.map(W=>c`<option value=${String(W)} ?selected=${W===N}>
                P${W}
              </option>`)}
        </select>
      </div>
    `}function ps(w){return c`
      <div class="detail-title-row">
        <div class="detail-overlay__section-label">설명</div>
        ${I?"":c`<button
              type="button"
              class="detail-edit-btn"
              data-edit="description"
              aria-label="설명 편집"
              @click=${Pe}
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
              .value=${V}
              @input=${je}
              @keydown=${N=>y(N,_t,Ze,!0)}
            ></textarea>
            <div class="detail-edit__actions">
              <button
                type="button"
                class="detail-edit__save"
                data-edit="description-save"
                @click=${_t}
              >
                저장
              </button>
              <button
                type="button"
                class="detail-edit__cancel"
                data-edit="description-cancel"
                @click=${Ze}
              >
                취소
              </button>
            </div>
          </div>`:c`<div class="detail-overlay__desc">
            ${w||"(\uC124\uBA85 \uC5C6\uC74C)"}
          </div>`}
    `}function Ne(w){let N=typeof w.notes=="string"?w.notes:"";return N.trim().length===0?c``:c`
      <div class="detail-overlay__section-label">노트</div>
      <div class="detail-overlay__notes">${N}</div>
    `}function Ct(w){let N=Array.isArray(w.labels)?w.labels:[];return c`
      <div class="detail-section-label">라벨</div>
      <div class="detail-labels">
        ${N.map(W=>c`<span class="detail-label-chip"
              >${W}<button
                type="button"
                class="detail-label-chip__x"
                data-label=${W}
                aria-label=${"\uB77C\uBCA8 \uC81C\uAC70: "+W}
                @click=${()=>Ve(W)}
              >
                ×
              </button></span
            >`)}
        <span class="detail-label-add">
          <input
            class="detail-label-add__input"
            aria-label="라벨 추가"
            placeholder="라벨 추가"
            .value=${Q}
            @input=${de}
            @keydown=${Me}
          />
          <button
            type="button"
            class="detail-label-add__btn"
            @click=${be}
          >
            추가
          </button>
        </span>
      </div>
    `}function Qt(){if(!u)return c``;let w=p||{},N=String(w.id||u),W=w.title||"(\uC81C\uBAA9 \uC5C6\uC74C)",$e=Fe(),tt=w.status||"open",nt=typeof w.priority=="number"?Math.max(0,Math.min(4,w.priority)):"",ht=w.description||"",Xe={...w,metadata:{...w.metadata||{},...f}};return c`
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
              ${N}
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
          ${us(W,$e)}
          ${np(Xe,{onChipToggle:dt=>De.toggle({bead_id:N,chip_key:dt}),isChipOpen:dt=>De.isOpen({bead_id:N,chip_key:dt})})}
          ${tp({metadata:Xe.metadata,workspace_values:St(),catalog:Wt(),execution_defaults:ut(),expanded:R,presets:Yt()?.presets||[],preset_id:g,preset_busy:m,skipped_orchestration_keys:k},{onToggle:dt=>{R=dt,it()},onEdit:(dt,An)=>{if(dt==="impl_runtime"||dt==="impl_model"||dt==="impl_effort"){ce(Se(dt,An??""));return}ce(Y(dt,An??""))},onPresetSelect:dt=>{g=dt,k=[],it()},onPresetApply:()=>{jt()}})}
          ${lp({md:Xe.metadata,catalog:X,workspace_defaults:se,handlers:{onExecChange:(dt,An)=>ce(Y(dt,An))}})}
          ${_o(tt,nt)} ${ds(w)}
          ${ps(ht)}
          ${Qd(D,re,{expanded:Te,draft:Z,sending:we,error:T})}
          ${Ne(w)} ${Ct(w)} ${Bt(w)}
          ${vn(w)} ${fo(w)}
          ${Yd(w,Et)}
          ${fp({expanded:Qe,loading:qe,error:J,data:U},{onToggle:oe})}
          ${pp(le(),Jt,{total:$e,expanded:Ke},Ie)}
          ${mp({events:Nt,shown:ct},{onMore:M})}
        </div>
      </div>
    `}function it(){ot(Qt(),e)}return{load(w){w!==u&&(f={},g="",k=[],R=!1,H(),ge(),b(),pt(),ae(),ee()),u=w,p=null,!fe&&t.subscribeCandidates&&(fe=t.subscribeCandidates(()=>{u&&it()})),h(),Ot(),j!==w&&ne(w)},clear(){u=null,p=null,f={},g="",m=!1,k=[],R=!1,H(),ge(),b(),pt(),ae(),ee(),E(),_e.close(),We.close(),ot(c``,e)},destroy(){en&&(en(),en=null),Ht&&(Ht(),Ht=null),nn&&(nn(),nn=null),E(),document.removeEventListener("keydown",me),De.detach(),pe||(_e.destroy(),Ce&&Ce.parentNode&&Ce.parentNode.removeChild(Ce)),We.destroy(),xe.parentNode&&xe.parentNode.removeChild(xe),u=null,p=null,ee(),g="",m=!1,k=[],ge(),b(),pt(),ae(),ot(c``,e)}}}function hp(e){let t=document.createElement("dialog");t.id="fatal-error-dialog",t.setAttribute("role","alertdialog"),t.setAttribute("aria-modal","true"),t.innerHTML=`
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
    </div>`,e.appendChild(t);let n=t.querySelector("#fatal-error-title"),r=t.querySelector("#fatal-error-message"),o=t.querySelector("#fatal-error-detail"),s=t.querySelector("#fatal-error-reload"),i=t.querySelector("#fatal-error-close"),l=()=>{if(typeof t.close=="function")try{t.close()}catch{}t.removeAttribute("open")},a=(u,p,f="")=>{n&&(n.textContent=u||"Unexpected Error"),r&&(r.textContent=p||"An unrecoverable error occurred.");let g=typeof f=="string"?f.trim():"";if(o&&(g.length>0?(o.textContent=g,o.removeAttribute("hidden")):(o.textContent="No additional diagnostics available.",o.setAttribute("hidden",""))),typeof t.showModal=="function")try{t.showModal(),t.setAttribute("open","")}catch{t.setAttribute("open","")}else t.setAttribute("open","")};return s&&s.addEventListener("click",()=>{window.location.reload()}),i&&i.addEventListener("click",()=>l()),t.addEventListener("cancel",u=>{u.preventDefault(),l()}),{open:a,close:l,getElement(){return t}}}var ey="(max-width: 640px)";function Li(e){if(typeof window.matchMedia!="function")return e(!1),()=>{};let t=window.matchMedia(ey),n=!!t.matches;e(n);let r=o=>{let i=!!(typeof o=="object"&&o!==null&&typeof o.matches=="boolean"?o.matches:t.matches);i!==n&&(n=i,e(i))};return typeof t.addEventListener=="function"?(t.addEventListener("change",r),()=>{t.removeEventListener("change",r)}):typeof t.addListener=="function"?(t.addListener(r),()=>{typeof t.removeListener=="function"&&t.removeListener(r)}):()=>{}}function ty(){return{lanes:{done:!0},areas:{}}}function rs(e){let t={};if(typeof e!="object"||e===null)return t;for(let[n,r]of Object.entries(e))typeof r=="boolean"&&(t[n]=r);return t}function ny(e){try{let t=window.localStorage.getItem(e);if(!t)return null;let n=JSON.parse(t);if(typeof n!="object"||n===null)return null;let r=n;return typeof r.lanes=="object"&&r.lanes!==null?{lanes:rs(r.lanes),areas:rs(r.areas)}:{lanes:rs(r),areas:{}}}catch{return null}}function bp(e,t){try{window.localStorage.setItem(e,JSON.stringify(t))}catch{}}function Pi(e,t=ty()){let n={lanes:rs(t.lanes),areas:rs(t.areas)},r=ny(e),o={lanes:{...n.lanes,...r?r.lanes:{}},areas:{...n.areas,...r?r.areas:{}}};return{isCollapsed(s){return o.lanes[s]===!0},isAreaCollapsed(s){return o.areas[s]===!0},toggle(s){let i=o.lanes[s]!==!0;return o={...o,lanes:{...o.lanes,[s]:i}},bp(e,o),i},toggleArea(s){let i=o.areas[s]!==!0;return o={...o,areas:{...o.areas,[s]:i}},bp(e,o),i}}}function yl(e){if(typeof e=="string"&&e.length>0)return e;if(e&&typeof e=="object"){let t=e;if(typeof t.message=="string"&&t.message.length>0)return t.message;if(typeof t.error=="string"&&t.error.length>0)return t.error;if(t.error&&typeof t.error=="object"&&typeof t.error.message=="string")return t.error.message}return"\uC694\uCCAD\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4"}function Di(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"&&t.length>0):[]}function Mi(e){let{transport:t,console_el:n,getLanes:r,getWorkspaces:o,getCrossLanes:s,reproject:i,onCorrection:l,showToast:a,requestRender:u,adoptQueue:p,onDragBegin:f,candidate_drop:g}=e,m=[],k=null,R=!1,B=null,X=null,se=null;function j(){B!==null&&clearTimeout(B),B=setTimeout(()=>{B=null,R=!1},0)}function q(){return s()??null}function C(){let L=new Map,ue=o();for(let re of Array.isArray(ue)?ue:[]){if(!re||typeof re!="object")continue;let pe=re.bead_blocked_by&&typeof re.bead_blocked_by=="object"?re.bead_blocked_by:{};for(let[Ce,_e]of Object.entries(pe))Array.isArray(_e)&&L.set(Ce,Di(_e));for(let Ce of[...Array.isArray(re.runnable)?re.runnable:[],...Array.isArray(re.session_active)?re.session_active:[]])Ce&&typeof Ce.bead_id=="string"&&Array.isArray(Ce.blocked_by)&&Ce.blocked_by.length>0&&L.set(Ce.bead_id,Di(Ce.blocked_by))}return L}function I(){let L=new Map,ue=new Map,re=o();for(let pe of Array.isArray(re)?re:[]){if(!pe||typeof pe!="object")continue;let Ce=pe.bead_blocked_by&&typeof pe.bead_blocked_by=="object"?pe.bead_blocked_by:{};for(let[_e,xe]of Object.entries(Ce))Array.isArray(xe)&&L.set(_e,Di(xe));for(let _e of Array.isArray(pe.runnable)?pe.runnable:[])_e&&typeof _e.bead_id=="string"&&Array.isArray(_e.blocked_by)&&ue.set(_e.bead_id,Di(_e.blocked_by))}for(let pe of m)for(let Ce of[L,ue]){let _e=Ce.get(pe.a);_e!==void 0&&Ce.set(pe.a,pe.type==="dep-remove"?_e.filter(xe=>xe!==pe.b):_e.includes(pe.b)?_e:[..._e,pe.b])}return{snapshot:L,runnable:ue}}function F(){let L=C();for(let ue of m){let re=(L.get(ue.a)||[]).slice();ue.type==="dep-remove"?L.set(ue.a,re.filter(pe=>pe!==ue.b)):re.includes(ue.b)||L.set(ue.a,[...re,ue.b])}return L}function V(L=r(),ue=q()){let re=new Map;for(let qe of Array.isArray(ue?.lanes)?ue.lanes:[]){let J=new Map;for(let U of Array.isArray(qe?.entries)?qe.entries:[])U&&typeof U.bead_id=="string"&&J.set(U.bead_id,U.dep_created_by_lane===!0);re.set(typeof qe?.id=="string"?qe.id:"",J)}let pe=new Map,Ce=new Map,_e=new Set,xe=new Set;for(let qe of L.chain_lanes){let J=re.get(qe.lane_id);pe.set(qe.lane_id,{status:qe.status,entries:qe.rows.map((U,Ae)=>({bead_id:U.id,root_dir:U.root_dir,...Ae===0?{}:{dep_created_by_lane:J?.get(U.id)===!0}}))});for(let U of qe.rows)Ce.set(U.id,qe.lane_id),U.fixed&&_e.add(U.id),U.unplaced||xe.add(U.id)}let We=new Map;for(let qe of L.parallel_rows)typeof qe.queue_index=="number"&&We.set(qe.id,qe.queue_index);for(let qe of L.queue_groups)for(let J of qe.sublanes.serial)for(let U of J.items)typeof U.queue_index=="number"&&We.set(U.id,U.queue_index);let Qe=I();return{blocked_by_map:F(),snapshot_blocked_by:Qe.snapshot,runnable_blocked_by:Qe.runnable,owner_of:new Map(Object.entries(L.owner_of)),cross_lanes:pe,owner_lane_of:Ce,fixed_members:_e,placed_members:xe,parallel_rows:L.parallel_rows.map(qe=>({bead_id:qe.id,root_dir:qe.root_dir,queue_index:qe.queue_index??0})),parallel_raw_length:new Map(Object.entries(L.parallel_raw_length)),queue_index_of:We}}function Q(L,ue){let re=r();for(let Ce of[...re.runnable,...re.queue,...re.running,...re.pr_wait,...re.done])if(!(Ce.non_occupying||Ce.id!==ue)){if(Ce.root_dir===L)return Ce.expected_revision;break}let pe=re.queue_groups.find(Ce=>Ce.root_dir===L);return pe?pe.revision:0}async function P(L,ue,re,pe){if(!t)return null;let _e=await t(L,{...ue,...re?{root_dir:re}:{},expected_revision:pe});if(_e&&_e.conflict){_e.queue&&p?.(re,_e.queue);let xe=_e.queue&&typeof _e.queue.revision=="number"?_e.queue.revision:pe;_e=await t(L,{...ue,...re?{root_dir:re}:{},expected_revision:xe})}return _e&&_e.queue&&p?.(re,_e.queue),_e}async function K(L,ue,re,pe,Ce){try{let _e=await P(L,ue,re,pe.get(re)??Q(re,Ce.bead_id));return!_e||typeof _e.applied!="boolean"?(a("\uD050 \uC694\uCCAD\uC774 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error"),null):(_e.queue&&typeof _e.queue.revision=="number"&&pe.set(re,_e.queue.revision),_e.conflict?(a("\uD050\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD574 \uC8FC\uC138\uC694","error"),null):_e.applied===!1?(a(_e.admission_reason?`\uD050 \uC801\uC7AC \uAC70\uBD80: ${_e.admission_reason}`:"\uD050 \uC694\uCCAD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4","error"),null):_e.queue&&typeof _e.queue.revision=="number"?_e.queue.revision:pe.get(re)??0)}catch(_e){return a(yl(_e),"error"),null}}async function H(L,ue,re=new Map){if(L.type==="worker-queue-disarm"){try{let pe=await P(L.type,L.payload,L.root_dir,re.get(L.root_dir)??Q(L.root_dir,ue));pe&&pe.queue&&typeof pe.queue.revision=="number"&&re.set(L.root_dir,pe.queue.revision)}catch{}return!0}if(L.type==="worker-queue-place"||L.type==="worker-queue-reorder"||L.type==="worker-queue-remove")return await K(L.type,L.payload,L.root_dir,re,{bead_id:ue})!==null;try{return(L.type==="dep-add"||L.type==="dep-remove")&&t&&await t(L.type,{a:L.a,b:L.b,...L.root_dir?{root_dir:L.root_dir}:{}}),!0}catch(pe){return a(yl(pe),"error"),!1}}function ee(L){(L.type==="dep-add"||L.type==="dep-remove")&&(m=[...m,{type:L.type,a:L.a,b:L.b}])}async function ke(L,ue){if(!t)return{ok:!1};try{let re=await t(L.type,{...L.payload,expected_revision:ue});return!re||typeof re.revision!="number"?(a("\uC5F0\uACB0 \uB808\uC778 \uC751\uB2F5\uC5D0 revision\uC774 \uC5C6\uC2B5\uB2C8\uB2E4","error"),{ok:!1}):{ok:!0,revision:re.revision}}catch(re){let pe=re,Ce=pe&&pe.code==="conflict"?pe.details?.cross_lanes:null;return Ce&&typeof Ce.revision=="number"&&Array.isArray(Ce.lanes)?{ok:!1,conflict:Ce}:(a(yl(re),"error"),{ok:!1})}}async function Re(L,ue,re){let pe=new Map,Ce=[],_e=L.ops.slice(0,L.lane_op_index),xe=L.ops.slice(L.lane_op_index);for(let Qe of _e){if(!await H(Qe,re,pe))return{done:!0};ee(Qe)}let We=ue;for(let Qe of L.lane_ops){if(We===null)return a("\uC5F0\uACB0 \uB808\uC778 \uC800\uC7A5\uC18C\uB97C \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error"),{done:!0};let qe=await ke(Qe,We);if(!qe.ok)return qe.conflict?{done:!1,conflict:qe.conflict}:{done:!0};We=qe.revision}for(let Qe of xe){if(!await H(Qe,re,pe))return{done:!0};ee(Qe),Qe.type==="dep-add"&&Ce.push(Qe)}for(let Qe of ld(Ce))We=await ne(Qe,We);return{done:!0}}async function ne(L,ue){if(ue===null||!t)return ue;let re=L.pairs,pe=ue;for(let Ce=0;Ce<2;Ce+=1){if(re.length===0)return pe;try{let _e=await t("monitor-lane-provenance",{lane_id:L.lane_id,pairs:re.map(xe=>({bead_id:xe.bead_id,after:xe.after,value:!0})),expected_revision:pe});return _e&&typeof _e.revision=="number"?_e.revision:pe}catch(_e){let xe=_e,We=xe&&xe.code==="conflict"?xe.details?.cross_lanes:null;if(!We||typeof We.revision!="number"||!Array.isArray(We.lanes))return pe;let Qe=We.lanes.find(qe=>qe&&qe.id===L.lane_id);re=cd(Array.isArray(Qe?.entries)?Qe.entries:[],re),pe=We.revision}}return pe}async function D(L,ue,re=[]){m=re,l("",0);let pe=r(),Ce=q();for(let _e=0;;_e+=1){let xe=L(V(pe,Ce));if("refused"in xe){a(xe.refused,"error");break}let We=await Re(xe,pe.cross_lanes_revision,ue);if(We.done){xe.correction&&l(xe.correction.lane_id,xe.correction.corrected);break}if(_e>=1){a("\uB808\uC778\uC774 \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4","error");break}let Qe=i(We.conflict);pe=Qe.lanes,Ce=Qe.raw_lanes}m=[],u()}async function ve(L,ue){await D(re=>_i(L,ue,re),L.bead_id)}function Ee(L,ue){let re=ue&&typeof ue.closest=="function"?ue.closest("[data-row-index]"):null;if(re&&L.contains(re)){let pe=Number(re.getAttribute("data-row-index"));return Number.isFinite(pe)?pe:0}return L.querySelectorAll("[data-row-index]").length}function T(L){let ue=typeof L?.closest=="function"?L.closest(".worker-pane--collapsed[data-lane]"):null;if(!ue)return null;let re=ue.getAttribute("data-lane");return re==="queue"?{zone:ue,target:{kind:"parallel",marker_index:r().parallel_rows.length}}:re==="candidate"&&g===!0?{zone:ue,target:{kind:"candidate"}}:null}function Z(L){let ue=L.target;if(!k)return null;let re=typeof ue?.closest=="function"?ue.closest("[data-drop]"):null;if(!re)return T(ue);let pe=re.getAttribute("data-drop");if(pe==="candidate")return{zone:re,target:{kind:"candidate"}};if(pe==="parallel")return{zone:re,target:{kind:"parallel",marker_index:Ee(re,ue)}};if(pe==="chain")return{zone:re,target:{kind:"chain",lane_id:re.getAttribute("data-lane-id")||"",marker_index:Ee(re,ue)}};if(pe==="repo-serial"){let Ce=re.getAttribute("data-root-dir")||"";if(Ce!==k.root_dir)return null;let _e=typeof ue?.closest=="function"?ue.closest("[data-queue-index]"):null,xe=_e&&re.contains(_e)?_e.getAttribute("data-queue-index"):re.getAttribute("data-lane-length"),We=Number(xe);return{zone:re,target:{kind:"repo-serial",root_dir:Ce,lane_id:re.getAttribute("data-lane-id")||"",index:Number.isFinite(We)?We:0}}}return null}function we(){for(let L of Array.from(n.querySelectorAll(".is-drop-over")))L.classList.remove("is-drop-over")}function he(L){X=L.target instanceof Element?L.target:null}function Te(L){let ue=L.target,re=typeof ue?.closest=="function"?ue.closest('[draggable="true"][data-bead-id]'):null,pe=re?re.closest("[data-drag-kind]"):null;if(!pe)return;if(re&&X&&re.contains(X)&&typeof X.closest=="function"&&X.closest("input, button, a")){L.preventDefault();return}let Ce=pe.getAttribute("data-bead-id")||"",_e=pe.getAttribute("data-drag-kind")||"",xe=pe.getAttribute("data-root-dir")||"";if(!Ce||!_e)return;let We=pe.getAttribute("data-queue-index")||"",Qe=Number(We),qe=pe.getAttribute("data-lane-id")||"";k={kind:_e,bead_id:Ce,root_dir:xe,...We!==""&&Number.isFinite(Qe)?{queue_index:Qe}:{},...qe?{lane_id:qe}:{}},R=!0,f?.(),n.classList.add("is-dragging");try{L.dataTransfer?.setData("text/plain",Ce),L.dataTransfer&&(L.dataTransfer.effectAllowed="move")}catch{}}function ge(L){let ue=Z(L);ue&&(L.preventDefault(),L.dataTransfer&&(L.dataTransfer.dropEffect="move"),ue.zone.classList.add("is-drop-over"))}function Oe(L){let ue=L.target;typeof ue?.closest=="function"&&(ue.closest("[data-drop]")?.classList.remove("is-drop-over"),ue.closest(".worker-pane--collapsed")?.classList.remove("is-drop-over"))}function Ge(){k=null,we(),n.classList.remove("is-dragging"),j()}function et(L){let ue=Z(L),re=k;k=null,we(),n.classList.remove("is-dragging"),!(!ue||!re)&&(L.preventDefault(),ve(re,ue.target))}return{attach(L){se||(se=L,L.addEventListener("pointerdown",he),L.addEventListener("dragstart",Te),L.addEventListener("dragover",ge),L.addEventListener("dragleave",Oe),L.addEventListener("drop",et),L.addEventListener("dragend",Ge))},detach(){B!==null&&(clearTimeout(B),B=null);let L=se;se=null,L&&(L.removeEventListener("pointerdown",he),L.removeEventListener("dragstart",Te),L.removeEventListener("dragover",ge),L.removeEventListener("dragleave",Oe),L.removeEventListener("drop",et),L.removeEventListener("dragend",Ge))},isDragging(){return k!==null},consumeClickSuppression(){let L=R;return R=!1,L},applyDrop:ve,runPlanned:D,dropModel:V,sendOp:H,sendQueueCas:K,rememberDep:ee}}var vl=Object.freeze({repo_ops_worktree_unowned:"\uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC\uAC00 \uC544\uC9C1 Worker \uC18C\uC720\uAC00 \uC544\uB2C8\uC5B4\uC11C \uC2A4\uD06C\uB9BD\uD2B8 \uC2E4\uD589 \uC804\uC5D0 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4.",verify_cmd_failed:"\uBA38\uC9C0 \uD6C4 \uAC80\uC99D \uBA85\uB839\uC774 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",gh_observation_failed:"GitHub\uC5D0\uC11C PR \uC0C1\uD0DC\uB97C \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",verify_script_failure:"\uAC80\uC99D \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",deploy_script_failure:"\uBC30\uD3EC \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",interrupted_without_terminal_exit:"\uC791\uC5C5\uC774 \uC885\uB8CC \uAE30\uB85D \uC5C6\uC774 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4.",manual_target_missing:"\uC218\uB3D9 \uBC30\uD3EC \uAE30\uB85D\uC5D0 \uD540\uB41C \uB300\uC0C1 SHA\uAC00 \uC5C6\uC5B4 \uC2E4\uD589\uD558\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4.",bootstrap_not_approved:"\uCCAB [deploy] \uC120\uC5B8\uC740 \uC0AC\uB78C \uC2B9\uC778 \uC5C6\uC774 \uC2E4\uD589\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4. Worker \uC124\uC815\uC758 [\uBC30\uD3EC \uC2E4\uD589]\uC73C\uB85C \uC6D0\uACA9 base tip\uC744 \uD55C \uBC88 \uBC30\uD3EC\uD55C \uB4A4 [\uC815\uC0B0 \uC7AC\uAC1C]\uB97C \uB204\uB974\uC138\uC694 \u2014 \uADF8 \uB4A4 \uBA38\uC9C0\uBD80\uD130\uB294 \uC790\uB3D9 \uBC30\uD3EC\uB429\uB2C8\uB2E4.",base_unresolved:"PR\uC774 \uC5B4\uB290 base \uBE0C\uB79C\uCE58\uB85C \uBA38\uC9C0\uB418\uB294\uC9C0 \uD655\uC815\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_ref_unobserved:"PR\uC758 base \uBE0C\uB79C\uCE58\uB97C \uC544\uC9C1 \uAD00\uCE21\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",merge_sha_unobserved:"\uBA38\uC9C0 \uCEE4\uBC0B SHA\uB97C \uC544\uC9C1 \uAD00\uCE21\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_fetch_failed:"\uC6D0\uACA9 base \uBE0C\uB79C\uCE58\uB97C fetch\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_rev_unavailable:"fetch\uD55C \uC6D0\uACA9 base \uBE0C\uB79C\uCE58\uC758 \uCEE4\uBC0B\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_ff_diverged:"\uB85C\uCEEC base \uBE0C\uB79C\uCE58\uAC00 \uC6D0\uACA9\uACFC \uAC08\uB77C\uC838 fast-forward\uB85C \uC815\uB82C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",deployment_target_not_covering_merge:"\uBC30\uD3EC \uB300\uC0C1 base\uAC00 \uC774 \uBA38\uC9C0 \uCEE4\uBC0B\uC744 \uD3EC\uD568\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.",deployment_candidate_ancestry_check_failed:"\uBC30\uD3EC \uB300\uC0C1 base\uAC00 \uC774 \uBA38\uC9C0 \uCEE4\uBC0B\uC744 \uD3EC\uD568\uD558\uB294\uC9C0 \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",verify_red:"\uBA38\uC9C0 \uD6C4 \uAC80\uC99D\uC774 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",cleanup_failed:"\uBA38\uC9C0 \uD6C4 \uC815\uB9AC\uAC00 \uB05D\uB098\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",retry_exhausted:"\uC790\uB3D9 \uC7AC\uC2DC\uB3C4\uB97C \uBAA8\uB450 \uC4F0\uACE0\uB3C4 \uAC19\uC740 \uC2E4\uD328\uAC00 \uC774\uC5B4\uC84C\uC2B5\uB2C8\uB2E4.",conflict_unresolved:"\uCDA9\uB3CC \uD574\uC18C\uAC00 \uB05D\uB098\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",internal_record_failed:"Worker \uB0B4\uBD80 \uAE30\uB85D\uC774 \uC2E4\uD328\uD574 \uC9C4\uD589\uC744 \uBA48\uCDC4\uC2B5\uB2C8\uB2E4.",foreign_landing_unpinned:"\uB2E4\uB978 \uC800\uC7A5\uC18C \uCC29\uC9C0\uC778\uB370 foreign_repo\xB7foreign_path\xB7foreign_base \uD540\uC774 \uC5C6\uAC70\uB098 \uD615\uC2DD\uC774 \uD2C0\uB9BD\uB2C8\uB2E4.",foreign_checkout_unavailable:"\uD540\uB41C \uB300\uC0C1 \uC800\uC7A5\uC18C \uCCB4\uD06C\uC544\uC6C3\uC774 \uC5C6\uAC70\uB098 foreign_repo\uC640 \uAC19\uC740 URL\uC758 remote\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4.",foreign_deploy_unsupported:"\uB300\uC0C1 \uC800\uC7A5\uC18C\uAC00 [deploy]\uB97C \uC120\uC5B8\uD574 Worker\uAC00 \uBC30\uD3EC \uC99D\uAC70\uB97C \uB9CC\uB4E4 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4. \uC138\uC158\uC774 \uBC30\uD3EC\uC640 \uB9C8\uAC10\uC744 \uC18C\uC720\uD569\uB2C8\uB2E4.",repair_lane_retired:"\uC790\uB3D9 \uC218\uB9AC \uB808\uC778\uC774 \uC740\uD1F4\uD574 \uC0AC\uB78C \uCC98\uB9AC\uB85C \uB118\uC5B4\uC654\uC2B5\uB2C8\uB2E4."});var yp={verify_failed:"\uAC80\uC99D \uC2E4\uD328",verify_cmd_failed:"\uAC80\uC99D \uC2E4\uD328",verify_script_failure:"\uAC80\uC99D \uC2E4\uD328",deploy_failed:"\uBC30\uD3EC \uC2E4\uD328",deploy_script_failure:"\uBC30\uD3EC \uC2E4\uD328",job_script_failure:"\uC7A1 \uC2E4\uD328",interrupted_without_terminal_exit:"\uC911\uB2E8\uB428",quickfix_landing_failed:"\uCC29\uC9C0 \uC2E4\uD328",runner_exit:"\uC138\uC158 \uC2E4\uD328",session_parked:"\uC138\uC158 \uB300\uAE30",session_ended_unresolved:"\uC138\uC158 \uC885\uB8CC",prerequisite_unmet:"\uC120\uD589 \uB300\uAE30",delivery_unproven:"\uCC29\uC9C0 \uC99D\uAC70 \uBD80\uC871"};function qi(e){return typeof e!="string"||e.length===0?[]:e.split(":").filter(t=>t.length>0)}function Ni(e){for(let t of qi(e)){if(Object.hasOwn(yp,t))return yp[t];if(t.startsWith("session_"))return"\uC138\uC158 \uC2E4\uD328"}return null}function wp(e){return qi(e).length===0?null:Ni(e)||"\uC2E4\uD328"}function Pr(e){let t=null;for(let n of qi(e))Object.hasOwn(vl,n)&&(t=vl[n]);return t}function dr(e){let t=Ni(e),n=Pr(e);return t&&n?`${t} \u2014 ${n}`:t||n?t||n:typeof e=="string"?e:""}function kp(e,t){let n=Ni(e)??Ni(t),r=Pr(t)??Pr(e);return n&&r?`${n} \u2014 ${r}`:n||r?n||r:typeof t=="string"?t:""}var ry=new Set(["repo_operation_timeout_unresolved"]);function oy(e){for(let t of qi(e))if(ry.has(t)||t.startsWith("repo_ops_"))return!0;return!1}function sy(e,t){return t.code==="interrupted"||t.interrupted===!0||e.failure_kind==="interrupted_without_terminal_exit"||t.code==="interrupted_without_terminal_exit"}function $p(e,t){if(!e||typeof e!="object")return"";let n=e.failure;if(!n||typeof n!="object"||oy(n.code))return"";if(n.code==="timeout"){let o=Number(t);return Number.isFinite(o)&&o>0?`\uD0C0\uC784\uC544\uC6C3 ${Math.round(o/1e3)}\uCD08 \uCD08\uACFC`:"\uD0C0\uC784\uC544\uC6C3 \uCD08\uACFC"}if(sy(e,n))return"\uC885\uB8CC \uAE30\uB85D \uC5C6\uC74C \u2014 \uC911\uB2E8\uB428";let r=typeof e.elapsed_ms=="number"&&Number.isFinite(e.elapsed_ms)&&e.elapsed_ms>=0?` \xB7 ${Cr(e.elapsed_ms)}`:"";return typeof e.signal=="string"&&e.signal.length>0?`signal ${e.signal}${r}`:Number.isInteger(e.exit_code)?`exit ${e.exit_code}${r}`:""}var vp={schema_unsupported:"\uD540\uB41C \uC815\uCC45 \uC2A4\uD0A4\uB9C8\uB97C \uC9C0\uC6D0\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4."};function xp(e){if(!e||typeof e!="object")return"";let t=e.retry;if(!t||typeof t!="object")return"";if(typeof t.blocked_reason=="string"&&t.blocked_reason)return`\uC790\uB3D9 \uC7AC\uC2DC\uB3C4 \uBABB \uD568 \u2014 ${Object.hasOwn(vp,t.blocked_reason)?vp[t.blocked_reason]:t.blocked_reason}`;if(t.status==="absorbed"){let n=t.absorbed&&typeof t.absorbed=="object"?t.absorbed:null,r=dr(n?.first_failure?.code);return r?`\uC790\uB3D9 \uC7AC\uC2DC\uB3C4\uB85C \uD574\uC18C\uB428 \u2014 \uCCAB \uC2E4\uD328: ${r}`:"\uC790\uB3D9 \uC7AC\uC2DC\uB3C4\uB85C \uD574\uC18C\uB428"}if(e.state!=="failed")return"";if(t.status==="not_applicable")return"\uC7AC\uC2DC\uB3C4 \uB300\uC0C1 \uC544\uB2D8 \u2014 \uC2A4\uD06C\uB9BD\uD2B8 \uC2E4\uD589 \uC804 \uC2E4\uD328";if(t.status==="consumed"){let n=typeof t.first_fingerprint=="string"&&t.first_fingerprint?t.first_fingerprint:null;if(n===null)return"";if(n===e.failure?.fingerprint)return"\uC790\uB3D9 \uC7AC\uC2DC\uB3C4 1\uD68C \u2014 \uAC19\uC740 \uC2E4\uD328";let r=dr(t.first_failure?.code);return r?`\uC790\uB3D9 \uC7AC\uC2DC\uB3C4 1\uD68C \u2014 \uB2E4\uB978 \uC2E4\uD328: ${r}`:"\uC790\uB3D9 \uC7AC\uC2DC\uB3C4 1\uD68C \u2014 \uB2E4\uB978 \uC2E4\uD328"}return""}function iy(e){if(!Number.isFinite(e)||e<0)return"0s";let t=Math.floor(e/1e3),n=Math.floor(t/60),r=t%60;return n>0?`${n}m ${String(r).padStart(2,"0")}s`:`${r}s`}var Ap=200;function ay(e){return typeof e!="string"||e.length===0?"":e.length>Ap?`${e.slice(0,Ap)}\u2026`:e}function ly(e){let t=e&&e.attempts>0&&e.max>0?` ${e.attempts}/${e.max}`:"",n=e&&typeof e.next_at=="number"?` \xB7 ${new Date(e.next_at).toLocaleTimeString("ko-KR",{hour:"2-digit",minute:"2-digit"})}`:"";return`\u21BB \uC7AC\uC2DC\uB3C4 \uB300\uAE30${t}${n}`}function Ep(e){if(!e)return"";let t=Array.isArray(e.timeline)?e.timeline:[],n=typeof e.log_path=="string"?e.log_path:"",r=e.log_expired===!0,o=e.log_unreadable===!0;return t.length===0&&n.length===0&&!r&&!o?"":c`${t.length>0?c`<ol class="rtile__history" data-seam="tile-timeline">
        ${t.map(s=>c`<li class="rtile__history-row">
              ${Sp(s.at)?c`<span class="rtile__history-at"
                    >${Sp(s.at)}</span
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
            ${oo(n)}
          </p>`:""}`}function Sp(e){return typeof e!="number"||!Number.isFinite(e)?"":new Date(e).toLocaleTimeString("ko-KR",{hour:"2-digit",minute:"2-digit"})}function cy(e,t){if(!e||e.open!==!0)return"";let n=Pr(e.cause)||dr(e.cause),r=e.retry&&e.retry.attempts>0?`\uC790\uB3D9 \uC7AC\uC2DC\uB3C4 ${e.retry.attempts}\uD68C \u2014 \uAC19\uC740 \uC624\uB958`:"",o=e.cause_detail,s=e.quickfix_lane&&e.quickfix_landing?e.quickfix_landing:null,i=s?[s.cursor||null,typeof s.head_sha=="string"?s.head_sha.slice(0,7):null,s.reason||null].filter(Boolean).join(" \xB7 "):"",l=typeof e.finished_at=="number"?`${new Date(e.finished_at).toLocaleString("ko-KR")} \xB7 ${sn(e.finished_at,t)}`:"",a=[e.runner,e.model,e.observed_effort??e.effort,e.speed].filter(g=>typeof g=="string"&&g.length>0).join(" \xB7 "),u=e.usage?.total_cost_usd,p=typeof u=="number"&&Number.isFinite(u)?`$${u.toFixed(2)}`:"",f=Ep(e);return c`<div
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
      ${p?c`<div>
            <dt>비용</dt>
            <dd>${p}</dd>
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
  </div>`}function uy(e){return!e||!e.repo&&!e.serial_lane_id?"":c`${e.repo?c`<span
        class="worker-card__repo rtile__repo"
        title=${e.root_dir||""}
        >${e.repo}</span
      >`:""}${e.serial_lane_id?c`<span class="rtile__lane">${e.serial_lane_id}</span>`:""}`}var dy=new Set(["codex-runner"]);function py(e,t,n,r=null){if(!e)return"";let o=e.last_activity||null,s=o&&typeof o.text=="string"?o.text:"",i=o&&typeof o.at=="number"?o.at:null,l=(r||!Array.isArray(e.legs)?[]:e.legs).filter(m=>m&&!(typeof m.agent_type=="string"&&dy.has(m.agent_type))),a=l.filter(m=>m&&m.state==="live"),u=l.filter(m=>m&&m.state!=="live"),p=r&&typeof r.last_event_at=="number"?sn(r.last_event_at,t):"",f=r?sn(r.updated_at,t):"",g=p?`\uCD5C\uADFC \uD65C\uB3D9 ${p}`:f?`\uAC31\uC2E0 ${f}`:"";return c`${s?c`<div class="rtile__activity${n?" is-paused":""}">
        <span class="rtile__activity-dot" aria-hidden="true"></span>
        <span class="rtile__activity-text">${s}</span>
        ${i!==null?c`<span class="rtile__activity-age"
              >${sn(i,t)}</span
            >`:""}
      </div>`:g?c`<div class="rtile__activity rtile__activity--session">
          <span class="rtile__activity-dot" aria-hidden="true"></span>
          <span class="rtile__activity-text">${g}</span>
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
      </div>`:""}`}var fy={remote:"\uB2E4\uB978 \uBA38\uC2E0 \uC138\uC158 \u2014 \uC774 \uC11C\uBC84\uC5D0 transcript \uC5C6\uC74C",missing:"transcript \uD30C\uC77C \uC5C6\uC74C"};function _y(e){if(!e)return"";let t=fy[e.locality]||"";return c`<button
    type="button"
    class="rtile__session"
    ?disabled=${t.length>0}
    title=${t||"\uB77C\uC774\uBE0C \uC138\uC158 \uC5F4\uAE30"}
    aria-label="라이브 세션 열기"
  >
    ▤ 세션
  </button>`}function my(e,t,n,r=""){if(e==="retry_wait")return n?c`<div class="rtile__foot">${n}</div>`:"";let o=ay(t?.summary);if(e==="waiting")return c`${o?c`<p class="rtile__held-summary">${o}</p>`:""}${r}
      <div class="rtile__foot">${n}</div>`;let s=Ep(t);return c`${o?c`<p class="rtile__held-summary">${o}</p>`:""}${s}
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
    </div>`}function wl(e,t,n=null,r={}){let o=e.kind==="session",s=o&&Array.isArray(e.session_refs)&&e.session_refs.find(et=>et&&et.current===!0)||null,i=e.failed===!0,l=i&&e.failure||null,a=e.parked===!0&&!i,u=e.retry_wait===!0&&!i&&!a,p=e.waiting===!0&&!i&&!a&&!u,f=a&&e.failure||null,g=p&&e.wait||null,m=a||u||p,k=!!e.paused,R=i||m?e.status_label||(a?"\uC138\uC158 \uB300\uAE30":u?"\uC7AC\uC2DC\uB3C4 \uB300\uAE30":p?"\uC120\uD589 \uB300\uAE30":e.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328"):k?"\uC77C\uC2DC\uC815\uC9C0":typeof e.started_at=="number"?iy(t-e.started_at):"\u2014",B=e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker)?e.exec_chips:null,X=$o(e),se=rn(e.usage),j=Hn(e.usage),q=e.conflict_resolution?k?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":"\uCDA9\uB3CC \uD574\uC18C":null,C=e.base_exception||null,I=e.landing,F=e.attempt_id&&e.attempt_id===n,V=r.monitor||null,Q=uy(V),P=Zs(V?.cross_lane_chip),K=V?Qs(V.dependency_chips):"",H=py(V,t,k,o?{updated_at:e.updated_at??null,last_event_at:s&&s.locality==="local"?s.last_event_at:null}:null),ee=o&&e.workflow?.chips?.exec_receipt||null,ke=Js(e.workflow),Re=ei(e.rec,e.chip_popover?.chip_key==="rec"),ne=e.chip_popover?Zr(e.chip_popover.content):"",D=ee?c`<span
        class="ctl-chip ctl-chip--exec-receipt"
        title=${`exec_receipt ${Wn(ee)}`}
        >${`${ee.kind}:${Rs(ee)}`}</span
      >`:"",ve=s?c`<span
        class="ctl-chip ctl-chip--sref"
        title=${`${s.provider}:${s.session_id}@${s.host}${(e.session_refs||[]).length>=2?` \xB7 \uC774\uB825 ${(e.session_refs||[]).length}`:""}`}
        >${xo(s)}</span
      >`:"",Ee=Q||P||ke||ve||D||Re?c`<div class="rtile__meta">
          ${Q}${P}${ke}${ve}${D}${Re}${ne}
        </div>`:"",T=l?c`<button
          type="button"
          class="rtile__failure-badge"
          data-attempt-id=${l.attempt_id}
          aria-expanded=${l.open===!0?"true":"false"}
          aria-label="실패 상세"
        >
          ⛔ ${wp(l.cause)||"\uC2E4\uD328"}
        </button>
        ${l.halted_auto_advance?c`<span class="rtile__auto-halted">자동 진행 꺼짐</span>`:""}`:"",Z=a?c`<span
        class="rtile__held-badge"
        title="세션이 사용자 결정을 기다리며 정상 종료했습니다 — 큐는 계속 갑니다"
        >⏸ 세션 대기</span
      >`:u?c`<span
          class="rtile__held-badge"
          title="환경성 실패의 자동 재시도를 기다립니다 — 사람이 할 일은 없습니다"
          >${ly(e.retry)}</span
        >`:p?c`<span
            class="rtile__held-badge"
            title="세션이 선행 미충족으로 착수를 거부했습니다 — 선행이 닫히면 저절로 다시 돕니다"
            >⛓ 선행 대기</span
          >`:"",we=c`${q?c`<span class="worker-mini__badge">${q}</span>`:""}${C?c`<span
        class="worker-mini__badge"
        title="이 세션의 target base가 워크스페이스 선언 base와 다릅니다"
        >${C}</span
      >`:""}${T}${Z}`,he=o?"":so(e),Te=Us(l?.quickfix_landing),ge=Te==="settlement"?"\uC815\uC0B0 \uC7AC\uAC1C":"\uC774\uC5B4\uD558\uAE30",Oe=Te==="settlement"?"\uCC29\uC9C0 \uC815\uC0B0\uC744 \uB2E4\uC2DC \uC2E4\uD589":"\uAC19\uC740 \uC138\uC158\uC73C\uB85C \uC774\uC5B4\uC11C \uC9C4\uD589",Ge=e.discard?.action&&!(i&&l?.landed===!0)?c`<button
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
    class="rtile${F?" rtile--sel":""}${k?" rtile--paused":""}${i?" rtile--failed rtile--compact":""}${m?" rtile--held rtile--compact":""}${a?" rtile--parked":""}${u?" rtile--retry-wait":""}${p?" rtile--waiting":""}${o?" rtile--session":""}"
    data-bead-id=${e.bead_id}
    data-attempt-id=${e.attempt_id||""}
  >
    <div class="rtile__hd">
      <span
        class="rtile__dot${o?" rtile__dot--session":""}"
        aria-hidden="true"
      ></span>
      <span class="rtile__id" title="클릭하면 ID 복사">${e.bead_id}</span>
      ${ti(e.priority)}${X?c`<span class="rtile__resumed" title=${X}>↻</span>`:""}${we}
      <div class="rtile__hd-actions">
        ${o?c`${typeof e.started_at=="number"?c`<span class="rtile__elapsed">${R}</span>`:""}${_y(s)}<span
                class="rtile__session-badge"
                title="Worker가 아닌 세션이 in_progress로 잡은 이슈"
                >세션</span
              >`:c`<span class="rtile__elapsed">${R}</span>`}
        ${o||m?"":i?c`<button
                  type="button"
                  class="rtile__resume"
                  data-resume-kind=${Te}
                  ?disabled=${l?.resume_eligible===!1}
                  title=${l?.resume_eligible===!1?l.resume_reason||`${ge} \uBD88\uAC00`:Oe}
                  aria-label=${ge}
                >
                  ↻ ${ge}
                </button>
                ${Ge}`:c`<button
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
                ${Ge}`}
      </div>
    </div>
    <div class="rtile__title">${e.title}</div>
    ${m?my(a?"parked":u?"retry_wait":"waiting",a?f:g,Ge,p?K:""):i?"":c`${H}${e.rollup?Ts(e.rollup,{parent_id:e.bead_id,expanded:e.rollup_expanded===!0,childChips:sa}):""}
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
            ${o?Ee:Q||P||ke||B||Re||se.length>0||j?c`<div class="rtile__meta">
                    ${Q}${P}${ke}${Xs(e.exec_chips)}${Re}
                    ${se.length>0?se.map(et=>c`<span
                              class="worker-usage"
                              title=${et.tooltip}
                              >${et.label}</span
                            >`):j?c`<span
                            class="worker-usage"
                            title=${Ao(e.usage)}
                            >${j}</span
                          >`:""}${ne}
                  </div>`:""}
            ${Gs(e)} ${he}
            <!-- 살아있음만 말하는 비의미적 액센트 (UI-58y2 데스크톱 §실행 타일).
         quick_fix landing의 실제 진행은 위의 별도 진행 줄이 소유한다.
         일시정지된 타일은 살아있지 않으므로 액센트도 없다. -->
            ${i||k?"":c`<div class="rtile__accent" aria-hidden="true"></div>`}`}
    ${cy(l,t)}
  </div>`}function gy(e){let t=e.last_activity&&typeof e.last_activity=="object"?e.last_activity:null,n=Array.isArray(e.legs)?e.legs:[],r=e.dependency_chips||null;return!t&&n.length===0&&!r&&e.kind!=="session"?null:{...t?{last_activity:t}:{},...n.length>0?{legs:n}:{},...r?{dependency_chips:r}:{}}}function Tp(e,t=Date.now(),n=null){let r=Array.isArray(e)?e:[];return c`<div class="worker-rungrid" id="worker-rungrid">
    ${r.length===0?c`<div class="worker-rungrid__empty">실행 세션 없음</div>`:r.map(o=>wl(o,t,n,{monitor:gy(o)}))}
  </div>`}var tn="",hy=["impl_runtime","impl_model","impl_effort"],by=["claude_account","codex_account"],yy=5,ji=1;function fn(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function Fi(e,t){let n=t.transport,r=typeof t.root_dir=="string"&&t.root_dir.length>0?t.root_dir:null,o=t.notify||($=>ye($,"error",4e3)),s={},i={},l={},a={},u=[],p=!1,f={state:"absent",values:{},warnings:[]},g={},m={},k=Promise.resolve(),R={claude:null,codex:null},B=!1,X=null,se={},j="",q="",C=!1,I=!1,F=!1,V=null,Q=!1;function P(){let $=t.queue?t.queue():null;return fn($)?$:null}function K(){let $=P();return $?$.runner_catalog:null}function H(){let $=P();return $&&fn($.execution_defaults)?$.execution_defaults:null}function ee(){let $=t.implPresetStore?.get();return fn($)&&Array.isArray($.presets)?$:null}function ke(){return r===null?{}:{root_dir:r}}async function Re($,M){return Q||!n?null:await n($,M)}function ne($){$&&fn($.queue)&&t.onQueueAdopt?.($.queue)}async function D($,M){let oe=P();if(!oe||Q)return null;let te=await Re($,{...M,...ke(),expected_revision:oe.revision});if(ne(te),r!==null&&te&&te.conflict){let le=te.queue&&typeof te.queue.revision=="number"?te.queue.revision:P()?.revision??oe.revision;te=await Re($,{...M,...ke(),expected_revision:le}),ne(te)}return te}async function ve(){p=!0,ie();try{let $=await Re("get-session-defaults",{...ke()});s=fn($?.values)?{...$.values}:{},i={...s},l={},a={},u=Array.isArray($?.warnings)?$.warnings:[]}catch($){u=["kv_read_failed"],o(`\uC138\uC158 \uAE30\uBCF8\uAC12\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4: ${$ instanceof Error?$.message:String($)}`)}finally{p=!1,ie()}}async function Ee(){let $=iu(s,i);if(Object.keys($).length!==0){try{let M=await Re("set-session-defaults",{values:$,...ke()});s=fn(M?.values)?{...M.values}:{},i={...s},u=Array.isArray(M?.warnings)?M.warnings:[]}catch(M){o(`\uC138\uC158 \uAE30\uBCF8\uAC12 \uC800\uC7A5 \uC2E4\uD328: ${M instanceof Error?M.message:String(M)}`)}ie()}}function T($,M){if(!fn($))return;let oe=$.state;f={state:oe==="usable"||oe==="unusable"||oe==="absent"?oe:"absent",values:fn($.values)?{...$.values}:{},warnings:Array.isArray($.warnings)?$.warnings:[]},m={...f.values},M&&(g={...m})}async function Z(){try{T(await Re("get-workspace-accounts",{...ke()}),!0)}catch($){f={state:"unusable",values:{},warnings:["kv_read_failed"]},m={},g={},o(`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4: ${$ instanceof Error?$.message:String($)}`)}ie()}async function we($){try{let M=await fetch($);if(!M.ok)return null;let oe=await M.json();if(!fn(oe)||!Array.isArray(oe.accounts))return null;let te=oe.accounts.filter(le=>fn(le)&&typeof le.key=="string"&&le.key.length>0&&typeof le.email=="string"&&le.email.length>0);return{accounts:te,active:te.find(le=>le.active===!0)||null}}catch{return null}}async function he(){B=!0;let[$,M]=await Promise.all([we("/api/claude-usage"),we("/api/codex-usage")]);Q||(R={claude:$,codex:M},ie())}function Te(){let $={};for(let M of by){let oe=Object.hasOwn(g,M)?g[M]:null,te=Object.hasOwn(m,M)?m[M]:null;oe!==te&&($[M]=oe)}return $}async function ge(){let $=Te();if(Object.keys($).length!==0){try{T(await Re("set-workspace-accounts",{values:$,...ke()}),!1)}catch(M){o(`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12 \uC800\uC7A5 \uC2E4\uD328: ${M instanceof Error?M.message:String(M)}`)}ie()}}function Oe($,M){M===tn?delete g[$]:g[$]=M,ie(),k=k.then(()=>ge())}function Ge($,M){if(hy.includes($)){pe($,M);return}M===tn?delete i[$]:i[$]=M,ie(),Ee()}function et($,M){l[$]=M,delete a[$]}function L($,M,oe){if(l[$]=M,M.length>0&&!oe(M)){a[$]=!0,ie();return}delete l[$],delete a[$],M.length===0?delete i[$]:i[$]=M,ie(),Ee()}function ue(){let $=Lt().orchestration_model,M=gn({global:{orchestration_model:$??void 0},execution_defaults:H(),runner_catalog:K()}).orchestration_model.value;return M?En(K(),M):null}function re($,M){typeof M=="string"&&M.length>0?i[$]=M:delete i[$]}function pe($,M){let oe=M===tn?void 0:M,te=ou({impl_runtime:$==="impl_runtime"?oe:i.impl_runtime,impl_model:$==="impl_model"?oe:i.impl_model,impl_effort:$==="impl_effort"?oe:i.impl_effort},K(),ue());re("impl_runtime",te.impl_runtime),re("impl_model",te.impl_model),re("impl_effort",te.impl_effort),ie(),Ee()}async function Ce(){let $=P();if(!$)return;let M={orchestration_model:$.orchestration_model??null,orchestration_effort:$.orchestration_effort??null,orchestration_speed:$.orchestration_speed??null},oe=au(M,{...M,...se});if(Object.keys(oe).length!==0){try{let te=await D("worker-queue-set-orchestration-defaults",{values:oe});if(te&&te.applied===!1){o("Worker \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC");return}se={}}catch(te){o(`Worker \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${te instanceof Error?te.message:String(te)}`)}ie()}}function _e($,M){se[$]=M===tn?null:M,ie(),Ce()}function xe($){if(X=$,!$){ie();return}let M=K(),oe=Lt(),te=oe.orchestration_model;te&&!To(M,$).includes(te)&&(se.orchestration_model=null,te=null);let le=oe.orchestration_effort;le&&!ma(M,$,te||bn).includes(le)&&(se.orchestration_effort=null),ie(),Ce()}async function We($){if(!(!P()||$<ji)){try{await D("worker-queue-set-slots",{slots:$})}catch(M){o(`slots \uC800\uC7A5 \uC2E4\uD328: ${M instanceof Error?M.message:String(M)}`)}ie()}}async function Qe($){if(!(!P()||$<ji||$>yy)){try{await D("worker-queue-set-serial-lane-count",{count:$})}catch(M){o(`\uC9C1\uB82C \uB808\uC778 \uC800\uC7A5 \uC2E4\uD328: ${M instanceof Error?M.message:String(M)}`)}ie()}}async function qe($,M){let oe=$==="auto_advance"?"worker-automation-toggle":"worker-merge-auto-toggle";try{await D(oe,{on:M})}catch(te){o(`\uC790\uB3D9\uD654 \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${te instanceof Error?te.message:String(te)}`)}ie()}function J(){let $={},M=Lt();for(let oe of Jr){let te=Yn.includes(oe)?M[oe]:i[oe];typeof te=="string"&&te.length>0&&($[oe]=te)}return $}async function U(){let $=ee();if(!$)return;let M=J();if(Object.keys(M).length===0){o("\uC800\uC7A5\uD560 \uC2E4\uD589 \uC124\uC815\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uBA3C\uC800 \uC2E4\uD589 \uAC12\uC744 \uC120\uD0DD\uD558\uC138\uC694");return}let oe=($.presets||[]).find(le=>le.id===j),te=q.trim()||(oe?oe.name:"");if(!te){o("\uD504\uB9AC\uC14B \uC774\uB984\uC744 \uC785\uB825\uD558\uC138\uC694");return}try{let le=oe?await Re("impl-preset-update",{expected_revision:$.revision,id:oe.id,name:te,settings:M}):await Re("impl-preset-create",{expected_revision:$.revision,name:te,settings:M});if(le&&le.applied){if(q="",!oe&&Array.isArray(le.presets)){let Fe=le.presets.find(Ke=>Ke.name===te);j=Fe?Fe.id:j}ie()}else o("\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4"),ie()}catch(le){o(`\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328: ${le instanceof Error?le.message:String(le)}`)}}async function Ae(){let $=ee();if(!(!$||j.length===0))try{let M=await Re("impl-preset-delete",{expected_revision:$.revision,id:j});M&&M.applied?(j="",ie()):(o("\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328: \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4"),ie())}catch(M){o(`\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328: ${M instanceof Error?M.message:String(M)}`)}}function lt($){s=fn($.values)?{...$.values}:{},i={...s},u=Array.isArray($.warnings)?$.warnings:[],fn($.queue)&&(t.onQueueAdopt?.($.queue),se={})}async function st(){let $=ee(),M=P();if(!$||!M||j.length===0)return;let oe=te=>({preset_id:j,expected_revision:$.revision,expected_queue_revision:te,...ke()});try{let te=await Re("apply-impl-preset-global",oe(M.revision));if(te&&te.applied&&lt(te),r!==null&&te&&te.queue_applied===!1){let le=te.queue&&typeof te.queue.revision=="number"?te.queue.revision:P()?.revision??M.revision;te=await Re("apply-impl-preset-global",oe(le)),te&&te.applied&&lt(te)}te&&te.applied?te.queue_applied===!1&&o("\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uAC12\uC740 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC138\uC694"):te&&te.conflict&&o("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328: \uD504\uB9AC\uC14B\uC774 \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4")}catch(te){o(`\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328: ${te instanceof Error?te.message:String(te)}`)}ie()}async function b(){I=!0,F=!1,ie();try{let $=await Re("get-worker-system-prompt",{});!$||typeof $!="object"||Array.isArray($)?F=!0:V=$}catch{F=!0}finally{I=!1,ie()}}function z(){if(C=!C,C&&!V){b();return}ie()}function Ie(){let $=co({loading:I,error:F});if($)return $;if(!V)return"";let M=Array.isArray(V.variants)?V.variants:[];return c`<div class="settings-dialog__sp-body">
      ${V.target_base_placeholder?c`<div class="prompt-block__meta">
            \`${V.target_base_placeholder}\`는 디스패치 시점에 해석된
            base로 치환됩니다.
          </div>`:""}
      ${M.map(oe=>c`<div class="settings-dialog__sp-variant" data-variant=${oe.key}>
            <div class="settings-dialog__sp-cond">${oe.condition}</div>
            ${Jn(oe.label,oe.system_prompt)}
          </div>`)}
    </div>`}function Le(){return c`<section
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
        aria-expanded=${C?"true":"false"}
        @click=${z}
      >
        ${C?"\uC811\uAE30":"\uC804\uBB38 \uBCF4\uAE30"}
      </button>
      ${C?Ie():""}
    </section>`}function Be($,M,oe,te,le,Fe,Ke){let Je=le[$]??tn,Ue=ga($,oe,le,H(),K(),Ke),kt=Ue.options.find(yt=>yt.value===Je),qt=Je===tn?Ue.full_value:kt?.full_value;return c`<select
        class=${Je===tn?"settings-dialog__unset":""}
        data-key=${$}
        aria-label=${M}
        title=${qt||""}
        ?disabled=${Fe===!0||Ue.disabled}
        .value=${ur(String(Je))}
        @change=${yt=>te($,String(yt.target.value))}
      >
        <option value=${tn} ?selected=${Je===tn}>
          ${Ue.unset_label}
        </option>
        ${Ue.options.map(yt=>c`<option
              value=${yt.value}
              title=${yt.full_value||""}
              ?selected=${yt.value===Je}
            >
              ${yt.label}
            </option>`)}
      </select>
      ${Je===tn?c`<span class="settings-dialog__source-badge">기본</span>`:""}`}function He($,M,oe,te,le,Fe=!1,Ke){return c`<div
      class=${`settings-dialog__row${Fe?" settings-dialog__row--off":""}`}
    >
      <span class="settings-dialog__row-label">${M}</span>
      <span class="settings-dialog__controls">
        ${Be($,M,oe,te,le,Fe,Ke)}
      </span>
    </div>`}function pt($,M,oe,te,le,Fe){let Ke=Object.hasOwn(a,$),Je=l[$]??i[$]??tn;return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${M}</span>
      <span class="settings-dialog__controls">
        <input
          type="text"
          class=${`settings-dialog__text${Ke?" settings-dialog__text--invalid":""}`}
          data-key=${$}
          aria-label=${M}
          aria-invalid=${String(Ke)}
          placeholder=${oe}
          .value=${ur(Je)}
          @input=${Ue=>et($,String(Ue.target.value))}
          @change=${Ue=>L($,String(Ue.target.value).trim(),Fe)}
        />
        ${Je.length===0?c`<span class="settings-dialog__source-badge">기본</span>`:""}
        <span class="settings-dialog__hint" data-key-hint=${$}
          >${Ke?le:te}</span
        >
      </span>
    </div>`}function xt($,M){let oe=M?M.active:null;return fn(oe)?`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(${$==="claude"?oe.email:po({...oe,alias:null})})`:"\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(\uD655\uC778 \uBD88\uAC00)"}function Mt($,M,oe){let te=R[oe],le=Object.hasOwn(g,$)?g[$]:tn,Fe=oe==="claude"?Ri:po,Ke=!!te?.accounts.some(Je=>Je.key===le);return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${M}</span>
      <span class="settings-dialog__controls">
        <select
          aria-label=${M}
          data-account-key=${$}
          @change=${Je=>Oe($,String(Je.target.value))}
        >
          <option value=${tn} ?selected=${le.length===0}>
            ${xt(oe,te)}
          </option>
          ${le.length>0&&!Ke?c`<option value=${le} selected>
                ${le} (목록에 없음)
              </option>`:""}
          ${te?.accounts.map(Je=>c`<option value=${Je.key} ?selected=${Je.key===le}>
                ${Fe(Je)}
              </option>`)||""}
        </select>
        ${te?"":c`<span class="settings-dialog__hint"
              >계정 목록을 불러올 수 없습니다</span
            >`}
      </span>
    </div>`}function Nt(){let $=f.warnings.join(", ");return f.state==="unusable"?`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12\uC744 \uD574\uC11D\uD560 \uC218 \uC5C6\uC5B4 \uC774 \uB808\uD3EC\uC758 \uB514\uC2A4\uD328\uCE58\uAC00 \uAC70\uBD80\uB429\uB2C8\uB2E4 \u2014 ${$} \xB7 \uACC4\uC815\uC744 \uB2E4\uC2DC \uACE0\uB974\uBA74 \uD574\uC18C\uB429\uB2C8\uB2E4`:f.warnings.length>0?`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12\uC5D0 \uC54C \uC218 \uC5C6\uB294 \uD0A4\uAC00 \uC788\uC2B5\uB2C8\uB2E4 \u2014 ${$}`:null}function mt($,M,oe,te,le,Fe){return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">
        <i
          class="settings-dialog__stage-dot"
          style=${`background: var(--stage-${M}-on)`}
        ></i>
        ${$}
      </span>
      <span class="settings-dialog__controls">
        ${Be(oe,`${$} \uBAA8\uB378`,te,Ge,i,!1)}
        ${Be(le,`${$} effort`,js,Ge,i,!1)}
        ${Be(Fe,`${$} \uC18D\uB3C4`,tu,Ge,i,!1)}
      </span>
    </div>`}function ct($,M,oe,te){return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${M}</span>
      <span class="settings-dialog__controls">
        <button
          type="button"
          class=${`settings-dialog__toggle${te?" is-on":""}`}
          data-automation=${$}
          aria-pressed=${te?"true":"false"}
          aria-label=${M}
          @click=${()=>qe($,!te)}
        >
          ${te?"\uCF1C\uC9D0":"\uAEBC\uC9D0"}
        </button>
        <span class="settings-dialog__hint">${oe}</span>
      </span>
    </div>`}function At($,M,oe,te){return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${M}</span>
      <span class="settings-dialog__controls">
        <span class="settings-dialog__stepper" data-stepper=${$}>
          <button
            type="button"
            aria-label=${`${M} \uAC10\uC18C`}
            @click=${()=>te(oe-1)}
          >
            −
          </button>
          <span class="settings-dialog__stepper-value">${oe}</span>
          <button
            type="button"
            aria-label=${`${M} \uC99D\uAC00`}
            @click=${()=>te(oe+1)}
          >
            +
          </button>
        </span>
      </span>
    </div>`}function Rt($){return c`<div class="settings-dialog__preset-diff" data-preset-diff>
      <div class="settings-dialog__preset-diff-head">
        ${$.rows.length>0?`\uBCC0\uACBD ${$.rows.length}\uAC1C \xB7 \uC801\uC6A9\uD558\uBA74 \uC544\uB798\uC640 \uAC19\uC774 \uBC14\uB01D\uB2C8\uB2E4`:"\uD604\uC7AC \uC124\uC815\uACFC \uAC19\uC2B5\uB2C8\uB2E4 \u2014 \uC801\uC6A9\uD560 \uBCC0\uACBD\uC774 \uC5C6\uC2B5\uB2C8\uB2E4"}
      </div>
      ${$.rows.map(M=>c`<div
            class="settings-dialog__preset-diff-row"
            data-diff-kind=${M.kind}
          >
            <span class="settings-dialog__preset-diff-label">${M.label}</span>
            <span class="settings-dialog__preset-diff-value"
              >${M.before??"\uAE30\uBCF8"}</span
            >
            <span class="settings-dialog__preset-diff-arrow">→</span>
            <span
              class="settings-dialog__preset-diff-value settings-dialog__preset-diff-after"
              >${M.after??"\uAE30\uBCF8(\uD574\uC81C)"}</span
            >
          </div>`)}
      ${$.ignored_keys.length>0?c`<div class="settings-dialog__preset-diff-note">
            ${$.ignored_keys.join(", ")}은(는) 전역 적용이 쓰지 않는 키라
            무시됩니다
          </div>`:""}
    </div>`}function Lt(){let $=P(),M={};for(let oe of Yn)M[oe]=Object.prototype.hasOwnProperty.call(se,oe)?se[oe]:$&&typeof $[oe]=="string"?$[oe]:null;return M}function ae(){let $=K(),M=i.impl_runtime,oe=i.impl_model,te=ee(),le=P(),Fe=Lt(),Ke=To($,X),Je=to($,void 0).filter(ut=>ut!==bn),Ue=ma($,X,Fe.orchestration_model||bn).filter(ut=>ut!==bn),kt=j?(te?.presets||[]).find(ut=>ut.id===j):null,qt=kt?su(J(),fn(kt.settings)?kt.settings:{}):null,yt=le&&typeof le.slots=="number"?le.slots:ji+1,Jt=le&&typeof le.serial_lane_count=="number"?le.serial_lane_count:ji,St=H()?.supported===!0,Ot=Nt(),Wt=ga("workflow_mode",So,i,H(),$);return c`
      ${u.length>0?c`<div class="settings-dialog__banner" role="alert">
            워크스페이스 기본값을 일부 읽지 못했습니다 —
            ${u.join(", ")}
          </div>`:""}
      ${Ot?c`<div
            class="settings-dialog__banner"
            data-account-warning
            role="alert"
          >
            ${Ot}
          </div>`:""}
      ${St?"":c`<div
            class="settings-dialog__banner settings-dialog__banner--projection"
            data-execution-defaults-warning
            role="alert"
          >
            실행 기본값 projection을 확인할 수 없습니다 — 기본값 확인 불가
          </div>`}
      ${p?c`<div class="settings-dialog__empty">불러오는 중…</div>`:c`
            <div class="settings-dialog__preset-bar">
              <select
                aria-label="실행 프리셋"
                .value=${ur(j)}
                @change=${ut=>{j=String(ut.target.value),ie()}}
              >
                <option value="" ?selected=${j===""}>
                  실행 프리셋…
                </option>
                ${(te?.presets||[]).map(ut=>c`<option
                      value=${ut.id}
                      ?selected=${ut.id===j}
                    >
                      ${ut.name}
                    </option>`)}
              </select>
              <button
                type="button"
                class="settings-dialog__btn settings-dialog__btn--primary"
                data-preset-apply-global
                ?disabled=${!qt||qt.rows.length===0}
                @click=${st}
              >
                적용
              </button>
              <input
                type="text"
                class="settings-dialog__preset-name"
                placeholder=${j?"\uC774\uB984 (\uBE44\uC6B0\uBA74 \uC720\uC9C0)":"\uC0C8 \uD504\uB9AC\uC14B \uC774\uB984"}
                aria-label="프리셋 이름"
                .value=${ur(q)}
                @input=${ut=>{q=String(ut.target.value)}}
              />
              <button
                type="button"
                class="settings-dialog__btn"
                data-preset-save
                title=${j?"\uD604\uC7AC \uD654\uBA74\uC758 \uC2E4\uD589 \uC124\uC815\uC744 \uC774 \uD504\uB9AC\uC14B\uC5D0 \uC800\uC7A5\uD569\uB2C8\uB2E4 (\uD504\uB9AC\uC14B \u2192 \uC124\uC815 \uBC29\uD5A5\uC774 \uC544\uB2D8)":"\uD604\uC7AC \uD654\uBA74\uC758 \uC2E4\uD589 \uC124\uC815\uC744 \uC0C8 \uD504\uB9AC\uC14B\uC73C\uB85C \uC800\uC7A5\uD569\uB2C8\uB2E4"}
                @click=${U}
              >
                ${j?"\uD604\uC7AC \uC124\uC815\uC73C\uB85C \uB36E\uC5B4\uC4F0\uAE30":"\uC0C8 \uD504\uB9AC\uC14B \uC800\uC7A5"}
              </button>
              <button
                type="button"
                class="settings-dialog__btn"
                data-preset-delete
                ?disabled=${j.length===0}
                @click=${Ae}
              >
                삭제
              </button>
            </div>
            ${qt?Rt(qt):""}

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">오케스트레이션</div>
              <div class="settings-dialog__row">
                <span class="settings-dialog__row-label">런타임</span>
                <span class="settings-dialog__controls">
                  <select
                    aria-label="런타임"
                    data-key="orchestration_runtime_filter"
                    .value=${ur(X||tn)}
                    @change=${ut=>{let Kt=String(ut.target.value);xe(Kt===tn?null:Kt)}}
                  >
                    <option value=${tn} ?selected=${!X}>
                      전체
                    </option>
                    <option
                      value="claude"
                      ?selected=${X==="claude"}
                    >
                      claude
                    </option>
                    <option
                      value="codex"
                      ?selected=${X==="codex"}
                    >
                      codex
                    </option>
                  </select>
                  <span class="settings-dialog__hint"
                    >모델 목록을 좁힙니다</span
                  >
                </span>
              </div>
              ${He("orchestration_model","\uBAA8\uB378",Ke,_e,Fe)}
              ${He("orchestration_effort","effort",Ue,_e,Fe)}
              ${He("orchestration_speed","\uC18D\uB3C4",eo,_e,Fe)}
            </div>

            <div class="settings-dialog__group" data-exec-accounts-group>
              <div class="settings-dialog__group-title">실행 계정</div>
              ${Mt("claude_account","Claude","claude")}
              ${Mt("codex_account","Codex","codex")}
            </div>

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">워크플로우</div>
              <div class="settings-dialog__row">
                <span class="settings-dialog__row-label">모드</span>
                <span class="settings-dialog__controls">
                  <span class="settings-dialog__seg" role="group">
                    <button
                      type="button"
                      data-mode=${tn}
                      aria-pressed=${String(!i.workflow_mode)}
                      @click=${()=>Ge("workflow_mode",tn)}
                    >
                      ${Wt.unset_label}
                    </button>
                    ${i.workflow_mode?"":c`<span class="settings-dialog__source-badge"
                          >기본</span
                        >`}
                    ${So.map(ut=>c`<button
                          type="button"
                          data-mode=${ut}
                          aria-pressed=${String(i.workflow_mode===ut)}
                          @click=${()=>Ge("workflow_mode",ut)}
                        >
                          ${ut}
                        </button>`)}
                  </span>
                </span>
              </div>
              ${pt("bdui_url","beads-ui \uC8FC\uC18C","http://\uD638\uC2A4\uD2B8:3000","\uC138\uC158\uC774 Worker \uB808\uC778 \uBC30\uCE58\uB97C \uBB3C\uC5B4\uBCFC \uB54C \uC4F0\uB294 \uC8FC\uC18C\uC785\uB2C8\uB2E4","http:// \uB610\uB294 https:// \uB85C \uC2DC\uC791\uD558\uB294 \uC8FC\uC18C\uB9CC \uC800\uC7A5\uB429\uB2C8\uB2E4 (\uACBD\uB85C \uC5C6\uC774)",Jc)}
            </div>

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">
                리뷰 게이트
                <span class="settings-dialog__hint">모델 · effort · 속도</span>
              </div>
              ${mt("\uC0AC\uC591 \uB9AC\uBDF0","spec","spec_review_model",Eo,"spec_review_effort","spec_review_speed")}
              ${mt("\uACC4\uD68D \uB9AC\uBDF0","plan","plan_review_model",qs,"plan_review_effort","plan_review_speed")}
              ${mt("\uAD6C\uD604 \uB9AC\uBDF0","impl","impl_review_model",Eo,"impl_review_effort","impl_review_speed")}
            </div>

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">
                구현
                <span class="settings-dialog__hint"
                  >이슈 핀이 있으면 핀이 우선합니다</span
                >
              </div>
              ${He("impl_runtime","\uC704\uC784 \uB300\uC0C1",Ns,Ge,i)}
              ${He("impl_model","\uBAA8\uB378",to($,M),Ge,i)}
              ${He("impl_effort","effort",no($,M,oe),Ge,i)}
              ${He("impl_speed","\uC18D\uB3C4",eo,Ge,i)}
              ${He("quick_fix_impl_model","quick_fix \uAD6C\uD604 \uBAA8\uB378",Je,Ge,i,!1,{...i,...Fe})}
            </div>

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">
                자동화
                <span class="settings-dialog__hint"
                  >이 레포의 워커 큐가 스스로 진행하는 범위</span
                >
              </div>
              ${ct("auto_advance","\uC790\uB3D9\uD654","\uC2AC\uB86F\uC774 \uBE44\uBA74 \uB300\uAE30 \uC55E \uD589\uC774 \uCD9C\uBC1C\uD569\uB2C8\uB2E4",le?.auto_advance===!0)}
              ${ct("auto_merge","\uBA38\uC9C0","\uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4",le?.auto_merge===!0)}
              ${At("slots","\uB3D9\uC2DC \uC2E4\uD589",yt,ut=>We(ut))}
              ${At("serial-lane-count","\uC9C1\uB82C \uB808\uC778",Jt,ut=>Qe(ut))}
            </div>
            ${Le()}
          `}
    `}function ie(){Q||ot(ae(),e)}return{load(){se={},l={},a={};let $=[ve(),Z()];return B||$.push(he()),Promise.all($).then(()=>{})},render:ie,sessionDraft:()=>({...i}),destroy(){Q=!0,ot(c``,e)}}}function Bi(e){return c`<svg
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
  </svg>`}function Cp(){return Bi(vo`<path d="M5.5 3.6 12 8l-6.5 4.4z" />`)}function Rp(){return Bi(vo`<path d="M6 3.8v8.4M10 3.8v8.4" />`)}function Op(){return Bi(vo`<path
      d="M4.6 5.6v4.8M4.6 8.2h2.2A3.2 3.2 0 0 0 10 5"
    />
    <circle cx="4.6" cy="4" r="1.5" />
    <circle cx="4.6" cy="12" r="1.5" />
    <circle cx="11.4" cy="4" r="1.5" />`)}function Ip(){return Bi(vo`<circle cx="8" cy="8" r="2.1" />
    <path
      d="M8 1.9v1.8M8 12.3v1.8M1.9 8h1.8M12.3 8h1.8M3.7 3.7l1.3 1.3M11 11l1.3 1.3M12.3 3.7 11 5M5 11l-1.3 1.3"
    />`)}function Lp(e){return`${e} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}function Pp(e){let t=(Array.isArray(e)?e:[]).map(l=>l&&l.usage).filter(l=>l&&typeof l=="object"&&"providers"in l);if(t.length>0)return rn(Ds(t));let n={};for(let l of Nn)n[l]=0;let r=!1,o=0,s=0,i=0;for(let l of Array.isArray(e)?e:[]){let a=l&&l.usage;if(a&&typeof a=="object"){let u=!1;for(let p of Nn){let f=a[p];typeof f=="number"&&Number.isFinite(f)&&(n[p]+=f,r=!0,u=!0)}if(u){s+=1;let p=a.total_cost_usd;typeof p=="number"&&Number.isFinite(p)&&(o+=p,i+=1)}}}return s>0&&i===s&&(n.total_cost_usd=o),r?Hn(n):null}function Ln(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function kl(e,t){let n=Ln(e?.counts)?e.counts:null,r=n?n[t]:null;return typeof r=="number"&&Number.isFinite(r)?r:0}function vy(e,t){if(!Ln(t))return e;let n={...e};for(let[r,o]of Object.entries(t))o!==void 0&&(n[r]=o);return n}function wy(e){if(!Ln(e)||!Ln(e.execution_defaults)||!Ln(e.runner_catalog)||!Ln(e.session_defaults))return null;let t={...e.session_defaults};for(let i of["orchestration_model","orchestration_effort","orchestration_speed"])typeof e[i]=="string"&&e[i].length>0&&(t[i]=e[i]);let n=gn({global:t,execution_defaults:e.execution_defaults,runner_catalog:e.runner_catalog}),r=En(e.runner_catalog,n.orchestration_model.value??""),o=ro(n,e.runner_catalog),s=Er(n,r);return o===null&&s===null?null:{orchestration:o,worker:s}}function Dp(e,t){let n=t.notify||(T=>ye(T,"error",4e3)),r=document.createElement("div");r.className="mon2-deck__main",e.appendChild(r);let o=document.createElement("div");o.className="mon2-deck__panel",o.hidden=!0;let s=document.createElement("div");s.className="mon2-deck__panel-hd";let i=document.createElement("span");i.className="mon2-deck__panel-title";let l=document.createElement("button");l.type="button",l.className="mon2-deck__panel-close",l.setAttribute("aria-label","\uC2E4\uD589 \uC124\uC815 \uB2EB\uAE30"),l.textContent="\u2715",s.append(i,l);let a=document.createElement("div");a.className="mon2-deck__panel-body",o.append(s,a),e.appendChild(o);let u=null,p=null,f=null,g=new Map;function m(){let T=t.workspacesState?t.workspacesState():[];return Array.isArray(T)?T.filter(Z=>Ln(Z)):[]}function k(T){return m().find(Z=>Z.root_dir===T)||null}function R(T){return vy(k(T),g.get(T))}function B(){for(let T of m()){let Z=g.get(T.root_dir);Z&&typeof Z.revision=="number"&&typeof T.revision=="number"&&T.revision>=Z.revision&&g.delete(T.root_dir)}}async function X(T,Z,we){let he=t.transport,Te=R(Z);if(!(!he||!Ln(Te))){try{let ge=await he(T,{...we,root_dir:Z,expected_revision:Te.revision});if(Ln(ge?.queue)&&g.set(Z,ge.queue),ge&&ge.conflict){let Oe=Ln(ge.queue)&&typeof ge.queue.revision=="number"?ge.queue.revision:R(Z)?.revision;ge=await he(T,{...we,root_dir:Z,expected_revision:Oe}),Ln(ge?.queue)&&g.set(Z,ge.queue)}}catch(ge){n(`\uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${ge instanceof Error?ge.message:String(ge)}`)}D()}}function se(T){u!==T&&(u=T,t.onFocusChange?.(u),D())}function j(T){se(u===T?null:T)}function q(T){if(p===T){I();return}C(),p=T;let Z=k(T);i.textContent=`${Z?.name||T} \uC2E4\uD589 \uC124\uC815 \xB7 Worker \uD0ED \u2699 \uC2E4\uD589 \uD0ED\uACFC \uAC19\uC740 \uC800\uC7A5\uC18C`,o.hidden=!1,f=Fi(a,{root_dir:T,queue:()=>R(T),transport:t.transport,implPresetStore:t.implPresetStore,notify:n,onQueueAdopt:we=>{g.set(T,we),D()}}),f.load(),D()}function C(){f?.destroy(),f=null}function I(T){C(),p=null,o.hidden=!0,i.textContent="",T!==!0&&D()}let F=()=>I();l.addEventListener("click",F);function V(T){T.key==="Escape"&&u!==null&&se(null)}document.addEventListener("keydown",V);function Q(T,Z){let we=Math.max(Z,T,1);return c`<span
      class="mon2-deck__rail"
      role="img"
      aria-label=${`\uC2AC\uB86F ${Z}\uAC1C \uC911 ${T}\uAC1C \uC2E4\uD589 \uC911`}
    >
      ${Array.from({length:we},(he,Te)=>Te<T?c`<i class="mon2-deck__slot is-run"></i>`:c`<i class="mon2-deck__slot"></i>`)}
    </span>`}function P(T){let Z=T.auto_advance===!0,we=T.auto_merge===!0;return c`<button
        type="button"
        class=${`mon2-deck__op mon2-deck__auto${Z?" is-on":""}`}
        data-act="auto"
        aria-pressed=${Z?"true":"false"}
        aria-label=${`${T.name} \uC790\uB3D9\uD654`}
        title=${Z?"\uC790\uB3D9\uD654 \uCF1C\uC9D0 \u2014 \uC2AC\uB86F\uC774 \uBE44\uBA74 \uB2E4\uC74C \uD589\uC774 \uCD9C\uBC1C\uD569\uB2C8\uB2E4":"\uC790\uB3D9\uD654 \uAEBC\uC9D0 \u2014 \uB2E4\uC74C \uD589\uC740 \uC218\uB3D9\uC73C\uB85C\uB9CC \uCD9C\uBC1C\uD569\uB2C8\uB2E4"}
      >
        ${Z?Rp():Cp()}
      </button>
      <button
        type="button"
        class=${`mon2-deck__op mon2-deck__merge${we?" is-on":""}`}
        data-act="merge"
        aria-pressed=${we?"true":"false"}
        aria-label=${`${T.name} \uC790\uB3D9 \uBA38\uC9C0`}
        title=${we?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0"}
      >
        ${Op()}
      </button>
      <button
        type="button"
        class=${`mon2-deck__op mon2-deck__gear${p===T.root_dir?" is-on":""}`}
        data-act="gear"
        aria-expanded=${p===T.root_dir?"true":"false"}
        aria-label=${`${T.name} \uC2E4\uD589 \uC124\uC815`}
        title="이 레포의 실행 설정"
      >
        ${Ip()}
      </button>`}function K(T){let Z=wy(T);return Z?c`<div class="mon2-deck__chips">
      ${Z.orchestration?c`<span class="mon2-deck__chip" title=${Z.orchestration.title}
            >오케 ${Z.orchestration.text}</span
          >`:""}
      ${Z.worker?c`<span class="mon2-deck__chip" title=${Z.worker.title}
            >워커 ${Z.worker.text}</span
          >`:""}
    </div>`:""}function H(T){let Z=[];for(let[we,he]of[["queue","\uB300\uAE30"],["pr_wait","PR"],["session_active","\uC138\uC158"]]){let Te=kl(T,we);Te>0&&Z.push(`${he} ${Te}`)}return Z.join(" \xB7 ")}function ee(T){let Z=kl(T,"running"),we=typeof T.slots=="number"?T.slots:1;return c`<div
      class=${`mon2-deck__tile${u===T.root_dir?" is-focus":""}`}
      role="button"
      tabindex="0"
      data-root-dir=${T.root_dir}
      aria-pressed=${u===T.root_dir?"true":"false"}
      title="클릭하면 이 레포만 선명하게 봅니다 (Esc로 해제)"
    >
      <div class="mon2-deck__tile-hd">
        <span class="mon2-deck__name" title=${T.root_dir}>${T.name}</span>
        <span
          class="mon2-deck__load"
          title=${`\uC2AC\uB86F ${we}\uAC1C \uC911 ${Z}\uAC1C \uC2E4\uD589 \uC911`}
        >
          <span class="mon2-deck__load-n">${Z}/${we}</span>
          ${Q(Z,we)}
        </span>
        <button
          type="button"
          class="mon2-deck__worker"
          data-act="worker"
          aria-label=${`${T.name} Worker \uD0ED\uC73C\uB85C \uC774\uB3D9`}
          title="이 레포의 Worker 탭으로 이동"
        >
          ↗
        </button>
      </div>
      <div class="mon2-deck__tile-ft">
        <div class="mon2-deck__ops">${P(T)}</div>
        <span class="mon2-deck__counts">${H(T)}</span>
        ${K(T)}
      </div>
    </div>`}function ke(T){let Z=t.doneItems?t.doneItems():[],we=t.rangeLabel?t.rangeLabel():"",he=Pp(Array.isArray(Z)?Z:[]),Te=ge=>T.reduce((Oe,Ge)=>Oe+kl(Ge,ge),0);return c`<div class="mon2-deck__bar">
      <span
        class="mon2-deck__total-counts"
        title=${`visible \uB808\uD3EC ${T.length}\uACF3\uC758 \uD569\uACC4\uC785\uB2C8\uB2E4 \u2014 \uC2E4\uD589\xB7\uB300\uAE30\xB7PR\uC740 \uC9C0\uAE08, \uC644\uB8CC\uB294 ${we}`}
        >실행 ${Te("running")} · 대기 ${Te("queue")} · PR
        ${Te("pr_wait")}${Te("session_active")>0?` \xB7 \uC138\uC158 ${Te("session_active")}`:""}
        · ${we} 완료
        ${Array.isArray(Z)?Z.length:0}</span
      >
      ${he===null?"":c`<span class="mon2-deck__total-tokens">
            ${typeof he=="string"?c`<span
                  class="mon2-deck__tok"
                  title=${Lp(we)}
                  >${he}</span
                >`:he.map(ge=>c`<span
                      class="mon2-deck__tok"
                      data-provider=${ge.provider}
                      title=${ge.tooltip}
                      >${ge.label}</span
                    >`)}
          </span>`}
    </div>`}function Re(){let T=m();return T.length===0?"":c`${ke(T)}
      <div class="mon2-deck__strip">
        ${T.map(Z=>ee(Z))}
      </div>`}function ne(){u!==null&&!k(u)&&(u=null,t.onFocusChange?.(null))}function D(){B(),ne(),p!==null&&!k(p)&&I(!0),ot(Re(),r),f?.render()}function ve(T){let Z=T.target;if(!Z||typeof Z.closest!="function")return;let we=Z.closest("[data-root-dir]");if(!we)return;let he=we.getAttribute("data-root-dir")||"",Te=Z.closest("[data-act]")?.getAttribute("data-act");if(Te==="worker"){t.gotoWorkerTab?.(he);return}if(Te==="auto"){X("worker-automation-toggle",he,{on:R(he)?.auto_advance!==!0});return}if(Te==="merge"){X("worker-merge-auto-toggle",he,{on:R(he)?.auto_merge!==!0});return}if(Te==="gear"){q(he);return}j(he)}function Ee(T){if(T.key!=="Enter"&&T.key!==" ")return;let Z=T.target;if(!Z||typeof Z.closest!="function")return;let we=Z.closest('[data-root-dir][role="button"]');!we||we!==Z||(T.preventDefault(),j(we.getAttribute("data-root-dir")||""))}return r.addEventListener("click",ve),r.addEventListener("keydown",Ee),{render:D,focusRoot:()=>u,panelRoot:()=>p,destroy(){document.removeEventListener("keydown",V),r.removeEventListener("click",ve),r.removeEventListener("keydown",Ee),l.removeEventListener("click",F),C(),ot(c``,r),e.replaceChildren()}}}var ky=1e4,jp="bdui.monitor.done-range",Fp="bdui.monitor.running_sort",Bp="bdui.monitor.candidate_sort",Up="beads-ui.monitor.candidate-filter",Wp="beads-ui.monitor.sections";function $y(){try{let e=window.localStorage.getItem(Up);if(!e)return{...io};let t=JSON.parse(e);return!t||typeof t!="object"?{...io}:{show_blocked:typeof t.show_blocked=="boolean"?t.show_blocked:io.show_blocked,spec:Ma.some(n=>n.value===t.spec)?t.spec:"all"}}catch{return{...io}}}function Mp(e){try{window.localStorage.setItem(Up,JSON.stringify({show_blocked:e.show_blocked,spec:e.spec}))}catch{}}function xy(){try{let e=window.localStorage.getItem(Bp);return No.some(t=>t.value===e)?e:"repo_spec"}catch{return"repo_spec"}}function Ay(e){try{window.localStorage.setItem(Bp,e)}catch{}}function Sy(){try{let e=window.localStorage.getItem(Wp);if(!e)return{};let t=JSON.parse(e);return t&&typeof t=="object"?t:{}}catch{return{}}}function Ey(e){try{window.localStorage.setItem(Wp,JSON.stringify(e))}catch{}}function Ty(){try{let e=window.localStorage.getItem(jp);return e===null?"today":Dn(e)}catch{return"today"}}function Cy(e){try{window.localStorage.setItem(jp,e)}catch{}}function Ry(){try{return window.localStorage.getItem(Fp)==="repo"?"repo":"started"}catch{return"started"}}function Oy(e){try{window.localStorage.setItem(Fp,e)}catch{}}var zp="tab:monitor:pipeline",Iy=1e3,Np=[{lane:"runnable",pane:"candidate",title:"\uD6C4\uBCF4",empty:"\uC2E4\uD589 \uC790\uACA9\uC744 \uAC16\uCD98 \uC774\uC288 \uC5C6\uC74C"},{lane:"queue",pane:"queue",title:"\uB300\uAE30",empty:"\uD45C\uC2DC\uD560 \uB808\uD3EC \uC5C6\uC74C"},{lane:"running",pane:"running",title:"\uC2E4\uD589 \uC911",empty:"\uC2E4\uD589 \uC911 \uC5C6\uC74C"},{lane:"pr_wait",pane:"pr_wait",title:"PR \uB300\uAE30",empty:"PR \uC5C6\uC74C"},{lane:"done",pane:"done",title:"\uC644\uB8CC",empty:"\uC644\uB8CC \uAE30\uB85D \uC5C6\uC74C"}],Ly=["queue","runnable","done"],qp="\u2460\u2461\u2462\u2463\u2464\u2465\u2466\u2467\u2468\u2469\u246A\u246B\u246C\u246D\u246E\u246F\u2470\u2471\u2472\u2473";function Py(e){return e>=1&&e<=qp.length?qp[e-1]:`(${e})`}function Hp(e,t){let n=It("views:monitor"),r=t.gotoIssue,o=t.pipelineStore,s=t.transport,i=t.getWorkspacePath,l=t.openDoc,a=t.switchWorkspace,u=t.router,p=t.now||(()=>Date.now()),f=t.confirm||(h=>typeof globalThis.confirm!="function"||globalThis.confirm(h)),g=Ty(),m=Ry(),k=$y(),R=xy(),B=Sy(),X=Pi("beads-ui.monitor.lane-collapsed"),se=!1,j=null,q=null,C=null,I=null,F=Qr(()=>le()),V=null,Q=null,P=null,K=null;function H(h){return K===null&&(K=L()),Ju(h,K)}function ee(h,d){ke(),!(d<=0)&&(Q={lane_id:h,corrected:d},P=setTimeout(()=>{P=null,Q=null,le()},ky))}function ke(){P!==null&&(clearTimeout(P),P=null),Q=null}function Re(){let h=Nr.find(d=>d.value===g);return h?h.label:""}let ne=document.createElement("div");ne.className="mon",e.appendChild(ne);let D=document.createElement("div");D.className="worker-drawer-overlay",D.hidden=!0;let ve=document.createElement("div");ve.className="worker-drawer-overlay__backdrop";let Ee=document.createElement("div");Ee.className="worker-drawer-host mon2-drawer",D.append(ve,Ee),e.appendChild(D);let T=lr(null,null),Z=new Map,we=new Map,he=null,Te=null,ge=null,Oe=uo(Ee,{transport:s,sessionLogStore:t.sessionLogStore,onClose:()=>{q=null,D.hidden=!0,le()}}),Ge=Mi({transport:s,console_el:ne,getLanes:()=>T,getWorkspaces:()=>o&&o.get?o.get():null,getCrossLanes:St,reproject:h=>({lanes:te(h),raw_lanes:h}),onCorrection:ee,showToast:ye,requestRender:()=>le(),adoptQueue:(h,d)=>{we.set(h,d)},onDragBegin:()=>{C=null},candidate_drop:!0}),{applyDrop:et,dropModel:L,runPlanned:ue,sendQueueCas:re}=Ge;async function pe(h,d,_,S,G=!0){if(!s||!_)return null;let Y=await s(h,{...d,root_dir:_,expected_revision:S});if(Y&&Y.conflict&&G){Y.queue&&we.set(_,Y.queue);let ce=Y.queue&&typeof Y.queue.revision=="number"?Y.queue.revision:S;Y=await s(h,{...d,root_dir:_,expected_revision:ce})}return Y&&Y.queue&&_&&we.set(_,Y.queue),Y}function Ce(h,d){let _=we.get(h),S=o&&o.get?o.get():null,G=(Array.isArray(S)?S:[]).find(ce=>ce?.root_dir===h);return(_||G)?.merge_queue?.find(ce=>ce.bead_id===d)?.continuation_action}async function _e(h,d,_,S){let G=await pe(h,d,_,S),Y=we.get(_)?.revision??G?.queue?.revision??S;return zn(G,(ce,Se)=>pe(h,{...d,continuation:ce,decision_token:Se},_,Y,!1),{refresh:ce=>pe(h,d,_,ce?.queue?.revision??we.get(_)?.revision??Y,!1)})}async function xe(h,d,_,S){let G=await zn({continuation_mismatch:S},(ce,Se)=>pe("worker-merge-queue-add",{bead_id:d,continuation:ce,decision_token:Se},h,_,!1)),Y=G?.queue?.merge_queue?.find(ce=>ce.bead_id===d)?.continuation_action;G?.applied!==!0&&Y?.continuation===null&&Y.mismatch&&await xe(h,d,G.queue.revision,Y.mismatch)}async function We(h,d,_){let S=await pe("worker-discard",h,d,_);if(S&&S.discarded===!0){ye(Vs(S),"success",5e3);return}if(S&&S.reason){ye(`\uD3D0\uAE30 \uC2E4\uD328: ${S.reason}`,"error");return}if(S&&S.accepted&&S.pending==="merged_revert"){ye("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success");return}if(S&&S.accepted){ye(`\uD3D0\uAE30 \uC9C4\uD589: ${S.phase||"\uBC31\uC5C5 \uC911"}`,"success");return}S&&!S.conflict&&ye("\uD3D0\uAE30 \uAC70\uBD80: unknown","error")}async function Qe(h,d,_){return!s||!_?null:await s(h,{...d,root_dir:_})}async function qe(){let h=new Map;for(let d of T.pr_wait)h.has(d.root_dir)||h.set(d.root_dir,d.expected_revision);for(let[d,_]of h)await pe("worker-merge-queue-add-all",{},d,_)}function J(h){let d=B[h];return!!(d&&d.runnable===!0)}function U(h){let d={...B[h]||{}};d.runnable=!d.runnable,B={...B,[h]:d},Ey(B),le()}function Ae(h){X.toggle(h),le()}function lt(h){X.toggleArea(h),le()}function st(h){let d=h.dependency_chips||null,_=h.overlap_chips||[],S=h.scope_state==="missing",G=h.armed_lane_chip;return!d&&_.length===0&&!S&&!G?null:{...d||{},..._.length>0?{overlaps:_}:{},...S?{scope_missing:!0}:{},...G?{armed_lane:G}:{}}}function b(h){return ni(h,d=>F.isOpen({bead_id:h.id,chip_key:d}))}function z(h){let d=st(h),_=b(h);return d||_?{...h,...d?{dependency_chips:d}:{},..._?{chip_popover:_}:{}}:h}function Ie(h){let d=J(h.root_dir);return c`<header class="mon2-sec__hd">
      <button
        type="button"
        class="mon2-sec__toggle"
        data-root-dir=${h.root_dir}
        data-section="runnable"
        aria-expanded=${d?"false":"true"}
        aria-label=${`${h.name} \uC139\uC158 ${d?"\uD3BC\uCE58\uAE30":"\uC811\uAE30"}`}
      >
        ${d?"\u25B8":"\u25BE"}
      </button>
      <span class="mon2-sec__name" title=${h.root_dir}>${h.name}</span>
      <span class="mon2-sec__count">${h.count}</span>
      <button
        type="button"
        class="mon2-sec__worker"
        data-root-dir=${h.root_dir}
        title="이 레포의 Worker 탭으로 이동"
      >
        Worker ↗
      </button>
    </header>`}function Le(h,d){return c`<div
      class="mon2-item"
      data-bead-id=${h.id}
      data-drag-kind="candidate"
      data-root-dir=${h.root_dir}
    >
      ${d}
    </div>`}function Be(h){if(C!==h.id)return null;let d=T.queue_groups.find(Y=>Y.root_dir===h.root_dir),_=h.place_lanes||[],S=T.cross_lanes_revision!==null,G=[{id:"parallel",label:"\uBCD1\uB82C",count:h.place_index??0}];for(let Y of T.chain_lanes)G.push({id:`lane:${Y.lane_id}`,label:`\uC5F0\uACB0 ${Y.number} (${Y.draft?"draft":"\uD655\uC815"}) \uB05D\uC5D0`,count:Y.rows.length,group:"\uC5F0\uACB0 \uB808\uC778",disabled:!S});G.push({id:"new-lane",label:"+ \uC0C8 \uC5F0\uACB0 \uB808\uC778",group:"\uC5F0\uACB0 \uB808\uC778",disabled:!S,title:S?"\uC774 \uC774\uC288\uB9CC \uB4E0 draft \uB808\uC778\uC744 \uB9CC\uB4ED\uB2C8\uB2E4":"\uC5F0\uACB0 \uB808\uC778 \uC800\uC7A5\uC18C\uB97C \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"});for(let Y of _)G.push({id:`serial:${Y.id}`,label:`\uC9C1\uB82C ${Number(Y.id.slice(1))}`,count:Y.length,group:`${d?d.name:""} \uC9C1\uB82C`});return{bead_id:h.id,lanes:G}}function He(h){return Le(h,c`${Ra(z(h),Be(h),{exec_chips_mode:"pinned_only",onOpenDoc:l?(d,_)=>l(_,h.root_dir):void 0})}`)}function pt(){return T.runnable_flat?c`<div class="mon2-flat" data-drop="candidate">
        ${T.runnable.map(h=>He(h))}
      </div>`:c`${T.runnable_sections.map(h=>{let d=J(h.root_dir);return c`<section
        class="mon2-sec${d?" is-collapsed":""}"
        data-root-dir=${h.root_dir}
        data-section="runnable"
      >
        ${Ie({root_dir:h.root_dir,name:h.name,count:h.items.length})}
        ${d?"":c`<div
              class="mon2-sec__body"
              data-lane="candidate"
              data-drop="candidate"
            >
              ${h.items.map(_=>He(_))}
            </div>`}
      </section>`})}`}function xt(h,d=!1){return c`<span class="worker-mini__rowops">
      ${d?c`<button
              type="button"
              class="worker-mini__rowops-up"
              data-bead-id=${h.id}
              title="같은 레포 안에서 한 칸 위로"
              aria-label="한 칸 위로"
            >
              ↑
            </button>
            <button
              type="button"
              class="worker-mini__rowops-down"
              data-bead-id=${h.id}
              title="같은 레포 안에서 한 칸 아래로"
              aria-label="한 칸 아래로"
            >
              ↓
            </button>
            <button
              type="button"
              class="worker-mini__rowops-remove"
              data-bead-id=${h.id}
              title="대기에서 빼기"
              aria-label="대기에서 빼기"
            >
              ✕
            </button>`:""}
    </span>`}function Mt(h,d){return c`<div
      class="mon2-item"
      data-bead-id=${h.id}
      data-drag-kind="parallel"
      data-root-dir=${h.root_dir}
      data-row-index=${d}
      data-queue-index=${String(h.queue_index??0)}
    >
      ${Tn(z(h),{actions:xt(h,!0)})}
    </div>`}function Nt(h,d,_,S){return c`<div
      class="mon2-crow${d.fixed?" mon2-crow--fixed":""}"
      draggable=${d.draggable?"true":"false"}
      data-bead-id=${d.id}
      data-drag-kind="chain"
      data-root-dir=${d.root_dir}
      data-lane-id=${h.lane_id}
      data-row-index=${_}
      data-queue-index=${typeof d.queue_index=="number"?String(d.queue_index):""}
    >
      <span class="mon2-crow__seq" aria-hidden="true"
        >${Py(d.seq)}</span
      >
      ${d.workspace_name?c`<span class="worker-mini__repo" title=${d.root_dir}
            >${d.workspace_name}</span
          >`:""}
      <span class="worker-mini__id" title="클릭하면 ID 복사">${d.id}</span>
      <span class="mon2-crow__title">${d.title}</span>
      ${d.mismatch?c`<span
            class="mon2-crow__mismatch"
            title="레인 순서가 주장하는 선행이 bd 의존에 없습니다 — 재적용으로 복구합니다"
            >⚠ 의존 없음</span
          >`:""}
      ${S.includes(d.id)?c`<span
            class="mon2-crow__mismatch"
            title="이미 실행된 뒤 의존이 바뀌었습니다 — 이 행은 움직일 수 없어 교정하지 않습니다"
            >⚠ 의존 순서와 다름</span
          >`:""}
      <span class="mon2-crow__where" title=${d.location_title}
        >${d.location_label}</span
      >
      <button
        type="button"
        class="mon2-crow__detach"
        data-bead-id=${d.id}
        title="연결에서 빼고 앞뒤를 이어 붙입니다"
        aria-label="연결에서 빼기"
      >
        ✕
      </button>
    </div>`}function mt(h){let d=T.cross_lanes_revision!==null,_=H(h.lane_id),S=_?.held===!0,G=_?.cycle===!0,Y=_?_.mismatched:[],ce=Q&&Q.lane_id===h.lane_id?Q.corrected:0;return c`<div class="mon2-clane" data-lane-id=${h.lane_id}>
      <header class="mon2-clane__hd">
        <span class="mon2-clane__name">${h.label}</span>
        <span class="mon2-clane__count">${h.rows.length}</span>
        <span class="mon2-clane__badge mon2-clane__badge--${h.state}"
          >${h.badge}</span
        >
        ${ce>0?c`<span
              class="mon2-clane__corrected"
              title="기존 blocks 의존이 드롭 순서를 이깁니다 — 그 순서로 다시 놓았습니다"
              >의존에 맞춰 ${ce}건 자동 교정</span
            >`:""}
        ${G?c`<span
              class="mon2-clane__cycle"
              title="멤버들의 blocks 의존이 순환합니다 — 어느 순서도 의존을 만족시키지 못합니다"
              >⛔ 의존 사이클 — 자동 교정 불가</span
            >`:""}
        ${S?c`<span
              class="mon2-clane__hold"
              title="멤버 한 명의 의존 자료가 이 스냅샷에 아직 없습니다 — 다음 스냅샷이 채우면 교정합니다"
              >${pi}</span
            >`:""}
        ${h.draft?c`<button
              type="button"
              class="mon2-clane__confirm"
              data-lane-id=${h.lane_id}
              ?disabled=${!d||!h.can_confirm||S}
              title=${S?pi:h.can_confirm?"\uC778\uC811 \uC758\uC874\uC744 \uAC78\uACE0 \uBBF8\uC801\uC7AC \uBA64\uBC84\uB97C \uAC01\uC790 \uB808\uD3EC \uBCD1\uB82C \uD050 \uB05D\uC5D0 \uC62C\uB9BD\uB2C8\uB2E4":"\uBA64\uBC84\uAC00 2\uAC1C \uC774\uC0C1\uC774\uC5B4\uC57C \uD655\uC815\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4"}
            >
              확정
            </button>`:""}
        ${h.run_label!==null?c`<button
              type="button"
              class="mon2-clane__run"
              data-lane-id=${h.lane_id}
              ?disabled=${!d}
              title="이 레인 멤버만 발차합니다 — 레포 자동 진행은 켜지 않습니다"
            >
              ${h.run_label}
            </button>`:""}
        ${h.state==="confirmed"&&h.has_mismatch?c`<button
              type="button"
              class="mon2-clane__reapply"
              data-lane-id=${h.lane_id}
              ?disabled=${!d}
              title="빠진 인접 의존을 다시 걸고 미적재 멤버를 다시 올립니다"
            >
              재적용
            </button>`:""}
        ${h.can_stop?c`<button
              type="button"
              class="mon2-clane__stop"
              data-lane-id=${h.lane_id}
              ?disabled=${!d}
              title="남은 멤버의 발차만 멈춥니다 — 도는 세션과 머지 큐 항목은 끝까지 갑니다"
            >
              ⏸ 정지
            </button>`:""}
        <button
          type="button"
          class="mon2-clane__remove"
          data-lane-id=${h.lane_id}
          ?disabled=${!d}
          title=${h.draft?"\uC774 draft \uB808\uC778\uC744 \uC9C0\uC6C1\uB2C8\uB2E4":"\uC774 \uB808\uC778\uACFC \uB808\uC778\uC774 \uB9CC\uB4E0 \uC758\uC874\uC744 \uD568\uAED8 \uC9C0\uC6C1\uB2C8\uB2E4"}
          aria-label="연결 레인 삭제"
        >
          ✕
        </button>
      </header>
      <div
        class="mon2-clane__body"
        data-drop="chain"
        data-lane-id=${h.lane_id}
      >
        ${h.rows.length===0?c`<div class="mon2-clane__hint">
              여기로 끌어다 놓으면 연결이 시작됩니다
            </div>`:h.rows.map((Se,Ye)=>Nt(h,Se,Ye,Y))}
      </div>
    </div>`}function ct(h,d,_){return c`<div
      class="mon2-item"
      data-bead-id=${d.id}
      data-drag-kind="repo-serial"
      data-root-dir=${d.root_dir}
      data-lane-id=${h.id}
      data-row-index=${_}
      data-queue-index=${String(d.queue_index??0)}
    >
      ${Tn(z(d),{actions:xt(d)})}
    </div>`}function At(h){if(h.length===0)return"";let d=h.length-1;return`${h[0].id} \uC810\uC720${d>0?` +${d}`:""}`}function Rt(h){return c`<div
      class="mon2-item mon2-item--ghost"
      data-bead-id=${h.id}
    >
      ${Tn({id:h.id,title:h.title,lane:"running",draggable:!1,ghost:!0,badges:[h.badge]})}
    </div>`}function Lt(h,d){let _=d.occupants,S=d.cross_wait_peers||[];return{id:d.id,pane_id:"",title:`${h.name} \xB7 \uC9C1\uB82C ${d.index+1}`,rows:[..._.map(G=>Rt(G)),...d.items.map((G,Y)=>ct(d,G,Y))],count:d.items.length,empty:d.empty===!0,..._.length>0?{badge:c`<span
              class="mon2-lane__occupant"
              title=${_.map(G=>`${G.id} \u2014 ${G.badge}`).join(`
`)}
              >${At(_)}</span
            >`,held:!0}:{},cycle:d.cycle,header_control:c`<button
        type="button"
        class="mon2-sec__worker"
        data-root-dir=${h.root_dir}
        title="이 레포의 Worker 탭으로 이동"
      >
        Worker ↗
      </button>`,...S.length>0?{after:c`${S.map(G=>c`<div class="mon2-lane__cross-wait">
                  ⚠ 상호 정지 — ${G.workspace_name}·${G.lane}과 교차 대기
                </div>`)}`}:{}}}function ae(){let h=T.cross_lanes_revision!==null,d=T.chain_lanes.some(_=>_.draft&&_.rows.length===0);return oi({parallel:{rows:T.parallel_rows.map((_,S)=>Mt(_,S)),count:T.parallel_rows.length,collapsed:X.isAreaCollapsed("parallel"),drop:{drop:"parallel"}},serial:{lanes:T.queue_groups.flatMap(_=>_.sublanes.serial.map(S=>({...Lt(_,S),drop:{drop:"repo-serial",root_dir:_.root_dir,lane_id:S.id,lane_length:String(S.raw_length)}}))),collapsed:X.isAreaCollapsed("serial"),extra_panes:T.chain_lanes.map(_=>mt(_)),header_control:c`<button
          type="button"
          class="mon2-newlane"
          ?disabled=${d||!h}
          title=${h?d?"\uBE48 \uC5F0\uACB0 \uB808\uC778\uC774 \uC774\uBBF8 \uC788\uC2B5\uB2C8\uB2E4":"\uBE48 \uC5F0\uACB0 \uB808\uC778\uC744 \uD558\uB098 \uB9CC\uB4ED\uB2C8\uB2E4":"\uC5F0\uACB0 \uB808\uC778 \uC800\uC7A5\uC18C\uB97C \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"}
        >
          + 연결 레인
        </button>`,...T.cross_lanes_unreadable?{notice:c`<div class="mon2-clane__unreadable">
                연결 레인 저장소를 읽을 수 없음
              </div>`}:{}}})}function ie(h){return c`<div class="worker-rungrid">
      ${T.running.length===0?c`<div class="worker-rungrid__empty">실행 세션 없음</div>`:T.running.map(d=>wl({bead_id:d.id,attempt_id:d.attempt_id||"",title:d.title,runner:d.runner??null,model:d.model??null,effort:d.effort??null,speed:d.speed??null,started_at:d.started_at??null,kind:d.kind,...d.kind==="session"?{updated_at:d.updated_at,session_refs:d.session_refs||[]}:{},workflow:d.workflow||null,resumed_from:d.resumed_from??null,continuation_mode:d.continuation_mode??null,paused:d.run_state==="paused",failed:d.run_state==="failed",parked:d.run_state==="parked",retry_wait:d.run_state==="retry_wait",waiting:d.run_state==="waiting",wait:d.wait||null,retry:d.retry||null,status:d.status,status_label:d.run_state==="failed"?"\uC2E4\uD328":d.run_state==="parked"?"\uC138\uC158 \uB300\uAE30":d.run_state==="retry_wait"?"\uC7AC\uC2DC\uB3C4 \uB300\uAE30":d.run_state==="waiting"?"\uC120\uD589 \uB300\uAE30":void 0,can_pause:d.can_pause!==!1,exec_chips:d.exec_chips||null,usage:d.usage||null,chip_popover:b(d),discard:d.discard,failure:d.failure?{...d.failure,open:I===d.attempt_id}:null},h,q,{monitor:{repo:d.workspace_name,root_dir:d.root_dir,serial_lane_id:d.serial_lane_id,cross_lane_chip:d.cross_lane_chip||null,last_activity:d.last_activity||null,legs:d.legs||[],dependency_chips:st(d)}}))}
    </div>`}function $(h){let d={runnable:T.runnable,queue:T.queue,running:T.running,pr_wait:T.pr_wait,done:T.done},_=S=>{let G=d[S.lane],Y=S.lane==="runnable"?T.runnable_flat?G.length>0?pt():void 0:T.runnable_sections.length>0?pt():void 0:S.lane==="queue"?T.queue_groups.length>0||T.chain_lanes.length>0||T.parallel_rows.length>0||T.cross_lanes_unreadable?ae():void 0:S.lane==="running"?ie(h):G.length>0?c`${G.map(ce=>Tn(z(ce)))}`:void 0;return qn({id:`monitor-${S.lane}`,lane:S.pane,title:S.title,items:G,count:G.length,src:S.lane==="runnable",empty:S.empty,body:Y,live:S.lane==="running"&&G.length>0,collapsible:!0,collapsed:X.isCollapsed(S.pane),controls:S.lane==="runnable"?M():void 0,header_control:oe(S.lane,G.length)})};if(se){let S=Ly.map(G=>Np.find(Y=>Y.lane===G)).filter(G=>G!==void 0);return c`<div class="mon2-deck"></div>
        <div class="worker-lanes-host">
          <div class="worker-lanes worker-lanes--mobile mon2-lanes">
            ${si({live:T.running.length>0,running_body:T.running.length>0?ie(h):"",pr_wait_rows:T.pr_wait.map(G=>Tn(z(G))),count:T.running.length+T.pr_wait.length})}
            ${S.map(G=>_(G))}
          </div>
        </div>`}return c`<div class="mon2-deck"></div>
      <div class="worker-lanes-host">
        <div class="worker-lanes mon2-lanes">
          ${Np.map(S=>_(S))}
        </div>
      </div>`}function M(){return c`<div class="worker-filter">
      <label class="worker-filter__tgl" title="blocked 이슈 표시">
        <input
          type="checkbox"
          class="mon-filter__blocked"
          .checked=${k.show_blocked}
        />
        🔒
        blocked${T.runnable_hidden.blocked>0?` ${T.runnable_hidden.blocked}`:""}
      </label>
      <div class="worker-filter__spec" role="group" aria-label="spec 필터">
        ${Ma.map(h=>c`<button
              type="button"
              class="mon-filter__spec worker-filter__chip${k.spec===h.value?" is-active":""}"
              data-spec=${h.value}
              aria-pressed=${k.spec===h.value?"true":"false"}
            >
              ${h.label}
            </button>`)}
        ${T.runnable_hidden.spec>0?c`<span class="worker-filter__hidden"
              >숨김 ${T.runnable_hidden.spec}</span
            >`:""}
      </div>
    </div>`}function oe(h,d){return h==="runnable"?c`<select
        class="mon-candidate-sort worker-sort"
        aria-label="후보 정렬"
        title="후보 정렬"
        .value=${R}
      >
        ${No.map(_=>c`<option
              value=${_.value}
              ?selected=${R===_.value}
            >
              ${_.label}
            </option>`)}
      </select>`:h==="running"?c`<select
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
      </select>`:h==="pr_wait"&&d>0?c`<button
        type="button"
        class="mon-lane-op mon-merge-all"
        title="자격이 생기는 PR을 각 레포의 머지 큐에 한 번에 넣습니다"
      >
        일괄 머지
      </button>`:h==="done"?c`<select
        class="mon-done-range worker-sort"
        aria-label="완료 기간"
        title="완료 기간"
        .value=${g}
      >
        ${Nr.map(_=>c`<option value=${_.value} ?selected=${g===_.value}>
              ${_.label}
            </option>`)}
      </select>`:""}function te(h){let d=o&&o.get?o.get():null,_=o&&o.getWorkspacesState?o.getWorkspacesState():[],S=h===void 0?o&&o.crossLanes?o.crossLanes():void 0:h,G={done_since:$r(g,p()),running_sort:m,candidate_filter:k,candidate_sort:R};return S!==void 0&&(G.cross_lanes=S),lr(d,_,G)}function le(){let h=p();T=te(),K=null,Z=new Map;for(let d of[...T.runnable,...T.queue,...T.running,...T.pr_wait,...T.done])!d.non_occupying&&!Z.has(d.id)&&Z.set(d.id,d);ot($(h),ne),Ke()?.render(),Fe(),Je()}function Fe(){let h=new Map;for(let d of T.queue_groups)h.set(d.root_dir,d.auto_advance);for(let d of Array.from(ne.querySelectorAll(".worker-wait__area--parallel .worker-mini__repo"))){let _=d.closest(".mon2-item")?.getAttribute("data-root-dir")||"",S=h.get(_);typeof S=="boolean"&&d.setAttribute("title",`${d.textContent||""} \xB7 ${S?"\uC790\uB3D9\uD654 \uCF1C\uC9D0":"\uC790\uB3D9\uD654 \uAEBC\uC9D0"}`)}}function Ke(){if(ge)return ge;let h=ne.querySelector(".mon2-deck");return h?(ge=Dp(h,{workspacesState:()=>o&&o.getWorkspacesState?o.getWorkspacesState():[],doneItems:()=>T.done,rangeLabel:Re,transport:s,implPresetStore:t.execPresetStore,gotoWorkerTab:kt,onFocusChange:d=>{V=d,Je()}}),ge):null}function Je(){ne.classList.toggle("has-focus",V!==null);for(let h of Array.from(ne.querySelectorAll(".mon2-sec[data-root-dir]")))h.classList.toggle("is-focus",V!==null&&h.getAttribute("data-root-dir")===V);for(let h of Array.from(ne.querySelectorAll(".mon2-item[data-bead-id], .rtile[data-bead-id], .worker-mini[data-bead-id], .worker-card[data-bead-id]"))){let d=Z.get(h.getAttribute("data-bead-id")||"");h.classList.toggle("is-focus",V!==null&&!!d&&d.root_dir===V)}for(let h of Array.from(ne.querySelectorAll(".mon2-crow[data-root-dir]")))h.classList.toggle("is-focus",V!==null&&h.getAttribute("data-root-dir")===V)}function Ue(h,d){let _=i?i():void 0;if(!d||!_||d===_||!a){r(h);return}a(d).then(()=>{r(h)}).catch(S=>{n("workspace switch for %s failed: %o",d,S)})}function kt(h){if(!h)return;let d=i?i():void 0,_=()=>{try{u?.gotoView("worker")}catch(S){n("gotoView(worker) failed: %o",S)}};if(!a||d&&d===h){_();return}a(h).then(_).catch(S=>{n("workspace switch for %s failed: %o",h,S),ye("\uB808\uD3EC \uC804\uD658\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error")})}function qt(h){an(h).then(d=>{ye(d?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",d?"success":"error",1400)})}function yt(h){let d=Z.get(h)||null;return{item:d,root_dir:d?d.root_dir:"",revision:d?d.expected_revision:0}}async function Jt(h,d,_){if(h!=="dep-add")return;let S=T.chain_lanes.find(G=>G.rows.some(Y=>Y.id===d));!S||!S.rows.some(G=>G.id===_)||await ue(G=>sd(S.lane_id,G),"",[{type:h,a:d,b:_}])}function St(){return(o&&o.crossLanes?o.crossLanes():null)??null}async function Ot(h,d){if(h==="run"){await ut(d);return}if(h==="stop"){await Kt(d);return}if(h==="create"){await ue(_=>Ba(null,_),"");return}if(h==="remove"){let _=ad(d,L());if(_!==null&&!f(_))return;await ue(S=>id(d,S),"");return}await ue(_=>h==="confirm"?rd(d,_):od(d,_),"")}function Wt(h){let d=new Map;for(let _ of h.rows){let S=T.owner_of[_.id]||_.root_dir;typeof S!="string"||S.length===0||d.set(S,[...d.get(S)||[],_.id])}return d}async function ut(h){let d=T.chain_lanes.find(Y=>Y.lane_id===h);if(!d||T.cross_lanes_revision===null){le();return}ke();let _=new Map,S=new Map,G=Wt(d);for(let Y of d.rows){if(!Y.unplaced)continue;let ce=T.owner_of[Y.id]||Y.root_dir;if(typeof ce!="string"||ce.length===0){ye(`${Y.id}\uC758 \uB808\uD3EC\uB97C \uC54C \uC218 \uC5C6\uC5B4 \uC801\uC7AC\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4`,"error"),le();return}let Se=S.get(ce)??0;if(await re("worker-queue-place",{bead_id:Y.id,lane:"parallel",index:(T.parallel_raw_length[ce]??0)+Se},ce,_,{bead_id:Y.id})===null){le();return}S.set(ce,Se+1)}for(let[Y,ce]of G)if(await re("worker-queue-arm",{bead_ids:ce,lane_id:h},Y,_,{bead_id:ce[0]})===null){ye("\uC77C\uBD80 \uB808\uD3EC\uC5D0\uC11C \uC9C4\uD589\uC744 \uCF1C\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 \u2014 [\u25B6 \uC774\uC5B4\uC11C \uC9C4\uD589]\uC73C\uB85C \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC138\uC694","error"),le();return}le()}async function Kt(h){let d=T.chain_lanes.find(S=>S.lane_id===h);if(!d||T.cross_lanes_revision===null){le();return}ke();let _=new Map;for(let[S,G]of Wt(d))if(await re("worker-queue-disarm",{lane_id:h},S,_,{bead_id:G[0]})===null)break;le()}async function Yt(h,d){let{root_dir:_,revision:S}=yt(h);if(_.length===0){le();return}await re("worker-queue-disarm",{bead_ids:[h],lane_id:d},_,new Map([[_,S]]),{bead_id:h}),le()}async function zt(h,d){let _=Z.get(h);if(!_){le();return}let S={kind:"candidate",bead_id:h,root_dir:_.root_dir};if(d==="new-lane"){await ue(G=>Ba({bead_id:h,root_dir:_.root_dir},G),h);return}if(d.startsWith("lane:")){let G=d.slice(5);if(!T.chain_lanes.find(ce=>ce.lane_id===G)){le();return}await ue(ce=>_i(S,{kind:"chain",lane_id:G,marker_index:(ce.cross_lanes.get(G)?.entries??[]).length},ce),h);return}if(d.startsWith("serial:")){let G=d.slice(7),Y=(_.place_lanes||[]).find(ce=>ce.id===G);await et(S,{kind:"repo-serial",root_dir:_.root_dir,lane_id:G,index:Y?Y.index:0});return}await et(S,{kind:"parallel",marker_index:T.parallel_rows.length})}async function mn(h,d){let _=T.parallel_rows,S=_.findIndex(rt=>rt.id===h);if(S<0)return;let G=_[S].root_dir,Y=[];_.forEach((rt,vt)=>{rt.root_dir===G&&Y.push(vt)});let ce=Y.indexOf(S),Se=Y[ce+d];if(typeof Se!="number")return;let Ye=d===-1?Se:Y[ce+2]??Math.min(_.length,Se+1);await et({kind:"parallel",bead_id:h,root_dir:G,queue_index:_[S].queue_index??0},{kind:"parallel",marker_index:Ye})}async function jt(h){for(let d of T.chain_lanes){let _=d.rows.find(S=>S.id===h);if(_){await et({kind:"chain",bead_id:h,root_dir:_.root_dir,lane_id:d.lane_id,...typeof _.queue_index=="number"?{queue_index:_.queue_index}:{}},{kind:"parallel",marker_index:T.parallel_rows.length});return}}}function en(h){return{runner:h.runner||void 0,model:h.model||void 0,effort:h.effort||void 0,status:h.run_state==="running"?"running":h.run_state,worktree:h.root_dir}}function Ht(h,d){let{item:_,root_dir:S,revision:G}=yt(d),Y=_?.attempt_id||"",ce=h.classList;if(ce.contains("worker-mini__rowops-up")||ce.contains("worker-mini__rowops-down")){mn(d,ce.contains("worker-mini__rowops-up")?-1:1);return}if(ce.contains("worker-mini__rowops-remove")){pe("worker-queue-remove",{bead_id:d},S,G);return}if(ce.contains("mon2-crow__detach")){jt(d);return}if(ce.contains("worker-dep__open")){Ue(h.getAttribute("data-dep-id")||"",h.getAttribute("data-root-dir")||"");return}if(ce.contains("mon2-arm__release")){Yt(d,h.getAttribute("data-lane-id")||"");return}if(ce.contains("mon-lane__chip")){let Se=h.getAttribute("data-lane-id")||"";ne.querySelector(`.mon2-clane[data-lane-id="${Se}"]`)?.scrollIntoView({block:"nearest"});return}if(ce.contains("judgement-chip")){let Se=h.getAttribute("data-chip-key")||"";Se&&F.toggle({bead_id:d,chip_key:Se});return}if(ce.contains("rtile__failure-badge")){I=I===Y?null:Y,le();return}if(ce.contains("rtile__attempt-copy")){let Se=h.getAttribute("data-attempt-id")||"";Se&&an(Se).then(Ye=>{ye(Ye?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",Ye?"success":"error",1400)});return}if(ce.contains("worker-card__place")){C=C===d?null:d,le();return}if(ce.contains("worker-card__place-cancel")){C=null,le();return}if(ce.contains("worker-card__place-lane")){let Se=h.getAttribute("data-lane")||"parallel";C=null,zt(d,Se);return}if(ce.contains("rtile__session")){if(_&&_.kind==="session"){let Se=(_.session_refs||[]).find(Ye=>Ye&&Ye.current===!0);Se&&(D.hidden=!1,Oe.open(Yr(Se,d,"in_progress",S)),le());return}q=Y,Y&&_&&(D.hidden=!1,Oe.open({attempt_id:Y,root_dir:S,meta:en(_)})),le();return}if(ce.contains("rtile__pause")){Qe("worker-attempt-pause",{attempt_id:Y},S);return}if(ce.contains("rtile__resume")){Kr().then(Se=>{if(Se!==null)return _e("worker-attempt-resume",{attempt_id:Y,...Se!==""?{instructions:Se}:{}},S,G)});return}if(ce.contains("rtile__parked-retry")){Qe("worker-parked-retry",{bead_id:d,attempt_id:Y},S).then(Se=>{Se&&Se.ok===!1&&ye(`\uC7AC\uC2DC\uB3C4 \uAC70\uBD80: ${Se.reason==="not_latest"?"\uC774 bead\uC5D0 \uB354 \uC0C8\uB85C\uC6B4 \uC2DC\uB3C4\uAC00 \uC788\uC2B5\uB2C8\uB2E4":Se.reason||""}`,"error")});return}if(ce.contains("rtile__discard")){let Se=h.dataset.confirmation==="merged"?"merged":"unmerged";if(!f(Lo(d,Se)))return;We({bead_id:d,...Y?{attempt_id:Y}:{},...h.dataset.operationId?{operation_id:h.dataset.operationId}:{}},S,G);return}if(ce.contains("worker-mini__merge")){let Se=Ce(S,d);Se?.mismatch&&Se.continuation===null?xe(S,d,G,Se.mismatch):pe("worker-merge-queue-add",{bead_id:d},S,G);return}if(ce.contains("worker-mini__merge-cancel")){pe("worker-merge-queue-remove",{bead_id:d},S,G);return}if(ce.contains("worker-mini__discard")){let Se=h.dataset.discardMode==="merged"?"merged":"unmerged";if(!f(Lo(d,Se)))return;We({bead_id:d,...h.dataset.attemptId?{attempt_id:h.dataset.attemptId}:{},...h.dataset.operationId?{operation_id:h.dataset.operationId}:{}},S,G);return}if(ce.contains("worker-mini__revise-fix")){_e("worker-revise-fix",{bead_id:d},S,G);return}ce.contains("worker-mini__revise-approve")&&pe("worker-revise-approve",{bead_id:d},S,G)}function nn(h){let d=Ge.consumeClickSuppression(),_=h.target;if(!_||typeof _.closest!="function"||_.closest("dialog")||_.closest(".worker-drawer-overlay")||_.closest("a"))return;let S=_.closest(".worker-card__id, .worker-mini__id, .rtile__id");if(S){h.preventDefault();let Pe=_.closest(".mon2-item, .rtile, .mon2-crow, .worker-mini")?.getAttribute("data-bead-id")||S.textContent?.trim()||"";Pe&&qt(Pe);return}let G=_.closest(".worker-mini__repo, .worker-card__repo, .mon2-sec__worker");if(G){h.preventDefault();let A=G.getAttribute("data-root-dir")||Z.get(_.closest(".mon2-item, .rtile, .worker-mini")?.getAttribute("data-bead-id")||"")?.root_dir||G.getAttribute("title")||"";kt(A);return}let Y=_.closest(".mon2-sec__toggle");if(Y){h.preventDefault(),U(Y.getAttribute("data-root-dir")||"");return}let ce=_.closest(".worker-pane__toggle[data-lane]");if(ce){h.preventDefault();let A=ce.getAttribute("data-lane")||"";(A==="candidate"||A==="queue"||A==="running"||A==="pr_wait"||A==="done")&&Ae(A);return}let Se=_.closest(".worker-wait__area-toggle[data-area]");if(Se){h.preventDefault(),lt(Se.getAttribute("data-area")||"parallel");return}if(_.closest(".mon2-newlane")){h.preventDefault(),Ot("create","");return}let Ye=_.closest(".mon2-clane__confirm, .mon2-clane__reapply, .mon2-clane__remove, .mon2-clane__run, .mon2-clane__stop");if(Ye){h.preventDefault();let A=Ye.getAttribute("data-lane-id")||"",Pe=Ye.classList;Ot(Pe.contains("mon2-clane__confirm")?"confirm":Pe.contains("mon2-clane__reapply")?"reapply":Pe.contains("mon2-clane__run")?"run":Pe.contains("mon2-clane__stop")?"stop":"remove",A);return}if(_.closest(".mon-merge-all")){h.preventDefault(),qe();return}let rt=_.closest(".mon-filter__spec");if(rt){h.preventDefault(),k={...k,spec:rt.getAttribute("data-spec")||"all"},Mp(k),le();return}let vt=_.closest(".mon2-item, .rtile, .mon2-crow, .worker-mini, .worker-card");if(!vt)return;let gt=vt.getAttribute("data-bead-id")||"",x=_.closest("button");if(x){h.preventDefault(),Ht(x,gt);return}_.closest(".rtile__failure-pop, .chip-popover")||gt&&!d&&(h.preventDefault(),Ue(gt,vt.getAttribute("data-root-dir")||yt(gt).root_dir))}function fe(h){let d=h.target;if(!d||typeof d.closest!="function")return;let _=d.closest(".mon-filter__blocked");if(_){k={...k,show_blocked:_.checked},Mp(k),le();return}let S=d.closest(".mon-candidate-sort");if(S){R=No.some(ce=>ce.value===S.value)?S.value:"repo_spec",Ay(R),le();return}let G=d.closest(".mon-running-sort");if(G){m=G.value==="repo"?"repo":"started",Oy(m),le();return}let Y=d.closest(".mon-done-range");Y&&(g=Dn(Y.value),Cy(g),le())}function E(h){let d=h.target,_=d&&typeof d.closest=="function"?S=>d.closest(S):()=>null;I&&!_(".rtile__failure-pop, .rtile__failure-badge")&&(I=null,le())}function me(h){h.key!=="Escape"||I===null||(I=null,le())}e.addEventListener("click",nn),e.addEventListener("change",fe),document.addEventListener("click",E),document.addEventListener("keydown",me),F.attach(),Ge.attach(e);{let h=!0;j=Li(d=>{if(se=d,h){h=!1;return}le()})}o&&typeof o.subscribe=="function"&&(he=o.subscribe(()=>{try{we.clear(),le()}catch{}}));function De(){Te!==null&&(clearInterval(Te),Te=null)}return{recorrectSharedLane:Jt,load(){n("load"),le(),Te===null&&(Te=setInterval(()=>{try{le()}catch{}},Iy))},pause(){De()},clear(){De(),Ge.detach(),he&&(he(),he=null),j&&(j(),j=null),Oe.destroy(),D.hidden=!0,ge?.destroy(),ge=null,e.removeEventListener("click",nn),e.removeEventListener("change",fe),document.removeEventListener("click",E),document.removeEventListener("keydown",me),F.detach(),e.replaceChildren()}}}function Gp(e,t,n){let r=It("views:nav"),{global_element:o,repo_element:s}=e,i=null;function l(g){return m=>{m.preventDefault();let k=g==="monitor"&&a()==="monitor"?"worker":g;r("click tab %s",k),n.gotoView(k)}}function a(){let g=t.getState();return g.view==="worker"||g.view==="monitor"?g.view:"board"}function u(){let g=a();return c`
      <a
        href="#/monitor"
        class="ctl-tab ctl-tab--monitor ${g==="monitor"?"is-active":""}"
        @click=${l("monitor")}
      >
        <span class="ctl-tab__dots" aria-hidden="true"
          ><i></i><i></i><i></i><i></i
        ></span>
        Monitor
      </a>
    `}function p(){let g=a();return c`
      <div class="ctl-tabs">
        <a
          href="#/board"
          class="ctl-tab ${g==="board"?"is-active":""}"
          @click=${l("board")}
          >Board</a
        >
        <a
          href="#/worker"
          class="ctl-tab ${g==="worker"?"is-active":""}"
          @click=${l("worker")}
          >Worker</a
        >
      </div>
    `}function f(){o&&ot(u(),o),s&&ot(p(),s)}return f(),i=t.subscribe(()=>f()),{destroy(){i&&(i(),i=null),o&&ot(c``,o),s&&ot(c``,s)}}}var Kp=["bug","feature","task","epic","chore"];function Yp(e){switch((e||"").toString().toLowerCase()){case"bug":return"Bug";case"feature":return"Feature";case"task":return"Task";case"epic":return"Epic";case"chore":return"Chore";default:return""}}var Vp=["Critical","High","Medium","Low","Backlog"];function Xp(e,t){let n=document.createElement("dialog");n.id="new-issue-dialog",n.setAttribute("role","dialog"),n.setAttribute("aria-modal","true"),n.innerHTML=`
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
  `,e.appendChild(n);let r=n.querySelector("#new-issue-form"),o=n.querySelector("#new-title"),s=n.querySelector("#new-type"),i=n.querySelector("#new-priority"),l=n.querySelector("#new-labels"),a=n.querySelector("#new-description"),u=n.querySelector("#new-issue-error"),p=n.querySelector("#btn-cancel"),f=n.querySelector("#btn-create"),g=n.querySelector(".new-issue__close");function m(){s.replaceChildren();let C=document.createElement("option");C.value="",C.textContent="\u2014 Select \u2014",s.appendChild(C);for(let I of Kp){let F=document.createElement("option");F.value=I,F.textContent=Yp(I),s.appendChild(F)}i.replaceChildren();for(let I=0;I<=4;I+=1){let F=document.createElement("option");F.value=String(I);let V=Vp[I]||"Medium";F.textContent=`${I} \u2013 ${V}`,i.appendChild(F)}}m();function k(){try{typeof n.close=="function"?n.close():n.removeAttribute("open")}catch{n.removeAttribute("open")}}function R(C){o.disabled=C,s.disabled=C,i.disabled=C,l.disabled=C,a.disabled=C,p.disabled=C,f.disabled=C,f.textContent=C?"Creating\u2026":"Create"}function B(){u.textContent=""}function X(C){u.textContent=C}function se(){try{let C=window.localStorage.getItem("beads-ui.new.type");C?s.value=C:s.value="";let I=window.localStorage.getItem("beads-ui.new.priority");I&&/^\d$/.test(I)?i.value=I:i.value="2"}catch{s.value="",i.value="2"}}function j(){let C=s.value||"",I=i.value||"";C.length>0&&window.localStorage.setItem("beads-ui.new.type",C),I.length>0&&window.localStorage.setItem("beads-ui.new.priority",I)}async function q(){B();let C=String(o.value||"").trim();if(C.length===0){X("Title is required"),o.focus();return}let I=Number(i.value||"2");if(!(I>=0&&I<=4)){X("Priority must be 0..4"),i.focus();return}let F=String(s.value||""),V=String(a.value||""),Q={title:C};F.length>0&&(Q.type=F),String(I).length>0&&(Q.priority=I),V.length>0&&(Q.description=V),R(!0);try{await t("create-issue",Q)}catch{R(!1),X("Failed to create issue");return}j(),R(!1),k()}return n.addEventListener("cancel",C=>{C.preventDefault(),k()}),g.addEventListener("click",()=>k()),p.addEventListener("click",()=>k()),n.addEventListener("keydown",C=>{C.key==="Enter"&&(C.ctrlKey||C.metaKey)&&(C.preventDefault(),q())}),r.addEventListener("submit",C=>{C.preventDefault(),q()}),{open(){r.reset(),B(),se();try{"showModal"in n&&typeof n.showModal=="function"?n.showModal():n.setAttribute("open","")}catch{n.setAttribute("open","")}setTimeout(()=>{try{o.focus()}catch{}},0)},close(){k()}}}var Dy=[["route","route \uCE69"],["fast_track","\u26A1 fast_track \uCE69"],["pr","PR \uCE69"],["from","\u21A9 from \uCE69"],["blocked","blocked\xB7\uC0AC\uC6A9\uC790 \uB9AC\uBDF0 \uD544\uC694 \uCE69"],["stepper","stepper"]];function My(e,t){return ra(e,t)?"shown":t.hidden_labels.includes(e)?"hidden_exact":"hidden_prefix"}function Qp(e,t,n){return c`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">라벨 표시</div>
      <p class="settings-dialog__hint-block">
        라벨을 눌러 표시/숨김을 전환합니다. prefix 규칙으로 숨겨진 라벨을 누르면
        그 라벨만 예외로 다시 표시됩니다.
      </p>
      ${t.length===0?c`<div class="settings-dialog__empty">라벨 없음</div>`:c`<div class="settings-dialog__pills">
            ${t.map(r=>{let o=My(r,e);return c`<button
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
  `}function Zp(e,t,n){return c`
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
  `}function Jp(e,t){return c`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">카드 표시 요소</div>
      <div class="settings-dialog__toggles">
        ${Dy.map(([n,r])=>c`<label class="settings-dialog__toggle">
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
  `}var Ny=[{id:"execution",label:"\uC2E4\uD589",glyph:"\u25C6"},{id:"display",label:"\uD45C\uC2DC",glyph:"\u25EB"}];function ef(e,t){let{transport:n,policyStore:r,labelOptions:o}=t,s=t.notify||(ee=>ye(ee,"error",4e3)),i=document.createElement("dialog");i.id="settings-dialog",i.className="settings-dialog",i.setAttribute("role","dialog"),i.setAttribute("aria-modal","true"),i.setAttribute("aria-label","\uC124\uC815"),e.appendChild(i);let l="execution",a=!1,u="",p=null;function f(){if(p)return p;let ee=i.querySelector('[data-pane="execution"]');return ee?(p=Fi(ee,{root_dir:null,queue:()=>t.queueStore?.get()??null,transport:n,implPresetStore:t.implPresetStore,notify:s,onQueueAdopt:ke=>t.queueStore?.set?.(ke)}),p):null}function g(){return c`
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
              ${Qp(ee,o(),X)}
              ${Zp(ee,u,{onDraft:ke=>{u=ke},onAdd:se,onRemove:j})}
              ${Jp(ee,q)}
            `:c`<div class="settings-dialog__empty">
              표시 정책을 불러오는 중…
            </div>`}
      </section>
    `}async function k(ee){let ke=r.get();if(ke)try{let Re=await n("display-policy-set",{expected_revision:ke.revision,policy:ee(ke)});R(Re),Re&&Re.conflict&&Re.policy&&(Re=await n("display-policy-set",{expected_revision:Re.policy.revision,policy:ee(Re.policy)}),R(Re)),Re&&Re.conflict&&s("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC")}catch{s("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328")}}function R(ee){ee&&ee.policy&&typeof ee.policy=="object"&&r.set(ee.policy)}function B(ee){k(ee)}function X(ee){let ke=r.get();if(!ke)return;let Re=!qy(ee,ke);B(ne=>jy(ee,ne,Re))}function se(){let ee=u.trim();ee.length!==0&&(u="",B(ke=>ke.hidden_prefixes.includes(ee)?{hidden_prefixes:ke.hidden_prefixes}:{hidden_prefixes:[...ke.hidden_prefixes,ee]}),C())}function j(ee){B(ke=>({hidden_prefixes:ke.hidden_prefixes.filter(Re=>Re!==ee)}))}function q(ee){let ke=r.get();if(!ke)return;let Re=ke.chips[ee]===!1;B(()=>({chips:{[ee]:Re}}))}function C(){ot(c`
        <div class="settings-dialog__container">
          <nav
            class="settings-dialog__rail"
            role="tablist"
            aria-orientation="vertical"
          >
            <div class="settings-dialog__rail-title">설정</div>
            ${Ny.map(ee=>c`<button
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
              @click=${H}
            >
              닫기
            </button>
          </nav>
          <div class="settings-dialog__panes">
            ${g()} ${m()}
          </div>
        </div>
      `,i),f()}function I(ee){l=ee,C()}let F=()=>{a=!1,t.onOpenChange?.(!1)};i.addEventListener("close",F),i.addEventListener("cancel",F);let V=ee=>{ee.target===i&&H()};i.addEventListener("click",V);let Q=null;r.subscribe&&(Q=r.subscribe(()=>{a&&C()}));let P=null;t.implPresetStore?.subscribe&&(P=t.implPresetStore.subscribe(()=>{a&&p?.render()}));function K(ee="execution"){a||(a=!0,t.onOpenChange?.(!0),l=ee,u="",C(),typeof i.showModal=="function"?i.showModal():i.setAttribute("open",""),f()?.load())}function H(){a&&(a=!1,t.onOpenChange?.(!1),typeof i.close=="function"?i.close():i.removeAttribute("open"))}return{open:K,close:H,sessionDraft:()=>p?.sessionDraft()??{},destroy(){a=!1,i.removeEventListener("close",F),i.removeEventListener("cancel",F),i.removeEventListener("click",V),Q&&(Q(),Q=null),P&&(P(),P=null),p?.destroy(),p=null,i.remove()}}}function qy(e,t){return t.visible_labels.includes(e)?!0:t.hidden_labels.includes(e)?!1:!t.hidden_prefixes.some(n=>n.length>0&&e.startsWith(n))}function jy(e,t,n){if(!n)return{hidden_labels:t.hidden_labels.includes(e)?t.hidden_labels:[...t.hidden_labels,e],visible_labels:t.visible_labels.filter(s=>s!==e)};let r=t.hidden_labels.filter(s=>s!==e);return t.hidden_prefixes.some(s=>s.length>0&&e.startsWith(s))?{hidden_labels:r,visible_labels:t.visible_labels.includes(e)?t.visible_labels:[...t.visible_labels,e]}:{hidden_labels:r}}var Fy=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],tf="usage-meter-card",By="usage-meter-layer",$l=600,Uy=["token_expired","relogin_required"];function nf(e){return String(e).padStart(2,"0")}function Wy(e,t){let n=Math.max(0,Math.ceil((e-t)/6e4)),r=Math.floor(n/1440),o=Math.floor(n%1440/60),s=n%60;return r>0?`${r}d${o>0?` ${o}h`:""}`:o>0?`${o}h${s>0?` ${s}m`:""}`:`${s}m`}function rf(e,t=Date.now()){let n=Date.parse(e);if(!Number.isFinite(n))return"";let r=new Date(n),o=new Date(t),s=`${nf(r.getHours())}:${nf(r.getMinutes())}`,l=r.getFullYear()===o.getFullYear()&&r.getMonth()===o.getMonth()&&r.getDate()===o.getDate()?s:`${Fy[r.getMonth()]} ${r.getDate()} ${s}`;return`${Wy(n,t)} \xB7 ${l}`}function zy(e){let t=Math.max(0,Math.floor(e));return t<60?`${t}\uCD08 \uC804`:t<3600?`${Math.floor(t/60)}\uBD84 \uC804`:`${Math.floor(t/3600)}\uC2DC\uAC04 \uC804`}function of(e){return e>=85?"usage-meter__window--danger":e>=60?"usage-meter__window--warn":"usage-meter__window--success"}function sf(e){let t=typeof e=="number"&&Number.isFinite(e)?e:0;return Math.min(100,Math.max(0,t))}var af=[{key:"claude",label:"Claude",endpoint:"/api/claude-usage",switch_endpoint:"/api/claude-account/switch",tool:"cswap"},{key:"codex",label:"Codex",endpoint:"/api/codex-usage",switch_endpoint:"/api/codex-account/switch",tool:"codex-auth"}];function cf(e){let t=[];for(let n of e){if(!n||typeof n!="object")continue;let r=n;typeof r.key!="string"||r.key.length===0||typeof r.pct!="number"||!Number.isFinite(r.pct)||t.push({key:r.key,pct:r.pct,resetsAt:typeof r.resetsAt=="string"?r.resetsAt:""})}return t}function Hy(e){if(!e||typeof e!="object")return null;let t=e;return!Number.isInteger(t.number)||t.number<=0||typeof t.email!="string"||t.email.length===0||typeof t.status!="string"||t.status.length===0||typeof t.active!="boolean"||!Array.isArray(t.windows)?null:{number:t.number,email:t.email,alias:typeof t.alias=="string"&&t.alias.length>0?t.alias:null,plan:typeof t.plan=="string"&&t.plan.length>0?t.plan:null,active:t.active,status:t.status,windows:cf(t.windows),fetchedAt:typeof t.fetchedAt=="string"?t.fetchedAt:null,ageSeconds:typeof t.ageSeconds=="number"&&Number.isFinite(t.ageSeconds)?t.ageSeconds:null}}function Gy(e,t){if(!e||typeof e!="object")return null;let n=e,r=[];if(Array.isArray(n.accounts))for(let s of n.accounts){let i=Hy(s);i&&r.push(i)}let o=n.available===!0&&Array.isArray(n.windows);return!o&&r.length===0?null:{available:o,windows:o?cf(n.windows):[],ageSeconds:typeof n.ageSeconds=="number"&&Number.isFinite(n.ageSeconds)?n.ageSeconds:null,accounts:r,receivedAtMs:t,held:!1}}function Ky(e,t){if(!e||typeof e!="object")return{kind:"error"};let n=Gy(e,t);return n?{kind:"ok",snapshot:n}:Array.isArray(e.accounts)?{kind:"empty"}:{kind:"error"}}function uf(e,t){return(e.ageSeconds===null?0:e.ageSeconds)+Math.max(0,t-e.receivedAtMs)/1e3}function Yy(e,t){return!e.held||uf(e,t)<=$l?e:{...e,available:!1,windows:[],accounts:[]}}function lf(e,t){return`${e}:${t}`}function df(e){let t=!1,n=null,r=new Map,o=null,s=new Map,i=new Map,l=0,a=null;function u(){ot(c``,e),e.hidden=!0,f()}function p(){if(a===null){let ne=e.ownerDocument;a=ne.createElement("div"),a.id=By,a.className="usage-meter__layer",ne.body.appendChild(a)}return a}function f(){a!==null&&(ot(c``,a),a.remove(),a=null)}function g(ne){n!==ne&&(n===null&&(document.addEventListener("mousedown",k),document.addEventListener("keydown",B),window.addEventListener("resize",R)),n=ne)}function m(){n!==null&&(n=null,document.removeEventListener("mousedown",k),document.removeEventListener("keydown",B),window.removeEventListener("resize",R))}function k(ne){let D=ne.target;D&&(e.contains(D)||a!==null&&a.contains(D))||(m(),H())}function R(){H()}function B(ne){ne.key==="Escape"&&(m(),H())}function X(ne){n===ne?m():g(ne),H()}function se(){m(),H()}async function j(ne,D){if(r.has(ne.key))return;let ve=lf(ne.key,D);r.set(ne.key,D),i.delete(ve),H();let Ee=null;try{Ee=await(await fetch(ne.switch_endpoint,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({number:D})})).json()}catch{Ee=null}if(t)return;if(r.delete(ne.key),!Ee||Ee.ok!==!0){let Z=Ee&&typeof Ee.error=="string"&&Ee.error.length>0?Ee.error:"network_error";i.set(ve,{kind:"error",text:`\uC804\uD658 \uC2E4\uD328 \u2014 ${Z}`}),H();return}let T=Array.isArray(Ee.warnings)?Ee.warnings.filter(Z=>typeof Z=="string"&&Z.length>0):[];T.length>0&&i.set(ve,{kind:"warn",text:T.join(" \xB7 ")}),H(),await Re()}function q(ne,D,ve,Ee){let T=sf(ne.pct),we=`resets ${rf(ne.resetsAt,Ee)}${D?` \xB7 ${ve}`:""}`;return c`<span
      class="usage-meter__window ${of(T)}"
      style=${`--progress: ${T}%`}
      title=${we}
    >
      <span class="usage-meter__label">${ne.key}</span>
      <span class="usage-meter__track" aria-hidden="true">
        <span class="usage-meter__fill"></span>
      </span>
      <span class="usage-meter__pct">${T}%</span>
    </span>`}function C(ne,D,ve){let Ee=uf(D,ve),T=D.available&&(D.held||Ee>$l),Z=T?`${Math.floor(Ee/60)}\uBD84 \uC804 \uCE21\uC815`:"",we=D.accounts.filter(Oe=>!Oe.active).length,he=`usage-meter__group${T?" usage-meter__group--stale":""}`,Te=c`<span class="usage-meter__provider"
        >${ne.label}</span
      >
      ${D.available?D.windows.map(Oe=>q(Oe,T,Z,ve)):c`<span class="usage-meter__empty">사용량 없음</span>`}
      ${we>0?c`<span class="usage-meter__badge">+${we}</span>`:""}`;if(D.accounts.length===0)return c`<span
        class=${he}
        aria-label=${`${ne.label} usage`}
        >${Te}</span
      >`;let ge=n===ne.key;return c`<button
      type="button"
      class=${`usage-meter__toggle ${he}`}
      aria-label=${`${ne.label} usage`}
      aria-expanded=${ge?"true":"false"}
      aria-controls=${tf}
      @click=${()=>X(ne.key)}
    >
      ${Te}
    </button>`}function I(ne,D){return c`<span class="usage-meter" aria-label="Usage">
      ${ne.map(ve=>C(ve.provider,ve.snapshot,D))}
    </span>`}function F(ne,D){let ve=sf(ne.pct),Ee=rf(ne.resetsAt,D);return c`<span
      class="usage-meter__account-window ${of(ve)}"
      style=${`--progress: ${ve}%`}
    >
      <span class="usage-meter__account-key">${ne.key}</span>
      <span class="usage-meter__account-track" aria-hidden="true">
        <span class="usage-meter__account-fill"></span>
      </span>
      <span class="usage-meter__account-pct">${ve}%</span>
      <span class="usage-meter__account-reset"
        >${Ee.length>0?`\u21BB ${Ee}`:""}</span
      >
    </span>`}function V(ne,D){return Uy.includes(D)?`\uD1A0\uD070 \uB9CC\uB8CC \u2014 ${ne.tool} \uC7AC\uB85C\uADF8\uC778 \uD544\uC694`:"\uC0AC\uC6A9\uB7C9 \uC5C6\uC74C"}function Q(ne,D,ve){let Ee=D.status==="ok",T=typeof D.ageSeconds=="number"&&D.ageSeconds>$l,Z=i.get(lf(ne.key,D.number)),we=r.get(ne.key),he=we!==void 0,Te=we===D.number,ge=["usage-meter__account"];return D.active&&ge.push("usage-meter__account--active"),Ee||ge.push("usage-meter__account--unavailable"),T&&ge.push("usage-meter__account--stale"),c`<div class=${ge.join(" ")}>
      <div class="usage-meter__account-head">
        <span class="usage-meter__account-label" title=${D.email}
          >${D.alias===null?D.email:D.alias}</span
        >
        ${D.plan===null?"":c`<span class="usage-meter__account-tag">${D.plan}</span>`}
        ${D.active?c`<span
              class="usage-meter__account-tag usage-meter__account-tag--active"
              >active</span
            >`:""}
        ${D.ageSeconds===null?"":c`<span class="usage-meter__account-age"
              >${zy(D.ageSeconds)}</span
            >`}
        ${D.active?"":c`<button
              type="button"
              class="usage-meter__switch"
              ?disabled=${he}
              @click=${()=>{j(ne,D.number)}}
            >
              ${Te?"\uC804\uD658 \uC911\u2026":"\uC804\uD658"}
            </button>`}
      </div>
      ${Ee?c`<div class="usage-meter__account-windows">
            ${D.windows.map(Oe=>F(Oe,ve))}
          </div>`:c`<div class="usage-meter__account-status">
            ${V(ne,D.status)}
          </div>`}
      ${Z===void 0?"":c`<div
            class="usage-meter__account-message usage-meter__account-message--${Z.kind}"
          >
            ${Z.text}
          </div>`}
    </div>`}function P(ne,D,ve){let Ee=D.accounts.filter(T=>T.active).length;return c`<section class="usage-meter__section">
      <h2 class="usage-meter__section-title">
        ${ne.label} · 활성 ${Ee} / 전체
        ${D.accounts.length}
      </h2>
      ${D.accounts.map(T=>Q(ne,T,ve))}
    </section>`}function K(ne,D){return c`<div
      class="usage-meter__card"
      id=${tf}
      role="dialog"
      aria-label=${`${ne.provider.label} \uACC4\uC815 \uC0AC\uC6A9\uB7C9`}
    >
      ${P(ne.provider,ne.snapshot,D)}
      <p class="usage-meter__note">전환은 새로 시작하는 세션부터 적용됩니다.</p>
    </div>`}function H(){let ne=Date.now(),D=[];for(let Ee of af){let T=s.get(Ee.key);T&&D.push({provider:Ee,snapshot:Yy(T,ne)})}if(D.length===0){m(),u();return}let ve=D.find(Ee=>Ee.provider.key===n&&Ee.snapshot.accounts.length>0);ve||m(),ot(I(D,ne),e),e.hidden=!1,ve?ee(ve,ne):f()}function ee(ne,D){let ve=p(),Ee=e.getBoundingClientRect(),T=e.ownerDocument.documentElement.clientWidth;ve.style.setProperty("--usage-meter-anchor-top",`${Ee.bottom}px`),ve.style.setProperty("--usage-meter-anchor-right",`${Math.max(0,T-Ee.right)}px`),ot(c`<div
          class="usage-meter__scrim"
          aria-hidden="true"
          @mousedown=${se}
        ></div>
        ${K(ne,D)}`,ve)}async function ke(ne){try{let D=await fetch(ne.endpoint);return D.ok?Ky(await D.json(),Date.now()):{kind:"error"}}catch{return{kind:"error"}}}async function Re(){l+=1;let ne=l,D=await Promise.all(af.map(async ve=>({provider:ve,read:await ke(ve)})));if(!(t||ne!==l)){for(let ve of D){let Ee=ve.provider.key;if(ve.read.kind==="ok"){s.set(Ee,ve.read.snapshot);continue}if(ve.read.kind==="empty"){s.delete(Ee);continue}let T=s.get(Ee);T!==void 0&&!T.held&&s.set(Ee,{...T,held:!0})}H()}}return u(),Re(),o=setInterval(()=>{Re()},6e4),{destroy(){t=!0,o!==null&&(clearInterval(o),o=null),m(),u()}}}function os(e){let t=e?.blocked_info;return t&&typeof t=="object"?Array.isArray(t.blockers)?t.blockers.filter(r=>typeof r=="string"&&r.length>0):[]:(Array.isArray(e?.dependencies)?e.dependencies:[]).map(r=>{if(typeof r=="string")return r;if(!r||typeof r!="object")return"";let o=r.type??r.dependency_type;return o!==void 0&&o!=="blocks"?"":r.depends_on_id||r.id||""}).filter(Boolean)}var _f="bdui.worker.candidate_sort",ss=Object.freeze([{id:"spec",label:"spec \uC6B0\uC120",chain:[{key:"spec",dir:"desc"},{key:"created",dir:"asc"}]},{id:"bottleneck",label:"\uBCD1\uBAA9 \uC6B0\uC120",chain:[{key:"priority",dir:"asc"},{key:"dependents",dir:"desc"},{key:"released",dir:"desc"}]},{id:"created",label:"\uCD5C\uC2E0 \uC0DD\uC131",chain:[{key:"created",dir:"desc"},{key:"priority",dir:"asc"}]},{id:"updated",label:"\uCD5C\uC2E0 \uC218\uC815",chain:[{key:"updated",dir:"desc"}]}]),Ui=Object.freeze({preset:"spec"}),mf=3,gf=Object.freeze([{key:"priority",label:"\uC6B0\uC120\uC21C\uC704"},{key:"dependents",label:"\uD6C4\uC18D \uC218"},{key:"released",label:"\uD574\uC81C \uC2DC\uAC01"},{key:"spec",label:"spec \uC720\uBB34"},{key:"created",label:"\uC0DD\uC131"},{key:"updated",label:"\uC218\uC815"}]);function pf(e){return ss.some(t=>t.id===e)}function ff(e){let t=ss.find(n=>n.id===e);return t?t.chain.map(n=>({...n})):[]}function Vy(e,t){return e.length===t.length&&e.every((n,r)=>n.key===t[r].key&&n.dir===t[r].dir)}function is(e){return e&&"preset"in e?ff(e.preset):e&&Array.isArray(e.chain)?e.chain.map(t=>({...t})):ff("spec")}function xl(e){return e&&"preset"in e?e.preset:null}function Dr(e){if(typeof e=="string"){let s;try{s=JSON.parse(e)}catch{return pf(e)?{preset:e}:Ui}return Dr(s)}if(!e||typeof e!="object")return Ui;let t=e;if(pf(t.preset))return{preset:t.preset};let n=t.chain;if(!Array.isArray(n)||n.length===0||n.length>mf||!n.every(Ji))return Ui;let r=[];for(let s of n)r.some(i=>i.key===s.key)||r.push({key:s.key,dir:s.dir});let o=ss.find(s=>Vy(s.chain,r));return o?{preset:o.id}:{chain:r}}function hf(){try{return Dr(window.localStorage.getItem(_f))}catch{return Ui}}function Al(e){try{window.localStorage.setItem(_f,JSON.stringify(e))}catch{}}function bf(e,t,n){let r=e.map(a=>({...a}));if(!n)return r.slice(0,t);if(!Object.prototype.hasOwnProperty.call(ks,n))return r;let o=n;if(r.slice(0,t).some(a=>a.key===o))return r.slice(0,t);let s={key:o,dir:r[t]&&r[t].key===o?r[t].dir:ks[o]},i=r.slice(0,t),l=r.slice(t+1).filter(a=>a.key!==o);return[...i,s,...l].slice(0,mf)}function yf(e,t){return e.map((n,r)=>r===t?{key:n.key,dir:n.dir==="asc"?"desc":"asc"}:{...n})}function Xy(e){let t=new Set(e.map(l=>l.id)),n=new Map,r=new Map;for(let l of e){let a=os(l).filter(u=>t.has(u));n.set(l.id,a);for(let u of a){let p=r.get(u);p?p.push(l):r.set(u,[l])}}let o=new Set,s=[],i=l=>{o.add(l.id),s.push(l);for(let a of r.get(l.id)??[])!o.has(a.id)&&(n.get(a.id)??[]).every(u=>o.has(u))&&i(a)};for(;s.length<e.length;){let l=e.find(a=>!o.has(a.id)&&(n.get(a.id)??[]).every(u=>o.has(u)));i(l??e.find(a=>!o.has(a.id)))}return s}function vf(e,t){let n=Array.isArray(e)?e.slice():[];return n.sort(pc(is(t))),Xy(n)}function wf(e,t){let n=new Map;if(!e||typeof e!="object")return n;let r=e,o=[],s=new Set;for(let i of t){if(s.has(i.id))continue;s.add(i.id);let l=r[i.id];if(!l||!Array.isArray(l.scope))continue;let a=l.scope.filter(u=>typeof u=="string"&&u.length>0);if(a.length===0){n.set(i.id,{overlaps:[],scope_missing:!0});continue}n.set(i.id,{overlaps:[],scope_missing:!1}),o.push({member:i,scope:a})}for(let i=0;i<o.length;i+=1)for(let l=i+1;l<o.length;l+=1){let a=Hs(o[i].scope,o[l].scope);if(a.length===0)continue;let u=o[i].member,p=o[l].member;n.get(u.id)?.overlaps.push({id:p.id,title:p.title,location_label:p.location_label,prefixes:a}),n.get(p.id)?.overlaps.push({id:u.id,title:u.title,location_label:u.location_label,prefixes:a})}return n}var kf=new Set(["sh","bash","zsh","dash","ksh"]),$f=/('(?:[^']*)'|"(?:\\.|[^"\\])*"|#.*|\$(?:\{[^}\n]*\}|[A-Za-z_][A-Za-z0-9_]*|[?#@*!$0-9-])|\b(?:if|then|else|elif|fi|for|while|until|do|done|case|esac|in|function|select|time)\b)/g;function xf(e){let t=e.split("/");return t[t.length-1]||""}function Qy(e){let t=e.split(`
`,1)[0];if(!t.startsWith("#!"))return!1;let n=t.slice(2).trim().split(/\s+/).filter(Boolean);if(n.length===0)return!1;let r=xf(n[0]);if(r!=="env")return kf.has(r);let o=n.slice(1).find(s=>!s.startsWith("-")&&!s.includes("="));return o!==void 0&&kf.has(xf(o))}function Zy(e){return e.startsWith("#")?"comment":e.startsWith("'")||e.startsWith('"')?"string":e.startsWith("$")?"variable":"keyword"}function Jy(e){let t=[],n=0;$f.lastIndex=0;for(let r of e.matchAll($f)){let o=r.index;o>n&&t.push({text:e.slice(n,o),kind:"plain"}),t.push({text:r[0],kind:Zy(r[0])}),n=o+r[0].length}return n<e.length&&t.push({text:e.slice(n),kind:"plain"}),t.length===0&&t.push({text:e,kind:"plain"}),t}function ev(e){return{bad_request:"\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD\uC774 \uC62C\uBC14\uB974\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.",forbidden:"\uB4F1\uB85D\uB418\uC9C0 \uC54A\uC740 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uC758 \uC2A4\uD06C\uB9BD\uD2B8\uB294 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",lane_not_declared:"\uD604\uC7AC \uACE0\uC815 \uC120\uC5B8\uC5D0 \uD574\uB2F9 \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4.",stale_declaration:"\uC800\uC7A5\uC18C \uC791\uC5C5 \uC120\uC5B8\uC774 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uD654\uBA74\uC5D0\uC11C \uB2E4\uC2DC \uC5F4\uC5B4 \uC8FC\uC138\uC694.",too_large:"\uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uB108\uBB34 \uCEE4\uC11C \uD654\uBA74\uC5D0 \uD45C\uC2DC\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",unsupported_content:"\uD14D\uC2A4\uD2B8 \uD615\uC2DD\uC758 \uC2A4\uD06C\uB9BD\uD2B8\uB9CC \uD45C\uC2DC\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.",unreadable:"\uACE0\uC815\uB41C \uC2A4\uD06C\uB9BD\uD2B8 \uB0B4\uC6A9\uC744 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4."}[e]||"\uC2A4\uD06C\uB9BD\uD2B8\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4."}function Af(e){let t=e.getWorkspacePath,n=e.fetchImpl||globalThis.fetch?.bind(globalThis),r=document.createElement("div");r.className="repo-ops-script-viewer-root",document.body.appendChild(r);let o=null,s="loading",i="",l="",a=0,u=null,p=!1;function f(C,I){return I?Jy(C).map(F=>F.kind==="plain"?F.text:c`<span
            class="repo-ops-script-viewer__token repo-ops-script-viewer__token--${F.kind}"
            >${F.text}</span
          >`):C}function g(){if(!o)return c``;let C=s==="ready"&&Qy(i),I=s==="ready"?i.split(`
`):[];return c`<div
      class="repo-ops-script-viewer"
      role="dialog"
      aria-modal="true"
      aria-label=${`\uC2A4\uD06C\uB9BD\uD2B8 \uB0B4\uC6A9: ${o.path}`}
    >
      <div
        class="repo-ops-script-viewer__backdrop"
        @click=${()=>j()}
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
              @click=${()=>j()}
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
                  ${I.map((F,V)=>c`<div class="repo-ops-script-viewer__row">
                        <span
                          class="repo-ops-script-viewer__line-number"
                          aria-hidden="true"
                          >${V+1}</span
                        ><code class="repo-ops-script-viewer__code-line"
                          >${f(F,C)}</code
                        >
                      </div>`)}
                </div>`}
        </div>
      </section>
    </div>`}function m(){ot(g(),r)}async function k(){if(s!=="ready")return;let C=await an(i);ye(C?"\uC2A4\uD06C\uB9BD\uD2B8 \uBCF5\uC0AC\uB428":"\uC2A4\uD06C\uB9BD\uD2B8 \uBCF5\uC0AC \uC2E4\uD328",C?"success":"error")}function R(C){C.key==="Escape"&&o&&(C.preventDefault(),j())}function B(){p||(document.addEventListener("keydown",R),p=!0)}function X(){p&&(document.removeEventListener("keydown",R),p=!1)}async function se(C,I=null){let F=++a;B(),o={...C},u=I||(document.activeElement instanceof HTMLElement?document.activeElement:null),s="loading",i="",l="",m(),r.querySelector(".repo-ops-script-viewer__close")?.focus();let Q=t?t():"";if(!Q){s="error",l="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4.",m();return}if(!n){s="error",l="\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD \uAE30\uB2A5\uC744 \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",m();return}let P="/api/repo-ops-script?workspace="+encodeURIComponent(Q)+"&lane="+encodeURIComponent(C.lane)+"&base_sha="+encodeURIComponent(C.base_sha);try{let K=await n(P),H=await K.json().catch(()=>({}));if(F!==a)return;if((t?t():"")!==Q){j();return}if(!K.ok||!H||H.ok!==!0){s="error",l=ev(H&&typeof H.error=="string"?H.error:""),m();return}o={lane:H.lane,base_sha:H.base_sha,path:H.path,base_ref:H.base_ref},i=String(H.content),s="ready",m()}catch{if(F!==a)return;s="error",l="\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",m()}}function j(){a+=1,X(),o=null,i="",m();let C=u;u=null,C?.isConnected&&C.focus()}function q(){j(),r.remove()}return{open:se,close:j,destroy:q}}var Sf={deploy_not_declared:"\uC120\uC5B8 \uC5C6\uC74C",deploy_opted_out:"\uC774 workspace\uC5D0\uC11C \uBC30\uD3EC \uC2E4\uD589\uC774 \uAEBC\uC838 \uC788\uC74C",deploy_in_flight:"\uBC30\uD3EC \uC9C4\uD589 \uC911",target_unresolved:"\uB300\uC0C1 tip\uC744 \uD655\uC815\uD558\uC9C0 \uBABB\uD568",remote_history_not_monotonic:"\uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC\uC640 \uC6D0\uACA9 \uC774\uB825\uC774 \uAC08\uB77C\uC9D0"},tv=new Set(["queued","running","retry_pending"]);function Ef(e){let t=e.queueStore,n=e.transport,r=e.onChanged||(()=>{}),o=e.onOpenScript;function s(){return t&&t.get()||{}}function i(){let P=s();return typeof P.revision=="number"?P.revision:0}function l(P){t&&P&&P.queue&&typeof P.queue=="object"&&t.set(P.queue)}function a(){let P=s().workspace_info;return P&&typeof P=="object"?P:{}}function u(P,K){return c`<span
      class="worker-repo-ops__vd-badge worker-repo-ops__vd-badge--${P}"
      >${K}</span
    >`}function p(P){if(typeof P!="number"||!Number.isFinite(P))return"";let K=P/6e4;return Number.isInteger(K)?`timeout ${K}\uBD84`:`timeout ${Math.round(P/1e3)}\uCD08`}function f(P){let K=p(P);return K?u("config",K):""}function g(P,K,H){return c`<button
      type="button"
      class="worker-repo-ops__vd-cmd worker-repo-ops__vd-cmd--link"
      .textContent=${H.script}
      @click=${ee=>{o&&o({lane:P,base_sha:K.base_sha,path:H.script,base_ref:K.base_ref},ee.currentTarget)}}
    ></button>`}function m(){let P=s().repo_operations;return Array.isArray(P)?P:[]}function k(){let P=a().repo_ops,K=P&&typeof P=="object"?P.repo_id:null;return typeof K=="string"&&K?K:null}function R(){return m().some(P=>P&&P.kind==="deploy"&&tv.has(P.state))}function B(){let P=R(),K=k()===null;return c`<button
      type="button"
      class="worker-repo-ops__deploy-run"
      data-seam="repo-ops-deploy-run"
      ?disabled=${P||K}
      title=${P?"\uBC30\uD3EC \uC9C4\uD589 \uC911":K?"\uC800\uC7A5\uC18C\uB97C \uD655\uC778\uD560 \uC218 \uC5C6\uC74C":"\uC6D0\uACA9 base tip\uC5D0\uC11C \uBC30\uD3EC \uC2A4\uD06C\uB9BD\uD2B8\uB97C 1\uD68C \uC2E4\uD589\uD569\uB2C8\uB2E4"}
      @click=${()=>{I()}}
    >
      배포 실행
    </button>`}function X(){let P=s().repo_ops_opt_out;return{verify:P?.verify===!0,deploy:P?.deploy===!0}}function se(P,K){return c`<label class="worker-repo-ops__lane-run">
      <input
        type="checkbox"
        .checked=${!K}
        @change=${H=>{C(P,!H.target.checked)}}
      />
      이 workspace에서 실행
    </label>`}function j(P){let K=typeof P.base_sha=="string"?P.base_sha:"",H=`${P.source_path||"repo-ops/config.toml"} @ ${P.base_ref||"?"}${K?`@${K.slice(0,7)}`:""}`,ee=X(),ke=!!P.verify&&ee.verify,Re=!!P.deploy&&ee.deploy;return c`<section class="worker-repo-ops__vd" data-seam="repo-ops">
      <p class="worker-repo-ops__vd-title">
        저장소 작업 선언
        <span class="worker-repo-ops__vd-src">${H}</span>
      </p>
      <div
        class="worker-repo-ops__lane${ke?" worker-repo-ops__lane--skipped":""}"
        data-lane="verify"
      >
        <span class="worker-repo-ops__lane-k">머지 전 검증</span>
        <span class="worker-repo-ops__lane-v"
          >${P.verify?c`${g("verify",P,P.verify)}
              ${f(P.verify.timeout_ms)}
              ${ke?u("skipped","\uC774 workspace\uC5D0\uC11C \uAC74\uB108\uB700"):""}`:c`선언 없음${u("absent","verify \uC5C6\uC774 \uD310\uC815")}`}</span
        >
        <span class="worker-repo-ops__lane-d"
          >${ke?"\uC774 workspace\uC5D0\uC11C\uB294 \uAC80\uC99D \uC5C6\uC774 \uD310\uC815\uD569\uB2C8\uB2E4.":P.verify?"\uBA38\uC9C0 \uC804\uC5D0 \uC774 \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uD1B5\uACFC\uD574\uC57C \uC790\uACA9\uC744 \uC5BB\uC2B5\uB2C8\uB2E4.":"\uBA38\uC9C0 \uC790\uACA9\uC740 PR/base/head \uC2E0\uC120\uB3C4\xB7mergeability\xB7\uB9AC\uBDF0 \uC601\uC218\uC99D\uC73C\uB85C\uB9CC \uD310\uC815\uD569\uB2C8\uB2E4."}</span
        >
        ${P.verify?se("verify",ee.verify):""}
      </div>
      <div
        class="worker-repo-ops__lane${Re?" worker-repo-ops__lane--skipped":""}"
        data-lane="deploy"
      >
        <span class="worker-repo-ops__lane-k">머지 후 배포</span>
        <span class="worker-repo-ops__lane-v"
          >${P.deploy?c`${g("deploy",P,P.deploy)}
              ${f(P.deploy.timeout_ms)}
              ${Re?u("skipped","\uC774 workspace\uC5D0\uC11C \uAC74\uB108\uB700"):B()}`:c`선언 없음${u("absent","\uBC30\uD3EC \uC5C6\uC74C")}`}</span
        >
        <span class="worker-repo-ops__lane-d"
          >${Re?"\uC774 workspace\uC5D0\uC11C\uB294 \uBC30\uD3EC \uC5C6\uC774 \uACE7\uBC14\uB85C \uC815\uB9AC\uB85C \uB118\uC5B4\uAC11\uB2C8\uB2E4.":P.deploy?c`Worker가 <code>.worktrees/.repo-ops-deploy</code>에서 대상
                  SHA로 정렬한 뒤 1회 실행합니다.`:"\uBA38\uC9C0 \uD6C4 \uBC30\uD3EC \uB2E8\uACC4 \uC5C6\uC774 \uACE7\uBC14\uB85C \uC815\uB9AC\uB85C \uB118\uC5B4\uAC11\uB2C8\uB2E4."}</span
        >
        ${P.deploy?se("deploy",ee.deploy):""}
      </div>
    </section>`}function q(P){let K=P.repo_ops&&typeof P.repo_ops=="object"?P.repo_ops:null;return K&&(K.status==="resolved"||K.status==="absent")?j(K):K&&(K.status==="pending"||K.status==="error")?c`<section class="worker-repo-ops__vd" data-seam="repo-ops">
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
          ${K.status==="pending"?"\uC120\uC5B8 \uD655\uC778 \uC911":c`선언 읽기
              실패${K.error_code?c` — <code>${K.error_code}</code>`:""}`}
        </div>
      </section>`:c`<section class="worker-repo-ops__vd" data-seam="repo-ops">
      <p class="worker-repo-ops__vd-title">저장소 작업 선언</p>
      <div class="worker-repo-ops__vd-line worker-repo-ops__vd-absent">
        선언 확인 중
      </div>
    </section>`}async function C(P,K){if(!n)return;let H=await n("worker-repo-ops-opt-out-toggle",{kind:P,opted_out:K,expected_revision:i()});if(l(H),H&&H.conflict){let ee=await n("worker-repo-ops-opt-out-toggle",{kind:P,opted_out:K,expected_revision:i()});l(ee)}r()}async function I(){let P=k();if(!n||P===null)return;let K=await n("worker-repo-operation-deploy-run",{repo_id:P});if(l(K),!K||K.ok!==!0){let H=K&&typeof K.reason=="string"?K.reason:"",ee=Object.hasOwn(Sf,H)?Sf[H]:H||"\uBC30\uD3EC \uC2E4\uD589\uC744 \uC2DC\uC791\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4";ye(`\uBC30\uD3EC \uC2E4\uD589 \uAC70\uBD80 \u2014 ${ee}`,"error")}else ye("\uBC30\uD3EC \uC2E4\uD589\uC744 \uC2DC\uC791\uD588\uC2B5\uB2C8\uB2E4","success");r()}let F={owned_deploy_worktree_fetch_detached_alignment_recreate:"\uC804\uC6A9 \uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC \uC815\uB82C\xB7\uBCF5\uAD6C",recovered_pre_execution_fetch_timeout_retry_once:"fetch \uD0C0\uC784\uC544\uC6C3 1\uD68C \uBCF5\uAD6C",repo_serial_lock_wait:"\uC800\uC7A5\uC18C \uC21C\uCC28 \uC2E4\uD589 \uB300\uAE30",restart_operation_adoption:"\uC7AC\uC2DC\uC791 \uD6C4 \uC791\uC5C5 \uC778\uACC4",exact_input_exit_zero_evidence_adoption:"\uB3D9\uC77C \uC785\uB825 \uC131\uACF5 \uC99D\uAC70 \uC778\uACC4",descendant_success_covers_ancestor_rows:"\uCD5C\uC2E0 SHA \uC131\uACF5\uC774 \uC774\uC804 \uD589 \uCEE4\uBC84",owned_verify_candidate_cleanup:"\uAC80\uC99D \uC784\uC2DC \uCCB4\uD06C\uC544\uC6C3 \uC815\uB9AC",bounded_single_script_retry_exceeded:"\uB2E8\uC77C \uC2A4\uD06C\uB9BD\uD2B8 \uC7AC\uC2DC\uB3C4 \uD55C\uB3C4 \uCD08\uACFC",repair_session_dispatch:"\uC2E4\uD328 \uD574\uACB0 \uC138\uC158 \uC790\uB3D9 \uC2E4\uD589",baseline_failure_ignore:"\uAE30\uC874 \uC2E4\uD328 \uBB34\uC2DC",config_or_script_deletion_to_bypass_gate:"\uC124\uC815\xB7\uC2A4\uD06C\uB9BD\uD2B8 \uC0AD\uC81C\uB85C \uAC8C\uC774\uD2B8 \uC6B0\uD68C",credential_entry:"\uC790\uACA9\uC99D\uBA85 \uC785\uB825\xB7\uCD9C\uB825",destructive_action:"\uD30C\uAD34\uC801 \uC791\uC5C5",history_rewrite:"\uD788\uC2A4\uD1A0\uB9AC \uC7AC\uC791\uC131",agent_self_report_as_success:"\uC138\uC158 \uC790\uAE30\uBCF4\uACE0\uB97C \uC131\uACF5 \uCC98\uB9AC"};function V(P,K,H){return c`<div class="worker-repo-ops__policy-group" data-policy=${H}>
      <div class="worker-repo-ops__policy-label">${P}</div>
      <ul class="worker-repo-ops__policy-list">
        ${K.map(ee=>c`<li data-token=${ee}>
              ${F[ee]||ee}
            </li>`)}
      </ul>
    </div>`}function Q(){let P=s(),K=P.repo_operation_policy&&typeof P.repo_operation_policy=="object"?P.repo_operation_policy:null;return K?c`<section
      class="worker-repo-ops__repair"
      data-seam="repo-ops-policy"
    >
      <details class="worker-repo-ops__policy" data-seam="policy-lists">
        <summary>
          Worker 자동 처리 기준
          <span class="worker-repo-ops__policy-count"
            >자동 ${(K.worker_automatic||[]).length} · 금지
            ${(K.never_automatic||[]).length}</span
          >
        </summary>
        ${K.supported===!1?c`<div
              class="worker-repo-ops__policy-group"
              data-policy="policy-schema"
            >
              ${`\uACC4\uC57D \uC2A4\uD0A4\uB9C8 \uBD88\uC77C\uCE58 \u2014 \uC790\uB3D9 \uC7AC\uC2DC\uB3C4\uAC00 \uC815\uC9C0\uB418\uC5C8\uC2B5\uB2C8\uB2E4 (v${K.schema_version})`}
            </div>`:""}
        ${V("Worker\uAC00 \uC790\uB3D9 \uCC98\uB9AC",K.worker_automatic||[],"worker-automatic")}
        ${V("\uC790\uB3D9\uC73C\uB85C \uD558\uC9C0 \uC54A\uC74C",K.never_automatic||[],"never-automatic")}
      </details>
    </section>`:""}return{template(){return c`<details class="worker-repo-ops-settings">
        <summary class="worker-repo-ops-settings__summary">
          저장소 작업 · 검증/배포 선언
        </summary>
        ${q(a())} ${Q()}
      </details>`}}}var Rf=20,nv=5,rv=new Set(["failed","running","queued","retry_pending"]),Sl={verify:"\uBA38\uC9C0 \uC804 \uAC80\uC99D",deploy:"\uBA38\uC9C0 \uD6C4 \uBC30\uD3EC",job:"\uBA38\uC9C0 \uD6C4 \uC7A1"},Tf={verify:"verify",deploy:"deploy",job:"deploy"};function ov(e){if(typeof e!="string")return"";let t=e.split("/").filter(n=>n.length>0);return t.length>0?t[t.length-1]:""}function sv(e){return!e||typeof e!="object"?"":e.kind==="job"?ov(e.script_path)||Sl.job:Object.hasOwn(Sl,e.kind)?Sl[e.kind]:e.kind}function iv(e,t,n=Rf){let r=[];for(let o of Array.isArray(e)?e:[])!o||typeof o!="object"||r.push({type:"operation",id:o.operation_id,at:typeof o.finished_at=="number"?o.finished_at:typeof o.requested_at=="number"?o.requested_at:null,operation:o});for(let o of Array.isArray(t)?t:[])!o||typeof o!="object"||r.push({type:"cleanup",id:o.bead_id,at:typeof o.at=="number"?o.at:null,cleanup:o});return r.sort((o,s)=>o.at===null&&s.at===null?String(o.id||"").localeCompare(String(s.id||"")):o.at===null?1:s.at===null?-1:s.at-o.at),r.slice(0,Math.max(0,n))}function av(e){if(e.type==="cleanup")return!0;let t=e.operation;return rv.has(t.state)&&!t.dismissed&&!t.superseded_by}function lv(e,t,n={}){let r=iv(e,t,1/0),o=n.expanded===!0?Rf:nv,s=new Set(r.slice(0,o)),i=r.filter(l=>s.has(l)||av(l));return{visible:i,hidden:r.length-i.length}}function Cf(e){if(e.type==="cleanup")return"warn";let t=e.operation.state;return t==="succeeded"?"ok":t==="failed"?"fail":"live"}function cv(e){if(e.type==="cleanup")return"\uBA48\uCDA4";switch(e.operation.state){case"succeeded":return"\uC131\uACF5";case"failed":return"\uC2E4\uD328";case"retry_pending":return"\uC7AC\uC2DC\uB3C4 \uC911";case"running":return"\uC2E4\uD589 \uC911";default:return"\uB300\uAE30"}}function Of(e){let t=e.filter(n=>n.value);return t.length===0?"":c`<details class="worker-ev__details">
    <summary>세부</summary>
    <dl class="worker-ev__kv">
      ${t.map(n=>{let r=n.copy===!0?oo(n.value):n.value;return c`<div>
          <dt>${n.term}</dt>
          <dd>${r}</dd>
        </div>`})}
    </dl>
  </details>`}function If(e,t="",n=!1){return!e&&!t?"":c`<p
    class="worker-ev__explain${n?" worker-ev__explain--warn":""}"
  >
    <span class="worker-ev__cause">${e}</span>${t?c`<br />${t}`:""}
  </p>`}function uv(e,t){if(!e||typeof e!="object")return;let n=t&&typeof t=="object"?t.kind:"";if(!Object.hasOwn(Tf,n))return;let r=e[Tf[n]],o=r&&typeof r=="object"?r.timeout_ms:void 0;return typeof o=="number"&&Number.isFinite(o)?o:void 0}function dv(e,t){let n=$p(e,t),r=xp(e);return!n&&!r?"":c`<p class="worker-ev__why">
    ${n?c`<span class="worker-ev__why-line">${n}</span>`:""}${r?c`<span class="worker-ev__why-line">${r}</span>`:""}
  </p>`}function pv(e){return e.state!=="failed"||e.superseded_by||e.dismissed?"":c`<div class="worker-ev__acts">
    <button
      type="button"
      class="worker-ev__btn worker-repo-op__dismiss"
      data-operation-id=${e.operation_id}
      title="사람이 확인한 실패로 접수합니다 — 기록은 그대로 남고 해결 필요 집계에서만 빠집니다"
    >
      기록 닫기
    </button>
  </div>`}function fv(e,t){let n=e.operation,r=n.state==="failed",o=n.failure?n.failure.code:"";return c`<li
    class="worker-ev"
    data-operation-id=${n.operation_id}
    data-state=${n.state}
  >
    <span
      class="worker-ev__t"
      title=${e.at?Zt(e.at):""}
      >${Ys(e.at)||"\u2014"}</span
    >
    <span class="worker-ev__node" aria-hidden="true"
      ><span class="worker-ev__dot worker-ev__dot--${Cf(e)}"></span
    ></span>
    <div class="worker-ev__body">
      <div class="worker-ev__line1">
        <span class="worker-ev__what">${sv(n)}</span>
        <span class="worker-ev__meta"
          >${n.target_base}@${Ks(n.target_sha)}${typeof n.elapsed_ms=="number"?` \xB7 ${Cr(n.elapsed_ms)}`:""}</span
        >
        <span class="worker-ev__st worker-ev__st--${Cf(e)}"
          >${cv(e)}</span
        >
        ${n.dismissed?c`<span class="worker-ev__st worker-ev__st--quiet">접수됨</span>`:""}
        ${n.superseded_by?c`<span class="worker-ev__st worker-ev__st--quiet">덮임</span>`:""}
        ${n.source==="manual"?c`<span
              class="worker-ev__st worker-ev__st--manual"
              title="사람이 배포 실행을 눌러 시작한 작업입니다"
              >수동</span
            >`:""}
      </div>
      ${r?If(kp(n.failure_kind,o)):""}
      ${dv(n,uv(t,n))}
      ${pv(n)}
      ${Of([{term:"\uC2E4\uD328 \uCF54\uB4DC",value:r?o:""},{term:"script",value:[n.script_path||"",n.script_blob_sha?`blob ${Ks(n.script_blob_sha)}`:"",Number.isInteger(n.exit_code)?`exit ${n.exit_code}`:""].filter(Boolean).join(" \xB7 ")},{term:"\uB85C\uADF8",value:n.log_path||"",copy:!0},{term:"\uCD9C\uB825",value:n.output_tail||""}])}
    </div>
  </li>`}function _v(e){let t=e.cleanup,n=Rr(t.step);return c`<li
    class="worker-ev"
    data-bead-id=${t.bead_id}
    data-state="cleanup_stalled"
  >
    <span
      class="worker-ev__t"
      title=${e.at?Zt(e.at):""}
      >${Ys(e.at)||"\u2014"}</span
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
        ${qu(t.step).map(r=>c`<li
              class="worker-step worker-step--${r.state}"
              data-step=${r.step}
            >
              <span class="worker-step__pip" aria-hidden="true"></span>
              <span class="worker-step__lb">${r.label}</span>
            </li>`)}
      </ol>
      ${If(dr(t.reason),typeof t.retry_count=="number"&&t.retry_count>0?`${t.retry_count}\uD68C \uC790\uB3D9 \uC7AC\uC2DC\uB3C4 \uD6C4\uC5D0\uB3C4 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4 \u2014 \uC815\uB9AC\uB97C \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uBA74 \uBA48\uCD98 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4.`:"\uC815\uB9AC\uB97C \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uBA74 \uBA48\uCD98 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4.",!0)}
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
      ${Of([{term:"\uC2E4\uD328 \uCF54\uB4DC",value:t.reason||""},{term:"\uC9C4\uB2E8",value:t.detail||""},{term:"\uB85C\uADF8",value:t.log_path||"",copy:!0},{term:"\uCD9C\uB825",value:t.output_tail||""}])}
    </div>
  </li>`}function mv(e){let t=typeof e.hidden=="number"?e.hidden:0,n=e.expanded===!0;return c`<section class="worker-repo-drawer" data-seam="repo-ops-timeline">
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
          ${e.events.map(r=>r.type==="cleanup"?_v(r):fv(r,e.repo_ops))}
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
  </section>`}function Lf(e,t={}){let n=null;function r(){if(n===null){ot(c``,e);return}let i=lv(n.operations,n.cleanup_failures,{expanded:n.expanded});ot(mv({events:i.visible,hidden:i.hidden,expanded:n.expanded,repo:n.repo,repo_ops:n.repo_ops}),e)}e.addEventListener("click",i=>{let l=i.target;if(l?.closest?.('[data-seam="repo-ops-close"]')){s();return}l?.closest?.('[data-seam="repo-ops-more"]')&&n&&(n.expanded=!n.expanded,r())});function o(i){n={operations:i.operations,cleanup_failures:i.cleanup_failures,repo:i.repo||"",repo_ops:i.repo_ops||null,expanded:!1},r()}function s(){n!==null&&(n=null,r(),t.onClose&&t.onClose())}return{open:o,close:s,isOpen:()=>n!==null,refresh(i){n&&(n={operations:i.operations,cleanup_failures:i.cleanup_failures,repo:i.repo||"",repo_ops:i.repo_ops||null,expanded:n.expanded},r())}}}var gv="worker-ineligible";function as(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function Pf(e){return as(e).includes(gv)}var hv="session-preferred",bv=["external_roundtrip","user_feedback_loop"];function Df(e,t){if(!as(e).includes(hv)||typeof t!="object"||t===null)return"";let n=t.session_preferred_reason;return typeof n=="string"&&bv.includes(n)?n:""}var yv="spec-after-blocker";function Mf(e,t){return as(e).includes(yv)&&Array.isArray(t)&&t.length>0}var vv=It("views:worker:adapter"),wv="tab:worker:ready",kv="tab:worker:blocked",$v="tab:worker:in-progress",xv="tab:worker:resolved",Av="tab:worker:closed",Sv="\u{1F512} blocked",Ev={revision:0,auto_advance:!1,auto_merge:!1,slots:ui,queue:[],serial_lanes:[],serial_lane_count:0,pr_wait:[],done:[]},Tv=["claude_account","codex_account"],Cv=[...Jr,...Tv];function Rv(e){let t=e&&e.parent;return(typeof t=="string"?t.length>0:!!(t&&t.id))||/\.\d+$/.test(e&&e.id||"")}function Ov(e){let t=e&&typeof e=="object"?e.awaiting_user:void 0,n=typeof t=="string"?t.trim():"";return n.length>0?`${ri}: ${n}`:ri}function pr(e){return e&&typeof e=="object"?e:{}}function Iv(e){let t={};for(let n of Cv){let r=e[n];typeof r=="string"&&r.length>0&&(t[n]=r)}return t}function Lv(e){let t=new Map;for(let r of e){if(!r||typeof r.id!="string"||r.id.length===0)continue;let o=pr(r.metadata).carried_from;if(!(typeof o!="string"||o.length===0))for(let s of os(r)){let i=t.get(s);i||(i=new Set,t.set(s,i)),i.add(r.id)}}let n=new Map;for(let[r,o]of t)n.set(r,[...o].sort());return n}function Pv(e){let t=e.replace(/\/+$/,""),n=t.lastIndexOf("/");return n>=0?t.slice(n+1):t}function Nf(e={}){let{queueStore:t,issueStores:n,transport:r,getWorkspacePath:o,onInvalidate:s}=e,i=n?Wr(n):null,l=new Map,a={},u=null,p=0,f=null,g=!1;function m(){g||!s||s()}function k(I){return u===I?a:{}}async function R(){if(!r||g)return;let I=o?.()||"";if(u===I||f&&f.key===I&&f.generation===p)return;let F=++p;f={key:I,generation:F};let V=null;try{V=await Promise.resolve(r("get-session-defaults",{}))}catch(Q){if(F!==p)return;f=null,vv("get-session-defaults failed: %o",Q),m();return}F===p&&(a=V&&typeof V.values=="object"&&V.values!==null?{...V.values}:{},u=I,f=null,m())}function B(){u=null,p+=1,R()}function X(){for(let[I,F]of l)F==="failed"&&l.delete(I)}function se(I,F){return i?i.selectBoardColumn(I,F):[]}function j(I,F,V,Q){let P=Array.isArray(I.queue)?I.queue:[],K=new Set([...P.map(D=>D.bead_id),...(Array.isArray(I.serial_lanes)?I.serial_lanes:[]).flatMap(D=>(Array.isArray(D?.entries)?D.entries:[]).map(ve=>ve.bead_id)),...(Array.isArray(I.pr_wait)?I.pr_wait:[]).map(D=>D.bead_id),...(Array.isArray(I.done)?I.done:[]).map(D=>D.bead_id)]),H=new Set(V.map(D=>D.id)),ee=new Set,ke=[];for(let D of[...F,...V])K.has(D.id)||ee.has(D.id)||Rv(D)||(ee.add(D.id),ke.push(D));let Re=vf(ke,Dr(Q)),ne=pr(I.bead_scope);return Re.map(D=>{let ve=Br(D),Ee=ve.evidence==="published",T=typeof D.workflow?.route=="string"&&D.workflow.route||(D.metadata&&typeof D.metadata.route=="string"?D.metadata.route:""),Z=T==="quick_fix",we=!Object.hasOwn(D,"description")||typeof D.description=="string"&&D.description.trim().length>0,he=Object.hasOwn(D,"labels")&&Pf(D.labels),Te=he||!Object.hasOwn(D,"labels")?"":Df(D.labels,D.metadata),ge=D.metadata&&typeof D.metadata=="object"?Object.hasOwn(D.metadata,"awaiting_user"):!1,Oe=!he&&!ge&&(Z?we:Ee&&!ve.conflict),Ge=H.has(D.id),et=Ge?os(D):[],L=[];Ge&&et.length===0&&L.push(Sv),ge&&L.push(Ov(D.metadata)),Z&&!we?L.push("missing_description"):!Z&&ve.conflict?L.push("spec_id_conflict"):!Z&&ve.evidence==="none"?L.push("spec \uC5C6\uC74C"):!Z&&ve.evidence==="draft"&&L.push("spec \uBBF8\uBC1C\uD589(draft)");let ue=ne[D.id];return{bead_id:D.id,title:D.title||D.id,route:T,spec_id:ve.conflict?"":ve.path,published:Ee,blocked:Ge,blocked_by:et,labels:Array.isArray(D.labels)?D.labels:[],created_at:D.created_at,updated_at:D.updated_at,status:D.status,workflow:D.workflow||null,exec_pins:Iv(pr(D.metadata)),rec:null,...ue&&Array.isArray(ue.scope)?{scope:ue.scope}:{},eligible:Oe,reason:L.join(" \xB7 "),worker_ineligible:he,session_preferred:Te.length>0,session_preferred_reason:Te,spec_after_blocker:Mf(D.labels,et),release_info:D.release_info,dependents_info:D.dependents_info}})}function q(I){let[F,V,Q,P,K]=I,H=As([...F,...V,...Q,...P,...K]),ee=Lv([...F,...V,...Q,...P]),ke={},Re=(ne,D)=>{if(!ne||typeof ne.id!="string"||ne.id.length===0)return;let ve=ke[ne.id]||(ke[ne.id]={});if(typeof ne.priority=="number"&&!("priority"in ve)&&(ve.priority=ne.priority),typeof ne.from_id=="string"&&!("from_id"in ve)&&(ve.from_id=ne.from_id),D&&!("metadata"in ve)){ve.metadata=pr(ne.metadata);let Ee=pr(ne.workflow).route;typeof Ee=="string"&&Ee.length>0&&(ve.route=Ee)}};for(let ne of[...F,...V,...Q])Re(ne,!0);for(let ne of[...P,...K])Re(ne,!1);for(let ne of new Set([...Object.keys(ke),...H.keys()])){let D=Ss(H,ne);if(D.total>0){let ve=ke[ne]||(ke[ne]={});ve.rollup=D}}for(let[ne,D]of ee){let ve=ke[ne]||(ke[ne]={});ve.carried_to=D}return ke}function C(I,F,V,Q){let P=new Set((Array.isArray(I.done)?I.done:[]).map(H=>H?.bead_id).filter(H=>typeof H=="string")),K=[];for(let H of F){let ee=nr(H.closed_at);if(typeof H.id!="string"||P.has(H.id)||ee===null||Q!==void 0&&ee<Q||typeof H.comment_count!="number"||H.comment_count<=0)continue;let ke=`${V}\0${H.id}\0${String(H.updated_at)}\0${H.comment_count}`,Re=l.get(ke);if(Re===void 0&&r&&(l.set(ke,"pending"),Promise.resolve(r("get-comments",{id:H.id})).then(D=>{let ve=Array.isArray(D)&&D.some(Ee=>Ei(typeof Ee?.text=="string"?Ee.text:"")?.lane==="session");l.set(ke,ve?"session":"not-session"),m()}).catch(()=>{l.set(ke,"failed"),m()})),Re!=="session")continue;let ne=nr(H.started_at);K.push({id:H.id,title:H.title||H.id,reason:"",draggable:!1,done:!0,lane:"done",selectable:!1,selected:!1,badges:["\uC138\uC158 \uC791\uC5C5"],alert:!1,usage:null,work_ms:ne!==null&&ee>=ne?ee-ne:null,work_kind:"session",done_at:ee,created_at:H.created_at,updated_at:H.updated_at})}return K}return{read(I){if(!t)return{workspaces:[],workspaces_state:[]};let F=t.get()||Ev,V=o?.()||"",Q=I&&typeof I.done_since=="number"?I.done_since:void 0,P=se(wv,"ready"),K=se(kv,"blocked"),H=se($v,"in_progress"),ee=se(xv,"resolved"),ke=se(Av,"closed");return{workspaces:[{...F,bead_titles:{...pr(F.bead_titles),...Object.fromEntries([...P,...K].filter(Re=>Re&&typeof Re.id=="string").map(Re=>[Re.id,Re.title||Re.id]))},root_dir:V,name:Pv(V),runnable:j(F,P,K,I?I.candidate_sort:void 0),session_done:C(F,ke,V,Q),bead_overlay:q([P,K,H,ee,ke])}],workspaces_state:[{root_dir:V,revision:F.revision,auto_advance:F.auto_advance,auto_merge:F.auto_merge,slots:typeof pr(F.workspace_info).slots=="number"?pr(F.workspace_info).slots:F.slots,runner_catalog:F.runner_catalog,execution_defaults:F.execution_defaults,session_defaults:k(V),orchestration_model:F.orchestration_model,orchestration_effort:F.orchestration_effort,orchestration_speed:F.orchestration_speed,issue_prefix:""}]}},ensureSessionDefaults(){R()},refreshSessionDefaults:B,notifyIssuesChanged:X,destroy(){g=!0,p+=1,f=null,l.clear()}}}var Wi=1,qf=5,Dv={root_dir:"",name:"",auto_advance:!1,auto_merge:!1,slots:Wi,revision:0,runner_catalog:{},items:[],sublanes:{parallel:[],serial:[]},serial_lane_count:0,raw_queue_length:0,live_count:0,over_cap:!1,merge:{positions:new Map,resolutions:new Map,continuations:new Map,authorities:new Map,state:{active:null,failures:{},waiting:null},auto_excluded:[],running:!1},token_total:null,cleanup_failures:[],declared_base:null,repo_operations:[]};function _n(e){return e&&typeof e=="object"?e:{}}var Bf="beads-ui.worker.candidate-filter",El={show_blocked:!1,spec:"all"};function Mv(){try{let e=window.localStorage.getItem(Bf);if(!e)return{...El};let t=JSON.parse(e);if(!t||typeof t!="object")return{...El};let n=t.spec;return{show_blocked:t.show_blocked===!0,spec:n==="with"||n==="without"?n:"all"}}catch{return{...El}}}function Nv(e){try{window.localStorage.setItem(Bf,JSON.stringify(e))}catch{}}var qv=[{value:"all",label:"\uC804\uCCB4"},{value:"with",label:"spec \uC788\uC74C"},{value:"without",label:"spec \uC5C6\uC74C"}],Uf="bdui.worker.done-range";function jv(){try{let e=window.localStorage.getItem(Uf);return e===null?"today":Dn(e)}catch{return"today"}}function Fv(e){try{window.localStorage.setItem(Uf,e)}catch{}}function jf(e){let t=Array.isArray(e)&&e.length>0?e[0]:null;if(!t)return"";let n=typeof t.title=="string"?t.title:t.id||"";return n.length>22?`${n.slice(0,22)}\u2026`:n}function Bv(e){return e==="receipt_not_current"?"\uB9AC\uBDF0 \uD6C4\uC5D0\uB3C4 \uC601\uC218\uC99D\uC774 \uCD5C\uC885 head\uC5D0 \uC720\uD6A8\uD558\uC9C0 \uC54A\uC74C":e==="cancelled"?"\uB9AC\uBDF0 \uC138\uC158 \uCDE8\uC18C\uB428":e.startsWith("launch_failed:")?`\uB9AC\uBDF0 \uC138\uC158 \uC2DC\uC791 \uC2E4\uD328(${e.slice(14)})`:e.startsWith("session_failed:")?`\uB9AC\uBDF0 \uC138\uC158 \uBE44\uC815\uC0C1 \uC885\uB8CC(${e.slice(15)})`:`\uB9AC\uBDF0 \uC138\uC158 \uC2E4\uD328(${e})`}function Ff(e){if(e.startsWith("receipt_unbacked:"))return`\uC2E4\uD589 \uC601\uC218\uC99D \uC790\uB3D9 \uAC80\uC99D \uBD88\uAC00(${e.slice(17)}) \u2014 [\uBA38\uC9C0] \uD074\uB9AD\uC73C\uB85C \uC218\uB3D9 \uC9C4\uD589 \uAC00\uB2A5`;switch(e){case"not_in_pr_wait":return"PR \uB300\uAE30 \uC0C1\uD0DC \uB3D9\uAE30\uD654 \uC2E4\uD328";case"resolution_round_cap":return"\uCDA9\uB3CC \uD574\uC18C 2\uD68C \uCD08\uACFC";case"resolution_rebase_cap":return"\uD050 \uC7AC\uCDA9\uB3CC 3\uD68C \uCD08\uACFC";case"resolution_timeout":return"\uCDA9\uB3CC \uD574\uC18C \uB300\uAE30 \uC2DC\uAC04 \uCD08\uACFC";case"resolution_refused":return"\uD574\uC18C \uC138\uC158 \uB514\uC2A4\uD328\uCE58 \uAC70\uBD80";case"worktree_missing":return"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uD574\uC18C \uD544\uC694";case"worktree_restore_branch_mismatch":return"\uC6CC\uD06C\uD2B8\uB9AC \uBCF5\uC6D0 \uC2E4\uD328 \u2014 \uBE0C\uB79C\uCE58 \uC774\uB984 \uBD88\uC77C\uCE58";case"worktree_restore_path_exists":return"\uC6CC\uD06C\uD2B8\uB9AC \uBCF5\uC6D0 \uC2E4\uD328 \u2014 \uACBD\uB85C \uC774\uBBF8 \uC788\uC74C";case"worktree_restore_branch_missing":return"\uC6CC\uD06C\uD2B8\uB9AC \uBCF5\uC6D0 \uC2E4\uD328 \u2014 origin\uC5D0 \uBE0C\uB79C\uCE58 \uC5C6\uC74C";case"worktree_restore_branch_diverged":return"\uC6CC\uD06C\uD2B8\uB9AC \uBCF5\uC6D0 \uC2E4\uD328 \u2014 \uB85C\uCEEC \uBE0C\uB79C\uCE58\uAC00 origin\uACFC \uB2E4\uB984";case"worktree_restore_failed":return"\uC6CC\uD06C\uD2B8\uB9AC \uBCF5\uC6D0 \uC2E4\uD328";case"merge_unconfirmed_timeout":return"\uBA38\uC9C0 \uD655\uC778 \uC2DC\uAC04 \uCD08\uACFC";case"pr_closed_unmerged":return"PR \uB2EB\uD798";case"merge_error":return"\uBA38\uC9C0 \uC624\uB958";case"spec_id_missing":return"\uC2A4\uD399 ID \uAE30\uB85D \uC5C6\uC74C";default:return e}}function Uv(e){if(e==="lane_occupied")return"\uC2E4\uD589 \uB808\uC778\uC5D0 \uB0A8\uC544 \uC788\uC5B4 \uBA38\uC9C0 \uB300\uC0C1\uC774 \uC544\uB2D9\uB2C8\uB2E4";let t="\uBA38\uC9C0 \uD050\uC5D0 \uB123\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 (\uC774\uBBF8 \uB300\uAE30 \uC911\uC774\uAC70\uB098 \uB300\uC0C1 \uC544\uB2D8)";return typeof e=="string"&&e.length>0?`${t}: ${e}`:t}function Wv(e){switch(e){case"no_terminal_failure":return"\uC774 \uD589\uC5D0 \uC774\uC5B4\uBC1B\uC744 terminal \uC2E4\uD328 \uAE30\uB85D\uC774 \uC5C6\uC2B5\uB2C8\uB2E4";case"tmux_unavailable":return"tmux\uC5D0 \uB2FF\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 \u2014 \uC138\uC158\uC744 \uB744\uC6B0\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4";case"launch_failed:claude_not_found":return"claude \uC2E4\uD589 \uD30C\uC77C\uC744 PATH\uC5D0\uC11C \uCC3E\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4";case"launch_failed:new_session":return"tmux \uC138\uC158\uC744 \uB9CC\uB4E4\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4";case"launch_failed:new_window":return"tmux \uCC3D\uC744 \uB9CC\uB4E4\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4";case"launch_failed:exited":return"\uB744\uC6B4 \uC138\uC158\uC774 \uACE7\uBC14\uB85C \uC885\uB8CC\uB410\uC2B5\uB2C8\uB2E4";case"error":return"\uC138\uC158 \uAE30\uB3D9 \uC911 \uC624\uB958\uAC00 \uB0AC\uC2B5\uB2C8\uB2E4";default:return typeof e=="string"&&e.length>0?e:"\uC138\uC158\uC744 \uB744\uC6B0\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"}}function zv(e){switch(e){case"no_session_ref":return"\uAE30\uB85D\uB41C \uC138\uC158 \uC5C6\uC74C";case"unsafe_session_id":return"\uC138\uC158 ID\uB97C \uC778\uC790\uB85C \uC4F8 \uC218 \uC5C6\uC74C";case"provider_mismatch":return"\uAE30\uB85D\uB41C \uC138\uC158\uC774 claude\uAC00 \uC544\uB2D8";case"not_local":return"\uAE30\uB85D\uB41C \uC138\uC158\uC758 transcript\uAC00 \uC774 \uAE30\uAE30\uC5D0 \uC5C6\uC74C";case"bd_unavailable":return"Bead \uBA54\uD0C0\uB370\uC774\uD130\uB97C \uC77D\uC9C0 \uBABB\uD568";default:return typeof e=="string"&&e.length>0?e:"\uC0AC\uC720 \uBBF8\uC0C1"}}function Hv(e){if(!e||typeof e!="object")return"\uC138\uC158 \uAE30\uB3D9 \uC751\uB2F5\uC744 \uBC1B\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4";if(e.conflict===!0)return"\uD050\uAC00 \uBC14\uB00C\uC5B4 \uD074\uB9AD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uB20C\uB7EC\uC8FC\uC138\uC694";if(e.session==="already_running")return"\uC774\uBBF8 \uC774 \uC774\uC288\uC758 \uD574\uACB0 \uC138\uC158\uC774 \uC5F4\uB824 \uC788\uC2B5\uB2C8\uB2E4";if(e.launched!==!0)return`\uC138\uC158\uC5D0\uC11C \uD574\uACB0 \uAC70\uBD80: ${Wv(e.reason)}`;let t=e.bridge_active===!0?"":" (Discord \uC911\uACC4 \uBE44\uD65C\uC131 \u2014 tmux\uC5D0\uC11C \uB2F5\uD558\uC138\uC694)";return e.mode==="fork"?`\uAE30\uB85D\uB41C \uC138\uC158\uC744 fork\uD574 \uB744\uC6E0\uC2B5\uB2C8\uB2E4${t}`:`\uC0C8 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4 \u2014 ${zv(e.fallback_reason)}${t}`}function Gv(e){return e&&e.launched===!0?"success":"error"}function Kv(e){if(e==="worker_sessions_busy")return"\uD574\uC18C \uB300\uAE30 \u2014 \uC2E4\uD589 \uC2AC\uB86F \uB300\uAE30 \uC911";if(typeof e!="string"||!e.startsWith("completion_waiting:"))return null;let t=e.slice(19);if(t.length===0)return null;switch(t){case"gating":return"\uBA38\uC9C0 \uC870\uAC74 \uD655\uC778 \uC911";case"merging":return"\uBA38\uC9C0 \uC911";case"cleaning":return"\uB9C8\uBB34\uB9AC \uC911";case"paused":return"\uC790\uB3D9 \uC9C4\uD589 \uC77C\uC2DC\uC815\uC9C0";case"needs_human":return"\uD655\uC778 \uD544\uC694";default:return null}}function Yv(e){if(!e||typeof e!="object")return null;switch(e.state){case"waiting":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC911",live:!0};case"yielded":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uACC4\uC18D \uC911 \xB7 \uC644\uB8CC \uD6C4 \uC6B0\uC120 \uBA38\uC9C0",live:!0};case"ready":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC644\uB8CC \xB7 \uC7AC\uAC80\uC99D \uB300\uAE30",live:!1};default:return null}}var Vv=new Set(["paused","needs_human","waiting_metadata","reviewing","retrying"]),Xv=new Set(["waiting_metadata","reviewing","retrying"]),Tl=new Set(["review_receipt_missing","review_receipt_stale","review_receipt_invalid","review_receipt_undetermined"]);function Qv(e){let t=e&&typeof e=="object"?e.auto_resolution:null,n=t&&typeof t=="object"&&!Array.isArray(t)?t:null;if(!n||!e)return null;let r=typeof n.origin_reason=="string"&&n.origin_reason.length>0?`\uC6D0 \uC0AC\uC720: ${n.origin_reason}`:"";switch(e.phase){case"waiting_metadata":return{label:"\uC815\uC815 \uB300\uAE30",details:[r,"\uBA54\uD0C0\uB370\uC774\uD130 \uC815\uC815\uC774 \uAD00\uCE21\uB418\uBA74 \uC790\uB3D9 \uC7AC\uAC1C"].filter(Boolean),live:!1};case"retrying":{let o=Number.isInteger(n.attempts)?Math.max(0,Number(n.attempts)):0,s=Number.isInteger(n.attempt_cap)&&Number(n.attempt_cap)>0?Number(n.attempt_cap):0,i=typeof n.next_at=="number"?Zt(n.next_at):"",l=typeof n.last_error=="string"&&n.last_error.length>0?n.last_error:"";return{label:s>0?`\uC7AC\uC2DC\uB3C4 ${Math.min(o,s)}/${s}`:`\uC7AC\uC2DC\uB3C4 ${o}`,details:[r,i?`\uB2E4\uC74C \uC2DC\uAC01 ${i}`:"",l?`\uB9C8\uC9C0\uB9C9 \uC624\uB958: ${l}`:""].filter(Boolean),live:!0}}default:return null}}function Zv(e){if(typeof e!="string")return"";for(let t of["retry_exhausted:","auto_review_exhausted:"])if(e.startsWith(t))return e.slice(t.length);return""}function Jv(e,t=null){if(!e||typeof e!="object")return null;let n="";switch(e.phase){case"gating":n="\uBA38\uC9C0 \uC870\uAC74 \uD655\uC778 \uC911";break;case"merging":n="\uBA38\uC9C0 \uC911";break;case"cleaning":n="\uB9C8\uBB34\uB9AC \uC911";break;case"waiting_metadata":case"reviewing":case"retrying":if(!t)return null;n=t.label;break;case"paused":n="\uC790\uB3D9 \uC9C4\uD589 \uC77C\uC2DC\uC815\uC9C0";break;case"needs_human":n="\uD655\uC778 \uD544\uC694";break;case"completed":return null;default:return null}let r=[n];e.head_sha&&r.push(`head ${e.head_sha}`),e.base_sha&&r.push(`base ${e.base_sha}`),(e.failure_stage||e.failure_reason)&&r.push(`${e.failure_stage||"failure"} \xB7 ${e.failure_reason||"\uC6D0\uC778 \uBBF8\uC0C1"}`);let o=Zv(e.terminal_reason);o&&r.push(`\uC6D0 \uC0AC\uC720: ${o}`);let s=e.phase==="needs_human"&&!o?Pr(e.terminal_reason):null;s&&r.push(e.failure_stage?`${e.failure_stage} \xB7 ${s}`:s);for(let i of t?t.details:[])r.push(i);return e.active_attempt_id&&r.push(`attempt ${e.active_attempt_id}`),e.evidence&&r.push(e.evidence),e.log_path&&r.push(e.log_path),{badge:n,title:r.join(`
`),alert:e.phase==="needs_human",lock_actions:!Vv.has(e.phase)}}function ew(e){if(!e||typeof e!="object")return[];let t=e.blocking_codes;return Array.isArray(t)?t.filter(n=>typeof n=="string"&&n.length>0):[]}function tw(e){if(!e||typeof e!="object")return[];let t=e.badge_codes;return Array.isArray(t)?t.filter(n=>typeof n=="string"&&n.length>0):[]}function nw(e){let t=e.queue_failure?`\uBA38\uC9C0 \uC2E4\uD328 \uC6D0\uBB38: ${e.queue_failure}`:e.auto_skip?`\uC790\uB3D9 \uC81C\uC678 \uC6D0\uBB38: ${e.auto_skip}`:"",n=(s,i={})=>{let l=[i.title||"",t].filter(Boolean);return{label:s,title:l.join(`
`),live:i.live===!0,alert:i.alert===!0}};if(e.continuation_required)return n("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694",{alert:!0});if(e.queueing)return e.queueing==="cleanup"?n("\uC815\uB9AC \uC7AC\uC2DC\uB3C4 \uC694\uCCAD \uC911",{title:"\uC11C\uBC84 \uC751\uB2F5\uC744 \uAE30\uB2E4\uB9AC\uB294 \uC911\uC785\uB2C8\uB2E4",live:!0}):n("\uD050 \uB4F1\uB85D \uC911",{title:"\uBA38\uC9C0 \uD050\uC5D0 \uB123\uB294 \uC911 \u2014 \uC11C\uBC84 \uC751\uB2F5\uC744 \uAE30\uB2E4\uB9BD\uB2C8\uB2E4",live:!0});if(e.merge_step)return e.gate?.tier==="merged"?n("\uBA38\uC9C0\uB428",{title:e.merge_step.label,alert:e.merge_step.failed===!0}):n("\uBA38\uC9C0 \uC911",{title:e.merge_step.label,live:!0});if(e.conflict_badge)return n(e.conflict_badge,{live:e.conflict_live===!0});if(e.auto_resolution)return n(e.auto_resolution.label,{title:e.auto_resolution.details.join(`
`),live:e.auto_resolution.live===!0});if(e.recovery?.lock_actions)return n(e.recovery.badge,{title:e.recovery.title,live:!0});if(e.cleanup_failed)return n(e.cleanup_label?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${e.cleanup_label}`:"\uC815\uB9AC \uBA48\uCDA4",{title:e.cleanup_failed.reason||"",alert:!0});if(e.base_exception)return n("\uB2E4\uB978 base \uB300\uC0C1",{title:e.base_exception,alert:!0});let r=ew(e.receipt_check),o=e.conflicting||e.gate?.reason==="base_behind"||r.length>0;if(e.auto_pending&&o)return n("\uD655\uC778 \uC911",{title:"\uBA38\uC9C0 \uD050\uAC00 \uC790\uB3D9\uC73C\uB85C \uCC98\uB9AC \uC911 \u2014 \uB2E4\uC74C \uAD00\uCE21\uC744 \uAE30\uB2E4\uB9BD\uB2C8\uB2E4",live:!0});if(e.conflicting)return n("\uCDA9\uB3CC \uD574\uACB0 \uD544\uC694",{alert:!0});if(e.gate?.reason==="base_behind")return n("base \uAC31\uC2E0 \uD544\uC694",{alert:!0});if(Tl.has(e.gate?.reason)){let s=e.gate.reason==="review_receipt_stale"?"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC774 \uD604\uC7AC head\uC758 \uC870\uC0C1\uC774 \uC544\uB2D9\uB2C8\uB2E4 \u2014 \uD788\uC2A4\uD1A0\uB9AC \uC7AC\uC791\uC131\xB7\uBE0C\uB79C\uCE58 \uB9AC\uC14B \uBCF5\uAD6C \uACBD\uB85C\uC785\uB2C8\uB2E4. [\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0]\uAC00 \uC774 \uBCF4\uB958\uC758 \uCD9C\uAD6C\uC785\uB2C8\uB2E4":e.gate.reason==="review_receipt_invalid"?"\uB9AC\uBDF0 \uC601\uC218\uC99D \uAE30\uB85D\uC774 \uC131\uB9BD\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4 \u2014 [\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0]\uAC00 \uC774 \uBCF4\uB958\uC758 \uCD9C\uAD6C\uC785\uB2C8\uB2E4":e.gate.reason==="review_receipt_undetermined"?"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC758 ancestry probe\uB97C \uC644\uB8CC\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 \u2014 [\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0]\uAC00 \uC774 \uBCF4\uB958\uC758 \uCD9C\uAD6C\uC785\uB2C8\uB2E4":"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 [\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0]\uAC00 \uC774 \uBCF4\uB958\uC758 \uCD9C\uAD6C\uC785\uB2C8\uB2E4";if(e.review_session?.active===!0)return n(e.review_session.origin==="auto"?"\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694 \xB7 \uC790\uB3D9 \uB9AC\uBDF0 \uC138\uC158 \uC2E4\uD589 \uC911":"\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694 \xB7 \uB9AC\uBDF0 \uC138\uC158 \uC2E4\uD589 \uC911",{title:`${s}
\uB9AC\uBDF0 \uC138\uC158\uC774 \uC2E4\uD589 \uC911\uC785\uB2C8\uB2E4 \u2014 \uB05D\uB098\uBA74 \uC601\uC218\uC99D\uC744 \uB2E4\uC2DC \uD310\uC815\uD569\uB2C8\uB2E4`,live:!0});if(e.auto_review_wait==="slot")return n("\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694 \xB7 \uB9AC\uBDF0 \uC138\uC158 \uC2AC\uB86F \uB300\uAE30",{title:`${s}
\uC2E4\uD589 \uC2AC\uB86F\uC774 \uBE44\uBA74 \uC790\uB3D9\uC73C\uB85C \uB9AC\uBDF0 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4. \uC9C0\uAE08 \uD074\uB9AD\uD558\uBA74 \uC989\uC2DC \uB744\uC6C1\uB2C8\uB2E4`,live:!0});if(e.review_session?.failure){let i=e.review_dispatch?.state==="exhausted"&&e.review_session.origin==="auto";return n(`\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694 \xB7 ${i?"\uC790\uB3D9 \uB9AC\uBDF0 1\uD68C \uC18C\uC9C4 \xB7 ":""}${Bv(e.review_session.failure)}`,{title:`${s}
\uC9C1\uC804 \uB9AC\uBDF0 \uC138\uC158 \uC885\uB8CC \uC0AC\uC720: ${e.review_session.failure}`,alert:!0})}return n("\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694",{title:s,alert:!0})}return e.gate?.reason==="spec_id_missing"?n("\uC2A4\uD399 ID \uB204\uB77D",{title:"native spec_id \uBBF8\uAE30\uB85D \u2014 bd update --spec-id \uD544\uC694",alert:!0}):r.length>0?n(`\uC601\uC218\uC99D \uD655\uC778 \uD544\uC694 \xB7 ${r[0]}`,{title:`\uC131\uB9BD\uD558\uC9C0 \uC54A\uB294 \uC2E4\uD589 \uC601\uC218\uC99D \u2014 ${r.join(", ")}`,alert:!0}):e.recovery?n(e.recovery.badge,{title:e.recovery.title,alert:!0}):e.gate?.tier==="verify"&&e.gate.gate_badge==="\uAC80\uC99D \uC2E4\uD328"?n("\uAC80\uC99D \uC2E4\uD328",{title:e.gate.reason||"",alert:!0}):e.queue_failure?n(`\uBA38\uC9C0 \uC2E4\uD328 \u2014 ${Ff(e.queue_failure)}`,{title:e.queue_failure,alert:!0}):e.auto_skip?n(`\uC790\uB3D9 \uC81C\uC678 \u2014 ${Ff(e.auto_skip)}`,{title:e.auto_skip,alert:!0}):e.queued&&!e.queue_active?n(`\uBA38\uC9C0 \uB300\uAE30 #${e.queue_position}`):e.gate?.enabled===!0?n("\uBA38\uC9C0 \uAC00\uB2A5"):e.gate?.tier==="merged"?n("\uBA38\uC9C0\uB428"):e.gate?.tier==="closed_unmerged"?n("\uB2EB\uD798",{alert:!0}):e.activity?n("\uD655\uC778 \uC911",{live:!0}):e.gate?.tier==="undecidable"||e.gate?.reason==="mergeability_unknown"?n("\uC0C1\uD0DC \uD655\uC778 \uC2E4\uD328",{title:e.gate.reason||"",alert:!0}):e.gate?.tier==="unobserved"||e.gate?.tier==="verify"||e.gate?.gate_badge==="\uAD00\uCE21 \uB300\uAE30"?n("\uD655\uC778 \uC911"):e.gate?.gate_badge?n(e.gate.gate_badge,{title:e.gate.reason||"",alert:e.gate.enabled!==!0}):null}function rw(e,t,n,r,o=null,s=null,i=null,l=!1,a=null,u=!0,p=null,f=null,g=null,m={},k=!1,R={},B=null,X={active:!1,failure:null,origin:null},se=!1){let j=!!a&&a.position>0,q=!!a?.continuation_action&&a.continuation_action.continuation===null,C=!!a&&a.active===!0,I=a&&a.failure||null,F=Kv(a?a.waiting:null),V=n[e]||null,Q=V&&V.gate?V.gate:null,P=V&&V.pr?V.pr:null,K=Yv(a?a.resolution:null),H=Qv(g),ee=Jv(g,H),ke=a&&a.authority||null,Re=a&&a.review_dispatch||null,ne=a?.hold?.auto_review_wait==="slot"?"slot":null,D=!!g&&typeof g=="object"&&Xv.has(g.phase),ve=j&&!C&&(!ke||D||ke.source==="automatic"&&!k),Ee=i==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":K?K.badge:i==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC911":F,T=!!Q&&Q.base_badge==="\uCDA9\uB3CC",Z=!!Q&&Q.enabled===!0,we=Mo({bead_id:e,merge_sha:R.merge_sha,cleanup_cursor:R.cleanup_cursor,merge_progress:s&&s.merge_progress?s.merge_progress:null,cleanup_failed:r,repo_operations:R.repo_operations}),he=li(we),Te=s&&!we&&(s.queueing??null)?s.queueing:null,ge=!!r&&["repo_operations","post_merge_jobs","child_sweep","branch_cleanup","parent_close"].includes(r.step)&&!!Q&&Q.tier==="merged",Oe=r&&r.step==="repo_operations"&&we?.failed===!0&&(we.step==="deploy"||we.step==="verify")?we.step:null,Ge=l&&!!r&&!!Q&&Q.tier==="merged",et=ve&&(Z||T||Q?.reason==="base_behind"||Tl.has(Q?.reason)||ge||Ge),L=Tl.has(Q?.reason),ue=l&&T&&u===!1,re=Vn(m,e,{external:l,merge_active:C||we?.step==="merge",merge_queued:j,conflict_active:!!i,cleanup_active:he,merged:!!r||Q?.tier==="merged"}),pe=!!re.operation,Ce=!!r||g?.phase==="needs_human"||!!re.error,_e=j&&!I&&!q&&!ge&&!(ee&&ee.lock_actions),xe=nw({auto_pending:_e,continuation_required:q,queueing:Te,merge_step:we,conflict_badge:Ee,conflict_live:K?.live===!0||i==="running",auto_resolution:H,recovery:ee,cleanup_failed:r,cleanup_label:r?Rr(r.step):null,base_exception:f,conflicting:T,gate:Q,receipt_check:V&&V.receipt_check?V.receipt_check:null,queue_failure:I,auto_skip:p,queued:j,queue_active:C,queue_position:a?a.position:0,review_session:X,review_dispatch:Re,auto_review_wait:ne,activity:Ee?null:s&&s.activity||null}),We=xe?.live===!0&&xe.title?c`<span title=${xe.title}>${xe.label}</span>`:xe?.label||null,Qe=tw(V&&V.receipt_check?V.receipt_check:null);return{id:e,title:l?c`${t}<span class="muted"> · 세션</span>`:t,reason:r&&we?.active!==!0?ai(r.step):"PR \uB300\uAE30",draggable:!1,done:!0,lane:"pr_wait",...B?{dependency_chips:B}:{},external:l,pr_number:P&&typeof P.number=="number"?P.number:null,pr_url:P&&typeof P.url=="string"?P.url:"",completion_badge:xe?.live!==!0&&xe?.title?xe.label:null,completion_title:xe?.title||"",...g?.phase==="needs_human"&&typeof g.log_path=="string"&&g.log_path.length>0?{log_path:g.log_path}:{},...Qe.length>0?{receipt_badge:{codes:Qe}}:{},badges:We?[We]:[],live_badge:xe?.live===!0?We:null,usage:o,alert:xe?.alert===!0,merge_action:Q?.tier==="merged"&&!ge&&!Ge?!1:!j||q||ve||L,cancel_action:j&&!q,cancel_enabled:!C&&!(ee&&ee.lock_actions),cancel_title:ee&&ee.lock_actions?`${ee.badge} \u2014 \uC911\uB2E8\uD558\uB824\uBA74 \uC0C1\uB2E8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8\uC744 \uC0AC\uC6A9\uD558\uC138\uC694`:C?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"\uBA38\uC9C0 \uD050\uC5D0\uC11C \uC774 \uD56D\uBAA9\uC744 \uBE8D\uB2C8\uB2E4 (\uB2E4\uC2DC [\uBA38\uC9C0]\uB85C \uB123\uC744 \uC218 \uC788\uC2B5\uB2C8\uB2E4)",discard:re,discard_action:re.action,resolve_action:Ce,resolve_enabled:!se,resolve_title:se?"\uC138\uC158 \uAE30\uB3D9 \uC694\uCCAD \uC911 \u2014 \uC11C\uBC84 \uC751\uB2F5\uC744 \uAE30\uB2E4\uB9BD\uB2C8\uB2E4":"\uC774 \uC2E4\uD328\uB97C \uC0AC\uB78C\uC774 \uC774\uC5B4\uBC1B\uB294 \uB300\uD654\uD615 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4 \u2014 \uAE30\uB85D\uB41C \uC138\uC158\uC774 \uC788\uC73C\uBA74 fork\uD558\uACE0, \uC5C6\uC73C\uBA74 \uC0C8 \uC138\uC158\uC5D0 \uC0AC\uC720\uB97C \uC2E3\uC2B5\uB2C8\uB2E4",merge_step:we,discard_enabled:re.enabled,discard_title:re.title,merge_enabled:!we&&!Te&&!i&&!pe&&!f&&!(ee&&ee.lock_actions)&&!ue&&X.active!==!0&&(Z||T||Q?.reason==="base_behind"||L||ge||Ge||et||D&&!C),merge_label:q?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":ge||Ge?Oe==="deploy"?"\uBC30\uD3EC \uC7AC\uC2DC\uB3C4 \uD6C4 \uC815\uB9AC":Oe==="verify"?"\uAC80\uC99D \uC7AC\uC2DC\uB3C4 \uD6C4 \uC815\uB9AC":"\uC815\uB9AC \uC7AC\uC2DC\uB3C4":T&&!we&&!ge?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":Q?.reason==="base_behind"?"base \uAC31\uC2E0 \uD6C4 \uBA38\uC9C0":L?"\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0":ve?"\uB2E4\uC2DC \uBA38\uC9C0":void 0,merge_title:pe?re.error?`\uD3D0\uAE30 \uC2E4\uD328: ${re.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${re.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:q?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":Te?"\uC694\uCCAD\uC744 \uBCF4\uB0B4\uB294 \uC911 \u2014 \uC11C\uBC84 \uC751\uB2F5\uC744 \uAE30\uB2E4\uB9BD\uB2C8\uB2E4":we?`\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 ${we.label}`:Oe?`\uBA38\uC9C0 \uC644\uB8CC \u2014 ${Oe==="deploy"?"\uBC30\uD3EC":"\uAC80\uC99D"} \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD574 \uC815\uB9AC\uAC00 \uBA48\uCDC4\uC2B5\uB2C8\uB2E4. \uD074\uB9AD\uD558\uBA74 \uC800\uC7A5\uC18C \uC791\uC5C5\uBD80\uD130 \uC815\uB9AC\uB97C \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4`:Ge?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uB2E4\uC2DC \uC2DC\uB3C4\uD569\uB2C8\uB2E4":ue?"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uC9C1\uC811 \uD574\uC18C\uD558\uC138\uC694":i==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC2E4\uD589 \uC911 \u2014 \uC644\uB8CC \uD6C4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":i==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC77C\uC2DC\uC815\uC9C0 \u2014 \uC7AC\uAC1C \uD6C4 \uC644\uB8CC\uB418\uBA74 \uBA38\uC9C0\uD558\uC138\uC694":ge?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC2DC\uB3C4\uD569\uB2C8\uB2E4":T?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":Q?.reason==="base_behind"?"base\uB97C \uC790\uB3D9 \uAC31\uC2E0\uD55C \uB4A4 \uBA38\uC9C0\uD569\uB2C8\uB2E4":X.active===!0?X.origin==="auto"?"\uC790\uB3D9 \uB9AC\uBDF0 \uC138\uC158 \uC2E4\uD589 \uC911 \u2014 \uB05D\uB098\uBA74 \uC601\uC218\uC99D\uC744 \uB2E4\uC2DC \uD310\uC815\uD569\uB2C8\uB2E4":"\uB9AC\uBDF0 \uC138\uC158 \uC2E4\uD589 \uC911 \u2014 \uB05D\uB098\uBA74 \uC601\uC218\uC99D\uC744 \uB2E4\uC2DC \uD310\uC815\uD569\uB2C8\uB2E4":Q?.reason==="review_receipt_missing"?"\uB9AC\uBDF0 \uC601\uC218\uC99D \uC5C6\uC74C \u2014 \uBA38\uC9C0 \uAC8C\uC774\uD2B8 \uBCF4\uB958\uC785\uB2C8\uB2E4. \uD074\uB9AD\uD558\uBA74 \uAE30\uB85D\uB41C \uC138\uC158\uC744 \uC774\uC5B4 \uB9AC\uBDF0\uB9CC \uC218\uD589\uC2DC\uD0A4\uACE0, \uC601\uC218\uC99D\uC774 \uCD5C\uC885 head\uC5D0 \uC720\uD6A8\uD574\uC9C0\uBA74 \uD050\uAC00 \uBA38\uC9C0\uD569\uB2C8\uB2E4":Q?.reason==="review_receipt_stale"?"head \uC7AC\uC791\uC131\uB428(\uC601\uC218\uC99D\uC774 \uD604\uC7AC head\uC758 \uC870\uC0C1\uC774 \uC544\uB2D8) \u2014 \uBA38\uC9C0 \uAC8C\uC774\uD2B8 \uBCF4\uB958\uC785\uB2C8\uB2E4. \uD074\uB9AD\uD558\uBA74 \uAE30\uB85D\uB41C \uC138\uC158\uC744 \uC774\uC5B4 \uCD5C\uC885 head\uB97C \uB2E4\uC2DC \uB9AC\uBDF0\uC2DC\uD0A4\uACE0, \uC601\uC218\uC99D\uC774 \uC720\uD6A8\uD574\uC9C0\uBA74 \uD050\uAC00 \uBA38\uC9C0\uD569\uB2C8\uB2E4":Q?.reason==="review_receipt_invalid"?"\uB9AC\uBDF0 \uC601\uC218\uC99D \uAE30\uB85D\uC774 \uC131\uB9BD\uD558\uC9C0 \uC54A\uC74C \u2014 \uBA38\uC9C0 \uAC8C\uC774\uD2B8 \uBCF4\uB958\uC785\uB2C8\uB2E4. \uD074\uB9AD\uD558\uBA74 \uAE30\uB85D\uB41C \uC138\uC158\uC744 \uC774\uC5B4 \uCD5C\uC885 head\uB97C \uB2E4\uC2DC \uB9AC\uBDF0\uC2DC\uD0A4\uACE0, \uC601\uC218\uC99D\uC774 \uC720\uD6A8\uD574\uC9C0\uBA74 \uD050\uAC00 \uBA38\uC9C0\uD569\uB2C8\uB2E4":Q?.reason==="review_receipt_undetermined"?"\uB9AC\uBDF0 \uC601\uC218\uC99D ancestry probe \uBBF8\uC644\uB8CC \u2014 \uBA38\uC9C0 \uAC8C\uC774\uD2B8 \uBCF4\uB958\uC785\uB2C8\uB2E4. \uD074\uB9AD\uD558\uBA74 \uAE30\uB85D\uB41C \uC138\uC158\uC744 \uC774\uC5B4 \uCD5C\uC885 head\uB97C \uB2E4\uC2DC \uB9AC\uBDF0\uC2DC\uD0A4\uACE0, \uC0C8 \uC601\uC218\uC99D\uC774 \uCD5C\uC885 head\uC5D0 \uC720\uD6A8\uD574\uC9C0\uBA74 \uD050\uAC00 \uBA38\uC9C0\uD569\uB2C8\uB2E4":Q?.reason==="spec_id_missing"?"native spec_id \uBBF8\uAE30\uB85D \u2014 bd update --spec-id\uB85C \uAE30\uB85D\uD55C \uB4A4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":Z?`\uBA38\uC9C0 (${Q.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4 (\uCC28\uB840\uAC00 \uB418\uBA74 \uB2E4\uC2DC \uD655\uC778)`:Q&&Q.tier==="merged"?"\uBA38\uC9C0\uB428 \u2014 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC \uC9C4\uD589 \uC911":`\uBA38\uC9C0 \uBD88\uAC00: ${Q&&Q.reason||"\uAD00\uCE21 \uB300\uAE30"}`}}function Cl(e,t={}){let{transport:n,issueStores:r,queueStore:o,sessionLogStore:s,gotoIssue:i,getWorkspacePath:l,switchWorkspace:a,openDoc:u,doneRange:p,onDoneRangeChange:f}=t,g=r?Wr(r):null,m=Mv(),k=null,R=null,B=Qr(()=>d()),X=new Map,se=new Map,j=hf(),q=xl(j)===null,C=p?Dn(p):jv();function I(){let y=Nr.find(v=>v.value===C);return y?y.label:"\uC624\uB298"}let F=Pi("beads-ui.worker.lane-collapsed"),V=!1,Q=new Set,P=new Set,K=new Set,H=new Set,ee=new Set,ke=new Set,Re=null,ne=[],D=Nf({queueStore:o,issueStores:r,transport:n,getWorkspacePath:l,onInvalidate:()=>d()});function ve(){D.refreshSessionDefaults()}let Ee=document.createElement("div");Ee.className="worker-console";let T=document.createElement("div");T.className="worker-top";let Z=document.createElement("div");Z.className="worker-drawer-overlay",Z.hidden=!0;let we=document.createElement("div");we.className="worker-drawer-overlay__backdrop";let he=document.createElement("div");he.className="worker-drawer-host";let Te=document.createElement("div");Te.className="worker-drawer-host",Te.hidden=!0,Z.append(we,he,Te);let ge=document.createElement("div");ge.className="worker-lanes-host",Ee.append(T,Z,ge),e.appendChild(Ee);let Oe=lr(null,null),Ge=[],et=Mi({transport:n,console_el:Ee,getLanes:()=>Oe,getWorkspaces:()=>Ge,getCrossLanes:()=>null,reproject:()=>({lanes:$(),raw_lanes:null}),onCorrection:()=>{},showToast:ye,requestRender:()=>d(),adoptQueue:(y,v)=>{o&&o.set(v)},onDragBegin:()=>{k=null}}),L=null,ue=uo(he,{transport:n,sessionLogStore:s,onClose:()=>{L=null,Z.hidden=!0,d()}}),re=Lf(Te,{onClose:()=>{Te.hidden=!0,Z.hidden=!0,d()}}),pe=Af({getWorkspacePath:l||(()=>"")}),Ce=l&&l()||"",_e=Ef({queueStore:o,transport:n,onChanged:()=>d(),onOpenScript:(y,v)=>{pe.open(y,v)}});function xe(){return o&&o.get()||{revision:0,auto_advance:!1,auto_merge:!1,slots:Wi,queue:[],serial_lanes:[],serial_lane_count:0,pr_wait:[],done:[]}}function We(){let y=xe(),v=typeof y.serial_lane_count=="number"&&Number.isInteger(y.serial_lane_count)&&y.serial_lane_count>0?Math.min(y.serial_lane_count,5):0,O=Array.isArray(y.serial_lanes)?y.serial_lanes:[],de=[];for(let Me of O){if(de.length>=v)break;!Me||typeof Me.id!="string"||!/^s[1-5]$/.test(Me.id)||!Array.isArray(Me.entries)||de.push({id:Me.id,label:`\uC9C1\uB82C ${Me.id.slice(1)}`,count:Me.entries.length})}return de.length===0?null:[{id:"parallel",label:"\uBCD1\uB82C",count:(Array.isArray(y.queue)?y.queue:[]).length},...de]}function Qe(y){if(!k||!y.some(O=>O.id===k))return null;let v=We();return v?{bead_id:k,lanes:v}:null}function qe(){return l&&l()||""}async function J(y,v){await et.sendOp({type:"worker-queue-place",payload:{bead_id:y,...v==="parallel"?{}:{lane:v}},root_dir:qe()},y)}function U(){let y=xe();return typeof y.revision=="number"?y.revision:0}function Ae(y){y&&y.queue&&o&&o.set(y.queue)}async function lt(y){if(!n||!y)return;let v=await n("worker-attempt-pause",{attempt_id:y});v&&v.paused===!1&&v.reason&&ye(`\uC77C\uC2DC\uC815\uC9C0 \uAC70\uBD80: ${v.reason}`,"error",2400)}async function st(y,v="session"){if(!n||!y)return;let O=await Kr();if(O===null)return;let de=async(Me={})=>await n("worker-attempt-resume",{attempt_id:y,expected_revision:U(),...O!==""?{instructions:O}:{},...Me}),be=await de();Ae(be),be&&be.conflict&&(be=await de(),Ae(be)),be=await zn(be,(Me,Ve)=>de({continuation:Me,decision_token:Ve}),{onResult:Ae,refresh:()=>de()}),be&&be.resumed===!1&&!be.conflict&&be.reason&&ye(`${v==="settlement"?"\uC815\uC0B0 \uC7AC\uAC1C":"\uC774\uC5B4\uD558\uAE30"} \uAC70\uBD80: ${be.reason}`,"error",2400)}async function b(y,v,O=!0){if(!n)return null;let de=n,be=await de(y,{...v,expected_revision:U()});return Ae(be),be&&be.conflict&&O&&(be=await de(y,{...v,expected_revision:U()}),Ae(be)),be}async function z(y){if(!n||!y)return;let v=xe().merge_queue?.find(de=>de.bead_id===y)?.continuation_action;if(v?.mismatch&&v.continuation===null){await pt(y,v.mismatch);return}Q.add(y),d();let O;try{O=await b("worker-merge-queue-add",{bead_id:y})}catch{ye("\uBA38\uC9C0 \uD074\uB9AD\uC774 \uC11C\uBC84\uC5D0 \uC804\uB2EC\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4(\uC5F0\uACB0 \uBB38\uC81C) \u2014 \uC5F0\uACB0 \uBCF5\uAD6C \uD6C4 \uB2E4\uC2DC \uB20C\uB7EC\uC8FC\uC138\uC694","error",3200);return}finally{Q.delete(y),d()}if(!(!O||O.applied)){if(O.conflict){ye("\uD050\uAC00 \uBC14\uB00C\uC5B4 \uBA38\uC9C0 \uD074\uB9AD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uB20C\uB7EC\uC8FC\uC138\uC694","error",2400);return}ye(Uv(O.reason),"error",2400)}}async function Ie(y){if(!(!n||!y||P.has(y))){P.add(y),d();try{let v=await n("worker-cleanup-retry",{bead_id:y,expected_revision:U()});Ae(v),v&&!v.retried&&!v.conflict&&v.reason&&ye(`\uC815\uB9AC \uC7AC\uC2DC\uB3C4 \uAC70\uBD80: ${v.reason}`,"error",2400)}finally{P.delete(y),d()}}}async function Le(y){if(!(!n||!y||K.has(y))){K.add(y),d();try{let v=await n("worker-resolve-in-session",{bead_id:y,expected_revision:U()});Ae(v),ye(Hv(v),Gv(v),4e3)}finally{K.delete(y),d()}}}async function Be(y,v){let O=xe().hold;if(!n||!O||typeof O.since!="number")return;let de=await n(y,{since:O.since});Ae(de),de&&de.ok===!1&&ye(`${v}: ${de.reason==="hold_changed"?"\uD050 \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uD655\uC778\uD558\uC138\uC694":de.reason||""}`,"error",2800)}async function He(y,v){if(!n||!y||!v)return;let O=await n("worker-parked-retry",{bead_id:y,attempt_id:v});Ae(O),O&&O.ok===!1&&ye(`\uC7AC\uC2DC\uB3C4 \uAC70\uBD80: ${O.reason==="not_latest"?"\uC774 bead\uC5D0 \uB354 \uC0C8\uB85C\uC6B4 \uC2DC\uB3C4\uAC00 \uC788\uC2B5\uB2C8\uB2E4":O.reason||""}`,"error",2800)}async function pt(y,v){let O=await zn({continuation_mismatch:v},(be,Me)=>b("worker-merge-queue-add",{bead_id:y,continuation:be,decision_token:Me},!1)),de=O?.queue?.merge_queue?.find(be=>be.bead_id===y)?.continuation_action;if(O?.applied!==!0&&de?.continuation===null&&de.mismatch){await pt(y,de.mismatch);return}O&&O.applied===!1&&!O.conflict&&ye("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD\uC774 \uCD5C\uC2E0 \uC0C1\uD0DC\uC640 \uC77C\uCE58\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4","error",2800)}async function xt(y){if(!n)return;let v=await b("worker-merge-auto-toggle",{on:y});!v||v.conflict||ye(y?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0 \u2014 \uB300\uAE30 \uD56D\uBAA9\uC744 \uBE44\uC6E0\uC2B5\uB2C8\uB2E4",y?"success":"info",2400)}async function Mt(y){if(!n||!y)return;let v=await b("worker-merge-queue-remove",{bead_id:y});v&&!v.conflict&&!v.applied&&v.reason==="merge_active"&&ye("\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error",2400)}async function Nt(){await b("worker-merge-queue-remove",{all:!0})}async function mt(y,v=null,O="unmerged",de=null){if(!n||!y)return;let be=Lo(y,O);if(!(!!de||typeof globalThis.confirm!="function"||globalThis.confirm(be)))return;let Ve=await n("worker-discard",{bead_id:y,...v?{attempt_id:v}:{},...de?{operation_id:de}:{},expected_revision:U()});if(Ae(Ve),Ve&&Ve.conflict&&(Ve=await n("worker-discard",{bead_id:y,...v?{attempt_id:v}:{},...de?{operation_id:de}:{},expected_revision:U()}),Ae(Ve)),Ve&&Ve.discarded===!0){ye(Vs(Ve),"success",5e3);return}if(Ve&&Ve.reason){ye(`\uD3D0\uAE30 \uC2E4\uD328: ${Ve.reason}`,"error",2800);return}if(Ve&&Ve.accepted&&Ve.pending==="merged_revert"){ye("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success",2400);return}if(Ve&&Ve.accepted&&!Ve.discarded){ye(`\uD3D0\uAE30 \uC9C4\uD589: ${Ve.phase||"\uBC31\uC5C5 \uC911"}`,"success",2400);return}Ve&&!Ve.conflict&&ye("\uD3D0\uAE30 \uAC70\uBD80: unknown","error",2800)}async function ct(y,v,O){if(!(!n||!v||!O||ee.has(v))){ee.add(v),d();try{let de=await n(y,{bead_id:v,action_id:O,expected_revision:U()});Ae(de),de?.conflict?ye("\uC774\uC804 \uC791\uC5C5 \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694.","error",2800):!de?.ok&&de?.reason&&ye(`\uC774\uC804 \uC791\uC5C5 \uCC98\uB9AC \uAC70\uBD80: ${String(de.reason)}`,"error",2800)}finally{ee.delete(v),d()}}}async function At(y,v){if(!n||!v||H.has(v))return;H.add(v),d();let O;try{let de=async(be={})=>await n(y,{bead_id:v,expected_revision:U(),...be});O=await de(),Ae(O),O&&O.conflict&&(O=await n(y,{bead_id:v,expected_revision:U()}),Ae(O)),y==="worker-revise-fix"&&(O=await zn(O,(be,Me)=>de({continuation:be,decision_token:Me}),{onResult:Ae,refresh:()=>de()}))}finally{H.delete(v),d()}if(!(!O||O.conflict)){if(O.ok){ye(y==="worker-revise-fix"?"\uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4 \u2014 \uC218\uB9AC \uD6C4 \uAD6C\uD604\uC774 \uC7AC\uB514\uC2A4\uD328\uCE58\uB429\uB2C8\uB2E4":"\uB378\uD0C0 \uC2B9\uC778 \uC644\uB8CC \u2014 \uC601\uC218\uC99D \uAC31\uC2E0 + \uD30C\uD0B9 \uD574\uC81C","success",2800);return}ye(`\uCC98\uBD84 \uAC70\uBD80: ${O.reason||""}`,"error",3e3)}}async function Rt(y){if(!n)return;let v=await n("worker-automation-toggle",{on:y,expected_revision:U()});Ae(v),v&&v.conflict&&await n("worker-automation-toggle",{on:y,expected_revision:U()}).then(Ae)}async function Lt(y){if(!n||!y)return;let v=await n("worker-repo-operation-dismiss",{operation_id:y});Ae(v),v&&v.ok===!1&&ye(`\uAE30\uB85D \uB2EB\uAE30 \uAC70\uBD80: ${v.reason||""}`,"error",3e3)}async function ae(y){if(!n||!Number.isFinite(y))return;let v=Math.max(Wi,Math.floor(y)),O=await n("worker-queue-set-slots",{slots:v,expected_revision:U()});Ae(O),O&&O.conflict&&await n("worker-queue-set-slots",{slots:v,expected_revision:U()}).then(Ae)}async function ie(y){if(!n||!Number.isInteger(y)||y<1||y>qf)return;let v=xe(),O=(Array.isArray(v.serial_lanes)?v.serial_lanes:[]).slice(y).reduce((Me,Ve)=>Me+(Array.isArray(Ve?.entries)?Ve.entries.length:0),0),de=()=>({count:y,expected_revision:U()}),be=await n("worker-queue-set-serial-lane-count",de());Ae(be),be&&be.conflict&&(be=await n("worker-queue-set-serial-lane-count",de()),Ae(be)),be&&be.applied&&O>0&&ye(`\uC9C1\uB82C \uB808\uC778 \uCD95\uC18C \u2014 ${O}\uAC1C \uD56D\uBAA9\uC774 \uBCD1\uB82C \uB300\uAE30\uB85C \uC774\uB3D9`)}function $(){let y=$r(C),v=D.read({candidate_sort:j,done_since:y});return Ge=v.workspaces,Oe=lr(v.workspaces,v.workspaces_state,{done_since:y,candidate_filter:m,candidate_hidden_counts:"per_control",candidate_sort:"as_given",groups:"all"}),Oe}function M(y){return y.queue_groups[0]||Dv}function oe(y){let v=y.dependency_chips||null,O={...v&&v.released?{released:v.released}:{},...v&&v.dependents?{dependents:v.dependents}:{}},de=X.get(y.id),be=se.get(y.id)||null,Me=de&&de.overlaps.length>0?de.overlaps:null,Ve=!!de&&de.scope_missing;return!be&&!Me&&!Ve&&Object.keys(O).length===0?null:{...O,...be?{predecessors:be}:{},...Me?{overlaps:Me}:{},...Ve?{scope_missing:!0}:{}}}function te(y){return{...y,workspace_name:"",done_layout:void 0,dependency_chips:oe(y)||void 0,chip_popover:le(y)}}function le(y){return ni(y,v=>B.isOpen({bead_id:y.id,chip_key:v}))}function Fe(){let y=xe(),v=new Map;for(let O of Object.values(_n(y.lane_states))){let de=Array.isArray(O?.corrections)?O.corrections:[];for(let be of de)be&&typeof be.bead_id=="string"&&typeof be.after=="string"&&v.set(be.bead_id,be.after)}return{admission:_n(y.admission),correction_after:v}}function Ke(y,v){let O=te(y),de=Ou(v.admission[y.id]||null,!!y.discard||ee.has(y.id)),be=v.correction_after.get(y.id);return{...O,draggable:O.draggable===!0&&!de,stale_work:de,reason:de?"":O.reason,badges:be?[`\u{1F517} ${be} \uB4A4 (blocks \uC790\uB3D9)`,...O.badges||[]]:O.badges,revise_enabled:O.revise_enabled===!0&&!H.has(y.id)}}function Je(y){let v=Fe();return M(y).sublanes.parallel.map(O=>Ke(O,v))}function Ue(y){let v=Fe();return M(y).sublanes.serial.map(O=>{let de=O.occupants.map(be=>({id:be.id,title:be.title,draggable:!1,lane:O.id,ghost:!0,badges:[be.badge]}));return{id:O.id,index:O.index+1,raw_length:O.raw_length,ghosts:de,items:O.items.map(be=>Ke(be,v)),occupied:O.occupied_by.length>0,badge:O.occupants.length>0?O.occupants[0].badge:"\uB300\uAE30",cycle:O.cycle===!0}})}function kt(y){return y.runnable.map(v=>te(v))}function qt(y){return y.done.map(v=>te(v))}function yt(y){let v=y.running.filter(O=>O.non_occupying!==!0).map(O=>({...O,bead_id:O.id,attempt_id:O.attempt_id||"",paused:O.run_state==="paused",failed:O.run_state==="failed",parked:O.run_state==="parked",retry_wait:O.run_state==="retry_wait",waiting:O.run_state==="waiting",wait:O.wait||null,status_label:O.run_state==="failed"?O.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328":O.run_state==="parked"?"\uC138\uC158 \uB300\uAE30":O.run_state==="retry_wait"?"\uC7AC\uC2DC\uB3C4 \uB300\uAE30":O.run_state==="waiting"?"\uC120\uD589 \uB300\uAE30":void 0,can_pause:O.can_pause!==!1,workspace_name:"",dependency_chips:oe(O)||void 0,chip_popover:le(O),rollup_expanded:ke.has(O.id),failure:O.failure?{...O.failure,open:R===O.attempt_id}:null}));return[...v.filter(O=>O.failed===!0),...v.filter(O=>O.failed!==!0&&O.parked===!0),...v.filter(O=>O.failed!==!0&&O.parked!==!0)]}function Jt(y){return St(y).map(v=>({...v,chip_popover:le(v)}))}function St(y){if(Re&&Re.model===y)return Re.rows;let v=xe(),O=M(y),de=_n(v.attempts),be=Object.values(de).filter(Kn),Me=new Map;for(let ze of be)Me.set(ze.attempt_id,ze);let Ve=new Map;for(let ze of be)Ve.set(ze.bead_id,ze);let Et=new Map;for(let ze of[...y.pr_wait,...y.running,...y.queue,...y.runnable,...y.done])Et.has(ze.id)||Et.set(ze.id,ze);let Ft=ze=>{let Bt=null;for(let vn of be)!vn||vn.bead_id!==ze||qa(vn,Me)||(Bt===null||(typeof vn.started_at=="number"?vn.started_at:0)>=(typeof Bt.started_at=="number"?Bt.started_at:0))&&(Bt=vn);return Bt&&typeof Bt.target_base=="string"?Bt.target_base:null},Vt=new Map;for(let ze of y.running)ze.run_state==="failed"||ze.conflict_resolution!==!0||(ze.run_state!=="paused"?Vt.set(ze.id,"running"):Vt.has(ze.id)||Vt.set(ze.id,"paused"));let $n=_n(v.auto_merge_skips),yn=new Set(O.merge.auto_excluded),mr=_n(v.pr_observations),Pn=_n(v.pr_activity),jn=_n(v.cleanup_failed),Xt=_n(v.discard_operations),er=_n(v.bead_workflow),gr=_n(v.bead_titles),hr=v.merge_queue_state||{active:null,failures:{}},xn=O.merge.state.waiting,Fn=new Map;for(let ze of Array.isArray(v.merge_queue)?v.merge_queue:[])ze&&typeof ze=="object"&&ze.bead_id&&Fn.set(ze.bead_id,ze);let tr=(Array.isArray(v.pr_wait)?v.pr_wait:[]).map(ze=>{let Bt=Et.get(ze.bead_id);return{...rw(ze.bead_id,Bt?.title||gr[ze.bead_id]||ze.bead_id,mr,jn[ze.bead_id]||null,Gn(de,ze.bead_id),Pn[ze.bead_id]||(Q.has(ze.bead_id)?{activity:null,merge_progress:null,queueing:"merge"}:P.has(ze.bead_id)?{activity:null,merge_progress:null,queueing:"cleanup"}:null),Vt.get(ze.bead_id)||null,ze.external===!0,{position:O.merge.positions.get(ze.bead_id)||0,active:hr.active===ze.bead_id,failure:_n(hr.failures)[ze.bead_id]||null,waiting:xn&&xn.bead_id===ze.bead_id?xn.reason:null,resolution:O.merge.resolutions.get(ze.bead_id),continuation_action:O.merge.continuations.get(ze.bead_id),authority:O.merge.authorities.get(ze.bead_id)||null,hold:Fn.get(ze.bead_id)?.hold||null,review_dispatch:Fn.get(ze.bead_id)?.review_dispatch||null},ze.wt_present!==!1,v.auto_merge===!0&&yn.has(ze.bead_id)?$n[ze.bead_id]?.reason||"":null,Na(O.declared_base,Ft(ze.bead_id)),_n(v.completion_status)[ze.bead_id]||null,Xt,v.auto_merge===!0,{merge_sha:ze.merge_sha,cleanup_cursor:ze.cleanup_cursor,repo_operations:O.repo_operations},Bt?oe(Bt):null,Eu(de,ze.bead_id),K.has(ze.bead_id)),workflow:er[ze.bead_id]||null,priority:Bt?.priority,from_id:Bt?.from_id,...Bt?.created_at===void 0?{}:{created_at:Bt.created_at},...Bt?.updated_at===void 0?{}:{updated_at:Bt.updated_at}}});return Re={model:y,rows:tr},tr}function Ot(y){let v=M(y),O=[];for(let Me of y.running)Me.non_occupying!==!0&&O.push({id:Me.id,title:Me.title,location_label:"\uC2E4\uD589\uC911",kind:"running",lane_id:Me.serial_lane_id??null});for(let Me of y.pr_wait)O.push({id:Me.id,title:Me.title,location_label:"PR \uB300\uAE30",kind:"pr_wait",lane_id:null});for(let Me of v.sublanes.serial)Me.items.forEach((Ve,Et)=>{O.push({id:Ve.id,title:Ve.title,location_label:`${Me.id} #${Et+1}`,kind:"serial",lane_id:Me.id})});v.sublanes.parallel.forEach((Me,Ve)=>{O.push({id:Me.id,title:Me.title,location_label:`#${Ve+1}`,kind:"parallel",lane_id:null})});for(let Me of y.runnable)O.push({id:Me.id,title:Me.title,location_label:"\uD6C4\uBCF4",kind:"candidate",lane_id:null,queue_placeable:Me.queue_placeable===!0});let de=xe();X=wf(de.bead_scope,O);let be=new Map;for(let Me of[...y.running,...y.runnable])Array.isArray(Me.blocked_by)&&Me.blocked_by.length>0&&be.set(Me.id,Me.blocked_by);for(let[Me,Ve]of Object.entries(_n(de.bead_blocked_by)))Array.isArray(Ve)&&be.set(Me,Ve.filter(Et=>typeof Et=="string"&&Et.length>0));se=Uu(be,O,_n(de.blocker_workspaces))}function Wt(y){let v=y.hold&&typeof y.hold=="object"?y.hold:null;if(!v||v.kind!=="env"&&v.kind!=="systemic")return"";let O=dr(v.cause)||String(v.cause||""),de=Array.isArray(y.lineages)?y.lineages:[];if(v.kind==="env"){let Me=de.map(Et=>Et&&Et.next_at).filter(Et=>typeof Et=="number").sort((Et,Ft)=>Et-Ft)[0],Ve=typeof Me=="number"?` \xB7 \uB2E4\uC74C ${new Date(Me).toLocaleTimeString("ko-KR",{hour:"2-digit",minute:"2-digit"})}`:"";return c`<div class="worker-hold worker-hold--env" role="status">
        <span class="worker-hold__text"
          >환경 보류: ${O} — 재시도 대기${Ve}</span
        >
        <button
          type="button"
          class="worker-hold__retry"
          title="예약된 재시도를 지금 실행합니다"
        >
          지금 재시도
        </button>
      </div>`}let be=(Array.isArray(v.bead_ids)?v.bead_ids:[]).filter(Me=>typeof Me=="string"&&Me.length>0);return c`<div class="worker-hold worker-hold--systemic" role="alert">
      <span class="worker-hold__text"
        >${O}${be.length>0?` \u2014 bead ${be.join(", ")}`:""}</span
      >
      <button
        type="button"
        class="worker-hold__resume"
        title="정지를 풀고 멈춰 있던 bead를 다시 디스패치합니다"
      >
        재개
      </button>
    </div>`}function ut(y){let v=xe(),O=M(y),de=O.sublanes.parallel,be=de.length>0?de[0].id:"\u2014",Me=c`<button
      type="button"
      class="worker-play${v.auto_advance?" is-active":""}"
    >
      ${v.auto_advance?"\u23F8 \uC790\uB3D9\uD654 \uBA48\uCDA4":"\u25B6 \uC790\uB3D9\uD654"}
    </button>`,Ve=jt(y),Et=O.over_cap?c`<span
          class="worker-overcap"
          title="수동 재개(▶)는 슬롯 cap을 초과할 수 있습니다 — 자동 진행은 cap을 지킵니다"
          >cap 초과</span
        >`:"",Ft=v.auto_advance?0:(Array.isArray(v.queue)?v.queue:[]).filter(Xt=>Xt&&typeof Xt.armed_by_lane=="string"&&Xt.armed_by_lane.length>0).length,Vt=Ft>0?c`<span
            class="worker-kpi__chip worker-kpi__chip--armed"
            title="모니터 연결 레인이 발차한 대기 행입니다 — 이 레포의 자동 진행은 꺼진 채입니다"
            >⏸ 자동 진행 꺼짐 · 연결 레인 ${Ft}건 진행 중</span
          >`:"",$n=c`<span class="worker-kpi__chip worker-kpi__chip--running"
        >실행 <b>${O.live_count}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--pr"
        >PR 대기 <b>${Jt(y).length}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--done"
        >${I()} 완료 <b>${y.done.length}</b></span
      >`,yn=c`<span
      class="worker-kpi__chip worker-kpi__chip--base"
      title=${O.declared_base?"\uC774 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uC5B8\uD55C target base (docs/agents/repo-ops.toml). \uB514\uC2A4\uD328\uCE58 \uC2DC\uC810\uC758 \uAC80\uC99D\uC740 \uBCC4\uB3C4":"\uC120\uC5B8 \uD30C\uC77C\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 \u2014 target base \uD655\uC778 \uBD88\uAC00"}
      >base ${O.declared_base||"?"}</span
    >`,mr=c`<label class="worker-tgl worker-slots"
        >동시 실행
        <input
          type="number"
          class="worker-slots__input"
          min=${Wi}
          step="1"
          .value=${String(O.slots)}
          title="동시에 실행할 세션 수 (최소 1 = 순차 실행)"
      /></label>
      <label
        class="worker-tgl worker-serial-lanes"
        title="고정 직렬 레인 수 (1~5). 축소 시 잘린 레인의 대기 항목은 병렬 대기로 돌아갑니다"
        >직렬 레인
        <select class="worker-serial-lane-count" aria-label="직렬 레인 수">
          ${Array.from({length:qf},(Xt,er)=>er+1).map(Xt=>c`<option
                value=${String(Xt)}
                ?selected=${O.serial_lane_count===Xt}
              >
                ${Xt}
              </option>`)}
        </select>
      </label> `,Pn=Cu(O.repo_operations,O.cleanup_failures),jn=Wt(v);return V?c`<div class="worker-ribbon">
          ${Me} ${Ve}
          <div class="worker-kpi worker-kpi--ribbon">
            ${Et}${Vt}${$n}
          </div>
        </div>
        <div class="worker-ctrl worker-ctrl--mobile">
          <div class="worker-ctrl__ops">${mr}</div>
          <div class="worker-kpi">${yn}</div>
        </div>
        ${jn}${Pn}${_e.template()}`:c`<div class="worker-ctrl">
        <div class="worker-ctrl__ops">${Me}${Ve}${mr}</div>
        <div class="worker-kpi">
          ${Et}${Vt}${$n}${yn}
          ${(Array.isArray(O.token_total)?O.token_total:O.token_total?[{label:O.token_total,tooltip:`${I()} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}]:[]).map(Xt=>c`<span
                class="worker-kpi__chip worker-kpi__chip--tokens"
                title=${Xt.tooltip}
                >${I()} 완료 · 누적 ${Xt.label}</span
              >`)}
          <span class="worker-kpi__next worker-stat"
            >다음 <b>${be}</b></span
          >
        </div>
      </div>
      ${jn}${Pn}${_e.template()}`}function Kt(y){let v=y.runnable_hidden;return c`<div class="worker-filter">
      <label class="worker-filter__tgl" title="blocked 이슈 표시 (기본 숨김)">
        <input
          type="checkbox"
          class="worker-filter__blocked"
          .checked=${m.show_blocked}
        />
        🔒 blocked${v.blocked>0?` ${v.blocked}`:""}
      </label>
      <div class="worker-filter__spec" role="group" aria-label="spec 필터">
        ${qv.map(O=>c`<button
              type="button"
              class="worker-filter__chip${m.spec===O.value?" is-active":""}"
              data-spec=${O.value}
              aria-pressed=${m.spec===O.value?"true":"false"}
            >
              ${O.label}
            </button>`)}
        ${v.spec>0?c`<span class="worker-filter__hidden">숨김 ${v.spec}</span>`:""}
      </div>
    </div>`}function Yt(){let y=q?"custom":xl(j)||"custom";return c`<select
      class="worker-sort"
      aria-label="후보 정렬"
      title="후보 정렬"
      .value=${y}
    >
      ${ss.map(v=>c`<option value=${v.id} ?selected=${y===v.id}>
            ${v.label}
          </option>`)}
      <option value="custom" ?selected=${y==="custom"}>
        사용자 지정…
      </option>
    </select>`}function zt(){let y=is(j);return c`<div
      class="worker-sort-chain"
      role="group"
      aria-label="후보 정렬 체인"
    >
      ${[0,1,2].map(v=>{let O=y[v];return c`<span class="worker-sort-chain__step">
          <select
            class="worker-sort-chain__key"
            data-step=${v}
            aria-label=${`${v+1}\uCC28 \uC815\uB82C \uD0A4`}
            .value=${O?O.key:""}
          >
            ${v===0?"":c`<option value="" ?selected=${!O}>없음</option>`}
            ${gf.map(de=>c`<option
                  value=${de.key}
                  ?selected=${!!O&&O.key===de.key}
                >
                  ${de.label}
                </option>`)}
          </select>
          ${O?c`<button
                type="button"
                class="worker-sort-chain__dir"
                data-step=${v}
                aria-label=${O.dir==="asc"?"\uC624\uB984\uCC28\uC21C":"\uB0B4\uB9BC\uCC28\uC21C"}
                title=${O.dir==="asc"?"\uC624\uB984\uCC28\uC21C":"\uB0B4\uB9BC\uCC28\uC21C"}
              >
                ${O.dir==="asc"?"\u2191":"\u2193"}
              </button>`:""}
        </span>`})}
    </div>`}function mn(){return c`<div class="worker-done-controls">
      <select
        class="worker-sort worker-done-range"
        aria-label="완료 기간"
        title="완료 기간"
        .value=${C}
      >
        ${Nr.map(y=>c`<option value=${y.value} ?selected=${C===y.value}>
              ${y.label}
            </option>`)}
      </select>
    </div>`}function jt(y){let v=M(y).merge,O=xe().auto_merge===!0;if(v.running)return c`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop${O?" is-active":""}"
        title=${O?"\uC790\uB3D9 \uBA38\uC9C0\uB97C \uB044\uACE0 \uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)":"\uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)"}
      >
        ${O?"\u23F8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8":"\uC77C\uAD04 \uBA38\uC9C0 \uC911\uB2E8"} ${v.positions.size}
      </button>`;if(O)return c`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop is-active"
        title="자동 머지 켜짐 — 자격이 생기는 PR을 계속 큐에 넣습니다. 클릭하면 끕니다"
      >
        ⏸ 자동 머지
      </button>`;let de=new Set(v.auto_excluded),be=Jt(y).filter(Me=>Me.merge_action&&Me.merge_enabled&&!de.has(Me.id)).length;return c`<button
      type="button"
      class="worker-merge-all"
      title="켜 두면 자격이 생기는 PR을 계속 큐에 넣어 순서대로 충돌 해소·머지합니다"
    >
      ▶ 자동 머지${be>0?` ${be}`:""}
    </button>`}function en(y){if(!(y.draggable!==!0||y.done===!0))return c`<span class="worker-mini__rowops">
      <button
        type="button"
        class="worker-mini__rowops-remove"
        data-action="queue-remove"
        data-bead-id=${y.id}
        title="대기에서 빼기"
        aria-label="대기에서 빼기"
      >
        ✕
      </button>
    </span>`}function Ht(y,v){return c`<div
      data-bead-id=${y.id}
      data-drag-kind=${v.kind}
      data-root-dir=${v.root_dir}
      data-lane-id=${on(v.lane_id)}
      data-row-index=${v.row_index}
      data-queue-index=${String(y.queue_index??0)}
    >
      ${Tn(y,{actions:en(y)})}
    </div>`}function nn(y){let v=Je(y),O=qe();return oi({parallel:{rows:v.map((de,be)=>Ht(de,{kind:"parallel",root_dir:O,row_index:be})),count:v.length,collapsed:F.isAreaCollapsed("parallel"),drop:{drop:"parallel",root_dir:O}},serial:{lanes:Ue(y).map(de=>({id:de.id,title:`\uC9C1\uB82C ${de.index}`,rows:[...de.ghosts.map(be=>Tn(be,{actions:en(be)})),...de.items.map((be,Me)=>Ht(be,{kind:"repo-serial",root_dir:O,row_index:Me,lane_id:de.id}))],count:de.ghosts.length+de.items.length,empty:de.ghosts.length+de.items.length===0,badge:de.badge,held:de.occupied,cycle:de.cycle,drop:{drop:"repo-serial",root_dir:O,lane_id:de.id,lane_length:String(de.raw_length)}})),collapsed:F.isAreaCollapsed("serial")}})}function fe(y){return Tp(yt(y),Date.now(),L)}function E(y){return y.running.some(v=>v.kind!=="session"&&v.run_state==="running")}function me(y){let v=M(y),O=kt(y),de=Je(y),be=qt(y),Me=Jt(y),Ve=yt(y),Et=qn({id:"worker-pane-candidate",lane:"candidate",title:"\uD6C4\uBCF4",items:O,src:!0,empty:"\uD6C4\uBCF4 \uC5C6\uC74C",header_control:Yt(),header_row:q?zt():void 0,controls:Kt(y),collapsible:!0,collapsed:F.isCollapsed("candidate"),place_menu:Qe(O),onOpenDoc:u?(Vt,$n)=>u($n):void 0}),Ft=qn({id:"worker-pane-done",lane:"done",title:"\uC644\uB8CC",items:be,empty:`${I()} \uC644\uB8CC \uC5C6\uC74C`,header_control:mn(),collapsible:!0,collapsed:F.isCollapsed("done"),preview:V?Array.isArray(v.token_total)?v.token_total.map(Vt=>Vt.label).join(" \xB7 "):v.token_total||jf(be):void 0});return V?c`<div class="worker-lanes worker-lanes--mobile">
        ${si({live:E(y),running_body:Ve.length>0?fe(y):"",pr_wait_rows:Me.map(Vt=>Tn(Vt)),count:Ve.length+Me.length})}
        ${qn({id:"worker-pane-queue",lane:"queue",title:"\uB300\uAE30",items:de,count:de.length,collapsible:!0,collapsed:F.isCollapsed("queue"),preview:jf(de),body:nn(y)})}
        ${Et} ${Ft}
      </div>`:c`<div class="worker-lanes">
      ${Et}
      ${qn({id:"worker-pane-queue",lane:"queue",title:"\uB300\uAE30",items:de,count:de.length,collapsible:!0,collapsed:F.isCollapsed("queue"),body:nn(y)})}
      ${qn({id:"worker-pane-running",lane:"running",title:"\uC2E4\uD589 \uC911",items:Ve,header_control:c`<span class="worker-pane__meta"
          >슬롯 ${v.slots}</span
        >`,live:E(y),collapsible:!0,collapsed:F.isCollapsed("running"),body:fe(y)})}
      ${qn({id:"worker-pane-pr-wait",lane:"pr_wait",title:"PR \uB300\uAE30",items:Me,empty:"PR \uB300\uAE30 \uC5C6\uC74C",collapsible:!0,collapsed:F.isCollapsed("pr_wait")})}
      ${Ft}
    </div>`}function De(y){F.toggle(y),d()}function h(y){F.toggleArea(y),d()}function d(){let y=$();Ot(y),ot(ut(y),T),ot(me(y),ge)}function _(){let y=!0,v=Li(O=>{if(V=O,y){y=!1;return}d()});ne.push(v)}function S(y){m=y,Nv(y),d()}function G(y){if(y==="custom"){q=!0,d();return}j=Dr(y),Al(j),q=!1,d()}function Y(y){j=Dr({chain:y}),Al(j),d()}function ce(y){C=Dn(y),Fv(C),f?.(C),d()}function Se(y){let v=y.target?.closest?.(".worker-serial-lane-count");if(v){let Ft=Number.parseInt(v.value,10);Number.isFinite(Ft)&&ie(Ft).then(d);return}let O=y.target?.closest?.(".worker-filter__blocked");if(O){S({...m,show_blocked:O.checked});return}let de=y.target?.closest?.(".worker-sort-chain__key");if(de){let Ft=Number.parseInt(de.getAttribute("data-step")||"",10);Number.isFinite(Ft)&&Y(bf(is(j),Ft,de.value));return}let be=y.target?.closest?.(".worker-done-range");if(be){ce(be.value);return}let Me=y.target?.closest?.(".worker-sort");if(Me){G(Me.value);return}let Ve=y.target?.closest?.(".worker-slots__input");if(!Ve)return;let Et=Number.parseInt(Ve.value,10);if(!Number.isFinite(Et)){d();return}ae(Et).then(d)}function Ye(y){return y?{runner:y.runner||void 0,model:y.model||void 0,effort:y.effort||void 0,worktree:y.worktree||void 0,status:y.status||void 0,session_id:y.session_id||void 0}:{}}function rt(){let y=M($()),v=xe().workspace_info,O=v&&typeof v=="object"&&v.repo_ops&&typeof v.repo_ops=="object"?v.repo_ops:null;return{operations:y.repo_operations,cleanup_failures:y.cleanup_failures,repo:l&&l()||"",repo_ops:O}}function vt(){L&&ue.close(),Te.hidden=!1,Z.hidden=!1,re.open(rt()),d()}function gt(y){let v=xe(),O=v.attempts?v.attempts[y]:null;L=y,re.close(),Te.hidden=!0,Z.hidden=!1,ue.open({attempt_id:y,meta:Ye(O)}),d()}function x(y){let v=xe(),O=(Array.isArray(v.session_active)?v.session_active:[]).find(be=>be&&be.bead_id===y),de=(O&&Array.isArray(O.session_refs)?O.session_refs:[]).find(be=>be&&be.current===!0);de&&(re.close(),Te.hidden=!0,Z.hidden=!1,ue.open(Yr(de,y,"in_progress")),d())}function A(){if(re.isOpen()&&re.refresh(rt()),!L)return;let y=xe(),v=y.attempts?y.attempts[L]:null;if(v){ue.updateMeta(Ye(v));return}ue.close()}function Pe(y,v){if(y.length===0||!i)return;let O=l?l():void 0;if(v.length===0||!O||v===O||!a){i(y);return}Promise.resolve(a(v)).then(()=>{i(y)}).catch(()=>{ye("\uB808\uD3EC \uC804\uD658\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error",2400)})}function je(y){let v=y.target;if(v?.closest?.(".worker-mini__grip"))return;let O=v?.closest?.(".worker-sort-chain__dir");if(O){let Ne=Number.parseInt(O.getAttribute("data-step")||"",10);Number.isFinite(Ne)&&Y(yf(is(j),Ne));return}let de=v?.closest?.(".worker-dep__open");if(de){Pe(de.getAttribute("data-dep-id")||"",de.getAttribute("data-root-dir")||"");return}let be=v?.closest?.(".judgement-chip");if(be){let Ne=be.closest("[data-bead-id]"),Ct=Ne&&Ne.getAttribute("data-bead-id")||"",Qt=be.getAttribute("data-chip-key")||"";Ct&&Qt&&B.toggle({bead_id:Ct,chip_key:Qt});return}if(v?.closest?.(".chip-popover"))return;if(v?.closest?.(".worker-repo-strip")){vt();return}let Me=v?.closest?.(".worker-repo-op__dismiss");if(Me){Lt(Me.dataset.operationId||"");return}let Ve=v?.closest?.(".worker-cleanup__resume");if(Ve){let Ne=Ve.dataset.beadId;Ne&&Ie(Ne);return}let Et=v?.closest?.(".worker-cleanup__resolve");if(Et){let Ne=Et.dataset.beadId;Ne&&Le(Ne);return}if(v?.closest?.(".worker-hold__retry")){Be("worker-queue-hold-retry-now","\uC9C0\uAE08 \uC7AC\uC2DC\uB3C4 \uAC70\uBD80");return}if(v?.closest?.(".worker-hold__resume")){Be("worker-queue-hold-resume","\uC7AC\uAC1C \uAC70\uBD80");return}if(v?.closest?.(".worker-play")){Rt(!xe().auto_advance);return}let Ft=v?.closest?.(".worker-merge-all");if(Ft){Ft.classList.contains("worker-merge-all--stop")?xe().auto_merge===!0?xt(!1):Nt():xt(!0);return}let Vt=v?.closest?.(".worker-pane__toggle[data-lane]");if(Vt){let Ne=Vt.dataset.lane;(Ne==="candidate"||Ne==="queue"||Ne==="running"||Ne==="pr_wait"||Ne==="done")&&De(Ne);return}let $n=v?.closest?.(".worker-wait__area-toggle[data-area]");if($n){let Ne=$n.dataset.area;(Ne==="parallel"||Ne==="serial")&&h(Ne);return}let yn=v?.closest?.(".worker-card__place-lane");if(yn){let Ne=yn.dataset.beadId,Ct=yn.dataset.lane;Ne&&(Ct==="parallel"||/^s[1-5]$/.test(Ct||""))&&(k=null,d(),J(Ne,Ct));return}if(v?.closest?.(".worker-card__place-cancel")){k=null,d();return}let Pn=v?.closest?.(".worker-card__place");if(Pn){let Ne=Pn.dataset.beadId;Ne&&!Pn.disabled&&(We()?(k=Ne,d()):J(Ne,"parallel"));return}let jn=v?.closest?.(".worker-filter__chip");if(jn){let Ne=jn.dataset.spec;(Ne==="all"||Ne==="with"||Ne==="without")&&S({...m,spec:Ne});return}let Xt=v?.closest?.('[data-action="queue-remove"]');if(Xt){let Ne=Xt.dataset.beadId||"";Ne&&et.sendOp({type:"worker-queue-remove",payload:{bead_id:Ne},root_dir:qe()},Ne);return}let er=v?.closest?.(".worker-mini__merge");if(er){let Ne=er.dataset.beadId||"";xe().cleanup_failed?.[Ne]?Ie(Ne):z(Ne);return}let gr=v?.closest?.(".worker-mini__merge-cancel");if(gr){Mt(gr.dataset.beadId||"");return}let hr=v?.closest?.(".worker-mini__resolve");if(hr){Le(hr.dataset.beadId||"");return}let xn=v?.closest?.(".worker-mini__discard");if(xn){mt(xn.dataset.beadId||"",xn.dataset.attemptId||null,xn.dataset.discardMode==="merged"?"merged":"unmerged",xn.dataset.operationId||null);return}let Fn=v?.closest?.(".worker-mini__stale-continue");if(Fn){ct("worker-stale-work-continue",Fn.dataset.beadId||"",Fn.dataset.actionId||"");return}let tr=v?.closest?.(".worker-mini__stale-backup");if(tr){ct("worker-stale-work-backup-fresh",tr.dataset.beadId||"",tr.dataset.actionId||"");return}let ze=v?.closest?.(".worker-mini__stale-recheck");if(ze){ct("worker-stale-work-recheck",ze.dataset.beadId||"",ze.dataset.actionId||"");return}let Bt=v?.closest?.(".worker-mini__revise-fix");if(Bt){At("worker-revise-fix",Bt.dataset.beadId||"");return}let vn=v?.closest?.(".worker-mini__revise-approve");if(vn){At("worker-revise-approve",vn.dataset.beadId||"");return}if(v?.closest?.(".worker-mini__pr"))return;let ls=v?.closest?.(".rtile__failure-badge");if(ls){let Ne=ls.dataset.attemptId||"";R=R===Ne?null:Ne,d();return}let cs=v?.closest?.(".rtile__attempt-copy");if(cs){let Ne=cs.dataset.attemptId||"";Ne&&an(Ne).then(Ct=>{ye(Ct?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",Ct?"success":"error",1400)});return}if(v?.closest?.(".rtile__parked-retry")){let Ne=v?.closest?.(".rtile");He(Ne?.dataset?.beadId||"",Ne?.dataset?.attemptId||"");return}let fo=v?.closest?.(".rtile__discard");if(fo){let Ne=v?.closest?.(".rtile"),Ct=Ne?.dataset?.beadId,Qt=Ne?.dataset?.attemptId;Ct&&mt(Ct,Qt||null,fo.dataset.confirmation==="merged"?"merged":"unmerged",fo.dataset.operationId||null);return}if(v?.closest?.(".rtile__pause")){let Ct=v?.closest?.(".rtile")?.dataset?.attemptId;Ct&&lt(Ct);return}if(v?.closest?.(".rtile__resume")){let Ne=v?.closest?.(".rtile__resume"),Qt=v?.closest?.(".rtile")?.dataset?.attemptId;Qt&&st(Qt,Ne?.dataset?.resumeKind==="settlement"?"settlement":"session");return}if(v?.closest?.(".rtile__session")){let Ne=v?.closest?.(".rtile"),Ct=Ne?.dataset?.attemptId;if(Ct){gt(Ct);return}let Qt=Ne?.dataset?.beadId;Qt&&x(Qt);return}if(v?.closest?.(".rtile__failure-pop"))return;if(v?.closest?.(".worker-drawer-overlay__backdrop")){re.close(),ue.close();return}if(v?.closest?.(".worker-drawer-host"))return;let us=v?.closest?.(".rtile .board-card__roll-toggle");if(us){let Ne=us.dataset.rollParent;Ne&&(ke.has(Ne)?ke.delete(Ne):ke.add(Ne),d());return}let ds=v?.closest?.(".rtile .board-card__roll-child");if(ds){let Ne=ds.dataset.childId;Ne&&i&&i(Ne);return}let _o=v?.closest?.(".rtile");if(_o){if(v?.closest?.(".rtile__id")){let Ct=_o.dataset.beadId;Ct&&an(Ct).then(Qt=>{Qt?ye("\uBCF5\uC0AC\uB428","success",1200):ye("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}let Ne=_o.dataset.beadId;Ne&&i&&i(Ne);return}let ps=v?.closest?.(".worker-mini, .worker-card");if(ps){let Ne=ps.dataset.beadId;if(v?.closest?.('[data-seam="log-path-copy"]'))return;if(v?.closest?.(".worker-mini__id, .worker-card__id")){Ne&&an(Ne).then(Qt=>{Qt?ye("\uBCF5\uC0AC\uB428","success",1200):ye("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}let Ct=v?.closest?.(".ctl-chip--from");if(Ct){let Qt=Ct.dataset.fromId;Qt&&i&&i(Qt);return}Ne&&i&&i(Ne)}}et.attach(e),e.addEventListener("click",je),e.addEventListener("change",Se);function Ze(y){let v=y.target,O=v&&typeof v.closest=="function"?de=>v.closest(de):()=>null;R&&!O(".rtile__failure-pop, .rtile__failure-badge")&&(R=null,d())}function _t(y){y.key!=="Escape"||R===null||(R=null,d())}return document.addEventListener("click",Ze),document.addEventListener("keydown",_t),B.attach(),ne.push(()=>{document.removeEventListener("click",Ze),document.removeEventListener("keydown",_t),B.detach()}),_(),g&&ne.push(g.subscribe(()=>{D.notifyIssuesChanged(),d()})),o&&ne.push(o.subscribe(()=>{let y=l&&l()||"";y!==Ce&&(Ce=y,pe.close()),d(),A()})),d(),{load(){D.ensureSessionDefaults(),d()},refreshSessionDefaults:ve,destroy(){for(let y of ne.splice(0))try{y()}catch{}et.detach(),e.removeEventListener("click",je),e.removeEventListener("change",Se),D.destroy();try{ue.destroy()}catch{}Z.hidden=!0;try{pe.destroy()}catch{}ot(c``,e)}}}function Rl(e){if(!e)return"Unknown";let t=e.split("/").filter(Boolean);return t.length>0?t[t.length-1]:"Unknown"}function Wf(e,t,n,r=async()=>{},o=async()=>{}){let s=It("views:workspace-picker"),i=null,l=!1,a=!1,u=!1;async function p(I){let V=I.target.value,P=t.getState().workspace?.current?.path||"";if(V&&V!==P){s("switching workspace to %s",V),l=!0,C();try{await n(V)}catch(K){s("workspace switch failed: %o",K)}finally{l=!1,C()}}}async function f(){let I=t.getState(),F=I.workspace?.current?.path||I.workspace?.available?.[0]?.path||"";if(!(!F||a)){s("git-pulling workspace %s",F),a=!0,C();try{await r(F)}catch(V){s("workspace git pull failed: %o",V)}finally{a=!1,C()}}}function g(I){let F=I.target;F&&e.contains(F)||R()}function m(I){I.key==="Escape"&&R()}function k(){u||(u=!0,document.addEventListener("mousedown",g),document.addEventListener("keydown",m),C())}function R(){u&&(u=!1,document.removeEventListener("mousedown",g),document.removeEventListener("keydown",m),C())}function B(){u?R():k()}async function X(I){let F=I.target,V=F.value,Q=F.checked;s("toggling visibility %s \u2192 %s",V,String(Q));try{await o(V,Q)}catch(P){s("workspace visibility toggle failed: %o",P)}}function se(I){return I?c`
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
    `:c``}function j(I,F){return c`
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
                ${I.map(V=>c`
                    <label
                      class="workspace-picker__manage-row"
                      title="${V.path}"
                    >
                      <input
                        type="checkbox"
                        class="workspace-picker__manage-checkbox"
                        value="${V.path}"
                        .checked=${!F.has(V.path)}
                        @change=${X}
                      />
                      <span class="workspace-picker__manage-name"
                        >${Rl(V.path)}</span
                      >
                    </label>
                  `)}
              </div>
            `:""}
      </div>
    `}function q(){let I=t.getState(),F=I.workspace?.current,V=I.workspace?.available||[],Q=new Set(I.workspace?.hidden||[]),P=F?.path||V[0]?.path||"";if(V.length===0)return c``;let K=V.filter(H=>!Q.has(H.path)||H.path===P);if(K.length<=1){let H=K[0]||V[0],ee=Rl(H.path);return c`
        <div class="workspace-picker workspace-picker--single">
          <span class="workspace-picker__label" title="${H.path}"
            >${ee}</span
          >
          ${j(V,Q)}
          ${se(P)}
          ${a?c`<span
                class="workspace-picker__loading"
                aria-hidden="true"
              ></span>`:""}
        </div>
      `}return c`
      <div class="workspace-picker">
        <select
          class="workspace-picker__select"
          @change=${p}
          ?disabled=${l||a}
          aria-label="Select project workspace"
        >
          ${K.map(H=>c`
              <option
                value="${H.path}"
                ?selected=${H.path===P}
                title="${H.path}"
              >
                ${Rl(H.path)}
              </option>
            `)}
        </select>
        ${j(V,Q)}
        ${se(P)}
        ${l||a?c`<span
              class="workspace-picker__loading"
              aria-hidden="true"
            ></span>`:""}
      </div>
    `}function C(){ot(q(),e)}return C(),i=t.subscribe(()=>C()),{destroy(){i&&(i(),i=null),document.removeEventListener("mousedown",g),document.removeEventListener("keydown",m),ot(c``,e)}}}var zf=["update-status","edit-text","update-priority","create-issue","dep-add","dep-remove","update-assignee","update-exec-settings","update-impl-target","get-session-defaults","set-session-defaults","get-workspace-accounts","set-workspace-accounts","update-workflow-meta","label-add","label-remove","subscribe-list","unsubscribe-list","snapshot","upsert","delete","get-comments","add-comment","delete-issue","list-workspaces","set-workspace","set-workspace-visibility","get-workspace","workspace-changed","git-pull-workspace","subscribe-worker-queue","unsubscribe-worker-queue","worker-queue-snapshot","worker-queue-place","worker-queue-reorder","worker-queue-toggle","worker-automation-toggle","worker-repo-ops-opt-out-toggle","worker-repo-operation-dismiss","worker-repo-operation-deploy-run","worker-queue-set-slots","worker-queue-set-serial-lane-count","worker-queue-set-orchestration-defaults","worker-queue-remove","worker-attempt-pause","worker-attempt-stop","worker-attempt-resume","worker-cleanup-retry","worker-resolve-in-session","worker-parked-retry","worker-queue-hold-resume","worker-queue-hold-retry-now","worker-merge-queue-add","worker-merge-queue-add-all","worker-merge-auto-toggle","worker-merge-queue-remove","worker-discard","worker-stale-work-continue","worker-stale-work-backup-fresh","worker-stale-work-recheck","worker-pr-discard","worker-revise-fix","worker-revise-approve","subscribe-ui-order","unsubscribe-ui-order","ui-order-set","ui-order-snapshot","subscribe-display-policy","unsubscribe-display-policy","display-policy-set","display-policy-snapshot","subscribe-session-log","unsubscribe-session-log","session-log-snapshot","session-log-append","get-attempt-prompt","get-bead-prompt","get-bead-timeline","get-worker-system-prompt","get-session-refs","subscribe-monitor-pipeline","unsubscribe-monitor-pipeline","monitor-pipeline-snapshot","subscribe-impl-presets","unsubscribe-impl-presets","impl-presets-snapshot","impl-preset-create","impl-preset-update","impl-preset-delete","apply-impl-preset","apply-impl-preset-global","monitor-auto-toggle","monitor-lane-create","monitor-lane-update","monitor-lane-confirm","monitor-lane-remove"];function Ol(){let e=Date.now().toString(36),t=Math.random().toString(36).slice(2,8);return`${e}-${t}`}function Hf(e,t,n=Ol()){return{id:n,type:e,payload:t}}function Gf(e={}){let t=It("ws"),n={initialMs:e.backoff?.initialMs??1e3,maxMs:e.backoff?.maxMs??3e4,factor:e.backoff?.factor??2,jitterRatio:e.backoff?.jitterRatio??.2},r=()=>e.url&&e.url.length>0?e.url:typeof location<"u"?(location.protocol==="https:"?"wss://":"ws://")+location.host+"/ws":"ws://localhost/ws",o=null,s="closed",i=0,l=null,a=!0,u=new Map,p=[],f=new Map,g=new Set;function m(q){for(let C of Array.from(g))try{C(q)}catch{}}function k(){if(!a||l)return;s="reconnecting",t("ws reconnecting\u2026"),m(s);let q=Math.min(n.maxMs||0,(n.initialMs||0)*Math.pow(n.factor||1,i)),C=(n.jitterRatio||0)*q,I=Math.max(0,Math.round(q+(Math.random()*2-1)*C));t("ws retry in %d ms (attempt %d)",I,i+1),l=setTimeout(()=>{l=null,j()},I)}function R(q){try{o?.send(JSON.stringify(q))}catch(C){t("ws send failed",C)}}function B(){for(s="open",t("ws open"),m(s),i=0;p.length;){let q=p.shift();q&&R(q)}}function X(q){let C;try{C=JSON.parse(String(q.data))}catch{t("ws received non-JSON message");return}if(!C||typeof C.id!="string"||typeof C.type!="string"){t("ws received invalid envelope");return}if(u.has(C.id)){let F=u.get(C.id);u.delete(C.id),C.ok?F?.resolve(C.payload):F?.reject(C.error||new Error("ws error"));return}let I=f.get(C.type);if(I&&I.size>0)for(let F of Array.from(I))try{F(C.payload)}catch(V){t("ws event handler error",V)}else t("ws received unhandled message type: %s",C.type)}function se(){s="closed",t("ws closed"),m(s);for(let[q,C]of u.entries())C.reject(new Error("ws disconnected")),u.delete(q);i+=1,k()}function j(){if(!a)return;let q=r();try{o=new WebSocket(q),t("ws connecting %s",q),s="connecting",m(s),o.addEventListener("open",B),o.addEventListener("message",X),o.addEventListener("error",()=>{}),o.addEventListener("close",se)}catch(C){t("ws connect failed %o",C),k()}}return j(),{send(q,C){if(!zf.includes(q))return Promise.reject(new Error(`unknown message type: ${q}`));let I=Ol(),F=Hf(q,C,I);return t("send %s id=%s",q,I),new Promise((V,Q)=>{u.set(I,{resolve:V,reject:Q,type:q}),o&&o.readyState===o.OPEN?R(F):(t("queue %s id=%s (state=%s)",q,I,s),p.push(F))})},on(q,C){f.has(q)||f.set(q,new Set);let I=f.get(q);return I?.add(C),()=>{I?.delete(C)}},onConnection(q){return g.add(q),()=>{g.delete(q)}},reconnect(){a=!0,l&&(clearTimeout(l),l=null),i=0,j()},close(){a=!1,l&&(clearTimeout(l),l=null);try{o?.close()}catch{}},getState(){return s}}}function ow(){let e=window.__BDUI_BOOTSTRAP__;return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:null}}}async function sw(e,t){try{let r=await(await fetch("/api/config")).json();e.setState({config:r})}catch(n){t("config refresh failed",n)}}var Il=[["tab:board:ready","ready-issues"],["tab:board:blocked","blocked-issues"],["tab:board:in-progress","in-progress-issues"],["tab:board:resolved","resolved-issues"],["tab:board:deferred","deferred-issues"],["tab:board:closed","closed-issues"]],Kf=[["tab:worker:ready","ready-issues"],["tab:worker:blocked","blocked-issues"],["tab:worker:in-progress","in-progress-issues"],["tab:worker:resolved","resolved-issues"],["tab:worker:closed","closed-issues"]],fr="tab:worker:closed",iw="bdui.worker.done-range",Yf=zp,Vf="worker:queue",Xf="ui:order",Qf="ui:display-policy",Zf="exec:presets",_r="tab:board:closed",Jf="beads-ui.board.closed-range";function aw(e){if(!e)return()=>{};function t(r){document.documentElement.style.setProperty("--app-header-h",`${Math.round(r)}px`)}if(t(e.getBoundingClientRect().height),typeof ResizeObserver!="function")return()=>{};let n=new ResizeObserver(r=>{for(let o of r)t(o.contentRect.height+lw(e))});return n.observe(e),()=>n.disconnect()}function lw(e){let t=getComputedStyle(e);return[t.paddingTop,t.paddingBottom,t.borderTopWidth,t.borderBottomWidth].reduce((r,o)=>r+(parseFloat(o)||0),0)}function cw(e){let t=It("main");t("bootstrap start"),aw(document.querySelector(".app-header"));let n=c`
    <section id="board-root" class="route board"></section>
    <section id="worker-root" class="route worker" hidden></section>
    <section id="monitor-root" class="route monitor" hidden></section>
    <section id="detail-panel" class="route detail" hidden></section>
  `;ot(n,e);let r=document.getElementById("global-nav"),o=document.getElementById("top-nav"),s=document.getElementById("repo-scope"),i=document.getElementById("usage-meter"),l=document.getElementById("board-root"),a=document.getElementById("worker-root"),u=document.getElementById("monitor-root"),p=document.getElementById("detail-panel");if(i&&df(i),l&&a&&u&&p){let we=function(x,A){let Pe="Request failed",je="";if(x&&typeof x=="object"){let _t=x;if(typeof _t.message=="string"&&_t.message.length>0&&(Pe=_t.message),typeof _t.details=="string")je=_t.details;else if(_t.details&&typeof _t.details=="object")try{je=JSON.stringify(_t.details,null,2)}catch{je=""}}else typeof x=="string"&&x.length>0&&(Pe=x);let Ze=A&&A.length>0?`Failed to load ${A}`:"Request failed";Z.open(Ze,Pe,je)},Ae=function(x){return`${fe.getState().workspace.current?.path||""}\0${x}`},lt=function(){Ce&&(Ce().catch(()=>{}),Ce=null),_e=null,xe=null},b=function(x){We=x;let A=()=>{We!==x||fe.getState().selected_id!==x||(We=null,st(x))};if(!J){qe.then(A);return}A()},Be=function(x,A,Pe,je,Ze){return Pe!==Le[A]?(Ze().catch(()=>{}),!1):(x.set(je,Ze),!0)},pt=function(){let x=fe.getState();ct(x.view==="board"),$(x.view==="worker"),Ke(Fe(x)),oe(x.view==="board"||x.view==="worker"||He||!!x.selected_id)},Nt=function(){let x=$r(xt);return x===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:x}}},mt=function(){let x=$r(Mt);return x===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:x}}},ct=function(x){if(x)for(let[A,Pe]of Il){if(z.has(A)||Ie.has(A))continue;let je=A===_r?Nt():{type:Pe};try{Oe.register(A,je)}catch(y){t("register %s store failed: %o",A,y)}Ie.add(A);let Ze=Le.board,_t=!1;ge.subscribeList(A,je).then(y=>{_t=!Be(z,"board",Ze,A,y)}).catch(y=>{t("subscribe %s failed: %o",A,y),we(y,"board")}).finally(()=>{Ie.delete(A),_t&&pt()})}else Lt()},Lt=function(){Le.board+=1;for(let[x]of Il){let A=z.get(x);A&&(A().catch(()=>{}),z.delete(x));try{Oe.unregister(x)}catch(Pe){t("unregister %s failed: %o",x,Pe)}}},$=function(x){if(!x){M();return}for(let[A,Pe]of Kf){if(ae.has(A)||Ie.has(A))continue;let je=A===fr?mt():{type:Pe};try{Oe.register(A,je)}catch(y){t("register %s store failed: %o",A,y)}Ie.add(A);let Ze=Le.worker,_t=!1;ge.subscribeList(A,je).then(y=>{_t=!Be(ae,"worker",Ze,A,y)}).catch(y=>{t("subscribe %s failed: %o",A,y),we(y,"worker")}).finally(()=>{Ie.delete(A),_t&&pt()})}},M=function(){Le.worker+=1;for(let[x]of Kf){let A=ae.get(x);A&&(A().catch(()=>{}),ae.delete(x));try{Oe.unregister(x)}catch(Pe){t("unregister %s failed: %o",x,Pe)}}},oe=function(x){if(!x){te();return}ie||(Te("subscribe-worker-queue",{id:Vf}).catch(A=>{t("subscribe-worker-queue failed: %o",A)}),ie=()=>Te("unsubscribe-worker-queue",{id:Vf}))},te=function(){ie&&(ie().catch(()=>{}),ie=null)},Fe=function(x){return x.view==="monitor"||x.selected_id!=null},Ke=function(x){if(!x){Je();return}le||(Te("subscribe-monitor-pipeline",{id:Yf}).catch(A=>{t("subscribe-monitor-pipeline failed: %o",A)}),le=()=>Te("unsubscribe-monitor-pipeline",{id:Yf}))},Je=function(){le&&(le().catch(()=>{}),le=null)},kt=function(){Ue||(Te("subscribe-ui-order",{id:Xf}).catch(x=>{t("subscribe-ui-order failed: %o",x)}),Ue=()=>Te("unsubscribe-ui-order",{id:Xf}))},qt=function(){Ue&&(Ue().catch(()=>{}),Ue=null),L.clear()},Jt=function(){yt||(Te("subscribe-display-policy",{id:Qf}).catch(x=>{t("subscribe-display-policy failed: %o",x)}),yt=()=>Te("unsubscribe-display-policy",{id:Qf}))},St=function(){yt&&(yt().catch(()=>{}),yt=null),ue.clear()},Wt=function(){Ot||(Te("subscribe-impl-presets",{id:Zf}).catch(x=>{t("subscribe-impl-presets failed: %o",x)}),Ot=()=>Te("unsubscribe-impl-presets",{id:Zf}))},jt=function(x){if(!x)return"Unknown";let A=x.split("/").filter(Boolean);return A.length>0?A[A.length-1]:"Unknown"},Y=function(x,A){G.open(x.path,{missing_state:x.missing_state,...A?{workspace:A}:{}})};var f=we,g=Ae,m=lt,k=b,R=Be,B=pt,X=Nt,se=mt,j=ct,q=Lt,C=$,I=M,F=oe,V=te,Q=Fe,P=Ke,K=Je,H=kt,ee=qt,ke=Jt,Re=St,ne=Wt,D=jt,ve=Y;let Ee=document.getElementById("header-loading"),T=kc(Ee),Z=hp(e),he=Gf(),Te=T.wrapSend((x,A)=>he.send(x,A)),ge=mc(Te),Oe=gc(),Ge=bc(),et=Yl(),L=hc(),ue=Gl(),re=Kl(),pe=Vl();he.on("impl-presets-snapshot",x=>{let A=x;A&&typeof A.revision=="number"&&Array.isArray(A.presets)&&re.set({revision:A.revision,presets:A.presets})}),he.on("monitor-pipeline-snapshot",x=>{let A=x;if(!(!A||!Array.isArray(A.workspaces)))try{et.set(A.workspaces,A.workspaces_state,A.cross_lanes)}catch{}}),he.on("ui-order-snapshot",x=>{let A=x;if(A&&typeof A.revision=="number")try{L.set({revision:A.revision,order:A.order&&typeof A.order=="object"?A.order:{}})}catch{}}),he.on("display-policy-snapshot",x=>{let A=x;if(A&&A.policy&&typeof A.policy=="object")try{ue.set(A.policy)}catch{}}),he.on("session-log-snapshot",x=>{let A=x;if(A&&typeof A.id=="string")try{pe.set(A.id,Array.isArray(A.lines)?A.lines:[],typeof A.last_event_at=="number"?A.last_event_at:null)}catch{}}),he.on("session-log-append",x=>{let A=x;if(A&&typeof A.id=="string")try{pe.append(A.id,A.event)}catch{}}),he.on("snapshot",x=>{let A=x,Pe=A&&typeof A.id=="string"?A.id:"",je=Pe?Oe.getStore(Pe):null;if(je&&A&&A.type==="snapshot")try{je.applyPush(A)}catch{}}),he.on("upsert",x=>{let A=x,Pe=A&&typeof A.id=="string"?A.id:"",je=Pe?Oe.getStore(Pe):null;if(je&&A&&A.type==="upsert")try{je.applyPush(A)}catch{}}),he.on("delete",x=>{let A=x,Pe=A&&typeof A.id=="string"?A.id:"",je=Pe?Oe.getStore(Pe):null;if(je&&A&&A.type==="delete")try{je.applyPush(A)}catch{}});let Ce=null,_e=null,xe=null,We=null,Qe=()=>{},qe=new Promise(x=>{Qe=()=>x(void 0)}),J=!1,U=!1;async function st(x){let A=Ae(x);if(A===_e||A===xe)return;xe=A;let Pe=`detail:${x}`,je={type:"issue-detail",params:{id:x}};try{Oe.register(Pe,je)}catch(Ze){t("register detail store failed: %o",Ze)}try{let Ze=await ge.subscribeList(Pe,je);if(fe.getState().selected_id!==x||Ae(x)!==A){await Ze().catch(()=>{});return}Ce&&await Ce().catch(()=>{}),Ce=Ze,_e=A}catch(Ze){t("detail subscribe failed: %o",Ze),we(Ze,"issue details")}finally{xe===A&&(xe=null)}}let z=new Map,Ie=new Set,Le={board:0,worker:0},He=!1,xt=ys;try{let x=window.localStorage.getItem(Jf);Qi(x)&&(xt=x)}catch{}let Mt="today";try{let x=window.localStorage.getItem(iw);x!==null&&(Mt=Dn(x))}catch{}async function At(x){if(!Qi(x)||x===xt)return;xt=x;try{window.localStorage.setItem(Jf,x)}catch{}let A=z.get(_r);if(!A)return;z.delete(_r),await A().catch(()=>{});let Pe=Nt();try{Oe.register(_r,Pe)}catch(je){t("register %s store failed: %o",_r,je)}try{let je=await ge.subscribeList(_r,Pe);z.set(_r,je)}catch(je){t("re-subscribe %s failed: %o",_r,je),we(je,"board")}}async function Rt(x){let A=Dn(x);if(A===Mt)return;Mt=A;let Pe=ae.get(fr);if(!Pe)return;ae.delete(fr),await Pe().catch(()=>{});let je=mt();try{Oe.register(fr,je)}catch(Ze){t("register %s store failed: %o",fr,Ze)}try{let Ze=await ge.subscribeList(fr,je);ae.set(fr,Ze)}catch(Ze){t("re-subscribe %s failed: %o",fr,Ze),we(Ze,"worker")}}let ae=new Map,ie=null,le=null,Ue=null,yt=null,Ot=null;async function ut(){yt=null,ue.clear(),Ot=null,re.clear(),ie=null,le=null,z.clear(),ae.clear(),Le.board+=1,Le.worker+=1,Wt();let x=fe.getState().workspace.current?.path;if(x)try{await he.send("set-workspace",{path:x})}catch(Pe){t("workspace restore after reconnect failed: %o",Pe);return}Jt();let A=fe.getState();ct(A.view==="board"),$(A.view==="worker"),Ke(Fe(A)),oe(A.view==="board"||A.view==="worker"||!!A.selected_id)}async function Kt(){t("clearing all subscriptions for workspace switch"),Lt(),M(),te(),Ge.clear(),qt(),kt(),St(),Jt(),lt();let x=fe.getState();if(x.selected_id)try{Oe.unregister(`detail:${x.selected_id}`)}catch{}let A=fe.getState();ct(A.view==="board"),$(A.view==="worker"),Ke(Fe(A)),oe(A.view==="board"||A.view==="worker"||!!A.selected_id),A.selected_id&&b(A.selected_id)}async function Yt(x){t("requesting workspace switch to %s",x),U=!0;try{let A=await he.send("set-workspace",{path:x});t("workspace switch result: %o",A),A&&A.workspace&&(fe.setState({workspace:{current:{path:A.workspace.root_dir,database:A.workspace.db_path}}}),window.localStorage.setItem("beads-ui.workspace",x),A.changed&&(await Kt(),ye("Switched to "+jt(x),"success",2e3)))}catch(A){throw t("workspace switch failed: %o",A),ye("Failed to switch workspace","error",3e3),A}finally{U=!1}}async function zt(x){t("requesting workspace git pull for %s",x);try{let A=await he.send("git-pull-workspace",{});t("workspace git pull result: %o",A);let Pe=A?.status;if(Pe==="up_to_date"){ye("Already up to date","success",2e3);return}if(Pe==="stash_pop_conflict"){ye("Git pulled, but stash pop conflicted (check git stash list)","warning",4e3);return}ye("Git pulled "+jt(x),"success",2e3)}catch(A){t("workspace git pull failed: %o",A);let Pe=A?.code,je=A?.message;if(Pe==="rebase_conflict"){ye("Git pull conflicts \u2014 reverted (manual resolve required)","error",4e3);return}if(Pe==="rebase_conflict_abort_failed"){ye("Git pull conflicts AND rebase --abort failed \u2014 repo left mid-rebase, run 'git rebase --abort' manually","error",6e3);return}if(Pe==="busy"){ye("Git pull skipped: another operation is running","warning",3e3);return}let Ze=je?`: ${je}`:"";throw ye(`Git pull failed${Ze}`,"error",3e3),A}}async function mn(x,A){t("setting workspace visibility %s \u2192 %s",x,String(A));try{await he.send("set-workspace-visibility",{path:x,visible:A}),await en()}catch(Pe){t("workspace visibility update failed: %o",Pe),ye("Failed to update project visibility","error",3e3)}}async function en(){try{let x=await he.send("list-workspaces",{});if(t("workspaces loaded: %o",x),x&&Array.isArray(x.workspaces)){let A=x.workspaces.map(_t=>({path:_t.path,database:_t.database,pid:_t.pid,version:_t.version})),Pe=x.current?{path:x.current.root_dir,database:x.current.db_path}:null,je=Array.isArray(x.hidden)?x.hidden.filter(_t=>typeof _t=="string"):[];fe.setState({workspace:{current:Pe,available:A,hidden:je}});let Ze=window.localStorage.getItem("beads-ui.workspace");Ze&&(!A.some(y=>y.path===Ze)||je.includes(Ze)?window.localStorage.removeItem("beads-ui.workspace"):Pe&&Ze!==Pe.path&&(t("restoring saved workspace preference: %s",Ze),await Yt(Ze)))}}catch(x){t("failed to load workspaces: %o",x)}}he.on("workspace-changed",x=>{t("workspace-changed event: %o",x),x&&x.root_dir&&(fe.setState({workspace:{current:{path:x.root_dir,database:x.db_path}}}),en(),Kt())});let Ht=!1;if(typeof he.onConnection=="function"){let x=A=>{t("ws state %s",A),A==="reconnecting"||A==="closed"?(Ht=!0,ye("Connection lost. Reconnecting\u2026","error",4e3)):A==="open"&&Ht&&(Ht=!1,ye("Reconnected","success",2200),sw(fe,(Pe,je)=>{t(`${Pe}: %o`,je)}),ut())};he.onConnection(x)}let nn="board";try{let x=window.localStorage.getItem("beads-ui.view");(x==="board"||x==="worker"||x==="monitor")&&(nn=x)}catch(x){t("view parse error: %o",x)}let fe=wc({config:ow(),view:nn});he.on("worker-queue-snapshot",x=>{let A=x;if(!A||!A.queue)return;let Pe=fe.getState().workspace.current?.path;if(typeof Pe=="string"&&Pe.length>0&&A.root_dir!==Pe){t("dropping worker-queue snapshot for %s",String(A.root_dir));return}try{Ge.set(A.queue)}catch{}});let E=yc(fe);E.start();let me=new Set(["get-comments","dep-add","dep-remove","impl-preset-create","impl-preset-update","impl-preset-delete","apply-impl-preset","apply-impl-preset-global","get-session-defaults","set-session-defaults","monitor-lane-create","monitor-lane-update","monitor-lane-confirm","monitor-lane-remove"]),De=async(x,A)=>{try{return await Te(x,A)}catch(Pe){if(me.has(x))throw Pe;return[]}};Gp({global_element:r,repo_element:o},fe,E);let h=document.getElementById("workspace-picker");h&&Wf(h,fe,Yt,zt,mn);let d=Xp(e,(x,A)=>Te(x,A));try{let x=document.getElementById("new-issue-btn");x&&x.addEventListener("click",()=>d.open())}catch{}let _=ef(e,{policyStore:ue,queueStore:Ge,implPresetStore:re,transport:(x,A)=>Te(x,A),onOpenChange:x=>{let A=He;He=x,pt(),A&&x===!1&&Se.refreshSessionDefaults()},labelOptions:()=>{let x=new Set;for(let[A]of Il)for(let Pe of Oe.snapshotFor(A)||[]){let je=Pe.labels;if(Array.isArray(je))for(let Ze of je)typeof Ze=="string"&&Ze.length>0&&x.add(Ze)}return Array.from(x).sort()}});try{let x=document.getElementById("display-settings-btn");x&&(x.setAttribute("aria-label","\uC124\uC815"),x.setAttribute("title","\uC124\uC815"),x.addEventListener("click",()=>_.open()))}catch{}let S=document.createElement("div");S.className="md-viewer-root",document.body.appendChild(S);let G=Oi(S,{getWorkspacePath:()=>fe.getState().workspace.current?.path}),ce=qc(l,{gotoIssue:x=>E.gotoIssue(x),issueStores:Oe,transport:De,workerQueueStore:Ge,uiOrderStore:L,displayPolicyStore:ue,closedRange:xt,onClosedRangeChange:x=>{At(x)},onNewIssue:()=>d.open(),openDoc:Y}),Se=Cl(a,{transport:De,issueStores:Oe,queueStore:Ge,sessionLogStore:pe,gotoIssue:x=>fe.setState({selected_id:x}),getWorkspacePath:()=>fe.getState().workspace.current?.path,switchWorkspace:x=>Yt(x),openDoc:Y,doneRange:Mt,onDoneRangeChange:x=>{Rt(x)}}),Ye=Hp(u,{transport:De,pipelineStore:et,execPresetStore:re,sessionLogStore:pe,router:E,gotoIssue:x=>E.gotoIssue(x),getWorkspacePath:()=>fe.getState().workspace.current?.path,switchWorkspace:x=>Yt(x),openDoc:Y}),rt=gp(p,{issueStores:Oe,transport:De,queueStore:Ge,execPresetStore:re,sessionLogStore:pe,getWorkspacePath:()=>fe.getState().workspace.current?.path,mdViewer:G,depCandidates:()=>{let x=et.get();if(x===null)return null;let A=et.getWorkspacesState(),Pe=fe.getState();if(Pe.view==="monitor")return Ua(x,A);let je=Pe.workspace.current?.path;return je?Ua(x,A,{root_dir:je}):null},subscribeCandidates:x=>et.subscribe(x),onDepChanged:({type:x,a:A,b:Pe})=>{let je=Ye;x==="dep-add"&&je&&typeof je.recorrectSharedLane=="function"&&je.recorrectSharedLane(x,A,Pe)},onNavigate:(x,A)=>{let Pe=()=>{fe.getState().view==="worker"?fe.setState({selected_id:x}):E.gotoIssue(x)},je=fe.getState().workspace.current?.path;if(typeof A!="string"||A.length===0||!je||A===je){Pe();return}Promise.resolve(Yt(A)).then(Pe).catch(()=>{ye("\uB808\uD3EC \uC804\uD658\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error",2400)})},onClose:()=>{let x=fe.getState();fe.setState({selected_id:null});try{E.gotoView(x.view==="worker"||x.view==="monitor"?x.view:"board")}catch{}},onOpenExecPresets:()=>{_.open("execution")}}),vt=fe.getState().selected_id;vt&&(p.hidden=!1,rt.load(vt),b(vt)),fe.subscribe(x=>{let A=x.selected_id;A?(p.hidden=!1,rt.load(A),U||b(A)):(rt.clear(),p.hidden=!0,lt())});let gt=x=>{l.hidden=x.view!=="board",a.hidden=x.view!=="worker",u.hidden=x.view!=="monitor",s&&s.classList.toggle("is-quiet",x.view==="monitor"),ct(x.view==="board"),$(x.view==="worker"),Ke(Fe(x)),oe(x.view==="board"||x.view==="worker"||He||!!x.selected_id),!x.selected_id&&x.view==="board"&&ce.load(),x.view==="worker"&&Se.load(),x.view==="monitor"?Ye.load():Ye.pause(),window.localStorage.setItem("beads-ui.view",x.view)};fe.subscribe(gt),gt(fe.getState()),kt(),Jt(),Wt(),en().finally(()=>{J=!0,Qe()}),window.addEventListener("keydown",x=>{let A=x.ctrlKey||x.metaKey,Pe=String(x.key||"").toLowerCase(),je=x.target,Ze=je&&je.tagName?String(je.tagName).toLowerCase():"",_t=Ze==="input"||Ze==="textarea"||Ze==="select"||je&&typeof je.isContentEditable=="boolean"&&je.isContentEditable;A&&Pe==="n"&&(_t||(x.preventDefault(),d.open()))})}}typeof window<"u"&&typeof document<"u"&&window.addEventListener("DOMContentLoaded",()=>{try{let n=window.localStorage.getItem("beads-ui.theme"),r=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches,o=n==="dark"||n==="light"?n:r?"dark":"light";document.documentElement.setAttribute("data-theme",o);let s=document.getElementById("theme-switch");s&&(s.checked=o==="dark")}catch{}let e=document.getElementById("theme-switch");e&&e.addEventListener("change",()=>{let n=e.checked?"dark":"light";document.documentElement.setAttribute("data-theme",n),window.localStorage.setItem("beads-ui.theme",n)});let t=document.getElementById("app");t&&cw(t)});export{cw as bootstrap,ow as readBootstrapConfig,sw as refreshConfigSnapshot};
//# sourceMappingURL=main.bundle.js.map
