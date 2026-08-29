var Xf=Object.create;var ji=Object.defineProperty;var Qf=Object.getOwnPropertyDescriptor;var Zf=Object.getOwnPropertyNames;var Jf=Object.getPrototypeOf,e_=Object.prototype.hasOwnProperty;var t_=(e,t,n)=>t in e?ji(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var Bi=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var n_=(e,t,n,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let o of Zf(t))!e_.call(e,o)&&o!==n&&ji(e,o,{get:()=>t[o],enumerable:!(r=Qf(t,o))||r.enumerable});return e};var r_=(e,t,n)=>(n=e!=null?Xf(Jf(e)):{},n_(t||!e||!e.__esModule?ji(n,"default",{value:e,enumerable:!0}):n,e));var At=(e,t,n)=>t_(e,typeof t!="symbol"?t+"":t,n);var Gl=Bi((aw,Hl)=>{var Pr=1e3,Dr=Pr*60,Nr=Dr*60,wr=Nr*24,i_=wr*7,a_=wr*365.25;Hl.exports=function(e,t){t=t||{};var n=typeof e;if(n==="string"&&e.length>0)return l_(e);if(n==="number"&&isFinite(e))return t.long?u_(e):c_(e);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(e))};function l_(e){if(e=String(e),!(e.length>100)){var t=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(e);if(t){var n=parseFloat(t[1]),r=(t[2]||"ms").toLowerCase();switch(r){case"years":case"year":case"yrs":case"yr":case"y":return n*a_;case"weeks":case"week":case"w":return n*i_;case"days":case"day":case"d":return n*wr;case"hours":case"hour":case"hrs":case"hr":case"h":return n*Nr;case"minutes":case"minute":case"mins":case"min":case"m":return n*Dr;case"seconds":case"second":case"secs":case"sec":case"s":return n*Pr;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return n;default:return}}}}function c_(e){var t=Math.abs(e);return t>=wr?Math.round(e/wr)+"d":t>=Nr?Math.round(e/Nr)+"h":t>=Dr?Math.round(e/Dr)+"m":t>=Pr?Math.round(e/Pr)+"s":e+"ms"}function u_(e){var t=Math.abs(e);return t>=wr?_s(e,t,wr,"day"):t>=Nr?_s(e,t,Nr,"hour"):t>=Dr?_s(e,t,Dr,"minute"):t>=Pr?_s(e,t,Pr,"second"):e+" ms"}function _s(e,t,n,r){var o=t>=n*1.5;return Math.round(e/n)+" "+r+(o?"s":"")}});var Yl=Bi((lw,Kl)=>{function d_(e){n.debug=n,n.default=n,n.coerce=a,n.disable=i,n.enable=o,n.enabled=l,n.humanize=Gl(),n.destroy=u,Object.keys(e).forEach(d=>{n[d]=e[d]}),n.names=[],n.skips=[],n.formatters={};function t(d){let f=0;for(let g=0;g<d.length;g++)f=(f<<5)-f+d.charCodeAt(g),f|=0;return n.colors[Math.abs(f)%n.colors.length]}n.selectColor=t;function n(d){let f,g=null,m,k;function R(...z){if(!R.enabled)return;let X=R,ee=Number(new Date),W=ee-(f||ee);X.diff=W,X.prev=f,X.curr=ee,f=ee,z[0]=n.coerce(z[0]),typeof z[0]!="string"&&z.unshift("%O");let q=0;z[0]=z[0].replace(/%([a-zA-Z%])/g,(I,F)=>{if(I==="%%")return"%";q++;let U=n.formatters[F];if(typeof U=="function"){let ue=z[q];I=U.call(X,ue),z.splice(q,1),q--}return I}),n.formatArgs.call(X,z),(X.log||n.log).apply(X,z)}return R.namespace=d,R.useColors=n.useColors(),R.color=n.selectColor(d),R.extend=r,R.destroy=n.destroy,Object.defineProperty(R,"enabled",{enumerable:!0,configurable:!1,get:()=>g!==null?g:(m!==n.namespaces&&(m=n.namespaces,k=n.enabled(d)),k),set:z=>{g=z}}),typeof n.init=="function"&&n.init(R),R}function r(d,f){let g=n(this.namespace+(typeof f>"u"?":":f)+d);return g.log=this.log,g}function o(d){n.save(d),n.namespaces=d,n.names=[],n.skips=[];let f=(typeof d=="string"?d:"").trim().replace(/\s+/g,",").split(",").filter(Boolean);for(let g of f)g[0]==="-"?n.skips.push(g.slice(1)):n.names.push(g)}function s(d,f){let g=0,m=0,k=-1,R=0;for(;g<d.length;)if(m<f.length&&(f[m]===d[g]||f[m]==="*"))f[m]==="*"?(k=m,R=g,m++):(g++,m++);else if(k!==-1)m=k+1,R++,g=R;else return!1;for(;m<f.length&&f[m]==="*";)m++;return m===f.length}function i(){let d=[...n.names,...n.skips.map(f=>"-"+f)].join(",");return n.enable(""),d}function l(d){for(let f of n.skips)if(s(d,f))return!1;for(let f of n.names)if(s(d,f))return!0;return!1}function a(d){return d instanceof Error?d.stack||d.message:d}function u(){console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")}return n.enable(n.load()),n}Kl.exports=d_});var Vl=Bi((pn,ms)=>{pn.formatArgs=f_;pn.save=__;pn.load=m_;pn.useColors=p_;pn.storage=g_();pn.destroy=(()=>{let e=!1;return()=>{e||(e=!0,console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."))}})();pn.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"];function p_(){if(typeof window<"u"&&window.process&&(window.process.type==="renderer"||window.process.__nwjs))return!0;if(typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))return!1;let e;return typeof document<"u"&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||typeof window<"u"&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||typeof navigator<"u"&&navigator.userAgent&&(e=navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/))&&parseInt(e[1],10)>=31||typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)}function f_(e){if(e[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+e[0]+(this.useColors?"%c ":" ")+"+"+ms.exports.humanize(this.diff),!this.useColors)return;let t="color: "+this.color;e.splice(1,0,t,"color: inherit");let n=0,r=0;e[0].replace(/%[a-zA-Z%]/g,o=>{o!=="%%"&&(n++,o==="%c"&&(r=n))}),e.splice(r,0,t)}pn.log=console.debug||console.log||(()=>{});function __(e){try{e?pn.storage.setItem("debug",e):pn.storage.removeItem("debug")}catch{}}function m_(){let e;try{e=pn.storage.getItem("debug")||pn.storage.getItem("DEBUG")}catch{}return!e&&typeof process<"u"&&"env"in process&&(e=process.env.DEBUG),e}function g_(){try{return localStorage}catch{}}ms.exports=Yl()(pn);var{formatters:h_}=ms.exports;h_.j=function(e){try{return JSON.stringify(e)}catch(t){return"[UnexpectedJSONParseError]: "+t.message}}});var po=globalThis,as=po.trustedTypes,Cl=as?as.createPolicy("lit-html",{createHTML:e=>e}):void 0,Wi="$lit$",Bn=`lit$${Math.random().toFixed(9).slice(2)}$`,zi="?"+Bn,o_=`<${zi}>`,hr=document,fo=()=>hr.createComment(""),_o=e=>e===null||typeof e!="object"&&typeof e!="function",Hi=Array.isArray,Pl=e=>Hi(e)||typeof e?.[Symbol.iterator]=="function",Ui=`[ 	
\f\r]`,uo=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Rl=/-->/g,Ol=/>/g,mr=RegExp(`>|${Ui}(?:([^\\s"'>=/]+)(${Ui}*=${Ui}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Ll=/'/g,Il=/"/g,Dl=/^(?:script|style|textarea|title)$/i,Gi=e=>(t,...n)=>({_$litType$:e,strings:t,values:n}),c=Gi(1),go=Gi(2),ew=Gi(3),yn=Symbol.for("lit-noChange"),Pt=Symbol.for("lit-nothing"),Ml=new WeakMap,gr=hr.createTreeWalker(hr,129);function Nl(e,t){if(!Hi(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return Cl!==void 0?Cl.createHTML(t):t}var ql=(e,t)=>{let n=e.length-1,r=[],o,s=t===2?"<svg>":t===3?"<math>":"",i=uo;for(let l=0;l<n;l++){let a=e[l],u,d,f=-1,g=0;for(;g<a.length&&(i.lastIndex=g,d=i.exec(a),d!==null);)g=i.lastIndex,i===uo?d[1]==="!--"?i=Rl:d[1]!==void 0?i=Ol:d[2]!==void 0?(Dl.test(d[2])&&(o=RegExp("</"+d[2],"g")),i=mr):d[3]!==void 0&&(i=mr):i===mr?d[0]===">"?(i=o??uo,f=-1):d[1]===void 0?f=-2:(f=i.lastIndex-d[2].length,u=d[1],i=d[3]===void 0?mr:d[3]==='"'?Il:Ll):i===Il||i===Ll?i=mr:i===Rl||i===Ol?i=uo:(i=mr,o=void 0);let m=i===mr&&e[l+1].startsWith("/>")?" ":"";s+=i===uo?a+o_:f>=0?(r.push(u),a.slice(0,f)+Wi+a.slice(f)+Bn+m):a+Bn+(f===-2?l:m)}return[Nl(e,s+(e[n]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),r]},mo=class e{constructor({strings:t,_$litType$:n},r){let o;this.parts=[];let s=0,i=0,l=t.length-1,a=this.parts,[u,d]=ql(t,n);if(this.el=e.createElement(u,r),gr.currentNode=this.el.content,n===2||n===3){let f=this.el.content.firstChild;f.replaceWith(...f.childNodes)}for(;(o=gr.nextNode())!==null&&a.length<l;){if(o.nodeType===1){if(o.hasAttributes())for(let f of o.getAttributeNames())if(f.endsWith(Wi)){let g=d[i++],m=o.getAttribute(f).split(Bn),k=/([.?@])?(.*)/.exec(g);a.push({type:1,index:s,name:k[2],strings:m,ctor:k[1]==="."?cs:k[1]==="?"?us:k[1]==="@"?ds:yr}),o.removeAttribute(f)}else f.startsWith(Bn)&&(a.push({type:6,index:s}),o.removeAttribute(f));if(Dl.test(o.tagName)){let f=o.textContent.split(Bn),g=f.length-1;if(g>0){o.textContent=as?as.emptyScript:"";for(let m=0;m<g;m++)o.append(f[m],fo()),gr.nextNode(),a.push({type:2,index:++s});o.append(f[g],fo())}}}else if(o.nodeType===8)if(o.data===zi)a.push({type:2,index:s});else{let f=-1;for(;(f=o.data.indexOf(Bn,f+1))!==-1;)a.push({type:7,index:s}),f+=Bn.length-1}s++}}static createElement(t,n){let r=hr.createElement("template");return r.innerHTML=t,r}};function br(e,t,n=e,r){if(t===yn)return t;let o=r!==void 0?n._$Co?.[r]:n._$Cl,s=_o(t)?void 0:t._$litDirective$;return o?.constructor!==s&&(o?._$AO?.(!1),s===void 0?o=void 0:(o=new s(e),o._$AT(e,n,r)),r!==void 0?(n._$Co??(n._$Co=[]))[r]=o:n._$Cl=o),o!==void 0&&(t=br(e,o._$AS(e,t.values),o,r)),t}var ls=class{constructor(t,n){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=n}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:n},parts:r}=this._$AD,o=(t?.creationScope??hr).importNode(n,!0);gr.currentNode=o;let s=gr.nextNode(),i=0,l=0,a=r[0];for(;a!==void 0;){if(i===a.index){let u;a.type===2?u=new Ir(s,s.nextSibling,this,t):a.type===1?u=new a.ctor(s,a.name,a.strings,this,t):a.type===6&&(u=new ps(s,this,t)),this._$AV.push(u),a=r[++l]}i!==a?.index&&(s=gr.nextNode(),i++)}return gr.currentNode=hr,o}p(t){let n=0;for(let r of this._$AV)r!==void 0&&(r.strings!==void 0?(r._$AI(t,r,n),n+=r.strings.length-2):r._$AI(t[n])),n++}},Ir=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,n,r,o){this.type=2,this._$AH=Pt,this._$AN=void 0,this._$AA=t,this._$AB=n,this._$AM=r,this.options=o,this._$Cv=o?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,n=this._$AM;return n!==void 0&&t?.nodeType===11&&(t=n.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,n=this){t=br(this,t,n),_o(t)?t===Pt||t==null||t===""?(this._$AH!==Pt&&this._$AR(),this._$AH=Pt):t!==this._$AH&&t!==yn&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Pl(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==Pt&&_o(this._$AH)?this._$AA.nextSibling.data=t:this.T(hr.createTextNode(t)),this._$AH=t}$(t){let{values:n,_$litType$:r}=t,o=typeof r=="number"?this._$AC(t):(r.el===void 0&&(r.el=mo.createElement(Nl(r.h,r.h[0]),this.options)),r);if(this._$AH?._$AD===o)this._$AH.p(n);else{let s=new ls(o,this),i=s.u(this.options);s.p(n),this.T(i),this._$AH=s}}_$AC(t){let n=Ml.get(t.strings);return n===void 0&&Ml.set(t.strings,n=new mo(t)),n}k(t){Hi(this._$AH)||(this._$AH=[],this._$AR());let n=this._$AH,r,o=0;for(let s of t)o===n.length?n.push(r=new e(this.O(fo()),this.O(fo()),this,this.options)):r=n[o],r._$AI(s),o++;o<n.length&&(this._$AR(r&&r._$AB.nextSibling,o),n.length=o)}_$AR(t=this._$AA.nextSibling,n){for(this._$AP?.(!1,!0,n);t!==this._$AB;){let r=t.nextSibling;t.remove(),t=r}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},yr=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,n,r,o,s){this.type=1,this._$AH=Pt,this._$AN=void 0,this.element=t,this.name=n,this._$AM=o,this.options=s,r.length>2||r[0]!==""||r[1]!==""?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=Pt}_$AI(t,n=this,r,o){let s=this.strings,i=!1;if(s===void 0)t=br(this,t,n,0),i=!_o(t)||t!==this._$AH&&t!==yn,i&&(this._$AH=t);else{let l=t,a,u;for(t=s[0],a=0;a<s.length-1;a++)u=br(this,l[r+a],n,a),u===yn&&(u=this._$AH[a]),i||(i=!_o(u)||u!==this._$AH[a]),u===Pt?t=Pt:t!==Pt&&(t+=(u??"")+s[a+1]),this._$AH[a]=u}i&&!o&&this.j(t)}j(t){t===Pt?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},cs=class extends yr{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===Pt?void 0:t}},us=class extends yr{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==Pt)}},ds=class extends yr{constructor(t,n,r,o,s){super(t,n,r,o,s),this.type=5}_$AI(t,n=this){if((t=br(this,t,n,0)??Pt)===yn)return;let r=this._$AH,o=t===Pt&&r!==Pt||t.capture!==r.capture||t.once!==r.once||t.passive!==r.passive,s=t!==Pt&&(r===Pt||o);o&&this.element.removeEventListener(this.name,this,r),s&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},ps=class{constructor(t,n,r){this.element=t,this.type=6,this._$AN=void 0,this._$AM=n,this.options=r}get _$AU(){return this._$AM._$AU}_$AI(t){br(this,t)}},Fl={M:Wi,P:Bn,A:zi,C:1,L:ql,R:ls,D:Pl,V:br,I:Ir,H:yr,N:us,U:ds,B:cs,F:ps},s_=po.litHtmlPolyfillSupport;s_?.(mo,Ir),(po.litHtmlVersions??(po.litHtmlVersions=[])).push("3.3.1");var rt=(e,t,n)=>{let r=n?.renderBefore??t,o=r._$litPart$;if(o===void 0){let s=n?.renderBefore??null;r._$litPart$=o=new Ir(t.insertBefore(fo(),s),s,void 0,n??{})}return o._$AI(e),o};var fs="today",jl=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"},{value:"30d",label:"\uCD5C\uADFC 30\uC77C"},{value:"all",label:"\uC804\uCCB4"}],Mr=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"}];function Mn(e){return e==="today"?"today":"7d"}function Ki(e){return e==="today"||e==="7d"||e==="30d"||e==="all"}function vr(e,t=Date.now()){switch(e){case"today":{let n=new Date(t);return n.setHours(0,0,0,0),n.getTime()}case"7d":return t-7*864e5;case"30d":return t-30*864e5;case"all":default:return}}function Bl(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function Ul(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function Wl(){let e=null,t=[],n,r=new Set;function o(){for(let s of Array.from(r))try{s()}catch{}}return{get(){return e},getWorkspacesState(){return t},crossLanes(){return n},set(s,i,l){e=Array.isArray(s)?s:null,t=Array.isArray(i)?i:[],n=l===void 0?void 0:l!==null&&typeof l=="object"&&typeof l.revision=="number"&&Array.isArray(l.lanes)?{revision:l.revision,lanes:l.lanes}:null,o()},clear(){e=null,t=[],n=void 0,o()},subscribe(s){return r.add(s),()=>r.delete(s)}}}function zl(){let e=new Map,t=new Set;function n(o){return o.startsWith("session-log:")?o:`session-log:${o}`}function r(){for(let o of Array.from(t))try{o()}catch{}}return{set(o,s,i=null){e.set(n(o),{lines:Array.isArray(s)?[...s]:[],last_event_at:typeof i=="number"?i:null}),r()},append(o,s){let i=n(o),l=e.get(i)||{lines:[],last_event_at:null};l.lines=[...l.lines,s],l.last_event_at=Date.now(),e.set(i,l),r()},get(o){return e.get(n(o))||null},clear(o){typeof o=="string"?e.delete(n(o)):e.clear(),r()},subscribe(o){return t.add(o),()=>t.delete(o)}}}var Xl=r_(Vl(),1);function Lt(e){return(0,Xl.default)(`beads-ui:${e}`)}function b_(e){let n=Ql((e&&typeof e=="object"?e:{}).spec_id);return n?{path:n,source:"native",conflict:!1}:{path:"",source:"none",conflict:!1}}function Ql(e){return typeof e=="string"?e.trim():""}function y_(e){let t=e&&typeof e=="object"?e:{};return t.metadata&&typeof t.metadata=="object"?t.metadata:{}}var v_=/^[A-Za-z0-9_.:-]+@[0-9a-fA-F]{40}$/;function qr(e){let t=b_(e),n=Ql(y_(e).spec_review),r=v_.test(n),o=r&&n.slice(0,n.indexOf("@"))==="skipped";return t.source==="none"?{...t,evidence:"none",skipped:o}:{...t,evidence:r?"published":"draft",skipped:o}}function $n(e){if(typeof e=="number")return Number.isFinite(e)?e:0;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:0}return 0}function ho(e,t){let n=$n(e.created_at),r=$n(t.created_at);if(n!==r)return n<r?1:-1;let o=e.priority??2,s=t.priority??2;if(o!==s)return o-s;let i=e.id,l=t.id;return i<l?-1:i>l?1:0}function rc(e,t){let n=$n(e.created_at),r=$n(t.created_at);if(n!==r)return n<r?-1:1;let o=e.priority??2,s=t.priority??2;if(o!==s)return o-s;let i=e.id,l=t.id;return i<l?-1:i>l?1:0}function oc(e,t){let n=$n(e.updated_at),r=$n(t.updated_at);if(n!==r)return n<r?1:-1;let o=e.id,s=t.id;return o<s?-1:o>s?1:0}function sc(e,t){let n=e.priority??2,r=t.priority??2;if(n!==r)return n-r;let o=$n(e.created_at),s=$n(t.created_at);if(o!==s)return o<s?1:-1;let i=e.id,l=t.id;return i<l?-1:i>l?1:0}function ic(e,t){let n=e.closed_at??0,r=t.closed_at??0;if(n!==r)return n<r?1:-1;let o=e?.id,s=t?.id;return o<s?-1:o>s?1:0}var gs=Object.freeze({priority:"asc",dependents:"desc",released:"desc",spec:"desc",created:"asc",updated:"desc"});function w_(e){return typeof e=="string"&&Object.prototype.hasOwnProperty.call(gs,e)}function Vi(e){if(!e||typeof e!="object")return!1;let t=e;return w_(t.key)&&(t.dir==="asc"||t.dir==="desc")}function Zl(e){if(typeof e=="number")return Number.isFinite(e)?e:null;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:null}return null}function Jl(e,t){switch(t){case"priority":{let n=e.priority;return typeof n=="number"&&Number.isFinite(n)?n:null}case"dependents":{let n=e.dependents_info?e.dependents_info.count:null;return typeof n=="number"&&Number.isFinite(n)?n:null}case"released":{let n=e.release_info?e.release_info.last_released_at:null;return typeof n=="number"&&Number.isFinite(n)?n:null}case"spec":return qr(e).evidence==="published"?1:0;case"created":return Zl(e.created_at);case"updated":return Zl(e.updated_at);default:return null}}function ec(e,t,n){let r=Jl(e,n.key),o=Jl(t,n.key);if(r===null||o===null)return r===o?0:r===null?1:-1;if(r===o)return 0;let s=r<o?-1:1;return n.dir==="desc"?-s:s}function ac(e){let t=Array.isArray(e)?e.filter(Vi):[];return(n,r)=>{for(let l of t){let a=ec(n,r,l);if(a!==0)return a}let o=ec(n,r,{key:"created",dir:"asc"});if(o!==0)return o;let s=n.id,i=r.id;return s<i?-1:s>i?1:0}}var k_=/^(?:[A-Za-z][A-Za-z0-9]*(?:-[A-Za-z0-9]+)+\s+)?(?:Task|Phase|T)\s*(\d+)/i;function tc(e){let t=e&&e.metadata,n=t?t.task_order:void 0;if(n==null||n==="")return Number.POSITIVE_INFINITY;let r=Number(n);return Number.isFinite(r)?r:Number.POSITIVE_INFINITY}function nc(e){let t=e&&e.title;if(typeof t!="string")return Number.POSITIVE_INFINITY;let n=k_.exec(t);if(!n)return Number.POSITIVE_INFINITY;let r=Number(n[1]);return Number.isFinite(r)?r:Number.POSITIVE_INFINITY}function lc(e,t){let n=tc(e),r=tc(t);if(n!==r)return n<r?-1:1;let o=nc(e),s=nc(t);if(o!==s)return o<s?-1:1;let i=$n(e&&e.created_at),l=$n(t&&t.created_at);if(i!==l)return i<l?-1:1;let a=e&&e.id,u=t&&t.id;return a===u?0:String(a)<String(u)?-1:1}var Yi=2**20;function Fr(e,t){let n=e&&e.id;return t&&typeof n=="string"&&Object.prototype.hasOwnProperty.call(t,n)&&typeof t[n]=="number"&&Number.isFinite(t[n])?t[n]:-$n(e&&e.created_at)}function cc(e){return(t,n)=>{let r=Fr(t,e),o=Fr(n,e);if(r!==o)return r<o?-1:1;let s=t?.id,i=n?.id;return s<i?-1:s>i?1:0}}function Xi(e,t,n){let r=Array.isArray(e)?e:[],o=r.length,s=Math.max(0,Math.min(t,o-1)),i=s-1>=0?r[s-1]:null,l=s+1<o?r[s+1]:null;if(!i&&!l)return{rank:0};if(!i)return{rank:Fr(l,n)-Yi};if(!l)return{rank:Fr(i,n)+Yi};let a=Fr(i,n),u=Fr(l,n),d=(a+u)/2;return a<d&&d<u?{rank:d}:{renormalize:r.map((f,g)=>({bead_id:f.id,rank:g*Yi}))}}function Qi(e,t={}){let n=Lt(`issue-store:${e}`),r=new Map,o=[],s=0,i=new Set,l=!1,a=t.sort||ho;function u(){for(let g of Array.from(i))try{g()}catch{}}function d(){o=Array.from(r.values()).sort(a)}function f(g){if(l||!g||g.id!==e)return;let m=Number(g.revision)||0;if(n("apply %s rev=%d",g.type,m),!(m<=s&&g.type!=="snapshot")){if(g.type==="snapshot"){if(m<=s)return;r.clear();let k=Array.isArray(g.issues)?g.issues:[];for(let R of k)R&&typeof R.id=="string"&&R.id.length>0&&r.set(R.id,R);d(),s=m,u();return}if(g.type==="upsert"){let k=g.issue;if(k&&typeof k.id=="string"&&k.id.length>0){let R=r.get(k.id);if(!R)r.set(k.id,k);else{let z=Number.isFinite(R.updated_at)?R.updated_at:0,X=Number.isFinite(k.updated_at)?k.updated_at:0;if(z<=X){for(let ee of Object.keys(R))ee in k||delete R[ee];for(let[ee,W]of Object.entries(k))R[ee]=W}}d()}s=m,u()}else if(g.type==="delete"){let k=String(g.issue_id||"");k&&(r.delete(k),d()),s=m,u()}}}return{id:e,subscribe(g){return i.add(g),()=>{i.delete(g)}},applyPush:f,snapshot(){return o},size(){return r.size},getById(g){return r.get(g)},dispose(){l=!0,r.clear(),o=[],i.clear(),s=0}}}function hs(e){let t=String(e.type||"").trim(),n={};if(e.params&&typeof e.params=="object"){let o=Object.keys(e.params).sort();for(let s of o){let i=e.params[s];n[s]=String(i)}}let r=new URLSearchParams(n).toString();return r.length>0?`${t}?${r}`:t}function uc(e){let t=Lt("subs"),n=new Map,r=new Map;function o(l,a){t("applyDelta %s +%d ~%d -%d",l,(a.added||[]).length,(a.updated||[]).length,(a.removed||[]).length);let u=r.get(l);if(!u||u.size===0)return;let d=Array.isArray(a.added)?a.added:[],f=Array.isArray(a.updated)?a.updated:[],g=Array.isArray(a.removed)?a.removed:[];for(let m of Array.from(u)){let k=n.get(m);if(!k)continue;let R=k.itemsById;for(let z of d)typeof z=="string"&&z.length>0&&R.set(z,!0);for(let z of f)typeof z=="string"&&z.length>0&&R.set(z,!0);for(let z of g)typeof z=="string"&&z.length>0&&R.delete(z)}}async function s(l,a){let u=hs(a);if(t("subscribe %s key=%s",l,u),!n.has(l))n.set(l,{key:u,itemsById:new Map});else{let f=n.get(l);if(f&&f.key!==u){let g=r.get(f.key);g&&(g.delete(l),g.size===0&&r.delete(f.key)),n.set(l,{key:u,itemsById:new Map})}}r.has(u)||r.set(u,new Set);let d=r.get(u);d&&d.add(l);try{await e("subscribe-list",{id:l,type:a.type,params:a.params})}catch(f){let g=n.get(l)||null;if(g){let m=r.get(g.key);m&&(m.delete(l),m.size===0&&r.delete(g.key))}throw n.delete(l),f}return async()=>{t("unsubscribe %s key=%s",l,u);try{await e("unsubscribe-list",{id:l})}catch{}let f=n.get(l)||null;if(f){let g=r.get(f.key);g&&(g.delete(l),g.size===0&&r.delete(f.key))}n.delete(l)}}return{subscribeList:s,_applyDelta:o,_subKeyOf:hs,selectors:{getIds(l){let a=n.get(l);return a?Array.from(a.itemsById.keys()):[]},has(l,a){let u=n.get(l);return u?u.itemsById.has(a):!1},count(l){let a=n.get(l);return a?a.itemsById.size:0},getItemsById(l){let a=n.get(l),u={};if(!a)return u;for(let d of a.itemsById.keys())u[d]=!0;return u}}}}function dc(){let e=Lt("issue-stores"),t=new Map,n=new Map,r=new Set,o=new Map;function s(){for(let a of Array.from(r))try{a()}catch{}}function i(a,u,d){let f=u?hs(u):"",g=n.get(a)||"",m=t.has(a);if(e("register %s key=%s (prev=%s)",a,f,g),m&&g&&f&&g!==f){let k=t.get(a);if(k)try{k.dispose()}catch{}let R=o.get(a);if(R){try{R()}catch{}o.delete(a)}let z=Qi(a,d);t.set(a,z);let X=z.subscribe(()=>s());o.set(a,X)}else if(!m){let k=Qi(a,d);t.set(a,k);let R=k.subscribe(()=>s());o.set(a,R)}return n.set(a,f),()=>l(a)}function l(a){e("unregister %s",a),n.delete(a);let u=t.get(a);u&&(u.dispose(),t.delete(a));let d=o.get(a);if(d){try{d()}catch{}o.delete(a)}}return{register:i,unregister:l,getStore(a){return t.get(a)||null},snapshotFor(a){let u=t.get(a);return u?u.snapshot().slice():[]},subscribe(a){return r.add(a),()=>r.delete(a)}}}function pc(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function fc(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function Zi(e,t){return`#/${e==="worker"||e==="monitor"?e:"board"}?issue=${encodeURIComponent(t)}`}function $_(e){let t=String(e||""),n=t.startsWith("#")?t.slice(1):t,r=n.indexOf("?"),o=r>=0?n.slice(r+1):"";if(o){let l=new URLSearchParams(o).get("issue");if(l)return decodeURIComponent(l)}let s=/^\/issue\/([^\s?#]+)/.exec(n);return s&&s[1]?decodeURIComponent(s[1]):null}function x_(e){let t=String(e||"");return/^#\/worker(\b|\/|$)/.test(t)?"worker":/^#\/monitor(\b|\/|$)/.test(t)?"monitor":"board"}function _c(e){let t=Lt("router"),n=()=>{let r=window.location.hash||"",o=/^#\/issue\/([^\s?#]+)/.exec(r),s=o&&o[1]?decodeURIComponent(o[1]):$_(r),i=x_(r);if(t("hash change \u2192 view=%s id=%s",i,s),e.setState({selected_id:i==="worker"?null:s,view:i,worker:{selected_parent_id:i==="worker"?s:null}}),!!o||/^#\/(issues|epics)(\b|\/|\?|$)/.test(r)){let a=s?`#/${i}?issue=${encodeURIComponent(s)}`:`#/${i}`;window.location.hash!==a&&(window.location.hash=a)}};return{start(){window.addEventListener("hashchange",n),n()},stop(){window.removeEventListener("hashchange",n)},gotoIssue(r){let o=e.getState?e.getState():{view:"board"},s=o.view==="worker"||o.view==="monitor"?o.view:"board",i=Zi(s,r);t("goto issue %s (view=%s)",r,s),window.location.hash!==i?window.location.hash=i:e.setState({selected_id:s==="worker"?null:r,view:s,worker:{selected_parent_id:s==="worker"?r:null}})},gotoView(r){let o=e.getState?e.getState():{selected_id:null,worker:{selected_parent_id:null}},s=r==="worker"?o.worker?.selected_parent_id:o.selected_id,i=s?Zi(r,s):`#/${r}`;t("goto view %s (id=%s)",r,s||""),window.location.hash!==i?window.location.hash=i:e.setState({view:r,selected_id:r==="worker"?null:o.selected_id})}}}var A_=Object.freeze({workspace_config:{default_workspace:null}});function mc(e){return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:A_.workspace_config.default_workspace}}}function gc(e={}){let t=Lt("state"),n={selected_id:e.selected_id??null,view:e.view??"board",filters:{status:e.filters?.status??"all",search:e.filters?.search??"",type:typeof e.filters?.type=="string"?e.filters?.type:""},board:{closed_filter:e.board?.closed_filter==="3"||e.board?.closed_filter==="7"||e.board?.closed_filter==="today"?e.board?.closed_filter:"today"},worker:{selected_parent_id:e.worker?.selected_parent_id??null,show_closed_children:Array.isArray(e.worker?.show_closed_children)?e.worker.show_closed_children:[]},workspace:{current:e.workspace?.current??null,available:e.workspace?.available??[],hidden:e.workspace?.hidden??[]},config:mc(e.config)},r=new Set;function o(){for(let s of Array.from(r))try{s(n)}catch{}}return{getState(){return n},setState(s){let i={...n,...s,filters:{...n.filters,...s.filters||{}},board:{...n.board,...s.board||{}},worker:{...n.worker,...s.worker||{}},workspace:{current:s.workspace?.current!==void 0?s.workspace.current:n.workspace.current,available:s.workspace?.available!==void 0?s.workspace.available:n.workspace.available,hidden:s.workspace?.hidden!==void 0?s.workspace.hidden:n.workspace.hidden},config:s.config!==void 0?mc(s.config):n.config},l=i.workspace.current?.path!==n.workspace.current?.path||i.workspace.available.length!==n.workspace.available.length||i.workspace.hidden.length!==n.workspace.hidden.length||i.workspace.hidden.some((u,d)=>u!==n.workspace.hidden[d]),a=i.config.workspace_config.default_workspace!==n.config.workspace_config.default_workspace;i.selected_id===n.selected_id&&i.view===n.view&&i.filters.status===n.filters.status&&i.filters.search===n.filters.search&&i.filters.type===n.filters.type&&i.board.closed_filter===n.board.closed_filter&&i.worker.selected_parent_id===n.worker.selected_parent_id&&i.worker.show_closed_children.length===n.worker.show_closed_children.length&&i.worker.show_closed_children.every((u,d)=>u===n.worker.show_closed_children[d])&&!l&&!a||(n=i,t("state change %o",{selected_id:n.selected_id,view:n.view,filters:n.filters,board:n.board,worker:n.worker,workspace:n.workspace.current?.path,config:{default_workspace:n.config.workspace_config.default_workspace}}),o())},subscribe(s){return r.add(s),()=>r.delete(s)}}}function hc(e){let t=Lt("activity"),n=0,r=new Map,o=1;function s(){if(!e)return;let u=n>0;e.toggleAttribute("hidden",!u),e.setAttribute("aria-busy",u?"true":"false")}function i(){n+=1,t("start count=%d",n),s()}function l(){let u=n;n=Math.max(0,n-1),u<=0?t("done called but count was already %d",u):t("done count=%d\u2192%d",u,n),s()}function a(u){return async(f,g)=>{let m=o++,k=Date.now();r.set(m,{type:f,start_ts:k}),t("request start id=%d type=%s count=%d",m,f,n+1),i();let R=!1,z=()=>{R||(R=!0,r.delete(m),l())},X=setTimeout(()=>{R||(t("request TIMEOUT id=%d type=%s elapsed=%dms",m,f,Date.now()-k),z())},3e4);try{let ee=await u(f,g),W=Date.now()-k;return t("request done id=%d type=%s elapsed=%dms",m,f,W),ee}catch(ee){let W=Date.now()-k;throw t("request error id=%d type=%s elapsed=%dms err=%o",m,f,W,ee),ee}finally{clearTimeout(X),z()}}}return s(),{wrapSend:a,start:i,done:l,getCount:()=>n,getActiveRequests:()=>{let u=Date.now();return Array.from(r.entries()).map(([d,f])=>({id:d,type:f.type,elapsed_ms:u-f.start_ts}))}}}function ke(e,t="info",n=2800){let r=document.createElement("div");r.className="toast",r.textContent=e,r.style.position="fixed",r.style.right="12px",r.style.bottom="12px",r.style.zIndex="1000",r.style.color="#fff",r.style.padding="8px 10px",r.style.borderRadius="4px",r.style.fontSize="12px",t==="success"?r.style.background="#156d36":t==="warning"?r.style.background="#a36a00":t==="error"?r.style.background="#9f2011":r.style.background="rgba(0,0,0,0.85)",(document.body||document.documentElement).appendChild(r),setTimeout(()=>{try{r.remove()}catch{}},n)}function jr(e=void 0,t=void 0){function n(){if(!t||typeof t.get!="function")return null;let s=t.get();return s&&s.order?s.order:{}}function r(s,i,l){let a=e&&e.snapshotFor?e.snapshotFor(s).slice():[];if(i==="closed")return a.sort(ic),a;switch(l){case"created_desc":return a.sort(ho),a;case"created_asc":return a.sort(rc),a;case"updated_desc":return a.sort(oc),a;case"priority":return a.sort(sc),a;case"manual":default:{let u=n();return u?a.sort(cc(u)):a.sort(ho),a}}}function o(s){let i=[];return e&&typeof e.subscribe=="function"&&i.push(e.subscribe(s)),t&&typeof t.subscribe=="function"&&i.push(t.subscribe(s)),()=>{for(let l of i)try{l()}catch{}}}return{selectBoardColumn:r,subscribe:o}}function nr(e){if(!e)return null;if(typeof e=="number")return Number.isFinite(e)?e:null;let t=Date.parse(e);return Number.isFinite(t)?t:null}function Yt(e){let t=nr(e);if(t===null)return"";let n=new Date(t),r=o=>String(o).padStart(2,"0");return`${n.getFullYear()}-${r(n.getMonth()+1)}-${r(n.getDate())} ${r(n.getHours())}:${r(n.getMinutes())}`}function rn(e,t){let n=nr(e);if(n===null)return"";let o=(typeof t=="number"?t:Date.now())-n;if(o<6e4)return"\uBC29\uAE08";let s=Math.floor(o/6e4);if(s<60)return`${s}\uBD84 \uC804`;let i=Math.floor(o/36e5);if(i<24)return`${i}\uC2DC\uAC04 \uC804`;let l=Math.floor(o/864e5);if(l<7)return`${l}\uC77C \uC804`;let a=Math.floor(l/7);if(l<30)return`${a}\uC8FC \uC804`;let u=Math.floor(l/30);return u<12?`${u}\uAC1C\uC6D4 \uC804`:`${Math.floor(l/365)}\uB144 \uC804`}function bc(e){if(!Array.isArray(e))return null;let t=null,n=-1;for(let r of e){if(!r||r.status!=="in_progress")continue;let o=nr(r.updated_at)??0;if(t===null||o>n){t=r,n=o;continue}o===n&&String(r.id)<String(t.id)&&(t=r)}return t}function bs(e){let t=e&&e.parent;return typeof t=="string"?t:t&&t.id?String(t.id):""}function ys(e){let t=new Map;for(let r of e)r&&r.id&&!t.has(r.id)&&t.set(r.id,r);let n=new Map;for(let r of t.values()){let o=bs(r);if(!o)continue;let s=n.get(o);s||(s=[],n.set(o,s)),s.push({id:r.id,title:r.title,status:r.status,metadata:r.metadata,workflow:r.workflow,created_at:r.created_at,updated_at:r.updated_at})}return n}function vs(e,t){let n=e.get(t)||[],r=0;for(let s of n)(s.status==="resolved"||s.status==="closed")&&(r+=1);let o=bc(n);return{total:n.length,count:r,current:o,children:n}}function yc(e){let t=e.transport,n=e.uiOrderStore;function r(i,l){return"renormalize"in i?i.renormalize:[{bead_id:l,rank:i.rank}]}function o(i,l){let a={...i.order};for(let u of l)a[u.bead_id]=u.rank;n&&n.set({revision:i.revision,order:a})}async function s(i,l,a){if(!t||!n)return;let u=n.get()||{revision:0,order:{}},d=r(Xi(l,a,u.order),i);o(u,d);let f=await t("ui-order-set",{expected_revision:u.revision,entries:d});if(f&&f.conflict){let g={revision:typeof f.revision=="number"?f.revision:0,order:f.order||{}};n.set(g);let m=r(Xi(l,a,g.order),i);o(g,m);let k=await t("ui-order-set",{expected_revision:g.revision,entries:m});k&&k.applied&&n.set({revision:typeof k.revision=="number"?k.revision:0,order:k.order||{}})}else f&&f.applied&&n.set({revision:typeof f.revision=="number"?f.revision:0,order:f.order||{}})}return{applyReorder:s}}function vc(e){if(typeof e!="string")return"";let t=e.indexOf("-");return t>0?e.slice(0,t):""}function Un(e,t){let n=vc(e),r=vc(t);return n.length===0||r.length===0?!1:n!==r}function ws(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function Ji(e,t){return!t||typeof e!="string"||e.length===0||ws(t.visible_labels).includes(e)?!0:ws(t.hidden_labels).includes(e)?!1:!ws(t.hidden_prefixes).some(n=>n.length>0&&e.startsWith(n))}function wc(e,t){return ws(e).filter(n=>Ji(n,t))}function rr(e,t){let n=e&&e.chips?e.chips[t]:void 0;return typeof n=="boolean"?n:!0}function S_(e){switch(e){case"in_progress":return"board-card__dot board-card__dot--progress";case"resolved":return"board-card__dot board-card__dot--resolved";case"closed":return"board-card__dot board-card__dot--closed";case"blocked":return"board-card__dot board-card__dot--blocked";default:return"board-card__dot"}}function E_(e,t,n,r,o){return c`<button
    type="button"
    class="board-card__roll-toggle"
    data-roll-parent=${e}
    aria-expanded=${r?"true":"false"}
    @click=${o}
  >
    children ${t}/${n} ${r?"\u25B4":"\u25BE"}
  </button>`}function T_(e,t,n,r){return c`<button
    type="button"
    class="board-card__roll-child"
    data-child-id=${e.id}
    @click=${r?o=>r(o,e.id):void 0}
  >
    <span class=${S_(e.status)}>●</span>
    <span class="board-card__roll-child-ord">${t}</span>
    <span class="board-card__roll-child-title">${e.title||e.id}</span>
    ${n}
  </button>`}function ks(e,t){let n=e.total||0,r=!!t.expanded,o=t.trailing??"",s=typeof t.empty_label=="string"&&t.empty_label.length>0?t.empty_label:null;if(n===0&&s===null)return"";let i=Array.isArray(e.children)?e.children:[],l=n>0?i.slice().sort(lc):i;return c`
    <div class="board-card__roll">
      <div class="board-card__roll-meta">
        ${n>0?E_(t.parent_id,e.count,n,r,t.onToggle):c`<span class="board-card__roll-none">${s}</span>`}
        ${o}
      </div>
      ${n>0&&e.current?c`<div class="board-card__roll-current">
            └
            <span class="board-card__cur-child"
              >● ${e.current.title||e.current.id}</span
            >
          </div>`:""}
      ${r&&n>0?c`<div class="board-card__roll-list">
            ${l.map((a,u)=>T_(a,u+1,t.childChips?t.childChips(a):null,t.onChildClick))}
          </div>`:""}
    </div>
  `}var C_={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"mrg",close:"mrg"},$c={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"merge",close:"close"},kc={quick_fix:["impl","close"],spec_backed:["spec","impl","pr","merge"],full_plan:["spec","plan","impl","pr","merge"]},R_={review:"\u2713",skip:"\u2298"},or={none:"\uBBF8\uB3C4\uB2EC",dim:"\uC9C4\uD589 \uC911",stale:"\uC7AC\uAC80\uD1A0 \uD544\uC694",review:"\uAC80\uD1A0 \uC644\uB8CC",skip:"\uAC80\uD1A0 \uC0DD\uB7B5",done:"\uC644\uB8CC"};function O_(e,t,n){if(!(n==="in_progress"||n==="resolved"))return null;for(let o of e){let s=t[o];if(s&&s.fill==="dim"&&s.stale!==!0)return o}return null}function xc(e){let t=e&&e.fill||"none";return t==="none"?or.none:e&&e.stale===!0?or.stale:t==="dim"?or.dim:e&&e.glyph==="review"?or.review:e&&e.glyph==="skip"?or.skip:or.done}function L_(e){if(!e||e.fill==="none"||!e.approval_state)return xc(e);let t=[];return e.glyph==="review"?t.push(or.review):e.glyph==="skip"&&t.push(or.skip),e.approval_state==="missing"?t.push("\uC2B9\uC778 \uD544\uC694"):e.approval_state==="stale"?t.push("\uC7AC\uC2B9\uC778 \uD544\uC694"):e.approval_state==="unknown"?t.push("\uC2B9\uC778 \uD655\uC778 \uBD88\uAC00"):t.push("\uC2B9\uC778 \uC644\uB8CC"),t.join(" \xB7 ")}function I_(e,t,n,r){let o=C_[e]||e,s=t&&t.fill||"none",i=!!t&&t.stale===!0,l=R_[t&&t.glyph||""]||"",a="bar";s==="dim"?a+=` b-${o} dim`:s==="full"&&(a+=` b-${o} full`),i&&(a+=" stale"),n&&(a+=" cur");let u=s==="none"?"lbl":`lbl l-${o} on`,d=n?`color: var(--stage-${o}-on)`:"",f=$c[e]||e,g=r?Ac(t):null;if(!g)return c`
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
      @click=${k=>{k.preventDefault(),k.stopPropagation(),r(k,g,e)}}
    >
      <div class=${a} style=${d}>${l}</div>
      <div class=${u}>${f}</div>
    </button>
  `}function Ac(e){let t=e?e.doc:null;return!t||typeof t.path!="string"||t.path.length===0?null:t}function $s(e,t,n={}){if(!e||!e.stages)return"";let r=n.onOpenDoc,o=kc[e.route]||kc.spec_backed,s=e.stages,i=O_(o,s,String(t||"open")),l=`\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uC9C4\uD589: ${o.map(u=>`${$c[u]||u} ${u==="plan"?L_(s[u]||{}):xc(s[u]||{})}`).join(" \xB7 ")}`,a=!!r&&o.some(u=>Ac(s[u]||{})!==null);return c`
    <div
      class="stp"
      role=${a?"group":"img"}
      aria-label=${l}
    >
      ${o.map(u=>I_(u,s[u]||{},u===i,r))}
    </div>
  `}function M_(e){return typeof e!="number"||!Number.isFinite(e)?"":`P${Math.max(0,Math.min(4,e))}`}var Sc=2;function Ec(e){let t=e.slice(0,Sc).join(", "),n=e.length-Sc;return`\u26D3 blocked: ${t}${n>0?` +${n}`:""}`}function P_(e,t){if(!t)return[];let n=[],r=Array.isArray(t.blockers)?t.blockers:[],o=[],s=[];for(let i of r)(Un(e,i)?s:o).push(i);return o.length>0&&n.push(c`<span class="ctl-chip ctl-chip--blocked-dep"
        >${Ec(o)}</span
      >`),s.length>0&&n.push(c`<span class="ctl-chip ctl-chip--blocked-foreign"
        >${Ec(s)}</span
      >`),n}function D_(e){if(!e||typeof e!="object")return null;let t=e.awaiting_user;if(typeof t!="string")return null;let n=t.trim();return n.length===0?null:c`<span class="ctl-chip ctl-chip--blocked"
    >${`\u23F8 \uC0AC\uC6A9\uC790 \uB9AC\uBDF0 \uD544\uC694: ${n}`}</span
  >`}function ea(e){return e==="delegated"?"\uC704\uC784":e==="main"?"\uBA54\uC778":null}function xs(e){return e.effort?`${e.actor}:${e.effort}`:e.actor}function Wn(e){return`${e.kind}:${xs(e)}@${e.sha}`}function As(e,t){if(!e)return null;let n=ea(e.kind),r=e.reason,o=e.kind==="delegated"?r===null:typeof r=="string"&&r.trim().length>0&&!/[\r\n]/.test(r);if(!n||!o)return null;let s=ea(t?.kind),i=s!==null&&t?.kind!==e.kind,l=`\uACC4\uD68D \xB7 ${n}${i?` \u2192 ${s}`:""}`,a=`planned_execution ${e.kind}${typeof r=="string"?`:${r}`:""}`,u=t?` \xB7 exec_receipt ${Wn(t)}`:"";return{kind:e.kind,label:l,title:`${a}${u}`}}function Tc(e,t){let n=As(e,t);return n?c`<span
        class="ctl-chip ctl-chip--planned"
        data-kind=${n.kind}
        title=${n.title}
        >${n.label}</span
      >`:null}function N_(e){if(!e)return null;let t=ea(e.kind);return t?c`<span
    class="ctl-chip ctl-chip--exec-receipt"
    title=${`exec_receipt ${Wn(e)}`}
    >${`\uC2E4\uD589 \xB7 ${t}`}</span
  >`:null}function q_(e,t){let n=t.policy||null,r=e.workflow&&e.workflow.chips||{},o=[];if(r.route&&rr(n,"route")){let l=r.route_source==="derived";o.push(c`<span
        class="ctl-chip ctl-chip--route${l?" is-derived":""}"
        title=${l?"route \uBBF8\uD540 (metadata unset)":"route"}
        >${l?"unset":r.route}</span
      >`)}if(r.fast_track&&rr(n,"fast_track")&&o.push(c`<span class="ctl-chip ctl-chip--ft">⚡ fast_track</span>`),r.pr&&rr(n,"pr")){let l=r.pr.number;o.push(c`<span class="ctl-chip ctl-chip--pr"
        >${`PR${l!=null?` #${l}`:""}`}</span
      >`)}let s=Tc(r.planned_execution,r.exec_receipt);if(s&&o.push(s),r.exec_receipt){let l=r.exec_receipt;o.push(c`<span
        class="ctl-chip ctl-chip--exec-receipt"
        title=${`exec_receipt ${Wn(l)}`}
        >${`exec ${l.kind==="delegated"?xs(l):`main:${l.actor}`} \xB7 ${l.sha.slice(0,7)}`}</span
      >`)}if(r.impl_entry){let l=r.impl_entry;o.push(c`<span
        class="ctl-chip ctl-chip--impl-entry"
        title=${`impl_entry ${l.actor}@${l.sha}`}
        >${`impl ${l.actor} \xB7 ${l.sha.slice(0,7)}`}</span
      >`)}for(let l of wc(e.labels,n))o.push(c`<span class="ctl-chip ctl-chip--label">${l}</span>`);if(e.from_id&&rr(n,"from")&&o.push(c`<button
        type="button"
        class="ctl-chip ctl-chip--from"
        title=${`\uCD9C\uCC98 ${e.from_id} \uC5F4\uAE30`}
        @click=${l=>{l.stopPropagation(),t.onFromChipClick&&t.onFromChipClick(l,String(e.from_id))}}
      >
        ↩ from ${e.from_id}
      </button>`),rr(n,"blocked")){let l=D_(e.metadata);l&&o.push(l),o.push(...P_(e.id,e.blocked_info))}return t.cleanupFailureFor&&t.cleanupFailureFor(e.id)&&rr(n,"blocked")&&o.push(c`<span class="ctl-chip ctl-chip--cleanup">⚠ 정리 멈춤</span>`),o.length===0?"":c`<div class="board-card__chips">${o}</div>`}function F_(e){let t=rn(e.created_at),n=rn(e.updated_at);return!t&&!n?"":c`<span class="board-card__times">
    ${t?c`<span
          class="board-card__time"
          title=${`\uC0DD\uC131 ${Yt(e.created_at)}`}
          >생성 ${t}</span
        >`:""}
    ${t&&n?c`<span class="board-card__time-sep">·</span>`:""}
    ${n?c`<span
          class="board-card__time"
          title=${`\uC218\uC815 ${Yt(e.updated_at)}`}
          >수정 ${n}</span
        >`:""}
  </span>`}function j_(e,t){let n=t.rollupFor?t.rollupFor(e.id):{total:0,count:0,current:null,children:[]};return ks(n,{parent_id:e.id,expanded:t.isExpanded?t.isExpanded(e.id):!0,trailing:F_(e),empty_label:"children \uC5C6\uC74C",childChips:ta,onToggle:r=>t.onRollupToggle&&t.onRollupToggle(r,e.id),onChildClick:(r,o)=>t.onChildClick&&t.onChildClick(r,o)})}function ta(e){let t=e?.workflow?.chips?.planned_execution,n=e?.workflow?.chips?.exec_receipt;return As(t,n)?c`<span class="board-card__roll-child-chips">
    ${Tc(t,n)}
    ${N_(n)}
  </span>`:null}function Ss(e,t){let n=M_(e.priority);return c`
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
      ${q_(e,t)}
      ${e.workflow&&rr(t.policy||null,"stepper")?$s(e.workflow,e.status,{onOpenDoc:t.onOpenDoc}):""}
      ${j_(e,t)}
    </article>
  `}function Br(e,t){let n=Array.isArray(e.items)?e.items.length:0,r=e.is_closed===!0;return c`
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
              ${jl.map(s=>c`<option
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
        ${e.items.map(s=>Ss(s,t))}
      </div>
    </section>
  `}function Cc(e,t,n){return c`
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
          ${e.items.length===0?c`<div class="deferred-popup__empty">Deferred 이슈 없음</div>`:e.items.map(r=>Ss(r,t))}
        </div>
      </div>
    </dialog>
  `}var B_=[{value:"",label:"\uC6B0\uC120\uC21C\uC704"},{value:"0",label:"P0"},{value:"1",label:"P1"},{value:"2",label:"P2"},{value:"3",label:"P3"},{value:"4",label:"P4"}],U_=[{value:"",label:"\uD0C0\uC785"},{value:"bug",label:"bug"},{value:"feature",label:"feature"},{value:"task",label:"task"},{value:"epic",label:"epic"},{value:"chore",label:"chore"}],W_=[{value:"created_desc",label:"\uC0DD\uC131 \uCD5C\uC2E0\uC21C"},{value:"created_asc",label:"\uC0DD\uC131 \uC624\uB798\uB41C\uC21C"},{value:"updated_desc",label:"\uC218\uC815 \uCD5C\uC2E0\uC21C"},{value:"priority",label:"\uC6B0\uC120\uC21C\uC704\uC21C"},{value:"manual",label:"\uC218\uB3D9(\uB4DC\uB798\uADF8)"}];function z_(e,t,n){let r=e.labels.length,o=r>0?`\uB77C\uBCA8 ${r}`:"\uB77C\uBCA8";return c`
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
  `}function Rc(e,t,n){return c`
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
        ${B_.map(r=>c`<option
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
        ${U_.map(r=>c`<option
              value=${r.value}
              ?selected=${e.type===r.value}
            >
              ${r.label}
            </option>`)}
      </select>
      ${z_(e,t,n)}
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
        ${W_.map(r=>c`<option
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
  `}var H_=200,G_={"ready-col":"open","in-progress-col":"in_progress","resolved-col":"resolved","closed-col":"closed"},K_=new Set(["blocked-col","ready-col","in-progress-col","resolved-col"]),Oc="beads-ui.board.sort",Lc=new Set(["created_desc","created_asc","updated_desc","priority","manual"]);function Y_(){try{let e=window.localStorage.getItem(Oc);if(e&&Lc.has(e))return e}catch{}return"created_desc"}function Ic(e,t){let n=Lt("views:board"),r=t.gotoIssue,o=t.issueStores,s=t.transport,i=t.uiOrderStore,l=t.displayPolicyStore,a=t.workerQueueStore,u=t.onClosedRangeChange,d=t.onNewIssue,f=t.openDoc,g=t.closedRange||fs,m=o?jr(o,i):null,k=yc({transport:s,uiOrderStore:i}),R=[],z=[],X=[],ee=[],W=[],q=[],O=!1,I=0,F=Y_(),U=new Map,ue=new Map,M=new Map,B=new Set,Q={search:"",priority:"",type:"",labels:[]},re=!1,Ee=null;function he(oe){return String(oe.status||"open")==="open"}function pe(oe){return String(oe.status||"open")==="open"}function P(oe){let J=Q.search.trim().toLowerCase(),$=Q.priority,N=Q.type,te=Q.labels;return oe.filter(ne=>{if(J){let le=String(ne.id||"").toLowerCase(),Be=String(ne.title||"").toLowerCase();if(!le.includes(J)&&!Be.includes(J))return!1}if($!==""&&String(ne.priority)!==$||N!==""&&String(ne.issue_type||"")!==N)return!1;if(te.length>0){let le=Array.isArray(ne.labels)?ne.labels:[];if(!te.some(Be=>le.includes(Be)))return!1}return!0})}function Ae(){let oe=new Set;for(let J of[R,z,X,ee,W,q])for(let $ of J){let N=Array.isArray($.labels)?$.labels:[];for(let te of N)typeof te=="string"&&te.length>0&&oe.add(te)}return Array.from(oe).sort()}function Se(){return Q.search.trim()!==""||Q.priority!==""||Q.type!==""||Q.labels.length>0}function E(){try{if(m){let oe=m.selectBoardColumn("tab:board:in-progress","in_progress",F),J=m.selectBoardColumn("tab:board:blocked","blocked",F).filter(pe),$=new Set(oe.map(Ue=>Ue.id)),N=m.selectBoardColumn("tab:board:ready","ready",F).filter(Ue=>he(Ue)&&!$.has(Ue.id)),te=m.selectBoardColumn("tab:board:resolved","resolved",F),ne=m.selectBoardColumn("tab:board:deferred","deferred",F),le=m.selectBoardColumn("tab:board:closed","closed").slice(0,H_),Be=[...J,...N,...oe,...te,...le];Z(Be);let Ye=new Set;for(let Ue of Be)Ue&&Ue.id&&!bs(Ue)&&Ye.add(Ue.id);let et=!Se();R=et?bo(J,Ye):J,z=et?bo(N,Ye):N,X=et?bo(oe,Ye):oe,ee=et?bo(te,Ye):te,W=ne,I=ne.length,q=et?bo(le,Ye):le,U=new Map;for(let Ue of R)U.set(Ue.id,"open");for(let Ue of z)U.set(Ue.id,"open");for(let Ue of X)U.set(Ue.id,"in_progress");for(let Ue of ee)U.set(Ue.id,"resolved");for(let Ue of W)U.set(Ue.id,"deferred");for(let Ue of q)U.set(Ue.id,"closed");ue=new Map;for(let Ue of R)ue.set(Ue.id,"blocked-col");for(let Ue of z)ue.set(Ue.id,"ready-col");for(let Ue of X)ue.set(Ue.id,"in-progress-col");for(let Ue of ee)ue.set(Ue.id,"resolved-col");for(let Ue of q)ue.set(Ue.id,"closed-col")}je()}catch{R=[],z=[],X=[],ee=[],W=[],q=[],M=new Map,je()}}function Z(oe){M=ys(oe)}function Ce(oe){return vs(M,oe)}function ge(oe){return!B.has(oe)}function Te(oe,J){oe.preventDefault(),oe.stopPropagation(),B.has(J)?B.delete(J):B.add(J),je()}function be(oe,J){oe.preventDefault(),oe.stopPropagation(),r(J)}function Pe(oe,J){oe.preventDefault(),oe.stopPropagation(),r(J)}function Xe(oe,J){Ee||r(J)}function Ke(oe,J){oe.preventDefault(),oe.stopPropagation(),V_(J).then($=>{$&&ke("\uBCF5\uC0AC\uB428","success",1200)})}function L(oe,J){Ee=J,oe.dataTransfer&&(oe.dataTransfer.setData("text/plain",J),oe.dataTransfer.effectAllowed="move"),oe.target.classList.add("board-card--dragging")}function se(oe){oe.target.classList.remove("board-card--dragging"),Tt(),setTimeout(()=>{Ee=null},0)}function ae(oe){let J=String(oe.target.value||"");!J||J===g||(g=J,u&&u(J),je())}function me(){return l?l.get():null}function we(oe){let J=a?a.get():null,$=J?J.cleanup_failed:null;if(!$||typeof $!="object"||Array.isArray($))return null;let N=$[oe];return!N||typeof N!="object"||Array.isArray(N)?null:N}let de={onCardClick:Xe,onCopyId:Ke,onDragStart:L,onDragEnd:se,onClosedRangeChange:ae,rollupFor:Ce,isExpanded:ge,onRollupToggle:Te,onChildClick:be,onFromChipClick:Pe,onOpenDoc:f?(oe,J)=>f(J):void 0,cleanupFailureFor:we,get policy(){return me()}};function Fe(oe,J){Ee||(v(),r(J))}function He(oe,J){oe.preventDefault(),oe.stopPropagation(),v(),r(J)}let Ze={...de,onCardClick:Fe,onChildClick:He,onFromChipClick:He,onOpenDoc:f?(oe,J)=>{v(),f(J)}:void 0,get policy(){return me()}};function De(oe){let J=oe.target,$=e.querySelector(".board-filter__labels");J&&$&&$.contains(J)||Ne()}function Y(oe){oe.key==="Escape"&&Ne()}function j(){re||(re=!0,document.addEventListener("mousedown",De),document.addEventListener("keydown",Y),je())}function Ne(){re&&(re=!1,document.removeEventListener("mousedown",De),document.removeEventListener("keydown",Y),je())}function at(oe){oe.key==="Escape"&&v()}function Je(){O||(O=!0,document.addEventListener("keydown",at),je())}function v(){O&&(O=!1,document.removeEventListener("keydown",at),je())}let G={onClose:v,onOverlayClick(oe){oe.target===oe.currentTarget&&v()}},Re={onSearchInput(oe){Q.search=String(oe.target.value||""),E()},onPriorityChange(oe){Q.priority=String(oe.target.value||""),E()},onTypeChange(oe){Q.type=String(oe.target.value||""),E()},onSortChange(oe){let J=String(oe.target.value||"");if(!(!Lc.has(J)||J===F)){F=J;try{window.localStorage.setItem(Oc,J)}catch{}E()}},onDeferredToggle(){O?v():Je()},onLabelMenuToggle(){re?Ne():j()},onLabelToggle(oe){let J=Q.labels.indexOf(oe);J===-1?Q.labels.push(oe):Q.labels.splice(J,1),E()},onLabelClear(){Q.labels.length!==0&&(Q.labels=[],E())},onNewIssue(){d&&d()}};function Ie(){return c`
      <div class="board-view">
        ${Rc(Q,Re,{sort_mode:F,deferred_popup_open:O,deferred_count:I,label_options:Ae(),label_menu_open:re})}
        <div class="board-root">
          ${Br({title:"Blocked",id:"blocked-col",items:P(R)},de)}
          ${Br({title:"Ready",id:"ready-col",items:P(z)},de)}
          ${Br({title:"In progress",id:"in-progress-col",items:P(X)},de)}
          ${Br({title:"Resolved",id:"resolved-col",items:P(ee)},de)}
          ${Br({title:"Closed",id:"closed-col",items:P(q),is_closed:!0,closed_range:g},de)}
        </div>
        ${O?Cc({items:P(W),count:I},Ze,G):""}
      </div>
    `}function je(){rt(Ie(),e),We()}function We(){try{let oe=e.querySelector("#deferred-popup");oe&&!oe.open&&(typeof oe.showModal=="function"?oe.showModal():oe.setAttribute("open",""));let J=Array.from(e.querySelectorAll(".board-column, .deferred-popup__body"));for(let $ of J)Array.from($.querySelectorAll(".board-card")).forEach((te,ne)=>{te.tabIndex=ne===0?0:-1})}catch{}}async function dt(oe,J){if(!s){ke("\uC5F0\uACB0\uB418\uC9C0 \uC54A\uC544 \uC0C1\uD0DC\uB97C \uBCC0\uACBD\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error");return}try{await s("update-status",{id:oe,status:J}),ke("\uC0C1\uD0DC \uBCC0\uACBD\uB428","success",1500)}catch($){n("update-status failed: %o",$),ke("\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328","error")}}function $t(oe){switch(oe){case"blocked-col":return R;case"ready-col":return z;case"in-progress-col":return X;case"resolved-col":return ee;default:return[]}}function It(oe,J,$){if(!s||!i)return;let N=$t(oe),te=N.find(et=>et.id===J);if(!te)return;let ne=N.filter(et=>et.id!==J),le=$.closest?$.closest(".board-card"):null,Be=ne.length;if(le){let et=le.getAttribute("data-issue-id");if(et===J)return;let Ue=ne.findIndex(ht=>ht.id===et);Ue>=0&&(Be=Ue)}let Ye=ne.slice();Ye.splice(Be,0,te),k.applyReorder(J,Ye,Be)}function Tt(){for(let oe of Array.from(e.querySelectorAll(".board-column--drag-over")))oe.classList.remove("board-column--drag-over")}let ft=null;e.addEventListener("dragover",oe=>{oe.preventDefault(),oe.dataTransfer&&(oe.dataTransfer.dropEffect="move");let $=oe.target.closest(".board-column");$&&$!==ft&&(ft&&ft.classList.remove("board-column--drag-over"),$.classList.add("board-column--drag-over"),ft=$)}),e.addEventListener("dragleave",oe=>{let J=oe.relatedTarget;(!J||!e.contains(J))&&ft&&(ft.classList.remove("board-column--drag-over"),ft=null)}),e.addEventListener("drop",oe=>{oe.preventDefault(),ft&&(ft.classList.remove("board-column--drag-over"),ft=null);let J=oe.target,$=J.closest(".board-column");if(!$)return;let N=oe.dataTransfer?.getData("text/plain")||"";if(!N)return;let te=$.id,ne=ue.get(N);if(ne&&ne===te){if(K_.has(te)){if(F!=="manual"){ke("\uC218\uB3D9(\uB4DC\uB798\uADF8) \uC815\uB82C \uBAA8\uB4DC\uC5D0\uC11C\uB9CC \uC21C\uC11C\uB97C \uBC14\uAFC0 \uC218 \uC788\uC2B5\uB2C8\uB2E4","warning",2e3);return}It(te,N,J)}return}let le=G_[te];if(!le){ke("\uC5EC\uAE30\uB85C\uB294 \uC62E\uAE38 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","warning",1500);return}U.get(N)!==le&&dt(N,le)}),e.addEventListener("keydown",oe=>{let J=oe.target;if(!(J instanceof HTMLElement))return;let $=String(J.tagName||"").toLowerCase();if($==="input"||$==="textarea"||$==="select"||$==="button"||$==="a"||J.isContentEditable===!0)return;let N=J.closest(".board-card");if(!N)return;let te=String(oe.key||"");if(te==="Enter"||te===" "){oe.preventDefault();let Ye=N.getAttribute("data-issue-id");Ye&&r(Ye);return}if(te!=="ArrowUp"&&te!=="ArrowDown"&&te!=="ArrowLeft"&&te!=="ArrowRight")return;oe.preventDefault();let ne=N.closest(".board-column");if(!ne)return;let le=Array.from(ne.querySelectorAll(".board-card")),Be=le.indexOf(N);if(te==="ArrowDown"&&Be<le.length-1){ct(N,le[Be+1]);return}if(te==="ArrowUp"&&Be>0){ct(N,le[Be-1]);return}if(te==="ArrowLeft"||te==="ArrowRight"){let Ye=Array.from(e.querySelectorAll(".board-column")),et=Ye.indexOf(ne),Ue=te==="ArrowRight"?1:-1,ht=et+Ue;for(;ht>=0&&ht<Ye.length;){let Rt=Ye[ht].querySelector(".board-card");if(Rt){ct(N,Rt);return}ht+=Ue}}});function ct(oe,J){try{oe.tabIndex=-1,J.tabIndex=0,J.focus()}catch{}}let xt=null;m&&m.subscribe&&(xt=m.subscribe(()=>{try{E()}catch{}}));let Ct=null;l&&l.subscribe&&(Ct=l.subscribe(()=>{try{E()}catch{}}));let Mt=null;return a&&a.subscribe&&(Mt=a.subscribe(()=>{je()})),{async load(){n("load"),E()},clear(){Ne(),v(),xt&&(xt(),xt=null),Ct&&(Ct(),Ct=null),Mt&&(Mt(),Mt=null),e.replaceChildren(),R=[],z=[],X=[],ee=[],W=[],q=[],U=new Map,ue=new Map}}}function bo(e,t){return e.filter(n=>{let r=bs(n);return!(r&&t.has(r))})}async function V_(e){try{if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")return await navigator.clipboard.writeText(String(e)),!0;let t=document.createElement("textarea");t.value=String(e),t.style.position="fixed",t.style.left="-9999px",document.body.appendChild(t),t.select();let n=!1;try{n=document.execCommand("copy")}finally{t.remove()}return n}catch{return!1}}var nn=e=>e??Pt;async function on(e){let t=String(e);if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")try{return await navigator.clipboard.writeText(t),!0}catch{}try{let n=document.createElement("textarea");n.value=t,n.style.position="fixed",n.style.left="-9999px",document.body.appendChild(n),n.select();let r=!1;try{r=document.execCommand("copy")}finally{n.remove()}return r}catch{return!1}}function kr(e){return[typeof e.runner=="string"?e.runner:null,typeof e.model=="string"?e.model:null,typeof e.effort=="string"?e.effort:null,e.speed==="fast"?"Fast":null].filter(Boolean).join(" \xB7 ")}function yo(e){return typeof e.resumed_from!="string"||e.resumed_from.length===0?null:`${e.continuation_mode==="session"?"session \uC774\uC5B4\uBC1B\uC74C":e.continuation_mode==="fresh"?"\uC0C8 session\uC73C\uB85C \uC774\uC5B4\uBC1B\uC74C":"\uC774\uC804 attempt\uC5D0\uC11C \uC774\uC5B4\uBC1B\uC74C"} (from ${e.resumed_from})`}function X_(e,t=document){let n=t.createElement("dialog");n.className="continuation-dialog";let r=t.createElement("button"),o=t.createElement("button"),s=t.createElement("button"),i=t.createElement("h2"),l=t.createElement("p");return i.textContent="\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4",l.textContent=`${kr(e.prior||{})||"\uC774\uC804 \uC124\uC815"} \u2192 ${kr(e.current||{})||"\uD604\uC7AC \uC124\uC815"}`,r.type="button",r.textContent="\uAE30\uC874 session \uC774\uC5B4\uD558\uAE30",r.disabled=e.prior_available===!1,o.type="button",o.textContent="\uD604\uC7AC preset\uC73C\uB85C \uC0C8 session",s.type="button",s.textContent="\uCDE8\uC18C",n.append(i,l,r,o,s),t.body.append(n),new Promise(a=>{let u=d=>{typeof n.close=="function"&&n.close(),n.remove(),a(d)};r.addEventListener("click",()=>u("prior_session")),o.addEventListener("click",()=>u("fresh_current")),s.addEventListener("click",()=>u(null)),n.addEventListener("cancel",d=>{d.preventDefault(),u(null)}),typeof n.showModal=="function"?n.showModal():n.setAttribute("open","")})}async function zn(e,t,n={}){let r=e;for(n.onResult?.(r);r?.continuation_mismatch;){let o=r.continuation_mismatch,s=await X_(o);if(s===null)return r;r=await t(s,o.decision_token),n.onResult?.(r),r?.conflict&&n.refresh&&(r=await n.refresh(r),n.onResult?.(r))}return r}var Q_=["workflow_mode","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed","quick_fix_impl_model","orchestration_model","orchestration_effort","orchestration_speed"],Mc={spec_review_effort:"spec_review_model",plan_review_effort:"plan_review_model",impl_review_effort:"impl_review_model"},Z_=new Set(["native-fixed-posture","unsupported","claude-runner-model-default","catalog-validated","provider-tier-or-runtime-model-default","actual-effort"]);function zt(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function Dt(e){return typeof e=="string"&&e.length>0?e:null}function Ur(e){return e.startsWith("gpt-")?e.slice(4):e}function Et(e,t,n,r,o){return{value:e,source:t,display:n,full_value:r,resolution:o}}function Dc(e,t,n){let r=Dt(t[e]);if(r!==null)return{value:r,source:"pin"};let o=Dt(n[e]);return o===null?null:{value:o,source:"global"}}function vo(e,t,n,r){return Dc(e,t,n)||{value:r,source:"base"}}function na(e,t,n,r){let o=n?.implementation?.model_catalog;if(t&&zt(o?.[t])){let i=Dt(o[t][e]);if(i!==null)return i}if(t&&Array.isArray(o?.[t])&&o[t].includes(e))return e;if(!t&&zt(o)){for(let i of Object.values(o))if(zt(i)){let l=Dt(i[e]);if(l!==null)return l}else if(Array.isArray(i)&&i.includes(e))return e}let s=r?.model_index?.[e];return Dt(r?.runners?.[s]?.models?.[e]?.id)||e}function J_(e,t){return Dt(t?.review?.reviewers?.[e]?.model)||e}function Wr(e,t,n=!1){if(e==="default")return Et(e,t,`default (\uC77C\uBC18 \xB7 ${t==="pin"?"\uD540":"\uC804\uC5ED \uACE0\uC815"})`,e,"explicit");let r=n?Ur(e):e;return Et(e,t,r,e,"explicit")}function Nc(e,t,n){let r=t?.implementation?.model_catalog?.[e],o=[];zt(r)?o.push(...Object.keys(r)):Array.isArray(r)&&o.push(...r.filter(i=>typeof i=="string"));let s=n?.runners?.[e]?.models;if(zt(s))for(let i of Object.keys(s))o.includes(i)||o.push(i);return o}function em(e,t){let n=[],r=e?.implementation?.model_catalog;zt(r)&&n.push(...Object.keys(r));let o=t?.runners;if(zt(o))for(let s of Object.keys(o))n.includes(s)||n.push(s);return n}function tm(e,t,n){if(e===null)return{runtime:null,offered:!1};let r=!1;for(let o of em(t,n)){let s=Nc(o,t,n);if(s.length>0&&(r=!0),s.includes(e))return{runtime:o,offered:!0}}return{runtime:null,offered:r}}function ra(e){return Et(e.value,e.source,`${e.value} (\uBE44\uD638\uD658)`,e.value,"incompatible")}function Pc(e,t,n){let r=Dc(e,t,n);return r?Wr(r.value,r.source):Et(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable")}function mn(e){let t=zt(e.pin)?e.pin:{},n=zt(e.global)?e.global:{},r=zt(e.execution_defaults)?e.execution_defaults:null,o=r?.supported===!0&&zt(r.session)?r.session:null,s=r?.supported===!0&&zt(r.orchestration)?r.orchestration:null,i=zt(e.runner_catalog)?e.runner_catalog:null,l=Dt(n.quick_fix_impl_model),a=tm(l,o,i),u={};if(o){let d=vo("workflow_mode",t,n,Dt(o.workflow_mode_default));u.workflow_mode=d.source==="base"?Et(d.value,"base",d.value||"\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",d.value,"default"):Wr(d.value,d.source);for(let W of["spec_review","plan_review","impl_review"]){let q=`${W}_model`,O=Dt(W==="plan_review"?d.value==="fast_track"?o.plan_review?.fast_track_default:o.plan_review?.standard_recommended:o.review?.default),I=vo(q,t,n,O);if(I.value===null)u[q]=Et(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable");else if(I.value!=="self"&&I.value!=="skip"&&!zt(o.review?.reviewers?.[I.value]))u[q]=ra(Et(I.value,I.source,"",null,"explicit"));else{let F=J_(I.value,o);u[q]=Et(I.value,I.source,Ur(F),F,I.source==="base"?"default":"explicit")}}for(let[W,q]of Object.entries(Mc)){let O=u[q].value;if(O==="self"||O==="skip"){u[W]=Et(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable");continue}let I=Dt(o.review?.reviewers?.[O||""]?.effort),F=vo(W,t,n,I);u[W]=F.value===null?Et(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"):Et(F.value,F.source,F.value,F.value,F.source==="base"?"default":"explicit")}let f=zt(o.implementation?.default)?o.implementation.default:{},g=Dt(e.route),m=g!==null&&["quick_fix","spec_backed","full_plan"].includes(g),k=zt(o.implementation?.route_defaults)?o.implementation.route_defaults:{},R=m&&zt(k[g])?k[g]:{};for(let W of["impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"]){let q=vo(W,t,n,W==="impl_dispatch"?Dt(R.dispatch)||Dt(f.dispatch):Dt(f[W.replace("impl_","")]));u[W]=q.value===null?Et(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"):Et(q.value,q.source,q.value,q.value,q.source==="base"?"default":"explicit")}let z=Dt(t.impl_runtime),X=z==="inherit"?Dt(e.controller_runtime):z,ee=g==="quick_fix"&&Dt(t.impl_dispatch)===null&&a.runtime!==null&&(z===null||X===a.runtime);if(ee){let W=a.runtime,q=l;u.impl_dispatch=Et("delegated","global","\uC704\uC784 (\uC804\uC5ED quick_fix)","delegated","explicit"),z===null&&(u.impl_runtime=Et(W,"global",`${W} (\uC720\uB3C4)`,W,"explicit")),Dt(t.impl_model)===null&&(u.impl_model=Et(q,"global",q,q,"explicit"))}if(u.impl_dispatch.value==="main"){u.impl_dispatch.display="\uBA54\uC778";for(let W of["impl_runtime","impl_model","impl_effort","impl_speed"])u[W]=Et(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable")}else{if(u.impl_dispatch.value==="delegated"&&!ee&&(u.impl_dispatch.display="\uC704\uC784"),u.impl_runtime.value==="inherit"&&(u.impl_runtime.display=e.controller_runtime?`inherit (${e.controller_runtime})`:"inherit (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_runtime.resolution="dynamic"),u.impl_model.value!==null){let W=u.impl_runtime.value==="inherit"?Dt(e.controller_runtime):u.impl_runtime.value,q=W?Nc(W,o,i):[];if(u.impl_model.value!=="auto"&&q.length>0&&!q.includes(u.impl_model.value))u.impl_model=ra(u.impl_model);else{let O=na(u.impl_model.value,W,o,i);u.impl_model.display=Ur(O),u.impl_model.full_value=O}}if(u.impl_effort.value==="auto"){let W=Dt(e.transport)||(u.impl_runtime.value==="codex"?"codex-native-spawn":u.impl_runtime.value==="claude"?"implement-claude":null),q=W?Dt(o.implementation?.effort_by_transport?.[W]?.auto):null;q&&!Z_.has(q)?(u.impl_effort.display=`${q} (\uBE44\uD638\uD658)`,u.impl_effort.full_value=q,u.impl_effort.resolution="incompatible"):(u.impl_effort.display="auto (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_effort.resolution="dynamic")}u.impl_speed.value==="default"&&(u.impl_speed=u.impl_speed.source==="base"?Et("default","base","default (\uC77C\uBC18)","default","default"):Wr("default",u.impl_speed.source))}}else for(let d of Q_.filter(f=>!f.startsWith("orchestration_")))u[d]=Pc(d,t,n);if(!o){for(let[d,f]of Object.entries(Mc))(u[f].value==="self"||u[f].value==="skip")&&(u[d]=Et(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable"));if(u.impl_dispatch.value==="main"){u.impl_dispatch.display="\uBA54\uC778";for(let d of["impl_runtime","impl_model","impl_effort","impl_speed"])u[d]=Et(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable")}else u.impl_dispatch.value==="delegated"&&(u.impl_dispatch.display="\uC704\uC784"),u.impl_runtime.value==="inherit"&&(u.impl_runtime.display=e.controller_runtime?`inherit (${e.controller_runtime})`:"inherit (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_runtime.resolution="dynamic"),u.impl_effort.value==="auto"&&(u.impl_effort.display="auto (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_effort.resolution="dynamic")}for(let d of["orchestration_model","orchestration_effort","orchestration_speed"]){if(!s){u[d]=Pc(d,t,n);continue}let f=d.replace("orchestration_",""),g=Dt(s[f]),m=vo(d,t,n,g);if(d==="orchestration_effort"&&m.source==="base"){u[d]=Et(null,"base","CLI \uAE30\uBCF8 (\uBBF8\uC9C0\uC815)",null,"default");continue}if(m.value===null){u[d]=Et(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable");continue}if(d==="orchestration_model"){let k=m.source==="base"?Dt(s.model_id)||m.value:na(m.value,null,o,i);u[d]=Et(m.value,m.source,Ur(k),k,m.source==="base"?"default":"explicit");continue}if(m.value==="default"){u[d]=m.source==="base"?Et("default","base","default (\uC77C\uBC18)","default","default"):Wr("default",m.source);continue}u[d]=Wr(m.value,m.source)}if(o)if(l===null){let d=u.orchestration_model.full_value;u.quick_fix_impl_model=Et(null,"base",d===null?"\uBA54\uC778":`\uBA54\uC778 (orchestration ${Ur(d)})`,null,"default")}else if(a.runtime!==null){let d=na(l,a.runtime,o,i);u.quick_fix_impl_model=Et(l,"global",Ur(d),d,"explicit")}else a.offered?u.quick_fix_impl_model=ra(Et(l,"global","",null,"explicit")):u.quick_fix_impl_model=Wr(l,"global");return u}function nm(e,t){let n=t&&e.value==="default"?"default (\uC77C\uBC18)":e.display;if(!t||e.source==="pin")return`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 ${e.display}`;let r=e.source==="global"?"\uC804\uC5ED":"harness";return`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 ${n} (${r})`}function Es(e){let t=zt(e.pin)?e.pin:{},n=zt(e.global)?e.global:{},r=zt(e.resolution_global)?{...e.resolution_global}:{};delete r[e.key];let o=f=>{let g={...r,...f};return mn({pin:e.layer==="pin"?g:t,global:e.layer==="pin"?n:g,execution_defaults:e.execution_defaults,runner_catalog:e.runner_catalog,route:e.route,controller_runtime:e.controller_runtime})},s=e.layer==="pin"?t:n,i={...s};delete i[e.key];let l=o(i)[e.key],a=o(s)[e.key],u=Dt(s[e.key]),d=[...e.choices];return u!==null&&!d.includes(u)&&d.unshift(u),{unset_label:nm(l,e.layer==="pin"),full_value:l.full_value,unavailable:l.resolution==="unavailable",disabled:a?.resolution==="not_applicable",options:d.map(f=>{let g=o({...s,[e.key]:f})[e.key];return{value:f,label:g.display,full_value:g.full_value}})}}function zr(e=document){let t=e.createElement("dialog");t.className="resume-instructions-dialog";let n=e.createElement("h2"),r=e.createElement("textarea"),o=e.createElement("div"),s=e.createElement("button"),i=e.createElement("button");return n.textContent="\uC138\uC158 \uC774\uC5B4\uD558\uAE30",r.placeholder="\uCD94\uAC00 \uC9C0\uCE68 (\uC120\uD0DD) \u2014 \uBE44\uC6CC\uB450\uBA74 \uAE30\uBCF8 \uC808\uCC28\uB85C \uC7AC\uAC1C",r.maxLength=4e3,o.className="resume-instructions-dialog__actions",s.type="button",s.textContent="\uC774\uC5B4\uD558\uAE30",i.type="button",i.textContent="\uCDE8\uC18C",o.append(s,i),t.append(n,r,o),e.body.append(t),new Promise(l=>{let a=!1,u=f=>{a||(a=!0,typeof t.close=="function"&&t.close(),t.remove(),l(f))},d=()=>u(r.value.trim());s.addEventListener("click",d),i.addEventListener("click",()=>u(null)),r.addEventListener("keydown",f=>{f.key==="Enter"&&(f.ctrlKey||f.metaKey)&&(f.preventDefault(),d())}),t.addEventListener("cancel",f=>{f.preventDefault(),u(null)}),typeof t.showModal=="function"?t.showModal():t.setAttribute("open",""),r.focus()})}function oa(e){return`session:${e.provider}:${e.session_id}`}function wo(e){return`${e.provider} \xB7 ${e.session_id.slice(0,8)}`}function rm(e,t){return e.current&&t==="in_progress"&&e.locality==="local"?"running":"done"}function Hr(e,t,n,r){return{attempt_id:oa(e),session_ref:{bead_id:t,provider:e.provider,session_id:e.session_id},...typeof r=="string"&&r.length>0?{root_dir:r}:{},hide_prompt:!0,meta:{runner:e.provider,label:wo(e),session_id:e.session_id,...typeof e.resume_command=="string"&&e.resume_command.length>0?{resume_command:e.resume_command}:{},status:rm(e,n)}}}var sa="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4",om="\uBD84\uD574 \uC5C6\uC74C \u2014 \uCD1D\uB7C9\uB9CC \uBCF4\uACE0\uB428",qc="\uBD84\uD574 \uC5C6\uB294 leg";function Ft(e){return typeof e=="number"&&Number.isFinite(e)?e:0}var Dn=["input_tokens","output_tokens","cache_read_input_tokens","cache_creation_input_tokens"],Gr=[...Dn,"reasoning_output_tokens"],sm={codex:["implementation","review-consult"],claude:["subagent"]};function ia(e){return!e||typeof e!="object"?!1:Number.isFinite(e.total_tokens)&&!Dn.some(t=>Number.isFinite(e[t]))}function im(e){return!e||typeof e!="object"?!1:Gr.some(t=>Number.isFinite(e[t]))}function aa(e){let t=0;for(let n of Dn)t+=Ft(e?.[n]);return t}function am(e){return!e||typeof e!="object"?!1:Dn.some(t=>Number.isFinite(e[t]))}function Fc(e){return!e||typeof e!="object"?!1:Gr.some(t=>Number.isFinite(e[t]))||Number.isFinite(e.total_tokens)}function lm(e){let t={};for(let n of Gr)e&&Number.isFinite(e[n])&&(t[n]=e[n]);return t}function jc(e){let t={};for(let n of Gr)Number.isFinite(e[n])&&(t[n]=e[n]);return Number.isFinite(e.total_tokens)&&(t.total_tokens=e.total_tokens),e.replayed===!0&&(t.replayed=!0),typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&(t.total_cost_usd=e.total_cost_usd),t}function Bc(e,t){return ia(t)?Ft(t.total_tokens):e==="codex"?Ft(t.input_tokens)+Ft(t.output_tokens):aa(t)}function cm(e){return e==="claude"?"Claude":"Codex"}function um(e){return`\u03C4 ${Wc(e)}`}function dm(e,t){let n=t.breakdown||{},r=Ft(t.total_only_subtotal);if(ia(n)||r>0&&!im(n)){let u=[`\uCD1D ${t.subtotal.toLocaleString("en-US")}`,om];return t.replayed&&u.push(sa),u.join(`
`)}let o=[`\uC785\uB825 ${Ft(n.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${Ft(n.output_tokens).toLocaleString("en-US")}`];e==="claude"?o.push(`\uCE90\uC2DC\uC77D\uAE30 ${Ft(n.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${Ft(n.cache_creation_input_tokens).toLocaleString("en-US")}`):(o.push(`\uCE90\uC2DC\uC77D\uAE30 ${Ft(n.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC4F0\uAE30 ${Ft(n.cache_creation_input_tokens).toLocaleString("en-US")}`),Number.isFinite(n.reasoning_output_tokens)&&o.push(`\uCD94\uB860\uCD9C\uB825 ${Ft(n.reasoning_output_tokens).toLocaleString("en-US")}`)),r>0&&o.push(`${qc} ${r.toLocaleString("en-US")}`);let s=e==="claude"?"\uC785\uB825 + \uCD9C\uB825 + \uCE90\uC2DC\uC77D\uAE30 + \uCE90\uC2DC\uC0DD\uC131":"\uC785\uB825 + \uCD9C\uB825",i=r>0?`${s} + ${qc}`:s,a=[e==="claude"?`Claude subtotal = ${i}`:`Codex subtotal = ${i}; \uCE90\uC2DC\uC77D\uAE30\xB7\uCE90\uC2DC\uC4F0\uAE30\xB7\uCD94\uB860\uCD9C\uB825\uC740 subtotal\uC5D0 \uD3EC\uD568\uB418\uC9C0 \uC54A\uB294 subset`,`\uCD1D ${t.subtotal.toLocaleString("en-US")}`,o.join(" \xB7 ")];return typeof t.total_cost_usd=="number"&&Number.isFinite(t.total_cost_usd)&&a.push(`$${t.total_cost_usd.toFixed(2)}`),t.replayed&&a.push(sa),a.join(`
`)}function en(e){let t=[];if(!e||typeof e!="object"||!("providers"in e)||!e.providers)return t;for(let n of["claude","codex"]){let r=e.providers[n];r&&t.push({provider:n,label:`${cm(n)} ${um(r.subtotal)}${typeof r.total_cost_usd=="number"&&Number.isFinite(r.total_cost_usd)?` \xB7 $${r.total_cost_usd.toFixed(2)}`:""}`,tooltip:dm(n,r)})}return t}function Cs(e){let t={},n={claude:!0,codex:!1},r={claude:0,codex:0};for(let o of e)if(!(!o||!o.providers))for(let s of["claude","codex"]){let i=o.providers[s];if(!i)continue;let l=t[s];l||(l={subtotal:0,breakdown:{}},t[s]=l),l.subtotal+=i.subtotal,Number.isFinite(i.total_only_subtotal)&&(l.total_only_subtotal=Ft(l.total_only_subtotal)+Ft(i.total_only_subtotal));for(let a of Gr)Number.isFinite(i.breakdown[a])&&(l.breakdown[a]=Ft(l.breakdown[a])+Ft(i.breakdown[a]));i.replayed&&(l.replayed=!0),s==="claude"&&(typeof i.total_cost_usd=="number"&&Number.isFinite(i.total_cost_usd)?r.claude+=i.total_cost_usd:n.claude=!1)}return t.claude&&n.claude&&(t.claude.total_cost_usd=r.claude),Object.keys(t).length===0?null:{providers:t,roles:{}}}function la(e){return!e||typeof e!="object"?null:Gn({attempt:{...e,bead_id:"__attempt__"}},"__attempt__")}function pm(e){return e==="codex"?"codex":"claude"}function Pn(){return{subtotal:0,breakdown:lm(null),total_only:0,legs:[],replayed:!1,outer_count:0,outer_cost:0,outer_cost_count:0}}function Ts(e,t,n){e.subtotal+=t.subtotal,ia(t.usage)&&(e.total_only+=t.subtotal);for(let r of Gr)Number.isFinite(t.usage[r])&&(e.breakdown[r]=Ft(e.breakdown[r])+Ft(t.usage[r]));e.legs.push(t),t.replayed===!0&&(e.replayed=!0),n&&(e.outer_count+=1,typeof t.usage.total_cost_usd=="number"&&Number.isFinite(t.usage.total_cost_usd)&&(e.outer_cost+=t.usage.total_cost_usd,e.outer_cost_count+=1))}function Uc(e,t){let n={subtotal:e.subtotal,breakdown:e.breakdown};return e.total_only>0&&(n.total_only_subtotal=e.total_only),t&&(n.legs=e.legs),e.replayed&&(n.replayed=!0),n}function Wc(e){return e>=1e6?`${(e/1e6).toFixed(1)}M`:e>=1e3?`${(e/1e3).toFixed(1)}k`:String(e)}function Kr(e){return am(e)?`\u03C4 ${Wc(aa(e))}`:null}function Hn(e){let t=Kr(e);if(!t)return null;let n=e?.total_cost_usd;return typeof n=="number"&&Number.isFinite(n)?`${t} \xB7 $${n.toFixed(2)}`:t}function ko(e){if(!e||typeof e!="object")return"";let t=[`\uC785\uB825 ${Ft(e.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${Ft(e.output_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC77D\uAE30 ${Ft(e.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${Ft(e.cache_creation_input_tokens).toLocaleString("en-US")}`];typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&t.push(`$${e.total_cost_usd.toFixed(2)}`);let n=[`\uCD1D ${aa(e).toLocaleString("en-US")}`,t.join(" \xB7 ")];return e.replayed&&n.push(sa),n.join(`
`)}function Gn(e,t){let n={claude:Pn(),codex:Pn()},r={orchestrator:{claude:Pn(),codex:Pn()},implementation:{claude:Pn(),codex:Pn()},"review-consult":{claude:Pn(),codex:Pn()},subagent:{claude:Pn(),codex:Pn()}},o=new Set;for(let l of Object.values(e||{})){if(!l||l.bead_id!==t)continue;let a=l.usage;if(Fc(a)){let d=pm(l.runner),f=jc(a),g={provider:d,role:"orchestrator",attempt_id:String(l.attempt_id||""),usage:f,subtotal:Bc(d,f)};f.replayed===!0&&(g.replayed=!0),typeof l.model=="string"&&(g.model=l.model),typeof l.session_id=="string"&&(g.session_id=l.session_id),Ts(n[d],g,!0),Ts(r.orchestrator[d],g,!0)}let u=Array.isArray(l.usage_legs)?l.usage_legs:[];for(let d of u){let f=d&&d.provider==="claude"?"claude":"codex";if(!d||d.provider!=="codex"&&d.provider!=="claude"||!sm[f].includes(d.role)||!Fc(d.usage))continue;let g=typeof d.receipt_id=="string"&&d.receipt_id.length>0?d.receipt_id:null;if(!g||o.has(g))continue;o.add(g);let m=jc(d.usage),k={provider:f,role:d.role,attempt_id:String(l.attempt_id||""),usage:m,subtotal:Bc(f,m)};k.receipt_id=g,typeof d.agent_type=="string"&&(k.agent_type=d.agent_type),typeof d.agent_id=="string"&&(k.agent_id=d.agent_id),typeof d.model=="string"&&(k.model=d.model),typeof d.effort=="string"&&d.effort.trim().length>0&&(k.effort=d.effort),typeof d.session_id=="string"?k.session_id=d.session_id:typeof d.thread_id=="string"&&(k.session_id=d.thread_id),typeof d.turn_id=="string"&&(k.turn_id=d.turn_id),(typeof d.completed_at=="string"||typeof d.completed_at=="number"&&Number.isFinite(d.completed_at))&&(k.completed_at=d.completed_at),m.replayed===!0&&(k.replayed=!0),Ts(n[f],k,!1),Ts(r[k.role][f],k,!1)}}let s={};for(let l of["claude","codex"]){let a=n[l];if(a.legs.length===0)continue;let u=Uc(a,!1);l==="claude"&&a.outer_count>0&&a.outer_cost_count===a.outer_count&&(u.total_cost_usd=a.outer_cost),s[l]=u}if(Object.keys(s).length===0)return null;let i={};for(let l of["orchestrator","implementation","review-consult","subagent"]){let a={};for(let u of["claude","codex"]){let d=r[l][u];d.legs.length>0&&(a[u]={...Uc(d,!0),legs:d.legs})}Object.keys(a).length>0&&(i[l]=a)}return{providers:s,roles:i}}var fm=".chip-popover, .judgement-chip";function Yr(e){let t=null,n=!1;function r(d){return t!==null&&t.bead_id===d.bead_id&&t.chip_key===d.chip_key}function o(d){t=r(d)?null:{...d},e()}function s(){t!==null&&(t=null,e())}function i(d){let f=d.target;t!==null&&(f&&typeof f.closest=="function"&&f.closest(fm)||s())}function l(d){d.key==="Escape"&&s()}function a(){n||(n=!0,document.addEventListener("click",i),document.addEventListener("keydown",l))}function u(){n&&(n=!1,document.removeEventListener("click",i),document.removeEventListener("keydown",l))}return{toggle:o,close:s,isOpen:r,attach:a,detach:u}}function Vr(e){return c`<div
    class="chip-popover"
    role="dialog"
    aria-label=${e.title}
  >
    <div class="chip-popover__title">${e.title}</div>
    <ul class="chip-popover__lines">
      ${e.lines.map(t=>c`<li>${t}</li>`)}
    </ul>
  </div>`}var zc={running:3,paused:2,failed:1};function Kn(e){if(!e||typeof e!="object")return!1;let t=e.kind;return t==null||t==="implementation"}function Hc(e){let t=Object.values(e||{}),n=new Map;for(let r of t){if(!r||typeof r.bead_id!="string"||r.bead_id.length===0||r.kind!=="review_session"||r.status!=="running")continue;let o=typeof r.started_at=="number"?r.started_at:null,s=n.get(r.bead_id);s&&(s.started_at??0)>(o??0)||n.set(r.bead_id,{attempt:r,origin:r.origin==="click"||r.origin==="auto"?r.origin:null,started_at:o})}return n}function Gc(e,t){let n=Object.values(e||{}),r=new Set,o=new Map;for(let i of n)!i||typeof i.bead_id!="string"||(typeof i.resumed_from=="string"&&i.resumed_from.length>0&&r.add(i.resumed_from),Kn(i)&&o.set(i.bead_id,i.attempt_id));let s=new Map;for(let i of n){if(!i||typeof i.bead_id!="string"||i.bead_id.length===0||!Kn(i))continue;let l=null;if(i.status==="running")l="running";else if(i.status==="paused"&&!r.has(i.attempt_id))l="paused";else if(i.status==="failed"||i.status==="orphaned"){let d=t.get(i.bead_id),f=typeof d=="number"&&d>0&&typeof i.finished_at=="number"&&d>=i.finished_at;o.get(i.bead_id)===i.attempt_id&&!f&&typeof i.dismissed_at!="number"&&(l="failed")}if(!l)continue;let a=typeof i.started_at=="number"?i.started_at:null,u=s.get(i.bead_id);if(u){let d=zc[u.run_state],f=zc[l];if(d>f||d===f&&(u.started_at??0)>(a??0))continue}s.set(i.bead_id,{attempt:i,run_state:l,started_at:a})}return{winners:s,resumed_from_ids:r}}var Rs=["workflow_mode","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"],ua=[...Rs.filter(e=>e!=="impl_dispatch"),"quick_fix_impl_model","bdui_url"];function Kc(e){let t;try{t=new URL(e)}catch{return!1}return(t.protocol==="http:"||t.protocol==="https:")&&e===t.origin}var Yn=["orchestration_model","orchestration_effort","orchestration_speed"],Xr=[...Rs,...Yn],_m=ua.filter(e=>Xr.includes(e)),Yc=["delegated","main"],Os=["inherit","claude","codex"],$o=["default","fast"],xo=["standard","fast_track"],Ao=["codex","opus","fable","self","skip"],Ls=["codex","fable","skip"],Is=["low","medium","high","xhigh"],hn="auto";function gn(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function Vc(e){if(!gn(e)||!gn(e.runners))return[];let t=[];for(let[n,r]of Object.entries(e.runners))gn(r)&&gn(r.models)&&t.push([n,Object.keys(r.models)]);return t}function Qr(e,t){let n=Vc(e),r=t&&t!=="inherit"?n.filter(([o])=>o===t):n;return[hn,...r.flatMap(([,o])=>o)]}function Xc(e,t,n,r){if(!gn(e)||!gn(e.runners))return[hn];let o=[];for(let[s,i]of Object.entries(e.runners))if(!(!gn(i)||!gn(i.models))&&!(t&&t!=="inherit"&&s!==t))for(let[l,a]of Object.entries(i.models)){if(n&&n!==hn&&l!==n)continue;let u=r(i,a);if(Array.isArray(u))for(let d of u)typeof d=="string"&&!o.includes(d)&&o.push(d)}return[hn,...o]}function Zr(e,t,n){return Xc(e,t,n,(r,o)=>gn(o)&&Array.isArray(o.efforts)?o.efforts:r.efforts)}function da(e,t,n){return Xc(e,t,n,(r,o)=>gn(o)&&Array.isArray(o.orchestration_efforts)?o.orchestration_efforts:gn(o)&&Array.isArray(o.efforts)?o.efforts:r.efforts)}function So(e,t){let n=Vc(e);return(t?n.filter(([o])=>o===t):n).flatMap(([,o])=>o)}function Qc(e,t,n){let r={impl_runtime:e?.impl_runtime,impl_model:e?.impl_model,impl_effort:e?.impl_effort},o=r.impl_runtime==="claude"||r.impl_runtime==="codex"?r.impl_runtime:r.impl_runtime==="inherit"?n:null;return o&&(r.impl_model&&!Qr(t,o).includes(r.impl_model)&&(r.impl_model=void 0),r.impl_effort&&!Zr(t,o,r.impl_model||hn).includes(r.impl_effort)&&(r.impl_effort=void 0)),r}var mm={workflow_mode:"\uC6CC\uD06C\uD50C\uB85C \uBAA8\uB4DC",spec_review_model:"\uC2A4\uD399 \uB9AC\uBDF0\uC5B4",spec_review_effort:"\uC2A4\uD399 \uB9AC\uBDF0 effort",plan_review_model:"\uACC4\uD68D \uB9AC\uBDF0\uC5B4",plan_review_effort:"\uACC4\uD68D \uB9AC\uBDF0 effort",impl_review_model:"\uAD6C\uD604 \uB9AC\uBDF0\uC5B4",impl_review_effort:"\uAD6C\uD604 \uB9AC\uBDF0 effort",impl_runtime:"\uC704\uC784 \uB300\uC0C1",impl_model:"\uAD6C\uD604 \uBAA8\uB378",impl_effort:"\uAD6C\uD604 effort",impl_speed:"\uAD6C\uD604 \uC18D\uB3C4",orchestration_model:"\uC6CC\uCEE4 \uBAA8\uB378",orchestration_effort:"\uC6CC\uCEE4 effort",orchestration_speed:"\uC6CC\uCEE4 \uC18D\uB3C4"},ca=[..._m,...Yn],gm=[...Xr,...ua].filter((e,t,n)=>n.indexOf(e)===t&&!ca.includes(e));function Zc(e,t){let n=gn(e)?e:{},r=gn(t)?t:{},o=[];for(let i of ca){let l=n[i]??null,a=r[i]??null;l!==a&&o.push({key:i,label:mm[i]||i,before:l,after:a,kind:l===null?"added":a===null?"removed":"changed"})}let s=[];for(let i of[...gm,...Object.keys(r)])!ca.includes(i)&&!s.includes(i)&&Object.hasOwn(r,i)&&s.push(i);return{rows:o,ignored_keys:s}}function pa(e,t,n,r,o,s){return Es({key:e,choices:t,layer:"global",global:n,resolution_global:s,execution_defaults:r,runner_catalog:o})}function Jc(e,t){let n={};for(let r of ua){let o=e?.[r],s=t?.[r];o!==s&&(n[r]=typeof s=="string"&&s.length>0?s:null)}return n}function eu(e,t){let n={};for(let r of Yn){let o=e?.[r]??null,s=t?.[r]??null;o!==s&&(n[r]=typeof s=="string"&&s.length>0?s:null)}return n}var fa=[{id:"workflow",label:"\uC6CC\uD06C\uD50C\uB85C\uC6B0",keys:["workflow_mode"]},{id:"review",label:"\uB9AC\uBDF0",keys:["spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort"]},{id:"implementation",label:"\uAD6C\uD604",keys:["impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"]},{id:"worker",label:"Worker",keys:[...Yn]}],sr={workflow_mode:"\uBAA8\uB4DC",spec_review_model:"\uC0AC\uC591 \uB9AC\uBDF0",spec_review_effort:"\uC0AC\uC591 \uB9AC\uBDF0 effort",plan_review_model:"\uACC4\uD68D \uB9AC\uBDF0",plan_review_effort:"\uACC4\uD68D \uB9AC\uBDF0 effort",impl_review_model:"\uAD6C\uD604 \uB9AC\uBDF0",impl_review_effort:"\uAD6C\uD604 \uB9AC\uBDF0 effort",impl_dispatch:"\uC2E4\uD589 \uBC29\uC2DD",impl_runtime:"\uC704\uC784 \uB300\uC0C1",impl_model:"\uBAA8\uB378",impl_effort:"effort",impl_speed:"\uC18D\uB3C4",orchestration_model:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uBAA8\uB378",orchestration_effort:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 effort",orchestration_speed:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uC18D\uB3C4"},Ms={pin:"\uD540",global:"\uC804\uC5ED",base:"\uAE30\uBCF8"};function _a(e,t,n,r,o,s=null){let i=mn({pin:t,global:n,execution_defaults:r,runner_catalog:o,route:t&&typeof t.route=="string"?t.route:null,controller_runtime:s});return e.map(l=>({key:l,...i[l]}))}function tu(e,t,n,r,o,s=null){let i={pin:0,global:0,base:0};for(let l of _a(e,t,n,r,o,s))i[l.source]+=1;return i}function nu(e,t,n){return{id:e,key:t,value:typeof n=="string"?n:""}}function ru(e,t,n){return typeof t!="string"||t.length===0?null:{id:e,preset_id:t,expected_revision:n}}var Fk=[...Rs,...Yn];var ou=["orchestration_model","orchestration_effort","orchestration_speed","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_runtime","impl_model","impl_effort"];function Eo(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function Ps(e){if(!Eo(e)||!Eo(e.runners))return null;let t=Object.entries(e.runners).filter(([,n])=>Eo(n)&&Eo(n.models));return t.length>0?t:null}function xn(e,t){let n=Ps(e);if(!n||!t)return null;for(let[r,o]of n)if(Object.hasOwn(o.models,t))return r;return null}function su(e,t){return Eo(t)&&Array.isArray(t.efforts)?t.efforts.slice():Array.isArray(e.efforts)?e.efforts.slice():[]}function iu(e,t){let n=Ps(e);if(!n||!t)return[];for(let[,r]of n)if(Object.hasOwn(r.models,t))return su(r,r.models[t]);return[]}function hm(e){let t=Ps(e);if(!t)return[];let n=[];for(let[,r]of t)for(let o of Object.values(r.models))for(let s of su(r,o))n.includes(s)||n.push(s);return n}function bm(e,t){if(!t)return hm(e);let r=Ps(e)?.find(([s])=>s===t)?.[1];if(!r)return[];let o=[];for(let s of Object.keys(r.models))for(let i of iu(e,s))o.includes(i)||o.push(i);return o}function au(e,t,n){let r={impl_runtime:e.impl_runtime||"",impl_model:e.impl_model||"",impl_effort:e.impl_effort||""},o=r.impl_runtime==="inherit"?n:r.impl_runtime==="claude"||r.impl_runtime==="codex"?r.impl_runtime:null;if(r.impl_runtime==="inherit"&&!o)return r.impl_model="",r.impl_effort="",r;let s=xn(t,r.impl_model);if(r.impl_model&&(!o||s!==o))return r.impl_model="",r.impl_effort="",r;let i=r.impl_model?iu(t,r.impl_model):bm(t,o);return r.impl_effort&&i.length>0&&!i.includes(r.impl_effort)&&(r.impl_effort=""),r}var ma=new Set(["unavailable","not_applicable"]);function ir(e,t){if(typeof e!="object"||e===null)return null;let n=e[t];return typeof n=="object"&&n!==null?n:null}function lu(e){return e.filter(t=>t!==null).join(" \xB7 ")}function ar(e,t){return t===null?null:`${sr[e]}: ${t.display} (${Ms[t.source]})`}function ga(e){return e.filter(t=>t!==null).join(`
`)}function ha(e){if(typeof e!="object"||e===null)return null;let t=kr(e);if(t==="")return null;let n=(r,o)=>typeof o=="string"&&o.length>0?`${r}: ${o}`:null;return{text:t,title:ga(["\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \u2014 \uC774 attempt\uC5D0 \uAE30\uB85D\uB41C \uC2E4\uD589\uAC12",n("runner",e.runner),n(sr.orchestration_model,e.model),n(sr.orchestration_effort,e.effort),n(sr.orchestration_speed,e.speed)])}}function Jr(e,t){let n=ir(e,"orchestration_model");if(n===null||n.resolution==="unavailable")return null;let r=ir(e,"orchestration_effort"),o=ir(e,"orchestration_speed"),s=lu([xn(t,n.value??""),n.display,r!==null&&r.value!==null?r.display:null,o!==null&&o.value==="fast"?"Fast":null]);return s===""?null:{text:s,title:ga(["\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \u2014 \uD604\uC7AC \uD574\uC11D\uAC12 (\uD540 > \uD050 \uAE30\uBCF8\uAC12)",ar("orchestration_model",n),ar("orchestration_effort",r),ar("orchestration_speed",o)])}}function ym(e,t){return e===null||e.value===null||ma.has(e.resolution)?null:e.value!=="inherit"?e.value:t?`inherit\u2192${t}`:"inherit"}function vm(e){return e===null||ma.has(e.resolution)?null:e.value==="auto"?"auto":e.display}function wm(e){return e===null?null:e.value==="auto"?"auto":ma.has(e.resolution)?null:e.display}function $r(e,t){if(typeof e!="object"||e===null)return null;let n=ir(e,"impl_dispatch"),r=ir(e,"impl_runtime"),o=ir(e,"impl_model"),s=ir(e,"impl_effort"),i=ir(e,"impl_speed"),l=n!==null&&n.value==="main"?"\uBA54\uC778":lu([ym(r,t??null),vm(o),wm(s),i!==null&&i.value==="fast"?"Fast":null]);return l===""?null:{text:l,title:ga(["\uC6CC\uCEE4(\uAD6C\uD604 \uC704\uC784) \u2014 \uD604\uC7AC \uD574\uC11D\uAC12 (\uD540 > \uC804\uC5ED kv > \uAE30\uBCF8). \uC2E4\uD589 \uC911\uC774\uBA74 \uC138\uC158\uC774 \uC2DC\uC791 \uC2DC \uACE0\uC815\uD55C \uAC12\uACFC \uB2E4\uB97C \uC218 \uC788\uC74C",ar("impl_dispatch",n),ar("impl_runtime",r),ar("impl_model",o),ar("impl_effort",s),ar("impl_speed",i)])}}var km=Object.freeze(new Set(["push_not_contained","invalid_impl_review","premature_close","head_mismatch","foreign_deploy_unsupported","not_resolved"])),$m=Object.freeze(["delivery_unproven:"]);function Ds(e){let t=e&&typeof e.reason=="string"?e.reason:"";if(t.length===0||km.has(t))return"session";for(let n of $m)if(t.startsWith(n))return"session";return"settlement"}var xm=["hard_diagnosis","invariant_reasoning","verification_by_judgment","claude_bound"];var Am={hard_diagnosis:"\uC6D0\uC778\uC774 \uBD88\uBA85\uD655\uD558\uAC70\uB098 \uC7AC\uD604\uC774 \uBD88\uC548\uC815\uD574 \uAC00\uC124-\uAC80\uC99D \uB8E8\uD504\uAC00 \uD544\uC694\uD558\uB2E4",invariant_reasoning:"\uC815\uD569\uC131\uC774 \uC0C1\uD0DC\uAE30\uACC4\xB7\uB3D9\uC2DC\uC131\xB7\uBD88\uBCC0\uC2DD \uCD94\uB860\uC5D0 \uB2EC\uB824 \uC788\uB2E4",verification_by_judgment:"\uD14C\uC2A4\uD2B8\uAC00 \uBABB \uC7A1\uACE0 \uB9AC\uBDF0\uC5B4\uC758 \uCD94\uB860\uC73C\uB85C\uB9CC \uAC80\uC99D\uD560 \uC218 \uC788\uB2E4",claude_bound:"Claude \uC138\uC158 \uC790\uC0B0\xB7\uC758\uBBF8\uB860\uC5D0 \uAC15\uD558\uAC8C \uBB36\uC5EC \uC788\uB2E4"};function ba(e){return(e&&Array.isArray(e.reasons)?e.reasons:[]).map(n=>Am[n]||"").filter(n=>n.length>0)}var cu={orchestration_model:["fable"],impl_runtime:["claude"]},ya={unapplied:"\uBBF8\uC801\uC6A9",applied:"\uC801\uC6A9\uB428",diverged:"\uCD94\uCC9C\uACFC \uB2E4\uB984"};function uu(e){return typeof e=="object"&&e!==null?e:null}function du(e,t){return typeof e=="string"&&t.includes(e)?e:""}function Sm(e){return typeof e!="string"?[]:e.split("+").map(t=>t.trim()).filter(t=>xm.includes(t))}function To(e,t=e){let n=uu(e);if(!n)return null;let r=du(n.rec_orchestration_model,cu.orchestration_model);if(r.length===0)return null;let o=du(n.rec_impl_runtime,cu.impl_runtime),s={orchestration_model:r};o.length>0&&(s.impl_runtime=o);let i=uu(t)||{},l=Object.keys(s),a=0,u=0;for(let f of l){let g=i[f];typeof g=="string"&&g.length>0&&(a+=1,g===s[f]&&(u+=1))}let d=a===0?"unapplied":u===l.length?"applied":"diverged";return{reasons:Sm(n.rec_reason),rec:s,state:d}}function Ns(e){if(!e||typeof e!="object")return"";let t=ba(e),n=ya[e.state]||"",r=["\uBCF5\uC7A1\uD55C \uC791\uC5C5\uC73C\uB85C \uD310\uC815\uB428"];return t.length>0&&r.push(`\uC0AC\uC720: ${t.join(" \xB7 ")}`),n.length>0&&r.push(`\uC0C1\uD0DC: ${n}`),r.join(`
`)}function qs(e){return e.replace(/\/+$/,"")}function Em(e,t){let n=qs(e),r=qs(t);return n===r||r.startsWith(`${n}/`)||n.startsWith(`${r}/`)}function Fs(e,t){let n=new Set;for(let r of e)for(let o of t){if(!Em(r,o))continue;let s=qs(r),i=qs(o);n.add(s.length>=i.length?s:i)}return[...n].sort()}function va(e,t){return`${e}\0${t}`}function pu(e){let t=new Map;for(let n of Array.isArray(e?.running)?e.running:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"running",state:"running"});for(let n of Array.isArray(e?.pr_wait)?e.pr_wait:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"pr_wait",state:"pr_wait"});for(let n of Array.isArray(e?.queue_groups)?e.queue_groups:[]){let r=Array.isArray(n.sublanes?.parallel)?n.sublanes.parallel:Array.isArray(n.items)?n.items:[];for(let o of r)t.set(o.id,{root_dir:o.root_dir,workspace_name:o.workspace_name,lane:"parallel",position:o.queue_position});for(let o of Array.isArray(n.sublanes?.serial)?n.sublanes.serial:[])for(let s of o.items)t.set(s.id,{root_dir:s.root_dir,workspace_name:s.workspace_name,lane:o.id,position:s.queue_position})}for(let n of Array.isArray(e?.runnable)?e.runnable:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"runnable",state:"runnable"});for(let n of Array.isArray(e?.done)?e.done:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"done",state:"done"});return t}function wa(e,t){let n=Array.isArray(t)?t:[],r=e.indexOf("-"),o=r>0?e.slice(0,r):e;return n.some(s=>typeof s?.issue_prefix=="string"&&s.issue_prefix===o)?"internal":n.length>0&&n.every(s=>typeof s?.issue_prefix=="string")?"external":"unknown"}function Co(e){if(e.state==="running")return"\uC2E4\uD589\uC911";if(e.state==="pr_wait")return"PR \uB300\uAE30";if(e.state==="runnable")return"\uC2E4\uD589\uAC00\uB2A5";if(e.state==="done")return"\uC644\uB8CC";let t=e.lane==="parallel"?"\uBCD1\uB82C":e.lane;return`${e.workspace_name} \xB7 ${t} #${e.position}`}function fu(e,t,n,r){let o=n.get(e);if(!!(o&&t&&o.root_dir===t.root_dir&&o.lane===t.lane&&typeof o.position=="number"&&typeof t.position=="number"&&o.position<t.position))return{id:e,label:`\u{1F512} ${e} (\uAC19\uC740 \uB808\uC778 \uC55E)`,location_label:"\uAC19\uC740 \uB808\uC778 \uC55E",scope:null,same_lane_ahead:!0};if(o)return{id:e,label:`\u{1F512} ${e} (${Co(o)})`,location_label:Co(o),scope:null,same_lane_ahead:!1};let i=wa(e,r),l=i==="internal"?"\uBBF8\uC801\uC7AC":i==="external"?"\uC678\uBD80":"\uC704\uCE58 \uBBF8\uD655\uC778";return{id:e,label:`\u{1F512} ${e} (${l})`,location_label:l,scope:i,same_lane_ahead:!1}}function _u(e){let t=Array.isArray(e)?e:[],n=new Map,r=new Map,o=new Map;for(let l of t)for(let a of Array.isArray(l.sublanes?.serial)?l.sublanes.serial:[]){let u=va(l.root_dir,a.id);n.set(u,{root_dir:l.root_dir,workspace_name:l.name,lane:a.id}),o.set(u,[]);for(let d of Array.isArray(a.items)?a.items:[])r.set(d.id,u)}for(let l of t)for(let a of Array.isArray(l.sublanes?.serial)?l.sublanes.serial:[]){let u=va(l.root_dir,a.id),d=Array.isArray(a.items)?a.items[0]:null,g=!!d&&d.queue_index===0&&(!Array.isArray(a.occupied_by)||a.occupied_by.length===0)&&Array.isArray(d.blocked_by)?d.blocked_by:[],m=o.get(u);if(m)for(let k of g){let R=r.get(k);R&&R!==u&&!m.includes(R)&&m.push(R)}}let s=(l,a)=>{let u=new Set,d=[l];for(;d.length>0;){let f=d.pop();if(f===a)return!0;!f||u.has(f)||(u.add(f),d.push(...o.get(f)||[]))}return!1},i=new Map;for(let[l,a]of o){let u=[];for(let d of a){let f=n.get(d);s(d,l)&&f&&u.push(f)}u.length>0&&i.set(l,u)}return i}function mu(e,t){return va(e,t)}async function Tm(e){let t=await on(e);ke(t?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",t?"success":"error",1200)}function eo(e){return typeof e!="string"||e.length===0?"":c`<span class="worker-ev__copyline"
    ><code class="worker-ev__path">${e}</code
    ><button
      type="button"
      class="worker-ev__copy"
      data-seam="log-path-copy"
      title="로그 경로 복사"
      aria-label=${`\uB85C\uADF8 \uACBD\uB85C \uBCF5\uC0AC: ${e}`}
      @click=${()=>{Tm(e)}}
    >
      ⧉
    </button></span
  >`}function Us(e){return typeof e=="string"&&e.length>=7?e.slice(0,7):"\u2014"}function bu(e){return e==="session"?"bead\uAC00 in_progress\uB85C \uC7A1\uD78C \uB4A4 \uB2EB\uD788\uAE30\uAE4C\uC9C0\uC758 \uACBD\uACFC":"attempt \uC2E4\uD589 \uC2DC\uAC04 \uD569\uC0B0 (\uC7AC\uAC1C \uC138\uC158 \uD3EC\uD568)"}function Ar(e){if(typeof e!="number"||!Number.isFinite(e)||e<0)return"\u2014";if(e<1e3)return`${Math.round(e)}ms`;let t=e/1e3;if(t<60)return`${t.toFixed(1)}\uCD08`;let n=Math.floor(t/60);if(n<60)return`${n}\uBD84 ${Math.round(t-n*60)}\uCD08`;let r=Math.floor(n/60),o=n%60;return`${r}\uC2DC\uAC04 ${o}\uBD84`}function yu(e,t){if(typeof e!="object"||e===null)return[];let n=!1,r=!1;for(let o of Object.values(e)){if(typeof o!="object"||o===null)continue;let s=o;s.bead_id!==t||s.kind!=="review_session"||(n=!0,r=r||s.origin==="auto")}return n?[r?"\uB9AC\uBDF0 \xB7 \uC790\uB3D9":"\uB9AC\uBDF0"]:[]}function gu(e){return e==="auto"||e==="click"?e:null}function vu(e,t){if(typeof e!="object"||e===null)return{active:!1,failure:null,origin:null};let n=!1,r=null,o=-1,s=null,i=null,l=-1;for(let a of Object.values(e)){if(typeof a!="object"||a===null)continue;let u=a;if(u.bead_id!==t||u.kind!=="review_session")continue;if(u.status==="pending"||u.status==="running"){n=!0;let f=typeof u.started_at=="number"?u.started_at:0;f>=o&&(o=f,r=gu(u.origin));continue}if(u.status!=="failed")continue;let d=typeof u.finished_at=="number"?u.finished_at:0;d>=l&&(l=d,s=typeof u.cause=="string"&&u.cause.length>0?u.cause:null,i=gu(u.origin))}return n?{active:!0,failure:null,origin:r}:{active:!1,failure:s,origin:i}}function wu(e,t){if(typeof e!="object"||e===null)return null;let n=0,r=!1;for(let o of Object.values(e)){if(typeof o!="object"||o===null)continue;let s=o;if(s.bead_id!==t)continue;let i=s.started_at,l=s.finished_at;typeof i!="number"||typeof l!="number"||!Number.isFinite(i)||!Number.isFinite(l)||l<i||(n+=l-i,r=!0)}return r?n:null}function Ws(e){if(typeof e!="number"||!Number.isFinite(e)||e<=0)return"";let t=new Date(e);return`${String(t.getHours()).padStart(2,"0")}:${String(t.getMinutes()).padStart(2,"0")}`}function Cm(e,t){let n=Array.isArray(e)?e:[],r=Array.isArray(t)?t:[];if(n.length===0&&r.length===0)return null;let o=null;for(let i of n)i.kind!=="deploy"||i.state!=="succeeded"||typeof i.target_sha!="string"||(!o||(typeof i.finished_at=="number"?i.finished_at:0)>(typeof o.finished_at=="number"?o.finished_at:0))&&(o=i);let s=n.filter(i=>i.state==="failed"&&!i.dismissed&&!i.superseded_by).length+r.length;return{deploy:o?{sha:Us(o.target_sha),at:typeof o.finished_at=="number"?o.finished_at:null,elapsed_ms:typeof o.elapsed_ms=="number"?o.elapsed_ms:null}:null,unresolved:s,badge:s>0?{tone:"act",label:`\uD574\uACB0 \uD544\uC694 ${s}`}:{tone:"quiet",label:"\uBAA8\uB450 \uC815\uC0C1"}}}function ku(e,t){let n=Cm(e,t);return n?c`<button
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
            title=${n.deploy.at?Yt(n.deploy.at):""}
            >${Ws(n.deploy.at)}${n.deploy.elapsed_ms!==null?` \xB7 ${Ar(n.deploy.elapsed_ms)}`:""}</span
          >
        </span>`:""}
    <span class="worker-repo-strip__spacer"></span>
    <span
      class="worker-repo-strip__badge worker-repo-strip__badge--${n.badge.tone}"
      >${n.badge.label}</span
    >
  </button>`:""}function to(e){let t=rn(e.created_at),n=rn(e.updated_at);return!t&&!n?"":c`<div class="worker-mini__meta">
    ${t?c`<span title=${`\uC0DD\uC131 ${Yt(e.created_at)}`}
          >생성 ${t}</span
        >`:""}${t&&n?c`<span>·</span>`:""}${n?c`<span title=${`\uC218\uC815 ${Yt(e.updated_at)}`}
          >수정 ${n}</span
        >`:""}
  </div>`}function Rm(e){return!e||e==="requested"?"\uBC31\uC5C5 \uC911":e==="backup_verified"||e==="signaled"?"runner \uC885\uB8CC \uC911":e==="merged_revert"||e.startsWith("revert_")?"revert PR \uB300\uAE30":e.startsWith("rollback_")?"\uC6D0\uBCF5 \uBC30\uD3EC \uC911":e==="runner_terminated"||e.startsWith("pr_")||e.includes("ref_")||e.includes("worktree")||e.startsWith("bead_")?"PR \uC815\uB9AC \uC911":`\uD3D0\uAE30 \uCC98\uB9AC \uC911 (${e})`}function Ro(e,t){return t==="merged"?`${e}: \uC774\uBBF8 merge\uB41C \uAD6C\uD604\uC785\uB2C8\uB2E4. \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 revert PR\uC744 \uC0DD\uC131\uD558\uBA70, \uC2E4\uC81C \uC6D0\uBCF5\uC740 \uC0AC\uB78C\uC774 \uADF8 PR\uC744 merge\uD55C \uB4A4 \uC644\uB8CC\uB429\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`:`${e}: \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 runner/PR/branch/worktree\uB97C \uC815\uB9AC\uD558\uACE0 \uC774\uC288\uB97C \uD6C4\uBCF4\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`}function zs(e){let t=["\uD3D0\uAE30 \uC644\uB8CC"];return e.operation_id&&t.push(`\uC791\uC5C5 ${e.operation_id}`),e.receipt?.archive_path&&t.push(`\uBC31\uC5C5 ${e.receipt.archive_path}`),e.receipt?.original_pr?.url&&t.push(`\uC6D0\uBCF8 PR ${e.receipt.original_pr.url}`),e.receipt?.revert_pr?.url&&t.push(`revert PR ${e.receipt.revert_pr.url}`),t.join(" \xB7 ")}function Vn(e,t,n={}){let o=Object.values(e&&typeof e=="object"?e:{}).filter(f=>f&&f.bead_id===t&&f.phase!=="done").sort((f,g)=>(f.requested_at||0)-(g.requested_at||0)).at(-1),s=typeof n.attempt_id=="string"&&n.attempt_id.length>0?n.attempt_id:typeof o?.attempt_id=="string"?o.attempt_id:null,i=n.external?"\uC678\uBD80 PR\uC740 Worker\uAC00 \uC18C\uC720\uD558\uC9C0 \uC54A\uC544 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":n.done?"\uC644\uB8CC\uB41C \uC791\uC5C5\uC740 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":n.merge_active?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":n.merge_queued?"\uBA38\uC9C0 \uD050\uC5D0 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 [\uCDE8\uC18C]\uD558\uC138\uC694":n.conflict_active?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 \uC138\uC158\uC744 \uC815\uB9AC\uD558\uC138\uC694":n.cleanup_active?"\uC815\uB9AC \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":null,l=typeof o?.last_error=="string"?o.last_error:null,a=o?Rm(o.phase):null,u=o?.kind==="stale_work_backup_fresh",d=n.merged||o?.mode==="merged_revert"?"merged":"unmerged";return{action:!n.external&&!n.done,enabled:!i&&(!o||!!l),label:u?l?"\uBC31\uC5C5 \uC815\uB9AC \uC7AC\uC2DC\uB3C4":"\uBC31\uC5C5 \uD6C4 \uC0C8\uB85C \uC2DC\uC791":l?"\uC7AC\uC2DC\uB3C4":"\uD3D0\uAE30",title:i||(l?u?`\uBC31\uC5C5 \uB4A4 \uC815\uB9AC \uC2E4\uD328: ${l} \u2014 \uC6D0\uBCF8\uACFC \uAC80\uC99D \uC601\uC218\uC99D\uC744 \uBCF4\uC874\uD55C \uCC44 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:`\uD3D0\uAE30 \uC2E4\uD328: ${l} \u2014 \uAC19\uC740 \uC791\uC5C5\uC744 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:o?`${a||"\uD3D0\uAE30 \uCC98\uB9AC \uC911"} \u2014 \uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694`:d==="merged"?"\uBCD1\uD569\uB41C \uBCC0\uACBD\uC744 \uC6D0\uBCF5 PR\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4":"\uBC31\uC5C5 \uD6C4 runner\xB7PR\xB7\uC6CC\uD06C\uD2B8\uB9AC\xB7\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4"),attempt_id:s,operation:o||null,progress:a,error:l,confirmation:d}}function $u(e){if(!e||e.quickfix_lane!==!0)return!1;let t=e.quickfix_landing;return!t||typeof t!="object"?!1:["repo_operations","branch_cleanup","parent_close"].includes(t.cursor)}function Bs(e){let t=e.discard;if(!t||!t.operation)return"";let n=t.operation,r=n.kind==="stale_work_backup_fresh"&&!t.error?null:n.backup?.path,o=n.original_pr,s=n.revert_pr;return c`<div
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
  </div>`}var Om={dirty_unique:"\uCD5C\uC2E0 base\uC5D0 \uC5C6\uB294 \uB85C\uCEEC \uBCC0\uACBD\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",untracked_present:"\uCD94\uC801\uB418\uC9C0 \uC54A\uC740 \uD30C\uC77C\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",branch_ahead:"\uB85C\uCEEC branch\uC5D0 \uACE0\uC720 commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",head_ahead:"worktree HEAD\uC5D0 \uACE0\uC720 commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",ahead_not_contained:"\uB85C\uCEEC branch\uC758 \uACE0\uC720 commit\uC774 \uCD5C\uC2E0 base\uC5D0 \uD3EC\uD568\uB410\uC74C\uC744 \uC99D\uBA85\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",ahead_merge_commit:"\uB85C\uCEEC branch\uC5D0 \uC790\uB3D9 \uC815\uB9AC\uD560 \uC218 \uC5C6\uB294 merge commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",ahead_submodule_path:"\uB85C\uCEEC branch\uC758 \uACE0\uC720 commit\uC774 submodule \uACBD\uB85C\uB97C \uBCC0\uACBD\uD569\uB2C8\uB2E4",archive_failed:"\uACE0\uC720 commit \uBC31\uC5C5\uC744 \uC548\uC804\uD558\uAC8C \uAC80\uC99D\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",ref_delete_failed:"\uD655\uC778\uB41C local branch\uB97C \uC548\uC804\uD558\uAC8C \uC0AD\uC81C\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",resume_available:"\uC774\uC5B4\uAC08 \uC218 \uC788\uB294 \uC774\uC804 Worker session\uC774 \uC788\uC2B5\uB2C8\uB2E4",observe_failed:"Git \uC0C1\uD0DC\uB97C \uC548\uC804\uD558\uAC8C \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",identity_changed:"\uD655\uC778 \uC911 worktree \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4",ownership_unknown:"Worker \uC18C\uC720 worktree\uC778\uC9C0 \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"};function xu(e,t=!1){if(!e||typeof e!="object")return null;let n=e;if(n.reason!=="worktree_stale_work"||!n.stale_work||typeof n.stale_work!="object")return null;let r=n.stale_work,o=r.residue==="branch"?"branch":"worktree",s=r.state==="unique"?"unique":"unknown",i=r.summary&&typeof r.summary=="object"?r.summary:{};function l(u){return Number.isInteger(i[u])?Number(i[u]):0}let a=typeof r.cause=="string"?r.cause:"observe_failed";return{residue:o,state:s,title:o==="branch"?"\uC774\uC804 \uBE0C\uB79C\uCE58 \uBCF4\uC874\uB428":s==="unique"?"\uC774\uC804 \uC791\uC5C5 \uBCF4\uC874\uB428":"\uC774\uC804 \uC791\uC5C5 \uC0C1\uD0DC \uD655\uC778 \uC2E4\uD328",cause:Om[a]||"\uC548\uC804\uD558\uAC8C \uC790\uB3D9 \uC815\uB9AC\uD560 \uC218 \uC5C6\uB294 \uC774\uC804 \uC791\uC5C5\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",summary:o==="branch"?`\uACE0\uC720 commit ${l("branch_ahead")}`:[`staged ${l("staged_count")}`,`unstaged ${l("unstaged_count")}`,`untracked ${l("untracked_count")}`,`branch ahead ${l("branch_ahead")}`,`HEAD ahead ${l("head_ahead")}`].join(" \xB7 "),action_id:typeof r.action_id=="string"?r.action_id:"",can_resume:r.can_resume===!0,can_continue:r.can_continue===!0,can_backup_fresh:r.can_backup_fresh===!0,can_recheck:r.can_recheck===!0,locked:t}}function Hs(e,t={}){if(!e||!e.orchestration&&!e.worker)return"";let n=t.pin===!0?" exec-chip--pin":"",r=t.pin===!0?`
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
      >`:""}`}function js(e,t){let n=`worker-dep worker-dep--${t}${e.foreign?" worker-dep--foreign":""}`;return e.openable===!0?c`<button
        type="button"
        class=${`${n} worker-dep__open`}
        data-dep-id=${e.id}
        data-root-dir=${e.root_dir||""}
        title=${e.title||""}
      >
        ${e.label}
      </button>`:c`<span class=${n} title=${e.title||""}>${e.label}</span>`}function Lm(e){return{id:e.id,label:`\u29C9 ${e.id}`,title:[`\uACB9\uCE68 \xB7 ${e.location_label}`,...e.prefixes].join(`
`),openable:!0,...e.root_dir?{root_dir:e.root_dir}:{}}}function ka(e){return Array.isArray(e)?e.slice().sort((t,n)=>t.id<n.id?-1:t.id>n.id?1:0):[]}function Im(e,t=!1){return e?c`<button
    type="button"
    class="ctl-chip ctl-chip--label judgement-chip worker-card__spec-after-blocker"
    data-chip-key="spec_after_blocker"
    aria-expanded=${t?"true":"false"}
    title="선행의 결과가 설계 전제라 스펙도 선행 뒤에 씁니다"
  >
    스펙 대기
  </button>`:""}function Gs(e,t=""){if(!e)return t===""?"":c`<div class="worker-deps worker-deps--primary">
          ${t}
        </div>`;let n=ka(e.predecessors),r=Array.isArray(e.released)?e.released:[],o=ka(e.dependents),s=ka(e.overlaps),i=e.scope_missing===!0,l=e.armed_lane||null,a=!!l||n.length>0||o.length>0||t!=="",u=r.length>0||s.length>0||i;return!a&&!u?"":c`${a?c`<div class="worker-deps worker-deps--primary">
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
            >`:""}${n.map(d=>js(d,"pred"))}${t}${o.map(d=>js(d,"dependents"))}
      </div>`:""}${u?c`<div class="worker-deps worker-deps--secondary">
        ${r.map(d=>js(d,"released"))}${s.map(d=>js(Lm(d),"overlap"))}${i?c`<span
              class="worker-dep worker-dep--muted"
              title="겹침 판정 불가 — 아티팩트가 있으면 스펙/플랜 front-matter, 없으면 description \`## scope\`에 선언 필요"
              >scope 없음</span
            >`:""}
      </div>`:""}`}function Ks(e){return e?c`<button
    type="button"
    class="worker-dep worker-dep--lane mon-lane__chip"
    data-lane-id=${e.lane_id}
    title="이 연결 레인으로 이동"
  >
    ${e.label}
  </button>`:""}function Ys(e){if(!e)return"";let t=e.chips||{},n=t.route||e.route,r=t.route_source==="derived"||e.route_source==="derived";return n?c`<span
    class="ctl-chip ctl-chip--route${r?" is-derived":""}"
    title=${r?"route \uBBF8\uD540 (metadata unset)":"route"}
    >${r?"unset":n}</span
  >`:""}function Mm(e,t=!1){let n=e?e.quick_fix_review:null;if(!n)return"";let r=n.state;if(r!=="reviewed"&&r!=="stale")return"";let o=Array.isArray(n.missing)?n.missing:[],s=[r==="reviewed"?"quick_fix self-review \uC601\uC218\uC99D\uC774 \uC9C0\uAE08 \uBCF8\uBB38\uACFC \uC77C\uCE58\uD569\uB2C8\uB2E4":"quick_fix self-review \uC601\uC218\uC99D\uC774 \uC9C0\uAE08 \uBCF8\uBB38\uACFC \uB2E4\uB985\uB2C8\uB2E4",...o].join(`
`);return c`<button
    type="button"
    class="ctl-chip judgement-chip worker-card__qfr worker-card__qfr--${r}"
    data-chip-key="qfr"
    aria-expanded=${t?"true":"false"}
    title=${s}
  >
    ${r==="reviewed"?"\uB9AC\uBDF0 \u2713":"\uB9AC\uBDF0 stale"}
  </button>`}function Au(e){return e?c`<button
    type="button"
    class="ctl-chip ctl-chip--from"
    data-from-id=${e}
    title=${`\uCD9C\uCC98 ${e} \uC5F4\uAE30`}
  >
    ↩ from ${e}
  </button>`:""}function Vs(e,t=!1){return e?c`<button
    type="button"
    class="ctl-chip ctl-chip--label judgement-chip worker-card__rec"
    data-chip-key="rec"
    data-state=${e.state}
    aria-expanded=${t?"true":"false"}
    title=${Ns(e)}
  >
    ${"\uBCF5\uC7A1"}
  </button>`:""}var Pm={absent:"\uC2E4\uD589 \uC601\uC218\uC99D\uC774 \uAE30\uB85D\uB418\uC9C0 \uC54A\uC558\uB2E4 \u2014 \uACFC\uAC70 Bead\xB7\uC678\uBD80 \uACBD\uB85C PR\uC740 \uC6D0\uB798 \uC5C6\uB2E4",unparsable:"\uC601\uC218\uC99D \uAC12\uC744 \uC77D\uC744 \uC218 \uC5C6\uB2E4 \u2014 40hex SHA\uB098 `delegated:`/`main:` \uD615\uC2DD\uC774 \uC544\uB2C8\uB2E4",effort_unknown:"effort \uD1A0\uD070\uC774 harness \uC5B4\uD718 \uBC16\uC774\uB2E4 \u2014 \uBAA8\uB378\xB7SHA\xB7unit\uC740 \uC720\uD6A8\uD558\uB2E4",main_reason_retired:"`main:` \uC0AC\uC720\uAC00 \uACE0\uC815 4\uD1A0\uD070(bead\xB7quick_fix_default\xB7phase_line\xB7takeover) \uBC16\uC774\uB2E4",main_receipt_unbacked:"`main:` \uC0AC\uC720\uB97C \uB4B7\uBC1B\uCE68\uD558\uB294 \uBA54\uD0C0\uB370\uC774\uD130(impl_dispatch\xB7route\xB7planned_execution\xB7quick_fix \uAE30\uBCF8 dispatch)\uAC00 \uC5C6\uB2E4",takeover_lineage_missing:"`main:takeover`\uC778\uB370 resolved \uBAA8\uB378\uACFC \uC77C\uCE58\uD558\uB294 \uC644\uB8CC\uB41C \uC704\uC784 \uC138\uC158\uC774 \uC5C6\uB2E4",takeover_lineage_unobservable:"`main:takeover`\uC778\uB370 \uC704\uC784 \uACC4\uBCF4\uB97C \uBAA8\uB2C8\uD130\uAC00 \uBCFC \uC218 \uC5C6\uB2E4(Codex \uBC16 \uB7F0\uD0C0\uC784)"};function Dm(e,t=!1){let n=Su(e);if(n.length===0)return"";let r=n.length>1?`\uC601\uC218\uC99D \xB7 ${n[0]} +${n.length-1}`:`\uC601\uC218\uC99D \xB7 ${n[0]}`;return c`<button
    type="button"
    class="ctl-chip ctl-chip--label judgement-chip worker-card__receipt"
    data-chip-key="receipt"
    data-bead-id=${e.id}
    aria-expanded=${t?"true":"false"}
    title=${n.join(", ")}
  >
    ${r}
  </button>`}function Su(e){let t=e.receipt_badge?e.receipt_badge.codes:null;return Array.isArray(t)?t.filter(n=>typeof n=="string"&&n.length>0):[]}function Eu(e,t){return!e||typeof t!="number"?"":c`<a
    class="worker-mini__pr"
    href=${e}
    target="_blank"
    rel="noreferrer noopener"
    title="PR 열기"
    >#${t} ↗</a
  >`}function Xs(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=Math.max(0,Math.min(4,Math.trunc(e)));return c`<span class="worker-pri" title=${`\uC6B0\uC120\uC21C\uC704 P${t}`}
    >P${t}</span
  >`}function Nm(e){let t=Array.isArray(e.badges)?e.badges:[],n=en(e.usage),r=Hn(e.usage),o=rn(e.done_at);return c`<div
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
      ${Eu(e.pr_url,e.pr_number)}${o?c`<span
            class="worker-mini__done-at"
            title=${`\uC644\uB8CC ${Yt(e.done_at)}`}
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
              >`):r?c`<span class="worker-usage" title=${ko(e.usage)}
              >${r}</span
            >`:""}
      ${typeof e.work_ms=="number"?c`<span
            class="worker-mini__work"
            title=${bu(e.work_kind)}
            >작업 ${Ar(e.work_ms)}</span
          >`:""}
    </div>
  </div>`}function An(e,t={}){if(e.lane==="done"&&e.done_layout==="three_line")return Nm(e);let n=e.draggable&&!e.done,r=Array.isArray(e.badges)?e.badges:[],o=en(e.usage),s=Hn(e.usage),i=e.merge_step||null,l=e.lane==="pr_wait"||!!e.revise_action||!!e.stale_work,a=e.lane==="done"&&!l,u=a?rn(e.done_at):"",d=n?c`<span class="worker-mini__grip" aria-hidden="true">⠿</span>`:"",f=typeof e.seq=="number"?c`<span class="worker-mini__seq" aria-hidden="true"
          >${e.seq}</span
        >`:"",g=e.workspace_name?c`<span class="worker-mini__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:"",m=c`<span class="worker-mini__id" title="클릭하면 ID 복사"
    >${e.id}</span
  >`,k=e.lane==="done"?"":Ys(e.workflow),R=e.lane==="done"?"":Au(e.from_id),z=Xs(e.priority),X=c`<span class="worker-mini__title">${e.title}</span>`,ee=Eu(e.pr_url,e.pr_number),W=r.map(be=>be===e.live_badge?c`<span
          class="worker-mini__badge worker-mini__badge--activity"
          title="서버가 이 PR을 처리하는 중입니다"
          ><span class="act-dot" aria-hidden="true"></span>${be}</span
        >`:c`<span
          class="worker-mini__badge${e.alert?" worker-mini__badge--alert":""}"
          title=${be===e.completion_badge&&e.completion_title||""}
          >${be}</span
        >`),q=e.reason?c`<span class="worker-mini__reason">${e.reason}</span>`:"",O=o.length>0?o.map(be=>c`<span class="worker-usage" title=${be.tooltip}
              >${be.label}</span
            >`):s?c`<span class="worker-usage" title=${ko(e.usage)}
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
      </button>`:"",U=e.cancel_action?c`<button
        type="button"
        class="worker-mini__merge-cancel"
        data-bead-id=${e.id}
        ?disabled=${e.cancel_enabled===!1}
        title=${e.cancel_title||""}
      >
        취소
      </button>`:"",ue=e.discard,M=ue?.action||e.discard_action?c`<button
          type="button"
          class="worker-mini__discard"
          data-bead-id=${e.id}
          data-attempt-id=${ue?.attempt_id||""}
          data-operation-id=${ue?.operation?.operation_id||""}
          data-discard-mode=${ue?.confirmation||"unmerged"}
          ?disabled=${ue?!ue.enabled:e.discard_enabled===!1}
          title=${ue?ue.title:e.discard_enabled===!1?e.discard_title||"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"PR\uC744 \uB2EB\uACE0 \uC6CC\uD06C\uD2B8\uB9AC/\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4 (\uB418\uB3CC\uB9B4 \uC218 \uC5C6\uC74C). \uB2E4\uC2DC \uC2E4\uD589\uD558\uB824\uBA74 \uD6C4\uBCF4 \uB808\uC778\uC5D0\uC11C \uB300\uAE30 \uB808\uC778\uC73C\uB85C \uC62E\uAE30\uC138\uC694"}
        >
          ${ue?.label||"\uD3D0\uAE30"}
        </button>`:"",B=e.stale_work||null,Q=B?c`${B.can_resume||B.can_continue?c`<button
            type="button"
            class="worker-mini__stale-continue"
            data-bead-id=${e.id}
            data-action-id=${B.action_id}
            ?disabled=${B.locked}
          >
            기존 작업 이어가기
          </button>`:""}${B.can_backup_fresh?c`<button
            type="button"
            class="worker-mini__stale-backup"
            data-bead-id=${e.id}
            data-action-id=${B.action_id}
            ?disabled=${B.locked}
          >
            백업 후 새로 시작
          </button>`:""}${B.can_recheck?c`<button
            type="button"
            class="worker-mini__stale-recheck"
            data-bead-id=${e.id}
            data-action-id=${B.action_id}
            ?disabled=${B.locked}
          >
            다시 확인
          </button>`:""}`:"",re=B?c`<div class="worker-mini__stale">
        <strong>${B.title}</strong>
        <span>${B.summary}</span>
        <span>${B.cause}</span>
        ${B.can_backup_fresh?c`<small
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
        </button>`:"",he=!!(e.lane!=="pr_wait"&&!e.done&&e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker)),pe=Vs(e.rec,xr(e,"rec")),P=Dm(e,xr(e,"receipt")),Ae=Ks(e.cross_lane_chip),Se=eo(e.log_path),E=g||Ae||k||R||he||pe||P||O||Se?c`<div class="worker-chips">
          ${g}${Ae}${k}${R}${he?Hs(e.exec_chips,{pin:e.exec_chips_pinned===!0}):""}${pe}${P}${O}${Se}${$a(e)}
        </div>`:"",Z=Gs(e.dependency_chips),Ce=Bs(e),ge=t.actions?t.actions:"",Te=!!(i||e.merge_action||e.cancel_action||e.discard_action||ue?.operation||e.revise_action||B);return c`<div
    class="worker-mini${l?" worker-mini--card":""}${n?"":" worker-mini--static"}${e.done?" worker-mini--done":""}${e.ghost?" worker-mini--ghost":""}${i?" worker-mini--merging":""}${i?.failed?" worker-mini--merge-failed":""}${e.external?" worker-mini--external":""}"
    style=${i?`--progress: ${i.percent}%`:""}
    draggable=${n?"true":"false"}
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    ${a?c`<div class="worker-mini__row1">
            ${g}${m}${z}${R}${ee}${X}${ge}
          </div>
          <div class="worker-mini__row2">
            ${O}${u?c`<span
                  class="worker-mini__done-at"
                  title=${`\uC644\uB8CC ${Yt(e.done_at)}`}
                  >완료 ${u}</span
                >`:""}${typeof e.work_ms=="number"?c`<span
                  class="worker-mini__work"
                  title=${bu(e.work_kind)}
                  >작업 ${Ar(e.work_ms)}</span
                >`:""}${W}${I}
            <span class="worker-mini__actions"
              >${F}${U}${M}</span
            >
            ${to(e)}
          </div>`:l?c`<div class="worker-mini__head">
              ${d}${f}${m}${z}${ee}${W}${q}${ge}
            </div>
            <div class="worker-mini__body">${X}${re}</div>
            ${Z}${E}${Te?c`<div class="worker-mini__foot">
                  ${I}
                  <span class="worker-mini__actions"
                    >${F}${U}${M}${Ee}${Q}</span
                  >
                  ${Bs(e)}
                </div>`:""}
            ${to(e)}`:c`<div class="worker-mini__line">
              ${d}${f}${m}${z}${X}${ee}${W}${q}${I}${F}${U}${M}${ge}
            </div>
            ${Z}${E}${Ce} ${to(e)}`}
  </div>`}function qm(e,t){let n,r=[];for(let o of e){let s=o.group||"";s.length>0&&s!==n&&r.push(c`<div class="worker-card__place-group">${s}</div>`),n=s,r.push(c`<button
        type="button"
        class="worker-card__place-lane${s.length>0?" worker-card__place-lane--nested":""}"
        data-bead-id=${t}
        data-lane=${o.id}
        ?disabled=${o.disabled===!0}
        title=${o.title||`${o.label} \uB300\uAE30 \uB9E8 \uB4A4\uC5D0 \uCD94\uAC00`}
      >
        <span>${o.label}</span>
        ${typeof o.count=="number"?c`<span class="worker-card__place-count">${o.count}</span>`:""}
      </button>`)}return c`${r}`}var Tu={external_roundtrip:"\uD558\uB124\uC2A4 \uBC16 \uC0C1\uB300\uC640 \uC608\uCE21 \uBD88\uAC00 \uC655\uBCF5 \uBC18\uBCF5 \u2014 \uB2E4\uB978 rig \uC138\uC158\xB7\uC0AC\uB78C\xB7\uC678\uBD80 \uC2DC\uC2A4\uD15C",user_feedback_loop:"\uC9C4\uD589 \uC911 \uC0AC\uC6A9\uC790 \uD53C\uB4DC\uBC31 \uC5C6\uC774\uB294 \uD488\uC9C8\uC774 \uB0AE\uC74C \u2014 \uBB38\uC548\xB7\uC124\uACC4 \uC138\uBD80\xB7\uBC29\uD5A5 \uC120\uD0DD"};function Aa(e,t){if(t==="rec"){let n=e.rec;if(!n)return null;let r=ya[n.state]||"";return{title:"\uBCF5\uC7A1\uD55C \uC791\uC5C5\uC73C\uB85C \uD310\uC815\uB428",lines:[...ba(n),...r.length>0?[`\uC0C1\uD0DC: ${r}`]:[],"\uC801\uC6A9\uC740 \uC774\uC288 \uC0C1\uC138\uC758 \uC2E4\uD589 \uC124\uC815 \uD3B8\uC9D1\uAE30\uC5D0\uC11C"]}}if(t==="session_preferred"){if(e.session_preferred!==!0)return null;let n=Tu[e.session_preferred_reason||""]||"";return{title:"\uC6CC\uCEE4\uB85C \uB3CC\uB9B4 \uC218 \uC788\uC9C0\uB9CC \uC138\uC158\uC774 \uB0AB\uB2E4",lines:n.length>0?[n]:[]}}if(t==="ineligible")return e.worker_ineligible!==!0?null:{title:"\uC6CC\uCEE4 \uC2E4\uD589 \uB300\uC0C1\uC774 \uC544\uB2C8\uB2E4",lines:["worker-ineligible \uB77C\uBCA8\uC774 \uBD99\uC5B4 \uC788\uB2E4 \u2014 \uB77C\uBCA8\uC740 \uC774\uC288 \uC0C1\uC138\uC758 \uB77C\uBCA8 \uC808\uC5D0\uC11C \uB5C0\uB2E4"]};if(t==="spec_after_blocker")return e.spec_after_blocker!==!0?null:{title:"\uC120\uD589 \uACB0\uACFC\uAC00 \uC124\uACC4 \uC804\uC81C \u2014 \uC2A4\uD399\uB3C4 \uC120\uD589 \uB4A4\uC5D0",lines:[`\uC120\uD589: ${(Array.isArray(e.blocked_by)?e.blocked_by:[]).join(" \xB7 ")}`,"\uC120\uD589\uC774 \uB2EB\uD788\uBA74 \uC774 \uD45C\uC2DC\uB294 \uC800\uC808\uB85C \uC0AC\uB77C\uC9C4\uB2E4 \u2014 \uB77C\uBCA8\uC740 \uC774\uC288 \uC0C1\uC138\uC758 \uB77C\uBCA8 \uC808\uC5D0\uC11C \uB5C0\uB2E4"]};if(t==="receipt"){let n=Su(e);return n.length===0?null:{title:"\uC2E4\uD589 \uC601\uC218\uC99D \uD68C\uACC4 \uC794\uC5EC \u2014 \uBA38\uC9C0\uB294 \uC9C4\uD589",lines:[...n.map(r=>Pm[r]||r),"\uC790\uB3D9 \uBA38\uC9C0 \uD310\uC815\uC5D0\uB294 \uC601\uD5A5\uC774 \uC5C6\uB2E4 \u2014 \uC815\uC815\uC740 bd update --set-metadata exec_receipt=\u2026 \uB85C"]}}if(t==="qfr"){let n=e.workflow?e.workflow.quick_fix_review:null;if(!n||n.state!=="reviewed"&&n.state!=="stale")return null;let r=Array.isArray(n.missing)?n.missing:[];return{title:n.state==="reviewed"?"quick_fix self-review \uC601\uC218\uC99D\uC774 \uC9C0\uAE08 \uBCF8\uBB38\uACFC \uC77C\uCE58\uD569\uB2C8\uB2E4":"quick_fix self-review \uC601\uC218\uC99D\uC774 \uC9C0\uAE08 \uBCF8\uBB38\uACFC \uB2E4\uB985\uB2C8\uB2E4",lines:r.length>0?r:["\uBE60\uC9C4 \uD56D\uBAA9 \uC5C6\uC74C"]}}return null}var Fm=["rec","receipt","session_preferred","ineligible","qfr","spec_after_blocker"];function Qs(e,t){for(let n of Fm){if(!t(n))continue;let r=Aa(e,n);return r?{chip_key:n,content:r}:null}return null}function $a(e){return e.chip_popover?Vr(e.chip_popover.content):""}function xr(e,t){return!!e.chip_popover&&e.chip_popover.chip_key===t}var Zs="\uC0AC\uC6A9\uC790 \uB9AC\uBDF0 \uD544\uC694";function Sa(e,t=null,n={}){let r=e.worker_ineligible===!0,o=e.draggable&&!e.done&&!r,s=e.queue_placeable===!0&&!e.done&&!r,i=s&&t&&t.bead_id===e.id,l=e.session_preferred===!0,a=Tu[e.session_preferred_reason||""]||"",u=e.workflow,d=typeof e.reason=="string"?e.reason.split(" \xB7 "):[],f=d.includes("missing_description"),g=d.some(I=>I.startsWith(Zs)),m=typeof e.reason=="string"&&e.reason.startsWith("\u26D4"),k=xr(e,"spec_after_blocker"),R=Im(e.spec_after_blocker===!0,k),z=Gs(e.dependency_chips,R===""?"":c`${R}${k?$a(e):""}`),X=e.workspace_name?c`<span class="worker-card__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:"",ee=Ks(e.cross_lane_chip),W=Ys(u),q=Au(e.from_id),O=!!(e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker));return c`<div
    class="worker-card${o?"":" worker-card--static"}${r?" worker-card--ineligible":""}"
    draggable=${o?"true":"false"}
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    <div class="worker-card__head">
      ${o?c`<span class="worker-card__grip" aria-hidden="true">⠿</span>`:""}
      <span class="worker-card__id" title="클릭하면 ID 복사">${e.id}</span
      >${Xs(e.priority)}
      ${r?c`<button
            type="button"
            class="ctl-chip ctl-chip--label judgement-chip worker-card__ineligible"
            data-chip-key="ineligible"
            aria-expanded=${xr(e,"ineligible")?"true":"false"}
            title="worker-ineligible label이 붙어 워커 실행 대상이 아닙니다"
          >
            worker-ineligible
          </button>`:l?c`<button
              type="button"
              class="ctl-chip ctl-chip--label judgement-chip worker-card__session-preferred"
              data-chip-key="session_preferred"
              aria-expanded=${xr(e,"session_preferred")?"true":"false"}
              title=${a}
            >
              세션 권장
            </button>`:""}${Vs(e.rec,xr(e,"rec"))}${Mm(u,xr(e,"qfr"))}
      ${k?"":$a(e)}
    </div>
    <div class="worker-card__title">${e.title}</div>
    ${u?$s(u,e.status,{onOpenDoc:n.onOpenDoc}):""}${z}
    ${X||ee||W||q||O?c`<div class="worker-chips">
          ${X}${ee}${W}${q}${Hs(e.exec_chips,{pin:n.exec_chips_mode==="pinned_only"})}
        </div>`:""}
    <div
      class="worker-card__foot${e.reason?"":" worker-card__foot--actions-only"}"
    >
      ${i?c`<div class="worker-card__place-menu">
            ${qm(t.lanes,e.id)}
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
    ${to(e)}
  </div>`}function Nn(e){let t=!!e.collapsible&&!!e.collapsed,n=typeof e.count=="number"?e.count:e.items.length,r=c`<span
      class="worker-pane__dot worker-pane__dot--${e.lane}"
      aria-hidden="true"
    ></span>
    <span class="worker-pane__title">${e.title}</span>
    ${t&&e.preview?c`<span class="worker-pane__preview">${e.preview}</span>`:""}
    <span class="worker-pane__count">${n}</span>`;return c`<section
    class="worker-pane worker-pane--lane-${e.lane}${e.src?" worker-pane--src":""}${e.live?" worker-pane--live":""}${e.collapsible?" worker-pane--collapsible":""}${t?" worker-pane--collapsed":""}"
    id=${nn(e.id||void 0)}
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
                  </div>`:e.items.map(o=>e.lane==="candidate"?Sa(o,e.place_menu,{onOpenDoc:e.onOpenDoc}):An(o))}
          </div>`}
  </section>`}function hu(e,t,n){return c`<button
      type="button"
      class="worker-wait__area-toggle"
      data-area=${e}
      aria-expanded=${n?"false":"true"}
      aria-label=${`${t} ${n?"\uD3BC\uCE58\uAE30":"\uC811\uAE30"}`}
    >
      ${n?"\u25B8":"\u25BE"}
    </button>
    <span class="worker-wait__area-name">${t}</span>`}function Js(e){let t=e.parallel,n=e.serial,r=t.drop||{};return c`<div class="worker-wait">
    <section
      class="worker-wait__area worker-wait__area--parallel${t.collapsed?" is-collapsed":""}"
      data-area="parallel"
    >
      <header class="worker-wait__area-hd">
        ${hu("parallel","\uBCD1\uB82C \uC601\uC5ED",t.collapsed)}
        <span class="worker-wait__area-count">${t.count}</span>
      </header>
      ${t.collapsed?"":c`<div
            class="worker-wait__area-body"
            data-drop=${nn(r.drop)}
            data-root-dir=${nn(r.root_dir)}
            data-lane-id=${nn(r.lane_id)}
            data-lane-length=${nn(r.lane_length)}
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
        ${hu("serial","\uC9C1\uB82C \uC601\uC5ED",n.collapsed)}
        ${n.header_control?n.header_control:""}
      </header>
      ${n.collapsed?"":c`<div class="worker-wait__area-body">
            ${n.notice?n.notice:""}
            ${n.extra_panes?n.extra_panes:""}
            ${n.lanes.map(o=>jm(o))}
          </div>`}
    </section>
  </div>`}function jm(e){let t=e.drop||{},n=e.badge?c`<span
        class="worker-lane__badge${e.held?" worker-lane__badge--held":""}"
        >${e.badge}</span
      >`:"";return c`<div
    class="worker-wait__lane${e.empty?" worker-wait__lane--empty":""}"
  >
    ${Nn({id:typeof e.pane_id=="string"?e.pane_id:`worker-pane-lane-${e.id}`,lane:e.id,title:e.title,items:[],count:e.count,empty:"\uBE44\uC5B4 \uC788\uC74C \u2014 \uD589\uC744 \uC5EC\uAE30\uB85C \uB4DC\uB798\uADF8",header_control:c`${n}${e.header_control?e.header_control:""}`,body:c`<div
        class="worker-wait__rows"
        data-drop=${nn(t.drop)}
        data-root-dir=${nn(t.root_dir)}
        data-lane-id=${nn(t.lane_id)}
        data-lane-length=${nn(t.lane_length)}
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
  </div>`}function ei(e){return e.count?c`<section
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
  </section>`:""}var Cu=[{step:"merge",label:"\uBA38\uC9C0",index:1},{step:"base",label:"base",index:2},{step:"verify",label:"\uAC80\uC99D",index:3},{step:"deploy",label:"\uBC30\uD3EC",index:4},{step:"child",label:"\uC790\uC2DD",index:5},{step:"branch",label:"\uBE0C\uB79C\uCE58",index:6},{step:"close",label:"close",index:7}],Oo=[{step:"base_containment",label:"base \uD3EC\uD568 \uD655\uC778"},{step:"repo_operations",label:"\uC800\uC7A5\uC18C \uC791\uC5C5"},{step:"child_sweep",label:"\uC790\uC2DD \uC815\uB9AC"},{step:"branch_cleanup",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC"},{step:"parent_close",label:"\uBD80\uBAA8 close"}];function ti(e,t){let n=Cu.find(o=>o.step===e);if(!n)return null;let r=Cu.length;return{step:n.step,label:t,index:n.index,total:r,percent:Math.round(n.index/r*100)}}function Ru(e){let t=Oo.findIndex(n=>n.step===e);return Oo.map((n,r)=>({step:n.step,label:n.label,state:t<0?"todo":r<t?"done":r===t?"stall":"todo"}))}function Sr(e){let t=Oo.find(n=>n.step===e);return t?t.label:typeof e=="string"?e:""}function Bm(e){let t=Oo.findIndex(n=>n.step===e);return t<0?null:{index:t+1,total:Oo.length}}function ni(e){let t=Bm(e);return t?`\uBA38\uC9C0 \uC644\uB8CC \xB7 \uC815\uB9AC ${t.total}\uB2E8\uACC4 \uC911 ${t.index}\uB2E8\uACC4\uC5D0\uC11C \uBA48\uCDA4`:"\uBA38\uC9C0\uB428 \xB7 \uC815\uB9AC \uBBF8\uC644"}var Ta=new Set(["queued","running","retry_pending"]),Ou=new Set(["failed","succeeded"]),Um={queued:"\uB300\uAE30",running:"\uC911",retry_pending:"\uC7AC\uC2DC\uB3C4 \uB300\uAE30",failed:"\uC2E4\uD328",succeeded:"\uC644\uB8CC \xB7 \uC815\uB9AC \uC7AC\uAC1C \uB300\uAE30"},Lo={base_containment:{step:"base",label:"base \uD655\uC778 \uC911"},child_sweep:{step:"child",label:"\uC790\uC2DD \uC815\uB9AC \uC911"},branch_cleanup:{step:"branch",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC \uC911"},parent_close:{step:"close",label:"\uBD80\uBAA8 close \uC911"}},Wm={merging:{step:"merge",label:"\uBA38\uC9C0 \uC911"},base_containment:Lo.base_containment,child_sweep:Lo.child_sweep,branch_cleanup:Lo.branch_cleanup,parent_close:Lo.parent_close};function zm(e){return typeof e=="string"&&/^[0-9a-f]{40}$/.test(e)}function Hm(e,t,n){return!["verify","deploy"].includes(e.kind)||![...Ta,...Ou].includes(e.state)||![null,void 0,""].includes(e.superseded_by)||!Array.isArray(e.subjects)?!1:e.subjects.some(r=>r&&typeof r=="object"&&r.bead_id===t&&r.merged_sha===n)}function Gm(e,t){let n=(t.kind==="deploy"?2:1)-(e.kind==="deploy"?2:1);if(n!==0)return n;let r=u=>u.state==="succeeded"?1:2,o=r(t)-r(e);if(o!==0)return o;let s=typeof e.requested_at=="number"?e.requested_at:0,i=typeof t.requested_at=="number"?t.requested_at:0;if(s!==i)return i-s;let l=typeof e.operation_id=="string"?e.operation_id:"",a=typeof t.operation_id=="string"?t.operation_id:"";return l.localeCompare(a)}function Ea(e,t=!1){let n=e.kind,r=n==="verify"?"\uAC80\uC99D":"\uBC30\uD3EC",o=t?"failed":e.state,s=Um[o];if(!s)return null;let i=ti(n,`${r} ${s}`);return i?{...i,active:Ta.has(o),failed:o==="failed"}:null}function Km(e){return!e||typeof e!="object"?null:Wm[e.step]||null}function Io(e){if(!e||typeof e.bead_id!="string")return null;let t=e.bead_id,n=e.merge_progress&&typeof e.merge_progress=="object"?e.merge_progress:{},r=Km(n),o=e.cleanup_failed&&typeof e.cleanup_failed=="object"?e.cleanup_failed:null,s=["child_sweep","branch_cleanup","parent_close"].includes(typeof e.cleanup_cursor=="string"?e.cleanup_cursor:""),i=!s&&(e.cleanup_cursor==="repo_operations"||n.step==="repo_operations"),l=zm(e.merge_sha)?e.merge_sha:null,a=!s&&l&&Array.isArray(e.repo_operations)?e.repo_operations.filter(k=>k&&typeof k=="object"&&Hm(k,t,l)).sort(Gm):[],u=i?a:[],d=u.find(k=>Ta.has(k.state));if(d)return Ea(d);if(o)return o.step==="repo_operations"&&a[0]?Ea(a[0],!0):null;let f=u.find(k=>Ou.has(k.state)?k.state!=="succeeded"||e.cleanup_cursor==="repo_operations":!1);if(f)return Ea(f);if(r){let k=ti(r.step,r.label);return k?{...k,active:!0,failed:!1}:null}let g=typeof e.cleanup_cursor=="string"?Lo[e.cleanup_cursor]:null;if(!g)return null;let m=ti(g.step,g.label);return m?{...m,active:!0,failed:!1}:null}function ri(e){return!!e&&e.step!=="merge"&&e.failed!==!0}var Ym="\uBBF8\uC801\uC7AC";function Ca(e,t){let n=Un(e,t.id);return{id:t.id,label:`\u26D3 ${t.id}`,title:`\uC120\uD589 \u2014 close\uB420 \uB54C\uAE4C\uC9C0 \uCD9C\uBC1C\uD558\uC9C0 \uC54A\uB294\uB2E4 (${t.location_label})`,...n?{foreign:!0}:{}}}var Vm=10080*60*1e3;function Lu(e,t,n){let r=t.closed_at;if(typeof r!="number"||!Number.isFinite(r)||r<n-Vm)return null;let o=Un(e,t.id),s=typeof t.root_dir=="string"?t.root_dir:"",i={id:t.id,label:`\u{1F513} ${t.id}`,title:`\uD574\uC81C \u2014 ${Yt(r)}\uC5D0 close\uB418\uC5B4 \uC774 \uC774\uC288\uAC00 \uD480\uB838\uB2E4`,...o?{foreign:!0}:{}};return o?s.length>0&&(i.openable=!0,i.root_dir=s):i.openable=!0,i}function Iu(e,t){let n=Array.isArray(t.ids)?t.ids.filter(s=>typeof s=="string"&&s.length>0):[],r=t.root_dirs&&typeof t.root_dirs=="object"?t.root_dirs:{},o=[];for(let s of[...new Set(n)].sort()){let i=Un(e,s),l=typeof r[s]=="string"?r[s]:"",a={id:s,label:`\u2192 ${s}`,title:"\uD6C4\uC18D \u2014 \uC774 \uC774\uC288\uAC00 close\uB418\uBA74 \uD480\uB9B0\uB2E4",...i?{foreign:!0}:{}};l.length>0?(a.openable=!0,a.root_dir=l):i||(a.openable=!0),o.push(a)}return o}function Mu(e,t,n={}){let r=new Map,o=new Map;for(let s of t)o.has(s.id)||o.set(s.id,s.location_label);for(let[s,i]of e){if(typeof s!="string"||s.length===0)continue;let l=[];for(let a of Array.isArray(i)?i:[]){if(typeof a!="string"||a.length===0)continue;let u=Ca(s,{id:a,location_label:o.get(a)||Ym}),d=n[a];u.foreign!==!0?u.openable=!0:typeof d=="string"&&d.length>0&&(u.openable=!0,u.root_dir=d),l.push(u)}l.length>0&&r.set(s,l)}return r}var si=1,Mo=[{value:"repo_spec",label:"\uB808\uD3EC \xB7 spec \uC6B0\uC120"},{value:"repo_updated",label:"\uB808\uD3EC \xB7 \uCD5C\uC2E0 \uC218\uC815"},{value:"updated_flat",label:"\uCD5C\uC2E0 \uC218\uC815(\uB808\uD3EC \uBB34\uC2DC)"}],La=[{value:"all",label:"\uC804\uCCB4"},{value:"with",label:"spec \uC788\uC74C"},{value:"without",label:"spec \uC5C6\uC74C"}],no={show_blocked:!0,spec:"all"},Pu={auto_merge:"\uC790\uB3D9 \uBA38\uC9C0",merged:"\uBA38\uC9C0",merge:"\uBA38\uC9C0",pr_stop:"PR \uC911\uB2E8",stopped:"\uC911\uB2E8",failed:"\uC2E4\uD328",refuted:"\uBC18\uC99D",no_delta:"\uBB34-delta"};function Xm(e,t){let n=null;for(let r of Object.values(e||{}))!r||r.bead_id!==t||!Kn(r)||(n=typeof r.status=="string"?r.status:null);return n}function Qm(e,t){let n=null,r=-1/0;for(let o of Object.values(e)){if(!o||o.bead_id!==t||o.status==="running"||!Kn(o))continue;let s=typeof o.finished_at=="number"?o.finished_at:typeof o.started_at=="number"?o.started_at:0;s>=r&&(r=s,n=o)}return n}function Zm(e,t,n={}){let{winners:r,resumed_from_ids:o}=Gc(e,t),s=new Map;for(let[i,l]of r){let a=l.attempt,u=l.run_state,d=l.started_at,f=typeof a.session_id=="string"&&a.session_id.length>0,m=Ds(a.quickfix_landing)==="session",k=u!=="running"&&(f||!m)&&!o.has(a.attempt_id),R=!f&&m?"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":o.has(a.attempt_id)?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":null,z=it(n.observations?.[i]),X=it(z.pr),ee=typeof a.merge_sha=="string"&&a.merge_sha.length>0||X.state==="MERGED",W=Vn(n.discard_operations,i,{attempt_id:a.attempt_id,merged:ee}),q=u==="failed"?Nu(a,{resume_eligible:k,resume_reason:R,confirmation:W.confirmation,history:n.bead_timelines?.[i]}):null;s.set(i,{...Du(a,e,u),started_at:d,...q?{failure:q}:{},can_pause:u==="running"&&f,can_resume:k})}for(let[i,l]of ng(e,t)){if(s.has(i))continue;let a=l.attempt,u=Vn(n.discard_operations,i,{attempt_id:a.attempt_id}),d=Uu(a);s.set(i,{...Du(a,e,l.run_state),started_at:typeof a.started_at=="number"?a.started_at:null,...l.run_state==="parked"?{failure:Nu(a,{resume_eligible:!1,resume_reason:"\uC138\uC158 \uB300\uAE30 \u2014 [\uC7AC\uC2DC\uB3C4]\uAC00 \uC0C8 attempt\uB97C \uB744\uC6C1\uB2C8\uB2E4",confirmation:u.confirmation,history:n.bead_timelines?.[i]})}:{},...l.run_state==="waiting"?{wait:eg(a)}:{},...d?{retry:d}:{},can_pause:!1,can_resume:!1})}return s}function Du(e,t,n){return{attempt_id:typeof e.attempt_id=="string"?e.attempt_id:"",run_state:n,last_event_at:typeof e.last_event_at=="number"?e.last_event_at:null,last_activity:e.last_activity&&typeof e.last_activity=="object"?e.last_activity:null,legs:Array.isArray(e.legs)?e.legs:[],runner:typeof e.runner=="string"?e.runner:null,model:typeof e.model=="string"?e.model:null,effort:typeof e.effort=="string"?e.effort:null,speed:typeof e.speed=="string"?e.speed:null,resumed_from:typeof e.resumed_from=="string"?e.resumed_from:null,continuation_mode:e.continuation_mode==="session"||e.continuation_mode==="fresh"?e.continuation_mode:null,status:typeof e.status=="string"?e.status:null,usage:Gn(t,e.bead_id)}}function Nu(e,t){let n=e.cause_detail&&typeof e.cause_detail=="object"?e.cause_detail:null;return{cause:typeof e.cause=="string"?e.cause:null,cause_detail:n,summary:n&&typeof n.summary=="string"?n.summary:null,bead_id:typeof e.bead_id=="string"?e.bead_id:"",finished_at:typeof e.finished_at=="number"?e.finished_at:null,runner:typeof e.runner=="string"?e.runner:null,model:typeof e.model=="string"?e.model:null,effort:typeof e.effort=="string"?e.effort:null,observed_effort:typeof e.observed_effort=="string"?e.observed_effort:null,speed:typeof e.speed=="string"?e.speed:null,attempt_id:typeof e.attempt_id=="string"?e.attempt_id:"",usage:e.usage&&typeof e.usage=="object"?e.usage:null,halted_auto_advance:e.halted_auto_advance===!0,quickfix_lane:e.quickfix_lane===!0,quickfix_landing:e.quickfix_landing&&typeof e.quickfix_landing=="object"?e.quickfix_landing:null,retry:Uu(e),resume_eligible:t.resume_eligible,resume_reason:t.resume_reason,landed:$u(e),confirmation:t.confirmation,...Jm(t.history)}}function Jm(e){if(!e||typeof e!="object")return{};let t=Array.isArray(e.events)?e.events:[],n=[];for(let o of t)!o||typeof o!="object"||typeof o.summary!="string"||o.summary.length===0||n.push({event_id:typeof o.event_id=="string"?o.event_id:"",kind:typeof o.kind=="string"?o.kind:"",summary:o.summary,at:typeof o.at=="number"?o.at:null});n.reverse();let r=typeof e.log_path=="string"&&e.log_path.length>0?e.log_path:null;return{...n.length>0?{timeline:n}:{},...r===null?{}:{log_path:r},...e.log_expired===!0?{log_expired:!0}:{},...e.log_unreadable===!0?{log_unreadable:!0}:{}}}function eg(e){let t=e.cause_detail&&typeof e.cause_detail=="object"?e.cause_detail:null,n=Array.isArray(t?.blockers)?t.blockers:[],r=[];for(let o of n)!o||typeof o!="object"||typeof o.id!="string"||o.id.length===0||r.push({id:o.id,rig:typeof o.rig=="string"?o.rig:null,status:typeof o.status=="string"?o.status:""});return{summary:t&&typeof t.summary=="string"?t.summary:null,blockers:r,since:typeof e.finished_at=="number"?e.finished_at:null}}function Uu(e){let t=e&&e.retry&&typeof e.retry=="object"?e.retry:null;return t?{cause:typeof t.cause=="string"?t.cause:null,attempts:typeof t.attempts=="number"?t.attempts:0,max:typeof t.max=="number"?t.max:0,next_at:typeof t.next_at=="number"?t.next_at:null}:null}var tg=new Set(["parked","retry_wait","waiting"]);function ng(e,t){let n=Object.values(e||{}),r=new Map;for(let s of n)s&&typeof s.bead_id=="string"&&Kn(s)&&r.set(s.bead_id,s.attempt_id);let o=new Map;for(let s of n){if(!s||typeof s.bead_id!="string"||s.bead_id.length===0||!Kn(s)||!tg.has(s.status)||r.get(s.bead_id)!==s.attempt_id||typeof s.dismissed_at=="number")continue;let i=t.get(s.bead_id);typeof i=="number"&&i>0&&typeof s.finished_at=="number"&&i>=s.finished_at||o.set(s.bead_id,{attempt:s,run_state:s.status})}return o}function qu(e,t){let n=e[t];if(!n)return"";if(n.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let r=typeof n.reason=="string"?n.reason:"",o=r.indexOf(":");return o>0&&o<r.length-1?`\u26D4 ${r.slice(0,o)} (${r.slice(o+1)})`:`\u26D4 ${r}`}function it(e){return e&&typeof e=="object"?e:{}}function rg(e){let t=it(e).badge_codes;return Array.isArray(t)?t.filter(n=>typeof n=="string"&&n.length>0):[]}function og(e,t,n){let r=it(t);if(Object.keys(r).length===0)return null;let o=e.execution_defaults,s=e.runner_catalog,i=e.session_defaults;if(!o||!s||!i)return null;let l=g=>mn({pin:g,global:i,execution_defaults:o,runner_catalog:s,route:n}),a,u;try{a=l(r),u=l(null)}catch{return null}let d=Fu(Jr(a,s),Jr(u,s)),f=Fu($r(a,null),$r(u,null));return d||f?{orchestration:d,worker:f}:null}function Fu(e,t){return!e||t&&t.text===e.text?null:e}function sg(e,t,n){let o=(t&&typeof t=="object"&&Array.isArray(t.released_by)?t.released_by:[]).filter(i=>i&&typeof i=="object"&&typeof i.id=="string").slice().sort((i,l)=>(typeof l.closed_at=="number"?l.closed_at:0)-(typeof i.closed_at=="number"?i.closed_at:0)),s=[];for(let i of o){let l=Lu(e,i,n);l&&s.push(l)}return s.length===0?null:s}function Ia(e,t){return typeof e!="string"||e.length===0||typeof t!="string"||t.length===0||t===e?null:`\u2192 ${t}`}var ig=new Set(["quick_fix","spec_backed","full_plan"]);function ju(e){return typeof e=="string"&&ig.has(e)}function ag(e){let t={...it(e.session_defaults)};for(let n of["orchestration_model","orchestration_effort","orchestration_speed"]){let r=e[n];typeof r=="string"&&(t[n]=r)}return t}function lg(e,t,n){let r=e.runner_catalog??null,o=Oa(e,t,n,null);if(!o)return null;let s=xn(r,o.orchestration_model.value??""),i=s===null?o:Oa(e,t,n,s)||o,l=Jr(i,r),a=$r(i,s);return l||a?{orchestration:l,worker:a}:null}function Oa(e,t,n,r){let o=ju(n)?n:ju(t.route)?t.route:null;try{return mn({pin:t,global:ag(e),execution_defaults:e.execution_defaults??null,runner_catalog:e.runner_catalog??null,route:o,controller_runtime:r})}catch{return null}}function cg(e,t,n){return!t||!Object.hasOwn(t,"metadata")?null:$r(Oa(e,it(t.metadata),t.route,n),n)}function Ma(e,t){let n=new Set,r=e;for(;r&&!n.has(r.attempt_id);){if(r.conflict_resolution===!0)return!0;n.add(r.attempt_id),r=typeof r.resumed_from=="string"&&r.resumed_from.length>0&&t.get(r.resumed_from)||null}return!1}function ug(e){let t={};for(let l of Dn)t[l]=0;let n=!1,r=0,o=0,s=0;for(let l of e){let a=l.usage;if(!a||typeof a!="object")continue;let u=!1;for(let d of Dn)Number.isFinite(a[d])&&(t[d]+=a[d],n=!0,u=!0);u&&(o+=1,Number.isFinite(a.total_cost_usd)&&(r+=a.total_cost_usd,s+=1))}o>0&&s===o&&(t.total_cost_usd=r);let i=e.map(l=>l.usage).filter(l=>l&&typeof l=="object"&&l.providers);return i.length>0?en(Cs(i)):n?Hn(t):null}function Wu(e,t){let n=wa(e,t);return n==="internal"?"\uBBF8\uC801\uC7AC":n==="external"?"\uC678\uBD80":"\uC704\uCE58 \uBBF8\uD655\uC778"}function dg(e,t,n){let r=t.get(e);if(!r)return Wu(e,n);if(typeof r.position=="number"){if(r.lane==="parallel")return`#${r.position}`;if(/^s[1-5]$/.test(r.lane))return`${r.lane} #${r.position}`}return Co(r)}function pg(e,t,n,r){let o=t.get(e);if(!o)return{label:Wu(e,n),title:""};if(typeof o.position=="number"&&(o.lane==="parallel"||/^s[1-5]$/.test(o.lane))){let i=r.get(e),l=o.lane==="parallel"?"\uBCD1\uB82C":o.lane;return{label:i&&i.length>0?"\u{1F512} \uB300\uAE30":"\uB300\uAE30",title:`${o.workspace_name||o.root_dir} ${l} #${o.position}`}}return{label:o.state==="running"?"\u25B6 \uC2E4\uD589\uC911":Co(o),title:""}}function fg(e,t){for(let n of Object.values(e||{}))if(n&&n.attempt_id===t&&typeof n.armed_by_lane=="string"&&n.armed_by_lane.length>0)return n.armed_by_lane;return null}function _g(e,t,n,r,o,s){return t==="draft"?{state:"draft",badge:"draft",run_label:null,can_stop:!1}:n.some(i=>s.failed_by_bead.get(i.id)===e)?{state:"failed",badge:"\u26D4 \uC2E4\uD328",run_label:"\u25B6 \uB2E4\uC2DC \uC9C4\uD589",can_stop:!1}:s.disarmed_lanes.has(e)?{state:"restart",badge:"\u23F8 \uC7AC\uC2DC\uC791",run_label:"\u25B6 \uC9C4\uD589",can_stop:!1}:n.some(i=>s.armed_by_bead.get(i.id)===e)?{state:"running",badge:"\u25B6 \uC9C4\uD589 \uC911",run_label:o.length>0?"\u25B6 \uC774\uC5B4\uC11C \uC9C4\uD589":null,can_stop:!0}:r?{state:"all_done",badge:"\uBAA8\uB450 \uC644\uB8CC",run_label:null,can_stop:!1}:{state:"confirmed",badge:"\uD655\uC815",run_label:"\u25B6 \uC9C4\uD589",can_stop:!1}}function mg(e,t,n,r,o,s,i){let l=[];return e.forEach((a,u)=>{let d=typeof a.id=="string"?a.id:"";if(d.length===0)return;let f=a.status==="confirmed"?"confirmed":"draft",g=Array.isArray(a.entries)?a.entries:[],m=[];g.forEach((X,ee)=>{let W=X&&typeof X.bead_id=="string"?X.bead_id:"";if(W.length===0)return;let q=X&&typeof X.root_dir=="string"?X.root_dir:"",O=n.get(W),I=O?O.state:void 0,F=I==="running"||I==="pr_wait"||I==="done",U=!O||I==="runnable",ue=O&&O.lane==="parallel"&&typeof O.position=="number"?O.position-1:null,M=pg(W,n,r,t),B=m.length>0?m[m.length-1].id:null,Q=f==="confirmed"&&B!==null&&!(t.get(W)||[]).includes(B);m.push({id:W,title:o.get(W)||W,root_dir:O?O.root_dir:q,workspace_name:O?O.workspace_name:s.get(q)||"",seq:ee+1,location_label:M.label,location_title:M.title,draggable:!F,fixed:F,done:I==="done",unplaced:U,mismatch:Q,...ue!==null?{queue_index:ue}:{}})}),m.forEach((X,ee)=>{X.seq=ee+1});let k=m.length>0&&m.every(X=>X.done),R=m.filter(X=>!X.fixed&&i.armed_by_bead.get(X.id)!==d).map(X=>X.id),z=_g(d,f,m,k,R,i);l.push({lane_id:d,status:f,draft:f==="draft",number:u+1,label:`\uC5F0\uACB0 ${u+1} \xB7 \uB808\uD3EC \uAC04`,rows:m,all_done:k,can_confirm:f==="draft"&&m.length>=2,has_mismatch:f==="confirmed"&&m.some(X=>X.mismatch||X.unplaced),unlaunched:R,...z})}),l}function gg(e,t,n){if(e.lane==="runnable"){let i=n.get(e.id);return i?i.length===0?{scope:[],state:"missing"}:{scope:i,state:"declared"}:{scope:[],state:void 0}}let r=t.get(e.root_dir),o=r?r[e.id]:void 0;if(!o||!Array.isArray(o.scope))return{scope:[],state:void 0};let s=o.scope.filter(i=>typeof i=="string"&&i.length>0);return{scope:s,state:s.length===0?"missing":"declared"}}function hg(e,t,n,r,o){let s=new Map;for(let a of[...e.running,...e.queue,...e.runnable,...e.pr_wait]){if(!t.has(a.root_dir))continue;let u=`${a.root_dir}\0${a.id}`,d=s.get(u);if(d){d.cards.push(a);continue}let{scope:f,state:g}=gg(a,t,n);g!==void 0&&(a.scope_state=g),s.set(u,{cards:[a],scope:f})}let i=new Map;for(let a of s.values()){let u=a.cards[0].scope_state;if(u!==void 0)for(let g of a.cards)g.scope_state=u;if(a.scope.length===0)continue;let d=a.cards[0].root_dir,f=i.get(d);f?f.push(a):i.set(d,[a])}let l=(a,u,d)=>{let f=u.cards[0],g={id:f.id,title:f.title,location_label:dg(f.id,r,o),prefixes:d,...typeof f.root_dir=="string"&&f.root_dir.length>0?{root_dir:f.root_dir}:{}};for(let m of a.cards)m.overlap_chips?m.overlap_chips.push(g):m.overlap_chips=[g]};for(let a of i.values())for(let u=0;u<a.length;u+=1)for(let d=u+1;d<a.length;d+=1){let f=Fs(a[u].scope,a[d].scope);f.length!==0&&(l(a[u],a[d],f),l(a[d],a[u],f))}}function Bu(e,t,n){let r=n?n.get(t)?.root_dir:void 0,o=!Un(e.id,t),s=typeof e.root_dir=="string"?e.root_dir:"",i=typeof r=="string"&&r.length>0?r:o&&s.length>0?s:"";return i.length>0?{openable:!0,root_dir:i}:o?{openable:!0}:{}}function bg(e,t,n,r){let o=new Set(e?e.ids:[]);for(let l of t&&Array.isArray(t.ids)?t.ids:[])typeof l=="string"&&l.length>0&&o.add(l);if(o.size===0)return{ids:[]};let s={},i={...e?e.root_dirs:{},...t&&t.root_dirs&&typeof t.root_dirs=="object"?t.root_dirs:{}};for(let l of o){let a=i[l];if(typeof a=="string"&&a.length>0){s[l]=a;continue}if(!Un(n.id,l)){n.root_dir.length>0&&(s[l]=n.root_dir);continue}let u=r.get(l)?.root_dir;typeof u=="string"&&u.length>0&&(s[l]=u)}return{ids:[...o],root_dirs:s}}function Ra(e){if(typeof e=="number")return Number.isFinite(e)?e:null;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:null}return null}function oi(e){if(typeof e=="number"&&Number.isFinite(e))return e;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:0}return 0}function lr(e,t,n){let r=Array.isArray(e)?e:[],o=Array.isArray(t)?t:[],s=n&&typeof n.done_since=="number"?n.done_since:void 0,i={...no,...n&&n.candidate_filter?n.candidate_filter:{}},l=n&&Object.hasOwn(n,"cross_lanes")?n.cross_lanes??null:void 0,a=n&&n.candidate_sort==="as_given"?"as_given":n&&Mo.some(v=>v.value===n.candidate_sort)?n.candidate_sort:"repo_spec",u=n&&n.groups==="all"?"all":"nonempty",d=n&&n.candidate_hidden_counts==="per_control"?"per_control":"sequential",f=Date.now(),g=new Map;for(let v of o)v&&typeof v.root_dir=="string"&&g.set(v.root_dir,v);let m=new Map;for(let v of o)v&&typeof v.root_dir=="string"&&m.set(v.root_dir,v.name||v.root_dir);for(let v of r)v&&typeof v.root_dir=="string"&&m.set(v.root_dir,v.name||v.root_dir);let k=[],R=[],z=[],X=[],ee=[],W=[],q=new Map,O=new Map,I=new Map,F=new Map,U=new Map,ue=new Map,M=new Map,B=new Map,Q=new Map,re=new Map,Ee=new Map,he=new Map,pe=new Map,P=new Set,Ae=new Map,Se=new Map,E=new Map;for(let v of r){if(!v||typeof v.root_dir!="string")continue;let G=v.root_dir,Re=v.name||G,Ie=g.get(G),je=Ie&&typeof Ie.revision=="number"?Ie.revision:typeof v.revision=="number"?v.revision:0,We=it(v.attempts),dt=it(v.bead_titles);for(let[p,_]of Object.entries(dt))typeof _=="string"&&_.length>0&&E.set(p,_);let $t=it(v.bead_times),It=it(v.pr_observations),Tt=it(v.admission),ft=it(v.revise_parked),ct=it(v.merge_queue_state),xt=it(v.cleanup_failed),Ct=it(v.discard_operations),Mt=it(v.bead_timelines),oe=it(v.bead_blocked_by);Object.hasOwn(v,"bead_scope")&&Ae.set(G,it(v.bead_scope));let J=it(v.bead_workflow),$=it(v.pr_activity),N=Array.isArray(v.repo_operations)?v.repo_operations:[];B.set(G,N);let te=typeof v.declared_base=="string"?v.declared_base:null;M.set(G,te),ue.set(G,Object.entries(xt).map(([p,_])=>({bead_id:p,step:_&&_.step?_.step:"",reason:_&&_.reason?_.reason:"",at:_&&typeof _.at=="number"?_.at:null,detail:_&&typeof _.detail=="string"?_.detail:null,output_tail:_&&typeof _.output_tail=="string"&&_.output_tail?_.output_tail:void 0,log_path:_&&typeof _.log_path=="string"&&_.log_path?_.log_path:void 0,retry_count:_&&typeof _.retry_count=="number"&&Number.isInteger(_.retry_count)&&_.retry_count>0?_.retry_count:0,failure_code:_&&typeof _.failure_code=="string"?_.failure_code:void 0})));for(let[p,_]of Object.entries(it(v.bead_overlay)))_&&typeof _=="object"&&Q.set(`${G}\0${p}`,_);let ne=new Map;for(let p of Object.values(We))p&&typeof p.attempt_id=="string"&&ne.set(p.attempt_id,p);let le=Array.isArray(v.merge_queue)?v.merge_queue:[],Be=new Set(le.filter(p=>p&&typeof p.bead_id=="string").map(p=>p.bead_id)),Ye=new Map(le.filter(p=>p&&typeof p.bead_id=="string").map(p=>[p.bead_id,p])),et=new Map,Ue=new Map,ht=new Map,Rt=new Map;le.forEach((p,_)=>{p&&typeof p.bead_id=="string"&&(et.set(p.bead_id,_+1),Ue.set(p.bead_id,p.resolution),ht.set(p.bead_id,p.continuation_action||null),Rt.set(p.bead_id,p.authority||null))});let yt=it(v.auto_merge_skips),tn=p=>{let _=yt[p];if(!_)return null;let S=it(it(It[p]).pr).head_sha;return S&&S===_.head_sha?_.reason||"":null};U.set(G,{positions:et,resolutions:Ue,continuations:ht,authorities:Rt,state:{active:typeof ct.active=="string"?ct.active:null,failures:it(ct.failures),waiting:ct.waiting&&typeof ct.waiting.bead_id=="string"&&typeof ct.waiting.reason=="string"?ct.waiting:null},auto_excluded:(Array.isArray(v.pr_wait)?v.pr_wait:[]).map(p=>p&&p.bead_id).filter(p=>typeof p=="string"&&tn(p)!==null),running:le.length>0});let wt=Array.isArray(v.queue)?v.queue:[];for(let p of[...wt,...Array.isArray(v.pr_wait)?v.pr_wait:[]])p&&typeof p.bead_id=="string"&&typeof p.armed_by_lane=="string"&&p.armed_by_lane.length>0&&he.set(p.bead_id,p.armed_by_lane);for(let p of Array.isArray(v.disarmed_on_load)?v.disarmed_on_load:[])typeof p=="string"&&p.length>0&&P.add(p);let Ot=(Array.isArray(v.serial_lanes)?v.serial_lanes:[]).filter(p=>p&&/^s[1-5]$/.test(p.id)&&Array.isArray(p.entries)),jt=it(v.lane_states),lt=typeof v.serial_lane_count=="number"?Math.max(0,Math.min(5,Math.floor(v.serial_lane_count))):Math.min(5,Ot.length);I.set(G,lt),F.set(G,wt.length);let Ht=new Map(Ot.map(p=>[p.id,p])),Gt=new Map;for(let p of Ot)for(let _ of p.entries)_&&typeof _.bead_id=="string"&&Gt.set(_.bead_id,p.id);for(let[p,_]of Object.entries(it(v.bead_dependents))){let S=Array.isArray(_?.ids)?_.ids:[],K=it(_?.root_dirs),V=Ee.get(p)||{ids:new Set,root_dirs:{}};for(let ie of S)typeof ie=="string"&&ie.length>0&&V.ids.add(ie);for(let[ie,xe]of Object.entries(K))typeof xe=="string"&&xe.length>0&&(V.root_dirs[ie]=xe);Ee.set(p,V)}for(let[p,_]of Object.entries(oe))Array.isArray(_)&&re.set(p,_.filter(S=>typeof S=="string"&&S.length>0));let Bt=Array.isArray(v.done)?v.done:[];for(let p of Bt)p&&typeof p.bead_id=="string"&&W.push({id:p.bead_id,root_dir:G,workspace_name:Re});let un=new Map;for(let p of Bt)p&&typeof p.bead_id=="string"&&typeof p.added_at=="number"&&un.set(p.bead_id,p.added_at);let Nt=p=>({id:p,title:dt[p]||p,root_dir:G,workspace_name:Re,expected_revision:je,draggable:!1,...it($t[p]).created_at?{created_at:it($t[p]).created_at}:{},...it($t[p]).updated_at?{updated_at:it($t[p]).updated_at}:{}}),Vt=p=>{let _=J[p]?.chips?.pr;return _&&typeof _.number=="number"&&typeof _.url=="string"?{pr_number:_.number,pr_url:_.url}:{}},Ut=p=>Object.hasOwn(oe,p)?{blocked_by:Array.isArray(oe[p])?oe[p].filter(_=>typeof _=="string"&&_.length>0):[]}:{},Zt=(p,_)=>{let S=Ut(p),K=(_?.blockers||[]).map(ie=>ie.id);if(K.length===0)return S;let V=[...S.blocked_by||[]];for(let ie of K)V.includes(ie)||V.push(ie);return{blocked_by:V}},_e=new Set;for(let[p,_]of Zm(We,un,{discard_operations:Ct,observations:It,bead_timelines:Mt})){_e.add(p);let S=_.run_state==="failed"?fg(We,_.attempt_id):null;S!==null&&pe.set(p,S);let K=ne.get(_.attempt_id)||null,V=Q.get(`${G}\0${p}`),ie=V&&V.rollup?V.rollup:null,xe=Ia(te,K?K.target_base:null),Ve=K?Ma(K,ne):!1,ot=K&&K.quickfix_lane===!0&&K.quickfix_landing&&typeof K.quickfix_landing=="object"?K.quickfix_landing:null,bt=ot&&typeof ot.reason=="string"&&ot.reason.length>0?ot.reason:null,_t=ot?Io({bead_id:p,merge_sha:ot.head_sha,cleanup_cursor:ot.cursor,cleanup_failed:bt?{step:ot.cursor,reason:bt}:null,repo_operations:N}):null;R.push({...Nt(p),lane:"running",...Zt(p,_.wait),...Gt.has(p)?{serial_lane_id:Gt.get(p)}:{},attempt_id:_.attempt_id,run_state:_.run_state,status:_.status||void 0,workflow:J[p]||null,can_pause:_.can_pause,can_resume:_.can_resume,started_at:_.started_at,last_event_at:_.last_event_at,last_activity:_.last_activity,legs:_.legs,runner:_.runner,model:_.model,effort:_.effort,speed:_.speed,resumed_from:_.resumed_from,continuation_mode:_.continuation_mode,usage:_.usage,failure:_.failure||null,wait:_.wait||null,retry:_.retry||null,exec_chips:{orchestration:ha(_),worker:cg(it(Ie),V,_.runner||null)},discard:Vn(Ct,p,{attempt_id:_.attempt_id,merged:_.failure?.confirmation==="merged"||it(It[p]).pr?.state==="MERGED"}),...ie?{rollup:ie}:{},...Ve?{conflict_resolution:!0}:{},...xe?{base_exception:xe}:{},..._t?{landing:_t}:{},badges:_.run_state==="paused"?["\u23F8 \uC77C\uC2DC\uC815\uC9C0"]:_.run_state==="failed"?["\u26A0 \uC2E4\uD328"]:_.run_state==="parked"?["\u23F8 \uC138\uC158 \uB300\uAE30"]:_.run_state==="retry_wait"?["\u21BB \uC7AC\uC2DC\uB3C4 \uB300\uAE30"]:_.run_state==="waiting"?["\u26D3 \uC120\uD589 \uB300\uAE30"]:[],alert:_.run_state==="failed"})}for(let[p,_]of Hc(We)){if(R.some(K=>K.id===p))continue;let S=_.attempt;R.push({...Nt(p),lane:"running",kind:"session",...Ut(p),attempt_id:typeof S.attempt_id=="string"?S.attempt_id:"",run_state:"running",status:"running",non_occupying:!0,workflow:J[p]||null,can_pause:!1,can_resume:!1,started_at:_.started_at,last_event_at:typeof S.last_event_at=="number"?S.last_event_at:null,last_activity:S.last_activity&&typeof S.last_activity=="object"?S.last_activity:null,legs:Array.isArray(S.legs)?S.legs:[],runner:typeof S.runner=="string"?S.runner:null,model:typeof S.model=="string"?S.model:null,effort:typeof S.effort=="string"?S.effort:null,speed:typeof S.speed=="string"?S.speed:null,resumed_from:null,continuation_mode:null,usage:S.usage&&typeof S.usage=="object"?S.usage:null,exec_chips:{orchestration:ha(S),worker:null},discard:Vn(Ct,p,{merge_queued:!0}),badges:[_.origin==="auto"?"\uB9AC\uBDF0 \xB7 \uC790\uB3D9":"\uB9AC\uBDF0"],alert:!1})}for(let p of Array.isArray(v.session_active)?v.session_active:[]){let _=p&&p.bead_id;typeof _!="string"||_e.has(_)||(_e.add(_),Array.isArray(p.blocked_by)&&p.blocked_by.length>0&&re.set(_,p.blocked_by.filter(S=>typeof S=="string"&&S.length>0)),typeof p.title=="string"&&p.title.length>0&&E.set(_,p.title),R.push({...Nt(_),title:p.title||dt[_]||_,lane:"running",kind:"session",status:"in_progress",started_at:Ra(p.started_at)??Ra(p.updated_at)??void 0,updated_at:Ra(p.updated_at)??void 0,workflow:p.workflow||null,labels:Array.isArray(p.labels)?p.labels:[],spec_id:typeof p.spec_id=="string"?p.spec_id:"",blocked:p.blocked===!0,...Array.isArray(p.blocked_by)?{blocked_by:p.blocked_by.filter(S=>typeof S=="string"&&S.length>0)}:{},draggable:!1,can_pause:!1,can_resume:!1,exec_chips:null,usage:null,legs:[],last_activity:null,session_refs:Array.isArray(p.session_refs)?p.session_refs:[],badges:[],alert:!1}))}for(let p of Array.isArray(v.pr_wait)?v.pr_wait:[]){let _=p&&p.bead_id;if(typeof _!="string"||_e.has(_))continue;_e.add(_);let S=it(It[_]),K=it(S.pr),V=S.gate?it(S.gate):null,ie=Be.has(_),xe=Ye.get(_)?.continuation_action||null,Ve=!!xe&&xe.continuation===null,ot=ct.active===_,bt=p.external===!0,_t=xt[_]||null,x=it($[_]),A=Io({bead_id:_,merge_sha:p.merge_sha,cleanup_cursor:p.cleanup_cursor,merge_progress:x.merge_progress||null,cleanup_failed:_t,repo_operations:N}),Le=ri(A),qe=!!V&&V.base_badge==="\uCDA9\uB3CC",h=!!_t&&["child_sweep","branch_cleanup","parent_close"].includes(_t.step)&&!!V&&V.tier==="merged",y=bt&&!!_t&&!!V&&V.tier==="merged",C=!!V&&["closed_unmerged","review","undecidable"].includes(V.tier),ce=Vn(Ct,_,{external:bt,merge_active:ot||A?.step==="merge",merge_queued:ie,cleanup_active:Le,merged:!!_t||V?.tier==="merged"}),ve=!!ce.operation,Oe=rg(S.receipt_check);z.push({...Nt(_),lane:"pr_wait",...Ut(_),...Oe.length>0?{receipt_badge:{codes:Oe}}:{},workflow:J[_]||null,pr_number:typeof K.number=="number"?K.number:null,pr_url:typeof K.url=="string"?K.url:void 0,external:bt,usage:Gn(We,_),merge_step:A,badges:Ve?["\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694"]:A?[V?.tier==="merged"?"\uBA38\uC9C0\uB428":"\uBA38\uC9C0 \uC911"]:_t?[Sr(_t.step)?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${Sr(_t.step)}`:"\uC815\uB9AC \uBA48\uCDA4"]:typeof V?.gate_badge=="string"&&V.gate_badge.length>0?[V.gate_badge]:[],alert:A?A.failed===!0:!!_t||C,reason:_t&&A?.active!==!0?ni(_t.step):"PR \uB300\uAE30",merge_action:V?.tier==="merged"&&!h&&!y?!1:!ie||Ve,merge_enabled:!ve&&(Ve||V?.enabled===!0||qe||h||y),merge_label:Ve?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":y||h?"\uC815\uB9AC \uC7AC\uAC1C":qe&&!h?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":void 0,merge_title:Ve?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":ve?ce.error?`\uD3D0\uAE30 \uC2E4\uD328: ${ce.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${ce.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:y?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD569\uB2C8\uB2E4":h?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uC7AC\uAC1C\uD569\uB2C8\uB2E4":qe?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":V?.enabled===!0?`\uBA38\uC9C0 (${V.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4`:`\uBA38\uC9C0 \uBD88\uAC00: ${V?.reason||"\uAD00\uCE21 \uB300\uAE30"}`,cancel_action:ie&&!Ve,cancel_enabled:!ot,continuation_mismatch:xe?.mismatch||null,discard:ce,discard_action:ce.action,discard_enabled:ce.enabled,discard_title:ce.title})}let T=(p,_,S,K)=>{let V=p&&p.bead_id;if(typeof V!="string"||_e.has(V))return null;_e.add(V);let ie=ft[V],xe=Vn(Ct,V),Ve=xe.operation?xe:null,ot={...Nt(V),lane:_,workflow:J[V]||null,draggable:!Ve,discard:Ve||void 0,reason:qu(Tt,V),seq:S+1,queue_position:S+1,queue_index:S,queue_length:K,badges:ie?["\u23F8 REVISE \uD30C\uD0B9"]:[],alert:!!ie,revise_action:!!ie,revise_enabled:!!ie&&!Ve,revise_title:ie?ie.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${ie.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":""},bt=Ut(V);return Object.hasOwn(bt,"blocked_by")&&(ot.blocked_by=bt.blocked_by),ot};for(let p=0;p<wt.length;p++){let _=T(wt[p],"queue",p,wt.length);if(!_)continue;X.push(_);let S=q.get(G);S?S.push(_):q.set(G,[_])}let ye=p=>{let _=z.find(ie=>ie.id===p&&ie.root_dir===G);if(_)return{id:p,title:_.title,badge:"PR \uB300\uAE30 \xB7 \uC810\uC720"};let S=R.find(ie=>ie.id===p&&ie.root_dir===G),K=S?S.run_state:Xm(We,p),V=K==="failed"||K==="orphaned"?"\uC2E4\uD328 \xB7 \uC810\uC720 \uC720\uC9C0":K==="paused"?"\uC77C\uC2DC\uC815\uC9C0 \xB7 \uC810\uC720":"\uC2E4\uD589 \uC911 \xB7 \uC810\uC720";return{id:p,title:S?S.title:Nt(p).title,badge:V}},fe=[];for(let p=0;p<Math.max(lt,Ot.length);p++){let _=`s${p+1}`,S=Ht.get(_),K=S&&Array.isArray(S.entries)?S.entries:[],V=it(jt[_]),ie=Array.isArray(V.occupied_by)?V.occupied_by.filter(ot=>typeof ot=="string"):[],xe=new Set(ie),Ve=[];for(let ot=0;ot<K.length;ot++){let bt=K[ot]&&K[ot].bead_id;if(typeof bt=="string"&&xe.has(bt)){_e.add(bt);continue}let _t=T(K[ot],_,ot,K.length);_t&&(Ve.push(_t),X.push(_t))}Ve.length===0&&ie.length===0&&(lt<=1||p>=lt)||fe.push({id:_,index:p,items:Ve,raw_length:K.length,occupied_by:ie,occupants:ie.map(ot=>ye(ot)),corrections:Array.isArray(V.corrections)?V.corrections.length:0,cycle:V.cycle===!0,...Ve.length===0&&ie.length===0?{empty:!0}:{}})}O.set(G,fe);let b=Array.from({length:lt},(p,_)=>{let S=`s${_+1}`,K=Ht.get(S),V=K&&Array.isArray(K.entries)?K.entries:[],ie=it(jt[S]);return{id:S,index:V.length,length:V.length,occupied_by:Array.isArray(ie.occupied_by)?ie.occupied_by.filter(xe=>typeof xe=="string"):[]}});for(let p of Array.isArray(v.runnable)?v.runnable:[]){let _=p&&p.bead_id;if(typeof _!="string"||_e.has(_))continue;_e.add(_);let S=p.workflow&&typeof p.workflow=="object"?p.workflow:null,K=S&&typeof S.route=="string"&&S.route||(typeof p.route=="string"?p.route:null),V=og(it(Ie),p.exec_pins,K),ie=To(p.rec,p.exec_pins);Array.isArray(p.blocked_by)&&p.blocked_by.length>0&&re.set(_,p.blocked_by.filter(A=>typeof A=="string"&&A.length>0)),typeof p.title=="string"&&p.title.length>0&&E.set(_,p.title),Array.isArray(p.scope)&&Se.set(_,p.scope.filter(A=>typeof A=="string"&&A.length>0));let xe=p.eligible!==!1,Ve=p.worker_ineligible===!0,ot=Object.hasOwn(p,"eligible"),bt=[];typeof p.reason=="string"&&p.reason.length>0&&bt.push(p.reason);let _t=qu(Tt,_);_t&&bt.push(_t);let x=sg(_,p.release_info,f)?.map(A=>({...A,...Bu({id:_,root_dir:G},A.id)}));k.push({...Nt(_),title:p.title||dt[_]||_,lane:"runnable",draggable:!ot,queue_placeable:xe&&!Ve,...Ve?{worker_ineligible:!0}:{},...p.session_preferred===!0?{session_preferred:!0,session_preferred_reason:typeof p.session_preferred_reason=="string"?p.session_preferred_reason:""}:{},...p.spec_after_blocker===!0?{spec_after_blocker:!0}:{},...x?{dependency_chips:{released:x}}:{},...p.dependents_info&&typeof p.dependents_info=="object"?{dependents_info:p.dependents_info}:{},reason:bt.join(" \xB7 "),created_at:p.created_at??void 0,updated_at:p.updated_at??void 0,status:typeof p.status=="string"?p.status:void 0,labels:Array.isArray(p.labels)?p.labels:[],spec_id:typeof p.spec_id=="string"?p.spec_id:"",published:p.published===!0,workflow:S||(K?{route:K,chips:{route:K}}:null),...V?{exec_chips:V}:{},...ie?{rec:ie}:{},blocked:p.blocked===!0,...Array.isArray(p.blocked_by)?{blocked_by:p.blocked_by.filter(A=>typeof A=="string"&&A.length>0)}:{},place_index:wt.length,place_lanes:b})}for(let p of Bt){let _=p&&p.bead_id;if(typeof _!="string"||_e.has(_)||(_e.add(_),s!==void 0&&typeof p.added_at=="number"&&p.added_at<s))continue;let S=Qm(We,_),K=S&&typeof S.done_kind=="string"?S.done_kind:null;ee.push({...Nt(_),lane:"done",done:!0,done_layout:"three_line",usage:Gn(We,_),work_ms:wu(We,_),done_at:typeof p.added_at=="number"?p.added_at:void 0,done_kind:K,...Vt(_),badges:[...K&&Pu[K]?[Pu[K]]:[],...yu(We,_)]})}for(let p of Array.isArray(v.session_done)?v.session_done:[]){let _=p&&(p.id||p.bead_id);typeof _!="string"||_e.has(_)||(_e.add(_),ee.push({...Nt(_),...p,id:_,root_dir:G,workspace_name:Re,expected_revision:je,lane:"done",done:!0}))}}if(Q.size>0)for(let v of[...k,...X,...R,...z,...ee]){let G=Q.get(`${v.root_dir}\0${v.id}`);if(!G||(typeof G.priority=="number"&&(v.priority=G.priority),typeof G.from_id=="string"&&G.from_id.length>0&&(v.from_id=G.from_id),!Object.hasOwn(G,"metadata")))continue;let Re=it(G.metadata);if(v.rec=To(Re),v.lane==="runnable"||v.lane.startsWith("s")||v.lane==="queue"){let Ie=lg(it(g.get(v.root_dir)),Re,typeof G.route=="string"&&G.route.length>0?G.route:it(v.workflow).route);Ie&&(v.exec_chips=Ie)}}let Z=new Map;o.forEach((v,G)=>{v&&typeof v.root_dir=="string"&&Z.set(v.root_dir,G)});let Ce=n&&n.running_sort==="repo"?"repo":"started";R.sort((v,G)=>{let Re=v.kind==="session",Ie=G.kind==="session";if(Re!==Ie)return Re?1:-1;if(Re&&Ie){let dt=oi(G.updated_at)-oi(v.updated_at);return dt!==0?dt:v.id.localeCompare(G.id)}if(Ce==="repo"){let dt=Z.get(v.root_dir)??Number.MAX_SAFE_INTEGER,$t=Z.get(G.root_dir)??Number.MAX_SAFE_INTEGER;if(dt!==$t)return dt-$t}let je=typeof v.started_at=="number"&&Number.isFinite(v.started_at)?v.started_at:null,We=typeof G.started_at=="number"&&Number.isFinite(G.started_at)?G.started_at:null;return je!==null&&We!==null&&je!==We?je-We:je===null&&We!==null?1:je!==null&&We===null?-1:v.id.localeCompare(G.id)}),ee.sort((v,G)=>(G.done_at??0)-(v.done_at??0));let ge=o.length>0?o:r.map(v=>({root_dir:v&&v.root_dir,name:v&&v.name,auto_advance:v&&v.auto_advance,auto_merge:v&&v.auto_merge,slots:v&&v.slots,revision:v&&v.revision,runner_catalog:v&&v.runner_catalog})),Te=new Set(k.map(v=>v.root_dir)),be=new Map;for(let v of R)v.kind==="session"||v.run_state!=="running"||be.set(v.root_dir,(be.get(v.root_dir)||0)+1);let Pe=new Map;for(let v of ee){let G=Pe.get(v.root_dir);G?G.push(v):Pe.set(v.root_dir,[v])}let Xe={positions:new Map,resolutions:new Map,continuations:new Map,authorities:new Map,state:{active:null,failures:{},waiting:null},auto_excluded:[],running:!1},Ke=[];for(let v of ge){if(!v||typeof v.root_dir!="string")continue;let G=q.get(v.root_dir)||[],Re=O.get(v.root_dir)||[],Ie=G.length>0||Re.some(dt=>dt.items.length>0||dt.occupied_by.length>0);if(u!=="all"&&!Ie&&!Te.has(v.root_dir))continue;let je=typeof v.slots=="number"&&v.slots>=si?v.slots:si,We=be.get(v.root_dir)||0;Ke.push({live_count:We,over_cap:We>je,merge:U.get(v.root_dir)||Xe,token_total:ug(Pe.get(v.root_dir)||[]),cleanup_failures:ue.get(v.root_dir)||[],declared_base:M.get(v.root_dir)??null,repo_operations:B.get(v.root_dir)||[],root_dir:v.root_dir,name:v.name||v.root_dir,auto_advance:v.auto_advance===!0,auto_merge:v.auto_merge===!0,slots:je,revision:typeof v.revision=="number"?v.revision:0,runner_catalog:it(v.runner_catalog),items:G,sublanes:{parallel:G,serial:Re},serial_lane_count:I.get(v.root_dir)||0,raw_queue_length:F.get(v.root_dir)||0})}let L={runnable:k,runnable_all:k,runnable_hidden:{blocked:0,spec:0},runnable_sections:[],runnable_flat:a==="updated_flat"||a==="as_given",queue:X,queue_groups:Ke,running:R,pr_wait:z,done:ee,parallel_rows:[],chain_lanes:[],cross_lanes_revision:l&&typeof l.revision=="number"?l.revision:null,cross_lanes_unreadable:l===null,parallel_raw_length:Object.fromEntries(F),owner_of:{}},se=pu(L);for(let v of W)se.has(v.id)||se.set(v.id,{root_dir:v.root_dir,workspace_name:v.workspace_name,lane:"done",state:"done"});for(let v of[...L.queue,...L.runnable,...L.running,...L.pr_wait]){if(!Object.hasOwn(v,"blocked_by"))continue;let G=se.get(v.id);v.blockers=(v.blocked_by||[]).map(Re=>fu(Re,G,se,o))}for(let v of[...L.queue,...L.runnable,...L.running,...L.pr_wait]){let G=(v.blockers||[]).map(je=>({...Ca(v.id,je),...Bu(v,je.id,se)})),Re=Iu(v.id,bg(Ee.get(v.id),v.dependents_info,v,se));if(G.length===0&&Re.length===0)continue;let Ie={...v.dependency_chips||{},...G.length>0?{predecessors:G}:{},...Re.length>0?{dependents:Re}:{}};v.dependency_chips=Ie}hg(L,Ae,Se,se,o);let ae=_u(L.queue_groups);for(let v of L.queue_groups)for(let G of v.sublanes.serial){let Re=ae.get(mu(v.root_dir,G.id));Re&&(G.cross_wait_peers=Re)}L.chain_lanes=mg(l&&Array.isArray(l.lanes)?l.lanes:[],re,se,o,E,m,{armed_by_bead:he,failed_by_bead:pe,disarmed_lanes:P});let me=new Map;for(let v of[...L.queue,...L.runnable])me.has(v.id)||me.set(v.id,v);let we=new Set;for(let v of L.chain_lanes)for(let G of v.rows){if(v.status==="confirmed"&&!G.unplaced&&!G.fixed&&we.add(G.id),!v.draft&&!G.unplaced)continue;let Re=me.get(G.id);Re&&(Re.cross_lane_chip={lane_id:v.lane_id,number:v.number,status:v.status,label:v.draft?`\uC5F0\uACB0 ${v.number} (draft)`:`\uC5F0\uACB0 ${v.number}`})}let de=new Map(L.chain_lanes.map(v=>[v.lane_id,v.number]));for(let v of[...L.queue,...L.running]){let G=he.get(v.id);if(typeof G!="string"||G.length===0)continue;let Re=de.get(G);v.armed_lane_chip=Re===void 0?{lane_id:G,label:"\u25B6 \uC9C4\uD589 \uC911 \xB7 \uB808\uC778 \uC5C6\uC74C",orphan:!0}:{lane_id:G,label:`\u25B6 \uC5F0\uACB0 ${Re}`,orphan:!1}}let Fe=[];for(let v of q.values())for(let G of v)we.has(G.id)||Fe.push(G);Fe.sort((v,G)=>{let Re=v.workspace_name.localeCompare(G.workspace_name);return Re!==0?Re:(v.queue_index??0)-(G.queue_index??0)}),L.parallel_rows=Fe;let He={};for(let[v,G]of se)typeof G.root_dir=="string"&&G.root_dir.length>0&&(He[v]=G.root_dir);for(let v of L.chain_lanes)for(let G of v.rows)!Object.hasOwn(He,G.id)&&G.root_dir.length>0&&m.has(G.root_dir)&&(He[G.id]=G.root_dir);L.owner_of=He;let Ze=L.runnable.length;L.runnable_all=L.runnable.slice();let De=L.runnable,Y=v=>i.show_blocked||v.blocked!==!0,j=v=>i.spec==="all"||(i.spec==="with"?v.published===!0:v.published!==!0);if(d==="per_control"){let v=[],G=0,Re=0;for(let Ie of De){let je=Y(Ie),We=j(Ie);je&&We?v.push(Ie):!je&&We?G+=1:je&&!We&&(Re+=1)}De=v,L.runnable_hidden={blocked:G,spec:Re}}else{De=De.filter(Y);let v=De.length;De=De.filter(j),L.runnable_hidden={blocked:Ze-v,spec:v-De.length}}let Ne=(v,G)=>{let Re=oi(G.updated_at)-oi(v.updated_at);return Re!==0?Re:v.id.localeCompare(G.id)},Je=a==="repo_spec"?(v,G)=>{let Re=v.published===!0?0:1,Ie=G.published===!0?0:1;return Re!==Ie?Re-Ie:Ne(v,G)}:Ne;if(a==="as_given")L.runnable=De,L.runnable_sections=[];else if(a==="updated_flat")L.runnable=De.slice().sort(Ne),L.runnable_sections=[];else{let v=new Map;for(let Ie of De){let je=v.get(Ie.root_dir);je?je.push(Ie):v.set(Ie.root_dir,[Ie])}let G=[],Re=[];for(let Ie of ge){if(!Ie||typeof Ie.root_dir!="string")continue;let je=(v.get(Ie.root_dir)||[]).slice().sort(Je);v.delete(Ie.root_dir),je.length!==0&&(G.push({root_dir:Ie.root_dir,name:Ie.name||Ie.root_dir,items:je.map(We=>({...We,workspace_name:""}))}),Re.push(...je))}for(let[Ie,je]of v){let We=je.slice().sort(Je);G.push({root_dir:Ie,name:We[0]?.workspace_name||Ie,items:We.map(dt=>({...dt,workspace_name:""}))}),Re.push(...We)}L.runnable=Re,L.runnable_sections=G}return L}function zu(e,t){let n=new Map(e.map((a,u)=>[a,u])),r=new Map(e.map(a=>[a,new Set]));for(let a of t)a.blocker!==a.blockee&&n.has(a.blocker)&&n.has(a.blockee)&&r.get(a.blockee).add(a.blocker);let o=new Set,s=[];for(;s.length<e.length;){let a=e.find(u=>{if(o.has(u))return!1;for(let d of r.get(u))if(!o.has(d))return!1;return!0});if(a===void 0)return{order:[...e],corrections:[],cycle:!0};o.add(a),s.push(a)}let i=[],l=new Map(s.map((a,u)=>[a,u]));for(let a of s){let u=null;for(let d of r.get(a)){let f=Number(n.get(a))<Number(n.get(d)),g=Number(l.get(a))>Number(l.get(d));f&&g&&(u===null||Number(l.get(d))>Number(l.get(u)))&&(u=d)}u!==null&&i.push({bead_id:a,after:u})}return{order:s,corrections:i,cycle:!1}}var yg="\uB2E4\uB978 \uB808\uD3EC \uC774\uC288\uB294 \uC774 \uC9C1\uB82C \uB808\uC778\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",ai="\uC758\uC874 \uC790\uB8CC \uBBF8\uD655\uC815 \u2014 \uAD50\uC815 \uBCF4\uB958",vg="Worker \uD0ED \uC9C1\uB82C \uB808\uC778\uC5D0\uC11C \uBA3C\uC800 \uBE7C \uC8FC\uC138\uC694",wg="\uC774\uBBF8 \uC9C4\uD589 \uC911\uC778 \uC774\uC288 \uC55E\uC5D0\uB294 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",ro="\uC5F0\uACB0 \uB808\uC778\uC774 \uC5C6\uC2B5\uB2C8\uB2E4";function Po(e,t){return`${e}\0${t}`}function kg(e,t){let n=new Set(e),r=new Map;for(let o of e){let s=t.placed_members.has(o)?t.snapshot_blocked_by:t.runnable_blocked_by,i=s instanceof Map?s.get(o):void 0;if(!Array.isArray(i))return null;r.set(o,i.filter(l=>l!==o&&n.has(l)))}return r}function $g(e,t){if(e.status!=="confirmed")return 0;let n=-1;return e.entries.forEach((r,o)=>{t.fixed_members.has(r.bead_id)&&(n=o)}),n+1}function qo(e,t){let n=e.entries,r=n.map(f=>f.bead_id),o=kg(r,t);if(o===null)return{entries:n,corrections:[],cycle:!1,held:!0,mismatched:[]};let s=[];for(let[f,g]of o)for(let m of g)s.push({blocker:m,blockee:f});let i=$g(e,t),l=new Map(r.map((f,g)=>[f,g])),a=r.slice(0,i).filter(f=>o.get(f).some(g=>Number(l.get(g))>Number(l.get(f)))),u=zu(r.slice(i),s);if(u.cycle)return{entries:n,corrections:[],cycle:!0,held:!1,mismatched:a};let d=new Map(n.map(f=>[f.bead_id,f]));return{entries:[...n.slice(0,i),...u.order.map(f=>d.get(f))],corrections:u.corrections,cycle:!1,held:!1,mismatched:a}}function Hu(e,t){let n=t.cross_lanes.get(e);return n===void 0?null:qo(n,t)}function xg(e,t){if(!(t.corrections.length===0&&!t.cycle&&!t.held&&t.mismatched.length===0))return{lane_id:e,corrected:t.corrections.length,cycle:t.cycle,held:t.held,mismatched:t.mismatched}}function Ag(e){return`${e}\uC758 \uB808\uD3EC\uB97C \uC54C \uC218 \uC5C6\uC5B4 \uC758\uC874\uC744 \uBC14\uAFC0 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4`}function Sg(e){let t=new Map;for(let[n,r]of e)t.set(n,r.slice());return t}function Pa(e,t,n){let r=new Set([t]),o=[t];for(;o.length>0;){let s=o.pop();for(let i of e.get(s)||[]){if(i===n)return!0;r.has(i)||(r.add(i),o.push(i))}}return!1}function Eg(e,t){let n=new Set;for(let[i,l]of t)for(let a of l)n.add(Po(i,a));let r=new Map,o=new Map;for(let i of e){let l=Po(i.a,i.b);r.set(l,i),o.set(l,i.type==="dep-add")}let s=[];for(let i of e){let l=Po(i.a,i.b);r.get(l)===i&&o.get(l)!==n.has(l)&&s.push(i)}return s}function Tg(e,t,n){let r=e.parallel_rows,o=Math.max(0,Math.min(r.length,n)),s=r[o];if(s&&s.root_dir===t)return s.queue_index;for(let i=o-1;i>=0;i--)if(r[i].root_dir===t)return r[i].queue_index+1;for(let i=o;i<r.length;i++)if(r[i].root_dir===t)return r[i].queue_index;return e.parallel_raw_length.get(t)??0}function Cg(e,t){return e.parallel_rows.some(n=>n.root_dir===t)}function ii(e,t,n,r){return{type:"worker-queue-place",payload:{bead_id:e,...r?{lane:r}:{},index:n},root_dir:t}}function Da(e,t){let n=0;for(let r of e.cross_lanes.keys())if(n+=1,r===t)return n;return n+1}function Fo(e){let t=Sg(e.blocked_by_map),n=[],r=new Set,o={refusal:null},s=u=>{let d=e.owner_of.get(u);return typeof d!="string"||d.length===0?(o.refusal=Ag(u),null):d};return{graph:t,dep_ops:n,state:o,ownerOf:s,addDep:(u,d,f)=>{if(o.refusal!==null||u===d)return;let g=t.get(u)||[];if(g.includes(d))return;let m=s(u);if(m!==null){if(Pa(t,d,u)){o.refusal=`\uC758\uC874 \uC0AC\uC774\uD074\uC774 \uC0DD\uAE41\uB2C8\uB2E4 \u2014 ${u}\uAC00 \uC774\uBBF8 ${d}\uB97C \uB9C9\uACE0 \uC788\uC2B5\uB2C8\uB2E4`;return}t.set(u,[...g,d]),f!==void 0&&r.add(Po(u,d)),n.push({type:"dep-add",a:u,b:d,root_dir:m,...f===void 0?{}:{lane_id:f}})}},removeDep:(u,d)=>{if(o.refusal!==null||u===d)return;let f=t.get(u)||[];if(!f.includes(d))return;let g=s(u);g!==null&&(t.set(u,f.filter(m=>m!==d)),n.push({type:"dep-remove",a:u,b:d,root_dir:g}))},laneCreated:(u,d)=>r.has(Po(u,d))}}function jo(e,t,n,r,o={}){if(e.state.refusal!==null)return{refused:e.state.refusal};let s=Eg(e.dep_ops,t.blocked_by_map),i=s.filter(d=>d.type==="dep-remove"),l=s.filter(d=>d.type==="dep-add"),a=o.disarm_ops??[],u=o.lane_id===void 0||o.correction===void 0?void 0:xg(o.lane_id,o.correction);return{lane_ops:n,ops:[...i,...a,...l,...r],lane_op_index:i.length+a.length,...u===void 0?{}:{correction:u}}}function Gu(e,t,n){for(let r=1;r<t.length;r+=1)e.addDep(t[r].bead_id,t[r-1].bead_id,n)}function Do(e,t){return t>0&&e.entries[t]?.dep_created_by_lane===!0}function Ku(e,t,n,r){if(t.status!=="confirmed")return[];let o=[],s=new Map;for(let i of r){let l=e.owner_of.get(i.bead_id)||i.root_dir;typeof l!="string"||l.length===0||s.set(l,[...s.get(l)||[],i.bead_id])}for(let[i,l]of s)o.push({type:"worker-queue-disarm",payload:{bead_ids:l,lane_id:n},root_dir:i});return o}function Yu(e,t,n,r){let o=new Map;for(let s of n){if(t.placed_members.has(s.bead_id))continue;let i=e.ownerOf(s.bead_id);if(i===null)return;let l=o.get(i)??0;r.push(ii(s.bead_id,i,(t.parallel_raw_length.get(i)??0)+l)),o.set(i,l+1)}}function No(e){return e.map(t=>({bead_id:t.bead_id,root_dir:t.root_dir}))}function li(e,t){return e.length===t.length&&e.every((n,r)=>n.bead_id===t[r].bead_id&&n.root_dir===t[r].root_dir)}function ci(e,t,n){let r=Fo(n),o=[],s=[],i=[],l,a=n.owner_lane_of.get(e.bead_id),u=e.kind==="chain"?e.lane_id??a:void 0,d=u===void 0?void 0:n.cross_lanes.get(u);if(t.kind==="repo-serial"&&e.root_dir!==t.root_dir)return{refused:yg};if(t.kind==="chain"){if(e.kind==="repo-serial")return{refused:vg};if(e.kind!=="chain"&&typeof a=="string"&&a!==t.lane_id&&n.cross_lanes.has(a))return{refused:`\uC774\uBBF8 \uC5F0\uACB0 ${Da(n,a)}\uC5D0 \uC788\uC2B5\uB2C8\uB2E4`};if(!n.cross_lanes.has(t.lane_id))return{refused:ro}}if(e.kind==="chain"&&d===void 0)return{refused:ro};let f=()=>{if(d===void 0||d.status!=="confirmed")return;let k=d.entries.findIndex(W=>W.bead_id===e.bead_id);if(k<0)return;let R=k>0?d.entries[k-1]:null,z=k+1<d.entries.length?d.entries[k+1]:null,X=Do(d,k),ee=z!==null&&Do(d,k+1);X&&R!==null&&r.removeDep(e.bead_id,R.bead_id),ee&&z!==null&&r.removeDep(z.bead_id,e.bead_id),(X||ee)&&R!==null&&z!==null&&r.addDep(z.bead_id,R.bead_id,u)},g=(k,R)=>{let z=n.cross_lanes.get(k),X=z.entries.findIndex(M=>M.bead_id===e.bead_id),ee=z.entries.filter(M=>M.bead_id!==e.bead_id),W=Math.max(0,Math.min(ee.length,X>=0&&R>X?R-1:R)),q=-1;if(ee.forEach((M,B)=>{n.fixed_members.has(M.bead_id)&&(q=B)}),W<=q){r.state.refusal=wg;return}let O=X>=0?z.entries[X]:d?.entries.find(M=>M.bead_id===e.bead_id)??{bead_id:e.bead_id,root_dir:e.root_dir};l=qo({status:z.status,entries:[...ee.slice(0,W),O,...ee.slice(W)]},n);let I=l.entries;if(li(I,z.entries)||o.push({type:"monitor-lane-update",payload:{lane_id:k,entries:No(I)}}),z.status!=="confirmed")return;let F=I.findIndex(M=>M.bead_id===e.bead_id),U=F>0?I[F-1].bead_id:null,ue=F+1<I.length?I[F+1].bead_id:null;if(U===null){ue!==null&&r.addDep(ue,e.bead_id,k);return}if(r.addDep(e.bead_id,U,k),ue!==null&&(r.graph.get(ue)||[]).includes(U)){let M=z.entries.findIndex(B=>B.bead_id===ue);(r.laneCreated(ue,U)||M>0&&z.entries[M-1].bead_id===U&&Do(z,M))&&r.removeDep(ue,U),r.addDep(ue,e.bead_id,k)}},m=typeof e.queue_index=="number"?e.queue_index:n.queue_index_of.get(e.bead_id);if(e.kind==="chain"&&(f(),d!==void 0&&(t.kind!=="chain"||t.lane_id!==u)&&(i.push(...Ku(n,d,u,d.entries.filter(k=>k.bead_id===e.bead_id))),o.push({type:"monitor-lane-update",payload:{lane_id:u,entries:No(d.entries.filter(k=>k.bead_id!==e.bead_id))}}))),t.kind==="chain"&&g(t.lane_id,t.marker_index),r.state.refusal!==null)return{refused:r.state.refusal};if(t.kind==="candidate")e.kind!=="candidate"&&s.push({type:"worker-queue-remove",payload:{bead_id:e.bead_id},root_dir:e.root_dir});else if(t.kind==="parallel"){let k=Tg(n,e.root_dir,t.marker_index);if(e.kind==="candidate"||e.kind==="repo-serial")s.push(ii(e.bead_id,e.root_dir,k));else if(e.kind==="parallel"){let R=n.parallel_rows,z=R[Math.max(0,Math.min(R.length,t.marker_index))];if(!(!!z&&z.bead_id===e.bead_id)&&Cg(n,e.root_dir)&&m!==void 0){let ee=m>k?k:k-1;ee>=0&&ee!==m&&s.push({type:"worker-queue-reorder",payload:{bead_id:e.bead_id,to_index:ee},root_dir:e.root_dir})}}}else if(t.kind==="chain"){let k=n.cross_lanes.get(t.lane_id);e.kind==="candidate"&&k.status==="confirmed"&&s.push(ii(e.bead_id,e.root_dir,n.parallel_raw_length.get(e.root_dir)??0))}else if(e.kind==="repo-serial"&&e.lane_id===t.lane_id){if(m!==void 0&&t.index!==m){let k=m>t.index?t.index:t.index-1;k>=0&&k!==m&&s.push({type:"worker-queue-reorder",payload:{bead_id:e.bead_id,lane:t.lane_id,to_index:k},root_dir:e.root_dir})}}else s.push(ii(e.bead_id,e.root_dir,t.index,t.lane_id));return jo(r,n,o,s,{disarm_ops:i,...t.kind==="chain"?{lane_id:t.lane_id,correction:l}:{}})}function Vu(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:ro};if(n.entries.length<2)return{refused:"\uD655\uC815\uD558\uB824\uBA74 \uBA64\uBC84\uAC00 2\uAC1C \uC774\uC0C1\uC774\uC5B4\uC57C \uD569\uB2C8\uB2E4"};let r=qo(n,t);if(r.held)return{refused:ai};let o=r.entries,s=Fo(t),i=[];Gu(s,o,e),s.state.refusal===null&&Yu(s,t,o,i);let l=li(o,n.entries)?[]:[{type:"monitor-lane-update",payload:{lane_id:e,entries:No(o)}}];return l.push({type:"monitor-lane-confirm",payload:{lane_id:e}}),jo(s,t,l,i,{lane_id:e,correction:r})}function Xu(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:ro};let r=qo(n,t),o=r.entries,s=Fo(t),i=[];Gu(s,o,e),s.state.refusal===null&&Yu(s,t,o,i);let l=li(o,n.entries)?[]:[{type:"monitor-lane-update",payload:{lane_id:e,entries:No(o)}}];return jo(s,t,l,i,{lane_id:e,correction:r})}function Qu(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:ro};let r=qo(n,t),o=r.entries;return jo(Fo(t),t,li(o,n.entries)?[]:[{type:"monitor-lane-update",payload:{lane_id:e,entries:No(o)}}],[],{lane_id:e,correction:r})}function Zu(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:ro};let r=Fo(t);if(n.status==="confirmed")for(let o=1;o<n.entries.length;o+=1)Do(n,o)&&r.removeDep(n.entries[o].bead_id,n.entries[o-1].bead_id);return jo(r,t,[{type:"monitor-lane-remove",payload:{lane_id:e}}],[],{disarm_ops:Ku(t,n,e,n.entries)})}function Ju(e,t){let n=t.cross_lanes.get(e);if(n===void 0||n.status!=="confirmed")return null;let r=[],o=[];for(let i=1;i<n.entries.length;i+=1){let l=`  ${n.entries[i].bead_id} \u2190 ${n.entries[i-1].bead_id}`;Do(n,i)?r.push(l):o.push(`${l} (\uB808\uC778\uC774 \uB9CC\uB4E4\uC9C0 \uC54A\uC74C)`)}let s=`\uC5F0\uACB0 ${Da(t,e)}\uC744 \uC9C0\uC6C1\uB2C8\uB2E4.`;return r.length===0?`${s}
\uC758\uC874\uC740 \uADF8\uB300\uB85C \uB461\uB2C8\uB2E4`:[s,"\uD568\uAED8 \uC81C\uAC70\uD560 \uC758\uC874:",...r,...o.length===0?[]:["\uADF8\uB300\uB85C \uB450\uB294 \uC758\uC874:",...o]].join(`
`)}function ed(e){let t=new Map;for(let n of e)n.type!=="dep-add"||typeof n.lane_id!="string"||t.set(n.lane_id,[...t.get(n.lane_id)||[],{bead_id:n.a,after:n.b}]);return[...t].map(([n,r])=>({lane_id:n,pairs:r}))}function td(e,t){let n=new Map(e.map((r,o)=>[r.bead_id,o]));return t.filter(r=>{let o=n.get(r.bead_id);return o!==void 0&&o>0&&e[o-1].bead_id===r.after})}function Na(e,t){if(e!==null){let n=t.owner_lane_of.get(e.bead_id);if(typeof n=="string"&&t.cross_lanes.has(n))return{refused:`\uC774\uBBF8 \uC5F0\uACB0 ${Da(t,n)}\uC5D0 \uC788\uC2B5\uB2C8\uB2E4`}}return{lane_ops:[{type:"monitor-lane-create",payload:{entries:e===null?[]:[e]}}],ops:[],lane_op_index:0}}var Rg="\uC0AC\uC774\uD074";function Og(e){let t=new Map,n=r=>Array.isArray(r)?r.filter(o=>typeof o=="string"&&o.length>0):[];for(let r of Array.isArray(e)?e:[]){if(!r||typeof r!="object")continue;let o=r.bead_blocked_by&&typeof r.bead_blocked_by=="object"?r.bead_blocked_by:{};for(let[s,i]of Object.entries(o))Array.isArray(i)&&t.set(s,n(i));for(let s of[...Array.isArray(r.runnable)?r.runnable:[],...Array.isArray(r.session_active)?r.session_active:[]])s&&typeof s.bead_id=="string"&&Array.isArray(s.blocked_by)&&s.blocked_by.length>0&&t.set(s.bead_id,n(s.blocked_by))}return t}function qa(e,t,n){let r=lr(e,t),o=[],s=new Set,i=(a,u)=>{for(let d of a)s.has(d.id)||(s.add(d.id),o.push({bead_id:d.id,root_dir:d.root_dir,workspace_name:d.workspace_name,title:d.title,lane:u}))};i(r.running,"running"),i(r.pr_wait,"pr_wait"),i(r.queue,"queue"),i(r.runnable_all,"runnable");let l=n&&typeof n.root_dir=="string"&&n.root_dir.length?n.root_dir:null;return{issues:l===null?o:o.filter(a=>a.root_dir===l),blocked_by_map:Og(e)}}function nd(e,t){let n=new Map;for(let i of t.issues)!i||typeof i.bead_id!="string"||i.bead_id.length===0||n.has(i.bead_id)||n.set(i.bead_id,i);let r=n.get(e)?.root_dir,o=t.blocked_by_map.get(e)||[],s=[];for(let i of n.values()){if(i.bead_id===e||i.lane==="done"||o.includes(i.bead_id))continue;let l=Pa(t.blocked_by_map,i.bead_id,e);s.push({...i,disabled:l,...l?{reason:Rg}:{}})}return s.sort((i,l)=>{let a=r!==void 0&&i.root_dir===r,u=r!==void 0&&l.root_dir===r;return a!==u?a?-1:1:i.bead_id.localeCompare(l.bead_id)}),s}function rd(e,t){let n=t.trim().toLowerCase();return n.length===0?e.slice():e.filter(r=>r.bead_id.toLowerCase().includes(n)||r.title.toLowerCase().includes(n))}var{entries:pd,setPrototypeOf:od,isFrozen:Lg,getPrototypeOf:Ig,getOwnPropertyDescriptor:Mg}=Object,{freeze:an,seal:vn,create:Ha}=Object,{apply:Ga,construct:Ka}=typeof Reflect<"u"&&Reflect;an||(an=function(t){return t});vn||(vn=function(t){return t});Ga||(Ga=function(t,n){for(var r=arguments.length,o=new Array(r>2?r-2:0),s=2;s<r;s++)o[s-2]=arguments[s];return t.apply(n,o)});Ka||(Ka=function(t){for(var n=arguments.length,r=new Array(n>1?n-1:0),o=1;o<n;o++)r[o-1]=arguments[o];return new t(...r)});var ui=ln(Array.prototype.forEach),Pg=ln(Array.prototype.lastIndexOf),sd=ln(Array.prototype.pop),Bo=ln(Array.prototype.push),Dg=ln(Array.prototype.splice),pi=ln(String.prototype.toLowerCase),Fa=ln(String.prototype.toString),ja=ln(String.prototype.match),Uo=ln(String.prototype.replace),Ng=ln(String.prototype.indexOf),qg=ln(String.prototype.trim),Sn=ln(Object.prototype.hasOwnProperty),sn=ln(RegExp.prototype.test),Wo=Fg(TypeError);function ln(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var n=arguments.length,r=new Array(n>1?n-1:0),o=1;o<n;o++)r[o-1]=arguments[o];return Ga(e,t,r)}}function Fg(e){return function(){for(var t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];return Ka(e,n)}}function pt(e,t){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:pi;od&&od(e,null);let r=t.length;for(;r--;){let o=t[r];if(typeof o=="string"){let s=n(o);s!==o&&(Lg(t)||(t[r]=s),o=s)}e[o]=!0}return e}function jg(e){for(let t=0;t<e.length;t++)Sn(e,t)||(e[t]=null);return e}function Xn(e){let t=Ha(null);for(let[n,r]of pd(e))Sn(e,n)&&(Array.isArray(r)?t[n]=jg(r):r&&typeof r=="object"&&r.constructor===Object?t[n]=Xn(r):t[n]=r);return t}function zo(e,t){for(;e!==null;){let r=Mg(e,t);if(r){if(r.get)return ln(r.get);if(typeof r.value=="function")return ln(r.value)}e=Ig(e)}function n(){return null}return n}var id=an(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),Ba=an(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),Ua=an(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),Bg=an(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),Wa=an(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),Ug=an(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),ad=an(["#text"]),ld=an(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),za=an(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),cd=an(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),di=an(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),Wg=vn(/\{\{[\w\W]*|[\w\W]*\}\}/gm),zg=vn(/<%[\w\W]*|[\w\W]*%>/gm),Hg=vn(/\$\{[\w\W]*/gm),Gg=vn(/^data-[\-\w.\u00B7-\uFFFF]+$/),Kg=vn(/^aria-[\-\w]+$/),fd=vn(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),Yg=vn(/^(?:\w+script|data):/i),Vg=vn(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),_d=vn(/^html$/i),Xg=vn(/^[a-z][.\w]*(-[.\w]+)+$/i),ud=Object.freeze({__proto__:null,ARIA_ATTR:Kg,ATTR_WHITESPACE:Vg,CUSTOM_ELEMENT:Xg,DATA_ATTR:Gg,DOCTYPE_NAME:_d,ERB_EXPR:zg,IS_ALLOWED_URI:fd,IS_SCRIPT_OR_DATA:Yg,MUSTACHE_EXPR:Wg,TMPLIT_EXPR:Hg}),Ho={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,progressingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},Qg=function(){return typeof window>"u"?null:window},Zg=function(t,n){if(typeof t!="object"||typeof t.createPolicy!="function")return null;let r=null,o="data-tt-policy-suffix";n&&n.hasAttribute(o)&&(r=n.getAttribute(o));let s="dompurify"+(r?"#"+r:"");try{return t.createPolicy(s,{createHTML(i){return i},createScriptURL(i){return i}})}catch{return console.warn("TrustedTypes policy "+s+" could not be created."),null}},dd=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function md(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:Qg(),t=_e=>md(_e);if(t.version="3.3.0",t.removed=[],!e||!e.document||e.document.nodeType!==Ho.document||!e.Element)return t.isSupported=!1,t;let{document:n}=e,r=n,o=r.currentScript,{DocumentFragment:s,HTMLTemplateElement:i,Node:l,Element:a,NodeFilter:u,NamedNodeMap:d=e.NamedNodeMap||e.MozNamedAttrMap,HTMLFormElement:f,DOMParser:g,trustedTypes:m}=e,k=a.prototype,R=zo(k,"cloneNode"),z=zo(k,"remove"),X=zo(k,"nextSibling"),ee=zo(k,"childNodes"),W=zo(k,"parentNode");if(typeof i=="function"){let _e=n.createElement("template");_e.content&&_e.content.ownerDocument&&(n=_e.content.ownerDocument)}let q,O="",{implementation:I,createNodeIterator:F,createDocumentFragment:U,getElementsByTagName:ue}=n,{importNode:M}=r,B=dd();t.isSupported=typeof pd=="function"&&typeof W=="function"&&I&&I.createHTMLDocument!==void 0;let{MUSTACHE_EXPR:Q,ERB_EXPR:re,TMPLIT_EXPR:Ee,DATA_ATTR:he,ARIA_ATTR:pe,IS_SCRIPT_OR_DATA:P,ATTR_WHITESPACE:Ae,CUSTOM_ELEMENT:Se}=ud,{IS_ALLOWED_URI:E}=ud,Z=null,Ce=pt({},[...id,...Ba,...Ua,...Wa,...ad]),ge=null,Te=pt({},[...ld,...za,...cd,...di]),be=Object.seal(Ha(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),Pe=null,Xe=null,Ke=Object.seal(Ha(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}})),L=!0,se=!0,ae=!1,me=!0,we=!1,de=!0,Fe=!1,He=!1,Ze=!1,De=!1,Y=!1,j=!1,Ne=!0,at=!1,Je="user-content-",v=!0,G=!1,Re={},Ie=null,je=pt({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]),We=null,dt=pt({},["audio","video","img","source","image","track"]),$t=null,It=pt({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),Tt="http://www.w3.org/1998/Math/MathML",ft="http://www.w3.org/2000/svg",ct="http://www.w3.org/1999/xhtml",xt=ct,Ct=!1,Mt=null,oe=pt({},[Tt,ft,ct],Fa),J=pt({},["mi","mo","mn","ms","mtext"]),$=pt({},["annotation-xml"]),N=pt({},["title","style","font","a","script"]),te=null,ne=["application/xhtml+xml","text/html"],le="text/html",Be=null,Ye=null,et=n.createElement("form"),Ue=function(T){return T instanceof RegExp||T instanceof Function},ht=function(){let T=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(Ye&&Ye===T)){if((!T||typeof T!="object")&&(T={}),T=Xn(T),te=ne.indexOf(T.PARSER_MEDIA_TYPE)===-1?le:T.PARSER_MEDIA_TYPE,Be=te==="application/xhtml+xml"?Fa:pi,Z=Sn(T,"ALLOWED_TAGS")?pt({},T.ALLOWED_TAGS,Be):Ce,ge=Sn(T,"ALLOWED_ATTR")?pt({},T.ALLOWED_ATTR,Be):Te,Mt=Sn(T,"ALLOWED_NAMESPACES")?pt({},T.ALLOWED_NAMESPACES,Fa):oe,$t=Sn(T,"ADD_URI_SAFE_ATTR")?pt(Xn(It),T.ADD_URI_SAFE_ATTR,Be):It,We=Sn(T,"ADD_DATA_URI_TAGS")?pt(Xn(dt),T.ADD_DATA_URI_TAGS,Be):dt,Ie=Sn(T,"FORBID_CONTENTS")?pt({},T.FORBID_CONTENTS,Be):je,Pe=Sn(T,"FORBID_TAGS")?pt({},T.FORBID_TAGS,Be):Xn({}),Xe=Sn(T,"FORBID_ATTR")?pt({},T.FORBID_ATTR,Be):Xn({}),Re=Sn(T,"USE_PROFILES")?T.USE_PROFILES:!1,L=T.ALLOW_ARIA_ATTR!==!1,se=T.ALLOW_DATA_ATTR!==!1,ae=T.ALLOW_UNKNOWN_PROTOCOLS||!1,me=T.ALLOW_SELF_CLOSE_IN_ATTR!==!1,we=T.SAFE_FOR_TEMPLATES||!1,de=T.SAFE_FOR_XML!==!1,Fe=T.WHOLE_DOCUMENT||!1,De=T.RETURN_DOM||!1,Y=T.RETURN_DOM_FRAGMENT||!1,j=T.RETURN_TRUSTED_TYPE||!1,Ze=T.FORCE_BODY||!1,Ne=T.SANITIZE_DOM!==!1,at=T.SANITIZE_NAMED_PROPS||!1,v=T.KEEP_CONTENT!==!1,G=T.IN_PLACE||!1,E=T.ALLOWED_URI_REGEXP||fd,xt=T.NAMESPACE||ct,J=T.MATHML_TEXT_INTEGRATION_POINTS||J,$=T.HTML_INTEGRATION_POINTS||$,be=T.CUSTOM_ELEMENT_HANDLING||{},T.CUSTOM_ELEMENT_HANDLING&&Ue(T.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(be.tagNameCheck=T.CUSTOM_ELEMENT_HANDLING.tagNameCheck),T.CUSTOM_ELEMENT_HANDLING&&Ue(T.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(be.attributeNameCheck=T.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),T.CUSTOM_ELEMENT_HANDLING&&typeof T.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(be.allowCustomizedBuiltInElements=T.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),we&&(se=!1),Y&&(De=!0),Re&&(Z=pt({},ad),ge=[],Re.html===!0&&(pt(Z,id),pt(ge,ld)),Re.svg===!0&&(pt(Z,Ba),pt(ge,za),pt(ge,di)),Re.svgFilters===!0&&(pt(Z,Ua),pt(ge,za),pt(ge,di)),Re.mathMl===!0&&(pt(Z,Wa),pt(ge,cd),pt(ge,di))),T.ADD_TAGS&&(typeof T.ADD_TAGS=="function"?Ke.tagCheck=T.ADD_TAGS:(Z===Ce&&(Z=Xn(Z)),pt(Z,T.ADD_TAGS,Be))),T.ADD_ATTR&&(typeof T.ADD_ATTR=="function"?Ke.attributeCheck=T.ADD_ATTR:(ge===Te&&(ge=Xn(ge)),pt(ge,T.ADD_ATTR,Be))),T.ADD_URI_SAFE_ATTR&&pt($t,T.ADD_URI_SAFE_ATTR,Be),T.FORBID_CONTENTS&&(Ie===je&&(Ie=Xn(Ie)),pt(Ie,T.FORBID_CONTENTS,Be)),v&&(Z["#text"]=!0),Fe&&pt(Z,["html","head","body"]),Z.table&&(pt(Z,["tbody"]),delete Pe.tbody),T.TRUSTED_TYPES_POLICY){if(typeof T.TRUSTED_TYPES_POLICY.createHTML!="function")throw Wo('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof T.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw Wo('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');q=T.TRUSTED_TYPES_POLICY,O=q.createHTML("")}else q===void 0&&(q=Zg(m,o)),q!==null&&typeof O=="string"&&(O=q.createHTML(""));an&&an(T),Ye=T}},Rt=pt({},[...Ba,...Ua,...Bg]),yt=pt({},[...Wa,...Ug]),tn=function(T){let ye=W(T);(!ye||!ye.tagName)&&(ye={namespaceURI:xt,tagName:"template"});let fe=pi(T.tagName),b=pi(ye.tagName);return Mt[T.namespaceURI]?T.namespaceURI===ft?ye.namespaceURI===ct?fe==="svg":ye.namespaceURI===Tt?fe==="svg"&&(b==="annotation-xml"||J[b]):!!Rt[fe]:T.namespaceURI===Tt?ye.namespaceURI===ct?fe==="math":ye.namespaceURI===ft?fe==="math"&&$[b]:!!yt[fe]:T.namespaceURI===ct?ye.namespaceURI===ft&&!$[b]||ye.namespaceURI===Tt&&!J[b]?!1:!yt[fe]&&(N[fe]||!Rt[fe]):!!(te==="application/xhtml+xml"&&Mt[T.namespaceURI]):!1},wt=function(T){Bo(t.removed,{element:T});try{W(T).removeChild(T)}catch{z(T)}},Ot=function(T,ye){try{Bo(t.removed,{attribute:ye.getAttributeNode(T),from:ye})}catch{Bo(t.removed,{attribute:null,from:ye})}if(ye.removeAttribute(T),T==="is")if(De||Y)try{wt(ye)}catch{}else try{ye.setAttribute(T,"")}catch{}},jt=function(T){let ye=null,fe=null;if(Ze)T="<remove></remove>"+T;else{let _=ja(T,/^[\r\n\t ]+/);fe=_&&_[0]}te==="application/xhtml+xml"&&xt===ct&&(T='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+T+"</body></html>");let b=q?q.createHTML(T):T;if(xt===ct)try{ye=new g().parseFromString(b,te)}catch{}if(!ye||!ye.documentElement){ye=I.createDocument(xt,"template",null);try{ye.documentElement.innerHTML=Ct?O:b}catch{}}let p=ye.body||ye.documentElement;return T&&fe&&p.insertBefore(n.createTextNode(fe),p.childNodes[0]||null),xt===ct?ue.call(ye,Fe?"html":"body")[0]:Fe?ye.documentElement:p},lt=function(T){return F.call(T.ownerDocument||T,T,u.SHOW_ELEMENT|u.SHOW_COMMENT|u.SHOW_TEXT|u.SHOW_PROCESSING_INSTRUCTION|u.SHOW_CDATA_SECTION,null)},Ht=function(T){return T instanceof f&&(typeof T.nodeName!="string"||typeof T.textContent!="string"||typeof T.removeChild!="function"||!(T.attributes instanceof d)||typeof T.removeAttribute!="function"||typeof T.setAttribute!="function"||typeof T.namespaceURI!="string"||typeof T.insertBefore!="function"||typeof T.hasChildNodes!="function")},Gt=function(T){return typeof l=="function"&&T instanceof l};function Bt(_e,T,ye){ui(_e,fe=>{fe.call(t,T,ye,Ye)})}let un=function(T){let ye=null;if(Bt(B.beforeSanitizeElements,T,null),Ht(T))return wt(T),!0;let fe=Be(T.nodeName);if(Bt(B.uponSanitizeElement,T,{tagName:fe,allowedTags:Z}),de&&T.hasChildNodes()&&!Gt(T.firstElementChild)&&sn(/<[/\w!]/g,T.innerHTML)&&sn(/<[/\w!]/g,T.textContent)||T.nodeType===Ho.progressingInstruction||de&&T.nodeType===Ho.comment&&sn(/<[/\w]/g,T.data))return wt(T),!0;if(!(Ke.tagCheck instanceof Function&&Ke.tagCheck(fe))&&(!Z[fe]||Pe[fe])){if(!Pe[fe]&&Vt(fe)&&(be.tagNameCheck instanceof RegExp&&sn(be.tagNameCheck,fe)||be.tagNameCheck instanceof Function&&be.tagNameCheck(fe)))return!1;if(v&&!Ie[fe]){let b=W(T)||T.parentNode,p=ee(T)||T.childNodes;if(p&&b){let _=p.length;for(let S=_-1;S>=0;--S){let K=R(p[S],!0);K.__removalCount=(T.__removalCount||0)+1,b.insertBefore(K,X(T))}}}return wt(T),!0}return T instanceof a&&!tn(T)||(fe==="noscript"||fe==="noembed"||fe==="noframes")&&sn(/<\/no(script|embed|frames)/i,T.innerHTML)?(wt(T),!0):(we&&T.nodeType===Ho.text&&(ye=T.textContent,ui([Q,re,Ee],b=>{ye=Uo(ye,b," ")}),T.textContent!==ye&&(Bo(t.removed,{element:T.cloneNode()}),T.textContent=ye)),Bt(B.afterSanitizeElements,T,null),!1)},Nt=function(T,ye,fe){if(Ne&&(ye==="id"||ye==="name")&&(fe in n||fe in et))return!1;if(!(se&&!Xe[ye]&&sn(he,ye))){if(!(L&&sn(pe,ye))){if(!(Ke.attributeCheck instanceof Function&&Ke.attributeCheck(ye,T))){if(!ge[ye]||Xe[ye]){if(!(Vt(T)&&(be.tagNameCheck instanceof RegExp&&sn(be.tagNameCheck,T)||be.tagNameCheck instanceof Function&&be.tagNameCheck(T))&&(be.attributeNameCheck instanceof RegExp&&sn(be.attributeNameCheck,ye)||be.attributeNameCheck instanceof Function&&be.attributeNameCheck(ye,T))||ye==="is"&&be.allowCustomizedBuiltInElements&&(be.tagNameCheck instanceof RegExp&&sn(be.tagNameCheck,fe)||be.tagNameCheck instanceof Function&&be.tagNameCheck(fe))))return!1}else if(!$t[ye]){if(!sn(E,Uo(fe,Ae,""))){if(!((ye==="src"||ye==="xlink:href"||ye==="href")&&T!=="script"&&Ng(fe,"data:")===0&&We[T])){if(!(ae&&!sn(P,Uo(fe,Ae,"")))){if(fe)return!1}}}}}}}return!0},Vt=function(T){return T!=="annotation-xml"&&ja(T,Se)},Ut=function(T){Bt(B.beforeSanitizeAttributes,T,null);let{attributes:ye}=T;if(!ye||Ht(T))return;let fe={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:ge,forceKeepAttr:void 0},b=ye.length;for(;b--;){let p=ye[b],{name:_,namespaceURI:S,value:K}=p,V=Be(_),ie=K,xe=_==="value"?ie:qg(ie);if(fe.attrName=V,fe.attrValue=xe,fe.keepAttr=!0,fe.forceKeepAttr=void 0,Bt(B.uponSanitizeAttribute,T,fe),xe=fe.attrValue,at&&(V==="id"||V==="name")&&(Ot(_,T),xe=Je+xe),de&&sn(/((--!?|])>)|<\/(style|title|textarea)/i,xe)){Ot(_,T);continue}if(V==="attributename"&&ja(xe,"href")){Ot(_,T);continue}if(fe.forceKeepAttr)continue;if(!fe.keepAttr){Ot(_,T);continue}if(!me&&sn(/\/>/i,xe)){Ot(_,T);continue}we&&ui([Q,re,Ee],ot=>{xe=Uo(xe,ot," ")});let Ve=Be(T.nodeName);if(!Nt(Ve,V,xe)){Ot(_,T);continue}if(q&&typeof m=="object"&&typeof m.getAttributeType=="function"&&!S)switch(m.getAttributeType(Ve,V)){case"TrustedHTML":{xe=q.createHTML(xe);break}case"TrustedScriptURL":{xe=q.createScriptURL(xe);break}}if(xe!==ie)try{S?T.setAttributeNS(S,_,xe):T.setAttribute(_,xe),Ht(T)?wt(T):sd(t.removed)}catch{Ot(_,T)}}Bt(B.afterSanitizeAttributes,T,null)},Zt=function _e(T){let ye=null,fe=lt(T);for(Bt(B.beforeSanitizeShadowDOM,T,null);ye=fe.nextNode();)Bt(B.uponSanitizeShadowNode,ye,null),un(ye),Ut(ye),ye.content instanceof s&&_e(ye.content);Bt(B.afterSanitizeShadowDOM,T,null)};return t.sanitize=function(_e){let T=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},ye=null,fe=null,b=null,p=null;if(Ct=!_e,Ct&&(_e="<!-->"),typeof _e!="string"&&!Gt(_e))if(typeof _e.toString=="function"){if(_e=_e.toString(),typeof _e!="string")throw Wo("dirty is not a string, aborting")}else throw Wo("toString is not a function");if(!t.isSupported)return _e;if(He||ht(T),t.removed=[],typeof _e=="string"&&(G=!1),G){if(_e.nodeName){let K=Be(_e.nodeName);if(!Z[K]||Pe[K])throw Wo("root node is forbidden and cannot be sanitized in-place")}}else if(_e instanceof l)ye=jt("<!---->"),fe=ye.ownerDocument.importNode(_e,!0),fe.nodeType===Ho.element&&fe.nodeName==="BODY"||fe.nodeName==="HTML"?ye=fe:ye.appendChild(fe);else{if(!De&&!we&&!Fe&&_e.indexOf("<")===-1)return q&&j?q.createHTML(_e):_e;if(ye=jt(_e),!ye)return De?null:j?O:""}ye&&Ze&&wt(ye.firstChild);let _=lt(G?_e:ye);for(;b=_.nextNode();)un(b),Ut(b),b.content instanceof s&&Zt(b.content);if(G)return _e;if(De){if(Y)for(p=U.call(ye.ownerDocument);ye.firstChild;)p.appendChild(ye.firstChild);else p=ye;return(ge.shadowroot||ge.shadowrootmode)&&(p=M.call(r,p,!0)),p}let S=Fe?ye.outerHTML:ye.innerHTML;return Fe&&Z["!doctype"]&&ye.ownerDocument&&ye.ownerDocument.doctype&&ye.ownerDocument.doctype.name&&sn(_d,ye.ownerDocument.doctype.name)&&(S="<!DOCTYPE "+ye.ownerDocument.doctype.name+`>
`+S),we&&ui([Q,re,Ee],K=>{S=Uo(S,K," ")}),q&&j?q.createHTML(S):S},t.setConfig=function(){let _e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};ht(_e),He=!0},t.clearConfig=function(){Ye=null,He=!1},t.isValidAttribute=function(_e,T,ye){Ye||ht({});let fe=Be(_e),b=Be(T);return Nt(fe,b,ye)},t.addHook=function(_e,T){typeof T=="function"&&Bo(B[_e],T)},t.removeHook=function(_e,T){if(T!==void 0){let ye=Pg(B[_e],T);return ye===-1?void 0:Dg(B[_e],ye,1)[0]}return sd(B[_e])},t.removeHooks=function(_e){B[_e]=[]},t.removeAllHooks=function(){B=dd()},t}var gd=md();var Qn={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},fi=e=>(...t)=>({_$litDirective$:e,values:t}),oo=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,n,r){this._$Ct=t,this._$AM=n,this._$Ci=r}_$AS(t,n){return this.update(t,n)}update(t,n){return this.render(...n)}};var Go=class extends oo{constructor(t){if(super(t),this.it=Pt,t.type!==Qn.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===Pt||t==null)return this._t=void 0,this.it=t;if(t===yn)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;let n=[t];return n.raw=n,this._t={_$litType$:this.constructor.resultType,strings:n,values:[]}}};Go.directiveName="unsafeHTML",Go.resultType=1;var hd=fi(Go);function Qa(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var Tr=Qa();function xd(e){Tr=e}var Xo={exec:()=>null};function gt(e,t=""){let n=typeof e=="string"?e:e.source,r={replace:(o,s)=>{let i=typeof s=="string"?s:s.source;return i=i.replace(cn.caret,"$1"),n=n.replace(o,i),r},getRegex:()=>new RegExp(n,t)};return r}var Jg=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),cn={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i")},eh=/^(?:[ \t]*(?:\n|$))+/,th=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,nh=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,Qo=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,rh=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,Za=/(?:[*+-]|\d{1,9}[.)])/,Ad=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,Sd=gt(Ad).replace(/bull/g,Za).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),oh=gt(Ad).replace(/bull/g,Za).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),Ja=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,sh=/^[^\n]+/,el=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,ih=gt(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",el).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),ah=gt(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,Za).getRegex(),yi="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",tl=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,lh=gt("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",tl).replace("tag",yi).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),Ed=gt(Ja).replace("hr",Qo).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",yi).getRegex(),ch=gt(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",Ed).getRegex(),nl={blockquote:ch,code:th,def:ih,fences:nh,heading:rh,hr:Qo,html:lh,lheading:Sd,list:ah,newline:eh,paragraph:Ed,table:Xo,text:sh},bd=gt("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",Qo).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",yi).getRegex(),uh={...nl,lheading:oh,table:bd,paragraph:gt(Ja).replace("hr",Qo).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",bd).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",yi).getRegex()},dh={...nl,html:gt(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",tl).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:Xo,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:gt(Ja).replace("hr",Qo).replace("heading",` *#{1,6} *[^
]`).replace("lheading",Sd).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},ph=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,fh=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,Td=/^( {2,}|\\)\n(?!\s*$)/,_h=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,vi=/[\p{P}\p{S}]/u,rl=/[\s\p{P}\p{S}]/u,Cd=/[^\s\p{P}\p{S}]/u,mh=gt(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,rl).getRegex(),Rd=/(?!~)[\p{P}\p{S}]/u,gh=/(?!~)[\s\p{P}\p{S}]/u,hh=/(?:[^\s\p{P}\p{S}]|~)/u,bh=gt(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",Jg?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),Od=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,yh=gt(Od,"u").replace(/punct/g,vi).getRegex(),vh=gt(Od,"u").replace(/punct/g,Rd).getRegex(),Ld="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",wh=gt(Ld,"gu").replace(/notPunctSpace/g,Cd).replace(/punctSpace/g,rl).replace(/punct/g,vi).getRegex(),kh=gt(Ld,"gu").replace(/notPunctSpace/g,hh).replace(/punctSpace/g,gh).replace(/punct/g,Rd).getRegex(),$h=gt("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,Cd).replace(/punctSpace/g,rl).replace(/punct/g,vi).getRegex(),xh=gt(/\\(punct)/,"gu").replace(/punct/g,vi).getRegex(),Ah=gt(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),Sh=gt(tl).replace("(?:-->|$)","-->").getRegex(),Eh=gt("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",Sh).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),gi=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,Th=gt(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",gi).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),Id=gt(/^!?\[(label)\]\[(ref)\]/).replace("label",gi).replace("ref",el).getRegex(),Md=gt(/^!?\[(ref)\](?:\[\])?/).replace("ref",el).getRegex(),Ch=gt("reflink|nolink(?!\\()","g").replace("reflink",Id).replace("nolink",Md).getRegex(),yd=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,ol={_backpedal:Xo,anyPunctuation:xh,autolink:Ah,blockSkip:bh,br:Td,code:fh,del:Xo,emStrongLDelim:yh,emStrongRDelimAst:wh,emStrongRDelimUnd:$h,escape:ph,link:Th,nolink:Md,punctuation:mh,reflink:Id,reflinkSearch:Ch,tag:Eh,text:_h,url:Xo},Rh={...ol,link:gt(/^!?\[(label)\]\((.*?)\)/).replace("label",gi).getRegex(),reflink:gt(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",gi).getRegex()},Ya={...ol,emStrongRDelimAst:kh,emStrongLDelim:vh,url:gt(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",yd).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:gt(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",yd).getRegex()},Oh={...Ya,br:gt(Td).replace("{2,}","*").getRegex(),text:gt(Ya.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},_i={normal:nl,gfm:uh,pedantic:dh},Ko={normal:ol,gfm:Ya,breaks:Oh,pedantic:Rh},Lh={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},vd=e=>Lh[e];function Zn(e,t){if(t){if(cn.escapeTest.test(e))return e.replace(cn.escapeReplace,vd)}else if(cn.escapeTestNoEncode.test(e))return e.replace(cn.escapeReplaceNoEncode,vd);return e}function wd(e){try{e=encodeURI(e).replace(cn.percentDecode,"%")}catch{return null}return e}function kd(e,t){let n=e.replace(cn.findPipe,(s,i,l)=>{let a=!1,u=i;for(;--u>=0&&l[u]==="\\";)a=!a;return a?"|":" |"}),r=n.split(cn.splitPipe),o=0;if(r[0].trim()||r.shift(),r.length>0&&!r.at(-1)?.trim()&&r.pop(),t)if(r.length>t)r.splice(t);else for(;r.length<t;)r.push("");for(;o<r.length;o++)r[o]=r[o].trim().replace(cn.slashPipe,"|");return r}function Yo(e,t,n){let r=e.length;if(r===0)return"";let o=0;for(;o<r;){let s=e.charAt(r-o-1);if(s===t&&!n)o++;else if(s!==t&&n)o++;else break}return e.slice(0,r-o)}function Ih(e,t){if(e.indexOf(t[1])===-1)return-1;let n=0;for(let r=0;r<e.length;r++)if(e[r]==="\\")r++;else if(e[r]===t[0])n++;else if(e[r]===t[1]&&(n--,n<0))return r;return n>0?-2:-1}function $d(e,t,n,r,o){let s=t.href,i=t.title||null,l=e[1].replace(o.other.outputLinkReplace,"$1");r.state.inLink=!0;let a={type:e[0].charAt(0)==="!"?"image":"link",raw:n,href:s,title:i,text:l,tokens:r.inlineTokens(l)};return r.state.inLink=!1,a}function Mh(e,t,n){let r=e.match(n.other.indentCodeCompensation);if(r===null)return t;let o=r[1];return t.split(`
`).map(s=>{let i=s.match(n.other.beginningSpace);if(i===null)return s;let[l]=i;return l.length>=o.length?s.slice(o.length):s}).join(`
`)}var hi=class{constructor(e){At(this,"options");At(this,"rules");At(this,"lexer");this.options=e||Tr}space(e){let t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){let t=this.rules.block.code.exec(e);if(t){let n=t[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?n:Yo(n,`
`)}}}fences(e){let t=this.rules.block.fences.exec(e);if(t){let n=t[0],r=Mh(n,t[3]||"",this.rules);return{type:"code",raw:n,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:r}}}heading(e){let t=this.rules.block.heading.exec(e);if(t){let n=t[2].trim();if(this.rules.other.endingHash.test(n)){let r=Yo(n,"#");(this.options.pedantic||!r||this.rules.other.endingSpaceChar.test(r))&&(n=r.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:n,tokens:this.lexer.inline(n)}}}hr(e){let t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:Yo(t[0],`
`)}}blockquote(e){let t=this.rules.block.blockquote.exec(e);if(t){let n=Yo(t[0],`
`).split(`
`),r="",o="",s=[];for(;n.length>0;){let i=!1,l=[],a;for(a=0;a<n.length;a++)if(this.rules.other.blockquoteStart.test(n[a]))l.push(n[a]),i=!0;else if(!i)l.push(n[a]);else break;n=n.slice(a);let u=l.join(`
`),d=u.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");r=r?`${r}
${u}`:u,o=o?`${o}
${d}`:d;let f=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(d,s,!0),this.lexer.state.top=f,n.length===0)break;let g=s.at(-1);if(g?.type==="code")break;if(g?.type==="blockquote"){let m=g,k=m.raw+`
`+n.join(`
`),R=this.blockquote(k);s[s.length-1]=R,r=r.substring(0,r.length-m.raw.length)+R.raw,o=o.substring(0,o.length-m.text.length)+R.text;break}else if(g?.type==="list"){let m=g,k=m.raw+`
`+n.join(`
`),R=this.list(k);s[s.length-1]=R,r=r.substring(0,r.length-g.raw.length)+R.raw,o=o.substring(0,o.length-m.raw.length)+R.raw,n=k.substring(s.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:r,tokens:s,text:o}}}list(e){let t=this.rules.block.list.exec(e);if(t){let n=t[1].trim(),r=n.length>1,o={type:"list",raw:"",ordered:r,start:r?+n.slice(0,-1):"",loose:!1,items:[]};n=r?`\\d{1,9}\\${n.slice(-1)}`:`\\${n}`,this.options.pedantic&&(n=r?n:"[*+-]");let s=this.rules.other.listItemRegex(n),i=!1;for(;e;){let a=!1,u="",d="";if(!(t=s.exec(e))||this.rules.block.hr.test(e))break;u=t[0],e=e.substring(u.length);let f=t[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,R=>" ".repeat(3*R.length)),g=e.split(`
`,1)[0],m=!f.trim(),k=0;if(this.options.pedantic?(k=2,d=f.trimStart()):m?k=t[1].length+1:(k=t[2].search(this.rules.other.nonSpaceChar),k=k>4?1:k,d=f.slice(k),k+=t[1].length),m&&this.rules.other.blankLine.test(g)&&(u+=g+`
`,e=e.substring(g.length+1),a=!0),!a){let R=this.rules.other.nextBulletRegex(k),z=this.rules.other.hrRegex(k),X=this.rules.other.fencesBeginRegex(k),ee=this.rules.other.headingBeginRegex(k),W=this.rules.other.htmlBeginRegex(k);for(;e;){let q=e.split(`
`,1)[0],O;if(g=q,this.options.pedantic?(g=g.replace(this.rules.other.listReplaceNesting,"  "),O=g):O=g.replace(this.rules.other.tabCharGlobal,"    "),X.test(g)||ee.test(g)||W.test(g)||R.test(g)||z.test(g))break;if(O.search(this.rules.other.nonSpaceChar)>=k||!g.trim())d+=`
`+O.slice(k);else{if(m||f.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||X.test(f)||ee.test(f)||z.test(f))break;d+=`
`+g}!m&&!g.trim()&&(m=!0),u+=q+`
`,e=e.substring(q.length+1),f=O.slice(k)}}o.loose||(i?o.loose=!0:this.rules.other.doubleBlankLine.test(u)&&(i=!0)),o.items.push({type:"list_item",raw:u,task:!!this.options.gfm&&this.rules.other.listIsTask.test(d),loose:!1,text:d,tokens:[]}),o.raw+=u}let l=o.items.at(-1);if(l)l.raw=l.raw.trimEnd(),l.text=l.text.trimEnd();else return;o.raw=o.raw.trimEnd();for(let a of o.items){if(this.lexer.state.top=!1,a.tokens=this.lexer.blockTokens(a.text,[]),a.task){if(a.text=a.text.replace(this.rules.other.listReplaceTask,""),a.tokens[0]?.type==="text"||a.tokens[0]?.type==="paragraph"){a.tokens[0].raw=a.tokens[0].raw.replace(this.rules.other.listReplaceTask,""),a.tokens[0].text=a.tokens[0].text.replace(this.rules.other.listReplaceTask,"");for(let d=this.lexer.inlineQueue.length-1;d>=0;d--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[d].src)){this.lexer.inlineQueue[d].src=this.lexer.inlineQueue[d].src.replace(this.rules.other.listReplaceTask,"");break}}let u=this.rules.other.listTaskCheckbox.exec(a.raw);if(u){let d={type:"checkbox",raw:u[0]+" ",checked:u[0]!=="[ ]"};a.checked=d.checked,o.loose?a.tokens[0]&&["paragraph","text"].includes(a.tokens[0].type)&&"tokens"in a.tokens[0]&&a.tokens[0].tokens?(a.tokens[0].raw=d.raw+a.tokens[0].raw,a.tokens[0].text=d.raw+a.tokens[0].text,a.tokens[0].tokens.unshift(d)):a.tokens.unshift({type:"paragraph",raw:d.raw,text:d.raw,tokens:[d]}):a.tokens.unshift(d)}}if(!o.loose){let u=a.tokens.filter(f=>f.type==="space"),d=u.length>0&&u.some(f=>this.rules.other.anyLine.test(f.raw));o.loose=d}}if(o.loose)for(let a of o.items){a.loose=!0;for(let u of a.tokens)u.type==="text"&&(u.type="paragraph")}return o}}html(e){let t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){let t=this.rules.block.def.exec(e);if(t){let n=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),r=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",o=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:n,raw:t[0],href:r,title:o}}}table(e){let t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;let n=kd(t[1]),r=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),o=t[3]?.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],s={type:"table",raw:t[0],header:[],align:[],rows:[]};if(n.length===r.length){for(let i of r)this.rules.other.tableAlignRight.test(i)?s.align.push("right"):this.rules.other.tableAlignCenter.test(i)?s.align.push("center"):this.rules.other.tableAlignLeft.test(i)?s.align.push("left"):s.align.push(null);for(let i=0;i<n.length;i++)s.header.push({text:n[i],tokens:this.lexer.inline(n[i]),header:!0,align:s.align[i]});for(let i of o)s.rows.push(kd(i,s.header.length).map((l,a)=>({text:l,tokens:this.lexer.inline(l),header:!1,align:s.align[a]})));return s}}lheading(e){let t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){let t=this.rules.block.paragraph.exec(e);if(t){let n=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:n,tokens:this.lexer.inline(n)}}}text(e){let t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){let t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){let t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){let t=this.rules.inline.link.exec(e);if(t){let n=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(n)){if(!this.rules.other.endAngleBracket.test(n))return;let s=Yo(n.slice(0,-1),"\\");if((n.length-s.length)%2===0)return}else{let s=Ih(t[2],"()");if(s===-2)return;if(s>-1){let i=(t[0].indexOf("!")===0?5:4)+t[1].length+s;t[2]=t[2].substring(0,s),t[0]=t[0].substring(0,i).trim(),t[3]=""}}let r=t[2],o="";if(this.options.pedantic){let s=this.rules.other.pedanticHrefTitle.exec(r);s&&(r=s[1],o=s[3])}else o=t[3]?t[3].slice(1,-1):"";return r=r.trim(),this.rules.other.startAngleBracket.test(r)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(n)?r=r.slice(1):r=r.slice(1,-1)),$d(t,{href:r&&r.replace(this.rules.inline.anyPunctuation,"$1"),title:o&&o.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let n;if((n=this.rules.inline.reflink.exec(e))||(n=this.rules.inline.nolink.exec(e))){let r=(n[2]||n[1]).replace(this.rules.other.multipleSpaceGlobal," "),o=t[r.toLowerCase()];if(!o){let s=n[0].charAt(0);return{type:"text",raw:s,text:s}}return $d(n,o,n[0],this.lexer,this.rules)}}emStrong(e,t,n=""){let r=this.rules.inline.emStrongLDelim.exec(e);if(!(!r||r[3]&&n.match(this.rules.other.unicodeAlphaNumeric))&&(!(r[1]||r[2])||!n||this.rules.inline.punctuation.exec(n))){let o=[...r[0]].length-1,s,i,l=o,a=0,u=r[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(u.lastIndex=0,t=t.slice(-1*e.length+o);(r=u.exec(t))!=null;){if(s=r[1]||r[2]||r[3]||r[4]||r[5]||r[6],!s)continue;if(i=[...s].length,r[3]||r[4]){l+=i;continue}else if((r[5]||r[6])&&o%3&&!((o+i)%3)){a+=i;continue}if(l-=i,l>0)continue;i=Math.min(i,i+l+a);let d=[...r[0]][0].length,f=e.slice(0,o+r.index+d+i);if(Math.min(o,i)%2){let m=f.slice(1,-1);return{type:"em",raw:f,text:m,tokens:this.lexer.inlineTokens(m)}}let g=f.slice(2,-2);return{type:"strong",raw:f,text:g,tokens:this.lexer.inlineTokens(g)}}}}codespan(e){let t=this.rules.inline.code.exec(e);if(t){let n=t[2].replace(this.rules.other.newLineCharGlobal," "),r=this.rules.other.nonSpaceChar.test(n),o=this.rules.other.startingSpaceChar.test(n)&&this.rules.other.endingSpaceChar.test(n);return r&&o&&(n=n.substring(1,n.length-1)),{type:"codespan",raw:t[0],text:n}}}br(e){let t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){let t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){let t=this.rules.inline.autolink.exec(e);if(t){let n,r;return t[2]==="@"?(n=t[1],r="mailto:"+n):(n=t[1],r=n),{type:"link",raw:t[0],text:n,href:r,tokens:[{type:"text",raw:n,text:n}]}}}url(e){let t;if(t=this.rules.inline.url.exec(e)){let n,r;if(t[2]==="@")n=t[0],r="mailto:"+n;else{let o;do o=t[0],t[0]=this.rules.inline._backpedal.exec(t[0])?.[0]??"";while(o!==t[0]);n=t[0],t[1]==="www."?r="http://"+t[0]:r=t[0]}return{type:"link",raw:t[0],text:n,href:r,tokens:[{type:"text",raw:n,text:n}]}}}inlineText(e){let t=this.rules.inline.text.exec(e);if(t){let n=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:n}}}},En=class Va{constructor(t){At(this,"tokens");At(this,"options");At(this,"state");At(this,"inlineQueue");At(this,"tokenizer");this.tokens=[],this.tokens.links=Object.create(null),this.options=t||Tr,this.options.tokenizer=this.options.tokenizer||new hi,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let n={other:cn,block:_i.normal,inline:Ko.normal};this.options.pedantic?(n.block=_i.pedantic,n.inline=Ko.pedantic):this.options.gfm&&(n.block=_i.gfm,this.options.breaks?n.inline=Ko.breaks:n.inline=Ko.gfm),this.tokenizer.rules=n}static get rules(){return{block:_i,inline:Ko}}static lex(t,n){return new Va(n).lex(t)}static lexInline(t,n){return new Va(n).inlineTokens(t)}lex(t){t=t.replace(cn.carriageReturn,`
`),this.blockTokens(t,this.tokens);for(let n=0;n<this.inlineQueue.length;n++){let r=this.inlineQueue[n];this.inlineTokens(r.src,r.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(t,n=[],r=!1){for(this.options.pedantic&&(t=t.replace(cn.tabCharGlobal,"    ").replace(cn.spaceLine,""));t;){let o;if(this.options.extensions?.block?.some(i=>(o=i.call({lexer:this},t,n))?(t=t.substring(o.raw.length),n.push(o),!0):!1))continue;if(o=this.tokenizer.space(t)){t=t.substring(o.raw.length);let i=n.at(-1);o.raw.length===1&&i!==void 0?i.raw+=`
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
`+o.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=i.text):n.push(o);continue}if(t){let i="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(i);break}else throw new Error(i)}}return this.state.top=!0,n}inline(t,n=[]){return this.inlineQueue.push({src:t,tokens:n}),n}inlineTokens(t,n=[]){let r=t,o=null;if(this.tokens.links){let a=Object.keys(this.tokens.links);if(a.length>0)for(;(o=this.tokenizer.rules.inline.reflinkSearch.exec(r))!=null;)a.includes(o[0].slice(o[0].lastIndexOf("[")+1,-1))&&(r=r.slice(0,o.index)+"["+"a".repeat(o[0].length-2)+"]"+r.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(o=this.tokenizer.rules.inline.anyPunctuation.exec(r))!=null;)r=r.slice(0,o.index)+"++"+r.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let s;for(;(o=this.tokenizer.rules.inline.blockSkip.exec(r))!=null;)s=o[2]?o[2].length:0,r=r.slice(0,o.index+s)+"["+"a".repeat(o[0].length-s-2)+"]"+r.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);r=this.options.hooks?.emStrongMask?.call({lexer:this},r)??r;let i=!1,l="";for(;t;){i||(l=""),i=!1;let a;if(this.options.extensions?.inline?.some(d=>(a=d.call({lexer:this},t,n))?(t=t.substring(a.raw.length),n.push(a),!0):!1))continue;if(a=this.tokenizer.escape(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.tag(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.link(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(a.raw.length);let d=n.at(-1);a.type==="text"&&d?.type==="text"?(d.raw+=a.raw,d.text+=a.text):n.push(a);continue}if(a=this.tokenizer.emStrong(t,r,l)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.codespan(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.br(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.del(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.autolink(t)){t=t.substring(a.raw.length),n.push(a);continue}if(!this.state.inLink&&(a=this.tokenizer.url(t))){t=t.substring(a.raw.length),n.push(a);continue}let u=t;if(this.options.extensions?.startInline){let d=1/0,f=t.slice(1),g;this.options.extensions.startInline.forEach(m=>{g=m.call({lexer:this},f),typeof g=="number"&&g>=0&&(d=Math.min(d,g))}),d<1/0&&d>=0&&(u=t.substring(0,d+1))}if(a=this.tokenizer.inlineText(u)){t=t.substring(a.raw.length),a.raw.slice(-1)!=="_"&&(l=a.raw.slice(-1)),i=!0;let d=n.at(-1);d?.type==="text"?(d.raw+=a.raw,d.text+=a.text):n.push(a);continue}if(t){let d="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(d);break}else throw new Error(d)}}return n}},bi=class{constructor(e){At(this,"options");At(this,"parser");this.options=e||Tr}space(e){return""}code({text:e,lang:t,escaped:n}){let r=(t||"").match(cn.notSpaceStart)?.[0],o=e.replace(cn.endingNewline,"")+`
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
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${Zn(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:n}){let r=this.parser.parseInline(n),o=wd(e);if(o===null)return r;e=o;let s='<a href="'+e+'"';return t&&(s+=' title="'+Zn(t)+'"'),s+=">"+r+"</a>",s}image({href:e,title:t,text:n,tokens:r}){r&&(n=this.parser.parseInline(r,this.parser.textRenderer));let o=wd(e);if(o===null)return Zn(n);e=o;let s=`<img src="${e}" alt="${n}"`;return t&&(s+=` title="${Zn(t)}"`),s+=">",s}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:Zn(e.text)}},sl=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}checkbox({raw:e}){return e}},Tn=class Xa{constructor(t){At(this,"options");At(this,"renderer");At(this,"textRenderer");this.options=t||Tr,this.options.renderer=this.options.renderer||new bi,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new sl}static parse(t,n){return new Xa(n).parse(t)}static parseInline(t,n){return new Xa(n).parseInline(t)}parse(t){let n="";for(let r=0;r<t.length;r++){let o=t[r];if(this.options.extensions?.renderers?.[o.type]){let i=o,l=this.options.extensions.renderers[i.type].call({parser:this},i);if(l!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(i.type)){n+=l||"";continue}}let s=o;switch(s.type){case"space":{n+=this.renderer.space(s);break}case"hr":{n+=this.renderer.hr(s);break}case"heading":{n+=this.renderer.heading(s);break}case"code":{n+=this.renderer.code(s);break}case"table":{n+=this.renderer.table(s);break}case"blockquote":{n+=this.renderer.blockquote(s);break}case"list":{n+=this.renderer.list(s);break}case"checkbox":{n+=this.renderer.checkbox(s);break}case"html":{n+=this.renderer.html(s);break}case"def":{n+=this.renderer.def(s);break}case"paragraph":{n+=this.renderer.paragraph(s);break}case"text":{n+=this.renderer.text(s);break}default:{let i='Token with "'+s.type+'" type was not found.';if(this.options.silent)return console.error(i),"";throw new Error(i)}}}return n}parseInline(t,n=this.renderer){let r="";for(let o=0;o<t.length;o++){let s=t[o];if(this.options.extensions?.renderers?.[s.type]){let l=this.options.extensions.renderers[s.type].call({parser:this},s);if(l!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(s.type)){r+=l||"";continue}}let i=s;switch(i.type){case"escape":{r+=n.text(i);break}case"html":{r+=n.html(i);break}case"link":{r+=n.link(i);break}case"image":{r+=n.image(i);break}case"checkbox":{r+=n.checkbox(i);break}case"strong":{r+=n.strong(i);break}case"em":{r+=n.em(i);break}case"codespan":{r+=n.codespan(i);break}case"br":{r+=n.br(i);break}case"del":{r+=n.del(i);break}case"text":{r+=n.text(i);break}default:{let l='Token with "'+i.type+'" type was not found.';if(this.options.silent)return console.error(l),"";throw new Error(l)}}}return r}},mi,Vo=(mi=class{constructor(e){At(this,"options");At(this,"block");this.options=e||Tr}preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}emStrongMask(e){return e}provideLexer(){return this.block?En.lex:En.lexInline}provideParser(){return this.block?Tn.parse:Tn.parseInline}},At(mi,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens","emStrongMask"])),At(mi,"passThroughHooksRespectAsync",new Set(["preprocess","postprocess","processAllTokens"])),mi),Ph=class{constructor(...e){At(this,"defaults",Qa());At(this,"options",this.setOptions);At(this,"parse",this.parseMarkdown(!0));At(this,"parseInline",this.parseMarkdown(!1));At(this,"Parser",Tn);At(this,"Renderer",bi);At(this,"TextRenderer",sl);At(this,"Lexer",En);At(this,"Tokenizer",hi);At(this,"Hooks",Vo);this.use(...e)}walkTokens(e,t){let n=[];for(let r of e)switch(n=n.concat(t.call(this,r)),r.type){case"table":{let o=r;for(let s of o.header)n=n.concat(this.walkTokens(s.tokens,t));for(let s of o.rows)for(let i of s)n=n.concat(this.walkTokens(i.tokens,t));break}case"list":{let o=r;n=n.concat(this.walkTokens(o.items,t));break}default:{let o=r;this.defaults.extensions?.childTokens?.[o.type]?this.defaults.extensions.childTokens[o.type].forEach(s=>{let i=o[s].flat(1/0);n=n.concat(this.walkTokens(i,t))}):o.tokens&&(n=n.concat(this.walkTokens(o.tokens,t)))}}return n}use(...e){let t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(n=>{let r={...n};if(r.async=this.defaults.async||r.async||!1,n.extensions&&(n.extensions.forEach(o=>{if(!o.name)throw new Error("extension name required");if("renderer"in o){let s=t.renderers[o.name];s?t.renderers[o.name]=function(...i){let l=o.renderer.apply(this,i);return l===!1&&(l=s.apply(this,i)),l}:t.renderers[o.name]=o.renderer}if("tokenizer"in o){if(!o.level||o.level!=="block"&&o.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let s=t[o.level];s?s.unshift(o.tokenizer):t[o.level]=[o.tokenizer],o.start&&(o.level==="block"?t.startBlock?t.startBlock.push(o.start):t.startBlock=[o.start]:o.level==="inline"&&(t.startInline?t.startInline.push(o.start):t.startInline=[o.start]))}"childTokens"in o&&o.childTokens&&(t.childTokens[o.name]=o.childTokens)}),r.extensions=t),n.renderer){let o=this.defaults.renderer||new bi(this.defaults);for(let s in n.renderer){if(!(s in o))throw new Error(`renderer '${s}' does not exist`);if(["options","parser"].includes(s))continue;let i=s,l=n.renderer[i],a=o[i];o[i]=(...u)=>{let d=l.apply(o,u);return d===!1&&(d=a.apply(o,u)),d||""}}r.renderer=o}if(n.tokenizer){let o=this.defaults.tokenizer||new hi(this.defaults);for(let s in n.tokenizer){if(!(s in o))throw new Error(`tokenizer '${s}' does not exist`);if(["options","rules","lexer"].includes(s))continue;let i=s,l=n.tokenizer[i],a=o[i];o[i]=(...u)=>{let d=l.apply(o,u);return d===!1&&(d=a.apply(o,u)),d}}r.tokenizer=o}if(n.hooks){let o=this.defaults.hooks||new Vo;for(let s in n.hooks){if(!(s in o))throw new Error(`hook '${s}' does not exist`);if(["options","block"].includes(s))continue;let i=s,l=n.hooks[i],a=o[i];Vo.passThroughHooks.has(s)?o[i]=u=>{if(this.defaults.async&&Vo.passThroughHooksRespectAsync.has(s))return(async()=>{let f=await l.call(o,u);return a.call(o,f)})();let d=l.call(o,u);return a.call(o,d)}:o[i]=(...u)=>{if(this.defaults.async)return(async()=>{let f=await l.apply(o,u);return f===!1&&(f=await a.apply(o,u)),f})();let d=l.apply(o,u);return d===!1&&(d=a.apply(o,u)),d}}r.hooks=o}if(n.walkTokens){let o=this.defaults.walkTokens,s=n.walkTokens;r.walkTokens=function(i){let l=[];return l.push(s.call(this,i)),o&&(l=l.concat(o.call(this,i))),l}}this.defaults={...this.defaults,...r}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return En.lex(e,t??this.defaults)}parser(e,t){return Tn.parse(e,t??this.defaults)}parseMarkdown(e){return(t,n)=>{let r={...n},o={...this.defaults,...r},s=this.onError(!!o.silent,!!o.async);if(this.defaults.async===!0&&r.async===!1)return s(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof t>"u"||t===null)return s(new Error("marked(): input parameter is undefined or null"));if(typeof t!="string")return s(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(t)+", string expected"));if(o.hooks&&(o.hooks.options=o,o.hooks.block=e),o.async)return(async()=>{let i=o.hooks?await o.hooks.preprocess(t):t,l=await(o.hooks?await o.hooks.provideLexer():e?En.lex:En.lexInline)(i,o),a=o.hooks?await o.hooks.processAllTokens(l):l;o.walkTokens&&await Promise.all(this.walkTokens(a,o.walkTokens));let u=await(o.hooks?await o.hooks.provideParser():e?Tn.parse:Tn.parseInline)(a,o);return o.hooks?await o.hooks.postprocess(u):u})().catch(s);try{o.hooks&&(t=o.hooks.preprocess(t));let i=(o.hooks?o.hooks.provideLexer():e?En.lex:En.lexInline)(t,o);o.hooks&&(i=o.hooks.processAllTokens(i)),o.walkTokens&&this.walkTokens(i,o.walkTokens);let l=(o.hooks?o.hooks.provideParser():e?Tn.parse:Tn.parseInline)(i,o);return o.hooks&&(l=o.hooks.postprocess(l)),l}catch(i){return s(i)}}}onError(e,t){return n=>{if(n.message+=`
Please report this to https://github.com/markedjs/marked.`,e){let r="<p>An error occurred:</p><pre>"+Zn(n.message+"",!0)+"</pre>";return t?Promise.resolve(r):r}if(t)return Promise.reject(n);throw n}}},Er=new Ph;function vt(e,t){return Er.parse(e,t)}vt.options=vt.setOptions=function(e){return Er.setOptions(e),vt.defaults=Er.defaults,xd(vt.defaults),vt};vt.getDefaults=Qa;vt.defaults=Tr;vt.use=function(...e){return Er.use(...e),vt.defaults=Er.defaults,xd(vt.defaults),vt};vt.walkTokens=function(e,t){return Er.walkTokens(e,t)};vt.parseInline=Er.parseInline;vt.Parser=Tn;vt.parser=Tn.parse;vt.Renderer=bi;vt.TextRenderer=sl;vt.Lexer=En;vt.lexer=En.lex;vt.Tokenizer=hi;vt.Hooks=Vo;vt.parse=vt;var W$=vt.options,z$=vt.setOptions,H$=vt.use,G$=vt.walkTokens,K$=vt.parseInline;var Y$=Tn.parse,V$=En.lex;function cr(e){let t=vt.parse(e),n=gd.sanitize(t);return hd(n)}function Jn(e,t){return c`<div class="prompt-block">
    <div class="prompt-block__label">${e}</div>
    <pre class="prompt-block__body">${t}</pre>
  </div>`}function so(e){return e.loading?c`<div class="prompt-block__status">불러오는 중…</div>`:e.error?c`<div class="prompt-block__status prompt-block__status--error">
      프롬프트를 불러오지 못했습니다
    </div>`:""}function wi(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),n=r=>String(r).padStart(2,"0");return`${t.getFullYear()}-${n(t.getMonth()+1)}-${n(t.getDate())} ${n(t.getHours())}:${n(t.getMinutes())}`}var Dd={Read:"\u{1F4D6}",Edit:"\u270E",MultiEdit:"\u270E",Write:"\u{1F4DD}",Bash:"\u26A1",Grep:"\u{1F50E}",Glob:"\u{1F50E}",Task:"\u{1F916}",Agent:"\u{1F916}",WebFetch:"\u{1F310}",WebSearch:"\u{1F310}"},Dh={command_execution:"\uBA85\uB839 \uC2E4\uD589",file_change:"\uD30C\uC77C \uBCC0\uACBD",mcp_call:"MCP \uD638\uCD9C",web_search:"\uC6F9 \uAC80\uC0C9",plan:"\uACC4\uD68D"},Nh=/^\s*([✓✗⊘])\s*(spec|impl|implementation|plan)\s*게이트\s*[—–-]\s*(\S+)\s+(APPROVE|REVISE|REJECT|BLOCK|SKIP)(?:\s*·\s*(.+))?/,qh=/^\s*#{0,3}\s*Phase\s+\d+(?:\s*\/\s*\d+)?\s*(?:[·:—–-]\s*.+)?$/;function Cn(e){return!!e&&typeof e=="object"}function il(e){return typeof e!="string"||e.length===0?[]:e.split(/\r?\n/)}function al(e,t){let n=il(e),r=il(t),o=new Map;for(let l of n)o.set(l,(o.get(l)||0)+1);let s=0;for(let l of r){let a=o.get(l)||0;a>0?o.set(l,a-1):s+=1}let i=0;for(let l of o.values())i+=l;return{added:s,removed:i}}function Nd(e){let t="";typeof e=="string"?t=e:Array.isArray(e)?t=e.map(o=>Cn(o)&&typeof o.text=="string"?o.text:"").join(""):Cn(e)&&typeof e.text=="string"&&(t=e.text);let r=(String(t).split(/\r?\n/).find(o=>o.trim().length>0)||"").trim();return r.length>120?`${r.slice(0,117)}\u2026`:r}function Fh(e){let t=String(e.name||""),n=e.input||{},r={kind:"tool",tool:t,icon:Dd[t]||"\u{1F527}",input:n,expandable:!0};if((t==="Read"||t==="Write")&&(r.path=String(n.file_path||n.path||"")),t==="Write"&&(r.added=il(n.content).length),t==="Edit"){r.path=String(n.file_path||n.path||"");let{added:o,removed:s}=al(n.old_string,n.new_string);r.added=o,r.removed=s}if(t==="MultiEdit"){r.path=String(n.file_path||n.path||"");let o=0,s=0,i=Array.isArray(n.edits)?n.edits:[];for(let l of i){let a=al(Cn(l)?l.old_string:"",Cn(l)?l.new_string:"");o+=a.added,s+=a.removed}r.added=o,r.removed=s}return t==="Bash"&&(r.command=String(n.command||"")),(t==="Grep"||t==="Glob")&&(r.command=String(n.pattern||n.query||"")),t==="Agent"&&(typeof e.id=="string"&&e.id.length>0&&(r.launch_id=e.id),typeof n.description=="string"&&(r.command=n.description)),r}function ll(e){return typeof e!="string"||e.trim().length===0?null:{kind:"thinking",text:e}}var jh=/<system-reminder>[\s\S]*?<\/system-reminder>/g;function qd(e){let t;if(typeof e=="string")t=e;else if(Array.isArray(e))t=e.filter(r=>Cn(r)&&r.type==="text"&&typeof r.text=="string").map(r=>String(r.text)).join(`
`);else return null;let n=t.replace(jh,"").trim();return n.length>0?{kind:"user",text:n}:null}function cl(e){let t=e.split(/\r?\n/).find(r=>r.trim().length>0)||"",n=Nh.exec(t);return n?{kind:"gate",gate:n[2]==="implementation"?"impl":n[2],reviewer:n[3],verdict:n[4],time:n[5]?n[5].trim():void 0,text:t.trim()}:qh.test(t)&&t.trim().length<=80?{kind:"phase",text:t.trim()}:{kind:"assistant",text:e}}function Bh(e,t){if(e.subtype==="init"){let n=typeof e.model=="string"?e.model:"";return t.progress=null,[{kind:"thinking",text:n?`\uC138\uC158 \uC2DC\uC791 \xB7 ${n}`:"\uC138\uC158 \uC2DC\uC791"}]}if(e.subtype==="thinking_tokens"){let r=`\uC0DD\uAC01 \uC911\u2026 ${typeof e.estimated_tokens=="number"&&Number.isFinite(e.estimated_tokens)?Math.max(0,Math.round(e.estimated_tokens)):0} \uD1A0\uD070`;return t.progress?(t.progress.text=r,[]):(t.progress={kind:"thinking",text:r},[t.progress])}return[]}function Uh(e,t){let n=typeof e.parent_tool_use_id=="string"&&e.parent_tool_use_id.length>0?e.parent_tool_use_id:null;if(e.type==="assistant"){let r=e.message,o=r&&Array.isArray(r.content)?r.content:[],s=[];for(let i of o)if(Cn(i)){if(i.type==="text"&&typeof i.text=="string")s.push(cl(i.text));else if(i.type==="thinking"){let l=ll(i.thinking);l&&s.push(l)}else if(i.type==="tool_use"){let l=Fh(i);typeof i.id=="string"&&t.set(i.id,l),s.push(l)}}return n?Pd(s,n):s}if(e.type==="user"){let r=e.message,o=r&&Array.isArray(r.content)?r.content:[];for(let i of o)if(Cn(i)&&i.type==="tool_result"){let l=t.get(String(i.tool_use_id));if(l){let a=Nd(i.content);l.result=a,l.output=typeof i.content=="string"?i.content:a,i.is_error===!0&&(l.is_error=!0)}}let s=qd(r&&r.content);return s?[s]:[]}if(e.type==="result"){let r=e.is_error===!1&&e.subtype==="success",o={kind:"result",success:r,text:typeof e.result=="string"?e.result:r?"DONE":""};return n?Pd([o],n):[o]}return[]}function Pd(e,t){for(let n of e)n.parent_tool_use_id=t;return e}function Wh(e){let t=typeof e.command=="string"?e.command:"",n=Nd(e.aggregated_output===void 0?e.output:e.aggregated_output),o=[typeof e.exit_code=="number"&&Number.isFinite(e.exit_code)?`exit ${e.exit_code}`:typeof e.status=="string"&&e.status.length>0?e.status:"",n].filter(i=>i.length>0).join(" \xB7 "),s={kind:"tool",tool:"shell",icon:Dd.Bash,command:t,input:{command:t},expandable:!0};return o.length>0&&(s.result=o),typeof e.aggregated_output=="string"&&(s.output=e.aggregated_output),s}function zh(e){if(e.type==="item.completed"&&Cn(e.item)){let t=e.item;if(t.type==="agent_message"&&typeof t.text=="string")return[cl(t.text)];if(t.type==="user_message"){let n=qd(t.text);return n?[n]:[]}if(t.type==="reasoning"){let n=ll(t.text);return n?[n]:[]}return t.type==="error"?[{kind:"error",text:String(t.message||"")}]:t.type==="command_execution"?[Wh(t)]:[]}if(e.type==="turn.completed")return[{kind:"result",success:!0,text:"DONE"}];if(e.type==="turn.failed"){let t=e.error;return[{kind:"error",text:t&&typeof t.message=="string"?t.message:"turn failed"}]}return e.type==="error"?[{kind:"error",text:String(e.message||"")}]:[]}function Hh(e){if(e.schema!=="codex-delegation-monitor-v1"||!Cn(e.event))return[];let t=e.event;if(t.type==="session.started"||t.type==="turn.started")return[];if((t.type==="item.started"||t.type==="item.completed")&&Cn(t.item)){let n=t.item;if(typeof n.id!="string"||n.id.length===0)return[];if(t.type==="item.completed"&&n.kind==="agent_message"&&typeof n.text=="string"&&n.text.trim().length>0)return[cl(n.text)];if(t.type==="item.completed"&&n.kind==="reasoning"){let l=ll(n.text);return l?[l]:[]}if(n.kind!=="activity"||typeof n.activity!="string")return[];let r=Dh[n.activity];if(!r)return[];let o="\uC2DC\uC791",s="\u2026",i={kind:"tool",tool:"",icon:s,expandable:!1};if(t.type==="item.completed"){if(n.status==="completed")o="\uC644\uB8CC",s="\u2713";else if(n.status==="failed")o="\uC2E4\uD328",s="\u2717";else return[];i.result=""}return i.tool=`${r} \xB7 ${o}`,i.icon=s,[i]}return t.type==="turn.completed"&&t.status==="completed"?[{kind:"result",success:!0,text:"DONE"}]:t.type==="turn.failed"&&(t.status==="failed"||t.status==="interrupted")&&typeof t.error_code=="string"&&t.error_code.length>0?[{kind:"error",text:t.error_code}]:[]}function Gh(e){let t=e.type;return typeof t=="string"&&(t==="error"||t.startsWith("thread.")||t.startsWith("turn.")||t.startsWith("item."))}function Kh(e){let t=e;if(typeof e=="string"){let n=e.trim();if(n.length===0)return null;try{t=JSON.parse(n)}catch{return null}}return Cn(t)?t:null}function Fd(e={}){let t=e.skip_delegated===!0,n=new Map,r={progress:null};return{push(o){let s=Kh(o);if(!s)return[];if(t&&typeof s.parent_tool_use_id=="string"&&s.parent_tool_use_id.length>0)return[];if(s.type==="system"&&s.schema!=="codex-delegation-monitor-v1")return Bh(s,r);let i=s.schema==="codex-delegation-monitor-v1"?Hh(s):Gh(s)?zh(s):Uh(s,n);return i.length>0&&(r.progress=null),i}}}function ul(e){let t=[],n=Fd(),r=Array.isArray(e)?e:[];for(let o of r)for(let s of n.push(o))t.push(s);return t}var Yh=5,Vh=10,Xh=/Task\s+#(\d+)/,Qh=/\bgh\s+pr\s+create\b|\bgit\s+push\b/,Zh=/\bnpm\s+(?:run\s+)?(?:test|tsc|lint|build)\b|\bvitest\b/;function Zo(e){return typeof e!="string"?"":(e.split(/\r?\n/).find(t=>t.trim().length>0)||"").trim()}function Jh(e){return typeof e!="string"||e.length===0?0:e.split(/\r?\n/).length}function eb(e){for(let t=e.length-1;t>=0;t-=1){let n=e[t];if(n.kind==="phase"||n.kind==="gate")return n.text||null}return null}function tb(e){let t=new Map,n=0;for(let o of e){if(o.kind!=="tool")continue;n+=1;let s=o.input||{};if(o.tool==="TaskCreate"){let a=Xh.exec(o.output||o.result||""),u=String(s.activeForm||s.subject||"").trim();if(!a||u.length===0)continue;t.set(a[1],{label:u,active:s.status==="in_progress"?n:0});continue}if(o.tool!=="TaskUpdate")continue;let i=t.get(String(s.taskId??""));if(!i)continue;let l=s.activeForm||s.subject;typeof l=="string"&&l.trim().length>0&&(i.label=l.trim()),typeof s.status=="string"&&(i.active=s.status==="in_progress"?n:0)}let r=null;for(let o of t.values())o.active>0&&(!r||o.active>r.active)&&(r=o);return r?r.label:null}function nb(e){if(e.tool==="Bash"){let t=e.command||"";return Qh.test(t)?"~ PR/\uAC8C\uC2DC \uC911":Zh.test(t)?"~ \uAC80\uC99D \uC911":null}return e.tool==="Edit"||e.tool==="Write"||e.tool==="MultiEdit"?"~ \uAD6C\uD604 \uC911":e.tool==="Read"||e.tool==="Grep"||e.tool==="Glob"?"~ \uD0D0\uC0C9 \uC911":null}function rb(e){let t=e.filter(o=>o.kind==="tool").slice(-Vh),n=new Map;t.forEach((o,s)=>{let i=nb(o);if(!i)return;let l=n.get(i)||{count:0,last:-1};l.count+=1,l.last=s,n.set(i,l)});let r=null;for(let[o,s]of n)(!r||s.count>r.count||s.count===r.count&&s.last>r.last)&&(r={label:o,count:s.count,last:s.last});return r?r.label:null}function ob(e){let t=eb(e);if(t)return{text:t,guess:!1};let n=tb(e);if(n)return{text:n,guess:!1};let r=rb(e);return r?{text:r,guess:!0}:null}function sb(e,t){if(typeof e!="number")return"";let n=Math.max(0,Math.floor((t-e)/1e3));return n<60?`${n}\uCD08 \uC804`:rn(e,t)}function io(e,t={}){let{transport:n,sessionLogStore:r,onClose:o}=t,s=null,i=null,l=null,a=null,u=null,d=!1,f={},g=!0,m=new Set,k=new Set,R=null,z=null,X=!1,ee=!1,W=!1,q=null,O=null;function I(){X=!1,ee=!1,W=!1,q=null,O=null}async function F(Y){if(n){ee=!0,W=!1,Pe();try{let j=await Promise.resolve(n("get-attempt-prompt",{attempt_id:Y,...u?{root_dir:u}:{}}));if(s!==Y)return;!j||typeof j!="object"||Array.isArray(j)?W=!0:(q=j,O=Y)}catch{s===Y&&(W=!0)}finally{s===Y&&(ee=!1,Pe())}}}function U(){if(X=!X,X&&s&&O!==s){F(s);return}Pe()}function ue(){if(!X)return"";let Y=so({loading:ee,error:W});if(Y)return c`<div class="sv__prompt" data-seam="attempt-prompt">
        ${Y}
      </div>`;if(!q)return"";if(q.missing)return c`<div class="sv__prompt" data-seam="attempt-prompt">
        <div class="prompt-block__status">
          기록 없음 — 프롬프트 기록 이전에 실행된 attempt입니다
        </div>
      </div>`;let j=wi(q.recorded_at);return c`<div class="sv__prompt" data-seam="attempt-prompt">
      ${j?c`<div class="prompt-block__meta">${j} 발송</div>`:""}
      ${typeof q.task_prompt=="string"?Jn("\uACFC\uC5C5 (user)",q.task_prompt):""}
      ${typeof q.system_prompt=="string"?Jn("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",q.system_prompt):""}
    </div>`}function M(){if(!a||!r)return[];let Y=r.get(a);return ul(Y?Y.lines:[])}function B(){if(!a||!r)return null;let Y=r.get(a),j=Y?Y.last_event_at:null;return typeof j=="number"?j:null}function Q(){return f.status==="running"}function re(){if(Q()&&s){z||(z=setInterval(()=>Pe(),1e3));return}Ee()}function Ee(){z&&(clearInterval(z),z=null)}function he(Y){let j=[],Ne=0;for(;Ne<Y.length;){let{idx:at,line:Je}=Y[Ne];if(Je.kind==="tool"){let v=Ne;for(;v<Y.length&&Y[v].line.kind==="tool"&&Y[v].line.tool===Je.tool;)v+=1;if(v-Ne>=Yh&&!k.has(at)){j.push({kind:"group",idx:at,tool:Je.tool||"",lines:Y.slice(Ne,v)}),Ne=v;continue}}j.push({kind:"line",idx:at,line:Je}),Ne+=1}return j}function pe(Y){let j=[],Ne=new Map;for(let v=0;v<Y.length;v+=1){let G=Y[v],Re=G.parent_tool_use_id;if(typeof Re=="string"&&Re.length>0){let Ie=Ne.get(Re);Ie||(Ie={kind:"subagent",idx:v,launch_id:Re,agent_type:null,header:null,lines:[]},Ne.set(Re,Ie),j.push(Ie)),Ie.lines.push({idx:v,line:G});continue}if(G.kind==="tool"&&G.tool==="Agent"&&typeof G.launch_id=="string"&&G.launch_id.length>0){let Ie=P(G),je=Ne.get(G.launch_id);if(je){je.header={idx:v,line:G},je.agent_type=Ie;continue}let We={kind:"subagent",idx:v,launch_id:G.launch_id,agent_type:Ie,header:{idx:v,line:G},lines:[]};Ne.set(G.launch_id,We),j.push(We);continue}j.push({kind:"entry",idx:v,line:G})}let at=[],Je=0;for(;Je<j.length;){if(j[Je].kind!=="entry"){at.push(j[Je]),Je+=1;continue}let v=Je;for(;v<j.length&&j[v].kind==="entry";)v+=1;at.push(...he(j.slice(Je,v))),Je=v}return at}function P(Y){let j=Y.input;return j&&typeof j.subagent_type=="string"?j.subagent_type:null}function Ae(Y){for(let j=Y.length-1;j>=0;j-=1){let Ne=Y[j];if(Ne.kind==="result"||Ne.kind==="error")return null;if(Ne.kind==="tool"&&!Object.hasOwn(Ne,"result"))return Ne}return null}function Se(Y){for(let j=Y.length-1;j>=0;j-=1)if(Y[j].kind==="thinking")return Y[j];return null}function E(Y,j){if(j.kind==="gate")return c`<div class="sv__gate">${j.text}</div>`;if(j.kind==="phase")return c`<div class="sv__phase">${j.text}</div>`;if(j.kind==="result")return c`<div
        class="sv__result${j.success?" sv__result--ok":" sv__result--fail"}"
      >
        <span class="sv__result-glyph">${j.success?"\u2713":"\u2717"}</span>
        <span class="sv__result-body"
          >${cr(j.text||(j.success?"DONE":"\uC2E4\uD328"))}</span
        >
      </div>`;if(j.kind==="thinking"){let Ne=m.has(Y);return c`<div
        class="sv__think${Ne?" sv__think--expanded":""}"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>Ke(Y)}
      >
        <span class="sv__think-line">💭 ${Zo(j.text)}</span>
        ${Ne?c`<pre class="sv__think-expand">${j.text}</pre>`:""}
      </div>`}if(j.kind==="user"){let Ne=m.has(Y);return c`<div
        class="sv__line sv__line--user${Ne?" sv__line--expanded":""}"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>Ke(Y)}
      >
        <span class="sv__user-line">▷ ${Zo(j.text)}</span>
        ${Ne?c`<pre class="sv__user-expand">${j.text}</pre>`:""}
      </div>`}if(j.kind==="error")return c`<div class="sv__error">⛔ ${j.text}</div>`;if(j.kind==="blocker")return c`<div class="sv__error">⛔ ${j.text}</div>`;if(j.kind==="tool"){let Ne=m.has(Y),at=j.tool==="Bash"?Jh(j.command):0,Je=j.tool==="Bash"?at>1?Zo(j.command):j.command:j.path||j.command||"";return c`<div
        class="sv__tool${Ne?" sv__tool--expanded":""}"
        role="button"
        tabindex="0"
        @click=${()=>Ke(Y)}
      >
        <span class="sv__tool-line">
          <span class="sv__tool-icon">${j.icon}</span>
          <span class="sv__tool-name">${j.tool}</span>
          ${Je?c`<span class="sv__tool-detail">${Je}</span>`:""}
          ${at>1?c`<span class="sv__tool-more">⋯ ${at}줄</span>`:""}
          ${typeof j.added=="number"?c`<span class="sv__diff-add">+${j.added}</span>`:""}
          ${typeof j.removed=="number"?c`<span class="sv__diff-del">−${j.removed}</span>`:""}
          ${j.result?c`<span class="sv__tool-ok">→ ${j.result}</span>`:""}
        </span>
        ${Ne?c`<pre class="sv__tool-expand">${Z(j)}</pre>`:""}
      </div>`}return c`<div class="sv__as">${cr(j.text||"")}</div>`}function Z(Y){let j=[];if(Y.tool==="Bash"&&typeof Y.command=="string"&&Y.command.length>0)j.push(Y.command);else if(Y.input!==void 0)try{j.push(`input: ${JSON.stringify(Y.input,null,2)}`)}catch{}return typeof Y.output=="string"&&Y.output.length>0&&j.push(`output:
${Y.output}`),j.join(`

`)}function Ce(){if(!s)return c``;let Y=M(),j=(i?[f.agent_type,f.model,f.effort]:[f.runner,f.model,f.effort]).filter(Boolean).join(" \xB7 "),Ne=f.session_id||"",at=`\uB77C\uC774\uBE0C \uB530\uB77C\uAC00\uAE30 ${g?"ON":"OFF"}`,Je=Q(),v=Je?sb(B(),Date.now()):"",G=Je?Ae(Y):null,Re=Je?Se(Y):null,Ie=ob(Y);return c`<div class="sv" data-attempt-id=${s}>
      <div class="sv__bar">
        <span class="sv__id"
          >${f.label||(i?f.role||"":s)}</span
        >
        ${Ie?c`<span
              class="sv__stage${Ie.guess?" sv__stage--guess":""}"
              title=${Ie.text}
              >${Ie.text}</span
            >`:""}
        ${Je?c`<span
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
        ${j?c`<span class="sv__meta">${j}</span>`:""}
        ${f.worktree?c`<span class="sv__wt" title=${f.worktree}
              >${f.worktree}</span
            >`:""}
        ${i||d?"":c`<button
              type="button"
              class="sv__prompt-toggle${X?" sv__prompt-toggle--on":""}"
              data-seam="attempt-prompt-toggle"
              aria-pressed=${X?"true":"false"}
              aria-label="발송 프롬프트 보기"
              title="이 세션에 실제로 보낸 시스템·과업 프롬프트"
              @click=${U}
            >
              ✉ 프롬프트
            </button>`}
        <button
          type="button"
          class="sv__follow${g?" sv__follow--on":""}"
          aria-pressed=${g?"true":"false"}
          aria-label=${at}
          @click=${L}
        >
          <span class="sv__follow-full">⇣ ${at}</span>
          <span class="sv__follow-short">⇣ ${g?"ON":"OFF"}</span>
        </button>
        <button
          type="button"
          class="sv__close"
          aria-label="닫기"
          @click=${()=>De()}
        >
          ✕
        </button>
      </div>
      ${i||d?"":ue()}
      <div class="sv__body">
        ${Y.length===0?c`<div class="sv__empty">세션 로그 없음</div>`:pe(Y).map(je=>je.kind==="subagent"?Te(je):je.kind==="group"?ge(je):E(je.idx,je.line))}
      </div>
      ${G||Re?c`<div class="sv__now">
            <span class="sv__now-label">지금</span>
            ${G?c`<span class="sv__now-icon">${G.icon}</span>
                  <span class="sv__now-name">${G.tool}</span>
                  <span class="sv__now-detail"
                    >${G.tool==="Bash"?Zo(G.command):G.path||G.command||""}</span
                  >`:""}
            ${Re?c`<span class="sv__now-think"
                  >💭 ${Zo(Re.text)}</span
                >`:""}
          </div>`:""}
    </div>`}function ge(Y){return c`<div
      class="sv__group"
      role="button"
      tabindex="0"
      title="펼치기"
      @click=${()=>be(Y.idx)}
    >
      <span class="sv__group-icon">${Y.lines[0].line.icon}</span>
      <span class="sv__group-name">${Y.tool}</span>
      <span class="sv__group-count">${Y.lines.length}</span>
      <span class="sv__group-caret" aria-hidden="true">▸</span>
    </div>`}function Te(Y){let j=k.has(Y.idx),Ne=Y.header?Y.header.line:null,at=Ne?Ne.is_error===!0?"\u2717":typeof Ne.result=="string"?"\u2713":"\u27F3":"",Je=Ne&&Ne.command?Ne.command:"";return c`<div class="sv__sub${j?" sv__sub--open":""}">
      <div
        class="sv__sub-head"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>be(Y.idx)}
      >
        <span class="sv__sub-icon" aria-hidden="true">🤖</span>
        <span class="sv__sub-name">${Y.agent_type||"subagent"}</span>
        ${Je?c`<span class="sv__sub-detail">${Je}</span>`:""}
        <span class="sv__sub-count">${Y.lines.length}줄</span>
        ${at?c`<span class="sv__sub-state">${at}</span>`:""}
        ${j?"":c`<span class="sv__sub-caret" aria-hidden="true">▸</span>`}
      </div>
      ${j?c`<div class="sv__sub-body">
            ${he(Y.lines).map(v=>v.kind==="group"?ge(v):E(v.idx,v.line))}
          </div>`:""}
    </div>`}function be(Y){k.add(Y),Pe()}function Pe(){rt(Ce(),e),re(),g&&Xe()}function Xe(){let Y=e.querySelector(".sv__body");Y&&(Y.scrollTop=Y.scrollHeight)}function Ke(Y){m.has(Y)?m.delete(Y):m.add(Y),Pe()}function L(){g=!g,Pe()}function se(Y){on(Y).then(j=>{j?ke("\uBCF5\uC0AC\uB428","success",1200):ke("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function ae(Y){!s||!Y||(f={...f,...Y},Pe())}function me(Y){let j=Y.target;if(!j||!j.classList||!j.classList.contains("sv__body"))return;!(j.scrollHeight-j.scrollTop-j.clientHeight<=4)&&g&&(g=!1,Pe())}e.addEventListener("scroll",me,!0);function we(Y){let j=Y.target;!j||typeof j.closest!="function"||e.contains(j)||j.closest("dialog")||j.closest(".md-viewer-root")||De()}let de=!1;function Fe(){de||(document.addEventListener("mousedown",we),de=!0)}function He(){de&&(document.removeEventListener("mousedown",we),de=!1)}function Ze(Y){let j=Y&&Y.attempt_id;if(!j)return;let Ne=typeof Y.launch_id=="string"&&Y.launch_id.length>0?Y.launch_id:null,at=Y.session_ref&&typeof Y.session_ref=="object"?Y.session_ref:null;if(Ne&&at)return;let Je=a;s=j,i=Ne,l=at,a=i?`session-log:${s}:${i}`:`session-log:${s}`,n&&Je&&Je!==a&&Promise.resolve(n("unsubscribe-session-log",{id:Je})).catch(()=>{}),u=typeof Y.root_dir=="string"&&Y.root_dir.length>0?Y.root_dir:null,f=Y.meta||{},d=Y.hide_prompt===!0,g=!0,m.clear(),k.clear(),I(),!R&&r&&(R=r.subscribe(Pe)),n&&Promise.resolve(n("subscribe-session-log",{id:a,attempt_id:s,...i?{launch_id:i}:{},...l?{session_ref:l}:{},...u?{root_dir:u}:{}})).catch(()=>{}),Fe(),Pe()}function De(){let Y=a;He(),s=null,i=null,l=null,a=null,u=null,d=!1,m.clear(),k.clear(),I(),Ee(),n&&Y&&Promise.resolve(n("unsubscribe-session-log",{id:Y})).catch(()=>{}),rt(c``,e),o&&o()}return{open:Ze,updateMeta:ae,close:De,isOpen(){return s!==null},destroy(){Ee(),He(),R&&(R(),R=null),e.removeEventListener("scroll",me,!0),s=null,i=null,l=null,a=null,u=null,d=!1,rt(c``,e)}}}function ib(e){return["plan_review","plan_approval","plan_check"].some(t=>{let n=e[t];return typeof n=="string"&&n.trim().length>0})}function ab(e){let t=e&&e.metadata||{},n=qr(e),r=[];return n.path&&r.push({kind:"spec",path:n.path,missing_state:n.evidence==="draft"?"spec_draft":null}),typeof t.plan_path=="string"&&t.plan_path.trim().length>0&&r.push({kind:"plan",path:t.plan_path.trim(),missing_state:ib(t)?null:"plan_pending"}),r}function jd(e,t){let n=ab(e);return c`
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
  `}var lb="## \u{1F916} \uC791\uC5C5 \uBCF4\uACE0\uC11C",cb=/^> (worker · attempt|session · sid) ([A-Za-z0-9._-]{1,64}) · (\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z)$/,ub=/^\*\*결론\*\* — (.+)$/;function ki(e){if(typeof e!="string"||e.length===0)return null;let t=e.split(/\r?\n/);if(t[0]!==lb)return null;let n=cb.exec(t[1]||"");if(!n)return null;let r=n[1].split(" ")[0],o=n[2],s=n[3],i=2;for(;i<t.length&&t[i].trim().length===0;)i+=1;let l=i<t.length?ub.exec(t[i]):null,a=l?l[1].replace(/\s+/g," ").trim():"",u=l?i+1:i;return{lane:r,identifier:o,timestamp:s,conclusion:a,body:t.slice(u).join(`
`).trim()}}var Bd=20;function Ud(e){if(e==null||e==="")return"";let t=new Date(e);if(Number.isNaN(t.getTime()))return"";let n=String(t.getMonth()+1).padStart(2,"0"),r=String(t.getDate()).padStart(2,"0"),o=String(t.getHours()).padStart(2,"0"),s=String(t.getMinutes()).padStart(2,"0");return`${n}-${r} ${o}:${s}`}function db(e){return e.length>Bd?`${e.slice(0,Bd)}\u2026`:e}function pb(e,t,n,r){let o=`${t.lane} ${db(t.identifier)}`;return c`<div class="detail-report">
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
        <span class="detail-report__time">${Ud(t.timestamp)}</span>
      </span>
      <span class="detail-report__concl">${t.conclusion}</span>
    </button>
    ${r&&t.body.length>0?c`<div class="detail-report__body">
          ${cr(t.body)}
        </div>`:""}
  </div>`}function fb(e){return c`<div class="detail-comment" data-comment-id=${e.id}>
    <div class="detail-comment__meta">
      <span class="detail-comment__author"
        >${e.author||"(\uC791\uC131\uC790 \uC5C6\uC74C)"}</span
      >
      <span class="detail-comment__time"
        >${Ud(e.created_at)}</span
      >
    </div>
    <div class="detail-comment__body">
      ${cr(typeof e.text=="string"?e.text:"")}
    </div>
  </div>`}function Wd(e,t={},n={}){let r=Array.isArray(e)?e.filter(Boolean):[],o=n.expanded||new Set,s=typeof n.draft=="string"?n.draft:"",i=n.sending===!0,l=r.slice().sort((a,u)=>String(u.created_at||"").localeCompare(String(a.created_at||"")));return c`
    <div class="detail-section-label">댓글 (${r.length})</div>
    ${n.error?c`<div class="detail-empty" data-seam="comments-error">
          댓글을 불러오지 못했습니다
        </div>`:l.length===0?c`<div class="detail-empty" data-seam="comments">댓글 없음</div>`:c`<div class="detail-comments" data-seam="comments">
            ${l.map(a=>{let u=ki(typeof a.text=="string"?a.text:"");return u?pb(a,u,t,o.has(a.id)):fb(a)})}
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
  `}var{I:Cx}=Fl;var zd=e=>e.strings===void 0;var _b={},Hd=(e,t=_b)=>e._$AH=t;var ur=fi(class extends oo{constructor(e){if(super(e),e.type!==Qn.PROPERTY&&e.type!==Qn.ATTRIBUTE&&e.type!==Qn.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!zd(e))throw Error("`live` bindings can only contain a single expression")}render(e){return e}update(e,[t]){if(t===yn||t===Pt)return t;let n=e.element,r=e.name;if(e.type===Qn.PROPERTY){if(t===n[r])return yn}else if(e.type===Qn.BOOLEAN_ATTRIBUTE){if(!!t===n.hasAttribute(r))return yn}else if(e.type===Qn.ATTRIBUTE&&n.getAttribute(r)===t+"")return yn;return Hd(e),t}});var mb=[{id:"spec",label:"spec \uB9AC\uBDF0",receipt:"spec_review",receipt_stage:null,fill_stage:"spec",stale_stage:"spec",hue:"spec"},{id:"plan",label:"\uACC4\uD68D \uB9AC\uBDF0",receipt:null,receipt_stage:"plan",fill_stage:"plan",stale_stage:"plan",hue:"plan"},{id:"impl",label:"\uAD6C\uD604",receipt:null,receipt_stage:null,fill_stage:"impl",stale_stage:null,hue:"impl"},{id:"impl_review",label:"impl \uB9AC\uBDF0",receipt:"impl_review",receipt_stage:null,fill_stage:null,stale_stage:"impl",hue:"impl"},{id:"pr",label:"PR",receipt:null,receipt_stage:null,fill_stage:"pr",stale_stage:null,hue:"pr"}],dl={quick_fix:["impl","impl_review"],spec_backed:["spec","impl","impl_review","pr"],full_plan:["spec","plan","impl","impl_review","pr"]},Gd={missing:"\uC2B9\uC778 \uD544\uC694",stale:"\uC7AC\uC2B9\uC778 \uD544\uC694",unknown:"\uC2B9\uC778 \uD655\uC778 \uBD88\uAC00"},gb={pin:"pin",global:"global",base:"base"};function hb(e){return c`<span
    class=${`detail-layer-rail detail-layer-rail--${gb[e]}`}
    data-source=${e}
    aria-hidden="true"
    ><i></i><i></i><i></i
  ></span>`}function bb(e,t,n){switch(e){case"workflow_mode":return xo;case"spec_review_model":case"impl_review_model":return Ao;case"plan_review_model":return Ls;case"spec_review_effort":case"plan_review_effort":case"impl_review_effort":return Is;case"impl_dispatch":return Yc;case"impl_runtime":return Os;case"impl_model":return Qr(n,t.impl_runtime);case"impl_effort":return Zr(n,t.impl_runtime,t.impl_model);case"impl_speed":case"orchestration_speed":return $o;case"orchestration_model":return So(n,null);case"orchestration_effort":return Zr(n,void 0,t.orchestration_model||hn).filter(r=>r!==hn);default:return[]}}function yb(e,t){return c`<div class="detail-effective__row" data-key=${e.key}>
    ${hb(e.source)}
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
      >${Ms[e.source]}</span
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
  </div>`}function Kd(e,t){let n=fa.flatMap(a=>a.keys),r=_a(n,e.metadata,e.workspace_values,e.execution_defaults,e.catalog,e.controller_runtime||null),o=tu(n,e.metadata,e.workspace_values,e.execution_defaults,e.catalog,e.controller_runtime||null),s=Object.fromEntries(r.map(a=>[a.key,a])),i=Object.fromEntries(r.filter(a=>a.value!==null).map(a=>[a.key,a.value])),l=r.filter(a=>a.full_value&&a.display!==a.full_value).map(a=>a.full_value).join(" \xB7 ");return c`<details
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
        >${vb(s)}</span
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
          ${fa.map(a=>c`
              <div class="detail-effective__subhead">${a.label}</div>
              ${r.filter(u=>a.keys.includes(u.key)).map(u=>{let d=Es({key:u.key,choices:bb(u.key,i,e.catalog),layer:"pin",pin:e.metadata,global:e.workspace_values,execution_defaults:e.execution_defaults,runner_catalog:e.catalog,route:typeof e.metadata?.route=="string"?e.metadata.route:null,controller_runtime:e.controller_runtime||null});return yb(u,{expanded:e.expanded,options:d.options,default_label:d.unset_label,default_full_value:d.full_value,onEdit:t.onEdit})})}
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
              >세션 키 12개를 핀으로 기록</span
            >
            ${(e.skipped_orchestration_keys||[]).length>0?c`<span
                  class="detail-effective__hint"
                  data-preset-skip-notice
                  >오케스트레이션 3키는 Bead에 핀할 수 없어 건너뜀</span
                >`:""}
          </div>
        </div>`:""}
  </details>`}function vb(e){let t=[];if(e.workflow_mode&&t.push(e.workflow_mode.display),e.impl_dispatch?.value==="main")t.push("\uBA54\uC778");else if(e.impl_dispatch?.value==="delegated"){let n=e.impl_runtime?` ${e.impl_runtime.display}`:"";t.push(`\uC704\uC784${n}`)}for(let n of["impl_model","impl_effort","impl_speed"])e[n]?.resolution!=="not_applicable"&&t.push(e[n]?.display||"\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00");return t.join(" \xB7 ")}function wb(e){if(!e||typeof e!="object")return null;let{kind:t,actor:n,effort:r,sha:o}=e;return typeof t!="string"||typeof n!="string"||typeof o!="string"?null:{kind:t,actor:n,effort:typeof r=="string"?r:null,sha:o}}function Yd(e,t={}){let n=e&&typeof e.metadata=="object"&&e.metadata?e.metadata:{},r=e&&typeof e.workflow=="object"&&e.workflow?e.workflow:{},o=r.stages||{},s=r.route||n.route||null,i=typeof n.pr_url=="string"?n.pr_url:"",l=typeof n.exec_receipt=="string"?n.exec_receipt:"",a=wb(r.exec_receipt),u=a?Wn(a):l,d=a?`${a.kind}:${a.actor}`:l.split("@")[0],f=As(r.planned_execution,r.exec_receipt),g=r.chips?.pr?.number,m=typeof g=="number"?`PR #${g}`:"PR",k=To(n),R=k!==null&&t.isChipOpen?.("rec")===!0,z=R?Aa({rec:k},"rec"):null;return c`<section class="detail-summary" data-seam="detail-summary">
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
            title=${Ns(k)}
            @click=${()=>t.onChipToggle?.("rec")}
          >
            ${"\uBCF5\uC7A1"}
          </button>`:""}
    </div>
    ${z?Vr(z):""}
    <div
      class="detail-summary__gates"
      role="group"
      aria-label="워크플로 게이트"
    >
      ${kb(s).map(X=>$b(X,n,o,{label:X.id==="pr"?m:X.label,href:X.id==="pr"?i:""}))}
    </div>
  </section>`}function kb(e){let n=typeof e=="string"&&Object.hasOwn(dl,e)&&dl[e]||dl.spec_backed;return mb.filter(r=>n.includes(r.id))}var $i={on:"\uD1B5\uACFC",stale:"\uC7AC\uAC80\uD1A0 \uD544\uC694",current:"\uC9C4\uD589 \uC911",none:"\uBBF8\uB3C4\uB2EC"};function $b(e,t,n,r){let o=xb(e,t,n),s=e.fill_stage?n[e.fill_stage]:null,i=typeof s?.fill=="string"?s.fill:null,l=i?i==="full":o.length>0,a=!l&&i==="dim",u=e.stale_stage?n[e.stale_stage]?.stale===!0:!1,d=o&&o.split("@")[1]?.slice(0,7)||"",f=u?$i.stale:l?$i.on:a?$i.current:$i.none,g=Ab(e,n),m=`${r.label} \xB7 ${f}${g?` \xB7 ${g}`:""}${o?` \xB7 ${o}`:""}`,k=`detail-summary__gate${l?" detail-summary__gate--on":""}${a?" detail-summary__gate--current":""}${u?" detail-summary__gate--stale":""}${d?" detail-summary__gate--receipt":""}`,R=c`<span class="detail-summary__gate-label"
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
  >`}function xb(e,t,n){if(e.receipt&&typeof t[e.receipt]=="string")return String(t[e.receipt]);if(e.receipt_stage){let r=n[e.receipt_stage]?.receipt;return typeof r=="string"?r:""}return""}function Ab(e,t){if(e.id!=="plan")return"";let n=t.plan?.approval_state;return typeof n=="string"&&Object.hasOwn(Gd,n)?Gd[n]:""}function xi(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function Vd(e){return xi(e)&&typeof e.key=="string"&&e.key.length>0&&typeof e.email=="string"&&e.email.length>0}function Xd(e,t){let n=e&&e[t];if(!xi(n)||!Array.isArray(n.accounts))return null;let r=n.accounts.filter(Vd),o=Vd(n.active)?n.active:null;return{accounts:r,active:o||r.find(s=>s.active===!0)||null}}function Jd(e){return typeof e.alias=="string"&&e.alias.length>0?` (${e.alias})`:""}function Ai(e){let t=typeof e.status=="string"&&e.status!=="ok"?` \xB7 ${e.status}`:"";return`${e.email}${Jd(e)}${t}`}function ao(e){let t=typeof e.plan=="string"&&e.plan.length>0?e.plan:"plan \uD655\uC778 \uBD88\uAC00";return`${e.email} \xB7 ${t}${Jd(e)}`}function Sb(e,t,n){if(n!==null){let o=e==="claude"?Ai:ao,s=t?t.accounts.find(i=>i.key===n):void 0;return`\uB808\uD3EC \uAE30\uBCF8\uAC12 \uC0AC\uC6A9(${s?o(s):n})`}return t?t.active?`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(${e==="claude"?t.active.email:ao({...t.active,alias:null})})`:"\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(\uD655\uC778 \uBD88\uAC00)":"(\uAE30\uBCF8)"}function Qd(e,t){if(!xi(e)||e.state!=="usable"||!xi(e.values))return null;let n=e.values[t];return typeof n=="string"&&n.length>0?n:null}function Zd(e){let t=e.provider_key==="claude"?Ai:ao,n=!!e.provider?.accounts.some(r=>r.key===e.selected);return c`<div class="detail-kv" data-exec-account-row=${e.key}>
    <span class="detail-kv__k">${e.title}</span>
    <span class="detail-kv__vgroup">
      <select
        class=${e.selected?"detail-kv__v detail-kv__v--sel":"detail-kv__v"}
        aria-label=${e.title}
        data-exec-key=${e.key}
        @change=${r=>e.handlers.onExecChange(e.key,r.target.value)}
      >
        <option value="" ?selected=${e.selected.length===0}>
          ${Sb(e.provider_key,e.provider,e.workspace_default)}
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
  </div>`}function ep({md:e,catalog:t,workspace_defaults:n=null,handlers:r}){let o=typeof e.claude_account=="string"?e.claude_account:"",s=typeof e.codex_account=="string"?e.codex_account:"";return c`<section class="exec-accounts" data-exec-accounts>
    <div class="detail-section-label">실행 계정</div>
    <div class="exec-settings-core">
      ${Zd({key:"claude_account",title:"Claude \uACC4\uC815",provider_key:"claude",provider:Xd(t,"claude"),selected:o,workspace_default:Qd(n,"claude_account"),handlers:r,hint:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uB7F0\uD0C0\uC784\uC774 claude\uC77C \uB54C \uC801\uC6A9\uB429\uB2C8\uB2E4"})}
      ${Zd({key:"codex_account",title:"Codex \uACC4\uC815",provider_key:"codex",provider:Xd(t,"codex"),selected:s,workspace_default:Qd(n,"codex_account"),handlers:r})}
    </div>
  </section>`}function Eb(e){return String(e||"").replace(/^docs\/(superpowers\/)?/,"")}function Tb(e){let t=/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(e);if(!t)return{front:null,body:e};let n=t[1].trim();return{front:n.length>0?n:null,body:e.slice(t[0].length)}}function Si(e,t){let n=t.getWorkspacePath,r=t.fetchImpl||globalThis.fetch?.bind(globalThis),o=null,s="loading",i="",l=null,a="";function u(R){R.key==="Escape"&&o&&(R.preventDefault(),m())}document.addEventListener("keydown",u);function d(){return o?c`
      <div class="mv-overlay" role="dialog" aria-modal="true">
        <div class="mv-overlay__backdrop" @click=${()=>m()}></div>
        <div class="mv">
          <div class="mv__bar">
            <span class="mv__path" title=${o}
              >${Eb(o)}</span
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
    `:c``}function f(){rt(d(),e)}async function g(R,z={}){o=R,s="loading",i="",l=null,a="",f();let X=z.workspace||(n?n():"");if(!X){s="error",a="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4",f();return}if(!r){s="error",a="fetch\uB97C \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",f();return}let ee="/api/doc?workspace="+encodeURIComponent(X)+"&path="+encodeURIComponent(R);try{let W=await r(ee),q=await W.json().catch(()=>({}));if(!W.ok||!q||q.ok!==!0){if(q?.error==="not_found"&&z.missing_state==="plan_pending"){s="pending",a="\uACC4\uD68D \uC791\uC131 \uC804 \xB7 \uACBD\uB85C\uB9CC \uC608\uC57D\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4",f();return}s="error",a="\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 ("+String(q&&q.error||W.status)+")",f();return}let O=Tb(String(q.content||""));l=O.front,i=O.body,s="ready",f()}catch{s="error",a="\uBB38\uC11C \uC694\uCCAD \uC2E4\uD328",f()}}function m(){o=null,rt(c``,e)}function k(){document.removeEventListener("keydown",u),m()}return{open:g,close:m,destroy:k}}var Cb=[{key:"input_tokens",label:"\uC785\uB825"},{key:"output_tokens",label:"\uCD9C\uB825"},{key:"cache_read_input_tokens",label:"\uCE90\uC2DC \uC77D\uAE30"}],rp="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4",Ei=[{role:"implementation",provider:"codex"},{role:"review-consult",provider:"codex"},{role:"subagent",provider:"claude"}],Rb=new Set(["codex-runner","Explore","Plan","advisor","advisor-xhigh","claude-code-guide","statusline-setup"]);function tp(e){return typeof e=="string"&&Rb.has(e)}var Ob=["running","done","failed","interrupted"],Lb={running:"\u25CF",done:"\u2713",failed:"\u2717",interrupted:"\u26A0"};function Ib(e){return typeof e=="number"&&Number.isFinite(e)?e:0}function Mb(e){let t=en(e);if(t.length>0)return t.map(o=>c`<span class="detail-usage-total" title=${o.tooltip}
          >${o.label}</span
        >`);let n=Kr(e);if(!n||!e)return"";let r=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?` \xB7 $${e.total_cost_usd.toFixed(2)}`:"";return c`<span
      class="detail-usage-total"
      title="이 이슈의 모든 attempt 토큰 합계 (입력+출력+캐시)"
      >${n.replace(/^τ /,"\u03C4 \uCD1D ")}${r}</span
    >${e.replayed?c`<span class="detail-usage-partial" title=${rp}
          >부분 집계</span
        >`:""}`}function np(e){return!e||!e.roles.orchestrator?null:{providers:e.roles.orchestrator,roles:{}}}function _l(e){if(typeof e=="number")return Jo(e);if(typeof e!="string")return"";let t=Date.parse(e);return Number.isFinite(t)?Jo(t):""}function Pb(e){return typeof e=="string"?e.replace(/-\d{8}$/,""):""}function Db(e,t){if(e.provider!=="claude")return{text:e.session_id.slice(0,8),title:e.session_id};let n=t&&typeof t.agent_id=="string"?t.agent_id:"";return n.length>0?{text:n.slice(0,8),title:n}:{text:e.launch_id.slice(-8),title:e.launch_id}}function pl(e){return e===null||typeof e=="string"&&e.trim().length>0}function fl(e){return e===null||typeof e=="number"&&Number.isFinite(e)}function Nb(e){if(!e||typeof e!="object"||Array.isArray(e))return null;let t=e,n=t.provider==="claude";return typeof t.launch_id!="string"||t.launch_id.length===0||!Ei.some(r=>r.role===t.role&&r.provider===t.provider)||!(n?pl(t.model):typeof t.model=="string"&&t.model.length>0)||!(!("effort"in t)||pl(t.effort))||!(!("agent_type"in t)||pl(t.agent_type))||typeof t.session_id!="string"||t.session_id.length===0||!Ob.includes(t.status)||!(t.turn_id===null||typeof t.turn_id=="string")?null:n?!fl(t.started_at)||!fl(t.last_event_at)||!fl(t.completed_at)?null:t:typeof t.started_at!="number"||!Number.isFinite(t.started_at)||typeof t.last_event_at!="number"||!Number.isFinite(t.last_event_at)||!(t.completed_at===null||typeof t.completed_at=="string"&&Number.isFinite(Date.parse(t.completed_at)))?null:t}function qb(e,t,n){let o=en({providers:{[t]:{subtotal:n.subtotal,breakdown:n.usage,...n.replayed?{replayed:!0}:{}}},roles:{}})[0];return c`<div class="detail-session__leg detail-session__usage-detail">
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
    ${_l(n.completed_at)?c`<span class="detail-session__leg-time detail-session__time"
          >${_l(n.completed_at)}</span
        >`:""}
    ${o?c`<span class="detail-session__usage" title=${o.tooltip}
          >${o.label}</span
        >`:""}
  </div>`}function Fb(e,t,n,r){let o=e.status==="running"?null:t,i=(o?en({providers:{[e.provider]:{subtotal:o.subtotal,breakdown:o.usage,...o.replayed?{replayed:!0}:{}}},roles:{}}):[])[0],l=e.status==="running"?Jo(e.last_event_at):o?_l(o.completed_at):"",a=(e.provider==="claude"?["Claude",e.agent_type,Pb(e.model),e.effort]:["codex",e.model,e.effort]).filter(Boolean).join(" \xB7 "),u=Db(e,o);return c`<button
    type="button"
    class="detail-session__leg detail-session__usage-detail detail-session__leg--${e.status}"
    data-launch-id=${e.launch_id}
    @click=${()=>r.onOpenDelegation&&r.onOpenDelegation(n,e.launch_id)}
  >
    <span class="detail-session__leg-glyph" aria-hidden="true"
      >${Lb[e.status]}</span
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
  </button>`}function jb(e,t){return e.role===t.role&&(e.model===null||t.model===void 0||e.model===t.model)&&e.session_id===t.session_id}function Bb(e,t,n){let r=[],o=new Set,s=Array.isArray(e.delegation_sessions)?e.delegation_sessions:[];for(let d of s){let f=Nb(d);!f||o.has(f.launch_id)||tp(f.agent_type)||(o.add(f.launch_id),r.push(f))}r.sort((d,f)=>(d.started_at||0)-(f.started_at||0));let i={};for(let{role:d,provider:f}of Ei){let g=t?t.roles[d]?.[f]:null;i[d]=g?[...g.legs]:[]}let l=Ei.flatMap(({role:d})=>i[d]),a=new Set,u=[];for(let{role:d,provider:f}of Ei){for(let g of r.filter(m=>m.role===d&&m.provider===f)){let m=l.find(k=>k.receipt_id===g.launch_id)||null;m&&!jb(g,m)||(m&&a.add(m.receipt_id),u.push(Fb(g,m,e.attempt_id,n)))}for(let g of i[d])!a.has(g.receipt_id)&&!tp(g.agent_type)&&u.push(qb(d,f,g))}return u}function Ub(e,t){let n=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?e.total_cost_usd:null,r=[...Cb,{key:"cache_creation_input_tokens",label:t==="codex"?"\uCE90\uC2DC \uC4F0\uAE30":"\uCE90\uC2DC \uC0DD\uC131"},...t==="codex"&&typeof e.reasoning_output_tokens=="number"&&Number.isFinite(e.reasoning_output_tokens)?[{key:"reasoning_output_tokens",label:"\uCD94\uB860 \uCD9C\uB825"}]:[]];return c`<div class="detail-session__usage-detail">
    ${r.map(o=>c`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">${o.label}</span
          ><span class="detail-session__usage-value"
            >${Ib(e[o.key]).toLocaleString("en-US")}</span
          ></span
        >`)}
    ${n===null?"":c`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">비용</span
          ><span class="detail-session__usage-value"
            >$${n.toFixed(2)}</span
          ></span
        >`}
    ${e.replayed?c`<span class="detail-session__usage-note">${rp}</span>`:""}
  </div>`}var Wb={running:"\u25CF",done:"\u2713",failed:"\u2717",orphaned:"\u26A0"};function Jo(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),n=String(t.getHours()).padStart(2,"0"),r=String(t.getMinutes()).padStart(2,"0");return`${n}:${r}`}function zb(e){if(typeof e.exec_default_preset_id!="string"||e.exec_default_preset_id.length===0)return"";let t=e.exec_values&&typeof e.exec_values=="object"?Object.entries(e.exec_values).filter(([,r])=>typeof r=="string"&&r.length>0).map(([r,o])=>`${r}=${o}`).join(" \xB7 "):"",n=typeof e.exec_default_preset_revision=="number"?` r${e.exec_default_preset_revision}`:"";return c`<div
    class="detail-session__preset-audit"
    data-attempt-preset-audit
  >
    <strong>외부 실행 preset</strong>
    <span>${e.exec_default_preset_id}${n}</span>
    ${t?c`<small>${t}</small>`:""}
    <small>내부 workflow 실행 영수증과 별도 기록</small>
  </div>`}var Hb={remote:"\uB2E4\uB978 \uBA38\uC2E0 \uC138\uC158 \u2014 \uC774 \uC11C\uBC84\uC5D0 transcript \uC5C6\uC74C",missing:"transcript \uD30C\uC77C \uC5C6\uC74C"};function Gb(e,t){let n=Hb[e.locality]||"",r=e.locality==="remote"?`${e.host} \xB7 \uB2E4\uB978 \uBA38\uC2E0`:e.locality==="missing"?`${e.host} \xB7 \uD30C\uC77C \uC5C6\uC74C`:e.host;return c`<div class="detail-session-row">
    <button
      type="button"
      class="detail-session detail-session--session"
      data-session-key=${oa(e)}
      ?disabled=${n.length>0}
      title=${n}
      @click=${()=>{n.length===0&&t.onOpenSessionRef&&t.onOpenSessionRef(e)}}
    >
      <span class="detail-session__glyph">${e.current?"\u25D0":"\xB7"}</span>
      <span class="detail-session__id">${wo(e)}</span>
      <span class="detail-session__meta">${r}</span>
      <span class="detail-session__sid" title=${e.session_id}
        >${e.session_id.slice(0,8)}</span
      >
      <span class="detail-session__time">${Jo(e.last_event_at)}</span>
    </button>
    ${e.resume_command?c`<button
          type="button"
          class="detail-session__resume-cmd"
          title=${e.resume_command}
          @click=${o=>{o.stopPropagation(),t.onCopyResumeCommand&&e.resume_command&&t.onCopyResumeCommand(e.resume_command)}}
        >
          ⧉ 재개
        </button>`:""}
  </div>`}function op(e,t={},n={},r=[]){let o=Array.isArray(e)?e:[],s=Array.isArray(r)?r:[],i=[...s.filter(m=>m&&m.current===!0),...s.filter(m=>m&&m.current!==!0).sort((m,k)=>k.index-m.index)],l=i.map(m=>Gb(m,t)),a=n.expanded||new Set;if(o.length===0&&i.length===0)return c`
      <div class="detail-section-label">세션 이력</div>
      <div class="detail-empty" data-seam="session-history">세션 이력 없음</div>
    `;let u=new Set;for(let m of o)m&&typeof m.resumed_from=="string"&&m.resumed_from.length>0&&u.add(m.resumed_from);let d=m=>{if(!(m.status==="failed"||m.status==="orphaned"))return"";let R=typeof m.session_id=="string"&&m.session_id.length>0,z=u.has(m.attempt_id),X=R&&!z,ee=R?z?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":"\uC774 \uC138\uC158\uC744 \uAC19\uC740 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C \uC774\uC5B4\uC11C \uC9C4\uD589":"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00";return c`<button
      type="button"
      class="detail-session__resume"
      data-attempt-id=${m.attempt_id}
      ?disabled=${!X}
      title=${ee}
      @click=${W=>{W.stopPropagation(),X&&t.onResume&&t.onResume(m.attempt_id)}}
    >
      ↻ 이어하기
    </button>`},f=m=>{if(!(m.status==="failed"||m.status==="orphaned")||typeof m.cause!="string"||m.cause==="")return"";let R=m.cause_detail,z=R&&typeof R.reason=="string"&&R.reason.length>0?typeof R.command=="string"&&R.command.length>0?`${R.reason} \xB7 ${R.command}`:R.reason:m.cause;return c`<div class="detail-session__cause" title=${z}>
      ${m.cause}
    </div>`},g=m=>{let k=np(la(m));if(en(k).length===0&&!Kr(m.usage))return"";let R=a.has(m.attempt_id);return c`<button
      type="button"
      class="detail-session__usage-toggle"
      data-attempt-id=${m.attempt_id}
      aria-expanded=${R?"true":"false"}
      title=${R?"\uD1A0\uD070 \uB0B4\uC5ED \uC811\uAE30":"\uD1A0\uD070 \uB0B4\uC5ED \uD3BC\uCE58\uAE30"}
      @click=${z=>{z.stopPropagation(),t.onToggleUsage&&t.onToggleUsage(m.attempt_id)}}
    >
      τ 자세히
    </button>`};return c`
    <div class="detail-section-label">
      세션 이력${Mb(n.total)}
    </div>
    <div class="detail-sessions" data-seam="session-history">
      ${l}${o.map(m=>{let k=la(m),R=np(k),z=en(R);return c`<div class="detail-session-row">
          <button
            type="button"
            class="detail-session detail-session--${m.status||"unknown"}"
            data-attempt-id=${m.attempt_id}
            @click=${()=>t.onOpen&&t.onOpen(m.attempt_id)}
          >
            <span class="detail-session__glyph"
              >${Wb[m.status||""]||"\xB7"}</span
            >
            <span class="detail-session__id">${m.attempt_id}</span>
            ${yo(m)?c`<span
                  class="detail-session__resumed"
                  title=${yo(m)}
                  >↻</span
                >`:""}
            <span class="detail-session__meta">${kr(m)}</span>
            ${z.length>0?c`<span class="detail-session__role">orchestrator</span>`:""}
            ${m.session_id?c`<span class="detail-session__sid" title=${m.session_id}
                  >${String(m.session_id).slice(0,8)}</span
                >`:""}
            ${z.length>0?z.map(X=>c`<span
                      class="detail-session__usage"
                      title=${X.tooltip}
                      >${X.label}</span
                    >`):Kr(m.usage)?c`<span class="detail-session__usage"
                    >${Kr(m.usage)}</span
                  >`:""}
            <span class="detail-session__time">${Jo(m.started_at)}</span>
          </button>
          ${g(m)} ${d(m)} ${f(m)} ${zb(m)}
          ${a.has(m.attempt_id)&&m.usage?Ub(m.usage,m.runner==="codex"?"codex":"claude"):""}
          ${Bb(m,k,t)}
        </div>`})}
    </div>
  `}function sp(e,t={}){return c`
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
          ${Kb(e)}
        </div>`:""}
  `}function Kb(e){let t=so(e);if(t)return t;let n=e.data;if(!n)return"";if(n.missing)return c`<div class="detail-prompt__missing">
        기록 없음 — 아직 이 이슈로 디스패치된 세션이 없습니다. 아래는 다음
        디스패치가 보낼 기본 과업입니다.
      </div>
      ${typeof n.default_task_prompt=="string"?Jn("\uC608\uC0C1 \uAE30\uBCF8 \uACFC\uC5C5",n.default_task_prompt):""}`;let r=wi(n.recorded_at);return c`<div class="detail-prompt__meta">
      ${n.attempt_id}${r?` \xB7 ${r}`:""}
    </div>
    ${typeof n.task_prompt=="string"?Jn("\uACFC\uC5C5 (user)",n.task_prompt):""}
    ${typeof n.system_prompt=="string"?Jn("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",n.system_prompt):""}`}var Cr=10;function ip(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),n=r=>String(r).padStart(2,"0");return`${n(t.getMonth()+1)}-${n(t.getDate())} ${n(t.getHours())}:${n(t.getMinutes())}`}function ap(e,t={}){let r=(Array.isArray(e?.events)?e.events:[]).filter(l=>l&&typeof l.summary=="string"&&l.summary.trim().length>0);if(r.length===0)return"";let o=typeof e.shown=="number"&&e.shown>0?e.shown:Cr,s=r.slice(0,o),i=r.length-s.length;return c`
    <div class="detail-section-label">Worker 이력 (${r.length})</div>
    <ol class="detail-timeline" data-seam="worker-timeline">
      ${s.map(l=>c`<li class="detail-timeline__row">
            ${ip(l.at)?c`<span class="detail-timeline__at"
                  >${ip(l.at)}</span
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
  `}var Yb=["open","in_progress","deferred","resolved","closed"],Vb=[0,1,2,3,4];function lp(e,t){let n=t.issueStores,r=t.onClose,o=t.transport,s=t.onNavigate,i=t.queueStore,l=t.execPresetStore,a=t.sessionLogStore,u=null,d=null,f={},g="",m=!1,k=[],R=!1,z={},X={claude:null,codex:null},ee=null,W=null,q=0,O=!1,I=!1,F="",U="",ue="",M="",B=!1;function Q(){O=!1,I=!1,F="",U="",ue="",M="",B=!1}function re(){X={claude:null,codex:null},ee=null,W=null,q+=1}async function Ee(){if(!o)return null;try{let w=await Promise.resolve(o("get-workspace-accounts",{}));return w&&typeof w.state=="string"?w:null}catch{return null}}async function he(w){try{let D=await fetch(w);if(!D.ok)return null;let H=await D.json();if(!H||typeof H!="object"||!Array.isArray(H.accounts))return null;let $e=H.accounts.filter(tt=>tt!==null&&typeof tt=="object"&&!Array.isArray(tt));return{accounts:$e,active:$e.find(tt=>tt.active===!0)||null}}catch{return null}}async function pe(w){W=w;let D=++q,[H,$e,tt]=await Promise.all([he("/api/claude-usage"),he("/api/codex-usage"),Ee()]);D!==q||w!==u||(X={claude:H,codex:$e},ee=tt,st())}let P=[],Ae=null,Se=null,E=!1,Z="",Ce=!1,ge=0,Te=new Set;function be(){P=[],Ae=null,Se=null,E=!1,Z="",Ce=!1,ge+=1,Te.clear()}async function Pe(w){if(!o)return;let D=++ge;try{let H=await Promise.resolve(o("get-comments",{id:w}));if(D!==ge||w!==u)return;P=Array.isArray(H)?H:[],E=!1}catch{if(D!==ge||w!==u)return;E=!0}st()}function Xe(){if(!o||!u)return;let w=d&&typeof d.comment_count=="number"?d.comment_count:null;if(Ae!==u){Ae=u,Se=w,Pe(u);return}w!==null&&w!==Se&&(Se=w,Pe(u))}function Ke(w){Te.has(w)?Te.delete(w):Te.add(w),st()}function L(w){let D=Z.trim().length===0;Z=w,D!==(w.trim().length===0)&&st()}async function se(){let w=Z.trim();if(!o||!u||w.length===0||Ce)return;let D=u;Ce=!0,st();let H=!1;try{let $e=await Promise.resolve(o("add-comment",{id:D,text:w}));Array.isArray($e)&&$e.length>0&&(H=!0,D===u&&(P=$e,E=!1,Z="",Se=$e.length))}catch{H=!1}H||ke("\uB313\uAE00 \uCD94\uAC00 \uC2E4\uD328","error"),D===u&&(Ce=!1),st()}let ae={onToggle:Ke,onDraftInput:L,onSubmit:se},me=t.mdViewer||null,we=null;me||(we=document.createElement("div"),we.className="md-viewer-root",document.body.appendChild(we));let de=me||Si(we,{getWorkspacePath:t.getWorkspacePath||(()=>"")}),Fe=document.createElement("div");Fe.className="session-log-root",document.body.appendChild(Fe);let He=io(Fe,{transport:o?(w,D)=>Promise.resolve(o(w,D)):void 0,sessionLogStore:a}),Ze=!1,De=!1,Y=!1,j=null,Ne=null,at=0;function Je(w){return`${t.getWorkspacePath&&t.getWorkspacePath()||""}::${w}`}function v(){Ze=!1,De=!1,Y=!1,j=null,Ne=null,at+=1}async function G(w){if(!o)return;let D=++at;De=!0,Y=!1,st();try{let H=await Promise.resolve(o("get-bead-prompt",{bead_id:w}));if(D!==at)return;!H||typeof H!="object"||Array.isArray(H)?Y=!0:(j=H,Ne=Je(w))}catch{D===at&&(Y=!0)}finally{D===at&&(De=!1,st())}}let Re=[],Ie=null,je=0;function We(w,D){return`${t.getWorkspacePath&&t.getWorkspacePath()||""}::${w}::${D}`}function dt(){Re=[],Ie=null,je+=1}async function $t(w,D){if(!o)return;let H=++je,$e;try{$e=await Promise.resolve(o("get-session-refs",{bead_id:w}))}catch{$e=null}H!==je||D!==Ie||(Re=$e&&Array.isArray($e.sessions)?$e.sessions:[],st())}function It(){if(!o||!u)return;let w=d&&d.metadata,D=w&&typeof w=="object"&&typeof w.session_ref=="string"?w.session_ref:null;if(D===null){dt();return}let H=We(u,D);Ie!==H&&(Re=[],Ie=H,$t(u,H))}let Tt=[],ft=[],ct=Cr,xt=null,Ct=0;function Mt(w){return`${t.getWorkspacePath&&t.getWorkspacePath()||""}::${w}`}function oe(){Tt=[],ft=[],ct=Cr,xt=null,Ct+=1}async function J(w,D){if(!o)return;let H=++Ct,$e;try{$e=await Promise.resolve(o("get-bead-timeline",{bead_id:w}))}catch{$e=null}H!==Ct||D!==xt||(Tt=$e&&Array.isArray($e.events)?$e.events:[],ft=$e&&Array.isArray($e.attempts)?$e.attempts:[],ct=Cr,st())}function $(){if(!o||!u)return;let w=Mt(u);xt!==w&&(Tt=[],ft=[],ct=Cr,xt=w,J(u,w))}function N(){ct+=Cr,st()}function te(){if(Ze=!Ze,Ze&&u&&Ne!==Je(u)){j=null,G(u);return}st()}function ne(){let w={};for(let H of ft)H&&typeof H=="object"&&H.bead_id===u&&(w[String(H.attempt_id)]=H);let D=i?i.get():null;for(let H of D&&D.attempts?Object.values(D.attempts):[]){let $e=H;$e&&$e.bead_id===u&&(w[String($e.attempt_id)]=$e)}return w}function le(){return u?Object.values(ne()).sort((D,H)=>(H.started_at||0)-(D.started_at||0)).map(D=>({attempt_id:D.attempt_id,bead_id:D.bead_id,status:D.status,started_at:typeof D.started_at=="number"?D.started_at:null,runner:D.runner||null,model:D.model||null,effort:D.effort||D.observed_effort||null,speed:D.speed||null,session_id:D.session_id||null,resumed_from:D.resumed_from||null,continuation_mode:D.continuation_mode||null,dismissed_at:typeof D.dismissed_at=="number"?D.dismissed_at:null,cause:typeof D.cause=="string"?D.cause:null,cause_detail:D.cause_detail||null,exec_default_preset_id:typeof D.exec_default_preset_id=="string"?D.exec_default_preset_id:null,exec_default_preset_revision:typeof D.exec_default_preset_revision=="number"?D.exec_default_preset_revision:null,exec_values:D.exec_values&&typeof D.exec_values=="object"?D.exec_values:null,usage:D.usage||null,usage_legs:Array.isArray(D.usage_legs)?D.usage_legs:[],delegation_sessions:Array.isArray(D.delegation_sessions)?D.delegation_sessions:[]})):[]}function Be(){return u?Gn(ne(),u):null}let Ye=new Set;function et(w){Ye.has(w)?Ye.delete(w):Ye.add(w),st()}function Ue(w){let D=i?i.get():null,H=D&&D.attempts?D.attempts[w]:null;He.open({attempt_id:w,meta:H?{runner:H.runner||void 0,model:H.model||void 0,effort:H.effort||void 0,status:H.status||void 0,session_id:H.session_id||void 0}:{}})}function ht(w,D){let H=i?i.get():null,$e=H&&H.attempts?H.attempts[w]:null,nt=($e&&Array.isArray($e.delegation_sessions)?$e.delegation_sessions:[]).find(mt=>mt&&typeof mt=="object"&&mt.launch_id===D);nt&&He.open({attempt_id:w,launch_id:D,meta:{runner:nt.provider==="claude"?"claude":"codex",role:nt.role,...typeof nt.agent_type=="string"?{agent_type:nt.agent_type}:{},model:nt.model,effort:nt.effort,session_id:nt.session_id,status:nt.status}})}async function Rt(w){if(!o||!w)return;let D=await zr();if(D===null)return;let H=()=>{let mt=i?i.get():null;return mt&&typeof mt.revision=="number"?mt.revision:0},$e=async(mt={},Qe=H())=>await o("worker-attempt-resume",{attempt_id:w,expected_revision:Qe,...D!==""?{instructions:D}:{},...mt}),tt=mt=>{mt?.queue&&i?.set&&i.set(mt.queue)},nt=await $e();if(tt(nt),nt&&nt.conflict){let mt=nt.queue&&typeof nt.queue.revision=="number"?nt.queue.revision:H();nt=await $e({},mt),tt(nt)}nt=await zn(nt,(mt,Qe)=>$e({continuation:mt,decision_token:Qe}),{onResult:tt,refresh:()=>$e()}),nt&&nt.resumed===!1&&!nt.conflict&&nt.reason&&ke(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${nt.reason}`,"error",2400)}function yt(w){!w||!u||He.open(Hr(w,u,d&&d.status))}let tn={onOpen:Ue,onOpenDelegation:ht,onResume:Rt,onToggleUsage:et,onOpenSessionRef:yt,onCopyResumeCommand:p};function wt(){let w=i?i.get():null,D={...z};for(let H of["orchestration_model","orchestration_effort","orchestration_speed"]){let $e=w&&w[H];typeof $e=="string"&&(D[H]=$e)}return D}async function Ot(){if(o){try{let w=await Promise.resolve(o("get-session-defaults",{}));z=w&&w.values&&typeof w.values=="object"?w.values:{}}catch{z={}}st()}}function jt(){let w=i?i.get():null;return w&&w.runner_catalog||null}function lt(){let w=i?i.get():null;return w&&typeof w.execution_defaults=="object"?w.execution_defaults:null}function Ht(){let w=d?.metadata&&typeof d.metadata=="object"?d.metadata:{},H=mn({pin:{...w,...f},global:wt(),execution_defaults:lt(),runner_catalog:jt(),route:typeof w.route=="string"?w.route:null}).orchestration_model.value||"";return xn(jt(),H)}function Gt(){let w=l?l.get():null;return!w||typeof w.revision!="number"?null:{revision:w.revision,presets:Array.isArray(w.presets)?w.presets:[]}}function Bt(w){return w?.compatible===!1}function un(w){l&&w&&typeof w.revision=="number"&&Array.isArray(w.presets)&&l.set({revision:w.revision,presets:w.presets})}async function Nt(){let w=Gt(),D=w?.presets.find(H=>H.id===g);if(!(!o||!u||!w||!D||Bt(D)||m)){m=!0,k=[],st();try{let H=await Promise.resolve(o("apply-impl-preset",ru(u,D.id,w.revision)));if(H&&H.conflict){un(H),ke("\uD504\uB9AC\uC14B\uC774 \uBCC0\uACBD\uB410\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uBAA9\uB85D\uC5D0\uC11C \uB2E4\uC2DC \uC801\uC6A9\uD558\uC138\uC694.","error",4e3);return}let $e=H&&Array.isArray(H.issue)?H.issue[0]:H?.issue;if(H&&H.applied&&$e&&typeof $e=="object"){d=$e,k=Array.isArray(H.skipped_orchestration_keys)?H.skipped_orchestration_keys.filter(tt=>typeof tt=="string"):[];for(let tt of ou)delete f[tt];ke(k.length>0?"\uC2E4\uD589 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4. \uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 3\uD0A4\uB294 Bead\uC5D0 \uD540\uD560 \uC218 \uC5C6\uC5B4 \uAC74\uB108\uB6F0\uC5C8\uC2B5\uB2C8\uB2E4.":"\uC2E4\uD589 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4.","success",4e3);return}H&&H.error==="bd_readback_failed"?ke("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):ke("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}catch(H){H&&typeof H=="object"&&H.code==="bd_readback_failed"?ke("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):ke("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}finally{m=!1,st()}}}let Vt=null;n&&n.subscribe&&(Vt=n.subscribe(()=>b()));let Ut=null;i&&typeof i.subscribe=="function"&&(Ut=i.subscribe(()=>{u&&st()}));let Zt=null,_e=null;function T(){_e&&(_e(),_e=null)}l&&typeof l.subscribe=="function"&&(Zt=l.subscribe(()=>{u&&st()}));function ye(w){w.key==="Escape"&&u&&(w.preventDefault(),r())}document.addEventListener("keydown",ye);let fe=Yr(()=>st());fe.attach();function b(){if(u){if(n&&typeof n.snapshotFor=="function"){let w=n.snapshotFor("detail:"+u)||[];d=w.find(H=>H&&H.id===u)||w[0]||d}Xe(),It(),$(),st()}}function p(w){on(w).then(D=>{D?ke("\uBCF5\uC0AC\uB428","success",1200):ke("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function _(w){w.preventDefault(),w.stopPropagation(),u&&p(u)}function S(w,D){w.preventDefault(),w.stopPropagation(),p(D)}function K(w,D,H){w.preventDefault(),w.stopPropagation(),de.open(D,{missing_state:H})}async function V(w,D){let H=Object.hasOwn(f,w),$e=f[w];if(f[w]=D,st(),!(!o||!u))try{let tt=await Promise.resolve(o("update-exec-settings",nu(u,w,D.length===0?null:D))),nt=Array.isArray(tt)?tt[0]:tt;if(!nt||typeof nt!="object"||!nt.id)throw new Error("exec settings readback failed");d=nt,delete f[w],st()}catch(tt){throw H?f[w]=$e:delete f[w],st(),ke("\uC2E4\uD589 \uC124\uC815 \uBCC0\uACBD \uC2E4\uD328","error"),tt}}function ie(w){w.catch(()=>{})}async function xe(w,D){let H=d||{},$e=H.metadata&&typeof H.metadata=="object"?H.metadata:{},tt={};for(let Qe of["impl_runtime","impl_model","impl_effort"])tt[Qe]=Object.hasOwn(f,Qe)?f[Qe]:typeof $e[Qe]=="string"?$e[Qe]:"";tt[w]=D;let nt=au(tt,jt(),Ht()),mt={};for(let Qe of["impl_runtime","impl_model","impl_effort"])mt[Qe]=f[Qe],f[Qe]=nt[Qe]||"";if(st(),!(!o||!u))return Promise.resolve(o("update-impl-target",{id:u,...nt,orchestration_runtime:Ht()})).then(Qe=>{let ut=Array.isArray(Qe)?Qe[0]:Qe;if(!ut||typeof ut!="object"||!ut.id)throw new Error("implementation target readback failed");d=ut;for(let kn of["impl_runtime","impl_model","impl_effort"])delete f[kn];st()}).catch(Qe=>{for(let ut of["impl_runtime","impl_model","impl_effort"])mt[ut]===void 0?delete f[ut]:f[ut]=mt[ut];throw st(),ke("\uAD6C\uD604 target \uBCC0\uACBD \uC2E4\uD328","error"),Qe})}async function Ve(w,D,H){if(!o||!u)return!1;try{let $e=await Promise.resolve(o(w,D)),tt=Array.isArray($e)?$e[0]:$e;return tt&&typeof tt=="object"&&tt.id?(d=tt,!0):(ke(H,"error"),!1)}catch($e){return $e&&typeof $e=="object"&&$e.code==="bd_readback_failed"?(ke("\uC800\uC7A5\uB410\uC73C\uB098 \uD655\uC778 \uC2E4\uD328 \u2014 \uACE7 \uAC31\uC2E0\uB429\uB2C8\uB2E4","error"),{ok:!1,saved:!0}):(ke(H,"error"),!1)}}function ot(w){setTimeout(()=>{try{let D=e.querySelector(w);D&&typeof D.focus=="function"&&D.focus()}catch{}},0)}function bt(){O=!0,F=d&&d.title||"",st(),ot('.detail-edit__input[data-edit="title"]')}function _t(w){F=w.target.value}function x(){O=!1,F="",st()}function A(){Ve("edit-text",{id:u,field:"title",value:F},"\uC81C\uBAA9 \uC800\uC7A5 \uC2E4\uD328").then(D=>{D===!0&&(O=!1,F=""),st()})}function Le(){I=!0,U=d&&d.description||"",st(),ot('.detail-edit__textarea[data-edit="description"]')}function qe(w){U=w.target.value}function h(){I=!1,U="",st()}function y(){Ve("edit-text",{id:u,field:"description",value:U},"\uC124\uBA85 \uC800\uC7A5 \uC2E4\uD328").then(D=>{D===!0&&(I=!1,U=""),st()})}function C(w,D,H,$e){if(w.key==="Escape"){w.stopPropagation(),H();return}w.key==="Enter"&&(!$e||w.ctrlKey||w.metaKey)&&(w.preventDefault(),D())}function ce(w){let D=w.target.value;Ve("update-status",{id:u,status:D},"\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328").then(()=>st())}function ve(w){let D=Number(w.target.value);Ve("update-priority",{id:u,priority:D},"\uC6B0\uC120\uC21C\uC704 \uBCC0\uACBD \uC2E4\uD328").then(()=>st())}function Oe(w){ue=w.target.value}function Ge(){let w=ue.trim();w.length!==0&&Ve("label-add",{id:u,label:w},"\uB77C\uBCA8 \uCD94\uAC00 \uC2E4\uD328").then(D=>{D===!0&&(ue=""),st()})}function kt(w){if(w.key==="Escape"){w.stopPropagation(),ue="",st();return}w.key==="Enter"&&(w.preventDefault(),Ge())}function Wt(w){Ve("label-remove",{id:u,label:w},"\uB77C\uBCA8 \uC81C\uAC70 \uC2E4\uD328").then(()=>st())}let Jt={onCopyPath:S,onOpenDoc:K};function dn(w){return typeof w=="string"?w:w&&typeof w=="object"?String(w.id||w.to||w.issue_id||w.depends_on||""):""}function qn(w){return w&&typeof w=="object"?String(w.dependency_type||w.type||""):""}function On(w){switch(w){case"discovered-from":return{glyph:"\u21A9 ",relation:"\uBC1C\uACAC"};case"parent-child":return{glyph:"\u2338 ",relation:"\uC0C1\uC704"};case"related":return{glyph:"\u2194 ",relation:"\uAD00\uB828"};default:return w.length>0?{glyph:`${w} `,relation:w}:{glyph:"",relation:""}}}function wn(w,D){let H=Fn(D),$e=[];return w.length>0&&$e.push(w),H&&$e.push(H),$e.length>0?$e.join(`
`):void 0}function Fn(w){if(!w||typeof w!="object")return;let D=typeof w.status=="string"?w.status:"",H=typeof w.title=="string"?w.title:"";return D.length>0&&H.length>0?`${D} \xB7 ${H}`:void 0}function Xt(){return(t.getWorkspacePath&&t.getWorkspacePath()||"").trim()}function er(){return t.depCandidates?t.depCandidates():null}async function Ln(w,D,H){let $e=Xt(),tt=u;if(!tt)return;if($e.length===0){ke("\uB808\uD3EC\uB97C \uC54C \uC218 \uC5C6\uC5B4 \uC758\uC874\uC744 \uBC14\uAFC0 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error");return}let nt=await Ve(w,{a:tt,b:D,view_id:tt,root_dir:$e},H),mt=nt===!0||nt!==!1&&nt.saved===!0;mt&&t.onDepChanged&&t.onDepChanged({type:w,a:tt,b:D}),w==="dep-add"&&mt&&(M="",B=!1),st()}function tr(w){if(!u)return;let D=globalThis.confirm;typeof D=="function"&&!D(`${w}\uAC00 ${u}\uB97C \uB9C9\uB294 \uC5F0\uACB0\uC744 \uB04A\uC744\uAE4C\uC694?`)||Ln("dep-remove",w,"\uC758\uC874 \uD574\uC81C \uC2E4\uD328")}function In(w){w.disabled||Ln("dep-add",w.bead_id,"\uC758\uC874 \uCD94\uAC00 \uC2E4\uD328")}function jn(w){M=w.target.value,B=!0,st()}function _r(){B||(B=!0,st())}function ze(w,D){if(w.key==="Escape"){w.stopPropagation(),M="",B=!1,st();return}w.key==="Enter"&&(w.preventDefault(),D.length===1&&!D[0].disabled&&In(D[0]))}function qt(w){return c`<div class="detail-dep-add">
      <input
        class="detail-dep-add__input"
        aria-label="막는 이슈 추가"
        placeholder="막는 이슈 추가"
        .value=${M}
        @focus=${_r}
        @input=${jn}
        @keydown=${D=>ze(D,w)}
      />
      ${B||M.length>0?c`<div class="detail-dep-add__list">
            ${w.length===0?c`<div class="detail-dep-add__empty">후보 없음</div>`:w.map(D=>c`<button
                      type="button"
                      class="detail-dep-add__cand"
                      data-dep-cand=${D.bead_id}
                      ?disabled=${D.disabled}
                      title=${nn(D.reason)}
                      @click=${()=>In(D)}
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
    </div>`}function bn(w,D){let H=D.get(w.id),$e=s?c`<button
          type="button"
          class="detail-dep__link"
          title=${nn(w.title)}
          @click=${()=>H===void 0?s(w.id):s(w.id,H)}
        >
          ${w.label}
        </button>`:c`<span class="detail-dep__link" title=${nn(w.title)}
          >${w.label}</span
        >`;return c`<span
      class=${`detail-dep detail-dep--${w.kind}${s?" detail-dep--link":""}`}
      >${$e}${w.kind==="pred"?c`<button
            type="button"
            class="detail-dep__unlink"
            data-dep-b=${w.id}
            aria-label=${"\uC758\uC874 \uD574\uC81C: "+w.id}
            @click=${()=>tr(w.id)}
          >
            ✕
          </button>`:""}</span
    >`}function lo(w){let D=Array.isArray(w.dependencies)?w.dependencies:[],H=Array.isArray(w.dependents)?w.dependents:[],$e=[];for(let Qe of D){let ut=dn(Qe);ut.length>0&&qn(Qe)==="blocks"&&$e.push({id:ut,label:`\u26D3 ${ut}`,kind:"pred",title:wn("\uB9C9\uB294",Qe)})}for(let Qe of H){let ut=dn(Qe);ut.length>0&&qn(Qe)==="blocks"&&$e.push({id:ut,label:`\u2192 ${ut}`,kind:"succ",title:wn("\uB9C9\uD788\uB294",Qe)})}for(let Qe of D){let ut=dn(Qe),kn=qn(Qe);if(ut.length>0&&kn!=="blocks"){let Tl=On(kn);$e.push({id:ut,label:`${Tl.glyph}${ut}`,kind:"other",title:wn(Tl.relation,Qe)})}}let tt=er(),nt=new Map;if(tt)for(let Qe of tt.issues)nt.has(Qe.bead_id)||nt.set(Qe.bead_id,Qe.root_dir);let mt=tt&&u?rd(nd(u,tt),M):[];return c`
      <div class="detail-section-label">의존성</div>
      ${$e.length===0?c`<div class="detail-empty">의존성 없음</div>`:c`<div class="detail-deps">
            ${$e.map(Qe=>bn(Qe,nt))}
          </div>`}
      ${tt===null?c`<div class="detail-empty">후보를 불러올 수 없음</div>`:qt(mt)}
    `}function os(w){let D=w.metadata||{},H=w.workflow||{},$e=H.stages||{},tt=$e.spec&&$e.spec.stale,nt=$e.impl&&$e.impl.stale,mt=H.quick_fix_review?.state==="stale",Qe=$e.plan||null,ut=H.route_source==="derived",kn=H.route||D.route||"\u2014";return c`
      <div class="detail-section-label">워크플로우</div>
      <div class="detail-kv">
        <span class="detail-kv__k">route</span>
        <span
          class="detail-kv__v${ut?" detail-kv__v--derived":""}"
          title=${ut?"route \uBBF8\uD540 (metadata unset)":"route"}
          >${ut?"unset":kn}</span
        >
      </div>
      ${H.route!=="quick_fix"||Object.hasOwn(D,"spec_review")?c`<div class="detail-kv">
            <span class="detail-kv__k">spec_review</span>
            <span class="detail-kv__v"
              >${D.spec_review||"\uC5C6\uC74C"}${tt?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${H.route==="full_plan"?c`<div class="detail-kv">
              <span class="detail-kv__k">plan_review</span>
              <span class="detail-kv__v">${Qe?.receipt||"\uC5C6\uC74C"}</span>
            </div>
            <div class="detail-kv">
              <span class="detail-kv__k">plan_approval</span>
              <span class="detail-kv__v"
                >${Qe?.approval_receipt||"\uC5C6\uC74C"}${Qe?.approval_state==="stale"?" \xB7 stale":Qe?.approval_state==="unknown"?" \xB7 unknown":""}</span
              >
            </div>`:""}
      ${H.route!=="quick_fix"||Object.hasOwn(D,"impl_review")?c`<div class="detail-kv">
            <span class="detail-kv__k">impl_review</span>
            <span class="detail-kv__v"
              >${D.impl_review||"\uC5C6\uC74C"}${nt?" \xB7 stale":""}</span
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
              >${D.quick_fix_review||"\uC5C6\uC74C"}${mt?" \xB7 stale":""}</span
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
              >${Wn(H.exec_receipt)}</span
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
    `}let ss={route:["quick_fix","spec_backed","full_plan"]};async function co(w,D){let H=D.target.value;if(w==="route"&&d&&d.metadata&&d.metadata.route==="full_plan"&&H!=="full_plan"&&!window.confirm(`full_plan \u2192 ${H||"(\uBBF8\uC124\uC815)"} \uC804\uD658: \uC800\uC7A5\uB41C plan \uC2B9\uC778\uC740 \uD3EC\uAE30\uB418\uBA70, plan \uD30C\uC77C\xB7\uB9C8\uCEE4 \uC815\uB9AC\uB294 \uC138\uC158 \uACC4\uC57D\uC774 \uC218\uD589\uD569\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`)){st();return}await Ve("update-workflow-meta",{id:u,key:w,value:H},"\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uBA54\uD0C0 \uBCC0\uACBD \uC2E4\uD328"),st()}function is(w){let D=w.metadata||{};return c` ${(($e,tt)=>{let nt=ss[$e],mt=typeof D[$e]=="string"?D[$e]:"";return c`<div class="detail-kv">
        <span class="detail-kv__k">${$e}</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label=${$e}
          data-edit=${`wfmeta-${$e}`}
          @change=${Qe=>co($e,Qe)}
        >
          <option value="" ?selected=${!nt.includes(mt)}>
            ${tt}
          </option>
          ${nt.map(Qe=>c`<option value=${Qe} ?selected=${mt===Qe}>${Qe}</option>`)}
        </select>
      </div>`})("route","(unset)")} `}function Me(w,D){return O?c`
        <div class="detail-edit">
          <input
            class="detail-edit__input"
            data-edit="title"
            aria-label="제목 편집"
            .value=${F}
            @input=${_t}
            @keydown=${H=>C(H,A,x,!1)}
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
        ${en(D).map(H=>c`<span class="detail-usage-total" title=${H.tooltip}
              >${H.label}</span
            >`)}
        <button
          type="button"
          class="detail-edit-btn"
          data-edit="title"
          aria-label="제목 편집"
          @click=${bt}
        >
          ✎
        </button>
      </div>
    `}function St(w){let D=Yt(w.created_at),H=Yt(w.updated_at);return!D&&!H?c``:c`
      ${D?c`<div class="detail-kv">
            <span class="detail-kv__k">생성</span>
            <span class="detail-kv__v detail-kv__v--time">${D}</span>
          </div>`:""}
      ${H?c`<div class="detail-kv">
            <span class="detail-kv__k">수정</span>
            <span class="detail-kv__v detail-kv__v--time">${H}</span>
          </div>`:""}
    `}function Kt(w,D){return c`
      <div class="detail-section-label">속성 (수정 가능)</div>
      <div class="detail-kv">
        <span class="detail-kv__k">status</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label="status"
          data-edit="status"
          @change=${ce}
        >
          ${Yb.map(H=>c`<option value=${H} ?selected=${H===w}>${H}</option>`)}
        </select>
      </div>
      <div class="detail-kv">
        <span class="detail-kv__k">priority</span>
        <select
          class="detail-kv__v"
          aria-label="priority"
          data-edit="priority"
          @change=${ve}
        >
          ${Vb.map(H=>c`<option value=${String(H)} ?selected=${H===D}>
                P${H}
              </option>`)}
        </select>
      </div>
    `}function Gf(w){return c`
      <div class="detail-title-row">
        <div class="detail-overlay__section-label">설명</div>
        ${I?"":c`<button
              type="button"
              class="detail-edit-btn"
              data-edit="description"
              aria-label="설명 편집"
              @click=${Le}
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
              .value=${U}
              @input=${qe}
              @keydown=${D=>C(D,y,h,!0)}
            ></textarea>
            <div class="detail-edit__actions">
              <button
                type="button"
                class="detail-edit__save"
                data-edit="description-save"
                @click=${y}
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
    `}function Kf(w){let D=typeof w.notes=="string"?w.notes:"";return D.trim().length===0?c``:c`
      <div class="detail-overlay__section-label">노트</div>
      <div class="detail-overlay__notes">${D}</div>
    `}function Yf(w){let D=Array.isArray(w.labels)?w.labels:[];return c`
      <div class="detail-section-label">라벨</div>
      <div class="detail-labels">
        ${D.map(H=>c`<span class="detail-label-chip"
              >${H}<button
                type="button"
                class="detail-label-chip__x"
                data-label=${H}
                aria-label=${"\uB77C\uBCA8 \uC81C\uAC70: "+H}
                @click=${()=>Wt(H)}
              >
                ×
              </button></span
            >`)}
        <span class="detail-label-add">
          <input
            class="detail-label-add__input"
            aria-label="라벨 추가"
            placeholder="라벨 추가"
            .value=${ue}
            @input=${Oe}
            @keydown=${kt}
          />
          <button
            type="button"
            class="detail-label-add__btn"
            @click=${Ge}
          >
            추가
          </button>
        </span>
      </div>
    `}function Vf(){if(!u)return c``;let w=d||{},D=String(w.id||u),H=w.title||"(\uC81C\uBAA9 \uC5C6\uC74C)",$e=Be(),tt=w.status||"open",nt=typeof w.priority=="number"?Math.max(0,Math.min(4,w.priority)):"",mt=w.description||"",Qe={...w,metadata:{...w.metadata||{},...f}};return c`
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
          ${Me(H,$e)}
          ${Yd(Qe,{onChipToggle:ut=>fe.toggle({bead_id:D,chip_key:ut}),isChipOpen:ut=>fe.isOpen({bead_id:D,chip_key:ut})})}
          ${Kd({metadata:Qe.metadata,workspace_values:wt(),catalog:jt(),execution_defaults:lt(),expanded:R,presets:Gt()?.presets||[],preset_id:g,preset_busy:m,skipped_orchestration_keys:k},{onToggle:ut=>{R=ut,st()},onEdit:(ut,kn)=>{if(ut==="impl_runtime"||ut==="impl_model"||ut==="impl_effort"){ie(xe(ut,kn??""));return}ie(V(ut,kn??""))},onPresetSelect:ut=>{g=ut,k=[],st()},onPresetApply:()=>{Nt()}})}
          ${ep({md:Qe.metadata,catalog:X,workspace_defaults:ee,handlers:{onExecChange:(ut,kn)=>ie(V(ut,kn))}})}
          ${Kt(tt,nt)} ${St(w)}
          ${Gf(mt)}
          ${Wd(P,ae,{expanded:Te,draft:Z,sending:Ce,error:E})}
          ${Kf(w)} ${Yf(w)} ${lo(w)}
          ${os(w)} ${is(w)}
          ${jd(w,Jt)}
          ${sp({expanded:Ze,loading:De,error:Y,data:j},{onToggle:te})}
          ${op(le(),tn,{total:$e,expanded:Ye},Re)}
          ${ap({events:Tt,shown:ct},{onMore:N})}
        </div>
      </div>
    `}function st(){rt(Vf(),e)}return{load(w){w!==u&&(f={},g="",k=[],R=!1,Q(),be(),v(),dt(),oe(),re()),u=w,d=null,!_e&&t.subscribeCandidates&&(_e=t.subscribeCandidates(()=>{u&&st()})),b(),Ot(),W!==w&&pe(w)},clear(){u=null,d=null,f={},g="",m=!1,k=[],R=!1,Q(),be(),v(),dt(),oe(),re(),T(),de.close(),He.close(),rt(c``,e)},destroy(){Vt&&(Vt(),Vt=null),Ut&&(Ut(),Ut=null),Zt&&(Zt(),Zt=null),T(),document.removeEventListener("keydown",ye),fe.detach(),me||(de.destroy(),we&&we.parentNode&&we.parentNode.removeChild(we)),He.destroy(),Fe.parentNode&&Fe.parentNode.removeChild(Fe),u=null,d=null,re(),g="",m=!1,k=[],be(),v(),dt(),oe(),rt(c``,e)}}}function cp(e){let t=document.createElement("dialog");t.id="fatal-error-dialog",t.setAttribute("role","alertdialog"),t.setAttribute("aria-modal","true"),t.innerHTML=`
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
    </div>`,e.appendChild(t);let n=t.querySelector("#fatal-error-title"),r=t.querySelector("#fatal-error-message"),o=t.querySelector("#fatal-error-detail"),s=t.querySelector("#fatal-error-reload"),i=t.querySelector("#fatal-error-close"),l=()=>{if(typeof t.close=="function")try{t.close()}catch{}t.removeAttribute("open")},a=(u,d,f="")=>{n&&(n.textContent=u||"Unexpected Error"),r&&(r.textContent=d||"An unrecoverable error occurred.");let g=typeof f=="string"?f.trim():"";if(o&&(g.length>0?(o.textContent=g,o.removeAttribute("hidden")):(o.textContent="No additional diagnostics available.",o.setAttribute("hidden",""))),typeof t.showModal=="function")try{t.showModal(),t.setAttribute("open","")}catch{t.setAttribute("open","")}else t.setAttribute("open","")};return s&&s.addEventListener("click",()=>{window.location.reload()}),i&&i.addEventListener("click",()=>l()),t.addEventListener("cancel",u=>{u.preventDefault(),l()}),{open:a,close:l,getElement(){return t}}}var Xb="(max-width: 640px)";function Ti(e){if(typeof window.matchMedia!="function")return e(!1),()=>{};let t=window.matchMedia(Xb),n=!!t.matches;e(n);let r=o=>{let i=!!(typeof o=="object"&&o!==null&&typeof o.matches=="boolean"?o.matches:t.matches);i!==n&&(n=i,e(i))};return typeof t.addEventListener=="function"?(t.addEventListener("change",r),()=>{t.removeEventListener("change",r)}):typeof t.addListener=="function"?(t.addListener(r),()=>{typeof t.removeListener=="function"&&t.removeListener(r)}):()=>{}}function Qb(){return{lanes:{done:!0},areas:{}}}function es(e){let t={};if(typeof e!="object"||e===null)return t;for(let[n,r]of Object.entries(e))typeof r=="boolean"&&(t[n]=r);return t}function Zb(e){try{let t=window.localStorage.getItem(e);if(!t)return null;let n=JSON.parse(t);if(typeof n!="object"||n===null)return null;let r=n;return typeof r.lanes=="object"&&r.lanes!==null?{lanes:es(r.lanes),areas:es(r.areas)}:{lanes:es(r),areas:{}}}catch{return null}}function up(e,t){try{window.localStorage.setItem(e,JSON.stringify(t))}catch{}}function Ci(e,t=Qb()){let n={lanes:es(t.lanes),areas:es(t.areas)},r=Zb(e),o={lanes:{...n.lanes,...r?r.lanes:{}},areas:{...n.areas,...r?r.areas:{}}};return{isCollapsed(s){return o.lanes[s]===!0},isAreaCollapsed(s){return o.areas[s]===!0},toggle(s){let i=o.lanes[s]!==!0;return o={...o,lanes:{...o.lanes,[s]:i}},up(e,o),i},toggleArea(s){let i=o.areas[s]!==!0;return o={...o,areas:{...o.areas,[s]:i}},up(e,o),i}}}function ml(e){if(typeof e=="string"&&e.length>0)return e;if(e&&typeof e=="object"){let t=e;if(typeof t.message=="string"&&t.message.length>0)return t.message;if(typeof t.error=="string"&&t.error.length>0)return t.error;if(t.error&&typeof t.error=="object"&&typeof t.error.message=="string")return t.error.message}return"\uC694\uCCAD\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4"}function Ri(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"&&t.length>0):[]}function Oi(e){let{transport:t,console_el:n,getLanes:r,getWorkspaces:o,getCrossLanes:s,reproject:i,onCorrection:l,showToast:a,requestRender:u,adoptQueue:d,onDragBegin:f,candidate_drop:g}=e,m=[],k=null,R=!1,z=null,X=null,ee=null;function W(){z!==null&&clearTimeout(z),z=setTimeout(()=>{z=null,R=!1},0)}function q(){return s()??null}function O(){let L=new Map,se=o();for(let ae of Array.isArray(se)?se:[]){if(!ae||typeof ae!="object")continue;let me=ae.bead_blocked_by&&typeof ae.bead_blocked_by=="object"?ae.bead_blocked_by:{};for(let[we,de]of Object.entries(me))Array.isArray(de)&&L.set(we,Ri(de));for(let we of[...Array.isArray(ae.runnable)?ae.runnable:[],...Array.isArray(ae.session_active)?ae.session_active:[]])we&&typeof we.bead_id=="string"&&Array.isArray(we.blocked_by)&&we.blocked_by.length>0&&L.set(we.bead_id,Ri(we.blocked_by))}return L}function I(){let L=new Map,se=new Map,ae=o();for(let me of Array.isArray(ae)?ae:[]){if(!me||typeof me!="object")continue;let we=me.bead_blocked_by&&typeof me.bead_blocked_by=="object"?me.bead_blocked_by:{};for(let[de,Fe]of Object.entries(we))Array.isArray(Fe)&&L.set(de,Ri(Fe));for(let de of Array.isArray(me.runnable)?me.runnable:[])de&&typeof de.bead_id=="string"&&Array.isArray(de.blocked_by)&&se.set(de.bead_id,Ri(de.blocked_by))}for(let me of m)for(let we of[L,se]){let de=we.get(me.a);de!==void 0&&we.set(me.a,me.type==="dep-remove"?de.filter(Fe=>Fe!==me.b):de.includes(me.b)?de:[...de,me.b])}return{snapshot:L,runnable:se}}function F(){let L=O();for(let se of m){let ae=(L.get(se.a)||[]).slice();se.type==="dep-remove"?L.set(se.a,ae.filter(me=>me!==se.b)):ae.includes(se.b)||L.set(se.a,[...ae,se.b])}return L}function U(L=r(),se=q()){let ae=new Map;for(let De of Array.isArray(se?.lanes)?se.lanes:[]){let Y=new Map;for(let j of Array.isArray(De?.entries)?De.entries:[])j&&typeof j.bead_id=="string"&&Y.set(j.bead_id,j.dep_created_by_lane===!0);ae.set(typeof De?.id=="string"?De.id:"",Y)}let me=new Map,we=new Map,de=new Set,Fe=new Set;for(let De of L.chain_lanes){let Y=ae.get(De.lane_id);me.set(De.lane_id,{status:De.status,entries:De.rows.map((j,Ne)=>({bead_id:j.id,root_dir:j.root_dir,...Ne===0?{}:{dep_created_by_lane:Y?.get(j.id)===!0}}))});for(let j of De.rows)we.set(j.id,De.lane_id),j.fixed&&de.add(j.id),j.unplaced||Fe.add(j.id)}let He=new Map;for(let De of L.parallel_rows)typeof De.queue_index=="number"&&He.set(De.id,De.queue_index);for(let De of L.queue_groups)for(let Y of De.sublanes.serial)for(let j of Y.items)typeof j.queue_index=="number"&&He.set(j.id,j.queue_index);let Ze=I();return{blocked_by_map:F(),snapshot_blocked_by:Ze.snapshot,runnable_blocked_by:Ze.runnable,owner_of:new Map(Object.entries(L.owner_of)),cross_lanes:me,owner_lane_of:we,fixed_members:de,placed_members:Fe,parallel_rows:L.parallel_rows.map(De=>({bead_id:De.id,root_dir:De.root_dir,queue_index:De.queue_index??0})),parallel_raw_length:new Map(Object.entries(L.parallel_raw_length)),queue_index_of:He}}function ue(L,se){let ae=r();for(let we of[...ae.runnable,...ae.queue,...ae.running,...ae.pr_wait,...ae.done])if(!(we.non_occupying||we.id!==se)){if(we.root_dir===L)return we.expected_revision;break}let me=ae.queue_groups.find(we=>we.root_dir===L);return me?me.revision:0}async function M(L,se,ae,me){if(!t)return null;let de=await t(L,{...se,...ae?{root_dir:ae}:{},expected_revision:me});if(de&&de.conflict){de.queue&&d?.(ae,de.queue);let Fe=de.queue&&typeof de.queue.revision=="number"?de.queue.revision:me;de=await t(L,{...se,...ae?{root_dir:ae}:{},expected_revision:Fe})}return de&&de.queue&&d?.(ae,de.queue),de}async function B(L,se,ae,me,we){try{let de=await M(L,se,ae,me.get(ae)??ue(ae,we.bead_id));return!de||typeof de.applied!="boolean"?(a("\uD050 \uC694\uCCAD\uC774 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error"),null):(de.queue&&typeof de.queue.revision=="number"&&me.set(ae,de.queue.revision),de.conflict?(a("\uD050\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD574 \uC8FC\uC138\uC694","error"),null):de.applied===!1?(a(de.admission_reason?`\uD050 \uC801\uC7AC \uAC70\uBD80: ${de.admission_reason}`:"\uD050 \uC694\uCCAD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4","error"),null):de.queue&&typeof de.queue.revision=="number"?de.queue.revision:me.get(ae)??0)}catch(de){return a(ml(de),"error"),null}}async function Q(L,se,ae=new Map){if(L.type==="worker-queue-disarm"){try{let me=await M(L.type,L.payload,L.root_dir,ae.get(L.root_dir)??ue(L.root_dir,se));me&&me.queue&&typeof me.queue.revision=="number"&&ae.set(L.root_dir,me.queue.revision)}catch{}return!0}if(L.type==="worker-queue-place"||L.type==="worker-queue-reorder"||L.type==="worker-queue-remove")return await B(L.type,L.payload,L.root_dir,ae,{bead_id:se})!==null;try{return(L.type==="dep-add"||L.type==="dep-remove")&&t&&await t(L.type,{a:L.a,b:L.b,...L.root_dir?{root_dir:L.root_dir}:{}}),!0}catch(me){return a(ml(me),"error"),!1}}function re(L){(L.type==="dep-add"||L.type==="dep-remove")&&(m=[...m,{type:L.type,a:L.a,b:L.b}])}async function Ee(L,se){if(!t)return{ok:!1};try{let ae=await t(L.type,{...L.payload,expected_revision:se});return!ae||typeof ae.revision!="number"?(a("\uC5F0\uACB0 \uB808\uC778 \uC751\uB2F5\uC5D0 revision\uC774 \uC5C6\uC2B5\uB2C8\uB2E4","error"),{ok:!1}):{ok:!0,revision:ae.revision}}catch(ae){let me=ae,we=me&&me.code==="conflict"?me.details?.cross_lanes:null;return we&&typeof we.revision=="number"&&Array.isArray(we.lanes)?{ok:!1,conflict:we}:(a(ml(ae),"error"),{ok:!1})}}async function he(L,se,ae){let me=new Map,we=[],de=L.ops.slice(0,L.lane_op_index),Fe=L.ops.slice(L.lane_op_index);for(let Ze of de){if(!await Q(Ze,ae,me))return{done:!0};re(Ze)}let He=se;for(let Ze of L.lane_ops){if(He===null)return a("\uC5F0\uACB0 \uB808\uC778 \uC800\uC7A5\uC18C\uB97C \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error"),{done:!0};let De=await Ee(Ze,He);if(!De.ok)return De.conflict?{done:!1,conflict:De.conflict}:{done:!0};He=De.revision}for(let Ze of Fe){if(!await Q(Ze,ae,me))return{done:!0};re(Ze),Ze.type==="dep-add"&&we.push(Ze)}for(let Ze of ed(we))He=await pe(Ze,He);return{done:!0}}async function pe(L,se){if(se===null||!t)return se;let ae=L.pairs,me=se;for(let we=0;we<2;we+=1){if(ae.length===0)return me;try{let de=await t("monitor-lane-provenance",{lane_id:L.lane_id,pairs:ae.map(Fe=>({bead_id:Fe.bead_id,after:Fe.after,value:!0})),expected_revision:me});return de&&typeof de.revision=="number"?de.revision:me}catch(de){let Fe=de,He=Fe&&Fe.code==="conflict"?Fe.details?.cross_lanes:null;if(!He||typeof He.revision!="number"||!Array.isArray(He.lanes))return me;let Ze=He.lanes.find(De=>De&&De.id===L.lane_id);ae=td(Array.isArray(Ze?.entries)?Ze.entries:[],ae),me=He.revision}}return me}async function P(L,se,ae=[]){m=ae,l("",0);let me=r(),we=q();for(let de=0;;de+=1){let Fe=L(U(me,we));if("refused"in Fe){a(Fe.refused,"error");break}let He=await he(Fe,me.cross_lanes_revision,se);if(He.done){Fe.correction&&l(Fe.correction.lane_id,Fe.correction.corrected);break}if(de>=1){a("\uB808\uC778\uC774 \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4","error");break}let Ze=i(He.conflict);me=Ze.lanes,we=Ze.raw_lanes}m=[],u()}async function Ae(L,se){await P(ae=>ci(L,se,ae),L.bead_id)}function Se(L,se){let ae=se&&typeof se.closest=="function"?se.closest("[data-row-index]"):null;if(ae&&L.contains(ae)){let me=Number(ae.getAttribute("data-row-index"));return Number.isFinite(me)?me:0}return L.querySelectorAll("[data-row-index]").length}function E(L){let se=typeof L?.closest=="function"?L.closest(".worker-pane--collapsed[data-lane]"):null;if(!se)return null;let ae=se.getAttribute("data-lane");return ae==="queue"?{zone:se,target:{kind:"parallel",marker_index:r().parallel_rows.length}}:ae==="candidate"&&g===!0?{zone:se,target:{kind:"candidate"}}:null}function Z(L){let se=L.target;if(!k)return null;let ae=typeof se?.closest=="function"?se.closest("[data-drop]"):null;if(!ae)return E(se);let me=ae.getAttribute("data-drop");if(me==="candidate")return{zone:ae,target:{kind:"candidate"}};if(me==="parallel")return{zone:ae,target:{kind:"parallel",marker_index:Se(ae,se)}};if(me==="chain")return{zone:ae,target:{kind:"chain",lane_id:ae.getAttribute("data-lane-id")||"",marker_index:Se(ae,se)}};if(me==="repo-serial"){let we=ae.getAttribute("data-root-dir")||"";if(we!==k.root_dir)return null;let de=typeof se?.closest=="function"?se.closest("[data-queue-index]"):null,Fe=de&&ae.contains(de)?de.getAttribute("data-queue-index"):ae.getAttribute("data-lane-length"),He=Number(Fe);return{zone:ae,target:{kind:"repo-serial",root_dir:we,lane_id:ae.getAttribute("data-lane-id")||"",index:Number.isFinite(He)?He:0}}}return null}function Ce(){for(let L of Array.from(n.querySelectorAll(".is-drop-over")))L.classList.remove("is-drop-over")}function ge(L){X=L.target instanceof Element?L.target:null}function Te(L){let se=L.target,ae=typeof se?.closest=="function"?se.closest('[draggable="true"][data-bead-id]'):null,me=ae?ae.closest("[data-drag-kind]"):null;if(!me)return;if(ae&&X&&ae.contains(X)&&typeof X.closest=="function"&&X.closest("input, button, a")){L.preventDefault();return}let we=me.getAttribute("data-bead-id")||"",de=me.getAttribute("data-drag-kind")||"",Fe=me.getAttribute("data-root-dir")||"";if(!we||!de)return;let He=me.getAttribute("data-queue-index")||"",Ze=Number(He),De=me.getAttribute("data-lane-id")||"";k={kind:de,bead_id:we,root_dir:Fe,...He!==""&&Number.isFinite(Ze)?{queue_index:Ze}:{},...De?{lane_id:De}:{}},R=!0,f?.(),n.classList.add("is-dragging");try{L.dataTransfer?.setData("text/plain",we),L.dataTransfer&&(L.dataTransfer.effectAllowed="move")}catch{}}function be(L){let se=Z(L);se&&(L.preventDefault(),L.dataTransfer&&(L.dataTransfer.dropEffect="move"),se.zone.classList.add("is-drop-over"))}function Pe(L){let se=L.target;typeof se?.closest=="function"&&(se.closest("[data-drop]")?.classList.remove("is-drop-over"),se.closest(".worker-pane--collapsed")?.classList.remove("is-drop-over"))}function Xe(){k=null,Ce(),n.classList.remove("is-dragging"),W()}function Ke(L){let se=Z(L),ae=k;k=null,Ce(),n.classList.remove("is-dragging"),!(!se||!ae)&&(L.preventDefault(),Ae(ae,se.target))}return{attach(L){ee||(ee=L,L.addEventListener("pointerdown",ge),L.addEventListener("dragstart",Te),L.addEventListener("dragover",be),L.addEventListener("dragleave",Pe),L.addEventListener("drop",Ke),L.addEventListener("dragend",Xe))},detach(){z!==null&&(clearTimeout(z),z=null);let L=ee;ee=null,L&&(L.removeEventListener("pointerdown",ge),L.removeEventListener("dragstart",Te),L.removeEventListener("dragover",be),L.removeEventListener("dragleave",Pe),L.removeEventListener("drop",Ke),L.removeEventListener("dragend",Xe))},isDragging(){return k!==null},consumeClickSuppression(){let L=R;return R=!1,L},applyDrop:Ae,runPlanned:P,dropModel:U,sendOp:Q,sendQueueCas:B,rememberDep:re}}var gl=Object.freeze({repo_ops_worktree_unowned:"\uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC\uAC00 \uC544\uC9C1 Worker \uC18C\uC720\uAC00 \uC544\uB2C8\uC5B4\uC11C \uC2A4\uD06C\uB9BD\uD2B8 \uC2E4\uD589 \uC804\uC5D0 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4.",verify_cmd_failed:"\uBA38\uC9C0 \uD6C4 \uAC80\uC99D \uBA85\uB839\uC774 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",gh_observation_failed:"GitHub\uC5D0\uC11C PR \uC0C1\uD0DC\uB97C \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",verify_script_failure:"\uAC80\uC99D \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",deploy_script_failure:"\uBC30\uD3EC \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",interrupted_without_terminal_exit:"\uC791\uC5C5\uC774 \uC885\uB8CC \uAE30\uB85D \uC5C6\uC774 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4.",manual_target_missing:"\uC218\uB3D9 \uBC30\uD3EC \uAE30\uB85D\uC5D0 \uD540\uB41C \uB300\uC0C1 SHA\uAC00 \uC5C6\uC5B4 \uC2E4\uD589\uD558\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4.",base_unresolved:"PR\uC774 \uC5B4\uB290 base \uBE0C\uB79C\uCE58\uB85C \uBA38\uC9C0\uB418\uB294\uC9C0 \uD655\uC815\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_ref_unobserved:"PR\uC758 base \uBE0C\uB79C\uCE58\uB97C \uC544\uC9C1 \uAD00\uCE21\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",merge_sha_unobserved:"\uBA38\uC9C0 \uCEE4\uBC0B SHA\uB97C \uC544\uC9C1 \uAD00\uCE21\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_fetch_failed:"\uC6D0\uACA9 base \uBE0C\uB79C\uCE58\uB97C fetch\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_rev_unavailable:"fetch\uD55C \uC6D0\uACA9 base \uBE0C\uB79C\uCE58\uC758 \uCEE4\uBC0B\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_ff_diverged:"\uB85C\uCEEC base \uBE0C\uB79C\uCE58\uAC00 \uC6D0\uACA9\uACFC \uAC08\uB77C\uC838 fast-forward\uB85C \uC815\uB82C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",deployment_target_not_covering_merge:"\uBC30\uD3EC \uB300\uC0C1 base\uAC00 \uC774 \uBA38\uC9C0 \uCEE4\uBC0B\uC744 \uD3EC\uD568\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.",deployment_candidate_ancestry_check_failed:"\uBC30\uD3EC \uB300\uC0C1 base\uAC00 \uC774 \uBA38\uC9C0 \uCEE4\uBC0B\uC744 \uD3EC\uD568\uD558\uB294\uC9C0 \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",verify_red:"\uBA38\uC9C0 \uD6C4 \uAC80\uC99D\uC774 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",cleanup_failed:"\uBA38\uC9C0 \uD6C4 \uC815\uB9AC\uAC00 \uB05D\uB098\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",retry_exhausted:"\uC790\uB3D9 \uC7AC\uC2DC\uB3C4\uB97C \uBAA8\uB450 \uC4F0\uACE0\uB3C4 \uAC19\uC740 \uC2E4\uD328\uAC00 \uC774\uC5B4\uC84C\uC2B5\uB2C8\uB2E4.",conflict_unresolved:"\uCDA9\uB3CC \uD574\uC18C\uAC00 \uB05D\uB098\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",internal_record_failed:"Worker \uB0B4\uBD80 \uAE30\uB85D\uC774 \uC2E4\uD328\uD574 \uC9C4\uD589\uC744 \uBA48\uCDC4\uC2B5\uB2C8\uB2E4.",foreign_landing_unpinned:"\uB2E4\uB978 \uC800\uC7A5\uC18C \uCC29\uC9C0\uC778\uB370 foreign_repo\xB7foreign_path\xB7foreign_base \uD540\uC774 \uC5C6\uAC70\uB098 \uD615\uC2DD\uC774 \uD2C0\uB9BD\uB2C8\uB2E4.",foreign_checkout_unavailable:"\uD540\uB41C \uB300\uC0C1 \uC800\uC7A5\uC18C \uCCB4\uD06C\uC544\uC6C3\uC774 \uC5C6\uAC70\uB098 foreign_repo\uC640 \uAC19\uC740 URL\uC758 remote\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4.",foreign_deploy_unsupported:"\uB300\uC0C1 \uC800\uC7A5\uC18C\uAC00 [deploy]\uB97C \uC120\uC5B8\uD574 Worker\uAC00 \uBC30\uD3EC \uC99D\uAC70\uB97C \uB9CC\uB4E4 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4. \uC138\uC158\uC774 \uBC30\uD3EC\uC640 \uB9C8\uAC10\uC744 \uC18C\uC720\uD569\uB2C8\uB2E4.",repair_lane_retired:"\uC790\uB3D9 \uC218\uB9AC \uB808\uC778\uC774 \uC740\uD1F4\uD574 \uC0AC\uB78C \uCC98\uB9AC\uB85C \uB118\uC5B4\uC654\uC2B5\uB2C8\uB2E4."});var dp={verify_failed:"\uAC80\uC99D \uC2E4\uD328",verify_cmd_failed:"\uAC80\uC99D \uC2E4\uD328",verify_script_failure:"\uAC80\uC99D \uC2E4\uD328",deploy_failed:"\uBC30\uD3EC \uC2E4\uD328",deploy_script_failure:"\uBC30\uD3EC \uC2E4\uD328",interrupted_without_terminal_exit:"\uC911\uB2E8\uB428",quickfix_landing_failed:"\uCC29\uC9C0 \uC2E4\uD328",runner_exit:"\uC138\uC158 \uC2E4\uD328",session_parked:"\uC138\uC158 \uB300\uAE30",session_ended_unresolved:"\uC138\uC158 \uC885\uB8CC",prerequisite_unmet:"\uC120\uD589 \uB300\uAE30",delivery_unproven:"\uCC29\uC9C0 \uC99D\uAC70 \uBD80\uC871"};function Ii(e){return typeof e!="string"||e.length===0?[]:e.split(":").filter(t=>t.length>0)}function Li(e){for(let t of Ii(e)){if(Object.hasOwn(dp,t))return dp[t];if(t.startsWith("session_"))return"\uC138\uC158 \uC2E4\uD328"}return null}function fp(e){return Ii(e).length===0?null:Li(e)||"\uC2E4\uD328"}function Rr(e){let t=null;for(let n of Ii(e))Object.hasOwn(gl,n)&&(t=gl[n]);return t}function dr(e){let t=Li(e),n=Rr(e);return t&&n?`${t} \u2014 ${n}`:t||n?t||n:typeof e=="string"?e:""}function _p(e,t){let n=Li(e)??Li(t),r=Rr(t)??Rr(e);return n&&r?`${n} \u2014 ${r}`:n||r?n||r:typeof t=="string"?t:""}var Jb=new Set(["repo_operation_timeout_unresolved"]);function ey(e){for(let t of Ii(e))if(Jb.has(t)||t.startsWith("repo_ops_"))return!0;return!1}function ty(e,t){return t.code==="interrupted"||t.interrupted===!0||e.failure_kind==="interrupted_without_terminal_exit"||t.code==="interrupted_without_terminal_exit"}function mp(e,t){if(!e||typeof e!="object")return"";let n=e.failure;if(!n||typeof n!="object"||ey(n.code))return"";if(n.code==="timeout"){let o=Number(t);return Number.isFinite(o)&&o>0?`\uD0C0\uC784\uC544\uC6C3 ${Math.round(o/1e3)}\uCD08 \uCD08\uACFC`:"\uD0C0\uC784\uC544\uC6C3 \uCD08\uACFC"}if(ty(e,n))return"\uC885\uB8CC \uAE30\uB85D \uC5C6\uC74C \u2014 \uC911\uB2E8\uB428";let r=typeof e.elapsed_ms=="number"&&Number.isFinite(e.elapsed_ms)&&e.elapsed_ms>=0?` \xB7 ${Ar(e.elapsed_ms)}`:"";return typeof e.signal=="string"&&e.signal.length>0?`signal ${e.signal}${r}`:Number.isInteger(e.exit_code)?`exit ${e.exit_code}${r}`:""}var pp={schema_unsupported:"\uD540\uB41C \uC815\uCC45 \uC2A4\uD0A4\uB9C8\uB97C \uC9C0\uC6D0\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4."};function gp(e){if(!e||typeof e!="object")return"";let t=e.retry;if(!t||typeof t!="object")return"";if(typeof t.blocked_reason=="string"&&t.blocked_reason)return`\uC790\uB3D9 \uC7AC\uC2DC\uB3C4 \uBABB \uD568 \u2014 ${Object.hasOwn(pp,t.blocked_reason)?pp[t.blocked_reason]:t.blocked_reason}`;if(t.status==="absorbed"){let n=t.absorbed&&typeof t.absorbed=="object"?t.absorbed:null,r=dr(n?.first_failure?.code);return r?`\uC790\uB3D9 \uC7AC\uC2DC\uB3C4\uB85C \uD574\uC18C\uB428 \u2014 \uCCAB \uC2E4\uD328: ${r}`:"\uC790\uB3D9 \uC7AC\uC2DC\uB3C4\uB85C \uD574\uC18C\uB428"}if(e.state!=="failed")return"";if(t.status==="not_applicable")return"\uC7AC\uC2DC\uB3C4 \uB300\uC0C1 \uC544\uB2D8 \u2014 \uC2A4\uD06C\uB9BD\uD2B8 \uC2E4\uD589 \uC804 \uC2E4\uD328";if(t.status==="consumed"){let n=typeof t.first_fingerprint=="string"&&t.first_fingerprint?t.first_fingerprint:null;if(n===null)return"";if(n===e.failure?.fingerprint)return"\uC790\uB3D9 \uC7AC\uC2DC\uB3C4 1\uD68C \u2014 \uAC19\uC740 \uC2E4\uD328";let r=dr(t.first_failure?.code);return r?`\uC790\uB3D9 \uC7AC\uC2DC\uB3C4 1\uD68C \u2014 \uB2E4\uB978 \uC2E4\uD328: ${r}`:"\uC790\uB3D9 \uC7AC\uC2DC\uB3C4 1\uD68C \u2014 \uB2E4\uB978 \uC2E4\uD328"}return""}function ny(e){if(!Number.isFinite(e)||e<0)return"0s";let t=Math.floor(e/1e3),n=Math.floor(t/60),r=t%60;return n>0?`${n}m ${String(r).padStart(2,"0")}s`:`${r}s`}var hp=200;function ry(e){return typeof e!="string"||e.length===0?"":e.length>hp?`${e.slice(0,hp)}\u2026`:e}function oy(e){let t=e&&e.attempts>0&&e.max>0?` ${e.attempts}/${e.max}`:"",n=e&&typeof e.next_at=="number"?` \xB7 ${new Date(e.next_at).toLocaleTimeString("ko-KR",{hour:"2-digit",minute:"2-digit"})}`:"";return`\u21BB \uC7AC\uC2DC\uB3C4 \uB300\uAE30${t}${n}`}function yp(e){if(!e)return"";let t=Array.isArray(e.timeline)?e.timeline:[],n=typeof e.log_path=="string"?e.log_path:"",r=e.log_expired===!0,o=e.log_unreadable===!0;return t.length===0&&n.length===0&&!r&&!o?"":c`${t.length>0?c`<ol class="rtile__history" data-seam="tile-timeline">
        ${t.map(s=>c`<li class="rtile__history-row">
              ${bp(s.at)?c`<span class="rtile__history-at"
                    >${bp(s.at)}</span
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
            ${eo(n)}
          </p>`:""}`}function bp(e){return typeof e!="number"||!Number.isFinite(e)?"":new Date(e).toLocaleTimeString("ko-KR",{hour:"2-digit",minute:"2-digit"})}function sy(e,t){if(!e||e.open!==!0)return"";let n=Rr(e.cause)||dr(e.cause),r=e.retry&&e.retry.attempts>0?`\uC790\uB3D9 \uC7AC\uC2DC\uB3C4 ${e.retry.attempts}\uD68C \u2014 \uAC19\uC740 \uC624\uB958`:"",o=e.cause_detail,s=e.quickfix_lane&&e.quickfix_landing?e.quickfix_landing:null,i=s?[s.cursor||null,typeof s.head_sha=="string"?s.head_sha.slice(0,7):null,s.reason||null].filter(Boolean).join(" \xB7 "):"",l=typeof e.finished_at=="number"?`${new Date(e.finished_at).toLocaleString("ko-KR")} \xB7 ${rn(e.finished_at,t)}`:"",a=[e.runner,e.model,e.observed_effort??e.effort,e.speed].filter(g=>typeof g=="string"&&g.length>0).join(" \xB7 "),u=e.usage?.total_cost_usd,d=typeof u=="number"&&Number.isFinite(u)?`$${u.toFixed(2)}`:"",f=yp(e);return c`<div
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
  </div>`}function iy(e){return!e||!e.repo&&!e.serial_lane_id?"":c`${e.repo?c`<span
        class="worker-card__repo rtile__repo"
        title=${e.root_dir||""}
        >${e.repo}</span
      >`:""}${e.serial_lane_id?c`<span class="rtile__lane">${e.serial_lane_id}</span>`:""}`}var ay=new Set(["codex-runner"]);function ly(e,t,n,r=null){if(!e)return"";let o=e.last_activity||null,s=o&&typeof o.text=="string"?o.text:"",i=o&&typeof o.at=="number"?o.at:null,l=(r||!Array.isArray(e.legs)?[]:e.legs).filter(m=>m&&!(typeof m.agent_type=="string"&&ay.has(m.agent_type))),a=l.filter(m=>m&&m.state==="live"),u=l.filter(m=>m&&m.state!=="live"),d=r&&typeof r.last_event_at=="number"?rn(r.last_event_at,t):"",f=r?rn(r.updated_at,t):"",g=d?`\uCD5C\uADFC \uD65C\uB3D9 ${d}`:f?`\uAC31\uC2E0 ${f}`:"";return c`${s?c`<div class="rtile__activity${n?" is-paused":""}">
        <span class="rtile__activity-dot" aria-hidden="true"></span>
        <span class="rtile__activity-text">${s}</span>
        ${i!==null?c`<span class="rtile__activity-age"
              >${rn(i,t)}</span
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
      </div>`:""}`}var cy={remote:"\uB2E4\uB978 \uBA38\uC2E0 \uC138\uC158 \u2014 \uC774 \uC11C\uBC84\uC5D0 transcript \uC5C6\uC74C",missing:"transcript \uD30C\uC77C \uC5C6\uC74C"};function uy(e){if(!e)return"";let t=cy[e.locality]||"";return c`<button
    type="button"
    class="rtile__session"
    ?disabled=${t.length>0}
    title=${t||"\uB77C\uC774\uBE0C \uC138\uC158 \uC5F4\uAE30"}
    aria-label="라이브 세션 열기"
  >
    ▤ 세션
  </button>`}function dy(e,t,n,r=""){if(e==="retry_wait")return n?c`<div class="rtile__foot">${n}</div>`:"";let o=ry(t?.summary);if(e==="waiting")return c`${o?c`<p class="rtile__held-summary">${o}</p>`:""}${r}
      <div class="rtile__foot">${n}</div>`;let s=yp(t);return c`${o?c`<p class="rtile__held-summary">${o}</p>`:""}${s}
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
    </div>`}function hl(e,t,n=null,r={}){let o=e.kind==="session",s=o&&Array.isArray(e.session_refs)&&e.session_refs.find(Ke=>Ke&&Ke.current===!0)||null,i=e.failed===!0,l=i&&e.failure||null,a=e.parked===!0&&!i,u=e.retry_wait===!0&&!i&&!a,d=e.waiting===!0&&!i&&!a&&!u,f=a&&e.failure||null,g=d&&e.wait||null,m=a||u||d,k=!!e.paused,R=i||m?e.status_label||(a?"\uC138\uC158 \uB300\uAE30":u?"\uC7AC\uC2DC\uB3C4 \uB300\uAE30":d?"\uC120\uD589 \uB300\uAE30":e.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328"):k?"\uC77C\uC2DC\uC815\uC9C0":typeof e.started_at=="number"?ny(t-e.started_at):"\u2014",z=e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker)?e.exec_chips:null,X=yo(e),ee=en(e.usage),W=Hn(e.usage),q=e.conflict_resolution?k?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":"\uCDA9\uB3CC \uD574\uC18C":null,O=e.base_exception||null,I=e.landing,F=e.attempt_id&&e.attempt_id===n,U=r.monitor||null,ue=iy(U),M=Ks(U?.cross_lane_chip),B=U?Gs(U.dependency_chips):"",Q=ly(U,t,k,o?{updated_at:e.updated_at??null,last_event_at:s&&s.locality==="local"?s.last_event_at:null}:null),re=o&&e.workflow?.chips?.exec_receipt||null,Ee=Ys(e.workflow),he=Vs(e.rec,e.chip_popover?.chip_key==="rec"),pe=e.chip_popover?Vr(e.chip_popover.content):"",P=re?c`<span
        class="ctl-chip ctl-chip--exec-receipt"
        title=${`exec_receipt ${Wn(re)}`}
        >${`${re.kind}:${xs(re)}`}</span
      >`:"",Ae=s?c`<span
        class="ctl-chip ctl-chip--sref"
        title=${`${s.provider}:${s.session_id}@${s.host}${(e.session_refs||[]).length>=2?` \xB7 \uC774\uB825 ${(e.session_refs||[]).length}`:""}`}
        >${wo(s)}</span
      >`:"",Se=ue||M||Ee||Ae||P||he?c`<div class="rtile__meta">
          ${ue}${M}${Ee}${Ae}${P}${he}${pe}
        </div>`:"",E=l?c`<button
          type="button"
          class="rtile__failure-badge"
          data-attempt-id=${l.attempt_id}
          aria-expanded=${l.open===!0?"true":"false"}
          aria-label="실패 상세"
        >
          ⛔ ${fp(l.cause)||"\uC2E4\uD328"}
        </button>
        ${l.halted_auto_advance?c`<span class="rtile__auto-halted">자동 진행 꺼짐</span>`:""}`:"",Z=a?c`<span
        class="rtile__held-badge"
        title="세션이 사용자 결정을 기다리며 정상 종료했습니다 — 큐는 계속 갑니다"
        >⏸ 세션 대기</span
      >`:u?c`<span
          class="rtile__held-badge"
          title="환경성 실패의 자동 재시도를 기다립니다 — 사람이 할 일은 없습니다"
          >${oy(e.retry)}</span
        >`:d?c`<span
            class="rtile__held-badge"
            title="세션이 선행 미충족으로 착수를 거부했습니다 — 선행이 닫히면 저절로 다시 돕니다"
            >⛓ 선행 대기</span
          >`:"",Ce=c`${q?c`<span class="worker-mini__badge">${q}</span>`:""}${O?c`<span
        class="worker-mini__badge"
        title="이 세션의 target base가 워크스페이스 선언 base와 다릅니다"
        >${O}</span
      >`:""}${E}${Z}`,ge=o?"":to(e),Te=Ds(l?.quickfix_landing),be=Te==="settlement"?"\uC815\uC0B0 \uC7AC\uAC1C":"\uC774\uC5B4\uD558\uAE30",Pe=Te==="settlement"?"\uCC29\uC9C0 \uC815\uC0B0\uC744 \uB2E4\uC2DC \uC2E4\uD589":"\uAC19\uC740 \uC138\uC158\uC73C\uB85C \uC774\uC5B4\uC11C \uC9C4\uD589",Xe=e.discard?.action&&!(i&&l?.landed===!0)?c`<button
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
      ${Xs(e.priority)}${X?c`<span class="rtile__resumed" title=${X}>↻</span>`:""}${Ce}
      <div class="rtile__hd-actions">
        ${o?c`${typeof e.started_at=="number"?c`<span class="rtile__elapsed">${R}</span>`:""}${uy(s)}<span
                class="rtile__session-badge"
                title="Worker가 아닌 세션이 in_progress로 잡은 이슈"
                >세션</span
              >`:c`<span class="rtile__elapsed">${R}</span>`}
        ${o||m?"":i?c`<button
                  type="button"
                  class="rtile__resume"
                  data-resume-kind=${Te}
                  ?disabled=${l?.resume_eligible===!1}
                  title=${l?.resume_eligible===!1?l.resume_reason||`${be} \uBD88\uAC00`:Pe}
                  aria-label=${be}
                >
                  ↻ ${be}
                </button>
                ${Xe}`:c`<button
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
                ${Xe}`}
      </div>
    </div>
    <div class="rtile__title">${e.title}</div>
    ${m?dy(a?"parked":u?"retry_wait":"waiting",a?f:g,Xe,d?B:""):i?"":c`${Q}${e.rollup?ks(e.rollup,{parent_id:e.bead_id,expanded:e.rollup_expanded===!0,childChips:ta}):""}
            ${I?c`<div class="rtile__landing">
                  <span
                    class="merge-step${I.failed?" merge-step--failed":""}"
                    style=${`--progress: ${I.percent}%`}
                    >${I.label}${I.index>0?c`<span class="merge-step__n"
                          >${I.index}/${I.total}</span
                        >`:""}</span
                  >
                </div>`:""}
            ${B}
            ${o?Se:ue||M||Ee||z||he||ee.length>0||W?c`<div class="rtile__meta">
                    ${ue}${M}${Ee}${Hs(e.exec_chips)}${he}
                    ${ee.length>0?ee.map(Ke=>c`<span
                              class="worker-usage"
                              title=${Ke.tooltip}
                              >${Ke.label}</span
                            >`):W?c`<span
                            class="worker-usage"
                            title=${ko(e.usage)}
                            >${W}</span
                          >`:""}${pe}
                  </div>`:""}
            ${Bs(e)} ${ge}
            <!-- 살아있음만 말하는 비의미적 액센트 (UI-58y2 데스크톱 §실행 타일).
         quick_fix landing의 실제 진행은 위의 별도 진행 줄이 소유한다.
         일시정지된 타일은 살아있지 않으므로 액센트도 없다. -->
            ${i||k?"":c`<div class="rtile__accent" aria-hidden="true"></div>`}`}
    ${sy(l,t)}
  </div>`}function py(e){let t=e.last_activity&&typeof e.last_activity=="object"?e.last_activity:null,n=Array.isArray(e.legs)?e.legs:[],r=e.dependency_chips||null;return!t&&n.length===0&&!r&&e.kind!=="session"?null:{...t?{last_activity:t}:{},...n.length>0?{legs:n}:{},...r?{dependency_chips:r}:{}}}function vp(e,t=Date.now(),n=null){let r=Array.isArray(e)?e:[];return c`<div class="worker-rungrid" id="worker-rungrid">
    ${r.length===0?c`<div class="worker-rungrid__empty">실행 세션 없음</div>`:r.map(o=>hl(o,t,n,{monitor:py(o)}))}
  </div>`}var Qt="",fy=["impl_runtime","impl_model","impl_effort"],_y=["claude_account","codex_account"],my=5,Mi=1;function fn(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function Pi(e,t){let n=t.transport,r=typeof t.root_dir=="string"&&t.root_dir.length>0?t.root_dir:null,o=t.notify||($=>ke($,"error",4e3)),s={},i={},l={},a={},u=[],d=!1,f={state:"absent",values:{},warnings:[]},g={},m={},k=Promise.resolve(),R={claude:null,codex:null},z=!1,X=null,ee={},W="",q="",O=!1,I=!1,F=!1,U=null,ue=!1;function M(){let $=t.queue?t.queue():null;return fn($)?$:null}function B(){let $=M();return $?$.runner_catalog:null}function Q(){let $=M();return $&&fn($.execution_defaults)?$.execution_defaults:null}function re(){let $=t.implPresetStore?.get();return fn($)&&Array.isArray($.presets)?$:null}function Ee(){return r===null?{}:{root_dir:r}}async function he($,N){return ue||!n?null:await n($,N)}function pe($){$&&fn($.queue)&&t.onQueueAdopt?.($.queue)}async function P($,N){let te=M();if(!te||ue)return null;let ne=await he($,{...N,...Ee(),expected_revision:te.revision});if(pe(ne),r!==null&&ne&&ne.conflict){let le=ne.queue&&typeof ne.queue.revision=="number"?ne.queue.revision:M()?.revision??te.revision;ne=await he($,{...N,...Ee(),expected_revision:le}),pe(ne)}return ne}async function Ae(){d=!0,J();try{let $=await he("get-session-defaults",{...Ee()});s=fn($?.values)?{...$.values}:{},i={...s},l={},a={},u=Array.isArray($?.warnings)?$.warnings:[]}catch($){u=["kv_read_failed"],o(`\uC138\uC158 \uAE30\uBCF8\uAC12\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4: ${$ instanceof Error?$.message:String($)}`)}finally{d=!1,J()}}async function Se(){let $=Jc(s,i);if(Object.keys($).length!==0){try{let N=await he("set-session-defaults",{values:$,...Ee()});s=fn(N?.values)?{...N.values}:{},i={...s},u=Array.isArray(N?.warnings)?N.warnings:[]}catch(N){o(`\uC138\uC158 \uAE30\uBCF8\uAC12 \uC800\uC7A5 \uC2E4\uD328: ${N instanceof Error?N.message:String(N)}`)}J()}}function E($,N){if(!fn($))return;let te=$.state;f={state:te==="usable"||te==="unusable"||te==="absent"?te:"absent",values:fn($.values)?{...$.values}:{},warnings:Array.isArray($.warnings)?$.warnings:[]},m={...f.values},N&&(g={...m})}async function Z(){try{E(await he("get-workspace-accounts",{...Ee()}),!0)}catch($){f={state:"unusable",values:{},warnings:["kv_read_failed"]},m={},g={},o(`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4: ${$ instanceof Error?$.message:String($)}`)}J()}async function Ce($){try{let N=await fetch($);if(!N.ok)return null;let te=await N.json();if(!fn(te)||!Array.isArray(te.accounts))return null;let ne=te.accounts.filter(le=>fn(le)&&typeof le.key=="string"&&le.key.length>0&&typeof le.email=="string"&&le.email.length>0);return{accounts:ne,active:ne.find(le=>le.active===!0)||null}}catch{return null}}async function ge(){z=!0;let[$,N]=await Promise.all([Ce("/api/claude-usage"),Ce("/api/codex-usage")]);ue||(R={claude:$,codex:N},J())}function Te(){let $={};for(let N of _y){let te=Object.hasOwn(g,N)?g[N]:null,ne=Object.hasOwn(m,N)?m[N]:null;te!==ne&&($[N]=te)}return $}async function be(){let $=Te();if(Object.keys($).length!==0){try{E(await he("set-workspace-accounts",{values:$,...Ee()}),!1)}catch(N){o(`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12 \uC800\uC7A5 \uC2E4\uD328: ${N instanceof Error?N.message:String(N)}`)}J()}}function Pe($,N){N===Qt?delete g[$]:g[$]=N,J(),k=k.then(()=>be())}function Xe($,N){if(fy.includes($)){me($,N);return}N===Qt?delete i[$]:i[$]=N,J(),Se()}function Ke($,N){l[$]=N,delete a[$]}function L($,N,te){if(l[$]=N,N.length>0&&!te(N)){a[$]=!0,J();return}delete l[$],delete a[$],N.length===0?delete i[$]:i[$]=N,J(),Se()}function se(){let $=Mt().orchestration_model,N=mn({global:{orchestration_model:$??void 0},execution_defaults:Q(),runner_catalog:B()}).orchestration_model.value;return N?xn(B(),N):null}function ae($,N){typeof N=="string"&&N.length>0?i[$]=N:delete i[$]}function me($,N){let te=N===Qt?void 0:N,ne=Qc({impl_runtime:$==="impl_runtime"?te:i.impl_runtime,impl_model:$==="impl_model"?te:i.impl_model,impl_effort:$==="impl_effort"?te:i.impl_effort},B(),se());ae("impl_runtime",ne.impl_runtime),ae("impl_model",ne.impl_model),ae("impl_effort",ne.impl_effort),J(),Se()}async function we(){let $=M();if(!$)return;let N={orchestration_model:$.orchestration_model??null,orchestration_effort:$.orchestration_effort??null,orchestration_speed:$.orchestration_speed??null},te=eu(N,{...N,...ee});if(Object.keys(te).length!==0){try{let ne=await P("worker-queue-set-orchestration-defaults",{values:te});if(ne&&ne.applied===!1){o("Worker \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC");return}ee={}}catch(ne){o(`Worker \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${ne instanceof Error?ne.message:String(ne)}`)}J()}}function de($,N){ee[$]=N===Qt?null:N,J(),we()}function Fe($){if(X=$,!$){J();return}let N=B(),te=Mt(),ne=te.orchestration_model;ne&&!So(N,$).includes(ne)&&(ee.orchestration_model=null,ne=null);let le=te.orchestration_effort;le&&!da(N,$,ne||hn).includes(le)&&(ee.orchestration_effort=null),J(),we()}async function He($){if(!(!M()||$<Mi)){try{await P("worker-queue-set-slots",{slots:$})}catch(N){o(`slots \uC800\uC7A5 \uC2E4\uD328: ${N instanceof Error?N.message:String(N)}`)}J()}}async function Ze($){if(!(!M()||$<Mi||$>my)){try{await P("worker-queue-set-serial-lane-count",{count:$})}catch(N){o(`\uC9C1\uB82C \uB808\uC778 \uC800\uC7A5 \uC2E4\uD328: ${N instanceof Error?N.message:String(N)}`)}J()}}async function De($,N){let te=$==="auto_advance"?"worker-automation-toggle":"worker-merge-auto-toggle";try{await P(te,{on:N})}catch(ne){o(`\uC790\uB3D9\uD654 \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${ne instanceof Error?ne.message:String(ne)}`)}J()}function Y(){let $={},N=Mt();for(let te of Xr){let ne=Yn.includes(te)?N[te]:i[te];typeof ne=="string"&&ne.length>0&&($[te]=ne)}return $}async function j(){let $=re();if(!$)return;let N=Y();if(Object.keys(N).length===0){o("\uC800\uC7A5\uD560 \uC2E4\uD589 \uC124\uC815\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uBA3C\uC800 \uC2E4\uD589 \uAC12\uC744 \uC120\uD0DD\uD558\uC138\uC694");return}let te=($.presets||[]).find(le=>le.id===W),ne=q.trim()||(te?te.name:"");if(!ne){o("\uD504\uB9AC\uC14B \uC774\uB984\uC744 \uC785\uB825\uD558\uC138\uC694");return}try{let le=te?await he("impl-preset-update",{expected_revision:$.revision,id:te.id,name:ne,settings:N}):await he("impl-preset-create",{expected_revision:$.revision,name:ne,settings:N});if(le&&le.applied){if(q="",!te&&Array.isArray(le.presets)){let Be=le.presets.find(Ye=>Ye.name===ne);W=Be?Be.id:W}J()}else o("\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4"),J()}catch(le){o(`\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328: ${le instanceof Error?le.message:String(le)}`)}}async function Ne(){let $=re();if(!(!$||W.length===0))try{let N=await he("impl-preset-delete",{expected_revision:$.revision,id:W});N&&N.applied?(W="",J()):(o("\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328: \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4"),J())}catch(N){o(`\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328: ${N instanceof Error?N.message:String(N)}`)}}function at($){s=fn($.values)?{...$.values}:{},i={...s},u=Array.isArray($.warnings)?$.warnings:[],fn($.queue)&&(t.onQueueAdopt?.($.queue),ee={})}async function Je(){let $=re(),N=M();if(!$||!N||W.length===0)return;let te=ne=>({preset_id:W,expected_revision:$.revision,expected_queue_revision:ne,...Ee()});try{let ne=await he("apply-impl-preset-global",te(N.revision));if(ne&&ne.applied&&at(ne),r!==null&&ne&&ne.queue_applied===!1){let le=ne.queue&&typeof ne.queue.revision=="number"?ne.queue.revision:M()?.revision??N.revision;ne=await he("apply-impl-preset-global",te(le)),ne&&ne.applied&&at(ne)}ne&&ne.applied?ne.queue_applied===!1&&o("\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uAC12\uC740 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC138\uC694"):ne&&ne.conflict&&o("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328: \uD504\uB9AC\uC14B\uC774 \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4")}catch(ne){o(`\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328: ${ne instanceof Error?ne.message:String(ne)}`)}J()}async function v(){I=!0,F=!1,J();try{let $=await he("get-worker-system-prompt",{});!$||typeof $!="object"||Array.isArray($)?F=!0:U=$}catch{F=!0}finally{I=!1,J()}}function G(){if(O=!O,O&&!U){v();return}J()}function Re(){let $=so({loading:I,error:F});if($)return $;if(!U)return"";let N=Array.isArray(U.variants)?U.variants:[];return c`<div class="settings-dialog__sp-body">
      ${U.target_base_placeholder?c`<div class="prompt-block__meta">
            \`${U.target_base_placeholder}\`는 디스패치 시점에 해석된
            base로 치환됩니다.
          </div>`:""}
      ${N.map(te=>c`<div class="settings-dialog__sp-variant" data-variant=${te.key}>
            <div class="settings-dialog__sp-cond">${te.condition}</div>
            ${Jn(te.label,te.system_prompt)}
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
        aria-expanded=${O?"true":"false"}
        @click=${G}
      >
        ${O?"\uC811\uAE30":"\uC804\uBB38 \uBCF4\uAE30"}
      </button>
      ${O?Re():""}
    </section>`}function je($,N,te,ne,le,Be,Ye){let et=le[$]??Qt,Ue=pa($,te,le,Q(),B(),Ye),ht=Ue.options.find(yt=>yt.value===et),Rt=et===Qt?Ue.full_value:ht?.full_value;return c`<select
        class=${et===Qt?"settings-dialog__unset":""}
        data-key=${$}
        aria-label=${N}
        title=${Rt||""}
        ?disabled=${Be===!0||Ue.disabled}
        .value=${ur(String(et))}
        @change=${yt=>ne($,String(yt.target.value))}
      >
        <option value=${Qt} ?selected=${et===Qt}>
          ${Ue.unset_label}
        </option>
        ${Ue.options.map(yt=>c`<option
              value=${yt.value}
              title=${yt.full_value||""}
              ?selected=${yt.value===et}
            >
              ${yt.label}
            </option>`)}
      </select>
      ${et===Qt?c`<span class="settings-dialog__source-badge">기본</span>`:""}`}function We($,N,te,ne,le,Be=!1,Ye){return c`<div
      class=${`settings-dialog__row${Be?" settings-dialog__row--off":""}`}
    >
      <span class="settings-dialog__row-label">${N}</span>
      <span class="settings-dialog__controls">
        ${je($,N,te,ne,le,Be,Ye)}
      </span>
    </div>`}function dt($,N,te,ne,le,Be){let Ye=Object.hasOwn(a,$),et=l[$]??i[$]??Qt;return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${N}</span>
      <span class="settings-dialog__controls">
        <input
          type="text"
          class=${`settings-dialog__text${Ye?" settings-dialog__text--invalid":""}`}
          data-key=${$}
          aria-label=${N}
          aria-invalid=${String(Ye)}
          placeholder=${te}
          .value=${ur(et)}
          @input=${Ue=>Ke($,String(Ue.target.value))}
          @change=${Ue=>L($,String(Ue.target.value).trim(),Be)}
        />
        ${et.length===0?c`<span class="settings-dialog__source-badge">기본</span>`:""}
        <span class="settings-dialog__hint" data-key-hint=${$}
          >${Ye?le:ne}</span
        >
      </span>
    </div>`}function $t($,N){let te=N?N.active:null;return fn(te)?`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(${$==="claude"?te.email:ao({...te,alias:null})})`:"\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(\uD655\uC778 \uBD88\uAC00)"}function It($,N,te){let ne=R[te],le=Object.hasOwn(g,$)?g[$]:Qt,Be=te==="claude"?Ai:ao,Ye=!!ne?.accounts.some(et=>et.key===le);return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${N}</span>
      <span class="settings-dialog__controls">
        <select
          aria-label=${N}
          data-account-key=${$}
          @change=${et=>Pe($,String(et.target.value))}
        >
          <option value=${Qt} ?selected=${le.length===0}>
            ${$t(te,ne)}
          </option>
          ${le.length>0&&!Ye?c`<option value=${le} selected>
                ${le} (목록에 없음)
              </option>`:""}
          ${ne?.accounts.map(et=>c`<option value=${et.key} ?selected=${et.key===le}>
                ${Be(et)}
              </option>`)||""}
        </select>
        ${ne?"":c`<span class="settings-dialog__hint"
              >계정 목록을 불러올 수 없습니다</span
            >`}
      </span>
    </div>`}function Tt(){let $=f.warnings.join(", ");return f.state==="unusable"?`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12\uC744 \uD574\uC11D\uD560 \uC218 \uC5C6\uC5B4 \uC774 \uB808\uD3EC\uC758 \uB514\uC2A4\uD328\uCE58\uAC00 \uAC70\uBD80\uB429\uB2C8\uB2E4 \u2014 ${$} \xB7 \uACC4\uC815\uC744 \uB2E4\uC2DC \uACE0\uB974\uBA74 \uD574\uC18C\uB429\uB2C8\uB2E4`:f.warnings.length>0?`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12\uC5D0 \uC54C \uC218 \uC5C6\uB294 \uD0A4\uAC00 \uC788\uC2B5\uB2C8\uB2E4 \u2014 ${$}`:null}function ft($,N,te,ne,le){return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">
        <i
          class="settings-dialog__stage-dot"
          style=${`background: var(--stage-${N}-on)`}
        ></i>
        ${$}
      </span>
      <span class="settings-dialog__controls">
        ${je(te,`${$} \uBAA8\uB378`,ne,Xe,i,!1)}
        ${je(le,`${$} effort`,Is,Xe,i,!1)}
      </span>
    </div>`}function ct($,N,te,ne){return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${N}</span>
      <span class="settings-dialog__controls">
        <button
          type="button"
          class=${`settings-dialog__toggle${ne?" is-on":""}`}
          data-automation=${$}
          aria-pressed=${ne?"true":"false"}
          aria-label=${N}
          @click=${()=>De($,!ne)}
        >
          ${ne?"\uCF1C\uC9D0":"\uAEBC\uC9D0"}
        </button>
        <span class="settings-dialog__hint">${te}</span>
      </span>
    </div>`}function xt($,N,te,ne){return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${N}</span>
      <span class="settings-dialog__controls">
        <span class="settings-dialog__stepper" data-stepper=${$}>
          <button
            type="button"
            aria-label=${`${N} \uAC10\uC18C`}
            @click=${()=>ne(te-1)}
          >
            −
          </button>
          <span class="settings-dialog__stepper-value">${te}</span>
          <button
            type="button"
            aria-label=${`${N} \uC99D\uAC00`}
            @click=${()=>ne(te+1)}
          >
            +
          </button>
        </span>
      </span>
    </div>`}function Ct($){return c`<div class="settings-dialog__preset-diff" data-preset-diff>
      <div class="settings-dialog__preset-diff-head">
        ${$.rows.length>0?`\uBCC0\uACBD ${$.rows.length}\uAC1C \xB7 \uC801\uC6A9\uD558\uBA74 \uC544\uB798\uC640 \uAC19\uC774 \uBC14\uB01D\uB2C8\uB2E4`:"\uD604\uC7AC \uC124\uC815\uACFC \uAC19\uC2B5\uB2C8\uB2E4 \u2014 \uC801\uC6A9\uD560 \uBCC0\uACBD\uC774 \uC5C6\uC2B5\uB2C8\uB2E4"}
      </div>
      ${$.rows.map(N=>c`<div
            class="settings-dialog__preset-diff-row"
            data-diff-kind=${N.kind}
          >
            <span class="settings-dialog__preset-diff-label">${N.label}</span>
            <span class="settings-dialog__preset-diff-value"
              >${N.before??"\uAE30\uBCF8"}</span
            >
            <span class="settings-dialog__preset-diff-arrow">→</span>
            <span
              class="settings-dialog__preset-diff-value settings-dialog__preset-diff-after"
              >${N.after??"\uAE30\uBCF8(\uD574\uC81C)"}</span
            >
          </div>`)}
      ${$.ignored_keys.length>0?c`<div class="settings-dialog__preset-diff-note">
            ${$.ignored_keys.join(", ")}은(는) 전역 적용이 쓰지 않는 키라
            무시됩니다
          </div>`:""}
    </div>`}function Mt(){let $=M(),N={};for(let te of Yn)N[te]=Object.prototype.hasOwnProperty.call(ee,te)?ee[te]:$&&typeof $[te]=="string"?$[te]:null;return N}function oe(){let $=B(),N=i.impl_runtime,te=i.impl_model,ne=re(),le=M(),Be=Mt(),Ye=So($,X),et=Qr($,void 0).filter(lt=>lt!==hn),Ue=da($,X,Be.orchestration_model||hn).filter(lt=>lt!==hn),ht=W?(ne?.presets||[]).find(lt=>lt.id===W):null,Rt=ht?Zc(Y(),fn(ht.settings)?ht.settings:{}):null,yt=le&&typeof le.slots=="number"?le.slots:Mi+1,tn=le&&typeof le.serial_lane_count=="number"?le.serial_lane_count:Mi,wt=Q()?.supported===!0,Ot=Tt(),jt=pa("workflow_mode",xo,i,Q(),$);return c`
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
      ${wt?"":c`<div
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
                .value=${ur(W)}
                @change=${lt=>{W=String(lt.target.value),J()}}
              >
                <option value="" ?selected=${W===""}>
                  실행 프리셋…
                </option>
                ${(ne?.presets||[]).map(lt=>c`<option
                      value=${lt.id}
                      ?selected=${lt.id===W}
                    >
                      ${lt.name}
                    </option>`)}
              </select>
              <button
                type="button"
                class="settings-dialog__btn settings-dialog__btn--primary"
                data-preset-apply-global
                ?disabled=${!Rt||Rt.rows.length===0}
                @click=${Je}
              >
                적용
              </button>
              <input
                type="text"
                class="settings-dialog__preset-name"
                placeholder=${W?"\uC774\uB984 (\uBE44\uC6B0\uBA74 \uC720\uC9C0)":"\uC0C8 \uD504\uB9AC\uC14B \uC774\uB984"}
                aria-label="프리셋 이름"
                .value=${ur(q)}
                @input=${lt=>{q=String(lt.target.value)}}
              />
              <button
                type="button"
                class="settings-dialog__btn"
                data-preset-save
                title=${W?"\uD604\uC7AC \uD654\uBA74\uC758 \uC2E4\uD589 \uC124\uC815\uC744 \uC774 \uD504\uB9AC\uC14B\uC5D0 \uC800\uC7A5\uD569\uB2C8\uB2E4 (\uD504\uB9AC\uC14B \u2192 \uC124\uC815 \uBC29\uD5A5\uC774 \uC544\uB2D8)":"\uD604\uC7AC \uD654\uBA74\uC758 \uC2E4\uD589 \uC124\uC815\uC744 \uC0C8 \uD504\uB9AC\uC14B\uC73C\uB85C \uC800\uC7A5\uD569\uB2C8\uB2E4"}
                @click=${j}
              >
                ${W?"\uD604\uC7AC \uC124\uC815\uC73C\uB85C \uB36E\uC5B4\uC4F0\uAE30":"\uC0C8 \uD504\uB9AC\uC14B \uC800\uC7A5"}
              </button>
              <button
                type="button"
                class="settings-dialog__btn"
                data-preset-delete
                ?disabled=${W.length===0}
                @click=${Ne}
              >
                삭제
              </button>
            </div>
            ${Rt?Ct(Rt):""}

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">오케스트레이션</div>
              <div class="settings-dialog__row">
                <span class="settings-dialog__row-label">런타임</span>
                <span class="settings-dialog__controls">
                  <select
                    aria-label="런타임"
                    data-key="orchestration_runtime_filter"
                    .value=${ur(X||Qt)}
                    @change=${lt=>{let Ht=String(lt.target.value);Fe(Ht===Qt?null:Ht)}}
                  >
                    <option value=${Qt} ?selected=${!X}>
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
              ${We("orchestration_model","\uBAA8\uB378",Ye,de,Be)}
              ${We("orchestration_effort","effort",Ue,de,Be)}
              ${We("orchestration_speed","\uC18D\uB3C4",$o,de,Be)}
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
                      @click=${()=>Xe("workflow_mode",Qt)}
                    >
                      ${jt.unset_label}
                    </button>
                    ${i.workflow_mode?"":c`<span class="settings-dialog__source-badge"
                          >기본</span
                        >`}
                    ${xo.map(lt=>c`<button
                          type="button"
                          data-mode=${lt}
                          aria-pressed=${String(i.workflow_mode===lt)}
                          @click=${()=>Xe("workflow_mode",lt)}
                        >
                          ${lt}
                        </button>`)}
                  </span>
                </span>
              </div>
              ${dt("bdui_url","beads-ui \uC8FC\uC18C","http://\uD638\uC2A4\uD2B8:3000","\uC138\uC158\uC774 Worker \uB808\uC778 \uBC30\uCE58\uB97C \uBB3C\uC5B4\uBCFC \uB54C \uC4F0\uB294 \uC8FC\uC18C\uC785\uB2C8\uB2E4","http:// \uB610\uB294 https:// \uB85C \uC2DC\uC791\uD558\uB294 \uC8FC\uC18C\uB9CC \uC800\uC7A5\uB429\uB2C8\uB2E4 (\uACBD\uB85C \uC5C6\uC774)",Kc)}
            </div>

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">
                리뷰 게이트
                <span class="settings-dialog__hint">모델 · effort</span>
              </div>
              ${ft("\uC0AC\uC591 \uB9AC\uBDF0","spec","spec_review_model",Ao,"spec_review_effort")}
              ${ft("\uACC4\uD68D \uB9AC\uBDF0","plan","plan_review_model",Ls,"plan_review_effort")}
              ${ft("\uAD6C\uD604 \uB9AC\uBDF0","impl","impl_review_model",Ao,"impl_review_effort")}
            </div>

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">
                구현
                <span class="settings-dialog__hint"
                  >이슈 핀이 있으면 핀이 우선합니다</span
                >
              </div>
              ${We("impl_runtime","\uC704\uC784 \uB300\uC0C1",Os,Xe,i)}
              ${We("impl_model","\uBAA8\uB378",Qr($,N),Xe,i)}
              ${We("impl_effort","effort",Zr($,N,te),Xe,i)}
              ${We("impl_speed","\uC18D\uB3C4",$o,Xe,i)}
              ${We("quick_fix_impl_model","quick_fix \uAD6C\uD604 \uBAA8\uB378",et,Xe,i,!1,{...i,...Be})}
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
              ${xt("slots","\uB3D9\uC2DC \uC2E4\uD589",yt,lt=>He(lt))}
              ${xt("serial-lane-count","\uC9C1\uB82C \uB808\uC778",tn,lt=>Ze(lt))}
            </div>
            ${Ie()}
          `}
    `}function J(){ue||rt(oe(),e)}return{load(){ee={},l={},a={};let $=[Ae(),Z()];return z||$.push(ge()),Promise.all($).then(()=>{})},render:J,sessionDraft:()=>({...i}),destroy(){ue=!0,rt(c``,e)}}}function Di(e){return c`<svg
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
  </svg>`}function wp(){return Di(go`<path d="M5.5 3.6 12 8l-6.5 4.4z" />`)}function kp(){return Di(go`<path d="M6 3.8v8.4M10 3.8v8.4" />`)}function $p(){return Di(go`<path
      d="M4.6 5.6v4.8M4.6 8.2h2.2A3.2 3.2 0 0 0 10 5"
    />
    <circle cx="4.6" cy="4" r="1.5" />
    <circle cx="4.6" cy="12" r="1.5" />
    <circle cx="11.4" cy="4" r="1.5" />`)}function xp(){return Di(go`<circle cx="8" cy="8" r="2.1" />
    <path
      d="M8 1.9v1.8M8 12.3v1.8M1.9 8h1.8M12.3 8h1.8M3.7 3.7l1.3 1.3M11 11l1.3 1.3M12.3 3.7 11 5M5 11l-1.3 1.3"
    />`)}function Ap(e){return`${e} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}function Sp(e){let t=(Array.isArray(e)?e:[]).map(l=>l&&l.usage).filter(l=>l&&typeof l=="object"&&"providers"in l);if(t.length>0)return en(Cs(t));let n={};for(let l of Dn)n[l]=0;let r=!1,o=0,s=0,i=0;for(let l of Array.isArray(e)?e:[]){let a=l&&l.usage;if(a&&typeof a=="object"){let u=!1;for(let d of Dn){let f=a[d];typeof f=="number"&&Number.isFinite(f)&&(n[d]+=f,r=!0,u=!0)}if(u){s+=1;let d=a.total_cost_usd;typeof d=="number"&&Number.isFinite(d)&&(o+=d,i+=1)}}}return s>0&&i===s&&(n.total_cost_usd=o),r?Hn(n):null}function Rn(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function bl(e,t){let n=Rn(e?.counts)?e.counts:null,r=n?n[t]:null;return typeof r=="number"&&Number.isFinite(r)?r:0}function gy(e,t){if(!Rn(t))return e;let n={...e};for(let[r,o]of Object.entries(t))o!==void 0&&(n[r]=o);return n}function hy(e){if(!Rn(e)||!Rn(e.execution_defaults)||!Rn(e.runner_catalog)||!Rn(e.session_defaults))return null;let t={...e.session_defaults};for(let i of["orchestration_model","orchestration_effort","orchestration_speed"])typeof e[i]=="string"&&e[i].length>0&&(t[i]=e[i]);let n=mn({global:t,execution_defaults:e.execution_defaults,runner_catalog:e.runner_catalog}),r=xn(e.runner_catalog,n.orchestration_model.value??""),o=Jr(n,e.runner_catalog),s=$r(n,r);return o===null&&s===null?null:{orchestration:o,worker:s}}function Ep(e,t){let n=t.notify||(E=>ke(E,"error",4e3)),r=document.createElement("div");r.className="mon2-deck__main",e.appendChild(r);let o=document.createElement("div");o.className="mon2-deck__panel",o.hidden=!0;let s=document.createElement("div");s.className="mon2-deck__panel-hd";let i=document.createElement("span");i.className="mon2-deck__panel-title";let l=document.createElement("button");l.type="button",l.className="mon2-deck__panel-close",l.setAttribute("aria-label","\uC2E4\uD589 \uC124\uC815 \uB2EB\uAE30"),l.textContent="\u2715",s.append(i,l);let a=document.createElement("div");a.className="mon2-deck__panel-body",o.append(s,a),e.appendChild(o);let u=null,d=null,f=null,g=new Map;function m(){let E=t.workspacesState?t.workspacesState():[];return Array.isArray(E)?E.filter(Z=>Rn(Z)):[]}function k(E){return m().find(Z=>Z.root_dir===E)||null}function R(E){return gy(k(E),g.get(E))}function z(){for(let E of m()){let Z=g.get(E.root_dir);Z&&typeof Z.revision=="number"&&typeof E.revision=="number"&&E.revision>=Z.revision&&g.delete(E.root_dir)}}async function X(E,Z,Ce){let ge=t.transport,Te=R(Z);if(!(!ge||!Rn(Te))){try{let be=await ge(E,{...Ce,root_dir:Z,expected_revision:Te.revision});if(Rn(be?.queue)&&g.set(Z,be.queue),be&&be.conflict){let Pe=Rn(be.queue)&&typeof be.queue.revision=="number"?be.queue.revision:R(Z)?.revision;be=await ge(E,{...Ce,root_dir:Z,expected_revision:Pe}),Rn(be?.queue)&&g.set(Z,be.queue)}}catch(be){n(`\uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${be instanceof Error?be.message:String(be)}`)}P()}}function ee(E){u!==E&&(u=E,t.onFocusChange?.(u),P())}function W(E){ee(u===E?null:E)}function q(E){if(d===E){I();return}O(),d=E;let Z=k(E);i.textContent=`${Z?.name||E} \uC2E4\uD589 \uC124\uC815 \xB7 Worker \uD0ED \u2699 \uC2E4\uD589 \uD0ED\uACFC \uAC19\uC740 \uC800\uC7A5\uC18C`,o.hidden=!1,f=Pi(a,{root_dir:E,queue:()=>R(E),transport:t.transport,implPresetStore:t.implPresetStore,notify:n,onQueueAdopt:Ce=>{g.set(E,Ce),P()}}),f.load(),P()}function O(){f?.destroy(),f=null}function I(E){O(),d=null,o.hidden=!0,i.textContent="",E!==!0&&P()}let F=()=>I();l.addEventListener("click",F);function U(E){E.key==="Escape"&&u!==null&&ee(null)}document.addEventListener("keydown",U);function ue(E,Z){let Ce=Math.max(Z,E,1);return c`<span
      class="mon2-deck__rail"
      role="img"
      aria-label=${`\uC2AC\uB86F ${Z}\uAC1C \uC911 ${E}\uAC1C \uC2E4\uD589 \uC911`}
    >
      ${Array.from({length:Ce},(ge,Te)=>Te<E?c`<i class="mon2-deck__slot is-run"></i>`:c`<i class="mon2-deck__slot"></i>`)}
    </span>`}function M(E){let Z=E.auto_advance===!0,Ce=E.auto_merge===!0;return c`<button
        type="button"
        class=${`mon2-deck__op mon2-deck__auto${Z?" is-on":""}`}
        data-act="auto"
        aria-pressed=${Z?"true":"false"}
        aria-label=${`${E.name} \uC790\uB3D9\uD654`}
        title=${Z?"\uC790\uB3D9\uD654 \uCF1C\uC9D0 \u2014 \uC2AC\uB86F\uC774 \uBE44\uBA74 \uB2E4\uC74C \uD589\uC774 \uCD9C\uBC1C\uD569\uB2C8\uB2E4":"\uC790\uB3D9\uD654 \uAEBC\uC9D0 \u2014 \uB2E4\uC74C \uD589\uC740 \uC218\uB3D9\uC73C\uB85C\uB9CC \uCD9C\uBC1C\uD569\uB2C8\uB2E4"}
      >
        ${Z?kp():wp()}
      </button>
      <button
        type="button"
        class=${`mon2-deck__op mon2-deck__merge${Ce?" is-on":""}`}
        data-act="merge"
        aria-pressed=${Ce?"true":"false"}
        aria-label=${`${E.name} \uC790\uB3D9 \uBA38\uC9C0`}
        title=${Ce?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0"}
      >
        ${$p()}
      </button>
      <button
        type="button"
        class=${`mon2-deck__op mon2-deck__gear${d===E.root_dir?" is-on":""}`}
        data-act="gear"
        aria-expanded=${d===E.root_dir?"true":"false"}
        aria-label=${`${E.name} \uC2E4\uD589 \uC124\uC815`}
        title="이 레포의 실행 설정"
      >
        ${xp()}
      </button>`}function B(E){let Z=hy(E);return Z?c`<div class="mon2-deck__chips">
      ${Z.orchestration?c`<span class="mon2-deck__chip" title=${Z.orchestration.title}
            >오케 ${Z.orchestration.text}</span
          >`:""}
      ${Z.worker?c`<span class="mon2-deck__chip" title=${Z.worker.title}
            >워커 ${Z.worker.text}</span
          >`:""}
    </div>`:""}function Q(E){let Z=[];for(let[Ce,ge]of[["queue","\uB300\uAE30"],["pr_wait","PR"],["session_active","\uC138\uC158"]]){let Te=bl(E,Ce);Te>0&&Z.push(`${ge} ${Te}`)}return Z.join(" \xB7 ")}function re(E){let Z=bl(E,"running"),Ce=typeof E.slots=="number"?E.slots:1;return c`<div
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
          title=${`\uC2AC\uB86F ${Ce}\uAC1C \uC911 ${Z}\uAC1C \uC2E4\uD589 \uC911`}
        >
          <span class="mon2-deck__load-n">${Z}/${Ce}</span>
          ${ue(Z,Ce)}
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
        <div class="mon2-deck__ops">${M(E)}</div>
        <span class="mon2-deck__counts">${Q(E)}</span>
        ${B(E)}
      </div>
    </div>`}function Ee(E){let Z=t.doneItems?t.doneItems():[],Ce=t.rangeLabel?t.rangeLabel():"",ge=Sp(Array.isArray(Z)?Z:[]),Te=be=>E.reduce((Pe,Xe)=>Pe+bl(Xe,be),0);return c`<div class="mon2-deck__bar">
      <span
        class="mon2-deck__total-counts"
        title=${`visible \uB808\uD3EC ${E.length}\uACF3\uC758 \uD569\uACC4\uC785\uB2C8\uB2E4 \u2014 \uC2E4\uD589\xB7\uB300\uAE30\xB7PR\uC740 \uC9C0\uAE08, \uC644\uB8CC\uB294 ${Ce}`}
        >실행 ${Te("running")} · 대기 ${Te("queue")} · PR
        ${Te("pr_wait")}${Te("session_active")>0?` \xB7 \uC138\uC158 ${Te("session_active")}`:""}
        · ${Ce} 완료
        ${Array.isArray(Z)?Z.length:0}</span
      >
      ${ge===null?"":c`<span class="mon2-deck__total-tokens">
            ${typeof ge=="string"?c`<span
                  class="mon2-deck__tok"
                  title=${Ap(Ce)}
                  >${ge}</span
                >`:ge.map(be=>c`<span
                      class="mon2-deck__tok"
                      data-provider=${be.provider}
                      title=${be.tooltip}
                      >${be.label}</span
                    >`)}
          </span>`}
    </div>`}function he(){let E=m();return E.length===0?"":c`${Ee(E)}
      <div class="mon2-deck__strip">
        ${E.map(Z=>re(Z))}
      </div>`}function pe(){u!==null&&!k(u)&&(u=null,t.onFocusChange?.(null))}function P(){z(),pe(),d!==null&&!k(d)&&I(!0),rt(he(),r),f?.render()}function Ae(E){let Z=E.target;if(!Z||typeof Z.closest!="function")return;let Ce=Z.closest("[data-root-dir]");if(!Ce)return;let ge=Ce.getAttribute("data-root-dir")||"",Te=Z.closest("[data-act]")?.getAttribute("data-act");if(Te==="worker"){t.gotoWorkerTab?.(ge);return}if(Te==="auto"){X("worker-automation-toggle",ge,{on:R(ge)?.auto_advance!==!0});return}if(Te==="merge"){X("worker-merge-auto-toggle",ge,{on:R(ge)?.auto_merge!==!0});return}if(Te==="gear"){q(ge);return}W(ge)}function Se(E){if(E.key!=="Enter"&&E.key!==" ")return;let Z=E.target;if(!Z||typeof Z.closest!="function")return;let Ce=Z.closest('[data-root-dir][role="button"]');!Ce||Ce!==Z||(E.preventDefault(),W(Ce.getAttribute("data-root-dir")||""))}return r.addEventListener("click",Ae),r.addEventListener("keydown",Se),{render:P,focusRoot:()=>u,panelRoot:()=>d,destroy(){document.removeEventListener("keydown",U),r.removeEventListener("click",Ae),r.removeEventListener("keydown",Se),l.removeEventListener("click",F),O(),rt(c``,r),e.replaceChildren()}}}var by=1e4,Op="bdui.monitor.done-range",Lp="bdui.monitor.running_sort",Ip="bdui.monitor.candidate_sort",Mp="beads-ui.monitor.candidate-filter",Pp="beads-ui.monitor.sections";function yy(){try{let e=window.localStorage.getItem(Mp);if(!e)return{...no};let t=JSON.parse(e);return!t||typeof t!="object"?{...no}:{show_blocked:typeof t.show_blocked=="boolean"?t.show_blocked:no.show_blocked,spec:La.some(n=>n.value===t.spec)?t.spec:"all"}}catch{return{...no}}}function Tp(e){try{window.localStorage.setItem(Mp,JSON.stringify({show_blocked:e.show_blocked,spec:e.spec}))}catch{}}function vy(){try{let e=window.localStorage.getItem(Ip);return Mo.some(t=>t.value===e)?e:"repo_spec"}catch{return"repo_spec"}}function wy(e){try{window.localStorage.setItem(Ip,e)}catch{}}function ky(){try{let e=window.localStorage.getItem(Pp);if(!e)return{};let t=JSON.parse(e);return t&&typeof t=="object"?t:{}}catch{return{}}}function $y(e){try{window.localStorage.setItem(Pp,JSON.stringify(e))}catch{}}function xy(){try{let e=window.localStorage.getItem(Op);return e===null?"today":Mn(e)}catch{return"today"}}function Ay(e){try{window.localStorage.setItem(Op,e)}catch{}}function Sy(){try{return window.localStorage.getItem(Lp)==="repo"?"repo":"started"}catch{return"started"}}function Ey(e){try{window.localStorage.setItem(Lp,e)}catch{}}var Dp="tab:monitor:pipeline",Ty=1e3,Cp=[{lane:"runnable",pane:"candidate",title:"\uD6C4\uBCF4",empty:"\uC2E4\uD589 \uC790\uACA9\uC744 \uAC16\uCD98 \uC774\uC288 \uC5C6\uC74C"},{lane:"queue",pane:"queue",title:"\uB300\uAE30",empty:"\uD45C\uC2DC\uD560 \uB808\uD3EC \uC5C6\uC74C"},{lane:"running",pane:"running",title:"\uC2E4\uD589 \uC911",empty:"\uC2E4\uD589 \uC911 \uC5C6\uC74C"},{lane:"pr_wait",pane:"pr_wait",title:"PR \uB300\uAE30",empty:"PR \uC5C6\uC74C"},{lane:"done",pane:"done",title:"\uC644\uB8CC",empty:"\uC644\uB8CC \uAE30\uB85D \uC5C6\uC74C"}],Cy=["queue","runnable","done"],Rp="\u2460\u2461\u2462\u2463\u2464\u2465\u2466\u2467\u2468\u2469\u246A\u246B\u246C\u246D\u246E\u246F\u2470\u2471\u2472\u2473";function Ry(e){return e>=1&&e<=Rp.length?Rp[e-1]:`(${e})`}function Np(e,t){let n=Lt("views:monitor"),r=t.gotoIssue,o=t.pipelineStore,s=t.transport,i=t.getWorkspacePath,l=t.openDoc,a=t.switchWorkspace,u=t.router,d=t.now||(()=>Date.now()),f=t.confirm||(b=>typeof globalThis.confirm!="function"||globalThis.confirm(b)),g=xy(),m=Sy(),k=yy(),R=vy(),z=ky(),X=Ci("beads-ui.monitor.lane-collapsed"),ee=!1,W=null,q=null,O=null,I=null,F=Yr(()=>le()),U=null,ue=null,M=null,B=null;function Q(b){return B===null&&(B=L()),Hu(b,B)}function re(b,p){Ee(),!(p<=0)&&(ue={lane_id:b,corrected:p},M=setTimeout(()=>{M=null,ue=null,le()},by))}function Ee(){M!==null&&(clearTimeout(M),M=null),ue=null}function he(){let b=Mr.find(p=>p.value===g);return b?b.label:""}let pe=document.createElement("div");pe.className="mon",e.appendChild(pe);let P=document.createElement("div");P.className="worker-drawer-overlay",P.hidden=!0;let Ae=document.createElement("div");Ae.className="worker-drawer-overlay__backdrop";let Se=document.createElement("div");Se.className="worker-drawer-host mon2-drawer",P.append(Ae,Se),e.appendChild(P);let E=lr(null,null),Z=new Map,Ce=new Map,ge=null,Te=null,be=null,Pe=io(Se,{transport:s,sessionLogStore:t.sessionLogStore,onClose:()=>{q=null,P.hidden=!0,le()}}),Xe=Oi({transport:s,console_el:pe,getLanes:()=>E,getWorkspaces:()=>o&&o.get?o.get():null,getCrossLanes:wt,reproject:b=>({lanes:ne(b),raw_lanes:b}),onCorrection:re,showToast:ke,requestRender:()=>le(),adoptQueue:(b,p)=>{Ce.set(b,p)},onDragBegin:()=>{O=null},candidate_drop:!0}),{applyDrop:Ke,dropModel:L,runPlanned:se,sendQueueCas:ae}=Xe;async function me(b,p,_,S,K=!0){if(!s||!_)return null;let V=await s(b,{...p,root_dir:_,expected_revision:S});if(V&&V.conflict&&K){V.queue&&Ce.set(_,V.queue);let ie=V.queue&&typeof V.queue.revision=="number"?V.queue.revision:S;V=await s(b,{...p,root_dir:_,expected_revision:ie})}return V&&V.queue&&_&&Ce.set(_,V.queue),V}function we(b,p){let _=Ce.get(b),S=o&&o.get?o.get():null,K=(Array.isArray(S)?S:[]).find(ie=>ie?.root_dir===b);return(_||K)?.merge_queue?.find(ie=>ie.bead_id===p)?.continuation_action}async function de(b,p,_,S){let K=await me(b,p,_,S),V=Ce.get(_)?.revision??K?.queue?.revision??S;return zn(K,(ie,xe)=>me(b,{...p,continuation:ie,decision_token:xe},_,V,!1),{refresh:ie=>me(b,p,_,ie?.queue?.revision??Ce.get(_)?.revision??V,!1)})}async function Fe(b,p,_,S){let K=await zn({continuation_mismatch:S},(ie,xe)=>me("worker-merge-queue-add",{bead_id:p,continuation:ie,decision_token:xe},b,_,!1)),V=K?.queue?.merge_queue?.find(ie=>ie.bead_id===p)?.continuation_action;K?.applied!==!0&&V?.continuation===null&&V.mismatch&&await Fe(b,p,K.queue.revision,V.mismatch)}async function He(b,p,_){let S=await me("worker-discard",b,p,_);if(S&&S.discarded===!0){ke(zs(S),"success",5e3);return}if(S&&S.reason){ke(`\uD3D0\uAE30 \uC2E4\uD328: ${S.reason}`,"error");return}if(S&&S.accepted&&S.pending==="merged_revert"){ke("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success");return}if(S&&S.accepted){ke(`\uD3D0\uAE30 \uC9C4\uD589: ${S.phase||"\uBC31\uC5C5 \uC911"}`,"success");return}S&&!S.conflict&&ke("\uD3D0\uAE30 \uAC70\uBD80: unknown","error")}async function Ze(b,p,_){return!s||!_?null:await s(b,{...p,root_dir:_})}async function De(){let b=new Map;for(let p of E.pr_wait)b.has(p.root_dir)||b.set(p.root_dir,p.expected_revision);for(let[p,_]of b)await me("worker-merge-queue-add-all",{},p,_)}function Y(b){let p=z[b];return!!(p&&p.runnable===!0)}function j(b){let p={...z[b]||{}};p.runnable=!p.runnable,z={...z,[b]:p},$y(z),le()}function Ne(b){X.toggle(b),le()}function at(b){X.toggleArea(b),le()}function Je(b){let p=b.dependency_chips||null,_=b.overlap_chips||[],S=b.scope_state==="missing",K=b.armed_lane_chip;return!p&&_.length===0&&!S&&!K?null:{...p||{},..._.length>0?{overlaps:_}:{},...S?{scope_missing:!0}:{},...K?{armed_lane:K}:{}}}function v(b){return Qs(b,p=>F.isOpen({bead_id:b.id,chip_key:p}))}function G(b){let p=Je(b),_=v(b);return p||_?{...b,...p?{dependency_chips:p}:{},..._?{chip_popover:_}:{}}:b}function Re(b){let p=Y(b.root_dir);return c`<header class="mon2-sec__hd">
      <button
        type="button"
        class="mon2-sec__toggle"
        data-root-dir=${b.root_dir}
        data-section="runnable"
        aria-expanded=${p?"false":"true"}
        aria-label=${`${b.name} \uC139\uC158 ${p?"\uD3BC\uCE58\uAE30":"\uC811\uAE30"}`}
      >
        ${p?"\u25B8":"\u25BE"}
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
    </header>`}function Ie(b,p){return c`<div
      class="mon2-item"
      data-bead-id=${b.id}
      data-drag-kind="candidate"
      data-root-dir=${b.root_dir}
    >
      ${p}
    </div>`}function je(b){if(O!==b.id)return null;let p=E.queue_groups.find(V=>V.root_dir===b.root_dir),_=b.place_lanes||[],S=E.cross_lanes_revision!==null,K=[{id:"parallel",label:"\uBCD1\uB82C",count:b.place_index??0}];for(let V of E.chain_lanes)K.push({id:`lane:${V.lane_id}`,label:`\uC5F0\uACB0 ${V.number} (${V.draft?"draft":"\uD655\uC815"}) \uB05D\uC5D0`,count:V.rows.length,group:"\uC5F0\uACB0 \uB808\uC778",disabled:!S});K.push({id:"new-lane",label:"+ \uC0C8 \uC5F0\uACB0 \uB808\uC778",group:"\uC5F0\uACB0 \uB808\uC778",disabled:!S,title:S?"\uC774 \uC774\uC288\uB9CC \uB4E0 draft \uB808\uC778\uC744 \uB9CC\uB4ED\uB2C8\uB2E4":"\uC5F0\uACB0 \uB808\uC778 \uC800\uC7A5\uC18C\uB97C \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"});for(let V of _)K.push({id:`serial:${V.id}`,label:`\uC9C1\uB82C ${Number(V.id.slice(1))}`,count:V.length,group:`${p?p.name:""} \uC9C1\uB82C`});return{bead_id:b.id,lanes:K}}function We(b){return Ie(b,c`${Sa(G(b),je(b),{exec_chips_mode:"pinned_only",onOpenDoc:l?(p,_)=>l(_,b.root_dir):void 0})}`)}function dt(){return E.runnable_flat?c`<div class="mon2-flat" data-drop="candidate">
        ${E.runnable.map(b=>We(b))}
      </div>`:c`${E.runnable_sections.map(b=>{let p=Y(b.root_dir);return c`<section
        class="mon2-sec${p?" is-collapsed":""}"
        data-root-dir=${b.root_dir}
        data-section="runnable"
      >
        ${Re({root_dir:b.root_dir,name:b.name,count:b.items.length})}
        ${p?"":c`<div
              class="mon2-sec__body"
              data-lane="candidate"
              data-drop="candidate"
            >
              ${b.items.map(_=>We(_))}
            </div>`}
      </section>`})}`}function $t(b,p=!1){return c`<span class="worker-mini__rowops">
      ${p?c`<button
              type="button"
              class="worker-mini__rowops-up"
              data-bead-id=${b.id}
              title="같은 레포 안에서 한 칸 위로"
              aria-label="한 칸 위로"
            >
              ↑
            </button>
            <button
              type="button"
              class="worker-mini__rowops-down"
              data-bead-id=${b.id}
              title="같은 레포 안에서 한 칸 아래로"
              aria-label="한 칸 아래로"
            >
              ↓
            </button>
            <button
              type="button"
              class="worker-mini__rowops-remove"
              data-bead-id=${b.id}
              title="대기에서 빼기"
              aria-label="대기에서 빼기"
            >
              ✕
            </button>`:""}
    </span>`}function It(b,p){return c`<div
      class="mon2-item"
      data-bead-id=${b.id}
      data-drag-kind="parallel"
      data-root-dir=${b.root_dir}
      data-row-index=${p}
      data-queue-index=${String(b.queue_index??0)}
    >
      ${An(G(b),{actions:$t(b,!0)})}
    </div>`}function Tt(b,p,_,S){return c`<div
      class="mon2-crow${p.fixed?" mon2-crow--fixed":""}"
      draggable=${p.draggable?"true":"false"}
      data-bead-id=${p.id}
      data-drag-kind="chain"
      data-root-dir=${p.root_dir}
      data-lane-id=${b.lane_id}
      data-row-index=${_}
      data-queue-index=${typeof p.queue_index=="number"?String(p.queue_index):""}
    >
      <span class="mon2-crow__seq" aria-hidden="true"
        >${Ry(p.seq)}</span
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
    </div>`}function ft(b){let p=E.cross_lanes_revision!==null,_=Q(b.lane_id),S=_?.held===!0,K=_?.cycle===!0,V=_?_.mismatched:[],ie=ue&&ue.lane_id===b.lane_id?ue.corrected:0;return c`<div class="mon2-clane" data-lane-id=${b.lane_id}>
      <header class="mon2-clane__hd">
        <span class="mon2-clane__name">${b.label}</span>
        <span class="mon2-clane__count">${b.rows.length}</span>
        <span class="mon2-clane__badge mon2-clane__badge--${b.state}"
          >${b.badge}</span
        >
        ${ie>0?c`<span
              class="mon2-clane__corrected"
              title="기존 blocks 의존이 드롭 순서를 이깁니다 — 그 순서로 다시 놓았습니다"
              >의존에 맞춰 ${ie}건 자동 교정</span
            >`:""}
        ${K?c`<span
              class="mon2-clane__cycle"
              title="멤버들의 blocks 의존이 순환합니다 — 어느 순서도 의존을 만족시키지 못합니다"
              >⛔ 의존 사이클 — 자동 교정 불가</span
            >`:""}
        ${S?c`<span
              class="mon2-clane__hold"
              title="멤버 한 명의 의존 자료가 이 스냅샷에 아직 없습니다 — 다음 스냅샷이 채우면 교정합니다"
              >${ai}</span
            >`:""}
        ${b.draft?c`<button
              type="button"
              class="mon2-clane__confirm"
              data-lane-id=${b.lane_id}
              ?disabled=${!p||!b.can_confirm||S}
              title=${S?ai:b.can_confirm?"\uC778\uC811 \uC758\uC874\uC744 \uAC78\uACE0 \uBBF8\uC801\uC7AC \uBA64\uBC84\uB97C \uAC01\uC790 \uB808\uD3EC \uBCD1\uB82C \uD050 \uB05D\uC5D0 \uC62C\uB9BD\uB2C8\uB2E4":"\uBA64\uBC84\uAC00 2\uAC1C \uC774\uC0C1\uC774\uC5B4\uC57C \uD655\uC815\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4"}
            >
              확정
            </button>`:""}
        ${b.run_label!==null?c`<button
              type="button"
              class="mon2-clane__run"
              data-lane-id=${b.lane_id}
              ?disabled=${!p}
              title="이 레인 멤버만 발차합니다 — 레포 자동 진행은 켜지 않습니다"
            >
              ${b.run_label}
            </button>`:""}
        ${b.state==="confirmed"&&b.has_mismatch?c`<button
              type="button"
              class="mon2-clane__reapply"
              data-lane-id=${b.lane_id}
              ?disabled=${!p}
              title="빠진 인접 의존을 다시 걸고 미적재 멤버를 다시 올립니다"
            >
              재적용
            </button>`:""}
        ${b.can_stop?c`<button
              type="button"
              class="mon2-clane__stop"
              data-lane-id=${b.lane_id}
              ?disabled=${!p}
              title="남은 멤버의 발차만 멈춥니다 — 도는 세션과 머지 큐 항목은 끝까지 갑니다"
            >
              ⏸ 정지
            </button>`:""}
        <button
          type="button"
          class="mon2-clane__remove"
          data-lane-id=${b.lane_id}
          ?disabled=${!p}
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
            </div>`:b.rows.map((xe,Ve)=>Tt(b,xe,Ve,V))}
      </div>
    </div>`}function ct(b,p,_){return c`<div
      class="mon2-item"
      data-bead-id=${p.id}
      data-drag-kind="repo-serial"
      data-root-dir=${p.root_dir}
      data-lane-id=${b.id}
      data-row-index=${_}
      data-queue-index=${String(p.queue_index??0)}
    >
      ${An(G(p),{actions:$t(p)})}
    </div>`}function xt(b){if(b.length===0)return"";let p=b.length-1;return`${b[0].id} \uC810\uC720${p>0?` +${p}`:""}`}function Ct(b){return c`<div
      class="mon2-item mon2-item--ghost"
      data-bead-id=${b.id}
    >
      ${An({id:b.id,title:b.title,lane:"running",draggable:!1,ghost:!0,badges:[b.badge]})}
    </div>`}function Mt(b,p){let _=p.occupants,S=p.cross_wait_peers||[];return{id:p.id,pane_id:"",title:`${b.name} \xB7 \uC9C1\uB82C ${p.index+1}`,rows:[..._.map(K=>Ct(K)),...p.items.map((K,V)=>ct(p,K,V))],count:p.items.length,empty:p.empty===!0,..._.length>0?{badge:c`<span
              class="mon2-lane__occupant"
              title=${_.map(K=>`${K.id} \u2014 ${K.badge}`).join(`
`)}
              >${xt(_)}</span
            >`,held:!0}:{},cycle:p.cycle,header_control:c`<button
        type="button"
        class="mon2-sec__worker"
        data-root-dir=${b.root_dir}
        title="이 레포의 Worker 탭으로 이동"
      >
        Worker ↗
      </button>`,...S.length>0?{after:c`${S.map(K=>c`<div class="mon2-lane__cross-wait">
                  ⚠ 상호 정지 — ${K.workspace_name}·${K.lane}과 교차 대기
                </div>`)}`}:{}}}function oe(){let b=E.cross_lanes_revision!==null,p=E.chain_lanes.some(_=>_.draft&&_.rows.length===0);return Js({parallel:{rows:E.parallel_rows.map((_,S)=>It(_,S)),count:E.parallel_rows.length,collapsed:X.isAreaCollapsed("parallel"),drop:{drop:"parallel"}},serial:{lanes:E.queue_groups.flatMap(_=>_.sublanes.serial.map(S=>({...Mt(_,S),drop:{drop:"repo-serial",root_dir:_.root_dir,lane_id:S.id,lane_length:String(S.raw_length)}}))),collapsed:X.isAreaCollapsed("serial"),extra_panes:E.chain_lanes.map(_=>ft(_)),header_control:c`<button
          type="button"
          class="mon2-newlane"
          ?disabled=${p||!b}
          title=${b?p?"\uBE48 \uC5F0\uACB0 \uB808\uC778\uC774 \uC774\uBBF8 \uC788\uC2B5\uB2C8\uB2E4":"\uBE48 \uC5F0\uACB0 \uB808\uC778\uC744 \uD558\uB098 \uB9CC\uB4ED\uB2C8\uB2E4":"\uC5F0\uACB0 \uB808\uC778 \uC800\uC7A5\uC18C\uB97C \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"}
        >
          + 연결 레인
        </button>`,...E.cross_lanes_unreadable?{notice:c`<div class="mon2-clane__unreadable">
                연결 레인 저장소를 읽을 수 없음
              </div>`}:{}}})}function J(b){return c`<div class="worker-rungrid">
      ${E.running.length===0?c`<div class="worker-rungrid__empty">실행 세션 없음</div>`:E.running.map(p=>hl({bead_id:p.id,attempt_id:p.attempt_id||"",title:p.title,runner:p.runner??null,model:p.model??null,effort:p.effort??null,speed:p.speed??null,started_at:p.started_at??null,kind:p.kind,...p.kind==="session"?{updated_at:p.updated_at,session_refs:p.session_refs||[]}:{},workflow:p.workflow||null,resumed_from:p.resumed_from??null,continuation_mode:p.continuation_mode??null,paused:p.run_state==="paused",failed:p.run_state==="failed",parked:p.run_state==="parked",retry_wait:p.run_state==="retry_wait",waiting:p.run_state==="waiting",wait:p.wait||null,retry:p.retry||null,status:p.status,status_label:p.run_state==="failed"?"\uC2E4\uD328":p.run_state==="parked"?"\uC138\uC158 \uB300\uAE30":p.run_state==="retry_wait"?"\uC7AC\uC2DC\uB3C4 \uB300\uAE30":p.run_state==="waiting"?"\uC120\uD589 \uB300\uAE30":void 0,can_pause:p.can_pause!==!1,exec_chips:p.exec_chips||null,usage:p.usage||null,chip_popover:v(p),discard:p.discard,failure:p.failure?{...p.failure,open:I===p.attempt_id}:null},b,q,{monitor:{repo:p.workspace_name,root_dir:p.root_dir,serial_lane_id:p.serial_lane_id,cross_lane_chip:p.cross_lane_chip||null,last_activity:p.last_activity||null,legs:p.legs||[],dependency_chips:Je(p)}}))}
    </div>`}function $(b){let p={runnable:E.runnable,queue:E.queue,running:E.running,pr_wait:E.pr_wait,done:E.done},_=S=>{let K=p[S.lane],V=S.lane==="runnable"?E.runnable_flat?K.length>0?dt():void 0:E.runnable_sections.length>0?dt():void 0:S.lane==="queue"?E.queue_groups.length>0||E.chain_lanes.length>0||E.parallel_rows.length>0||E.cross_lanes_unreadable?oe():void 0:S.lane==="running"?J(b):K.length>0?c`${K.map(ie=>An(G(ie)))}`:void 0;return Nn({id:`monitor-${S.lane}`,lane:S.pane,title:S.title,items:K,count:K.length,src:S.lane==="runnable",empty:S.empty,body:V,live:S.lane==="running"&&K.length>0,collapsible:!0,collapsed:X.isCollapsed(S.pane),controls:S.lane==="runnable"?N():void 0,header_control:te(S.lane,K.length)})};if(ee){let S=Cy.map(K=>Cp.find(V=>V.lane===K)).filter(K=>K!==void 0);return c`<div class="mon2-deck"></div>
        <div class="worker-lanes-host">
          <div class="worker-lanes worker-lanes--mobile mon2-lanes">
            ${ei({live:E.running.length>0,running_body:E.running.length>0?J(b):"",pr_wait_rows:E.pr_wait.map(K=>An(G(K))),count:E.running.length+E.pr_wait.length})}
            ${S.map(K=>_(K))}
          </div>
        </div>`}return c`<div class="mon2-deck"></div>
      <div class="worker-lanes-host">
        <div class="worker-lanes mon2-lanes">
          ${Cp.map(S=>_(S))}
        </div>
      </div>`}function N(){return c`<div class="worker-filter">
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
        ${La.map(b=>c`<button
              type="button"
              class="mon-filter__spec worker-filter__chip${k.spec===b.value?" is-active":""}"
              data-spec=${b.value}
              aria-pressed=${k.spec===b.value?"true":"false"}
            >
              ${b.label}
            </button>`)}
        ${E.runnable_hidden.spec>0?c`<span class="worker-filter__hidden"
              >숨김 ${E.runnable_hidden.spec}</span
            >`:""}
      </div>
    </div>`}function te(b,p){return b==="runnable"?c`<select
        class="mon-candidate-sort worker-sort"
        aria-label="후보 정렬"
        title="후보 정렬"
        .value=${R}
      >
        ${Mo.map(_=>c`<option
              value=${_.value}
              ?selected=${R===_.value}
            >
              ${_.label}
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
      </select>`:b==="pr_wait"&&p>0?c`<button
        type="button"
        class="mon-lane-op mon-merge-all"
        title="자격이 생기는 PR을 각 레포의 머지 큐에 한 번에 넣습니다"
      >
        일괄 머지
      </button>`:b==="done"?c`<select
        class="mon-done-range worker-sort"
        aria-label="완료 기간"
        title="완료 기간"
        .value=${g}
      >
        ${Mr.map(_=>c`<option value=${_.value} ?selected=${g===_.value}>
              ${_.label}
            </option>`)}
      </select>`:""}function ne(b){let p=o&&o.get?o.get():null,_=o&&o.getWorkspacesState?o.getWorkspacesState():[],S=b===void 0?o&&o.crossLanes?o.crossLanes():void 0:b,K={done_since:vr(g,d()),running_sort:m,candidate_filter:k,candidate_sort:R};return S!==void 0&&(K.cross_lanes=S),lr(p,_,K)}function le(){let b=d();E=ne(),B=null,Z=new Map;for(let p of[...E.runnable,...E.queue,...E.running,...E.pr_wait,...E.done])!p.non_occupying&&!Z.has(p.id)&&Z.set(p.id,p);rt($(b),pe),Ye()?.render(),Be(),et()}function Be(){let b=new Map;for(let p of E.queue_groups)b.set(p.root_dir,p.auto_advance);for(let p of Array.from(pe.querySelectorAll(".worker-wait__area--parallel .worker-mini__repo"))){let _=p.closest(".mon2-item")?.getAttribute("data-root-dir")||"",S=b.get(_);typeof S=="boolean"&&p.setAttribute("title",`${p.textContent||""} \xB7 ${S?"\uC790\uB3D9\uD654 \uCF1C\uC9D0":"\uC790\uB3D9\uD654 \uAEBC\uC9D0"}`)}}function Ye(){if(be)return be;let b=pe.querySelector(".mon2-deck");return b?(be=Ep(b,{workspacesState:()=>o&&o.getWorkspacesState?o.getWorkspacesState():[],doneItems:()=>E.done,rangeLabel:he,transport:s,implPresetStore:t.execPresetStore,gotoWorkerTab:ht,onFocusChange:p=>{U=p,et()}}),be):null}function et(){pe.classList.toggle("has-focus",U!==null);for(let b of Array.from(pe.querySelectorAll(".mon2-sec[data-root-dir]")))b.classList.toggle("is-focus",U!==null&&b.getAttribute("data-root-dir")===U);for(let b of Array.from(pe.querySelectorAll(".mon2-item[data-bead-id], .rtile[data-bead-id], .worker-mini[data-bead-id], .worker-card[data-bead-id]"))){let p=Z.get(b.getAttribute("data-bead-id")||"");b.classList.toggle("is-focus",U!==null&&!!p&&p.root_dir===U)}for(let b of Array.from(pe.querySelectorAll(".mon2-crow[data-root-dir]")))b.classList.toggle("is-focus",U!==null&&b.getAttribute("data-root-dir")===U)}function Ue(b,p){let _=i?i():void 0;if(!p||!_||p===_||!a){r(b);return}a(p).then(()=>{r(b)}).catch(S=>{n("workspace switch for %s failed: %o",p,S)})}function ht(b){if(!b)return;let p=i?i():void 0,_=()=>{try{u?.gotoView("worker")}catch(S){n("gotoView(worker) failed: %o",S)}};if(!a||p&&p===b){_();return}a(b).then(_).catch(S=>{n("workspace switch for %s failed: %o",b,S),ke("\uB808\uD3EC \uC804\uD658\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error")})}function Rt(b){on(b).then(p=>{ke(p?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",p?"success":"error",1400)})}function yt(b){let p=Z.get(b)||null;return{item:p,root_dir:p?p.root_dir:"",revision:p?p.expected_revision:0}}async function tn(b,p,_){if(b!=="dep-add")return;let S=E.chain_lanes.find(K=>K.rows.some(V=>V.id===p));!S||!S.rows.some(K=>K.id===_)||await se(K=>Qu(S.lane_id,K),"",[{type:b,a:p,b:_}])}function wt(){return(o&&o.crossLanes?o.crossLanes():null)??null}async function Ot(b,p){if(b==="run"){await lt(p);return}if(b==="stop"){await Ht(p);return}if(b==="create"){await se(_=>Na(null,_),"");return}if(b==="remove"){let _=Ju(p,L());if(_!==null&&!f(_))return;await se(S=>Zu(p,S),"");return}await se(_=>b==="confirm"?Vu(p,_):Xu(p,_),"")}function jt(b){let p=new Map;for(let _ of b.rows){let S=E.owner_of[_.id]||_.root_dir;typeof S!="string"||S.length===0||p.set(S,[...p.get(S)||[],_.id])}return p}async function lt(b){let p=E.chain_lanes.find(V=>V.lane_id===b);if(!p||E.cross_lanes_revision===null){le();return}Ee();let _=new Map,S=new Map,K=jt(p);for(let V of p.rows){if(!V.unplaced)continue;let ie=E.owner_of[V.id]||V.root_dir;if(typeof ie!="string"||ie.length===0){ke(`${V.id}\uC758 \uB808\uD3EC\uB97C \uC54C \uC218 \uC5C6\uC5B4 \uC801\uC7AC\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4`,"error"),le();return}let xe=S.get(ie)??0;if(await ae("worker-queue-place",{bead_id:V.id,lane:"parallel",index:(E.parallel_raw_length[ie]??0)+xe},ie,_,{bead_id:V.id})===null){le();return}S.set(ie,xe+1)}for(let[V,ie]of K)if(await ae("worker-queue-arm",{bead_ids:ie,lane_id:b},V,_,{bead_id:ie[0]})===null){ke("\uC77C\uBD80 \uB808\uD3EC\uC5D0\uC11C \uC9C4\uD589\uC744 \uCF1C\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 \u2014 [\u25B6 \uC774\uC5B4\uC11C \uC9C4\uD589]\uC73C\uB85C \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC138\uC694","error"),le();return}le()}async function Ht(b){let p=E.chain_lanes.find(S=>S.lane_id===b);if(!p||E.cross_lanes_revision===null){le();return}Ee();let _=new Map;for(let[S,K]of jt(p))if(await ae("worker-queue-disarm",{lane_id:b},S,_,{bead_id:K[0]})===null)break;le()}async function Gt(b,p){let{root_dir:_,revision:S}=yt(b);if(_.length===0){le();return}await ae("worker-queue-disarm",{bead_ids:[b],lane_id:p},_,new Map([[_,S]]),{bead_id:b}),le()}async function Bt(b,p){let _=Z.get(b);if(!_){le();return}let S={kind:"candidate",bead_id:b,root_dir:_.root_dir};if(p==="new-lane"){await se(K=>Na({bead_id:b,root_dir:_.root_dir},K),b);return}if(p.startsWith("lane:")){let K=p.slice(5);if(!E.chain_lanes.find(ie=>ie.lane_id===K)){le();return}await se(ie=>ci(S,{kind:"chain",lane_id:K,marker_index:(ie.cross_lanes.get(K)?.entries??[]).length},ie),b);return}if(p.startsWith("serial:")){let K=p.slice(7),V=(_.place_lanes||[]).find(ie=>ie.id===K);await Ke(S,{kind:"repo-serial",root_dir:_.root_dir,lane_id:K,index:V?V.index:0});return}await Ke(S,{kind:"parallel",marker_index:E.parallel_rows.length})}async function un(b,p){let _=E.parallel_rows,S=_.findIndex(ot=>ot.id===b);if(S<0)return;let K=_[S].root_dir,V=[];_.forEach((ot,bt)=>{ot.root_dir===K&&V.push(bt)});let ie=V.indexOf(S),xe=V[ie+p];if(typeof xe!="number")return;let Ve=p===-1?xe:V[ie+2]??Math.min(_.length,xe+1);await Ke({kind:"parallel",bead_id:b,root_dir:K,queue_index:_[S].queue_index??0},{kind:"parallel",marker_index:Ve})}async function Nt(b){for(let p of E.chain_lanes){let _=p.rows.find(S=>S.id===b);if(_){await Ke({kind:"chain",bead_id:b,root_dir:_.root_dir,lane_id:p.lane_id,...typeof _.queue_index=="number"?{queue_index:_.queue_index}:{}},{kind:"parallel",marker_index:E.parallel_rows.length});return}}}function Vt(b){return{runner:b.runner||void 0,model:b.model||void 0,effort:b.effort||void 0,status:b.run_state==="running"?"running":b.run_state,worktree:b.root_dir}}function Ut(b,p){let{item:_,root_dir:S,revision:K}=yt(p),V=_?.attempt_id||"",ie=b.classList;if(ie.contains("worker-mini__rowops-up")||ie.contains("worker-mini__rowops-down")){un(p,ie.contains("worker-mini__rowops-up")?-1:1);return}if(ie.contains("worker-mini__rowops-remove")){me("worker-queue-remove",{bead_id:p},S,K);return}if(ie.contains("mon2-crow__detach")){Nt(p);return}if(ie.contains("worker-dep__open")){Ue(b.getAttribute("data-dep-id")||"",b.getAttribute("data-root-dir")||"");return}if(ie.contains("mon2-arm__release")){Gt(p,b.getAttribute("data-lane-id")||"");return}if(ie.contains("mon-lane__chip")){let xe=b.getAttribute("data-lane-id")||"";pe.querySelector(`.mon2-clane[data-lane-id="${xe}"]`)?.scrollIntoView({block:"nearest"});return}if(ie.contains("judgement-chip")){let xe=b.getAttribute("data-chip-key")||"";xe&&F.toggle({bead_id:p,chip_key:xe});return}if(ie.contains("rtile__failure-badge")){I=I===V?null:V,le();return}if(ie.contains("rtile__attempt-copy")){let xe=b.getAttribute("data-attempt-id")||"";xe&&on(xe).then(Ve=>{ke(Ve?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",Ve?"success":"error",1400)});return}if(ie.contains("worker-card__place")){O=O===p?null:p,le();return}if(ie.contains("worker-card__place-cancel")){O=null,le();return}if(ie.contains("worker-card__place-lane")){let xe=b.getAttribute("data-lane")||"parallel";O=null,Bt(p,xe);return}if(ie.contains("rtile__session")){if(_&&_.kind==="session"){let xe=(_.session_refs||[]).find(Ve=>Ve&&Ve.current===!0);xe&&(P.hidden=!1,Pe.open(Hr(xe,p,"in_progress",S)),le());return}q=V,V&&_&&(P.hidden=!1,Pe.open({attempt_id:V,root_dir:S,meta:Vt(_)})),le();return}if(ie.contains("rtile__pause")){Ze("worker-attempt-pause",{attempt_id:V},S);return}if(ie.contains("rtile__resume")){zr().then(xe=>{if(xe!==null)return de("worker-attempt-resume",{attempt_id:V,...xe!==""?{instructions:xe}:{}},S,K)});return}if(ie.contains("rtile__parked-retry")){Ze("worker-parked-retry",{bead_id:p,attempt_id:V},S).then(xe=>{xe&&xe.ok===!1&&ke(`\uC7AC\uC2DC\uB3C4 \uAC70\uBD80: ${xe.reason==="not_latest"?"\uC774 bead\uC5D0 \uB354 \uC0C8\uB85C\uC6B4 \uC2DC\uB3C4\uAC00 \uC788\uC2B5\uB2C8\uB2E4":xe.reason||""}`,"error")});return}if(ie.contains("rtile__discard")){let xe=b.dataset.confirmation==="merged"?"merged":"unmerged";if(!f(Ro(p,xe)))return;He({bead_id:p,...V?{attempt_id:V}:{},...b.dataset.operationId?{operation_id:b.dataset.operationId}:{}},S,K);return}if(ie.contains("worker-mini__merge")){let xe=we(S,p);xe?.mismatch&&xe.continuation===null?Fe(S,p,K,xe.mismatch):me("worker-merge-queue-add",{bead_id:p},S,K);return}if(ie.contains("worker-mini__merge-cancel")){me("worker-merge-queue-remove",{bead_id:p},S,K);return}if(ie.contains("worker-mini__discard")){let xe=b.dataset.discardMode==="merged"?"merged":"unmerged";if(!f(Ro(p,xe)))return;He({bead_id:p,...b.dataset.attemptId?{attempt_id:b.dataset.attemptId}:{},...b.dataset.operationId?{operation_id:b.dataset.operationId}:{}},S,K);return}if(ie.contains("worker-mini__revise-fix")){de("worker-revise-fix",{bead_id:p},S,K);return}ie.contains("worker-mini__revise-approve")&&me("worker-revise-approve",{bead_id:p},S,K)}function Zt(b){let p=Xe.consumeClickSuppression(),_=b.target;if(!_||typeof _.closest!="function"||_.closest("dialog")||_.closest(".worker-drawer-overlay")||_.closest("a"))return;let S=_.closest(".worker-card__id, .worker-mini__id, .rtile__id");if(S){b.preventDefault();let Le=_.closest(".mon2-item, .rtile, .mon2-crow, .worker-mini")?.getAttribute("data-bead-id")||S.textContent?.trim()||"";Le&&Rt(Le);return}let K=_.closest(".worker-mini__repo, .worker-card__repo, .mon2-sec__worker");if(K){b.preventDefault();let A=K.getAttribute("data-root-dir")||Z.get(_.closest(".mon2-item, .rtile, .worker-mini")?.getAttribute("data-bead-id")||"")?.root_dir||K.getAttribute("title")||"";ht(A);return}let V=_.closest(".mon2-sec__toggle");if(V){b.preventDefault(),j(V.getAttribute("data-root-dir")||"");return}let ie=_.closest(".worker-pane__toggle[data-lane]");if(ie){b.preventDefault();let A=ie.getAttribute("data-lane")||"";(A==="candidate"||A==="queue"||A==="running"||A==="pr_wait"||A==="done")&&Ne(A);return}let xe=_.closest(".worker-wait__area-toggle[data-area]");if(xe){b.preventDefault(),at(xe.getAttribute("data-area")||"parallel");return}if(_.closest(".mon2-newlane")){b.preventDefault(),Ot("create","");return}let Ve=_.closest(".mon2-clane__confirm, .mon2-clane__reapply, .mon2-clane__remove, .mon2-clane__run, .mon2-clane__stop");if(Ve){b.preventDefault();let A=Ve.getAttribute("data-lane-id")||"",Le=Ve.classList;Ot(Le.contains("mon2-clane__confirm")?"confirm":Le.contains("mon2-clane__reapply")?"reapply":Le.contains("mon2-clane__run")?"run":Le.contains("mon2-clane__stop")?"stop":"remove",A);return}if(_.closest(".mon-merge-all")){b.preventDefault(),De();return}let ot=_.closest(".mon-filter__spec");if(ot){b.preventDefault(),k={...k,spec:ot.getAttribute("data-spec")||"all"},Tp(k),le();return}let bt=_.closest(".mon2-item, .rtile, .mon2-crow, .worker-mini, .worker-card");if(!bt)return;let _t=bt.getAttribute("data-bead-id")||"",x=_.closest("button");if(x){b.preventDefault(),Ut(x,_t);return}_.closest(".rtile__failure-pop, .chip-popover")||_t&&!p&&(b.preventDefault(),Ue(_t,bt.getAttribute("data-root-dir")||yt(_t).root_dir))}function _e(b){let p=b.target;if(!p||typeof p.closest!="function")return;let _=p.closest(".mon-filter__blocked");if(_){k={...k,show_blocked:_.checked},Tp(k),le();return}let S=p.closest(".mon-candidate-sort");if(S){R=Mo.some(ie=>ie.value===S.value)?S.value:"repo_spec",wy(R),le();return}let K=p.closest(".mon-running-sort");if(K){m=K.value==="repo"?"repo":"started",Ey(m),le();return}let V=p.closest(".mon-done-range");V&&(g=Mn(V.value),Ay(g),le())}function T(b){let p=b.target,_=p&&typeof p.closest=="function"?S=>p.closest(S):()=>null;I&&!_(".rtile__failure-pop, .rtile__failure-badge")&&(I=null,le())}function ye(b){b.key!=="Escape"||I===null||(I=null,le())}e.addEventListener("click",Zt),e.addEventListener("change",_e),document.addEventListener("click",T),document.addEventListener("keydown",ye),F.attach(),Xe.attach(e);{let b=!0;W=Ti(p=>{if(ee=p,b){b=!1;return}le()})}o&&typeof o.subscribe=="function"&&(ge=o.subscribe(()=>{try{Ce.clear(),le()}catch{}}));function fe(){Te!==null&&(clearInterval(Te),Te=null)}return{recorrectSharedLane:tn,load(){n("load"),le(),Te===null&&(Te=setInterval(()=>{try{le()}catch{}},Ty))},pause(){fe()},clear(){fe(),Xe.detach(),ge&&(ge(),ge=null),W&&(W(),W=null),Pe.destroy(),P.hidden=!0,be?.destroy(),be=null,e.removeEventListener("click",Zt),e.removeEventListener("change",_e),document.removeEventListener("click",T),document.removeEventListener("keydown",ye),F.detach(),e.replaceChildren()}}}function qp(e,t,n){let r=Lt("views:nav"),{global_element:o,repo_element:s}=e,i=null;function l(g){return m=>{m.preventDefault();let k=g==="monitor"&&a()==="monitor"?"worker":g;r("click tab %s",k),n.gotoView(k)}}function a(){let g=t.getState();return g.view==="worker"||g.view==="monitor"?g.view:"board"}function u(){let g=a();return c`
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
    `}function f(){o&&rt(u(),o),s&&rt(d(),s)}return f(),i=t.subscribe(()=>f()),{destroy(){i&&(i(),i=null),o&&rt(c``,o),s&&rt(c``,s)}}}var Fp=["bug","feature","task","epic","chore"];function jp(e){switch((e||"").toString().toLowerCase()){case"bug":return"Bug";case"feature":return"Feature";case"task":return"Task";case"epic":return"Epic";case"chore":return"Chore";default:return""}}var Bp=["Critical","High","Medium","Low","Backlog"];function Up(e,t){let n=document.createElement("dialog");n.id="new-issue-dialog",n.setAttribute("role","dialog"),n.setAttribute("aria-modal","true"),n.innerHTML=`
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
  `,e.appendChild(n);let r=n.querySelector("#new-issue-form"),o=n.querySelector("#new-title"),s=n.querySelector("#new-type"),i=n.querySelector("#new-priority"),l=n.querySelector("#new-labels"),a=n.querySelector("#new-description"),u=n.querySelector("#new-issue-error"),d=n.querySelector("#btn-cancel"),f=n.querySelector("#btn-create"),g=n.querySelector(".new-issue__close");function m(){s.replaceChildren();let O=document.createElement("option");O.value="",O.textContent="\u2014 Select \u2014",s.appendChild(O);for(let I of Fp){let F=document.createElement("option");F.value=I,F.textContent=jp(I),s.appendChild(F)}i.replaceChildren();for(let I=0;I<=4;I+=1){let F=document.createElement("option");F.value=String(I);let U=Bp[I]||"Medium";F.textContent=`${I} \u2013 ${U}`,i.appendChild(F)}}m();function k(){try{typeof n.close=="function"?n.close():n.removeAttribute("open")}catch{n.removeAttribute("open")}}function R(O){o.disabled=O,s.disabled=O,i.disabled=O,l.disabled=O,a.disabled=O,d.disabled=O,f.disabled=O,f.textContent=O?"Creating\u2026":"Create"}function z(){u.textContent=""}function X(O){u.textContent=O}function ee(){try{let O=window.localStorage.getItem("beads-ui.new.type");O?s.value=O:s.value="";let I=window.localStorage.getItem("beads-ui.new.priority");I&&/^\d$/.test(I)?i.value=I:i.value="2"}catch{s.value="",i.value="2"}}function W(){let O=s.value||"",I=i.value||"";O.length>0&&window.localStorage.setItem("beads-ui.new.type",O),I.length>0&&window.localStorage.setItem("beads-ui.new.priority",I)}async function q(){z();let O=String(o.value||"").trim();if(O.length===0){X("Title is required"),o.focus();return}let I=Number(i.value||"2");if(!(I>=0&&I<=4)){X("Priority must be 0..4"),i.focus();return}let F=String(s.value||""),U=String(a.value||""),ue={title:O};F.length>0&&(ue.type=F),String(I).length>0&&(ue.priority=I),U.length>0&&(ue.description=U),R(!0);try{await t("create-issue",ue)}catch{R(!1),X("Failed to create issue");return}W(),R(!1),k()}return n.addEventListener("cancel",O=>{O.preventDefault(),k()}),g.addEventListener("click",()=>k()),d.addEventListener("click",()=>k()),n.addEventListener("keydown",O=>{O.key==="Enter"&&(O.ctrlKey||O.metaKey)&&(O.preventDefault(),q())}),r.addEventListener("submit",O=>{O.preventDefault(),q()}),{open(){r.reset(),z(),ee();try{"showModal"in n&&typeof n.showModal=="function"?n.showModal():n.setAttribute("open","")}catch{n.setAttribute("open","")}setTimeout(()=>{try{o.focus()}catch{}},0)},close(){k()}}}var Oy=[["route","route \uCE69"],["fast_track","\u26A1 fast_track \uCE69"],["pr","PR \uCE69"],["from","\u21A9 from \uCE69"],["blocked","blocked\xB7\uC0AC\uC6A9\uC790 \uB9AC\uBDF0 \uD544\uC694 \uCE69"],["stepper","stepper"]];function Ly(e,t){return Ji(e,t)?"shown":t.hidden_labels.includes(e)?"hidden_exact":"hidden_prefix"}function Wp(e,t,n){return c`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">라벨 표시</div>
      <p class="settings-dialog__hint-block">
        라벨을 눌러 표시/숨김을 전환합니다. prefix 규칙으로 숨겨진 라벨을 누르면
        그 라벨만 예외로 다시 표시됩니다.
      </p>
      ${t.length===0?c`<div class="settings-dialog__empty">라벨 없음</div>`:c`<div class="settings-dialog__pills">
            ${t.map(r=>{let o=Ly(r,e);return c`<button
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
        ${Oy.map(([n,r])=>c`<label class="settings-dialog__toggle">
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
  `}var Iy=[{id:"execution",label:"\uC2E4\uD589",glyph:"\u25C6"},{id:"display",label:"\uD45C\uC2DC",glyph:"\u25EB"}];function Gp(e,t){let{transport:n,policyStore:r,labelOptions:o}=t,s=t.notify||(re=>ke(re,"error",4e3)),i=document.createElement("dialog");i.id="settings-dialog",i.className="settings-dialog",i.setAttribute("role","dialog"),i.setAttribute("aria-modal","true"),i.setAttribute("aria-label","\uC124\uC815"),e.appendChild(i);let l="execution",a=!1,u="",d=null;function f(){if(d)return d;let re=i.querySelector('[data-pane="execution"]');return re?(d=Pi(re,{root_dir:null,queue:()=>t.queueStore?.get()??null,transport:n,implPresetStore:t.implPresetStore,notify:s,onQueueAdopt:Ee=>t.queueStore?.set?.(Ee)}),d):null}function g(){return c`
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
    `}function m(){let re=r.get();return c`
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
        ${re?c`
              ${Wp(re,o(),X)}
              ${zp(re,u,{onDraft:Ee=>{u=Ee},onAdd:ee,onRemove:W})}
              ${Hp(re,q)}
            `:c`<div class="settings-dialog__empty">
              표시 정책을 불러오는 중…
            </div>`}
      </section>
    `}async function k(re){let Ee=r.get();if(Ee)try{let he=await n("display-policy-set",{expected_revision:Ee.revision,policy:re(Ee)});R(he),he&&he.conflict&&he.policy&&(he=await n("display-policy-set",{expected_revision:he.policy.revision,policy:re(he.policy)}),R(he)),he&&he.conflict&&s("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC")}catch{s("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328")}}function R(re){re&&re.policy&&typeof re.policy=="object"&&r.set(re.policy)}function z(re){k(re)}function X(re){let Ee=r.get();if(!Ee)return;let he=!My(re,Ee);z(pe=>Py(re,pe,he))}function ee(){let re=u.trim();re.length!==0&&(u="",z(Ee=>Ee.hidden_prefixes.includes(re)?{hidden_prefixes:Ee.hidden_prefixes}:{hidden_prefixes:[...Ee.hidden_prefixes,re]}),O())}function W(re){z(Ee=>({hidden_prefixes:Ee.hidden_prefixes.filter(he=>he!==re)}))}function q(re){let Ee=r.get();if(!Ee)return;let he=Ee.chips[re]===!1;z(()=>({chips:{[re]:he}}))}function O(){rt(c`
        <div class="settings-dialog__container">
          <nav
            class="settings-dialog__rail"
            role="tablist"
            aria-orientation="vertical"
          >
            <div class="settings-dialog__rail-title">설정</div>
            ${Iy.map(re=>c`<button
                  type="button"
                  class="settings-dialog__tab"
                  role="tab"
                  data-tab=${re.id}
                  aria-selected=${String(l===re.id)}
                  aria-controls=${`settings-pane-${re.id}`}
                  @click=${()=>I(re.id)}
                >
                  <span class="settings-dialog__glyph">${re.glyph}</span>
                  ${re.label}
                </button>`)}
            <button
              type="button"
              class="settings-dialog__close"
              aria-label="닫기"
              @click=${Q}
            >
              닫기
            </button>
          </nav>
          <div class="settings-dialog__panes">
            ${g()} ${m()}
          </div>
        </div>
      `,i),f()}function I(re){l=re,O()}let F=()=>{a=!1,t.onOpenChange?.(!1)};i.addEventListener("close",F),i.addEventListener("cancel",F);let U=re=>{re.target===i&&Q()};i.addEventListener("click",U);let ue=null;r.subscribe&&(ue=r.subscribe(()=>{a&&O()}));let M=null;t.implPresetStore?.subscribe&&(M=t.implPresetStore.subscribe(()=>{a&&d?.render()}));function B(re="execution"){a||(a=!0,t.onOpenChange?.(!0),l=re,u="",O(),typeof i.showModal=="function"?i.showModal():i.setAttribute("open",""),f()?.load())}function Q(){a&&(a=!1,t.onOpenChange?.(!1),typeof i.close=="function"?i.close():i.removeAttribute("open"))}return{open:B,close:Q,sessionDraft:()=>d?.sessionDraft()??{},destroy(){a=!1,i.removeEventListener("close",F),i.removeEventListener("cancel",F),i.removeEventListener("click",U),ue&&(ue(),ue=null),M&&(M(),M=null),d?.destroy(),d=null,i.remove()}}}function My(e,t){return t.visible_labels.includes(e)?!0:t.hidden_labels.includes(e)?!1:!t.hidden_prefixes.some(n=>n.length>0&&e.startsWith(n))}function Py(e,t,n){if(!n)return{hidden_labels:t.hidden_labels.includes(e)?t.hidden_labels:[...t.hidden_labels,e],visible_labels:t.visible_labels.filter(s=>s!==e)};let r=t.hidden_labels.filter(s=>s!==e);return t.hidden_prefixes.some(s=>s.length>0&&e.startsWith(s))?{hidden_labels:r,visible_labels:t.visible_labels.includes(e)?t.visible_labels:[...t.visible_labels,e]}:{hidden_labels:r}}var Dy=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],Kp="usage-meter-card",Ny="usage-meter-layer",yl=600,qy=["token_expired","relogin_required"];function Yp(e){return String(e).padStart(2,"0")}function Fy(e,t){let n=Math.max(0,Math.ceil((e-t)/6e4)),r=Math.floor(n/1440),o=Math.floor(n%1440/60),s=n%60;return r>0?`${r}d${o>0?` ${o}h`:""}`:o>0?`${o}h${s>0?` ${s}m`:""}`:`${s}m`}function Vp(e,t=Date.now()){let n=Date.parse(e);if(!Number.isFinite(n))return"";let r=new Date(n),o=new Date(t),s=`${Yp(r.getHours())}:${Yp(r.getMinutes())}`,l=r.getFullYear()===o.getFullYear()&&r.getMonth()===o.getMonth()&&r.getDate()===o.getDate()?s:`${Dy[r.getMonth()]} ${r.getDate()} ${s}`;return`${Fy(n,t)} \xB7 ${l}`}function jy(e){let t=Math.max(0,Math.floor(e));return t<60?`${t}\uCD08 \uC804`:t<3600?`${Math.floor(t/60)}\uBD84 \uC804`:`${Math.floor(t/3600)}\uC2DC\uAC04 \uC804`}function Xp(e){return e>=85?"usage-meter__window--danger":e>=60?"usage-meter__window--warn":"usage-meter__window--success"}function Qp(e){let t=typeof e=="number"&&Number.isFinite(e)?e:0;return Math.min(100,Math.max(0,t))}var Zp=[{key:"claude",label:"Claude",endpoint:"/api/claude-usage",switch_endpoint:"/api/claude-account/switch",tool:"cswap"},{key:"codex",label:"Codex",endpoint:"/api/codex-usage",switch_endpoint:"/api/codex-account/switch",tool:"codex-auth"}];function ef(e){let t=[];for(let n of e){if(!n||typeof n!="object")continue;let r=n;typeof r.key!="string"||r.key.length===0||typeof r.pct!="number"||!Number.isFinite(r.pct)||t.push({key:r.key,pct:r.pct,resetsAt:typeof r.resetsAt=="string"?r.resetsAt:""})}return t}function By(e){if(!e||typeof e!="object")return null;let t=e;return!Number.isInteger(t.number)||t.number<=0||typeof t.email!="string"||t.email.length===0||typeof t.status!="string"||t.status.length===0||typeof t.active!="boolean"||!Array.isArray(t.windows)?null:{number:t.number,email:t.email,alias:typeof t.alias=="string"&&t.alias.length>0?t.alias:null,plan:typeof t.plan=="string"&&t.plan.length>0?t.plan:null,active:t.active,status:t.status,windows:ef(t.windows),fetchedAt:typeof t.fetchedAt=="string"?t.fetchedAt:null,ageSeconds:typeof t.ageSeconds=="number"&&Number.isFinite(t.ageSeconds)?t.ageSeconds:null}}function Uy(e,t){if(!e||typeof e!="object")return null;let n=e,r=[];if(Array.isArray(n.accounts))for(let s of n.accounts){let i=By(s);i&&r.push(i)}let o=n.available===!0&&Array.isArray(n.windows);return!o&&r.length===0?null:{available:o,windows:o?ef(n.windows):[],ageSeconds:typeof n.ageSeconds=="number"&&Number.isFinite(n.ageSeconds)?n.ageSeconds:null,accounts:r,receivedAtMs:t,held:!1}}function Wy(e,t){if(!e||typeof e!="object")return{kind:"error"};let n=Uy(e,t);return n?{kind:"ok",snapshot:n}:Array.isArray(e.accounts)?{kind:"empty"}:{kind:"error"}}function tf(e,t){return(e.ageSeconds===null?0:e.ageSeconds)+Math.max(0,t-e.receivedAtMs)/1e3}function zy(e,t){return!e.held||tf(e,t)<=yl?e:{...e,available:!1,windows:[],accounts:[]}}function Jp(e,t){return`${e}:${t}`}function nf(e){let t=!1,n=null,r=new Map,o=null,s=new Map,i=new Map,l=0,a=null;function u(){rt(c``,e),e.hidden=!0,f()}function d(){if(a===null){let pe=e.ownerDocument;a=pe.createElement("div"),a.id=Ny,a.className="usage-meter__layer",pe.body.appendChild(a)}return a}function f(){a!==null&&(rt(c``,a),a.remove(),a=null)}function g(pe){n!==pe&&(n===null&&(document.addEventListener("mousedown",k),document.addEventListener("keydown",z),window.addEventListener("resize",R)),n=pe)}function m(){n!==null&&(n=null,document.removeEventListener("mousedown",k),document.removeEventListener("keydown",z),window.removeEventListener("resize",R))}function k(pe){let P=pe.target;P&&(e.contains(P)||a!==null&&a.contains(P))||(m(),Q())}function R(){Q()}function z(pe){pe.key==="Escape"&&(m(),Q())}function X(pe){n===pe?m():g(pe),Q()}function ee(){m(),Q()}async function W(pe,P){if(r.has(pe.key))return;let Ae=Jp(pe.key,P);r.set(pe.key,P),i.delete(Ae),Q();let Se=null;try{Se=await(await fetch(pe.switch_endpoint,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({number:P})})).json()}catch{Se=null}if(t)return;if(r.delete(pe.key),!Se||Se.ok!==!0){let Z=Se&&typeof Se.error=="string"&&Se.error.length>0?Se.error:"network_error";i.set(Ae,{kind:"error",text:`\uC804\uD658 \uC2E4\uD328 \u2014 ${Z}`}),Q();return}let E=Array.isArray(Se.warnings)?Se.warnings.filter(Z=>typeof Z=="string"&&Z.length>0):[];E.length>0&&i.set(Ae,{kind:"warn",text:E.join(" \xB7 ")}),Q(),await he()}function q(pe,P,Ae,Se){let E=Qp(pe.pct),Ce=`resets ${Vp(pe.resetsAt,Se)}${P?` \xB7 ${Ae}`:""}`;return c`<span
      class="usage-meter__window ${Xp(E)}"
      style=${`--progress: ${E}%`}
      title=${Ce}
    >
      <span class="usage-meter__label">${pe.key}</span>
      <span class="usage-meter__track" aria-hidden="true">
        <span class="usage-meter__fill"></span>
      </span>
      <span class="usage-meter__pct">${E}%</span>
    </span>`}function O(pe,P,Ae){let Se=tf(P,Ae),E=P.available&&(P.held||Se>yl),Z=E?`${Math.floor(Se/60)}\uBD84 \uC804 \uCE21\uC815`:"",Ce=P.accounts.filter(Pe=>!Pe.active).length,ge=`usage-meter__group${E?" usage-meter__group--stale":""}`,Te=c`<span class="usage-meter__provider"
        >${pe.label}</span
      >
      ${P.available?P.windows.map(Pe=>q(Pe,E,Z,Ae)):c`<span class="usage-meter__empty">사용량 없음</span>`}
      ${Ce>0?c`<span class="usage-meter__badge">+${Ce}</span>`:""}`;if(P.accounts.length===0)return c`<span
        class=${ge}
        aria-label=${`${pe.label} usage`}
        >${Te}</span
      >`;let be=n===pe.key;return c`<button
      type="button"
      class=${`usage-meter__toggle ${ge}`}
      aria-label=${`${pe.label} usage`}
      aria-expanded=${be?"true":"false"}
      aria-controls=${Kp}
      @click=${()=>X(pe.key)}
    >
      ${Te}
    </button>`}function I(pe,P){return c`<span class="usage-meter" aria-label="Usage">
      ${pe.map(Ae=>O(Ae.provider,Ae.snapshot,P))}
    </span>`}function F(pe,P){let Ae=Qp(pe.pct),Se=Vp(pe.resetsAt,P);return c`<span
      class="usage-meter__account-window ${Xp(Ae)}"
      style=${`--progress: ${Ae}%`}
    >
      <span class="usage-meter__account-key">${pe.key}</span>
      <span class="usage-meter__account-track" aria-hidden="true">
        <span class="usage-meter__account-fill"></span>
      </span>
      <span class="usage-meter__account-pct">${Ae}%</span>
      <span class="usage-meter__account-reset"
        >${Se.length>0?`\u21BB ${Se}`:""}</span
      >
    </span>`}function U(pe,P){return qy.includes(P)?`\uD1A0\uD070 \uB9CC\uB8CC \u2014 ${pe.tool} \uC7AC\uB85C\uADF8\uC778 \uD544\uC694`:"\uC0AC\uC6A9\uB7C9 \uC5C6\uC74C"}function ue(pe,P,Ae){let Se=P.status==="ok",E=typeof P.ageSeconds=="number"&&P.ageSeconds>yl,Z=i.get(Jp(pe.key,P.number)),Ce=r.get(pe.key),ge=Ce!==void 0,Te=Ce===P.number,be=["usage-meter__account"];return P.active&&be.push("usage-meter__account--active"),Se||be.push("usage-meter__account--unavailable"),E&&be.push("usage-meter__account--stale"),c`<div class=${be.join(" ")}>
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
              >${jy(P.ageSeconds)}</span
            >`}
        ${P.active?"":c`<button
              type="button"
              class="usage-meter__switch"
              ?disabled=${ge}
              @click=${()=>{W(pe,P.number)}}
            >
              ${Te?"\uC804\uD658 \uC911\u2026":"\uC804\uD658"}
            </button>`}
      </div>
      ${Se?c`<div class="usage-meter__account-windows">
            ${P.windows.map(Pe=>F(Pe,Ae))}
          </div>`:c`<div class="usage-meter__account-status">
            ${U(pe,P.status)}
          </div>`}
      ${Z===void 0?"":c`<div
            class="usage-meter__account-message usage-meter__account-message--${Z.kind}"
          >
            ${Z.text}
          </div>`}
    </div>`}function M(pe,P,Ae){let Se=P.accounts.filter(E=>E.active).length;return c`<section class="usage-meter__section">
      <h2 class="usage-meter__section-title">
        ${pe.label} · 활성 ${Se} / 전체
        ${P.accounts.length}
      </h2>
      ${P.accounts.map(E=>ue(pe,E,Ae))}
    </section>`}function B(pe,P){return c`<div
      class="usage-meter__card"
      id=${Kp}
      role="dialog"
      aria-label=${`${pe.provider.label} \uACC4\uC815 \uC0AC\uC6A9\uB7C9`}
    >
      ${M(pe.provider,pe.snapshot,P)}
      <p class="usage-meter__note">전환은 새로 시작하는 세션부터 적용됩니다.</p>
    </div>`}function Q(){let pe=Date.now(),P=[];for(let Se of Zp){let E=s.get(Se.key);E&&P.push({provider:Se,snapshot:zy(E,pe)})}if(P.length===0){m(),u();return}let Ae=P.find(Se=>Se.provider.key===n&&Se.snapshot.accounts.length>0);Ae||m(),rt(I(P,pe),e),e.hidden=!1,Ae?re(Ae,pe):f()}function re(pe,P){let Ae=d(),Se=e.getBoundingClientRect(),E=e.ownerDocument.documentElement.clientWidth;Ae.style.setProperty("--usage-meter-anchor-top",`${Se.bottom}px`),Ae.style.setProperty("--usage-meter-anchor-right",`${Math.max(0,E-Se.right)}px`),rt(c`<div
          class="usage-meter__scrim"
          aria-hidden="true"
          @mousedown=${ee}
        ></div>
        ${B(pe,P)}`,Ae)}async function Ee(pe){try{let P=await fetch(pe.endpoint);return P.ok?Wy(await P.json(),Date.now()):{kind:"error"}}catch{return{kind:"error"}}}async function he(){l+=1;let pe=l,P=await Promise.all(Zp.map(async Ae=>({provider:Ae,read:await Ee(Ae)})));if(!(t||pe!==l)){for(let Ae of P){let Se=Ae.provider.key;if(Ae.read.kind==="ok"){s.set(Se,Ae.read.snapshot);continue}if(Ae.read.kind==="empty"){s.delete(Se);continue}let E=s.get(Se);E!==void 0&&!E.held&&s.set(Se,{...E,held:!0})}Q()}}return u(),he(),o=setInterval(()=>{he()},6e4),{destroy(){t=!0,o!==null&&(clearInterval(o),o=null),m(),u()}}}function Ni(e){let t=e?.blocked_info;return t&&typeof t=="object"?Array.isArray(t.blockers)?t.blockers.filter(r=>typeof r=="string"&&r.length>0):[]:(Array.isArray(e?.dependencies)?e.dependencies:[]).map(r=>{if(typeof r=="string")return r;if(!r||typeof r!="object")return"";let o=r.type??r.dependency_type;return o!==void 0&&o!=="blocks"?"":r.depends_on_id||r.id||""}).filter(Boolean)}var sf="bdui.worker.candidate_sort",ts=Object.freeze([{id:"spec",label:"spec \uC6B0\uC120",chain:[{key:"spec",dir:"desc"},{key:"created",dir:"asc"}]},{id:"bottleneck",label:"\uBCD1\uBAA9 \uC6B0\uC120",chain:[{key:"priority",dir:"asc"},{key:"dependents",dir:"desc"},{key:"released",dir:"desc"}]},{id:"created",label:"\uCD5C\uC2E0 \uC0DD\uC131",chain:[{key:"created",dir:"desc"},{key:"priority",dir:"asc"}]},{id:"updated",label:"\uCD5C\uC2E0 \uC218\uC815",chain:[{key:"updated",dir:"desc"}]}]),qi=Object.freeze({preset:"spec"}),af=3,lf=Object.freeze([{key:"priority",label:"\uC6B0\uC120\uC21C\uC704"},{key:"dependents",label:"\uD6C4\uC18D \uC218"},{key:"released",label:"\uD574\uC81C \uC2DC\uAC01"},{key:"spec",label:"spec \uC720\uBB34"},{key:"created",label:"\uC0DD\uC131"},{key:"updated",label:"\uC218\uC815"}]);function rf(e){return ts.some(t=>t.id===e)}function of(e){let t=ts.find(n=>n.id===e);return t?t.chain.map(n=>({...n})):[]}function Hy(e,t){return e.length===t.length&&e.every((n,r)=>n.key===t[r].key&&n.dir===t[r].dir)}function ns(e){return e&&"preset"in e?of(e.preset):e&&Array.isArray(e.chain)?e.chain.map(t=>({...t})):of("spec")}function vl(e){return e&&"preset"in e?e.preset:null}function Or(e){if(typeof e=="string"){let s;try{s=JSON.parse(e)}catch{return rf(e)?{preset:e}:qi}return Or(s)}if(!e||typeof e!="object")return qi;let t=e;if(rf(t.preset))return{preset:t.preset};let n=t.chain;if(!Array.isArray(n)||n.length===0||n.length>af||!n.every(Vi))return qi;let r=[];for(let s of n)r.some(i=>i.key===s.key)||r.push({key:s.key,dir:s.dir});let o=ts.find(s=>Hy(s.chain,r));return o?{preset:o.id}:{chain:r}}function cf(){try{return Or(window.localStorage.getItem(sf))}catch{return qi}}function wl(e){try{window.localStorage.setItem(sf,JSON.stringify(e))}catch{}}function uf(e,t,n){let r=e.map(a=>({...a}));if(!n)return r.slice(0,t);if(!Object.prototype.hasOwnProperty.call(gs,n))return r;let o=n;if(r.slice(0,t).some(a=>a.key===o))return r.slice(0,t);let s={key:o,dir:r[t]&&r[t].key===o?r[t].dir:gs[o]},i=r.slice(0,t),l=r.slice(t+1).filter(a=>a.key!==o);return[...i,s,...l].slice(0,af)}function df(e,t){return e.map((n,r)=>r===t?{key:n.key,dir:n.dir==="asc"?"desc":"asc"}:{...n})}function Gy(e){let t=new Set(e.map(l=>l.id)),n=new Map,r=new Map;for(let l of e){let a=Ni(l).filter(u=>t.has(u));n.set(l.id,a);for(let u of a){let d=r.get(u);d?d.push(l):r.set(u,[l])}}let o=new Set,s=[],i=l=>{o.add(l.id),s.push(l);for(let a of r.get(l.id)??[])!o.has(a.id)&&(n.get(a.id)??[]).every(u=>o.has(u))&&i(a)};for(;s.length<e.length;){let l=e.find(a=>!o.has(a.id)&&(n.get(a.id)??[]).every(u=>o.has(u)));i(l??e.find(a=>!o.has(a.id)))}return s}function pf(e,t){let n=Array.isArray(e)?e.slice():[];return n.sort(ac(ns(t))),Gy(n)}function ff(e,t){let n=new Map;if(!e||typeof e!="object")return n;let r=e,o=[],s=new Set;for(let i of t){if(s.has(i.id))continue;s.add(i.id);let l=r[i.id];if(!l||!Array.isArray(l.scope))continue;let a=l.scope.filter(u=>typeof u=="string"&&u.length>0);if(a.length===0){n.set(i.id,{overlaps:[],scope_missing:!0});continue}n.set(i.id,{overlaps:[],scope_missing:!1}),o.push({member:i,scope:a})}for(let i=0;i<o.length;i+=1)for(let l=i+1;l<o.length;l+=1){let a=Fs(o[i].scope,o[l].scope);if(a.length===0)continue;let u=o[i].member,d=o[l].member;n.get(u.id)?.overlaps.push({id:d.id,title:d.title,location_label:d.location_label,prefixes:a}),n.get(d.id)?.overlaps.push({id:u.id,title:u.title,location_label:u.location_label,prefixes:a})}return n}var _f=new Set(["sh","bash","zsh","dash","ksh"]),mf=/('(?:[^']*)'|"(?:\\.|[^"\\])*"|#.*|\$(?:\{[^}\n]*\}|[A-Za-z_][A-Za-z0-9_]*|[?#@*!$0-9-])|\b(?:if|then|else|elif|fi|for|while|until|do|done|case|esac|in|function|select|time)\b)/g;function gf(e){let t=e.split("/");return t[t.length-1]||""}function Ky(e){let t=e.split(`
`,1)[0];if(!t.startsWith("#!"))return!1;let n=t.slice(2).trim().split(/\s+/).filter(Boolean);if(n.length===0)return!1;let r=gf(n[0]);if(r!=="env")return _f.has(r);let o=n.slice(1).find(s=>!s.startsWith("-")&&!s.includes("="));return o!==void 0&&_f.has(gf(o))}function Yy(e){return e.startsWith("#")?"comment":e.startsWith("'")||e.startsWith('"')?"string":e.startsWith("$")?"variable":"keyword"}function Vy(e){let t=[],n=0;mf.lastIndex=0;for(let r of e.matchAll(mf)){let o=r.index;o>n&&t.push({text:e.slice(n,o),kind:"plain"}),t.push({text:r[0],kind:Yy(r[0])}),n=o+r[0].length}return n<e.length&&t.push({text:e.slice(n),kind:"plain"}),t.length===0&&t.push({text:e,kind:"plain"}),t}function Xy(e){return{bad_request:"\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD\uC774 \uC62C\uBC14\uB974\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.",forbidden:"\uB4F1\uB85D\uB418\uC9C0 \uC54A\uC740 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uC758 \uC2A4\uD06C\uB9BD\uD2B8\uB294 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",lane_not_declared:"\uD604\uC7AC \uACE0\uC815 \uC120\uC5B8\uC5D0 \uD574\uB2F9 \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4.",stale_declaration:"\uC800\uC7A5\uC18C \uC791\uC5C5 \uC120\uC5B8\uC774 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uD654\uBA74\uC5D0\uC11C \uB2E4\uC2DC \uC5F4\uC5B4 \uC8FC\uC138\uC694.",too_large:"\uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uB108\uBB34 \uCEE4\uC11C \uD654\uBA74\uC5D0 \uD45C\uC2DC\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",unsupported_content:"\uD14D\uC2A4\uD2B8 \uD615\uC2DD\uC758 \uC2A4\uD06C\uB9BD\uD2B8\uB9CC \uD45C\uC2DC\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.",unreadable:"\uACE0\uC815\uB41C \uC2A4\uD06C\uB9BD\uD2B8 \uB0B4\uC6A9\uC744 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4."}[e]||"\uC2A4\uD06C\uB9BD\uD2B8\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4."}function hf(e){let t=e.getWorkspacePath,n=e.fetchImpl||globalThis.fetch?.bind(globalThis),r=document.createElement("div");r.className="repo-ops-script-viewer-root",document.body.appendChild(r);let o=null,s="loading",i="",l="",a=0,u=null,d=!1;function f(O,I){return I?Vy(O).map(F=>F.kind==="plain"?F.text:c`<span
            class="repo-ops-script-viewer__token repo-ops-script-viewer__token--${F.kind}"
            >${F.text}</span
          >`):O}function g(){if(!o)return c``;let O=s==="ready"&&Ky(i),I=s==="ready"?i.split(`
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
              ?disabled=${s!=="ready"}
              @click=${()=>{k()}}
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
          ${s==="loading"?c`<div class="repo-ops-script-viewer__status">
                스크립트 불러오는 중…
              </div>`:s==="error"?c`<div
                  class="repo-ops-script-viewer__status repo-ops-script-viewer__status--error"
                >
                  ${l}
                </div>`:c`<div class="repo-ops-script-viewer__code" tabindex="0">
                  ${I.map((F,U)=>c`<div class="repo-ops-script-viewer__row">
                        <span
                          class="repo-ops-script-viewer__line-number"
                          aria-hidden="true"
                          >${U+1}</span
                        ><code class="repo-ops-script-viewer__code-line"
                          >${f(F,O)}</code
                        >
                      </div>`)}
                </div>`}
        </div>
      </section>
    </div>`}function m(){rt(g(),r)}async function k(){if(s!=="ready")return;let O=await on(i);ke(O?"\uC2A4\uD06C\uB9BD\uD2B8 \uBCF5\uC0AC\uB428":"\uC2A4\uD06C\uB9BD\uD2B8 \uBCF5\uC0AC \uC2E4\uD328",O?"success":"error")}function R(O){O.key==="Escape"&&o&&(O.preventDefault(),W())}function z(){d||(document.addEventListener("keydown",R),d=!0)}function X(){d&&(document.removeEventListener("keydown",R),d=!1)}async function ee(O,I=null){let F=++a;z(),o={...O},u=I||(document.activeElement instanceof HTMLElement?document.activeElement:null),s="loading",i="",l="",m(),r.querySelector(".repo-ops-script-viewer__close")?.focus();let ue=t?t():"";if(!ue){s="error",l="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4.",m();return}if(!n){s="error",l="\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD \uAE30\uB2A5\uC744 \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",m();return}let M="/api/repo-ops-script?workspace="+encodeURIComponent(ue)+"&lane="+encodeURIComponent(O.lane)+"&base_sha="+encodeURIComponent(O.base_sha);try{let B=await n(M),Q=await B.json().catch(()=>({}));if(F!==a)return;if((t?t():"")!==ue){W();return}if(!B.ok||!Q||Q.ok!==!0){s="error",l=Xy(Q&&typeof Q.error=="string"?Q.error:""),m();return}o={lane:Q.lane,base_sha:Q.base_sha,path:Q.path,base_ref:Q.base_ref},i=String(Q.content),s="ready",m()}catch{if(F!==a)return;s="error",l="\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",m()}}function W(){a+=1,X(),o=null,i="",m();let O=u;u=null,O?.isConnected&&O.focus()}function q(){W(),r.remove()}return{open:ee,close:W,destroy:q}}var bf={deploy_not_declared:"\uC120\uC5B8 \uC5C6\uC74C",deploy_opted_out:"\uC774 workspace\uC5D0\uC11C \uBC30\uD3EC \uC2E4\uD589\uC774 \uAEBC\uC838 \uC788\uC74C",deploy_in_flight:"\uBC30\uD3EC \uC9C4\uD589 \uC911",target_unresolved:"\uB300\uC0C1 tip\uC744 \uD655\uC815\uD558\uC9C0 \uBABB\uD568",remote_history_not_monotonic:"\uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC\uC640 \uC6D0\uACA9 \uC774\uB825\uC774 \uAC08\uB77C\uC9D0"},Qy=new Set(["queued","running","retry_pending"]);function yf(e){let t=e.queueStore,n=e.transport,r=e.onChanged||(()=>{}),o=e.onOpenScript;function s(){return t&&t.get()||{}}function i(){let M=s();return typeof M.revision=="number"?M.revision:0}function l(M){t&&M&&M.queue&&typeof M.queue=="object"&&t.set(M.queue)}function a(){let M=s().workspace_info;return M&&typeof M=="object"?M:{}}function u(M,B){return c`<span
      class="worker-repo-ops__vd-badge worker-repo-ops__vd-badge--${M}"
      >${B}</span
    >`}function d(M){if(typeof M!="number"||!Number.isFinite(M))return"";let B=M/6e4;return Number.isInteger(B)?`timeout ${B}\uBD84`:`timeout ${Math.round(M/1e3)}\uCD08`}function f(M){let B=d(M);return B?u("config",B):""}function g(M,B,Q){return c`<button
      type="button"
      class="worker-repo-ops__vd-cmd worker-repo-ops__vd-cmd--link"
      .textContent=${Q.script}
      @click=${re=>{o&&o({lane:M,base_sha:B.base_sha,path:Q.script,base_ref:B.base_ref},re.currentTarget)}}
    ></button>`}function m(){let M=s().repo_operations;return Array.isArray(M)?M:[]}function k(){let M=a().repo_ops,B=M&&typeof M=="object"?M.repo_id:null;return typeof B=="string"&&B?B:null}function R(){return m().some(M=>M&&M.kind==="deploy"&&Qy.has(M.state))}function z(){let M=R(),B=k()===null;return c`<button
      type="button"
      class="worker-repo-ops__deploy-run"
      data-seam="repo-ops-deploy-run"
      ?disabled=${M||B}
      title=${M?"\uBC30\uD3EC \uC9C4\uD589 \uC911":B?"\uC800\uC7A5\uC18C\uB97C \uD655\uC778\uD560 \uC218 \uC5C6\uC74C":"\uC6D0\uACA9 base tip\uC5D0\uC11C \uBC30\uD3EC \uC2A4\uD06C\uB9BD\uD2B8\uB97C 1\uD68C \uC2E4\uD589\uD569\uB2C8\uB2E4"}
      @click=${()=>{I()}}
    >
      배포 실행
    </button>`}function X(){let M=s().repo_ops_opt_out;return{verify:M?.verify===!0,deploy:M?.deploy===!0}}function ee(M,B){return c`<label class="worker-repo-ops__lane-run">
      <input
        type="checkbox"
        .checked=${!B}
        @change=${Q=>{O(M,!Q.target.checked)}}
      />
      이 workspace에서 실행
    </label>`}function W(M){let B=typeof M.base_sha=="string"?M.base_sha:"",Q=`${M.source_path||"repo-ops/config.toml"} @ ${M.base_ref||"?"}${B?`@${B.slice(0,7)}`:""}`,re=X(),Ee=!!M.verify&&re.verify,he=!!M.deploy&&re.deploy;return c`<section class="worker-repo-ops__vd" data-seam="repo-ops">
      <p class="worker-repo-ops__vd-title">
        저장소 작업 선언
        <span class="worker-repo-ops__vd-src">${Q}</span>
      </p>
      <div
        class="worker-repo-ops__lane${Ee?" worker-repo-ops__lane--skipped":""}"
        data-lane="verify"
      >
        <span class="worker-repo-ops__lane-k">머지 전 검증</span>
        <span class="worker-repo-ops__lane-v"
          >${M.verify?c`${g("verify",M,M.verify)}
              ${f(M.verify.timeout_ms)}
              ${Ee?u("skipped","\uC774 workspace\uC5D0\uC11C \uAC74\uB108\uB700"):""}`:c`선언 없음${u("absent","verify \uC5C6\uC774 \uD310\uC815")}`}</span
        >
        <span class="worker-repo-ops__lane-d"
          >${Ee?"\uC774 workspace\uC5D0\uC11C\uB294 \uAC80\uC99D \uC5C6\uC774 \uD310\uC815\uD569\uB2C8\uB2E4.":M.verify?"\uBA38\uC9C0 \uC804\uC5D0 \uC774 \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uD1B5\uACFC\uD574\uC57C \uC790\uACA9\uC744 \uC5BB\uC2B5\uB2C8\uB2E4.":"\uBA38\uC9C0 \uC790\uACA9\uC740 PR/base/head \uC2E0\uC120\uB3C4\xB7mergeability\xB7\uB9AC\uBDF0 \uC601\uC218\uC99D\uC73C\uB85C\uB9CC \uD310\uC815\uD569\uB2C8\uB2E4."}</span
        >
        ${M.verify?ee("verify",re.verify):""}
      </div>
      <div
        class="worker-repo-ops__lane${he?" worker-repo-ops__lane--skipped":""}"
        data-lane="deploy"
      >
        <span class="worker-repo-ops__lane-k">머지 후 배포</span>
        <span class="worker-repo-ops__lane-v"
          >${M.deploy?c`${g("deploy",M,M.deploy)}
              ${f(M.deploy.timeout_ms)}
              ${he?u("skipped","\uC774 workspace\uC5D0\uC11C \uAC74\uB108\uB700"):z()}`:c`선언 없음${u("absent","\uBC30\uD3EC \uC5C6\uC74C")}`}</span
        >
        <span class="worker-repo-ops__lane-d"
          >${he?"\uC774 workspace\uC5D0\uC11C\uB294 \uBC30\uD3EC \uC5C6\uC774 \uACE7\uBC14\uB85C \uC815\uB9AC\uB85C \uB118\uC5B4\uAC11\uB2C8\uB2E4.":M.deploy?c`Worker가 <code>.worktrees/.repo-ops-deploy</code>에서 대상
                  SHA로 정렬한 뒤 1회 실행합니다.`:"\uBA38\uC9C0 \uD6C4 \uBC30\uD3EC \uB2E8\uACC4 \uC5C6\uC774 \uACE7\uBC14\uB85C \uC815\uB9AC\uB85C \uB118\uC5B4\uAC11\uB2C8\uB2E4."}</span
        >
        ${M.deploy?ee("deploy",re.deploy):""}
      </div>
    </section>`}function q(M){let B=M.repo_ops&&typeof M.repo_ops=="object"?M.repo_ops:null;return B&&(B.status==="resolved"||B.status==="absent")?W(B):B&&(B.status==="pending"||B.status==="error")?c`<section class="worker-repo-ops__vd" data-seam="repo-ops">
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
          ${B.status==="pending"?"\uC120\uC5B8 \uD655\uC778 \uC911":c`선언 읽기
              실패${B.error_code?c` — <code>${B.error_code}</code>`:""}`}
        </div>
      </section>`:c`<section class="worker-repo-ops__vd" data-seam="repo-ops">
      <p class="worker-repo-ops__vd-title">저장소 작업 선언</p>
      <div class="worker-repo-ops__vd-line worker-repo-ops__vd-absent">
        선언 확인 중
      </div>
    </section>`}async function O(M,B){if(!n)return;let Q=await n("worker-repo-ops-opt-out-toggle",{kind:M,opted_out:B,expected_revision:i()});if(l(Q),Q&&Q.conflict){let re=await n("worker-repo-ops-opt-out-toggle",{kind:M,opted_out:B,expected_revision:i()});l(re)}r()}async function I(){let M=k();if(!n||M===null)return;let B=await n("worker-repo-operation-deploy-run",{repo_id:M});if(l(B),!B||B.ok!==!0){let Q=B&&typeof B.reason=="string"?B.reason:"",re=Object.hasOwn(bf,Q)?bf[Q]:Q||"\uBC30\uD3EC \uC2E4\uD589\uC744 \uC2DC\uC791\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4";ke(`\uBC30\uD3EC \uC2E4\uD589 \uAC70\uBD80 \u2014 ${re}`,"error")}else ke("\uBC30\uD3EC \uC2E4\uD589\uC744 \uC2DC\uC791\uD588\uC2B5\uB2C8\uB2E4","success");r()}let F={owned_deploy_worktree_fetch_detached_alignment_recreate:"\uC804\uC6A9 \uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC \uC815\uB82C\xB7\uBCF5\uAD6C",recovered_pre_execution_fetch_timeout_retry_once:"fetch \uD0C0\uC784\uC544\uC6C3 1\uD68C \uBCF5\uAD6C",repo_serial_lock_wait:"\uC800\uC7A5\uC18C \uC21C\uCC28 \uC2E4\uD589 \uB300\uAE30",restart_operation_adoption:"\uC7AC\uC2DC\uC791 \uD6C4 \uC791\uC5C5 \uC778\uACC4",exact_input_exit_zero_evidence_adoption:"\uB3D9\uC77C \uC785\uB825 \uC131\uACF5 \uC99D\uAC70 \uC778\uACC4",descendant_success_covers_ancestor_rows:"\uCD5C\uC2E0 SHA \uC131\uACF5\uC774 \uC774\uC804 \uD589 \uCEE4\uBC84",owned_verify_candidate_cleanup:"\uAC80\uC99D \uC784\uC2DC \uCCB4\uD06C\uC544\uC6C3 \uC815\uB9AC",bounded_single_script_retry_exceeded:"\uB2E8\uC77C \uC2A4\uD06C\uB9BD\uD2B8 \uC7AC\uC2DC\uB3C4 \uD55C\uB3C4 \uCD08\uACFC",repair_session_dispatch:"\uC2E4\uD328 \uD574\uACB0 \uC138\uC158 \uC790\uB3D9 \uC2E4\uD589",baseline_failure_ignore:"\uAE30\uC874 \uC2E4\uD328 \uBB34\uC2DC",config_or_script_deletion_to_bypass_gate:"\uC124\uC815\xB7\uC2A4\uD06C\uB9BD\uD2B8 \uC0AD\uC81C\uB85C \uAC8C\uC774\uD2B8 \uC6B0\uD68C",credential_entry:"\uC790\uACA9\uC99D\uBA85 \uC785\uB825\xB7\uCD9C\uB825",destructive_action:"\uD30C\uAD34\uC801 \uC791\uC5C5",history_rewrite:"\uD788\uC2A4\uD1A0\uB9AC \uC7AC\uC791\uC131",agent_self_report_as_success:"\uC138\uC158 \uC790\uAE30\uBCF4\uACE0\uB97C \uC131\uACF5 \uCC98\uB9AC"};function U(M,B,Q){return c`<div class="worker-repo-ops__policy-group" data-policy=${Q}>
      <div class="worker-repo-ops__policy-label">${M}</div>
      <ul class="worker-repo-ops__policy-list">
        ${B.map(re=>c`<li data-token=${re}>
              ${F[re]||re}
            </li>`)}
      </ul>
    </div>`}function ue(){let M=s(),B=M.repo_operation_policy&&typeof M.repo_operation_policy=="object"?M.repo_operation_policy:null;return B?c`<section
      class="worker-repo-ops__repair"
      data-seam="repo-ops-policy"
    >
      <details class="worker-repo-ops__policy" data-seam="policy-lists">
        <summary>
          Worker 자동 처리 기준
          <span class="worker-repo-ops__policy-count"
            >자동 ${(B.worker_automatic||[]).length} · 금지
            ${(B.never_automatic||[]).length}</span
          >
        </summary>
        ${B.supported===!1?c`<div
              class="worker-repo-ops__policy-group"
              data-policy="policy-schema"
            >
              ${`\uACC4\uC57D \uC2A4\uD0A4\uB9C8 \uBD88\uC77C\uCE58 \u2014 \uC790\uB3D9 \uC7AC\uC2DC\uB3C4\uAC00 \uC815\uC9C0\uB418\uC5C8\uC2B5\uB2C8\uB2E4 (v${B.schema_version})`}
            </div>`:""}
        ${U("Worker\uAC00 \uC790\uB3D9 \uCC98\uB9AC",B.worker_automatic||[],"worker-automatic")}
        ${U("\uC790\uB3D9\uC73C\uB85C \uD558\uC9C0 \uC54A\uC74C",B.never_automatic||[],"never-automatic")}
      </details>
    </section>`:""}return{template(){return c`<details class="worker-repo-ops-settings">
        <summary class="worker-repo-ops-settings__summary">
          저장소 작업 · 검증/배포 선언
        </summary>
        ${q(a())} ${ue()}
      </details>`}}}var kf=20,Zy=5,Jy=new Set(["failed","running","queued","retry_pending"]),vf={verify:"\uBA38\uC9C0 \uC804 \uAC80\uC99D",deploy:"\uBA38\uC9C0 \uD6C4 \uBC30\uD3EC"};function ev(e,t,n=kf){let r=[];for(let o of Array.isArray(e)?e:[])!o||typeof o!="object"||r.push({type:"operation",id:o.operation_id,at:typeof o.finished_at=="number"?o.finished_at:typeof o.requested_at=="number"?o.requested_at:null,operation:o});for(let o of Array.isArray(t)?t:[])!o||typeof o!="object"||r.push({type:"cleanup",id:o.bead_id,at:typeof o.at=="number"?o.at:null,cleanup:o});return r.sort((o,s)=>o.at===null&&s.at===null?String(o.id||"").localeCompare(String(s.id||"")):o.at===null?1:s.at===null?-1:s.at-o.at),r.slice(0,Math.max(0,n))}function tv(e){if(e.type==="cleanup")return!0;let t=e.operation;return Jy.has(t.state)&&!t.dismissed&&!t.superseded_by}function nv(e,t,n={}){let r=ev(e,t,1/0),o=n.expanded===!0?kf:Zy,s=new Set(r.slice(0,o)),i=r.filter(l=>s.has(l)||tv(l));return{visible:i,hidden:r.length-i.length}}function wf(e){if(e.type==="cleanup")return"warn";let t=e.operation.state;return t==="succeeded"?"ok":t==="failed"?"fail":"live"}function rv(e){if(e.type==="cleanup")return"\uBA48\uCDA4";switch(e.operation.state){case"succeeded":return"\uC131\uACF5";case"failed":return"\uC2E4\uD328";case"retry_pending":return"\uC7AC\uC2DC\uB3C4 \uC911";case"running":return"\uC2E4\uD589 \uC911";default:return"\uB300\uAE30"}}function $f(e){let t=e.filter(n=>n.value);return t.length===0?"":c`<details class="worker-ev__details">
    <summary>세부</summary>
    <dl class="worker-ev__kv">
      ${t.map(n=>{let r=n.copy===!0?eo(n.value):n.value;return c`<div>
          <dt>${n.term}</dt>
          <dd>${r}</dd>
        </div>`})}
    </dl>
  </details>`}function xf(e,t="",n=!1){return!e&&!t?"":c`<p
    class="worker-ev__explain${n?" worker-ev__explain--warn":""}"
  >
    <span class="worker-ev__cause">${e}</span>${t?c`<br />${t}`:""}
  </p>`}function ov(e,t){if(!e||typeof e!="object")return;let n=t&&t.kind==="verify"?"verify":"deploy",r=e[n],o=r&&typeof r=="object"?r.timeout_ms:void 0;return typeof o=="number"&&Number.isFinite(o)?o:void 0}function sv(e,t){let n=mp(e,t),r=gp(e);return!n&&!r?"":c`<p class="worker-ev__why">
    ${n?c`<span class="worker-ev__why-line">${n}</span>`:""}${r?c`<span class="worker-ev__why-line">${r}</span>`:""}
  </p>`}function iv(e){return e.state!=="failed"||e.superseded_by||e.dismissed?"":c`<div class="worker-ev__acts">
    <button
      type="button"
      class="worker-ev__btn worker-repo-op__dismiss"
      data-operation-id=${e.operation_id}
      title="사람이 확인한 실패로 접수합니다 — 기록은 그대로 남고 해결 필요 집계에서만 빠집니다"
    >
      기록 닫기
    </button>
  </div>`}function av(e,t){let n=e.operation,r=n.state==="failed",o=n.failure?n.failure.code:"";return c`<li
    class="worker-ev"
    data-operation-id=${n.operation_id}
    data-state=${n.state}
  >
    <span
      class="worker-ev__t"
      title=${e.at?Yt(e.at):""}
      >${Ws(e.at)||"\u2014"}</span
    >
    <span class="worker-ev__node" aria-hidden="true"
      ><span class="worker-ev__dot worker-ev__dot--${wf(e)}"></span
    ></span>
    <div class="worker-ev__body">
      <div class="worker-ev__line1">
        <span class="worker-ev__what"
          >${Object.hasOwn(vf,n.kind)?vf[n.kind]:n.kind}</span
        >
        <span class="worker-ev__meta"
          >${n.target_base}@${Us(n.target_sha)}${typeof n.elapsed_ms=="number"?` \xB7 ${Ar(n.elapsed_ms)}`:""}</span
        >
        <span class="worker-ev__st worker-ev__st--${wf(e)}"
          >${rv(e)}</span
        >
        ${n.dismissed?c`<span class="worker-ev__st worker-ev__st--quiet">접수됨</span>`:""}
        ${n.superseded_by?c`<span class="worker-ev__st worker-ev__st--quiet">덮임</span>`:""}
        ${n.source==="manual"?c`<span
              class="worker-ev__st worker-ev__st--manual"
              title="사람이 배포 실행을 눌러 시작한 작업입니다"
              >수동</span
            >`:""}
      </div>
      ${r?xf(_p(n.failure_kind,o)):""}
      ${sv(n,ov(t,n))}
      ${iv(n)}
      ${$f([{term:"\uC2E4\uD328 \uCF54\uB4DC",value:r?o:""},{term:"script",value:[n.script_path||"",n.script_blob_sha?`blob ${Us(n.script_blob_sha)}`:"",Number.isInteger(n.exit_code)?`exit ${n.exit_code}`:""].filter(Boolean).join(" \xB7 ")},{term:"\uB85C\uADF8",value:n.log_path||"",copy:!0},{term:"\uCD9C\uB825",value:n.output_tail||""}])}
    </div>
  </li>`}function lv(e){let t=e.cleanup,n=Sr(t.step);return c`<li
    class="worker-ev"
    data-bead-id=${t.bead_id}
    data-state="cleanup_stalled"
  >
    <span
      class="worker-ev__t"
      title=${e.at?Yt(e.at):""}
      >${Ws(e.at)||"\u2014"}</span
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
        ${Ru(t.step).map(r=>c`<li
              class="worker-step worker-step--${r.state}"
              data-step=${r.step}
            >
              <span class="worker-step__pip" aria-hidden="true"></span>
              <span class="worker-step__lb">${r.label}</span>
            </li>`)}
      </ol>
      ${xf(dr(t.reason),typeof t.retry_count=="number"&&t.retry_count>0?`${t.retry_count}\uD68C \uC790\uB3D9 \uC7AC\uC2DC\uB3C4 \uD6C4\uC5D0\uB3C4 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4 \u2014 \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD558\uBA74 \uBA48\uCD98 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4.`:"\uC815\uB9AC\uB97C \uC7AC\uAC1C\uD558\uBA74 \uBA48\uCD98 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4.",!0)}
      <div class="worker-ev__acts">
        <button
          type="button"
          class="worker-ev__btn worker-ev__btn--warn worker-cleanup__resume"
          data-bead-id=${t.bead_id}
        >
          정리 재개${n?` \u2014 ${n} \uB2E8\uACC4\uBD80\uD130`:""}
        </button>
      </div>
      ${$f([{term:"\uC2E4\uD328 \uCF54\uB4DC",value:t.reason||""},{term:"\uC9C4\uB2E8",value:t.detail||""},{term:"\uB85C\uADF8",value:t.log_path||"",copy:!0},{term:"\uCD9C\uB825",value:t.output_tail||""}])}
    </div>
  </li>`}function cv(e){let t=typeof e.hidden=="number"?e.hidden:0,n=e.expanded===!0;return c`<section class="worker-repo-drawer" data-seam="repo-ops-timeline">
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
          ${e.events.map(r=>r.type==="cleanup"?lv(r):av(r,e.repo_ops))}
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
  </section>`}function Af(e,t={}){let n=null;function r(){if(n===null){rt(c``,e);return}let i=nv(n.operations,n.cleanup_failures,{expanded:n.expanded});rt(cv({events:i.visible,hidden:i.hidden,expanded:n.expanded,repo:n.repo,repo_ops:n.repo_ops}),e)}e.addEventListener("click",i=>{let l=i.target;if(l?.closest?.('[data-seam="repo-ops-close"]')){s();return}l?.closest?.('[data-seam="repo-ops-more"]')&&n&&(n.expanded=!n.expanded,r())});function o(i){n={operations:i.operations,cleanup_failures:i.cleanup_failures,repo:i.repo||"",repo_ops:i.repo_ops||null,expanded:!1},r()}function s(){n!==null&&(n=null,r(),t.onClose&&t.onClose())}return{open:o,close:s,isOpen:()=>n!==null,refresh(i){n&&(n={operations:i.operations,cleanup_failures:i.cleanup_failures,repo:i.repo||"",repo_ops:i.repo_ops||null,expanded:n.expanded},r())}}}var uv="worker-ineligible";function rs(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function Sf(e){return rs(e).includes(uv)}var dv="session-preferred",pv=["external_roundtrip","user_feedback_loop"];function Ef(e,t){if(!rs(e).includes(dv)||typeof t!="object"||t===null)return"";let n=t.session_preferred_reason;return typeof n=="string"&&pv.includes(n)?n:""}var fv="spec-after-blocker";function Tf(e,t){return rs(e).includes(fv)&&Array.isArray(t)&&t.length>0}var _v=Lt("views:worker:adapter"),mv="tab:worker:ready",gv="tab:worker:blocked",hv="tab:worker:in-progress",bv="tab:worker:resolved",yv="tab:worker:closed",vv="\u{1F512} blocked",wv={revision:0,auto_advance:!1,auto_merge:!1,slots:si,queue:[],serial_lanes:[],serial_lane_count:0,pr_wait:[],done:[]},kv=["claude_account","codex_account"],$v=[...Xr,...kv];function xv(e){let t=e&&e.parent;return(typeof t=="string"?t.length>0:!!(t&&t.id))||/\.\d+$/.test(e&&e.id||"")}function Av(e){let t=e&&typeof e=="object"?e.awaiting_user:void 0,n=typeof t=="string"?t.trim():"";return n.length>0?`${Zs}: ${n}`:Zs}function Lr(e){return e&&typeof e=="object"?e:{}}function Sv(e){let t={};for(let n of $v){let r=e[n];typeof r=="string"&&r.length>0&&(t[n]=r)}return t}function Ev(e){let t=e.replace(/\/+$/,""),n=t.lastIndexOf("/");return n>=0?t.slice(n+1):t}function Cf(e={}){let{queueStore:t,issueStores:n,transport:r,getWorkspacePath:o,onInvalidate:s}=e,i=n?jr(n):null,l=new Map,a={},u=null,d=0,f=null,g=!1;function m(){g||!s||s()}function k(I){return u===I?a:{}}async function R(){if(!r||g)return;let I=o?.()||"";if(u===I||f&&f.key===I&&f.generation===d)return;let F=++d;f={key:I,generation:F};let U=null;try{U=await Promise.resolve(r("get-session-defaults",{}))}catch(ue){if(F!==d)return;f=null,_v("get-session-defaults failed: %o",ue),m();return}F===d&&(a=U&&typeof U.values=="object"&&U.values!==null?{...U.values}:{},u=I,f=null,m())}function z(){u=null,d+=1,R()}function X(){for(let[I,F]of l)F==="failed"&&l.delete(I)}function ee(I,F){return i?i.selectBoardColumn(I,F):[]}function W(I,F,U,ue){let M=Array.isArray(I.queue)?I.queue:[],B=new Set([...M.map(P=>P.bead_id),...(Array.isArray(I.serial_lanes)?I.serial_lanes:[]).flatMap(P=>(Array.isArray(P?.entries)?P.entries:[]).map(Ae=>Ae.bead_id)),...(Array.isArray(I.pr_wait)?I.pr_wait:[]).map(P=>P.bead_id),...(Array.isArray(I.done)?I.done:[]).map(P=>P.bead_id)]),Q=new Set(U.map(P=>P.id)),re=new Set,Ee=[];for(let P of[...F,...U])B.has(P.id)||re.has(P.id)||xv(P)||(re.add(P.id),Ee.push(P));let he=pf(Ee,Or(ue)),pe=Lr(I.bead_scope);return he.map(P=>{let Ae=qr(P),Se=Ae.evidence==="published",E=typeof P.workflow?.route=="string"&&P.workflow.route||(P.metadata&&typeof P.metadata.route=="string"?P.metadata.route:""),Z=E==="quick_fix",Ce=!Object.hasOwn(P,"description")||typeof P.description=="string"&&P.description.trim().length>0,ge=Object.hasOwn(P,"labels")&&Sf(P.labels),Te=ge||!Object.hasOwn(P,"labels")?"":Ef(P.labels,P.metadata),be=P.metadata&&typeof P.metadata=="object"?Object.hasOwn(P.metadata,"awaiting_user"):!1,Pe=!ge&&!be&&(Z?Ce:Se&&!Ae.conflict),Xe=Q.has(P.id),Ke=Xe?Ni(P):[],L=[];Xe&&Ke.length===0&&L.push(vv),be&&L.push(Av(P.metadata)),Z&&!Ce?L.push("missing_description"):!Z&&Ae.conflict?L.push("spec_id_conflict"):!Z&&Ae.evidence==="none"?L.push("spec \uC5C6\uC74C"):!Z&&Ae.evidence==="draft"&&L.push("spec \uBBF8\uBC1C\uD589(draft)");let se=pe[P.id];return{bead_id:P.id,title:P.title||P.id,route:E,spec_id:Ae.conflict?"":Ae.path,published:Se,blocked:Xe,blocked_by:Ke,labels:Array.isArray(P.labels)?P.labels:[],created_at:P.created_at,updated_at:P.updated_at,status:P.status,workflow:P.workflow||null,exec_pins:Sv(Lr(P.metadata)),rec:null,...se&&Array.isArray(se.scope)?{scope:se.scope}:{},eligible:Pe,reason:L.join(" \xB7 "),worker_ineligible:ge,session_preferred:Te.length>0,session_preferred_reason:Te,spec_after_blocker:Tf(P.labels,Ke),release_info:P.release_info,dependents_info:P.dependents_info}})}function q(I){let[F,U,ue,M,B]=I,Q=ys([...F,...U,...ue,...M,...B]),re={},Ee=(he,pe)=>{if(!he||typeof he.id!="string"||he.id.length===0)return;let P=re[he.id]||(re[he.id]={});if(typeof he.priority=="number"&&!("priority"in P)&&(P.priority=he.priority),typeof he.from_id=="string"&&!("from_id"in P)&&(P.from_id=he.from_id),pe&&!("metadata"in P)){P.metadata=Lr(he.metadata);let Ae=Lr(he.workflow).route;typeof Ae=="string"&&Ae.length>0&&(P.route=Ae)}};for(let he of[...F,...U,...ue])Ee(he,!0);for(let he of[...M,...B])Ee(he,!1);for(let he of new Set([...Object.keys(re),...Q.keys()])){let pe=vs(Q,he);if(pe.total>0){let P=re[he]||(re[he]={});P.rollup=pe}}return re}function O(I,F,U,ue){let M=new Set((Array.isArray(I.done)?I.done:[]).map(Q=>Q?.bead_id).filter(Q=>typeof Q=="string")),B=[];for(let Q of F){let re=nr(Q.closed_at);if(typeof Q.id!="string"||M.has(Q.id)||re===null||ue!==void 0&&re<ue||typeof Q.comment_count!="number"||Q.comment_count<=0)continue;let Ee=`${U}\0${Q.id}\0${String(Q.updated_at)}\0${Q.comment_count}`,he=l.get(Ee);if(he===void 0&&r&&(l.set(Ee,"pending"),Promise.resolve(r("get-comments",{id:Q.id})).then(P=>{let Ae=Array.isArray(P)&&P.some(Se=>ki(typeof Se?.text=="string"?Se.text:"")?.lane==="session");l.set(Ee,Ae?"session":"not-session"),m()}).catch(()=>{l.set(Ee,"failed"),m()})),he!=="session")continue;let pe=nr(Q.started_at);B.push({id:Q.id,title:Q.title||Q.id,reason:"",draggable:!1,done:!0,lane:"done",selectable:!1,selected:!1,badges:["\uC138\uC158 \uC791\uC5C5"],alert:!1,usage:null,work_ms:pe!==null&&re>=pe?re-pe:null,work_kind:"session",done_at:re,created_at:Q.created_at,updated_at:Q.updated_at})}return B}return{read(I){if(!t)return{workspaces:[],workspaces_state:[]};let F=t.get()||wv,U=o?.()||"",ue=I&&typeof I.done_since=="number"?I.done_since:void 0,M=ee(mv,"ready"),B=ee(gv,"blocked"),Q=ee(hv,"in_progress"),re=ee(bv,"resolved"),Ee=ee(yv,"closed");return{workspaces:[{...F,bead_titles:{...Lr(F.bead_titles),...Object.fromEntries([...M,...B].filter(he=>he&&typeof he.id=="string").map(he=>[he.id,he.title||he.id]))},root_dir:U,name:Ev(U),runnable:W(F,M,B,I?I.candidate_sort:void 0),session_done:O(F,Ee,U,ue),bead_overlay:q([M,B,Q,re,Ee])}],workspaces_state:[{root_dir:U,revision:F.revision,auto_advance:F.auto_advance,auto_merge:F.auto_merge,slots:typeof Lr(F.workspace_info).slots=="number"?Lr(F.workspace_info).slots:F.slots,runner_catalog:F.runner_catalog,execution_defaults:F.execution_defaults,session_defaults:k(U),orchestration_model:F.orchestration_model,orchestration_effort:F.orchestration_effort,orchestration_speed:F.orchestration_speed,issue_prefix:""}]}},ensureSessionDefaults(){R()},refreshSessionDefaults:z,notifyIssuesChanged:X,destroy(){g=!0,d+=1,f=null,l.clear()}}}var Fi=1,Rf=5,Tv={root_dir:"",name:"",auto_advance:!1,auto_merge:!1,slots:Fi,revision:0,runner_catalog:{},items:[],sublanes:{parallel:[],serial:[]},serial_lane_count:0,raw_queue_length:0,live_count:0,over_cap:!1,merge:{positions:new Map,resolutions:new Map,continuations:new Map,authorities:new Map,state:{active:null,failures:{},waiting:null},auto_excluded:[],running:!1},token_total:null,cleanup_failures:[],declared_base:null,repo_operations:[]};function _n(e){return e&&typeof e=="object"?e:{}}var If="beads-ui.worker.candidate-filter",kl={show_blocked:!1,spec:"all"};function Cv(){try{let e=window.localStorage.getItem(If);if(!e)return{...kl};let t=JSON.parse(e);if(!t||typeof t!="object")return{...kl};let n=t.spec;return{show_blocked:t.show_blocked===!0,spec:n==="with"||n==="without"?n:"all"}}catch{return{...kl}}}function Rv(e){try{window.localStorage.setItem(If,JSON.stringify(e))}catch{}}var Ov=[{value:"all",label:"\uC804\uCCB4"},{value:"with",label:"spec \uC788\uC74C"},{value:"without",label:"spec \uC5C6\uC74C"}],Mf="bdui.worker.done-range";function Lv(){try{let e=window.localStorage.getItem(Mf);return e===null?"today":Mn(e)}catch{return"today"}}function Iv(e){try{window.localStorage.setItem(Mf,e)}catch{}}function Of(e){let t=Array.isArray(e)&&e.length>0?e[0]:null;if(!t)return"";let n=typeof t.title=="string"?t.title:t.id||"";return n.length>22?`${n.slice(0,22)}\u2026`:n}function Mv(e){return e==="receipt_not_current"?"\uB9AC\uBDF0 \uD6C4\uC5D0\uB3C4 \uC601\uC218\uC99D\uC774 \uCD5C\uC885 head\uC5D0 \uC720\uD6A8\uD558\uC9C0 \uC54A\uC74C":e==="cancelled"?"\uB9AC\uBDF0 \uC138\uC158 \uCDE8\uC18C\uB428":e.startsWith("launch_failed:")?`\uB9AC\uBDF0 \uC138\uC158 \uC2DC\uC791 \uC2E4\uD328(${e.slice(14)})`:e.startsWith("session_failed:")?`\uB9AC\uBDF0 \uC138\uC158 \uBE44\uC815\uC0C1 \uC885\uB8CC(${e.slice(15)})`:`\uB9AC\uBDF0 \uC138\uC158 \uC2E4\uD328(${e})`}function Lf(e){if(e.startsWith("receipt_unbacked:"))return`\uC2E4\uD589 \uC601\uC218\uC99D \uC790\uB3D9 \uAC80\uC99D \uBD88\uAC00(${e.slice(17)}) \u2014 [\uBA38\uC9C0] \uD074\uB9AD\uC73C\uB85C \uC218\uB3D9 \uC9C4\uD589 \uAC00\uB2A5`;switch(e){case"not_in_pr_wait":return"PR \uB300\uAE30 \uC0C1\uD0DC \uB3D9\uAE30\uD654 \uC2E4\uD328";case"resolution_round_cap":return"\uCDA9\uB3CC \uD574\uC18C 2\uD68C \uCD08\uACFC";case"resolution_rebase_cap":return"\uD050 \uC7AC\uCDA9\uB3CC 3\uD68C \uCD08\uACFC";case"resolution_timeout":return"\uCDA9\uB3CC \uD574\uC18C \uB300\uAE30 \uC2DC\uAC04 \uCD08\uACFC";case"resolution_refused":return"\uD574\uC18C \uC138\uC158 \uB514\uC2A4\uD328\uCE58 \uAC70\uBD80";case"worktree_missing":return"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uD574\uC18C \uD544\uC694";case"worktree_restore_branch_mismatch":return"\uC6CC\uD06C\uD2B8\uB9AC \uBCF5\uC6D0 \uC2E4\uD328 \u2014 \uBE0C\uB79C\uCE58 \uC774\uB984 \uBD88\uC77C\uCE58";case"worktree_restore_path_exists":return"\uC6CC\uD06C\uD2B8\uB9AC \uBCF5\uC6D0 \uC2E4\uD328 \u2014 \uACBD\uB85C \uC774\uBBF8 \uC788\uC74C";case"worktree_restore_branch_missing":return"\uC6CC\uD06C\uD2B8\uB9AC \uBCF5\uC6D0 \uC2E4\uD328 \u2014 origin\uC5D0 \uBE0C\uB79C\uCE58 \uC5C6\uC74C";case"worktree_restore_branch_diverged":return"\uC6CC\uD06C\uD2B8\uB9AC \uBCF5\uC6D0 \uC2E4\uD328 \u2014 \uB85C\uCEEC \uBE0C\uB79C\uCE58\uAC00 origin\uACFC \uB2E4\uB984";case"worktree_restore_failed":return"\uC6CC\uD06C\uD2B8\uB9AC \uBCF5\uC6D0 \uC2E4\uD328";case"merge_unconfirmed_timeout":return"\uBA38\uC9C0 \uD655\uC778 \uC2DC\uAC04 \uCD08\uACFC";case"pr_closed_unmerged":return"PR \uB2EB\uD798";case"merge_error":return"\uBA38\uC9C0 \uC624\uB958";case"spec_id_missing":return"\uC2A4\uD399 ID \uAE30\uB85D \uC5C6\uC74C";default:return e}}function Pv(e){if(e==="lane_occupied")return"\uC2E4\uD589 \uB808\uC778\uC5D0 \uB0A8\uC544 \uC788\uC5B4 \uBA38\uC9C0 \uB300\uC0C1\uC774 \uC544\uB2D9\uB2C8\uB2E4";let t="\uBA38\uC9C0 \uD050\uC5D0 \uB123\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 (\uC774\uBBF8 \uB300\uAE30 \uC911\uC774\uAC70\uB098 \uB300\uC0C1 \uC544\uB2D8)";return typeof e=="string"&&e.length>0?`${t}: ${e}`:t}function Dv(e){if(e==="worker_sessions_busy")return"\uD574\uC18C \uB300\uAE30 \u2014 \uC2E4\uD589 \uC2AC\uB86F \uB300\uAE30 \uC911";if(typeof e!="string"||!e.startsWith("completion_waiting:"))return null;let t=e.slice(19);if(t.length===0)return null;switch(t){case"gating":return"\uBA38\uC9C0 \uC870\uAC74 \uD655\uC778 \uC911";case"merging":return"\uBA38\uC9C0 \uC911";case"cleaning":return"\uB9C8\uBB34\uB9AC \uC911";case"paused":return"\uC790\uB3D9 \uC9C4\uD589 \uC77C\uC2DC\uC815\uC9C0";case"needs_human":return"\uD655\uC778 \uD544\uC694";default:return null}}function Nv(e){if(!e||typeof e!="object")return null;switch(e.state){case"waiting":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC911",live:!0};case"yielded":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uACC4\uC18D \uC911 \xB7 \uC644\uB8CC \uD6C4 \uC6B0\uC120 \uBA38\uC9C0",live:!0};case"ready":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC644\uB8CC \xB7 \uC7AC\uAC80\uC99D \uB300\uAE30",live:!1};default:return null}}var qv=new Set(["paused","needs_human","waiting_metadata","reviewing","retrying"]),Fv=new Set(["waiting_metadata","reviewing","retrying"]),$l=new Set(["review_receipt_missing","review_receipt_stale","review_receipt_invalid","review_receipt_undetermined"]);function jv(e){let t=e&&typeof e=="object"?e.auto_resolution:null,n=t&&typeof t=="object"&&!Array.isArray(t)?t:null;if(!n||!e)return null;let r=typeof n.origin_reason=="string"&&n.origin_reason.length>0?`\uC6D0 \uC0AC\uC720: ${n.origin_reason}`:"";switch(e.phase){case"waiting_metadata":return{label:"\uC815\uC815 \uB300\uAE30",details:[r,"\uBA54\uD0C0\uB370\uC774\uD130 \uC815\uC815\uC774 \uAD00\uCE21\uB418\uBA74 \uC790\uB3D9 \uC7AC\uAC1C"].filter(Boolean),live:!1};case"retrying":{let o=Number.isInteger(n.attempts)?Math.max(0,Number(n.attempts)):0,s=Number.isInteger(n.attempt_cap)&&Number(n.attempt_cap)>0?Number(n.attempt_cap):0,i=typeof n.next_at=="number"?Yt(n.next_at):"",l=typeof n.last_error=="string"&&n.last_error.length>0?n.last_error:"";return{label:s>0?`\uC7AC\uC2DC\uB3C4 ${Math.min(o,s)}/${s}`:`\uC7AC\uC2DC\uB3C4 ${o}`,details:[r,i?`\uB2E4\uC74C \uC2DC\uAC01 ${i}`:"",l?`\uB9C8\uC9C0\uB9C9 \uC624\uB958: ${l}`:""].filter(Boolean),live:!0}}default:return null}}function Bv(e){if(typeof e!="string")return"";for(let t of["retry_exhausted:","auto_review_exhausted:"])if(e.startsWith(t))return e.slice(t.length);return""}function Uv(e,t=null){if(!e||typeof e!="object")return null;let n="";switch(e.phase){case"gating":n="\uBA38\uC9C0 \uC870\uAC74 \uD655\uC778 \uC911";break;case"merging":n="\uBA38\uC9C0 \uC911";break;case"cleaning":n="\uB9C8\uBB34\uB9AC \uC911";break;case"waiting_metadata":case"reviewing":case"retrying":if(!t)return null;n=t.label;break;case"paused":n="\uC790\uB3D9 \uC9C4\uD589 \uC77C\uC2DC\uC815\uC9C0";break;case"needs_human":n="\uD655\uC778 \uD544\uC694";break;case"completed":return null;default:return null}let r=[n];e.head_sha&&r.push(`head ${e.head_sha}`),e.base_sha&&r.push(`base ${e.base_sha}`),(e.failure_stage||e.failure_reason)&&r.push(`${e.failure_stage||"failure"} \xB7 ${e.failure_reason||"\uC6D0\uC778 \uBBF8\uC0C1"}`);let o=Bv(e.terminal_reason);o&&r.push(`\uC6D0 \uC0AC\uC720: ${o}`);let s=e.phase==="needs_human"&&!o?Rr(e.terminal_reason):null;s&&r.push(e.failure_stage?`${e.failure_stage} \xB7 ${s}`:s);for(let i of t?t.details:[])r.push(i);return e.active_attempt_id&&r.push(`attempt ${e.active_attempt_id}`),e.evidence&&r.push(e.evidence),e.log_path&&r.push(e.log_path),{badge:n,title:r.join(`
`),alert:e.phase==="needs_human",lock_actions:!qv.has(e.phase)}}function Wv(e){if(!e||typeof e!="object")return[];let t=e.blocking_codes;return Array.isArray(t)?t.filter(n=>typeof n=="string"&&n.length>0):[]}function zv(e){if(!e||typeof e!="object")return[];let t=e.badge_codes;return Array.isArray(t)?t.filter(n=>typeof n=="string"&&n.length>0):[]}function Hv(e){let t=e.queue_failure?`\uBA38\uC9C0 \uC2E4\uD328 \uC6D0\uBB38: ${e.queue_failure}`:e.auto_skip?`\uC790\uB3D9 \uC81C\uC678 \uC6D0\uBB38: ${e.auto_skip}`:"",n=(s,i={})=>{let l=[i.title||"",t].filter(Boolean);return{label:s,title:l.join(`
`),live:i.live===!0,alert:i.alert===!0}};if(e.continuation_required)return n("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694",{alert:!0});if(e.queueing)return e.queueing==="cleanup"?n("\uC815\uB9AC \uC7AC\uAC1C \uC694\uCCAD \uC911",{title:"\uC11C\uBC84 \uC751\uB2F5\uC744 \uAE30\uB2E4\uB9AC\uB294 \uC911\uC785\uB2C8\uB2E4",live:!0}):n("\uD050 \uB4F1\uB85D \uC911",{title:"\uBA38\uC9C0 \uD050\uC5D0 \uB123\uB294 \uC911 \u2014 \uC11C\uBC84 \uC751\uB2F5\uC744 \uAE30\uB2E4\uB9BD\uB2C8\uB2E4",live:!0});if(e.merge_step)return e.gate?.tier==="merged"?n("\uBA38\uC9C0\uB428",{title:e.merge_step.label,alert:e.merge_step.failed===!0}):n("\uBA38\uC9C0 \uC911",{title:e.merge_step.label,live:!0});if(e.conflict_badge)return n(e.conflict_badge,{live:e.conflict_live===!0});if(e.auto_resolution)return n(e.auto_resolution.label,{title:e.auto_resolution.details.join(`
`),live:e.auto_resolution.live===!0});if(e.recovery?.lock_actions)return n(e.recovery.badge,{title:e.recovery.title,live:!0});if(e.cleanup_failed)return n(e.cleanup_label?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${e.cleanup_label}`:"\uC815\uB9AC \uBA48\uCDA4",{title:e.cleanup_failed.reason||"",alert:!0});if(e.base_exception)return n("\uB2E4\uB978 base \uB300\uC0C1",{title:e.base_exception,alert:!0});let r=Wv(e.receipt_check),o=e.conflicting||e.gate?.reason==="base_behind"||r.length>0;if(e.auto_pending&&o)return n("\uD655\uC778 \uC911",{title:"\uBA38\uC9C0 \uD050\uAC00 \uC790\uB3D9\uC73C\uB85C \uCC98\uB9AC \uC911 \u2014 \uB2E4\uC74C \uAD00\uCE21\uC744 \uAE30\uB2E4\uB9BD\uB2C8\uB2E4",live:!0});if(e.conflicting)return n("\uCDA9\uB3CC \uD574\uACB0 \uD544\uC694",{alert:!0});if(e.gate?.reason==="base_behind")return n("base \uAC31\uC2E0 \uD544\uC694",{alert:!0});if($l.has(e.gate?.reason)){let s=e.gate.reason==="review_receipt_stale"?"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC774 \uD604\uC7AC head\uC758 \uC870\uC0C1\uC774 \uC544\uB2D9\uB2C8\uB2E4 \u2014 \uD788\uC2A4\uD1A0\uB9AC \uC7AC\uC791\uC131\xB7\uBE0C\uB79C\uCE58 \uB9AC\uC14B \uBCF5\uAD6C \uACBD\uB85C\uC785\uB2C8\uB2E4. [\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0]\uAC00 \uC774 \uBCF4\uB958\uC758 \uCD9C\uAD6C\uC785\uB2C8\uB2E4":e.gate.reason==="review_receipt_invalid"?"\uB9AC\uBDF0 \uC601\uC218\uC99D \uAE30\uB85D\uC774 \uC131\uB9BD\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4 \u2014 [\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0]\uAC00 \uC774 \uBCF4\uB958\uC758 \uCD9C\uAD6C\uC785\uB2C8\uB2E4":e.gate.reason==="review_receipt_undetermined"?"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC758 ancestry probe\uB97C \uC644\uB8CC\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 \u2014 [\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0]\uAC00 \uC774 \uBCF4\uB958\uC758 \uCD9C\uAD6C\uC785\uB2C8\uB2E4":"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 [\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0]\uAC00 \uC774 \uBCF4\uB958\uC758 \uCD9C\uAD6C\uC785\uB2C8\uB2E4";if(e.review_session?.active===!0)return n(e.review_session.origin==="auto"?"\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694 \xB7 \uC790\uB3D9 \uB9AC\uBDF0 \uC138\uC158 \uC2E4\uD589 \uC911":"\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694 \xB7 \uB9AC\uBDF0 \uC138\uC158 \uC2E4\uD589 \uC911",{title:`${s}
\uB9AC\uBDF0 \uC138\uC158\uC774 \uC2E4\uD589 \uC911\uC785\uB2C8\uB2E4 \u2014 \uB05D\uB098\uBA74 \uC601\uC218\uC99D\uC744 \uB2E4\uC2DC \uD310\uC815\uD569\uB2C8\uB2E4`,live:!0});if(e.auto_review_wait==="slot")return n("\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694 \xB7 \uB9AC\uBDF0 \uC138\uC158 \uC2AC\uB86F \uB300\uAE30",{title:`${s}
\uC2E4\uD589 \uC2AC\uB86F\uC774 \uBE44\uBA74 \uC790\uB3D9\uC73C\uB85C \uB9AC\uBDF0 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4. \uC9C0\uAE08 \uD074\uB9AD\uD558\uBA74 \uC989\uC2DC \uB744\uC6C1\uB2C8\uB2E4`,live:!0});if(e.review_session?.failure){let i=e.review_dispatch?.state==="exhausted"&&e.review_session.origin==="auto";return n(`\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694 \xB7 ${i?"\uC790\uB3D9 \uB9AC\uBDF0 1\uD68C \uC18C\uC9C4 \xB7 ":""}${Mv(e.review_session.failure)}`,{title:`${s}
\uC9C1\uC804 \uB9AC\uBDF0 \uC138\uC158 \uC885\uB8CC \uC0AC\uC720: ${e.review_session.failure}`,alert:!0})}return n("\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694",{title:s,alert:!0})}return e.gate?.reason==="spec_id_missing"?n("\uC2A4\uD399 ID \uB204\uB77D",{title:"native spec_id \uBBF8\uAE30\uB85D \u2014 bd update --spec-id \uD544\uC694",alert:!0}):r.length>0?n(`\uC601\uC218\uC99D \uD655\uC778 \uD544\uC694 \xB7 ${r[0]}`,{title:`\uC131\uB9BD\uD558\uC9C0 \uC54A\uB294 \uC2E4\uD589 \uC601\uC218\uC99D \u2014 ${r.join(", ")}`,alert:!0}):e.recovery?n(e.recovery.badge,{title:e.recovery.title,alert:!0}):e.gate?.tier==="verify"&&e.gate.gate_badge==="\uAC80\uC99D \uC2E4\uD328"?n("\uAC80\uC99D \uC2E4\uD328",{title:e.gate.reason||"",alert:!0}):e.queue_failure?n(`\uBA38\uC9C0 \uC2E4\uD328 \u2014 ${Lf(e.queue_failure)}`,{title:e.queue_failure,alert:!0}):e.auto_skip?n(`\uC790\uB3D9 \uC81C\uC678 \u2014 ${Lf(e.auto_skip)}`,{title:e.auto_skip,alert:!0}):e.queued&&!e.queue_active?n(`\uBA38\uC9C0 \uB300\uAE30 #${e.queue_position}`):e.gate?.enabled===!0?n("\uBA38\uC9C0 \uAC00\uB2A5"):e.gate?.tier==="merged"?n("\uBA38\uC9C0\uB428"):e.gate?.tier==="closed_unmerged"?n("\uB2EB\uD798",{alert:!0}):e.activity?n("\uD655\uC778 \uC911",{live:!0}):e.gate?.tier==="undecidable"||e.gate?.reason==="mergeability_unknown"?n("\uC0C1\uD0DC \uD655\uC778 \uC2E4\uD328",{title:e.gate.reason||"",alert:!0}):e.gate?.tier==="unobserved"||e.gate?.tier==="verify"||e.gate?.gate_badge==="\uAD00\uCE21 \uB300\uAE30"?n("\uD655\uC778 \uC911"):e.gate?.gate_badge?n(e.gate.gate_badge,{title:e.gate.reason||"",alert:e.gate.enabled!==!0}):null}function Gv(e,t,n,r,o=null,s=null,i=null,l=!1,a=null,u=!0,d=null,f=null,g=null,m={},k=!1,R={},z=null,X={active:!1,failure:null,origin:null}){let ee=!!a&&a.position>0,W=!!a?.continuation_action&&a.continuation_action.continuation===null,q=!!a&&a.active===!0,O=a&&a.failure||null,I=Dv(a?a.waiting:null),F=n[e]||null,U=F&&F.gate?F.gate:null,ue=F&&F.pr?F.pr:null,M=Nv(a?a.resolution:null),B=jv(g),Q=Uv(g,B),re=a&&a.authority||null,Ee=a&&a.review_dispatch||null,he=a?.hold?.auto_review_wait==="slot"?"slot":null,pe=!!g&&typeof g=="object"&&Fv.has(g.phase),P=ee&&!q&&(!re||pe||re.source==="automatic"&&!k),Ae=i==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":M?M.badge:i==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC911":I,Se=!!U&&U.base_badge==="\uCDA9\uB3CC",E=!!U&&U.enabled===!0,Z=Io({bead_id:e,merge_sha:R.merge_sha,cleanup_cursor:R.cleanup_cursor,merge_progress:s&&s.merge_progress?s.merge_progress:null,cleanup_failed:r,repo_operations:R.repo_operations}),Ce=ri(Z),ge=s&&!Z&&(s.queueing??null)?s.queueing:null,Te=!!r&&["repo_operations","child_sweep","branch_cleanup","parent_close"].includes(r.step)&&!!U&&U.tier==="merged",be=r&&r.step==="repo_operations"&&Z?.failed===!0&&(Z.step==="deploy"||Z.step==="verify")?Z.step:null,Pe=l&&!!r&&!!U&&U.tier==="merged",Xe=P&&(E||Se||U?.reason==="base_behind"||$l.has(U?.reason)||Te||Pe),Ke=$l.has(U?.reason),L=l&&Se&&u===!1,se=Vn(m,e,{external:l,merge_active:q||Z?.step==="merge",merge_queued:ee,conflict_active:!!i,cleanup_active:Ce,merged:!!r||U?.tier==="merged"}),ae=!!se.operation,me=ee&&!O&&!W&&!Te&&!(Q&&Q.lock_actions),we=Hv({auto_pending:me,continuation_required:W,queueing:ge,merge_step:Z,conflict_badge:Ae,conflict_live:M?.live===!0||i==="running",auto_resolution:B,recovery:Q,cleanup_failed:r,cleanup_label:r?Sr(r.step):null,base_exception:f,conflicting:Se,gate:U,receipt_check:F&&F.receipt_check?F.receipt_check:null,queue_failure:O,auto_skip:d,queued:ee,queue_active:q,queue_position:a?a.position:0,review_session:X,review_dispatch:Ee,auto_review_wait:he,activity:Ae?null:s&&s.activity||null}),de=we?.live===!0&&we.title?c`<span title=${we.title}>${we.label}</span>`:we?.label||null,Fe=zv(F&&F.receipt_check?F.receipt_check:null);return{id:e,title:l?c`${t}<span class="muted"> · 세션</span>`:t,reason:r&&Z?.active!==!0?ni(r.step):"PR \uB300\uAE30",draggable:!1,done:!0,lane:"pr_wait",...z?{dependency_chips:z}:{},external:l,pr_number:ue&&typeof ue.number=="number"?ue.number:null,pr_url:ue&&typeof ue.url=="string"?ue.url:"",completion_badge:we?.live!==!0&&we?.title?we.label:null,completion_title:we?.title||"",...g?.phase==="needs_human"&&typeof g.log_path=="string"&&g.log_path.length>0?{log_path:g.log_path}:{},...Fe.length>0?{receipt_badge:{codes:Fe}}:{},badges:de?[de]:[],live_badge:we?.live===!0?de:null,usage:o,alert:we?.alert===!0,merge_action:U?.tier==="merged"&&!Te&&!Pe?!1:!ee||W||P||Ke,cancel_action:ee&&!W,cancel_enabled:!q&&!(Q&&Q.lock_actions),cancel_title:Q&&Q.lock_actions?`${Q.badge} \u2014 \uC911\uB2E8\uD558\uB824\uBA74 \uC0C1\uB2E8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8\uC744 \uC0AC\uC6A9\uD558\uC138\uC694`:q?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"\uBA38\uC9C0 \uD050\uC5D0\uC11C \uC774 \uD56D\uBAA9\uC744 \uBE8D\uB2C8\uB2E4 (\uB2E4\uC2DC [\uBA38\uC9C0]\uB85C \uB123\uC744 \uC218 \uC788\uC2B5\uB2C8\uB2E4)",discard:se,discard_action:se.action,merge_step:Z,discard_enabled:se.enabled,discard_title:se.title,merge_enabled:!Z&&!ge&&!i&&!ae&&!f&&!(Q&&Q.lock_actions)&&!L&&X.active!==!0&&(E||Se||U?.reason==="base_behind"||Ke||Te||Pe||Xe||pe&&!q),merge_label:W?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":Te||Pe?be==="deploy"?"\uBC30\uD3EC \uC7AC\uC2DC\uB3C4 \uD6C4 \uC815\uB9AC":be==="verify"?"\uAC80\uC99D \uC7AC\uC2DC\uB3C4 \uD6C4 \uC815\uB9AC":"\uC815\uB9AC \uC7AC\uAC1C":Se&&!Z&&!Te?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":U?.reason==="base_behind"?"base \uAC31\uC2E0 \uD6C4 \uBA38\uC9C0":Ke?"\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0":P?"\uB2E4\uC2DC \uBA38\uC9C0":void 0,merge_title:ae?se.error?`\uD3D0\uAE30 \uC2E4\uD328: ${se.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${se.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:W?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":ge?"\uC694\uCCAD\uC744 \uBCF4\uB0B4\uB294 \uC911 \u2014 \uC11C\uBC84 \uC751\uB2F5\uC744 \uAE30\uB2E4\uB9BD\uB2C8\uB2E4":Z?`\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 ${Z.label}`:be?`\uBA38\uC9C0 \uC644\uB8CC \u2014 ${be==="deploy"?"\uBC30\uD3EC":"\uAC80\uC99D"} \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD574 \uC815\uB9AC\uAC00 \uBA48\uCDC4\uC2B5\uB2C8\uB2E4. \uD074\uB9AD\uD558\uBA74 \uC800\uC7A5\uC18C \uC791\uC5C5\uBD80\uD130 \uC815\uB9AC\uB97C \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4`:Pe?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD569\uB2C8\uB2E4":L?"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uC9C1\uC811 \uD574\uC18C\uD558\uC138\uC694":i==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC2E4\uD589 \uC911 \u2014 \uC644\uB8CC \uD6C4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":i==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC77C\uC2DC\uC815\uC9C0 \u2014 \uC7AC\uAC1C \uD6C4 \uC644\uB8CC\uB418\uBA74 \uBA38\uC9C0\uD558\uC138\uC694":Te?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uC7AC\uAC1C\uD569\uB2C8\uB2E4":Se?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":U?.reason==="base_behind"?"base\uB97C \uC790\uB3D9 \uAC31\uC2E0\uD55C \uB4A4 \uBA38\uC9C0\uD569\uB2C8\uB2E4":X.active===!0?X.origin==="auto"?"\uC790\uB3D9 \uB9AC\uBDF0 \uC138\uC158 \uC2E4\uD589 \uC911 \u2014 \uB05D\uB098\uBA74 \uC601\uC218\uC99D\uC744 \uB2E4\uC2DC \uD310\uC815\uD569\uB2C8\uB2E4":"\uB9AC\uBDF0 \uC138\uC158 \uC2E4\uD589 \uC911 \u2014 \uB05D\uB098\uBA74 \uC601\uC218\uC99D\uC744 \uB2E4\uC2DC \uD310\uC815\uD569\uB2C8\uB2E4":U?.reason==="review_receipt_missing"?"\uB9AC\uBDF0 \uC601\uC218\uC99D \uC5C6\uC74C \u2014 \uBA38\uC9C0 \uAC8C\uC774\uD2B8 \uBCF4\uB958\uC785\uB2C8\uB2E4. \uD074\uB9AD\uD558\uBA74 \uAE30\uB85D\uB41C \uC138\uC158\uC744 \uC774\uC5B4 \uB9AC\uBDF0\uB9CC \uC218\uD589\uC2DC\uD0A4\uACE0, \uC601\uC218\uC99D\uC774 \uCD5C\uC885 head\uC5D0 \uC720\uD6A8\uD574\uC9C0\uBA74 \uD050\uAC00 \uBA38\uC9C0\uD569\uB2C8\uB2E4":U?.reason==="review_receipt_stale"?"head \uC7AC\uC791\uC131\uB428(\uC601\uC218\uC99D\uC774 \uD604\uC7AC head\uC758 \uC870\uC0C1\uC774 \uC544\uB2D8) \u2014 \uBA38\uC9C0 \uAC8C\uC774\uD2B8 \uBCF4\uB958\uC785\uB2C8\uB2E4. \uD074\uB9AD\uD558\uBA74 \uAE30\uB85D\uB41C \uC138\uC158\uC744 \uC774\uC5B4 \uCD5C\uC885 head\uB97C \uB2E4\uC2DC \uB9AC\uBDF0\uC2DC\uD0A4\uACE0, \uC601\uC218\uC99D\uC774 \uC720\uD6A8\uD574\uC9C0\uBA74 \uD050\uAC00 \uBA38\uC9C0\uD569\uB2C8\uB2E4":U?.reason==="review_receipt_invalid"?"\uB9AC\uBDF0 \uC601\uC218\uC99D \uAE30\uB85D\uC774 \uC131\uB9BD\uD558\uC9C0 \uC54A\uC74C \u2014 \uBA38\uC9C0 \uAC8C\uC774\uD2B8 \uBCF4\uB958\uC785\uB2C8\uB2E4. \uD074\uB9AD\uD558\uBA74 \uAE30\uB85D\uB41C \uC138\uC158\uC744 \uC774\uC5B4 \uCD5C\uC885 head\uB97C \uB2E4\uC2DC \uB9AC\uBDF0\uC2DC\uD0A4\uACE0, \uC601\uC218\uC99D\uC774 \uC720\uD6A8\uD574\uC9C0\uBA74 \uD050\uAC00 \uBA38\uC9C0\uD569\uB2C8\uB2E4":U?.reason==="review_receipt_undetermined"?"\uB9AC\uBDF0 \uC601\uC218\uC99D ancestry probe \uBBF8\uC644\uB8CC \u2014 \uBA38\uC9C0 \uAC8C\uC774\uD2B8 \uBCF4\uB958\uC785\uB2C8\uB2E4. \uD074\uB9AD\uD558\uBA74 \uAE30\uB85D\uB41C \uC138\uC158\uC744 \uC774\uC5B4 \uCD5C\uC885 head\uB97C \uB2E4\uC2DC \uB9AC\uBDF0\uC2DC\uD0A4\uACE0, \uC0C8 \uC601\uC218\uC99D\uC774 \uCD5C\uC885 head\uC5D0 \uC720\uD6A8\uD574\uC9C0\uBA74 \uD050\uAC00 \uBA38\uC9C0\uD569\uB2C8\uB2E4":U?.reason==="spec_id_missing"?"native spec_id \uBBF8\uAE30\uB85D \u2014 bd update --spec-id\uB85C \uAE30\uB85D\uD55C \uB4A4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":E?`\uBA38\uC9C0 (${U.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4 (\uCC28\uB840\uAC00 \uB418\uBA74 \uB2E4\uC2DC \uD655\uC778)`:U&&U.tier==="merged"?"\uBA38\uC9C0\uB428 \u2014 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC \uC9C4\uD589 \uC911":`\uBA38\uC9C0 \uBD88\uAC00: ${U&&U.reason||"\uAD00\uCE21 \uB300\uAE30"}`}}function xl(e,t={}){let{transport:n,issueStores:r,queueStore:o,sessionLogStore:s,gotoIssue:i,getWorkspacePath:l,switchWorkspace:a,openDoc:u,doneRange:d,onDoneRangeChange:f}=t,g=r?jr(r):null,m=Cv(),k=null,R=null,z=Yr(()=>fe()),X=new Map,ee=new Map,W=cf(),q=vl(W)===null,O=d?Mn(d):Lv();function I(){let h=Mr.find(y=>y.value===O);return h?h.label:"\uC624\uB298"}let F=Ci("beads-ui.worker.lane-collapsed"),U=!1,ue=new Set,M=new Set,B=new Set,Q=new Set,re=new Set,Ee=null,he=[],pe=Cf({queueStore:o,issueStores:r,transport:n,getWorkspacePath:l,onInvalidate:()=>fe()});function P(){pe.refreshSessionDefaults()}let Ae=document.createElement("div");Ae.className="worker-console";let Se=document.createElement("div");Se.className="worker-top";let E=document.createElement("div");E.className="worker-drawer-overlay",E.hidden=!0;let Z=document.createElement("div");Z.className="worker-drawer-overlay__backdrop";let Ce=document.createElement("div");Ce.className="worker-drawer-host";let ge=document.createElement("div");ge.className="worker-drawer-host",ge.hidden=!0,E.append(Z,Ce,ge);let Te=document.createElement("div");Te.className="worker-lanes-host",Ae.append(Se,E,Te),e.appendChild(Ae);let be=lr(null,null),Pe=[],Xe=Oi({transport:n,console_el:Ae,getLanes:()=>be,getWorkspaces:()=>Pe,getCrossLanes:()=>null,reproject:()=>({lanes:oe(),raw_lanes:null}),onCorrection:()=>{},showToast:ke,requestRender:()=>fe(),adoptQueue:(h,y)=>{o&&o.set(y)},onDragBegin:()=>{k=null}}),Ke=null,L=io(Ce,{transport:n,sessionLogStore:s,onClose:()=>{Ke=null,E.hidden=!0,fe()}}),se=Af(ge,{onClose:()=>{ge.hidden=!0,E.hidden=!0,fe()}}),ae=hf({getWorkspacePath:l||(()=>"")}),me=l&&l()||"",we=yf({queueStore:o,transport:n,onChanged:()=>fe(),onOpenScript:(h,y)=>{ae.open(h,y)}});function de(){return o&&o.get()||{revision:0,auto_advance:!1,auto_merge:!1,slots:Fi,queue:[],serial_lanes:[],serial_lane_count:0,pr_wait:[],done:[]}}function Fe(){let h=de(),y=typeof h.serial_lane_count=="number"&&Number.isInteger(h.serial_lane_count)&&h.serial_lane_count>0?Math.min(h.serial_lane_count,5):0,C=Array.isArray(h.serial_lanes)?h.serial_lanes:[],ce=[];for(let Oe of C){if(ce.length>=y)break;!Oe||typeof Oe.id!="string"||!/^s[1-5]$/.test(Oe.id)||!Array.isArray(Oe.entries)||ce.push({id:Oe.id,label:`\uC9C1\uB82C ${Oe.id.slice(1)}`,count:Oe.entries.length})}return ce.length===0?null:[{id:"parallel",label:"\uBCD1\uB82C",count:(Array.isArray(h.queue)?h.queue:[]).length},...ce]}function He(h){if(!k||!h.some(C=>C.id===k))return null;let y=Fe();return y?{bead_id:k,lanes:y}:null}function Ze(){return l&&l()||""}async function De(h,y){await Xe.sendOp({type:"worker-queue-place",payload:{bead_id:h,...y==="parallel"?{}:{lane:y}},root_dir:Ze()},h)}function Y(){let h=de();return typeof h.revision=="number"?h.revision:0}function j(h){h&&h.queue&&o&&o.set(h.queue)}async function Ne(h){if(!n||!h)return;let y=await n("worker-attempt-pause",{attempt_id:h});y&&y.paused===!1&&y.reason&&ke(`\uC77C\uC2DC\uC815\uC9C0 \uAC70\uBD80: ${y.reason}`,"error",2400)}async function at(h,y="session"){if(!n||!h)return;let C=await zr();if(C===null)return;let ce=async(Oe={})=>await n("worker-attempt-resume",{attempt_id:h,expected_revision:Y(),...C!==""?{instructions:C}:{},...Oe}),ve=await ce();j(ve),ve&&ve.conflict&&(ve=await ce(),j(ve)),ve=await zn(ve,(Oe,Ge)=>ce({continuation:Oe,decision_token:Ge}),{onResult:j,refresh:()=>ce()}),ve&&ve.resumed===!1&&!ve.conflict&&ve.reason&&ke(`${y==="settlement"?"\uC815\uC0B0 \uC7AC\uAC1C":"\uC774\uC5B4\uD558\uAE30"} \uAC70\uBD80: ${ve.reason}`,"error",2400)}async function Je(h,y,C=!0){if(!n)return null;let ce=n,ve=await ce(h,{...y,expected_revision:Y()});return j(ve),ve&&ve.conflict&&C&&(ve=await ce(h,{...y,expected_revision:Y()}),j(ve)),ve}async function v(h){if(!n||!h)return;let y=de().merge_queue?.find(ce=>ce.bead_id===h)?.continuation_action;if(y?.mismatch&&y.continuation===null){await je(h,y.mismatch);return}ue.add(h),fe();let C;try{C=await Je("worker-merge-queue-add",{bead_id:h})}catch{ke("\uBA38\uC9C0 \uD074\uB9AD\uC774 \uC11C\uBC84\uC5D0 \uC804\uB2EC\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4(\uC5F0\uACB0 \uBB38\uC81C) \u2014 \uC5F0\uACB0 \uBCF5\uAD6C \uD6C4 \uB2E4\uC2DC \uB20C\uB7EC\uC8FC\uC138\uC694","error",3200);return}finally{ue.delete(h),fe()}if(!(!C||C.applied)){if(C.conflict){ke("\uD050\uAC00 \uBC14\uB00C\uC5B4 \uBA38\uC9C0 \uD074\uB9AD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uB20C\uB7EC\uC8FC\uC138\uC694","error",2400);return}ke(Pv(C.reason),"error",2400)}}async function G(h){if(!(!n||!h||M.has(h))){M.add(h),fe();try{let y=await n("worker-cleanup-retry",{bead_id:h,expected_revision:Y()});j(y),y&&!y.retried&&!y.conflict&&y.reason&&ke(`\uC815\uB9AC \uC7AC\uAC1C \uAC70\uBD80: ${y.reason}`,"error",2400)}finally{M.delete(h),fe()}}}async function Re(h,y){let C=de().hold;if(!n||!C||typeof C.since!="number")return;let ce=await n(h,{since:C.since});j(ce),ce&&ce.ok===!1&&ke(`${y}: ${ce.reason==="hold_changed"?"\uD050 \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uD655\uC778\uD558\uC138\uC694":ce.reason||""}`,"error",2800)}async function Ie(h,y){if(!n||!h||!y)return;let C=await n("worker-parked-retry",{bead_id:h,attempt_id:y});j(C),C&&C.ok===!1&&ke(`\uC7AC\uC2DC\uB3C4 \uAC70\uBD80: ${C.reason==="not_latest"?"\uC774 bead\uC5D0 \uB354 \uC0C8\uB85C\uC6B4 \uC2DC\uB3C4\uAC00 \uC788\uC2B5\uB2C8\uB2E4":C.reason||""}`,"error",2800)}async function je(h,y){let C=await zn({continuation_mismatch:y},(ve,Oe)=>Je("worker-merge-queue-add",{bead_id:h,continuation:ve,decision_token:Oe},!1)),ce=C?.queue?.merge_queue?.find(ve=>ve.bead_id===h)?.continuation_action;if(C?.applied!==!0&&ce?.continuation===null&&ce.mismatch){await je(h,ce.mismatch);return}C&&C.applied===!1&&!C.conflict&&ke("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD\uC774 \uCD5C\uC2E0 \uC0C1\uD0DC\uC640 \uC77C\uCE58\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4","error",2800)}async function We(h){if(!n)return;let y=await Je("worker-merge-auto-toggle",{on:h});!y||y.conflict||ke(h?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0 \u2014 \uB300\uAE30 \uD56D\uBAA9\uC744 \uBE44\uC6E0\uC2B5\uB2C8\uB2E4",h?"success":"info",2400)}async function dt(h){if(!n||!h)return;let y=await Je("worker-merge-queue-remove",{bead_id:h});y&&!y.conflict&&!y.applied&&y.reason==="merge_active"&&ke("\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error",2400)}async function $t(){await Je("worker-merge-queue-remove",{all:!0})}async function It(h,y=null,C="unmerged",ce=null){if(!n||!h)return;let ve=Ro(h,C);if(!(!!ce||typeof globalThis.confirm!="function"||globalThis.confirm(ve)))return;let Ge=await n("worker-discard",{bead_id:h,...y?{attempt_id:y}:{},...ce?{operation_id:ce}:{},expected_revision:Y()});if(j(Ge),Ge&&Ge.conflict&&(Ge=await n("worker-discard",{bead_id:h,...y?{attempt_id:y}:{},...ce?{operation_id:ce}:{},expected_revision:Y()}),j(Ge)),Ge&&Ge.discarded===!0){ke(zs(Ge),"success",5e3);return}if(Ge&&Ge.reason){ke(`\uD3D0\uAE30 \uC2E4\uD328: ${Ge.reason}`,"error",2800);return}if(Ge&&Ge.accepted&&Ge.pending==="merged_revert"){ke("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success",2400);return}if(Ge&&Ge.accepted&&!Ge.discarded){ke(`\uD3D0\uAE30 \uC9C4\uD589: ${Ge.phase||"\uBC31\uC5C5 \uC911"}`,"success",2400);return}Ge&&!Ge.conflict&&ke("\uD3D0\uAE30 \uAC70\uBD80: unknown","error",2800)}async function Tt(h,y,C){if(!(!n||!y||!C||Q.has(y))){Q.add(y),fe();try{let ce=await n(h,{bead_id:y,action_id:C,expected_revision:Y()});j(ce),ce?.conflict?ke("\uC774\uC804 \uC791\uC5C5 \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694.","error",2800):!ce?.ok&&ce?.reason&&ke(`\uC774\uC804 \uC791\uC5C5 \uCC98\uB9AC \uAC70\uBD80: ${String(ce.reason)}`,"error",2800)}finally{Q.delete(y),fe()}}}async function ft(h,y){if(!n||!y||B.has(y))return;B.add(y),fe();let C;try{let ce=async(ve={})=>await n(h,{bead_id:y,expected_revision:Y(),...ve});C=await ce(),j(C),C&&C.conflict&&(C=await n(h,{bead_id:y,expected_revision:Y()}),j(C)),h==="worker-revise-fix"&&(C=await zn(C,(ve,Oe)=>ce({continuation:ve,decision_token:Oe}),{onResult:j,refresh:()=>ce()}))}finally{B.delete(y),fe()}if(!(!C||C.conflict)){if(C.ok){ke(h==="worker-revise-fix"?"\uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4 \u2014 \uC218\uB9AC \uD6C4 \uAD6C\uD604\uC774 \uC7AC\uB514\uC2A4\uD328\uCE58\uB429\uB2C8\uB2E4":"\uB378\uD0C0 \uC2B9\uC778 \uC644\uB8CC \u2014 \uC601\uC218\uC99D \uAC31\uC2E0 + \uD30C\uD0B9 \uD574\uC81C","success",2800);return}ke(`\uCC98\uBD84 \uAC70\uBD80: ${C.reason||""}`,"error",3e3)}}async function ct(h){if(!n)return;let y=await n("worker-automation-toggle",{on:h,expected_revision:Y()});j(y),y&&y.conflict&&await n("worker-automation-toggle",{on:h,expected_revision:Y()}).then(j)}async function xt(h){if(!n||!h)return;let y=await n("worker-repo-operation-dismiss",{operation_id:h});j(y),y&&y.ok===!1&&ke(`\uAE30\uB85D \uB2EB\uAE30 \uAC70\uBD80: ${y.reason||""}`,"error",3e3)}async function Ct(h){if(!n||!Number.isFinite(h))return;let y=Math.max(Fi,Math.floor(h)),C=await n("worker-queue-set-slots",{slots:y,expected_revision:Y()});j(C),C&&C.conflict&&await n("worker-queue-set-slots",{slots:y,expected_revision:Y()}).then(j)}async function Mt(h){if(!n||!Number.isInteger(h)||h<1||h>Rf)return;let y=de(),C=(Array.isArray(y.serial_lanes)?y.serial_lanes:[]).slice(h).reduce((Oe,Ge)=>Oe+(Array.isArray(Ge?.entries)?Ge.entries.length:0),0),ce=()=>({count:h,expected_revision:Y()}),ve=await n("worker-queue-set-serial-lane-count",ce());j(ve),ve&&ve.conflict&&(ve=await n("worker-queue-set-serial-lane-count",ce()),j(ve)),ve&&ve.applied&&C>0&&ke(`\uC9C1\uB82C \uB808\uC778 \uCD95\uC18C \u2014 ${C}\uAC1C \uD56D\uBAA9\uC774 \uBCD1\uB82C \uB300\uAE30\uB85C \uC774\uB3D9`)}function oe(){let h=vr(O),y=pe.read({candidate_sort:W,done_since:h});return Pe=y.workspaces,be=lr(y.workspaces,y.workspaces_state,{done_since:h,candidate_filter:m,candidate_hidden_counts:"per_control",candidate_sort:"as_given",groups:"all"}),be}function J(h){return h.queue_groups[0]||Tv}function $(h){let y=h.dependency_chips||null,C={...y&&y.released?{released:y.released}:{},...y&&y.dependents?{dependents:y.dependents}:{}},ce=X.get(h.id),ve=ee.get(h.id)||null,Oe=ce&&ce.overlaps.length>0?ce.overlaps:null,Ge=!!ce&&ce.scope_missing;return!ve&&!Oe&&!Ge&&Object.keys(C).length===0?null:{...C,...ve?{predecessors:ve}:{},...Oe?{overlaps:Oe}:{},...Ge?{scope_missing:!0}:{}}}function N(h){return{...h,workspace_name:"",done_layout:void 0,dependency_chips:$(h)||void 0,chip_popover:te(h)}}function te(h){return Qs(h,y=>z.isOpen({bead_id:h.id,chip_key:y}))}function ne(){let h=de(),y=new Map;for(let C of Object.values(_n(h.lane_states))){let ce=Array.isArray(C?.corrections)?C.corrections:[];for(let ve of ce)ve&&typeof ve.bead_id=="string"&&typeof ve.after=="string"&&y.set(ve.bead_id,ve.after)}return{admission:_n(h.admission),correction_after:y}}function le(h,y){let C=N(h),ce=xu(y.admission[h.id]||null,!!h.discard||Q.has(h.id)),ve=y.correction_after.get(h.id);return{...C,draggable:C.draggable===!0&&!ce,stale_work:ce,reason:ce?"":C.reason,badges:ve?[`\u{1F517} ${ve} \uB4A4 (blocks \uC790\uB3D9)`,...C.badges||[]]:C.badges,revise_enabled:C.revise_enabled===!0&&!B.has(h.id)}}function Be(h){let y=ne();return J(h).sublanes.parallel.map(C=>le(C,y))}function Ye(h){let y=ne();return J(h).sublanes.serial.map(C=>{let ce=C.occupants.map(ve=>({id:ve.id,title:ve.title,draggable:!1,lane:C.id,ghost:!0,badges:[ve.badge]}));return{id:C.id,index:C.index+1,raw_length:C.raw_length,ghosts:ce,items:C.items.map(ve=>le(ve,y)),occupied:C.occupied_by.length>0,badge:C.occupants.length>0?C.occupants[0].badge:"\uB300\uAE30",cycle:C.cycle===!0}})}function et(h){return h.runnable.map(y=>N(y))}function Ue(h){return h.done.map(y=>N(y))}function ht(h){let y=h.running.filter(C=>C.non_occupying!==!0).map(C=>({...C,bead_id:C.id,attempt_id:C.attempt_id||"",paused:C.run_state==="paused",failed:C.run_state==="failed",parked:C.run_state==="parked",retry_wait:C.run_state==="retry_wait",waiting:C.run_state==="waiting",wait:C.wait||null,status_label:C.run_state==="failed"?C.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328":C.run_state==="parked"?"\uC138\uC158 \uB300\uAE30":C.run_state==="retry_wait"?"\uC7AC\uC2DC\uB3C4 \uB300\uAE30":C.run_state==="waiting"?"\uC120\uD589 \uB300\uAE30":void 0,can_pause:C.can_pause!==!1,workspace_name:"",dependency_chips:$(C)||void 0,chip_popover:te(C),rollup_expanded:re.has(C.id),failure:C.failure?{...C.failure,open:R===C.attempt_id}:null}));return[...y.filter(C=>C.failed===!0),...y.filter(C=>C.failed!==!0&&C.parked===!0),...y.filter(C=>C.failed!==!0&&C.parked!==!0)]}function Rt(h){return yt(h).map(y=>({...y,chip_popover:te(y)}))}function yt(h){if(Ee&&Ee.model===h)return Ee.rows;let y=de(),C=J(h),ce=_n(y.attempts),ve=Object.values(ce).filter(Kn),Oe=new Map;for(let ze of ve)Oe.set(ze.attempt_id,ze);let Ge=new Map;for(let ze of ve)Ge.set(ze.bead_id,ze);let kt=new Map;for(let ze of[...h.pr_wait,...h.running,...h.queue,...h.runnable,...h.done])kt.has(ze.id)||kt.set(ze.id,ze);let Wt=ze=>{let qt=null;for(let bn of ve)!bn||bn.bead_id!==ze||Ma(bn,Oe)||(qt===null||(typeof bn.started_at=="number"?bn.started_at:0)>=(typeof qt.started_at=="number"?qt.started_at:0))&&(qt=bn);return qt&&typeof qt.target_base=="string"?qt.target_base:null},Jt=new Map;for(let ze of h.running)ze.run_state==="failed"||ze.conflict_resolution!==!0||(ze.run_state!=="paused"?Jt.set(ze.id,"running"):Jt.has(ze.id)||Jt.set(ze.id,"paused"));let dn=_n(y.auto_merge_skips),qn=new Set(C.merge.auto_excluded),On=_n(y.pr_observations),wn=_n(y.pr_activity),Fn=_n(y.cleanup_failed),Xt=_n(y.discard_operations),er=_n(y.bead_workflow),Ln=_n(y.bead_titles),tr=y.merge_queue_state||{active:null,failures:{}},In=C.merge.state.waiting,jn=new Map;for(let ze of Array.isArray(y.merge_queue)?y.merge_queue:[])ze&&typeof ze=="object"&&ze.bead_id&&jn.set(ze.bead_id,ze);let _r=(Array.isArray(y.pr_wait)?y.pr_wait:[]).map(ze=>{let qt=kt.get(ze.bead_id);return{...Gv(ze.bead_id,qt?.title||Ln[ze.bead_id]||ze.bead_id,On,Fn[ze.bead_id]||null,Gn(ce,ze.bead_id),wn[ze.bead_id]||(ue.has(ze.bead_id)?{activity:null,merge_progress:null,queueing:"merge"}:M.has(ze.bead_id)?{activity:null,merge_progress:null,queueing:"cleanup"}:null),Jt.get(ze.bead_id)||null,ze.external===!0,{position:C.merge.positions.get(ze.bead_id)||0,active:tr.active===ze.bead_id,failure:_n(tr.failures)[ze.bead_id]||null,waiting:In&&In.bead_id===ze.bead_id?In.reason:null,resolution:C.merge.resolutions.get(ze.bead_id),continuation_action:C.merge.continuations.get(ze.bead_id),authority:C.merge.authorities.get(ze.bead_id)||null,hold:jn.get(ze.bead_id)?.hold||null,review_dispatch:jn.get(ze.bead_id)?.review_dispatch||null},ze.wt_present!==!1,y.auto_merge===!0&&qn.has(ze.bead_id)?dn[ze.bead_id]?.reason||"":null,Ia(C.declared_base,Wt(ze.bead_id)),_n(y.completion_status)[ze.bead_id]||null,Xt,y.auto_merge===!0,{merge_sha:ze.merge_sha,cleanup_cursor:ze.cleanup_cursor,repo_operations:C.repo_operations},qt?$(qt):null,vu(ce,ze.bead_id)),workflow:er[ze.bead_id]||null,priority:qt?.priority,from_id:qt?.from_id,...qt?.created_at===void 0?{}:{created_at:qt.created_at},...qt?.updated_at===void 0?{}:{updated_at:qt.updated_at}}});return Ee={model:h,rows:_r},_r}function tn(h){let y=J(h),C=[];for(let Oe of h.running)Oe.non_occupying!==!0&&C.push({id:Oe.id,title:Oe.title,location_label:"\uC2E4\uD589\uC911",kind:"running",lane_id:Oe.serial_lane_id??null});for(let Oe of h.pr_wait)C.push({id:Oe.id,title:Oe.title,location_label:"PR \uB300\uAE30",kind:"pr_wait",lane_id:null});for(let Oe of y.sublanes.serial)Oe.items.forEach((Ge,kt)=>{C.push({id:Ge.id,title:Ge.title,location_label:`${Oe.id} #${kt+1}`,kind:"serial",lane_id:Oe.id})});y.sublanes.parallel.forEach((Oe,Ge)=>{C.push({id:Oe.id,title:Oe.title,location_label:`#${Ge+1}`,kind:"parallel",lane_id:null})});for(let Oe of h.runnable)C.push({id:Oe.id,title:Oe.title,location_label:"\uD6C4\uBCF4",kind:"candidate",lane_id:null,queue_placeable:Oe.queue_placeable===!0});let ce=de();X=ff(ce.bead_scope,C);let ve=new Map;for(let Oe of[...h.running,...h.runnable])Array.isArray(Oe.blocked_by)&&Oe.blocked_by.length>0&&ve.set(Oe.id,Oe.blocked_by);for(let[Oe,Ge]of Object.entries(_n(ce.bead_blocked_by)))Array.isArray(Ge)&&ve.set(Oe,Ge.filter(kt=>typeof kt=="string"&&kt.length>0));ee=Mu(ve,C,_n(ce.blocker_workspaces))}function wt(h){let y=h.hold&&typeof h.hold=="object"?h.hold:null;if(!y||y.kind!=="env"&&y.kind!=="systemic")return"";let C=dr(y.cause)||String(y.cause||""),ce=Array.isArray(h.lineages)?h.lineages:[];if(y.kind==="env"){let Oe=ce.map(kt=>kt&&kt.next_at).filter(kt=>typeof kt=="number").sort((kt,Wt)=>kt-Wt)[0],Ge=typeof Oe=="number"?` \xB7 \uB2E4\uC74C ${new Date(Oe).toLocaleTimeString("ko-KR",{hour:"2-digit",minute:"2-digit"})}`:"";return c`<div class="worker-hold worker-hold--env" role="status">
        <span class="worker-hold__text"
          >환경 보류: ${C} — 재시도 대기${Ge}</span
        >
        <button
          type="button"
          class="worker-hold__retry"
          title="예약된 재시도를 지금 실행합니다"
        >
          지금 재시도
        </button>
      </div>`}let ve=(Array.isArray(y.bead_ids)?y.bead_ids:[]).filter(Oe=>typeof Oe=="string"&&Oe.length>0);return c`<div class="worker-hold worker-hold--systemic" role="alert">
      <span class="worker-hold__text"
        >${C}${ve.length>0?` \u2014 bead ${ve.join(", ")}`:""}</span
      >
      <button
        type="button"
        class="worker-hold__resume"
        title="정지를 풀고 멈춰 있던 bead를 다시 디스패치합니다"
      >
        재개
      </button>
    </div>`}function Ot(h){let y=de(),C=J(h),ce=C.sublanes.parallel,ve=ce.length>0?ce[0].id:"\u2014",Oe=c`<button
      type="button"
      class="worker-play${y.auto_advance?" is-active":""}"
    >
      ${y.auto_advance?"\u23F8 \uC790\uB3D9\uD654 \uBA48\uCDA4":"\u25B6 \uC790\uB3D9\uD654"}
    </button>`,Ge=Bt(h),kt=C.over_cap?c`<span
          class="worker-overcap"
          title="수동 재개(▶)는 슬롯 cap을 초과할 수 있습니다 — 자동 진행은 cap을 지킵니다"
          >cap 초과</span
        >`:"",Wt=y.auto_advance?0:(Array.isArray(y.queue)?y.queue:[]).filter(Xt=>Xt&&typeof Xt.armed_by_lane=="string"&&Xt.armed_by_lane.length>0).length,Jt=Wt>0?c`<span
            class="worker-kpi__chip worker-kpi__chip--armed"
            title="모니터 연결 레인이 발차한 대기 행입니다 — 이 레포의 자동 진행은 꺼진 채입니다"
            >⏸ 자동 진행 꺼짐 · 연결 레인 ${Wt}건 진행 중</span
          >`:"",dn=c`<span class="worker-kpi__chip worker-kpi__chip--running"
        >실행 <b>${C.live_count}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--pr"
        >PR 대기 <b>${Rt(h).length}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--done"
        >${I()} 완료 <b>${h.done.length}</b></span
      >`,qn=c`<span
      class="worker-kpi__chip worker-kpi__chip--base"
      title=${C.declared_base?"\uC774 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uC5B8\uD55C target base (docs/agents/repo-ops.toml). \uB514\uC2A4\uD328\uCE58 \uC2DC\uC810\uC758 \uAC80\uC99D\uC740 \uBCC4\uB3C4":"\uC120\uC5B8 \uD30C\uC77C\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 \u2014 target base \uD655\uC778 \uBD88\uAC00"}
      >base ${C.declared_base||"?"}</span
    >`,On=c`<label class="worker-tgl worker-slots"
        >동시 실행
        <input
          type="number"
          class="worker-slots__input"
          min=${Fi}
          step="1"
          .value=${String(C.slots)}
          title="동시에 실행할 세션 수 (최소 1 = 순차 실행)"
      /></label>
      <label
        class="worker-tgl worker-serial-lanes"
        title="고정 직렬 레인 수 (1~5). 축소 시 잘린 레인의 대기 항목은 병렬 대기로 돌아갑니다"
        >직렬 레인
        <select class="worker-serial-lane-count" aria-label="직렬 레인 수">
          ${Array.from({length:Rf},(Xt,er)=>er+1).map(Xt=>c`<option
                value=${String(Xt)}
                ?selected=${C.serial_lane_count===Xt}
              >
                ${Xt}
              </option>`)}
        </select>
      </label> `,wn=ku(C.repo_operations,C.cleanup_failures),Fn=wt(y);return U?c`<div class="worker-ribbon">
          ${Oe} ${Ge}
          <div class="worker-kpi worker-kpi--ribbon">
            ${kt}${Jt}${dn}
          </div>
        </div>
        <div class="worker-ctrl worker-ctrl--mobile">
          <div class="worker-ctrl__ops">${On}</div>
          <div class="worker-kpi">${qn}</div>
        </div>
        ${Fn}${wn}${we.template()}`:c`<div class="worker-ctrl">
        <div class="worker-ctrl__ops">${Oe}${Ge}${On}</div>
        <div class="worker-kpi">
          ${kt}${Jt}${dn}${qn}
          ${(Array.isArray(C.token_total)?C.token_total:C.token_total?[{label:C.token_total,tooltip:`${I()} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}]:[]).map(Xt=>c`<span
                class="worker-kpi__chip worker-kpi__chip--tokens"
                title=${Xt.tooltip}
                >${I()} 완료 · 누적 ${Xt.label}</span
              >`)}
          <span class="worker-kpi__next worker-stat"
            >다음 <b>${ve}</b></span
          >
        </div>
      </div>
      ${Fn}${wn}${we.template()}`}function jt(h){let y=h.runnable_hidden;return c`<div class="worker-filter">
      <label class="worker-filter__tgl" title="blocked 이슈 표시 (기본 숨김)">
        <input
          type="checkbox"
          class="worker-filter__blocked"
          .checked=${m.show_blocked}
        />
        🔒 blocked${y.blocked>0?` ${y.blocked}`:""}
      </label>
      <div class="worker-filter__spec" role="group" aria-label="spec 필터">
        ${Ov.map(C=>c`<button
              type="button"
              class="worker-filter__chip${m.spec===C.value?" is-active":""}"
              data-spec=${C.value}
              aria-pressed=${m.spec===C.value?"true":"false"}
            >
              ${C.label}
            </button>`)}
        ${y.spec>0?c`<span class="worker-filter__hidden">숨김 ${y.spec}</span>`:""}
      </div>
    </div>`}function lt(){let h=q?"custom":vl(W)||"custom";return c`<select
      class="worker-sort"
      aria-label="후보 정렬"
      title="후보 정렬"
      .value=${h}
    >
      ${ts.map(y=>c`<option value=${y.id} ?selected=${h===y.id}>
            ${y.label}
          </option>`)}
      <option value="custom" ?selected=${h==="custom"}>
        사용자 지정…
      </option>
    </select>`}function Ht(){let h=ns(W);return c`<div
      class="worker-sort-chain"
      role="group"
      aria-label="후보 정렬 체인"
    >
      ${[0,1,2].map(y=>{let C=h[y];return c`<span class="worker-sort-chain__step">
          <select
            class="worker-sort-chain__key"
            data-step=${y}
            aria-label=${`${y+1}\uCC28 \uC815\uB82C \uD0A4`}
            .value=${C?C.key:""}
          >
            ${y===0?"":c`<option value="" ?selected=${!C}>없음</option>`}
            ${lf.map(ce=>c`<option
                  value=${ce.key}
                  ?selected=${!!C&&C.key===ce.key}
                >
                  ${ce.label}
                </option>`)}
          </select>
          ${C?c`<button
                type="button"
                class="worker-sort-chain__dir"
                data-step=${y}
                aria-label=${C.dir==="asc"?"\uC624\uB984\uCC28\uC21C":"\uB0B4\uB9BC\uCC28\uC21C"}
                title=${C.dir==="asc"?"\uC624\uB984\uCC28\uC21C":"\uB0B4\uB9BC\uCC28\uC21C"}
              >
                ${C.dir==="asc"?"\u2191":"\u2193"}
              </button>`:""}
        </span>`})}
    </div>`}function Gt(){return c`<div class="worker-done-controls">
      <select
        class="worker-sort worker-done-range"
        aria-label="완료 기간"
        title="완료 기간"
        .value=${O}
      >
        ${Mr.map(h=>c`<option value=${h.value} ?selected=${O===h.value}>
              ${h.label}
            </option>`)}
      </select>
    </div>`}function Bt(h){let y=J(h).merge,C=de().auto_merge===!0;if(y.running)return c`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop${C?" is-active":""}"
        title=${C?"\uC790\uB3D9 \uBA38\uC9C0\uB97C \uB044\uACE0 \uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)":"\uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)"}
      >
        ${C?"\u23F8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8":"\uC77C\uAD04 \uBA38\uC9C0 \uC911\uB2E8"} ${y.positions.size}
      </button>`;if(C)return c`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop is-active"
        title="자동 머지 켜짐 — 자격이 생기는 PR을 계속 큐에 넣습니다. 클릭하면 끕니다"
      >
        ⏸ 자동 머지
      </button>`;let ce=new Set(y.auto_excluded),ve=Rt(h).filter(Oe=>Oe.merge_action&&Oe.merge_enabled&&!ce.has(Oe.id)).length;return c`<button
      type="button"
      class="worker-merge-all"
      title="켜 두면 자격이 생기는 PR을 계속 큐에 넣어 순서대로 충돌 해소·머지합니다"
    >
      ▶ 자동 머지${ve>0?` ${ve}`:""}
    </button>`}function un(h){if(!(h.draggable!==!0||h.done===!0))return c`<span class="worker-mini__rowops">
      <button
        type="button"
        class="worker-mini__rowops-remove"
        data-action="queue-remove"
        data-bead-id=${h.id}
        title="대기에서 빼기"
        aria-label="대기에서 빼기"
      >
        ✕
      </button>
    </span>`}function Nt(h,y){return c`<div
      data-bead-id=${h.id}
      data-drag-kind=${y.kind}
      data-root-dir=${y.root_dir}
      data-lane-id=${nn(y.lane_id)}
      data-row-index=${y.row_index}
      data-queue-index=${String(h.queue_index??0)}
    >
      ${An(h,{actions:un(h)})}
    </div>`}function Vt(h){let y=Be(h),C=Ze();return Js({parallel:{rows:y.map((ce,ve)=>Nt(ce,{kind:"parallel",root_dir:C,row_index:ve})),count:y.length,collapsed:F.isAreaCollapsed("parallel"),drop:{drop:"parallel",root_dir:C}},serial:{lanes:Ye(h).map(ce=>({id:ce.id,title:`\uC9C1\uB82C ${ce.index}`,rows:[...ce.ghosts.map(ve=>An(ve,{actions:un(ve)})),...ce.items.map((ve,Oe)=>Nt(ve,{kind:"repo-serial",root_dir:C,row_index:Oe,lane_id:ce.id}))],count:ce.ghosts.length+ce.items.length,empty:ce.ghosts.length+ce.items.length===0,badge:ce.badge,held:ce.occupied,cycle:ce.cycle,drop:{drop:"repo-serial",root_dir:C,lane_id:ce.id,lane_length:String(ce.raw_length)}})),collapsed:F.isAreaCollapsed("serial")}})}function Ut(h){return vp(ht(h),Date.now(),Ke)}function Zt(h){return h.running.some(y=>y.kind!=="session"&&y.run_state==="running")}function _e(h){let y=J(h),C=et(h),ce=Be(h),ve=Ue(h),Oe=Rt(h),Ge=ht(h),kt=Nn({id:"worker-pane-candidate",lane:"candidate",title:"\uD6C4\uBCF4",items:C,src:!0,empty:"\uD6C4\uBCF4 \uC5C6\uC74C",header_control:lt(),header_row:q?Ht():void 0,controls:jt(h),collapsible:!0,collapsed:F.isCollapsed("candidate"),place_menu:He(C),onOpenDoc:u?(Jt,dn)=>u(dn):void 0}),Wt=Nn({id:"worker-pane-done",lane:"done",title:"\uC644\uB8CC",items:ve,empty:`${I()} \uC644\uB8CC \uC5C6\uC74C`,header_control:Gt(),collapsible:!0,collapsed:F.isCollapsed("done"),preview:U?Array.isArray(y.token_total)?y.token_total.map(Jt=>Jt.label).join(" \xB7 "):y.token_total||Of(ve):void 0});return U?c`<div class="worker-lanes worker-lanes--mobile">
        ${ei({live:Zt(h),running_body:Ge.length>0?Ut(h):"",pr_wait_rows:Oe.map(Jt=>An(Jt)),count:Ge.length+Oe.length})}
        ${Nn({id:"worker-pane-queue",lane:"queue",title:"\uB300\uAE30",items:ce,count:ce.length,collapsible:!0,collapsed:F.isCollapsed("queue"),preview:Of(ce),body:Vt(h)})}
        ${kt} ${Wt}
      </div>`:c`<div class="worker-lanes">
      ${kt}
      ${Nn({id:"worker-pane-queue",lane:"queue",title:"\uB300\uAE30",items:ce,count:ce.length,collapsible:!0,collapsed:F.isCollapsed("queue"),body:Vt(h)})}
      ${Nn({id:"worker-pane-running",lane:"running",title:"\uC2E4\uD589 \uC911",items:Ge,header_control:c`<span class="worker-pane__meta"
          >슬롯 ${y.slots}</span
        >`,live:Zt(h),collapsible:!0,collapsed:F.isCollapsed("running"),body:Ut(h)})}
      ${Nn({id:"worker-pane-pr-wait",lane:"pr_wait",title:"PR \uB300\uAE30",items:Oe,empty:"PR \uB300\uAE30 \uC5C6\uC74C",collapsible:!0,collapsed:F.isCollapsed("pr_wait")})}
      ${Wt}
    </div>`}function T(h){F.toggle(h),fe()}function ye(h){F.toggleArea(h),fe()}function fe(){let h=oe();tn(h),rt(Ot(h),Se),rt(_e(h),Te)}function b(){let h=!0,y=Ti(C=>{if(U=C,h){h=!1;return}fe()});he.push(y)}function p(h){m=h,Rv(h),fe()}function _(h){if(h==="custom"){q=!0,fe();return}W=Or(h),wl(W),q=!1,fe()}function S(h){W=Or({chain:h}),wl(W),fe()}function K(h){O=Mn(h),Iv(O),f?.(O),fe()}function V(h){let y=h.target?.closest?.(".worker-serial-lane-count");if(y){let Wt=Number.parseInt(y.value,10);Number.isFinite(Wt)&&Mt(Wt).then(fe);return}let C=h.target?.closest?.(".worker-filter__blocked");if(C){p({...m,show_blocked:C.checked});return}let ce=h.target?.closest?.(".worker-sort-chain__key");if(ce){let Wt=Number.parseInt(ce.getAttribute("data-step")||"",10);Number.isFinite(Wt)&&S(uf(ns(W),Wt,ce.value));return}let ve=h.target?.closest?.(".worker-done-range");if(ve){K(ve.value);return}let Oe=h.target?.closest?.(".worker-sort");if(Oe){_(Oe.value);return}let Ge=h.target?.closest?.(".worker-slots__input");if(!Ge)return;let kt=Number.parseInt(Ge.value,10);if(!Number.isFinite(kt)){fe();return}Ct(kt).then(fe)}function ie(h){return h?{runner:h.runner||void 0,model:h.model||void 0,effort:h.effort||void 0,worktree:h.worktree||void 0,status:h.status||void 0,session_id:h.session_id||void 0}:{}}function xe(){let h=J(oe()),y=de().workspace_info,C=y&&typeof y=="object"&&y.repo_ops&&typeof y.repo_ops=="object"?y.repo_ops:null;return{operations:h.repo_operations,cleanup_failures:h.cleanup_failures,repo:l&&l()||"",repo_ops:C}}function Ve(){Ke&&L.close(),ge.hidden=!1,E.hidden=!1,se.open(xe()),fe()}function ot(h){let y=de(),C=y.attempts?y.attempts[h]:null;Ke=h,se.close(),ge.hidden=!0,E.hidden=!1,L.open({attempt_id:h,meta:ie(C)}),fe()}function bt(h){let y=de(),C=(Array.isArray(y.session_active)?y.session_active:[]).find(ve=>ve&&ve.bead_id===h),ce=(C&&Array.isArray(C.session_refs)?C.session_refs:[]).find(ve=>ve&&ve.current===!0);ce&&(se.close(),ge.hidden=!0,E.hidden=!1,L.open(Hr(ce,h,"in_progress")),fe())}function _t(){if(se.isOpen()&&se.refresh(xe()),!Ke)return;let h=de(),y=h.attempts?h.attempts[Ke]:null;if(y){L.updateMeta(ie(y));return}L.close()}function x(h,y){if(h.length===0||!i)return;let C=l?l():void 0;if(y.length===0||!C||y===C||!a){i(h);return}Promise.resolve(a(y)).then(()=>{i(h)}).catch(()=>{ke("\uB808\uD3EC \uC804\uD658\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error",2400)})}function A(h){let y=h.target;if(y?.closest?.(".worker-mini__grip"))return;let C=y?.closest?.(".worker-sort-chain__dir");if(C){let Me=Number.parseInt(C.getAttribute("data-step")||"",10);Number.isFinite(Me)&&S(df(ns(W),Me));return}let ce=y?.closest?.(".worker-dep__open");if(ce){x(ce.getAttribute("data-dep-id")||"",ce.getAttribute("data-root-dir")||"");return}let ve=y?.closest?.(".judgement-chip");if(ve){let Me=ve.closest("[data-bead-id]"),St=Me&&Me.getAttribute("data-bead-id")||"",Kt=ve.getAttribute("data-chip-key")||"";St&&Kt&&z.toggle({bead_id:St,chip_key:Kt});return}if(y?.closest?.(".chip-popover"))return;if(y?.closest?.(".worker-repo-strip")){Ve();return}let Oe=y?.closest?.(".worker-repo-op__dismiss");if(Oe){xt(Oe.dataset.operationId||"");return}let Ge=y?.closest?.(".worker-cleanup__resume");if(Ge){let Me=Ge.dataset.beadId;Me&&G(Me);return}if(y?.closest?.(".worker-hold__retry")){Re("worker-queue-hold-retry-now","\uC9C0\uAE08 \uC7AC\uC2DC\uB3C4 \uAC70\uBD80");return}if(y?.closest?.(".worker-hold__resume")){Re("worker-queue-hold-resume","\uC7AC\uAC1C \uAC70\uBD80");return}if(y?.closest?.(".worker-play")){ct(!de().auto_advance);return}let kt=y?.closest?.(".worker-merge-all");if(kt){kt.classList.contains("worker-merge-all--stop")?de().auto_merge===!0?We(!1):$t():We(!0);return}let Wt=y?.closest?.(".worker-pane__toggle[data-lane]");if(Wt){let Me=Wt.dataset.lane;(Me==="candidate"||Me==="queue"||Me==="running"||Me==="pr_wait"||Me==="done")&&T(Me);return}let Jt=y?.closest?.(".worker-wait__area-toggle[data-area]");if(Jt){let Me=Jt.dataset.area;(Me==="parallel"||Me==="serial")&&ye(Me);return}let dn=y?.closest?.(".worker-card__place-lane");if(dn){let Me=dn.dataset.beadId,St=dn.dataset.lane;Me&&(St==="parallel"||/^s[1-5]$/.test(St||""))&&(k=null,fe(),De(Me,St));return}if(y?.closest?.(".worker-card__place-cancel")){k=null,fe();return}let On=y?.closest?.(".worker-card__place");if(On){let Me=On.dataset.beadId;Me&&!On.disabled&&(Fe()?(k=Me,fe()):De(Me,"parallel"));return}let wn=y?.closest?.(".worker-filter__chip");if(wn){let Me=wn.dataset.spec;(Me==="all"||Me==="with"||Me==="without")&&p({...m,spec:Me});return}let Fn=y?.closest?.('[data-action="queue-remove"]');if(Fn){let Me=Fn.dataset.beadId||"";Me&&Xe.sendOp({type:"worker-queue-remove",payload:{bead_id:Me},root_dir:Ze()},Me);return}let Xt=y?.closest?.(".worker-mini__merge");if(Xt){let Me=Xt.dataset.beadId||"";de().cleanup_failed?.[Me]?G(Me):v(Me);return}let er=y?.closest?.(".worker-mini__merge-cancel");if(er){dt(er.dataset.beadId||"");return}let Ln=y?.closest?.(".worker-mini__discard");if(Ln){It(Ln.dataset.beadId||"",Ln.dataset.attemptId||null,Ln.dataset.discardMode==="merged"?"merged":"unmerged",Ln.dataset.operationId||null);return}let tr=y?.closest?.(".worker-mini__stale-continue");if(tr){Tt("worker-stale-work-continue",tr.dataset.beadId||"",tr.dataset.actionId||"");return}let In=y?.closest?.(".worker-mini__stale-backup");if(In){Tt("worker-stale-work-backup-fresh",In.dataset.beadId||"",In.dataset.actionId||"");return}let jn=y?.closest?.(".worker-mini__stale-recheck");if(jn){Tt("worker-stale-work-recheck",jn.dataset.beadId||"",jn.dataset.actionId||"");return}let _r=y?.closest?.(".worker-mini__revise-fix");if(_r){ft("worker-revise-fix",_r.dataset.beadId||"");return}let ze=y?.closest?.(".worker-mini__revise-approve");if(ze){ft("worker-revise-approve",ze.dataset.beadId||"");return}if(y?.closest?.(".worker-mini__pr"))return;let qt=y?.closest?.(".rtile__failure-badge");if(qt){let Me=qt.dataset.attemptId||"";R=R===Me?null:Me,fe();return}let bn=y?.closest?.(".rtile__attempt-copy");if(bn){let Me=bn.dataset.attemptId||"";Me&&on(Me).then(St=>{ke(St?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",St?"success":"error",1400)});return}if(y?.closest?.(".rtile__parked-retry")){let Me=y?.closest?.(".rtile");Ie(Me?.dataset?.beadId||"",Me?.dataset?.attemptId||"");return}let lo=y?.closest?.(".rtile__discard");if(lo){let Me=y?.closest?.(".rtile"),St=Me?.dataset?.beadId,Kt=Me?.dataset?.attemptId;St&&It(St,Kt||null,lo.dataset.confirmation==="merged"?"merged":"unmerged",lo.dataset.operationId||null);return}if(y?.closest?.(".rtile__pause")){let St=y?.closest?.(".rtile")?.dataset?.attemptId;St&&Ne(St);return}if(y?.closest?.(".rtile__resume")){let Me=y?.closest?.(".rtile__resume"),Kt=y?.closest?.(".rtile")?.dataset?.attemptId;Kt&&at(Kt,Me?.dataset?.resumeKind==="settlement"?"settlement":"session");return}if(y?.closest?.(".rtile__session")){let Me=y?.closest?.(".rtile"),St=Me?.dataset?.attemptId;if(St){ot(St);return}let Kt=Me?.dataset?.beadId;Kt&&bt(Kt);return}if(y?.closest?.(".rtile__failure-pop"))return;if(y?.closest?.(".worker-drawer-overlay__backdrop")){se.close(),L.close();return}if(y?.closest?.(".worker-drawer-host"))return;let os=y?.closest?.(".rtile .board-card__roll-toggle");if(os){let Me=os.dataset.rollParent;Me&&(re.has(Me)?re.delete(Me):re.add(Me),fe());return}let ss=y?.closest?.(".rtile .board-card__roll-child");if(ss){let Me=ss.dataset.childId;Me&&i&&i(Me);return}let co=y?.closest?.(".rtile");if(co){if(y?.closest?.(".rtile__id")){let St=co.dataset.beadId;St&&on(St).then(Kt=>{Kt?ke("\uBCF5\uC0AC\uB428","success",1200):ke("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}let Me=co.dataset.beadId;Me&&i&&i(Me);return}let is=y?.closest?.(".worker-mini, .worker-card");if(is){let Me=is.dataset.beadId;if(y?.closest?.('[data-seam="log-path-copy"]'))return;if(y?.closest?.(".worker-mini__id, .worker-card__id")){Me&&on(Me).then(Kt=>{Kt?ke("\uBCF5\uC0AC\uB428","success",1200):ke("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}let St=y?.closest?.(".ctl-chip--from");if(St){let Kt=St.dataset.fromId;Kt&&i&&i(Kt);return}Me&&i&&i(Me)}}Xe.attach(e),e.addEventListener("click",A),e.addEventListener("change",V);function Le(h){let y=h.target,C=y&&typeof y.closest=="function"?ce=>y.closest(ce):()=>null;R&&!C(".rtile__failure-pop, .rtile__failure-badge")&&(R=null,fe())}function qe(h){h.key!=="Escape"||R===null||(R=null,fe())}return document.addEventListener("click",Le),document.addEventListener("keydown",qe),z.attach(),he.push(()=>{document.removeEventListener("click",Le),document.removeEventListener("keydown",qe),z.detach()}),b(),g&&he.push(g.subscribe(()=>{pe.notifyIssuesChanged(),fe()})),o&&he.push(o.subscribe(()=>{let h=l&&l()||"";h!==me&&(me=h,ae.close()),fe(),_t()})),fe(),{load(){pe.ensureSessionDefaults(),fe()},refreshSessionDefaults:P,destroy(){for(let h of he.splice(0))try{h()}catch{}Xe.detach(),e.removeEventListener("click",A),e.removeEventListener("change",V),pe.destroy();try{L.destroy()}catch{}E.hidden=!0;try{ae.destroy()}catch{}rt(c``,e)}}}function Al(e){if(!e)return"Unknown";let t=e.split("/").filter(Boolean);return t.length>0?t[t.length-1]:"Unknown"}function Pf(e,t,n,r=async()=>{},o=async()=>{}){let s=Lt("views:workspace-picker"),i=null,l=!1,a=!1,u=!1;async function d(I){let U=I.target.value,M=t.getState().workspace?.current?.path||"";if(U&&U!==M){s("switching workspace to %s",U),l=!0,O();try{await n(U)}catch(B){s("workspace switch failed: %o",B)}finally{l=!1,O()}}}async function f(){let I=t.getState(),F=I.workspace?.current?.path||I.workspace?.available?.[0]?.path||"";if(!(!F||a)){s("git-pulling workspace %s",F),a=!0,O();try{await r(F)}catch(U){s("workspace git pull failed: %o",U)}finally{a=!1,O()}}}function g(I){let F=I.target;F&&e.contains(F)||R()}function m(I){I.key==="Escape"&&R()}function k(){u||(u=!0,document.addEventListener("mousedown",g),document.addEventListener("keydown",m),O())}function R(){u&&(u=!1,document.removeEventListener("mousedown",g),document.removeEventListener("keydown",m),O())}function z(){u?R():k()}async function X(I){let F=I.target,U=F.value,ue=F.checked;s("toggling visibility %s \u2192 %s",U,String(ue));try{await o(U,ue)}catch(M){s("workspace visibility toggle failed: %o",M)}}function ee(I){return I?c`
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
    `:c``}function W(I,F){return c`
      <div class="workspace-picker__manage">
        <button
          type="button"
          class="workspace-picker__manage-button"
          @click=${z}
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
                ${I.map(U=>c`
                    <label
                      class="workspace-picker__manage-row"
                      title="${U.path}"
                    >
                      <input
                        type="checkbox"
                        class="workspace-picker__manage-checkbox"
                        value="${U.path}"
                        .checked=${!F.has(U.path)}
                        @change=${X}
                      />
                      <span class="workspace-picker__manage-name"
                        >${Al(U.path)}</span
                      >
                    </label>
                  `)}
              </div>
            `:""}
      </div>
    `}function q(){let I=t.getState(),F=I.workspace?.current,U=I.workspace?.available||[],ue=new Set(I.workspace?.hidden||[]),M=F?.path||U[0]?.path||"";if(U.length===0)return c``;let B=U.filter(Q=>!ue.has(Q.path)||Q.path===M);if(B.length<=1){let Q=B[0]||U[0],re=Al(Q.path);return c`
        <div class="workspace-picker workspace-picker--single">
          <span class="workspace-picker__label" title="${Q.path}"
            >${re}</span
          >
          ${W(U,ue)}
          ${ee(M)}
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
          ${B.map(Q=>c`
              <option
                value="${Q.path}"
                ?selected=${Q.path===M}
                title="${Q.path}"
              >
                ${Al(Q.path)}
              </option>
            `)}
        </select>
        ${W(U,ue)}
        ${ee(M)}
        ${l||a?c`<span
              class="workspace-picker__loading"
              aria-hidden="true"
            ></span>`:""}
      </div>
    `}function O(){rt(q(),e)}return O(),i=t.subscribe(()=>O()),{destroy(){i&&(i(),i=null),document.removeEventListener("mousedown",g),document.removeEventListener("keydown",m),rt(c``,e)}}}var Df=["update-status","edit-text","update-priority","create-issue","dep-add","dep-remove","update-assignee","update-exec-settings","update-impl-target","get-session-defaults","set-session-defaults","get-workspace-accounts","set-workspace-accounts","update-workflow-meta","label-add","label-remove","subscribe-list","unsubscribe-list","snapshot","upsert","delete","get-comments","add-comment","delete-issue","list-workspaces","set-workspace","set-workspace-visibility","get-workspace","workspace-changed","git-pull-workspace","subscribe-worker-queue","unsubscribe-worker-queue","worker-queue-snapshot","worker-queue-place","worker-queue-reorder","worker-queue-toggle","worker-automation-toggle","worker-repo-ops-opt-out-toggle","worker-repo-operation-dismiss","worker-repo-operation-deploy-run","worker-queue-set-slots","worker-queue-set-serial-lane-count","worker-queue-set-orchestration-defaults","worker-queue-remove","worker-attempt-pause","worker-attempt-stop","worker-attempt-resume","worker-cleanup-retry","worker-parked-retry","worker-queue-hold-resume","worker-queue-hold-retry-now","worker-merge-queue-add","worker-merge-queue-add-all","worker-merge-auto-toggle","worker-merge-queue-remove","worker-discard","worker-stale-work-continue","worker-stale-work-backup-fresh","worker-stale-work-recheck","worker-pr-discard","worker-revise-fix","worker-revise-approve","subscribe-ui-order","unsubscribe-ui-order","ui-order-set","ui-order-snapshot","subscribe-display-policy","unsubscribe-display-policy","display-policy-set","display-policy-snapshot","subscribe-session-log","unsubscribe-session-log","session-log-snapshot","session-log-append","get-attempt-prompt","get-bead-prompt","get-bead-timeline","get-worker-system-prompt","get-session-refs","subscribe-monitor-pipeline","unsubscribe-monitor-pipeline","monitor-pipeline-snapshot","subscribe-impl-presets","unsubscribe-impl-presets","impl-presets-snapshot","impl-preset-create","impl-preset-update","impl-preset-delete","apply-impl-preset","apply-impl-preset-global","monitor-auto-toggle","monitor-lane-create","monitor-lane-update","monitor-lane-confirm","monitor-lane-remove"];function Sl(){let e=Date.now().toString(36),t=Math.random().toString(36).slice(2,8);return`${e}-${t}`}function Nf(e,t,n=Sl()){return{id:n,type:e,payload:t}}function qf(e={}){let t=Lt("ws"),n={initialMs:e.backoff?.initialMs??1e3,maxMs:e.backoff?.maxMs??3e4,factor:e.backoff?.factor??2,jitterRatio:e.backoff?.jitterRatio??.2},r=()=>e.url&&e.url.length>0?e.url:typeof location<"u"?(location.protocol==="https:"?"wss://":"ws://")+location.host+"/ws":"ws://localhost/ws",o=null,s="closed",i=0,l=null,a=!0,u=new Map,d=[],f=new Map,g=new Set;function m(q){for(let O of Array.from(g))try{O(q)}catch{}}function k(){if(!a||l)return;s="reconnecting",t("ws reconnecting\u2026"),m(s);let q=Math.min(n.maxMs||0,(n.initialMs||0)*Math.pow(n.factor||1,i)),O=(n.jitterRatio||0)*q,I=Math.max(0,Math.round(q+(Math.random()*2-1)*O));t("ws retry in %d ms (attempt %d)",I,i+1),l=setTimeout(()=>{l=null,W()},I)}function R(q){try{o?.send(JSON.stringify(q))}catch(O){t("ws send failed",O)}}function z(){for(s="open",t("ws open"),m(s),i=0;d.length;){let q=d.shift();q&&R(q)}}function X(q){let O;try{O=JSON.parse(String(q.data))}catch{t("ws received non-JSON message");return}if(!O||typeof O.id!="string"||typeof O.type!="string"){t("ws received invalid envelope");return}if(u.has(O.id)){let F=u.get(O.id);u.delete(O.id),O.ok?F?.resolve(O.payload):F?.reject(O.error||new Error("ws error"));return}let I=f.get(O.type);if(I&&I.size>0)for(let F of Array.from(I))try{F(O.payload)}catch(U){t("ws event handler error",U)}else t("ws received unhandled message type: %s",O.type)}function ee(){s="closed",t("ws closed"),m(s);for(let[q,O]of u.entries())O.reject(new Error("ws disconnected")),u.delete(q);i+=1,k()}function W(){if(!a)return;let q=r();try{o=new WebSocket(q),t("ws connecting %s",q),s="connecting",m(s),o.addEventListener("open",z),o.addEventListener("message",X),o.addEventListener("error",()=>{}),o.addEventListener("close",ee)}catch(O){t("ws connect failed %o",O),k()}}return W(),{send(q,O){if(!Df.includes(q))return Promise.reject(new Error(`unknown message type: ${q}`));let I=Sl(),F=Nf(q,O,I);return t("send %s id=%s",q,I),new Promise((U,ue)=>{u.set(I,{resolve:U,reject:ue,type:q}),o&&o.readyState===o.OPEN?R(F):(t("queue %s id=%s (state=%s)",q,I,s),d.push(F))})},on(q,O){f.has(q)||f.set(q,new Set);let I=f.get(q);return I?.add(O),()=>{I?.delete(O)}},onConnection(q){return g.add(q),()=>{g.delete(q)}},reconnect(){a=!0,l&&(clearTimeout(l),l=null),i=0,W()},close(){a=!1,l&&(clearTimeout(l),l=null);try{o?.close()}catch{}},getState(){return s}}}function Kv(){let e=window.__BDUI_BOOTSTRAP__;return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:null}}}async function Yv(e,t){try{let r=await(await fetch("/api/config")).json();e.setState({config:r})}catch(n){t("config refresh failed",n)}}var El=[["tab:board:ready","ready-issues"],["tab:board:blocked","blocked-issues"],["tab:board:in-progress","in-progress-issues"],["tab:board:resolved","resolved-issues"],["tab:board:deferred","deferred-issues"],["tab:board:closed","closed-issues"]],Ff=[["tab:worker:ready","ready-issues"],["tab:worker:blocked","blocked-issues"],["tab:worker:in-progress","in-progress-issues"],["tab:worker:resolved","resolved-issues"],["tab:worker:closed","closed-issues"]],pr="tab:worker:closed",Vv="bdui.worker.done-range",jf=Dp,Bf="worker:queue",Uf="ui:order",Wf="ui:display-policy",zf="exec:presets",fr="tab:board:closed",Hf="beads-ui.board.closed-range";function Xv(e){if(!e)return()=>{};function t(r){document.documentElement.style.setProperty("--app-header-h",`${Math.round(r)}px`)}if(t(e.getBoundingClientRect().height),typeof ResizeObserver!="function")return()=>{};let n=new ResizeObserver(r=>{for(let o of r)t(o.contentRect.height+Qv(e))});return n.observe(e),()=>n.disconnect()}function Qv(e){let t=getComputedStyle(e);return[t.paddingTop,t.paddingBottom,t.borderTopWidth,t.borderBottomWidth].reduce((r,o)=>r+(parseFloat(o)||0),0)}function Zv(e){let t=Lt("main");t("bootstrap start"),Xv(document.querySelector(".app-header"));let n=c`
    <section id="board-root" class="route board"></section>
    <section id="worker-root" class="route worker" hidden></section>
    <section id="monitor-root" class="route monitor" hidden></section>
    <section id="detail-panel" class="route detail" hidden></section>
  `;rt(n,e);let r=document.getElementById("global-nav"),o=document.getElementById("top-nav"),s=document.getElementById("repo-scope"),i=document.getElementById("usage-meter"),l=document.getElementById("board-root"),a=document.getElementById("worker-root"),u=document.getElementById("monitor-root"),d=document.getElementById("detail-panel");if(i&&nf(i),l&&a&&u&&d){let Ce=function(x,A){let Le="Request failed",qe="";if(x&&typeof x=="object"){let y=x;if(typeof y.message=="string"&&y.message.length>0&&(Le=y.message),typeof y.details=="string")qe=y.details;else if(y.details&&typeof y.details=="object")try{qe=JSON.stringify(y.details,null,2)}catch{qe=""}}else typeof x=="string"&&x.length>0&&(Le=x);let h=A&&A.length>0?`Failed to load ${A}`:"Request failed";Z.open(h,Le,qe)},Ne=function(x){return`${_e.getState().workspace.current?.path||""}\0${x}`},at=function(){we&&(we().catch(()=>{}),we=null),de=null,Fe=null},v=function(x){He=x;let A=()=>{He!==x||_e.getState().selected_id!==x||(He=null,Je(x))};if(!Y){De.then(A);return}A()},je=function(x,A,Le,qe,h){return Le!==Ie[A]?(h().catch(()=>{}),!1):(x.set(qe,h),!0)},dt=function(){let x=_e.getState();ct(x.view==="board"),$(x.view==="worker"),Ye(Be(x)),te(x.view==="board"||x.view==="worker"||We||!!x.selected_id)},Tt=function(){let x=vr($t);return x===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:x}}},ft=function(){let x=vr(It);return x===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:x}}},ct=function(x){if(x)for(let[A,Le]of El){if(G.has(A)||Re.has(A))continue;let qe=A===fr?Tt():{type:Le};try{Pe.register(A,qe)}catch(C){t("register %s store failed: %o",A,C)}Re.add(A);let h=Ie.board,y=!1;be.subscribeList(A,qe).then(C=>{y=!je(G,"board",h,A,C)}).catch(C=>{t("subscribe %s failed: %o",A,C),Ce(C,"board")}).finally(()=>{Re.delete(A),y&&dt()})}else Mt()},Mt=function(){Ie.board+=1;for(let[x]of El){let A=G.get(x);A&&(A().catch(()=>{}),G.delete(x));try{Pe.unregister(x)}catch(Le){t("unregister %s failed: %o",x,Le)}}},$=function(x){if(!x){N();return}for(let[A,Le]of Ff){if(oe.has(A)||Re.has(A))continue;let qe=A===pr?ft():{type:Le};try{Pe.register(A,qe)}catch(C){t("register %s store failed: %o",A,C)}Re.add(A);let h=Ie.worker,y=!1;be.subscribeList(A,qe).then(C=>{y=!je(oe,"worker",h,A,C)}).catch(C=>{t("subscribe %s failed: %o",A,C),Ce(C,"worker")}).finally(()=>{Re.delete(A),y&&dt()})}},N=function(){Ie.worker+=1;for(let[x]of Ff){let A=oe.get(x);A&&(A().catch(()=>{}),oe.delete(x));try{Pe.unregister(x)}catch(Le){t("unregister %s failed: %o",x,Le)}}},te=function(x){if(!x){ne();return}J||(Te("subscribe-worker-queue",{id:Bf}).catch(A=>{t("subscribe-worker-queue failed: %o",A)}),J=()=>Te("unsubscribe-worker-queue",{id:Bf}))},ne=function(){J&&(J().catch(()=>{}),J=null)},Be=function(x){return x.view==="monitor"||x.selected_id!=null},Ye=function(x){if(!x){et();return}le||(Te("subscribe-monitor-pipeline",{id:jf}).catch(A=>{t("subscribe-monitor-pipeline failed: %o",A)}),le=()=>Te("unsubscribe-monitor-pipeline",{id:jf}))},et=function(){le&&(le().catch(()=>{}),le=null)},ht=function(){Ue||(Te("subscribe-ui-order",{id:Uf}).catch(x=>{t("subscribe-ui-order failed: %o",x)}),Ue=()=>Te("unsubscribe-ui-order",{id:Uf}))},Rt=function(){Ue&&(Ue().catch(()=>{}),Ue=null),L.clear()},tn=function(){yt||(Te("subscribe-display-policy",{id:Wf}).catch(x=>{t("subscribe-display-policy failed: %o",x)}),yt=()=>Te("unsubscribe-display-policy",{id:Wf}))},wt=function(){yt&&(yt().catch(()=>{}),yt=null),se.clear()},jt=function(){Ot||(Te("subscribe-impl-presets",{id:zf}).catch(x=>{t("subscribe-impl-presets failed: %o",x)}),Ot=()=>Te("unsubscribe-impl-presets",{id:zf}))},Nt=function(x){if(!x)return"Unknown";let A=x.split("/").filter(Boolean);return A.length>0?A[A.length-1]:"Unknown"},V=function(x,A){K.open(x.path,{missing_state:x.missing_state,...A?{workspace:A}:{}})};var f=Ce,g=Ne,m=at,k=v,R=je,z=dt,X=Tt,ee=ft,W=ct,q=Mt,O=$,I=N,F=te,U=ne,ue=Be,M=Ye,B=et,Q=ht,re=Rt,Ee=tn,he=wt,pe=jt,P=Nt,Ae=V;let Se=document.getElementById("header-loading"),E=hc(Se),Z=cp(e),ge=qf(),Te=E.wrapSend((x,A)=>ge.send(x,A)),be=uc(Te),Pe=dc(),Xe=fc(),Ke=Wl(),L=pc(),se=Bl(),ae=Ul(),me=zl();ge.on("impl-presets-snapshot",x=>{let A=x;A&&typeof A.revision=="number"&&Array.isArray(A.presets)&&ae.set({revision:A.revision,presets:A.presets})}),ge.on("monitor-pipeline-snapshot",x=>{let A=x;if(!(!A||!Array.isArray(A.workspaces)))try{Ke.set(A.workspaces,A.workspaces_state,A.cross_lanes)}catch{}}),ge.on("ui-order-snapshot",x=>{let A=x;if(A&&typeof A.revision=="number")try{L.set({revision:A.revision,order:A.order&&typeof A.order=="object"?A.order:{}})}catch{}}),ge.on("display-policy-snapshot",x=>{let A=x;if(A&&A.policy&&typeof A.policy=="object")try{se.set(A.policy)}catch{}}),ge.on("session-log-snapshot",x=>{let A=x;if(A&&typeof A.id=="string")try{me.set(A.id,Array.isArray(A.lines)?A.lines:[],typeof A.last_event_at=="number"?A.last_event_at:null)}catch{}}),ge.on("session-log-append",x=>{let A=x;if(A&&typeof A.id=="string")try{me.append(A.id,A.event)}catch{}}),ge.on("snapshot",x=>{let A=x,Le=A&&typeof A.id=="string"?A.id:"",qe=Le?Pe.getStore(Le):null;if(qe&&A&&A.type==="snapshot")try{qe.applyPush(A)}catch{}}),ge.on("upsert",x=>{let A=x,Le=A&&typeof A.id=="string"?A.id:"",qe=Le?Pe.getStore(Le):null;if(qe&&A&&A.type==="upsert")try{qe.applyPush(A)}catch{}}),ge.on("delete",x=>{let A=x,Le=A&&typeof A.id=="string"?A.id:"",qe=Le?Pe.getStore(Le):null;if(qe&&A&&A.type==="delete")try{qe.applyPush(A)}catch{}});let we=null,de=null,Fe=null,He=null,Ze=()=>{},De=new Promise(x=>{Ze=()=>x(void 0)}),Y=!1,j=!1;async function Je(x){let A=Ne(x);if(A===de||A===Fe)return;Fe=A;let Le=`detail:${x}`,qe={type:"issue-detail",params:{id:x}};try{Pe.register(Le,qe)}catch(h){t("register detail store failed: %o",h)}try{let h=await be.subscribeList(Le,qe);if(_e.getState().selected_id!==x||Ne(x)!==A){await h().catch(()=>{});return}we&&await we().catch(()=>{}),we=h,de=A}catch(h){t("detail subscribe failed: %o",h),Ce(h,"issue details")}finally{Fe===A&&(Fe=null)}}let G=new Map,Re=new Set,Ie={board:0,worker:0},We=!1,$t=fs;try{let x=window.localStorage.getItem(Hf);Ki(x)&&($t=x)}catch{}let It="today";try{let x=window.localStorage.getItem(Vv);x!==null&&(It=Mn(x))}catch{}async function xt(x){if(!Ki(x)||x===$t)return;$t=x;try{window.localStorage.setItem(Hf,x)}catch{}let A=G.get(fr);if(!A)return;G.delete(fr),await A().catch(()=>{});let Le=Tt();try{Pe.register(fr,Le)}catch(qe){t("register %s store failed: %o",fr,qe)}try{let qe=await be.subscribeList(fr,Le);G.set(fr,qe)}catch(qe){t("re-subscribe %s failed: %o",fr,qe),Ce(qe,"board")}}async function Ct(x){let A=Mn(x);if(A===It)return;It=A;let Le=oe.get(pr);if(!Le)return;oe.delete(pr),await Le().catch(()=>{});let qe=ft();try{Pe.register(pr,qe)}catch(h){t("register %s store failed: %o",pr,h)}try{let h=await be.subscribeList(pr,qe);oe.set(pr,h)}catch(h){t("re-subscribe %s failed: %o",pr,h),Ce(h,"worker")}}let oe=new Map,J=null,le=null,Ue=null,yt=null,Ot=null;async function lt(){yt=null,se.clear(),Ot=null,ae.clear(),J=null,le=null,G.clear(),oe.clear(),Ie.board+=1,Ie.worker+=1,jt();let x=_e.getState().workspace.current?.path;if(x)try{await ge.send("set-workspace",{path:x})}catch(Le){t("workspace restore after reconnect failed: %o",Le);return}tn();let A=_e.getState();ct(A.view==="board"),$(A.view==="worker"),Ye(Be(A)),te(A.view==="board"||A.view==="worker"||!!A.selected_id)}async function Ht(){t("clearing all subscriptions for workspace switch"),Mt(),N(),ne(),Xe.clear(),Rt(),ht(),wt(),tn(),at();let x=_e.getState();if(x.selected_id)try{Pe.unregister(`detail:${x.selected_id}`)}catch{}let A=_e.getState();ct(A.view==="board"),$(A.view==="worker"),Ye(Be(A)),te(A.view==="board"||A.view==="worker"||!!A.selected_id),A.selected_id&&v(A.selected_id)}async function Gt(x){t("requesting workspace switch to %s",x),j=!0;try{let A=await ge.send("set-workspace",{path:x});t("workspace switch result: %o",A),A&&A.workspace&&(_e.setState({workspace:{current:{path:A.workspace.root_dir,database:A.workspace.db_path}}}),window.localStorage.setItem("beads-ui.workspace",x),A.changed&&(await Ht(),ke("Switched to "+Nt(x),"success",2e3)))}catch(A){throw t("workspace switch failed: %o",A),ke("Failed to switch workspace","error",3e3),A}finally{j=!1}}async function Bt(x){t("requesting workspace git pull for %s",x);try{let A=await ge.send("git-pull-workspace",{});t("workspace git pull result: %o",A);let Le=A?.status;if(Le==="up_to_date"){ke("Already up to date","success",2e3);return}if(Le==="stash_pop_conflict"){ke("Git pulled, but stash pop conflicted (check git stash list)","warning",4e3);return}ke("Git pulled "+Nt(x),"success",2e3)}catch(A){t("workspace git pull failed: %o",A);let Le=A?.code,qe=A?.message;if(Le==="rebase_conflict"){ke("Git pull conflicts \u2014 reverted (manual resolve required)","error",4e3);return}if(Le==="rebase_conflict_abort_failed"){ke("Git pull conflicts AND rebase --abort failed \u2014 repo left mid-rebase, run 'git rebase --abort' manually","error",6e3);return}if(Le==="busy"){ke("Git pull skipped: another operation is running","warning",3e3);return}let h=qe?`: ${qe}`:"";throw ke(`Git pull failed${h}`,"error",3e3),A}}async function un(x,A){t("setting workspace visibility %s \u2192 %s",x,String(A));try{await ge.send("set-workspace-visibility",{path:x,visible:A}),await Vt()}catch(Le){t("workspace visibility update failed: %o",Le),ke("Failed to update project visibility","error",3e3)}}async function Vt(){try{let x=await ge.send("list-workspaces",{});if(t("workspaces loaded: %o",x),x&&Array.isArray(x.workspaces)){let A=x.workspaces.map(y=>({path:y.path,database:y.database,pid:y.pid,version:y.version})),Le=x.current?{path:x.current.root_dir,database:x.current.db_path}:null,qe=Array.isArray(x.hidden)?x.hidden.filter(y=>typeof y=="string"):[];_e.setState({workspace:{current:Le,available:A,hidden:qe}});let h=window.localStorage.getItem("beads-ui.workspace");h&&(!A.some(C=>C.path===h)||qe.includes(h)?window.localStorage.removeItem("beads-ui.workspace"):Le&&h!==Le.path&&(t("restoring saved workspace preference: %s",h),await Gt(h)))}}catch(x){t("failed to load workspaces: %o",x)}}ge.on("workspace-changed",x=>{t("workspace-changed event: %o",x),x&&x.root_dir&&(_e.setState({workspace:{current:{path:x.root_dir,database:x.db_path}}}),Vt(),Ht())});let Ut=!1;if(typeof ge.onConnection=="function"){let x=A=>{t("ws state %s",A),A==="reconnecting"||A==="closed"?(Ut=!0,ke("Connection lost. Reconnecting\u2026","error",4e3)):A==="open"&&Ut&&(Ut=!1,ke("Reconnected","success",2200),Yv(_e,(Le,qe)=>{t(`${Le}: %o`,qe)}),lt())};ge.onConnection(x)}let Zt="board";try{let x=window.localStorage.getItem("beads-ui.view");(x==="board"||x==="worker"||x==="monitor")&&(Zt=x)}catch(x){t("view parse error: %o",x)}let _e=gc({config:Kv(),view:Zt});ge.on("worker-queue-snapshot",x=>{let A=x;if(!A||!A.queue)return;let Le=_e.getState().workspace.current?.path;if(typeof Le=="string"&&Le.length>0&&A.root_dir!==Le){t("dropping worker-queue snapshot for %s",String(A.root_dir));return}try{Xe.set(A.queue)}catch{}});let T=_c(_e);T.start();let ye=new Set(["get-comments","dep-add","dep-remove","impl-preset-create","impl-preset-update","impl-preset-delete","apply-impl-preset","apply-impl-preset-global","get-session-defaults","set-session-defaults","monitor-lane-create","monitor-lane-update","monitor-lane-confirm","monitor-lane-remove"]),fe=async(x,A)=>{try{return await Te(x,A)}catch(Le){if(ye.has(x))throw Le;return[]}};qp({global_element:r,repo_element:o},_e,T);let b=document.getElementById("workspace-picker");b&&Pf(b,_e,Gt,Bt,un);let p=Up(e,(x,A)=>Te(x,A));try{let x=document.getElementById("new-issue-btn");x&&x.addEventListener("click",()=>p.open())}catch{}let _=Gp(e,{policyStore:se,queueStore:Xe,implPresetStore:ae,transport:(x,A)=>Te(x,A),onOpenChange:x=>{let A=We;We=x,dt(),A&&x===!1&&xe.refreshSessionDefaults()},labelOptions:()=>{let x=new Set;for(let[A]of El)for(let Le of Pe.snapshotFor(A)||[]){let qe=Le.labels;if(Array.isArray(qe))for(let h of qe)typeof h=="string"&&h.length>0&&x.add(h)}return Array.from(x).sort()}});try{let x=document.getElementById("display-settings-btn");x&&(x.setAttribute("aria-label","\uC124\uC815"),x.setAttribute("title","\uC124\uC815"),x.addEventListener("click",()=>_.open()))}catch{}let S=document.createElement("div");S.className="md-viewer-root",document.body.appendChild(S);let K=Si(S,{getWorkspacePath:()=>_e.getState().workspace.current?.path}),ie=Ic(l,{gotoIssue:x=>T.gotoIssue(x),issueStores:Pe,transport:fe,workerQueueStore:Xe,uiOrderStore:L,displayPolicyStore:se,closedRange:$t,onClosedRangeChange:x=>{xt(x)},onNewIssue:()=>p.open(),openDoc:V}),xe=xl(a,{transport:fe,issueStores:Pe,queueStore:Xe,sessionLogStore:me,gotoIssue:x=>_e.setState({selected_id:x}),getWorkspacePath:()=>_e.getState().workspace.current?.path,switchWorkspace:x=>Gt(x),openDoc:V,doneRange:It,onDoneRangeChange:x=>{Ct(x)}}),Ve=Np(u,{transport:fe,pipelineStore:Ke,execPresetStore:ae,sessionLogStore:me,router:T,gotoIssue:x=>T.gotoIssue(x),getWorkspacePath:()=>_e.getState().workspace.current?.path,switchWorkspace:x=>Gt(x),openDoc:V}),ot=lp(d,{issueStores:Pe,transport:fe,queueStore:Xe,execPresetStore:ae,sessionLogStore:me,getWorkspacePath:()=>_e.getState().workspace.current?.path,mdViewer:K,depCandidates:()=>{let x=Ke.get();if(x===null)return null;let A=Ke.getWorkspacesState(),Le=_e.getState();if(Le.view==="monitor")return qa(x,A);let qe=Le.workspace.current?.path;return qe?qa(x,A,{root_dir:qe}):null},subscribeCandidates:x=>Ke.subscribe(x),onDepChanged:({type:x,a:A,b:Le})=>{let qe=Ve;x==="dep-add"&&qe&&typeof qe.recorrectSharedLane=="function"&&qe.recorrectSharedLane(x,A,Le)},onNavigate:(x,A)=>{let Le=()=>{_e.getState().view==="worker"?_e.setState({selected_id:x}):T.gotoIssue(x)},qe=_e.getState().workspace.current?.path;if(typeof A!="string"||A.length===0||!qe||A===qe){Le();return}Promise.resolve(Gt(A)).then(Le).catch(()=>{ke("\uB808\uD3EC \uC804\uD658\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error",2400)})},onClose:()=>{let x=_e.getState();_e.setState({selected_id:null});try{T.gotoView(x.view==="worker"||x.view==="monitor"?x.view:"board")}catch{}},onOpenExecPresets:()=>{_.open("execution")}}),bt=_e.getState().selected_id;bt&&(d.hidden=!1,ot.load(bt),v(bt)),_e.subscribe(x=>{let A=x.selected_id;A?(d.hidden=!1,ot.load(A),j||v(A)):(ot.clear(),d.hidden=!0,at())});let _t=x=>{l.hidden=x.view!=="board",a.hidden=x.view!=="worker",u.hidden=x.view!=="monitor",s&&s.classList.toggle("is-quiet",x.view==="monitor"),ct(x.view==="board"),$(x.view==="worker"),Ye(Be(x)),te(x.view==="board"||x.view==="worker"||We||!!x.selected_id),!x.selected_id&&x.view==="board"&&ie.load(),x.view==="worker"&&xe.load(),x.view==="monitor"?Ve.load():Ve.pause(),window.localStorage.setItem("beads-ui.view",x.view)};_e.subscribe(_t),_t(_e.getState()),ht(),tn(),jt(),Vt().finally(()=>{Y=!0,Ze()}),window.addEventListener("keydown",x=>{let A=x.ctrlKey||x.metaKey,Le=String(x.key||"").toLowerCase(),qe=x.target,h=qe&&qe.tagName?String(qe.tagName).toLowerCase():"",y=h==="input"||h==="textarea"||h==="select"||qe&&typeof qe.isContentEditable=="boolean"&&qe.isContentEditable;A&&Le==="n"&&(y||(x.preventDefault(),p.open()))})}}typeof window<"u"&&typeof document<"u"&&window.addEventListener("DOMContentLoaded",()=>{try{let n=window.localStorage.getItem("beads-ui.theme"),r=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches,o=n==="dark"||n==="light"?n:r?"dark":"light";document.documentElement.setAttribute("data-theme",o);let s=document.getElementById("theme-switch");s&&(s.checked=o==="dark")}catch{}let e=document.getElementById("theme-switch");e&&e.addEventListener("change",()=>{let n=e.checked?"dark":"light";document.documentElement.setAttribute("data-theme",n),window.localStorage.setItem("beads-ui.theme",n)});let t=document.getElementById("app");t&&Zv(t)});export{Zv as bootstrap,Kv as readBootstrapConfig,Yv as refreshConfigSnapshot};
//# sourceMappingURL=main.bundle.js.map
