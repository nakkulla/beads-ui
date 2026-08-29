var Xf=Object.create;var ji=Object.defineProperty;var Qf=Object.getOwnPropertyDescriptor;var Zf=Object.getOwnPropertyNames;var Jf=Object.getPrototypeOf,e_=Object.prototype.hasOwnProperty;var t_=(e,t,n)=>t in e?ji(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var Bi=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var n_=(e,t,n,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let o of Zf(t))!e_.call(e,o)&&o!==n&&ji(e,o,{get:()=>t[o],enumerable:!(r=Qf(t,o))||r.enumerable});return e};var r_=(e,t,n)=>(n=e!=null?Xf(Jf(e)):{},n_(t||!e||!e.__esModule?ji(n,"default",{value:e,enumerable:!0}):n,e));var At=(e,t,n)=>t_(e,typeof t!="symbol"?t+"":t,n);var Gl=Bi((aw,Hl)=>{var Pr=1e3,Dr=Pr*60,Nr=Dr*60,wr=Nr*24,i_=wr*7,a_=wr*365.25;Hl.exports=function(e,t){t=t||{};var n=typeof e;if(n==="string"&&e.length>0)return l_(e);if(n==="number"&&isFinite(e))return t.long?u_(e):c_(e);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(e))};function l_(e){if(e=String(e),!(e.length>100)){var t=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(e);if(t){var n=parseFloat(t[1]),r=(t[2]||"ms").toLowerCase();switch(r){case"years":case"year":case"yrs":case"yr":case"y":return n*a_;case"weeks":case"week":case"w":return n*i_;case"days":case"day":case"d":return n*wr;case"hours":case"hour":case"hrs":case"hr":case"h":return n*Nr;case"minutes":case"minute":case"mins":case"min":case"m":return n*Dr;case"seconds":case"second":case"secs":case"sec":case"s":return n*Pr;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return n;default:return}}}}function c_(e){var t=Math.abs(e);return t>=wr?Math.round(e/wr)+"d":t>=Nr?Math.round(e/Nr)+"h":t>=Dr?Math.round(e/Dr)+"m":t>=Pr?Math.round(e/Pr)+"s":e+"ms"}function u_(e){var t=Math.abs(e);return t>=wr?_s(e,t,wr,"day"):t>=Nr?_s(e,t,Nr,"hour"):t>=Dr?_s(e,t,Dr,"minute"):t>=Pr?_s(e,t,Pr,"second"):e+" ms"}function _s(e,t,n,r){var o=t>=n*1.5;return Math.round(e/n)+" "+r+(o?"s":"")}});var Yl=Bi((lw,Kl)=>{function d_(e){n.debug=n,n.default=n,n.coerce=a,n.disable=i,n.enable=o,n.enabled=l,n.humanize=Gl(),n.destroy=u,Object.keys(e).forEach(d=>{n[d]=e[d]}),n.names=[],n.skips=[],n.formatters={};function t(d){let f=0;for(let g=0;g<d.length;g++)f=(f<<5)-f+d.charCodeAt(g),f|=0;return n.colors[Math.abs(f)%n.colors.length]}n.selectColor=t;function n(d){let f,g=null,m,$;function O(...B){if(!O.enabled)return;let Y=O,J=Number(new Date),X=J-(f||J);Y.diff=X,Y.prev=f,Y.curr=J,f=J,B[0]=n.coerce(B[0]),typeof B[0]!="string"&&B.unshift("%O");let F=0;B[0]=B[0].replace(/%([a-zA-Z%])/g,(M,N)=>{if(M==="%%")return"%";F++;let W=n.formatters[N];if(typeof W=="function"){let re=B[F];M=W.call(Y,re),B.splice(F,1),F--}return M}),n.formatArgs.call(Y,B),(Y.log||n.log).apply(Y,B)}return O.namespace=d,O.useColors=n.useColors(),O.color=n.selectColor(d),O.extend=r,O.destroy=n.destroy,Object.defineProperty(O,"enabled",{enumerable:!0,configurable:!1,get:()=>g!==null?g:(m!==n.namespaces&&(m=n.namespaces,$=n.enabled(d)),$),set:B=>{g=B}}),typeof n.init=="function"&&n.init(O),O}function r(d,f){let g=n(this.namespace+(typeof f>"u"?":":f)+d);return g.log=this.log,g}function o(d){n.save(d),n.namespaces=d,n.names=[],n.skips=[];let f=(typeof d=="string"?d:"").trim().replace(/\s+/g,",").split(",").filter(Boolean);for(let g of f)g[0]==="-"?n.skips.push(g.slice(1)):n.names.push(g)}function s(d,f){let g=0,m=0,$=-1,O=0;for(;g<d.length;)if(m<f.length&&(f[m]===d[g]||f[m]==="*"))f[m]==="*"?($=m,O=g,m++):(g++,m++);else if($!==-1)m=$+1,O++,g=O;else return!1;for(;m<f.length&&f[m]==="*";)m++;return m===f.length}function i(){let d=[...n.names,...n.skips.map(f=>"-"+f)].join(",");return n.enable(""),d}function l(d){for(let f of n.skips)if(s(d,f))return!1;for(let f of n.names)if(s(d,f))return!0;return!1}function a(d){return d instanceof Error?d.stack||d.message:d}function u(){console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")}return n.enable(n.load()),n}Kl.exports=d_});var Vl=Bi((pn,ms)=>{pn.formatArgs=f_;pn.save=__;pn.load=m_;pn.useColors=p_;pn.storage=g_();pn.destroy=(()=>{let e=!1;return()=>{e||(e=!0,console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."))}})();pn.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"];function p_(){if(typeof window<"u"&&window.process&&(window.process.type==="renderer"||window.process.__nwjs))return!0;if(typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))return!1;let e;return typeof document<"u"&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||typeof window<"u"&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||typeof navigator<"u"&&navigator.userAgent&&(e=navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/))&&parseInt(e[1],10)>=31||typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)}function f_(e){if(e[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+e[0]+(this.useColors?"%c ":" ")+"+"+ms.exports.humanize(this.diff),!this.useColors)return;let t="color: "+this.color;e.splice(1,0,t,"color: inherit");let n=0,r=0;e[0].replace(/%[a-zA-Z%]/g,o=>{o!=="%%"&&(n++,o==="%c"&&(r=n))}),e.splice(r,0,t)}pn.log=console.debug||console.log||(()=>{});function __(e){try{e?pn.storage.setItem("debug",e):pn.storage.removeItem("debug")}catch{}}function m_(){let e;try{e=pn.storage.getItem("debug")||pn.storage.getItem("DEBUG")}catch{}return!e&&typeof process<"u"&&"env"in process&&(e=process.env.DEBUG),e}function g_(){try{return localStorage}catch{}}ms.exports=Yl()(pn);var{formatters:h_}=ms.exports;h_.j=function(e){try{return JSON.stringify(e)}catch(t){return"[UnexpectedJSONParseError]: "+t.message}}});var po=globalThis,as=po.trustedTypes,Cl=as?as.createPolicy("lit-html",{createHTML:e=>e}):void 0,Wi="$lit$",Bn=`lit$${Math.random().toFixed(9).slice(2)}$`,zi="?"+Bn,o_=`<${zi}>`,hr=document,fo=()=>hr.createComment(""),_o=e=>e===null||typeof e!="object"&&typeof e!="function",Hi=Array.isArray,Pl=e=>Hi(e)||typeof e?.[Symbol.iterator]=="function",Ui=`[ 	
\f\r]`,uo=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Rl=/-->/g,Ol=/>/g,mr=RegExp(`>|${Ui}(?:([^\\s"'>=/]+)(${Ui}*=${Ui}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Ll=/'/g,Il=/"/g,Dl=/^(?:script|style|textarea|title)$/i,Gi=e=>(t,...n)=>({_$litType$:e,strings:t,values:n}),c=Gi(1),go=Gi(2),ew=Gi(3),yn=Symbol.for("lit-noChange"),Lt=Symbol.for("lit-nothing"),Ml=new WeakMap,gr=hr.createTreeWalker(hr,129);function Nl(e,t){if(!Hi(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return Cl!==void 0?Cl.createHTML(t):t}var ql=(e,t)=>{let n=e.length-1,r=[],o,s=t===2?"<svg>":t===3?"<math>":"",i=uo;for(let l=0;l<n;l++){let a=e[l],u,d,f=-1,g=0;for(;g<a.length&&(i.lastIndex=g,d=i.exec(a),d!==null);)g=i.lastIndex,i===uo?d[1]==="!--"?i=Rl:d[1]!==void 0?i=Ol:d[2]!==void 0?(Dl.test(d[2])&&(o=RegExp("</"+d[2],"g")),i=mr):d[3]!==void 0&&(i=mr):i===mr?d[0]===">"?(i=o??uo,f=-1):d[1]===void 0?f=-2:(f=i.lastIndex-d[2].length,u=d[1],i=d[3]===void 0?mr:d[3]==='"'?Il:Ll):i===Il||i===Ll?i=mr:i===Rl||i===Ol?i=uo:(i=mr,o=void 0);let m=i===mr&&e[l+1].startsWith("/>")?" ":"";s+=i===uo?a+o_:f>=0?(r.push(u),a.slice(0,f)+Wi+a.slice(f)+Bn+m):a+Bn+(f===-2?l:m)}return[Nl(e,s+(e[n]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),r]},mo=class e{constructor({strings:t,_$litType$:n},r){let o;this.parts=[];let s=0,i=0,l=t.length-1,a=this.parts,[u,d]=ql(t,n);if(this.el=e.createElement(u,r),gr.currentNode=this.el.content,n===2||n===3){let f=this.el.content.firstChild;f.replaceWith(...f.childNodes)}for(;(o=gr.nextNode())!==null&&a.length<l;){if(o.nodeType===1){if(o.hasAttributes())for(let f of o.getAttributeNames())if(f.endsWith(Wi)){let g=d[i++],m=o.getAttribute(f).split(Bn),$=/([.?@])?(.*)/.exec(g);a.push({type:1,index:s,name:$[2],strings:m,ctor:$[1]==="."?cs:$[1]==="?"?us:$[1]==="@"?ds:yr}),o.removeAttribute(f)}else f.startsWith(Bn)&&(a.push({type:6,index:s}),o.removeAttribute(f));if(Dl.test(o.tagName)){let f=o.textContent.split(Bn),g=f.length-1;if(g>0){o.textContent=as?as.emptyScript:"";for(let m=0;m<g;m++)o.append(f[m],fo()),gr.nextNode(),a.push({type:2,index:++s});o.append(f[g],fo())}}}else if(o.nodeType===8)if(o.data===zi)a.push({type:2,index:s});else{let f=-1;for(;(f=o.data.indexOf(Bn,f+1))!==-1;)a.push({type:7,index:s}),f+=Bn.length-1}s++}}static createElement(t,n){let r=hr.createElement("template");return r.innerHTML=t,r}};function br(e,t,n=e,r){if(t===yn)return t;let o=r!==void 0?n._$Co?.[r]:n._$Cl,s=_o(t)?void 0:t._$litDirective$;return o?.constructor!==s&&(o?._$AO?.(!1),s===void 0?o=void 0:(o=new s(e),o._$AT(e,n,r)),r!==void 0?(n._$Co??(n._$Co=[]))[r]=o:n._$Cl=o),o!==void 0&&(t=br(e,o._$AS(e,t.values),o,r)),t}var ls=class{constructor(t,n){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=n}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:n},parts:r}=this._$AD,o=(t?.creationScope??hr).importNode(n,!0);gr.currentNode=o;let s=gr.nextNode(),i=0,l=0,a=r[0];for(;a!==void 0;){if(i===a.index){let u;a.type===2?u=new Ir(s,s.nextSibling,this,t):a.type===1?u=new a.ctor(s,a.name,a.strings,this,t):a.type===6&&(u=new ps(s,this,t)),this._$AV.push(u),a=r[++l]}i!==a?.index&&(s=gr.nextNode(),i++)}return gr.currentNode=hr,o}p(t){let n=0;for(let r of this._$AV)r!==void 0&&(r.strings!==void 0?(r._$AI(t,r,n),n+=r.strings.length-2):r._$AI(t[n])),n++}},Ir=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,n,r,o){this.type=2,this._$AH=Lt,this._$AN=void 0,this._$AA=t,this._$AB=n,this._$AM=r,this.options=o,this._$Cv=o?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,n=this._$AM;return n!==void 0&&t?.nodeType===11&&(t=n.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,n=this){t=br(this,t,n),_o(t)?t===Lt||t==null||t===""?(this._$AH!==Lt&&this._$AR(),this._$AH=Lt):t!==this._$AH&&t!==yn&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Pl(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==Lt&&_o(this._$AH)?this._$AA.nextSibling.data=t:this.T(hr.createTextNode(t)),this._$AH=t}$(t){let{values:n,_$litType$:r}=t,o=typeof r=="number"?this._$AC(t):(r.el===void 0&&(r.el=mo.createElement(Nl(r.h,r.h[0]),this.options)),r);if(this._$AH?._$AD===o)this._$AH.p(n);else{let s=new ls(o,this),i=s.u(this.options);s.p(n),this.T(i),this._$AH=s}}_$AC(t){let n=Ml.get(t.strings);return n===void 0&&Ml.set(t.strings,n=new mo(t)),n}k(t){Hi(this._$AH)||(this._$AH=[],this._$AR());let n=this._$AH,r,o=0;for(let s of t)o===n.length?n.push(r=new e(this.O(fo()),this.O(fo()),this,this.options)):r=n[o],r._$AI(s),o++;o<n.length&&(this._$AR(r&&r._$AB.nextSibling,o),n.length=o)}_$AR(t=this._$AA.nextSibling,n){for(this._$AP?.(!1,!0,n);t!==this._$AB;){let r=t.nextSibling;t.remove(),t=r}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},yr=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,n,r,o,s){this.type=1,this._$AH=Lt,this._$AN=void 0,this.element=t,this.name=n,this._$AM=o,this.options=s,r.length>2||r[0]!==""||r[1]!==""?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=Lt}_$AI(t,n=this,r,o){let s=this.strings,i=!1;if(s===void 0)t=br(this,t,n,0),i=!_o(t)||t!==this._$AH&&t!==yn,i&&(this._$AH=t);else{let l=t,a,u;for(t=s[0],a=0;a<s.length-1;a++)u=br(this,l[r+a],n,a),u===yn&&(u=this._$AH[a]),i||(i=!_o(u)||u!==this._$AH[a]),u===Lt?t=Lt:t!==Lt&&(t+=(u??"")+s[a+1]),this._$AH[a]=u}i&&!o&&this.j(t)}j(t){t===Lt?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},cs=class extends yr{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===Lt?void 0:t}},us=class extends yr{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==Lt)}},ds=class extends yr{constructor(t,n,r,o,s){super(t,n,r,o,s),this.type=5}_$AI(t,n=this){if((t=br(this,t,n,0)??Lt)===yn)return;let r=this._$AH,o=t===Lt&&r!==Lt||t.capture!==r.capture||t.once!==r.once||t.passive!==r.passive,s=t!==Lt&&(r===Lt||o);o&&this.element.removeEventListener(this.name,this,r),s&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},ps=class{constructor(t,n,r){this.element=t,this.type=6,this._$AN=void 0,this._$AM=n,this.options=r}get _$AU(){return this._$AM._$AU}_$AI(t){br(this,t)}},Fl={M:Wi,P:Bn,A:zi,C:1,L:ql,R:ls,D:Pl,V:br,I:Ir,H:yr,N:us,U:ds,B:cs,F:ps},s_=po.litHtmlPolyfillSupport;s_?.(mo,Ir),(po.litHtmlVersions??(po.litHtmlVersions=[])).push("3.3.1");var rt=(e,t,n)=>{let r=n?.renderBefore??t,o=r._$litPart$;if(o===void 0){let s=n?.renderBefore??null;r._$litPart$=o=new Ir(t.insertBefore(fo(),s),s,void 0,n??{})}return o._$AI(e),o};var fs="today",jl=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"},{value:"30d",label:"\uCD5C\uADFC 30\uC77C"},{value:"all",label:"\uC804\uCCB4"}],Mr=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"}];function Mn(e){return e==="today"?"today":"7d"}function Ki(e){return e==="today"||e==="7d"||e==="30d"||e==="all"}function vr(e,t=Date.now()){switch(e){case"today":{let n=new Date(t);return n.setHours(0,0,0,0),n.getTime()}case"7d":return t-7*864e5;case"30d":return t-30*864e5;case"all":default:return}}function Bl(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function Ul(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function Wl(){let e=null,t=[],n,r=new Set;function o(){for(let s of Array.from(r))try{s()}catch{}}return{get(){return e},getWorkspacesState(){return t},crossLanes(){return n},set(s,i,l){e=Array.isArray(s)?s:null,t=Array.isArray(i)?i:[],n=l===void 0?void 0:l!==null&&typeof l=="object"&&typeof l.revision=="number"&&Array.isArray(l.lanes)?{revision:l.revision,lanes:l.lanes}:null,o()},clear(){e=null,t=[],n=void 0,o()},subscribe(s){return r.add(s),()=>r.delete(s)}}}function zl(){let e=new Map,t=new Set;function n(o){return o.startsWith("session-log:")?o:`session-log:${o}`}function r(){for(let o of Array.from(t))try{o()}catch{}}return{set(o,s,i=null){e.set(n(o),{lines:Array.isArray(s)?[...s]:[],last_event_at:typeof i=="number"?i:null}),r()},append(o,s){let i=n(o),l=e.get(i)||{lines:[],last_event_at:null};l.lines=[...l.lines,s],l.last_event_at=Date.now(),e.set(i,l),r()},get(o){return e.get(n(o))||null},clear(o){typeof o=="string"?e.delete(n(o)):e.clear(),r()},subscribe(o){return t.add(o),()=>t.delete(o)}}}var Xl=r_(Vl(),1);function Ot(e){return(0,Xl.default)(`beads-ui:${e}`)}function b_(e){let n=Ql((e&&typeof e=="object"?e:{}).spec_id);return n?{path:n,source:"native",conflict:!1}:{path:"",source:"none",conflict:!1}}function Ql(e){return typeof e=="string"?e.trim():""}function y_(e){let t=e&&typeof e=="object"?e:{};return t.metadata&&typeof t.metadata=="object"?t.metadata:{}}var v_=/^[A-Za-z0-9_.:-]+@[0-9a-fA-F]{40}$/;function qr(e){let t=b_(e),n=Ql(y_(e).spec_review),r=v_.test(n),o=r&&n.slice(0,n.indexOf("@"))==="skipped";return t.source==="none"?{...t,evidence:"none",skipped:o}:{...t,evidence:r?"published":"draft",skipped:o}}function $n(e){if(typeof e=="number")return Number.isFinite(e)?e:0;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:0}return 0}function ho(e,t){let n=$n(e.created_at),r=$n(t.created_at);if(n!==r)return n<r?1:-1;let o=e.priority??2,s=t.priority??2;if(o!==s)return o-s;let i=e.id,l=t.id;return i<l?-1:i>l?1:0}function rc(e,t){let n=$n(e.created_at),r=$n(t.created_at);if(n!==r)return n<r?-1:1;let o=e.priority??2,s=t.priority??2;if(o!==s)return o-s;let i=e.id,l=t.id;return i<l?-1:i>l?1:0}function oc(e,t){let n=$n(e.updated_at),r=$n(t.updated_at);if(n!==r)return n<r?1:-1;let o=e.id,s=t.id;return o<s?-1:o>s?1:0}function sc(e,t){let n=e.priority??2,r=t.priority??2;if(n!==r)return n-r;let o=$n(e.created_at),s=$n(t.created_at);if(o!==s)return o<s?1:-1;let i=e.id,l=t.id;return i<l?-1:i>l?1:0}function ic(e,t){let n=e.closed_at??0,r=t.closed_at??0;if(n!==r)return n<r?1:-1;let o=e?.id,s=t?.id;return o<s?-1:o>s?1:0}var gs=Object.freeze({priority:"asc",dependents:"desc",released:"desc",spec:"desc",created:"asc",updated:"desc"});function w_(e){return typeof e=="string"&&Object.prototype.hasOwnProperty.call(gs,e)}function Vi(e){if(!e||typeof e!="object")return!1;let t=e;return w_(t.key)&&(t.dir==="asc"||t.dir==="desc")}function Zl(e){if(typeof e=="number")return Number.isFinite(e)?e:null;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:null}return null}function Jl(e,t){switch(t){case"priority":{let n=e.priority;return typeof n=="number"&&Number.isFinite(n)?n:null}case"dependents":{let n=e.dependents_info?e.dependents_info.count:null;return typeof n=="number"&&Number.isFinite(n)?n:null}case"released":{let n=e.release_info?e.release_info.last_released_at:null;return typeof n=="number"&&Number.isFinite(n)?n:null}case"spec":return qr(e).evidence==="published"?1:0;case"created":return Zl(e.created_at);case"updated":return Zl(e.updated_at);default:return null}}function ec(e,t,n){let r=Jl(e,n.key),o=Jl(t,n.key);if(r===null||o===null)return r===o?0:r===null?1:-1;if(r===o)return 0;let s=r<o?-1:1;return n.dir==="desc"?-s:s}function ac(e){let t=Array.isArray(e)?e.filter(Vi):[];return(n,r)=>{for(let l of t){let a=ec(n,r,l);if(a!==0)return a}let o=ec(n,r,{key:"created",dir:"asc"});if(o!==0)return o;let s=n.id,i=r.id;return s<i?-1:s>i?1:0}}var k_=/^(?:[A-Za-z][A-Za-z0-9]*(?:-[A-Za-z0-9]+)+\s+)?(?:Task|Phase|T)\s*(\d+)/i;function tc(e){let t=e&&e.metadata,n=t?t.task_order:void 0;if(n==null||n==="")return Number.POSITIVE_INFINITY;let r=Number(n);return Number.isFinite(r)?r:Number.POSITIVE_INFINITY}function nc(e){let t=e&&e.title;if(typeof t!="string")return Number.POSITIVE_INFINITY;let n=k_.exec(t);if(!n)return Number.POSITIVE_INFINITY;let r=Number(n[1]);return Number.isFinite(r)?r:Number.POSITIVE_INFINITY}function lc(e,t){let n=tc(e),r=tc(t);if(n!==r)return n<r?-1:1;let o=nc(e),s=nc(t);if(o!==s)return o<s?-1:1;let i=$n(e&&e.created_at),l=$n(t&&t.created_at);if(i!==l)return i<l?-1:1;let a=e&&e.id,u=t&&t.id;return a===u?0:String(a)<String(u)?-1:1}var Yi=2**20;function Fr(e,t){let n=e&&e.id;return t&&typeof n=="string"&&Object.prototype.hasOwnProperty.call(t,n)&&typeof t[n]=="number"&&Number.isFinite(t[n])?t[n]:-$n(e&&e.created_at)}function cc(e){return(t,n)=>{let r=Fr(t,e),o=Fr(n,e);if(r!==o)return r<o?-1:1;let s=t?.id,i=n?.id;return s<i?-1:s>i?1:0}}function Xi(e,t,n){let r=Array.isArray(e)?e:[],o=r.length,s=Math.max(0,Math.min(t,o-1)),i=s-1>=0?r[s-1]:null,l=s+1<o?r[s+1]:null;if(!i&&!l)return{rank:0};if(!i)return{rank:Fr(l,n)-Yi};if(!l)return{rank:Fr(i,n)+Yi};let a=Fr(i,n),u=Fr(l,n),d=(a+u)/2;return a<d&&d<u?{rank:d}:{renormalize:r.map((f,g)=>({bead_id:f.id,rank:g*Yi}))}}function Qi(e,t={}){let n=Ot(`issue-store:${e}`),r=new Map,o=[],s=0,i=new Set,l=!1,a=t.sort||ho;function u(){for(let g of Array.from(i))try{g()}catch{}}function d(){o=Array.from(r.values()).sort(a)}function f(g){if(l||!g||g.id!==e)return;let m=Number(g.revision)||0;if(n("apply %s rev=%d",g.type,m),!(m<=s&&g.type!=="snapshot")){if(g.type==="snapshot"){if(m<=s)return;r.clear();let $=Array.isArray(g.issues)?g.issues:[];for(let O of $)O&&typeof O.id=="string"&&O.id.length>0&&r.set(O.id,O);d(),s=m,u();return}if(g.type==="upsert"){let $=g.issue;if($&&typeof $.id=="string"&&$.id.length>0){let O=r.get($.id);if(!O)r.set($.id,$);else{let B=Number.isFinite(O.updated_at)?O.updated_at:0,Y=Number.isFinite($.updated_at)?$.updated_at:0;if(B<=Y){for(let J of Object.keys(O))J in $||delete O[J];for(let[J,X]of Object.entries($))O[J]=X}}d()}s=m,u()}else if(g.type==="delete"){let $=String(g.issue_id||"");$&&(r.delete($),d()),s=m,u()}}}return{id:e,subscribe(g){return i.add(g),()=>{i.delete(g)}},applyPush:f,snapshot(){return o},size(){return r.size},getById(g){return r.get(g)},dispose(){l=!0,r.clear(),o=[],i.clear(),s=0}}}function hs(e){let t=String(e.type||"").trim(),n={};if(e.params&&typeof e.params=="object"){let o=Object.keys(e.params).sort();for(let s of o){let i=e.params[s];n[s]=String(i)}}let r=new URLSearchParams(n).toString();return r.length>0?`${t}?${r}`:t}function uc(e){let t=Ot("subs"),n=new Map,r=new Map;function o(l,a){t("applyDelta %s +%d ~%d -%d",l,(a.added||[]).length,(a.updated||[]).length,(a.removed||[]).length);let u=r.get(l);if(!u||u.size===0)return;let d=Array.isArray(a.added)?a.added:[],f=Array.isArray(a.updated)?a.updated:[],g=Array.isArray(a.removed)?a.removed:[];for(let m of Array.from(u)){let $=n.get(m);if(!$)continue;let O=$.itemsById;for(let B of d)typeof B=="string"&&B.length>0&&O.set(B,!0);for(let B of f)typeof B=="string"&&B.length>0&&O.set(B,!0);for(let B of g)typeof B=="string"&&B.length>0&&O.delete(B)}}async function s(l,a){let u=hs(a);if(t("subscribe %s key=%s",l,u),!n.has(l))n.set(l,{key:u,itemsById:new Map});else{let f=n.get(l);if(f&&f.key!==u){let g=r.get(f.key);g&&(g.delete(l),g.size===0&&r.delete(f.key)),n.set(l,{key:u,itemsById:new Map})}}r.has(u)||r.set(u,new Set);let d=r.get(u);d&&d.add(l);try{await e("subscribe-list",{id:l,type:a.type,params:a.params})}catch(f){let g=n.get(l)||null;if(g){let m=r.get(g.key);m&&(m.delete(l),m.size===0&&r.delete(g.key))}throw n.delete(l),f}return async()=>{t("unsubscribe %s key=%s",l,u);try{await e("unsubscribe-list",{id:l})}catch{}let f=n.get(l)||null;if(f){let g=r.get(f.key);g&&(g.delete(l),g.size===0&&r.delete(f.key))}n.delete(l)}}return{subscribeList:s,_applyDelta:o,_subKeyOf:hs,selectors:{getIds(l){let a=n.get(l);return a?Array.from(a.itemsById.keys()):[]},has(l,a){let u=n.get(l);return u?u.itemsById.has(a):!1},count(l){let a=n.get(l);return a?a.itemsById.size:0},getItemsById(l){let a=n.get(l),u={};if(!a)return u;for(let d of a.itemsById.keys())u[d]=!0;return u}}}}function dc(){let e=Ot("issue-stores"),t=new Map,n=new Map,r=new Set,o=new Map;function s(){for(let a of Array.from(r))try{a()}catch{}}function i(a,u,d){let f=u?hs(u):"",g=n.get(a)||"",m=t.has(a);if(e("register %s key=%s (prev=%s)",a,f,g),m&&g&&f&&g!==f){let $=t.get(a);if($)try{$.dispose()}catch{}let O=o.get(a);if(O){try{O()}catch{}o.delete(a)}let B=Qi(a,d);t.set(a,B);let Y=B.subscribe(()=>s());o.set(a,Y)}else if(!m){let $=Qi(a,d);t.set(a,$);let O=$.subscribe(()=>s());o.set(a,O)}return n.set(a,f),()=>l(a)}function l(a){e("unregister %s",a),n.delete(a);let u=t.get(a);u&&(u.dispose(),t.delete(a));let d=o.get(a);if(d){try{d()}catch{}o.delete(a)}}return{register:i,unregister:l,getStore(a){return t.get(a)||null},snapshotFor(a){let u=t.get(a);return u?u.snapshot().slice():[]},subscribe(a){return r.add(a),()=>r.delete(a)}}}function pc(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function fc(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function Zi(e,t){return`#/${e==="worker"||e==="monitor"?e:"board"}?issue=${encodeURIComponent(t)}`}function $_(e){let t=String(e||""),n=t.startsWith("#")?t.slice(1):t,r=n.indexOf("?"),o=r>=0?n.slice(r+1):"";if(o){let l=new URLSearchParams(o).get("issue");if(l)return decodeURIComponent(l)}let s=/^\/issue\/([^\s?#]+)/.exec(n);return s&&s[1]?decodeURIComponent(s[1]):null}function x_(e){let t=String(e||"");return/^#\/worker(\b|\/|$)/.test(t)?"worker":/^#\/monitor(\b|\/|$)/.test(t)?"monitor":"board"}function _c(e){let t=Ot("router"),n=()=>{let r=window.location.hash||"",o=/^#\/issue\/([^\s?#]+)/.exec(r),s=o&&o[1]?decodeURIComponent(o[1]):$_(r),i=x_(r);if(t("hash change \u2192 view=%s id=%s",i,s),e.setState({selected_id:i==="worker"?null:s,view:i,worker:{selected_parent_id:i==="worker"?s:null}}),!!o||/^#\/(issues|epics)(\b|\/|\?|$)/.test(r)){let a=s?`#/${i}?issue=${encodeURIComponent(s)}`:`#/${i}`;window.location.hash!==a&&(window.location.hash=a)}};return{start(){window.addEventListener("hashchange",n),n()},stop(){window.removeEventListener("hashchange",n)},gotoIssue(r){let o=e.getState?e.getState():{view:"board"},s=o.view==="worker"||o.view==="monitor"?o.view:"board",i=Zi(s,r);t("goto issue %s (view=%s)",r,s),window.location.hash!==i?window.location.hash=i:e.setState({selected_id:s==="worker"?null:r,view:s,worker:{selected_parent_id:s==="worker"?r:null}})},gotoView(r){let o=e.getState?e.getState():{selected_id:null,worker:{selected_parent_id:null}},s=r==="worker"?o.worker?.selected_parent_id:o.selected_id,i=s?Zi(r,s):`#/${r}`;t("goto view %s (id=%s)",r,s||""),window.location.hash!==i?window.location.hash=i:e.setState({view:r,selected_id:r==="worker"?null:o.selected_id})}}}var A_=Object.freeze({workspace_config:{default_workspace:null}});function mc(e){return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:A_.workspace_config.default_workspace}}}function gc(e={}){let t=Ot("state"),n={selected_id:e.selected_id??null,view:e.view??"board",filters:{status:e.filters?.status??"all",search:e.filters?.search??"",type:typeof e.filters?.type=="string"?e.filters?.type:""},board:{closed_filter:e.board?.closed_filter==="3"||e.board?.closed_filter==="7"||e.board?.closed_filter==="today"?e.board?.closed_filter:"today"},worker:{selected_parent_id:e.worker?.selected_parent_id??null,show_closed_children:Array.isArray(e.worker?.show_closed_children)?e.worker.show_closed_children:[]},workspace:{current:e.workspace?.current??null,available:e.workspace?.available??[],hidden:e.workspace?.hidden??[]},config:mc(e.config)},r=new Set;function o(){for(let s of Array.from(r))try{s(n)}catch{}}return{getState(){return n},setState(s){let i={...n,...s,filters:{...n.filters,...s.filters||{}},board:{...n.board,...s.board||{}},worker:{...n.worker,...s.worker||{}},workspace:{current:s.workspace?.current!==void 0?s.workspace.current:n.workspace.current,available:s.workspace?.available!==void 0?s.workspace.available:n.workspace.available,hidden:s.workspace?.hidden!==void 0?s.workspace.hidden:n.workspace.hidden},config:s.config!==void 0?mc(s.config):n.config},l=i.workspace.current?.path!==n.workspace.current?.path||i.workspace.available.length!==n.workspace.available.length||i.workspace.hidden.length!==n.workspace.hidden.length||i.workspace.hidden.some((u,d)=>u!==n.workspace.hidden[d]),a=i.config.workspace_config.default_workspace!==n.config.workspace_config.default_workspace;i.selected_id===n.selected_id&&i.view===n.view&&i.filters.status===n.filters.status&&i.filters.search===n.filters.search&&i.filters.type===n.filters.type&&i.board.closed_filter===n.board.closed_filter&&i.worker.selected_parent_id===n.worker.selected_parent_id&&i.worker.show_closed_children.length===n.worker.show_closed_children.length&&i.worker.show_closed_children.every((u,d)=>u===n.worker.show_closed_children[d])&&!l&&!a||(n=i,t("state change %o",{selected_id:n.selected_id,view:n.view,filters:n.filters,board:n.board,worker:n.worker,workspace:n.workspace.current?.path,config:{default_workspace:n.config.workspace_config.default_workspace}}),o())},subscribe(s){return r.add(s),()=>r.delete(s)}}}function hc(e){let t=Ot("activity"),n=0,r=new Map,o=1;function s(){if(!e)return;let u=n>0;e.toggleAttribute("hidden",!u),e.setAttribute("aria-busy",u?"true":"false")}function i(){n+=1,t("start count=%d",n),s()}function l(){let u=n;n=Math.max(0,n-1),u<=0?t("done called but count was already %d",u):t("done count=%d\u2192%d",u,n),s()}function a(u){return async(f,g)=>{let m=o++,$=Date.now();r.set(m,{type:f,start_ts:$}),t("request start id=%d type=%s count=%d",m,f,n+1),i();let O=!1,B=()=>{O||(O=!0,r.delete(m),l())},Y=setTimeout(()=>{O||(t("request TIMEOUT id=%d type=%s elapsed=%dms",m,f,Date.now()-$),B())},3e4);try{let J=await u(f,g),X=Date.now()-$;return t("request done id=%d type=%s elapsed=%dms",m,f,X),J}catch(J){let X=Date.now()-$;throw t("request error id=%d type=%s elapsed=%dms err=%o",m,f,X,J),J}finally{clearTimeout(Y),B()}}}return s(),{wrapSend:a,start:i,done:l,getCount:()=>n,getActiveRequests:()=>{let u=Date.now();return Array.from(r.entries()).map(([d,f])=>({id:d,type:f.type,elapsed_ms:u-f.start_ts}))}}}function ye(e,t="info",n=2800){let r=document.createElement("div");r.className="toast",r.textContent=e,r.style.position="fixed",r.style.right="12px",r.style.bottom="12px",r.style.zIndex="1000",r.style.color="#fff",r.style.padding="8px 10px",r.style.borderRadius="4px",r.style.fontSize="12px",t==="success"?r.style.background="#156d36":t==="warning"?r.style.background="#a36a00":t==="error"?r.style.background="#9f2011":r.style.background="rgba(0,0,0,0.85)",(document.body||document.documentElement).appendChild(r),setTimeout(()=>{try{r.remove()}catch{}},n)}function jr(e=void 0,t=void 0){function n(){if(!t||typeof t.get!="function")return null;let s=t.get();return s&&s.order?s.order:{}}function r(s,i,l){let a=e&&e.snapshotFor?e.snapshotFor(s).slice():[];if(i==="closed")return a.sort(ic),a;switch(l){case"created_desc":return a.sort(ho),a;case"created_asc":return a.sort(rc),a;case"updated_desc":return a.sort(oc),a;case"priority":return a.sort(sc),a;case"manual":default:{let u=n();return u?a.sort(cc(u)):a.sort(ho),a}}}function o(s){let i=[];return e&&typeof e.subscribe=="function"&&i.push(e.subscribe(s)),t&&typeof t.subscribe=="function"&&i.push(t.subscribe(s)),()=>{for(let l of i)try{l()}catch{}}}return{selectBoardColumn:r,subscribe:o}}function nr(e){if(!e)return null;if(typeof e=="number")return Number.isFinite(e)?e:null;let t=Date.parse(e);return Number.isFinite(t)?t:null}function Gt(e){let t=nr(e);if(t===null)return"";let n=new Date(t),r=o=>String(o).padStart(2,"0");return`${n.getFullYear()}-${r(n.getMonth()+1)}-${r(n.getDate())} ${r(n.getHours())}:${r(n.getMinutes())}`}function rn(e,t){let n=nr(e);if(n===null)return"";let o=(typeof t=="number"?t:Date.now())-n;if(o<6e4)return"\uBC29\uAE08";let s=Math.floor(o/6e4);if(s<60)return`${s}\uBD84 \uC804`;let i=Math.floor(o/36e5);if(i<24)return`${i}\uC2DC\uAC04 \uC804`;let l=Math.floor(o/864e5);if(l<7)return`${l}\uC77C \uC804`;let a=Math.floor(l/7);if(l<30)return`${a}\uC8FC \uC804`;let u=Math.floor(l/30);return u<12?`${u}\uAC1C\uC6D4 \uC804`:`${Math.floor(l/365)}\uB144 \uC804`}function bc(e){if(!Array.isArray(e))return null;let t=null,n=-1;for(let r of e){if(!r||r.status!=="in_progress")continue;let o=nr(r.updated_at)??0;if(t===null||o>n){t=r,n=o;continue}o===n&&String(r.id)<String(t.id)&&(t=r)}return t}function bs(e){let t=e&&e.parent;return typeof t=="string"?t:t&&t.id?String(t.id):""}function ys(e){let t=new Map;for(let r of e)r&&r.id&&!t.has(r.id)&&t.set(r.id,r);let n=new Map;for(let r of t.values()){let o=bs(r);if(!o)continue;let s=n.get(o);s||(s=[],n.set(o,s)),s.push({id:r.id,title:r.title,status:r.status,metadata:r.metadata,workflow:r.workflow,created_at:r.created_at,updated_at:r.updated_at})}return n}function vs(e,t){let n=e.get(t)||[],r=0;for(let s of n)(s.status==="resolved"||s.status==="closed")&&(r+=1);let o=bc(n);return{total:n.length,count:r,current:o,children:n}}function yc(e){let t=e.transport,n=e.uiOrderStore;function r(i,l){return"renormalize"in i?i.renormalize:[{bead_id:l,rank:i.rank}]}function o(i,l){let a={...i.order};for(let u of l)a[u.bead_id]=u.rank;n&&n.set({revision:i.revision,order:a})}async function s(i,l,a){if(!t||!n)return;let u=n.get()||{revision:0,order:{}},d=r(Xi(l,a,u.order),i);o(u,d);let f=await t("ui-order-set",{expected_revision:u.revision,entries:d});if(f&&f.conflict){let g={revision:typeof f.revision=="number"?f.revision:0,order:f.order||{}};n.set(g);let m=r(Xi(l,a,g.order),i);o(g,m);let $=await t("ui-order-set",{expected_revision:g.revision,entries:m});$&&$.applied&&n.set({revision:typeof $.revision=="number"?$.revision:0,order:$.order||{}})}else f&&f.applied&&n.set({revision:typeof f.revision=="number"?f.revision:0,order:f.order||{}})}return{applyReorder:s}}function vc(e){if(typeof e!="string")return"";let t=e.indexOf("-");return t>0?e.slice(0,t):""}function Un(e,t){let n=vc(e),r=vc(t);return n.length===0||r.length===0?!1:n!==r}function ws(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function Ji(e,t){return!t||typeof e!="string"||e.length===0||ws(t.visible_labels).includes(e)?!0:ws(t.hidden_labels).includes(e)?!1:!ws(t.hidden_prefixes).some(n=>n.length>0&&e.startsWith(n))}function wc(e,t){return ws(e).filter(n=>Ji(n,t))}function rr(e,t){let n=e&&e.chips?e.chips[t]:void 0;return typeof n=="boolean"?n:!0}function S_(e){switch(e){case"in_progress":return"board-card__dot board-card__dot--progress";case"resolved":return"board-card__dot board-card__dot--resolved";case"closed":return"board-card__dot board-card__dot--closed";case"blocked":return"board-card__dot board-card__dot--blocked";default:return"board-card__dot"}}function E_(e,t,n,r,o){return c`<button
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
      @click=${$=>{$.preventDefault(),$.stopPropagation(),r($,g,e)}}
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
          title=${`\uC0DD\uC131 ${Gt(e.created_at)}`}
          >생성 ${t}</span
        >`:""}
    ${t&&n?c`<span class="board-card__time-sep">·</span>`:""}
    ${n?c`<span
          class="board-card__time"
          title=${`\uC218\uC815 ${Gt(e.updated_at)}`}
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
  `}var H_=200,G_={"ready-col":"open","in-progress-col":"in_progress","resolved-col":"resolved","closed-col":"closed"},K_=new Set(["blocked-col","ready-col","in-progress-col","resolved-col"]),Oc="beads-ui.board.sort",Lc=new Set(["created_desc","created_asc","updated_desc","priority","manual"]);function Y_(){try{let e=window.localStorage.getItem(Oc);if(e&&Lc.has(e))return e}catch{}return"created_desc"}function Ic(e,t){let n=Ot("views:board"),r=t.gotoIssue,o=t.issueStores,s=t.transport,i=t.uiOrderStore,l=t.displayPolicyStore,a=t.workerQueueStore,u=t.onClosedRangeChange,d=t.onNewIssue,f=t.openDoc,g=t.closedRange||fs,m=o?jr(o,i):null,$=yc({transport:s,uiOrderStore:i}),O=[],B=[],Y=[],J=[],X=[],F=[],L=!1,M=0,N=Y_(),W=new Map,re=new Map,q=new Map,U=new Set,Q={search:"",priority:"",type:"",labels:[]},ne=!1,we=null;function ve(b){return String(b.status||"open")==="open"}function le(b){return String(b.status||"open")==="open"}function D(b){let S=Q.search.trim().toLowerCase(),te=Q.priority,ee=Q.type,_e=Q.labels;return b.filter(Ue=>{if(S){let Se=String(Ue.id||"").toLowerCase(),Ne=String(Ue.title||"").toLowerCase();if(!Se.includes(S)&&!Ne.includes(S))return!1}if(te!==""&&String(Ue.priority)!==te||ee!==""&&String(Ue.issue_type||"")!==ee)return!1;if(_e.length>0){let Se=Array.isArray(Ue.labels)?Ue.labels:[];if(!_e.some(Ne=>Se.includes(Ne)))return!1}return!0})}function $e(){let b=new Set;for(let S of[O,B,Y,J,X,F])for(let te of S){let ee=Array.isArray(te.labels)?te.labels:[];for(let _e of ee)typeof _e=="string"&&_e.length>0&&b.add(_e)}return Array.from(b).sort()}function Ae(){return Q.search.trim()!==""||Q.priority!==""||Q.type!==""||Q.labels.length>0}function T(){try{if(m){let b=m.selectBoardColumn("tab:board:in-progress","in_progress",N),S=m.selectBoardColumn("tab:board:blocked","blocked",N).filter(le),te=new Set(b.map(Be=>Be.id)),ee=m.selectBoardColumn("tab:board:ready","ready",N).filter(Be=>ve(Be)&&!te.has(Be.id)),_e=m.selectBoardColumn("tab:board:resolved","resolved",N),Ue=m.selectBoardColumn("tab:board:deferred","deferred",N),Se=m.selectBoardColumn("tab:board:closed","closed").slice(0,H_),Ne=[...S,...ee,...b,..._e,...Se];Z(Ne);let Ze=new Set;for(let Be of Ne)Be&&Be.id&&!bs(Be)&&Ze.add(Be.id);let _t=!Ae();O=_t?bo(S,Ze):S,B=_t?bo(ee,Ze):ee,Y=_t?bo(b,Ze):b,J=_t?bo(_e,Ze):_e,X=Ue,M=Ue.length,F=_t?bo(Se,Ze):Se,W=new Map;for(let Be of O)W.set(Be.id,"open");for(let Be of B)W.set(Be.id,"open");for(let Be of Y)W.set(Be.id,"in_progress");for(let Be of J)W.set(Be.id,"resolved");for(let Be of X)W.set(Be.id,"deferred");for(let Be of F)W.set(Be.id,"closed");re=new Map;for(let Be of O)re.set(Be.id,"blocked-col");for(let Be of B)re.set(Be.id,"ready-col");for(let Be of Y)re.set(Be.id,"in-progress-col");for(let Be of J)re.set(Be.id,"resolved-col");for(let Be of F)re.set(Be.id,"closed-col")}je()}catch{O=[],B=[],Y=[],J=[],X=[],F=[],q=new Map,je()}}function Z(b){q=ys(b)}function Re(b){return vs(q,b)}function fe(b){return!U.has(b)}function Te(b,S){b.preventDefault(),b.stopPropagation(),U.has(S)?U.delete(S):U.add(S),je()}function me(b,S){b.preventDefault(),b.stopPropagation(),r(S)}function Oe(b,S){b.preventDefault(),b.stopPropagation(),r(S)}function it(b,S){we||r(S)}function Ge(b,S){b.preventDefault(),b.stopPropagation(),V_(S).then(te=>{te&&ye("\uBCF5\uC0AC\uB428","success",1200)})}function I(b,S){we=S,b.dataTransfer&&(b.dataTransfer.setData("text/plain",S),b.dataTransfer.effectAllowed="move"),b.target.classList.add("board-card--dragging")}function oe(b){b.target.classList.remove("board-card--dragging"),St(),setTimeout(()=>{we=null},0)}function ie(b){let S=String(b.target.value||"");!S||S===g||(g=S,u&&u(S),je())}function de(){return l?l.get():null}function be(b){let S=a?a.get():null,te=S?S.cleanup_failed:null;if(!te||typeof te!="object"||Array.isArray(te))return null;let ee=te[b];return!ee||typeof ee!="object"||Array.isArray(ee)?null:ee}let ce={onCardClick:it,onCopyId:Ge,onDragStart:I,onDragEnd:oe,onClosedRangeChange:ie,rollupFor:Re,isExpanded:fe,onRollupToggle:Te,onChildClick:me,onFromChipClick:Oe,onOpenDoc:f?(b,S)=>f(S):void 0,cleanupFailureFor:be,get policy(){return de()}};function Fe(b,S){we||(w(),r(S))}function ze(b,S){b.preventDefault(),b.stopPropagation(),w(),r(S)}let Ve={...ce,onCardClick:Fe,onChildClick:ze,onFromChipClick:ze,onOpenDoc:f?(b,S)=>{w(),f(S)}:void 0,get policy(){return de()}};function Pe(b){let S=b.target,te=e.querySelector(".board-filter__labels");S&&te&&te.contains(S)||De()}function V(b){b.key==="Escape"&&De()}function j(){ne||(ne=!0,document.addEventListener("mousedown",Pe),document.addEventListener("keydown",V),je())}function De(){ne&&(ne=!1,document.removeEventListener("mousedown",Pe),document.removeEventListener("keydown",V),je())}function lt(b){b.key==="Escape"&&w()}function Qe(){L||(L=!0,document.addEventListener("keydown",lt),je())}function w(){L&&(L=!1,document.removeEventListener("keydown",lt),je())}let H={onClose:w,onOverlayClick(b){b.target===b.currentTarget&&w()}},Ce={onSearchInput(b){Q.search=String(b.target.value||""),T()},onPriorityChange(b){Q.priority=String(b.target.value||""),T()},onTypeChange(b){Q.type=String(b.target.value||""),T()},onSortChange(b){let S=String(b.target.value||"");if(!(!Lc.has(S)||S===N)){N=S;try{window.localStorage.setItem(Oc,S)}catch{}T()}},onDeferredToggle(){L?w():Qe()},onLabelMenuToggle(){ne?De():j()},onLabelToggle(b){let S=Q.labels.indexOf(b);S===-1?Q.labels.push(b):Q.labels.splice(S,1),T()},onLabelClear(){Q.labels.length!==0&&(Q.labels=[],T())},onNewIssue(){d&&d()}};function Ee(){return c`
      <div class="board-view">
        ${Rc(Q,Ce,{sort_mode:N,deferred_popup_open:L,deferred_count:M,label_options:$e(),label_menu_open:ne})}
        <div class="board-root">
          ${Br({title:"Blocked",id:"blocked-col",items:D(O)},ce)}
          ${Br({title:"Ready",id:"ready-col",items:D(B)},ce)}
          ${Br({title:"In progress",id:"in-progress-col",items:D(Y)},ce)}
          ${Br({title:"Resolved",id:"resolved-col",items:D(J)},ce)}
          ${Br({title:"Closed",id:"closed-col",items:D(F),is_closed:!0,closed_range:g},ce)}
        </div>
        ${L?Cc({items:D(X),count:M},Ve,H):""}
      </div>
    `}function je(){rt(Ee(),e),Xe()}function Xe(){try{let b=e.querySelector("#deferred-popup");b&&!b.open&&(typeof b.showModal=="function"?b.showModal():b.setAttribute("open",""));let S=Array.from(e.querySelectorAll(".board-column, .deferred-popup__body"));for(let te of S)Array.from(te.querySelectorAll(".board-card")).forEach((_e,Ue)=>{_e.tabIndex=Ue===0?0:-1})}catch{}}async function dt(b,S){if(!s){ye("\uC5F0\uACB0\uB418\uC9C0 \uC54A\uC544 \uC0C1\uD0DC\uB97C \uBCC0\uACBD\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error");return}try{await s("update-status",{id:b,status:S}),ye("\uC0C1\uD0DC \uBCC0\uACBD\uB428","success",1500)}catch(te){n("update-status failed: %o",te),ye("\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328","error")}}function xt(b){switch(b){case"blocked-col":return O;case"ready-col":return B;case"in-progress-col":return Y;case"resolved-col":return J;default:return[]}}function Ct(b,S,te){if(!s||!i)return;let ee=xt(b),_e=ee.find(_t=>_t.id===S);if(!_e)return;let Ue=ee.filter(_t=>_t.id!==S),Se=te.closest?te.closest(".board-card"):null,Ne=Ue.length;if(Se){let _t=Se.getAttribute("data-issue-id");if(_t===S)return;let Be=Ue.findIndex(ft=>ft.id===_t);Be>=0&&(Ne=Be)}let Ze=Ue.slice();Ze.splice(Ne,0,_e),$.applyReorder(S,Ze,Ne)}function St(){for(let b of Array.from(e.querySelectorAll(".board-column--drag-over")))b.classList.remove("board-column--drag-over")}let mt=null;e.addEventListener("dragover",b=>{b.preventDefault(),b.dataTransfer&&(b.dataTransfer.dropEffect="move");let te=b.target.closest(".board-column");te&&te!==mt&&(mt&&mt.classList.remove("board-column--drag-over"),te.classList.add("board-column--drag-over"),mt=te)}),e.addEventListener("dragleave",b=>{let S=b.relatedTarget;(!S||!e.contains(S))&&mt&&(mt.classList.remove("board-column--drag-over"),mt=null)}),e.addEventListener("drop",b=>{b.preventDefault(),mt&&(mt.classList.remove("board-column--drag-over"),mt=null);let S=b.target,te=S.closest(".board-column");if(!te)return;let ee=b.dataTransfer?.getData("text/plain")||"";if(!ee)return;let _e=te.id,Ue=re.get(ee);if(Ue&&Ue===_e){if(K_.has(_e)){if(N!=="manual"){ye("\uC218\uB3D9(\uB4DC\uB798\uADF8) \uC815\uB82C \uBAA8\uB4DC\uC5D0\uC11C\uB9CC \uC21C\uC11C\uB97C \uBC14\uAFC0 \uC218 \uC788\uC2B5\uB2C8\uB2E4","warning",2e3);return}Ct(_e,ee,S)}return}let Se=G_[_e];if(!Se){ye("\uC5EC\uAE30\uB85C\uB294 \uC62E\uAE38 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","warning",1500);return}W.get(ee)!==Se&&dt(ee,Se)}),e.addEventListener("keydown",b=>{let S=b.target;if(!(S instanceof HTMLElement))return;let te=String(S.tagName||"").toLowerCase();if(te==="input"||te==="textarea"||te==="select"||te==="button"||te==="a"||S.isContentEditable===!0)return;let ee=S.closest(".board-card");if(!ee)return;let _e=String(b.key||"");if(_e==="Enter"||_e===" "){b.preventDefault();let Ze=ee.getAttribute("data-issue-id");Ze&&r(Ze);return}if(_e!=="ArrowUp"&&_e!=="ArrowDown"&&_e!=="ArrowLeft"&&_e!=="ArrowRight")return;b.preventDefault();let Ue=ee.closest(".board-column");if(!Ue)return;let Se=Array.from(Ue.querySelectorAll(".board-card")),Ne=Se.indexOf(ee);if(_e==="ArrowDown"&&Ne<Se.length-1){ut(ee,Se[Ne+1]);return}if(_e==="ArrowUp"&&Ne>0){ut(ee,Se[Ne-1]);return}if(_e==="ArrowLeft"||_e==="ArrowRight"){let Ze=Array.from(e.querySelectorAll(".board-column")),_t=Ze.indexOf(Ue),Be=_e==="ArrowRight"?1:-1,ft=_t+Be;for(;ft>=0&&ft<Ze.length;){let qt=Ze[ft].querySelector(".board-card");if(qt){ut(ee,qt);return}ft+=Be}}});function ut(b,S){try{b.tabIndex=-1,S.tabIndex=0,S.focus()}catch{}}let vt=null;m&&m.subscribe&&(vt=m.subscribe(()=>{try{T()}catch{}}));let Rt=null;l&&l.subscribe&&(Rt=l.subscribe(()=>{try{T()}catch{}}));let Je=null;return a&&a.subscribe&&(Je=a.subscribe(()=>{je()})),{async load(){n("load"),T()},clear(){De(),w(),vt&&(vt(),vt=null),Rt&&(Rt(),Rt=null),Je&&(Je(),Je=null),e.replaceChildren(),O=[],B=[],Y=[],J=[],X=[],F=[],W=new Map,re=new Map}}}function bo(e,t){return e.filter(n=>{let r=bs(n);return!(r&&t.has(r))})}async function V_(e){try{if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")return await navigator.clipboard.writeText(String(e)),!0;let t=document.createElement("textarea");t.value=String(e),t.style.position="fixed",t.style.left="-9999px",document.body.appendChild(t),t.select();let n=!1;try{n=document.execCommand("copy")}finally{t.remove()}return n}catch{return!1}}var nn=e=>e??Lt;async function on(e){let t=String(e);if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")try{return await navigator.clipboard.writeText(t),!0}catch{}try{let n=document.createElement("textarea");n.value=t,n.style.position="fixed",n.style.left="-9999px",document.body.appendChild(n),n.select();let r=!1;try{r=document.execCommand("copy")}finally{n.remove()}return r}catch{return!1}}function kr(e){return[typeof e.runner=="string"?e.runner:null,typeof e.model=="string"?e.model:null,typeof e.effort=="string"?e.effort:null,e.speed==="fast"?"Fast":null].filter(Boolean).join(" \xB7 ")}function yo(e){return typeof e.resumed_from!="string"||e.resumed_from.length===0?null:`${e.continuation_mode==="session"?"session \uC774\uC5B4\uBC1B\uC74C":e.continuation_mode==="fresh"?"\uC0C8 session\uC73C\uB85C \uC774\uC5B4\uBC1B\uC74C":"\uC774\uC804 attempt\uC5D0\uC11C \uC774\uC5B4\uBC1B\uC74C"} (from ${e.resumed_from})`}function X_(e,t=document){let n=t.createElement("dialog");n.className="continuation-dialog";let r=t.createElement("button"),o=t.createElement("button"),s=t.createElement("button"),i=t.createElement("h2"),l=t.createElement("p");return i.textContent="\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4",l.textContent=`${kr(e.prior||{})||"\uC774\uC804 \uC124\uC815"} \u2192 ${kr(e.current||{})||"\uD604\uC7AC \uC124\uC815"}`,r.type="button",r.textContent="\uAE30\uC874 session \uC774\uC5B4\uD558\uAE30",r.disabled=e.prior_available===!1,o.type="button",o.textContent="\uD604\uC7AC preset\uC73C\uB85C \uC0C8 session",s.type="button",s.textContent="\uCDE8\uC18C",n.append(i,l,r,o,s),t.body.append(n),new Promise(a=>{let u=d=>{typeof n.close=="function"&&n.close(),n.remove(),a(d)};r.addEventListener("click",()=>u("prior_session")),o.addEventListener("click",()=>u("fresh_current")),s.addEventListener("click",()=>u(null)),n.addEventListener("cancel",d=>{d.preventDefault(),u(null)}),typeof n.showModal=="function"?n.showModal():n.setAttribute("open","")})}async function zn(e,t,n={}){let r=e;for(n.onResult?.(r);r?.continuation_mismatch;){let o=r.continuation_mismatch,s=await X_(o);if(s===null)return r;r=await t(s,o.decision_token),n.onResult?.(r),r?.conflict&&n.refresh&&(r=await n.refresh(r),n.onResult?.(r))}return r}var Q_=["workflow_mode","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed","quick_fix_impl_model","orchestration_model","orchestration_effort","orchestration_speed"],Mc={spec_review_effort:"spec_review_model",plan_review_effort:"plan_review_model",impl_review_effort:"impl_review_model"},Z_=new Set(["native-fixed-posture","unsupported","claude-runner-model-default","catalog-validated","provider-tier-or-runtime-model-default","actual-effort"]);function Wt(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function It(e){return typeof e=="string"&&e.length>0?e:null}function Ur(e){return e.startsWith("gpt-")?e.slice(4):e}function Tt(e,t,n,r,o){return{value:e,source:t,display:n,full_value:r,resolution:o}}function Dc(e,t,n){let r=It(t[e]);if(r!==null)return{value:r,source:"pin"};let o=It(n[e]);return o===null?null:{value:o,source:"global"}}function vo(e,t,n,r){return Dc(e,t,n)||{value:r,source:"base"}}function na(e,t,n,r){let o=n?.implementation?.model_catalog;if(t&&Wt(o?.[t])){let i=It(o[t][e]);if(i!==null)return i}if(t&&Array.isArray(o?.[t])&&o[t].includes(e))return e;if(!t&&Wt(o)){for(let i of Object.values(o))if(Wt(i)){let l=It(i[e]);if(l!==null)return l}else if(Array.isArray(i)&&i.includes(e))return e}let s=r?.model_index?.[e];return It(r?.runners?.[s]?.models?.[e]?.id)||e}function J_(e,t){return It(t?.review?.reviewers?.[e]?.model)||e}function Wr(e,t,n=!1){if(e==="default")return Tt(e,t,`default (\uC77C\uBC18 \xB7 ${t==="pin"?"\uD540":"\uC804\uC5ED \uACE0\uC815"})`,e,"explicit");let r=n?Ur(e):e;return Tt(e,t,r,e,"explicit")}function Nc(e,t,n){let r=t?.implementation?.model_catalog?.[e],o=[];Wt(r)?o.push(...Object.keys(r)):Array.isArray(r)&&o.push(...r.filter(i=>typeof i=="string"));let s=n?.runners?.[e]?.models;if(Wt(s))for(let i of Object.keys(s))o.includes(i)||o.push(i);return o}function em(e,t){let n=[],r=e?.implementation?.model_catalog;Wt(r)&&n.push(...Object.keys(r));let o=t?.runners;if(Wt(o))for(let s of Object.keys(o))n.includes(s)||n.push(s);return n}function tm(e,t,n){if(e===null)return{runtime:null,offered:!1};let r=!1;for(let o of em(t,n)){let s=Nc(o,t,n);if(s.length>0&&(r=!0),s.includes(e))return{runtime:o,offered:!0}}return{runtime:null,offered:r}}function ra(e){return Tt(e.value,e.source,`${e.value} (\uBE44\uD638\uD658)`,e.value,"incompatible")}function Pc(e,t,n){let r=Dc(e,t,n);return r?Wr(r.value,r.source):Tt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable")}function mn(e){let t=Wt(e.pin)?e.pin:{},n=Wt(e.global)?e.global:{},r=Wt(e.execution_defaults)?e.execution_defaults:null,o=r?.supported===!0&&Wt(r.session)?r.session:null,s=r?.supported===!0&&Wt(r.orchestration)?r.orchestration:null,i=Wt(e.runner_catalog)?e.runner_catalog:null,l=It(n.quick_fix_impl_model),a=tm(l,o,i),u={};if(o){let d=vo("workflow_mode",t,n,It(o.workflow_mode_default));u.workflow_mode=d.source==="base"?Tt(d.value,"base",d.value||"\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",d.value,"default"):Wr(d.value,d.source);for(let X of["spec_review","plan_review","impl_review"]){let F=`${X}_model`,L=It(X==="plan_review"?d.value==="fast_track"?o.plan_review?.fast_track_default:o.plan_review?.standard_recommended:o.review?.default),M=vo(F,t,n,L);if(M.value===null)u[F]=Tt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable");else if(M.value!=="self"&&M.value!=="skip"&&!Wt(o.review?.reviewers?.[M.value]))u[F]=ra(Tt(M.value,M.source,"",null,"explicit"));else{let N=J_(M.value,o);u[F]=Tt(M.value,M.source,Ur(N),N,M.source==="base"?"default":"explicit")}}for(let[X,F]of Object.entries(Mc)){let L=u[F].value;if(L==="self"||L==="skip"){u[X]=Tt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable");continue}let M=It(o.review?.reviewers?.[L||""]?.effort),N=vo(X,t,n,M);u[X]=N.value===null?Tt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"):Tt(N.value,N.source,N.value,N.value,N.source==="base"?"default":"explicit")}let f=Wt(o.implementation?.default)?o.implementation.default:{},g=It(e.route),m=g!==null&&["quick_fix","spec_backed","full_plan"].includes(g),$=Wt(o.implementation?.route_defaults)?o.implementation.route_defaults:{},O=m&&Wt($[g])?$[g]:{};for(let X of["impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"]){let F=vo(X,t,n,X==="impl_dispatch"?It(O.dispatch)||It(f.dispatch):It(f[X.replace("impl_","")]));u[X]=F.value===null?Tt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"):Tt(F.value,F.source,F.value,F.value,F.source==="base"?"default":"explicit")}let B=It(t.impl_runtime),Y=B==="inherit"?It(e.controller_runtime):B,J=g==="quick_fix"&&It(t.impl_dispatch)===null&&a.runtime!==null&&(B===null||Y===a.runtime);if(J){let X=a.runtime,F=l;u.impl_dispatch=Tt("delegated","global","\uC704\uC784 (\uC804\uC5ED quick_fix)","delegated","explicit"),B===null&&(u.impl_runtime=Tt(X,"global",`${X} (\uC720\uB3C4)`,X,"explicit")),It(t.impl_model)===null&&(u.impl_model=Tt(F,"global",F,F,"explicit"))}if(u.impl_dispatch.value==="main"){u.impl_dispatch.display="\uBA54\uC778";for(let X of["impl_runtime","impl_model","impl_effort","impl_speed"])u[X]=Tt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable")}else{if(u.impl_dispatch.value==="delegated"&&!J&&(u.impl_dispatch.display="\uC704\uC784"),u.impl_runtime.value==="inherit"&&(u.impl_runtime.display=e.controller_runtime?`inherit (${e.controller_runtime})`:"inherit (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_runtime.resolution="dynamic"),u.impl_model.value!==null){let X=u.impl_runtime.value==="inherit"?It(e.controller_runtime):u.impl_runtime.value,F=X?Nc(X,o,i):[];if(u.impl_model.value!=="auto"&&F.length>0&&!F.includes(u.impl_model.value))u.impl_model=ra(u.impl_model);else{let L=na(u.impl_model.value,X,o,i);u.impl_model.display=Ur(L),u.impl_model.full_value=L}}if(u.impl_effort.value==="auto"){let X=It(e.transport)||(u.impl_runtime.value==="codex"?"codex-native-spawn":u.impl_runtime.value==="claude"?"implement-claude":null),F=X?It(o.implementation?.effort_by_transport?.[X]?.auto):null;F&&!Z_.has(F)?(u.impl_effort.display=`${F} (\uBE44\uD638\uD658)`,u.impl_effort.full_value=F,u.impl_effort.resolution="incompatible"):(u.impl_effort.display="auto (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_effort.resolution="dynamic")}u.impl_speed.value==="default"&&(u.impl_speed=u.impl_speed.source==="base"?Tt("default","base","default (\uC77C\uBC18)","default","default"):Wr("default",u.impl_speed.source))}}else for(let d of Q_.filter(f=>!f.startsWith("orchestration_")))u[d]=Pc(d,t,n);if(!o){for(let[d,f]of Object.entries(Mc))(u[f].value==="self"||u[f].value==="skip")&&(u[d]=Tt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable"));if(u.impl_dispatch.value==="main"){u.impl_dispatch.display="\uBA54\uC778";for(let d of["impl_runtime","impl_model","impl_effort","impl_speed"])u[d]=Tt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable")}else u.impl_dispatch.value==="delegated"&&(u.impl_dispatch.display="\uC704\uC784"),u.impl_runtime.value==="inherit"&&(u.impl_runtime.display=e.controller_runtime?`inherit (${e.controller_runtime})`:"inherit (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_runtime.resolution="dynamic"),u.impl_effort.value==="auto"&&(u.impl_effort.display="auto (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_effort.resolution="dynamic")}for(let d of["orchestration_model","orchestration_effort","orchestration_speed"]){if(!s){u[d]=Pc(d,t,n);continue}let f=d.replace("orchestration_",""),g=It(s[f]),m=vo(d,t,n,g);if(d==="orchestration_effort"&&m.source==="base"){u[d]=Tt(null,"base","CLI \uAE30\uBCF8 (\uBBF8\uC9C0\uC815)",null,"default");continue}if(m.value===null){u[d]=Tt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable");continue}if(d==="orchestration_model"){let $=m.source==="base"?It(s.model_id)||m.value:na(m.value,null,o,i);u[d]=Tt(m.value,m.source,Ur($),$,m.source==="base"?"default":"explicit");continue}if(m.value==="default"){u[d]=m.source==="base"?Tt("default","base","default (\uC77C\uBC18)","default","default"):Wr("default",m.source);continue}u[d]=Wr(m.value,m.source)}if(o)if(l===null){let d=u.orchestration_model.full_value;u.quick_fix_impl_model=Tt(null,"base",d===null?"\uBA54\uC778":`\uBA54\uC778 (orchestration ${Ur(d)})`,null,"default")}else if(a.runtime!==null){let d=na(l,a.runtime,o,i);u.quick_fix_impl_model=Tt(l,"global",Ur(d),d,"explicit")}else a.offered?u.quick_fix_impl_model=ra(Tt(l,"global","",null,"explicit")):u.quick_fix_impl_model=Wr(l,"global");return u}function nm(e,t){let n=t&&e.value==="default"?"default (\uC77C\uBC18)":e.display;if(!t||e.source==="pin")return`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 ${e.display}`;let r=e.source==="global"?"\uC804\uC5ED":"harness";return`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 ${n} (${r})`}function Es(e){let t=Wt(e.pin)?e.pin:{},n=Wt(e.global)?e.global:{},r=Wt(e.resolution_global)?{...e.resolution_global}:{};delete r[e.key];let o=f=>{let g={...r,...f};return mn({pin:e.layer==="pin"?g:t,global:e.layer==="pin"?n:g,execution_defaults:e.execution_defaults,runner_catalog:e.runner_catalog,route:e.route,controller_runtime:e.controller_runtime})},s=e.layer==="pin"?t:n,i={...s};delete i[e.key];let l=o(i)[e.key],a=o(s)[e.key],u=It(s[e.key]),d=[...e.choices];return u!==null&&!d.includes(u)&&d.unshift(u),{unset_label:nm(l,e.layer==="pin"),full_value:l.full_value,unavailable:l.resolution==="unavailable",disabled:a?.resolution==="not_applicable",options:d.map(f=>{let g=o({...s,[e.key]:f})[e.key];return{value:f,label:g.display,full_value:g.full_value}})}}function zr(e=document){let t=e.createElement("dialog");t.className="resume-instructions-dialog";let n=e.createElement("h2"),r=e.createElement("textarea"),o=e.createElement("div"),s=e.createElement("button"),i=e.createElement("button");return n.textContent="\uC138\uC158 \uC774\uC5B4\uD558\uAE30",r.placeholder="\uCD94\uAC00 \uC9C0\uCE68 (\uC120\uD0DD) \u2014 \uBE44\uC6CC\uB450\uBA74 \uAE30\uBCF8 \uC808\uCC28\uB85C \uC7AC\uAC1C",r.maxLength=4e3,o.className="resume-instructions-dialog__actions",s.type="button",s.textContent="\uC774\uC5B4\uD558\uAE30",i.type="button",i.textContent="\uCDE8\uC18C",o.append(s,i),t.append(n,r,o),e.body.append(t),new Promise(l=>{let a=!1,u=f=>{a||(a=!0,typeof t.close=="function"&&t.close(),t.remove(),l(f))},d=()=>u(r.value.trim());s.addEventListener("click",d),i.addEventListener("click",()=>u(null)),r.addEventListener("keydown",f=>{f.key==="Enter"&&(f.ctrlKey||f.metaKey)&&(f.preventDefault(),d())}),t.addEventListener("cancel",f=>{f.preventDefault(),u(null)}),typeof t.showModal=="function"?t.showModal():t.setAttribute("open",""),r.focus()})}function oa(e){return`session:${e.provider}:${e.session_id}`}function wo(e){return`${e.provider} \xB7 ${e.session_id.slice(0,8)}`}function rm(e,t){return e.current&&t==="in_progress"&&e.locality==="local"?"running":"done"}function Hr(e,t,n,r){return{attempt_id:oa(e),session_ref:{bead_id:t,provider:e.provider,session_id:e.session_id},...typeof r=="string"&&r.length>0?{root_dir:r}:{},hide_prompt:!0,meta:{runner:e.provider,label:wo(e),session_id:e.session_id,...typeof e.resume_command=="string"&&e.resume_command.length>0?{resume_command:e.resume_command}:{},status:rm(e,n)}}}var sa="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4",om="\uBD84\uD574 \uC5C6\uC74C \u2014 \uCD1D\uB7C9\uB9CC \uBCF4\uACE0\uB428",qc="\uBD84\uD574 \uC5C6\uB294 leg";function Nt(e){return typeof e=="number"&&Number.isFinite(e)?e:0}var Dn=["input_tokens","output_tokens","cache_read_input_tokens","cache_creation_input_tokens"],Gr=[...Dn,"reasoning_output_tokens"],sm={codex:["implementation","review-consult"],claude:["subagent"]};function ia(e){return!e||typeof e!="object"?!1:Number.isFinite(e.total_tokens)&&!Dn.some(t=>Number.isFinite(e[t]))}function im(e){return!e||typeof e!="object"?!1:Gr.some(t=>Number.isFinite(e[t]))}function aa(e){let t=0;for(let n of Dn)t+=Nt(e?.[n]);return t}function am(e){return!e||typeof e!="object"?!1:Dn.some(t=>Number.isFinite(e[t]))}function Fc(e){return!e||typeof e!="object"?!1:Gr.some(t=>Number.isFinite(e[t]))||Number.isFinite(e.total_tokens)}function lm(e){let t={};for(let n of Gr)e&&Number.isFinite(e[n])&&(t[n]=e[n]);return t}function jc(e){let t={};for(let n of Gr)Number.isFinite(e[n])&&(t[n]=e[n]);return Number.isFinite(e.total_tokens)&&(t.total_tokens=e.total_tokens),e.replayed===!0&&(t.replayed=!0),typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&(t.total_cost_usd=e.total_cost_usd),t}function Bc(e,t){return ia(t)?Nt(t.total_tokens):e==="codex"?Nt(t.input_tokens)+Nt(t.output_tokens):aa(t)}function cm(e){return e==="claude"?"Claude":"Codex"}function um(e){return`\u03C4 ${Wc(e)}`}function dm(e,t){let n=t.breakdown||{},r=Nt(t.total_only_subtotal);if(ia(n)||r>0&&!im(n)){let u=[`\uCD1D ${t.subtotal.toLocaleString("en-US")}`,om];return t.replayed&&u.push(sa),u.join(`
`)}let o=[`\uC785\uB825 ${Nt(n.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${Nt(n.output_tokens).toLocaleString("en-US")}`];e==="claude"?o.push(`\uCE90\uC2DC\uC77D\uAE30 ${Nt(n.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${Nt(n.cache_creation_input_tokens).toLocaleString("en-US")}`):(o.push(`\uCE90\uC2DC\uC77D\uAE30 ${Nt(n.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC4F0\uAE30 ${Nt(n.cache_creation_input_tokens).toLocaleString("en-US")}`),Number.isFinite(n.reasoning_output_tokens)&&o.push(`\uCD94\uB860\uCD9C\uB825 ${Nt(n.reasoning_output_tokens).toLocaleString("en-US")}`)),r>0&&o.push(`${qc} ${r.toLocaleString("en-US")}`);let s=e==="claude"?"\uC785\uB825 + \uCD9C\uB825 + \uCE90\uC2DC\uC77D\uAE30 + \uCE90\uC2DC\uC0DD\uC131":"\uC785\uB825 + \uCD9C\uB825",i=r>0?`${s} + ${qc}`:s,a=[e==="claude"?`Claude subtotal = ${i}`:`Codex subtotal = ${i}; \uCE90\uC2DC\uC77D\uAE30\xB7\uCE90\uC2DC\uC4F0\uAE30\xB7\uCD94\uB860\uCD9C\uB825\uC740 subtotal\uC5D0 \uD3EC\uD568\uB418\uC9C0 \uC54A\uB294 subset`,`\uCD1D ${t.subtotal.toLocaleString("en-US")}`,o.join(" \xB7 ")];return typeof t.total_cost_usd=="number"&&Number.isFinite(t.total_cost_usd)&&a.push(`$${t.total_cost_usd.toFixed(2)}`),t.replayed&&a.push(sa),a.join(`
`)}function en(e){let t=[];if(!e||typeof e!="object"||!("providers"in e)||!e.providers)return t;for(let n of["claude","codex"]){let r=e.providers[n];r&&t.push({provider:n,label:`${cm(n)} ${um(r.subtotal)}${typeof r.total_cost_usd=="number"&&Number.isFinite(r.total_cost_usd)?` \xB7 $${r.total_cost_usd.toFixed(2)}`:""}`,tooltip:dm(n,r)})}return t}function Cs(e){let t={},n={claude:!0,codex:!1},r={claude:0,codex:0};for(let o of e)if(!(!o||!o.providers))for(let s of["claude","codex"]){let i=o.providers[s];if(!i)continue;let l=t[s];l||(l={subtotal:0,breakdown:{}},t[s]=l),l.subtotal+=i.subtotal,Number.isFinite(i.total_only_subtotal)&&(l.total_only_subtotal=Nt(l.total_only_subtotal)+Nt(i.total_only_subtotal));for(let a of Gr)Number.isFinite(i.breakdown[a])&&(l.breakdown[a]=Nt(l.breakdown[a])+Nt(i.breakdown[a]));i.replayed&&(l.replayed=!0),s==="claude"&&(typeof i.total_cost_usd=="number"&&Number.isFinite(i.total_cost_usd)?r.claude+=i.total_cost_usd:n.claude=!1)}return t.claude&&n.claude&&(t.claude.total_cost_usd=r.claude),Object.keys(t).length===0?null:{providers:t,roles:{}}}function la(e){return!e||typeof e!="object"?null:Gn({attempt:{...e,bead_id:"__attempt__"}},"__attempt__")}function pm(e){return e==="codex"?"codex":"claude"}function Pn(){return{subtotal:0,breakdown:lm(null),total_only:0,legs:[],replayed:!1,outer_count:0,outer_cost:0,outer_cost_count:0}}function Ts(e,t,n){e.subtotal+=t.subtotal,ia(t.usage)&&(e.total_only+=t.subtotal);for(let r of Gr)Number.isFinite(t.usage[r])&&(e.breakdown[r]=Nt(e.breakdown[r])+Nt(t.usage[r]));e.legs.push(t),t.replayed===!0&&(e.replayed=!0),n&&(e.outer_count+=1,typeof t.usage.total_cost_usd=="number"&&Number.isFinite(t.usage.total_cost_usd)&&(e.outer_cost+=t.usage.total_cost_usd,e.outer_cost_count+=1))}function Uc(e,t){let n={subtotal:e.subtotal,breakdown:e.breakdown};return e.total_only>0&&(n.total_only_subtotal=e.total_only),t&&(n.legs=e.legs),e.replayed&&(n.replayed=!0),n}function Wc(e){return e>=1e6?`${(e/1e6).toFixed(1)}M`:e>=1e3?`${(e/1e3).toFixed(1)}k`:String(e)}function Kr(e){return am(e)?`\u03C4 ${Wc(aa(e))}`:null}function Hn(e){let t=Kr(e);if(!t)return null;let n=e?.total_cost_usd;return typeof n=="number"&&Number.isFinite(n)?`${t} \xB7 $${n.toFixed(2)}`:t}function ko(e){if(!e||typeof e!="object")return"";let t=[`\uC785\uB825 ${Nt(e.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${Nt(e.output_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC77D\uAE30 ${Nt(e.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${Nt(e.cache_creation_input_tokens).toLocaleString("en-US")}`];typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&t.push(`$${e.total_cost_usd.toFixed(2)}`);let n=[`\uCD1D ${aa(e).toLocaleString("en-US")}`,t.join(" \xB7 ")];return e.replayed&&n.push(sa),n.join(`
`)}function Gn(e,t){let n={claude:Pn(),codex:Pn()},r={orchestrator:{claude:Pn(),codex:Pn()},implementation:{claude:Pn(),codex:Pn()},"review-consult":{claude:Pn(),codex:Pn()},subagent:{claude:Pn(),codex:Pn()}},o=new Set;for(let l of Object.values(e||{})){if(!l||l.bead_id!==t)continue;let a=l.usage;if(Fc(a)){let d=pm(l.runner),f=jc(a),g={provider:d,role:"orchestrator",attempt_id:String(l.attempt_id||""),usage:f,subtotal:Bc(d,f)};f.replayed===!0&&(g.replayed=!0),typeof l.model=="string"&&(g.model=l.model),typeof l.session_id=="string"&&(g.session_id=l.session_id),Ts(n[d],g,!0),Ts(r.orchestrator[d],g,!0)}let u=Array.isArray(l.usage_legs)?l.usage_legs:[];for(let d of u){let f=d&&d.provider==="claude"?"claude":"codex";if(!d||d.provider!=="codex"&&d.provider!=="claude"||!sm[f].includes(d.role)||!Fc(d.usage))continue;let g=typeof d.receipt_id=="string"&&d.receipt_id.length>0?d.receipt_id:null;if(!g||o.has(g))continue;o.add(g);let m=jc(d.usage),$={provider:f,role:d.role,attempt_id:String(l.attempt_id||""),usage:m,subtotal:Bc(f,m)};$.receipt_id=g,typeof d.agent_type=="string"&&($.agent_type=d.agent_type),typeof d.agent_id=="string"&&($.agent_id=d.agent_id),typeof d.model=="string"&&($.model=d.model),typeof d.effort=="string"&&d.effort.trim().length>0&&($.effort=d.effort),typeof d.session_id=="string"?$.session_id=d.session_id:typeof d.thread_id=="string"&&($.session_id=d.thread_id),typeof d.turn_id=="string"&&($.turn_id=d.turn_id),(typeof d.completed_at=="string"||typeof d.completed_at=="number"&&Number.isFinite(d.completed_at))&&($.completed_at=d.completed_at),m.replayed===!0&&($.replayed=!0),Ts(n[f],$,!1),Ts(r[$.role][f],$,!1)}}let s={};for(let l of["claude","codex"]){let a=n[l];if(a.legs.length===0)continue;let u=Uc(a,!1);l==="claude"&&a.outer_count>0&&a.outer_cost_count===a.outer_count&&(u.total_cost_usd=a.outer_cost),s[l]=u}if(Object.keys(s).length===0)return null;let i={};for(let l of["orchestrator","implementation","review-consult","subagent"]){let a={};for(let u of["claude","codex"]){let d=r[l][u];d.legs.length>0&&(a[u]={...Uc(d,!0),legs:d.legs})}Object.keys(a).length>0&&(i[l]=a)}return{providers:s,roles:i}}var fm=".chip-popover, .judgement-chip";function Yr(e){let t=null,n=!1;function r(d){return t!==null&&t.bead_id===d.bead_id&&t.chip_key===d.chip_key}function o(d){t=r(d)?null:{...d},e()}function s(){t!==null&&(t=null,e())}function i(d){let f=d.target;t!==null&&(f&&typeof f.closest=="function"&&f.closest(fm)||s())}function l(d){d.key==="Escape"&&s()}function a(){n||(n=!0,document.addEventListener("click",i),document.addEventListener("keydown",l))}function u(){n&&(n=!1,document.removeEventListener("click",i),document.removeEventListener("keydown",l))}return{toggle:o,close:s,isOpen:r,attach:a,detach:u}}function Vr(e){return c`<div
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
`)}function qs(e){return e.replace(/\/+$/,"")}function Em(e,t){let n=qs(e),r=qs(t);return n===r||r.startsWith(`${n}/`)||n.startsWith(`${r}/`)}function Fs(e,t){let n=new Set;for(let r of e)for(let o of t){if(!Em(r,o))continue;let s=qs(r),i=qs(o);n.add(s.length>=i.length?s:i)}return[...n].sort()}function va(e,t){return`${e}\0${t}`}function pu(e){let t=new Map;for(let n of Array.isArray(e?.running)?e.running:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"running",state:"running"});for(let n of Array.isArray(e?.pr_wait)?e.pr_wait:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"pr_wait",state:"pr_wait"});for(let n of Array.isArray(e?.queue_groups)?e.queue_groups:[]){let r=Array.isArray(n.sublanes?.parallel)?n.sublanes.parallel:Array.isArray(n.items)?n.items:[];for(let o of r)t.set(o.id,{root_dir:o.root_dir,workspace_name:o.workspace_name,lane:"parallel",position:o.queue_position});for(let o of Array.isArray(n.sublanes?.serial)?n.sublanes.serial:[])for(let s of o.items)t.set(s.id,{root_dir:s.root_dir,workspace_name:s.workspace_name,lane:o.id,position:s.queue_position})}for(let n of Array.isArray(e?.runnable)?e.runnable:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"runnable",state:"runnable"});for(let n of Array.isArray(e?.done)?e.done:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"done",state:"done"});return t}function wa(e,t){let n=Array.isArray(t)?t:[],r=e.indexOf("-"),o=r>0?e.slice(0,r):e;return n.some(s=>typeof s?.issue_prefix=="string"&&s.issue_prefix===o)?"internal":n.length>0&&n.every(s=>typeof s?.issue_prefix=="string")?"external":"unknown"}function Co(e){if(e.state==="running")return"\uC2E4\uD589\uC911";if(e.state==="pr_wait")return"PR \uB300\uAE30";if(e.state==="runnable")return"\uC2E4\uD589\uAC00\uB2A5";if(e.state==="done")return"\uC644\uB8CC";let t=e.lane==="parallel"?"\uBCD1\uB82C":e.lane;return`${e.workspace_name} \xB7 ${t} #${e.position}`}function fu(e,t,n,r){let o=n.get(e);if(!!(o&&t&&o.root_dir===t.root_dir&&o.lane===t.lane&&typeof o.position=="number"&&typeof t.position=="number"&&o.position<t.position))return{id:e,label:`\u{1F512} ${e} (\uAC19\uC740 \uB808\uC778 \uC55E)`,location_label:"\uAC19\uC740 \uB808\uC778 \uC55E",scope:null,same_lane_ahead:!0};if(o)return{id:e,label:`\u{1F512} ${e} (${Co(o)})`,location_label:Co(o),scope:null,same_lane_ahead:!1};let i=wa(e,r),l=i==="internal"?"\uBBF8\uC801\uC7AC":i==="external"?"\uC678\uBD80":"\uC704\uCE58 \uBBF8\uD655\uC778";return{id:e,label:`\u{1F512} ${e} (${l})`,location_label:l,scope:i,same_lane_ahead:!1}}function _u(e){let t=Array.isArray(e)?e:[],n=new Map,r=new Map,o=new Map;for(let l of t)for(let a of Array.isArray(l.sublanes?.serial)?l.sublanes.serial:[]){let u=va(l.root_dir,a.id);n.set(u,{root_dir:l.root_dir,workspace_name:l.name,lane:a.id}),o.set(u,[]);for(let d of Array.isArray(a.items)?a.items:[])r.set(d.id,u)}for(let l of t)for(let a of Array.isArray(l.sublanes?.serial)?l.sublanes.serial:[]){let u=va(l.root_dir,a.id),d=Array.isArray(a.items)?a.items[0]:null,g=!!d&&d.queue_index===0&&(!Array.isArray(a.occupied_by)||a.occupied_by.length===0)&&Array.isArray(d.blocked_by)?d.blocked_by:[],m=o.get(u);if(m)for(let $ of g){let O=r.get($);O&&O!==u&&!m.includes(O)&&m.push(O)}}let s=(l,a)=>{let u=new Set,d=[l];for(;d.length>0;){let f=d.pop();if(f===a)return!0;!f||u.has(f)||(u.add(f),d.push(...o.get(f)||[]))}return!1},i=new Map;for(let[l,a]of o){let u=[];for(let d of a){let f=n.get(d);s(d,l)&&f&&u.push(f)}u.length>0&&i.set(l,u)}return i}function mu(e,t){return va(e,t)}async function Tm(e){let t=await on(e);ye(t?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",t?"success":"error",1200)}function eo(e){return typeof e!="string"||e.length===0?"":c`<span class="worker-ev__copyline"
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
            title=${n.deploy.at?Gt(n.deploy.at):""}
            >${Ws(n.deploy.at)}${n.deploy.elapsed_ms!==null?` \xB7 ${Ar(n.deploy.elapsed_ms)}`:""}</span
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
  >`,$=e.lane==="done"?"":Ys(e.workflow),O=e.lane==="done"?"":Au(e.from_id),B=Xs(e.priority),Y=c`<span class="worker-mini__title">${e.title}</span>`,J=Eu(e.pr_url,e.pr_number),X=r.map(me=>me===e.live_badge?c`<span
          class="worker-mini__badge worker-mini__badge--activity"
          title="서버가 이 PR을 처리하는 중입니다"
          ><span class="act-dot" aria-hidden="true"></span>${me}</span
        >`:c`<span
          class="worker-mini__badge${e.alert?" worker-mini__badge--alert":""}"
          title=${me===e.completion_badge&&e.completion_title||""}
          >${me}</span
        >`),F=e.reason?c`<span class="worker-mini__reason">${e.reason}</span>`:"",L=o.length>0?o.map(me=>c`<span class="worker-usage" title=${me.tooltip}
              >${me.label}</span
            >`):s?c`<span class="worker-usage" title=${ko(e.usage)}
            >${s}</span
          >`:"",M=i?c`<span
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
      </button>`:"",W=e.cancel_action?c`<button
        type="button"
        class="worker-mini__merge-cancel"
        data-bead-id=${e.id}
        ?disabled=${e.cancel_enabled===!1}
        title=${e.cancel_title||""}
      >
        취소
      </button>`:"",re=e.discard,q=re?.action||e.discard_action?c`<button
          type="button"
          class="worker-mini__discard"
          data-bead-id=${e.id}
          data-attempt-id=${re?.attempt_id||""}
          data-operation-id=${re?.operation?.operation_id||""}
          data-discard-mode=${re?.confirmation||"unmerged"}
          ?disabled=${re?!re.enabled:e.discard_enabled===!1}
          title=${re?re.title:e.discard_enabled===!1?e.discard_title||"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"PR\uC744 \uB2EB\uACE0 \uC6CC\uD06C\uD2B8\uB9AC/\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4 (\uB418\uB3CC\uB9B4 \uC218 \uC5C6\uC74C). \uB2E4\uC2DC \uC2E4\uD589\uD558\uB824\uBA74 \uD6C4\uBCF4 \uB808\uC778\uC5D0\uC11C \uB300\uAE30 \uB808\uC778\uC73C\uB85C \uC62E\uAE30\uC138\uC694"}
        >
          ${re?.label||"\uD3D0\uAE30"}
        </button>`:"",U=e.stale_work||null,Q=U?c`${U.can_resume||U.can_continue?c`<button
            type="button"
            class="worker-mini__stale-continue"
            data-bead-id=${e.id}
            data-action-id=${U.action_id}
            ?disabled=${U.locked}
          >
            기존 작업 이어가기
          </button>`:""}${U.can_backup_fresh?c`<button
            type="button"
            class="worker-mini__stale-backup"
            data-bead-id=${e.id}
            data-action-id=${U.action_id}
            ?disabled=${U.locked}
          >
            백업 후 새로 시작
          </button>`:""}${U.can_recheck?c`<button
            type="button"
            class="worker-mini__stale-recheck"
            data-bead-id=${e.id}
            data-action-id=${U.action_id}
            ?disabled=${U.locked}
          >
            다시 확인
          </button>`:""}`:"",ne=U?c`<div class="worker-mini__stale">
        <strong>${U.title}</strong>
        <span>${U.summary}</span>
        <span>${U.cause}</span>
        ${U.can_backup_fresh?c`<small
              >Git-ignored dependency/build output은 archive에 포함되지
              않습니다</small
            >`:""}
      </div>`:"",we=e.revise_action?c`<button
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
        </button>`:"",ve=!!(e.lane!=="pr_wait"&&!e.done&&e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker)),le=Vs(e.rec,xr(e,"rec")),D=Dm(e,xr(e,"receipt")),$e=Ks(e.cross_lane_chip),Ae=eo(e.log_path),T=g||$e||$||O||ve||le||D||L||Ae?c`<div class="worker-chips">
          ${g}${$e}${$}${O}${ve?Hs(e.exec_chips,{pin:e.exec_chips_pinned===!0}):""}${le}${D}${L}${Ae}${$a(e)}
        </div>`:"",Z=Gs(e.dependency_chips),Re=Bs(e),fe=t.actions?t.actions:"",Te=!!(i||e.merge_action||e.cancel_action||e.discard_action||re?.operation||e.revise_action||U);return c`<div
    class="worker-mini${l?" worker-mini--card":""}${n?"":" worker-mini--static"}${e.done?" worker-mini--done":""}${e.ghost?" worker-mini--ghost":""}${i?" worker-mini--merging":""}${i?.failed?" worker-mini--merge-failed":""}${e.external?" worker-mini--external":""}"
    style=${i?`--progress: ${i.percent}%`:""}
    draggable=${n?"true":"false"}
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    ${a?c`<div class="worker-mini__row1">
            ${g}${m}${B}${O}${J}${Y}${fe}
          </div>
          <div class="worker-mini__row2">
            ${L}${u?c`<span
                  class="worker-mini__done-at"
                  title=${`\uC644\uB8CC ${Gt(e.done_at)}`}
                  >완료 ${u}</span
                >`:""}${typeof e.work_ms=="number"?c`<span
                  class="worker-mini__work"
                  title=${bu(e.work_kind)}
                  >작업 ${Ar(e.work_ms)}</span
                >`:""}${X}${M}
            <span class="worker-mini__actions"
              >${N}${W}${q}</span
            >
            ${to(e)}
          </div>`:l?c`<div class="worker-mini__head">
              ${d}${f}${m}${B}${J}${X}${F}${fe}
            </div>
            <div class="worker-mini__body">${Y}${ne}</div>
            ${Z}${T}${Te?c`<div class="worker-mini__foot">
                  ${M}
                  <span class="worker-mini__actions"
                    >${N}${W}${q}${we}${Q}</span
                  >
                  ${Bs(e)}
                </div>`:""}
            ${to(e)}`:c`<div class="worker-mini__line">
              ${d}${f}${m}${B}${Y}${J}${X}${F}${M}${N}${W}${q}${fe}
            </div>
            ${Z}${T}${Re} ${to(e)}`}
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
      </button>`)}return c`${r}`}var Tu={external_roundtrip:"\uD558\uB124\uC2A4 \uBC16 \uC0C1\uB300\uC640 \uC608\uCE21 \uBD88\uAC00 \uC655\uBCF5 \uBC18\uBCF5 \u2014 \uB2E4\uB978 rig \uC138\uC158\xB7\uC0AC\uB78C\xB7\uC678\uBD80 \uC2DC\uC2A4\uD15C",user_feedback_loop:"\uC9C4\uD589 \uC911 \uC0AC\uC6A9\uC790 \uD53C\uB4DC\uBC31 \uC5C6\uC774\uB294 \uD488\uC9C8\uC774 \uB0AE\uC74C \u2014 \uBB38\uC548\xB7\uC124\uACC4 \uC138\uBD80\xB7\uBC29\uD5A5 \uC120\uD0DD"};function Aa(e,t){if(t==="rec"){let n=e.rec;if(!n)return null;let r=ya[n.state]||"";return{title:"\uBCF5\uC7A1\uD55C \uC791\uC5C5\uC73C\uB85C \uD310\uC815\uB428",lines:[...ba(n),...r.length>0?[`\uC0C1\uD0DC: ${r}`]:[],"\uC801\uC6A9\uC740 \uC774\uC288 \uC0C1\uC138\uC758 \uC2E4\uD589 \uC124\uC815 \uD3B8\uC9D1\uAE30\uC5D0\uC11C"]}}if(t==="session_preferred"){if(e.session_preferred!==!0)return null;let n=Tu[e.session_preferred_reason||""]||"";return{title:"\uC6CC\uCEE4\uB85C \uB3CC\uB9B4 \uC218 \uC788\uC9C0\uB9CC \uC138\uC158\uC774 \uB0AB\uB2E4",lines:n.length>0?[n]:[]}}if(t==="ineligible")return e.worker_ineligible!==!0?null:{title:"\uC6CC\uCEE4 \uC2E4\uD589 \uB300\uC0C1\uC774 \uC544\uB2C8\uB2E4",lines:["worker-ineligible \uB77C\uBCA8\uC774 \uBD99\uC5B4 \uC788\uB2E4 \u2014 \uB77C\uBCA8\uC740 \uC774\uC288 \uC0C1\uC138\uC758 \uB77C\uBCA8 \uC808\uC5D0\uC11C \uB5C0\uB2E4"]};if(t==="spec_after_blocker")return e.spec_after_blocker!==!0?null:{title:"\uC120\uD589 \uACB0\uACFC\uAC00 \uC124\uACC4 \uC804\uC81C \u2014 \uC2A4\uD399\uB3C4 \uC120\uD589 \uB4A4\uC5D0",lines:[`\uC120\uD589: ${(Array.isArray(e.blocked_by)?e.blocked_by:[]).join(" \xB7 ")}`,"\uC120\uD589\uC774 \uB2EB\uD788\uBA74 \uC774 \uD45C\uC2DC\uB294 \uC800\uC808\uB85C \uC0AC\uB77C\uC9C4\uB2E4 \u2014 \uB77C\uBCA8\uC740 \uC774\uC288 \uC0C1\uC138\uC758 \uB77C\uBCA8 \uC808\uC5D0\uC11C \uB5C0\uB2E4"]};if(t==="receipt"){let n=Su(e);return n.length===0?null:{title:"\uC2E4\uD589 \uC601\uC218\uC99D \uD68C\uACC4 \uC794\uC5EC \u2014 \uBA38\uC9C0\uB294 \uC9C4\uD589",lines:[...n.map(r=>Pm[r]||r),"\uC790\uB3D9 \uBA38\uC9C0 \uD310\uC815\uC5D0\uB294 \uC601\uD5A5\uC774 \uC5C6\uB2E4 \u2014 \uC815\uC815\uC740 bd update --set-metadata exec_receipt=\u2026 \uB85C"]}}if(t==="qfr"){let n=e.workflow?e.workflow.quick_fix_review:null;if(!n||n.state!=="reviewed"&&n.state!=="stale")return null;let r=Array.isArray(n.missing)?n.missing:[];return{title:n.state==="reviewed"?"quick_fix self-review \uC601\uC218\uC99D\uC774 \uC9C0\uAE08 \uBCF8\uBB38\uACFC \uC77C\uCE58\uD569\uB2C8\uB2E4":"quick_fix self-review \uC601\uC218\uC99D\uC774 \uC9C0\uAE08 \uBCF8\uBB38\uACFC \uB2E4\uB985\uB2C8\uB2E4",lines:r.length>0?r:["\uBE60\uC9C4 \uD56D\uBAA9 \uC5C6\uC74C"]}}return null}var Fm=["rec","receipt","session_preferred","ineligible","qfr","spec_after_blocker"];function Qs(e,t){for(let n of Fm){if(!t(n))continue;let r=Aa(e,n);return r?{chip_key:n,content:r}:null}return null}function $a(e){return e.chip_popover?Vr(e.chip_popover.content):""}function xr(e,t){return!!e.chip_popover&&e.chip_popover.chip_key===t}var Zs="\uC0AC\uC6A9\uC790 \uB9AC\uBDF0 \uD544\uC694";function Sa(e,t=null,n={}){let r=e.worker_ineligible===!0,o=e.draggable&&!e.done&&!r,s=e.queue_placeable===!0&&!e.done&&!r,i=s&&t&&t.bead_id===e.id,l=e.session_preferred===!0,a=Tu[e.session_preferred_reason||""]||"",u=e.workflow,d=typeof e.reason=="string"?e.reason.split(" \xB7 "):[],f=d.includes("missing_description"),g=d.some(M=>M.startsWith(Zs)),m=typeof e.reason=="string"&&e.reason.startsWith("\u26D4"),$=xr(e,"spec_after_blocker"),O=Im(e.spec_after_blocker===!0,$),B=Gs(e.dependency_chips,O===""?"":c`${O}${$?$a(e):""}`),Y=e.workspace_name?c`<span class="worker-card__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:"",J=Ks(e.cross_lane_chip),X=Ys(u),F=Au(e.from_id),L=!!(e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker));return c`<div
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
      ${$?"":$a(e)}
    </div>
    <div class="worker-card__title">${e.title}</div>
    ${u?$s(u,e.status,{onOpenDoc:n.onOpenDoc}):""}${B}
    ${Y||J||X||F||L?c`<div class="worker-chips">
          ${Y}${J}${X}${F}${Hs(e.exec_chips,{pin:n.exec_chips_mode==="pinned_only"})}
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
  </section>`:""}var Cu=[{step:"merge",label:"\uBA38\uC9C0",index:1},{step:"base",label:"base",index:2},{step:"verify",label:"\uAC80\uC99D",index:3},{step:"deploy",label:"\uBC30\uD3EC",index:4},{step:"child",label:"\uC790\uC2DD",index:5},{step:"branch",label:"\uBE0C\uB79C\uCE58",index:6},{step:"close",label:"close",index:7}],Oo=[{step:"base_containment",label:"base \uD3EC\uD568 \uD655\uC778"},{step:"repo_operations",label:"\uC800\uC7A5\uC18C \uC791\uC5C5"},{step:"child_sweep",label:"\uC790\uC2DD \uC815\uB9AC"},{step:"branch_cleanup",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC"},{step:"parent_close",label:"\uBD80\uBAA8 close"}];function ti(e,t){let n=Cu.find(o=>o.step===e);if(!n)return null;let r=Cu.length;return{step:n.step,label:t,index:n.index,total:r,percent:Math.round(n.index/r*100)}}function Ru(e){let t=Oo.findIndex(n=>n.step===e);return Oo.map((n,r)=>({step:n.step,label:n.label,state:t<0?"todo":r<t?"done":r===t?"stall":"todo"}))}function Sr(e){let t=Oo.find(n=>n.step===e);return t?t.label:typeof e=="string"?e:""}function Bm(e){let t=Oo.findIndex(n=>n.step===e);return t<0?null:{index:t+1,total:Oo.length}}function ni(e){let t=Bm(e);return t?`\uBA38\uC9C0 \uC644\uB8CC \xB7 \uC815\uB9AC ${t.total}\uB2E8\uACC4 \uC911 ${t.index}\uB2E8\uACC4\uC5D0\uC11C \uBA48\uCDA4`:"\uBA38\uC9C0\uB428 \xB7 \uC815\uB9AC \uBBF8\uC644"}var Ta=new Set(["queued","running","retry_pending"]),Ou=new Set(["failed","succeeded"]),Um={queued:"\uB300\uAE30",running:"\uC911",retry_pending:"\uC7AC\uC2DC\uB3C4 \uB300\uAE30",failed:"\uC2E4\uD328",succeeded:"\uC644\uB8CC \xB7 \uC815\uB9AC \uC7AC\uAC1C \uB300\uAE30"},Lo={base_containment:{step:"base",label:"base \uD655\uC778 \uC911"},child_sweep:{step:"child",label:"\uC790\uC2DD \uC815\uB9AC \uC911"},branch_cleanup:{step:"branch",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC \uC911"},parent_close:{step:"close",label:"\uBD80\uBAA8 close \uC911"}},Wm={merging:{step:"merge",label:"\uBA38\uC9C0 \uC911"},base_containment:Lo.base_containment,child_sweep:Lo.child_sweep,branch_cleanup:Lo.branch_cleanup,parent_close:Lo.parent_close};function zm(e){return typeof e=="string"&&/^[0-9a-f]{40}$/.test(e)}function Hm(e,t,n){return!["verify","deploy"].includes(e.kind)||![...Ta,...Ou].includes(e.state)||![null,void 0,""].includes(e.superseded_by)||!Array.isArray(e.subjects)?!1:e.subjects.some(r=>r&&typeof r=="object"&&r.bead_id===t&&r.merged_sha===n)}function Gm(e,t){let n=(t.kind==="deploy"?2:1)-(e.kind==="deploy"?2:1);if(n!==0)return n;let r=u=>u.state==="succeeded"?1:2,o=r(t)-r(e);if(o!==0)return o;let s=typeof e.requested_at=="number"?e.requested_at:0,i=typeof t.requested_at=="number"?t.requested_at:0;if(s!==i)return i-s;let l=typeof e.operation_id=="string"?e.operation_id:"",a=typeof t.operation_id=="string"?t.operation_id:"";return l.localeCompare(a)}function Ea(e,t=!1){let n=e.kind,r=n==="verify"?"\uAC80\uC99D":"\uBC30\uD3EC",o=t?"failed":e.state,s=Um[o];if(!s)return null;let i=ti(n,`${r} ${s}`);return i?{...i,active:Ta.has(o),failed:o==="failed"}:null}function Km(e){return!e||typeof e!="object"?null:Wm[e.step]||null}function Io(e){if(!e||typeof e.bead_id!="string")return null;let t=e.bead_id,n=e.merge_progress&&typeof e.merge_progress=="object"?e.merge_progress:{},r=Km(n),o=e.cleanup_failed&&typeof e.cleanup_failed=="object"?e.cleanup_failed:null,s=["child_sweep","branch_cleanup","parent_close"].includes(typeof e.cleanup_cursor=="string"?e.cleanup_cursor:""),i=!s&&(e.cleanup_cursor==="repo_operations"||n.step==="repo_operations"),l=zm(e.merge_sha)?e.merge_sha:null,a=!s&&l&&Array.isArray(e.repo_operations)?e.repo_operations.filter($=>$&&typeof $=="object"&&Hm($,t,l)).sort(Gm):[],u=i?a:[],d=u.find($=>Ta.has($.state));if(d)return Ea(d);if(o)return o.step==="repo_operations"&&a[0]?Ea(a[0],!0):null;let f=u.find($=>Ou.has($.state)?$.state!=="succeeded"||e.cleanup_cursor==="repo_operations":!1);if(f)return Ea(f);if(r){let $=ti(r.step,r.label);return $?{...$,active:!0,failed:!1}:null}let g=typeof e.cleanup_cursor=="string"?Lo[e.cleanup_cursor]:null;if(!g)return null;let m=ti(g.step,g.label);return m?{...m,active:!0,failed:!1}:null}function ri(e){return!!e&&e.step!=="merge"&&e.failed!==!0}var Ym="\uBBF8\uC801\uC7AC";function Ca(e,t){let n=Un(e,t.id);return{id:t.id,label:`\u26D3 ${t.id}`,title:`\uC120\uD589 \u2014 close\uB420 \uB54C\uAE4C\uC9C0 \uCD9C\uBC1C\uD558\uC9C0 \uC54A\uB294\uB2E4 (${t.location_label})`,...n?{foreign:!0}:{}}}var Vm=10080*60*1e3;function Lu(e,t,n){let r=t.closed_at;if(typeof r!="number"||!Number.isFinite(r)||r<n-Vm)return null;let o=Un(e,t.id),s=typeof t.root_dir=="string"?t.root_dir:"",i={id:t.id,label:`\u{1F513} ${t.id}`,title:`\uD574\uC81C \u2014 ${Gt(r)}\uC5D0 close\uB418\uC5B4 \uC774 \uC774\uC288\uAC00 \uD480\uB838\uB2E4`,...o?{foreign:!0}:{}};return o?s.length>0&&(i.openable=!0,i.root_dir=s):i.openable=!0,i}function Iu(e,t){let n=Array.isArray(t.ids)?t.ids.filter(s=>typeof s=="string"&&s.length>0):[],r=t.root_dirs&&typeof t.root_dirs=="object"?t.root_dirs:{},o=[];for(let s of[...new Set(n)].sort()){let i=Un(e,s),l=typeof r[s]=="string"?r[s]:"",a={id:s,label:`\u2192 ${s}`,title:"\uD6C4\uC18D \u2014 \uC774 \uC774\uC288\uAC00 close\uB418\uBA74 \uD480\uB9B0\uB2E4",...i?{foreign:!0}:{}};l.length>0?(a.openable=!0,a.root_dir=l):i||(a.openable=!0),o.push(a)}return o}function Mu(e,t,n={}){let r=new Map,o=new Map;for(let s of t)o.has(s.id)||o.set(s.id,s.location_label);for(let[s,i]of e){if(typeof s!="string"||s.length===0)continue;let l=[];for(let a of Array.isArray(i)?i:[]){if(typeof a!="string"||a.length===0)continue;let u=Ca(s,{id:a,location_label:o.get(a)||Ym}),d=n[a];u.foreign!==!0?u.openable=!0:typeof d=="string"&&d.length>0&&(u.openable=!0,u.root_dir=d),l.push(u)}l.length>0&&r.set(s,l)}return r}var si=1,Mo=[{value:"repo_spec",label:"\uB808\uD3EC \xB7 spec \uC6B0\uC120"},{value:"repo_updated",label:"\uB808\uD3EC \xB7 \uCD5C\uC2E0 \uC218\uC815"},{value:"updated_flat",label:"\uCD5C\uC2E0 \uC218\uC815(\uB808\uD3EC \uBB34\uC2DC)"}],La=[{value:"all",label:"\uC804\uCCB4"},{value:"with",label:"spec \uC788\uC74C"},{value:"without",label:"spec \uC5C6\uC74C"}],no={show_blocked:!0,spec:"all"},Pu={auto_merge:"\uC790\uB3D9 \uBA38\uC9C0",merged:"\uBA38\uC9C0",merge:"\uBA38\uC9C0",pr_stop:"PR \uC911\uB2E8",stopped:"\uC911\uB2E8",failed:"\uC2E4\uD328",refuted:"\uBC18\uC99D",no_delta:"\uBB34-delta"};function Xm(e,t){let n=null;for(let r of Object.values(e||{}))!r||r.bead_id!==t||!Kn(r)||(n=typeof r.status=="string"?r.status:null);return n}function Qm(e,t){let n=null,r=-1/0;for(let o of Object.values(e)){if(!o||o.bead_id!==t||o.status==="running"||!Kn(o))continue;let s=typeof o.finished_at=="number"?o.finished_at:typeof o.started_at=="number"?o.started_at:0;s>=r&&(r=s,n=o)}return n}function Zm(e,t,n={}){let{winners:r,resumed_from_ids:o}=Gc(e,t),s=new Map;for(let[i,l]of r){let a=l.attempt,u=l.run_state,d=l.started_at,f=typeof a.session_id=="string"&&a.session_id.length>0,m=Ds(a.quickfix_landing)==="session",$=u!=="running"&&(f||!m)&&!o.has(a.attempt_id),O=!f&&m?"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":o.has(a.attempt_id)?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":null,B=at(n.observations?.[i]),Y=at(B.pr),J=typeof a.merge_sha=="string"&&a.merge_sha.length>0||Y.state==="MERGED",X=Vn(n.discard_operations,i,{attempt_id:a.attempt_id,merged:J}),F=u==="failed"?Nu(a,{resume_eligible:$,resume_reason:O,confirmation:X.confirmation,history:n.bead_timelines?.[i]}):null;s.set(i,{...Du(a,e,u),started_at:d,...F?{failure:F}:{},can_pause:u==="running"&&f,can_resume:$})}for(let[i,l]of ng(e,t)){if(s.has(i))continue;let a=l.attempt,u=Vn(n.discard_operations,i,{attempt_id:a.attempt_id}),d=Uu(a);s.set(i,{...Du(a,e,l.run_state),started_at:typeof a.started_at=="number"?a.started_at:null,...l.run_state==="parked"?{failure:Nu(a,{resume_eligible:!1,resume_reason:"\uC138\uC158 \uB300\uAE30 \u2014 [\uC7AC\uC2DC\uB3C4]\uAC00 \uC0C8 attempt\uB97C \uB744\uC6C1\uB2C8\uB2E4",confirmation:u.confirmation,history:n.bead_timelines?.[i]})}:{},...l.run_state==="waiting"?{wait:eg(a)}:{},...d?{retry:d}:{},can_pause:!1,can_resume:!1})}return s}function Du(e,t,n){return{attempt_id:typeof e.attempt_id=="string"?e.attempt_id:"",run_state:n,last_event_at:typeof e.last_event_at=="number"?e.last_event_at:null,last_activity:e.last_activity&&typeof e.last_activity=="object"?e.last_activity:null,legs:Array.isArray(e.legs)?e.legs:[],runner:typeof e.runner=="string"?e.runner:null,model:typeof e.model=="string"?e.model:null,effort:typeof e.effort=="string"?e.effort:null,speed:typeof e.speed=="string"?e.speed:null,resumed_from:typeof e.resumed_from=="string"?e.resumed_from:null,continuation_mode:e.continuation_mode==="session"||e.continuation_mode==="fresh"?e.continuation_mode:null,status:typeof e.status=="string"?e.status:null,usage:Gn(t,e.bead_id)}}function Nu(e,t){let n=e.cause_detail&&typeof e.cause_detail=="object"?e.cause_detail:null;return{cause:typeof e.cause=="string"?e.cause:null,cause_detail:n,summary:n&&typeof n.summary=="string"?n.summary:null,bead_id:typeof e.bead_id=="string"?e.bead_id:"",finished_at:typeof e.finished_at=="number"?e.finished_at:null,runner:typeof e.runner=="string"?e.runner:null,model:typeof e.model=="string"?e.model:null,effort:typeof e.effort=="string"?e.effort:null,observed_effort:typeof e.observed_effort=="string"?e.observed_effort:null,speed:typeof e.speed=="string"?e.speed:null,attempt_id:typeof e.attempt_id=="string"?e.attempt_id:"",usage:e.usage&&typeof e.usage=="object"?e.usage:null,halted_auto_advance:e.halted_auto_advance===!0,quickfix_lane:e.quickfix_lane===!0,quickfix_landing:e.quickfix_landing&&typeof e.quickfix_landing=="object"?e.quickfix_landing:null,retry:Uu(e),resume_eligible:t.resume_eligible,resume_reason:t.resume_reason,landed:$u(e),confirmation:t.confirmation,...Jm(t.history)}}function Jm(e){if(!e||typeof e!="object")return{};let t=Array.isArray(e.events)?e.events:[],n=[];for(let o of t)!o||typeof o!="object"||typeof o.summary!="string"||o.summary.length===0||n.push({event_id:typeof o.event_id=="string"?o.event_id:"",kind:typeof o.kind=="string"?o.kind:"",summary:o.summary,at:typeof o.at=="number"?o.at:null});n.reverse();let r=typeof e.log_path=="string"&&e.log_path.length>0?e.log_path:null;return{...n.length>0?{timeline:n}:{},...r===null?{}:{log_path:r},...e.log_expired===!0?{log_expired:!0}:{},...e.log_unreadable===!0?{log_unreadable:!0}:{}}}function eg(e){let t=e.cause_detail&&typeof e.cause_detail=="object"?e.cause_detail:null,n=Array.isArray(t?.blockers)?t.blockers:[],r=[];for(let o of n)!o||typeof o!="object"||typeof o.id!="string"||o.id.length===0||r.push({id:o.id,rig:typeof o.rig=="string"?o.rig:null,status:typeof o.status=="string"?o.status:""});return{summary:t&&typeof t.summary=="string"?t.summary:null,blockers:r,since:typeof e.finished_at=="number"?e.finished_at:null}}function Uu(e){let t=e&&e.retry&&typeof e.retry=="object"?e.retry:null;return t?{cause:typeof t.cause=="string"?t.cause:null,attempts:typeof t.attempts=="number"?t.attempts:0,max:typeof t.max=="number"?t.max:0,next_at:typeof t.next_at=="number"?t.next_at:null}:null}var tg=new Set(["parked","retry_wait","waiting"]);function ng(e,t){let n=Object.values(e||{}),r=new Map;for(let s of n)s&&typeof s.bead_id=="string"&&Kn(s)&&r.set(s.bead_id,s.attempt_id);let o=new Map;for(let s of n){if(!s||typeof s.bead_id!="string"||s.bead_id.length===0||!Kn(s)||!tg.has(s.status)||r.get(s.bead_id)!==s.attempt_id||typeof s.dismissed_at=="number")continue;let i=t.get(s.bead_id);typeof i=="number"&&i>0&&typeof s.finished_at=="number"&&i>=s.finished_at||o.set(s.bead_id,{attempt:s,run_state:s.status})}return o}function qu(e,t){let n=e[t];if(!n)return"";if(n.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let r=typeof n.reason=="string"?n.reason:"",o=r.indexOf(":");return o>0&&o<r.length-1?`\u26D4 ${r.slice(0,o)} (${r.slice(o+1)})`:`\u26D4 ${r}`}function at(e){return e&&typeof e=="object"?e:{}}function rg(e){let t=at(e).badge_codes;return Array.isArray(t)?t.filter(n=>typeof n=="string"&&n.length>0):[]}function og(e,t,n){let r=at(t);if(Object.keys(r).length===0)return null;let o=e.execution_defaults,s=e.runner_catalog,i=e.session_defaults;if(!o||!s||!i)return null;let l=g=>mn({pin:g,global:i,execution_defaults:o,runner_catalog:s,route:n}),a,u;try{a=l(r),u=l(null)}catch{return null}let d=Fu(Jr(a,s),Jr(u,s)),f=Fu($r(a,null),$r(u,null));return d||f?{orchestration:d,worker:f}:null}function Fu(e,t){return!e||t&&t.text===e.text?null:e}function sg(e,t,n){let o=(t&&typeof t=="object"&&Array.isArray(t.released_by)?t.released_by:[]).filter(i=>i&&typeof i=="object"&&typeof i.id=="string").slice().sort((i,l)=>(typeof l.closed_at=="number"?l.closed_at:0)-(typeof i.closed_at=="number"?i.closed_at:0)),s=[];for(let i of o){let l=Lu(e,i,n);l&&s.push(l)}return s.length===0?null:s}function Ia(e,t){return typeof e!="string"||e.length===0||typeof t!="string"||t.length===0||t===e?null:`\u2192 ${t}`}var ig=new Set(["quick_fix","spec_backed","full_plan"]);function ju(e){return typeof e=="string"&&ig.has(e)}function ag(e){let t={...at(e.session_defaults)};for(let n of["orchestration_model","orchestration_effort","orchestration_speed"]){let r=e[n];typeof r=="string"&&(t[n]=r)}return t}function lg(e,t,n){let r=e.runner_catalog??null,o=Oa(e,t,n,null);if(!o)return null;let s=xn(r,o.orchestration_model.value??""),i=s===null?o:Oa(e,t,n,s)||o,l=Jr(i,r),a=$r(i,s);return l||a?{orchestration:l,worker:a}:null}function Oa(e,t,n,r){let o=ju(n)?n:ju(t.route)?t.route:null;try{return mn({pin:t,global:ag(e),execution_defaults:e.execution_defaults??null,runner_catalog:e.runner_catalog??null,route:o,controller_runtime:r})}catch{return null}}function cg(e,t,n){return!t||!Object.hasOwn(t,"metadata")?null:$r(Oa(e,at(t.metadata),t.route,n),n)}function Ma(e,t){let n=new Set,r=e;for(;r&&!n.has(r.attempt_id);){if(r.conflict_resolution===!0)return!0;n.add(r.attempt_id),r=typeof r.resumed_from=="string"&&r.resumed_from.length>0&&t.get(r.resumed_from)||null}return!1}function ug(e){let t={};for(let l of Dn)t[l]=0;let n=!1,r=0,o=0,s=0;for(let l of e){let a=l.usage;if(!a||typeof a!="object")continue;let u=!1;for(let d of Dn)Number.isFinite(a[d])&&(t[d]+=a[d],n=!0,u=!0);u&&(o+=1,Number.isFinite(a.total_cost_usd)&&(r+=a.total_cost_usd,s+=1))}o>0&&s===o&&(t.total_cost_usd=r);let i=e.map(l=>l.usage).filter(l=>l&&typeof l=="object"&&l.providers);return i.length>0?en(Cs(i)):n?Hn(t):null}function Wu(e,t){let n=wa(e,t);return n==="internal"?"\uBBF8\uC801\uC7AC":n==="external"?"\uC678\uBD80":"\uC704\uCE58 \uBBF8\uD655\uC778"}function dg(e,t,n){let r=t.get(e);if(!r)return Wu(e,n);if(typeof r.position=="number"){if(r.lane==="parallel")return`#${r.position}`;if(/^s[1-5]$/.test(r.lane))return`${r.lane} #${r.position}`}return Co(r)}function pg(e,t,n,r){let o=t.get(e);if(!o)return{label:Wu(e,n),title:""};if(typeof o.position=="number"&&(o.lane==="parallel"||/^s[1-5]$/.test(o.lane))){let i=r.get(e),l=o.lane==="parallel"?"\uBCD1\uB82C":o.lane;return{label:i&&i.length>0?"\u{1F512} \uB300\uAE30":"\uB300\uAE30",title:`${o.workspace_name||o.root_dir} ${l} #${o.position}`}}return{label:o.state==="running"?"\u25B6 \uC2E4\uD589\uC911":Co(o),title:""}}function fg(e,t){for(let n of Object.values(e||{}))if(n&&n.attempt_id===t&&typeof n.armed_by_lane=="string"&&n.armed_by_lane.length>0)return n.armed_by_lane;return null}function _g(e,t,n,r,o,s){return t==="draft"?{state:"draft",badge:"draft",run_label:null,can_stop:!1}:n.some(i=>s.failed_by_bead.get(i.id)===e)?{state:"failed",badge:"\u26D4 \uC2E4\uD328",run_label:"\u25B6 \uB2E4\uC2DC \uC9C4\uD589",can_stop:!1}:s.disarmed_lanes.has(e)?{state:"restart",badge:"\u23F8 \uC7AC\uC2DC\uC791",run_label:"\u25B6 \uC9C4\uD589",can_stop:!1}:n.some(i=>s.armed_by_bead.get(i.id)===e)?{state:"running",badge:"\u25B6 \uC9C4\uD589 \uC911",run_label:o.length>0?"\u25B6 \uC774\uC5B4\uC11C \uC9C4\uD589":null,can_stop:!0}:r?{state:"all_done",badge:"\uBAA8\uB450 \uC644\uB8CC",run_label:null,can_stop:!1}:{state:"confirmed",badge:"\uD655\uC815",run_label:"\u25B6 \uC9C4\uD589",can_stop:!1}}function mg(e,t,n,r,o,s,i){let l=[];return e.forEach((a,u)=>{let d=typeof a.id=="string"?a.id:"";if(d.length===0)return;let f=a.status==="confirmed"?"confirmed":"draft",g=Array.isArray(a.entries)?a.entries:[],m=[];g.forEach((Y,J)=>{let X=Y&&typeof Y.bead_id=="string"?Y.bead_id:"";if(X.length===0)return;let F=Y&&typeof Y.root_dir=="string"?Y.root_dir:"",L=n.get(X),M=L?L.state:void 0,N=M==="running"||M==="pr_wait"||M==="done",W=!L||M==="runnable",re=L&&L.lane==="parallel"&&typeof L.position=="number"?L.position-1:null,q=pg(X,n,r,t),U=m.length>0?m[m.length-1].id:null,Q=f==="confirmed"&&U!==null&&!(t.get(X)||[]).includes(U);m.push({id:X,title:o.get(X)||X,root_dir:L?L.root_dir:F,workspace_name:L?L.workspace_name:s.get(F)||"",seq:J+1,location_label:q.label,location_title:q.title,draggable:!N,fixed:N,done:M==="done",unplaced:W,mismatch:Q,...re!==null?{queue_index:re}:{}})}),m.forEach((Y,J)=>{Y.seq=J+1});let $=m.length>0&&m.every(Y=>Y.done),O=m.filter(Y=>!Y.fixed&&i.armed_by_bead.get(Y.id)!==d).map(Y=>Y.id),B=_g(d,f,m,$,O,i);l.push({lane_id:d,status:f,draft:f==="draft",number:u+1,label:`\uC5F0\uACB0 ${u+1} \xB7 \uB808\uD3EC \uAC04`,rows:m,all_done:$,can_confirm:f==="draft"&&m.length>=2,has_mismatch:f==="confirmed"&&m.some(Y=>Y.mismatch||Y.unplaced),unlaunched:O,...B})}),l}function gg(e,t,n){if(e.lane==="runnable"){let i=n.get(e.id);return i?i.length===0?{scope:[],state:"missing"}:{scope:i,state:"declared"}:{scope:[],state:void 0}}let r=t.get(e.root_dir),o=r?r[e.id]:void 0;if(!o||!Array.isArray(o.scope))return{scope:[],state:void 0};let s=o.scope.filter(i=>typeof i=="string"&&i.length>0);return{scope:s,state:s.length===0?"missing":"declared"}}function hg(e,t,n,r,o){let s=new Map;for(let a of[...e.running,...e.queue,...e.runnable,...e.pr_wait]){if(!t.has(a.root_dir))continue;let u=`${a.root_dir}\0${a.id}`,d=s.get(u);if(d){d.cards.push(a);continue}let{scope:f,state:g}=gg(a,t,n);g!==void 0&&(a.scope_state=g),s.set(u,{cards:[a],scope:f})}let i=new Map;for(let a of s.values()){let u=a.cards[0].scope_state;if(u!==void 0)for(let g of a.cards)g.scope_state=u;if(a.scope.length===0)continue;let d=a.cards[0].root_dir,f=i.get(d);f?f.push(a):i.set(d,[a])}let l=(a,u,d)=>{let f=u.cards[0],g={id:f.id,title:f.title,location_label:dg(f.id,r,o),prefixes:d,...typeof f.root_dir=="string"&&f.root_dir.length>0?{root_dir:f.root_dir}:{}};for(let m of a.cards)m.overlap_chips?m.overlap_chips.push(g):m.overlap_chips=[g]};for(let a of i.values())for(let u=0;u<a.length;u+=1)for(let d=u+1;d<a.length;d+=1){let f=Fs(a[u].scope,a[d].scope);f.length!==0&&(l(a[u],a[d],f),l(a[d],a[u],f))}}function Bu(e,t,n){let r=n?n.get(t)?.root_dir:void 0,o=!Un(e.id,t),s=typeof e.root_dir=="string"?e.root_dir:"",i=typeof r=="string"&&r.length>0?r:o&&s.length>0?s:"";return i.length>0?{openable:!0,root_dir:i}:o?{openable:!0}:{}}function bg(e,t,n,r){let o=new Set(e?e.ids:[]);for(let l of t&&Array.isArray(t.ids)?t.ids:[])typeof l=="string"&&l.length>0&&o.add(l);if(o.size===0)return{ids:[]};let s={},i={...e?e.root_dirs:{},...t&&t.root_dirs&&typeof t.root_dirs=="object"?t.root_dirs:{}};for(let l of o){let a=i[l];if(typeof a=="string"&&a.length>0){s[l]=a;continue}if(!Un(n.id,l)){n.root_dir.length>0&&(s[l]=n.root_dir);continue}let u=r.get(l)?.root_dir;typeof u=="string"&&u.length>0&&(s[l]=u)}return{ids:[...o],root_dirs:s}}function Ra(e){if(typeof e=="number")return Number.isFinite(e)?e:null;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:null}return null}function oi(e){if(typeof e=="number"&&Number.isFinite(e))return e;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:0}return 0}function lr(e,t,n){let r=Array.isArray(e)?e:[],o=Array.isArray(t)?t:[],s=n&&typeof n.done_since=="number"?n.done_since:void 0,i={...no,...n&&n.candidate_filter?n.candidate_filter:{}},l=n&&Object.hasOwn(n,"cross_lanes")?n.cross_lanes??null:void 0,a=n&&n.candidate_sort==="as_given"?"as_given":n&&Mo.some(w=>w.value===n.candidate_sort)?n.candidate_sort:"repo_spec",u=n&&n.groups==="all"?"all":"nonempty",d=n&&n.candidate_hidden_counts==="per_control"?"per_control":"sequential",f=Date.now(),g=new Map;for(let w of o)w&&typeof w.root_dir=="string"&&g.set(w.root_dir,w);let m=new Map;for(let w of o)w&&typeof w.root_dir=="string"&&m.set(w.root_dir,w.name||w.root_dir);for(let w of r)w&&typeof w.root_dir=="string"&&m.set(w.root_dir,w.name||w.root_dir);let $=[],O=[],B=[],Y=[],J=[],X=[],F=new Map,L=new Map,M=new Map,N=new Map,W=new Map,re=new Map,q=new Map,U=new Map,Q=new Map,ne=new Map,we=new Map,ve=new Map,le=new Map,D=new Set,$e=new Map,Ae=new Map,T=new Map;for(let w of r){if(!w||typeof w.root_dir!="string")continue;let H=w.root_dir,Ce=w.name||H,Ee=g.get(H),je=Ee&&typeof Ee.revision=="number"?Ee.revision:typeof w.revision=="number"?w.revision:0,Xe=at(w.attempts),dt=at(w.bead_titles);for(let[p,_]of Object.entries(dt))typeof _=="string"&&_.length>0&&T.set(p,_);let xt=at(w.bead_times),Ct=at(w.pr_observations),St=at(w.admission),mt=at(w.revise_parked),ut=at(w.merge_queue_state),vt=at(w.cleanup_failed),Rt=at(w.discard_operations),Je=at(w.bead_timelines),b=at(w.bead_blocked_by);Object.hasOwn(w,"bead_scope")&&$e.set(H,at(w.bead_scope));let S=at(w.bead_workflow),te=at(w.pr_activity),ee=Array.isArray(w.repo_operations)?w.repo_operations:[];U.set(H,ee);let _e=typeof w.declared_base=="string"?w.declared_base:null;q.set(H,_e),re.set(H,Object.entries(vt).map(([p,_])=>({bead_id:p,step:_&&_.step?_.step:"",reason:_&&_.reason?_.reason:"",at:_&&typeof _.at=="number"?_.at:null,detail:_&&typeof _.detail=="string"?_.detail:null,output_tail:_&&typeof _.output_tail=="string"&&_.output_tail?_.output_tail:void 0,log_path:_&&typeof _.log_path=="string"&&_.log_path?_.log_path:void 0,retry_count:_&&typeof _.retry_count=="number"&&Number.isInteger(_.retry_count)&&_.retry_count>0?_.retry_count:0,failure_code:_&&typeof _.failure_code=="string"?_.failure_code:void 0})));for(let[p,_]of Object.entries(at(w.bead_overlay)))_&&typeof _=="object"&&Q.set(`${H}\0${p}`,_);let Ue=new Map;for(let p of Object.values(Xe))p&&typeof p.attempt_id=="string"&&Ue.set(p.attempt_id,p);let Se=Array.isArray(w.merge_queue)?w.merge_queue:[],Ne=new Set(Se.filter(p=>p&&typeof p.bead_id=="string").map(p=>p.bead_id)),Ze=new Map(Se.filter(p=>p&&typeof p.bead_id=="string").map(p=>[p.bead_id,p])),_t=new Map,Be=new Map,ft=new Map,qt=new Map;Se.forEach((p,_)=>{p&&typeof p.bead_id=="string"&&(_t.set(p.bead_id,_+1),Be.set(p.bead_id,p.resolution),ft.set(p.bead_id,p.continuation_action||null),qt.set(p.bead_id,p.authority||null))});let Ft=at(w.auto_merge_skips),Xt=p=>{let _=Ft[p];if(!_)return null;let E=at(at(Ct[p]).pr).head_sha;return E&&E===_.head_sha?_.reason||"":null};W.set(H,{positions:_t,resolutions:Be,continuations:ft,authorities:qt,state:{active:typeof ut.active=="string"?ut.active:null,failures:at(ut.failures),waiting:ut.waiting&&typeof ut.waiting.bead_id=="string"&&typeof ut.waiting.reason=="string"?ut.waiting:null},auto_excluded:(Array.isArray(w.pr_wait)?w.pr_wait:[]).map(p=>p&&p.bead_id).filter(p=>typeof p=="string"&&Xt(p)!==null),running:Se.length>0});let kt=Array.isArray(w.queue)?w.queue:[];for(let p of[...kt,...Array.isArray(w.pr_wait)?w.pr_wait:[]])p&&typeof p.bead_id=="string"&&typeof p.armed_by_lane=="string"&&p.armed_by_lane.length>0&&ve.set(p.bead_id,p.armed_by_lane);for(let p of Array.isArray(w.disarmed_on_load)?w.disarmed_on_load:[])typeof p=="string"&&p.length>0&&D.add(p);let et=(Array.isArray(w.serial_lanes)?w.serial_lanes:[]).filter(p=>p&&/^s[1-5]$/.test(p.id)&&Array.isArray(p.entries)),Pt=at(w.lane_states),Qt=typeof w.serial_lane_count=="number"?Math.max(0,Math.min(5,Math.floor(w.serial_lane_count))):Math.min(5,et.length);M.set(H,Qt),N.set(H,kt.length);let tn=new Map(et.map(p=>[p.id,p])),zt=new Map;for(let p of et)for(let _ of p.entries)_&&typeof _.bead_id=="string"&&zt.set(_.bead_id,p.id);for(let[p,_]of Object.entries(at(w.bead_dependents))){let E=Array.isArray(_?.ids)?_.ids:[],G=at(_?.root_dirs),K=we.get(p)||{ids:new Set,root_dirs:{}};for(let se of E)typeof se=="string"&&se.length>0&&K.ids.add(se);for(let[se,xe]of Object.entries(G))typeof xe=="string"&&xe.length>0&&(K.root_dirs[se]=xe);we.set(p,K)}for(let[p,_]of Object.entries(b))Array.isArray(_)&&ne.set(p,_.filter(E=>typeof E=="string"&&E.length>0));let jt=Array.isArray(w.done)?w.done:[];for(let p of jt)p&&typeof p.bead_id=="string"&&X.push({id:p.bead_id,root_dir:H,workspace_name:Ce});let un=new Map;for(let p of jt)p&&typeof p.bead_id=="string"&&typeof p.added_at=="number"&&un.set(p.bead_id,p.added_at);let Mt=p=>({id:p,title:dt[p]||p,root_dir:H,workspace_name:Ce,expected_revision:je,draggable:!1,...at(xt[p]).created_at?{created_at:at(xt[p]).created_at}:{},...at(xt[p]).updated_at?{updated_at:at(xt[p]).updated_at}:{}}),Kt=p=>{let _=S[p]?.chips?.pr;return _&&typeof _.number=="number"&&typeof _.url=="string"?{pr_number:_.number,pr_url:_.url}:{}},Bt=p=>Object.hasOwn(b,p)?{blocked_by:Array.isArray(b[p])?b[p].filter(_=>typeof _=="string"&&_.length>0):[]}:{},Zt=(p,_)=>{let E=Bt(p),G=(_?.blockers||[]).map(se=>se.id);if(G.length===0)return E;let K=[...E.blocked_by||[]];for(let se of G)K.includes(se)||K.push(se);return{blocked_by:K}},pe=new Set;for(let[p,_]of Zm(Xe,un,{discard_operations:Rt,observations:Ct,bead_timelines:Je})){pe.add(p);let E=_.run_state==="failed"?fg(Xe,_.attempt_id):null;E!==null&&le.set(p,E);let G=Ue.get(_.attempt_id)||null,K=Q.get(`${H}\0${p}`),se=K&&K.rollup?K.rollup:null,xe=Ia(_e,G?G.target_base:null),Ke=G?Ma(G,Ue):!1,ot=G&&G.quickfix_lane===!0&&G.quickfix_landing&&typeof G.quickfix_landing=="object"?G.quickfix_landing:null,yt=ot&&typeof ot.reason=="string"&&ot.reason.length>0?ot.reason:null,gt=ot?Io({bead_id:p,merge_sha:ot.head_sha,cleanup_cursor:ot.cursor,cleanup_failed:yt?{step:ot.cursor,reason:yt}:null,repo_operations:ee}):null;O.push({...Mt(p),lane:"running",...Zt(p,_.wait),...zt.has(p)?{serial_lane_id:zt.get(p)}:{},attempt_id:_.attempt_id,run_state:_.run_state,status:_.status||void 0,workflow:S[p]||null,can_pause:_.can_pause,can_resume:_.can_resume,started_at:_.started_at,last_event_at:_.last_event_at,last_activity:_.last_activity,legs:_.legs,runner:_.runner,model:_.model,effort:_.effort,speed:_.speed,resumed_from:_.resumed_from,continuation_mode:_.continuation_mode,usage:_.usage,failure:_.failure||null,wait:_.wait||null,retry:_.retry||null,exec_chips:{orchestration:ha(_),worker:cg(at(Ee),K,_.runner||null)},discard:Vn(Rt,p,{attempt_id:_.attempt_id,merged:_.failure?.confirmation==="merged"||at(Ct[p]).pr?.state==="MERGED"}),...se?{rollup:se}:{},...Ke?{conflict_resolution:!0}:{},...xe?{base_exception:xe}:{},...gt?{landing:gt}:{},badges:_.run_state==="paused"?["\u23F8 \uC77C\uC2DC\uC815\uC9C0"]:_.run_state==="failed"?["\u26A0 \uC2E4\uD328"]:_.run_state==="parked"?["\u23F8 \uC138\uC158 \uB300\uAE30"]:_.run_state==="retry_wait"?["\u21BB \uC7AC\uC2DC\uB3C4 \uB300\uAE30"]:_.run_state==="waiting"?["\u26D3 \uC120\uD589 \uB300\uAE30"]:[],alert:_.run_state==="failed"})}for(let[p,_]of Hc(Xe)){if(O.some(G=>G.id===p))continue;let E=_.attempt;O.push({...Mt(p),lane:"running",kind:"session",...Bt(p),attempt_id:typeof E.attempt_id=="string"?E.attempt_id:"",run_state:"running",status:"running",non_occupying:!0,workflow:S[p]||null,can_pause:!1,can_resume:!1,started_at:_.started_at,last_event_at:typeof E.last_event_at=="number"?E.last_event_at:null,last_activity:E.last_activity&&typeof E.last_activity=="object"?E.last_activity:null,legs:Array.isArray(E.legs)?E.legs:[],runner:typeof E.runner=="string"?E.runner:null,model:typeof E.model=="string"?E.model:null,effort:typeof E.effort=="string"?E.effort:null,speed:typeof E.speed=="string"?E.speed:null,resumed_from:null,continuation_mode:null,usage:E.usage&&typeof E.usage=="object"?E.usage:null,exec_chips:{orchestration:ha(E),worker:null},discard:Vn(Rt,p,{merge_queued:!0}),badges:[_.origin==="auto"?"\uB9AC\uBDF0 \xB7 \uC790\uB3D9":"\uB9AC\uBDF0"],alert:!1})}for(let p of Array.isArray(w.session_active)?w.session_active:[]){let _=p&&p.bead_id;typeof _!="string"||pe.has(_)||(pe.add(_),Array.isArray(p.blocked_by)&&p.blocked_by.length>0&&ne.set(_,p.blocked_by.filter(E=>typeof E=="string"&&E.length>0)),typeof p.title=="string"&&p.title.length>0&&T.set(_,p.title),O.push({...Mt(_),title:p.title||dt[_]||_,lane:"running",kind:"session",status:"in_progress",started_at:Ra(p.started_at)??Ra(p.updated_at)??void 0,updated_at:Ra(p.updated_at)??void 0,workflow:p.workflow||null,labels:Array.isArray(p.labels)?p.labels:[],spec_id:typeof p.spec_id=="string"?p.spec_id:"",blocked:p.blocked===!0,...Array.isArray(p.blocked_by)?{blocked_by:p.blocked_by.filter(E=>typeof E=="string"&&E.length>0)}:{},draggable:!1,can_pause:!1,can_resume:!1,exec_chips:null,usage:null,legs:[],last_activity:null,session_refs:Array.isArray(p.session_refs)?p.session_refs:[],badges:[],alert:!1}))}for(let p of Array.isArray(w.pr_wait)?w.pr_wait:[]){let _=p&&p.bead_id;if(typeof _!="string"||pe.has(_))continue;pe.add(_);let E=at(Ct[_]),G=at(E.pr),K=E.gate?at(E.gate):null,se=Ne.has(_),xe=Ze.get(_)?.continuation_action||null,Ke=!!xe&&xe.continuation===null,ot=ut.active===_,yt=p.external===!0,gt=vt[_]||null,x=at(te[_]),A=Io({bead_id:_,merge_sha:p.merge_sha,cleanup_cursor:p.cleanup_cursor,merge_progress:x.merge_progress||null,cleanup_failed:gt,repo_operations:ee}),Ie=ri(A),qe=!!K&&K.base_badge==="\uCDA9\uB3CC",h=!!gt&&["child_sweep","branch_cleanup","parent_close"].includes(gt.step)&&!!K&&K.tier==="merged",v=yt&&!!gt&&!!K&&K.tier==="merged",R=!!K&&["closed_unmerged","review","undecidable"].includes(K.tier),ae=Vn(Rt,_,{external:yt,merge_active:ot||A?.step==="merge",merge_queued:se,cleanup_active:Ie,merged:!!gt||K?.tier==="merged"}),he=!!ae.operation,Le=rg(E.receipt_check);B.push({...Mt(_),lane:"pr_wait",...Bt(_),...Le.length>0?{receipt_badge:{codes:Le}}:{},workflow:S[_]||null,pr_number:typeof G.number=="number"?G.number:null,pr_url:typeof G.url=="string"?G.url:void 0,external:yt,usage:Gn(Xe,_),merge_step:A,badges:Ke?["\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694"]:A?[K?.tier==="merged"?"\uBA38\uC9C0\uB428":"\uBA38\uC9C0 \uC911"]:gt?[Sr(gt.step)?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${Sr(gt.step)}`:"\uC815\uB9AC \uBA48\uCDA4"]:typeof K?.gate_badge=="string"&&K.gate_badge.length>0?[K.gate_badge]:[],alert:A?A.failed===!0:!!gt||R,reason:gt&&A?.active!==!0?ni(gt.step):"PR \uB300\uAE30",merge_action:K?.tier==="merged"&&!h&&!v?!1:!se||Ke,merge_enabled:!he&&(Ke||K?.enabled===!0||qe||h||v),merge_label:Ke?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":v||h?"\uC815\uB9AC \uC7AC\uAC1C":qe&&!h?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":void 0,merge_title:Ke?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":he?ae.error?`\uD3D0\uAE30 \uC2E4\uD328: ${ae.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${ae.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:v?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD569\uB2C8\uB2E4":h?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uC7AC\uAC1C\uD569\uB2C8\uB2E4":qe?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":K?.enabled===!0?`\uBA38\uC9C0 (${K.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4`:`\uBA38\uC9C0 \uBD88\uAC00: ${K?.reason||"\uAD00\uCE21 \uB300\uAE30"}`,cancel_action:se&&!Ke,cancel_enabled:!ot,continuation_mismatch:xe?.mismatch||null,discard:ae,discard_action:ae.action,discard_enabled:ae.enabled,discard_title:ae.title})}let C=(p,_,E,G)=>{let K=p&&p.bead_id;if(typeof K!="string"||pe.has(K))return null;pe.add(K);let se=mt[K],xe=Vn(Rt,K),Ke=xe.operation?xe:null,ot={...Mt(K),lane:_,workflow:S[K]||null,draggable:!Ke,discard:Ke||void 0,reason:qu(St,K),seq:E+1,queue_position:E+1,queue_index:E,queue_length:G,badges:se?["\u23F8 REVISE \uD30C\uD0B9"]:[],alert:!!se,revise_action:!!se,revise_enabled:!!se&&!Ke,revise_title:se?se.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${se.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":""},yt=Bt(K);return Object.hasOwn(yt,"blocked_by")&&(ot.blocked_by=yt.blocked_by),ot};for(let p=0;p<kt.length;p++){let _=C(kt[p],"queue",p,kt.length);if(!_)continue;Y.push(_);let E=F.get(H);E?E.push(_):F.set(H,[_])}let ge=p=>{let _=B.find(se=>se.id===p&&se.root_dir===H);if(_)return{id:p,title:_.title,badge:"PR \uB300\uAE30 \xB7 \uC810\uC720"};let E=O.find(se=>se.id===p&&se.root_dir===H),G=E?E.run_state:Xm(Xe,p),K=G==="failed"||G==="orphaned"?"\uC2E4\uD328 \xB7 \uC810\uC720 \uC720\uC9C0":G==="paused"?"\uC77C\uC2DC\uC815\uC9C0 \xB7 \uC810\uC720":"\uC2E4\uD589 \uC911 \xB7 \uC810\uC720";return{id:p,title:E?E.title:Mt(p).title,badge:K}},ue=[];for(let p=0;p<Math.max(Qt,et.length);p++){let _=`s${p+1}`,E=tn.get(_),G=E&&Array.isArray(E.entries)?E.entries:[],K=at(Pt[_]),se=Array.isArray(K.occupied_by)?K.occupied_by.filter(ot=>typeof ot=="string"):[],xe=new Set(se),Ke=[];for(let ot=0;ot<G.length;ot++){let yt=G[ot]&&G[ot].bead_id;if(typeof yt=="string"&&xe.has(yt)){pe.add(yt);continue}let gt=C(G[ot],_,ot,G.length);gt&&(Ke.push(gt),Y.push(gt))}Ke.length===0&&se.length===0&&(Qt<=1||p>=Qt)||ue.push({id:_,index:p,items:Ke,raw_length:G.length,occupied_by:se,occupants:se.map(ot=>ge(ot)),corrections:Array.isArray(K.corrections)?K.corrections.length:0,cycle:K.cycle===!0,...Ke.length===0&&se.length===0?{empty:!0}:{}})}L.set(H,ue);let y=Array.from({length:Qt},(p,_)=>{let E=`s${_+1}`,G=tn.get(E),K=G&&Array.isArray(G.entries)?G.entries:[],se=at(Pt[E]);return{id:E,index:K.length,length:K.length,occupied_by:Array.isArray(se.occupied_by)?se.occupied_by.filter(xe=>typeof xe=="string"):[]}});for(let p of Array.isArray(w.runnable)?w.runnable:[]){let _=p&&p.bead_id;if(typeof _!="string"||pe.has(_))continue;pe.add(_);let E=p.workflow&&typeof p.workflow=="object"?p.workflow:null,G=E&&typeof E.route=="string"&&E.route||(typeof p.route=="string"?p.route:null),K=og(at(Ee),p.exec_pins,G),se=To(p.rec,p.exec_pins);Array.isArray(p.blocked_by)&&p.blocked_by.length>0&&ne.set(_,p.blocked_by.filter(A=>typeof A=="string"&&A.length>0)),typeof p.title=="string"&&p.title.length>0&&T.set(_,p.title),Array.isArray(p.scope)&&Ae.set(_,p.scope.filter(A=>typeof A=="string"&&A.length>0));let xe=p.eligible!==!1,Ke=p.worker_ineligible===!0,ot=Object.hasOwn(p,"eligible"),yt=[];typeof p.reason=="string"&&p.reason.length>0&&yt.push(p.reason);let gt=qu(St,_);gt&&yt.push(gt);let x=sg(_,p.release_info,f)?.map(A=>({...A,...Bu({id:_,root_dir:H},A.id)}));$.push({...Mt(_),title:p.title||dt[_]||_,lane:"runnable",draggable:!ot,queue_placeable:xe&&!Ke,...Ke?{worker_ineligible:!0}:{},...p.session_preferred===!0?{session_preferred:!0,session_preferred_reason:typeof p.session_preferred_reason=="string"?p.session_preferred_reason:""}:{},...p.spec_after_blocker===!0?{spec_after_blocker:!0}:{},...x?{dependency_chips:{released:x}}:{},...p.dependents_info&&typeof p.dependents_info=="object"?{dependents_info:p.dependents_info}:{},reason:yt.join(" \xB7 "),created_at:p.created_at??void 0,updated_at:p.updated_at??void 0,status:typeof p.status=="string"?p.status:void 0,labels:Array.isArray(p.labels)?p.labels:[],spec_id:typeof p.spec_id=="string"?p.spec_id:"",published:p.published===!0,workflow:E||(G?{route:G,chips:{route:G}}:null),...K?{exec_chips:K}:{},...se?{rec:se}:{},blocked:p.blocked===!0,...Array.isArray(p.blocked_by)?{blocked_by:p.blocked_by.filter(A=>typeof A=="string"&&A.length>0)}:{},place_index:kt.length,place_lanes:y})}for(let p of jt){let _=p&&p.bead_id;if(typeof _!="string"||pe.has(_)||(pe.add(_),s!==void 0&&typeof p.added_at=="number"&&p.added_at<s))continue;let E=Qm(Xe,_),G=E&&typeof E.done_kind=="string"?E.done_kind:null;J.push({...Mt(_),lane:"done",done:!0,done_layout:"three_line",usage:Gn(Xe,_),work_ms:wu(Xe,_),done_at:typeof p.added_at=="number"?p.added_at:void 0,done_kind:G,...Kt(_),badges:[...G&&Pu[G]?[Pu[G]]:[],...yu(Xe,_)]})}for(let p of Array.isArray(w.session_done)?w.session_done:[]){let _=p&&(p.id||p.bead_id);typeof _!="string"||pe.has(_)||(pe.add(_),J.push({...Mt(_),...p,id:_,root_dir:H,workspace_name:Ce,expected_revision:je,lane:"done",done:!0}))}}if(Q.size>0)for(let w of[...$,...Y,...O,...B,...J]){let H=Q.get(`${w.root_dir}\0${w.id}`);if(!H||(typeof H.priority=="number"&&(w.priority=H.priority),typeof H.from_id=="string"&&H.from_id.length>0&&(w.from_id=H.from_id),!Object.hasOwn(H,"metadata")))continue;let Ce=at(H.metadata);if(w.rec=To(Ce),w.lane==="runnable"||w.lane.startsWith("s")||w.lane==="queue"){let Ee=lg(at(g.get(w.root_dir)),Ce,typeof H.route=="string"&&H.route.length>0?H.route:at(w.workflow).route);Ee&&(w.exec_chips=Ee)}}let Z=new Map;o.forEach((w,H)=>{w&&typeof w.root_dir=="string"&&Z.set(w.root_dir,H)});let Re=n&&n.running_sort==="repo"?"repo":"started";O.sort((w,H)=>{let Ce=w.kind==="session",Ee=H.kind==="session";if(Ce!==Ee)return Ce?1:-1;if(Ce&&Ee){let dt=oi(H.updated_at)-oi(w.updated_at);return dt!==0?dt:w.id.localeCompare(H.id)}if(Re==="repo"){let dt=Z.get(w.root_dir)??Number.MAX_SAFE_INTEGER,xt=Z.get(H.root_dir)??Number.MAX_SAFE_INTEGER;if(dt!==xt)return dt-xt}let je=typeof w.started_at=="number"&&Number.isFinite(w.started_at)?w.started_at:null,Xe=typeof H.started_at=="number"&&Number.isFinite(H.started_at)?H.started_at:null;return je!==null&&Xe!==null&&je!==Xe?je-Xe:je===null&&Xe!==null?1:je!==null&&Xe===null?-1:w.id.localeCompare(H.id)}),J.sort((w,H)=>(H.done_at??0)-(w.done_at??0));let fe=o.length>0?o:r.map(w=>({root_dir:w&&w.root_dir,name:w&&w.name,auto_advance:w&&w.auto_advance,auto_merge:w&&w.auto_merge,slots:w&&w.slots,revision:w&&w.revision,runner_catalog:w&&w.runner_catalog})),Te=new Set($.map(w=>w.root_dir)),me=new Map;for(let w of O)w.kind==="session"||w.run_state!=="running"||me.set(w.root_dir,(me.get(w.root_dir)||0)+1);let Oe=new Map;for(let w of J){let H=Oe.get(w.root_dir);H?H.push(w):Oe.set(w.root_dir,[w])}let it={positions:new Map,resolutions:new Map,continuations:new Map,authorities:new Map,state:{active:null,failures:{},waiting:null},auto_excluded:[],running:!1},Ge=[];for(let w of fe){if(!w||typeof w.root_dir!="string")continue;let H=F.get(w.root_dir)||[],Ce=L.get(w.root_dir)||[],Ee=H.length>0||Ce.some(dt=>dt.items.length>0||dt.occupied_by.length>0);if(u!=="all"&&!Ee&&!Te.has(w.root_dir))continue;let je=typeof w.slots=="number"&&w.slots>=si?w.slots:si,Xe=me.get(w.root_dir)||0;Ge.push({live_count:Xe,over_cap:Xe>je,merge:W.get(w.root_dir)||it,token_total:ug(Oe.get(w.root_dir)||[]),cleanup_failures:re.get(w.root_dir)||[],declared_base:q.get(w.root_dir)??null,repo_operations:U.get(w.root_dir)||[],root_dir:w.root_dir,name:w.name||w.root_dir,auto_advance:w.auto_advance===!0,auto_merge:w.auto_merge===!0,slots:je,revision:typeof w.revision=="number"?w.revision:0,runner_catalog:at(w.runner_catalog),items:H,sublanes:{parallel:H,serial:Ce},serial_lane_count:M.get(w.root_dir)||0,raw_queue_length:N.get(w.root_dir)||0})}let I={runnable:$,runnable_all:$,runnable_hidden:{blocked:0,spec:0},runnable_sections:[],runnable_flat:a==="updated_flat"||a==="as_given",queue:Y,queue_groups:Ge,running:O,pr_wait:B,done:J,parallel_rows:[],chain_lanes:[],cross_lanes_revision:l&&typeof l.revision=="number"?l.revision:null,cross_lanes_unreadable:l===null,parallel_raw_length:Object.fromEntries(N),owner_of:{}},oe=pu(I);for(let w of X)oe.has(w.id)||oe.set(w.id,{root_dir:w.root_dir,workspace_name:w.workspace_name,lane:"done",state:"done"});for(let w of[...I.queue,...I.runnable,...I.running,...I.pr_wait]){if(!Object.hasOwn(w,"blocked_by"))continue;let H=oe.get(w.id);w.blockers=(w.blocked_by||[]).map(Ce=>fu(Ce,H,oe,o))}for(let w of[...I.queue,...I.runnable,...I.running,...I.pr_wait]){let H=(w.blockers||[]).map(je=>({...Ca(w.id,je),...Bu(w,je.id,oe)})),Ce=Iu(w.id,bg(we.get(w.id),w.dependents_info,w,oe));if(H.length===0&&Ce.length===0)continue;let Ee={...w.dependency_chips||{},...H.length>0?{predecessors:H}:{},...Ce.length>0?{dependents:Ce}:{}};w.dependency_chips=Ee}hg(I,$e,Ae,oe,o);let ie=_u(I.queue_groups);for(let w of I.queue_groups)for(let H of w.sublanes.serial){let Ce=ie.get(mu(w.root_dir,H.id));Ce&&(H.cross_wait_peers=Ce)}I.chain_lanes=mg(l&&Array.isArray(l.lanes)?l.lanes:[],ne,oe,o,T,m,{armed_by_bead:ve,failed_by_bead:le,disarmed_lanes:D});let de=new Map;for(let w of[...I.queue,...I.runnable])de.has(w.id)||de.set(w.id,w);let be=new Set;for(let w of I.chain_lanes)for(let H of w.rows){if(w.status==="confirmed"&&!H.unplaced&&!H.fixed&&be.add(H.id),!w.draft&&!H.unplaced)continue;let Ce=de.get(H.id);Ce&&(Ce.cross_lane_chip={lane_id:w.lane_id,number:w.number,status:w.status,label:w.draft?`\uC5F0\uACB0 ${w.number} (draft)`:`\uC5F0\uACB0 ${w.number}`})}let ce=new Map(I.chain_lanes.map(w=>[w.lane_id,w.number]));for(let w of[...I.queue,...I.running]){let H=ve.get(w.id);if(typeof H!="string"||H.length===0)continue;let Ce=ce.get(H);w.armed_lane_chip=Ce===void 0?{lane_id:H,label:"\u25B6 \uC9C4\uD589 \uC911 \xB7 \uB808\uC778 \uC5C6\uC74C",orphan:!0}:{lane_id:H,label:`\u25B6 \uC5F0\uACB0 ${Ce}`,orphan:!1}}let Fe=[];for(let w of F.values())for(let H of w)be.has(H.id)||Fe.push(H);Fe.sort((w,H)=>{let Ce=w.workspace_name.localeCompare(H.workspace_name);return Ce!==0?Ce:(w.queue_index??0)-(H.queue_index??0)}),I.parallel_rows=Fe;let ze={};for(let[w,H]of oe)typeof H.root_dir=="string"&&H.root_dir.length>0&&(ze[w]=H.root_dir);for(let w of I.chain_lanes)for(let H of w.rows)!Object.hasOwn(ze,H.id)&&H.root_dir.length>0&&m.has(H.root_dir)&&(ze[H.id]=H.root_dir);I.owner_of=ze;let Ve=I.runnable.length;I.runnable_all=I.runnable.slice();let Pe=I.runnable,V=w=>i.show_blocked||w.blocked!==!0,j=w=>i.spec==="all"||(i.spec==="with"?w.published===!0:w.published!==!0);if(d==="per_control"){let w=[],H=0,Ce=0;for(let Ee of Pe){let je=V(Ee),Xe=j(Ee);je&&Xe?w.push(Ee):!je&&Xe?H+=1:je&&!Xe&&(Ce+=1)}Pe=w,I.runnable_hidden={blocked:H,spec:Ce}}else{Pe=Pe.filter(V);let w=Pe.length;Pe=Pe.filter(j),I.runnable_hidden={blocked:Ve-w,spec:w-Pe.length}}let De=(w,H)=>{let Ce=oi(H.updated_at)-oi(w.updated_at);return Ce!==0?Ce:w.id.localeCompare(H.id)},Qe=a==="repo_spec"?(w,H)=>{let Ce=w.published===!0?0:1,Ee=H.published===!0?0:1;return Ce!==Ee?Ce-Ee:De(w,H)}:De;if(a==="as_given")I.runnable=Pe,I.runnable_sections=[];else if(a==="updated_flat")I.runnable=Pe.slice().sort(De),I.runnable_sections=[];else{let w=new Map;for(let Ee of Pe){let je=w.get(Ee.root_dir);je?je.push(Ee):w.set(Ee.root_dir,[Ee])}let H=[],Ce=[];for(let Ee of fe){if(!Ee||typeof Ee.root_dir!="string")continue;let je=(w.get(Ee.root_dir)||[]).slice().sort(Qe);w.delete(Ee.root_dir),je.length!==0&&(H.push({root_dir:Ee.root_dir,name:Ee.name||Ee.root_dir,items:je.map(Xe=>({...Xe,workspace_name:""}))}),Ce.push(...je))}for(let[Ee,je]of w){let Xe=je.slice().sort(Qe);H.push({root_dir:Ee,name:Xe[0]?.workspace_name||Ee,items:Xe.map(dt=>({...dt,workspace_name:""}))}),Ce.push(...Xe)}I.runnable=Ce,I.runnable_sections=H}return I}function zu(e,t){let n=new Map(e.map((a,u)=>[a,u])),r=new Map(e.map(a=>[a,new Set]));for(let a of t)a.blocker!==a.blockee&&n.has(a.blocker)&&n.has(a.blockee)&&r.get(a.blockee).add(a.blocker);let o=new Set,s=[];for(;s.length<e.length;){let a=e.find(u=>{if(o.has(u))return!1;for(let d of r.get(u))if(!o.has(d))return!1;return!0});if(a===void 0)return{order:[...e],corrections:[],cycle:!0};o.add(a),s.push(a)}let i=[],l=new Map(s.map((a,u)=>[a,u]));for(let a of s){let u=null;for(let d of r.get(a)){let f=Number(n.get(a))<Number(n.get(d)),g=Number(l.get(a))>Number(l.get(d));f&&g&&(u===null||Number(l.get(d))>Number(l.get(u)))&&(u=d)}u!==null&&i.push({bead_id:a,after:u})}return{order:s,corrections:i,cycle:!1}}var yg="\uB2E4\uB978 \uB808\uD3EC \uC774\uC288\uB294 \uC774 \uC9C1\uB82C \uB808\uC778\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",ai="\uC758\uC874 \uC790\uB8CC \uBBF8\uD655\uC815 \u2014 \uAD50\uC815 \uBCF4\uB958",vg="Worker \uD0ED \uC9C1\uB82C \uB808\uC778\uC5D0\uC11C \uBA3C\uC800 \uBE7C \uC8FC\uC138\uC694",wg="\uC774\uBBF8 \uC9C4\uD589 \uC911\uC778 \uC774\uC288 \uC55E\uC5D0\uB294 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",ro="\uC5F0\uACB0 \uB808\uC778\uC774 \uC5C6\uC2B5\uB2C8\uB2E4";function Po(e,t){return`${e}\0${t}`}function kg(e,t){let n=new Set(e),r=new Map;for(let o of e){let s=t.placed_members.has(o)?t.snapshot_blocked_by:t.runnable_blocked_by,i=s instanceof Map?s.get(o):void 0;if(!Array.isArray(i))return null;r.set(o,i.filter(l=>l!==o&&n.has(l)))}return r}function $g(e,t){if(e.status!=="confirmed")return 0;let n=-1;return e.entries.forEach((r,o)=>{t.fixed_members.has(r.bead_id)&&(n=o)}),n+1}function qo(e,t){let n=e.entries,r=n.map(f=>f.bead_id),o=kg(r,t);if(o===null)return{entries:n,corrections:[],cycle:!1,held:!0,mismatched:[]};let s=[];for(let[f,g]of o)for(let m of g)s.push({blocker:m,blockee:f});let i=$g(e,t),l=new Map(r.map((f,g)=>[f,g])),a=r.slice(0,i).filter(f=>o.get(f).some(g=>Number(l.get(g))>Number(l.get(f)))),u=zu(r.slice(i),s);if(u.cycle)return{entries:n,corrections:[],cycle:!0,held:!1,mismatched:a};let d=new Map(n.map(f=>[f.bead_id,f]));return{entries:[...n.slice(0,i),...u.order.map(f=>d.get(f))],corrections:u.corrections,cycle:!1,held:!1,mismatched:a}}function Hu(e,t){let n=t.cross_lanes.get(e);return n===void 0?null:qo(n,t)}function xg(e,t){if(!(t.corrections.length===0&&!t.cycle&&!t.held&&t.mismatched.length===0))return{lane_id:e,corrected:t.corrections.length,cycle:t.cycle,held:t.held,mismatched:t.mismatched}}function Ag(e){return`${e}\uC758 \uB808\uD3EC\uB97C \uC54C \uC218 \uC5C6\uC5B4 \uC758\uC874\uC744 \uBC14\uAFC0 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4`}function Sg(e){let t=new Map;for(let[n,r]of e)t.set(n,r.slice());return t}function Pa(e,t,n){let r=new Set([t]),o=[t];for(;o.length>0;){let s=o.pop();for(let i of e.get(s)||[]){if(i===n)return!0;r.has(i)||(r.add(i),o.push(i))}}return!1}function Eg(e,t){let n=new Set;for(let[i,l]of t)for(let a of l)n.add(Po(i,a));let r=new Map,o=new Map;for(let i of e){let l=Po(i.a,i.b);r.set(l,i),o.set(l,i.type==="dep-add")}let s=[];for(let i of e){let l=Po(i.a,i.b);r.get(l)===i&&o.get(l)!==n.has(l)&&s.push(i)}return s}function Tg(e,t,n){let r=e.parallel_rows,o=Math.max(0,Math.min(r.length,n)),s=r[o];if(s&&s.root_dir===t)return s.queue_index;for(let i=o-1;i>=0;i--)if(r[i].root_dir===t)return r[i].queue_index+1;for(let i=o;i<r.length;i++)if(r[i].root_dir===t)return r[i].queue_index;return e.parallel_raw_length.get(t)??0}function Cg(e,t){return e.parallel_rows.some(n=>n.root_dir===t)}function ii(e,t,n,r){return{type:"worker-queue-place",payload:{bead_id:e,...r?{lane:r}:{},index:n},root_dir:t}}function Da(e,t){let n=0;for(let r of e.cross_lanes.keys())if(n+=1,r===t)return n;return n+1}function Fo(e){let t=Sg(e.blocked_by_map),n=[],r=new Set,o={refusal:null},s=u=>{let d=e.owner_of.get(u);return typeof d!="string"||d.length===0?(o.refusal=Ag(u),null):d};return{graph:t,dep_ops:n,state:o,ownerOf:s,addDep:(u,d,f)=>{if(o.refusal!==null||u===d)return;let g=t.get(u)||[];if(g.includes(d))return;let m=s(u);if(m!==null){if(Pa(t,d,u)){o.refusal=`\uC758\uC874 \uC0AC\uC774\uD074\uC774 \uC0DD\uAE41\uB2C8\uB2E4 \u2014 ${u}\uAC00 \uC774\uBBF8 ${d}\uB97C \uB9C9\uACE0 \uC788\uC2B5\uB2C8\uB2E4`;return}t.set(u,[...g,d]),f!==void 0&&r.add(Po(u,d)),n.push({type:"dep-add",a:u,b:d,root_dir:m,...f===void 0?{}:{lane_id:f}})}},removeDep:(u,d)=>{if(o.refusal!==null||u===d)return;let f=t.get(u)||[];if(!f.includes(d))return;let g=s(u);g!==null&&(t.set(u,f.filter(m=>m!==d)),n.push({type:"dep-remove",a:u,b:d,root_dir:g}))},laneCreated:(u,d)=>r.has(Po(u,d))}}function jo(e,t,n,r,o={}){if(e.state.refusal!==null)return{refused:e.state.refusal};let s=Eg(e.dep_ops,t.blocked_by_map),i=s.filter(d=>d.type==="dep-remove"),l=s.filter(d=>d.type==="dep-add"),a=o.disarm_ops??[],u=o.lane_id===void 0||o.correction===void 0?void 0:xg(o.lane_id,o.correction);return{lane_ops:n,ops:[...i,...a,...l,...r],lane_op_index:i.length+a.length,...u===void 0?{}:{correction:u}}}function Gu(e,t,n){for(let r=1;r<t.length;r+=1)e.addDep(t[r].bead_id,t[r-1].bead_id,n)}function Do(e,t){return t>0&&e.entries[t]?.dep_created_by_lane===!0}function Ku(e,t,n,r){if(t.status!=="confirmed")return[];let o=[],s=new Map;for(let i of r){let l=e.owner_of.get(i.bead_id)||i.root_dir;typeof l!="string"||l.length===0||s.set(l,[...s.get(l)||[],i.bead_id])}for(let[i,l]of s)o.push({type:"worker-queue-disarm",payload:{bead_ids:l,lane_id:n},root_dir:i});return o}function Yu(e,t,n,r){let o=new Map;for(let s of n){if(t.placed_members.has(s.bead_id))continue;let i=e.ownerOf(s.bead_id);if(i===null)return;let l=o.get(i)??0;r.push(ii(s.bead_id,i,(t.parallel_raw_length.get(i)??0)+l)),o.set(i,l+1)}}function No(e){return e.map(t=>({bead_id:t.bead_id,root_dir:t.root_dir}))}function li(e,t){return e.length===t.length&&e.every((n,r)=>n.bead_id===t[r].bead_id&&n.root_dir===t[r].root_dir)}function ci(e,t,n){let r=Fo(n),o=[],s=[],i=[],l,a=n.owner_lane_of.get(e.bead_id),u=e.kind==="chain"?e.lane_id??a:void 0,d=u===void 0?void 0:n.cross_lanes.get(u);if(t.kind==="repo-serial"&&e.root_dir!==t.root_dir)return{refused:yg};if(t.kind==="chain"){if(e.kind==="repo-serial")return{refused:vg};if(e.kind!=="chain"&&typeof a=="string"&&a!==t.lane_id&&n.cross_lanes.has(a))return{refused:`\uC774\uBBF8 \uC5F0\uACB0 ${Da(n,a)}\uC5D0 \uC788\uC2B5\uB2C8\uB2E4`};if(!n.cross_lanes.has(t.lane_id))return{refused:ro}}if(e.kind==="chain"&&d===void 0)return{refused:ro};let f=()=>{if(d===void 0||d.status!=="confirmed")return;let $=d.entries.findIndex(X=>X.bead_id===e.bead_id);if($<0)return;let O=$>0?d.entries[$-1]:null,B=$+1<d.entries.length?d.entries[$+1]:null,Y=Do(d,$),J=B!==null&&Do(d,$+1);Y&&O!==null&&r.removeDep(e.bead_id,O.bead_id),J&&B!==null&&r.removeDep(B.bead_id,e.bead_id),(Y||J)&&O!==null&&B!==null&&r.addDep(B.bead_id,O.bead_id,u)},g=($,O)=>{let B=n.cross_lanes.get($),Y=B.entries.findIndex(q=>q.bead_id===e.bead_id),J=B.entries.filter(q=>q.bead_id!==e.bead_id),X=Math.max(0,Math.min(J.length,Y>=0&&O>Y?O-1:O)),F=-1;if(J.forEach((q,U)=>{n.fixed_members.has(q.bead_id)&&(F=U)}),X<=F){r.state.refusal=wg;return}let L=Y>=0?B.entries[Y]:d?.entries.find(q=>q.bead_id===e.bead_id)??{bead_id:e.bead_id,root_dir:e.root_dir};l=qo({status:B.status,entries:[...J.slice(0,X),L,...J.slice(X)]},n);let M=l.entries;if(li(M,B.entries)||o.push({type:"monitor-lane-update",payload:{lane_id:$,entries:No(M)}}),B.status!=="confirmed")return;let N=M.findIndex(q=>q.bead_id===e.bead_id),W=N>0?M[N-1].bead_id:null,re=N+1<M.length?M[N+1].bead_id:null;if(W===null){re!==null&&r.addDep(re,e.bead_id,$);return}if(r.addDep(e.bead_id,W,$),re!==null&&(r.graph.get(re)||[]).includes(W)){let q=B.entries.findIndex(U=>U.bead_id===re);(r.laneCreated(re,W)||q>0&&B.entries[q-1].bead_id===W&&Do(B,q))&&r.removeDep(re,W),r.addDep(re,e.bead_id,$)}},m=typeof e.queue_index=="number"?e.queue_index:n.queue_index_of.get(e.bead_id);if(e.kind==="chain"&&(f(),d!==void 0&&(t.kind!=="chain"||t.lane_id!==u)&&(i.push(...Ku(n,d,u,d.entries.filter($=>$.bead_id===e.bead_id))),o.push({type:"monitor-lane-update",payload:{lane_id:u,entries:No(d.entries.filter($=>$.bead_id!==e.bead_id))}}))),t.kind==="chain"&&g(t.lane_id,t.marker_index),r.state.refusal!==null)return{refused:r.state.refusal};if(t.kind==="candidate")e.kind!=="candidate"&&s.push({type:"worker-queue-remove",payload:{bead_id:e.bead_id},root_dir:e.root_dir});else if(t.kind==="parallel"){let $=Tg(n,e.root_dir,t.marker_index);if(e.kind==="candidate"||e.kind==="repo-serial")s.push(ii(e.bead_id,e.root_dir,$));else if(e.kind==="parallel"){let O=n.parallel_rows,B=O[Math.max(0,Math.min(O.length,t.marker_index))];if(!(!!B&&B.bead_id===e.bead_id)&&Cg(n,e.root_dir)&&m!==void 0){let J=m>$?$:$-1;J>=0&&J!==m&&s.push({type:"worker-queue-reorder",payload:{bead_id:e.bead_id,to_index:J},root_dir:e.root_dir})}}}else if(t.kind==="chain"){let $=n.cross_lanes.get(t.lane_id);e.kind==="candidate"&&$.status==="confirmed"&&s.push(ii(e.bead_id,e.root_dir,n.parallel_raw_length.get(e.root_dir)??0))}else if(e.kind==="repo-serial"&&e.lane_id===t.lane_id){if(m!==void 0&&t.index!==m){let $=m>t.index?t.index:t.index-1;$>=0&&$!==m&&s.push({type:"worker-queue-reorder",payload:{bead_id:e.bead_id,lane:t.lane_id,to_index:$},root_dir:e.root_dir})}}else s.push(ii(e.bead_id,e.root_dir,t.index,t.lane_id));return jo(r,n,o,s,{disarm_ops:i,...t.kind==="chain"?{lane_id:t.lane_id,correction:l}:{}})}function Vu(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:ro};if(n.entries.length<2)return{refused:"\uD655\uC815\uD558\uB824\uBA74 \uBA64\uBC84\uAC00 2\uAC1C \uC774\uC0C1\uC774\uC5B4\uC57C \uD569\uB2C8\uB2E4"};let r=qo(n,t);if(r.held)return{refused:ai};let o=r.entries,s=Fo(t),i=[];Gu(s,o,e),s.state.refusal===null&&Yu(s,t,o,i);let l=li(o,n.entries)?[]:[{type:"monitor-lane-update",payload:{lane_id:e,entries:No(o)}}];return l.push({type:"monitor-lane-confirm",payload:{lane_id:e}}),jo(s,t,l,i,{lane_id:e,correction:r})}function Xu(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:ro};let r=qo(n,t),o=r.entries,s=Fo(t),i=[];Gu(s,o,e),s.state.refusal===null&&Yu(s,t,o,i);let l=li(o,n.entries)?[]:[{type:"monitor-lane-update",payload:{lane_id:e,entries:No(o)}}];return jo(s,t,l,i,{lane_id:e,correction:r})}function Qu(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:ro};let r=qo(n,t),o=r.entries;return jo(Fo(t),t,li(o,n.entries)?[]:[{type:"monitor-lane-update",payload:{lane_id:e,entries:No(o)}}],[],{lane_id:e,correction:r})}function Zu(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:ro};let r=Fo(t);if(n.status==="confirmed")for(let o=1;o<n.entries.length;o+=1)Do(n,o)&&r.removeDep(n.entries[o].bead_id,n.entries[o-1].bead_id);return jo(r,t,[{type:"monitor-lane-remove",payload:{lane_id:e}}],[],{disarm_ops:Ku(t,n,e,n.entries)})}function Ju(e,t){let n=t.cross_lanes.get(e);if(n===void 0||n.status!=="confirmed")return null;let r=[],o=[];for(let i=1;i<n.entries.length;i+=1){let l=`  ${n.entries[i].bead_id} \u2190 ${n.entries[i-1].bead_id}`;Do(n,i)?r.push(l):o.push(`${l} (\uB808\uC778\uC774 \uB9CC\uB4E4\uC9C0 \uC54A\uC74C)`)}let s=`\uC5F0\uACB0 ${Da(t,e)}\uC744 \uC9C0\uC6C1\uB2C8\uB2E4.`;return r.length===0?`${s}
\uC758\uC874\uC740 \uADF8\uB300\uB85C \uB461\uB2C8\uB2E4`:[s,"\uD568\uAED8 \uC81C\uAC70\uD560 \uC758\uC874:",...r,...o.length===0?[]:["\uADF8\uB300\uB85C \uB450\uB294 \uC758\uC874:",...o]].join(`
`)}function ed(e){let t=new Map;for(let n of e)n.type!=="dep-add"||typeof n.lane_id!="string"||t.set(n.lane_id,[...t.get(n.lane_id)||[],{bead_id:n.a,after:n.b}]);return[...t].map(([n,r])=>({lane_id:n,pairs:r}))}function td(e,t){let n=new Map(e.map((r,o)=>[r.bead_id,o]));return t.filter(r=>{let o=n.get(r.bead_id);return o!==void 0&&o>0&&e[o-1].bead_id===r.after})}function Na(e,t){if(e!==null){let n=t.owner_lane_of.get(e.bead_id);if(typeof n=="string"&&t.cross_lanes.has(n))return{refused:`\uC774\uBBF8 \uC5F0\uACB0 ${Da(t,n)}\uC5D0 \uC788\uC2B5\uB2C8\uB2E4`}}return{lane_ops:[{type:"monitor-lane-create",payload:{entries:e===null?[]:[e]}}],ops:[],lane_op_index:0}}var Rg="\uC0AC\uC774\uD074";function Og(e){let t=new Map,n=r=>Array.isArray(r)?r.filter(o=>typeof o=="string"&&o.length>0):[];for(let r of Array.isArray(e)?e:[]){if(!r||typeof r!="object")continue;let o=r.bead_blocked_by&&typeof r.bead_blocked_by=="object"?r.bead_blocked_by:{};for(let[s,i]of Object.entries(o))Array.isArray(i)&&t.set(s,n(i));for(let s of[...Array.isArray(r.runnable)?r.runnable:[],...Array.isArray(r.session_active)?r.session_active:[]])s&&typeof s.bead_id=="string"&&Array.isArray(s.blocked_by)&&s.blocked_by.length>0&&t.set(s.bead_id,n(s.blocked_by))}return t}function qa(e,t,n){let r=lr(e,t),o=[],s=new Set,i=(a,u)=>{for(let d of a)s.has(d.id)||(s.add(d.id),o.push({bead_id:d.id,root_dir:d.root_dir,workspace_name:d.workspace_name,title:d.title,lane:u}))};i(r.running,"running"),i(r.pr_wait,"pr_wait"),i(r.queue,"queue"),i(r.runnable_all,"runnable");let l=n&&typeof n.root_dir=="string"&&n.root_dir.length?n.root_dir:null;return{issues:l===null?o:o.filter(a=>a.root_dir===l),blocked_by_map:Og(e)}}function nd(e,t){let n=new Map;for(let i of t.issues)!i||typeof i.bead_id!="string"||i.bead_id.length===0||n.has(i.bead_id)||n.set(i.bead_id,i);let r=n.get(e)?.root_dir,o=t.blocked_by_map.get(e)||[],s=[];for(let i of n.values()){if(i.bead_id===e||i.lane==="done"||o.includes(i.bead_id))continue;let l=Pa(t.blocked_by_map,i.bead_id,e);s.push({...i,disabled:l,...l?{reason:Rg}:{}})}return s.sort((i,l)=>{let a=r!==void 0&&i.root_dir===r,u=r!==void 0&&l.root_dir===r;return a!==u?a?-1:1:i.bead_id.localeCompare(l.bead_id)}),s}function rd(e,t){let n=t.trim().toLowerCase();return n.length===0?e.slice():e.filter(r=>r.bead_id.toLowerCase().includes(n)||r.title.toLowerCase().includes(n))}var{entries:pd,setPrototypeOf:od,isFrozen:Lg,getPrototypeOf:Ig,getOwnPropertyDescriptor:Mg}=Object,{freeze:an,seal:vn,create:Ha}=Object,{apply:Ga,construct:Ka}=typeof Reflect<"u"&&Reflect;an||(an=function(t){return t});vn||(vn=function(t){return t});Ga||(Ga=function(t,n){for(var r=arguments.length,o=new Array(r>2?r-2:0),s=2;s<r;s++)o[s-2]=arguments[s];return t.apply(n,o)});Ka||(Ka=function(t){for(var n=arguments.length,r=new Array(n>1?n-1:0),o=1;o<n;o++)r[o-1]=arguments[o];return new t(...r)});var ui=ln(Array.prototype.forEach),Pg=ln(Array.prototype.lastIndexOf),sd=ln(Array.prototype.pop),Bo=ln(Array.prototype.push),Dg=ln(Array.prototype.splice),pi=ln(String.prototype.toLowerCase),Fa=ln(String.prototype.toString),ja=ln(String.prototype.match),Uo=ln(String.prototype.replace),Ng=ln(String.prototype.indexOf),qg=ln(String.prototype.trim),Sn=ln(Object.prototype.hasOwnProperty),sn=ln(RegExp.prototype.test),Wo=Fg(TypeError);function ln(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var n=arguments.length,r=new Array(n>1?n-1:0),o=1;o<n;o++)r[o-1]=arguments[o];return Ga(e,t,r)}}function Fg(e){return function(){for(var t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];return Ka(e,n)}}function pt(e,t){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:pi;od&&od(e,null);let r=t.length;for(;r--;){let o=t[r];if(typeof o=="string"){let s=n(o);s!==o&&(Lg(t)||(t[r]=s),o=s)}e[o]=!0}return e}function jg(e){for(let t=0;t<e.length;t++)Sn(e,t)||(e[t]=null);return e}function Xn(e){let t=Ha(null);for(let[n,r]of pd(e))Sn(e,n)&&(Array.isArray(r)?t[n]=jg(r):r&&typeof r=="object"&&r.constructor===Object?t[n]=Xn(r):t[n]=r);return t}function zo(e,t){for(;e!==null;){let r=Mg(e,t);if(r){if(r.get)return ln(r.get);if(typeof r.value=="function")return ln(r.value)}e=Ig(e)}function n(){return null}return n}var id=an(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),Ba=an(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),Ua=an(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),Bg=an(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),Wa=an(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),Ug=an(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),ad=an(["#text"]),ld=an(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),za=an(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),cd=an(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),di=an(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),Wg=vn(/\{\{[\w\W]*|[\w\W]*\}\}/gm),zg=vn(/<%[\w\W]*|[\w\W]*%>/gm),Hg=vn(/\$\{[\w\W]*/gm),Gg=vn(/^data-[\-\w.\u00B7-\uFFFF]+$/),Kg=vn(/^aria-[\-\w]+$/),fd=vn(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),Yg=vn(/^(?:\w+script|data):/i),Vg=vn(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),_d=vn(/^html$/i),Xg=vn(/^[a-z][.\w]*(-[.\w]+)+$/i),ud=Object.freeze({__proto__:null,ARIA_ATTR:Kg,ATTR_WHITESPACE:Vg,CUSTOM_ELEMENT:Xg,DATA_ATTR:Gg,DOCTYPE_NAME:_d,ERB_EXPR:zg,IS_ALLOWED_URI:fd,IS_SCRIPT_OR_DATA:Yg,MUSTACHE_EXPR:Wg,TMPLIT_EXPR:Hg}),Ho={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,progressingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},Qg=function(){return typeof window>"u"?null:window},Zg=function(t,n){if(typeof t!="object"||typeof t.createPolicy!="function")return null;let r=null,o="data-tt-policy-suffix";n&&n.hasAttribute(o)&&(r=n.getAttribute(o));let s="dompurify"+(r?"#"+r:"");try{return t.createPolicy(s,{createHTML(i){return i},createScriptURL(i){return i}})}catch{return console.warn("TrustedTypes policy "+s+" could not be created."),null}},dd=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function md(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:Qg(),t=pe=>md(pe);if(t.version="3.3.0",t.removed=[],!e||!e.document||e.document.nodeType!==Ho.document||!e.Element)return t.isSupported=!1,t;let{document:n}=e,r=n,o=r.currentScript,{DocumentFragment:s,HTMLTemplateElement:i,Node:l,Element:a,NodeFilter:u,NamedNodeMap:d=e.NamedNodeMap||e.MozNamedAttrMap,HTMLFormElement:f,DOMParser:g,trustedTypes:m}=e,$=a.prototype,O=zo($,"cloneNode"),B=zo($,"remove"),Y=zo($,"nextSibling"),J=zo($,"childNodes"),X=zo($,"parentNode");if(typeof i=="function"){let pe=n.createElement("template");pe.content&&pe.content.ownerDocument&&(n=pe.content.ownerDocument)}let F,L="",{implementation:M,createNodeIterator:N,createDocumentFragment:W,getElementsByTagName:re}=n,{importNode:q}=r,U=dd();t.isSupported=typeof pd=="function"&&typeof X=="function"&&M&&M.createHTMLDocument!==void 0;let{MUSTACHE_EXPR:Q,ERB_EXPR:ne,TMPLIT_EXPR:we,DATA_ATTR:ve,ARIA_ATTR:le,IS_SCRIPT_OR_DATA:D,ATTR_WHITESPACE:$e,CUSTOM_ELEMENT:Ae}=ud,{IS_ALLOWED_URI:T}=ud,Z=null,Re=pt({},[...id,...Ba,...Ua,...Wa,...ad]),fe=null,Te=pt({},[...ld,...za,...cd,...di]),me=Object.seal(Ha(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),Oe=null,it=null,Ge=Object.seal(Ha(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}})),I=!0,oe=!0,ie=!1,de=!0,be=!1,ce=!0,Fe=!1,ze=!1,Ve=!1,Pe=!1,V=!1,j=!1,De=!0,lt=!1,Qe="user-content-",w=!0,H=!1,Ce={},Ee=null,je=pt({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]),Xe=null,dt=pt({},["audio","video","img","source","image","track"]),xt=null,Ct=pt({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),St="http://www.w3.org/1998/Math/MathML",mt="http://www.w3.org/2000/svg",ut="http://www.w3.org/1999/xhtml",vt=ut,Rt=!1,Je=null,b=pt({},[St,mt,ut],Fa),S=pt({},["mi","mo","mn","ms","mtext"]),te=pt({},["annotation-xml"]),ee=pt({},["title","style","font","a","script"]),_e=null,Ue=["application/xhtml+xml","text/html"],Se="text/html",Ne=null,Ze=null,_t=n.createElement("form"),Be=function(C){return C instanceof RegExp||C instanceof Function},ft=function(){let C=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(Ze&&Ze===C)){if((!C||typeof C!="object")&&(C={}),C=Xn(C),_e=Ue.indexOf(C.PARSER_MEDIA_TYPE)===-1?Se:C.PARSER_MEDIA_TYPE,Ne=_e==="application/xhtml+xml"?Fa:pi,Z=Sn(C,"ALLOWED_TAGS")?pt({},C.ALLOWED_TAGS,Ne):Re,fe=Sn(C,"ALLOWED_ATTR")?pt({},C.ALLOWED_ATTR,Ne):Te,Je=Sn(C,"ALLOWED_NAMESPACES")?pt({},C.ALLOWED_NAMESPACES,Fa):b,xt=Sn(C,"ADD_URI_SAFE_ATTR")?pt(Xn(Ct),C.ADD_URI_SAFE_ATTR,Ne):Ct,Xe=Sn(C,"ADD_DATA_URI_TAGS")?pt(Xn(dt),C.ADD_DATA_URI_TAGS,Ne):dt,Ee=Sn(C,"FORBID_CONTENTS")?pt({},C.FORBID_CONTENTS,Ne):je,Oe=Sn(C,"FORBID_TAGS")?pt({},C.FORBID_TAGS,Ne):Xn({}),it=Sn(C,"FORBID_ATTR")?pt({},C.FORBID_ATTR,Ne):Xn({}),Ce=Sn(C,"USE_PROFILES")?C.USE_PROFILES:!1,I=C.ALLOW_ARIA_ATTR!==!1,oe=C.ALLOW_DATA_ATTR!==!1,ie=C.ALLOW_UNKNOWN_PROTOCOLS||!1,de=C.ALLOW_SELF_CLOSE_IN_ATTR!==!1,be=C.SAFE_FOR_TEMPLATES||!1,ce=C.SAFE_FOR_XML!==!1,Fe=C.WHOLE_DOCUMENT||!1,Pe=C.RETURN_DOM||!1,V=C.RETURN_DOM_FRAGMENT||!1,j=C.RETURN_TRUSTED_TYPE||!1,Ve=C.FORCE_BODY||!1,De=C.SANITIZE_DOM!==!1,lt=C.SANITIZE_NAMED_PROPS||!1,w=C.KEEP_CONTENT!==!1,H=C.IN_PLACE||!1,T=C.ALLOWED_URI_REGEXP||fd,vt=C.NAMESPACE||ut,S=C.MATHML_TEXT_INTEGRATION_POINTS||S,te=C.HTML_INTEGRATION_POINTS||te,me=C.CUSTOM_ELEMENT_HANDLING||{},C.CUSTOM_ELEMENT_HANDLING&&Be(C.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(me.tagNameCheck=C.CUSTOM_ELEMENT_HANDLING.tagNameCheck),C.CUSTOM_ELEMENT_HANDLING&&Be(C.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(me.attributeNameCheck=C.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),C.CUSTOM_ELEMENT_HANDLING&&typeof C.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(me.allowCustomizedBuiltInElements=C.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),be&&(oe=!1),V&&(Pe=!0),Ce&&(Z=pt({},ad),fe=[],Ce.html===!0&&(pt(Z,id),pt(fe,ld)),Ce.svg===!0&&(pt(Z,Ba),pt(fe,za),pt(fe,di)),Ce.svgFilters===!0&&(pt(Z,Ua),pt(fe,za),pt(fe,di)),Ce.mathMl===!0&&(pt(Z,Wa),pt(fe,cd),pt(fe,di))),C.ADD_TAGS&&(typeof C.ADD_TAGS=="function"?Ge.tagCheck=C.ADD_TAGS:(Z===Re&&(Z=Xn(Z)),pt(Z,C.ADD_TAGS,Ne))),C.ADD_ATTR&&(typeof C.ADD_ATTR=="function"?Ge.attributeCheck=C.ADD_ATTR:(fe===Te&&(fe=Xn(fe)),pt(fe,C.ADD_ATTR,Ne))),C.ADD_URI_SAFE_ATTR&&pt(xt,C.ADD_URI_SAFE_ATTR,Ne),C.FORBID_CONTENTS&&(Ee===je&&(Ee=Xn(Ee)),pt(Ee,C.FORBID_CONTENTS,Ne)),w&&(Z["#text"]=!0),Fe&&pt(Z,["html","head","body"]),Z.table&&(pt(Z,["tbody"]),delete Oe.tbody),C.TRUSTED_TYPES_POLICY){if(typeof C.TRUSTED_TYPES_POLICY.createHTML!="function")throw Wo('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof C.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw Wo('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');F=C.TRUSTED_TYPES_POLICY,L=F.createHTML("")}else F===void 0&&(F=Zg(m,o)),F!==null&&typeof L=="string"&&(L=F.createHTML(""));an&&an(C),Ze=C}},qt=pt({},[...Ba,...Ua,...Bg]),Ft=pt({},[...Wa,...Ug]),Xt=function(C){let ge=X(C);(!ge||!ge.tagName)&&(ge={namespaceURI:vt,tagName:"template"});let ue=pi(C.tagName),y=pi(ge.tagName);return Je[C.namespaceURI]?C.namespaceURI===mt?ge.namespaceURI===ut?ue==="svg":ge.namespaceURI===St?ue==="svg"&&(y==="annotation-xml"||S[y]):!!qt[ue]:C.namespaceURI===St?ge.namespaceURI===ut?ue==="math":ge.namespaceURI===mt?ue==="math"&&te[y]:!!Ft[ue]:C.namespaceURI===ut?ge.namespaceURI===mt&&!te[y]||ge.namespaceURI===St&&!S[y]?!1:!Ft[ue]&&(ee[ue]||!qt[ue]):!!(_e==="application/xhtml+xml"&&Je[C.namespaceURI]):!1},kt=function(C){Bo(t.removed,{element:C});try{X(C).removeChild(C)}catch{B(C)}},et=function(C,ge){try{Bo(t.removed,{attribute:ge.getAttributeNode(C),from:ge})}catch{Bo(t.removed,{attribute:null,from:ge})}if(ge.removeAttribute(C),C==="is")if(Pe||V)try{kt(ge)}catch{}else try{ge.setAttribute(C,"")}catch{}},Pt=function(C){let ge=null,ue=null;if(Ve)C="<remove></remove>"+C;else{let _=ja(C,/^[\r\n\t ]+/);ue=_&&_[0]}_e==="application/xhtml+xml"&&vt===ut&&(C='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+C+"</body></html>");let y=F?F.createHTML(C):C;if(vt===ut)try{ge=new g().parseFromString(y,_e)}catch{}if(!ge||!ge.documentElement){ge=M.createDocument(vt,"template",null);try{ge.documentElement.innerHTML=Rt?L:y}catch{}}let p=ge.body||ge.documentElement;return C&&ue&&p.insertBefore(n.createTextNode(ue),p.childNodes[0]||null),vt===ut?re.call(ge,Fe?"html":"body")[0]:Fe?ge.documentElement:p},Qt=function(C){return N.call(C.ownerDocument||C,C,u.SHOW_ELEMENT|u.SHOW_COMMENT|u.SHOW_TEXT|u.SHOW_PROCESSING_INSTRUCTION|u.SHOW_CDATA_SECTION,null)},tn=function(C){return C instanceof f&&(typeof C.nodeName!="string"||typeof C.textContent!="string"||typeof C.removeChild!="function"||!(C.attributes instanceof d)||typeof C.removeAttribute!="function"||typeof C.setAttribute!="function"||typeof C.namespaceURI!="string"||typeof C.insertBefore!="function"||typeof C.hasChildNodes!="function")},zt=function(C){return typeof l=="function"&&C instanceof l};function jt(pe,C,ge){ui(pe,ue=>{ue.call(t,C,ge,Ze)})}let un=function(C){let ge=null;if(jt(U.beforeSanitizeElements,C,null),tn(C))return kt(C),!0;let ue=Ne(C.nodeName);if(jt(U.uponSanitizeElement,C,{tagName:ue,allowedTags:Z}),ce&&C.hasChildNodes()&&!zt(C.firstElementChild)&&sn(/<[/\w!]/g,C.innerHTML)&&sn(/<[/\w!]/g,C.textContent)||C.nodeType===Ho.progressingInstruction||ce&&C.nodeType===Ho.comment&&sn(/<[/\w]/g,C.data))return kt(C),!0;if(!(Ge.tagCheck instanceof Function&&Ge.tagCheck(ue))&&(!Z[ue]||Oe[ue])){if(!Oe[ue]&&Kt(ue)&&(me.tagNameCheck instanceof RegExp&&sn(me.tagNameCheck,ue)||me.tagNameCheck instanceof Function&&me.tagNameCheck(ue)))return!1;if(w&&!Ee[ue]){let y=X(C)||C.parentNode,p=J(C)||C.childNodes;if(p&&y){let _=p.length;for(let E=_-1;E>=0;--E){let G=O(p[E],!0);G.__removalCount=(C.__removalCount||0)+1,y.insertBefore(G,Y(C))}}}return kt(C),!0}return C instanceof a&&!Xt(C)||(ue==="noscript"||ue==="noembed"||ue==="noframes")&&sn(/<\/no(script|embed|frames)/i,C.innerHTML)?(kt(C),!0):(be&&C.nodeType===Ho.text&&(ge=C.textContent,ui([Q,ne,we],y=>{ge=Uo(ge,y," ")}),C.textContent!==ge&&(Bo(t.removed,{element:C.cloneNode()}),C.textContent=ge)),jt(U.afterSanitizeElements,C,null),!1)},Mt=function(C,ge,ue){if(De&&(ge==="id"||ge==="name")&&(ue in n||ue in _t))return!1;if(!(oe&&!it[ge]&&sn(ve,ge))){if(!(I&&sn(le,ge))){if(!(Ge.attributeCheck instanceof Function&&Ge.attributeCheck(ge,C))){if(!fe[ge]||it[ge]){if(!(Kt(C)&&(me.tagNameCheck instanceof RegExp&&sn(me.tagNameCheck,C)||me.tagNameCheck instanceof Function&&me.tagNameCheck(C))&&(me.attributeNameCheck instanceof RegExp&&sn(me.attributeNameCheck,ge)||me.attributeNameCheck instanceof Function&&me.attributeNameCheck(ge,C))||ge==="is"&&me.allowCustomizedBuiltInElements&&(me.tagNameCheck instanceof RegExp&&sn(me.tagNameCheck,ue)||me.tagNameCheck instanceof Function&&me.tagNameCheck(ue))))return!1}else if(!xt[ge]){if(!sn(T,Uo(ue,$e,""))){if(!((ge==="src"||ge==="xlink:href"||ge==="href")&&C!=="script"&&Ng(ue,"data:")===0&&Xe[C])){if(!(ie&&!sn(D,Uo(ue,$e,"")))){if(ue)return!1}}}}}}}return!0},Kt=function(C){return C!=="annotation-xml"&&ja(C,Ae)},Bt=function(C){jt(U.beforeSanitizeAttributes,C,null);let{attributes:ge}=C;if(!ge||tn(C))return;let ue={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:fe,forceKeepAttr:void 0},y=ge.length;for(;y--;){let p=ge[y],{name:_,namespaceURI:E,value:G}=p,K=Ne(_),se=G,xe=_==="value"?se:qg(se);if(ue.attrName=K,ue.attrValue=xe,ue.keepAttr=!0,ue.forceKeepAttr=void 0,jt(U.uponSanitizeAttribute,C,ue),xe=ue.attrValue,lt&&(K==="id"||K==="name")&&(et(_,C),xe=Qe+xe),ce&&sn(/((--!?|])>)|<\/(style|title|textarea)/i,xe)){et(_,C);continue}if(K==="attributename"&&ja(xe,"href")){et(_,C);continue}if(ue.forceKeepAttr)continue;if(!ue.keepAttr){et(_,C);continue}if(!de&&sn(/\/>/i,xe)){et(_,C);continue}be&&ui([Q,ne,we],ot=>{xe=Uo(xe,ot," ")});let Ke=Ne(C.nodeName);if(!Mt(Ke,K,xe)){et(_,C);continue}if(F&&typeof m=="object"&&typeof m.getAttributeType=="function"&&!E)switch(m.getAttributeType(Ke,K)){case"TrustedHTML":{xe=F.createHTML(xe);break}case"TrustedScriptURL":{xe=F.createScriptURL(xe);break}}if(xe!==se)try{E?C.setAttributeNS(E,_,xe):C.setAttribute(_,xe),tn(C)?kt(C):sd(t.removed)}catch{et(_,C)}}jt(U.afterSanitizeAttributes,C,null)},Zt=function pe(C){let ge=null,ue=Qt(C);for(jt(U.beforeSanitizeShadowDOM,C,null);ge=ue.nextNode();)jt(U.uponSanitizeShadowNode,ge,null),un(ge),Bt(ge),ge.content instanceof s&&pe(ge.content);jt(U.afterSanitizeShadowDOM,C,null)};return t.sanitize=function(pe){let C=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},ge=null,ue=null,y=null,p=null;if(Rt=!pe,Rt&&(pe="<!-->"),typeof pe!="string"&&!zt(pe))if(typeof pe.toString=="function"){if(pe=pe.toString(),typeof pe!="string")throw Wo("dirty is not a string, aborting")}else throw Wo("toString is not a function");if(!t.isSupported)return pe;if(ze||ft(C),t.removed=[],typeof pe=="string"&&(H=!1),H){if(pe.nodeName){let G=Ne(pe.nodeName);if(!Z[G]||Oe[G])throw Wo("root node is forbidden and cannot be sanitized in-place")}}else if(pe instanceof l)ge=Pt("<!---->"),ue=ge.ownerDocument.importNode(pe,!0),ue.nodeType===Ho.element&&ue.nodeName==="BODY"||ue.nodeName==="HTML"?ge=ue:ge.appendChild(ue);else{if(!Pe&&!be&&!Fe&&pe.indexOf("<")===-1)return F&&j?F.createHTML(pe):pe;if(ge=Pt(pe),!ge)return Pe?null:j?L:""}ge&&Ve&&kt(ge.firstChild);let _=Qt(H?pe:ge);for(;y=_.nextNode();)un(y),Bt(y),y.content instanceof s&&Zt(y.content);if(H)return pe;if(Pe){if(V)for(p=W.call(ge.ownerDocument);ge.firstChild;)p.appendChild(ge.firstChild);else p=ge;return(fe.shadowroot||fe.shadowrootmode)&&(p=q.call(r,p,!0)),p}let E=Fe?ge.outerHTML:ge.innerHTML;return Fe&&Z["!doctype"]&&ge.ownerDocument&&ge.ownerDocument.doctype&&ge.ownerDocument.doctype.name&&sn(_d,ge.ownerDocument.doctype.name)&&(E="<!DOCTYPE "+ge.ownerDocument.doctype.name+`>
`+E),be&&ui([Q,ne,we],G=>{E=Uo(E,G," ")}),F&&j?F.createHTML(E):E},t.setConfig=function(){let pe=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};ft(pe),ze=!0},t.clearConfig=function(){Ze=null,ze=!1},t.isValidAttribute=function(pe,C,ge){Ze||ft({});let ue=Ne(pe),y=Ne(C);return Mt(ue,y,ge)},t.addHook=function(pe,C){typeof C=="function"&&Bo(U[pe],C)},t.removeHook=function(pe,C){if(C!==void 0){let ge=Pg(U[pe],C);return ge===-1?void 0:Dg(U[pe],ge,1)[0]}return sd(U[pe])},t.removeHooks=function(pe){U[pe]=[]},t.removeAllHooks=function(){U=dd()},t}var gd=md();var Qn={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},fi=e=>(...t)=>({_$litDirective$:e,values:t}),oo=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,n,r){this._$Ct=t,this._$AM=n,this._$Ci=r}_$AS(t,n){return this.update(t,n)}update(t,n){return this.render(...n)}};var Go=class extends oo{constructor(t){if(super(t),this.it=Lt,t.type!==Qn.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===Lt||t==null)return this._t=void 0,this.it=t;if(t===yn)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;let n=[t];return n.raw=n,this._t={_$litType$:this.constructor.resultType,strings:n,values:[]}}};Go.directiveName="unsafeHTML",Go.resultType=1;var hd=fi(Go);function Qa(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var Tr=Qa();function xd(e){Tr=e}var Xo={exec:()=>null};function bt(e,t=""){let n=typeof e=="string"?e:e.source,r={replace:(o,s)=>{let i=typeof s=="string"?s:s.source;return i=i.replace(cn.caret,"$1"),n=n.replace(o,i),r},getRegex:()=>new RegExp(n,t)};return r}var Jg=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),cn={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i")},eh=/^(?:[ \t]*(?:\n|$))+/,th=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,nh=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,Qo=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,rh=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,Za=/(?:[*+-]|\d{1,9}[.)])/,Ad=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,Sd=bt(Ad).replace(/bull/g,Za).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),oh=bt(Ad).replace(/bull/g,Za).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),Ja=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,sh=/^[^\n]+/,el=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,ih=bt(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",el).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),ah=bt(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,Za).getRegex(),yi="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",tl=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,lh=bt("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",tl).replace("tag",yi).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),Ed=bt(Ja).replace("hr",Qo).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",yi).getRegex(),ch=bt(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",Ed).getRegex(),nl={blockquote:ch,code:th,def:ih,fences:nh,heading:rh,hr:Qo,html:lh,lheading:Sd,list:ah,newline:eh,paragraph:Ed,table:Xo,text:sh},bd=bt("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",Qo).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",yi).getRegex(),uh={...nl,lheading:oh,table:bd,paragraph:bt(Ja).replace("hr",Qo).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",bd).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",yi).getRegex()},dh={...nl,html:bt(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",tl).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:Xo,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:bt(Ja).replace("hr",Qo).replace("heading",` *#{1,6} *[^
]`).replace("lheading",Sd).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},ph=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,fh=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,Td=/^( {2,}|\\)\n(?!\s*$)/,_h=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,vi=/[\p{P}\p{S}]/u,rl=/[\s\p{P}\p{S}]/u,Cd=/[^\s\p{P}\p{S}]/u,mh=bt(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,rl).getRegex(),Rd=/(?!~)[\p{P}\p{S}]/u,gh=/(?!~)[\s\p{P}\p{S}]/u,hh=/(?:[^\s\p{P}\p{S}]|~)/u,bh=bt(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",Jg?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),Od=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,yh=bt(Od,"u").replace(/punct/g,vi).getRegex(),vh=bt(Od,"u").replace(/punct/g,Rd).getRegex(),Ld="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",wh=bt(Ld,"gu").replace(/notPunctSpace/g,Cd).replace(/punctSpace/g,rl).replace(/punct/g,vi).getRegex(),kh=bt(Ld,"gu").replace(/notPunctSpace/g,hh).replace(/punctSpace/g,gh).replace(/punct/g,Rd).getRegex(),$h=bt("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,Cd).replace(/punctSpace/g,rl).replace(/punct/g,vi).getRegex(),xh=bt(/\\(punct)/,"gu").replace(/punct/g,vi).getRegex(),Ah=bt(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),Sh=bt(tl).replace("(?:-->|$)","-->").getRegex(),Eh=bt("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",Sh).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),gi=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,Th=bt(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",gi).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),Id=bt(/^!?\[(label)\]\[(ref)\]/).replace("label",gi).replace("ref",el).getRegex(),Md=bt(/^!?\[(ref)\](?:\[\])?/).replace("ref",el).getRegex(),Ch=bt("reflink|nolink(?!\\()","g").replace("reflink",Id).replace("nolink",Md).getRegex(),yd=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,ol={_backpedal:Xo,anyPunctuation:xh,autolink:Ah,blockSkip:bh,br:Td,code:fh,del:Xo,emStrongLDelim:yh,emStrongRDelimAst:wh,emStrongRDelimUnd:$h,escape:ph,link:Th,nolink:Md,punctuation:mh,reflink:Id,reflinkSearch:Ch,tag:Eh,text:_h,url:Xo},Rh={...ol,link:bt(/^!?\[(label)\]\((.*?)\)/).replace("label",gi).getRegex(),reflink:bt(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",gi).getRegex()},Ya={...ol,emStrongRDelimAst:kh,emStrongLDelim:vh,url:bt(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",yd).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:bt(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",yd).getRegex()},Oh={...Ya,br:bt(Td).replace("{2,}","*").getRegex(),text:bt(Ya.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},_i={normal:nl,gfm:uh,pedantic:dh},Ko={normal:ol,gfm:Ya,breaks:Oh,pedantic:Rh},Lh={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},vd=e=>Lh[e];function Zn(e,t){if(t){if(cn.escapeTest.test(e))return e.replace(cn.escapeReplace,vd)}else if(cn.escapeTestNoEncode.test(e))return e.replace(cn.escapeReplaceNoEncode,vd);return e}function wd(e){try{e=encodeURI(e).replace(cn.percentDecode,"%")}catch{return null}return e}function kd(e,t){let n=e.replace(cn.findPipe,(s,i,l)=>{let a=!1,u=i;for(;--u>=0&&l[u]==="\\";)a=!a;return a?"|":" |"}),r=n.split(cn.splitPipe),o=0;if(r[0].trim()||r.shift(),r.length>0&&!r.at(-1)?.trim()&&r.pop(),t)if(r.length>t)r.splice(t);else for(;r.length<t;)r.push("");for(;o<r.length;o++)r[o]=r[o].trim().replace(cn.slashPipe,"|");return r}function Yo(e,t,n){let r=e.length;if(r===0)return"";let o=0;for(;o<r;){let s=e.charAt(r-o-1);if(s===t&&!n)o++;else if(s!==t&&n)o++;else break}return e.slice(0,r-o)}function Ih(e,t){if(e.indexOf(t[1])===-1)return-1;let n=0;for(let r=0;r<e.length;r++)if(e[r]==="\\")r++;else if(e[r]===t[0])n++;else if(e[r]===t[1]&&(n--,n<0))return r;return n>0?-2:-1}function $d(e,t,n,r,o){let s=t.href,i=t.title||null,l=e[1].replace(o.other.outputLinkReplace,"$1");r.state.inLink=!0;let a={type:e[0].charAt(0)==="!"?"image":"link",raw:n,href:s,title:i,text:l,tokens:r.inlineTokens(l)};return r.state.inLink=!1,a}function Mh(e,t,n){let r=e.match(n.other.indentCodeCompensation);if(r===null)return t;let o=r[1];return t.split(`
`).map(s=>{let i=s.match(n.other.beginningSpace);if(i===null)return s;let[l]=i;return l.length>=o.length?s.slice(o.length):s}).join(`
`)}var hi=class{constructor(e){At(this,"options");At(this,"rules");At(this,"lexer");this.options=e||Tr}space(e){let t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){let t=this.rules.block.code.exec(e);if(t){let n=t[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?n:Yo(n,`
`)}}}fences(e){let t=this.rules.block.fences.exec(e);if(t){let n=t[0],r=Mh(n,t[3]||"",this.rules);return{type:"code",raw:n,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:r}}}heading(e){let t=this.rules.block.heading.exec(e);if(t){let n=t[2].trim();if(this.rules.other.endingHash.test(n)){let r=Yo(n,"#");(this.options.pedantic||!r||this.rules.other.endingSpaceChar.test(r))&&(n=r.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:n,tokens:this.lexer.inline(n)}}}hr(e){let t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:Yo(t[0],`
`)}}blockquote(e){let t=this.rules.block.blockquote.exec(e);if(t){let n=Yo(t[0],`
`).split(`
`),r="",o="",s=[];for(;n.length>0;){let i=!1,l=[],a;for(a=0;a<n.length;a++)if(this.rules.other.blockquoteStart.test(n[a]))l.push(n[a]),i=!0;else if(!i)l.push(n[a]);else break;n=n.slice(a);let u=l.join(`
`),d=u.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");r=r?`${r}
${u}`:u,o=o?`${o}
${d}`:d;let f=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(d,s,!0),this.lexer.state.top=f,n.length===0)break;let g=s.at(-1);if(g?.type==="code")break;if(g?.type==="blockquote"){let m=g,$=m.raw+`
`+n.join(`
`),O=this.blockquote($);s[s.length-1]=O,r=r.substring(0,r.length-m.raw.length)+O.raw,o=o.substring(0,o.length-m.text.length)+O.text;break}else if(g?.type==="list"){let m=g,$=m.raw+`
`+n.join(`
`),O=this.list($);s[s.length-1]=O,r=r.substring(0,r.length-g.raw.length)+O.raw,o=o.substring(0,o.length-m.raw.length)+O.raw,n=$.substring(s.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:r,tokens:s,text:o}}}list(e){let t=this.rules.block.list.exec(e);if(t){let n=t[1].trim(),r=n.length>1,o={type:"list",raw:"",ordered:r,start:r?+n.slice(0,-1):"",loose:!1,items:[]};n=r?`\\d{1,9}\\${n.slice(-1)}`:`\\${n}`,this.options.pedantic&&(n=r?n:"[*+-]");let s=this.rules.other.listItemRegex(n),i=!1;for(;e;){let a=!1,u="",d="";if(!(t=s.exec(e))||this.rules.block.hr.test(e))break;u=t[0],e=e.substring(u.length);let f=t[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,O=>" ".repeat(3*O.length)),g=e.split(`
`,1)[0],m=!f.trim(),$=0;if(this.options.pedantic?($=2,d=f.trimStart()):m?$=t[1].length+1:($=t[2].search(this.rules.other.nonSpaceChar),$=$>4?1:$,d=f.slice($),$+=t[1].length),m&&this.rules.other.blankLine.test(g)&&(u+=g+`
`,e=e.substring(g.length+1),a=!0),!a){let O=this.rules.other.nextBulletRegex($),B=this.rules.other.hrRegex($),Y=this.rules.other.fencesBeginRegex($),J=this.rules.other.headingBeginRegex($),X=this.rules.other.htmlBeginRegex($);for(;e;){let F=e.split(`
`,1)[0],L;if(g=F,this.options.pedantic?(g=g.replace(this.rules.other.listReplaceNesting,"  "),L=g):L=g.replace(this.rules.other.tabCharGlobal,"    "),Y.test(g)||J.test(g)||X.test(g)||O.test(g)||B.test(g))break;if(L.search(this.rules.other.nonSpaceChar)>=$||!g.trim())d+=`
`+L.slice($);else{if(m||f.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||Y.test(f)||J.test(f)||B.test(f))break;d+=`
`+g}!m&&!g.trim()&&(m=!0),u+=F+`
`,e=e.substring(F.length+1),f=L.slice($)}}o.loose||(i?o.loose=!0:this.rules.other.doubleBlankLine.test(u)&&(i=!0)),o.items.push({type:"list_item",raw:u,task:!!this.options.gfm&&this.rules.other.listIsTask.test(d),loose:!1,text:d,tokens:[]}),o.raw+=u}let l=o.items.at(-1);if(l)l.raw=l.raw.trimEnd(),l.text=l.text.trimEnd();else return;o.raw=o.raw.trimEnd();for(let a of o.items){if(this.lexer.state.top=!1,a.tokens=this.lexer.blockTokens(a.text,[]),a.task){if(a.text=a.text.replace(this.rules.other.listReplaceTask,""),a.tokens[0]?.type==="text"||a.tokens[0]?.type==="paragraph"){a.tokens[0].raw=a.tokens[0].raw.replace(this.rules.other.listReplaceTask,""),a.tokens[0].text=a.tokens[0].text.replace(this.rules.other.listReplaceTask,"");for(let d=this.lexer.inlineQueue.length-1;d>=0;d--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[d].src)){this.lexer.inlineQueue[d].src=this.lexer.inlineQueue[d].src.replace(this.rules.other.listReplaceTask,"");break}}let u=this.rules.other.listTaskCheckbox.exec(a.raw);if(u){let d={type:"checkbox",raw:u[0]+" ",checked:u[0]!=="[ ]"};a.checked=d.checked,o.loose?a.tokens[0]&&["paragraph","text"].includes(a.tokens[0].type)&&"tokens"in a.tokens[0]&&a.tokens[0].tokens?(a.tokens[0].raw=d.raw+a.tokens[0].raw,a.tokens[0].text=d.raw+a.tokens[0].text,a.tokens[0].tokens.unshift(d)):a.tokens.unshift({type:"paragraph",raw:d.raw,text:d.raw,tokens:[d]}):a.tokens.unshift(d)}}if(!o.loose){let u=a.tokens.filter(f=>f.type==="space"),d=u.length>0&&u.some(f=>this.rules.other.anyLine.test(f.raw));o.loose=d}}if(o.loose)for(let a of o.items){a.loose=!0;for(let u of a.tokens)u.type==="text"&&(u.type="paragraph")}return o}}html(e){let t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){let t=this.rules.block.def.exec(e);if(t){let n=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),r=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",o=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:n,raw:t[0],href:r,title:o}}}table(e){let t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;let n=kd(t[1]),r=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),o=t[3]?.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
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
Please report this to https://github.com/markedjs/marked.`,e){let r="<p>An error occurred:</p><pre>"+Zn(n.message+"",!0)+"</pre>";return t?Promise.resolve(r):r}if(t)return Promise.reject(n);throw n}}},Er=new Ph;function wt(e,t){return Er.parse(e,t)}wt.options=wt.setOptions=function(e){return Er.setOptions(e),wt.defaults=Er.defaults,xd(wt.defaults),wt};wt.getDefaults=Qa;wt.defaults=Tr;wt.use=function(...e){return Er.use(...e),wt.defaults=Er.defaults,xd(wt.defaults),wt};wt.walkTokens=function(e,t){return Er.walkTokens(e,t)};wt.parseInline=Er.parseInline;wt.Parser=Tn;wt.parser=Tn.parse;wt.Renderer=bi;wt.TextRenderer=sl;wt.Lexer=En;wt.lexer=En.lex;wt.Tokenizer=hi;wt.Hooks=Vo;wt.parse=wt;var W$=wt.options,z$=wt.setOptions,H$=wt.use,G$=wt.walkTokens,K$=wt.parseInline;var Y$=Tn.parse,V$=En.lex;function cr(e){let t=wt.parse(e),n=gd.sanitize(t);return hd(n)}function Jn(e,t){return c`<div class="prompt-block">
    <div class="prompt-block__label">${e}</div>
    <pre class="prompt-block__body">${t}</pre>
  </div>`}function so(e){return e.loading?c`<div class="prompt-block__status">불러오는 중…</div>`:e.error?c`<div class="prompt-block__status prompt-block__status--error">
      프롬프트를 불러오지 못했습니다
    </div>`:""}function wi(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),n=r=>String(r).padStart(2,"0");return`${t.getFullYear()}-${n(t.getMonth()+1)}-${n(t.getDate())} ${n(t.getHours())}:${n(t.getMinutes())}`}var Dd={Read:"\u{1F4D6}",Edit:"\u270E",MultiEdit:"\u270E",Write:"\u{1F4DD}",Bash:"\u26A1",Grep:"\u{1F50E}",Glob:"\u{1F50E}",Task:"\u{1F916}",Agent:"\u{1F916}",WebFetch:"\u{1F310}",WebSearch:"\u{1F310}"},Dh={command_execution:"\uBA85\uB839 \uC2E4\uD589",file_change:"\uD30C\uC77C \uBCC0\uACBD",mcp_call:"MCP \uD638\uCD9C",web_search:"\uC6F9 \uAC80\uC0C9",plan:"\uACC4\uD68D"},Nh=/^\s*([✓✗⊘])\s*(spec|impl|implementation|plan)\s*게이트\s*[—–-]\s*(\S+)\s+(APPROVE|REVISE|REJECT|BLOCK|SKIP)(?:\s*·\s*(.+))?/,qh=/^\s*#{0,3}\s*Phase\s+\d+(?:\s*\/\s*\d+)?\s*(?:[·:—–-]\s*.+)?$/;function Cn(e){return!!e&&typeof e=="object"}function il(e){return typeof e!="string"||e.length===0?[]:e.split(/\r?\n/)}function al(e,t){let n=il(e),r=il(t),o=new Map;for(let l of n)o.set(l,(o.get(l)||0)+1);let s=0;for(let l of r){let a=o.get(l)||0;a>0?o.set(l,a-1):s+=1}let i=0;for(let l of o.values())i+=l;return{added:s,removed:i}}function Nd(e){let t="";typeof e=="string"?t=e:Array.isArray(e)?t=e.map(o=>Cn(o)&&typeof o.text=="string"?o.text:"").join(""):Cn(e)&&typeof e.text=="string"&&(t=e.text);let r=(String(t).split(/\r?\n/).find(o=>o.trim().length>0)||"").trim();return r.length>120?`${r.slice(0,117)}\u2026`:r}function Fh(e){let t=String(e.name||""),n=e.input||{},r={kind:"tool",tool:t,icon:Dd[t]||"\u{1F527}",input:n,expandable:!0};if((t==="Read"||t==="Write")&&(r.path=String(n.file_path||n.path||"")),t==="Write"&&(r.added=il(n.content).length),t==="Edit"){r.path=String(n.file_path||n.path||"");let{added:o,removed:s}=al(n.old_string,n.new_string);r.added=o,r.removed=s}if(t==="MultiEdit"){r.path=String(n.file_path||n.path||"");let o=0,s=0,i=Array.isArray(n.edits)?n.edits:[];for(let l of i){let a=al(Cn(l)?l.old_string:"",Cn(l)?l.new_string:"");o+=a.added,s+=a.removed}r.added=o,r.removed=s}return t==="Bash"&&(r.command=String(n.command||"")),(t==="Grep"||t==="Glob")&&(r.command=String(n.pattern||n.query||"")),t==="Agent"&&(typeof e.id=="string"&&e.id.length>0&&(r.launch_id=e.id),typeof n.description=="string"&&(r.command=n.description)),r}function ll(e){return typeof e!="string"||e.trim().length===0?null:{kind:"thinking",text:e}}var jh=/<system-reminder>[\s\S]*?<\/system-reminder>/g;function qd(e){let t;if(typeof e=="string")t=e;else if(Array.isArray(e))t=e.filter(r=>Cn(r)&&r.type==="text"&&typeof r.text=="string").map(r=>String(r.text)).join(`
`);else return null;let n=t.replace(jh,"").trim();return n.length>0?{kind:"user",text:n}:null}function cl(e){let t=e.split(/\r?\n/).find(r=>r.trim().length>0)||"",n=Nh.exec(t);return n?{kind:"gate",gate:n[2]==="implementation"?"impl":n[2],reviewer:n[3],verdict:n[4],time:n[5]?n[5].trim():void 0,text:t.trim()}:qh.test(t)&&t.trim().length<=80?{kind:"phase",text:t.trim()}:{kind:"assistant",text:e}}function Bh(e,t){if(e.subtype==="init"){let n=typeof e.model=="string"?e.model:"";return t.progress=null,[{kind:"thinking",text:n?`\uC138\uC158 \uC2DC\uC791 \xB7 ${n}`:"\uC138\uC158 \uC2DC\uC791"}]}if(e.subtype==="thinking_tokens"){let r=`\uC0DD\uAC01 \uC911\u2026 ${typeof e.estimated_tokens=="number"&&Number.isFinite(e.estimated_tokens)?Math.max(0,Math.round(e.estimated_tokens)):0} \uD1A0\uD070`;return t.progress?(t.progress.text=r,[]):(t.progress={kind:"thinking",text:r},[t.progress])}return[]}function Uh(e,t){let n=typeof e.parent_tool_use_id=="string"&&e.parent_tool_use_id.length>0?e.parent_tool_use_id:null;if(e.type==="assistant"){let r=e.message,o=r&&Array.isArray(r.content)?r.content:[],s=[];for(let i of o)if(Cn(i)){if(i.type==="text"&&typeof i.text=="string")s.push(cl(i.text));else if(i.type==="thinking"){let l=ll(i.thinking);l&&s.push(l)}else if(i.type==="tool_use"){let l=Fh(i);typeof i.id=="string"&&t.set(i.id,l),s.push(l)}}return n?Pd(s,n):s}if(e.type==="user"){let r=e.message,o=r&&Array.isArray(r.content)?r.content:[];for(let i of o)if(Cn(i)&&i.type==="tool_result"){let l=t.get(String(i.tool_use_id));if(l){let a=Nd(i.content);l.result=a,l.output=typeof i.content=="string"?i.content:a,i.is_error===!0&&(l.is_error=!0)}}let s=qd(r&&r.content);return s?[s]:[]}if(e.type==="result"){let r=e.is_error===!1&&e.subtype==="success",o={kind:"result",success:r,text:typeof e.result=="string"?e.result:r?"DONE":""};return n?Pd([o],n):[o]}return[]}function Pd(e,t){for(let n of e)n.parent_tool_use_id=t;return e}function Wh(e){let t=typeof e.command=="string"?e.command:"",n=Nd(e.aggregated_output===void 0?e.output:e.aggregated_output),o=[typeof e.exit_code=="number"&&Number.isFinite(e.exit_code)?`exit ${e.exit_code}`:typeof e.status=="string"&&e.status.length>0?e.status:"",n].filter(i=>i.length>0).join(" \xB7 "),s={kind:"tool",tool:"shell",icon:Dd.Bash,command:t,input:{command:t},expandable:!0};return o.length>0&&(s.result=o),typeof e.aggregated_output=="string"&&(s.output=e.aggregated_output),s}function zh(e){if(e.type==="item.completed"&&Cn(e.item)){let t=e.item;if(t.type==="agent_message"&&typeof t.text=="string")return[cl(t.text)];if(t.type==="user_message"){let n=qd(t.text);return n?[n]:[]}if(t.type==="reasoning"){let n=ll(t.text);return n?[n]:[]}return t.type==="error"?[{kind:"error",text:String(t.message||"")}]:t.type==="command_execution"?[Wh(t)]:[]}if(e.type==="turn.completed")return[{kind:"result",success:!0,text:"DONE"}];if(e.type==="turn.failed"){let t=e.error;return[{kind:"error",text:t&&typeof t.message=="string"?t.message:"turn failed"}]}return e.type==="error"?[{kind:"error",text:String(e.message||"")}]:[]}function Hh(e){if(e.schema!=="codex-delegation-monitor-v1"||!Cn(e.event))return[];let t=e.event;if(t.type==="session.started"||t.type==="turn.started")return[];if((t.type==="item.started"||t.type==="item.completed")&&Cn(t.item)){let n=t.item;if(typeof n.id!="string"||n.id.length===0)return[];if(t.type==="item.completed"&&n.kind==="agent_message"&&typeof n.text=="string"&&n.text.trim().length>0)return[cl(n.text)];if(t.type==="item.completed"&&n.kind==="reasoning"){let l=ll(n.text);return l?[l]:[]}if(n.kind!=="activity"||typeof n.activity!="string")return[];let r=Dh[n.activity];if(!r)return[];let o="\uC2DC\uC791",s="\u2026",i={kind:"tool",tool:"",icon:s,expandable:!1};if(t.type==="item.completed"){if(n.status==="completed")o="\uC644\uB8CC",s="\u2713";else if(n.status==="failed")o="\uC2E4\uD328",s="\u2717";else return[];i.result=""}return i.tool=`${r} \xB7 ${o}`,i.icon=s,[i]}return t.type==="turn.completed"&&t.status==="completed"?[{kind:"result",success:!0,text:"DONE"}]:t.type==="turn.failed"&&(t.status==="failed"||t.status==="interrupted")&&typeof t.error_code=="string"&&t.error_code.length>0?[{kind:"error",text:t.error_code}]:[]}function Gh(e){let t=e.type;return typeof t=="string"&&(t==="error"||t.startsWith("thread.")||t.startsWith("turn.")||t.startsWith("item."))}function Kh(e){let t=e;if(typeof e=="string"){let n=e.trim();if(n.length===0)return null;try{t=JSON.parse(n)}catch{return null}}return Cn(t)?t:null}function Fd(e={}){let t=e.skip_delegated===!0,n=new Map,r={progress:null};return{push(o){let s=Kh(o);if(!s)return[];if(t&&typeof s.parent_tool_use_id=="string"&&s.parent_tool_use_id.length>0)return[];if(s.type==="system"&&s.schema!=="codex-delegation-monitor-v1")return Bh(s,r);let i=s.schema==="codex-delegation-monitor-v1"?Hh(s):Gh(s)?zh(s):Uh(s,n);return i.length>0&&(r.progress=null),i}}}function ul(e){let t=[],n=Fd(),r=Array.isArray(e)?e:[];for(let o of r)for(let s of n.push(o))t.push(s);return t}var Yh=5,Vh=10,Xh=/Task\s+#(\d+)/,Qh=/\bgh\s+pr\s+create\b|\bgit\s+push\b/,Zh=/\bnpm\s+(?:run\s+)?(?:test|tsc|lint|build)\b|\bvitest\b/;function Zo(e){return typeof e!="string"?"":(e.split(/\r?\n/).find(t=>t.trim().length>0)||"").trim()}function Jh(e){return typeof e!="string"||e.length===0?0:e.split(/\r?\n/).length}function eb(e){for(let t=e.length-1;t>=0;t-=1){let n=e[t];if(n.kind==="phase"||n.kind==="gate")return n.text||null}return null}function tb(e){let t=new Map,n=0;for(let o of e){if(o.kind!=="tool")continue;n+=1;let s=o.input||{};if(o.tool==="TaskCreate"){let a=Xh.exec(o.output||o.result||""),u=String(s.activeForm||s.subject||"").trim();if(!a||u.length===0)continue;t.set(a[1],{label:u,active:s.status==="in_progress"?n:0});continue}if(o.tool!=="TaskUpdate")continue;let i=t.get(String(s.taskId??""));if(!i)continue;let l=s.activeForm||s.subject;typeof l=="string"&&l.trim().length>0&&(i.label=l.trim()),typeof s.status=="string"&&(i.active=s.status==="in_progress"?n:0)}let r=null;for(let o of t.values())o.active>0&&(!r||o.active>r.active)&&(r=o);return r?r.label:null}function nb(e){if(e.tool==="Bash"){let t=e.command||"";return Qh.test(t)?"~ PR/\uAC8C\uC2DC \uC911":Zh.test(t)?"~ \uAC80\uC99D \uC911":null}return e.tool==="Edit"||e.tool==="Write"||e.tool==="MultiEdit"?"~ \uAD6C\uD604 \uC911":e.tool==="Read"||e.tool==="Grep"||e.tool==="Glob"?"~ \uD0D0\uC0C9 \uC911":null}function rb(e){let t=e.filter(o=>o.kind==="tool").slice(-Vh),n=new Map;t.forEach((o,s)=>{let i=nb(o);if(!i)return;let l=n.get(i)||{count:0,last:-1};l.count+=1,l.last=s,n.set(i,l)});let r=null;for(let[o,s]of n)(!r||s.count>r.count||s.count===r.count&&s.last>r.last)&&(r={label:o,count:s.count,last:s.last});return r?r.label:null}function ob(e){let t=eb(e);if(t)return{text:t,guess:!1};let n=tb(e);if(n)return{text:n,guess:!1};let r=rb(e);return r?{text:r,guess:!0}:null}function sb(e,t){if(typeof e!="number")return"";let n=Math.max(0,Math.floor((t-e)/1e3));return n<60?`${n}\uCD08 \uC804`:rn(e,t)}function io(e,t={}){let{transport:n,sessionLogStore:r,onClose:o}=t,s=null,i=null,l=null,a=null,u=null,d=!1,f={},g=!0,m=new Set,$=new Set,O=null,B=null,Y=!1,J=!1,X=!1,F=null,L=null;function M(){Y=!1,J=!1,X=!1,F=null,L=null}async function N(V){if(n){J=!0,X=!1,Oe();try{let j=await Promise.resolve(n("get-attempt-prompt",{attempt_id:V,...u?{root_dir:u}:{}}));if(s!==V)return;!j||typeof j!="object"||Array.isArray(j)?X=!0:(F=j,L=V)}catch{s===V&&(X=!0)}finally{s===V&&(J=!1,Oe())}}}function W(){if(Y=!Y,Y&&s&&L!==s){N(s);return}Oe()}function re(){if(!Y)return"";let V=so({loading:J,error:X});if(V)return c`<div class="sv__prompt" data-seam="attempt-prompt">
        ${V}
      </div>`;if(!F)return"";if(F.missing)return c`<div class="sv__prompt" data-seam="attempt-prompt">
        <div class="prompt-block__status">
          기록 없음 — 프롬프트 기록 이전에 실행된 attempt입니다
        </div>
      </div>`;let j=wi(F.recorded_at);return c`<div class="sv__prompt" data-seam="attempt-prompt">
      ${j?c`<div class="prompt-block__meta">${j} 발송</div>`:""}
      ${typeof F.task_prompt=="string"?Jn("\uACFC\uC5C5 (user)",F.task_prompt):""}
      ${typeof F.system_prompt=="string"?Jn("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",F.system_prompt):""}
    </div>`}function q(){if(!a||!r)return[];let V=r.get(a);return ul(V?V.lines:[])}function U(){if(!a||!r)return null;let V=r.get(a),j=V?V.last_event_at:null;return typeof j=="number"?j:null}function Q(){return f.status==="running"}function ne(){if(Q()&&s){B||(B=setInterval(()=>Oe(),1e3));return}we()}function we(){B&&(clearInterval(B),B=null)}function ve(V){let j=[],De=0;for(;De<V.length;){let{idx:lt,line:Qe}=V[De];if(Qe.kind==="tool"){let w=De;for(;w<V.length&&V[w].line.kind==="tool"&&V[w].line.tool===Qe.tool;)w+=1;if(w-De>=Yh&&!$.has(lt)){j.push({kind:"group",idx:lt,tool:Qe.tool||"",lines:V.slice(De,w)}),De=w;continue}}j.push({kind:"line",idx:lt,line:Qe}),De+=1}return j}function le(V){let j=[],De=new Map;for(let w=0;w<V.length;w+=1){let H=V[w],Ce=H.parent_tool_use_id;if(typeof Ce=="string"&&Ce.length>0){let Ee=De.get(Ce);Ee||(Ee={kind:"subagent",idx:w,launch_id:Ce,agent_type:null,header:null,lines:[]},De.set(Ce,Ee),j.push(Ee)),Ee.lines.push({idx:w,line:H});continue}if(H.kind==="tool"&&H.tool==="Agent"&&typeof H.launch_id=="string"&&H.launch_id.length>0){let Ee=D(H),je=De.get(H.launch_id);if(je){je.header={idx:w,line:H},je.agent_type=Ee;continue}let Xe={kind:"subagent",idx:w,launch_id:H.launch_id,agent_type:Ee,header:{idx:w,line:H},lines:[]};De.set(H.launch_id,Xe),j.push(Xe);continue}j.push({kind:"entry",idx:w,line:H})}let lt=[],Qe=0;for(;Qe<j.length;){if(j[Qe].kind!=="entry"){lt.push(j[Qe]),Qe+=1;continue}let w=Qe;for(;w<j.length&&j[w].kind==="entry";)w+=1;lt.push(...ve(j.slice(Qe,w))),Qe=w}return lt}function D(V){let j=V.input;return j&&typeof j.subagent_type=="string"?j.subagent_type:null}function $e(V){for(let j=V.length-1;j>=0;j-=1){let De=V[j];if(De.kind==="result"||De.kind==="error")return null;if(De.kind==="tool"&&!Object.hasOwn(De,"result"))return De}return null}function Ae(V){for(let j=V.length-1;j>=0;j-=1)if(V[j].kind==="thinking")return V[j];return null}function T(V,j){if(j.kind==="gate")return c`<div class="sv__gate">${j.text}</div>`;if(j.kind==="phase")return c`<div class="sv__phase">${j.text}</div>`;if(j.kind==="result")return c`<div
        class="sv__result${j.success?" sv__result--ok":" sv__result--fail"}"
      >
        <span class="sv__result-glyph">${j.success?"\u2713":"\u2717"}</span>
        <span class="sv__result-body"
          >${cr(j.text||(j.success?"DONE":"\uC2E4\uD328"))}</span
        >
      </div>`;if(j.kind==="thinking"){let De=m.has(V);return c`<div
        class="sv__think${De?" sv__think--expanded":""}"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>Ge(V)}
      >
        <span class="sv__think-line">💭 ${Zo(j.text)}</span>
        ${De?c`<pre class="sv__think-expand">${j.text}</pre>`:""}
      </div>`}if(j.kind==="user"){let De=m.has(V);return c`<div
        class="sv__line sv__line--user${De?" sv__line--expanded":""}"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>Ge(V)}
      >
        <span class="sv__user-line">▷ ${Zo(j.text)}</span>
        ${De?c`<pre class="sv__user-expand">${j.text}</pre>`:""}
      </div>`}if(j.kind==="error")return c`<div class="sv__error">⛔ ${j.text}</div>`;if(j.kind==="blocker")return c`<div class="sv__error">⛔ ${j.text}</div>`;if(j.kind==="tool"){let De=m.has(V),lt=j.tool==="Bash"?Jh(j.command):0,Qe=j.tool==="Bash"?lt>1?Zo(j.command):j.command:j.path||j.command||"";return c`<div
        class="sv__tool${De?" sv__tool--expanded":""}"
        role="button"
        tabindex="0"
        @click=${()=>Ge(V)}
      >
        <span class="sv__tool-line">
          <span class="sv__tool-icon">${j.icon}</span>
          <span class="sv__tool-name">${j.tool}</span>
          ${Qe?c`<span class="sv__tool-detail">${Qe}</span>`:""}
          ${lt>1?c`<span class="sv__tool-more">⋯ ${lt}줄</span>`:""}
          ${typeof j.added=="number"?c`<span class="sv__diff-add">+${j.added}</span>`:""}
          ${typeof j.removed=="number"?c`<span class="sv__diff-del">−${j.removed}</span>`:""}
          ${j.result?c`<span class="sv__tool-ok">→ ${j.result}</span>`:""}
        </span>
        ${De?c`<pre class="sv__tool-expand">${Z(j)}</pre>`:""}
      </div>`}return c`<div class="sv__as">${cr(j.text||"")}</div>`}function Z(V){let j=[];if(V.tool==="Bash"&&typeof V.command=="string"&&V.command.length>0)j.push(V.command);else if(V.input!==void 0)try{j.push(`input: ${JSON.stringify(V.input,null,2)}`)}catch{}return typeof V.output=="string"&&V.output.length>0&&j.push(`output:
${V.output}`),j.join(`

`)}function Re(){if(!s)return c``;let V=q(),j=(i?[f.agent_type,f.model,f.effort]:[f.runner,f.model,f.effort]).filter(Boolean).join(" \xB7 "),De=f.session_id||"",lt=`\uB77C\uC774\uBE0C \uB530\uB77C\uAC00\uAE30 ${g?"ON":"OFF"}`,Qe=Q(),w=Qe?sb(U(),Date.now()):"",H=Qe?$e(V):null,Ce=Qe?Ae(V):null,Ee=ob(V);return c`<div class="sv" data-attempt-id=${s}>
      <div class="sv__bar">
        <span class="sv__id"
          >${f.label||(i?f.role||"":s)}</span
        >
        ${Ee?c`<span
              class="sv__stage${Ee.guess?" sv__stage--guess":""}"
              title=${Ee.text}
              >${Ee.text}</span
            >`:""}
        ${Qe?c`<span
              class="sv__live"
              title="세션이 진행 중입니다"
              aria-label=${w?`\uC9C4\uD589 \uC911 \xB7 \uB9C8\uC9C0\uB9C9 \uC774\uBCA4\uD2B8 ${w}`:"\uC9C4\uD589 \uC911"}
              ><span class="sv__live-dot" aria-hidden="true"></span>${w?c`<span class="sv__live-ago">${w}</span>`:""}</span
            >`:""}
        ${De?c`<button
              type="button"
              class="sv__session"
              title=${De}
              aria-label=${`\uC138\uC158 ID \uBCF5\uC0AC: ${De}`}
              @click=${()=>oe(De)}
            >
              ⧉ ${De.slice(0,8)}
            </button>`:""}
        ${f.resume_command?c`<button
              type="button"
              class="sv__resume-cmd"
              title=${f.resume_command}
              aria-label=${`\uC7AC\uAC1C \uBA85\uB839 \uBCF5\uC0AC: ${f.resume_command}`}
              @click=${()=>oe(f.resume_command||"")}
            >
              ⧉ 재개 명령
            </button>`:""}
        ${j?c`<span class="sv__meta">${j}</span>`:""}
        ${f.worktree?c`<span class="sv__wt" title=${f.worktree}
              >${f.worktree}</span
            >`:""}
        ${i||d?"":c`<button
              type="button"
              class="sv__prompt-toggle${Y?" sv__prompt-toggle--on":""}"
              data-seam="attempt-prompt-toggle"
              aria-pressed=${Y?"true":"false"}
              aria-label="발송 프롬프트 보기"
              title="이 세션에 실제로 보낸 시스템·과업 프롬프트"
              @click=${W}
            >
              ✉ 프롬프트
            </button>`}
        <button
          type="button"
          class="sv__follow${g?" sv__follow--on":""}"
          aria-pressed=${g?"true":"false"}
          aria-label=${lt}
          @click=${I}
        >
          <span class="sv__follow-full">⇣ ${lt}</span>
          <span class="sv__follow-short">⇣ ${g?"ON":"OFF"}</span>
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
      ${i||d?"":re()}
      <div class="sv__body">
        ${V.length===0?c`<div class="sv__empty">세션 로그 없음</div>`:le(V).map(je=>je.kind==="subagent"?Te(je):je.kind==="group"?fe(je):T(je.idx,je.line))}
      </div>
      ${H||Ce?c`<div class="sv__now">
            <span class="sv__now-label">지금</span>
            ${H?c`<span class="sv__now-icon">${H.icon}</span>
                  <span class="sv__now-name">${H.tool}</span>
                  <span class="sv__now-detail"
                    >${H.tool==="Bash"?Zo(H.command):H.path||H.command||""}</span
                  >`:""}
            ${Ce?c`<span class="sv__now-think"
                  >💭 ${Zo(Ce.text)}</span
                >`:""}
          </div>`:""}
    </div>`}function fe(V){return c`<div
      class="sv__group"
      role="button"
      tabindex="0"
      title="펼치기"
      @click=${()=>me(V.idx)}
    >
      <span class="sv__group-icon">${V.lines[0].line.icon}</span>
      <span class="sv__group-name">${V.tool}</span>
      <span class="sv__group-count">${V.lines.length}</span>
      <span class="sv__group-caret" aria-hidden="true">▸</span>
    </div>`}function Te(V){let j=$.has(V.idx),De=V.header?V.header.line:null,lt=De?De.is_error===!0?"\u2717":typeof De.result=="string"?"\u2713":"\u27F3":"",Qe=De&&De.command?De.command:"";return c`<div class="sv__sub${j?" sv__sub--open":""}">
      <div
        class="sv__sub-head"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>me(V.idx)}
      >
        <span class="sv__sub-icon" aria-hidden="true">🤖</span>
        <span class="sv__sub-name">${V.agent_type||"subagent"}</span>
        ${Qe?c`<span class="sv__sub-detail">${Qe}</span>`:""}
        <span class="sv__sub-count">${V.lines.length}줄</span>
        ${lt?c`<span class="sv__sub-state">${lt}</span>`:""}
        ${j?"":c`<span class="sv__sub-caret" aria-hidden="true">▸</span>`}
      </div>
      ${j?c`<div class="sv__sub-body">
            ${ve(V.lines).map(w=>w.kind==="group"?fe(w):T(w.idx,w.line))}
          </div>`:""}
    </div>`}function me(V){$.add(V),Oe()}function Oe(){rt(Re(),e),ne(),g&&it()}function it(){let V=e.querySelector(".sv__body");V&&(V.scrollTop=V.scrollHeight)}function Ge(V){m.has(V)?m.delete(V):m.add(V),Oe()}function I(){g=!g,Oe()}function oe(V){on(V).then(j=>{j?ye("\uBCF5\uC0AC\uB428","success",1200):ye("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function ie(V){!s||!V||(f={...f,...V},Oe())}function de(V){let j=V.target;if(!j||!j.classList||!j.classList.contains("sv__body"))return;!(j.scrollHeight-j.scrollTop-j.clientHeight<=4)&&g&&(g=!1,Oe())}e.addEventListener("scroll",de,!0);function be(V){let j=V.target;!j||typeof j.closest!="function"||e.contains(j)||j.closest("dialog")||j.closest(".md-viewer-root")||Pe()}let ce=!1;function Fe(){ce||(document.addEventListener("mousedown",be),ce=!0)}function ze(){ce&&(document.removeEventListener("mousedown",be),ce=!1)}function Ve(V){let j=V&&V.attempt_id;if(!j)return;let De=typeof V.launch_id=="string"&&V.launch_id.length>0?V.launch_id:null,lt=V.session_ref&&typeof V.session_ref=="object"?V.session_ref:null;if(De&&lt)return;let Qe=a;s=j,i=De,l=lt,a=i?`session-log:${s}:${i}`:`session-log:${s}`,n&&Qe&&Qe!==a&&Promise.resolve(n("unsubscribe-session-log",{id:Qe})).catch(()=>{}),u=typeof V.root_dir=="string"&&V.root_dir.length>0?V.root_dir:null,f=V.meta||{},d=V.hide_prompt===!0,g=!0,m.clear(),$.clear(),M(),!O&&r&&(O=r.subscribe(Oe)),n&&Promise.resolve(n("subscribe-session-log",{id:a,attempt_id:s,...i?{launch_id:i}:{},...l?{session_ref:l}:{},...u?{root_dir:u}:{}})).catch(()=>{}),Fe(),Oe()}function Pe(){let V=a;ze(),s=null,i=null,l=null,a=null,u=null,d=!1,m.clear(),$.clear(),M(),we(),n&&V&&Promise.resolve(n("unsubscribe-session-log",{id:V})).catch(()=>{}),rt(c``,e),o&&o()}return{open:Ve,updateMeta:ie,close:Pe,isOpen(){return s!==null},destroy(){we(),ze(),O&&(O(),O=null),e.removeEventListener("scroll",de,!0),s=null,i=null,l=null,a=null,u=null,d=!1,rt(c``,e)}}}function ib(e){return["plan_review","plan_approval","plan_check"].some(t=>{let n=e[t];return typeof n=="string"&&n.trim().length>0})}function ab(e){let t=e&&e.metadata||{},n=qr(e),r=[];return n.path&&r.push({kind:"spec",path:n.path,missing_state:n.evidence==="draft"?"spec_draft":null}),typeof t.plan_path=="string"&&t.plan_path.trim().length>0&&r.push({kind:"plan",path:t.plan_path.trim(),missing_state:ib(t)?null:"plan_pending"}),r}function jd(e,t){let n=ab(e);return c`
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
  `}var{I:Cx}=Fl;var zd=e=>e.strings===void 0;var _b={},Hd=(e,t=_b)=>e._$AH=t;var ur=fi(class extends oo{constructor(e){if(super(e),e.type!==Qn.PROPERTY&&e.type!==Qn.ATTRIBUTE&&e.type!==Qn.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!zd(e))throw Error("`live` bindings can only contain a single expression")}render(e){return e}update(e,[t]){if(t===yn||t===Lt)return t;let n=e.element,r=e.name;if(e.type===Qn.PROPERTY){if(t===n[r])return yn}else if(e.type===Qn.BOOLEAN_ATTRIBUTE){if(!!t===n.hasAttribute(r))return yn}else if(e.type===Qn.ATTRIBUTE&&n.getAttribute(r)===t+"")return yn;return Hd(e),t}});var mb=[{id:"spec",label:"spec \uB9AC\uBDF0",receipt:"spec_review",receipt_stage:null,fill_stage:"spec",stale_stage:"spec",hue:"spec"},{id:"plan",label:"\uACC4\uD68D \uB9AC\uBDF0",receipt:null,receipt_stage:"plan",fill_stage:"plan",stale_stage:"plan",hue:"plan"},{id:"impl",label:"\uAD6C\uD604",receipt:null,receipt_stage:null,fill_stage:"impl",stale_stage:null,hue:"impl"},{id:"impl_review",label:"impl \uB9AC\uBDF0",receipt:"impl_review",receipt_stage:null,fill_stage:null,stale_stage:"impl",hue:"impl"},{id:"pr",label:"PR",receipt:null,receipt_stage:null,fill_stage:"pr",stale_stage:null,hue:"pr"}],dl={quick_fix:["impl","impl_review"],spec_backed:["spec","impl","impl_review","pr"],full_plan:["spec","plan","impl","impl_review","pr"]},Gd={missing:"\uC2B9\uC778 \uD544\uC694",stale:"\uC7AC\uC2B9\uC778 \uD544\uC694",unknown:"\uC2B9\uC778 \uD655\uC778 \uBD88\uAC00"},gb={pin:"pin",global:"global",base:"base"};function hb(e){return c`<span
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
  </details>`}function vb(e){let t=[];if(e.workflow_mode&&t.push(e.workflow_mode.display),e.impl_dispatch?.value==="main")t.push("\uBA54\uC778");else if(e.impl_dispatch?.value==="delegated"){let n=e.impl_runtime?` ${e.impl_runtime.display}`:"";t.push(`\uC704\uC784${n}`)}for(let n of["impl_model","impl_effort","impl_speed"])e[n]?.resolution!=="not_applicable"&&t.push(e[n]?.display||"\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00");return t.join(" \xB7 ")}function wb(e){if(!e||typeof e!="object")return null;let{kind:t,actor:n,effort:r,sha:o}=e;return typeof t!="string"||typeof n!="string"||typeof o!="string"?null:{kind:t,actor:n,effort:typeof r=="string"?r:null,sha:o}}function Yd(e,t={}){let n=e&&typeof e.metadata=="object"&&e.metadata?e.metadata:{},r=e&&typeof e.workflow=="object"&&e.workflow?e.workflow:{},o=r.stages||{},s=r.route||n.route||null,i=typeof n.pr_url=="string"?n.pr_url:"",l=typeof n.exec_receipt=="string"?n.exec_receipt:"",a=wb(r.exec_receipt),u=a?Wn(a):l,d=a?`${a.kind}:${a.actor}`:l.split("@")[0],f=As(r.planned_execution,r.exec_receipt),g=r.chips?.pr?.number,m=typeof g=="number"?`PR #${g}`:"PR",$=To(n),O=$!==null&&t.isChipOpen?.("rec")===!0,B=O?Aa({rec:$},"rec"):null;return c`<section class="detail-summary" data-seam="detail-summary">
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
      ${$?c`<button
            type="button"
            class="detail-summary__chip detail-summary__chip--rec judgement-chip"
            data-chip-key="rec"
            data-state=${$.state}
            aria-expanded=${O?"true":"false"}
            title=${Ns($)}
            @click=${()=>t.onChipToggle?.("rec")}
          >
            ${"\uBCF5\uC7A1"}
          </button>`:""}
    </div>
    ${B?Vr(B):""}
    <div
      class="detail-summary__gates"
      role="group"
      aria-label="워크플로 게이트"
    >
      ${kb(s).map(Y=>$b(Y,n,o,{label:Y.id==="pr"?m:Y.label,href:Y.id==="pr"?i:""}))}
    </div>
  </section>`}function kb(e){let n=typeof e=="string"&&Object.hasOwn(dl,e)&&dl[e]||dl.spec_backed;return mb.filter(r=>n.includes(r.id))}var $i={on:"\uD1B5\uACFC",stale:"\uC7AC\uAC80\uD1A0 \uD544\uC694",current:"\uC9C4\uD589 \uC911",none:"\uBBF8\uB3C4\uB2EC"};function $b(e,t,n,r){let o=xb(e,t,n),s=e.fill_stage?n[e.fill_stage]:null,i=typeof s?.fill=="string"?s.fill:null,l=i?i==="full":o.length>0,a=!l&&i==="dim",u=e.stale_stage?n[e.stale_stage]?.stale===!0:!1,d=o&&o.split("@")[1]?.slice(0,7)||"",f=u?$i.stale:l?$i.on:a?$i.current:$i.none,g=Ab(e,n),m=`${r.label} \xB7 ${f}${g?` \xB7 ${g}`:""}${o?` \xB7 ${o}`:""}`,$=`detail-summary__gate${l?" detail-summary__gate--on":""}${a?" detail-summary__gate--current":""}${u?" detail-summary__gate--stale":""}${d?" detail-summary__gate--receipt":""}`,O=c`<span class="detail-summary__gate-label"
      >${r.label}</span
    >
    <span class="detail-summary__gate-rail"></span>
    <span class="detail-summary__gate-sha">${d}</span>`;return r.href?c`<a
      class=${$}
      data-gate=${e.id}
      data-hue=${e.hue}
      href=${r.href}
      target="_blank"
      rel="noreferrer"
      title=${m}
      >${O}</a
    >`:c`<span
    class=${$}
    data-gate=${e.id}
    data-hue=${e.hue}
    title=${m}
    >${O}</span
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
  </section>`}function Eb(e){return String(e||"").replace(/^docs\/(superpowers\/)?/,"")}function Tb(e){let t=/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(e);if(!t)return{front:null,body:e};let n=t[1].trim();return{front:n.length>0?n:null,body:e.slice(t[0].length)}}function Si(e,t){let n=t.getWorkspacePath,r=t.fetchImpl||globalThis.fetch?.bind(globalThis),o=null,s="loading",i="",l=null,a="";function u(O){O.key==="Escape"&&o&&(O.preventDefault(),m())}document.addEventListener("keydown",u);function d(){return o?c`
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
    `:c``}function f(){rt(d(),e)}async function g(O,B={}){o=O,s="loading",i="",l=null,a="",f();let Y=B.workspace||(n?n():"");if(!Y){s="error",a="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4",f();return}if(!r){s="error",a="fetch\uB97C \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",f();return}let J="/api/doc?workspace="+encodeURIComponent(Y)+"&path="+encodeURIComponent(O);try{let X=await r(J),F=await X.json().catch(()=>({}));if(!X.ok||!F||F.ok!==!0){if(F?.error==="not_found"&&B.missing_state==="plan_pending"){s="pending",a="\uACC4\uD68D \uC791\uC131 \uC804 \xB7 \uACBD\uB85C\uB9CC \uC608\uC57D\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4",f();return}s="error",a="\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 ("+String(F&&F.error||X.status)+")",f();return}let L=Tb(String(F.content||""));l=L.front,i=L.body,s="ready",f()}catch{s="error",a="\uBB38\uC11C \uC694\uCCAD \uC2E4\uD328",f()}}function m(){o=null,rt(c``,e)}function $(){document.removeEventListener("keydown",u),m()}return{open:g,close:m,destroy:$}}var Cb=[{key:"input_tokens",label:"\uC785\uB825"},{key:"output_tokens",label:"\uCD9C\uB825"},{key:"cache_read_input_tokens",label:"\uCE90\uC2DC \uC77D\uAE30"}],rp="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4",Ei=[{role:"implementation",provider:"codex"},{role:"review-consult",provider:"codex"},{role:"subagent",provider:"claude"}],Rb=new Set(["codex-runner","Explore","Plan","advisor","advisor-xhigh","claude-code-guide","statusline-setup"]);function tp(e){return typeof e=="string"&&Rb.has(e)}var Ob=["running","done","failed","interrupted"],Lb={running:"\u25CF",done:"\u2713",failed:"\u2717",interrupted:"\u26A0"};function Ib(e){return typeof e=="number"&&Number.isFinite(e)?e:0}function Mb(e){let t=en(e);if(t.length>0)return t.map(o=>c`<span class="detail-usage-total" title=${o.tooltip}
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
  </button>`}function jb(e,t){return e.role===t.role&&(e.model===null||t.model===void 0||e.model===t.model)&&e.session_id===t.session_id}function Bb(e,t,n){let r=[],o=new Set,s=Array.isArray(e.delegation_sessions)?e.delegation_sessions:[];for(let d of s){let f=Nb(d);!f||o.has(f.launch_id)||tp(f.agent_type)||(o.add(f.launch_id),r.push(f))}r.sort((d,f)=>(d.started_at||0)-(f.started_at||0));let i={};for(let{role:d,provider:f}of Ei){let g=t?t.roles[d]?.[f]:null;i[d]=g?[...g.legs]:[]}let l=Ei.flatMap(({role:d})=>i[d]),a=new Set,u=[];for(let{role:d,provider:f}of Ei){for(let g of r.filter(m=>m.role===d&&m.provider===f)){let m=l.find($=>$.receipt_id===g.launch_id)||null;m&&!jb(g,m)||(m&&a.add(m.receipt_id),u.push(Fb(g,m,e.attempt_id,n)))}for(let g of i[d])!a.has(g.receipt_id)&&!tp(g.agent_type)&&u.push(qb(d,f,g))}return u}function Ub(e,t){let n=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?e.total_cost_usd:null,r=[...Cb,{key:"cache_creation_input_tokens",label:t==="codex"?"\uCE90\uC2DC \uC4F0\uAE30":"\uCE90\uC2DC \uC0DD\uC131"},...t==="codex"&&typeof e.reasoning_output_tokens=="number"&&Number.isFinite(e.reasoning_output_tokens)?[{key:"reasoning_output_tokens",label:"\uCD94\uB860 \uCD9C\uB825"}]:[]];return c`<div class="detail-session__usage-detail">
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
  </div>`}function op(e,t={},n={},r=[]){let o=Array.isArray(e)?e:[],s=Array.isArray(r)?r:[],i=[...s.filter(m=>m&&m.current===!0),...s.filter(m=>m&&m.current!==!0).sort((m,$)=>$.index-m.index)],l=i.map(m=>Gb(m,t)),a=n.expanded||new Set;if(o.length===0&&i.length===0)return c`
      <div class="detail-section-label">세션 이력</div>
      <div class="detail-empty" data-seam="session-history">세션 이력 없음</div>
    `;let u=new Set;for(let m of o)m&&typeof m.resumed_from=="string"&&m.resumed_from.length>0&&u.add(m.resumed_from);let d=m=>{if(!(m.status==="failed"||m.status==="orphaned"))return"";let O=typeof m.session_id=="string"&&m.session_id.length>0,B=u.has(m.attempt_id),Y=O&&!B,J=O?B?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":"\uC774 \uC138\uC158\uC744 \uAC19\uC740 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C \uC774\uC5B4\uC11C \uC9C4\uD589":"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00";return c`<button
      type="button"
      class="detail-session__resume"
      data-attempt-id=${m.attempt_id}
      ?disabled=${!Y}
      title=${J}
      @click=${X=>{X.stopPropagation(),Y&&t.onResume&&t.onResume(m.attempt_id)}}
    >
      ↻ 이어하기
    </button>`},f=m=>{if(!(m.status==="failed"||m.status==="orphaned")||typeof m.cause!="string"||m.cause==="")return"";let O=m.cause_detail,B=O&&typeof O.reason=="string"&&O.reason.length>0?typeof O.command=="string"&&O.command.length>0?`${O.reason} \xB7 ${O.command}`:O.reason:m.cause;return c`<div class="detail-session__cause" title=${B}>
      ${m.cause}
    </div>`},g=m=>{let $=np(la(m));if(en($).length===0&&!Kr(m.usage))return"";let O=a.has(m.attempt_id);return c`<button
      type="button"
      class="detail-session__usage-toggle"
      data-attempt-id=${m.attempt_id}
      aria-expanded=${O?"true":"false"}
      title=${O?"\uD1A0\uD070 \uB0B4\uC5ED \uC811\uAE30":"\uD1A0\uD070 \uB0B4\uC5ED \uD3BC\uCE58\uAE30"}
      @click=${B=>{B.stopPropagation(),t.onToggleUsage&&t.onToggleUsage(m.attempt_id)}}
    >
      τ 자세히
    </button>`};return c`
    <div class="detail-section-label">
      세션 이력${Mb(n.total)}
    </div>
    <div class="detail-sessions" data-seam="session-history">
      ${l}${o.map(m=>{let $=la(m),O=np($),B=en(O);return c`<div class="detail-session-row">
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
            ${B.length>0?c`<span class="detail-session__role">orchestrator</span>`:""}
            ${m.session_id?c`<span class="detail-session__sid" title=${m.session_id}
                  >${String(m.session_id).slice(0,8)}</span
                >`:""}
            ${B.length>0?B.map(Y=>c`<span
                      class="detail-session__usage"
                      title=${Y.tooltip}
                      >${Y.label}</span
                    >`):Kr(m.usage)?c`<span class="detail-session__usage"
                    >${Kr(m.usage)}</span
                  >`:""}
            <span class="detail-session__time">${Jo(m.started_at)}</span>
          </button>
          ${g(m)} ${d(m)} ${f(m)} ${zb(m)}
          ${a.has(m.attempt_id)&&m.usage?Ub(m.usage,m.runner==="codex"?"codex":"claude"):""}
          ${Bb(m,$,t)}
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
  `}var Yb=["open","in_progress","deferred","resolved","closed"],Vb=[0,1,2,3,4];function lp(e,t){let n=t.issueStores,r=t.onClose,o=t.transport,s=t.onNavigate,i=t.queueStore,l=t.execPresetStore,a=t.sessionLogStore,u=null,d=null,f={},g="",m=!1,$=[],O=!1,B={},Y={claude:null,codex:null},J=null,X=null,F=0,L=!1,M=!1,N="",W="",re="",q="",U=!1;function Q(){L=!1,M=!1,N="",W="",re="",q="",U=!1}function ne(){Y={claude:null,codex:null},J=null,X=null,F+=1}async function we(){if(!o)return null;try{let k=await Promise.resolve(o("get-workspace-accounts",{}));return k&&typeof k.state=="string"?k:null}catch{return null}}async function ve(k){try{let P=await fetch(k);if(!P.ok)return null;let z=await P.json();if(!z||typeof z!="object"||!Array.isArray(z.accounts))return null;let ke=z.accounts.filter(tt=>tt!==null&&typeof tt=="object"&&!Array.isArray(tt));return{accounts:ke,active:ke.find(tt=>tt.active===!0)||null}}catch{return null}}async function le(k){X=k;let P=++F,[z,ke,tt]=await Promise.all([ve("/api/claude-usage"),ve("/api/codex-usage"),we()]);P!==F||k!==u||(Y={claude:z,codex:ke},J=tt,st())}let D=[],$e=null,Ae=null,T=!1,Z="",Re=!1,fe=0,Te=new Set;function me(){D=[],$e=null,Ae=null,T=!1,Z="",Re=!1,fe+=1,Te.clear()}async function Oe(k){if(!o)return;let P=++fe;try{let z=await Promise.resolve(o("get-comments",{id:k}));if(P!==fe||k!==u)return;D=Array.isArray(z)?z:[],T=!1}catch{if(P!==fe||k!==u)return;T=!0}st()}function it(){if(!o||!u)return;let k=d&&typeof d.comment_count=="number"?d.comment_count:null;if($e!==u){$e=u,Ae=k,Oe(u);return}k!==null&&k!==Ae&&(Ae=k,Oe(u))}function Ge(k){Te.has(k)?Te.delete(k):Te.add(k),st()}function I(k){let P=Z.trim().length===0;Z=k,P!==(k.trim().length===0)&&st()}async function oe(){let k=Z.trim();if(!o||!u||k.length===0||Re)return;let P=u;Re=!0,st();let z=!1;try{let ke=await Promise.resolve(o("add-comment",{id:P,text:k}));Array.isArray(ke)&&ke.length>0&&(z=!0,P===u&&(D=ke,T=!1,Z="",Ae=ke.length))}catch{z=!1}z||ye("\uB313\uAE00 \uCD94\uAC00 \uC2E4\uD328","error"),P===u&&(Re=!1),st()}let ie={onToggle:Ge,onDraftInput:I,onSubmit:oe},de=t.mdViewer||null,be=null;de||(be=document.createElement("div"),be.className="md-viewer-root",document.body.appendChild(be));let ce=de||Si(be,{getWorkspacePath:t.getWorkspacePath||(()=>"")}),Fe=document.createElement("div");Fe.className="session-log-root",document.body.appendChild(Fe);let ze=io(Fe,{transport:o?(k,P)=>Promise.resolve(o(k,P)):void 0,sessionLogStore:a}),Ve=!1,Pe=!1,V=!1,j=null,De=null,lt=0;function Qe(k){return`${t.getWorkspacePath&&t.getWorkspacePath()||""}::${k}`}function w(){Ve=!1,Pe=!1,V=!1,j=null,De=null,lt+=1}async function H(k){if(!o)return;let P=++lt;Pe=!0,V=!1,st();try{let z=await Promise.resolve(o("get-bead-prompt",{bead_id:k}));if(P!==lt)return;!z||typeof z!="object"||Array.isArray(z)?V=!0:(j=z,De=Qe(k))}catch{P===lt&&(V=!0)}finally{P===lt&&(Pe=!1,st())}}let Ce=[],Ee=null,je=0;function Xe(k,P){return`${t.getWorkspacePath&&t.getWorkspacePath()||""}::${k}::${P}`}function dt(){Ce=[],Ee=null,je+=1}async function xt(k,P){if(!o)return;let z=++je,ke;try{ke=await Promise.resolve(o("get-session-refs",{bead_id:k}))}catch{ke=null}z!==je||P!==Ee||(Ce=ke&&Array.isArray(ke.sessions)?ke.sessions:[],st())}function Ct(){if(!o||!u)return;let k=d&&d.metadata,P=k&&typeof k=="object"&&typeof k.session_ref=="string"?k.session_ref:null;if(P===null){dt();return}let z=Xe(u,P);Ee!==z&&(Ce=[],Ee=z,xt(u,z))}let St=[],mt=[],ut=Cr,vt=null,Rt=0;function Je(k){return`${t.getWorkspacePath&&t.getWorkspacePath()||""}::${k}`}function b(){St=[],mt=[],ut=Cr,vt=null,Rt+=1}async function S(k,P){if(!o)return;let z=++Rt,ke;try{ke=await Promise.resolve(o("get-bead-timeline",{bead_id:k}))}catch{ke=null}z!==Rt||P!==vt||(St=ke&&Array.isArray(ke.events)?ke.events:[],mt=ke&&Array.isArray(ke.attempts)?ke.attempts:[],ut=Cr,st())}function te(){if(!o||!u)return;let k=Je(u);vt!==k&&(St=[],mt=[],ut=Cr,vt=k,S(u,k))}function ee(){ut+=Cr,st()}function _e(){if(Ve=!Ve,Ve&&u&&De!==Qe(u)){j=null,H(u);return}st()}function Ue(){let k={};for(let z of mt)z&&typeof z=="object"&&z.bead_id===u&&(k[String(z.attempt_id)]=z);let P=i?i.get():null;for(let z of P&&P.attempts?Object.values(P.attempts):[]){let ke=z;ke&&ke.bead_id===u&&(k[String(ke.attempt_id)]=ke)}return k}function Se(){return u?Object.values(Ue()).sort((P,z)=>(z.started_at||0)-(P.started_at||0)).map(P=>({attempt_id:P.attempt_id,bead_id:P.bead_id,status:P.status,started_at:typeof P.started_at=="number"?P.started_at:null,runner:P.runner||null,model:P.model||null,effort:P.effort||P.observed_effort||null,speed:P.speed||null,session_id:P.session_id||null,resumed_from:P.resumed_from||null,continuation_mode:P.continuation_mode||null,dismissed_at:typeof P.dismissed_at=="number"?P.dismissed_at:null,cause:typeof P.cause=="string"?P.cause:null,cause_detail:P.cause_detail||null,exec_default_preset_id:typeof P.exec_default_preset_id=="string"?P.exec_default_preset_id:null,exec_default_preset_revision:typeof P.exec_default_preset_revision=="number"?P.exec_default_preset_revision:null,exec_values:P.exec_values&&typeof P.exec_values=="object"?P.exec_values:null,usage:P.usage||null,usage_legs:Array.isArray(P.usage_legs)?P.usage_legs:[],delegation_sessions:Array.isArray(P.delegation_sessions)?P.delegation_sessions:[]})):[]}function Ne(){return u?Gn(Ue(),u):null}let Ze=new Set;function _t(k){Ze.has(k)?Ze.delete(k):Ze.add(k),st()}function Be(k){let P=i?i.get():null,z=P&&P.attempts?P.attempts[k]:null;ze.open({attempt_id:k,meta:z?{runner:z.runner||void 0,model:z.model||void 0,effort:z.effort||void 0,status:z.status||void 0,session_id:z.session_id||void 0}:{}})}function ft(k,P){let z=i?i.get():null,ke=z&&z.attempts?z.attempts[k]:null,nt=(ke&&Array.isArray(ke.delegation_sessions)?ke.delegation_sessions:[]).find(ht=>ht&&typeof ht=="object"&&ht.launch_id===P);nt&&ze.open({attempt_id:k,launch_id:P,meta:{runner:nt.provider==="claude"?"claude":"codex",role:nt.role,...typeof nt.agent_type=="string"?{agent_type:nt.agent_type}:{},model:nt.model,effort:nt.effort,session_id:nt.session_id,status:nt.status}})}async function qt(k){if(!o||!k)return;let P=await zr();if(P===null)return;let z=()=>{let ht=i?i.get():null;return ht&&typeof ht.revision=="number"?ht.revision:0},ke=async(ht={},Ye=z())=>await o("worker-attempt-resume",{attempt_id:k,expected_revision:Ye,...P!==""?{instructions:P}:{},...ht}),tt=ht=>{ht?.queue&&i?.set&&i.set(ht.queue)},nt=await ke();if(tt(nt),nt&&nt.conflict){let ht=nt.queue&&typeof nt.queue.revision=="number"?nt.queue.revision:z();nt=await ke({},ht),tt(nt)}nt=await zn(nt,(ht,Ye)=>ke({continuation:ht,decision_token:Ye}),{onResult:tt,refresh:()=>ke()}),nt&&nt.resumed===!1&&!nt.conflict&&nt.reason&&ye(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${nt.reason}`,"error",2400)}function Ft(k){!k||!u||ze.open(Hr(k,u,d&&d.status))}let Xt={onOpen:Be,onOpenDelegation:ft,onResume:qt,onToggleUsage:_t,onOpenSessionRef:Ft,onCopyResumeCommand:p};function kt(){let k=i?i.get():null,P={...B};for(let z of["orchestration_model","orchestration_effort","orchestration_speed"]){let ke=k&&k[z];typeof ke=="string"&&(P[z]=ke)}return P}async function et(){if(o){try{let k=await Promise.resolve(o("get-session-defaults",{}));B=k&&k.values&&typeof k.values=="object"?k.values:{}}catch{B={}}st()}}function Pt(){let k=i?i.get():null;return k&&k.runner_catalog||null}function Qt(){let k=i?i.get():null;return k&&typeof k.execution_defaults=="object"?k.execution_defaults:null}function tn(){let k=d?.metadata&&typeof d.metadata=="object"?d.metadata:{},z=mn({pin:{...k,...f},global:kt(),execution_defaults:Qt(),runner_catalog:Pt(),route:typeof k.route=="string"?k.route:null}).orchestration_model.value||"";return xn(Pt(),z)}function zt(){let k=l?l.get():null;return!k||typeof k.revision!="number"?null:{revision:k.revision,presets:Array.isArray(k.presets)?k.presets:[]}}function jt(k){return k?.compatible===!1}function un(k){l&&k&&typeof k.revision=="number"&&Array.isArray(k.presets)&&l.set({revision:k.revision,presets:k.presets})}async function Mt(){let k=zt(),P=k?.presets.find(z=>z.id===g);if(!(!o||!u||!k||!P||jt(P)||m)){m=!0,$=[],st();try{let z=await Promise.resolve(o("apply-impl-preset",ru(u,P.id,k.revision)));if(z&&z.conflict){un(z),ye("\uD504\uB9AC\uC14B\uC774 \uBCC0\uACBD\uB410\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uBAA9\uB85D\uC5D0\uC11C \uB2E4\uC2DC \uC801\uC6A9\uD558\uC138\uC694.","error",4e3);return}let ke=z&&Array.isArray(z.issue)?z.issue[0]:z?.issue;if(z&&z.applied&&ke&&typeof ke=="object"){d=ke,$=Array.isArray(z.skipped_orchestration_keys)?z.skipped_orchestration_keys.filter(tt=>typeof tt=="string"):[];for(let tt of ou)delete f[tt];ye($.length>0?"\uC2E4\uD589 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4. \uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 3\uD0A4\uB294 Bead\uC5D0 \uD540\uD560 \uC218 \uC5C6\uC5B4 \uAC74\uB108\uB6F0\uC5C8\uC2B5\uB2C8\uB2E4.":"\uC2E4\uD589 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4.","success",4e3);return}z&&z.error==="bd_readback_failed"?ye("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):ye("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}catch(z){z&&typeof z=="object"&&z.code==="bd_readback_failed"?ye("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):ye("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}finally{m=!1,st()}}}let Kt=null;n&&n.subscribe&&(Kt=n.subscribe(()=>y()));let Bt=null;i&&typeof i.subscribe=="function"&&(Bt=i.subscribe(()=>{u&&st()}));let Zt=null,pe=null;function C(){pe&&(pe(),pe=null)}l&&typeof l.subscribe=="function"&&(Zt=l.subscribe(()=>{u&&st()}));function ge(k){k.key==="Escape"&&u&&(k.preventDefault(),r())}document.addEventListener("keydown",ge);let ue=Yr(()=>st());ue.attach();function y(){if(u){if(n&&typeof n.snapshotFor=="function"){let k=n.snapshotFor("detail:"+u)||[];d=k.find(z=>z&&z.id===u)||k[0]||d}it(),Ct(),te(),st()}}function p(k){on(k).then(P=>{P?ye("\uBCF5\uC0AC\uB428","success",1200):ye("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function _(k){k.preventDefault(),k.stopPropagation(),u&&p(u)}function E(k,P){k.preventDefault(),k.stopPropagation(),p(P)}function G(k,P,z){k.preventDefault(),k.stopPropagation(),ce.open(P,{missing_state:z})}async function K(k,P){let z=Object.hasOwn(f,k),ke=f[k];if(f[k]=P,st(),!(!o||!u))try{let tt=await Promise.resolve(o("update-exec-settings",nu(u,k,P.length===0?null:P))),nt=Array.isArray(tt)?tt[0]:tt;if(!nt||typeof nt!="object"||!nt.id)throw new Error("exec settings readback failed");d=nt,delete f[k],st()}catch(tt){throw z?f[k]=ke:delete f[k],st(),ye("\uC2E4\uD589 \uC124\uC815 \uBCC0\uACBD \uC2E4\uD328","error"),tt}}function se(k){k.catch(()=>{})}async function xe(k,P){let z=d||{},ke=z.metadata&&typeof z.metadata=="object"?z.metadata:{},tt={};for(let Ye of["impl_runtime","impl_model","impl_effort"])tt[Ye]=Object.hasOwn(f,Ye)?f[Ye]:typeof ke[Ye]=="string"?ke[Ye]:"";tt[k]=P;let nt=au(tt,Pt(),tn()),ht={};for(let Ye of["impl_runtime","impl_model","impl_effort"])ht[Ye]=f[Ye],f[Ye]=nt[Ye]||"";if(st(),!(!o||!u))return Promise.resolve(o("update-impl-target",{id:u,...nt,orchestration_runtime:tn()})).then(Ye=>{let ct=Array.isArray(Ye)?Ye[0]:Ye;if(!ct||typeof ct!="object"||!ct.id)throw new Error("implementation target readback failed");d=ct;for(let kn of["impl_runtime","impl_model","impl_effort"])delete f[kn];st()}).catch(Ye=>{for(let ct of["impl_runtime","impl_model","impl_effort"])ht[ct]===void 0?delete f[ct]:f[ct]=ht[ct];throw st(),ye("\uAD6C\uD604 target \uBCC0\uACBD \uC2E4\uD328","error"),Ye})}async function Ke(k,P,z){if(!o||!u)return!1;try{let ke=await Promise.resolve(o(k,P)),tt=Array.isArray(ke)?ke[0]:ke;return tt&&typeof tt=="object"&&tt.id?(d=tt,!0):(ye(z,"error"),!1)}catch(ke){return ke&&typeof ke=="object"&&ke.code==="bd_readback_failed"?(ye("\uC800\uC7A5\uB410\uC73C\uB098 \uD655\uC778 \uC2E4\uD328 \u2014 \uACE7 \uAC31\uC2E0\uB429\uB2C8\uB2E4","error"),{ok:!1,saved:!0}):(ye(z,"error"),!1)}}function ot(k){setTimeout(()=>{try{let P=e.querySelector(k);P&&typeof P.focus=="function"&&P.focus()}catch{}},0)}function yt(){L=!0,N=d&&d.title||"",st(),ot('.detail-edit__input[data-edit="title"]')}function gt(k){N=k.target.value}function x(){L=!1,N="",st()}function A(){Ke("edit-text",{id:u,field:"title",value:N},"\uC81C\uBAA9 \uC800\uC7A5 \uC2E4\uD328").then(P=>{P===!0&&(L=!1,N=""),st()})}function Ie(){M=!0,W=d&&d.description||"",st(),ot('.detail-edit__textarea[data-edit="description"]')}function qe(k){W=k.target.value}function h(){M=!1,W="",st()}function v(){Ke("edit-text",{id:u,field:"description",value:W},"\uC124\uBA85 \uC800\uC7A5 \uC2E4\uD328").then(P=>{P===!0&&(M=!1,W=""),st()})}function R(k,P,z,ke){if(k.key==="Escape"){k.stopPropagation(),z();return}k.key==="Enter"&&(!ke||k.ctrlKey||k.metaKey)&&(k.preventDefault(),P())}function ae(k){let P=k.target.value;Ke("update-status",{id:u,status:P},"\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328").then(()=>st())}function he(k){let P=Number(k.target.value);Ke("update-priority",{id:u,priority:P},"\uC6B0\uC120\uC21C\uC704 \uBCC0\uACBD \uC2E4\uD328").then(()=>st())}function Le(k){re=k.target.value}function He(){let k=re.trim();k.length!==0&&Ke("label-add",{id:u,label:k},"\uB77C\uBCA8 \uCD94\uAC00 \uC2E4\uD328").then(P=>{P===!0&&(re=""),st()})}function $t(k){if(k.key==="Escape"){k.stopPropagation(),re="",st();return}k.key==="Enter"&&(k.preventDefault(),He())}function Ut(k){Ke("label-remove",{id:u,label:k},"\uB77C\uBCA8 \uC81C\uAC70 \uC2E4\uD328").then(()=>st())}let Jt={onCopyPath:E,onOpenDoc:G};function dn(k){return typeof k=="string"?k:k&&typeof k=="object"?String(k.id||k.to||k.issue_id||k.depends_on||""):""}function qn(k){return k&&typeof k=="object"?String(k.dependency_type||k.type||""):""}function On(k){switch(k){case"discovered-from":return{glyph:"\u21A9 ",relation:"\uBC1C\uACAC"};case"parent-child":return{glyph:"\u2338 ",relation:"\uC0C1\uC704"};case"related":return{glyph:"\u2194 ",relation:"\uAD00\uB828"};default:return k.length>0?{glyph:`${k} `,relation:k}:{glyph:"",relation:""}}}function wn(k,P){let z=Fn(P),ke=[];return k.length>0&&ke.push(k),z&&ke.push(z),ke.length>0?ke.join(`
`):void 0}function Fn(k){if(!k||typeof k!="object")return;let P=typeof k.status=="string"?k.status:"",z=typeof k.title=="string"?k.title:"";return P.length>0&&z.length>0?`${P} \xB7 ${z}`:void 0}function Yt(){return(t.getWorkspacePath&&t.getWorkspacePath()||"").trim()}function er(){return t.depCandidates?t.depCandidates():null}async function Ln(k,P,z){let ke=Yt(),tt=u;if(!tt)return;if(ke.length===0){ye("\uB808\uD3EC\uB97C \uC54C \uC218 \uC5C6\uC5B4 \uC758\uC874\uC744 \uBC14\uAFC0 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error");return}let nt=await Ke(k,{a:tt,b:P,view_id:tt,root_dir:ke},z),ht=nt===!0||nt!==!1&&nt.saved===!0;ht&&t.onDepChanged&&t.onDepChanged({type:k,a:tt,b:P}),k==="dep-add"&&ht&&(q="",U=!1),st()}function tr(k){if(!u)return;let P=globalThis.confirm;typeof P=="function"&&!P(`${k}\uAC00 ${u}\uB97C \uB9C9\uB294 \uC5F0\uACB0\uC744 \uB04A\uC744\uAE4C\uC694?`)||Ln("dep-remove",k,"\uC758\uC874 \uD574\uC81C \uC2E4\uD328")}function In(k){k.disabled||Ln("dep-add",k.bead_id,"\uC758\uC874 \uCD94\uAC00 \uC2E4\uD328")}function jn(k){q=k.target.value,U=!0,st()}function _r(){U||(U=!0,st())}function We(k,P){if(k.key==="Escape"){k.stopPropagation(),q="",U=!1,st();return}k.key==="Enter"&&(k.preventDefault(),P.length===1&&!P[0].disabled&&In(P[0]))}function Dt(k){return c`<div class="detail-dep-add">
      <input
        class="detail-dep-add__input"
        aria-label="막는 이슈 추가"
        placeholder="막는 이슈 추가"
        .value=${q}
        @focus=${_r}
        @input=${jn}
        @keydown=${P=>We(P,k)}
      />
      ${U||q.length>0?c`<div class="detail-dep-add__list">
            ${k.length===0?c`<div class="detail-dep-add__empty">후보 없음</div>`:k.map(P=>c`<button
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
    </div>`}function bn(k,P){let z=P.get(k.id),ke=s?c`<button
          type="button"
          class="detail-dep__link"
          title=${nn(k.title)}
          @click=${()=>z===void 0?s(k.id):s(k.id,z)}
        >
          ${k.label}
        </button>`:c`<span class="detail-dep__link" title=${nn(k.title)}
          >${k.label}</span
        >`;return c`<span
      class=${`detail-dep detail-dep--${k.kind}${s?" detail-dep--link":""}`}
      >${ke}${k.kind==="pred"?c`<button
            type="button"
            class="detail-dep__unlink"
            data-dep-b=${k.id}
            aria-label=${"\uC758\uC874 \uD574\uC81C: "+k.id}
            @click=${()=>tr(k.id)}
          >
            ✕
          </button>`:""}</span
    >`}function lo(k){let P=Array.isArray(k.dependencies)?k.dependencies:[],z=Array.isArray(k.dependents)?k.dependents:[],ke=[];for(let Ye of P){let ct=dn(Ye);ct.length>0&&qn(Ye)==="blocks"&&ke.push({id:ct,label:`\u26D3 ${ct}`,kind:"pred",title:wn("\uB9C9\uB294",Ye)})}for(let Ye of z){let ct=dn(Ye);ct.length>0&&qn(Ye)==="blocks"&&ke.push({id:ct,label:`\u2192 ${ct}`,kind:"succ",title:wn("\uB9C9\uD788\uB294",Ye)})}for(let Ye of P){let ct=dn(Ye),kn=qn(Ye);if(ct.length>0&&kn!=="blocks"){let Tl=On(kn);ke.push({id:ct,label:`${Tl.glyph}${ct}`,kind:"other",title:wn(Tl.relation,Ye)})}}let tt=er(),nt=new Map;if(tt)for(let Ye of tt.issues)nt.has(Ye.bead_id)||nt.set(Ye.bead_id,Ye.root_dir);let ht=tt&&u?rd(nd(u,tt),q):[];return c`
      <div class="detail-section-label">의존성</div>
      ${ke.length===0?c`<div class="detail-empty">의존성 없음</div>`:c`<div class="detail-deps">
            ${ke.map(Ye=>bn(Ye,nt))}
          </div>`}
      ${tt===null?c`<div class="detail-empty">후보를 불러올 수 없음</div>`:Dt(ht)}
    `}function os(k){let P=k.metadata||{},z=k.workflow||{},ke=z.stages||{},tt=ke.spec&&ke.spec.stale,nt=ke.impl&&ke.impl.stale,ht=z.quick_fix_review?.state==="stale",Ye=ke.plan||null,ct=z.route_source==="derived",kn=z.route||P.route||"\u2014";return c`
      <div class="detail-section-label">워크플로우</div>
      <div class="detail-kv">
        <span class="detail-kv__k">route</span>
        <span
          class="detail-kv__v${ct?" detail-kv__v--derived":""}"
          title=${ct?"route \uBBF8\uD540 (metadata unset)":"route"}
          >${ct?"unset":kn}</span
        >
      </div>
      ${z.route!=="quick_fix"||Object.hasOwn(P,"spec_review")?c`<div class="detail-kv">
            <span class="detail-kv__k">spec_review</span>
            <span class="detail-kv__v"
              >${P.spec_review||"\uC5C6\uC74C"}${tt?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${z.route==="full_plan"?c`<div class="detail-kv">
              <span class="detail-kv__k">plan_review</span>
              <span class="detail-kv__v">${Ye?.receipt||"\uC5C6\uC74C"}</span>
            </div>
            <div class="detail-kv">
              <span class="detail-kv__k">plan_approval</span>
              <span class="detail-kv__v"
                >${Ye?.approval_receipt||"\uC5C6\uC74C"}${Ye?.approval_state==="stale"?" \xB7 stale":Ye?.approval_state==="unknown"?" \xB7 unknown":""}</span
              >
            </div>`:""}
      ${z.route!=="quick_fix"||Object.hasOwn(P,"impl_review")?c`<div class="detail-kv">
            <span class="detail-kv__k">impl_review</span>
            <span class="detail-kv__v"
              >${P.impl_review||"\uC5C6\uC74C"}${nt?" \xB7 stale":""}</span
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
      ${z.route==="quick_fix"||Object.hasOwn(P,"quick_fix_review")?c`<div class="detail-kv">
            <span class="detail-kv__k">quick_fix_review</span>
            <span class="detail-kv__v"
              >${P.quick_fix_review||"\uC5C6\uC74C"}${ht?" \xB7 stale":""}</span
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
              >${Wn(z.exec_receipt)}</span
            >
          </div>`:""}
      ${z.impl_entry?c`<div class="detail-kv">
            <span class="detail-kv__k">impl_entry</span>
            <span class="detail-kv__v"
              >${`${z.impl_entry.actor}@${z.impl_entry.sha}`}</span
            >
          </div>`:""}
      ${P.pr_url?c`<div class="detail-kv">
            <span class="detail-kv__k">pr_url</span>
            <span class="detail-kv__v detail-kv__v--wrap">${P.pr_url}</span>
          </div>`:""}
    `}let ss={route:["quick_fix","spec_backed","full_plan"]};async function co(k,P){let z=P.target.value;if(k==="route"&&d&&d.metadata&&d.metadata.route==="full_plan"&&z!=="full_plan"&&!window.confirm(`full_plan \u2192 ${z||"(\uBBF8\uC124\uC815)"} \uC804\uD658: \uC800\uC7A5\uB41C plan \uC2B9\uC778\uC740 \uD3EC\uAE30\uB418\uBA70, plan \uD30C\uC77C\xB7\uB9C8\uCEE4 \uC815\uB9AC\uB294 \uC138\uC158 \uACC4\uC57D\uC774 \uC218\uD589\uD569\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`)){st();return}await Ke("update-workflow-meta",{id:u,key:k,value:z},"\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uBA54\uD0C0 \uBCC0\uACBD \uC2E4\uD328"),st()}function is(k){let P=k.metadata||{};return c` ${((ke,tt)=>{let nt=ss[ke],ht=typeof P[ke]=="string"?P[ke]:"";return c`<div class="detail-kv">
        <span class="detail-kv__k">${ke}</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label=${ke}
          data-edit=${`wfmeta-${ke}`}
          @change=${Ye=>co(ke,Ye)}
        >
          <option value="" ?selected=${!nt.includes(ht)}>
            ${tt}
          </option>
          ${nt.map(Ye=>c`<option value=${Ye} ?selected=${ht===Ye}>${Ye}</option>`)}
        </select>
      </div>`})("route","(unset)")} `}function Me(k,P){return L?c`
        <div class="detail-edit">
          <input
            class="detail-edit__input"
            data-edit="title"
            aria-label="제목 편집"
            .value=${N}
            @input=${gt}
            @keydown=${z=>R(z,A,x,!1)}
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
        <h2 class="detail-overlay__title">${k}</h2>
        ${en(P).map(z=>c`<span class="detail-usage-total" title=${z.tooltip}
              >${z.label}</span
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
    `}function Et(k){let P=Gt(k.created_at),z=Gt(k.updated_at);return!P&&!z?c``:c`
      ${P?c`<div class="detail-kv">
            <span class="detail-kv__k">생성</span>
            <span class="detail-kv__v detail-kv__v--time">${P}</span>
          </div>`:""}
      ${z?c`<div class="detail-kv">
            <span class="detail-kv__k">수정</span>
            <span class="detail-kv__v detail-kv__v--time">${z}</span>
          </div>`:""}
    `}function Ht(k,P){return c`
      <div class="detail-section-label">속성 (수정 가능)</div>
      <div class="detail-kv">
        <span class="detail-kv__k">status</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label="status"
          data-edit="status"
          @change=${ae}
        >
          ${Yb.map(z=>c`<option value=${z} ?selected=${z===k}>${z}</option>`)}
        </select>
      </div>
      <div class="detail-kv">
        <span class="detail-kv__k">priority</span>
        <select
          class="detail-kv__v"
          aria-label="priority"
          data-edit="priority"
          @change=${he}
        >
          ${Vb.map(z=>c`<option value=${String(z)} ?selected=${z===P}>
                P${z}
              </option>`)}
        </select>
      </div>
    `}function Gf(k){return c`
      <div class="detail-title-row">
        <div class="detail-overlay__section-label">설명</div>
        ${M?"":c`<button
              type="button"
              class="detail-edit-btn"
              data-edit="description"
              aria-label="설명 편집"
              @click=${Ie}
            >
              ✎
            </button>`}
      </div>
      ${M?c`<div class="detail-edit">
            <textarea
              class="detail-edit__textarea"
              data-edit="description"
              aria-label="설명 편집"
              rows="6"
              .value=${W}
              @input=${qe}
              @keydown=${P=>R(P,v,h,!0)}
            ></textarea>
            <div class="detail-edit__actions">
              <button
                type="button"
                class="detail-edit__save"
                data-edit="description-save"
                @click=${v}
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
            ${k||"(\uC124\uBA85 \uC5C6\uC74C)"}
          </div>`}
    `}function Kf(k){let P=typeof k.notes=="string"?k.notes:"";return P.trim().length===0?c``:c`
      <div class="detail-overlay__section-label">노트</div>
      <div class="detail-overlay__notes">${P}</div>
    `}function Yf(k){let P=Array.isArray(k.labels)?k.labels:[];return c`
      <div class="detail-section-label">라벨</div>
      <div class="detail-labels">
        ${P.map(z=>c`<span class="detail-label-chip"
              >${z}<button
                type="button"
                class="detail-label-chip__x"
                data-label=${z}
                aria-label=${"\uB77C\uBCA8 \uC81C\uAC70: "+z}
                @click=${()=>Ut(z)}
              >
                ×
              </button></span
            >`)}
        <span class="detail-label-add">
          <input
            class="detail-label-add__input"
            aria-label="라벨 추가"
            placeholder="라벨 추가"
            .value=${re}
            @input=${Le}
            @keydown=${$t}
          />
          <button
            type="button"
            class="detail-label-add__btn"
            @click=${He}
          >
            추가
          </button>
        </span>
      </div>
    `}function Vf(){if(!u)return c``;let k=d||{},P=String(k.id||u),z=k.title||"(\uC81C\uBAA9 \uC5C6\uC74C)",ke=Ne(),tt=k.status||"open",nt=typeof k.priority=="number"?Math.max(0,Math.min(4,k.priority)):"",ht=k.description||"",Ye={...k,metadata:{...k.metadata||{},...f}};return c`
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
          ${Me(z,ke)}
          ${Yd(Ye,{onChipToggle:ct=>ue.toggle({bead_id:P,chip_key:ct}),isChipOpen:ct=>ue.isOpen({bead_id:P,chip_key:ct})})}
          ${Kd({metadata:Ye.metadata,workspace_values:kt(),catalog:Pt(),execution_defaults:Qt(),expanded:O,presets:zt()?.presets||[],preset_id:g,preset_busy:m,skipped_orchestration_keys:$},{onToggle:ct=>{O=ct,st()},onEdit:(ct,kn)=>{if(ct==="impl_runtime"||ct==="impl_model"||ct==="impl_effort"){se(xe(ct,kn??""));return}se(K(ct,kn??""))},onPresetSelect:ct=>{g=ct,$=[],st()},onPresetApply:()=>{Mt()}})}
          ${ep({md:Ye.metadata,catalog:Y,workspace_defaults:J,handlers:{onExecChange:(ct,kn)=>se(K(ct,kn))}})}
          ${Ht(tt,nt)} ${Et(k)}
          ${Gf(ht)}
          ${Wd(D,ie,{expanded:Te,draft:Z,sending:Re,error:T})}
          ${Kf(k)} ${Yf(k)} ${lo(k)}
          ${os(k)} ${is(k)}
          ${jd(k,Jt)}
          ${sp({expanded:Ve,loading:Pe,error:V,data:j},{onToggle:_e})}
          ${op(Se(),Xt,{total:ke,expanded:Ze},Ce)}
          ${ap({events:St,shown:ut},{onMore:ee})}
        </div>
      </div>
    `}function st(){rt(Vf(),e)}return{load(k){k!==u&&(f={},g="",$=[],O=!1,Q(),me(),w(),dt(),b(),ne()),u=k,d=null,!pe&&t.subscribeCandidates&&(pe=t.subscribeCandidates(()=>{u&&st()})),y(),et(),X!==k&&le(k)},clear(){u=null,d=null,f={},g="",m=!1,$=[],O=!1,Q(),me(),w(),dt(),b(),ne(),C(),ce.close(),ze.close(),rt(c``,e)},destroy(){Kt&&(Kt(),Kt=null),Bt&&(Bt(),Bt=null),Zt&&(Zt(),Zt=null),C(),document.removeEventListener("keydown",ge),ue.detach(),de||(ce.destroy(),be&&be.parentNode&&be.parentNode.removeChild(be)),ze.destroy(),Fe.parentNode&&Fe.parentNode.removeChild(Fe),u=null,d=null,ne(),g="",m=!1,$=[],me(),w(),dt(),b(),rt(c``,e)}}}function cp(e){let t=document.createElement("dialog");t.id="fatal-error-dialog",t.setAttribute("role","alertdialog"),t.setAttribute("aria-modal","true"),t.innerHTML=`
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
    </div>`,e.appendChild(t);let n=t.querySelector("#fatal-error-title"),r=t.querySelector("#fatal-error-message"),o=t.querySelector("#fatal-error-detail"),s=t.querySelector("#fatal-error-reload"),i=t.querySelector("#fatal-error-close"),l=()=>{if(typeof t.close=="function")try{t.close()}catch{}t.removeAttribute("open")},a=(u,d,f="")=>{n&&(n.textContent=u||"Unexpected Error"),r&&(r.textContent=d||"An unrecoverable error occurred.");let g=typeof f=="string"?f.trim():"";if(o&&(g.length>0?(o.textContent=g,o.removeAttribute("hidden")):(o.textContent="No additional diagnostics available.",o.setAttribute("hidden",""))),typeof t.showModal=="function")try{t.showModal(),t.setAttribute("open","")}catch{t.setAttribute("open","")}else t.setAttribute("open","")};return s&&s.addEventListener("click",()=>{window.location.reload()}),i&&i.addEventListener("click",()=>l()),t.addEventListener("cancel",u=>{u.preventDefault(),l()}),{open:a,close:l,getElement(){return t}}}var Xb="(max-width: 640px)";function Ti(e){if(typeof window.matchMedia!="function")return e(!1),()=>{};let t=window.matchMedia(Xb),n=!!t.matches;e(n);let r=o=>{let i=!!(typeof o=="object"&&o!==null&&typeof o.matches=="boolean"?o.matches:t.matches);i!==n&&(n=i,e(i))};return typeof t.addEventListener=="function"?(t.addEventListener("change",r),()=>{t.removeEventListener("change",r)}):typeof t.addListener=="function"?(t.addListener(r),()=>{typeof t.removeListener=="function"&&t.removeListener(r)}):()=>{}}function Qb(){return{lanes:{done:!0},areas:{}}}function es(e){let t={};if(typeof e!="object"||e===null)return t;for(let[n,r]of Object.entries(e))typeof r=="boolean"&&(t[n]=r);return t}function Zb(e){try{let t=window.localStorage.getItem(e);if(!t)return null;let n=JSON.parse(t);if(typeof n!="object"||n===null)return null;let r=n;return typeof r.lanes=="object"&&r.lanes!==null?{lanes:es(r.lanes),areas:es(r.areas)}:{lanes:es(r),areas:{}}}catch{return null}}function up(e,t){try{window.localStorage.setItem(e,JSON.stringify(t))}catch{}}function Ci(e,t=Qb()){let n={lanes:es(t.lanes),areas:es(t.areas)},r=Zb(e),o={lanes:{...n.lanes,...r?r.lanes:{}},areas:{...n.areas,...r?r.areas:{}}};return{isCollapsed(s){return o.lanes[s]===!0},isAreaCollapsed(s){return o.areas[s]===!0},toggle(s){let i=o.lanes[s]!==!0;return o={...o,lanes:{...o.lanes,[s]:i}},up(e,o),i},toggleArea(s){let i=o.areas[s]!==!0;return o={...o,areas:{...o.areas,[s]:i}},up(e,o),i}}}function ml(e){if(typeof e=="string"&&e.length>0)return e;if(e&&typeof e=="object"){let t=e;if(typeof t.message=="string"&&t.message.length>0)return t.message;if(typeof t.error=="string"&&t.error.length>0)return t.error;if(t.error&&typeof t.error=="object"&&typeof t.error.message=="string")return t.error.message}return"\uC694\uCCAD\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4"}function Ri(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"&&t.length>0):[]}function Oi(e){let{transport:t,console_el:n,getLanes:r,getWorkspaces:o,getCrossLanes:s,reproject:i,onCorrection:l,showToast:a,requestRender:u,adoptQueue:d,onDragBegin:f,candidate_drop:g}=e,m=[],$=null,O=!1,B=null,Y=null,J=null;function X(){B!==null&&clearTimeout(B),B=setTimeout(()=>{B=null,O=!1},0)}function F(){return s()??null}function L(){let I=new Map,oe=o();for(let ie of Array.isArray(oe)?oe:[]){if(!ie||typeof ie!="object")continue;let de=ie.bead_blocked_by&&typeof ie.bead_blocked_by=="object"?ie.bead_blocked_by:{};for(let[be,ce]of Object.entries(de))Array.isArray(ce)&&I.set(be,Ri(ce));for(let be of[...Array.isArray(ie.runnable)?ie.runnable:[],...Array.isArray(ie.session_active)?ie.session_active:[]])be&&typeof be.bead_id=="string"&&Array.isArray(be.blocked_by)&&be.blocked_by.length>0&&I.set(be.bead_id,Ri(be.blocked_by))}return I}function M(){let I=new Map,oe=new Map,ie=o();for(let de of Array.isArray(ie)?ie:[]){if(!de||typeof de!="object")continue;let be=de.bead_blocked_by&&typeof de.bead_blocked_by=="object"?de.bead_blocked_by:{};for(let[ce,Fe]of Object.entries(be))Array.isArray(Fe)&&I.set(ce,Ri(Fe));for(let ce of Array.isArray(de.runnable)?de.runnable:[])ce&&typeof ce.bead_id=="string"&&Array.isArray(ce.blocked_by)&&oe.set(ce.bead_id,Ri(ce.blocked_by))}for(let de of m)for(let be of[I,oe]){let ce=be.get(de.a);ce!==void 0&&be.set(de.a,de.type==="dep-remove"?ce.filter(Fe=>Fe!==de.b):ce.includes(de.b)?ce:[...ce,de.b])}return{snapshot:I,runnable:oe}}function N(){let I=L();for(let oe of m){let ie=(I.get(oe.a)||[]).slice();oe.type==="dep-remove"?I.set(oe.a,ie.filter(de=>de!==oe.b)):ie.includes(oe.b)||I.set(oe.a,[...ie,oe.b])}return I}function W(I=r(),oe=F()){let ie=new Map;for(let Pe of Array.isArray(oe?.lanes)?oe.lanes:[]){let V=new Map;for(let j of Array.isArray(Pe?.entries)?Pe.entries:[])j&&typeof j.bead_id=="string"&&V.set(j.bead_id,j.dep_created_by_lane===!0);ie.set(typeof Pe?.id=="string"?Pe.id:"",V)}let de=new Map,be=new Map,ce=new Set,Fe=new Set;for(let Pe of I.chain_lanes){let V=ie.get(Pe.lane_id);de.set(Pe.lane_id,{status:Pe.status,entries:Pe.rows.map((j,De)=>({bead_id:j.id,root_dir:j.root_dir,...De===0?{}:{dep_created_by_lane:V?.get(j.id)===!0}}))});for(let j of Pe.rows)be.set(j.id,Pe.lane_id),j.fixed&&ce.add(j.id),j.unplaced||Fe.add(j.id)}let ze=new Map;for(let Pe of I.parallel_rows)typeof Pe.queue_index=="number"&&ze.set(Pe.id,Pe.queue_index);for(let Pe of I.queue_groups)for(let V of Pe.sublanes.serial)for(let j of V.items)typeof j.queue_index=="number"&&ze.set(j.id,j.queue_index);let Ve=M();return{blocked_by_map:N(),snapshot_blocked_by:Ve.snapshot,runnable_blocked_by:Ve.runnable,owner_of:new Map(Object.entries(I.owner_of)),cross_lanes:de,owner_lane_of:be,fixed_members:ce,placed_members:Fe,parallel_rows:I.parallel_rows.map(Pe=>({bead_id:Pe.id,root_dir:Pe.root_dir,queue_index:Pe.queue_index??0})),parallel_raw_length:new Map(Object.entries(I.parallel_raw_length)),queue_index_of:ze}}function re(I,oe){let ie=r();for(let be of[...ie.runnable,...ie.queue,...ie.running,...ie.pr_wait,...ie.done])if(!(be.non_occupying||be.id!==oe)){if(be.root_dir===I)return be.expected_revision;break}let de=ie.queue_groups.find(be=>be.root_dir===I);return de?de.revision:0}async function q(I,oe,ie,de){if(!t)return null;let ce=await t(I,{...oe,...ie?{root_dir:ie}:{},expected_revision:de});if(ce&&ce.conflict){ce.queue&&d?.(ie,ce.queue);let Fe=ce.queue&&typeof ce.queue.revision=="number"?ce.queue.revision:de;ce=await t(I,{...oe,...ie?{root_dir:ie}:{},expected_revision:Fe})}return ce&&ce.queue&&d?.(ie,ce.queue),ce}async function U(I,oe,ie,de,be){try{let ce=await q(I,oe,ie,de.get(ie)??re(ie,be.bead_id));return!ce||typeof ce.applied!="boolean"?(a("\uD050 \uC694\uCCAD\uC774 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error"),null):(ce.queue&&typeof ce.queue.revision=="number"&&de.set(ie,ce.queue.revision),ce.conflict?(a("\uD050\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD574 \uC8FC\uC138\uC694","error"),null):ce.applied===!1?(a(ce.admission_reason?`\uD050 \uC801\uC7AC \uAC70\uBD80: ${ce.admission_reason}`:"\uD050 \uC694\uCCAD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4","error"),null):ce.queue&&typeof ce.queue.revision=="number"?ce.queue.revision:de.get(ie)??0)}catch(ce){return a(ml(ce),"error"),null}}async function Q(I,oe,ie=new Map){if(I.type==="worker-queue-disarm"){try{let de=await q(I.type,I.payload,I.root_dir,ie.get(I.root_dir)??re(I.root_dir,oe));de&&de.queue&&typeof de.queue.revision=="number"&&ie.set(I.root_dir,de.queue.revision)}catch{}return!0}if(I.type==="worker-queue-place"||I.type==="worker-queue-reorder"||I.type==="worker-queue-remove")return await U(I.type,I.payload,I.root_dir,ie,{bead_id:oe})!==null;try{return(I.type==="dep-add"||I.type==="dep-remove")&&t&&await t(I.type,{a:I.a,b:I.b,...I.root_dir?{root_dir:I.root_dir}:{}}),!0}catch(de){return a(ml(de),"error"),!1}}function ne(I){(I.type==="dep-add"||I.type==="dep-remove")&&(m=[...m,{type:I.type,a:I.a,b:I.b}])}async function we(I,oe){if(!t)return{ok:!1};try{let ie=await t(I.type,{...I.payload,expected_revision:oe});return!ie||typeof ie.revision!="number"?(a("\uC5F0\uACB0 \uB808\uC778 \uC751\uB2F5\uC5D0 revision\uC774 \uC5C6\uC2B5\uB2C8\uB2E4","error"),{ok:!1}):{ok:!0,revision:ie.revision}}catch(ie){let de=ie,be=de&&de.code==="conflict"?de.details?.cross_lanes:null;return be&&typeof be.revision=="number"&&Array.isArray(be.lanes)?{ok:!1,conflict:be}:(a(ml(ie),"error"),{ok:!1})}}async function ve(I,oe,ie){let de=new Map,be=[],ce=I.ops.slice(0,I.lane_op_index),Fe=I.ops.slice(I.lane_op_index);for(let Ve of ce){if(!await Q(Ve,ie,de))return{done:!0};ne(Ve)}let ze=oe;for(let Ve of I.lane_ops){if(ze===null)return a("\uC5F0\uACB0 \uB808\uC778 \uC800\uC7A5\uC18C\uB97C \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error"),{done:!0};let Pe=await we(Ve,ze);if(!Pe.ok)return Pe.conflict?{done:!1,conflict:Pe.conflict}:{done:!0};ze=Pe.revision}for(let Ve of Fe){if(!await Q(Ve,ie,de))return{done:!0};ne(Ve),Ve.type==="dep-add"&&be.push(Ve)}for(let Ve of ed(be))ze=await le(Ve,ze);return{done:!0}}async function le(I,oe){if(oe===null||!t)return oe;let ie=I.pairs,de=oe;for(let be=0;be<2;be+=1){if(ie.length===0)return de;try{let ce=await t("monitor-lane-provenance",{lane_id:I.lane_id,pairs:ie.map(Fe=>({bead_id:Fe.bead_id,after:Fe.after,value:!0})),expected_revision:de});return ce&&typeof ce.revision=="number"?ce.revision:de}catch(ce){let Fe=ce,ze=Fe&&Fe.code==="conflict"?Fe.details?.cross_lanes:null;if(!ze||typeof ze.revision!="number"||!Array.isArray(ze.lanes))return de;let Ve=ze.lanes.find(Pe=>Pe&&Pe.id===I.lane_id);ie=td(Array.isArray(Ve?.entries)?Ve.entries:[],ie),de=ze.revision}}return de}async function D(I,oe,ie=[]){m=ie,l("",0);let de=r(),be=F();for(let ce=0;;ce+=1){let Fe=I(W(de,be));if("refused"in Fe){a(Fe.refused,"error");break}let ze=await ve(Fe,de.cross_lanes_revision,oe);if(ze.done){Fe.correction&&l(Fe.correction.lane_id,Fe.correction.corrected);break}if(ce>=1){a("\uB808\uC778\uC774 \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4","error");break}let Ve=i(ze.conflict);de=Ve.lanes,be=Ve.raw_lanes}m=[],u()}async function $e(I,oe){await D(ie=>ci(I,oe,ie),I.bead_id)}function Ae(I,oe){let ie=oe&&typeof oe.closest=="function"?oe.closest("[data-row-index]"):null;if(ie&&I.contains(ie)){let de=Number(ie.getAttribute("data-row-index"));return Number.isFinite(de)?de:0}return I.querySelectorAll("[data-row-index]").length}function T(I){let oe=typeof I?.closest=="function"?I.closest(".worker-pane--collapsed[data-lane]"):null;if(!oe)return null;let ie=oe.getAttribute("data-lane");return ie==="queue"?{zone:oe,target:{kind:"parallel",marker_index:r().parallel_rows.length}}:ie==="candidate"&&g===!0?{zone:oe,target:{kind:"candidate"}}:null}function Z(I){let oe=I.target;if(!$)return null;let ie=typeof oe?.closest=="function"?oe.closest("[data-drop]"):null;if(!ie)return T(oe);let de=ie.getAttribute("data-drop");if(de==="candidate")return{zone:ie,target:{kind:"candidate"}};if(de==="parallel")return{zone:ie,target:{kind:"parallel",marker_index:Ae(ie,oe)}};if(de==="chain")return{zone:ie,target:{kind:"chain",lane_id:ie.getAttribute("data-lane-id")||"",marker_index:Ae(ie,oe)}};if(de==="repo-serial"){let be=ie.getAttribute("data-root-dir")||"";if(be!==$.root_dir)return null;let ce=typeof oe?.closest=="function"?oe.closest("[data-queue-index]"):null,Fe=ce&&ie.contains(ce)?ce.getAttribute("data-queue-index"):ie.getAttribute("data-lane-length"),ze=Number(Fe);return{zone:ie,target:{kind:"repo-serial",root_dir:be,lane_id:ie.getAttribute("data-lane-id")||"",index:Number.isFinite(ze)?ze:0}}}return null}function Re(){for(let I of Array.from(n.querySelectorAll(".is-drop-over")))I.classList.remove("is-drop-over")}function fe(I){Y=I.target instanceof Element?I.target:null}function Te(I){let oe=I.target,ie=typeof oe?.closest=="function"?oe.closest('[draggable="true"][data-bead-id]'):null,de=ie?ie.closest("[data-drag-kind]"):null;if(!de)return;if(ie&&Y&&ie.contains(Y)&&typeof Y.closest=="function"&&Y.closest("input, button, a")){I.preventDefault();return}let be=de.getAttribute("data-bead-id")||"",ce=de.getAttribute("data-drag-kind")||"",Fe=de.getAttribute("data-root-dir")||"";if(!be||!ce)return;let ze=de.getAttribute("data-queue-index")||"",Ve=Number(ze),Pe=de.getAttribute("data-lane-id")||"";$={kind:ce,bead_id:be,root_dir:Fe,...ze!==""&&Number.isFinite(Ve)?{queue_index:Ve}:{},...Pe?{lane_id:Pe}:{}},O=!0,f?.(),n.classList.add("is-dragging");try{I.dataTransfer?.setData("text/plain",be),I.dataTransfer&&(I.dataTransfer.effectAllowed="move")}catch{}}function me(I){let oe=Z(I);oe&&(I.preventDefault(),I.dataTransfer&&(I.dataTransfer.dropEffect="move"),oe.zone.classList.add("is-drop-over"))}function Oe(I){let oe=I.target;typeof oe?.closest=="function"&&(oe.closest("[data-drop]")?.classList.remove("is-drop-over"),oe.closest(".worker-pane--collapsed")?.classList.remove("is-drop-over"))}function it(){$=null,Re(),n.classList.remove("is-dragging"),X()}function Ge(I){let oe=Z(I),ie=$;$=null,Re(),n.classList.remove("is-dragging"),!(!oe||!ie)&&(I.preventDefault(),$e(ie,oe.target))}return{attach(I){J||(J=I,I.addEventListener("pointerdown",fe),I.addEventListener("dragstart",Te),I.addEventListener("dragover",me),I.addEventListener("dragleave",Oe),I.addEventListener("drop",Ge),I.addEventListener("dragend",it))},detach(){B!==null&&(clearTimeout(B),B=null);let I=J;J=null,I&&(I.removeEventListener("pointerdown",fe),I.removeEventListener("dragstart",Te),I.removeEventListener("dragover",me),I.removeEventListener("dragleave",Oe),I.removeEventListener("drop",Ge),I.removeEventListener("dragend",it))},isDragging(){return $!==null},consumeClickSuppression(){let I=O;return O=!1,I},applyDrop:$e,runPlanned:D,dropModel:W,sendOp:Q,sendQueueCas:U,rememberDep:ne}}var gl=Object.freeze({repo_ops_worktree_unowned:"\uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC\uAC00 \uC544\uC9C1 Worker \uC18C\uC720\uAC00 \uC544\uB2C8\uC5B4\uC11C \uC2A4\uD06C\uB9BD\uD2B8 \uC2E4\uD589 \uC804\uC5D0 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4.",verify_cmd_failed:"\uBA38\uC9C0 \uD6C4 \uAC80\uC99D \uBA85\uB839\uC774 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",gh_observation_failed:"GitHub\uC5D0\uC11C PR \uC0C1\uD0DC\uB97C \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",verify_script_failure:"\uAC80\uC99D \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",deploy_script_failure:"\uBC30\uD3EC \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",interrupted_without_terminal_exit:"\uC791\uC5C5\uC774 \uC885\uB8CC \uAE30\uB85D \uC5C6\uC774 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4.",manual_target_missing:"\uC218\uB3D9 \uBC30\uD3EC \uAE30\uB85D\uC5D0 \uD540\uB41C \uB300\uC0C1 SHA\uAC00 \uC5C6\uC5B4 \uC2E4\uD589\uD558\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4.",base_unresolved:"PR\uC774 \uC5B4\uB290 base \uBE0C\uB79C\uCE58\uB85C \uBA38\uC9C0\uB418\uB294\uC9C0 \uD655\uC815\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_ref_unobserved:"PR\uC758 base \uBE0C\uB79C\uCE58\uB97C \uC544\uC9C1 \uAD00\uCE21\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",merge_sha_unobserved:"\uBA38\uC9C0 \uCEE4\uBC0B SHA\uB97C \uC544\uC9C1 \uAD00\uCE21\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_fetch_failed:"\uC6D0\uACA9 base \uBE0C\uB79C\uCE58\uB97C fetch\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_rev_unavailable:"fetch\uD55C \uC6D0\uACA9 base \uBE0C\uB79C\uCE58\uC758 \uCEE4\uBC0B\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_ff_diverged:"\uB85C\uCEEC base \uBE0C\uB79C\uCE58\uAC00 \uC6D0\uACA9\uACFC \uAC08\uB77C\uC838 fast-forward\uB85C \uC815\uB82C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",deployment_target_not_covering_merge:"\uBC30\uD3EC \uB300\uC0C1 base\uAC00 \uC774 \uBA38\uC9C0 \uCEE4\uBC0B\uC744 \uD3EC\uD568\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.",deployment_candidate_ancestry_check_failed:"\uBC30\uD3EC \uB300\uC0C1 base\uAC00 \uC774 \uBA38\uC9C0 \uCEE4\uBC0B\uC744 \uD3EC\uD568\uD558\uB294\uC9C0 \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",verify_red:"\uBA38\uC9C0 \uD6C4 \uAC80\uC99D\uC774 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",cleanup_failed:"\uBA38\uC9C0 \uD6C4 \uC815\uB9AC\uAC00 \uB05D\uB098\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",retry_exhausted:"\uC790\uB3D9 \uC7AC\uC2DC\uB3C4\uB97C \uBAA8\uB450 \uC4F0\uACE0\uB3C4 \uAC19\uC740 \uC2E4\uD328\uAC00 \uC774\uC5B4\uC84C\uC2B5\uB2C8\uB2E4.",conflict_unresolved:"\uCDA9\uB3CC \uD574\uC18C\uAC00 \uB05D\uB098\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",internal_record_failed:"Worker \uB0B4\uBD80 \uAE30\uB85D\uC774 \uC2E4\uD328\uD574 \uC9C4\uD589\uC744 \uBA48\uCDC4\uC2B5\uB2C8\uB2E4.",foreign_landing_unpinned:"\uB2E4\uB978 \uC800\uC7A5\uC18C \uCC29\uC9C0\uC778\uB370 foreign_repo\xB7foreign_path\xB7foreign_base \uD540\uC774 \uC5C6\uAC70\uB098 \uD615\uC2DD\uC774 \uD2C0\uB9BD\uB2C8\uB2E4.",foreign_checkout_unavailable:"\uD540\uB41C \uB300\uC0C1 \uC800\uC7A5\uC18C \uCCB4\uD06C\uC544\uC6C3\uC774 \uC5C6\uAC70\uB098 foreign_repo\uC640 \uAC19\uC740 URL\uC758 remote\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4.",foreign_deploy_unsupported:"\uB300\uC0C1 \uC800\uC7A5\uC18C\uAC00 [deploy]\uB97C \uC120\uC5B8\uD574 Worker\uAC00 \uBC30\uD3EC \uC99D\uAC70\uB97C \uB9CC\uB4E4 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4. \uC138\uC158\uC774 \uBC30\uD3EC\uC640 \uB9C8\uAC10\uC744 \uC18C\uC720\uD569\uB2C8\uB2E4.",repair_lane_retired:"\uC790\uB3D9 \uC218\uB9AC \uB808\uC778\uC774 \uC740\uD1F4\uD574 \uC0AC\uB78C \uCC98\uB9AC\uB85C \uB118\uC5B4\uC654\uC2B5\uB2C8\uB2E4."});var dp={verify_failed:"\uAC80\uC99D \uC2E4\uD328",verify_cmd_failed:"\uAC80\uC99D \uC2E4\uD328",verify_script_failure:"\uAC80\uC99D \uC2E4\uD328",deploy_failed:"\uBC30\uD3EC \uC2E4\uD328",deploy_script_failure:"\uBC30\uD3EC \uC2E4\uD328",interrupted_without_terminal_exit:"\uC911\uB2E8\uB428",quickfix_landing_failed:"\uCC29\uC9C0 \uC2E4\uD328",runner_exit:"\uC138\uC158 \uC2E4\uD328",session_parked:"\uC138\uC158 \uB300\uAE30",session_ended_unresolved:"\uC138\uC158 \uC885\uB8CC",prerequisite_unmet:"\uC120\uD589 \uB300\uAE30",delivery_unproven:"\uCC29\uC9C0 \uC99D\uAC70 \uBD80\uC871"};function Ii(e){return typeof e!="string"||e.length===0?[]:e.split(":").filter(t=>t.length>0)}function Li(e){for(let t of Ii(e)){if(Object.hasOwn(dp,t))return dp[t];if(t.startsWith("session_"))return"\uC138\uC158 \uC2E4\uD328"}return null}function fp(e){return Ii(e).length===0?null:Li(e)||"\uC2E4\uD328"}function Rr(e){let t=null;for(let n of Ii(e))Object.hasOwn(gl,n)&&(t=gl[n]);return t}function dr(e){let t=Li(e),n=Rr(e);return t&&n?`${t} \u2014 ${n}`:t||n?t||n:typeof e=="string"?e:""}function _p(e,t){let n=Li(e)??Li(t),r=Rr(t)??Rr(e);return n&&r?`${n} \u2014 ${r}`:n||r?n||r:typeof t=="string"?t:""}var Jb=new Set(["repo_operation_timeout_unresolved"]);function ey(e){for(let t of Ii(e))if(Jb.has(t)||t.startsWith("repo_ops_"))return!0;return!1}function ty(e,t){return t.code==="interrupted"||t.interrupted===!0||e.failure_kind==="interrupted_without_terminal_exit"||t.code==="interrupted_without_terminal_exit"}function mp(e,t){if(!e||typeof e!="object")return"";let n=e.failure;if(!n||typeof n!="object"||ey(n.code))return"";if(n.code==="timeout"){let o=Number(t);return Number.isFinite(o)&&o>0?`\uD0C0\uC784\uC544\uC6C3 ${Math.round(o/1e3)}\uCD08 \uCD08\uACFC`:"\uD0C0\uC784\uC544\uC6C3 \uCD08\uACFC"}if(ty(e,n))return"\uC885\uB8CC \uAE30\uB85D \uC5C6\uC74C \u2014 \uC911\uB2E8\uB428";let r=typeof e.elapsed_ms=="number"&&Number.isFinite(e.elapsed_ms)&&e.elapsed_ms>=0?` \xB7 ${Ar(e.elapsed_ms)}`:"";return typeof e.signal=="string"&&e.signal.length>0?`signal ${e.signal}${r}`:Number.isInteger(e.exit_code)?`exit ${e.exit_code}${r}`:""}var pp={schema_unsupported:"\uD540\uB41C \uC815\uCC45 \uC2A4\uD0A4\uB9C8\uB97C \uC9C0\uC6D0\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4."};function gp(e){if(!e||typeof e!="object")return"";let t=e.retry;if(!t||typeof t!="object")return"";if(typeof t.blocked_reason=="string"&&t.blocked_reason)return`\uC790\uB3D9 \uC7AC\uC2DC\uB3C4 \uBABB \uD568 \u2014 ${Object.hasOwn(pp,t.blocked_reason)?pp[t.blocked_reason]:t.blocked_reason}`;if(t.status==="absorbed"){let n=t.absorbed&&typeof t.absorbed=="object"?t.absorbed:null,r=dr(n?.first_failure?.code);return r?`\uC790\uB3D9 \uC7AC\uC2DC\uB3C4\uB85C \uD574\uC18C\uB428 \u2014 \uCCAB \uC2E4\uD328: ${r}`:"\uC790\uB3D9 \uC7AC\uC2DC\uB3C4\uB85C \uD574\uC18C\uB428"}if(e.state!=="failed")return"";if(t.status==="not_applicable")return"\uC7AC\uC2DC\uB3C4 \uB300\uC0C1 \uC544\uB2D8 \u2014 \uC2A4\uD06C\uB9BD\uD2B8 \uC2E4\uD589 \uC804 \uC2E4\uD328";if(t.status==="consumed"){let n=typeof t.first_fingerprint=="string"&&t.first_fingerprint?t.first_fingerprint:null;if(n===null)return"";if(n===e.failure?.fingerprint)return"\uC790\uB3D9 \uC7AC\uC2DC\uB3C4 1\uD68C \u2014 \uAC19\uC740 \uC2E4\uD328";let r=dr(t.first_failure?.code);return r?`\uC790\uB3D9 \uC7AC\uC2DC\uB3C4 1\uD68C \u2014 \uB2E4\uB978 \uC2E4\uD328: ${r}`:"\uC790\uB3D9 \uC7AC\uC2DC\uB3C4 1\uD68C \u2014 \uB2E4\uB978 \uC2E4\uD328"}return""}function ny(e){if(!Number.isFinite(e)||e<0)return"0s";let t=Math.floor(e/1e3),n=Math.floor(t/60),r=t%60;return n>0?`${n}m ${String(r).padStart(2,"0")}s`:`${r}s`}var hp=200;function ry(e){return typeof e!="string"||e.length===0?"":e.length>hp?`${e.slice(0,hp)}\u2026`:e}function oy(e){let t=e&&e.attempts>0&&e.max>0?` ${e.attempts}/${e.max}`:"",n=e&&typeof e.next_at=="number"?` \xB7 ${new Date(e.next_at).toLocaleTimeString("ko-KR",{hour:"2-digit",minute:"2-digit"})}`:"";return`\u21BB \uC7AC\uC2DC\uB3C4 \uB300\uAE30${t}${n}`}function yp(e){if(!e)return"";let t=Array.isArray(e.timeline)?e.timeline:[],n=typeof e.log_path=="string"?e.log_path:"",r=e.log_expired===!0,o=e.log_unreadable===!0;return t.length===0&&n.length===0&&!r&&!o?"":c`${t.length>0?c`<ol class="rtile__history" data-seam="tile-timeline">
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
    </div>`}function hl(e,t,n=null,r={}){let o=e.kind==="session",s=o&&Array.isArray(e.session_refs)&&e.session_refs.find(Ge=>Ge&&Ge.current===!0)||null,i=e.failed===!0,l=i&&e.failure||null,a=e.parked===!0&&!i,u=e.retry_wait===!0&&!i&&!a,d=e.waiting===!0&&!i&&!a&&!u,f=a&&e.failure||null,g=d&&e.wait||null,m=a||u||d,$=!!e.paused,O=i||m?e.status_label||(a?"\uC138\uC158 \uB300\uAE30":u?"\uC7AC\uC2DC\uB3C4 \uB300\uAE30":d?"\uC120\uD589 \uB300\uAE30":e.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328"):$?"\uC77C\uC2DC\uC815\uC9C0":typeof e.started_at=="number"?ny(t-e.started_at):"\u2014",B=e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker)?e.exec_chips:null,Y=yo(e),J=en(e.usage),X=Hn(e.usage),F=e.conflict_resolution?$?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":"\uCDA9\uB3CC \uD574\uC18C":null,L=e.base_exception||null,M=e.landing,N=e.attempt_id&&e.attempt_id===n,W=r.monitor||null,re=iy(W),q=Ks(W?.cross_lane_chip),U=W?Gs(W.dependency_chips):"",Q=ly(W,t,$,o?{updated_at:e.updated_at??null,last_event_at:s&&s.locality==="local"?s.last_event_at:null}:null),ne=o&&e.workflow?.chips?.exec_receipt||null,we=Ys(e.workflow),ve=Vs(e.rec,e.chip_popover?.chip_key==="rec"),le=e.chip_popover?Vr(e.chip_popover.content):"",D=ne?c`<span
        class="ctl-chip ctl-chip--exec-receipt"
        title=${`exec_receipt ${Wn(ne)}`}
        >${`${ne.kind}:${xs(ne)}`}</span
      >`:"",$e=s?c`<span
        class="ctl-chip ctl-chip--sref"
        title=${`${s.provider}:${s.session_id}@${s.host}${(e.session_refs||[]).length>=2?` \xB7 \uC774\uB825 ${(e.session_refs||[]).length}`:""}`}
        >${wo(s)}</span
      >`:"",Ae=re||q||we||$e||D||ve?c`<div class="rtile__meta">
          ${re}${q}${we}${$e}${D}${ve}${le}
        </div>`:"",T=l?c`<button
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
          >`:"",Re=c`${F?c`<span class="worker-mini__badge">${F}</span>`:""}${L?c`<span
        class="worker-mini__badge"
        title="이 세션의 target base가 워크스페이스 선언 base와 다릅니다"
        >${L}</span
      >`:""}${T}${Z}`,fe=o?"":to(e),Te=Ds(l?.quickfix_landing),me=Te==="settlement"?"\uC815\uC0B0 \uC7AC\uAC1C":"\uC774\uC5B4\uD558\uAE30",Oe=Te==="settlement"?"\uCC29\uC9C0 \uC815\uC0B0\uC744 \uB2E4\uC2DC \uC2E4\uD589":"\uAC19\uC740 \uC138\uC158\uC73C\uB85C \uC774\uC5B4\uC11C \uC9C4\uD589",it=e.discard?.action&&!(i&&l?.landed===!0)?c`<button
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
    class="rtile${N?" rtile--sel":""}${$?" rtile--paused":""}${i?" rtile--failed rtile--compact":""}${m?" rtile--held rtile--compact":""}${a?" rtile--parked":""}${u?" rtile--retry-wait":""}${d?" rtile--waiting":""}${o?" rtile--session":""}"
    data-bead-id=${e.bead_id}
    data-attempt-id=${e.attempt_id||""}
  >
    <div class="rtile__hd">
      <span
        class="rtile__dot${o?" rtile__dot--session":""}"
        aria-hidden="true"
      ></span>
      <span class="rtile__id" title="클릭하면 ID 복사">${e.bead_id}</span>
      ${Xs(e.priority)}${Y?c`<span class="rtile__resumed" title=${Y}>↻</span>`:""}${Re}
      <div class="rtile__hd-actions">
        ${o?c`${typeof e.started_at=="number"?c`<span class="rtile__elapsed">${O}</span>`:""}${uy(s)}<span
                class="rtile__session-badge"
                title="Worker가 아닌 세션이 in_progress로 잡은 이슈"
                >세션</span
              >`:c`<span class="rtile__elapsed">${O}</span>`}
        ${o||m?"":i?c`<button
                  type="button"
                  class="rtile__resume"
                  data-resume-kind=${Te}
                  ?disabled=${l?.resume_eligible===!1}
                  title=${l?.resume_eligible===!1?l.resume_reason||`${me} \uBD88\uAC00`:Oe}
                  aria-label=${me}
                >
                  ↻ ${me}
                </button>
                ${it}`:c`<button
                  type="button"
                  class="rtile__session"
                  title="라이브 세션 열기"
                  aria-label="라이브 세션 열기"
                >
                  ▤ 세션
                </button>
                ${$?c`<button
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
                ${it}`}
      </div>
    </div>
    <div class="rtile__title">${e.title}</div>
    ${m?dy(a?"parked":u?"retry_wait":"waiting",a?f:g,it,d?U:""):i?"":c`${Q}${e.rollup?ks(e.rollup,{parent_id:e.bead_id,expanded:e.rollup_expanded===!0,childChips:ta}):""}
            ${M?c`<div class="rtile__landing">
                  <span
                    class="merge-step${M.failed?" merge-step--failed":""}"
                    style=${`--progress: ${M.percent}%`}
                    >${M.label}${M.index>0?c`<span class="merge-step__n"
                          >${M.index}/${M.total}</span
                        >`:""}</span
                  >
                </div>`:""}
            ${U}
            ${o?Ae:re||q||we||B||ve||J.length>0||X?c`<div class="rtile__meta">
                    ${re}${q}${we}${Hs(e.exec_chips)}${ve}
                    ${J.length>0?J.map(Ge=>c`<span
                              class="worker-usage"
                              title=${Ge.tooltip}
                              >${Ge.label}</span
                            >`):X?c`<span
                            class="worker-usage"
                            title=${ko(e.usage)}
                            >${X}</span
                          >`:""}${le}
                  </div>`:""}
            ${Bs(e)} ${fe}
            <!-- 살아있음만 말하는 비의미적 액센트 (UI-58y2 데스크톱 §실행 타일).
         quick_fix landing의 실제 진행은 위의 별도 진행 줄이 소유한다.
         일시정지된 타일은 살아있지 않으므로 액센트도 없다. -->
            ${i||$?"":c`<div class="rtile__accent" aria-hidden="true"></div>`}`}
    ${sy(l,t)}
  </div>`}function py(e){let t=e.last_activity&&typeof e.last_activity=="object"?e.last_activity:null,n=Array.isArray(e.legs)?e.legs:[],r=e.dependency_chips||null;return!t&&n.length===0&&!r&&e.kind!=="session"?null:{...t?{last_activity:t}:{},...n.length>0?{legs:n}:{},...r?{dependency_chips:r}:{}}}function vp(e,t=Date.now(),n=null){let r=Array.isArray(e)?e:[];return c`<div class="worker-rungrid" id="worker-rungrid">
    ${r.length===0?c`<div class="worker-rungrid__empty">실행 세션 없음</div>`:r.map(o=>hl(o,t,n,{monitor:py(o)}))}
  </div>`}var Vt="",fy=["impl_runtime","impl_model","impl_effort"],_y=["claude_account","codex_account"],my=5,Mi=1;function fn(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function Pi(e,t){let n=t.transport,r=typeof t.root_dir=="string"&&t.root_dir.length>0?t.root_dir:null,o=t.notify||(b=>ye(b,"error",4e3)),s={},i={},l={},a=[],u=!1,d={state:"absent",values:{},warnings:[]},f={},g={},m=Promise.resolve(),$={claude:null,codex:null},O=!1,B=null,Y={},J="",X="",F=!1,L=!1,M=!1,N=null,W=!1;function re(){let b=t.queue?t.queue():null;return fn(b)?b:null}function q(){let b=re();return b?b.runner_catalog:null}function U(){let b=re();return b&&fn(b.execution_defaults)?b.execution_defaults:null}function Q(){let b=t.implPresetStore?.get();return fn(b)&&Array.isArray(b.presets)?b:null}function ne(){return r===null?{}:{root_dir:r}}async function we(b,S){return W||!n?null:await n(b,S)}function ve(b){b&&fn(b.queue)&&t.onQueueAdopt?.(b.queue)}async function le(b,S){let te=re();if(!te||W)return null;let ee=await we(b,{...S,...ne(),expected_revision:te.revision});if(ve(ee),r!==null&&ee&&ee.conflict){let _e=ee.queue&&typeof ee.queue.revision=="number"?ee.queue.revision:re()?.revision??te.revision;ee=await we(b,{...S,...ne(),expected_revision:_e}),ve(ee)}return ee}async function D(){u=!0,Je();try{let b=await we("get-session-defaults",{...ne()});s=fn(b?.values)?{...b.values}:{},i={...s},l={},a=Array.isArray(b?.warnings)?b.warnings:[]}catch(b){a=["kv_read_failed"],o(`\uC138\uC158 \uAE30\uBCF8\uAC12\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4: ${b instanceof Error?b.message:String(b)}`)}finally{u=!1,Je()}}async function $e(){let b=Jc(s,i);if(Object.keys(b).length!==0){try{let S=await we("set-session-defaults",{values:b,...ne()});s=fn(S?.values)?{...S.values}:{},i={...s},a=Array.isArray(S?.warnings)?S.warnings:[]}catch(S){o(`\uC138\uC158 \uAE30\uBCF8\uAC12 \uC800\uC7A5 \uC2E4\uD328: ${S instanceof Error?S.message:String(S)}`)}Je()}}function Ae(b,S){if(!fn(b))return;let te=b.state;d={state:te==="usable"||te==="unusable"||te==="absent"?te:"absent",values:fn(b.values)?{...b.values}:{},warnings:Array.isArray(b.warnings)?b.warnings:[]},g={...d.values},S&&(f={...g})}async function T(){try{Ae(await we("get-workspace-accounts",{...ne()}),!0)}catch(b){d={state:"unusable",values:{},warnings:["kv_read_failed"]},g={},f={},o(`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4: ${b instanceof Error?b.message:String(b)}`)}Je()}async function Z(b){try{let S=await fetch(b);if(!S.ok)return null;let te=await S.json();if(!fn(te)||!Array.isArray(te.accounts))return null;let ee=te.accounts.filter(_e=>fn(_e)&&typeof _e.key=="string"&&_e.key.length>0&&typeof _e.email=="string"&&_e.email.length>0);return{accounts:ee,active:ee.find(_e=>_e.active===!0)||null}}catch{return null}}async function Re(){O=!0;let[b,S]=await Promise.all([Z("/api/claude-usage"),Z("/api/codex-usage")]);W||($={claude:b,codex:S},Je())}function fe(){let b={};for(let S of _y){let te=Object.hasOwn(f,S)?f[S]:null,ee=Object.hasOwn(g,S)?g[S]:null;te!==ee&&(b[S]=te)}return b}async function Te(){let b=fe();if(Object.keys(b).length!==0){try{Ae(await we("set-workspace-accounts",{values:b,...ne()}),!1)}catch(S){o(`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12 \uC800\uC7A5 \uC2E4\uD328: ${S instanceof Error?S.message:String(S)}`)}Je()}}function me(b,S){S===Vt?delete f[b]:f[b]=S,Je(),m=m.then(()=>Te())}function Oe(b,S){if(fy.includes(b)){oe(b,S);return}S===Vt?delete i[b]:i[b]=S,Je(),$e()}function it(b,S,te){if(S.length>0&&!te(S)){l[b]=S,Je();return}delete l[b],S.length===0?delete i[b]:i[b]=S,Je(),$e()}function Ge(){let b=vt().orchestration_model,S=mn({global:{orchestration_model:b??void 0},execution_defaults:U(),runner_catalog:q()}).orchestration_model.value;return S?xn(q(),S):null}function I(b,S){typeof S=="string"&&S.length>0?i[b]=S:delete i[b]}function oe(b,S){let te=S===Vt?void 0:S,ee=Qc({impl_runtime:b==="impl_runtime"?te:i.impl_runtime,impl_model:b==="impl_model"?te:i.impl_model,impl_effort:b==="impl_effort"?te:i.impl_effort},q(),Ge());I("impl_runtime",ee.impl_runtime),I("impl_model",ee.impl_model),I("impl_effort",ee.impl_effort),Je(),$e()}async function ie(){let b=re();if(!b)return;let S={orchestration_model:b.orchestration_model??null,orchestration_effort:b.orchestration_effort??null,orchestration_speed:b.orchestration_speed??null},te=eu(S,{...S,...Y});if(Object.keys(te).length!==0){try{let ee=await le("worker-queue-set-orchestration-defaults",{values:te});if(ee&&ee.applied===!1){o("Worker \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC");return}Y={}}catch(ee){o(`Worker \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${ee instanceof Error?ee.message:String(ee)}`)}Je()}}function de(b,S){Y[b]=S===Vt?null:S,Je(),ie()}function be(b){if(B=b,!b){Je();return}let S=q(),te=vt(),ee=te.orchestration_model;ee&&!So(S,b).includes(ee)&&(Y.orchestration_model=null,ee=null);let _e=te.orchestration_effort;_e&&!da(S,b,ee||hn).includes(_e)&&(Y.orchestration_effort=null),Je(),ie()}async function ce(b){if(!(!re()||b<Mi)){try{await le("worker-queue-set-slots",{slots:b})}catch(S){o(`slots \uC800\uC7A5 \uC2E4\uD328: ${S instanceof Error?S.message:String(S)}`)}Je()}}async function Fe(b){if(!(!re()||b<Mi||b>my)){try{await le("worker-queue-set-serial-lane-count",{count:b})}catch(S){o(`\uC9C1\uB82C \uB808\uC778 \uC800\uC7A5 \uC2E4\uD328: ${S instanceof Error?S.message:String(S)}`)}Je()}}async function ze(b,S){let te=b==="auto_advance"?"worker-automation-toggle":"worker-merge-auto-toggle";try{await le(te,{on:S})}catch(ee){o(`\uC790\uB3D9\uD654 \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${ee instanceof Error?ee.message:String(ee)}`)}Je()}function Ve(){let b={},S=vt();for(let te of Xr){let ee=Yn.includes(te)?S[te]:i[te];typeof ee=="string"&&ee.length>0&&(b[te]=ee)}return b}async function Pe(){let b=Q();if(!b)return;let S=Ve();if(Object.keys(S).length===0){o("\uC800\uC7A5\uD560 \uC2E4\uD589 \uC124\uC815\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uBA3C\uC800 \uC2E4\uD589 \uAC12\uC744 \uC120\uD0DD\uD558\uC138\uC694");return}let te=(b.presets||[]).find(_e=>_e.id===J),ee=X.trim()||(te?te.name:"");if(!ee){o("\uD504\uB9AC\uC14B \uC774\uB984\uC744 \uC785\uB825\uD558\uC138\uC694");return}try{let _e=te?await we("impl-preset-update",{expected_revision:b.revision,id:te.id,name:ee,settings:S}):await we("impl-preset-create",{expected_revision:b.revision,name:ee,settings:S});if(_e&&_e.applied){if(X="",!te&&Array.isArray(_e.presets)){let Ue=_e.presets.find(Se=>Se.name===ee);J=Ue?Ue.id:J}Je()}else o("\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4"),Je()}catch(_e){o(`\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328: ${_e instanceof Error?_e.message:String(_e)}`)}}async function V(){let b=Q();if(!(!b||J.length===0))try{let S=await we("impl-preset-delete",{expected_revision:b.revision,id:J});S&&S.applied?(J="",Je()):(o("\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328: \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4"),Je())}catch(S){o(`\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328: ${S instanceof Error?S.message:String(S)}`)}}function j(b){s=fn(b.values)?{...b.values}:{},i={...s},a=Array.isArray(b.warnings)?b.warnings:[],fn(b.queue)&&(t.onQueueAdopt?.(b.queue),Y={})}async function De(){let b=Q(),S=re();if(!b||!S||J.length===0)return;let te=ee=>({preset_id:J,expected_revision:b.revision,expected_queue_revision:ee,...ne()});try{let ee=await we("apply-impl-preset-global",te(S.revision));if(ee&&ee.applied&&j(ee),r!==null&&ee&&ee.queue_applied===!1){let _e=ee.queue&&typeof ee.queue.revision=="number"?ee.queue.revision:re()?.revision??S.revision;ee=await we("apply-impl-preset-global",te(_e)),ee&&ee.applied&&j(ee)}ee&&ee.applied?ee.queue_applied===!1&&o("\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uAC12\uC740 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC138\uC694"):ee&&ee.conflict&&o("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328: \uD504\uB9AC\uC14B\uC774 \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4")}catch(ee){o(`\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328: ${ee instanceof Error?ee.message:String(ee)}`)}Je()}async function lt(){L=!0,M=!1,Je();try{let b=await we("get-worker-system-prompt",{});!b||typeof b!="object"||Array.isArray(b)?M=!0:N=b}catch{M=!0}finally{L=!1,Je()}}function Qe(){if(F=!F,F&&!N){lt();return}Je()}function w(){let b=so({loading:L,error:M});if(b)return b;if(!N)return"";let S=Array.isArray(N.variants)?N.variants:[];return c`<div class="settings-dialog__sp-body">
      ${N.target_base_placeholder?c`<div class="prompt-block__meta">
            \`${N.target_base_placeholder}\`는 디스패치 시점에 해석된
            base로 치환됩니다.
          </div>`:""}
      ${S.map(te=>c`<div class="settings-dialog__sp-variant" data-variant=${te.key}>
            <div class="settings-dialog__sp-cond">${te.condition}</div>
            ${Jn(te.label,te.system_prompt)}
          </div>`)}
    </div>`}function H(){return c`<section
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
        @click=${Qe}
      >
        ${F?"\uC811\uAE30":"\uC804\uBB38 \uBCF4\uAE30"}
      </button>
      ${F?w():""}
    </section>`}function Ce(b,S,te,ee,_e,Ue,Se){let Ne=_e[b]??Vt,Ze=pa(b,te,_e,U(),q(),Se),_t=Ze.options.find(ft=>ft.value===Ne),Be=Ne===Vt?Ze.full_value:_t?.full_value;return c`<select
        class=${Ne===Vt?"settings-dialog__unset":""}
        data-key=${b}
        aria-label=${S}
        title=${Be||""}
        ?disabled=${Ue===!0||Ze.disabled}
        .value=${ur(String(Ne))}
        @change=${ft=>ee(b,String(ft.target.value))}
      >
        <option value=${Vt} ?selected=${Ne===Vt}>
          ${Ze.unset_label}
        </option>
        ${Ze.options.map(ft=>c`<option
              value=${ft.value}
              title=${ft.full_value||""}
              ?selected=${ft.value===Ne}
            >
              ${ft.label}
            </option>`)}
      </select>
      ${Ne===Vt?c`<span class="settings-dialog__source-badge">기본</span>`:""}`}function Ee(b,S,te,ee,_e,Ue=!1,Se){return c`<div
      class=${`settings-dialog__row${Ue?" settings-dialog__row--off":""}`}
    >
      <span class="settings-dialog__row-label">${S}</span>
      <span class="settings-dialog__controls">
        ${Ce(b,S,te,ee,_e,Ue,Se)}
      </span>
    </div>`}function je(b,S,te,ee,_e,Ue){let Se=Object.hasOwn(l,b),Ne=Se?l[b]:i[b]??Vt;return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${S}</span>
      <span class="settings-dialog__controls">
        <input
          type="text"
          class=${`settings-dialog__text${Se?" settings-dialog__text--invalid":""}`}
          data-key=${b}
          aria-label=${S}
          aria-invalid=${String(Se)}
          placeholder=${te}
          .value=${ur(Ne)}
          @change=${Ze=>it(b,String(Ze.target.value).trim(),Ue)}
        />
        ${Ne.length===0?c`<span class="settings-dialog__source-badge">기본</span>`:""}
        <span class="settings-dialog__hint" data-key-hint=${b}
          >${Se?_e:ee}</span
        >
      </span>
    </div>`}function Xe(b,S){let te=S?S.active:null;return fn(te)?`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(${b==="claude"?te.email:ao({...te,alias:null})})`:"\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(\uD655\uC778 \uBD88\uAC00)"}function dt(b,S,te){let ee=$[te],_e=Object.hasOwn(f,b)?f[b]:Vt,Ue=te==="claude"?Ai:ao,Se=!!ee?.accounts.some(Ne=>Ne.key===_e);return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${S}</span>
      <span class="settings-dialog__controls">
        <select
          aria-label=${S}
          data-account-key=${b}
          @change=${Ne=>me(b,String(Ne.target.value))}
        >
          <option value=${Vt} ?selected=${_e.length===0}>
            ${Xe(te,ee)}
          </option>
          ${_e.length>0&&!Se?c`<option value=${_e} selected>
                ${_e} (목록에 없음)
              </option>`:""}
          ${ee?.accounts.map(Ne=>c`<option value=${Ne.key} ?selected=${Ne.key===_e}>
                ${Ue(Ne)}
              </option>`)||""}
        </select>
        ${ee?"":c`<span class="settings-dialog__hint"
              >계정 목록을 불러올 수 없습니다</span
            >`}
      </span>
    </div>`}function xt(){let b=d.warnings.join(", ");return d.state==="unusable"?`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12\uC744 \uD574\uC11D\uD560 \uC218 \uC5C6\uC5B4 \uC774 \uB808\uD3EC\uC758 \uB514\uC2A4\uD328\uCE58\uAC00 \uAC70\uBD80\uB429\uB2C8\uB2E4 \u2014 ${b} \xB7 \uACC4\uC815\uC744 \uB2E4\uC2DC \uACE0\uB974\uBA74 \uD574\uC18C\uB429\uB2C8\uB2E4`:d.warnings.length>0?`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12\uC5D0 \uC54C \uC218 \uC5C6\uB294 \uD0A4\uAC00 \uC788\uC2B5\uB2C8\uB2E4 \u2014 ${b}`:null}function Ct(b,S,te,ee,_e){return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">
        <i
          class="settings-dialog__stage-dot"
          style=${`background: var(--stage-${S}-on)`}
        ></i>
        ${b}
      </span>
      <span class="settings-dialog__controls">
        ${Ce(te,`${b} \uBAA8\uB378`,ee,Oe,i,!1)}
        ${Ce(_e,`${b} effort`,Is,Oe,i,!1)}
      </span>
    </div>`}function St(b,S,te,ee){return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${S}</span>
      <span class="settings-dialog__controls">
        <button
          type="button"
          class=${`settings-dialog__toggle${ee?" is-on":""}`}
          data-automation=${b}
          aria-pressed=${ee?"true":"false"}
          aria-label=${S}
          @click=${()=>ze(b,!ee)}
        >
          ${ee?"\uCF1C\uC9D0":"\uAEBC\uC9D0"}
        </button>
        <span class="settings-dialog__hint">${te}</span>
      </span>
    </div>`}function mt(b,S,te,ee){return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${S}</span>
      <span class="settings-dialog__controls">
        <span class="settings-dialog__stepper" data-stepper=${b}>
          <button
            type="button"
            aria-label=${`${S} \uAC10\uC18C`}
            @click=${()=>ee(te-1)}
          >
            −
          </button>
          <span class="settings-dialog__stepper-value">${te}</span>
          <button
            type="button"
            aria-label=${`${S} \uC99D\uAC00`}
            @click=${()=>ee(te+1)}
          >
            +
          </button>
        </span>
      </span>
    </div>`}function ut(b){return c`<div class="settings-dialog__preset-diff" data-preset-diff>
      <div class="settings-dialog__preset-diff-head">
        ${b.rows.length>0?`\uBCC0\uACBD ${b.rows.length}\uAC1C \xB7 \uC801\uC6A9\uD558\uBA74 \uC544\uB798\uC640 \uAC19\uC774 \uBC14\uB01D\uB2C8\uB2E4`:"\uD604\uC7AC \uC124\uC815\uACFC \uAC19\uC2B5\uB2C8\uB2E4 \u2014 \uC801\uC6A9\uD560 \uBCC0\uACBD\uC774 \uC5C6\uC2B5\uB2C8\uB2E4"}
      </div>
      ${b.rows.map(S=>c`<div
            class="settings-dialog__preset-diff-row"
            data-diff-kind=${S.kind}
          >
            <span class="settings-dialog__preset-diff-label">${S.label}</span>
            <span class="settings-dialog__preset-diff-value"
              >${S.before??"\uAE30\uBCF8"}</span
            >
            <span class="settings-dialog__preset-diff-arrow">→</span>
            <span
              class="settings-dialog__preset-diff-value settings-dialog__preset-diff-after"
              >${S.after??"\uAE30\uBCF8(\uD574\uC81C)"}</span
            >
          </div>`)}
      ${b.ignored_keys.length>0?c`<div class="settings-dialog__preset-diff-note">
            ${b.ignored_keys.join(", ")}은(는) 전역 적용이 쓰지 않는 키라
            무시됩니다
          </div>`:""}
    </div>`}function vt(){let b=re(),S={};for(let te of Yn)S[te]=Object.prototype.hasOwnProperty.call(Y,te)?Y[te]:b&&typeof b[te]=="string"?b[te]:null;return S}function Rt(){let b=q(),S=i.impl_runtime,te=i.impl_model,ee=Q(),_e=re(),Ue=vt(),Se=So(b,B),Ne=Qr(b,void 0).filter(et=>et!==hn),Ze=da(b,B,Ue.orchestration_model||hn).filter(et=>et!==hn),_t=J?(ee?.presets||[]).find(et=>et.id===J):null,Be=_t?Zc(Ve(),fn(_t.settings)?_t.settings:{}):null,ft=_e&&typeof _e.slots=="number"?_e.slots:Mi+1,qt=_e&&typeof _e.serial_lane_count=="number"?_e.serial_lane_count:Mi,Ft=U()?.supported===!0,Xt=xt(),kt=pa("workflow_mode",xo,i,U(),b);return c`
      ${a.length>0?c`<div class="settings-dialog__banner" role="alert">
            워크스페이스 기본값을 일부 읽지 못했습니다 —
            ${a.join(", ")}
          </div>`:""}
      ${Xt?c`<div
            class="settings-dialog__banner"
            data-account-warning
            role="alert"
          >
            ${Xt}
          </div>`:""}
      ${Ft?"":c`<div
            class="settings-dialog__banner settings-dialog__banner--projection"
            data-execution-defaults-warning
            role="alert"
          >
            실행 기본값 projection을 확인할 수 없습니다 — 기본값 확인 불가
          </div>`}
      ${u?c`<div class="settings-dialog__empty">불러오는 중…</div>`:c`
            <div class="settings-dialog__preset-bar">
              <select
                aria-label="실행 프리셋"
                .value=${ur(J)}
                @change=${et=>{J=String(et.target.value),Je()}}
              >
                <option value="" ?selected=${J===""}>
                  실행 프리셋…
                </option>
                ${(ee?.presets||[]).map(et=>c`<option
                      value=${et.id}
                      ?selected=${et.id===J}
                    >
                      ${et.name}
                    </option>`)}
              </select>
              <button
                type="button"
                class="settings-dialog__btn settings-dialog__btn--primary"
                data-preset-apply-global
                ?disabled=${!Be||Be.rows.length===0}
                @click=${De}
              >
                적용
              </button>
              <input
                type="text"
                class="settings-dialog__preset-name"
                placeholder=${J?"\uC774\uB984 (\uBE44\uC6B0\uBA74 \uC720\uC9C0)":"\uC0C8 \uD504\uB9AC\uC14B \uC774\uB984"}
                aria-label="프리셋 이름"
                .value=${ur(X)}
                @input=${et=>{X=String(et.target.value)}}
              />
              <button
                type="button"
                class="settings-dialog__btn"
                data-preset-save
                title=${J?"\uD604\uC7AC \uD654\uBA74\uC758 \uC2E4\uD589 \uC124\uC815\uC744 \uC774 \uD504\uB9AC\uC14B\uC5D0 \uC800\uC7A5\uD569\uB2C8\uB2E4 (\uD504\uB9AC\uC14B \u2192 \uC124\uC815 \uBC29\uD5A5\uC774 \uC544\uB2D8)":"\uD604\uC7AC \uD654\uBA74\uC758 \uC2E4\uD589 \uC124\uC815\uC744 \uC0C8 \uD504\uB9AC\uC14B\uC73C\uB85C \uC800\uC7A5\uD569\uB2C8\uB2E4"}
                @click=${Pe}
              >
                ${J?"\uD604\uC7AC \uC124\uC815\uC73C\uB85C \uB36E\uC5B4\uC4F0\uAE30":"\uC0C8 \uD504\uB9AC\uC14B \uC800\uC7A5"}
              </button>
              <button
                type="button"
                class="settings-dialog__btn"
                data-preset-delete
                ?disabled=${J.length===0}
                @click=${V}
              >
                삭제
              </button>
            </div>
            ${Be?ut(Be):""}

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">오케스트레이션</div>
              <div class="settings-dialog__row">
                <span class="settings-dialog__row-label">런타임</span>
                <span class="settings-dialog__controls">
                  <select
                    aria-label="런타임"
                    data-key="orchestration_runtime_filter"
                    .value=${ur(B||Vt)}
                    @change=${et=>{let Pt=String(et.target.value);be(Pt===Vt?null:Pt)}}
                  >
                    <option value=${Vt} ?selected=${!B}>
                      전체
                    </option>
                    <option
                      value="claude"
                      ?selected=${B==="claude"}
                    >
                      claude
                    </option>
                    <option
                      value="codex"
                      ?selected=${B==="codex"}
                    >
                      codex
                    </option>
                  </select>
                  <span class="settings-dialog__hint"
                    >모델 목록을 좁힙니다</span
                  >
                </span>
              </div>
              ${Ee("orchestration_model","\uBAA8\uB378",Se,de,Ue)}
              ${Ee("orchestration_effort","effort",Ze,de,Ue)}
              ${Ee("orchestration_speed","\uC18D\uB3C4",$o,de,Ue)}
            </div>

            <div class="settings-dialog__group" data-exec-accounts-group>
              <div class="settings-dialog__group-title">실행 계정</div>
              ${dt("claude_account","Claude","claude")}
              ${dt("codex_account","Codex","codex")}
            </div>

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">워크플로우</div>
              <div class="settings-dialog__row">
                <span class="settings-dialog__row-label">모드</span>
                <span class="settings-dialog__controls">
                  <span class="settings-dialog__seg" role="group">
                    <button
                      type="button"
                      data-mode=${Vt}
                      aria-pressed=${String(!i.workflow_mode)}
                      @click=${()=>Oe("workflow_mode",Vt)}
                    >
                      ${kt.unset_label}
                    </button>
                    ${i.workflow_mode?"":c`<span class="settings-dialog__source-badge"
                          >기본</span
                        >`}
                    ${xo.map(et=>c`<button
                          type="button"
                          data-mode=${et}
                          aria-pressed=${String(i.workflow_mode===et)}
                          @click=${()=>Oe("workflow_mode",et)}
                        >
                          ${et}
                        </button>`)}
                  </span>
                </span>
              </div>
              ${je("bdui_url","beads-ui \uC8FC\uC18C","http://\uD638\uC2A4\uD2B8:3000","\uC138\uC158\uC774 Worker \uB808\uC778 \uBC30\uCE58\uB97C \uBB3C\uC5B4\uBCFC \uB54C \uC4F0\uB294 \uC8FC\uC18C\uC785\uB2C8\uB2E4","http:// \uB610\uB294 https:// \uB85C \uC2DC\uC791\uD558\uB294 \uC8FC\uC18C\uB9CC \uC800\uC7A5\uB429\uB2C8\uB2E4 (\uACBD\uB85C \uC5C6\uC774)",Kc)}
            </div>

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">
                리뷰 게이트
                <span class="settings-dialog__hint">모델 · effort</span>
              </div>
              ${Ct("\uC0AC\uC591 \uB9AC\uBDF0","spec","spec_review_model",Ao,"spec_review_effort")}
              ${Ct("\uACC4\uD68D \uB9AC\uBDF0","plan","plan_review_model",Ls,"plan_review_effort")}
              ${Ct("\uAD6C\uD604 \uB9AC\uBDF0","impl","impl_review_model",Ao,"impl_review_effort")}
            </div>

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">
                구현
                <span class="settings-dialog__hint"
                  >이슈 핀이 있으면 핀이 우선합니다</span
                >
              </div>
              ${Ee("impl_runtime","\uC704\uC784 \uB300\uC0C1",Os,Oe,i)}
              ${Ee("impl_model","\uBAA8\uB378",Qr(b,S),Oe,i)}
              ${Ee("impl_effort","effort",Zr(b,S,te),Oe,i)}
              ${Ee("impl_speed","\uC18D\uB3C4",$o,Oe,i)}
              ${Ee("quick_fix_impl_model","quick_fix \uAD6C\uD604 \uBAA8\uB378",Ne,Oe,i,!1,{...i,...Ue})}
            </div>

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">
                자동화
                <span class="settings-dialog__hint"
                  >이 레포의 워커 큐가 스스로 진행하는 범위</span
                >
              </div>
              ${St("auto_advance","\uC790\uB3D9\uD654","\uC2AC\uB86F\uC774 \uBE44\uBA74 \uB300\uAE30 \uC55E \uD589\uC774 \uCD9C\uBC1C\uD569\uB2C8\uB2E4",_e?.auto_advance===!0)}
              ${St("auto_merge","\uBA38\uC9C0","\uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4",_e?.auto_merge===!0)}
              ${mt("slots","\uB3D9\uC2DC \uC2E4\uD589",ft,et=>ce(et))}
              ${mt("serial-lane-count","\uC9C1\uB82C \uB808\uC778",qt,et=>Fe(et))}
            </div>
            ${H()}
          `}
    `}function Je(){W||rt(Rt(),e)}return{load(){Y={},l={};let b=[D(),T()];return O||b.push(Re()),Promise.all(b).then(()=>{})},render:Je,sessionDraft:()=>({...i}),destroy(){W=!0,rt(c``,e)}}}function Di(e){return c`<svg
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
    />`)}function Ap(e){return`${e} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}function Sp(e){let t=(Array.isArray(e)?e:[]).map(l=>l&&l.usage).filter(l=>l&&typeof l=="object"&&"providers"in l);if(t.length>0)return en(Cs(t));let n={};for(let l of Dn)n[l]=0;let r=!1,o=0,s=0,i=0;for(let l of Array.isArray(e)?e:[]){let a=l&&l.usage;if(a&&typeof a=="object"){let u=!1;for(let d of Dn){let f=a[d];typeof f=="number"&&Number.isFinite(f)&&(n[d]+=f,r=!0,u=!0)}if(u){s+=1;let d=a.total_cost_usd;typeof d=="number"&&Number.isFinite(d)&&(o+=d,i+=1)}}}return s>0&&i===s&&(n.total_cost_usd=o),r?Hn(n):null}function Rn(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function bl(e,t){let n=Rn(e?.counts)?e.counts:null,r=n?n[t]:null;return typeof r=="number"&&Number.isFinite(r)?r:0}function gy(e,t){if(!Rn(t))return e;let n={...e};for(let[r,o]of Object.entries(t))o!==void 0&&(n[r]=o);return n}function hy(e){if(!Rn(e)||!Rn(e.execution_defaults)||!Rn(e.runner_catalog)||!Rn(e.session_defaults))return null;let t={...e.session_defaults};for(let i of["orchestration_model","orchestration_effort","orchestration_speed"])typeof e[i]=="string"&&e[i].length>0&&(t[i]=e[i]);let n=mn({global:t,execution_defaults:e.execution_defaults,runner_catalog:e.runner_catalog}),r=xn(e.runner_catalog,n.orchestration_model.value??""),o=Jr(n,e.runner_catalog),s=$r(n,r);return o===null&&s===null?null:{orchestration:o,worker:s}}function Ep(e,t){let n=t.notify||(T=>ye(T,"error",4e3)),r=document.createElement("div");r.className="mon2-deck__main",e.appendChild(r);let o=document.createElement("div");o.className="mon2-deck__panel",o.hidden=!0;let s=document.createElement("div");s.className="mon2-deck__panel-hd";let i=document.createElement("span");i.className="mon2-deck__panel-title";let l=document.createElement("button");l.type="button",l.className="mon2-deck__panel-close",l.setAttribute("aria-label","\uC2E4\uD589 \uC124\uC815 \uB2EB\uAE30"),l.textContent="\u2715",s.append(i,l);let a=document.createElement("div");a.className="mon2-deck__panel-body",o.append(s,a),e.appendChild(o);let u=null,d=null,f=null,g=new Map;function m(){let T=t.workspacesState?t.workspacesState():[];return Array.isArray(T)?T.filter(Z=>Rn(Z)):[]}function $(T){return m().find(Z=>Z.root_dir===T)||null}function O(T){return gy($(T),g.get(T))}function B(){for(let T of m()){let Z=g.get(T.root_dir);Z&&typeof Z.revision=="number"&&typeof T.revision=="number"&&T.revision>=Z.revision&&g.delete(T.root_dir)}}async function Y(T,Z,Re){let fe=t.transport,Te=O(Z);if(!(!fe||!Rn(Te))){try{let me=await fe(T,{...Re,root_dir:Z,expected_revision:Te.revision});if(Rn(me?.queue)&&g.set(Z,me.queue),me&&me.conflict){let Oe=Rn(me.queue)&&typeof me.queue.revision=="number"?me.queue.revision:O(Z)?.revision;me=await fe(T,{...Re,root_dir:Z,expected_revision:Oe}),Rn(me?.queue)&&g.set(Z,me.queue)}}catch(me){n(`\uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${me instanceof Error?me.message:String(me)}`)}D()}}function J(T){u!==T&&(u=T,t.onFocusChange?.(u),D())}function X(T){J(u===T?null:T)}function F(T){if(d===T){M();return}L(),d=T;let Z=$(T);i.textContent=`${Z?.name||T} \uC2E4\uD589 \uC124\uC815 \xB7 Worker \uD0ED \u2699 \uC2E4\uD589 \uD0ED\uACFC \uAC19\uC740 \uC800\uC7A5\uC18C`,o.hidden=!1,f=Pi(a,{root_dir:T,queue:()=>O(T),transport:t.transport,implPresetStore:t.implPresetStore,notify:n,onQueueAdopt:Re=>{g.set(T,Re),D()}}),f.load(),D()}function L(){f?.destroy(),f=null}function M(T){L(),d=null,o.hidden=!0,i.textContent="",T!==!0&&D()}let N=()=>M();l.addEventListener("click",N);function W(T){T.key==="Escape"&&u!==null&&J(null)}document.addEventListener("keydown",W);function re(T,Z){let Re=Math.max(Z,T,1);return c`<span
      class="mon2-deck__rail"
      role="img"
      aria-label=${`\uC2AC\uB86F ${Z}\uAC1C \uC911 ${T}\uAC1C \uC2E4\uD589 \uC911`}
    >
      ${Array.from({length:Re},(fe,Te)=>Te<T?c`<i class="mon2-deck__slot is-run"></i>`:c`<i class="mon2-deck__slot"></i>`)}
    </span>`}function q(T){let Z=T.auto_advance===!0,Re=T.auto_merge===!0;return c`<button
        type="button"
        class=${`mon2-deck__op mon2-deck__auto${Z?" is-on":""}`}
        data-act="auto"
        aria-pressed=${Z?"true":"false"}
        aria-label=${`${T.name} \uC790\uB3D9\uD654`}
        title=${Z?"\uC790\uB3D9\uD654 \uCF1C\uC9D0 \u2014 \uC2AC\uB86F\uC774 \uBE44\uBA74 \uB2E4\uC74C \uD589\uC774 \uCD9C\uBC1C\uD569\uB2C8\uB2E4":"\uC790\uB3D9\uD654 \uAEBC\uC9D0 \u2014 \uB2E4\uC74C \uD589\uC740 \uC218\uB3D9\uC73C\uB85C\uB9CC \uCD9C\uBC1C\uD569\uB2C8\uB2E4"}
      >
        ${Z?kp():wp()}
      </button>
      <button
        type="button"
        class=${`mon2-deck__op mon2-deck__merge${Re?" is-on":""}`}
        data-act="merge"
        aria-pressed=${Re?"true":"false"}
        aria-label=${`${T.name} \uC790\uB3D9 \uBA38\uC9C0`}
        title=${Re?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0"}
      >
        ${$p()}
      </button>
      <button
        type="button"
        class=${`mon2-deck__op mon2-deck__gear${d===T.root_dir?" is-on":""}`}
        data-act="gear"
        aria-expanded=${d===T.root_dir?"true":"false"}
        aria-label=${`${T.name} \uC2E4\uD589 \uC124\uC815`}
        title="이 레포의 실행 설정"
      >
        ${xp()}
      </button>`}function U(T){let Z=hy(T);return Z?c`<div class="mon2-deck__chips">
      ${Z.orchestration?c`<span class="mon2-deck__chip" title=${Z.orchestration.title}
            >오케 ${Z.orchestration.text}</span
          >`:""}
      ${Z.worker?c`<span class="mon2-deck__chip" title=${Z.worker.title}
            >워커 ${Z.worker.text}</span
          >`:""}
    </div>`:""}function Q(T){let Z=[];for(let[Re,fe]of[["queue","\uB300\uAE30"],["pr_wait","PR"],["session_active","\uC138\uC158"]]){let Te=bl(T,Re);Te>0&&Z.push(`${fe} ${Te}`)}return Z.join(" \xB7 ")}function ne(T){let Z=bl(T,"running"),Re=typeof T.slots=="number"?T.slots:1;return c`<div
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
          title=${`\uC2AC\uB86F ${Re}\uAC1C \uC911 ${Z}\uAC1C \uC2E4\uD589 \uC911`}
        >
          <span class="mon2-deck__load-n">${Z}/${Re}</span>
          ${re(Z,Re)}
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
        <div class="mon2-deck__ops">${q(T)}</div>
        <span class="mon2-deck__counts">${Q(T)}</span>
        ${U(T)}
      </div>
    </div>`}function we(T){let Z=t.doneItems?t.doneItems():[],Re=t.rangeLabel?t.rangeLabel():"",fe=Sp(Array.isArray(Z)?Z:[]),Te=me=>T.reduce((Oe,it)=>Oe+bl(it,me),0);return c`<div class="mon2-deck__bar">
      <span
        class="mon2-deck__total-counts"
        title=${`visible \uB808\uD3EC ${T.length}\uACF3\uC758 \uD569\uACC4\uC785\uB2C8\uB2E4 \u2014 \uC2E4\uD589\xB7\uB300\uAE30\xB7PR\uC740 \uC9C0\uAE08, \uC644\uB8CC\uB294 ${Re}`}
        >실행 ${Te("running")} · 대기 ${Te("queue")} · PR
        ${Te("pr_wait")}${Te("session_active")>0?` \xB7 \uC138\uC158 ${Te("session_active")}`:""}
        · ${Re} 완료
        ${Array.isArray(Z)?Z.length:0}</span
      >
      ${fe===null?"":c`<span class="mon2-deck__total-tokens">
            ${typeof fe=="string"?c`<span
                  class="mon2-deck__tok"
                  title=${Ap(Re)}
                  >${fe}</span
                >`:fe.map(me=>c`<span
                      class="mon2-deck__tok"
                      data-provider=${me.provider}
                      title=${me.tooltip}
                      >${me.label}</span
                    >`)}
          </span>`}
    </div>`}function ve(){let T=m();return T.length===0?"":c`${we(T)}
      <div class="mon2-deck__strip">
        ${T.map(Z=>ne(Z))}
      </div>`}function le(){u!==null&&!$(u)&&(u=null,t.onFocusChange?.(null))}function D(){B(),le(),d!==null&&!$(d)&&M(!0),rt(ve(),r),f?.render()}function $e(T){let Z=T.target;if(!Z||typeof Z.closest!="function")return;let Re=Z.closest("[data-root-dir]");if(!Re)return;let fe=Re.getAttribute("data-root-dir")||"",Te=Z.closest("[data-act]")?.getAttribute("data-act");if(Te==="worker"){t.gotoWorkerTab?.(fe);return}if(Te==="auto"){Y("worker-automation-toggle",fe,{on:O(fe)?.auto_advance!==!0});return}if(Te==="merge"){Y("worker-merge-auto-toggle",fe,{on:O(fe)?.auto_merge!==!0});return}if(Te==="gear"){F(fe);return}X(fe)}function Ae(T){if(T.key!=="Enter"&&T.key!==" ")return;let Z=T.target;if(!Z||typeof Z.closest!="function")return;let Re=Z.closest('[data-root-dir][role="button"]');!Re||Re!==Z||(T.preventDefault(),X(Re.getAttribute("data-root-dir")||""))}return r.addEventListener("click",$e),r.addEventListener("keydown",Ae),{render:D,focusRoot:()=>u,panelRoot:()=>d,destroy(){document.removeEventListener("keydown",W),r.removeEventListener("click",$e),r.removeEventListener("keydown",Ae),l.removeEventListener("click",N),L(),rt(c``,r),e.replaceChildren()}}}var by=1e4,Op="bdui.monitor.done-range",Lp="bdui.monitor.running_sort",Ip="bdui.monitor.candidate_sort",Mp="beads-ui.monitor.candidate-filter",Pp="beads-ui.monitor.sections";function yy(){try{let e=window.localStorage.getItem(Mp);if(!e)return{...no};let t=JSON.parse(e);return!t||typeof t!="object"?{...no}:{show_blocked:typeof t.show_blocked=="boolean"?t.show_blocked:no.show_blocked,spec:La.some(n=>n.value===t.spec)?t.spec:"all"}}catch{return{...no}}}function Tp(e){try{window.localStorage.setItem(Mp,JSON.stringify({show_blocked:e.show_blocked,spec:e.spec}))}catch{}}function vy(){try{let e=window.localStorage.getItem(Ip);return Mo.some(t=>t.value===e)?e:"repo_spec"}catch{return"repo_spec"}}function wy(e){try{window.localStorage.setItem(Ip,e)}catch{}}function ky(){try{let e=window.localStorage.getItem(Pp);if(!e)return{};let t=JSON.parse(e);return t&&typeof t=="object"?t:{}}catch{return{}}}function $y(e){try{window.localStorage.setItem(Pp,JSON.stringify(e))}catch{}}function xy(){try{let e=window.localStorage.getItem(Op);return e===null?"today":Mn(e)}catch{return"today"}}function Ay(e){try{window.localStorage.setItem(Op,e)}catch{}}function Sy(){try{return window.localStorage.getItem(Lp)==="repo"?"repo":"started"}catch{return"started"}}function Ey(e){try{window.localStorage.setItem(Lp,e)}catch{}}var Dp="tab:monitor:pipeline",Ty=1e3,Cp=[{lane:"runnable",pane:"candidate",title:"\uD6C4\uBCF4",empty:"\uC2E4\uD589 \uC790\uACA9\uC744 \uAC16\uCD98 \uC774\uC288 \uC5C6\uC74C"},{lane:"queue",pane:"queue",title:"\uB300\uAE30",empty:"\uD45C\uC2DC\uD560 \uB808\uD3EC \uC5C6\uC74C"},{lane:"running",pane:"running",title:"\uC2E4\uD589 \uC911",empty:"\uC2E4\uD589 \uC911 \uC5C6\uC74C"},{lane:"pr_wait",pane:"pr_wait",title:"PR \uB300\uAE30",empty:"PR \uC5C6\uC74C"},{lane:"done",pane:"done",title:"\uC644\uB8CC",empty:"\uC644\uB8CC \uAE30\uB85D \uC5C6\uC74C"}],Cy=["queue","runnable","done"],Rp="\u2460\u2461\u2462\u2463\u2464\u2465\u2466\u2467\u2468\u2469\u246A\u246B\u246C\u246D\u246E\u246F\u2470\u2471\u2472\u2473";function Ry(e){return e>=1&&e<=Rp.length?Rp[e-1]:`(${e})`}function Np(e,t){let n=Ot("views:monitor"),r=t.gotoIssue,o=t.pipelineStore,s=t.transport,i=t.getWorkspacePath,l=t.openDoc,a=t.switchWorkspace,u=t.router,d=t.now||(()=>Date.now()),f=t.confirm||(y=>typeof globalThis.confirm!="function"||globalThis.confirm(y)),g=xy(),m=Sy(),$=yy(),O=vy(),B=ky(),Y=Ci("beads-ui.monitor.lane-collapsed"),J=!1,X=null,F=null,L=null,M=null,N=Yr(()=>Se()),W=null,re=null,q=null,U=null;function Q(y){return U===null&&(U=I()),Hu(y,U)}function ne(y,p){we(),!(p<=0)&&(re={lane_id:y,corrected:p},q=setTimeout(()=>{q=null,re=null,Se()},by))}function we(){q!==null&&(clearTimeout(q),q=null),re=null}function ve(){let y=Mr.find(p=>p.value===g);return y?y.label:""}let le=document.createElement("div");le.className="mon",e.appendChild(le);let D=document.createElement("div");D.className="worker-drawer-overlay",D.hidden=!0;let $e=document.createElement("div");$e.className="worker-drawer-overlay__backdrop";let Ae=document.createElement("div");Ae.className="worker-drawer-host mon2-drawer",D.append($e,Ae),e.appendChild(D);let T=lr(null,null),Z=new Map,Re=new Map,fe=null,Te=null,me=null,Oe=io(Ae,{transport:s,sessionLogStore:t.sessionLogStore,onClose:()=>{F=null,D.hidden=!0,Se()}}),it=Oi({transport:s,console_el:le,getLanes:()=>T,getWorkspaces:()=>o&&o.get?o.get():null,getCrossLanes:kt,reproject:y=>({lanes:Ue(y),raw_lanes:y}),onCorrection:ne,showToast:ye,requestRender:()=>Se(),adoptQueue:(y,p)=>{Re.set(y,p)},onDragBegin:()=>{L=null},candidate_drop:!0}),{applyDrop:Ge,dropModel:I,runPlanned:oe,sendQueueCas:ie}=it;async function de(y,p,_,E,G=!0){if(!s||!_)return null;let K=await s(y,{...p,root_dir:_,expected_revision:E});if(K&&K.conflict&&G){K.queue&&Re.set(_,K.queue);let se=K.queue&&typeof K.queue.revision=="number"?K.queue.revision:E;K=await s(y,{...p,root_dir:_,expected_revision:se})}return K&&K.queue&&_&&Re.set(_,K.queue),K}function be(y,p){let _=Re.get(y),E=o&&o.get?o.get():null,G=(Array.isArray(E)?E:[]).find(se=>se?.root_dir===y);return(_||G)?.merge_queue?.find(se=>se.bead_id===p)?.continuation_action}async function ce(y,p,_,E){let G=await de(y,p,_,E),K=Re.get(_)?.revision??G?.queue?.revision??E;return zn(G,(se,xe)=>de(y,{...p,continuation:se,decision_token:xe},_,K,!1),{refresh:se=>de(y,p,_,se?.queue?.revision??Re.get(_)?.revision??K,!1)})}async function Fe(y,p,_,E){let G=await zn({continuation_mismatch:E},(se,xe)=>de("worker-merge-queue-add",{bead_id:p,continuation:se,decision_token:xe},y,_,!1)),K=G?.queue?.merge_queue?.find(se=>se.bead_id===p)?.continuation_action;G?.applied!==!0&&K?.continuation===null&&K.mismatch&&await Fe(y,p,G.queue.revision,K.mismatch)}async function ze(y,p,_){let E=await de("worker-discard",y,p,_);if(E&&E.discarded===!0){ye(zs(E),"success",5e3);return}if(E&&E.reason){ye(`\uD3D0\uAE30 \uC2E4\uD328: ${E.reason}`,"error");return}if(E&&E.accepted&&E.pending==="merged_revert"){ye("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success");return}if(E&&E.accepted){ye(`\uD3D0\uAE30 \uC9C4\uD589: ${E.phase||"\uBC31\uC5C5 \uC911"}`,"success");return}E&&!E.conflict&&ye("\uD3D0\uAE30 \uAC70\uBD80: unknown","error")}async function Ve(y,p,_){return!s||!_?null:await s(y,{...p,root_dir:_})}async function Pe(){let y=new Map;for(let p of T.pr_wait)y.has(p.root_dir)||y.set(p.root_dir,p.expected_revision);for(let[p,_]of y)await de("worker-merge-queue-add-all",{},p,_)}function V(y){let p=B[y];return!!(p&&p.runnable===!0)}function j(y){let p={...B[y]||{}};p.runnable=!p.runnable,B={...B,[y]:p},$y(B),Se()}function De(y){Y.toggle(y),Se()}function lt(y){Y.toggleArea(y),Se()}function Qe(y){let p=y.dependency_chips||null,_=y.overlap_chips||[],E=y.scope_state==="missing",G=y.armed_lane_chip;return!p&&_.length===0&&!E&&!G?null:{...p||{},..._.length>0?{overlaps:_}:{},...E?{scope_missing:!0}:{},...G?{armed_lane:G}:{}}}function w(y){return Qs(y,p=>N.isOpen({bead_id:y.id,chip_key:p}))}function H(y){let p=Qe(y),_=w(y);return p||_?{...y,...p?{dependency_chips:p}:{},..._?{chip_popover:_}:{}}:y}function Ce(y){let p=V(y.root_dir);return c`<header class="mon2-sec__hd">
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
    </header>`}function Ee(y,p){return c`<div
      class="mon2-item"
      data-bead-id=${y.id}
      data-drag-kind="candidate"
      data-root-dir=${y.root_dir}
    >
      ${p}
    </div>`}function je(y){if(L!==y.id)return null;let p=T.queue_groups.find(K=>K.root_dir===y.root_dir),_=y.place_lanes||[],E=T.cross_lanes_revision!==null,G=[{id:"parallel",label:"\uBCD1\uB82C",count:y.place_index??0}];for(let K of T.chain_lanes)G.push({id:`lane:${K.lane_id}`,label:`\uC5F0\uACB0 ${K.number} (${K.draft?"draft":"\uD655\uC815"}) \uB05D\uC5D0`,count:K.rows.length,group:"\uC5F0\uACB0 \uB808\uC778",disabled:!E});G.push({id:"new-lane",label:"+ \uC0C8 \uC5F0\uACB0 \uB808\uC778",group:"\uC5F0\uACB0 \uB808\uC778",disabled:!E,title:E?"\uC774 \uC774\uC288\uB9CC \uB4E0 draft \uB808\uC778\uC744 \uB9CC\uB4ED\uB2C8\uB2E4":"\uC5F0\uACB0 \uB808\uC778 \uC800\uC7A5\uC18C\uB97C \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"});for(let K of _)G.push({id:`serial:${K.id}`,label:`\uC9C1\uB82C ${Number(K.id.slice(1))}`,count:K.length,group:`${p?p.name:""} \uC9C1\uB82C`});return{bead_id:y.id,lanes:G}}function Xe(y){return Ee(y,c`${Sa(H(y),je(y),{exec_chips_mode:"pinned_only",onOpenDoc:l?(p,_)=>l(_,y.root_dir):void 0})}`)}function dt(){return T.runnable_flat?c`<div class="mon2-flat" data-drop="candidate">
        ${T.runnable.map(y=>Xe(y))}
      </div>`:c`${T.runnable_sections.map(y=>{let p=V(y.root_dir);return c`<section
        class="mon2-sec${p?" is-collapsed":""}"
        data-root-dir=${y.root_dir}
        data-section="runnable"
      >
        ${Ce({root_dir:y.root_dir,name:y.name,count:y.items.length})}
        ${p?"":c`<div
              class="mon2-sec__body"
              data-lane="candidate"
              data-drop="candidate"
            >
              ${y.items.map(_=>Xe(_))}
            </div>`}
      </section>`})}`}function xt(y,p=!1){return c`<span class="worker-mini__rowops">
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
    </span>`}function Ct(y,p){return c`<div
      class="mon2-item"
      data-bead-id=${y.id}
      data-drag-kind="parallel"
      data-root-dir=${y.root_dir}
      data-row-index=${p}
      data-queue-index=${String(y.queue_index??0)}
    >
      ${An(H(y),{actions:xt(y,!0)})}
    </div>`}function St(y,p,_,E){return c`<div
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
      ${E.includes(p.id)?c`<span
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
    </div>`}function mt(y){let p=T.cross_lanes_revision!==null,_=Q(y.lane_id),E=_?.held===!0,G=_?.cycle===!0,K=_?_.mismatched:[],se=re&&re.lane_id===y.lane_id?re.corrected:0;return c`<div class="mon2-clane" data-lane-id=${y.lane_id}>
      <header class="mon2-clane__hd">
        <span class="mon2-clane__name">${y.label}</span>
        <span class="mon2-clane__count">${y.rows.length}</span>
        <span class="mon2-clane__badge mon2-clane__badge--${y.state}"
          >${y.badge}</span
        >
        ${se>0?c`<span
              class="mon2-clane__corrected"
              title="기존 blocks 의존이 드롭 순서를 이깁니다 — 그 순서로 다시 놓았습니다"
              >의존에 맞춰 ${se}건 자동 교정</span
            >`:""}
        ${G?c`<span
              class="mon2-clane__cycle"
              title="멤버들의 blocks 의존이 순환합니다 — 어느 순서도 의존을 만족시키지 못합니다"
              >⛔ 의존 사이클 — 자동 교정 불가</span
            >`:""}
        ${E?c`<span
              class="mon2-clane__hold"
              title="멤버 한 명의 의존 자료가 이 스냅샷에 아직 없습니다 — 다음 스냅샷이 채우면 교정합니다"
              >${ai}</span
            >`:""}
        ${y.draft?c`<button
              type="button"
              class="mon2-clane__confirm"
              data-lane-id=${y.lane_id}
              ?disabled=${!p||!y.can_confirm||E}
              title=${E?ai:y.can_confirm?"\uC778\uC811 \uC758\uC874\uC744 \uAC78\uACE0 \uBBF8\uC801\uC7AC \uBA64\uBC84\uB97C \uAC01\uC790 \uB808\uD3EC \uBCD1\uB82C \uD050 \uB05D\uC5D0 \uC62C\uB9BD\uB2C8\uB2E4":"\uBA64\uBC84\uAC00 2\uAC1C \uC774\uC0C1\uC774\uC5B4\uC57C \uD655\uC815\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4"}
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
            </div>`:y.rows.map((xe,Ke)=>St(y,xe,Ke,K))}
      </div>
    </div>`}function ut(y,p,_){return c`<div
      class="mon2-item"
      data-bead-id=${p.id}
      data-drag-kind="repo-serial"
      data-root-dir=${p.root_dir}
      data-lane-id=${y.id}
      data-row-index=${_}
      data-queue-index=${String(p.queue_index??0)}
    >
      ${An(H(p),{actions:xt(p)})}
    </div>`}function vt(y){if(y.length===0)return"";let p=y.length-1;return`${y[0].id} \uC810\uC720${p>0?` +${p}`:""}`}function Rt(y){return c`<div
      class="mon2-item mon2-item--ghost"
      data-bead-id=${y.id}
    >
      ${An({id:y.id,title:y.title,lane:"running",draggable:!1,ghost:!0,badges:[y.badge]})}
    </div>`}function Je(y,p){let _=p.occupants,E=p.cross_wait_peers||[];return{id:p.id,pane_id:"",title:`${y.name} \xB7 \uC9C1\uB82C ${p.index+1}`,rows:[..._.map(G=>Rt(G)),...p.items.map((G,K)=>ut(p,G,K))],count:p.items.length,empty:p.empty===!0,..._.length>0?{badge:c`<span
              class="mon2-lane__occupant"
              title=${_.map(G=>`${G.id} \u2014 ${G.badge}`).join(`
`)}
              >${vt(_)}</span
            >`,held:!0}:{},cycle:p.cycle,header_control:c`<button
        type="button"
        class="mon2-sec__worker"
        data-root-dir=${y.root_dir}
        title="이 레포의 Worker 탭으로 이동"
      >
        Worker ↗
      </button>`,...E.length>0?{after:c`${E.map(G=>c`<div class="mon2-lane__cross-wait">
                  ⚠ 상호 정지 — ${G.workspace_name}·${G.lane}과 교차 대기
                </div>`)}`}:{}}}function b(){let y=T.cross_lanes_revision!==null,p=T.chain_lanes.some(_=>_.draft&&_.rows.length===0);return Js({parallel:{rows:T.parallel_rows.map((_,E)=>Ct(_,E)),count:T.parallel_rows.length,collapsed:Y.isAreaCollapsed("parallel"),drop:{drop:"parallel"}},serial:{lanes:T.queue_groups.flatMap(_=>_.sublanes.serial.map(E=>({...Je(_,E),drop:{drop:"repo-serial",root_dir:_.root_dir,lane_id:E.id,lane_length:String(E.raw_length)}}))),collapsed:Y.isAreaCollapsed("serial"),extra_panes:T.chain_lanes.map(_=>mt(_)),header_control:c`<button
          type="button"
          class="mon2-newlane"
          ?disabled=${p||!y}
          title=${y?p?"\uBE48 \uC5F0\uACB0 \uB808\uC778\uC774 \uC774\uBBF8 \uC788\uC2B5\uB2C8\uB2E4":"\uBE48 \uC5F0\uACB0 \uB808\uC778\uC744 \uD558\uB098 \uB9CC\uB4ED\uB2C8\uB2E4":"\uC5F0\uACB0 \uB808\uC778 \uC800\uC7A5\uC18C\uB97C \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"}
        >
          + 연결 레인
        </button>`,...T.cross_lanes_unreadable?{notice:c`<div class="mon2-clane__unreadable">
                연결 레인 저장소를 읽을 수 없음
              </div>`}:{}}})}function S(y){return c`<div class="worker-rungrid">
      ${T.running.length===0?c`<div class="worker-rungrid__empty">실행 세션 없음</div>`:T.running.map(p=>hl({bead_id:p.id,attempt_id:p.attempt_id||"",title:p.title,runner:p.runner??null,model:p.model??null,effort:p.effort??null,speed:p.speed??null,started_at:p.started_at??null,kind:p.kind,...p.kind==="session"?{updated_at:p.updated_at,session_refs:p.session_refs||[]}:{},workflow:p.workflow||null,resumed_from:p.resumed_from??null,continuation_mode:p.continuation_mode??null,paused:p.run_state==="paused",failed:p.run_state==="failed",parked:p.run_state==="parked",retry_wait:p.run_state==="retry_wait",waiting:p.run_state==="waiting",wait:p.wait||null,retry:p.retry||null,status:p.status,status_label:p.run_state==="failed"?"\uC2E4\uD328":p.run_state==="parked"?"\uC138\uC158 \uB300\uAE30":p.run_state==="retry_wait"?"\uC7AC\uC2DC\uB3C4 \uB300\uAE30":p.run_state==="waiting"?"\uC120\uD589 \uB300\uAE30":void 0,can_pause:p.can_pause!==!1,exec_chips:p.exec_chips||null,usage:p.usage||null,chip_popover:w(p),discard:p.discard,failure:p.failure?{...p.failure,open:M===p.attempt_id}:null},y,F,{monitor:{repo:p.workspace_name,root_dir:p.root_dir,serial_lane_id:p.serial_lane_id,cross_lane_chip:p.cross_lane_chip||null,last_activity:p.last_activity||null,legs:p.legs||[],dependency_chips:Qe(p)}}))}
    </div>`}function te(y){let p={runnable:T.runnable,queue:T.queue,running:T.running,pr_wait:T.pr_wait,done:T.done},_=E=>{let G=p[E.lane],K=E.lane==="runnable"?T.runnable_flat?G.length>0?dt():void 0:T.runnable_sections.length>0?dt():void 0:E.lane==="queue"?T.queue_groups.length>0||T.chain_lanes.length>0||T.parallel_rows.length>0||T.cross_lanes_unreadable?b():void 0:E.lane==="running"?S(y):G.length>0?c`${G.map(se=>An(H(se)))}`:void 0;return Nn({id:`monitor-${E.lane}`,lane:E.pane,title:E.title,items:G,count:G.length,src:E.lane==="runnable",empty:E.empty,body:K,live:E.lane==="running"&&G.length>0,collapsible:!0,collapsed:Y.isCollapsed(E.pane),controls:E.lane==="runnable"?ee():void 0,header_control:_e(E.lane,G.length)})};if(J){let E=Cy.map(G=>Cp.find(K=>K.lane===G)).filter(G=>G!==void 0);return c`<div class="mon2-deck"></div>
        <div class="worker-lanes-host">
          <div class="worker-lanes worker-lanes--mobile mon2-lanes">
            ${ei({live:T.running.length>0,running_body:T.running.length>0?S(y):"",pr_wait_rows:T.pr_wait.map(G=>An(H(G))),count:T.running.length+T.pr_wait.length})}
            ${E.map(G=>_(G))}
          </div>
        </div>`}return c`<div class="mon2-deck"></div>
      <div class="worker-lanes-host">
        <div class="worker-lanes mon2-lanes">
          ${Cp.map(E=>_(E))}
        </div>
      </div>`}function ee(){return c`<div class="worker-filter">
      <label class="worker-filter__tgl" title="blocked 이슈 표시">
        <input
          type="checkbox"
          class="mon-filter__blocked"
          .checked=${$.show_blocked}
        />
        🔒
        blocked${T.runnable_hidden.blocked>0?` ${T.runnable_hidden.blocked}`:""}
      </label>
      <div class="worker-filter__spec" role="group" aria-label="spec 필터">
        ${La.map(y=>c`<button
              type="button"
              class="mon-filter__spec worker-filter__chip${$.spec===y.value?" is-active":""}"
              data-spec=${y.value}
              aria-pressed=${$.spec===y.value?"true":"false"}
            >
              ${y.label}
            </button>`)}
        ${T.runnable_hidden.spec>0?c`<span class="worker-filter__hidden"
              >숨김 ${T.runnable_hidden.spec}</span
            >`:""}
      </div>
    </div>`}function _e(y,p){return y==="runnable"?c`<select
        class="mon-candidate-sort worker-sort"
        aria-label="후보 정렬"
        title="후보 정렬"
        .value=${O}
      >
        ${Mo.map(_=>c`<option
              value=${_.value}
              ?selected=${O===_.value}
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
        .value=${g}
      >
        ${Mr.map(_=>c`<option value=${_.value} ?selected=${g===_.value}>
              ${_.label}
            </option>`)}
      </select>`:""}function Ue(y){let p=o&&o.get?o.get():null,_=o&&o.getWorkspacesState?o.getWorkspacesState():[],E=y===void 0?o&&o.crossLanes?o.crossLanes():void 0:y,G={done_since:vr(g,d()),running_sort:m,candidate_filter:$,candidate_sort:O};return E!==void 0&&(G.cross_lanes=E),lr(p,_,G)}function Se(){let y=d();T=Ue(),U=null,Z=new Map;for(let p of[...T.runnable,...T.queue,...T.running,...T.pr_wait,...T.done])!p.non_occupying&&!Z.has(p.id)&&Z.set(p.id,p);rt(te(y),le),Ze()?.render(),Ne(),_t()}function Ne(){let y=new Map;for(let p of T.queue_groups)y.set(p.root_dir,p.auto_advance);for(let p of Array.from(le.querySelectorAll(".worker-wait__area--parallel .worker-mini__repo"))){let _=p.closest(".mon2-item")?.getAttribute("data-root-dir")||"",E=y.get(_);typeof E=="boolean"&&p.setAttribute("title",`${p.textContent||""} \xB7 ${E?"\uC790\uB3D9\uD654 \uCF1C\uC9D0":"\uC790\uB3D9\uD654 \uAEBC\uC9D0"}`)}}function Ze(){if(me)return me;let y=le.querySelector(".mon2-deck");return y?(me=Ep(y,{workspacesState:()=>o&&o.getWorkspacesState?o.getWorkspacesState():[],doneItems:()=>T.done,rangeLabel:ve,transport:s,implPresetStore:t.execPresetStore,gotoWorkerTab:ft,onFocusChange:p=>{W=p,_t()}}),me):null}function _t(){le.classList.toggle("has-focus",W!==null);for(let y of Array.from(le.querySelectorAll(".mon2-sec[data-root-dir]")))y.classList.toggle("is-focus",W!==null&&y.getAttribute("data-root-dir")===W);for(let y of Array.from(le.querySelectorAll(".mon2-item[data-bead-id], .rtile[data-bead-id], .worker-mini[data-bead-id], .worker-card[data-bead-id]"))){let p=Z.get(y.getAttribute("data-bead-id")||"");y.classList.toggle("is-focus",W!==null&&!!p&&p.root_dir===W)}for(let y of Array.from(le.querySelectorAll(".mon2-crow[data-root-dir]")))y.classList.toggle("is-focus",W!==null&&y.getAttribute("data-root-dir")===W)}function Be(y,p){let _=i?i():void 0;if(!p||!_||p===_||!a){r(y);return}a(p).then(()=>{r(y)}).catch(E=>{n("workspace switch for %s failed: %o",p,E)})}function ft(y){if(!y)return;let p=i?i():void 0,_=()=>{try{u?.gotoView("worker")}catch(E){n("gotoView(worker) failed: %o",E)}};if(!a||p&&p===y){_();return}a(y).then(_).catch(E=>{n("workspace switch for %s failed: %o",y,E),ye("\uB808\uD3EC \uC804\uD658\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error")})}function qt(y){on(y).then(p=>{ye(p?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",p?"success":"error",1400)})}function Ft(y){let p=Z.get(y)||null;return{item:p,root_dir:p?p.root_dir:"",revision:p?p.expected_revision:0}}async function Xt(y,p,_){if(y!=="dep-add")return;let E=T.chain_lanes.find(G=>G.rows.some(K=>K.id===p));!E||!E.rows.some(G=>G.id===_)||await oe(G=>Qu(E.lane_id,G),"",[{type:y,a:p,b:_}])}function kt(){return(o&&o.crossLanes?o.crossLanes():null)??null}async function et(y,p){if(y==="run"){await Qt(p);return}if(y==="stop"){await tn(p);return}if(y==="create"){await oe(_=>Na(null,_),"");return}if(y==="remove"){let _=Ju(p,I());if(_!==null&&!f(_))return;await oe(E=>Zu(p,E),"");return}await oe(_=>y==="confirm"?Vu(p,_):Xu(p,_),"")}function Pt(y){let p=new Map;for(let _ of y.rows){let E=T.owner_of[_.id]||_.root_dir;typeof E!="string"||E.length===0||p.set(E,[...p.get(E)||[],_.id])}return p}async function Qt(y){let p=T.chain_lanes.find(K=>K.lane_id===y);if(!p||T.cross_lanes_revision===null){Se();return}we();let _=new Map,E=new Map,G=Pt(p);for(let K of p.rows){if(!K.unplaced)continue;let se=T.owner_of[K.id]||K.root_dir;if(typeof se!="string"||se.length===0){ye(`${K.id}\uC758 \uB808\uD3EC\uB97C \uC54C \uC218 \uC5C6\uC5B4 \uC801\uC7AC\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4`,"error"),Se();return}let xe=E.get(se)??0;if(await ie("worker-queue-place",{bead_id:K.id,lane:"parallel",index:(T.parallel_raw_length[se]??0)+xe},se,_,{bead_id:K.id})===null){Se();return}E.set(se,xe+1)}for(let[K,se]of G)if(await ie("worker-queue-arm",{bead_ids:se,lane_id:y},K,_,{bead_id:se[0]})===null){ye("\uC77C\uBD80 \uB808\uD3EC\uC5D0\uC11C \uC9C4\uD589\uC744 \uCF1C\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 \u2014 [\u25B6 \uC774\uC5B4\uC11C \uC9C4\uD589]\uC73C\uB85C \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC138\uC694","error"),Se();return}Se()}async function tn(y){let p=T.chain_lanes.find(E=>E.lane_id===y);if(!p||T.cross_lanes_revision===null){Se();return}we();let _=new Map;for(let[E,G]of Pt(p))if(await ie("worker-queue-disarm",{lane_id:y},E,_,{bead_id:G[0]})===null)break;Se()}async function zt(y,p){let{root_dir:_,revision:E}=Ft(y);if(_.length===0){Se();return}await ie("worker-queue-disarm",{bead_ids:[y],lane_id:p},_,new Map([[_,E]]),{bead_id:y}),Se()}async function jt(y,p){let _=Z.get(y);if(!_){Se();return}let E={kind:"candidate",bead_id:y,root_dir:_.root_dir};if(p==="new-lane"){await oe(G=>Na({bead_id:y,root_dir:_.root_dir},G),y);return}if(p.startsWith("lane:")){let G=p.slice(5);if(!T.chain_lanes.find(se=>se.lane_id===G)){Se();return}await oe(se=>ci(E,{kind:"chain",lane_id:G,marker_index:(se.cross_lanes.get(G)?.entries??[]).length},se),y);return}if(p.startsWith("serial:")){let G=p.slice(7),K=(_.place_lanes||[]).find(se=>se.id===G);await Ge(E,{kind:"repo-serial",root_dir:_.root_dir,lane_id:G,index:K?K.index:0});return}await Ge(E,{kind:"parallel",marker_index:T.parallel_rows.length})}async function un(y,p){let _=T.parallel_rows,E=_.findIndex(ot=>ot.id===y);if(E<0)return;let G=_[E].root_dir,K=[];_.forEach((ot,yt)=>{ot.root_dir===G&&K.push(yt)});let se=K.indexOf(E),xe=K[se+p];if(typeof xe!="number")return;let Ke=p===-1?xe:K[se+2]??Math.min(_.length,xe+1);await Ge({kind:"parallel",bead_id:y,root_dir:G,queue_index:_[E].queue_index??0},{kind:"parallel",marker_index:Ke})}async function Mt(y){for(let p of T.chain_lanes){let _=p.rows.find(E=>E.id===y);if(_){await Ge({kind:"chain",bead_id:y,root_dir:_.root_dir,lane_id:p.lane_id,...typeof _.queue_index=="number"?{queue_index:_.queue_index}:{}},{kind:"parallel",marker_index:T.parallel_rows.length});return}}}function Kt(y){return{runner:y.runner||void 0,model:y.model||void 0,effort:y.effort||void 0,status:y.run_state==="running"?"running":y.run_state,worktree:y.root_dir}}function Bt(y,p){let{item:_,root_dir:E,revision:G}=Ft(p),K=_?.attempt_id||"",se=y.classList;if(se.contains("worker-mini__rowops-up")||se.contains("worker-mini__rowops-down")){un(p,se.contains("worker-mini__rowops-up")?-1:1);return}if(se.contains("worker-mini__rowops-remove")){de("worker-queue-remove",{bead_id:p},E,G);return}if(se.contains("mon2-crow__detach")){Mt(p);return}if(se.contains("worker-dep__open")){Be(y.getAttribute("data-dep-id")||"",y.getAttribute("data-root-dir")||"");return}if(se.contains("mon2-arm__release")){zt(p,y.getAttribute("data-lane-id")||"");return}if(se.contains("mon-lane__chip")){let xe=y.getAttribute("data-lane-id")||"";le.querySelector(`.mon2-clane[data-lane-id="${xe}"]`)?.scrollIntoView({block:"nearest"});return}if(se.contains("judgement-chip")){let xe=y.getAttribute("data-chip-key")||"";xe&&N.toggle({bead_id:p,chip_key:xe});return}if(se.contains("rtile__failure-badge")){M=M===K?null:K,Se();return}if(se.contains("rtile__attempt-copy")){let xe=y.getAttribute("data-attempt-id")||"";xe&&on(xe).then(Ke=>{ye(Ke?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",Ke?"success":"error",1400)});return}if(se.contains("worker-card__place")){L=L===p?null:p,Se();return}if(se.contains("worker-card__place-cancel")){L=null,Se();return}if(se.contains("worker-card__place-lane")){let xe=y.getAttribute("data-lane")||"parallel";L=null,jt(p,xe);return}if(se.contains("rtile__session")){if(_&&_.kind==="session"){let xe=(_.session_refs||[]).find(Ke=>Ke&&Ke.current===!0);xe&&(D.hidden=!1,Oe.open(Hr(xe,p,"in_progress",E)),Se());return}F=K,K&&_&&(D.hidden=!1,Oe.open({attempt_id:K,root_dir:E,meta:Kt(_)})),Se();return}if(se.contains("rtile__pause")){Ve("worker-attempt-pause",{attempt_id:K},E);return}if(se.contains("rtile__resume")){zr().then(xe=>{if(xe!==null)return ce("worker-attempt-resume",{attempt_id:K,...xe!==""?{instructions:xe}:{}},E,G)});return}if(se.contains("rtile__parked-retry")){Ve("worker-parked-retry",{bead_id:p,attempt_id:K},E).then(xe=>{xe&&xe.ok===!1&&ye(`\uC7AC\uC2DC\uB3C4 \uAC70\uBD80: ${xe.reason==="not_latest"?"\uC774 bead\uC5D0 \uB354 \uC0C8\uB85C\uC6B4 \uC2DC\uB3C4\uAC00 \uC788\uC2B5\uB2C8\uB2E4":xe.reason||""}`,"error")});return}if(se.contains("rtile__discard")){let xe=y.dataset.confirmation==="merged"?"merged":"unmerged";if(!f(Ro(p,xe)))return;ze({bead_id:p,...K?{attempt_id:K}:{},...y.dataset.operationId?{operation_id:y.dataset.operationId}:{}},E,G);return}if(se.contains("worker-mini__merge")){let xe=be(E,p);xe?.mismatch&&xe.continuation===null?Fe(E,p,G,xe.mismatch):de("worker-merge-queue-add",{bead_id:p},E,G);return}if(se.contains("worker-mini__merge-cancel")){de("worker-merge-queue-remove",{bead_id:p},E,G);return}if(se.contains("worker-mini__discard")){let xe=y.dataset.discardMode==="merged"?"merged":"unmerged";if(!f(Ro(p,xe)))return;ze({bead_id:p,...y.dataset.attemptId?{attempt_id:y.dataset.attemptId}:{},...y.dataset.operationId?{operation_id:y.dataset.operationId}:{}},E,G);return}if(se.contains("worker-mini__revise-fix")){ce("worker-revise-fix",{bead_id:p},E,G);return}se.contains("worker-mini__revise-approve")&&de("worker-revise-approve",{bead_id:p},E,G)}function Zt(y){let p=it.consumeClickSuppression(),_=y.target;if(!_||typeof _.closest!="function"||_.closest("dialog")||_.closest(".worker-drawer-overlay")||_.closest("a"))return;let E=_.closest(".worker-card__id, .worker-mini__id, .rtile__id");if(E){y.preventDefault();let Ie=_.closest(".mon2-item, .rtile, .mon2-crow, .worker-mini")?.getAttribute("data-bead-id")||E.textContent?.trim()||"";Ie&&qt(Ie);return}let G=_.closest(".worker-mini__repo, .worker-card__repo, .mon2-sec__worker");if(G){y.preventDefault();let A=G.getAttribute("data-root-dir")||Z.get(_.closest(".mon2-item, .rtile, .worker-mini")?.getAttribute("data-bead-id")||"")?.root_dir||G.getAttribute("title")||"";ft(A);return}let K=_.closest(".mon2-sec__toggle");if(K){y.preventDefault(),j(K.getAttribute("data-root-dir")||"");return}let se=_.closest(".worker-pane__toggle[data-lane]");if(se){y.preventDefault();let A=se.getAttribute("data-lane")||"";(A==="candidate"||A==="queue"||A==="running"||A==="pr_wait"||A==="done")&&De(A);return}let xe=_.closest(".worker-wait__area-toggle[data-area]");if(xe){y.preventDefault(),lt(xe.getAttribute("data-area")||"parallel");return}if(_.closest(".mon2-newlane")){y.preventDefault(),et("create","");return}let Ke=_.closest(".mon2-clane__confirm, .mon2-clane__reapply, .mon2-clane__remove, .mon2-clane__run, .mon2-clane__stop");if(Ke){y.preventDefault();let A=Ke.getAttribute("data-lane-id")||"",Ie=Ke.classList;et(Ie.contains("mon2-clane__confirm")?"confirm":Ie.contains("mon2-clane__reapply")?"reapply":Ie.contains("mon2-clane__run")?"run":Ie.contains("mon2-clane__stop")?"stop":"remove",A);return}if(_.closest(".mon-merge-all")){y.preventDefault(),Pe();return}let ot=_.closest(".mon-filter__spec");if(ot){y.preventDefault(),$={...$,spec:ot.getAttribute("data-spec")||"all"},Tp($),Se();return}let yt=_.closest(".mon2-item, .rtile, .mon2-crow, .worker-mini, .worker-card");if(!yt)return;let gt=yt.getAttribute("data-bead-id")||"",x=_.closest("button");if(x){y.preventDefault(),Bt(x,gt);return}_.closest(".rtile__failure-pop, .chip-popover")||gt&&!p&&(y.preventDefault(),Be(gt,yt.getAttribute("data-root-dir")||Ft(gt).root_dir))}function pe(y){let p=y.target;if(!p||typeof p.closest!="function")return;let _=p.closest(".mon-filter__blocked");if(_){$={...$,show_blocked:_.checked},Tp($),Se();return}let E=p.closest(".mon-candidate-sort");if(E){O=Mo.some(se=>se.value===E.value)?E.value:"repo_spec",wy(O),Se();return}let G=p.closest(".mon-running-sort");if(G){m=G.value==="repo"?"repo":"started",Ey(m),Se();return}let K=p.closest(".mon-done-range");K&&(g=Mn(K.value),Ay(g),Se())}function C(y){let p=y.target,_=p&&typeof p.closest=="function"?E=>p.closest(E):()=>null;M&&!_(".rtile__failure-pop, .rtile__failure-badge")&&(M=null,Se())}function ge(y){y.key!=="Escape"||M===null||(M=null,Se())}e.addEventListener("click",Zt),e.addEventListener("change",pe),document.addEventListener("click",C),document.addEventListener("keydown",ge),N.attach(),it.attach(e);{let y=!0;X=Ti(p=>{if(J=p,y){y=!1;return}Se()})}o&&typeof o.subscribe=="function"&&(fe=o.subscribe(()=>{try{Re.clear(),Se()}catch{}}));function ue(){Te!==null&&(clearInterval(Te),Te=null)}return{recorrectSharedLane:Xt,load(){n("load"),Se(),Te===null&&(Te=setInterval(()=>{try{Se()}catch{}},Ty))},pause(){ue()},clear(){ue(),it.detach(),fe&&(fe(),fe=null),X&&(X(),X=null),Oe.destroy(),D.hidden=!0,me?.destroy(),me=null,e.removeEventListener("click",Zt),e.removeEventListener("change",pe),document.removeEventListener("click",C),document.removeEventListener("keydown",ge),N.detach(),e.replaceChildren()}}}function qp(e,t,n){let r=Ot("views:nav"),{global_element:o,repo_element:s}=e,i=null;function l(g){return m=>{m.preventDefault();let $=g==="monitor"&&a()==="monitor"?"worker":g;r("click tab %s",$),n.gotoView($)}}function a(){let g=t.getState();return g.view==="worker"||g.view==="monitor"?g.view:"board"}function u(){let g=a();return c`
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
  `,e.appendChild(n);let r=n.querySelector("#new-issue-form"),o=n.querySelector("#new-title"),s=n.querySelector("#new-type"),i=n.querySelector("#new-priority"),l=n.querySelector("#new-labels"),a=n.querySelector("#new-description"),u=n.querySelector("#new-issue-error"),d=n.querySelector("#btn-cancel"),f=n.querySelector("#btn-create"),g=n.querySelector(".new-issue__close");function m(){s.replaceChildren();let L=document.createElement("option");L.value="",L.textContent="\u2014 Select \u2014",s.appendChild(L);for(let M of Fp){let N=document.createElement("option");N.value=M,N.textContent=jp(M),s.appendChild(N)}i.replaceChildren();for(let M=0;M<=4;M+=1){let N=document.createElement("option");N.value=String(M);let W=Bp[M]||"Medium";N.textContent=`${M} \u2013 ${W}`,i.appendChild(N)}}m();function $(){try{typeof n.close=="function"?n.close():n.removeAttribute("open")}catch{n.removeAttribute("open")}}function O(L){o.disabled=L,s.disabled=L,i.disabled=L,l.disabled=L,a.disabled=L,d.disabled=L,f.disabled=L,f.textContent=L?"Creating\u2026":"Create"}function B(){u.textContent=""}function Y(L){u.textContent=L}function J(){try{let L=window.localStorage.getItem("beads-ui.new.type");L?s.value=L:s.value="";let M=window.localStorage.getItem("beads-ui.new.priority");M&&/^\d$/.test(M)?i.value=M:i.value="2"}catch{s.value="",i.value="2"}}function X(){let L=s.value||"",M=i.value||"";L.length>0&&window.localStorage.setItem("beads-ui.new.type",L),M.length>0&&window.localStorage.setItem("beads-ui.new.priority",M)}async function F(){B();let L=String(o.value||"").trim();if(L.length===0){Y("Title is required"),o.focus();return}let M=Number(i.value||"2");if(!(M>=0&&M<=4)){Y("Priority must be 0..4"),i.focus();return}let N=String(s.value||""),W=String(a.value||""),re={title:L};N.length>0&&(re.type=N),String(M).length>0&&(re.priority=M),W.length>0&&(re.description=W),O(!0);try{await t("create-issue",re)}catch{O(!1),Y("Failed to create issue");return}X(),O(!1),$()}return n.addEventListener("cancel",L=>{L.preventDefault(),$()}),g.addEventListener("click",()=>$()),d.addEventListener("click",()=>$()),n.addEventListener("keydown",L=>{L.key==="Enter"&&(L.ctrlKey||L.metaKey)&&(L.preventDefault(),F())}),r.addEventListener("submit",L=>{L.preventDefault(),F()}),{open(){r.reset(),B(),J();try{"showModal"in n&&typeof n.showModal=="function"?n.showModal():n.setAttribute("open","")}catch{n.setAttribute("open","")}setTimeout(()=>{try{o.focus()}catch{}},0)},close(){$()}}}var Oy=[["route","route \uCE69"],["fast_track","\u26A1 fast_track \uCE69"],["pr","PR \uCE69"],["from","\u21A9 from \uCE69"],["blocked","blocked\xB7\uC0AC\uC6A9\uC790 \uB9AC\uBDF0 \uD544\uC694 \uCE69"],["stepper","stepper"]];function Ly(e,t){return Ji(e,t)?"shown":t.hidden_labels.includes(e)?"hidden_exact":"hidden_prefix"}function Wp(e,t,n){return c`
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
  `}var Iy=[{id:"execution",label:"\uC2E4\uD589",glyph:"\u25C6"},{id:"display",label:"\uD45C\uC2DC",glyph:"\u25EB"}];function Gp(e,t){let{transport:n,policyStore:r,labelOptions:o}=t,s=t.notify||(ne=>ye(ne,"error",4e3)),i=document.createElement("dialog");i.id="settings-dialog",i.className="settings-dialog",i.setAttribute("role","dialog"),i.setAttribute("aria-modal","true"),i.setAttribute("aria-label","\uC124\uC815"),e.appendChild(i);let l="execution",a=!1,u="",d=null;function f(){if(d)return d;let ne=i.querySelector('[data-pane="execution"]');return ne?(d=Pi(ne,{root_dir:null,queue:()=>t.queueStore?.get()??null,transport:n,implPresetStore:t.implPresetStore,notify:s,onQueueAdopt:we=>t.queueStore?.set?.(we)}),d):null}function g(){return c`
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
              ${Wp(ne,o(),Y)}
              ${zp(ne,u,{onDraft:we=>{u=we},onAdd:J,onRemove:X})}
              ${Hp(ne,F)}
            `:c`<div class="settings-dialog__empty">
              표시 정책을 불러오는 중…
            </div>`}
      </section>
    `}async function $(ne){let we=r.get();if(we)try{let ve=await n("display-policy-set",{expected_revision:we.revision,policy:ne(we)});O(ve),ve&&ve.conflict&&ve.policy&&(ve=await n("display-policy-set",{expected_revision:ve.policy.revision,policy:ne(ve.policy)}),O(ve)),ve&&ve.conflict&&s("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC")}catch{s("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328")}}function O(ne){ne&&ne.policy&&typeof ne.policy=="object"&&r.set(ne.policy)}function B(ne){$(ne)}function Y(ne){let we=r.get();if(!we)return;let ve=!My(ne,we);B(le=>Py(ne,le,ve))}function J(){let ne=u.trim();ne.length!==0&&(u="",B(we=>we.hidden_prefixes.includes(ne)?{hidden_prefixes:we.hidden_prefixes}:{hidden_prefixes:[...we.hidden_prefixes,ne]}),L())}function X(ne){B(we=>({hidden_prefixes:we.hidden_prefixes.filter(ve=>ve!==ne)}))}function F(ne){let we=r.get();if(!we)return;let ve=we.chips[ne]===!1;B(()=>({chips:{[ne]:ve}}))}function L(){rt(c`
        <div class="settings-dialog__container">
          <nav
            class="settings-dialog__rail"
            role="tablist"
            aria-orientation="vertical"
          >
            <div class="settings-dialog__rail-title">설정</div>
            ${Iy.map(ne=>c`<button
                  type="button"
                  class="settings-dialog__tab"
                  role="tab"
                  data-tab=${ne.id}
                  aria-selected=${String(l===ne.id)}
                  aria-controls=${`settings-pane-${ne.id}`}
                  @click=${()=>M(ne.id)}
                >
                  <span class="settings-dialog__glyph">${ne.glyph}</span>
                  ${ne.label}
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
      `,i),f()}function M(ne){l=ne,L()}let N=()=>{a=!1,t.onOpenChange?.(!1)};i.addEventListener("close",N),i.addEventListener("cancel",N);let W=ne=>{ne.target===i&&Q()};i.addEventListener("click",W);let re=null;r.subscribe&&(re=r.subscribe(()=>{a&&L()}));let q=null;t.implPresetStore?.subscribe&&(q=t.implPresetStore.subscribe(()=>{a&&d?.render()}));function U(ne="execution"){a||(a=!0,t.onOpenChange?.(!0),l=ne,u="",L(),typeof i.showModal=="function"?i.showModal():i.setAttribute("open",""),f()?.load())}function Q(){a&&(a=!1,t.onOpenChange?.(!1),typeof i.close=="function"?i.close():i.removeAttribute("open"))}return{open:U,close:Q,sessionDraft:()=>d?.sessionDraft()??{},destroy(){a=!1,i.removeEventListener("close",N),i.removeEventListener("cancel",N),i.removeEventListener("click",W),re&&(re(),re=null),q&&(q(),q=null),d?.destroy(),d=null,i.remove()}}}function My(e,t){return t.visible_labels.includes(e)?!0:t.hidden_labels.includes(e)?!1:!t.hidden_prefixes.some(n=>n.length>0&&e.startsWith(n))}function Py(e,t,n){if(!n)return{hidden_labels:t.hidden_labels.includes(e)?t.hidden_labels:[...t.hidden_labels,e],visible_labels:t.visible_labels.filter(s=>s!==e)};let r=t.hidden_labels.filter(s=>s!==e);return t.hidden_prefixes.some(s=>s.length>0&&e.startsWith(s))?{hidden_labels:r,visible_labels:t.visible_labels.includes(e)?t.visible_labels:[...t.visible_labels,e]}:{hidden_labels:r}}var Dy=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],Kp="usage-meter-card",Ny="usage-meter-layer",yl=600,qy=["token_expired","relogin_required"];function Yp(e){return String(e).padStart(2,"0")}function Fy(e,t){let n=Math.max(0,Math.ceil((e-t)/6e4)),r=Math.floor(n/1440),o=Math.floor(n%1440/60),s=n%60;return r>0?`${r}d${o>0?` ${o}h`:""}`:o>0?`${o}h${s>0?` ${s}m`:""}`:`${s}m`}function Vp(e,t=Date.now()){let n=Date.parse(e);if(!Number.isFinite(n))return"";let r=new Date(n),o=new Date(t),s=`${Yp(r.getHours())}:${Yp(r.getMinutes())}`,l=r.getFullYear()===o.getFullYear()&&r.getMonth()===o.getMonth()&&r.getDate()===o.getDate()?s:`${Dy[r.getMonth()]} ${r.getDate()} ${s}`;return`${Fy(n,t)} \xB7 ${l}`}function jy(e){let t=Math.max(0,Math.floor(e));return t<60?`${t}\uCD08 \uC804`:t<3600?`${Math.floor(t/60)}\uBD84 \uC804`:`${Math.floor(t/3600)}\uC2DC\uAC04 \uC804`}function Xp(e){return e>=85?"usage-meter__window--danger":e>=60?"usage-meter__window--warn":"usage-meter__window--success"}function Qp(e){let t=typeof e=="number"&&Number.isFinite(e)?e:0;return Math.min(100,Math.max(0,t))}var Zp=[{key:"claude",label:"Claude",endpoint:"/api/claude-usage",switch_endpoint:"/api/claude-account/switch",tool:"cswap"},{key:"codex",label:"Codex",endpoint:"/api/codex-usage",switch_endpoint:"/api/codex-account/switch",tool:"codex-auth"}];function ef(e){let t=[];for(let n of e){if(!n||typeof n!="object")continue;let r=n;typeof r.key!="string"||r.key.length===0||typeof r.pct!="number"||!Number.isFinite(r.pct)||t.push({key:r.key,pct:r.pct,resetsAt:typeof r.resetsAt=="string"?r.resetsAt:""})}return t}function By(e){if(!e||typeof e!="object")return null;let t=e;return!Number.isInteger(t.number)||t.number<=0||typeof t.email!="string"||t.email.length===0||typeof t.status!="string"||t.status.length===0||typeof t.active!="boolean"||!Array.isArray(t.windows)?null:{number:t.number,email:t.email,alias:typeof t.alias=="string"&&t.alias.length>0?t.alias:null,plan:typeof t.plan=="string"&&t.plan.length>0?t.plan:null,active:t.active,status:t.status,windows:ef(t.windows),fetchedAt:typeof t.fetchedAt=="string"?t.fetchedAt:null,ageSeconds:typeof t.ageSeconds=="number"&&Number.isFinite(t.ageSeconds)?t.ageSeconds:null}}function Uy(e,t){if(!e||typeof e!="object")return null;let n=e,r=[];if(Array.isArray(n.accounts))for(let s of n.accounts){let i=By(s);i&&r.push(i)}let o=n.available===!0&&Array.isArray(n.windows);return!o&&r.length===0?null:{available:o,windows:o?ef(n.windows):[],ageSeconds:typeof n.ageSeconds=="number"&&Number.isFinite(n.ageSeconds)?n.ageSeconds:null,accounts:r,receivedAtMs:t,held:!1}}function Wy(e,t){if(!e||typeof e!="object")return{kind:"error"};let n=Uy(e,t);return n?{kind:"ok",snapshot:n}:Array.isArray(e.accounts)?{kind:"empty"}:{kind:"error"}}function tf(e,t){return(e.ageSeconds===null?0:e.ageSeconds)+Math.max(0,t-e.receivedAtMs)/1e3}function zy(e,t){return!e.held||tf(e,t)<=yl?e:{...e,available:!1,windows:[],accounts:[]}}function Jp(e,t){return`${e}:${t}`}function nf(e){let t=!1,n=null,r=new Map,o=null,s=new Map,i=new Map,l=0,a=null;function u(){rt(c``,e),e.hidden=!0,f()}function d(){if(a===null){let le=e.ownerDocument;a=le.createElement("div"),a.id=Ny,a.className="usage-meter__layer",le.body.appendChild(a)}return a}function f(){a!==null&&(rt(c``,a),a.remove(),a=null)}function g(le){n!==le&&(n===null&&(document.addEventListener("mousedown",$),document.addEventListener("keydown",B),window.addEventListener("resize",O)),n=le)}function m(){n!==null&&(n=null,document.removeEventListener("mousedown",$),document.removeEventListener("keydown",B),window.removeEventListener("resize",O))}function $(le){let D=le.target;D&&(e.contains(D)||a!==null&&a.contains(D))||(m(),Q())}function O(){Q()}function B(le){le.key==="Escape"&&(m(),Q())}function Y(le){n===le?m():g(le),Q()}function J(){m(),Q()}async function X(le,D){if(r.has(le.key))return;let $e=Jp(le.key,D);r.set(le.key,D),i.delete($e),Q();let Ae=null;try{Ae=await(await fetch(le.switch_endpoint,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({number:D})})).json()}catch{Ae=null}if(t)return;if(r.delete(le.key),!Ae||Ae.ok!==!0){let Z=Ae&&typeof Ae.error=="string"&&Ae.error.length>0?Ae.error:"network_error";i.set($e,{kind:"error",text:`\uC804\uD658 \uC2E4\uD328 \u2014 ${Z}`}),Q();return}let T=Array.isArray(Ae.warnings)?Ae.warnings.filter(Z=>typeof Z=="string"&&Z.length>0):[];T.length>0&&i.set($e,{kind:"warn",text:T.join(" \xB7 ")}),Q(),await ve()}function F(le,D,$e,Ae){let T=Qp(le.pct),Re=`resets ${Vp(le.resetsAt,Ae)}${D?` \xB7 ${$e}`:""}`;return c`<span
      class="usage-meter__window ${Xp(T)}"
      style=${`--progress: ${T}%`}
      title=${Re}
    >
      <span class="usage-meter__label">${le.key}</span>
      <span class="usage-meter__track" aria-hidden="true">
        <span class="usage-meter__fill"></span>
      </span>
      <span class="usage-meter__pct">${T}%</span>
    </span>`}function L(le,D,$e){let Ae=tf(D,$e),T=D.available&&(D.held||Ae>yl),Z=T?`${Math.floor(Ae/60)}\uBD84 \uC804 \uCE21\uC815`:"",Re=D.accounts.filter(Oe=>!Oe.active).length,fe=`usage-meter__group${T?" usage-meter__group--stale":""}`,Te=c`<span class="usage-meter__provider"
        >${le.label}</span
      >
      ${D.available?D.windows.map(Oe=>F(Oe,T,Z,$e)):c`<span class="usage-meter__empty">사용량 없음</span>`}
      ${Re>0?c`<span class="usage-meter__badge">+${Re}</span>`:""}`;if(D.accounts.length===0)return c`<span
        class=${fe}
        aria-label=${`${le.label} usage`}
        >${Te}</span
      >`;let me=n===le.key;return c`<button
      type="button"
      class=${`usage-meter__toggle ${fe}`}
      aria-label=${`${le.label} usage`}
      aria-expanded=${me?"true":"false"}
      aria-controls=${Kp}
      @click=${()=>Y(le.key)}
    >
      ${Te}
    </button>`}function M(le,D){return c`<span class="usage-meter" aria-label="Usage">
      ${le.map($e=>L($e.provider,$e.snapshot,D))}
    </span>`}function N(le,D){let $e=Qp(le.pct),Ae=Vp(le.resetsAt,D);return c`<span
      class="usage-meter__account-window ${Xp($e)}"
      style=${`--progress: ${$e}%`}
    >
      <span class="usage-meter__account-key">${le.key}</span>
      <span class="usage-meter__account-track" aria-hidden="true">
        <span class="usage-meter__account-fill"></span>
      </span>
      <span class="usage-meter__account-pct">${$e}%</span>
      <span class="usage-meter__account-reset"
        >${Ae.length>0?`\u21BB ${Ae}`:""}</span
      >
    </span>`}function W(le,D){return qy.includes(D)?`\uD1A0\uD070 \uB9CC\uB8CC \u2014 ${le.tool} \uC7AC\uB85C\uADF8\uC778 \uD544\uC694`:"\uC0AC\uC6A9\uB7C9 \uC5C6\uC74C"}function re(le,D,$e){let Ae=D.status==="ok",T=typeof D.ageSeconds=="number"&&D.ageSeconds>yl,Z=i.get(Jp(le.key,D.number)),Re=r.get(le.key),fe=Re!==void 0,Te=Re===D.number,me=["usage-meter__account"];return D.active&&me.push("usage-meter__account--active"),Ae||me.push("usage-meter__account--unavailable"),T&&me.push("usage-meter__account--stale"),c`<div class=${me.join(" ")}>
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
              >${jy(D.ageSeconds)}</span
            >`}
        ${D.active?"":c`<button
              type="button"
              class="usage-meter__switch"
              ?disabled=${fe}
              @click=${()=>{X(le,D.number)}}
            >
              ${Te?"\uC804\uD658 \uC911\u2026":"\uC804\uD658"}
            </button>`}
      </div>
      ${Ae?c`<div class="usage-meter__account-windows">
            ${D.windows.map(Oe=>N(Oe,$e))}
          </div>`:c`<div class="usage-meter__account-status">
            ${W(le,D.status)}
          </div>`}
      ${Z===void 0?"":c`<div
            class="usage-meter__account-message usage-meter__account-message--${Z.kind}"
          >
            ${Z.text}
          </div>`}
    </div>`}function q(le,D,$e){let Ae=D.accounts.filter(T=>T.active).length;return c`<section class="usage-meter__section">
      <h2 class="usage-meter__section-title">
        ${le.label} · 활성 ${Ae} / 전체
        ${D.accounts.length}
      </h2>
      ${D.accounts.map(T=>re(le,T,$e))}
    </section>`}function U(le,D){return c`<div
      class="usage-meter__card"
      id=${Kp}
      role="dialog"
      aria-label=${`${le.provider.label} \uACC4\uC815 \uC0AC\uC6A9\uB7C9`}
    >
      ${q(le.provider,le.snapshot,D)}
      <p class="usage-meter__note">전환은 새로 시작하는 세션부터 적용됩니다.</p>
    </div>`}function Q(){let le=Date.now(),D=[];for(let Ae of Zp){let T=s.get(Ae.key);T&&D.push({provider:Ae,snapshot:zy(T,le)})}if(D.length===0){m(),u();return}let $e=D.find(Ae=>Ae.provider.key===n&&Ae.snapshot.accounts.length>0);$e||m(),rt(M(D,le),e),e.hidden=!1,$e?ne($e,le):f()}function ne(le,D){let $e=d(),Ae=e.getBoundingClientRect(),T=e.ownerDocument.documentElement.clientWidth;$e.style.setProperty("--usage-meter-anchor-top",`${Ae.bottom}px`),$e.style.setProperty("--usage-meter-anchor-right",`${Math.max(0,T-Ae.right)}px`),rt(c`<div
          class="usage-meter__scrim"
          aria-hidden="true"
          @mousedown=${J}
        ></div>
        ${U(le,D)}`,$e)}async function we(le){try{let D=await fetch(le.endpoint);return D.ok?Wy(await D.json(),Date.now()):{kind:"error"}}catch{return{kind:"error"}}}async function ve(){l+=1;let le=l,D=await Promise.all(Zp.map(async $e=>({provider:$e,read:await we($e)})));if(!(t||le!==l)){for(let $e of D){let Ae=$e.provider.key;if($e.read.kind==="ok"){s.set(Ae,$e.read.snapshot);continue}if($e.read.kind==="empty"){s.delete(Ae);continue}let T=s.get(Ae);T!==void 0&&!T.held&&s.set(Ae,{...T,held:!0})}Q()}}return u(),ve(),o=setInterval(()=>{ve()},6e4),{destroy(){t=!0,o!==null&&(clearInterval(o),o=null),m(),u()}}}function Ni(e){let t=e?.blocked_info;return t&&typeof t=="object"?Array.isArray(t.blockers)?t.blockers.filter(r=>typeof r=="string"&&r.length>0):[]:(Array.isArray(e?.dependencies)?e.dependencies:[]).map(r=>{if(typeof r=="string")return r;if(!r||typeof r!="object")return"";let o=r.type??r.dependency_type;return o!==void 0&&o!=="blocks"?"":r.depends_on_id||r.id||""}).filter(Boolean)}var sf="bdui.worker.candidate_sort",ts=Object.freeze([{id:"spec",label:"spec \uC6B0\uC120",chain:[{key:"spec",dir:"desc"},{key:"created",dir:"asc"}]},{id:"bottleneck",label:"\uBCD1\uBAA9 \uC6B0\uC120",chain:[{key:"priority",dir:"asc"},{key:"dependents",dir:"desc"},{key:"released",dir:"desc"}]},{id:"created",label:"\uCD5C\uC2E0 \uC0DD\uC131",chain:[{key:"created",dir:"desc"},{key:"priority",dir:"asc"}]},{id:"updated",label:"\uCD5C\uC2E0 \uC218\uC815",chain:[{key:"updated",dir:"desc"}]}]),qi=Object.freeze({preset:"spec"}),af=3,lf=Object.freeze([{key:"priority",label:"\uC6B0\uC120\uC21C\uC704"},{key:"dependents",label:"\uD6C4\uC18D \uC218"},{key:"released",label:"\uD574\uC81C \uC2DC\uAC01"},{key:"spec",label:"spec \uC720\uBB34"},{key:"created",label:"\uC0DD\uC131"},{key:"updated",label:"\uC218\uC815"}]);function rf(e){return ts.some(t=>t.id===e)}function of(e){let t=ts.find(n=>n.id===e);return t?t.chain.map(n=>({...n})):[]}function Hy(e,t){return e.length===t.length&&e.every((n,r)=>n.key===t[r].key&&n.dir===t[r].dir)}function ns(e){return e&&"preset"in e?of(e.preset):e&&Array.isArray(e.chain)?e.chain.map(t=>({...t})):of("spec")}function vl(e){return e&&"preset"in e?e.preset:null}function Or(e){if(typeof e=="string"){let s;try{s=JSON.parse(e)}catch{return rf(e)?{preset:e}:qi}return Or(s)}if(!e||typeof e!="object")return qi;let t=e;if(rf(t.preset))return{preset:t.preset};let n=t.chain;if(!Array.isArray(n)||n.length===0||n.length>af||!n.every(Vi))return qi;let r=[];for(let s of n)r.some(i=>i.key===s.key)||r.push({key:s.key,dir:s.dir});let o=ts.find(s=>Hy(s.chain,r));return o?{preset:o.id}:{chain:r}}function cf(){try{return Or(window.localStorage.getItem(sf))}catch{return qi}}function wl(e){try{window.localStorage.setItem(sf,JSON.stringify(e))}catch{}}function uf(e,t,n){let r=e.map(a=>({...a}));if(!n)return r.slice(0,t);if(!Object.prototype.hasOwnProperty.call(gs,n))return r;let o=n;if(r.slice(0,t).some(a=>a.key===o))return r.slice(0,t);let s={key:o,dir:r[t]&&r[t].key===o?r[t].dir:gs[o]},i=r.slice(0,t),l=r.slice(t+1).filter(a=>a.key!==o);return[...i,s,...l].slice(0,af)}function df(e,t){return e.map((n,r)=>r===t?{key:n.key,dir:n.dir==="asc"?"desc":"asc"}:{...n})}function Gy(e){let t=new Set(e.map(l=>l.id)),n=new Map,r=new Map;for(let l of e){let a=Ni(l).filter(u=>t.has(u));n.set(l.id,a);for(let u of a){let d=r.get(u);d?d.push(l):r.set(u,[l])}}let o=new Set,s=[],i=l=>{o.add(l.id),s.push(l);for(let a of r.get(l.id)??[])!o.has(a.id)&&(n.get(a.id)??[]).every(u=>o.has(u))&&i(a)};for(;s.length<e.length;){let l=e.find(a=>!o.has(a.id)&&(n.get(a.id)??[]).every(u=>o.has(u)));i(l??e.find(a=>!o.has(a.id)))}return s}function pf(e,t){let n=Array.isArray(e)?e.slice():[];return n.sort(ac(ns(t))),Gy(n)}function ff(e,t){let n=new Map;if(!e||typeof e!="object")return n;let r=e,o=[],s=new Set;for(let i of t){if(s.has(i.id))continue;s.add(i.id);let l=r[i.id];if(!l||!Array.isArray(l.scope))continue;let a=l.scope.filter(u=>typeof u=="string"&&u.length>0);if(a.length===0){n.set(i.id,{overlaps:[],scope_missing:!0});continue}n.set(i.id,{overlaps:[],scope_missing:!1}),o.push({member:i,scope:a})}for(let i=0;i<o.length;i+=1)for(let l=i+1;l<o.length;l+=1){let a=Fs(o[i].scope,o[l].scope);if(a.length===0)continue;let u=o[i].member,d=o[l].member;n.get(u.id)?.overlaps.push({id:d.id,title:d.title,location_label:d.location_label,prefixes:a}),n.get(d.id)?.overlaps.push({id:u.id,title:u.title,location_label:u.location_label,prefixes:a})}return n}var _f=new Set(["sh","bash","zsh","dash","ksh"]),mf=/('(?:[^']*)'|"(?:\\.|[^"\\])*"|#.*|\$(?:\{[^}\n]*\}|[A-Za-z_][A-Za-z0-9_]*|[?#@*!$0-9-])|\b(?:if|then|else|elif|fi|for|while|until|do|done|case|esac|in|function|select|time)\b)/g;function gf(e){let t=e.split("/");return t[t.length-1]||""}function Ky(e){let t=e.split(`
`,1)[0];if(!t.startsWith("#!"))return!1;let n=t.slice(2).trim().split(/\s+/).filter(Boolean);if(n.length===0)return!1;let r=gf(n[0]);if(r!=="env")return _f.has(r);let o=n.slice(1).find(s=>!s.startsWith("-")&&!s.includes("="));return o!==void 0&&_f.has(gf(o))}function Yy(e){return e.startsWith("#")?"comment":e.startsWith("'")||e.startsWith('"')?"string":e.startsWith("$")?"variable":"keyword"}function Vy(e){let t=[],n=0;mf.lastIndex=0;for(let r of e.matchAll(mf)){let o=r.index;o>n&&t.push({text:e.slice(n,o),kind:"plain"}),t.push({text:r[0],kind:Yy(r[0])}),n=o+r[0].length}return n<e.length&&t.push({text:e.slice(n),kind:"plain"}),t.length===0&&t.push({text:e,kind:"plain"}),t}function Xy(e){return{bad_request:"\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD\uC774 \uC62C\uBC14\uB974\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.",forbidden:"\uB4F1\uB85D\uB418\uC9C0 \uC54A\uC740 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uC758 \uC2A4\uD06C\uB9BD\uD2B8\uB294 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",lane_not_declared:"\uD604\uC7AC \uACE0\uC815 \uC120\uC5B8\uC5D0 \uD574\uB2F9 \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4.",stale_declaration:"\uC800\uC7A5\uC18C \uC791\uC5C5 \uC120\uC5B8\uC774 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uD654\uBA74\uC5D0\uC11C \uB2E4\uC2DC \uC5F4\uC5B4 \uC8FC\uC138\uC694.",too_large:"\uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uB108\uBB34 \uCEE4\uC11C \uD654\uBA74\uC5D0 \uD45C\uC2DC\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",unsupported_content:"\uD14D\uC2A4\uD2B8 \uD615\uC2DD\uC758 \uC2A4\uD06C\uB9BD\uD2B8\uB9CC \uD45C\uC2DC\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.",unreadable:"\uACE0\uC815\uB41C \uC2A4\uD06C\uB9BD\uD2B8 \uB0B4\uC6A9\uC744 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4."}[e]||"\uC2A4\uD06C\uB9BD\uD2B8\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4."}function hf(e){let t=e.getWorkspacePath,n=e.fetchImpl||globalThis.fetch?.bind(globalThis),r=document.createElement("div");r.className="repo-ops-script-viewer-root",document.body.appendChild(r);let o=null,s="loading",i="",l="",a=0,u=null,d=!1;function f(L,M){return M?Vy(L).map(N=>N.kind==="plain"?N.text:c`<span
            class="repo-ops-script-viewer__token repo-ops-script-viewer__token--${N.kind}"
            >${N.text}</span
          >`):L}function g(){if(!o)return c``;let L=s==="ready"&&Ky(i),M=s==="ready"?i.split(`
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
              @click=${()=>{$()}}
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
                  ${M.map((N,W)=>c`<div class="repo-ops-script-viewer__row">
                        <span
                          class="repo-ops-script-viewer__line-number"
                          aria-hidden="true"
                          >${W+1}</span
                        ><code class="repo-ops-script-viewer__code-line"
                          >${f(N,L)}</code
                        >
                      </div>`)}
                </div>`}
        </div>
      </section>
    </div>`}function m(){rt(g(),r)}async function $(){if(s!=="ready")return;let L=await on(i);ye(L?"\uC2A4\uD06C\uB9BD\uD2B8 \uBCF5\uC0AC\uB428":"\uC2A4\uD06C\uB9BD\uD2B8 \uBCF5\uC0AC \uC2E4\uD328",L?"success":"error")}function O(L){L.key==="Escape"&&o&&(L.preventDefault(),X())}function B(){d||(document.addEventListener("keydown",O),d=!0)}function Y(){d&&(document.removeEventListener("keydown",O),d=!1)}async function J(L,M=null){let N=++a;B(),o={...L},u=M||(document.activeElement instanceof HTMLElement?document.activeElement:null),s="loading",i="",l="",m(),r.querySelector(".repo-ops-script-viewer__close")?.focus();let re=t?t():"";if(!re){s="error",l="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4.",m();return}if(!n){s="error",l="\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD \uAE30\uB2A5\uC744 \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",m();return}let q="/api/repo-ops-script?workspace="+encodeURIComponent(re)+"&lane="+encodeURIComponent(L.lane)+"&base_sha="+encodeURIComponent(L.base_sha);try{let U=await n(q),Q=await U.json().catch(()=>({}));if(N!==a)return;if((t?t():"")!==re){X();return}if(!U.ok||!Q||Q.ok!==!0){s="error",l=Xy(Q&&typeof Q.error=="string"?Q.error:""),m();return}o={lane:Q.lane,base_sha:Q.base_sha,path:Q.path,base_ref:Q.base_ref},i=String(Q.content),s="ready",m()}catch{if(N!==a)return;s="error",l="\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",m()}}function X(){a+=1,Y(),o=null,i="",m();let L=u;u=null,L?.isConnected&&L.focus()}function F(){X(),r.remove()}return{open:J,close:X,destroy:F}}var bf={deploy_not_declared:"\uC120\uC5B8 \uC5C6\uC74C",deploy_opted_out:"\uC774 workspace\uC5D0\uC11C \uBC30\uD3EC \uC2E4\uD589\uC774 \uAEBC\uC838 \uC788\uC74C",deploy_in_flight:"\uBC30\uD3EC \uC9C4\uD589 \uC911",target_unresolved:"\uB300\uC0C1 tip\uC744 \uD655\uC815\uD558\uC9C0 \uBABB\uD568",remote_history_not_monotonic:"\uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC\uC640 \uC6D0\uACA9 \uC774\uB825\uC774 \uAC08\uB77C\uC9D0"},Qy=new Set(["queued","running","retry_pending"]);function yf(e){let t=e.queueStore,n=e.transport,r=e.onChanged||(()=>{}),o=e.onOpenScript;function s(){return t&&t.get()||{}}function i(){let q=s();return typeof q.revision=="number"?q.revision:0}function l(q){t&&q&&q.queue&&typeof q.queue=="object"&&t.set(q.queue)}function a(){let q=s().workspace_info;return q&&typeof q=="object"?q:{}}function u(q,U){return c`<span
      class="worker-repo-ops__vd-badge worker-repo-ops__vd-badge--${q}"
      >${U}</span
    >`}function d(q){if(typeof q!="number"||!Number.isFinite(q))return"";let U=q/6e4;return Number.isInteger(U)?`timeout ${U}\uBD84`:`timeout ${Math.round(q/1e3)}\uCD08`}function f(q){let U=d(q);return U?u("config",U):""}function g(q,U,Q){return c`<button
      type="button"
      class="worker-repo-ops__vd-cmd worker-repo-ops__vd-cmd--link"
      .textContent=${Q.script}
      @click=${ne=>{o&&o({lane:q,base_sha:U.base_sha,path:Q.script,base_ref:U.base_ref},ne.currentTarget)}}
    ></button>`}function m(){let q=s().repo_operations;return Array.isArray(q)?q:[]}function $(){let q=a().repo_ops,U=q&&typeof q=="object"?q.repo_id:null;return typeof U=="string"&&U?U:null}function O(){return m().some(q=>q&&q.kind==="deploy"&&Qy.has(q.state))}function B(){let q=O(),U=$()===null;return c`<button
      type="button"
      class="worker-repo-ops__deploy-run"
      data-seam="repo-ops-deploy-run"
      ?disabled=${q||U}
      title=${q?"\uBC30\uD3EC \uC9C4\uD589 \uC911":U?"\uC800\uC7A5\uC18C\uB97C \uD655\uC778\uD560 \uC218 \uC5C6\uC74C":"\uC6D0\uACA9 base tip\uC5D0\uC11C \uBC30\uD3EC \uC2A4\uD06C\uB9BD\uD2B8\uB97C 1\uD68C \uC2E4\uD589\uD569\uB2C8\uB2E4"}
      @click=${()=>{M()}}
    >
      배포 실행
    </button>`}function Y(){let q=s().repo_ops_opt_out;return{verify:q?.verify===!0,deploy:q?.deploy===!0}}function J(q,U){return c`<label class="worker-repo-ops__lane-run">
      <input
        type="checkbox"
        .checked=${!U}
        @change=${Q=>{L(q,!Q.target.checked)}}
      />
      이 workspace에서 실행
    </label>`}function X(q){let U=typeof q.base_sha=="string"?q.base_sha:"",Q=`${q.source_path||"repo-ops/config.toml"} @ ${q.base_ref||"?"}${U?`@${U.slice(0,7)}`:""}`,ne=Y(),we=!!q.verify&&ne.verify,ve=!!q.deploy&&ne.deploy;return c`<section class="worker-repo-ops__vd" data-seam="repo-ops">
      <p class="worker-repo-ops__vd-title">
        저장소 작업 선언
        <span class="worker-repo-ops__vd-src">${Q}</span>
      </p>
      <div
        class="worker-repo-ops__lane${we?" worker-repo-ops__lane--skipped":""}"
        data-lane="verify"
      >
        <span class="worker-repo-ops__lane-k">머지 전 검증</span>
        <span class="worker-repo-ops__lane-v"
          >${q.verify?c`${g("verify",q,q.verify)}
              ${f(q.verify.timeout_ms)}
              ${we?u("skipped","\uC774 workspace\uC5D0\uC11C \uAC74\uB108\uB700"):""}`:c`선언 없음${u("absent","verify \uC5C6\uC774 \uD310\uC815")}`}</span
        >
        <span class="worker-repo-ops__lane-d"
          >${we?"\uC774 workspace\uC5D0\uC11C\uB294 \uAC80\uC99D \uC5C6\uC774 \uD310\uC815\uD569\uB2C8\uB2E4.":q.verify?"\uBA38\uC9C0 \uC804\uC5D0 \uC774 \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uD1B5\uACFC\uD574\uC57C \uC790\uACA9\uC744 \uC5BB\uC2B5\uB2C8\uB2E4.":"\uBA38\uC9C0 \uC790\uACA9\uC740 PR/base/head \uC2E0\uC120\uB3C4\xB7mergeability\xB7\uB9AC\uBDF0 \uC601\uC218\uC99D\uC73C\uB85C\uB9CC \uD310\uC815\uD569\uB2C8\uB2E4."}</span
        >
        ${q.verify?J("verify",ne.verify):""}
      </div>
      <div
        class="worker-repo-ops__lane${ve?" worker-repo-ops__lane--skipped":""}"
        data-lane="deploy"
      >
        <span class="worker-repo-ops__lane-k">머지 후 배포</span>
        <span class="worker-repo-ops__lane-v"
          >${q.deploy?c`${g("deploy",q,q.deploy)}
              ${f(q.deploy.timeout_ms)}
              ${ve?u("skipped","\uC774 workspace\uC5D0\uC11C \uAC74\uB108\uB700"):B()}`:c`선언 없음${u("absent","\uBC30\uD3EC \uC5C6\uC74C")}`}</span
        >
        <span class="worker-repo-ops__lane-d"
          >${ve?"\uC774 workspace\uC5D0\uC11C\uB294 \uBC30\uD3EC \uC5C6\uC774 \uACE7\uBC14\uB85C \uC815\uB9AC\uB85C \uB118\uC5B4\uAC11\uB2C8\uB2E4.":q.deploy?c`Worker가 <code>.worktrees/.repo-ops-deploy</code>에서 대상
                  SHA로 정렬한 뒤 1회 실행합니다.`:"\uBA38\uC9C0 \uD6C4 \uBC30\uD3EC \uB2E8\uACC4 \uC5C6\uC774 \uACE7\uBC14\uB85C \uC815\uB9AC\uB85C \uB118\uC5B4\uAC11\uB2C8\uB2E4."}</span
        >
        ${q.deploy?J("deploy",ne.deploy):""}
      </div>
    </section>`}function F(q){let U=q.repo_ops&&typeof q.repo_ops=="object"?q.repo_ops:null;return U&&(U.status==="resolved"||U.status==="absent")?X(U):U&&(U.status==="pending"||U.status==="error")?c`<section class="worker-repo-ops__vd" data-seam="repo-ops">
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
          ${U.status==="pending"?"\uC120\uC5B8 \uD655\uC778 \uC911":c`선언 읽기
              실패${U.error_code?c` — <code>${U.error_code}</code>`:""}`}
        </div>
      </section>`:c`<section class="worker-repo-ops__vd" data-seam="repo-ops">
      <p class="worker-repo-ops__vd-title">저장소 작업 선언</p>
      <div class="worker-repo-ops__vd-line worker-repo-ops__vd-absent">
        선언 확인 중
      </div>
    </section>`}async function L(q,U){if(!n)return;let Q=await n("worker-repo-ops-opt-out-toggle",{kind:q,opted_out:U,expected_revision:i()});if(l(Q),Q&&Q.conflict){let ne=await n("worker-repo-ops-opt-out-toggle",{kind:q,opted_out:U,expected_revision:i()});l(ne)}r()}async function M(){let q=$();if(!n||q===null)return;let U=await n("worker-repo-operation-deploy-run",{repo_id:q});if(l(U),!U||U.ok!==!0){let Q=U&&typeof U.reason=="string"?U.reason:"",ne=Object.hasOwn(bf,Q)?bf[Q]:Q||"\uBC30\uD3EC \uC2E4\uD589\uC744 \uC2DC\uC791\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4";ye(`\uBC30\uD3EC \uC2E4\uD589 \uAC70\uBD80 \u2014 ${ne}`,"error")}else ye("\uBC30\uD3EC \uC2E4\uD589\uC744 \uC2DC\uC791\uD588\uC2B5\uB2C8\uB2E4","success");r()}let N={owned_deploy_worktree_fetch_detached_alignment_recreate:"\uC804\uC6A9 \uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC \uC815\uB82C\xB7\uBCF5\uAD6C",recovered_pre_execution_fetch_timeout_retry_once:"fetch \uD0C0\uC784\uC544\uC6C3 1\uD68C \uBCF5\uAD6C",repo_serial_lock_wait:"\uC800\uC7A5\uC18C \uC21C\uCC28 \uC2E4\uD589 \uB300\uAE30",restart_operation_adoption:"\uC7AC\uC2DC\uC791 \uD6C4 \uC791\uC5C5 \uC778\uACC4",exact_input_exit_zero_evidence_adoption:"\uB3D9\uC77C \uC785\uB825 \uC131\uACF5 \uC99D\uAC70 \uC778\uACC4",descendant_success_covers_ancestor_rows:"\uCD5C\uC2E0 SHA \uC131\uACF5\uC774 \uC774\uC804 \uD589 \uCEE4\uBC84",owned_verify_candidate_cleanup:"\uAC80\uC99D \uC784\uC2DC \uCCB4\uD06C\uC544\uC6C3 \uC815\uB9AC",bounded_single_script_retry_exceeded:"\uB2E8\uC77C \uC2A4\uD06C\uB9BD\uD2B8 \uC7AC\uC2DC\uB3C4 \uD55C\uB3C4 \uCD08\uACFC",repair_session_dispatch:"\uC2E4\uD328 \uD574\uACB0 \uC138\uC158 \uC790\uB3D9 \uC2E4\uD589",baseline_failure_ignore:"\uAE30\uC874 \uC2E4\uD328 \uBB34\uC2DC",config_or_script_deletion_to_bypass_gate:"\uC124\uC815\xB7\uC2A4\uD06C\uB9BD\uD2B8 \uC0AD\uC81C\uB85C \uAC8C\uC774\uD2B8 \uC6B0\uD68C",credential_entry:"\uC790\uACA9\uC99D\uBA85 \uC785\uB825\xB7\uCD9C\uB825",destructive_action:"\uD30C\uAD34\uC801 \uC791\uC5C5",history_rewrite:"\uD788\uC2A4\uD1A0\uB9AC \uC7AC\uC791\uC131",agent_self_report_as_success:"\uC138\uC158 \uC790\uAE30\uBCF4\uACE0\uB97C \uC131\uACF5 \uCC98\uB9AC"};function W(q,U,Q){return c`<div class="worker-repo-ops__policy-group" data-policy=${Q}>
      <div class="worker-repo-ops__policy-label">${q}</div>
      <ul class="worker-repo-ops__policy-list">
        ${U.map(ne=>c`<li data-token=${ne}>
              ${N[ne]||ne}
            </li>`)}
      </ul>
    </div>`}function re(){let q=s(),U=q.repo_operation_policy&&typeof q.repo_operation_policy=="object"?q.repo_operation_policy:null;return U?c`<section
      class="worker-repo-ops__repair"
      data-seam="repo-ops-policy"
    >
      <details class="worker-repo-ops__policy" data-seam="policy-lists">
        <summary>
          Worker 자동 처리 기준
          <span class="worker-repo-ops__policy-count"
            >자동 ${(U.worker_automatic||[]).length} · 금지
            ${(U.never_automatic||[]).length}</span
          >
        </summary>
        ${U.supported===!1?c`<div
              class="worker-repo-ops__policy-group"
              data-policy="policy-schema"
            >
              ${`\uACC4\uC57D \uC2A4\uD0A4\uB9C8 \uBD88\uC77C\uCE58 \u2014 \uC790\uB3D9 \uC7AC\uC2DC\uB3C4\uAC00 \uC815\uC9C0\uB418\uC5C8\uC2B5\uB2C8\uB2E4 (v${U.schema_version})`}
            </div>`:""}
        ${W("Worker\uAC00 \uC790\uB3D9 \uCC98\uB9AC",U.worker_automatic||[],"worker-automatic")}
        ${W("\uC790\uB3D9\uC73C\uB85C \uD558\uC9C0 \uC54A\uC74C",U.never_automatic||[],"never-automatic")}
      </details>
    </section>`:""}return{template(){return c`<details class="worker-repo-ops-settings">
        <summary class="worker-repo-ops-settings__summary">
          저장소 작업 · 검증/배포 선언
        </summary>
        ${F(a())} ${re()}
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
      title=${e.at?Gt(e.at):""}
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
  </section>`}function Af(e,t={}){let n=null;function r(){if(n===null){rt(c``,e);return}let i=nv(n.operations,n.cleanup_failures,{expanded:n.expanded});rt(cv({events:i.visible,hidden:i.hidden,expanded:n.expanded,repo:n.repo,repo_ops:n.repo_ops}),e)}e.addEventListener("click",i=>{let l=i.target;if(l?.closest?.('[data-seam="repo-ops-close"]')){s();return}l?.closest?.('[data-seam="repo-ops-more"]')&&n&&(n.expanded=!n.expanded,r())});function o(i){n={operations:i.operations,cleanup_failures:i.cleanup_failures,repo:i.repo||"",repo_ops:i.repo_ops||null,expanded:!1},r()}function s(){n!==null&&(n=null,r(),t.onClose&&t.onClose())}return{open:o,close:s,isOpen:()=>n!==null,refresh(i){n&&(n={operations:i.operations,cleanup_failures:i.cleanup_failures,repo:i.repo||"",repo_ops:i.repo_ops||null,expanded:n.expanded},r())}}}var uv="worker-ineligible";function rs(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function Sf(e){return rs(e).includes(uv)}var dv="session-preferred",pv=["external_roundtrip","user_feedback_loop"];function Ef(e,t){if(!rs(e).includes(dv)||typeof t!="object"||t===null)return"";let n=t.session_preferred_reason;return typeof n=="string"&&pv.includes(n)?n:""}var fv="spec-after-blocker";function Tf(e,t){return rs(e).includes(fv)&&Array.isArray(t)&&t.length>0}var _v=Ot("views:worker:adapter"),mv="tab:worker:ready",gv="tab:worker:blocked",hv="tab:worker:in-progress",bv="tab:worker:resolved",yv="tab:worker:closed",vv="\u{1F512} blocked",wv={revision:0,auto_advance:!1,auto_merge:!1,slots:si,queue:[],serial_lanes:[],serial_lane_count:0,pr_wait:[],done:[]},kv=["claude_account","codex_account"],$v=[...Xr,...kv];function xv(e){let t=e&&e.parent;return(typeof t=="string"?t.length>0:!!(t&&t.id))||/\.\d+$/.test(e&&e.id||"")}function Av(e){let t=e&&typeof e=="object"?e.awaiting_user:void 0,n=typeof t=="string"?t.trim():"";return n.length>0?`${Zs}: ${n}`:Zs}function Lr(e){return e&&typeof e=="object"?e:{}}function Sv(e){let t={};for(let n of $v){let r=e[n];typeof r=="string"&&r.length>0&&(t[n]=r)}return t}function Ev(e){let t=e.replace(/\/+$/,""),n=t.lastIndexOf("/");return n>=0?t.slice(n+1):t}function Cf(e={}){let{queueStore:t,issueStores:n,transport:r,getWorkspacePath:o,onInvalidate:s}=e,i=n?jr(n):null,l=new Map,a={},u=null,d=0,f=null,g=!1;function m(){g||!s||s()}function $(M){return u===M?a:{}}async function O(){if(!r||g)return;let M=o?.()||"";if(u===M||f&&f.key===M&&f.generation===d)return;let N=++d;f={key:M,generation:N};let W=null;try{W=await Promise.resolve(r("get-session-defaults",{}))}catch(re){if(N!==d)return;f=null,_v("get-session-defaults failed: %o",re),m();return}N===d&&(a=W&&typeof W.values=="object"&&W.values!==null?{...W.values}:{},u=M,f=null,m())}function B(){u=null,d+=1,O()}function Y(){for(let[M,N]of l)N==="failed"&&l.delete(M)}function J(M,N){return i?i.selectBoardColumn(M,N):[]}function X(M,N,W,re){let q=Array.isArray(M.queue)?M.queue:[],U=new Set([...q.map(D=>D.bead_id),...(Array.isArray(M.serial_lanes)?M.serial_lanes:[]).flatMap(D=>(Array.isArray(D?.entries)?D.entries:[]).map($e=>$e.bead_id)),...(Array.isArray(M.pr_wait)?M.pr_wait:[]).map(D=>D.bead_id),...(Array.isArray(M.done)?M.done:[]).map(D=>D.bead_id)]),Q=new Set(W.map(D=>D.id)),ne=new Set,we=[];for(let D of[...N,...W])U.has(D.id)||ne.has(D.id)||xv(D)||(ne.add(D.id),we.push(D));let ve=pf(we,Or(re)),le=Lr(M.bead_scope);return ve.map(D=>{let $e=qr(D),Ae=$e.evidence==="published",T=typeof D.workflow?.route=="string"&&D.workflow.route||(D.metadata&&typeof D.metadata.route=="string"?D.metadata.route:""),Z=T==="quick_fix",Re=!Object.hasOwn(D,"description")||typeof D.description=="string"&&D.description.trim().length>0,fe=Object.hasOwn(D,"labels")&&Sf(D.labels),Te=fe||!Object.hasOwn(D,"labels")?"":Ef(D.labels,D.metadata),me=D.metadata&&typeof D.metadata=="object"?Object.hasOwn(D.metadata,"awaiting_user"):!1,Oe=!fe&&!me&&(Z?Re:Ae&&!$e.conflict),it=Q.has(D.id),Ge=it?Ni(D):[],I=[];it&&Ge.length===0&&I.push(vv),me&&I.push(Av(D.metadata)),Z&&!Re?I.push("missing_description"):!Z&&$e.conflict?I.push("spec_id_conflict"):!Z&&$e.evidence==="none"?I.push("spec \uC5C6\uC74C"):!Z&&$e.evidence==="draft"&&I.push("spec \uBBF8\uBC1C\uD589(draft)");let oe=le[D.id];return{bead_id:D.id,title:D.title||D.id,route:T,spec_id:$e.conflict?"":$e.path,published:Ae,blocked:it,blocked_by:Ge,labels:Array.isArray(D.labels)?D.labels:[],created_at:D.created_at,updated_at:D.updated_at,status:D.status,workflow:D.workflow||null,exec_pins:Sv(Lr(D.metadata)),rec:null,...oe&&Array.isArray(oe.scope)?{scope:oe.scope}:{},eligible:Oe,reason:I.join(" \xB7 "),worker_ineligible:fe,session_preferred:Te.length>0,session_preferred_reason:Te,spec_after_blocker:Tf(D.labels,Ge),release_info:D.release_info,dependents_info:D.dependents_info}})}function F(M){let[N,W,re,q,U]=M,Q=ys([...N,...W,...re,...q,...U]),ne={},we=(ve,le)=>{if(!ve||typeof ve.id!="string"||ve.id.length===0)return;let D=ne[ve.id]||(ne[ve.id]={});if(typeof ve.priority=="number"&&!("priority"in D)&&(D.priority=ve.priority),typeof ve.from_id=="string"&&!("from_id"in D)&&(D.from_id=ve.from_id),le&&!("metadata"in D)){D.metadata=Lr(ve.metadata);let $e=Lr(ve.workflow).route;typeof $e=="string"&&$e.length>0&&(D.route=$e)}};for(let ve of[...N,...W,...re])we(ve,!0);for(let ve of[...q,...U])we(ve,!1);for(let ve of new Set([...Object.keys(ne),...Q.keys()])){let le=vs(Q,ve);if(le.total>0){let D=ne[ve]||(ne[ve]={});D.rollup=le}}return ne}function L(M,N,W,re){let q=new Set((Array.isArray(M.done)?M.done:[]).map(Q=>Q?.bead_id).filter(Q=>typeof Q=="string")),U=[];for(let Q of N){let ne=nr(Q.closed_at);if(typeof Q.id!="string"||q.has(Q.id)||ne===null||re!==void 0&&ne<re||typeof Q.comment_count!="number"||Q.comment_count<=0)continue;let we=`${W}\0${Q.id}\0${String(Q.updated_at)}\0${Q.comment_count}`,ve=l.get(we);if(ve===void 0&&r&&(l.set(we,"pending"),Promise.resolve(r("get-comments",{id:Q.id})).then(D=>{let $e=Array.isArray(D)&&D.some(Ae=>ki(typeof Ae?.text=="string"?Ae.text:"")?.lane==="session");l.set(we,$e?"session":"not-session"),m()}).catch(()=>{l.set(we,"failed"),m()})),ve!=="session")continue;let le=nr(Q.started_at);U.push({id:Q.id,title:Q.title||Q.id,reason:"",draggable:!1,done:!0,lane:"done",selectable:!1,selected:!1,badges:["\uC138\uC158 \uC791\uC5C5"],alert:!1,usage:null,work_ms:le!==null&&ne>=le?ne-le:null,work_kind:"session",done_at:ne,created_at:Q.created_at,updated_at:Q.updated_at})}return U}return{read(M){if(!t)return{workspaces:[],workspaces_state:[]};let N=t.get()||wv,W=o?.()||"",re=M&&typeof M.done_since=="number"?M.done_since:void 0,q=J(mv,"ready"),U=J(gv,"blocked"),Q=J(hv,"in_progress"),ne=J(bv,"resolved"),we=J(yv,"closed");return{workspaces:[{...N,bead_titles:{...Lr(N.bead_titles),...Object.fromEntries([...q,...U].filter(ve=>ve&&typeof ve.id=="string").map(ve=>[ve.id,ve.title||ve.id]))},root_dir:W,name:Ev(W),runnable:X(N,q,U,M?M.candidate_sort:void 0),session_done:L(N,we,W,re),bead_overlay:F([q,U,Q,ne,we])}],workspaces_state:[{root_dir:W,revision:N.revision,auto_advance:N.auto_advance,auto_merge:N.auto_merge,slots:typeof Lr(N.workspace_info).slots=="number"?Lr(N.workspace_info).slots:N.slots,runner_catalog:N.runner_catalog,execution_defaults:N.execution_defaults,session_defaults:$(W),orchestration_model:N.orchestration_model,orchestration_effort:N.orchestration_effort,orchestration_speed:N.orchestration_speed,issue_prefix:""}]}},ensureSessionDefaults(){O()},refreshSessionDefaults:B,notifyIssuesChanged:Y,destroy(){g=!0,d+=1,f=null,l.clear()}}}var Fi=1,Rf=5,Tv={root_dir:"",name:"",auto_advance:!1,auto_merge:!1,slots:Fi,revision:0,runner_catalog:{},items:[],sublanes:{parallel:[],serial:[]},serial_lane_count:0,raw_queue_length:0,live_count:0,over_cap:!1,merge:{positions:new Map,resolutions:new Map,continuations:new Map,authorities:new Map,state:{active:null,failures:{},waiting:null},auto_excluded:[],running:!1},token_total:null,cleanup_failures:[],declared_base:null,repo_operations:[]};function _n(e){return e&&typeof e=="object"?e:{}}var If="beads-ui.worker.candidate-filter",kl={show_blocked:!1,spec:"all"};function Cv(){try{let e=window.localStorage.getItem(If);if(!e)return{...kl};let t=JSON.parse(e);if(!t||typeof t!="object")return{...kl};let n=t.spec;return{show_blocked:t.show_blocked===!0,spec:n==="with"||n==="without"?n:"all"}}catch{return{...kl}}}function Rv(e){try{window.localStorage.setItem(If,JSON.stringify(e))}catch{}}var Ov=[{value:"all",label:"\uC804\uCCB4"},{value:"with",label:"spec \uC788\uC74C"},{value:"without",label:"spec \uC5C6\uC74C"}],Mf="bdui.worker.done-range";function Lv(){try{let e=window.localStorage.getItem(Mf);return e===null?"today":Mn(e)}catch{return"today"}}function Iv(e){try{window.localStorage.setItem(Mf,e)}catch{}}function Of(e){let t=Array.isArray(e)&&e.length>0?e[0]:null;if(!t)return"";let n=typeof t.title=="string"?t.title:t.id||"";return n.length>22?`${n.slice(0,22)}\u2026`:n}function Mv(e){return e==="receipt_not_current"?"\uB9AC\uBDF0 \uD6C4\uC5D0\uB3C4 \uC601\uC218\uC99D\uC774 \uCD5C\uC885 head\uC5D0 \uC720\uD6A8\uD558\uC9C0 \uC54A\uC74C":e==="cancelled"?"\uB9AC\uBDF0 \uC138\uC158 \uCDE8\uC18C\uB428":e.startsWith("launch_failed:")?`\uB9AC\uBDF0 \uC138\uC158 \uC2DC\uC791 \uC2E4\uD328(${e.slice(14)})`:e.startsWith("session_failed:")?`\uB9AC\uBDF0 \uC138\uC158 \uBE44\uC815\uC0C1 \uC885\uB8CC(${e.slice(15)})`:`\uB9AC\uBDF0 \uC138\uC158 \uC2E4\uD328(${e})`}function Lf(e){if(e.startsWith("receipt_unbacked:"))return`\uC2E4\uD589 \uC601\uC218\uC99D \uC790\uB3D9 \uAC80\uC99D \uBD88\uAC00(${e.slice(17)}) \u2014 [\uBA38\uC9C0] \uD074\uB9AD\uC73C\uB85C \uC218\uB3D9 \uC9C4\uD589 \uAC00\uB2A5`;switch(e){case"not_in_pr_wait":return"PR \uB300\uAE30 \uC0C1\uD0DC \uB3D9\uAE30\uD654 \uC2E4\uD328";case"resolution_round_cap":return"\uCDA9\uB3CC \uD574\uC18C 2\uD68C \uCD08\uACFC";case"resolution_rebase_cap":return"\uD050 \uC7AC\uCDA9\uB3CC 3\uD68C \uCD08\uACFC";case"resolution_timeout":return"\uCDA9\uB3CC \uD574\uC18C \uB300\uAE30 \uC2DC\uAC04 \uCD08\uACFC";case"resolution_refused":return"\uD574\uC18C \uC138\uC158 \uB514\uC2A4\uD328\uCE58 \uAC70\uBD80";case"worktree_missing":return"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uD574\uC18C \uD544\uC694";case"worktree_restore_branch_mismatch":return"\uC6CC\uD06C\uD2B8\uB9AC \uBCF5\uC6D0 \uC2E4\uD328 \u2014 \uBE0C\uB79C\uCE58 \uC774\uB984 \uBD88\uC77C\uCE58";case"worktree_restore_path_exists":return"\uC6CC\uD06C\uD2B8\uB9AC \uBCF5\uC6D0 \uC2E4\uD328 \u2014 \uACBD\uB85C \uC774\uBBF8 \uC788\uC74C";case"worktree_restore_branch_missing":return"\uC6CC\uD06C\uD2B8\uB9AC \uBCF5\uC6D0 \uC2E4\uD328 \u2014 origin\uC5D0 \uBE0C\uB79C\uCE58 \uC5C6\uC74C";case"worktree_restore_branch_diverged":return"\uC6CC\uD06C\uD2B8\uB9AC \uBCF5\uC6D0 \uC2E4\uD328 \u2014 \uB85C\uCEEC \uBE0C\uB79C\uCE58\uAC00 origin\uACFC \uB2E4\uB984";case"worktree_restore_failed":return"\uC6CC\uD06C\uD2B8\uB9AC \uBCF5\uC6D0 \uC2E4\uD328";case"merge_unconfirmed_timeout":return"\uBA38\uC9C0 \uD655\uC778 \uC2DC\uAC04 \uCD08\uACFC";case"pr_closed_unmerged":return"PR \uB2EB\uD798";case"merge_error":return"\uBA38\uC9C0 \uC624\uB958";case"spec_id_missing":return"\uC2A4\uD399 ID \uAE30\uB85D \uC5C6\uC74C";default:return e}}function Pv(e){if(e==="lane_occupied")return"\uC2E4\uD589 \uB808\uC778\uC5D0 \uB0A8\uC544 \uC788\uC5B4 \uBA38\uC9C0 \uB300\uC0C1\uC774 \uC544\uB2D9\uB2C8\uB2E4";let t="\uBA38\uC9C0 \uD050\uC5D0 \uB123\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 (\uC774\uBBF8 \uB300\uAE30 \uC911\uC774\uAC70\uB098 \uB300\uC0C1 \uC544\uB2D8)";return typeof e=="string"&&e.length>0?`${t}: ${e}`:t}function Dv(e){if(e==="worker_sessions_busy")return"\uD574\uC18C \uB300\uAE30 \u2014 \uC2E4\uD589 \uC2AC\uB86F \uB300\uAE30 \uC911";if(typeof e!="string"||!e.startsWith("completion_waiting:"))return null;let t=e.slice(19);if(t.length===0)return null;switch(t){case"gating":return"\uBA38\uC9C0 \uC870\uAC74 \uD655\uC778 \uC911";case"merging":return"\uBA38\uC9C0 \uC911";case"cleaning":return"\uB9C8\uBB34\uB9AC \uC911";case"paused":return"\uC790\uB3D9 \uC9C4\uD589 \uC77C\uC2DC\uC815\uC9C0";case"needs_human":return"\uD655\uC778 \uD544\uC694";default:return null}}function Nv(e){if(!e||typeof e!="object")return null;switch(e.state){case"waiting":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC911",live:!0};case"yielded":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uACC4\uC18D \uC911 \xB7 \uC644\uB8CC \uD6C4 \uC6B0\uC120 \uBA38\uC9C0",live:!0};case"ready":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC644\uB8CC \xB7 \uC7AC\uAC80\uC99D \uB300\uAE30",live:!1};default:return null}}var qv=new Set(["paused","needs_human","waiting_metadata","reviewing","retrying"]),Fv=new Set(["waiting_metadata","reviewing","retrying"]),$l=new Set(["review_receipt_missing","review_receipt_stale","review_receipt_invalid","review_receipt_undetermined"]);function jv(e){let t=e&&typeof e=="object"?e.auto_resolution:null,n=t&&typeof t=="object"&&!Array.isArray(t)?t:null;if(!n||!e)return null;let r=typeof n.origin_reason=="string"&&n.origin_reason.length>0?`\uC6D0 \uC0AC\uC720: ${n.origin_reason}`:"";switch(e.phase){case"waiting_metadata":return{label:"\uC815\uC815 \uB300\uAE30",details:[r,"\uBA54\uD0C0\uB370\uC774\uD130 \uC815\uC815\uC774 \uAD00\uCE21\uB418\uBA74 \uC790\uB3D9 \uC7AC\uAC1C"].filter(Boolean),live:!1};case"retrying":{let o=Number.isInteger(n.attempts)?Math.max(0,Number(n.attempts)):0,s=Number.isInteger(n.attempt_cap)&&Number(n.attempt_cap)>0?Number(n.attempt_cap):0,i=typeof n.next_at=="number"?Gt(n.next_at):"",l=typeof n.last_error=="string"&&n.last_error.length>0?n.last_error:"";return{label:s>0?`\uC7AC\uC2DC\uB3C4 ${Math.min(o,s)}/${s}`:`\uC7AC\uC2DC\uB3C4 ${o}`,details:[r,i?`\uB2E4\uC74C \uC2DC\uAC01 ${i}`:"",l?`\uB9C8\uC9C0\uB9C9 \uC624\uB958: ${l}`:""].filter(Boolean),live:!0}}default:return null}}function Bv(e){if(typeof e!="string")return"";for(let t of["retry_exhausted:","auto_review_exhausted:"])if(e.startsWith(t))return e.slice(t.length);return""}function Uv(e,t=null){if(!e||typeof e!="object")return null;let n="";switch(e.phase){case"gating":n="\uBA38\uC9C0 \uC870\uAC74 \uD655\uC778 \uC911";break;case"merging":n="\uBA38\uC9C0 \uC911";break;case"cleaning":n="\uB9C8\uBB34\uB9AC \uC911";break;case"waiting_metadata":case"reviewing":case"retrying":if(!t)return null;n=t.label;break;case"paused":n="\uC790\uB3D9 \uC9C4\uD589 \uC77C\uC2DC\uC815\uC9C0";break;case"needs_human":n="\uD655\uC778 \uD544\uC694";break;case"completed":return null;default:return null}let r=[n];e.head_sha&&r.push(`head ${e.head_sha}`),e.base_sha&&r.push(`base ${e.base_sha}`),(e.failure_stage||e.failure_reason)&&r.push(`${e.failure_stage||"failure"} \xB7 ${e.failure_reason||"\uC6D0\uC778 \uBBF8\uC0C1"}`);let o=Bv(e.terminal_reason);o&&r.push(`\uC6D0 \uC0AC\uC720: ${o}`);let s=e.phase==="needs_human"&&!o?Rr(e.terminal_reason):null;s&&r.push(e.failure_stage?`${e.failure_stage} \xB7 ${s}`:s);for(let i of t?t.details:[])r.push(i);return e.active_attempt_id&&r.push(`attempt ${e.active_attempt_id}`),e.evidence&&r.push(e.evidence),e.log_path&&r.push(e.log_path),{badge:n,title:r.join(`
`),alert:e.phase==="needs_human",lock_actions:!qv.has(e.phase)}}function Wv(e){if(!e||typeof e!="object")return[];let t=e.blocking_codes;return Array.isArray(t)?t.filter(n=>typeof n=="string"&&n.length>0):[]}function zv(e){if(!e||typeof e!="object")return[];let t=e.badge_codes;return Array.isArray(t)?t.filter(n=>typeof n=="string"&&n.length>0):[]}function Hv(e){let t=e.queue_failure?`\uBA38\uC9C0 \uC2E4\uD328 \uC6D0\uBB38: ${e.queue_failure}`:e.auto_skip?`\uC790\uB3D9 \uC81C\uC678 \uC6D0\uBB38: ${e.auto_skip}`:"",n=(s,i={})=>{let l=[i.title||"",t].filter(Boolean);return{label:s,title:l.join(`
`),live:i.live===!0,alert:i.alert===!0}};if(e.continuation_required)return n("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694",{alert:!0});if(e.queueing)return e.queueing==="cleanup"?n("\uC815\uB9AC \uC7AC\uAC1C \uC694\uCCAD \uC911",{title:"\uC11C\uBC84 \uC751\uB2F5\uC744 \uAE30\uB2E4\uB9AC\uB294 \uC911\uC785\uB2C8\uB2E4",live:!0}):n("\uD050 \uB4F1\uB85D \uC911",{title:"\uBA38\uC9C0 \uD050\uC5D0 \uB123\uB294 \uC911 \u2014 \uC11C\uBC84 \uC751\uB2F5\uC744 \uAE30\uB2E4\uB9BD\uB2C8\uB2E4",live:!0});if(e.merge_step)return e.gate?.tier==="merged"?n("\uBA38\uC9C0\uB428",{title:e.merge_step.label,alert:e.merge_step.failed===!0}):n("\uBA38\uC9C0 \uC911",{title:e.merge_step.label,live:!0});if(e.conflict_badge)return n(e.conflict_badge,{live:e.conflict_live===!0});if(e.auto_resolution)return n(e.auto_resolution.label,{title:e.auto_resolution.details.join(`
`),live:e.auto_resolution.live===!0});if(e.recovery?.lock_actions)return n(e.recovery.badge,{title:e.recovery.title,live:!0});if(e.cleanup_failed)return n(e.cleanup_label?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${e.cleanup_label}`:"\uC815\uB9AC \uBA48\uCDA4",{title:e.cleanup_failed.reason||"",alert:!0});if(e.base_exception)return n("\uB2E4\uB978 base \uB300\uC0C1",{title:e.base_exception,alert:!0});let r=Wv(e.receipt_check),o=e.conflicting||e.gate?.reason==="base_behind"||r.length>0;if(e.auto_pending&&o)return n("\uD655\uC778 \uC911",{title:"\uBA38\uC9C0 \uD050\uAC00 \uC790\uB3D9\uC73C\uB85C \uCC98\uB9AC \uC911 \u2014 \uB2E4\uC74C \uAD00\uCE21\uC744 \uAE30\uB2E4\uB9BD\uB2C8\uB2E4",live:!0});if(e.conflicting)return n("\uCDA9\uB3CC \uD574\uACB0 \uD544\uC694",{alert:!0});if(e.gate?.reason==="base_behind")return n("base \uAC31\uC2E0 \uD544\uC694",{alert:!0});if($l.has(e.gate?.reason)){let s=e.gate.reason==="review_receipt_stale"?"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC774 \uD604\uC7AC head\uC758 \uC870\uC0C1\uC774 \uC544\uB2D9\uB2C8\uB2E4 \u2014 \uD788\uC2A4\uD1A0\uB9AC \uC7AC\uC791\uC131\xB7\uBE0C\uB79C\uCE58 \uB9AC\uC14B \uBCF5\uAD6C \uACBD\uB85C\uC785\uB2C8\uB2E4. [\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0]\uAC00 \uC774 \uBCF4\uB958\uC758 \uCD9C\uAD6C\uC785\uB2C8\uB2E4":e.gate.reason==="review_receipt_invalid"?"\uB9AC\uBDF0 \uC601\uC218\uC99D \uAE30\uB85D\uC774 \uC131\uB9BD\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4 \u2014 [\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0]\uAC00 \uC774 \uBCF4\uB958\uC758 \uCD9C\uAD6C\uC785\uB2C8\uB2E4":e.gate.reason==="review_receipt_undetermined"?"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC758 ancestry probe\uB97C \uC644\uB8CC\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 \u2014 [\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0]\uAC00 \uC774 \uBCF4\uB958\uC758 \uCD9C\uAD6C\uC785\uB2C8\uB2E4":"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 [\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0]\uAC00 \uC774 \uBCF4\uB958\uC758 \uCD9C\uAD6C\uC785\uB2C8\uB2E4";if(e.review_session?.active===!0)return n(e.review_session.origin==="auto"?"\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694 \xB7 \uC790\uB3D9 \uB9AC\uBDF0 \uC138\uC158 \uC2E4\uD589 \uC911":"\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694 \xB7 \uB9AC\uBDF0 \uC138\uC158 \uC2E4\uD589 \uC911",{title:`${s}
\uB9AC\uBDF0 \uC138\uC158\uC774 \uC2E4\uD589 \uC911\uC785\uB2C8\uB2E4 \u2014 \uB05D\uB098\uBA74 \uC601\uC218\uC99D\uC744 \uB2E4\uC2DC \uD310\uC815\uD569\uB2C8\uB2E4`,live:!0});if(e.auto_review_wait==="slot")return n("\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694 \xB7 \uB9AC\uBDF0 \uC138\uC158 \uC2AC\uB86F \uB300\uAE30",{title:`${s}
\uC2E4\uD589 \uC2AC\uB86F\uC774 \uBE44\uBA74 \uC790\uB3D9\uC73C\uB85C \uB9AC\uBDF0 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4. \uC9C0\uAE08 \uD074\uB9AD\uD558\uBA74 \uC989\uC2DC \uB744\uC6C1\uB2C8\uB2E4`,live:!0});if(e.review_session?.failure){let i=e.review_dispatch?.state==="exhausted"&&e.review_session.origin==="auto";return n(`\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694 \xB7 ${i?"\uC790\uB3D9 \uB9AC\uBDF0 1\uD68C \uC18C\uC9C4 \xB7 ":""}${Mv(e.review_session.failure)}`,{title:`${s}
\uC9C1\uC804 \uB9AC\uBDF0 \uC138\uC158 \uC885\uB8CC \uC0AC\uC720: ${e.review_session.failure}`,alert:!0})}return n("\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694",{title:s,alert:!0})}return e.gate?.reason==="spec_id_missing"?n("\uC2A4\uD399 ID \uB204\uB77D",{title:"native spec_id \uBBF8\uAE30\uB85D \u2014 bd update --spec-id \uD544\uC694",alert:!0}):r.length>0?n(`\uC601\uC218\uC99D \uD655\uC778 \uD544\uC694 \xB7 ${r[0]}`,{title:`\uC131\uB9BD\uD558\uC9C0 \uC54A\uB294 \uC2E4\uD589 \uC601\uC218\uC99D \u2014 ${r.join(", ")}`,alert:!0}):e.recovery?n(e.recovery.badge,{title:e.recovery.title,alert:!0}):e.gate?.tier==="verify"&&e.gate.gate_badge==="\uAC80\uC99D \uC2E4\uD328"?n("\uAC80\uC99D \uC2E4\uD328",{title:e.gate.reason||"",alert:!0}):e.queue_failure?n(`\uBA38\uC9C0 \uC2E4\uD328 \u2014 ${Lf(e.queue_failure)}`,{title:e.queue_failure,alert:!0}):e.auto_skip?n(`\uC790\uB3D9 \uC81C\uC678 \u2014 ${Lf(e.auto_skip)}`,{title:e.auto_skip,alert:!0}):e.queued&&!e.queue_active?n(`\uBA38\uC9C0 \uB300\uAE30 #${e.queue_position}`):e.gate?.enabled===!0?n("\uBA38\uC9C0 \uAC00\uB2A5"):e.gate?.tier==="merged"?n("\uBA38\uC9C0\uB428"):e.gate?.tier==="closed_unmerged"?n("\uB2EB\uD798",{alert:!0}):e.activity?n("\uD655\uC778 \uC911",{live:!0}):e.gate?.tier==="undecidable"||e.gate?.reason==="mergeability_unknown"?n("\uC0C1\uD0DC \uD655\uC778 \uC2E4\uD328",{title:e.gate.reason||"",alert:!0}):e.gate?.tier==="unobserved"||e.gate?.tier==="verify"||e.gate?.gate_badge==="\uAD00\uCE21 \uB300\uAE30"?n("\uD655\uC778 \uC911"):e.gate?.gate_badge?n(e.gate.gate_badge,{title:e.gate.reason||"",alert:e.gate.enabled!==!0}):null}function Gv(e,t,n,r,o=null,s=null,i=null,l=!1,a=null,u=!0,d=null,f=null,g=null,m={},$=!1,O={},B=null,Y={active:!1,failure:null,origin:null}){let J=!!a&&a.position>0,X=!!a?.continuation_action&&a.continuation_action.continuation===null,F=!!a&&a.active===!0,L=a&&a.failure||null,M=Dv(a?a.waiting:null),N=n[e]||null,W=N&&N.gate?N.gate:null,re=N&&N.pr?N.pr:null,q=Nv(a?a.resolution:null),U=jv(g),Q=Uv(g,U),ne=a&&a.authority||null,we=a&&a.review_dispatch||null,ve=a?.hold?.auto_review_wait==="slot"?"slot":null,le=!!g&&typeof g=="object"&&Fv.has(g.phase),D=J&&!F&&(!ne||le||ne.source==="automatic"&&!$),$e=i==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":q?q.badge:i==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC911":M,Ae=!!W&&W.base_badge==="\uCDA9\uB3CC",T=!!W&&W.enabled===!0,Z=Io({bead_id:e,merge_sha:O.merge_sha,cleanup_cursor:O.cleanup_cursor,merge_progress:s&&s.merge_progress?s.merge_progress:null,cleanup_failed:r,repo_operations:O.repo_operations}),Re=ri(Z),fe=s&&!Z&&(s.queueing??null)?s.queueing:null,Te=!!r&&["repo_operations","child_sweep","branch_cleanup","parent_close"].includes(r.step)&&!!W&&W.tier==="merged",me=r&&r.step==="repo_operations"&&Z?.failed===!0&&(Z.step==="deploy"||Z.step==="verify")?Z.step:null,Oe=l&&!!r&&!!W&&W.tier==="merged",it=D&&(T||Ae||W?.reason==="base_behind"||$l.has(W?.reason)||Te||Oe),Ge=$l.has(W?.reason),I=l&&Ae&&u===!1,oe=Vn(m,e,{external:l,merge_active:F||Z?.step==="merge",merge_queued:J,conflict_active:!!i,cleanup_active:Re,merged:!!r||W?.tier==="merged"}),ie=!!oe.operation,de=J&&!L&&!X&&!Te&&!(Q&&Q.lock_actions),be=Hv({auto_pending:de,continuation_required:X,queueing:fe,merge_step:Z,conflict_badge:$e,conflict_live:q?.live===!0||i==="running",auto_resolution:U,recovery:Q,cleanup_failed:r,cleanup_label:r?Sr(r.step):null,base_exception:f,conflicting:Ae,gate:W,receipt_check:N&&N.receipt_check?N.receipt_check:null,queue_failure:L,auto_skip:d,queued:J,queue_active:F,queue_position:a?a.position:0,review_session:Y,review_dispatch:we,auto_review_wait:ve,activity:$e?null:s&&s.activity||null}),ce=be?.live===!0&&be.title?c`<span title=${be.title}>${be.label}</span>`:be?.label||null,Fe=zv(N&&N.receipt_check?N.receipt_check:null);return{id:e,title:l?c`${t}<span class="muted"> · 세션</span>`:t,reason:r&&Z?.active!==!0?ni(r.step):"PR \uB300\uAE30",draggable:!1,done:!0,lane:"pr_wait",...B?{dependency_chips:B}:{},external:l,pr_number:re&&typeof re.number=="number"?re.number:null,pr_url:re&&typeof re.url=="string"?re.url:"",completion_badge:be?.live!==!0&&be?.title?be.label:null,completion_title:be?.title||"",...g?.phase==="needs_human"&&typeof g.log_path=="string"&&g.log_path.length>0?{log_path:g.log_path}:{},...Fe.length>0?{receipt_badge:{codes:Fe}}:{},badges:ce?[ce]:[],live_badge:be?.live===!0?ce:null,usage:o,alert:be?.alert===!0,merge_action:W?.tier==="merged"&&!Te&&!Oe?!1:!J||X||D||Ge,cancel_action:J&&!X,cancel_enabled:!F&&!(Q&&Q.lock_actions),cancel_title:Q&&Q.lock_actions?`${Q.badge} \u2014 \uC911\uB2E8\uD558\uB824\uBA74 \uC0C1\uB2E8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8\uC744 \uC0AC\uC6A9\uD558\uC138\uC694`:F?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"\uBA38\uC9C0 \uD050\uC5D0\uC11C \uC774 \uD56D\uBAA9\uC744 \uBE8D\uB2C8\uB2E4 (\uB2E4\uC2DC [\uBA38\uC9C0]\uB85C \uB123\uC744 \uC218 \uC788\uC2B5\uB2C8\uB2E4)",discard:oe,discard_action:oe.action,merge_step:Z,discard_enabled:oe.enabled,discard_title:oe.title,merge_enabled:!Z&&!fe&&!i&&!ie&&!f&&!(Q&&Q.lock_actions)&&!I&&Y.active!==!0&&(T||Ae||W?.reason==="base_behind"||Ge||Te||Oe||it||le&&!F),merge_label:X?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":Te||Oe?me==="deploy"?"\uBC30\uD3EC \uC7AC\uC2DC\uB3C4 \uD6C4 \uC815\uB9AC":me==="verify"?"\uAC80\uC99D \uC7AC\uC2DC\uB3C4 \uD6C4 \uC815\uB9AC":"\uC815\uB9AC \uC7AC\uAC1C":Ae&&!Z&&!Te?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":W?.reason==="base_behind"?"base \uAC31\uC2E0 \uD6C4 \uBA38\uC9C0":Ge?"\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0":D?"\uB2E4\uC2DC \uBA38\uC9C0":void 0,merge_title:ie?oe.error?`\uD3D0\uAE30 \uC2E4\uD328: ${oe.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${oe.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:X?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":fe?"\uC694\uCCAD\uC744 \uBCF4\uB0B4\uB294 \uC911 \u2014 \uC11C\uBC84 \uC751\uB2F5\uC744 \uAE30\uB2E4\uB9BD\uB2C8\uB2E4":Z?`\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 ${Z.label}`:me?`\uBA38\uC9C0 \uC644\uB8CC \u2014 ${me==="deploy"?"\uBC30\uD3EC":"\uAC80\uC99D"} \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD574 \uC815\uB9AC\uAC00 \uBA48\uCDC4\uC2B5\uB2C8\uB2E4. \uD074\uB9AD\uD558\uBA74 \uC800\uC7A5\uC18C \uC791\uC5C5\uBD80\uD130 \uC815\uB9AC\uB97C \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4`:Oe?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD569\uB2C8\uB2E4":I?"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uC9C1\uC811 \uD574\uC18C\uD558\uC138\uC694":i==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC2E4\uD589 \uC911 \u2014 \uC644\uB8CC \uD6C4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":i==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC77C\uC2DC\uC815\uC9C0 \u2014 \uC7AC\uAC1C \uD6C4 \uC644\uB8CC\uB418\uBA74 \uBA38\uC9C0\uD558\uC138\uC694":Te?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uC7AC\uAC1C\uD569\uB2C8\uB2E4":Ae?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":W?.reason==="base_behind"?"base\uB97C \uC790\uB3D9 \uAC31\uC2E0\uD55C \uB4A4 \uBA38\uC9C0\uD569\uB2C8\uB2E4":Y.active===!0?Y.origin==="auto"?"\uC790\uB3D9 \uB9AC\uBDF0 \uC138\uC158 \uC2E4\uD589 \uC911 \u2014 \uB05D\uB098\uBA74 \uC601\uC218\uC99D\uC744 \uB2E4\uC2DC \uD310\uC815\uD569\uB2C8\uB2E4":"\uB9AC\uBDF0 \uC138\uC158 \uC2E4\uD589 \uC911 \u2014 \uB05D\uB098\uBA74 \uC601\uC218\uC99D\uC744 \uB2E4\uC2DC \uD310\uC815\uD569\uB2C8\uB2E4":W?.reason==="review_receipt_missing"?"\uB9AC\uBDF0 \uC601\uC218\uC99D \uC5C6\uC74C \u2014 \uBA38\uC9C0 \uAC8C\uC774\uD2B8 \uBCF4\uB958\uC785\uB2C8\uB2E4. \uD074\uB9AD\uD558\uBA74 \uAE30\uB85D\uB41C \uC138\uC158\uC744 \uC774\uC5B4 \uB9AC\uBDF0\uB9CC \uC218\uD589\uC2DC\uD0A4\uACE0, \uC601\uC218\uC99D\uC774 \uCD5C\uC885 head\uC5D0 \uC720\uD6A8\uD574\uC9C0\uBA74 \uD050\uAC00 \uBA38\uC9C0\uD569\uB2C8\uB2E4":W?.reason==="review_receipt_stale"?"head \uC7AC\uC791\uC131\uB428(\uC601\uC218\uC99D\uC774 \uD604\uC7AC head\uC758 \uC870\uC0C1\uC774 \uC544\uB2D8) \u2014 \uBA38\uC9C0 \uAC8C\uC774\uD2B8 \uBCF4\uB958\uC785\uB2C8\uB2E4. \uD074\uB9AD\uD558\uBA74 \uAE30\uB85D\uB41C \uC138\uC158\uC744 \uC774\uC5B4 \uCD5C\uC885 head\uB97C \uB2E4\uC2DC \uB9AC\uBDF0\uC2DC\uD0A4\uACE0, \uC601\uC218\uC99D\uC774 \uC720\uD6A8\uD574\uC9C0\uBA74 \uD050\uAC00 \uBA38\uC9C0\uD569\uB2C8\uB2E4":W?.reason==="review_receipt_invalid"?"\uB9AC\uBDF0 \uC601\uC218\uC99D \uAE30\uB85D\uC774 \uC131\uB9BD\uD558\uC9C0 \uC54A\uC74C \u2014 \uBA38\uC9C0 \uAC8C\uC774\uD2B8 \uBCF4\uB958\uC785\uB2C8\uB2E4. \uD074\uB9AD\uD558\uBA74 \uAE30\uB85D\uB41C \uC138\uC158\uC744 \uC774\uC5B4 \uCD5C\uC885 head\uB97C \uB2E4\uC2DC \uB9AC\uBDF0\uC2DC\uD0A4\uACE0, \uC601\uC218\uC99D\uC774 \uC720\uD6A8\uD574\uC9C0\uBA74 \uD050\uAC00 \uBA38\uC9C0\uD569\uB2C8\uB2E4":W?.reason==="review_receipt_undetermined"?"\uB9AC\uBDF0 \uC601\uC218\uC99D ancestry probe \uBBF8\uC644\uB8CC \u2014 \uBA38\uC9C0 \uAC8C\uC774\uD2B8 \uBCF4\uB958\uC785\uB2C8\uB2E4. \uD074\uB9AD\uD558\uBA74 \uAE30\uB85D\uB41C \uC138\uC158\uC744 \uC774\uC5B4 \uCD5C\uC885 head\uB97C \uB2E4\uC2DC \uB9AC\uBDF0\uC2DC\uD0A4\uACE0, \uC0C8 \uC601\uC218\uC99D\uC774 \uCD5C\uC885 head\uC5D0 \uC720\uD6A8\uD574\uC9C0\uBA74 \uD050\uAC00 \uBA38\uC9C0\uD569\uB2C8\uB2E4":W?.reason==="spec_id_missing"?"native spec_id \uBBF8\uAE30\uB85D \u2014 bd update --spec-id\uB85C \uAE30\uB85D\uD55C \uB4A4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":T?`\uBA38\uC9C0 (${W.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4 (\uCC28\uB840\uAC00 \uB418\uBA74 \uB2E4\uC2DC \uD655\uC778)`:W&&W.tier==="merged"?"\uBA38\uC9C0\uB428 \u2014 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC \uC9C4\uD589 \uC911":`\uBA38\uC9C0 \uBD88\uAC00: ${W&&W.reason||"\uAD00\uCE21 \uB300\uAE30"}`}}function xl(e,t={}){let{transport:n,issueStores:r,queueStore:o,sessionLogStore:s,gotoIssue:i,getWorkspacePath:l,switchWorkspace:a,openDoc:u,doneRange:d,onDoneRangeChange:f}=t,g=r?jr(r):null,m=Cv(),$=null,O=null,B=Yr(()=>ue()),Y=new Map,J=new Map,X=cf(),F=vl(X)===null,L=d?Mn(d):Lv();function M(){let h=Mr.find(v=>v.value===L);return h?h.label:"\uC624\uB298"}let N=Ci("beads-ui.worker.lane-collapsed"),W=!1,re=new Set,q=new Set,U=new Set,Q=new Set,ne=new Set,we=null,ve=[],le=Cf({queueStore:o,issueStores:r,transport:n,getWorkspacePath:l,onInvalidate:()=>ue()});function D(){le.refreshSessionDefaults()}let $e=document.createElement("div");$e.className="worker-console";let Ae=document.createElement("div");Ae.className="worker-top";let T=document.createElement("div");T.className="worker-drawer-overlay",T.hidden=!0;let Z=document.createElement("div");Z.className="worker-drawer-overlay__backdrop";let Re=document.createElement("div");Re.className="worker-drawer-host";let fe=document.createElement("div");fe.className="worker-drawer-host",fe.hidden=!0,T.append(Z,Re,fe);let Te=document.createElement("div");Te.className="worker-lanes-host",$e.append(Ae,T,Te),e.appendChild($e);let me=lr(null,null),Oe=[],it=Oi({transport:n,console_el:$e,getLanes:()=>me,getWorkspaces:()=>Oe,getCrossLanes:()=>null,reproject:()=>({lanes:b(),raw_lanes:null}),onCorrection:()=>{},showToast:ye,requestRender:()=>ue(),adoptQueue:(h,v)=>{o&&o.set(v)},onDragBegin:()=>{$=null}}),Ge=null,I=io(Re,{transport:n,sessionLogStore:s,onClose:()=>{Ge=null,T.hidden=!0,ue()}}),oe=Af(fe,{onClose:()=>{fe.hidden=!0,T.hidden=!0,ue()}}),ie=hf({getWorkspacePath:l||(()=>"")}),de=l&&l()||"",be=yf({queueStore:o,transport:n,onChanged:()=>ue(),onOpenScript:(h,v)=>{ie.open(h,v)}});function ce(){return o&&o.get()||{revision:0,auto_advance:!1,auto_merge:!1,slots:Fi,queue:[],serial_lanes:[],serial_lane_count:0,pr_wait:[],done:[]}}function Fe(){let h=ce(),v=typeof h.serial_lane_count=="number"&&Number.isInteger(h.serial_lane_count)&&h.serial_lane_count>0?Math.min(h.serial_lane_count,5):0,R=Array.isArray(h.serial_lanes)?h.serial_lanes:[],ae=[];for(let Le of R){if(ae.length>=v)break;!Le||typeof Le.id!="string"||!/^s[1-5]$/.test(Le.id)||!Array.isArray(Le.entries)||ae.push({id:Le.id,label:`\uC9C1\uB82C ${Le.id.slice(1)}`,count:Le.entries.length})}return ae.length===0?null:[{id:"parallel",label:"\uBCD1\uB82C",count:(Array.isArray(h.queue)?h.queue:[]).length},...ae]}function ze(h){if(!$||!h.some(R=>R.id===$))return null;let v=Fe();return v?{bead_id:$,lanes:v}:null}function Ve(){return l&&l()||""}async function Pe(h,v){await it.sendOp({type:"worker-queue-place",payload:{bead_id:h,...v==="parallel"?{}:{lane:v}},root_dir:Ve()},h)}function V(){let h=ce();return typeof h.revision=="number"?h.revision:0}function j(h){h&&h.queue&&o&&o.set(h.queue)}async function De(h){if(!n||!h)return;let v=await n("worker-attempt-pause",{attempt_id:h});v&&v.paused===!1&&v.reason&&ye(`\uC77C\uC2DC\uC815\uC9C0 \uAC70\uBD80: ${v.reason}`,"error",2400)}async function lt(h,v="session"){if(!n||!h)return;let R=await zr();if(R===null)return;let ae=async(Le={})=>await n("worker-attempt-resume",{attempt_id:h,expected_revision:V(),...R!==""?{instructions:R}:{},...Le}),he=await ae();j(he),he&&he.conflict&&(he=await ae(),j(he)),he=await zn(he,(Le,He)=>ae({continuation:Le,decision_token:He}),{onResult:j,refresh:()=>ae()}),he&&he.resumed===!1&&!he.conflict&&he.reason&&ye(`${v==="settlement"?"\uC815\uC0B0 \uC7AC\uAC1C":"\uC774\uC5B4\uD558\uAE30"} \uAC70\uBD80: ${he.reason}`,"error",2400)}async function Qe(h,v,R=!0){if(!n)return null;let ae=n,he=await ae(h,{...v,expected_revision:V()});return j(he),he&&he.conflict&&R&&(he=await ae(h,{...v,expected_revision:V()}),j(he)),he}async function w(h){if(!n||!h)return;let v=ce().merge_queue?.find(ae=>ae.bead_id===h)?.continuation_action;if(v?.mismatch&&v.continuation===null){await je(h,v.mismatch);return}re.add(h),ue();let R;try{R=await Qe("worker-merge-queue-add",{bead_id:h})}catch{ye("\uBA38\uC9C0 \uD074\uB9AD\uC774 \uC11C\uBC84\uC5D0 \uC804\uB2EC\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4(\uC5F0\uACB0 \uBB38\uC81C) \u2014 \uC5F0\uACB0 \uBCF5\uAD6C \uD6C4 \uB2E4\uC2DC \uB20C\uB7EC\uC8FC\uC138\uC694","error",3200);return}finally{re.delete(h),ue()}if(!(!R||R.applied)){if(R.conflict){ye("\uD050\uAC00 \uBC14\uB00C\uC5B4 \uBA38\uC9C0 \uD074\uB9AD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uB20C\uB7EC\uC8FC\uC138\uC694","error",2400);return}ye(Pv(R.reason),"error",2400)}}async function H(h){if(!(!n||!h||q.has(h))){q.add(h),ue();try{let v=await n("worker-cleanup-retry",{bead_id:h,expected_revision:V()});j(v),v&&!v.retried&&!v.conflict&&v.reason&&ye(`\uC815\uB9AC \uC7AC\uAC1C \uAC70\uBD80: ${v.reason}`,"error",2400)}finally{q.delete(h),ue()}}}async function Ce(h,v){let R=ce().hold;if(!n||!R||typeof R.since!="number")return;let ae=await n(h,{since:R.since});j(ae),ae&&ae.ok===!1&&ye(`${v}: ${ae.reason==="hold_changed"?"\uD050 \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uD655\uC778\uD558\uC138\uC694":ae.reason||""}`,"error",2800)}async function Ee(h,v){if(!n||!h||!v)return;let R=await n("worker-parked-retry",{bead_id:h,attempt_id:v});j(R),R&&R.ok===!1&&ye(`\uC7AC\uC2DC\uB3C4 \uAC70\uBD80: ${R.reason==="not_latest"?"\uC774 bead\uC5D0 \uB354 \uC0C8\uB85C\uC6B4 \uC2DC\uB3C4\uAC00 \uC788\uC2B5\uB2C8\uB2E4":R.reason||""}`,"error",2800)}async function je(h,v){let R=await zn({continuation_mismatch:v},(he,Le)=>Qe("worker-merge-queue-add",{bead_id:h,continuation:he,decision_token:Le},!1)),ae=R?.queue?.merge_queue?.find(he=>he.bead_id===h)?.continuation_action;if(R?.applied!==!0&&ae?.continuation===null&&ae.mismatch){await je(h,ae.mismatch);return}R&&R.applied===!1&&!R.conflict&&ye("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD\uC774 \uCD5C\uC2E0 \uC0C1\uD0DC\uC640 \uC77C\uCE58\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4","error",2800)}async function Xe(h){if(!n)return;let v=await Qe("worker-merge-auto-toggle",{on:h});!v||v.conflict||ye(h?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0 \u2014 \uB300\uAE30 \uD56D\uBAA9\uC744 \uBE44\uC6E0\uC2B5\uB2C8\uB2E4",h?"success":"info",2400)}async function dt(h){if(!n||!h)return;let v=await Qe("worker-merge-queue-remove",{bead_id:h});v&&!v.conflict&&!v.applied&&v.reason==="merge_active"&&ye("\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error",2400)}async function xt(){await Qe("worker-merge-queue-remove",{all:!0})}async function Ct(h,v=null,R="unmerged",ae=null){if(!n||!h)return;let he=Ro(h,R);if(!(!!ae||typeof globalThis.confirm!="function"||globalThis.confirm(he)))return;let He=await n("worker-discard",{bead_id:h,...v?{attempt_id:v}:{},...ae?{operation_id:ae}:{},expected_revision:V()});if(j(He),He&&He.conflict&&(He=await n("worker-discard",{bead_id:h,...v?{attempt_id:v}:{},...ae?{operation_id:ae}:{},expected_revision:V()}),j(He)),He&&He.discarded===!0){ye(zs(He),"success",5e3);return}if(He&&He.reason){ye(`\uD3D0\uAE30 \uC2E4\uD328: ${He.reason}`,"error",2800);return}if(He&&He.accepted&&He.pending==="merged_revert"){ye("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success",2400);return}if(He&&He.accepted&&!He.discarded){ye(`\uD3D0\uAE30 \uC9C4\uD589: ${He.phase||"\uBC31\uC5C5 \uC911"}`,"success",2400);return}He&&!He.conflict&&ye("\uD3D0\uAE30 \uAC70\uBD80: unknown","error",2800)}async function St(h,v,R){if(!(!n||!v||!R||Q.has(v))){Q.add(v),ue();try{let ae=await n(h,{bead_id:v,action_id:R,expected_revision:V()});j(ae),ae?.conflict?ye("\uC774\uC804 \uC791\uC5C5 \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694.","error",2800):!ae?.ok&&ae?.reason&&ye(`\uC774\uC804 \uC791\uC5C5 \uCC98\uB9AC \uAC70\uBD80: ${String(ae.reason)}`,"error",2800)}finally{Q.delete(v),ue()}}}async function mt(h,v){if(!n||!v||U.has(v))return;U.add(v),ue();let R;try{let ae=async(he={})=>await n(h,{bead_id:v,expected_revision:V(),...he});R=await ae(),j(R),R&&R.conflict&&(R=await n(h,{bead_id:v,expected_revision:V()}),j(R)),h==="worker-revise-fix"&&(R=await zn(R,(he,Le)=>ae({continuation:he,decision_token:Le}),{onResult:j,refresh:()=>ae()}))}finally{U.delete(v),ue()}if(!(!R||R.conflict)){if(R.ok){ye(h==="worker-revise-fix"?"\uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4 \u2014 \uC218\uB9AC \uD6C4 \uAD6C\uD604\uC774 \uC7AC\uB514\uC2A4\uD328\uCE58\uB429\uB2C8\uB2E4":"\uB378\uD0C0 \uC2B9\uC778 \uC644\uB8CC \u2014 \uC601\uC218\uC99D \uAC31\uC2E0 + \uD30C\uD0B9 \uD574\uC81C","success",2800);return}ye(`\uCC98\uBD84 \uAC70\uBD80: ${R.reason||""}`,"error",3e3)}}async function ut(h){if(!n)return;let v=await n("worker-automation-toggle",{on:h,expected_revision:V()});j(v),v&&v.conflict&&await n("worker-automation-toggle",{on:h,expected_revision:V()}).then(j)}async function vt(h){if(!n||!h)return;let v=await n("worker-repo-operation-dismiss",{operation_id:h});j(v),v&&v.ok===!1&&ye(`\uAE30\uB85D \uB2EB\uAE30 \uAC70\uBD80: ${v.reason||""}`,"error",3e3)}async function Rt(h){if(!n||!Number.isFinite(h))return;let v=Math.max(Fi,Math.floor(h)),R=await n("worker-queue-set-slots",{slots:v,expected_revision:V()});j(R),R&&R.conflict&&await n("worker-queue-set-slots",{slots:v,expected_revision:V()}).then(j)}async function Je(h){if(!n||!Number.isInteger(h)||h<1||h>Rf)return;let v=ce(),R=(Array.isArray(v.serial_lanes)?v.serial_lanes:[]).slice(h).reduce((Le,He)=>Le+(Array.isArray(He?.entries)?He.entries.length:0),0),ae=()=>({count:h,expected_revision:V()}),he=await n("worker-queue-set-serial-lane-count",ae());j(he),he&&he.conflict&&(he=await n("worker-queue-set-serial-lane-count",ae()),j(he)),he&&he.applied&&R>0&&ye(`\uC9C1\uB82C \uB808\uC778 \uCD95\uC18C \u2014 ${R}\uAC1C \uD56D\uBAA9\uC774 \uBCD1\uB82C \uB300\uAE30\uB85C \uC774\uB3D9`)}function b(){let h=vr(L),v=le.read({candidate_sort:X,done_since:h});return Oe=v.workspaces,me=lr(v.workspaces,v.workspaces_state,{done_since:h,candidate_filter:m,candidate_hidden_counts:"per_control",candidate_sort:"as_given",groups:"all"}),me}function S(h){return h.queue_groups[0]||Tv}function te(h){let v=h.dependency_chips||null,R={...v&&v.released?{released:v.released}:{},...v&&v.dependents?{dependents:v.dependents}:{}},ae=Y.get(h.id),he=J.get(h.id)||null,Le=ae&&ae.overlaps.length>0?ae.overlaps:null,He=!!ae&&ae.scope_missing;return!he&&!Le&&!He&&Object.keys(R).length===0?null:{...R,...he?{predecessors:he}:{},...Le?{overlaps:Le}:{},...He?{scope_missing:!0}:{}}}function ee(h){return{...h,workspace_name:"",done_layout:void 0,dependency_chips:te(h)||void 0,chip_popover:_e(h)}}function _e(h){return Qs(h,v=>B.isOpen({bead_id:h.id,chip_key:v}))}function Ue(){let h=ce(),v=new Map;for(let R of Object.values(_n(h.lane_states))){let ae=Array.isArray(R?.corrections)?R.corrections:[];for(let he of ae)he&&typeof he.bead_id=="string"&&typeof he.after=="string"&&v.set(he.bead_id,he.after)}return{admission:_n(h.admission),correction_after:v}}function Se(h,v){let R=ee(h),ae=xu(v.admission[h.id]||null,!!h.discard||Q.has(h.id)),he=v.correction_after.get(h.id);return{...R,draggable:R.draggable===!0&&!ae,stale_work:ae,reason:ae?"":R.reason,badges:he?[`\u{1F517} ${he} \uB4A4 (blocks \uC790\uB3D9)`,...R.badges||[]]:R.badges,revise_enabled:R.revise_enabled===!0&&!U.has(h.id)}}function Ne(h){let v=Ue();return S(h).sublanes.parallel.map(R=>Se(R,v))}function Ze(h){let v=Ue();return S(h).sublanes.serial.map(R=>{let ae=R.occupants.map(he=>({id:he.id,title:he.title,draggable:!1,lane:R.id,ghost:!0,badges:[he.badge]}));return{id:R.id,index:R.index+1,raw_length:R.raw_length,ghosts:ae,items:R.items.map(he=>Se(he,v)),occupied:R.occupied_by.length>0,badge:R.occupants.length>0?R.occupants[0].badge:"\uB300\uAE30",cycle:R.cycle===!0}})}function _t(h){return h.runnable.map(v=>ee(v))}function Be(h){return h.done.map(v=>ee(v))}function ft(h){let v=h.running.filter(R=>R.non_occupying!==!0).map(R=>({...R,bead_id:R.id,attempt_id:R.attempt_id||"",paused:R.run_state==="paused",failed:R.run_state==="failed",parked:R.run_state==="parked",retry_wait:R.run_state==="retry_wait",waiting:R.run_state==="waiting",wait:R.wait||null,status_label:R.run_state==="failed"?R.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328":R.run_state==="parked"?"\uC138\uC158 \uB300\uAE30":R.run_state==="retry_wait"?"\uC7AC\uC2DC\uB3C4 \uB300\uAE30":R.run_state==="waiting"?"\uC120\uD589 \uB300\uAE30":void 0,can_pause:R.can_pause!==!1,workspace_name:"",dependency_chips:te(R)||void 0,chip_popover:_e(R),rollup_expanded:ne.has(R.id),failure:R.failure?{...R.failure,open:O===R.attempt_id}:null}));return[...v.filter(R=>R.failed===!0),...v.filter(R=>R.failed!==!0&&R.parked===!0),...v.filter(R=>R.failed!==!0&&R.parked!==!0)]}function qt(h){return Ft(h).map(v=>({...v,chip_popover:_e(v)}))}function Ft(h){if(we&&we.model===h)return we.rows;let v=ce(),R=S(h),ae=_n(v.attempts),he=Object.values(ae).filter(Kn),Le=new Map;for(let We of he)Le.set(We.attempt_id,We);let He=new Map;for(let We of he)He.set(We.bead_id,We);let $t=new Map;for(let We of[...h.pr_wait,...h.running,...h.queue,...h.runnable,...h.done])$t.has(We.id)||$t.set(We.id,We);let Ut=We=>{let Dt=null;for(let bn of he)!bn||bn.bead_id!==We||Ma(bn,Le)||(Dt===null||(typeof bn.started_at=="number"?bn.started_at:0)>=(typeof Dt.started_at=="number"?Dt.started_at:0))&&(Dt=bn);return Dt&&typeof Dt.target_base=="string"?Dt.target_base:null},Jt=new Map;for(let We of h.running)We.run_state==="failed"||We.conflict_resolution!==!0||(We.run_state!=="paused"?Jt.set(We.id,"running"):Jt.has(We.id)||Jt.set(We.id,"paused"));let dn=_n(v.auto_merge_skips),qn=new Set(R.merge.auto_excluded),On=_n(v.pr_observations),wn=_n(v.pr_activity),Fn=_n(v.cleanup_failed),Yt=_n(v.discard_operations),er=_n(v.bead_workflow),Ln=_n(v.bead_titles),tr=v.merge_queue_state||{active:null,failures:{}},In=R.merge.state.waiting,jn=new Map;for(let We of Array.isArray(v.merge_queue)?v.merge_queue:[])We&&typeof We=="object"&&We.bead_id&&jn.set(We.bead_id,We);let _r=(Array.isArray(v.pr_wait)?v.pr_wait:[]).map(We=>{let Dt=$t.get(We.bead_id);return{...Gv(We.bead_id,Dt?.title||Ln[We.bead_id]||We.bead_id,On,Fn[We.bead_id]||null,Gn(ae,We.bead_id),wn[We.bead_id]||(re.has(We.bead_id)?{activity:null,merge_progress:null,queueing:"merge"}:q.has(We.bead_id)?{activity:null,merge_progress:null,queueing:"cleanup"}:null),Jt.get(We.bead_id)||null,We.external===!0,{position:R.merge.positions.get(We.bead_id)||0,active:tr.active===We.bead_id,failure:_n(tr.failures)[We.bead_id]||null,waiting:In&&In.bead_id===We.bead_id?In.reason:null,resolution:R.merge.resolutions.get(We.bead_id),continuation_action:R.merge.continuations.get(We.bead_id),authority:R.merge.authorities.get(We.bead_id)||null,hold:jn.get(We.bead_id)?.hold||null,review_dispatch:jn.get(We.bead_id)?.review_dispatch||null},We.wt_present!==!1,v.auto_merge===!0&&qn.has(We.bead_id)?dn[We.bead_id]?.reason||"":null,Ia(R.declared_base,Ut(We.bead_id)),_n(v.completion_status)[We.bead_id]||null,Yt,v.auto_merge===!0,{merge_sha:We.merge_sha,cleanup_cursor:We.cleanup_cursor,repo_operations:R.repo_operations},Dt?te(Dt):null,vu(ae,We.bead_id)),workflow:er[We.bead_id]||null,priority:Dt?.priority,from_id:Dt?.from_id,...Dt?.created_at===void 0?{}:{created_at:Dt.created_at},...Dt?.updated_at===void 0?{}:{updated_at:Dt.updated_at}}});return we={model:h,rows:_r},_r}function Xt(h){let v=S(h),R=[];for(let Le of h.running)Le.non_occupying!==!0&&R.push({id:Le.id,title:Le.title,location_label:"\uC2E4\uD589\uC911",kind:"running",lane_id:Le.serial_lane_id??null});for(let Le of h.pr_wait)R.push({id:Le.id,title:Le.title,location_label:"PR \uB300\uAE30",kind:"pr_wait",lane_id:null});for(let Le of v.sublanes.serial)Le.items.forEach((He,$t)=>{R.push({id:He.id,title:He.title,location_label:`${Le.id} #${$t+1}`,kind:"serial",lane_id:Le.id})});v.sublanes.parallel.forEach((Le,He)=>{R.push({id:Le.id,title:Le.title,location_label:`#${He+1}`,kind:"parallel",lane_id:null})});for(let Le of h.runnable)R.push({id:Le.id,title:Le.title,location_label:"\uD6C4\uBCF4",kind:"candidate",lane_id:null,queue_placeable:Le.queue_placeable===!0});let ae=ce();Y=ff(ae.bead_scope,R);let he=new Map;for(let Le of[...h.running,...h.runnable])Array.isArray(Le.blocked_by)&&Le.blocked_by.length>0&&he.set(Le.id,Le.blocked_by);for(let[Le,He]of Object.entries(_n(ae.bead_blocked_by)))Array.isArray(He)&&he.set(Le,He.filter($t=>typeof $t=="string"&&$t.length>0));J=Mu(he,R,_n(ae.blocker_workspaces))}function kt(h){let v=h.hold&&typeof h.hold=="object"?h.hold:null;if(!v||v.kind!=="env"&&v.kind!=="systemic")return"";let R=dr(v.cause)||String(v.cause||""),ae=Array.isArray(h.lineages)?h.lineages:[];if(v.kind==="env"){let Le=ae.map($t=>$t&&$t.next_at).filter($t=>typeof $t=="number").sort(($t,Ut)=>$t-Ut)[0],He=typeof Le=="number"?` \xB7 \uB2E4\uC74C ${new Date(Le).toLocaleTimeString("ko-KR",{hour:"2-digit",minute:"2-digit"})}`:"";return c`<div class="worker-hold worker-hold--env" role="status">
        <span class="worker-hold__text"
          >환경 보류: ${R} — 재시도 대기${He}</span
        >
        <button
          type="button"
          class="worker-hold__retry"
          title="예약된 재시도를 지금 실행합니다"
        >
          지금 재시도
        </button>
      </div>`}let he=(Array.isArray(v.bead_ids)?v.bead_ids:[]).filter(Le=>typeof Le=="string"&&Le.length>0);return c`<div class="worker-hold worker-hold--systemic" role="alert">
      <span class="worker-hold__text"
        >${R}${he.length>0?` \u2014 bead ${he.join(", ")}`:""}</span
      >
      <button
        type="button"
        class="worker-hold__resume"
        title="정지를 풀고 멈춰 있던 bead를 다시 디스패치합니다"
      >
        재개
      </button>
    </div>`}function et(h){let v=ce(),R=S(h),ae=R.sublanes.parallel,he=ae.length>0?ae[0].id:"\u2014",Le=c`<button
      type="button"
      class="worker-play${v.auto_advance?" is-active":""}"
    >
      ${v.auto_advance?"\u23F8 \uC790\uB3D9\uD654 \uBA48\uCDA4":"\u25B6 \uC790\uB3D9\uD654"}
    </button>`,He=jt(h),$t=R.over_cap?c`<span
          class="worker-overcap"
          title="수동 재개(▶)는 슬롯 cap을 초과할 수 있습니다 — 자동 진행은 cap을 지킵니다"
          >cap 초과</span
        >`:"",Ut=v.auto_advance?0:(Array.isArray(v.queue)?v.queue:[]).filter(Yt=>Yt&&typeof Yt.armed_by_lane=="string"&&Yt.armed_by_lane.length>0).length,Jt=Ut>0?c`<span
            class="worker-kpi__chip worker-kpi__chip--armed"
            title="모니터 연결 레인이 발차한 대기 행입니다 — 이 레포의 자동 진행은 꺼진 채입니다"
            >⏸ 자동 진행 꺼짐 · 연결 레인 ${Ut}건 진행 중</span
          >`:"",dn=c`<span class="worker-kpi__chip worker-kpi__chip--running"
        >실행 <b>${R.live_count}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--pr"
        >PR 대기 <b>${qt(h).length}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--done"
        >${M()} 완료 <b>${h.done.length}</b></span
      >`,qn=c`<span
      class="worker-kpi__chip worker-kpi__chip--base"
      title=${R.declared_base?"\uC774 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uC5B8\uD55C target base (docs/agents/repo-ops.toml). \uB514\uC2A4\uD328\uCE58 \uC2DC\uC810\uC758 \uAC80\uC99D\uC740 \uBCC4\uB3C4":"\uC120\uC5B8 \uD30C\uC77C\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 \u2014 target base \uD655\uC778 \uBD88\uAC00"}
      >base ${R.declared_base||"?"}</span
    >`,On=c`<label class="worker-tgl worker-slots"
        >동시 실행
        <input
          type="number"
          class="worker-slots__input"
          min=${Fi}
          step="1"
          .value=${String(R.slots)}
          title="동시에 실행할 세션 수 (최소 1 = 순차 실행)"
      /></label>
      <label
        class="worker-tgl worker-serial-lanes"
        title="고정 직렬 레인 수 (1~5). 축소 시 잘린 레인의 대기 항목은 병렬 대기로 돌아갑니다"
        >직렬 레인
        <select class="worker-serial-lane-count" aria-label="직렬 레인 수">
          ${Array.from({length:Rf},(Yt,er)=>er+1).map(Yt=>c`<option
                value=${String(Yt)}
                ?selected=${R.serial_lane_count===Yt}
              >
                ${Yt}
              </option>`)}
        </select>
      </label> `,wn=ku(R.repo_operations,R.cleanup_failures),Fn=kt(v);return W?c`<div class="worker-ribbon">
          ${Le} ${He}
          <div class="worker-kpi worker-kpi--ribbon">
            ${$t}${Jt}${dn}
          </div>
        </div>
        <div class="worker-ctrl worker-ctrl--mobile">
          <div class="worker-ctrl__ops">${On}</div>
          <div class="worker-kpi">${qn}</div>
        </div>
        ${Fn}${wn}${be.template()}`:c`<div class="worker-ctrl">
        <div class="worker-ctrl__ops">${Le}${He}${On}</div>
        <div class="worker-kpi">
          ${$t}${Jt}${dn}${qn}
          ${(Array.isArray(R.token_total)?R.token_total:R.token_total?[{label:R.token_total,tooltip:`${M()} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}]:[]).map(Yt=>c`<span
                class="worker-kpi__chip worker-kpi__chip--tokens"
                title=${Yt.tooltip}
                >${M()} 완료 · 누적 ${Yt.label}</span
              >`)}
          <span class="worker-kpi__next worker-stat"
            >다음 <b>${he}</b></span
          >
        </div>
      </div>
      ${Fn}${wn}${be.template()}`}function Pt(h){let v=h.runnable_hidden;return c`<div class="worker-filter">
      <label class="worker-filter__tgl" title="blocked 이슈 표시 (기본 숨김)">
        <input
          type="checkbox"
          class="worker-filter__blocked"
          .checked=${m.show_blocked}
        />
        🔒 blocked${v.blocked>0?` ${v.blocked}`:""}
      </label>
      <div class="worker-filter__spec" role="group" aria-label="spec 필터">
        ${Ov.map(R=>c`<button
              type="button"
              class="worker-filter__chip${m.spec===R.value?" is-active":""}"
              data-spec=${R.value}
              aria-pressed=${m.spec===R.value?"true":"false"}
            >
              ${R.label}
            </button>`)}
        ${v.spec>0?c`<span class="worker-filter__hidden">숨김 ${v.spec}</span>`:""}
      </div>
    </div>`}function Qt(){let h=F?"custom":vl(X)||"custom";return c`<select
      class="worker-sort"
      aria-label="후보 정렬"
      title="후보 정렬"
      .value=${h}
    >
      ${ts.map(v=>c`<option value=${v.id} ?selected=${h===v.id}>
            ${v.label}
          </option>`)}
      <option value="custom" ?selected=${h==="custom"}>
        사용자 지정…
      </option>
    </select>`}function tn(){let h=ns(X);return c`<div
      class="worker-sort-chain"
      role="group"
      aria-label="후보 정렬 체인"
    >
      ${[0,1,2].map(v=>{let R=h[v];return c`<span class="worker-sort-chain__step">
          <select
            class="worker-sort-chain__key"
            data-step=${v}
            aria-label=${`${v+1}\uCC28 \uC815\uB82C \uD0A4`}
            .value=${R?R.key:""}
          >
            ${v===0?"":c`<option value="" ?selected=${!R}>없음</option>`}
            ${lf.map(ae=>c`<option
                  value=${ae.key}
                  ?selected=${!!R&&R.key===ae.key}
                >
                  ${ae.label}
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
    </div>`}function zt(){return c`<div class="worker-done-controls">
      <select
        class="worker-sort worker-done-range"
        aria-label="완료 기간"
        title="완료 기간"
        .value=${L}
      >
        ${Mr.map(h=>c`<option value=${h.value} ?selected=${L===h.value}>
              ${h.label}
            </option>`)}
      </select>
    </div>`}function jt(h){let v=S(h).merge,R=ce().auto_merge===!0;if(v.running)return c`<button
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
      </button>`;let ae=new Set(v.auto_excluded),he=qt(h).filter(Le=>Le.merge_action&&Le.merge_enabled&&!ae.has(Le.id)).length;return c`<button
      type="button"
      class="worker-merge-all"
      title="켜 두면 자격이 생기는 PR을 계속 큐에 넣어 순서대로 충돌 해소·머지합니다"
    >
      ▶ 자동 머지${he>0?` ${he}`:""}
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
    </span>`}function Mt(h,v){return c`<div
      data-bead-id=${h.id}
      data-drag-kind=${v.kind}
      data-root-dir=${v.root_dir}
      data-lane-id=${nn(v.lane_id)}
      data-row-index=${v.row_index}
      data-queue-index=${String(h.queue_index??0)}
    >
      ${An(h,{actions:un(h)})}
    </div>`}function Kt(h){let v=Ne(h),R=Ve();return Js({parallel:{rows:v.map((ae,he)=>Mt(ae,{kind:"parallel",root_dir:R,row_index:he})),count:v.length,collapsed:N.isAreaCollapsed("parallel"),drop:{drop:"parallel",root_dir:R}},serial:{lanes:Ze(h).map(ae=>({id:ae.id,title:`\uC9C1\uB82C ${ae.index}`,rows:[...ae.ghosts.map(he=>An(he,{actions:un(he)})),...ae.items.map((he,Le)=>Mt(he,{kind:"repo-serial",root_dir:R,row_index:Le,lane_id:ae.id}))],count:ae.ghosts.length+ae.items.length,empty:ae.ghosts.length+ae.items.length===0,badge:ae.badge,held:ae.occupied,cycle:ae.cycle,drop:{drop:"repo-serial",root_dir:R,lane_id:ae.id,lane_length:String(ae.raw_length)}})),collapsed:N.isAreaCollapsed("serial")}})}function Bt(h){return vp(ft(h),Date.now(),Ge)}function Zt(h){return h.running.some(v=>v.kind!=="session"&&v.run_state==="running")}function pe(h){let v=S(h),R=_t(h),ae=Ne(h),he=Be(h),Le=qt(h),He=ft(h),$t=Nn({id:"worker-pane-candidate",lane:"candidate",title:"\uD6C4\uBCF4",items:R,src:!0,empty:"\uD6C4\uBCF4 \uC5C6\uC74C",header_control:Qt(),header_row:F?tn():void 0,controls:Pt(h),collapsible:!0,collapsed:N.isCollapsed("candidate"),place_menu:ze(R),onOpenDoc:u?(Jt,dn)=>u(dn):void 0}),Ut=Nn({id:"worker-pane-done",lane:"done",title:"\uC644\uB8CC",items:he,empty:`${M()} \uC644\uB8CC \uC5C6\uC74C`,header_control:zt(),collapsible:!0,collapsed:N.isCollapsed("done"),preview:W?Array.isArray(v.token_total)?v.token_total.map(Jt=>Jt.label).join(" \xB7 "):v.token_total||Of(he):void 0});return W?c`<div class="worker-lanes worker-lanes--mobile">
        ${ei({live:Zt(h),running_body:He.length>0?Bt(h):"",pr_wait_rows:Le.map(Jt=>An(Jt)),count:He.length+Le.length})}
        ${Nn({id:"worker-pane-queue",lane:"queue",title:"\uB300\uAE30",items:ae,count:ae.length,collapsible:!0,collapsed:N.isCollapsed("queue"),preview:Of(ae),body:Kt(h)})}
        ${$t} ${Ut}
      </div>`:c`<div class="worker-lanes">
      ${$t}
      ${Nn({id:"worker-pane-queue",lane:"queue",title:"\uB300\uAE30",items:ae,count:ae.length,collapsible:!0,collapsed:N.isCollapsed("queue"),body:Kt(h)})}
      ${Nn({id:"worker-pane-running",lane:"running",title:"\uC2E4\uD589 \uC911",items:He,header_control:c`<span class="worker-pane__meta"
          >슬롯 ${v.slots}</span
        >`,live:Zt(h),collapsible:!0,collapsed:N.isCollapsed("running"),body:Bt(h)})}
      ${Nn({id:"worker-pane-pr-wait",lane:"pr_wait",title:"PR \uB300\uAE30",items:Le,empty:"PR \uB300\uAE30 \uC5C6\uC74C",collapsible:!0,collapsed:N.isCollapsed("pr_wait")})}
      ${Ut}
    </div>`}function C(h){N.toggle(h),ue()}function ge(h){N.toggleArea(h),ue()}function ue(){let h=b();Xt(h),rt(et(h),Ae),rt(pe(h),Te)}function y(){let h=!0,v=Ti(R=>{if(W=R,h){h=!1;return}ue()});ve.push(v)}function p(h){m=h,Rv(h),ue()}function _(h){if(h==="custom"){F=!0,ue();return}X=Or(h),wl(X),F=!1,ue()}function E(h){X=Or({chain:h}),wl(X),ue()}function G(h){L=Mn(h),Iv(L),f?.(L),ue()}function K(h){let v=h.target?.closest?.(".worker-serial-lane-count");if(v){let Ut=Number.parseInt(v.value,10);Number.isFinite(Ut)&&Je(Ut).then(ue);return}let R=h.target?.closest?.(".worker-filter__blocked");if(R){p({...m,show_blocked:R.checked});return}let ae=h.target?.closest?.(".worker-sort-chain__key");if(ae){let Ut=Number.parseInt(ae.getAttribute("data-step")||"",10);Number.isFinite(Ut)&&E(uf(ns(X),Ut,ae.value));return}let he=h.target?.closest?.(".worker-done-range");if(he){G(he.value);return}let Le=h.target?.closest?.(".worker-sort");if(Le){_(Le.value);return}let He=h.target?.closest?.(".worker-slots__input");if(!He)return;let $t=Number.parseInt(He.value,10);if(!Number.isFinite($t)){ue();return}Rt($t).then(ue)}function se(h){return h?{runner:h.runner||void 0,model:h.model||void 0,effort:h.effort||void 0,worktree:h.worktree||void 0,status:h.status||void 0,session_id:h.session_id||void 0}:{}}function xe(){let h=S(b()),v=ce().workspace_info,R=v&&typeof v=="object"&&v.repo_ops&&typeof v.repo_ops=="object"?v.repo_ops:null;return{operations:h.repo_operations,cleanup_failures:h.cleanup_failures,repo:l&&l()||"",repo_ops:R}}function Ke(){Ge&&I.close(),fe.hidden=!1,T.hidden=!1,oe.open(xe()),ue()}function ot(h){let v=ce(),R=v.attempts?v.attempts[h]:null;Ge=h,oe.close(),fe.hidden=!0,T.hidden=!1,I.open({attempt_id:h,meta:se(R)}),ue()}function yt(h){let v=ce(),R=(Array.isArray(v.session_active)?v.session_active:[]).find(he=>he&&he.bead_id===h),ae=(R&&Array.isArray(R.session_refs)?R.session_refs:[]).find(he=>he&&he.current===!0);ae&&(oe.close(),fe.hidden=!0,T.hidden=!1,I.open(Hr(ae,h,"in_progress")),ue())}function gt(){if(oe.isOpen()&&oe.refresh(xe()),!Ge)return;let h=ce(),v=h.attempts?h.attempts[Ge]:null;if(v){I.updateMeta(se(v));return}I.close()}function x(h,v){if(h.length===0||!i)return;let R=l?l():void 0;if(v.length===0||!R||v===R||!a){i(h);return}Promise.resolve(a(v)).then(()=>{i(h)}).catch(()=>{ye("\uB808\uD3EC \uC804\uD658\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error",2400)})}function A(h){let v=h.target;if(v?.closest?.(".worker-mini__grip"))return;let R=v?.closest?.(".worker-sort-chain__dir");if(R){let Me=Number.parseInt(R.getAttribute("data-step")||"",10);Number.isFinite(Me)&&E(df(ns(X),Me));return}let ae=v?.closest?.(".worker-dep__open");if(ae){x(ae.getAttribute("data-dep-id")||"",ae.getAttribute("data-root-dir")||"");return}let he=v?.closest?.(".judgement-chip");if(he){let Me=he.closest("[data-bead-id]"),Et=Me&&Me.getAttribute("data-bead-id")||"",Ht=he.getAttribute("data-chip-key")||"";Et&&Ht&&B.toggle({bead_id:Et,chip_key:Ht});return}if(v?.closest?.(".chip-popover"))return;if(v?.closest?.(".worker-repo-strip")){Ke();return}let Le=v?.closest?.(".worker-repo-op__dismiss");if(Le){vt(Le.dataset.operationId||"");return}let He=v?.closest?.(".worker-cleanup__resume");if(He){let Me=He.dataset.beadId;Me&&H(Me);return}if(v?.closest?.(".worker-hold__retry")){Ce("worker-queue-hold-retry-now","\uC9C0\uAE08 \uC7AC\uC2DC\uB3C4 \uAC70\uBD80");return}if(v?.closest?.(".worker-hold__resume")){Ce("worker-queue-hold-resume","\uC7AC\uAC1C \uAC70\uBD80");return}if(v?.closest?.(".worker-play")){ut(!ce().auto_advance);return}let $t=v?.closest?.(".worker-merge-all");if($t){$t.classList.contains("worker-merge-all--stop")?ce().auto_merge===!0?Xe(!1):xt():Xe(!0);return}let Ut=v?.closest?.(".worker-pane__toggle[data-lane]");if(Ut){let Me=Ut.dataset.lane;(Me==="candidate"||Me==="queue"||Me==="running"||Me==="pr_wait"||Me==="done")&&C(Me);return}let Jt=v?.closest?.(".worker-wait__area-toggle[data-area]");if(Jt){let Me=Jt.dataset.area;(Me==="parallel"||Me==="serial")&&ge(Me);return}let dn=v?.closest?.(".worker-card__place-lane");if(dn){let Me=dn.dataset.beadId,Et=dn.dataset.lane;Me&&(Et==="parallel"||/^s[1-5]$/.test(Et||""))&&($=null,ue(),Pe(Me,Et));return}if(v?.closest?.(".worker-card__place-cancel")){$=null,ue();return}let On=v?.closest?.(".worker-card__place");if(On){let Me=On.dataset.beadId;Me&&!On.disabled&&(Fe()?($=Me,ue()):Pe(Me,"parallel"));return}let wn=v?.closest?.(".worker-filter__chip");if(wn){let Me=wn.dataset.spec;(Me==="all"||Me==="with"||Me==="without")&&p({...m,spec:Me});return}let Fn=v?.closest?.('[data-action="queue-remove"]');if(Fn){let Me=Fn.dataset.beadId||"";Me&&it.sendOp({type:"worker-queue-remove",payload:{bead_id:Me},root_dir:Ve()},Me);return}let Yt=v?.closest?.(".worker-mini__merge");if(Yt){let Me=Yt.dataset.beadId||"";ce().cleanup_failed?.[Me]?H(Me):w(Me);return}let er=v?.closest?.(".worker-mini__merge-cancel");if(er){dt(er.dataset.beadId||"");return}let Ln=v?.closest?.(".worker-mini__discard");if(Ln){Ct(Ln.dataset.beadId||"",Ln.dataset.attemptId||null,Ln.dataset.discardMode==="merged"?"merged":"unmerged",Ln.dataset.operationId||null);return}let tr=v?.closest?.(".worker-mini__stale-continue");if(tr){St("worker-stale-work-continue",tr.dataset.beadId||"",tr.dataset.actionId||"");return}let In=v?.closest?.(".worker-mini__stale-backup");if(In){St("worker-stale-work-backup-fresh",In.dataset.beadId||"",In.dataset.actionId||"");return}let jn=v?.closest?.(".worker-mini__stale-recheck");if(jn){St("worker-stale-work-recheck",jn.dataset.beadId||"",jn.dataset.actionId||"");return}let _r=v?.closest?.(".worker-mini__revise-fix");if(_r){mt("worker-revise-fix",_r.dataset.beadId||"");return}let We=v?.closest?.(".worker-mini__revise-approve");if(We){mt("worker-revise-approve",We.dataset.beadId||"");return}if(v?.closest?.(".worker-mini__pr"))return;let Dt=v?.closest?.(".rtile__failure-badge");if(Dt){let Me=Dt.dataset.attemptId||"";O=O===Me?null:Me,ue();return}let bn=v?.closest?.(".rtile__attempt-copy");if(bn){let Me=bn.dataset.attemptId||"";Me&&on(Me).then(Et=>{ye(Et?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",Et?"success":"error",1400)});return}if(v?.closest?.(".rtile__parked-retry")){let Me=v?.closest?.(".rtile");Ee(Me?.dataset?.beadId||"",Me?.dataset?.attemptId||"");return}let lo=v?.closest?.(".rtile__discard");if(lo){let Me=v?.closest?.(".rtile"),Et=Me?.dataset?.beadId,Ht=Me?.dataset?.attemptId;Et&&Ct(Et,Ht||null,lo.dataset.confirmation==="merged"?"merged":"unmerged",lo.dataset.operationId||null);return}if(v?.closest?.(".rtile__pause")){let Et=v?.closest?.(".rtile")?.dataset?.attemptId;Et&&De(Et);return}if(v?.closest?.(".rtile__resume")){let Me=v?.closest?.(".rtile__resume"),Ht=v?.closest?.(".rtile")?.dataset?.attemptId;Ht&&lt(Ht,Me?.dataset?.resumeKind==="settlement"?"settlement":"session");return}if(v?.closest?.(".rtile__session")){let Me=v?.closest?.(".rtile"),Et=Me?.dataset?.attemptId;if(Et){ot(Et);return}let Ht=Me?.dataset?.beadId;Ht&&yt(Ht);return}if(v?.closest?.(".rtile__failure-pop"))return;if(v?.closest?.(".worker-drawer-overlay__backdrop")){oe.close(),I.close();return}if(v?.closest?.(".worker-drawer-host"))return;let os=v?.closest?.(".rtile .board-card__roll-toggle");if(os){let Me=os.dataset.rollParent;Me&&(ne.has(Me)?ne.delete(Me):ne.add(Me),ue());return}let ss=v?.closest?.(".rtile .board-card__roll-child");if(ss){let Me=ss.dataset.childId;Me&&i&&i(Me);return}let co=v?.closest?.(".rtile");if(co){if(v?.closest?.(".rtile__id")){let Et=co.dataset.beadId;Et&&on(Et).then(Ht=>{Ht?ye("\uBCF5\uC0AC\uB428","success",1200):ye("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}let Me=co.dataset.beadId;Me&&i&&i(Me);return}let is=v?.closest?.(".worker-mini, .worker-card");if(is){let Me=is.dataset.beadId;if(v?.closest?.('[data-seam="log-path-copy"]'))return;if(v?.closest?.(".worker-mini__id, .worker-card__id")){Me&&on(Me).then(Ht=>{Ht?ye("\uBCF5\uC0AC\uB428","success",1200):ye("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}let Et=v?.closest?.(".ctl-chip--from");if(Et){let Ht=Et.dataset.fromId;Ht&&i&&i(Ht);return}Me&&i&&i(Me)}}it.attach(e),e.addEventListener("click",A),e.addEventListener("change",K);function Ie(h){let v=h.target,R=v&&typeof v.closest=="function"?ae=>v.closest(ae):()=>null;O&&!R(".rtile__failure-pop, .rtile__failure-badge")&&(O=null,ue())}function qe(h){h.key!=="Escape"||O===null||(O=null,ue())}return document.addEventListener("click",Ie),document.addEventListener("keydown",qe),B.attach(),ve.push(()=>{document.removeEventListener("click",Ie),document.removeEventListener("keydown",qe),B.detach()}),y(),g&&ve.push(g.subscribe(()=>{le.notifyIssuesChanged(),ue()})),o&&ve.push(o.subscribe(()=>{let h=l&&l()||"";h!==de&&(de=h,ie.close()),ue(),gt()})),ue(),{load(){le.ensureSessionDefaults(),ue()},refreshSessionDefaults:D,destroy(){for(let h of ve.splice(0))try{h()}catch{}it.detach(),e.removeEventListener("click",A),e.removeEventListener("change",K),le.destroy();try{I.destroy()}catch{}T.hidden=!0;try{ie.destroy()}catch{}rt(c``,e)}}}function Al(e){if(!e)return"Unknown";let t=e.split("/").filter(Boolean);return t.length>0?t[t.length-1]:"Unknown"}function Pf(e,t,n,r=async()=>{},o=async()=>{}){let s=Ot("views:workspace-picker"),i=null,l=!1,a=!1,u=!1;async function d(M){let W=M.target.value,q=t.getState().workspace?.current?.path||"";if(W&&W!==q){s("switching workspace to %s",W),l=!0,L();try{await n(W)}catch(U){s("workspace switch failed: %o",U)}finally{l=!1,L()}}}async function f(){let M=t.getState(),N=M.workspace?.current?.path||M.workspace?.available?.[0]?.path||"";if(!(!N||a)){s("git-pulling workspace %s",N),a=!0,L();try{await r(N)}catch(W){s("workspace git pull failed: %o",W)}finally{a=!1,L()}}}function g(M){let N=M.target;N&&e.contains(N)||O()}function m(M){M.key==="Escape"&&O()}function $(){u||(u=!0,document.addEventListener("mousedown",g),document.addEventListener("keydown",m),L())}function O(){u&&(u=!1,document.removeEventListener("mousedown",g),document.removeEventListener("keydown",m),L())}function B(){u?O():$()}async function Y(M){let N=M.target,W=N.value,re=N.checked;s("toggling visibility %s \u2192 %s",W,String(re));try{await o(W,re)}catch(q){s("workspace visibility toggle failed: %o",q)}}function J(M){return M?c`
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
    `:c``}function X(M,N){return c`
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
                ${M.map(W=>c`
                    <label
                      class="workspace-picker__manage-row"
                      title="${W.path}"
                    >
                      <input
                        type="checkbox"
                        class="workspace-picker__manage-checkbox"
                        value="${W.path}"
                        .checked=${!N.has(W.path)}
                        @change=${Y}
                      />
                      <span class="workspace-picker__manage-name"
                        >${Al(W.path)}</span
                      >
                    </label>
                  `)}
              </div>
            `:""}
      </div>
    `}function F(){let M=t.getState(),N=M.workspace?.current,W=M.workspace?.available||[],re=new Set(M.workspace?.hidden||[]),q=N?.path||W[0]?.path||"";if(W.length===0)return c``;let U=W.filter(Q=>!re.has(Q.path)||Q.path===q);if(U.length<=1){let Q=U[0]||W[0],ne=Al(Q.path);return c`
        <div class="workspace-picker workspace-picker--single">
          <span class="workspace-picker__label" title="${Q.path}"
            >${ne}</span
          >
          ${X(W,re)}
          ${J(q)}
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
          ${U.map(Q=>c`
              <option
                value="${Q.path}"
                ?selected=${Q.path===q}
                title="${Q.path}"
              >
                ${Al(Q.path)}
              </option>
            `)}
        </select>
        ${X(W,re)}
        ${J(q)}
        ${l||a?c`<span
              class="workspace-picker__loading"
              aria-hidden="true"
            ></span>`:""}
      </div>
    `}function L(){rt(F(),e)}return L(),i=t.subscribe(()=>L()),{destroy(){i&&(i(),i=null),document.removeEventListener("mousedown",g),document.removeEventListener("keydown",m),rt(c``,e)}}}var Df=["update-status","edit-text","update-priority","create-issue","dep-add","dep-remove","update-assignee","update-exec-settings","update-impl-target","get-session-defaults","set-session-defaults","get-workspace-accounts","set-workspace-accounts","update-workflow-meta","label-add","label-remove","subscribe-list","unsubscribe-list","snapshot","upsert","delete","get-comments","add-comment","delete-issue","list-workspaces","set-workspace","set-workspace-visibility","get-workspace","workspace-changed","git-pull-workspace","subscribe-worker-queue","unsubscribe-worker-queue","worker-queue-snapshot","worker-queue-place","worker-queue-reorder","worker-queue-toggle","worker-automation-toggle","worker-repo-ops-opt-out-toggle","worker-repo-operation-dismiss","worker-repo-operation-deploy-run","worker-queue-set-slots","worker-queue-set-serial-lane-count","worker-queue-set-orchestration-defaults","worker-queue-remove","worker-attempt-pause","worker-attempt-stop","worker-attempt-resume","worker-cleanup-retry","worker-parked-retry","worker-queue-hold-resume","worker-queue-hold-retry-now","worker-merge-queue-add","worker-merge-queue-add-all","worker-merge-auto-toggle","worker-merge-queue-remove","worker-discard","worker-stale-work-continue","worker-stale-work-backup-fresh","worker-stale-work-recheck","worker-pr-discard","worker-revise-fix","worker-revise-approve","subscribe-ui-order","unsubscribe-ui-order","ui-order-set","ui-order-snapshot","subscribe-display-policy","unsubscribe-display-policy","display-policy-set","display-policy-snapshot","subscribe-session-log","unsubscribe-session-log","session-log-snapshot","session-log-append","get-attempt-prompt","get-bead-prompt","get-bead-timeline","get-worker-system-prompt","get-session-refs","subscribe-monitor-pipeline","unsubscribe-monitor-pipeline","monitor-pipeline-snapshot","subscribe-impl-presets","unsubscribe-impl-presets","impl-presets-snapshot","impl-preset-create","impl-preset-update","impl-preset-delete","apply-impl-preset","apply-impl-preset-global","monitor-auto-toggle","monitor-lane-create","monitor-lane-update","monitor-lane-confirm","monitor-lane-remove"];function Sl(){let e=Date.now().toString(36),t=Math.random().toString(36).slice(2,8);return`${e}-${t}`}function Nf(e,t,n=Sl()){return{id:n,type:e,payload:t}}function qf(e={}){let t=Ot("ws"),n={initialMs:e.backoff?.initialMs??1e3,maxMs:e.backoff?.maxMs??3e4,factor:e.backoff?.factor??2,jitterRatio:e.backoff?.jitterRatio??.2},r=()=>e.url&&e.url.length>0?e.url:typeof location<"u"?(location.protocol==="https:"?"wss://":"ws://")+location.host+"/ws":"ws://localhost/ws",o=null,s="closed",i=0,l=null,a=!0,u=new Map,d=[],f=new Map,g=new Set;function m(F){for(let L of Array.from(g))try{L(F)}catch{}}function $(){if(!a||l)return;s="reconnecting",t("ws reconnecting\u2026"),m(s);let F=Math.min(n.maxMs||0,(n.initialMs||0)*Math.pow(n.factor||1,i)),L=(n.jitterRatio||0)*F,M=Math.max(0,Math.round(F+(Math.random()*2-1)*L));t("ws retry in %d ms (attempt %d)",M,i+1),l=setTimeout(()=>{l=null,X()},M)}function O(F){try{o?.send(JSON.stringify(F))}catch(L){t("ws send failed",L)}}function B(){for(s="open",t("ws open"),m(s),i=0;d.length;){let F=d.shift();F&&O(F)}}function Y(F){let L;try{L=JSON.parse(String(F.data))}catch{t("ws received non-JSON message");return}if(!L||typeof L.id!="string"||typeof L.type!="string"){t("ws received invalid envelope");return}if(u.has(L.id)){let N=u.get(L.id);u.delete(L.id),L.ok?N?.resolve(L.payload):N?.reject(L.error||new Error("ws error"));return}let M=f.get(L.type);if(M&&M.size>0)for(let N of Array.from(M))try{N(L.payload)}catch(W){t("ws event handler error",W)}else t("ws received unhandled message type: %s",L.type)}function J(){s="closed",t("ws closed"),m(s);for(let[F,L]of u.entries())L.reject(new Error("ws disconnected")),u.delete(F);i+=1,$()}function X(){if(!a)return;let F=r();try{o=new WebSocket(F),t("ws connecting %s",F),s="connecting",m(s),o.addEventListener("open",B),o.addEventListener("message",Y),o.addEventListener("error",()=>{}),o.addEventListener("close",J)}catch(L){t("ws connect failed %o",L),$()}}return X(),{send(F,L){if(!Df.includes(F))return Promise.reject(new Error(`unknown message type: ${F}`));let M=Sl(),N=Nf(F,L,M);return t("send %s id=%s",F,M),new Promise((W,re)=>{u.set(M,{resolve:W,reject:re,type:F}),o&&o.readyState===o.OPEN?O(N):(t("queue %s id=%s (state=%s)",F,M,s),d.push(N))})},on(F,L){f.has(F)||f.set(F,new Set);let M=f.get(F);return M?.add(L),()=>{M?.delete(L)}},onConnection(F){return g.add(F),()=>{g.delete(F)}},reconnect(){a=!0,l&&(clearTimeout(l),l=null),i=0,X()},close(){a=!1,l&&(clearTimeout(l),l=null);try{o?.close()}catch{}},getState(){return s}}}function Kv(){let e=window.__BDUI_BOOTSTRAP__;return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:null}}}async function Yv(e,t){try{let r=await(await fetch("/api/config")).json();e.setState({config:r})}catch(n){t("config refresh failed",n)}}var El=[["tab:board:ready","ready-issues"],["tab:board:blocked","blocked-issues"],["tab:board:in-progress","in-progress-issues"],["tab:board:resolved","resolved-issues"],["tab:board:deferred","deferred-issues"],["tab:board:closed","closed-issues"]],Ff=[["tab:worker:ready","ready-issues"],["tab:worker:blocked","blocked-issues"],["tab:worker:in-progress","in-progress-issues"],["tab:worker:resolved","resolved-issues"],["tab:worker:closed","closed-issues"]],pr="tab:worker:closed",Vv="bdui.worker.done-range",jf=Dp,Bf="worker:queue",Uf="ui:order",Wf="ui:display-policy",zf="exec:presets",fr="tab:board:closed",Hf="beads-ui.board.closed-range";function Xv(e){if(!e)return()=>{};function t(r){document.documentElement.style.setProperty("--app-header-h",`${Math.round(r)}px`)}if(t(e.getBoundingClientRect().height),typeof ResizeObserver!="function")return()=>{};let n=new ResizeObserver(r=>{for(let o of r)t(o.contentRect.height+Qv(e))});return n.observe(e),()=>n.disconnect()}function Qv(e){let t=getComputedStyle(e);return[t.paddingTop,t.paddingBottom,t.borderTopWidth,t.borderBottomWidth].reduce((r,o)=>r+(parseFloat(o)||0),0)}function Zv(e){let t=Ot("main");t("bootstrap start"),Xv(document.querySelector(".app-header"));let n=c`
    <section id="board-root" class="route board"></section>
    <section id="worker-root" class="route worker" hidden></section>
    <section id="monitor-root" class="route monitor" hidden></section>
    <section id="detail-panel" class="route detail" hidden></section>
  `;rt(n,e);let r=document.getElementById("global-nav"),o=document.getElementById("top-nav"),s=document.getElementById("repo-scope"),i=document.getElementById("usage-meter"),l=document.getElementById("board-root"),a=document.getElementById("worker-root"),u=document.getElementById("monitor-root"),d=document.getElementById("detail-panel");if(i&&nf(i),l&&a&&u&&d){let Re=function(x,A){let Ie="Request failed",qe="";if(x&&typeof x=="object"){let v=x;if(typeof v.message=="string"&&v.message.length>0&&(Ie=v.message),typeof v.details=="string")qe=v.details;else if(v.details&&typeof v.details=="object")try{qe=JSON.stringify(v.details,null,2)}catch{qe=""}}else typeof x=="string"&&x.length>0&&(Ie=x);let h=A&&A.length>0?`Failed to load ${A}`:"Request failed";Z.open(h,Ie,qe)},De=function(x){return`${pe.getState().workspace.current?.path||""}\0${x}`},lt=function(){be&&(be().catch(()=>{}),be=null),ce=null,Fe=null},w=function(x){ze=x;let A=()=>{ze!==x||pe.getState().selected_id!==x||(ze=null,Qe(x))};if(!V){Pe.then(A);return}A()},je=function(x,A,Ie,qe,h){return Ie!==Ee[A]?(h().catch(()=>{}),!1):(x.set(qe,h),!0)},dt=function(){let x=pe.getState();ut(x.view==="board"),te(x.view==="worker"),Ze(Ne(x)),_e(x.view==="board"||x.view==="worker"||Xe||!!x.selected_id)},St=function(){let x=vr(xt);return x===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:x}}},mt=function(){let x=vr(Ct);return x===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:x}}},ut=function(x){if(x)for(let[A,Ie]of El){if(H.has(A)||Ce.has(A))continue;let qe=A===fr?St():{type:Ie};try{Oe.register(A,qe)}catch(R){t("register %s store failed: %o",A,R)}Ce.add(A);let h=Ee.board,v=!1;me.subscribeList(A,qe).then(R=>{v=!je(H,"board",h,A,R)}).catch(R=>{t("subscribe %s failed: %o",A,R),Re(R,"board")}).finally(()=>{Ce.delete(A),v&&dt()})}else Je()},Je=function(){Ee.board+=1;for(let[x]of El){let A=H.get(x);A&&(A().catch(()=>{}),H.delete(x));try{Oe.unregister(x)}catch(Ie){t("unregister %s failed: %o",x,Ie)}}},te=function(x){if(!x){ee();return}for(let[A,Ie]of Ff){if(b.has(A)||Ce.has(A))continue;let qe=A===pr?mt():{type:Ie};try{Oe.register(A,qe)}catch(R){t("register %s store failed: %o",A,R)}Ce.add(A);let h=Ee.worker,v=!1;me.subscribeList(A,qe).then(R=>{v=!je(b,"worker",h,A,R)}).catch(R=>{t("subscribe %s failed: %o",A,R),Re(R,"worker")}).finally(()=>{Ce.delete(A),v&&dt()})}},ee=function(){Ee.worker+=1;for(let[x]of Ff){let A=b.get(x);A&&(A().catch(()=>{}),b.delete(x));try{Oe.unregister(x)}catch(Ie){t("unregister %s failed: %o",x,Ie)}}},_e=function(x){if(!x){Ue();return}S||(Te("subscribe-worker-queue",{id:Bf}).catch(A=>{t("subscribe-worker-queue failed: %o",A)}),S=()=>Te("unsubscribe-worker-queue",{id:Bf}))},Ue=function(){S&&(S().catch(()=>{}),S=null)},Ne=function(x){return x.view==="monitor"||x.selected_id!=null},Ze=function(x){if(!x){_t();return}Se||(Te("subscribe-monitor-pipeline",{id:jf}).catch(A=>{t("subscribe-monitor-pipeline failed: %o",A)}),Se=()=>Te("unsubscribe-monitor-pipeline",{id:jf}))},_t=function(){Se&&(Se().catch(()=>{}),Se=null)},ft=function(){Be||(Te("subscribe-ui-order",{id:Uf}).catch(x=>{t("subscribe-ui-order failed: %o",x)}),Be=()=>Te("unsubscribe-ui-order",{id:Uf}))},qt=function(){Be&&(Be().catch(()=>{}),Be=null),I.clear()},Xt=function(){Ft||(Te("subscribe-display-policy",{id:Wf}).catch(x=>{t("subscribe-display-policy failed: %o",x)}),Ft=()=>Te("unsubscribe-display-policy",{id:Wf}))},kt=function(){Ft&&(Ft().catch(()=>{}),Ft=null),oe.clear()},Pt=function(){et||(Te("subscribe-impl-presets",{id:zf}).catch(x=>{t("subscribe-impl-presets failed: %o",x)}),et=()=>Te("unsubscribe-impl-presets",{id:zf}))},Mt=function(x){if(!x)return"Unknown";let A=x.split("/").filter(Boolean);return A.length>0?A[A.length-1]:"Unknown"},K=function(x,A){G.open(x.path,{missing_state:x.missing_state,...A?{workspace:A}:{}})};var f=Re,g=De,m=lt,$=w,O=je,B=dt,Y=St,J=mt,X=ut,F=Je,L=te,M=ee,N=_e,W=Ue,re=Ne,q=Ze,U=_t,Q=ft,ne=qt,we=Xt,ve=kt,le=Pt,D=Mt,$e=K;let Ae=document.getElementById("header-loading"),T=hc(Ae),Z=cp(e),fe=qf(),Te=T.wrapSend((x,A)=>fe.send(x,A)),me=uc(Te),Oe=dc(),it=fc(),Ge=Wl(),I=pc(),oe=Bl(),ie=Ul(),de=zl();fe.on("impl-presets-snapshot",x=>{let A=x;A&&typeof A.revision=="number"&&Array.isArray(A.presets)&&ie.set({revision:A.revision,presets:A.presets})}),fe.on("monitor-pipeline-snapshot",x=>{let A=x;if(!(!A||!Array.isArray(A.workspaces)))try{Ge.set(A.workspaces,A.workspaces_state,A.cross_lanes)}catch{}}),fe.on("ui-order-snapshot",x=>{let A=x;if(A&&typeof A.revision=="number")try{I.set({revision:A.revision,order:A.order&&typeof A.order=="object"?A.order:{}})}catch{}}),fe.on("display-policy-snapshot",x=>{let A=x;if(A&&A.policy&&typeof A.policy=="object")try{oe.set(A.policy)}catch{}}),fe.on("session-log-snapshot",x=>{let A=x;if(A&&typeof A.id=="string")try{de.set(A.id,Array.isArray(A.lines)?A.lines:[],typeof A.last_event_at=="number"?A.last_event_at:null)}catch{}}),fe.on("session-log-append",x=>{let A=x;if(A&&typeof A.id=="string")try{de.append(A.id,A.event)}catch{}}),fe.on("snapshot",x=>{let A=x,Ie=A&&typeof A.id=="string"?A.id:"",qe=Ie?Oe.getStore(Ie):null;if(qe&&A&&A.type==="snapshot")try{qe.applyPush(A)}catch{}}),fe.on("upsert",x=>{let A=x,Ie=A&&typeof A.id=="string"?A.id:"",qe=Ie?Oe.getStore(Ie):null;if(qe&&A&&A.type==="upsert")try{qe.applyPush(A)}catch{}}),fe.on("delete",x=>{let A=x,Ie=A&&typeof A.id=="string"?A.id:"",qe=Ie?Oe.getStore(Ie):null;if(qe&&A&&A.type==="delete")try{qe.applyPush(A)}catch{}});let be=null,ce=null,Fe=null,ze=null,Ve=()=>{},Pe=new Promise(x=>{Ve=()=>x(void 0)}),V=!1,j=!1;async function Qe(x){let A=De(x);if(A===ce||A===Fe)return;Fe=A;let Ie=`detail:${x}`,qe={type:"issue-detail",params:{id:x}};try{Oe.register(Ie,qe)}catch(h){t("register detail store failed: %o",h)}try{let h=await me.subscribeList(Ie,qe);if(pe.getState().selected_id!==x||De(x)!==A){await h().catch(()=>{});return}be&&await be().catch(()=>{}),be=h,ce=A}catch(h){t("detail subscribe failed: %o",h),Re(h,"issue details")}finally{Fe===A&&(Fe=null)}}let H=new Map,Ce=new Set,Ee={board:0,worker:0},Xe=!1,xt=fs;try{let x=window.localStorage.getItem(Hf);Ki(x)&&(xt=x)}catch{}let Ct="today";try{let x=window.localStorage.getItem(Vv);x!==null&&(Ct=Mn(x))}catch{}async function vt(x){if(!Ki(x)||x===xt)return;xt=x;try{window.localStorage.setItem(Hf,x)}catch{}let A=H.get(fr);if(!A)return;H.delete(fr),await A().catch(()=>{});let Ie=St();try{Oe.register(fr,Ie)}catch(qe){t("register %s store failed: %o",fr,qe)}try{let qe=await me.subscribeList(fr,Ie);H.set(fr,qe)}catch(qe){t("re-subscribe %s failed: %o",fr,qe),Re(qe,"board")}}async function Rt(x){let A=Mn(x);if(A===Ct)return;Ct=A;let Ie=b.get(pr);if(!Ie)return;b.delete(pr),await Ie().catch(()=>{});let qe=mt();try{Oe.register(pr,qe)}catch(h){t("register %s store failed: %o",pr,h)}try{let h=await me.subscribeList(pr,qe);b.set(pr,h)}catch(h){t("re-subscribe %s failed: %o",pr,h),Re(h,"worker")}}let b=new Map,S=null,Se=null,Be=null,Ft=null,et=null;async function Qt(){Ft=null,oe.clear(),et=null,ie.clear(),S=null,Se=null,H.clear(),b.clear(),Ee.board+=1,Ee.worker+=1,Pt();let x=pe.getState().workspace.current?.path;if(x)try{await fe.send("set-workspace",{path:x})}catch(Ie){t("workspace restore after reconnect failed: %o",Ie);return}Xt();let A=pe.getState();ut(A.view==="board"),te(A.view==="worker"),Ze(Ne(A)),_e(A.view==="board"||A.view==="worker"||!!A.selected_id)}async function tn(){t("clearing all subscriptions for workspace switch"),Je(),ee(),Ue(),it.clear(),qt(),ft(),kt(),Xt(),lt();let x=pe.getState();if(x.selected_id)try{Oe.unregister(`detail:${x.selected_id}`)}catch{}let A=pe.getState();ut(A.view==="board"),te(A.view==="worker"),Ze(Ne(A)),_e(A.view==="board"||A.view==="worker"||!!A.selected_id),A.selected_id&&w(A.selected_id)}async function zt(x){t("requesting workspace switch to %s",x),j=!0;try{let A=await fe.send("set-workspace",{path:x});t("workspace switch result: %o",A),A&&A.workspace&&(pe.setState({workspace:{current:{path:A.workspace.root_dir,database:A.workspace.db_path}}}),window.localStorage.setItem("beads-ui.workspace",x),A.changed&&(await tn(),ye("Switched to "+Mt(x),"success",2e3)))}catch(A){throw t("workspace switch failed: %o",A),ye("Failed to switch workspace","error",3e3),A}finally{j=!1}}async function jt(x){t("requesting workspace git pull for %s",x);try{let A=await fe.send("git-pull-workspace",{});t("workspace git pull result: %o",A);let Ie=A?.status;if(Ie==="up_to_date"){ye("Already up to date","success",2e3);return}if(Ie==="stash_pop_conflict"){ye("Git pulled, but stash pop conflicted (check git stash list)","warning",4e3);return}ye("Git pulled "+Mt(x),"success",2e3)}catch(A){t("workspace git pull failed: %o",A);let Ie=A?.code,qe=A?.message;if(Ie==="rebase_conflict"){ye("Git pull conflicts \u2014 reverted (manual resolve required)","error",4e3);return}if(Ie==="rebase_conflict_abort_failed"){ye("Git pull conflicts AND rebase --abort failed \u2014 repo left mid-rebase, run 'git rebase --abort' manually","error",6e3);return}if(Ie==="busy"){ye("Git pull skipped: another operation is running","warning",3e3);return}let h=qe?`: ${qe}`:"";throw ye(`Git pull failed${h}`,"error",3e3),A}}async function un(x,A){t("setting workspace visibility %s \u2192 %s",x,String(A));try{await fe.send("set-workspace-visibility",{path:x,visible:A}),await Kt()}catch(Ie){t("workspace visibility update failed: %o",Ie),ye("Failed to update project visibility","error",3e3)}}async function Kt(){try{let x=await fe.send("list-workspaces",{});if(t("workspaces loaded: %o",x),x&&Array.isArray(x.workspaces)){let A=x.workspaces.map(v=>({path:v.path,database:v.database,pid:v.pid,version:v.version})),Ie=x.current?{path:x.current.root_dir,database:x.current.db_path}:null,qe=Array.isArray(x.hidden)?x.hidden.filter(v=>typeof v=="string"):[];pe.setState({workspace:{current:Ie,available:A,hidden:qe}});let h=window.localStorage.getItem("beads-ui.workspace");h&&(!A.some(R=>R.path===h)||qe.includes(h)?window.localStorage.removeItem("beads-ui.workspace"):Ie&&h!==Ie.path&&(t("restoring saved workspace preference: %s",h),await zt(h)))}}catch(x){t("failed to load workspaces: %o",x)}}fe.on("workspace-changed",x=>{t("workspace-changed event: %o",x),x&&x.root_dir&&(pe.setState({workspace:{current:{path:x.root_dir,database:x.db_path}}}),Kt(),tn())});let Bt=!1;if(typeof fe.onConnection=="function"){let x=A=>{t("ws state %s",A),A==="reconnecting"||A==="closed"?(Bt=!0,ye("Connection lost. Reconnecting\u2026","error",4e3)):A==="open"&&Bt&&(Bt=!1,ye("Reconnected","success",2200),Yv(pe,(Ie,qe)=>{t(`${Ie}: %o`,qe)}),Qt())};fe.onConnection(x)}let Zt="board";try{let x=window.localStorage.getItem("beads-ui.view");(x==="board"||x==="worker"||x==="monitor")&&(Zt=x)}catch(x){t("view parse error: %o",x)}let pe=gc({config:Kv(),view:Zt});fe.on("worker-queue-snapshot",x=>{let A=x;if(!A||!A.queue)return;let Ie=pe.getState().workspace.current?.path;if(typeof Ie=="string"&&Ie.length>0&&A.root_dir!==Ie){t("dropping worker-queue snapshot for %s",String(A.root_dir));return}try{it.set(A.queue)}catch{}});let C=_c(pe);C.start();let ge=new Set(["get-comments","dep-add","dep-remove","impl-preset-create","impl-preset-update","impl-preset-delete","apply-impl-preset","apply-impl-preset-global","get-session-defaults","set-session-defaults","monitor-lane-create","monitor-lane-update","monitor-lane-confirm","monitor-lane-remove"]),ue=async(x,A)=>{try{return await Te(x,A)}catch(Ie){if(ge.has(x))throw Ie;return[]}};qp({global_element:r,repo_element:o},pe,C);let y=document.getElementById("workspace-picker");y&&Pf(y,pe,zt,jt,un);let p=Up(e,(x,A)=>Te(x,A));try{let x=document.getElementById("new-issue-btn");x&&x.addEventListener("click",()=>p.open())}catch{}let _=Gp(e,{policyStore:oe,queueStore:it,implPresetStore:ie,transport:(x,A)=>Te(x,A),onOpenChange:x=>{let A=Xe;Xe=x,dt(),A&&x===!1&&xe.refreshSessionDefaults()},labelOptions:()=>{let x=new Set;for(let[A]of El)for(let Ie of Oe.snapshotFor(A)||[]){let qe=Ie.labels;if(Array.isArray(qe))for(let h of qe)typeof h=="string"&&h.length>0&&x.add(h)}return Array.from(x).sort()}});try{let x=document.getElementById("display-settings-btn");x&&(x.setAttribute("aria-label","\uC124\uC815"),x.setAttribute("title","\uC124\uC815"),x.addEventListener("click",()=>_.open()))}catch{}let E=document.createElement("div");E.className="md-viewer-root",document.body.appendChild(E);let G=Si(E,{getWorkspacePath:()=>pe.getState().workspace.current?.path}),se=Ic(l,{gotoIssue:x=>C.gotoIssue(x),issueStores:Oe,transport:ue,workerQueueStore:it,uiOrderStore:I,displayPolicyStore:oe,closedRange:xt,onClosedRangeChange:x=>{vt(x)},onNewIssue:()=>p.open(),openDoc:K}),xe=xl(a,{transport:ue,issueStores:Oe,queueStore:it,sessionLogStore:de,gotoIssue:x=>pe.setState({selected_id:x}),getWorkspacePath:()=>pe.getState().workspace.current?.path,switchWorkspace:x=>zt(x),openDoc:K,doneRange:Ct,onDoneRangeChange:x=>{Rt(x)}}),Ke=Np(u,{transport:ue,pipelineStore:Ge,execPresetStore:ie,sessionLogStore:de,router:C,gotoIssue:x=>C.gotoIssue(x),getWorkspacePath:()=>pe.getState().workspace.current?.path,switchWorkspace:x=>zt(x),openDoc:K}),ot=lp(d,{issueStores:Oe,transport:ue,queueStore:it,execPresetStore:ie,sessionLogStore:de,getWorkspacePath:()=>pe.getState().workspace.current?.path,mdViewer:G,depCandidates:()=>{let x=Ge.get();if(x===null)return null;let A=Ge.getWorkspacesState(),Ie=pe.getState();if(Ie.view==="monitor")return qa(x,A);let qe=Ie.workspace.current?.path;return qe?qa(x,A,{root_dir:qe}):null},subscribeCandidates:x=>Ge.subscribe(x),onDepChanged:({type:x,a:A,b:Ie})=>{let qe=Ke;x==="dep-add"&&qe&&typeof qe.recorrectSharedLane=="function"&&qe.recorrectSharedLane(x,A,Ie)},onNavigate:(x,A)=>{let Ie=()=>{pe.getState().view==="worker"?pe.setState({selected_id:x}):C.gotoIssue(x)},qe=pe.getState().workspace.current?.path;if(typeof A!="string"||A.length===0||!qe||A===qe){Ie();return}Promise.resolve(zt(A)).then(Ie).catch(()=>{ye("\uB808\uD3EC \uC804\uD658\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error",2400)})},onClose:()=>{let x=pe.getState();pe.setState({selected_id:null});try{C.gotoView(x.view==="worker"||x.view==="monitor"?x.view:"board")}catch{}},onOpenExecPresets:()=>{_.open("execution")}}),yt=pe.getState().selected_id;yt&&(d.hidden=!1,ot.load(yt),w(yt)),pe.subscribe(x=>{let A=x.selected_id;A?(d.hidden=!1,ot.load(A),j||w(A)):(ot.clear(),d.hidden=!0,lt())});let gt=x=>{l.hidden=x.view!=="board",a.hidden=x.view!=="worker",u.hidden=x.view!=="monitor",s&&s.classList.toggle("is-quiet",x.view==="monitor"),ut(x.view==="board"),te(x.view==="worker"),Ze(Ne(x)),_e(x.view==="board"||x.view==="worker"||Xe||!!x.selected_id),!x.selected_id&&x.view==="board"&&se.load(),x.view==="worker"&&xe.load(),x.view==="monitor"?Ke.load():Ke.pause(),window.localStorage.setItem("beads-ui.view",x.view)};pe.subscribe(gt),gt(pe.getState()),ft(),Xt(),Pt(),Kt().finally(()=>{V=!0,Ve()}),window.addEventListener("keydown",x=>{let A=x.ctrlKey||x.metaKey,Ie=String(x.key||"").toLowerCase(),qe=x.target,h=qe&&qe.tagName?String(qe.tagName).toLowerCase():"",v=h==="input"||h==="textarea"||h==="select"||qe&&typeof qe.isContentEditable=="boolean"&&qe.isContentEditable;A&&Ie==="n"&&(v||(x.preventDefault(),p.open()))})}}typeof window<"u"&&typeof document<"u"&&window.addEventListener("DOMContentLoaded",()=>{try{let n=window.localStorage.getItem("beads-ui.theme"),r=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches,o=n==="dark"||n==="light"?n:r?"dark":"light";document.documentElement.setAttribute("data-theme",o);let s=document.getElementById("theme-switch");s&&(s.checked=o==="dark")}catch{}let e=document.getElementById("theme-switch");e&&e.addEventListener("change",()=>{let n=e.checked?"dark":"light";document.documentElement.setAttribute("data-theme",n),window.localStorage.setItem("beads-ui.theme",n)});let t=document.getElementById("app");t&&Zv(t)});export{Zv as bootstrap,Kv as readBootstrapConfig,Yv as refreshConfigSnapshot};
//# sourceMappingURL=main.bundle.js.map
