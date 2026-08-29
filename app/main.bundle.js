var Vf=Object.create;var ji=Object.defineProperty;var Xf=Object.getOwnPropertyDescriptor;var Qf=Object.getOwnPropertyNames;var Zf=Object.getPrototypeOf,Jf=Object.prototype.hasOwnProperty;var e_=(e,t,n)=>t in e?ji(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var Bi=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var t_=(e,t,n,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let o of Qf(t))!Jf.call(e,o)&&o!==n&&ji(e,o,{get:()=>t[o],enumerable:!(r=Xf(t,o))||r.enumerable});return e};var n_=(e,t,n)=>(n=e!=null?Vf(Zf(e)):{},t_(t||!e||!e.__esModule?ji(n,"default",{value:e,enumerable:!0}):n,e));var St=(e,t,n)=>e_(e,typeof t!="symbol"?t+"":t,n);var Gl=Bi((iw,Hl)=>{var Pr=1e3,Dr=Pr*60,Nr=Dr*60,vr=Nr*24,s_=vr*7,i_=vr*365.25;Hl.exports=function(e,t){t=t||{};var n=typeof e;if(n==="string"&&e.length>0)return a_(e);if(n==="number"&&isFinite(e))return t.long?c_(e):l_(e);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(e))};function a_(e){if(e=String(e),!(e.length>100)){var t=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(e);if(t){var n=parseFloat(t[1]),r=(t[2]||"ms").toLowerCase();switch(r){case"years":case"year":case"yrs":case"yr":case"y":return n*i_;case"weeks":case"week":case"w":return n*s_;case"days":case"day":case"d":return n*vr;case"hours":case"hour":case"hrs":case"hr":case"h":return n*Nr;case"minutes":case"minute":case"mins":case"min":case"m":return n*Dr;case"seconds":case"second":case"secs":case"sec":case"s":return n*Pr;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return n;default:return}}}}function l_(e){var t=Math.abs(e);return t>=vr?Math.round(e/vr)+"d":t>=Nr?Math.round(e/Nr)+"h":t>=Dr?Math.round(e/Dr)+"m":t>=Pr?Math.round(e/Pr)+"s":e+"ms"}function c_(e){var t=Math.abs(e);return t>=vr?_s(e,t,vr,"day"):t>=Nr?_s(e,t,Nr,"hour"):t>=Dr?_s(e,t,Dr,"minute"):t>=Pr?_s(e,t,Pr,"second"):e+" ms"}function _s(e,t,n,r){var o=t>=n*1.5;return Math.round(e/n)+" "+r+(o?"s":"")}});var Yl=Bi((aw,Kl)=>{function u_(e){n.debug=n,n.default=n,n.coerce=a,n.disable=i,n.enable=o,n.enabled=l,n.humanize=Gl(),n.destroy=u,Object.keys(e).forEach(d=>{n[d]=e[d]}),n.names=[],n.skips=[],n.formatters={};function t(d){let f=0;for(let h=0;h<d.length;h++)f=(f<<5)-f+d.charCodeAt(h),f|=0;return n.colors[Math.abs(f)%n.colors.length]}n.selectColor=t;function n(d){let f,h=null,m,k;function R(...j){if(!R.enabled)return;let H=R,ne=Number(new Date),X=ne-(f||ne);H.diff=X,H.prev=f,H.curr=ne,f=ne,j[0]=n.coerce(j[0]),typeof j[0]!="string"&&j.unshift("%O");let F=0;j[0]=j[0].replace(/%([a-zA-Z%])/g,(I,N)=>{if(I==="%%")return"%";F++;let B=n.formatters[N];if(typeof B=="function"){let se=j[F];I=B.call(H,se),j.splice(F,1),F--}return I}),n.formatArgs.call(H,j),(H.log||n.log).apply(H,j)}return R.namespace=d,R.useColors=n.useColors(),R.color=n.selectColor(d),R.extend=r,R.destroy=n.destroy,Object.defineProperty(R,"enabled",{enumerable:!0,configurable:!1,get:()=>h!==null?h:(m!==n.namespaces&&(m=n.namespaces,k=n.enabled(d)),k),set:j=>{h=j}}),typeof n.init=="function"&&n.init(R),R}function r(d,f){let h=n(this.namespace+(typeof f>"u"?":":f)+d);return h.log=this.log,h}function o(d){n.save(d),n.namespaces=d,n.names=[],n.skips=[];let f=(typeof d=="string"?d:"").trim().replace(/\s+/g,",").split(",").filter(Boolean);for(let h of f)h[0]==="-"?n.skips.push(h.slice(1)):n.names.push(h)}function s(d,f){let h=0,m=0,k=-1,R=0;for(;h<d.length;)if(m<f.length&&(f[m]===d[h]||f[m]==="*"))f[m]==="*"?(k=m,R=h,m++):(h++,m++);else if(k!==-1)m=k+1,R++,h=R;else return!1;for(;m<f.length&&f[m]==="*";)m++;return m===f.length}function i(){let d=[...n.names,...n.skips.map(f=>"-"+f)].join(",");return n.enable(""),d}function l(d){for(let f of n.skips)if(s(d,f))return!1;for(let f of n.names)if(s(d,f))return!0;return!1}function a(d){return d instanceof Error?d.stack||d.message:d}function u(){console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")}return n.enable(n.load()),n}Kl.exports=u_});var Vl=Bi((pn,ms)=>{pn.formatArgs=p_;pn.save=f_;pn.load=__;pn.useColors=d_;pn.storage=m_();pn.destroy=(()=>{let e=!1;return()=>{e||(e=!0,console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."))}})();pn.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"];function d_(){if(typeof window<"u"&&window.process&&(window.process.type==="renderer"||window.process.__nwjs))return!0;if(typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))return!1;let e;return typeof document<"u"&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||typeof window<"u"&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||typeof navigator<"u"&&navigator.userAgent&&(e=navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/))&&parseInt(e[1],10)>=31||typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)}function p_(e){if(e[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+e[0]+(this.useColors?"%c ":" ")+"+"+ms.exports.humanize(this.diff),!this.useColors)return;let t="color: "+this.color;e.splice(1,0,t,"color: inherit");let n=0,r=0;e[0].replace(/%[a-zA-Z%]/g,o=>{o!=="%%"&&(n++,o==="%c"&&(r=n))}),e.splice(r,0,t)}pn.log=console.debug||console.log||(()=>{});function f_(e){try{e?pn.storage.setItem("debug",e):pn.storage.removeItem("debug")}catch{}}function __(){let e;try{e=pn.storage.getItem("debug")||pn.storage.getItem("DEBUG")}catch{}return!e&&typeof process<"u"&&"env"in process&&(e=process.env.DEBUG),e}function m_(){try{return localStorage}catch{}}ms.exports=Yl()(pn);var{formatters:g_}=ms.exports;g_.j=function(e){try{return JSON.stringify(e)}catch(t){return"[UnexpectedJSONParseError]: "+t.message}}});var po=globalThis,as=po.trustedTypes,Cl=as?as.createPolicy("lit-html",{createHTML:e=>e}):void 0,Wi="$lit$",Bn=`lit$${Math.random().toFixed(9).slice(2)}$`,zi="?"+Bn,r_=`<${zi}>`,gr=document,fo=()=>gr.createComment(""),_o=e=>e===null||typeof e!="object"&&typeof e!="function",Hi=Array.isArray,Pl=e=>Hi(e)||typeof e?.[Symbol.iterator]=="function",Ui=`[ 	
\f\r]`,uo=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Rl=/-->/g,Ol=/>/g,_r=RegExp(`>|${Ui}(?:([^\\s"'>=/]+)(${Ui}*=${Ui}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Ll=/'/g,Il=/"/g,Dl=/^(?:script|style|textarea|title)$/i,Gi=e=>(t,...n)=>({_$litType$:e,strings:t,values:n}),c=Gi(1),go=Gi(2),Jv=Gi(3),yn=Symbol.for("lit-noChange"),Ot=Symbol.for("lit-nothing"),Ml=new WeakMap,mr=gr.createTreeWalker(gr,129);function Nl(e,t){if(!Hi(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return Cl!==void 0?Cl.createHTML(t):t}var ql=(e,t)=>{let n=e.length-1,r=[],o,s=t===2?"<svg>":t===3?"<math>":"",i=uo;for(let l=0;l<n;l++){let a=e[l],u,d,f=-1,h=0;for(;h<a.length&&(i.lastIndex=h,d=i.exec(a),d!==null);)h=i.lastIndex,i===uo?d[1]==="!--"?i=Rl:d[1]!==void 0?i=Ol:d[2]!==void 0?(Dl.test(d[2])&&(o=RegExp("</"+d[2],"g")),i=_r):d[3]!==void 0&&(i=_r):i===_r?d[0]===">"?(i=o??uo,f=-1):d[1]===void 0?f=-2:(f=i.lastIndex-d[2].length,u=d[1],i=d[3]===void 0?_r:d[3]==='"'?Il:Ll):i===Il||i===Ll?i=_r:i===Rl||i===Ol?i=uo:(i=_r,o=void 0);let m=i===_r&&e[l+1].startsWith("/>")?" ":"";s+=i===uo?a+r_:f>=0?(r.push(u),a.slice(0,f)+Wi+a.slice(f)+Bn+m):a+Bn+(f===-2?l:m)}return[Nl(e,s+(e[n]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),r]},mo=class e{constructor({strings:t,_$litType$:n},r){let o;this.parts=[];let s=0,i=0,l=t.length-1,a=this.parts,[u,d]=ql(t,n);if(this.el=e.createElement(u,r),mr.currentNode=this.el.content,n===2||n===3){let f=this.el.content.firstChild;f.replaceWith(...f.childNodes)}for(;(o=mr.nextNode())!==null&&a.length<l;){if(o.nodeType===1){if(o.hasAttributes())for(let f of o.getAttributeNames())if(f.endsWith(Wi)){let h=d[i++],m=o.getAttribute(f).split(Bn),k=/([.?@])?(.*)/.exec(h);a.push({type:1,index:s,name:k[2],strings:m,ctor:k[1]==="."?cs:k[1]==="?"?us:k[1]==="@"?ds:br}),o.removeAttribute(f)}else f.startsWith(Bn)&&(a.push({type:6,index:s}),o.removeAttribute(f));if(Dl.test(o.tagName)){let f=o.textContent.split(Bn),h=f.length-1;if(h>0){o.textContent=as?as.emptyScript:"";for(let m=0;m<h;m++)o.append(f[m],fo()),mr.nextNode(),a.push({type:2,index:++s});o.append(f[h],fo())}}}else if(o.nodeType===8)if(o.data===zi)a.push({type:2,index:s});else{let f=-1;for(;(f=o.data.indexOf(Bn,f+1))!==-1;)a.push({type:7,index:s}),f+=Bn.length-1}s++}}static createElement(t,n){let r=gr.createElement("template");return r.innerHTML=t,r}};function hr(e,t,n=e,r){if(t===yn)return t;let o=r!==void 0?n._$Co?.[r]:n._$Cl,s=_o(t)?void 0:t._$litDirective$;return o?.constructor!==s&&(o?._$AO?.(!1),s===void 0?o=void 0:(o=new s(e),o._$AT(e,n,r)),r!==void 0?(n._$Co??(n._$Co=[]))[r]=o:n._$Cl=o),o!==void 0&&(t=hr(e,o._$AS(e,t.values),o,r)),t}var ls=class{constructor(t,n){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=n}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:n},parts:r}=this._$AD,o=(t?.creationScope??gr).importNode(n,!0);mr.currentNode=o;let s=mr.nextNode(),i=0,l=0,a=r[0];for(;a!==void 0;){if(i===a.index){let u;a.type===2?u=new Ir(s,s.nextSibling,this,t):a.type===1?u=new a.ctor(s,a.name,a.strings,this,t):a.type===6&&(u=new ps(s,this,t)),this._$AV.push(u),a=r[++l]}i!==a?.index&&(s=mr.nextNode(),i++)}return mr.currentNode=gr,o}p(t){let n=0;for(let r of this._$AV)r!==void 0&&(r.strings!==void 0?(r._$AI(t,r,n),n+=r.strings.length-2):r._$AI(t[n])),n++}},Ir=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,n,r,o){this.type=2,this._$AH=Ot,this._$AN=void 0,this._$AA=t,this._$AB=n,this._$AM=r,this.options=o,this._$Cv=o?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,n=this._$AM;return n!==void 0&&t?.nodeType===11&&(t=n.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,n=this){t=hr(this,t,n),_o(t)?t===Ot||t==null||t===""?(this._$AH!==Ot&&this._$AR(),this._$AH=Ot):t!==this._$AH&&t!==yn&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Pl(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==Ot&&_o(this._$AH)?this._$AA.nextSibling.data=t:this.T(gr.createTextNode(t)),this._$AH=t}$(t){let{values:n,_$litType$:r}=t,o=typeof r=="number"?this._$AC(t):(r.el===void 0&&(r.el=mo.createElement(Nl(r.h,r.h[0]),this.options)),r);if(this._$AH?._$AD===o)this._$AH.p(n);else{let s=new ls(o,this),i=s.u(this.options);s.p(n),this.T(i),this._$AH=s}}_$AC(t){let n=Ml.get(t.strings);return n===void 0&&Ml.set(t.strings,n=new mo(t)),n}k(t){Hi(this._$AH)||(this._$AH=[],this._$AR());let n=this._$AH,r,o=0;for(let s of t)o===n.length?n.push(r=new e(this.O(fo()),this.O(fo()),this,this.options)):r=n[o],r._$AI(s),o++;o<n.length&&(this._$AR(r&&r._$AB.nextSibling,o),n.length=o)}_$AR(t=this._$AA.nextSibling,n){for(this._$AP?.(!1,!0,n);t!==this._$AB;){let r=t.nextSibling;t.remove(),t=r}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},br=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,n,r,o,s){this.type=1,this._$AH=Ot,this._$AN=void 0,this.element=t,this.name=n,this._$AM=o,this.options=s,r.length>2||r[0]!==""||r[1]!==""?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=Ot}_$AI(t,n=this,r,o){let s=this.strings,i=!1;if(s===void 0)t=hr(this,t,n,0),i=!_o(t)||t!==this._$AH&&t!==yn,i&&(this._$AH=t);else{let l=t,a,u;for(t=s[0],a=0;a<s.length-1;a++)u=hr(this,l[r+a],n,a),u===yn&&(u=this._$AH[a]),i||(i=!_o(u)||u!==this._$AH[a]),u===Ot?t=Ot:t!==Ot&&(t+=(u??"")+s[a+1]),this._$AH[a]=u}i&&!o&&this.j(t)}j(t){t===Ot?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},cs=class extends br{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===Ot?void 0:t}},us=class extends br{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==Ot)}},ds=class extends br{constructor(t,n,r,o,s){super(t,n,r,o,s),this.type=5}_$AI(t,n=this){if((t=hr(this,t,n,0)??Ot)===yn)return;let r=this._$AH,o=t===Ot&&r!==Ot||t.capture!==r.capture||t.once!==r.once||t.passive!==r.passive,s=t!==Ot&&(r===Ot||o);o&&this.element.removeEventListener(this.name,this,r),s&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},ps=class{constructor(t,n,r){this.element=t,this.type=6,this._$AN=void 0,this._$AM=n,this.options=r}get _$AU(){return this._$AM._$AU}_$AI(t){hr(this,t)}},Fl={M:Wi,P:Bn,A:zi,C:1,L:ql,R:ls,D:Pl,V:hr,I:Ir,H:br,N:us,U:ds,B:cs,F:ps},o_=po.litHtmlPolyfillSupport;o_?.(mo,Ir),(po.litHtmlVersions??(po.litHtmlVersions=[])).push("3.3.1");var it=(e,t,n)=>{let r=n?.renderBefore??t,o=r._$litPart$;if(o===void 0){let s=n?.renderBefore??null;r._$litPart$=o=new Ir(t.insertBefore(fo(),s),s,void 0,n??{})}return o._$AI(e),o};var fs="today",jl=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"},{value:"30d",label:"\uCD5C\uADFC 30\uC77C"},{value:"all",label:"\uC804\uCCB4"}],Mr=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"}];function Mn(e){return e==="today"?"today":"7d"}function Ki(e){return e==="today"||e==="7d"||e==="30d"||e==="all"}function yr(e,t=Date.now()){switch(e){case"today":{let n=new Date(t);return n.setHours(0,0,0,0),n.getTime()}case"7d":return t-7*864e5;case"30d":return t-30*864e5;case"all":default:return}}function Bl(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function Ul(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function Wl(){let e=null,t=[],n,r=new Set;function o(){for(let s of Array.from(r))try{s()}catch{}}return{get(){return e},getWorkspacesState(){return t},crossLanes(){return n},set(s,i,l){e=Array.isArray(s)?s:null,t=Array.isArray(i)?i:[],n=l===void 0?void 0:l!==null&&typeof l=="object"&&typeof l.revision=="number"&&Array.isArray(l.lanes)?{revision:l.revision,lanes:l.lanes}:null,o()},clear(){e=null,t=[],n=void 0,o()},subscribe(s){return r.add(s),()=>r.delete(s)}}}function zl(){let e=new Map,t=new Set;function n(o){return o.startsWith("session-log:")?o:`session-log:${o}`}function r(){for(let o of Array.from(t))try{o()}catch{}}return{set(o,s,i=null){e.set(n(o),{lines:Array.isArray(s)?[...s]:[],last_event_at:typeof i=="number"?i:null}),r()},append(o,s){let i=n(o),l=e.get(i)||{lines:[],last_event_at:null};l.lines=[...l.lines,s],l.last_event_at=Date.now(),e.set(i,l),r()},get(o){return e.get(n(o))||null},clear(o){typeof o=="string"?e.delete(n(o)):e.clear(),r()},subscribe(o){return t.add(o),()=>t.delete(o)}}}var Xl=n_(Vl(),1);function Rt(e){return(0,Xl.default)(`beads-ui:${e}`)}function h_(e){let n=Ql((e&&typeof e=="object"?e:{}).spec_id);return n?{path:n,source:"native",conflict:!1}:{path:"",source:"none",conflict:!1}}function Ql(e){return typeof e=="string"?e.trim():""}function b_(e){let t=e&&typeof e=="object"?e:{};return t.metadata&&typeof t.metadata=="object"?t.metadata:{}}var y_=/^[A-Za-z0-9_.:-]+@[0-9a-fA-F]{40}$/;function qr(e){let t=h_(e),n=Ql(b_(e).spec_review),r=y_.test(n),o=r&&n.slice(0,n.indexOf("@"))==="skipped";return t.source==="none"?{...t,evidence:"none",skipped:o}:{...t,evidence:r?"published":"draft",skipped:o}}function $n(e){if(typeof e=="number")return Number.isFinite(e)?e:0;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:0}return 0}function ho(e,t){let n=$n(e.created_at),r=$n(t.created_at);if(n!==r)return n<r?1:-1;let o=e.priority??2,s=t.priority??2;if(o!==s)return o-s;let i=e.id,l=t.id;return i<l?-1:i>l?1:0}function rc(e,t){let n=$n(e.created_at),r=$n(t.created_at);if(n!==r)return n<r?-1:1;let o=e.priority??2,s=t.priority??2;if(o!==s)return o-s;let i=e.id,l=t.id;return i<l?-1:i>l?1:0}function oc(e,t){let n=$n(e.updated_at),r=$n(t.updated_at);if(n!==r)return n<r?1:-1;let o=e.id,s=t.id;return o<s?-1:o>s?1:0}function sc(e,t){let n=e.priority??2,r=t.priority??2;if(n!==r)return n-r;let o=$n(e.created_at),s=$n(t.created_at);if(o!==s)return o<s?1:-1;let i=e.id,l=t.id;return i<l?-1:i>l?1:0}function ic(e,t){let n=e.closed_at??0,r=t.closed_at??0;if(n!==r)return n<r?1:-1;let o=e?.id,s=t?.id;return o<s?-1:o>s?1:0}var gs=Object.freeze({priority:"asc",dependents:"desc",released:"desc",spec:"desc",created:"asc",updated:"desc"});function v_(e){return typeof e=="string"&&Object.prototype.hasOwnProperty.call(gs,e)}function Vi(e){if(!e||typeof e!="object")return!1;let t=e;return v_(t.key)&&(t.dir==="asc"||t.dir==="desc")}function Zl(e){if(typeof e=="number")return Number.isFinite(e)?e:null;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:null}return null}function Jl(e,t){switch(t){case"priority":{let n=e.priority;return typeof n=="number"&&Number.isFinite(n)?n:null}case"dependents":{let n=e.dependents_info?e.dependents_info.count:null;return typeof n=="number"&&Number.isFinite(n)?n:null}case"released":{let n=e.release_info?e.release_info.last_released_at:null;return typeof n=="number"&&Number.isFinite(n)?n:null}case"spec":return qr(e).evidence==="published"?1:0;case"created":return Zl(e.created_at);case"updated":return Zl(e.updated_at);default:return null}}function ec(e,t,n){let r=Jl(e,n.key),o=Jl(t,n.key);if(r===null||o===null)return r===o?0:r===null?1:-1;if(r===o)return 0;let s=r<o?-1:1;return n.dir==="desc"?-s:s}function ac(e){let t=Array.isArray(e)?e.filter(Vi):[];return(n,r)=>{for(let l of t){let a=ec(n,r,l);if(a!==0)return a}let o=ec(n,r,{key:"created",dir:"asc"});if(o!==0)return o;let s=n.id,i=r.id;return s<i?-1:s>i?1:0}}var w_=/^(?:[A-Za-z][A-Za-z0-9]*(?:-[A-Za-z0-9]+)+\s+)?(?:Task|Phase|T)\s*(\d+)/i;function tc(e){let t=e&&e.metadata,n=t?t.task_order:void 0;if(n==null||n==="")return Number.POSITIVE_INFINITY;let r=Number(n);return Number.isFinite(r)?r:Number.POSITIVE_INFINITY}function nc(e){let t=e&&e.title;if(typeof t!="string")return Number.POSITIVE_INFINITY;let n=w_.exec(t);if(!n)return Number.POSITIVE_INFINITY;let r=Number(n[1]);return Number.isFinite(r)?r:Number.POSITIVE_INFINITY}function lc(e,t){let n=tc(e),r=tc(t);if(n!==r)return n<r?-1:1;let o=nc(e),s=nc(t);if(o!==s)return o<s?-1:1;let i=$n(e&&e.created_at),l=$n(t&&t.created_at);if(i!==l)return i<l?-1:1;let a=e&&e.id,u=t&&t.id;return a===u?0:String(a)<String(u)?-1:1}var Yi=2**20;function Fr(e,t){let n=e&&e.id;return t&&typeof n=="string"&&Object.prototype.hasOwnProperty.call(t,n)&&typeof t[n]=="number"&&Number.isFinite(t[n])?t[n]:-$n(e&&e.created_at)}function cc(e){return(t,n)=>{let r=Fr(t,e),o=Fr(n,e);if(r!==o)return r<o?-1:1;let s=t?.id,i=n?.id;return s<i?-1:s>i?1:0}}function Xi(e,t,n){let r=Array.isArray(e)?e:[],o=r.length,s=Math.max(0,Math.min(t,o-1)),i=s-1>=0?r[s-1]:null,l=s+1<o?r[s+1]:null;if(!i&&!l)return{rank:0};if(!i)return{rank:Fr(l,n)-Yi};if(!l)return{rank:Fr(i,n)+Yi};let a=Fr(i,n),u=Fr(l,n),d=(a+u)/2;return a<d&&d<u?{rank:d}:{renormalize:r.map((f,h)=>({bead_id:f.id,rank:h*Yi}))}}function Qi(e,t={}){let n=Rt(`issue-store:${e}`),r=new Map,o=[],s=0,i=new Set,l=!1,a=t.sort||ho;function u(){for(let h of Array.from(i))try{h()}catch{}}function d(){o=Array.from(r.values()).sort(a)}function f(h){if(l||!h||h.id!==e)return;let m=Number(h.revision)||0;if(n("apply %s rev=%d",h.type,m),!(m<=s&&h.type!=="snapshot")){if(h.type==="snapshot"){if(m<=s)return;r.clear();let k=Array.isArray(h.issues)?h.issues:[];for(let R of k)R&&typeof R.id=="string"&&R.id.length>0&&r.set(R.id,R);d(),s=m,u();return}if(h.type==="upsert"){let k=h.issue;if(k&&typeof k.id=="string"&&k.id.length>0){let R=r.get(k.id);if(!R)r.set(k.id,k);else{let j=Number.isFinite(R.updated_at)?R.updated_at:0,H=Number.isFinite(k.updated_at)?k.updated_at:0;if(j<=H){for(let ne of Object.keys(R))ne in k||delete R[ne];for(let[ne,X]of Object.entries(k))R[ne]=X}}d()}s=m,u()}else if(h.type==="delete"){let k=String(h.issue_id||"");k&&(r.delete(k),d()),s=m,u()}}}return{id:e,subscribe(h){return i.add(h),()=>{i.delete(h)}},applyPush:f,snapshot(){return o},size(){return r.size},getById(h){return r.get(h)},dispose(){l=!0,r.clear(),o=[],i.clear(),s=0}}}function hs(e){let t=String(e.type||"").trim(),n={};if(e.params&&typeof e.params=="object"){let o=Object.keys(e.params).sort();for(let s of o){let i=e.params[s];n[s]=String(i)}}let r=new URLSearchParams(n).toString();return r.length>0?`${t}?${r}`:t}function uc(e){let t=Rt("subs"),n=new Map,r=new Map;function o(l,a){t("applyDelta %s +%d ~%d -%d",l,(a.added||[]).length,(a.updated||[]).length,(a.removed||[]).length);let u=r.get(l);if(!u||u.size===0)return;let d=Array.isArray(a.added)?a.added:[],f=Array.isArray(a.updated)?a.updated:[],h=Array.isArray(a.removed)?a.removed:[];for(let m of Array.from(u)){let k=n.get(m);if(!k)continue;let R=k.itemsById;for(let j of d)typeof j=="string"&&j.length>0&&R.set(j,!0);for(let j of f)typeof j=="string"&&j.length>0&&R.set(j,!0);for(let j of h)typeof j=="string"&&j.length>0&&R.delete(j)}}async function s(l,a){let u=hs(a);if(t("subscribe %s key=%s",l,u),!n.has(l))n.set(l,{key:u,itemsById:new Map});else{let f=n.get(l);if(f&&f.key!==u){let h=r.get(f.key);h&&(h.delete(l),h.size===0&&r.delete(f.key)),n.set(l,{key:u,itemsById:new Map})}}r.has(u)||r.set(u,new Set);let d=r.get(u);d&&d.add(l);try{await e("subscribe-list",{id:l,type:a.type,params:a.params})}catch(f){let h=n.get(l)||null;if(h){let m=r.get(h.key);m&&(m.delete(l),m.size===0&&r.delete(h.key))}throw n.delete(l),f}return async()=>{t("unsubscribe %s key=%s",l,u);try{await e("unsubscribe-list",{id:l})}catch{}let f=n.get(l)||null;if(f){let h=r.get(f.key);h&&(h.delete(l),h.size===0&&r.delete(f.key))}n.delete(l)}}return{subscribeList:s,_applyDelta:o,_subKeyOf:hs,selectors:{getIds(l){let a=n.get(l);return a?Array.from(a.itemsById.keys()):[]},has(l,a){let u=n.get(l);return u?u.itemsById.has(a):!1},count(l){let a=n.get(l);return a?a.itemsById.size:0},getItemsById(l){let a=n.get(l),u={};if(!a)return u;for(let d of a.itemsById.keys())u[d]=!0;return u}}}}function dc(){let e=Rt("issue-stores"),t=new Map,n=new Map,r=new Set,o=new Map;function s(){for(let a of Array.from(r))try{a()}catch{}}function i(a,u,d){let f=u?hs(u):"",h=n.get(a)||"",m=t.has(a);if(e("register %s key=%s (prev=%s)",a,f,h),m&&h&&f&&h!==f){let k=t.get(a);if(k)try{k.dispose()}catch{}let R=o.get(a);if(R){try{R()}catch{}o.delete(a)}let j=Qi(a,d);t.set(a,j);let H=j.subscribe(()=>s());o.set(a,H)}else if(!m){let k=Qi(a,d);t.set(a,k);let R=k.subscribe(()=>s());o.set(a,R)}return n.set(a,f),()=>l(a)}function l(a){e("unregister %s",a),n.delete(a);let u=t.get(a);u&&(u.dispose(),t.delete(a));let d=o.get(a);if(d){try{d()}catch{}o.delete(a)}}return{register:i,unregister:l,getStore(a){return t.get(a)||null},snapshotFor(a){let u=t.get(a);return u?u.snapshot().slice():[]},subscribe(a){return r.add(a),()=>r.delete(a)}}}function pc(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function fc(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function Zi(e,t){return`#/${e==="worker"||e==="monitor"?e:"board"}?issue=${encodeURIComponent(t)}`}function k_(e){let t=String(e||""),n=t.startsWith("#")?t.slice(1):t,r=n.indexOf("?"),o=r>=0?n.slice(r+1):"";if(o){let l=new URLSearchParams(o).get("issue");if(l)return decodeURIComponent(l)}let s=/^\/issue\/([^\s?#]+)/.exec(n);return s&&s[1]?decodeURIComponent(s[1]):null}function $_(e){let t=String(e||"");return/^#\/worker(\b|\/|$)/.test(t)?"worker":/^#\/monitor(\b|\/|$)/.test(t)?"monitor":"board"}function _c(e){let t=Rt("router"),n=()=>{let r=window.location.hash||"",o=/^#\/issue\/([^\s?#]+)/.exec(r),s=o&&o[1]?decodeURIComponent(o[1]):k_(r),i=$_(r);if(t("hash change \u2192 view=%s id=%s",i,s),e.setState({selected_id:i==="worker"?null:s,view:i,worker:{selected_parent_id:i==="worker"?s:null}}),!!o||/^#\/(issues|epics)(\b|\/|\?|$)/.test(r)){let a=s?`#/${i}?issue=${encodeURIComponent(s)}`:`#/${i}`;window.location.hash!==a&&(window.location.hash=a)}};return{start(){window.addEventListener("hashchange",n),n()},stop(){window.removeEventListener("hashchange",n)},gotoIssue(r){let o=e.getState?e.getState():{view:"board"},s=o.view==="worker"||o.view==="monitor"?o.view:"board",i=Zi(s,r);t("goto issue %s (view=%s)",r,s),window.location.hash!==i?window.location.hash=i:e.setState({selected_id:s==="worker"?null:r,view:s,worker:{selected_parent_id:s==="worker"?r:null}})},gotoView(r){let o=e.getState?e.getState():{selected_id:null,worker:{selected_parent_id:null}},s=r==="worker"?o.worker?.selected_parent_id:o.selected_id,i=s?Zi(r,s):`#/${r}`;t("goto view %s (id=%s)",r,s||""),window.location.hash!==i?window.location.hash=i:e.setState({view:r,selected_id:r==="worker"?null:o.selected_id})}}}var x_=Object.freeze({workspace_config:{default_workspace:null}});function mc(e){return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:x_.workspace_config.default_workspace}}}function gc(e={}){let t=Rt("state"),n={selected_id:e.selected_id??null,view:e.view??"board",filters:{status:e.filters?.status??"all",search:e.filters?.search??"",type:typeof e.filters?.type=="string"?e.filters?.type:""},board:{closed_filter:e.board?.closed_filter==="3"||e.board?.closed_filter==="7"||e.board?.closed_filter==="today"?e.board?.closed_filter:"today"},worker:{selected_parent_id:e.worker?.selected_parent_id??null,show_closed_children:Array.isArray(e.worker?.show_closed_children)?e.worker.show_closed_children:[]},workspace:{current:e.workspace?.current??null,available:e.workspace?.available??[],hidden:e.workspace?.hidden??[]},config:mc(e.config)},r=new Set;function o(){for(let s of Array.from(r))try{s(n)}catch{}}return{getState(){return n},setState(s){let i={...n,...s,filters:{...n.filters,...s.filters||{}},board:{...n.board,...s.board||{}},worker:{...n.worker,...s.worker||{}},workspace:{current:s.workspace?.current!==void 0?s.workspace.current:n.workspace.current,available:s.workspace?.available!==void 0?s.workspace.available:n.workspace.available,hidden:s.workspace?.hidden!==void 0?s.workspace.hidden:n.workspace.hidden},config:s.config!==void 0?mc(s.config):n.config},l=i.workspace.current?.path!==n.workspace.current?.path||i.workspace.available.length!==n.workspace.available.length||i.workspace.hidden.length!==n.workspace.hidden.length||i.workspace.hidden.some((u,d)=>u!==n.workspace.hidden[d]),a=i.config.workspace_config.default_workspace!==n.config.workspace_config.default_workspace;i.selected_id===n.selected_id&&i.view===n.view&&i.filters.status===n.filters.status&&i.filters.search===n.filters.search&&i.filters.type===n.filters.type&&i.board.closed_filter===n.board.closed_filter&&i.worker.selected_parent_id===n.worker.selected_parent_id&&i.worker.show_closed_children.length===n.worker.show_closed_children.length&&i.worker.show_closed_children.every((u,d)=>u===n.worker.show_closed_children[d])&&!l&&!a||(n=i,t("state change %o",{selected_id:n.selected_id,view:n.view,filters:n.filters,board:n.board,worker:n.worker,workspace:n.workspace.current?.path,config:{default_workspace:n.config.workspace_config.default_workspace}}),o())},subscribe(s){return r.add(s),()=>r.delete(s)}}}function hc(e){let t=Rt("activity"),n=0,r=new Map,o=1;function s(){if(!e)return;let u=n>0;e.toggleAttribute("hidden",!u),e.setAttribute("aria-busy",u?"true":"false")}function i(){n+=1,t("start count=%d",n),s()}function l(){let u=n;n=Math.max(0,n-1),u<=0?t("done called but count was already %d",u):t("done count=%d\u2192%d",u,n),s()}function a(u){return async(f,h)=>{let m=o++,k=Date.now();r.set(m,{type:f,start_ts:k}),t("request start id=%d type=%s count=%d",m,f,n+1),i();let R=!1,j=()=>{R||(R=!0,r.delete(m),l())},H=setTimeout(()=>{R||(t("request TIMEOUT id=%d type=%s elapsed=%dms",m,f,Date.now()-k),j())},3e4);try{let ne=await u(f,h),X=Date.now()-k;return t("request done id=%d type=%s elapsed=%dms",m,f,X),ne}catch(ne){let X=Date.now()-k;throw t("request error id=%d type=%s elapsed=%dms err=%o",m,f,X,ne),ne}finally{clearTimeout(H),j()}}}return s(),{wrapSend:a,start:i,done:l,getCount:()=>n,getActiveRequests:()=>{let u=Date.now();return Array.from(r.entries()).map(([d,f])=>({id:d,type:f.type,elapsed_ms:u-f.start_ts}))}}}function ye(e,t="info",n=2800){let r=document.createElement("div");r.className="toast",r.textContent=e,r.style.position="fixed",r.style.right="12px",r.style.bottom="12px",r.style.zIndex="1000",r.style.color="#fff",r.style.padding="8px 10px",r.style.borderRadius="4px",r.style.fontSize="12px",t==="success"?r.style.background="#156d36":t==="warning"?r.style.background="#a36a00":t==="error"?r.style.background="#9f2011":r.style.background="rgba(0,0,0,0.85)",(document.body||document.documentElement).appendChild(r),setTimeout(()=>{try{r.remove()}catch{}},n)}function jr(e=void 0,t=void 0){function n(){if(!t||typeof t.get!="function")return null;let s=t.get();return s&&s.order?s.order:{}}function r(s,i,l){let a=e&&e.snapshotFor?e.snapshotFor(s).slice():[];if(i==="closed")return a.sort(ic),a;switch(l){case"created_desc":return a.sort(ho),a;case"created_asc":return a.sort(rc),a;case"updated_desc":return a.sort(oc),a;case"priority":return a.sort(sc),a;case"manual":default:{let u=n();return u?a.sort(cc(u)):a.sort(ho),a}}}function o(s){let i=[];return e&&typeof e.subscribe=="function"&&i.push(e.subscribe(s)),t&&typeof t.subscribe=="function"&&i.push(t.subscribe(s)),()=>{for(let l of i)try{l()}catch{}}}return{selectBoardColumn:r,subscribe:o}}function nr(e){if(!e)return null;if(typeof e=="number")return Number.isFinite(e)?e:null;let t=Date.parse(e);return Number.isFinite(t)?t:null}function Gt(e){let t=nr(e);if(t===null)return"";let n=new Date(t),r=o=>String(o).padStart(2,"0");return`${n.getFullYear()}-${r(n.getMonth()+1)}-${r(n.getDate())} ${r(n.getHours())}:${r(n.getMinutes())}`}function rn(e,t){let n=nr(e);if(n===null)return"";let o=(typeof t=="number"?t:Date.now())-n;if(o<6e4)return"\uBC29\uAE08";let s=Math.floor(o/6e4);if(s<60)return`${s}\uBD84 \uC804`;let i=Math.floor(o/36e5);if(i<24)return`${i}\uC2DC\uAC04 \uC804`;let l=Math.floor(o/864e5);if(l<7)return`${l}\uC77C \uC804`;let a=Math.floor(l/7);if(l<30)return`${a}\uC8FC \uC804`;let u=Math.floor(l/30);return u<12?`${u}\uAC1C\uC6D4 \uC804`:`${Math.floor(l/365)}\uB144 \uC804`}function bc(e){if(!Array.isArray(e))return null;let t=null,n=-1;for(let r of e){if(!r||r.status!=="in_progress")continue;let o=nr(r.updated_at)??0;if(t===null||o>n){t=r,n=o;continue}o===n&&String(r.id)<String(t.id)&&(t=r)}return t}function bs(e){let t=e&&e.parent;return typeof t=="string"?t:t&&t.id?String(t.id):""}function ys(e){let t=new Map;for(let r of e)r&&r.id&&!t.has(r.id)&&t.set(r.id,r);let n=new Map;for(let r of t.values()){let o=bs(r);if(!o)continue;let s=n.get(o);s||(s=[],n.set(o,s)),s.push({id:r.id,title:r.title,status:r.status,metadata:r.metadata,workflow:r.workflow,created_at:r.created_at,updated_at:r.updated_at})}return n}function vs(e,t){let n=e.get(t)||[],r=0;for(let s of n)(s.status==="resolved"||s.status==="closed")&&(r+=1);let o=bc(n);return{total:n.length,count:r,current:o,children:n}}function yc(e){let t=e.transport,n=e.uiOrderStore;function r(i,l){return"renormalize"in i?i.renormalize:[{bead_id:l,rank:i.rank}]}function o(i,l){let a={...i.order};for(let u of l)a[u.bead_id]=u.rank;n&&n.set({revision:i.revision,order:a})}async function s(i,l,a){if(!t||!n)return;let u=n.get()||{revision:0,order:{}},d=r(Xi(l,a,u.order),i);o(u,d);let f=await t("ui-order-set",{expected_revision:u.revision,entries:d});if(f&&f.conflict){let h={revision:typeof f.revision=="number"?f.revision:0,order:f.order||{}};n.set(h);let m=r(Xi(l,a,h.order),i);o(h,m);let k=await t("ui-order-set",{expected_revision:h.revision,entries:m});k&&k.applied&&n.set({revision:typeof k.revision=="number"?k.revision:0,order:k.order||{}})}else f&&f.applied&&n.set({revision:typeof f.revision=="number"?f.revision:0,order:f.order||{}})}return{applyReorder:s}}function vc(e){if(typeof e!="string")return"";let t=e.indexOf("-");return t>0?e.slice(0,t):""}function Un(e,t){let n=vc(e),r=vc(t);return n.length===0||r.length===0?!1:n!==r}function ws(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function Ji(e,t){return!t||typeof e!="string"||e.length===0||ws(t.visible_labels).includes(e)?!0:ws(t.hidden_labels).includes(e)?!1:!ws(t.hidden_prefixes).some(n=>n.length>0&&e.startsWith(n))}function wc(e,t){return ws(e).filter(n=>Ji(n,t))}function rr(e,t){let n=e&&e.chips?e.chips[t]:void 0;return typeof n=="boolean"?n:!0}function A_(e){switch(e){case"in_progress":return"board-card__dot board-card__dot--progress";case"resolved":return"board-card__dot board-card__dot--resolved";case"closed":return"board-card__dot board-card__dot--closed";case"blocked":return"board-card__dot board-card__dot--blocked";default:return"board-card__dot"}}function S_(e,t,n,r,o){return c`<button
    type="button"
    class="board-card__roll-toggle"
    data-roll-parent=${e}
    aria-expanded=${r?"true":"false"}
    @click=${o}
  >
    children ${t}/${n} ${r?"\u25B4":"\u25BE"}
  </button>`}function E_(e,t,n,r){return c`<button
    type="button"
    class="board-card__roll-child"
    data-child-id=${e.id}
    @click=${r?o=>r(o,e.id):void 0}
  >
    <span class=${A_(e.status)}>●</span>
    <span class="board-card__roll-child-ord">${t}</span>
    <span class="board-card__roll-child-title">${e.title||e.id}</span>
    ${n}
  </button>`}function ks(e,t){let n=e.total||0,r=!!t.expanded,o=t.trailing??"",s=typeof t.empty_label=="string"&&t.empty_label.length>0?t.empty_label:null;if(n===0&&s===null)return"";let i=Array.isArray(e.children)?e.children:[],l=n>0?i.slice().sort(lc):i;return c`
    <div class="board-card__roll">
      <div class="board-card__roll-meta">
        ${n>0?S_(t.parent_id,e.count,n,r,t.onToggle):c`<span class="board-card__roll-none">${s}</span>`}
        ${o}
      </div>
      ${n>0&&e.current?c`<div class="board-card__roll-current">
            └
            <span class="board-card__cur-child"
              >● ${e.current.title||e.current.id}</span
            >
          </div>`:""}
      ${r&&n>0?c`<div class="board-card__roll-list">
            ${l.map((a,u)=>E_(a,u+1,t.childChips?t.childChips(a):null,t.onChildClick))}
          </div>`:""}
    </div>
  `}var T_={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"mrg",close:"mrg"},$c={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"merge",close:"close"},kc={quick_fix:["impl","close"],spec_backed:["spec","impl","pr","merge"],full_plan:["spec","plan","impl","pr","merge"]},C_={review:"\u2713",skip:"\u2298"},or={none:"\uBBF8\uB3C4\uB2EC",dim:"\uC9C4\uD589 \uC911",stale:"\uC7AC\uAC80\uD1A0 \uD544\uC694",review:"\uAC80\uD1A0 \uC644\uB8CC",skip:"\uAC80\uD1A0 \uC0DD\uB7B5",done:"\uC644\uB8CC"};function R_(e,t,n){if(!(n==="in_progress"||n==="resolved"))return null;for(let o of e){let s=t[o];if(s&&s.fill==="dim"&&s.stale!==!0)return o}return null}function xc(e){let t=e&&e.fill||"none";return t==="none"?or.none:e&&e.stale===!0?or.stale:t==="dim"?or.dim:e&&e.glyph==="review"?or.review:e&&e.glyph==="skip"?or.skip:or.done}function O_(e){if(!e||e.fill==="none"||!e.approval_state)return xc(e);let t=[];return e.glyph==="review"?t.push(or.review):e.glyph==="skip"&&t.push(or.skip),e.approval_state==="missing"?t.push("\uC2B9\uC778 \uD544\uC694"):e.approval_state==="stale"?t.push("\uC7AC\uC2B9\uC778 \uD544\uC694"):e.approval_state==="unknown"?t.push("\uC2B9\uC778 \uD655\uC778 \uBD88\uAC00"):t.push("\uC2B9\uC778 \uC644\uB8CC"),t.join(" \xB7 ")}function L_(e,t,n,r){let o=T_[e]||e,s=t&&t.fill||"none",i=!!t&&t.stale===!0,l=C_[t&&t.glyph||""]||"",a="bar";s==="dim"?a+=` b-${o} dim`:s==="full"&&(a+=` b-${o} full`),i&&(a+=" stale"),n&&(a+=" cur");let u=s==="none"?"lbl":`lbl l-${o} on`,d=n?`color: var(--stage-${o}-on)`:"",f=$c[e]||e,h=r?Ac(t):null;if(!h)return c`
      <div class="seg">
        <div class=${a} style=${d}>${l}</div>
        <div class=${u}>${f}</div>
      </div>
    `;let m=`${f} \uBB38\uC11C \uC5F4\uAE30 \xB7 ${h.path}`;return c`
    <button
      type="button"
      class="seg seg--doc"
      aria-label=${m}
      title=${m}
      @click=${k=>{k.preventDefault(),k.stopPropagation(),r(k,h,e)}}
    >
      <div class=${a} style=${d}>${l}</div>
      <div class=${u}>${f}</div>
    </button>
  `}function Ac(e){let t=e?e.doc:null;return!t||typeof t.path!="string"||t.path.length===0?null:t}function $s(e,t,n={}){if(!e||!e.stages)return"";let r=n.onOpenDoc,o=kc[e.route]||kc.spec_backed,s=e.stages,i=R_(o,s,String(t||"open")),l=`\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uC9C4\uD589: ${o.map(u=>`${$c[u]||u} ${u==="plan"?O_(s[u]||{}):xc(s[u]||{})}`).join(" \xB7 ")}`,a=!!r&&o.some(u=>Ac(s[u]||{})!==null);return c`
    <div
      class="stp"
      role=${a?"group":"img"}
      aria-label=${l}
    >
      ${o.map(u=>L_(u,s[u]||{},u===i,r))}
    </div>
  `}function I_(e){return typeof e!="number"||!Number.isFinite(e)?"":`P${Math.max(0,Math.min(4,e))}`}var Sc=2;function Ec(e){let t=e.slice(0,Sc).join(", "),n=e.length-Sc;return`\u26D3 blocked: ${t}${n>0?` +${n}`:""}`}function M_(e,t){if(!t)return[];let n=[],r=Array.isArray(t.blockers)?t.blockers:[],o=[],s=[];for(let i of r)(Un(e,i)?s:o).push(i);return o.length>0&&n.push(c`<span class="ctl-chip ctl-chip--blocked-dep"
        >${Ec(o)}</span
      >`),s.length>0&&n.push(c`<span class="ctl-chip ctl-chip--blocked-foreign"
        >${Ec(s)}</span
      >`),n}function P_(e){if(!e||typeof e!="object")return null;let t=e.awaiting_user;if(typeof t!="string")return null;let n=t.trim();return n.length===0?null:c`<span class="ctl-chip ctl-chip--blocked"
    >${`\u23F8 \uC0AC\uC6A9\uC790 \uB9AC\uBDF0 \uD544\uC694: ${n}`}</span
  >`}function ea(e){return e==="delegated"?"\uC704\uC784":e==="main"?"\uBA54\uC778":null}function xs(e){return e.effort?`${e.actor}:${e.effort}`:e.actor}function Wn(e){return`${e.kind}:${xs(e)}@${e.sha}`}function As(e,t){if(!e)return null;let n=ea(e.kind),r=e.reason,o=e.kind==="delegated"?r===null:typeof r=="string"&&r.trim().length>0&&!/[\r\n]/.test(r);if(!n||!o)return null;let s=ea(t?.kind),i=s!==null&&t?.kind!==e.kind,l=`\uACC4\uD68D \xB7 ${n}${i?` \u2192 ${s}`:""}`,a=`planned_execution ${e.kind}${typeof r=="string"?`:${r}`:""}`,u=t?` \xB7 exec_receipt ${Wn(t)}`:"";return{kind:e.kind,label:l,title:`${a}${u}`}}function Tc(e,t){let n=As(e,t);return n?c`<span
        class="ctl-chip ctl-chip--planned"
        data-kind=${n.kind}
        title=${n.title}
        >${n.label}</span
      >`:null}function D_(e){if(!e)return null;let t=ea(e.kind);return t?c`<span
    class="ctl-chip ctl-chip--exec-receipt"
    title=${`exec_receipt ${Wn(e)}`}
    >${`\uC2E4\uD589 \xB7 ${t}`}</span
  >`:null}function N_(e,t){let n=t.policy||null,r=e.workflow&&e.workflow.chips||{},o=[];if(r.route&&rr(n,"route")){let l=r.route_source==="derived";o.push(c`<span
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
      </button>`),rr(n,"blocked")){let l=P_(e.metadata);l&&o.push(l),o.push(...M_(e.id,e.blocked_info))}return t.cleanupFailureFor&&t.cleanupFailureFor(e.id)&&rr(n,"blocked")&&o.push(c`<span class="ctl-chip ctl-chip--cleanup">⚠ 정리 멈춤</span>`),o.length===0?"":c`<div class="board-card__chips">${o}</div>`}function q_(e){let t=rn(e.created_at),n=rn(e.updated_at);return!t&&!n?"":c`<span class="board-card__times">
    ${t?c`<span
          class="board-card__time"
          title=${`\uC0DD\uC131 ${Gt(e.created_at)}`}
          >생성 ${t}</span
        >`:""}
    ${t&&n?c`<span class="board-card__time-sep">·</span>`:""}
    ${n?c`<span
          class="board-card__time"
          title=${`\uC218\uC815 ${Gt(e.updated_at)}`}
          >수정 ${n}</span
        >`:""}
  </span>`}function F_(e,t){let n=t.rollupFor?t.rollupFor(e.id):{total:0,count:0,current:null,children:[]};return ks(n,{parent_id:e.id,expanded:t.isExpanded?t.isExpanded(e.id):!0,trailing:q_(e),empty_label:"children \uC5C6\uC74C",childChips:ta,onToggle:r=>t.onRollupToggle&&t.onRollupToggle(r,e.id),onChildClick:(r,o)=>t.onChildClick&&t.onChildClick(r,o)})}function ta(e){let t=e?.workflow?.chips?.planned_execution,n=e?.workflow?.chips?.exec_receipt;return As(t,n)?c`<span class="board-card__roll-child-chips">
    ${Tc(t,n)}
    ${D_(n)}
  </span>`:null}function Ss(e,t){let n=I_(e.priority);return c`
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
      ${N_(e,t)}
      ${e.workflow&&rr(t.policy||null,"stepper")?$s(e.workflow,e.status,{onOpenDoc:t.onOpenDoc}):""}
      ${F_(e,t)}
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
  `}var j_=[{value:"",label:"\uC6B0\uC120\uC21C\uC704"},{value:"0",label:"P0"},{value:"1",label:"P1"},{value:"2",label:"P2"},{value:"3",label:"P3"},{value:"4",label:"P4"}],B_=[{value:"",label:"\uD0C0\uC785"},{value:"bug",label:"bug"},{value:"feature",label:"feature"},{value:"task",label:"task"},{value:"epic",label:"epic"},{value:"chore",label:"chore"}],U_=[{value:"created_desc",label:"\uC0DD\uC131 \uCD5C\uC2E0\uC21C"},{value:"created_asc",label:"\uC0DD\uC131 \uC624\uB798\uB41C\uC21C"},{value:"updated_desc",label:"\uC218\uC815 \uCD5C\uC2E0\uC21C"},{value:"priority",label:"\uC6B0\uC120\uC21C\uC704\uC21C"},{value:"manual",label:"\uC218\uB3D9(\uB4DC\uB798\uADF8)"}];function W_(e,t,n){let r=e.labels.length,o=r>0?`\uB77C\uBCA8 ${r}`:"\uB77C\uBCA8";return c`
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
        ${j_.map(r=>c`<option
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
        ${B_.map(r=>c`<option
              value=${r.value}
              ?selected=${e.type===r.value}
            >
              ${r.label}
            </option>`)}
      </select>
      ${W_(e,t,n)}
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
        ${U_.map(r=>c`<option
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
  `}var z_=200,H_={"ready-col":"open","in-progress-col":"in_progress","resolved-col":"resolved","closed-col":"closed"},G_=new Set(["blocked-col","ready-col","in-progress-col","resolved-col"]),Oc="beads-ui.board.sort",Lc=new Set(["created_desc","created_asc","updated_desc","priority","manual"]);function K_(){try{let e=window.localStorage.getItem(Oc);if(e&&Lc.has(e))return e}catch{}return"created_desc"}function Ic(e,t){let n=Rt("views:board"),r=t.gotoIssue,o=t.issueStores,s=t.transport,i=t.uiOrderStore,l=t.displayPolicyStore,a=t.workerQueueStore,u=t.onClosedRangeChange,d=t.onNewIssue,f=t.openDoc,h=t.closedRange||fs,m=o?jr(o,i):null,k=yc({transport:s,uiOrderStore:i}),R=[],j=[],H=[],ne=[],X=[],F=[],O=!1,I=0,N=K_(),B=new Map,se=new Map,q=new Map,W=new Set,Z={search:"",priority:"",type:"",labels:[]},ee=!1,Se=null;function he(E){return String(E.status||"open")==="open"}function ue(E){return String(E.status||"open")==="open"}function D(E){let K=Z.search.trim().toLowerCase(),Ie=Z.priority,We=Z.type,Ne=Z.labels;return E.filter(nt=>{if(K){let Le=String(nt.id||"").toLowerCase(),Ge=String(nt.title||"").toLowerCase();if(!Le.includes(K)&&!Ge.includes(K))return!1}if(Ie!==""&&String(nt.priority)!==Ie||We!==""&&String(nt.issue_type||"")!==We)return!1;if(Ne.length>0){let Le=Array.isArray(nt.labels)?nt.labels:[];if(!Ne.some(Ge=>Le.includes(Ge)))return!1}return!0})}function ke(){let E=new Set;for(let K of[R,j,H,ne,X,F])for(let Ie of K){let We=Array.isArray(Ie.labels)?Ie.labels:[];for(let Ne of We)typeof Ne=="string"&&Ne.length>0&&E.add(Ne)}return Array.from(E).sort()}function xe(){return Z.search.trim()!==""||Z.priority!==""||Z.type!==""||Z.labels.length>0}function S(){try{if(m){let E=m.selectBoardColumn("tab:board:in-progress","in_progress",N),K=m.selectBoardColumn("tab:board:blocked","blocked",N).filter(ue),Ie=new Set(E.map(He=>He.id)),We=m.selectBoardColumn("tab:board:ready","ready",N).filter(He=>he(He)&&!Ie.has(He.id)),Ne=m.selectBoardColumn("tab:board:resolved","resolved",N),nt=m.selectBoardColumn("tab:board:deferred","deferred",N),Le=m.selectBoardColumn("tab:board:closed","closed").slice(0,z_),Ge=[...K,...We,...E,...Ne,...Le];J(Ge);let et=new Set;for(let He of Ge)He&&He.id&&!bs(He)&&et.add(He.id);let yt=!xe();R=yt?bo(K,et):K,j=yt?bo(We,et):We,H=yt?bo(E,et):E,ne=yt?bo(Ne,et):Ne,X=nt,I=nt.length,F=yt?bo(Le,et):Le,B=new Map;for(let He of R)B.set(He.id,"open");for(let He of j)B.set(He.id,"open");for(let He of H)B.set(He.id,"in_progress");for(let He of ne)B.set(He.id,"resolved");for(let He of X)B.set(He.id,"deferred");for(let He of F)B.set(He.id,"closed");se=new Map;for(let He of R)se.set(He.id,"blocked-col");for(let He of j)se.set(He.id,"ready-col");for(let He of H)se.set(He.id,"in-progress-col");for(let He of ne)se.set(He.id,"resolved-col");for(let He of F)se.set(He.id,"closed-col")}Be()}catch{R=[],j=[],H=[],ne=[],X=[],F=[],q=new Map,Be()}}function J(E){q=ys(E)}function Ee(E){return vs(q,E)}function _e(E){return!W.has(E)}function Ae(E,K){E.preventDefault(),E.stopPropagation(),W.has(K)?W.delete(K):W.add(K),Be()}function pe(E,K){E.preventDefault(),E.stopPropagation(),r(K)}function Pe(E,K){E.preventDefault(),E.stopPropagation(),r(K)}function st(E,K){Se||r(K)}function Ve(E,K){E.preventDefault(),E.stopPropagation(),Y_(K).then(Ie=>{Ie&&ye("\uBCF5\uC0AC\uB428","success",1200)})}function M(E,K){Se=K,E.dataTransfer&&(E.dataTransfer.setData("text/plain",K),E.dataTransfer.effectAllowed="move"),E.target.classList.add("board-card--dragging")}function re(E){E.target.classList.remove("board-card--dragging"),$t(),setTimeout(()=>{Se=null},0)}function ae(E){let K=String(E.target.value||"");!K||K===h||(h=K,u&&u(K),Be())}function fe(){return l?l.get():null}function be(E){let K=a?a.get():null,Ie=K?K.cleanup_failed:null;if(!Ie||typeof Ie!="object"||Array.isArray(Ie))return null;let We=Ie[E];return!We||typeof We!="object"||Array.isArray(We)?null:We}let le={onCardClick:st,onCopyId:Ve,onDragStart:M,onDragEnd:re,onClosedRangeChange:ae,rollupFor:Ee,isExpanded:_e,onRollupToggle:Ae,onChildClick:pe,onFromChipClick:Pe,onOpenDoc:f?(E,K)=>f(K):void 0,cleanupFailureFor:be,get policy(){return fe()}};function je(E,K){Se||(v(),r(K))}function Ke(E,K){E.preventDefault(),E.stopPropagation(),v(),r(K)}let Je={...le,onCardClick:je,onChildClick:Ke,onFromChipClick:Ke,onOpenDoc:f?(E,K)=>{v(),f(K)}:void 0,get policy(){return fe()}};function De(E){let K=E.target,Ie=e.querySelector(".board-filter__labels");K&&Ie&&Ie.contains(K)||qe()}function Q(E){E.key==="Escape"&&qe()}function U(){ee||(ee=!0,document.addEventListener("mousedown",De),document.addEventListener("keydown",Q),Be())}function qe(){ee&&(ee=!1,document.removeEventListener("mousedown",De),document.removeEventListener("keydown",Q),Be())}function dt(E){E.key==="Escape"&&v()}function tt(){O||(O=!0,document.addEventListener("keydown",dt),Be())}function v(){O&&(O=!1,document.removeEventListener("keydown",dt),Be())}let z={onClose:v,onOverlayClick(E){E.target===E.currentTarget&&v()}},Te={onSearchInput(E){Z.search=String(E.target.value||""),S()},onPriorityChange(E){Z.priority=String(E.target.value||""),S()},onTypeChange(E){Z.type=String(E.target.value||""),S()},onSortChange(E){let K=String(E.target.value||"");if(!(!Lc.has(K)||K===N)){N=K;try{window.localStorage.setItem(Oc,K)}catch{}S()}},onDeferredToggle(){O?v():tt()},onLabelMenuToggle(){ee?qe():U()},onLabelToggle(E){let K=Z.labels.indexOf(E);K===-1?Z.labels.push(E):Z.labels.splice(K,1),S()},onLabelClear(){Z.labels.length!==0&&(Z.labels=[],S())},onNewIssue(){d&&d()}};function Re(){return c`
      <div class="board-view">
        ${Rc(Z,Te,{sort_mode:N,deferred_popup_open:O,deferred_count:I,label_options:ke(),label_menu_open:ee})}
        <div class="board-root">
          ${Br({title:"Blocked",id:"blocked-col",items:D(R)},le)}
          ${Br({title:"Ready",id:"ready-col",items:D(j)},le)}
          ${Br({title:"In progress",id:"in-progress-col",items:D(H)},le)}
          ${Br({title:"Resolved",id:"resolved-col",items:D(ne)},le)}
          ${Br({title:"Closed",id:"closed-col",items:D(F),is_closed:!0,closed_range:h},le)}
        </div>
        ${O?Cc({items:D(X),count:I},Je,z):""}
      </div>
    `}function Be(){it(Re(),e),Xe()}function Xe(){try{let E=e.querySelector("#deferred-popup");E&&!E.open&&(typeof E.showModal=="function"?E.showModal():E.setAttribute("open",""));let K=Array.from(e.querySelectorAll(".board-column, .deferred-popup__body"));for(let Ie of K)Array.from(Ie.querySelectorAll(".board-card")).forEach((Ne,nt)=>{Ne.tabIndex=nt===0?0:-1})}catch{}}async function ft(E,K){if(!s){ye("\uC5F0\uACB0\uB418\uC9C0 \uC54A\uC544 \uC0C1\uD0DC\uB97C \uBCC0\uACBD\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error");return}try{await s("update-status",{id:E,status:K}),ye("\uC0C1\uD0DC \uBCC0\uACBD\uB428","success",1500)}catch(Ie){n("update-status failed: %o",Ie),ye("\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328","error")}}function kt(E){switch(E){case"blocked-col":return R;case"ready-col":return j;case"in-progress-col":return H;case"resolved-col":return ne;default:return[]}}function It(E,K,Ie){if(!s||!i)return;let We=kt(E),Ne=We.find(yt=>yt.id===K);if(!Ne)return;let nt=We.filter(yt=>yt.id!==K),Le=Ie.closest?Ie.closest(".board-card"):null,Ge=nt.length;if(Le){let yt=Le.getAttribute("data-issue-id");if(yt===K)return;let He=nt.findIndex(At=>At.id===yt);He>=0&&(Ge=He)}let et=nt.slice();et.splice(Ge,0,Ne),k.applyReorder(K,et,Ge)}function $t(){for(let E of Array.from(e.querySelectorAll(".board-column--drag-over")))E.classList.remove("board-column--drag-over")}let mt=null;e.addEventListener("dragover",E=>{E.preventDefault(),E.dataTransfer&&(E.dataTransfer.dropEffect="move");let Ie=E.target.closest(".board-column");Ie&&Ie!==mt&&(mt&&mt.classList.remove("board-column--drag-over"),Ie.classList.add("board-column--drag-over"),mt=Ie)}),e.addEventListener("dragleave",E=>{let K=E.relatedTarget;(!K||!e.contains(K))&&mt&&(mt.classList.remove("board-column--drag-over"),mt=null)}),e.addEventListener("drop",E=>{E.preventDefault(),mt&&(mt.classList.remove("board-column--drag-over"),mt=null);let K=E.target,Ie=K.closest(".board-column");if(!Ie)return;let We=E.dataTransfer?.getData("text/plain")||"";if(!We)return;let Ne=Ie.id,nt=se.get(We);if(nt&&nt===Ne){if(G_.has(Ne)){if(N!=="manual"){ye("\uC218\uB3D9(\uB4DC\uB798\uADF8) \uC815\uB82C \uBAA8\uB4DC\uC5D0\uC11C\uB9CC \uC21C\uC11C\uB97C \uBC14\uAFC0 \uC218 \uC788\uC2B5\uB2C8\uB2E4","warning",2e3);return}It(Ne,We,K)}return}let Le=H_[Ne];if(!Le){ye("\uC5EC\uAE30\uB85C\uB294 \uC62E\uAE38 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","warning",1500);return}B.get(We)!==Le&&ft(We,Le)}),e.addEventListener("keydown",E=>{let K=E.target;if(!(K instanceof HTMLElement))return;let Ie=String(K.tagName||"").toLowerCase();if(Ie==="input"||Ie==="textarea"||Ie==="select"||Ie==="button"||Ie==="a"||K.isContentEditable===!0)return;let We=K.closest(".board-card");if(!We)return;let Ne=String(E.key||"");if(Ne==="Enter"||Ne===" "){E.preventDefault();let et=We.getAttribute("data-issue-id");et&&r(et);return}if(Ne!=="ArrowUp"&&Ne!=="ArrowDown"&&Ne!=="ArrowLeft"&&Ne!=="ArrowRight")return;E.preventDefault();let nt=We.closest(".board-column");if(!nt)return;let Le=Array.from(nt.querySelectorAll(".board-card")),Ge=Le.indexOf(We);if(Ne==="ArrowDown"&&Ge<Le.length-1){Ue(We,Le[Ge+1]);return}if(Ne==="ArrowUp"&&Ge>0){Ue(We,Le[Ge-1]);return}if(Ne==="ArrowLeft"||Ne==="ArrowRight"){let et=Array.from(e.querySelectorAll(".board-column")),yt=et.indexOf(nt),He=Ne==="ArrowRight"?1:-1,At=yt+He;for(;At>=0&&At<et.length;){let qt=et[At].querySelector(".board-card");if(qt){Ue(We,qt);return}At+=He}}});function Ue(E,K){try{E.tabIndex=-1,K.tabIndex=0,K.focus()}catch{}}let L=null;m&&m.subscribe&&(L=m.subscribe(()=>{try{S()}catch{}}));let te=null;l&&l.subscribe&&(te=l.subscribe(()=>{try{S()}catch{}}));let ve=null;return a&&a.subscribe&&(ve=a.subscribe(()=>{Be()})),{async load(){n("load"),S()},clear(){qe(),v(),L&&(L(),L=null),te&&(te(),te=null),ve&&(ve(),ve=null),e.replaceChildren(),R=[],j=[],H=[],ne=[],X=[],F=[],B=new Map,se=new Map}}}function bo(e,t){return e.filter(n=>{let r=bs(n);return!(r&&t.has(r))})}async function Y_(e){try{if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")return await navigator.clipboard.writeText(String(e)),!0;let t=document.createElement("textarea");t.value=String(e),t.style.position="fixed",t.style.left="-9999px",document.body.appendChild(t),t.select();let n=!1;try{n=document.execCommand("copy")}finally{t.remove()}return n}catch{return!1}}var nn=e=>e??Ot;async function on(e){let t=String(e);if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")try{return await navigator.clipboard.writeText(t),!0}catch{}try{let n=document.createElement("textarea");n.value=t,n.style.position="fixed",n.style.left="-9999px",document.body.appendChild(n),n.select();let r=!1;try{r=document.execCommand("copy")}finally{n.remove()}return r}catch{return!1}}function wr(e){return[typeof e.runner=="string"?e.runner:null,typeof e.model=="string"?e.model:null,typeof e.effort=="string"?e.effort:null,e.speed==="fast"?"Fast":null].filter(Boolean).join(" \xB7 ")}function yo(e){return typeof e.resumed_from!="string"||e.resumed_from.length===0?null:`${e.continuation_mode==="session"?"session \uC774\uC5B4\uBC1B\uC74C":e.continuation_mode==="fresh"?"\uC0C8 session\uC73C\uB85C \uC774\uC5B4\uBC1B\uC74C":"\uC774\uC804 attempt\uC5D0\uC11C \uC774\uC5B4\uBC1B\uC74C"} (from ${e.resumed_from})`}function V_(e,t=document){let n=t.createElement("dialog");n.className="continuation-dialog";let r=t.createElement("button"),o=t.createElement("button"),s=t.createElement("button"),i=t.createElement("h2"),l=t.createElement("p");return i.textContent="\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4",l.textContent=`${wr(e.prior||{})||"\uC774\uC804 \uC124\uC815"} \u2192 ${wr(e.current||{})||"\uD604\uC7AC \uC124\uC815"}`,r.type="button",r.textContent="\uAE30\uC874 session \uC774\uC5B4\uD558\uAE30",r.disabled=e.prior_available===!1,o.type="button",o.textContent="\uD604\uC7AC preset\uC73C\uB85C \uC0C8 session",s.type="button",s.textContent="\uCDE8\uC18C",n.append(i,l,r,o,s),t.body.append(n),new Promise(a=>{let u=d=>{typeof n.close=="function"&&n.close(),n.remove(),a(d)};r.addEventListener("click",()=>u("prior_session")),o.addEventListener("click",()=>u("fresh_current")),s.addEventListener("click",()=>u(null)),n.addEventListener("cancel",d=>{d.preventDefault(),u(null)}),typeof n.showModal=="function"?n.showModal():n.setAttribute("open","")})}async function zn(e,t,n={}){let r=e;for(n.onResult?.(r);r?.continuation_mismatch;){let o=r.continuation_mismatch,s=await V_(o);if(s===null)return r;r=await t(s,o.decision_token),n.onResult?.(r),r?.conflict&&n.refresh&&(r=await n.refresh(r),n.onResult?.(r))}return r}var X_=["workflow_mode","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed","quick_fix_impl_model","orchestration_model","orchestration_effort","orchestration_speed"],Mc={spec_review_effort:"spec_review_model",plan_review_effort:"plan_review_model",impl_review_effort:"impl_review_model"},Q_=new Set(["native-fixed-posture","unsupported","claude-runner-model-default","catalog-validated","provider-tier-or-runtime-model-default","actual-effort"]);function Ut(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function Lt(e){return typeof e=="string"&&e.length>0?e:null}function Ur(e){return e.startsWith("gpt-")?e.slice(4):e}function Ct(e,t,n,r,o){return{value:e,source:t,display:n,full_value:r,resolution:o}}function Dc(e,t,n){let r=Lt(t[e]);if(r!==null)return{value:r,source:"pin"};let o=Lt(n[e]);return o===null?null:{value:o,source:"global"}}function vo(e,t,n,r){return Dc(e,t,n)||{value:r,source:"base"}}function na(e,t,n,r){let o=n?.implementation?.model_catalog;if(t&&Ut(o?.[t])){let i=Lt(o[t][e]);if(i!==null)return i}if(t&&Array.isArray(o?.[t])&&o[t].includes(e))return e;if(!t&&Ut(o)){for(let i of Object.values(o))if(Ut(i)){let l=Lt(i[e]);if(l!==null)return l}else if(Array.isArray(i)&&i.includes(e))return e}let s=r?.model_index?.[e];return Lt(r?.runners?.[s]?.models?.[e]?.id)||e}function Z_(e,t){return Lt(t?.review?.reviewers?.[e]?.model)||e}function Wr(e,t,n=!1){if(e==="default")return Ct(e,t,`default (\uC77C\uBC18 \xB7 ${t==="pin"?"\uD540":"\uC804\uC5ED \uACE0\uC815"})`,e,"explicit");let r=n?Ur(e):e;return Ct(e,t,r,e,"explicit")}function Nc(e,t,n){let r=t?.implementation?.model_catalog?.[e],o=[];Ut(r)?o.push(...Object.keys(r)):Array.isArray(r)&&o.push(...r.filter(i=>typeof i=="string"));let s=n?.runners?.[e]?.models;if(Ut(s))for(let i of Object.keys(s))o.includes(i)||o.push(i);return o}function J_(e,t){let n=[],r=e?.implementation?.model_catalog;Ut(r)&&n.push(...Object.keys(r));let o=t?.runners;if(Ut(o))for(let s of Object.keys(o))n.includes(s)||n.push(s);return n}function em(e,t,n){if(e===null)return{runtime:null,offered:!1};let r=!1;for(let o of J_(t,n)){let s=Nc(o,t,n);if(s.length>0&&(r=!0),s.includes(e))return{runtime:o,offered:!0}}return{runtime:null,offered:r}}function ra(e){return Ct(e.value,e.source,`${e.value} (\uBE44\uD638\uD658)`,e.value,"incompatible")}function Pc(e,t,n){let r=Dc(e,t,n);return r?Wr(r.value,r.source):Ct(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable")}function mn(e){let t=Ut(e.pin)?e.pin:{},n=Ut(e.global)?e.global:{},r=Ut(e.execution_defaults)?e.execution_defaults:null,o=r?.supported===!0&&Ut(r.session)?r.session:null,s=r?.supported===!0&&Ut(r.orchestration)?r.orchestration:null,i=Ut(e.runner_catalog)?e.runner_catalog:null,l=Lt(n.quick_fix_impl_model),a=em(l,o,i),u={};if(o){let d=vo("workflow_mode",t,n,Lt(o.workflow_mode_default));u.workflow_mode=d.source==="base"?Ct(d.value,"base",d.value||"\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",d.value,"default"):Wr(d.value,d.source);for(let X of["spec_review","plan_review","impl_review"]){let F=`${X}_model`,O=Lt(X==="plan_review"?d.value==="fast_track"?o.plan_review?.fast_track_default:o.plan_review?.standard_recommended:o.review?.default),I=vo(F,t,n,O);if(I.value===null)u[F]=Ct(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable");else if(I.value!=="self"&&I.value!=="skip"&&!Ut(o.review?.reviewers?.[I.value]))u[F]=ra(Ct(I.value,I.source,"",null,"explicit"));else{let N=Z_(I.value,o);u[F]=Ct(I.value,I.source,Ur(N),N,I.source==="base"?"default":"explicit")}}for(let[X,F]of Object.entries(Mc)){let O=u[F].value;if(O==="self"||O==="skip"){u[X]=Ct(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable");continue}let I=Lt(o.review?.reviewers?.[O||""]?.effort),N=vo(X,t,n,I);u[X]=N.value===null?Ct(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"):Ct(N.value,N.source,N.value,N.value,N.source==="base"?"default":"explicit")}let f=Ut(o.implementation?.default)?o.implementation.default:{},h=Lt(e.route),m=h!==null&&["quick_fix","spec_backed","full_plan"].includes(h),k=Ut(o.implementation?.route_defaults)?o.implementation.route_defaults:{},R=m&&Ut(k[h])?k[h]:{};for(let X of["impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"]){let F=vo(X,t,n,X==="impl_dispatch"?Lt(R.dispatch)||Lt(f.dispatch):Lt(f[X.replace("impl_","")]));u[X]=F.value===null?Ct(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"):Ct(F.value,F.source,F.value,F.value,F.source==="base"?"default":"explicit")}let j=Lt(t.impl_runtime),H=j==="inherit"?Lt(e.controller_runtime):j,ne=h==="quick_fix"&&Lt(t.impl_dispatch)===null&&a.runtime!==null&&(j===null||H===a.runtime);if(ne){let X=a.runtime,F=l;u.impl_dispatch=Ct("delegated","global","\uC704\uC784 (\uC804\uC5ED quick_fix)","delegated","explicit"),j===null&&(u.impl_runtime=Ct(X,"global",`${X} (\uC720\uB3C4)`,X,"explicit")),Lt(t.impl_model)===null&&(u.impl_model=Ct(F,"global",F,F,"explicit"))}if(u.impl_dispatch.value==="main"){u.impl_dispatch.display="\uBA54\uC778";for(let X of["impl_runtime","impl_model","impl_effort","impl_speed"])u[X]=Ct(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable")}else{if(u.impl_dispatch.value==="delegated"&&!ne&&(u.impl_dispatch.display="\uC704\uC784"),u.impl_runtime.value==="inherit"&&(u.impl_runtime.display=e.controller_runtime?`inherit (${e.controller_runtime})`:"inherit (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_runtime.resolution="dynamic"),u.impl_model.value!==null){let X=u.impl_runtime.value==="inherit"?Lt(e.controller_runtime):u.impl_runtime.value,F=X?Nc(X,o,i):[];if(u.impl_model.value!=="auto"&&F.length>0&&!F.includes(u.impl_model.value))u.impl_model=ra(u.impl_model);else{let O=na(u.impl_model.value,X,o,i);u.impl_model.display=Ur(O),u.impl_model.full_value=O}}if(u.impl_effort.value==="auto"){let X=Lt(e.transport)||(u.impl_runtime.value==="codex"?"codex-native-spawn":u.impl_runtime.value==="claude"?"implement-claude":null),F=X?Lt(o.implementation?.effort_by_transport?.[X]?.auto):null;F&&!Q_.has(F)?(u.impl_effort.display=`${F} (\uBE44\uD638\uD658)`,u.impl_effort.full_value=F,u.impl_effort.resolution="incompatible"):(u.impl_effort.display="auto (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_effort.resolution="dynamic")}u.impl_speed.value==="default"&&(u.impl_speed=u.impl_speed.source==="base"?Ct("default","base","default (\uC77C\uBC18)","default","default"):Wr("default",u.impl_speed.source))}}else for(let d of X_.filter(f=>!f.startsWith("orchestration_")))u[d]=Pc(d,t,n);if(!o){for(let[d,f]of Object.entries(Mc))(u[f].value==="self"||u[f].value==="skip")&&(u[d]=Ct(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable"));if(u.impl_dispatch.value==="main"){u.impl_dispatch.display="\uBA54\uC778";for(let d of["impl_runtime","impl_model","impl_effort","impl_speed"])u[d]=Ct(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable")}else u.impl_dispatch.value==="delegated"&&(u.impl_dispatch.display="\uC704\uC784"),u.impl_runtime.value==="inherit"&&(u.impl_runtime.display=e.controller_runtime?`inherit (${e.controller_runtime})`:"inherit (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_runtime.resolution="dynamic"),u.impl_effort.value==="auto"&&(u.impl_effort.display="auto (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_effort.resolution="dynamic")}for(let d of["orchestration_model","orchestration_effort","orchestration_speed"]){if(!s){u[d]=Pc(d,t,n);continue}let f=d.replace("orchestration_",""),h=Lt(s[f]),m=vo(d,t,n,h);if(d==="orchestration_effort"&&m.source==="base"){u[d]=Ct(null,"base","CLI \uAE30\uBCF8 (\uBBF8\uC9C0\uC815)",null,"default");continue}if(m.value===null){u[d]=Ct(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable");continue}if(d==="orchestration_model"){let k=m.source==="base"?Lt(s.model_id)||m.value:na(m.value,null,o,i);u[d]=Ct(m.value,m.source,Ur(k),k,m.source==="base"?"default":"explicit");continue}if(m.value==="default"){u[d]=m.source==="base"?Ct("default","base","default (\uC77C\uBC18)","default","default"):Wr("default",m.source);continue}u[d]=Wr(m.value,m.source)}if(o)if(l===null){let d=u.orchestration_model.full_value;u.quick_fix_impl_model=Ct(null,"base",d===null?"\uBA54\uC778":`\uBA54\uC778 (orchestration ${Ur(d)})`,null,"default")}else if(a.runtime!==null){let d=na(l,a.runtime,o,i);u.quick_fix_impl_model=Ct(l,"global",Ur(d),d,"explicit")}else a.offered?u.quick_fix_impl_model=ra(Ct(l,"global","",null,"explicit")):u.quick_fix_impl_model=Wr(l,"global");return u}function tm(e,t){let n=t&&e.value==="default"?"default (\uC77C\uBC18)":e.display;if(!t||e.source==="pin")return`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 ${e.display}`;let r=e.source==="global"?"\uC804\uC5ED":"harness";return`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 ${n} (${r})`}function Es(e){let t=Ut(e.pin)?e.pin:{},n=Ut(e.global)?e.global:{},r=Ut(e.resolution_global)?{...e.resolution_global}:{};delete r[e.key];let o=f=>{let h={...r,...f};return mn({pin:e.layer==="pin"?h:t,global:e.layer==="pin"?n:h,execution_defaults:e.execution_defaults,runner_catalog:e.runner_catalog,route:e.route,controller_runtime:e.controller_runtime})},s=e.layer==="pin"?t:n,i={...s};delete i[e.key];let l=o(i)[e.key],a=o(s)[e.key],u=Lt(s[e.key]),d=[...e.choices];return u!==null&&!d.includes(u)&&d.unshift(u),{unset_label:tm(l,e.layer==="pin"),full_value:l.full_value,unavailable:l.resolution==="unavailable",disabled:a?.resolution==="not_applicable",options:d.map(f=>{let h=o({...s,[e.key]:f})[e.key];return{value:f,label:h.display,full_value:h.full_value}})}}function zr(e=document){let t=e.createElement("dialog");t.className="resume-instructions-dialog";let n=e.createElement("h2"),r=e.createElement("textarea"),o=e.createElement("div"),s=e.createElement("button"),i=e.createElement("button");return n.textContent="\uC138\uC158 \uC774\uC5B4\uD558\uAE30",r.placeholder="\uCD94\uAC00 \uC9C0\uCE68 (\uC120\uD0DD) \u2014 \uBE44\uC6CC\uB450\uBA74 \uAE30\uBCF8 \uC808\uCC28\uB85C \uC7AC\uAC1C",r.maxLength=4e3,o.className="resume-instructions-dialog__actions",s.type="button",s.textContent="\uC774\uC5B4\uD558\uAE30",i.type="button",i.textContent="\uCDE8\uC18C",o.append(s,i),t.append(n,r,o),e.body.append(t),new Promise(l=>{let a=!1,u=f=>{a||(a=!0,typeof t.close=="function"&&t.close(),t.remove(),l(f))},d=()=>u(r.value.trim());s.addEventListener("click",d),i.addEventListener("click",()=>u(null)),r.addEventListener("keydown",f=>{f.key==="Enter"&&(f.ctrlKey||f.metaKey)&&(f.preventDefault(),d())}),t.addEventListener("cancel",f=>{f.preventDefault(),u(null)}),typeof t.showModal=="function"?t.showModal():t.setAttribute("open",""),r.focus()})}function oa(e){return`session:${e.provider}:${e.session_id}`}function wo(e){return`${e.provider} \xB7 ${e.session_id.slice(0,8)}`}function nm(e,t){return e.current&&t==="in_progress"&&e.locality==="local"?"running":"done"}function Hr(e,t,n,r){return{attempt_id:oa(e),session_ref:{bead_id:t,provider:e.provider,session_id:e.session_id},...typeof r=="string"&&r.length>0?{root_dir:r}:{},hide_prompt:!0,meta:{runner:e.provider,label:wo(e),session_id:e.session_id,...typeof e.resume_command=="string"&&e.resume_command.length>0?{resume_command:e.resume_command}:{},status:nm(e,n)}}}var sa="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4",rm="\uBD84\uD574 \uC5C6\uC74C \u2014 \uCD1D\uB7C9\uB9CC \uBCF4\uACE0\uB428",qc="\uBD84\uD574 \uC5C6\uB294 leg";function Nt(e){return typeof e=="number"&&Number.isFinite(e)?e:0}var Dn=["input_tokens","output_tokens","cache_read_input_tokens","cache_creation_input_tokens"],Gr=[...Dn,"reasoning_output_tokens"],om={codex:["implementation","review-consult"],claude:["subagent"]};function ia(e){return!e||typeof e!="object"?!1:Number.isFinite(e.total_tokens)&&!Dn.some(t=>Number.isFinite(e[t]))}function sm(e){return!e||typeof e!="object"?!1:Gr.some(t=>Number.isFinite(e[t]))}function aa(e){let t=0;for(let n of Dn)t+=Nt(e?.[n]);return t}function im(e){return!e||typeof e!="object"?!1:Dn.some(t=>Number.isFinite(e[t]))}function Fc(e){return!e||typeof e!="object"?!1:Gr.some(t=>Number.isFinite(e[t]))||Number.isFinite(e.total_tokens)}function am(e){let t={};for(let n of Gr)e&&Number.isFinite(e[n])&&(t[n]=e[n]);return t}function jc(e){let t={};for(let n of Gr)Number.isFinite(e[n])&&(t[n]=e[n]);return Number.isFinite(e.total_tokens)&&(t.total_tokens=e.total_tokens),e.replayed===!0&&(t.replayed=!0),typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&(t.total_cost_usd=e.total_cost_usd),t}function Bc(e,t){return ia(t)?Nt(t.total_tokens):e==="codex"?Nt(t.input_tokens)+Nt(t.output_tokens):aa(t)}function lm(e){return e==="claude"?"Claude":"Codex"}function cm(e){return`\u03C4 ${Wc(e)}`}function um(e,t){let n=t.breakdown||{},r=Nt(t.total_only_subtotal);if(ia(n)||r>0&&!sm(n)){let u=[`\uCD1D ${t.subtotal.toLocaleString("en-US")}`,rm];return t.replayed&&u.push(sa),u.join(`
`)}let o=[`\uC785\uB825 ${Nt(n.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${Nt(n.output_tokens).toLocaleString("en-US")}`];e==="claude"?o.push(`\uCE90\uC2DC\uC77D\uAE30 ${Nt(n.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${Nt(n.cache_creation_input_tokens).toLocaleString("en-US")}`):(o.push(`\uCE90\uC2DC\uC77D\uAE30 ${Nt(n.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC4F0\uAE30 ${Nt(n.cache_creation_input_tokens).toLocaleString("en-US")}`),Number.isFinite(n.reasoning_output_tokens)&&o.push(`\uCD94\uB860\uCD9C\uB825 ${Nt(n.reasoning_output_tokens).toLocaleString("en-US")}`)),r>0&&o.push(`${qc} ${r.toLocaleString("en-US")}`);let s=e==="claude"?"\uC785\uB825 + \uCD9C\uB825 + \uCE90\uC2DC\uC77D\uAE30 + \uCE90\uC2DC\uC0DD\uC131":"\uC785\uB825 + \uCD9C\uB825",i=r>0?`${s} + ${qc}`:s,a=[e==="claude"?`Claude subtotal = ${i}`:`Codex subtotal = ${i}; \uCE90\uC2DC\uC77D\uAE30\xB7\uCE90\uC2DC\uC4F0\uAE30\xB7\uCD94\uB860\uCD9C\uB825\uC740 subtotal\uC5D0 \uD3EC\uD568\uB418\uC9C0 \uC54A\uB294 subset`,`\uCD1D ${t.subtotal.toLocaleString("en-US")}`,o.join(" \xB7 ")];return typeof t.total_cost_usd=="number"&&Number.isFinite(t.total_cost_usd)&&a.push(`$${t.total_cost_usd.toFixed(2)}`),t.replayed&&a.push(sa),a.join(`
`)}function Jt(e){let t=[];if(!e||typeof e!="object"||!("providers"in e)||!e.providers)return t;for(let n of["claude","codex"]){let r=e.providers[n];r&&t.push({provider:n,label:`${lm(n)} ${cm(r.subtotal)}${typeof r.total_cost_usd=="number"&&Number.isFinite(r.total_cost_usd)?` \xB7 $${r.total_cost_usd.toFixed(2)}`:""}`,tooltip:um(n,r)})}return t}function Cs(e){let t={},n={claude:!0,codex:!1},r={claude:0,codex:0};for(let o of e)if(!(!o||!o.providers))for(let s of["claude","codex"]){let i=o.providers[s];if(!i)continue;let l=t[s];l||(l={subtotal:0,breakdown:{}},t[s]=l),l.subtotal+=i.subtotal,Number.isFinite(i.total_only_subtotal)&&(l.total_only_subtotal=Nt(l.total_only_subtotal)+Nt(i.total_only_subtotal));for(let a of Gr)Number.isFinite(i.breakdown[a])&&(l.breakdown[a]=Nt(l.breakdown[a])+Nt(i.breakdown[a]));i.replayed&&(l.replayed=!0),s==="claude"&&(typeof i.total_cost_usd=="number"&&Number.isFinite(i.total_cost_usd)?r.claude+=i.total_cost_usd:n.claude=!1)}return t.claude&&n.claude&&(t.claude.total_cost_usd=r.claude),Object.keys(t).length===0?null:{providers:t,roles:{}}}function la(e){return!e||typeof e!="object"?null:Gn({attempt:{...e,bead_id:"__attempt__"}},"__attempt__")}function dm(e){return e==="codex"?"codex":"claude"}function Pn(){return{subtotal:0,breakdown:am(null),total_only:0,legs:[],replayed:!1,outer_count:0,outer_cost:0,outer_cost_count:0}}function Ts(e,t,n){e.subtotal+=t.subtotal,ia(t.usage)&&(e.total_only+=t.subtotal);for(let r of Gr)Number.isFinite(t.usage[r])&&(e.breakdown[r]=Nt(e.breakdown[r])+Nt(t.usage[r]));e.legs.push(t),t.replayed===!0&&(e.replayed=!0),n&&(e.outer_count+=1,typeof t.usage.total_cost_usd=="number"&&Number.isFinite(t.usage.total_cost_usd)&&(e.outer_cost+=t.usage.total_cost_usd,e.outer_cost_count+=1))}function Uc(e,t){let n={subtotal:e.subtotal,breakdown:e.breakdown};return e.total_only>0&&(n.total_only_subtotal=e.total_only),t&&(n.legs=e.legs),e.replayed&&(n.replayed=!0),n}function Wc(e){return e>=1e6?`${(e/1e6).toFixed(1)}M`:e>=1e3?`${(e/1e3).toFixed(1)}k`:String(e)}function Kr(e){return im(e)?`\u03C4 ${Wc(aa(e))}`:null}function Hn(e){let t=Kr(e);if(!t)return null;let n=e?.total_cost_usd;return typeof n=="number"&&Number.isFinite(n)?`${t} \xB7 $${n.toFixed(2)}`:t}function ko(e){if(!e||typeof e!="object")return"";let t=[`\uC785\uB825 ${Nt(e.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${Nt(e.output_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC77D\uAE30 ${Nt(e.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${Nt(e.cache_creation_input_tokens).toLocaleString("en-US")}`];typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&t.push(`$${e.total_cost_usd.toFixed(2)}`);let n=[`\uCD1D ${aa(e).toLocaleString("en-US")}`,t.join(" \xB7 ")];return e.replayed&&n.push(sa),n.join(`
`)}function Gn(e,t){let n={claude:Pn(),codex:Pn()},r={orchestrator:{claude:Pn(),codex:Pn()},implementation:{claude:Pn(),codex:Pn()},"review-consult":{claude:Pn(),codex:Pn()},subagent:{claude:Pn(),codex:Pn()}},o=new Set;for(let l of Object.values(e||{})){if(!l||l.bead_id!==t)continue;let a=l.usage;if(Fc(a)){let d=dm(l.runner),f=jc(a),h={provider:d,role:"orchestrator",attempt_id:String(l.attempt_id||""),usage:f,subtotal:Bc(d,f)};f.replayed===!0&&(h.replayed=!0),typeof l.model=="string"&&(h.model=l.model),typeof l.session_id=="string"&&(h.session_id=l.session_id),Ts(n[d],h,!0),Ts(r.orchestrator[d],h,!0)}let u=Array.isArray(l.usage_legs)?l.usage_legs:[];for(let d of u){let f=d&&d.provider==="claude"?"claude":"codex";if(!d||d.provider!=="codex"&&d.provider!=="claude"||!om[f].includes(d.role)||!Fc(d.usage))continue;let h=typeof d.receipt_id=="string"&&d.receipt_id.length>0?d.receipt_id:null;if(!h||o.has(h))continue;o.add(h);let m=jc(d.usage),k={provider:f,role:d.role,attempt_id:String(l.attempt_id||""),usage:m,subtotal:Bc(f,m)};k.receipt_id=h,typeof d.agent_type=="string"&&(k.agent_type=d.agent_type),typeof d.agent_id=="string"&&(k.agent_id=d.agent_id),typeof d.model=="string"&&(k.model=d.model),typeof d.effort=="string"&&d.effort.trim().length>0&&(k.effort=d.effort),typeof d.session_id=="string"?k.session_id=d.session_id:typeof d.thread_id=="string"&&(k.session_id=d.thread_id),typeof d.turn_id=="string"&&(k.turn_id=d.turn_id),(typeof d.completed_at=="string"||typeof d.completed_at=="number"&&Number.isFinite(d.completed_at))&&(k.completed_at=d.completed_at),m.replayed===!0&&(k.replayed=!0),Ts(n[f],k,!1),Ts(r[k.role][f],k,!1)}}let s={};for(let l of["claude","codex"]){let a=n[l];if(a.legs.length===0)continue;let u=Uc(a,!1);l==="claude"&&a.outer_count>0&&a.outer_cost_count===a.outer_count&&(u.total_cost_usd=a.outer_cost),s[l]=u}if(Object.keys(s).length===0)return null;let i={};for(let l of["orchestrator","implementation","review-consult","subagent"]){let a={};for(let u of["claude","codex"]){let d=r[l][u];d.legs.length>0&&(a[u]={...Uc(d,!0),legs:d.legs})}Object.keys(a).length>0&&(i[l]=a)}return{providers:s,roles:i}}var pm=".chip-popover, .judgement-chip";function Yr(e){let t=null,n=!1;function r(d){return t!==null&&t.bead_id===d.bead_id&&t.chip_key===d.chip_key}function o(d){t=r(d)?null:{...d},e()}function s(){t!==null&&(t=null,e())}function i(d){let f=d.target;t!==null&&(f&&typeof f.closest=="function"&&f.closest(pm)||s())}function l(d){d.key==="Escape"&&s()}function a(){n||(n=!0,document.addEventListener("click",i),document.addEventListener("keydown",l))}function u(){n&&(n=!1,document.removeEventListener("click",i),document.removeEventListener("keydown",l))}return{toggle:o,close:s,isOpen:r,attach:a,detach:u}}function Vr(e){return c`<div
    class="chip-popover"
    role="dialog"
    aria-label=${e.title}
  >
    <div class="chip-popover__title">${e.title}</div>
    <ul class="chip-popover__lines">
      ${e.lines.map(t=>c`<li>${t}</li>`)}
    </ul>
  </div>`}var zc={running:3,paused:2,failed:1};function Kn(e){if(!e||typeof e!="object")return!1;let t=e.kind;return t==null||t==="implementation"}function Hc(e){let t=Object.values(e||{}),n=new Map;for(let r of t){if(!r||typeof r.bead_id!="string"||r.bead_id.length===0||r.kind!=="review_session"||r.status!=="running")continue;let o=typeof r.started_at=="number"?r.started_at:null,s=n.get(r.bead_id);s&&(s.started_at??0)>(o??0)||n.set(r.bead_id,{attempt:r,origin:r.origin==="click"||r.origin==="auto"?r.origin:null,started_at:o})}return n}function Gc(e,t){let n=Object.values(e||{}),r=new Set,o=new Map;for(let i of n)!i||typeof i.bead_id!="string"||(typeof i.resumed_from=="string"&&i.resumed_from.length>0&&r.add(i.resumed_from),Kn(i)&&o.set(i.bead_id,i.attempt_id));let s=new Map;for(let i of n){if(!i||typeof i.bead_id!="string"||i.bead_id.length===0||!Kn(i))continue;let l=null;if(i.status==="running")l="running";else if(i.status==="paused"&&!r.has(i.attempt_id))l="paused";else if(i.status==="failed"||i.status==="orphaned"){let d=t.get(i.bead_id),f=typeof d=="number"&&d>0&&typeof i.finished_at=="number"&&d>=i.finished_at;o.get(i.bead_id)===i.attempt_id&&!f&&typeof i.dismissed_at!="number"&&(l="failed")}if(!l)continue;let a=typeof i.started_at=="number"?i.started_at:null,u=s.get(i.bead_id);if(u){let d=zc[u.run_state],f=zc[l];if(d>f||d===f&&(u.started_at??0)>(a??0))continue}s.set(i.bead_id,{attempt:i,run_state:l,started_at:a})}return{winners:s,resumed_from_ids:r}}var Rs=["workflow_mode","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"],ua=[...Rs.filter(e=>e!=="impl_dispatch"),"quick_fix_impl_model"],Yn=["orchestration_model","orchestration_effort","orchestration_speed"],Xr=[...Rs,...Yn],fm=ua.filter(e=>Xr.includes(e)),Kc=["delegated","main"],Os=["inherit","claude","codex"],$o=["default","fast"],xo=["standard","fast_track"],Ao=["codex","opus","fable","self","skip"],Ls=["codex","fable","skip"],Is=["low","medium","high","xhigh"],hn="auto";function gn(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function Yc(e){if(!gn(e)||!gn(e.runners))return[];let t=[];for(let[n,r]of Object.entries(e.runners))gn(r)&&gn(r.models)&&t.push([n,Object.keys(r.models)]);return t}function Qr(e,t){let n=Yc(e),r=t&&t!=="inherit"?n.filter(([o])=>o===t):n;return[hn,...r.flatMap(([,o])=>o)]}function Vc(e,t,n,r){if(!gn(e)||!gn(e.runners))return[hn];let o=[];for(let[s,i]of Object.entries(e.runners))if(!(!gn(i)||!gn(i.models))&&!(t&&t!=="inherit"&&s!==t))for(let[l,a]of Object.entries(i.models)){if(n&&n!==hn&&l!==n)continue;let u=r(i,a);if(Array.isArray(u))for(let d of u)typeof d=="string"&&!o.includes(d)&&o.push(d)}return[hn,...o]}function Zr(e,t,n){return Vc(e,t,n,(r,o)=>gn(o)&&Array.isArray(o.efforts)?o.efforts:r.efforts)}function da(e,t,n){return Vc(e,t,n,(r,o)=>gn(o)&&Array.isArray(o.orchestration_efforts)?o.orchestration_efforts:gn(o)&&Array.isArray(o.efforts)?o.efforts:r.efforts)}function So(e,t){let n=Yc(e);return(t?n.filter(([o])=>o===t):n).flatMap(([,o])=>o)}function Xc(e,t,n){let r={impl_runtime:e?.impl_runtime,impl_model:e?.impl_model,impl_effort:e?.impl_effort},o=r.impl_runtime==="claude"||r.impl_runtime==="codex"?r.impl_runtime:r.impl_runtime==="inherit"?n:null;return o&&(r.impl_model&&!Qr(t,o).includes(r.impl_model)&&(r.impl_model=void 0),r.impl_effort&&!Zr(t,o,r.impl_model||hn).includes(r.impl_effort)&&(r.impl_effort=void 0)),r}var _m={workflow_mode:"\uC6CC\uD06C\uD50C\uB85C \uBAA8\uB4DC",spec_review_model:"\uC2A4\uD399 \uB9AC\uBDF0\uC5B4",spec_review_effort:"\uC2A4\uD399 \uB9AC\uBDF0 effort",plan_review_model:"\uACC4\uD68D \uB9AC\uBDF0\uC5B4",plan_review_effort:"\uACC4\uD68D \uB9AC\uBDF0 effort",impl_review_model:"\uAD6C\uD604 \uB9AC\uBDF0\uC5B4",impl_review_effort:"\uAD6C\uD604 \uB9AC\uBDF0 effort",impl_runtime:"\uC704\uC784 \uB300\uC0C1",impl_model:"\uAD6C\uD604 \uBAA8\uB378",impl_effort:"\uAD6C\uD604 effort",impl_speed:"\uAD6C\uD604 \uC18D\uB3C4",orchestration_model:"\uC6CC\uCEE4 \uBAA8\uB378",orchestration_effort:"\uC6CC\uCEE4 effort",orchestration_speed:"\uC6CC\uCEE4 \uC18D\uB3C4"},ca=[...fm,...Yn],mm=[...Xr,...ua].filter((e,t,n)=>n.indexOf(e)===t&&!ca.includes(e));function Qc(e,t){let n=gn(e)?e:{},r=gn(t)?t:{},o=[];for(let i of ca){let l=n[i]??null,a=r[i]??null;l!==a&&o.push({key:i,label:_m[i]||i,before:l,after:a,kind:l===null?"added":a===null?"removed":"changed"})}let s=[];for(let i of[...mm,...Object.keys(r)])!ca.includes(i)&&!s.includes(i)&&Object.hasOwn(r,i)&&s.push(i);return{rows:o,ignored_keys:s}}function pa(e,t,n,r,o,s){return Es({key:e,choices:t,layer:"global",global:n,resolution_global:s,execution_defaults:r,runner_catalog:o})}function Zc(e,t){let n={};for(let r of ua){let o=e?.[r],s=t?.[r];o!==s&&(n[r]=typeof s=="string"&&s.length>0?s:null)}return n}function Jc(e,t){let n={};for(let r of Yn){let o=e?.[r]??null,s=t?.[r]??null;o!==s&&(n[r]=typeof s=="string"&&s.length>0?s:null)}return n}var fa=[{id:"workflow",label:"\uC6CC\uD06C\uD50C\uB85C\uC6B0",keys:["workflow_mode"]},{id:"review",label:"\uB9AC\uBDF0",keys:["spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort"]},{id:"implementation",label:"\uAD6C\uD604",keys:["impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"]},{id:"worker",label:"Worker",keys:[...Yn]}],sr={workflow_mode:"\uBAA8\uB4DC",spec_review_model:"\uC0AC\uC591 \uB9AC\uBDF0",spec_review_effort:"\uC0AC\uC591 \uB9AC\uBDF0 effort",plan_review_model:"\uACC4\uD68D \uB9AC\uBDF0",plan_review_effort:"\uACC4\uD68D \uB9AC\uBDF0 effort",impl_review_model:"\uAD6C\uD604 \uB9AC\uBDF0",impl_review_effort:"\uAD6C\uD604 \uB9AC\uBDF0 effort",impl_dispatch:"\uC2E4\uD589 \uBC29\uC2DD",impl_runtime:"\uC704\uC784 \uB300\uC0C1",impl_model:"\uBAA8\uB378",impl_effort:"effort",impl_speed:"\uC18D\uB3C4",orchestration_model:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uBAA8\uB378",orchestration_effort:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 effort",orchestration_speed:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uC18D\uB3C4"},Ms={pin:"\uD540",global:"\uC804\uC5ED",base:"\uAE30\uBCF8"};function _a(e,t,n,r,o,s=null){let i=mn({pin:t,global:n,execution_defaults:r,runner_catalog:o,route:t&&typeof t.route=="string"?t.route:null,controller_runtime:s});return e.map(l=>({key:l,...i[l]}))}function eu(e,t,n,r,o,s=null){let i={pin:0,global:0,base:0};for(let l of _a(e,t,n,r,o,s))i[l.source]+=1;return i}function tu(e,t,n){return{id:e,key:t,value:typeof n=="string"?n:""}}function nu(e,t,n){return typeof t!="string"||t.length===0?null:{id:e,preset_id:t,expected_revision:n}}var qk=[...Rs,...Yn];var ru=["orchestration_model","orchestration_effort","orchestration_speed","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_runtime","impl_model","impl_effort"];function Eo(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function Ps(e){if(!Eo(e)||!Eo(e.runners))return null;let t=Object.entries(e.runners).filter(([,n])=>Eo(n)&&Eo(n.models));return t.length>0?t:null}function xn(e,t){let n=Ps(e);if(!n||!t)return null;for(let[r,o]of n)if(Object.hasOwn(o.models,t))return r;return null}function ou(e,t){return Eo(t)&&Array.isArray(t.efforts)?t.efforts.slice():Array.isArray(e.efforts)?e.efforts.slice():[]}function su(e,t){let n=Ps(e);if(!n||!t)return[];for(let[,r]of n)if(Object.hasOwn(r.models,t))return ou(r,r.models[t]);return[]}function gm(e){let t=Ps(e);if(!t)return[];let n=[];for(let[,r]of t)for(let o of Object.values(r.models))for(let s of ou(r,o))n.includes(s)||n.push(s);return n}function hm(e,t){if(!t)return gm(e);let r=Ps(e)?.find(([s])=>s===t)?.[1];if(!r)return[];let o=[];for(let s of Object.keys(r.models))for(let i of su(e,s))o.includes(i)||o.push(i);return o}function iu(e,t,n){let r={impl_runtime:e.impl_runtime||"",impl_model:e.impl_model||"",impl_effort:e.impl_effort||""},o=r.impl_runtime==="inherit"?n:r.impl_runtime==="claude"||r.impl_runtime==="codex"?r.impl_runtime:null;if(r.impl_runtime==="inherit"&&!o)return r.impl_model="",r.impl_effort="",r;let s=xn(t,r.impl_model);if(r.impl_model&&(!o||s!==o))return r.impl_model="",r.impl_effort="",r;let i=r.impl_model?su(t,r.impl_model):hm(t,o);return r.impl_effort&&i.length>0&&!i.includes(r.impl_effort)&&(r.impl_effort=""),r}var ma=new Set(["unavailable","not_applicable"]);function ir(e,t){if(typeof e!="object"||e===null)return null;let n=e[t];return typeof n=="object"&&n!==null?n:null}function au(e){return e.filter(t=>t!==null).join(" \xB7 ")}function ar(e,t){return t===null?null:`${sr[e]}: ${t.display} (${Ms[t.source]})`}function ga(e){return e.filter(t=>t!==null).join(`
`)}function ha(e){if(typeof e!="object"||e===null)return null;let t=wr(e);if(t==="")return null;let n=(r,o)=>typeof o=="string"&&o.length>0?`${r}: ${o}`:null;return{text:t,title:ga(["\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \u2014 \uC774 attempt\uC5D0 \uAE30\uB85D\uB41C \uC2E4\uD589\uAC12",n("runner",e.runner),n(sr.orchestration_model,e.model),n(sr.orchestration_effort,e.effort),n(sr.orchestration_speed,e.speed)])}}function Jr(e,t){let n=ir(e,"orchestration_model");if(n===null||n.resolution==="unavailable")return null;let r=ir(e,"orchestration_effort"),o=ir(e,"orchestration_speed"),s=au([xn(t,n.value??""),n.display,r!==null&&r.value!==null?r.display:null,o!==null&&o.value==="fast"?"Fast":null]);return s===""?null:{text:s,title:ga(["\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \u2014 \uD604\uC7AC \uD574\uC11D\uAC12 (\uD540 > \uD050 \uAE30\uBCF8\uAC12)",ar("orchestration_model",n),ar("orchestration_effort",r),ar("orchestration_speed",o)])}}function bm(e,t){return e===null||e.value===null||ma.has(e.resolution)?null:e.value!=="inherit"?e.value:t?`inherit\u2192${t}`:"inherit"}function ym(e){return e===null||ma.has(e.resolution)?null:e.value==="auto"?"auto":e.display}function vm(e){return e===null?null:e.value==="auto"?"auto":ma.has(e.resolution)?null:e.display}function kr(e,t){if(typeof e!="object"||e===null)return null;let n=ir(e,"impl_dispatch"),r=ir(e,"impl_runtime"),o=ir(e,"impl_model"),s=ir(e,"impl_effort"),i=ir(e,"impl_speed"),l=n!==null&&n.value==="main"?"\uBA54\uC778":au([bm(r,t??null),ym(o),vm(s),i!==null&&i.value==="fast"?"Fast":null]);return l===""?null:{text:l,title:ga(["\uC6CC\uCEE4(\uAD6C\uD604 \uC704\uC784) \u2014 \uD604\uC7AC \uD574\uC11D\uAC12 (\uD540 > \uC804\uC5ED kv > \uAE30\uBCF8). \uC2E4\uD589 \uC911\uC774\uBA74 \uC138\uC158\uC774 \uC2DC\uC791 \uC2DC \uACE0\uC815\uD55C \uAC12\uACFC \uB2E4\uB97C \uC218 \uC788\uC74C",ar("impl_dispatch",n),ar("impl_runtime",r),ar("impl_model",o),ar("impl_effort",s),ar("impl_speed",i)])}}var wm=Object.freeze(new Set(["push_not_contained","invalid_impl_review","premature_close","head_mismatch","foreign_deploy_unsupported","not_resolved"])),km=Object.freeze(["delivery_unproven:"]);function Ds(e){let t=e&&typeof e.reason=="string"?e.reason:"";if(t.length===0||wm.has(t))return"session";for(let n of km)if(t.startsWith(n))return"session";return"settlement"}var $m=["hard_diagnosis","invariant_reasoning","verification_by_judgment","claude_bound"];var xm={hard_diagnosis:"\uC6D0\uC778\uC774 \uBD88\uBA85\uD655\uD558\uAC70\uB098 \uC7AC\uD604\uC774 \uBD88\uC548\uC815\uD574 \uAC00\uC124-\uAC80\uC99D \uB8E8\uD504\uAC00 \uD544\uC694\uD558\uB2E4",invariant_reasoning:"\uC815\uD569\uC131\uC774 \uC0C1\uD0DC\uAE30\uACC4\xB7\uB3D9\uC2DC\uC131\xB7\uBD88\uBCC0\uC2DD \uCD94\uB860\uC5D0 \uB2EC\uB824 \uC788\uB2E4",verification_by_judgment:"\uD14C\uC2A4\uD2B8\uAC00 \uBABB \uC7A1\uACE0 \uB9AC\uBDF0\uC5B4\uC758 \uCD94\uB860\uC73C\uB85C\uB9CC \uAC80\uC99D\uD560 \uC218 \uC788\uB2E4",claude_bound:"Claude \uC138\uC158 \uC790\uC0B0\xB7\uC758\uBBF8\uB860\uC5D0 \uAC15\uD558\uAC8C \uBB36\uC5EC \uC788\uB2E4"};function ba(e){return(e&&Array.isArray(e.reasons)?e.reasons:[]).map(n=>xm[n]||"").filter(n=>n.length>0)}var lu={orchestration_model:["fable"],impl_runtime:["claude"]},ya={unapplied:"\uBBF8\uC801\uC6A9",applied:"\uC801\uC6A9\uB428",diverged:"\uCD94\uCC9C\uACFC \uB2E4\uB984"};function cu(e){return typeof e=="object"&&e!==null?e:null}function uu(e,t){return typeof e=="string"&&t.includes(e)?e:""}function Am(e){return typeof e!="string"?[]:e.split("+").map(t=>t.trim()).filter(t=>$m.includes(t))}function To(e,t=e){let n=cu(e);if(!n)return null;let r=uu(n.rec_orchestration_model,lu.orchestration_model);if(r.length===0)return null;let o=uu(n.rec_impl_runtime,lu.impl_runtime),s={orchestration_model:r};o.length>0&&(s.impl_runtime=o);let i=cu(t)||{},l=Object.keys(s),a=0,u=0;for(let f of l){let h=i[f];typeof h=="string"&&h.length>0&&(a+=1,h===s[f]&&(u+=1))}let d=a===0?"unapplied":u===l.length?"applied":"diverged";return{reasons:Am(n.rec_reason),rec:s,state:d}}function Ns(e){if(!e||typeof e!="object")return"";let t=ba(e),n=ya[e.state]||"",r=["\uBCF5\uC7A1\uD55C \uC791\uC5C5\uC73C\uB85C \uD310\uC815\uB428"];return t.length>0&&r.push(`\uC0AC\uC720: ${t.join(" \xB7 ")}`),n.length>0&&r.push(`\uC0C1\uD0DC: ${n}`),r.join(`
`)}function qs(e){return e.replace(/\/+$/,"")}function Sm(e,t){let n=qs(e),r=qs(t);return n===r||r.startsWith(`${n}/`)||n.startsWith(`${r}/`)}function Fs(e,t){let n=new Set;for(let r of e)for(let o of t){if(!Sm(r,o))continue;let s=qs(r),i=qs(o);n.add(s.length>=i.length?s:i)}return[...n].sort()}function va(e,t){return`${e}\0${t}`}function du(e){let t=new Map;for(let n of Array.isArray(e?.running)?e.running:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"running",state:"running"});for(let n of Array.isArray(e?.pr_wait)?e.pr_wait:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"pr_wait",state:"pr_wait"});for(let n of Array.isArray(e?.queue_groups)?e.queue_groups:[]){let r=Array.isArray(n.sublanes?.parallel)?n.sublanes.parallel:Array.isArray(n.items)?n.items:[];for(let o of r)t.set(o.id,{root_dir:o.root_dir,workspace_name:o.workspace_name,lane:"parallel",position:o.queue_position});for(let o of Array.isArray(n.sublanes?.serial)?n.sublanes.serial:[])for(let s of o.items)t.set(s.id,{root_dir:s.root_dir,workspace_name:s.workspace_name,lane:o.id,position:s.queue_position})}for(let n of Array.isArray(e?.runnable)?e.runnable:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"runnable",state:"runnable"});for(let n of Array.isArray(e?.done)?e.done:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"done",state:"done"});return t}function wa(e,t){let n=Array.isArray(t)?t:[],r=e.indexOf("-"),o=r>0?e.slice(0,r):e;return n.some(s=>typeof s?.issue_prefix=="string"&&s.issue_prefix===o)?"internal":n.length>0&&n.every(s=>typeof s?.issue_prefix=="string")?"external":"unknown"}function Co(e){if(e.state==="running")return"\uC2E4\uD589\uC911";if(e.state==="pr_wait")return"PR \uB300\uAE30";if(e.state==="runnable")return"\uC2E4\uD589\uAC00\uB2A5";if(e.state==="done")return"\uC644\uB8CC";let t=e.lane==="parallel"?"\uBCD1\uB82C":e.lane;return`${e.workspace_name} \xB7 ${t} #${e.position}`}function pu(e,t,n,r){let o=n.get(e);if(!!(o&&t&&o.root_dir===t.root_dir&&o.lane===t.lane&&typeof o.position=="number"&&typeof t.position=="number"&&o.position<t.position))return{id:e,label:`\u{1F512} ${e} (\uAC19\uC740 \uB808\uC778 \uC55E)`,location_label:"\uAC19\uC740 \uB808\uC778 \uC55E",scope:null,same_lane_ahead:!0};if(o)return{id:e,label:`\u{1F512} ${e} (${Co(o)})`,location_label:Co(o),scope:null,same_lane_ahead:!1};let i=wa(e,r),l=i==="internal"?"\uBBF8\uC801\uC7AC":i==="external"?"\uC678\uBD80":"\uC704\uCE58 \uBBF8\uD655\uC778";return{id:e,label:`\u{1F512} ${e} (${l})`,location_label:l,scope:i,same_lane_ahead:!1}}function fu(e){let t=Array.isArray(e)?e:[],n=new Map,r=new Map,o=new Map;for(let l of t)for(let a of Array.isArray(l.sublanes?.serial)?l.sublanes.serial:[]){let u=va(l.root_dir,a.id);n.set(u,{root_dir:l.root_dir,workspace_name:l.name,lane:a.id}),o.set(u,[]);for(let d of Array.isArray(a.items)?a.items:[])r.set(d.id,u)}for(let l of t)for(let a of Array.isArray(l.sublanes?.serial)?l.sublanes.serial:[]){let u=va(l.root_dir,a.id),d=Array.isArray(a.items)?a.items[0]:null,h=!!d&&d.queue_index===0&&(!Array.isArray(a.occupied_by)||a.occupied_by.length===0)&&Array.isArray(d.blocked_by)?d.blocked_by:[],m=o.get(u);if(m)for(let k of h){let R=r.get(k);R&&R!==u&&!m.includes(R)&&m.push(R)}}let s=(l,a)=>{let u=new Set,d=[l];for(;d.length>0;){let f=d.pop();if(f===a)return!0;!f||u.has(f)||(u.add(f),d.push(...o.get(f)||[]))}return!1},i=new Map;for(let[l,a]of o){let u=[];for(let d of a){let f=n.get(d);s(d,l)&&f&&u.push(f)}u.length>0&&i.set(l,u)}return i}function _u(e,t){return va(e,t)}async function Em(e){let t=await on(e);ye(t?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",t?"success":"error",1200)}function eo(e){return typeof e!="string"||e.length===0?"":c`<span class="worker-ev__copyline"
    ><code class="worker-ev__path">${e}</code
    ><button
      type="button"
      class="worker-ev__copy"
      data-seam="log-path-copy"
      title="로그 경로 복사"
      aria-label=${`\uB85C\uADF8 \uACBD\uB85C \uBCF5\uC0AC: ${e}`}
      @click=${()=>{Em(e)}}
    >
      ⧉
    </button></span
  >`}function Us(e){return typeof e=="string"&&e.length>=7?e.slice(0,7):"\u2014"}function hu(e){return e==="session"?"bead\uAC00 in_progress\uB85C \uC7A1\uD78C \uB4A4 \uB2EB\uD788\uAE30\uAE4C\uC9C0\uC758 \uACBD\uACFC":"attempt \uC2E4\uD589 \uC2DC\uAC04 \uD569\uC0B0 (\uC7AC\uAC1C \uC138\uC158 \uD3EC\uD568)"}function xr(e){if(typeof e!="number"||!Number.isFinite(e)||e<0)return"\u2014";if(e<1e3)return`${Math.round(e)}ms`;let t=e/1e3;if(t<60)return`${t.toFixed(1)}\uCD08`;let n=Math.floor(t/60);if(n<60)return`${n}\uBD84 ${Math.round(t-n*60)}\uCD08`;let r=Math.floor(n/60),o=n%60;return`${r}\uC2DC\uAC04 ${o}\uBD84`}function bu(e,t){if(typeof e!="object"||e===null)return[];let n=!1,r=!1;for(let o of Object.values(e)){if(typeof o!="object"||o===null)continue;let s=o;s.bead_id!==t||s.kind!=="review_session"||(n=!0,r=r||s.origin==="auto")}return n?[r?"\uB9AC\uBDF0 \xB7 \uC790\uB3D9":"\uB9AC\uBDF0"]:[]}function mu(e){return e==="auto"||e==="click"?e:null}function yu(e,t){if(typeof e!="object"||e===null)return{active:!1,failure:null,origin:null};let n=!1,r=null,o=-1,s=null,i=null,l=-1;for(let a of Object.values(e)){if(typeof a!="object"||a===null)continue;let u=a;if(u.bead_id!==t||u.kind!=="review_session")continue;if(u.status==="pending"||u.status==="running"){n=!0;let f=typeof u.started_at=="number"?u.started_at:0;f>=o&&(o=f,r=mu(u.origin));continue}if(u.status!=="failed")continue;let d=typeof u.finished_at=="number"?u.finished_at:0;d>=l&&(l=d,s=typeof u.cause=="string"&&u.cause.length>0?u.cause:null,i=mu(u.origin))}return n?{active:!0,failure:null,origin:r}:{active:!1,failure:s,origin:i}}function vu(e,t){if(typeof e!="object"||e===null)return null;let n=0,r=!1;for(let o of Object.values(e)){if(typeof o!="object"||o===null)continue;let s=o;if(s.bead_id!==t)continue;let i=s.started_at,l=s.finished_at;typeof i!="number"||typeof l!="number"||!Number.isFinite(i)||!Number.isFinite(l)||l<i||(n+=l-i,r=!0)}return r?n:null}function Ws(e){if(typeof e!="number"||!Number.isFinite(e)||e<=0)return"";let t=new Date(e);return`${String(t.getHours()).padStart(2,"0")}:${String(t.getMinutes()).padStart(2,"0")}`}function Tm(e,t){let n=Array.isArray(e)?e:[],r=Array.isArray(t)?t:[];if(n.length===0&&r.length===0)return null;let o=null;for(let i of n)i.kind!=="deploy"||i.state!=="succeeded"||typeof i.target_sha!="string"||(!o||(typeof i.finished_at=="number"?i.finished_at:0)>(typeof o.finished_at=="number"?o.finished_at:0))&&(o=i);let s=n.filter(i=>i.state==="failed"&&!i.dismissed&&!i.superseded_by).length+r.length;return{deploy:o?{sha:Us(o.target_sha),at:typeof o.finished_at=="number"?o.finished_at:null,elapsed_ms:typeof o.elapsed_ms=="number"?o.elapsed_ms:null}:null,unresolved:s,badge:s>0?{tone:"act",label:`\uD574\uACB0 \uD544\uC694 ${s}`}:{tone:"quiet",label:"\uBAA8\uB450 \uC815\uC0C1"}}}function wu(e,t){let n=Tm(e,t);return n?c`<button
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
            title=${n.deploy.at?Gt(n.deploy.at):""}
            >${Ws(n.deploy.at)}${n.deploy.elapsed_ms!==null?` \xB7 ${xr(n.deploy.elapsed_ms)}`:""}</span
          >
        </span>`:""}
    <span class="worker-repo-strip__spacer"></span>
    <span
      class="worker-repo-strip__badge worker-repo-strip__badge--${n.badge.tone}"
      >${n.badge.label}</span
    >
  </button>`:""}function to(e){let t=rn(e.created_at),n=rn(e.updated_at);return!t&&!n?"":c`<div class="worker-mini__meta">
    ${t?c`<span title=${`\uC0DD\uC131 ${Gt(e.created_at)}`}
          >생성 ${t}</span
        >`:""}${t&&n?c`<span>·</span>`:""}${n?c`<span title=${`\uC218\uC815 ${Gt(e.updated_at)}`}
          >수정 ${n}</span
        >`:""}
  </div>`}function Cm(e){return!e||e==="requested"?"\uBC31\uC5C5 \uC911":e==="backup_verified"||e==="signaled"?"runner \uC885\uB8CC \uC911":e==="merged_revert"||e.startsWith("revert_")?"revert PR \uB300\uAE30":e.startsWith("rollback_")?"\uC6D0\uBCF5 \uBC30\uD3EC \uC911":e==="runner_terminated"||e.startsWith("pr_")||e.includes("ref_")||e.includes("worktree")||e.startsWith("bead_")?"PR \uC815\uB9AC \uC911":`\uD3D0\uAE30 \uCC98\uB9AC \uC911 (${e})`}function Ro(e,t){return t==="merged"?`${e}: \uC774\uBBF8 merge\uB41C \uAD6C\uD604\uC785\uB2C8\uB2E4. \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 revert PR\uC744 \uC0DD\uC131\uD558\uBA70, \uC2E4\uC81C \uC6D0\uBCF5\uC740 \uC0AC\uB78C\uC774 \uADF8 PR\uC744 merge\uD55C \uB4A4 \uC644\uB8CC\uB429\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`:`${e}: \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 runner/PR/branch/worktree\uB97C \uC815\uB9AC\uD558\uACE0 \uC774\uC288\uB97C \uD6C4\uBCF4\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`}function zs(e){let t=["\uD3D0\uAE30 \uC644\uB8CC"];return e.operation_id&&t.push(`\uC791\uC5C5 ${e.operation_id}`),e.receipt?.archive_path&&t.push(`\uBC31\uC5C5 ${e.receipt.archive_path}`),e.receipt?.original_pr?.url&&t.push(`\uC6D0\uBCF8 PR ${e.receipt.original_pr.url}`),e.receipt?.revert_pr?.url&&t.push(`revert PR ${e.receipt.revert_pr.url}`),t.join(" \xB7 ")}function Vn(e,t,n={}){let o=Object.values(e&&typeof e=="object"?e:{}).filter(f=>f&&f.bead_id===t&&f.phase!=="done").sort((f,h)=>(f.requested_at||0)-(h.requested_at||0)).at(-1),s=typeof n.attempt_id=="string"&&n.attempt_id.length>0?n.attempt_id:typeof o?.attempt_id=="string"?o.attempt_id:null,i=n.external?"\uC678\uBD80 PR\uC740 Worker\uAC00 \uC18C\uC720\uD558\uC9C0 \uC54A\uC544 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":n.done?"\uC644\uB8CC\uB41C \uC791\uC5C5\uC740 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":n.merge_active?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":n.merge_queued?"\uBA38\uC9C0 \uD050\uC5D0 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 [\uCDE8\uC18C]\uD558\uC138\uC694":n.conflict_active?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 \uC138\uC158\uC744 \uC815\uB9AC\uD558\uC138\uC694":n.cleanup_active?"\uC815\uB9AC \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":null,l=typeof o?.last_error=="string"?o.last_error:null,a=o?Cm(o.phase):null,u=o?.kind==="stale_work_backup_fresh",d=n.merged||o?.mode==="merged_revert"?"merged":"unmerged";return{action:!n.external&&!n.done,enabled:!i&&(!o||!!l),label:u?l?"\uBC31\uC5C5 \uC815\uB9AC \uC7AC\uC2DC\uB3C4":"\uBC31\uC5C5 \uD6C4 \uC0C8\uB85C \uC2DC\uC791":l?"\uC7AC\uC2DC\uB3C4":"\uD3D0\uAE30",title:i||(l?u?`\uBC31\uC5C5 \uB4A4 \uC815\uB9AC \uC2E4\uD328: ${l} \u2014 \uC6D0\uBCF8\uACFC \uAC80\uC99D \uC601\uC218\uC99D\uC744 \uBCF4\uC874\uD55C \uCC44 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:`\uD3D0\uAE30 \uC2E4\uD328: ${l} \u2014 \uAC19\uC740 \uC791\uC5C5\uC744 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:o?`${a||"\uD3D0\uAE30 \uCC98\uB9AC \uC911"} \u2014 \uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694`:d==="merged"?"\uBCD1\uD569\uB41C \uBCC0\uACBD\uC744 \uC6D0\uBCF5 PR\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4":"\uBC31\uC5C5 \uD6C4 runner\xB7PR\xB7\uC6CC\uD06C\uD2B8\uB9AC\xB7\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4"),attempt_id:s,operation:o||null,progress:a,error:l,confirmation:d}}function ku(e){if(!e||e.quickfix_lane!==!0)return!1;let t=e.quickfix_landing;return!t||typeof t!="object"?!1:["repo_operations","branch_cleanup","parent_close"].includes(t.cursor)}function Bs(e){let t=e.discard;if(!t||!t.operation)return"";let n=t.operation,r=n.kind==="stale_work_backup_fresh"&&!t.error?null:n.backup?.path,o=n.original_pr,s=n.revert_pr;return c`<div
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
  </div>`}var Rm={dirty_unique:"\uCD5C\uC2E0 base\uC5D0 \uC5C6\uB294 \uB85C\uCEEC \uBCC0\uACBD\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",untracked_present:"\uCD94\uC801\uB418\uC9C0 \uC54A\uC740 \uD30C\uC77C\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",branch_ahead:"\uB85C\uCEEC branch\uC5D0 \uACE0\uC720 commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",head_ahead:"worktree HEAD\uC5D0 \uACE0\uC720 commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",ahead_not_contained:"\uB85C\uCEEC branch\uC758 \uACE0\uC720 commit\uC774 \uCD5C\uC2E0 base\uC5D0 \uD3EC\uD568\uB410\uC74C\uC744 \uC99D\uBA85\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",ahead_merge_commit:"\uB85C\uCEEC branch\uC5D0 \uC790\uB3D9 \uC815\uB9AC\uD560 \uC218 \uC5C6\uB294 merge commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",ahead_submodule_path:"\uB85C\uCEEC branch\uC758 \uACE0\uC720 commit\uC774 submodule \uACBD\uB85C\uB97C \uBCC0\uACBD\uD569\uB2C8\uB2E4",archive_failed:"\uACE0\uC720 commit \uBC31\uC5C5\uC744 \uC548\uC804\uD558\uAC8C \uAC80\uC99D\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",ref_delete_failed:"\uD655\uC778\uB41C local branch\uB97C \uC548\uC804\uD558\uAC8C \uC0AD\uC81C\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",resume_available:"\uC774\uC5B4\uAC08 \uC218 \uC788\uB294 \uC774\uC804 Worker session\uC774 \uC788\uC2B5\uB2C8\uB2E4",observe_failed:"Git \uC0C1\uD0DC\uB97C \uC548\uC804\uD558\uAC8C \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",identity_changed:"\uD655\uC778 \uC911 worktree \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4",ownership_unknown:"Worker \uC18C\uC720 worktree\uC778\uC9C0 \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"};function $u(e,t=!1){if(!e||typeof e!="object")return null;let n=e;if(n.reason!=="worktree_stale_work"||!n.stale_work||typeof n.stale_work!="object")return null;let r=n.stale_work,o=r.residue==="branch"?"branch":"worktree",s=r.state==="unique"?"unique":"unknown",i=r.summary&&typeof r.summary=="object"?r.summary:{};function l(u){return Number.isInteger(i[u])?Number(i[u]):0}let a=typeof r.cause=="string"?r.cause:"observe_failed";return{residue:o,state:s,title:o==="branch"?"\uC774\uC804 \uBE0C\uB79C\uCE58 \uBCF4\uC874\uB428":s==="unique"?"\uC774\uC804 \uC791\uC5C5 \uBCF4\uC874\uB428":"\uC774\uC804 \uC791\uC5C5 \uC0C1\uD0DC \uD655\uC778 \uC2E4\uD328",cause:Rm[a]||"\uC548\uC804\uD558\uAC8C \uC790\uB3D9 \uC815\uB9AC\uD560 \uC218 \uC5C6\uB294 \uC774\uC804 \uC791\uC5C5\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",summary:o==="branch"?`\uACE0\uC720 commit ${l("branch_ahead")}`:[`staged ${l("staged_count")}`,`unstaged ${l("unstaged_count")}`,`untracked ${l("untracked_count")}`,`branch ahead ${l("branch_ahead")}`,`HEAD ahead ${l("head_ahead")}`].join(" \xB7 "),action_id:typeof r.action_id=="string"?r.action_id:"",can_resume:r.can_resume===!0,can_continue:r.can_continue===!0,can_backup_fresh:r.can_backup_fresh===!0,can_recheck:r.can_recheck===!0,locked:t}}function Hs(e,t={}){if(!e||!e.orchestration&&!e.worker)return"";let n=t.pin===!0?" exec-chip--pin":"",r=t.pin===!0?`
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
      </button>`:c`<span class=${n} title=${e.title||""}>${e.label}</span>`}function Om(e){return{id:e.id,label:`\u29C9 ${e.id}`,title:[`\uACB9\uCE68 \xB7 ${e.location_label}`,...e.prefixes].join(`
`),openable:!0,...e.root_dir?{root_dir:e.root_dir}:{}}}function ka(e){return Array.isArray(e)?e.slice().sort((t,n)=>t.id<n.id?-1:t.id>n.id?1:0):[]}function Lm(e,t=!1){return e?c`<button
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
        ${r.map(d=>js(d,"released"))}${s.map(d=>js(Om(d),"overlap"))}${i?c`<span
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
  >`:""}function Im(e,t=!1){let n=e?e.quick_fix_review:null;if(!n)return"";let r=n.state;if(r!=="reviewed"&&r!=="stale")return"";let o=Array.isArray(n.missing)?n.missing:[],s=[r==="reviewed"?"quick_fix self-review \uC601\uC218\uC99D\uC774 \uC9C0\uAE08 \uBCF8\uBB38\uACFC \uC77C\uCE58\uD569\uB2C8\uB2E4":"quick_fix self-review \uC601\uC218\uC99D\uC774 \uC9C0\uAE08 \uBCF8\uBB38\uACFC \uB2E4\uB985\uB2C8\uB2E4",...o].join(`
`);return c`<button
    type="button"
    class="ctl-chip judgement-chip worker-card__qfr worker-card__qfr--${r}"
    data-chip-key="qfr"
    aria-expanded=${t?"true":"false"}
    title=${s}
  >
    ${r==="reviewed"?"\uB9AC\uBDF0 \u2713":"\uB9AC\uBDF0 stale"}
  </button>`}function xu(e){return e?c`<button
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
  </button>`:""}var Mm={absent:"\uC2E4\uD589 \uC601\uC218\uC99D\uC774 \uAE30\uB85D\uB418\uC9C0 \uC54A\uC558\uB2E4 \u2014 \uACFC\uAC70 Bead\xB7\uC678\uBD80 \uACBD\uB85C PR\uC740 \uC6D0\uB798 \uC5C6\uB2E4",unparsable:"\uC601\uC218\uC99D \uAC12\uC744 \uC77D\uC744 \uC218 \uC5C6\uB2E4 \u2014 40hex SHA\uB098 `delegated:`/`main:` \uD615\uC2DD\uC774 \uC544\uB2C8\uB2E4",effort_unknown:"effort \uD1A0\uD070\uC774 harness \uC5B4\uD718 \uBC16\uC774\uB2E4 \u2014 \uBAA8\uB378\xB7SHA\xB7unit\uC740 \uC720\uD6A8\uD558\uB2E4",main_reason_retired:"`main:` \uC0AC\uC720\uAC00 \uACE0\uC815 4\uD1A0\uD070(bead\xB7quick_fix_default\xB7phase_line\xB7takeover) \uBC16\uC774\uB2E4",main_receipt_unbacked:"`main:` \uC0AC\uC720\uB97C \uB4B7\uBC1B\uCE68\uD558\uB294 \uBA54\uD0C0\uB370\uC774\uD130(impl_dispatch\xB7route\xB7planned_execution\xB7quick_fix \uAE30\uBCF8 dispatch)\uAC00 \uC5C6\uB2E4",takeover_lineage_missing:"`main:takeover`\uC778\uB370 resolved \uBAA8\uB378\uACFC \uC77C\uCE58\uD558\uB294 \uC644\uB8CC\uB41C \uC704\uC784 \uC138\uC158\uC774 \uC5C6\uB2E4",takeover_lineage_unobservable:"`main:takeover`\uC778\uB370 \uC704\uC784 \uACC4\uBCF4\uB97C \uBAA8\uB2C8\uD130\uAC00 \uBCFC \uC218 \uC5C6\uB2E4(Codex \uBC16 \uB7F0\uD0C0\uC784)"};function Pm(e,t=!1){let n=Au(e);if(n.length===0)return"";let r=n.length>1?`\uC601\uC218\uC99D \xB7 ${n[0]} +${n.length-1}`:`\uC601\uC218\uC99D \xB7 ${n[0]}`;return c`<button
    type="button"
    class="ctl-chip ctl-chip--label judgement-chip worker-card__receipt"
    data-chip-key="receipt"
    data-bead-id=${e.id}
    aria-expanded=${t?"true":"false"}
    title=${n.join(", ")}
  >
    ${r}
  </button>`}function Au(e){let t=e.receipt_badge?e.receipt_badge.codes:null;return Array.isArray(t)?t.filter(n=>typeof n=="string"&&n.length>0):[]}function Su(e,t){return!e||typeof t!="number"?"":c`<a
    class="worker-mini__pr"
    href=${e}
    target="_blank"
    rel="noreferrer noopener"
    title="PR 열기"
    >#${t} ↗</a
  >`}function Xs(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=Math.max(0,Math.min(4,Math.trunc(e)));return c`<span class="worker-pri" title=${`\uC6B0\uC120\uC21C\uC704 P${t}`}
    >P${t}</span
  >`}function Dm(e){let t=Array.isArray(e.badges)?e.badges:[],n=Jt(e.usage),r=Hn(e.usage),o=rn(e.done_at);return c`<div
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
      ${Su(e.pr_url,e.pr_number)}${o?c`<span
            class="worker-mini__done-at"
            title=${`\uC644\uB8CC ${Gt(e.done_at)}`}
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
            title=${hu(e.work_kind)}
            >작업 ${xr(e.work_ms)}</span
          >`:""}
    </div>
  </div>`}function An(e,t={}){if(e.lane==="done"&&e.done_layout==="three_line")return Dm(e);let n=e.draggable&&!e.done,r=Array.isArray(e.badges)?e.badges:[],o=Jt(e.usage),s=Hn(e.usage),i=e.merge_step||null,l=e.lane==="pr_wait"||!!e.revise_action||!!e.stale_work,a=e.lane==="done"&&!l,u=a?rn(e.done_at):"",d=n?c`<span class="worker-mini__grip" aria-hidden="true">⠿</span>`:"",f=typeof e.seq=="number"?c`<span class="worker-mini__seq" aria-hidden="true"
          >${e.seq}</span
        >`:"",h=e.workspace_name?c`<span class="worker-mini__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:"",m=c`<span class="worker-mini__id" title="클릭하면 ID 복사"
    >${e.id}</span
  >`,k=e.lane==="done"?"":Ys(e.workflow),R=e.lane==="done"?"":xu(e.from_id),j=Xs(e.priority),H=c`<span class="worker-mini__title">${e.title}</span>`,ne=Su(e.pr_url,e.pr_number),X=r.map(pe=>pe===e.live_badge?c`<span
          class="worker-mini__badge worker-mini__badge--activity"
          title="서버가 이 PR을 처리하는 중입니다"
          ><span class="act-dot" aria-hidden="true"></span>${pe}</span
        >`:c`<span
          class="worker-mini__badge${e.alert?" worker-mini__badge--alert":""}"
          title=${pe===e.completion_badge&&e.completion_title||""}
          >${pe}</span
        >`),F=e.reason?c`<span class="worker-mini__reason">${e.reason}</span>`:"",O=o.length>0?o.map(pe=>c`<span class="worker-usage" title=${pe.tooltip}
              >${pe.label}</span
            >`):s?c`<span class="worker-usage" title=${ko(e.usage)}
            >${s}</span
          >`:"",I=i?c`<span
        class="merge-step${i.failed?" merge-step--failed":""}"
        style=${`--progress: ${i.percent}%`}
        >${i.label}${i.index>0?c`<span class="merge-step__n"
              >${i.index}/${i.total}</span
            >`:""}</span
      >`:"",N=e.merge_action?c`<button
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
      </button>`:"",se=e.discard,q=se?.action||e.discard_action?c`<button
          type="button"
          class="worker-mini__discard"
          data-bead-id=${e.id}
          data-attempt-id=${se?.attempt_id||""}
          data-operation-id=${se?.operation?.operation_id||""}
          data-discard-mode=${se?.confirmation||"unmerged"}
          ?disabled=${se?!se.enabled:e.discard_enabled===!1}
          title=${se?se.title:e.discard_enabled===!1?e.discard_title||"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"PR\uC744 \uB2EB\uACE0 \uC6CC\uD06C\uD2B8\uB9AC/\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4 (\uB418\uB3CC\uB9B4 \uC218 \uC5C6\uC74C). \uB2E4\uC2DC \uC2E4\uD589\uD558\uB824\uBA74 \uD6C4\uBCF4 \uB808\uC778\uC5D0\uC11C \uB300\uAE30 \uB808\uC778\uC73C\uB85C \uC62E\uAE30\uC138\uC694"}
        >
          ${se?.label||"\uD3D0\uAE30"}
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
        </button>`:"",he=!!(e.lane!=="pr_wait"&&!e.done&&e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker)),ue=Vs(e.rec,$r(e,"rec")),D=Pm(e,$r(e,"receipt")),ke=Ks(e.cross_lane_chip),xe=eo(e.log_path),S=h||ke||k||R||he||ue||D||O||xe?c`<div class="worker-chips">
          ${h}${ke}${k}${R}${he?Hs(e.exec_chips,{pin:e.exec_chips_pinned===!0}):""}${ue}${D}${O}${xe}${$a(e)}
        </div>`:"",J=Gs(e.dependency_chips),Ee=Bs(e),_e=t.actions?t.actions:"",Ae=!!(i||e.merge_action||e.cancel_action||e.discard_action||se?.operation||e.revise_action||W);return c`<div
    class="worker-mini${l?" worker-mini--card":""}${n?"":" worker-mini--static"}${e.done?" worker-mini--done":""}${e.ghost?" worker-mini--ghost":""}${i?" worker-mini--merging":""}${i?.failed?" worker-mini--merge-failed":""}${e.external?" worker-mini--external":""}"
    style=${i?`--progress: ${i.percent}%`:""}
    draggable=${n?"true":"false"}
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    ${a?c`<div class="worker-mini__row1">
            ${h}${m}${j}${R}${ne}${H}${_e}
          </div>
          <div class="worker-mini__row2">
            ${O}${u?c`<span
                  class="worker-mini__done-at"
                  title=${`\uC644\uB8CC ${Gt(e.done_at)}`}
                  >완료 ${u}</span
                >`:""}${typeof e.work_ms=="number"?c`<span
                  class="worker-mini__work"
                  title=${hu(e.work_kind)}
                  >작업 ${xr(e.work_ms)}</span
                >`:""}${X}${I}
            <span class="worker-mini__actions"
              >${N}${B}${q}</span
            >
            ${to(e)}
          </div>`:l?c`<div class="worker-mini__head">
              ${d}${f}${m}${j}${ne}${X}${F}${_e}
            </div>
            <div class="worker-mini__body">${H}${ee}</div>
            ${J}${S}${Ae?c`<div class="worker-mini__foot">
                  ${I}
                  <span class="worker-mini__actions"
                    >${N}${B}${q}${Se}${Z}</span
                  >
                  ${Bs(e)}
                </div>`:""}
            ${to(e)}`:c`<div class="worker-mini__line">
              ${d}${f}${m}${j}${H}${ne}${X}${F}${I}${N}${B}${q}${_e}
            </div>
            ${J}${S}${Ee} ${to(e)}`}
  </div>`}function Nm(e,t){let n,r=[];for(let o of e){let s=o.group||"";s.length>0&&s!==n&&r.push(c`<div class="worker-card__place-group">${s}</div>`),n=s,r.push(c`<button
        type="button"
        class="worker-card__place-lane${s.length>0?" worker-card__place-lane--nested":""}"
        data-bead-id=${t}
        data-lane=${o.id}
        ?disabled=${o.disabled===!0}
        title=${o.title||`${o.label} \uB300\uAE30 \uB9E8 \uB4A4\uC5D0 \uCD94\uAC00`}
      >
        <span>${o.label}</span>
        ${typeof o.count=="number"?c`<span class="worker-card__place-count">${o.count}</span>`:""}
      </button>`)}return c`${r}`}var Eu={external_roundtrip:"\uD558\uB124\uC2A4 \uBC16 \uC0C1\uB300\uC640 \uC608\uCE21 \uBD88\uAC00 \uC655\uBCF5 \uBC18\uBCF5 \u2014 \uB2E4\uB978 rig \uC138\uC158\xB7\uC0AC\uB78C\xB7\uC678\uBD80 \uC2DC\uC2A4\uD15C",user_feedback_loop:"\uC9C4\uD589 \uC911 \uC0AC\uC6A9\uC790 \uD53C\uB4DC\uBC31 \uC5C6\uC774\uB294 \uD488\uC9C8\uC774 \uB0AE\uC74C \u2014 \uBB38\uC548\xB7\uC124\uACC4 \uC138\uBD80\xB7\uBC29\uD5A5 \uC120\uD0DD"};function Aa(e,t){if(t==="rec"){let n=e.rec;if(!n)return null;let r=ya[n.state]||"";return{title:"\uBCF5\uC7A1\uD55C \uC791\uC5C5\uC73C\uB85C \uD310\uC815\uB428",lines:[...ba(n),...r.length>0?[`\uC0C1\uD0DC: ${r}`]:[],"\uC801\uC6A9\uC740 \uC774\uC288 \uC0C1\uC138\uC758 \uC2E4\uD589 \uC124\uC815 \uD3B8\uC9D1\uAE30\uC5D0\uC11C"]}}if(t==="session_preferred"){if(e.session_preferred!==!0)return null;let n=Eu[e.session_preferred_reason||""]||"";return{title:"\uC6CC\uCEE4\uB85C \uB3CC\uB9B4 \uC218 \uC788\uC9C0\uB9CC \uC138\uC158\uC774 \uB0AB\uB2E4",lines:n.length>0?[n]:[]}}if(t==="ineligible")return e.worker_ineligible!==!0?null:{title:"\uC6CC\uCEE4 \uC2E4\uD589 \uB300\uC0C1\uC774 \uC544\uB2C8\uB2E4",lines:["worker-ineligible \uB77C\uBCA8\uC774 \uBD99\uC5B4 \uC788\uB2E4 \u2014 \uB77C\uBCA8\uC740 \uC774\uC288 \uC0C1\uC138\uC758 \uB77C\uBCA8 \uC808\uC5D0\uC11C \uB5C0\uB2E4"]};if(t==="spec_after_blocker")return e.spec_after_blocker!==!0?null:{title:"\uC120\uD589 \uACB0\uACFC\uAC00 \uC124\uACC4 \uC804\uC81C \u2014 \uC2A4\uD399\uB3C4 \uC120\uD589 \uB4A4\uC5D0",lines:[`\uC120\uD589: ${(Array.isArray(e.blocked_by)?e.blocked_by:[]).join(" \xB7 ")}`,"\uC120\uD589\uC774 \uB2EB\uD788\uBA74 \uC774 \uD45C\uC2DC\uB294 \uC800\uC808\uB85C \uC0AC\uB77C\uC9C4\uB2E4 \u2014 \uB77C\uBCA8\uC740 \uC774\uC288 \uC0C1\uC138\uC758 \uB77C\uBCA8 \uC808\uC5D0\uC11C \uB5C0\uB2E4"]};if(t==="receipt"){let n=Au(e);return n.length===0?null:{title:"\uC2E4\uD589 \uC601\uC218\uC99D \uD68C\uACC4 \uC794\uC5EC \u2014 \uBA38\uC9C0\uB294 \uC9C4\uD589",lines:[...n.map(r=>Mm[r]||r),"\uC790\uB3D9 \uBA38\uC9C0 \uD310\uC815\uC5D0\uB294 \uC601\uD5A5\uC774 \uC5C6\uB2E4 \u2014 \uC815\uC815\uC740 bd update --set-metadata exec_receipt=\u2026 \uB85C"]}}if(t==="qfr"){let n=e.workflow?e.workflow.quick_fix_review:null;if(!n||n.state!=="reviewed"&&n.state!=="stale")return null;let r=Array.isArray(n.missing)?n.missing:[];return{title:n.state==="reviewed"?"quick_fix self-review \uC601\uC218\uC99D\uC774 \uC9C0\uAE08 \uBCF8\uBB38\uACFC \uC77C\uCE58\uD569\uB2C8\uB2E4":"quick_fix self-review \uC601\uC218\uC99D\uC774 \uC9C0\uAE08 \uBCF8\uBB38\uACFC \uB2E4\uB985\uB2C8\uB2E4",lines:r.length>0?r:["\uBE60\uC9C4 \uD56D\uBAA9 \uC5C6\uC74C"]}}return null}var qm=["rec","receipt","session_preferred","ineligible","qfr","spec_after_blocker"];function Qs(e,t){for(let n of qm){if(!t(n))continue;let r=Aa(e,n);return r?{chip_key:n,content:r}:null}return null}function $a(e){return e.chip_popover?Vr(e.chip_popover.content):""}function $r(e,t){return!!e.chip_popover&&e.chip_popover.chip_key===t}var Zs="\uC0AC\uC6A9\uC790 \uB9AC\uBDF0 \uD544\uC694";function Sa(e,t=null,n={}){let r=e.worker_ineligible===!0,o=e.draggable&&!e.done&&!r,s=e.queue_placeable===!0&&!e.done&&!r,i=s&&t&&t.bead_id===e.id,l=e.session_preferred===!0,a=Eu[e.session_preferred_reason||""]||"",u=e.workflow,d=typeof e.reason=="string"?e.reason.split(" \xB7 "):[],f=d.includes("missing_description"),h=d.some(I=>I.startsWith(Zs)),m=typeof e.reason=="string"&&e.reason.startsWith("\u26D4"),k=$r(e,"spec_after_blocker"),R=Lm(e.spec_after_blocker===!0,k),j=Gs(e.dependency_chips,R===""?"":c`${R}${k?$a(e):""}`),H=e.workspace_name?c`<span class="worker-card__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:"",ne=Ks(e.cross_lane_chip),X=Ys(u),F=xu(e.from_id),O=!!(e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker));return c`<div
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
            aria-expanded=${$r(e,"ineligible")?"true":"false"}
            title="worker-ineligible label이 붙어 워커 실행 대상이 아닙니다"
          >
            worker-ineligible
          </button>`:l?c`<button
              type="button"
              class="ctl-chip ctl-chip--label judgement-chip worker-card__session-preferred"
              data-chip-key="session_preferred"
              aria-expanded=${$r(e,"session_preferred")?"true":"false"}
              title=${a}
            >
              세션 권장
            </button>`:""}${Vs(e.rec,$r(e,"rec"))}${Im(u,$r(e,"qfr"))}
      ${k?"":$a(e)}
    </div>
    <div class="worker-card__title">${e.title}</div>
    ${u?$s(u,e.status,{onOpenDoc:n.onOpenDoc}):""}${j}
    ${H||ne||X||F||O?c`<div class="worker-chips">
          ${H}${ne}${X}${F}${Hs(e.exec_chips,{pin:n.exec_chips_mode==="pinned_only"})}
        </div>`:""}
    <div
      class="worker-card__foot${e.reason?"":" worker-card__foot--actions-only"}"
    >
      ${i?c`<div class="worker-card__place-menu">
            ${Nm(t.lanes,e.id)}
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
              title=${s?"\uB300\uAE30 \uD050 \uB9E8 \uB4A4\uC5D0 \uCD94\uAC00":r?"worker-ineligible label\uB85C \uC6CC\uCEE4\uC5D0\uC11C \uC2E4\uD589\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":h?"\uC0AC\uC6A9\uC790 \uB9AC\uBDF0\uB97C \uAE30\uB2E4\uB9AC\uB294 \uC911\uC774\uB77C \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":f?"description\uC774 \uC5C6\uC5B4 \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"spec\uC774 \uC5C6\uC5B4 \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"}
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
  </section>`}function gu(e,t,n){return c`<button
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
        ${gu("parallel","\uBCD1\uB82C \uC601\uC5ED",t.collapsed)}
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
        ${gu("serial","\uC9C1\uB82C \uC601\uC5ED",n.collapsed)}
        ${n.header_control?n.header_control:""}
      </header>
      ${n.collapsed?"":c`<div class="worker-wait__area-body">
            ${n.notice?n.notice:""}
            ${n.extra_panes?n.extra_panes:""}
            ${n.lanes.map(o=>Fm(o))}
          </div>`}
    </section>
  </div>`}function Fm(e){let t=e.drop||{},n=e.badge?c`<span
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
  </section>`:""}var Tu=[{step:"merge",label:"\uBA38\uC9C0",index:1},{step:"base",label:"base",index:2},{step:"verify",label:"\uAC80\uC99D",index:3},{step:"deploy",label:"\uBC30\uD3EC",index:4},{step:"child",label:"\uC790\uC2DD",index:5},{step:"branch",label:"\uBE0C\uB79C\uCE58",index:6},{step:"close",label:"close",index:7}],Oo=[{step:"base_containment",label:"base \uD3EC\uD568 \uD655\uC778"},{step:"repo_operations",label:"\uC800\uC7A5\uC18C \uC791\uC5C5"},{step:"child_sweep",label:"\uC790\uC2DD \uC815\uB9AC"},{step:"branch_cleanup",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC"},{step:"parent_close",label:"\uBD80\uBAA8 close"}];function ti(e,t){let n=Tu.find(o=>o.step===e);if(!n)return null;let r=Tu.length;return{step:n.step,label:t,index:n.index,total:r,percent:Math.round(n.index/r*100)}}function Cu(e){let t=Oo.findIndex(n=>n.step===e);return Oo.map((n,r)=>({step:n.step,label:n.label,state:t<0?"todo":r<t?"done":r===t?"stall":"todo"}))}function Ar(e){let t=Oo.find(n=>n.step===e);return t?t.label:typeof e=="string"?e:""}function jm(e){let t=Oo.findIndex(n=>n.step===e);return t<0?null:{index:t+1,total:Oo.length}}function ni(e){let t=jm(e);return t?`\uBA38\uC9C0 \uC644\uB8CC \xB7 \uC815\uB9AC ${t.total}\uB2E8\uACC4 \uC911 ${t.index}\uB2E8\uACC4\uC5D0\uC11C \uBA48\uCDA4`:"\uBA38\uC9C0\uB428 \xB7 \uC815\uB9AC \uBBF8\uC644"}var Ta=new Set(["queued","running","retry_pending"]),Ru=new Set(["failed","succeeded"]),Bm={queued:"\uB300\uAE30",running:"\uC911",retry_pending:"\uC7AC\uC2DC\uB3C4 \uB300\uAE30",failed:"\uC2E4\uD328",succeeded:"\uC644\uB8CC \xB7 \uC815\uB9AC \uC7AC\uAC1C \uB300\uAE30"},Lo={base_containment:{step:"base",label:"base \uD655\uC778 \uC911"},child_sweep:{step:"child",label:"\uC790\uC2DD \uC815\uB9AC \uC911"},branch_cleanup:{step:"branch",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC \uC911"},parent_close:{step:"close",label:"\uBD80\uBAA8 close \uC911"}},Um={merging:{step:"merge",label:"\uBA38\uC9C0 \uC911"},base_containment:Lo.base_containment,child_sweep:Lo.child_sweep,branch_cleanup:Lo.branch_cleanup,parent_close:Lo.parent_close};function Wm(e){return typeof e=="string"&&/^[0-9a-f]{40}$/.test(e)}function zm(e,t,n){return!["verify","deploy"].includes(e.kind)||![...Ta,...Ru].includes(e.state)||![null,void 0,""].includes(e.superseded_by)||!Array.isArray(e.subjects)?!1:e.subjects.some(r=>r&&typeof r=="object"&&r.bead_id===t&&r.merged_sha===n)}function Hm(e,t){let n=(t.kind==="deploy"?2:1)-(e.kind==="deploy"?2:1);if(n!==0)return n;let r=u=>u.state==="succeeded"?1:2,o=r(t)-r(e);if(o!==0)return o;let s=typeof e.requested_at=="number"?e.requested_at:0,i=typeof t.requested_at=="number"?t.requested_at:0;if(s!==i)return i-s;let l=typeof e.operation_id=="string"?e.operation_id:"",a=typeof t.operation_id=="string"?t.operation_id:"";return l.localeCompare(a)}function Ea(e,t=!1){let n=e.kind,r=n==="verify"?"\uAC80\uC99D":"\uBC30\uD3EC",o=t?"failed":e.state,s=Bm[o];if(!s)return null;let i=ti(n,`${r} ${s}`);return i?{...i,active:Ta.has(o),failed:o==="failed"}:null}function Gm(e){return!e||typeof e!="object"?null:Um[e.step]||null}function Io(e){if(!e||typeof e.bead_id!="string")return null;let t=e.bead_id,n=e.merge_progress&&typeof e.merge_progress=="object"?e.merge_progress:{},r=Gm(n),o=e.cleanup_failed&&typeof e.cleanup_failed=="object"?e.cleanup_failed:null,s=["child_sweep","branch_cleanup","parent_close"].includes(typeof e.cleanup_cursor=="string"?e.cleanup_cursor:""),i=!s&&(e.cleanup_cursor==="repo_operations"||n.step==="repo_operations"),l=Wm(e.merge_sha)?e.merge_sha:null,a=!s&&l&&Array.isArray(e.repo_operations)?e.repo_operations.filter(k=>k&&typeof k=="object"&&zm(k,t,l)).sort(Hm):[],u=i?a:[],d=u.find(k=>Ta.has(k.state));if(d)return Ea(d);if(o)return o.step==="repo_operations"&&a[0]?Ea(a[0],!0):null;let f=u.find(k=>Ru.has(k.state)?k.state!=="succeeded"||e.cleanup_cursor==="repo_operations":!1);if(f)return Ea(f);if(r){let k=ti(r.step,r.label);return k?{...k,active:!0,failed:!1}:null}let h=typeof e.cleanup_cursor=="string"?Lo[e.cleanup_cursor]:null;if(!h)return null;let m=ti(h.step,h.label);return m?{...m,active:!0,failed:!1}:null}function ri(e){return!!e&&e.step!=="merge"&&e.failed!==!0}var Km="\uBBF8\uC801\uC7AC";function Ca(e,t){let n=Un(e,t.id);return{id:t.id,label:`\u26D3 ${t.id}`,title:`\uC120\uD589 \u2014 close\uB420 \uB54C\uAE4C\uC9C0 \uCD9C\uBC1C\uD558\uC9C0 \uC54A\uB294\uB2E4 (${t.location_label})`,...n?{foreign:!0}:{}}}var Ym=10080*60*1e3;function Ou(e,t,n){let r=t.closed_at;if(typeof r!="number"||!Number.isFinite(r)||r<n-Ym)return null;let o=Un(e,t.id),s=typeof t.root_dir=="string"?t.root_dir:"",i={id:t.id,label:`\u{1F513} ${t.id}`,title:`\uD574\uC81C \u2014 ${Gt(r)}\uC5D0 close\uB418\uC5B4 \uC774 \uC774\uC288\uAC00 \uD480\uB838\uB2E4`,...o?{foreign:!0}:{}};return o?s.length>0&&(i.openable=!0,i.root_dir=s):i.openable=!0,i}function Lu(e,t){let n=Array.isArray(t.ids)?t.ids.filter(s=>typeof s=="string"&&s.length>0):[],r=t.root_dirs&&typeof t.root_dirs=="object"?t.root_dirs:{},o=[];for(let s of[...new Set(n)].sort()){let i=Un(e,s),l=typeof r[s]=="string"?r[s]:"",a={id:s,label:`\u2192 ${s}`,title:"\uD6C4\uC18D \u2014 \uC774 \uC774\uC288\uAC00 close\uB418\uBA74 \uD480\uB9B0\uB2E4",...i?{foreign:!0}:{}};l.length>0?(a.openable=!0,a.root_dir=l):i||(a.openable=!0),o.push(a)}return o}function Iu(e,t,n={}){let r=new Map,o=new Map;for(let s of t)o.has(s.id)||o.set(s.id,s.location_label);for(let[s,i]of e){if(typeof s!="string"||s.length===0)continue;let l=[];for(let a of Array.isArray(i)?i:[]){if(typeof a!="string"||a.length===0)continue;let u=Ca(s,{id:a,location_label:o.get(a)||Km}),d=n[a];u.foreign!==!0?u.openable=!0:typeof d=="string"&&d.length>0&&(u.openable=!0,u.root_dir=d),l.push(u)}l.length>0&&r.set(s,l)}return r}var si=1,Mo=[{value:"repo_spec",label:"\uB808\uD3EC \xB7 spec \uC6B0\uC120"},{value:"repo_updated",label:"\uB808\uD3EC \xB7 \uCD5C\uC2E0 \uC218\uC815"},{value:"updated_flat",label:"\uCD5C\uC2E0 \uC218\uC815(\uB808\uD3EC \uBB34\uC2DC)"}],La=[{value:"all",label:"\uC804\uCCB4"},{value:"with",label:"spec \uC788\uC74C"},{value:"without",label:"spec \uC5C6\uC74C"}],no={show_blocked:!0,spec:"all"},Mu={auto_merge:"\uC790\uB3D9 \uBA38\uC9C0",merged:"\uBA38\uC9C0",merge:"\uBA38\uC9C0",pr_stop:"PR \uC911\uB2E8",stopped:"\uC911\uB2E8",failed:"\uC2E4\uD328"};function Vm(e,t){let n=null;for(let r of Object.values(e||{}))!r||r.bead_id!==t||!Kn(r)||(n=typeof r.status=="string"?r.status:null);return n}function Xm(e,t){let n=null,r=-1/0;for(let o of Object.values(e)){if(!o||o.bead_id!==t||o.status==="running"||!Kn(o))continue;let s=typeof o.finished_at=="number"?o.finished_at:typeof o.started_at=="number"?o.started_at:0;s>=r&&(r=s,n=o)}return n}function Qm(e,t,n={}){let{winners:r,resumed_from_ids:o}=Gc(e,t),s=new Map;for(let[i,l]of r){let a=l.attempt,u=l.run_state,d=l.started_at,f=typeof a.session_id=="string"&&a.session_id.length>0,m=Ds(a.quickfix_landing)==="session",k=u!=="running"&&(f||!m)&&!o.has(a.attempt_id),R=!f&&m?"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":o.has(a.attempt_id)?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":null,j=ct(n.observations?.[i]),H=ct(j.pr),ne=typeof a.merge_sha=="string"&&a.merge_sha.length>0||H.state==="MERGED",X=Vn(n.discard_operations,i,{attempt_id:a.attempt_id,merged:ne}),F=u==="failed"?Du(a,{resume_eligible:k,resume_reason:R,confirmation:X.confirmation,history:n.bead_timelines?.[i]}):null;s.set(i,{...Pu(a,e,u),started_at:d,...F?{failure:F}:{},can_pause:u==="running"&&f,can_resume:k})}for(let[i,l]of tg(e,t)){if(s.has(i))continue;let a=l.attempt,u=Vn(n.discard_operations,i,{attempt_id:a.attempt_id}),d=Bu(a);s.set(i,{...Pu(a,e,l.run_state),started_at:typeof a.started_at=="number"?a.started_at:null,...l.run_state==="parked"?{failure:Du(a,{resume_eligible:!1,resume_reason:"\uC138\uC158 \uB300\uAE30 \u2014 [\uC7AC\uC2DC\uB3C4]\uAC00 \uC0C8 attempt\uB97C \uB744\uC6C1\uB2C8\uB2E4",confirmation:u.confirmation,history:n.bead_timelines?.[i]})}:{},...l.run_state==="waiting"?{wait:Jm(a)}:{},...d?{retry:d}:{},can_pause:!1,can_resume:!1})}return s}function Pu(e,t,n){return{attempt_id:typeof e.attempt_id=="string"?e.attempt_id:"",run_state:n,last_event_at:typeof e.last_event_at=="number"?e.last_event_at:null,last_activity:e.last_activity&&typeof e.last_activity=="object"?e.last_activity:null,legs:Array.isArray(e.legs)?e.legs:[],runner:typeof e.runner=="string"?e.runner:null,model:typeof e.model=="string"?e.model:null,effort:typeof e.effort=="string"?e.effort:null,speed:typeof e.speed=="string"?e.speed:null,resumed_from:typeof e.resumed_from=="string"?e.resumed_from:null,continuation_mode:e.continuation_mode==="session"||e.continuation_mode==="fresh"?e.continuation_mode:null,status:typeof e.status=="string"?e.status:null,usage:Gn(t,e.bead_id)}}function Du(e,t){let n=e.cause_detail&&typeof e.cause_detail=="object"?e.cause_detail:null;return{cause:typeof e.cause=="string"?e.cause:null,cause_detail:n,summary:n&&typeof n.summary=="string"?n.summary:null,bead_id:typeof e.bead_id=="string"?e.bead_id:"",finished_at:typeof e.finished_at=="number"?e.finished_at:null,runner:typeof e.runner=="string"?e.runner:null,model:typeof e.model=="string"?e.model:null,effort:typeof e.effort=="string"?e.effort:null,observed_effort:typeof e.observed_effort=="string"?e.observed_effort:null,speed:typeof e.speed=="string"?e.speed:null,attempt_id:typeof e.attempt_id=="string"?e.attempt_id:"",usage:e.usage&&typeof e.usage=="object"?e.usage:null,halted_auto_advance:e.halted_auto_advance===!0,quickfix_lane:e.quickfix_lane===!0,quickfix_landing:e.quickfix_landing&&typeof e.quickfix_landing=="object"?e.quickfix_landing:null,retry:Bu(e),resume_eligible:t.resume_eligible,resume_reason:t.resume_reason,landed:ku(e),confirmation:t.confirmation,...Zm(t.history)}}function Zm(e){if(!e||typeof e!="object")return{};let t=Array.isArray(e.events)?e.events:[],n=[];for(let o of t)!o||typeof o!="object"||typeof o.summary!="string"||o.summary.length===0||n.push({event_id:typeof o.event_id=="string"?o.event_id:"",kind:typeof o.kind=="string"?o.kind:"",summary:o.summary,at:typeof o.at=="number"?o.at:null});n.reverse();let r=typeof e.log_path=="string"&&e.log_path.length>0?e.log_path:null;return{...n.length>0?{timeline:n}:{},...r===null?{}:{log_path:r},...e.log_expired===!0?{log_expired:!0}:{},...e.log_unreadable===!0?{log_unreadable:!0}:{}}}function Jm(e){let t=e.cause_detail&&typeof e.cause_detail=="object"?e.cause_detail:null,n=Array.isArray(t?.blockers)?t.blockers:[],r=[];for(let o of n)!o||typeof o!="object"||typeof o.id!="string"||o.id.length===0||r.push({id:o.id,rig:typeof o.rig=="string"?o.rig:null,status:typeof o.status=="string"?o.status:""});return{summary:t&&typeof t.summary=="string"?t.summary:null,blockers:r,since:typeof e.finished_at=="number"?e.finished_at:null}}function Bu(e){let t=e&&e.retry&&typeof e.retry=="object"?e.retry:null;return t?{cause:typeof t.cause=="string"?t.cause:null,attempts:typeof t.attempts=="number"?t.attempts:0,max:typeof t.max=="number"?t.max:0,next_at:typeof t.next_at=="number"?t.next_at:null}:null}var eg=new Set(["parked","retry_wait","waiting"]);function tg(e,t){let n=Object.values(e||{}),r=new Map;for(let s of n)s&&typeof s.bead_id=="string"&&Kn(s)&&r.set(s.bead_id,s.attempt_id);let o=new Map;for(let s of n){if(!s||typeof s.bead_id!="string"||s.bead_id.length===0||!Kn(s)||!eg.has(s.status)||r.get(s.bead_id)!==s.attempt_id||typeof s.dismissed_at=="number")continue;let i=t.get(s.bead_id);typeof i=="number"&&i>0&&typeof s.finished_at=="number"&&i>=s.finished_at||o.set(s.bead_id,{attempt:s,run_state:s.status})}return o}function Nu(e,t){let n=e[t];if(!n)return"";if(n.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let r=typeof n.reason=="string"?n.reason:"",o=r.indexOf(":");return o>0&&o<r.length-1?`\u26D4 ${r.slice(0,o)} (${r.slice(o+1)})`:`\u26D4 ${r}`}function ct(e){return e&&typeof e=="object"?e:{}}function ng(e){let t=ct(e).badge_codes;return Array.isArray(t)?t.filter(n=>typeof n=="string"&&n.length>0):[]}function rg(e,t,n){let r=ct(t);if(Object.keys(r).length===0)return null;let o=e.execution_defaults,s=e.runner_catalog,i=e.session_defaults;if(!o||!s||!i)return null;let l=h=>mn({pin:h,global:i,execution_defaults:o,runner_catalog:s,route:n}),a,u;try{a=l(r),u=l(null)}catch{return null}let d=qu(Jr(a,s),Jr(u,s)),f=qu(kr(a,null),kr(u,null));return d||f?{orchestration:d,worker:f}:null}function qu(e,t){return!e||t&&t.text===e.text?null:e}function og(e,t,n){let o=(t&&typeof t=="object"&&Array.isArray(t.released_by)?t.released_by:[]).filter(i=>i&&typeof i=="object"&&typeof i.id=="string").slice().sort((i,l)=>(typeof l.closed_at=="number"?l.closed_at:0)-(typeof i.closed_at=="number"?i.closed_at:0)),s=[];for(let i of o){let l=Ou(e,i,n);l&&s.push(l)}return s.length===0?null:s}function Ia(e,t){return typeof e!="string"||e.length===0||typeof t!="string"||t.length===0||t===e?null:`\u2192 ${t}`}var sg=new Set(["quick_fix","spec_backed","full_plan"]);function Fu(e){return typeof e=="string"&&sg.has(e)}function ig(e){let t={...ct(e.session_defaults)};for(let n of["orchestration_model","orchestration_effort","orchestration_speed"]){let r=e[n];typeof r=="string"&&(t[n]=r)}return t}function ag(e,t,n){let r=e.runner_catalog??null,o=Oa(e,t,n,null);if(!o)return null;let s=xn(r,o.orchestration_model.value??""),i=s===null?o:Oa(e,t,n,s)||o,l=Jr(i,r),a=kr(i,s);return l||a?{orchestration:l,worker:a}:null}function Oa(e,t,n,r){let o=Fu(n)?n:Fu(t.route)?t.route:null;try{return mn({pin:t,global:ig(e),execution_defaults:e.execution_defaults??null,runner_catalog:e.runner_catalog??null,route:o,controller_runtime:r})}catch{return null}}function lg(e,t,n){return!t||!Object.hasOwn(t,"metadata")?null:kr(Oa(e,ct(t.metadata),t.route,n),n)}function Ma(e,t){let n=new Set,r=e;for(;r&&!n.has(r.attempt_id);){if(r.conflict_resolution===!0)return!0;n.add(r.attempt_id),r=typeof r.resumed_from=="string"&&r.resumed_from.length>0&&t.get(r.resumed_from)||null}return!1}function cg(e){let t={};for(let l of Dn)t[l]=0;let n=!1,r=0,o=0,s=0;for(let l of e){let a=l.usage;if(!a||typeof a!="object")continue;let u=!1;for(let d of Dn)Number.isFinite(a[d])&&(t[d]+=a[d],n=!0,u=!0);u&&(o+=1,Number.isFinite(a.total_cost_usd)&&(r+=a.total_cost_usd,s+=1))}o>0&&s===o&&(t.total_cost_usd=r);let i=e.map(l=>l.usage).filter(l=>l&&typeof l=="object"&&l.providers);return i.length>0?Jt(Cs(i)):n?Hn(t):null}function Uu(e,t){let n=wa(e,t);return n==="internal"?"\uBBF8\uC801\uC7AC":n==="external"?"\uC678\uBD80":"\uC704\uCE58 \uBBF8\uD655\uC778"}function ug(e,t,n){let r=t.get(e);if(!r)return Uu(e,n);if(typeof r.position=="number"){if(r.lane==="parallel")return`#${r.position}`;if(/^s[1-5]$/.test(r.lane))return`${r.lane} #${r.position}`}return Co(r)}function dg(e,t,n,r){let o=t.get(e);if(!o)return{label:Uu(e,n),title:""};if(typeof o.position=="number"&&(o.lane==="parallel"||/^s[1-5]$/.test(o.lane))){let i=r.get(e),l=o.lane==="parallel"?"\uBCD1\uB82C":o.lane;return{label:i&&i.length>0?"\u{1F512} \uB300\uAE30":"\uB300\uAE30",title:`${o.workspace_name||o.root_dir} ${l} #${o.position}`}}return{label:o.state==="running"?"\u25B6 \uC2E4\uD589\uC911":Co(o),title:""}}function pg(e,t){for(let n of Object.values(e||{}))if(n&&n.attempt_id===t&&typeof n.armed_by_lane=="string"&&n.armed_by_lane.length>0)return n.armed_by_lane;return null}function fg(e,t,n,r,o,s){return t==="draft"?{state:"draft",badge:"draft",run_label:null,can_stop:!1}:n.some(i=>s.failed_by_bead.get(i.id)===e)?{state:"failed",badge:"\u26D4 \uC2E4\uD328",run_label:"\u25B6 \uB2E4\uC2DC \uC9C4\uD589",can_stop:!1}:s.disarmed_lanes.has(e)?{state:"restart",badge:"\u23F8 \uC7AC\uC2DC\uC791",run_label:"\u25B6 \uC9C4\uD589",can_stop:!1}:n.some(i=>s.armed_by_bead.get(i.id)===e)?{state:"running",badge:"\u25B6 \uC9C4\uD589 \uC911",run_label:o.length>0?"\u25B6 \uC774\uC5B4\uC11C \uC9C4\uD589":null,can_stop:!0}:r?{state:"all_done",badge:"\uBAA8\uB450 \uC644\uB8CC",run_label:null,can_stop:!1}:{state:"confirmed",badge:"\uD655\uC815",run_label:"\u25B6 \uC9C4\uD589",can_stop:!1}}function _g(e,t,n,r,o,s,i){let l=[];return e.forEach((a,u)=>{let d=typeof a.id=="string"?a.id:"";if(d.length===0)return;let f=a.status==="confirmed"?"confirmed":"draft",h=Array.isArray(a.entries)?a.entries:[],m=[];h.forEach((H,ne)=>{let X=H&&typeof H.bead_id=="string"?H.bead_id:"";if(X.length===0)return;let F=H&&typeof H.root_dir=="string"?H.root_dir:"",O=n.get(X),I=O?O.state:void 0,N=I==="running"||I==="pr_wait"||I==="done",B=!O||I==="runnable",se=O&&O.lane==="parallel"&&typeof O.position=="number"?O.position-1:null,q=dg(X,n,r,t),W=m.length>0?m[m.length-1].id:null,Z=f==="confirmed"&&W!==null&&!(t.get(X)||[]).includes(W);m.push({id:X,title:o.get(X)||X,root_dir:O?O.root_dir:F,workspace_name:O?O.workspace_name:s.get(F)||"",seq:ne+1,location_label:q.label,location_title:q.title,draggable:!N,fixed:N,done:I==="done",unplaced:B,mismatch:Z,...se!==null?{queue_index:se}:{}})}),m.forEach((H,ne)=>{H.seq=ne+1});let k=m.length>0&&m.every(H=>H.done),R=m.filter(H=>!H.fixed&&i.armed_by_bead.get(H.id)!==d).map(H=>H.id),j=fg(d,f,m,k,R,i);l.push({lane_id:d,status:f,draft:f==="draft",number:u+1,label:`\uC5F0\uACB0 ${u+1} \xB7 \uB808\uD3EC \uAC04`,rows:m,all_done:k,can_confirm:f==="draft"&&m.length>=2,has_mismatch:f==="confirmed"&&m.some(H=>H.mismatch||H.unplaced),unlaunched:R,...j})}),l}function mg(e,t,n){if(e.lane==="runnable"){let i=n.get(e.id);return i?i.length===0?{scope:[],state:"missing"}:{scope:i,state:"declared"}:{scope:[],state:void 0}}let r=t.get(e.root_dir),o=r?r[e.id]:void 0;if(!o||!Array.isArray(o.scope))return{scope:[],state:void 0};let s=o.scope.filter(i=>typeof i=="string"&&i.length>0);return{scope:s,state:s.length===0?"missing":"declared"}}function gg(e,t,n,r,o){let s=new Map;for(let a of[...e.running,...e.queue,...e.runnable,...e.pr_wait]){if(!t.has(a.root_dir))continue;let u=`${a.root_dir}\0${a.id}`,d=s.get(u);if(d){d.cards.push(a);continue}let{scope:f,state:h}=mg(a,t,n);h!==void 0&&(a.scope_state=h),s.set(u,{cards:[a],scope:f})}let i=new Map;for(let a of s.values()){let u=a.cards[0].scope_state;if(u!==void 0)for(let h of a.cards)h.scope_state=u;if(a.scope.length===0)continue;let d=a.cards[0].root_dir,f=i.get(d);f?f.push(a):i.set(d,[a])}let l=(a,u,d)=>{let f=u.cards[0],h={id:f.id,title:f.title,location_label:ug(f.id,r,o),prefixes:d,...typeof f.root_dir=="string"&&f.root_dir.length>0?{root_dir:f.root_dir}:{}};for(let m of a.cards)m.overlap_chips?m.overlap_chips.push(h):m.overlap_chips=[h]};for(let a of i.values())for(let u=0;u<a.length;u+=1)for(let d=u+1;d<a.length;d+=1){let f=Fs(a[u].scope,a[d].scope);f.length!==0&&(l(a[u],a[d],f),l(a[d],a[u],f))}}function ju(e,t,n){let r=n?n.get(t)?.root_dir:void 0,o=!Un(e.id,t),s=typeof e.root_dir=="string"?e.root_dir:"",i=typeof r=="string"&&r.length>0?r:o&&s.length>0?s:"";return i.length>0?{openable:!0,root_dir:i}:o?{openable:!0}:{}}function hg(e,t,n,r){let o=new Set(e?e.ids:[]);for(let l of t&&Array.isArray(t.ids)?t.ids:[])typeof l=="string"&&l.length>0&&o.add(l);if(o.size===0)return{ids:[]};let s={},i={...e?e.root_dirs:{},...t&&t.root_dirs&&typeof t.root_dirs=="object"?t.root_dirs:{}};for(let l of o){let a=i[l];if(typeof a=="string"&&a.length>0){s[l]=a;continue}if(!Un(n.id,l)){n.root_dir.length>0&&(s[l]=n.root_dir);continue}let u=r.get(l)?.root_dir;typeof u=="string"&&u.length>0&&(s[l]=u)}return{ids:[...o],root_dirs:s}}function Ra(e){if(typeof e=="number")return Number.isFinite(e)?e:null;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:null}return null}function oi(e){if(typeof e=="number"&&Number.isFinite(e))return e;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:0}return 0}function lr(e,t,n){let r=Array.isArray(e)?e:[],o=Array.isArray(t)?t:[],s=n&&typeof n.done_since=="number"?n.done_since:void 0,i={...no,...n&&n.candidate_filter?n.candidate_filter:{}},l=n&&Object.hasOwn(n,"cross_lanes")?n.cross_lanes??null:void 0,a=n&&n.candidate_sort==="as_given"?"as_given":n&&Mo.some(v=>v.value===n.candidate_sort)?n.candidate_sort:"repo_spec",u=n&&n.groups==="all"?"all":"nonempty",d=n&&n.candidate_hidden_counts==="per_control"?"per_control":"sequential",f=Date.now(),h=new Map;for(let v of o)v&&typeof v.root_dir=="string"&&h.set(v.root_dir,v);let m=new Map;for(let v of o)v&&typeof v.root_dir=="string"&&m.set(v.root_dir,v.name||v.root_dir);for(let v of r)v&&typeof v.root_dir=="string"&&m.set(v.root_dir,v.name||v.root_dir);let k=[],R=[],j=[],H=[],ne=[],X=[],F=new Map,O=new Map,I=new Map,N=new Map,B=new Map,se=new Map,q=new Map,W=new Map,Z=new Map,ee=new Map,Se=new Map,he=new Map,ue=new Map,D=new Set,ke=new Map,xe=new Map,S=new Map;for(let v of r){if(!v||typeof v.root_dir!="string")continue;let z=v.root_dir,Te=v.name||z,Re=h.get(z),Be=Re&&typeof Re.revision=="number"?Re.revision:typeof v.revision=="number"?v.revision:0,Xe=ct(v.attempts),ft=ct(v.bead_titles);for(let[p,_]of Object.entries(ft))typeof _=="string"&&_.length>0&&S.set(p,_);let kt=ct(v.bead_times),It=ct(v.pr_observations),$t=ct(v.admission),mt=ct(v.revise_parked),Ue=ct(v.merge_queue_state),L=ct(v.cleanup_failed),te=ct(v.discard_operations),ve=ct(v.bead_timelines),E=ct(v.bead_blocked_by);Object.hasOwn(v,"bead_scope")&&ke.set(z,ct(v.bead_scope));let K=ct(v.bead_workflow),Ie=ct(v.pr_activity),We=Array.isArray(v.repo_operations)?v.repo_operations:[];W.set(z,We);let Ne=typeof v.declared_base=="string"?v.declared_base:null;q.set(z,Ne),se.set(z,Object.entries(L).map(([p,_])=>({bead_id:p,step:_&&_.step?_.step:"",reason:_&&_.reason?_.reason:"",at:_&&typeof _.at=="number"?_.at:null,detail:_&&typeof _.detail=="string"?_.detail:null,output_tail:_&&typeof _.output_tail=="string"&&_.output_tail?_.output_tail:void 0,log_path:_&&typeof _.log_path=="string"&&_.log_path?_.log_path:void 0,retry_count:_&&typeof _.retry_count=="number"&&Number.isInteger(_.retry_count)&&_.retry_count>0?_.retry_count:0,failure_code:_&&typeof _.failure_code=="string"?_.failure_code:void 0})));for(let[p,_]of Object.entries(ct(v.bead_overlay)))_&&typeof _=="object"&&Z.set(`${z}\0${p}`,_);let nt=new Map;for(let p of Object.values(Xe))p&&typeof p.attempt_id=="string"&&nt.set(p.attempt_id,p);let Le=Array.isArray(v.merge_queue)?v.merge_queue:[],Ge=new Set(Le.filter(p=>p&&typeof p.bead_id=="string").map(p=>p.bead_id)),et=new Map(Le.filter(p=>p&&typeof p.bead_id=="string").map(p=>[p.bead_id,p])),yt=new Map,He=new Map,At=new Map,qt=new Map;Le.forEach((p,_)=>{p&&typeof p.bead_id=="string"&&(yt.set(p.bead_id,_+1),He.set(p.bead_id,p.resolution),At.set(p.bead_id,p.continuation_action||null),qt.set(p.bead_id,p.authority||null))});let ut=ct(v.auto_merge_skips),Vt=p=>{let _=ut[p];if(!_)return null;let A=ct(ct(It[p]).pr).head_sha;return A&&A===_.head_sha?_.reason||"":null};B.set(z,{positions:yt,resolutions:He,continuations:At,authorities:qt,state:{active:typeof Ue.active=="string"?Ue.active:null,failures:ct(Ue.failures),waiting:Ue.waiting&&typeof Ue.waiting.bead_id=="string"&&typeof Ue.waiting.reason=="string"?Ue.waiting:null},auto_excluded:(Array.isArray(v.pr_wait)?v.pr_wait:[]).map(p=>p&&p.bead_id).filter(p=>typeof p=="string"&&Vt(p)!==null),running:Le.length>0});let Et=Array.isArray(v.queue)?v.queue:[];for(let p of[...Et,...Array.isArray(v.pr_wait)?v.pr_wait:[]])p&&typeof p.bead_id=="string"&&typeof p.armed_by_lane=="string"&&p.armed_by_lane.length>0&&he.set(p.bead_id,p.armed_by_lane);for(let p of Array.isArray(v.disarmed_on_load)?v.disarmed_on_load:[])typeof p=="string"&&p.length>0&&D.add(p);let Mt=(Array.isArray(v.serial_lanes)?v.serial_lanes:[]).filter(p=>p&&/^s[1-5]$/.test(p.id)&&Array.isArray(p.entries)),Wt=ct(v.lane_states),Xt=typeof v.serial_lane_count=="number"?Math.max(0,Math.min(5,Math.floor(v.serial_lane_count))):Math.min(5,Mt.length);I.set(z,Xt),N.set(z,Et.length);let tn=new Map(Mt.map(p=>[p.id,p])),zt=new Map;for(let p of Mt)for(let _ of p.entries)_&&typeof _.bead_id=="string"&&zt.set(_.bead_id,p.id);for(let[p,_]of Object.entries(ct(v.bead_dependents))){let A=Array.isArray(_?.ids)?_.ids:[],Y=ct(_?.root_dirs),V=Se.get(p)||{ids:new Set,root_dirs:{}};for(let oe of A)typeof oe=="string"&&oe.length>0&&V.ids.add(oe);for(let[oe,$e]of Object.entries(Y))typeof $e=="string"&&$e.length>0&&(V.root_dirs[oe]=$e);Se.set(p,V)}for(let[p,_]of Object.entries(E))Array.isArray(_)&&ee.set(p,_.filter(A=>typeof A=="string"&&A.length>0));let Ft=Array.isArray(v.done)?v.done:[];for(let p of Ft)p&&typeof p.bead_id=="string"&&X.push({id:p.bead_id,root_dir:z,workspace_name:Te});let un=new Map;for(let p of Ft)p&&typeof p.bead_id=="string"&&typeof p.added_at=="number"&&un.set(p.bead_id,p.added_at);let Pt=p=>({id:p,title:ft[p]||p,root_dir:z,workspace_name:Te,expected_revision:Be,draggable:!1,...ct(kt[p]).created_at?{created_at:ct(kt[p]).created_at}:{},...ct(kt[p]).updated_at?{updated_at:ct(kt[p]).updated_at}:{}}),Kt=p=>{let _=K[p]?.chips?.pr;return _&&typeof _.number=="number"&&typeof _.url=="string"?{pr_number:_.number,pr_url:_.url}:{}},jt=p=>Object.hasOwn(E,p)?{blocked_by:Array.isArray(E[p])?E[p].filter(_=>typeof _=="string"&&_.length>0):[]}:{},Qt=(p,_)=>{let A=jt(p),Y=(_?.blockers||[]).map(oe=>oe.id);if(Y.length===0)return A;let V=[...A.blocked_by||[]];for(let oe of Y)V.includes(oe)||V.push(oe);return{blocked_by:V}},de=new Set;for(let[p,_]of Qm(Xe,un,{discard_operations:te,observations:It,bead_timelines:ve})){de.add(p);let A=_.run_state==="failed"?pg(Xe,_.attempt_id):null;A!==null&&ue.set(p,A);let Y=nt.get(_.attempt_id)||null,V=Z.get(`${z}\0${p}`),oe=V&&V.rollup?V.rollup:null,$e=Ia(Ne,Y?Y.target_base:null),Qe=Y?Ma(Y,nt):!1,at=Y&&Y.quickfix_lane===!0&&Y.quickfix_landing&&typeof Y.quickfix_landing=="object"?Y.quickfix_landing:null,vt=at&&typeof at.reason=="string"&&at.reason.length>0?at.reason:null,gt=at?Io({bead_id:p,merge_sha:at.head_sha,cleanup_cursor:at.cursor,cleanup_failed:vt?{step:at.cursor,reason:vt}:null,repo_operations:We}):null;R.push({...Pt(p),lane:"running",...Qt(p,_.wait),...zt.has(p)?{serial_lane_id:zt.get(p)}:{},attempt_id:_.attempt_id,run_state:_.run_state,status:_.status||void 0,workflow:K[p]||null,can_pause:_.can_pause,can_resume:_.can_resume,started_at:_.started_at,last_event_at:_.last_event_at,last_activity:_.last_activity,legs:_.legs,runner:_.runner,model:_.model,effort:_.effort,speed:_.speed,resumed_from:_.resumed_from,continuation_mode:_.continuation_mode,usage:_.usage,failure:_.failure||null,wait:_.wait||null,retry:_.retry||null,exec_chips:{orchestration:ha(_),worker:lg(ct(Re),V,_.runner||null)},discard:Vn(te,p,{attempt_id:_.attempt_id,merged:_.failure?.confirmation==="merged"||ct(It[p]).pr?.state==="MERGED"}),...oe?{rollup:oe}:{},...Qe?{conflict_resolution:!0}:{},...$e?{base_exception:$e}:{},...gt?{landing:gt}:{},badges:_.run_state==="paused"?["\u23F8 \uC77C\uC2DC\uC815\uC9C0"]:_.run_state==="failed"?["\u26A0 \uC2E4\uD328"]:_.run_state==="parked"?["\u23F8 \uC138\uC158 \uB300\uAE30"]:_.run_state==="retry_wait"?["\u21BB \uC7AC\uC2DC\uB3C4 \uB300\uAE30"]:_.run_state==="waiting"?["\u26D3 \uC120\uD589 \uB300\uAE30"]:[],alert:_.run_state==="failed"})}for(let[p,_]of Hc(Xe)){if(R.some(Y=>Y.id===p))continue;let A=_.attempt;R.push({...Pt(p),lane:"running",kind:"session",...jt(p),attempt_id:typeof A.attempt_id=="string"?A.attempt_id:"",run_state:"running",status:"running",non_occupying:!0,workflow:K[p]||null,can_pause:!1,can_resume:!1,started_at:_.started_at,last_event_at:typeof A.last_event_at=="number"?A.last_event_at:null,last_activity:A.last_activity&&typeof A.last_activity=="object"?A.last_activity:null,legs:Array.isArray(A.legs)?A.legs:[],runner:typeof A.runner=="string"?A.runner:null,model:typeof A.model=="string"?A.model:null,effort:typeof A.effort=="string"?A.effort:null,speed:typeof A.speed=="string"?A.speed:null,resumed_from:null,continuation_mode:null,usage:A.usage&&typeof A.usage=="object"?A.usage:null,exec_chips:{orchestration:ha(A),worker:null},discard:Vn(te,p,{merge_queued:!0}),badges:[_.origin==="auto"?"\uB9AC\uBDF0 \xB7 \uC790\uB3D9":"\uB9AC\uBDF0"],alert:!1})}for(let p of Array.isArray(v.session_active)?v.session_active:[]){let _=p&&p.bead_id;typeof _!="string"||de.has(_)||(de.add(_),Array.isArray(p.blocked_by)&&p.blocked_by.length>0&&ee.set(_,p.blocked_by.filter(A=>typeof A=="string"&&A.length>0)),typeof p.title=="string"&&p.title.length>0&&S.set(_,p.title),R.push({...Pt(_),title:p.title||ft[_]||_,lane:"running",kind:"session",status:"in_progress",started_at:Ra(p.started_at)??Ra(p.updated_at)??void 0,updated_at:Ra(p.updated_at)??void 0,workflow:p.workflow||null,labels:Array.isArray(p.labels)?p.labels:[],spec_id:typeof p.spec_id=="string"?p.spec_id:"",blocked:p.blocked===!0,...Array.isArray(p.blocked_by)?{blocked_by:p.blocked_by.filter(A=>typeof A=="string"&&A.length>0)}:{},draggable:!1,can_pause:!1,can_resume:!1,exec_chips:null,usage:null,legs:[],last_activity:null,session_refs:Array.isArray(p.session_refs)?p.session_refs:[],badges:[],alert:!1}))}for(let p of Array.isArray(v.pr_wait)?v.pr_wait:[]){let _=p&&p.bead_id;if(typeof _!="string"||de.has(_))continue;de.add(_);let A=ct(It[_]),Y=ct(A.pr),V=A.gate?ct(A.gate):null,oe=Ge.has(_),$e=et.get(_)?.continuation_action||null,Qe=!!$e&&$e.continuation===null,at=Ue.active===_,vt=p.external===!0,gt=L[_]||null,$=ct(Ie[_]),x=Io({bead_id:_,merge_sha:p.merge_sha,cleanup_cursor:p.cleanup_cursor,merge_progress:$.merge_progress||null,cleanup_failed:gt,repo_operations:We}),Oe=ri(x),Fe=!!V&&V.base_badge==="\uCDA9\uB3CC",g=!!gt&&["child_sweep","branch_cleanup","parent_close"].includes(gt.step)&&!!V&&V.tier==="merged",y=vt&&!!gt&&!!V&&V.tier==="merged",C=!!V&&["closed_unmerged","review","undecidable"].includes(V.tier),ie=Vn(te,_,{external:vt,merge_active:at||x?.step==="merge",merge_queued:oe,cleanup_active:Oe,merged:!!gt||V?.tier==="merged"}),ge=!!ie.operation,Ce=ng(A.receipt_check);j.push({...Pt(_),lane:"pr_wait",...jt(_),...Ce.length>0?{receipt_badge:{codes:Ce}}:{},workflow:K[_]||null,pr_number:typeof Y.number=="number"?Y.number:null,pr_url:typeof Y.url=="string"?Y.url:void 0,external:vt,usage:Gn(Xe,_),merge_step:x,badges:Qe?["\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694"]:x?[V?.tier==="merged"?"\uBA38\uC9C0\uB428":"\uBA38\uC9C0 \uC911"]:gt?[Ar(gt.step)?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${Ar(gt.step)}`:"\uC815\uB9AC \uBA48\uCDA4"]:typeof V?.gate_badge=="string"&&V.gate_badge.length>0?[V.gate_badge]:[],alert:x?x.failed===!0:!!gt||C,reason:gt&&x?.active!==!0?ni(gt.step):"PR \uB300\uAE30",merge_action:V?.tier==="merged"&&!g&&!y?!1:!oe||Qe,merge_enabled:!ge&&(Qe||V?.enabled===!0||Fe||g||y),merge_label:Qe?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":y||g?"\uC815\uB9AC \uC7AC\uAC1C":Fe&&!g?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":void 0,merge_title:Qe?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":ge?ie.error?`\uD3D0\uAE30 \uC2E4\uD328: ${ie.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${ie.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:y?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD569\uB2C8\uB2E4":g?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uC7AC\uAC1C\uD569\uB2C8\uB2E4":Fe?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":V?.enabled===!0?`\uBA38\uC9C0 (${V.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4`:`\uBA38\uC9C0 \uBD88\uAC00: ${V?.reason||"\uAD00\uCE21 \uB300\uAE30"}`,cancel_action:oe&&!Qe,cancel_enabled:!at,continuation_mismatch:$e?.mismatch||null,discard:ie,discard_action:ie.action,discard_enabled:ie.enabled,discard_title:ie.title})}let T=(p,_,A,Y)=>{let V=p&&p.bead_id;if(typeof V!="string"||de.has(V))return null;de.add(V);let oe=mt[V],$e=Vn(te,V),Qe=$e.operation?$e:null,at={...Pt(V),lane:_,workflow:K[V]||null,draggable:!Qe,discard:Qe||void 0,reason:Nu($t,V),seq:A+1,queue_position:A+1,queue_index:A,queue_length:Y,badges:oe?["\u23F8 REVISE \uD30C\uD0B9"]:[],alert:!!oe,revise_action:!!oe,revise_enabled:!!oe&&!Qe,revise_title:oe?oe.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${oe.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":""},vt=jt(V);return Object.hasOwn(vt,"blocked_by")&&(at.blocked_by=vt.blocked_by),at};for(let p=0;p<Et.length;p++){let _=T(Et[p],"queue",p,Et.length);if(!_)continue;H.push(_);let A=F.get(z);A?A.push(_):F.set(z,[_])}let me=p=>{let _=j.find(oe=>oe.id===p&&oe.root_dir===z);if(_)return{id:p,title:_.title,badge:"PR \uB300\uAE30 \xB7 \uC810\uC720"};let A=R.find(oe=>oe.id===p&&oe.root_dir===z),Y=A?A.run_state:Vm(Xe,p),V=Y==="failed"||Y==="orphaned"?"\uC2E4\uD328 \xB7 \uC810\uC720 \uC720\uC9C0":Y==="paused"?"\uC77C\uC2DC\uC815\uC9C0 \xB7 \uC810\uC720":"\uC2E4\uD589 \uC911 \xB7 \uC810\uC720";return{id:p,title:A?A.title:Pt(p).title,badge:V}},ce=[];for(let p=0;p<Math.max(Xt,Mt.length);p++){let _=`s${p+1}`,A=tn.get(_),Y=A&&Array.isArray(A.entries)?A.entries:[],V=ct(Wt[_]),oe=Array.isArray(V.occupied_by)?V.occupied_by.filter(at=>typeof at=="string"):[],$e=new Set(oe),Qe=[];for(let at=0;at<Y.length;at++){let vt=Y[at]&&Y[at].bead_id;if(typeof vt=="string"&&$e.has(vt)){de.add(vt);continue}let gt=T(Y[at],_,at,Y.length);gt&&(Qe.push(gt),H.push(gt))}Qe.length===0&&oe.length===0&&(Xt<=1||p>=Xt)||ce.push({id:_,index:p,items:Qe,raw_length:Y.length,occupied_by:oe,occupants:oe.map(at=>me(at)),corrections:Array.isArray(V.corrections)?V.corrections.length:0,cycle:V.cycle===!0,...Qe.length===0&&oe.length===0?{empty:!0}:{}})}O.set(z,ce);let b=Array.from({length:Xt},(p,_)=>{let A=`s${_+1}`,Y=tn.get(A),V=Y&&Array.isArray(Y.entries)?Y.entries:[],oe=ct(Wt[A]);return{id:A,index:V.length,length:V.length,occupied_by:Array.isArray(oe.occupied_by)?oe.occupied_by.filter($e=>typeof $e=="string"):[]}});for(let p of Array.isArray(v.runnable)?v.runnable:[]){let _=p&&p.bead_id;if(typeof _!="string"||de.has(_))continue;de.add(_);let A=p.workflow&&typeof p.workflow=="object"?p.workflow:null,Y=A&&typeof A.route=="string"&&A.route||(typeof p.route=="string"?p.route:null),V=rg(ct(Re),p.exec_pins,Y),oe=To(p.rec,p.exec_pins);Array.isArray(p.blocked_by)&&p.blocked_by.length>0&&ee.set(_,p.blocked_by.filter(x=>typeof x=="string"&&x.length>0)),typeof p.title=="string"&&p.title.length>0&&S.set(_,p.title),Array.isArray(p.scope)&&xe.set(_,p.scope.filter(x=>typeof x=="string"&&x.length>0));let $e=p.eligible!==!1,Qe=p.worker_ineligible===!0,at=Object.hasOwn(p,"eligible"),vt=[];typeof p.reason=="string"&&p.reason.length>0&&vt.push(p.reason);let gt=Nu($t,_);gt&&vt.push(gt);let $=og(_,p.release_info,f)?.map(x=>({...x,...ju({id:_,root_dir:z},x.id)}));k.push({...Pt(_),title:p.title||ft[_]||_,lane:"runnable",draggable:!at,queue_placeable:$e&&!Qe,...Qe?{worker_ineligible:!0}:{},...p.session_preferred===!0?{session_preferred:!0,session_preferred_reason:typeof p.session_preferred_reason=="string"?p.session_preferred_reason:""}:{},...p.spec_after_blocker===!0?{spec_after_blocker:!0}:{},...$?{dependency_chips:{released:$}}:{},...p.dependents_info&&typeof p.dependents_info=="object"?{dependents_info:p.dependents_info}:{},reason:vt.join(" \xB7 "),created_at:p.created_at??void 0,updated_at:p.updated_at??void 0,status:typeof p.status=="string"?p.status:void 0,labels:Array.isArray(p.labels)?p.labels:[],spec_id:typeof p.spec_id=="string"?p.spec_id:"",published:p.published===!0,workflow:A||(Y?{route:Y,chips:{route:Y}}:null),...V?{exec_chips:V}:{},...oe?{rec:oe}:{},blocked:p.blocked===!0,...Array.isArray(p.blocked_by)?{blocked_by:p.blocked_by.filter(x=>typeof x=="string"&&x.length>0)}:{},place_index:Et.length,place_lanes:b})}for(let p of Ft){let _=p&&p.bead_id;if(typeof _!="string"||de.has(_)||(de.add(_),s!==void 0&&typeof p.added_at=="number"&&p.added_at<s))continue;let A=Xm(Xe,_),Y=A&&typeof A.done_kind=="string"?A.done_kind:null;ne.push({...Pt(_),lane:"done",done:!0,done_layout:"three_line",usage:Gn(Xe,_),work_ms:vu(Xe,_),done_at:typeof p.added_at=="number"?p.added_at:void 0,done_kind:Y,...Kt(_),badges:[...Y&&Mu[Y]?[Mu[Y]]:[],...bu(Xe,_)]})}for(let p of Array.isArray(v.session_done)?v.session_done:[]){let _=p&&(p.id||p.bead_id);typeof _!="string"||de.has(_)||(de.add(_),ne.push({...Pt(_),...p,id:_,root_dir:z,workspace_name:Te,expected_revision:Be,lane:"done",done:!0}))}}if(Z.size>0)for(let v of[...k,...H,...R,...j,...ne]){let z=Z.get(`${v.root_dir}\0${v.id}`);if(!z||(typeof z.priority=="number"&&(v.priority=z.priority),typeof z.from_id=="string"&&z.from_id.length>0&&(v.from_id=z.from_id),!Object.hasOwn(z,"metadata")))continue;let Te=ct(z.metadata);if(v.rec=To(Te),v.lane==="runnable"||v.lane.startsWith("s")||v.lane==="queue"){let Re=ag(ct(h.get(v.root_dir)),Te,typeof z.route=="string"&&z.route.length>0?z.route:ct(v.workflow).route);Re&&(v.exec_chips=Re)}}let J=new Map;o.forEach((v,z)=>{v&&typeof v.root_dir=="string"&&J.set(v.root_dir,z)});let Ee=n&&n.running_sort==="repo"?"repo":"started";R.sort((v,z)=>{let Te=v.kind==="session",Re=z.kind==="session";if(Te!==Re)return Te?1:-1;if(Te&&Re){let ft=oi(z.updated_at)-oi(v.updated_at);return ft!==0?ft:v.id.localeCompare(z.id)}if(Ee==="repo"){let ft=J.get(v.root_dir)??Number.MAX_SAFE_INTEGER,kt=J.get(z.root_dir)??Number.MAX_SAFE_INTEGER;if(ft!==kt)return ft-kt}let Be=typeof v.started_at=="number"&&Number.isFinite(v.started_at)?v.started_at:null,Xe=typeof z.started_at=="number"&&Number.isFinite(z.started_at)?z.started_at:null;return Be!==null&&Xe!==null&&Be!==Xe?Be-Xe:Be===null&&Xe!==null?1:Be!==null&&Xe===null?-1:v.id.localeCompare(z.id)}),ne.sort((v,z)=>(z.done_at??0)-(v.done_at??0));let _e=o.length>0?o:r.map(v=>({root_dir:v&&v.root_dir,name:v&&v.name,auto_advance:v&&v.auto_advance,auto_merge:v&&v.auto_merge,slots:v&&v.slots,revision:v&&v.revision,runner_catalog:v&&v.runner_catalog})),Ae=new Set(k.map(v=>v.root_dir)),pe=new Map;for(let v of R)v.kind==="session"||v.run_state!=="running"||pe.set(v.root_dir,(pe.get(v.root_dir)||0)+1);let Pe=new Map;for(let v of ne){let z=Pe.get(v.root_dir);z?z.push(v):Pe.set(v.root_dir,[v])}let st={positions:new Map,resolutions:new Map,continuations:new Map,authorities:new Map,state:{active:null,failures:{},waiting:null},auto_excluded:[],running:!1},Ve=[];for(let v of _e){if(!v||typeof v.root_dir!="string")continue;let z=F.get(v.root_dir)||[],Te=O.get(v.root_dir)||[],Re=z.length>0||Te.some(ft=>ft.items.length>0||ft.occupied_by.length>0);if(u!=="all"&&!Re&&!Ae.has(v.root_dir))continue;let Be=typeof v.slots=="number"&&v.slots>=si?v.slots:si,Xe=pe.get(v.root_dir)||0;Ve.push({live_count:Xe,over_cap:Xe>Be,merge:B.get(v.root_dir)||st,token_total:cg(Pe.get(v.root_dir)||[]),cleanup_failures:se.get(v.root_dir)||[],declared_base:q.get(v.root_dir)??null,repo_operations:W.get(v.root_dir)||[],root_dir:v.root_dir,name:v.name||v.root_dir,auto_advance:v.auto_advance===!0,auto_merge:v.auto_merge===!0,slots:Be,revision:typeof v.revision=="number"?v.revision:0,runner_catalog:ct(v.runner_catalog),items:z,sublanes:{parallel:z,serial:Te},serial_lane_count:I.get(v.root_dir)||0,raw_queue_length:N.get(v.root_dir)||0})}let M={runnable:k,runnable_all:k,runnable_hidden:{blocked:0,spec:0},runnable_sections:[],runnable_flat:a==="updated_flat"||a==="as_given",queue:H,queue_groups:Ve,running:R,pr_wait:j,done:ne,parallel_rows:[],chain_lanes:[],cross_lanes_revision:l&&typeof l.revision=="number"?l.revision:null,cross_lanes_unreadable:l===null,parallel_raw_length:Object.fromEntries(N),owner_of:{}},re=du(M);for(let v of X)re.has(v.id)||re.set(v.id,{root_dir:v.root_dir,workspace_name:v.workspace_name,lane:"done",state:"done"});for(let v of[...M.queue,...M.runnable,...M.running,...M.pr_wait]){if(!Object.hasOwn(v,"blocked_by"))continue;let z=re.get(v.id);v.blockers=(v.blocked_by||[]).map(Te=>pu(Te,z,re,o))}for(let v of[...M.queue,...M.runnable,...M.running,...M.pr_wait]){let z=(v.blockers||[]).map(Be=>({...Ca(v.id,Be),...ju(v,Be.id,re)})),Te=Lu(v.id,hg(Se.get(v.id),v.dependents_info,v,re));if(z.length===0&&Te.length===0)continue;let Re={...v.dependency_chips||{},...z.length>0?{predecessors:z}:{},...Te.length>0?{dependents:Te}:{}};v.dependency_chips=Re}gg(M,ke,xe,re,o);let ae=fu(M.queue_groups);for(let v of M.queue_groups)for(let z of v.sublanes.serial){let Te=ae.get(_u(v.root_dir,z.id));Te&&(z.cross_wait_peers=Te)}M.chain_lanes=_g(l&&Array.isArray(l.lanes)?l.lanes:[],ee,re,o,S,m,{armed_by_bead:he,failed_by_bead:ue,disarmed_lanes:D});let fe=new Map;for(let v of[...M.queue,...M.runnable])fe.has(v.id)||fe.set(v.id,v);let be=new Set;for(let v of M.chain_lanes)for(let z of v.rows){if(v.status==="confirmed"&&!z.unplaced&&!z.fixed&&be.add(z.id),!v.draft&&!z.unplaced)continue;let Te=fe.get(z.id);Te&&(Te.cross_lane_chip={lane_id:v.lane_id,number:v.number,status:v.status,label:v.draft?`\uC5F0\uACB0 ${v.number} (draft)`:`\uC5F0\uACB0 ${v.number}`})}let le=new Map(M.chain_lanes.map(v=>[v.lane_id,v.number]));for(let v of[...M.queue,...M.running]){let z=he.get(v.id);if(typeof z!="string"||z.length===0)continue;let Te=le.get(z);v.armed_lane_chip=Te===void 0?{lane_id:z,label:"\u25B6 \uC9C4\uD589 \uC911 \xB7 \uB808\uC778 \uC5C6\uC74C",orphan:!0}:{lane_id:z,label:`\u25B6 \uC5F0\uACB0 ${Te}`,orphan:!1}}let je=[];for(let v of F.values())for(let z of v)be.has(z.id)||je.push(z);je.sort((v,z)=>{let Te=v.workspace_name.localeCompare(z.workspace_name);return Te!==0?Te:(v.queue_index??0)-(z.queue_index??0)}),M.parallel_rows=je;let Ke={};for(let[v,z]of re)typeof z.root_dir=="string"&&z.root_dir.length>0&&(Ke[v]=z.root_dir);for(let v of M.chain_lanes)for(let z of v.rows)!Object.hasOwn(Ke,z.id)&&z.root_dir.length>0&&m.has(z.root_dir)&&(Ke[z.id]=z.root_dir);M.owner_of=Ke;let Je=M.runnable.length;M.runnable_all=M.runnable.slice();let De=M.runnable,Q=v=>i.show_blocked||v.blocked!==!0,U=v=>i.spec==="all"||(i.spec==="with"?v.published===!0:v.published!==!0);if(d==="per_control"){let v=[],z=0,Te=0;for(let Re of De){let Be=Q(Re),Xe=U(Re);Be&&Xe?v.push(Re):!Be&&Xe?z+=1:Be&&!Xe&&(Te+=1)}De=v,M.runnable_hidden={blocked:z,spec:Te}}else{De=De.filter(Q);let v=De.length;De=De.filter(U),M.runnable_hidden={blocked:Je-v,spec:v-De.length}}let qe=(v,z)=>{let Te=oi(z.updated_at)-oi(v.updated_at);return Te!==0?Te:v.id.localeCompare(z.id)},tt=a==="repo_spec"?(v,z)=>{let Te=v.published===!0?0:1,Re=z.published===!0?0:1;return Te!==Re?Te-Re:qe(v,z)}:qe;if(a==="as_given")M.runnable=De,M.runnable_sections=[];else if(a==="updated_flat")M.runnable=De.slice().sort(qe),M.runnable_sections=[];else{let v=new Map;for(let Re of De){let Be=v.get(Re.root_dir);Be?Be.push(Re):v.set(Re.root_dir,[Re])}let z=[],Te=[];for(let Re of _e){if(!Re||typeof Re.root_dir!="string")continue;let Be=(v.get(Re.root_dir)||[]).slice().sort(tt);v.delete(Re.root_dir),Be.length!==0&&(z.push({root_dir:Re.root_dir,name:Re.name||Re.root_dir,items:Be.map(Xe=>({...Xe,workspace_name:""}))}),Te.push(...Be))}for(let[Re,Be]of v){let Xe=Be.slice().sort(tt);z.push({root_dir:Re,name:Xe[0]?.workspace_name||Re,items:Xe.map(ft=>({...ft,workspace_name:""}))}),Te.push(...Xe)}M.runnable=Te,M.runnable_sections=z}return M}function Wu(e,t){let n=new Map(e.map((a,u)=>[a,u])),r=new Map(e.map(a=>[a,new Set]));for(let a of t)a.blocker!==a.blockee&&n.has(a.blocker)&&n.has(a.blockee)&&r.get(a.blockee).add(a.blocker);let o=new Set,s=[];for(;s.length<e.length;){let a=e.find(u=>{if(o.has(u))return!1;for(let d of r.get(u))if(!o.has(d))return!1;return!0});if(a===void 0)return{order:[...e],corrections:[],cycle:!0};o.add(a),s.push(a)}let i=[],l=new Map(s.map((a,u)=>[a,u]));for(let a of s){let u=null;for(let d of r.get(a)){let f=Number(n.get(a))<Number(n.get(d)),h=Number(l.get(a))>Number(l.get(d));f&&h&&(u===null||Number(l.get(d))>Number(l.get(u)))&&(u=d)}u!==null&&i.push({bead_id:a,after:u})}return{order:s,corrections:i,cycle:!1}}var bg="\uB2E4\uB978 \uB808\uD3EC \uC774\uC288\uB294 \uC774 \uC9C1\uB82C \uB808\uC778\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",ai="\uC758\uC874 \uC790\uB8CC \uBBF8\uD655\uC815 \u2014 \uAD50\uC815 \uBCF4\uB958",yg="Worker \uD0ED \uC9C1\uB82C \uB808\uC778\uC5D0\uC11C \uBA3C\uC800 \uBE7C \uC8FC\uC138\uC694",vg="\uC774\uBBF8 \uC9C4\uD589 \uC911\uC778 \uC774\uC288 \uC55E\uC5D0\uB294 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",ro="\uC5F0\uACB0 \uB808\uC778\uC774 \uC5C6\uC2B5\uB2C8\uB2E4";function Po(e,t){return`${e}\0${t}`}function wg(e,t){let n=new Set(e),r=new Map;for(let o of e){let s=t.placed_members.has(o)?t.snapshot_blocked_by:t.runnable_blocked_by,i=s instanceof Map?s.get(o):void 0;if(!Array.isArray(i))return null;r.set(o,i.filter(l=>l!==o&&n.has(l)))}return r}function kg(e,t){if(e.status!=="confirmed")return 0;let n=-1;return e.entries.forEach((r,o)=>{t.fixed_members.has(r.bead_id)&&(n=o)}),n+1}function qo(e,t){let n=e.entries,r=n.map(f=>f.bead_id),o=wg(r,t);if(o===null)return{entries:n,corrections:[],cycle:!1,held:!0,mismatched:[]};let s=[];for(let[f,h]of o)for(let m of h)s.push({blocker:m,blockee:f});let i=kg(e,t),l=new Map(r.map((f,h)=>[f,h])),a=r.slice(0,i).filter(f=>o.get(f).some(h=>Number(l.get(h))>Number(l.get(f)))),u=Wu(r.slice(i),s);if(u.cycle)return{entries:n,corrections:[],cycle:!0,held:!1,mismatched:a};let d=new Map(n.map(f=>[f.bead_id,f]));return{entries:[...n.slice(0,i),...u.order.map(f=>d.get(f))],corrections:u.corrections,cycle:!1,held:!1,mismatched:a}}function zu(e,t){let n=t.cross_lanes.get(e);return n===void 0?null:qo(n,t)}function $g(e,t){if(!(t.corrections.length===0&&!t.cycle&&!t.held&&t.mismatched.length===0))return{lane_id:e,corrected:t.corrections.length,cycle:t.cycle,held:t.held,mismatched:t.mismatched}}function xg(e){return`${e}\uC758 \uB808\uD3EC\uB97C \uC54C \uC218 \uC5C6\uC5B4 \uC758\uC874\uC744 \uBC14\uAFC0 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4`}function Ag(e){let t=new Map;for(let[n,r]of e)t.set(n,r.slice());return t}function Pa(e,t,n){let r=new Set([t]),o=[t];for(;o.length>0;){let s=o.pop();for(let i of e.get(s)||[]){if(i===n)return!0;r.has(i)||(r.add(i),o.push(i))}}return!1}function Sg(e,t){let n=new Set;for(let[i,l]of t)for(let a of l)n.add(Po(i,a));let r=new Map,o=new Map;for(let i of e){let l=Po(i.a,i.b);r.set(l,i),o.set(l,i.type==="dep-add")}let s=[];for(let i of e){let l=Po(i.a,i.b);r.get(l)===i&&o.get(l)!==n.has(l)&&s.push(i)}return s}function Eg(e,t,n){let r=e.parallel_rows,o=Math.max(0,Math.min(r.length,n)),s=r[o];if(s&&s.root_dir===t)return s.queue_index;for(let i=o-1;i>=0;i--)if(r[i].root_dir===t)return r[i].queue_index+1;for(let i=o;i<r.length;i++)if(r[i].root_dir===t)return r[i].queue_index;return e.parallel_raw_length.get(t)??0}function Tg(e,t){return e.parallel_rows.some(n=>n.root_dir===t)}function ii(e,t,n,r){return{type:"worker-queue-place",payload:{bead_id:e,...r?{lane:r}:{},index:n},root_dir:t}}function Da(e,t){let n=0;for(let r of e.cross_lanes.keys())if(n+=1,r===t)return n;return n+1}function Fo(e){let t=Ag(e.blocked_by_map),n=[],r=new Set,o={refusal:null},s=u=>{let d=e.owner_of.get(u);return typeof d!="string"||d.length===0?(o.refusal=xg(u),null):d};return{graph:t,dep_ops:n,state:o,ownerOf:s,addDep:(u,d,f)=>{if(o.refusal!==null||u===d)return;let h=t.get(u)||[];if(h.includes(d))return;let m=s(u);if(m!==null){if(Pa(t,d,u)){o.refusal=`\uC758\uC874 \uC0AC\uC774\uD074\uC774 \uC0DD\uAE41\uB2C8\uB2E4 \u2014 ${u}\uAC00 \uC774\uBBF8 ${d}\uB97C \uB9C9\uACE0 \uC788\uC2B5\uB2C8\uB2E4`;return}t.set(u,[...h,d]),f!==void 0&&r.add(Po(u,d)),n.push({type:"dep-add",a:u,b:d,root_dir:m,...f===void 0?{}:{lane_id:f}})}},removeDep:(u,d)=>{if(o.refusal!==null||u===d)return;let f=t.get(u)||[];if(!f.includes(d))return;let h=s(u);h!==null&&(t.set(u,f.filter(m=>m!==d)),n.push({type:"dep-remove",a:u,b:d,root_dir:h}))},laneCreated:(u,d)=>r.has(Po(u,d))}}function jo(e,t,n,r,o={}){if(e.state.refusal!==null)return{refused:e.state.refusal};let s=Sg(e.dep_ops,t.blocked_by_map),i=s.filter(d=>d.type==="dep-remove"),l=s.filter(d=>d.type==="dep-add"),a=o.disarm_ops??[],u=o.lane_id===void 0||o.correction===void 0?void 0:$g(o.lane_id,o.correction);return{lane_ops:n,ops:[...i,...a,...l,...r],lane_op_index:i.length+a.length,...u===void 0?{}:{correction:u}}}function Hu(e,t,n){for(let r=1;r<t.length;r+=1)e.addDep(t[r].bead_id,t[r-1].bead_id,n)}function Do(e,t){return t>0&&e.entries[t]?.dep_created_by_lane===!0}function Gu(e,t,n,r){if(t.status!=="confirmed")return[];let o=[],s=new Map;for(let i of r){let l=e.owner_of.get(i.bead_id)||i.root_dir;typeof l!="string"||l.length===0||s.set(l,[...s.get(l)||[],i.bead_id])}for(let[i,l]of s)o.push({type:"worker-queue-disarm",payload:{bead_ids:l,lane_id:n},root_dir:i});return o}function Ku(e,t,n,r){let o=new Map;for(let s of n){if(t.placed_members.has(s.bead_id))continue;let i=e.ownerOf(s.bead_id);if(i===null)return;let l=o.get(i)??0;r.push(ii(s.bead_id,i,(t.parallel_raw_length.get(i)??0)+l)),o.set(i,l+1)}}function No(e){return e.map(t=>({bead_id:t.bead_id,root_dir:t.root_dir}))}function li(e,t){return e.length===t.length&&e.every((n,r)=>n.bead_id===t[r].bead_id&&n.root_dir===t[r].root_dir)}function ci(e,t,n){let r=Fo(n),o=[],s=[],i=[],l,a=n.owner_lane_of.get(e.bead_id),u=e.kind==="chain"?e.lane_id??a:void 0,d=u===void 0?void 0:n.cross_lanes.get(u);if(t.kind==="repo-serial"&&e.root_dir!==t.root_dir)return{refused:bg};if(t.kind==="chain"){if(e.kind==="repo-serial")return{refused:yg};if(e.kind!=="chain"&&typeof a=="string"&&a!==t.lane_id&&n.cross_lanes.has(a))return{refused:`\uC774\uBBF8 \uC5F0\uACB0 ${Da(n,a)}\uC5D0 \uC788\uC2B5\uB2C8\uB2E4`};if(!n.cross_lanes.has(t.lane_id))return{refused:ro}}if(e.kind==="chain"&&d===void 0)return{refused:ro};let f=()=>{if(d===void 0||d.status!=="confirmed")return;let k=d.entries.findIndex(X=>X.bead_id===e.bead_id);if(k<0)return;let R=k>0?d.entries[k-1]:null,j=k+1<d.entries.length?d.entries[k+1]:null,H=Do(d,k),ne=j!==null&&Do(d,k+1);H&&R!==null&&r.removeDep(e.bead_id,R.bead_id),ne&&j!==null&&r.removeDep(j.bead_id,e.bead_id),(H||ne)&&R!==null&&j!==null&&r.addDep(j.bead_id,R.bead_id,u)},h=(k,R)=>{let j=n.cross_lanes.get(k),H=j.entries.findIndex(q=>q.bead_id===e.bead_id),ne=j.entries.filter(q=>q.bead_id!==e.bead_id),X=Math.max(0,Math.min(ne.length,H>=0&&R>H?R-1:R)),F=-1;if(ne.forEach((q,W)=>{n.fixed_members.has(q.bead_id)&&(F=W)}),X<=F){r.state.refusal=vg;return}let O=H>=0?j.entries[H]:d?.entries.find(q=>q.bead_id===e.bead_id)??{bead_id:e.bead_id,root_dir:e.root_dir};l=qo({status:j.status,entries:[...ne.slice(0,X),O,...ne.slice(X)]},n);let I=l.entries;if(li(I,j.entries)||o.push({type:"monitor-lane-update",payload:{lane_id:k,entries:No(I)}}),j.status!=="confirmed")return;let N=I.findIndex(q=>q.bead_id===e.bead_id),B=N>0?I[N-1].bead_id:null,se=N+1<I.length?I[N+1].bead_id:null;if(B===null){se!==null&&r.addDep(se,e.bead_id,k);return}if(r.addDep(e.bead_id,B,k),se!==null&&(r.graph.get(se)||[]).includes(B)){let q=j.entries.findIndex(W=>W.bead_id===se);(r.laneCreated(se,B)||q>0&&j.entries[q-1].bead_id===B&&Do(j,q))&&r.removeDep(se,B),r.addDep(se,e.bead_id,k)}},m=typeof e.queue_index=="number"?e.queue_index:n.queue_index_of.get(e.bead_id);if(e.kind==="chain"&&(f(),d!==void 0&&(t.kind!=="chain"||t.lane_id!==u)&&(i.push(...Gu(n,d,u,d.entries.filter(k=>k.bead_id===e.bead_id))),o.push({type:"monitor-lane-update",payload:{lane_id:u,entries:No(d.entries.filter(k=>k.bead_id!==e.bead_id))}}))),t.kind==="chain"&&h(t.lane_id,t.marker_index),r.state.refusal!==null)return{refused:r.state.refusal};if(t.kind==="candidate")e.kind!=="candidate"&&s.push({type:"worker-queue-remove",payload:{bead_id:e.bead_id},root_dir:e.root_dir});else if(t.kind==="parallel"){let k=Eg(n,e.root_dir,t.marker_index);if(e.kind==="candidate"||e.kind==="repo-serial")s.push(ii(e.bead_id,e.root_dir,k));else if(e.kind==="parallel"){let R=n.parallel_rows,j=R[Math.max(0,Math.min(R.length,t.marker_index))];if(!(!!j&&j.bead_id===e.bead_id)&&Tg(n,e.root_dir)&&m!==void 0){let ne=m>k?k:k-1;ne>=0&&ne!==m&&s.push({type:"worker-queue-reorder",payload:{bead_id:e.bead_id,to_index:ne},root_dir:e.root_dir})}}}else if(t.kind==="chain"){let k=n.cross_lanes.get(t.lane_id);e.kind==="candidate"&&k.status==="confirmed"&&s.push(ii(e.bead_id,e.root_dir,n.parallel_raw_length.get(e.root_dir)??0))}else if(e.kind==="repo-serial"&&e.lane_id===t.lane_id){if(m!==void 0&&t.index!==m){let k=m>t.index?t.index:t.index-1;k>=0&&k!==m&&s.push({type:"worker-queue-reorder",payload:{bead_id:e.bead_id,lane:t.lane_id,to_index:k},root_dir:e.root_dir})}}else s.push(ii(e.bead_id,e.root_dir,t.index,t.lane_id));return jo(r,n,o,s,{disarm_ops:i,...t.kind==="chain"?{lane_id:t.lane_id,correction:l}:{}})}function Yu(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:ro};if(n.entries.length<2)return{refused:"\uD655\uC815\uD558\uB824\uBA74 \uBA64\uBC84\uAC00 2\uAC1C \uC774\uC0C1\uC774\uC5B4\uC57C \uD569\uB2C8\uB2E4"};let r=qo(n,t);if(r.held)return{refused:ai};let o=r.entries,s=Fo(t),i=[];Hu(s,o,e),s.state.refusal===null&&Ku(s,t,o,i);let l=li(o,n.entries)?[]:[{type:"monitor-lane-update",payload:{lane_id:e,entries:No(o)}}];return l.push({type:"monitor-lane-confirm",payload:{lane_id:e}}),jo(s,t,l,i,{lane_id:e,correction:r})}function Vu(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:ro};let r=qo(n,t),o=r.entries,s=Fo(t),i=[];Hu(s,o,e),s.state.refusal===null&&Ku(s,t,o,i);let l=li(o,n.entries)?[]:[{type:"monitor-lane-update",payload:{lane_id:e,entries:No(o)}}];return jo(s,t,l,i,{lane_id:e,correction:r})}function Xu(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:ro};let r=qo(n,t),o=r.entries;return jo(Fo(t),t,li(o,n.entries)?[]:[{type:"monitor-lane-update",payload:{lane_id:e,entries:No(o)}}],[],{lane_id:e,correction:r})}function Qu(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:ro};let r=Fo(t);if(n.status==="confirmed")for(let o=1;o<n.entries.length;o+=1)Do(n,o)&&r.removeDep(n.entries[o].bead_id,n.entries[o-1].bead_id);return jo(r,t,[{type:"monitor-lane-remove",payload:{lane_id:e}}],[],{disarm_ops:Gu(t,n,e,n.entries)})}function Zu(e,t){let n=t.cross_lanes.get(e);if(n===void 0||n.status!=="confirmed")return null;let r=[],o=[];for(let i=1;i<n.entries.length;i+=1){let l=`  ${n.entries[i].bead_id} \u2190 ${n.entries[i-1].bead_id}`;Do(n,i)?r.push(l):o.push(`${l} (\uB808\uC778\uC774 \uB9CC\uB4E4\uC9C0 \uC54A\uC74C)`)}let s=`\uC5F0\uACB0 ${Da(t,e)}\uC744 \uC9C0\uC6C1\uB2C8\uB2E4.`;return r.length===0?`${s}
\uC758\uC874\uC740 \uADF8\uB300\uB85C \uB461\uB2C8\uB2E4`:[s,"\uD568\uAED8 \uC81C\uAC70\uD560 \uC758\uC874:",...r,...o.length===0?[]:["\uADF8\uB300\uB85C \uB450\uB294 \uC758\uC874:",...o]].join(`
`)}function Ju(e){let t=new Map;for(let n of e)n.type!=="dep-add"||typeof n.lane_id!="string"||t.set(n.lane_id,[...t.get(n.lane_id)||[],{bead_id:n.a,after:n.b}]);return[...t].map(([n,r])=>({lane_id:n,pairs:r}))}function ed(e,t){let n=new Map(e.map((r,o)=>[r.bead_id,o]));return t.filter(r=>{let o=n.get(r.bead_id);return o!==void 0&&o>0&&e[o-1].bead_id===r.after})}function Na(e,t){if(e!==null){let n=t.owner_lane_of.get(e.bead_id);if(typeof n=="string"&&t.cross_lanes.has(n))return{refused:`\uC774\uBBF8 \uC5F0\uACB0 ${Da(t,n)}\uC5D0 \uC788\uC2B5\uB2C8\uB2E4`}}return{lane_ops:[{type:"monitor-lane-create",payload:{entries:e===null?[]:[e]}}],ops:[],lane_op_index:0}}var Cg="\uC0AC\uC774\uD074";function Rg(e){let t=new Map,n=r=>Array.isArray(r)?r.filter(o=>typeof o=="string"&&o.length>0):[];for(let r of Array.isArray(e)?e:[]){if(!r||typeof r!="object")continue;let o=r.bead_blocked_by&&typeof r.bead_blocked_by=="object"?r.bead_blocked_by:{};for(let[s,i]of Object.entries(o))Array.isArray(i)&&t.set(s,n(i));for(let s of[...Array.isArray(r.runnable)?r.runnable:[],...Array.isArray(r.session_active)?r.session_active:[]])s&&typeof s.bead_id=="string"&&Array.isArray(s.blocked_by)&&s.blocked_by.length>0&&t.set(s.bead_id,n(s.blocked_by))}return t}function qa(e,t,n){let r=lr(e,t),o=[],s=new Set,i=(a,u)=>{for(let d of a)s.has(d.id)||(s.add(d.id),o.push({bead_id:d.id,root_dir:d.root_dir,workspace_name:d.workspace_name,title:d.title,lane:u}))};i(r.running,"running"),i(r.pr_wait,"pr_wait"),i(r.queue,"queue"),i(r.runnable_all,"runnable");let l=n&&typeof n.root_dir=="string"&&n.root_dir.length?n.root_dir:null;return{issues:l===null?o:o.filter(a=>a.root_dir===l),blocked_by_map:Rg(e)}}function td(e,t){let n=new Map;for(let i of t.issues)!i||typeof i.bead_id!="string"||i.bead_id.length===0||n.has(i.bead_id)||n.set(i.bead_id,i);let r=n.get(e)?.root_dir,o=t.blocked_by_map.get(e)||[],s=[];for(let i of n.values()){if(i.bead_id===e||i.lane==="done"||o.includes(i.bead_id))continue;let l=Pa(t.blocked_by_map,i.bead_id,e);s.push({...i,disabled:l,...l?{reason:Cg}:{}})}return s.sort((i,l)=>{let a=r!==void 0&&i.root_dir===r,u=r!==void 0&&l.root_dir===r;return a!==u?a?-1:1:i.bead_id.localeCompare(l.bead_id)}),s}function nd(e,t){let n=t.trim().toLowerCase();return n.length===0?e.slice():e.filter(r=>r.bead_id.toLowerCase().includes(n)||r.title.toLowerCase().includes(n))}var{entries:dd,setPrototypeOf:rd,isFrozen:Og,getPrototypeOf:Lg,getOwnPropertyDescriptor:Ig}=Object,{freeze:an,seal:vn,create:Ha}=Object,{apply:Ga,construct:Ka}=typeof Reflect<"u"&&Reflect;an||(an=function(t){return t});vn||(vn=function(t){return t});Ga||(Ga=function(t,n){for(var r=arguments.length,o=new Array(r>2?r-2:0),s=2;s<r;s++)o[s-2]=arguments[s];return t.apply(n,o)});Ka||(Ka=function(t){for(var n=arguments.length,r=new Array(n>1?n-1:0),o=1;o<n;o++)r[o-1]=arguments[o];return new t(...r)});var ui=ln(Array.prototype.forEach),Mg=ln(Array.prototype.lastIndexOf),od=ln(Array.prototype.pop),Bo=ln(Array.prototype.push),Pg=ln(Array.prototype.splice),pi=ln(String.prototype.toLowerCase),Fa=ln(String.prototype.toString),ja=ln(String.prototype.match),Uo=ln(String.prototype.replace),Dg=ln(String.prototype.indexOf),Ng=ln(String.prototype.trim),Sn=ln(Object.prototype.hasOwnProperty),sn=ln(RegExp.prototype.test),Wo=qg(TypeError);function ln(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var n=arguments.length,r=new Array(n>1?n-1:0),o=1;o<n;o++)r[o-1]=arguments[o];return Ga(e,t,r)}}function qg(e){return function(){for(var t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];return Ka(e,n)}}function _t(e,t){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:pi;rd&&rd(e,null);let r=t.length;for(;r--;){let o=t[r];if(typeof o=="string"){let s=n(o);s!==o&&(Og(t)||(t[r]=s),o=s)}e[o]=!0}return e}function Fg(e){for(let t=0;t<e.length;t++)Sn(e,t)||(e[t]=null);return e}function Xn(e){let t=Ha(null);for(let[n,r]of dd(e))Sn(e,n)&&(Array.isArray(r)?t[n]=Fg(r):r&&typeof r=="object"&&r.constructor===Object?t[n]=Xn(r):t[n]=r);return t}function zo(e,t){for(;e!==null;){let r=Ig(e,t);if(r){if(r.get)return ln(r.get);if(typeof r.value=="function")return ln(r.value)}e=Lg(e)}function n(){return null}return n}var sd=an(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),Ba=an(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),Ua=an(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),jg=an(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),Wa=an(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),Bg=an(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),id=an(["#text"]),ad=an(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),za=an(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),ld=an(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),di=an(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),Ug=vn(/\{\{[\w\W]*|[\w\W]*\}\}/gm),Wg=vn(/<%[\w\W]*|[\w\W]*%>/gm),zg=vn(/\$\{[\w\W]*/gm),Hg=vn(/^data-[\-\w.\u00B7-\uFFFF]+$/),Gg=vn(/^aria-[\-\w]+$/),pd=vn(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),Kg=vn(/^(?:\w+script|data):/i),Yg=vn(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),fd=vn(/^html$/i),Vg=vn(/^[a-z][.\w]*(-[.\w]+)+$/i),cd=Object.freeze({__proto__:null,ARIA_ATTR:Gg,ATTR_WHITESPACE:Yg,CUSTOM_ELEMENT:Vg,DATA_ATTR:Hg,DOCTYPE_NAME:fd,ERB_EXPR:Wg,IS_ALLOWED_URI:pd,IS_SCRIPT_OR_DATA:Kg,MUSTACHE_EXPR:Ug,TMPLIT_EXPR:zg}),Ho={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,progressingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},Xg=function(){return typeof window>"u"?null:window},Qg=function(t,n){if(typeof t!="object"||typeof t.createPolicy!="function")return null;let r=null,o="data-tt-policy-suffix";n&&n.hasAttribute(o)&&(r=n.getAttribute(o));let s="dompurify"+(r?"#"+r:"");try{return t.createPolicy(s,{createHTML(i){return i},createScriptURL(i){return i}})}catch{return console.warn("TrustedTypes policy "+s+" could not be created."),null}},ud=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function _d(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:Xg(),t=de=>_d(de);if(t.version="3.3.0",t.removed=[],!e||!e.document||e.document.nodeType!==Ho.document||!e.Element)return t.isSupported=!1,t;let{document:n}=e,r=n,o=r.currentScript,{DocumentFragment:s,HTMLTemplateElement:i,Node:l,Element:a,NodeFilter:u,NamedNodeMap:d=e.NamedNodeMap||e.MozNamedAttrMap,HTMLFormElement:f,DOMParser:h,trustedTypes:m}=e,k=a.prototype,R=zo(k,"cloneNode"),j=zo(k,"remove"),H=zo(k,"nextSibling"),ne=zo(k,"childNodes"),X=zo(k,"parentNode");if(typeof i=="function"){let de=n.createElement("template");de.content&&de.content.ownerDocument&&(n=de.content.ownerDocument)}let F,O="",{implementation:I,createNodeIterator:N,createDocumentFragment:B,getElementsByTagName:se}=n,{importNode:q}=r,W=ud();t.isSupported=typeof dd=="function"&&typeof X=="function"&&I&&I.createHTMLDocument!==void 0;let{MUSTACHE_EXPR:Z,ERB_EXPR:ee,TMPLIT_EXPR:Se,DATA_ATTR:he,ARIA_ATTR:ue,IS_SCRIPT_OR_DATA:D,ATTR_WHITESPACE:ke,CUSTOM_ELEMENT:xe}=cd,{IS_ALLOWED_URI:S}=cd,J=null,Ee=_t({},[...sd,...Ba,...Ua,...Wa,...id]),_e=null,Ae=_t({},[...ad,...za,...ld,...di]),pe=Object.seal(Ha(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),Pe=null,st=null,Ve=Object.seal(Ha(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}})),M=!0,re=!0,ae=!1,fe=!0,be=!1,le=!0,je=!1,Ke=!1,Je=!1,De=!1,Q=!1,U=!1,qe=!0,dt=!1,tt="user-content-",v=!0,z=!1,Te={},Re=null,Be=_t({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]),Xe=null,ft=_t({},["audio","video","img","source","image","track"]),kt=null,It=_t({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),$t="http://www.w3.org/1998/Math/MathML",mt="http://www.w3.org/2000/svg",Ue="http://www.w3.org/1999/xhtml",L=Ue,te=!1,ve=null,E=_t({},[$t,mt,Ue],Fa),K=_t({},["mi","mo","mn","ms","mtext"]),Ie=_t({},["annotation-xml"]),We=_t({},["title","style","font","a","script"]),Ne=null,nt=["application/xhtml+xml","text/html"],Le="text/html",Ge=null,et=null,yt=n.createElement("form"),He=function(T){return T instanceof RegExp||T instanceof Function},At=function(){let T=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(et&&et===T)){if((!T||typeof T!="object")&&(T={}),T=Xn(T),Ne=nt.indexOf(T.PARSER_MEDIA_TYPE)===-1?Le:T.PARSER_MEDIA_TYPE,Ge=Ne==="application/xhtml+xml"?Fa:pi,J=Sn(T,"ALLOWED_TAGS")?_t({},T.ALLOWED_TAGS,Ge):Ee,_e=Sn(T,"ALLOWED_ATTR")?_t({},T.ALLOWED_ATTR,Ge):Ae,ve=Sn(T,"ALLOWED_NAMESPACES")?_t({},T.ALLOWED_NAMESPACES,Fa):E,kt=Sn(T,"ADD_URI_SAFE_ATTR")?_t(Xn(It),T.ADD_URI_SAFE_ATTR,Ge):It,Xe=Sn(T,"ADD_DATA_URI_TAGS")?_t(Xn(ft),T.ADD_DATA_URI_TAGS,Ge):ft,Re=Sn(T,"FORBID_CONTENTS")?_t({},T.FORBID_CONTENTS,Ge):Be,Pe=Sn(T,"FORBID_TAGS")?_t({},T.FORBID_TAGS,Ge):Xn({}),st=Sn(T,"FORBID_ATTR")?_t({},T.FORBID_ATTR,Ge):Xn({}),Te=Sn(T,"USE_PROFILES")?T.USE_PROFILES:!1,M=T.ALLOW_ARIA_ATTR!==!1,re=T.ALLOW_DATA_ATTR!==!1,ae=T.ALLOW_UNKNOWN_PROTOCOLS||!1,fe=T.ALLOW_SELF_CLOSE_IN_ATTR!==!1,be=T.SAFE_FOR_TEMPLATES||!1,le=T.SAFE_FOR_XML!==!1,je=T.WHOLE_DOCUMENT||!1,De=T.RETURN_DOM||!1,Q=T.RETURN_DOM_FRAGMENT||!1,U=T.RETURN_TRUSTED_TYPE||!1,Je=T.FORCE_BODY||!1,qe=T.SANITIZE_DOM!==!1,dt=T.SANITIZE_NAMED_PROPS||!1,v=T.KEEP_CONTENT!==!1,z=T.IN_PLACE||!1,S=T.ALLOWED_URI_REGEXP||pd,L=T.NAMESPACE||Ue,K=T.MATHML_TEXT_INTEGRATION_POINTS||K,Ie=T.HTML_INTEGRATION_POINTS||Ie,pe=T.CUSTOM_ELEMENT_HANDLING||{},T.CUSTOM_ELEMENT_HANDLING&&He(T.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(pe.tagNameCheck=T.CUSTOM_ELEMENT_HANDLING.tagNameCheck),T.CUSTOM_ELEMENT_HANDLING&&He(T.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(pe.attributeNameCheck=T.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),T.CUSTOM_ELEMENT_HANDLING&&typeof T.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(pe.allowCustomizedBuiltInElements=T.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),be&&(re=!1),Q&&(De=!0),Te&&(J=_t({},id),_e=[],Te.html===!0&&(_t(J,sd),_t(_e,ad)),Te.svg===!0&&(_t(J,Ba),_t(_e,za),_t(_e,di)),Te.svgFilters===!0&&(_t(J,Ua),_t(_e,za),_t(_e,di)),Te.mathMl===!0&&(_t(J,Wa),_t(_e,ld),_t(_e,di))),T.ADD_TAGS&&(typeof T.ADD_TAGS=="function"?Ve.tagCheck=T.ADD_TAGS:(J===Ee&&(J=Xn(J)),_t(J,T.ADD_TAGS,Ge))),T.ADD_ATTR&&(typeof T.ADD_ATTR=="function"?Ve.attributeCheck=T.ADD_ATTR:(_e===Ae&&(_e=Xn(_e)),_t(_e,T.ADD_ATTR,Ge))),T.ADD_URI_SAFE_ATTR&&_t(kt,T.ADD_URI_SAFE_ATTR,Ge),T.FORBID_CONTENTS&&(Re===Be&&(Re=Xn(Re)),_t(Re,T.FORBID_CONTENTS,Ge)),v&&(J["#text"]=!0),je&&_t(J,["html","head","body"]),J.table&&(_t(J,["tbody"]),delete Pe.tbody),T.TRUSTED_TYPES_POLICY){if(typeof T.TRUSTED_TYPES_POLICY.createHTML!="function")throw Wo('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof T.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw Wo('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');F=T.TRUSTED_TYPES_POLICY,O=F.createHTML("")}else F===void 0&&(F=Qg(m,o)),F!==null&&typeof O=="string"&&(O=F.createHTML(""));an&&an(T),et=T}},qt=_t({},[...Ba,...Ua,...jg]),ut=_t({},[...Wa,...Bg]),Vt=function(T){let me=X(T);(!me||!me.tagName)&&(me={namespaceURI:L,tagName:"template"});let ce=pi(T.tagName),b=pi(me.tagName);return ve[T.namespaceURI]?T.namespaceURI===mt?me.namespaceURI===Ue?ce==="svg":me.namespaceURI===$t?ce==="svg"&&(b==="annotation-xml"||K[b]):!!qt[ce]:T.namespaceURI===$t?me.namespaceURI===Ue?ce==="math":me.namespaceURI===mt?ce==="math"&&Ie[b]:!!ut[ce]:T.namespaceURI===Ue?me.namespaceURI===mt&&!Ie[b]||me.namespaceURI===$t&&!K[b]?!1:!ut[ce]&&(We[ce]||!qt[ce]):!!(Ne==="application/xhtml+xml"&&ve[T.namespaceURI]):!1},Et=function(T){Bo(t.removed,{element:T});try{X(T).removeChild(T)}catch{j(T)}},Mt=function(T,me){try{Bo(t.removed,{attribute:me.getAttributeNode(T),from:me})}catch{Bo(t.removed,{attribute:null,from:me})}if(me.removeAttribute(T),T==="is")if(De||Q)try{Et(me)}catch{}else try{me.setAttribute(T,"")}catch{}},Wt=function(T){let me=null,ce=null;if(Je)T="<remove></remove>"+T;else{let _=ja(T,/^[\r\n\t ]+/);ce=_&&_[0]}Ne==="application/xhtml+xml"&&L===Ue&&(T='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+T+"</body></html>");let b=F?F.createHTML(T):T;if(L===Ue)try{me=new h().parseFromString(b,Ne)}catch{}if(!me||!me.documentElement){me=I.createDocument(L,"template",null);try{me.documentElement.innerHTML=te?O:b}catch{}}let p=me.body||me.documentElement;return T&&ce&&p.insertBefore(n.createTextNode(ce),p.childNodes[0]||null),L===Ue?se.call(me,je?"html":"body")[0]:je?me.documentElement:p},Xt=function(T){return N.call(T.ownerDocument||T,T,u.SHOW_ELEMENT|u.SHOW_COMMENT|u.SHOW_TEXT|u.SHOW_PROCESSING_INSTRUCTION|u.SHOW_CDATA_SECTION,null)},tn=function(T){return T instanceof f&&(typeof T.nodeName!="string"||typeof T.textContent!="string"||typeof T.removeChild!="function"||!(T.attributes instanceof d)||typeof T.removeAttribute!="function"||typeof T.setAttribute!="function"||typeof T.namespaceURI!="string"||typeof T.insertBefore!="function"||typeof T.hasChildNodes!="function")},zt=function(T){return typeof l=="function"&&T instanceof l};function Ft(de,T,me){ui(de,ce=>{ce.call(t,T,me,et)})}let un=function(T){let me=null;if(Ft(W.beforeSanitizeElements,T,null),tn(T))return Et(T),!0;let ce=Ge(T.nodeName);if(Ft(W.uponSanitizeElement,T,{tagName:ce,allowedTags:J}),le&&T.hasChildNodes()&&!zt(T.firstElementChild)&&sn(/<[/\w!]/g,T.innerHTML)&&sn(/<[/\w!]/g,T.textContent)||T.nodeType===Ho.progressingInstruction||le&&T.nodeType===Ho.comment&&sn(/<[/\w]/g,T.data))return Et(T),!0;if(!(Ve.tagCheck instanceof Function&&Ve.tagCheck(ce))&&(!J[ce]||Pe[ce])){if(!Pe[ce]&&Kt(ce)&&(pe.tagNameCheck instanceof RegExp&&sn(pe.tagNameCheck,ce)||pe.tagNameCheck instanceof Function&&pe.tagNameCheck(ce)))return!1;if(v&&!Re[ce]){let b=X(T)||T.parentNode,p=ne(T)||T.childNodes;if(p&&b){let _=p.length;for(let A=_-1;A>=0;--A){let Y=R(p[A],!0);Y.__removalCount=(T.__removalCount||0)+1,b.insertBefore(Y,H(T))}}}return Et(T),!0}return T instanceof a&&!Vt(T)||(ce==="noscript"||ce==="noembed"||ce==="noframes")&&sn(/<\/no(script|embed|frames)/i,T.innerHTML)?(Et(T),!0):(be&&T.nodeType===Ho.text&&(me=T.textContent,ui([Z,ee,Se],b=>{me=Uo(me,b," ")}),T.textContent!==me&&(Bo(t.removed,{element:T.cloneNode()}),T.textContent=me)),Ft(W.afterSanitizeElements,T,null),!1)},Pt=function(T,me,ce){if(qe&&(me==="id"||me==="name")&&(ce in n||ce in yt))return!1;if(!(re&&!st[me]&&sn(he,me))){if(!(M&&sn(ue,me))){if(!(Ve.attributeCheck instanceof Function&&Ve.attributeCheck(me,T))){if(!_e[me]||st[me]){if(!(Kt(T)&&(pe.tagNameCheck instanceof RegExp&&sn(pe.tagNameCheck,T)||pe.tagNameCheck instanceof Function&&pe.tagNameCheck(T))&&(pe.attributeNameCheck instanceof RegExp&&sn(pe.attributeNameCheck,me)||pe.attributeNameCheck instanceof Function&&pe.attributeNameCheck(me,T))||me==="is"&&pe.allowCustomizedBuiltInElements&&(pe.tagNameCheck instanceof RegExp&&sn(pe.tagNameCheck,ce)||pe.tagNameCheck instanceof Function&&pe.tagNameCheck(ce))))return!1}else if(!kt[me]){if(!sn(S,Uo(ce,ke,""))){if(!((me==="src"||me==="xlink:href"||me==="href")&&T!=="script"&&Dg(ce,"data:")===0&&Xe[T])){if(!(ae&&!sn(D,Uo(ce,ke,"")))){if(ce)return!1}}}}}}}return!0},Kt=function(T){return T!=="annotation-xml"&&ja(T,xe)},jt=function(T){Ft(W.beforeSanitizeAttributes,T,null);let{attributes:me}=T;if(!me||tn(T))return;let ce={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:_e,forceKeepAttr:void 0},b=me.length;for(;b--;){let p=me[b],{name:_,namespaceURI:A,value:Y}=p,V=Ge(_),oe=Y,$e=_==="value"?oe:Ng(oe);if(ce.attrName=V,ce.attrValue=$e,ce.keepAttr=!0,ce.forceKeepAttr=void 0,Ft(W.uponSanitizeAttribute,T,ce),$e=ce.attrValue,dt&&(V==="id"||V==="name")&&(Mt(_,T),$e=tt+$e),le&&sn(/((--!?|])>)|<\/(style|title|textarea)/i,$e)){Mt(_,T);continue}if(V==="attributename"&&ja($e,"href")){Mt(_,T);continue}if(ce.forceKeepAttr)continue;if(!ce.keepAttr){Mt(_,T);continue}if(!fe&&sn(/\/>/i,$e)){Mt(_,T);continue}be&&ui([Z,ee,Se],at=>{$e=Uo($e,at," ")});let Qe=Ge(T.nodeName);if(!Pt(Qe,V,$e)){Mt(_,T);continue}if(F&&typeof m=="object"&&typeof m.getAttributeType=="function"&&!A)switch(m.getAttributeType(Qe,V)){case"TrustedHTML":{$e=F.createHTML($e);break}case"TrustedScriptURL":{$e=F.createScriptURL($e);break}}if($e!==oe)try{A?T.setAttributeNS(A,_,$e):T.setAttribute(_,$e),tn(T)?Et(T):od(t.removed)}catch{Mt(_,T)}}Ft(W.afterSanitizeAttributes,T,null)},Qt=function de(T){let me=null,ce=Xt(T);for(Ft(W.beforeSanitizeShadowDOM,T,null);me=ce.nextNode();)Ft(W.uponSanitizeShadowNode,me,null),un(me),jt(me),me.content instanceof s&&de(me.content);Ft(W.afterSanitizeShadowDOM,T,null)};return t.sanitize=function(de){let T=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},me=null,ce=null,b=null,p=null;if(te=!de,te&&(de="<!-->"),typeof de!="string"&&!zt(de))if(typeof de.toString=="function"){if(de=de.toString(),typeof de!="string")throw Wo("dirty is not a string, aborting")}else throw Wo("toString is not a function");if(!t.isSupported)return de;if(Ke||At(T),t.removed=[],typeof de=="string"&&(z=!1),z){if(de.nodeName){let Y=Ge(de.nodeName);if(!J[Y]||Pe[Y])throw Wo("root node is forbidden and cannot be sanitized in-place")}}else if(de instanceof l)me=Wt("<!---->"),ce=me.ownerDocument.importNode(de,!0),ce.nodeType===Ho.element&&ce.nodeName==="BODY"||ce.nodeName==="HTML"?me=ce:me.appendChild(ce);else{if(!De&&!be&&!je&&de.indexOf("<")===-1)return F&&U?F.createHTML(de):de;if(me=Wt(de),!me)return De?null:U?O:""}me&&Je&&Et(me.firstChild);let _=Xt(z?de:me);for(;b=_.nextNode();)un(b),jt(b),b.content instanceof s&&Qt(b.content);if(z)return de;if(De){if(Q)for(p=B.call(me.ownerDocument);me.firstChild;)p.appendChild(me.firstChild);else p=me;return(_e.shadowroot||_e.shadowrootmode)&&(p=q.call(r,p,!0)),p}let A=je?me.outerHTML:me.innerHTML;return je&&J["!doctype"]&&me.ownerDocument&&me.ownerDocument.doctype&&me.ownerDocument.doctype.name&&sn(fd,me.ownerDocument.doctype.name)&&(A="<!DOCTYPE "+me.ownerDocument.doctype.name+`>
`+A),be&&ui([Z,ee,Se],Y=>{A=Uo(A,Y," ")}),F&&U?F.createHTML(A):A},t.setConfig=function(){let de=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};At(de),Ke=!0},t.clearConfig=function(){et=null,Ke=!1},t.isValidAttribute=function(de,T,me){et||At({});let ce=Ge(de),b=Ge(T);return Pt(ce,b,me)},t.addHook=function(de,T){typeof T=="function"&&Bo(W[de],T)},t.removeHook=function(de,T){if(T!==void 0){let me=Mg(W[de],T);return me===-1?void 0:Pg(W[de],me,1)[0]}return od(W[de])},t.removeHooks=function(de){W[de]=[]},t.removeAllHooks=function(){W=ud()},t}var md=_d();var Qn={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},fi=e=>(...t)=>({_$litDirective$:e,values:t}),oo=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,n,r){this._$Ct=t,this._$AM=n,this._$Ci=r}_$AS(t,n){return this.update(t,n)}update(t,n){return this.render(...n)}};var Go=class extends oo{constructor(t){if(super(t),this.it=Ot,t.type!==Qn.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===Ot||t==null)return this._t=void 0,this.it=t;if(t===yn)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;let n=[t];return n.raw=n,this._t={_$litType$:this.constructor.resultType,strings:n,values:[]}}};Go.directiveName="unsafeHTML",Go.resultType=1;var gd=fi(Go);function Qa(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var Er=Qa();function $d(e){Er=e}var Xo={exec:()=>null};function bt(e,t=""){let n=typeof e=="string"?e:e.source,r={replace:(o,s)=>{let i=typeof s=="string"?s:s.source;return i=i.replace(cn.caret,"$1"),n=n.replace(o,i),r},getRegex:()=>new RegExp(n,t)};return r}var Zg=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),cn={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i")},Jg=/^(?:[ \t]*(?:\n|$))+/,eh=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,th=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,Qo=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,nh=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,Za=/(?:[*+-]|\d{1,9}[.)])/,xd=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,Ad=bt(xd).replace(/bull/g,Za).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),rh=bt(xd).replace(/bull/g,Za).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),Ja=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,oh=/^[^\n]+/,el=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,sh=bt(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",el).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),ih=bt(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,Za).getRegex(),yi="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",tl=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,ah=bt("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",tl).replace("tag",yi).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),Sd=bt(Ja).replace("hr",Qo).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",yi).getRegex(),lh=bt(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",Sd).getRegex(),nl={blockquote:lh,code:eh,def:sh,fences:th,heading:nh,hr:Qo,html:ah,lheading:Ad,list:ih,newline:Jg,paragraph:Sd,table:Xo,text:oh},hd=bt("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",Qo).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",yi).getRegex(),ch={...nl,lheading:rh,table:hd,paragraph:bt(Ja).replace("hr",Qo).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",hd).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",yi).getRegex()},uh={...nl,html:bt(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",tl).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:Xo,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:bt(Ja).replace("hr",Qo).replace("heading",` *#{1,6} *[^
]`).replace("lheading",Ad).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},dh=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,ph=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,Ed=/^( {2,}|\\)\n(?!\s*$)/,fh=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,vi=/[\p{P}\p{S}]/u,rl=/[\s\p{P}\p{S}]/u,Td=/[^\s\p{P}\p{S}]/u,_h=bt(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,rl).getRegex(),Cd=/(?!~)[\p{P}\p{S}]/u,mh=/(?!~)[\s\p{P}\p{S}]/u,gh=/(?:[^\s\p{P}\p{S}]|~)/u,hh=bt(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",Zg?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),Rd=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,bh=bt(Rd,"u").replace(/punct/g,vi).getRegex(),yh=bt(Rd,"u").replace(/punct/g,Cd).getRegex(),Od="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",vh=bt(Od,"gu").replace(/notPunctSpace/g,Td).replace(/punctSpace/g,rl).replace(/punct/g,vi).getRegex(),wh=bt(Od,"gu").replace(/notPunctSpace/g,gh).replace(/punctSpace/g,mh).replace(/punct/g,Cd).getRegex(),kh=bt("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,Td).replace(/punctSpace/g,rl).replace(/punct/g,vi).getRegex(),$h=bt(/\\(punct)/,"gu").replace(/punct/g,vi).getRegex(),xh=bt(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),Ah=bt(tl).replace("(?:-->|$)","-->").getRegex(),Sh=bt("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",Ah).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),gi=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,Eh=bt(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",gi).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),Ld=bt(/^!?\[(label)\]\[(ref)\]/).replace("label",gi).replace("ref",el).getRegex(),Id=bt(/^!?\[(ref)\](?:\[\])?/).replace("ref",el).getRegex(),Th=bt("reflink|nolink(?!\\()","g").replace("reflink",Ld).replace("nolink",Id).getRegex(),bd=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,ol={_backpedal:Xo,anyPunctuation:$h,autolink:xh,blockSkip:hh,br:Ed,code:ph,del:Xo,emStrongLDelim:bh,emStrongRDelimAst:vh,emStrongRDelimUnd:kh,escape:dh,link:Eh,nolink:Id,punctuation:_h,reflink:Ld,reflinkSearch:Th,tag:Sh,text:fh,url:Xo},Ch={...ol,link:bt(/^!?\[(label)\]\((.*?)\)/).replace("label",gi).getRegex(),reflink:bt(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",gi).getRegex()},Ya={...ol,emStrongRDelimAst:wh,emStrongLDelim:yh,url:bt(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",bd).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:bt(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",bd).getRegex()},Rh={...Ya,br:bt(Ed).replace("{2,}","*").getRegex(),text:bt(Ya.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},_i={normal:nl,gfm:ch,pedantic:uh},Ko={normal:ol,gfm:Ya,breaks:Rh,pedantic:Ch},Oh={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},yd=e=>Oh[e];function Zn(e,t){if(t){if(cn.escapeTest.test(e))return e.replace(cn.escapeReplace,yd)}else if(cn.escapeTestNoEncode.test(e))return e.replace(cn.escapeReplaceNoEncode,yd);return e}function vd(e){try{e=encodeURI(e).replace(cn.percentDecode,"%")}catch{return null}return e}function wd(e,t){let n=e.replace(cn.findPipe,(s,i,l)=>{let a=!1,u=i;for(;--u>=0&&l[u]==="\\";)a=!a;return a?"|":" |"}),r=n.split(cn.splitPipe),o=0;if(r[0].trim()||r.shift(),r.length>0&&!r.at(-1)?.trim()&&r.pop(),t)if(r.length>t)r.splice(t);else for(;r.length<t;)r.push("");for(;o<r.length;o++)r[o]=r[o].trim().replace(cn.slashPipe,"|");return r}function Yo(e,t,n){let r=e.length;if(r===0)return"";let o=0;for(;o<r;){let s=e.charAt(r-o-1);if(s===t&&!n)o++;else if(s!==t&&n)o++;else break}return e.slice(0,r-o)}function Lh(e,t){if(e.indexOf(t[1])===-1)return-1;let n=0;for(let r=0;r<e.length;r++)if(e[r]==="\\")r++;else if(e[r]===t[0])n++;else if(e[r]===t[1]&&(n--,n<0))return r;return n>0?-2:-1}function kd(e,t,n,r,o){let s=t.href,i=t.title||null,l=e[1].replace(o.other.outputLinkReplace,"$1");r.state.inLink=!0;let a={type:e[0].charAt(0)==="!"?"image":"link",raw:n,href:s,title:i,text:l,tokens:r.inlineTokens(l)};return r.state.inLink=!1,a}function Ih(e,t,n){let r=e.match(n.other.indentCodeCompensation);if(r===null)return t;let o=r[1];return t.split(`
`).map(s=>{let i=s.match(n.other.beginningSpace);if(i===null)return s;let[l]=i;return l.length>=o.length?s.slice(o.length):s}).join(`
`)}var hi=class{constructor(e){St(this,"options");St(this,"rules");St(this,"lexer");this.options=e||Er}space(e){let t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){let t=this.rules.block.code.exec(e);if(t){let n=t[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?n:Yo(n,`
`)}}}fences(e){let t=this.rules.block.fences.exec(e);if(t){let n=t[0],r=Ih(n,t[3]||"",this.rules);return{type:"code",raw:n,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:r}}}heading(e){let t=this.rules.block.heading.exec(e);if(t){let n=t[2].trim();if(this.rules.other.endingHash.test(n)){let r=Yo(n,"#");(this.options.pedantic||!r||this.rules.other.endingSpaceChar.test(r))&&(n=r.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:n,tokens:this.lexer.inline(n)}}}hr(e){let t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:Yo(t[0],`
`)}}blockquote(e){let t=this.rules.block.blockquote.exec(e);if(t){let n=Yo(t[0],`
`).split(`
`),r="",o="",s=[];for(;n.length>0;){let i=!1,l=[],a;for(a=0;a<n.length;a++)if(this.rules.other.blockquoteStart.test(n[a]))l.push(n[a]),i=!0;else if(!i)l.push(n[a]);else break;n=n.slice(a);let u=l.join(`
`),d=u.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");r=r?`${r}
${u}`:u,o=o?`${o}
${d}`:d;let f=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(d,s,!0),this.lexer.state.top=f,n.length===0)break;let h=s.at(-1);if(h?.type==="code")break;if(h?.type==="blockquote"){let m=h,k=m.raw+`
`+n.join(`
`),R=this.blockquote(k);s[s.length-1]=R,r=r.substring(0,r.length-m.raw.length)+R.raw,o=o.substring(0,o.length-m.text.length)+R.text;break}else if(h?.type==="list"){let m=h,k=m.raw+`
`+n.join(`
`),R=this.list(k);s[s.length-1]=R,r=r.substring(0,r.length-h.raw.length)+R.raw,o=o.substring(0,o.length-m.raw.length)+R.raw,n=k.substring(s.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:r,tokens:s,text:o}}}list(e){let t=this.rules.block.list.exec(e);if(t){let n=t[1].trim(),r=n.length>1,o={type:"list",raw:"",ordered:r,start:r?+n.slice(0,-1):"",loose:!1,items:[]};n=r?`\\d{1,9}\\${n.slice(-1)}`:`\\${n}`,this.options.pedantic&&(n=r?n:"[*+-]");let s=this.rules.other.listItemRegex(n),i=!1;for(;e;){let a=!1,u="",d="";if(!(t=s.exec(e))||this.rules.block.hr.test(e))break;u=t[0],e=e.substring(u.length);let f=t[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,R=>" ".repeat(3*R.length)),h=e.split(`
`,1)[0],m=!f.trim(),k=0;if(this.options.pedantic?(k=2,d=f.trimStart()):m?k=t[1].length+1:(k=t[2].search(this.rules.other.nonSpaceChar),k=k>4?1:k,d=f.slice(k),k+=t[1].length),m&&this.rules.other.blankLine.test(h)&&(u+=h+`
`,e=e.substring(h.length+1),a=!0),!a){let R=this.rules.other.nextBulletRegex(k),j=this.rules.other.hrRegex(k),H=this.rules.other.fencesBeginRegex(k),ne=this.rules.other.headingBeginRegex(k),X=this.rules.other.htmlBeginRegex(k);for(;e;){let F=e.split(`
`,1)[0],O;if(h=F,this.options.pedantic?(h=h.replace(this.rules.other.listReplaceNesting,"  "),O=h):O=h.replace(this.rules.other.tabCharGlobal,"    "),H.test(h)||ne.test(h)||X.test(h)||R.test(h)||j.test(h))break;if(O.search(this.rules.other.nonSpaceChar)>=k||!h.trim())d+=`
`+O.slice(k);else{if(m||f.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||H.test(f)||ne.test(f)||j.test(f))break;d+=`
`+h}!m&&!h.trim()&&(m=!0),u+=F+`
`,e=e.substring(F.length+1),f=O.slice(k)}}o.loose||(i?o.loose=!0:this.rules.other.doubleBlankLine.test(u)&&(i=!0)),o.items.push({type:"list_item",raw:u,task:!!this.options.gfm&&this.rules.other.listIsTask.test(d),loose:!1,text:d,tokens:[]}),o.raw+=u}let l=o.items.at(-1);if(l)l.raw=l.raw.trimEnd(),l.text=l.text.trimEnd();else return;o.raw=o.raw.trimEnd();for(let a of o.items){if(this.lexer.state.top=!1,a.tokens=this.lexer.blockTokens(a.text,[]),a.task){if(a.text=a.text.replace(this.rules.other.listReplaceTask,""),a.tokens[0]?.type==="text"||a.tokens[0]?.type==="paragraph"){a.tokens[0].raw=a.tokens[0].raw.replace(this.rules.other.listReplaceTask,""),a.tokens[0].text=a.tokens[0].text.replace(this.rules.other.listReplaceTask,"");for(let d=this.lexer.inlineQueue.length-1;d>=0;d--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[d].src)){this.lexer.inlineQueue[d].src=this.lexer.inlineQueue[d].src.replace(this.rules.other.listReplaceTask,"");break}}let u=this.rules.other.listTaskCheckbox.exec(a.raw);if(u){let d={type:"checkbox",raw:u[0]+" ",checked:u[0]!=="[ ]"};a.checked=d.checked,o.loose?a.tokens[0]&&["paragraph","text"].includes(a.tokens[0].type)&&"tokens"in a.tokens[0]&&a.tokens[0].tokens?(a.tokens[0].raw=d.raw+a.tokens[0].raw,a.tokens[0].text=d.raw+a.tokens[0].text,a.tokens[0].tokens.unshift(d)):a.tokens.unshift({type:"paragraph",raw:d.raw,text:d.raw,tokens:[d]}):a.tokens.unshift(d)}}if(!o.loose){let u=a.tokens.filter(f=>f.type==="space"),d=u.length>0&&u.some(f=>this.rules.other.anyLine.test(f.raw));o.loose=d}}if(o.loose)for(let a of o.items){a.loose=!0;for(let u of a.tokens)u.type==="text"&&(u.type="paragraph")}return o}}html(e){let t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){let t=this.rules.block.def.exec(e);if(t){let n=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),r=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",o=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:n,raw:t[0],href:r,title:o}}}table(e){let t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;let n=wd(t[1]),r=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),o=t[3]?.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],s={type:"table",raw:t[0],header:[],align:[],rows:[]};if(n.length===r.length){for(let i of r)this.rules.other.tableAlignRight.test(i)?s.align.push("right"):this.rules.other.tableAlignCenter.test(i)?s.align.push("center"):this.rules.other.tableAlignLeft.test(i)?s.align.push("left"):s.align.push(null);for(let i=0;i<n.length;i++)s.header.push({text:n[i],tokens:this.lexer.inline(n[i]),header:!0,align:s.align[i]});for(let i of o)s.rows.push(wd(i,s.header.length).map((l,a)=>({text:l,tokens:this.lexer.inline(l),header:!1,align:s.align[a]})));return s}}lheading(e){let t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){let t=this.rules.block.paragraph.exec(e);if(t){let n=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:n,tokens:this.lexer.inline(n)}}}text(e){let t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){let t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){let t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){let t=this.rules.inline.link.exec(e);if(t){let n=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(n)){if(!this.rules.other.endAngleBracket.test(n))return;let s=Yo(n.slice(0,-1),"\\");if((n.length-s.length)%2===0)return}else{let s=Lh(t[2],"()");if(s===-2)return;if(s>-1){let i=(t[0].indexOf("!")===0?5:4)+t[1].length+s;t[2]=t[2].substring(0,s),t[0]=t[0].substring(0,i).trim(),t[3]=""}}let r=t[2],o="";if(this.options.pedantic){let s=this.rules.other.pedanticHrefTitle.exec(r);s&&(r=s[1],o=s[3])}else o=t[3]?t[3].slice(1,-1):"";return r=r.trim(),this.rules.other.startAngleBracket.test(r)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(n)?r=r.slice(1):r=r.slice(1,-1)),kd(t,{href:r&&r.replace(this.rules.inline.anyPunctuation,"$1"),title:o&&o.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let n;if((n=this.rules.inline.reflink.exec(e))||(n=this.rules.inline.nolink.exec(e))){let r=(n[2]||n[1]).replace(this.rules.other.multipleSpaceGlobal," "),o=t[r.toLowerCase()];if(!o){let s=n[0].charAt(0);return{type:"text",raw:s,text:s}}return kd(n,o,n[0],this.lexer,this.rules)}}emStrong(e,t,n=""){let r=this.rules.inline.emStrongLDelim.exec(e);if(!(!r||r[3]&&n.match(this.rules.other.unicodeAlphaNumeric))&&(!(r[1]||r[2])||!n||this.rules.inline.punctuation.exec(n))){let o=[...r[0]].length-1,s,i,l=o,a=0,u=r[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(u.lastIndex=0,t=t.slice(-1*e.length+o);(r=u.exec(t))!=null;){if(s=r[1]||r[2]||r[3]||r[4]||r[5]||r[6],!s)continue;if(i=[...s].length,r[3]||r[4]){l+=i;continue}else if((r[5]||r[6])&&o%3&&!((o+i)%3)){a+=i;continue}if(l-=i,l>0)continue;i=Math.min(i,i+l+a);let d=[...r[0]][0].length,f=e.slice(0,o+r.index+d+i);if(Math.min(o,i)%2){let m=f.slice(1,-1);return{type:"em",raw:f,text:m,tokens:this.lexer.inlineTokens(m)}}let h=f.slice(2,-2);return{type:"strong",raw:f,text:h,tokens:this.lexer.inlineTokens(h)}}}}codespan(e){let t=this.rules.inline.code.exec(e);if(t){let n=t[2].replace(this.rules.other.newLineCharGlobal," "),r=this.rules.other.nonSpaceChar.test(n),o=this.rules.other.startingSpaceChar.test(n)&&this.rules.other.endingSpaceChar.test(n);return r&&o&&(n=n.substring(1,n.length-1)),{type:"codespan",raw:t[0],text:n}}}br(e){let t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){let t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){let t=this.rules.inline.autolink.exec(e);if(t){let n,r;return t[2]==="@"?(n=t[1],r="mailto:"+n):(n=t[1],r=n),{type:"link",raw:t[0],text:n,href:r,tokens:[{type:"text",raw:n,text:n}]}}}url(e){let t;if(t=this.rules.inline.url.exec(e)){let n,r;if(t[2]==="@")n=t[0],r="mailto:"+n;else{let o;do o=t[0],t[0]=this.rules.inline._backpedal.exec(t[0])?.[0]??"";while(o!==t[0]);n=t[0],t[1]==="www."?r="http://"+t[0]:r=t[0]}return{type:"link",raw:t[0],text:n,href:r,tokens:[{type:"text",raw:n,text:n}]}}}inlineText(e){let t=this.rules.inline.text.exec(e);if(t){let n=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:n}}}},En=class Va{constructor(t){St(this,"tokens");St(this,"options");St(this,"state");St(this,"inlineQueue");St(this,"tokenizer");this.tokens=[],this.tokens.links=Object.create(null),this.options=t||Er,this.options.tokenizer=this.options.tokenizer||new hi,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let n={other:cn,block:_i.normal,inline:Ko.normal};this.options.pedantic?(n.block=_i.pedantic,n.inline=Ko.pedantic):this.options.gfm&&(n.block=_i.gfm,this.options.breaks?n.inline=Ko.breaks:n.inline=Ko.gfm),this.tokenizer.rules=n}static get rules(){return{block:_i,inline:Ko}}static lex(t,n){return new Va(n).lex(t)}static lexInline(t,n){return new Va(n).inlineTokens(t)}lex(t){t=t.replace(cn.carriageReturn,`
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
`+o.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=i.text):n.push(o);continue}if(t){let i="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(i);break}else throw new Error(i)}}return this.state.top=!0,n}inline(t,n=[]){return this.inlineQueue.push({src:t,tokens:n}),n}inlineTokens(t,n=[]){let r=t,o=null;if(this.tokens.links){let a=Object.keys(this.tokens.links);if(a.length>0)for(;(o=this.tokenizer.rules.inline.reflinkSearch.exec(r))!=null;)a.includes(o[0].slice(o[0].lastIndexOf("[")+1,-1))&&(r=r.slice(0,o.index)+"["+"a".repeat(o[0].length-2)+"]"+r.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(o=this.tokenizer.rules.inline.anyPunctuation.exec(r))!=null;)r=r.slice(0,o.index)+"++"+r.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let s;for(;(o=this.tokenizer.rules.inline.blockSkip.exec(r))!=null;)s=o[2]?o[2].length:0,r=r.slice(0,o.index+s)+"["+"a".repeat(o[0].length-s-2)+"]"+r.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);r=this.options.hooks?.emStrongMask?.call({lexer:this},r)??r;let i=!1,l="";for(;t;){i||(l=""),i=!1;let a;if(this.options.extensions?.inline?.some(d=>(a=d.call({lexer:this},t,n))?(t=t.substring(a.raw.length),n.push(a),!0):!1))continue;if(a=this.tokenizer.escape(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.tag(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.link(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(a.raw.length);let d=n.at(-1);a.type==="text"&&d?.type==="text"?(d.raw+=a.raw,d.text+=a.text):n.push(a);continue}if(a=this.tokenizer.emStrong(t,r,l)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.codespan(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.br(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.del(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.autolink(t)){t=t.substring(a.raw.length),n.push(a);continue}if(!this.state.inLink&&(a=this.tokenizer.url(t))){t=t.substring(a.raw.length),n.push(a);continue}let u=t;if(this.options.extensions?.startInline){let d=1/0,f=t.slice(1),h;this.options.extensions.startInline.forEach(m=>{h=m.call({lexer:this},f),typeof h=="number"&&h>=0&&(d=Math.min(d,h))}),d<1/0&&d>=0&&(u=t.substring(0,d+1))}if(a=this.tokenizer.inlineText(u)){t=t.substring(a.raw.length),a.raw.slice(-1)!=="_"&&(l=a.raw.slice(-1)),i=!0;let d=n.at(-1);d?.type==="text"?(d.raw+=a.raw,d.text+=a.text):n.push(a);continue}if(t){let d="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(d);break}else throw new Error(d)}}return n}},bi=class{constructor(e){St(this,"options");St(this,"parser");this.options=e||Er}space(e){return""}code({text:e,lang:t,escaped:n}){let r=(t||"").match(cn.notSpaceStart)?.[0],o=e.replace(cn.endingNewline,"")+`
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
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${Zn(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:n}){let r=this.parser.parseInline(n),o=vd(e);if(o===null)return r;e=o;let s='<a href="'+e+'"';return t&&(s+=' title="'+Zn(t)+'"'),s+=">"+r+"</a>",s}image({href:e,title:t,text:n,tokens:r}){r&&(n=this.parser.parseInline(r,this.parser.textRenderer));let o=vd(e);if(o===null)return Zn(n);e=o;let s=`<img src="${e}" alt="${n}"`;return t&&(s+=` title="${Zn(t)}"`),s+=">",s}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:Zn(e.text)}},sl=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}checkbox({raw:e}){return e}},Tn=class Xa{constructor(t){St(this,"options");St(this,"renderer");St(this,"textRenderer");this.options=t||Er,this.options.renderer=this.options.renderer||new bi,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new sl}static parse(t,n){return new Xa(n).parse(t)}static parseInline(t,n){return new Xa(n).parseInline(t)}parse(t){let n="";for(let r=0;r<t.length;r++){let o=t[r];if(this.options.extensions?.renderers?.[o.type]){let i=o,l=this.options.extensions.renderers[i.type].call({parser:this},i);if(l!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(i.type)){n+=l||"";continue}}let s=o;switch(s.type){case"space":{n+=this.renderer.space(s);break}case"hr":{n+=this.renderer.hr(s);break}case"heading":{n+=this.renderer.heading(s);break}case"code":{n+=this.renderer.code(s);break}case"table":{n+=this.renderer.table(s);break}case"blockquote":{n+=this.renderer.blockquote(s);break}case"list":{n+=this.renderer.list(s);break}case"checkbox":{n+=this.renderer.checkbox(s);break}case"html":{n+=this.renderer.html(s);break}case"def":{n+=this.renderer.def(s);break}case"paragraph":{n+=this.renderer.paragraph(s);break}case"text":{n+=this.renderer.text(s);break}default:{let i='Token with "'+s.type+'" type was not found.';if(this.options.silent)return console.error(i),"";throw new Error(i)}}}return n}parseInline(t,n=this.renderer){let r="";for(let o=0;o<t.length;o++){let s=t[o];if(this.options.extensions?.renderers?.[s.type]){let l=this.options.extensions.renderers[s.type].call({parser:this},s);if(l!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(s.type)){r+=l||"";continue}}let i=s;switch(i.type){case"escape":{r+=n.text(i);break}case"html":{r+=n.html(i);break}case"link":{r+=n.link(i);break}case"image":{r+=n.image(i);break}case"checkbox":{r+=n.checkbox(i);break}case"strong":{r+=n.strong(i);break}case"em":{r+=n.em(i);break}case"codespan":{r+=n.codespan(i);break}case"br":{r+=n.br(i);break}case"del":{r+=n.del(i);break}case"text":{r+=n.text(i);break}default:{let l='Token with "'+i.type+'" type was not found.';if(this.options.silent)return console.error(l),"";throw new Error(l)}}}return r}},mi,Vo=(mi=class{constructor(e){St(this,"options");St(this,"block");this.options=e||Er}preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}emStrongMask(e){return e}provideLexer(){return this.block?En.lex:En.lexInline}provideParser(){return this.block?Tn.parse:Tn.parseInline}},St(mi,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens","emStrongMask"])),St(mi,"passThroughHooksRespectAsync",new Set(["preprocess","postprocess","processAllTokens"])),mi),Mh=class{constructor(...e){St(this,"defaults",Qa());St(this,"options",this.setOptions);St(this,"parse",this.parseMarkdown(!0));St(this,"parseInline",this.parseMarkdown(!1));St(this,"Parser",Tn);St(this,"Renderer",bi);St(this,"TextRenderer",sl);St(this,"Lexer",En);St(this,"Tokenizer",hi);St(this,"Hooks",Vo);this.use(...e)}walkTokens(e,t){let n=[];for(let r of e)switch(n=n.concat(t.call(this,r)),r.type){case"table":{let o=r;for(let s of o.header)n=n.concat(this.walkTokens(s.tokens,t));for(let s of o.rows)for(let i of s)n=n.concat(this.walkTokens(i.tokens,t));break}case"list":{let o=r;n=n.concat(this.walkTokens(o.items,t));break}default:{let o=r;this.defaults.extensions?.childTokens?.[o.type]?this.defaults.extensions.childTokens[o.type].forEach(s=>{let i=o[s].flat(1/0);n=n.concat(this.walkTokens(i,t))}):o.tokens&&(n=n.concat(this.walkTokens(o.tokens,t)))}}return n}use(...e){let t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(n=>{let r={...n};if(r.async=this.defaults.async||r.async||!1,n.extensions&&(n.extensions.forEach(o=>{if(!o.name)throw new Error("extension name required");if("renderer"in o){let s=t.renderers[o.name];s?t.renderers[o.name]=function(...i){let l=o.renderer.apply(this,i);return l===!1&&(l=s.apply(this,i)),l}:t.renderers[o.name]=o.renderer}if("tokenizer"in o){if(!o.level||o.level!=="block"&&o.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let s=t[o.level];s?s.unshift(o.tokenizer):t[o.level]=[o.tokenizer],o.start&&(o.level==="block"?t.startBlock?t.startBlock.push(o.start):t.startBlock=[o.start]:o.level==="inline"&&(t.startInline?t.startInline.push(o.start):t.startInline=[o.start]))}"childTokens"in o&&o.childTokens&&(t.childTokens[o.name]=o.childTokens)}),r.extensions=t),n.renderer){let o=this.defaults.renderer||new bi(this.defaults);for(let s in n.renderer){if(!(s in o))throw new Error(`renderer '${s}' does not exist`);if(["options","parser"].includes(s))continue;let i=s,l=n.renderer[i],a=o[i];o[i]=(...u)=>{let d=l.apply(o,u);return d===!1&&(d=a.apply(o,u)),d||""}}r.renderer=o}if(n.tokenizer){let o=this.defaults.tokenizer||new hi(this.defaults);for(let s in n.tokenizer){if(!(s in o))throw new Error(`tokenizer '${s}' does not exist`);if(["options","rules","lexer"].includes(s))continue;let i=s,l=n.tokenizer[i],a=o[i];o[i]=(...u)=>{let d=l.apply(o,u);return d===!1&&(d=a.apply(o,u)),d}}r.tokenizer=o}if(n.hooks){let o=this.defaults.hooks||new Vo;for(let s in n.hooks){if(!(s in o))throw new Error(`hook '${s}' does not exist`);if(["options","block"].includes(s))continue;let i=s,l=n.hooks[i],a=o[i];Vo.passThroughHooks.has(s)?o[i]=u=>{if(this.defaults.async&&Vo.passThroughHooksRespectAsync.has(s))return(async()=>{let f=await l.call(o,u);return a.call(o,f)})();let d=l.call(o,u);return a.call(o,d)}:o[i]=(...u)=>{if(this.defaults.async)return(async()=>{let f=await l.apply(o,u);return f===!1&&(f=await a.apply(o,u)),f})();let d=l.apply(o,u);return d===!1&&(d=a.apply(o,u)),d}}r.hooks=o}if(n.walkTokens){let o=this.defaults.walkTokens,s=n.walkTokens;r.walkTokens=function(i){let l=[];return l.push(s.call(this,i)),o&&(l=l.concat(o.call(this,i))),l}}this.defaults={...this.defaults,...r}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return En.lex(e,t??this.defaults)}parser(e,t){return Tn.parse(e,t??this.defaults)}parseMarkdown(e){return(t,n)=>{let r={...n},o={...this.defaults,...r},s=this.onError(!!o.silent,!!o.async);if(this.defaults.async===!0&&r.async===!1)return s(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof t>"u"||t===null)return s(new Error("marked(): input parameter is undefined or null"));if(typeof t!="string")return s(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(t)+", string expected"));if(o.hooks&&(o.hooks.options=o,o.hooks.block=e),o.async)return(async()=>{let i=o.hooks?await o.hooks.preprocess(t):t,l=await(o.hooks?await o.hooks.provideLexer():e?En.lex:En.lexInline)(i,o),a=o.hooks?await o.hooks.processAllTokens(l):l;o.walkTokens&&await Promise.all(this.walkTokens(a,o.walkTokens));let u=await(o.hooks?await o.hooks.provideParser():e?Tn.parse:Tn.parseInline)(a,o);return o.hooks?await o.hooks.postprocess(u):u})().catch(s);try{o.hooks&&(t=o.hooks.preprocess(t));let i=(o.hooks?o.hooks.provideLexer():e?En.lex:En.lexInline)(t,o);o.hooks&&(i=o.hooks.processAllTokens(i)),o.walkTokens&&this.walkTokens(i,o.walkTokens);let l=(o.hooks?o.hooks.provideParser():e?Tn.parse:Tn.parseInline)(i,o);return o.hooks&&(l=o.hooks.postprocess(l)),l}catch(i){return s(i)}}}onError(e,t){return n=>{if(n.message+=`
Please report this to https://github.com/markedjs/marked.`,e){let r="<p>An error occurred:</p><pre>"+Zn(n.message+"",!0)+"</pre>";return t?Promise.resolve(r):r}if(t)return Promise.reject(n);throw n}}},Sr=new Mh;function wt(e,t){return Sr.parse(e,t)}wt.options=wt.setOptions=function(e){return Sr.setOptions(e),wt.defaults=Sr.defaults,$d(wt.defaults),wt};wt.getDefaults=Qa;wt.defaults=Er;wt.use=function(...e){return Sr.use(...e),wt.defaults=Sr.defaults,$d(wt.defaults),wt};wt.walkTokens=function(e,t){return Sr.walkTokens(e,t)};wt.parseInline=Sr.parseInline;wt.Parser=Tn;wt.parser=Tn.parse;wt.Renderer=bi;wt.TextRenderer=sl;wt.Lexer=En;wt.lexer=En.lex;wt.Tokenizer=hi;wt.Hooks=Vo;wt.parse=wt;var U$=wt.options,W$=wt.setOptions,z$=wt.use,H$=wt.walkTokens,G$=wt.parseInline;var K$=Tn.parse,Y$=En.lex;function cr(e){let t=wt.parse(e),n=md.sanitize(t);return gd(n)}function Jn(e,t){return c`<div class="prompt-block">
    <div class="prompt-block__label">${e}</div>
    <pre class="prompt-block__body">${t}</pre>
  </div>`}function so(e){return e.loading?c`<div class="prompt-block__status">불러오는 중…</div>`:e.error?c`<div class="prompt-block__status prompt-block__status--error">
      프롬프트를 불러오지 못했습니다
    </div>`:""}function wi(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),n=r=>String(r).padStart(2,"0");return`${t.getFullYear()}-${n(t.getMonth()+1)}-${n(t.getDate())} ${n(t.getHours())}:${n(t.getMinutes())}`}var Pd={Read:"\u{1F4D6}",Edit:"\u270E",MultiEdit:"\u270E",Write:"\u{1F4DD}",Bash:"\u26A1",Grep:"\u{1F50E}",Glob:"\u{1F50E}",Task:"\u{1F916}",Agent:"\u{1F916}",WebFetch:"\u{1F310}",WebSearch:"\u{1F310}"},Ph={command_execution:"\uBA85\uB839 \uC2E4\uD589",file_change:"\uD30C\uC77C \uBCC0\uACBD",mcp_call:"MCP \uD638\uCD9C",web_search:"\uC6F9 \uAC80\uC0C9",plan:"\uACC4\uD68D"},Dh=/^\s*([✓✗⊘])\s*(spec|impl|implementation|plan)\s*게이트\s*[—–-]\s*(\S+)\s+(APPROVE|REVISE|REJECT|BLOCK|SKIP)(?:\s*·\s*(.+))?/,Nh=/^\s*#{0,3}\s*Phase\s+\d+(?:\s*\/\s*\d+)?\s*(?:[·:—–-]\s*.+)?$/;function Cn(e){return!!e&&typeof e=="object"}function il(e){return typeof e!="string"||e.length===0?[]:e.split(/\r?\n/)}function al(e,t){let n=il(e),r=il(t),o=new Map;for(let l of n)o.set(l,(o.get(l)||0)+1);let s=0;for(let l of r){let a=o.get(l)||0;a>0?o.set(l,a-1):s+=1}let i=0;for(let l of o.values())i+=l;return{added:s,removed:i}}function Dd(e){let t="";typeof e=="string"?t=e:Array.isArray(e)?t=e.map(o=>Cn(o)&&typeof o.text=="string"?o.text:"").join(""):Cn(e)&&typeof e.text=="string"&&(t=e.text);let r=(String(t).split(/\r?\n/).find(o=>o.trim().length>0)||"").trim();return r.length>120?`${r.slice(0,117)}\u2026`:r}function qh(e){let t=String(e.name||""),n=e.input||{},r={kind:"tool",tool:t,icon:Pd[t]||"\u{1F527}",input:n,expandable:!0};if((t==="Read"||t==="Write")&&(r.path=String(n.file_path||n.path||"")),t==="Write"&&(r.added=il(n.content).length),t==="Edit"){r.path=String(n.file_path||n.path||"");let{added:o,removed:s}=al(n.old_string,n.new_string);r.added=o,r.removed=s}if(t==="MultiEdit"){r.path=String(n.file_path||n.path||"");let o=0,s=0,i=Array.isArray(n.edits)?n.edits:[];for(let l of i){let a=al(Cn(l)?l.old_string:"",Cn(l)?l.new_string:"");o+=a.added,s+=a.removed}r.added=o,r.removed=s}return t==="Bash"&&(r.command=String(n.command||"")),(t==="Grep"||t==="Glob")&&(r.command=String(n.pattern||n.query||"")),t==="Agent"&&(typeof e.id=="string"&&e.id.length>0&&(r.launch_id=e.id),typeof n.description=="string"&&(r.command=n.description)),r}function ll(e){return typeof e!="string"||e.trim().length===0?null:{kind:"thinking",text:e}}var Fh=/<system-reminder>[\s\S]*?<\/system-reminder>/g;function Nd(e){let t;if(typeof e=="string")t=e;else if(Array.isArray(e))t=e.filter(r=>Cn(r)&&r.type==="text"&&typeof r.text=="string").map(r=>String(r.text)).join(`
`);else return null;let n=t.replace(Fh,"").trim();return n.length>0?{kind:"user",text:n}:null}function cl(e){let t=e.split(/\r?\n/).find(r=>r.trim().length>0)||"",n=Dh.exec(t);return n?{kind:"gate",gate:n[2]==="implementation"?"impl":n[2],reviewer:n[3],verdict:n[4],time:n[5]?n[5].trim():void 0,text:t.trim()}:Nh.test(t)&&t.trim().length<=80?{kind:"phase",text:t.trim()}:{kind:"assistant",text:e}}function jh(e,t){if(e.subtype==="init"){let n=typeof e.model=="string"?e.model:"";return t.progress=null,[{kind:"thinking",text:n?`\uC138\uC158 \uC2DC\uC791 \xB7 ${n}`:"\uC138\uC158 \uC2DC\uC791"}]}if(e.subtype==="thinking_tokens"){let r=`\uC0DD\uAC01 \uC911\u2026 ${typeof e.estimated_tokens=="number"&&Number.isFinite(e.estimated_tokens)?Math.max(0,Math.round(e.estimated_tokens)):0} \uD1A0\uD070`;return t.progress?(t.progress.text=r,[]):(t.progress={kind:"thinking",text:r},[t.progress])}return[]}function Bh(e,t){let n=typeof e.parent_tool_use_id=="string"&&e.parent_tool_use_id.length>0?e.parent_tool_use_id:null;if(e.type==="assistant"){let r=e.message,o=r&&Array.isArray(r.content)?r.content:[],s=[];for(let i of o)if(Cn(i)){if(i.type==="text"&&typeof i.text=="string")s.push(cl(i.text));else if(i.type==="thinking"){let l=ll(i.thinking);l&&s.push(l)}else if(i.type==="tool_use"){let l=qh(i);typeof i.id=="string"&&t.set(i.id,l),s.push(l)}}return n?Md(s,n):s}if(e.type==="user"){let r=e.message,o=r&&Array.isArray(r.content)?r.content:[];for(let i of o)if(Cn(i)&&i.type==="tool_result"){let l=t.get(String(i.tool_use_id));if(l){let a=Dd(i.content);l.result=a,l.output=typeof i.content=="string"?i.content:a,i.is_error===!0&&(l.is_error=!0)}}let s=Nd(r&&r.content);return s?[s]:[]}if(e.type==="result"){let r=e.is_error===!1&&e.subtype==="success",o={kind:"result",success:r,text:typeof e.result=="string"?e.result:r?"DONE":""};return n?Md([o],n):[o]}return[]}function Md(e,t){for(let n of e)n.parent_tool_use_id=t;return e}function Uh(e){let t=typeof e.command=="string"?e.command:"",n=Dd(e.aggregated_output===void 0?e.output:e.aggregated_output),o=[typeof e.exit_code=="number"&&Number.isFinite(e.exit_code)?`exit ${e.exit_code}`:typeof e.status=="string"&&e.status.length>0?e.status:"",n].filter(i=>i.length>0).join(" \xB7 "),s={kind:"tool",tool:"shell",icon:Pd.Bash,command:t,input:{command:t},expandable:!0};return o.length>0&&(s.result=o),typeof e.aggregated_output=="string"&&(s.output=e.aggregated_output),s}function Wh(e){if(e.type==="item.completed"&&Cn(e.item)){let t=e.item;if(t.type==="agent_message"&&typeof t.text=="string")return[cl(t.text)];if(t.type==="user_message"){let n=Nd(t.text);return n?[n]:[]}if(t.type==="reasoning"){let n=ll(t.text);return n?[n]:[]}return t.type==="error"?[{kind:"error",text:String(t.message||"")}]:t.type==="command_execution"?[Uh(t)]:[]}if(e.type==="turn.completed")return[{kind:"result",success:!0,text:"DONE"}];if(e.type==="turn.failed"){let t=e.error;return[{kind:"error",text:t&&typeof t.message=="string"?t.message:"turn failed"}]}return e.type==="error"?[{kind:"error",text:String(e.message||"")}]:[]}function zh(e){if(e.schema!=="codex-delegation-monitor-v1"||!Cn(e.event))return[];let t=e.event;if(t.type==="session.started"||t.type==="turn.started")return[];if((t.type==="item.started"||t.type==="item.completed")&&Cn(t.item)){let n=t.item;if(typeof n.id!="string"||n.id.length===0)return[];if(t.type==="item.completed"&&n.kind==="agent_message"&&typeof n.text=="string"&&n.text.trim().length>0)return[cl(n.text)];if(t.type==="item.completed"&&n.kind==="reasoning"){let l=ll(n.text);return l?[l]:[]}if(n.kind!=="activity"||typeof n.activity!="string")return[];let r=Ph[n.activity];if(!r)return[];let o="\uC2DC\uC791",s="\u2026",i={kind:"tool",tool:"",icon:s,expandable:!1};if(t.type==="item.completed"){if(n.status==="completed")o="\uC644\uB8CC",s="\u2713";else if(n.status==="failed")o="\uC2E4\uD328",s="\u2717";else return[];i.result=""}return i.tool=`${r} \xB7 ${o}`,i.icon=s,[i]}return t.type==="turn.completed"&&t.status==="completed"?[{kind:"result",success:!0,text:"DONE"}]:t.type==="turn.failed"&&(t.status==="failed"||t.status==="interrupted")&&typeof t.error_code=="string"&&t.error_code.length>0?[{kind:"error",text:t.error_code}]:[]}function Hh(e){let t=e.type;return typeof t=="string"&&(t==="error"||t.startsWith("thread.")||t.startsWith("turn.")||t.startsWith("item."))}function Gh(e){let t=e;if(typeof e=="string"){let n=e.trim();if(n.length===0)return null;try{t=JSON.parse(n)}catch{return null}}return Cn(t)?t:null}function qd(e={}){let t=e.skip_delegated===!0,n=new Map,r={progress:null};return{push(o){let s=Gh(o);if(!s)return[];if(t&&typeof s.parent_tool_use_id=="string"&&s.parent_tool_use_id.length>0)return[];if(s.type==="system"&&s.schema!=="codex-delegation-monitor-v1")return jh(s,r);let i=s.schema==="codex-delegation-monitor-v1"?zh(s):Hh(s)?Wh(s):Bh(s,n);return i.length>0&&(r.progress=null),i}}}function ul(e){let t=[],n=qd(),r=Array.isArray(e)?e:[];for(let o of r)for(let s of n.push(o))t.push(s);return t}var Kh=5,Yh=10,Vh=/Task\s+#(\d+)/,Xh=/\bgh\s+pr\s+create\b|\bgit\s+push\b/,Qh=/\bnpm\s+(?:run\s+)?(?:test|tsc|lint|build)\b|\bvitest\b/;function Zo(e){return typeof e!="string"?"":(e.split(/\r?\n/).find(t=>t.trim().length>0)||"").trim()}function Zh(e){return typeof e!="string"||e.length===0?0:e.split(/\r?\n/).length}function Jh(e){for(let t=e.length-1;t>=0;t-=1){let n=e[t];if(n.kind==="phase"||n.kind==="gate")return n.text||null}return null}function eb(e){let t=new Map,n=0;for(let o of e){if(o.kind!=="tool")continue;n+=1;let s=o.input||{};if(o.tool==="TaskCreate"){let a=Vh.exec(o.output||o.result||""),u=String(s.activeForm||s.subject||"").trim();if(!a||u.length===0)continue;t.set(a[1],{label:u,active:s.status==="in_progress"?n:0});continue}if(o.tool!=="TaskUpdate")continue;let i=t.get(String(s.taskId??""));if(!i)continue;let l=s.activeForm||s.subject;typeof l=="string"&&l.trim().length>0&&(i.label=l.trim()),typeof s.status=="string"&&(i.active=s.status==="in_progress"?n:0)}let r=null;for(let o of t.values())o.active>0&&(!r||o.active>r.active)&&(r=o);return r?r.label:null}function tb(e){if(e.tool==="Bash"){let t=e.command||"";return Xh.test(t)?"~ PR/\uAC8C\uC2DC \uC911":Qh.test(t)?"~ \uAC80\uC99D \uC911":null}return e.tool==="Edit"||e.tool==="Write"||e.tool==="MultiEdit"?"~ \uAD6C\uD604 \uC911":e.tool==="Read"||e.tool==="Grep"||e.tool==="Glob"?"~ \uD0D0\uC0C9 \uC911":null}function nb(e){let t=e.filter(o=>o.kind==="tool").slice(-Yh),n=new Map;t.forEach((o,s)=>{let i=tb(o);if(!i)return;let l=n.get(i)||{count:0,last:-1};l.count+=1,l.last=s,n.set(i,l)});let r=null;for(let[o,s]of n)(!r||s.count>r.count||s.count===r.count&&s.last>r.last)&&(r={label:o,count:s.count,last:s.last});return r?r.label:null}function rb(e){let t=Jh(e);if(t)return{text:t,guess:!1};let n=eb(e);if(n)return{text:n,guess:!1};let r=nb(e);return r?{text:r,guess:!0}:null}function ob(e,t){if(typeof e!="number")return"";let n=Math.max(0,Math.floor((t-e)/1e3));return n<60?`${n}\uCD08 \uC804`:rn(e,t)}function io(e,t={}){let{transport:n,sessionLogStore:r,onClose:o}=t,s=null,i=null,l=null,a=null,u=null,d=!1,f={},h=!0,m=new Set,k=new Set,R=null,j=null,H=!1,ne=!1,X=!1,F=null,O=null;function I(){H=!1,ne=!1,X=!1,F=null,O=null}async function N(Q){if(n){ne=!0,X=!1,Pe();try{let U=await Promise.resolve(n("get-attempt-prompt",{attempt_id:Q,...u?{root_dir:u}:{}}));if(s!==Q)return;!U||typeof U!="object"||Array.isArray(U)?X=!0:(F=U,O=Q)}catch{s===Q&&(X=!0)}finally{s===Q&&(ne=!1,Pe())}}}function B(){if(H=!H,H&&s&&O!==s){N(s);return}Pe()}function se(){if(!H)return"";let Q=so({loading:ne,error:X});if(Q)return c`<div class="sv__prompt" data-seam="attempt-prompt">
        ${Q}
      </div>`;if(!F)return"";if(F.missing)return c`<div class="sv__prompt" data-seam="attempt-prompt">
        <div class="prompt-block__status">
          기록 없음 — 프롬프트 기록 이전에 실행된 attempt입니다
        </div>
      </div>`;let U=wi(F.recorded_at);return c`<div class="sv__prompt" data-seam="attempt-prompt">
      ${U?c`<div class="prompt-block__meta">${U} 발송</div>`:""}
      ${typeof F.task_prompt=="string"?Jn("\uACFC\uC5C5 (user)",F.task_prompt):""}
      ${typeof F.system_prompt=="string"?Jn("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",F.system_prompt):""}
    </div>`}function q(){if(!a||!r)return[];let Q=r.get(a);return ul(Q?Q.lines:[])}function W(){if(!a||!r)return null;let Q=r.get(a),U=Q?Q.last_event_at:null;return typeof U=="number"?U:null}function Z(){return f.status==="running"}function ee(){if(Z()&&s){j||(j=setInterval(()=>Pe(),1e3));return}Se()}function Se(){j&&(clearInterval(j),j=null)}function he(Q){let U=[],qe=0;for(;qe<Q.length;){let{idx:dt,line:tt}=Q[qe];if(tt.kind==="tool"){let v=qe;for(;v<Q.length&&Q[v].line.kind==="tool"&&Q[v].line.tool===tt.tool;)v+=1;if(v-qe>=Kh&&!k.has(dt)){U.push({kind:"group",idx:dt,tool:tt.tool||"",lines:Q.slice(qe,v)}),qe=v;continue}}U.push({kind:"line",idx:dt,line:tt}),qe+=1}return U}function ue(Q){let U=[],qe=new Map;for(let v=0;v<Q.length;v+=1){let z=Q[v],Te=z.parent_tool_use_id;if(typeof Te=="string"&&Te.length>0){let Re=qe.get(Te);Re||(Re={kind:"subagent",idx:v,launch_id:Te,agent_type:null,header:null,lines:[]},qe.set(Te,Re),U.push(Re)),Re.lines.push({idx:v,line:z});continue}if(z.kind==="tool"&&z.tool==="Agent"&&typeof z.launch_id=="string"&&z.launch_id.length>0){let Re=D(z),Be=qe.get(z.launch_id);if(Be){Be.header={idx:v,line:z},Be.agent_type=Re;continue}let Xe={kind:"subagent",idx:v,launch_id:z.launch_id,agent_type:Re,header:{idx:v,line:z},lines:[]};qe.set(z.launch_id,Xe),U.push(Xe);continue}U.push({kind:"entry",idx:v,line:z})}let dt=[],tt=0;for(;tt<U.length;){if(U[tt].kind!=="entry"){dt.push(U[tt]),tt+=1;continue}let v=tt;for(;v<U.length&&U[v].kind==="entry";)v+=1;dt.push(...he(U.slice(tt,v))),tt=v}return dt}function D(Q){let U=Q.input;return U&&typeof U.subagent_type=="string"?U.subagent_type:null}function ke(Q){for(let U=Q.length-1;U>=0;U-=1){let qe=Q[U];if(qe.kind==="result"||qe.kind==="error")return null;if(qe.kind==="tool"&&!Object.hasOwn(qe,"result"))return qe}return null}function xe(Q){for(let U=Q.length-1;U>=0;U-=1)if(Q[U].kind==="thinking")return Q[U];return null}function S(Q,U){if(U.kind==="gate")return c`<div class="sv__gate">${U.text}</div>`;if(U.kind==="phase")return c`<div class="sv__phase">${U.text}</div>`;if(U.kind==="result")return c`<div
        class="sv__result${U.success?" sv__result--ok":" sv__result--fail"}"
      >
        <span class="sv__result-glyph">${U.success?"\u2713":"\u2717"}</span>
        <span class="sv__result-body"
          >${cr(U.text||(U.success?"DONE":"\uC2E4\uD328"))}</span
        >
      </div>`;if(U.kind==="thinking"){let qe=m.has(Q);return c`<div
        class="sv__think${qe?" sv__think--expanded":""}"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>Ve(Q)}
      >
        <span class="sv__think-line">💭 ${Zo(U.text)}</span>
        ${qe?c`<pre class="sv__think-expand">${U.text}</pre>`:""}
      </div>`}if(U.kind==="user"){let qe=m.has(Q);return c`<div
        class="sv__line sv__line--user${qe?" sv__line--expanded":""}"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>Ve(Q)}
      >
        <span class="sv__user-line">▷ ${Zo(U.text)}</span>
        ${qe?c`<pre class="sv__user-expand">${U.text}</pre>`:""}
      </div>`}if(U.kind==="error")return c`<div class="sv__error">⛔ ${U.text}</div>`;if(U.kind==="blocker")return c`<div class="sv__error">⛔ ${U.text}</div>`;if(U.kind==="tool"){let qe=m.has(Q),dt=U.tool==="Bash"?Zh(U.command):0,tt=U.tool==="Bash"?dt>1?Zo(U.command):U.command:U.path||U.command||"";return c`<div
        class="sv__tool${qe?" sv__tool--expanded":""}"
        role="button"
        tabindex="0"
        @click=${()=>Ve(Q)}
      >
        <span class="sv__tool-line">
          <span class="sv__tool-icon">${U.icon}</span>
          <span class="sv__tool-name">${U.tool}</span>
          ${tt?c`<span class="sv__tool-detail">${tt}</span>`:""}
          ${dt>1?c`<span class="sv__tool-more">⋯ ${dt}줄</span>`:""}
          ${typeof U.added=="number"?c`<span class="sv__diff-add">+${U.added}</span>`:""}
          ${typeof U.removed=="number"?c`<span class="sv__diff-del">−${U.removed}</span>`:""}
          ${U.result?c`<span class="sv__tool-ok">→ ${U.result}</span>`:""}
        </span>
        ${qe?c`<pre class="sv__tool-expand">${J(U)}</pre>`:""}
      </div>`}return c`<div class="sv__as">${cr(U.text||"")}</div>`}function J(Q){let U=[];if(Q.tool==="Bash"&&typeof Q.command=="string"&&Q.command.length>0)U.push(Q.command);else if(Q.input!==void 0)try{U.push(`input: ${JSON.stringify(Q.input,null,2)}`)}catch{}return typeof Q.output=="string"&&Q.output.length>0&&U.push(`output:
${Q.output}`),U.join(`

`)}function Ee(){if(!s)return c``;let Q=q(),U=(i?[f.agent_type,f.model,f.effort]:[f.runner,f.model,f.effort]).filter(Boolean).join(" \xB7 "),qe=f.session_id||"",dt=`\uB77C\uC774\uBE0C \uB530\uB77C\uAC00\uAE30 ${h?"ON":"OFF"}`,tt=Z(),v=tt?ob(W(),Date.now()):"",z=tt?ke(Q):null,Te=tt?xe(Q):null,Re=rb(Q);return c`<div class="sv" data-attempt-id=${s}>
      <div class="sv__bar">
        <span class="sv__id"
          >${f.label||(i?f.role||"":s)}</span
        >
        ${Re?c`<span
              class="sv__stage${Re.guess?" sv__stage--guess":""}"
              title=${Re.text}
              >${Re.text}</span
            >`:""}
        ${tt?c`<span
              class="sv__live"
              title="세션이 진행 중입니다"
              aria-label=${v?`\uC9C4\uD589 \uC911 \xB7 \uB9C8\uC9C0\uB9C9 \uC774\uBCA4\uD2B8 ${v}`:"\uC9C4\uD589 \uC911"}
              ><span class="sv__live-dot" aria-hidden="true"></span>${v?c`<span class="sv__live-ago">${v}</span>`:""}</span
            >`:""}
        ${qe?c`<button
              type="button"
              class="sv__session"
              title=${qe}
              aria-label=${`\uC138\uC158 ID \uBCF5\uC0AC: ${qe}`}
              @click=${()=>re(qe)}
            >
              ⧉ ${qe.slice(0,8)}
            </button>`:""}
        ${f.resume_command?c`<button
              type="button"
              class="sv__resume-cmd"
              title=${f.resume_command}
              aria-label=${`\uC7AC\uAC1C \uBA85\uB839 \uBCF5\uC0AC: ${f.resume_command}`}
              @click=${()=>re(f.resume_command||"")}
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
          class="sv__follow${h?" sv__follow--on":""}"
          aria-pressed=${h?"true":"false"}
          aria-label=${dt}
          @click=${M}
        >
          <span class="sv__follow-full">⇣ ${dt}</span>
          <span class="sv__follow-short">⇣ ${h?"ON":"OFF"}</span>
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
      ${i||d?"":se()}
      <div class="sv__body">
        ${Q.length===0?c`<div class="sv__empty">세션 로그 없음</div>`:ue(Q).map(Be=>Be.kind==="subagent"?Ae(Be):Be.kind==="group"?_e(Be):S(Be.idx,Be.line))}
      </div>
      ${z||Te?c`<div class="sv__now">
            <span class="sv__now-label">지금</span>
            ${z?c`<span class="sv__now-icon">${z.icon}</span>
                  <span class="sv__now-name">${z.tool}</span>
                  <span class="sv__now-detail"
                    >${z.tool==="Bash"?Zo(z.command):z.path||z.command||""}</span
                  >`:""}
            ${Te?c`<span class="sv__now-think"
                  >💭 ${Zo(Te.text)}</span
                >`:""}
          </div>`:""}
    </div>`}function _e(Q){return c`<div
      class="sv__group"
      role="button"
      tabindex="0"
      title="펼치기"
      @click=${()=>pe(Q.idx)}
    >
      <span class="sv__group-icon">${Q.lines[0].line.icon}</span>
      <span class="sv__group-name">${Q.tool}</span>
      <span class="sv__group-count">${Q.lines.length}</span>
      <span class="sv__group-caret" aria-hidden="true">▸</span>
    </div>`}function Ae(Q){let U=k.has(Q.idx),qe=Q.header?Q.header.line:null,dt=qe?qe.is_error===!0?"\u2717":typeof qe.result=="string"?"\u2713":"\u27F3":"",tt=qe&&qe.command?qe.command:"";return c`<div class="sv__sub${U?" sv__sub--open":""}">
      <div
        class="sv__sub-head"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>pe(Q.idx)}
      >
        <span class="sv__sub-icon" aria-hidden="true">🤖</span>
        <span class="sv__sub-name">${Q.agent_type||"subagent"}</span>
        ${tt?c`<span class="sv__sub-detail">${tt}</span>`:""}
        <span class="sv__sub-count">${Q.lines.length}줄</span>
        ${dt?c`<span class="sv__sub-state">${dt}</span>`:""}
        ${U?"":c`<span class="sv__sub-caret" aria-hidden="true">▸</span>`}
      </div>
      ${U?c`<div class="sv__sub-body">
            ${he(Q.lines).map(v=>v.kind==="group"?_e(v):S(v.idx,v.line))}
          </div>`:""}
    </div>`}function pe(Q){k.add(Q),Pe()}function Pe(){it(Ee(),e),ee(),h&&st()}function st(){let Q=e.querySelector(".sv__body");Q&&(Q.scrollTop=Q.scrollHeight)}function Ve(Q){m.has(Q)?m.delete(Q):m.add(Q),Pe()}function M(){h=!h,Pe()}function re(Q){on(Q).then(U=>{U?ye("\uBCF5\uC0AC\uB428","success",1200):ye("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function ae(Q){!s||!Q||(f={...f,...Q},Pe())}function fe(Q){let U=Q.target;if(!U||!U.classList||!U.classList.contains("sv__body"))return;!(U.scrollHeight-U.scrollTop-U.clientHeight<=4)&&h&&(h=!1,Pe())}e.addEventListener("scroll",fe,!0);function be(Q){let U=Q.target;!U||typeof U.closest!="function"||e.contains(U)||U.closest("dialog")||U.closest(".md-viewer-root")||De()}let le=!1;function je(){le||(document.addEventListener("mousedown",be),le=!0)}function Ke(){le&&(document.removeEventListener("mousedown",be),le=!1)}function Je(Q){let U=Q&&Q.attempt_id;if(!U)return;let qe=typeof Q.launch_id=="string"&&Q.launch_id.length>0?Q.launch_id:null,dt=Q.session_ref&&typeof Q.session_ref=="object"?Q.session_ref:null;if(qe&&dt)return;let tt=a;s=U,i=qe,l=dt,a=i?`session-log:${s}:${i}`:`session-log:${s}`,n&&tt&&tt!==a&&Promise.resolve(n("unsubscribe-session-log",{id:tt})).catch(()=>{}),u=typeof Q.root_dir=="string"&&Q.root_dir.length>0?Q.root_dir:null,f=Q.meta||{},d=Q.hide_prompt===!0,h=!0,m.clear(),k.clear(),I(),!R&&r&&(R=r.subscribe(Pe)),n&&Promise.resolve(n("subscribe-session-log",{id:a,attempt_id:s,...i?{launch_id:i}:{},...l?{session_ref:l}:{},...u?{root_dir:u}:{}})).catch(()=>{}),je(),Pe()}function De(){let Q=a;Ke(),s=null,i=null,l=null,a=null,u=null,d=!1,m.clear(),k.clear(),I(),Se(),n&&Q&&Promise.resolve(n("unsubscribe-session-log",{id:Q})).catch(()=>{}),it(c``,e),o&&o()}return{open:Je,updateMeta:ae,close:De,isOpen(){return s!==null},destroy(){Se(),Ke(),R&&(R(),R=null),e.removeEventListener("scroll",fe,!0),s=null,i=null,l=null,a=null,u=null,d=!1,it(c``,e)}}}function sb(e){return["plan_review","plan_approval","plan_check"].some(t=>{let n=e[t];return typeof n=="string"&&n.trim().length>0})}function ib(e){let t=e&&e.metadata||{},n=qr(e),r=[];return n.path&&r.push({kind:"spec",path:n.path,missing_state:n.evidence==="draft"?"spec_draft":null}),typeof t.plan_path=="string"&&t.plan_path.trim().length>0&&r.push({kind:"plan",path:t.plan_path.trim(),missing_state:sb(t)?null:"plan_pending"}),r}function Fd(e,t){let n=ib(e);return c`
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
  `}var ab="## \u{1F916} \uC791\uC5C5 \uBCF4\uACE0\uC11C",lb=/^> (worker · attempt|session · sid) ([A-Za-z0-9._-]{1,64}) · (\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z)$/,cb=/^\*\*결론\*\* — (.+)$/;function ki(e){if(typeof e!="string"||e.length===0)return null;let t=e.split(/\r?\n/);if(t[0]!==ab)return null;let n=lb.exec(t[1]||"");if(!n)return null;let r=n[1].split(" ")[0],o=n[2],s=n[3],i=2;for(;i<t.length&&t[i].trim().length===0;)i+=1;let l=i<t.length?cb.exec(t[i]):null,a=l?l[1].replace(/\s+/g," ").trim():"",u=l?i+1:i;return{lane:r,identifier:o,timestamp:s,conclusion:a,body:t.slice(u).join(`
`).trim()}}var jd=20;function Bd(e){if(e==null||e==="")return"";let t=new Date(e);if(Number.isNaN(t.getTime()))return"";let n=String(t.getMonth()+1).padStart(2,"0"),r=String(t.getDate()).padStart(2,"0"),o=String(t.getHours()).padStart(2,"0"),s=String(t.getMinutes()).padStart(2,"0");return`${n}-${r} ${o}:${s}`}function ub(e){return e.length>jd?`${e.slice(0,jd)}\u2026`:e}function db(e,t,n,r){let o=`${t.lane} ${ub(t.identifier)}`;return c`<div class="detail-report">
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
        <span class="detail-report__time">${Bd(t.timestamp)}</span>
      </span>
      <span class="detail-report__concl">${t.conclusion}</span>
    </button>
    ${r&&t.body.length>0?c`<div class="detail-report__body">
          ${cr(t.body)}
        </div>`:""}
  </div>`}function pb(e){return c`<div class="detail-comment" data-comment-id=${e.id}>
    <div class="detail-comment__meta">
      <span class="detail-comment__author"
        >${e.author||"(\uC791\uC131\uC790 \uC5C6\uC74C)"}</span
      >
      <span class="detail-comment__time"
        >${Bd(e.created_at)}</span
      >
    </div>
    <div class="detail-comment__body">
      ${cr(typeof e.text=="string"?e.text:"")}
    </div>
  </div>`}function Ud(e,t={},n={}){let r=Array.isArray(e)?e.filter(Boolean):[],o=n.expanded||new Set,s=typeof n.draft=="string"?n.draft:"",i=n.sending===!0,l=r.slice().sort((a,u)=>String(u.created_at||"").localeCompare(String(a.created_at||"")));return c`
    <div class="detail-section-label">댓글 (${r.length})</div>
    ${n.error?c`<div class="detail-empty" data-seam="comments-error">
          댓글을 불러오지 못했습니다
        </div>`:l.length===0?c`<div class="detail-empty" data-seam="comments">댓글 없음</div>`:c`<div class="detail-comments" data-seam="comments">
            ${l.map(a=>{let u=ki(typeof a.text=="string"?a.text:"");return u?db(a,u,t,o.has(a.id)):pb(a)})}
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
  `}var{I:Tx}=Fl;var Wd=e=>e.strings===void 0;var fb={},zd=(e,t=fb)=>e._$AH=t;var Tr=fi(class extends oo{constructor(e){if(super(e),e.type!==Qn.PROPERTY&&e.type!==Qn.ATTRIBUTE&&e.type!==Qn.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!Wd(e))throw Error("`live` bindings can only contain a single expression")}render(e){return e}update(e,[t]){if(t===yn||t===Ot)return t;let n=e.element,r=e.name;if(e.type===Qn.PROPERTY){if(t===n[r])return yn}else if(e.type===Qn.BOOLEAN_ATTRIBUTE){if(!!t===n.hasAttribute(r))return yn}else if(e.type===Qn.ATTRIBUTE&&n.getAttribute(r)===t+"")return yn;return zd(e),t}});var _b=[{id:"spec",label:"spec \uB9AC\uBDF0",receipt:"spec_review",receipt_stage:null,fill_stage:"spec",stale_stage:"spec",hue:"spec"},{id:"plan",label:"\uACC4\uD68D \uB9AC\uBDF0",receipt:null,receipt_stage:"plan",fill_stage:"plan",stale_stage:"plan",hue:"plan"},{id:"impl",label:"\uAD6C\uD604",receipt:null,receipt_stage:null,fill_stage:"impl",stale_stage:null,hue:"impl"},{id:"impl_review",label:"impl \uB9AC\uBDF0",receipt:"impl_review",receipt_stage:null,fill_stage:null,stale_stage:"impl",hue:"impl"},{id:"pr",label:"PR",receipt:null,receipt_stage:null,fill_stage:"pr",stale_stage:null,hue:"pr"}],dl={quick_fix:["impl","impl_review"],spec_backed:["spec","impl","impl_review","pr"],full_plan:["spec","plan","impl","impl_review","pr"]},Hd={missing:"\uC2B9\uC778 \uD544\uC694",stale:"\uC7AC\uC2B9\uC778 \uD544\uC694",unknown:"\uC2B9\uC778 \uD655\uC778 \uBD88\uAC00"},mb={pin:"pin",global:"global",base:"base"};function gb(e){return c`<span
    class=${`detail-layer-rail detail-layer-rail--${mb[e]}`}
    data-source=${e}
    aria-hidden="true"
    ><i></i><i></i><i></i
  ></span>`}function hb(e,t,n){switch(e){case"workflow_mode":return xo;case"spec_review_model":case"impl_review_model":return Ao;case"plan_review_model":return Ls;case"spec_review_effort":case"plan_review_effort":case"impl_review_effort":return Is;case"impl_dispatch":return Kc;case"impl_runtime":return Os;case"impl_model":return Qr(n,t.impl_runtime);case"impl_effort":return Zr(n,t.impl_runtime,t.impl_model);case"impl_speed":case"orchestration_speed":return $o;case"orchestration_model":return So(n,null);case"orchestration_effort":return Zr(n,void 0,t.orchestration_model||hn).filter(r=>r!==hn);default:return[]}}function bb(e,t){return c`<div class="detail-effective__row" data-key=${e.key}>
    ${gb(e.source)}
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
  </div>`}function Gd(e,t){let n=fa.flatMap(a=>a.keys),r=_a(n,e.metadata,e.workspace_values,e.execution_defaults,e.catalog,e.controller_runtime||null),o=eu(n,e.metadata,e.workspace_values,e.execution_defaults,e.catalog,e.controller_runtime||null),s=Object.fromEntries(r.map(a=>[a.key,a])),i=Object.fromEntries(r.filter(a=>a.value!==null).map(a=>[a.key,a.value])),l=r.filter(a=>a.full_value&&a.display!==a.full_value).map(a=>a.full_value).join(" \xB7 ");return c`<details
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
        >${yb(s)}</span
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
              ${r.filter(u=>a.keys.includes(u.key)).map(u=>{let d=Es({key:u.key,choices:hb(u.key,i,e.catalog),layer:"pin",pin:e.metadata,global:e.workspace_values,execution_defaults:e.execution_defaults,runner_catalog:e.catalog,route:typeof e.metadata?.route=="string"?e.metadata.route:null,controller_runtime:e.controller_runtime||null});return bb(u,{expanded:e.expanded,options:d.options,default_label:d.unset_label,default_full_value:d.full_value,onEdit:t.onEdit})})}
            `)}
          <div class="detail-effective__foot">
            <select
              data-impl-preset-select
              aria-label="실행 프리셋"
              .value=${Tr(e.preset_id)}
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
  </details>`}function yb(e){let t=[];if(e.workflow_mode&&t.push(e.workflow_mode.display),e.impl_dispatch?.value==="main")t.push("\uBA54\uC778");else if(e.impl_dispatch?.value==="delegated"){let n=e.impl_runtime?` ${e.impl_runtime.display}`:"";t.push(`\uC704\uC784${n}`)}for(let n of["impl_model","impl_effort","impl_speed"])e[n]?.resolution!=="not_applicable"&&t.push(e[n]?.display||"\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00");return t.join(" \xB7 ")}function vb(e){if(!e||typeof e!="object")return null;let{kind:t,actor:n,effort:r,sha:o}=e;return typeof t!="string"||typeof n!="string"||typeof o!="string"?null:{kind:t,actor:n,effort:typeof r=="string"?r:null,sha:o}}function Kd(e,t={}){let n=e&&typeof e.metadata=="object"&&e.metadata?e.metadata:{},r=e&&typeof e.workflow=="object"&&e.workflow?e.workflow:{},o=r.stages||{},s=r.route||n.route||null,i=typeof n.pr_url=="string"?n.pr_url:"",l=typeof n.exec_receipt=="string"?n.exec_receipt:"",a=vb(r.exec_receipt),u=a?Wn(a):l,d=a?`${a.kind}:${a.actor}`:l.split("@")[0],f=As(r.planned_execution,r.exec_receipt),h=r.chips?.pr?.number,m=typeof h=="number"?`PR #${h}`:"PR",k=To(n),R=k!==null&&t.isChipOpen?.("rec")===!0,j=R?Aa({rec:k},"rec"):null;return c`<section class="detail-summary" data-seam="detail-summary">
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
    ${j?Vr(j):""}
    <div
      class="detail-summary__gates"
      role="group"
      aria-label="워크플로 게이트"
    >
      ${wb(s).map(H=>kb(H,n,o,{label:H.id==="pr"?m:H.label,href:H.id==="pr"?i:""}))}
    </div>
  </section>`}function wb(e){let n=typeof e=="string"&&Object.hasOwn(dl,e)&&dl[e]||dl.spec_backed;return _b.filter(r=>n.includes(r.id))}var $i={on:"\uD1B5\uACFC",stale:"\uC7AC\uAC80\uD1A0 \uD544\uC694",current:"\uC9C4\uD589 \uC911",none:"\uBBF8\uB3C4\uB2EC"};function kb(e,t,n,r){let o=$b(e,t,n),s=e.fill_stage?n[e.fill_stage]:null,i=typeof s?.fill=="string"?s.fill:null,l=i?i==="full":o.length>0,a=!l&&i==="dim",u=e.stale_stage?n[e.stale_stage]?.stale===!0:!1,d=o&&o.split("@")[1]?.slice(0,7)||"",f=u?$i.stale:l?$i.on:a?$i.current:$i.none,h=xb(e,n),m=`${r.label} \xB7 ${f}${h?` \xB7 ${h}`:""}${o?` \xB7 ${o}`:""}`,k=`detail-summary__gate${l?" detail-summary__gate--on":""}${a?" detail-summary__gate--current":""}${u?" detail-summary__gate--stale":""}${d?" detail-summary__gate--receipt":""}`,R=c`<span class="detail-summary__gate-label"
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
  >`}function $b(e,t,n){if(e.receipt&&typeof t[e.receipt]=="string")return String(t[e.receipt]);if(e.receipt_stage){let r=n[e.receipt_stage]?.receipt;return typeof r=="string"?r:""}return""}function xb(e,t){if(e.id!=="plan")return"";let n=t.plan?.approval_state;return typeof n=="string"&&Object.hasOwn(Hd,n)?Hd[n]:""}function xi(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function Yd(e){return xi(e)&&typeof e.key=="string"&&e.key.length>0&&typeof e.email=="string"&&e.email.length>0}function Vd(e,t){let n=e&&e[t];if(!xi(n)||!Array.isArray(n.accounts))return null;let r=n.accounts.filter(Yd),o=Yd(n.active)?n.active:null;return{accounts:r,active:o||r.find(s=>s.active===!0)||null}}function Zd(e){return typeof e.alias=="string"&&e.alias.length>0?` (${e.alias})`:""}function Ai(e){let t=typeof e.status=="string"&&e.status!=="ok"?` \xB7 ${e.status}`:"";return`${e.email}${Zd(e)}${t}`}function ao(e){let t=typeof e.plan=="string"&&e.plan.length>0?e.plan:"plan \uD655\uC778 \uBD88\uAC00";return`${e.email} \xB7 ${t}${Zd(e)}`}function Ab(e,t,n){if(n!==null){let o=e==="claude"?Ai:ao,s=t?t.accounts.find(i=>i.key===n):void 0;return`\uB808\uD3EC \uAE30\uBCF8\uAC12 \uC0AC\uC6A9(${s?o(s):n})`}return t?t.active?`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(${e==="claude"?t.active.email:ao({...t.active,alias:null})})`:"\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(\uD655\uC778 \uBD88\uAC00)":"(\uAE30\uBCF8)"}function Xd(e,t){if(!xi(e)||e.state!=="usable"||!xi(e.values))return null;let n=e.values[t];return typeof n=="string"&&n.length>0?n:null}function Qd(e){let t=e.provider_key==="claude"?Ai:ao,n=!!e.provider?.accounts.some(r=>r.key===e.selected);return c`<div class="detail-kv" data-exec-account-row=${e.key}>
    <span class="detail-kv__k">${e.title}</span>
    <span class="detail-kv__vgroup">
      <select
        class=${e.selected?"detail-kv__v detail-kv__v--sel":"detail-kv__v"}
        aria-label=${e.title}
        data-exec-key=${e.key}
        @change=${r=>e.handlers.onExecChange(e.key,r.target.value)}
      >
        <option value="" ?selected=${e.selected.length===0}>
          ${Ab(e.provider_key,e.provider,e.workspace_default)}
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
  </div>`}function Jd({md:e,catalog:t,workspace_defaults:n=null,handlers:r}){let o=typeof e.claude_account=="string"?e.claude_account:"",s=typeof e.codex_account=="string"?e.codex_account:"";return c`<section class="exec-accounts" data-exec-accounts>
    <div class="detail-section-label">실행 계정</div>
    <div class="exec-settings-core">
      ${Qd({key:"claude_account",title:"Claude \uACC4\uC815",provider_key:"claude",provider:Vd(t,"claude"),selected:o,workspace_default:Xd(n,"claude_account"),handlers:r,hint:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uB7F0\uD0C0\uC784\uC774 claude\uC77C \uB54C \uC801\uC6A9\uB429\uB2C8\uB2E4"})}
      ${Qd({key:"codex_account",title:"Codex \uACC4\uC815",provider_key:"codex",provider:Vd(t,"codex"),selected:s,workspace_default:Xd(n,"codex_account"),handlers:r})}
    </div>
  </section>`}function Sb(e){return String(e||"").replace(/^docs\/(superpowers\/)?/,"")}function Eb(e){let t=/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(e);if(!t)return{front:null,body:e};let n=t[1].trim();return{front:n.length>0?n:null,body:e.slice(t[0].length)}}function Si(e,t){let n=t.getWorkspacePath,r=t.fetchImpl||globalThis.fetch?.bind(globalThis),o=null,s="loading",i="",l=null,a="";function u(R){R.key==="Escape"&&o&&(R.preventDefault(),m())}document.addEventListener("keydown",u);function d(){return o?c`
      <div class="mv-overlay" role="dialog" aria-modal="true">
        <div class="mv-overlay__backdrop" @click=${()=>m()}></div>
        <div class="mv">
          <div class="mv__bar">
            <span class="mv__path" title=${o}
              >${Sb(o)}</span
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
    `:c``}function f(){it(d(),e)}async function h(R,j={}){o=R,s="loading",i="",l=null,a="",f();let H=j.workspace||(n?n():"");if(!H){s="error",a="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4",f();return}if(!r){s="error",a="fetch\uB97C \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",f();return}let ne="/api/doc?workspace="+encodeURIComponent(H)+"&path="+encodeURIComponent(R);try{let X=await r(ne),F=await X.json().catch(()=>({}));if(!X.ok||!F||F.ok!==!0){if(F?.error==="not_found"&&j.missing_state==="plan_pending"){s="pending",a="\uACC4\uD68D \uC791\uC131 \uC804 \xB7 \uACBD\uB85C\uB9CC \uC608\uC57D\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4",f();return}s="error",a="\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 ("+String(F&&F.error||X.status)+")",f();return}let O=Eb(String(F.content||""));l=O.front,i=O.body,s="ready",f()}catch{s="error",a="\uBB38\uC11C \uC694\uCCAD \uC2E4\uD328",f()}}function m(){o=null,it(c``,e)}function k(){document.removeEventListener("keydown",u),m()}return{open:h,close:m,destroy:k}}var Tb=[{key:"input_tokens",label:"\uC785\uB825"},{key:"output_tokens",label:"\uCD9C\uB825"},{key:"cache_read_input_tokens",label:"\uCE90\uC2DC \uC77D\uAE30"}],np="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4",Ei=[{role:"implementation",provider:"codex"},{role:"review-consult",provider:"codex"},{role:"subagent",provider:"claude"}],Cb=new Set(["codex-runner","Explore","Plan","advisor","advisor-xhigh","claude-code-guide","statusline-setup"]);function ep(e){return typeof e=="string"&&Cb.has(e)}var Rb=["running","done","failed","interrupted"],Ob={running:"\u25CF",done:"\u2713",failed:"\u2717",interrupted:"\u26A0"};function Lb(e){return typeof e=="number"&&Number.isFinite(e)?e:0}function Ib(e){let t=Jt(e);if(t.length>0)return t.map(o=>c`<span class="detail-usage-total" title=${o.tooltip}
          >${o.label}</span
        >`);let n=Kr(e);if(!n||!e)return"";let r=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?` \xB7 $${e.total_cost_usd.toFixed(2)}`:"";return c`<span
      class="detail-usage-total"
      title="이 이슈의 모든 attempt 토큰 합계 (입력+출력+캐시)"
      >${n.replace(/^τ /,"\u03C4 \uCD1D ")}${r}</span
    >${e.replayed?c`<span class="detail-usage-partial" title=${np}
          >부분 집계</span
        >`:""}`}function tp(e){return!e||!e.roles.orchestrator?null:{providers:e.roles.orchestrator,roles:{}}}function _l(e){if(typeof e=="number")return Jo(e);if(typeof e!="string")return"";let t=Date.parse(e);return Number.isFinite(t)?Jo(t):""}function Mb(e){return typeof e=="string"?e.replace(/-\d{8}$/,""):""}function Pb(e,t){if(e.provider!=="claude")return{text:e.session_id.slice(0,8),title:e.session_id};let n=t&&typeof t.agent_id=="string"?t.agent_id:"";return n.length>0?{text:n.slice(0,8),title:n}:{text:e.launch_id.slice(-8),title:e.launch_id}}function pl(e){return e===null||typeof e=="string"&&e.trim().length>0}function fl(e){return e===null||typeof e=="number"&&Number.isFinite(e)}function Db(e){if(!e||typeof e!="object"||Array.isArray(e))return null;let t=e,n=t.provider==="claude";return typeof t.launch_id!="string"||t.launch_id.length===0||!Ei.some(r=>r.role===t.role&&r.provider===t.provider)||!(n?pl(t.model):typeof t.model=="string"&&t.model.length>0)||!(!("effort"in t)||pl(t.effort))||!(!("agent_type"in t)||pl(t.agent_type))||typeof t.session_id!="string"||t.session_id.length===0||!Rb.includes(t.status)||!(t.turn_id===null||typeof t.turn_id=="string")?null:n?!fl(t.started_at)||!fl(t.last_event_at)||!fl(t.completed_at)?null:t:typeof t.started_at!="number"||!Number.isFinite(t.started_at)||typeof t.last_event_at!="number"||!Number.isFinite(t.last_event_at)||!(t.completed_at===null||typeof t.completed_at=="string"&&Number.isFinite(Date.parse(t.completed_at)))?null:t}function Nb(e,t,n){let o=Jt({providers:{[t]:{subtotal:n.subtotal,breakdown:n.usage,...n.replayed?{replayed:!0}:{}}},roles:{}})[0];return c`<div class="detail-session__leg detail-session__usage-detail">
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
  </div>`}function qb(e,t,n,r){let o=e.status==="running"?null:t,i=(o?Jt({providers:{[e.provider]:{subtotal:o.subtotal,breakdown:o.usage,...o.replayed?{replayed:!0}:{}}},roles:{}}):[])[0],l=e.status==="running"?Jo(e.last_event_at):o?_l(o.completed_at):"",a=(e.provider==="claude"?["Claude",e.agent_type,Mb(e.model),e.effort]:["codex",e.model,e.effort]).filter(Boolean).join(" \xB7 "),u=Pb(e,o);return c`<button
    type="button"
    class="detail-session__leg detail-session__usage-detail detail-session__leg--${e.status}"
    data-launch-id=${e.launch_id}
    @click=${()=>r.onOpenDelegation&&r.onOpenDelegation(n,e.launch_id)}
  >
    <span class="detail-session__leg-glyph" aria-hidden="true"
      >${Ob[e.status]}</span
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
  </button>`}function Fb(e,t){return e.role===t.role&&(e.model===null||t.model===void 0||e.model===t.model)&&e.session_id===t.session_id}function jb(e,t,n){let r=[],o=new Set,s=Array.isArray(e.delegation_sessions)?e.delegation_sessions:[];for(let d of s){let f=Db(d);!f||o.has(f.launch_id)||ep(f.agent_type)||(o.add(f.launch_id),r.push(f))}r.sort((d,f)=>(d.started_at||0)-(f.started_at||0));let i={};for(let{role:d,provider:f}of Ei){let h=t?t.roles[d]?.[f]:null;i[d]=h?[...h.legs]:[]}let l=Ei.flatMap(({role:d})=>i[d]),a=new Set,u=[];for(let{role:d,provider:f}of Ei){for(let h of r.filter(m=>m.role===d&&m.provider===f)){let m=l.find(k=>k.receipt_id===h.launch_id)||null;m&&!Fb(h,m)||(m&&a.add(m.receipt_id),u.push(qb(h,m,e.attempt_id,n)))}for(let h of i[d])!a.has(h.receipt_id)&&!ep(h.agent_type)&&u.push(Nb(d,f,h))}return u}function Bb(e,t){let n=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?e.total_cost_usd:null,r=[...Tb,{key:"cache_creation_input_tokens",label:t==="codex"?"\uCE90\uC2DC \uC4F0\uAE30":"\uCE90\uC2DC \uC0DD\uC131"},...t==="codex"&&typeof e.reasoning_output_tokens=="number"&&Number.isFinite(e.reasoning_output_tokens)?[{key:"reasoning_output_tokens",label:"\uCD94\uB860 \uCD9C\uB825"}]:[]];return c`<div class="detail-session__usage-detail">
    ${r.map(o=>c`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">${o.label}</span
          ><span class="detail-session__usage-value"
            >${Lb(e[o.key]).toLocaleString("en-US")}</span
          ></span
        >`)}
    ${n===null?"":c`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">비용</span
          ><span class="detail-session__usage-value"
            >$${n.toFixed(2)}</span
          ></span
        >`}
    ${e.replayed?c`<span class="detail-session__usage-note">${np}</span>`:""}
  </div>`}var Ub={running:"\u25CF",done:"\u2713",failed:"\u2717",orphaned:"\u26A0"};function Jo(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),n=String(t.getHours()).padStart(2,"0"),r=String(t.getMinutes()).padStart(2,"0");return`${n}:${r}`}function Wb(e){if(typeof e.exec_default_preset_id!="string"||e.exec_default_preset_id.length===0)return"";let t=e.exec_values&&typeof e.exec_values=="object"?Object.entries(e.exec_values).filter(([,r])=>typeof r=="string"&&r.length>0).map(([r,o])=>`${r}=${o}`).join(" \xB7 "):"",n=typeof e.exec_default_preset_revision=="number"?` r${e.exec_default_preset_revision}`:"";return c`<div
    class="detail-session__preset-audit"
    data-attempt-preset-audit
  >
    <strong>외부 실행 preset</strong>
    <span>${e.exec_default_preset_id}${n}</span>
    ${t?c`<small>${t}</small>`:""}
    <small>내부 workflow 실행 영수증과 별도 기록</small>
  </div>`}var zb={remote:"\uB2E4\uB978 \uBA38\uC2E0 \uC138\uC158 \u2014 \uC774 \uC11C\uBC84\uC5D0 transcript \uC5C6\uC74C",missing:"transcript \uD30C\uC77C \uC5C6\uC74C"};function Hb(e,t){let n=zb[e.locality]||"",r=e.locality==="remote"?`${e.host} \xB7 \uB2E4\uB978 \uBA38\uC2E0`:e.locality==="missing"?`${e.host} \xB7 \uD30C\uC77C \uC5C6\uC74C`:e.host;return c`<div class="detail-session-row">
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
  </div>`}function rp(e,t={},n={},r=[]){let o=Array.isArray(e)?e:[],s=Array.isArray(r)?r:[],i=[...s.filter(m=>m&&m.current===!0),...s.filter(m=>m&&m.current!==!0).sort((m,k)=>k.index-m.index)],l=i.map(m=>Hb(m,t)),a=n.expanded||new Set;if(o.length===0&&i.length===0)return c`
      <div class="detail-section-label">세션 이력</div>
      <div class="detail-empty" data-seam="session-history">세션 이력 없음</div>
    `;let u=new Set;for(let m of o)m&&typeof m.resumed_from=="string"&&m.resumed_from.length>0&&u.add(m.resumed_from);let d=m=>{if(!(m.status==="failed"||m.status==="orphaned"))return"";let R=typeof m.session_id=="string"&&m.session_id.length>0,j=u.has(m.attempt_id),H=R&&!j,ne=R?j?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":"\uC774 \uC138\uC158\uC744 \uAC19\uC740 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C \uC774\uC5B4\uC11C \uC9C4\uD589":"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00";return c`<button
      type="button"
      class="detail-session__resume"
      data-attempt-id=${m.attempt_id}
      ?disabled=${!H}
      title=${ne}
      @click=${X=>{X.stopPropagation(),H&&t.onResume&&t.onResume(m.attempt_id)}}
    >
      ↻ 이어하기
    </button>`},f=m=>{if(!(m.status==="failed"||m.status==="orphaned")||typeof m.cause!="string"||m.cause==="")return"";let R=m.cause_detail,j=R&&typeof R.reason=="string"&&R.reason.length>0?typeof R.command=="string"&&R.command.length>0?`${R.reason} \xB7 ${R.command}`:R.reason:m.cause;return c`<div class="detail-session__cause" title=${j}>
      ${m.cause}
    </div>`},h=m=>{let k=tp(la(m));if(Jt(k).length===0&&!Kr(m.usage))return"";let R=a.has(m.attempt_id);return c`<button
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
      세션 이력${Ib(n.total)}
    </div>
    <div class="detail-sessions" data-seam="session-history">
      ${l}${o.map(m=>{let k=la(m),R=tp(k),j=Jt(R);return c`<div class="detail-session-row">
          <button
            type="button"
            class="detail-session detail-session--${m.status||"unknown"}"
            data-attempt-id=${m.attempt_id}
            @click=${()=>t.onOpen&&t.onOpen(m.attempt_id)}
          >
            <span class="detail-session__glyph"
              >${Ub[m.status||""]||"\xB7"}</span
            >
            <span class="detail-session__id">${m.attempt_id}</span>
            ${yo(m)?c`<span
                  class="detail-session__resumed"
                  title=${yo(m)}
                  >↻</span
                >`:""}
            <span class="detail-session__meta">${wr(m)}</span>
            ${j.length>0?c`<span class="detail-session__role">orchestrator</span>`:""}
            ${m.session_id?c`<span class="detail-session__sid" title=${m.session_id}
                  >${String(m.session_id).slice(0,8)}</span
                >`:""}
            ${j.length>0?j.map(H=>c`<span
                      class="detail-session__usage"
                      title=${H.tooltip}
                      >${H.label}</span
                    >`):Kr(m.usage)?c`<span class="detail-session__usage"
                    >${Kr(m.usage)}</span
                  >`:""}
            <span class="detail-session__time">${Jo(m.started_at)}</span>
          </button>
          ${h(m)} ${d(m)} ${f(m)} ${Wb(m)}
          ${a.has(m.attempt_id)&&m.usage?Bb(m.usage,m.runner==="codex"?"codex":"claude"):""}
          ${jb(m,k,t)}
        </div>`})}
    </div>
  `}function op(e,t={}){return c`
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
          ${Gb(e)}
        </div>`:""}
  `}function Gb(e){let t=so(e);if(t)return t;let n=e.data;if(!n)return"";if(n.missing)return c`<div class="detail-prompt__missing">
        기록 없음 — 아직 이 이슈로 디스패치된 세션이 없습니다. 아래는 다음
        디스패치가 보낼 기본 과업입니다.
      </div>
      ${typeof n.default_task_prompt=="string"?Jn("\uC608\uC0C1 \uAE30\uBCF8 \uACFC\uC5C5",n.default_task_prompt):""}`;let r=wi(n.recorded_at);return c`<div class="detail-prompt__meta">
      ${n.attempt_id}${r?` \xB7 ${r}`:""}
    </div>
    ${typeof n.task_prompt=="string"?Jn("\uACFC\uC5C5 (user)",n.task_prompt):""}
    ${typeof n.system_prompt=="string"?Jn("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",n.system_prompt):""}`}var Cr=10;function sp(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),n=r=>String(r).padStart(2,"0");return`${n(t.getMonth()+1)}-${n(t.getDate())} ${n(t.getHours())}:${n(t.getMinutes())}`}function ip(e,t={}){let r=(Array.isArray(e?.events)?e.events:[]).filter(l=>l&&typeof l.summary=="string"&&l.summary.trim().length>0);if(r.length===0)return"";let o=typeof e.shown=="number"&&e.shown>0?e.shown:Cr,s=r.slice(0,o),i=r.length-s.length;return c`
    <div class="detail-section-label">Worker 이력 (${r.length})</div>
    <ol class="detail-timeline" data-seam="worker-timeline">
      ${s.map(l=>c`<li class="detail-timeline__row">
            ${sp(l.at)?c`<span class="detail-timeline__at"
                  >${sp(l.at)}</span
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
  `}var Kb=["open","in_progress","deferred","resolved","closed"],Yb=[0,1,2,3,4];function ap(e,t){let n=t.issueStores,r=t.onClose,o=t.transport,s=t.onNavigate,i=t.queueStore,l=t.execPresetStore,a=t.sessionLogStore,u=null,d=null,f={},h="",m=!1,k=[],R=!1,j={},H={claude:null,codex:null},ne=null,X=null,F=0,O=!1,I=!1,N="",B="",se="",q="",W=!1;function Z(){O=!1,I=!1,N="",B="",se="",q="",W=!1}function ee(){H={claude:null,codex:null},ne=null,X=null,F+=1}async function Se(){if(!o)return null;try{let w=await Promise.resolve(o("get-workspace-accounts",{}));return w&&typeof w.state=="string"?w:null}catch{return null}}async function he(w){try{let P=await fetch(w);if(!P.ok)return null;let G=await P.json();if(!G||typeof G!="object"||!Array.isArray(G.accounts))return null;let we=G.accounts.filter(rt=>rt!==null&&typeof rt=="object"&&!Array.isArray(rt));return{accounts:we,active:we.find(rt=>rt.active===!0)||null}}catch{return null}}async function ue(w){X=w;let P=++F,[G,we,rt]=await Promise.all([he("/api/claude-usage"),he("/api/codex-usage"),Se()]);P!==F||w!==u||(H={claude:G,codex:we},ne=rt,lt())}let D=[],ke=null,xe=null,S=!1,J="",Ee=!1,_e=0,Ae=new Set;function pe(){D=[],ke=null,xe=null,S=!1,J="",Ee=!1,_e+=1,Ae.clear()}async function Pe(w){if(!o)return;let P=++_e;try{let G=await Promise.resolve(o("get-comments",{id:w}));if(P!==_e||w!==u)return;D=Array.isArray(G)?G:[],S=!1}catch{if(P!==_e||w!==u)return;S=!0}lt()}function st(){if(!o||!u)return;let w=d&&typeof d.comment_count=="number"?d.comment_count:null;if(ke!==u){ke=u,xe=w,Pe(u);return}w!==null&&w!==xe&&(xe=w,Pe(u))}function Ve(w){Ae.has(w)?Ae.delete(w):Ae.add(w),lt()}function M(w){let P=J.trim().length===0;J=w,P!==(w.trim().length===0)&&lt()}async function re(){let w=J.trim();if(!o||!u||w.length===0||Ee)return;let P=u;Ee=!0,lt();let G=!1;try{let we=await Promise.resolve(o("add-comment",{id:P,text:w}));Array.isArray(we)&&we.length>0&&(G=!0,P===u&&(D=we,S=!1,J="",xe=we.length))}catch{G=!1}G||ye("\uB313\uAE00 \uCD94\uAC00 \uC2E4\uD328","error"),P===u&&(Ee=!1),lt()}let ae={onToggle:Ve,onDraftInput:M,onSubmit:re},fe=t.mdViewer||null,be=null;fe||(be=document.createElement("div"),be.className="md-viewer-root",document.body.appendChild(be));let le=fe||Si(be,{getWorkspacePath:t.getWorkspacePath||(()=>"")}),je=document.createElement("div");je.className="session-log-root",document.body.appendChild(je);let Ke=io(je,{transport:o?(w,P)=>Promise.resolve(o(w,P)):void 0,sessionLogStore:a}),Je=!1,De=!1,Q=!1,U=null,qe=null,dt=0;function tt(w){return`${t.getWorkspacePath&&t.getWorkspacePath()||""}::${w}`}function v(){Je=!1,De=!1,Q=!1,U=null,qe=null,dt+=1}async function z(w){if(!o)return;let P=++dt;De=!0,Q=!1,lt();try{let G=await Promise.resolve(o("get-bead-prompt",{bead_id:w}));if(P!==dt)return;!G||typeof G!="object"||Array.isArray(G)?Q=!0:(U=G,qe=tt(w))}catch{P===dt&&(Q=!0)}finally{P===dt&&(De=!1,lt())}}let Te=[],Re=null,Be=0;function Xe(w,P){return`${t.getWorkspacePath&&t.getWorkspacePath()||""}::${w}::${P}`}function ft(){Te=[],Re=null,Be+=1}async function kt(w,P){if(!o)return;let G=++Be,we;try{we=await Promise.resolve(o("get-session-refs",{bead_id:w}))}catch{we=null}G!==Be||P!==Re||(Te=we&&Array.isArray(we.sessions)?we.sessions:[],lt())}function It(){if(!o||!u)return;let w=d&&d.metadata,P=w&&typeof w=="object"&&typeof w.session_ref=="string"?w.session_ref:null;if(P===null){ft();return}let G=Xe(u,P);Re!==G&&(Te=[],Re=G,kt(u,G))}let $t=[],mt=[],Ue=Cr,L=null,te=0;function ve(w){return`${t.getWorkspacePath&&t.getWorkspacePath()||""}::${w}`}function E(){$t=[],mt=[],Ue=Cr,L=null,te+=1}async function K(w,P){if(!o)return;let G=++te,we;try{we=await Promise.resolve(o("get-bead-timeline",{bead_id:w}))}catch{we=null}G!==te||P!==L||($t=we&&Array.isArray(we.events)?we.events:[],mt=we&&Array.isArray(we.attempts)?we.attempts:[],Ue=Cr,lt())}function Ie(){if(!o||!u)return;let w=ve(u);L!==w&&($t=[],mt=[],Ue=Cr,L=w,K(u,w))}function We(){Ue+=Cr,lt()}function Ne(){if(Je=!Je,Je&&u&&qe!==tt(u)){U=null,z(u);return}lt()}function nt(){let w={};for(let G of mt)G&&typeof G=="object"&&G.bead_id===u&&(w[String(G.attempt_id)]=G);let P=i?i.get():null;for(let G of P&&P.attempts?Object.values(P.attempts):[]){let we=G;we&&we.bead_id===u&&(w[String(we.attempt_id)]=we)}return w}function Le(){return u?Object.values(nt()).sort((P,G)=>(G.started_at||0)-(P.started_at||0)).map(P=>({attempt_id:P.attempt_id,bead_id:P.bead_id,status:P.status,started_at:typeof P.started_at=="number"?P.started_at:null,runner:P.runner||null,model:P.model||null,effort:P.effort||P.observed_effort||null,speed:P.speed||null,session_id:P.session_id||null,resumed_from:P.resumed_from||null,continuation_mode:P.continuation_mode||null,dismissed_at:typeof P.dismissed_at=="number"?P.dismissed_at:null,cause:typeof P.cause=="string"?P.cause:null,cause_detail:P.cause_detail||null,exec_default_preset_id:typeof P.exec_default_preset_id=="string"?P.exec_default_preset_id:null,exec_default_preset_revision:typeof P.exec_default_preset_revision=="number"?P.exec_default_preset_revision:null,exec_values:P.exec_values&&typeof P.exec_values=="object"?P.exec_values:null,usage:P.usage||null,usage_legs:Array.isArray(P.usage_legs)?P.usage_legs:[],delegation_sessions:Array.isArray(P.delegation_sessions)?P.delegation_sessions:[]})):[]}function Ge(){return u?Gn(nt(),u):null}let et=new Set;function yt(w){et.has(w)?et.delete(w):et.add(w),lt()}function He(w){let P=i?i.get():null,G=P&&P.attempts?P.attempts[w]:null;Ke.open({attempt_id:w,meta:G?{runner:G.runner||void 0,model:G.model||void 0,effort:G.effort||void 0,status:G.status||void 0,session_id:G.session_id||void 0}:{}})}function At(w,P){let G=i?i.get():null,we=G&&G.attempts?G.attempts[w]:null,ot=(we&&Array.isArray(we.delegation_sessions)?we.delegation_sessions:[]).find(ht=>ht&&typeof ht=="object"&&ht.launch_id===P);ot&&Ke.open({attempt_id:w,launch_id:P,meta:{runner:ot.provider==="claude"?"claude":"codex",role:ot.role,...typeof ot.agent_type=="string"?{agent_type:ot.agent_type}:{},model:ot.model,effort:ot.effort,session_id:ot.session_id,status:ot.status}})}async function qt(w){if(!o||!w)return;let P=await zr();if(P===null)return;let G=()=>{let ht=i?i.get():null;return ht&&typeof ht.revision=="number"?ht.revision:0},we=async(ht={},Ze=G())=>await o("worker-attempt-resume",{attempt_id:w,expected_revision:Ze,...P!==""?{instructions:P}:{},...ht}),rt=ht=>{ht?.queue&&i?.set&&i.set(ht.queue)},ot=await we();if(rt(ot),ot&&ot.conflict){let ht=ot.queue&&typeof ot.queue.revision=="number"?ot.queue.revision:G();ot=await we({},ht),rt(ot)}ot=await zn(ot,(ht,Ze)=>we({continuation:ht,decision_token:Ze}),{onResult:rt,refresh:()=>we()}),ot&&ot.resumed===!1&&!ot.conflict&&ot.reason&&ye(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${ot.reason}`,"error",2400)}function ut(w){!w||!u||Ke.open(Hr(w,u,d&&d.status))}let Vt={onOpen:He,onOpenDelegation:At,onResume:qt,onToggleUsage:yt,onOpenSessionRef:ut,onCopyResumeCommand:p};function Et(){let w=i?i.get():null,P={...j};for(let G of["orchestration_model","orchestration_effort","orchestration_speed"]){let we=w&&w[G];typeof we=="string"&&(P[G]=we)}return P}async function Mt(){if(o){try{let w=await Promise.resolve(o("get-session-defaults",{}));j=w&&w.values&&typeof w.values=="object"?w.values:{}}catch{j={}}lt()}}function Wt(){let w=i?i.get():null;return w&&w.runner_catalog||null}function Xt(){let w=i?i.get():null;return w&&typeof w.execution_defaults=="object"?w.execution_defaults:null}function tn(){let w=d?.metadata&&typeof d.metadata=="object"?d.metadata:{},G=mn({pin:{...w,...f},global:Et(),execution_defaults:Xt(),runner_catalog:Wt(),route:typeof w.route=="string"?w.route:null}).orchestration_model.value||"";return xn(Wt(),G)}function zt(){let w=l?l.get():null;return!w||typeof w.revision!="number"?null:{revision:w.revision,presets:Array.isArray(w.presets)?w.presets:[]}}function Ft(w){return w?.compatible===!1}function un(w){l&&w&&typeof w.revision=="number"&&Array.isArray(w.presets)&&l.set({revision:w.revision,presets:w.presets})}async function Pt(){let w=zt(),P=w?.presets.find(G=>G.id===h);if(!(!o||!u||!w||!P||Ft(P)||m)){m=!0,k=[],lt();try{let G=await Promise.resolve(o("apply-impl-preset",nu(u,P.id,w.revision)));if(G&&G.conflict){un(G),ye("\uD504\uB9AC\uC14B\uC774 \uBCC0\uACBD\uB410\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uBAA9\uB85D\uC5D0\uC11C \uB2E4\uC2DC \uC801\uC6A9\uD558\uC138\uC694.","error",4e3);return}let we=G&&Array.isArray(G.issue)?G.issue[0]:G?.issue;if(G&&G.applied&&we&&typeof we=="object"){d=we,k=Array.isArray(G.skipped_orchestration_keys)?G.skipped_orchestration_keys.filter(rt=>typeof rt=="string"):[];for(let rt of ru)delete f[rt];ye(k.length>0?"\uC2E4\uD589 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4. \uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 3\uD0A4\uB294 Bead\uC5D0 \uD540\uD560 \uC218 \uC5C6\uC5B4 \uAC74\uB108\uB6F0\uC5C8\uC2B5\uB2C8\uB2E4.":"\uC2E4\uD589 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4.","success",4e3);return}G&&G.error==="bd_readback_failed"?ye("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):ye("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}catch(G){G&&typeof G=="object"&&G.code==="bd_readback_failed"?ye("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):ye("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}finally{m=!1,lt()}}}let Kt=null;n&&n.subscribe&&(Kt=n.subscribe(()=>b()));let jt=null;i&&typeof i.subscribe=="function"&&(jt=i.subscribe(()=>{u&&lt()}));let Qt=null,de=null;function T(){de&&(de(),de=null)}l&&typeof l.subscribe=="function"&&(Qt=l.subscribe(()=>{u&&lt()}));function me(w){w.key==="Escape"&&u&&(w.preventDefault(),r())}document.addEventListener("keydown",me);let ce=Yr(()=>lt());ce.attach();function b(){if(u){if(n&&typeof n.snapshotFor=="function"){let w=n.snapshotFor("detail:"+u)||[];d=w.find(G=>G&&G.id===u)||w[0]||d}st(),It(),Ie(),lt()}}function p(w){on(w).then(P=>{P?ye("\uBCF5\uC0AC\uB428","success",1200):ye("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function _(w){w.preventDefault(),w.stopPropagation(),u&&p(u)}function A(w,P){w.preventDefault(),w.stopPropagation(),p(P)}function Y(w,P,G){w.preventDefault(),w.stopPropagation(),le.open(P,{missing_state:G})}async function V(w,P){let G=Object.hasOwn(f,w),we=f[w];if(f[w]=P,lt(),!(!o||!u))try{let rt=await Promise.resolve(o("update-exec-settings",tu(u,w,P.length===0?null:P))),ot=Array.isArray(rt)?rt[0]:rt;if(!ot||typeof ot!="object"||!ot.id)throw new Error("exec settings readback failed");d=ot,delete f[w],lt()}catch(rt){throw G?f[w]=we:delete f[w],lt(),ye("\uC2E4\uD589 \uC124\uC815 \uBCC0\uACBD \uC2E4\uD328","error"),rt}}function oe(w){w.catch(()=>{})}async function $e(w,P){let G=d||{},we=G.metadata&&typeof G.metadata=="object"?G.metadata:{},rt={};for(let Ze of["impl_runtime","impl_model","impl_effort"])rt[Ze]=Object.hasOwn(f,Ze)?f[Ze]:typeof we[Ze]=="string"?we[Ze]:"";rt[w]=P;let ot=iu(rt,Wt(),tn()),ht={};for(let Ze of["impl_runtime","impl_model","impl_effort"])ht[Ze]=f[Ze],f[Ze]=ot[Ze]||"";if(lt(),!(!o||!u))return Promise.resolve(o("update-impl-target",{id:u,...ot,orchestration_runtime:tn()})).then(Ze=>{let pt=Array.isArray(Ze)?Ze[0]:Ze;if(!pt||typeof pt!="object"||!pt.id)throw new Error("implementation target readback failed");d=pt;for(let kn of["impl_runtime","impl_model","impl_effort"])delete f[kn];lt()}).catch(Ze=>{for(let pt of["impl_runtime","impl_model","impl_effort"])ht[pt]===void 0?delete f[pt]:f[pt]=ht[pt];throw lt(),ye("\uAD6C\uD604 target \uBCC0\uACBD \uC2E4\uD328","error"),Ze})}async function Qe(w,P,G){if(!o||!u)return!1;try{let we=await Promise.resolve(o(w,P)),rt=Array.isArray(we)?we[0]:we;return rt&&typeof rt=="object"&&rt.id?(d=rt,!0):(ye(G,"error"),!1)}catch(we){return we&&typeof we=="object"&&we.code==="bd_readback_failed"?(ye("\uC800\uC7A5\uB410\uC73C\uB098 \uD655\uC778 \uC2E4\uD328 \u2014 \uACE7 \uAC31\uC2E0\uB429\uB2C8\uB2E4","error"),{ok:!1,saved:!0}):(ye(G,"error"),!1)}}function at(w){setTimeout(()=>{try{let P=e.querySelector(w);P&&typeof P.focus=="function"&&P.focus()}catch{}},0)}function vt(){O=!0,N=d&&d.title||"",lt(),at('.detail-edit__input[data-edit="title"]')}function gt(w){N=w.target.value}function $(){O=!1,N="",lt()}function x(){Qe("edit-text",{id:u,field:"title",value:N},"\uC81C\uBAA9 \uC800\uC7A5 \uC2E4\uD328").then(P=>{P===!0&&(O=!1,N=""),lt()})}function Oe(){I=!0,B=d&&d.description||"",lt(),at('.detail-edit__textarea[data-edit="description"]')}function Fe(w){B=w.target.value}function g(){I=!1,B="",lt()}function y(){Qe("edit-text",{id:u,field:"description",value:B},"\uC124\uBA85 \uC800\uC7A5 \uC2E4\uD328").then(P=>{P===!0&&(I=!1,B=""),lt()})}function C(w,P,G,we){if(w.key==="Escape"){w.stopPropagation(),G();return}w.key==="Enter"&&(!we||w.ctrlKey||w.metaKey)&&(w.preventDefault(),P())}function ie(w){let P=w.target.value;Qe("update-status",{id:u,status:P},"\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328").then(()=>lt())}function ge(w){let P=Number(w.target.value);Qe("update-priority",{id:u,priority:P},"\uC6B0\uC120\uC21C\uC704 \uBCC0\uACBD \uC2E4\uD328").then(()=>lt())}function Ce(w){se=w.target.value}function Ye(){let w=se.trim();w.length!==0&&Qe("label-add",{id:u,label:w},"\uB77C\uBCA8 \uCD94\uAC00 \uC2E4\uD328").then(P=>{P===!0&&(se=""),lt()})}function xt(w){if(w.key==="Escape"){w.stopPropagation(),se="",lt();return}w.key==="Enter"&&(w.preventDefault(),Ye())}function Bt(w){Qe("label-remove",{id:u,label:w},"\uB77C\uBCA8 \uC81C\uAC70 \uC2E4\uD328").then(()=>lt())}let Zt={onCopyPath:A,onOpenDoc:Y};function dn(w){return typeof w=="string"?w:w&&typeof w=="object"?String(w.id||w.to||w.issue_id||w.depends_on||""):""}function qn(w){return w&&typeof w=="object"?String(w.dependency_type||w.type||""):""}function On(w){switch(w){case"discovered-from":return{glyph:"\u21A9 ",relation:"\uBC1C\uACAC"};case"parent-child":return{glyph:"\u2338 ",relation:"\uC0C1\uC704"};case"related":return{glyph:"\u2194 ",relation:"\uAD00\uB828"};default:return w.length>0?{glyph:`${w} `,relation:w}:{glyph:"",relation:""}}}function wn(w,P){let G=Fn(P),we=[];return w.length>0&&we.push(w),G&&we.push(G),we.length>0?we.join(`
`):void 0}function Fn(w){if(!w||typeof w!="object")return;let P=typeof w.status=="string"?w.status:"",G=typeof w.title=="string"?w.title:"";return P.length>0&&G.length>0?`${P} \xB7 ${G}`:void 0}function Yt(){return(t.getWorkspacePath&&t.getWorkspacePath()||"").trim()}function er(){return t.depCandidates?t.depCandidates():null}async function Ln(w,P,G){let we=Yt(),rt=u;if(!rt)return;if(we.length===0){ye("\uB808\uD3EC\uB97C \uC54C \uC218 \uC5C6\uC5B4 \uC758\uC874\uC744 \uBC14\uAFC0 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error");return}let ot=await Qe(w,{a:rt,b:P,view_id:rt,root_dir:we},G),ht=ot===!0||ot!==!1&&ot.saved===!0;ht&&t.onDepChanged&&t.onDepChanged({type:w,a:rt,b:P}),w==="dep-add"&&ht&&(q="",W=!1),lt()}function tr(w){if(!u)return;let P=globalThis.confirm;typeof P=="function"&&!P(`${w}\uAC00 ${u}\uB97C \uB9C9\uB294 \uC5F0\uACB0\uC744 \uB04A\uC744\uAE4C\uC694?`)||Ln("dep-remove",w,"\uC758\uC874 \uD574\uC81C \uC2E4\uD328")}function In(w){w.disabled||Ln("dep-add",w.bead_id,"\uC758\uC874 \uCD94\uAC00 \uC2E4\uD328")}function jn(w){q=w.target.value,W=!0,lt()}function fr(){W||(W=!0,lt())}function ze(w,P){if(w.key==="Escape"){w.stopPropagation(),q="",W=!1,lt();return}w.key==="Enter"&&(w.preventDefault(),P.length===1&&!P[0].disabled&&In(P[0]))}function Dt(w){return c`<div class="detail-dep-add">
      <input
        class="detail-dep-add__input"
        aria-label="막는 이슈 추가"
        placeholder="막는 이슈 추가"
        .value=${q}
        @focus=${fr}
        @input=${jn}
        @keydown=${P=>ze(P,w)}
      />
      ${W||q.length>0?c`<div class="detail-dep-add__list">
            ${w.length===0?c`<div class="detail-dep-add__empty">후보 없음</div>`:w.map(P=>c`<button
                      type="button"
                      class="detail-dep-add__cand"
                      data-dep-cand=${P.bead_id}
                      ?disabled=${P.disabled}
                      title=${nn(P.reason)}
                      @click=${()=>In(P)}
                    >
                      <span class="detail-dep-add__repo"
                        >${P.workspace_name}</span
                      >
                      <span class="detail-dep-add__id"
                        >${P.bead_id}</span
                      >
                      <span class="detail-dep-add__title"
                        >${P.title}</span
                      >
                    </button>`)}
          </div>`:""}
    </div>`}function bn(w,P){let G=P.get(w.id),we=s?c`<button
          type="button"
          class="detail-dep__link"
          title=${nn(w.title)}
          @click=${()=>G===void 0?s(w.id):s(w.id,G)}
        >
          ${w.label}
        </button>`:c`<span class="detail-dep__link" title=${nn(w.title)}
          >${w.label}</span
        >`;return c`<span
      class=${`detail-dep detail-dep--${w.kind}${s?" detail-dep--link":""}`}
      >${we}${w.kind==="pred"?c`<button
            type="button"
            class="detail-dep__unlink"
            data-dep-b=${w.id}
            aria-label=${"\uC758\uC874 \uD574\uC81C: "+w.id}
            @click=${()=>tr(w.id)}
          >
            ✕
          </button>`:""}</span
    >`}function lo(w){let P=Array.isArray(w.dependencies)?w.dependencies:[],G=Array.isArray(w.dependents)?w.dependents:[],we=[];for(let Ze of P){let pt=dn(Ze);pt.length>0&&qn(Ze)==="blocks"&&we.push({id:pt,label:`\u26D3 ${pt}`,kind:"pred",title:wn("\uB9C9\uB294",Ze)})}for(let Ze of G){let pt=dn(Ze);pt.length>0&&qn(Ze)==="blocks"&&we.push({id:pt,label:`\u2192 ${pt}`,kind:"succ",title:wn("\uB9C9\uD788\uB294",Ze)})}for(let Ze of P){let pt=dn(Ze),kn=qn(Ze);if(pt.length>0&&kn!=="blocks"){let Tl=On(kn);we.push({id:pt,label:`${Tl.glyph}${pt}`,kind:"other",title:wn(Tl.relation,Ze)})}}let rt=er(),ot=new Map;if(rt)for(let Ze of rt.issues)ot.has(Ze.bead_id)||ot.set(Ze.bead_id,Ze.root_dir);let ht=rt&&u?nd(td(u,rt),q):[];return c`
      <div class="detail-section-label">의존성</div>
      ${we.length===0?c`<div class="detail-empty">의존성 없음</div>`:c`<div class="detail-deps">
            ${we.map(Ze=>bn(Ze,ot))}
          </div>`}
      ${rt===null?c`<div class="detail-empty">후보를 불러올 수 없음</div>`:Dt(ht)}
    `}function os(w){let P=w.metadata||{},G=w.workflow||{},we=G.stages||{},rt=we.spec&&we.spec.stale,ot=we.impl&&we.impl.stale,ht=G.quick_fix_review?.state==="stale",Ze=we.plan||null,pt=G.route_source==="derived",kn=G.route||P.route||"\u2014";return c`
      <div class="detail-section-label">워크플로우</div>
      <div class="detail-kv">
        <span class="detail-kv__k">route</span>
        <span
          class="detail-kv__v${pt?" detail-kv__v--derived":""}"
          title=${pt?"route \uBBF8\uD540 (metadata unset)":"route"}
          >${pt?"unset":kn}</span
        >
      </div>
      ${G.route!=="quick_fix"||Object.hasOwn(P,"spec_review")?c`<div class="detail-kv">
            <span class="detail-kv__k">spec_review</span>
            <span class="detail-kv__v"
              >${P.spec_review||"\uC5C6\uC74C"}${rt?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${G.route==="full_plan"?c`<div class="detail-kv">
              <span class="detail-kv__k">plan_review</span>
              <span class="detail-kv__v">${Ze?.receipt||"\uC5C6\uC74C"}</span>
            </div>
            <div class="detail-kv">
              <span class="detail-kv__k">plan_approval</span>
              <span class="detail-kv__v"
                >${Ze?.approval_receipt||"\uC5C6\uC74C"}${Ze?.approval_state==="stale"?" \xB7 stale":Ze?.approval_state==="unknown"?" \xB7 unknown":""}</span
              >
            </div>`:""}
      ${G.route!=="quick_fix"||Object.hasOwn(P,"impl_review")?c`<div class="detail-kv">
            <span class="detail-kv__k">impl_review</span>
            <span class="detail-kv__v"
              >${P.impl_review||"\uC5C6\uC74C"}${ot?" \xB7 stale":""}</span
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
      ${G.route==="quick_fix"||Object.hasOwn(P,"quick_fix_review")?c`<div class="detail-kv">
            <span class="detail-kv__k">quick_fix_review</span>
            <span class="detail-kv__v"
              >${P.quick_fix_review||"\uC5C6\uC74C"}${ht?" \xB7 stale":""}</span
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
      ${P.pr_url?c`<div class="detail-kv">
            <span class="detail-kv__k">pr_url</span>
            <span class="detail-kv__v detail-kv__v--wrap">${P.pr_url}</span>
          </div>`:""}
    `}let ss={route:["quick_fix","spec_backed","full_plan"]};async function co(w,P){let G=P.target.value;if(w==="route"&&d&&d.metadata&&d.metadata.route==="full_plan"&&G!=="full_plan"&&!window.confirm(`full_plan \u2192 ${G||"(\uBBF8\uC124\uC815)"} \uC804\uD658: \uC800\uC7A5\uB41C plan \uC2B9\uC778\uC740 \uD3EC\uAE30\uB418\uBA70, plan \uD30C\uC77C\xB7\uB9C8\uCEE4 \uC815\uB9AC\uB294 \uC138\uC158 \uACC4\uC57D\uC774 \uC218\uD589\uD569\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`)){lt();return}await Qe("update-workflow-meta",{id:u,key:w,value:G},"\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uBA54\uD0C0 \uBCC0\uACBD \uC2E4\uD328"),lt()}function is(w){let P=w.metadata||{};return c` ${((we,rt)=>{let ot=ss[we],ht=typeof P[we]=="string"?P[we]:"";return c`<div class="detail-kv">
        <span class="detail-kv__k">${we}</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label=${we}
          data-edit=${`wfmeta-${we}`}
          @change=${Ze=>co(we,Ze)}
        >
          <option value="" ?selected=${!ot.includes(ht)}>
            ${rt}
          </option>
          ${ot.map(Ze=>c`<option value=${Ze} ?selected=${ht===Ze}>${Ze}</option>`)}
        </select>
      </div>`})("route","(unset)")} `}function Me(w,P){return O?c`
        <div class="detail-edit">
          <input
            class="detail-edit__input"
            data-edit="title"
            aria-label="제목 편집"
            .value=${N}
            @input=${gt}
            @keydown=${G=>C(G,x,$,!1)}
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
        ${Jt(P).map(G=>c`<span class="detail-usage-total" title=${G.tooltip}
              >${G.label}</span
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
    `}function Tt(w){let P=Gt(w.created_at),G=Gt(w.updated_at);return!P&&!G?c``:c`
      ${P?c`<div class="detail-kv">
            <span class="detail-kv__k">생성</span>
            <span class="detail-kv__v detail-kv__v--time">${P}</span>
          </div>`:""}
      ${G?c`<div class="detail-kv">
            <span class="detail-kv__k">수정</span>
            <span class="detail-kv__v detail-kv__v--time">${G}</span>
          </div>`:""}
    `}function Ht(w,P){return c`
      <div class="detail-section-label">속성 (수정 가능)</div>
      <div class="detail-kv">
        <span class="detail-kv__k">status</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label="status"
          data-edit="status"
          @change=${ie}
        >
          ${Kb.map(G=>c`<option value=${G} ?selected=${G===w}>${G}</option>`)}
        </select>
      </div>
      <div class="detail-kv">
        <span class="detail-kv__k">priority</span>
        <select
          class="detail-kv__v"
          aria-label="priority"
          data-edit="priority"
          @change=${ge}
        >
          ${Yb.map(G=>c`<option value=${String(G)} ?selected=${G===P}>
                P${G}
              </option>`)}
        </select>
      </div>
    `}function Hf(w){return c`
      <div class="detail-title-row">
        <div class="detail-overlay__section-label">설명</div>
        ${I?"":c`<button
              type="button"
              class="detail-edit-btn"
              data-edit="description"
              aria-label="설명 편집"
              @click=${Oe}
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
              @input=${Fe}
              @keydown=${P=>C(P,y,g,!0)}
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
                @click=${g}
              >
                취소
              </button>
            </div>
          </div>`:c`<div class="detail-overlay__desc">
            ${w||"(\uC124\uBA85 \uC5C6\uC74C)"}
          </div>`}
    `}function Gf(w){let P=typeof w.notes=="string"?w.notes:"";return P.trim().length===0?c``:c`
      <div class="detail-overlay__section-label">노트</div>
      <div class="detail-overlay__notes">${P}</div>
    `}function Kf(w){let P=Array.isArray(w.labels)?w.labels:[];return c`
      <div class="detail-section-label">라벨</div>
      <div class="detail-labels">
        ${P.map(G=>c`<span class="detail-label-chip"
              >${G}<button
                type="button"
                class="detail-label-chip__x"
                data-label=${G}
                aria-label=${"\uB77C\uBCA8 \uC81C\uAC70: "+G}
                @click=${()=>Bt(G)}
              >
                ×
              </button></span
            >`)}
        <span class="detail-label-add">
          <input
            class="detail-label-add__input"
            aria-label="라벨 추가"
            placeholder="라벨 추가"
            .value=${se}
            @input=${Ce}
            @keydown=${xt}
          />
          <button
            type="button"
            class="detail-label-add__btn"
            @click=${Ye}
          >
            추가
          </button>
        </span>
      </div>
    `}function Yf(){if(!u)return c``;let w=d||{},P=String(w.id||u),G=w.title||"(\uC81C\uBAA9 \uC5C6\uC74C)",we=Ge(),rt=w.status||"open",ot=typeof w.priority=="number"?Math.max(0,Math.min(4,w.priority)):"",ht=w.description||"",Ze={...w,metadata:{...w.metadata||{},...f}};return c`
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
              ${P}
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
          ${Me(G,we)}
          ${Kd(Ze,{onChipToggle:pt=>ce.toggle({bead_id:P,chip_key:pt}),isChipOpen:pt=>ce.isOpen({bead_id:P,chip_key:pt})})}
          ${Gd({metadata:Ze.metadata,workspace_values:Et(),catalog:Wt(),execution_defaults:Xt(),expanded:R,presets:zt()?.presets||[],preset_id:h,preset_busy:m,skipped_orchestration_keys:k},{onToggle:pt=>{R=pt,lt()},onEdit:(pt,kn)=>{if(pt==="impl_runtime"||pt==="impl_model"||pt==="impl_effort"){oe($e(pt,kn??""));return}oe(V(pt,kn??""))},onPresetSelect:pt=>{h=pt,k=[],lt()},onPresetApply:()=>{Pt()}})}
          ${Jd({md:Ze.metadata,catalog:H,workspace_defaults:ne,handlers:{onExecChange:(pt,kn)=>oe(V(pt,kn))}})}
          ${Ht(rt,ot)} ${Tt(w)}
          ${Hf(ht)}
          ${Ud(D,ae,{expanded:Ae,draft:J,sending:Ee,error:S})}
          ${Gf(w)} ${Kf(w)} ${lo(w)}
          ${os(w)} ${is(w)}
          ${Fd(w,Zt)}
          ${op({expanded:Je,loading:De,error:Q,data:U},{onToggle:Ne})}
          ${rp(Le(),Vt,{total:we,expanded:et},Te)}
          ${ip({events:$t,shown:Ue},{onMore:We})}
        </div>
      </div>
    `}function lt(){it(Yf(),e)}return{load(w){w!==u&&(f={},h="",k=[],R=!1,Z(),pe(),v(),ft(),E(),ee()),u=w,d=null,!de&&t.subscribeCandidates&&(de=t.subscribeCandidates(()=>{u&&lt()})),b(),Mt(),X!==w&&ue(w)},clear(){u=null,d=null,f={},h="",m=!1,k=[],R=!1,Z(),pe(),v(),ft(),E(),ee(),T(),le.close(),Ke.close(),it(c``,e)},destroy(){Kt&&(Kt(),Kt=null),jt&&(jt(),jt=null),Qt&&(Qt(),Qt=null),T(),document.removeEventListener("keydown",me),ce.detach(),fe||(le.destroy(),be&&be.parentNode&&be.parentNode.removeChild(be)),Ke.destroy(),je.parentNode&&je.parentNode.removeChild(je),u=null,d=null,ee(),h="",m=!1,k=[],pe(),v(),ft(),E(),it(c``,e)}}}function lp(e){let t=document.createElement("dialog");t.id="fatal-error-dialog",t.setAttribute("role","alertdialog"),t.setAttribute("aria-modal","true"),t.innerHTML=`
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
    </div>`,e.appendChild(t);let n=t.querySelector("#fatal-error-title"),r=t.querySelector("#fatal-error-message"),o=t.querySelector("#fatal-error-detail"),s=t.querySelector("#fatal-error-reload"),i=t.querySelector("#fatal-error-close"),l=()=>{if(typeof t.close=="function")try{t.close()}catch{}t.removeAttribute("open")},a=(u,d,f="")=>{n&&(n.textContent=u||"Unexpected Error"),r&&(r.textContent=d||"An unrecoverable error occurred.");let h=typeof f=="string"?f.trim():"";if(o&&(h.length>0?(o.textContent=h,o.removeAttribute("hidden")):(o.textContent="No additional diagnostics available.",o.setAttribute("hidden",""))),typeof t.showModal=="function")try{t.showModal(),t.setAttribute("open","")}catch{t.setAttribute("open","")}else t.setAttribute("open","")};return s&&s.addEventListener("click",()=>{window.location.reload()}),i&&i.addEventListener("click",()=>l()),t.addEventListener("cancel",u=>{u.preventDefault(),l()}),{open:a,close:l,getElement(){return t}}}var Vb="(max-width: 640px)";function Ti(e){if(typeof window.matchMedia!="function")return e(!1),()=>{};let t=window.matchMedia(Vb),n=!!t.matches;e(n);let r=o=>{let i=!!(typeof o=="object"&&o!==null&&typeof o.matches=="boolean"?o.matches:t.matches);i!==n&&(n=i,e(i))};return typeof t.addEventListener=="function"?(t.addEventListener("change",r),()=>{t.removeEventListener("change",r)}):typeof t.addListener=="function"?(t.addListener(r),()=>{typeof t.removeListener=="function"&&t.removeListener(r)}):()=>{}}function Xb(){return{lanes:{done:!0},areas:{}}}function es(e){let t={};if(typeof e!="object"||e===null)return t;for(let[n,r]of Object.entries(e))typeof r=="boolean"&&(t[n]=r);return t}function Qb(e){try{let t=window.localStorage.getItem(e);if(!t)return null;let n=JSON.parse(t);if(typeof n!="object"||n===null)return null;let r=n;return typeof r.lanes=="object"&&r.lanes!==null?{lanes:es(r.lanes),areas:es(r.areas)}:{lanes:es(r),areas:{}}}catch{return null}}function cp(e,t){try{window.localStorage.setItem(e,JSON.stringify(t))}catch{}}function Ci(e,t=Xb()){let n={lanes:es(t.lanes),areas:es(t.areas)},r=Qb(e),o={lanes:{...n.lanes,...r?r.lanes:{}},areas:{...n.areas,...r?r.areas:{}}};return{isCollapsed(s){return o.lanes[s]===!0},isAreaCollapsed(s){return o.areas[s]===!0},toggle(s){let i=o.lanes[s]!==!0;return o={...o,lanes:{...o.lanes,[s]:i}},cp(e,o),i},toggleArea(s){let i=o.areas[s]!==!0;return o={...o,areas:{...o.areas,[s]:i}},cp(e,o),i}}}function ml(e){if(typeof e=="string"&&e.length>0)return e;if(e&&typeof e=="object"){let t=e;if(typeof t.message=="string"&&t.message.length>0)return t.message;if(typeof t.error=="string"&&t.error.length>0)return t.error;if(t.error&&typeof t.error=="object"&&typeof t.error.message=="string")return t.error.message}return"\uC694\uCCAD\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4"}function Ri(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"&&t.length>0):[]}function Oi(e){let{transport:t,console_el:n,getLanes:r,getWorkspaces:o,getCrossLanes:s,reproject:i,onCorrection:l,showToast:a,requestRender:u,adoptQueue:d,onDragBegin:f,candidate_drop:h}=e,m=[],k=null,R=!1,j=null,H=null,ne=null;function X(){j!==null&&clearTimeout(j),j=setTimeout(()=>{j=null,R=!1},0)}function F(){return s()??null}function O(){let M=new Map,re=o();for(let ae of Array.isArray(re)?re:[]){if(!ae||typeof ae!="object")continue;let fe=ae.bead_blocked_by&&typeof ae.bead_blocked_by=="object"?ae.bead_blocked_by:{};for(let[be,le]of Object.entries(fe))Array.isArray(le)&&M.set(be,Ri(le));for(let be of[...Array.isArray(ae.runnable)?ae.runnable:[],...Array.isArray(ae.session_active)?ae.session_active:[]])be&&typeof be.bead_id=="string"&&Array.isArray(be.blocked_by)&&be.blocked_by.length>0&&M.set(be.bead_id,Ri(be.blocked_by))}return M}function I(){let M=new Map,re=new Map,ae=o();for(let fe of Array.isArray(ae)?ae:[]){if(!fe||typeof fe!="object")continue;let be=fe.bead_blocked_by&&typeof fe.bead_blocked_by=="object"?fe.bead_blocked_by:{};for(let[le,je]of Object.entries(be))Array.isArray(je)&&M.set(le,Ri(je));for(let le of Array.isArray(fe.runnable)?fe.runnable:[])le&&typeof le.bead_id=="string"&&Array.isArray(le.blocked_by)&&re.set(le.bead_id,Ri(le.blocked_by))}for(let fe of m)for(let be of[M,re]){let le=be.get(fe.a);le!==void 0&&be.set(fe.a,fe.type==="dep-remove"?le.filter(je=>je!==fe.b):le.includes(fe.b)?le:[...le,fe.b])}return{snapshot:M,runnable:re}}function N(){let M=O();for(let re of m){let ae=(M.get(re.a)||[]).slice();re.type==="dep-remove"?M.set(re.a,ae.filter(fe=>fe!==re.b)):ae.includes(re.b)||M.set(re.a,[...ae,re.b])}return M}function B(M=r(),re=F()){let ae=new Map;for(let De of Array.isArray(re?.lanes)?re.lanes:[]){let Q=new Map;for(let U of Array.isArray(De?.entries)?De.entries:[])U&&typeof U.bead_id=="string"&&Q.set(U.bead_id,U.dep_created_by_lane===!0);ae.set(typeof De?.id=="string"?De.id:"",Q)}let fe=new Map,be=new Map,le=new Set,je=new Set;for(let De of M.chain_lanes){let Q=ae.get(De.lane_id);fe.set(De.lane_id,{status:De.status,entries:De.rows.map((U,qe)=>({bead_id:U.id,root_dir:U.root_dir,...qe===0?{}:{dep_created_by_lane:Q?.get(U.id)===!0}}))});for(let U of De.rows)be.set(U.id,De.lane_id),U.fixed&&le.add(U.id),U.unplaced||je.add(U.id)}let Ke=new Map;for(let De of M.parallel_rows)typeof De.queue_index=="number"&&Ke.set(De.id,De.queue_index);for(let De of M.queue_groups)for(let Q of De.sublanes.serial)for(let U of Q.items)typeof U.queue_index=="number"&&Ke.set(U.id,U.queue_index);let Je=I();return{blocked_by_map:N(),snapshot_blocked_by:Je.snapshot,runnable_blocked_by:Je.runnable,owner_of:new Map(Object.entries(M.owner_of)),cross_lanes:fe,owner_lane_of:be,fixed_members:le,placed_members:je,parallel_rows:M.parallel_rows.map(De=>({bead_id:De.id,root_dir:De.root_dir,queue_index:De.queue_index??0})),parallel_raw_length:new Map(Object.entries(M.parallel_raw_length)),queue_index_of:Ke}}function se(M,re){let ae=r();for(let be of[...ae.runnable,...ae.queue,...ae.running,...ae.pr_wait,...ae.done])if(!(be.non_occupying||be.id!==re)){if(be.root_dir===M)return be.expected_revision;break}let fe=ae.queue_groups.find(be=>be.root_dir===M);return fe?fe.revision:0}async function q(M,re,ae,fe){if(!t)return null;let le=await t(M,{...re,...ae?{root_dir:ae}:{},expected_revision:fe});if(le&&le.conflict){le.queue&&d?.(ae,le.queue);let je=le.queue&&typeof le.queue.revision=="number"?le.queue.revision:fe;le=await t(M,{...re,...ae?{root_dir:ae}:{},expected_revision:je})}return le&&le.queue&&d?.(ae,le.queue),le}async function W(M,re,ae,fe,be){try{let le=await q(M,re,ae,fe.get(ae)??se(ae,be.bead_id));return!le||typeof le.applied!="boolean"?(a("\uD050 \uC694\uCCAD\uC774 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error"),null):(le.queue&&typeof le.queue.revision=="number"&&fe.set(ae,le.queue.revision),le.conflict?(a("\uD050\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD574 \uC8FC\uC138\uC694","error"),null):le.applied===!1?(a(le.admission_reason?`\uD050 \uC801\uC7AC \uAC70\uBD80: ${le.admission_reason}`:"\uD050 \uC694\uCCAD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4","error"),null):le.queue&&typeof le.queue.revision=="number"?le.queue.revision:fe.get(ae)??0)}catch(le){return a(ml(le),"error"),null}}async function Z(M,re,ae=new Map){if(M.type==="worker-queue-disarm"){try{let fe=await q(M.type,M.payload,M.root_dir,ae.get(M.root_dir)??se(M.root_dir,re));fe&&fe.queue&&typeof fe.queue.revision=="number"&&ae.set(M.root_dir,fe.queue.revision)}catch{}return!0}if(M.type==="worker-queue-place"||M.type==="worker-queue-reorder"||M.type==="worker-queue-remove")return await W(M.type,M.payload,M.root_dir,ae,{bead_id:re})!==null;try{return(M.type==="dep-add"||M.type==="dep-remove")&&t&&await t(M.type,{a:M.a,b:M.b,...M.root_dir?{root_dir:M.root_dir}:{}}),!0}catch(fe){return a(ml(fe),"error"),!1}}function ee(M){(M.type==="dep-add"||M.type==="dep-remove")&&(m=[...m,{type:M.type,a:M.a,b:M.b}])}async function Se(M,re){if(!t)return{ok:!1};try{let ae=await t(M.type,{...M.payload,expected_revision:re});return!ae||typeof ae.revision!="number"?(a("\uC5F0\uACB0 \uB808\uC778 \uC751\uB2F5\uC5D0 revision\uC774 \uC5C6\uC2B5\uB2C8\uB2E4","error"),{ok:!1}):{ok:!0,revision:ae.revision}}catch(ae){let fe=ae,be=fe&&fe.code==="conflict"?fe.details?.cross_lanes:null;return be&&typeof be.revision=="number"&&Array.isArray(be.lanes)?{ok:!1,conflict:be}:(a(ml(ae),"error"),{ok:!1})}}async function he(M,re,ae){let fe=new Map,be=[],le=M.ops.slice(0,M.lane_op_index),je=M.ops.slice(M.lane_op_index);for(let Je of le){if(!await Z(Je,ae,fe))return{done:!0};ee(Je)}let Ke=re;for(let Je of M.lane_ops){if(Ke===null)return a("\uC5F0\uACB0 \uB808\uC778 \uC800\uC7A5\uC18C\uB97C \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error"),{done:!0};let De=await Se(Je,Ke);if(!De.ok)return De.conflict?{done:!1,conflict:De.conflict}:{done:!0};Ke=De.revision}for(let Je of je){if(!await Z(Je,ae,fe))return{done:!0};ee(Je),Je.type==="dep-add"&&be.push(Je)}for(let Je of Ju(be))Ke=await ue(Je,Ke);return{done:!0}}async function ue(M,re){if(re===null||!t)return re;let ae=M.pairs,fe=re;for(let be=0;be<2;be+=1){if(ae.length===0)return fe;try{let le=await t("monitor-lane-provenance",{lane_id:M.lane_id,pairs:ae.map(je=>({bead_id:je.bead_id,after:je.after,value:!0})),expected_revision:fe});return le&&typeof le.revision=="number"?le.revision:fe}catch(le){let je=le,Ke=je&&je.code==="conflict"?je.details?.cross_lanes:null;if(!Ke||typeof Ke.revision!="number"||!Array.isArray(Ke.lanes))return fe;let Je=Ke.lanes.find(De=>De&&De.id===M.lane_id);ae=ed(Array.isArray(Je?.entries)?Je.entries:[],ae),fe=Ke.revision}}return fe}async function D(M,re,ae=[]){m=ae,l("",0);let fe=r(),be=F();for(let le=0;;le+=1){let je=M(B(fe,be));if("refused"in je){a(je.refused,"error");break}let Ke=await he(je,fe.cross_lanes_revision,re);if(Ke.done){je.correction&&l(je.correction.lane_id,je.correction.corrected);break}if(le>=1){a("\uB808\uC778\uC774 \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4","error");break}let Je=i(Ke.conflict);fe=Je.lanes,be=Je.raw_lanes}m=[],u()}async function ke(M,re){await D(ae=>ci(M,re,ae),M.bead_id)}function xe(M,re){let ae=re&&typeof re.closest=="function"?re.closest("[data-row-index]"):null;if(ae&&M.contains(ae)){let fe=Number(ae.getAttribute("data-row-index"));return Number.isFinite(fe)?fe:0}return M.querySelectorAll("[data-row-index]").length}function S(M){let re=typeof M?.closest=="function"?M.closest(".worker-pane--collapsed[data-lane]"):null;if(!re)return null;let ae=re.getAttribute("data-lane");return ae==="queue"?{zone:re,target:{kind:"parallel",marker_index:r().parallel_rows.length}}:ae==="candidate"&&h===!0?{zone:re,target:{kind:"candidate"}}:null}function J(M){let re=M.target;if(!k)return null;let ae=typeof re?.closest=="function"?re.closest("[data-drop]"):null;if(!ae)return S(re);let fe=ae.getAttribute("data-drop");if(fe==="candidate")return{zone:ae,target:{kind:"candidate"}};if(fe==="parallel")return{zone:ae,target:{kind:"parallel",marker_index:xe(ae,re)}};if(fe==="chain")return{zone:ae,target:{kind:"chain",lane_id:ae.getAttribute("data-lane-id")||"",marker_index:xe(ae,re)}};if(fe==="repo-serial"){let be=ae.getAttribute("data-root-dir")||"";if(be!==k.root_dir)return null;let le=typeof re?.closest=="function"?re.closest("[data-queue-index]"):null,je=le&&ae.contains(le)?le.getAttribute("data-queue-index"):ae.getAttribute("data-lane-length"),Ke=Number(je);return{zone:ae,target:{kind:"repo-serial",root_dir:be,lane_id:ae.getAttribute("data-lane-id")||"",index:Number.isFinite(Ke)?Ke:0}}}return null}function Ee(){for(let M of Array.from(n.querySelectorAll(".is-drop-over")))M.classList.remove("is-drop-over")}function _e(M){H=M.target instanceof Element?M.target:null}function Ae(M){let re=M.target,ae=typeof re?.closest=="function"?re.closest('[draggable="true"][data-bead-id]'):null,fe=ae?ae.closest("[data-drag-kind]"):null;if(!fe)return;if(ae&&H&&ae.contains(H)&&typeof H.closest=="function"&&H.closest("input, button, a")){M.preventDefault();return}let be=fe.getAttribute("data-bead-id")||"",le=fe.getAttribute("data-drag-kind")||"",je=fe.getAttribute("data-root-dir")||"";if(!be||!le)return;let Ke=fe.getAttribute("data-queue-index")||"",Je=Number(Ke),De=fe.getAttribute("data-lane-id")||"";k={kind:le,bead_id:be,root_dir:je,...Ke!==""&&Number.isFinite(Je)?{queue_index:Je}:{},...De?{lane_id:De}:{}},R=!0,f?.(),n.classList.add("is-dragging");try{M.dataTransfer?.setData("text/plain",be),M.dataTransfer&&(M.dataTransfer.effectAllowed="move")}catch{}}function pe(M){let re=J(M);re&&(M.preventDefault(),M.dataTransfer&&(M.dataTransfer.dropEffect="move"),re.zone.classList.add("is-drop-over"))}function Pe(M){let re=M.target;typeof re?.closest=="function"&&(re.closest("[data-drop]")?.classList.remove("is-drop-over"),re.closest(".worker-pane--collapsed")?.classList.remove("is-drop-over"))}function st(){k=null,Ee(),n.classList.remove("is-dragging"),X()}function Ve(M){let re=J(M),ae=k;k=null,Ee(),n.classList.remove("is-dragging"),!(!re||!ae)&&(M.preventDefault(),ke(ae,re.target))}return{attach(M){ne||(ne=M,M.addEventListener("pointerdown",_e),M.addEventListener("dragstart",Ae),M.addEventListener("dragover",pe),M.addEventListener("dragleave",Pe),M.addEventListener("drop",Ve),M.addEventListener("dragend",st))},detach(){j!==null&&(clearTimeout(j),j=null);let M=ne;ne=null,M&&(M.removeEventListener("pointerdown",_e),M.removeEventListener("dragstart",Ae),M.removeEventListener("dragover",pe),M.removeEventListener("dragleave",Pe),M.removeEventListener("drop",Ve),M.removeEventListener("dragend",st))},isDragging(){return k!==null},consumeClickSuppression(){let M=R;return R=!1,M},applyDrop:ke,runPlanned:D,dropModel:B,sendOp:Z,sendQueueCas:W,rememberDep:ee}}var gl=Object.freeze({repo_ops_worktree_unowned:"\uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC\uAC00 \uC544\uC9C1 Worker \uC18C\uC720\uAC00 \uC544\uB2C8\uC5B4\uC11C \uC2A4\uD06C\uB9BD\uD2B8 \uC2E4\uD589 \uC804\uC5D0 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4.",verify_cmd_failed:"\uBA38\uC9C0 \uD6C4 \uAC80\uC99D \uBA85\uB839\uC774 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",gh_observation_failed:"GitHub\uC5D0\uC11C PR \uC0C1\uD0DC\uB97C \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",verify_script_failure:"\uAC80\uC99D \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",deploy_script_failure:"\uBC30\uD3EC \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",interrupted_without_terminal_exit:"\uC791\uC5C5\uC774 \uC885\uB8CC \uAE30\uB85D \uC5C6\uC774 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4.",manual_target_missing:"\uC218\uB3D9 \uBC30\uD3EC \uAE30\uB85D\uC5D0 \uD540\uB41C \uB300\uC0C1 SHA\uAC00 \uC5C6\uC5B4 \uC2E4\uD589\uD558\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4.",base_unresolved:"PR\uC774 \uC5B4\uB290 base \uBE0C\uB79C\uCE58\uB85C \uBA38\uC9C0\uB418\uB294\uC9C0 \uD655\uC815\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_ref_unobserved:"PR\uC758 base \uBE0C\uB79C\uCE58\uB97C \uC544\uC9C1 \uAD00\uCE21\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",merge_sha_unobserved:"\uBA38\uC9C0 \uCEE4\uBC0B SHA\uB97C \uC544\uC9C1 \uAD00\uCE21\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_fetch_failed:"\uC6D0\uACA9 base \uBE0C\uB79C\uCE58\uB97C fetch\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_rev_unavailable:"fetch\uD55C \uC6D0\uACA9 base \uBE0C\uB79C\uCE58\uC758 \uCEE4\uBC0B\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_ff_diverged:"\uB85C\uCEEC base \uBE0C\uB79C\uCE58\uAC00 \uC6D0\uACA9\uACFC \uAC08\uB77C\uC838 fast-forward\uB85C \uC815\uB82C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",deployment_target_not_covering_merge:"\uBC30\uD3EC \uB300\uC0C1 base\uAC00 \uC774 \uBA38\uC9C0 \uCEE4\uBC0B\uC744 \uD3EC\uD568\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.",deployment_candidate_ancestry_check_failed:"\uBC30\uD3EC \uB300\uC0C1 base\uAC00 \uC774 \uBA38\uC9C0 \uCEE4\uBC0B\uC744 \uD3EC\uD568\uD558\uB294\uC9C0 \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",verify_red:"\uBA38\uC9C0 \uD6C4 \uAC80\uC99D\uC774 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",cleanup_failed:"\uBA38\uC9C0 \uD6C4 \uC815\uB9AC\uAC00 \uB05D\uB098\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",retry_exhausted:"\uC790\uB3D9 \uC7AC\uC2DC\uB3C4\uB97C \uBAA8\uB450 \uC4F0\uACE0\uB3C4 \uAC19\uC740 \uC2E4\uD328\uAC00 \uC774\uC5B4\uC84C\uC2B5\uB2C8\uB2E4.",conflict_unresolved:"\uCDA9\uB3CC \uD574\uC18C\uAC00 \uB05D\uB098\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",internal_record_failed:"Worker \uB0B4\uBD80 \uAE30\uB85D\uC774 \uC2E4\uD328\uD574 \uC9C4\uD589\uC744 \uBA48\uCDC4\uC2B5\uB2C8\uB2E4.",foreign_landing_unpinned:"\uB2E4\uB978 \uC800\uC7A5\uC18C \uCC29\uC9C0\uC778\uB370 foreign_repo\xB7foreign_path\xB7foreign_base \uD540\uC774 \uC5C6\uAC70\uB098 \uD615\uC2DD\uC774 \uD2C0\uB9BD\uB2C8\uB2E4.",foreign_checkout_unavailable:"\uD540\uB41C \uB300\uC0C1 \uC800\uC7A5\uC18C \uCCB4\uD06C\uC544\uC6C3\uC774 \uC5C6\uAC70\uB098 foreign_repo\uC640 \uAC19\uC740 URL\uC758 remote\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4.",foreign_deploy_unsupported:"\uB300\uC0C1 \uC800\uC7A5\uC18C\uAC00 [deploy]\uB97C \uC120\uC5B8\uD574 Worker\uAC00 \uBC30\uD3EC \uC99D\uAC70\uB97C \uB9CC\uB4E4 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4. \uC138\uC158\uC774 \uBC30\uD3EC\uC640 \uB9C8\uAC10\uC744 \uC18C\uC720\uD569\uB2C8\uB2E4.",repair_lane_retired:"\uC790\uB3D9 \uC218\uB9AC \uB808\uC778\uC774 \uC740\uD1F4\uD574 \uC0AC\uB78C \uCC98\uB9AC\uB85C \uB118\uC5B4\uC654\uC2B5\uB2C8\uB2E4."});var up={verify_failed:"\uAC80\uC99D \uC2E4\uD328",verify_cmd_failed:"\uAC80\uC99D \uC2E4\uD328",verify_script_failure:"\uAC80\uC99D \uC2E4\uD328",deploy_failed:"\uBC30\uD3EC \uC2E4\uD328",deploy_script_failure:"\uBC30\uD3EC \uC2E4\uD328",interrupted_without_terminal_exit:"\uC911\uB2E8\uB428",quickfix_landing_failed:"\uCC29\uC9C0 \uC2E4\uD328",runner_exit:"\uC138\uC158 \uC2E4\uD328",session_parked:"\uC138\uC158 \uB300\uAE30",session_ended_unresolved:"\uC138\uC158 \uC885\uB8CC",prerequisite_unmet:"\uC120\uD589 \uB300\uAE30",delivery_unproven:"\uCC29\uC9C0 \uC99D\uAC70 \uBD80\uC871"};function Ii(e){return typeof e!="string"||e.length===0?[]:e.split(":").filter(t=>t.length>0)}function Li(e){for(let t of Ii(e)){if(Object.hasOwn(up,t))return up[t];if(t.startsWith("session_"))return"\uC138\uC158 \uC2E4\uD328"}return null}function pp(e){return Ii(e).length===0?null:Li(e)||"\uC2E4\uD328"}function Rr(e){let t=null;for(let n of Ii(e))Object.hasOwn(gl,n)&&(t=gl[n]);return t}function ur(e){let t=Li(e),n=Rr(e);return t&&n?`${t} \u2014 ${n}`:t||n?t||n:typeof e=="string"?e:""}function fp(e,t){let n=Li(e)??Li(t),r=Rr(t)??Rr(e);return n&&r?`${n} \u2014 ${r}`:n||r?n||r:typeof t=="string"?t:""}var Zb=new Set(["repo_operation_timeout_unresolved"]);function Jb(e){for(let t of Ii(e))if(Zb.has(t)||t.startsWith("repo_ops_"))return!0;return!1}function ey(e,t){return t.code==="interrupted"||t.interrupted===!0||e.failure_kind==="interrupted_without_terminal_exit"||t.code==="interrupted_without_terminal_exit"}function _p(e,t){if(!e||typeof e!="object")return"";let n=e.failure;if(!n||typeof n!="object"||Jb(n.code))return"";if(n.code==="timeout"){let o=Number(t);return Number.isFinite(o)&&o>0?`\uD0C0\uC784\uC544\uC6C3 ${Math.round(o/1e3)}\uCD08 \uCD08\uACFC`:"\uD0C0\uC784\uC544\uC6C3 \uCD08\uACFC"}if(ey(e,n))return"\uC885\uB8CC \uAE30\uB85D \uC5C6\uC74C \u2014 \uC911\uB2E8\uB428";let r=typeof e.elapsed_ms=="number"&&Number.isFinite(e.elapsed_ms)&&e.elapsed_ms>=0?` \xB7 ${xr(e.elapsed_ms)}`:"";return typeof e.signal=="string"&&e.signal.length>0?`signal ${e.signal}${r}`:Number.isInteger(e.exit_code)?`exit ${e.exit_code}${r}`:""}var dp={schema_unsupported:"\uD540\uB41C \uC815\uCC45 \uC2A4\uD0A4\uB9C8\uB97C \uC9C0\uC6D0\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4."};function mp(e){if(!e||typeof e!="object")return"";let t=e.retry;if(!t||typeof t!="object")return"";if(typeof t.blocked_reason=="string"&&t.blocked_reason)return`\uC790\uB3D9 \uC7AC\uC2DC\uB3C4 \uBABB \uD568 \u2014 ${Object.hasOwn(dp,t.blocked_reason)?dp[t.blocked_reason]:t.blocked_reason}`;if(t.status==="absorbed"){let n=t.absorbed&&typeof t.absorbed=="object"?t.absorbed:null,r=ur(n?.first_failure?.code);return r?`\uC790\uB3D9 \uC7AC\uC2DC\uB3C4\uB85C \uD574\uC18C\uB428 \u2014 \uCCAB \uC2E4\uD328: ${r}`:"\uC790\uB3D9 \uC7AC\uC2DC\uB3C4\uB85C \uD574\uC18C\uB428"}if(e.state!=="failed")return"";if(t.status==="not_applicable")return"\uC7AC\uC2DC\uB3C4 \uB300\uC0C1 \uC544\uB2D8 \u2014 \uC2A4\uD06C\uB9BD\uD2B8 \uC2E4\uD589 \uC804 \uC2E4\uD328";if(t.status==="consumed"){let n=typeof t.first_fingerprint=="string"&&t.first_fingerprint?t.first_fingerprint:null;if(n===null)return"";if(n===e.failure?.fingerprint)return"\uC790\uB3D9 \uC7AC\uC2DC\uB3C4 1\uD68C \u2014 \uAC19\uC740 \uC2E4\uD328";let r=ur(t.first_failure?.code);return r?`\uC790\uB3D9 \uC7AC\uC2DC\uB3C4 1\uD68C \u2014 \uB2E4\uB978 \uC2E4\uD328: ${r}`:"\uC790\uB3D9 \uC7AC\uC2DC\uB3C4 1\uD68C \u2014 \uB2E4\uB978 \uC2E4\uD328"}return""}function ty(e){if(!Number.isFinite(e)||e<0)return"0s";let t=Math.floor(e/1e3),n=Math.floor(t/60),r=t%60;return n>0?`${n}m ${String(r).padStart(2,"0")}s`:`${r}s`}var gp=200;function ny(e){return typeof e!="string"||e.length===0?"":e.length>gp?`${e.slice(0,gp)}\u2026`:e}function ry(e){let t=e&&e.attempts>0&&e.max>0?` ${e.attempts}/${e.max}`:"",n=e&&typeof e.next_at=="number"?` \xB7 ${new Date(e.next_at).toLocaleTimeString("ko-KR",{hour:"2-digit",minute:"2-digit"})}`:"";return`\u21BB \uC7AC\uC2DC\uB3C4 \uB300\uAE30${t}${n}`}function bp(e){if(!e)return"";let t=Array.isArray(e.timeline)?e.timeline:[],n=typeof e.log_path=="string"?e.log_path:"",r=e.log_expired===!0,o=e.log_unreadable===!0;return t.length===0&&n.length===0&&!r&&!o?"":c`${t.length>0?c`<ol class="rtile__history" data-seam="tile-timeline">
        ${t.map(s=>c`<li class="rtile__history-row">
              ${hp(s.at)?c`<span class="rtile__history-at"
                    >${hp(s.at)}</span
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
          </p>`:""}`}function hp(e){return typeof e!="number"||!Number.isFinite(e)?"":new Date(e).toLocaleTimeString("ko-KR",{hour:"2-digit",minute:"2-digit"})}function oy(e,t){if(!e||e.open!==!0)return"";let n=Rr(e.cause)||ur(e.cause),r=e.retry&&e.retry.attempts>0?`\uC790\uB3D9 \uC7AC\uC2DC\uB3C4 ${e.retry.attempts}\uD68C \u2014 \uAC19\uC740 \uC624\uB958`:"",o=e.cause_detail,s=e.quickfix_lane&&e.quickfix_landing?e.quickfix_landing:null,i=s?[s.cursor||null,typeof s.head_sha=="string"?s.head_sha.slice(0,7):null,s.reason||null].filter(Boolean).join(" \xB7 "):"",l=typeof e.finished_at=="number"?`${new Date(e.finished_at).toLocaleString("ko-KR")} \xB7 ${rn(e.finished_at,t)}`:"",a=[e.runner,e.model,e.observed_effort??e.effort,e.speed].filter(h=>typeof h=="string"&&h.length>0).join(" \xB7 "),u=e.usage?.total_cost_usd,d=typeof u=="number"&&Number.isFinite(u)?`$${u.toFixed(2)}`:"",f=bp(e);return c`<div
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
  </div>`}function sy(e){return!e||!e.repo&&!e.serial_lane_id?"":c`${e.repo?c`<span
        class="worker-card__repo rtile__repo"
        title=${e.root_dir||""}
        >${e.repo}</span
      >`:""}${e.serial_lane_id?c`<span class="rtile__lane">${e.serial_lane_id}</span>`:""}`}var iy=new Set(["codex-runner"]);function ay(e,t,n,r=null){if(!e)return"";let o=e.last_activity||null,s=o&&typeof o.text=="string"?o.text:"",i=o&&typeof o.at=="number"?o.at:null,l=(r||!Array.isArray(e.legs)?[]:e.legs).filter(m=>m&&!(typeof m.agent_type=="string"&&iy.has(m.agent_type))),a=l.filter(m=>m&&m.state==="live"),u=l.filter(m=>m&&m.state!=="live"),d=r&&typeof r.last_event_at=="number"?rn(r.last_event_at,t):"",f=r?rn(r.updated_at,t):"",h=d?`\uCD5C\uADFC \uD65C\uB3D9 ${d}`:f?`\uAC31\uC2E0 ${f}`:"";return c`${s?c`<div class="rtile__activity${n?" is-paused":""}">
        <span class="rtile__activity-dot" aria-hidden="true"></span>
        <span class="rtile__activity-text">${s}</span>
        ${i!==null?c`<span class="rtile__activity-age"
              >${rn(i,t)}</span
            >`:""}
      </div>`:h?c`<div class="rtile__activity rtile__activity--session">
          <span class="rtile__activity-dot" aria-hidden="true"></span>
          <span class="rtile__activity-text">${h}</span>
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
      </div>`:""}`}var ly={remote:"\uB2E4\uB978 \uBA38\uC2E0 \uC138\uC158 \u2014 \uC774 \uC11C\uBC84\uC5D0 transcript \uC5C6\uC74C",missing:"transcript \uD30C\uC77C \uC5C6\uC74C"};function cy(e){if(!e)return"";let t=ly[e.locality]||"";return c`<button
    type="button"
    class="rtile__session"
    ?disabled=${t.length>0}
    title=${t||"\uB77C\uC774\uBE0C \uC138\uC158 \uC5F4\uAE30"}
    aria-label="라이브 세션 열기"
  >
    ▤ 세션
  </button>`}function uy(e,t,n,r=""){if(e==="retry_wait")return n?c`<div class="rtile__foot">${n}</div>`:"";let o=ny(t?.summary);if(e==="waiting")return c`${o?c`<p class="rtile__held-summary">${o}</p>`:""}${r}
      <div class="rtile__foot">${n}</div>`;let s=bp(t);return c`${o?c`<p class="rtile__held-summary">${o}</p>`:""}${s}
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
    </div>`}function hl(e,t,n=null,r={}){let o=e.kind==="session",s=o&&Array.isArray(e.session_refs)&&e.session_refs.find(Ve=>Ve&&Ve.current===!0)||null,i=e.failed===!0,l=i&&e.failure||null,a=e.parked===!0&&!i,u=e.retry_wait===!0&&!i&&!a,d=e.waiting===!0&&!i&&!a&&!u,f=a&&e.failure||null,h=d&&e.wait||null,m=a||u||d,k=!!e.paused,R=i||m?e.status_label||(a?"\uC138\uC158 \uB300\uAE30":u?"\uC7AC\uC2DC\uB3C4 \uB300\uAE30":d?"\uC120\uD589 \uB300\uAE30":e.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328"):k?"\uC77C\uC2DC\uC815\uC9C0":typeof e.started_at=="number"?ty(t-e.started_at):"\u2014",j=e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker)?e.exec_chips:null,H=yo(e),ne=Jt(e.usage),X=Hn(e.usage),F=e.conflict_resolution?k?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":"\uCDA9\uB3CC \uD574\uC18C":null,O=e.base_exception||null,I=e.landing,N=e.attempt_id&&e.attempt_id===n,B=r.monitor||null,se=sy(B),q=Ks(B?.cross_lane_chip),W=B?Gs(B.dependency_chips):"",Z=ay(B,t,k,o?{updated_at:e.updated_at??null,last_event_at:s&&s.locality==="local"?s.last_event_at:null}:null),ee=o&&e.workflow?.chips?.exec_receipt||null,Se=Ys(e.workflow),he=Vs(e.rec,e.chip_popover?.chip_key==="rec"),ue=e.chip_popover?Vr(e.chip_popover.content):"",D=ee?c`<span
        class="ctl-chip ctl-chip--exec-receipt"
        title=${`exec_receipt ${Wn(ee)}`}
        >${`${ee.kind}:${xs(ee)}`}</span
      >`:"",ke=s?c`<span
        class="ctl-chip ctl-chip--sref"
        title=${`${s.provider}:${s.session_id}@${s.host}${(e.session_refs||[]).length>=2?` \xB7 \uC774\uB825 ${(e.session_refs||[]).length}`:""}`}
        >${wo(s)}</span
      >`:"",xe=se||q||Se||ke||D||he?c`<div class="rtile__meta">
          ${se}${q}${Se}${ke}${D}${he}${ue}
        </div>`:"",S=l?c`<button
          type="button"
          class="rtile__failure-badge"
          data-attempt-id=${l.attempt_id}
          aria-expanded=${l.open===!0?"true":"false"}
          aria-label="실패 상세"
        >
          ⛔ ${pp(l.cause)||"\uC2E4\uD328"}
        </button>
        ${l.halted_auto_advance?c`<span class="rtile__auto-halted">자동 진행 꺼짐</span>`:""}`:"",J=a?c`<span
        class="rtile__held-badge"
        title="세션이 사용자 결정을 기다리며 정상 종료했습니다 — 큐는 계속 갑니다"
        >⏸ 세션 대기</span
      >`:u?c`<span
          class="rtile__held-badge"
          title="환경성 실패의 자동 재시도를 기다립니다 — 사람이 할 일은 없습니다"
          >${ry(e.retry)}</span
        >`:d?c`<span
            class="rtile__held-badge"
            title="세션이 선행 미충족으로 착수를 거부했습니다 — 선행이 닫히면 저절로 다시 돕니다"
            >⛓ 선행 대기</span
          >`:"",Ee=c`${F?c`<span class="worker-mini__badge">${F}</span>`:""}${O?c`<span
        class="worker-mini__badge"
        title="이 세션의 target base가 워크스페이스 선언 base와 다릅니다"
        >${O}</span
      >`:""}${S}${J}`,_e=o?"":to(e),Ae=Ds(l?.quickfix_landing),pe=Ae==="settlement"?"\uC815\uC0B0 \uC7AC\uAC1C":"\uC774\uC5B4\uD558\uAE30",Pe=Ae==="settlement"?"\uCC29\uC9C0 \uC815\uC0B0\uC744 \uB2E4\uC2DC \uC2E4\uD589":"\uAC19\uC740 \uC138\uC158\uC73C\uB85C \uC774\uC5B4\uC11C \uC9C4\uD589",st=e.discard?.action&&!(i&&l?.landed===!0)?c`<button
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
    class="rtile${N?" rtile--sel":""}${k?" rtile--paused":""}${i?" rtile--failed rtile--compact":""}${m?" rtile--held rtile--compact":""}${a?" rtile--parked":""}${u?" rtile--retry-wait":""}${d?" rtile--waiting":""}${o?" rtile--session":""}"
    data-bead-id=${e.bead_id}
    data-attempt-id=${e.attempt_id||""}
  >
    <div class="rtile__hd">
      <span
        class="rtile__dot${o?" rtile__dot--session":""}"
        aria-hidden="true"
      ></span>
      <span class="rtile__id" title="클릭하면 ID 복사">${e.bead_id}</span>
      ${Xs(e.priority)}${H?c`<span class="rtile__resumed" title=${H}>↻</span>`:""}${Ee}
      <div class="rtile__hd-actions">
        ${o?c`${typeof e.started_at=="number"?c`<span class="rtile__elapsed">${R}</span>`:""}${cy(s)}<span
                class="rtile__session-badge"
                title="Worker가 아닌 세션이 in_progress로 잡은 이슈"
                >세션</span
              >`:c`<span class="rtile__elapsed">${R}</span>`}
        ${o||m?"":i?c`<button
                  type="button"
                  class="rtile__resume"
                  data-resume-kind=${Ae}
                  ?disabled=${l?.resume_eligible===!1}
                  title=${l?.resume_eligible===!1?l.resume_reason||`${pe} \uBD88\uAC00`:Pe}
                  aria-label=${pe}
                >
                  ↻ ${pe}
                </button>
                ${st}`:c`<button
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
                ${st}`}
      </div>
    </div>
    <div class="rtile__title">${e.title}</div>
    ${m?uy(a?"parked":u?"retry_wait":"waiting",a?f:h,st,d?W:""):i?"":c`${Z}${e.rollup?ks(e.rollup,{parent_id:e.bead_id,expanded:e.rollup_expanded===!0,childChips:ta}):""}
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
            ${o?xe:se||q||Se||j||he||ne.length>0||X?c`<div class="rtile__meta">
                    ${se}${q}${Se}${Hs(e.exec_chips)}${he}
                    ${ne.length>0?ne.map(Ve=>c`<span
                              class="worker-usage"
                              title=${Ve.tooltip}
                              >${Ve.label}</span
                            >`):X?c`<span
                            class="worker-usage"
                            title=${ko(e.usage)}
                            >${X}</span
                          >`:""}${ue}
                  </div>`:""}
            ${Bs(e)} ${_e}
            <!-- 살아있음만 말하는 비의미적 액센트 (UI-58y2 데스크톱 §실행 타일).
         quick_fix landing의 실제 진행은 위의 별도 진행 줄이 소유한다.
         일시정지된 타일은 살아있지 않으므로 액센트도 없다. -->
            ${i||k?"":c`<div class="rtile__accent" aria-hidden="true"></div>`}`}
    ${oy(l,t)}
  </div>`}function dy(e){let t=e.last_activity&&typeof e.last_activity=="object"?e.last_activity:null,n=Array.isArray(e.legs)?e.legs:[],r=e.dependency_chips||null;return!t&&n.length===0&&!r&&e.kind!=="session"?null:{...t?{last_activity:t}:{},...n.length>0?{legs:n}:{},...r?{dependency_chips:r}:{}}}function yp(e,t=Date.now(),n=null){let r=Array.isArray(e)?e:[];return c`<div class="worker-rungrid" id="worker-rungrid">
    ${r.length===0?c`<div class="worker-rungrid__empty">실행 세션 없음</div>`:r.map(o=>hl(o,t,n,{monitor:dy(o)}))}
  </div>`}var en="",py=["impl_runtime","impl_model","impl_effort"],fy=["claude_account","codex_account"],_y=5,Mi=1;function fn(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function Pi(e,t){let n=t.transport,r=typeof t.root_dir=="string"&&t.root_dir.length>0?t.root_dir:null,o=t.notify||(L=>ye(L,"error",4e3)),s={},i={},l=[],a=!1,u={state:"absent",values:{},warnings:[]},d={},f={},h=Promise.resolve(),m={claude:null,codex:null},k=!1,R=null,j={},H="",ne="",X=!1,F=!1,O=!1,I=null,N=!1;function B(){let L=t.queue?t.queue():null;return fn(L)?L:null}function se(){let L=B();return L?L.runner_catalog:null}function q(){let L=B();return L&&fn(L.execution_defaults)?L.execution_defaults:null}function W(){let L=t.implPresetStore?.get();return fn(L)&&Array.isArray(L.presets)?L:null}function Z(){return r===null?{}:{root_dir:r}}async function ee(L,te){return N||!n?null:await n(L,te)}function Se(L){L&&fn(L.queue)&&t.onQueueAdopt?.(L.queue)}async function he(L,te){let ve=B();if(!ve||N)return null;let E=await ee(L,{...te,...Z(),expected_revision:ve.revision});if(Se(E),r!==null&&E&&E.conflict){let K=E.queue&&typeof E.queue.revision=="number"?E.queue.revision:B()?.revision??ve.revision;E=await ee(L,{...te,...Z(),expected_revision:K}),Se(E)}return E}async function ue(){a=!0,Ue();try{let L=await ee("get-session-defaults",{...Z()});s=fn(L?.values)?{...L.values}:{},i={...s},l=Array.isArray(L?.warnings)?L.warnings:[]}catch(L){l=["kv_read_failed"],o(`\uC138\uC158 \uAE30\uBCF8\uAC12\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4: ${L instanceof Error?L.message:String(L)}`)}finally{a=!1,Ue()}}async function D(){let L=Zc(s,i);if(Object.keys(L).length!==0){try{let te=await ee("set-session-defaults",{values:L,...Z()});s=fn(te?.values)?{...te.values}:{},i={...s},l=Array.isArray(te?.warnings)?te.warnings:[]}catch(te){o(`\uC138\uC158 \uAE30\uBCF8\uAC12 \uC800\uC7A5 \uC2E4\uD328: ${te instanceof Error?te.message:String(te)}`)}Ue()}}function ke(L,te){if(!fn(L))return;let ve=L.state;u={state:ve==="usable"||ve==="unusable"||ve==="absent"?ve:"absent",values:fn(L.values)?{...L.values}:{},warnings:Array.isArray(L.warnings)?L.warnings:[]},f={...u.values},te&&(d={...f})}async function xe(){try{ke(await ee("get-workspace-accounts",{...Z()}),!0)}catch(L){u={state:"unusable",values:{},warnings:["kv_read_failed"]},f={},d={},o(`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4: ${L instanceof Error?L.message:String(L)}`)}Ue()}async function S(L){try{let te=await fetch(L);if(!te.ok)return null;let ve=await te.json();if(!fn(ve)||!Array.isArray(ve.accounts))return null;let E=ve.accounts.filter(K=>fn(K)&&typeof K.key=="string"&&K.key.length>0&&typeof K.email=="string"&&K.email.length>0);return{accounts:E,active:E.find(K=>K.active===!0)||null}}catch{return null}}async function J(){k=!0;let[L,te]=await Promise.all([S("/api/claude-usage"),S("/api/codex-usage")]);N||(m={claude:L,codex:te},Ue())}function Ee(){let L={};for(let te of fy){let ve=Object.hasOwn(d,te)?d[te]:null,E=Object.hasOwn(f,te)?f[te]:null;ve!==E&&(L[te]=ve)}return L}async function _e(){let L=Ee();if(Object.keys(L).length!==0){try{ke(await ee("set-workspace-accounts",{values:L,...Z()}),!1)}catch(te){o(`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12 \uC800\uC7A5 \uC2E4\uD328: ${te instanceof Error?te.message:String(te)}`)}Ue()}}function Ae(L,te){te===en?delete d[L]:d[L]=te,Ue(),h=h.then(()=>_e())}function pe(L,te){if(py.includes(L)){Ve(L,te);return}te===en?delete i[L]:i[L]=te,Ue(),D()}function Pe(){let L=$t().orchestration_model,te=mn({global:{orchestration_model:L??void 0},execution_defaults:q(),runner_catalog:se()}).orchestration_model.value;return te?xn(se(),te):null}function st(L,te){typeof te=="string"&&te.length>0?i[L]=te:delete i[L]}function Ve(L,te){let ve=te===en?void 0:te,E=Xc({impl_runtime:L==="impl_runtime"?ve:i.impl_runtime,impl_model:L==="impl_model"?ve:i.impl_model,impl_effort:L==="impl_effort"?ve:i.impl_effort},se(),Pe());st("impl_runtime",E.impl_runtime),st("impl_model",E.impl_model),st("impl_effort",E.impl_effort),Ue(),D()}async function M(){let L=B();if(!L)return;let te={orchestration_model:L.orchestration_model??null,orchestration_effort:L.orchestration_effort??null,orchestration_speed:L.orchestration_speed??null},ve=Jc(te,{...te,...j});if(Object.keys(ve).length!==0){try{let E=await he("worker-queue-set-orchestration-defaults",{values:ve});if(E&&E.applied===!1){o("Worker \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC");return}j={}}catch(E){o(`Worker \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${E instanceof Error?E.message:String(E)}`)}Ue()}}function re(L,te){j[L]=te===en?null:te,Ue(),M()}function ae(L){if(R=L,!L){Ue();return}let te=se(),ve=$t(),E=ve.orchestration_model;E&&!So(te,L).includes(E)&&(j.orchestration_model=null,E=null);let K=ve.orchestration_effort;K&&!da(te,L,E||hn).includes(K)&&(j.orchestration_effort=null),Ue(),M()}async function fe(L){if(!(!B()||L<Mi)){try{await he("worker-queue-set-slots",{slots:L})}catch(te){o(`slots \uC800\uC7A5 \uC2E4\uD328: ${te instanceof Error?te.message:String(te)}`)}Ue()}}async function be(L){if(!(!B()||L<Mi||L>_y)){try{await he("worker-queue-set-serial-lane-count",{count:L})}catch(te){o(`\uC9C1\uB82C \uB808\uC778 \uC800\uC7A5 \uC2E4\uD328: ${te instanceof Error?te.message:String(te)}`)}Ue()}}async function le(L,te){let ve=L==="auto_advance"?"worker-automation-toggle":"worker-merge-auto-toggle";try{await he(ve,{on:te})}catch(E){o(`\uC790\uB3D9\uD654 \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${E instanceof Error?E.message:String(E)}`)}Ue()}function je(){let L={},te=$t();for(let ve of Xr){let E=Yn.includes(ve)?te[ve]:i[ve];typeof E=="string"&&E.length>0&&(L[ve]=E)}return L}async function Ke(){let L=W();if(!L)return;let te=je();if(Object.keys(te).length===0){o("\uC800\uC7A5\uD560 \uC2E4\uD589 \uC124\uC815\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uBA3C\uC800 \uC2E4\uD589 \uAC12\uC744 \uC120\uD0DD\uD558\uC138\uC694");return}let ve=(L.presets||[]).find(K=>K.id===H),E=ne.trim()||(ve?ve.name:"");if(!E){o("\uD504\uB9AC\uC14B \uC774\uB984\uC744 \uC785\uB825\uD558\uC138\uC694");return}try{let K=ve?await ee("impl-preset-update",{expected_revision:L.revision,id:ve.id,name:E,settings:te}):await ee("impl-preset-create",{expected_revision:L.revision,name:E,settings:te});if(K&&K.applied){if(ne="",!ve&&Array.isArray(K.presets)){let Ie=K.presets.find(We=>We.name===E);H=Ie?Ie.id:H}Ue()}else o("\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4"),Ue()}catch(K){o(`\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328: ${K instanceof Error?K.message:String(K)}`)}}async function Je(){let L=W();if(!(!L||H.length===0))try{let te=await ee("impl-preset-delete",{expected_revision:L.revision,id:H});te&&te.applied?(H="",Ue()):(o("\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328: \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4"),Ue())}catch(te){o(`\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328: ${te instanceof Error?te.message:String(te)}`)}}function De(L){s=fn(L.values)?{...L.values}:{},i={...s},l=Array.isArray(L.warnings)?L.warnings:[],fn(L.queue)&&(t.onQueueAdopt?.(L.queue),j={})}async function Q(){let L=W(),te=B();if(!L||!te||H.length===0)return;let ve=E=>({preset_id:H,expected_revision:L.revision,expected_queue_revision:E,...Z()});try{let E=await ee("apply-impl-preset-global",ve(te.revision));if(E&&E.applied&&De(E),r!==null&&E&&E.queue_applied===!1){let K=E.queue&&typeof E.queue.revision=="number"?E.queue.revision:B()?.revision??te.revision;E=await ee("apply-impl-preset-global",ve(K)),E&&E.applied&&De(E)}E&&E.applied?E.queue_applied===!1&&o("\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uAC12\uC740 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC138\uC694"):E&&E.conflict&&o("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328: \uD504\uB9AC\uC14B\uC774 \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4")}catch(E){o(`\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328: ${E instanceof Error?E.message:String(E)}`)}Ue()}async function U(){F=!0,O=!1,Ue();try{let L=await ee("get-worker-system-prompt",{});!L||typeof L!="object"||Array.isArray(L)?O=!0:I=L}catch{O=!0}finally{F=!1,Ue()}}function qe(){if(X=!X,X&&!I){U();return}Ue()}function dt(){let L=so({loading:F,error:O});if(L)return L;if(!I)return"";let te=Array.isArray(I.variants)?I.variants:[];return c`<div class="settings-dialog__sp-body">
      ${I.target_base_placeholder?c`<div class="prompt-block__meta">
            \`${I.target_base_placeholder}\`는 디스패치 시점에 해석된
            base로 치환됩니다.
          </div>`:""}
      ${te.map(ve=>c`<div class="settings-dialog__sp-variant" data-variant=${ve.key}>
            <div class="settings-dialog__sp-cond">${ve.condition}</div>
            ${Jn(ve.label,ve.system_prompt)}
          </div>`)}
    </div>`}function tt(){return c`<section
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
        @click=${qe}
      >
        ${X?"\uC811\uAE30":"\uC804\uBB38 \uBCF4\uAE30"}
      </button>
      ${X?dt():""}
    </section>`}function v(L,te,ve,E,K,Ie,We){let Ne=K[L]??en,nt=pa(L,ve,K,q(),se(),We),Le=nt.options.find(et=>et.value===Ne),Ge=Ne===en?nt.full_value:Le?.full_value;return c`<select
        class=${Ne===en?"settings-dialog__unset":""}
        data-key=${L}
        aria-label=${te}
        title=${Ge||""}
        ?disabled=${Ie===!0||nt.disabled}
        .value=${Tr(String(Ne))}
        @change=${et=>E(L,String(et.target.value))}
      >
        <option value=${en} ?selected=${Ne===en}>
          ${nt.unset_label}
        </option>
        ${nt.options.map(et=>c`<option
              value=${et.value}
              title=${et.full_value||""}
              ?selected=${et.value===Ne}
            >
              ${et.label}
            </option>`)}
      </select>
      ${Ne===en?c`<span class="settings-dialog__source-badge">기본</span>`:""}`}function z(L,te,ve,E,K,Ie=!1,We){return c`<div
      class=${`settings-dialog__row${Ie?" settings-dialog__row--off":""}`}
    >
      <span class="settings-dialog__row-label">${te}</span>
      <span class="settings-dialog__controls">
        ${v(L,te,ve,E,K,Ie,We)}
      </span>
    </div>`}function Te(L,te){let ve=te?te.active:null;return fn(ve)?`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(${L==="claude"?ve.email:ao({...ve,alias:null})})`:"\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(\uD655\uC778 \uBD88\uAC00)"}function Re(L,te,ve){let E=m[ve],K=Object.hasOwn(d,L)?d[L]:en,Ie=ve==="claude"?Ai:ao,We=!!E?.accounts.some(Ne=>Ne.key===K);return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${te}</span>
      <span class="settings-dialog__controls">
        <select
          aria-label=${te}
          data-account-key=${L}
          @change=${Ne=>Ae(L,String(Ne.target.value))}
        >
          <option value=${en} ?selected=${K.length===0}>
            ${Te(ve,E)}
          </option>
          ${K.length>0&&!We?c`<option value=${K} selected>
                ${K} (목록에 없음)
              </option>`:""}
          ${E?.accounts.map(Ne=>c`<option value=${Ne.key} ?selected=${Ne.key===K}>
                ${Ie(Ne)}
              </option>`)||""}
        </select>
        ${E?"":c`<span class="settings-dialog__hint"
              >계정 목록을 불러올 수 없습니다</span
            >`}
      </span>
    </div>`}function Be(){let L=u.warnings.join(", ");return u.state==="unusable"?`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12\uC744 \uD574\uC11D\uD560 \uC218 \uC5C6\uC5B4 \uC774 \uB808\uD3EC\uC758 \uB514\uC2A4\uD328\uCE58\uAC00 \uAC70\uBD80\uB429\uB2C8\uB2E4 \u2014 ${L} \xB7 \uACC4\uC815\uC744 \uB2E4\uC2DC \uACE0\uB974\uBA74 \uD574\uC18C\uB429\uB2C8\uB2E4`:u.warnings.length>0?`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12\uC5D0 \uC54C \uC218 \uC5C6\uB294 \uD0A4\uAC00 \uC788\uC2B5\uB2C8\uB2E4 \u2014 ${L}`:null}function Xe(L,te,ve,E,K){return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">
        <i
          class="settings-dialog__stage-dot"
          style=${`background: var(--stage-${te}-on)`}
        ></i>
        ${L}
      </span>
      <span class="settings-dialog__controls">
        ${v(ve,`${L} \uBAA8\uB378`,E,pe,i,!1)}
        ${v(K,`${L} effort`,Is,pe,i,!1)}
      </span>
    </div>`}function ft(L,te,ve,E){return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${te}</span>
      <span class="settings-dialog__controls">
        <button
          type="button"
          class=${`settings-dialog__toggle${E?" is-on":""}`}
          data-automation=${L}
          aria-pressed=${E?"true":"false"}
          aria-label=${te}
          @click=${()=>le(L,!E)}
        >
          ${E?"\uCF1C\uC9D0":"\uAEBC\uC9D0"}
        </button>
        <span class="settings-dialog__hint">${ve}</span>
      </span>
    </div>`}function kt(L,te,ve,E){return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${te}</span>
      <span class="settings-dialog__controls">
        <span class="settings-dialog__stepper" data-stepper=${L}>
          <button
            type="button"
            aria-label=${`${te} \uAC10\uC18C`}
            @click=${()=>E(ve-1)}
          >
            −
          </button>
          <span class="settings-dialog__stepper-value">${ve}</span>
          <button
            type="button"
            aria-label=${`${te} \uC99D\uAC00`}
            @click=${()=>E(ve+1)}
          >
            +
          </button>
        </span>
      </span>
    </div>`}function It(L){return c`<div class="settings-dialog__preset-diff" data-preset-diff>
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
    </div>`}function $t(){let L=B(),te={};for(let ve of Yn)te[ve]=Object.prototype.hasOwnProperty.call(j,ve)?j[ve]:L&&typeof L[ve]=="string"?L[ve]:null;return te}function mt(){let L=se(),te=i.impl_runtime,ve=i.impl_model,E=W(),K=B(),Ie=$t(),We=So(L,R),Ne=Qr(L,void 0).filter(ut=>ut!==hn),nt=da(L,R,Ie.orchestration_model||hn).filter(ut=>ut!==hn),Le=H?(E?.presets||[]).find(ut=>ut.id===H):null,Ge=Le?Qc(je(),fn(Le.settings)?Le.settings:{}):null,et=K&&typeof K.slots=="number"?K.slots:Mi+1,yt=K&&typeof K.serial_lane_count=="number"?K.serial_lane_count:Mi,He=q()?.supported===!0,At=Be(),qt=pa("workflow_mode",xo,i,q(),L);return c`
      ${l.length>0?c`<div class="settings-dialog__banner" role="alert">
            워크스페이스 기본값을 일부 읽지 못했습니다 —
            ${l.join(", ")}
          </div>`:""}
      ${At?c`<div
            class="settings-dialog__banner"
            data-account-warning
            role="alert"
          >
            ${At}
          </div>`:""}
      ${He?"":c`<div
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
                .value=${Tr(H)}
                @change=${ut=>{H=String(ut.target.value),Ue()}}
              >
                <option value="" ?selected=${H===""}>
                  실행 프리셋…
                </option>
                ${(E?.presets||[]).map(ut=>c`<option
                      value=${ut.id}
                      ?selected=${ut.id===H}
                    >
                      ${ut.name}
                    </option>`)}
              </select>
              <button
                type="button"
                class="settings-dialog__btn settings-dialog__btn--primary"
                data-preset-apply-global
                ?disabled=${!Ge||Ge.rows.length===0}
                @click=${Q}
              >
                적용
              </button>
              <input
                type="text"
                class="settings-dialog__preset-name"
                placeholder=${H?"\uC774\uB984 (\uBE44\uC6B0\uBA74 \uC720\uC9C0)":"\uC0C8 \uD504\uB9AC\uC14B \uC774\uB984"}
                aria-label="프리셋 이름"
                .value=${Tr(ne)}
                @input=${ut=>{ne=String(ut.target.value)}}
              />
              <button
                type="button"
                class="settings-dialog__btn"
                data-preset-save
                title=${H?"\uD604\uC7AC \uD654\uBA74\uC758 \uC2E4\uD589 \uC124\uC815\uC744 \uC774 \uD504\uB9AC\uC14B\uC5D0 \uC800\uC7A5\uD569\uB2C8\uB2E4 (\uD504\uB9AC\uC14B \u2192 \uC124\uC815 \uBC29\uD5A5\uC774 \uC544\uB2D8)":"\uD604\uC7AC \uD654\uBA74\uC758 \uC2E4\uD589 \uC124\uC815\uC744 \uC0C8 \uD504\uB9AC\uC14B\uC73C\uB85C \uC800\uC7A5\uD569\uB2C8\uB2E4"}
                @click=${Ke}
              >
                ${H?"\uD604\uC7AC \uC124\uC815\uC73C\uB85C \uB36E\uC5B4\uC4F0\uAE30":"\uC0C8 \uD504\uB9AC\uC14B \uC800\uC7A5"}
              </button>
              <button
                type="button"
                class="settings-dialog__btn"
                data-preset-delete
                ?disabled=${H.length===0}
                @click=${Je}
              >
                삭제
              </button>
            </div>
            ${Ge?It(Ge):""}

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">오케스트레이션</div>
              <div class="settings-dialog__row">
                <span class="settings-dialog__row-label">런타임</span>
                <span class="settings-dialog__controls">
                  <select
                    aria-label="런타임"
                    data-key="orchestration_runtime_filter"
                    .value=${Tr(R||en)}
                    @change=${ut=>{let Vt=String(ut.target.value);ae(Vt===en?null:Vt)}}
                  >
                    <option value=${en} ?selected=${!R}>
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
              ${z("orchestration_model","\uBAA8\uB378",We,re,Ie)}
              ${z("orchestration_effort","effort",nt,re,Ie)}
              ${z("orchestration_speed","\uC18D\uB3C4",$o,re,Ie)}
            </div>

            <div class="settings-dialog__group" data-exec-accounts-group>
              <div class="settings-dialog__group-title">실행 계정</div>
              ${Re("claude_account","Claude","claude")}
              ${Re("codex_account","Codex","codex")}
            </div>

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">워크플로우</div>
              <div class="settings-dialog__row">
                <span class="settings-dialog__row-label">모드</span>
                <span class="settings-dialog__controls">
                  <span class="settings-dialog__seg" role="group">
                    <button
                      type="button"
                      data-mode=${en}
                      aria-pressed=${String(!i.workflow_mode)}
                      @click=${()=>pe("workflow_mode",en)}
                    >
                      ${qt.unset_label}
                    </button>
                    ${i.workflow_mode?"":c`<span class="settings-dialog__source-badge"
                          >기본</span
                        >`}
                    ${xo.map(ut=>c`<button
                          type="button"
                          data-mode=${ut}
                          aria-pressed=${String(i.workflow_mode===ut)}
                          @click=${()=>pe("workflow_mode",ut)}
                        >
                          ${ut}
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
              ${Xe("\uC0AC\uC591 \uB9AC\uBDF0","spec","spec_review_model",Ao,"spec_review_effort")}
              ${Xe("\uACC4\uD68D \uB9AC\uBDF0","plan","plan_review_model",Ls,"plan_review_effort")}
              ${Xe("\uAD6C\uD604 \uB9AC\uBDF0","impl","impl_review_model",Ao,"impl_review_effort")}
            </div>

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">
                구현
                <span class="settings-dialog__hint"
                  >이슈 핀이 있으면 핀이 우선합니다</span
                >
              </div>
              ${z("impl_runtime","\uC704\uC784 \uB300\uC0C1",Os,pe,i)}
              ${z("impl_model","\uBAA8\uB378",Qr(L,te),pe,i)}
              ${z("impl_effort","effort",Zr(L,te,ve),pe,i)}
              ${z("impl_speed","\uC18D\uB3C4",$o,pe,i)}
              ${z("quick_fix_impl_model","quick_fix \uAD6C\uD604 \uBAA8\uB378",Ne,pe,i,!1,{...i,...Ie})}
            </div>

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">
                자동화
                <span class="settings-dialog__hint"
                  >이 레포의 워커 큐가 스스로 진행하는 범위</span
                >
              </div>
              ${ft("auto_advance","\uC790\uB3D9\uD654","\uC2AC\uB86F\uC774 \uBE44\uBA74 \uB300\uAE30 \uC55E \uD589\uC774 \uCD9C\uBC1C\uD569\uB2C8\uB2E4",K?.auto_advance===!0)}
              ${ft("auto_merge","\uBA38\uC9C0","\uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4",K?.auto_merge===!0)}
              ${kt("slots","\uB3D9\uC2DC \uC2E4\uD589",et,ut=>fe(ut))}
              ${kt("serial-lane-count","\uC9C1\uB82C \uB808\uC778",yt,ut=>be(ut))}
            </div>
            ${tt()}
          `}
    `}function Ue(){N||it(mt(),e)}return{load(){j={};let L=[ue(),xe()];return k||L.push(J()),Promise.all(L).then(()=>{})},render:Ue,sessionDraft:()=>({...i}),destroy(){N=!0,it(c``,e)}}}function Di(e){return c`<svg
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
  </svg>`}function vp(){return Di(go`<path d="M5.5 3.6 12 8l-6.5 4.4z" />`)}function wp(){return Di(go`<path d="M6 3.8v8.4M10 3.8v8.4" />`)}function kp(){return Di(go`<path
      d="M4.6 5.6v4.8M4.6 8.2h2.2A3.2 3.2 0 0 0 10 5"
    />
    <circle cx="4.6" cy="4" r="1.5" />
    <circle cx="4.6" cy="12" r="1.5" />
    <circle cx="11.4" cy="4" r="1.5" />`)}function $p(){return Di(go`<circle cx="8" cy="8" r="2.1" />
    <path
      d="M8 1.9v1.8M8 12.3v1.8M1.9 8h1.8M12.3 8h1.8M3.7 3.7l1.3 1.3M11 11l1.3 1.3M12.3 3.7 11 5M5 11l-1.3 1.3"
    />`)}function xp(e){return`${e} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}function Ap(e){let t=(Array.isArray(e)?e:[]).map(l=>l&&l.usage).filter(l=>l&&typeof l=="object"&&"providers"in l);if(t.length>0)return Jt(Cs(t));let n={};for(let l of Dn)n[l]=0;let r=!1,o=0,s=0,i=0;for(let l of Array.isArray(e)?e:[]){let a=l&&l.usage;if(a&&typeof a=="object"){let u=!1;for(let d of Dn){let f=a[d];typeof f=="number"&&Number.isFinite(f)&&(n[d]+=f,r=!0,u=!0)}if(u){s+=1;let d=a.total_cost_usd;typeof d=="number"&&Number.isFinite(d)&&(o+=d,i+=1)}}}return s>0&&i===s&&(n.total_cost_usd=o),r?Hn(n):null}function Rn(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function bl(e,t){let n=Rn(e?.counts)?e.counts:null,r=n?n[t]:null;return typeof r=="number"&&Number.isFinite(r)?r:0}function my(e,t){if(!Rn(t))return e;let n={...e};for(let[r,o]of Object.entries(t))o!==void 0&&(n[r]=o);return n}function gy(e){if(!Rn(e)||!Rn(e.execution_defaults)||!Rn(e.runner_catalog)||!Rn(e.session_defaults))return null;let t={...e.session_defaults};for(let i of["orchestration_model","orchestration_effort","orchestration_speed"])typeof e[i]=="string"&&e[i].length>0&&(t[i]=e[i]);let n=mn({global:t,execution_defaults:e.execution_defaults,runner_catalog:e.runner_catalog}),r=xn(e.runner_catalog,n.orchestration_model.value??""),o=Jr(n,e.runner_catalog),s=kr(n,r);return o===null&&s===null?null:{orchestration:o,worker:s}}function Sp(e,t){let n=t.notify||(S=>ye(S,"error",4e3)),r=document.createElement("div");r.className="mon2-deck__main",e.appendChild(r);let o=document.createElement("div");o.className="mon2-deck__panel",o.hidden=!0;let s=document.createElement("div");s.className="mon2-deck__panel-hd";let i=document.createElement("span");i.className="mon2-deck__panel-title";let l=document.createElement("button");l.type="button",l.className="mon2-deck__panel-close",l.setAttribute("aria-label","\uC2E4\uD589 \uC124\uC815 \uB2EB\uAE30"),l.textContent="\u2715",s.append(i,l);let a=document.createElement("div");a.className="mon2-deck__panel-body",o.append(s,a),e.appendChild(o);let u=null,d=null,f=null,h=new Map;function m(){let S=t.workspacesState?t.workspacesState():[];return Array.isArray(S)?S.filter(J=>Rn(J)):[]}function k(S){return m().find(J=>J.root_dir===S)||null}function R(S){return my(k(S),h.get(S))}function j(){for(let S of m()){let J=h.get(S.root_dir);J&&typeof J.revision=="number"&&typeof S.revision=="number"&&S.revision>=J.revision&&h.delete(S.root_dir)}}async function H(S,J,Ee){let _e=t.transport,Ae=R(J);if(!(!_e||!Rn(Ae))){try{let pe=await _e(S,{...Ee,root_dir:J,expected_revision:Ae.revision});if(Rn(pe?.queue)&&h.set(J,pe.queue),pe&&pe.conflict){let Pe=Rn(pe.queue)&&typeof pe.queue.revision=="number"?pe.queue.revision:R(J)?.revision;pe=await _e(S,{...Ee,root_dir:J,expected_revision:Pe}),Rn(pe?.queue)&&h.set(J,pe.queue)}}catch(pe){n(`\uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${pe instanceof Error?pe.message:String(pe)}`)}D()}}function ne(S){u!==S&&(u=S,t.onFocusChange?.(u),D())}function X(S){ne(u===S?null:S)}function F(S){if(d===S){I();return}O(),d=S;let J=k(S);i.textContent=`${J?.name||S} \uC2E4\uD589 \uC124\uC815 \xB7 Worker \uD0ED \u2699 \uC2E4\uD589 \uD0ED\uACFC \uAC19\uC740 \uC800\uC7A5\uC18C`,o.hidden=!1,f=Pi(a,{root_dir:S,queue:()=>R(S),transport:t.transport,implPresetStore:t.implPresetStore,notify:n,onQueueAdopt:Ee=>{h.set(S,Ee),D()}}),f.load(),D()}function O(){f?.destroy(),f=null}function I(S){O(),d=null,o.hidden=!0,i.textContent="",S!==!0&&D()}let N=()=>I();l.addEventListener("click",N);function B(S){S.key==="Escape"&&u!==null&&ne(null)}document.addEventListener("keydown",B);function se(S,J){let Ee=Math.max(J,S,1);return c`<span
      class="mon2-deck__rail"
      role="img"
      aria-label=${`\uC2AC\uB86F ${J}\uAC1C \uC911 ${S}\uAC1C \uC2E4\uD589 \uC911`}
    >
      ${Array.from({length:Ee},(_e,Ae)=>Ae<S?c`<i class="mon2-deck__slot is-run"></i>`:c`<i class="mon2-deck__slot"></i>`)}
    </span>`}function q(S){let J=S.auto_advance===!0,Ee=S.auto_merge===!0;return c`<button
        type="button"
        class=${`mon2-deck__op mon2-deck__auto${J?" is-on":""}`}
        data-act="auto"
        aria-pressed=${J?"true":"false"}
        aria-label=${`${S.name} \uC790\uB3D9\uD654`}
        title=${J?"\uC790\uB3D9\uD654 \uCF1C\uC9D0 \u2014 \uC2AC\uB86F\uC774 \uBE44\uBA74 \uB2E4\uC74C \uD589\uC774 \uCD9C\uBC1C\uD569\uB2C8\uB2E4":"\uC790\uB3D9\uD654 \uAEBC\uC9D0 \u2014 \uB2E4\uC74C \uD589\uC740 \uC218\uB3D9\uC73C\uB85C\uB9CC \uCD9C\uBC1C\uD569\uB2C8\uB2E4"}
      >
        ${J?wp():vp()}
      </button>
      <button
        type="button"
        class=${`mon2-deck__op mon2-deck__merge${Ee?" is-on":""}`}
        data-act="merge"
        aria-pressed=${Ee?"true":"false"}
        aria-label=${`${S.name} \uC790\uB3D9 \uBA38\uC9C0`}
        title=${Ee?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0"}
      >
        ${kp()}
      </button>
      <button
        type="button"
        class=${`mon2-deck__op mon2-deck__gear${d===S.root_dir?" is-on":""}`}
        data-act="gear"
        aria-expanded=${d===S.root_dir?"true":"false"}
        aria-label=${`${S.name} \uC2E4\uD589 \uC124\uC815`}
        title="이 레포의 실행 설정"
      >
        ${$p()}
      </button>`}function W(S){let J=gy(S);return J?c`<div class="mon2-deck__chips">
      ${J.orchestration?c`<span class="mon2-deck__chip" title=${J.orchestration.title}
            >오케 ${J.orchestration.text}</span
          >`:""}
      ${J.worker?c`<span class="mon2-deck__chip" title=${J.worker.title}
            >워커 ${J.worker.text}</span
          >`:""}
    </div>`:""}function Z(S){let J=[];for(let[Ee,_e]of[["queue","\uB300\uAE30"],["pr_wait","PR"],["session_active","\uC138\uC158"]]){let Ae=bl(S,Ee);Ae>0&&J.push(`${_e} ${Ae}`)}return J.join(" \xB7 ")}function ee(S){let J=bl(S,"running"),Ee=typeof S.slots=="number"?S.slots:1;return c`<div
      class=${`mon2-deck__tile${u===S.root_dir?" is-focus":""}`}
      role="button"
      tabindex="0"
      data-root-dir=${S.root_dir}
      aria-pressed=${u===S.root_dir?"true":"false"}
      title="클릭하면 이 레포만 선명하게 봅니다 (Esc로 해제)"
    >
      <div class="mon2-deck__tile-hd">
        <span class="mon2-deck__name" title=${S.root_dir}>${S.name}</span>
        <span
          class="mon2-deck__load"
          title=${`\uC2AC\uB86F ${Ee}\uAC1C \uC911 ${J}\uAC1C \uC2E4\uD589 \uC911`}
        >
          <span class="mon2-deck__load-n">${J}/${Ee}</span>
          ${se(J,Ee)}
        </span>
        <button
          type="button"
          class="mon2-deck__worker"
          data-act="worker"
          aria-label=${`${S.name} Worker \uD0ED\uC73C\uB85C \uC774\uB3D9`}
          title="이 레포의 Worker 탭으로 이동"
        >
          ↗
        </button>
      </div>
      <div class="mon2-deck__tile-ft">
        <div class="mon2-deck__ops">${q(S)}</div>
        <span class="mon2-deck__counts">${Z(S)}</span>
        ${W(S)}
      </div>
    </div>`}function Se(S){let J=t.doneItems?t.doneItems():[],Ee=t.rangeLabel?t.rangeLabel():"",_e=Ap(Array.isArray(J)?J:[]),Ae=pe=>S.reduce((Pe,st)=>Pe+bl(st,pe),0);return c`<div class="mon2-deck__bar">
      <span
        class="mon2-deck__total-counts"
        title=${`visible \uB808\uD3EC ${S.length}\uACF3\uC758 \uD569\uACC4\uC785\uB2C8\uB2E4 \u2014 \uC2E4\uD589\xB7\uB300\uAE30\xB7PR\uC740 \uC9C0\uAE08, \uC644\uB8CC\uB294 ${Ee}`}
        >실행 ${Ae("running")} · 대기 ${Ae("queue")} · PR
        ${Ae("pr_wait")}${Ae("session_active")>0?` \xB7 \uC138\uC158 ${Ae("session_active")}`:""}
        · ${Ee} 완료
        ${Array.isArray(J)?J.length:0}</span
      >
      ${_e===null?"":c`<span class="mon2-deck__total-tokens">
            ${typeof _e=="string"?c`<span
                  class="mon2-deck__tok"
                  title=${xp(Ee)}
                  >${_e}</span
                >`:_e.map(pe=>c`<span
                      class="mon2-deck__tok"
                      data-provider=${pe.provider}
                      title=${pe.tooltip}
                      >${pe.label}</span
                    >`)}
          </span>`}
    </div>`}function he(){let S=m();return S.length===0?"":c`${Se(S)}
      <div class="mon2-deck__strip">
        ${S.map(J=>ee(J))}
      </div>`}function ue(){u!==null&&!k(u)&&(u=null,t.onFocusChange?.(null))}function D(){j(),ue(),d!==null&&!k(d)&&I(!0),it(he(),r),f?.render()}function ke(S){let J=S.target;if(!J||typeof J.closest!="function")return;let Ee=J.closest("[data-root-dir]");if(!Ee)return;let _e=Ee.getAttribute("data-root-dir")||"",Ae=J.closest("[data-act]")?.getAttribute("data-act");if(Ae==="worker"){t.gotoWorkerTab?.(_e);return}if(Ae==="auto"){H("worker-automation-toggle",_e,{on:R(_e)?.auto_advance!==!0});return}if(Ae==="merge"){H("worker-merge-auto-toggle",_e,{on:R(_e)?.auto_merge!==!0});return}if(Ae==="gear"){F(_e);return}X(_e)}function xe(S){if(S.key!=="Enter"&&S.key!==" ")return;let J=S.target;if(!J||typeof J.closest!="function")return;let Ee=J.closest('[data-root-dir][role="button"]');!Ee||Ee!==J||(S.preventDefault(),X(Ee.getAttribute("data-root-dir")||""))}return r.addEventListener("click",ke),r.addEventListener("keydown",xe),{render:D,focusRoot:()=>u,panelRoot:()=>d,destroy(){document.removeEventListener("keydown",B),r.removeEventListener("click",ke),r.removeEventListener("keydown",xe),l.removeEventListener("click",N),O(),it(c``,r),e.replaceChildren()}}}var hy=1e4,Rp="bdui.monitor.done-range",Op="bdui.monitor.running_sort",Lp="bdui.monitor.candidate_sort",Ip="beads-ui.monitor.candidate-filter",Mp="beads-ui.monitor.sections";function by(){try{let e=window.localStorage.getItem(Ip);if(!e)return{...no};let t=JSON.parse(e);return!t||typeof t!="object"?{...no}:{show_blocked:typeof t.show_blocked=="boolean"?t.show_blocked:no.show_blocked,spec:La.some(n=>n.value===t.spec)?t.spec:"all"}}catch{return{...no}}}function Ep(e){try{window.localStorage.setItem(Ip,JSON.stringify({show_blocked:e.show_blocked,spec:e.spec}))}catch{}}function yy(){try{let e=window.localStorage.getItem(Lp);return Mo.some(t=>t.value===e)?e:"repo_spec"}catch{return"repo_spec"}}function vy(e){try{window.localStorage.setItem(Lp,e)}catch{}}function wy(){try{let e=window.localStorage.getItem(Mp);if(!e)return{};let t=JSON.parse(e);return t&&typeof t=="object"?t:{}}catch{return{}}}function ky(e){try{window.localStorage.setItem(Mp,JSON.stringify(e))}catch{}}function $y(){try{let e=window.localStorage.getItem(Rp);return e===null?"today":Mn(e)}catch{return"today"}}function xy(e){try{window.localStorage.setItem(Rp,e)}catch{}}function Ay(){try{return window.localStorage.getItem(Op)==="repo"?"repo":"started"}catch{return"started"}}function Sy(e){try{window.localStorage.setItem(Op,e)}catch{}}var Pp="tab:monitor:pipeline",Ey=1e3,Tp=[{lane:"runnable",pane:"candidate",title:"\uD6C4\uBCF4",empty:"\uC2E4\uD589 \uC790\uACA9\uC744 \uAC16\uCD98 \uC774\uC288 \uC5C6\uC74C"},{lane:"queue",pane:"queue",title:"\uB300\uAE30",empty:"\uD45C\uC2DC\uD560 \uB808\uD3EC \uC5C6\uC74C"},{lane:"running",pane:"running",title:"\uC2E4\uD589 \uC911",empty:"\uC2E4\uD589 \uC911 \uC5C6\uC74C"},{lane:"pr_wait",pane:"pr_wait",title:"PR \uB300\uAE30",empty:"PR \uC5C6\uC74C"},{lane:"done",pane:"done",title:"\uC644\uB8CC",empty:"\uC644\uB8CC \uAE30\uB85D \uC5C6\uC74C"}],Ty=["queue","runnable","done"],Cp="\u2460\u2461\u2462\u2463\u2464\u2465\u2466\u2467\u2468\u2469\u246A\u246B\u246C\u246D\u246E\u246F\u2470\u2471\u2472\u2473";function Cy(e){return e>=1&&e<=Cp.length?Cp[e-1]:`(${e})`}function Dp(e,t){let n=Rt("views:monitor"),r=t.gotoIssue,o=t.pipelineStore,s=t.transport,i=t.getWorkspacePath,l=t.openDoc,a=t.switchWorkspace,u=t.router,d=t.now||(()=>Date.now()),f=t.confirm||(b=>typeof globalThis.confirm!="function"||globalThis.confirm(b)),h=$y(),m=Ay(),k=by(),R=yy(),j=wy(),H=Ci("beads-ui.monitor.lane-collapsed"),ne=!1,X=null,F=null,O=null,I=null,N=Yr(()=>Le()),B=null,se=null,q=null,W=null;function Z(b){return W===null&&(W=M()),zu(b,W)}function ee(b,p){Se(),!(p<=0)&&(se={lane_id:b,corrected:p},q=setTimeout(()=>{q=null,se=null,Le()},hy))}function Se(){q!==null&&(clearTimeout(q),q=null),se=null}function he(){let b=Mr.find(p=>p.value===h);return b?b.label:""}let ue=document.createElement("div");ue.className="mon",e.appendChild(ue);let D=document.createElement("div");D.className="worker-drawer-overlay",D.hidden=!0;let ke=document.createElement("div");ke.className="worker-drawer-overlay__backdrop";let xe=document.createElement("div");xe.className="worker-drawer-host mon2-drawer",D.append(ke,xe),e.appendChild(D);let S=lr(null,null),J=new Map,Ee=new Map,_e=null,Ae=null,pe=null,Pe=io(xe,{transport:s,sessionLogStore:t.sessionLogStore,onClose:()=>{F=null,D.hidden=!0,Le()}}),st=Oi({transport:s,console_el:ue,getLanes:()=>S,getWorkspaces:()=>o&&o.get?o.get():null,getCrossLanes:Et,reproject:b=>({lanes:nt(b),raw_lanes:b}),onCorrection:ee,showToast:ye,requestRender:()=>Le(),adoptQueue:(b,p)=>{Ee.set(b,p)},onDragBegin:()=>{O=null},candidate_drop:!0}),{applyDrop:Ve,dropModel:M,runPlanned:re,sendQueueCas:ae}=st;async function fe(b,p,_,A,Y=!0){if(!s||!_)return null;let V=await s(b,{...p,root_dir:_,expected_revision:A});if(V&&V.conflict&&Y){V.queue&&Ee.set(_,V.queue);let oe=V.queue&&typeof V.queue.revision=="number"?V.queue.revision:A;V=await s(b,{...p,root_dir:_,expected_revision:oe})}return V&&V.queue&&_&&Ee.set(_,V.queue),V}function be(b,p){let _=Ee.get(b),A=o&&o.get?o.get():null,Y=(Array.isArray(A)?A:[]).find(oe=>oe?.root_dir===b);return(_||Y)?.merge_queue?.find(oe=>oe.bead_id===p)?.continuation_action}async function le(b,p,_,A){let Y=await fe(b,p,_,A),V=Ee.get(_)?.revision??Y?.queue?.revision??A;return zn(Y,(oe,$e)=>fe(b,{...p,continuation:oe,decision_token:$e},_,V,!1),{refresh:oe=>fe(b,p,_,oe?.queue?.revision??Ee.get(_)?.revision??V,!1)})}async function je(b,p,_,A){let Y=await zn({continuation_mismatch:A},(oe,$e)=>fe("worker-merge-queue-add",{bead_id:p,continuation:oe,decision_token:$e},b,_,!1)),V=Y?.queue?.merge_queue?.find(oe=>oe.bead_id===p)?.continuation_action;Y?.applied!==!0&&V?.continuation===null&&V.mismatch&&await je(b,p,Y.queue.revision,V.mismatch)}async function Ke(b,p,_){let A=await fe("worker-discard",b,p,_);if(A&&A.discarded===!0){ye(zs(A),"success",5e3);return}if(A&&A.reason){ye(`\uD3D0\uAE30 \uC2E4\uD328: ${A.reason}`,"error");return}if(A&&A.accepted&&A.pending==="merged_revert"){ye("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success");return}if(A&&A.accepted){ye(`\uD3D0\uAE30 \uC9C4\uD589: ${A.phase||"\uBC31\uC5C5 \uC911"}`,"success");return}A&&!A.conflict&&ye("\uD3D0\uAE30 \uAC70\uBD80: unknown","error")}async function Je(b,p,_){return!s||!_?null:await s(b,{...p,root_dir:_})}async function De(){let b=new Map;for(let p of S.pr_wait)b.has(p.root_dir)||b.set(p.root_dir,p.expected_revision);for(let[p,_]of b)await fe("worker-merge-queue-add-all",{},p,_)}function Q(b){let p=j[b];return!!(p&&p.runnable===!0)}function U(b){let p={...j[b]||{}};p.runnable=!p.runnable,j={...j,[b]:p},ky(j),Le()}function qe(b){H.toggle(b),Le()}function dt(b){H.toggleArea(b),Le()}function tt(b){let p=b.dependency_chips||null,_=b.overlap_chips||[],A=b.scope_state==="missing",Y=b.armed_lane_chip;return!p&&_.length===0&&!A&&!Y?null:{...p||{},..._.length>0?{overlaps:_}:{},...A?{scope_missing:!0}:{},...Y?{armed_lane:Y}:{}}}function v(b){return Qs(b,p=>N.isOpen({bead_id:b.id,chip_key:p}))}function z(b){let p=tt(b),_=v(b);return p||_?{...b,...p?{dependency_chips:p}:{},..._?{chip_popover:_}:{}}:b}function Te(b){let p=Q(b.root_dir);return c`<header class="mon2-sec__hd">
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
    </header>`}function Re(b,p){return c`<div
      class="mon2-item"
      data-bead-id=${b.id}
      data-drag-kind="candidate"
      data-root-dir=${b.root_dir}
    >
      ${p}
    </div>`}function Be(b){if(O!==b.id)return null;let p=S.queue_groups.find(V=>V.root_dir===b.root_dir),_=b.place_lanes||[],A=S.cross_lanes_revision!==null,Y=[{id:"parallel",label:"\uBCD1\uB82C",count:b.place_index??0}];for(let V of S.chain_lanes)Y.push({id:`lane:${V.lane_id}`,label:`\uC5F0\uACB0 ${V.number} (${V.draft?"draft":"\uD655\uC815"}) \uB05D\uC5D0`,count:V.rows.length,group:"\uC5F0\uACB0 \uB808\uC778",disabled:!A});Y.push({id:"new-lane",label:"+ \uC0C8 \uC5F0\uACB0 \uB808\uC778",group:"\uC5F0\uACB0 \uB808\uC778",disabled:!A,title:A?"\uC774 \uC774\uC288\uB9CC \uB4E0 draft \uB808\uC778\uC744 \uB9CC\uB4ED\uB2C8\uB2E4":"\uC5F0\uACB0 \uB808\uC778 \uC800\uC7A5\uC18C\uB97C \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"});for(let V of _)Y.push({id:`serial:${V.id}`,label:`\uC9C1\uB82C ${Number(V.id.slice(1))}`,count:V.length,group:`${p?p.name:""} \uC9C1\uB82C`});return{bead_id:b.id,lanes:Y}}function Xe(b){return Re(b,c`${Sa(z(b),Be(b),{exec_chips_mode:"pinned_only",onOpenDoc:l?(p,_)=>l(_,b.root_dir):void 0})}`)}function ft(){return S.runnable_flat?c`<div class="mon2-flat" data-drop="candidate">
        ${S.runnable.map(b=>Xe(b))}
      </div>`:c`${S.runnable_sections.map(b=>{let p=Q(b.root_dir);return c`<section
        class="mon2-sec${p?" is-collapsed":""}"
        data-root-dir=${b.root_dir}
        data-section="runnable"
      >
        ${Te({root_dir:b.root_dir,name:b.name,count:b.items.length})}
        ${p?"":c`<div
              class="mon2-sec__body"
              data-lane="candidate"
              data-drop="candidate"
            >
              ${b.items.map(_=>Xe(_))}
            </div>`}
      </section>`})}`}function kt(b,p=!1){return c`<span class="worker-mini__rowops">
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
      ${An(z(b),{actions:kt(b,!0)})}
    </div>`}function $t(b,p,_,A){return c`<div
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
        >${Cy(p.seq)}</span
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
      ${A.includes(p.id)?c`<span
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
    </div>`}function mt(b){let p=S.cross_lanes_revision!==null,_=Z(b.lane_id),A=_?.held===!0,Y=_?.cycle===!0,V=_?_.mismatched:[],oe=se&&se.lane_id===b.lane_id?se.corrected:0;return c`<div class="mon2-clane" data-lane-id=${b.lane_id}>
      <header class="mon2-clane__hd">
        <span class="mon2-clane__name">${b.label}</span>
        <span class="mon2-clane__count">${b.rows.length}</span>
        <span class="mon2-clane__badge mon2-clane__badge--${b.state}"
          >${b.badge}</span
        >
        ${oe>0?c`<span
              class="mon2-clane__corrected"
              title="기존 blocks 의존이 드롭 순서를 이깁니다 — 그 순서로 다시 놓았습니다"
              >의존에 맞춰 ${oe}건 자동 교정</span
            >`:""}
        ${Y?c`<span
              class="mon2-clane__cycle"
              title="멤버들의 blocks 의존이 순환합니다 — 어느 순서도 의존을 만족시키지 못합니다"
              >⛔ 의존 사이클 — 자동 교정 불가</span
            >`:""}
        ${A?c`<span
              class="mon2-clane__hold"
              title="멤버 한 명의 의존 자료가 이 스냅샷에 아직 없습니다 — 다음 스냅샷이 채우면 교정합니다"
              >${ai}</span
            >`:""}
        ${b.draft?c`<button
              type="button"
              class="mon2-clane__confirm"
              data-lane-id=${b.lane_id}
              ?disabled=${!p||!b.can_confirm||A}
              title=${A?ai:b.can_confirm?"\uC778\uC811 \uC758\uC874\uC744 \uAC78\uACE0 \uBBF8\uC801\uC7AC \uBA64\uBC84\uB97C \uAC01\uC790 \uB808\uD3EC \uBCD1\uB82C \uD050 \uB05D\uC5D0 \uC62C\uB9BD\uB2C8\uB2E4":"\uBA64\uBC84\uAC00 2\uAC1C \uC774\uC0C1\uC774\uC5B4\uC57C \uD655\uC815\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4"}
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
            </div>`:b.rows.map(($e,Qe)=>$t(b,$e,Qe,V))}
      </div>
    </div>`}function Ue(b,p,_){return c`<div
      class="mon2-item"
      data-bead-id=${p.id}
      data-drag-kind="repo-serial"
      data-root-dir=${p.root_dir}
      data-lane-id=${b.id}
      data-row-index=${_}
      data-queue-index=${String(p.queue_index??0)}
    >
      ${An(z(p),{actions:kt(p)})}
    </div>`}function L(b){if(b.length===0)return"";let p=b.length-1;return`${b[0].id} \uC810\uC720${p>0?` +${p}`:""}`}function te(b){return c`<div
      class="mon2-item mon2-item--ghost"
      data-bead-id=${b.id}
    >
      ${An({id:b.id,title:b.title,lane:"running",draggable:!1,ghost:!0,badges:[b.badge]})}
    </div>`}function ve(b,p){let _=p.occupants,A=p.cross_wait_peers||[];return{id:p.id,pane_id:"",title:`${b.name} \xB7 \uC9C1\uB82C ${p.index+1}`,rows:[..._.map(Y=>te(Y)),...p.items.map((Y,V)=>Ue(p,Y,V))],count:p.items.length,empty:p.empty===!0,..._.length>0?{badge:c`<span
              class="mon2-lane__occupant"
              title=${_.map(Y=>`${Y.id} \u2014 ${Y.badge}`).join(`
`)}
              >${L(_)}</span
            >`,held:!0}:{},cycle:p.cycle,header_control:c`<button
        type="button"
        class="mon2-sec__worker"
        data-root-dir=${b.root_dir}
        title="이 레포의 Worker 탭으로 이동"
      >
        Worker ↗
      </button>`,...A.length>0?{after:c`${A.map(Y=>c`<div class="mon2-lane__cross-wait">
                  ⚠ 상호 정지 — ${Y.workspace_name}·${Y.lane}과 교차 대기
                </div>`)}`}:{}}}function E(){let b=S.cross_lanes_revision!==null,p=S.chain_lanes.some(_=>_.draft&&_.rows.length===0);return Js({parallel:{rows:S.parallel_rows.map((_,A)=>It(_,A)),count:S.parallel_rows.length,collapsed:H.isAreaCollapsed("parallel"),drop:{drop:"parallel"}},serial:{lanes:S.queue_groups.flatMap(_=>_.sublanes.serial.map(A=>({...ve(_,A),drop:{drop:"repo-serial",root_dir:_.root_dir,lane_id:A.id,lane_length:String(A.raw_length)}}))),collapsed:H.isAreaCollapsed("serial"),extra_panes:S.chain_lanes.map(_=>mt(_)),header_control:c`<button
          type="button"
          class="mon2-newlane"
          ?disabled=${p||!b}
          title=${b?p?"\uBE48 \uC5F0\uACB0 \uB808\uC778\uC774 \uC774\uBBF8 \uC788\uC2B5\uB2C8\uB2E4":"\uBE48 \uC5F0\uACB0 \uB808\uC778\uC744 \uD558\uB098 \uB9CC\uB4ED\uB2C8\uB2E4":"\uC5F0\uACB0 \uB808\uC778 \uC800\uC7A5\uC18C\uB97C \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"}
        >
          + 연결 레인
        </button>`,...S.cross_lanes_unreadable?{notice:c`<div class="mon2-clane__unreadable">
                연결 레인 저장소를 읽을 수 없음
              </div>`}:{}}})}function K(b){return c`<div class="worker-rungrid">
      ${S.running.length===0?c`<div class="worker-rungrid__empty">실행 세션 없음</div>`:S.running.map(p=>hl({bead_id:p.id,attempt_id:p.attempt_id||"",title:p.title,runner:p.runner??null,model:p.model??null,effort:p.effort??null,speed:p.speed??null,started_at:p.started_at??null,kind:p.kind,...p.kind==="session"?{updated_at:p.updated_at,session_refs:p.session_refs||[]}:{},workflow:p.workflow||null,resumed_from:p.resumed_from??null,continuation_mode:p.continuation_mode??null,paused:p.run_state==="paused",failed:p.run_state==="failed",parked:p.run_state==="parked",retry_wait:p.run_state==="retry_wait",waiting:p.run_state==="waiting",wait:p.wait||null,retry:p.retry||null,status:p.status,status_label:p.run_state==="failed"?"\uC2E4\uD328":p.run_state==="parked"?"\uC138\uC158 \uB300\uAE30":p.run_state==="retry_wait"?"\uC7AC\uC2DC\uB3C4 \uB300\uAE30":p.run_state==="waiting"?"\uC120\uD589 \uB300\uAE30":void 0,can_pause:p.can_pause!==!1,exec_chips:p.exec_chips||null,usage:p.usage||null,chip_popover:v(p),discard:p.discard,failure:p.failure?{...p.failure,open:I===p.attempt_id}:null},b,F,{monitor:{repo:p.workspace_name,root_dir:p.root_dir,serial_lane_id:p.serial_lane_id,cross_lane_chip:p.cross_lane_chip||null,last_activity:p.last_activity||null,legs:p.legs||[],dependency_chips:tt(p)}}))}
    </div>`}function Ie(b){let p={runnable:S.runnable,queue:S.queue,running:S.running,pr_wait:S.pr_wait,done:S.done},_=A=>{let Y=p[A.lane],V=A.lane==="runnable"?S.runnable_flat?Y.length>0?ft():void 0:S.runnable_sections.length>0?ft():void 0:A.lane==="queue"?S.queue_groups.length>0||S.chain_lanes.length>0||S.parallel_rows.length>0||S.cross_lanes_unreadable?E():void 0:A.lane==="running"?K(b):Y.length>0?c`${Y.map(oe=>An(z(oe)))}`:void 0;return Nn({id:`monitor-${A.lane}`,lane:A.pane,title:A.title,items:Y,count:Y.length,src:A.lane==="runnable",empty:A.empty,body:V,live:A.lane==="running"&&Y.length>0,collapsible:!0,collapsed:H.isCollapsed(A.pane),controls:A.lane==="runnable"?We():void 0,header_control:Ne(A.lane,Y.length)})};if(ne){let A=Ty.map(Y=>Tp.find(V=>V.lane===Y)).filter(Y=>Y!==void 0);return c`<div class="mon2-deck"></div>
        <div class="worker-lanes-host">
          <div class="worker-lanes worker-lanes--mobile mon2-lanes">
            ${ei({live:S.running.length>0,running_body:S.running.length>0?K(b):"",pr_wait_rows:S.pr_wait.map(Y=>An(z(Y))),count:S.running.length+S.pr_wait.length})}
            ${A.map(Y=>_(Y))}
          </div>
        </div>`}return c`<div class="mon2-deck"></div>
      <div class="worker-lanes-host">
        <div class="worker-lanes mon2-lanes">
          ${Tp.map(A=>_(A))}
        </div>
      </div>`}function We(){return c`<div class="worker-filter">
      <label class="worker-filter__tgl" title="blocked 이슈 표시">
        <input
          type="checkbox"
          class="mon-filter__blocked"
          .checked=${k.show_blocked}
        />
        🔒
        blocked${S.runnable_hidden.blocked>0?` ${S.runnable_hidden.blocked}`:""}
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
        ${S.runnable_hidden.spec>0?c`<span class="worker-filter__hidden"
              >숨김 ${S.runnable_hidden.spec}</span
            >`:""}
      </div>
    </div>`}function Ne(b,p){return b==="runnable"?c`<select
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
        .value=${h}
      >
        ${Mr.map(_=>c`<option value=${_.value} ?selected=${h===_.value}>
              ${_.label}
            </option>`)}
      </select>`:""}function nt(b){let p=o&&o.get?o.get():null,_=o&&o.getWorkspacesState?o.getWorkspacesState():[],A=b===void 0?o&&o.crossLanes?o.crossLanes():void 0:b,Y={done_since:yr(h,d()),running_sort:m,candidate_filter:k,candidate_sort:R};return A!==void 0&&(Y.cross_lanes=A),lr(p,_,Y)}function Le(){let b=d();S=nt(),W=null,J=new Map;for(let p of[...S.runnable,...S.queue,...S.running,...S.pr_wait,...S.done])!p.non_occupying&&!J.has(p.id)&&J.set(p.id,p);it(Ie(b),ue),et()?.render(),Ge(),yt()}function Ge(){let b=new Map;for(let p of S.queue_groups)b.set(p.root_dir,p.auto_advance);for(let p of Array.from(ue.querySelectorAll(".worker-wait__area--parallel .worker-mini__repo"))){let _=p.closest(".mon2-item")?.getAttribute("data-root-dir")||"",A=b.get(_);typeof A=="boolean"&&p.setAttribute("title",`${p.textContent||""} \xB7 ${A?"\uC790\uB3D9\uD654 \uCF1C\uC9D0":"\uC790\uB3D9\uD654 \uAEBC\uC9D0"}`)}}function et(){if(pe)return pe;let b=ue.querySelector(".mon2-deck");return b?(pe=Sp(b,{workspacesState:()=>o&&o.getWorkspacesState?o.getWorkspacesState():[],doneItems:()=>S.done,rangeLabel:he,transport:s,implPresetStore:t.execPresetStore,gotoWorkerTab:At,onFocusChange:p=>{B=p,yt()}}),pe):null}function yt(){ue.classList.toggle("has-focus",B!==null);for(let b of Array.from(ue.querySelectorAll(".mon2-sec[data-root-dir]")))b.classList.toggle("is-focus",B!==null&&b.getAttribute("data-root-dir")===B);for(let b of Array.from(ue.querySelectorAll(".mon2-item[data-bead-id], .rtile[data-bead-id], .worker-mini[data-bead-id], .worker-card[data-bead-id]"))){let p=J.get(b.getAttribute("data-bead-id")||"");b.classList.toggle("is-focus",B!==null&&!!p&&p.root_dir===B)}for(let b of Array.from(ue.querySelectorAll(".mon2-crow[data-root-dir]")))b.classList.toggle("is-focus",B!==null&&b.getAttribute("data-root-dir")===B)}function He(b,p){let _=i?i():void 0;if(!p||!_||p===_||!a){r(b);return}a(p).then(()=>{r(b)}).catch(A=>{n("workspace switch for %s failed: %o",p,A)})}function At(b){if(!b)return;let p=i?i():void 0,_=()=>{try{u?.gotoView("worker")}catch(A){n("gotoView(worker) failed: %o",A)}};if(!a||p&&p===b){_();return}a(b).then(_).catch(A=>{n("workspace switch for %s failed: %o",b,A),ye("\uB808\uD3EC \uC804\uD658\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error")})}function qt(b){on(b).then(p=>{ye(p?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",p?"success":"error",1400)})}function ut(b){let p=J.get(b)||null;return{item:p,root_dir:p?p.root_dir:"",revision:p?p.expected_revision:0}}async function Vt(b,p,_){if(b!=="dep-add")return;let A=S.chain_lanes.find(Y=>Y.rows.some(V=>V.id===p));!A||!A.rows.some(Y=>Y.id===_)||await re(Y=>Xu(A.lane_id,Y),"",[{type:b,a:p,b:_}])}function Et(){return(o&&o.crossLanes?o.crossLanes():null)??null}async function Mt(b,p){if(b==="run"){await Xt(p);return}if(b==="stop"){await tn(p);return}if(b==="create"){await re(_=>Na(null,_),"");return}if(b==="remove"){let _=Zu(p,M());if(_!==null&&!f(_))return;await re(A=>Qu(p,A),"");return}await re(_=>b==="confirm"?Yu(p,_):Vu(p,_),"")}function Wt(b){let p=new Map;for(let _ of b.rows){let A=S.owner_of[_.id]||_.root_dir;typeof A!="string"||A.length===0||p.set(A,[...p.get(A)||[],_.id])}return p}async function Xt(b){let p=S.chain_lanes.find(V=>V.lane_id===b);if(!p||S.cross_lanes_revision===null){Le();return}Se();let _=new Map,A=new Map,Y=Wt(p);for(let V of p.rows){if(!V.unplaced)continue;let oe=S.owner_of[V.id]||V.root_dir;if(typeof oe!="string"||oe.length===0){ye(`${V.id}\uC758 \uB808\uD3EC\uB97C \uC54C \uC218 \uC5C6\uC5B4 \uC801\uC7AC\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4`,"error"),Le();return}let $e=A.get(oe)??0;if(await ae("worker-queue-place",{bead_id:V.id,lane:"parallel",index:(S.parallel_raw_length[oe]??0)+$e},oe,_,{bead_id:V.id})===null){Le();return}A.set(oe,$e+1)}for(let[V,oe]of Y)if(await ae("worker-queue-arm",{bead_ids:oe,lane_id:b},V,_,{bead_id:oe[0]})===null){ye("\uC77C\uBD80 \uB808\uD3EC\uC5D0\uC11C \uC9C4\uD589\uC744 \uCF1C\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 \u2014 [\u25B6 \uC774\uC5B4\uC11C \uC9C4\uD589]\uC73C\uB85C \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC138\uC694","error"),Le();return}Le()}async function tn(b){let p=S.chain_lanes.find(A=>A.lane_id===b);if(!p||S.cross_lanes_revision===null){Le();return}Se();let _=new Map;for(let[A,Y]of Wt(p))if(await ae("worker-queue-disarm",{lane_id:b},A,_,{bead_id:Y[0]})===null)break;Le()}async function zt(b,p){let{root_dir:_,revision:A}=ut(b);if(_.length===0){Le();return}await ae("worker-queue-disarm",{bead_ids:[b],lane_id:p},_,new Map([[_,A]]),{bead_id:b}),Le()}async function Ft(b,p){let _=J.get(b);if(!_){Le();return}let A={kind:"candidate",bead_id:b,root_dir:_.root_dir};if(p==="new-lane"){await re(Y=>Na({bead_id:b,root_dir:_.root_dir},Y),b);return}if(p.startsWith("lane:")){let Y=p.slice(5);if(!S.chain_lanes.find(oe=>oe.lane_id===Y)){Le();return}await re(oe=>ci(A,{kind:"chain",lane_id:Y,marker_index:(oe.cross_lanes.get(Y)?.entries??[]).length},oe),b);return}if(p.startsWith("serial:")){let Y=p.slice(7),V=(_.place_lanes||[]).find(oe=>oe.id===Y);await Ve(A,{kind:"repo-serial",root_dir:_.root_dir,lane_id:Y,index:V?V.index:0});return}await Ve(A,{kind:"parallel",marker_index:S.parallel_rows.length})}async function un(b,p){let _=S.parallel_rows,A=_.findIndex(at=>at.id===b);if(A<0)return;let Y=_[A].root_dir,V=[];_.forEach((at,vt)=>{at.root_dir===Y&&V.push(vt)});let oe=V.indexOf(A),$e=V[oe+p];if(typeof $e!="number")return;let Qe=p===-1?$e:V[oe+2]??Math.min(_.length,$e+1);await Ve({kind:"parallel",bead_id:b,root_dir:Y,queue_index:_[A].queue_index??0},{kind:"parallel",marker_index:Qe})}async function Pt(b){for(let p of S.chain_lanes){let _=p.rows.find(A=>A.id===b);if(_){await Ve({kind:"chain",bead_id:b,root_dir:_.root_dir,lane_id:p.lane_id,...typeof _.queue_index=="number"?{queue_index:_.queue_index}:{}},{kind:"parallel",marker_index:S.parallel_rows.length});return}}}function Kt(b){return{runner:b.runner||void 0,model:b.model||void 0,effort:b.effort||void 0,status:b.run_state==="running"?"running":b.run_state,worktree:b.root_dir}}function jt(b,p){let{item:_,root_dir:A,revision:Y}=ut(p),V=_?.attempt_id||"",oe=b.classList;if(oe.contains("worker-mini__rowops-up")||oe.contains("worker-mini__rowops-down")){un(p,oe.contains("worker-mini__rowops-up")?-1:1);return}if(oe.contains("worker-mini__rowops-remove")){fe("worker-queue-remove",{bead_id:p},A,Y);return}if(oe.contains("mon2-crow__detach")){Pt(p);return}if(oe.contains("worker-dep__open")){He(b.getAttribute("data-dep-id")||"",b.getAttribute("data-root-dir")||"");return}if(oe.contains("mon2-arm__release")){zt(p,b.getAttribute("data-lane-id")||"");return}if(oe.contains("mon-lane__chip")){let $e=b.getAttribute("data-lane-id")||"";ue.querySelector(`.mon2-clane[data-lane-id="${$e}"]`)?.scrollIntoView({block:"nearest"});return}if(oe.contains("judgement-chip")){let $e=b.getAttribute("data-chip-key")||"";$e&&N.toggle({bead_id:p,chip_key:$e});return}if(oe.contains("rtile__failure-badge")){I=I===V?null:V,Le();return}if(oe.contains("rtile__attempt-copy")){let $e=b.getAttribute("data-attempt-id")||"";$e&&on($e).then(Qe=>{ye(Qe?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",Qe?"success":"error",1400)});return}if(oe.contains("worker-card__place")){O=O===p?null:p,Le();return}if(oe.contains("worker-card__place-cancel")){O=null,Le();return}if(oe.contains("worker-card__place-lane")){let $e=b.getAttribute("data-lane")||"parallel";O=null,Ft(p,$e);return}if(oe.contains("rtile__session")){if(_&&_.kind==="session"){let $e=(_.session_refs||[]).find(Qe=>Qe&&Qe.current===!0);$e&&(D.hidden=!1,Pe.open(Hr($e,p,"in_progress",A)),Le());return}F=V,V&&_&&(D.hidden=!1,Pe.open({attempt_id:V,root_dir:A,meta:Kt(_)})),Le();return}if(oe.contains("rtile__pause")){Je("worker-attempt-pause",{attempt_id:V},A);return}if(oe.contains("rtile__resume")){zr().then($e=>{if($e!==null)return le("worker-attempt-resume",{attempt_id:V,...$e!==""?{instructions:$e}:{}},A,Y)});return}if(oe.contains("rtile__parked-retry")){Je("worker-parked-retry",{bead_id:p,attempt_id:V},A).then($e=>{$e&&$e.ok===!1&&ye(`\uC7AC\uC2DC\uB3C4 \uAC70\uBD80: ${$e.reason==="not_latest"?"\uC774 bead\uC5D0 \uB354 \uC0C8\uB85C\uC6B4 \uC2DC\uB3C4\uAC00 \uC788\uC2B5\uB2C8\uB2E4":$e.reason||""}`,"error")});return}if(oe.contains("rtile__discard")){let $e=b.dataset.confirmation==="merged"?"merged":"unmerged";if(!f(Ro(p,$e)))return;Ke({bead_id:p,...V?{attempt_id:V}:{},...b.dataset.operationId?{operation_id:b.dataset.operationId}:{}},A,Y);return}if(oe.contains("worker-mini__merge")){let $e=be(A,p);$e?.mismatch&&$e.continuation===null?je(A,p,Y,$e.mismatch):fe("worker-merge-queue-add",{bead_id:p},A,Y);return}if(oe.contains("worker-mini__merge-cancel")){fe("worker-merge-queue-remove",{bead_id:p},A,Y);return}if(oe.contains("worker-mini__discard")){let $e=b.dataset.discardMode==="merged"?"merged":"unmerged";if(!f(Ro(p,$e)))return;Ke({bead_id:p,...b.dataset.attemptId?{attempt_id:b.dataset.attemptId}:{},...b.dataset.operationId?{operation_id:b.dataset.operationId}:{}},A,Y);return}if(oe.contains("worker-mini__revise-fix")){le("worker-revise-fix",{bead_id:p},A,Y);return}oe.contains("worker-mini__revise-approve")&&fe("worker-revise-approve",{bead_id:p},A,Y)}function Qt(b){let p=st.consumeClickSuppression(),_=b.target;if(!_||typeof _.closest!="function"||_.closest("dialog")||_.closest(".worker-drawer-overlay")||_.closest("a"))return;let A=_.closest(".worker-card__id, .worker-mini__id, .rtile__id");if(A){b.preventDefault();let Oe=_.closest(".mon2-item, .rtile, .mon2-crow, .worker-mini")?.getAttribute("data-bead-id")||A.textContent?.trim()||"";Oe&&qt(Oe);return}let Y=_.closest(".worker-mini__repo, .worker-card__repo, .mon2-sec__worker");if(Y){b.preventDefault();let x=Y.getAttribute("data-root-dir")||J.get(_.closest(".mon2-item, .rtile, .worker-mini")?.getAttribute("data-bead-id")||"")?.root_dir||Y.getAttribute("title")||"";At(x);return}let V=_.closest(".mon2-sec__toggle");if(V){b.preventDefault(),U(V.getAttribute("data-root-dir")||"");return}let oe=_.closest(".worker-pane__toggle[data-lane]");if(oe){b.preventDefault();let x=oe.getAttribute("data-lane")||"";(x==="candidate"||x==="queue"||x==="running"||x==="pr_wait"||x==="done")&&qe(x);return}let $e=_.closest(".worker-wait__area-toggle[data-area]");if($e){b.preventDefault(),dt($e.getAttribute("data-area")||"parallel");return}if(_.closest(".mon2-newlane")){b.preventDefault(),Mt("create","");return}let Qe=_.closest(".mon2-clane__confirm, .mon2-clane__reapply, .mon2-clane__remove, .mon2-clane__run, .mon2-clane__stop");if(Qe){b.preventDefault();let x=Qe.getAttribute("data-lane-id")||"",Oe=Qe.classList;Mt(Oe.contains("mon2-clane__confirm")?"confirm":Oe.contains("mon2-clane__reapply")?"reapply":Oe.contains("mon2-clane__run")?"run":Oe.contains("mon2-clane__stop")?"stop":"remove",x);return}if(_.closest(".mon-merge-all")){b.preventDefault(),De();return}let at=_.closest(".mon-filter__spec");if(at){b.preventDefault(),k={...k,spec:at.getAttribute("data-spec")||"all"},Ep(k),Le();return}let vt=_.closest(".mon2-item, .rtile, .mon2-crow, .worker-mini, .worker-card");if(!vt)return;let gt=vt.getAttribute("data-bead-id")||"",$=_.closest("button");if($){b.preventDefault(),jt($,gt);return}_.closest(".rtile__failure-pop, .chip-popover")||gt&&!p&&(b.preventDefault(),He(gt,vt.getAttribute("data-root-dir")||ut(gt).root_dir))}function de(b){let p=b.target;if(!p||typeof p.closest!="function")return;let _=p.closest(".mon-filter__blocked");if(_){k={...k,show_blocked:_.checked},Ep(k),Le();return}let A=p.closest(".mon-candidate-sort");if(A){R=Mo.some(oe=>oe.value===A.value)?A.value:"repo_spec",vy(R),Le();return}let Y=p.closest(".mon-running-sort");if(Y){m=Y.value==="repo"?"repo":"started",Sy(m),Le();return}let V=p.closest(".mon-done-range");V&&(h=Mn(V.value),xy(h),Le())}function T(b){let p=b.target,_=p&&typeof p.closest=="function"?A=>p.closest(A):()=>null;I&&!_(".rtile__failure-pop, .rtile__failure-badge")&&(I=null,Le())}function me(b){b.key!=="Escape"||I===null||(I=null,Le())}e.addEventListener("click",Qt),e.addEventListener("change",de),document.addEventListener("click",T),document.addEventListener("keydown",me),N.attach(),st.attach(e);{let b=!0;X=Ti(p=>{if(ne=p,b){b=!1;return}Le()})}o&&typeof o.subscribe=="function"&&(_e=o.subscribe(()=>{try{Ee.clear(),Le()}catch{}}));function ce(){Ae!==null&&(clearInterval(Ae),Ae=null)}return{recorrectSharedLane:Vt,load(){n("load"),Le(),Ae===null&&(Ae=setInterval(()=>{try{Le()}catch{}},Ey))},pause(){ce()},clear(){ce(),st.detach(),_e&&(_e(),_e=null),X&&(X(),X=null),Pe.destroy(),D.hidden=!0,pe?.destroy(),pe=null,e.removeEventListener("click",Qt),e.removeEventListener("change",de),document.removeEventListener("click",T),document.removeEventListener("keydown",me),N.detach(),e.replaceChildren()}}}function Np(e,t,n){let r=Rt("views:nav"),{global_element:o,repo_element:s}=e,i=null;function l(h){return m=>{m.preventDefault();let k=h==="monitor"&&a()==="monitor"?"worker":h;r("click tab %s",k),n.gotoView(k)}}function a(){let h=t.getState();return h.view==="worker"||h.view==="monitor"?h.view:"board"}function u(){let h=a();return c`
      <a
        href="#/monitor"
        class="ctl-tab ctl-tab--monitor ${h==="monitor"?"is-active":""}"
        @click=${l("monitor")}
      >
        <span class="ctl-tab__dots" aria-hidden="true"
          ><i></i><i></i><i></i><i></i
        ></span>
        Monitor
      </a>
    `}function d(){let h=a();return c`
      <div class="ctl-tabs">
        <a
          href="#/board"
          class="ctl-tab ${h==="board"?"is-active":""}"
          @click=${l("board")}
          >Board</a
        >
        <a
          href="#/worker"
          class="ctl-tab ${h==="worker"?"is-active":""}"
          @click=${l("worker")}
          >Worker</a
        >
      </div>
    `}function f(){o&&it(u(),o),s&&it(d(),s)}return f(),i=t.subscribe(()=>f()),{destroy(){i&&(i(),i=null),o&&it(c``,o),s&&it(c``,s)}}}var qp=["bug","feature","task","epic","chore"];function Fp(e){switch((e||"").toString().toLowerCase()){case"bug":return"Bug";case"feature":return"Feature";case"task":return"Task";case"epic":return"Epic";case"chore":return"Chore";default:return""}}var jp=["Critical","High","Medium","Low","Backlog"];function Bp(e,t){let n=document.createElement("dialog");n.id="new-issue-dialog",n.setAttribute("role","dialog"),n.setAttribute("aria-modal","true"),n.innerHTML=`
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
  `,e.appendChild(n);let r=n.querySelector("#new-issue-form"),o=n.querySelector("#new-title"),s=n.querySelector("#new-type"),i=n.querySelector("#new-priority"),l=n.querySelector("#new-labels"),a=n.querySelector("#new-description"),u=n.querySelector("#new-issue-error"),d=n.querySelector("#btn-cancel"),f=n.querySelector("#btn-create"),h=n.querySelector(".new-issue__close");function m(){s.replaceChildren();let O=document.createElement("option");O.value="",O.textContent="\u2014 Select \u2014",s.appendChild(O);for(let I of qp){let N=document.createElement("option");N.value=I,N.textContent=Fp(I),s.appendChild(N)}i.replaceChildren();for(let I=0;I<=4;I+=1){let N=document.createElement("option");N.value=String(I);let B=jp[I]||"Medium";N.textContent=`${I} \u2013 ${B}`,i.appendChild(N)}}m();function k(){try{typeof n.close=="function"?n.close():n.removeAttribute("open")}catch{n.removeAttribute("open")}}function R(O){o.disabled=O,s.disabled=O,i.disabled=O,l.disabled=O,a.disabled=O,d.disabled=O,f.disabled=O,f.textContent=O?"Creating\u2026":"Create"}function j(){u.textContent=""}function H(O){u.textContent=O}function ne(){try{let O=window.localStorage.getItem("beads-ui.new.type");O?s.value=O:s.value="";let I=window.localStorage.getItem("beads-ui.new.priority");I&&/^\d$/.test(I)?i.value=I:i.value="2"}catch{s.value="",i.value="2"}}function X(){let O=s.value||"",I=i.value||"";O.length>0&&window.localStorage.setItem("beads-ui.new.type",O),I.length>0&&window.localStorage.setItem("beads-ui.new.priority",I)}async function F(){j();let O=String(o.value||"").trim();if(O.length===0){H("Title is required"),o.focus();return}let I=Number(i.value||"2");if(!(I>=0&&I<=4)){H("Priority must be 0..4"),i.focus();return}let N=String(s.value||""),B=String(a.value||""),se={title:O};N.length>0&&(se.type=N),String(I).length>0&&(se.priority=I),B.length>0&&(se.description=B),R(!0);try{await t("create-issue",se)}catch{R(!1),H("Failed to create issue");return}X(),R(!1),k()}return n.addEventListener("cancel",O=>{O.preventDefault(),k()}),h.addEventListener("click",()=>k()),d.addEventListener("click",()=>k()),n.addEventListener("keydown",O=>{O.key==="Enter"&&(O.ctrlKey||O.metaKey)&&(O.preventDefault(),F())}),r.addEventListener("submit",O=>{O.preventDefault(),F()}),{open(){r.reset(),j(),ne();try{"showModal"in n&&typeof n.showModal=="function"?n.showModal():n.setAttribute("open","")}catch{n.setAttribute("open","")}setTimeout(()=>{try{o.focus()}catch{}},0)},close(){k()}}}var Ry=[["route","route \uCE69"],["fast_track","\u26A1 fast_track \uCE69"],["pr","PR \uCE69"],["from","\u21A9 from \uCE69"],["blocked","blocked\xB7\uC0AC\uC6A9\uC790 \uB9AC\uBDF0 \uD544\uC694 \uCE69"],["stepper","stepper"]];function Oy(e,t){return Ji(e,t)?"shown":t.hidden_labels.includes(e)?"hidden_exact":"hidden_prefix"}function Up(e,t,n){return c`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">라벨 표시</div>
      <p class="settings-dialog__hint-block">
        라벨을 눌러 표시/숨김을 전환합니다. prefix 규칙으로 숨겨진 라벨을 누르면
        그 라벨만 예외로 다시 표시됩니다.
      </p>
      ${t.length===0?c`<div class="settings-dialog__empty">라벨 없음</div>`:c`<div class="settings-dialog__pills">
            ${t.map(r=>{let o=Oy(r,e);return c`<button
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
  `}function Wp(e,t,n){return c`
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
  `}function zp(e,t){return c`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">카드 표시 요소</div>
      <div class="settings-dialog__toggles">
        ${Ry.map(([n,r])=>c`<label class="settings-dialog__toggle">
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
  `}var Ly=[{id:"execution",label:"\uC2E4\uD589",glyph:"\u25C6"},{id:"display",label:"\uD45C\uC2DC",glyph:"\u25EB"}];function Hp(e,t){let{transport:n,policyStore:r,labelOptions:o}=t,s=t.notify||(ee=>ye(ee,"error",4e3)),i=document.createElement("dialog");i.id="settings-dialog",i.className="settings-dialog",i.setAttribute("role","dialog"),i.setAttribute("aria-modal","true"),i.setAttribute("aria-label","\uC124\uC815"),e.appendChild(i);let l="execution",a=!1,u="",d=null;function f(){if(d)return d;let ee=i.querySelector('[data-pane="execution"]');return ee?(d=Pi(ee,{root_dir:null,queue:()=>t.queueStore?.get()??null,transport:n,implPresetStore:t.implPresetStore,notify:s,onQueueAdopt:Se=>t.queueStore?.set?.(Se)}),d):null}function h(){return c`
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
              ${Up(ee,o(),H)}
              ${Wp(ee,u,{onDraft:Se=>{u=Se},onAdd:ne,onRemove:X})}
              ${zp(ee,F)}
            `:c`<div class="settings-dialog__empty">
              표시 정책을 불러오는 중…
            </div>`}
      </section>
    `}async function k(ee){let Se=r.get();if(Se)try{let he=await n("display-policy-set",{expected_revision:Se.revision,policy:ee(Se)});R(he),he&&he.conflict&&he.policy&&(he=await n("display-policy-set",{expected_revision:he.policy.revision,policy:ee(he.policy)}),R(he)),he&&he.conflict&&s("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC")}catch{s("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328")}}function R(ee){ee&&ee.policy&&typeof ee.policy=="object"&&r.set(ee.policy)}function j(ee){k(ee)}function H(ee){let Se=r.get();if(!Se)return;let he=!Iy(ee,Se);j(ue=>My(ee,ue,he))}function ne(){let ee=u.trim();ee.length!==0&&(u="",j(Se=>Se.hidden_prefixes.includes(ee)?{hidden_prefixes:Se.hidden_prefixes}:{hidden_prefixes:[...Se.hidden_prefixes,ee]}),O())}function X(ee){j(Se=>({hidden_prefixes:Se.hidden_prefixes.filter(he=>he!==ee)}))}function F(ee){let Se=r.get();if(!Se)return;let he=Se.chips[ee]===!1;j(()=>({chips:{[ee]:he}}))}function O(){it(c`
        <div class="settings-dialog__container">
          <nav
            class="settings-dialog__rail"
            role="tablist"
            aria-orientation="vertical"
          >
            <div class="settings-dialog__rail-title">설정</div>
            ${Ly.map(ee=>c`<button
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
            ${h()} ${m()}
          </div>
        </div>
      `,i),f()}function I(ee){l=ee,O()}let N=()=>{a=!1,t.onOpenChange?.(!1)};i.addEventListener("close",N),i.addEventListener("cancel",N);let B=ee=>{ee.target===i&&Z()};i.addEventListener("click",B);let se=null;r.subscribe&&(se=r.subscribe(()=>{a&&O()}));let q=null;t.implPresetStore?.subscribe&&(q=t.implPresetStore.subscribe(()=>{a&&d?.render()}));function W(ee="execution"){a||(a=!0,t.onOpenChange?.(!0),l=ee,u="",O(),typeof i.showModal=="function"?i.showModal():i.setAttribute("open",""),f()?.load())}function Z(){a&&(a=!1,t.onOpenChange?.(!1),typeof i.close=="function"?i.close():i.removeAttribute("open"))}return{open:W,close:Z,sessionDraft:()=>d?.sessionDraft()??{},destroy(){a=!1,i.removeEventListener("close",N),i.removeEventListener("cancel",N),i.removeEventListener("click",B),se&&(se(),se=null),q&&(q(),q=null),d?.destroy(),d=null,i.remove()}}}function Iy(e,t){return t.visible_labels.includes(e)?!0:t.hidden_labels.includes(e)?!1:!t.hidden_prefixes.some(n=>n.length>0&&e.startsWith(n))}function My(e,t,n){if(!n)return{hidden_labels:t.hidden_labels.includes(e)?t.hidden_labels:[...t.hidden_labels,e],visible_labels:t.visible_labels.filter(s=>s!==e)};let r=t.hidden_labels.filter(s=>s!==e);return t.hidden_prefixes.some(s=>s.length>0&&e.startsWith(s))?{hidden_labels:r,visible_labels:t.visible_labels.includes(e)?t.visible_labels:[...t.visible_labels,e]}:{hidden_labels:r}}var Py=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],Gp="usage-meter-card",Dy="usage-meter-layer",yl=600,Ny=["token_expired","relogin_required"];function Kp(e){return String(e).padStart(2,"0")}function qy(e,t){let n=Math.max(0,Math.ceil((e-t)/6e4)),r=Math.floor(n/1440),o=Math.floor(n%1440/60),s=n%60;return r>0?`${r}d${o>0?` ${o}h`:""}`:o>0?`${o}h${s>0?` ${s}m`:""}`:`${s}m`}function Yp(e,t=Date.now()){let n=Date.parse(e);if(!Number.isFinite(n))return"";let r=new Date(n),o=new Date(t),s=`${Kp(r.getHours())}:${Kp(r.getMinutes())}`,l=r.getFullYear()===o.getFullYear()&&r.getMonth()===o.getMonth()&&r.getDate()===o.getDate()?s:`${Py[r.getMonth()]} ${r.getDate()} ${s}`;return`${qy(n,t)} \xB7 ${l}`}function Fy(e){let t=Math.max(0,Math.floor(e));return t<60?`${t}\uCD08 \uC804`:t<3600?`${Math.floor(t/60)}\uBD84 \uC804`:`${Math.floor(t/3600)}\uC2DC\uAC04 \uC804`}function Vp(e){return e>=85?"usage-meter__window--danger":e>=60?"usage-meter__window--warn":"usage-meter__window--success"}function Xp(e){let t=typeof e=="number"&&Number.isFinite(e)?e:0;return Math.min(100,Math.max(0,t))}var Qp=[{key:"claude",label:"Claude",endpoint:"/api/claude-usage",switch_endpoint:"/api/claude-account/switch",tool:"cswap"},{key:"codex",label:"Codex",endpoint:"/api/codex-usage",switch_endpoint:"/api/codex-account/switch",tool:"codex-auth"}];function Jp(e){let t=[];for(let n of e){if(!n||typeof n!="object")continue;let r=n;typeof r.key!="string"||r.key.length===0||typeof r.pct!="number"||!Number.isFinite(r.pct)||t.push({key:r.key,pct:r.pct,resetsAt:typeof r.resetsAt=="string"?r.resetsAt:""})}return t}function jy(e){if(!e||typeof e!="object")return null;let t=e;return!Number.isInteger(t.number)||t.number<=0||typeof t.email!="string"||t.email.length===0||typeof t.status!="string"||t.status.length===0||typeof t.active!="boolean"||!Array.isArray(t.windows)?null:{number:t.number,email:t.email,alias:typeof t.alias=="string"&&t.alias.length>0?t.alias:null,plan:typeof t.plan=="string"&&t.plan.length>0?t.plan:null,active:t.active,status:t.status,windows:Jp(t.windows),fetchedAt:typeof t.fetchedAt=="string"?t.fetchedAt:null,ageSeconds:typeof t.ageSeconds=="number"&&Number.isFinite(t.ageSeconds)?t.ageSeconds:null}}function By(e,t){if(!e||typeof e!="object")return null;let n=e,r=[];if(Array.isArray(n.accounts))for(let s of n.accounts){let i=jy(s);i&&r.push(i)}let o=n.available===!0&&Array.isArray(n.windows);return!o&&r.length===0?null:{available:o,windows:o?Jp(n.windows):[],ageSeconds:typeof n.ageSeconds=="number"&&Number.isFinite(n.ageSeconds)?n.ageSeconds:null,accounts:r,receivedAtMs:t,held:!1}}function Uy(e,t){if(!e||typeof e!="object")return{kind:"error"};let n=By(e,t);return n?{kind:"ok",snapshot:n}:Array.isArray(e.accounts)?{kind:"empty"}:{kind:"error"}}function ef(e,t){return(e.ageSeconds===null?0:e.ageSeconds)+Math.max(0,t-e.receivedAtMs)/1e3}function Wy(e,t){return!e.held||ef(e,t)<=yl?e:{...e,available:!1,windows:[],accounts:[]}}function Zp(e,t){return`${e}:${t}`}function tf(e){let t=!1,n=null,r=new Map,o=null,s=new Map,i=new Map,l=0,a=null;function u(){it(c``,e),e.hidden=!0,f()}function d(){if(a===null){let ue=e.ownerDocument;a=ue.createElement("div"),a.id=Dy,a.className="usage-meter__layer",ue.body.appendChild(a)}return a}function f(){a!==null&&(it(c``,a),a.remove(),a=null)}function h(ue){n!==ue&&(n===null&&(document.addEventListener("mousedown",k),document.addEventListener("keydown",j),window.addEventListener("resize",R)),n=ue)}function m(){n!==null&&(n=null,document.removeEventListener("mousedown",k),document.removeEventListener("keydown",j),window.removeEventListener("resize",R))}function k(ue){let D=ue.target;D&&(e.contains(D)||a!==null&&a.contains(D))||(m(),Z())}function R(){Z()}function j(ue){ue.key==="Escape"&&(m(),Z())}function H(ue){n===ue?m():h(ue),Z()}function ne(){m(),Z()}async function X(ue,D){if(r.has(ue.key))return;let ke=Zp(ue.key,D);r.set(ue.key,D),i.delete(ke),Z();let xe=null;try{xe=await(await fetch(ue.switch_endpoint,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({number:D})})).json()}catch{xe=null}if(t)return;if(r.delete(ue.key),!xe||xe.ok!==!0){let J=xe&&typeof xe.error=="string"&&xe.error.length>0?xe.error:"network_error";i.set(ke,{kind:"error",text:`\uC804\uD658 \uC2E4\uD328 \u2014 ${J}`}),Z();return}let S=Array.isArray(xe.warnings)?xe.warnings.filter(J=>typeof J=="string"&&J.length>0):[];S.length>0&&i.set(ke,{kind:"warn",text:S.join(" \xB7 ")}),Z(),await he()}function F(ue,D,ke,xe){let S=Xp(ue.pct),Ee=`resets ${Yp(ue.resetsAt,xe)}${D?` \xB7 ${ke}`:""}`;return c`<span
      class="usage-meter__window ${Vp(S)}"
      style=${`--progress: ${S}%`}
      title=${Ee}
    >
      <span class="usage-meter__label">${ue.key}</span>
      <span class="usage-meter__track" aria-hidden="true">
        <span class="usage-meter__fill"></span>
      </span>
      <span class="usage-meter__pct">${S}%</span>
    </span>`}function O(ue,D,ke){let xe=ef(D,ke),S=D.available&&(D.held||xe>yl),J=S?`${Math.floor(xe/60)}\uBD84 \uC804 \uCE21\uC815`:"",Ee=D.accounts.filter(Pe=>!Pe.active).length,_e=`usage-meter__group${S?" usage-meter__group--stale":""}`,Ae=c`<span class="usage-meter__provider"
        >${ue.label}</span
      >
      ${D.available?D.windows.map(Pe=>F(Pe,S,J,ke)):c`<span class="usage-meter__empty">사용량 없음</span>`}
      ${Ee>0?c`<span class="usage-meter__badge">+${Ee}</span>`:""}`;if(D.accounts.length===0)return c`<span
        class=${_e}
        aria-label=${`${ue.label} usage`}
        >${Ae}</span
      >`;let pe=n===ue.key;return c`<button
      type="button"
      class=${`usage-meter__toggle ${_e}`}
      aria-label=${`${ue.label} usage`}
      aria-expanded=${pe?"true":"false"}
      aria-controls=${Gp}
      @click=${()=>H(ue.key)}
    >
      ${Ae}
    </button>`}function I(ue,D){return c`<span class="usage-meter" aria-label="Usage">
      ${ue.map(ke=>O(ke.provider,ke.snapshot,D))}
    </span>`}function N(ue,D){let ke=Xp(ue.pct),xe=Yp(ue.resetsAt,D);return c`<span
      class="usage-meter__account-window ${Vp(ke)}"
      style=${`--progress: ${ke}%`}
    >
      <span class="usage-meter__account-key">${ue.key}</span>
      <span class="usage-meter__account-track" aria-hidden="true">
        <span class="usage-meter__account-fill"></span>
      </span>
      <span class="usage-meter__account-pct">${ke}%</span>
      <span class="usage-meter__account-reset"
        >${xe.length>0?`\u21BB ${xe}`:""}</span
      >
    </span>`}function B(ue,D){return Ny.includes(D)?`\uD1A0\uD070 \uB9CC\uB8CC \u2014 ${ue.tool} \uC7AC\uB85C\uADF8\uC778 \uD544\uC694`:"\uC0AC\uC6A9\uB7C9 \uC5C6\uC74C"}function se(ue,D,ke){let xe=D.status==="ok",S=typeof D.ageSeconds=="number"&&D.ageSeconds>yl,J=i.get(Zp(ue.key,D.number)),Ee=r.get(ue.key),_e=Ee!==void 0,Ae=Ee===D.number,pe=["usage-meter__account"];return D.active&&pe.push("usage-meter__account--active"),xe||pe.push("usage-meter__account--unavailable"),S&&pe.push("usage-meter__account--stale"),c`<div class=${pe.join(" ")}>
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
              >${Fy(D.ageSeconds)}</span
            >`}
        ${D.active?"":c`<button
              type="button"
              class="usage-meter__switch"
              ?disabled=${_e}
              @click=${()=>{X(ue,D.number)}}
            >
              ${Ae?"\uC804\uD658 \uC911\u2026":"\uC804\uD658"}
            </button>`}
      </div>
      ${xe?c`<div class="usage-meter__account-windows">
            ${D.windows.map(Pe=>N(Pe,ke))}
          </div>`:c`<div class="usage-meter__account-status">
            ${B(ue,D.status)}
          </div>`}
      ${J===void 0?"":c`<div
            class="usage-meter__account-message usage-meter__account-message--${J.kind}"
          >
            ${J.text}
          </div>`}
    </div>`}function q(ue,D,ke){let xe=D.accounts.filter(S=>S.active).length;return c`<section class="usage-meter__section">
      <h2 class="usage-meter__section-title">
        ${ue.label} · 활성 ${xe} / 전체
        ${D.accounts.length}
      </h2>
      ${D.accounts.map(S=>se(ue,S,ke))}
    </section>`}function W(ue,D){return c`<div
      class="usage-meter__card"
      id=${Gp}
      role="dialog"
      aria-label=${`${ue.provider.label} \uACC4\uC815 \uC0AC\uC6A9\uB7C9`}
    >
      ${q(ue.provider,ue.snapshot,D)}
      <p class="usage-meter__note">전환은 새로 시작하는 세션부터 적용됩니다.</p>
    </div>`}function Z(){let ue=Date.now(),D=[];for(let xe of Qp){let S=s.get(xe.key);S&&D.push({provider:xe,snapshot:Wy(S,ue)})}if(D.length===0){m(),u();return}let ke=D.find(xe=>xe.provider.key===n&&xe.snapshot.accounts.length>0);ke||m(),it(I(D,ue),e),e.hidden=!1,ke?ee(ke,ue):f()}function ee(ue,D){let ke=d(),xe=e.getBoundingClientRect(),S=e.ownerDocument.documentElement.clientWidth;ke.style.setProperty("--usage-meter-anchor-top",`${xe.bottom}px`),ke.style.setProperty("--usage-meter-anchor-right",`${Math.max(0,S-xe.right)}px`),it(c`<div
          class="usage-meter__scrim"
          aria-hidden="true"
          @mousedown=${ne}
        ></div>
        ${W(ue,D)}`,ke)}async function Se(ue){try{let D=await fetch(ue.endpoint);return D.ok?Uy(await D.json(),Date.now()):{kind:"error"}}catch{return{kind:"error"}}}async function he(){l+=1;let ue=l,D=await Promise.all(Qp.map(async ke=>({provider:ke,read:await Se(ke)})));if(!(t||ue!==l)){for(let ke of D){let xe=ke.provider.key;if(ke.read.kind==="ok"){s.set(xe,ke.read.snapshot);continue}if(ke.read.kind==="empty"){s.delete(xe);continue}let S=s.get(xe);S!==void 0&&!S.held&&s.set(xe,{...S,held:!0})}Z()}}return u(),he(),o=setInterval(()=>{he()},6e4),{destroy(){t=!0,o!==null&&(clearInterval(o),o=null),m(),u()}}}function Ni(e){let t=e?.blocked_info;return t&&typeof t=="object"?Array.isArray(t.blockers)?t.blockers.filter(r=>typeof r=="string"&&r.length>0):[]:(Array.isArray(e?.dependencies)?e.dependencies:[]).map(r=>{if(typeof r=="string")return r;if(!r||typeof r!="object")return"";let o=r.type??r.dependency_type;return o!==void 0&&o!=="blocks"?"":r.depends_on_id||r.id||""}).filter(Boolean)}var of="bdui.worker.candidate_sort",ts=Object.freeze([{id:"spec",label:"spec \uC6B0\uC120",chain:[{key:"spec",dir:"desc"},{key:"created",dir:"asc"}]},{id:"bottleneck",label:"\uBCD1\uBAA9 \uC6B0\uC120",chain:[{key:"priority",dir:"asc"},{key:"dependents",dir:"desc"},{key:"released",dir:"desc"}]},{id:"created",label:"\uCD5C\uC2E0 \uC0DD\uC131",chain:[{key:"created",dir:"desc"},{key:"priority",dir:"asc"}]},{id:"updated",label:"\uCD5C\uC2E0 \uC218\uC815",chain:[{key:"updated",dir:"desc"}]}]),qi=Object.freeze({preset:"spec"}),sf=3,af=Object.freeze([{key:"priority",label:"\uC6B0\uC120\uC21C\uC704"},{key:"dependents",label:"\uD6C4\uC18D \uC218"},{key:"released",label:"\uD574\uC81C \uC2DC\uAC01"},{key:"spec",label:"spec \uC720\uBB34"},{key:"created",label:"\uC0DD\uC131"},{key:"updated",label:"\uC218\uC815"}]);function nf(e){return ts.some(t=>t.id===e)}function rf(e){let t=ts.find(n=>n.id===e);return t?t.chain.map(n=>({...n})):[]}function zy(e,t){return e.length===t.length&&e.every((n,r)=>n.key===t[r].key&&n.dir===t[r].dir)}function ns(e){return e&&"preset"in e?rf(e.preset):e&&Array.isArray(e.chain)?e.chain.map(t=>({...t})):rf("spec")}function vl(e){return e&&"preset"in e?e.preset:null}function Or(e){if(typeof e=="string"){let s;try{s=JSON.parse(e)}catch{return nf(e)?{preset:e}:qi}return Or(s)}if(!e||typeof e!="object")return qi;let t=e;if(nf(t.preset))return{preset:t.preset};let n=t.chain;if(!Array.isArray(n)||n.length===0||n.length>sf||!n.every(Vi))return qi;let r=[];for(let s of n)r.some(i=>i.key===s.key)||r.push({key:s.key,dir:s.dir});let o=ts.find(s=>zy(s.chain,r));return o?{preset:o.id}:{chain:r}}function lf(){try{return Or(window.localStorage.getItem(of))}catch{return qi}}function wl(e){try{window.localStorage.setItem(of,JSON.stringify(e))}catch{}}function cf(e,t,n){let r=e.map(a=>({...a}));if(!n)return r.slice(0,t);if(!Object.prototype.hasOwnProperty.call(gs,n))return r;let o=n;if(r.slice(0,t).some(a=>a.key===o))return r.slice(0,t);let s={key:o,dir:r[t]&&r[t].key===o?r[t].dir:gs[o]},i=r.slice(0,t),l=r.slice(t+1).filter(a=>a.key!==o);return[...i,s,...l].slice(0,sf)}function uf(e,t){return e.map((n,r)=>r===t?{key:n.key,dir:n.dir==="asc"?"desc":"asc"}:{...n})}function Hy(e){let t=new Set(e.map(l=>l.id)),n=new Map,r=new Map;for(let l of e){let a=Ni(l).filter(u=>t.has(u));n.set(l.id,a);for(let u of a){let d=r.get(u);d?d.push(l):r.set(u,[l])}}let o=new Set,s=[],i=l=>{o.add(l.id),s.push(l);for(let a of r.get(l.id)??[])!o.has(a.id)&&(n.get(a.id)??[]).every(u=>o.has(u))&&i(a)};for(;s.length<e.length;){let l=e.find(a=>!o.has(a.id)&&(n.get(a.id)??[]).every(u=>o.has(u)));i(l??e.find(a=>!o.has(a.id)))}return s}function df(e,t){let n=Array.isArray(e)?e.slice():[];return n.sort(ac(ns(t))),Hy(n)}function pf(e,t){let n=new Map;if(!e||typeof e!="object")return n;let r=e,o=[],s=new Set;for(let i of t){if(s.has(i.id))continue;s.add(i.id);let l=r[i.id];if(!l||!Array.isArray(l.scope))continue;let a=l.scope.filter(u=>typeof u=="string"&&u.length>0);if(a.length===0){n.set(i.id,{overlaps:[],scope_missing:!0});continue}n.set(i.id,{overlaps:[],scope_missing:!1}),o.push({member:i,scope:a})}for(let i=0;i<o.length;i+=1)for(let l=i+1;l<o.length;l+=1){let a=Fs(o[i].scope,o[l].scope);if(a.length===0)continue;let u=o[i].member,d=o[l].member;n.get(u.id)?.overlaps.push({id:d.id,title:d.title,location_label:d.location_label,prefixes:a}),n.get(d.id)?.overlaps.push({id:u.id,title:u.title,location_label:u.location_label,prefixes:a})}return n}var ff=new Set(["sh","bash","zsh","dash","ksh"]),_f=/('(?:[^']*)'|"(?:\\.|[^"\\])*"|#.*|\$(?:\{[^}\n]*\}|[A-Za-z_][A-Za-z0-9_]*|[?#@*!$0-9-])|\b(?:if|then|else|elif|fi|for|while|until|do|done|case|esac|in|function|select|time)\b)/g;function mf(e){let t=e.split("/");return t[t.length-1]||""}function Gy(e){let t=e.split(`
`,1)[0];if(!t.startsWith("#!"))return!1;let n=t.slice(2).trim().split(/\s+/).filter(Boolean);if(n.length===0)return!1;let r=mf(n[0]);if(r!=="env")return ff.has(r);let o=n.slice(1).find(s=>!s.startsWith("-")&&!s.includes("="));return o!==void 0&&ff.has(mf(o))}function Ky(e){return e.startsWith("#")?"comment":e.startsWith("'")||e.startsWith('"')?"string":e.startsWith("$")?"variable":"keyword"}function Yy(e){let t=[],n=0;_f.lastIndex=0;for(let r of e.matchAll(_f)){let o=r.index;o>n&&t.push({text:e.slice(n,o),kind:"plain"}),t.push({text:r[0],kind:Ky(r[0])}),n=o+r[0].length}return n<e.length&&t.push({text:e.slice(n),kind:"plain"}),t.length===0&&t.push({text:e,kind:"plain"}),t}function Vy(e){return{bad_request:"\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD\uC774 \uC62C\uBC14\uB974\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.",forbidden:"\uB4F1\uB85D\uB418\uC9C0 \uC54A\uC740 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uC758 \uC2A4\uD06C\uB9BD\uD2B8\uB294 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",lane_not_declared:"\uD604\uC7AC \uACE0\uC815 \uC120\uC5B8\uC5D0 \uD574\uB2F9 \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4.",stale_declaration:"\uC800\uC7A5\uC18C \uC791\uC5C5 \uC120\uC5B8\uC774 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uD654\uBA74\uC5D0\uC11C \uB2E4\uC2DC \uC5F4\uC5B4 \uC8FC\uC138\uC694.",too_large:"\uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uB108\uBB34 \uCEE4\uC11C \uD654\uBA74\uC5D0 \uD45C\uC2DC\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",unsupported_content:"\uD14D\uC2A4\uD2B8 \uD615\uC2DD\uC758 \uC2A4\uD06C\uB9BD\uD2B8\uB9CC \uD45C\uC2DC\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.",unreadable:"\uACE0\uC815\uB41C \uC2A4\uD06C\uB9BD\uD2B8 \uB0B4\uC6A9\uC744 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4."}[e]||"\uC2A4\uD06C\uB9BD\uD2B8\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4."}function gf(e){let t=e.getWorkspacePath,n=e.fetchImpl||globalThis.fetch?.bind(globalThis),r=document.createElement("div");r.className="repo-ops-script-viewer-root",document.body.appendChild(r);let o=null,s="loading",i="",l="",a=0,u=null,d=!1;function f(O,I){return I?Yy(O).map(N=>N.kind==="plain"?N.text:c`<span
            class="repo-ops-script-viewer__token repo-ops-script-viewer__token--${N.kind}"
            >${N.text}</span
          >`):O}function h(){if(!o)return c``;let O=s==="ready"&&Gy(i),I=s==="ready"?i.split(`
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
                  ${I.map((N,B)=>c`<div class="repo-ops-script-viewer__row">
                        <span
                          class="repo-ops-script-viewer__line-number"
                          aria-hidden="true"
                          >${B+1}</span
                        ><code class="repo-ops-script-viewer__code-line"
                          >${f(N,O)}</code
                        >
                      </div>`)}
                </div>`}
        </div>
      </section>
    </div>`}function m(){it(h(),r)}async function k(){if(s!=="ready")return;let O=await on(i);ye(O?"\uC2A4\uD06C\uB9BD\uD2B8 \uBCF5\uC0AC\uB428":"\uC2A4\uD06C\uB9BD\uD2B8 \uBCF5\uC0AC \uC2E4\uD328",O?"success":"error")}function R(O){O.key==="Escape"&&o&&(O.preventDefault(),X())}function j(){d||(document.addEventListener("keydown",R),d=!0)}function H(){d&&(document.removeEventListener("keydown",R),d=!1)}async function ne(O,I=null){let N=++a;j(),o={...O},u=I||(document.activeElement instanceof HTMLElement?document.activeElement:null),s="loading",i="",l="",m(),r.querySelector(".repo-ops-script-viewer__close")?.focus();let se=t?t():"";if(!se){s="error",l="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4.",m();return}if(!n){s="error",l="\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD \uAE30\uB2A5\uC744 \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",m();return}let q="/api/repo-ops-script?workspace="+encodeURIComponent(se)+"&lane="+encodeURIComponent(O.lane)+"&base_sha="+encodeURIComponent(O.base_sha);try{let W=await n(q),Z=await W.json().catch(()=>({}));if(N!==a)return;if((t?t():"")!==se){X();return}if(!W.ok||!Z||Z.ok!==!0){s="error",l=Vy(Z&&typeof Z.error=="string"?Z.error:""),m();return}o={lane:Z.lane,base_sha:Z.base_sha,path:Z.path,base_ref:Z.base_ref},i=String(Z.content),s="ready",m()}catch{if(N!==a)return;s="error",l="\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",m()}}function X(){a+=1,H(),o=null,i="",m();let O=u;u=null,O?.isConnected&&O.focus()}function F(){X(),r.remove()}return{open:ne,close:X,destroy:F}}var hf={deploy_not_declared:"\uC120\uC5B8 \uC5C6\uC74C",deploy_opted_out:"\uC774 workspace\uC5D0\uC11C \uBC30\uD3EC \uC2E4\uD589\uC774 \uAEBC\uC838 \uC788\uC74C",deploy_in_flight:"\uBC30\uD3EC \uC9C4\uD589 \uC911",target_unresolved:"\uB300\uC0C1 tip\uC744 \uD655\uC815\uD558\uC9C0 \uBABB\uD568",remote_history_not_monotonic:"\uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC\uC640 \uC6D0\uACA9 \uC774\uB825\uC774 \uAC08\uB77C\uC9D0"},Xy=new Set(["queued","running","retry_pending"]);function bf(e){let t=e.queueStore,n=e.transport,r=e.onChanged||(()=>{}),o=e.onOpenScript;function s(){return t&&t.get()||{}}function i(){let q=s();return typeof q.revision=="number"?q.revision:0}function l(q){t&&q&&q.queue&&typeof q.queue=="object"&&t.set(q.queue)}function a(){let q=s().workspace_info;return q&&typeof q=="object"?q:{}}function u(q,W){return c`<span
      class="worker-repo-ops__vd-badge worker-repo-ops__vd-badge--${q}"
      >${W}</span
    >`}function d(q){if(typeof q!="number"||!Number.isFinite(q))return"";let W=q/6e4;return Number.isInteger(W)?`timeout ${W}\uBD84`:`timeout ${Math.round(q/1e3)}\uCD08`}function f(q){let W=d(q);return W?u("config",W):""}function h(q,W,Z){return c`<button
      type="button"
      class="worker-repo-ops__vd-cmd worker-repo-ops__vd-cmd--link"
      .textContent=${Z.script}
      @click=${ee=>{o&&o({lane:q,base_sha:W.base_sha,path:Z.script,base_ref:W.base_ref},ee.currentTarget)}}
    ></button>`}function m(){let q=s().repo_operations;return Array.isArray(q)?q:[]}function k(){let q=a().repo_ops,W=q&&typeof q=="object"?q.repo_id:null;return typeof W=="string"&&W?W:null}function R(){return m().some(q=>q&&q.kind==="deploy"&&Xy.has(q.state))}function j(){let q=R(),W=k()===null;return c`<button
      type="button"
      class="worker-repo-ops__deploy-run"
      data-seam="repo-ops-deploy-run"
      ?disabled=${q||W}
      title=${q?"\uBC30\uD3EC \uC9C4\uD589 \uC911":W?"\uC800\uC7A5\uC18C\uB97C \uD655\uC778\uD560 \uC218 \uC5C6\uC74C":"\uC6D0\uACA9 base tip\uC5D0\uC11C \uBC30\uD3EC \uC2A4\uD06C\uB9BD\uD2B8\uB97C 1\uD68C \uC2E4\uD589\uD569\uB2C8\uB2E4"}
      @click=${()=>{I()}}
    >
      배포 실행
    </button>`}function H(){let q=s().repo_ops_opt_out;return{verify:q?.verify===!0,deploy:q?.deploy===!0}}function ne(q,W){return c`<label class="worker-repo-ops__lane-run">
      <input
        type="checkbox"
        .checked=${!W}
        @change=${Z=>{O(q,!Z.target.checked)}}
      />
      이 workspace에서 실행
    </label>`}function X(q){let W=typeof q.base_sha=="string"?q.base_sha:"",Z=`${q.source_path||"repo-ops/config.toml"} @ ${q.base_ref||"?"}${W?`@${W.slice(0,7)}`:""}`,ee=H(),Se=!!q.verify&&ee.verify,he=!!q.deploy&&ee.deploy;return c`<section class="worker-repo-ops__vd" data-seam="repo-ops">
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
          >${q.verify?c`${h("verify",q,q.verify)}
              ${f(q.verify.timeout_ms)}
              ${Se?u("skipped","\uC774 workspace\uC5D0\uC11C \uAC74\uB108\uB700"):""}`:c`선언 없음${u("absent","verify \uC5C6\uC774 \uD310\uC815")}`}</span
        >
        <span class="worker-repo-ops__lane-d"
          >${Se?"\uC774 workspace\uC5D0\uC11C\uB294 \uAC80\uC99D \uC5C6\uC774 \uD310\uC815\uD569\uB2C8\uB2E4.":q.verify?"\uBA38\uC9C0 \uC804\uC5D0 \uC774 \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uD1B5\uACFC\uD574\uC57C \uC790\uACA9\uC744 \uC5BB\uC2B5\uB2C8\uB2E4.":"\uBA38\uC9C0 \uC790\uACA9\uC740 PR/base/head \uC2E0\uC120\uB3C4\xB7mergeability\xB7\uB9AC\uBDF0 \uC601\uC218\uC99D\uC73C\uB85C\uB9CC \uD310\uC815\uD569\uB2C8\uB2E4."}</span
        >
        ${q.verify?ne("verify",ee.verify):""}
      </div>
      <div
        class="worker-repo-ops__lane${he?" worker-repo-ops__lane--skipped":""}"
        data-lane="deploy"
      >
        <span class="worker-repo-ops__lane-k">머지 후 배포</span>
        <span class="worker-repo-ops__lane-v"
          >${q.deploy?c`${h("deploy",q,q.deploy)}
              ${f(q.deploy.timeout_ms)}
              ${he?u("skipped","\uC774 workspace\uC5D0\uC11C \uAC74\uB108\uB700"):j()}`:c`선언 없음${u("absent","\uBC30\uD3EC \uC5C6\uC74C")}`}</span
        >
        <span class="worker-repo-ops__lane-d"
          >${he?"\uC774 workspace\uC5D0\uC11C\uB294 \uBC30\uD3EC \uC5C6\uC774 \uACE7\uBC14\uB85C \uC815\uB9AC\uB85C \uB118\uC5B4\uAC11\uB2C8\uB2E4.":q.deploy?c`Worker가 <code>.worktrees/.repo-ops-deploy</code>에서 대상
                  SHA로 정렬한 뒤 1회 실행합니다.`:"\uBA38\uC9C0 \uD6C4 \uBC30\uD3EC \uB2E8\uACC4 \uC5C6\uC774 \uACE7\uBC14\uB85C \uC815\uB9AC\uB85C \uB118\uC5B4\uAC11\uB2C8\uB2E4."}</span
        >
        ${q.deploy?ne("deploy",ee.deploy):""}
      </div>
    </section>`}function F(q){let W=q.repo_ops&&typeof q.repo_ops=="object"?q.repo_ops:null;return W&&(W.status==="resolved"||W.status==="absent")?X(W):W&&(W.status==="pending"||W.status==="error")?c`<section class="worker-repo-ops__vd" data-seam="repo-ops">
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
    </section>`}async function O(q,W){if(!n)return;let Z=await n("worker-repo-ops-opt-out-toggle",{kind:q,opted_out:W,expected_revision:i()});if(l(Z),Z&&Z.conflict){let ee=await n("worker-repo-ops-opt-out-toggle",{kind:q,opted_out:W,expected_revision:i()});l(ee)}r()}async function I(){let q=k();if(!n||q===null)return;let W=await n("worker-repo-operation-deploy-run",{repo_id:q});if(l(W),!W||W.ok!==!0){let Z=W&&typeof W.reason=="string"?W.reason:"",ee=Object.hasOwn(hf,Z)?hf[Z]:Z||"\uBC30\uD3EC \uC2E4\uD589\uC744 \uC2DC\uC791\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4";ye(`\uBC30\uD3EC \uC2E4\uD589 \uAC70\uBD80 \u2014 ${ee}`,"error")}else ye("\uBC30\uD3EC \uC2E4\uD589\uC744 \uC2DC\uC791\uD588\uC2B5\uB2C8\uB2E4","success");r()}let N={owned_deploy_worktree_fetch_detached_alignment_recreate:"\uC804\uC6A9 \uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC \uC815\uB82C\xB7\uBCF5\uAD6C",recovered_pre_execution_fetch_timeout_retry_once:"fetch \uD0C0\uC784\uC544\uC6C3 1\uD68C \uBCF5\uAD6C",repo_serial_lock_wait:"\uC800\uC7A5\uC18C \uC21C\uCC28 \uC2E4\uD589 \uB300\uAE30",restart_operation_adoption:"\uC7AC\uC2DC\uC791 \uD6C4 \uC791\uC5C5 \uC778\uACC4",exact_input_exit_zero_evidence_adoption:"\uB3D9\uC77C \uC785\uB825 \uC131\uACF5 \uC99D\uAC70 \uC778\uACC4",descendant_success_covers_ancestor_rows:"\uCD5C\uC2E0 SHA \uC131\uACF5\uC774 \uC774\uC804 \uD589 \uCEE4\uBC84",owned_verify_candidate_cleanup:"\uAC80\uC99D \uC784\uC2DC \uCCB4\uD06C\uC544\uC6C3 \uC815\uB9AC",bounded_single_script_retry_exceeded:"\uB2E8\uC77C \uC2A4\uD06C\uB9BD\uD2B8 \uC7AC\uC2DC\uB3C4 \uD55C\uB3C4 \uCD08\uACFC",repair_session_dispatch:"\uC2E4\uD328 \uD574\uACB0 \uC138\uC158 \uC790\uB3D9 \uC2E4\uD589",baseline_failure_ignore:"\uAE30\uC874 \uC2E4\uD328 \uBB34\uC2DC",config_or_script_deletion_to_bypass_gate:"\uC124\uC815\xB7\uC2A4\uD06C\uB9BD\uD2B8 \uC0AD\uC81C\uB85C \uAC8C\uC774\uD2B8 \uC6B0\uD68C",credential_entry:"\uC790\uACA9\uC99D\uBA85 \uC785\uB825\xB7\uCD9C\uB825",destructive_action:"\uD30C\uAD34\uC801 \uC791\uC5C5",history_rewrite:"\uD788\uC2A4\uD1A0\uB9AC \uC7AC\uC791\uC131",agent_self_report_as_success:"\uC138\uC158 \uC790\uAE30\uBCF4\uACE0\uB97C \uC131\uACF5 \uCC98\uB9AC"};function B(q,W,Z){return c`<div class="worker-repo-ops__policy-group" data-policy=${Z}>
      <div class="worker-repo-ops__policy-label">${q}</div>
      <ul class="worker-repo-ops__policy-list">
        ${W.map(ee=>c`<li data-token=${ee}>
              ${N[ee]||ee}
            </li>`)}
      </ul>
    </div>`}function se(){let q=s(),W=q.repo_operation_policy&&typeof q.repo_operation_policy=="object"?q.repo_operation_policy:null;return W?c`<section
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
        ${F(a())} ${se()}
      </details>`}}}var wf=20,Qy=5,Zy=new Set(["failed","running","queued","retry_pending"]),yf={verify:"\uBA38\uC9C0 \uC804 \uAC80\uC99D",deploy:"\uBA38\uC9C0 \uD6C4 \uBC30\uD3EC"};function Jy(e,t,n=wf){let r=[];for(let o of Array.isArray(e)?e:[])!o||typeof o!="object"||r.push({type:"operation",id:o.operation_id,at:typeof o.finished_at=="number"?o.finished_at:typeof o.requested_at=="number"?o.requested_at:null,operation:o});for(let o of Array.isArray(t)?t:[])!o||typeof o!="object"||r.push({type:"cleanup",id:o.bead_id,at:typeof o.at=="number"?o.at:null,cleanup:o});return r.sort((o,s)=>o.at===null&&s.at===null?String(o.id||"").localeCompare(String(s.id||"")):o.at===null?1:s.at===null?-1:s.at-o.at),r.slice(0,Math.max(0,n))}function ev(e){if(e.type==="cleanup")return!0;let t=e.operation;return Zy.has(t.state)&&!t.dismissed&&!t.superseded_by}function tv(e,t,n={}){let r=Jy(e,t,1/0),o=n.expanded===!0?wf:Qy,s=new Set(r.slice(0,o)),i=r.filter(l=>s.has(l)||ev(l));return{visible:i,hidden:r.length-i.length}}function vf(e){if(e.type==="cleanup")return"warn";let t=e.operation.state;return t==="succeeded"?"ok":t==="failed"?"fail":"live"}function nv(e){if(e.type==="cleanup")return"\uBA48\uCDA4";switch(e.operation.state){case"succeeded":return"\uC131\uACF5";case"failed":return"\uC2E4\uD328";case"retry_pending":return"\uC7AC\uC2DC\uB3C4 \uC911";case"running":return"\uC2E4\uD589 \uC911";default:return"\uB300\uAE30"}}function kf(e){let t=e.filter(n=>n.value);return t.length===0?"":c`<details class="worker-ev__details">
    <summary>세부</summary>
    <dl class="worker-ev__kv">
      ${t.map(n=>{let r=n.copy===!0?eo(n.value):n.value;return c`<div>
          <dt>${n.term}</dt>
          <dd>${r}</dd>
        </div>`})}
    </dl>
  </details>`}function $f(e,t="",n=!1){return!e&&!t?"":c`<p
    class="worker-ev__explain${n?" worker-ev__explain--warn":""}"
  >
    <span class="worker-ev__cause">${e}</span>${t?c`<br />${t}`:""}
  </p>`}function rv(e,t){if(!e||typeof e!="object")return;let n=t&&t.kind==="verify"?"verify":"deploy",r=e[n],o=r&&typeof r=="object"?r.timeout_ms:void 0;return typeof o=="number"&&Number.isFinite(o)?o:void 0}function ov(e,t){let n=_p(e,t),r=mp(e);return!n&&!r?"":c`<p class="worker-ev__why">
    ${n?c`<span class="worker-ev__why-line">${n}</span>`:""}${r?c`<span class="worker-ev__why-line">${r}</span>`:""}
  </p>`}function sv(e){return e.state!=="failed"||e.superseded_by||e.dismissed?"":c`<div class="worker-ev__acts">
    <button
      type="button"
      class="worker-ev__btn worker-repo-op__dismiss"
      data-operation-id=${e.operation_id}
      title="사람이 확인한 실패로 접수합니다 — 기록은 그대로 남고 해결 필요 집계에서만 빠집니다"
    >
      기록 닫기
    </button>
  </div>`}function iv(e,t){let n=e.operation,r=n.state==="failed",o=n.failure?n.failure.code:"";return c`<li
    class="worker-ev"
    data-operation-id=${n.operation_id}
    data-state=${n.state}
  >
    <span
      class="worker-ev__t"
      title=${e.at?Gt(e.at):""}
      >${Ws(e.at)||"\u2014"}</span
    >
    <span class="worker-ev__node" aria-hidden="true"
      ><span class="worker-ev__dot worker-ev__dot--${vf(e)}"></span
    ></span>
    <div class="worker-ev__body">
      <div class="worker-ev__line1">
        <span class="worker-ev__what"
          >${Object.hasOwn(yf,n.kind)?yf[n.kind]:n.kind}</span
        >
        <span class="worker-ev__meta"
          >${n.target_base}@${Us(n.target_sha)}${typeof n.elapsed_ms=="number"?` \xB7 ${xr(n.elapsed_ms)}`:""}</span
        >
        <span class="worker-ev__st worker-ev__st--${vf(e)}"
          >${nv(e)}</span
        >
        ${n.dismissed?c`<span class="worker-ev__st worker-ev__st--quiet">접수됨</span>`:""}
        ${n.superseded_by?c`<span class="worker-ev__st worker-ev__st--quiet">덮임</span>`:""}
        ${n.source==="manual"?c`<span
              class="worker-ev__st worker-ev__st--manual"
              title="사람이 배포 실행을 눌러 시작한 작업입니다"
              >수동</span
            >`:""}
      </div>
      ${r?$f(fp(n.failure_kind,o)):""}
      ${ov(n,rv(t,n))}
      ${sv(n)}
      ${kf([{term:"\uC2E4\uD328 \uCF54\uB4DC",value:r?o:""},{term:"script",value:[n.script_path||"",n.script_blob_sha?`blob ${Us(n.script_blob_sha)}`:"",Number.isInteger(n.exit_code)?`exit ${n.exit_code}`:""].filter(Boolean).join(" \xB7 ")},{term:"\uB85C\uADF8",value:n.log_path||"",copy:!0},{term:"\uCD9C\uB825",value:n.output_tail||""}])}
    </div>
  </li>`}function av(e){let t=e.cleanup,n=Ar(t.step);return c`<li
    class="worker-ev"
    data-bead-id=${t.bead_id}
    data-state="cleanup_stalled"
  >
    <span
      class="worker-ev__t"
      title=${e.at?Gt(e.at):""}
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
        ${Cu(t.step).map(r=>c`<li
              class="worker-step worker-step--${r.state}"
              data-step=${r.step}
            >
              <span class="worker-step__pip" aria-hidden="true"></span>
              <span class="worker-step__lb">${r.label}</span>
            </li>`)}
      </ol>
      ${$f(ur(t.reason),typeof t.retry_count=="number"&&t.retry_count>0?`${t.retry_count}\uD68C \uC790\uB3D9 \uC7AC\uC2DC\uB3C4 \uD6C4\uC5D0\uB3C4 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4 \u2014 \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD558\uBA74 \uBA48\uCD98 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4.`:"\uC815\uB9AC\uB97C \uC7AC\uAC1C\uD558\uBA74 \uBA48\uCD98 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4.",!0)}
      <div class="worker-ev__acts">
        <button
          type="button"
          class="worker-ev__btn worker-ev__btn--warn worker-cleanup__resume"
          data-bead-id=${t.bead_id}
        >
          정리 재개${n?` \u2014 ${n} \uB2E8\uACC4\uBD80\uD130`:""}
        </button>
      </div>
      ${kf([{term:"\uC2E4\uD328 \uCF54\uB4DC",value:t.reason||""},{term:"\uC9C4\uB2E8",value:t.detail||""},{term:"\uB85C\uADF8",value:t.log_path||"",copy:!0},{term:"\uCD9C\uB825",value:t.output_tail||""}])}
    </div>
  </li>`}function lv(e){let t=typeof e.hidden=="number"?e.hidden:0,n=e.expanded===!0;return c`<section class="worker-repo-drawer" data-seam="repo-ops-timeline">
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
          ${e.events.map(r=>r.type==="cleanup"?av(r):iv(r,e.repo_ops))}
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
  </section>`}function xf(e,t={}){let n=null;function r(){if(n===null){it(c``,e);return}let i=tv(n.operations,n.cleanup_failures,{expanded:n.expanded});it(lv({events:i.visible,hidden:i.hidden,expanded:n.expanded,repo:n.repo,repo_ops:n.repo_ops}),e)}e.addEventListener("click",i=>{let l=i.target;if(l?.closest?.('[data-seam="repo-ops-close"]')){s();return}l?.closest?.('[data-seam="repo-ops-more"]')&&n&&(n.expanded=!n.expanded,r())});function o(i){n={operations:i.operations,cleanup_failures:i.cleanup_failures,repo:i.repo||"",repo_ops:i.repo_ops||null,expanded:!1},r()}function s(){n!==null&&(n=null,r(),t.onClose&&t.onClose())}return{open:o,close:s,isOpen:()=>n!==null,refresh(i){n&&(n={operations:i.operations,cleanup_failures:i.cleanup_failures,repo:i.repo||"",repo_ops:i.repo_ops||null,expanded:n.expanded},r())}}}var cv="worker-ineligible";function rs(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function Af(e){return rs(e).includes(cv)}var uv="session-preferred",dv=["external_roundtrip","user_feedback_loop"];function Sf(e,t){if(!rs(e).includes(uv)||typeof t!="object"||t===null)return"";let n=t.session_preferred_reason;return typeof n=="string"&&dv.includes(n)?n:""}var pv="spec-after-blocker";function Ef(e,t){return rs(e).includes(pv)&&Array.isArray(t)&&t.length>0}var fv=Rt("views:worker:adapter"),_v="tab:worker:ready",mv="tab:worker:blocked",gv="tab:worker:in-progress",hv="tab:worker:resolved",bv="tab:worker:closed",yv="\u{1F512} blocked",vv={revision:0,auto_advance:!1,auto_merge:!1,slots:si,queue:[],serial_lanes:[],serial_lane_count:0,pr_wait:[],done:[]},wv=["claude_account","codex_account"],kv=[...Xr,...wv];function $v(e){let t=e&&e.parent;return(typeof t=="string"?t.length>0:!!(t&&t.id))||/\.\d+$/.test(e&&e.id||"")}function xv(e){let t=e&&typeof e=="object"?e.awaiting_user:void 0,n=typeof t=="string"?t.trim():"";return n.length>0?`${Zs}: ${n}`:Zs}function Lr(e){return e&&typeof e=="object"?e:{}}function Av(e){let t={};for(let n of kv){let r=e[n];typeof r=="string"&&r.length>0&&(t[n]=r)}return t}function Sv(e){let t=e.replace(/\/+$/,""),n=t.lastIndexOf("/");return n>=0?t.slice(n+1):t}function Tf(e={}){let{queueStore:t,issueStores:n,transport:r,getWorkspacePath:o,onInvalidate:s}=e,i=n?jr(n):null,l=new Map,a={},u=null,d=0,f=null,h=!1;function m(){h||!s||s()}function k(I){return u===I?a:{}}async function R(){if(!r||h)return;let I=o?.()||"";if(u===I||f&&f.key===I&&f.generation===d)return;let N=++d;f={key:I,generation:N};let B=null;try{B=await Promise.resolve(r("get-session-defaults",{}))}catch(se){if(N!==d)return;f=null,fv("get-session-defaults failed: %o",se),m();return}N===d&&(a=B&&typeof B.values=="object"&&B.values!==null?{...B.values}:{},u=I,f=null,m())}function j(){u=null,d+=1,R()}function H(){for(let[I,N]of l)N==="failed"&&l.delete(I)}function ne(I,N){return i?i.selectBoardColumn(I,N):[]}function X(I,N,B,se){let q=Array.isArray(I.queue)?I.queue:[],W=new Set([...q.map(D=>D.bead_id),...(Array.isArray(I.serial_lanes)?I.serial_lanes:[]).flatMap(D=>(Array.isArray(D?.entries)?D.entries:[]).map(ke=>ke.bead_id)),...(Array.isArray(I.pr_wait)?I.pr_wait:[]).map(D=>D.bead_id),...(Array.isArray(I.done)?I.done:[]).map(D=>D.bead_id)]),Z=new Set(B.map(D=>D.id)),ee=new Set,Se=[];for(let D of[...N,...B])W.has(D.id)||ee.has(D.id)||$v(D)||(ee.add(D.id),Se.push(D));let he=df(Se,Or(se)),ue=Lr(I.bead_scope);return he.map(D=>{let ke=qr(D),xe=ke.evidence==="published",S=typeof D.workflow?.route=="string"&&D.workflow.route||(D.metadata&&typeof D.metadata.route=="string"?D.metadata.route:""),J=S==="quick_fix",Ee=!Object.hasOwn(D,"description")||typeof D.description=="string"&&D.description.trim().length>0,_e=Object.hasOwn(D,"labels")&&Af(D.labels),Ae=_e||!Object.hasOwn(D,"labels")?"":Sf(D.labels,D.metadata),pe=D.metadata&&typeof D.metadata=="object"?Object.hasOwn(D.metadata,"awaiting_user"):!1,Pe=!_e&&!pe&&(J?Ee:xe&&!ke.conflict),st=Z.has(D.id),Ve=st?Ni(D):[],M=[];st&&Ve.length===0&&M.push(yv),pe&&M.push(xv(D.metadata)),J&&!Ee?M.push("missing_description"):!J&&ke.conflict?M.push("spec_id_conflict"):!J&&ke.evidence==="none"?M.push("spec \uC5C6\uC74C"):!J&&ke.evidence==="draft"&&M.push("spec \uBBF8\uBC1C\uD589(draft)");let re=ue[D.id];return{bead_id:D.id,title:D.title||D.id,route:S,spec_id:ke.conflict?"":ke.path,published:xe,blocked:st,blocked_by:Ve,labels:Array.isArray(D.labels)?D.labels:[],created_at:D.created_at,updated_at:D.updated_at,status:D.status,workflow:D.workflow||null,exec_pins:Av(Lr(D.metadata)),rec:null,...re&&Array.isArray(re.scope)?{scope:re.scope}:{},eligible:Pe,reason:M.join(" \xB7 "),worker_ineligible:_e,session_preferred:Ae.length>0,session_preferred_reason:Ae,spec_after_blocker:Ef(D.labels,Ve),release_info:D.release_info,dependents_info:D.dependents_info}})}function F(I){let[N,B,se,q,W]=I,Z=ys([...N,...B,...se,...q,...W]),ee={},Se=(he,ue)=>{if(!he||typeof he.id!="string"||he.id.length===0)return;let D=ee[he.id]||(ee[he.id]={});if(typeof he.priority=="number"&&!("priority"in D)&&(D.priority=he.priority),typeof he.from_id=="string"&&!("from_id"in D)&&(D.from_id=he.from_id),ue&&!("metadata"in D)){D.metadata=Lr(he.metadata);let ke=Lr(he.workflow).route;typeof ke=="string"&&ke.length>0&&(D.route=ke)}};for(let he of[...N,...B,...se])Se(he,!0);for(let he of[...q,...W])Se(he,!1);for(let he of new Set([...Object.keys(ee),...Z.keys()])){let ue=vs(Z,he);if(ue.total>0){let D=ee[he]||(ee[he]={});D.rollup=ue}}return ee}function O(I,N,B,se){let q=new Set((Array.isArray(I.done)?I.done:[]).map(Z=>Z?.bead_id).filter(Z=>typeof Z=="string")),W=[];for(let Z of N){let ee=nr(Z.closed_at);if(typeof Z.id!="string"||q.has(Z.id)||ee===null||se!==void 0&&ee<se||typeof Z.comment_count!="number"||Z.comment_count<=0)continue;let Se=`${B}\0${Z.id}\0${String(Z.updated_at)}\0${Z.comment_count}`,he=l.get(Se);if(he===void 0&&r&&(l.set(Se,"pending"),Promise.resolve(r("get-comments",{id:Z.id})).then(D=>{let ke=Array.isArray(D)&&D.some(xe=>ki(typeof xe?.text=="string"?xe.text:"")?.lane==="session");l.set(Se,ke?"session":"not-session"),m()}).catch(()=>{l.set(Se,"failed"),m()})),he!=="session")continue;let ue=nr(Z.started_at);W.push({id:Z.id,title:Z.title||Z.id,reason:"",draggable:!1,done:!0,lane:"done",selectable:!1,selected:!1,badges:["\uC138\uC158 \uC791\uC5C5"],alert:!1,usage:null,work_ms:ue!==null&&ee>=ue?ee-ue:null,work_kind:"session",done_at:ee,created_at:Z.created_at,updated_at:Z.updated_at})}return W}return{read(I){if(!t)return{workspaces:[],workspaces_state:[]};let N=t.get()||vv,B=o?.()||"",se=I&&typeof I.done_since=="number"?I.done_since:void 0,q=ne(_v,"ready"),W=ne(mv,"blocked"),Z=ne(gv,"in_progress"),ee=ne(hv,"resolved"),Se=ne(bv,"closed");return{workspaces:[{...N,bead_titles:{...Lr(N.bead_titles),...Object.fromEntries([...q,...W].filter(he=>he&&typeof he.id=="string").map(he=>[he.id,he.title||he.id]))},root_dir:B,name:Sv(B),runnable:X(N,q,W,I?I.candidate_sort:void 0),session_done:O(N,Se,B,se),bead_overlay:F([q,W,Z,ee,Se])}],workspaces_state:[{root_dir:B,revision:N.revision,auto_advance:N.auto_advance,auto_merge:N.auto_merge,slots:typeof Lr(N.workspace_info).slots=="number"?Lr(N.workspace_info).slots:N.slots,runner_catalog:N.runner_catalog,execution_defaults:N.execution_defaults,session_defaults:k(B),orchestration_model:N.orchestration_model,orchestration_effort:N.orchestration_effort,orchestration_speed:N.orchestration_speed,issue_prefix:""}]}},ensureSessionDefaults(){R()},refreshSessionDefaults:j,notifyIssuesChanged:H,destroy(){h=!0,d+=1,f=null,l.clear()}}}var Fi=1,Cf=5,Ev={root_dir:"",name:"",auto_advance:!1,auto_merge:!1,slots:Fi,revision:0,runner_catalog:{},items:[],sublanes:{parallel:[],serial:[]},serial_lane_count:0,raw_queue_length:0,live_count:0,over_cap:!1,merge:{positions:new Map,resolutions:new Map,continuations:new Map,authorities:new Map,state:{active:null,failures:{},waiting:null},auto_excluded:[],running:!1},token_total:null,cleanup_failures:[],declared_base:null,repo_operations:[]};function _n(e){return e&&typeof e=="object"?e:{}}var Lf="beads-ui.worker.candidate-filter",kl={show_blocked:!1,spec:"all"};function Tv(){try{let e=window.localStorage.getItem(Lf);if(!e)return{...kl};let t=JSON.parse(e);if(!t||typeof t!="object")return{...kl};let n=t.spec;return{show_blocked:t.show_blocked===!0,spec:n==="with"||n==="without"?n:"all"}}catch{return{...kl}}}function Cv(e){try{window.localStorage.setItem(Lf,JSON.stringify(e))}catch{}}var Rv=[{value:"all",label:"\uC804\uCCB4"},{value:"with",label:"spec \uC788\uC74C"},{value:"without",label:"spec \uC5C6\uC74C"}],If="bdui.worker.done-range";function Ov(){try{let e=window.localStorage.getItem(If);return e===null?"today":Mn(e)}catch{return"today"}}function Lv(e){try{window.localStorage.setItem(If,e)}catch{}}function Rf(e){let t=Array.isArray(e)&&e.length>0?e[0]:null;if(!t)return"";let n=typeof t.title=="string"?t.title:t.id||"";return n.length>22?`${n.slice(0,22)}\u2026`:n}function Iv(e){return e==="receipt_not_current"?"\uB9AC\uBDF0 \uD6C4\uC5D0\uB3C4 \uC601\uC218\uC99D\uC774 \uCD5C\uC885 head\uC5D0 \uC720\uD6A8\uD558\uC9C0 \uC54A\uC74C":e==="cancelled"?"\uB9AC\uBDF0 \uC138\uC158 \uCDE8\uC18C\uB428":e.startsWith("launch_failed:")?`\uB9AC\uBDF0 \uC138\uC158 \uC2DC\uC791 \uC2E4\uD328(${e.slice(14)})`:e.startsWith("session_failed:")?`\uB9AC\uBDF0 \uC138\uC158 \uBE44\uC815\uC0C1 \uC885\uB8CC(${e.slice(15)})`:`\uB9AC\uBDF0 \uC138\uC158 \uC2E4\uD328(${e})`}function Of(e){if(e.startsWith("receipt_unbacked:"))return`\uC2E4\uD589 \uC601\uC218\uC99D \uC790\uB3D9 \uAC80\uC99D \uBD88\uAC00(${e.slice(17)}) \u2014 [\uBA38\uC9C0] \uD074\uB9AD\uC73C\uB85C \uC218\uB3D9 \uC9C4\uD589 \uAC00\uB2A5`;switch(e){case"not_in_pr_wait":return"PR \uB300\uAE30 \uC0C1\uD0DC \uB3D9\uAE30\uD654 \uC2E4\uD328";case"resolution_round_cap":return"\uCDA9\uB3CC \uD574\uC18C 2\uD68C \uCD08\uACFC";case"resolution_rebase_cap":return"\uD050 \uC7AC\uCDA9\uB3CC 3\uD68C \uCD08\uACFC";case"resolution_timeout":return"\uCDA9\uB3CC \uD574\uC18C \uB300\uAE30 \uC2DC\uAC04 \uCD08\uACFC";case"resolution_refused":return"\uD574\uC18C \uC138\uC158 \uB514\uC2A4\uD328\uCE58 \uAC70\uBD80";case"worktree_missing":return"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uD574\uC18C \uD544\uC694";case"worktree_restore_branch_mismatch":return"\uC6CC\uD06C\uD2B8\uB9AC \uBCF5\uC6D0 \uC2E4\uD328 \u2014 \uBE0C\uB79C\uCE58 \uC774\uB984 \uBD88\uC77C\uCE58";case"worktree_restore_path_exists":return"\uC6CC\uD06C\uD2B8\uB9AC \uBCF5\uC6D0 \uC2E4\uD328 \u2014 \uACBD\uB85C \uC774\uBBF8 \uC788\uC74C";case"worktree_restore_branch_missing":return"\uC6CC\uD06C\uD2B8\uB9AC \uBCF5\uC6D0 \uC2E4\uD328 \u2014 origin\uC5D0 \uBE0C\uB79C\uCE58 \uC5C6\uC74C";case"worktree_restore_branch_diverged":return"\uC6CC\uD06C\uD2B8\uB9AC \uBCF5\uC6D0 \uC2E4\uD328 \u2014 \uB85C\uCEEC \uBE0C\uB79C\uCE58\uAC00 origin\uACFC \uB2E4\uB984";case"worktree_restore_failed":return"\uC6CC\uD06C\uD2B8\uB9AC \uBCF5\uC6D0 \uC2E4\uD328";case"merge_unconfirmed_timeout":return"\uBA38\uC9C0 \uD655\uC778 \uC2DC\uAC04 \uCD08\uACFC";case"pr_closed_unmerged":return"PR \uB2EB\uD798";case"merge_error":return"\uBA38\uC9C0 \uC624\uB958";case"spec_id_missing":return"\uC2A4\uD399 ID \uAE30\uB85D \uC5C6\uC74C";default:return e}}function Mv(e){if(e==="lane_occupied")return"\uC2E4\uD589 \uB808\uC778\uC5D0 \uB0A8\uC544 \uC788\uC5B4 \uBA38\uC9C0 \uB300\uC0C1\uC774 \uC544\uB2D9\uB2C8\uB2E4";let t="\uBA38\uC9C0 \uD050\uC5D0 \uB123\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 (\uC774\uBBF8 \uB300\uAE30 \uC911\uC774\uAC70\uB098 \uB300\uC0C1 \uC544\uB2D8)";return typeof e=="string"&&e.length>0?`${t}: ${e}`:t}function Pv(e){if(e==="worker_sessions_busy")return"\uD574\uC18C \uB300\uAE30 \u2014 \uC2E4\uD589 \uC2AC\uB86F \uB300\uAE30 \uC911";if(typeof e!="string"||!e.startsWith("completion_waiting:"))return null;let t=e.slice(19);if(t.length===0)return null;switch(t){case"gating":return"\uBA38\uC9C0 \uC870\uAC74 \uD655\uC778 \uC911";case"merging":return"\uBA38\uC9C0 \uC911";case"cleaning":return"\uB9C8\uBB34\uB9AC \uC911";case"paused":return"\uC790\uB3D9 \uC9C4\uD589 \uC77C\uC2DC\uC815\uC9C0";case"needs_human":return"\uD655\uC778 \uD544\uC694";default:return null}}function Dv(e){if(!e||typeof e!="object")return null;switch(e.state){case"waiting":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC911",live:!0};case"yielded":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uACC4\uC18D \uC911 \xB7 \uC644\uB8CC \uD6C4 \uC6B0\uC120 \uBA38\uC9C0",live:!0};case"ready":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC644\uB8CC \xB7 \uC7AC\uAC80\uC99D \uB300\uAE30",live:!1};default:return null}}var Nv=new Set(["paused","needs_human","waiting_metadata","reviewing","retrying"]),qv=new Set(["waiting_metadata","reviewing","retrying"]),$l=new Set(["review_receipt_missing","review_receipt_stale","review_receipt_invalid","review_receipt_undetermined"]);function Fv(e){let t=e&&typeof e=="object"?e.auto_resolution:null,n=t&&typeof t=="object"&&!Array.isArray(t)?t:null;if(!n||!e)return null;let r=typeof n.origin_reason=="string"&&n.origin_reason.length>0?`\uC6D0 \uC0AC\uC720: ${n.origin_reason}`:"";switch(e.phase){case"waiting_metadata":return{label:"\uC815\uC815 \uB300\uAE30",details:[r,"\uBA54\uD0C0\uB370\uC774\uD130 \uC815\uC815\uC774 \uAD00\uCE21\uB418\uBA74 \uC790\uB3D9 \uC7AC\uAC1C"].filter(Boolean),live:!1};case"retrying":{let o=Number.isInteger(n.attempts)?Math.max(0,Number(n.attempts)):0,s=Number.isInteger(n.attempt_cap)&&Number(n.attempt_cap)>0?Number(n.attempt_cap):0,i=typeof n.next_at=="number"?Gt(n.next_at):"",l=typeof n.last_error=="string"&&n.last_error.length>0?n.last_error:"";return{label:s>0?`\uC7AC\uC2DC\uB3C4 ${Math.min(o,s)}/${s}`:`\uC7AC\uC2DC\uB3C4 ${o}`,details:[r,i?`\uB2E4\uC74C \uC2DC\uAC01 ${i}`:"",l?`\uB9C8\uC9C0\uB9C9 \uC624\uB958: ${l}`:""].filter(Boolean),live:!0}}default:return null}}function jv(e){if(typeof e!="string")return"";for(let t of["retry_exhausted:","auto_review_exhausted:"])if(e.startsWith(t))return e.slice(t.length);return""}function Bv(e,t=null){if(!e||typeof e!="object")return null;let n="";switch(e.phase){case"gating":n="\uBA38\uC9C0 \uC870\uAC74 \uD655\uC778 \uC911";break;case"merging":n="\uBA38\uC9C0 \uC911";break;case"cleaning":n="\uB9C8\uBB34\uB9AC \uC911";break;case"waiting_metadata":case"reviewing":case"retrying":if(!t)return null;n=t.label;break;case"paused":n="\uC790\uB3D9 \uC9C4\uD589 \uC77C\uC2DC\uC815\uC9C0";break;case"needs_human":n="\uD655\uC778 \uD544\uC694";break;case"completed":return null;default:return null}let r=[n];e.head_sha&&r.push(`head ${e.head_sha}`),e.base_sha&&r.push(`base ${e.base_sha}`),(e.failure_stage||e.failure_reason)&&r.push(`${e.failure_stage||"failure"} \xB7 ${e.failure_reason||"\uC6D0\uC778 \uBBF8\uC0C1"}`);let o=jv(e.terminal_reason);o&&r.push(`\uC6D0 \uC0AC\uC720: ${o}`);let s=e.phase==="needs_human"&&!o?Rr(e.terminal_reason):null;s&&r.push(e.failure_stage?`${e.failure_stage} \xB7 ${s}`:s);for(let i of t?t.details:[])r.push(i);return e.active_attempt_id&&r.push(`attempt ${e.active_attempt_id}`),e.evidence&&r.push(e.evidence),e.log_path&&r.push(e.log_path),{badge:n,title:r.join(`
`),alert:e.phase==="needs_human",lock_actions:!Nv.has(e.phase)}}function Uv(e){if(!e||typeof e!="object")return[];let t=e.blocking_codes;return Array.isArray(t)?t.filter(n=>typeof n=="string"&&n.length>0):[]}function Wv(e){if(!e||typeof e!="object")return[];let t=e.badge_codes;return Array.isArray(t)?t.filter(n=>typeof n=="string"&&n.length>0):[]}function zv(e){let t=e.queue_failure?`\uBA38\uC9C0 \uC2E4\uD328 \uC6D0\uBB38: ${e.queue_failure}`:e.auto_skip?`\uC790\uB3D9 \uC81C\uC678 \uC6D0\uBB38: ${e.auto_skip}`:"",n=(s,i={})=>{let l=[i.title||"",t].filter(Boolean);return{label:s,title:l.join(`
`),live:i.live===!0,alert:i.alert===!0}};if(e.continuation_required)return n("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694",{alert:!0});if(e.queueing)return e.queueing==="cleanup"?n("\uC815\uB9AC \uC7AC\uAC1C \uC694\uCCAD \uC911",{title:"\uC11C\uBC84 \uC751\uB2F5\uC744 \uAE30\uB2E4\uB9AC\uB294 \uC911\uC785\uB2C8\uB2E4",live:!0}):n("\uD050 \uB4F1\uB85D \uC911",{title:"\uBA38\uC9C0 \uD050\uC5D0 \uB123\uB294 \uC911 \u2014 \uC11C\uBC84 \uC751\uB2F5\uC744 \uAE30\uB2E4\uB9BD\uB2C8\uB2E4",live:!0});if(e.merge_step)return e.gate?.tier==="merged"?n("\uBA38\uC9C0\uB428",{title:e.merge_step.label,alert:e.merge_step.failed===!0}):n("\uBA38\uC9C0 \uC911",{title:e.merge_step.label,live:!0});if(e.conflict_badge)return n(e.conflict_badge,{live:e.conflict_live===!0});if(e.auto_resolution)return n(e.auto_resolution.label,{title:e.auto_resolution.details.join(`
`),live:e.auto_resolution.live===!0});if(e.recovery?.lock_actions)return n(e.recovery.badge,{title:e.recovery.title,live:!0});if(e.cleanup_failed)return n(e.cleanup_label?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${e.cleanup_label}`:"\uC815\uB9AC \uBA48\uCDA4",{title:e.cleanup_failed.reason||"",alert:!0});if(e.base_exception)return n("\uB2E4\uB978 base \uB300\uC0C1",{title:e.base_exception,alert:!0});let r=Uv(e.receipt_check),o=e.conflicting||e.gate?.reason==="base_behind"||r.length>0;if(e.auto_pending&&o)return n("\uD655\uC778 \uC911",{title:"\uBA38\uC9C0 \uD050\uAC00 \uC790\uB3D9\uC73C\uB85C \uCC98\uB9AC \uC911 \u2014 \uB2E4\uC74C \uAD00\uCE21\uC744 \uAE30\uB2E4\uB9BD\uB2C8\uB2E4",live:!0});if(e.conflicting)return n("\uCDA9\uB3CC \uD574\uACB0 \uD544\uC694",{alert:!0});if(e.gate?.reason==="base_behind")return n("base \uAC31\uC2E0 \uD544\uC694",{alert:!0});if($l.has(e.gate?.reason)){let s=e.gate.reason==="review_receipt_stale"?"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC774 \uD604\uC7AC head\uC758 \uC870\uC0C1\uC774 \uC544\uB2D9\uB2C8\uB2E4 \u2014 \uD788\uC2A4\uD1A0\uB9AC \uC7AC\uC791\uC131\xB7\uBE0C\uB79C\uCE58 \uB9AC\uC14B \uBCF5\uAD6C \uACBD\uB85C\uC785\uB2C8\uB2E4. [\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0]\uAC00 \uC774 \uBCF4\uB958\uC758 \uCD9C\uAD6C\uC785\uB2C8\uB2E4":e.gate.reason==="review_receipt_invalid"?"\uB9AC\uBDF0 \uC601\uC218\uC99D \uAE30\uB85D\uC774 \uC131\uB9BD\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4 \u2014 [\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0]\uAC00 \uC774 \uBCF4\uB958\uC758 \uCD9C\uAD6C\uC785\uB2C8\uB2E4":e.gate.reason==="review_receipt_undetermined"?"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC758 ancestry probe\uB97C \uC644\uB8CC\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 \u2014 [\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0]\uAC00 \uC774 \uBCF4\uB958\uC758 \uCD9C\uAD6C\uC785\uB2C8\uB2E4":"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 [\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0]\uAC00 \uC774 \uBCF4\uB958\uC758 \uCD9C\uAD6C\uC785\uB2C8\uB2E4";if(e.review_session?.active===!0)return n(e.review_session.origin==="auto"?"\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694 \xB7 \uC790\uB3D9 \uB9AC\uBDF0 \uC138\uC158 \uC2E4\uD589 \uC911":"\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694 \xB7 \uB9AC\uBDF0 \uC138\uC158 \uC2E4\uD589 \uC911",{title:`${s}
\uB9AC\uBDF0 \uC138\uC158\uC774 \uC2E4\uD589 \uC911\uC785\uB2C8\uB2E4 \u2014 \uB05D\uB098\uBA74 \uC601\uC218\uC99D\uC744 \uB2E4\uC2DC \uD310\uC815\uD569\uB2C8\uB2E4`,live:!0});if(e.auto_review_wait==="slot")return n("\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694 \xB7 \uB9AC\uBDF0 \uC138\uC158 \uC2AC\uB86F \uB300\uAE30",{title:`${s}
\uC2E4\uD589 \uC2AC\uB86F\uC774 \uBE44\uBA74 \uC790\uB3D9\uC73C\uB85C \uB9AC\uBDF0 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4. \uC9C0\uAE08 \uD074\uB9AD\uD558\uBA74 \uC989\uC2DC \uB744\uC6C1\uB2C8\uB2E4`,live:!0});if(e.review_session?.failure){let i=e.review_dispatch?.state==="exhausted"&&e.review_session.origin==="auto";return n(`\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694 \xB7 ${i?"\uC790\uB3D9 \uB9AC\uBDF0 1\uD68C \uC18C\uC9C4 \xB7 ":""}${Iv(e.review_session.failure)}`,{title:`${s}
\uC9C1\uC804 \uB9AC\uBDF0 \uC138\uC158 \uC885\uB8CC \uC0AC\uC720: ${e.review_session.failure}`,alert:!0})}return n("\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694",{title:s,alert:!0})}return e.gate?.reason==="spec_id_missing"?n("\uC2A4\uD399 ID \uB204\uB77D",{title:"native spec_id \uBBF8\uAE30\uB85D \u2014 bd update --spec-id \uD544\uC694",alert:!0}):r.length>0?n(`\uC601\uC218\uC99D \uD655\uC778 \uD544\uC694 \xB7 ${r[0]}`,{title:`\uC131\uB9BD\uD558\uC9C0 \uC54A\uB294 \uC2E4\uD589 \uC601\uC218\uC99D \u2014 ${r.join(", ")}`,alert:!0}):e.recovery?n(e.recovery.badge,{title:e.recovery.title,alert:!0}):e.gate?.tier==="verify"&&e.gate.gate_badge==="\uAC80\uC99D \uC2E4\uD328"?n("\uAC80\uC99D \uC2E4\uD328",{title:e.gate.reason||"",alert:!0}):e.queue_failure?n(`\uBA38\uC9C0 \uC2E4\uD328 \u2014 ${Of(e.queue_failure)}`,{title:e.queue_failure,alert:!0}):e.auto_skip?n(`\uC790\uB3D9 \uC81C\uC678 \u2014 ${Of(e.auto_skip)}`,{title:e.auto_skip,alert:!0}):e.queued&&!e.queue_active?n(`\uBA38\uC9C0 \uB300\uAE30 #${e.queue_position}`):e.gate?.enabled===!0?n("\uBA38\uC9C0 \uAC00\uB2A5"):e.gate?.tier==="merged"?n("\uBA38\uC9C0\uB428"):e.gate?.tier==="closed_unmerged"?n("\uB2EB\uD798",{alert:!0}):e.activity?n("\uD655\uC778 \uC911",{live:!0}):e.gate?.tier==="undecidable"||e.gate?.reason==="mergeability_unknown"?n("\uC0C1\uD0DC \uD655\uC778 \uC2E4\uD328",{title:e.gate.reason||"",alert:!0}):e.gate?.tier==="unobserved"||e.gate?.tier==="verify"||e.gate?.gate_badge==="\uAD00\uCE21 \uB300\uAE30"?n("\uD655\uC778 \uC911"):e.gate?.gate_badge?n(e.gate.gate_badge,{title:e.gate.reason||"",alert:e.gate.enabled!==!0}):null}function Hv(e,t,n,r,o=null,s=null,i=null,l=!1,a=null,u=!0,d=null,f=null,h=null,m={},k=!1,R={},j=null,H={active:!1,failure:null,origin:null}){let ne=!!a&&a.position>0,X=!!a?.continuation_action&&a.continuation_action.continuation===null,F=!!a&&a.active===!0,O=a&&a.failure||null,I=Pv(a?a.waiting:null),N=n[e]||null,B=N&&N.gate?N.gate:null,se=N&&N.pr?N.pr:null,q=Dv(a?a.resolution:null),W=Fv(h),Z=Bv(h,W),ee=a&&a.authority||null,Se=a&&a.review_dispatch||null,he=a?.hold?.auto_review_wait==="slot"?"slot":null,ue=!!h&&typeof h=="object"&&qv.has(h.phase),D=ne&&!F&&(!ee||ue||ee.source==="automatic"&&!k),ke=i==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":q?q.badge:i==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC911":I,xe=!!B&&B.base_badge==="\uCDA9\uB3CC",S=!!B&&B.enabled===!0,J=Io({bead_id:e,merge_sha:R.merge_sha,cleanup_cursor:R.cleanup_cursor,merge_progress:s&&s.merge_progress?s.merge_progress:null,cleanup_failed:r,repo_operations:R.repo_operations}),Ee=ri(J),_e=s&&!J&&(s.queueing??null)?s.queueing:null,Ae=!!r&&["repo_operations","child_sweep","branch_cleanup","parent_close"].includes(r.step)&&!!B&&B.tier==="merged",pe=r&&r.step==="repo_operations"&&J?.failed===!0&&(J.step==="deploy"||J.step==="verify")?J.step:null,Pe=l&&!!r&&!!B&&B.tier==="merged",st=D&&(S||xe||B?.reason==="base_behind"||$l.has(B?.reason)||Ae||Pe),Ve=$l.has(B?.reason),M=l&&xe&&u===!1,re=Vn(m,e,{external:l,merge_active:F||J?.step==="merge",merge_queued:ne,conflict_active:!!i,cleanup_active:Ee,merged:!!r||B?.tier==="merged"}),ae=!!re.operation,fe=ne&&!O&&!X&&!Ae&&!(Z&&Z.lock_actions),be=zv({auto_pending:fe,continuation_required:X,queueing:_e,merge_step:J,conflict_badge:ke,conflict_live:q?.live===!0||i==="running",auto_resolution:W,recovery:Z,cleanup_failed:r,cleanup_label:r?Ar(r.step):null,base_exception:f,conflicting:xe,gate:B,receipt_check:N&&N.receipt_check?N.receipt_check:null,queue_failure:O,auto_skip:d,queued:ne,queue_active:F,queue_position:a?a.position:0,review_session:H,review_dispatch:Se,auto_review_wait:he,activity:ke?null:s&&s.activity||null}),le=be?.live===!0&&be.title?c`<span title=${be.title}>${be.label}</span>`:be?.label||null,je=Wv(N&&N.receipt_check?N.receipt_check:null);return{id:e,title:l?c`${t}<span class="muted"> · 세션</span>`:t,reason:r&&J?.active!==!0?ni(r.step):"PR \uB300\uAE30",draggable:!1,done:!0,lane:"pr_wait",...j?{dependency_chips:j}:{},external:l,pr_number:se&&typeof se.number=="number"?se.number:null,pr_url:se&&typeof se.url=="string"?se.url:"",completion_badge:be?.live!==!0&&be?.title?be.label:null,completion_title:be?.title||"",...h?.phase==="needs_human"&&typeof h.log_path=="string"&&h.log_path.length>0?{log_path:h.log_path}:{},...je.length>0?{receipt_badge:{codes:je}}:{},badges:le?[le]:[],live_badge:be?.live===!0?le:null,usage:o,alert:be?.alert===!0,merge_action:B?.tier==="merged"&&!Ae&&!Pe?!1:!ne||X||D||Ve,cancel_action:ne&&!X,cancel_enabled:!F&&!(Z&&Z.lock_actions),cancel_title:Z&&Z.lock_actions?`${Z.badge} \u2014 \uC911\uB2E8\uD558\uB824\uBA74 \uC0C1\uB2E8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8\uC744 \uC0AC\uC6A9\uD558\uC138\uC694`:F?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"\uBA38\uC9C0 \uD050\uC5D0\uC11C \uC774 \uD56D\uBAA9\uC744 \uBE8D\uB2C8\uB2E4 (\uB2E4\uC2DC [\uBA38\uC9C0]\uB85C \uB123\uC744 \uC218 \uC788\uC2B5\uB2C8\uB2E4)",discard:re,discard_action:re.action,merge_step:J,discard_enabled:re.enabled,discard_title:re.title,merge_enabled:!J&&!_e&&!i&&!ae&&!f&&!(Z&&Z.lock_actions)&&!M&&H.active!==!0&&(S||xe||B?.reason==="base_behind"||Ve||Ae||Pe||st||ue&&!F),merge_label:X?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":Ae||Pe?pe==="deploy"?"\uBC30\uD3EC \uC7AC\uC2DC\uB3C4 \uD6C4 \uC815\uB9AC":pe==="verify"?"\uAC80\uC99D \uC7AC\uC2DC\uB3C4 \uD6C4 \uC815\uB9AC":"\uC815\uB9AC \uC7AC\uAC1C":xe&&!J&&!Ae?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":B?.reason==="base_behind"?"base \uAC31\uC2E0 \uD6C4 \uBA38\uC9C0":Ve?"\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0":D?"\uB2E4\uC2DC \uBA38\uC9C0":void 0,merge_title:ae?re.error?`\uD3D0\uAE30 \uC2E4\uD328: ${re.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${re.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:X?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":_e?"\uC694\uCCAD\uC744 \uBCF4\uB0B4\uB294 \uC911 \u2014 \uC11C\uBC84 \uC751\uB2F5\uC744 \uAE30\uB2E4\uB9BD\uB2C8\uB2E4":J?`\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 ${J.label}`:pe?`\uBA38\uC9C0 \uC644\uB8CC \u2014 ${pe==="deploy"?"\uBC30\uD3EC":"\uAC80\uC99D"} \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD574 \uC815\uB9AC\uAC00 \uBA48\uCDC4\uC2B5\uB2C8\uB2E4. \uD074\uB9AD\uD558\uBA74 \uC800\uC7A5\uC18C \uC791\uC5C5\uBD80\uD130 \uC815\uB9AC\uB97C \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4`:Pe?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD569\uB2C8\uB2E4":M?"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uC9C1\uC811 \uD574\uC18C\uD558\uC138\uC694":i==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC2E4\uD589 \uC911 \u2014 \uC644\uB8CC \uD6C4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":i==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC77C\uC2DC\uC815\uC9C0 \u2014 \uC7AC\uAC1C \uD6C4 \uC644\uB8CC\uB418\uBA74 \uBA38\uC9C0\uD558\uC138\uC694":Ae?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uC7AC\uAC1C\uD569\uB2C8\uB2E4":xe?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":B?.reason==="base_behind"?"base\uB97C \uC790\uB3D9 \uAC31\uC2E0\uD55C \uB4A4 \uBA38\uC9C0\uD569\uB2C8\uB2E4":H.active===!0?H.origin==="auto"?"\uC790\uB3D9 \uB9AC\uBDF0 \uC138\uC158 \uC2E4\uD589 \uC911 \u2014 \uB05D\uB098\uBA74 \uC601\uC218\uC99D\uC744 \uB2E4\uC2DC \uD310\uC815\uD569\uB2C8\uB2E4":"\uB9AC\uBDF0 \uC138\uC158 \uC2E4\uD589 \uC911 \u2014 \uB05D\uB098\uBA74 \uC601\uC218\uC99D\uC744 \uB2E4\uC2DC \uD310\uC815\uD569\uB2C8\uB2E4":B?.reason==="review_receipt_missing"?"\uB9AC\uBDF0 \uC601\uC218\uC99D \uC5C6\uC74C \u2014 \uBA38\uC9C0 \uAC8C\uC774\uD2B8 \uBCF4\uB958\uC785\uB2C8\uB2E4. \uD074\uB9AD\uD558\uBA74 \uAE30\uB85D\uB41C \uC138\uC158\uC744 \uC774\uC5B4 \uB9AC\uBDF0\uB9CC \uC218\uD589\uC2DC\uD0A4\uACE0, \uC601\uC218\uC99D\uC774 \uCD5C\uC885 head\uC5D0 \uC720\uD6A8\uD574\uC9C0\uBA74 \uD050\uAC00 \uBA38\uC9C0\uD569\uB2C8\uB2E4":B?.reason==="review_receipt_stale"?"head \uC7AC\uC791\uC131\uB428(\uC601\uC218\uC99D\uC774 \uD604\uC7AC head\uC758 \uC870\uC0C1\uC774 \uC544\uB2D8) \u2014 \uBA38\uC9C0 \uAC8C\uC774\uD2B8 \uBCF4\uB958\uC785\uB2C8\uB2E4. \uD074\uB9AD\uD558\uBA74 \uAE30\uB85D\uB41C \uC138\uC158\uC744 \uC774\uC5B4 \uCD5C\uC885 head\uB97C \uB2E4\uC2DC \uB9AC\uBDF0\uC2DC\uD0A4\uACE0, \uC601\uC218\uC99D\uC774 \uC720\uD6A8\uD574\uC9C0\uBA74 \uD050\uAC00 \uBA38\uC9C0\uD569\uB2C8\uB2E4":B?.reason==="review_receipt_invalid"?"\uB9AC\uBDF0 \uC601\uC218\uC99D \uAE30\uB85D\uC774 \uC131\uB9BD\uD558\uC9C0 \uC54A\uC74C \u2014 \uBA38\uC9C0 \uAC8C\uC774\uD2B8 \uBCF4\uB958\uC785\uB2C8\uB2E4. \uD074\uB9AD\uD558\uBA74 \uAE30\uB85D\uB41C \uC138\uC158\uC744 \uC774\uC5B4 \uCD5C\uC885 head\uB97C \uB2E4\uC2DC \uB9AC\uBDF0\uC2DC\uD0A4\uACE0, \uC601\uC218\uC99D\uC774 \uC720\uD6A8\uD574\uC9C0\uBA74 \uD050\uAC00 \uBA38\uC9C0\uD569\uB2C8\uB2E4":B?.reason==="review_receipt_undetermined"?"\uB9AC\uBDF0 \uC601\uC218\uC99D ancestry probe \uBBF8\uC644\uB8CC \u2014 \uBA38\uC9C0 \uAC8C\uC774\uD2B8 \uBCF4\uB958\uC785\uB2C8\uB2E4. \uD074\uB9AD\uD558\uBA74 \uAE30\uB85D\uB41C \uC138\uC158\uC744 \uC774\uC5B4 \uCD5C\uC885 head\uB97C \uB2E4\uC2DC \uB9AC\uBDF0\uC2DC\uD0A4\uACE0, \uC0C8 \uC601\uC218\uC99D\uC774 \uCD5C\uC885 head\uC5D0 \uC720\uD6A8\uD574\uC9C0\uBA74 \uD050\uAC00 \uBA38\uC9C0\uD569\uB2C8\uB2E4":B?.reason==="spec_id_missing"?"native spec_id \uBBF8\uAE30\uB85D \u2014 bd update --spec-id\uB85C \uAE30\uB85D\uD55C \uB4A4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":S?`\uBA38\uC9C0 (${B.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4 (\uCC28\uB840\uAC00 \uB418\uBA74 \uB2E4\uC2DC \uD655\uC778)`:B&&B.tier==="merged"?"\uBA38\uC9C0\uB428 \u2014 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC \uC9C4\uD589 \uC911":`\uBA38\uC9C0 \uBD88\uAC00: ${B&&B.reason||"\uAD00\uCE21 \uB300\uAE30"}`}}function xl(e,t={}){let{transport:n,issueStores:r,queueStore:o,sessionLogStore:s,gotoIssue:i,getWorkspacePath:l,switchWorkspace:a,openDoc:u,doneRange:d,onDoneRangeChange:f}=t,h=r?jr(r):null,m=Tv(),k=null,R=null,j=Yr(()=>ce()),H=new Map,ne=new Map,X=lf(),F=vl(X)===null,O=d?Mn(d):Ov();function I(){let g=Mr.find(y=>y.value===O);return g?g.label:"\uC624\uB298"}let N=Ci("beads-ui.worker.lane-collapsed"),B=!1,se=new Set,q=new Set,W=new Set,Z=new Set,ee=new Set,Se=null,he=[],ue=Tf({queueStore:o,issueStores:r,transport:n,getWorkspacePath:l,onInvalidate:()=>ce()});function D(){ue.refreshSessionDefaults()}let ke=document.createElement("div");ke.className="worker-console";let xe=document.createElement("div");xe.className="worker-top";let S=document.createElement("div");S.className="worker-drawer-overlay",S.hidden=!0;let J=document.createElement("div");J.className="worker-drawer-overlay__backdrop";let Ee=document.createElement("div");Ee.className="worker-drawer-host";let _e=document.createElement("div");_e.className="worker-drawer-host",_e.hidden=!0,S.append(J,Ee,_e);let Ae=document.createElement("div");Ae.className="worker-lanes-host",ke.append(xe,S,Ae),e.appendChild(ke);let pe=lr(null,null),Pe=[],st=Oi({transport:n,console_el:ke,getLanes:()=>pe,getWorkspaces:()=>Pe,getCrossLanes:()=>null,reproject:()=>({lanes:E(),raw_lanes:null}),onCorrection:()=>{},showToast:ye,requestRender:()=>ce(),adoptQueue:(g,y)=>{o&&o.set(y)},onDragBegin:()=>{k=null}}),Ve=null,M=io(Ee,{transport:n,sessionLogStore:s,onClose:()=>{Ve=null,S.hidden=!0,ce()}}),re=xf(_e,{onClose:()=>{_e.hidden=!0,S.hidden=!0,ce()}}),ae=gf({getWorkspacePath:l||(()=>"")}),fe=l&&l()||"",be=bf({queueStore:o,transport:n,onChanged:()=>ce(),onOpenScript:(g,y)=>{ae.open(g,y)}});function le(){return o&&o.get()||{revision:0,auto_advance:!1,auto_merge:!1,slots:Fi,queue:[],serial_lanes:[],serial_lane_count:0,pr_wait:[],done:[]}}function je(){let g=le(),y=typeof g.serial_lane_count=="number"&&Number.isInteger(g.serial_lane_count)&&g.serial_lane_count>0?Math.min(g.serial_lane_count,5):0,C=Array.isArray(g.serial_lanes)?g.serial_lanes:[],ie=[];for(let Ce of C){if(ie.length>=y)break;!Ce||typeof Ce.id!="string"||!/^s[1-5]$/.test(Ce.id)||!Array.isArray(Ce.entries)||ie.push({id:Ce.id,label:`\uC9C1\uB82C ${Ce.id.slice(1)}`,count:Ce.entries.length})}return ie.length===0?null:[{id:"parallel",label:"\uBCD1\uB82C",count:(Array.isArray(g.queue)?g.queue:[]).length},...ie]}function Ke(g){if(!k||!g.some(C=>C.id===k))return null;let y=je();return y?{bead_id:k,lanes:y}:null}function Je(){return l&&l()||""}async function De(g,y){await st.sendOp({type:"worker-queue-place",payload:{bead_id:g,...y==="parallel"?{}:{lane:y}},root_dir:Je()},g)}function Q(){let g=le();return typeof g.revision=="number"?g.revision:0}function U(g){g&&g.queue&&o&&o.set(g.queue)}async function qe(g){if(!n||!g)return;let y=await n("worker-attempt-pause",{attempt_id:g});y&&y.paused===!1&&y.reason&&ye(`\uC77C\uC2DC\uC815\uC9C0 \uAC70\uBD80: ${y.reason}`,"error",2400)}async function dt(g,y="session"){if(!n||!g)return;let C=await zr();if(C===null)return;let ie=async(Ce={})=>await n("worker-attempt-resume",{attempt_id:g,expected_revision:Q(),...C!==""?{instructions:C}:{},...Ce}),ge=await ie();U(ge),ge&&ge.conflict&&(ge=await ie(),U(ge)),ge=await zn(ge,(Ce,Ye)=>ie({continuation:Ce,decision_token:Ye}),{onResult:U,refresh:()=>ie()}),ge&&ge.resumed===!1&&!ge.conflict&&ge.reason&&ye(`${y==="settlement"?"\uC815\uC0B0 \uC7AC\uAC1C":"\uC774\uC5B4\uD558\uAE30"} \uAC70\uBD80: ${ge.reason}`,"error",2400)}async function tt(g,y,C=!0){if(!n)return null;let ie=n,ge=await ie(g,{...y,expected_revision:Q()});return U(ge),ge&&ge.conflict&&C&&(ge=await ie(g,{...y,expected_revision:Q()}),U(ge)),ge}async function v(g){if(!n||!g)return;let y=le().merge_queue?.find(ie=>ie.bead_id===g)?.continuation_action;if(y?.mismatch&&y.continuation===null){await Be(g,y.mismatch);return}se.add(g),ce();let C;try{C=await tt("worker-merge-queue-add",{bead_id:g})}catch{ye("\uBA38\uC9C0 \uD074\uB9AD\uC774 \uC11C\uBC84\uC5D0 \uC804\uB2EC\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4(\uC5F0\uACB0 \uBB38\uC81C) \u2014 \uC5F0\uACB0 \uBCF5\uAD6C \uD6C4 \uB2E4\uC2DC \uB20C\uB7EC\uC8FC\uC138\uC694","error",3200);return}finally{se.delete(g),ce()}if(!(!C||C.applied)){if(C.conflict){ye("\uD050\uAC00 \uBC14\uB00C\uC5B4 \uBA38\uC9C0 \uD074\uB9AD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uB20C\uB7EC\uC8FC\uC138\uC694","error",2400);return}ye(Mv(C.reason),"error",2400)}}async function z(g){if(!(!n||!g||q.has(g))){q.add(g),ce();try{let y=await n("worker-cleanup-retry",{bead_id:g,expected_revision:Q()});U(y),y&&!y.retried&&!y.conflict&&y.reason&&ye(`\uC815\uB9AC \uC7AC\uAC1C \uAC70\uBD80: ${y.reason}`,"error",2400)}finally{q.delete(g),ce()}}}async function Te(g,y){let C=le().hold;if(!n||!C||typeof C.since!="number")return;let ie=await n(g,{since:C.since});U(ie),ie&&ie.ok===!1&&ye(`${y}: ${ie.reason==="hold_changed"?"\uD050 \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uD655\uC778\uD558\uC138\uC694":ie.reason||""}`,"error",2800)}async function Re(g,y){if(!n||!g||!y)return;let C=await n("worker-parked-retry",{bead_id:g,attempt_id:y});U(C),C&&C.ok===!1&&ye(`\uC7AC\uC2DC\uB3C4 \uAC70\uBD80: ${C.reason==="not_latest"?"\uC774 bead\uC5D0 \uB354 \uC0C8\uB85C\uC6B4 \uC2DC\uB3C4\uAC00 \uC788\uC2B5\uB2C8\uB2E4":C.reason||""}`,"error",2800)}async function Be(g,y){let C=await zn({continuation_mismatch:y},(ge,Ce)=>tt("worker-merge-queue-add",{bead_id:g,continuation:ge,decision_token:Ce},!1)),ie=C?.queue?.merge_queue?.find(ge=>ge.bead_id===g)?.continuation_action;if(C?.applied!==!0&&ie?.continuation===null&&ie.mismatch){await Be(g,ie.mismatch);return}C&&C.applied===!1&&!C.conflict&&ye("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD\uC774 \uCD5C\uC2E0 \uC0C1\uD0DC\uC640 \uC77C\uCE58\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4","error",2800)}async function Xe(g){if(!n)return;let y=await tt("worker-merge-auto-toggle",{on:g});!y||y.conflict||ye(g?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0 \u2014 \uB300\uAE30 \uD56D\uBAA9\uC744 \uBE44\uC6E0\uC2B5\uB2C8\uB2E4",g?"success":"info",2400)}async function ft(g){if(!n||!g)return;let y=await tt("worker-merge-queue-remove",{bead_id:g});y&&!y.conflict&&!y.applied&&y.reason==="merge_active"&&ye("\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error",2400)}async function kt(){await tt("worker-merge-queue-remove",{all:!0})}async function It(g,y=null,C="unmerged",ie=null){if(!n||!g)return;let ge=Ro(g,C);if(!(!!ie||typeof globalThis.confirm!="function"||globalThis.confirm(ge)))return;let Ye=await n("worker-discard",{bead_id:g,...y?{attempt_id:y}:{},...ie?{operation_id:ie}:{},expected_revision:Q()});if(U(Ye),Ye&&Ye.conflict&&(Ye=await n("worker-discard",{bead_id:g,...y?{attempt_id:y}:{},...ie?{operation_id:ie}:{},expected_revision:Q()}),U(Ye)),Ye&&Ye.discarded===!0){ye(zs(Ye),"success",5e3);return}if(Ye&&Ye.reason){ye(`\uD3D0\uAE30 \uC2E4\uD328: ${Ye.reason}`,"error",2800);return}if(Ye&&Ye.accepted&&Ye.pending==="merged_revert"){ye("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success",2400);return}if(Ye&&Ye.accepted&&!Ye.discarded){ye(`\uD3D0\uAE30 \uC9C4\uD589: ${Ye.phase||"\uBC31\uC5C5 \uC911"}`,"success",2400);return}Ye&&!Ye.conflict&&ye("\uD3D0\uAE30 \uAC70\uBD80: unknown","error",2800)}async function $t(g,y,C){if(!(!n||!y||!C||Z.has(y))){Z.add(y),ce();try{let ie=await n(g,{bead_id:y,action_id:C,expected_revision:Q()});U(ie),ie?.conflict?ye("\uC774\uC804 \uC791\uC5C5 \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694.","error",2800):!ie?.ok&&ie?.reason&&ye(`\uC774\uC804 \uC791\uC5C5 \uCC98\uB9AC \uAC70\uBD80: ${String(ie.reason)}`,"error",2800)}finally{Z.delete(y),ce()}}}async function mt(g,y){if(!n||!y||W.has(y))return;W.add(y),ce();let C;try{let ie=async(ge={})=>await n(g,{bead_id:y,expected_revision:Q(),...ge});C=await ie(),U(C),C&&C.conflict&&(C=await n(g,{bead_id:y,expected_revision:Q()}),U(C)),g==="worker-revise-fix"&&(C=await zn(C,(ge,Ce)=>ie({continuation:ge,decision_token:Ce}),{onResult:U,refresh:()=>ie()}))}finally{W.delete(y),ce()}if(!(!C||C.conflict)){if(C.ok){ye(g==="worker-revise-fix"?"\uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4 \u2014 \uC218\uB9AC \uD6C4 \uAD6C\uD604\uC774 \uC7AC\uB514\uC2A4\uD328\uCE58\uB429\uB2C8\uB2E4":"\uB378\uD0C0 \uC2B9\uC778 \uC644\uB8CC \u2014 \uC601\uC218\uC99D \uAC31\uC2E0 + \uD30C\uD0B9 \uD574\uC81C","success",2800);return}ye(`\uCC98\uBD84 \uAC70\uBD80: ${C.reason||""}`,"error",3e3)}}async function Ue(g){if(!n)return;let y=await n("worker-automation-toggle",{on:g,expected_revision:Q()});U(y),y&&y.conflict&&await n("worker-automation-toggle",{on:g,expected_revision:Q()}).then(U)}async function L(g){if(!n||!g)return;let y=await n("worker-repo-operation-dismiss",{operation_id:g});U(y),y&&y.ok===!1&&ye(`\uAE30\uB85D \uB2EB\uAE30 \uAC70\uBD80: ${y.reason||""}`,"error",3e3)}async function te(g){if(!n||!Number.isFinite(g))return;let y=Math.max(Fi,Math.floor(g)),C=await n("worker-queue-set-slots",{slots:y,expected_revision:Q()});U(C),C&&C.conflict&&await n("worker-queue-set-slots",{slots:y,expected_revision:Q()}).then(U)}async function ve(g){if(!n||!Number.isInteger(g)||g<1||g>Cf)return;let y=le(),C=(Array.isArray(y.serial_lanes)?y.serial_lanes:[]).slice(g).reduce((Ce,Ye)=>Ce+(Array.isArray(Ye?.entries)?Ye.entries.length:0),0),ie=()=>({count:g,expected_revision:Q()}),ge=await n("worker-queue-set-serial-lane-count",ie());U(ge),ge&&ge.conflict&&(ge=await n("worker-queue-set-serial-lane-count",ie()),U(ge)),ge&&ge.applied&&C>0&&ye(`\uC9C1\uB82C \uB808\uC778 \uCD95\uC18C \u2014 ${C}\uAC1C \uD56D\uBAA9\uC774 \uBCD1\uB82C \uB300\uAE30\uB85C \uC774\uB3D9`)}function E(){let g=yr(O),y=ue.read({candidate_sort:X,done_since:g});return Pe=y.workspaces,pe=lr(y.workspaces,y.workspaces_state,{done_since:g,candidate_filter:m,candidate_hidden_counts:"per_control",candidate_sort:"as_given",groups:"all"}),pe}function K(g){return g.queue_groups[0]||Ev}function Ie(g){let y=g.dependency_chips||null,C={...y&&y.released?{released:y.released}:{},...y&&y.dependents?{dependents:y.dependents}:{}},ie=H.get(g.id),ge=ne.get(g.id)||null,Ce=ie&&ie.overlaps.length>0?ie.overlaps:null,Ye=!!ie&&ie.scope_missing;return!ge&&!Ce&&!Ye&&Object.keys(C).length===0?null:{...C,...ge?{predecessors:ge}:{},...Ce?{overlaps:Ce}:{},...Ye?{scope_missing:!0}:{}}}function We(g){return{...g,workspace_name:"",done_layout:void 0,dependency_chips:Ie(g)||void 0,chip_popover:Ne(g)}}function Ne(g){return Qs(g,y=>j.isOpen({bead_id:g.id,chip_key:y}))}function nt(){let g=le(),y=new Map;for(let C of Object.values(_n(g.lane_states))){let ie=Array.isArray(C?.corrections)?C.corrections:[];for(let ge of ie)ge&&typeof ge.bead_id=="string"&&typeof ge.after=="string"&&y.set(ge.bead_id,ge.after)}return{admission:_n(g.admission),correction_after:y}}function Le(g,y){let C=We(g),ie=$u(y.admission[g.id]||null,!!g.discard||Z.has(g.id)),ge=y.correction_after.get(g.id);return{...C,draggable:C.draggable===!0&&!ie,stale_work:ie,reason:ie?"":C.reason,badges:ge?[`\u{1F517} ${ge} \uB4A4 (blocks \uC790\uB3D9)`,...C.badges||[]]:C.badges,revise_enabled:C.revise_enabled===!0&&!W.has(g.id)}}function Ge(g){let y=nt();return K(g).sublanes.parallel.map(C=>Le(C,y))}function et(g){let y=nt();return K(g).sublanes.serial.map(C=>{let ie=C.occupants.map(ge=>({id:ge.id,title:ge.title,draggable:!1,lane:C.id,ghost:!0,badges:[ge.badge]}));return{id:C.id,index:C.index+1,raw_length:C.raw_length,ghosts:ie,items:C.items.map(ge=>Le(ge,y)),occupied:C.occupied_by.length>0,badge:C.occupants.length>0?C.occupants[0].badge:"\uB300\uAE30",cycle:C.cycle===!0}})}function yt(g){return g.runnable.map(y=>We(y))}function He(g){return g.done.map(y=>We(y))}function At(g){let y=g.running.filter(C=>C.non_occupying!==!0).map(C=>({...C,bead_id:C.id,attempt_id:C.attempt_id||"",paused:C.run_state==="paused",failed:C.run_state==="failed",parked:C.run_state==="parked",retry_wait:C.run_state==="retry_wait",waiting:C.run_state==="waiting",wait:C.wait||null,status_label:C.run_state==="failed"?C.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328":C.run_state==="parked"?"\uC138\uC158 \uB300\uAE30":C.run_state==="retry_wait"?"\uC7AC\uC2DC\uB3C4 \uB300\uAE30":C.run_state==="waiting"?"\uC120\uD589 \uB300\uAE30":void 0,can_pause:C.can_pause!==!1,workspace_name:"",dependency_chips:Ie(C)||void 0,chip_popover:Ne(C),rollup_expanded:ee.has(C.id),failure:C.failure?{...C.failure,open:R===C.attempt_id}:null}));return[...y.filter(C=>C.failed===!0),...y.filter(C=>C.failed!==!0&&C.parked===!0),...y.filter(C=>C.failed!==!0&&C.parked!==!0)]}function qt(g){return ut(g).map(y=>({...y,chip_popover:Ne(y)}))}function ut(g){if(Se&&Se.model===g)return Se.rows;let y=le(),C=K(g),ie=_n(y.attempts),ge=Object.values(ie).filter(Kn),Ce=new Map;for(let ze of ge)Ce.set(ze.attempt_id,ze);let Ye=new Map;for(let ze of ge)Ye.set(ze.bead_id,ze);let xt=new Map;for(let ze of[...g.pr_wait,...g.running,...g.queue,...g.runnable,...g.done])xt.has(ze.id)||xt.set(ze.id,ze);let Bt=ze=>{let Dt=null;for(let bn of ge)!bn||bn.bead_id!==ze||Ma(bn,Ce)||(Dt===null||(typeof bn.started_at=="number"?bn.started_at:0)>=(typeof Dt.started_at=="number"?Dt.started_at:0))&&(Dt=bn);return Dt&&typeof Dt.target_base=="string"?Dt.target_base:null},Zt=new Map;for(let ze of g.running)ze.run_state==="failed"||ze.conflict_resolution!==!0||(ze.run_state!=="paused"?Zt.set(ze.id,"running"):Zt.has(ze.id)||Zt.set(ze.id,"paused"));let dn=_n(y.auto_merge_skips),qn=new Set(C.merge.auto_excluded),On=_n(y.pr_observations),wn=_n(y.pr_activity),Fn=_n(y.cleanup_failed),Yt=_n(y.discard_operations),er=_n(y.bead_workflow),Ln=_n(y.bead_titles),tr=y.merge_queue_state||{active:null,failures:{}},In=C.merge.state.waiting,jn=new Map;for(let ze of Array.isArray(y.merge_queue)?y.merge_queue:[])ze&&typeof ze=="object"&&ze.bead_id&&jn.set(ze.bead_id,ze);let fr=(Array.isArray(y.pr_wait)?y.pr_wait:[]).map(ze=>{let Dt=xt.get(ze.bead_id);return{...Hv(ze.bead_id,Dt?.title||Ln[ze.bead_id]||ze.bead_id,On,Fn[ze.bead_id]||null,Gn(ie,ze.bead_id),wn[ze.bead_id]||(se.has(ze.bead_id)?{activity:null,merge_progress:null,queueing:"merge"}:q.has(ze.bead_id)?{activity:null,merge_progress:null,queueing:"cleanup"}:null),Zt.get(ze.bead_id)||null,ze.external===!0,{position:C.merge.positions.get(ze.bead_id)||0,active:tr.active===ze.bead_id,failure:_n(tr.failures)[ze.bead_id]||null,waiting:In&&In.bead_id===ze.bead_id?In.reason:null,resolution:C.merge.resolutions.get(ze.bead_id),continuation_action:C.merge.continuations.get(ze.bead_id),authority:C.merge.authorities.get(ze.bead_id)||null,hold:jn.get(ze.bead_id)?.hold||null,review_dispatch:jn.get(ze.bead_id)?.review_dispatch||null},ze.wt_present!==!1,y.auto_merge===!0&&qn.has(ze.bead_id)?dn[ze.bead_id]?.reason||"":null,Ia(C.declared_base,Bt(ze.bead_id)),_n(y.completion_status)[ze.bead_id]||null,Yt,y.auto_merge===!0,{merge_sha:ze.merge_sha,cleanup_cursor:ze.cleanup_cursor,repo_operations:C.repo_operations},Dt?Ie(Dt):null,yu(ie,ze.bead_id)),workflow:er[ze.bead_id]||null,priority:Dt?.priority,from_id:Dt?.from_id,...Dt?.created_at===void 0?{}:{created_at:Dt.created_at},...Dt?.updated_at===void 0?{}:{updated_at:Dt.updated_at}}});return Se={model:g,rows:fr},fr}function Vt(g){let y=K(g),C=[];for(let Ce of g.running)Ce.non_occupying!==!0&&C.push({id:Ce.id,title:Ce.title,location_label:"\uC2E4\uD589\uC911",kind:"running",lane_id:Ce.serial_lane_id??null});for(let Ce of g.pr_wait)C.push({id:Ce.id,title:Ce.title,location_label:"PR \uB300\uAE30",kind:"pr_wait",lane_id:null});for(let Ce of y.sublanes.serial)Ce.items.forEach((Ye,xt)=>{C.push({id:Ye.id,title:Ye.title,location_label:`${Ce.id} #${xt+1}`,kind:"serial",lane_id:Ce.id})});y.sublanes.parallel.forEach((Ce,Ye)=>{C.push({id:Ce.id,title:Ce.title,location_label:`#${Ye+1}`,kind:"parallel",lane_id:null})});for(let Ce of g.runnable)C.push({id:Ce.id,title:Ce.title,location_label:"\uD6C4\uBCF4",kind:"candidate",lane_id:null,queue_placeable:Ce.queue_placeable===!0});let ie=le();H=pf(ie.bead_scope,C);let ge=new Map;for(let Ce of[...g.running,...g.runnable])Array.isArray(Ce.blocked_by)&&Ce.blocked_by.length>0&&ge.set(Ce.id,Ce.blocked_by);for(let[Ce,Ye]of Object.entries(_n(ie.bead_blocked_by)))Array.isArray(Ye)&&ge.set(Ce,Ye.filter(xt=>typeof xt=="string"&&xt.length>0));ne=Iu(ge,C,_n(ie.blocker_workspaces))}function Et(g){let y=g.hold&&typeof g.hold=="object"?g.hold:null;if(!y||y.kind!=="env"&&y.kind!=="systemic")return"";let C=ur(y.cause)||String(y.cause||""),ie=Array.isArray(g.lineages)?g.lineages:[];if(y.kind==="env"){let Ce=ie.map(xt=>xt&&xt.next_at).filter(xt=>typeof xt=="number").sort((xt,Bt)=>xt-Bt)[0],Ye=typeof Ce=="number"?` \xB7 \uB2E4\uC74C ${new Date(Ce).toLocaleTimeString("ko-KR",{hour:"2-digit",minute:"2-digit"})}`:"";return c`<div class="worker-hold worker-hold--env" role="status">
        <span class="worker-hold__text"
          >환경 보류: ${C} — 재시도 대기${Ye}</span
        >
        <button
          type="button"
          class="worker-hold__retry"
          title="예약된 재시도를 지금 실행합니다"
        >
          지금 재시도
        </button>
      </div>`}let ge=(Array.isArray(y.bead_ids)?y.bead_ids:[]).filter(Ce=>typeof Ce=="string"&&Ce.length>0);return c`<div class="worker-hold worker-hold--systemic" role="alert">
      <span class="worker-hold__text"
        >${C}${ge.length>0?` \u2014 bead ${ge.join(", ")}`:""}</span
      >
      <button
        type="button"
        class="worker-hold__resume"
        title="정지를 풀고 멈춰 있던 bead를 다시 디스패치합니다"
      >
        재개
      </button>
    </div>`}function Mt(g){let y=le(),C=K(g),ie=C.sublanes.parallel,ge=ie.length>0?ie[0].id:"\u2014",Ce=c`<button
      type="button"
      class="worker-play${y.auto_advance?" is-active":""}"
    >
      ${y.auto_advance?"\u23F8 \uC790\uB3D9\uD654 \uBA48\uCDA4":"\u25B6 \uC790\uB3D9\uD654"}
    </button>`,Ye=Ft(g),xt=C.over_cap?c`<span
          class="worker-overcap"
          title="수동 재개(▶)는 슬롯 cap을 초과할 수 있습니다 — 자동 진행은 cap을 지킵니다"
          >cap 초과</span
        >`:"",Bt=y.auto_advance?0:(Array.isArray(y.queue)?y.queue:[]).filter(Yt=>Yt&&typeof Yt.armed_by_lane=="string"&&Yt.armed_by_lane.length>0).length,Zt=Bt>0?c`<span
            class="worker-kpi__chip worker-kpi__chip--armed"
            title="모니터 연결 레인이 발차한 대기 행입니다 — 이 레포의 자동 진행은 꺼진 채입니다"
            >⏸ 자동 진행 꺼짐 · 연결 레인 ${Bt}건 진행 중</span
          >`:"",dn=c`<span class="worker-kpi__chip worker-kpi__chip--running"
        >실행 <b>${C.live_count}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--pr"
        >PR 대기 <b>${qt(g).length}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--done"
        >${I()} 완료 <b>${g.done.length}</b></span
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
          ${Array.from({length:Cf},(Yt,er)=>er+1).map(Yt=>c`<option
                value=${String(Yt)}
                ?selected=${C.serial_lane_count===Yt}
              >
                ${Yt}
              </option>`)}
        </select>
      </label> `,wn=wu(C.repo_operations,C.cleanup_failures),Fn=Et(y);return B?c`<div class="worker-ribbon">
          ${Ce} ${Ye}
          <div class="worker-kpi worker-kpi--ribbon">
            ${xt}${Zt}${dn}
          </div>
        </div>
        <div class="worker-ctrl worker-ctrl--mobile">
          <div class="worker-ctrl__ops">${On}</div>
          <div class="worker-kpi">${qn}</div>
        </div>
        ${Fn}${wn}${be.template()}`:c`<div class="worker-ctrl">
        <div class="worker-ctrl__ops">${Ce}${Ye}${On}</div>
        <div class="worker-kpi">
          ${xt}${Zt}${dn}${qn}
          ${(Array.isArray(C.token_total)?C.token_total:C.token_total?[{label:C.token_total,tooltip:`${I()} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}]:[]).map(Yt=>c`<span
                class="worker-kpi__chip worker-kpi__chip--tokens"
                title=${Yt.tooltip}
                >${I()} 완료 · 누적 ${Yt.label}</span
              >`)}
          <span class="worker-kpi__next worker-stat"
            >다음 <b>${ge}</b></span
          >
        </div>
      </div>
      ${Fn}${wn}${be.template()}`}function Wt(g){let y=g.runnable_hidden;return c`<div class="worker-filter">
      <label class="worker-filter__tgl" title="blocked 이슈 표시 (기본 숨김)">
        <input
          type="checkbox"
          class="worker-filter__blocked"
          .checked=${m.show_blocked}
        />
        🔒 blocked${y.blocked>0?` ${y.blocked}`:""}
      </label>
      <div class="worker-filter__spec" role="group" aria-label="spec 필터">
        ${Rv.map(C=>c`<button
              type="button"
              class="worker-filter__chip${m.spec===C.value?" is-active":""}"
              data-spec=${C.value}
              aria-pressed=${m.spec===C.value?"true":"false"}
            >
              ${C.label}
            </button>`)}
        ${y.spec>0?c`<span class="worker-filter__hidden">숨김 ${y.spec}</span>`:""}
      </div>
    </div>`}function Xt(){let g=F?"custom":vl(X)||"custom";return c`<select
      class="worker-sort"
      aria-label="후보 정렬"
      title="후보 정렬"
      .value=${g}
    >
      ${ts.map(y=>c`<option value=${y.id} ?selected=${g===y.id}>
            ${y.label}
          </option>`)}
      <option value="custom" ?selected=${g==="custom"}>
        사용자 지정…
      </option>
    </select>`}function tn(){let g=ns(X);return c`<div
      class="worker-sort-chain"
      role="group"
      aria-label="후보 정렬 체인"
    >
      ${[0,1,2].map(y=>{let C=g[y];return c`<span class="worker-sort-chain__step">
          <select
            class="worker-sort-chain__key"
            data-step=${y}
            aria-label=${`${y+1}\uCC28 \uC815\uB82C \uD0A4`}
            .value=${C?C.key:""}
          >
            ${y===0?"":c`<option value="" ?selected=${!C}>없음</option>`}
            ${af.map(ie=>c`<option
                  value=${ie.key}
                  ?selected=${!!C&&C.key===ie.key}
                >
                  ${ie.label}
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
    </div>`}function zt(){return c`<div class="worker-done-controls">
      <select
        class="worker-sort worker-done-range"
        aria-label="완료 기간"
        title="완료 기간"
        .value=${O}
      >
        ${Mr.map(g=>c`<option value=${g.value} ?selected=${O===g.value}>
              ${g.label}
            </option>`)}
      </select>
    </div>`}function Ft(g){let y=K(g).merge,C=le().auto_merge===!0;if(y.running)return c`<button
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
      </button>`;let ie=new Set(y.auto_excluded),ge=qt(g).filter(Ce=>Ce.merge_action&&Ce.merge_enabled&&!ie.has(Ce.id)).length;return c`<button
      type="button"
      class="worker-merge-all"
      title="켜 두면 자격이 생기는 PR을 계속 큐에 넣어 순서대로 충돌 해소·머지합니다"
    >
      ▶ 자동 머지${ge>0?` ${ge}`:""}
    </button>`}function un(g){if(!(g.draggable!==!0||g.done===!0))return c`<span class="worker-mini__rowops">
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
    </span>`}function Pt(g,y){return c`<div
      data-bead-id=${g.id}
      data-drag-kind=${y.kind}
      data-root-dir=${y.root_dir}
      data-lane-id=${nn(y.lane_id)}
      data-row-index=${y.row_index}
      data-queue-index=${String(g.queue_index??0)}
    >
      ${An(g,{actions:un(g)})}
    </div>`}function Kt(g){let y=Ge(g),C=Je();return Js({parallel:{rows:y.map((ie,ge)=>Pt(ie,{kind:"parallel",root_dir:C,row_index:ge})),count:y.length,collapsed:N.isAreaCollapsed("parallel"),drop:{drop:"parallel",root_dir:C}},serial:{lanes:et(g).map(ie=>({id:ie.id,title:`\uC9C1\uB82C ${ie.index}`,rows:[...ie.ghosts.map(ge=>An(ge,{actions:un(ge)})),...ie.items.map((ge,Ce)=>Pt(ge,{kind:"repo-serial",root_dir:C,row_index:Ce,lane_id:ie.id}))],count:ie.ghosts.length+ie.items.length,empty:ie.ghosts.length+ie.items.length===0,badge:ie.badge,held:ie.occupied,cycle:ie.cycle,drop:{drop:"repo-serial",root_dir:C,lane_id:ie.id,lane_length:String(ie.raw_length)}})),collapsed:N.isAreaCollapsed("serial")}})}function jt(g){return yp(At(g),Date.now(),Ve)}function Qt(g){return g.running.some(y=>y.kind!=="session"&&y.run_state==="running")}function de(g){let y=K(g),C=yt(g),ie=Ge(g),ge=He(g),Ce=qt(g),Ye=At(g),xt=Nn({id:"worker-pane-candidate",lane:"candidate",title:"\uD6C4\uBCF4",items:C,src:!0,empty:"\uD6C4\uBCF4 \uC5C6\uC74C",header_control:Xt(),header_row:F?tn():void 0,controls:Wt(g),collapsible:!0,collapsed:N.isCollapsed("candidate"),place_menu:Ke(C),onOpenDoc:u?(Zt,dn)=>u(dn):void 0}),Bt=Nn({id:"worker-pane-done",lane:"done",title:"\uC644\uB8CC",items:ge,empty:`${I()} \uC644\uB8CC \uC5C6\uC74C`,header_control:zt(),collapsible:!0,collapsed:N.isCollapsed("done"),preview:B?Array.isArray(y.token_total)?y.token_total.map(Zt=>Zt.label).join(" \xB7 "):y.token_total||Rf(ge):void 0});return B?c`<div class="worker-lanes worker-lanes--mobile">
        ${ei({live:Qt(g),running_body:Ye.length>0?jt(g):"",pr_wait_rows:Ce.map(Zt=>An(Zt)),count:Ye.length+Ce.length})}
        ${Nn({id:"worker-pane-queue",lane:"queue",title:"\uB300\uAE30",items:ie,count:ie.length,collapsible:!0,collapsed:N.isCollapsed("queue"),preview:Rf(ie),body:Kt(g)})}
        ${xt} ${Bt}
      </div>`:c`<div class="worker-lanes">
      ${xt}
      ${Nn({id:"worker-pane-queue",lane:"queue",title:"\uB300\uAE30",items:ie,count:ie.length,collapsible:!0,collapsed:N.isCollapsed("queue"),body:Kt(g)})}
      ${Nn({id:"worker-pane-running",lane:"running",title:"\uC2E4\uD589 \uC911",items:Ye,header_control:c`<span class="worker-pane__meta"
          >슬롯 ${y.slots}</span
        >`,live:Qt(g),collapsible:!0,collapsed:N.isCollapsed("running"),body:jt(g)})}
      ${Nn({id:"worker-pane-pr-wait",lane:"pr_wait",title:"PR \uB300\uAE30",items:Ce,empty:"PR \uB300\uAE30 \uC5C6\uC74C",collapsible:!0,collapsed:N.isCollapsed("pr_wait")})}
      ${Bt}
    </div>`}function T(g){N.toggle(g),ce()}function me(g){N.toggleArea(g),ce()}function ce(){let g=E();Vt(g),it(Mt(g),xe),it(de(g),Ae)}function b(){let g=!0,y=Ti(C=>{if(B=C,g){g=!1;return}ce()});he.push(y)}function p(g){m=g,Cv(g),ce()}function _(g){if(g==="custom"){F=!0,ce();return}X=Or(g),wl(X),F=!1,ce()}function A(g){X=Or({chain:g}),wl(X),ce()}function Y(g){O=Mn(g),Lv(O),f?.(O),ce()}function V(g){let y=g.target?.closest?.(".worker-serial-lane-count");if(y){let Bt=Number.parseInt(y.value,10);Number.isFinite(Bt)&&ve(Bt).then(ce);return}let C=g.target?.closest?.(".worker-filter__blocked");if(C){p({...m,show_blocked:C.checked});return}let ie=g.target?.closest?.(".worker-sort-chain__key");if(ie){let Bt=Number.parseInt(ie.getAttribute("data-step")||"",10);Number.isFinite(Bt)&&A(cf(ns(X),Bt,ie.value));return}let ge=g.target?.closest?.(".worker-done-range");if(ge){Y(ge.value);return}let Ce=g.target?.closest?.(".worker-sort");if(Ce){_(Ce.value);return}let Ye=g.target?.closest?.(".worker-slots__input");if(!Ye)return;let xt=Number.parseInt(Ye.value,10);if(!Number.isFinite(xt)){ce();return}te(xt).then(ce)}function oe(g){return g?{runner:g.runner||void 0,model:g.model||void 0,effort:g.effort||void 0,worktree:g.worktree||void 0,status:g.status||void 0,session_id:g.session_id||void 0}:{}}function $e(){let g=K(E()),y=le().workspace_info,C=y&&typeof y=="object"&&y.repo_ops&&typeof y.repo_ops=="object"?y.repo_ops:null;return{operations:g.repo_operations,cleanup_failures:g.cleanup_failures,repo:l&&l()||"",repo_ops:C}}function Qe(){Ve&&M.close(),_e.hidden=!1,S.hidden=!1,re.open($e()),ce()}function at(g){let y=le(),C=y.attempts?y.attempts[g]:null;Ve=g,re.close(),_e.hidden=!0,S.hidden=!1,M.open({attempt_id:g,meta:oe(C)}),ce()}function vt(g){let y=le(),C=(Array.isArray(y.session_active)?y.session_active:[]).find(ge=>ge&&ge.bead_id===g),ie=(C&&Array.isArray(C.session_refs)?C.session_refs:[]).find(ge=>ge&&ge.current===!0);ie&&(re.close(),_e.hidden=!0,S.hidden=!1,M.open(Hr(ie,g,"in_progress")),ce())}function gt(){if(re.isOpen()&&re.refresh($e()),!Ve)return;let g=le(),y=g.attempts?g.attempts[Ve]:null;if(y){M.updateMeta(oe(y));return}M.close()}function $(g,y){if(g.length===0||!i)return;let C=l?l():void 0;if(y.length===0||!C||y===C||!a){i(g);return}Promise.resolve(a(y)).then(()=>{i(g)}).catch(()=>{ye("\uB808\uD3EC \uC804\uD658\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error",2400)})}function x(g){let y=g.target;if(y?.closest?.(".worker-mini__grip"))return;let C=y?.closest?.(".worker-sort-chain__dir");if(C){let Me=Number.parseInt(C.getAttribute("data-step")||"",10);Number.isFinite(Me)&&A(uf(ns(X),Me));return}let ie=y?.closest?.(".worker-dep__open");if(ie){$(ie.getAttribute("data-dep-id")||"",ie.getAttribute("data-root-dir")||"");return}let ge=y?.closest?.(".judgement-chip");if(ge){let Me=ge.closest("[data-bead-id]"),Tt=Me&&Me.getAttribute("data-bead-id")||"",Ht=ge.getAttribute("data-chip-key")||"";Tt&&Ht&&j.toggle({bead_id:Tt,chip_key:Ht});return}if(y?.closest?.(".chip-popover"))return;if(y?.closest?.(".worker-repo-strip")){Qe();return}let Ce=y?.closest?.(".worker-repo-op__dismiss");if(Ce){L(Ce.dataset.operationId||"");return}let Ye=y?.closest?.(".worker-cleanup__resume");if(Ye){let Me=Ye.dataset.beadId;Me&&z(Me);return}if(y?.closest?.(".worker-hold__retry")){Te("worker-queue-hold-retry-now","\uC9C0\uAE08 \uC7AC\uC2DC\uB3C4 \uAC70\uBD80");return}if(y?.closest?.(".worker-hold__resume")){Te("worker-queue-hold-resume","\uC7AC\uAC1C \uAC70\uBD80");return}if(y?.closest?.(".worker-play")){Ue(!le().auto_advance);return}let xt=y?.closest?.(".worker-merge-all");if(xt){xt.classList.contains("worker-merge-all--stop")?le().auto_merge===!0?Xe(!1):kt():Xe(!0);return}let Bt=y?.closest?.(".worker-pane__toggle[data-lane]");if(Bt){let Me=Bt.dataset.lane;(Me==="candidate"||Me==="queue"||Me==="running"||Me==="pr_wait"||Me==="done")&&T(Me);return}let Zt=y?.closest?.(".worker-wait__area-toggle[data-area]");if(Zt){let Me=Zt.dataset.area;(Me==="parallel"||Me==="serial")&&me(Me);return}let dn=y?.closest?.(".worker-card__place-lane");if(dn){let Me=dn.dataset.beadId,Tt=dn.dataset.lane;Me&&(Tt==="parallel"||/^s[1-5]$/.test(Tt||""))&&(k=null,ce(),De(Me,Tt));return}if(y?.closest?.(".worker-card__place-cancel")){k=null,ce();return}let On=y?.closest?.(".worker-card__place");if(On){let Me=On.dataset.beadId;Me&&!On.disabled&&(je()?(k=Me,ce()):De(Me,"parallel"));return}let wn=y?.closest?.(".worker-filter__chip");if(wn){let Me=wn.dataset.spec;(Me==="all"||Me==="with"||Me==="without")&&p({...m,spec:Me});return}let Fn=y?.closest?.('[data-action="queue-remove"]');if(Fn){let Me=Fn.dataset.beadId||"";Me&&st.sendOp({type:"worker-queue-remove",payload:{bead_id:Me},root_dir:Je()},Me);return}let Yt=y?.closest?.(".worker-mini__merge");if(Yt){let Me=Yt.dataset.beadId||"";le().cleanup_failed?.[Me]?z(Me):v(Me);return}let er=y?.closest?.(".worker-mini__merge-cancel");if(er){ft(er.dataset.beadId||"");return}let Ln=y?.closest?.(".worker-mini__discard");if(Ln){It(Ln.dataset.beadId||"",Ln.dataset.attemptId||null,Ln.dataset.discardMode==="merged"?"merged":"unmerged",Ln.dataset.operationId||null);return}let tr=y?.closest?.(".worker-mini__stale-continue");if(tr){$t("worker-stale-work-continue",tr.dataset.beadId||"",tr.dataset.actionId||"");return}let In=y?.closest?.(".worker-mini__stale-backup");if(In){$t("worker-stale-work-backup-fresh",In.dataset.beadId||"",In.dataset.actionId||"");return}let jn=y?.closest?.(".worker-mini__stale-recheck");if(jn){$t("worker-stale-work-recheck",jn.dataset.beadId||"",jn.dataset.actionId||"");return}let fr=y?.closest?.(".worker-mini__revise-fix");if(fr){mt("worker-revise-fix",fr.dataset.beadId||"");return}let ze=y?.closest?.(".worker-mini__revise-approve");if(ze){mt("worker-revise-approve",ze.dataset.beadId||"");return}if(y?.closest?.(".worker-mini__pr"))return;let Dt=y?.closest?.(".rtile__failure-badge");if(Dt){let Me=Dt.dataset.attemptId||"";R=R===Me?null:Me,ce();return}let bn=y?.closest?.(".rtile__attempt-copy");if(bn){let Me=bn.dataset.attemptId||"";Me&&on(Me).then(Tt=>{ye(Tt?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",Tt?"success":"error",1400)});return}if(y?.closest?.(".rtile__parked-retry")){let Me=y?.closest?.(".rtile");Re(Me?.dataset?.beadId||"",Me?.dataset?.attemptId||"");return}let lo=y?.closest?.(".rtile__discard");if(lo){let Me=y?.closest?.(".rtile"),Tt=Me?.dataset?.beadId,Ht=Me?.dataset?.attemptId;Tt&&It(Tt,Ht||null,lo.dataset.confirmation==="merged"?"merged":"unmerged",lo.dataset.operationId||null);return}if(y?.closest?.(".rtile__pause")){let Tt=y?.closest?.(".rtile")?.dataset?.attemptId;Tt&&qe(Tt);return}if(y?.closest?.(".rtile__resume")){let Me=y?.closest?.(".rtile__resume"),Ht=y?.closest?.(".rtile")?.dataset?.attemptId;Ht&&dt(Ht,Me?.dataset?.resumeKind==="settlement"?"settlement":"session");return}if(y?.closest?.(".rtile__session")){let Me=y?.closest?.(".rtile"),Tt=Me?.dataset?.attemptId;if(Tt){at(Tt);return}let Ht=Me?.dataset?.beadId;Ht&&vt(Ht);return}if(y?.closest?.(".rtile__failure-pop"))return;if(y?.closest?.(".worker-drawer-overlay__backdrop")){re.close(),M.close();return}if(y?.closest?.(".worker-drawer-host"))return;let os=y?.closest?.(".rtile .board-card__roll-toggle");if(os){let Me=os.dataset.rollParent;Me&&(ee.has(Me)?ee.delete(Me):ee.add(Me),ce());return}let ss=y?.closest?.(".rtile .board-card__roll-child");if(ss){let Me=ss.dataset.childId;Me&&i&&i(Me);return}let co=y?.closest?.(".rtile");if(co){if(y?.closest?.(".rtile__id")){let Tt=co.dataset.beadId;Tt&&on(Tt).then(Ht=>{Ht?ye("\uBCF5\uC0AC\uB428","success",1200):ye("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}let Me=co.dataset.beadId;Me&&i&&i(Me);return}let is=y?.closest?.(".worker-mini, .worker-card");if(is){let Me=is.dataset.beadId;if(y?.closest?.('[data-seam="log-path-copy"]'))return;if(y?.closest?.(".worker-mini__id, .worker-card__id")){Me&&on(Me).then(Ht=>{Ht?ye("\uBCF5\uC0AC\uB428","success",1200):ye("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}let Tt=y?.closest?.(".ctl-chip--from");if(Tt){let Ht=Tt.dataset.fromId;Ht&&i&&i(Ht);return}Me&&i&&i(Me)}}st.attach(e),e.addEventListener("click",x),e.addEventListener("change",V);function Oe(g){let y=g.target,C=y&&typeof y.closest=="function"?ie=>y.closest(ie):()=>null;R&&!C(".rtile__failure-pop, .rtile__failure-badge")&&(R=null,ce())}function Fe(g){g.key!=="Escape"||R===null||(R=null,ce())}return document.addEventListener("click",Oe),document.addEventListener("keydown",Fe),j.attach(),he.push(()=>{document.removeEventListener("click",Oe),document.removeEventListener("keydown",Fe),j.detach()}),b(),h&&he.push(h.subscribe(()=>{ue.notifyIssuesChanged(),ce()})),o&&he.push(o.subscribe(()=>{let g=l&&l()||"";g!==fe&&(fe=g,ae.close()),ce(),gt()})),ce(),{load(){ue.ensureSessionDefaults(),ce()},refreshSessionDefaults:D,destroy(){for(let g of he.splice(0))try{g()}catch{}st.detach(),e.removeEventListener("click",x),e.removeEventListener("change",V),ue.destroy();try{M.destroy()}catch{}S.hidden=!0;try{ae.destroy()}catch{}it(c``,e)}}}function Al(e){if(!e)return"Unknown";let t=e.split("/").filter(Boolean);return t.length>0?t[t.length-1]:"Unknown"}function Mf(e,t,n,r=async()=>{},o=async()=>{}){let s=Rt("views:workspace-picker"),i=null,l=!1,a=!1,u=!1;async function d(I){let B=I.target.value,q=t.getState().workspace?.current?.path||"";if(B&&B!==q){s("switching workspace to %s",B),l=!0,O();try{await n(B)}catch(W){s("workspace switch failed: %o",W)}finally{l=!1,O()}}}async function f(){let I=t.getState(),N=I.workspace?.current?.path||I.workspace?.available?.[0]?.path||"";if(!(!N||a)){s("git-pulling workspace %s",N),a=!0,O();try{await r(N)}catch(B){s("workspace git pull failed: %o",B)}finally{a=!1,O()}}}function h(I){let N=I.target;N&&e.contains(N)||R()}function m(I){I.key==="Escape"&&R()}function k(){u||(u=!0,document.addEventListener("mousedown",h),document.addEventListener("keydown",m),O())}function R(){u&&(u=!1,document.removeEventListener("mousedown",h),document.removeEventListener("keydown",m),O())}function j(){u?R():k()}async function H(I){let N=I.target,B=N.value,se=N.checked;s("toggling visibility %s \u2192 %s",B,String(se));try{await o(B,se)}catch(q){s("workspace visibility toggle failed: %o",q)}}function ne(I){return I?c`
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
    `:c``}function X(I,N){return c`
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
                        .checked=${!N.has(B.path)}
                        @change=${H}
                      />
                      <span class="workspace-picker__manage-name"
                        >${Al(B.path)}</span
                      >
                    </label>
                  `)}
              </div>
            `:""}
      </div>
    `}function F(){let I=t.getState(),N=I.workspace?.current,B=I.workspace?.available||[],se=new Set(I.workspace?.hidden||[]),q=N?.path||B[0]?.path||"";if(B.length===0)return c``;let W=B.filter(Z=>!se.has(Z.path)||Z.path===q);if(W.length<=1){let Z=W[0]||B[0],ee=Al(Z.path);return c`
        <div class="workspace-picker workspace-picker--single">
          <span class="workspace-picker__label" title="${Z.path}"
            >${ee}</span
          >
          ${X(B,se)}
          ${ne(q)}
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
                ?selected=${Z.path===q}
                title="${Z.path}"
              >
                ${Al(Z.path)}
              </option>
            `)}
        </select>
        ${X(B,se)}
        ${ne(q)}
        ${l||a?c`<span
              class="workspace-picker__loading"
              aria-hidden="true"
            ></span>`:""}
      </div>
    `}function O(){it(F(),e)}return O(),i=t.subscribe(()=>O()),{destroy(){i&&(i(),i=null),document.removeEventListener("mousedown",h),document.removeEventListener("keydown",m),it(c``,e)}}}var Pf=["update-status","edit-text","update-priority","create-issue","dep-add","dep-remove","update-assignee","update-exec-settings","update-impl-target","get-session-defaults","set-session-defaults","get-workspace-accounts","set-workspace-accounts","update-workflow-meta","label-add","label-remove","subscribe-list","unsubscribe-list","snapshot","upsert","delete","get-comments","add-comment","delete-issue","list-workspaces","set-workspace","set-workspace-visibility","get-workspace","workspace-changed","git-pull-workspace","subscribe-worker-queue","unsubscribe-worker-queue","worker-queue-snapshot","worker-queue-place","worker-queue-reorder","worker-queue-toggle","worker-automation-toggle","worker-repo-ops-opt-out-toggle","worker-repo-operation-dismiss","worker-repo-operation-deploy-run","worker-queue-set-slots","worker-queue-set-serial-lane-count","worker-queue-set-orchestration-defaults","worker-queue-remove","worker-attempt-pause","worker-attempt-stop","worker-attempt-resume","worker-cleanup-retry","worker-parked-retry","worker-queue-hold-resume","worker-queue-hold-retry-now","worker-merge-queue-add","worker-merge-queue-add-all","worker-merge-auto-toggle","worker-merge-queue-remove","worker-discard","worker-stale-work-continue","worker-stale-work-backup-fresh","worker-stale-work-recheck","worker-pr-discard","worker-revise-fix","worker-revise-approve","subscribe-ui-order","unsubscribe-ui-order","ui-order-set","ui-order-snapshot","subscribe-display-policy","unsubscribe-display-policy","display-policy-set","display-policy-snapshot","subscribe-session-log","unsubscribe-session-log","session-log-snapshot","session-log-append","get-attempt-prompt","get-bead-prompt","get-bead-timeline","get-worker-system-prompt","get-session-refs","subscribe-monitor-pipeline","unsubscribe-monitor-pipeline","monitor-pipeline-snapshot","subscribe-impl-presets","unsubscribe-impl-presets","impl-presets-snapshot","impl-preset-create","impl-preset-update","impl-preset-delete","apply-impl-preset","apply-impl-preset-global","monitor-auto-toggle","monitor-lane-create","monitor-lane-update","monitor-lane-confirm","monitor-lane-remove"];function Sl(){let e=Date.now().toString(36),t=Math.random().toString(36).slice(2,8);return`${e}-${t}`}function Df(e,t,n=Sl()){return{id:n,type:e,payload:t}}function Nf(e={}){let t=Rt("ws"),n={initialMs:e.backoff?.initialMs??1e3,maxMs:e.backoff?.maxMs??3e4,factor:e.backoff?.factor??2,jitterRatio:e.backoff?.jitterRatio??.2},r=()=>e.url&&e.url.length>0?e.url:typeof location<"u"?(location.protocol==="https:"?"wss://":"ws://")+location.host+"/ws":"ws://localhost/ws",o=null,s="closed",i=0,l=null,a=!0,u=new Map,d=[],f=new Map,h=new Set;function m(F){for(let O of Array.from(h))try{O(F)}catch{}}function k(){if(!a||l)return;s="reconnecting",t("ws reconnecting\u2026"),m(s);let F=Math.min(n.maxMs||0,(n.initialMs||0)*Math.pow(n.factor||1,i)),O=(n.jitterRatio||0)*F,I=Math.max(0,Math.round(F+(Math.random()*2-1)*O));t("ws retry in %d ms (attempt %d)",I,i+1),l=setTimeout(()=>{l=null,X()},I)}function R(F){try{o?.send(JSON.stringify(F))}catch(O){t("ws send failed",O)}}function j(){for(s="open",t("ws open"),m(s),i=0;d.length;){let F=d.shift();F&&R(F)}}function H(F){let O;try{O=JSON.parse(String(F.data))}catch{t("ws received non-JSON message");return}if(!O||typeof O.id!="string"||typeof O.type!="string"){t("ws received invalid envelope");return}if(u.has(O.id)){let N=u.get(O.id);u.delete(O.id),O.ok?N?.resolve(O.payload):N?.reject(O.error||new Error("ws error"));return}let I=f.get(O.type);if(I&&I.size>0)for(let N of Array.from(I))try{N(O.payload)}catch(B){t("ws event handler error",B)}else t("ws received unhandled message type: %s",O.type)}function ne(){s="closed",t("ws closed"),m(s);for(let[F,O]of u.entries())O.reject(new Error("ws disconnected")),u.delete(F);i+=1,k()}function X(){if(!a)return;let F=r();try{o=new WebSocket(F),t("ws connecting %s",F),s="connecting",m(s),o.addEventListener("open",j),o.addEventListener("message",H),o.addEventListener("error",()=>{}),o.addEventListener("close",ne)}catch(O){t("ws connect failed %o",O),k()}}return X(),{send(F,O){if(!Pf.includes(F))return Promise.reject(new Error(`unknown message type: ${F}`));let I=Sl(),N=Df(F,O,I);return t("send %s id=%s",F,I),new Promise((B,se)=>{u.set(I,{resolve:B,reject:se,type:F}),o&&o.readyState===o.OPEN?R(N):(t("queue %s id=%s (state=%s)",F,I,s),d.push(N))})},on(F,O){f.has(F)||f.set(F,new Set);let I=f.get(F);return I?.add(O),()=>{I?.delete(O)}},onConnection(F){return h.add(F),()=>{h.delete(F)}},reconnect(){a=!0,l&&(clearTimeout(l),l=null),i=0,X()},close(){a=!1,l&&(clearTimeout(l),l=null);try{o?.close()}catch{}},getState(){return s}}}function Gv(){let e=window.__BDUI_BOOTSTRAP__;return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:null}}}async function Kv(e,t){try{let r=await(await fetch("/api/config")).json();e.setState({config:r})}catch(n){t("config refresh failed",n)}}var El=[["tab:board:ready","ready-issues"],["tab:board:blocked","blocked-issues"],["tab:board:in-progress","in-progress-issues"],["tab:board:resolved","resolved-issues"],["tab:board:deferred","deferred-issues"],["tab:board:closed","closed-issues"]],qf=[["tab:worker:ready","ready-issues"],["tab:worker:blocked","blocked-issues"],["tab:worker:in-progress","in-progress-issues"],["tab:worker:resolved","resolved-issues"],["tab:worker:closed","closed-issues"]],dr="tab:worker:closed",Yv="bdui.worker.done-range",Ff=Pp,jf="worker:queue",Bf="ui:order",Uf="ui:display-policy",Wf="exec:presets",pr="tab:board:closed",zf="beads-ui.board.closed-range";function Vv(e){if(!e)return()=>{};function t(r){document.documentElement.style.setProperty("--app-header-h",`${Math.round(r)}px`)}if(t(e.getBoundingClientRect().height),typeof ResizeObserver!="function")return()=>{};let n=new ResizeObserver(r=>{for(let o of r)t(o.contentRect.height+Xv(e))});return n.observe(e),()=>n.disconnect()}function Xv(e){let t=getComputedStyle(e);return[t.paddingTop,t.paddingBottom,t.borderTopWidth,t.borderBottomWidth].reduce((r,o)=>r+(parseFloat(o)||0),0)}function Qv(e){let t=Rt("main");t("bootstrap start"),Vv(document.querySelector(".app-header"));let n=c`
    <section id="board-root" class="route board"></section>
    <section id="worker-root" class="route worker" hidden></section>
    <section id="monitor-root" class="route monitor" hidden></section>
    <section id="detail-panel" class="route detail" hidden></section>
  `;it(n,e);let r=document.getElementById("global-nav"),o=document.getElementById("top-nav"),s=document.getElementById("repo-scope"),i=document.getElementById("usage-meter"),l=document.getElementById("board-root"),a=document.getElementById("worker-root"),u=document.getElementById("monitor-root"),d=document.getElementById("detail-panel");if(i&&tf(i),l&&a&&u&&d){let Ee=function($,x){let Oe="Request failed",Fe="";if($&&typeof $=="object"){let y=$;if(typeof y.message=="string"&&y.message.length>0&&(Oe=y.message),typeof y.details=="string")Fe=y.details;else if(y.details&&typeof y.details=="object")try{Fe=JSON.stringify(y.details,null,2)}catch{Fe=""}}else typeof $=="string"&&$.length>0&&(Oe=$);let g=x&&x.length>0?`Failed to load ${x}`:"Request failed";J.open(g,Oe,Fe)},qe=function($){return`${de.getState().workspace.current?.path||""}\0${$}`},dt=function(){be&&(be().catch(()=>{}),be=null),le=null,je=null},v=function($){Ke=$;let x=()=>{Ke!==$||de.getState().selected_id!==$||(Ke=null,tt($))};if(!Q){De.then(x);return}x()},Be=function($,x,Oe,Fe,g){return Oe!==Re[x]?(g().catch(()=>{}),!1):($.set(Fe,g),!0)},ft=function(){let $=de.getState();Ue($.view==="board"),Ie($.view==="worker"),et(Ge($)),Ne($.view==="board"||$.view==="worker"||Xe||!!$.selected_id)},$t=function(){let $=yr(kt);return $===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:$}}},mt=function(){let $=yr(It);return $===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:$}}},Ue=function($){if($)for(let[x,Oe]of El){if(z.has(x)||Te.has(x))continue;let Fe=x===pr?$t():{type:Oe};try{Pe.register(x,Fe)}catch(C){t("register %s store failed: %o",x,C)}Te.add(x);let g=Re.board,y=!1;pe.subscribeList(x,Fe).then(C=>{y=!Be(z,"board",g,x,C)}).catch(C=>{t("subscribe %s failed: %o",x,C),Ee(C,"board")}).finally(()=>{Te.delete(x),y&&ft()})}else ve()},ve=function(){Re.board+=1;for(let[$]of El){let x=z.get($);x&&(x().catch(()=>{}),z.delete($));try{Pe.unregister($)}catch(Oe){t("unregister %s failed: %o",$,Oe)}}},Ie=function($){if(!$){We();return}for(let[x,Oe]of qf){if(E.has(x)||Te.has(x))continue;let Fe=x===dr?mt():{type:Oe};try{Pe.register(x,Fe)}catch(C){t("register %s store failed: %o",x,C)}Te.add(x);let g=Re.worker,y=!1;pe.subscribeList(x,Fe).then(C=>{y=!Be(E,"worker",g,x,C)}).catch(C=>{t("subscribe %s failed: %o",x,C),Ee(C,"worker")}).finally(()=>{Te.delete(x),y&&ft()})}},We=function(){Re.worker+=1;for(let[$]of qf){let x=E.get($);x&&(x().catch(()=>{}),E.delete($));try{Pe.unregister($)}catch(Oe){t("unregister %s failed: %o",$,Oe)}}},Ne=function($){if(!$){nt();return}K||(Ae("subscribe-worker-queue",{id:jf}).catch(x=>{t("subscribe-worker-queue failed: %o",x)}),K=()=>Ae("unsubscribe-worker-queue",{id:jf}))},nt=function(){K&&(K().catch(()=>{}),K=null)},Ge=function($){return $.view==="monitor"||$.selected_id!=null},et=function($){if(!$){yt();return}Le||(Ae("subscribe-monitor-pipeline",{id:Ff}).catch(x=>{t("subscribe-monitor-pipeline failed: %o",x)}),Le=()=>Ae("unsubscribe-monitor-pipeline",{id:Ff}))},yt=function(){Le&&(Le().catch(()=>{}),Le=null)},At=function(){He||(Ae("subscribe-ui-order",{id:Bf}).catch($=>{t("subscribe-ui-order failed: %o",$)}),He=()=>Ae("unsubscribe-ui-order",{id:Bf}))},qt=function(){He&&(He().catch(()=>{}),He=null),M.clear()},Vt=function(){ut||(Ae("subscribe-display-policy",{id:Uf}).catch($=>{t("subscribe-display-policy failed: %o",$)}),ut=()=>Ae("unsubscribe-display-policy",{id:Uf}))},Et=function(){ut&&(ut().catch(()=>{}),ut=null),re.clear()},Wt=function(){Mt||(Ae("subscribe-impl-presets",{id:Wf}).catch($=>{t("subscribe-impl-presets failed: %o",$)}),Mt=()=>Ae("unsubscribe-impl-presets",{id:Wf}))},Pt=function($){if(!$)return"Unknown";let x=$.split("/").filter(Boolean);return x.length>0?x[x.length-1]:"Unknown"},V=function($,x){Y.open($.path,{missing_state:$.missing_state,...x?{workspace:x}:{}})};var f=Ee,h=qe,m=dt,k=v,R=Be,j=ft,H=$t,ne=mt,X=Ue,F=ve,O=Ie,I=We,N=Ne,B=nt,se=Ge,q=et,W=yt,Z=At,ee=qt,Se=Vt,he=Et,ue=Wt,D=Pt,ke=V;let xe=document.getElementById("header-loading"),S=hc(xe),J=lp(e),_e=Nf(),Ae=S.wrapSend(($,x)=>_e.send($,x)),pe=uc(Ae),Pe=dc(),st=fc(),Ve=Wl(),M=pc(),re=Bl(),ae=Ul(),fe=zl();_e.on("impl-presets-snapshot",$=>{let x=$;x&&typeof x.revision=="number"&&Array.isArray(x.presets)&&ae.set({revision:x.revision,presets:x.presets})}),_e.on("monitor-pipeline-snapshot",$=>{let x=$;if(!(!x||!Array.isArray(x.workspaces)))try{Ve.set(x.workspaces,x.workspaces_state,x.cross_lanes)}catch{}}),_e.on("ui-order-snapshot",$=>{let x=$;if(x&&typeof x.revision=="number")try{M.set({revision:x.revision,order:x.order&&typeof x.order=="object"?x.order:{}})}catch{}}),_e.on("display-policy-snapshot",$=>{let x=$;if(x&&x.policy&&typeof x.policy=="object")try{re.set(x.policy)}catch{}}),_e.on("session-log-snapshot",$=>{let x=$;if(x&&typeof x.id=="string")try{fe.set(x.id,Array.isArray(x.lines)?x.lines:[],typeof x.last_event_at=="number"?x.last_event_at:null)}catch{}}),_e.on("session-log-append",$=>{let x=$;if(x&&typeof x.id=="string")try{fe.append(x.id,x.event)}catch{}}),_e.on("snapshot",$=>{let x=$,Oe=x&&typeof x.id=="string"?x.id:"",Fe=Oe?Pe.getStore(Oe):null;if(Fe&&x&&x.type==="snapshot")try{Fe.applyPush(x)}catch{}}),_e.on("upsert",$=>{let x=$,Oe=x&&typeof x.id=="string"?x.id:"",Fe=Oe?Pe.getStore(Oe):null;if(Fe&&x&&x.type==="upsert")try{Fe.applyPush(x)}catch{}}),_e.on("delete",$=>{let x=$,Oe=x&&typeof x.id=="string"?x.id:"",Fe=Oe?Pe.getStore(Oe):null;if(Fe&&x&&x.type==="delete")try{Fe.applyPush(x)}catch{}});let be=null,le=null,je=null,Ke=null,Je=()=>{},De=new Promise($=>{Je=()=>$(void 0)}),Q=!1,U=!1;async function tt($){let x=qe($);if(x===le||x===je)return;je=x;let Oe=`detail:${$}`,Fe={type:"issue-detail",params:{id:$}};try{Pe.register(Oe,Fe)}catch(g){t("register detail store failed: %o",g)}try{let g=await pe.subscribeList(Oe,Fe);if(de.getState().selected_id!==$||qe($)!==x){await g().catch(()=>{});return}be&&await be().catch(()=>{}),be=g,le=x}catch(g){t("detail subscribe failed: %o",g),Ee(g,"issue details")}finally{je===x&&(je=null)}}let z=new Map,Te=new Set,Re={board:0,worker:0},Xe=!1,kt=fs;try{let $=window.localStorage.getItem(zf);Ki($)&&(kt=$)}catch{}let It="today";try{let $=window.localStorage.getItem(Yv);$!==null&&(It=Mn($))}catch{}async function L($){if(!Ki($)||$===kt)return;kt=$;try{window.localStorage.setItem(zf,$)}catch{}let x=z.get(pr);if(!x)return;z.delete(pr),await x().catch(()=>{});let Oe=$t();try{Pe.register(pr,Oe)}catch(Fe){t("register %s store failed: %o",pr,Fe)}try{let Fe=await pe.subscribeList(pr,Oe);z.set(pr,Fe)}catch(Fe){t("re-subscribe %s failed: %o",pr,Fe),Ee(Fe,"board")}}async function te($){let x=Mn($);if(x===It)return;It=x;let Oe=E.get(dr);if(!Oe)return;E.delete(dr),await Oe().catch(()=>{});let Fe=mt();try{Pe.register(dr,Fe)}catch(g){t("register %s store failed: %o",dr,g)}try{let g=await pe.subscribeList(dr,Fe);E.set(dr,g)}catch(g){t("re-subscribe %s failed: %o",dr,g),Ee(g,"worker")}}let E=new Map,K=null,Le=null,He=null,ut=null,Mt=null;async function Xt(){ut=null,re.clear(),Mt=null,ae.clear(),K=null,Le=null,z.clear(),E.clear(),Re.board+=1,Re.worker+=1,Wt();let $=de.getState().workspace.current?.path;if($)try{await _e.send("set-workspace",{path:$})}catch(Oe){t("workspace restore after reconnect failed: %o",Oe);return}Vt();let x=de.getState();Ue(x.view==="board"),Ie(x.view==="worker"),et(Ge(x)),Ne(x.view==="board"||x.view==="worker"||!!x.selected_id)}async function tn(){t("clearing all subscriptions for workspace switch"),ve(),We(),nt(),st.clear(),qt(),At(),Et(),Vt(),dt();let $=de.getState();if($.selected_id)try{Pe.unregister(`detail:${$.selected_id}`)}catch{}let x=de.getState();Ue(x.view==="board"),Ie(x.view==="worker"),et(Ge(x)),Ne(x.view==="board"||x.view==="worker"||!!x.selected_id),x.selected_id&&v(x.selected_id)}async function zt($){t("requesting workspace switch to %s",$),U=!0;try{let x=await _e.send("set-workspace",{path:$});t("workspace switch result: %o",x),x&&x.workspace&&(de.setState({workspace:{current:{path:x.workspace.root_dir,database:x.workspace.db_path}}}),window.localStorage.setItem("beads-ui.workspace",$),x.changed&&(await tn(),ye("Switched to "+Pt($),"success",2e3)))}catch(x){throw t("workspace switch failed: %o",x),ye("Failed to switch workspace","error",3e3),x}finally{U=!1}}async function Ft($){t("requesting workspace git pull for %s",$);try{let x=await _e.send("git-pull-workspace",{});t("workspace git pull result: %o",x);let Oe=x?.status;if(Oe==="up_to_date"){ye("Already up to date","success",2e3);return}if(Oe==="stash_pop_conflict"){ye("Git pulled, but stash pop conflicted (check git stash list)","warning",4e3);return}ye("Git pulled "+Pt($),"success",2e3)}catch(x){t("workspace git pull failed: %o",x);let Oe=x?.code,Fe=x?.message;if(Oe==="rebase_conflict"){ye("Git pull conflicts \u2014 reverted (manual resolve required)","error",4e3);return}if(Oe==="rebase_conflict_abort_failed"){ye("Git pull conflicts AND rebase --abort failed \u2014 repo left mid-rebase, run 'git rebase --abort' manually","error",6e3);return}if(Oe==="busy"){ye("Git pull skipped: another operation is running","warning",3e3);return}let g=Fe?`: ${Fe}`:"";throw ye(`Git pull failed${g}`,"error",3e3),x}}async function un($,x){t("setting workspace visibility %s \u2192 %s",$,String(x));try{await _e.send("set-workspace-visibility",{path:$,visible:x}),await Kt()}catch(Oe){t("workspace visibility update failed: %o",Oe),ye("Failed to update project visibility","error",3e3)}}async function Kt(){try{let $=await _e.send("list-workspaces",{});if(t("workspaces loaded: %o",$),$&&Array.isArray($.workspaces)){let x=$.workspaces.map(y=>({path:y.path,database:y.database,pid:y.pid,version:y.version})),Oe=$.current?{path:$.current.root_dir,database:$.current.db_path}:null,Fe=Array.isArray($.hidden)?$.hidden.filter(y=>typeof y=="string"):[];de.setState({workspace:{current:Oe,available:x,hidden:Fe}});let g=window.localStorage.getItem("beads-ui.workspace");g&&(!x.some(C=>C.path===g)||Fe.includes(g)?window.localStorage.removeItem("beads-ui.workspace"):Oe&&g!==Oe.path&&(t("restoring saved workspace preference: %s",g),await zt(g)))}}catch($){t("failed to load workspaces: %o",$)}}_e.on("workspace-changed",$=>{t("workspace-changed event: %o",$),$&&$.root_dir&&(de.setState({workspace:{current:{path:$.root_dir,database:$.db_path}}}),Kt(),tn())});let jt=!1;if(typeof _e.onConnection=="function"){let $=x=>{t("ws state %s",x),x==="reconnecting"||x==="closed"?(jt=!0,ye("Connection lost. Reconnecting\u2026","error",4e3)):x==="open"&&jt&&(jt=!1,ye("Reconnected","success",2200),Kv(de,(Oe,Fe)=>{t(`${Oe}: %o`,Fe)}),Xt())};_e.onConnection($)}let Qt="board";try{let $=window.localStorage.getItem("beads-ui.view");($==="board"||$==="worker"||$==="monitor")&&(Qt=$)}catch($){t("view parse error: %o",$)}let de=gc({config:Gv(),view:Qt});_e.on("worker-queue-snapshot",$=>{let x=$;if(!x||!x.queue)return;let Oe=de.getState().workspace.current?.path;if(typeof Oe=="string"&&Oe.length>0&&x.root_dir!==Oe){t("dropping worker-queue snapshot for %s",String(x.root_dir));return}try{st.set(x.queue)}catch{}});let T=_c(de);T.start();let me=new Set(["get-comments","dep-add","dep-remove","impl-preset-create","impl-preset-update","impl-preset-delete","apply-impl-preset","apply-impl-preset-global","get-session-defaults","set-session-defaults","monitor-lane-create","monitor-lane-update","monitor-lane-confirm","monitor-lane-remove"]),ce=async($,x)=>{try{return await Ae($,x)}catch(Oe){if(me.has($))throw Oe;return[]}};Np({global_element:r,repo_element:o},de,T);let b=document.getElementById("workspace-picker");b&&Mf(b,de,zt,Ft,un);let p=Bp(e,($,x)=>Ae($,x));try{let $=document.getElementById("new-issue-btn");$&&$.addEventListener("click",()=>p.open())}catch{}let _=Hp(e,{policyStore:re,queueStore:st,implPresetStore:ae,transport:($,x)=>Ae($,x),onOpenChange:$=>{let x=Xe;Xe=$,ft(),x&&$===!1&&$e.refreshSessionDefaults()},labelOptions:()=>{let $=new Set;for(let[x]of El)for(let Oe of Pe.snapshotFor(x)||[]){let Fe=Oe.labels;if(Array.isArray(Fe))for(let g of Fe)typeof g=="string"&&g.length>0&&$.add(g)}return Array.from($).sort()}});try{let $=document.getElementById("display-settings-btn");$&&($.setAttribute("aria-label","\uC124\uC815"),$.setAttribute("title","\uC124\uC815"),$.addEventListener("click",()=>_.open()))}catch{}let A=document.createElement("div");A.className="md-viewer-root",document.body.appendChild(A);let Y=Si(A,{getWorkspacePath:()=>de.getState().workspace.current?.path}),oe=Ic(l,{gotoIssue:$=>T.gotoIssue($),issueStores:Pe,transport:ce,workerQueueStore:st,uiOrderStore:M,displayPolicyStore:re,closedRange:kt,onClosedRangeChange:$=>{L($)},onNewIssue:()=>p.open(),openDoc:V}),$e=xl(a,{transport:ce,issueStores:Pe,queueStore:st,sessionLogStore:fe,gotoIssue:$=>de.setState({selected_id:$}),getWorkspacePath:()=>de.getState().workspace.current?.path,switchWorkspace:$=>zt($),openDoc:V,doneRange:It,onDoneRangeChange:$=>{te($)}}),Qe=Dp(u,{transport:ce,pipelineStore:Ve,execPresetStore:ae,sessionLogStore:fe,router:T,gotoIssue:$=>T.gotoIssue($),getWorkspacePath:()=>de.getState().workspace.current?.path,switchWorkspace:$=>zt($),openDoc:V}),at=ap(d,{issueStores:Pe,transport:ce,queueStore:st,execPresetStore:ae,sessionLogStore:fe,getWorkspacePath:()=>de.getState().workspace.current?.path,mdViewer:Y,depCandidates:()=>{let $=Ve.get();if($===null)return null;let x=Ve.getWorkspacesState(),Oe=de.getState();if(Oe.view==="monitor")return qa($,x);let Fe=Oe.workspace.current?.path;return Fe?qa($,x,{root_dir:Fe}):null},subscribeCandidates:$=>Ve.subscribe($),onDepChanged:({type:$,a:x,b:Oe})=>{let Fe=Qe;$==="dep-add"&&Fe&&typeof Fe.recorrectSharedLane=="function"&&Fe.recorrectSharedLane($,x,Oe)},onNavigate:($,x)=>{let Oe=()=>{de.getState().view==="worker"?de.setState({selected_id:$}):T.gotoIssue($)},Fe=de.getState().workspace.current?.path;if(typeof x!="string"||x.length===0||!Fe||x===Fe){Oe();return}Promise.resolve(zt(x)).then(Oe).catch(()=>{ye("\uB808\uD3EC \uC804\uD658\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error",2400)})},onClose:()=>{let $=de.getState();de.setState({selected_id:null});try{T.gotoView($.view==="worker"||$.view==="monitor"?$.view:"board")}catch{}},onOpenExecPresets:()=>{_.open("execution")}}),vt=de.getState().selected_id;vt&&(d.hidden=!1,at.load(vt),v(vt)),de.subscribe($=>{let x=$.selected_id;x?(d.hidden=!1,at.load(x),U||v(x)):(at.clear(),d.hidden=!0,dt())});let gt=$=>{l.hidden=$.view!=="board",a.hidden=$.view!=="worker",u.hidden=$.view!=="monitor",s&&s.classList.toggle("is-quiet",$.view==="monitor"),Ue($.view==="board"),Ie($.view==="worker"),et(Ge($)),Ne($.view==="board"||$.view==="worker"||Xe||!!$.selected_id),!$.selected_id&&$.view==="board"&&oe.load(),$.view==="worker"&&$e.load(),$.view==="monitor"?Qe.load():Qe.pause(),window.localStorage.setItem("beads-ui.view",$.view)};de.subscribe(gt),gt(de.getState()),At(),Vt(),Wt(),Kt().finally(()=>{Q=!0,Je()}),window.addEventListener("keydown",$=>{let x=$.ctrlKey||$.metaKey,Oe=String($.key||"").toLowerCase(),Fe=$.target,g=Fe&&Fe.tagName?String(Fe.tagName).toLowerCase():"",y=g==="input"||g==="textarea"||g==="select"||Fe&&typeof Fe.isContentEditable=="boolean"&&Fe.isContentEditable;x&&Oe==="n"&&(y||($.preventDefault(),p.open()))})}}typeof window<"u"&&typeof document<"u"&&window.addEventListener("DOMContentLoaded",()=>{try{let n=window.localStorage.getItem("beads-ui.theme"),r=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches,o=n==="dark"||n==="light"?n:r?"dark":"light";document.documentElement.setAttribute("data-theme",o);let s=document.getElementById("theme-switch");s&&(s.checked=o==="dark")}catch{}let e=document.getElementById("theme-switch");e&&e.addEventListener("change",()=>{let n=e.checked?"dark":"light";document.documentElement.setAttribute("data-theme",n),window.localStorage.setItem("beads-ui.theme",n)});let t=document.getElementById("app");t&&Qv(t)});export{Qv as bootstrap,Gv as readBootstrapConfig,Kv as refreshConfigSnapshot};
//# sourceMappingURL=main.bundle.js.map
