var t_=Object.create;var zi=Object.defineProperty;var n_=Object.getOwnPropertyDescriptor;var r_=Object.getOwnPropertyNames;var o_=Object.getPrototypeOf,s_=Object.prototype.hasOwnProperty;var i_=(e,t,n)=>t in e?zi(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var Hi=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var a_=(e,t,n,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let o of r_(t))!s_.call(e,o)&&o!==n&&zi(e,o,{get:()=>t[o],enumerable:!(r=n_(t,o))||r.enumerable});return e};var l_=(e,t,n)=>(n=e!=null?t_(o_(e)):{},a_(t||!e||!e.__esModule?zi(n,"default",{value:e,enumerable:!0}):n,e));var Tt=(e,t,n)=>i_(e,typeof t!="symbol"?t+"":t,n);var Ql=Hi((bw,Xl)=>{var Nr=1e3,qr=Nr*60,jr=qr*60,kr=jr*24,d_=kr*7,p_=kr*365.25;Xl.exports=function(e,t){t=t||{};var n=typeof e;if(n==="string"&&e.length>0)return f_(e);if(n==="number"&&isFinite(e))return t.long?m_(e):__(e);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(e))};function f_(e){if(e=String(e),!(e.length>100)){var t=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(e);if(t){var n=parseFloat(t[1]),r=(t[2]||"ms").toLowerCase();switch(r){case"years":case"year":case"yrs":case"yr":case"y":return n*p_;case"weeks":case"week":case"w":return n*d_;case"days":case"day":case"d":return n*kr;case"hours":case"hour":case"hrs":case"hr":case"h":return n*jr;case"minutes":case"minute":case"mins":case"min":case"m":return n*qr;case"seconds":case"second":case"secs":case"sec":case"s":return n*Nr;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return n;default:return}}}}function __(e){var t=Math.abs(e);return t>=kr?Math.round(e/kr)+"d":t>=jr?Math.round(e/jr)+"h":t>=qr?Math.round(e/qr)+"m":t>=Nr?Math.round(e/Nr)+"s":e+"ms"}function m_(e){var t=Math.abs(e);return t>=kr?vs(e,t,kr,"day"):t>=jr?vs(e,t,jr,"hour"):t>=qr?vs(e,t,qr,"minute"):t>=Nr?vs(e,t,Nr,"second"):e+" ms"}function vs(e,t,n,r){var o=t>=n*1.5;return Math.round(e/n)+" "+r+(o?"s":"")}});var Jl=Hi((yw,Zl)=>{function g_(e){n.debug=n,n.default=n,n.coerce=a,n.disable=i,n.enable=o,n.enabled=l,n.humanize=Ql(),n.destroy=u,Object.keys(e).forEach(d=>{n[d]=e[d]}),n.names=[],n.skips=[],n.formatters={};function t(d){let f=0;for(let g=0;g<d.length;g++)f=(f<<5)-f+d.charCodeAt(g),f|=0;return n.colors[Math.abs(f)%n.colors.length]}n.selectColor=t;function n(d){let f,g=null,m,w;function C(...F){if(!C.enabled)return;let V=C,se=Number(new Date),j=se-(f||se);V.diff=j,V.prev=f,V.curr=se,f=se,F[0]=n.coerce(F[0]),typeof F[0]!="string"&&F.unshift("%O");let N=0;F[0]=F[0].replace(/%([a-zA-Z%])/g,(L,B)=>{if(L==="%%")return"%";N++;let Y=n.formatters[B];if(typeof Y=="function"){let Q=F[N];L=Y.call(V,Q),F.splice(N,1),N--}return L}),n.formatArgs.call(V,F),(V.log||n.log).apply(V,F)}return C.namespace=d,C.useColors=n.useColors(),C.color=n.selectColor(d),C.extend=r,C.destroy=n.destroy,Object.defineProperty(C,"enabled",{enumerable:!0,configurable:!1,get:()=>g!==null?g:(m!==n.namespaces&&(m=n.namespaces,w=n.enabled(d)),w),set:F=>{g=F}}),typeof n.init=="function"&&n.init(C),C}function r(d,f){let g=n(this.namespace+(typeof f>"u"?":":f)+d);return g.log=this.log,g}function o(d){n.save(d),n.namespaces=d,n.names=[],n.skips=[];let f=(typeof d=="string"?d:"").trim().replace(/\s+/g,",").split(",").filter(Boolean);for(let g of f)g[0]==="-"?n.skips.push(g.slice(1)):n.names.push(g)}function s(d,f){let g=0,m=0,w=-1,C=0;for(;g<d.length;)if(m<f.length&&(f[m]===d[g]||f[m]==="*"))f[m]==="*"?(w=m,C=g,m++):(g++,m++);else if(w!==-1)m=w+1,C++,g=C;else return!1;for(;m<f.length&&f[m]==="*";)m++;return m===f.length}function i(){let d=[...n.names,...n.skips.map(f=>"-"+f)].join(",");return n.enable(""),d}function l(d){for(let f of n.skips)if(s(d,f))return!1;for(let f of n.names)if(s(d,f))return!0;return!1}function a(d){return d instanceof Error?d.stack||d.message:d}function u(){console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")}return n.enable(n.load()),n}Zl.exports=g_});var ec=Hi((dn,ws)=>{dn.formatArgs=b_;dn.save=y_;dn.load=v_;dn.useColors=h_;dn.storage=w_();dn.destroy=(()=>{let e=!1;return()=>{e||(e=!0,console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."))}})();dn.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"];function h_(){if(typeof window<"u"&&window.process&&(window.process.type==="renderer"||window.process.__nwjs))return!0;if(typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))return!1;let e;return typeof document<"u"&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||typeof window<"u"&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||typeof navigator<"u"&&navigator.userAgent&&(e=navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/))&&parseInt(e[1],10)>=31||typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)}function b_(e){if(e[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+e[0]+(this.useColors?"%c ":" ")+"+"+ws.exports.humanize(this.diff),!this.useColors)return;let t="color: "+this.color;e.splice(1,0,t,"color: inherit");let n=0,r=0;e[0].replace(/%[a-zA-Z%]/g,o=>{o!=="%%"&&(n++,o==="%c"&&(r=n))}),e.splice(r,0,t)}dn.log=console.debug||console.log||(()=>{});function y_(e){try{e?dn.storage.setItem("debug",e):dn.storage.removeItem("debug")}catch{}}function v_(){let e;try{e=dn.storage.getItem("debug")||dn.storage.getItem("DEBUG")}catch{}return!e&&typeof process<"u"&&"env"in process&&(e=process.env.DEBUG),e}function w_(){try{return localStorage}catch{}}ws.exports=Jl()(dn);var{formatters:k_}=ws.exports;k_.j=function(e){try{return JSON.stringify(e)}catch(t){return"[UnexpectedJSONParseError]: "+t.message}}});var mo=globalThis,fs=mo.trustedTypes,Pl=fs?fs.createPolicy("lit-html",{createHTML:e=>e}):void 0,Ki="$lit$",Fn=`lit$${Math.random().toFixed(9).slice(2)}$`,Yi="?"+Fn,c_=`<${Yi}>`,br=document,go=()=>br.createComment(""),ho=e=>e===null||typeof e!="object"&&typeof e!="function",Vi=Array.isArray,Fl=e=>Vi(e)||typeof e?.[Symbol.iterator]=="function",Gi=`[ 	
\f\r]`,_o=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Dl=/-->/g,Ml=/>/g,gr=RegExp(`>|${Gi}(?:([^\\s"'>=/]+)(${Gi}*=${Gi}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Nl=/'/g,ql=/"/g,Bl=/^(?:script|style|textarea|title)$/i,Xi=e=>(t,...n)=>({_$litType$:e,strings:t,values:n}),c=Xi(1),yo=Xi(2),dw=Xi(3),vn=Symbol.for("lit-noChange"),Pt=Symbol.for("lit-nothing"),jl=new WeakMap,hr=br.createTreeWalker(br,129);function Ul(e,t){if(!Vi(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return Pl!==void 0?Pl.createHTML(t):t}var Wl=(e,t)=>{let n=e.length-1,r=[],o,s=t===2?"<svg>":t===3?"<math>":"",i=_o;for(let l=0;l<n;l++){let a=e[l],u,d,f=-1,g=0;for(;g<a.length&&(i.lastIndex=g,d=i.exec(a),d!==null);)g=i.lastIndex,i===_o?d[1]==="!--"?i=Dl:d[1]!==void 0?i=Ml:d[2]!==void 0?(Bl.test(d[2])&&(o=RegExp("</"+d[2],"g")),i=gr):d[3]!==void 0&&(i=gr):i===gr?d[0]===">"?(i=o??_o,f=-1):d[1]===void 0?f=-2:(f=i.lastIndex-d[2].length,u=d[1],i=d[3]===void 0?gr:d[3]==='"'?ql:Nl):i===ql||i===Nl?i=gr:i===Dl||i===Ml?i=_o:(i=gr,o=void 0);let m=i===gr&&e[l+1].startsWith("/>")?" ":"";s+=i===_o?a+c_:f>=0?(r.push(u),a.slice(0,f)+Ki+a.slice(f)+Fn+m):a+Fn+(f===-2?l:m)}return[Ul(e,s+(e[n]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),r]},bo=class e{constructor({strings:t,_$litType$:n},r){let o;this.parts=[];let s=0,i=0,l=t.length-1,a=this.parts,[u,d]=Wl(t,n);if(this.el=e.createElement(u,r),hr.currentNode=this.el.content,n===2||n===3){let f=this.el.content.firstChild;f.replaceWith(...f.childNodes)}for(;(o=hr.nextNode())!==null&&a.length<l;){if(o.nodeType===1){if(o.hasAttributes())for(let f of o.getAttributeNames())if(f.endsWith(Ki)){let g=d[i++],m=o.getAttribute(f).split(Fn),w=/([.?@])?(.*)/.exec(g);a.push({type:1,index:s,name:w[2],strings:m,ctor:w[1]==="."?ms:w[1]==="?"?gs:w[1]==="@"?hs:vr}),o.removeAttribute(f)}else f.startsWith(Fn)&&(a.push({type:6,index:s}),o.removeAttribute(f));if(Bl.test(o.tagName)){let f=o.textContent.split(Fn),g=f.length-1;if(g>0){o.textContent=fs?fs.emptyScript:"";for(let m=0;m<g;m++)o.append(f[m],go()),hr.nextNode(),a.push({type:2,index:++s});o.append(f[g],go())}}}else if(o.nodeType===8)if(o.data===Yi)a.push({type:2,index:s});else{let f=-1;for(;(f=o.data.indexOf(Fn,f+1))!==-1;)a.push({type:7,index:s}),f+=Fn.length-1}s++}}static createElement(t,n){let r=br.createElement("template");return r.innerHTML=t,r}};function yr(e,t,n=e,r){if(t===vn)return t;let o=r!==void 0?n._$Co?.[r]:n._$Cl,s=ho(t)?void 0:t._$litDirective$;return o?.constructor!==s&&(o?._$AO?.(!1),s===void 0?o=void 0:(o=new s(e),o._$AT(e,n,r)),r!==void 0?(n._$Co??(n._$Co=[]))[r]=o:n._$Cl=o),o!==void 0&&(t=yr(e,o._$AS(e,t.values),o,r)),t}var _s=class{constructor(t,n){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=n}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:n},parts:r}=this._$AD,o=(t?.creationScope??br).importNode(n,!0);hr.currentNode=o;let s=hr.nextNode(),i=0,l=0,a=r[0];for(;a!==void 0;){if(i===a.index){let u;a.type===2?u=new Dr(s,s.nextSibling,this,t):a.type===1?u=new a.ctor(s,a.name,a.strings,this,t):a.type===6&&(u=new bs(s,this,t)),this._$AV.push(u),a=r[++l]}i!==a?.index&&(s=hr.nextNode(),i++)}return hr.currentNode=br,o}p(t){let n=0;for(let r of this._$AV)r!==void 0&&(r.strings!==void 0?(r._$AI(t,r,n),n+=r.strings.length-2):r._$AI(t[n])),n++}},Dr=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,n,r,o){this.type=2,this._$AH=Pt,this._$AN=void 0,this._$AA=t,this._$AB=n,this._$AM=r,this.options=o,this._$Cv=o?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,n=this._$AM;return n!==void 0&&t?.nodeType===11&&(t=n.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,n=this){t=yr(this,t,n),ho(t)?t===Pt||t==null||t===""?(this._$AH!==Pt&&this._$AR(),this._$AH=Pt):t!==this._$AH&&t!==vn&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Fl(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==Pt&&ho(this._$AH)?this._$AA.nextSibling.data=t:this.T(br.createTextNode(t)),this._$AH=t}$(t){let{values:n,_$litType$:r}=t,o=typeof r=="number"?this._$AC(t):(r.el===void 0&&(r.el=bo.createElement(Ul(r.h,r.h[0]),this.options)),r);if(this._$AH?._$AD===o)this._$AH.p(n);else{let s=new _s(o,this),i=s.u(this.options);s.p(n),this.T(i),this._$AH=s}}_$AC(t){let n=jl.get(t.strings);return n===void 0&&jl.set(t.strings,n=new bo(t)),n}k(t){Vi(this._$AH)||(this._$AH=[],this._$AR());let n=this._$AH,r,o=0;for(let s of t)o===n.length?n.push(r=new e(this.O(go()),this.O(go()),this,this.options)):r=n[o],r._$AI(s),o++;o<n.length&&(this._$AR(r&&r._$AB.nextSibling,o),n.length=o)}_$AR(t=this._$AA.nextSibling,n){for(this._$AP?.(!1,!0,n);t!==this._$AB;){let r=t.nextSibling;t.remove(),t=r}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},vr=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,n,r,o,s){this.type=1,this._$AH=Pt,this._$AN=void 0,this.element=t,this.name=n,this._$AM=o,this.options=s,r.length>2||r[0]!==""||r[1]!==""?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=Pt}_$AI(t,n=this,r,o){let s=this.strings,i=!1;if(s===void 0)t=yr(this,t,n,0),i=!ho(t)||t!==this._$AH&&t!==vn,i&&(this._$AH=t);else{let l=t,a,u;for(t=s[0],a=0;a<s.length-1;a++)u=yr(this,l[r+a],n,a),u===vn&&(u=this._$AH[a]),i||(i=!ho(u)||u!==this._$AH[a]),u===Pt?t=Pt:t!==Pt&&(t+=(u??"")+s[a+1]),this._$AH[a]=u}i&&!o&&this.j(t)}j(t){t===Pt?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},ms=class extends vr{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===Pt?void 0:t}},gs=class extends vr{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==Pt)}},hs=class extends vr{constructor(t,n,r,o,s){super(t,n,r,o,s),this.type=5}_$AI(t,n=this){if((t=yr(this,t,n,0)??Pt)===vn)return;let r=this._$AH,o=t===Pt&&r!==Pt||t.capture!==r.capture||t.once!==r.once||t.passive!==r.passive,s=t!==Pt&&(r===Pt||o);o&&this.element.removeEventListener(this.name,this,r),s&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},bs=class{constructor(t,n,r){this.element=t,this.type=6,this._$AN=void 0,this._$AM=n,this.options=r}get _$AU(){return this._$AM._$AU}_$AI(t){yr(this,t)}},zl={M:Ki,P:Fn,A:Yi,C:1,L:Wl,R:_s,D:Fl,V:yr,I:Dr,H:vr,N:gs,U:hs,B:ms,F:bs},u_=mo.litHtmlPolyfillSupport;u_?.(bo,Dr),(mo.litHtmlVersions??(mo.litHtmlVersions=[])).push("3.3.1");var st=(e,t,n)=>{let r=n?.renderBefore??t,o=r._$litPart$;if(o===void 0){let s=n?.renderBefore??null;r._$litPart$=o=new Dr(t.insertBefore(go(),s),s,void 0,n??{})}return o._$AI(e),o};var ys="today",Hl=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"},{value:"30d",label:"\uCD5C\uADFC 30\uC77C"},{value:"all",label:"\uC804\uCCB4"}],Mr=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"}];function Dn(e){return e==="today"?"today":"7d"}function Qi(e){return e==="today"||e==="7d"||e==="30d"||e==="all"}function wr(e,t=Date.now()){switch(e){case"today":{let n=new Date(t);return n.setHours(0,0,0,0),n.getTime()}case"7d":return t-7*864e5;case"30d":return t-30*864e5;case"all":default:return}}function Gl(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function Kl(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function Yl(){let e=null,t=[],n,r=new Set;function o(){for(let s of Array.from(r))try{s()}catch{}}return{get(){return e},getWorkspacesState(){return t},crossLanes(){return n},set(s,i,l){e=Array.isArray(s)?s:null,t=Array.isArray(i)?i:[],n=l===void 0?void 0:l!==null&&typeof l=="object"&&typeof l.revision=="number"&&Array.isArray(l.lanes)?{revision:l.revision,lanes:l.lanes}:null,o()},clear(){e=null,t=[],n=void 0,o()},subscribe(s){return r.add(s),()=>r.delete(s)}}}function Vl(){let e=new Map,t=new Set;function n(o){return o.startsWith("session-log:")?o:`session-log:${o}`}function r(){for(let o of Array.from(t))try{o()}catch{}}return{set(o,s,i=null){e.set(n(o),{lines:Array.isArray(s)?[...s]:[],last_event_at:typeof i=="number"?i:null}),r()},append(o,s){let i=n(o),l=e.get(i)||{lines:[],last_event_at:null};l.lines=[...l.lines,s],l.last_event_at=Date.now(),e.set(i,l),r()},get(o){return e.get(n(o))||null},clear(o){typeof o=="string"?e.delete(n(o)):e.clear(),r()},subscribe(o){return t.add(o),()=>t.delete(o)}}}var tc=l_(ec(),1);function Ot(e){return(0,tc.default)(`beads-ui:${e}`)}function $_(e){let n=nc((e&&typeof e=="object"?e:{}).spec_id);return n?{path:n,source:"native",conflict:!1}:{path:"",source:"none",conflict:!1}}function nc(e){return typeof e=="string"?e.trim():""}function x_(e){let t=e&&typeof e=="object"?e:{};return t.metadata&&typeof t.metadata=="object"?t.metadata:{}}var A_=/^[A-Za-z0-9_.:-]+@[0-9a-fA-F]{40}$/;function Fr(e){let t=$_(e),n=nc(x_(e).spec_review),r=A_.test(n),o=r&&n.slice(0,n.indexOf("@"))==="skipped";return t.source==="none"?{...t,evidence:"none",skipped:o}:{...t,evidence:r?"published":"draft",skipped:o}}function xn(e){if(typeof e=="number")return Number.isFinite(e)?e:0;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:0}return 0}function vo(e,t){let n=xn(e.created_at),r=xn(t.created_at);if(n!==r)return n<r?1:-1;let o=e.priority??2,s=t.priority??2;if(o!==s)return o-s;let i=e.id,l=t.id;return i<l?-1:i>l?1:0}function lc(e,t){let n=xn(e.created_at),r=xn(t.created_at);if(n!==r)return n<r?-1:1;let o=e.priority??2,s=t.priority??2;if(o!==s)return o-s;let i=e.id,l=t.id;return i<l?-1:i>l?1:0}function cc(e,t){let n=xn(e.updated_at),r=xn(t.updated_at);if(n!==r)return n<r?1:-1;let o=e.id,s=t.id;return o<s?-1:o>s?1:0}function uc(e,t){let n=e.priority??2,r=t.priority??2;if(n!==r)return n-r;let o=xn(e.created_at),s=xn(t.created_at);if(o!==s)return o<s?1:-1;let i=e.id,l=t.id;return i<l?-1:i>l?1:0}function dc(e,t){let n=e.closed_at??0,r=t.closed_at??0;if(n!==r)return n<r?1:-1;let o=e?.id,s=t?.id;return o<s?-1:o>s?1:0}var ks=Object.freeze({priority:"asc",dependents:"desc",released:"desc",spec:"desc",created:"asc",updated:"desc"});function S_(e){return typeof e=="string"&&Object.prototype.hasOwnProperty.call(ks,e)}function Ji(e){if(!e||typeof e!="object")return!1;let t=e;return S_(t.key)&&(t.dir==="asc"||t.dir==="desc")}function rc(e){if(typeof e=="number")return Number.isFinite(e)?e:null;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:null}return null}function oc(e,t){switch(t){case"priority":{let n=e.priority;return typeof n=="number"&&Number.isFinite(n)?n:null}case"dependents":{let n=e.dependents_info?e.dependents_info.count:null;return typeof n=="number"&&Number.isFinite(n)?n:null}case"released":{let n=e.release_info?e.release_info.last_released_at:null;return typeof n=="number"&&Number.isFinite(n)?n:null}case"spec":return Fr(e).evidence==="published"?1:0;case"created":return rc(e.created_at);case"updated":return rc(e.updated_at);default:return null}}function sc(e,t,n){let r=oc(e,n.key),o=oc(t,n.key);if(r===null||o===null)return r===o?0:r===null?1:-1;if(r===o)return 0;let s=r<o?-1:1;return n.dir==="desc"?-s:s}function pc(e){let t=Array.isArray(e)?e.filter(Ji):[];return(n,r)=>{for(let l of t){let a=sc(n,r,l);if(a!==0)return a}let o=sc(n,r,{key:"created",dir:"asc"});if(o!==0)return o;let s=n.id,i=r.id;return s<i?-1:s>i?1:0}}var E_=/^(?:[A-Za-z][A-Za-z0-9]*(?:-[A-Za-z0-9]+)+\s+)?(?:Task|Phase|T)\s*(\d+)/i;function ic(e){let t=e&&e.metadata,n=t?t.task_order:void 0;if(n==null||n==="")return Number.POSITIVE_INFINITY;let r=Number(n);return Number.isFinite(r)?r:Number.POSITIVE_INFINITY}function ac(e){let t=e&&e.title;if(typeof t!="string")return Number.POSITIVE_INFINITY;let n=E_.exec(t);if(!n)return Number.POSITIVE_INFINITY;let r=Number(n[1]);return Number.isFinite(r)?r:Number.POSITIVE_INFINITY}function fc(e,t){let n=ic(e),r=ic(t);if(n!==r)return n<r?-1:1;let o=ac(e),s=ac(t);if(o!==s)return o<s?-1:1;let i=xn(e&&e.created_at),l=xn(t&&t.created_at);if(i!==l)return i<l?-1:1;let a=e&&e.id,u=t&&t.id;return a===u?0:String(a)<String(u)?-1:1}var Zi=2**20;function Br(e,t){let n=e&&e.id;return t&&typeof n=="string"&&Object.prototype.hasOwnProperty.call(t,n)&&typeof t[n]=="number"&&Number.isFinite(t[n])?t[n]:-xn(e&&e.created_at)}function _c(e){return(t,n)=>{let r=Br(t,e),o=Br(n,e);if(r!==o)return r<o?-1:1;let s=t?.id,i=n?.id;return s<i?-1:s>i?1:0}}function ea(e,t,n){let r=Array.isArray(e)?e:[],o=r.length,s=Math.max(0,Math.min(t,o-1)),i=s-1>=0?r[s-1]:null,l=s+1<o?r[s+1]:null;if(!i&&!l)return{rank:0};if(!i)return{rank:Br(l,n)-Zi};if(!l)return{rank:Br(i,n)+Zi};let a=Br(i,n),u=Br(l,n),d=(a+u)/2;return a<d&&d<u?{rank:d}:{renormalize:r.map((f,g)=>({bead_id:f.id,rank:g*Zi}))}}function ta(e,t={}){let n=Ot(`issue-store:${e}`),r=new Map,o=[],s=0,i=new Set,l=!1,a=t.sort||vo;function u(){for(let g of Array.from(i))try{g()}catch{}}function d(){o=Array.from(r.values()).sort(a)}function f(g){if(l||!g||g.id!==e)return;let m=Number(g.revision)||0;if(n("apply %s rev=%d",g.type,m),!(m<=s&&g.type!=="snapshot")){if(g.type==="snapshot"){if(m<=s)return;r.clear();let w=Array.isArray(g.issues)?g.issues:[];for(let C of w)C&&typeof C.id=="string"&&C.id.length>0&&r.set(C.id,C);d(),s=m,u();return}if(g.type==="upsert"){let w=g.issue;if(w&&typeof w.id=="string"&&w.id.length>0){let C=r.get(w.id);if(!C)r.set(w.id,w);else{let F=Number.isFinite(C.updated_at)?C.updated_at:0,V=Number.isFinite(w.updated_at)?w.updated_at:0;if(F<=V){for(let se of Object.keys(C))se in w||delete C[se];for(let[se,j]of Object.entries(w))C[se]=j}}d()}s=m,u()}else if(g.type==="delete"){let w=String(g.issue_id||"");w&&(r.delete(w),d()),s=m,u()}}}return{id:e,subscribe(g){return i.add(g),()=>{i.delete(g)}},applyPush:f,snapshot(){return o},size(){return r.size},getById(g){return r.get(g)},dispose(){l=!0,r.clear(),o=[],i.clear(),s=0}}}function $s(e){let t=String(e.type||"").trim(),n={};if(e.params&&typeof e.params=="object"){let o=Object.keys(e.params).sort();for(let s of o){let i=e.params[s];n[s]=String(i)}}let r=new URLSearchParams(n).toString();return r.length>0?`${t}?${r}`:t}function mc(e){let t=Ot("subs"),n=new Map,r=new Map;function o(l,a){t("applyDelta %s +%d ~%d -%d",l,(a.added||[]).length,(a.updated||[]).length,(a.removed||[]).length);let u=r.get(l);if(!u||u.size===0)return;let d=Array.isArray(a.added)?a.added:[],f=Array.isArray(a.updated)?a.updated:[],g=Array.isArray(a.removed)?a.removed:[];for(let m of Array.from(u)){let w=n.get(m);if(!w)continue;let C=w.itemsById;for(let F of d)typeof F=="string"&&F.length>0&&C.set(F,!0);for(let F of f)typeof F=="string"&&F.length>0&&C.set(F,!0);for(let F of g)typeof F=="string"&&F.length>0&&C.delete(F)}}async function s(l,a){let u=$s(a);if(t("subscribe %s key=%s",l,u),!n.has(l))n.set(l,{key:u,itemsById:new Map});else{let f=n.get(l);if(f&&f.key!==u){let g=r.get(f.key);g&&(g.delete(l),g.size===0&&r.delete(f.key)),n.set(l,{key:u,itemsById:new Map})}}r.has(u)||r.set(u,new Set);let d=r.get(u);d&&d.add(l);try{await e("subscribe-list",{id:l,type:a.type,params:a.params})}catch(f){let g=n.get(l)||null;if(g){let m=r.get(g.key);m&&(m.delete(l),m.size===0&&r.delete(g.key))}throw n.delete(l),f}return async()=>{t("unsubscribe %s key=%s",l,u);try{await e("unsubscribe-list",{id:l})}catch{}let f=n.get(l)||null;if(f){let g=r.get(f.key);g&&(g.delete(l),g.size===0&&r.delete(f.key))}n.delete(l)}}return{subscribeList:s,_applyDelta:o,_subKeyOf:$s,selectors:{getIds(l){let a=n.get(l);return a?Array.from(a.itemsById.keys()):[]},has(l,a){let u=n.get(l);return u?u.itemsById.has(a):!1},count(l){let a=n.get(l);return a?a.itemsById.size:0},getItemsById(l){let a=n.get(l),u={};if(!a)return u;for(let d of a.itemsById.keys())u[d]=!0;return u}}}}function gc(){let e=Ot("issue-stores"),t=new Map,n=new Map,r=new Set,o=new Map;function s(){for(let a of Array.from(r))try{a()}catch{}}function i(a,u,d){let f=u?$s(u):"",g=n.get(a)||"",m=t.has(a);if(e("register %s key=%s (prev=%s)",a,f,g),m&&g&&f&&g!==f){let w=t.get(a);if(w)try{w.dispose()}catch{}let C=o.get(a);if(C){try{C()}catch{}o.delete(a)}let F=ta(a,d);t.set(a,F);let V=F.subscribe(()=>s());o.set(a,V)}else if(!m){let w=ta(a,d);t.set(a,w);let C=w.subscribe(()=>s());o.set(a,C)}return n.set(a,f),()=>l(a)}function l(a){e("unregister %s",a),n.delete(a);let u=t.get(a);u&&(u.dispose(),t.delete(a));let d=o.get(a);if(d){try{d()}catch{}o.delete(a)}}return{register:i,unregister:l,getStore(a){return t.get(a)||null},snapshotFor(a){let u=t.get(a);return u?u.snapshot().slice():[]},subscribe(a){return r.add(a),()=>r.delete(a)}}}function hc(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function bc(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function na(e,t){return`#/${e==="worker"||e==="monitor"?e:"board"}?issue=${encodeURIComponent(t)}`}function T_(e){let t=String(e||""),n=t.startsWith("#")?t.slice(1):t,r=n.indexOf("?"),o=r>=0?n.slice(r+1):"";if(o){let l=new URLSearchParams(o).get("issue");if(l)return decodeURIComponent(l)}let s=/^\/issue\/([^\s?#]+)/.exec(n);return s&&s[1]?decodeURIComponent(s[1]):null}function C_(e){let t=String(e||"");return/^#\/worker(\b|\/|$)/.test(t)?"worker":/^#\/monitor(\b|\/|$)/.test(t)?"monitor":"board"}function yc(e){let t=Ot("router"),n=()=>{let r=window.location.hash||"",o=/^#\/issue\/([^\s?#]+)/.exec(r),s=o&&o[1]?decodeURIComponent(o[1]):T_(r),i=C_(r);if(t("hash change \u2192 view=%s id=%s",i,s),e.setState({selected_id:i==="worker"?null:s,view:i,worker:{selected_parent_id:i==="worker"?s:null}}),!!o||/^#\/(issues|epics)(\b|\/|\?|$)/.test(r)){let a=s?`#/${i}?issue=${encodeURIComponent(s)}`:`#/${i}`;window.location.hash!==a&&(window.location.hash=a)}};return{start(){window.addEventListener("hashchange",n),n()},stop(){window.removeEventListener("hashchange",n)},gotoIssue(r){let o=e.getState?e.getState():{view:"board"},s=o.view==="worker"||o.view==="monitor"?o.view:"board",i=na(s,r);t("goto issue %s (view=%s)",r,s),window.location.hash!==i?window.location.hash=i:e.setState({selected_id:s==="worker"?null:r,view:s,worker:{selected_parent_id:s==="worker"?r:null}})},gotoView(r){let o=e.getState?e.getState():{selected_id:null,worker:{selected_parent_id:null}},s=r==="worker"?o.worker?.selected_parent_id:o.selected_id,i=s?na(r,s):`#/${r}`;t("goto view %s (id=%s)",r,s||""),window.location.hash!==i?window.location.hash=i:e.setState({view:r,selected_id:r==="worker"?null:o.selected_id})}}}var R_=Object.freeze({workspace_config:{default_workspace:null}});function vc(e){return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:R_.workspace_config.default_workspace}}}function wc(e={}){let t=Ot("state"),n={selected_id:e.selected_id??null,view:e.view??"board",filters:{status:e.filters?.status??"all",search:e.filters?.search??"",type:typeof e.filters?.type=="string"?e.filters?.type:""},board:{closed_filter:e.board?.closed_filter==="3"||e.board?.closed_filter==="7"||e.board?.closed_filter==="today"?e.board?.closed_filter:"today"},worker:{selected_parent_id:e.worker?.selected_parent_id??null,show_closed_children:Array.isArray(e.worker?.show_closed_children)?e.worker.show_closed_children:[]},workspace:{current:e.workspace?.current??null,available:e.workspace?.available??[],hidden:e.workspace?.hidden??[]},config:vc(e.config)},r=new Set;function o(){for(let s of Array.from(r))try{s(n)}catch{}}return{getState(){return n},setState(s){let i={...n,...s,filters:{...n.filters,...s.filters||{}},board:{...n.board,...s.board||{}},worker:{...n.worker,...s.worker||{}},workspace:{current:s.workspace?.current!==void 0?s.workspace.current:n.workspace.current,available:s.workspace?.available!==void 0?s.workspace.available:n.workspace.available,hidden:s.workspace?.hidden!==void 0?s.workspace.hidden:n.workspace.hidden},config:s.config!==void 0?vc(s.config):n.config},l=i.workspace.current?.path!==n.workspace.current?.path||i.workspace.available.length!==n.workspace.available.length||i.workspace.hidden.length!==n.workspace.hidden.length||i.workspace.hidden.some((u,d)=>u!==n.workspace.hidden[d]),a=i.config.workspace_config.default_workspace!==n.config.workspace_config.default_workspace;i.selected_id===n.selected_id&&i.view===n.view&&i.filters.status===n.filters.status&&i.filters.search===n.filters.search&&i.filters.type===n.filters.type&&i.board.closed_filter===n.board.closed_filter&&i.worker.selected_parent_id===n.worker.selected_parent_id&&i.worker.show_closed_children.length===n.worker.show_closed_children.length&&i.worker.show_closed_children.every((u,d)=>u===n.worker.show_closed_children[d])&&!l&&!a||(n=i,t("state change %o",{selected_id:n.selected_id,view:n.view,filters:n.filters,board:n.board,worker:n.worker,workspace:n.workspace.current?.path,config:{default_workspace:n.config.workspace_config.default_workspace}}),o())},subscribe(s){return r.add(s),()=>r.delete(s)}}}function kc(e){let t=Ot("activity"),n=0,r=new Map,o=1;function s(){if(!e)return;let u=n>0;e.toggleAttribute("hidden",!u),e.setAttribute("aria-busy",u?"true":"false")}function i(){n+=1,t("start count=%d",n),s()}function l(){let u=n;n=Math.max(0,n-1),u<=0?t("done called but count was already %d",u):t("done count=%d\u2192%d",u,n),s()}function a(u){return async(f,g)=>{let m=o++,w=Date.now();r.set(m,{type:f,start_ts:w}),t("request start id=%d type=%s count=%d",m,f,n+1),i();let C=!1,F=()=>{C||(C=!0,r.delete(m),l())},V=setTimeout(()=>{C||(t("request TIMEOUT id=%d type=%s elapsed=%dms",m,f,Date.now()-w),F())},3e4);try{let se=await u(f,g),j=Date.now()-w;return t("request done id=%d type=%s elapsed=%dms",m,f,j),se}catch(se){let j=Date.now()-w;throw t("request error id=%d type=%s elapsed=%dms err=%o",m,f,j,se),se}finally{clearTimeout(V),F()}}}return s(),{wrapSend:a,start:i,done:l,getCount:()=>n,getActiveRequests:()=>{let u=Date.now();return Array.from(r.entries()).map(([d,f])=>({id:d,type:f.type,elapsed_ms:u-f.start_ts}))}}}function we(e,t="info",n=2800){let r=document.createElement("div");r.className="toast",r.textContent=e,r.style.position="fixed",r.style.right="12px",r.style.bottom="12px",r.style.zIndex="1000",r.style.color="#fff",r.style.padding="8px 10px",r.style.borderRadius="4px",r.style.fontSize="12px",t==="success"?r.style.background="#156d36":t==="warning"?r.style.background="#a36a00":t==="error"?r.style.background="#9f2011":r.style.background="rgba(0,0,0,0.85)",(document.body||document.documentElement).appendChild(r),setTimeout(()=>{try{r.remove()}catch{}},n)}function Ur(e=void 0,t=void 0){function n(){if(!t||typeof t.get!="function")return null;let s=t.get();return s&&s.order?s.order:{}}function r(s,i,l){let a=e&&e.snapshotFor?e.snapshotFor(s).slice():[];if(i==="closed")return a.sort(dc),a;switch(l){case"created_desc":return a.sort(vo),a;case"created_asc":return a.sort(lc),a;case"updated_desc":return a.sort(cc),a;case"priority":return a.sort(uc),a;case"manual":default:{let u=n();return u?a.sort(_c(u)):a.sort(vo),a}}}function o(s){let i=[];return e&&typeof e.subscribe=="function"&&i.push(e.subscribe(s)),t&&typeof t.subscribe=="function"&&i.push(t.subscribe(s)),()=>{for(let l of i)try{l()}catch{}}}return{selectBoardColumn:r,subscribe:o}}function tr(e){if(!e)return null;if(typeof e=="number")return Number.isFinite(e)?e:null;let t=Date.parse(e);return Number.isFinite(t)?t:null}function Vt(e){let t=tr(e);if(t===null)return"";let n=new Date(t),r=o=>String(o).padStart(2,"0");return`${n.getFullYear()}-${r(n.getMonth()+1)}-${r(n.getDate())} ${r(n.getHours())}:${r(n.getMinutes())}`}function on(e,t){let n=tr(e);if(n===null)return"";let o=(typeof t=="number"?t:Date.now())-n;if(o<6e4)return"\uBC29\uAE08";let s=Math.floor(o/6e4);if(s<60)return`${s}\uBD84 \uC804`;let i=Math.floor(o/36e5);if(i<24)return`${i}\uC2DC\uAC04 \uC804`;let l=Math.floor(o/864e5);if(l<7)return`${l}\uC77C \uC804`;let a=Math.floor(l/7);if(l<30)return`${a}\uC8FC \uC804`;let u=Math.floor(l/30);return u<12?`${u}\uAC1C\uC6D4 \uC804`:`${Math.floor(l/365)}\uB144 \uC804`}function $c(e){if(!Array.isArray(e))return null;let t=null,n=-1;for(let r of e){if(!r||r.status!=="in_progress")continue;let o=tr(r.updated_at)??0;if(t===null||o>n){t=r,n=o;continue}o===n&&String(r.id)<String(t.id)&&(t=r)}return t}function xs(e){let t=e&&e.parent;return typeof t=="string"?t:t&&t.id?String(t.id):""}function As(e){let t=new Map;for(let r of e)r&&r.id&&!t.has(r.id)&&t.set(r.id,r);let n=new Map;for(let r of t.values()){let o=xs(r);if(!o)continue;let s=n.get(o);s||(s=[],n.set(o,s)),s.push({id:r.id,title:r.title,status:r.status,metadata:r.metadata,workflow:r.workflow,created_at:r.created_at,updated_at:r.updated_at})}return n}function Ss(e,t){let n=e.get(t)||[],r=0;for(let s of n)(s.status==="resolved"||s.status==="closed")&&(r+=1);let o=$c(n);return{total:n.length,count:r,current:o,children:n}}function xc(e){let t=e.transport,n=e.uiOrderStore;function r(i,l){return"renormalize"in i?i.renormalize:[{bead_id:l,rank:i.rank}]}function o(i,l){let a={...i.order};for(let u of l)a[u.bead_id]=u.rank;n&&n.set({revision:i.revision,order:a})}async function s(i,l,a){if(!t||!n)return;let u=n.get()||{revision:0,order:{}},d=r(ea(l,a,u.order),i);o(u,d);let f=await t("ui-order-set",{expected_revision:u.revision,entries:d});if(f&&f.conflict){let g={revision:typeof f.revision=="number"?f.revision:0,order:f.order||{}};n.set(g);let m=r(ea(l,a,g.order),i);o(g,m);let w=await t("ui-order-set",{expected_revision:g.revision,entries:m});w&&w.applied&&n.set({revision:typeof w.revision=="number"?w.revision:0,order:w.order||{}})}else f&&f.applied&&n.set({revision:typeof f.revision=="number"?f.revision:0,order:f.order||{}})}return{applyReorder:s}}function Ac(e){if(typeof e!="string")return"";let t=e.indexOf("-");return t>0?e.slice(0,t):""}function Bn(e,t){let n=Ac(e),r=Ac(t);return n.length===0||r.length===0?!1:n!==r}function Es(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function ra(e,t){return!t||typeof e!="string"||e.length===0||Es(t.visible_labels).includes(e)?!0:Es(t.hidden_labels).includes(e)?!1:!Es(t.hidden_prefixes).some(n=>n.length>0&&e.startsWith(n))}function Sc(e,t){return Es(e).filter(n=>ra(n,t))}function nr(e,t){let n=e&&e.chips?e.chips[t]:void 0;return typeof n=="boolean"?n:!0}function O_(e){switch(e){case"in_progress":return"board-card__dot board-card__dot--progress";case"resolved":return"board-card__dot board-card__dot--resolved";case"closed":return"board-card__dot board-card__dot--closed";case"blocked":return"board-card__dot board-card__dot--blocked";default:return"board-card__dot"}}function I_(e,t,n,r,o){return c`<button
    type="button"
    class="board-card__roll-toggle"
    data-roll-parent=${e}
    aria-expanded=${r?"true":"false"}
    @click=${o}
  >
    children ${t}/${n} ${r?"\u25B4":"\u25BE"}
  </button>`}function L_(e,t,n,r){return c`<button
    type="button"
    class="board-card__roll-child"
    data-child-id=${e.id}
    @click=${r?o=>r(o,e.id):void 0}
  >
    <span class=${O_(e.status)}>●</span>
    <span class="board-card__roll-child-ord">${t}</span>
    <span class="board-card__roll-child-title">${e.title||e.id}</span>
    ${n}
  </button>`}function Ts(e,t){let n=e.total||0,r=!!t.expanded,o=t.trailing??"",s=typeof t.empty_label=="string"&&t.empty_label.length>0?t.empty_label:null;if(n===0&&s===null)return"";let i=Array.isArray(e.children)?e.children:[],l=n>0?i.slice().sort(fc):i;return c`
    <div class="board-card__roll">
      <div class="board-card__roll-meta">
        ${n>0?I_(t.parent_id,e.count,n,r,t.onToggle):c`<span class="board-card__roll-none">${s}</span>`}
        ${o}
      </div>
      ${n>0&&e.current?c`<div class="board-card__roll-current">
            └
            <span class="board-card__cur-child"
              >● ${e.current.title||e.current.id}</span
            >
          </div>`:""}
      ${r&&n>0?c`<div class="board-card__roll-list">
            ${l.map((a,u)=>L_(a,u+1,t.childChips?t.childChips(a):null,t.onChildClick))}
          </div>`:""}
    </div>
  `}var P_={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"mrg",close:"mrg"},Tc={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"merge",close:"close"},Ec={quick_fix:["impl","close"],spec_backed:["spec","impl","pr","merge"],full_plan:["spec","plan","impl","pr","merge"]},D_={review:"\u2713",skip:"\u2298"},rr={none:"\uBBF8\uB3C4\uB2EC",dim:"\uC9C4\uD589 \uC911",stale:"\uC7AC\uAC80\uD1A0 \uD544\uC694",review:"\uAC80\uD1A0 \uC644\uB8CC",skip:"\uAC80\uD1A0 \uC0DD\uB7B5",done:"\uC644\uB8CC"};function M_(e,t,n){if(!(n==="in_progress"||n==="resolved"))return null;for(let o of e){let s=t[o];if(s&&s.fill==="dim"&&s.stale!==!0)return o}return null}function Cc(e){let t=e&&e.fill||"none";return t==="none"?rr.none:e&&e.stale===!0?rr.stale:t==="dim"?rr.dim:e&&e.glyph==="review"?rr.review:e&&e.glyph==="skip"?rr.skip:rr.done}function N_(e){if(!e||e.fill==="none"||!e.approval_state)return Cc(e);let t=[];return e.glyph==="review"?t.push(rr.review):e.glyph==="skip"&&t.push(rr.skip),e.approval_state==="missing"?t.push("\uC2B9\uC778 \uD544\uC694"):e.approval_state==="stale"?t.push("\uC7AC\uC2B9\uC778 \uD544\uC694"):e.approval_state==="unknown"?t.push("\uC2B9\uC778 \uD655\uC778 \uBD88\uAC00"):t.push("\uC2B9\uC778 \uC644\uB8CC"),t.join(" \xB7 ")}function q_(e,t,n,r){let o=P_[e]||e,s=t&&t.fill||"none",i=!!t&&t.stale===!0,l=D_[t&&t.glyph||""]||"",a="bar";s==="dim"?a+=` b-${o} dim`:s==="full"&&(a+=` b-${o} full`),i&&(a+=" stale"),n&&(a+=" cur");let u=s==="none"?"lbl":`lbl l-${o} on`,d=n?`color: var(--stage-${o}-on)`:"",f=Tc[e]||e,g=r?Rc(t):null;if(!g)return c`
      <div class="seg">
        <div class=${a} style=${d}>${l}</div>
        <div class=${u}>${f}</div>
      </div>
    `;let m=`${f} \uBB38\uC11C \uC5F4\uAE30 \xB7 ${g.path}`;return c`
    <button
      type="button"
      class="seg seg--doc"
      aria-label=${m}
      title=${m}
      @click=${w=>{w.preventDefault(),w.stopPropagation(),r(w,g,e)}}
    >
      <div class=${a} style=${d}>${l}</div>
      <div class=${u}>${f}</div>
    </button>
  `}function Rc(e){let t=e?e.doc:null;return!t||typeof t.path!="string"||t.path.length===0?null:t}function Cs(e,t,n={}){if(!e||!e.stages)return"";let r=n.onOpenDoc,o=Ec[e.route]||Ec.spec_backed,s=e.stages,i=M_(o,s,String(t||"open")),l=`\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uC9C4\uD589: ${o.map(u=>`${Tc[u]||u} ${u==="plan"?N_(s[u]||{}):Cc(s[u]||{})}`).join(" \xB7 ")}`,a=!!r&&o.some(u=>Rc(s[u]||{})!==null);return c`
    <div
      class="stp"
      role=${a?"group":"img"}
      aria-label=${l}
    >
      ${o.map(u=>q_(u,s[u]||{},u===i,r))}
    </div>
  `}function j_(e){return typeof e!="number"||!Number.isFinite(e)?"":`P${Math.max(0,Math.min(4,e))}`}var Oc=2;function Ic(e){let t=e.slice(0,Oc).join(", "),n=e.length-Oc;return`\u26D3 blocked: ${t}${n>0?` +${n}`:""}`}function F_(e,t){if(!t)return[];let n=[],r=Array.isArray(t.blockers)?t.blockers:[],o=[],s=[];for(let i of r)(Bn(e,i)?s:o).push(i);return o.length>0&&n.push(c`<span class="ctl-chip ctl-chip--blocked-dep"
        >${Ic(o)}</span
      >`),s.length>0&&n.push(c`<span class="ctl-chip ctl-chip--blocked-foreign"
        >${Ic(s)}</span
      >`),n}function B_(e){if(!e||typeof e!="object")return null;let t=e.awaiting_user;if(typeof t!="string")return null;let n=t.trim();return n.length===0?null:c`<span class="ctl-chip ctl-chip--blocked"
    >${`\u23F8 \uC0AC\uC6A9\uC790 \uB9AC\uBDF0 \uD544\uC694: ${n}`}</span
  >`}function oa(e){return e==="delegated"?"\uC704\uC784":e==="main"?"\uBA54\uC778":null}function Rs(e){return e.effort?`${e.actor}:${e.effort}`:e.actor}function Un(e){return`${e.kind}:${Rs(e)}@${e.sha}`}function Os(e,t){if(!e)return null;let n=oa(e.kind),r=e.reason,o=e.kind==="delegated"?r===null:typeof r=="string"&&r.trim().length>0&&!/[\r\n]/.test(r);if(!n||!o)return null;let s=oa(t?.kind),i=s!==null&&t?.kind!==e.kind,l=`\uACC4\uD68D \xB7 ${n}${i?` \u2192 ${s}`:""}`,a=`planned_execution ${e.kind}${typeof r=="string"?`:${r}`:""}`,u=t?` \xB7 exec_receipt ${Un(t)}`:"";return{kind:e.kind,label:l,title:`${a}${u}`}}function Lc(e,t){let n=Os(e,t);return n?c`<span
        class="ctl-chip ctl-chip--planned"
        data-kind=${n.kind}
        title=${n.title}
        >${n.label}</span
      >`:null}function U_(e){if(!e)return null;let t=oa(e.kind);return t?c`<span
    class="ctl-chip ctl-chip--exec-receipt"
    title=${`exec_receipt ${Un(e)}`}
    >${`\uC2E4\uD589 \xB7 ${t}`}</span
  >`:null}function W_(e,t){let n=t.policy||null,r=e.workflow&&e.workflow.chips||{},o=[];if(r.route&&nr(n,"route")){let l=r.route_source==="derived";o.push(c`<span
        class="ctl-chip ctl-chip--route${l?" is-derived":""}"
        title=${l?"route \uBBF8\uD540 (metadata unset)":"route"}
        >${l?"unset":r.route}</span
      >`)}if(r.fast_track&&nr(n,"fast_track")&&o.push(c`<span class="ctl-chip ctl-chip--ft">⚡ fast_track</span>`),r.pr&&nr(n,"pr")){let l=r.pr.number;o.push(c`<span class="ctl-chip ctl-chip--pr"
        >${`PR${l!=null?` #${l}`:""}`}</span
      >`)}let s=Lc(r.planned_execution,r.exec_receipt);if(s&&o.push(s),r.exec_receipt){let l=r.exec_receipt;o.push(c`<span
        class="ctl-chip ctl-chip--exec-receipt"
        title=${`exec_receipt ${Un(l)}`}
        >${`exec ${l.kind==="delegated"?Rs(l):`main:${l.actor}`} \xB7 ${l.sha.slice(0,7)}`}</span
      >`)}if(r.impl_entry){let l=r.impl_entry;o.push(c`<span
        class="ctl-chip ctl-chip--impl-entry"
        title=${`impl_entry ${l.actor}@${l.sha}`}
        >${`impl ${l.actor} \xB7 ${l.sha.slice(0,7)}`}</span
      >`)}for(let l of Sc(e.labels,n))o.push(c`<span class="ctl-chip ctl-chip--label">${l}</span>`);if(e.from_id&&nr(n,"from")&&o.push(c`<button
        type="button"
        class="ctl-chip ctl-chip--from"
        title=${`\uCD9C\uCC98 ${e.from_id} \uC5F4\uAE30`}
        @click=${l=>{l.stopPropagation(),t.onFromChipClick&&t.onFromChipClick(l,String(e.from_id))}}
      >
        ↩ from ${e.from_id}
      </button>`),nr(n,"blocked")){let l=B_(e.metadata);l&&o.push(l),o.push(...F_(e.id,e.blocked_info))}return t.cleanupFailureFor&&t.cleanupFailureFor(e.id)&&nr(n,"blocked")&&o.push(c`<span class="ctl-chip ctl-chip--cleanup">⚠ 정리 멈춤</span>`),o.length===0?"":c`<div class="board-card__chips">${o}</div>`}function z_(e){let t=on(e.created_at),n=on(e.updated_at);return!t&&!n?"":c`<span class="board-card__times">
    ${t?c`<span
          class="board-card__time"
          title=${`\uC0DD\uC131 ${Vt(e.created_at)}`}
          >생성 ${t}</span
        >`:""}
    ${t&&n?c`<span class="board-card__time-sep">·</span>`:""}
    ${n?c`<span
          class="board-card__time"
          title=${`\uC218\uC815 ${Vt(e.updated_at)}`}
          >수정 ${n}</span
        >`:""}
  </span>`}function H_(e,t){let n=t.rollupFor?t.rollupFor(e.id):{total:0,count:0,current:null,children:[]};return Ts(n,{parent_id:e.id,expanded:t.isExpanded?t.isExpanded(e.id):!0,trailing:z_(e),empty_label:"children \uC5C6\uC74C",childChips:sa,onToggle:r=>t.onRollupToggle&&t.onRollupToggle(r,e.id),onChildClick:(r,o)=>t.onChildClick&&t.onChildClick(r,o)})}function sa(e){let t=e?.workflow?.chips?.planned_execution,n=e?.workflow?.chips?.exec_receipt;return Os(t,n)?c`<span class="board-card__roll-child-chips">
    ${Lc(t,n)}
    ${U_(n)}
  </span>`:null}function Is(e,t){let n=j_(e.priority);return c`
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
      ${e.workflow&&nr(t.policy||null,"stepper")?Cs(e.workflow,e.status,{onOpenDoc:t.onOpenDoc}):""}
      ${H_(e,t)}
    </article>
  `}function Wr(e,t){let n=Array.isArray(e.items)?e.items.length:0,r=e.is_closed===!0;return c`
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
  `}var G_=[{value:"",label:"\uC6B0\uC120\uC21C\uC704"},{value:"0",label:"P0"},{value:"1",label:"P1"},{value:"2",label:"P2"},{value:"3",label:"P3"},{value:"4",label:"P4"}],K_=[{value:"",label:"\uD0C0\uC785"},{value:"bug",label:"bug"},{value:"feature",label:"feature"},{value:"task",label:"task"},{value:"epic",label:"epic"},{value:"chore",label:"chore"}],Y_=[{value:"created_desc",label:"\uC0DD\uC131 \uCD5C\uC2E0\uC21C"},{value:"created_asc",label:"\uC0DD\uC131 \uC624\uB798\uB41C\uC21C"},{value:"updated_desc",label:"\uC218\uC815 \uCD5C\uC2E0\uC21C"},{value:"priority",label:"\uC6B0\uC120\uC21C\uC704\uC21C"},{value:"manual",label:"\uC218\uB3D9(\uB4DC\uB798\uADF8)"}];function V_(e,t,n){let r=e.labels.length,o=r>0?`\uB77C\uBCA8 ${r}`:"\uB77C\uBCA8";return c`
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
        ${Y_.map(r=>c`<option
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
  `}var X_=200,Q_={"ready-col":"open","in-progress-col":"in_progress","resolved-col":"resolved","closed-col":"closed"},Z_=new Set(["blocked-col","ready-col","in-progress-col","resolved-col"]),Mc="beads-ui.board.sort",Nc=new Set(["created_desc","created_asc","updated_desc","priority","manual"]);function J_(){try{let e=window.localStorage.getItem(Mc);if(e&&Nc.has(e))return e}catch{}return"created_desc"}function qc(e,t){let n=Ot("views:board"),r=t.gotoIssue,o=t.issueStores,s=t.transport,i=t.uiOrderStore,l=t.displayPolicyStore,a=t.workerQueueStore,u=t.onClosedRangeChange,d=t.onNewIssue,f=t.openDoc,g=t.closedRange||ys,m=o?Ur(o,i):null,w=xc({transport:s,uiOrderStore:i}),C=[],F=[],V=[],se=[],j=[],N=[],R=!1,L=0,B=J_(),Y=new Map,Q=new Map,P=new Map,H=new Set,G={search:"",priority:"",type:"",labels:[]},te=!1,ke=null;function Ee(ae){return String(ae.status||"open")==="open"}function oe(ae){return String(ae.status||"open")==="open"}function D(ae){let ie=G.search.trim().toLowerCase(),$=G.priority,q=G.type,J=G.labels;return ae.filter(re=>{if(ie){let le=String(re.id||"").toLowerCase(),Be=String(re.title||"").toLowerCase();if(!le.includes(ie)&&!Be.includes(ie))return!1}if($!==""&&String(re.priority)!==$||q!==""&&String(re.issue_type||"")!==q)return!1;if(J.length>0){let le=Array.isArray(re.labels)?re.labels:[];if(!J.some(Be=>le.includes(Be)))return!1}return!0})}function be(){let ae=new Set;for(let ie of[C,F,V,se,j,N])for(let $ of ie){let q=Array.isArray($.labels)?$.labels:[];for(let J of q)typeof J=="string"&&J.length>0&&ae.add(J)}return Array.from(ae).sort()}function Se(){return G.search.trim()!==""||G.priority!==""||G.type!==""||G.labels.length>0}function T(){try{if(m){let ae=m.selectBoardColumn("tab:board:in-progress","in_progress",B),ie=m.selectBoardColumn("tab:board:blocked","blocked",B).filter(oe),$=new Set(ae.map(ze=>ze.id)),q=m.selectBoardColumn("tab:board:ready","ready",B).filter(ze=>Ee(ze)&&!$.has(ze.id)),J=m.selectBoardColumn("tab:board:resolved","resolved",B),re=m.selectBoardColumn("tab:board:deferred","deferred",B),le=m.selectBoardColumn("tab:board:closed","closed").slice(0,X_),Be=[...ie,...q,...ae,...J,...le];ee(Be);let Ve=new Set;for(let ze of Be)ze&&ze.id&&!xs(ze)&&Ve.add(ze.id);let tt=!Se();C=tt?wo(ie,Ve):ie,F=tt?wo(q,Ve):q,V=tt?wo(ae,Ve):ae,se=tt?wo(J,Ve):J,j=re,L=re.length,N=tt?wo(le,Ve):le,Y=new Map;for(let ze of C)Y.set(ze.id,"open");for(let ze of F)Y.set(ze.id,"open");for(let ze of V)Y.set(ze.id,"in_progress");for(let ze of se)Y.set(ze.id,"resolved");for(let ze of j)Y.set(ze.id,"deferred");for(let ze of N)Y.set(ze.id,"closed");Q=new Map;for(let ze of C)Q.set(ze.id,"blocked-col");for(let ze of F)Q.set(ze.id,"ready-col");for(let ze of V)Q.set(ze.id,"in-progress-col");for(let ze of se)Q.set(ze.id,"resolved-col");for(let ze of N)Q.set(ze.id,"closed-col")}Ue()}catch{C=[],F=[],V=[],se=[],j=[],N=[],P=new Map,Ue()}}function ee(ae){P=As(ae)}function me(ae){return Ss(P,ae)}function ve(ae){return!H.has(ae)}function Ce(ae,ie){ae.preventDefault(),ae.stopPropagation(),H.has(ie)?H.delete(ie):H.add(ie),Ue()}function _e(ae,ie){ae.preventDefault(),ae.stopPropagation(),r(ie)}function Re(ae,ie){ae.preventDefault(),ae.stopPropagation(),r(ie)}function Ye(ae,ie){ke||r(ie)}function it(ae,ie){ae.preventDefault(),ae.stopPropagation(),em(ie).then($=>{$&&we("\uBCF5\uC0AC\uB428","success",1200)})}function I(ae,ie){ke=ie,ae.dataTransfer&&(ae.dataTransfer.setData("text/plain",ie),ae.dataTransfer.effectAllowed="move"),ae.target.classList.add("board-card--dragging")}function ue(ae){ae.target.classList.remove("board-card--dragging"),Mt(),setTimeout(()=>{ke=null},0)}function ne(ae){let ie=String(ae.target.value||"");!ie||ie===g||(g=ie,u&&u(ie),Ue())}function de(){return l?l.get():null}function Ae(ae){let ie=a?a.get():null,$=ie?ie.cleanup_failed:null;if(!$||typeof $!="object"||Array.isArray($))return null;let q=$[ae];return!q||typeof q!="object"||Array.isArray(q)?null:q}let ge={onCardClick:Ye,onCopyId:it,onDragStart:I,onDragEnd:ue,onClosedRangeChange:ne,rollupFor:me,isExpanded:ve,onRollupToggle:Ce,onChildClick:_e,onFromChipClick:Re,onOpenDoc:f?(ae,ie)=>f(ie):void 0,cleanupFailureFor:Ae,get policy(){return de()}};function Ne(ae,ie){ke||(y(),r(ie))}function qe(ae,ie){ae.preventDefault(),ae.stopPropagation(),y(),r(ie)}let Ze={...ge,onCardClick:Ne,onChildClick:qe,onFromChipClick:qe,onOpenDoc:f?(ae,ie)=>{y(),f(ie)}:void 0,get policy(){return de()}};function Fe(ae){let ie=ae.target,$=e.querySelector(".board-filter__labels");ie&&$&&$.contains(ie)||Te()}function Z(ae){ae.key==="Escape"&&Te()}function X(){te||(te=!0,document.addEventListener("mousedown",Fe),document.addEventListener("keydown",Z),Ue())}function Te(){te&&(te=!1,document.removeEventListener("mousedown",Fe),document.removeEventListener("keydown",Z),Ue())}function He(ae){ae.key==="Escape"&&y()}function at(){R||(R=!0,document.addEventListener("keydown",He),Ue())}function y(){R&&(R=!1,document.removeEventListener("keydown",He),Ue())}let U={onClose:y,onOverlayClick(ae){ae.target===ae.currentTarget&&y()}},Oe={onSearchInput(ae){G.search=String(ae.target.value||""),T()},onPriorityChange(ae){G.priority=String(ae.target.value||""),T()},onTypeChange(ae){G.type=String(ae.target.value||""),T()},onSortChange(ae){let ie=String(ae.target.value||"");if(!(!Nc.has(ie)||ie===B)){B=ie;try{window.localStorage.setItem(Mc,ie)}catch{}T()}},onDeferredToggle(){R?y():at()},onLabelMenuToggle(){te?Te():X()},onLabelToggle(ae){let ie=G.labels.indexOf(ae);ie===-1?G.labels.push(ae):G.labels.splice(ie,1),T()},onLabelClear(){G.labels.length!==0&&(G.labels=[],T())},onNewIssue(){d&&d()}};function Ie(){return c`
      <div class="board-view">
        ${Dc(G,Oe,{sort_mode:B,deferred_popup_open:R,deferred_count:L,label_options:be(),label_menu_open:te})}
        <div class="board-root">
          ${Wr({title:"Blocked",id:"blocked-col",items:D(C)},ge)}
          ${Wr({title:"Ready",id:"ready-col",items:D(F)},ge)}
          ${Wr({title:"In progress",id:"in-progress-col",items:D(V)},ge)}
          ${Wr({title:"Resolved",id:"resolved-col",items:D(se)},ge)}
          ${Wr({title:"Closed",id:"closed-col",items:D(N),is_closed:!0,closed_range:g},ge)}
        </div>
        ${R?Pc({items:D(j),count:L},Ze,U):""}
      </div>
    `}function Ue(){st(Ie(),e),Ke()}function Ke(){try{let ae=e.querySelector("#deferred-popup");ae&&!ae.open&&(typeof ae.showModal=="function"?ae.showModal():ae.setAttribute("open",""));let ie=Array.from(e.querySelectorAll(".board-column, .deferred-popup__body"));for(let $ of ie)Array.from($.querySelectorAll(".board-card")).forEach((J,re)=>{J.tabIndex=re===0?0:-1})}catch{}}async function pt(ae,ie){if(!s){we("\uC5F0\uACB0\uB418\uC9C0 \uC54A\uC544 \uC0C1\uD0DC\uB97C \uBCC0\uACBD\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error");return}try{await s("update-status",{id:ae,status:ie}),we("\uC0C1\uD0DC \uBCC0\uACBD\uB428","success",1500)}catch($){n("update-status failed: %o",$),we("\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328","error")}}function Et(ae){switch(ae){case"blocked-col":return C;case"ready-col":return F;case"in-progress-col":return V;case"resolved-col":return se;default:return[]}}function It(ae,ie,$){if(!s||!i)return;let q=Et(ae),J=q.find(tt=>tt.id===ie);if(!J)return;let re=q.filter(tt=>tt.id!==ie),le=$.closest?$.closest(".board-card"):null,Be=re.length;if(le){let tt=le.getAttribute("data-issue-id");if(tt===ie)return;let ze=re.findIndex(xt=>xt.id===tt);ze>=0&&(Be=ze)}let Ve=re.slice();Ve.splice(Be,0,J),w.applyReorder(ie,Ve,Be)}function Mt(){for(let ae of Array.from(e.querySelectorAll(".board-column--drag-over")))ae.classList.remove("board-column--drag-over")}let mt=null;e.addEventListener("dragover",ae=>{ae.preventDefault(),ae.dataTransfer&&(ae.dataTransfer.dropEffect="move");let $=ae.target.closest(".board-column");$&&$!==mt&&(mt&&mt.classList.remove("board-column--drag-over"),$.classList.add("board-column--drag-over"),mt=$)}),e.addEventListener("dragleave",ae=>{let ie=ae.relatedTarget;(!ie||!e.contains(ie))&&mt&&(mt.classList.remove("board-column--drag-over"),mt=null)}),e.addEventListener("drop",ae=>{ae.preventDefault(),mt&&(mt.classList.remove("board-column--drag-over"),mt=null);let ie=ae.target,$=ie.closest(".board-column");if(!$)return;let q=ae.dataTransfer?.getData("text/plain")||"";if(!q)return;let J=$.id,re=Q.get(q);if(re&&re===J){if(Z_.has(J)){if(B!=="manual"){we("\uC218\uB3D9(\uB4DC\uB798\uADF8) \uC815\uB82C \uBAA8\uB4DC\uC5D0\uC11C\uB9CC \uC21C\uC11C\uB97C \uBC14\uAFC0 \uC218 \uC788\uC2B5\uB2C8\uB2E4","warning",2e3);return}It(J,q,ie)}return}let le=Q_[J];if(!le){we("\uC5EC\uAE30\uB85C\uB294 \uC62E\uAE38 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","warning",1500);return}Y.get(q)!==le&&pt(q,le)}),e.addEventListener("keydown",ae=>{let ie=ae.target;if(!(ie instanceof HTMLElement))return;let $=String(ie.tagName||"").toLowerCase();if($==="input"||$==="textarea"||$==="select"||$==="button"||$==="a"||ie.isContentEditable===!0)return;let q=ie.closest(".board-card");if(!q)return;let J=String(ae.key||"");if(J==="Enter"||J===" "){ae.preventDefault();let Ve=q.getAttribute("data-issue-id");Ve&&r(Ve);return}if(J!=="ArrowUp"&&J!=="ArrowDown"&&J!=="ArrowLeft"&&J!=="ArrowRight")return;ae.preventDefault();let re=q.closest(".board-column");if(!re)return;let le=Array.from(re.querySelectorAll(".board-card")),Be=le.indexOf(q);if(J==="ArrowDown"&&Be<le.length-1){ct(q,le[Be+1]);return}if(J==="ArrowUp"&&Be>0){ct(q,le[Be-1]);return}if(J==="ArrowLeft"||J==="ArrowRight"){let Ve=Array.from(e.querySelectorAll(".board-column")),tt=Ve.indexOf(re),ze=J==="ArrowRight"?1:-1,xt=tt+ze;for(;xt>=0&&xt<Ve.length;){let Nt=Ve[xt].querySelector(".board-card");if(Nt){ct(q,Nt);return}xt+=ze}}});function ct(ae,ie){try{ae.tabIndex=-1,ie.tabIndex=0,ie.focus()}catch{}}let $t=null;m&&m.subscribe&&($t=m.subscribe(()=>{try{T()}catch{}}));let Ct=null;l&&l.subscribe&&(Ct=l.subscribe(()=>{try{T()}catch{}}));let Lt=null;return a&&a.subscribe&&(Lt=a.subscribe(()=>{Ue()})),{async load(){n("load"),T()},clear(){Te(),y(),$t&&($t(),$t=null),Ct&&(Ct(),Ct=null),Lt&&(Lt(),Lt=null),e.replaceChildren(),C=[],F=[],V=[],se=[],j=[],N=[],Y=new Map,Q=new Map}}}function wo(e,t){return e.filter(n=>{let r=xs(n);return!(r&&t.has(r))})}async function em(e){try{if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")return await navigator.clipboard.writeText(String(e)),!0;let t=document.createElement("textarea");t.value=String(e),t.style.position="fixed",t.style.left="-9999px",document.body.appendChild(t),t.select();let n=!1;try{n=document.execCommand("copy")}finally{t.remove()}return n}catch{return!1}}var rn=e=>e??Pt;async function sn(e){let t=String(e);if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")try{return await navigator.clipboard.writeText(t),!0}catch{}try{let n=document.createElement("textarea");n.value=t,n.style.position="fixed",n.style.left="-9999px",document.body.appendChild(n),n.select();let r=!1;try{r=document.execCommand("copy")}finally{n.remove()}return r}catch{return!1}}function $r(e){return[typeof e.runner=="string"?e.runner:null,typeof e.model=="string"?e.model:null,typeof e.effort=="string"?e.effort:null,e.speed==="fast"?"Fast":null].filter(Boolean).join(" \xB7 ")}function ko(e){return typeof e.resumed_from!="string"||e.resumed_from.length===0?null:`${e.continuation_mode==="session"?"session \uC774\uC5B4\uBC1B\uC74C":e.continuation_mode==="fresh"?"\uC0C8 session\uC73C\uB85C \uC774\uC5B4\uBC1B\uC74C":"\uC774\uC804 attempt\uC5D0\uC11C \uC774\uC5B4\uBC1B\uC74C"} (from ${e.resumed_from})`}function tm(e,t=document){let n=t.createElement("dialog");n.className="continuation-dialog";let r=t.createElement("button"),o=t.createElement("button"),s=t.createElement("button"),i=t.createElement("h2"),l=t.createElement("p");return i.textContent="\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4",l.textContent=`${$r(e.prior||{})||"\uC774\uC804 \uC124\uC815"} \u2192 ${$r(e.current||{})||"\uD604\uC7AC \uC124\uC815"}`,r.type="button",r.textContent="\uAE30\uC874 session \uC774\uC5B4\uD558\uAE30",r.disabled=e.prior_available===!1,o.type="button",o.textContent="\uD604\uC7AC preset\uC73C\uB85C \uC0C8 session",s.type="button",s.textContent="\uCDE8\uC18C",n.append(i,l,r,o,s),t.body.append(n),new Promise(a=>{let u=d=>{typeof n.close=="function"&&n.close(),n.remove(),a(d)};r.addEventListener("click",()=>u("prior_session")),o.addEventListener("click",()=>u("fresh_current")),s.addEventListener("click",()=>u(null)),n.addEventListener("cancel",d=>{d.preventDefault(),u(null)}),typeof n.showModal=="function"?n.showModal():n.setAttribute("open","")})}async function Wn(e,t,n={}){let r=e;for(n.onResult?.(r);r?.continuation_mismatch;){let o=r.continuation_mismatch,s=await tm(o);if(s===null)return r;r=await t(s,o.decision_token),n.onResult?.(r),r?.conflict&&n.refresh&&(r=await n.refresh(r),n.onResult?.(r))}return r}var nm=["workflow_mode","spec_review_model","spec_review_effort","spec_review_speed","plan_review_model","plan_review_effort","plan_review_speed","impl_review_model","impl_review_effort","impl_review_speed","impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed","quick_fix_impl_model","orchestration_model","orchestration_effort","orchestration_speed"],jc={spec_review_effort:"spec_review_model",plan_review_effort:"plan_review_model",impl_review_effort:"impl_review_model"},Fc={spec_review_speed:"spec_review_model",plan_review_speed:"plan_review_model",impl_review_speed:"impl_review_model"},rm=new Set(["native-fixed-posture","unsupported","claude-runner-model-default","catalog-validated","provider-tier-or-runtime-model-default","actual-effort"]);function Gt(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function Dt(e){return typeof e=="string"&&e.length>0?e:null}function Hr(e){return e.startsWith("gpt-")?e.slice(4):e}function kt(e,t,n,r,o){return{value:e,source:t,display:n,full_value:r,resolution:o}}function Uc(e,t,n){let r=Dt(t[e]);if(r!==null)return{value:r,source:"pin"};let o=Dt(n[e]);return o===null?null:{value:o,source:"global"}}function zr(e,t,n,r){return Uc(e,t,n)||{value:r,source:"base"}}function ia(e,t,n,r){let o=n?.implementation?.model_catalog;if(t&&Gt(o?.[t])){let i=Dt(o[t][e]);if(i!==null)return i}if(t&&Array.isArray(o?.[t])&&o[t].includes(e))return e;if(!t&&Gt(o)){for(let i of Object.values(o))if(Gt(i)){let l=Dt(i[e]);if(l!==null)return l}else if(Array.isArray(i)&&i.includes(e))return e}let s=r?.model_index?.[e];return Dt(r?.runners?.[s]?.models?.[e]?.id)||e}function om(e,t){return Dt(t?.review?.reviewers?.[e]?.model)||e}function xr(e,t,n=!1){if(e==="default")return kt(e,t,`default (\uC77C\uBC18 \xB7 ${t==="pin"?"\uD540":"\uC804\uC5ED \uACE0\uC815"})`,e,"explicit");let r=n?Hr(e):e;return kt(e,t,r,e,"explicit")}function Wc(e,t,n){let r=t?.implementation?.model_catalog?.[e],o=[];Gt(r)?o.push(...Object.keys(r)):Array.isArray(r)&&o.push(...r.filter(i=>typeof i=="string"));let s=n?.runners?.[e]?.models;if(Gt(s))for(let i of Object.keys(s))o.includes(i)||o.push(i);return o}function sm(e,t){let n=[],r=e?.implementation?.model_catalog;Gt(r)&&n.push(...Object.keys(r));let o=t?.runners;if(Gt(o))for(let s of Object.keys(o))n.includes(s)||n.push(s);return n}function im(e,t,n){if(e===null)return{runtime:null,offered:!1};let r=!1;for(let o of sm(t,n)){let s=Wc(o,t,n);if(s.length>0&&(r=!0),s.includes(e))return{runtime:o,offered:!0}}return{runtime:null,offered:r}}function aa(e){return kt(e.value,e.source,`${e.value} (\uBE44\uD638\uD658)`,e.value,"incompatible")}function Bc(e,t,n){let r=Uc(e,t,n);return r?xr(r.value,r.source):kt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable")}function gn(e){let t=Gt(e.pin)?e.pin:{},n=Gt(e.global)?e.global:{},r=Gt(e.execution_defaults)?e.execution_defaults:null,o=r?.supported===!0&&Gt(r.session)?r.session:null,s=r?.supported===!0&&Gt(r.orchestration)?r.orchestration:null,i=Gt(e.runner_catalog)?e.runner_catalog:null,l=Dt(n.quick_fix_impl_model),a=im(l,o,i),u={};if(o){let d=zr("workflow_mode",t,n,Dt(o.workflow_mode_default));u.workflow_mode=d.source==="base"?kt(d.value,"base",d.value||"\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",d.value,"default"):xr(d.value,d.source);for(let j of["spec_review","plan_review","impl_review"]){let N=`${j}_model`,R=Dt(j==="plan_review"?d.value==="fast_track"?o.plan_review?.fast_track_default:o.plan_review?.standard_recommended:o.review?.default),L=zr(N,t,n,R);if(L.value===null)u[N]=kt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable");else if(L.value!=="self"&&L.value!=="skip"&&!Gt(o.review?.reviewers?.[L.value]))u[N]=aa(kt(L.value,L.source,"",null,"explicit"));else{let B=om(L.value,o);u[N]=kt(L.value,L.source,Hr(B),B,L.source==="base"?"default":"explicit")}}for(let[j,N]of Object.entries(jc)){let R=u[N].value;if(R==="self"||R==="skip"){u[j]=kt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable");continue}let L=Dt(o.review?.reviewers?.[R||""]?.effort),B=zr(j,t,n,L);u[j]=B.value===null?kt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"):kt(B.value,B.source,B.value,B.value,B.source==="base"?"default":"explicit")}for(let[j,N]of Object.entries(Fc)){let R=u[N];if(R.resolution==="incompatible"||R.value==="self"||R.value==="skip"){u[j]=kt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable");continue}if(R.resolution==="unavailable"){u[j]=kt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable");continue}let L=zr(j,t,n,"default");u[j]=L.source==="base"?kt("default","base","default (\uC77C\uBC18)","default","default"):xr(L.value,L.source)}let f=Gt(o.implementation?.default)?o.implementation.default:{},g=Dt(e.route),m=g!==null&&["quick_fix","spec_backed","full_plan"].includes(g),w=Gt(o.implementation?.route_defaults)?o.implementation.route_defaults:{},C=m&&Gt(w[g])?w[g]:{};for(let j of["impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"]){let N=zr(j,t,n,j==="impl_dispatch"?Dt(C.dispatch)||Dt(f.dispatch):Dt(f[j.replace("impl_","")]));u[j]=N.value===null?kt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"):kt(N.value,N.source,N.value,N.value,N.source==="base"?"default":"explicit")}let F=Dt(t.impl_runtime),V=F==="inherit"?Dt(e.controller_runtime):F,se=g==="quick_fix"&&Dt(t.impl_dispatch)===null&&a.runtime!==null&&(F===null||V===a.runtime);if(se){let j=a.runtime,N=l;u.impl_dispatch=kt("delegated","global","\uC704\uC784 (\uC804\uC5ED quick_fix)","delegated","explicit"),F===null&&(u.impl_runtime=kt(j,"global",`${j} (\uC720\uB3C4)`,j,"explicit")),Dt(t.impl_model)===null&&(u.impl_model=kt(N,"global",N,N,"explicit"))}if(u.impl_dispatch.value==="main"){u.impl_dispatch.display="\uBA54\uC778";for(let j of["impl_runtime","impl_model","impl_effort","impl_speed"])u[j]=kt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable")}else{if(u.impl_dispatch.value==="delegated"&&!se&&(u.impl_dispatch.display="\uC704\uC784"),u.impl_runtime.value==="inherit"&&(u.impl_runtime.display=e.controller_runtime?`inherit (${e.controller_runtime})`:"inherit (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_runtime.resolution="dynamic"),u.impl_model.value!==null){let j=u.impl_runtime.value==="inherit"?Dt(e.controller_runtime):u.impl_runtime.value,N=j?Wc(j,o,i):[];if(u.impl_model.value!=="auto"&&N.length>0&&!N.includes(u.impl_model.value))u.impl_model=aa(u.impl_model);else{let R=ia(u.impl_model.value,j,o,i);u.impl_model.display=Hr(R),u.impl_model.full_value=R}}if(u.impl_effort.value==="auto"){let j=Dt(e.transport)||(u.impl_runtime.value==="codex"?"codex-native-spawn":u.impl_runtime.value==="claude"?"implement-claude":null),N=j?Dt(o.implementation?.effort_by_transport?.[j]?.auto):null;N&&!rm.has(N)?(u.impl_effort.display=`${N} (\uBE44\uD638\uD658)`,u.impl_effort.full_value=N,u.impl_effort.resolution="incompatible"):(u.impl_effort.display="auto (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_effort.resolution="dynamic")}u.impl_speed.value==="default"&&(u.impl_speed=u.impl_speed.source==="base"?kt("default","base","default (\uC77C\uBC18)","default","default"):xr("default",u.impl_speed.source))}}else for(let d of nm.filter(f=>!f.startsWith("orchestration_")))u[d]=Bc(d,t,n);if(!o){for(let[d,f]of Object.entries(jc))(u[f].value==="self"||u[f].value==="skip")&&(u[d]=kt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable"));for(let[d,f]of Object.entries(Fc))(u[f].value==="self"||u[f].value==="skip")&&(u[d]=kt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable"));if(u.impl_dispatch.value==="main"){u.impl_dispatch.display="\uBA54\uC778";for(let d of["impl_runtime","impl_model","impl_effort","impl_speed"])u[d]=kt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable")}else u.impl_dispatch.value==="delegated"&&(u.impl_dispatch.display="\uC704\uC784"),u.impl_runtime.value==="inherit"&&(u.impl_runtime.display=e.controller_runtime?`inherit (${e.controller_runtime})`:"inherit (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_runtime.resolution="dynamic"),u.impl_effort.value==="auto"&&(u.impl_effort.display="auto (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_effort.resolution="dynamic")}for(let d of["orchestration_model","orchestration_effort","orchestration_speed"]){if(!s){u[d]=Bc(d,t,n);continue}let f=d.replace("orchestration_",""),g=Dt(s[f]),m=zr(d,t,n,g);if(d==="orchestration_effort"&&m.source==="base"){u[d]=kt(null,"base","CLI \uAE30\uBCF8 (\uBBF8\uC9C0\uC815)",null,"default");continue}if(m.value===null){u[d]=kt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable");continue}if(d==="orchestration_model"){let w=m.source==="base"?Dt(s.model_id)||m.value:ia(m.value,null,o,i);u[d]=kt(m.value,m.source,Hr(w),w,m.source==="base"?"default":"explicit");continue}if(m.value==="default"){u[d]=m.source==="base"?kt("default","base","default (\uC77C\uBC18)","default","default"):xr("default",m.source);continue}u[d]=xr(m.value,m.source)}if(o)if(l===null){let d=u.orchestration_model.full_value;u.quick_fix_impl_model=kt(null,"base",d===null?"\uBA54\uC778":`\uBA54\uC778 (orchestration ${Hr(d)})`,null,"default")}else if(a.runtime!==null){let d=ia(l,a.runtime,o,i);u.quick_fix_impl_model=kt(l,"global",Hr(d),d,"explicit")}else a.offered?u.quick_fix_impl_model=aa(kt(l,"global","",null,"explicit")):u.quick_fix_impl_model=xr(l,"global");return u}function am(e,t){let n=t&&e.value==="default"?"default (\uC77C\uBC18)":e.display;if(!t||e.source==="pin")return`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 ${e.display}`;let r=e.source==="global"?"\uC804\uC5ED":"harness";return`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 ${n} (${r})`}function Ls(e){let t=Gt(e.pin)?e.pin:{},n=Gt(e.global)?e.global:{},r=Gt(e.resolution_global)?{...e.resolution_global}:{};delete r[e.key];let o=f=>{let g={...r,...f};return gn({pin:e.layer==="pin"?g:t,global:e.layer==="pin"?n:g,execution_defaults:e.execution_defaults,runner_catalog:e.runner_catalog,route:e.route,controller_runtime:e.controller_runtime})},s=e.layer==="pin"?t:n,i={...s};delete i[e.key];let l=o(i)[e.key],a=o(s)[e.key],u=Dt(s[e.key]),d=[...e.choices];return u!==null&&!d.includes(u)&&d.unshift(u),{unset_label:am(l,e.layer==="pin"),full_value:l.full_value,unavailable:l.resolution==="unavailable",disabled:a?.resolution==="not_applicable",options:d.map(f=>{let g=o({...s,[e.key]:f})[e.key];return{value:f,label:g.display,full_value:g.full_value}})}}function Gr(e=document){let t=e.createElement("dialog");t.className="resume-instructions-dialog";let n=e.createElement("h2"),r=e.createElement("textarea"),o=e.createElement("div"),s=e.createElement("button"),i=e.createElement("button");return n.textContent="\uC138\uC158 \uC774\uC5B4\uD558\uAE30",r.placeholder="\uCD94\uAC00 \uC9C0\uCE68 (\uC120\uD0DD) \u2014 \uBE44\uC6CC\uB450\uBA74 \uAE30\uBCF8 \uC808\uCC28\uB85C \uC7AC\uAC1C",r.maxLength=4e3,o.className="resume-instructions-dialog__actions",s.type="button",s.textContent="\uC774\uC5B4\uD558\uAE30",i.type="button",i.textContent="\uCDE8\uC18C",o.append(s,i),t.append(n,r,o),e.body.append(t),new Promise(l=>{let a=!1,u=f=>{a||(a=!0,typeof t.close=="function"&&t.close(),t.remove(),l(f))},d=()=>u(r.value.trim());s.addEventListener("click",d),i.addEventListener("click",()=>u(null)),r.addEventListener("keydown",f=>{f.key==="Enter"&&(f.ctrlKey||f.metaKey)&&(f.preventDefault(),d())}),t.addEventListener("cancel",f=>{f.preventDefault(),u(null)}),typeof t.showModal=="function"?t.showModal():t.setAttribute("open",""),r.focus()})}function la(e){return`session:${e.provider}:${e.session_id}`}function $o(e){return`${e.provider} \xB7 ${e.session_id.slice(0,8)}`}function lm(e,t){return e.current&&t==="in_progress"&&e.locality==="local"?"running":"done"}function Kr(e,t,n,r){return{attempt_id:la(e),session_ref:{bead_id:t,provider:e.provider,session_id:e.session_id},...typeof r=="string"&&r.length>0?{root_dir:r}:{},hide_prompt:!0,meta:{runner:e.provider,label:$o(e),session_id:e.session_id,...typeof e.resume_command=="string"&&e.resume_command.length>0?{resume_command:e.resume_command}:{},status:lm(e,n)}}}var ca="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4",cm="\uBD84\uD574 \uC5C6\uC74C \u2014 \uCD1D\uB7C9\uB9CC \uBCF4\uACE0\uB428",zc="\uBD84\uD574 \uC5C6\uB294 leg";function Ut(e){return typeof e=="number"&&Number.isFinite(e)?e:0}var Nn=["input_tokens","output_tokens","cache_read_input_tokens","cache_creation_input_tokens"],Yr=[...Nn,"reasoning_output_tokens"],um={codex:["implementation","review-consult"],claude:["subagent"]};function ua(e){return!e||typeof e!="object"?!1:Number.isFinite(e.total_tokens)&&!Nn.some(t=>Number.isFinite(e[t]))}function dm(e){return!e||typeof e!="object"?!1:Yr.some(t=>Number.isFinite(e[t]))}function da(e){let t=0;for(let n of Nn)t+=Ut(e?.[n]);return t}function pm(e){return!e||typeof e!="object"?!1:Nn.some(t=>Number.isFinite(e[t]))}function Hc(e){return!e||typeof e!="object"?!1:Yr.some(t=>Number.isFinite(e[t]))||Number.isFinite(e.total_tokens)}function fm(e){let t={};for(let n of Yr)e&&Number.isFinite(e[n])&&(t[n]=e[n]);return t}function Gc(e){let t={};for(let n of Yr)Number.isFinite(e[n])&&(t[n]=e[n]);return Number.isFinite(e.total_tokens)&&(t.total_tokens=e.total_tokens),e.replayed===!0&&(t.replayed=!0),typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&(t.total_cost_usd=e.total_cost_usd),t}function Kc(e,t){return ua(t)?Ut(t.total_tokens):e==="codex"?Ut(t.input_tokens)+Ut(t.output_tokens):da(t)}function _m(e){return e==="claude"?"Claude":"Codex"}function mm(e){return`\u03C4 ${Vc(e)}`}function gm(e,t){let n=t.breakdown||{},r=Ut(t.total_only_subtotal);if(ua(n)||r>0&&!dm(n)){let u=[`\uCD1D ${t.subtotal.toLocaleString("en-US")}`,cm];return t.replayed&&u.push(ca),u.join(`
`)}let o=[`\uC785\uB825 ${Ut(n.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${Ut(n.output_tokens).toLocaleString("en-US")}`];e==="claude"?o.push(`\uCE90\uC2DC\uC77D\uAE30 ${Ut(n.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${Ut(n.cache_creation_input_tokens).toLocaleString("en-US")}`):(o.push(`\uCE90\uC2DC\uC77D\uAE30 ${Ut(n.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC4F0\uAE30 ${Ut(n.cache_creation_input_tokens).toLocaleString("en-US")}`),Number.isFinite(n.reasoning_output_tokens)&&o.push(`\uCD94\uB860\uCD9C\uB825 ${Ut(n.reasoning_output_tokens).toLocaleString("en-US")}`)),r>0&&o.push(`${zc} ${r.toLocaleString("en-US")}`);let s=e==="claude"?"\uC785\uB825 + \uCD9C\uB825 + \uCE90\uC2DC\uC77D\uAE30 + \uCE90\uC2DC\uC0DD\uC131":"\uC785\uB825 + \uCD9C\uB825",i=r>0?`${s} + ${zc}`:s,a=[e==="claude"?`Claude subtotal = ${i}`:`Codex subtotal = ${i}; \uCE90\uC2DC\uC77D\uAE30\xB7\uCE90\uC2DC\uC4F0\uAE30\xB7\uCD94\uB860\uCD9C\uB825\uC740 subtotal\uC5D0 \uD3EC\uD568\uB418\uC9C0 \uC54A\uB294 subset`,`\uCD1D ${t.subtotal.toLocaleString("en-US")}`,o.join(" \xB7 ")];return typeof t.total_cost_usd=="number"&&Number.isFinite(t.total_cost_usd)&&a.push(`$${t.total_cost_usd.toFixed(2)}`),t.replayed&&a.push(ca),a.join(`
`)}function nn(e){let t=[];if(!e||typeof e!="object"||!("providers"in e)||!e.providers)return t;for(let n of["claude","codex"]){let r=e.providers[n];r&&t.push({provider:n,label:`${_m(n)} ${mm(r.subtotal)}${typeof r.total_cost_usd=="number"&&Number.isFinite(r.total_cost_usd)?` \xB7 $${r.total_cost_usd.toFixed(2)}`:""}`,tooltip:gm(n,r)})}return t}function Ds(e){let t={},n={claude:!0,codex:!1},r={claude:0,codex:0};for(let o of e)if(!(!o||!o.providers))for(let s of["claude","codex"]){let i=o.providers[s];if(!i)continue;let l=t[s];l||(l={subtotal:0,breakdown:{}},t[s]=l),l.subtotal+=i.subtotal,Number.isFinite(i.total_only_subtotal)&&(l.total_only_subtotal=Ut(l.total_only_subtotal)+Ut(i.total_only_subtotal));for(let a of Yr)Number.isFinite(i.breakdown[a])&&(l.breakdown[a]=Ut(l.breakdown[a])+Ut(i.breakdown[a]));i.replayed&&(l.replayed=!0),s==="claude"&&(typeof i.total_cost_usd=="number"&&Number.isFinite(i.total_cost_usd)?r.claude+=i.total_cost_usd:n.claude=!1)}return t.claude&&n.claude&&(t.claude.total_cost_usd=r.claude),Object.keys(t).length===0?null:{providers:t,roles:{}}}function pa(e){return!e||typeof e!="object"?null:Hn({attempt:{...e,bead_id:"__attempt__"}},"__attempt__")}function hm(e){return e==="codex"?"codex":"claude"}function Mn(){return{subtotal:0,breakdown:fm(null),total_only:0,legs:[],replayed:!1,outer_count:0,outer_cost:0,outer_cost_count:0}}function Ps(e,t,n){e.subtotal+=t.subtotal,ua(t.usage)&&(e.total_only+=t.subtotal);for(let r of Yr)Number.isFinite(t.usage[r])&&(e.breakdown[r]=Ut(e.breakdown[r])+Ut(t.usage[r]));e.legs.push(t),t.replayed===!0&&(e.replayed=!0),n&&(e.outer_count+=1,typeof t.usage.total_cost_usd=="number"&&Number.isFinite(t.usage.total_cost_usd)&&(e.outer_cost+=t.usage.total_cost_usd,e.outer_cost_count+=1))}function Yc(e,t){let n={subtotal:e.subtotal,breakdown:e.breakdown};return e.total_only>0&&(n.total_only_subtotal=e.total_only),t&&(n.legs=e.legs),e.replayed&&(n.replayed=!0),n}function Vc(e){return e>=1e6?`${(e/1e6).toFixed(1)}M`:e>=1e3?`${(e/1e3).toFixed(1)}k`:String(e)}function Vr(e){return pm(e)?`\u03C4 ${Vc(da(e))}`:null}function zn(e){let t=Vr(e);if(!t)return null;let n=e?.total_cost_usd;return typeof n=="number"&&Number.isFinite(n)?`${t} \xB7 $${n.toFixed(2)}`:t}function xo(e){if(!e||typeof e!="object")return"";let t=[`\uC785\uB825 ${Ut(e.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${Ut(e.output_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC77D\uAE30 ${Ut(e.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${Ut(e.cache_creation_input_tokens).toLocaleString("en-US")}`];typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&t.push(`$${e.total_cost_usd.toFixed(2)}`);let n=[`\uCD1D ${da(e).toLocaleString("en-US")}`,t.join(" \xB7 ")];return e.replayed&&n.push(ca),n.join(`
`)}function Hn(e,t){let n={claude:Mn(),codex:Mn()},r={orchestrator:{claude:Mn(),codex:Mn()},implementation:{claude:Mn(),codex:Mn()},"review-consult":{claude:Mn(),codex:Mn()},subagent:{claude:Mn(),codex:Mn()}},o=new Set;for(let l of Object.values(e||{})){if(!l||l.bead_id!==t)continue;let a=l.usage;if(Hc(a)){let d=hm(l.runner),f=Gc(a),g={provider:d,role:"orchestrator",attempt_id:String(l.attempt_id||""),usage:f,subtotal:Kc(d,f)};f.replayed===!0&&(g.replayed=!0),typeof l.model=="string"&&(g.model=l.model),typeof l.session_id=="string"&&(g.session_id=l.session_id),Ps(n[d],g,!0),Ps(r.orchestrator[d],g,!0)}let u=Array.isArray(l.usage_legs)?l.usage_legs:[];for(let d of u){let f=d&&d.provider==="claude"?"claude":"codex";if(!d||d.provider!=="codex"&&d.provider!=="claude"||!um[f].includes(d.role)||!Hc(d.usage))continue;let g=typeof d.receipt_id=="string"&&d.receipt_id.length>0?d.receipt_id:null;if(!g||o.has(g))continue;o.add(g);let m=Gc(d.usage),w={provider:f,role:d.role,attempt_id:String(l.attempt_id||""),usage:m,subtotal:Kc(f,m)};w.receipt_id=g,typeof d.agent_type=="string"&&(w.agent_type=d.agent_type),typeof d.agent_id=="string"&&(w.agent_id=d.agent_id),typeof d.model=="string"&&(w.model=d.model),typeof d.effort=="string"&&d.effort.trim().length>0&&(w.effort=d.effort),typeof d.session_id=="string"?w.session_id=d.session_id:typeof d.thread_id=="string"&&(w.session_id=d.thread_id),typeof d.turn_id=="string"&&(w.turn_id=d.turn_id),(typeof d.completed_at=="string"||typeof d.completed_at=="number"&&Number.isFinite(d.completed_at))&&(w.completed_at=d.completed_at),m.replayed===!0&&(w.replayed=!0),Ps(n[f],w,!1),Ps(r[w.role][f],w,!1)}}let s={};for(let l of["claude","codex"]){let a=n[l];if(a.legs.length===0)continue;let u=Yc(a,!1);l==="claude"&&a.outer_count>0&&a.outer_cost_count===a.outer_count&&(u.total_cost_usd=a.outer_cost),s[l]=u}if(Object.keys(s).length===0)return null;let i={};for(let l of["orchestrator","implementation","review-consult","subagent"]){let a={};for(let u of["claude","codex"]){let d=r[l][u];d.legs.length>0&&(a[u]={...Yc(d,!0),legs:d.legs})}Object.keys(a).length>0&&(i[l]=a)}return{providers:s,roles:i}}var bm=".chip-popover, .judgement-chip";function Xr(e){let t=null,n=!1;function r(d){return t!==null&&t.bead_id===d.bead_id&&t.chip_key===d.chip_key}function o(d){t=r(d)?null:{...d},e()}function s(){t!==null&&(t=null,e())}function i(d){let f=d.target;t!==null&&(f&&typeof f.closest=="function"&&f.closest(bm)||s())}function l(d){d.key==="Escape"&&s()}function a(){n||(n=!0,document.addEventListener("click",i),document.addEventListener("keydown",l))}function u(){n&&(n=!1,document.removeEventListener("click",i),document.removeEventListener("keydown",l))}return{toggle:o,close:s,isOpen:r,attach:a,detach:u}}function Qr(e){return c`<div
    class="chip-popover"
    role="dialog"
    aria-label=${e.title}
  >
    <div class="chip-popover__title">${e.title}</div>
    <ul class="chip-popover__lines">
      ${e.lines.map(t=>c`<li>${t}</li>`)}
    </ul>
  </div>`}var Xc={running:3,paused:2,failed:1};function Gn(e){if(!e||typeof e!="object")return!1;let t=e.kind;return t==null||t==="implementation"}function Qc(e){let t=Object.values(e||{}),n=new Map;for(let r of t){if(!r||typeof r.bead_id!="string"||r.bead_id.length===0||r.kind!=="review_session"||r.status!=="running")continue;let o=typeof r.started_at=="number"?r.started_at:null,s=n.get(r.bead_id);s&&(s.started_at??0)>(o??0)||n.set(r.bead_id,{attempt:r,origin:r.origin==="click"||r.origin==="auto"?r.origin:null,started_at:o})}return n}function Zc(e,t){let n=Object.values(e||{}),r=new Set,o=new Map;for(let i of n)!i||typeof i.bead_id!="string"||(typeof i.resumed_from=="string"&&i.resumed_from.length>0&&r.add(i.resumed_from),Gn(i)&&o.set(i.bead_id,i.attempt_id));let s=new Map;for(let i of n){if(!i||typeof i.bead_id!="string"||i.bead_id.length===0||!Gn(i))continue;let l=null;if(i.status==="running")l="running";else if(i.status==="paused"&&!r.has(i.attempt_id))l="paused";else if(i.status==="failed"||i.status==="orphaned"){let d=t.get(i.bead_id),f=typeof d=="number"&&d>0&&typeof i.finished_at=="number"&&d>=i.finished_at;o.get(i.bead_id)===i.attempt_id&&!f&&typeof i.dismissed_at!="number"&&(l="failed")}if(!l)continue;let a=typeof i.started_at=="number"?i.started_at:null,u=s.get(i.bead_id);if(u){let d=Xc[u.run_state],f=Xc[l];if(d>f||d===f&&(u.started_at??0)>(a??0))continue}s.set(i.bead_id,{attempt:i,run_state:l,started_at:a})}return{winners:s,resumed_from_ids:r}}var Ms=["workflow_mode","spec_review_model","spec_review_effort","spec_review_speed","plan_review_model","plan_review_effort","plan_review_speed","impl_review_model","impl_review_effort","impl_review_speed","impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"],_a=[...Ms.filter(e=>e!=="impl_dispatch"),"quick_fix_impl_model","bdui_url"];function Jc(e){let t;try{t=new URL(e)}catch{return!1}return(t.protocol==="http:"||t.protocol==="https:")&&e===t.origin}var Kn=["orchestration_model","orchestration_effort","orchestration_speed"],Zr=[...Ms,...Kn],ym=_a.filter(e=>Zr.includes(e)),eu=["delegated","main"],Ns=["inherit","claude","codex"],Jr=["default","fast"],Ao=["standard","fast_track"],So=["codex","opus","fable","self","skip"],qs=["codex","fable","skip"],js=["low","medium","high","xhigh"],tu=["default","fast"],bn="auto";function hn(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function nu(e){if(!hn(e)||!hn(e.runners))return[];let t=[];for(let[n,r]of Object.entries(e.runners))hn(r)&&hn(r.models)&&t.push([n,Object.keys(r.models)]);return t}function eo(e,t){let n=nu(e),r=t&&t!=="inherit"?n.filter(([o])=>o===t):n;return[bn,...r.flatMap(([,o])=>o)]}function ru(e,t,n,r){if(!hn(e)||!hn(e.runners))return[bn];let o=[];for(let[s,i]of Object.entries(e.runners))if(!(!hn(i)||!hn(i.models))&&!(t&&t!=="inherit"&&s!==t))for(let[l,a]of Object.entries(i.models)){if(n&&n!==bn&&l!==n)continue;let u=r(i,a);if(Array.isArray(u))for(let d of u)typeof d=="string"&&!o.includes(d)&&o.push(d)}return[bn,...o]}function to(e,t,n){return ru(e,t,n,(r,o)=>hn(o)&&Array.isArray(o.efforts)?o.efforts:r.efforts)}function ma(e,t,n){return ru(e,t,n,(r,o)=>hn(o)&&Array.isArray(o.orchestration_efforts)?o.orchestration_efforts:hn(o)&&Array.isArray(o.efforts)?o.efforts:r.efforts)}function Eo(e,t){let n=nu(e);return(t?n.filter(([o])=>o===t):n).flatMap(([,o])=>o)}function ou(e,t,n){let r={impl_runtime:e?.impl_runtime,impl_model:e?.impl_model,impl_effort:e?.impl_effort},o=r.impl_runtime==="claude"||r.impl_runtime==="codex"?r.impl_runtime:r.impl_runtime==="inherit"?n:null;return o&&(r.impl_model&&!eo(t,o).includes(r.impl_model)&&(r.impl_model=void 0),r.impl_effort&&!to(t,o,r.impl_model||bn).includes(r.impl_effort)&&(r.impl_effort=void 0)),r}var vm={workflow_mode:"\uC6CC\uD06C\uD50C\uB85C \uBAA8\uB4DC",spec_review_model:"\uC2A4\uD399 \uB9AC\uBDF0\uC5B4",spec_review_effort:"\uC2A4\uD399 \uB9AC\uBDF0 effort",spec_review_speed:"\uC2A4\uD399 \uB9AC\uBDF0 \uC18D\uB3C4",plan_review_model:"\uACC4\uD68D \uB9AC\uBDF0\uC5B4",plan_review_effort:"\uACC4\uD68D \uB9AC\uBDF0 effort",plan_review_speed:"\uACC4\uD68D \uB9AC\uBDF0 \uC18D\uB3C4",impl_review_model:"\uAD6C\uD604 \uB9AC\uBDF0\uC5B4",impl_review_effort:"\uAD6C\uD604 \uB9AC\uBDF0 effort",impl_review_speed:"\uAD6C\uD604 \uB9AC\uBDF0 \uC18D\uB3C4",impl_runtime:"\uC704\uC784 \uB300\uC0C1",impl_model:"\uAD6C\uD604 \uBAA8\uB378",impl_effort:"\uAD6C\uD604 effort",impl_speed:"\uAD6C\uD604 \uC18D\uB3C4",orchestration_model:"\uC6CC\uCEE4 \uBAA8\uB378",orchestration_effort:"\uC6CC\uCEE4 effort",orchestration_speed:"\uC6CC\uCEE4 \uC18D\uB3C4"},fa=[...ym,...Kn],wm=[...Zr,..._a].filter((e,t,n)=>n.indexOf(e)===t&&!fa.includes(e));function su(e,t){let n=hn(e)?e:{},r=hn(t)?t:{},o=[];for(let i of fa){let l=n[i]??null,a=r[i]??null;l!==a&&o.push({key:i,label:vm[i]||i,before:l,after:a,kind:l===null?"added":a===null?"removed":"changed"})}let s=[];for(let i of[...wm,...Object.keys(r)])!fa.includes(i)&&!s.includes(i)&&Object.hasOwn(r,i)&&s.push(i);return{rows:o,ignored_keys:s}}function ga(e,t,n,r,o,s){return Ls({key:e,choices:t,layer:"global",global:n,resolution_global:s,execution_defaults:r,runner_catalog:o})}function iu(e,t){let n={};for(let r of _a){let o=e?.[r],s=t?.[r];o!==s&&(n[r]=typeof s=="string"&&s.length>0?s:null)}return n}function au(e,t){let n={};for(let r of Kn){let o=e?.[r]??null,s=t?.[r]??null;o!==s&&(n[r]=typeof s=="string"&&s.length>0?s:null)}return n}var ha=[{id:"workflow",label:"\uC6CC\uD06C\uD50C\uB85C\uC6B0",keys:["workflow_mode"]},{id:"review",label:"\uB9AC\uBDF0",keys:["spec_review_model","spec_review_effort","spec_review_speed","plan_review_model","plan_review_effort","plan_review_speed","impl_review_model","impl_review_effort","impl_review_speed"]},{id:"implementation",label:"\uAD6C\uD604",keys:["impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"]},{id:"worker",label:"Worker",keys:[...Kn]}],or={workflow_mode:"\uBAA8\uB4DC",spec_review_model:"\uC0AC\uC591 \uB9AC\uBDF0",spec_review_effort:"\uC0AC\uC591 \uB9AC\uBDF0 effort",spec_review_speed:"\uC0AC\uC591 \uB9AC\uBDF0 \uC18D\uB3C4",plan_review_model:"\uACC4\uD68D \uB9AC\uBDF0",plan_review_effort:"\uACC4\uD68D \uB9AC\uBDF0 effort",plan_review_speed:"\uACC4\uD68D \uB9AC\uBDF0 \uC18D\uB3C4",impl_review_model:"\uAD6C\uD604 \uB9AC\uBDF0",impl_review_effort:"\uAD6C\uD604 \uB9AC\uBDF0 effort",impl_review_speed:"\uAD6C\uD604 \uB9AC\uBDF0 \uC18D\uB3C4",impl_dispatch:"\uC2E4\uD589 \uBC29\uC2DD",impl_runtime:"\uC704\uC784 \uB300\uC0C1",impl_model:"\uBAA8\uB378",impl_effort:"effort",impl_speed:"\uC18D\uB3C4",orchestration_model:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uBAA8\uB378",orchestration_effort:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 effort",orchestration_speed:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uC18D\uB3C4"},Fs={pin:"\uD540",global:"\uC804\uC5ED",base:"\uAE30\uBCF8"};function ba(e,t,n,r,o,s=null){let i=gn({pin:t,global:n,execution_defaults:r,runner_catalog:o,route:t&&typeof t.route=="string"?t.route:null,controller_runtime:s});return e.map(l=>({key:l,...i[l]}))}function lu(e,t,n,r,o,s=null){let i={pin:0,global:0,base:0};for(let l of ba(e,t,n,r,o,s))i[l.source]+=1;return i}function cu(e,t,n){return{id:e,key:t,value:typeof n=="string"?n:""}}function uu(e,t,n){return typeof t!="string"||t.length===0?null:{id:e,preset_id:t,expected_revision:n}}var Xk=[...Ms,...Kn];var du=["orchestration_model","orchestration_effort","orchestration_speed","spec_review_model","spec_review_effort","spec_review_speed","plan_review_model","plan_review_effort","plan_review_speed","impl_review_model","impl_review_effort","impl_review_speed","impl_runtime","impl_model","impl_effort"];function To(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function Bs(e){if(!To(e)||!To(e.runners))return null;let t=Object.entries(e.runners).filter(([,n])=>To(n)&&To(n.models));return t.length>0?t:null}function An(e,t){let n=Bs(e);if(!n||!t)return null;for(let[r,o]of n)if(Object.hasOwn(o.models,t))return r;return null}function pu(e,t){return To(t)&&Array.isArray(t.efforts)?t.efforts.slice():Array.isArray(e.efforts)?e.efforts.slice():[]}function fu(e,t){let n=Bs(e);if(!n||!t)return[];for(let[,r]of n)if(Object.hasOwn(r.models,t))return pu(r,r.models[t]);return[]}function km(e){let t=Bs(e);if(!t)return[];let n=[];for(let[,r]of t)for(let o of Object.values(r.models))for(let s of pu(r,o))n.includes(s)||n.push(s);return n}function $m(e,t){if(!t)return km(e);let r=Bs(e)?.find(([s])=>s===t)?.[1];if(!r)return[];let o=[];for(let s of Object.keys(r.models))for(let i of fu(e,s))o.includes(i)||o.push(i);return o}function _u(e,t,n){let r={impl_runtime:e.impl_runtime||"",impl_model:e.impl_model||"",impl_effort:e.impl_effort||""},o=r.impl_runtime==="inherit"?n:r.impl_runtime==="claude"||r.impl_runtime==="codex"?r.impl_runtime:null;if(r.impl_runtime==="inherit"&&!o)return r.impl_model="",r.impl_effort="",r;let s=An(t,r.impl_model);if(r.impl_model&&(!o||s!==o))return r.impl_model="",r.impl_effort="",r;let i=r.impl_model?fu(t,r.impl_model):$m(t,o);return r.impl_effort&&i.length>0&&!i.includes(r.impl_effort)&&(r.impl_effort=""),r}var ya=new Set(["unavailable","not_applicable"]);function sr(e,t){if(typeof e!="object"||e===null)return null;let n=e[t];return typeof n=="object"&&n!==null?n:null}function mu(e){return e.filter(t=>t!==null).join(" \xB7 ")}function ir(e,t){return t===null?null:`${or[e]}: ${t.display} (${Fs[t.source]})`}function va(e){return e.filter(t=>t!==null).join(`
`)}function wa(e){if(typeof e!="object"||e===null)return null;let t=$r(e);if(t==="")return null;let n=(r,o)=>typeof o=="string"&&o.length>0?`${r}: ${o}`:null;return{text:t,title:va(["\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \u2014 \uC774 attempt\uC5D0 \uAE30\uB85D\uB41C \uC2E4\uD589\uAC12",n("runner",e.runner),n(or.orchestration_model,e.model),n(or.orchestration_effort,e.effort),n(or.orchestration_speed,e.speed)])}}function no(e,t){let n=sr(e,"orchestration_model");if(n===null||n.resolution==="unavailable")return null;let r=sr(e,"orchestration_effort"),o=sr(e,"orchestration_speed"),s=mu([An(t,n.value??""),n.display,r!==null&&r.value!==null?r.display:null,o!==null&&o.value==="fast"?"Fast":null]);return s===""?null:{text:s,title:va(["\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \u2014 \uD604\uC7AC \uD574\uC11D\uAC12 (\uD540 > \uD050 \uAE30\uBCF8\uAC12)",ir("orchestration_model",n),ir("orchestration_effort",r),ir("orchestration_speed",o)])}}function xm(e,t){return e===null||e.value===null||ya.has(e.resolution)?null:e.value!=="inherit"?e.value:t?`inherit\u2192${t}`:"inherit"}function Am(e){return e===null||ya.has(e.resolution)?null:e.value==="auto"?"auto":e.display}function Sm(e){return e===null?null:e.value==="auto"?"auto":ya.has(e.resolution)?null:e.display}function Ar(e,t){if(typeof e!="object"||e===null)return null;let n=sr(e,"impl_dispatch"),r=sr(e,"impl_runtime"),o=sr(e,"impl_model"),s=sr(e,"impl_effort"),i=sr(e,"impl_speed"),l=n!==null&&n.value==="main"?"\uBA54\uC778":mu([xm(r,t??null),Am(o),Sm(s),i!==null&&i.value==="fast"?"Fast":null]);return l===""?null:{text:l,title:va(["\uC6CC\uCEE4(\uAD6C\uD604 \uC704\uC784) \u2014 \uD604\uC7AC \uD574\uC11D\uAC12 (\uD540 > \uC804\uC5ED kv > \uAE30\uBCF8). \uC2E4\uD589 \uC911\uC774\uBA74 \uC138\uC158\uC774 \uC2DC\uC791 \uC2DC \uACE0\uC815\uD55C \uAC12\uACFC \uB2E4\uB97C \uC218 \uC788\uC74C",ir("impl_dispatch",n),ir("impl_runtime",r),ir("impl_model",o),ir("impl_effort",s),ir("impl_speed",i)])}}var Em=Object.freeze(new Set(["push_not_contained","invalid_impl_review","premature_close","head_mismatch","foreign_deploy_unsupported","not_resolved"])),Tm=Object.freeze(["delivery_unproven:"]);function Us(e){let t=e&&typeof e.reason=="string"?e.reason:"";if(t.length===0||Em.has(t))return"session";for(let n of Tm)if(t.startsWith(n))return"session";return"settlement"}var Cm=["hard_diagnosis","invariant_reasoning","verification_by_judgment","claude_bound"];var Rm={hard_diagnosis:"\uC6D0\uC778\uC774 \uBD88\uBA85\uD655\uD558\uAC70\uB098 \uC7AC\uD604\uC774 \uBD88\uC548\uC815\uD574 \uAC00\uC124-\uAC80\uC99D \uB8E8\uD504\uAC00 \uD544\uC694\uD558\uB2E4",invariant_reasoning:"\uC815\uD569\uC131\uC774 \uC0C1\uD0DC\uAE30\uACC4\xB7\uB3D9\uC2DC\uC131\xB7\uBD88\uBCC0\uC2DD \uCD94\uB860\uC5D0 \uB2EC\uB824 \uC788\uB2E4",verification_by_judgment:"\uD14C\uC2A4\uD2B8\uAC00 \uBABB \uC7A1\uACE0 \uB9AC\uBDF0\uC5B4\uC758 \uCD94\uB860\uC73C\uB85C\uB9CC \uAC80\uC99D\uD560 \uC218 \uC788\uB2E4",claude_bound:"Claude \uC138\uC158 \uC790\uC0B0\xB7\uC758\uBBF8\uB860\uC5D0 \uAC15\uD558\uAC8C \uBB36\uC5EC \uC788\uB2E4"};function ka(e){return(e&&Array.isArray(e.reasons)?e.reasons:[]).map(n=>Rm[n]||"").filter(n=>n.length>0)}var gu={orchestration_model:["fable"],impl_runtime:["claude"]},$a={unapplied:"\uBBF8\uC801\uC6A9",applied:"\uC801\uC6A9\uB428",diverged:"\uCD94\uCC9C\uACFC \uB2E4\uB984"};function hu(e){return typeof e=="object"&&e!==null?e:null}function bu(e,t){return typeof e=="string"&&t.includes(e)?e:""}function Om(e){return typeof e!="string"?[]:e.split("+").map(t=>t.trim()).filter(t=>Cm.includes(t))}function Co(e,t=e){let n=hu(e);if(!n)return null;let r=bu(n.rec_orchestration_model,gu.orchestration_model);if(r.length===0)return null;let o=bu(n.rec_impl_runtime,gu.impl_runtime),s={orchestration_model:r};o.length>0&&(s.impl_runtime=o);let i=hu(t)||{},l=Object.keys(s),a=0,u=0;for(let f of l){let g=i[f];typeof g=="string"&&g.length>0&&(a+=1,g===s[f]&&(u+=1))}let d=a===0?"unapplied":u===l.length?"applied":"diverged";return{reasons:Om(n.rec_reason),rec:s,state:d}}function Ws(e){if(!e||typeof e!="object")return"";let t=ka(e),n=$a[e.state]||"",r=["\uBCF5\uC7A1\uD55C \uC791\uC5C5\uC73C\uB85C \uD310\uC815\uB428"];return t.length>0&&r.push(`\uC0AC\uC720: ${t.join(" \xB7 ")}`),n.length>0&&r.push(`\uC0C1\uD0DC: ${n}`),r.join(`
`)}function zs(e){return e.replace(/\/+$/,"")}function Im(e,t){let n=zs(e),r=zs(t);return n===r||r.startsWith(`${n}/`)||n.startsWith(`${r}/`)}function Hs(e,t){let n=new Set;for(let r of e)for(let o of t){if(!Im(r,o))continue;let s=zs(r),i=zs(o);n.add(s.length>=i.length?s:i)}return[...n].sort()}function xa(e,t){return`${e}\0${t}`}function yu(e){let t=new Map;for(let n of Array.isArray(e?.running)?e.running:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"running",state:"running"});for(let n of Array.isArray(e?.pr_wait)?e.pr_wait:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"pr_wait",state:"pr_wait"});for(let n of Array.isArray(e?.queue_groups)?e.queue_groups:[]){let r=Array.isArray(n.sublanes?.parallel)?n.sublanes.parallel:Array.isArray(n.items)?n.items:[];for(let o of r)t.set(o.id,{root_dir:o.root_dir,workspace_name:o.workspace_name,lane:"parallel",position:o.queue_position});for(let o of Array.isArray(n.sublanes?.serial)?n.sublanes.serial:[])for(let s of o.items)t.set(s.id,{root_dir:s.root_dir,workspace_name:s.workspace_name,lane:o.id,position:s.queue_position})}for(let n of Array.isArray(e?.runnable)?e.runnable:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"runnable",state:"runnable"});for(let n of Array.isArray(e?.done)?e.done:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"done",state:"done"});return t}function Aa(e,t){let n=Array.isArray(t)?t:[],r=e.indexOf("-"),o=r>0?e.slice(0,r):e;return n.some(s=>typeof s?.issue_prefix=="string"&&s.issue_prefix===o)?"internal":n.length>0&&n.every(s=>typeof s?.issue_prefix=="string")?"external":"unknown"}function Ro(e){if(e.state==="running")return"\uC2E4\uD589\uC911";if(e.state==="pr_wait")return"PR \uB300\uAE30";if(e.state==="runnable")return"\uC2E4\uD589\uAC00\uB2A5";if(e.state==="done")return"\uC644\uB8CC";let t=e.lane==="parallel"?"\uBCD1\uB82C":e.lane;return`${e.workspace_name} \xB7 ${t} #${e.position}`}function vu(e,t,n,r){let o=n.get(e);if(!!(o&&t&&o.root_dir===t.root_dir&&o.lane===t.lane&&typeof o.position=="number"&&typeof t.position=="number"&&o.position<t.position))return{id:e,label:`\u{1F512} ${e} (\uAC19\uC740 \uB808\uC778 \uC55E)`,location_label:"\uAC19\uC740 \uB808\uC778 \uC55E",scope:null,same_lane_ahead:!0};if(o)return{id:e,label:`\u{1F512} ${e} (${Ro(o)})`,location_label:Ro(o),scope:null,same_lane_ahead:!1};let i=Aa(e,r),l=i==="internal"?"\uBBF8\uC801\uC7AC":i==="external"?"\uC678\uBD80":"\uC704\uCE58 \uBBF8\uD655\uC778";return{id:e,label:`\u{1F512} ${e} (${l})`,location_label:l,scope:i,same_lane_ahead:!1}}function wu(e){let t=Array.isArray(e)?e:[],n=new Map,r=new Map,o=new Map;for(let l of t)for(let a of Array.isArray(l.sublanes?.serial)?l.sublanes.serial:[]){let u=xa(l.root_dir,a.id);n.set(u,{root_dir:l.root_dir,workspace_name:l.name,lane:a.id}),o.set(u,[]);for(let d of Array.isArray(a.items)?a.items:[])r.set(d.id,u)}for(let l of t)for(let a of Array.isArray(l.sublanes?.serial)?l.sublanes.serial:[]){let u=xa(l.root_dir,a.id),d=Array.isArray(a.items)?a.items[0]:null,g=!!d&&d.queue_index===0&&(!Array.isArray(a.occupied_by)||a.occupied_by.length===0)&&Array.isArray(d.blocked_by)?d.blocked_by:[],m=o.get(u);if(m)for(let w of g){let C=r.get(w);C&&C!==u&&!m.includes(C)&&m.push(C)}}let s=(l,a)=>{let u=new Set,d=[l];for(;d.length>0;){let f=d.pop();if(f===a)return!0;!f||u.has(f)||(u.add(f),d.push(...o.get(f)||[]))}return!1},i=new Map;for(let[l,a]of o){let u=[];for(let d of a){let f=n.get(d);s(d,l)&&f&&u.push(f)}u.length>0&&i.set(l,u)}return i}function ku(e,t){return xa(e,t)}async function Lm(e){let t=await sn(e);we(t?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",t?"success":"error",1200)}function ro(e){return typeof e!="string"||e.length===0?"":c`<span class="worker-ev__copyline"
    ><code class="worker-ev__path">${e}</code
    ><button
      type="button"
      class="worker-ev__copy"
      data-seam="log-path-copy"
      title="로그 경로 복사"
      aria-label=${`\uB85C\uADF8 \uACBD\uB85C \uBCF5\uC0AC: ${e}`}
      @click=${()=>{Lm(e)}}
    >
      ⧉
    </button></span
  >`}function Ks(e){return typeof e=="string"&&e.length>=7?e.slice(0,7):"\u2014"}function Au(e){return e==="session"?"bead\uAC00 in_progress\uB85C \uC7A1\uD78C \uB4A4 \uB2EB\uD788\uAE30\uAE4C\uC9C0\uC758 \uACBD\uACFC":"attempt \uC2E4\uD589 \uC2DC\uAC04 \uD569\uC0B0 (\uC7AC\uAC1C \uC138\uC158 \uD3EC\uD568)"}function Er(e){if(typeof e!="number"||!Number.isFinite(e)||e<0)return"\u2014";if(e<1e3)return`${Math.round(e)}ms`;let t=e/1e3;if(t<60)return`${t.toFixed(1)}\uCD08`;let n=Math.floor(t/60);if(n<60)return`${n}\uBD84 ${Math.round(t-n*60)}\uCD08`;let r=Math.floor(n/60),o=n%60;return`${r}\uC2DC\uAC04 ${o}\uBD84`}function Su(e,t){if(typeof e!="object"||e===null)return[];let n=!1,r=!1;for(let o of Object.values(e)){if(typeof o!="object"||o===null)continue;let s=o;s.bead_id!==t||s.kind!=="review_session"||(n=!0,r=r||s.origin==="auto")}return n?[r?"\uB9AC\uBDF0 \xB7 \uC790\uB3D9":"\uB9AC\uBDF0"]:[]}function $u(e){return e==="auto"||e==="click"?e:null}function Eu(e,t){if(typeof e!="object"||e===null)return{active:!1,failure:null,origin:null};let n=!1,r=null,o=-1,s=null,i=null,l=-1;for(let a of Object.values(e)){if(typeof a!="object"||a===null)continue;let u=a;if(u.bead_id!==t||u.kind!=="review_session")continue;if(u.status==="pending"||u.status==="running"){n=!0;let f=typeof u.started_at=="number"?u.started_at:0;f>=o&&(o=f,r=$u(u.origin));continue}if(u.status!=="failed")continue;let d=typeof u.finished_at=="number"?u.finished_at:0;d>=l&&(l=d,s=typeof u.cause=="string"&&u.cause.length>0?u.cause:null,i=$u(u.origin))}return n?{active:!0,failure:null,origin:r}:{active:!1,failure:s,origin:i}}function Tu(e,t){if(typeof e!="object"||e===null)return null;let n=0,r=!1;for(let o of Object.values(e)){if(typeof o!="object"||o===null)continue;let s=o;if(s.bead_id!==t)continue;let i=s.started_at,l=s.finished_at;typeof i!="number"||typeof l!="number"||!Number.isFinite(i)||!Number.isFinite(l)||l<i||(n+=l-i,r=!0)}return r?n:null}function Ys(e){if(typeof e!="number"||!Number.isFinite(e)||e<=0)return"";let t=new Date(e);return`${String(t.getHours()).padStart(2,"0")}:${String(t.getMinutes()).padStart(2,"0")}`}function Pm(e,t){let n=Array.isArray(e)?e:[],r=Array.isArray(t)?t:[];if(n.length===0&&r.length===0)return null;let o=null;for(let i of n)i.kind!=="deploy"||i.state!=="succeeded"||typeof i.target_sha!="string"||(!o||(typeof i.finished_at=="number"?i.finished_at:0)>(typeof o.finished_at=="number"?o.finished_at:0))&&(o=i);let s=n.filter(i=>i.state==="failed"&&!i.dismissed&&!i.superseded_by).length+r.length;return{deploy:o?{sha:Ks(o.target_sha),at:typeof o.finished_at=="number"?o.finished_at:null,elapsed_ms:typeof o.elapsed_ms=="number"?o.elapsed_ms:null}:null,unresolved:s,badge:s>0?{tone:"act",label:`\uD574\uACB0 \uD544\uC694 ${s}`}:{tone:"quiet",label:"\uBAA8\uB450 \uC815\uC0C1"}}}function Cu(e,t){let n=Pm(e,t);return n?c`<button
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
            title=${n.deploy.at?Vt(n.deploy.at):""}
            >${Ys(n.deploy.at)}${n.deploy.elapsed_ms!==null?` \xB7 ${Er(n.deploy.elapsed_ms)}`:""}</span
          >
        </span>`:""}
    <span class="worker-repo-strip__spacer"></span>
    <span
      class="worker-repo-strip__badge worker-repo-strip__badge--${n.badge.tone}"
      >${n.badge.label}</span
    >
  </button>`:""}function oo(e){let t=on(e.created_at),n=on(e.updated_at);return!t&&!n?"":c`<div class="worker-mini__meta">
    ${t?c`<span title=${`\uC0DD\uC131 ${Vt(e.created_at)}`}
          >생성 ${t}</span
        >`:""}${t&&n?c`<span>·</span>`:""}${n?c`<span title=${`\uC218\uC815 ${Vt(e.updated_at)}`}
          >수정 ${n}</span
        >`:""}
  </div>`}function Dm(e){return!e||e==="requested"?"\uBC31\uC5C5 \uC911":e==="backup_verified"||e==="signaled"?"runner \uC885\uB8CC \uC911":e==="merged_revert"||e.startsWith("revert_")?"revert PR \uB300\uAE30":e.startsWith("rollback_")?"\uC6D0\uBCF5 \uBC30\uD3EC \uC911":e==="runner_terminated"||e.startsWith("pr_")||e.includes("ref_")||e.includes("worktree")||e.startsWith("bead_")?"PR \uC815\uB9AC \uC911":`\uD3D0\uAE30 \uCC98\uB9AC \uC911 (${e})`}function Io(e,t){return t==="merged"?`${e}: \uC774\uBBF8 merge\uB41C \uAD6C\uD604\uC785\uB2C8\uB2E4. \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 revert PR\uC744 \uC0DD\uC131\uD558\uBA70, \uC2E4\uC81C \uC6D0\uBCF5\uC740 \uC0AC\uB78C\uC774 \uADF8 PR\uC744 merge\uD55C \uB4A4 \uC644\uB8CC\uB429\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`:`${e}: \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 runner/PR/branch/worktree\uB97C \uC815\uB9AC\uD558\uACE0 \uC774\uC288\uB97C \uD6C4\uBCF4\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`}function Vs(e){let t=["\uD3D0\uAE30 \uC644\uB8CC"];return e.operation_id&&t.push(`\uC791\uC5C5 ${e.operation_id}`),e.receipt?.archive_path&&t.push(`\uBC31\uC5C5 ${e.receipt.archive_path}`),e.receipt?.original_pr?.url&&t.push(`\uC6D0\uBCF8 PR ${e.receipt.original_pr.url}`),e.receipt?.revert_pr?.url&&t.push(`revert PR ${e.receipt.revert_pr.url}`),t.join(" \xB7 ")}function Yn(e,t,n={}){let o=Object.values(e&&typeof e=="object"?e:{}).filter(f=>f&&f.bead_id===t&&f.phase!=="done").sort((f,g)=>(f.requested_at||0)-(g.requested_at||0)).at(-1),s=typeof n.attempt_id=="string"&&n.attempt_id.length>0?n.attempt_id:typeof o?.attempt_id=="string"?o.attempt_id:null,i=n.external?"\uC678\uBD80 PR\uC740 Worker\uAC00 \uC18C\uC720\uD558\uC9C0 \uC54A\uC544 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":n.done?"\uC644\uB8CC\uB41C \uC791\uC5C5\uC740 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":n.merge_active?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":n.merge_queued?"\uBA38\uC9C0 \uD050\uC5D0 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 [\uCDE8\uC18C]\uD558\uC138\uC694":n.conflict_active?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 \uC138\uC158\uC744 \uC815\uB9AC\uD558\uC138\uC694":n.cleanup_active?"\uC815\uB9AC \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":null,l=typeof o?.last_error=="string"?o.last_error:null,a=o?Dm(o.phase):null,u=o?.kind==="stale_work_backup_fresh",d=n.merged||o?.mode==="merged_revert"?"merged":"unmerged";return{action:!n.external&&!n.done,enabled:!i&&(!o||!!l),label:u?l?"\uBC31\uC5C5 \uC815\uB9AC \uC7AC\uC2DC\uB3C4":"\uBC31\uC5C5 \uD6C4 \uC0C8\uB85C \uC2DC\uC791":l?"\uC7AC\uC2DC\uB3C4":"\uD3D0\uAE30",title:i||(l?u?`\uBC31\uC5C5 \uB4A4 \uC815\uB9AC \uC2E4\uD328: ${l} \u2014 \uC6D0\uBCF8\uACFC \uAC80\uC99D \uC601\uC218\uC99D\uC744 \uBCF4\uC874\uD55C \uCC44 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:`\uD3D0\uAE30 \uC2E4\uD328: ${l} \u2014 \uAC19\uC740 \uC791\uC5C5\uC744 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:o?`${a||"\uD3D0\uAE30 \uCC98\uB9AC \uC911"} \u2014 \uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694`:d==="merged"?"\uBCD1\uD569\uB41C \uBCC0\uACBD\uC744 \uC6D0\uBCF5 PR\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4":"\uBC31\uC5C5 \uD6C4 runner\xB7PR\xB7\uC6CC\uD06C\uD2B8\uB9AC\xB7\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4"),attempt_id:s,operation:o||null,progress:a,error:l,confirmation:d}}function Ru(e){if(!e||e.quickfix_lane!==!0)return!1;let t=e.quickfix_landing;return!t||typeof t!="object"?!1:["repo_operations","branch_cleanup","parent_close"].includes(t.cursor)}function Gs(e){let t=e.discard;if(!t||!t.operation)return"";let n=t.operation,r=n.kind==="stale_work_backup_fresh"&&!t.error?null:n.backup?.path,o=n.original_pr,s=n.revert_pr;return c`<div
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
  </div>`}var Mm={dirty_unique:"\uCD5C\uC2E0 base\uC5D0 \uC5C6\uB294 \uB85C\uCEEC \uBCC0\uACBD\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",untracked_present:"\uCD94\uC801\uB418\uC9C0 \uC54A\uC740 \uD30C\uC77C\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",branch_ahead:"\uB85C\uCEEC branch\uC5D0 \uACE0\uC720 commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",head_ahead:"worktree HEAD\uC5D0 \uACE0\uC720 commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",ahead_not_contained:"\uB85C\uCEEC branch\uC758 \uACE0\uC720 commit\uC774 \uCD5C\uC2E0 base\uC5D0 \uD3EC\uD568\uB410\uC74C\uC744 \uC99D\uBA85\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",ahead_merge_commit:"\uB85C\uCEEC branch\uC5D0 \uC790\uB3D9 \uC815\uB9AC\uD560 \uC218 \uC5C6\uB294 merge commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",ahead_submodule_path:"\uB85C\uCEEC branch\uC758 \uACE0\uC720 commit\uC774 submodule \uACBD\uB85C\uB97C \uBCC0\uACBD\uD569\uB2C8\uB2E4",archive_failed:"\uACE0\uC720 commit \uBC31\uC5C5\uC744 \uC548\uC804\uD558\uAC8C \uAC80\uC99D\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",ref_delete_failed:"\uD655\uC778\uB41C local branch\uB97C \uC548\uC804\uD558\uAC8C \uC0AD\uC81C\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",resume_available:"\uC774\uC5B4\uAC08 \uC218 \uC788\uB294 \uC774\uC804 Worker session\uC774 \uC788\uC2B5\uB2C8\uB2E4",observe_failed:"Git \uC0C1\uD0DC\uB97C \uC548\uC804\uD558\uAC8C \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",identity_changed:"\uD655\uC778 \uC911 worktree \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4",ownership_unknown:"Worker \uC18C\uC720 worktree\uC778\uC9C0 \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"};function Ou(e,t=!1){if(!e||typeof e!="object")return null;let n=e;if(n.reason!=="worktree_stale_work"||!n.stale_work||typeof n.stale_work!="object")return null;let r=n.stale_work,o=r.residue==="branch"?"branch":"worktree",s=r.state==="unique"?"unique":"unknown",i=r.summary&&typeof r.summary=="object"?r.summary:{};function l(u){return Number.isInteger(i[u])?Number(i[u]):0}let a=typeof r.cause=="string"?r.cause:"observe_failed";return{residue:o,state:s,title:o==="branch"?"\uC774\uC804 \uBE0C\uB79C\uCE58 \uBCF4\uC874\uB428":s==="unique"?"\uC774\uC804 \uC791\uC5C5 \uBCF4\uC874\uB428":"\uC774\uC804 \uC791\uC5C5 \uC0C1\uD0DC \uD655\uC778 \uC2E4\uD328",cause:Mm[a]||"\uC548\uC804\uD558\uAC8C \uC790\uB3D9 \uC815\uB9AC\uD560 \uC218 \uC5C6\uB294 \uC774\uC804 \uC791\uC5C5\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",summary:o==="branch"?`\uACE0\uC720 commit ${l("branch_ahead")}`:[`staged ${l("staged_count")}`,`unstaged ${l("unstaged_count")}`,`untracked ${l("untracked_count")}`,`branch ahead ${l("branch_ahead")}`,`HEAD ahead ${l("head_ahead")}`].join(" \xB7 "),action_id:typeof r.action_id=="string"?r.action_id:"",can_resume:r.can_resume===!0,can_continue:r.can_continue===!0,can_backup_fresh:r.can_backup_fresh===!0,can_recheck:r.can_recheck===!0,locked:t}}function Xs(e,t={}){if(!e||!e.orchestration&&!e.worker)return"";let n=t.pin===!0?" exec-chip--pin":"",r=t.pin===!0?`
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
      >`:""}`}function Oo(e,t){let n=`worker-dep worker-dep--${t}${e.foreign?" worker-dep--foreign":""}`;return e.openable===!0?c`<button
        type="button"
        class=${`${n} worker-dep__open`}
        data-dep-id=${e.id}
        data-root-dir=${e.root_dir||""}
        title=${e.title||""}
      >
        ${e.label}
      </button>`:c`<span class=${n} title=${e.title||""}>${e.label}</span>`}function Nm(e){return{id:e.id,label:`\u29C9 ${e.id}`,title:[`\uACB9\uCE68 \xB7 ${e.location_label}`,...e.prefixes].join(`
`),openable:!0,...e.root_dir?{root_dir:e.root_dir}:{}}}function Sa(e){return Array.isArray(e)?e.slice().sort((t,n)=>t.id<n.id?-1:t.id>n.id?1:0):[]}function qm(e,t=!1){return e?c`<button
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
            >`:""}${n.map(d=>Oo(d,"pred"))}${t}${o.map(d=>Oo(d,"dependents"))}
      </div>`:""}${u?c`<div class="worker-deps worker-deps--secondary">
        ${r.map(d=>Oo(d,"released"))}${s.map(d=>Oo(Nm(d),"overlap"))}${i?c`<span
              class="worker-dep worker-dep--muted"
              title="겹침 판정 불가 — 아티팩트가 있으면 스펙/플랜 front-matter, 없으면 description \`## scope\`에 선언 필요"
              >scope 없음</span
            >`:""}
      </div>`:""}`}function Iu(e,t=""){let n=(Array.isArray(e)?e:[]).filter(r=>typeof r=="string"&&r!=="").slice().sort();return n.length===0?"":c`<div class="worker-deps worker-deps--secondary">
    ${n.map(r=>Oo({id:r,label:`\uC774\uC6D4 \u2192 ${r}`,title:`\uC774\uC6D4\uB41C \uD6C4\uC18D ${r} \uC5F4\uAE30`,openable:!0,...t?{root_dir:t}:{}},"dependents"))}
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
  >`:""}function jm(e,t=!1){let n=e?e.quick_fix_review:null;if(!n)return"";let r=n.state;if(r!=="reviewed"&&r!=="stale")return"";let o=Array.isArray(n.missing)?n.missing:[],s=[r==="reviewed"?"quick_fix self-review \uC601\uC218\uC99D\uC774 \uC9C0\uAE08 \uBCF8\uBB38\uACFC \uC77C\uCE58\uD569\uB2C8\uB2E4":"quick_fix self-review \uC601\uC218\uC99D\uC774 \uC9C0\uAE08 \uBCF8\uBB38\uACFC \uB2E4\uB985\uB2C8\uB2E4",...o].join(`
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
  </button>`:""}var Fm={absent:"\uC2E4\uD589 \uC601\uC218\uC99D\uC774 \uAE30\uB85D\uB418\uC9C0 \uC54A\uC558\uB2E4 \u2014 \uACFC\uAC70 Bead\xB7\uC678\uBD80 \uACBD\uB85C PR\uC740 \uC6D0\uB798 \uC5C6\uB2E4",unparsable:"\uC601\uC218\uC99D \uAC12\uC744 \uC77D\uC744 \uC218 \uC5C6\uB2E4 \u2014 40hex SHA\uB098 `delegated:`/`main:` \uD615\uC2DD\uC774 \uC544\uB2C8\uB2E4",effort_unknown:"effort \uD1A0\uD070\uC774 harness \uC5B4\uD718 \uBC16\uC774\uB2E4 \u2014 \uBAA8\uB378\xB7SHA\xB7unit\uC740 \uC720\uD6A8\uD558\uB2E4",main_reason_retired:"`main:` \uC0AC\uC720\uAC00 \uACE0\uC815 4\uD1A0\uD070(bead\xB7quick_fix_default\xB7phase_line\xB7takeover) \uBC16\uC774\uB2E4",main_receipt_unbacked:"`main:` \uC0AC\uC720\uB97C \uB4B7\uBC1B\uCE68\uD558\uB294 \uBA54\uD0C0\uB370\uC774\uD130(impl_dispatch\xB7route\xB7planned_execution\xB7quick_fix \uAE30\uBCF8 dispatch)\uAC00 \uC5C6\uB2E4",takeover_lineage_missing:"`main:takeover`\uC778\uB370 resolved \uBAA8\uB378\uACFC \uC77C\uCE58\uD558\uB294 \uC644\uB8CC\uB41C \uC704\uC784 \uC138\uC158\uC774 \uC5C6\uB2E4",takeover_lineage_unobservable:"`main:takeover`\uC778\uB370 \uC704\uC784 \uACC4\uBCF4\uB97C \uBAA8\uB2C8\uD130\uAC00 \uBCFC \uC218 \uC5C6\uB2E4(Codex \uBC16 \uB7F0\uD0C0\uC784)"};function Bm(e,t=!1){let n=Pu(e);if(n.length===0)return"";let r=n.length>1?`\uC601\uC218\uC99D \xB7 ${n[0]} +${n.length-1}`:`\uC601\uC218\uC99D \xB7 ${n[0]}`;return c`<button
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
  >`}function Um(e){let t=Array.isArray(e.badges)?e.badges:[],n=nn(e.usage),r=zn(e.usage),o=on(e.done_at);return c`<div
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
            title=${`\uC644\uB8CC ${Vt(e.done_at)}`}
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
              >`):r?c`<span class="worker-usage" title=${xo(e.usage)}
              >${r}</span
            >`:""}
      ${typeof e.work_ms=="number"?c`<span
            class="worker-mini__work"
            title=${Au(e.work_kind)}
            >작업 ${Er(e.work_ms)}</span
          >`:""}
    </div>
  </div>`}function Sn(e,t={}){if(e.lane==="done"&&e.done_layout==="three_line")return Um(e);let n=e.draggable&&!e.done,r=Array.isArray(e.badges)?e.badges:[],o=nn(e.usage),s=zn(e.usage),i=e.merge_step||null,l=e.lane==="pr_wait"||!!e.revise_action||!!e.stale_work,a=e.lane==="done"&&!l,u=a?on(e.done_at):"",d=n?c`<span class="worker-mini__grip" aria-hidden="true">⠿</span>`:"",f=typeof e.seq=="number"?c`<span class="worker-mini__seq" aria-hidden="true"
          >${e.seq}</span
        >`:"",g=e.workspace_name?c`<span class="worker-mini__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:"",m=c`<span class="worker-mini__id" title="클릭하면 ID 복사"
    >${e.id}</span
  >`,w=e.lane==="done"?"":Js(e.workflow),C=e.lane==="done"?"":Lu(e.from_id),F=ti(e.priority),V=c`<span class="worker-mini__title">${e.title}</span>`,se=Du(e.pr_url,e.pr_number),j=r.map(Re=>Re===e.live_badge?c`<span
          class="worker-mini__badge worker-mini__badge--activity"
          title="서버가 이 PR을 처리하는 중입니다"
          ><span class="act-dot" aria-hidden="true"></span>${Re}</span
        >`:c`<span
          class="worker-mini__badge${e.alert?" worker-mini__badge--alert":""}"
          title=${Re===e.completion_badge&&e.completion_title||""}
          >${Re}</span
        >`),N=e.reason?c`<span class="worker-mini__reason">${e.reason}</span>`:"",R=o.length>0?o.map(Re=>c`<span class="worker-usage" title=${Re.tooltip}
              >${Re.label}</span
            >`):s?c`<span class="worker-usage" title=${xo(e.usage)}
            >${s}</span
          >`:"",L=i?c`<span
        class="merge-step${i.failed?" merge-step--failed":""}"
        style=${`--progress: ${i.percent}%`}
        >${i.label}${i.index>0?c`<span class="merge-step__n"
              >${i.index}/${i.total}</span
            >`:""}</span
      >`:"",B=e.merge_action?c`<button
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
        </button>`:"",H=e.resolve_action?c`<button
        type="button"
        class="worker-mini__resolve"
        data-bead-id=${e.id}
        ?disabled=${e.resolve_enabled===!1}
        title=${e.resolve_title||"\uC2E4\uD328\uD55C \uC791\uC5C5\uC744 \uC774\uC5B4\uBC1B\uB294 \uB300\uD654\uD615 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4 (\uAE30\uB85D\uB41C \uC138\uC158\uC774 \uC788\uC73C\uBA74 fork)"}
      >
        세션에서 해결
      </button>`:"",G=e.stale_work||null,te=G?c`${G.can_resume||G.can_continue?c`<button
            type="button"
            class="worker-mini__stale-continue"
            data-bead-id=${e.id}
            data-action-id=${G.action_id}
            ?disabled=${G.locked}
          >
            기존 작업 이어가기
          </button>`:""}${G.can_backup_fresh?c`<button
            type="button"
            class="worker-mini__stale-backup"
            data-bead-id=${e.id}
            data-action-id=${G.action_id}
            ?disabled=${G.locked}
          >
            백업 후 새로 시작
          </button>`:""}${G.can_recheck?c`<button
            type="button"
            class="worker-mini__stale-recheck"
            data-bead-id=${e.id}
            data-action-id=${G.action_id}
            ?disabled=${G.locked}
          >
            다시 확인
          </button>`:""}`:"",ke=G?c`<div class="worker-mini__stale">
        <strong>${G.title}</strong>
        <span>${G.summary}</span>
        <span>${G.cause}</span>
        ${G.can_backup_fresh?c`<small
              >Git-ignored dependency/build output은 archive에 포함되지
              않습니다</small
            >`:""}
      </div>`:"",Ee=e.revise_action?c`<button
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
        </button>`:"",oe=!!(e.lane!=="pr_wait"&&!e.done&&e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker)),D=ei(e.rec,Sr(e,"rec")),be=Bm(e,Sr(e,"receipt")),Se=Zs(e.cross_lane_chip),T=ro(e.log_path),ee=g||Se||w||C||oe||D||be||R||T?c`<div class="worker-chips">
          ${g}${Se}${w}${C}${oe?Xs(e.exec_chips,{pin:e.exec_chips_pinned===!0}):""}${D}${be}${R}${T}${Ea(e)}
        </div>`:"",me=Qs(e.dependency_chips),ve=Gs(e),Ce=t.actions?t.actions:"",_e=!!(i||e.merge_action||e.cancel_action||e.resolve_action||e.discard_action||Q?.operation||e.revise_action||G);return c`<div
    class="worker-mini${l?" worker-mini--card":""}${n?"":" worker-mini--static"}${e.done?" worker-mini--done":""}${e.ghost?" worker-mini--ghost":""}${i?" worker-mini--merging":""}${i?.failed?" worker-mini--merge-failed":""}${e.external?" worker-mini--external":""}"
    style=${i?`--progress: ${i.percent}%`:""}
    draggable=${n?"true":"false"}
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    ${a?c`<div class="worker-mini__row1">
            ${g}${m}${F}${C}${se}${V}${Ce}
          </div>
          ${Iu(e.carried_to,e.root_dir)}
          <div class="worker-mini__row2">
            ${R}${u?c`<span
                  class="worker-mini__done-at"
                  title=${`\uC644\uB8CC ${Vt(e.done_at)}`}
                  >완료 ${u}</span
                >`:""}${typeof e.work_ms=="number"?c`<span
                  class="worker-mini__work"
                  title=${Au(e.work_kind)}
                  >작업 ${Er(e.work_ms)}</span
                >`:""}${j}${L}
            <span class="worker-mini__actions"
              >${B}${Y}${H}${P}</span
            >
            ${oo(e)}
          </div>`:l?c`<div class="worker-mini__head">
              ${d}${f}${m}${F}${se}${j}${N}${Ce}
            </div>
            <div class="worker-mini__body">${V}${ke}</div>
            ${me}${ee}${_e?c`<div class="worker-mini__foot">
                  ${L}
                  <span class="worker-mini__actions"
                    >${B}${Y}${H}${P}${Ee}${te}</span
                  >
                  ${Gs(e)}
                </div>`:""}
            ${oo(e)}`:c`<div class="worker-mini__line">
              ${d}${f}${m}${F}${V}${se}${j}${N}${L}${B}${Y}${H}${P}${Ce}
            </div>
            ${me}${ee}${ve} ${oo(e)}`}
  </div>`}function Wm(e,t){let n,r=[];for(let o of e){let s=o.group||"";s.length>0&&s!==n&&r.push(c`<div class="worker-card__place-group">${s}</div>`),n=s,r.push(c`<button
        type="button"
        class="worker-card__place-lane${s.length>0?" worker-card__place-lane--nested":""}"
        data-bead-id=${t}
        data-lane=${o.id}
        ?disabled=${o.disabled===!0}
        title=${o.title||`${o.label} \uB300\uAE30 \uB9E8 \uB4A4\uC5D0 \uCD94\uAC00`}
      >
        <span>${o.label}</span>
        ${typeof o.count=="number"?c`<span class="worker-card__place-count">${o.count}</span>`:""}
      </button>`)}return c`${r}`}var Mu={external_roundtrip:"\uD558\uB124\uC2A4 \uBC16 \uC0C1\uB300\uC640 \uC608\uCE21 \uBD88\uAC00 \uC655\uBCF5 \uBC18\uBCF5 \u2014 \uB2E4\uB978 rig \uC138\uC158\xB7\uC0AC\uB78C\xB7\uC678\uBD80 \uC2DC\uC2A4\uD15C",user_feedback_loop:"\uC9C4\uD589 \uC911 \uC0AC\uC6A9\uC790 \uD53C\uB4DC\uBC31 \uC5C6\uC774\uB294 \uD488\uC9C8\uC774 \uB0AE\uC74C \u2014 \uBB38\uC548\xB7\uC124\uACC4 \uC138\uBD80\xB7\uBC29\uD5A5 \uC120\uD0DD"};function Ca(e,t){if(t==="rec"){let n=e.rec;if(!n)return null;let r=$a[n.state]||"";return{title:"\uBCF5\uC7A1\uD55C \uC791\uC5C5\uC73C\uB85C \uD310\uC815\uB428",lines:[...ka(n),...r.length>0?[`\uC0C1\uD0DC: ${r}`]:[],"\uC801\uC6A9\uC740 \uC774\uC288 \uC0C1\uC138\uC758 \uC2E4\uD589 \uC124\uC815 \uD3B8\uC9D1\uAE30\uC5D0\uC11C"]}}if(t==="session_preferred"){if(e.session_preferred!==!0)return null;let n=Mu[e.session_preferred_reason||""]||"";return{title:"\uC6CC\uCEE4\uB85C \uB3CC\uB9B4 \uC218 \uC788\uC9C0\uB9CC \uC138\uC158\uC774 \uB0AB\uB2E4",lines:n.length>0?[n]:[]}}if(t==="ineligible")return e.worker_ineligible!==!0?null:{title:"\uC6CC\uCEE4 \uC2E4\uD589 \uB300\uC0C1\uC774 \uC544\uB2C8\uB2E4",lines:["worker-ineligible \uB77C\uBCA8\uC774 \uBD99\uC5B4 \uC788\uB2E4 \u2014 \uB77C\uBCA8\uC740 \uC774\uC288 \uC0C1\uC138\uC758 \uB77C\uBCA8 \uC808\uC5D0\uC11C \uB5C0\uB2E4"]};if(t==="spec_after_blocker")return e.spec_after_blocker!==!0?null:{title:"\uC120\uD589 \uACB0\uACFC\uAC00 \uC124\uACC4 \uC804\uC81C \u2014 \uC2A4\uD399\uB3C4 \uC120\uD589 \uB4A4\uC5D0",lines:[`\uC120\uD589: ${(Array.isArray(e.blocked_by)?e.blocked_by:[]).join(" \xB7 ")}`,"\uC120\uD589\uC774 \uB2EB\uD788\uBA74 \uC774 \uD45C\uC2DC\uB294 \uC800\uC808\uB85C \uC0AC\uB77C\uC9C4\uB2E4 \u2014 \uB77C\uBCA8\uC740 \uC774\uC288 \uC0C1\uC138\uC758 \uB77C\uBCA8 \uC808\uC5D0\uC11C \uB5C0\uB2E4"]};if(t==="receipt"){let n=Pu(e);return n.length===0?null:{title:"\uC2E4\uD589 \uC601\uC218\uC99D \uD68C\uACC4 \uC794\uC5EC \u2014 \uBA38\uC9C0\uB294 \uC9C4\uD589",lines:[...n.map(r=>Fm[r]||r),"\uC790\uB3D9 \uBA38\uC9C0 \uD310\uC815\uC5D0\uB294 \uC601\uD5A5\uC774 \uC5C6\uB2E4 \u2014 \uC815\uC815\uC740 bd update --set-metadata exec_receipt=\u2026 \uB85C"]}}if(t==="qfr"){let n=e.workflow?e.workflow.quick_fix_review:null;if(!n||n.state!=="reviewed"&&n.state!=="stale")return null;let r=Array.isArray(n.missing)?n.missing:[];return{title:n.state==="reviewed"?"quick_fix self-review \uC601\uC218\uC99D\uC774 \uC9C0\uAE08 \uBCF8\uBB38\uACFC \uC77C\uCE58\uD569\uB2C8\uB2E4":"quick_fix self-review \uC601\uC218\uC99D\uC774 \uC9C0\uAE08 \uBCF8\uBB38\uACFC \uB2E4\uB985\uB2C8\uB2E4",lines:r.length>0?r:["\uBE60\uC9C4 \uD56D\uBAA9 \uC5C6\uC74C"]}}return null}var zm=["rec","receipt","session_preferred","ineligible","qfr","spec_after_blocker"];function ni(e,t){for(let n of zm){if(!t(n))continue;let r=Ca(e,n);return r?{chip_key:n,content:r}:null}return null}function Ea(e){return e.chip_popover?Qr(e.chip_popover.content):""}function Sr(e,t){return!!e.chip_popover&&e.chip_popover.chip_key===t}var ri="\uC0AC\uC6A9\uC790 \uB9AC\uBDF0 \uD544\uC694";function Ra(e,t=null,n={}){let r=e.worker_ineligible===!0,o=e.draggable&&!e.done&&!r,s=e.queue_placeable===!0&&!e.done&&!r,i=s&&t&&t.bead_id===e.id,l=e.session_preferred===!0,a=Mu[e.session_preferred_reason||""]||"",u=e.workflow,d=typeof e.reason=="string"?e.reason.split(" \xB7 "):[],f=d.includes("missing_description"),g=d.some(L=>L.startsWith(ri)),m=typeof e.reason=="string"&&e.reason.startsWith("\u26D4"),w=Sr(e,"spec_after_blocker"),C=qm(e.spec_after_blocker===!0,w),F=Qs(e.dependency_chips,C===""?"":c`${C}${w?Ea(e):""}`),V=e.workspace_name?c`<span class="worker-card__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:"",se=Zs(e.cross_lane_chip),j=Js(u),N=Lu(e.from_id),R=!!(e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker));return c`<div
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
            aria-expanded=${Sr(e,"ineligible")?"true":"false"}
            title="worker-ineligible label이 붙어 워커 실행 대상이 아닙니다"
          >
            worker-ineligible
          </button>`:l?c`<button
              type="button"
              class="ctl-chip ctl-chip--label judgement-chip worker-card__session-preferred"
              data-chip-key="session_preferred"
              aria-expanded=${Sr(e,"session_preferred")?"true":"false"}
              title=${a}
            >
              세션 권장
            </button>`:""}${ei(e.rec,Sr(e,"rec"))}${jm(u,Sr(e,"qfr"))}
      ${w?"":Ea(e)}
    </div>
    <div class="worker-card__title">${e.title}</div>
    ${u?Cs(u,e.status,{onOpenDoc:n.onOpenDoc}):""}${F}
    ${V||se||j||N||R?c`<div class="worker-chips">
          ${V}${se}${j}${N}${Xs(e.exec_chips,{pin:n.exec_chips_mode==="pinned_only"})}
        </div>`:""}
    <div
      class="worker-card__foot${e.reason?"":" worker-card__foot--actions-only"}"
    >
      ${i?c`<div class="worker-card__place-menu">
            ${Wm(t.lanes,e.id)}
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
    ${oo(e)}
  </div>`}function qn(e){let t=!!e.collapsible&&!!e.collapsed,n=typeof e.count=="number"?e.count:e.items.length,r=c`<span
      class="worker-pane__dot worker-pane__dot--${e.lane}"
      aria-hidden="true"
    ></span>
    <span class="worker-pane__title">${e.title}</span>
    ${t&&e.preview?c`<span class="worker-pane__preview">${e.preview}</span>`:""}
    <span class="worker-pane__count">${n}</span>`;return c`<section
    class="worker-pane worker-pane--lane-${e.lane}${e.src?" worker-pane--src":""}${e.live?" worker-pane--live":""}${e.collapsible?" worker-pane--collapsible":""}${t?" worker-pane--collapsed":""}"
    id=${rn(e.id||void 0)}
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
                  </div>`:e.items.map(o=>e.lane==="candidate"?Ra(o,e.place_menu,{onOpenDoc:e.onOpenDoc}):Sn(o))}
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
            data-drop=${rn(r.drop)}
            data-root-dir=${rn(r.root_dir)}
            data-lane-id=${rn(r.lane_id)}
            data-lane-length=${rn(r.lane_length)}
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
            ${n.lanes.map(o=>Hm(o))}
          </div>`}
    </section>
  </div>`}function Hm(e){let t=e.drop||{},n=e.badge?c`<span
        class="worker-lane__badge${e.held?" worker-lane__badge--held":""}"
        >${e.badge}</span
      >`:"";return c`<div
    class="worker-wait__lane${e.empty?" worker-wait__lane--empty":""}"
  >
    ${qn({id:typeof e.pane_id=="string"?e.pane_id:`worker-pane-lane-${e.id}`,lane:e.id,title:e.title,items:[],count:e.count,empty:"\uBE44\uC5B4 \uC788\uC74C \u2014 \uD589\uC744 \uC5EC\uAE30\uB85C \uB4DC\uB798\uADF8",header_control:c`${n}${e.header_control?e.header_control:""}`,body:c`<div
        class="worker-wait__rows"
        data-drop=${rn(t.drop)}
        data-root-dir=${rn(t.root_dir)}
        data-lane-id=${rn(t.lane_id)}
        data-lane-length=${rn(t.lane_length)}
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
  </section>`:""}var Nu=[{step:"merge",label:"\uBA38\uC9C0",index:1},{step:"base",label:"base",index:2},{step:"verify",label:"\uAC80\uC99D",index:3},{step:"deploy",label:"\uBC30\uD3EC",index:4},{step:"child",label:"\uC790\uC2DD",index:5},{step:"branch",label:"\uBE0C\uB79C\uCE58",index:6},{step:"close",label:"close",index:7}],Lo=[{step:"base_containment",label:"base \uD3EC\uD568 \uD655\uC778"},{step:"repo_operations",label:"\uC800\uC7A5\uC18C \uC791\uC5C5"},{step:"post_merge_jobs",label:"\uBA38\uC9C0 \uD6C4 \uC7A1"},{step:"child_sweep",label:"\uC790\uC2DD \uC815\uB9AC"},{step:"branch_cleanup",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC"},{step:"parent_close",label:"\uBD80\uBAA8 close"}];function ii(e,t){let n=Nu.find(o=>o.step===e);if(!n)return null;let r=Nu.length;return{step:n.step,label:t,index:n.index,total:r,percent:Math.round(n.index/r*100)}}function qu(e){let t=Lo.findIndex(n=>n.step===e);return Lo.map((n,r)=>({step:n.step,label:n.label,state:t<0?"todo":r<t?"done":r===t?"stall":"todo"}))}function Tr(e){let t=Lo.find(n=>n.step===e);return t?t.label:typeof e=="string"?e:""}function Gm(e){let t=Lo.findIndex(n=>n.step===e);return t<0?null:{index:t+1,total:Lo.length}}function ai(e){let t=Gm(e);return t?`\uBA38\uC9C0 \uC644\uB8CC \xB7 \uC815\uB9AC ${t.total}\uB2E8\uACC4 \uC911 ${t.index}\uB2E8\uACC4\uC5D0\uC11C \uBA48\uCDA4`:"\uBA38\uC9C0\uB428 \xB7 \uC815\uB9AC \uBBF8\uC644"}var Ia=new Set(["queued","running","retry_pending"]),ju=new Set(["failed","succeeded"]),Km={queued:"\uB300\uAE30",running:"\uC911",retry_pending:"\uC7AC\uC2DC\uB3C4 \uB300\uAE30",failed:"\uC2E4\uD328",succeeded:"\uC644\uB8CC \xB7 \uC815\uB9AC \uC7AC\uC2DC\uB3C4 \uB300\uAE30"},Po={base_containment:{step:"base",label:"base \uD655\uC778 \uC911"},child_sweep:{step:"child",label:"\uC790\uC2DD \uC815\uB9AC \uC911"},branch_cleanup:{step:"branch",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC \uC911"},parent_close:{step:"close",label:"\uBD80\uBAA8 close \uC911"}},Ym={merging:{step:"merge",label:"\uBA38\uC9C0 \uC911"},base_containment:Po.base_containment,child_sweep:Po.child_sweep,branch_cleanup:Po.branch_cleanup,parent_close:Po.parent_close};function Vm(e){return typeof e=="string"&&/^[0-9a-f]{40}$/.test(e)}function Xm(e,t,n){return!["verify","deploy"].includes(e.kind)||![...Ia,...ju].includes(e.state)||![null,void 0,""].includes(e.superseded_by)||!Array.isArray(e.subjects)?!1:e.subjects.some(r=>r&&typeof r=="object"&&r.bead_id===t&&r.merged_sha===n)}function Qm(e,t){let n=(t.kind==="deploy"?2:1)-(e.kind==="deploy"?2:1);if(n!==0)return n;let r=u=>u.state==="succeeded"?1:2,o=r(t)-r(e);if(o!==0)return o;let s=typeof e.requested_at=="number"?e.requested_at:0,i=typeof t.requested_at=="number"?t.requested_at:0;if(s!==i)return i-s;let l=typeof e.operation_id=="string"?e.operation_id:"",a=typeof t.operation_id=="string"?t.operation_id:"";return l.localeCompare(a)}function Oa(e,t=!1){let n=e.kind,r=n==="verify"?"\uAC80\uC99D":"\uBC30\uD3EC",o=t?"failed":e.state,s=Km[o];if(!s)return null;let i=ii(n,`${r} ${s}`);return i?{...i,active:Ia.has(o),failed:o==="failed"}:null}function Zm(e){return!e||typeof e!="object"?null:Ym[e.step]||null}function Do(e){if(!e||typeof e.bead_id!="string")return null;let t=e.bead_id,n=e.merge_progress&&typeof e.merge_progress=="object"?e.merge_progress:{},r=Zm(n),o=e.cleanup_failed&&typeof e.cleanup_failed=="object"?e.cleanup_failed:null,s=["post_merge_jobs","child_sweep","branch_cleanup","parent_close"].includes(typeof e.cleanup_cursor=="string"?e.cleanup_cursor:""),i=!s&&(e.cleanup_cursor==="repo_operations"||n.step==="repo_operations"),l=Vm(e.merge_sha)?e.merge_sha:null,a=!s&&l&&Array.isArray(e.repo_operations)?e.repo_operations.filter(w=>w&&typeof w=="object"&&Xm(w,t,l)).sort(Qm):[],u=i?a:[],d=u.find(w=>Ia.has(w.state));if(d)return Oa(d);if(o)return o.step==="repo_operations"&&a[0]?Oa(a[0],!0):null;let f=u.find(w=>ju.has(w.state)?w.state!=="succeeded"||e.cleanup_cursor==="repo_operations":!1);if(f)return Oa(f);if(r){let w=ii(r.step,r.label);return w?{...w,active:!0,failed:!1}:null}let g=typeof e.cleanup_cursor=="string"?Po[e.cleanup_cursor]:null;if(!g)return null;let m=ii(g.step,g.label);return m?{...m,active:!0,failed:!1}:null}function li(e){return!!e&&e.step!=="merge"&&e.failed!==!0}var Jm="\uBBF8\uC801\uC7AC";function La(e,t){let n=Bn(e,t.id);return{id:t.id,label:`\u26D3 ${t.id}`,title:`\uC120\uD589 \u2014 close\uB420 \uB54C\uAE4C\uC9C0 \uCD9C\uBC1C\uD558\uC9C0 \uC54A\uB294\uB2E4 (${t.location_label})`,...n?{foreign:!0}:{}}}var eg=10080*60*1e3;function Fu(e,t,n){let r=t.closed_at;if(typeof r!="number"||!Number.isFinite(r)||r<n-eg)return null;let o=Bn(e,t.id),s=typeof t.root_dir=="string"?t.root_dir:"",i={id:t.id,label:`\u{1F513} ${t.id}`,title:`\uD574\uC81C \u2014 ${Vt(r)}\uC5D0 close\uB418\uC5B4 \uC774 \uC774\uC288\uAC00 \uD480\uB838\uB2E4`,...o?{foreign:!0}:{}};return o?s.length>0&&(i.openable=!0,i.root_dir=s):i.openable=!0,i}function Bu(e,t){let n=Array.isArray(t.ids)?t.ids.filter(s=>typeof s=="string"&&s.length>0):[],r=t.root_dirs&&typeof t.root_dirs=="object"?t.root_dirs:{},o=[];for(let s of[...new Set(n)].sort()){let i=Bn(e,s),l=typeof r[s]=="string"?r[s]:"",a={id:s,label:`\u2192 ${s}`,title:"\uD6C4\uC18D \u2014 \uC774 \uC774\uC288\uAC00 close\uB418\uBA74 \uD480\uB9B0\uB2E4",...i?{foreign:!0}:{}};l.length>0?(a.openable=!0,a.root_dir=l):i||(a.openable=!0),o.push(a)}return o}function Uu(e,t,n={}){let r=new Map,o=new Map;for(let s of t)o.has(s.id)||o.set(s.id,s.location_label);for(let[s,i]of e){if(typeof s!="string"||s.length===0)continue;let l=[];for(let a of Array.isArray(i)?i:[]){if(typeof a!="string"||a.length===0)continue;let u=La(s,{id:a,location_label:o.get(a)||Jm}),d=n[a];u.foreign!==!0?u.openable=!0:typeof d=="string"&&d.length>0&&(u.openable=!0,u.root_dir=d),l.push(u)}l.length>0&&r.set(s,l)}return r}var ui=1,Mo=[{value:"repo_spec",label:"\uB808\uD3EC \xB7 spec \uC6B0\uC120"},{value:"repo_updated",label:"\uB808\uD3EC \xB7 \uCD5C\uC2E0 \uC218\uC815"},{value:"updated_flat",label:"\uCD5C\uC2E0 \uC218\uC815(\uB808\uD3EC \uBB34\uC2DC)"}],Ma=[{value:"all",label:"\uC804\uCCB4"},{value:"with",label:"spec \uC788\uC74C"},{value:"without",label:"spec \uC5C6\uC74C"}],so={show_blocked:!0,spec:"all"},Wu={auto_merge:"\uC790\uB3D9 \uBA38\uC9C0",merged:"\uBA38\uC9C0",merge:"\uBA38\uC9C0",pr_stop:"PR \uC911\uB2E8",stopped:"\uC911\uB2E8",failed:"\uC2E4\uD328",refuted:"\uBC18\uC99D",no_delta:"\uBB34-delta"};function tg(e,t){let n=null;for(let r of Object.values(e||{}))!r||r.bead_id!==t||!Gn(r)||(n=typeof r.status=="string"?r.status:null);return n}function ng(e,t){let n=null,r=-1/0;for(let o of Object.values(e)){if(!o||o.bead_id!==t||o.status==="running"||!Gn(o))continue;let s=typeof o.finished_at=="number"?o.finished_at:typeof o.started_at=="number"?o.started_at:0;s>=r&&(r=s,n=o)}return n}function rg(e,t,n={}){let{winners:r,resumed_from_ids:o}=Zc(e,t),s=new Map;for(let[i,l]of r){let a=l.attempt,u=l.run_state,d=l.started_at,f=typeof a.session_id=="string"&&a.session_id.length>0,m=Us(a.quickfix_landing)==="session",w=u!=="running"&&(f||!m)&&!o.has(a.attempt_id),C=!f&&m?"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":o.has(a.attempt_id)?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":null,F=lt(n.observations?.[i]),V=lt(F.pr),se=typeof a.merge_sha=="string"&&a.merge_sha.length>0||V.state==="MERGED",j=Yn(n.discard_operations,i,{attempt_id:a.attempt_id,merged:se}),N=u==="failed"?Hu(a,{resume_eligible:w,resume_reason:C,confirmation:j.confirmation,history:n.bead_timelines?.[i]}):null;s.set(i,{...zu(a,e,u),started_at:d,...N?{failure:N}:{},can_pause:u==="running"&&f,can_resume:w})}for(let[i,l]of ag(e,t)){if(s.has(i))continue;let a=l.attempt,u=Yn(n.discard_operations,i,{attempt_id:a.attempt_id}),d=Xu(a);s.set(i,{...zu(a,e,l.run_state),started_at:typeof a.started_at=="number"?a.started_at:null,...l.run_state==="parked"?{failure:Hu(a,{resume_eligible:!1,resume_reason:"\uC138\uC158 \uB300\uAE30 \u2014 [\uC7AC\uC2DC\uB3C4]\uAC00 \uC0C8 attempt\uB97C \uB744\uC6C1\uB2C8\uB2E4",confirmation:u.confirmation,history:n.bead_timelines?.[i]})}:{},...l.run_state==="waiting"?{wait:sg(a)}:{},...d?{retry:d}:{},can_pause:!1,can_resume:!1})}return s}function zu(e,t,n){return{attempt_id:typeof e.attempt_id=="string"?e.attempt_id:"",run_state:n,last_event_at:typeof e.last_event_at=="number"?e.last_event_at:null,last_activity:e.last_activity&&typeof e.last_activity=="object"?e.last_activity:null,legs:Array.isArray(e.legs)?e.legs:[],runner:typeof e.runner=="string"?e.runner:null,model:typeof e.model=="string"?e.model:null,effort:typeof e.effort=="string"?e.effort:null,speed:typeof e.speed=="string"?e.speed:null,resumed_from:typeof e.resumed_from=="string"?e.resumed_from:null,continuation_mode:e.continuation_mode==="session"||e.continuation_mode==="fresh"?e.continuation_mode:null,status:typeof e.status=="string"?e.status:null,usage:Hn(t,e.bead_id)}}function Hu(e,t){let n=e.cause_detail&&typeof e.cause_detail=="object"?e.cause_detail:null;return{cause:typeof e.cause=="string"?e.cause:null,cause_detail:n,summary:n&&typeof n.summary=="string"?n.summary:null,bead_id:typeof e.bead_id=="string"?e.bead_id:"",finished_at:typeof e.finished_at=="number"?e.finished_at:null,runner:typeof e.runner=="string"?e.runner:null,model:typeof e.model=="string"?e.model:null,effort:typeof e.effort=="string"?e.effort:null,observed_effort:typeof e.observed_effort=="string"?e.observed_effort:null,speed:typeof e.speed=="string"?e.speed:null,attempt_id:typeof e.attempt_id=="string"?e.attempt_id:"",usage:e.usage&&typeof e.usage=="object"?e.usage:null,halted_auto_advance:e.halted_auto_advance===!0,quickfix_lane:e.quickfix_lane===!0,quickfix_landing:e.quickfix_landing&&typeof e.quickfix_landing=="object"?e.quickfix_landing:null,retry:Xu(e),resume_eligible:t.resume_eligible,resume_reason:t.resume_reason,landed:Ru(e),confirmation:t.confirmation,...og(t.history)}}function og(e){if(!e||typeof e!="object")return{};let t=Array.isArray(e.events)?e.events:[],n=[];for(let o of t)!o||typeof o!="object"||typeof o.summary!="string"||o.summary.length===0||n.push({event_id:typeof o.event_id=="string"?o.event_id:"",kind:typeof o.kind=="string"?o.kind:"",summary:o.summary,at:typeof o.at=="number"?o.at:null});n.reverse();let r=typeof e.log_path=="string"&&e.log_path.length>0?e.log_path:null;return{...n.length>0?{timeline:n}:{},...r===null?{}:{log_path:r},...e.log_expired===!0?{log_expired:!0}:{},...e.log_unreadable===!0?{log_unreadable:!0}:{}}}function sg(e){let t=e.cause_detail&&typeof e.cause_detail=="object"?e.cause_detail:null,n=Array.isArray(t?.blockers)?t.blockers:[],r=[];for(let o of n)!o||typeof o!="object"||typeof o.id!="string"||o.id.length===0||r.push({id:o.id,rig:typeof o.rig=="string"?o.rig:null,status:typeof o.status=="string"?o.status:""});return{summary:t&&typeof t.summary=="string"?t.summary:null,blockers:r,since:typeof e.finished_at=="number"?e.finished_at:null}}function Xu(e){let t=e&&e.retry&&typeof e.retry=="object"?e.retry:null;return t?{cause:typeof t.cause=="string"?t.cause:null,attempts:typeof t.attempts=="number"?t.attempts:0,max:typeof t.max=="number"?t.max:0,next_at:typeof t.next_at=="number"?t.next_at:null}:null}var ig=new Set(["parked","retry_wait","waiting"]);function ag(e,t){let n=Object.values(e||{}),r=new Map;for(let s of n)s&&typeof s.bead_id=="string"&&Gn(s)&&r.set(s.bead_id,s.attempt_id);let o=new Map;for(let s of n){if(!s||typeof s.bead_id!="string"||s.bead_id.length===0||!Gn(s)||!ig.has(s.status)||r.get(s.bead_id)!==s.attempt_id||typeof s.dismissed_at=="number")continue;let i=t.get(s.bead_id);typeof i=="number"&&i>0&&typeof s.finished_at=="number"&&i>=s.finished_at||o.set(s.bead_id,{attempt:s,run_state:s.status})}return o}function Gu(e,t){let n=e[t];if(!n)return"";if(n.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let r=typeof n.reason=="string"?n.reason:"",o=r.indexOf(":");return o>0&&o<r.length-1?`\u26D4 ${r.slice(0,o)} (${r.slice(o+1)})`:`\u26D4 ${r}`}function lt(e){return e&&typeof e=="object"?e:{}}function lg(e){let t=lt(e).badge_codes;return Array.isArray(t)?t.filter(n=>typeof n=="string"&&n.length>0):[]}function cg(e,t,n){let r=lt(t);if(Object.keys(r).length===0)return null;let o=e.execution_defaults,s=e.runner_catalog,i=e.session_defaults;if(!o||!s||!i)return null;let l=g=>gn({pin:g,global:i,execution_defaults:o,runner_catalog:s,route:n}),a,u;try{a=l(r),u=l(null)}catch{return null}let d=Ku(no(a,s),no(u,s)),f=Ku(Ar(a,null),Ar(u,null));return d||f?{orchestration:d,worker:f}:null}function Ku(e,t){return!e||t&&t.text===e.text?null:e}function ug(e,t,n){let o=(t&&typeof t=="object"&&Array.isArray(t.released_by)?t.released_by:[]).filter(i=>i&&typeof i=="object"&&typeof i.id=="string").slice().sort((i,l)=>(typeof l.closed_at=="number"?l.closed_at:0)-(typeof i.closed_at=="number"?i.closed_at:0)),s=[];for(let i of o){let l=Fu(e,i,n);l&&s.push(l)}return s.length===0?null:s}function Na(e,t){return typeof e!="string"||e.length===0||typeof t!="string"||t.length===0||t===e?null:`\u2192 ${t}`}var dg=new Set(["quick_fix","spec_backed","full_plan"]);function Yu(e){return typeof e=="string"&&dg.has(e)}function pg(e){let t={...lt(e.session_defaults)};for(let n of["orchestration_model","orchestration_effort","orchestration_speed"]){let r=e[n];typeof r=="string"&&(t[n]=r)}return t}function fg(e,t,n){let r=e.runner_catalog??null,o=Da(e,t,n,null);if(!o)return null;let s=An(r,o.orchestration_model.value??""),i=s===null?o:Da(e,t,n,s)||o,l=no(i,r),a=Ar(i,s);return l||a?{orchestration:l,worker:a}:null}function Da(e,t,n,r){let o=Yu(n)?n:Yu(t.route)?t.route:null;try{return gn({pin:t,global:pg(e),execution_defaults:e.execution_defaults??null,runner_catalog:e.runner_catalog??null,route:o,controller_runtime:r})}catch{return null}}function _g(e,t,n){return!t||!Object.hasOwn(t,"metadata")?null:Ar(Da(e,lt(t.metadata),t.route,n),n)}function qa(e,t){let n=new Set,r=e;for(;r&&!n.has(r.attempt_id);){if(r.conflict_resolution===!0)return!0;n.add(r.attempt_id),r=typeof r.resumed_from=="string"&&r.resumed_from.length>0&&t.get(r.resumed_from)||null}return!1}function mg(e){let t={};for(let l of Nn)t[l]=0;let n=!1,r=0,o=0,s=0;for(let l of e){let a=l.usage;if(!a||typeof a!="object")continue;let u=!1;for(let d of Nn)Number.isFinite(a[d])&&(t[d]+=a[d],n=!0,u=!0);u&&(o+=1,Number.isFinite(a.total_cost_usd)&&(r+=a.total_cost_usd,s+=1))}o>0&&s===o&&(t.total_cost_usd=r);let i=e.map(l=>l.usage).filter(l=>l&&typeof l=="object"&&l.providers);return i.length>0?nn(Ds(i)):n?zn(t):null}function Qu(e,t){let n=Aa(e,t);return n==="internal"?"\uBBF8\uC801\uC7AC":n==="external"?"\uC678\uBD80":"\uC704\uCE58 \uBBF8\uD655\uC778"}function gg(e,t,n){let r=t.get(e);if(!r)return Qu(e,n);if(typeof r.position=="number"){if(r.lane==="parallel")return`#${r.position}`;if(/^s[1-5]$/.test(r.lane))return`${r.lane} #${r.position}`}return Ro(r)}function hg(e,t,n,r){let o=t.get(e);if(!o)return{label:Qu(e,n),title:""};if(typeof o.position=="number"&&(o.lane==="parallel"||/^s[1-5]$/.test(o.lane))){let i=r.get(e),l=o.lane==="parallel"?"\uBCD1\uB82C":o.lane;return{label:i&&i.length>0?"\u{1F512} \uB300\uAE30":"\uB300\uAE30",title:`${o.workspace_name||o.root_dir} ${l} #${o.position}`}}return{label:o.state==="running"?"\u25B6 \uC2E4\uD589\uC911":Ro(o),title:""}}function bg(e,t){for(let n of Object.values(e||{}))if(n&&n.attempt_id===t&&typeof n.armed_by_lane=="string"&&n.armed_by_lane.length>0)return n.armed_by_lane;return null}function yg(e,t,n,r,o,s){return t==="draft"?{state:"draft",badge:"draft",run_label:null,can_stop:!1}:n.some(i=>s.failed_by_bead.get(i.id)===e)?{state:"failed",badge:"\u26D4 \uC2E4\uD328",run_label:"\u25B6 \uB2E4\uC2DC \uC9C4\uD589",can_stop:!1}:s.disarmed_lanes.has(e)?{state:"restart",badge:"\u23F8 \uC7AC\uC2DC\uC791",run_label:"\u25B6 \uC9C4\uD589",can_stop:!1}:n.some(i=>s.armed_by_bead.get(i.id)===e)?{state:"running",badge:"\u25B6 \uC9C4\uD589 \uC911",run_label:o.length>0?"\u25B6 \uC774\uC5B4\uC11C \uC9C4\uD589":null,can_stop:!0}:r?{state:"all_done",badge:"\uBAA8\uB450 \uC644\uB8CC",run_label:null,can_stop:!1}:{state:"confirmed",badge:"\uD655\uC815",run_label:"\u25B6 \uC9C4\uD589",can_stop:!1}}function vg(e,t,n,r,o,s,i){let l=[];return e.forEach((a,u)=>{let d=typeof a.id=="string"?a.id:"";if(d.length===0)return;let f=a.status==="confirmed"?"confirmed":"draft",g=Array.isArray(a.entries)?a.entries:[],m=[];g.forEach((V,se)=>{let j=V&&typeof V.bead_id=="string"?V.bead_id:"";if(j.length===0)return;let N=V&&typeof V.root_dir=="string"?V.root_dir:"",R=n.get(j),L=R?R.state:void 0,B=L==="running"||L==="pr_wait"||L==="done",Y=!R||L==="runnable",Q=R&&R.lane==="parallel"&&typeof R.position=="number"?R.position-1:null,P=hg(j,n,r,t),H=m.length>0?m[m.length-1].id:null,G=f==="confirmed"&&H!==null&&!(t.get(j)||[]).includes(H);m.push({id:j,title:o.get(j)||j,root_dir:R?R.root_dir:N,workspace_name:R?R.workspace_name:s.get(N)||"",seq:se+1,location_label:P.label,location_title:P.title,draggable:!B,fixed:B,done:L==="done",unplaced:Y,mismatch:G,...Q!==null?{queue_index:Q}:{}})}),m.forEach((V,se)=>{V.seq=se+1});let w=m.length>0&&m.every(V=>V.done),C=m.filter(V=>!V.fixed&&i.armed_by_bead.get(V.id)!==d).map(V=>V.id),F=yg(d,f,m,w,C,i);l.push({lane_id:d,status:f,draft:f==="draft",number:u+1,label:`\uC5F0\uACB0 ${u+1} \xB7 \uB808\uD3EC \uAC04`,rows:m,all_done:w,can_confirm:f==="draft"&&m.length>=2,has_mismatch:f==="confirmed"&&m.some(V=>V.mismatch||V.unplaced),unlaunched:C,...F})}),l}function wg(e,t,n){if(e.lane==="runnable"){let i=n.get(e.id);return i?i.length===0?{scope:[],state:"missing"}:{scope:i,state:"declared"}:{scope:[],state:void 0}}let r=t.get(e.root_dir),o=r?r[e.id]:void 0;if(!o||!Array.isArray(o.scope))return{scope:[],state:void 0};let s=o.scope.filter(i=>typeof i=="string"&&i.length>0);return{scope:s,state:s.length===0?"missing":"declared"}}function kg(e,t,n,r,o){let s=new Map;for(let a of[...e.running,...e.queue,...e.runnable,...e.pr_wait]){if(!t.has(a.root_dir))continue;let u=`${a.root_dir}\0${a.id}`,d=s.get(u);if(d){d.cards.push(a);continue}let{scope:f,state:g}=wg(a,t,n);g!==void 0&&(a.scope_state=g),s.set(u,{cards:[a],scope:f})}let i=new Map;for(let a of s.values()){let u=a.cards[0].scope_state;if(u!==void 0)for(let g of a.cards)g.scope_state=u;if(a.scope.length===0)continue;let d=a.cards[0].root_dir,f=i.get(d);f?f.push(a):i.set(d,[a])}let l=(a,u,d)=>{let f=u.cards[0],g={id:f.id,title:f.title,location_label:gg(f.id,r,o),prefixes:d,...typeof f.root_dir=="string"&&f.root_dir.length>0?{root_dir:f.root_dir}:{}};for(let m of a.cards)m.overlap_chips?m.overlap_chips.push(g):m.overlap_chips=[g]};for(let a of i.values())for(let u=0;u<a.length;u+=1)for(let d=u+1;d<a.length;d+=1){let f=Hs(a[u].scope,a[d].scope);f.length!==0&&(l(a[u],a[d],f),l(a[d],a[u],f))}}function Vu(e,t,n){let r=n?n.get(t)?.root_dir:void 0,o=!Bn(e.id,t),s=typeof e.root_dir=="string"?e.root_dir:"",i=typeof r=="string"&&r.length>0?r:o&&s.length>0?s:"";return i.length>0?{openable:!0,root_dir:i}:o?{openable:!0}:{}}function $g(e,t,n,r){let o=new Set(e?e.ids:[]);for(let l of t&&Array.isArray(t.ids)?t.ids:[])typeof l=="string"&&l.length>0&&o.add(l);if(o.size===0)return{ids:[]};let s={},i={...e?e.root_dirs:{},...t&&t.root_dirs&&typeof t.root_dirs=="object"?t.root_dirs:{}};for(let l of o){let a=i[l];if(typeof a=="string"&&a.length>0){s[l]=a;continue}if(!Bn(n.id,l)){n.root_dir.length>0&&(s[l]=n.root_dir);continue}let u=r.get(l)?.root_dir;typeof u=="string"&&u.length>0&&(s[l]=u)}return{ids:[...o],root_dirs:s}}function Pa(e){if(typeof e=="number")return Number.isFinite(e)?e:null;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:null}return null}function ci(e){if(typeof e=="number"&&Number.isFinite(e))return e;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:0}return 0}function ar(e,t,n){let r=Array.isArray(e)?e:[],o=Array.isArray(t)?t:[],s=n&&typeof n.done_since=="number"?n.done_since:void 0,i={...so,...n&&n.candidate_filter?n.candidate_filter:{}},l=n&&Object.hasOwn(n,"cross_lanes")?n.cross_lanes??null:void 0,a=n&&n.candidate_sort==="as_given"?"as_given":n&&Mo.some(y=>y.value===n.candidate_sort)?n.candidate_sort:"repo_spec",u=n&&n.groups==="all"?"all":"nonempty",d=n&&n.candidate_hidden_counts==="per_control"?"per_control":"sequential",f=Date.now(),g=new Map;for(let y of o)y&&typeof y.root_dir=="string"&&g.set(y.root_dir,y);let m=new Map;for(let y of o)y&&typeof y.root_dir=="string"&&m.set(y.root_dir,y.name||y.root_dir);for(let y of r)y&&typeof y.root_dir=="string"&&m.set(y.root_dir,y.name||y.root_dir);let w=[],C=[],F=[],V=[],se=[],j=[],N=new Map,R=new Map,L=new Map,B=new Map,Y=new Map,Q=new Map,P=new Map,H=new Map,G=new Map,te=new Map,ke=new Map,Ee=new Map,oe=new Map,D=new Set,be=new Map,Se=new Map,T=new Map;for(let y of r){if(!y||typeof y.root_dir!="string")continue;let U=y.root_dir,Oe=y.name||U,Ie=g.get(U),Ue=Ie&&typeof Ie.revision=="number"?Ie.revision:typeof y.revision=="number"?y.revision:0,Ke=lt(y.attempts),pt=lt(y.bead_titles);for(let[p,_]of Object.entries(pt))typeof _=="string"&&_.length>0&&T.set(p,_);let Et=lt(y.bead_times),It=lt(y.pr_observations),Mt=lt(y.admission),mt=lt(y.revise_parked),ct=lt(y.merge_queue_state),$t=lt(y.cleanup_failed),Ct=lt(y.discard_operations),Lt=lt(y.bead_timelines),ae=lt(y.bead_blocked_by);Object.hasOwn(y,"bead_scope")&&be.set(U,lt(y.bead_scope));let ie=lt(y.bead_workflow),$=lt(y.pr_activity),q=Array.isArray(y.repo_operations)?y.repo_operations:[];H.set(U,q);let J=typeof y.declared_base=="string"?y.declared_base:null;P.set(U,J),Q.set(U,Object.entries($t).map(([p,_])=>({bead_id:p,step:_&&_.step?_.step:"",reason:_&&_.reason?_.reason:"",at:_&&typeof _.at=="number"?_.at:null,detail:_&&typeof _.detail=="string"?_.detail:null,output_tail:_&&typeof _.output_tail=="string"&&_.output_tail?_.output_tail:void 0,log_path:_&&typeof _.log_path=="string"&&_.log_path?_.log_path:void 0,retry_count:_&&typeof _.retry_count=="number"&&Number.isInteger(_.retry_count)&&_.retry_count>0?_.retry_count:0,failure_code:_&&typeof _.failure_code=="string"?_.failure_code:void 0})));for(let[p,_]of Object.entries(lt(y.bead_overlay)))_&&typeof _=="object"&&G.set(`${U}\0${p}`,_);let re=new Map;for(let p of Object.values(Ke))p&&typeof p.attempt_id=="string"&&re.set(p.attempt_id,p);let le=Array.isArray(y.merge_queue)?y.merge_queue:[],Be=new Set(le.filter(p=>p&&typeof p.bead_id=="string").map(p=>p.bead_id)),Ve=new Map(le.filter(p=>p&&typeof p.bead_id=="string").map(p=>[p.bead_id,p])),tt=new Map,ze=new Map,xt=new Map,Nt=new Map;le.forEach((p,_)=>{p&&typeof p.bead_id=="string"&&(tt.set(p.bead_id,_+1),ze.set(p.bead_id,p.resolution),xt.set(p.bead_id,p.continuation_action||null),Nt.set(p.bead_id,p.authority||null))});let At=lt(y.auto_merge_skips),Zt=p=>{let _=At[p];if(!_)return null;let S=lt(lt(It[p]).pr).head_sha;return S&&S===_.head_sha?_.reason||"":null};Y.set(U,{positions:tt,resolutions:ze,continuations:xt,authorities:Nt,state:{active:typeof ct.active=="string"?ct.active:null,failures:lt(ct.failures),waiting:ct.waiting&&typeof ct.waiting.bead_id=="string"&&typeof ct.waiting.reason=="string"?ct.waiting:null},auto_excluded:(Array.isArray(y.pr_wait)?y.pr_wait:[]).map(p=>p&&p.bead_id).filter(p=>typeof p=="string"&&Zt(p)!==null),running:le.length>0});let vt=Array.isArray(y.queue)?y.queue:[];for(let p of[...vt,...Array.isArray(y.pr_wait)?y.pr_wait:[]])p&&typeof p.bead_id=="string"&&typeof p.armed_by_lane=="string"&&p.armed_by_lane.length>0&&Ee.set(p.bead_id,p.armed_by_lane);for(let p of Array.isArray(y.disarmed_on_load)?y.disarmed_on_load:[])typeof p=="string"&&p.length>0&&D.add(p);let Rt=(Array.isArray(y.serial_lanes)?y.serial_lanes:[]).filter(p=>p&&/^s[1-5]$/.test(p.id)&&Array.isArray(p.entries)),Wt=lt(y.lane_states),ut=typeof y.serial_lane_count=="number"?Math.max(0,Math.min(5,Math.floor(y.serial_lane_count))):Math.min(5,Rt.length);L.set(U,ut),B.set(U,vt.length);let Kt=new Map(Rt.map(p=>[p.id,p])),Yt=new Map;for(let p of Rt)for(let _ of p.entries)_&&typeof _.bead_id=="string"&&Yt.set(_.bead_id,p.id);for(let[p,_]of Object.entries(lt(y.bead_dependents))){let S=Array.isArray(_?.ids)?_.ids:[],z=lt(_?.root_dirs),K=ke.get(p)||{ids:new Set,root_dirs:{}};for(let ce of S)typeof ce=="string"&&ce.length>0&&K.ids.add(ce);for(let[ce,xe]of Object.entries(z))typeof xe=="string"&&xe.length>0&&(K.root_dirs[ce]=xe);ke.set(p,K)}for(let[p,_]of Object.entries(ae))Array.isArray(_)&&te.set(p,_.filter(S=>typeof S=="string"&&S.length>0));let zt=Array.isArray(y.done)?y.done:[];for(let p of zt)p&&typeof p.bead_id=="string"&&j.push({id:p.bead_id,root_dir:U,workspace_name:Oe});let _n=new Map;for(let p of zt)p&&typeof p.bead_id=="string"&&typeof p.added_at=="number"&&_n.set(p.bead_id,p.added_at);let Ft=p=>({id:p,title:pt[p]||p,root_dir:U,workspace_name:Oe,expected_revision:Ue,draggable:!1,...lt(Et[p]).created_at?{created_at:lt(Et[p]).created_at}:{},...lt(Et[p]).updated_at?{updated_at:lt(Et[p]).updated_at}:{}}),Jt=p=>{let _=ie[p]?.chips?.pr;return _&&typeof _.number=="number"&&typeof _.url=="string"?{pr_number:_.number,pr_url:_.url}:{}},Ht=p=>Object.hasOwn(ae,p)?{blocked_by:Array.isArray(ae[p])?ae[p].filter(_=>typeof _=="string"&&_.length>0):[]}:{},en=(p,_)=>{let S=Ht(p),z=(_?.blockers||[]).map(ce=>ce.id);if(z.length===0)return S;let K=[...S.blocked_by||[]];for(let ce of z)K.includes(ce)||K.push(ce);return{blocked_by:K}},fe=new Set;for(let[p,_]of rg(Ke,_n,{discard_operations:Ct,observations:It,bead_timelines:Lt})){fe.add(p);let S=_.run_state==="failed"?bg(Ke,_.attempt_id):null;S!==null&&oe.set(p,S);let z=re.get(_.attempt_id)||null,K=G.get(`${U}\0${p}`),ce=K&&K.rollup?K.rollup:null,xe=Na(J,z?z.target_base:null),Xe=z?qa(z,re):!1,ot=z&&z.quickfix_lane===!0&&z.quickfix_landing&&typeof z.quickfix_landing=="object"?z.quickfix_landing:null,ht=ot&&typeof ot.reason=="string"&&ot.reason.length>0?ot.reason:null,gt=ot?Do({bead_id:p,merge_sha:ot.head_sha,cleanup_cursor:ot.cursor,cleanup_failed:ht?{step:ot.cursor,reason:ht}:null,repo_operations:q}):null;C.push({...Ft(p),lane:"running",...en(p,_.wait),...Yt.has(p)?{serial_lane_id:Yt.get(p)}:{},attempt_id:_.attempt_id,run_state:_.run_state,status:_.status||void 0,workflow:ie[p]||null,can_pause:_.can_pause,can_resume:_.can_resume,started_at:_.started_at,last_event_at:_.last_event_at,last_activity:_.last_activity,legs:_.legs,runner:_.runner,model:_.model,effort:_.effort,speed:_.speed,resumed_from:_.resumed_from,continuation_mode:_.continuation_mode,usage:_.usage,failure:_.failure||null,wait:_.wait||null,retry:_.retry||null,exec_chips:{orchestration:wa(_),worker:_g(lt(Ie),K,_.runner||null)},discard:Yn(Ct,p,{attempt_id:_.attempt_id,merged:_.failure?.confirmation==="merged"||lt(It[p]).pr?.state==="MERGED"}),...ce?{rollup:ce}:{},...Xe?{conflict_resolution:!0}:{},...xe?{base_exception:xe}:{},...gt?{landing:gt}:{},badges:_.run_state==="paused"?["\u23F8 \uC77C\uC2DC\uC815\uC9C0"]:_.run_state==="failed"?["\u26A0 \uC2E4\uD328"]:_.run_state==="parked"?["\u23F8 \uC138\uC158 \uB300\uAE30"]:_.run_state==="retry_wait"?["\u21BB \uC7AC\uC2DC\uB3C4 \uB300\uAE30"]:_.run_state==="waiting"?["\u26D3 \uC120\uD589 \uB300\uAE30"]:[],alert:_.run_state==="failed"})}for(let[p,_]of Qc(Ke)){if(C.some(z=>z.id===p))continue;let S=_.attempt;C.push({...Ft(p),lane:"running",kind:"session",...Ht(p),attempt_id:typeof S.attempt_id=="string"?S.attempt_id:"",run_state:"running",status:"running",non_occupying:!0,workflow:ie[p]||null,can_pause:!1,can_resume:!1,started_at:_.started_at,last_event_at:typeof S.last_event_at=="number"?S.last_event_at:null,last_activity:S.last_activity&&typeof S.last_activity=="object"?S.last_activity:null,legs:Array.isArray(S.legs)?S.legs:[],runner:typeof S.runner=="string"?S.runner:null,model:typeof S.model=="string"?S.model:null,effort:typeof S.effort=="string"?S.effort:null,speed:typeof S.speed=="string"?S.speed:null,resumed_from:null,continuation_mode:null,usage:S.usage&&typeof S.usage=="object"?S.usage:null,exec_chips:{orchestration:wa(S),worker:null},discard:Yn(Ct,p,{merge_queued:!0}),badges:[_.origin==="auto"?"\uB9AC\uBDF0 \xB7 \uC790\uB3D9":"\uB9AC\uBDF0"],alert:!1})}for(let p of Array.isArray(y.session_active)?y.session_active:[]){let _=p&&p.bead_id;typeof _!="string"||fe.has(_)||(fe.add(_),Array.isArray(p.blocked_by)&&p.blocked_by.length>0&&te.set(_,p.blocked_by.filter(S=>typeof S=="string"&&S.length>0)),typeof p.title=="string"&&p.title.length>0&&T.set(_,p.title),C.push({...Ft(_),title:p.title||pt[_]||_,lane:"running",kind:"session",status:"in_progress",started_at:Pa(p.started_at)??Pa(p.updated_at)??void 0,updated_at:Pa(p.updated_at)??void 0,workflow:p.workflow||null,labels:Array.isArray(p.labels)?p.labels:[],spec_id:typeof p.spec_id=="string"?p.spec_id:"",blocked:p.blocked===!0,...Array.isArray(p.blocked_by)?{blocked_by:p.blocked_by.filter(S=>typeof S=="string"&&S.length>0)}:{},draggable:!1,can_pause:!1,can_resume:!1,exec_chips:null,usage:null,legs:[],last_activity:null,session_refs:Array.isArray(p.session_refs)?p.session_refs:[],badges:[],alert:!1}))}for(let p of Array.isArray(y.pr_wait)?y.pr_wait:[]){let _=p&&p.bead_id;if(typeof _!="string"||fe.has(_))continue;fe.add(_);let S=lt(It[_]),z=lt(S.pr),K=S.gate?lt(S.gate):null,ce=Be.has(_),xe=Ve.get(_)?.continuation_action||null,Xe=!!xe&&xe.continuation===null,ot=ct.active===_,ht=p.external===!0,gt=$t[_]||null,x=lt($[_]),A=Do({bead_id:_,merge_sha:p.merge_sha,cleanup_cursor:p.cleanup_cursor,merge_progress:x.merge_progress||null,cleanup_failed:gt,repo_operations:q}),Le=li(A),We=!!K&&K.base_badge==="\uCDA9\uB3CC",et=!!gt&&["post_merge_jobs","child_sweep","branch_cleanup","parent_close"].includes(gt.step)&&!!K&&K.tier==="merged",_t=ht&&!!gt&&!!K&&K.tier==="merged",qt=!!K&&["closed_unmerged","review","undecidable"].includes(K.tier),v=Yn(Ct,_,{external:ht,merge_active:ot||A?.step==="merge",merge_queued:ce,cleanup_active:Le,merged:!!gt||K?.tier==="merged"}),k=!!v.operation,O=lg(S.receipt_check);F.push({...Ft(_),lane:"pr_wait",...Ht(_),...O.length>0?{receipt_badge:{codes:O}}:{},workflow:ie[_]||null,pr_number:typeof z.number=="number"?z.number:null,pr_url:typeof z.url=="string"?z.url:void 0,external:ht,usage:Hn(Ke,_),merge_step:A,badges:Xe?["\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694"]:A?[K?.tier==="merged"?"\uBA38\uC9C0\uB428":"\uBA38\uC9C0 \uC911"]:gt?[Tr(gt.step)?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${Tr(gt.step)}`:"\uC815\uB9AC \uBA48\uCDA4"]:typeof K?.gate_badge=="string"&&K.gate_badge.length>0?[K.gate_badge]:[],alert:A?A.failed===!0:!!gt||qt,reason:gt&&A?.active!==!0?ai(gt.step):"PR \uB300\uAE30",merge_action:K?.tier==="merged"&&!et&&!_t?!1:!ce||Xe,merge_enabled:!k&&(Xe||K?.enabled===!0||We||et||_t),merge_label:Xe?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":_t||et?"\uC815\uB9AC \uC7AC\uC2DC\uB3C4":We&&!et?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":void 0,merge_title:Xe?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":k?v.error?`\uD3D0\uAE30 \uC2E4\uD328: ${v.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${v.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:_t?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uB2E4\uC2DC \uC2DC\uB3C4\uD569\uB2C8\uB2E4":et?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC2DC\uB3C4\uD569\uB2C8\uB2E4":We?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":K?.enabled===!0?`\uBA38\uC9C0 (${K.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4`:`\uBA38\uC9C0 \uBD88\uAC00: ${K?.reason||"\uAD00\uCE21 \uB300\uAE30"}`,cancel_action:ce&&!Xe,cancel_enabled:!ot,continuation_mismatch:xe?.mismatch||null,discard:v,discard_action:v.action,discard_enabled:v.enabled,discard_title:v.title})}let E=(p,_,S,z)=>{let K=p&&p.bead_id;if(typeof K!="string"||fe.has(K))return null;fe.add(K);let ce=mt[K],xe=Yn(Ct,K),Xe=xe.operation?xe:null,ot={...Ft(K),lane:_,workflow:ie[K]||null,draggable:!Xe,discard:Xe||void 0,reason:Gu(Mt,K),seq:S+1,queue_position:S+1,queue_index:S,queue_length:z,badges:ce?["\u23F8 REVISE \uD30C\uD0B9"]:[],alert:!!ce,revise_action:!!ce,revise_enabled:!!ce&&!Xe,revise_title:ce?ce.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${ce.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":""},ht=Ht(K);return Object.hasOwn(ht,"blocked_by")&&(ot.blocked_by=ht.blocked_by),ot};for(let p=0;p<vt.length;p++){let _=E(vt[p],"queue",p,vt.length);if(!_)continue;V.push(_);let S=N.get(U);S?S.push(_):N.set(U,[_])}let he=p=>{let _=F.find(ce=>ce.id===p&&ce.root_dir===U);if(_)return{id:p,title:_.title,badge:"PR \uB300\uAE30 \xB7 \uC810\uC720"};let S=C.find(ce=>ce.id===p&&ce.root_dir===U),z=S?S.run_state:tg(Ke,p),K=z==="failed"||z==="orphaned"?"\uC2E4\uD328 \xB7 \uC810\uC720 \uC720\uC9C0":z==="paused"?"\uC77C\uC2DC\uC815\uC9C0 \xB7 \uC810\uC720":"\uC2E4\uD589 \uC911 \xB7 \uC810\uC720";return{id:p,title:S?S.title:Ft(p).title,badge:K}},De=[];for(let p=0;p<Math.max(ut,Rt.length);p++){let _=`s${p+1}`,S=Kt.get(_),z=S&&Array.isArray(S.entries)?S.entries:[],K=lt(Wt[_]),ce=Array.isArray(K.occupied_by)?K.occupied_by.filter(ot=>typeof ot=="string"):[],xe=new Set(ce),Xe=[];for(let ot=0;ot<z.length;ot++){let ht=z[ot]&&z[ot].bead_id;if(typeof ht=="string"&&xe.has(ht)){fe.add(ht);continue}let gt=E(z[ot],_,ot,z.length);gt&&(Xe.push(gt),V.push(gt))}Xe.length===0&&ce.length===0&&(ut<=1||p>=ut)||De.push({id:_,index:p,items:Xe,raw_length:z.length,occupied_by:ce,occupants:ce.map(ot=>he(ot)),corrections:Array.isArray(K.corrections)?K.corrections.length:0,cycle:K.cycle===!0,...Xe.length===0&&ce.length===0?{empty:!0}:{}})}R.set(U,De);let h=Array.from({length:ut},(p,_)=>{let S=`s${_+1}`,z=Kt.get(S),K=z&&Array.isArray(z.entries)?z.entries:[],ce=lt(Wt[S]);return{id:S,index:K.length,length:K.length,occupied_by:Array.isArray(ce.occupied_by)?ce.occupied_by.filter(xe=>typeof xe=="string"):[]}});for(let p of Array.isArray(y.runnable)?y.runnable:[]){let _=p&&p.bead_id;if(typeof _!="string"||fe.has(_))continue;fe.add(_);let S=p.workflow&&typeof p.workflow=="object"?p.workflow:null,z=S&&typeof S.route=="string"&&S.route||(typeof p.route=="string"?p.route:null),K=cg(lt(Ie),p.exec_pins,z),ce=Co(p.rec,p.exec_pins);Array.isArray(p.blocked_by)&&p.blocked_by.length>0&&te.set(_,p.blocked_by.filter(A=>typeof A=="string"&&A.length>0)),typeof p.title=="string"&&p.title.length>0&&T.set(_,p.title),Array.isArray(p.scope)&&Se.set(_,p.scope.filter(A=>typeof A=="string"&&A.length>0));let xe=p.eligible!==!1,Xe=p.worker_ineligible===!0,ot=Object.hasOwn(p,"eligible"),ht=[];typeof p.reason=="string"&&p.reason.length>0&&ht.push(p.reason);let gt=Gu(Mt,_);gt&&ht.push(gt);let x=ug(_,p.release_info,f)?.map(A=>({...A,...Vu({id:_,root_dir:U},A.id)}));w.push({...Ft(_),title:p.title||pt[_]||_,lane:"runnable",draggable:!ot,queue_placeable:xe&&!Xe,...Xe?{worker_ineligible:!0}:{},...p.session_preferred===!0?{session_preferred:!0,session_preferred_reason:typeof p.session_preferred_reason=="string"?p.session_preferred_reason:""}:{},...p.spec_after_blocker===!0?{spec_after_blocker:!0}:{},...x?{dependency_chips:{released:x}}:{},...p.dependents_info&&typeof p.dependents_info=="object"?{dependents_info:p.dependents_info}:{},reason:ht.join(" \xB7 "),created_at:p.created_at??void 0,updated_at:p.updated_at??void 0,status:typeof p.status=="string"?p.status:void 0,labels:Array.isArray(p.labels)?p.labels:[],spec_id:typeof p.spec_id=="string"?p.spec_id:"",published:p.published===!0,workflow:S||(z?{route:z,chips:{route:z}}:null),...K?{exec_chips:K}:{},...ce?{rec:ce}:{},blocked:p.blocked===!0,...Array.isArray(p.blocked_by)?{blocked_by:p.blocked_by.filter(A=>typeof A=="string"&&A.length>0)}:{},place_index:vt.length,place_lanes:h})}for(let p of zt){let _=p&&p.bead_id;if(typeof _!="string"||fe.has(_)||(fe.add(_),s!==void 0&&typeof p.added_at=="number"&&p.added_at<s))continue;let S=ng(Ke,_),z=S&&typeof S.done_kind=="string"?S.done_kind:null;se.push({...Ft(_),lane:"done",done:!0,done_layout:"three_line",usage:Hn(Ke,_),work_ms:Tu(Ke,_),done_at:typeof p.added_at=="number"?p.added_at:void 0,done_kind:z,...Jt(_),badges:[...z&&Wu[z]?[Wu[z]]:[],...Su(Ke,_)]})}for(let p of Array.isArray(y.session_done)?y.session_done:[]){let _=p&&(p.id||p.bead_id);typeof _!="string"||fe.has(_)||(fe.add(_),se.push({...Ft(_),...p,id:_,root_dir:U,workspace_name:Oe,expected_revision:Ue,lane:"done",done:!0}))}}if(G.size>0)for(let y of[...w,...V,...C,...F,...se]){let U=G.get(`${y.root_dir}\0${y.id}`);if(!U||(typeof U.priority=="number"&&(y.priority=U.priority),typeof U.from_id=="string"&&U.from_id.length>0&&(y.from_id=U.from_id),y.lane==="done"&&Array.isArray(U.carried_to)&&U.carried_to.length>0&&(y.carried_to=U.carried_to),!Object.hasOwn(U,"metadata")))continue;let Oe=lt(U.metadata);if(y.rec=Co(Oe),y.lane==="runnable"||y.lane.startsWith("s")||y.lane==="queue"){let Ie=fg(lt(g.get(y.root_dir)),Oe,typeof U.route=="string"&&U.route.length>0?U.route:lt(y.workflow).route);Ie&&(y.exec_chips=Ie)}}let ee=new Map;o.forEach((y,U)=>{y&&typeof y.root_dir=="string"&&ee.set(y.root_dir,U)});let me=n&&n.running_sort==="repo"?"repo":"started";C.sort((y,U)=>{let Oe=y.kind==="session",Ie=U.kind==="session";if(Oe!==Ie)return Oe?1:-1;if(Oe&&Ie){let pt=ci(U.updated_at)-ci(y.updated_at);return pt!==0?pt:y.id.localeCompare(U.id)}if(me==="repo"){let pt=ee.get(y.root_dir)??Number.MAX_SAFE_INTEGER,Et=ee.get(U.root_dir)??Number.MAX_SAFE_INTEGER;if(pt!==Et)return pt-Et}let Ue=typeof y.started_at=="number"&&Number.isFinite(y.started_at)?y.started_at:null,Ke=typeof U.started_at=="number"&&Number.isFinite(U.started_at)?U.started_at:null;return Ue!==null&&Ke!==null&&Ue!==Ke?Ue-Ke:Ue===null&&Ke!==null?1:Ue!==null&&Ke===null?-1:y.id.localeCompare(U.id)}),se.sort((y,U)=>(U.done_at??0)-(y.done_at??0));let ve=o.length>0?o:r.map(y=>({root_dir:y&&y.root_dir,name:y&&y.name,auto_advance:y&&y.auto_advance,auto_merge:y&&y.auto_merge,slots:y&&y.slots,revision:y&&y.revision,runner_catalog:y&&y.runner_catalog})),Ce=new Set(w.map(y=>y.root_dir)),_e=new Map;for(let y of C)y.kind==="session"||y.run_state!=="running"||_e.set(y.root_dir,(_e.get(y.root_dir)||0)+1);let Re=new Map;for(let y of se){let U=Re.get(y.root_dir);U?U.push(y):Re.set(y.root_dir,[y])}let Ye={positions:new Map,resolutions:new Map,continuations:new Map,authorities:new Map,state:{active:null,failures:{},waiting:null},auto_excluded:[],running:!1},it=[];for(let y of ve){if(!y||typeof y.root_dir!="string")continue;let U=N.get(y.root_dir)||[],Oe=R.get(y.root_dir)||[],Ie=U.length>0||Oe.some(pt=>pt.items.length>0||pt.occupied_by.length>0);if(u!=="all"&&!Ie&&!Ce.has(y.root_dir))continue;let Ue=typeof y.slots=="number"&&y.slots>=ui?y.slots:ui,Ke=_e.get(y.root_dir)||0;it.push({live_count:Ke,over_cap:Ke>Ue,merge:Y.get(y.root_dir)||Ye,token_total:mg(Re.get(y.root_dir)||[]),cleanup_failures:Q.get(y.root_dir)||[],declared_base:P.get(y.root_dir)??null,repo_operations:H.get(y.root_dir)||[],root_dir:y.root_dir,name:y.name||y.root_dir,auto_advance:y.auto_advance===!0,auto_merge:y.auto_merge===!0,slots:Ue,revision:typeof y.revision=="number"?y.revision:0,runner_catalog:lt(y.runner_catalog),items:U,sublanes:{parallel:U,serial:Oe},serial_lane_count:L.get(y.root_dir)||0,raw_queue_length:B.get(y.root_dir)||0})}let I={runnable:w,runnable_all:w,runnable_hidden:{blocked:0,spec:0},runnable_sections:[],runnable_flat:a==="updated_flat"||a==="as_given",queue:V,queue_groups:it,running:C,pr_wait:F,done:se,parallel_rows:[],chain_lanes:[],cross_lanes_revision:l&&typeof l.revision=="number"?l.revision:null,cross_lanes_unreadable:l===null,parallel_raw_length:Object.fromEntries(B),owner_of:{}},ue=yu(I);for(let y of j)ue.has(y.id)||ue.set(y.id,{root_dir:y.root_dir,workspace_name:y.workspace_name,lane:"done",state:"done"});for(let y of[...I.queue,...I.runnable,...I.running,...I.pr_wait]){if(!Object.hasOwn(y,"blocked_by"))continue;let U=ue.get(y.id);y.blockers=(y.blocked_by||[]).map(Oe=>vu(Oe,U,ue,o))}for(let y of[...I.queue,...I.runnable,...I.running,...I.pr_wait]){let U=(y.blockers||[]).map(Ue=>({...La(y.id,Ue),...Vu(y,Ue.id,ue)})),Oe=Bu(y.id,$g(ke.get(y.id),y.dependents_info,y,ue));if(U.length===0&&Oe.length===0)continue;let Ie={...y.dependency_chips||{},...U.length>0?{predecessors:U}:{},...Oe.length>0?{dependents:Oe}:{}};y.dependency_chips=Ie}kg(I,be,Se,ue,o);let ne=wu(I.queue_groups);for(let y of I.queue_groups)for(let U of y.sublanes.serial){let Oe=ne.get(ku(y.root_dir,U.id));Oe&&(U.cross_wait_peers=Oe)}I.chain_lanes=vg(l&&Array.isArray(l.lanes)?l.lanes:[],te,ue,o,T,m,{armed_by_bead:Ee,failed_by_bead:oe,disarmed_lanes:D});let de=new Map;for(let y of[...I.queue,...I.runnable])de.has(y.id)||de.set(y.id,y);let Ae=new Set;for(let y of I.chain_lanes)for(let U of y.rows){if(y.status==="confirmed"&&!U.unplaced&&!U.fixed&&Ae.add(U.id),!y.draft&&!U.unplaced)continue;let Oe=de.get(U.id);Oe&&(Oe.cross_lane_chip={lane_id:y.lane_id,number:y.number,status:y.status,label:y.draft?`\uC5F0\uACB0 ${y.number} (draft)`:`\uC5F0\uACB0 ${y.number}`})}let ge=new Map(I.chain_lanes.map(y=>[y.lane_id,y.number]));for(let y of[...I.queue,...I.running]){let U=Ee.get(y.id);if(typeof U!="string"||U.length===0)continue;let Oe=ge.get(U);y.armed_lane_chip=Oe===void 0?{lane_id:U,label:"\u25B6 \uC9C4\uD589 \uC911 \xB7 \uB808\uC778 \uC5C6\uC74C",orphan:!0}:{lane_id:U,label:`\u25B6 \uC5F0\uACB0 ${Oe}`,orphan:!1}}let Ne=[];for(let y of N.values())for(let U of y)Ae.has(U.id)||Ne.push(U);Ne.sort((y,U)=>{let Oe=y.workspace_name.localeCompare(U.workspace_name);return Oe!==0?Oe:(y.queue_index??0)-(U.queue_index??0)}),I.parallel_rows=Ne;let qe={};for(let[y,U]of ue)typeof U.root_dir=="string"&&U.root_dir.length>0&&(qe[y]=U.root_dir);for(let y of I.chain_lanes)for(let U of y.rows)!Object.hasOwn(qe,U.id)&&U.root_dir.length>0&&m.has(U.root_dir)&&(qe[U.id]=U.root_dir);I.owner_of=qe;let Ze=I.runnable.length;I.runnable_all=I.runnable.slice();let Fe=I.runnable,Z=y=>i.show_blocked||y.blocked!==!0,X=y=>i.spec==="all"||(i.spec==="with"?y.published===!0:y.published!==!0);if(d==="per_control"){let y=[],U=0,Oe=0;for(let Ie of Fe){let Ue=Z(Ie),Ke=X(Ie);Ue&&Ke?y.push(Ie):!Ue&&Ke?U+=1:Ue&&!Ke&&(Oe+=1)}Fe=y,I.runnable_hidden={blocked:U,spec:Oe}}else{Fe=Fe.filter(Z);let y=Fe.length;Fe=Fe.filter(X),I.runnable_hidden={blocked:Ze-y,spec:y-Fe.length}}let Te=(y,U)=>{let Oe=ci(U.updated_at)-ci(y.updated_at);return Oe!==0?Oe:y.id.localeCompare(U.id)},at=a==="repo_spec"?(y,U)=>{let Oe=y.published===!0?0:1,Ie=U.published===!0?0:1;return Oe!==Ie?Oe-Ie:Te(y,U)}:Te;if(a==="as_given")I.runnable=Fe,I.runnable_sections=[];else if(a==="updated_flat")I.runnable=Fe.slice().sort(Te),I.runnable_sections=[];else{let y=new Map;for(let Ie of Fe){let Ue=y.get(Ie.root_dir);Ue?Ue.push(Ie):y.set(Ie.root_dir,[Ie])}let U=[],Oe=[];for(let Ie of ve){if(!Ie||typeof Ie.root_dir!="string")continue;let Ue=(y.get(Ie.root_dir)||[]).slice().sort(at);y.delete(Ie.root_dir),Ue.length!==0&&(U.push({root_dir:Ie.root_dir,name:Ie.name||Ie.root_dir,items:Ue.map(Ke=>({...Ke,workspace_name:""}))}),Oe.push(...Ue))}for(let[Ie,Ue]of y){let Ke=Ue.slice().sort(at);U.push({root_dir:Ie,name:Ke[0]?.workspace_name||Ie,items:Ke.map(pt=>({...pt,workspace_name:""}))}),Oe.push(...Ke)}I.runnable=Oe,I.runnable_sections=U}return I}function Zu(e,t){let n=new Map(e.map((a,u)=>[a,u])),r=new Map(e.map(a=>[a,new Set]));for(let a of t)a.blocker!==a.blockee&&n.has(a.blocker)&&n.has(a.blockee)&&r.get(a.blockee).add(a.blocker);let o=new Set,s=[];for(;s.length<e.length;){let a=e.find(u=>{if(o.has(u))return!1;for(let d of r.get(u))if(!o.has(d))return!1;return!0});if(a===void 0)return{order:[...e],corrections:[],cycle:!0};o.add(a),s.push(a)}let i=[],l=new Map(s.map((a,u)=>[a,u]));for(let a of s){let u=null;for(let d of r.get(a)){let f=Number(n.get(a))<Number(n.get(d)),g=Number(l.get(a))>Number(l.get(d));f&&g&&(u===null||Number(l.get(d))>Number(l.get(u)))&&(u=d)}u!==null&&i.push({bead_id:a,after:u})}return{order:s,corrections:i,cycle:!1}}var xg="\uB2E4\uB978 \uB808\uD3EC \uC774\uC288\uB294 \uC774 \uC9C1\uB82C \uB808\uC778\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",pi="\uC758\uC874 \uC790\uB8CC \uBBF8\uD655\uC815 \u2014 \uAD50\uC815 \uBCF4\uB958",Ag="Worker \uD0ED \uC9C1\uB82C \uB808\uC778\uC5D0\uC11C \uBA3C\uC800 \uBE7C \uC8FC\uC138\uC694",Sg="\uC774\uBBF8 \uC9C4\uD589 \uC911\uC778 \uC774\uC288 \uC55E\uC5D0\uB294 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",io="\uC5F0\uACB0 \uB808\uC778\uC774 \uC5C6\uC2B5\uB2C8\uB2E4";function No(e,t){return`${e}\0${t}`}function Eg(e,t){let n=new Set(e),r=new Map;for(let o of e){let s=t.placed_members.has(o)?t.snapshot_blocked_by:t.runnable_blocked_by,i=s instanceof Map?s.get(o):void 0;if(!Array.isArray(i))return null;r.set(o,i.filter(l=>l!==o&&n.has(l)))}return r}function Tg(e,t){if(e.status!=="confirmed")return 0;let n=-1;return e.entries.forEach((r,o)=>{t.fixed_members.has(r.bead_id)&&(n=o)}),n+1}function Fo(e,t){let n=e.entries,r=n.map(f=>f.bead_id),o=Eg(r,t);if(o===null)return{entries:n,corrections:[],cycle:!1,held:!0,mismatched:[]};let s=[];for(let[f,g]of o)for(let m of g)s.push({blocker:m,blockee:f});let i=Tg(e,t),l=new Map(r.map((f,g)=>[f,g])),a=r.slice(0,i).filter(f=>o.get(f).some(g=>Number(l.get(g))>Number(l.get(f)))),u=Zu(r.slice(i),s);if(u.cycle)return{entries:n,corrections:[],cycle:!0,held:!1,mismatched:a};let d=new Map(n.map(f=>[f.bead_id,f]));return{entries:[...n.slice(0,i),...u.order.map(f=>d.get(f))],corrections:u.corrections,cycle:!1,held:!1,mismatched:a}}function Ju(e,t){let n=t.cross_lanes.get(e);return n===void 0?null:Fo(n,t)}function Cg(e,t){if(!(t.corrections.length===0&&!t.cycle&&!t.held&&t.mismatched.length===0))return{lane_id:e,corrected:t.corrections.length,cycle:t.cycle,held:t.held,mismatched:t.mismatched}}function Rg(e){return`${e}\uC758 \uB808\uD3EC\uB97C \uC54C \uC218 \uC5C6\uC5B4 \uC758\uC874\uC744 \uBC14\uAFC0 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4`}function Og(e){let t=new Map;for(let[n,r]of e)t.set(n,r.slice());return t}function ja(e,t,n){let r=new Set([t]),o=[t];for(;o.length>0;){let s=o.pop();for(let i of e.get(s)||[]){if(i===n)return!0;r.has(i)||(r.add(i),o.push(i))}}return!1}function Ig(e,t){let n=new Set;for(let[i,l]of t)for(let a of l)n.add(No(i,a));let r=new Map,o=new Map;for(let i of e){let l=No(i.a,i.b);r.set(l,i),o.set(l,i.type==="dep-add")}let s=[];for(let i of e){let l=No(i.a,i.b);r.get(l)===i&&o.get(l)!==n.has(l)&&s.push(i)}return s}function Lg(e,t,n){let r=e.parallel_rows,o=Math.max(0,Math.min(r.length,n)),s=r[o];if(s&&s.root_dir===t)return s.queue_index;for(let i=o-1;i>=0;i--)if(r[i].root_dir===t)return r[i].queue_index+1;for(let i=o;i<r.length;i++)if(r[i].root_dir===t)return r[i].queue_index;return e.parallel_raw_length.get(t)??0}function Pg(e,t){return e.parallel_rows.some(n=>n.root_dir===t)}function di(e,t,n,r){return{type:"worker-queue-place",payload:{bead_id:e,...r?{lane:r}:{},index:n},root_dir:t}}function Fa(e,t){let n=0;for(let r of e.cross_lanes.keys())if(n+=1,r===t)return n;return n+1}function Bo(e){let t=Og(e.blocked_by_map),n=[],r=new Set,o={refusal:null},s=u=>{let d=e.owner_of.get(u);return typeof d!="string"||d.length===0?(o.refusal=Rg(u),null):d};return{graph:t,dep_ops:n,state:o,ownerOf:s,addDep:(u,d,f)=>{if(o.refusal!==null||u===d)return;let g=t.get(u)||[];if(g.includes(d))return;let m=s(u);if(m!==null){if(ja(t,d,u)){o.refusal=`\uC758\uC874 \uC0AC\uC774\uD074\uC774 \uC0DD\uAE41\uB2C8\uB2E4 \u2014 ${u}\uAC00 \uC774\uBBF8 ${d}\uB97C \uB9C9\uACE0 \uC788\uC2B5\uB2C8\uB2E4`;return}t.set(u,[...g,d]),f!==void 0&&r.add(No(u,d)),n.push({type:"dep-add",a:u,b:d,root_dir:m,...f===void 0?{}:{lane_id:f}})}},removeDep:(u,d)=>{if(o.refusal!==null||u===d)return;let f=t.get(u)||[];if(!f.includes(d))return;let g=s(u);g!==null&&(t.set(u,f.filter(m=>m!==d)),n.push({type:"dep-remove",a:u,b:d,root_dir:g}))},laneCreated:(u,d)=>r.has(No(u,d))}}function Uo(e,t,n,r,o={}){if(e.state.refusal!==null)return{refused:e.state.refusal};let s=Ig(e.dep_ops,t.blocked_by_map),i=s.filter(d=>d.type==="dep-remove"),l=s.filter(d=>d.type==="dep-add"),a=o.disarm_ops??[],u=o.lane_id===void 0||o.correction===void 0?void 0:Cg(o.lane_id,o.correction);return{lane_ops:n,ops:[...i,...a,...l,...r],lane_op_index:i.length+a.length,...u===void 0?{}:{correction:u}}}function ed(e,t,n){for(let r=1;r<t.length;r+=1)e.addDep(t[r].bead_id,t[r-1].bead_id,n)}function qo(e,t){return t>0&&e.entries[t]?.dep_created_by_lane===!0}function td(e,t,n,r){if(t.status!=="confirmed")return[];let o=[],s=new Map;for(let i of r){let l=e.owner_of.get(i.bead_id)||i.root_dir;typeof l!="string"||l.length===0||s.set(l,[...s.get(l)||[],i.bead_id])}for(let[i,l]of s)o.push({type:"worker-queue-disarm",payload:{bead_ids:l,lane_id:n},root_dir:i});return o}function nd(e,t,n,r){let o=new Map;for(let s of n){if(t.placed_members.has(s.bead_id))continue;let i=e.ownerOf(s.bead_id);if(i===null)return;let l=o.get(i)??0;r.push(di(s.bead_id,i,(t.parallel_raw_length.get(i)??0)+l)),o.set(i,l+1)}}function jo(e){return e.map(t=>({bead_id:t.bead_id,root_dir:t.root_dir}))}function fi(e,t){return e.length===t.length&&e.every((n,r)=>n.bead_id===t[r].bead_id&&n.root_dir===t[r].root_dir)}function _i(e,t,n){let r=Bo(n),o=[],s=[],i=[],l,a=n.owner_lane_of.get(e.bead_id),u=e.kind==="chain"?e.lane_id??a:void 0,d=u===void 0?void 0:n.cross_lanes.get(u);if(t.kind==="repo-serial"&&e.root_dir!==t.root_dir)return{refused:xg};if(t.kind==="chain"){if(e.kind==="repo-serial")return{refused:Ag};if(e.kind!=="chain"&&typeof a=="string"&&a!==t.lane_id&&n.cross_lanes.has(a))return{refused:`\uC774\uBBF8 \uC5F0\uACB0 ${Fa(n,a)}\uC5D0 \uC788\uC2B5\uB2C8\uB2E4`};if(!n.cross_lanes.has(t.lane_id))return{refused:io}}if(e.kind==="chain"&&d===void 0)return{refused:io};let f=()=>{if(d===void 0||d.status!=="confirmed")return;let w=d.entries.findIndex(j=>j.bead_id===e.bead_id);if(w<0)return;let C=w>0?d.entries[w-1]:null,F=w+1<d.entries.length?d.entries[w+1]:null,V=qo(d,w),se=F!==null&&qo(d,w+1);V&&C!==null&&r.removeDep(e.bead_id,C.bead_id),se&&F!==null&&r.removeDep(F.bead_id,e.bead_id),(V||se)&&C!==null&&F!==null&&r.addDep(F.bead_id,C.bead_id,u)},g=(w,C)=>{let F=n.cross_lanes.get(w),V=F.entries.findIndex(P=>P.bead_id===e.bead_id),se=F.entries.filter(P=>P.bead_id!==e.bead_id),j=Math.max(0,Math.min(se.length,V>=0&&C>V?C-1:C)),N=-1;if(se.forEach((P,H)=>{n.fixed_members.has(P.bead_id)&&(N=H)}),j<=N){r.state.refusal=Sg;return}let R=V>=0?F.entries[V]:d?.entries.find(P=>P.bead_id===e.bead_id)??{bead_id:e.bead_id,root_dir:e.root_dir};l=Fo({status:F.status,entries:[...se.slice(0,j),R,...se.slice(j)]},n);let L=l.entries;if(fi(L,F.entries)||o.push({type:"monitor-lane-update",payload:{lane_id:w,entries:jo(L)}}),F.status!=="confirmed")return;let B=L.findIndex(P=>P.bead_id===e.bead_id),Y=B>0?L[B-1].bead_id:null,Q=B+1<L.length?L[B+1].bead_id:null;if(Y===null){Q!==null&&r.addDep(Q,e.bead_id,w);return}if(r.addDep(e.bead_id,Y,w),Q!==null&&(r.graph.get(Q)||[]).includes(Y)){let P=F.entries.findIndex(H=>H.bead_id===Q);(r.laneCreated(Q,Y)||P>0&&F.entries[P-1].bead_id===Y&&qo(F,P))&&r.removeDep(Q,Y),r.addDep(Q,e.bead_id,w)}},m=typeof e.queue_index=="number"?e.queue_index:n.queue_index_of.get(e.bead_id);if(e.kind==="chain"&&(f(),d!==void 0&&(t.kind!=="chain"||t.lane_id!==u)&&(i.push(...td(n,d,u,d.entries.filter(w=>w.bead_id===e.bead_id))),o.push({type:"monitor-lane-update",payload:{lane_id:u,entries:jo(d.entries.filter(w=>w.bead_id!==e.bead_id))}}))),t.kind==="chain"&&g(t.lane_id,t.marker_index),r.state.refusal!==null)return{refused:r.state.refusal};if(t.kind==="candidate")e.kind!=="candidate"&&s.push({type:"worker-queue-remove",payload:{bead_id:e.bead_id},root_dir:e.root_dir});else if(t.kind==="parallel"){let w=Lg(n,e.root_dir,t.marker_index);if(e.kind==="candidate"||e.kind==="repo-serial")s.push(di(e.bead_id,e.root_dir,w));else if(e.kind==="parallel"){let C=n.parallel_rows,F=C[Math.max(0,Math.min(C.length,t.marker_index))];if(!(!!F&&F.bead_id===e.bead_id)&&Pg(n,e.root_dir)&&m!==void 0){let se=m>w?w:w-1;se>=0&&se!==m&&s.push({type:"worker-queue-reorder",payload:{bead_id:e.bead_id,to_index:se},root_dir:e.root_dir})}}}else if(t.kind==="chain"){let w=n.cross_lanes.get(t.lane_id);e.kind==="candidate"&&w.status==="confirmed"&&s.push(di(e.bead_id,e.root_dir,n.parallel_raw_length.get(e.root_dir)??0))}else if(e.kind==="repo-serial"&&e.lane_id===t.lane_id){if(m!==void 0&&t.index!==m){let w=m>t.index?t.index:t.index-1;w>=0&&w!==m&&s.push({type:"worker-queue-reorder",payload:{bead_id:e.bead_id,lane:t.lane_id,to_index:w},root_dir:e.root_dir})}}else s.push(di(e.bead_id,e.root_dir,t.index,t.lane_id));return Uo(r,n,o,s,{disarm_ops:i,...t.kind==="chain"?{lane_id:t.lane_id,correction:l}:{}})}function rd(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:io};if(n.entries.length<2)return{refused:"\uD655\uC815\uD558\uB824\uBA74 \uBA64\uBC84\uAC00 2\uAC1C \uC774\uC0C1\uC774\uC5B4\uC57C \uD569\uB2C8\uB2E4"};let r=Fo(n,t);if(r.held)return{refused:pi};let o=r.entries,s=Bo(t),i=[];ed(s,o,e),s.state.refusal===null&&nd(s,t,o,i);let l=fi(o,n.entries)?[]:[{type:"monitor-lane-update",payload:{lane_id:e,entries:jo(o)}}];return l.push({type:"monitor-lane-confirm",payload:{lane_id:e}}),Uo(s,t,l,i,{lane_id:e,correction:r})}function od(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:io};let r=Fo(n,t),o=r.entries,s=Bo(t),i=[];ed(s,o,e),s.state.refusal===null&&nd(s,t,o,i);let l=fi(o,n.entries)?[]:[{type:"monitor-lane-update",payload:{lane_id:e,entries:jo(o)}}];return Uo(s,t,l,i,{lane_id:e,correction:r})}function sd(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:io};let r=Fo(n,t),o=r.entries;return Uo(Bo(t),t,fi(o,n.entries)?[]:[{type:"monitor-lane-update",payload:{lane_id:e,entries:jo(o)}}],[],{lane_id:e,correction:r})}function id(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:io};let r=Bo(t);if(n.status==="confirmed")for(let o=1;o<n.entries.length;o+=1)qo(n,o)&&r.removeDep(n.entries[o].bead_id,n.entries[o-1].bead_id);return Uo(r,t,[{type:"monitor-lane-remove",payload:{lane_id:e}}],[],{disarm_ops:td(t,n,e,n.entries)})}function ad(e,t){let n=t.cross_lanes.get(e);if(n===void 0||n.status!=="confirmed")return null;let r=[],o=[];for(let i=1;i<n.entries.length;i+=1){let l=`  ${n.entries[i].bead_id} \u2190 ${n.entries[i-1].bead_id}`;qo(n,i)?r.push(l):o.push(`${l} (\uB808\uC778\uC774 \uB9CC\uB4E4\uC9C0 \uC54A\uC74C)`)}let s=`\uC5F0\uACB0 ${Fa(t,e)}\uC744 \uC9C0\uC6C1\uB2C8\uB2E4.`;return r.length===0?`${s}
\uC758\uC874\uC740 \uADF8\uB300\uB85C \uB461\uB2C8\uB2E4`:[s,"\uD568\uAED8 \uC81C\uAC70\uD560 \uC758\uC874:",...r,...o.length===0?[]:["\uADF8\uB300\uB85C \uB450\uB294 \uC758\uC874:",...o]].join(`
`)}function ld(e){let t=new Map;for(let n of e)n.type!=="dep-add"||typeof n.lane_id!="string"||t.set(n.lane_id,[...t.get(n.lane_id)||[],{bead_id:n.a,after:n.b}]);return[...t].map(([n,r])=>({lane_id:n,pairs:r}))}function cd(e,t){let n=new Map(e.map((r,o)=>[r.bead_id,o]));return t.filter(r=>{let o=n.get(r.bead_id);return o!==void 0&&o>0&&e[o-1].bead_id===r.after})}function Ba(e,t){if(e!==null){let n=t.owner_lane_of.get(e.bead_id);if(typeof n=="string"&&t.cross_lanes.has(n))return{refused:`\uC774\uBBF8 \uC5F0\uACB0 ${Fa(t,n)}\uC5D0 \uC788\uC2B5\uB2C8\uB2E4`}}return{lane_ops:[{type:"monitor-lane-create",payload:{entries:e===null?[]:[e]}}],ops:[],lane_op_index:0}}var Dg="\uC0AC\uC774\uD074";function Mg(e){let t=new Map,n=r=>Array.isArray(r)?r.filter(o=>typeof o=="string"&&o.length>0):[];for(let r of Array.isArray(e)?e:[]){if(!r||typeof r!="object")continue;let o=r.bead_blocked_by&&typeof r.bead_blocked_by=="object"?r.bead_blocked_by:{};for(let[s,i]of Object.entries(o))Array.isArray(i)&&t.set(s,n(i));for(let s of[...Array.isArray(r.runnable)?r.runnable:[],...Array.isArray(r.session_active)?r.session_active:[]])s&&typeof s.bead_id=="string"&&Array.isArray(s.blocked_by)&&s.blocked_by.length>0&&t.set(s.bead_id,n(s.blocked_by))}return t}function Ua(e,t,n){let r=ar(e,t),o=[],s=new Set,i=(a,u)=>{for(let d of a)s.has(d.id)||(s.add(d.id),o.push({bead_id:d.id,root_dir:d.root_dir,workspace_name:d.workspace_name,title:d.title,lane:u}))};i(r.running,"running"),i(r.pr_wait,"pr_wait"),i(r.queue,"queue"),i(r.runnable_all,"runnable");let l=n&&typeof n.root_dir=="string"&&n.root_dir.length?n.root_dir:null;return{issues:l===null?o:o.filter(a=>a.root_dir===l),blocked_by_map:Mg(e)}}function ud(e,t){let n=new Map;for(let i of t.issues)!i||typeof i.bead_id!="string"||i.bead_id.length===0||n.has(i.bead_id)||n.set(i.bead_id,i);let r=n.get(e)?.root_dir,o=t.blocked_by_map.get(e)||[],s=[];for(let i of n.values()){if(i.bead_id===e||i.lane==="done"||o.includes(i.bead_id))continue;let l=ja(t.blocked_by_map,i.bead_id,e);s.push({...i,disabled:l,...l?{reason:Dg}:{}})}return s.sort((i,l)=>{let a=r!==void 0&&i.root_dir===r,u=r!==void 0&&l.root_dir===r;return a!==u?a?-1:1:i.bead_id.localeCompare(l.bead_id)}),s}function dd(e,t){let n=t.trim().toLowerCase();return n.length===0?e.slice():e.filter(r=>r.bead_id.toLowerCase().includes(n)||r.title.toLowerCase().includes(n))}var{entries:vd,setPrototypeOf:pd,isFrozen:Ng,getPrototypeOf:qg,getOwnPropertyDescriptor:jg}=Object,{freeze:ln,seal:wn,create:Va}=Object,{apply:Xa,construct:Qa}=typeof Reflect<"u"&&Reflect;ln||(ln=function(t){return t});wn||(wn=function(t){return t});Xa||(Xa=function(t,n){for(var r=arguments.length,o=new Array(r>2?r-2:0),s=2;s<r;s++)o[s-2]=arguments[s];return t.apply(n,o)});Qa||(Qa=function(t){for(var n=arguments.length,r=new Array(n>1?n-1:0),o=1;o<n;o++)r[o-1]=arguments[o];return new t(...r)});var mi=cn(Array.prototype.forEach),Fg=cn(Array.prototype.lastIndexOf),fd=cn(Array.prototype.pop),Wo=cn(Array.prototype.push),Bg=cn(Array.prototype.splice),hi=cn(String.prototype.toLowerCase),Wa=cn(String.prototype.toString),za=cn(String.prototype.match),zo=cn(String.prototype.replace),Ug=cn(String.prototype.indexOf),Wg=cn(String.prototype.trim),En=cn(Object.prototype.hasOwnProperty),an=cn(RegExp.prototype.test),Ho=zg(TypeError);function cn(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var n=arguments.length,r=new Array(n>1?n-1:0),o=1;o<n;o++)r[o-1]=arguments[o];return Xa(e,t,r)}}function zg(e){return function(){for(var t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];return Qa(e,n)}}function ft(e,t){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:hi;pd&&pd(e,null);let r=t.length;for(;r--;){let o=t[r];if(typeof o=="string"){let s=n(o);s!==o&&(Ng(t)||(t[r]=s),o=s)}e[o]=!0}return e}function Hg(e){for(let t=0;t<e.length;t++)En(e,t)||(e[t]=null);return e}function Vn(e){let t=Va(null);for(let[n,r]of vd(e))En(e,n)&&(Array.isArray(r)?t[n]=Hg(r):r&&typeof r=="object"&&r.constructor===Object?t[n]=Vn(r):t[n]=r);return t}function Go(e,t){for(;e!==null;){let r=jg(e,t);if(r){if(r.get)return cn(r.get);if(typeof r.value=="function")return cn(r.value)}e=qg(e)}function n(){return null}return n}var _d=ln(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),Ha=ln(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),Ga=ln(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),Gg=ln(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),Ka=ln(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),Kg=ln(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),md=ln(["#text"]),gd=ln(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),Ya=ln(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),hd=ln(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),gi=ln(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),Yg=wn(/\{\{[\w\W]*|[\w\W]*\}\}/gm),Vg=wn(/<%[\w\W]*|[\w\W]*%>/gm),Xg=wn(/\$\{[\w\W]*/gm),Qg=wn(/^data-[\-\w.\u00B7-\uFFFF]+$/),Zg=wn(/^aria-[\-\w]+$/),wd=wn(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),Jg=wn(/^(?:\w+script|data):/i),eh=wn(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),kd=wn(/^html$/i),th=wn(/^[a-z][.\w]*(-[.\w]+)+$/i),bd=Object.freeze({__proto__:null,ARIA_ATTR:Zg,ATTR_WHITESPACE:eh,CUSTOM_ELEMENT:th,DATA_ATTR:Qg,DOCTYPE_NAME:kd,ERB_EXPR:Vg,IS_ALLOWED_URI:wd,IS_SCRIPT_OR_DATA:Jg,MUSTACHE_EXPR:Yg,TMPLIT_EXPR:Xg}),Ko={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,progressingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},nh=function(){return typeof window>"u"?null:window},rh=function(t,n){if(typeof t!="object"||typeof t.createPolicy!="function")return null;let r=null,o="data-tt-policy-suffix";n&&n.hasAttribute(o)&&(r=n.getAttribute(o));let s="dompurify"+(r?"#"+r:"");try{return t.createPolicy(s,{createHTML(i){return i},createScriptURL(i){return i}})}catch{return console.warn("TrustedTypes policy "+s+" could not be created."),null}},yd=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function $d(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:nh(),t=fe=>$d(fe);if(t.version="3.3.0",t.removed=[],!e||!e.document||e.document.nodeType!==Ko.document||!e.Element)return t.isSupported=!1,t;let{document:n}=e,r=n,o=r.currentScript,{DocumentFragment:s,HTMLTemplateElement:i,Node:l,Element:a,NodeFilter:u,NamedNodeMap:d=e.NamedNodeMap||e.MozNamedAttrMap,HTMLFormElement:f,DOMParser:g,trustedTypes:m}=e,w=a.prototype,C=Go(w,"cloneNode"),F=Go(w,"remove"),V=Go(w,"nextSibling"),se=Go(w,"childNodes"),j=Go(w,"parentNode");if(typeof i=="function"){let fe=n.createElement("template");fe.content&&fe.content.ownerDocument&&(n=fe.content.ownerDocument)}let N,R="",{implementation:L,createNodeIterator:B,createDocumentFragment:Y,getElementsByTagName:Q}=n,{importNode:P}=r,H=yd();t.isSupported=typeof vd=="function"&&typeof j=="function"&&L&&L.createHTMLDocument!==void 0;let{MUSTACHE_EXPR:G,ERB_EXPR:te,TMPLIT_EXPR:ke,DATA_ATTR:Ee,ARIA_ATTR:oe,IS_SCRIPT_OR_DATA:D,ATTR_WHITESPACE:be,CUSTOM_ELEMENT:Se}=bd,{IS_ALLOWED_URI:T}=bd,ee=null,me=ft({},[..._d,...Ha,...Ga,...Ka,...md]),ve=null,Ce=ft({},[...gd,...Ya,...hd,...gi]),_e=Object.seal(Va(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),Re=null,Ye=null,it=Object.seal(Va(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}})),I=!0,ue=!0,ne=!1,de=!0,Ae=!1,ge=!0,Ne=!1,qe=!1,Ze=!1,Fe=!1,Z=!1,X=!1,Te=!0,He=!1,at="user-content-",y=!0,U=!1,Oe={},Ie=null,Ue=ft({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]),Ke=null,pt=ft({},["audio","video","img","source","image","track"]),Et=null,It=ft({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),Mt="http://www.w3.org/1998/Math/MathML",mt="http://www.w3.org/2000/svg",ct="http://www.w3.org/1999/xhtml",$t=ct,Ct=!1,Lt=null,ae=ft({},[Mt,mt,ct],Wa),ie=ft({},["mi","mo","mn","ms","mtext"]),$=ft({},["annotation-xml"]),q=ft({},["title","style","font","a","script"]),J=null,re=["application/xhtml+xml","text/html"],le="text/html",Be=null,Ve=null,tt=n.createElement("form"),ze=function(E){return E instanceof RegExp||E instanceof Function},xt=function(){let E=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(Ve&&Ve===E)){if((!E||typeof E!="object")&&(E={}),E=Vn(E),J=re.indexOf(E.PARSER_MEDIA_TYPE)===-1?le:E.PARSER_MEDIA_TYPE,Be=J==="application/xhtml+xml"?Wa:hi,ee=En(E,"ALLOWED_TAGS")?ft({},E.ALLOWED_TAGS,Be):me,ve=En(E,"ALLOWED_ATTR")?ft({},E.ALLOWED_ATTR,Be):Ce,Lt=En(E,"ALLOWED_NAMESPACES")?ft({},E.ALLOWED_NAMESPACES,Wa):ae,Et=En(E,"ADD_URI_SAFE_ATTR")?ft(Vn(It),E.ADD_URI_SAFE_ATTR,Be):It,Ke=En(E,"ADD_DATA_URI_TAGS")?ft(Vn(pt),E.ADD_DATA_URI_TAGS,Be):pt,Ie=En(E,"FORBID_CONTENTS")?ft({},E.FORBID_CONTENTS,Be):Ue,Re=En(E,"FORBID_TAGS")?ft({},E.FORBID_TAGS,Be):Vn({}),Ye=En(E,"FORBID_ATTR")?ft({},E.FORBID_ATTR,Be):Vn({}),Oe=En(E,"USE_PROFILES")?E.USE_PROFILES:!1,I=E.ALLOW_ARIA_ATTR!==!1,ue=E.ALLOW_DATA_ATTR!==!1,ne=E.ALLOW_UNKNOWN_PROTOCOLS||!1,de=E.ALLOW_SELF_CLOSE_IN_ATTR!==!1,Ae=E.SAFE_FOR_TEMPLATES||!1,ge=E.SAFE_FOR_XML!==!1,Ne=E.WHOLE_DOCUMENT||!1,Fe=E.RETURN_DOM||!1,Z=E.RETURN_DOM_FRAGMENT||!1,X=E.RETURN_TRUSTED_TYPE||!1,Ze=E.FORCE_BODY||!1,Te=E.SANITIZE_DOM!==!1,He=E.SANITIZE_NAMED_PROPS||!1,y=E.KEEP_CONTENT!==!1,U=E.IN_PLACE||!1,T=E.ALLOWED_URI_REGEXP||wd,$t=E.NAMESPACE||ct,ie=E.MATHML_TEXT_INTEGRATION_POINTS||ie,$=E.HTML_INTEGRATION_POINTS||$,_e=E.CUSTOM_ELEMENT_HANDLING||{},E.CUSTOM_ELEMENT_HANDLING&&ze(E.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(_e.tagNameCheck=E.CUSTOM_ELEMENT_HANDLING.tagNameCheck),E.CUSTOM_ELEMENT_HANDLING&&ze(E.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(_e.attributeNameCheck=E.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),E.CUSTOM_ELEMENT_HANDLING&&typeof E.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(_e.allowCustomizedBuiltInElements=E.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),Ae&&(ue=!1),Z&&(Fe=!0),Oe&&(ee=ft({},md),ve=[],Oe.html===!0&&(ft(ee,_d),ft(ve,gd)),Oe.svg===!0&&(ft(ee,Ha),ft(ve,Ya),ft(ve,gi)),Oe.svgFilters===!0&&(ft(ee,Ga),ft(ve,Ya),ft(ve,gi)),Oe.mathMl===!0&&(ft(ee,Ka),ft(ve,hd),ft(ve,gi))),E.ADD_TAGS&&(typeof E.ADD_TAGS=="function"?it.tagCheck=E.ADD_TAGS:(ee===me&&(ee=Vn(ee)),ft(ee,E.ADD_TAGS,Be))),E.ADD_ATTR&&(typeof E.ADD_ATTR=="function"?it.attributeCheck=E.ADD_ATTR:(ve===Ce&&(ve=Vn(ve)),ft(ve,E.ADD_ATTR,Be))),E.ADD_URI_SAFE_ATTR&&ft(Et,E.ADD_URI_SAFE_ATTR,Be),E.FORBID_CONTENTS&&(Ie===Ue&&(Ie=Vn(Ie)),ft(Ie,E.FORBID_CONTENTS,Be)),y&&(ee["#text"]=!0),Ne&&ft(ee,["html","head","body"]),ee.table&&(ft(ee,["tbody"]),delete Re.tbody),E.TRUSTED_TYPES_POLICY){if(typeof E.TRUSTED_TYPES_POLICY.createHTML!="function")throw Ho('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof E.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw Ho('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');N=E.TRUSTED_TYPES_POLICY,R=N.createHTML("")}else N===void 0&&(N=rh(m,o)),N!==null&&typeof R=="string"&&(R=N.createHTML(""));ln&&ln(E),Ve=E}},Nt=ft({},[...Ha,...Ga,...Gg]),At=ft({},[...Ka,...Kg]),Zt=function(E){let he=j(E);(!he||!he.tagName)&&(he={namespaceURI:$t,tagName:"template"});let De=hi(E.tagName),h=hi(he.tagName);return Lt[E.namespaceURI]?E.namespaceURI===mt?he.namespaceURI===ct?De==="svg":he.namespaceURI===Mt?De==="svg"&&(h==="annotation-xml"||ie[h]):!!Nt[De]:E.namespaceURI===Mt?he.namespaceURI===ct?De==="math":he.namespaceURI===mt?De==="math"&&$[h]:!!At[De]:E.namespaceURI===ct?he.namespaceURI===mt&&!$[h]||he.namespaceURI===Mt&&!ie[h]?!1:!At[De]&&(q[De]||!Nt[De]):!!(J==="application/xhtml+xml"&&Lt[E.namespaceURI]):!1},vt=function(E){Wo(t.removed,{element:E});try{j(E).removeChild(E)}catch{F(E)}},Rt=function(E,he){try{Wo(t.removed,{attribute:he.getAttributeNode(E),from:he})}catch{Wo(t.removed,{attribute:null,from:he})}if(he.removeAttribute(E),E==="is")if(Fe||Z)try{vt(he)}catch{}else try{he.setAttribute(E,"")}catch{}},Wt=function(E){let he=null,De=null;if(Ze)E="<remove></remove>"+E;else{let _=za(E,/^[\r\n\t ]+/);De=_&&_[0]}J==="application/xhtml+xml"&&$t===ct&&(E='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+E+"</body></html>");let h=N?N.createHTML(E):E;if($t===ct)try{he=new g().parseFromString(h,J)}catch{}if(!he||!he.documentElement){he=L.createDocument($t,"template",null);try{he.documentElement.innerHTML=Ct?R:h}catch{}}let p=he.body||he.documentElement;return E&&De&&p.insertBefore(n.createTextNode(De),p.childNodes[0]||null),$t===ct?Q.call(he,Ne?"html":"body")[0]:Ne?he.documentElement:p},ut=function(E){return B.call(E.ownerDocument||E,E,u.SHOW_ELEMENT|u.SHOW_COMMENT|u.SHOW_TEXT|u.SHOW_PROCESSING_INSTRUCTION|u.SHOW_CDATA_SECTION,null)},Kt=function(E){return E instanceof f&&(typeof E.nodeName!="string"||typeof E.textContent!="string"||typeof E.removeChild!="function"||!(E.attributes instanceof d)||typeof E.removeAttribute!="function"||typeof E.setAttribute!="function"||typeof E.namespaceURI!="string"||typeof E.insertBefore!="function"||typeof E.hasChildNodes!="function")},Yt=function(E){return typeof l=="function"&&E instanceof l};function zt(fe,E,he){mi(fe,De=>{De.call(t,E,he,Ve)})}let _n=function(E){let he=null;if(zt(H.beforeSanitizeElements,E,null),Kt(E))return vt(E),!0;let De=Be(E.nodeName);if(zt(H.uponSanitizeElement,E,{tagName:De,allowedTags:ee}),ge&&E.hasChildNodes()&&!Yt(E.firstElementChild)&&an(/<[/\w!]/g,E.innerHTML)&&an(/<[/\w!]/g,E.textContent)||E.nodeType===Ko.progressingInstruction||ge&&E.nodeType===Ko.comment&&an(/<[/\w]/g,E.data))return vt(E),!0;if(!(it.tagCheck instanceof Function&&it.tagCheck(De))&&(!ee[De]||Re[De])){if(!Re[De]&&Jt(De)&&(_e.tagNameCheck instanceof RegExp&&an(_e.tagNameCheck,De)||_e.tagNameCheck instanceof Function&&_e.tagNameCheck(De)))return!1;if(y&&!Ie[De]){let h=j(E)||E.parentNode,p=se(E)||E.childNodes;if(p&&h){let _=p.length;for(let S=_-1;S>=0;--S){let z=C(p[S],!0);z.__removalCount=(E.__removalCount||0)+1,h.insertBefore(z,V(E))}}}return vt(E),!0}return E instanceof a&&!Zt(E)||(De==="noscript"||De==="noembed"||De==="noframes")&&an(/<\/no(script|embed|frames)/i,E.innerHTML)?(vt(E),!0):(Ae&&E.nodeType===Ko.text&&(he=E.textContent,mi([G,te,ke],h=>{he=zo(he,h," ")}),E.textContent!==he&&(Wo(t.removed,{element:E.cloneNode()}),E.textContent=he)),zt(H.afterSanitizeElements,E,null),!1)},Ft=function(E,he,De){if(Te&&(he==="id"||he==="name")&&(De in n||De in tt))return!1;if(!(ue&&!Ye[he]&&an(Ee,he))){if(!(I&&an(oe,he))){if(!(it.attributeCheck instanceof Function&&it.attributeCheck(he,E))){if(!ve[he]||Ye[he]){if(!(Jt(E)&&(_e.tagNameCheck instanceof RegExp&&an(_e.tagNameCheck,E)||_e.tagNameCheck instanceof Function&&_e.tagNameCheck(E))&&(_e.attributeNameCheck instanceof RegExp&&an(_e.attributeNameCheck,he)||_e.attributeNameCheck instanceof Function&&_e.attributeNameCheck(he,E))||he==="is"&&_e.allowCustomizedBuiltInElements&&(_e.tagNameCheck instanceof RegExp&&an(_e.tagNameCheck,De)||_e.tagNameCheck instanceof Function&&_e.tagNameCheck(De))))return!1}else if(!Et[he]){if(!an(T,zo(De,be,""))){if(!((he==="src"||he==="xlink:href"||he==="href")&&E!=="script"&&Ug(De,"data:")===0&&Ke[E])){if(!(ne&&!an(D,zo(De,be,"")))){if(De)return!1}}}}}}}return!0},Jt=function(E){return E!=="annotation-xml"&&za(E,Se)},Ht=function(E){zt(H.beforeSanitizeAttributes,E,null);let{attributes:he}=E;if(!he||Kt(E))return;let De={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:ve,forceKeepAttr:void 0},h=he.length;for(;h--;){let p=he[h],{name:_,namespaceURI:S,value:z}=p,K=Be(_),ce=z,xe=_==="value"?ce:Wg(ce);if(De.attrName=K,De.attrValue=xe,De.keepAttr=!0,De.forceKeepAttr=void 0,zt(H.uponSanitizeAttribute,E,De),xe=De.attrValue,He&&(K==="id"||K==="name")&&(Rt(_,E),xe=at+xe),ge&&an(/((--!?|])>)|<\/(style|title|textarea)/i,xe)){Rt(_,E);continue}if(K==="attributename"&&za(xe,"href")){Rt(_,E);continue}if(De.forceKeepAttr)continue;if(!De.keepAttr){Rt(_,E);continue}if(!de&&an(/\/>/i,xe)){Rt(_,E);continue}Ae&&mi([G,te,ke],ot=>{xe=zo(xe,ot," ")});let Xe=Be(E.nodeName);if(!Ft(Xe,K,xe)){Rt(_,E);continue}if(N&&typeof m=="object"&&typeof m.getAttributeType=="function"&&!S)switch(m.getAttributeType(Xe,K)){case"TrustedHTML":{xe=N.createHTML(xe);break}case"TrustedScriptURL":{xe=N.createScriptURL(xe);break}}if(xe!==ce)try{S?E.setAttributeNS(S,_,xe):E.setAttribute(_,xe),Kt(E)?vt(E):fd(t.removed)}catch{Rt(_,E)}}zt(H.afterSanitizeAttributes,E,null)},en=function fe(E){let he=null,De=ut(E);for(zt(H.beforeSanitizeShadowDOM,E,null);he=De.nextNode();)zt(H.uponSanitizeShadowNode,he,null),_n(he),Ht(he),he.content instanceof s&&fe(he.content);zt(H.afterSanitizeShadowDOM,E,null)};return t.sanitize=function(fe){let E=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},he=null,De=null,h=null,p=null;if(Ct=!fe,Ct&&(fe="<!-->"),typeof fe!="string"&&!Yt(fe))if(typeof fe.toString=="function"){if(fe=fe.toString(),typeof fe!="string")throw Ho("dirty is not a string, aborting")}else throw Ho("toString is not a function");if(!t.isSupported)return fe;if(qe||xt(E),t.removed=[],typeof fe=="string"&&(U=!1),U){if(fe.nodeName){let z=Be(fe.nodeName);if(!ee[z]||Re[z])throw Ho("root node is forbidden and cannot be sanitized in-place")}}else if(fe instanceof l)he=Wt("<!---->"),De=he.ownerDocument.importNode(fe,!0),De.nodeType===Ko.element&&De.nodeName==="BODY"||De.nodeName==="HTML"?he=De:he.appendChild(De);else{if(!Fe&&!Ae&&!Ne&&fe.indexOf("<")===-1)return N&&X?N.createHTML(fe):fe;if(he=Wt(fe),!he)return Fe?null:X?R:""}he&&Ze&&vt(he.firstChild);let _=ut(U?fe:he);for(;h=_.nextNode();)_n(h),Ht(h),h.content instanceof s&&en(h.content);if(U)return fe;if(Fe){if(Z)for(p=Y.call(he.ownerDocument);he.firstChild;)p.appendChild(he.firstChild);else p=he;return(ve.shadowroot||ve.shadowrootmode)&&(p=P.call(r,p,!0)),p}let S=Ne?he.outerHTML:he.innerHTML;return Ne&&ee["!doctype"]&&he.ownerDocument&&he.ownerDocument.doctype&&he.ownerDocument.doctype.name&&an(kd,he.ownerDocument.doctype.name)&&(S="<!DOCTYPE "+he.ownerDocument.doctype.name+`>
`+S),Ae&&mi([G,te,ke],z=>{S=zo(S,z," ")}),N&&X?N.createHTML(S):S},t.setConfig=function(){let fe=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};xt(fe),qe=!0},t.clearConfig=function(){Ve=null,qe=!1},t.isValidAttribute=function(fe,E,he){Ve||xt({});let De=Be(fe),h=Be(E);return Ft(De,h,he)},t.addHook=function(fe,E){typeof E=="function"&&Wo(H[fe],E)},t.removeHook=function(fe,E){if(E!==void 0){let he=Fg(H[fe],E);return he===-1?void 0:Bg(H[fe],he,1)[0]}return fd(H[fe])},t.removeHooks=function(fe){H[fe]=[]},t.removeAllHooks=function(){H=yd()},t}var xd=$d();var Xn={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},bi=e=>(...t)=>({_$litDirective$:e,values:t}),ao=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,n,r){this._$Ct=t,this._$AM=n,this._$Ci=r}_$AS(t,n){return this.update(t,n)}update(t,n){return this.render(...n)}};var Yo=class extends ao{constructor(t){if(super(t),this.it=Pt,t.type!==Xn.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===Pt||t==null)return this._t=void 0,this.it=t;if(t===vn)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;let n=[t];return n.raw=n,this._t={_$litType$:this.constructor.resultType,strings:n,values:[]}}};Yo.directiveName="unsafeHTML",Yo.resultType=1;var Ad=bi(Yo);function tl(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var Rr=tl();function Id(e){Rr=e}var Zo={exec:()=>null};function yt(e,t=""){let n=typeof e=="string"?e:e.source,r={replace:(o,s)=>{let i=typeof s=="string"?s:s.source;return i=i.replace(un.caret,"$1"),n=n.replace(o,i),r},getRegex:()=>new RegExp(n,t)};return r}var oh=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),un={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i")},sh=/^(?:[ \t]*(?:\n|$))+/,ih=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,ah=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,Jo=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,lh=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,nl=/(?:[*+-]|\d{1,9}[.)])/,Ld=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,Pd=yt(Ld).replace(/bull/g,nl).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),ch=yt(Ld).replace(/bull/g,nl).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),rl=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,uh=/^[^\n]+/,ol=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,dh=yt(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",ol).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),ph=yt(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,nl).getRegex(),xi="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",sl=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,fh=yt("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",sl).replace("tag",xi).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),Dd=yt(rl).replace("hr",Jo).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",xi).getRegex(),_h=yt(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",Dd).getRegex(),il={blockquote:_h,code:ih,def:dh,fences:ah,heading:lh,hr:Jo,html:fh,lheading:Pd,list:ph,newline:sh,paragraph:Dd,table:Zo,text:uh},Sd=yt("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",Jo).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",xi).getRegex(),mh={...il,lheading:ch,table:Sd,paragraph:yt(rl).replace("hr",Jo).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",Sd).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",xi).getRegex()},gh={...il,html:yt(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",sl).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:Zo,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:yt(rl).replace("hr",Jo).replace("heading",` *#{1,6} *[^
]`).replace("lheading",Pd).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},hh=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,bh=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,Md=/^( {2,}|\\)\n(?!\s*$)/,yh=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,Ai=/[\p{P}\p{S}]/u,al=/[\s\p{P}\p{S}]/u,Nd=/[^\s\p{P}\p{S}]/u,vh=yt(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,al).getRegex(),qd=/(?!~)[\p{P}\p{S}]/u,wh=/(?!~)[\s\p{P}\p{S}]/u,kh=/(?:[^\s\p{P}\p{S}]|~)/u,$h=yt(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",oh?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),jd=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,xh=yt(jd,"u").replace(/punct/g,Ai).getRegex(),Ah=yt(jd,"u").replace(/punct/g,qd).getRegex(),Fd="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",Sh=yt(Fd,"gu").replace(/notPunctSpace/g,Nd).replace(/punctSpace/g,al).replace(/punct/g,Ai).getRegex(),Eh=yt(Fd,"gu").replace(/notPunctSpace/g,kh).replace(/punctSpace/g,wh).replace(/punct/g,qd).getRegex(),Th=yt("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,Nd).replace(/punctSpace/g,al).replace(/punct/g,Ai).getRegex(),Ch=yt(/\\(punct)/,"gu").replace(/punct/g,Ai).getRegex(),Rh=yt(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),Oh=yt(sl).replace("(?:-->|$)","-->").getRegex(),Ih=yt("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",Oh).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),wi=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,Lh=yt(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",wi).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),Bd=yt(/^!?\[(label)\]\[(ref)\]/).replace("label",wi).replace("ref",ol).getRegex(),Ud=yt(/^!?\[(ref)\](?:\[\])?/).replace("ref",ol).getRegex(),Ph=yt("reflink|nolink(?!\\()","g").replace("reflink",Bd).replace("nolink",Ud).getRegex(),Ed=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,ll={_backpedal:Zo,anyPunctuation:Ch,autolink:Rh,blockSkip:$h,br:Md,code:bh,del:Zo,emStrongLDelim:xh,emStrongRDelimAst:Sh,emStrongRDelimUnd:Th,escape:hh,link:Lh,nolink:Ud,punctuation:vh,reflink:Bd,reflinkSearch:Ph,tag:Ih,text:yh,url:Zo},Dh={...ll,link:yt(/^!?\[(label)\]\((.*?)\)/).replace("label",wi).getRegex(),reflink:yt(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",wi).getRegex()},Za={...ll,emStrongRDelimAst:Eh,emStrongLDelim:Ah,url:yt(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",Ed).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:yt(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",Ed).getRegex()},Mh={...Za,br:yt(Md).replace("{2,}","*").getRegex(),text:yt(Za.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},yi={normal:il,gfm:mh,pedantic:gh},Vo={normal:ll,gfm:Za,breaks:Mh,pedantic:Dh},Nh={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},Td=e=>Nh[e];function Qn(e,t){if(t){if(un.escapeTest.test(e))return e.replace(un.escapeReplace,Td)}else if(un.escapeTestNoEncode.test(e))return e.replace(un.escapeReplaceNoEncode,Td);return e}function Cd(e){try{e=encodeURI(e).replace(un.percentDecode,"%")}catch{return null}return e}function Rd(e,t){let n=e.replace(un.findPipe,(s,i,l)=>{let a=!1,u=i;for(;--u>=0&&l[u]==="\\";)a=!a;return a?"|":" |"}),r=n.split(un.splitPipe),o=0;if(r[0].trim()||r.shift(),r.length>0&&!r.at(-1)?.trim()&&r.pop(),t)if(r.length>t)r.splice(t);else for(;r.length<t;)r.push("");for(;o<r.length;o++)r[o]=r[o].trim().replace(un.slashPipe,"|");return r}function Xo(e,t,n){let r=e.length;if(r===0)return"";let o=0;for(;o<r;){let s=e.charAt(r-o-1);if(s===t&&!n)o++;else if(s!==t&&n)o++;else break}return e.slice(0,r-o)}function qh(e,t){if(e.indexOf(t[1])===-1)return-1;let n=0;for(let r=0;r<e.length;r++)if(e[r]==="\\")r++;else if(e[r]===t[0])n++;else if(e[r]===t[1]&&(n--,n<0))return r;return n>0?-2:-1}function Od(e,t,n,r,o){let s=t.href,i=t.title||null,l=e[1].replace(o.other.outputLinkReplace,"$1");r.state.inLink=!0;let a={type:e[0].charAt(0)==="!"?"image":"link",raw:n,href:s,title:i,text:l,tokens:r.inlineTokens(l)};return r.state.inLink=!1,a}function jh(e,t,n){let r=e.match(n.other.indentCodeCompensation);if(r===null)return t;let o=r[1];return t.split(`
`).map(s=>{let i=s.match(n.other.beginningSpace);if(i===null)return s;let[l]=i;return l.length>=o.length?s.slice(o.length):s}).join(`
`)}var ki=class{constructor(e){Tt(this,"options");Tt(this,"rules");Tt(this,"lexer");this.options=e||Rr}space(e){let t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){let t=this.rules.block.code.exec(e);if(t){let n=t[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?n:Xo(n,`
`)}}}fences(e){let t=this.rules.block.fences.exec(e);if(t){let n=t[0],r=jh(n,t[3]||"",this.rules);return{type:"code",raw:n,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:r}}}heading(e){let t=this.rules.block.heading.exec(e);if(t){let n=t[2].trim();if(this.rules.other.endingHash.test(n)){let r=Xo(n,"#");(this.options.pedantic||!r||this.rules.other.endingSpaceChar.test(r))&&(n=r.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:n,tokens:this.lexer.inline(n)}}}hr(e){let t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:Xo(t[0],`
`)}}blockquote(e){let t=this.rules.block.blockquote.exec(e);if(t){let n=Xo(t[0],`
`).split(`
`),r="",o="",s=[];for(;n.length>0;){let i=!1,l=[],a;for(a=0;a<n.length;a++)if(this.rules.other.blockquoteStart.test(n[a]))l.push(n[a]),i=!0;else if(!i)l.push(n[a]);else break;n=n.slice(a);let u=l.join(`
`),d=u.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");r=r?`${r}
${u}`:u,o=o?`${o}
${d}`:d;let f=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(d,s,!0),this.lexer.state.top=f,n.length===0)break;let g=s.at(-1);if(g?.type==="code")break;if(g?.type==="blockquote"){let m=g,w=m.raw+`
`+n.join(`
`),C=this.blockquote(w);s[s.length-1]=C,r=r.substring(0,r.length-m.raw.length)+C.raw,o=o.substring(0,o.length-m.text.length)+C.text;break}else if(g?.type==="list"){let m=g,w=m.raw+`
`+n.join(`
`),C=this.list(w);s[s.length-1]=C,r=r.substring(0,r.length-g.raw.length)+C.raw,o=o.substring(0,o.length-m.raw.length)+C.raw,n=w.substring(s.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:r,tokens:s,text:o}}}list(e){let t=this.rules.block.list.exec(e);if(t){let n=t[1].trim(),r=n.length>1,o={type:"list",raw:"",ordered:r,start:r?+n.slice(0,-1):"",loose:!1,items:[]};n=r?`\\d{1,9}\\${n.slice(-1)}`:`\\${n}`,this.options.pedantic&&(n=r?n:"[*+-]");let s=this.rules.other.listItemRegex(n),i=!1;for(;e;){let a=!1,u="",d="";if(!(t=s.exec(e))||this.rules.block.hr.test(e))break;u=t[0],e=e.substring(u.length);let f=t[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,C=>" ".repeat(3*C.length)),g=e.split(`
`,1)[0],m=!f.trim(),w=0;if(this.options.pedantic?(w=2,d=f.trimStart()):m?w=t[1].length+1:(w=t[2].search(this.rules.other.nonSpaceChar),w=w>4?1:w,d=f.slice(w),w+=t[1].length),m&&this.rules.other.blankLine.test(g)&&(u+=g+`
`,e=e.substring(g.length+1),a=!0),!a){let C=this.rules.other.nextBulletRegex(w),F=this.rules.other.hrRegex(w),V=this.rules.other.fencesBeginRegex(w),se=this.rules.other.headingBeginRegex(w),j=this.rules.other.htmlBeginRegex(w);for(;e;){let N=e.split(`
`,1)[0],R;if(g=N,this.options.pedantic?(g=g.replace(this.rules.other.listReplaceNesting,"  "),R=g):R=g.replace(this.rules.other.tabCharGlobal,"    "),V.test(g)||se.test(g)||j.test(g)||C.test(g)||F.test(g))break;if(R.search(this.rules.other.nonSpaceChar)>=w||!g.trim())d+=`
`+R.slice(w);else{if(m||f.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||V.test(f)||se.test(f)||F.test(f))break;d+=`
`+g}!m&&!g.trim()&&(m=!0),u+=N+`
`,e=e.substring(N.length+1),f=R.slice(w)}}o.loose||(i?o.loose=!0:this.rules.other.doubleBlankLine.test(u)&&(i=!0)),o.items.push({type:"list_item",raw:u,task:!!this.options.gfm&&this.rules.other.listIsTask.test(d),loose:!1,text:d,tokens:[]}),o.raw+=u}let l=o.items.at(-1);if(l)l.raw=l.raw.trimEnd(),l.text=l.text.trimEnd();else return;o.raw=o.raw.trimEnd();for(let a of o.items){if(this.lexer.state.top=!1,a.tokens=this.lexer.blockTokens(a.text,[]),a.task){if(a.text=a.text.replace(this.rules.other.listReplaceTask,""),a.tokens[0]?.type==="text"||a.tokens[0]?.type==="paragraph"){a.tokens[0].raw=a.tokens[0].raw.replace(this.rules.other.listReplaceTask,""),a.tokens[0].text=a.tokens[0].text.replace(this.rules.other.listReplaceTask,"");for(let d=this.lexer.inlineQueue.length-1;d>=0;d--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[d].src)){this.lexer.inlineQueue[d].src=this.lexer.inlineQueue[d].src.replace(this.rules.other.listReplaceTask,"");break}}let u=this.rules.other.listTaskCheckbox.exec(a.raw);if(u){let d={type:"checkbox",raw:u[0]+" ",checked:u[0]!=="[ ]"};a.checked=d.checked,o.loose?a.tokens[0]&&["paragraph","text"].includes(a.tokens[0].type)&&"tokens"in a.tokens[0]&&a.tokens[0].tokens?(a.tokens[0].raw=d.raw+a.tokens[0].raw,a.tokens[0].text=d.raw+a.tokens[0].text,a.tokens[0].tokens.unshift(d)):a.tokens.unshift({type:"paragraph",raw:d.raw,text:d.raw,tokens:[d]}):a.tokens.unshift(d)}}if(!o.loose){let u=a.tokens.filter(f=>f.type==="space"),d=u.length>0&&u.some(f=>this.rules.other.anyLine.test(f.raw));o.loose=d}}if(o.loose)for(let a of o.items){a.loose=!0;for(let u of a.tokens)u.type==="text"&&(u.type="paragraph")}return o}}html(e){let t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){let t=this.rules.block.def.exec(e);if(t){let n=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),r=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",o=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:n,raw:t[0],href:r,title:o}}}table(e){let t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;let n=Rd(t[1]),r=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),o=t[3]?.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],s={type:"table",raw:t[0],header:[],align:[],rows:[]};if(n.length===r.length){for(let i of r)this.rules.other.tableAlignRight.test(i)?s.align.push("right"):this.rules.other.tableAlignCenter.test(i)?s.align.push("center"):this.rules.other.tableAlignLeft.test(i)?s.align.push("left"):s.align.push(null);for(let i=0;i<n.length;i++)s.header.push({text:n[i],tokens:this.lexer.inline(n[i]),header:!0,align:s.align[i]});for(let i of o)s.rows.push(Rd(i,s.header.length).map((l,a)=>({text:l,tokens:this.lexer.inline(l),header:!1,align:s.align[a]})));return s}}lheading(e){let t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){let t=this.rules.block.paragraph.exec(e);if(t){let n=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:n,tokens:this.lexer.inline(n)}}}text(e){let t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){let t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){let t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){let t=this.rules.inline.link.exec(e);if(t){let n=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(n)){if(!this.rules.other.endAngleBracket.test(n))return;let s=Xo(n.slice(0,-1),"\\");if((n.length-s.length)%2===0)return}else{let s=qh(t[2],"()");if(s===-2)return;if(s>-1){let i=(t[0].indexOf("!")===0?5:4)+t[1].length+s;t[2]=t[2].substring(0,s),t[0]=t[0].substring(0,i).trim(),t[3]=""}}let r=t[2],o="";if(this.options.pedantic){let s=this.rules.other.pedanticHrefTitle.exec(r);s&&(r=s[1],o=s[3])}else o=t[3]?t[3].slice(1,-1):"";return r=r.trim(),this.rules.other.startAngleBracket.test(r)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(n)?r=r.slice(1):r=r.slice(1,-1)),Od(t,{href:r&&r.replace(this.rules.inline.anyPunctuation,"$1"),title:o&&o.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let n;if((n=this.rules.inline.reflink.exec(e))||(n=this.rules.inline.nolink.exec(e))){let r=(n[2]||n[1]).replace(this.rules.other.multipleSpaceGlobal," "),o=t[r.toLowerCase()];if(!o){let s=n[0].charAt(0);return{type:"text",raw:s,text:s}}return Od(n,o,n[0],this.lexer,this.rules)}}emStrong(e,t,n=""){let r=this.rules.inline.emStrongLDelim.exec(e);if(!(!r||r[3]&&n.match(this.rules.other.unicodeAlphaNumeric))&&(!(r[1]||r[2])||!n||this.rules.inline.punctuation.exec(n))){let o=[...r[0]].length-1,s,i,l=o,a=0,u=r[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(u.lastIndex=0,t=t.slice(-1*e.length+o);(r=u.exec(t))!=null;){if(s=r[1]||r[2]||r[3]||r[4]||r[5]||r[6],!s)continue;if(i=[...s].length,r[3]||r[4]){l+=i;continue}else if((r[5]||r[6])&&o%3&&!((o+i)%3)){a+=i;continue}if(l-=i,l>0)continue;i=Math.min(i,i+l+a);let d=[...r[0]][0].length,f=e.slice(0,o+r.index+d+i);if(Math.min(o,i)%2){let m=f.slice(1,-1);return{type:"em",raw:f,text:m,tokens:this.lexer.inlineTokens(m)}}let g=f.slice(2,-2);return{type:"strong",raw:f,text:g,tokens:this.lexer.inlineTokens(g)}}}}codespan(e){let t=this.rules.inline.code.exec(e);if(t){let n=t[2].replace(this.rules.other.newLineCharGlobal," "),r=this.rules.other.nonSpaceChar.test(n),o=this.rules.other.startingSpaceChar.test(n)&&this.rules.other.endingSpaceChar.test(n);return r&&o&&(n=n.substring(1,n.length-1)),{type:"codespan",raw:t[0],text:n}}}br(e){let t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){let t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){let t=this.rules.inline.autolink.exec(e);if(t){let n,r;return t[2]==="@"?(n=t[1],r="mailto:"+n):(n=t[1],r=n),{type:"link",raw:t[0],text:n,href:r,tokens:[{type:"text",raw:n,text:n}]}}}url(e){let t;if(t=this.rules.inline.url.exec(e)){let n,r;if(t[2]==="@")n=t[0],r="mailto:"+n;else{let o;do o=t[0],t[0]=this.rules.inline._backpedal.exec(t[0])?.[0]??"";while(o!==t[0]);n=t[0],t[1]==="www."?r="http://"+t[0]:r=t[0]}return{type:"link",raw:t[0],text:n,href:r,tokens:[{type:"text",raw:n,text:n}]}}}inlineText(e){let t=this.rules.inline.text.exec(e);if(t){let n=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:n}}}},Tn=class Ja{constructor(t){Tt(this,"tokens");Tt(this,"options");Tt(this,"state");Tt(this,"inlineQueue");Tt(this,"tokenizer");this.tokens=[],this.tokens.links=Object.create(null),this.options=t||Rr,this.options.tokenizer=this.options.tokenizer||new ki,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let n={other:un,block:yi.normal,inline:Vo.normal};this.options.pedantic?(n.block=yi.pedantic,n.inline=Vo.pedantic):this.options.gfm&&(n.block=yi.gfm,this.options.breaks?n.inline=Vo.breaks:n.inline=Vo.gfm),this.tokenizer.rules=n}static get rules(){return{block:yi,inline:Vo}}static lex(t,n){return new Ja(n).lex(t)}static lexInline(t,n){return new Ja(n).inlineTokens(t)}lex(t){t=t.replace(un.carriageReturn,`
`),this.blockTokens(t,this.tokens);for(let n=0;n<this.inlineQueue.length;n++){let r=this.inlineQueue[n];this.inlineTokens(r.src,r.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(t,n=[],r=!1){for(this.options.pedantic&&(t=t.replace(un.tabCharGlobal,"    ").replace(un.spaceLine,""));t;){let o;if(this.options.extensions?.block?.some(i=>(o=i.call({lexer:this},t,n))?(t=t.substring(o.raw.length),n.push(o),!0):!1))continue;if(o=this.tokenizer.space(t)){t=t.substring(o.raw.length);let i=n.at(-1);o.raw.length===1&&i!==void 0?i.raw+=`
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
`+o.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=i.text):n.push(o);continue}if(t){let i="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(i);break}else throw new Error(i)}}return this.state.top=!0,n}inline(t,n=[]){return this.inlineQueue.push({src:t,tokens:n}),n}inlineTokens(t,n=[]){let r=t,o=null;if(this.tokens.links){let a=Object.keys(this.tokens.links);if(a.length>0)for(;(o=this.tokenizer.rules.inline.reflinkSearch.exec(r))!=null;)a.includes(o[0].slice(o[0].lastIndexOf("[")+1,-1))&&(r=r.slice(0,o.index)+"["+"a".repeat(o[0].length-2)+"]"+r.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(o=this.tokenizer.rules.inline.anyPunctuation.exec(r))!=null;)r=r.slice(0,o.index)+"++"+r.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let s;for(;(o=this.tokenizer.rules.inline.blockSkip.exec(r))!=null;)s=o[2]?o[2].length:0,r=r.slice(0,o.index+s)+"["+"a".repeat(o[0].length-s-2)+"]"+r.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);r=this.options.hooks?.emStrongMask?.call({lexer:this},r)??r;let i=!1,l="";for(;t;){i||(l=""),i=!1;let a;if(this.options.extensions?.inline?.some(d=>(a=d.call({lexer:this},t,n))?(t=t.substring(a.raw.length),n.push(a),!0):!1))continue;if(a=this.tokenizer.escape(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.tag(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.link(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(a.raw.length);let d=n.at(-1);a.type==="text"&&d?.type==="text"?(d.raw+=a.raw,d.text+=a.text):n.push(a);continue}if(a=this.tokenizer.emStrong(t,r,l)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.codespan(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.br(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.del(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.autolink(t)){t=t.substring(a.raw.length),n.push(a);continue}if(!this.state.inLink&&(a=this.tokenizer.url(t))){t=t.substring(a.raw.length),n.push(a);continue}let u=t;if(this.options.extensions?.startInline){let d=1/0,f=t.slice(1),g;this.options.extensions.startInline.forEach(m=>{g=m.call({lexer:this},f),typeof g=="number"&&g>=0&&(d=Math.min(d,g))}),d<1/0&&d>=0&&(u=t.substring(0,d+1))}if(a=this.tokenizer.inlineText(u)){t=t.substring(a.raw.length),a.raw.slice(-1)!=="_"&&(l=a.raw.slice(-1)),i=!0;let d=n.at(-1);d?.type==="text"?(d.raw+=a.raw,d.text+=a.text):n.push(a);continue}if(t){let d="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(d);break}else throw new Error(d)}}return n}},$i=class{constructor(e){Tt(this,"options");Tt(this,"parser");this.options=e||Rr}space(e){return""}code({text:e,lang:t,escaped:n}){let r=(t||"").match(un.notSpaceStart)?.[0],o=e.replace(un.endingNewline,"")+`
`;return r?'<pre><code class="language-'+Qn(r)+'">'+(n?o:Qn(o,!0))+`</code></pre>
`:"<pre><code>"+(n?o:Qn(o,!0))+`</code></pre>
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
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${Qn(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:n}){let r=this.parser.parseInline(n),o=Cd(e);if(o===null)return r;e=o;let s='<a href="'+e+'"';return t&&(s+=' title="'+Qn(t)+'"'),s+=">"+r+"</a>",s}image({href:e,title:t,text:n,tokens:r}){r&&(n=this.parser.parseInline(r,this.parser.textRenderer));let o=Cd(e);if(o===null)return Qn(n);e=o;let s=`<img src="${e}" alt="${n}"`;return t&&(s+=` title="${Qn(t)}"`),s+=">",s}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:Qn(e.text)}},cl=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}checkbox({raw:e}){return e}},Cn=class el{constructor(t){Tt(this,"options");Tt(this,"renderer");Tt(this,"textRenderer");this.options=t||Rr,this.options.renderer=this.options.renderer||new $i,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new cl}static parse(t,n){return new el(n).parse(t)}static parseInline(t,n){return new el(n).parseInline(t)}parse(t){let n="";for(let r=0;r<t.length;r++){let o=t[r];if(this.options.extensions?.renderers?.[o.type]){let i=o,l=this.options.extensions.renderers[i.type].call({parser:this},i);if(l!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(i.type)){n+=l||"";continue}}let s=o;switch(s.type){case"space":{n+=this.renderer.space(s);break}case"hr":{n+=this.renderer.hr(s);break}case"heading":{n+=this.renderer.heading(s);break}case"code":{n+=this.renderer.code(s);break}case"table":{n+=this.renderer.table(s);break}case"blockquote":{n+=this.renderer.blockquote(s);break}case"list":{n+=this.renderer.list(s);break}case"checkbox":{n+=this.renderer.checkbox(s);break}case"html":{n+=this.renderer.html(s);break}case"def":{n+=this.renderer.def(s);break}case"paragraph":{n+=this.renderer.paragraph(s);break}case"text":{n+=this.renderer.text(s);break}default:{let i='Token with "'+s.type+'" type was not found.';if(this.options.silent)return console.error(i),"";throw new Error(i)}}}return n}parseInline(t,n=this.renderer){let r="";for(let o=0;o<t.length;o++){let s=t[o];if(this.options.extensions?.renderers?.[s.type]){let l=this.options.extensions.renderers[s.type].call({parser:this},s);if(l!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(s.type)){r+=l||"";continue}}let i=s;switch(i.type){case"escape":{r+=n.text(i);break}case"html":{r+=n.html(i);break}case"link":{r+=n.link(i);break}case"image":{r+=n.image(i);break}case"checkbox":{r+=n.checkbox(i);break}case"strong":{r+=n.strong(i);break}case"em":{r+=n.em(i);break}case"codespan":{r+=n.codespan(i);break}case"br":{r+=n.br(i);break}case"del":{r+=n.del(i);break}case"text":{r+=n.text(i);break}default:{let l='Token with "'+i.type+'" type was not found.';if(this.options.silent)return console.error(l),"";throw new Error(l)}}}return r}},vi,Qo=(vi=class{constructor(e){Tt(this,"options");Tt(this,"block");this.options=e||Rr}preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}emStrongMask(e){return e}provideLexer(){return this.block?Tn.lex:Tn.lexInline}provideParser(){return this.block?Cn.parse:Cn.parseInline}},Tt(vi,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens","emStrongMask"])),Tt(vi,"passThroughHooksRespectAsync",new Set(["preprocess","postprocess","processAllTokens"])),vi),Fh=class{constructor(...e){Tt(this,"defaults",tl());Tt(this,"options",this.setOptions);Tt(this,"parse",this.parseMarkdown(!0));Tt(this,"parseInline",this.parseMarkdown(!1));Tt(this,"Parser",Cn);Tt(this,"Renderer",$i);Tt(this,"TextRenderer",cl);Tt(this,"Lexer",Tn);Tt(this,"Tokenizer",ki);Tt(this,"Hooks",Qo);this.use(...e)}walkTokens(e,t){let n=[];for(let r of e)switch(n=n.concat(t.call(this,r)),r.type){case"table":{let o=r;for(let s of o.header)n=n.concat(this.walkTokens(s.tokens,t));for(let s of o.rows)for(let i of s)n=n.concat(this.walkTokens(i.tokens,t));break}case"list":{let o=r;n=n.concat(this.walkTokens(o.items,t));break}default:{let o=r;this.defaults.extensions?.childTokens?.[o.type]?this.defaults.extensions.childTokens[o.type].forEach(s=>{let i=o[s].flat(1/0);n=n.concat(this.walkTokens(i,t))}):o.tokens&&(n=n.concat(this.walkTokens(o.tokens,t)))}}return n}use(...e){let t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(n=>{let r={...n};if(r.async=this.defaults.async||r.async||!1,n.extensions&&(n.extensions.forEach(o=>{if(!o.name)throw new Error("extension name required");if("renderer"in o){let s=t.renderers[o.name];s?t.renderers[o.name]=function(...i){let l=o.renderer.apply(this,i);return l===!1&&(l=s.apply(this,i)),l}:t.renderers[o.name]=o.renderer}if("tokenizer"in o){if(!o.level||o.level!=="block"&&o.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let s=t[o.level];s?s.unshift(o.tokenizer):t[o.level]=[o.tokenizer],o.start&&(o.level==="block"?t.startBlock?t.startBlock.push(o.start):t.startBlock=[o.start]:o.level==="inline"&&(t.startInline?t.startInline.push(o.start):t.startInline=[o.start]))}"childTokens"in o&&o.childTokens&&(t.childTokens[o.name]=o.childTokens)}),r.extensions=t),n.renderer){let o=this.defaults.renderer||new $i(this.defaults);for(let s in n.renderer){if(!(s in o))throw new Error(`renderer '${s}' does not exist`);if(["options","parser"].includes(s))continue;let i=s,l=n.renderer[i],a=o[i];o[i]=(...u)=>{let d=l.apply(o,u);return d===!1&&(d=a.apply(o,u)),d||""}}r.renderer=o}if(n.tokenizer){let o=this.defaults.tokenizer||new ki(this.defaults);for(let s in n.tokenizer){if(!(s in o))throw new Error(`tokenizer '${s}' does not exist`);if(["options","rules","lexer"].includes(s))continue;let i=s,l=n.tokenizer[i],a=o[i];o[i]=(...u)=>{let d=l.apply(o,u);return d===!1&&(d=a.apply(o,u)),d}}r.tokenizer=o}if(n.hooks){let o=this.defaults.hooks||new Qo;for(let s in n.hooks){if(!(s in o))throw new Error(`hook '${s}' does not exist`);if(["options","block"].includes(s))continue;let i=s,l=n.hooks[i],a=o[i];Qo.passThroughHooks.has(s)?o[i]=u=>{if(this.defaults.async&&Qo.passThroughHooksRespectAsync.has(s))return(async()=>{let f=await l.call(o,u);return a.call(o,f)})();let d=l.call(o,u);return a.call(o,d)}:o[i]=(...u)=>{if(this.defaults.async)return(async()=>{let f=await l.apply(o,u);return f===!1&&(f=await a.apply(o,u)),f})();let d=l.apply(o,u);return d===!1&&(d=a.apply(o,u)),d}}r.hooks=o}if(n.walkTokens){let o=this.defaults.walkTokens,s=n.walkTokens;r.walkTokens=function(i){let l=[];return l.push(s.call(this,i)),o&&(l=l.concat(o.call(this,i))),l}}this.defaults={...this.defaults,...r}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return Tn.lex(e,t??this.defaults)}parser(e,t){return Cn.parse(e,t??this.defaults)}parseMarkdown(e){return(t,n)=>{let r={...n},o={...this.defaults,...r},s=this.onError(!!o.silent,!!o.async);if(this.defaults.async===!0&&r.async===!1)return s(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof t>"u"||t===null)return s(new Error("marked(): input parameter is undefined or null"));if(typeof t!="string")return s(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(t)+", string expected"));if(o.hooks&&(o.hooks.options=o,o.hooks.block=e),o.async)return(async()=>{let i=o.hooks?await o.hooks.preprocess(t):t,l=await(o.hooks?await o.hooks.provideLexer():e?Tn.lex:Tn.lexInline)(i,o),a=o.hooks?await o.hooks.processAllTokens(l):l;o.walkTokens&&await Promise.all(this.walkTokens(a,o.walkTokens));let u=await(o.hooks?await o.hooks.provideParser():e?Cn.parse:Cn.parseInline)(a,o);return o.hooks?await o.hooks.postprocess(u):u})().catch(s);try{o.hooks&&(t=o.hooks.preprocess(t));let i=(o.hooks?o.hooks.provideLexer():e?Tn.lex:Tn.lexInline)(t,o);o.hooks&&(i=o.hooks.processAllTokens(i)),o.walkTokens&&this.walkTokens(i,o.walkTokens);let l=(o.hooks?o.hooks.provideParser():e?Cn.parse:Cn.parseInline)(i,o);return o.hooks&&(l=o.hooks.postprocess(l)),l}catch(i){return s(i)}}}onError(e,t){return n=>{if(n.message+=`
Please report this to https://github.com/markedjs/marked.`,e){let r="<p>An error occurred:</p><pre>"+Qn(n.message+"",!0)+"</pre>";return t?Promise.resolve(r):r}if(t)return Promise.reject(n);throw n}}},Cr=new Fh;function St(e,t){return Cr.parse(e,t)}St.options=St.setOptions=function(e){return Cr.setOptions(e),St.defaults=Cr.defaults,Id(St.defaults),St};St.getDefaults=tl;St.defaults=Rr;St.use=function(...e){return Cr.use(...e),St.defaults=Cr.defaults,Id(St.defaults),St};St.walkTokens=function(e,t){return Cr.walkTokens(e,t)};St.parseInline=Cr.parseInline;St.Parser=Cn;St.parser=Cn.parse;St.Renderer=$i;St.TextRenderer=cl;St.Lexer=Tn;St.lexer=Tn.lex;St.Tokenizer=ki;St.Hooks=Qo;St.parse=St;var ex=St.options,tx=St.setOptions,nx=St.use,rx=St.walkTokens,ox=St.parseInline;var sx=Cn.parse,ix=Tn.lex;function lr(e){let t=St.parse(e),n=xd.sanitize(t);return Ad(n)}function Zn(e,t){return c`<div class="prompt-block">
    <div class="prompt-block__label">${e}</div>
    <pre class="prompt-block__body">${t}</pre>
  </div>`}function lo(e){return e.loading?c`<div class="prompt-block__status">불러오는 중…</div>`:e.error?c`<div class="prompt-block__status prompt-block__status--error">
      프롬프트를 불러오지 못했습니다
    </div>`:""}function Si(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),n=r=>String(r).padStart(2,"0");return`${t.getFullYear()}-${n(t.getMonth()+1)}-${n(t.getDate())} ${n(t.getHours())}:${n(t.getMinutes())}`}var zd={Read:"\u{1F4D6}",Edit:"\u270E",MultiEdit:"\u270E",Write:"\u{1F4DD}",Bash:"\u26A1",Grep:"\u{1F50E}",Glob:"\u{1F50E}",Task:"\u{1F916}",Agent:"\u{1F916}",WebFetch:"\u{1F310}",WebSearch:"\u{1F310}"},Bh={command_execution:"\uBA85\uB839 \uC2E4\uD589",file_change:"\uD30C\uC77C \uBCC0\uACBD",mcp_call:"MCP \uD638\uCD9C",web_search:"\uC6F9 \uAC80\uC0C9",plan:"\uACC4\uD68D"},Uh=/^\s*([✓✗⊘])\s*(spec|impl|implementation|plan)\s*게이트\s*[—–-]\s*(\S+)\s+(APPROVE|REVISE|REJECT|BLOCK|SKIP)(?:\s*·\s*(.+))?/,Wh=/^\s*#{0,3}\s*Phase\s+\d+(?:\s*\/\s*\d+)?\s*(?:[·:—–-]\s*.+)?$/;function Rn(e){return!!e&&typeof e=="object"}function ul(e){return typeof e!="string"||e.length===0?[]:e.split(/\r?\n/)}function dl(e,t){let n=ul(e),r=ul(t),o=new Map;for(let l of n)o.set(l,(o.get(l)||0)+1);let s=0;for(let l of r){let a=o.get(l)||0;a>0?o.set(l,a-1):s+=1}let i=0;for(let l of o.values())i+=l;return{added:s,removed:i}}function Hd(e){let t="";typeof e=="string"?t=e:Array.isArray(e)?t=e.map(o=>Rn(o)&&typeof o.text=="string"?o.text:"").join(""):Rn(e)&&typeof e.text=="string"&&(t=e.text);let r=(String(t).split(/\r?\n/).find(o=>o.trim().length>0)||"").trim();return r.length>120?`${r.slice(0,117)}\u2026`:r}function zh(e){let t=String(e.name||""),n=e.input||{},r={kind:"tool",tool:t,icon:zd[t]||"\u{1F527}",input:n,expandable:!0};if((t==="Read"||t==="Write")&&(r.path=String(n.file_path||n.path||"")),t==="Write"&&(r.added=ul(n.content).length),t==="Edit"){r.path=String(n.file_path||n.path||"");let{added:o,removed:s}=dl(n.old_string,n.new_string);r.added=o,r.removed=s}if(t==="MultiEdit"){r.path=String(n.file_path||n.path||"");let o=0,s=0,i=Array.isArray(n.edits)?n.edits:[];for(let l of i){let a=dl(Rn(l)?l.old_string:"",Rn(l)?l.new_string:"");o+=a.added,s+=a.removed}r.added=o,r.removed=s}return t==="Bash"&&(r.command=String(n.command||"")),(t==="Grep"||t==="Glob")&&(r.command=String(n.pattern||n.query||"")),t==="Agent"&&(typeof e.id=="string"&&e.id.length>0&&(r.launch_id=e.id),typeof n.description=="string"&&(r.command=n.description)),r}function pl(e){return typeof e!="string"||e.trim().length===0?null:{kind:"thinking",text:e}}var Hh=/<system-reminder>[\s\S]*?<\/system-reminder>/g;function Gd(e){let t;if(typeof e=="string")t=e;else if(Array.isArray(e))t=e.filter(r=>Rn(r)&&r.type==="text"&&typeof r.text=="string").map(r=>String(r.text)).join(`
`);else return null;let n=t.replace(Hh,"").trim();return n.length>0?{kind:"user",text:n}:null}function fl(e){let t=e.split(/\r?\n/).find(r=>r.trim().length>0)||"",n=Uh.exec(t);return n?{kind:"gate",gate:n[2]==="implementation"?"impl":n[2],reviewer:n[3],verdict:n[4],time:n[5]?n[5].trim():void 0,text:t.trim()}:Wh.test(t)&&t.trim().length<=80?{kind:"phase",text:t.trim()}:{kind:"assistant",text:e}}function Gh(e,t){if(e.subtype==="init"){let n=typeof e.model=="string"?e.model:"";return t.progress=null,[{kind:"thinking",text:n?`\uC138\uC158 \uC2DC\uC791 \xB7 ${n}`:"\uC138\uC158 \uC2DC\uC791"}]}if(e.subtype==="thinking_tokens"){let r=`\uC0DD\uAC01 \uC911\u2026 ${typeof e.estimated_tokens=="number"&&Number.isFinite(e.estimated_tokens)?Math.max(0,Math.round(e.estimated_tokens)):0} \uD1A0\uD070`;return t.progress?(t.progress.text=r,[]):(t.progress={kind:"thinking",text:r},[t.progress])}return[]}function Kh(e,t){let n=typeof e.parent_tool_use_id=="string"&&e.parent_tool_use_id.length>0?e.parent_tool_use_id:null;if(e.type==="assistant"){let r=e.message,o=r&&Array.isArray(r.content)?r.content:[],s=[];for(let i of o)if(Rn(i)){if(i.type==="text"&&typeof i.text=="string")s.push(fl(i.text));else if(i.type==="thinking"){let l=pl(i.thinking);l&&s.push(l)}else if(i.type==="tool_use"){let l=zh(i);typeof i.id=="string"&&t.set(i.id,l),s.push(l)}}return n?Wd(s,n):s}if(e.type==="user"){let r=e.message,o=r&&Array.isArray(r.content)?r.content:[];for(let i of o)if(Rn(i)&&i.type==="tool_result"){let l=t.get(String(i.tool_use_id));if(l){let a=Hd(i.content);l.result=a,l.output=typeof i.content=="string"?i.content:a,i.is_error===!0&&(l.is_error=!0)}}let s=Gd(r&&r.content);return s?[s]:[]}if(e.type==="result"){let r=e.is_error===!1&&e.subtype==="success",o={kind:"result",success:r,text:typeof e.result=="string"?e.result:r?"DONE":""};return n?Wd([o],n):[o]}return[]}function Wd(e,t){for(let n of e)n.parent_tool_use_id=t;return e}function Yh(e){let t=typeof e.command=="string"?e.command:"",n=Hd(e.aggregated_output===void 0?e.output:e.aggregated_output),o=[typeof e.exit_code=="number"&&Number.isFinite(e.exit_code)?`exit ${e.exit_code}`:typeof e.status=="string"&&e.status.length>0?e.status:"",n].filter(i=>i.length>0).join(" \xB7 "),s={kind:"tool",tool:"shell",icon:zd.Bash,command:t,input:{command:t},expandable:!0};return o.length>0&&(s.result=o),typeof e.aggregated_output=="string"&&(s.output=e.aggregated_output),s}function Vh(e){if(e.type==="item.completed"&&Rn(e.item)){let t=e.item;if(t.type==="agent_message"&&typeof t.text=="string")return[fl(t.text)];if(t.type==="user_message"){let n=Gd(t.text);return n?[n]:[]}if(t.type==="reasoning"){let n=pl(t.text);return n?[n]:[]}return t.type==="error"?[{kind:"error",text:String(t.message||"")}]:t.type==="command_execution"?[Yh(t)]:[]}if(e.type==="turn.completed")return[{kind:"result",success:!0,text:"DONE"}];if(e.type==="turn.failed"){let t=e.error;return[{kind:"error",text:t&&typeof t.message=="string"?t.message:"turn failed"}]}return e.type==="error"?[{kind:"error",text:String(e.message||"")}]:[]}function Xh(e){if(e.schema!=="codex-delegation-monitor-v1"||!Rn(e.event))return[];let t=e.event;if(t.type==="session.started"||t.type==="turn.started")return[];if((t.type==="item.started"||t.type==="item.completed")&&Rn(t.item)){let n=t.item;if(typeof n.id!="string"||n.id.length===0)return[];if(t.type==="item.completed"&&n.kind==="agent_message"&&typeof n.text=="string"&&n.text.trim().length>0)return[fl(n.text)];if(t.type==="item.completed"&&n.kind==="reasoning"){let l=pl(n.text);return l?[l]:[]}if(n.kind!=="activity"||typeof n.activity!="string")return[];let r=Bh[n.activity];if(!r)return[];let o="\uC2DC\uC791",s="\u2026",i={kind:"tool",tool:"",icon:s,expandable:!1};if(t.type==="item.completed"){if(n.status==="completed")o="\uC644\uB8CC",s="\u2713";else if(n.status==="failed")o="\uC2E4\uD328",s="\u2717";else return[];i.result=""}return i.tool=`${r} \xB7 ${o}`,i.icon=s,[i]}return t.type==="turn.completed"&&t.status==="completed"?[{kind:"result",success:!0,text:"DONE"}]:t.type==="turn.failed"&&(t.status==="failed"||t.status==="interrupted")&&typeof t.error_code=="string"&&t.error_code.length>0?[{kind:"error",text:t.error_code}]:[]}function Qh(e){let t=e.type;return typeof t=="string"&&(t==="error"||t.startsWith("thread.")||t.startsWith("turn.")||t.startsWith("item."))}function Zh(e){let t=e;if(typeof e=="string"){let n=e.trim();if(n.length===0)return null;try{t=JSON.parse(n)}catch{return null}}return Rn(t)?t:null}function Kd(e={}){let t=e.skip_delegated===!0,n=new Map,r={progress:null};return{push(o){let s=Zh(o);if(!s)return[];if(t&&typeof s.parent_tool_use_id=="string"&&s.parent_tool_use_id.length>0)return[];if(s.type==="system"&&s.schema!=="codex-delegation-monitor-v1")return Gh(s,r);let i=s.schema==="codex-delegation-monitor-v1"?Xh(s):Qh(s)?Vh(s):Kh(s,n);return i.length>0&&(r.progress=null),i}}}function _l(e){let t=[],n=Kd(),r=Array.isArray(e)?e:[];for(let o of r)for(let s of n.push(o))t.push(s);return t}var Jh=5,eb=10,tb=/Task\s+#(\d+)/,nb=/\bgh\s+pr\s+create\b|\bgit\s+push\b/,rb=/\bnpm\s+(?:run\s+)?(?:test|tsc|lint|build)\b|\bvitest\b/;function es(e){return typeof e!="string"?"":(e.split(/\r?\n/).find(t=>t.trim().length>0)||"").trim()}function ob(e){return typeof e!="string"||e.length===0?0:e.split(/\r?\n/).length}function sb(e){for(let t=e.length-1;t>=0;t-=1){let n=e[t];if(n.kind==="phase"||n.kind==="gate")return n.text||null}return null}function ib(e){let t=new Map,n=0;for(let o of e){if(o.kind!=="tool")continue;n+=1;let s=o.input||{};if(o.tool==="TaskCreate"){let a=tb.exec(o.output||o.result||""),u=String(s.activeForm||s.subject||"").trim();if(!a||u.length===0)continue;t.set(a[1],{label:u,active:s.status==="in_progress"?n:0});continue}if(o.tool!=="TaskUpdate")continue;let i=t.get(String(s.taskId??""));if(!i)continue;let l=s.activeForm||s.subject;typeof l=="string"&&l.trim().length>0&&(i.label=l.trim()),typeof s.status=="string"&&(i.active=s.status==="in_progress"?n:0)}let r=null;for(let o of t.values())o.active>0&&(!r||o.active>r.active)&&(r=o);return r?r.label:null}function ab(e){if(e.tool==="Bash"){let t=e.command||"";return nb.test(t)?"~ PR/\uAC8C\uC2DC \uC911":rb.test(t)?"~ \uAC80\uC99D \uC911":null}return e.tool==="Edit"||e.tool==="Write"||e.tool==="MultiEdit"?"~ \uAD6C\uD604 \uC911":e.tool==="Read"||e.tool==="Grep"||e.tool==="Glob"?"~ \uD0D0\uC0C9 \uC911":null}function lb(e){let t=e.filter(o=>o.kind==="tool").slice(-eb),n=new Map;t.forEach((o,s)=>{let i=ab(o);if(!i)return;let l=n.get(i)||{count:0,last:-1};l.count+=1,l.last=s,n.set(i,l)});let r=null;for(let[o,s]of n)(!r||s.count>r.count||s.count===r.count&&s.last>r.last)&&(r={label:o,count:s.count,last:s.last});return r?r.label:null}function cb(e){let t=sb(e);if(t)return{text:t,guess:!1};let n=ib(e);if(n)return{text:n,guess:!1};let r=lb(e);return r?{text:r,guess:!0}:null}function ub(e,t){if(typeof e!="number")return"";let n=Math.max(0,Math.floor((t-e)/1e3));return n<60?`${n}\uCD08 \uC804`:on(e,t)}function co(e,t={}){let{transport:n,sessionLogStore:r,onClose:o}=t,s=null,i=null,l=null,a=null,u=null,d=!1,f={},g=!0,m=new Set,w=new Set,C=null,F=null,V=!1,se=!1,j=!1,N=null,R=null;function L(){V=!1,se=!1,j=!1,N=null,R=null}async function B(Z){if(n){se=!0,j=!1,Re();try{let X=await Promise.resolve(n("get-attempt-prompt",{attempt_id:Z,...u?{root_dir:u}:{}}));if(s!==Z)return;!X||typeof X!="object"||Array.isArray(X)?j=!0:(N=X,R=Z)}catch{s===Z&&(j=!0)}finally{s===Z&&(se=!1,Re())}}}function Y(){if(V=!V,V&&s&&R!==s){B(s);return}Re()}function Q(){if(!V)return"";let Z=lo({loading:se,error:j});if(Z)return c`<div class="sv__prompt" data-seam="attempt-prompt">
        ${Z}
      </div>`;if(!N)return"";if(N.missing)return c`<div class="sv__prompt" data-seam="attempt-prompt">
        <div class="prompt-block__status">
          기록 없음 — 프롬프트 기록 이전에 실행된 attempt입니다
        </div>
      </div>`;let X=Si(N.recorded_at);return c`<div class="sv__prompt" data-seam="attempt-prompt">
      ${X?c`<div class="prompt-block__meta">${X} 발송</div>`:""}
      ${typeof N.task_prompt=="string"?Zn("\uACFC\uC5C5 (user)",N.task_prompt):""}
      ${typeof N.system_prompt=="string"?Zn("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",N.system_prompt):""}
    </div>`}function P(){if(!a||!r)return[];let Z=r.get(a);return _l(Z?Z.lines:[])}function H(){if(!a||!r)return null;let Z=r.get(a),X=Z?Z.last_event_at:null;return typeof X=="number"?X:null}function G(){return f.status==="running"}function te(){if(G()&&s){F||(F=setInterval(()=>Re(),1e3));return}ke()}function ke(){F&&(clearInterval(F),F=null)}function Ee(Z){let X=[],Te=0;for(;Te<Z.length;){let{idx:He,line:at}=Z[Te];if(at.kind==="tool"){let y=Te;for(;y<Z.length&&Z[y].line.kind==="tool"&&Z[y].line.tool===at.tool;)y+=1;if(y-Te>=Jh&&!w.has(He)){X.push({kind:"group",idx:He,tool:at.tool||"",lines:Z.slice(Te,y)}),Te=y;continue}}X.push({kind:"line",idx:He,line:at}),Te+=1}return X}function oe(Z){let X=[],Te=new Map;for(let y=0;y<Z.length;y+=1){let U=Z[y],Oe=U.parent_tool_use_id;if(typeof Oe=="string"&&Oe.length>0){let Ie=Te.get(Oe);Ie||(Ie={kind:"subagent",idx:y,launch_id:Oe,agent_type:null,header:null,lines:[]},Te.set(Oe,Ie),X.push(Ie)),Ie.lines.push({idx:y,line:U});continue}if(U.kind==="tool"&&U.tool==="Agent"&&typeof U.launch_id=="string"&&U.launch_id.length>0){let Ie=D(U),Ue=Te.get(U.launch_id);if(Ue){Ue.header={idx:y,line:U},Ue.agent_type=Ie;continue}let Ke={kind:"subagent",idx:y,launch_id:U.launch_id,agent_type:Ie,header:{idx:y,line:U},lines:[]};Te.set(U.launch_id,Ke),X.push(Ke);continue}X.push({kind:"entry",idx:y,line:U})}let He=[],at=0;for(;at<X.length;){if(X[at].kind!=="entry"){He.push(X[at]),at+=1;continue}let y=at;for(;y<X.length&&X[y].kind==="entry";)y+=1;He.push(...Ee(X.slice(at,y))),at=y}return He}function D(Z){let X=Z.input;return X&&typeof X.subagent_type=="string"?X.subagent_type:null}function be(Z){for(let X=Z.length-1;X>=0;X-=1){let Te=Z[X];if(Te.kind==="result"||Te.kind==="error")return null;if(Te.kind==="tool"&&!Object.hasOwn(Te,"result"))return Te}return null}function Se(Z){for(let X=Z.length-1;X>=0;X-=1)if(Z[X].kind==="thinking")return Z[X];return null}function T(Z,X){if(X.kind==="gate")return c`<div class="sv__gate">${X.text}</div>`;if(X.kind==="phase")return c`<div class="sv__phase">${X.text}</div>`;if(X.kind==="result")return c`<div
        class="sv__result${X.success?" sv__result--ok":" sv__result--fail"}"
      >
        <span class="sv__result-glyph">${X.success?"\u2713":"\u2717"}</span>
        <span class="sv__result-body"
          >${lr(X.text||(X.success?"DONE":"\uC2E4\uD328"))}</span
        >
      </div>`;if(X.kind==="thinking"){let Te=m.has(Z);return c`<div
        class="sv__think${Te?" sv__think--expanded":""}"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>it(Z)}
      >
        <span class="sv__think-line">💭 ${es(X.text)}</span>
        ${Te?c`<pre class="sv__think-expand">${X.text}</pre>`:""}
      </div>`}if(X.kind==="user"){let Te=m.has(Z);return c`<div
        class="sv__line sv__line--user${Te?" sv__line--expanded":""}"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>it(Z)}
      >
        <span class="sv__user-line">▷ ${es(X.text)}</span>
        ${Te?c`<pre class="sv__user-expand">${X.text}</pre>`:""}
      </div>`}if(X.kind==="error")return c`<div class="sv__error">⛔ ${X.text}</div>`;if(X.kind==="blocker")return c`<div class="sv__error">⛔ ${X.text}</div>`;if(X.kind==="tool"){let Te=m.has(Z),He=X.tool==="Bash"?ob(X.command):0,at=X.tool==="Bash"?He>1?es(X.command):X.command:X.path||X.command||"";return c`<div
        class="sv__tool${Te?" sv__tool--expanded":""}"
        role="button"
        tabindex="0"
        @click=${()=>it(Z)}
      >
        <span class="sv__tool-line">
          <span class="sv__tool-icon">${X.icon}</span>
          <span class="sv__tool-name">${X.tool}</span>
          ${at?c`<span class="sv__tool-detail">${at}</span>`:""}
          ${He>1?c`<span class="sv__tool-more">⋯ ${He}줄</span>`:""}
          ${typeof X.added=="number"?c`<span class="sv__diff-add">+${X.added}</span>`:""}
          ${typeof X.removed=="number"?c`<span class="sv__diff-del">−${X.removed}</span>`:""}
          ${X.result?c`<span class="sv__tool-ok">→ ${X.result}</span>`:""}
        </span>
        ${Te?c`<pre class="sv__tool-expand">${ee(X)}</pre>`:""}
      </div>`}return c`<div class="sv__as">${lr(X.text||"")}</div>`}function ee(Z){let X=[];if(Z.tool==="Bash"&&typeof Z.command=="string"&&Z.command.length>0)X.push(Z.command);else if(Z.input!==void 0)try{X.push(`input: ${JSON.stringify(Z.input,null,2)}`)}catch{}return typeof Z.output=="string"&&Z.output.length>0&&X.push(`output:
${Z.output}`),X.join(`

`)}function me(){if(!s)return c``;let Z=P(),X=(i?[f.agent_type,f.model,f.effort]:[f.runner,f.model,f.effort]).filter(Boolean).join(" \xB7 "),Te=f.session_id||"",He=`\uB77C\uC774\uBE0C \uB530\uB77C\uAC00\uAE30 ${g?"ON":"OFF"}`,at=G(),y=at?ub(H(),Date.now()):"",U=at?be(Z):null,Oe=at?Se(Z):null,Ie=cb(Z);return c`<div class="sv" data-attempt-id=${s}>
      <div class="sv__bar">
        <span class="sv__id"
          >${f.label||(i?f.role||"":s)}</span
        >
        ${Ie?c`<span
              class="sv__stage${Ie.guess?" sv__stage--guess":""}"
              title=${Ie.text}
              >${Ie.text}</span
            >`:""}
        ${at?c`<span
              class="sv__live"
              title="세션이 진행 중입니다"
              aria-label=${y?`\uC9C4\uD589 \uC911 \xB7 \uB9C8\uC9C0\uB9C9 \uC774\uBCA4\uD2B8 ${y}`:"\uC9C4\uD589 \uC911"}
              ><span class="sv__live-dot" aria-hidden="true"></span>${y?c`<span class="sv__live-ago">${y}</span>`:""}</span
            >`:""}
        ${Te?c`<button
              type="button"
              class="sv__session"
              title=${Te}
              aria-label=${`\uC138\uC158 ID \uBCF5\uC0AC: ${Te}`}
              @click=${()=>ue(Te)}
            >
              ⧉ ${Te.slice(0,8)}
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
        ${X?c`<span class="sv__meta">${X}</span>`:""}
        ${f.worktree?c`<span class="sv__wt" title=${f.worktree}
              >${f.worktree}</span
            >`:""}
        ${i||d?"":c`<button
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
          class="sv__follow${g?" sv__follow--on":""}"
          aria-pressed=${g?"true":"false"}
          aria-label=${He}
          @click=${I}
        >
          <span class="sv__follow-full">⇣ ${He}</span>
          <span class="sv__follow-short">⇣ ${g?"ON":"OFF"}</span>
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
      ${i||d?"":Q()}
      <div class="sv__body">
        ${Z.length===0?c`<div class="sv__empty">세션 로그 없음</div>`:oe(Z).map(Ue=>Ue.kind==="subagent"?Ce(Ue):Ue.kind==="group"?ve(Ue):T(Ue.idx,Ue.line))}
      </div>
      ${U||Oe?c`<div class="sv__now">
            <span class="sv__now-label">지금</span>
            ${U?c`<span class="sv__now-icon">${U.icon}</span>
                  <span class="sv__now-name">${U.tool}</span>
                  <span class="sv__now-detail"
                    >${U.tool==="Bash"?es(U.command):U.path||U.command||""}</span
                  >`:""}
            ${Oe?c`<span class="sv__now-think"
                  >💭 ${es(Oe.text)}</span
                >`:""}
          </div>`:""}
    </div>`}function ve(Z){return c`<div
      class="sv__group"
      role="button"
      tabindex="0"
      title="펼치기"
      @click=${()=>_e(Z.idx)}
    >
      <span class="sv__group-icon">${Z.lines[0].line.icon}</span>
      <span class="sv__group-name">${Z.tool}</span>
      <span class="sv__group-count">${Z.lines.length}</span>
      <span class="sv__group-caret" aria-hidden="true">▸</span>
    </div>`}function Ce(Z){let X=w.has(Z.idx),Te=Z.header?Z.header.line:null,He=Te?Te.is_error===!0?"\u2717":typeof Te.result=="string"?"\u2713":"\u27F3":"",at=Te&&Te.command?Te.command:"";return c`<div class="sv__sub${X?" sv__sub--open":""}">
      <div
        class="sv__sub-head"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>_e(Z.idx)}
      >
        <span class="sv__sub-icon" aria-hidden="true">🤖</span>
        <span class="sv__sub-name">${Z.agent_type||"subagent"}</span>
        ${at?c`<span class="sv__sub-detail">${at}</span>`:""}
        <span class="sv__sub-count">${Z.lines.length}줄</span>
        ${He?c`<span class="sv__sub-state">${He}</span>`:""}
        ${X?"":c`<span class="sv__sub-caret" aria-hidden="true">▸</span>`}
      </div>
      ${X?c`<div class="sv__sub-body">
            ${Ee(Z.lines).map(y=>y.kind==="group"?ve(y):T(y.idx,y.line))}
          </div>`:""}
    </div>`}function _e(Z){w.add(Z),Re()}function Re(){st(me(),e),te(),g&&Ye()}function Ye(){let Z=e.querySelector(".sv__body");Z&&(Z.scrollTop=Z.scrollHeight)}function it(Z){m.has(Z)?m.delete(Z):m.add(Z),Re()}function I(){g=!g,Re()}function ue(Z){sn(Z).then(X=>{X?we("\uBCF5\uC0AC\uB428","success",1200):we("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function ne(Z){!s||!Z||(f={...f,...Z},Re())}function de(Z){let X=Z.target;if(!X||!X.classList||!X.classList.contains("sv__body"))return;!(X.scrollHeight-X.scrollTop-X.clientHeight<=4)&&g&&(g=!1,Re())}e.addEventListener("scroll",de,!0);function Ae(Z){let X=Z.target;!X||typeof X.closest!="function"||e.contains(X)||X.closest("dialog")||X.closest(".md-viewer-root")||Fe()}let ge=!1;function Ne(){ge||(document.addEventListener("mousedown",Ae),ge=!0)}function qe(){ge&&(document.removeEventListener("mousedown",Ae),ge=!1)}function Ze(Z){let X=Z&&Z.attempt_id;if(!X)return;let Te=typeof Z.launch_id=="string"&&Z.launch_id.length>0?Z.launch_id:null,He=Z.session_ref&&typeof Z.session_ref=="object"?Z.session_ref:null;if(Te&&He)return;let at=a;s=X,i=Te,l=He,a=i?`session-log:${s}:${i}`:`session-log:${s}`,n&&at&&at!==a&&Promise.resolve(n("unsubscribe-session-log",{id:at})).catch(()=>{}),u=typeof Z.root_dir=="string"&&Z.root_dir.length>0?Z.root_dir:null,f=Z.meta||{},d=Z.hide_prompt===!0,g=!0,m.clear(),w.clear(),L(),!C&&r&&(C=r.subscribe(Re)),n&&Promise.resolve(n("subscribe-session-log",{id:a,attempt_id:s,...i?{launch_id:i}:{},...l?{session_ref:l}:{},...u?{root_dir:u}:{}})).catch(()=>{}),Ne(),Re()}function Fe(){let Z=a;qe(),s=null,i=null,l=null,a=null,u=null,d=!1,m.clear(),w.clear(),L(),ke(),n&&Z&&Promise.resolve(n("unsubscribe-session-log",{id:Z})).catch(()=>{}),st(c``,e),o&&o()}return{open:Ze,updateMeta:ne,close:Fe,isOpen(){return s!==null},destroy(){ke(),qe(),C&&(C(),C=null),e.removeEventListener("scroll",de,!0),s=null,i=null,l=null,a=null,u=null,d=!1,st(c``,e)}}}function db(e){return["plan_review","plan_approval","plan_check"].some(t=>{let n=e[t];return typeof n=="string"&&n.trim().length>0})}function pb(e){let t=e&&e.metadata||{},n=Fr(e),r=[];return n.path&&r.push({kind:"spec",path:n.path,missing_state:n.evidence==="draft"?"spec_draft":null}),typeof t.plan_path=="string"&&t.plan_path.trim().length>0&&r.push({kind:"plan",path:t.plan_path.trim(),missing_state:db(t)?null:"plan_pending"}),r}function Yd(e,t){let n=pb(e);return c`
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
  `}var fb="## \u{1F916} \uC791\uC5C5 \uBCF4\uACE0\uC11C",_b=/^> (worker · attempt|session · sid) ([A-Za-z0-9._-]{1,64}) · (\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z)$/,mb=/^\*\*결론\*\* — (.+)$/;function Ei(e){if(typeof e!="string"||e.length===0)return null;let t=e.split(/\r?\n/);if(t[0]!==fb)return null;let n=_b.exec(t[1]||"");if(!n)return null;let r=n[1].split(" ")[0],o=n[2],s=n[3],i=2;for(;i<t.length&&t[i].trim().length===0;)i+=1;let l=i<t.length?mb.exec(t[i]):null,a=l?l[1].replace(/\s+/g," ").trim():"",u=l?i+1:i;return{lane:r,identifier:o,timestamp:s,conclusion:a,body:t.slice(u).join(`
`).trim()}}var Vd=20;function Xd(e){if(e==null||e==="")return"";let t=new Date(e);if(Number.isNaN(t.getTime()))return"";let n=String(t.getMonth()+1).padStart(2,"0"),r=String(t.getDate()).padStart(2,"0"),o=String(t.getHours()).padStart(2,"0"),s=String(t.getMinutes()).padStart(2,"0");return`${n}-${r} ${o}:${s}`}function gb(e){return e.length>Vd?`${e.slice(0,Vd)}\u2026`:e}function hb(e,t,n,r){let o=`${t.lane} ${gb(t.identifier)}`;return c`<div class="detail-report">
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
          ${lr(t.body)}
        </div>`:""}
  </div>`}function bb(e){return c`<div class="detail-comment" data-comment-id=${e.id}>
    <div class="detail-comment__meta">
      <span class="detail-comment__author"
        >${e.author||"(\uC791\uC131\uC790 \uC5C6\uC74C)"}</span
      >
      <span class="detail-comment__time"
        >${Xd(e.created_at)}</span
      >
    </div>
    <div class="detail-comment__body">
      ${lr(typeof e.text=="string"?e.text:"")}
    </div>
  </div>`}function Qd(e,t={},n={}){let r=Array.isArray(e)?e.filter(Boolean):[],o=n.expanded||new Set,s=typeof n.draft=="string"?n.draft:"",i=n.sending===!0,l=r.slice().sort((a,u)=>String(u.created_at||"").localeCompare(String(a.created_at||"")));return c`
    <div class="detail-section-label">댓글 (${r.length})</div>
    ${n.error?c`<div class="detail-empty" data-seam="comments-error">
          댓글을 불러오지 못했습니다
        </div>`:l.length===0?c`<div class="detail-empty" data-seam="comments">댓글 없음</div>`:c`<div class="detail-comments" data-seam="comments">
            ${l.map(a=>{let u=Ei(typeof a.text=="string"?a.text:"");return u?hb(a,u,t,o.has(a.id)):bb(a)})}
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
  `}var{I:Fx}=zl;var Zd=e=>e.strings===void 0;var yb={},Jd=(e,t=yb)=>e._$AH=t;var cr=bi(class extends ao{constructor(e){if(super(e),e.type!==Xn.PROPERTY&&e.type!==Xn.ATTRIBUTE&&e.type!==Xn.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!Zd(e))throw Error("`live` bindings can only contain a single expression")}render(e){return e}update(e,[t]){if(t===vn||t===Pt)return t;let n=e.element,r=e.name;if(e.type===Xn.PROPERTY){if(t===n[r])return vn}else if(e.type===Xn.BOOLEAN_ATTRIBUTE){if(!!t===n.hasAttribute(r))return vn}else if(e.type===Xn.ATTRIBUTE&&n.getAttribute(r)===t+"")return vn;return Jd(e),t}});var vb=[{id:"spec",label:"spec \uB9AC\uBDF0",receipt:"spec_review",receipt_stage:null,fill_stage:"spec",stale_stage:"spec",hue:"spec"},{id:"plan",label:"\uACC4\uD68D \uB9AC\uBDF0",receipt:null,receipt_stage:"plan",fill_stage:"plan",stale_stage:"plan",hue:"plan"},{id:"impl",label:"\uAD6C\uD604",receipt:null,receipt_stage:null,fill_stage:"impl",stale_stage:null,hue:"impl"},{id:"impl_review",label:"impl \uB9AC\uBDF0",receipt:"impl_review",receipt_stage:null,fill_stage:null,stale_stage:"impl",hue:"impl"},{id:"pr",label:"PR",receipt:null,receipt_stage:null,fill_stage:"pr",stale_stage:null,hue:"pr"}],ml={quick_fix:["impl","impl_review"],spec_backed:["spec","impl","impl_review","pr"],full_plan:["spec","plan","impl","impl_review","pr"]},ep={missing:"\uC2B9\uC778 \uD544\uC694",stale:"\uC7AC\uC2B9\uC778 \uD544\uC694",unknown:"\uC2B9\uC778 \uD655\uC778 \uBD88\uAC00"},wb={pin:"pin",global:"global",base:"base"};function kb(e){return c`<span
    class=${`detail-layer-rail detail-layer-rail--${wb[e]}`}
    data-source=${e}
    aria-hidden="true"
    ><i></i><i></i><i></i
  ></span>`}function $b(e,t,n){switch(e){case"workflow_mode":return Ao;case"spec_review_model":case"impl_review_model":return So;case"plan_review_model":return qs;case"spec_review_effort":case"plan_review_effort":case"impl_review_effort":return js;case"spec_review_speed":case"plan_review_speed":case"impl_review_speed":return Jr;case"impl_dispatch":return eu;case"impl_runtime":return Ns;case"impl_model":return eo(n,t.impl_runtime);case"impl_effort":return to(n,t.impl_runtime,t.impl_model);case"impl_speed":case"orchestration_speed":return Jr;case"orchestration_model":return Eo(n,null);case"orchestration_effort":return to(n,void 0,t.orchestration_model||bn).filter(r=>r!==bn);default:return[]}}function xb(e,t){return c`<div class="detail-effective__row" data-key=${e.key}>
    ${kb(e.source)}
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
      >${Fs[e.source]}</span
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
        >${Ab(s)}</span
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
              ${r.filter(u=>a.keys.includes(u.key)).map(u=>{let d=Ls({key:u.key,choices:$b(u.key,i,e.catalog),layer:"pin",pin:e.metadata,global:e.workspace_values,execution_defaults:e.execution_defaults,runner_catalog:e.catalog,route:typeof e.metadata?.route=="string"?e.metadata.route:null,controller_runtime:e.controller_runtime||null});return xb(u,{expanded:e.expanded,options:d.options,default_label:d.unset_label,default_full_value:d.full_value,onEdit:t.onEdit})})}
            `)}
          <div class="detail-effective__foot">
            <select
              data-impl-preset-select
              aria-label="실행 프리셋"
              .value=${cr(e.preset_id)}
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
  </details>`}function Ab(e){let t=[];if(e.workflow_mode&&t.push(e.workflow_mode.display),e.impl_dispatch?.value==="main")t.push("\uBA54\uC778");else if(e.impl_dispatch?.value==="delegated"){let n=e.impl_runtime?` ${e.impl_runtime.display}`:"";t.push(`\uC704\uC784${n}`)}for(let n of["impl_model","impl_effort","impl_speed"])e[n]?.resolution!=="not_applicable"&&t.push(e[n]?.display||"\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00");return t.join(" \xB7 ")}function Sb(e){if(!e||typeof e!="object")return null;let{kind:t,actor:n,effort:r,sha:o}=e;return typeof t!="string"||typeof n!="string"||typeof o!="string"?null:{kind:t,actor:n,effort:typeof r=="string"?r:null,sha:o}}function np(e,t={}){let n=e&&typeof e.metadata=="object"&&e.metadata?e.metadata:{},r=e&&typeof e.workflow=="object"&&e.workflow?e.workflow:{},o=r.stages||{},s=r.route||n.route||null,i=typeof n.pr_url=="string"?n.pr_url:"",l=typeof n.exec_receipt=="string"?n.exec_receipt:"",a=Sb(r.exec_receipt),u=a?Un(a):l,d=a?`${a.kind}:${a.actor}`:l.split("@")[0],f=Os(r.planned_execution,r.exec_receipt),g=r.chips?.pr?.number,m=typeof g=="number"?`PR #${g}`:"PR",w=Co(n),C=w!==null&&t.isChipOpen?.("rec")===!0,F=C?Ca({rec:w},"rec"):null;return c`<section class="detail-summary" data-seam="detail-summary">
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
      ${w?c`<button
            type="button"
            class="detail-summary__chip detail-summary__chip--rec judgement-chip"
            data-chip-key="rec"
            data-state=${w.state}
            aria-expanded=${C?"true":"false"}
            title=${Ws(w)}
            @click=${()=>t.onChipToggle?.("rec")}
          >
            ${"\uBCF5\uC7A1"}
          </button>`:""}
    </div>
    ${F?Qr(F):""}
    <div
      class="detail-summary__gates"
      role="group"
      aria-label="워크플로 게이트"
    >
      ${Eb(s).map(V=>Tb(V,n,o,{label:V.id==="pr"?m:V.label,href:V.id==="pr"?i:""}))}
    </div>
  </section>`}function Eb(e){let n=typeof e=="string"&&Object.hasOwn(ml,e)&&ml[e]||ml.spec_backed;return vb.filter(r=>n.includes(r.id))}var Ti={on:"\uD1B5\uACFC",stale:"\uC7AC\uAC80\uD1A0 \uD544\uC694",current:"\uC9C4\uD589 \uC911",none:"\uBBF8\uB3C4\uB2EC"};function Tb(e,t,n,r){let o=Cb(e,t,n),s=e.fill_stage?n[e.fill_stage]:null,i=typeof s?.fill=="string"?s.fill:null,l=i?i==="full":o.length>0,a=!l&&i==="dim",u=e.stale_stage?n[e.stale_stage]?.stale===!0:!1,d=o&&o.split("@")[1]?.slice(0,7)||"",f=u?Ti.stale:l?Ti.on:a?Ti.current:Ti.none,g=Rb(e,n),m=`${r.label} \xB7 ${f}${g?` \xB7 ${g}`:""}${o?` \xB7 ${o}`:""}`,w=`detail-summary__gate${l?" detail-summary__gate--on":""}${a?" detail-summary__gate--current":""}${u?" detail-summary__gate--stale":""}${d?" detail-summary__gate--receipt":""}`,C=c`<span class="detail-summary__gate-label"
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
      title=${m}
      >${C}</a
    >`:c`<span
    class=${w}
    data-gate=${e.id}
    data-hue=${e.hue}
    title=${m}
    >${C}</span
  >`}function Cb(e,t,n){if(e.receipt&&typeof t[e.receipt]=="string")return String(t[e.receipt]);if(e.receipt_stage){let r=n[e.receipt_stage]?.receipt;return typeof r=="string"?r:""}return""}function Rb(e,t){if(e.id!=="plan")return"";let n=t.plan?.approval_state;return typeof n=="string"&&Object.hasOwn(ep,n)?ep[n]:""}function Ci(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function rp(e){return Ci(e)&&typeof e.key=="string"&&e.key.length>0&&typeof e.email=="string"&&e.email.length>0}function op(e,t){let n=e&&e[t];if(!Ci(n)||!Array.isArray(n.accounts))return null;let r=n.accounts.filter(rp),o=rp(n.active)?n.active:null;return{accounts:r,active:o||r.find(s=>s.active===!0)||null}}function ap(e){return typeof e.alias=="string"&&e.alias.length>0?` (${e.alias})`:""}function Ri(e){let t=typeof e.status=="string"&&e.status!=="ok"?` \xB7 ${e.status}`:"";return`${e.email}${ap(e)}${t}`}function uo(e){let t=typeof e.plan=="string"&&e.plan.length>0?e.plan:"plan \uD655\uC778 \uBD88\uAC00";return`${e.email} \xB7 ${t}${ap(e)}`}function Ob(e,t,n){if(n!==null){let o=e==="claude"?Ri:uo,s=t?t.accounts.find(i=>i.key===n):void 0;return`\uB808\uD3EC \uAE30\uBCF8\uAC12 \uC0AC\uC6A9(${s?o(s):n})`}return t?t.active?`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(${e==="claude"?t.active.email:uo({...t.active,alias:null})})`:"\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(\uD655\uC778 \uBD88\uAC00)":"(\uAE30\uBCF8)"}function sp(e,t){if(!Ci(e)||e.state!=="usable"||!Ci(e.values))return null;let n=e.values[t];return typeof n=="string"&&n.length>0?n:null}function ip(e){let t=e.provider_key==="claude"?Ri:uo,n=!!e.provider?.accounts.some(r=>r.key===e.selected);return c`<div class="detail-kv" data-exec-account-row=${e.key}>
    <span class="detail-kv__k">${e.title}</span>
    <span class="detail-kv__vgroup">
      <select
        class=${e.selected?"detail-kv__v detail-kv__v--sel":"detail-kv__v"}
        aria-label=${e.title}
        data-exec-key=${e.key}
        @change=${r=>e.handlers.onExecChange(e.key,r.target.value)}
      >
        <option value="" ?selected=${e.selected.length===0}>
          ${Ob(e.provider_key,e.provider,e.workspace_default)}
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
  </section>`}function Ib(e){return String(e||"").replace(/^docs\/(superpowers\/)?/,"")}function Lb(e){let t=/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(e);if(!t)return{front:null,body:e};let n=t[1].trim();return{front:n.length>0?n:null,body:e.slice(t[0].length)}}function Oi(e,t){let n=t.getWorkspacePath,r=t.fetchImpl||globalThis.fetch?.bind(globalThis),o=null,s="loading",i="",l=null,a="";function u(C){C.key==="Escape"&&o&&(C.preventDefault(),m())}document.addEventListener("keydown",u);function d(){return o?c`
      <div class="mv-overlay" role="dialog" aria-modal="true">
        <div class="mv-overlay__backdrop" @click=${()=>m()}></div>
        <div class="mv">
          <div class="mv__bar">
            <span class="mv__path" title=${o}
              >${Ib(o)}</span
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
    `:c``}function f(){st(d(),e)}async function g(C,F={}){o=C,s="loading",i="",l=null,a="",f();let V=F.workspace||(n?n():"");if(!V){s="error",a="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4",f();return}if(!r){s="error",a="fetch\uB97C \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",f();return}let se="/api/doc?workspace="+encodeURIComponent(V)+"&path="+encodeURIComponent(C);try{let j=await r(se),N=await j.json().catch(()=>({}));if(!j.ok||!N||N.ok!==!0){if(N?.error==="not_found"&&F.missing_state==="plan_pending"){s="pending",a="\uACC4\uD68D \uC791\uC131 \uC804 \xB7 \uACBD\uB85C\uB9CC \uC608\uC57D\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4",f();return}s="error",a="\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 ("+String(N&&N.error||j.status)+")",f();return}let R=Lb(String(N.content||""));l=R.front,i=R.body,s="ready",f()}catch{s="error",a="\uBB38\uC11C \uC694\uCCAD \uC2E4\uD328",f()}}function m(){o=null,st(c``,e)}function w(){document.removeEventListener("keydown",u),m()}return{open:g,close:m,destroy:w}}var Pb=[{key:"input_tokens",label:"\uC785\uB825"},{key:"output_tokens",label:"\uCD9C\uB825"},{key:"cache_read_input_tokens",label:"\uCE90\uC2DC \uC77D\uAE30"}],dp="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4",Ii=[{role:"implementation",provider:"codex"},{role:"review-consult",provider:"codex"},{role:"subagent",provider:"claude"}],Db=new Set(["codex-runner","Explore","Plan","advisor","advisor-xhigh","claude-code-guide","statusline-setup"]);function cp(e){return typeof e=="string"&&Db.has(e)}var Mb=["running","done","failed","interrupted"],Nb={running:"\u25CF",done:"\u2713",failed:"\u2717",interrupted:"\u26A0"};function qb(e){return typeof e=="number"&&Number.isFinite(e)?e:0}function jb(e){let t=nn(e);if(t.length>0)return t.map(o=>c`<span class="detail-usage-total" title=${o.tooltip}
          >${o.label}</span
        >`);let n=Vr(e);if(!n||!e)return"";let r=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?` \xB7 $${e.total_cost_usd.toFixed(2)}`:"";return c`<span
      class="detail-usage-total"
      title="이 이슈의 모든 attempt 토큰 합계 (입력+출력+캐시)"
      >${n.replace(/^τ /,"\u03C4 \uCD1D ")}${r}</span
    >${e.replayed?c`<span class="detail-usage-partial" title=${dp}
          >부분 집계</span
        >`:""}`}function up(e){return!e||!e.roles.orchestrator?null:{providers:e.roles.orchestrator,roles:{}}}function bl(e){if(typeof e=="number")return ts(e);if(typeof e!="string")return"";let t=Date.parse(e);return Number.isFinite(t)?ts(t):""}function Fb(e){return typeof e=="string"?e.replace(/-\d{8}$/,""):""}function pp(e,t,n){if(e.provider!=="claude"){let o=e.session_id?` \xB7 thread ${e.session_id}`:"",s=n?" \xB7 \uC774\uC804 \uB77C\uC6B4\uB4DC \uC2A4\uB808\uB4DC \uC774\uC5B4\uAC10":"";return{text:`${n?"\u21A9 ":""}${e.launch_id}`,title:`${e.launch_id}${o}${s}`}}let r=t&&typeof t.agent_id=="string"?t.agent_id:"";return r.length>0?{text:r.slice(0,8),title:r}:{text:e.launch_id.slice(-8),title:e.launch_id}}function gl(e){return e===null||typeof e=="string"&&e.trim().length>0}function hl(e){return e===null||typeof e=="number"&&Number.isFinite(e)}function Bb(e){if(!e||typeof e!="object"||Array.isArray(e))return null;let t=e,n=t.provider==="claude";return typeof t.launch_id!="string"||t.launch_id.length===0||!Ii.some(r=>r.role===t.role&&r.provider===t.provider)||!(n?gl(t.model):typeof t.model=="string"&&t.model.length>0)||!(!("effort"in t)||gl(t.effort))||!(!("agent_type"in t)||gl(t.agent_type))||typeof t.session_id!="string"||t.session_id.length===0||!Mb.includes(t.status)||!(t.turn_id===null||typeof t.turn_id=="string")?null:n?!hl(t.started_at)||!hl(t.last_event_at)||!hl(t.completed_at)?null:t:typeof t.started_at!="number"||!Number.isFinite(t.started_at)||typeof t.last_event_at!="number"||!Number.isFinite(t.last_event_at)||!(t.completed_at===null||typeof t.completed_at=="string"&&Number.isFinite(Date.parse(t.completed_at)))?null:t}function Ub(e,t,n,r){let s=nn({providers:{[t]:{subtotal:n.subtotal,breakdown:n.usage,...n.replayed?{replayed:!0}:{}}},roles:{}})[0],i=pp({provider:t,launch_id:n.receipt_id,session_id:typeof n.session_id=="string"?n.session_id:void 0},n,r);return c`<div class="detail-session__leg detail-session__usage-detail">
    <span class="detail-session__leg-role detail-session__usage-label"
      >${e}</span
    >
    <span class="detail-session__leg-meta detail-session__usage-value"
      >${[n.provider,n.model,n.effort].filter(Boolean).join(" \xB7 ")}</span
    >
    <span
      class="detail-session__leg-sid detail-session__sid"
      title=${i.title}
      >${i.text}</span
    >
    ${bl(n.completed_at)?c`<span class="detail-session__leg-time detail-session__time"
          >${bl(n.completed_at)}</span
        >`:""}
    ${s?c`<span class="detail-session__usage" title=${s.tooltip}
          >${s.label}</span
        >`:""}
  </div>`}function Wb(e,t,n,r,o){let s=e.status==="running"?null:t,l=(s?nn({providers:{[e.provider]:{subtotal:s.subtotal,breakdown:s.usage,...s.replayed?{replayed:!0}:{}}},roles:{}}):[])[0],a=e.status==="running"?ts(e.last_event_at):s?bl(s.completed_at):"",u=(e.provider==="claude"?["Claude",e.agent_type,Fb(e.model),e.effort]:["codex",e.model,e.effort]).filter(Boolean).join(" \xB7 "),d=pp(e,s,o);return c`<button
    type="button"
    class="detail-session__leg detail-session__usage-detail detail-session__leg--${e.status}"
    data-launch-id=${e.launch_id}
    @click=${()=>r.onOpenDelegation&&r.onOpenDelegation(n,e.launch_id)}
  >
    <span class="detail-session__leg-glyph" aria-hidden="true"
      >${Nb[e.status]}</span
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
  </button>`}function zb(e,t){return e.role===t.role&&(e.model===null||t.model===void 0||e.model===t.model)&&e.session_id===t.session_id}function Hb(e,t,n){let r=[],o=new Set,s=Array.isArray(e.delegation_sessions)?e.delegation_sessions:[];for(let f of s){let g=Bb(f);!g||o.has(g.launch_id)||cp(g.agent_type)||(o.add(g.launch_id),r.push(g))}r.sort((f,g)=>(f.started_at||0)-(g.started_at||0));let i={};for(let{role:f,provider:g}of Ii){let m=t?t.roles[f]?.[g]:null;i[f]=m?[...m.legs]:[]}let l=Ii.flatMap(({role:f})=>i[f]),a=new Set,u=new Set,d=[];for(let{role:f,provider:g}of Ii){for(let m of r.filter(w=>w.role===f&&w.provider===g)){let w=l.find(F=>F.receipt_id===m.launch_id)||null;if(w&&!zb(m,w))continue;w&&a.add(w.receipt_id);let C=g==="codex"&&u.has(m.session_id);d.push(Wb(m,w,e.attempt_id,n,C)),g==="codex"&&u.add(m.session_id)}for(let m of i[f])if(!a.has(m.receipt_id)&&!cp(m.agent_type)){let w=typeof m.session_id=="string"&&m.session_id.length>0?m.session_id:null,C=g==="codex"&&w!==null&&u.has(w);d.push(Ub(f,g,m,C)),g==="codex"&&w!==null&&u.add(w)}}return d}function Gb(e,t){let n=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?e.total_cost_usd:null,r=[...Pb,{key:"cache_creation_input_tokens",label:t==="codex"?"\uCE90\uC2DC \uC4F0\uAE30":"\uCE90\uC2DC \uC0DD\uC131"},...t==="codex"&&typeof e.reasoning_output_tokens=="number"&&Number.isFinite(e.reasoning_output_tokens)?[{key:"reasoning_output_tokens",label:"\uCD94\uB860 \uCD9C\uB825"}]:[]];return c`<div class="detail-session__usage-detail">
    ${r.map(o=>c`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">${o.label}</span
          ><span class="detail-session__usage-value"
            >${qb(e[o.key]).toLocaleString("en-US")}</span
          ></span
        >`)}
    ${n===null?"":c`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">비용</span
          ><span class="detail-session__usage-value"
            >$${n.toFixed(2)}</span
          ></span
        >`}
    ${e.replayed?c`<span class="detail-session__usage-note">${dp}</span>`:""}
  </div>`}var Kb={running:"\u25CF",done:"\u2713",failed:"\u2717",orphaned:"\u26A0"};function ts(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),n=String(t.getHours()).padStart(2,"0"),r=String(t.getMinutes()).padStart(2,"0");return`${n}:${r}`}function Yb(e){if(typeof e.exec_default_preset_id!="string"||e.exec_default_preset_id.length===0)return"";let t=e.exec_values&&typeof e.exec_values=="object"?Object.entries(e.exec_values).filter(([,r])=>typeof r=="string"&&r.length>0).map(([r,o])=>`${r}=${o}`).join(" \xB7 "):"",n=typeof e.exec_default_preset_revision=="number"?` r${e.exec_default_preset_revision}`:"";return c`<div
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
      <span class="detail-session__id">${$o(e)}</span>
      <span class="detail-session__meta">${r}</span>
      <span class="detail-session__sid" title=${e.session_id}
        >${e.session_id.slice(0,8)}</span
      >
      <span class="detail-session__time">${ts(e.last_event_at)}</span>
    </button>
    ${e.resume_command?c`<button
          type="button"
          class="detail-session__resume-cmd"
          title=${e.resume_command}
          @click=${o=>{o.stopPropagation(),t.onCopyResumeCommand&&e.resume_command&&t.onCopyResumeCommand(e.resume_command)}}
        >
          ⧉ 재개
        </button>`:""}
  </div>`}function fp(e,t={},n={},r=[]){let o=Array.isArray(e)?e:[],s=Array.isArray(r)?r:[],i=[...s.filter(m=>m&&m.current===!0),...s.filter(m=>m&&m.current!==!0).sort((m,w)=>w.index-m.index)],l=i.map(m=>Xb(m,t)),a=n.expanded||new Set;if(o.length===0&&i.length===0)return c`
      <div class="detail-section-label">세션 이력</div>
      <div class="detail-empty" data-seam="session-history">세션 이력 없음</div>
    `;let u=new Set;for(let m of o)m&&typeof m.resumed_from=="string"&&m.resumed_from.length>0&&u.add(m.resumed_from);let d=m=>{if(!(m.status==="failed"||m.status==="orphaned"))return"";let C=typeof m.session_id=="string"&&m.session_id.length>0,F=u.has(m.attempt_id),V=C&&!F,se=C?F?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":"\uC774 \uC138\uC158\uC744 \uAC19\uC740 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C \uC774\uC5B4\uC11C \uC9C4\uD589":"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00";return c`<button
      type="button"
      class="detail-session__resume"
      data-attempt-id=${m.attempt_id}
      ?disabled=${!V}
      title=${se}
      @click=${j=>{j.stopPropagation(),V&&t.onResume&&t.onResume(m.attempt_id)}}
    >
      ↻ 이어하기
    </button>`},f=m=>{if(!(m.status==="failed"||m.status==="orphaned")||typeof m.cause!="string"||m.cause==="")return"";let C=m.cause_detail,F=C&&typeof C.reason=="string"&&C.reason.length>0?typeof C.command=="string"&&C.command.length>0?`${C.reason} \xB7 ${C.command}`:C.reason:m.cause;return c`<div class="detail-session__cause" title=${F}>
      ${m.cause}
    </div>`},g=m=>{let w=up(pa(m));if(nn(w).length===0&&!Vr(m.usage))return"";let C=a.has(m.attempt_id);return c`<button
      type="button"
      class="detail-session__usage-toggle"
      data-attempt-id=${m.attempt_id}
      aria-expanded=${C?"true":"false"}
      title=${C?"\uD1A0\uD070 \uB0B4\uC5ED \uC811\uAE30":"\uD1A0\uD070 \uB0B4\uC5ED \uD3BC\uCE58\uAE30"}
      @click=${F=>{F.stopPropagation(),t.onToggleUsage&&t.onToggleUsage(m.attempt_id)}}
    >
      τ 자세히
    </button>`};return c`
    <div class="detail-section-label">
      세션 이력${jb(n.total)}
    </div>
    <div class="detail-sessions" data-seam="session-history">
      ${l}${o.map(m=>{let w=pa(m),C=up(w),F=nn(C);return c`<div class="detail-session-row">
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
            ${ko(m)?c`<span
                  class="detail-session__resumed"
                  title=${ko(m)}
                  >↻</span
                >`:""}
            <span class="detail-session__meta">${$r(m)}</span>
            ${F.length>0?c`<span class="detail-session__role">orchestrator</span>`:""}
            ${m.session_id?c`<span class="detail-session__sid" title=${m.session_id}
                  >${String(m.session_id).slice(0,8)}</span
                >`:""}
            ${F.length>0?F.map(V=>c`<span
                      class="detail-session__usage"
                      title=${V.tooltip}
                      >${V.label}</span
                    >`):Vr(m.usage)?c`<span class="detail-session__usage"
                    >${Vr(m.usage)}</span
                  >`:""}
            <span class="detail-session__time">${ts(m.started_at)}</span>
          </button>
          ${g(m)} ${d(m)} ${f(m)} ${Yb(m)}
          ${a.has(m.attempt_id)&&m.usage?Gb(m.usage,m.runner==="codex"?"codex":"claude"):""}
          ${Hb(m,w,t)}
        </div>`})}
    </div>
  `}function _p(e,t={}){return c`
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
  `}function Qb(e){let t=lo(e);if(t)return t;let n=e.data;if(!n)return"";if(n.missing)return c`<div class="detail-prompt__missing">
        기록 없음 — 아직 이 이슈로 디스패치된 세션이 없습니다. 아래는 다음
        디스패치가 보낼 기본 과업입니다.
      </div>
      ${typeof n.default_task_prompt=="string"?Zn("\uC608\uC0C1 \uAE30\uBCF8 \uACFC\uC5C5",n.default_task_prompt):""}`;let r=Si(n.recorded_at);return c`<div class="detail-prompt__meta">
      ${n.attempt_id}${r?` \xB7 ${r}`:""}
    </div>
    ${typeof n.task_prompt=="string"?Zn("\uACFC\uC5C5 (user)",n.task_prompt):""}
    ${typeof n.system_prompt=="string"?Zn("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",n.system_prompt):""}`}var Or=10;function mp(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),n=r=>String(r).padStart(2,"0");return`${n(t.getMonth()+1)}-${n(t.getDate())} ${n(t.getHours())}:${n(t.getMinutes())}`}function gp(e,t={}){let r=(Array.isArray(e?.events)?e.events:[]).filter(l=>l&&typeof l.summary=="string"&&l.summary.trim().length>0);if(r.length===0)return"";let o=typeof e.shown=="number"&&e.shown>0?e.shown:Or,s=r.slice(0,o),i=r.length-s.length;return c`
    <div class="detail-section-label">Worker 이력 (${r.length})</div>
    <ol class="detail-timeline" data-seam="worker-timeline">
      ${s.map(l=>c`<li class="detail-timeline__row">
            ${mp(l.at)?c`<span class="detail-timeline__at"
                  >${mp(l.at)}</span
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
  `}var Zb=["open","in_progress","deferred","resolved","closed"],Jb=[0,1,2,3,4];function hp(e,t){let n=t.issueStores,r=t.onClose,o=t.transport,s=t.onNavigate,i=t.queueStore,l=t.execPresetStore,a=t.sessionLogStore,u=null,d=null,f={},g="",m=!1,w=[],C=!1,F={},V={claude:null,codex:null},se=null,j=null,N=0,R=!1,L=!1,B="",Y="",Q="",P="",H=!1;function G(){R=!1,L=!1,B="",Y="",Q="",P="",H=!1}function te(){V={claude:null,codex:null},se=null,j=null,N+=1}async function ke(){if(!o)return null;try{let b=await Promise.resolve(o("get-workspace-accounts",{}));return b&&typeof b.state=="string"?b:null}catch{return null}}async function Ee(b){try{let M=await fetch(b);if(!M.ok)return null;let W=await M.json();if(!W||typeof W!="object"||!Array.isArray(W.accounts))return null;let $e=W.accounts.filter(nt=>nt!==null&&typeof nt=="object"&&!Array.isArray(nt));return{accounts:$e,active:$e.find(nt=>nt.active===!0)||null}}catch{return null}}async function oe(b){j=b;let M=++N,[W,$e,nt]=await Promise.all([Ee("/api/claude-usage"),Ee("/api/codex-usage"),ke()]);M!==N||b!==u||(V={claude:W,codex:$e},se=nt,je())}let D=[],be=null,Se=null,T=!1,ee="",me=!1,ve=0,Ce=new Set;function _e(){D=[],be=null,Se=null,T=!1,ee="",me=!1,ve+=1,Ce.clear()}async function Re(b){if(!o)return;let M=++ve;try{let W=await Promise.resolve(o("get-comments",{id:b}));if(M!==ve||b!==u)return;D=Array.isArray(W)?W:[],T=!1}catch{if(M!==ve||b!==u)return;T=!0}je()}function Ye(){if(!o||!u)return;let b=d&&typeof d.comment_count=="number"?d.comment_count:null;if(be!==u){be=u,Se=b,Re(u);return}b!==null&&b!==Se&&(Se=b,Re(u))}function it(b){Ce.has(b)?Ce.delete(b):Ce.add(b),je()}function I(b){let M=ee.trim().length===0;ee=b,M!==(b.trim().length===0)&&je()}async function ue(){let b=ee.trim();if(!o||!u||b.length===0||me)return;let M=u;me=!0,je();let W=!1;try{let $e=await Promise.resolve(o("add-comment",{id:M,text:b}));Array.isArray($e)&&$e.length>0&&(W=!0,M===u&&(D=$e,T=!1,ee="",Se=$e.length))}catch{W=!1}W||we("\uB313\uAE00 \uCD94\uAC00 \uC2E4\uD328","error"),M===u&&(me=!1),je()}let ne={onToggle:it,onDraftInput:I,onSubmit:ue},de=t.mdViewer||null,Ae=null;de||(Ae=document.createElement("div"),Ae.className="md-viewer-root",document.body.appendChild(Ae));let ge=de||Oi(Ae,{getWorkspacePath:t.getWorkspacePath||(()=>"")}),Ne=document.createElement("div");Ne.className="session-log-root",document.body.appendChild(Ne);let qe=co(Ne,{transport:o?(b,M)=>Promise.resolve(o(b,M)):void 0,sessionLogStore:a}),Ze=!1,Fe=!1,Z=!1,X=null,Te=null,He=0;function at(b){return`${t.getWorkspacePath&&t.getWorkspacePath()||""}::${b}`}function y(){Ze=!1,Fe=!1,Z=!1,X=null,Te=null,He+=1}async function U(b){if(!o)return;let M=++He;Fe=!0,Z=!1,je();try{let W=await Promise.resolve(o("get-bead-prompt",{bead_id:b}));if(M!==He)return;!W||typeof W!="object"||Array.isArray(W)?Z=!0:(X=W,Te=at(b))}catch{M===He&&(Z=!0)}finally{M===He&&(Fe=!1,je())}}let Oe=[],Ie=null,Ue=0;function Ke(b,M){return`${t.getWorkspacePath&&t.getWorkspacePath()||""}::${b}::${M}`}function pt(){Oe=[],Ie=null,Ue+=1}async function Et(b,M){if(!o)return;let W=++Ue,$e;try{$e=await Promise.resolve(o("get-session-refs",{bead_id:b}))}catch{$e=null}W!==Ue||M!==Ie||(Oe=$e&&Array.isArray($e.sessions)?$e.sessions:[],je())}function It(){if(!o||!u)return;let b=d&&d.metadata,M=b&&typeof b=="object"&&typeof b.session_ref=="string"?b.session_ref:null;if(M===null){pt();return}let W=Ke(u,M);Ie!==W&&(Oe=[],Ie=W,Et(u,W))}let Mt=[],mt=[],ct=Or,$t=null,Ct=0;function Lt(b){return`${t.getWorkspacePath&&t.getWorkspacePath()||""}::${b}`}function ae(){Mt=[],mt=[],ct=Or,$t=null,Ct+=1}async function ie(b,M){if(!o)return;let W=++Ct,$e;try{$e=await Promise.resolve(o("get-bead-timeline",{bead_id:b}))}catch{$e=null}W!==Ct||M!==$t||(Mt=$e&&Array.isArray($e.events)?$e.events:[],mt=$e&&Array.isArray($e.attempts)?$e.attempts:[],ct=Or,je())}function $(){if(!o||!u)return;let b=Lt(u);$t!==b&&(Mt=[],mt=[],ct=Or,$t=b,ie(u,b))}function q(){ct+=Or,je()}function J(){if(Ze=!Ze,Ze&&u&&Te!==at(u)){X=null,U(u);return}je()}function re(){let b={};for(let W of mt)W&&typeof W=="object"&&W.bead_id===u&&(b[String(W.attempt_id)]=W);let M=i?i.get():null;for(let W of M&&M.attempts?Object.values(M.attempts):[]){let $e=W;$e&&$e.bead_id===u&&(b[String($e.attempt_id)]=$e)}return b}function le(){return u?Object.values(re()).sort((M,W)=>(W.started_at||0)-(M.started_at||0)).map(M=>({attempt_id:M.attempt_id,bead_id:M.bead_id,status:M.status,started_at:typeof M.started_at=="number"?M.started_at:null,runner:M.runner||null,model:M.model||null,effort:M.effort||M.observed_effort||null,speed:M.speed||null,session_id:M.session_id||null,resumed_from:M.resumed_from||null,continuation_mode:M.continuation_mode||null,dismissed_at:typeof M.dismissed_at=="number"?M.dismissed_at:null,cause:typeof M.cause=="string"?M.cause:null,cause_detail:M.cause_detail||null,exec_default_preset_id:typeof M.exec_default_preset_id=="string"?M.exec_default_preset_id:null,exec_default_preset_revision:typeof M.exec_default_preset_revision=="number"?M.exec_default_preset_revision:null,exec_values:M.exec_values&&typeof M.exec_values=="object"?M.exec_values:null,usage:M.usage||null,usage_legs:Array.isArray(M.usage_legs)?M.usage_legs:[],delegation_sessions:Array.isArray(M.delegation_sessions)?M.delegation_sessions:[]})):[]}function Be(){return u?Hn(re(),u):null}let Ve=new Set;function tt(b){Ve.has(b)?Ve.delete(b):Ve.add(b),je()}function ze(b){let M=i?i.get():null,W=M&&M.attempts?M.attempts[b]:null;qe.open({attempt_id:b,meta:W?{runner:W.runner||void 0,model:W.model||void 0,effort:W.effort||void 0,status:W.status||void 0,session_id:W.session_id||void 0}:{}})}function xt(b,M){let W=i?i.get():null,$e=W&&W.attempts?W.attempts[b]:null,rt=($e&&Array.isArray($e.delegation_sessions)?$e.delegation_sessions:[]).find(bt=>bt&&typeof bt=="object"&&bt.launch_id===M);rt&&qe.open({attempt_id:b,launch_id:M,meta:{runner:rt.provider==="claude"?"claude":"codex",role:rt.role,...typeof rt.agent_type=="string"?{agent_type:rt.agent_type}:{},model:rt.model,effort:rt.effort,session_id:rt.session_id,status:rt.status}})}async function Nt(b){if(!o||!b)return;let M=await Gr();if(M===null)return;let W=()=>{let bt=i?i.get():null;return bt&&typeof bt.revision=="number"?bt.revision:0},$e=async(bt={},Je=W())=>await o("worker-attempt-resume",{attempt_id:b,expected_revision:Je,...M!==""?{instructions:M}:{},...bt}),nt=bt=>{bt?.queue&&i?.set&&i.set(bt.queue)},rt=await $e();if(nt(rt),rt&&rt.conflict){let bt=rt.queue&&typeof rt.queue.revision=="number"?rt.queue.revision:W();rt=await $e({},bt),nt(rt)}rt=await Wn(rt,(bt,Je)=>$e({continuation:bt,decision_token:Je}),{onResult:nt,refresh:()=>$e()}),rt&&rt.resumed===!1&&!rt.conflict&&rt.reason&&we(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${rt.reason}`,"error",2400)}function At(b){!b||!u||qe.open(Kr(b,u,d&&d.status))}let Zt={onOpen:ze,onOpenDelegation:xt,onResume:Nt,onToggleUsage:tt,onOpenSessionRef:At,onCopyResumeCommand:p};function vt(){let b=i?i.get():null,M={...F};for(let W of["orchestration_model","orchestration_effort","orchestration_speed"]){let $e=b&&b[W];typeof $e=="string"&&(M[W]=$e)}return M}async function Rt(){if(o){try{let b=await Promise.resolve(o("get-session-defaults",{}));F=b&&b.values&&typeof b.values=="object"?b.values:{}}catch{F={}}je()}}function Wt(){let b=i?i.get():null;return b&&b.runner_catalog||null}function ut(){let b=i?i.get():null;return b&&typeof b.execution_defaults=="object"?b.execution_defaults:null}function Kt(){let b=d?.metadata&&typeof d.metadata=="object"?d.metadata:{},W=gn({pin:{...b,...f},global:vt(),execution_defaults:ut(),runner_catalog:Wt(),route:typeof b.route=="string"?b.route:null}).orchestration_model.value||"";return An(Wt(),W)}function Yt(){let b=l?l.get():null;return!b||typeof b.revision!="number"?null:{revision:b.revision,presets:Array.isArray(b.presets)?b.presets:[]}}function zt(b){return b?.compatible===!1}function _n(b){l&&b&&typeof b.revision=="number"&&Array.isArray(b.presets)&&l.set({revision:b.revision,presets:b.presets})}async function Ft(){let b=Yt(),M=b?.presets.find(W=>W.id===g);if(!(!o||!u||!b||!M||zt(M)||m)){m=!0,w=[],je();try{let W=await Promise.resolve(o("apply-impl-preset",uu(u,M.id,b.revision)));if(W&&W.conflict){_n(W),we("\uD504\uB9AC\uC14B\uC774 \uBCC0\uACBD\uB410\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uBAA9\uB85D\uC5D0\uC11C \uB2E4\uC2DC \uC801\uC6A9\uD558\uC138\uC694.","error",4e3);return}let $e=W&&Array.isArray(W.issue)?W.issue[0]:W?.issue;if(W&&W.applied&&$e&&typeof $e=="object"){d=$e,w=Array.isArray(W.skipped_orchestration_keys)?W.skipped_orchestration_keys.filter(nt=>typeof nt=="string"):[];for(let nt of du)delete f[nt];we(w.length>0?"\uC2E4\uD589 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4. \uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 3\uD0A4\uB294 Bead\uC5D0 \uD540\uD560 \uC218 \uC5C6\uC5B4 \uAC74\uB108\uB6F0\uC5C8\uC2B5\uB2C8\uB2E4.":"\uC2E4\uD589 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4.","success",4e3);return}W&&W.error==="bd_readback_failed"?we("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):we("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}catch(W){W&&typeof W=="object"&&W.code==="bd_readback_failed"?we("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):we("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}finally{m=!1,je()}}}let Jt=null;n&&n.subscribe&&(Jt=n.subscribe(()=>h()));let Ht=null;i&&typeof i.subscribe=="function"&&(Ht=i.subscribe(()=>{u&&je()}));let en=null,fe=null;function E(){fe&&(fe(),fe=null)}l&&typeof l.subscribe=="function"&&(en=l.subscribe(()=>{u&&je()}));function he(b){b.key==="Escape"&&u&&(b.preventDefault(),r())}document.addEventListener("keydown",he);let De=Xr(()=>je());De.attach();function h(){if(u){if(n&&typeof n.snapshotFor=="function"){let b=n.snapshotFor("detail:"+u)||[];d=b.find(W=>W&&W.id===u)||b[0]||d}Ye(),It(),$(),je()}}function p(b){sn(b).then(M=>{M?we("\uBCF5\uC0AC\uB428","success",1200):we("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function _(b){b.preventDefault(),b.stopPropagation(),u&&p(u)}function S(b,M){b.preventDefault(),b.stopPropagation(),p(M)}function z(b,M,W){b.preventDefault(),b.stopPropagation(),ge.open(M,{missing_state:W})}async function K(b,M){let W=Object.hasOwn(f,b),$e=f[b];if(f[b]=M,je(),!(!o||!u))try{let nt=await Promise.resolve(o("update-exec-settings",cu(u,b,M.length===0?null:M))),rt=Array.isArray(nt)?nt[0]:nt;if(!rt||typeof rt!="object"||!rt.id)throw new Error("exec settings readback failed");d=rt,delete f[b],je()}catch(nt){throw W?f[b]=$e:delete f[b],je(),we("\uC2E4\uD589 \uC124\uC815 \uBCC0\uACBD \uC2E4\uD328","error"),nt}}function ce(b){b.catch(()=>{})}async function xe(b,M){let W=d||{},$e=W.metadata&&typeof W.metadata=="object"?W.metadata:{},nt={};for(let Je of["impl_runtime","impl_model","impl_effort"])nt[Je]=Object.hasOwn(f,Je)?f[Je]:typeof $e[Je]=="string"?$e[Je]:"";nt[b]=M;let rt=_u(nt,Wt(),Kt()),bt={};for(let Je of["impl_runtime","impl_model","impl_effort"])bt[Je]=f[Je],f[Je]=rt[Je]||"";if(je(),!(!o||!u))return Promise.resolve(o("update-impl-target",{id:u,...rt,orchestration_runtime:Kt()})).then(Je=>{let dt=Array.isArray(Je)?Je[0]:Je;if(!dt||typeof dt!="object"||!dt.id)throw new Error("implementation target readback failed");d=dt;for(let $n of["impl_runtime","impl_model","impl_effort"])delete f[$n];je()}).catch(Je=>{for(let dt of["impl_runtime","impl_model","impl_effort"])bt[dt]===void 0?delete f[dt]:f[dt]=bt[dt];throw je(),we("\uAD6C\uD604 target \uBCC0\uACBD \uC2E4\uD328","error"),Je})}async function Xe(b,M,W){if(!o||!u)return!1;try{let $e=await Promise.resolve(o(b,M)),nt=Array.isArray($e)?$e[0]:$e;return nt&&typeof nt=="object"&&nt.id?(d=nt,!0):(we(W,"error"),!1)}catch($e){return $e&&typeof $e=="object"&&$e.code==="bd_readback_failed"?(we("\uC800\uC7A5\uB410\uC73C\uB098 \uD655\uC778 \uC2E4\uD328 \u2014 \uACE7 \uAC31\uC2E0\uB429\uB2C8\uB2E4","error"),{ok:!1,saved:!0}):(we(W,"error"),!1)}}function ot(b){setTimeout(()=>{try{let M=e.querySelector(b);M&&typeof M.focus=="function"&&M.focus()}catch{}},0)}function ht(){R=!0,B=d&&d.title||"",je(),ot('.detail-edit__input[data-edit="title"]')}function gt(b){B=b.target.value}function x(){R=!1,B="",je()}function A(){Xe("edit-text",{id:u,field:"title",value:B},"\uC81C\uBAA9 \uC800\uC7A5 \uC2E4\uD328").then(M=>{M===!0&&(R=!1,B=""),je()})}function Le(){L=!0,Y=d&&d.description||"",je(),ot('.detail-edit__textarea[data-edit="description"]')}function We(b){Y=b.target.value}function et(){L=!1,Y="",je()}function _t(){Xe("edit-text",{id:u,field:"description",value:Y},"\uC124\uBA85 \uC800\uC7A5 \uC2E4\uD328").then(M=>{M===!0&&(L=!1,Y=""),je()})}function qt(b,M,W,$e){if(b.key==="Escape"){b.stopPropagation(),W();return}b.key==="Enter"&&(!$e||b.ctrlKey||b.metaKey)&&(b.preventDefault(),M())}function v(b){let M=b.target.value;Xe("update-status",{id:u,status:M},"\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328").then(()=>je())}function k(b){let M=Number(b.target.value);Xe("update-priority",{id:u,priority:M},"\uC6B0\uC120\uC21C\uC704 \uBCC0\uACBD \uC2E4\uD328").then(()=>je())}function O(b){Q=b.target.value}function pe(){let b=Q.trim();b.length!==0&&Xe("label-add",{id:u,label:b},"\uB77C\uBCA8 \uCD94\uAC00 \uC2E4\uD328").then(M=>{M===!0&&(Q=""),je()})}function ye(b){if(b.key==="Escape"){b.stopPropagation(),Q="",je();return}b.key==="Enter"&&(b.preventDefault(),pe())}function Me(b){Xe("label-remove",{id:u,label:b},"\uB77C\uBCA8 \uC81C\uAC70 \uC2E4\uD328").then(()=>je())}let Qe={onCopyPath:S,onOpenDoc:z};function wt(b){return typeof b=="string"?b:b&&typeof b=="object"?String(b.id||b.to||b.issue_id||b.depends_on||""):""}function Bt(b){return b&&typeof b=="object"?String(b.dependency_type||b.type||""):""}function tn(b){switch(b){case"discovered-from":return{glyph:"\u21A9 ",relation:"\uBC1C\uACAC"};case"parent-child":return{glyph:"\u2338 ",relation:"\uC0C1\uC704"};case"related":return{glyph:"\u2194 ",relation:"\uAD00\uB828"};default:return b.length>0?{glyph:`${b} `,relation:b}:{glyph:"",relation:""}}}function mn(b,M){let W=In(M),$e=[];return b.length>0&&$e.push(b),W&&$e.push(W),$e.length>0?$e.join(`
`):void 0}function In(b){if(!b||typeof b!="object")return;let M=typeof b.status=="string"?b.status:"",W=typeof b.title=="string"?b.title:"";return M.length>0&&W.length>0?`${M} \xB7 ${W}`:void 0}function _r(){return(t.getWorkspacePath&&t.getWorkspacePath()||"").trim()}function Ln(){return t.depCandidates?t.depCandidates():null}async function Pn(b,M,W){let $e=_r(),nt=u;if(!nt)return;if($e.length===0){we("\uB808\uD3EC\uB97C \uC54C \uC218 \uC5C6\uC5B4 \uC758\uC874\uC744 \uBC14\uAFC0 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error");return}let rt=await Xe(b,{a:nt,b:M,view_id:nt,root_dir:$e},W),bt=rt===!0||rt!==!1&&rt.saved===!0;bt&&t.onDepChanged&&t.onDepChanged({type:b,a:nt,b:M}),b==="dep-add"&&bt&&(P="",H=!1),je()}function Xt(b){if(!u)return;let M=globalThis.confirm;typeof M=="function"&&!M(`${b}\uAC00 ${u}\uB97C \uB9C9\uB294 \uC5F0\uACB0\uC744 \uB04A\uC744\uAE4C\uC694?`)||Pn("dep-remove",b,"\uC758\uC874 \uD574\uC81C \uC2E4\uD328")}function jn(b){b.disabled||Pn("dep-add",b.bead_id,"\uC758\uC874 \uCD94\uAC00 \uC2E4\uD328")}function Pr(b){P=b.target.value,H=!0,je()}function mr(){H||(H=!0,je())}function Jn(b,M){if(b.key==="Escape"){b.stopPropagation(),P="",H=!1,je();return}b.key==="Enter"&&(b.preventDefault(),M.length===1&&!M[0].disabled&&jn(M[0]))}function kn(b){return c`<div class="detail-dep-add">
      <input
        class="detail-dep-add__input"
        aria-label="막는 이슈 추가"
        placeholder="막는 이슈 추가"
        .value=${P}
        @focus=${mr}
        @input=${Pr}
        @keydown=${M=>Jn(M,b)}
      />
      ${H||P.length>0?c`<div class="detail-dep-add__list">
            ${b.length===0?c`<div class="detail-dep-add__empty">후보 없음</div>`:b.map(M=>c`<button
                      type="button"
                      class="detail-dep-add__cand"
                      data-dep-cand=${M.bead_id}
                      ?disabled=${M.disabled}
                      title=${rn(M.reason)}
                      @click=${()=>jn(M)}
                    >
                      <span class="detail-dep-add__repo"
                        >${M.workspace_name}</span
                      >
                      <span class="detail-dep-add__id"
                        >${M.bead_id}</span
                      >
                      <span class="detail-dep-add__title"
                        >${M.title}</span
                      >
                    </button>`)}
          </div>`:""}
    </div>`}function er(b,M){let W=M.get(b.id),$e=s?c`<button
          type="button"
          class="detail-dep__link"
          title=${rn(b.title)}
          @click=${()=>W===void 0?s(b.id):s(b.id,W)}
        >
          ${b.label}
        </button>`:c`<span class="detail-dep__link" title=${rn(b.title)}
          >${b.label}</span
        >`;return c`<span
      class=${`detail-dep detail-dep--${b.kind}${s?" detail-dep--link":""}`}
      >${$e}${b.kind==="pred"?c`<button
            type="button"
            class="detail-dep__unlink"
            data-dep-b=${b.id}
            aria-label=${"\uC758\uC874 \uD574\uC81C: "+b.id}
            @click=${()=>Xt(b.id)}
          >
            ✕
          </button>`:""}</span
    >`}function Ge(b){let M=Array.isArray(b.dependencies)?b.dependencies:[],W=Array.isArray(b.dependents)?b.dependents:[],$e=[];for(let Je of M){let dt=wt(Je);dt.length>0&&Bt(Je)==="blocks"&&$e.push({id:dt,label:`\u26D3 ${dt}`,kind:"pred",title:mn("\uB9C9\uB294",Je)})}for(let Je of W){let dt=wt(Je);dt.length>0&&Bt(Je)==="blocks"&&$e.push({id:dt,label:`\u2192 ${dt}`,kind:"succ",title:mn("\uB9C9\uD788\uB294",Je)})}for(let Je of M){let dt=wt(Je),$n=Bt(Je);if(dt.length>0&&$n!=="blocks"){let Ll=tn($n);$e.push({id:dt,label:`${Ll.glyph}${dt}`,kind:"other",title:mn(Ll.relation,Je)})}}let nt=Ln(),rt=new Map;if(nt)for(let Je of nt.issues)rt.has(Je.bead_id)||rt.set(Je.bead_id,Je.root_dir);let bt=nt&&u?dd(ud(u,nt),P):[];return c`
      <div class="detail-section-label">의존성</div>
      ${$e.length===0?c`<div class="detail-empty">의존성 없음</div>`:c`<div class="detail-deps">
            ${$e.map(Je=>er(Je,rt))}
          </div>`}
      ${nt===null?c`<div class="detail-empty">후보를 불러올 수 없음</div>`:kn(bt)}
    `}function jt(b){let M=b.metadata||{},W=b.workflow||{},$e=W.stages||{},nt=$e.spec&&$e.spec.stale,rt=$e.impl&&$e.impl.stale,bt=W.quick_fix_review?.state==="stale",Je=$e.plan||null,dt=W.route_source==="derived",$n=W.route||M.route||"\u2014";return c`
      <div class="detail-section-label">워크플로우</div>
      <div class="detail-kv">
        <span class="detail-kv__k">route</span>
        <span
          class="detail-kv__v${dt?" detail-kv__v--derived":""}"
          title=${dt?"route \uBBF8\uD540 (metadata unset)":"route"}
          >${dt?"unset":$n}</span
        >
      </div>
      ${W.route!=="quick_fix"||Object.hasOwn(M,"spec_review")?c`<div class="detail-kv">
            <span class="detail-kv__k">spec_review</span>
            <span class="detail-kv__v"
              >${M.spec_review||"\uC5C6\uC74C"}${nt?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${W.route==="full_plan"?c`<div class="detail-kv">
              <span class="detail-kv__k">plan_review</span>
              <span class="detail-kv__v">${Je?.receipt||"\uC5C6\uC74C"}</span>
            </div>
            <div class="detail-kv">
              <span class="detail-kv__k">plan_approval</span>
              <span class="detail-kv__v"
                >${Je?.approval_receipt||"\uC5C6\uC74C"}${Je?.approval_state==="stale"?" \xB7 stale":Je?.approval_state==="unknown"?" \xB7 unknown":""}</span
              >
            </div>`:""}
      ${W.route!=="quick_fix"||Object.hasOwn(M,"impl_review")?c`<div class="detail-kv">
            <span class="detail-kv__k">impl_review</span>
            <span class="detail-kv__v"
              >${M.impl_review||"\uC5C6\uC74C"}${rt?" \xB7 stale":""}</span
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
      ${W.route==="quick_fix"||Object.hasOwn(M,"quick_fix_review")?c`<div class="detail-kv">
            <span class="detail-kv__k">quick_fix_review</span>
            <span class="detail-kv__v"
              >${M.quick_fix_review||"\uC5C6\uC74C"}${bt?" \xB7 stale":""}</span
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
              >${Un(W.exec_receipt)}</span
            >
          </div>`:""}
      ${W.impl_entry?c`<div class="detail-kv">
            <span class="detail-kv__k">impl_entry</span>
            <span class="detail-kv__v"
              >${`${W.impl_entry.actor}@${W.impl_entry.sha}`}</span
            >
          </div>`:""}
      ${M.pr_url?c`<div class="detail-kv">
            <span class="detail-kv__k">pr_url</span>
            <span class="detail-kv__v detail-kv__v--wrap">${M.pr_url}</span>
          </div>`:""}
    `}let yn={route:["quick_fix","spec_backed","full_plan"]};async function as(b,M){let W=M.target.value;if(b==="route"&&d&&d.metadata&&d.metadata.route==="full_plan"&&W!=="full_plan"&&!window.confirm(`full_plan \u2192 ${W||"(\uBBF8\uC124\uC815)"} \uC804\uD658: \uC800\uC7A5\uB41C plan \uC2B9\uC778\uC740 \uD3EC\uAE30\uB418\uBA70, plan \uD30C\uC77C\xB7\uB9C8\uCEE4 \uC815\uB9AC\uB294 \uC138\uC158 \uACC4\uC57D\uC774 \uC218\uD589\uD569\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`)){je();return}await Xe("update-workflow-meta",{id:u,key:b,value:W},"\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uBA54\uD0C0 \uBCC0\uACBD \uC2E4\uD328"),je()}function ls(b){let M=b.metadata||{};return c` ${(($e,nt)=>{let rt=yn[$e],bt=typeof M[$e]=="string"?M[$e]:"";return c`<div class="detail-kv">
        <span class="detail-kv__k">${$e}</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label=${$e}
          data-edit=${`wfmeta-${$e}`}
          @change=${Je=>as($e,Je)}
        >
          <option value="" ?selected=${!rt.includes(bt)}>
            ${nt}
          </option>
          ${rt.map(Je=>c`<option value=${Je} ?selected=${bt===Je}>${Je}</option>`)}
        </select>
      </div>`})("route","(unset)")} `}function cs(b,M){return R?c`
        <div class="detail-edit">
          <input
            class="detail-edit__input"
            data-edit="title"
            aria-label="제목 편집"
            .value=${B}
            @input=${gt}
            @keydown=${W=>qt(W,A,x,!1)}
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
        <h2 class="detail-overlay__title">${b}</h2>
        ${nn(M).map(W=>c`<span class="detail-usage-total" title=${W.tooltip}
              >${W.label}</span
            >`)}
        <button
          type="button"
          class="detail-edit-btn"
          data-edit="title"
          aria-label="제목 편집"
          @click=${ht}
        >
          ✎
        </button>
      </div>
    `}function po(b){let M=Vt(b.created_at),W=Vt(b.updated_at);return!M&&!W?c``:c`
      ${M?c`<div class="detail-kv">
            <span class="detail-kv__k">생성</span>
            <span class="detail-kv__v detail-kv__v--time">${M}</span>
          </div>`:""}
      ${W?c`<div class="detail-kv">
            <span class="detail-kv__k">수정</span>
            <span class="detail-kv__v detail-kv__v--time">${W}</span>
          </div>`:""}
    `}function us(b,M){return c`
      <div class="detail-section-label">속성 (수정 가능)</div>
      <div class="detail-kv">
        <span class="detail-kv__k">status</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label="status"
          data-edit="status"
          @change=${v}
        >
          ${Zb.map(W=>c`<option value=${W} ?selected=${W===b}>${W}</option>`)}
        </select>
      </div>
      <div class="detail-kv">
        <span class="detail-kv__k">priority</span>
        <select
          class="detail-kv__v"
          aria-label="priority"
          data-edit="priority"
          @change=${k}
        >
          ${Jb.map(W=>c`<option value=${String(W)} ?selected=${W===M}>
                P${W}
              </option>`)}
        </select>
      </div>
    `}function ds(b){return c`
      <div class="detail-title-row">
        <div class="detail-overlay__section-label">설명</div>
        ${L?"":c`<button
              type="button"
              class="detail-edit-btn"
              data-edit="description"
              aria-label="설명 편집"
              @click=${Le}
            >
              ✎
            </button>`}
      </div>
      ${L?c`<div class="detail-edit">
            <textarea
              class="detail-edit__textarea"
              data-edit="description"
              aria-label="설명 편집"
              rows="6"
              .value=${Y}
              @input=${We}
              @keydown=${M=>qt(M,_t,et,!0)}
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
                @click=${et}
              >
                취소
              </button>
            </div>
          </div>`:c`<div class="detail-overlay__desc">
            ${b||"(\uC124\uBA85 \uC5C6\uC74C)"}
          </div>`}
    `}function fo(b){let M=typeof b.notes=="string"?b.notes:"";return M.trim().length===0?c``:c`
      <div class="detail-overlay__section-label">노트</div>
      <div class="detail-overlay__notes">${M}</div>
    `}function ps(b){let M=Array.isArray(b.labels)?b.labels:[];return c`
      <div class="detail-section-label">라벨</div>
      <div class="detail-labels">
        ${M.map(W=>c`<span class="detail-label-chip"
              >${W}<button
                type="button"
                class="detail-label-chip__x"
                data-label=${W}
                aria-label=${"\uB77C\uBCA8 \uC81C\uAC70: "+W}
                @click=${()=>Me(W)}
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
            @input=${O}
            @keydown=${ye}
          />
          <button
            type="button"
            class="detail-label-add__btn"
            @click=${pe}
          >
            추가
          </button>
        </span>
      </div>
    `}function Pe(){if(!u)return c``;let b=d||{},M=String(b.id||u),W=b.title||"(\uC81C\uBAA9 \uC5C6\uC74C)",$e=Be(),nt=b.status||"open",rt=typeof b.priority=="number"?Math.max(0,Math.min(4,b.priority)):"",bt=b.description||"",Je={...b,metadata:{...b.metadata||{},...f}};return c`
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
              ${M}
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
          ${cs(W,$e)}
          ${np(Je,{onChipToggle:dt=>De.toggle({bead_id:M,chip_key:dt}),isChipOpen:dt=>De.isOpen({bead_id:M,chip_key:dt})})}
          ${tp({metadata:Je.metadata,workspace_values:vt(),catalog:Wt(),execution_defaults:ut(),expanded:C,presets:Yt()?.presets||[],preset_id:g,preset_busy:m,skipped_orchestration_keys:w},{onToggle:dt=>{C=dt,je()},onEdit:(dt,$n)=>{if(dt==="impl_runtime"||dt==="impl_model"||dt==="impl_effort"){ce(xe(dt,$n??""));return}ce(K(dt,$n??""))},onPresetSelect:dt=>{g=dt,w=[],je()},onPresetApply:()=>{Ft()}})}
          ${lp({md:Je.metadata,catalog:V,workspace_defaults:se,handlers:{onExecChange:(dt,$n)=>ce(K(dt,$n))}})}
          ${us(nt,rt)} ${po(b)}
          ${ds(bt)}
          ${Qd(D,ne,{expanded:Ce,draft:ee,sending:me,error:T})}
          ${fo(b)} ${ps(b)} ${Ge(b)}
          ${jt(b)} ${ls(b)}
          ${Yd(b,Qe)}
          ${_p({expanded:Ze,loading:Fe,error:Z,data:X},{onToggle:J})}
          ${fp(le(),Zt,{total:$e,expanded:Ve},Oe)}
          ${gp({events:Mt,shown:ct},{onMore:q})}
        </div>
      </div>
    `}function je(){st(Pe(),e)}return{load(b){b!==u&&(f={},g="",w=[],C=!1,G(),_e(),y(),pt(),ae(),te()),u=b,d=null,!fe&&t.subscribeCandidates&&(fe=t.subscribeCandidates(()=>{u&&je()})),h(),Rt(),j!==b&&oe(b)},clear(){u=null,d=null,f={},g="",m=!1,w=[],C=!1,G(),_e(),y(),pt(),ae(),te(),E(),ge.close(),qe.close(),st(c``,e)},destroy(){Jt&&(Jt(),Jt=null),Ht&&(Ht(),Ht=null),en&&(en(),en=null),E(),document.removeEventListener("keydown",he),De.detach(),de||(ge.destroy(),Ae&&Ae.parentNode&&Ae.parentNode.removeChild(Ae)),qe.destroy(),Ne.parentNode&&Ne.parentNode.removeChild(Ne),u=null,d=null,te(),g="",m=!1,w=[],_e(),y(),pt(),ae(),st(c``,e)}}}function bp(e){let t=document.createElement("dialog");t.id="fatal-error-dialog",t.setAttribute("role","alertdialog"),t.setAttribute("aria-modal","true"),t.innerHTML=`
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
    </div>`,e.appendChild(t);let n=t.querySelector("#fatal-error-title"),r=t.querySelector("#fatal-error-message"),o=t.querySelector("#fatal-error-detail"),s=t.querySelector("#fatal-error-reload"),i=t.querySelector("#fatal-error-close"),l=()=>{if(typeof t.close=="function")try{t.close()}catch{}t.removeAttribute("open")},a=(u,d,f="")=>{n&&(n.textContent=u||"Unexpected Error"),r&&(r.textContent=d||"An unrecoverable error occurred.");let g=typeof f=="string"?f.trim():"";if(o&&(g.length>0?(o.textContent=g,o.removeAttribute("hidden")):(o.textContent="No additional diagnostics available.",o.setAttribute("hidden",""))),typeof t.showModal=="function")try{t.showModal(),t.setAttribute("open","")}catch{t.setAttribute("open","")}else t.setAttribute("open","")};return s&&s.addEventListener("click",()=>{window.location.reload()}),i&&i.addEventListener("click",()=>l()),t.addEventListener("cancel",u=>{u.preventDefault(),l()}),{open:a,close:l,getElement(){return t}}}var ey="(max-width: 640px)";function Li(e){if(typeof window.matchMedia!="function")return e(!1),()=>{};let t=window.matchMedia(ey),n=!!t.matches;e(n);let r=o=>{let i=!!(typeof o=="object"&&o!==null&&typeof o.matches=="boolean"?o.matches:t.matches);i!==n&&(n=i,e(i))};return typeof t.addEventListener=="function"?(t.addEventListener("change",r),()=>{t.removeEventListener("change",r)}):typeof t.addListener=="function"?(t.addListener(r),()=>{typeof t.removeListener=="function"&&t.removeListener(r)}):()=>{}}function ty(){return{lanes:{done:!0},areas:{}}}function ns(e){let t={};if(typeof e!="object"||e===null)return t;for(let[n,r]of Object.entries(e))typeof r=="boolean"&&(t[n]=r);return t}function ny(e){try{let t=window.localStorage.getItem(e);if(!t)return null;let n=JSON.parse(t);if(typeof n!="object"||n===null)return null;let r=n;return typeof r.lanes=="object"&&r.lanes!==null?{lanes:ns(r.lanes),areas:ns(r.areas)}:{lanes:ns(r),areas:{}}}catch{return null}}function yp(e,t){try{window.localStorage.setItem(e,JSON.stringify(t))}catch{}}function Pi(e,t=ty()){let n={lanes:ns(t.lanes),areas:ns(t.areas)},r=ny(e),o={lanes:{...n.lanes,...r?r.lanes:{}},areas:{...n.areas,...r?r.areas:{}}};return{isCollapsed(s){return o.lanes[s]===!0},isAreaCollapsed(s){return o.areas[s]===!0},toggle(s){let i=o.lanes[s]!==!0;return o={...o,lanes:{...o.lanes,[s]:i}},yp(e,o),i},toggleArea(s){let i=o.areas[s]!==!0;return o={...o,areas:{...o.areas,[s]:i}},yp(e,o),i}}}function yl(e){if(typeof e=="string"&&e.length>0)return e;if(e&&typeof e=="object"){let t=e;if(typeof t.message=="string"&&t.message.length>0)return t.message;if(typeof t.error=="string"&&t.error.length>0)return t.error;if(t.error&&typeof t.error=="object"&&typeof t.error.message=="string")return t.error.message}return"\uC694\uCCAD\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4"}function Di(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"&&t.length>0):[]}function Mi(e){let{transport:t,console_el:n,getLanes:r,getWorkspaces:o,getCrossLanes:s,reproject:i,onCorrection:l,showToast:a,requestRender:u,adoptQueue:d,onDragBegin:f,candidate_drop:g}=e,m=[],w=null,C=!1,F=null,V=null,se=null;function j(){F!==null&&clearTimeout(F),F=setTimeout(()=>{F=null,C=!1},0)}function N(){return s()??null}function R(){let I=new Map,ue=o();for(let ne of Array.isArray(ue)?ue:[]){if(!ne||typeof ne!="object")continue;let de=ne.bead_blocked_by&&typeof ne.bead_blocked_by=="object"?ne.bead_blocked_by:{};for(let[Ae,ge]of Object.entries(de))Array.isArray(ge)&&I.set(Ae,Di(ge));for(let Ae of[...Array.isArray(ne.runnable)?ne.runnable:[],...Array.isArray(ne.session_active)?ne.session_active:[]])Ae&&typeof Ae.bead_id=="string"&&Array.isArray(Ae.blocked_by)&&Ae.blocked_by.length>0&&I.set(Ae.bead_id,Di(Ae.blocked_by))}return I}function L(){let I=new Map,ue=new Map,ne=o();for(let de of Array.isArray(ne)?ne:[]){if(!de||typeof de!="object")continue;let Ae=de.bead_blocked_by&&typeof de.bead_blocked_by=="object"?de.bead_blocked_by:{};for(let[ge,Ne]of Object.entries(Ae))Array.isArray(Ne)&&I.set(ge,Di(Ne));for(let ge of Array.isArray(de.runnable)?de.runnable:[])ge&&typeof ge.bead_id=="string"&&Array.isArray(ge.blocked_by)&&ue.set(ge.bead_id,Di(ge.blocked_by))}for(let de of m)for(let Ae of[I,ue]){let ge=Ae.get(de.a);ge!==void 0&&Ae.set(de.a,de.type==="dep-remove"?ge.filter(Ne=>Ne!==de.b):ge.includes(de.b)?ge:[...ge,de.b])}return{snapshot:I,runnable:ue}}function B(){let I=R();for(let ue of m){let ne=(I.get(ue.a)||[]).slice();ue.type==="dep-remove"?I.set(ue.a,ne.filter(de=>de!==ue.b)):ne.includes(ue.b)||I.set(ue.a,[...ne,ue.b])}return I}function Y(I=r(),ue=N()){let ne=new Map;for(let Fe of Array.isArray(ue?.lanes)?ue.lanes:[]){let Z=new Map;for(let X of Array.isArray(Fe?.entries)?Fe.entries:[])X&&typeof X.bead_id=="string"&&Z.set(X.bead_id,X.dep_created_by_lane===!0);ne.set(typeof Fe?.id=="string"?Fe.id:"",Z)}let de=new Map,Ae=new Map,ge=new Set,Ne=new Set;for(let Fe of I.chain_lanes){let Z=ne.get(Fe.lane_id);de.set(Fe.lane_id,{status:Fe.status,entries:Fe.rows.map((X,Te)=>({bead_id:X.id,root_dir:X.root_dir,...Te===0?{}:{dep_created_by_lane:Z?.get(X.id)===!0}}))});for(let X of Fe.rows)Ae.set(X.id,Fe.lane_id),X.fixed&&ge.add(X.id),X.unplaced||Ne.add(X.id)}let qe=new Map;for(let Fe of I.parallel_rows)typeof Fe.queue_index=="number"&&qe.set(Fe.id,Fe.queue_index);for(let Fe of I.queue_groups)for(let Z of Fe.sublanes.serial)for(let X of Z.items)typeof X.queue_index=="number"&&qe.set(X.id,X.queue_index);let Ze=L();return{blocked_by_map:B(),snapshot_blocked_by:Ze.snapshot,runnable_blocked_by:Ze.runnable,owner_of:new Map(Object.entries(I.owner_of)),cross_lanes:de,owner_lane_of:Ae,fixed_members:ge,placed_members:Ne,parallel_rows:I.parallel_rows.map(Fe=>({bead_id:Fe.id,root_dir:Fe.root_dir,queue_index:Fe.queue_index??0})),parallel_raw_length:new Map(Object.entries(I.parallel_raw_length)),queue_index_of:qe}}function Q(I,ue){let ne=r();for(let Ae of[...ne.runnable,...ne.queue,...ne.running,...ne.pr_wait,...ne.done])if(!(Ae.non_occupying||Ae.id!==ue)){if(Ae.root_dir===I)return Ae.expected_revision;break}let de=ne.queue_groups.find(Ae=>Ae.root_dir===I);return de?de.revision:0}async function P(I,ue,ne,de){if(!t)return null;let ge=await t(I,{...ue,...ne?{root_dir:ne}:{},expected_revision:de});if(ge&&ge.conflict){ge.queue&&d?.(ne,ge.queue);let Ne=ge.queue&&typeof ge.queue.revision=="number"?ge.queue.revision:de;ge=await t(I,{...ue,...ne?{root_dir:ne}:{},expected_revision:Ne})}return ge&&ge.queue&&d?.(ne,ge.queue),ge}async function H(I,ue,ne,de,Ae){try{let ge=await P(I,ue,ne,de.get(ne)??Q(ne,Ae.bead_id));return!ge||typeof ge.applied!="boolean"?(a("\uD050 \uC694\uCCAD\uC774 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error"),null):(ge.queue&&typeof ge.queue.revision=="number"&&de.set(ne,ge.queue.revision),ge.conflict?(a("\uD050\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD574 \uC8FC\uC138\uC694","error"),null):ge.applied===!1?(a(ge.admission_reason?`\uD050 \uC801\uC7AC \uAC70\uBD80: ${ge.admission_reason}`:"\uD050 \uC694\uCCAD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4","error"),null):ge.queue&&typeof ge.queue.revision=="number"?ge.queue.revision:de.get(ne)??0)}catch(ge){return a(yl(ge),"error"),null}}async function G(I,ue,ne=new Map){if(I.type==="worker-queue-disarm"){try{let de=await P(I.type,I.payload,I.root_dir,ne.get(I.root_dir)??Q(I.root_dir,ue));de&&de.queue&&typeof de.queue.revision=="number"&&ne.set(I.root_dir,de.queue.revision)}catch{}return!0}if(I.type==="worker-queue-place"||I.type==="worker-queue-reorder"||I.type==="worker-queue-remove")return await H(I.type,I.payload,I.root_dir,ne,{bead_id:ue})!==null;try{return(I.type==="dep-add"||I.type==="dep-remove")&&t&&await t(I.type,{a:I.a,b:I.b,...I.root_dir?{root_dir:I.root_dir}:{}}),!0}catch(de){return a(yl(de),"error"),!1}}function te(I){(I.type==="dep-add"||I.type==="dep-remove")&&(m=[...m,{type:I.type,a:I.a,b:I.b}])}async function ke(I,ue){if(!t)return{ok:!1};try{let ne=await t(I.type,{...I.payload,expected_revision:ue});return!ne||typeof ne.revision!="number"?(a("\uC5F0\uACB0 \uB808\uC778 \uC751\uB2F5\uC5D0 revision\uC774 \uC5C6\uC2B5\uB2C8\uB2E4","error"),{ok:!1}):{ok:!0,revision:ne.revision}}catch(ne){let de=ne,Ae=de&&de.code==="conflict"?de.details?.cross_lanes:null;return Ae&&typeof Ae.revision=="number"&&Array.isArray(Ae.lanes)?{ok:!1,conflict:Ae}:(a(yl(ne),"error"),{ok:!1})}}async function Ee(I,ue,ne){let de=new Map,Ae=[],ge=I.ops.slice(0,I.lane_op_index),Ne=I.ops.slice(I.lane_op_index);for(let Ze of ge){if(!await G(Ze,ne,de))return{done:!0};te(Ze)}let qe=ue;for(let Ze of I.lane_ops){if(qe===null)return a("\uC5F0\uACB0 \uB808\uC778 \uC800\uC7A5\uC18C\uB97C \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error"),{done:!0};let Fe=await ke(Ze,qe);if(!Fe.ok)return Fe.conflict?{done:!1,conflict:Fe.conflict}:{done:!0};qe=Fe.revision}for(let Ze of Ne){if(!await G(Ze,ne,de))return{done:!0};te(Ze),Ze.type==="dep-add"&&Ae.push(Ze)}for(let Ze of ld(Ae))qe=await oe(Ze,qe);return{done:!0}}async function oe(I,ue){if(ue===null||!t)return ue;let ne=I.pairs,de=ue;for(let Ae=0;Ae<2;Ae+=1){if(ne.length===0)return de;try{let ge=await t("monitor-lane-provenance",{lane_id:I.lane_id,pairs:ne.map(Ne=>({bead_id:Ne.bead_id,after:Ne.after,value:!0})),expected_revision:de});return ge&&typeof ge.revision=="number"?ge.revision:de}catch(ge){let Ne=ge,qe=Ne&&Ne.code==="conflict"?Ne.details?.cross_lanes:null;if(!qe||typeof qe.revision!="number"||!Array.isArray(qe.lanes))return de;let Ze=qe.lanes.find(Fe=>Fe&&Fe.id===I.lane_id);ne=cd(Array.isArray(Ze?.entries)?Ze.entries:[],ne),de=qe.revision}}return de}async function D(I,ue,ne=[]){m=ne,l("",0);let de=r(),Ae=N();for(let ge=0;;ge+=1){let Ne=I(Y(de,Ae));if("refused"in Ne){a(Ne.refused,"error");break}let qe=await Ee(Ne,de.cross_lanes_revision,ue);if(qe.done){Ne.correction&&l(Ne.correction.lane_id,Ne.correction.corrected);break}if(ge>=1){a("\uB808\uC778\uC774 \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4","error");break}let Ze=i(qe.conflict);de=Ze.lanes,Ae=Ze.raw_lanes}m=[],u()}async function be(I,ue){await D(ne=>_i(I,ue,ne),I.bead_id)}function Se(I,ue){let ne=ue&&typeof ue.closest=="function"?ue.closest("[data-row-index]"):null;if(ne&&I.contains(ne)){let de=Number(ne.getAttribute("data-row-index"));return Number.isFinite(de)?de:0}return I.querySelectorAll("[data-row-index]").length}function T(I){let ue=typeof I?.closest=="function"?I.closest(".worker-pane--collapsed[data-lane]"):null;if(!ue)return null;let ne=ue.getAttribute("data-lane");return ne==="queue"?{zone:ue,target:{kind:"parallel",marker_index:r().parallel_rows.length}}:ne==="candidate"&&g===!0?{zone:ue,target:{kind:"candidate"}}:null}function ee(I){let ue=I.target;if(!w)return null;let ne=typeof ue?.closest=="function"?ue.closest("[data-drop]"):null;if(!ne)return T(ue);let de=ne.getAttribute("data-drop");if(de==="candidate")return{zone:ne,target:{kind:"candidate"}};if(de==="parallel")return{zone:ne,target:{kind:"parallel",marker_index:Se(ne,ue)}};if(de==="chain")return{zone:ne,target:{kind:"chain",lane_id:ne.getAttribute("data-lane-id")||"",marker_index:Se(ne,ue)}};if(de==="repo-serial"){let Ae=ne.getAttribute("data-root-dir")||"";if(Ae!==w.root_dir)return null;let ge=typeof ue?.closest=="function"?ue.closest("[data-queue-index]"):null,Ne=ge&&ne.contains(ge)?ge.getAttribute("data-queue-index"):ne.getAttribute("data-lane-length"),qe=Number(Ne);return{zone:ne,target:{kind:"repo-serial",root_dir:Ae,lane_id:ne.getAttribute("data-lane-id")||"",index:Number.isFinite(qe)?qe:0}}}return null}function me(){for(let I of Array.from(n.querySelectorAll(".is-drop-over")))I.classList.remove("is-drop-over")}function ve(I){V=I.target instanceof Element?I.target:null}function Ce(I){let ue=I.target,ne=typeof ue?.closest=="function"?ue.closest('[draggable="true"][data-bead-id]'):null,de=ne?ne.closest("[data-drag-kind]"):null;if(!de)return;if(ne&&V&&ne.contains(V)&&typeof V.closest=="function"&&V.closest("input, button, a")){I.preventDefault();return}let Ae=de.getAttribute("data-bead-id")||"",ge=de.getAttribute("data-drag-kind")||"",Ne=de.getAttribute("data-root-dir")||"";if(!Ae||!ge)return;let qe=de.getAttribute("data-queue-index")||"",Ze=Number(qe),Fe=de.getAttribute("data-lane-id")||"";w={kind:ge,bead_id:Ae,root_dir:Ne,...qe!==""&&Number.isFinite(Ze)?{queue_index:Ze}:{},...Fe?{lane_id:Fe}:{}},C=!0,f?.(),n.classList.add("is-dragging");try{I.dataTransfer?.setData("text/plain",Ae),I.dataTransfer&&(I.dataTransfer.effectAllowed="move")}catch{}}function _e(I){let ue=ee(I);ue&&(I.preventDefault(),I.dataTransfer&&(I.dataTransfer.dropEffect="move"),ue.zone.classList.add("is-drop-over"))}function Re(I){let ue=I.target;typeof ue?.closest=="function"&&(ue.closest("[data-drop]")?.classList.remove("is-drop-over"),ue.closest(".worker-pane--collapsed")?.classList.remove("is-drop-over"))}function Ye(){w=null,me(),n.classList.remove("is-dragging"),j()}function it(I){let ue=ee(I),ne=w;w=null,me(),n.classList.remove("is-dragging"),!(!ue||!ne)&&(I.preventDefault(),be(ne,ue.target))}return{attach(I){se||(se=I,I.addEventListener("pointerdown",ve),I.addEventListener("dragstart",Ce),I.addEventListener("dragover",_e),I.addEventListener("dragleave",Re),I.addEventListener("drop",it),I.addEventListener("dragend",Ye))},detach(){F!==null&&(clearTimeout(F),F=null);let I=se;se=null,I&&(I.removeEventListener("pointerdown",ve),I.removeEventListener("dragstart",Ce),I.removeEventListener("dragover",_e),I.removeEventListener("dragleave",Re),I.removeEventListener("drop",it),I.removeEventListener("dragend",Ye))},isDragging(){return w!==null},consumeClickSuppression(){let I=C;return C=!1,I},applyDrop:be,runPlanned:D,dropModel:Y,sendOp:G,sendQueueCas:H,rememberDep:te}}var vl=Object.freeze({repo_ops_worktree_unowned:"\uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC\uAC00 \uC544\uC9C1 Worker \uC18C\uC720\uAC00 \uC544\uB2C8\uC5B4\uC11C \uC2A4\uD06C\uB9BD\uD2B8 \uC2E4\uD589 \uC804\uC5D0 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4.",verify_cmd_failed:"\uBA38\uC9C0 \uD6C4 \uAC80\uC99D \uBA85\uB839\uC774 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",gh_observation_failed:"GitHub\uC5D0\uC11C PR \uC0C1\uD0DC\uB97C \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",verify_script_failure:"\uAC80\uC99D \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",deploy_script_failure:"\uBC30\uD3EC \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",interrupted_without_terminal_exit:"\uC791\uC5C5\uC774 \uC885\uB8CC \uAE30\uB85D \uC5C6\uC774 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4.",manual_target_missing:"\uC218\uB3D9 \uBC30\uD3EC \uAE30\uB85D\uC5D0 \uD540\uB41C \uB300\uC0C1 SHA\uAC00 \uC5C6\uC5B4 \uC2E4\uD589\uD558\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4.",bootstrap_not_approved:"\uCCAB [deploy] \uC120\uC5B8\uC740 \uC0AC\uB78C \uC2B9\uC778 \uC5C6\uC774 \uC2E4\uD589\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4. Worker \uC124\uC815\uC758 [\uBC30\uD3EC \uC2E4\uD589]\uC73C\uB85C \uC6D0\uACA9 base tip\uC744 \uD55C \uBC88 \uBC30\uD3EC\uD55C \uB4A4 [\uC815\uC0B0 \uC7AC\uAC1C]\uB97C \uB204\uB974\uC138\uC694 \u2014 \uADF8 \uB4A4 \uBA38\uC9C0\uBD80\uD130\uB294 \uC790\uB3D9 \uBC30\uD3EC\uB429\uB2C8\uB2E4.",base_unresolved:"PR\uC774 \uC5B4\uB290 base \uBE0C\uB79C\uCE58\uB85C \uBA38\uC9C0\uB418\uB294\uC9C0 \uD655\uC815\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_ref_unobserved:"PR\uC758 base \uBE0C\uB79C\uCE58\uB97C \uC544\uC9C1 \uAD00\uCE21\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",merge_sha_unobserved:"\uBA38\uC9C0 \uCEE4\uBC0B SHA\uB97C \uC544\uC9C1 \uAD00\uCE21\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_fetch_failed:"\uC6D0\uACA9 base \uBE0C\uB79C\uCE58\uB97C fetch\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_rev_unavailable:"fetch\uD55C \uC6D0\uACA9 base \uBE0C\uB79C\uCE58\uC758 \uCEE4\uBC0B\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_ff_diverged:"\uB85C\uCEEC base \uBE0C\uB79C\uCE58\uAC00 \uC6D0\uACA9\uACFC \uAC08\uB77C\uC838 fast-forward\uB85C \uC815\uB82C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",deployment_target_not_covering_merge:"\uBC30\uD3EC \uB300\uC0C1 base\uAC00 \uC774 \uBA38\uC9C0 \uCEE4\uBC0B\uC744 \uD3EC\uD568\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.",deployment_candidate_ancestry_check_failed:"\uBC30\uD3EC \uB300\uC0C1 base\uAC00 \uC774 \uBA38\uC9C0 \uCEE4\uBC0B\uC744 \uD3EC\uD568\uD558\uB294\uC9C0 \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",verify_red:"\uBA38\uC9C0 \uD6C4 \uAC80\uC99D\uC774 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",cleanup_failed:"\uBA38\uC9C0 \uD6C4 \uC815\uB9AC\uAC00 \uB05D\uB098\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",retry_exhausted:"\uC790\uB3D9 \uC7AC\uC2DC\uB3C4\uB97C \uBAA8\uB450 \uC4F0\uACE0\uB3C4 \uAC19\uC740 \uC2E4\uD328\uAC00 \uC774\uC5B4\uC84C\uC2B5\uB2C8\uB2E4.",conflict_unresolved:"\uCDA9\uB3CC \uD574\uC18C\uAC00 \uB05D\uB098\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",internal_record_failed:"Worker \uB0B4\uBD80 \uAE30\uB85D\uC774 \uC2E4\uD328\uD574 \uC9C4\uD589\uC744 \uBA48\uCDC4\uC2B5\uB2C8\uB2E4.",foreign_landing_unpinned:"\uB2E4\uB978 \uC800\uC7A5\uC18C \uCC29\uC9C0\uC778\uB370 foreign_repo\xB7foreign_path\xB7foreign_base \uD540\uC774 \uC5C6\uAC70\uB098 \uD615\uC2DD\uC774 \uD2C0\uB9BD\uB2C8\uB2E4.",foreign_checkout_unavailable:"\uD540\uB41C \uB300\uC0C1 \uC800\uC7A5\uC18C \uCCB4\uD06C\uC544\uC6C3\uC774 \uC5C6\uAC70\uB098 foreign_repo\uC640 \uAC19\uC740 URL\uC758 remote\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4.",foreign_deploy_unsupported:"\uB300\uC0C1 \uC800\uC7A5\uC18C\uAC00 [deploy]\uB97C \uC120\uC5B8\uD574 Worker\uAC00 \uBC30\uD3EC \uC99D\uAC70\uB97C \uB9CC\uB4E4 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4. \uC138\uC158\uC774 \uBC30\uD3EC\uC640 \uB9C8\uAC10\uC744 \uC18C\uC720\uD569\uB2C8\uB2E4.",repair_lane_retired:"\uC790\uB3D9 \uC218\uB9AC \uB808\uC778\uC774 \uC740\uD1F4\uD574 \uC0AC\uB78C \uCC98\uB9AC\uB85C \uB118\uC5B4\uC654\uC2B5\uB2C8\uB2E4."});var vp={verify_failed:"\uAC80\uC99D \uC2E4\uD328",verify_cmd_failed:"\uAC80\uC99D \uC2E4\uD328",verify_script_failure:"\uAC80\uC99D \uC2E4\uD328",deploy_failed:"\uBC30\uD3EC \uC2E4\uD328",deploy_script_failure:"\uBC30\uD3EC \uC2E4\uD328",job_script_failure:"\uC7A1 \uC2E4\uD328",interrupted_without_terminal_exit:"\uC911\uB2E8\uB428",quickfix_landing_failed:"\uCC29\uC9C0 \uC2E4\uD328",runner_exit:"\uC138\uC158 \uC2E4\uD328",session_parked:"\uC138\uC158 \uB300\uAE30",session_ended_unresolved:"\uC138\uC158 \uC885\uB8CC",prerequisite_unmet:"\uC120\uD589 \uB300\uAE30",delivery_unproven:"\uCC29\uC9C0 \uC99D\uAC70 \uBD80\uC871"};function qi(e){return typeof e!="string"||e.length===0?[]:e.split(":").filter(t=>t.length>0)}function Ni(e){for(let t of qi(e)){if(Object.hasOwn(vp,t))return vp[t];if(t.startsWith("session_"))return"\uC138\uC158 \uC2E4\uD328"}return null}function kp(e){return qi(e).length===0?null:Ni(e)||"\uC2E4\uD328"}function Ir(e){let t=null;for(let n of qi(e))Object.hasOwn(vl,n)&&(t=vl[n]);return t}function ur(e){let t=Ni(e),n=Ir(e);return t&&n?`${t} \u2014 ${n}`:t||n?t||n:typeof e=="string"?e:""}function $p(e,t){let n=Ni(e)??Ni(t),r=Ir(t)??Ir(e);return n&&r?`${n} \u2014 ${r}`:n||r?n||r:typeof t=="string"?t:""}var ry=new Set(["repo_operation_timeout_unresolved"]);function oy(e){for(let t of qi(e))if(ry.has(t)||t.startsWith("repo_ops_"))return!0;return!1}function sy(e,t){return t.code==="interrupted"||t.interrupted===!0||e.failure_kind==="interrupted_without_terminal_exit"||t.code==="interrupted_without_terminal_exit"}function xp(e,t){if(!e||typeof e!="object")return"";let n=e.failure;if(!n||typeof n!="object"||oy(n.code))return"";if(n.code==="timeout"){let o=Number(t);return Number.isFinite(o)&&o>0?`\uD0C0\uC784\uC544\uC6C3 ${Math.round(o/1e3)}\uCD08 \uCD08\uACFC`:"\uD0C0\uC784\uC544\uC6C3 \uCD08\uACFC"}if(sy(e,n))return"\uC885\uB8CC \uAE30\uB85D \uC5C6\uC74C \u2014 \uC911\uB2E8\uB428";let r=typeof e.elapsed_ms=="number"&&Number.isFinite(e.elapsed_ms)&&e.elapsed_ms>=0?` \xB7 ${Er(e.elapsed_ms)}`:"";return typeof e.signal=="string"&&e.signal.length>0?`signal ${e.signal}${r}`:Number.isInteger(e.exit_code)?`exit ${e.exit_code}${r}`:""}var wp={schema_unsupported:"\uD540\uB41C \uC815\uCC45 \uC2A4\uD0A4\uB9C8\uB97C \uC9C0\uC6D0\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4."};function Ap(e){if(!e||typeof e!="object")return"";let t=e.retry;if(!t||typeof t!="object")return"";if(typeof t.blocked_reason=="string"&&t.blocked_reason)return`\uC790\uB3D9 \uC7AC\uC2DC\uB3C4 \uBABB \uD568 \u2014 ${Object.hasOwn(wp,t.blocked_reason)?wp[t.blocked_reason]:t.blocked_reason}`;if(t.status==="absorbed"){let n=t.absorbed&&typeof t.absorbed=="object"?t.absorbed:null,r=ur(n?.first_failure?.code);return r?`\uC790\uB3D9 \uC7AC\uC2DC\uB3C4\uB85C \uD574\uC18C\uB428 \u2014 \uCCAB \uC2E4\uD328: ${r}`:"\uC790\uB3D9 \uC7AC\uC2DC\uB3C4\uB85C \uD574\uC18C\uB428"}if(e.state!=="failed")return"";if(t.status==="not_applicable")return"\uC7AC\uC2DC\uB3C4 \uB300\uC0C1 \uC544\uB2D8 \u2014 \uC2A4\uD06C\uB9BD\uD2B8 \uC2E4\uD589 \uC804 \uC2E4\uD328";if(t.status==="consumed"){let n=typeof t.first_fingerprint=="string"&&t.first_fingerprint?t.first_fingerprint:null;if(n===null)return"";if(n===e.failure?.fingerprint)return"\uC790\uB3D9 \uC7AC\uC2DC\uB3C4 1\uD68C \u2014 \uAC19\uC740 \uC2E4\uD328";let r=ur(t.first_failure?.code);return r?`\uC790\uB3D9 \uC7AC\uC2DC\uB3C4 1\uD68C \u2014 \uB2E4\uB978 \uC2E4\uD328: ${r}`:"\uC790\uB3D9 \uC7AC\uC2DC\uB3C4 1\uD68C \u2014 \uB2E4\uB978 \uC2E4\uD328"}return""}function iy(e){if(!Number.isFinite(e)||e<0)return"0s";let t=Math.floor(e/1e3),n=Math.floor(t/60),r=t%60;return n>0?`${n}m ${String(r).padStart(2,"0")}s`:`${r}s`}var Sp=200;function ay(e){return typeof e!="string"||e.length===0?"":e.length>Sp?`${e.slice(0,Sp)}\u2026`:e}function ly(e){let t=e&&e.attempts>0&&e.max>0?` ${e.attempts}/${e.max}`:"",n=e&&typeof e.next_at=="number"?` \xB7 ${new Date(e.next_at).toLocaleTimeString("ko-KR",{hour:"2-digit",minute:"2-digit"})}`:"";return`\u21BB \uC7AC\uC2DC\uB3C4 \uB300\uAE30${t}${n}`}function Tp(e){if(!e)return"";let t=Array.isArray(e.timeline)?e.timeline:[],n=typeof e.log_path=="string"?e.log_path:"",r=e.log_expired===!0,o=e.log_unreadable===!0;return t.length===0&&n.length===0&&!r&&!o?"":c`${t.length>0?c`<ol class="rtile__history" data-seam="tile-timeline">
        ${t.map(s=>c`<li class="rtile__history-row">
              ${Ep(s.at)?c`<span class="rtile__history-at"
                    >${Ep(s.at)}</span
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
            ${ro(n)}
          </p>`:""}`}function Ep(e){return typeof e!="number"||!Number.isFinite(e)?"":new Date(e).toLocaleTimeString("ko-KR",{hour:"2-digit",minute:"2-digit"})}function cy(e,t){if(!e||e.open!==!0)return"";let n=Ir(e.cause)||ur(e.cause),r=e.retry&&e.retry.attempts>0?`\uC790\uB3D9 \uC7AC\uC2DC\uB3C4 ${e.retry.attempts}\uD68C \u2014 \uAC19\uC740 \uC624\uB958`:"",o=e.cause_detail,s=e.quickfix_lane&&e.quickfix_landing?e.quickfix_landing:null,i=s?[s.cursor||null,typeof s.head_sha=="string"?s.head_sha.slice(0,7):null,s.reason||null].filter(Boolean).join(" \xB7 "):"",l=typeof e.finished_at=="number"?`${new Date(e.finished_at).toLocaleString("ko-KR")} \xB7 ${on(e.finished_at,t)}`:"",a=[e.runner,e.model,e.observed_effort??e.effort,e.speed].filter(g=>typeof g=="string"&&g.length>0).join(" \xB7 "),u=e.usage?.total_cost_usd,d=typeof u=="number"&&Number.isFinite(u)?`$${u.toFixed(2)}`:"",f=Tp(e);return c`<div
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
  </div>`}function uy(e){return!e||!e.repo&&!e.serial_lane_id?"":c`${e.repo?c`<span
        class="worker-card__repo rtile__repo"
        title=${e.root_dir||""}
        >${e.repo}</span
      >`:""}${e.serial_lane_id?c`<span class="rtile__lane">${e.serial_lane_id}</span>`:""}`}var dy=new Set(["codex-runner"]);function py(e,t,n,r=null){if(!e)return"";let o=e.last_activity||null,s=o&&typeof o.text=="string"?o.text:"",i=o&&typeof o.at=="number"?o.at:null,l=(r||!Array.isArray(e.legs)?[]:e.legs).filter(m=>m&&!(typeof m.agent_type=="string"&&dy.has(m.agent_type))),a=l.filter(m=>m&&m.state==="live"),u=l.filter(m=>m&&m.state!=="live"),d=r&&typeof r.last_event_at=="number"?on(r.last_event_at,t):"",f=r?on(r.updated_at,t):"",g=d?`\uCD5C\uADFC \uD65C\uB3D9 ${d}`:f?`\uAC31\uC2E0 ${f}`:"";return c`${s?c`<div class="rtile__activity${n?" is-paused":""}">
        <span class="rtile__activity-dot" aria-hidden="true"></span>
        <span class="rtile__activity-text">${s}</span>
        ${i!==null?c`<span class="rtile__activity-age"
              >${on(i,t)}</span
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
      <div class="rtile__foot">${n}</div>`;let s=Tp(t);return c`${o?c`<p class="rtile__held-summary">${o}</p>`:""}${s}
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
    </div>`}function wl(e,t,n=null,r={}){let o=e.kind==="session",s=o&&Array.isArray(e.session_refs)&&e.session_refs.find(I=>I&&I.current===!0)||null,i=e.failed===!0,l=i&&e.failure||null,a=e.parked===!0&&!i,u=e.retry_wait===!0&&!i&&!a,d=e.waiting===!0&&!i&&!a&&!u,f=a&&e.failure||null,g=d&&e.wait||null,m=a||u||d,w=!!e.paused,C=i||m?e.status_label||(a?"\uC138\uC158 \uB300\uAE30":u?"\uC7AC\uC2DC\uB3C4 \uB300\uAE30":d?"\uC120\uD589 \uB300\uAE30":e.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328"):w?"\uC77C\uC2DC\uC815\uC9C0":typeof e.started_at=="number"?iy(t-e.started_at):"\u2014",F=e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker)?e.exec_chips:null,V=ko(e),se=nn(e.usage),j=zn(e.usage),N=e.conflict_resolution?w?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":"\uCDA9\uB3CC \uD574\uC18C":null,R=e.base_exception||null,L=e.landing,B=e.attempt_id&&e.attempt_id===n,Y=r.monitor||null,Q=uy(Y),P=Zs(Y?.cross_lane_chip),H=Y?Qs(Y.dependency_chips):"",G=py(Y,t,w,o?{updated_at:e.updated_at??null,last_event_at:s&&s.locality==="local"?s.last_event_at:null}:null),te=o&&e.workflow?.chips?.exec_receipt||null,ke=Js(e.workflow),Ee=ei(e.rec,e.chip_popover?.chip_key==="rec"),oe=e.chip_popover?Qr(e.chip_popover.content):"",D=te?c`<span
        class="ctl-chip ctl-chip--exec-receipt"
        title=${`exec_receipt ${Un(te)}`}
        >${`${te.kind}:${Rs(te)}`}</span
      >`:"",be=s?c`<span
        class="ctl-chip ctl-chip--sref"
        title=${`${s.provider}:${s.session_id}@${s.host}${(e.session_refs||[]).length>=2?` \xB7 \uC774\uB825 ${(e.session_refs||[]).length}`:""}`}
        >${$o(s)}</span
      >`:"",Se=Q||P||ke||be||D||Ee?c`<div class="rtile__meta">
          ${Q}${P}${ke}${be}${D}${Ee}${oe}
        </div>`:"",T=l?c`<button
          type="button"
          class="rtile__failure-badge"
          data-attempt-id=${l.attempt_id}
          aria-expanded=${l.open===!0?"true":"false"}
          aria-label="실패 상세"
        >
          ⛔ ${kp(l.cause)||"\uC2E4\uD328"}
        </button>
        ${l.halted_auto_advance?c`<span class="rtile__auto-halted">자동 진행 꺼짐</span>`:""}`:"",ee=a?c`<span
        class="rtile__held-badge"
        title="세션이 사용자 결정을 기다리며 정상 종료했습니다 — 큐는 계속 갑니다"
        >⏸ 세션 대기</span
      >`:u?c`<span
          class="rtile__held-badge"
          title="환경성 실패의 자동 재시도를 기다립니다 — 사람이 할 일은 없습니다"
          >${ly(e.retry)}</span
        >`:d?c`<span
            class="rtile__held-badge"
            title="세션이 선행 미충족으로 착수를 거부했습니다 — 선행이 닫히면 저절로 다시 돕니다"
            >⛓ 선행 대기</span
          >`:"",me=c`${N?c`<span class="worker-mini__badge">${N}</span>`:""}${R?c`<span
        class="worker-mini__badge"
        title="이 세션의 target base가 워크스페이스 선언 base와 다릅니다"
        >${R}</span
      >`:""}${T}${ee}`,ve=o?"":oo(e),Ce=Us(l?.quickfix_landing),_e=Ce==="settlement"?"\uC815\uC0B0 \uC7AC\uAC1C":"\uC774\uC5B4\uD558\uAE30",Re=Ce==="settlement"?"\uCC29\uC9C0 \uC815\uC0B0\uC744 \uB2E4\uC2DC \uC2E4\uD589":"\uAC19\uC740 \uC138\uC158\uC73C\uB85C \uC774\uC5B4\uC11C \uC9C4\uD589",Ye=e.resolve_action?c`<button
        type="button"
        class="rtile__resolve"
        ?disabled=${e.resolve_enabled===!1}
        title=${e.resolve_title||"\uC774 \uC2E4\uD328\uB97C \uC0AC\uB78C\uC774 \uC774\uC5B4\uBC1B\uB294 \uB300\uD654\uD615 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4"}
        aria-label="세션에서 해결"
      >
        세션에서 해결
      </button>`:"",it=e.discard?.action&&!(i&&l?.landed===!0)?c`<button
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
    class="rtile${B?" rtile--sel":""}${w?" rtile--paused":""}${i?" rtile--failed rtile--compact":""}${m?" rtile--held rtile--compact":""}${a?" rtile--parked":""}${u?" rtile--retry-wait":""}${d?" rtile--waiting":""}${o?" rtile--session":""}"
    data-bead-id=${e.bead_id}
    data-attempt-id=${e.attempt_id||""}
  >
    <div class="rtile__hd">
      <span
        class="rtile__dot${o?" rtile__dot--session":""}"
        aria-hidden="true"
      ></span>
      <span class="rtile__id" title="클릭하면 ID 복사">${e.bead_id}</span>
      ${ti(e.priority)}${V?c`<span class="rtile__resumed" title=${V}>↻</span>`:""}${me}
      <div class="rtile__hd-actions">
        ${o?c`${typeof e.started_at=="number"?c`<span class="rtile__elapsed">${C}</span>`:""}${_y(s)}<span
                class="rtile__session-badge"
                title="Worker가 아닌 세션이 in_progress로 잡은 이슈"
                >세션</span
              >`:c`<span class="rtile__elapsed">${C}</span>`}
        ${o||m?"":i?c`<button
                  type="button"
                  class="rtile__resume"
                  data-resume-kind=${Ce}
                  ?disabled=${l?.resume_eligible===!1}
                  title=${l?.resume_eligible===!1?l.resume_reason||`${_e} \uBD88\uAC00`:Re}
                  aria-label=${_e}
                >
                  ↻ ${_e}
                </button>
                ${it}`:c`<button
                  type="button"
                  class="rtile__session"
                  title="라이브 세션 열기"
                  aria-label="라이브 세션 열기"
                >
                  ▤ 세션
                </button>
                ${w?c`<button
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
                ${it}`}${Ye}
      </div>
    </div>
    <div class="rtile__title">${e.title}</div>
    ${m?my(a?"parked":u?"retry_wait":"waiting",a?f:g,it,d?H:""):i?"":c`${G}${e.rollup?Ts(e.rollup,{parent_id:e.bead_id,expanded:e.rollup_expanded===!0,childChips:sa}):""}
            ${L?c`<div class="rtile__landing">
                  <span
                    class="merge-step${L.failed?" merge-step--failed":""}"
                    style=${`--progress: ${L.percent}%`}
                    >${L.label}${L.index>0?c`<span class="merge-step__n"
                          >${L.index}/${L.total}</span
                        >`:""}</span
                  >
                </div>`:""}
            ${H}
            ${o?Se:Q||P||ke||F||Ee||se.length>0||j?c`<div class="rtile__meta">
                    ${Q}${P}${ke}${Xs(e.exec_chips)}${Ee}
                    ${se.length>0?se.map(I=>c`<span
                              class="worker-usage"
                              title=${I.tooltip}
                              >${I.label}</span
                            >`):j?c`<span
                            class="worker-usage"
                            title=${xo(e.usage)}
                            >${j}</span
                          >`:""}${oe}
                  </div>`:""}
            ${Gs(e)} ${ve}
            <!-- 살아있음만 말하는 비의미적 액센트 (UI-58y2 데스크톱 §실행 타일).
         quick_fix landing의 실제 진행은 위의 별도 진행 줄이 소유한다.
         일시정지된 타일은 살아있지 않으므로 액센트도 없다. -->
            ${i||w?"":c`<div class="rtile__accent" aria-hidden="true"></div>`}`}
    ${cy(l,t)}
  </div>`}function gy(e){let t=e.last_activity&&typeof e.last_activity=="object"?e.last_activity:null,n=Array.isArray(e.legs)?e.legs:[],r=e.dependency_chips||null;return!t&&n.length===0&&!r&&e.kind!=="session"?null:{...t?{last_activity:t}:{},...n.length>0?{legs:n}:{},...r?{dependency_chips:r}:{}}}function Cp(e,t=Date.now(),n=null){let r=Array.isArray(e)?e:[];return c`<div class="worker-rungrid" id="worker-rungrid">
    ${r.length===0?c`<div class="worker-rungrid__empty">실행 세션 없음</div>`:r.map(o=>wl(o,t,n,{monitor:gy(o)}))}
  </div>`}var Qt="",hy=["impl_runtime","impl_model","impl_effort"],by=["claude_account","codex_account"],yy=5,ji=1;function pn(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function Fi(e,t){let n=t.transport,r=typeof t.root_dir=="string"&&t.root_dir.length>0?t.root_dir:null,o=t.notify||($=>we($,"error",4e3)),s={},i={},l={},a={},u=[],d=!1,f={state:"absent",values:{},warnings:[]},g={},m={},w=Promise.resolve(),C={claude:null,codex:null},F=!1,V=null,se={},j="",N="",R=!1,L=!1,B=!1,Y=null,Q=!1;function P(){let $=t.queue?t.queue():null;return pn($)?$:null}function H(){let $=P();return $?$.runner_catalog:null}function G(){let $=P();return $&&pn($.execution_defaults)?$.execution_defaults:null}function te(){let $=t.implPresetStore?.get();return pn($)&&Array.isArray($.presets)?$:null}function ke(){return r===null?{}:{root_dir:r}}async function Ee($,q){return Q||!n?null:await n($,q)}function oe($){$&&pn($.queue)&&t.onQueueAdopt?.($.queue)}async function D($,q){let J=P();if(!J||Q)return null;let re=await Ee($,{...q,...ke(),expected_revision:J.revision});if(oe(re),r!==null&&re&&re.conflict){let le=re.queue&&typeof re.queue.revision=="number"?re.queue.revision:P()?.revision??J.revision;re=await Ee($,{...q,...ke(),expected_revision:le}),oe(re)}return re}async function be(){d=!0,ie();try{let $=await Ee("get-session-defaults",{...ke()});s=pn($?.values)?{...$.values}:{},i={...s},l={},a={},u=Array.isArray($?.warnings)?$.warnings:[]}catch($){u=["kv_read_failed"],o(`\uC138\uC158 \uAE30\uBCF8\uAC12\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4: ${$ instanceof Error?$.message:String($)}`)}finally{d=!1,ie()}}async function Se(){let $=iu(s,i);if(Object.keys($).length!==0){try{let q=await Ee("set-session-defaults",{values:$,...ke()});s=pn(q?.values)?{...q.values}:{},i={...s},u=Array.isArray(q?.warnings)?q.warnings:[]}catch(q){o(`\uC138\uC158 \uAE30\uBCF8\uAC12 \uC800\uC7A5 \uC2E4\uD328: ${q instanceof Error?q.message:String(q)}`)}ie()}}function T($,q){if(!pn($))return;let J=$.state;f={state:J==="usable"||J==="unusable"||J==="absent"?J:"absent",values:pn($.values)?{...$.values}:{},warnings:Array.isArray($.warnings)?$.warnings:[]},m={...f.values},q&&(g={...m})}async function ee(){try{T(await Ee("get-workspace-accounts",{...ke()}),!0)}catch($){f={state:"unusable",values:{},warnings:["kv_read_failed"]},m={},g={},o(`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4: ${$ instanceof Error?$.message:String($)}`)}ie()}async function me($){try{let q=await fetch($);if(!q.ok)return null;let J=await q.json();if(!pn(J)||!Array.isArray(J.accounts))return null;let re=J.accounts.filter(le=>pn(le)&&typeof le.key=="string"&&le.key.length>0&&typeof le.email=="string"&&le.email.length>0);return{accounts:re,active:re.find(le=>le.active===!0)||null}}catch{return null}}async function ve(){F=!0;let[$,q]=await Promise.all([me("/api/claude-usage"),me("/api/codex-usage")]);Q||(C={claude:$,codex:q},ie())}function Ce(){let $={};for(let q of by){let J=Object.hasOwn(g,q)?g[q]:null,re=Object.hasOwn(m,q)?m[q]:null;J!==re&&($[q]=J)}return $}async function _e(){let $=Ce();if(Object.keys($).length!==0){try{T(await Ee("set-workspace-accounts",{values:$,...ke()}),!1)}catch(q){o(`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12 \uC800\uC7A5 \uC2E4\uD328: ${q instanceof Error?q.message:String(q)}`)}ie()}}function Re($,q){q===Qt?delete g[$]:g[$]=q,ie(),w=w.then(()=>_e())}function Ye($,q){if(hy.includes($)){de($,q);return}q===Qt?delete i[$]:i[$]=q,ie(),Se()}function it($,q){l[$]=q,delete a[$]}function I($,q,J){if(l[$]=q,q.length>0&&!J(q)){a[$]=!0,ie();return}delete l[$],delete a[$],q.length===0?delete i[$]:i[$]=q,ie(),Se()}function ue(){let $=Lt().orchestration_model,q=gn({global:{orchestration_model:$??void 0},execution_defaults:G(),runner_catalog:H()}).orchestration_model.value;return q?An(H(),q):null}function ne($,q){typeof q=="string"&&q.length>0?i[$]=q:delete i[$]}function de($,q){let J=q===Qt?void 0:q,re=ou({impl_runtime:$==="impl_runtime"?J:i.impl_runtime,impl_model:$==="impl_model"?J:i.impl_model,impl_effort:$==="impl_effort"?J:i.impl_effort},H(),ue());ne("impl_runtime",re.impl_runtime),ne("impl_model",re.impl_model),ne("impl_effort",re.impl_effort),ie(),Se()}async function Ae(){let $=P();if(!$)return;let q={orchestration_model:$.orchestration_model??null,orchestration_effort:$.orchestration_effort??null,orchestration_speed:$.orchestration_speed??null},J=au(q,{...q,...se});if(Object.keys(J).length!==0){try{let re=await D("worker-queue-set-orchestration-defaults",{values:J});if(re&&re.applied===!1){o("Worker \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC");return}se={}}catch(re){o(`Worker \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${re instanceof Error?re.message:String(re)}`)}ie()}}function ge($,q){se[$]=q===Qt?null:q,ie(),Ae()}function Ne($){if(V=$,!$){ie();return}let q=H(),J=Lt(),re=J.orchestration_model;re&&!Eo(q,$).includes(re)&&(se.orchestration_model=null,re=null);let le=J.orchestration_effort;le&&!ma(q,$,re||bn).includes(le)&&(se.orchestration_effort=null),ie(),Ae()}async function qe($){if(!(!P()||$<ji)){try{await D("worker-queue-set-slots",{slots:$})}catch(q){o(`slots \uC800\uC7A5 \uC2E4\uD328: ${q instanceof Error?q.message:String(q)}`)}ie()}}async function Ze($){if(!(!P()||$<ji||$>yy)){try{await D("worker-queue-set-serial-lane-count",{count:$})}catch(q){o(`\uC9C1\uB82C \uB808\uC778 \uC800\uC7A5 \uC2E4\uD328: ${q instanceof Error?q.message:String(q)}`)}ie()}}async function Fe($,q){let J=$==="auto_advance"?"worker-automation-toggle":"worker-merge-auto-toggle";try{await D(J,{on:q})}catch(re){o(`\uC790\uB3D9\uD654 \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${re instanceof Error?re.message:String(re)}`)}ie()}function Z(){let $={},q=Lt();for(let J of Zr){let re=Kn.includes(J)?q[J]:i[J];typeof re=="string"&&re.length>0&&($[J]=re)}return $}async function X(){let $=te();if(!$)return;let q=Z();if(Object.keys(q).length===0){o("\uC800\uC7A5\uD560 \uC2E4\uD589 \uC124\uC815\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uBA3C\uC800 \uC2E4\uD589 \uAC12\uC744 \uC120\uD0DD\uD558\uC138\uC694");return}let J=($.presets||[]).find(le=>le.id===j),re=N.trim()||(J?J.name:"");if(!re){o("\uD504\uB9AC\uC14B \uC774\uB984\uC744 \uC785\uB825\uD558\uC138\uC694");return}try{let le=J?await Ee("impl-preset-update",{expected_revision:$.revision,id:J.id,name:re,settings:q}):await Ee("impl-preset-create",{expected_revision:$.revision,name:re,settings:q});if(le&&le.applied){if(N="",!J&&Array.isArray(le.presets)){let Be=le.presets.find(Ve=>Ve.name===re);j=Be?Be.id:j}ie()}else o("\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4"),ie()}catch(le){o(`\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328: ${le instanceof Error?le.message:String(le)}`)}}async function Te(){let $=te();if(!(!$||j.length===0))try{let q=await Ee("impl-preset-delete",{expected_revision:$.revision,id:j});q&&q.applied?(j="",ie()):(o("\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328: \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4"),ie())}catch(q){o(`\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328: ${q instanceof Error?q.message:String(q)}`)}}function He($){s=pn($.values)?{...$.values}:{},i={...s},u=Array.isArray($.warnings)?$.warnings:[],pn($.queue)&&(t.onQueueAdopt?.($.queue),se={})}async function at(){let $=te(),q=P();if(!$||!q||j.length===0)return;let J=re=>({preset_id:j,expected_revision:$.revision,expected_queue_revision:re,...ke()});try{let re=await Ee("apply-impl-preset-global",J(q.revision));if(re&&re.applied&&He(re),r!==null&&re&&re.queue_applied===!1){let le=re.queue&&typeof re.queue.revision=="number"?re.queue.revision:P()?.revision??q.revision;re=await Ee("apply-impl-preset-global",J(le)),re&&re.applied&&He(re)}re&&re.applied?re.queue_applied===!1&&o("\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uAC12\uC740 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC138\uC694"):re&&re.conflict&&o("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328: \uD504\uB9AC\uC14B\uC774 \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4")}catch(re){o(`\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328: ${re instanceof Error?re.message:String(re)}`)}ie()}async function y(){L=!0,B=!1,ie();try{let $=await Ee("get-worker-system-prompt",{});!$||typeof $!="object"||Array.isArray($)?B=!0:Y=$}catch{B=!0}finally{L=!1,ie()}}function U(){if(R=!R,R&&!Y){y();return}ie()}function Oe(){let $=lo({loading:L,error:B});if($)return $;if(!Y)return"";let q=Array.isArray(Y.variants)?Y.variants:[];return c`<div class="settings-dialog__sp-body">
      ${Y.target_base_placeholder?c`<div class="prompt-block__meta">
            \`${Y.target_base_placeholder}\`는 디스패치 시점에 해석된
            base로 치환됩니다.
          </div>`:""}
      ${q.map(J=>c`<div class="settings-dialog__sp-variant" data-variant=${J.key}>
            <div class="settings-dialog__sp-cond">${J.condition}</div>
            ${Zn(J.label,J.system_prompt)}
          </div>`)}
    </div>`}function Ie(){return c`<section
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
        aria-expanded=${R?"true":"false"}
        @click=${U}
      >
        ${R?"\uC811\uAE30":"\uC804\uBB38 \uBCF4\uAE30"}
      </button>
      ${R?Oe():""}
    </section>`}function Ue($,q,J,re,le,Be,Ve){let tt=le[$]??Qt,ze=ga($,J,le,G(),H(),Ve),xt=ze.options.find(At=>At.value===tt),Nt=tt===Qt?ze.full_value:xt?.full_value;return c`<select
        class=${tt===Qt?"settings-dialog__unset":""}
        data-key=${$}
        aria-label=${q}
        title=${Nt||""}
        ?disabled=${Be===!0||ze.disabled}
        .value=${cr(String(tt))}
        @change=${At=>re($,String(At.target.value))}
      >
        <option value=${Qt} ?selected=${tt===Qt}>
          ${ze.unset_label}
        </option>
        ${ze.options.map(At=>c`<option
              value=${At.value}
              title=${At.full_value||""}
              ?selected=${At.value===tt}
            >
              ${At.label}
            </option>`)}
      </select>
      ${tt===Qt?c`<span class="settings-dialog__source-badge">기본</span>`:""}`}function Ke($,q,J,re,le,Be=!1,Ve){return c`<div
      class=${`settings-dialog__row${Be?" settings-dialog__row--off":""}`}
    >
      <span class="settings-dialog__row-label">${q}</span>
      <span class="settings-dialog__controls">
        ${Ue($,q,J,re,le,Be,Ve)}
      </span>
    </div>`}function pt($,q,J,re,le,Be){let Ve=Object.hasOwn(a,$),tt=l[$]??i[$]??Qt;return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${q}</span>
      <span class="settings-dialog__controls">
        <input
          type="text"
          class=${`settings-dialog__text${Ve?" settings-dialog__text--invalid":""}`}
          data-key=${$}
          aria-label=${q}
          aria-invalid=${String(Ve)}
          placeholder=${J}
          .value=${cr(tt)}
          @input=${ze=>it($,String(ze.target.value))}
          @change=${ze=>I($,String(ze.target.value).trim(),Be)}
        />
        ${tt.length===0?c`<span class="settings-dialog__source-badge">기본</span>`:""}
        <span class="settings-dialog__hint" data-key-hint=${$}
          >${Ve?le:re}</span
        >
      </span>
    </div>`}function Et($,q){let J=q?q.active:null;return pn(J)?`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(${$==="claude"?J.email:uo({...J,alias:null})})`:"\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(\uD655\uC778 \uBD88\uAC00)"}function It($,q,J){let re=C[J],le=Object.hasOwn(g,$)?g[$]:Qt,Be=J==="claude"?Ri:uo,Ve=!!re?.accounts.some(tt=>tt.key===le);return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${q}</span>
      <span class="settings-dialog__controls">
        <select
          aria-label=${q}
          data-account-key=${$}
          @change=${tt=>Re($,String(tt.target.value))}
        >
          <option value=${Qt} ?selected=${le.length===0}>
            ${Et(J,re)}
          </option>
          ${le.length>0&&!Ve?c`<option value=${le} selected>
                ${le} (목록에 없음)
              </option>`:""}
          ${re?.accounts.map(tt=>c`<option value=${tt.key} ?selected=${tt.key===le}>
                ${Be(tt)}
              </option>`)||""}
        </select>
        ${re?"":c`<span class="settings-dialog__hint"
              >계정 목록을 불러올 수 없습니다</span
            >`}
      </span>
    </div>`}function Mt(){let $=f.warnings.join(", ");return f.state==="unusable"?`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12\uC744 \uD574\uC11D\uD560 \uC218 \uC5C6\uC5B4 \uC774 \uB808\uD3EC\uC758 \uB514\uC2A4\uD328\uCE58\uAC00 \uAC70\uBD80\uB429\uB2C8\uB2E4 \u2014 ${$} \xB7 \uACC4\uC815\uC744 \uB2E4\uC2DC \uACE0\uB974\uBA74 \uD574\uC18C\uB429\uB2C8\uB2E4`:f.warnings.length>0?`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12\uC5D0 \uC54C \uC218 \uC5C6\uB294 \uD0A4\uAC00 \uC788\uC2B5\uB2C8\uB2E4 \u2014 ${$}`:null}function mt($,q,J,re,le,Be){return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">
        <i
          class="settings-dialog__stage-dot"
          style=${`background: var(--stage-${q}-on)`}
        ></i>
        ${$}
      </span>
      <span class="settings-dialog__controls">
        ${Ue(J,`${$} \uBAA8\uB378`,re,Ye,i,!1)}
        ${Ue(le,`${$} effort`,js,Ye,i,!1)}
        ${Ue(Be,`${$} \uC18D\uB3C4`,tu,Ye,i,!1)}
      </span>
    </div>`}function ct($,q,J,re){return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${q}</span>
      <span class="settings-dialog__controls">
        <button
          type="button"
          class=${`settings-dialog__toggle${re?" is-on":""}`}
          data-automation=${$}
          aria-pressed=${re?"true":"false"}
          aria-label=${q}
          @click=${()=>Fe($,!re)}
        >
          ${re?"\uCF1C\uC9D0":"\uAEBC\uC9D0"}
        </button>
        <span class="settings-dialog__hint">${J}</span>
      </span>
    </div>`}function $t($,q,J,re){return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${q}</span>
      <span class="settings-dialog__controls">
        <span class="settings-dialog__stepper" data-stepper=${$}>
          <button
            type="button"
            aria-label=${`${q} \uAC10\uC18C`}
            @click=${()=>re(J-1)}
          >
            −
          </button>
          <span class="settings-dialog__stepper-value">${J}</span>
          <button
            type="button"
            aria-label=${`${q} \uC99D\uAC00`}
            @click=${()=>re(J+1)}
          >
            +
          </button>
        </span>
      </span>
    </div>`}function Ct($){return c`<div class="settings-dialog__preset-diff" data-preset-diff>
      <div class="settings-dialog__preset-diff-head">
        ${$.rows.length>0?`\uBCC0\uACBD ${$.rows.length}\uAC1C \xB7 \uC801\uC6A9\uD558\uBA74 \uC544\uB798\uC640 \uAC19\uC774 \uBC14\uB01D\uB2C8\uB2E4`:"\uD604\uC7AC \uC124\uC815\uACFC \uAC19\uC2B5\uB2C8\uB2E4 \u2014 \uC801\uC6A9\uD560 \uBCC0\uACBD\uC774 \uC5C6\uC2B5\uB2C8\uB2E4"}
      </div>
      ${$.rows.map(q=>c`<div
            class="settings-dialog__preset-diff-row"
            data-diff-kind=${q.kind}
          >
            <span class="settings-dialog__preset-diff-label">${q.label}</span>
            <span class="settings-dialog__preset-diff-value"
              >${q.before??"\uAE30\uBCF8"}</span
            >
            <span class="settings-dialog__preset-diff-arrow">→</span>
            <span
              class="settings-dialog__preset-diff-value settings-dialog__preset-diff-after"
              >${q.after??"\uAE30\uBCF8(\uD574\uC81C)"}</span
            >
          </div>`)}
      ${$.ignored_keys.length>0?c`<div class="settings-dialog__preset-diff-note">
            ${$.ignored_keys.join(", ")}은(는) 전역 적용이 쓰지 않는 키라
            무시됩니다
          </div>`:""}
    </div>`}function Lt(){let $=P(),q={};for(let J of Kn)q[J]=Object.prototype.hasOwnProperty.call(se,J)?se[J]:$&&typeof $[J]=="string"?$[J]:null;return q}function ae(){let $=H(),q=i.impl_runtime,J=i.impl_model,re=te(),le=P(),Be=Lt(),Ve=Eo($,V),tt=eo($,void 0).filter(ut=>ut!==bn),ze=ma($,V,Be.orchestration_model||bn).filter(ut=>ut!==bn),xt=j?(re?.presets||[]).find(ut=>ut.id===j):null,Nt=xt?su(Z(),pn(xt.settings)?xt.settings:{}):null,At=le&&typeof le.slots=="number"?le.slots:ji+1,Zt=le&&typeof le.serial_lane_count=="number"?le.serial_lane_count:ji,vt=G()?.supported===!0,Rt=Mt(),Wt=ga("workflow_mode",Ao,i,G(),$);return c`
      ${u.length>0?c`<div class="settings-dialog__banner" role="alert">
            워크스페이스 기본값을 일부 읽지 못했습니다 —
            ${u.join(", ")}
          </div>`:""}
      ${Rt?c`<div
            class="settings-dialog__banner"
            data-account-warning
            role="alert"
          >
            ${Rt}
          </div>`:""}
      ${vt?"":c`<div
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
                .value=${cr(j)}
                @change=${ut=>{j=String(ut.target.value),ie()}}
              >
                <option value="" ?selected=${j===""}>
                  실행 프리셋…
                </option>
                ${(re?.presets||[]).map(ut=>c`<option
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
                ?disabled=${!Nt||Nt.rows.length===0}
                @click=${at}
              >
                적용
              </button>
              <input
                type="text"
                class="settings-dialog__preset-name"
                placeholder=${j?"\uC774\uB984 (\uBE44\uC6B0\uBA74 \uC720\uC9C0)":"\uC0C8 \uD504\uB9AC\uC14B \uC774\uB984"}
                aria-label="프리셋 이름"
                .value=${cr(N)}
                @input=${ut=>{N=String(ut.target.value)}}
              />
              <button
                type="button"
                class="settings-dialog__btn"
                data-preset-save
                title=${j?"\uD604\uC7AC \uD654\uBA74\uC758 \uC2E4\uD589 \uC124\uC815\uC744 \uC774 \uD504\uB9AC\uC14B\uC5D0 \uC800\uC7A5\uD569\uB2C8\uB2E4 (\uD504\uB9AC\uC14B \u2192 \uC124\uC815 \uBC29\uD5A5\uC774 \uC544\uB2D8)":"\uD604\uC7AC \uD654\uBA74\uC758 \uC2E4\uD589 \uC124\uC815\uC744 \uC0C8 \uD504\uB9AC\uC14B\uC73C\uB85C \uC800\uC7A5\uD569\uB2C8\uB2E4"}
                @click=${X}
              >
                ${j?"\uD604\uC7AC \uC124\uC815\uC73C\uB85C \uB36E\uC5B4\uC4F0\uAE30":"\uC0C8 \uD504\uB9AC\uC14B \uC800\uC7A5"}
              </button>
              <button
                type="button"
                class="settings-dialog__btn"
                data-preset-delete
                ?disabled=${j.length===0}
                @click=${Te}
              >
                삭제
              </button>
            </div>
            ${Nt?Ct(Nt):""}

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">오케스트레이션</div>
              <div class="settings-dialog__row">
                <span class="settings-dialog__row-label">런타임</span>
                <span class="settings-dialog__controls">
                  <select
                    aria-label="런타임"
                    data-key="orchestration_runtime_filter"
                    .value=${cr(V||Qt)}
                    @change=${ut=>{let Kt=String(ut.target.value);Ne(Kt===Qt?null:Kt)}}
                  >
                    <option value=${Qt} ?selected=${!V}>
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
              ${Ke("orchestration_model","\uBAA8\uB378",Ve,ge,Be)}
              ${Ke("orchestration_effort","effort",ze,ge,Be)}
              ${Ke("orchestration_speed","\uC18D\uB3C4",Jr,ge,Be)}
            </div>

            <div class="settings-dialog__group" data-exec-accounts-group>
              <div class="settings-dialog__group-title">실행 계정</div>
              ${It("claude_account","Claude","claude")}
              ${It("codex_account","Codex","codex")}
            </div>

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">워크플로우</div>
              <div class="settings-dialog__row">
                <span class="settings-dialog__row-label">모드</span>
                <span class="settings-dialog__controls">
                  <span class="settings-dialog__seg" role="group">
                    <button
                      type="button"
                      data-mode=${Qt}
                      aria-pressed=${String(!i.workflow_mode)}
                      @click=${()=>Ye("workflow_mode",Qt)}
                    >
                      ${Wt.unset_label}
                    </button>
                    ${i.workflow_mode?"":c`<span class="settings-dialog__source-badge"
                          >기본</span
                        >`}
                    ${Ao.map(ut=>c`<button
                          type="button"
                          data-mode=${ut}
                          aria-pressed=${String(i.workflow_mode===ut)}
                          @click=${()=>Ye("workflow_mode",ut)}
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
              ${mt("\uC0AC\uC591 \uB9AC\uBDF0","spec","spec_review_model",So,"spec_review_effort","spec_review_speed")}
              ${mt("\uACC4\uD68D \uB9AC\uBDF0","plan","plan_review_model",qs,"plan_review_effort","plan_review_speed")}
              ${mt("\uAD6C\uD604 \uB9AC\uBDF0","impl","impl_review_model",So,"impl_review_effort","impl_review_speed")}
            </div>

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">
                구현
                <span class="settings-dialog__hint"
                  >이슈 핀이 있으면 핀이 우선합니다</span
                >
              </div>
              ${Ke("impl_runtime","\uC704\uC784 \uB300\uC0C1",Ns,Ye,i)}
              ${Ke("impl_model","\uBAA8\uB378",eo($,q),Ye,i)}
              ${Ke("impl_effort","effort",to($,q,J),Ye,i)}
              ${Ke("impl_speed","\uC18D\uB3C4",Jr,Ye,i)}
              ${Ke("quick_fix_impl_model","quick_fix \uAD6C\uD604 \uBAA8\uB378",tt,Ye,i,!1,{...i,...Be})}
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
              ${$t("slots","\uB3D9\uC2DC \uC2E4\uD589",At,ut=>qe(ut))}
              ${$t("serial-lane-count","\uC9C1\uB82C \uB808\uC778",Zt,ut=>Ze(ut))}
            </div>
            ${Ie()}
          `}
    `}function ie(){Q||st(ae(),e)}return{load(){se={},l={},a={};let $=[be(),ee()];return F||$.push(ve()),Promise.all($).then(()=>{})},render:ie,sessionDraft:()=>({...i}),destroy(){Q=!0,st(c``,e)}}}function Bi(e){return c`<svg
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
  </svg>`}function Rp(){return Bi(yo`<path d="M5.5 3.6 12 8l-6.5 4.4z" />`)}function Op(){return Bi(yo`<path d="M6 3.8v8.4M10 3.8v8.4" />`)}function Ip(){return Bi(yo`<path
      d="M4.6 5.6v4.8M4.6 8.2h2.2A3.2 3.2 0 0 0 10 5"
    />
    <circle cx="4.6" cy="4" r="1.5" />
    <circle cx="4.6" cy="12" r="1.5" />
    <circle cx="11.4" cy="4" r="1.5" />`)}function Lp(){return Bi(yo`<circle cx="8" cy="8" r="2.1" />
    <path
      d="M8 1.9v1.8M8 12.3v1.8M1.9 8h1.8M12.3 8h1.8M3.7 3.7l1.3 1.3M11 11l1.3 1.3M12.3 3.7 11 5M5 11l-1.3 1.3"
    />`)}function Pp(e){return`${e} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}function Dp(e){let t=(Array.isArray(e)?e:[]).map(l=>l&&l.usage).filter(l=>l&&typeof l=="object"&&"providers"in l);if(t.length>0)return nn(Ds(t));let n={};for(let l of Nn)n[l]=0;let r=!1,o=0,s=0,i=0;for(let l of Array.isArray(e)?e:[]){let a=l&&l.usage;if(a&&typeof a=="object"){let u=!1;for(let d of Nn){let f=a[d];typeof f=="number"&&Number.isFinite(f)&&(n[d]+=f,r=!0,u=!0)}if(u){s+=1;let d=a.total_cost_usd;typeof d=="number"&&Number.isFinite(d)&&(o+=d,i+=1)}}}return s>0&&i===s&&(n.total_cost_usd=o),r?zn(n):null}function On(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function kl(e,t){let n=On(e?.counts)?e.counts:null,r=n?n[t]:null;return typeof r=="number"&&Number.isFinite(r)?r:0}function vy(e,t){if(!On(t))return e;let n={...e};for(let[r,o]of Object.entries(t))o!==void 0&&(n[r]=o);return n}function wy(e){if(!On(e)||!On(e.execution_defaults)||!On(e.runner_catalog)||!On(e.session_defaults))return null;let t={...e.session_defaults};for(let i of["orchestration_model","orchestration_effort","orchestration_speed"])typeof e[i]=="string"&&e[i].length>0&&(t[i]=e[i]);let n=gn({global:t,execution_defaults:e.execution_defaults,runner_catalog:e.runner_catalog}),r=An(e.runner_catalog,n.orchestration_model.value??""),o=no(n,e.runner_catalog),s=Ar(n,r);return o===null&&s===null?null:{orchestration:o,worker:s}}function Mp(e,t){let n=t.notify||(T=>we(T,"error",4e3)),r=document.createElement("div");r.className="mon2-deck__main",e.appendChild(r);let o=document.createElement("div");o.className="mon2-deck__panel",o.hidden=!0;let s=document.createElement("div");s.className="mon2-deck__panel-hd";let i=document.createElement("span");i.className="mon2-deck__panel-title";let l=document.createElement("button");l.type="button",l.className="mon2-deck__panel-close",l.setAttribute("aria-label","\uC2E4\uD589 \uC124\uC815 \uB2EB\uAE30"),l.textContent="\u2715",s.append(i,l);let a=document.createElement("div");a.className="mon2-deck__panel-body",o.append(s,a),e.appendChild(o);let u=null,d=null,f=null,g=new Map;function m(){let T=t.workspacesState?t.workspacesState():[];return Array.isArray(T)?T.filter(ee=>On(ee)):[]}function w(T){return m().find(ee=>ee.root_dir===T)||null}function C(T){return vy(w(T),g.get(T))}function F(){for(let T of m()){let ee=g.get(T.root_dir);ee&&typeof ee.revision=="number"&&typeof T.revision=="number"&&T.revision>=ee.revision&&g.delete(T.root_dir)}}async function V(T,ee,me){let ve=t.transport,Ce=C(ee);if(!(!ve||!On(Ce))){try{let _e=await ve(T,{...me,root_dir:ee,expected_revision:Ce.revision});if(On(_e?.queue)&&g.set(ee,_e.queue),_e&&_e.conflict){let Re=On(_e.queue)&&typeof _e.queue.revision=="number"?_e.queue.revision:C(ee)?.revision;_e=await ve(T,{...me,root_dir:ee,expected_revision:Re}),On(_e?.queue)&&g.set(ee,_e.queue)}}catch(_e){n(`\uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${_e instanceof Error?_e.message:String(_e)}`)}D()}}function se(T){u!==T&&(u=T,t.onFocusChange?.(u),D())}function j(T){se(u===T?null:T)}function N(T){if(d===T){L();return}R(),d=T;let ee=w(T);i.textContent=`${ee?.name||T} \uC2E4\uD589 \uC124\uC815 \xB7 Worker \uD0ED \u2699 \uC2E4\uD589 \uD0ED\uACFC \uAC19\uC740 \uC800\uC7A5\uC18C`,o.hidden=!1,f=Fi(a,{root_dir:T,queue:()=>C(T),transport:t.transport,implPresetStore:t.implPresetStore,notify:n,onQueueAdopt:me=>{g.set(T,me),D()}}),f.load(),D()}function R(){f?.destroy(),f=null}function L(T){R(),d=null,o.hidden=!0,i.textContent="",T!==!0&&D()}let B=()=>L();l.addEventListener("click",B);function Y(T){T.key==="Escape"&&u!==null&&se(null)}document.addEventListener("keydown",Y);function Q(T,ee){let me=Math.max(ee,T,1);return c`<span
      class="mon2-deck__rail"
      role="img"
      aria-label=${`\uC2AC\uB86F ${ee}\uAC1C \uC911 ${T}\uAC1C \uC2E4\uD589 \uC911`}
    >
      ${Array.from({length:me},(ve,Ce)=>Ce<T?c`<i class="mon2-deck__slot is-run"></i>`:c`<i class="mon2-deck__slot"></i>`)}
    </span>`}function P(T){let ee=T.auto_advance===!0,me=T.auto_merge===!0;return c`<button
        type="button"
        class=${`mon2-deck__op mon2-deck__auto${ee?" is-on":""}`}
        data-act="auto"
        aria-pressed=${ee?"true":"false"}
        aria-label=${`${T.name} \uC790\uB3D9\uD654`}
        title=${ee?"\uC790\uB3D9\uD654 \uCF1C\uC9D0 \u2014 \uC2AC\uB86F\uC774 \uBE44\uBA74 \uB2E4\uC74C \uD589\uC774 \uCD9C\uBC1C\uD569\uB2C8\uB2E4":"\uC790\uB3D9\uD654 \uAEBC\uC9D0 \u2014 \uB2E4\uC74C \uD589\uC740 \uC218\uB3D9\uC73C\uB85C\uB9CC \uCD9C\uBC1C\uD569\uB2C8\uB2E4"}
      >
        ${ee?Op():Rp()}
      </button>
      <button
        type="button"
        class=${`mon2-deck__op mon2-deck__merge${me?" is-on":""}`}
        data-act="merge"
        aria-pressed=${me?"true":"false"}
        aria-label=${`${T.name} \uC790\uB3D9 \uBA38\uC9C0`}
        title=${me?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0"}
      >
        ${Ip()}
      </button>
      <button
        type="button"
        class=${`mon2-deck__op mon2-deck__gear${d===T.root_dir?" is-on":""}`}
        data-act="gear"
        aria-expanded=${d===T.root_dir?"true":"false"}
        aria-label=${`${T.name} \uC2E4\uD589 \uC124\uC815`}
        title="이 레포의 실행 설정"
      >
        ${Lp()}
      </button>`}function H(T){let ee=wy(T);return ee?c`<div class="mon2-deck__chips">
      ${ee.orchestration?c`<span class="mon2-deck__chip" title=${ee.orchestration.title}
            >오케 ${ee.orchestration.text}</span
          >`:""}
      ${ee.worker?c`<span class="mon2-deck__chip" title=${ee.worker.title}
            >워커 ${ee.worker.text}</span
          >`:""}
    </div>`:""}function G(T){let ee=[];for(let[me,ve]of[["queue","\uB300\uAE30"],["pr_wait","PR"],["session_active","\uC138\uC158"]]){let Ce=kl(T,me);Ce>0&&ee.push(`${ve} ${Ce}`)}return ee.join(" \xB7 ")}function te(T){let ee=kl(T,"running"),me=typeof T.slots=="number"?T.slots:1;return c`<div
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
          title=${`\uC2AC\uB86F ${me}\uAC1C \uC911 ${ee}\uAC1C \uC2E4\uD589 \uC911`}
        >
          <span class="mon2-deck__load-n">${ee}/${me}</span>
          ${Q(ee,me)}
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
        <span class="mon2-deck__counts">${G(T)}</span>
        ${H(T)}
      </div>
    </div>`}function ke(T){let ee=t.doneItems?t.doneItems():[],me=t.rangeLabel?t.rangeLabel():"",ve=Dp(Array.isArray(ee)?ee:[]),Ce=_e=>T.reduce((Re,Ye)=>Re+kl(Ye,_e),0);return c`<div class="mon2-deck__bar">
      <span
        class="mon2-deck__total-counts"
        title=${`visible \uB808\uD3EC ${T.length}\uACF3\uC758 \uD569\uACC4\uC785\uB2C8\uB2E4 \u2014 \uC2E4\uD589\xB7\uB300\uAE30\xB7PR\uC740 \uC9C0\uAE08, \uC644\uB8CC\uB294 ${me}`}
        >실행 ${Ce("running")} · 대기 ${Ce("queue")} · PR
        ${Ce("pr_wait")}${Ce("session_active")>0?` \xB7 \uC138\uC158 ${Ce("session_active")}`:""}
        · ${me} 완료
        ${Array.isArray(ee)?ee.length:0}</span
      >
      ${ve===null?"":c`<span class="mon2-deck__total-tokens">
            ${typeof ve=="string"?c`<span
                  class="mon2-deck__tok"
                  title=${Pp(me)}
                  >${ve}</span
                >`:ve.map(_e=>c`<span
                      class="mon2-deck__tok"
                      data-provider=${_e.provider}
                      title=${_e.tooltip}
                      >${_e.label}</span
                    >`)}
          </span>`}
    </div>`}function Ee(){let T=m();return T.length===0?"":c`${ke(T)}
      <div class="mon2-deck__strip">
        ${T.map(ee=>te(ee))}
      </div>`}function oe(){u!==null&&!w(u)&&(u=null,t.onFocusChange?.(null))}function D(){F(),oe(),d!==null&&!w(d)&&L(!0),st(Ee(),r),f?.render()}function be(T){let ee=T.target;if(!ee||typeof ee.closest!="function")return;let me=ee.closest("[data-root-dir]");if(!me)return;let ve=me.getAttribute("data-root-dir")||"",Ce=ee.closest("[data-act]")?.getAttribute("data-act");if(Ce==="worker"){t.gotoWorkerTab?.(ve);return}if(Ce==="auto"){V("worker-automation-toggle",ve,{on:C(ve)?.auto_advance!==!0});return}if(Ce==="merge"){V("worker-merge-auto-toggle",ve,{on:C(ve)?.auto_merge!==!0});return}if(Ce==="gear"){N(ve);return}j(ve)}function Se(T){if(T.key!=="Enter"&&T.key!==" ")return;let ee=T.target;if(!ee||typeof ee.closest!="function")return;let me=ee.closest('[data-root-dir][role="button"]');!me||me!==ee||(T.preventDefault(),j(me.getAttribute("data-root-dir")||""))}return r.addEventListener("click",be),r.addEventListener("keydown",Se),{render:D,focusRoot:()=>u,panelRoot:()=>d,destroy(){document.removeEventListener("keydown",Y),r.removeEventListener("click",be),r.removeEventListener("keydown",Se),l.removeEventListener("click",B),R(),st(c``,r),e.replaceChildren()}}}var ky=1e4,Fp="bdui.monitor.done-range",Bp="bdui.monitor.running_sort",Up="bdui.monitor.candidate_sort",Wp="beads-ui.monitor.candidate-filter",zp="beads-ui.monitor.sections";function $y(){try{let e=window.localStorage.getItem(Wp);if(!e)return{...so};let t=JSON.parse(e);return!t||typeof t!="object"?{...so}:{show_blocked:typeof t.show_blocked=="boolean"?t.show_blocked:so.show_blocked,spec:Ma.some(n=>n.value===t.spec)?t.spec:"all"}}catch{return{...so}}}function Np(e){try{window.localStorage.setItem(Wp,JSON.stringify({show_blocked:e.show_blocked,spec:e.spec}))}catch{}}function xy(){try{let e=window.localStorage.getItem(Up);return Mo.some(t=>t.value===e)?e:"repo_spec"}catch{return"repo_spec"}}function Ay(e){try{window.localStorage.setItem(Up,e)}catch{}}function Sy(){try{let e=window.localStorage.getItem(zp);if(!e)return{};let t=JSON.parse(e);return t&&typeof t=="object"?t:{}}catch{return{}}}function Ey(e){try{window.localStorage.setItem(zp,JSON.stringify(e))}catch{}}function Ty(){try{let e=window.localStorage.getItem(Fp);return e===null?"today":Dn(e)}catch{return"today"}}function Cy(e){try{window.localStorage.setItem(Fp,e)}catch{}}function Ry(){try{return window.localStorage.getItem(Bp)==="repo"?"repo":"started"}catch{return"started"}}function Oy(e){try{window.localStorage.setItem(Bp,e)}catch{}}var Hp="tab:monitor:pipeline",Iy=1e3,qp=[{lane:"runnable",pane:"candidate",title:"\uD6C4\uBCF4",empty:"\uC2E4\uD589 \uC790\uACA9\uC744 \uAC16\uCD98 \uC774\uC288 \uC5C6\uC74C"},{lane:"queue",pane:"queue",title:"\uB300\uAE30",empty:"\uD45C\uC2DC\uD560 \uB808\uD3EC \uC5C6\uC74C"},{lane:"running",pane:"running",title:"\uC2E4\uD589 \uC911",empty:"\uC2E4\uD589 \uC911 \uC5C6\uC74C"},{lane:"pr_wait",pane:"pr_wait",title:"PR \uB300\uAE30",empty:"PR \uC5C6\uC74C"},{lane:"done",pane:"done",title:"\uC644\uB8CC",empty:"\uC644\uB8CC \uAE30\uB85D \uC5C6\uC74C"}],Ly=["queue","runnable","done"],jp="\u2460\u2461\u2462\u2463\u2464\u2465\u2466\u2467\u2468\u2469\u246A\u246B\u246C\u246D\u246E\u246F\u2470\u2471\u2472\u2473";function Py(e){return e>=1&&e<=jp.length?jp[e-1]:`(${e})`}function Gp(e,t){let n=Ot("views:monitor"),r=t.gotoIssue,o=t.pipelineStore,s=t.transport,i=t.getWorkspacePath,l=t.openDoc,a=t.switchWorkspace,u=t.router,d=t.now||(()=>Date.now()),f=t.confirm||(h=>typeof globalThis.confirm!="function"||globalThis.confirm(h)),g=Ty(),m=Ry(),w=$y(),C=xy(),F=Sy(),V=Pi("beads-ui.monitor.lane-collapsed"),se=!1,j=null,N=null,R=null,L=null,B=Xr(()=>le()),Y=null,Q=null,P=null,H=null;function G(h){return H===null&&(H=I()),Ju(h,H)}function te(h,p){ke(),!(p<=0)&&(Q={lane_id:h,corrected:p},P=setTimeout(()=>{P=null,Q=null,le()},ky))}function ke(){P!==null&&(clearTimeout(P),P=null),Q=null}function Ee(){let h=Mr.find(p=>p.value===g);return h?h.label:""}let oe=document.createElement("div");oe.className="mon",e.appendChild(oe);let D=document.createElement("div");D.className="worker-drawer-overlay",D.hidden=!0;let be=document.createElement("div");be.className="worker-drawer-overlay__backdrop";let Se=document.createElement("div");Se.className="worker-drawer-host mon2-drawer",D.append(be,Se),e.appendChild(D);let T=ar(null,null),ee=new Map,me=new Map,ve=null,Ce=null,_e=null,Re=co(Se,{transport:s,sessionLogStore:t.sessionLogStore,onClose:()=>{N=null,D.hidden=!0,le()}}),Ye=Mi({transport:s,console_el:oe,getLanes:()=>T,getWorkspaces:()=>o&&o.get?o.get():null,getCrossLanes:vt,reproject:h=>({lanes:re(h),raw_lanes:h}),onCorrection:te,showToast:we,requestRender:()=>le(),adoptQueue:(h,p)=>{me.set(h,p)},onDragBegin:()=>{R=null},candidate_drop:!0}),{applyDrop:it,dropModel:I,runPlanned:ue,sendQueueCas:ne}=Ye;async function de(h,p,_,S,z=!0){if(!s||!_)return null;let K=await s(h,{...p,root_dir:_,expected_revision:S});if(K&&K.conflict&&z){K.queue&&me.set(_,K.queue);let ce=K.queue&&typeof K.queue.revision=="number"?K.queue.revision:S;K=await s(h,{...p,root_dir:_,expected_revision:ce})}return K&&K.queue&&_&&me.set(_,K.queue),K}function Ae(h,p){let _=me.get(h),S=o&&o.get?o.get():null,z=(Array.isArray(S)?S:[]).find(ce=>ce?.root_dir===h);return(_||z)?.merge_queue?.find(ce=>ce.bead_id===p)?.continuation_action}async function ge(h,p,_,S){let z=await de(h,p,_,S),K=me.get(_)?.revision??z?.queue?.revision??S;return Wn(z,(ce,xe)=>de(h,{...p,continuation:ce,decision_token:xe},_,K,!1),{refresh:ce=>de(h,p,_,ce?.queue?.revision??me.get(_)?.revision??K,!1)})}async function Ne(h,p,_,S){let z=await Wn({continuation_mismatch:S},(ce,xe)=>de("worker-merge-queue-add",{bead_id:p,continuation:ce,decision_token:xe},h,_,!1)),K=z?.queue?.merge_queue?.find(ce=>ce.bead_id===p)?.continuation_action;z?.applied!==!0&&K?.continuation===null&&K.mismatch&&await Ne(h,p,z.queue.revision,K.mismatch)}async function qe(h,p,_){let S=await de("worker-discard",h,p,_);if(S&&S.discarded===!0){we(Vs(S),"success",5e3);return}if(S&&S.reason){we(`\uD3D0\uAE30 \uC2E4\uD328: ${S.reason}`,"error");return}if(S&&S.accepted&&S.pending==="merged_revert"){we("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success");return}if(S&&S.accepted){we(`\uD3D0\uAE30 \uC9C4\uD589: ${S.phase||"\uBC31\uC5C5 \uC911"}`,"success");return}S&&!S.conflict&&we("\uD3D0\uAE30 \uAC70\uBD80: unknown","error")}async function Ze(h,p,_){return!s||!_?null:await s(h,{...p,root_dir:_})}async function Fe(){let h=new Map;for(let p of T.pr_wait)h.has(p.root_dir)||h.set(p.root_dir,p.expected_revision);for(let[p,_]of h)await de("worker-merge-queue-add-all",{},p,_)}function Z(h){let p=F[h];return!!(p&&p.runnable===!0)}function X(h){let p={...F[h]||{}};p.runnable=!p.runnable,F={...F,[h]:p},Ey(F),le()}function Te(h){V.toggle(h),le()}function He(h){V.toggleArea(h),le()}function at(h){let p=h.dependency_chips||null,_=h.overlap_chips||[],S=h.scope_state==="missing",z=h.armed_lane_chip;return!p&&_.length===0&&!S&&!z?null:{...p||{},..._.length>0?{overlaps:_}:{},...S?{scope_missing:!0}:{},...z?{armed_lane:z}:{}}}function y(h){return ni(h,p=>B.isOpen({bead_id:h.id,chip_key:p}))}function U(h){let p=at(h),_=y(h);return p||_?{...h,...p?{dependency_chips:p}:{},..._?{chip_popover:_}:{}}:h}function Oe(h){let p=Z(h.root_dir);return c`<header class="mon2-sec__hd">
      <button
        type="button"
        class="mon2-sec__toggle"
        data-root-dir=${h.root_dir}
        data-section="runnable"
        aria-expanded=${p?"false":"true"}
        aria-label=${`${h.name} \uC139\uC158 ${p?"\uD3BC\uCE58\uAE30":"\uC811\uAE30"}`}
      >
        ${p?"\u25B8":"\u25BE"}
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
    </header>`}function Ie(h,p){return c`<div
      class="mon2-item"
      data-bead-id=${h.id}
      data-drag-kind="candidate"
      data-root-dir=${h.root_dir}
    >
      ${p}
    </div>`}function Ue(h){if(R!==h.id)return null;let p=T.queue_groups.find(K=>K.root_dir===h.root_dir),_=h.place_lanes||[],S=T.cross_lanes_revision!==null,z=[{id:"parallel",label:"\uBCD1\uB82C",count:h.place_index??0}];for(let K of T.chain_lanes)z.push({id:`lane:${K.lane_id}`,label:`\uC5F0\uACB0 ${K.number} (${K.draft?"draft":"\uD655\uC815"}) \uB05D\uC5D0`,count:K.rows.length,group:"\uC5F0\uACB0 \uB808\uC778",disabled:!S});z.push({id:"new-lane",label:"+ \uC0C8 \uC5F0\uACB0 \uB808\uC778",group:"\uC5F0\uACB0 \uB808\uC778",disabled:!S,title:S?"\uC774 \uC774\uC288\uB9CC \uB4E0 draft \uB808\uC778\uC744 \uB9CC\uB4ED\uB2C8\uB2E4":"\uC5F0\uACB0 \uB808\uC778 \uC800\uC7A5\uC18C\uB97C \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"});for(let K of _)z.push({id:`serial:${K.id}`,label:`\uC9C1\uB82C ${Number(K.id.slice(1))}`,count:K.length,group:`${p?p.name:""} \uC9C1\uB82C`});return{bead_id:h.id,lanes:z}}function Ke(h){return Ie(h,c`${Ra(U(h),Ue(h),{exec_chips_mode:"pinned_only",onOpenDoc:l?(p,_)=>l(_,h.root_dir):void 0})}`)}function pt(){return T.runnable_flat?c`<div class="mon2-flat" data-drop="candidate">
        ${T.runnable.map(h=>Ke(h))}
      </div>`:c`${T.runnable_sections.map(h=>{let p=Z(h.root_dir);return c`<section
        class="mon2-sec${p?" is-collapsed":""}"
        data-root-dir=${h.root_dir}
        data-section="runnable"
      >
        ${Oe({root_dir:h.root_dir,name:h.name,count:h.items.length})}
        ${p?"":c`<div
              class="mon2-sec__body"
              data-lane="candidate"
              data-drop="candidate"
            >
              ${h.items.map(_=>Ke(_))}
            </div>`}
      </section>`})}`}function Et(h,p=!1){return c`<span class="worker-mini__rowops">
      ${p?c`<button
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
    </span>`}function It(h,p){return c`<div
      class="mon2-item"
      data-bead-id=${h.id}
      data-drag-kind="parallel"
      data-root-dir=${h.root_dir}
      data-row-index=${p}
      data-queue-index=${String(h.queue_index??0)}
    >
      ${Sn(U(h),{actions:Et(h,!0)})}
    </div>`}function Mt(h,p,_,S){return c`<div
      class="mon2-crow${p.fixed?" mon2-crow--fixed":""}"
      draggable=${p.draggable?"true":"false"}
      data-bead-id=${p.id}
      data-drag-kind="chain"
      data-root-dir=${p.root_dir}
      data-lane-id=${h.lane_id}
      data-row-index=${_}
      data-queue-index=${typeof p.queue_index=="number"?String(p.queue_index):""}
    >
      <span class="mon2-crow__seq" aria-hidden="true"
        >${Py(p.seq)}</span
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
    </div>`}function mt(h){let p=T.cross_lanes_revision!==null,_=G(h.lane_id),S=_?.held===!0,z=_?.cycle===!0,K=_?_.mismatched:[],ce=Q&&Q.lane_id===h.lane_id?Q.corrected:0;return c`<div class="mon2-clane" data-lane-id=${h.lane_id}>
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
        ${z?c`<span
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
              ?disabled=${!p||!h.can_confirm||S}
              title=${S?pi:h.can_confirm?"\uC778\uC811 \uC758\uC874\uC744 \uAC78\uACE0 \uBBF8\uC801\uC7AC \uBA64\uBC84\uB97C \uAC01\uC790 \uB808\uD3EC \uBCD1\uB82C \uD050 \uB05D\uC5D0 \uC62C\uB9BD\uB2C8\uB2E4":"\uBA64\uBC84\uAC00 2\uAC1C \uC774\uC0C1\uC774\uC5B4\uC57C \uD655\uC815\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4"}
            >
              확정
            </button>`:""}
        ${h.run_label!==null?c`<button
              type="button"
              class="mon2-clane__run"
              data-lane-id=${h.lane_id}
              ?disabled=${!p}
              title="이 레인 멤버만 발차합니다 — 레포 자동 진행은 켜지 않습니다"
            >
              ${h.run_label}
            </button>`:""}
        ${h.state==="confirmed"&&h.has_mismatch?c`<button
              type="button"
              class="mon2-clane__reapply"
              data-lane-id=${h.lane_id}
              ?disabled=${!p}
              title="빠진 인접 의존을 다시 걸고 미적재 멤버를 다시 올립니다"
            >
              재적용
            </button>`:""}
        ${h.can_stop?c`<button
              type="button"
              class="mon2-clane__stop"
              data-lane-id=${h.lane_id}
              ?disabled=${!p}
              title="남은 멤버의 발차만 멈춥니다 — 도는 세션과 머지 큐 항목은 끝까지 갑니다"
            >
              ⏸ 정지
            </button>`:""}
        <button
          type="button"
          class="mon2-clane__remove"
          data-lane-id=${h.lane_id}
          ?disabled=${!p}
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
            </div>`:h.rows.map((xe,Xe)=>Mt(h,xe,Xe,K))}
      </div>
    </div>`}function ct(h,p,_){return c`<div
      class="mon2-item"
      data-bead-id=${p.id}
      data-drag-kind="repo-serial"
      data-root-dir=${p.root_dir}
      data-lane-id=${h.id}
      data-row-index=${_}
      data-queue-index=${String(p.queue_index??0)}
    >
      ${Sn(U(p),{actions:Et(p)})}
    </div>`}function $t(h){if(h.length===0)return"";let p=h.length-1;return`${h[0].id} \uC810\uC720${p>0?` +${p}`:""}`}function Ct(h){return c`<div
      class="mon2-item mon2-item--ghost"
      data-bead-id=${h.id}
    >
      ${Sn({id:h.id,title:h.title,lane:"running",draggable:!1,ghost:!0,badges:[h.badge]})}
    </div>`}function Lt(h,p){let _=p.occupants,S=p.cross_wait_peers||[];return{id:p.id,pane_id:"",title:`${h.name} \xB7 \uC9C1\uB82C ${p.index+1}`,rows:[..._.map(z=>Ct(z)),...p.items.map((z,K)=>ct(p,z,K))],count:p.items.length,empty:p.empty===!0,..._.length>0?{badge:c`<span
              class="mon2-lane__occupant"
              title=${_.map(z=>`${z.id} \u2014 ${z.badge}`).join(`
`)}
              >${$t(_)}</span
            >`,held:!0}:{},cycle:p.cycle,header_control:c`<button
        type="button"
        class="mon2-sec__worker"
        data-root-dir=${h.root_dir}
        title="이 레포의 Worker 탭으로 이동"
      >
        Worker ↗
      </button>`,...S.length>0?{after:c`${S.map(z=>c`<div class="mon2-lane__cross-wait">
                  ⚠ 상호 정지 — ${z.workspace_name}·${z.lane}과 교차 대기
                </div>`)}`}:{}}}function ae(){let h=T.cross_lanes_revision!==null,p=T.chain_lanes.some(_=>_.draft&&_.rows.length===0);return oi({parallel:{rows:T.parallel_rows.map((_,S)=>It(_,S)),count:T.parallel_rows.length,collapsed:V.isAreaCollapsed("parallel"),drop:{drop:"parallel"}},serial:{lanes:T.queue_groups.flatMap(_=>_.sublanes.serial.map(S=>({...Lt(_,S),drop:{drop:"repo-serial",root_dir:_.root_dir,lane_id:S.id,lane_length:String(S.raw_length)}}))),collapsed:V.isAreaCollapsed("serial"),extra_panes:T.chain_lanes.map(_=>mt(_)),header_control:c`<button
          type="button"
          class="mon2-newlane"
          ?disabled=${p||!h}
          title=${h?p?"\uBE48 \uC5F0\uACB0 \uB808\uC778\uC774 \uC774\uBBF8 \uC788\uC2B5\uB2C8\uB2E4":"\uBE48 \uC5F0\uACB0 \uB808\uC778\uC744 \uD558\uB098 \uB9CC\uB4ED\uB2C8\uB2E4":"\uC5F0\uACB0 \uB808\uC778 \uC800\uC7A5\uC18C\uB97C \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"}
        >
          + 연결 레인
        </button>`,...T.cross_lanes_unreadable?{notice:c`<div class="mon2-clane__unreadable">
                연결 레인 저장소를 읽을 수 없음
              </div>`}:{}}})}function ie(h){return c`<div class="worker-rungrid">
      ${T.running.length===0?c`<div class="worker-rungrid__empty">실행 세션 없음</div>`:T.running.map(p=>wl({bead_id:p.id,attempt_id:p.attempt_id||"",title:p.title,runner:p.runner??null,model:p.model??null,effort:p.effort??null,speed:p.speed??null,started_at:p.started_at??null,kind:p.kind,...p.kind==="session"?{updated_at:p.updated_at,session_refs:p.session_refs||[]}:{},workflow:p.workflow||null,resumed_from:p.resumed_from??null,continuation_mode:p.continuation_mode??null,paused:p.run_state==="paused",failed:p.run_state==="failed",parked:p.run_state==="parked",retry_wait:p.run_state==="retry_wait",waiting:p.run_state==="waiting",wait:p.wait||null,retry:p.retry||null,status:p.status,status_label:p.run_state==="failed"?"\uC2E4\uD328":p.run_state==="parked"?"\uC138\uC158 \uB300\uAE30":p.run_state==="retry_wait"?"\uC7AC\uC2DC\uB3C4 \uB300\uAE30":p.run_state==="waiting"?"\uC120\uD589 \uB300\uAE30":void 0,can_pause:p.can_pause!==!1,exec_chips:p.exec_chips||null,usage:p.usage||null,chip_popover:y(p),discard:p.discard,failure:p.failure?{...p.failure,open:L===p.attempt_id}:null},h,N,{monitor:{repo:p.workspace_name,root_dir:p.root_dir,serial_lane_id:p.serial_lane_id,cross_lane_chip:p.cross_lane_chip||null,last_activity:p.last_activity||null,legs:p.legs||[],dependency_chips:at(p)}}))}
    </div>`}function $(h){let p={runnable:T.runnable,queue:T.queue,running:T.running,pr_wait:T.pr_wait,done:T.done},_=S=>{let z=p[S.lane],K=S.lane==="runnable"?T.runnable_flat?z.length>0?pt():void 0:T.runnable_sections.length>0?pt():void 0:S.lane==="queue"?T.queue_groups.length>0||T.chain_lanes.length>0||T.parallel_rows.length>0||T.cross_lanes_unreadable?ae():void 0:S.lane==="running"?ie(h):z.length>0?c`${z.map(ce=>Sn(U(ce)))}`:void 0;return qn({id:`monitor-${S.lane}`,lane:S.pane,title:S.title,items:z,count:z.length,src:S.lane==="runnable",empty:S.empty,body:K,live:S.lane==="running"&&z.length>0,collapsible:!0,collapsed:V.isCollapsed(S.pane),controls:S.lane==="runnable"?q():void 0,header_control:J(S.lane,z.length)})};if(se){let S=Ly.map(z=>qp.find(K=>K.lane===z)).filter(z=>z!==void 0);return c`<div class="mon2-deck"></div>
        <div class="worker-lanes-host">
          <div class="worker-lanes worker-lanes--mobile mon2-lanes">
            ${si({live:T.running.length>0,running_body:T.running.length>0?ie(h):"",pr_wait_rows:T.pr_wait.map(z=>Sn(U(z))),count:T.running.length+T.pr_wait.length})}
            ${S.map(z=>_(z))}
          </div>
        </div>`}return c`<div class="mon2-deck"></div>
      <div class="worker-lanes-host">
        <div class="worker-lanes mon2-lanes">
          ${qp.map(S=>_(S))}
        </div>
      </div>`}function q(){return c`<div class="worker-filter">
      <label class="worker-filter__tgl" title="blocked 이슈 표시">
        <input
          type="checkbox"
          class="mon-filter__blocked"
          .checked=${w.show_blocked}
        />
        🔒
        blocked${T.runnable_hidden.blocked>0?` ${T.runnable_hidden.blocked}`:""}
      </label>
      <div class="worker-filter__spec" role="group" aria-label="spec 필터">
        ${Ma.map(h=>c`<button
              type="button"
              class="mon-filter__spec worker-filter__chip${w.spec===h.value?" is-active":""}"
              data-spec=${h.value}
              aria-pressed=${w.spec===h.value?"true":"false"}
            >
              ${h.label}
            </button>`)}
        ${T.runnable_hidden.spec>0?c`<span class="worker-filter__hidden"
              >숨김 ${T.runnable_hidden.spec}</span
            >`:""}
      </div>
    </div>`}function J(h,p){return h==="runnable"?c`<select
        class="mon-candidate-sort worker-sort"
        aria-label="후보 정렬"
        title="후보 정렬"
        .value=${C}
      >
        ${Mo.map(_=>c`<option
              value=${_.value}
              ?selected=${C===_.value}
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
      </select>`:h==="pr_wait"&&p>0?c`<button
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
        ${Mr.map(_=>c`<option value=${_.value} ?selected=${g===_.value}>
              ${_.label}
            </option>`)}
      </select>`:""}function re(h){let p=o&&o.get?o.get():null,_=o&&o.getWorkspacesState?o.getWorkspacesState():[],S=h===void 0?o&&o.crossLanes?o.crossLanes():void 0:h,z={done_since:wr(g,d()),running_sort:m,candidate_filter:w,candidate_sort:C};return S!==void 0&&(z.cross_lanes=S),ar(p,_,z)}function le(){let h=d();T=re(),H=null,ee=new Map;for(let p of[...T.runnable,...T.queue,...T.running,...T.pr_wait,...T.done])!p.non_occupying&&!ee.has(p.id)&&ee.set(p.id,p);st($(h),oe),Ve()?.render(),Be(),tt()}function Be(){let h=new Map;for(let p of T.queue_groups)h.set(p.root_dir,p.auto_advance);for(let p of Array.from(oe.querySelectorAll(".worker-wait__area--parallel .worker-mini__repo"))){let _=p.closest(".mon2-item")?.getAttribute("data-root-dir")||"",S=h.get(_);typeof S=="boolean"&&p.setAttribute("title",`${p.textContent||""} \xB7 ${S?"\uC790\uB3D9\uD654 \uCF1C\uC9D0":"\uC790\uB3D9\uD654 \uAEBC\uC9D0"}`)}}function Ve(){if(_e)return _e;let h=oe.querySelector(".mon2-deck");return h?(_e=Mp(h,{workspacesState:()=>o&&o.getWorkspacesState?o.getWorkspacesState():[],doneItems:()=>T.done,rangeLabel:Ee,transport:s,implPresetStore:t.execPresetStore,gotoWorkerTab:xt,onFocusChange:p=>{Y=p,tt()}}),_e):null}function tt(){oe.classList.toggle("has-focus",Y!==null);for(let h of Array.from(oe.querySelectorAll(".mon2-sec[data-root-dir]")))h.classList.toggle("is-focus",Y!==null&&h.getAttribute("data-root-dir")===Y);for(let h of Array.from(oe.querySelectorAll(".mon2-item[data-bead-id], .rtile[data-bead-id], .worker-mini[data-bead-id], .worker-card[data-bead-id]"))){let p=ee.get(h.getAttribute("data-bead-id")||"");h.classList.toggle("is-focus",Y!==null&&!!p&&p.root_dir===Y)}for(let h of Array.from(oe.querySelectorAll(".mon2-crow[data-root-dir]")))h.classList.toggle("is-focus",Y!==null&&h.getAttribute("data-root-dir")===Y)}function ze(h,p){let _=i?i():void 0;if(!p||!_||p===_||!a){r(h);return}a(p).then(()=>{r(h)}).catch(S=>{n("workspace switch for %s failed: %o",p,S)})}function xt(h){if(!h)return;let p=i?i():void 0,_=()=>{try{u?.gotoView("worker")}catch(S){n("gotoView(worker) failed: %o",S)}};if(!a||p&&p===h){_();return}a(h).then(_).catch(S=>{n("workspace switch for %s failed: %o",h,S),we("\uB808\uD3EC \uC804\uD658\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error")})}function Nt(h){sn(h).then(p=>{we(p?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",p?"success":"error",1400)})}function At(h){let p=ee.get(h)||null;return{item:p,root_dir:p?p.root_dir:"",revision:p?p.expected_revision:0}}async function Zt(h,p,_){if(h!=="dep-add")return;let S=T.chain_lanes.find(z=>z.rows.some(K=>K.id===p));!S||!S.rows.some(z=>z.id===_)||await ue(z=>sd(S.lane_id,z),"",[{type:h,a:p,b:_}])}function vt(){return(o&&o.crossLanes?o.crossLanes():null)??null}async function Rt(h,p){if(h==="run"){await ut(p);return}if(h==="stop"){await Kt(p);return}if(h==="create"){await ue(_=>Ba(null,_),"");return}if(h==="remove"){let _=ad(p,I());if(_!==null&&!f(_))return;await ue(S=>id(p,S),"");return}await ue(_=>h==="confirm"?rd(p,_):od(p,_),"")}function Wt(h){let p=new Map;for(let _ of h.rows){let S=T.owner_of[_.id]||_.root_dir;typeof S!="string"||S.length===0||p.set(S,[...p.get(S)||[],_.id])}return p}async function ut(h){let p=T.chain_lanes.find(K=>K.lane_id===h);if(!p||T.cross_lanes_revision===null){le();return}ke();let _=new Map,S=new Map,z=Wt(p);for(let K of p.rows){if(!K.unplaced)continue;let ce=T.owner_of[K.id]||K.root_dir;if(typeof ce!="string"||ce.length===0){we(`${K.id}\uC758 \uB808\uD3EC\uB97C \uC54C \uC218 \uC5C6\uC5B4 \uC801\uC7AC\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4`,"error"),le();return}let xe=S.get(ce)??0;if(await ne("worker-queue-place",{bead_id:K.id,lane:"parallel",index:(T.parallel_raw_length[ce]??0)+xe},ce,_,{bead_id:K.id})===null){le();return}S.set(ce,xe+1)}for(let[K,ce]of z)if(await ne("worker-queue-arm",{bead_ids:ce,lane_id:h},K,_,{bead_id:ce[0]})===null){we("\uC77C\uBD80 \uB808\uD3EC\uC5D0\uC11C \uC9C4\uD589\uC744 \uCF1C\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 \u2014 [\u25B6 \uC774\uC5B4\uC11C \uC9C4\uD589]\uC73C\uB85C \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC138\uC694","error"),le();return}le()}async function Kt(h){let p=T.chain_lanes.find(S=>S.lane_id===h);if(!p||T.cross_lanes_revision===null){le();return}ke();let _=new Map;for(let[S,z]of Wt(p))if(await ne("worker-queue-disarm",{lane_id:h},S,_,{bead_id:z[0]})===null)break;le()}async function Yt(h,p){let{root_dir:_,revision:S}=At(h);if(_.length===0){le();return}await ne("worker-queue-disarm",{bead_ids:[h],lane_id:p},_,new Map([[_,S]]),{bead_id:h}),le()}async function zt(h,p){let _=ee.get(h);if(!_){le();return}let S={kind:"candidate",bead_id:h,root_dir:_.root_dir};if(p==="new-lane"){await ue(z=>Ba({bead_id:h,root_dir:_.root_dir},z),h);return}if(p.startsWith("lane:")){let z=p.slice(5);if(!T.chain_lanes.find(ce=>ce.lane_id===z)){le();return}await ue(ce=>_i(S,{kind:"chain",lane_id:z,marker_index:(ce.cross_lanes.get(z)?.entries??[]).length},ce),h);return}if(p.startsWith("serial:")){let z=p.slice(7),K=(_.place_lanes||[]).find(ce=>ce.id===z);await it(S,{kind:"repo-serial",root_dir:_.root_dir,lane_id:z,index:K?K.index:0});return}await it(S,{kind:"parallel",marker_index:T.parallel_rows.length})}async function _n(h,p){let _=T.parallel_rows,S=_.findIndex(ot=>ot.id===h);if(S<0)return;let z=_[S].root_dir,K=[];_.forEach((ot,ht)=>{ot.root_dir===z&&K.push(ht)});let ce=K.indexOf(S),xe=K[ce+p];if(typeof xe!="number")return;let Xe=p===-1?xe:K[ce+2]??Math.min(_.length,xe+1);await it({kind:"parallel",bead_id:h,root_dir:z,queue_index:_[S].queue_index??0},{kind:"parallel",marker_index:Xe})}async function Ft(h){for(let p of T.chain_lanes){let _=p.rows.find(S=>S.id===h);if(_){await it({kind:"chain",bead_id:h,root_dir:_.root_dir,lane_id:p.lane_id,...typeof _.queue_index=="number"?{queue_index:_.queue_index}:{}},{kind:"parallel",marker_index:T.parallel_rows.length});return}}}function Jt(h){return{runner:h.runner||void 0,model:h.model||void 0,effort:h.effort||void 0,status:h.run_state==="running"?"running":h.run_state,worktree:h.root_dir}}function Ht(h,p){let{item:_,root_dir:S,revision:z}=At(p),K=_?.attempt_id||"",ce=h.classList;if(ce.contains("worker-mini__rowops-up")||ce.contains("worker-mini__rowops-down")){_n(p,ce.contains("worker-mini__rowops-up")?-1:1);return}if(ce.contains("worker-mini__rowops-remove")){de("worker-queue-remove",{bead_id:p},S,z);return}if(ce.contains("mon2-crow__detach")){Ft(p);return}if(ce.contains("worker-dep__open")){ze(h.getAttribute("data-dep-id")||"",h.getAttribute("data-root-dir")||"");return}if(ce.contains("mon2-arm__release")){Yt(p,h.getAttribute("data-lane-id")||"");return}if(ce.contains("mon-lane__chip")){let xe=h.getAttribute("data-lane-id")||"";oe.querySelector(`.mon2-clane[data-lane-id="${xe}"]`)?.scrollIntoView({block:"nearest"});return}if(ce.contains("judgement-chip")){let xe=h.getAttribute("data-chip-key")||"";xe&&B.toggle({bead_id:p,chip_key:xe});return}if(ce.contains("rtile__failure-badge")){L=L===K?null:K,le();return}if(ce.contains("rtile__attempt-copy")){let xe=h.getAttribute("data-attempt-id")||"";xe&&sn(xe).then(Xe=>{we(Xe?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",Xe?"success":"error",1400)});return}if(ce.contains("worker-card__place")){R=R===p?null:p,le();return}if(ce.contains("worker-card__place-cancel")){R=null,le();return}if(ce.contains("worker-card__place-lane")){let xe=h.getAttribute("data-lane")||"parallel";R=null,zt(p,xe);return}if(ce.contains("rtile__session")){if(_&&_.kind==="session"){let xe=(_.session_refs||[]).find(Xe=>Xe&&Xe.current===!0);xe&&(D.hidden=!1,Re.open(Kr(xe,p,"in_progress",S)),le());return}N=K,K&&_&&(D.hidden=!1,Re.open({attempt_id:K,root_dir:S,meta:Jt(_)})),le();return}if(ce.contains("rtile__pause")){Ze("worker-attempt-pause",{attempt_id:K},S);return}if(ce.contains("rtile__resume")){Gr().then(xe=>{if(xe!==null)return ge("worker-attempt-resume",{attempt_id:K,...xe!==""?{instructions:xe}:{}},S,z)});return}if(ce.contains("rtile__parked-retry")){Ze("worker-parked-retry",{bead_id:p,attempt_id:K},S).then(xe=>{xe&&xe.ok===!1&&we(`\uC7AC\uC2DC\uB3C4 \uAC70\uBD80: ${xe.reason==="not_latest"?"\uC774 bead\uC5D0 \uB354 \uC0C8\uB85C\uC6B4 \uC2DC\uB3C4\uAC00 \uC788\uC2B5\uB2C8\uB2E4":xe.reason||""}`,"error")});return}if(ce.contains("rtile__discard")){let xe=h.dataset.confirmation==="merged"?"merged":"unmerged";if(!f(Io(p,xe)))return;qe({bead_id:p,...K?{attempt_id:K}:{},...h.dataset.operationId?{operation_id:h.dataset.operationId}:{}},S,z);return}if(ce.contains("worker-mini__merge")){let xe=Ae(S,p);xe?.mismatch&&xe.continuation===null?Ne(S,p,z,xe.mismatch):de("worker-merge-queue-add",{bead_id:p},S,z);return}if(ce.contains("worker-mini__merge-cancel")){de("worker-merge-queue-remove",{bead_id:p},S,z);return}if(ce.contains("worker-mini__discard")){let xe=h.dataset.discardMode==="merged"?"merged":"unmerged";if(!f(Io(p,xe)))return;qe({bead_id:p,...h.dataset.attemptId?{attempt_id:h.dataset.attemptId}:{},...h.dataset.operationId?{operation_id:h.dataset.operationId}:{}},S,z);return}if(ce.contains("worker-mini__revise-fix")){ge("worker-revise-fix",{bead_id:p},S,z);return}ce.contains("worker-mini__revise-approve")&&de("worker-revise-approve",{bead_id:p},S,z)}function en(h){let p=Ye.consumeClickSuppression(),_=h.target;if(!_||typeof _.closest!="function"||_.closest("dialog")||_.closest(".worker-drawer-overlay")||_.closest("a"))return;let S=_.closest(".worker-card__id, .worker-mini__id, .rtile__id");if(S){h.preventDefault();let Le=_.closest(".mon2-item, .rtile, .mon2-crow, .worker-mini")?.getAttribute("data-bead-id")||S.textContent?.trim()||"";Le&&Nt(Le);return}let z=_.closest(".worker-mini__repo, .worker-card__repo, .mon2-sec__worker");if(z){h.preventDefault();let A=z.getAttribute("data-root-dir")||ee.get(_.closest(".mon2-item, .rtile, .worker-mini")?.getAttribute("data-bead-id")||"")?.root_dir||z.getAttribute("title")||"";xt(A);return}let K=_.closest(".mon2-sec__toggle");if(K){h.preventDefault(),X(K.getAttribute("data-root-dir")||"");return}let ce=_.closest(".worker-pane__toggle[data-lane]");if(ce){h.preventDefault();let A=ce.getAttribute("data-lane")||"";(A==="candidate"||A==="queue"||A==="running"||A==="pr_wait"||A==="done")&&Te(A);return}let xe=_.closest(".worker-wait__area-toggle[data-area]");if(xe){h.preventDefault(),He(xe.getAttribute("data-area")||"parallel");return}if(_.closest(".mon2-newlane")){h.preventDefault(),Rt("create","");return}let Xe=_.closest(".mon2-clane__confirm, .mon2-clane__reapply, .mon2-clane__remove, .mon2-clane__run, .mon2-clane__stop");if(Xe){h.preventDefault();let A=Xe.getAttribute("data-lane-id")||"",Le=Xe.classList;Rt(Le.contains("mon2-clane__confirm")?"confirm":Le.contains("mon2-clane__reapply")?"reapply":Le.contains("mon2-clane__run")?"run":Le.contains("mon2-clane__stop")?"stop":"remove",A);return}if(_.closest(".mon-merge-all")){h.preventDefault(),Fe();return}let ot=_.closest(".mon-filter__spec");if(ot){h.preventDefault(),w={...w,spec:ot.getAttribute("data-spec")||"all"},Np(w),le();return}let ht=_.closest(".mon2-item, .rtile, .mon2-crow, .worker-mini, .worker-card");if(!ht)return;let gt=ht.getAttribute("data-bead-id")||"",x=_.closest("button");if(x){h.preventDefault(),Ht(x,gt);return}_.closest(".rtile__failure-pop, .chip-popover")||gt&&!p&&(h.preventDefault(),ze(gt,ht.getAttribute("data-root-dir")||At(gt).root_dir))}function fe(h){let p=h.target;if(!p||typeof p.closest!="function")return;let _=p.closest(".mon-filter__blocked");if(_){w={...w,show_blocked:_.checked},Np(w),le();return}let S=p.closest(".mon-candidate-sort");if(S){C=Mo.some(ce=>ce.value===S.value)?S.value:"repo_spec",Ay(C),le();return}let z=p.closest(".mon-running-sort");if(z){m=z.value==="repo"?"repo":"started",Oy(m),le();return}let K=p.closest(".mon-done-range");K&&(g=Dn(K.value),Cy(g),le())}function E(h){let p=h.target,_=p&&typeof p.closest=="function"?S=>p.closest(S):()=>null;L&&!_(".rtile__failure-pop, .rtile__failure-badge")&&(L=null,le())}function he(h){h.key!=="Escape"||L===null||(L=null,le())}e.addEventListener("click",en),e.addEventListener("change",fe),document.addEventListener("click",E),document.addEventListener("keydown",he),B.attach(),Ye.attach(e);{let h=!0;j=Li(p=>{if(se=p,h){h=!1;return}le()})}o&&typeof o.subscribe=="function"&&(ve=o.subscribe(()=>{try{me.clear(),le()}catch{}}));function De(){Ce!==null&&(clearInterval(Ce),Ce=null)}return{recorrectSharedLane:Zt,load(){n("load"),le(),Ce===null&&(Ce=setInterval(()=>{try{le()}catch{}},Iy))},pause(){De()},clear(){De(),Ye.detach(),ve&&(ve(),ve=null),j&&(j(),j=null),Re.destroy(),D.hidden=!0,_e?.destroy(),_e=null,e.removeEventListener("click",en),e.removeEventListener("change",fe),document.removeEventListener("click",E),document.removeEventListener("keydown",he),B.detach(),e.replaceChildren()}}}function Kp(e,t,n){let r=Ot("views:nav"),{global_element:o,repo_element:s}=e,i=null;function l(g){return m=>{m.preventDefault();let w=g==="monitor"&&a()==="monitor"?"worker":g;r("click tab %s",w),n.gotoView(w)}}function a(){let g=t.getState();return g.view==="worker"||g.view==="monitor"?g.view:"board"}function u(){let g=a();return c`
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
    `}function d(){let g=a();return c`
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
    `}function f(){o&&st(u(),o),s&&st(d(),s)}return f(),i=t.subscribe(()=>f()),{destroy(){i&&(i(),i=null),o&&st(c``,o),s&&st(c``,s)}}}var Yp=["bug","feature","task","epic","chore"];function Vp(e){switch((e||"").toString().toLowerCase()){case"bug":return"Bug";case"feature":return"Feature";case"task":return"Task";case"epic":return"Epic";case"chore":return"Chore";default:return""}}var Xp=["Critical","High","Medium","Low","Backlog"];function Qp(e,t){let n=document.createElement("dialog");n.id="new-issue-dialog",n.setAttribute("role","dialog"),n.setAttribute("aria-modal","true"),n.innerHTML=`
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
  `,e.appendChild(n);let r=n.querySelector("#new-issue-form"),o=n.querySelector("#new-title"),s=n.querySelector("#new-type"),i=n.querySelector("#new-priority"),l=n.querySelector("#new-labels"),a=n.querySelector("#new-description"),u=n.querySelector("#new-issue-error"),d=n.querySelector("#btn-cancel"),f=n.querySelector("#btn-create"),g=n.querySelector(".new-issue__close");function m(){s.replaceChildren();let R=document.createElement("option");R.value="",R.textContent="\u2014 Select \u2014",s.appendChild(R);for(let L of Yp){let B=document.createElement("option");B.value=L,B.textContent=Vp(L),s.appendChild(B)}i.replaceChildren();for(let L=0;L<=4;L+=1){let B=document.createElement("option");B.value=String(L);let Y=Xp[L]||"Medium";B.textContent=`${L} \u2013 ${Y}`,i.appendChild(B)}}m();function w(){try{typeof n.close=="function"?n.close():n.removeAttribute("open")}catch{n.removeAttribute("open")}}function C(R){o.disabled=R,s.disabled=R,i.disabled=R,l.disabled=R,a.disabled=R,d.disabled=R,f.disabled=R,f.textContent=R?"Creating\u2026":"Create"}function F(){u.textContent=""}function V(R){u.textContent=R}function se(){try{let R=window.localStorage.getItem("beads-ui.new.type");R?s.value=R:s.value="";let L=window.localStorage.getItem("beads-ui.new.priority");L&&/^\d$/.test(L)?i.value=L:i.value="2"}catch{s.value="",i.value="2"}}function j(){let R=s.value||"",L=i.value||"";R.length>0&&window.localStorage.setItem("beads-ui.new.type",R),L.length>0&&window.localStorage.setItem("beads-ui.new.priority",L)}async function N(){F();let R=String(o.value||"").trim();if(R.length===0){V("Title is required"),o.focus();return}let L=Number(i.value||"2");if(!(L>=0&&L<=4)){V("Priority must be 0..4"),i.focus();return}let B=String(s.value||""),Y=String(a.value||""),Q={title:R};B.length>0&&(Q.type=B),String(L).length>0&&(Q.priority=L),Y.length>0&&(Q.description=Y),C(!0);try{await t("create-issue",Q)}catch{C(!1),V("Failed to create issue");return}j(),C(!1),w()}return n.addEventListener("cancel",R=>{R.preventDefault(),w()}),g.addEventListener("click",()=>w()),d.addEventListener("click",()=>w()),n.addEventListener("keydown",R=>{R.key==="Enter"&&(R.ctrlKey||R.metaKey)&&(R.preventDefault(),N())}),r.addEventListener("submit",R=>{R.preventDefault(),N()}),{open(){r.reset(),F(),se();try{"showModal"in n&&typeof n.showModal=="function"?n.showModal():n.setAttribute("open","")}catch{n.setAttribute("open","")}setTimeout(()=>{try{o.focus()}catch{}},0)},close(){w()}}}var Dy=[["route","route \uCE69"],["fast_track","\u26A1 fast_track \uCE69"],["pr","PR \uCE69"],["from","\u21A9 from \uCE69"],["blocked","blocked\xB7\uC0AC\uC6A9\uC790 \uB9AC\uBDF0 \uD544\uC694 \uCE69"],["stepper","stepper"]];function My(e,t){return ra(e,t)?"shown":t.hidden_labels.includes(e)?"hidden_exact":"hidden_prefix"}function Zp(e,t,n){return c`
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
  `}function Jp(e,t,n){return c`
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
  `}function ef(e,t){return c`
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
  `}var Ny=[{id:"execution",label:"\uC2E4\uD589",glyph:"\u25C6"},{id:"display",label:"\uD45C\uC2DC",glyph:"\u25EB"}];function tf(e,t){let{transport:n,policyStore:r,labelOptions:o}=t,s=t.notify||(te=>we(te,"error",4e3)),i=document.createElement("dialog");i.id="settings-dialog",i.className="settings-dialog",i.setAttribute("role","dialog"),i.setAttribute("aria-modal","true"),i.setAttribute("aria-label","\uC124\uC815"),e.appendChild(i);let l="execution",a=!1,u="",d=null;function f(){if(d)return d;let te=i.querySelector('[data-pane="execution"]');return te?(d=Fi(te,{root_dir:null,queue:()=>t.queueStore?.get()??null,transport:n,implPresetStore:t.implPresetStore,notify:s,onQueueAdopt:ke=>t.queueStore?.set?.(ke)}),d):null}function g(){return c`
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
    `}function m(){let te=r.get();return c`
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
        ${te?c`
              ${Zp(te,o(),V)}
              ${Jp(te,u,{onDraft:ke=>{u=ke},onAdd:se,onRemove:j})}
              ${ef(te,N)}
            `:c`<div class="settings-dialog__empty">
              표시 정책을 불러오는 중…
            </div>`}
      </section>
    `}async function w(te){let ke=r.get();if(ke)try{let Ee=await n("display-policy-set",{expected_revision:ke.revision,policy:te(ke)});C(Ee),Ee&&Ee.conflict&&Ee.policy&&(Ee=await n("display-policy-set",{expected_revision:Ee.policy.revision,policy:te(Ee.policy)}),C(Ee)),Ee&&Ee.conflict&&s("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC")}catch{s("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328")}}function C(te){te&&te.policy&&typeof te.policy=="object"&&r.set(te.policy)}function F(te){w(te)}function V(te){let ke=r.get();if(!ke)return;let Ee=!qy(te,ke);F(oe=>jy(te,oe,Ee))}function se(){let te=u.trim();te.length!==0&&(u="",F(ke=>ke.hidden_prefixes.includes(te)?{hidden_prefixes:ke.hidden_prefixes}:{hidden_prefixes:[...ke.hidden_prefixes,te]}),R())}function j(te){F(ke=>({hidden_prefixes:ke.hidden_prefixes.filter(Ee=>Ee!==te)}))}function N(te){let ke=r.get();if(!ke)return;let Ee=ke.chips[te]===!1;F(()=>({chips:{[te]:Ee}}))}function R(){st(c`
        <div class="settings-dialog__container">
          <nav
            class="settings-dialog__rail"
            role="tablist"
            aria-orientation="vertical"
          >
            <div class="settings-dialog__rail-title">설정</div>
            ${Ny.map(te=>c`<button
                  type="button"
                  class="settings-dialog__tab"
                  role="tab"
                  data-tab=${te.id}
                  aria-selected=${String(l===te.id)}
                  aria-controls=${`settings-pane-${te.id}`}
                  @click=${()=>L(te.id)}
                >
                  <span class="settings-dialog__glyph">${te.glyph}</span>
                  ${te.label}
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
            ${g()} ${m()}
          </div>
        </div>
      `,i),f()}function L(te){l=te,R()}let B=()=>{a=!1,t.onOpenChange?.(!1)};i.addEventListener("close",B),i.addEventListener("cancel",B);let Y=te=>{te.target===i&&G()};i.addEventListener("click",Y);let Q=null;r.subscribe&&(Q=r.subscribe(()=>{a&&R()}));let P=null;t.implPresetStore?.subscribe&&(P=t.implPresetStore.subscribe(()=>{a&&d?.render()}));function H(te="execution"){a||(a=!0,t.onOpenChange?.(!0),l=te,u="",R(),typeof i.showModal=="function"?i.showModal():i.setAttribute("open",""),f()?.load())}function G(){a&&(a=!1,t.onOpenChange?.(!1),typeof i.close=="function"?i.close():i.removeAttribute("open"))}return{open:H,close:G,sessionDraft:()=>d?.sessionDraft()??{},destroy(){a=!1,i.removeEventListener("close",B),i.removeEventListener("cancel",B),i.removeEventListener("click",Y),Q&&(Q(),Q=null),P&&(P(),P=null),d?.destroy(),d=null,i.remove()}}}function qy(e,t){return t.visible_labels.includes(e)?!0:t.hidden_labels.includes(e)?!1:!t.hidden_prefixes.some(n=>n.length>0&&e.startsWith(n))}function jy(e,t,n){if(!n)return{hidden_labels:t.hidden_labels.includes(e)?t.hidden_labels:[...t.hidden_labels,e],visible_labels:t.visible_labels.filter(s=>s!==e)};let r=t.hidden_labels.filter(s=>s!==e);return t.hidden_prefixes.some(s=>s.length>0&&e.startsWith(s))?{hidden_labels:r,visible_labels:t.visible_labels.includes(e)?t.visible_labels:[...t.visible_labels,e]}:{hidden_labels:r}}var Fy=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],nf="usage-meter-card",By="usage-meter-layer",$l=600,Uy=["token_expired","relogin_required"];function rf(e){return String(e).padStart(2,"0")}function Wy(e,t){let n=Math.max(0,Math.ceil((e-t)/6e4)),r=Math.floor(n/1440),o=Math.floor(n%1440/60),s=n%60;return r>0?`${r}d${o>0?` ${o}h`:""}`:o>0?`${o}h${s>0?` ${s}m`:""}`:`${s}m`}function of(e,t=Date.now()){let n=Date.parse(e);if(!Number.isFinite(n))return"";let r=new Date(n),o=new Date(t),s=`${rf(r.getHours())}:${rf(r.getMinutes())}`,l=r.getFullYear()===o.getFullYear()&&r.getMonth()===o.getMonth()&&r.getDate()===o.getDate()?s:`${Fy[r.getMonth()]} ${r.getDate()} ${s}`;return`${Wy(n,t)} \xB7 ${l}`}function zy(e){let t=Math.max(0,Math.floor(e));return t<60?`${t}\uCD08 \uC804`:t<3600?`${Math.floor(t/60)}\uBD84 \uC804`:`${Math.floor(t/3600)}\uC2DC\uAC04 \uC804`}function sf(e){return e>=85?"usage-meter__window--danger":e>=60?"usage-meter__window--warn":"usage-meter__window--success"}function af(e){let t=typeof e=="number"&&Number.isFinite(e)?e:0;return Math.min(100,Math.max(0,t))}var lf=[{key:"claude",label:"Claude",endpoint:"/api/claude-usage",switch_endpoint:"/api/claude-account/switch",tool:"cswap"},{key:"codex",label:"Codex",endpoint:"/api/codex-usage",switch_endpoint:"/api/codex-account/switch",tool:"codex-auth"}];function uf(e){let t=[];for(let n of e){if(!n||typeof n!="object")continue;let r=n;typeof r.key!="string"||r.key.length===0||typeof r.pct!="number"||!Number.isFinite(r.pct)||t.push({key:r.key,pct:r.pct,resetsAt:typeof r.resetsAt=="string"?r.resetsAt:""})}return t}function Hy(e){if(!e||typeof e!="object")return null;let t=e;return!Number.isInteger(t.number)||t.number<=0||typeof t.email!="string"||t.email.length===0||typeof t.status!="string"||t.status.length===0||typeof t.active!="boolean"||!Array.isArray(t.windows)?null:{number:t.number,email:t.email,alias:typeof t.alias=="string"&&t.alias.length>0?t.alias:null,plan:typeof t.plan=="string"&&t.plan.length>0?t.plan:null,active:t.active,status:t.status,windows:uf(t.windows),fetchedAt:typeof t.fetchedAt=="string"?t.fetchedAt:null,ageSeconds:typeof t.ageSeconds=="number"&&Number.isFinite(t.ageSeconds)?t.ageSeconds:null}}function Gy(e,t){if(!e||typeof e!="object")return null;let n=e,r=[];if(Array.isArray(n.accounts))for(let s of n.accounts){let i=Hy(s);i&&r.push(i)}let o=n.available===!0&&Array.isArray(n.windows);return!o&&r.length===0?null:{available:o,windows:o?uf(n.windows):[],ageSeconds:typeof n.ageSeconds=="number"&&Number.isFinite(n.ageSeconds)?n.ageSeconds:null,accounts:r,receivedAtMs:t,held:!1}}function Ky(e,t){if(!e||typeof e!="object")return{kind:"error"};let n=Gy(e,t);return n?{kind:"ok",snapshot:n}:Array.isArray(e.accounts)?{kind:"empty"}:{kind:"error"}}function df(e,t){return(e.ageSeconds===null?0:e.ageSeconds)+Math.max(0,t-e.receivedAtMs)/1e3}function Yy(e,t){return!e.held||df(e,t)<=$l?e:{...e,available:!1,windows:[],accounts:[]}}function cf(e,t){return`${e}:${t}`}function pf(e){let t=!1,n=null,r=new Map,o=null,s=new Map,i=new Map,l=0,a=null;function u(){st(c``,e),e.hidden=!0,f()}function d(){if(a===null){let oe=e.ownerDocument;a=oe.createElement("div"),a.id=By,a.className="usage-meter__layer",oe.body.appendChild(a)}return a}function f(){a!==null&&(st(c``,a),a.remove(),a=null)}function g(oe){n!==oe&&(n===null&&(document.addEventListener("mousedown",w),document.addEventListener("keydown",F),window.addEventListener("resize",C)),n=oe)}function m(){n!==null&&(n=null,document.removeEventListener("mousedown",w),document.removeEventListener("keydown",F),window.removeEventListener("resize",C))}function w(oe){let D=oe.target;D&&(e.contains(D)||a!==null&&a.contains(D))||(m(),G())}function C(){G()}function F(oe){oe.key==="Escape"&&(m(),G())}function V(oe){n===oe?m():g(oe),G()}function se(){m(),G()}async function j(oe,D){if(r.has(oe.key))return;let be=cf(oe.key,D);r.set(oe.key,D),i.delete(be),G();let Se=null;try{Se=await(await fetch(oe.switch_endpoint,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({number:D})})).json()}catch{Se=null}if(t)return;if(r.delete(oe.key),!Se||Se.ok!==!0){let ee=Se&&typeof Se.error=="string"&&Se.error.length>0?Se.error:"network_error";i.set(be,{kind:"error",text:`\uC804\uD658 \uC2E4\uD328 \u2014 ${ee}`}),G();return}let T=Array.isArray(Se.warnings)?Se.warnings.filter(ee=>typeof ee=="string"&&ee.length>0):[];T.length>0&&i.set(be,{kind:"warn",text:T.join(" \xB7 ")}),G(),await Ee()}function N(oe,D,be,Se){let T=af(oe.pct),me=`resets ${of(oe.resetsAt,Se)}${D?` \xB7 ${be}`:""}`;return c`<span
      class="usage-meter__window ${sf(T)}"
      style=${`--progress: ${T}%`}
      title=${me}
    >
      <span class="usage-meter__label">${oe.key}</span>
      <span class="usage-meter__track" aria-hidden="true">
        <span class="usage-meter__fill"></span>
      </span>
      <span class="usage-meter__pct">${T}%</span>
    </span>`}function R(oe,D,be){let Se=df(D,be),T=D.available&&(D.held||Se>$l),ee=T?`${Math.floor(Se/60)}\uBD84 \uC804 \uCE21\uC815`:"",me=D.accounts.filter(Re=>!Re.active).length,ve=`usage-meter__group${T?" usage-meter__group--stale":""}`,Ce=c`<span class="usage-meter__provider"
        >${oe.label}</span
      >
      ${D.available?D.windows.map(Re=>N(Re,T,ee,be)):c`<span class="usage-meter__empty">사용량 없음</span>`}
      ${me>0?c`<span class="usage-meter__badge">+${me}</span>`:""}`;if(D.accounts.length===0)return c`<span
        class=${ve}
        aria-label=${`${oe.label} usage`}
        >${Ce}</span
      >`;let _e=n===oe.key;return c`<button
      type="button"
      class=${`usage-meter__toggle ${ve}`}
      aria-label=${`${oe.label} usage`}
      aria-expanded=${_e?"true":"false"}
      aria-controls=${nf}
      @click=${()=>V(oe.key)}
    >
      ${Ce}
    </button>`}function L(oe,D){return c`<span class="usage-meter" aria-label="Usage">
      ${oe.map(be=>R(be.provider,be.snapshot,D))}
    </span>`}function B(oe,D){let be=af(oe.pct),Se=of(oe.resetsAt,D);return c`<span
      class="usage-meter__account-window ${sf(be)}"
      style=${`--progress: ${be}%`}
    >
      <span class="usage-meter__account-key">${oe.key}</span>
      <span class="usage-meter__account-track" aria-hidden="true">
        <span class="usage-meter__account-fill"></span>
      </span>
      <span class="usage-meter__account-pct">${be}%</span>
      <span class="usage-meter__account-reset"
        >${Se.length>0?`\u21BB ${Se}`:""}</span
      >
    </span>`}function Y(oe,D){return Uy.includes(D)?`\uD1A0\uD070 \uB9CC\uB8CC \u2014 ${oe.tool} \uC7AC\uB85C\uADF8\uC778 \uD544\uC694`:"\uC0AC\uC6A9\uB7C9 \uC5C6\uC74C"}function Q(oe,D,be){let Se=D.status==="ok",T=typeof D.ageSeconds=="number"&&D.ageSeconds>$l,ee=i.get(cf(oe.key,D.number)),me=r.get(oe.key),ve=me!==void 0,Ce=me===D.number,_e=["usage-meter__account"];return D.active&&_e.push("usage-meter__account--active"),Se||_e.push("usage-meter__account--unavailable"),T&&_e.push("usage-meter__account--stale"),c`<div class=${_e.join(" ")}>
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
              ?disabled=${ve}
              @click=${()=>{j(oe,D.number)}}
            >
              ${Ce?"\uC804\uD658 \uC911\u2026":"\uC804\uD658"}
            </button>`}
      </div>
      ${Se?c`<div class="usage-meter__account-windows">
            ${D.windows.map(Re=>B(Re,be))}
          </div>`:c`<div class="usage-meter__account-status">
            ${Y(oe,D.status)}
          </div>`}
      ${ee===void 0?"":c`<div
            class="usage-meter__account-message usage-meter__account-message--${ee.kind}"
          >
            ${ee.text}
          </div>`}
    </div>`}function P(oe,D,be){let Se=D.accounts.filter(T=>T.active).length;return c`<section class="usage-meter__section">
      <h2 class="usage-meter__section-title">
        ${oe.label} · 활성 ${Se} / 전체
        ${D.accounts.length}
      </h2>
      ${D.accounts.map(T=>Q(oe,T,be))}
    </section>`}function H(oe,D){return c`<div
      class="usage-meter__card"
      id=${nf}
      role="dialog"
      aria-label=${`${oe.provider.label} \uACC4\uC815 \uC0AC\uC6A9\uB7C9`}
    >
      ${P(oe.provider,oe.snapshot,D)}
      <p class="usage-meter__note">전환은 새로 시작하는 세션부터 적용됩니다.</p>
    </div>`}function G(){let oe=Date.now(),D=[];for(let Se of lf){let T=s.get(Se.key);T&&D.push({provider:Se,snapshot:Yy(T,oe)})}if(D.length===0){m(),u();return}let be=D.find(Se=>Se.provider.key===n&&Se.snapshot.accounts.length>0);be||m(),st(L(D,oe),e),e.hidden=!1,be?te(be,oe):f()}function te(oe,D){let be=d(),Se=e.getBoundingClientRect(),T=e.ownerDocument.documentElement.clientWidth;be.style.setProperty("--usage-meter-anchor-top",`${Se.bottom}px`),be.style.setProperty("--usage-meter-anchor-right",`${Math.max(0,T-Se.right)}px`),st(c`<div
          class="usage-meter__scrim"
          aria-hidden="true"
          @mousedown=${se}
        ></div>
        ${H(oe,D)}`,be)}async function ke(oe){try{let D=await fetch(oe.endpoint);return D.ok?Ky(await D.json(),Date.now()):{kind:"error"}}catch{return{kind:"error"}}}async function Ee(){l+=1;let oe=l,D=await Promise.all(lf.map(async be=>({provider:be,read:await ke(be)})));if(!(t||oe!==l)){for(let be of D){let Se=be.provider.key;if(be.read.kind==="ok"){s.set(Se,be.read.snapshot);continue}if(be.read.kind==="empty"){s.delete(Se);continue}let T=s.get(Se);T!==void 0&&!T.held&&s.set(Se,{...T,held:!0})}G()}}return u(),Ee(),o=setInterval(()=>{Ee()},6e4),{destroy(){t=!0,o!==null&&(clearInterval(o),o=null),m(),u()}}}function rs(e){let t=e?.blocked_info;return t&&typeof t=="object"?Array.isArray(t.blockers)?t.blockers.filter(r=>typeof r=="string"&&r.length>0):[]:(Array.isArray(e?.dependencies)?e.dependencies:[]).map(r=>{if(typeof r=="string")return r;if(!r||typeof r!="object")return"";let o=r.type??r.dependency_type;return o!==void 0&&o!=="blocks"?"":r.depends_on_id||r.id||""}).filter(Boolean)}var mf="bdui.worker.candidate_sort",os=Object.freeze([{id:"spec",label:"spec \uC6B0\uC120",chain:[{key:"spec",dir:"desc"},{key:"created",dir:"asc"}]},{id:"bottleneck",label:"\uBCD1\uBAA9 \uC6B0\uC120",chain:[{key:"priority",dir:"asc"},{key:"dependents",dir:"desc"},{key:"released",dir:"desc"}]},{id:"created",label:"\uCD5C\uC2E0 \uC0DD\uC131",chain:[{key:"created",dir:"desc"},{key:"priority",dir:"asc"}]},{id:"updated",label:"\uCD5C\uC2E0 \uC218\uC815",chain:[{key:"updated",dir:"desc"}]}]),Ui=Object.freeze({preset:"spec"}),gf=3,hf=Object.freeze([{key:"priority",label:"\uC6B0\uC120\uC21C\uC704"},{key:"dependents",label:"\uD6C4\uC18D \uC218"},{key:"released",label:"\uD574\uC81C \uC2DC\uAC01"},{key:"spec",label:"spec \uC720\uBB34"},{key:"created",label:"\uC0DD\uC131"},{key:"updated",label:"\uC218\uC815"}]);function ff(e){return os.some(t=>t.id===e)}function _f(e){let t=os.find(n=>n.id===e);return t?t.chain.map(n=>({...n})):[]}function Vy(e,t){return e.length===t.length&&e.every((n,r)=>n.key===t[r].key&&n.dir===t[r].dir)}function ss(e){return e&&"preset"in e?_f(e.preset):e&&Array.isArray(e.chain)?e.chain.map(t=>({...t})):_f("spec")}function xl(e){return e&&"preset"in e?e.preset:null}function Lr(e){if(typeof e=="string"){let s;try{s=JSON.parse(e)}catch{return ff(e)?{preset:e}:Ui}return Lr(s)}if(!e||typeof e!="object")return Ui;let t=e;if(ff(t.preset))return{preset:t.preset};let n=t.chain;if(!Array.isArray(n)||n.length===0||n.length>gf||!n.every(Ji))return Ui;let r=[];for(let s of n)r.some(i=>i.key===s.key)||r.push({key:s.key,dir:s.dir});let o=os.find(s=>Vy(s.chain,r));return o?{preset:o.id}:{chain:r}}function bf(){try{return Lr(window.localStorage.getItem(mf))}catch{return Ui}}function Al(e){try{window.localStorage.setItem(mf,JSON.stringify(e))}catch{}}function yf(e,t,n){let r=e.map(a=>({...a}));if(!n)return r.slice(0,t);if(!Object.prototype.hasOwnProperty.call(ks,n))return r;let o=n;if(r.slice(0,t).some(a=>a.key===o))return r.slice(0,t);let s={key:o,dir:r[t]&&r[t].key===o?r[t].dir:ks[o]},i=r.slice(0,t),l=r.slice(t+1).filter(a=>a.key!==o);return[...i,s,...l].slice(0,gf)}function vf(e,t){return e.map((n,r)=>r===t?{key:n.key,dir:n.dir==="asc"?"desc":"asc"}:{...n})}function Xy(e){let t=new Set(e.map(l=>l.id)),n=new Map,r=new Map;for(let l of e){let a=rs(l).filter(u=>t.has(u));n.set(l.id,a);for(let u of a){let d=r.get(u);d?d.push(l):r.set(u,[l])}}let o=new Set,s=[],i=l=>{o.add(l.id),s.push(l);for(let a of r.get(l.id)??[])!o.has(a.id)&&(n.get(a.id)??[]).every(u=>o.has(u))&&i(a)};for(;s.length<e.length;){let l=e.find(a=>!o.has(a.id)&&(n.get(a.id)??[]).every(u=>o.has(u)));i(l??e.find(a=>!o.has(a.id)))}return s}function wf(e,t){let n=Array.isArray(e)?e.slice():[];return n.sort(pc(ss(t))),Xy(n)}function kf(e,t){let n=new Map;if(!e||typeof e!="object")return n;let r=e,o=[],s=new Set;for(let i of t){if(s.has(i.id))continue;s.add(i.id);let l=r[i.id];if(!l||!Array.isArray(l.scope))continue;let a=l.scope.filter(u=>typeof u=="string"&&u.length>0);if(a.length===0){n.set(i.id,{overlaps:[],scope_missing:!0});continue}n.set(i.id,{overlaps:[],scope_missing:!1}),o.push({member:i,scope:a})}for(let i=0;i<o.length;i+=1)for(let l=i+1;l<o.length;l+=1){let a=Hs(o[i].scope,o[l].scope);if(a.length===0)continue;let u=o[i].member,d=o[l].member;n.get(u.id)?.overlaps.push({id:d.id,title:d.title,location_label:d.location_label,prefixes:a}),n.get(d.id)?.overlaps.push({id:u.id,title:u.title,location_label:u.location_label,prefixes:a})}return n}var $f=new Set(["sh","bash","zsh","dash","ksh"]),xf=/('(?:[^']*)'|"(?:\\.|[^"\\])*"|#.*|\$(?:\{[^}\n]*\}|[A-Za-z_][A-Za-z0-9_]*|[?#@*!$0-9-])|\b(?:if|then|else|elif|fi|for|while|until|do|done|case|esac|in|function|select|time)\b)/g;function Af(e){let t=e.split("/");return t[t.length-1]||""}function Qy(e){let t=e.split(`
`,1)[0];if(!t.startsWith("#!"))return!1;let n=t.slice(2).trim().split(/\s+/).filter(Boolean);if(n.length===0)return!1;let r=Af(n[0]);if(r!=="env")return $f.has(r);let o=n.slice(1).find(s=>!s.startsWith("-")&&!s.includes("="));return o!==void 0&&$f.has(Af(o))}function Zy(e){return e.startsWith("#")?"comment":e.startsWith("'")||e.startsWith('"')?"string":e.startsWith("$")?"variable":"keyword"}function Jy(e){let t=[],n=0;xf.lastIndex=0;for(let r of e.matchAll(xf)){let o=r.index;o>n&&t.push({text:e.slice(n,o),kind:"plain"}),t.push({text:r[0],kind:Zy(r[0])}),n=o+r[0].length}return n<e.length&&t.push({text:e.slice(n),kind:"plain"}),t.length===0&&t.push({text:e,kind:"plain"}),t}function ev(e){return{bad_request:"\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD\uC774 \uC62C\uBC14\uB974\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.",forbidden:"\uB4F1\uB85D\uB418\uC9C0 \uC54A\uC740 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uC758 \uC2A4\uD06C\uB9BD\uD2B8\uB294 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",lane_not_declared:"\uD604\uC7AC \uACE0\uC815 \uC120\uC5B8\uC5D0 \uD574\uB2F9 \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4.",stale_declaration:"\uC800\uC7A5\uC18C \uC791\uC5C5 \uC120\uC5B8\uC774 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uD654\uBA74\uC5D0\uC11C \uB2E4\uC2DC \uC5F4\uC5B4 \uC8FC\uC138\uC694.",too_large:"\uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uB108\uBB34 \uCEE4\uC11C \uD654\uBA74\uC5D0 \uD45C\uC2DC\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",unsupported_content:"\uD14D\uC2A4\uD2B8 \uD615\uC2DD\uC758 \uC2A4\uD06C\uB9BD\uD2B8\uB9CC \uD45C\uC2DC\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.",unreadable:"\uACE0\uC815\uB41C \uC2A4\uD06C\uB9BD\uD2B8 \uB0B4\uC6A9\uC744 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4."}[e]||"\uC2A4\uD06C\uB9BD\uD2B8\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4."}function Sf(e){let t=e.getWorkspacePath,n=e.fetchImpl||globalThis.fetch?.bind(globalThis),r=document.createElement("div");r.className="repo-ops-script-viewer-root",document.body.appendChild(r);let o=null,s="loading",i="",l="",a=0,u=null,d=!1;function f(R,L){return L?Jy(R).map(B=>B.kind==="plain"?B.text:c`<span
            class="repo-ops-script-viewer__token repo-ops-script-viewer__token--${B.kind}"
            >${B.text}</span
          >`):R}function g(){if(!o)return c``;let R=s==="ready"&&Qy(i),L=s==="ready"?i.split(`
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
              @click=${()=>{w()}}
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
                  ${L.map((B,Y)=>c`<div class="repo-ops-script-viewer__row">
                        <span
                          class="repo-ops-script-viewer__line-number"
                          aria-hidden="true"
                          >${Y+1}</span
                        ><code class="repo-ops-script-viewer__code-line"
                          >${f(B,R)}</code
                        >
                      </div>`)}
                </div>`}
        </div>
      </section>
    </div>`}function m(){st(g(),r)}async function w(){if(s!=="ready")return;let R=await sn(i);we(R?"\uC2A4\uD06C\uB9BD\uD2B8 \uBCF5\uC0AC\uB428":"\uC2A4\uD06C\uB9BD\uD2B8 \uBCF5\uC0AC \uC2E4\uD328",R?"success":"error")}function C(R){R.key==="Escape"&&o&&(R.preventDefault(),j())}function F(){d||(document.addEventListener("keydown",C),d=!0)}function V(){d&&(document.removeEventListener("keydown",C),d=!1)}async function se(R,L=null){let B=++a;F(),o={...R},u=L||(document.activeElement instanceof HTMLElement?document.activeElement:null),s="loading",i="",l="",m(),r.querySelector(".repo-ops-script-viewer__close")?.focus();let Q=t?t():"";if(!Q){s="error",l="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4.",m();return}if(!n){s="error",l="\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD \uAE30\uB2A5\uC744 \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",m();return}let P="/api/repo-ops-script?workspace="+encodeURIComponent(Q)+"&lane="+encodeURIComponent(R.lane)+"&base_sha="+encodeURIComponent(R.base_sha);try{let H=await n(P),G=await H.json().catch(()=>({}));if(B!==a)return;if((t?t():"")!==Q){j();return}if(!H.ok||!G||G.ok!==!0){s="error",l=ev(G&&typeof G.error=="string"?G.error:""),m();return}o={lane:G.lane,base_sha:G.base_sha,path:G.path,base_ref:G.base_ref},i=String(G.content),s="ready",m()}catch{if(B!==a)return;s="error",l="\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",m()}}function j(){a+=1,V(),o=null,i="",m();let R=u;u=null,R?.isConnected&&R.focus()}function N(){j(),r.remove()}return{open:se,close:j,destroy:N}}var Ef={deploy_not_declared:"\uC120\uC5B8 \uC5C6\uC74C",deploy_opted_out:"\uC774 workspace\uC5D0\uC11C \uBC30\uD3EC \uC2E4\uD589\uC774 \uAEBC\uC838 \uC788\uC74C",deploy_in_flight:"\uBC30\uD3EC \uC9C4\uD589 \uC911",target_unresolved:"\uB300\uC0C1 tip\uC744 \uD655\uC815\uD558\uC9C0 \uBABB\uD568",remote_history_not_monotonic:"\uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC\uC640 \uC6D0\uACA9 \uC774\uB825\uC774 \uAC08\uB77C\uC9D0"},tv=new Set(["queued","running","retry_pending"]);function Tf(e){let t=e.queueStore,n=e.transport,r=e.onChanged||(()=>{}),o=e.onOpenScript;function s(){return t&&t.get()||{}}function i(){let P=s();return typeof P.revision=="number"?P.revision:0}function l(P){t&&P&&P.queue&&typeof P.queue=="object"&&t.set(P.queue)}function a(){let P=s().workspace_info;return P&&typeof P=="object"?P:{}}function u(P,H){return c`<span
      class="worker-repo-ops__vd-badge worker-repo-ops__vd-badge--${P}"
      >${H}</span
    >`}function d(P){if(typeof P!="number"||!Number.isFinite(P))return"";let H=P/6e4;return Number.isInteger(H)?`timeout ${H}\uBD84`:`timeout ${Math.round(P/1e3)}\uCD08`}function f(P){let H=d(P);return H?u("config",H):""}function g(P,H,G){return c`<button
      type="button"
      class="worker-repo-ops__vd-cmd worker-repo-ops__vd-cmd--link"
      .textContent=${G.script}
      @click=${te=>{o&&o({lane:P,base_sha:H.base_sha,path:G.script,base_ref:H.base_ref},te.currentTarget)}}
    ></button>`}function m(){let P=s().repo_operations;return Array.isArray(P)?P:[]}function w(){let P=a().repo_ops,H=P&&typeof P=="object"?P.repo_id:null;return typeof H=="string"&&H?H:null}function C(){return m().some(P=>P&&P.kind==="deploy"&&tv.has(P.state))}function F(){let P=C(),H=w()===null;return c`<button
      type="button"
      class="worker-repo-ops__deploy-run"
      data-seam="repo-ops-deploy-run"
      ?disabled=${P||H}
      title=${P?"\uBC30\uD3EC \uC9C4\uD589 \uC911":H?"\uC800\uC7A5\uC18C\uB97C \uD655\uC778\uD560 \uC218 \uC5C6\uC74C":"\uC6D0\uACA9 base tip\uC5D0\uC11C \uBC30\uD3EC \uC2A4\uD06C\uB9BD\uD2B8\uB97C 1\uD68C \uC2E4\uD589\uD569\uB2C8\uB2E4"}
      @click=${()=>{L()}}
    >
      배포 실행
    </button>`}function V(){let P=s().repo_ops_opt_out;return{verify:P?.verify===!0,deploy:P?.deploy===!0}}function se(P,H){return c`<label class="worker-repo-ops__lane-run">
      <input
        type="checkbox"
        .checked=${!H}
        @change=${G=>{R(P,!G.target.checked)}}
      />
      이 workspace에서 실행
    </label>`}function j(P){let H=typeof P.base_sha=="string"?P.base_sha:"",G=`${P.source_path||"repo-ops/config.toml"} @ ${P.base_ref||"?"}${H?`@${H.slice(0,7)}`:""}`,te=V(),ke=!!P.verify&&te.verify,Ee=!!P.deploy&&te.deploy;return c`<section class="worker-repo-ops__vd" data-seam="repo-ops">
      <p class="worker-repo-ops__vd-title">
        저장소 작업 선언
        <span class="worker-repo-ops__vd-src">${G}</span>
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
        ${P.verify?se("verify",te.verify):""}
      </div>
      <div
        class="worker-repo-ops__lane${Ee?" worker-repo-ops__lane--skipped":""}"
        data-lane="deploy"
      >
        <span class="worker-repo-ops__lane-k">머지 후 배포</span>
        <span class="worker-repo-ops__lane-v"
          >${P.deploy?c`${g("deploy",P,P.deploy)}
              ${f(P.deploy.timeout_ms)}
              ${Ee?u("skipped","\uC774 workspace\uC5D0\uC11C \uAC74\uB108\uB700"):F()}`:c`선언 없음${u("absent","\uBC30\uD3EC \uC5C6\uC74C")}`}</span
        >
        <span class="worker-repo-ops__lane-d"
          >${Ee?"\uC774 workspace\uC5D0\uC11C\uB294 \uBC30\uD3EC \uC5C6\uC774 \uACE7\uBC14\uB85C \uC815\uB9AC\uB85C \uB118\uC5B4\uAC11\uB2C8\uB2E4.":P.deploy?c`Worker가 <code>.worktrees/.repo-ops-deploy</code>에서 대상
                  SHA로 정렬한 뒤 1회 실행합니다.`:"\uBA38\uC9C0 \uD6C4 \uBC30\uD3EC \uB2E8\uACC4 \uC5C6\uC774 \uACE7\uBC14\uB85C \uC815\uB9AC\uB85C \uB118\uC5B4\uAC11\uB2C8\uB2E4."}</span
        >
        ${P.deploy?se("deploy",te.deploy):""}
      </div>
    </section>`}function N(P){let H=P.repo_ops&&typeof P.repo_ops=="object"?P.repo_ops:null;return H&&(H.status==="resolved"||H.status==="absent")?j(H):H&&(H.status==="pending"||H.status==="error")?c`<section class="worker-repo-ops__vd" data-seam="repo-ops">
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
    </section>`}async function R(P,H){if(!n)return;let G=await n("worker-repo-ops-opt-out-toggle",{kind:P,opted_out:H,expected_revision:i()});if(l(G),G&&G.conflict){let te=await n("worker-repo-ops-opt-out-toggle",{kind:P,opted_out:H,expected_revision:i()});l(te)}r()}async function L(){let P=w();if(!n||P===null)return;let H=await n("worker-repo-operation-deploy-run",{repo_id:P});if(l(H),!H||H.ok!==!0){let G=H&&typeof H.reason=="string"?H.reason:"",te=Object.hasOwn(Ef,G)?Ef[G]:G||"\uBC30\uD3EC \uC2E4\uD589\uC744 \uC2DC\uC791\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4";we(`\uBC30\uD3EC \uC2E4\uD589 \uAC70\uBD80 \u2014 ${te}`,"error")}else we("\uBC30\uD3EC \uC2E4\uD589\uC744 \uC2DC\uC791\uD588\uC2B5\uB2C8\uB2E4","success");r()}let B={owned_deploy_worktree_fetch_detached_alignment_recreate:"\uC804\uC6A9 \uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC \uC815\uB82C\xB7\uBCF5\uAD6C",recovered_pre_execution_fetch_timeout_retry_once:"fetch \uD0C0\uC784\uC544\uC6C3 1\uD68C \uBCF5\uAD6C",repo_serial_lock_wait:"\uC800\uC7A5\uC18C \uC21C\uCC28 \uC2E4\uD589 \uB300\uAE30",restart_operation_adoption:"\uC7AC\uC2DC\uC791 \uD6C4 \uC791\uC5C5 \uC778\uACC4",exact_input_exit_zero_evidence_adoption:"\uB3D9\uC77C \uC785\uB825 \uC131\uACF5 \uC99D\uAC70 \uC778\uACC4",descendant_success_covers_ancestor_rows:"\uCD5C\uC2E0 SHA \uC131\uACF5\uC774 \uC774\uC804 \uD589 \uCEE4\uBC84",owned_verify_candidate_cleanup:"\uAC80\uC99D \uC784\uC2DC \uCCB4\uD06C\uC544\uC6C3 \uC815\uB9AC",bounded_single_script_retry_exceeded:"\uB2E8\uC77C \uC2A4\uD06C\uB9BD\uD2B8 \uC7AC\uC2DC\uB3C4 \uD55C\uB3C4 \uCD08\uACFC",repair_session_dispatch:"\uC2E4\uD328 \uD574\uACB0 \uC138\uC158 \uC790\uB3D9 \uC2E4\uD589",baseline_failure_ignore:"\uAE30\uC874 \uC2E4\uD328 \uBB34\uC2DC",config_or_script_deletion_to_bypass_gate:"\uC124\uC815\xB7\uC2A4\uD06C\uB9BD\uD2B8 \uC0AD\uC81C\uB85C \uAC8C\uC774\uD2B8 \uC6B0\uD68C",credential_entry:"\uC790\uACA9\uC99D\uBA85 \uC785\uB825\xB7\uCD9C\uB825",destructive_action:"\uD30C\uAD34\uC801 \uC791\uC5C5",history_rewrite:"\uD788\uC2A4\uD1A0\uB9AC \uC7AC\uC791\uC131",agent_self_report_as_success:"\uC138\uC158 \uC790\uAE30\uBCF4\uACE0\uB97C \uC131\uACF5 \uCC98\uB9AC"};function Y(P,H,G){return c`<div class="worker-repo-ops__policy-group" data-policy=${G}>
      <div class="worker-repo-ops__policy-label">${P}</div>
      <ul class="worker-repo-ops__policy-list">
        ${H.map(te=>c`<li data-token=${te}>
              ${B[te]||te}
            </li>`)}
      </ul>
    </div>`}function Q(){let P=s(),H=P.repo_operation_policy&&typeof P.repo_operation_policy=="object"?P.repo_operation_policy:null;return H?c`<section
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
        ${N(a())} ${Q()}
      </details>`}}}var Of=20,nv=5,rv=new Set(["failed","running","queued","retry_pending"]),Sl={verify:"\uBA38\uC9C0 \uC804 \uAC80\uC99D",deploy:"\uBA38\uC9C0 \uD6C4 \uBC30\uD3EC",job:"\uBA38\uC9C0 \uD6C4 \uC7A1"},Cf={verify:"verify",deploy:"deploy",job:"deploy"};function ov(e){if(typeof e!="string")return"";let t=e.split("/").filter(n=>n.length>0);return t.length>0?t[t.length-1]:""}function sv(e){return!e||typeof e!="object"?"":e.kind==="job"?ov(e.script_path)||Sl.job:Object.hasOwn(Sl,e.kind)?Sl[e.kind]:e.kind}function iv(e,t,n=Of){let r=[];for(let o of Array.isArray(e)?e:[])!o||typeof o!="object"||r.push({type:"operation",id:o.operation_id,at:typeof o.finished_at=="number"?o.finished_at:typeof o.requested_at=="number"?o.requested_at:null,operation:o});for(let o of Array.isArray(t)?t:[])!o||typeof o!="object"||r.push({type:"cleanup",id:o.bead_id,at:typeof o.at=="number"?o.at:null,cleanup:o});return r.sort((o,s)=>o.at===null&&s.at===null?String(o.id||"").localeCompare(String(s.id||"")):o.at===null?1:s.at===null?-1:s.at-o.at),r.slice(0,Math.max(0,n))}function av(e){if(e.type==="cleanup")return!0;let t=e.operation;return rv.has(t.state)&&!t.dismissed&&!t.superseded_by}function lv(e,t,n={}){let r=iv(e,t,1/0),o=n.expanded===!0?Of:nv,s=new Set(r.slice(0,o)),i=r.filter(l=>s.has(l)||av(l));return{visible:i,hidden:r.length-i.length}}function Rf(e){if(e.type==="cleanup")return"warn";let t=e.operation.state;return t==="succeeded"?"ok":t==="failed"?"fail":"live"}function cv(e){if(e.type==="cleanup")return"\uBA48\uCDA4";switch(e.operation.state){case"succeeded":return"\uC131\uACF5";case"failed":return"\uC2E4\uD328";case"retry_pending":return"\uC7AC\uC2DC\uB3C4 \uC911";case"running":return"\uC2E4\uD589 \uC911";default:return"\uB300\uAE30"}}function If(e){let t=e.filter(n=>n.value);return t.length===0?"":c`<details class="worker-ev__details">
    <summary>세부</summary>
    <dl class="worker-ev__kv">
      ${t.map(n=>{let r=n.copy===!0?ro(n.value):n.value;return c`<div>
          <dt>${n.term}</dt>
          <dd>${r}</dd>
        </div>`})}
    </dl>
  </details>`}function Lf(e,t="",n=!1){return!e&&!t?"":c`<p
    class="worker-ev__explain${n?" worker-ev__explain--warn":""}"
  >
    <span class="worker-ev__cause">${e}</span>${t?c`<br />${t}`:""}
  </p>`}function uv(e,t){if(!e||typeof e!="object")return;let n=t&&typeof t=="object"?t.kind:"";if(!Object.hasOwn(Cf,n))return;let r=e[Cf[n]],o=r&&typeof r=="object"?r.timeout_ms:void 0;return typeof o=="number"&&Number.isFinite(o)?o:void 0}function dv(e,t){let n=xp(e,t),r=Ap(e);return!n&&!r?"":c`<p class="worker-ev__why">
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
      title=${e.at?Vt(e.at):""}
      >${Ys(e.at)||"\u2014"}</span
    >
    <span class="worker-ev__node" aria-hidden="true"
      ><span class="worker-ev__dot worker-ev__dot--${Rf(e)}"></span
    ></span>
    <div class="worker-ev__body">
      <div class="worker-ev__line1">
        <span class="worker-ev__what">${sv(n)}</span>
        <span class="worker-ev__meta"
          >${n.target_base}@${Ks(n.target_sha)}${typeof n.elapsed_ms=="number"?` \xB7 ${Er(n.elapsed_ms)}`:""}</span
        >
        <span class="worker-ev__st worker-ev__st--${Rf(e)}"
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
      ${r?Lf($p(n.failure_kind,o)):""}
      ${dv(n,uv(t,n))}
      ${pv(n)}
      ${If([{term:"\uC2E4\uD328 \uCF54\uB4DC",value:r?o:""},{term:"script",value:[n.script_path||"",n.script_blob_sha?`blob ${Ks(n.script_blob_sha)}`:"",Number.isInteger(n.exit_code)?`exit ${n.exit_code}`:""].filter(Boolean).join(" \xB7 ")},{term:"\uB85C\uADF8",value:n.log_path||"",copy:!0},{term:"\uCD9C\uB825",value:n.output_tail||""}])}
    </div>
  </li>`}function _v(e){let t=e.cleanup,n=Tr(t.step);return c`<li
    class="worker-ev"
    data-bead-id=${t.bead_id}
    data-state="cleanup_stalled"
  >
    <span
      class="worker-ev__t"
      title=${e.at?Vt(e.at):""}
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
      ${Lf(ur(t.reason),typeof t.retry_count=="number"&&t.retry_count>0?`${t.retry_count}\uD68C \uC790\uB3D9 \uC7AC\uC2DC\uB3C4 \uD6C4\uC5D0\uB3C4 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4 \u2014 \uC815\uB9AC\uB97C \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uBA74 \uBA48\uCD98 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4.`:"\uC815\uB9AC\uB97C \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uBA74 \uBA48\uCD98 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4.",!0)}
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
      ${If([{term:"\uC2E4\uD328 \uCF54\uB4DC",value:t.reason||""},{term:"\uC9C4\uB2E8",value:t.detail||""},{term:"\uB85C\uADF8",value:t.log_path||"",copy:!0},{term:"\uCD9C\uB825",value:t.output_tail||""}])}
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
  </section>`}function Pf(e,t={}){let n=null;function r(){if(n===null){st(c``,e);return}let i=lv(n.operations,n.cleanup_failures,{expanded:n.expanded});st(mv({events:i.visible,hidden:i.hidden,expanded:n.expanded,repo:n.repo,repo_ops:n.repo_ops}),e)}e.addEventListener("click",i=>{let l=i.target;if(l?.closest?.('[data-seam="repo-ops-close"]')){s();return}l?.closest?.('[data-seam="repo-ops-more"]')&&n&&(n.expanded=!n.expanded,r())});function o(i){n={operations:i.operations,cleanup_failures:i.cleanup_failures,repo:i.repo||"",repo_ops:i.repo_ops||null,expanded:!1},r()}function s(){n!==null&&(n=null,r(),t.onClose&&t.onClose())}return{open:o,close:s,isOpen:()=>n!==null,refresh(i){n&&(n={operations:i.operations,cleanup_failures:i.cleanup_failures,repo:i.repo||"",repo_ops:i.repo_ops||null,expanded:n.expanded},r())}}}var gv="worker-ineligible";function is(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function Df(e){return is(e).includes(gv)}var hv="session-preferred",bv=["external_roundtrip","user_feedback_loop"];function Mf(e,t){if(!is(e).includes(hv)||typeof t!="object"||t===null)return"";let n=t.session_preferred_reason;return typeof n=="string"&&bv.includes(n)?n:""}var yv="spec-after-blocker";function Nf(e,t){return is(e).includes(yv)&&Array.isArray(t)&&t.length>0}var vv=Ot("views:worker:adapter"),wv="tab:worker:ready",kv="tab:worker:blocked",$v="tab:worker:in-progress",xv="tab:worker:resolved",Av="tab:worker:closed",Sv="\u{1F512} blocked",Ev={revision:0,auto_advance:!1,auto_merge:!1,slots:ui,queue:[],serial_lanes:[],serial_lane_count:0,pr_wait:[],done:[]},Tv=["claude_account","codex_account"],Cv=[...Zr,...Tv];function Rv(e){let t=e&&e.parent;return(typeof t=="string"?t.length>0:!!(t&&t.id))||/\.\d+$/.test(e&&e.id||"")}function Ov(e){let t=e&&typeof e=="object"?e.awaiting_user:void 0,n=typeof t=="string"?t.trim():"";return n.length>0?`${ri}: ${n}`:ri}function dr(e){return e&&typeof e=="object"?e:{}}function Iv(e){let t={};for(let n of Cv){let r=e[n];typeof r=="string"&&r.length>0&&(t[n]=r)}return t}function Lv(e){let t=new Map;for(let r of e){if(!r||typeof r.id!="string"||r.id.length===0)continue;let o=dr(r.metadata).carried_from;if(!(typeof o!="string"||o.length===0))for(let s of rs(r)){let i=t.get(s);i||(i=new Set,t.set(s,i)),i.add(r.id)}}let n=new Map;for(let[r,o]of t)n.set(r,[...o].sort());return n}function Pv(e){let t=e.replace(/\/+$/,""),n=t.lastIndexOf("/");return n>=0?t.slice(n+1):t}function qf(e={}){let{queueStore:t,issueStores:n,transport:r,getWorkspacePath:o,onInvalidate:s}=e,i=n?Ur(n):null,l=new Map,a={},u=null,d=0,f=null,g=!1;function m(){g||!s||s()}function w(L){return u===L?a:{}}async function C(){if(!r||g)return;let L=o?.()||"";if(u===L||f&&f.key===L&&f.generation===d)return;let B=++d;f={key:L,generation:B};let Y=null;try{Y=await Promise.resolve(r("get-session-defaults",{}))}catch(Q){if(B!==d)return;f=null,vv("get-session-defaults failed: %o",Q),m();return}B===d&&(a=Y&&typeof Y.values=="object"&&Y.values!==null?{...Y.values}:{},u=L,f=null,m())}function F(){u=null,d+=1,C()}function V(){for(let[L,B]of l)B==="failed"&&l.delete(L)}function se(L,B){return i?i.selectBoardColumn(L,B):[]}function j(L,B,Y,Q){let P=Array.isArray(L.queue)?L.queue:[],H=new Set([...P.map(D=>D.bead_id),...(Array.isArray(L.serial_lanes)?L.serial_lanes:[]).flatMap(D=>(Array.isArray(D?.entries)?D.entries:[]).map(be=>be.bead_id)),...(Array.isArray(L.pr_wait)?L.pr_wait:[]).map(D=>D.bead_id),...(Array.isArray(L.done)?L.done:[]).map(D=>D.bead_id)]),G=new Set(Y.map(D=>D.id)),te=new Set,ke=[];for(let D of[...B,...Y])H.has(D.id)||te.has(D.id)||Rv(D)||(te.add(D.id),ke.push(D));let Ee=wf(ke,Lr(Q)),oe=dr(L.bead_scope);return Ee.map(D=>{let be=Fr(D),Se=be.evidence==="published",T=typeof D.workflow?.route=="string"&&D.workflow.route||(D.metadata&&typeof D.metadata.route=="string"?D.metadata.route:""),ee=T==="quick_fix",me=!Object.hasOwn(D,"description")||typeof D.description=="string"&&D.description.trim().length>0,ve=Object.hasOwn(D,"labels")&&Df(D.labels),Ce=ve||!Object.hasOwn(D,"labels")?"":Mf(D.labels,D.metadata),_e=D.metadata&&typeof D.metadata=="object"?Object.hasOwn(D.metadata,"awaiting_user"):!1,Re=!ve&&!_e&&(ee?me:Se&&!be.conflict),Ye=G.has(D.id),it=Ye?rs(D):[],I=[];Ye&&it.length===0&&I.push(Sv),_e&&I.push(Ov(D.metadata)),ee&&!me?I.push("missing_description"):!ee&&be.conflict?I.push("spec_id_conflict"):!ee&&be.evidence==="none"?I.push("spec \uC5C6\uC74C"):!ee&&be.evidence==="draft"&&I.push("spec \uBBF8\uBC1C\uD589(draft)");let ue=oe[D.id];return{bead_id:D.id,title:D.title||D.id,route:T,spec_id:be.conflict?"":be.path,published:Se,blocked:Ye,blocked_by:it,labels:Array.isArray(D.labels)?D.labels:[],created_at:D.created_at,updated_at:D.updated_at,status:D.status,workflow:D.workflow||null,exec_pins:Iv(dr(D.metadata)),rec:null,...ue&&Array.isArray(ue.scope)?{scope:ue.scope}:{},eligible:Re,reason:I.join(" \xB7 "),worker_ineligible:ve,session_preferred:Ce.length>0,session_preferred_reason:Ce,spec_after_blocker:Nf(D.labels,it),release_info:D.release_info,dependents_info:D.dependents_info}})}function N(L){let[B,Y,Q,P,H]=L,G=As([...B,...Y,...Q,...P,...H]),te=Lv([...B,...Y,...Q,...P]),ke={},Ee=(oe,D)=>{if(!oe||typeof oe.id!="string"||oe.id.length===0)return;let be=ke[oe.id]||(ke[oe.id]={});if(typeof oe.priority=="number"&&!("priority"in be)&&(be.priority=oe.priority),typeof oe.from_id=="string"&&!("from_id"in be)&&(be.from_id=oe.from_id),D&&!("metadata"in be)){be.metadata=dr(oe.metadata);let Se=dr(oe.workflow).route;typeof Se=="string"&&Se.length>0&&(be.route=Se)}};for(let oe of[...B,...Y,...Q])Ee(oe,!0);for(let oe of[...P,...H])Ee(oe,!1);for(let oe of new Set([...Object.keys(ke),...G.keys()])){let D=Ss(G,oe);if(D.total>0){let be=ke[oe]||(ke[oe]={});be.rollup=D}}for(let[oe,D]of te){let be=ke[oe]||(ke[oe]={});be.carried_to=D}return ke}function R(L,B,Y,Q){let P=new Set((Array.isArray(L.done)?L.done:[]).map(G=>G?.bead_id).filter(G=>typeof G=="string")),H=[];for(let G of B){let te=tr(G.closed_at);if(typeof G.id!="string"||P.has(G.id)||te===null||Q!==void 0&&te<Q||typeof G.comment_count!="number"||G.comment_count<=0)continue;let ke=`${Y}\0${G.id}\0${String(G.updated_at)}\0${G.comment_count}`,Ee=l.get(ke);if(Ee===void 0&&r&&(l.set(ke,"pending"),Promise.resolve(r("get-comments",{id:G.id})).then(D=>{let be=Array.isArray(D)&&D.some(Se=>Ei(typeof Se?.text=="string"?Se.text:"")?.lane==="session");l.set(ke,be?"session":"not-session"),m()}).catch(()=>{l.set(ke,"failed"),m()})),Ee!=="session")continue;let oe=tr(G.started_at);H.push({id:G.id,title:G.title||G.id,reason:"",draggable:!1,done:!0,lane:"done",selectable:!1,selected:!1,badges:["\uC138\uC158 \uC791\uC5C5"],alert:!1,usage:null,work_ms:oe!==null&&te>=oe?te-oe:null,work_kind:"session",done_at:te,created_at:G.created_at,updated_at:G.updated_at})}return H}return{read(L){if(!t)return{workspaces:[],workspaces_state:[]};let B=t.get()||Ev,Y=o?.()||"",Q=L&&typeof L.done_since=="number"?L.done_since:void 0,P=se(wv,"ready"),H=se(kv,"blocked"),G=se($v,"in_progress"),te=se(xv,"resolved"),ke=se(Av,"closed");return{workspaces:[{...B,bead_titles:{...dr(B.bead_titles),...Object.fromEntries([...P,...H].filter(Ee=>Ee&&typeof Ee.id=="string").map(Ee=>[Ee.id,Ee.title||Ee.id]))},root_dir:Y,name:Pv(Y),runnable:j(B,P,H,L?L.candidate_sort:void 0),session_done:R(B,ke,Y,Q),bead_overlay:N([P,H,G,te,ke])}],workspaces_state:[{root_dir:Y,revision:B.revision,auto_advance:B.auto_advance,auto_merge:B.auto_merge,slots:typeof dr(B.workspace_info).slots=="number"?dr(B.workspace_info).slots:B.slots,runner_catalog:B.runner_catalog,execution_defaults:B.execution_defaults,session_defaults:w(Y),orchestration_model:B.orchestration_model,orchestration_effort:B.orchestration_effort,orchestration_speed:B.orchestration_speed,issue_prefix:""}]}},ensureSessionDefaults(){C()},refreshSessionDefaults:F,notifyIssuesChanged:V,destroy(){g=!0,d+=1,f=null,l.clear()}}}var Wi=1,jf=5,Dv={root_dir:"",name:"",auto_advance:!1,auto_merge:!1,slots:Wi,revision:0,runner_catalog:{},items:[],sublanes:{parallel:[],serial:[]},serial_lane_count:0,raw_queue_length:0,live_count:0,over_cap:!1,merge:{positions:new Map,resolutions:new Map,continuations:new Map,authorities:new Map,state:{active:null,failures:{},waiting:null},auto_excluded:[],running:!1},token_total:null,cleanup_failures:[],declared_base:null,repo_operations:[]};function fn(e){return e&&typeof e=="object"?e:{}}var Uf="beads-ui.worker.candidate-filter",El={show_blocked:!1,spec:"all"};function Mv(){try{let e=window.localStorage.getItem(Uf);if(!e)return{...El};let t=JSON.parse(e);if(!t||typeof t!="object")return{...El};let n=t.spec;return{show_blocked:t.show_blocked===!0,spec:n==="with"||n==="without"?n:"all"}}catch{return{...El}}}function Nv(e){try{window.localStorage.setItem(Uf,JSON.stringify(e))}catch{}}var qv=[{value:"all",label:"\uC804\uCCB4"},{value:"with",label:"spec \uC788\uC74C"},{value:"without",label:"spec \uC5C6\uC74C"}],Wf="bdui.worker.done-range";function jv(){try{let e=window.localStorage.getItem(Wf);return e===null?"today":Dn(e)}catch{return"today"}}function Fv(e){try{window.localStorage.setItem(Wf,e)}catch{}}function Ff(e){let t=Array.isArray(e)&&e.length>0?e[0]:null;if(!t)return"";let n=typeof t.title=="string"?t.title:t.id||"";return n.length>22?`${n.slice(0,22)}\u2026`:n}function Bv(e){return e==="receipt_not_current"?"\uB9AC\uBDF0 \uD6C4\uC5D0\uB3C4 \uC601\uC218\uC99D\uC774 \uCD5C\uC885 head\uC5D0 \uC720\uD6A8\uD558\uC9C0 \uC54A\uC74C":e==="cancelled"?"\uB9AC\uBDF0 \uC138\uC158 \uCDE8\uC18C\uB428":e.startsWith("launch_failed:")?`\uB9AC\uBDF0 \uC138\uC158 \uC2DC\uC791 \uC2E4\uD328(${e.slice(14)})`:e.startsWith("session_failed:")?`\uB9AC\uBDF0 \uC138\uC158 \uBE44\uC815\uC0C1 \uC885\uB8CC(${e.slice(15)})`:`\uB9AC\uBDF0 \uC138\uC158 \uC2E4\uD328(${e})`}function Bf(e){if(e.startsWith("receipt_unbacked:"))return`\uC2E4\uD589 \uC601\uC218\uC99D \uC790\uB3D9 \uAC80\uC99D \uBD88\uAC00(${e.slice(17)}) \u2014 [\uBA38\uC9C0] \uD074\uB9AD\uC73C\uB85C \uC218\uB3D9 \uC9C4\uD589 \uAC00\uB2A5`;switch(e){case"not_in_pr_wait":return"PR \uB300\uAE30 \uC0C1\uD0DC \uB3D9\uAE30\uD654 \uC2E4\uD328";case"resolution_round_cap":return"\uCDA9\uB3CC \uD574\uC18C 2\uD68C \uCD08\uACFC";case"resolution_rebase_cap":return"\uD050 \uC7AC\uCDA9\uB3CC 3\uD68C \uCD08\uACFC";case"resolution_timeout":return"\uCDA9\uB3CC \uD574\uC18C \uB300\uAE30 \uC2DC\uAC04 \uCD08\uACFC";case"resolution_refused":return"\uD574\uC18C \uC138\uC158 \uB514\uC2A4\uD328\uCE58 \uAC70\uBD80";case"worktree_missing":return"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uD574\uC18C \uD544\uC694";case"worktree_restore_branch_mismatch":return"\uC6CC\uD06C\uD2B8\uB9AC \uBCF5\uC6D0 \uC2E4\uD328 \u2014 \uBE0C\uB79C\uCE58 \uC774\uB984 \uBD88\uC77C\uCE58";case"worktree_restore_path_exists":return"\uC6CC\uD06C\uD2B8\uB9AC \uBCF5\uC6D0 \uC2E4\uD328 \u2014 \uACBD\uB85C \uC774\uBBF8 \uC788\uC74C";case"worktree_restore_branch_missing":return"\uC6CC\uD06C\uD2B8\uB9AC \uBCF5\uC6D0 \uC2E4\uD328 \u2014 origin\uC5D0 \uBE0C\uB79C\uCE58 \uC5C6\uC74C";case"worktree_restore_branch_diverged":return"\uC6CC\uD06C\uD2B8\uB9AC \uBCF5\uC6D0 \uC2E4\uD328 \u2014 \uB85C\uCEEC \uBE0C\uB79C\uCE58\uAC00 origin\uACFC \uB2E4\uB984";case"worktree_restore_failed":return"\uC6CC\uD06C\uD2B8\uB9AC \uBCF5\uC6D0 \uC2E4\uD328";case"merge_unconfirmed_timeout":return"\uBA38\uC9C0 \uD655\uC778 \uC2DC\uAC04 \uCD08\uACFC";case"pr_closed_unmerged":return"PR \uB2EB\uD798";case"merge_error":return"\uBA38\uC9C0 \uC624\uB958";case"spec_id_missing":return"\uC2A4\uD399 ID \uAE30\uB85D \uC5C6\uC74C";default:return e}}function Uv(e){if(e==="lane_occupied")return"\uC2E4\uD589 \uB808\uC778\uC5D0 \uB0A8\uC544 \uC788\uC5B4 \uBA38\uC9C0 \uB300\uC0C1\uC774 \uC544\uB2D9\uB2C8\uB2E4";let t="\uBA38\uC9C0 \uD050\uC5D0 \uB123\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 (\uC774\uBBF8 \uB300\uAE30 \uC911\uC774\uAC70\uB098 \uB300\uC0C1 \uC544\uB2D8)";return typeof e=="string"&&e.length>0?`${t}: ${e}`:t}function Wv(e){switch(e){case"no_terminal_failure":return"\uC774 \uD589\uC5D0 \uC774\uC5B4\uBC1B\uC744 terminal \uC2E4\uD328 \uAE30\uB85D\uC774 \uC5C6\uC2B5\uB2C8\uB2E4";case"tmux_unavailable":return"tmux\uC5D0 \uB2FF\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 \u2014 \uC138\uC158\uC744 \uB744\uC6B0\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4";case"launch_failed:claude_not_found":return"claude \uC2E4\uD589 \uD30C\uC77C\uC744 PATH\uC5D0\uC11C \uCC3E\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4";case"launch_failed:new_session":return"tmux \uC138\uC158\uC744 \uB9CC\uB4E4\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4";case"launch_failed:new_window":return"tmux \uCC3D\uC744 \uB9CC\uB4E4\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4";case"launch_failed:exited":return"\uB744\uC6B4 \uC138\uC158\uC774 \uACE7\uBC14\uB85C \uC885\uB8CC\uB410\uC2B5\uB2C8\uB2E4";case"error":return"\uC138\uC158 \uAE30\uB3D9 \uC911 \uC624\uB958\uAC00 \uB0AC\uC2B5\uB2C8\uB2E4";default:return typeof e=="string"&&e.length>0?e:"\uC138\uC158\uC744 \uB744\uC6B0\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"}}function zv(e){switch(e){case"no_session_ref":return"\uAE30\uB85D\uB41C \uC138\uC158 \uC5C6\uC74C";case"unsafe_session_id":return"\uC138\uC158 ID\uB97C \uC778\uC790\uB85C \uC4F8 \uC218 \uC5C6\uC74C";case"provider_mismatch":return"\uAE30\uB85D\uB41C \uC138\uC158\uC774 claude\uAC00 \uC544\uB2D8";case"not_local":return"\uAE30\uB85D\uB41C \uC138\uC158\uC758 transcript\uAC00 \uC774 \uAE30\uAE30\uC5D0 \uC5C6\uC74C";case"bd_unavailable":return"Bead \uBA54\uD0C0\uB370\uC774\uD130\uB97C \uC77D\uC9C0 \uBABB\uD568";default:return typeof e=="string"&&e.length>0?e:"\uC0AC\uC720 \uBBF8\uC0C1"}}function Hv(e){if(!e||typeof e!="object")return"\uC138\uC158 \uAE30\uB3D9 \uC751\uB2F5\uC744 \uBC1B\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4";if(e.conflict===!0)return"\uD050\uAC00 \uBC14\uB00C\uC5B4 \uD074\uB9AD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uB20C\uB7EC\uC8FC\uC138\uC694";if(e.session==="already_running")return"\uC774\uBBF8 \uC774 \uC774\uC288\uC758 \uD574\uACB0 \uC138\uC158\uC774 \uC5F4\uB824 \uC788\uC2B5\uB2C8\uB2E4";if(e.launched!==!0)return`\uC138\uC158\uC5D0\uC11C \uD574\uACB0 \uAC70\uBD80: ${Wv(e.reason)}`;let t=e.bridge_active===!0?"":" (Discord \uC911\uACC4 \uBE44\uD65C\uC131 \u2014 tmux\uC5D0\uC11C \uB2F5\uD558\uC138\uC694)";return e.mode==="fork"?`\uAE30\uB85D\uB41C \uC138\uC158\uC744 fork\uD574 \uB744\uC6E0\uC2B5\uB2C8\uB2E4${t}`:`\uC0C8 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4 \u2014 ${zv(e.fallback_reason)}${t}`}function Gv(e){return e&&e.launched===!0?"success":"error"}function Kv(e){if(e==="worker_sessions_busy")return"\uD574\uC18C \uB300\uAE30 \u2014 \uC2E4\uD589 \uC2AC\uB86F \uB300\uAE30 \uC911";if(typeof e!="string"||!e.startsWith("completion_waiting:"))return null;let t=e.slice(19);if(t.length===0)return null;switch(t){case"gating":return"\uBA38\uC9C0 \uC870\uAC74 \uD655\uC778 \uC911";case"merging":return"\uBA38\uC9C0 \uC911";case"cleaning":return"\uB9C8\uBB34\uB9AC \uC911";case"paused":return"\uC790\uB3D9 \uC9C4\uD589 \uC77C\uC2DC\uC815\uC9C0";case"needs_human":return"\uD655\uC778 \uD544\uC694";default:return null}}function Yv(e){if(!e||typeof e!="object")return null;switch(e.state){case"waiting":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC911",live:!0};case"yielded":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uACC4\uC18D \uC911 \xB7 \uC644\uB8CC \uD6C4 \uC6B0\uC120 \uBA38\uC9C0",live:!0};case"ready":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC644\uB8CC \xB7 \uC7AC\uAC80\uC99D \uB300\uAE30",live:!1};default:return null}}var Vv=new Set(["paused","needs_human","waiting_metadata","reviewing","retrying"]),Xv=new Set(["waiting_metadata","reviewing","retrying"]),Tl=new Set(["review_receipt_missing","review_receipt_stale","review_receipt_invalid","review_receipt_undetermined"]);function Qv(e){let t=e&&typeof e=="object"?e.auto_resolution:null,n=t&&typeof t=="object"&&!Array.isArray(t)?t:null;if(!n||!e)return null;let r=typeof n.origin_reason=="string"&&n.origin_reason.length>0?`\uC6D0 \uC0AC\uC720: ${n.origin_reason}`:"";switch(e.phase){case"waiting_metadata":return{label:"\uC815\uC815 \uB300\uAE30",details:[r,"\uBA54\uD0C0\uB370\uC774\uD130 \uC815\uC815\uC774 \uAD00\uCE21\uB418\uBA74 \uC790\uB3D9 \uC7AC\uAC1C"].filter(Boolean),live:!1};case"retrying":{let o=Number.isInteger(n.attempts)?Math.max(0,Number(n.attempts)):0,s=Number.isInteger(n.attempt_cap)&&Number(n.attempt_cap)>0?Number(n.attempt_cap):0,i=typeof n.next_at=="number"?Vt(n.next_at):"",l=typeof n.last_error=="string"&&n.last_error.length>0?n.last_error:"";return{label:s>0?`\uC7AC\uC2DC\uB3C4 ${Math.min(o,s)}/${s}`:`\uC7AC\uC2DC\uB3C4 ${o}`,details:[r,i?`\uB2E4\uC74C \uC2DC\uAC01 ${i}`:"",l?`\uB9C8\uC9C0\uB9C9 \uC624\uB958: ${l}`:""].filter(Boolean),live:!0}}default:return null}}function Zv(e){if(typeof e!="string")return"";for(let t of["retry_exhausted:","auto_review_exhausted:"])if(e.startsWith(t))return e.slice(t.length);return""}function Jv(e,t=null){if(!e||typeof e!="object")return null;let n="";switch(e.phase){case"gating":n="\uBA38\uC9C0 \uC870\uAC74 \uD655\uC778 \uC911";break;case"merging":n="\uBA38\uC9C0 \uC911";break;case"cleaning":n="\uB9C8\uBB34\uB9AC \uC911";break;case"waiting_metadata":case"reviewing":case"retrying":if(!t)return null;n=t.label;break;case"paused":n="\uC790\uB3D9 \uC9C4\uD589 \uC77C\uC2DC\uC815\uC9C0";break;case"needs_human":n="\uD655\uC778 \uD544\uC694";break;case"completed":return null;default:return null}let r=[n];e.head_sha&&r.push(`head ${e.head_sha}`),e.base_sha&&r.push(`base ${e.base_sha}`),(e.failure_stage||e.failure_reason)&&r.push(`${e.failure_stage||"failure"} \xB7 ${e.failure_reason||"\uC6D0\uC778 \uBBF8\uC0C1"}`);let o=Zv(e.terminal_reason);o&&r.push(`\uC6D0 \uC0AC\uC720: ${o}`);let s=e.phase==="needs_human"&&!o?Ir(e.terminal_reason):null;s&&r.push(e.failure_stage?`${e.failure_stage} \xB7 ${s}`:s);for(let i of t?t.details:[])r.push(i);return e.active_attempt_id&&r.push(`attempt ${e.active_attempt_id}`),e.evidence&&r.push(e.evidence),e.log_path&&r.push(e.log_path),{badge:n,title:r.join(`
`),alert:e.phase==="needs_human",lock_actions:!Vv.has(e.phase)}}function ew(e){if(!e||typeof e!="object")return[];let t=e.blocking_codes;return Array.isArray(t)?t.filter(n=>typeof n=="string"&&n.length>0):[]}function tw(e){if(!e||typeof e!="object")return[];let t=e.badge_codes;return Array.isArray(t)?t.filter(n=>typeof n=="string"&&n.length>0):[]}function nw(e){let t=e.queue_failure?`\uBA38\uC9C0 \uC2E4\uD328 \uC6D0\uBB38: ${e.queue_failure}`:e.auto_skip?`\uC790\uB3D9 \uC81C\uC678 \uC6D0\uBB38: ${e.auto_skip}`:"",n=(s,i={})=>{let l=[i.title||"",t].filter(Boolean);return{label:s,title:l.join(`
`),live:i.live===!0,alert:i.alert===!0}};if(e.continuation_required)return n("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694",{alert:!0});if(e.queueing)return e.queueing==="cleanup"?n("\uC815\uB9AC \uC7AC\uC2DC\uB3C4 \uC694\uCCAD \uC911",{title:"\uC11C\uBC84 \uC751\uB2F5\uC744 \uAE30\uB2E4\uB9AC\uB294 \uC911\uC785\uB2C8\uB2E4",live:!0}):n("\uD050 \uB4F1\uB85D \uC911",{title:"\uBA38\uC9C0 \uD050\uC5D0 \uB123\uB294 \uC911 \u2014 \uC11C\uBC84 \uC751\uB2F5\uC744 \uAE30\uB2E4\uB9BD\uB2C8\uB2E4",live:!0});if(e.merge_step)return e.gate?.tier==="merged"?n("\uBA38\uC9C0\uB428",{title:e.merge_step.label,alert:e.merge_step.failed===!0}):n("\uBA38\uC9C0 \uC911",{title:e.merge_step.label,live:!0});if(e.conflict_badge)return n(e.conflict_badge,{live:e.conflict_live===!0});if(e.auto_resolution)return n(e.auto_resolution.label,{title:e.auto_resolution.details.join(`
`),live:e.auto_resolution.live===!0});if(e.recovery?.lock_actions)return n(e.recovery.badge,{title:e.recovery.title,live:!0});if(e.cleanup_failed)return n(e.cleanup_label?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${e.cleanup_label}`:"\uC815\uB9AC \uBA48\uCDA4",{title:e.cleanup_failed.reason||"",alert:!0});if(e.base_exception)return n("\uB2E4\uB978 base \uB300\uC0C1",{title:e.base_exception,alert:!0});let r=ew(e.receipt_check),o=e.conflicting||e.gate?.reason==="base_behind"||r.length>0;if(e.auto_pending&&o)return n("\uD655\uC778 \uC911",{title:"\uBA38\uC9C0 \uD050\uAC00 \uC790\uB3D9\uC73C\uB85C \uCC98\uB9AC \uC911 \u2014 \uB2E4\uC74C \uAD00\uCE21\uC744 \uAE30\uB2E4\uB9BD\uB2C8\uB2E4",live:!0});if(e.conflicting)return n("\uCDA9\uB3CC \uD574\uACB0 \uD544\uC694",{alert:!0});if(e.gate?.reason==="base_behind")return n("base \uAC31\uC2E0 \uD544\uC694",{alert:!0});if(Tl.has(e.gate?.reason)){let s=e.gate.reason==="review_receipt_stale"?"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC774 \uD604\uC7AC head\uC758 \uC870\uC0C1\uC774 \uC544\uB2D9\uB2C8\uB2E4 \u2014 \uD788\uC2A4\uD1A0\uB9AC \uC7AC\uC791\uC131\xB7\uBE0C\uB79C\uCE58 \uB9AC\uC14B \uBCF5\uAD6C \uACBD\uB85C\uC785\uB2C8\uB2E4. [\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0]\uAC00 \uC774 \uBCF4\uB958\uC758 \uCD9C\uAD6C\uC785\uB2C8\uB2E4":e.gate.reason==="review_receipt_invalid"?"\uB9AC\uBDF0 \uC601\uC218\uC99D \uAE30\uB85D\uC774 \uC131\uB9BD\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4 \u2014 [\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0]\uAC00 \uC774 \uBCF4\uB958\uC758 \uCD9C\uAD6C\uC785\uB2C8\uB2E4":e.gate.reason==="review_receipt_undetermined"?"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC758 ancestry probe\uB97C \uC644\uB8CC\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 \u2014 [\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0]\uAC00 \uC774 \uBCF4\uB958\uC758 \uCD9C\uAD6C\uC785\uB2C8\uB2E4":"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 [\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0]\uAC00 \uC774 \uBCF4\uB958\uC758 \uCD9C\uAD6C\uC785\uB2C8\uB2E4";if(e.review_session?.active===!0)return n(e.review_session.origin==="auto"?"\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694 \xB7 \uC790\uB3D9 \uB9AC\uBDF0 \uC138\uC158 \uC2E4\uD589 \uC911":"\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694 \xB7 \uB9AC\uBDF0 \uC138\uC158 \uC2E4\uD589 \uC911",{title:`${s}
\uB9AC\uBDF0 \uC138\uC158\uC774 \uC2E4\uD589 \uC911\uC785\uB2C8\uB2E4 \u2014 \uB05D\uB098\uBA74 \uC601\uC218\uC99D\uC744 \uB2E4\uC2DC \uD310\uC815\uD569\uB2C8\uB2E4`,live:!0});if(e.auto_review_wait==="slot")return n("\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694 \xB7 \uB9AC\uBDF0 \uC138\uC158 \uC2AC\uB86F \uB300\uAE30",{title:`${s}
\uC2E4\uD589 \uC2AC\uB86F\uC774 \uBE44\uBA74 \uC790\uB3D9\uC73C\uB85C \uB9AC\uBDF0 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4. \uC9C0\uAE08 \uD074\uB9AD\uD558\uBA74 \uC989\uC2DC \uB744\uC6C1\uB2C8\uB2E4`,live:!0});if(e.review_session?.failure){let i=e.review_dispatch?.state==="exhausted"&&e.review_session.origin==="auto";return n(`\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694 \xB7 ${i?"\uC790\uB3D9 \uB9AC\uBDF0 1\uD68C \uC18C\uC9C4 \xB7 ":""}${Bv(e.review_session.failure)}`,{title:`${s}
\uC9C1\uC804 \uB9AC\uBDF0 \uC138\uC158 \uC885\uB8CC \uC0AC\uC720: ${e.review_session.failure}`,alert:!0})}return n("\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694",{title:s,alert:!0})}return e.gate?.reason==="spec_id_missing"?n("\uC2A4\uD399 ID \uB204\uB77D",{title:"native spec_id \uBBF8\uAE30\uB85D \u2014 bd update --spec-id \uD544\uC694",alert:!0}):r.length>0?n(`\uC601\uC218\uC99D \uD655\uC778 \uD544\uC694 \xB7 ${r[0]}`,{title:`\uC131\uB9BD\uD558\uC9C0 \uC54A\uB294 \uC2E4\uD589 \uC601\uC218\uC99D \u2014 ${r.join(", ")}`,alert:!0}):e.recovery?n(e.recovery.badge,{title:e.recovery.title,alert:!0}):e.gate?.tier==="verify"&&e.gate.gate_badge==="\uAC80\uC99D \uC2E4\uD328"?n("\uAC80\uC99D \uC2E4\uD328",{title:e.gate.reason||"",alert:!0}):e.queue_failure?n(`\uBA38\uC9C0 \uC2E4\uD328 \u2014 ${Bf(e.queue_failure)}`,{title:e.queue_failure,alert:!0}):e.auto_skip?n(`\uC790\uB3D9 \uC81C\uC678 \u2014 ${Bf(e.auto_skip)}`,{title:e.auto_skip,alert:!0}):e.queued&&!e.queue_active?n(`\uBA38\uC9C0 \uB300\uAE30 #${e.queue_position}`):e.gate?.enabled===!0?n("\uBA38\uC9C0 \uAC00\uB2A5"):e.gate?.tier==="merged"?n("\uBA38\uC9C0\uB428"):e.gate?.tier==="closed_unmerged"?n("\uB2EB\uD798",{alert:!0}):e.activity?n("\uD655\uC778 \uC911",{live:!0}):e.gate?.tier==="undecidable"||e.gate?.reason==="mergeability_unknown"?n("\uC0C1\uD0DC \uD655\uC778 \uC2E4\uD328",{title:e.gate.reason||"",alert:!0}):e.gate?.tier==="unobserved"||e.gate?.tier==="verify"||e.gate?.gate_badge==="\uAD00\uCE21 \uB300\uAE30"?n("\uD655\uC778 \uC911"):e.gate?.gate_badge?n(e.gate.gate_badge,{title:e.gate.reason||"",alert:e.gate.enabled!==!0}):null}function rw(e,t,n,r,o=null,s=null,i=null,l=!1,a=null,u=!0,d=null,f=null,g=null,m={},w=!1,C={},F=null,V={active:!1,failure:null,origin:null},se=!1){let j=!!a&&a.position>0,N=!!a?.continuation_action&&a.continuation_action.continuation===null,R=!!a&&a.active===!0,L=a&&a.failure||null,B=Kv(a?a.waiting:null),Y=n[e]||null,Q=Y&&Y.gate?Y.gate:null,P=Y&&Y.pr?Y.pr:null,H=Yv(a?a.resolution:null),G=Qv(g),te=Jv(g,G),ke=a&&a.authority||null,Ee=a&&a.review_dispatch||null,oe=a?.hold?.auto_review_wait==="slot"?"slot":null,D=!!g&&typeof g=="object"&&Xv.has(g.phase),be=j&&!R&&(!ke||D||ke.source==="automatic"&&!w),Se=i==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":H?H.badge:i==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC911":B,T=!!Q&&Q.base_badge==="\uCDA9\uB3CC",ee=!!Q&&Q.enabled===!0,me=Do({bead_id:e,merge_sha:C.merge_sha,cleanup_cursor:C.cleanup_cursor,merge_progress:s&&s.merge_progress?s.merge_progress:null,cleanup_failed:r,repo_operations:C.repo_operations}),ve=li(me),Ce=s&&!me&&(s.queueing??null)?s.queueing:null,_e=!!r&&["repo_operations","post_merge_jobs","child_sweep","branch_cleanup","parent_close"].includes(r.step)&&!!Q&&Q.tier==="merged",Re=r&&r.step==="repo_operations"&&me?.failed===!0&&(me.step==="deploy"||me.step==="verify")?me.step:null,Ye=l&&!!r&&!!Q&&Q.tier==="merged",it=be&&(ee||T||Q?.reason==="base_behind"||Tl.has(Q?.reason)||_e||Ye),I=Tl.has(Q?.reason),ue=l&&T&&u===!1,ne=Yn(m,e,{external:l,merge_active:R||me?.step==="merge",merge_queued:j,conflict_active:!!i,cleanup_active:ve,merged:!!r||Q?.tier==="merged"}),de=!!ne.operation,Ae=!!r||g?.phase==="needs_human"||!!ne.error,ge=j&&!L&&!N&&!_e&&!(te&&te.lock_actions),Ne=nw({auto_pending:ge,continuation_required:N,queueing:Ce,merge_step:me,conflict_badge:Se,conflict_live:H?.live===!0||i==="running",auto_resolution:G,recovery:te,cleanup_failed:r,cleanup_label:r?Tr(r.step):null,base_exception:f,conflicting:T,gate:Q,receipt_check:Y&&Y.receipt_check?Y.receipt_check:null,queue_failure:L,auto_skip:d,queued:j,queue_active:R,queue_position:a?a.position:0,review_session:V,review_dispatch:Ee,auto_review_wait:oe,activity:Se?null:s&&s.activity||null}),qe=Ne?.live===!0&&Ne.title?c`<span title=${Ne.title}>${Ne.label}</span>`:Ne?.label||null,Ze=tw(Y&&Y.receipt_check?Y.receipt_check:null);return{id:e,title:l?c`${t}<span class="muted"> · 세션</span>`:t,reason:r&&me?.active!==!0?ai(r.step):"PR \uB300\uAE30",draggable:!1,done:!0,lane:"pr_wait",...F?{dependency_chips:F}:{},external:l,pr_number:P&&typeof P.number=="number"?P.number:null,pr_url:P&&typeof P.url=="string"?P.url:"",completion_badge:Ne?.live!==!0&&Ne?.title?Ne.label:null,completion_title:Ne?.title||"",...g?.phase==="needs_human"&&typeof g.log_path=="string"&&g.log_path.length>0?{log_path:g.log_path}:{},...Ze.length>0?{receipt_badge:{codes:Ze}}:{},badges:qe?[qe]:[],live_badge:Ne?.live===!0?qe:null,usage:o,alert:Ne?.alert===!0,merge_action:Q?.tier==="merged"&&!_e&&!Ye?!1:!j||N||be||I,cancel_action:j&&!N,cancel_enabled:!R&&!(te&&te.lock_actions),cancel_title:te&&te.lock_actions?`${te.badge} \u2014 \uC911\uB2E8\uD558\uB824\uBA74 \uC0C1\uB2E8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8\uC744 \uC0AC\uC6A9\uD558\uC138\uC694`:R?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"\uBA38\uC9C0 \uD050\uC5D0\uC11C \uC774 \uD56D\uBAA9\uC744 \uBE8D\uB2C8\uB2E4 (\uB2E4\uC2DC [\uBA38\uC9C0]\uB85C \uB123\uC744 \uC218 \uC788\uC2B5\uB2C8\uB2E4)",discard:ne,discard_action:ne.action,resolve_action:Ae,resolve_enabled:!se,resolve_title:se?"\uC138\uC158 \uAE30\uB3D9 \uC694\uCCAD \uC911 \u2014 \uC11C\uBC84 \uC751\uB2F5\uC744 \uAE30\uB2E4\uB9BD\uB2C8\uB2E4":"\uC774 \uC2E4\uD328\uB97C \uC0AC\uB78C\uC774 \uC774\uC5B4\uBC1B\uB294 \uB300\uD654\uD615 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4 \u2014 \uAE30\uB85D\uB41C \uC138\uC158\uC774 \uC788\uC73C\uBA74 fork\uD558\uACE0, \uC5C6\uC73C\uBA74 \uC0C8 \uC138\uC158\uC5D0 \uC0AC\uC720\uB97C \uC2E3\uC2B5\uB2C8\uB2E4",merge_step:me,discard_enabled:ne.enabled,discard_title:ne.title,merge_enabled:!me&&!Ce&&!i&&!de&&!f&&!(te&&te.lock_actions)&&!ue&&V.active!==!0&&(ee||T||Q?.reason==="base_behind"||I||_e||Ye||it||D&&!R),merge_label:N?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":_e||Ye?Re==="deploy"?"\uBC30\uD3EC \uC7AC\uC2DC\uB3C4 \uD6C4 \uC815\uB9AC":Re==="verify"?"\uAC80\uC99D \uC7AC\uC2DC\uB3C4 \uD6C4 \uC815\uB9AC":"\uC815\uB9AC \uC7AC\uC2DC\uB3C4":T&&!me&&!_e?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":Q?.reason==="base_behind"?"base \uAC31\uC2E0 \uD6C4 \uBA38\uC9C0":I?"\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0":be?"\uB2E4\uC2DC \uBA38\uC9C0":void 0,merge_title:de?ne.error?`\uD3D0\uAE30 \uC2E4\uD328: ${ne.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${ne.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:N?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":Ce?"\uC694\uCCAD\uC744 \uBCF4\uB0B4\uB294 \uC911 \u2014 \uC11C\uBC84 \uC751\uB2F5\uC744 \uAE30\uB2E4\uB9BD\uB2C8\uB2E4":me?`\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 ${me.label}`:Re?`\uBA38\uC9C0 \uC644\uB8CC \u2014 ${Re==="deploy"?"\uBC30\uD3EC":"\uAC80\uC99D"} \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD574 \uC815\uB9AC\uAC00 \uBA48\uCDC4\uC2B5\uB2C8\uB2E4. \uD074\uB9AD\uD558\uBA74 \uC800\uC7A5\uC18C \uC791\uC5C5\uBD80\uD130 \uC815\uB9AC\uB97C \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4`:Ye?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uB2E4\uC2DC \uC2DC\uB3C4\uD569\uB2C8\uB2E4":ue?"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uC9C1\uC811 \uD574\uC18C\uD558\uC138\uC694":i==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC2E4\uD589 \uC911 \u2014 \uC644\uB8CC \uD6C4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":i==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC77C\uC2DC\uC815\uC9C0 \u2014 \uC7AC\uAC1C \uD6C4 \uC644\uB8CC\uB418\uBA74 \uBA38\uC9C0\uD558\uC138\uC694":_e?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC2DC\uB3C4\uD569\uB2C8\uB2E4":T?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":Q?.reason==="base_behind"?"base\uB97C \uC790\uB3D9 \uAC31\uC2E0\uD55C \uB4A4 \uBA38\uC9C0\uD569\uB2C8\uB2E4":V.active===!0?V.origin==="auto"?"\uC790\uB3D9 \uB9AC\uBDF0 \uC138\uC158 \uC2E4\uD589 \uC911 \u2014 \uB05D\uB098\uBA74 \uC601\uC218\uC99D\uC744 \uB2E4\uC2DC \uD310\uC815\uD569\uB2C8\uB2E4":"\uB9AC\uBDF0 \uC138\uC158 \uC2E4\uD589 \uC911 \u2014 \uB05D\uB098\uBA74 \uC601\uC218\uC99D\uC744 \uB2E4\uC2DC \uD310\uC815\uD569\uB2C8\uB2E4":Q?.reason==="review_receipt_missing"?"\uB9AC\uBDF0 \uC601\uC218\uC99D \uC5C6\uC74C \u2014 \uBA38\uC9C0 \uAC8C\uC774\uD2B8 \uBCF4\uB958\uC785\uB2C8\uB2E4. \uD074\uB9AD\uD558\uBA74 \uAE30\uB85D\uB41C \uC138\uC158\uC744 \uC774\uC5B4 \uB9AC\uBDF0\uB9CC \uC218\uD589\uC2DC\uD0A4\uACE0, \uC601\uC218\uC99D\uC774 \uCD5C\uC885 head\uC5D0 \uC720\uD6A8\uD574\uC9C0\uBA74 \uD050\uAC00 \uBA38\uC9C0\uD569\uB2C8\uB2E4":Q?.reason==="review_receipt_stale"?"head \uC7AC\uC791\uC131\uB428(\uC601\uC218\uC99D\uC774 \uD604\uC7AC head\uC758 \uC870\uC0C1\uC774 \uC544\uB2D8) \u2014 \uBA38\uC9C0 \uAC8C\uC774\uD2B8 \uBCF4\uB958\uC785\uB2C8\uB2E4. \uD074\uB9AD\uD558\uBA74 \uAE30\uB85D\uB41C \uC138\uC158\uC744 \uC774\uC5B4 \uCD5C\uC885 head\uB97C \uB2E4\uC2DC \uB9AC\uBDF0\uC2DC\uD0A4\uACE0, \uC601\uC218\uC99D\uC774 \uC720\uD6A8\uD574\uC9C0\uBA74 \uD050\uAC00 \uBA38\uC9C0\uD569\uB2C8\uB2E4":Q?.reason==="review_receipt_invalid"?"\uB9AC\uBDF0 \uC601\uC218\uC99D \uAE30\uB85D\uC774 \uC131\uB9BD\uD558\uC9C0 \uC54A\uC74C \u2014 \uBA38\uC9C0 \uAC8C\uC774\uD2B8 \uBCF4\uB958\uC785\uB2C8\uB2E4. \uD074\uB9AD\uD558\uBA74 \uAE30\uB85D\uB41C \uC138\uC158\uC744 \uC774\uC5B4 \uCD5C\uC885 head\uB97C \uB2E4\uC2DC \uB9AC\uBDF0\uC2DC\uD0A4\uACE0, \uC601\uC218\uC99D\uC774 \uC720\uD6A8\uD574\uC9C0\uBA74 \uD050\uAC00 \uBA38\uC9C0\uD569\uB2C8\uB2E4":Q?.reason==="review_receipt_undetermined"?"\uB9AC\uBDF0 \uC601\uC218\uC99D ancestry probe \uBBF8\uC644\uB8CC \u2014 \uBA38\uC9C0 \uAC8C\uC774\uD2B8 \uBCF4\uB958\uC785\uB2C8\uB2E4. \uD074\uB9AD\uD558\uBA74 \uAE30\uB85D\uB41C \uC138\uC158\uC744 \uC774\uC5B4 \uCD5C\uC885 head\uB97C \uB2E4\uC2DC \uB9AC\uBDF0\uC2DC\uD0A4\uACE0, \uC0C8 \uC601\uC218\uC99D\uC774 \uCD5C\uC885 head\uC5D0 \uC720\uD6A8\uD574\uC9C0\uBA74 \uD050\uAC00 \uBA38\uC9C0\uD569\uB2C8\uB2E4":Q?.reason==="spec_id_missing"?"native spec_id \uBBF8\uAE30\uB85D \u2014 bd update --spec-id\uB85C \uAE30\uB85D\uD55C \uB4A4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":ee?`\uBA38\uC9C0 (${Q.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4 (\uCC28\uB840\uAC00 \uB418\uBA74 \uB2E4\uC2DC \uD655\uC778)`:Q&&Q.tier==="merged"?"\uBA38\uC9C0\uB428 \u2014 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC \uC9C4\uD589 \uC911":`\uBA38\uC9C0 \uBD88\uAC00: ${Q&&Q.reason||"\uAD00\uCE21 \uB300\uAE30"}`}}function Cl(e,t={}){let{transport:n,issueStores:r,queueStore:o,sessionLogStore:s,gotoIssue:i,getWorkspacePath:l,switchWorkspace:a,openDoc:u,doneRange:d,onDoneRangeChange:f}=t,g=r?Ur(r):null,m=Mv(),w=null,C=null,F=Xr(()=>_()),V=new Map,se=new Map,j=bf(),N=xl(j)===null,R=d?Dn(d):jv();function L(){let v=Mr.find(k=>k.value===R);return v?v.label:"\uC624\uB298"}let B=Pi("beads-ui.worker.lane-collapsed"),Y=!1,Q=new Set,P=new Set,H=new Set;function G(v,k){return!k?.error||!v?{}:{resolve_action:!0,resolve_enabled:!H.has(v),resolve_title:H.has(v)?"\uC138\uC158 \uAE30\uB3D9 \uC694\uCCAD \uC911 \u2014 \uC11C\uBC84 \uC751\uB2F5\uC744 \uAE30\uB2E4\uB9BD\uB2C8\uB2E4":"\uC2E4\uD328\uD55C \uD3D0\uAE30\uB97C \uC0AC\uB78C\uC774 \uC774\uC5B4\uBC1B\uB294 \uB300\uD654\uD615 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4 \u2014 \uAE30\uB85D\uB41C \uC138\uC158\uC774 \uC788\uC73C\uBA74 fork\uD558\uACE0, \uC5C6\uC73C\uBA74 \uC0C8 \uC138\uC158\uC5D0 \uC0AC\uC720\uB97C \uC2E3\uC2B5\uB2C8\uB2E4"}}let te=new Set,ke=new Set,Ee=new Set,oe=null,D=[],be=qf({queueStore:o,issueStores:r,transport:n,getWorkspacePath:l,onInvalidate:()=>_()});function Se(){be.refreshSessionDefaults()}let T=document.createElement("div");T.className="worker-console";let ee=document.createElement("div");ee.className="worker-top";let me=document.createElement("div");me.className="worker-drawer-overlay",me.hidden=!0;let ve=document.createElement("div");ve.className="worker-drawer-overlay__backdrop";let Ce=document.createElement("div");Ce.className="worker-drawer-host";let _e=document.createElement("div");_e.className="worker-drawer-host",_e.hidden=!0,me.append(ve,Ce,_e);let Re=document.createElement("div");Re.className="worker-lanes-host",T.append(ee,me,Re),e.appendChild(T);let Ye=ar(null,null),it=[],I=Mi({transport:n,console_el:T,getLanes:()=>Ye,getWorkspaces:()=>it,getCrossLanes:()=>null,reproject:()=>({lanes:q(),raw_lanes:null}),onCorrection:()=>{},showToast:we,requestRender:()=>_(),adoptQueue:(v,k)=>{o&&o.set(k)},onDragBegin:()=>{w=null}}),ue=null,ne=co(Ce,{transport:n,sessionLogStore:s,onClose:()=>{ue=null,me.hidden=!0,_()}}),de=Pf(_e,{onClose:()=>{_e.hidden=!0,me.hidden=!0,_()}}),Ae=Sf({getWorkspacePath:l||(()=>"")}),ge=l&&l()||"",Ne=Tf({queueStore:o,transport:n,onChanged:()=>_(),onOpenScript:(v,k)=>{Ae.open(v,k)}});function qe(){return o&&o.get()||{revision:0,auto_advance:!1,auto_merge:!1,slots:Wi,queue:[],serial_lanes:[],serial_lane_count:0,pr_wait:[],done:[]}}function Ze(){let v=qe(),k=typeof v.serial_lane_count=="number"&&Number.isInteger(v.serial_lane_count)&&v.serial_lane_count>0?Math.min(v.serial_lane_count,5):0,O=Array.isArray(v.serial_lanes)?v.serial_lanes:[],pe=[];for(let Me of O){if(pe.length>=k)break;!Me||typeof Me.id!="string"||!/^s[1-5]$/.test(Me.id)||!Array.isArray(Me.entries)||pe.push({id:Me.id,label:`\uC9C1\uB82C ${Me.id.slice(1)}`,count:Me.entries.length})}return pe.length===0?null:[{id:"parallel",label:"\uBCD1\uB82C",count:(Array.isArray(v.queue)?v.queue:[]).length},...pe]}function Fe(v){if(!w||!v.some(O=>O.id===w))return null;let k=Ze();return k?{bead_id:w,lanes:k}:null}function Z(){return l&&l()||""}async function X(v,k){await I.sendOp({type:"worker-queue-place",payload:{bead_id:v,...k==="parallel"?{}:{lane:k}},root_dir:Z()},v)}function Te(){let v=qe();return typeof v.revision=="number"?v.revision:0}function He(v){v&&v.queue&&o&&o.set(v.queue)}async function at(v){if(!n||!v)return;let k=await n("worker-attempt-pause",{attempt_id:v});k&&k.paused===!1&&k.reason&&we(`\uC77C\uC2DC\uC815\uC9C0 \uAC70\uBD80: ${k.reason}`,"error",2400)}async function y(v,k="session"){if(!n||!v)return;let O=await Gr();if(O===null)return;let pe=async(Me={})=>await n("worker-attempt-resume",{attempt_id:v,expected_revision:Te(),...O!==""?{instructions:O}:{},...Me}),ye=await pe();He(ye),ye&&ye.conflict&&(ye=await pe(),He(ye)),ye=await Wn(ye,(Me,Qe)=>pe({continuation:Me,decision_token:Qe}),{onResult:He,refresh:()=>pe()}),ye&&ye.resumed===!1&&!ye.conflict&&ye.reason&&we(`${k==="settlement"?"\uC815\uC0B0 \uC7AC\uAC1C":"\uC774\uC5B4\uD558\uAE30"} \uAC70\uBD80: ${ye.reason}`,"error",2400)}async function U(v,k,O=!0){if(!n)return null;let pe=n,ye=await pe(v,{...k,expected_revision:Te()});return He(ye),ye&&ye.conflict&&O&&(ye=await pe(v,{...k,expected_revision:Te()}),He(ye)),ye}async function Oe(v){if(!n||!v)return;let k=qe().merge_queue?.find(pe=>pe.bead_id===v)?.continuation_action;if(k?.mismatch&&k.continuation===null){await Et(v,k.mismatch);return}Q.add(v),_();let O;try{O=await U("worker-merge-queue-add",{bead_id:v})}catch{we("\uBA38\uC9C0 \uD074\uB9AD\uC774 \uC11C\uBC84\uC5D0 \uC804\uB2EC\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4(\uC5F0\uACB0 \uBB38\uC81C) \u2014 \uC5F0\uACB0 \uBCF5\uAD6C \uD6C4 \uB2E4\uC2DC \uB20C\uB7EC\uC8FC\uC138\uC694","error",3200);return}finally{Q.delete(v),_()}if(!(!O||O.applied)){if(O.conflict){we("\uD050\uAC00 \uBC14\uB00C\uC5B4 \uBA38\uC9C0 \uD074\uB9AD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uB20C\uB7EC\uC8FC\uC138\uC694","error",2400);return}we(Uv(O.reason),"error",2400)}}async function Ie(v){if(!(!n||!v||P.has(v))){P.add(v),_();try{let k=await n("worker-cleanup-retry",{bead_id:v,expected_revision:Te()});He(k),k&&!k.retried&&!k.conflict&&k.reason&&we(`\uC815\uB9AC \uC7AC\uC2DC\uB3C4 \uAC70\uBD80: ${k.reason}`,"error",2400)}finally{P.delete(v),_()}}}async function Ue(v){if(!(!n||!v||H.has(v))){H.add(v),_();try{let k=await n("worker-resolve-in-session",{bead_id:v,expected_revision:Te()});He(k),we(Hv(k),Gv(k),4e3)}finally{H.delete(v),_()}}}async function Ke(v,k){let O=qe().hold;if(!n||!O||typeof O.since!="number")return;let pe=await n(v,{since:O.since});He(pe),pe&&pe.ok===!1&&we(`${k}: ${pe.reason==="hold_changed"?"\uD050 \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uD655\uC778\uD558\uC138\uC694":pe.reason||""}`,"error",2800)}async function pt(v,k){if(!n||!v||!k)return;let O=await n("worker-parked-retry",{bead_id:v,attempt_id:k});He(O),O&&O.ok===!1&&we(`\uC7AC\uC2DC\uB3C4 \uAC70\uBD80: ${O.reason==="not_latest"?"\uC774 bead\uC5D0 \uB354 \uC0C8\uB85C\uC6B4 \uC2DC\uB3C4\uAC00 \uC788\uC2B5\uB2C8\uB2E4":O.reason||""}`,"error",2800)}async function Et(v,k){let O=await Wn({continuation_mismatch:k},(ye,Me)=>U("worker-merge-queue-add",{bead_id:v,continuation:ye,decision_token:Me},!1)),pe=O?.queue?.merge_queue?.find(ye=>ye.bead_id===v)?.continuation_action;if(O?.applied!==!0&&pe?.continuation===null&&pe.mismatch){await Et(v,pe.mismatch);return}O&&O.applied===!1&&!O.conflict&&we("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD\uC774 \uCD5C\uC2E0 \uC0C1\uD0DC\uC640 \uC77C\uCE58\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4","error",2800)}async function It(v){if(!n)return;let k=await U("worker-merge-auto-toggle",{on:v});!k||k.conflict||we(v?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0 \u2014 \uB300\uAE30 \uD56D\uBAA9\uC744 \uBE44\uC6E0\uC2B5\uB2C8\uB2E4",v?"success":"info",2400)}async function Mt(v){if(!n||!v)return;let k=await U("worker-merge-queue-remove",{bead_id:v});k&&!k.conflict&&!k.applied&&k.reason==="merge_active"&&we("\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error",2400)}async function mt(){await U("worker-merge-queue-remove",{all:!0})}async function ct(v,k=null,O="unmerged",pe=null){if(!n||!v)return;let ye=Io(v,O);if(!(!!pe||typeof globalThis.confirm!="function"||globalThis.confirm(ye)))return;let Qe=await n("worker-discard",{bead_id:v,...k?{attempt_id:k}:{},...pe?{operation_id:pe}:{},expected_revision:Te()});if(He(Qe),Qe&&Qe.conflict&&(Qe=await n("worker-discard",{bead_id:v,...k?{attempt_id:k}:{},...pe?{operation_id:pe}:{},expected_revision:Te()}),He(Qe)),Qe&&Qe.discarded===!0){we(Vs(Qe),"success",5e3);return}if(Qe&&Qe.reason){we(`\uD3D0\uAE30 \uC2E4\uD328: ${Qe.reason}`,"error",2800);return}if(Qe&&Qe.accepted&&Qe.pending==="merged_revert"){we("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success",2400);return}if(Qe&&Qe.accepted&&!Qe.discarded){we(`\uD3D0\uAE30 \uC9C4\uD589: ${Qe.phase||"\uBC31\uC5C5 \uC911"}`,"success",2400);return}Qe&&!Qe.conflict&&we("\uD3D0\uAE30 \uAC70\uBD80: unknown","error",2800)}async function $t(v,k,O){if(!(!n||!k||!O||ke.has(k))){ke.add(k),_();try{let pe=await n(v,{bead_id:k,action_id:O,expected_revision:Te()});He(pe),pe?.conflict?we("\uC774\uC804 \uC791\uC5C5 \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694.","error",2800):!pe?.ok&&pe?.reason&&we(`\uC774\uC804 \uC791\uC5C5 \uCC98\uB9AC \uAC70\uBD80: ${String(pe.reason)}`,"error",2800)}finally{ke.delete(k),_()}}}async function Ct(v,k){if(!n||!k||te.has(k))return;te.add(k),_();let O;try{let pe=async(ye={})=>await n(v,{bead_id:k,expected_revision:Te(),...ye});O=await pe(),He(O),O&&O.conflict&&(O=await n(v,{bead_id:k,expected_revision:Te()}),He(O)),v==="worker-revise-fix"&&(O=await Wn(O,(ye,Me)=>pe({continuation:ye,decision_token:Me}),{onResult:He,refresh:()=>pe()}))}finally{te.delete(k),_()}if(!(!O||O.conflict)){if(O.ok){we(v==="worker-revise-fix"?"\uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4 \u2014 \uC218\uB9AC \uD6C4 \uAD6C\uD604\uC774 \uC7AC\uB514\uC2A4\uD328\uCE58\uB429\uB2C8\uB2E4":"\uB378\uD0C0 \uC2B9\uC778 \uC644\uB8CC \u2014 \uC601\uC218\uC99D \uAC31\uC2E0 + \uD30C\uD0B9 \uD574\uC81C","success",2800);return}we(`\uCC98\uBD84 \uAC70\uBD80: ${O.reason||""}`,"error",3e3)}}async function Lt(v){if(!n)return;let k=await n("worker-automation-toggle",{on:v,expected_revision:Te()});He(k),k&&k.conflict&&await n("worker-automation-toggle",{on:v,expected_revision:Te()}).then(He)}async function ae(v){if(!n||!v)return;let k=await n("worker-repo-operation-dismiss",{operation_id:v});He(k),k&&k.ok===!1&&we(`\uAE30\uB85D \uB2EB\uAE30 \uAC70\uBD80: ${k.reason||""}`,"error",3e3)}async function ie(v){if(!n||!Number.isFinite(v))return;let k=Math.max(Wi,Math.floor(v)),O=await n("worker-queue-set-slots",{slots:k,expected_revision:Te()});He(O),O&&O.conflict&&await n("worker-queue-set-slots",{slots:k,expected_revision:Te()}).then(He)}async function $(v){if(!n||!Number.isInteger(v)||v<1||v>jf)return;let k=qe(),O=(Array.isArray(k.serial_lanes)?k.serial_lanes:[]).slice(v).reduce((Me,Qe)=>Me+(Array.isArray(Qe?.entries)?Qe.entries.length:0),0),pe=()=>({count:v,expected_revision:Te()}),ye=await n("worker-queue-set-serial-lane-count",pe());He(ye),ye&&ye.conflict&&(ye=await n("worker-queue-set-serial-lane-count",pe()),He(ye)),ye&&ye.applied&&O>0&&we(`\uC9C1\uB82C \uB808\uC778 \uCD95\uC18C \u2014 ${O}\uAC1C \uD56D\uBAA9\uC774 \uBCD1\uB82C \uB300\uAE30\uB85C \uC774\uB3D9`)}function q(){let v=wr(R),k=be.read({candidate_sort:j,done_since:v});return it=k.workspaces,Ye=ar(k.workspaces,k.workspaces_state,{done_since:v,candidate_filter:m,candidate_hidden_counts:"per_control",candidate_sort:"as_given",groups:"all"}),Ye}function J(v){return v.queue_groups[0]||Dv}function re(v){let k=v.dependency_chips||null,O={...k&&k.released?{released:k.released}:{},...k&&k.dependents?{dependents:k.dependents}:{}},pe=V.get(v.id),ye=se.get(v.id)||null,Me=pe&&pe.overlaps.length>0?pe.overlaps:null,Qe=!!pe&&pe.scope_missing;return!ye&&!Me&&!Qe&&Object.keys(O).length===0?null:{...O,...ye?{predecessors:ye}:{},...Me?{overlaps:Me}:{},...Qe?{scope_missing:!0}:{}}}function le(v){return{...v,workspace_name:"",done_layout:void 0,dependency_chips:re(v)||void 0,chip_popover:Be(v)}}function Be(v){return ni(v,k=>F.isOpen({bead_id:v.id,chip_key:k}))}function Ve(){let v=qe(),k=new Map;for(let O of Object.values(fn(v.lane_states))){let pe=Array.isArray(O?.corrections)?O.corrections:[];for(let ye of pe)ye&&typeof ye.bead_id=="string"&&typeof ye.after=="string"&&k.set(ye.bead_id,ye.after)}return{admission:fn(v.admission),correction_after:k}}function tt(v,k){let O=le(v),pe=Ou(k.admission[v.id]||null,!!v.discard||ke.has(v.id)),ye=k.correction_after.get(v.id);return{...O,draggable:O.draggable===!0&&!pe,stale_work:pe,reason:pe?"":O.reason,badges:ye?[`\u{1F517} ${ye} \uB4A4 (blocks \uC790\uB3D9)`,...O.badges||[]]:O.badges,revise_enabled:O.revise_enabled===!0&&!te.has(v.id)}}function ze(v){let k=Ve();return J(v).sublanes.parallel.map(O=>tt(O,k))}function xt(v){let k=Ve();return J(v).sublanes.serial.map(O=>{let pe=O.occupants.map(ye=>({id:ye.id,title:ye.title,draggable:!1,lane:O.id,ghost:!0,badges:[ye.badge]}));return{id:O.id,index:O.index+1,raw_length:O.raw_length,ghosts:pe,items:O.items.map(ye=>tt(ye,k)),occupied:O.occupied_by.length>0,badge:O.occupants.length>0?O.occupants[0].badge:"\uB300\uAE30",cycle:O.cycle===!0}})}function Nt(v){return v.runnable.map(k=>le(k))}function At(v){return v.done.map(k=>le(k))}function Zt(v){let k=v.running.filter(O=>O.non_occupying!==!0).map(O=>({...O,bead_id:O.id,attempt_id:O.attempt_id||"",paused:O.run_state==="paused",failed:O.run_state==="failed",parked:O.run_state==="parked",retry_wait:O.run_state==="retry_wait",waiting:O.run_state==="waiting",wait:O.wait||null,status_label:O.run_state==="failed"?O.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328":O.run_state==="parked"?"\uC138\uC158 \uB300\uAE30":O.run_state==="retry_wait"?"\uC7AC\uC2DC\uB3C4 \uB300\uAE30":O.run_state==="waiting"?"\uC120\uD589 \uB300\uAE30":void 0,can_pause:O.can_pause!==!1,workspace_name:"",dependency_chips:re(O)||void 0,chip_popover:Be(O),rollup_expanded:Ee.has(O.id),failure:O.failure?{...O.failure,open:C===O.attempt_id}:null,...G(O.id,O.discard)}));return[...k.filter(O=>O.failed===!0),...k.filter(O=>O.failed!==!0&&O.parked===!0),...k.filter(O=>O.failed!==!0&&O.parked!==!0)]}function vt(v){return Rt(v).map(k=>({...k,chip_popover:Be(k)}))}function Rt(v){if(oe&&oe.model===v)return oe.rows;let k=qe(),O=J(v),pe=fn(k.attempts),ye=Object.values(pe).filter(Gn),Me=new Map;for(let Ge of ye)Me.set(Ge.attempt_id,Ge);let Qe=new Map;for(let Ge of ye)Qe.set(Ge.bead_id,Ge);let wt=new Map;for(let Ge of[...v.pr_wait,...v.running,...v.queue,...v.runnable,...v.done])wt.has(Ge.id)||wt.set(Ge.id,Ge);let Bt=Ge=>{let jt=null;for(let yn of ye)!yn||yn.bead_id!==Ge||qa(yn,Me)||(jt===null||(typeof yn.started_at=="number"?yn.started_at:0)>=(typeof jt.started_at=="number"?jt.started_at:0))&&(jt=yn);return jt&&typeof jt.target_base=="string"?jt.target_base:null},tn=new Map;for(let Ge of v.running)Ge.run_state==="failed"||Ge.conflict_resolution!==!0||(Ge.run_state!=="paused"?tn.set(Ge.id,"running"):tn.has(Ge.id)||tn.set(Ge.id,"paused"));let mn=fn(k.auto_merge_skips),In=new Set(O.merge.auto_excluded),_r=fn(k.pr_observations),Ln=fn(k.pr_activity),Pn=fn(k.cleanup_failed),Xt=fn(k.discard_operations),jn=fn(k.bead_workflow),Pr=fn(k.bead_titles),mr=k.merge_queue_state||{active:null,failures:{}},Jn=O.merge.state.waiting,kn=new Map;for(let Ge of Array.isArray(k.merge_queue)?k.merge_queue:[])Ge&&typeof Ge=="object"&&Ge.bead_id&&kn.set(Ge.bead_id,Ge);let er=(Array.isArray(k.pr_wait)?k.pr_wait:[]).map(Ge=>{let jt=wt.get(Ge.bead_id);return{...rw(Ge.bead_id,jt?.title||Pr[Ge.bead_id]||Ge.bead_id,_r,Pn[Ge.bead_id]||null,Hn(pe,Ge.bead_id),Ln[Ge.bead_id]||(Q.has(Ge.bead_id)?{activity:null,merge_progress:null,queueing:"merge"}:P.has(Ge.bead_id)?{activity:null,merge_progress:null,queueing:"cleanup"}:null),tn.get(Ge.bead_id)||null,Ge.external===!0,{position:O.merge.positions.get(Ge.bead_id)||0,active:mr.active===Ge.bead_id,failure:fn(mr.failures)[Ge.bead_id]||null,waiting:Jn&&Jn.bead_id===Ge.bead_id?Jn.reason:null,resolution:O.merge.resolutions.get(Ge.bead_id),continuation_action:O.merge.continuations.get(Ge.bead_id),authority:O.merge.authorities.get(Ge.bead_id)||null,hold:kn.get(Ge.bead_id)?.hold||null,review_dispatch:kn.get(Ge.bead_id)?.review_dispatch||null},Ge.wt_present!==!1,k.auto_merge===!0&&In.has(Ge.bead_id)?mn[Ge.bead_id]?.reason||"":null,Na(O.declared_base,Bt(Ge.bead_id)),fn(k.completion_status)[Ge.bead_id]||null,Xt,k.auto_merge===!0,{merge_sha:Ge.merge_sha,cleanup_cursor:Ge.cleanup_cursor,repo_operations:O.repo_operations},jt?re(jt):null,Eu(pe,Ge.bead_id),H.has(Ge.bead_id)),workflow:jn[Ge.bead_id]||null,priority:jt?.priority,from_id:jt?.from_id,...jt?.created_at===void 0?{}:{created_at:jt.created_at},...jt?.updated_at===void 0?{}:{updated_at:jt.updated_at}}});return oe={model:v,rows:er},er}function Wt(v){let k=J(v),O=[];for(let Me of v.running)Me.non_occupying!==!0&&O.push({id:Me.id,title:Me.title,location_label:"\uC2E4\uD589\uC911",kind:"running",lane_id:Me.serial_lane_id??null});for(let Me of v.pr_wait)O.push({id:Me.id,title:Me.title,location_label:"PR \uB300\uAE30",kind:"pr_wait",lane_id:null});for(let Me of k.sublanes.serial)Me.items.forEach((Qe,wt)=>{O.push({id:Qe.id,title:Qe.title,location_label:`${Me.id} #${wt+1}`,kind:"serial",lane_id:Me.id})});k.sublanes.parallel.forEach((Me,Qe)=>{O.push({id:Me.id,title:Me.title,location_label:`#${Qe+1}`,kind:"parallel",lane_id:null})});for(let Me of v.runnable)O.push({id:Me.id,title:Me.title,location_label:"\uD6C4\uBCF4",kind:"candidate",lane_id:null,queue_placeable:Me.queue_placeable===!0});let pe=qe();V=kf(pe.bead_scope,O);let ye=new Map;for(let Me of[...v.running,...v.runnable])Array.isArray(Me.blocked_by)&&Me.blocked_by.length>0&&ye.set(Me.id,Me.blocked_by);for(let[Me,Qe]of Object.entries(fn(pe.bead_blocked_by)))Array.isArray(Qe)&&ye.set(Me,Qe.filter(wt=>typeof wt=="string"&&wt.length>0));se=Uu(ye,O,fn(pe.blocker_workspaces))}function ut(v){let k=v.hold&&typeof v.hold=="object"?v.hold:null;if(!k||k.kind!=="env"&&k.kind!=="systemic")return"";let O=ur(k.cause)||String(k.cause||""),pe=Array.isArray(v.lineages)?v.lineages:[];if(k.kind==="env"){let Me=pe.map(wt=>wt&&wt.next_at).filter(wt=>typeof wt=="number").sort((wt,Bt)=>wt-Bt)[0],Qe=typeof Me=="number"?` \xB7 \uB2E4\uC74C ${new Date(Me).toLocaleTimeString("ko-KR",{hour:"2-digit",minute:"2-digit"})}`:"";return c`<div class="worker-hold worker-hold--env" role="status">
        <span class="worker-hold__text"
          >환경 보류: ${O} — 재시도 대기${Qe}</span
        >
        <button
          type="button"
          class="worker-hold__retry"
          title="예약된 재시도를 지금 실행합니다"
        >
          지금 재시도
        </button>
      </div>`}let ye=(Array.isArray(k.bead_ids)?k.bead_ids:[]).filter(Me=>typeof Me=="string"&&Me.length>0);return c`<div class="worker-hold worker-hold--systemic" role="alert">
      <span class="worker-hold__text"
        >${O}${ye.length>0?` \u2014 bead ${ye.join(", ")}`:""}</span
      >
      <button
        type="button"
        class="worker-hold__resume"
        title="정지를 풀고 멈춰 있던 bead를 다시 디스패치합니다"
      >
        재개
      </button>
    </div>`}function Kt(v){let k=qe(),O=J(v),pe=O.sublanes.parallel,ye=pe.length>0?pe[0].id:"\u2014",Me=c`<button
      type="button"
      class="worker-play${k.auto_advance?" is-active":""}"
    >
      ${k.auto_advance?"\u23F8 \uC790\uB3D9\uD654 \uBA48\uCDA4":"\u25B6 \uC790\uB3D9\uD654"}
    </button>`,Qe=Jt(v),wt=O.over_cap?c`<span
          class="worker-overcap"
          title="수동 재개(▶)는 슬롯 cap을 초과할 수 있습니다 — 자동 진행은 cap을 지킵니다"
          >cap 초과</span
        >`:"",Bt=k.auto_advance?0:(Array.isArray(k.queue)?k.queue:[]).filter(Xt=>Xt&&typeof Xt.armed_by_lane=="string"&&Xt.armed_by_lane.length>0).length,tn=Bt>0?c`<span
            class="worker-kpi__chip worker-kpi__chip--armed"
            title="모니터 연결 레인이 발차한 대기 행입니다 — 이 레포의 자동 진행은 꺼진 채입니다"
            >⏸ 자동 진행 꺼짐 · 연결 레인 ${Bt}건 진행 중</span
          >`:"",mn=c`<span class="worker-kpi__chip worker-kpi__chip--running"
        >실행 <b>${O.live_count}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--pr"
        >PR 대기 <b>${vt(v).length}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--done"
        >${L()} 완료 <b>${v.done.length}</b></span
      >`,In=c`<span
      class="worker-kpi__chip worker-kpi__chip--base"
      title=${O.declared_base?"\uC774 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uC5B8\uD55C target base (docs/agents/repo-ops.toml). \uB514\uC2A4\uD328\uCE58 \uC2DC\uC810\uC758 \uAC80\uC99D\uC740 \uBCC4\uB3C4":"\uC120\uC5B8 \uD30C\uC77C\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 \u2014 target base \uD655\uC778 \uBD88\uAC00"}
      >base ${O.declared_base||"?"}</span
    >`,_r=c`<label class="worker-tgl worker-slots"
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
          ${Array.from({length:jf},(Xt,jn)=>jn+1).map(Xt=>c`<option
                value=${String(Xt)}
                ?selected=${O.serial_lane_count===Xt}
              >
                ${Xt}
              </option>`)}
        </select>
      </label> `,Ln=Cu(O.repo_operations,O.cleanup_failures),Pn=ut(k);return Y?c`<div class="worker-ribbon">
          ${Me} ${Qe}
          <div class="worker-kpi worker-kpi--ribbon">
            ${wt}${tn}${mn}
          </div>
        </div>
        <div class="worker-ctrl worker-ctrl--mobile">
          <div class="worker-ctrl__ops">${_r}</div>
          <div class="worker-kpi">${In}</div>
        </div>
        ${Pn}${Ln}${Ne.template()}`:c`<div class="worker-ctrl">
        <div class="worker-ctrl__ops">${Me}${Qe}${_r}</div>
        <div class="worker-kpi">
          ${wt}${tn}${mn}${In}
          ${(Array.isArray(O.token_total)?O.token_total:O.token_total?[{label:O.token_total,tooltip:`${L()} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}]:[]).map(Xt=>c`<span
                class="worker-kpi__chip worker-kpi__chip--tokens"
                title=${Xt.tooltip}
                >${L()} 완료 · 누적 ${Xt.label}</span
              >`)}
          <span class="worker-kpi__next worker-stat"
            >다음 <b>${ye}</b></span
          >
        </div>
      </div>
      ${Pn}${Ln}${Ne.template()}`}function Yt(v){let k=v.runnable_hidden;return c`<div class="worker-filter">
      <label class="worker-filter__tgl" title="blocked 이슈 표시 (기본 숨김)">
        <input
          type="checkbox"
          class="worker-filter__blocked"
          .checked=${m.show_blocked}
        />
        🔒 blocked${k.blocked>0?` ${k.blocked}`:""}
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
        ${k.spec>0?c`<span class="worker-filter__hidden">숨김 ${k.spec}</span>`:""}
      </div>
    </div>`}function zt(){let v=N?"custom":xl(j)||"custom";return c`<select
      class="worker-sort"
      aria-label="후보 정렬"
      title="후보 정렬"
      .value=${v}
    >
      ${os.map(k=>c`<option value=${k.id} ?selected=${v===k.id}>
            ${k.label}
          </option>`)}
      <option value="custom" ?selected=${v==="custom"}>
        사용자 지정…
      </option>
    </select>`}function _n(){let v=ss(j);return c`<div
      class="worker-sort-chain"
      role="group"
      aria-label="후보 정렬 체인"
    >
      ${[0,1,2].map(k=>{let O=v[k];return c`<span class="worker-sort-chain__step">
          <select
            class="worker-sort-chain__key"
            data-step=${k}
            aria-label=${`${k+1}\uCC28 \uC815\uB82C \uD0A4`}
            .value=${O?O.key:""}
          >
            ${k===0?"":c`<option value="" ?selected=${!O}>없음</option>`}
            ${hf.map(pe=>c`<option
                  value=${pe.key}
                  ?selected=${!!O&&O.key===pe.key}
                >
                  ${pe.label}
                </option>`)}
          </select>
          ${O?c`<button
                type="button"
                class="worker-sort-chain__dir"
                data-step=${k}
                aria-label=${O.dir==="asc"?"\uC624\uB984\uCC28\uC21C":"\uB0B4\uB9BC\uCC28\uC21C"}
                title=${O.dir==="asc"?"\uC624\uB984\uCC28\uC21C":"\uB0B4\uB9BC\uCC28\uC21C"}
              >
                ${O.dir==="asc"?"\u2191":"\u2193"}
              </button>`:""}
        </span>`})}
    </div>`}function Ft(){return c`<div class="worker-done-controls">
      <select
        class="worker-sort worker-done-range"
        aria-label="완료 기간"
        title="완료 기간"
        .value=${R}
      >
        ${Mr.map(v=>c`<option value=${v.value} ?selected=${R===v.value}>
              ${v.label}
            </option>`)}
      </select>
    </div>`}function Jt(v){let k=J(v).merge,O=qe().auto_merge===!0;if(k.running)return c`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop${O?" is-active":""}"
        title=${O?"\uC790\uB3D9 \uBA38\uC9C0\uB97C \uB044\uACE0 \uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)":"\uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)"}
      >
        ${O?"\u23F8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8":"\uC77C\uAD04 \uBA38\uC9C0 \uC911\uB2E8"} ${k.positions.size}
      </button>`;if(O)return c`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop is-active"
        title="자동 머지 켜짐 — 자격이 생기는 PR을 계속 큐에 넣습니다. 클릭하면 끕니다"
      >
        ⏸ 자동 머지
      </button>`;let pe=new Set(k.auto_excluded),ye=vt(v).filter(Me=>Me.merge_action&&Me.merge_enabled&&!pe.has(Me.id)).length;return c`<button
      type="button"
      class="worker-merge-all"
      title="켜 두면 자격이 생기는 PR을 계속 큐에 넣어 순서대로 충돌 해소·머지합니다"
    >
      ▶ 자동 머지${ye>0?` ${ye}`:""}
    </button>`}function Ht(v){if(!(v.draggable!==!0||v.done===!0))return c`<span class="worker-mini__rowops">
      <button
        type="button"
        class="worker-mini__rowops-remove"
        data-action="queue-remove"
        data-bead-id=${v.id}
        title="대기에서 빼기"
        aria-label="대기에서 빼기"
      >
        ✕
      </button>
    </span>`}function en(v,k){return c`<div
      data-bead-id=${v.id}
      data-drag-kind=${k.kind}
      data-root-dir=${k.root_dir}
      data-lane-id=${rn(k.lane_id)}
      data-row-index=${k.row_index}
      data-queue-index=${String(v.queue_index??0)}
    >
      ${Sn({...v,...G(v.id,v.discard)},{actions:Ht(v)})}
    </div>`}function fe(v){let k=ze(v),O=Z();return oi({parallel:{rows:k.map((pe,ye)=>en(pe,{kind:"parallel",root_dir:O,row_index:ye})),count:k.length,collapsed:B.isAreaCollapsed("parallel"),drop:{drop:"parallel",root_dir:O}},serial:{lanes:xt(v).map(pe=>({id:pe.id,title:`\uC9C1\uB82C ${pe.index}`,rows:[...pe.ghosts.map(ye=>Sn({...ye,...G(ye.id,ye.discard)},{actions:Ht(ye)})),...pe.items.map((ye,Me)=>en(ye,{kind:"repo-serial",root_dir:O,row_index:Me,lane_id:pe.id}))],count:pe.ghosts.length+pe.items.length,empty:pe.ghosts.length+pe.items.length===0,badge:pe.badge,held:pe.occupied,cycle:pe.cycle,drop:{drop:"repo-serial",root_dir:O,lane_id:pe.id,lane_length:String(pe.raw_length)}})),collapsed:B.isAreaCollapsed("serial")}})}function E(v){return Cp(Zt(v),Date.now(),ue)}function he(v){return v.running.some(k=>k.kind!=="session"&&k.run_state==="running")}function De(v){let k=J(v),O=Nt(v),pe=ze(v),ye=At(v),Me=vt(v),Qe=Zt(v),wt=qn({id:"worker-pane-candidate",lane:"candidate",title:"\uD6C4\uBCF4",items:O,src:!0,empty:"\uD6C4\uBCF4 \uC5C6\uC74C",header_control:zt(),header_row:N?_n():void 0,controls:Yt(v),collapsible:!0,collapsed:B.isCollapsed("candidate"),place_menu:Fe(O),onOpenDoc:u?(tn,mn)=>u(mn):void 0}),Bt=qn({id:"worker-pane-done",lane:"done",title:"\uC644\uB8CC",items:ye,empty:`${L()} \uC644\uB8CC \uC5C6\uC74C`,header_control:Ft(),collapsible:!0,collapsed:B.isCollapsed("done"),preview:Y?Array.isArray(k.token_total)?k.token_total.map(tn=>tn.label).join(" \xB7 "):k.token_total||Ff(ye):void 0});return Y?c`<div class="worker-lanes worker-lanes--mobile">
        ${si({live:he(v),running_body:Qe.length>0?E(v):"",pr_wait_rows:Me.map(tn=>Sn(tn)),count:Qe.length+Me.length})}
        ${qn({id:"worker-pane-queue",lane:"queue",title:"\uB300\uAE30",items:pe,count:pe.length,collapsible:!0,collapsed:B.isCollapsed("queue"),preview:Ff(pe),body:fe(v)})}
        ${wt} ${Bt}
      </div>`:c`<div class="worker-lanes">
      ${wt}
      ${qn({id:"worker-pane-queue",lane:"queue",title:"\uB300\uAE30",items:pe,count:pe.length,collapsible:!0,collapsed:B.isCollapsed("queue"),body:fe(v)})}
      ${qn({id:"worker-pane-running",lane:"running",title:"\uC2E4\uD589 \uC911",items:Qe,header_control:c`<span class="worker-pane__meta"
          >슬롯 ${k.slots}</span
        >`,live:he(v),collapsible:!0,collapsed:B.isCollapsed("running"),body:E(v)})}
      ${qn({id:"worker-pane-pr-wait",lane:"pr_wait",title:"PR \uB300\uAE30",items:Me,empty:"PR \uB300\uAE30 \uC5C6\uC74C",collapsible:!0,collapsed:B.isCollapsed("pr_wait")})}
      ${Bt}
    </div>`}function h(v){B.toggle(v),_()}function p(v){B.toggleArea(v),_()}function _(){let v=q();Wt(v),st(Kt(v),ee),st(De(v),Re)}function S(){let v=!0,k=Li(O=>{if(Y=O,v){v=!1;return}_()});D.push(k)}function z(v){m=v,Nv(v),_()}function K(v){if(v==="custom"){N=!0,_();return}j=Lr(v),Al(j),N=!1,_()}function ce(v){j=Lr({chain:v}),Al(j),_()}function xe(v){R=Dn(v),Fv(R),f?.(R),_()}function Xe(v){let k=v.target?.closest?.(".worker-serial-lane-count");if(k){let Bt=Number.parseInt(k.value,10);Number.isFinite(Bt)&&$(Bt).then(_);return}let O=v.target?.closest?.(".worker-filter__blocked");if(O){z({...m,show_blocked:O.checked});return}let pe=v.target?.closest?.(".worker-sort-chain__key");if(pe){let Bt=Number.parseInt(pe.getAttribute("data-step")||"",10);Number.isFinite(Bt)&&ce(yf(ss(j),Bt,pe.value));return}let ye=v.target?.closest?.(".worker-done-range");if(ye){xe(ye.value);return}let Me=v.target?.closest?.(".worker-sort");if(Me){K(Me.value);return}let Qe=v.target?.closest?.(".worker-slots__input");if(!Qe)return;let wt=Number.parseInt(Qe.value,10);if(!Number.isFinite(wt)){_();return}ie(wt).then(_)}function ot(v){return v?{runner:v.runner||void 0,model:v.model||void 0,effort:v.effort||void 0,worktree:v.worktree||void 0,status:v.status||void 0,session_id:v.session_id||void 0}:{}}function ht(){let v=J(q()),k=qe().workspace_info,O=k&&typeof k=="object"&&k.repo_ops&&typeof k.repo_ops=="object"?k.repo_ops:null;return{operations:v.repo_operations,cleanup_failures:v.cleanup_failures,repo:l&&l()||"",repo_ops:O}}function gt(){ue&&ne.close(),_e.hidden=!1,me.hidden=!1,de.open(ht()),_()}function x(v){let k=qe(),O=k.attempts?k.attempts[v]:null;ue=v,de.close(),_e.hidden=!0,me.hidden=!1,ne.open({attempt_id:v,meta:ot(O)}),_()}function A(v){let k=qe(),O=(Array.isArray(k.session_active)?k.session_active:[]).find(ye=>ye&&ye.bead_id===v),pe=(O&&Array.isArray(O.session_refs)?O.session_refs:[]).find(ye=>ye&&ye.current===!0);pe&&(de.close(),_e.hidden=!0,me.hidden=!1,ne.open(Kr(pe,v,"in_progress")),_())}function Le(){if(de.isOpen()&&de.refresh(ht()),!ue)return;let v=qe(),k=v.attempts?v.attempts[ue]:null;if(k){ne.updateMeta(ot(k));return}ne.close()}function We(v,k){if(v.length===0||!i)return;let O=l?l():void 0;if(k.length===0||!O||k===O||!a){i(v);return}Promise.resolve(a(k)).then(()=>{i(v)}).catch(()=>{we("\uB808\uD3EC \uC804\uD658\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error",2400)})}function et(v){let k=v.target;if(k?.closest?.(".worker-mini__grip"))return;let O=k?.closest?.(".worker-sort-chain__dir");if(O){let Pe=Number.parseInt(O.getAttribute("data-step")||"",10);Number.isFinite(Pe)&&ce(vf(ss(j),Pe));return}let pe=k?.closest?.(".worker-dep__open");if(pe){We(pe.getAttribute("data-dep-id")||"",pe.getAttribute("data-root-dir")||"");return}let ye=k?.closest?.(".judgement-chip");if(ye){let Pe=ye.closest("[data-bead-id]"),je=Pe&&Pe.getAttribute("data-bead-id")||"",b=ye.getAttribute("data-chip-key")||"";je&&b&&F.toggle({bead_id:je,chip_key:b});return}if(k?.closest?.(".chip-popover"))return;if(k?.closest?.(".worker-repo-strip")){gt();return}let Me=k?.closest?.(".worker-repo-op__dismiss");if(Me){ae(Me.dataset.operationId||"");return}let Qe=k?.closest?.(".worker-cleanup__resume");if(Qe){let Pe=Qe.dataset.beadId;Pe&&Ie(Pe);return}let wt=k?.closest?.(".worker-cleanup__resolve");if(wt){let Pe=wt.dataset.beadId;Pe&&Ue(Pe);return}if(k?.closest?.(".worker-hold__retry")){Ke("worker-queue-hold-retry-now","\uC9C0\uAE08 \uC7AC\uC2DC\uB3C4 \uAC70\uBD80");return}if(k?.closest?.(".worker-hold__resume")){Ke("worker-queue-hold-resume","\uC7AC\uAC1C \uAC70\uBD80");return}if(k?.closest?.(".worker-play")){Lt(!qe().auto_advance);return}let Bt=k?.closest?.(".worker-merge-all");if(Bt){Bt.classList.contains("worker-merge-all--stop")?qe().auto_merge===!0?It(!1):mt():It(!0);return}let tn=k?.closest?.(".worker-pane__toggle[data-lane]");if(tn){let Pe=tn.dataset.lane;(Pe==="candidate"||Pe==="queue"||Pe==="running"||Pe==="pr_wait"||Pe==="done")&&h(Pe);return}let mn=k?.closest?.(".worker-wait__area-toggle[data-area]");if(mn){let Pe=mn.dataset.area;(Pe==="parallel"||Pe==="serial")&&p(Pe);return}let In=k?.closest?.(".worker-card__place-lane");if(In){let Pe=In.dataset.beadId,je=In.dataset.lane;Pe&&(je==="parallel"||/^s[1-5]$/.test(je||""))&&(w=null,_(),X(Pe,je));return}if(k?.closest?.(".worker-card__place-cancel")){w=null,_();return}let Ln=k?.closest?.(".worker-card__place");if(Ln){let Pe=Ln.dataset.beadId;Pe&&!Ln.disabled&&(Ze()?(w=Pe,_()):X(Pe,"parallel"));return}let Pn=k?.closest?.(".worker-filter__chip");if(Pn){let Pe=Pn.dataset.spec;(Pe==="all"||Pe==="with"||Pe==="without")&&z({...m,spec:Pe});return}let Xt=k?.closest?.('[data-action="queue-remove"]');if(Xt){let Pe=Xt.dataset.beadId||"";Pe&&I.sendOp({type:"worker-queue-remove",payload:{bead_id:Pe},root_dir:Z()},Pe);return}let jn=k?.closest?.(".worker-mini__merge");if(jn){let Pe=jn.dataset.beadId||"";qe().cleanup_failed?.[Pe]?Ie(Pe):Oe(Pe);return}let Pr=k?.closest?.(".worker-mini__merge-cancel");if(Pr){Mt(Pr.dataset.beadId||"");return}let mr=k?.closest?.(".worker-mini__resolve");if(mr){Ue(mr.dataset.beadId||"");return}let Jn=k?.closest?.(".rtile__resolve");if(Jn){let Pe=Jn.closest(".rtile");Ue(Pe?.dataset.beadId||"");return}let kn=k?.closest?.(".worker-mini__discard");if(kn){ct(kn.dataset.beadId||"",kn.dataset.attemptId||null,kn.dataset.discardMode==="merged"?"merged":"unmerged",kn.dataset.operationId||null);return}let er=k?.closest?.(".worker-mini__stale-continue");if(er){$t("worker-stale-work-continue",er.dataset.beadId||"",er.dataset.actionId||"");return}let Ge=k?.closest?.(".worker-mini__stale-backup");if(Ge){$t("worker-stale-work-backup-fresh",Ge.dataset.beadId||"",Ge.dataset.actionId||"");return}let jt=k?.closest?.(".worker-mini__stale-recheck");if(jt){$t("worker-stale-work-recheck",jt.dataset.beadId||"",jt.dataset.actionId||"");return}let yn=k?.closest?.(".worker-mini__revise-fix");if(yn){Ct("worker-revise-fix",yn.dataset.beadId||"");return}let as=k?.closest?.(".worker-mini__revise-approve");if(as){Ct("worker-revise-approve",as.dataset.beadId||"");return}if(k?.closest?.(".worker-mini__pr"))return;let ls=k?.closest?.(".rtile__failure-badge");if(ls){let Pe=ls.dataset.attemptId||"";C=C===Pe?null:Pe,_();return}let cs=k?.closest?.(".rtile__attempt-copy");if(cs){let Pe=cs.dataset.attemptId||"";Pe&&sn(Pe).then(je=>{we(je?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",je?"success":"error",1400)});return}if(k?.closest?.(".rtile__parked-retry")){let Pe=k?.closest?.(".rtile");pt(Pe?.dataset?.beadId||"",Pe?.dataset?.attemptId||"");return}let po=k?.closest?.(".rtile__discard");if(po){let Pe=k?.closest?.(".rtile"),je=Pe?.dataset?.beadId,b=Pe?.dataset?.attemptId;je&&ct(je,b||null,po.dataset.confirmation==="merged"?"merged":"unmerged",po.dataset.operationId||null);return}if(k?.closest?.(".rtile__pause")){let je=k?.closest?.(".rtile")?.dataset?.attemptId;je&&at(je);return}if(k?.closest?.(".rtile__resume")){let Pe=k?.closest?.(".rtile__resume"),b=k?.closest?.(".rtile")?.dataset?.attemptId;b&&y(b,Pe?.dataset?.resumeKind==="settlement"?"settlement":"session");return}if(k?.closest?.(".rtile__session")){let Pe=k?.closest?.(".rtile"),je=Pe?.dataset?.attemptId;if(je){x(je);return}let b=Pe?.dataset?.beadId;b&&A(b);return}if(k?.closest?.(".rtile__failure-pop"))return;if(k?.closest?.(".worker-drawer-overlay__backdrop")){de.close(),ne.close();return}if(k?.closest?.(".worker-drawer-host"))return;let us=k?.closest?.(".rtile .board-card__roll-toggle");if(us){let Pe=us.dataset.rollParent;Pe&&(Ee.has(Pe)?Ee.delete(Pe):Ee.add(Pe),_());return}let ds=k?.closest?.(".rtile .board-card__roll-child");if(ds){let Pe=ds.dataset.childId;Pe&&i&&i(Pe);return}let fo=k?.closest?.(".rtile");if(fo){if(k?.closest?.(".rtile__id")){let je=fo.dataset.beadId;je&&sn(je).then(b=>{b?we("\uBCF5\uC0AC\uB428","success",1200):we("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}let Pe=fo.dataset.beadId;Pe&&i&&i(Pe);return}let ps=k?.closest?.(".worker-mini, .worker-card");if(ps){let Pe=ps.dataset.beadId;if(k?.closest?.('[data-seam="log-path-copy"]'))return;if(k?.closest?.(".worker-mini__id, .worker-card__id")){Pe&&sn(Pe).then(b=>{b?we("\uBCF5\uC0AC\uB428","success",1200):we("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}let je=k?.closest?.(".ctl-chip--from");if(je){let b=je.dataset.fromId;b&&i&&i(b);return}Pe&&i&&i(Pe)}}I.attach(e),e.addEventListener("click",et),e.addEventListener("change",Xe);function _t(v){let k=v.target,O=k&&typeof k.closest=="function"?pe=>k.closest(pe):()=>null;C&&!O(".rtile__failure-pop, .rtile__failure-badge")&&(C=null,_())}function qt(v){v.key!=="Escape"||C===null||(C=null,_())}return document.addEventListener("click",_t),document.addEventListener("keydown",qt),F.attach(),D.push(()=>{document.removeEventListener("click",_t),document.removeEventListener("keydown",qt),F.detach()}),S(),g&&D.push(g.subscribe(()=>{be.notifyIssuesChanged(),_()})),o&&D.push(o.subscribe(()=>{let v=l&&l()||"";v!==ge&&(ge=v,Ae.close()),_(),Le()})),_(),{load(){be.ensureSessionDefaults(),_()},refreshSessionDefaults:Se,destroy(){for(let v of D.splice(0))try{v()}catch{}I.detach(),e.removeEventListener("click",et),e.removeEventListener("change",Xe),be.destroy();try{ne.destroy()}catch{}me.hidden=!0;try{Ae.destroy()}catch{}st(c``,e)}}}function Rl(e){if(!e)return"Unknown";let t=e.split("/").filter(Boolean);return t.length>0?t[t.length-1]:"Unknown"}function zf(e,t,n,r=async()=>{},o=async()=>{}){let s=Ot("views:workspace-picker"),i=null,l=!1,a=!1,u=!1;async function d(L){let Y=L.target.value,P=t.getState().workspace?.current?.path||"";if(Y&&Y!==P){s("switching workspace to %s",Y),l=!0,R();try{await n(Y)}catch(H){s("workspace switch failed: %o",H)}finally{l=!1,R()}}}async function f(){let L=t.getState(),B=L.workspace?.current?.path||L.workspace?.available?.[0]?.path||"";if(!(!B||a)){s("git-pulling workspace %s",B),a=!0,R();try{await r(B)}catch(Y){s("workspace git pull failed: %o",Y)}finally{a=!1,R()}}}function g(L){let B=L.target;B&&e.contains(B)||C()}function m(L){L.key==="Escape"&&C()}function w(){u||(u=!0,document.addEventListener("mousedown",g),document.addEventListener("keydown",m),R())}function C(){u&&(u=!1,document.removeEventListener("mousedown",g),document.removeEventListener("keydown",m),R())}function F(){u?C():w()}async function V(L){let B=L.target,Y=B.value,Q=B.checked;s("toggling visibility %s \u2192 %s",Y,String(Q));try{await o(Y,Q)}catch(P){s("workspace visibility toggle failed: %o",P)}}function se(L){return L?c`
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
    `:c``}function j(L,B){return c`
      <div class="workspace-picker__manage">
        <button
          type="button"
          class="workspace-picker__manage-button"
          @click=${F}
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
                        .checked=${!B.has(Y.path)}
                        @change=${V}
                      />
                      <span class="workspace-picker__manage-name"
                        >${Rl(Y.path)}</span
                      >
                    </label>
                  `)}
              </div>
            `:""}
      </div>
    `}function N(){let L=t.getState(),B=L.workspace?.current,Y=L.workspace?.available||[],Q=new Set(L.workspace?.hidden||[]),P=B?.path||Y[0]?.path||"";if(Y.length===0)return c``;let H=Y.filter(G=>!Q.has(G.path)||G.path===P);if(H.length<=1){let G=H[0]||Y[0],te=Rl(G.path);return c`
        <div class="workspace-picker workspace-picker--single">
          <span class="workspace-picker__label" title="${G.path}"
            >${te}</span
          >
          ${j(Y,Q)}
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
          @change=${d}
          ?disabled=${l||a}
          aria-label="Select project workspace"
        >
          ${H.map(G=>c`
              <option
                value="${G.path}"
                ?selected=${G.path===P}
                title="${G.path}"
              >
                ${Rl(G.path)}
              </option>
            `)}
        </select>
        ${j(Y,Q)}
        ${se(P)}
        ${l||a?c`<span
              class="workspace-picker__loading"
              aria-hidden="true"
            ></span>`:""}
      </div>
    `}function R(){st(N(),e)}return R(),i=t.subscribe(()=>R()),{destroy(){i&&(i(),i=null),document.removeEventListener("mousedown",g),document.removeEventListener("keydown",m),st(c``,e)}}}var Hf=["update-status","edit-text","update-priority","create-issue","dep-add","dep-remove","update-assignee","update-exec-settings","update-impl-target","get-session-defaults","set-session-defaults","get-workspace-accounts","set-workspace-accounts","update-workflow-meta","label-add","label-remove","subscribe-list","unsubscribe-list","snapshot","upsert","delete","get-comments","add-comment","delete-issue","list-workspaces","set-workspace","set-workspace-visibility","get-workspace","workspace-changed","git-pull-workspace","subscribe-worker-queue","unsubscribe-worker-queue","worker-queue-snapshot","worker-queue-place","worker-queue-reorder","worker-queue-toggle","worker-automation-toggle","worker-repo-ops-opt-out-toggle","worker-repo-operation-dismiss","worker-repo-operation-deploy-run","worker-queue-set-slots","worker-queue-set-serial-lane-count","worker-queue-set-orchestration-defaults","worker-queue-remove","worker-attempt-pause","worker-attempt-stop","worker-attempt-resume","worker-cleanup-retry","worker-resolve-in-session","worker-parked-retry","worker-queue-hold-resume","worker-queue-hold-retry-now","worker-merge-queue-add","worker-merge-queue-add-all","worker-merge-auto-toggle","worker-merge-queue-remove","worker-discard","worker-stale-work-continue","worker-stale-work-backup-fresh","worker-stale-work-recheck","worker-pr-discard","worker-revise-fix","worker-revise-approve","subscribe-ui-order","unsubscribe-ui-order","ui-order-set","ui-order-snapshot","subscribe-display-policy","unsubscribe-display-policy","display-policy-set","display-policy-snapshot","subscribe-session-log","unsubscribe-session-log","session-log-snapshot","session-log-append","get-attempt-prompt","get-bead-prompt","get-bead-timeline","get-worker-system-prompt","get-session-refs","subscribe-monitor-pipeline","unsubscribe-monitor-pipeline","monitor-pipeline-snapshot","subscribe-impl-presets","unsubscribe-impl-presets","impl-presets-snapshot","impl-preset-create","impl-preset-update","impl-preset-delete","apply-impl-preset","apply-impl-preset-global","monitor-auto-toggle","monitor-lane-create","monitor-lane-update","monitor-lane-confirm","monitor-lane-remove"];function Ol(){let e=Date.now().toString(36),t=Math.random().toString(36).slice(2,8);return`${e}-${t}`}function Gf(e,t,n=Ol()){return{id:n,type:e,payload:t}}function Kf(e={}){let t=Ot("ws"),n={initialMs:e.backoff?.initialMs??1e3,maxMs:e.backoff?.maxMs??3e4,factor:e.backoff?.factor??2,jitterRatio:e.backoff?.jitterRatio??.2},r=()=>e.url&&e.url.length>0?e.url:typeof location<"u"?(location.protocol==="https:"?"wss://":"ws://")+location.host+"/ws":"ws://localhost/ws",o=null,s="closed",i=0,l=null,a=!0,u=new Map,d=[],f=new Map,g=new Set;function m(N){for(let R of Array.from(g))try{R(N)}catch{}}function w(){if(!a||l)return;s="reconnecting",t("ws reconnecting\u2026"),m(s);let N=Math.min(n.maxMs||0,(n.initialMs||0)*Math.pow(n.factor||1,i)),R=(n.jitterRatio||0)*N,L=Math.max(0,Math.round(N+(Math.random()*2-1)*R));t("ws retry in %d ms (attempt %d)",L,i+1),l=setTimeout(()=>{l=null,j()},L)}function C(N){try{o?.send(JSON.stringify(N))}catch(R){t("ws send failed",R)}}function F(){for(s="open",t("ws open"),m(s),i=0;d.length;){let N=d.shift();N&&C(N)}}function V(N){let R;try{R=JSON.parse(String(N.data))}catch{t("ws received non-JSON message");return}if(!R||typeof R.id!="string"||typeof R.type!="string"){t("ws received invalid envelope");return}if(u.has(R.id)){let B=u.get(R.id);u.delete(R.id),R.ok?B?.resolve(R.payload):B?.reject(R.error||new Error("ws error"));return}let L=f.get(R.type);if(L&&L.size>0)for(let B of Array.from(L))try{B(R.payload)}catch(Y){t("ws event handler error",Y)}else t("ws received unhandled message type: %s",R.type)}function se(){s="closed",t("ws closed"),m(s);for(let[N,R]of u.entries())R.reject(new Error("ws disconnected")),u.delete(N);i+=1,w()}function j(){if(!a)return;let N=r();try{o=new WebSocket(N),t("ws connecting %s",N),s="connecting",m(s),o.addEventListener("open",F),o.addEventListener("message",V),o.addEventListener("error",()=>{}),o.addEventListener("close",se)}catch(R){t("ws connect failed %o",R),w()}}return j(),{send(N,R){if(!Hf.includes(N))return Promise.reject(new Error(`unknown message type: ${N}`));let L=Ol(),B=Gf(N,R,L);return t("send %s id=%s",N,L),new Promise((Y,Q)=>{u.set(L,{resolve:Y,reject:Q,type:N}),o&&o.readyState===o.OPEN?C(B):(t("queue %s id=%s (state=%s)",N,L,s),d.push(B))})},on(N,R){f.has(N)||f.set(N,new Set);let L=f.get(N);return L?.add(R),()=>{L?.delete(R)}},onConnection(N){return g.add(N),()=>{g.delete(N)}},reconnect(){a=!0,l&&(clearTimeout(l),l=null),i=0,j()},close(){a=!1,l&&(clearTimeout(l),l=null);try{o?.close()}catch{}},getState(){return s}}}function ow(){let e=window.__BDUI_BOOTSTRAP__;return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:null}}}async function sw(e,t){try{let r=await(await fetch("/api/config")).json();e.setState({config:r})}catch(n){t("config refresh failed",n)}}var Il=[["tab:board:ready","ready-issues"],["tab:board:blocked","blocked-issues"],["tab:board:in-progress","in-progress-issues"],["tab:board:resolved","resolved-issues"],["tab:board:deferred","deferred-issues"],["tab:board:closed","closed-issues"]],Yf=[["tab:worker:ready","ready-issues"],["tab:worker:blocked","blocked-issues"],["tab:worker:in-progress","in-progress-issues"],["tab:worker:resolved","resolved-issues"],["tab:worker:closed","closed-issues"]],pr="tab:worker:closed",iw="bdui.worker.done-range",Vf=Hp,Xf="worker:queue",Qf="ui:order",Zf="ui:display-policy",Jf="exec:presets",fr="tab:board:closed",e_="beads-ui.board.closed-range";function aw(e){if(!e)return()=>{};function t(r){document.documentElement.style.setProperty("--app-header-h",`${Math.round(r)}px`)}if(t(e.getBoundingClientRect().height),typeof ResizeObserver!="function")return()=>{};let n=new ResizeObserver(r=>{for(let o of r)t(o.contentRect.height+lw(e))});return n.observe(e),()=>n.disconnect()}function lw(e){let t=getComputedStyle(e);return[t.paddingTop,t.paddingBottom,t.borderTopWidth,t.borderBottomWidth].reduce((r,o)=>r+(parseFloat(o)||0),0)}function cw(e){let t=Ot("main");t("bootstrap start"),aw(document.querySelector(".app-header"));let n=c`
    <section id="board-root" class="route board"></section>
    <section id="worker-root" class="route worker" hidden></section>
    <section id="monitor-root" class="route monitor" hidden></section>
    <section id="detail-panel" class="route detail" hidden></section>
  `;st(n,e);let r=document.getElementById("global-nav"),o=document.getElementById("top-nav"),s=document.getElementById("repo-scope"),i=document.getElementById("usage-meter"),l=document.getElementById("board-root"),a=document.getElementById("worker-root"),u=document.getElementById("monitor-root"),d=document.getElementById("detail-panel");if(i&&pf(i),l&&a&&u&&d){let me=function(x,A){let Le="Request failed",We="";if(x&&typeof x=="object"){let _t=x;if(typeof _t.message=="string"&&_t.message.length>0&&(Le=_t.message),typeof _t.details=="string")We=_t.details;else if(_t.details&&typeof _t.details=="object")try{We=JSON.stringify(_t.details,null,2)}catch{We=""}}else typeof x=="string"&&x.length>0&&(Le=x);let et=A&&A.length>0?`Failed to load ${A}`:"Request failed";ee.open(et,Le,We)},Te=function(x){return`${fe.getState().workspace.current?.path||""}\0${x}`},He=function(){Ae&&(Ae().catch(()=>{}),Ae=null),ge=null,Ne=null},y=function(x){qe=x;let A=()=>{qe!==x||fe.getState().selected_id!==x||(qe=null,at(x))};if(!Z){Fe.then(A);return}A()},Ue=function(x,A,Le,We,et){return Le!==Ie[A]?(et().catch(()=>{}),!1):(x.set(We,et),!0)},pt=function(){let x=fe.getState();ct(x.view==="board"),$(x.view==="worker"),Ve(Be(x)),J(x.view==="board"||x.view==="worker"||Ke||!!x.selected_id)},Mt=function(){let x=wr(Et);return x===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:x}}},mt=function(){let x=wr(It);return x===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:x}}},ct=function(x){if(x)for(let[A,Le]of Il){if(U.has(A)||Oe.has(A))continue;let We=A===fr?Mt():{type:Le};try{Re.register(A,We)}catch(qt){t("register %s store failed: %o",A,qt)}Oe.add(A);let et=Ie.board,_t=!1;_e.subscribeList(A,We).then(qt=>{_t=!Ue(U,"board",et,A,qt)}).catch(qt=>{t("subscribe %s failed: %o",A,qt),me(qt,"board")}).finally(()=>{Oe.delete(A),_t&&pt()})}else Lt()},Lt=function(){Ie.board+=1;for(let[x]of Il){let A=U.get(x);A&&(A().catch(()=>{}),U.delete(x));try{Re.unregister(x)}catch(Le){t("unregister %s failed: %o",x,Le)}}},$=function(x){if(!x){q();return}for(let[A,Le]of Yf){if(ae.has(A)||Oe.has(A))continue;let We=A===pr?mt():{type:Le};try{Re.register(A,We)}catch(qt){t("register %s store failed: %o",A,qt)}Oe.add(A);let et=Ie.worker,_t=!1;_e.subscribeList(A,We).then(qt=>{_t=!Ue(ae,"worker",et,A,qt)}).catch(qt=>{t("subscribe %s failed: %o",A,qt),me(qt,"worker")}).finally(()=>{Oe.delete(A),_t&&pt()})}},q=function(){Ie.worker+=1;for(let[x]of Yf){let A=ae.get(x);A&&(A().catch(()=>{}),ae.delete(x));try{Re.unregister(x)}catch(Le){t("unregister %s failed: %o",x,Le)}}},J=function(x){if(!x){re();return}ie||(Ce("subscribe-worker-queue",{id:Xf}).catch(A=>{t("subscribe-worker-queue failed: %o",A)}),ie=()=>Ce("unsubscribe-worker-queue",{id:Xf}))},re=function(){ie&&(ie().catch(()=>{}),ie=null)},Be=function(x){return x.view==="monitor"||x.selected_id!=null},Ve=function(x){if(!x){tt();return}le||(Ce("subscribe-monitor-pipeline",{id:Vf}).catch(A=>{t("subscribe-monitor-pipeline failed: %o",A)}),le=()=>Ce("unsubscribe-monitor-pipeline",{id:Vf}))},tt=function(){le&&(le().catch(()=>{}),le=null)},xt=function(){ze||(Ce("subscribe-ui-order",{id:Qf}).catch(x=>{t("subscribe-ui-order failed: %o",x)}),ze=()=>Ce("unsubscribe-ui-order",{id:Qf}))},Nt=function(){ze&&(ze().catch(()=>{}),ze=null),I.clear()},Zt=function(){At||(Ce("subscribe-display-policy",{id:Zf}).catch(x=>{t("subscribe-display-policy failed: %o",x)}),At=()=>Ce("unsubscribe-display-policy",{id:Zf}))},vt=function(){At&&(At().catch(()=>{}),At=null),ue.clear()},Wt=function(){Rt||(Ce("subscribe-impl-presets",{id:Jf}).catch(x=>{t("subscribe-impl-presets failed: %o",x)}),Rt=()=>Ce("unsubscribe-impl-presets",{id:Jf}))},Ft=function(x){if(!x)return"Unknown";let A=x.split("/").filter(Boolean);return A.length>0?A[A.length-1]:"Unknown"},K=function(x,A){z.open(x.path,{missing_state:x.missing_state,...A?{workspace:A}:{}})};var f=me,g=Te,m=He,w=y,C=Ue,F=pt,V=Mt,se=mt,j=ct,N=Lt,R=$,L=q,B=J,Y=re,Q=Be,P=Ve,H=tt,G=xt,te=Nt,ke=Zt,Ee=vt,oe=Wt,D=Ft,be=K;let Se=document.getElementById("header-loading"),T=kc(Se),ee=bp(e),ve=Kf(),Ce=T.wrapSend((x,A)=>ve.send(x,A)),_e=mc(Ce),Re=gc(),Ye=bc(),it=Yl(),I=hc(),ue=Gl(),ne=Kl(),de=Vl();ve.on("impl-presets-snapshot",x=>{let A=x;A&&typeof A.revision=="number"&&Array.isArray(A.presets)&&ne.set({revision:A.revision,presets:A.presets})}),ve.on("monitor-pipeline-snapshot",x=>{let A=x;if(!(!A||!Array.isArray(A.workspaces)))try{it.set(A.workspaces,A.workspaces_state,A.cross_lanes)}catch{}}),ve.on("ui-order-snapshot",x=>{let A=x;if(A&&typeof A.revision=="number")try{I.set({revision:A.revision,order:A.order&&typeof A.order=="object"?A.order:{}})}catch{}}),ve.on("display-policy-snapshot",x=>{let A=x;if(A&&A.policy&&typeof A.policy=="object")try{ue.set(A.policy)}catch{}}),ve.on("session-log-snapshot",x=>{let A=x;if(A&&typeof A.id=="string")try{de.set(A.id,Array.isArray(A.lines)?A.lines:[],typeof A.last_event_at=="number"?A.last_event_at:null)}catch{}}),ve.on("session-log-append",x=>{let A=x;if(A&&typeof A.id=="string")try{de.append(A.id,A.event)}catch{}}),ve.on("snapshot",x=>{let A=x,Le=A&&typeof A.id=="string"?A.id:"",We=Le?Re.getStore(Le):null;if(We&&A&&A.type==="snapshot")try{We.applyPush(A)}catch{}}),ve.on("upsert",x=>{let A=x,Le=A&&typeof A.id=="string"?A.id:"",We=Le?Re.getStore(Le):null;if(We&&A&&A.type==="upsert")try{We.applyPush(A)}catch{}}),ve.on("delete",x=>{let A=x,Le=A&&typeof A.id=="string"?A.id:"",We=Le?Re.getStore(Le):null;if(We&&A&&A.type==="delete")try{We.applyPush(A)}catch{}});let Ae=null,ge=null,Ne=null,qe=null,Ze=()=>{},Fe=new Promise(x=>{Ze=()=>x(void 0)}),Z=!1,X=!1;async function at(x){let A=Te(x);if(A===ge||A===Ne)return;Ne=A;let Le=`detail:${x}`,We={type:"issue-detail",params:{id:x}};try{Re.register(Le,We)}catch(et){t("register detail store failed: %o",et)}try{let et=await _e.subscribeList(Le,We);if(fe.getState().selected_id!==x||Te(x)!==A){await et().catch(()=>{});return}Ae&&await Ae().catch(()=>{}),Ae=et,ge=A}catch(et){t("detail subscribe failed: %o",et),me(et,"issue details")}finally{Ne===A&&(Ne=null)}}let U=new Map,Oe=new Set,Ie={board:0,worker:0},Ke=!1,Et=ys;try{let x=window.localStorage.getItem(e_);Qi(x)&&(Et=x)}catch{}let It="today";try{let x=window.localStorage.getItem(iw);x!==null&&(It=Dn(x))}catch{}async function $t(x){if(!Qi(x)||x===Et)return;Et=x;try{window.localStorage.setItem(e_,x)}catch{}let A=U.get(fr);if(!A)return;U.delete(fr),await A().catch(()=>{});let Le=Mt();try{Re.register(fr,Le)}catch(We){t("register %s store failed: %o",fr,We)}try{let We=await _e.subscribeList(fr,Le);U.set(fr,We)}catch(We){t("re-subscribe %s failed: %o",fr,We),me(We,"board")}}async function Ct(x){let A=Dn(x);if(A===It)return;It=A;let Le=ae.get(pr);if(!Le)return;ae.delete(pr),await Le().catch(()=>{});let We=mt();try{Re.register(pr,We)}catch(et){t("register %s store failed: %o",pr,et)}try{let et=await _e.subscribeList(pr,We);ae.set(pr,et)}catch(et){t("re-subscribe %s failed: %o",pr,et),me(et,"worker")}}let ae=new Map,ie=null,le=null,ze=null,At=null,Rt=null;async function ut(){At=null,ue.clear(),Rt=null,ne.clear(),ie=null,le=null,U.clear(),ae.clear(),Ie.board+=1,Ie.worker+=1,Wt();let x=fe.getState().workspace.current?.path;if(x)try{await ve.send("set-workspace",{path:x})}catch(Le){t("workspace restore after reconnect failed: %o",Le);return}Zt();let A=fe.getState();ct(A.view==="board"),$(A.view==="worker"),Ve(Be(A)),J(A.view==="board"||A.view==="worker"||!!A.selected_id)}async function Kt(){t("clearing all subscriptions for workspace switch"),Lt(),q(),re(),Ye.clear(),Nt(),xt(),vt(),Zt(),He();let x=fe.getState();if(x.selected_id)try{Re.unregister(`detail:${x.selected_id}`)}catch{}let A=fe.getState();ct(A.view==="board"),$(A.view==="worker"),Ve(Be(A)),J(A.view==="board"||A.view==="worker"||!!A.selected_id),A.selected_id&&y(A.selected_id)}async function Yt(x){t("requesting workspace switch to %s",x),X=!0;try{let A=await ve.send("set-workspace",{path:x});t("workspace switch result: %o",A),A&&A.workspace&&(fe.setState({workspace:{current:{path:A.workspace.root_dir,database:A.workspace.db_path}}}),window.localStorage.setItem("beads-ui.workspace",x),A.changed&&(await Kt(),we("Switched to "+Ft(x),"success",2e3)))}catch(A){throw t("workspace switch failed: %o",A),we("Failed to switch workspace","error",3e3),A}finally{X=!1}}async function zt(x){t("requesting workspace git pull for %s",x);try{let A=await ve.send("git-pull-workspace",{});t("workspace git pull result: %o",A);let Le=A?.status;if(Le==="up_to_date"){we("Already up to date","success",2e3);return}if(Le==="stash_pop_conflict"){we("Git pulled, but stash pop conflicted (check git stash list)","warning",4e3);return}we("Git pulled "+Ft(x),"success",2e3)}catch(A){t("workspace git pull failed: %o",A);let Le=A?.code,We=A?.message;if(Le==="rebase_conflict"){we("Git pull conflicts \u2014 reverted (manual resolve required)","error",4e3);return}if(Le==="rebase_conflict_abort_failed"){we("Git pull conflicts AND rebase --abort failed \u2014 repo left mid-rebase, run 'git rebase --abort' manually","error",6e3);return}if(Le==="busy"){we("Git pull skipped: another operation is running","warning",3e3);return}let et=We?`: ${We}`:"";throw we(`Git pull failed${et}`,"error",3e3),A}}async function _n(x,A){t("setting workspace visibility %s \u2192 %s",x,String(A));try{await ve.send("set-workspace-visibility",{path:x,visible:A}),await Jt()}catch(Le){t("workspace visibility update failed: %o",Le),we("Failed to update project visibility","error",3e3)}}async function Jt(){try{let x=await ve.send("list-workspaces",{});if(t("workspaces loaded: %o",x),x&&Array.isArray(x.workspaces)){let A=x.workspaces.map(_t=>({path:_t.path,database:_t.database,pid:_t.pid,version:_t.version})),Le=x.current?{path:x.current.root_dir,database:x.current.db_path}:null,We=Array.isArray(x.hidden)?x.hidden.filter(_t=>typeof _t=="string"):[];fe.setState({workspace:{current:Le,available:A,hidden:We}});let et=window.localStorage.getItem("beads-ui.workspace");et&&(!A.some(qt=>qt.path===et)||We.includes(et)?window.localStorage.removeItem("beads-ui.workspace"):Le&&et!==Le.path&&(t("restoring saved workspace preference: %s",et),await Yt(et)))}}catch(x){t("failed to load workspaces: %o",x)}}ve.on("workspace-changed",x=>{t("workspace-changed event: %o",x),x&&x.root_dir&&(fe.setState({workspace:{current:{path:x.root_dir,database:x.db_path}}}),Jt(),Kt())});let Ht=!1;if(typeof ve.onConnection=="function"){let x=A=>{t("ws state %s",A),A==="reconnecting"||A==="closed"?(Ht=!0,we("Connection lost. Reconnecting\u2026","error",4e3)):A==="open"&&Ht&&(Ht=!1,we("Reconnected","success",2200),sw(fe,(Le,We)=>{t(`${Le}: %o`,We)}),ut())};ve.onConnection(x)}let en="board";try{let x=window.localStorage.getItem("beads-ui.view");(x==="board"||x==="worker"||x==="monitor")&&(en=x)}catch(x){t("view parse error: %o",x)}let fe=wc({config:ow(),view:en});ve.on("worker-queue-snapshot",x=>{let A=x;if(!A||!A.queue)return;let Le=fe.getState().workspace.current?.path;if(typeof Le=="string"&&Le.length>0&&A.root_dir!==Le){t("dropping worker-queue snapshot for %s",String(A.root_dir));return}try{Ye.set(A.queue)}catch{}});let E=yc(fe);E.start();let he=new Set(["get-comments","dep-add","dep-remove","impl-preset-create","impl-preset-update","impl-preset-delete","apply-impl-preset","apply-impl-preset-global","get-session-defaults","set-session-defaults","monitor-lane-create","monitor-lane-update","monitor-lane-confirm","monitor-lane-remove"]),De=async(x,A)=>{try{return await Ce(x,A)}catch(Le){if(he.has(x))throw Le;return[]}};Kp({global_element:r,repo_element:o},fe,E);let h=document.getElementById("workspace-picker");h&&zf(h,fe,Yt,zt,_n);let p=Qp(e,(x,A)=>Ce(x,A));try{let x=document.getElementById("new-issue-btn");x&&x.addEventListener("click",()=>p.open())}catch{}let _=tf(e,{policyStore:ue,queueStore:Ye,implPresetStore:ne,transport:(x,A)=>Ce(x,A),onOpenChange:x=>{let A=Ke;Ke=x,pt(),A&&x===!1&&xe.refreshSessionDefaults()},labelOptions:()=>{let x=new Set;for(let[A]of Il)for(let Le of Re.snapshotFor(A)||[]){let We=Le.labels;if(Array.isArray(We))for(let et of We)typeof et=="string"&&et.length>0&&x.add(et)}return Array.from(x).sort()}});try{let x=document.getElementById("display-settings-btn");x&&(x.setAttribute("aria-label","\uC124\uC815"),x.setAttribute("title","\uC124\uC815"),x.addEventListener("click",()=>_.open()))}catch{}let S=document.createElement("div");S.className="md-viewer-root",document.body.appendChild(S);let z=Oi(S,{getWorkspacePath:()=>fe.getState().workspace.current?.path}),ce=qc(l,{gotoIssue:x=>E.gotoIssue(x),issueStores:Re,transport:De,workerQueueStore:Ye,uiOrderStore:I,displayPolicyStore:ue,closedRange:Et,onClosedRangeChange:x=>{$t(x)},onNewIssue:()=>p.open(),openDoc:K}),xe=Cl(a,{transport:De,issueStores:Re,queueStore:Ye,sessionLogStore:de,gotoIssue:x=>fe.setState({selected_id:x}),getWorkspacePath:()=>fe.getState().workspace.current?.path,switchWorkspace:x=>Yt(x),openDoc:K,doneRange:It,onDoneRangeChange:x=>{Ct(x)}}),Xe=Gp(u,{transport:De,pipelineStore:it,execPresetStore:ne,sessionLogStore:de,router:E,gotoIssue:x=>E.gotoIssue(x),getWorkspacePath:()=>fe.getState().workspace.current?.path,switchWorkspace:x=>Yt(x),openDoc:K}),ot=hp(d,{issueStores:Re,transport:De,queueStore:Ye,execPresetStore:ne,sessionLogStore:de,getWorkspacePath:()=>fe.getState().workspace.current?.path,mdViewer:z,depCandidates:()=>{let x=it.get();if(x===null)return null;let A=it.getWorkspacesState(),Le=fe.getState();if(Le.view==="monitor")return Ua(x,A);let We=Le.workspace.current?.path;return We?Ua(x,A,{root_dir:We}):null},subscribeCandidates:x=>it.subscribe(x),onDepChanged:({type:x,a:A,b:Le})=>{let We=Xe;x==="dep-add"&&We&&typeof We.recorrectSharedLane=="function"&&We.recorrectSharedLane(x,A,Le)},onNavigate:(x,A)=>{let Le=()=>{fe.getState().view==="worker"?fe.setState({selected_id:x}):E.gotoIssue(x)},We=fe.getState().workspace.current?.path;if(typeof A!="string"||A.length===0||!We||A===We){Le();return}Promise.resolve(Yt(A)).then(Le).catch(()=>{we("\uB808\uD3EC \uC804\uD658\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error",2400)})},onClose:()=>{let x=fe.getState();fe.setState({selected_id:null});try{E.gotoView(x.view==="worker"||x.view==="monitor"?x.view:"board")}catch{}},onOpenExecPresets:()=>{_.open("execution")}}),ht=fe.getState().selected_id;ht&&(d.hidden=!1,ot.load(ht),y(ht)),fe.subscribe(x=>{let A=x.selected_id;A?(d.hidden=!1,ot.load(A),X||y(A)):(ot.clear(),d.hidden=!0,He())});let gt=x=>{l.hidden=x.view!=="board",a.hidden=x.view!=="worker",u.hidden=x.view!=="monitor",s&&s.classList.toggle("is-quiet",x.view==="monitor"),ct(x.view==="board"),$(x.view==="worker"),Ve(Be(x)),J(x.view==="board"||x.view==="worker"||Ke||!!x.selected_id),!x.selected_id&&x.view==="board"&&ce.load(),x.view==="worker"&&xe.load(),x.view==="monitor"?Xe.load():Xe.pause(),window.localStorage.setItem("beads-ui.view",x.view)};fe.subscribe(gt),gt(fe.getState()),xt(),Zt(),Wt(),Jt().finally(()=>{Z=!0,Ze()}),window.addEventListener("keydown",x=>{let A=x.ctrlKey||x.metaKey,Le=String(x.key||"").toLowerCase(),We=x.target,et=We&&We.tagName?String(We.tagName).toLowerCase():"",_t=et==="input"||et==="textarea"||et==="select"||We&&typeof We.isContentEditable=="boolean"&&We.isContentEditable;A&&Le==="n"&&(_t||(x.preventDefault(),p.open()))})}}typeof window<"u"&&typeof document<"u"&&window.addEventListener("DOMContentLoaded",()=>{try{let n=window.localStorage.getItem("beads-ui.theme"),r=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches,o=n==="dark"||n==="light"?n:r?"dark":"light";document.documentElement.setAttribute("data-theme",o);let s=document.getElementById("theme-switch");s&&(s.checked=o==="dark")}catch{}let e=document.getElementById("theme-switch");e&&e.addEventListener("change",()=>{let n=e.checked?"dark":"light";document.documentElement.setAttribute("data-theme",n),window.localStorage.setItem("beads-ui.theme",n)});let t=document.getElementById("app");t&&cw(t)});export{cw as bootstrap,ow as readBootstrapConfig,sw as refreshConfigSnapshot};
//# sourceMappingURL=main.bundle.js.map
