var Mg=Object.create;var nl=Object.defineProperty;var qg=Object.getOwnPropertyDescriptor;var jg=Object.getOwnPropertyNames;var Fg=Object.getPrototypeOf,Bg=Object.prototype.hasOwnProperty;var Ug=(e,t,n)=>t in e?nl(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var rl=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var Wg=(e,t,n,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let s of jg(t))!Bg.call(e,s)&&s!==n&&nl(e,s,{get:()=>t[s],enumerable:!(r=qg(t,s))||r.enumerable});return e};var Hg=(e,t,n)=>(n=e!=null?Mg(Fg(e)):{},Wg(t||!e||!e.__esModule?nl(n,"default",{value:e,enumerable:!0}):n,e));var Yt=(e,t,n)=>Ug(e,typeof t!="symbol"?t+"":t,n);var Ou=rl((l0,Cu)=>{var _s=1e3,ms=_s*60,gs=ms*60,Gr=gs*24,Gg=Gr*7,Vg=Gr*365.25;Cu.exports=function(e,t){t=t||{};var n=typeof e;if(n==="string"&&e.length>0)return Yg(e);if(n==="number"&&isFinite(e))return t.long?Qg(e):Xg(e);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(e))};function Yg(e){if(e=String(e),!(e.length>100)){var t=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(e);if(t){var n=parseFloat(t[1]),r=(t[2]||"ms").toLowerCase();switch(r){case"years":case"year":case"yrs":case"yr":case"y":return n*Vg;case"weeks":case"week":case"w":return n*Gg;case"days":case"day":case"d":return n*Gr;case"hours":case"hour":case"hrs":case"hr":case"h":return n*gs;case"minutes":case"minute":case"mins":case"min":case"m":return n*ms;case"seconds":case"second":case"secs":case"sec":case"s":return n*_s;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return n;default:return}}}}function Xg(e){var t=Math.abs(e);return t>=Gr?Math.round(e/Gr)+"d":t>=gs?Math.round(e/gs)+"h":t>=ms?Math.round(e/ms)+"m":t>=_s?Math.round(e/_s)+"s":e+"ms"}function Qg(e){var t=Math.abs(e);return t>=Gr?di(e,t,Gr,"day"):t>=gs?di(e,t,gs,"hour"):t>=ms?di(e,t,ms,"minute"):t>=_s?di(e,t,_s,"second"):e+" ms"}function di(e,t,n,r){var s=t>=n*1.5;return Math.round(e/n)+" "+r+(s?"s":"")}});var Lu=rl((c0,Iu)=>{function Zg(e){n.debug=n,n.default=n,n.coerce=l,n.disable=o,n.enable=s,n.enabled=a,n.humanize=Ou(),n.destroy=u,Object.keys(e).forEach(d=>{n[d]=e[d]}),n.names=[],n.skips=[],n.formatters={};function t(d){let _=0;for(let m=0;m<d.length;m++)_=(_<<5)-_+d.charCodeAt(m),_|=0;return n.colors[Math.abs(_)%n.colors.length]}n.selectColor=t;function n(d){let _,m=null,h,g;function T(...k){if(!T.enabled)return;let ee=T,ne=Number(new Date),z=ne-(_||ne);ee.diff=z,ee.prev=_,ee.curr=ne,_=ne,k[0]=n.coerce(k[0]),typeof k[0]!="string"&&k.unshift("%O");let N=0;k[0]=k[0].replace(/%([a-zA-Z%])/g,(M,q)=>{if(M==="%%")return"%";N++;let G=n.formatters[q];if(typeof G=="function"){let P=k[N];M=G.call(ee,P),k.splice(N,1),N--}return M}),n.formatArgs.call(ee,k),(ee.log||n.log).apply(ee,k)}return T.namespace=d,T.useColors=n.useColors(),T.color=n.selectColor(d),T.extend=r,T.destroy=n.destroy,Object.defineProperty(T,"enabled",{enumerable:!0,configurable:!1,get:()=>m!==null?m:(h!==n.namespaces&&(h=n.namespaces,g=n.enabled(d)),g),set:k=>{m=k}}),typeof n.init=="function"&&n.init(T),T}function r(d,_){let m=n(this.namespace+(typeof _>"u"?":":_)+d);return m.log=this.log,m}function s(d){n.save(d),n.namespaces=d,n.names=[],n.skips=[];let _=(typeof d=="string"?d:"").trim().replace(/\s+/g,",").split(",").filter(Boolean);for(let m of _)m[0]==="-"?n.skips.push(m.slice(1)):n.names.push(m)}function i(d,_){let m=0,h=0,g=-1,T=0;for(;m<d.length;)if(h<_.length&&(_[h]===d[m]||_[h]==="*"))_[h]==="*"?(g=h,T=m,h++):(m++,h++);else if(g!==-1)h=g+1,T++,m=T;else return!1;for(;h<_.length&&_[h]==="*";)h++;return h===_.length}function o(){let d=[...n.names,...n.skips.map(_=>"-"+_)].join(",");return n.enable(""),d}function a(d){for(let _ of n.skips)if(i(d,_))return!1;for(let _ of n.names)if(i(d,_))return!0;return!1}function l(d){return d instanceof Error?d.stack||d.message:d}function u(){console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")}return n.enable(n.load()),n}Iu.exports=Zg});var Du=rl((Rn,pi)=>{Rn.formatArgs=eh;Rn.save=th;Rn.load=nh;Rn.useColors=Jg;Rn.storage=rh();Rn.destroy=(()=>{let e=!1;return()=>{e||(e=!0,console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."))}})();Rn.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"];function Jg(){if(typeof window<"u"&&window.process&&(window.process.type==="renderer"||window.process.__nwjs))return!0;if(typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))return!1;let e;return typeof document<"u"&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||typeof window<"u"&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||typeof navigator<"u"&&navigator.userAgent&&(e=navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/))&&parseInt(e[1],10)>=31||typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)}function eh(e){if(e[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+e[0]+(this.useColors?"%c ":" ")+"+"+pi.exports.humanize(this.diff),!this.useColors)return;let t="color: "+this.color;e.splice(1,0,t,"color: inherit");let n=0,r=0;e[0].replace(/%[a-zA-Z%]/g,s=>{s!=="%%"&&(n++,s==="%c"&&(r=n))}),e.splice(r,0,t)}Rn.log=console.debug||console.log||(()=>{});function th(e){try{e?Rn.storage.setItem("debug",e):Rn.storage.removeItem("debug")}catch{}}function nh(){let e;try{e=Rn.storage.getItem("debug")||Rn.storage.getItem("DEBUG")}catch{}return!e&&typeof process<"u"&&"env"in process&&(e=process.env.DEBUG),e}function rh(){try{return localStorage}catch{}}pi.exports=Lu()(Rn);var{formatters:sh}=pi.exports;sh.j=function(e){try{return JSON.stringify(e)}catch(t){return"[UnexpectedJSONParseError]: "+t.message}}});var eo=globalThis,ri=eo.trustedTypes,mu=ri?ri.createPolicy("lit-html",{createHTML:e=>e}):void 0,ol="$lit$",cr=`lit$${Math.random().toFixed(9).slice(2)}$`,il="?"+cr,zg=`<${il}>`,Wr=document,to=()=>Wr.createComment(""),no=e=>e===null||typeof e!="object"&&typeof e!="function",al=Array.isArray,ku=e=>al(e)||typeof e?.[Symbol.iterator]=="function",sl=`[ 	
\f\r]`,Js=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,gu=/-->/g,hu=/>/g,Br=RegExp(`>|${sl}(?:([^\\s"'>=/]+)(${sl}*=${sl}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),bu=/'/g,yu=/"/g,wu=/^(?:script|style|textarea|title)$/i,ll=e=>(t,...n)=>({_$litType$:e,strings:t,values:n}),c=ll(1),so=ll(2),t0=ll(3),Nn=Symbol.for("lit-noChange"),en=Symbol.for("lit-nothing"),vu=new WeakMap,Ur=Wr.createTreeWalker(Wr,129);function $u(e,t){if(!al(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return mu!==void 0?mu.createHTML(t):t}var xu=(e,t)=>{let n=e.length-1,r=[],s,i=t===2?"<svg>":t===3?"<math>":"",o=Js;for(let a=0;a<n;a++){let l=e[a],u,d,_=-1,m=0;for(;m<l.length&&(o.lastIndex=m,d=o.exec(l),d!==null);)m=o.lastIndex,o===Js?d[1]==="!--"?o=gu:d[1]!==void 0?o=hu:d[2]!==void 0?(wu.test(d[2])&&(s=RegExp("</"+d[2],"g")),o=Br):d[3]!==void 0&&(o=Br):o===Br?d[0]===">"?(o=s??Js,_=-1):d[1]===void 0?_=-2:(_=o.lastIndex-d[2].length,u=d[1],o=d[3]===void 0?Br:d[3]==='"'?yu:bu):o===yu||o===bu?o=Br:o===gu||o===hu?o=Js:(o=Br,s=void 0);let h=o===Br&&e[a+1].startsWith("/>")?" ":"";i+=o===Js?l+zg:_>=0?(r.push(u),l.slice(0,_)+ol+l.slice(_)+cr+h):l+cr+(_===-2?a:h)}return[$u(e,i+(e[n]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),r]},ro=class e{constructor({strings:t,_$litType$:n},r){let s;this.parts=[];let i=0,o=0,a=t.length-1,l=this.parts,[u,d]=xu(t,n);if(this.el=e.createElement(u,r),Ur.currentNode=this.el.content,n===2||n===3){let _=this.el.content.firstChild;_.replaceWith(..._.childNodes)}for(;(s=Ur.nextNode())!==null&&l.length<a;){if(s.nodeType===1){if(s.hasAttributes())for(let _ of s.getAttributeNames())if(_.endsWith(ol)){let m=d[o++],h=s.getAttribute(_).split(cr),g=/([.?@])?(.*)/.exec(m);l.push({type:1,index:i,name:g[2],strings:h,ctor:g[1]==="."?oi:g[1]==="?"?ii:g[1]==="@"?ai:zr}),s.removeAttribute(_)}else _.startsWith(cr)&&(l.push({type:6,index:i}),s.removeAttribute(_));if(wu.test(s.tagName)){let _=s.textContent.split(cr),m=_.length-1;if(m>0){s.textContent=ri?ri.emptyScript:"";for(let h=0;h<m;h++)s.append(_[h],to()),Ur.nextNode(),l.push({type:2,index:++i});s.append(_[m],to())}}}else if(s.nodeType===8)if(s.data===il)l.push({type:2,index:i});else{let _=-1;for(;(_=s.data.indexOf(cr,_+1))!==-1;)l.push({type:7,index:i}),_+=cr.length-1}i++}}static createElement(t,n){let r=Wr.createElement("template");return r.innerHTML=t,r}};function Hr(e,t,n=e,r){if(t===Nn)return t;let s=r!==void 0?n._$Co?.[r]:n._$Cl,i=no(t)?void 0:t._$litDirective$;return s?.constructor!==i&&(s?._$AO?.(!1),i===void 0?s=void 0:(s=new i(e),s._$AT(e,n,r)),r!==void 0?(n._$Co??(n._$Co=[]))[r]=s:n._$Cl=s),s!==void 0&&(t=Hr(e,s._$AS(e,t.values),s,r)),t}var si=class{constructor(t,n){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=n}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:n},parts:r}=this._$AD,s=(t?.creationScope??Wr).importNode(n,!0);Ur.currentNode=s;let i=Ur.nextNode(),o=0,a=0,l=r[0];for(;l!==void 0;){if(o===l.index){let u;l.type===2?u=new ps(i,i.nextSibling,this,t):l.type===1?u=new l.ctor(i,l.name,l.strings,this,t):l.type===6&&(u=new li(i,this,t)),this._$AV.push(u),l=r[++a]}o!==l?.index&&(i=Ur.nextNode(),o++)}return Ur.currentNode=Wr,s}p(t){let n=0;for(let r of this._$AV)r!==void 0&&(r.strings!==void 0?(r._$AI(t,r,n),n+=r.strings.length-2):r._$AI(t[n])),n++}},ps=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,n,r,s){this.type=2,this._$AH=en,this._$AN=void 0,this._$AA=t,this._$AB=n,this._$AM=r,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,n=this._$AM;return n!==void 0&&t?.nodeType===11&&(t=n.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,n=this){t=Hr(this,t,n),no(t)?t===en||t==null||t===""?(this._$AH!==en&&this._$AR(),this._$AH=en):t!==this._$AH&&t!==Nn&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):ku(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==en&&no(this._$AH)?this._$AA.nextSibling.data=t:this.T(Wr.createTextNode(t)),this._$AH=t}$(t){let{values:n,_$litType$:r}=t,s=typeof r=="number"?this._$AC(t):(r.el===void 0&&(r.el=ro.createElement($u(r.h,r.h[0]),this.options)),r);if(this._$AH?._$AD===s)this._$AH.p(n);else{let i=new si(s,this),o=i.u(this.options);i.p(n),this.T(o),this._$AH=i}}_$AC(t){let n=vu.get(t.strings);return n===void 0&&vu.set(t.strings,n=new ro(t)),n}k(t){al(this._$AH)||(this._$AH=[],this._$AR());let n=this._$AH,r,s=0;for(let i of t)s===n.length?n.push(r=new e(this.O(to()),this.O(to()),this,this.options)):r=n[s],r._$AI(i),s++;s<n.length&&(this._$AR(r&&r._$AB.nextSibling,s),n.length=s)}_$AR(t=this._$AA.nextSibling,n){for(this._$AP?.(!1,!0,n);t!==this._$AB;){let r=t.nextSibling;t.remove(),t=r}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},zr=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,n,r,s,i){this.type=1,this._$AH=en,this._$AN=void 0,this.element=t,this.name=n,this._$AM=s,this.options=i,r.length>2||r[0]!==""||r[1]!==""?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=en}_$AI(t,n=this,r,s){let i=this.strings,o=!1;if(i===void 0)t=Hr(this,t,n,0),o=!no(t)||t!==this._$AH&&t!==Nn,o&&(this._$AH=t);else{let a=t,l,u;for(t=i[0],l=0;l<i.length-1;l++)u=Hr(this,a[r+l],n,l),u===Nn&&(u=this._$AH[l]),o||(o=!no(u)||u!==this._$AH[l]),u===en?t=en:t!==en&&(t+=(u??"")+i[l+1]),this._$AH[l]=u}o&&!s&&this.j(t)}j(t){t===en?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},oi=class extends zr{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===en?void 0:t}},ii=class extends zr{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==en)}},ai=class extends zr{constructor(t,n,r,s,i){super(t,n,r,s,i),this.type=5}_$AI(t,n=this){if((t=Hr(this,t,n,0)??en)===Nn)return;let r=this._$AH,s=t===en&&r!==en||t.capture!==r.capture||t.once!==r.once||t.passive!==r.passive,i=t!==en&&(r===en||s);s&&this.element.removeEventListener(this.name,this,r),i&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},li=class{constructor(t,n,r){this.element=t,this.type=6,this._$AN=void 0,this._$AM=n,this.options=r}get _$AU(){return this._$AM._$AU}_$AI(t){Hr(this,t)}},Au={M:ol,P:cr,A:il,C:1,L:xu,R:si,D:ku,V:Hr,I:ps,H:zr,N:ii,U:ai,B:oi,F:li},Kg=eo.litHtmlPolyfillSupport;Kg?.(ro,ps),(eo.litHtmlVersions??(eo.litHtmlVersions=[])).push("3.3.1");var ct=(e,t,n)=>{let r=n?.renderBefore??t,s=r._$litPart$;if(s===void 0){let i=n?.renderBefore??null;r._$litPart$=s=new ps(t.insertBefore(to(),i),i,void 0,n??{})}return s._$AI(e),s};var ci="today",ui=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"},{value:"30d",label:"\uCD5C\uADFC 30\uC77C"},{value:"all",label:"\uC804\uCCB4"}],fs=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"}];function Xn(e){return e==="today"?"today":"7d"}function cl(e){return e==="today"||e==="7d"||e==="30d"||e==="all"}function Kr(e,t=Date.now()){switch(e){case"today":{let n=new Date(t);return n.setHours(0,0,0,0),n.getTime()}case"7d":return t-7*864e5;case"30d":return t-30*864e5;case"all":default:return}}function Su(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function Eu(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function Tu(){let e=null,t=[],n,r=new Set;function s(){for(let i of Array.from(r))try{i()}catch{}}return{get(){return e},getWorkspacesState(){return t},crossLanes(){return n},set(i,o,a){e=Array.isArray(i)?i:null,t=Array.isArray(o)?o:[],n=a===void 0?void 0:a!==null&&typeof a=="object"&&typeof a.revision=="number"&&Array.isArray(a.lanes)?{revision:a.revision,lanes:a.lanes}:null,s()},clear(){e=null,t=[],n=void 0,s()},subscribe(i){return r.add(i),()=>r.delete(i)}}}function Ru(){let e=new Map,t=new Set;function n(s){return s.startsWith("session-log:")?s:`session-log:${s}`}function r(){for(let s of Array.from(t))try{s()}catch{}}return{set(s,i,o=null){e.set(n(s),{lines:Array.isArray(i)?[...i]:[],last_event_at:typeof o=="number"?o:null}),r()},append(s,i){let o=n(s),a=e.get(o)||{lines:[],last_event_at:null};a.lines=[...a.lines,i],a.last_event_at=Date.now(),e.set(o,a),r()},get(s){return e.get(n(s))||null},clear(s){typeof s=="string"?e.delete(n(s)):e.clear(),r()},subscribe(s){return t.add(s),()=>t.delete(s)}}}var Pu=Hg(Du(),1);function zt(e){return(0,Pu.default)(`beads-ui:${e}`)}function oh(e){let n=Nu((e&&typeof e=="object"?e:{}).spec_id);return n?{path:n,source:"native",conflict:!1}:{path:"",source:"none",conflict:!1}}function Nu(e){return typeof e=="string"?e.trim():""}function ih(e){let t=e&&typeof e=="object"?e:{};return t.metadata&&typeof t.metadata=="object"?t.metadata:{}}var ah=/^[A-Za-z0-9_.:-]+@[0-9a-fA-F]{40}$/;function hs(e){let t=oh(e),n=Nu(ih(e).spec_review),r=ah.test(n),s=r&&n.slice(0,n.indexOf("@"))==="skipped";return t.source==="none"?{...t,evidence:"none",skipped:s}:{...t,evidence:r?"published":"draft",skipped:s}}function Fn(e){if(typeof e=="number")return Number.isFinite(e)?e:0;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:0}return 0}function oo(e,t){let n=Fn(e.created_at),r=Fn(t.created_at);if(n!==r)return n<r?1:-1;let s=e.priority??2,i=t.priority??2;if(s!==i)return s-i;let o=e.id,a=t.id;return o<a?-1:o>a?1:0}function Uu(e,t){let n=Fn(e.created_at),r=Fn(t.created_at);if(n!==r)return n<r?-1:1;let s=e.priority??2,i=t.priority??2;if(s!==i)return s-i;let o=e.id,a=t.id;return o<a?-1:o>a?1:0}function Wu(e,t){let n=Fn(e.updated_at),r=Fn(t.updated_at);if(n!==r)return n<r?1:-1;let s=e.id,i=t.id;return s<i?-1:s>i?1:0}function Hu(e,t){let n=e.priority??2,r=t.priority??2;if(n!==r)return n-r;let s=Fn(e.created_at),i=Fn(t.created_at);if(s!==i)return s<i?1:-1;let o=e.id,a=t.id;return o<a?-1:o>a?1:0}function zu(e,t){let n=e.closed_at??0,r=t.closed_at??0;if(n!==r)return n<r?1:-1;let s=e?.id,i=t?.id;return s<i?-1:s>i?1:0}var fi=Object.freeze({priority:"asc",dependents:"desc",released:"desc",spec:"desc",created:"asc",updated:"desc"});function lh(e){return typeof e=="string"&&Object.prototype.hasOwnProperty.call(fi,e)}function dl(e){if(!e||typeof e!="object")return!1;let t=e;return lh(t.key)&&(t.dir==="asc"||t.dir==="desc")}function Mu(e){if(typeof e=="number")return Number.isFinite(e)?e:null;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:null}return null}function qu(e,t){switch(t){case"priority":{let n=e.priority;return typeof n=="number"&&Number.isFinite(n)?n:null}case"dependents":{let n=e.dependents_info?e.dependents_info.count:null;return typeof n=="number"&&Number.isFinite(n)?n:null}case"released":{let n=e.release_info?e.release_info.last_released_at:null;return typeof n=="number"&&Number.isFinite(n)?n:null}case"spec":return hs(e).evidence==="published"?1:0;case"created":return Mu(e.created_at);case"updated":return Mu(e.updated_at);default:return null}}function ju(e,t,n){let r=qu(e,n.key),s=qu(t,n.key);if(r===null||s===null)return r===s?0:r===null?1:-1;if(r===s)return 0;let i=r<s?-1:1;return n.dir==="desc"?-i:i}function Ku(e){let t=Array.isArray(e)?e.filter(dl):[];return(n,r)=>{for(let a of t){let l=ju(n,r,a);if(l!==0)return l}let s=ju(n,r,{key:"created",dir:"asc"});if(s!==0)return s;let i=n.id,o=r.id;return i<o?-1:i>o?1:0}}var ch=/^(?:[A-Za-z][A-Za-z0-9]*(?:-[A-Za-z0-9]+)+\s+)?(?:Task|Phase|T)\s*(\d+)/i;function Fu(e){let t=e&&e.metadata,n=t?t.task_order:void 0;if(n==null||n==="")return Number.POSITIVE_INFINITY;let r=Number(n);return Number.isFinite(r)?r:Number.POSITIVE_INFINITY}function Bu(e){let t=e&&e.title;if(typeof t!="string")return Number.POSITIVE_INFINITY;let n=ch.exec(t);if(!n)return Number.POSITIVE_INFINITY;let r=Number(n[1]);return Number.isFinite(r)?r:Number.POSITIVE_INFINITY}function Gu(e,t){let n=Fu(e),r=Fu(t);if(n!==r)return n<r?-1:1;let s=Bu(e),i=Bu(t);if(s!==i)return s<i?-1:1;let o=Fn(e&&e.created_at),a=Fn(t&&t.created_at);if(o!==a)return o<a?-1:1;let l=e&&e.id,u=t&&t.id;return l===u?0:String(l)<String(u)?-1:1}var ul=2**20;function bs(e,t){let n=e&&e.id;return t&&typeof n=="string"&&Object.prototype.hasOwnProperty.call(t,n)&&typeof t[n]=="number"&&Number.isFinite(t[n])?t[n]:-Fn(e&&e.created_at)}function Vu(e){return(t,n)=>{let r=bs(t,e),s=bs(n,e);if(r!==s)return r<s?-1:1;let i=t?.id,o=n?.id;return i<o?-1:i>o?1:0}}function pl(e,t,n){let r=Array.isArray(e)?e:[],s=r.length,i=Math.max(0,Math.min(t,s-1)),o=i-1>=0?r[i-1]:null,a=i+1<s?r[i+1]:null;if(!o&&!a)return{rank:0};if(!o)return{rank:bs(a,n)-ul};if(!a)return{rank:bs(o,n)+ul};let l=bs(o,n),u=bs(a,n),d=(l+u)/2;return l<d&&d<u?{rank:d}:{renormalize:r.map((_,m)=>({bead_id:_.id,rank:m*ul}))}}function fl(e,t={}){let n=zt(`issue-store:${e}`),r=new Map,s=[],i=0,o=new Set,a=!1,l=t.sort||oo;function u(){for(let m of Array.from(o))try{m()}catch{}}function d(){s=Array.from(r.values()).sort(l)}function _(m){if(a||!m||m.id!==e)return;let h=Number(m.revision)||0;if(n("apply %s rev=%d",m.type,h),!(h<=i&&m.type!=="snapshot")){if(m.type==="snapshot"){if(h<=i)return;r.clear();let g=Array.isArray(m.issues)?m.issues:[];for(let T of g)T&&typeof T.id=="string"&&T.id.length>0&&r.set(T.id,T);d(),i=h,u();return}if(m.type==="upsert"){let g=m.issue,T=!1;if(g&&typeof g.id=="string"&&g.id.length>0){let k=r.get(g.id);if(!k)r.set(g.id,g),T=!0;else{let ee=Number.isFinite(k.updated_at)?k.updated_at:0,ne=Number.isFinite(g.updated_at)?g.updated_at:0;if(ee<=ne){for(let z of Object.keys(k))z in g||delete k[z];for(let[z,N]of Object.entries(g))k[z]=N;T=!0}}}i=h,T&&(d(),u())}else if(m.type==="delete"){let g=String(m.issue_id||""),T=g?r.delete(g):!1;i=h,T&&(d(),u())}}}return{id:e,subscribe(m){return o.add(m),()=>{o.delete(m)}},applyPush:_,snapshot(){return s},size(){return r.size},getById(m){return r.get(m)},dispose(){a=!0,r.clear(),s=[],o.clear(),i=0}}}function _i(e){let t=String(e.type||"").trim(),n={};if(e.params&&typeof e.params=="object"){let s=Object.keys(e.params).sort();for(let i of s){let o=e.params[i];n[i]=String(o)}}let r=new URLSearchParams(n).toString();return r.length>0?`${t}?${r}`:t}function Yu(e){let t=zt("subs"),n=new Map,r=new Map;function s(a,l){t("applyDelta %s +%d ~%d -%d",a,(l.added||[]).length,(l.updated||[]).length,(l.removed||[]).length);let u=r.get(a);if(!u||u.size===0)return;let d=Array.isArray(l.added)?l.added:[],_=Array.isArray(l.updated)?l.updated:[],m=Array.isArray(l.removed)?l.removed:[];for(let h of Array.from(u)){let g=n.get(h);if(!g)continue;let T=g.itemsById;for(let k of d)typeof k=="string"&&k.length>0&&T.set(k,!0);for(let k of _)typeof k=="string"&&k.length>0&&T.set(k,!0);for(let k of m)typeof k=="string"&&k.length>0&&T.delete(k)}}async function i(a,l){let u=_i(l);if(t("subscribe %s key=%s",a,u),!n.has(a))n.set(a,{key:u,itemsById:new Map});else{let _=n.get(a);if(_&&_.key!==u){let m=r.get(_.key);m&&(m.delete(a),m.size===0&&r.delete(_.key)),n.set(a,{key:u,itemsById:new Map})}}r.has(u)||r.set(u,new Set);let d=r.get(u);d&&d.add(a);try{await e("subscribe-list",{id:a,type:l.type,params:l.params})}catch(_){let m=n.get(a)||null;if(m){let h=r.get(m.key);h&&(h.delete(a),h.size===0&&r.delete(m.key))}throw n.delete(a),_}return async()=>{t("unsubscribe %s key=%s",a,u);try{await e("unsubscribe-list",{id:a})}catch{}let _=n.get(a)||null;if(_){let m=r.get(_.key);m&&(m.delete(a),m.size===0&&r.delete(_.key))}n.delete(a)}}return{subscribeList:i,_applyDelta:s,_subKeyOf:_i,selectors:{getIds(a){let l=n.get(a);return l?Array.from(l.itemsById.keys()):[]},has(a,l){let u=n.get(a);return u?u.itemsById.has(l):!1},count(a){let l=n.get(a);return l?l.itemsById.size:0},getItemsById(a){let l=n.get(a),u={};if(!l)return u;for(let d of l.itemsById.keys())u[d]=!0;return u}}}}function Xu(){let e=zt("issue-stores"),t=new Map,n=new Map,r=new Set,s=new Map;function i(l){for(let u of Array.from(r))try{u(l)}catch{}}function o(l,u,d){let _=u?_i(u):"",m=n.get(l)||"",h=t.has(l);if(e("register %s key=%s (prev=%s)",l,_,m),h&&m&&_&&m!==_){let g=t.get(l);if(g)try{g.dispose()}catch{}let T=s.get(l);if(T){try{T()}catch{}s.delete(l)}let k=fl(l,d);t.set(l,k);let ee=k.subscribe(()=>i(l));s.set(l,ee)}else if(!h){let g=fl(l,d);t.set(l,g);let T=g.subscribe(()=>i(l));s.set(l,T)}return n.set(l,_),()=>a(l)}function a(l){e("unregister %s",l),n.delete(l);let u=t.get(l);u&&(u.dispose(),t.delete(l));let d=s.get(l);if(d){try{d()}catch{}s.delete(l)}}return{register:o,unregister:a,getStore(l){return t.get(l)||null},snapshotFor(l){let u=t.get(l);return u?u.snapshot().slice():[]},subscribe(l){return r.add(l),()=>r.delete(l)}}}function Qu(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function Zu(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function _l(e,t){return`#/${e==="worker"||e==="monitor"||e==="compare"||e==="adr"?e:"board"}?issue=${encodeURIComponent(t)}`}function uh(e){let t=String(e||""),n=t.startsWith("#")?t.slice(1):t,r=n.indexOf("?"),s=r>=0?n.slice(r+1):"";if(s){let a=new URLSearchParams(s).get("issue");if(a)return decodeURIComponent(a)}let i=/^\/issue\/([^\s?#]+)/.exec(n);return i&&i[1]?decodeURIComponent(i[1]):null}function dh(e){let t=String(e||"");return/^#\/worker(\b|\/|$)/.test(t)?"worker":/^#\/monitor(\b|\/|$)/.test(t)?"monitor":/^#\/compare(\b|\/|$)/.test(t)?"compare":/^#\/adr(\b|\/|$)/.test(t)?"adr":"board"}function Ju(e){let t=zt("router"),n=()=>{let r=window.location.hash||"",s=/^#\/issue\/([^\s?#]+)/.exec(r),i=s&&s[1]?decodeURIComponent(s[1]):uh(r),o=dh(r);if(t("hash change \u2192 view=%s id=%s",o,i),e.setState({selected_id:o==="worker"?null:i,view:o,worker:{selected_parent_id:o==="worker"?i:null}}),!!s||/^#\/(issues|epics)(\b|\/|\?|$)/.test(r)){let l=i?`#/${o}?issue=${encodeURIComponent(i)}`:`#/${o}`;window.location.hash!==l&&(window.location.hash=l)}};return{start(){window.addEventListener("hashchange",n),n()},stop(){window.removeEventListener("hashchange",n)},gotoIssue(r){let s=e.getState?e.getState():{view:"board"},i=s.view==="worker"||s.view==="monitor"||s.view==="compare"||s.view==="adr"?s.view:"board",o=_l(i,r);t("goto issue %s (view=%s)",r,i),window.location.hash!==o?window.location.hash=o:e.setState({selected_id:i==="worker"?null:r,view:i,worker:{selected_parent_id:i==="worker"?r:null}})},gotoView(r){let s=e.getState?e.getState():{selected_id:null,worker:{selected_parent_id:null}},i=r==="worker"?s.worker?.selected_parent_id:s.selected_id,o=i?_l(r,i):`#/${r}`;t("goto view %s (id=%s)",r,i||""),window.location.hash!==o?window.location.hash=o:e.setState({view:r,selected_id:r==="worker"?null:s.selected_id})}}}var ph=Object.freeze({workspace_config:{default_workspace:null}});function ed(e){return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:ph.workspace_config.default_workspace}}}function td(e={}){let t=zt("state"),n={selected_id:e.selected_id??null,view:e.view??"board",filters:{status:e.filters?.status??"all",search:e.filters?.search??"",type:typeof e.filters?.type=="string"?e.filters?.type:""},board:{closed_filter:e.board?.closed_filter==="3"||e.board?.closed_filter==="7"||e.board?.closed_filter==="today"?e.board?.closed_filter:"today"},worker:{selected_parent_id:e.worker?.selected_parent_id??null,show_closed_children:Array.isArray(e.worker?.show_closed_children)?e.worker.show_closed_children:[]},workspace:{current:e.workspace?.current??null,available:e.workspace?.available??[],hidden:e.workspace?.hidden??[]},config:ed(e.config)},r=new Set;function s(){for(let i of Array.from(r))try{i(n)}catch{}}return{getState(){return n},setState(i){let o={...n,...i,filters:{...n.filters,...i.filters||{}},board:{...n.board,...i.board||{}},worker:{...n.worker,...i.worker||{}},workspace:{current:i.workspace?.current!==void 0?i.workspace.current:n.workspace.current,available:i.workspace?.available!==void 0?i.workspace.available:n.workspace.available,hidden:i.workspace?.hidden!==void 0?i.workspace.hidden:n.workspace.hidden},config:i.config!==void 0?ed(i.config):n.config},a=o.workspace.current?.path!==n.workspace.current?.path||o.workspace.available.length!==n.workspace.available.length||o.workspace.hidden.length!==n.workspace.hidden.length||o.workspace.hidden.some((u,d)=>u!==n.workspace.hidden[d]),l=o.config.workspace_config.default_workspace!==n.config.workspace_config.default_workspace;o.selected_id===n.selected_id&&o.view===n.view&&o.filters.status===n.filters.status&&o.filters.search===n.filters.search&&o.filters.type===n.filters.type&&o.board.closed_filter===n.board.closed_filter&&o.worker.selected_parent_id===n.worker.selected_parent_id&&o.worker.show_closed_children.length===n.worker.show_closed_children.length&&o.worker.show_closed_children.every((u,d)=>u===n.worker.show_closed_children[d])&&!a&&!l||(n=o,t("state change %o",{selected_id:n.selected_id,view:n.view,filters:n.filters,board:n.board,worker:n.worker,workspace:n.workspace.current?.path,config:{default_workspace:n.config.workspace_config.default_workspace}}),s())},subscribe(i){return r.add(i),()=>r.delete(i)}}}function nd(e){let t=zt("activity"),n=0,r=new Map,s=1;function i(){if(!e)return;let u=n>0;e.toggleAttribute("hidden",!u),e.setAttribute("aria-busy",u?"true":"false")}function o(){n+=1,t("start count=%d",n),i()}function a(){let u=n;n=Math.max(0,n-1),u<=0?t("done called but count was already %d",u):t("done count=%d\u2192%d",u,n),i()}function l(u){return async(_,m)=>{let h=s++,g=Date.now();r.set(h,{type:_,start_ts:g}),t("request start id=%d type=%s count=%d",h,_,n+1),o();let T=!1,k=()=>{T||(T=!0,r.delete(h),a())},ee=setTimeout(()=>{T||(t("request TIMEOUT id=%d type=%s elapsed=%dms",h,_,Date.now()-g),k())},3e4);try{let ne=await u(_,m),z=Date.now()-g;return t("request done id=%d type=%s elapsed=%dms",h,_,z),ne}catch(ne){let z=Date.now()-g;throw t("request error id=%d type=%s elapsed=%dms err=%o",h,_,z,ne),ne}finally{clearTimeout(ee),k()}}}return i(),{wrapSend:l,start:o,done:a,getCount:()=>n,getActiveRequests:()=>{let u=Date.now();return Array.from(r.entries()).map(([d,_])=>({id:d,type:_.type,elapsed_ms:u-_.start_ts}))}}}function be(e,t="info",n=2800){let r=document.createElement("div");r.className="toast",r.textContent=e,r.style.position="fixed",r.style.right="12px",r.style.bottom="12px",r.style.zIndex="1000",r.style.color="#fff",r.style.padding="8px 10px",r.style.borderRadius="4px",r.style.fontSize="12px",t==="success"?r.style.background="#156d36":t==="warning"?r.style.background="#a36a00":t==="error"?r.style.background="#9f2011":r.style.background="rgba(0,0,0,0.85)",(document.body||document.documentElement).appendChild(r),setTimeout(()=>{try{r.remove()}catch{}},n)}var bl="adr:snapshot",ml=["missing","retired"],gl=["adr_missing","supersede_unapplied"],hl="token_missing",mi="section_missing",gi="usage",od=["adr_status"],fh=[...gl,hl,mi,gi,...od];function rd(e,t){return t.includes(e)?e:"\uAE30\uD0C0"}function _h(e){return typeof e=="string"&&e.startsWith("docs/")}function mh(e){return new Date(e).toTimeString().slice(0,8)}function gh(e){let t=e.citations_stale||[],n=e.candidates||[],r=[];for(let u of n)for(let d of u.errors||[])r.push(d);let s=t.filter(u=>ml.includes(u.kind)),i=r.filter(u=>gl.includes(u.kind)),o=r.filter(u=>u.kind===hl),a=r.filter(u=>u.kind===mi),l=[...t.filter(u=>!ml.includes(u.kind)),...r.filter(u=>od.includes(u.kind)||!gl.includes(u.kind)&&u.kind!==hl&&u.kind!==mi&&u.kind!==gi)];return{current:(e.current||[]).length,drift:!!(e.index_drift&&e.index_drift.ok===!1),citation_stale:s.length,unresolved:i.length,token_missing:o.length,pending:a.length,other:l.length,cross:(e.cross_citations||[]).length}}function hh(e,t,n){let r=[],s=(e.citations_stale||[]).filter(l=>l.kind==="retired"&&l.adr===t.id);s.length>0&&r.push({key:"cite",text:`\uC778\uC6A9 stale ${s.length}`});let i=0;for(let l of e.candidates||[])for(let u of l.errors||[])u.adr===t.id&&(i+=1);i>0&&r.push({key:"cand",text:`\uD6C4\uBCF4 ${i}`}),(e.frontmatter_errors||[]).filter(l=>l.file===t.file).length>0&&r.push({key:"fm",text:"frontmatter \uC624\uB958"});let a=0;for(let l of n)if(l.root_dir!==e.root_dir)for(let u of l.cross_citations||[])u.adr===t.id&&u.target?.root_dir===e.root_dir&&(a+=1);return a>0&&r.push({key:"cross",text:`\uD53C\uC778\uC6A9 ${a}`}),r}function sd(e,t){return t?[String(e.id),e.title||"",e.summary||"",e.spec||"",e.bead||""].join(`
`).toLowerCase().includes(t):!0}function bh(e){return e?{tone:e.status==="accepted"?"ok":"warn",text:e.status}:{tone:"unknown",text:"\uBBF8\uD655\uC778"}}function id(e,t={}){let n=zt("views:adr"),r=t.adrStore,s=t.gotoIssue,i=t.getWorkspacePath,o=t.switchWorkspace,a=t.openDoc,l={repo:"",query:"",stale_first:!0},u=null;function d(){let P=r?r.get():null;return P&&Array.isArray(P.workspaces)?P.workspaces:[]}function _(P,$,O){let C=O||P;return!_h(P)||!a?c`<span class="adr-doc adr-doc--plain">${C}</span>`:c`<button
      type="button"
      class="adr-doc adr-doc--link"
      @click=${()=>a({path:P,missing_state:null},$)}
    >
      ${C}
    </button>`}function m(P,$){return c`<button
      type="button"
      class="adr-bead"
      @click=${async()=>{let O=i?i():void 0;if(o&&$&&$!==O)try{await o($)}catch(C){n("switch workspace failed: %o",C);return}s&&s(P)}}
    >
      ${P}
    </button>`}function h(P,$){let O=l.query.trim().toLowerCase(),C=(P.current||[]).filter(ue=>sd(ue,O));if(C.length===0)return c``;let oe=C.map(ue=>({adr:ue,chips:hh(P,ue,$)}));return oe.sort((ue,me)=>{if(l.stale_first){let V=ue.chips.length>0?1:0,ie=me.chips.length>0?1:0;if(V!==ie)return ie-V}return me.adr.id-ue.adr.id}),c`
      <div class="adr-tablewrap">
        <table class="adr-table adr-table--current">
          <thead>
            <tr>
              <th>번호</th>
              <th>제목</th>
              <th>날짜</th>
              <th>summary</th>
              <th>spec</th>
              <th>bead</th>
              <th>신호</th>
            </tr>
          </thead>
          <tbody>
            ${oe.map(({adr:ue,chips:me})=>c`
                <tr data-adr=${String(ue.id)}>
                  <td class="adr-num">${ue.id}</td>
                  <td>
                    ${_(`docs/adr/${ue.file}`,P.root_dir,ue.title||ue.file)}
                  </td>
                  <td class="adr-date">${ue.date||""}</td>
                  <td class="adr-summary">${ue.summary||""}</td>
                  <td>${ue.spec?_(ue.spec,P.root_dir):c``}</td>
                  <td>
                    ${ue.bead?m(ue.bead,P.root_dir):c``}
                  </td>
                  <td class="adr-signals">
                    ${me.map(V=>c`<span class="adr-chip adr-chip--signal"
                          >${V.text}</span
                        >`)}
                  </td>
                </tr>
              `)}
          </tbody>
        </table>
      </div>
    `}function g(P){let $=l.query.trim().toLowerCase(),O=(P.history||[]).filter(C=>sd(C,$)).slice().sort((C,oe)=>oe.id-C.id);return O.length===0?c``:c`
      <details class="adr-history">
        <summary>이력 ${O.length}</summary>
        <div class="adr-tablewrap">
          <table class="adr-table adr-table--history">
            <tbody>
              ${O.map(C=>c`
                  <tr data-adr=${String(C.id)}>
                    <td class="adr-num">${C.id}</td>
                    <td>${C.title||C.file}</td>
                    <td class="adr-status">${C.status}</td>
                    <td class="adr-superseded">
                      ${C.superseded_by===null||C.superseded_by===void 0?"":`\u2192 ${C.superseded_by}`}
                    </td>
                  </tr>
                `)}
            </tbody>
          </table>
        </div>
      </details>
    `}function T(P){return c`<p class="adr-env">환경 · ${P}</p>`}function k(P){let $=P.env_errors?.index;if($)return c`<section class="adr-sec adr-sec--drift">
        ${T($)}
      </section>`;let O=P.index_drift;return!O||O.ok!==!1?c``:c`<section class="adr-sec adr-sec--drift">
      <h3>인덱스 drift</h3>
      <p class="adr-drift">${O.detail||"\uC778\uB371\uC2A4\uAC00 ADR\uACFC \uC5B4\uAE0B\uB09C\uB2E4"}</p>
    </section>`}function ee(P){let $=P.env_errors?.citations;if($)return c`<section class="adr-sec adr-sec--cite">
        ${T($)}
      </section>`;let O=P.citations_stale||[];return O.length===0?c``:c`<section class="adr-sec adr-sec--cite">
      <h3>지침 인용 stale ${O.length}</h3>
      <ul class="adr-rows">
        ${O.map(C=>c`
            <li class="adr-row">
              ${C.file?_(C.file,P.root_dir,`${C.file}${C.line===null||C.line===void 0?"":`:${C.line}`}`):c``}
              <span class="adr-row__mid"
                >${C.adr===null||C.adr===void 0?"":`ADR ${C.adr}`}</span
              >
              <span class="adr-chip adr-chip--kind"
                >${rd(C.kind,ml)}</span
              >
              <span class="adr-row__detail">${C.detail||""}</span>
            </li>
          `)}
      </ul>
    </section>`}function ne(P){let $=P.env_errors?.candidates;if($)return c`<section class="adr-sec adr-sec--cand">
        ${T($)}
      </section>`;let O=(P.candidates||[]).filter(ue=>(ue.errors||[]).length>0),C=[],oe=[];for(let ue of O){let me=ue.errors||[],V=me.filter(de=>de.kind!==mi&&de.kind!==gi),ie=me.some(de=>de.kind===gi);if(V.length===0&&!ie){oe.push(ue.spec);continue}C.push({spec:ue.spec,errors:V,env:ie})}return C.length===0&&oe.length===0?c``:c`<section class="adr-sec adr-sec--cand">
      <h3>후보 미실체화</h3>
      ${C.map(ue=>c`
          <div class="adr-candspec" data-spec=${ue.spec}>
            <div class="adr-candspec__hd">
              ${_(ue.spec,P.root_dir)}
              ${ue.env?c`<span class="adr-chip adr-chip--env">환경</span>`:c``}
            </div>
            <ul class="adr-rows">
              ${ue.errors.map(me=>c`
                  <li class="adr-row">
                    <span class="adr-chip adr-chip--kind"
                      >${rd(me.kind,fh)}</span
                    >
                    <span class="adr-row__mid"
                      >${me.adr===null||me.adr===void 0?"":`ADR ${me.adr}`}</span
                    >
                    <span class="adr-row__detail">${me.detail||""}</span>
                  </li>
                `)}
            </ul>
          </div>
        `)}
      ${oe.length>0?c`<details class="adr-pending">
            <summary>이행 전 스펙 ${oe.length}</summary>
            <ul class="adr-rows">
              ${oe.map(ue=>c`<li class="adr-row">${_(ue,P.root_dir)}</li>`)}
            </ul>
          </details>`:c``}
    </section>`}function z(P){let $=P.cross_citations||[];return $.length===0?c``:c`<section class="adr-sec adr-sec--cross">
      <h3>교차 인용 ${$.length}</h3>
      <ul class="adr-rows">
        ${$.map(O=>{let C=bh(O.target);return c`
            <li class="adr-row">
              ${_(O.file,P.root_dir,`${O.file}:${O.line}`)}
              <span class="adr-row__mid"
                >→ ADR ${O.repo}/${String(O.adr).padStart(4,"0")}</span
              >
              <span class="adr-chip adr-chip--cross is-${C.tone}"
                >${C.text}</span
              >
            </li>
          `})}
      </ul>
    </section>`}function N(P){let $=gh(P),O=[];return $.current>0&&O.push({key:"current",text:`\uD604\uC7AC \uC720\uD6A8 ${$.current}`}),$.drift&&O.push({key:"drift",text:"\uC778\uB371\uC2A4 drift"}),$.citation_stale>0&&O.push({key:"cite",text:`\uC778\uC6A9 stale ${$.citation_stale}`}),$.unresolved>0&&O.push({key:"cand",text:`\uD6C4\uBCF4 \uBBF8\uC2E4\uCCB4\uD654 ${$.unresolved}`}),$.token_missing>0&&O.push({key:"token",text:`\uD1A0\uD070 \uC5C6\uC74C ${$.token_missing}`}),$.pending>0&&O.push({key:"pending",text:`\uC774\uD589 \uC804 \uC2A4\uD399 ${$.pending}`}),$.other>0&&O.push({key:"other",text:`\uAE30\uD0C0 ${$.other}`}),$.cross>0&&O.push({key:"cross",text:`\uAD50\uCC28 \uC778\uC6A9 ${$.cross}`}),P.computing?O.push({key:"computing",text:"\uACC4\uC0B0 \uC911"}):typeof P.computed_at=="number"&&P.computed_at>0&&O.push({key:"computed",text:`\uAC31\uC2E0 ${mh(P.computed_at)}`}),c`<div class="adr-counts">
      ${O.map(C=>c`<span class="adr-chip adr-chip--count adr-count--${C.key}"
            >${C.text}</span
          >`)}
    </div>`}function D(P,$){let O=P.adr_dir_missing===!0;return c`
      <section class="adr-ws" data-repo=${P.root_dir}>
        <header class="adr-ws__hd">
          <h2>${P.name}</h2>
          ${P.name_duplicate?c`<span class="adr-chip adr-chip--dup">이름 중복</span>`:c``}
        </header>
        ${N(P)} ${h(P,$)} ${g(P)}
        ${O?c``:k(P)}
        ${O?c``:ee(P)}
        ${O?c``:ne(P)}
        ${O?c``:z(P)}
      </section>
    `}function M(P){return c`
      <div class="adr-toolbar">
        <div class="adr-filters" role="group" aria-label="저장소 필터">
          <button
            type="button"
            class="adr-filter"
            aria-pressed=${l.repo===""?"true":"false"}
            @click=${()=>{l.repo="",G()}}
          >
            전체
          </button>
          ${P.map($=>c`
              <button
                type="button"
                class="adr-filter"
                data-repo=${$.root_dir}
                aria-pressed=${l.repo===$.root_dir?"true":"false"}
                @click=${()=>{l.repo=$.root_dir,G()}}
              >
                ${$.name}
              </button>
            `)}
        </div>
        <input
          type="search"
          class="adr-search"
          placeholder="번호·제목·summary·spec·bead"
          aria-label="ADR 검색"
          .value=${l.query}
          @input=${$=>{l.query=$.target.value,G()}}
        />
        <button
          type="button"
          class="adr-sort"
          aria-pressed=${l.stale_first?"true":"false"}
          @click=${()=>{l.stale_first=!l.stale_first,G()}}
        >
          stale 우선
        </button>
      </div>
    `}function q(){let P=d(),$=l.repo?P.filter(O=>O.root_dir===l.repo):P;return c`
      ${M(P)}
      <div class="adr-body">
        ${$.map(O=>D(O,P))}
      </div>
    `}function G(){ct(q(),e)}return G(),r&&typeof r.subscribe=="function"&&(u=r.subscribe(()=>G())),{destroy(){u&&(u(),u=null),ct(c``,e)}}}function ys(e=void 0,t=void 0,n=void 0){let r=n&&Array.isArray(n.client_ids)?new Set(n.client_ids):null;function s(){if(!t||typeof t.get!="function")return null;let a=t.get();return a&&a.order?a.order:{}}function i(a,l,u){let d=e&&e.snapshotFor?e.snapshotFor(a):[];if(l==="closed")return d.sort(zu),d;switch(u){case"created_desc":return d.sort(oo),d;case"created_asc":return d.sort(Uu),d;case"updated_desc":return d.sort(Wu),d;case"priority":return d.sort(Hu),d;case"manual":default:{let _=s();return _?d.sort(Vu(_)):d.sort(oo),d}}}function o(a){let l=[];return e&&typeof e.subscribe=="function"&&l.push(e.subscribe(u=>{r&&!r.has(u)||a()})),t&&typeof t.subscribe=="function"&&l.push(t.subscribe(a)),()=>{for(let u of l)try{u()}catch{}}}return{selectBoardColumn:i,subscribe:o}}function Ar(e){if(!e)return null;if(typeof e=="number")return Number.isFinite(e)?e:null;let t=Date.parse(e);return Number.isFinite(t)?t:null}function nn(e){let t=Ar(e);if(t===null)return"";let n=new Date(t),r=s=>String(s).padStart(2,"0");return`${n.getFullYear()}-${r(n.getMonth()+1)}-${r(n.getDate())} ${r(n.getHours())}:${r(n.getMinutes())}`}function wn(e,t){let n=Ar(e);if(n===null)return"";let s=(typeof t=="number"?t:Date.now())-n;if(s<6e4)return"\uBC29\uAE08";let i=Math.floor(s/6e4);if(i<60)return`${i}\uBD84 \uC804`;let o=Math.floor(s/36e5);if(o<24)return`${o}\uC2DC\uAC04 \uC804`;let a=Math.floor(s/864e5);if(a<7)return`${a}\uC77C \uC804`;let l=Math.floor(a/7);if(a<30)return`${l}\uC8FC \uC804`;let u=Math.floor(a/30);return u<12?`${u}\uAC1C\uC6D4 \uC804`:`${Math.floor(a/365)}\uB144 \uC804`}function ad(e){if(!Array.isArray(e))return null;let t=null,n=-1;for(let r of e){if(!r||r.status!=="in_progress")continue;let s=Ar(r.updated_at)??0;if(t===null||s>n){t=r,n=s;continue}s===n&&String(r.id)<String(t.id)&&(t=r)}return t}function hi(e){let t=e&&e.parent;return typeof t=="string"?t:t&&t.id?String(t.id):""}function bi(e){let t=new Map;for(let r of e)r&&r.id&&!t.has(r.id)&&t.set(r.id,r);let n=new Map;for(let r of t.values()){let s=hi(r);if(!s)continue;let i=n.get(s);i||(i=[],n.set(s,i)),i.push({id:r.id,title:r.title,status:r.status,metadata:r.metadata,workflow:r.workflow,created_at:r.created_at,updated_at:r.updated_at})}return n}function yi(e,t){let n=e.get(t)||[],r=0;for(let i of n)(i.status==="resolved"||i.status==="closed")&&(r+=1);let s=ad(n);return{total:n.length,count:r,current:s,children:n}}function vs(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function yl(e,t){return!t||typeof e!="string"||e.length===0||vs(t.visible_labels).includes(e)?!0:vs(t.hidden_labels).includes(e)?!1:!vs(t.hidden_prefixes).some(n=>n.length>0&&e.startsWith(n))}function ld(e,t){return vs(e).filter(n=>yl(n,t))}function Sr(e,t){let n=e&&e.chips?e.chips[t]:void 0;return typeof n=="boolean"?n:!0}var cd="bench";function ud(e){let t=e&&typeof e=="object"?e.labels:null;return vs(t).includes(cd)}function dd(e){return!!e&&vs(e.visible_labels).includes(cd)}function pd(e){let t=e.transport,n=e.uiOrderStore;function r(o,a){return"renormalize"in o?o.renormalize:[{bead_id:a,rank:o.rank}]}function s(o,a){let l={...o.order};for(let u of a)l[u.bead_id]=u.rank;n&&n.set({revision:o.revision,order:l})}async function i(o,a,l){if(!t||!n)return;let u=n.get()||{revision:0,order:{}},d=r(pl(a,l,u.order),o);s(u,d);let _=await t("ui-order-set",{expected_revision:u.revision,entries:d});if(_&&_.conflict){let m={revision:typeof _.revision=="number"?_.revision:0,order:_.order||{}};n.set(m);let h=r(pl(a,l,m.order),o);s(m,h);let g=await t("ui-order-set",{expected_revision:m.revision,entries:h});g&&g.applied&&n.set({revision:typeof g.revision=="number"?g.revision:0,order:g.order||{}})}else _&&_.applied&&n.set({revision:typeof _.revision=="number"?_.revision:0,order:_.order||{}})}return{applyReorder:i}}function fd(e){if(typeof e!="string")return"";let t=e.indexOf("-");return t>0?e.slice(0,t):""}function Qn(e,t){let n=fd(e),r=fd(t);return n.length===0||r.length===0?!1:n!==r}function yh(e){switch(e){case"in_progress":return"board-card__dot board-card__dot--progress";case"resolved":return"board-card__dot board-card__dot--resolved";case"closed":return"board-card__dot board-card__dot--closed";case"blocked":return"board-card__dot board-card__dot--blocked";default:return"board-card__dot"}}function vh(e,t,n,r,s){return c`<button
    type="button"
    class="board-card__roll-toggle"
    data-roll-parent=${e}
    aria-expanded=${r?"true":"false"}
    @click=${s}
  >
    children ${t}/${n} ${r?"\u25B4":"\u25BE"}
  </button>`}function kh(e,t,n,r){return c`<button
    type="button"
    class="board-card__roll-child"
    data-child-id=${e.id}
    @click=${r?s=>r(s,e.id):void 0}
  >
    <span class=${yh(e.status)}>●</span>
    <span class="board-card__roll-child-ord">${t}</span>
    <span class="board-card__roll-child-title">${e.title||e.id}</span>
    ${n}
  </button>`}function vi(e,t){let n=e.total||0,r=!!t.expanded,s=t.trailing??"",i=typeof t.empty_label=="string"&&t.empty_label.length>0?t.empty_label:null;if(n===0&&i===null)return"";let o=Array.isArray(e.children)?e.children:[],a=n>0?o.slice().sort(Gu):o;return c`
    <div class="board-card__roll">
      <div class="board-card__roll-meta">
        ${n>0?vh(t.parent_id,e.count,n,r,t.onToggle):c`<span class="board-card__roll-none">${i}</span>`}
        ${s}
      </div>
      ${n>0&&e.current?c`<div class="board-card__roll-current">
            └
            <span class="board-card__cur-child"
              >● ${e.current.title||e.current.id}</span
            >
          </div>`:""}
      ${r&&n>0?c`<div class="board-card__roll-list">
            ${a.map((l,u)=>kh(l,u+1,t.childChips?t.childChips(l):null,t.onChildClick))}
          </div>`:""}
    </div>
  `}var wh={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"mrg",close:"mrg"},gd={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"merge",close:"close"},_d={quick_fix:["impl","close"],spec_backed:["spec","impl","pr","merge"],full_plan:["spec","plan","impl","pr","merge"]},$h={review:"\u2713",skip:"\u2298"},Er={none:"\uBBF8\uB3C4\uB2EC",dim:"\uC9C4\uD589 \uC911",stale:"\uC7AC\uAC80\uD1A0 \uD544\uC694",review:"\uAC80\uD1A0 \uC644\uB8CC",skip:"\uAC80\uD1A0 \uC0DD\uB7B5",done:"\uC644\uB8CC"};function xh(e,t,n){if(!(n==="in_progress"||n==="resolved"))return null;for(let s of e){let i=t[s];if(i&&i.fill==="dim"&&i.stale!==!0)return s}return null}function hd(e){let t=e&&e.fill||"none";return t==="none"?Er.none:e&&e.stale===!0?Er.stale:t==="dim"?Er.dim:e&&e.glyph==="review"?Er.review:e&&e.glyph==="skip"?Er.skip:Er.done}var md="\uAC80\uD1A0 \uAE30\uB85D \uBD88\uC644\uC804 \u2014 \uC575\uCEE4 \uBD88\uC77C\uCE58";function Ah(e){let t=!!e&&e.review_state==="incomplete";if(!e||e.fill==="none"||!e.approval_state){let r=hd(e);return t?`${r} \xB7 ${md}`:r}let n=[];return e.glyph==="review"?n.push(Er.review):e.glyph==="skip"&&n.push(Er.skip),t&&n.push(md),e.approval_state==="missing"?n.push("\uC2B9\uC778 \uD544\uC694"):e.approval_state==="stale"?n.push("\uC7AC\uC2B9\uC778 \uD544\uC694"):e.approval_state==="unknown"?n.push("\uC2B9\uC778 \uD655\uC778 \uBD88\uAC00"):n.push("\uC2B9\uC778 \uC644\uB8CC"),n.join(" \xB7 ")}function Sh(e,t,n,r){let s=wh[e]||e,i=t&&t.fill||"none",o=!!t&&t.stale===!0,a=$h[t&&t.glyph||""]||"",l="bar";i==="dim"?l+=` b-${s} dim`:i==="full"&&(l+=` b-${s} full`),o&&(l+=" stale"),n&&(l+=" cur");let u=i==="none"?"lbl":`lbl l-${s} on`,d=n?`color: var(--stage-${s}-on)`:"",_=gd[e]||e,m=r?bd(t):null;if(!m)return c`
      <div class="seg">
        <div class=${l} style=${d}>${a}</div>
        <div class=${u}>${_}</div>
      </div>
    `;let h=`${_} \uBB38\uC11C \uC5F4\uAE30 \xB7 ${m.path}`;return c`
    <button
      type="button"
      class="seg seg--doc"
      aria-label=${h}
      title=${h}
      @click=${g=>{g.preventDefault(),g.stopPropagation(),r(g,m,e)}}
    >
      <div class=${l} style=${d}>${a}</div>
      <div class=${u}>${_}</div>
    </button>
  `}function bd(e){let t=e?e.doc:null;return!t||typeof t.path!="string"||t.path.length===0?null:t}function ki(e,t,n={}){if(!e||!e.stages)return"";let r=n.onOpenDoc,s=_d[e.route]||_d.spec_backed,i=e.stages,o=xh(s,i,String(t||"open")),a=`\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uC9C4\uD589: ${s.map(u=>`${gd[u]||u} ${u==="plan"?Ah(i[u]||{}):hd(i[u]||{})}`).join(" \xB7 ")}`,l=!!r&&s.some(u=>bd(i[u]||{})!==null);return c`
    <div
      class="stp"
      role=${l?"group":"img"}
      aria-label=${a}
    >
      ${s.map(u=>Sh(u,i[u]||{},u===o,r))}
    </div>
  `}function Eh(e){return typeof e!="number"||!Number.isFinite(e)?"":`P${Math.max(0,Math.min(4,e))}`}var yd=2;function vd(e){let t=e.slice(0,yd).join(", "),n=e.length-yd;return`\u26D3 blocked: ${t}${n>0?` +${n}`:""}`}function Th(e,t){if(!t)return[];let n=[],r=Array.isArray(t.blockers)?t.blockers:[],s=[],i=[];for(let o of r)(Qn(e,o)?i:s).push(o);return s.length>0&&n.push(c`<span class="ctl-chip ctl-chip--blocked-dep"
        >${vd(s)}</span
      >`),i.length>0&&n.push(c`<span class="ctl-chip ctl-chip--blocked-foreign"
        >${vd(i)}</span
      >`),n}function Rh(e){if(!e||typeof e!="object")return null;let t=e.awaiting_user;if(typeof t!="string")return null;let n=t.trim();return n.length===0?null:c`<span class="ctl-chip ctl-chip--blocked"
    >${`\u23F8 \uC0AC\uC6A9\uC790 \uB9AC\uBDF0 \uD544\uC694: ${n}`}</span
  >`}function vl(e){return e==="delegated"?"\uC704\uC784":e==="main"?"\uBA54\uC778":null}function wi(e){return e.effort?`${e.actor}:${e.effort}`:e.actor}function ur(e){return`${e.kind}:${wi(e)}@${e.sha}`}function $i(e,t){if(!e)return null;let n=vl(e.kind),r=e.reason,s=e.kind==="delegated"?r===null:typeof r=="string"&&r.trim().length>0&&!/[\r\n]/.test(r);if(!n||!s)return null;let i=vl(t?.kind),o=i!==null&&t?.kind!==e.kind,a=`\uACC4\uD68D \xB7 ${n}${o?` \u2192 ${i}`:""}`,l=`planned_execution ${e.kind}${typeof r=="string"?`:${r}`:""}`,u=t?` \xB7 exec_receipt ${ur(t)}`:"";return{kind:e.kind,label:a,title:`${l}${u}`}}function kd(e,t){let n=$i(e,t);return n?c`<span
        class="ctl-chip ctl-chip--planned"
        data-kind=${n.kind}
        title=${n.title}
        >${n.label}</span
      >`:null}function Ch(e){if(!e)return null;let t=vl(e.kind);return t?c`<span
    class="ctl-chip ctl-chip--exec-receipt"
    title=${`exec_receipt ${ur(e)}`}
    >${`\uC2E4\uD589 \xB7 ${t}`}</span
  >`:null}function Oh(e,t){let n=t.policy||null,r=e.workflow&&e.workflow.chips||{},s=[];if(r.route&&Sr(n,"route")){let a=r.route_source==="derived";s.push(c`<span
        class="ctl-chip ctl-chip--route${a?" is-derived":""}"
        title=${a?"route \uBBF8\uD540 (metadata unset)":"route"}
        >${a?"unset":r.route}</span
      >`)}if(r.fast_track&&Sr(n,"fast_track")&&s.push(c`<span class="ctl-chip ctl-chip--ft">⚡ fast_track</span>`),r.pr&&Sr(n,"pr")){let a=r.pr.number;s.push(c`<span class="ctl-chip ctl-chip--pr"
        >${`PR${a!=null?` #${a}`:""}`}</span
      >`)}let i=kd(r.planned_execution,r.exec_receipt);if(i&&s.push(i),r.exec_receipt){let a=r.exec_receipt;s.push(c`<span
        class="ctl-chip ctl-chip--exec-receipt"
        title=${`exec_receipt ${ur(a)}`}
        >${`exec ${a.kind==="delegated"?wi(a):`main:${a.actor}`} \xB7 ${a.sha.slice(0,7)}`}</span
      >`)}if(r.impl_entry){let a=r.impl_entry;s.push(c`<span
        class="ctl-chip ctl-chip--impl-entry"
        title=${`impl_entry ${a.actor}@${a.sha}`}
        >${`impl ${a.actor} \xB7 ${a.sha.slice(0,7)}`}</span
      >`)}for(let a of ld(e.labels,n))s.push(c`<span class="ctl-chip ctl-chip--label">${a}</span>`);if(e.from_id&&Sr(n,"from")&&s.push(c`<button
        type="button"
        class="ctl-chip ctl-chip--from"
        title=${`\uCD9C\uCC98 ${e.from_id} \uC5F4\uAE30`}
        @click=${a=>{a.stopPropagation(),t.onFromChipClick&&t.onFromChipClick(a,String(e.from_id))}}
      >
        ↩ from ${e.from_id}
      </button>`),Sr(n,"blocked")){let a=Rh(e.metadata);a&&s.push(a),s.push(...Th(e.id,e.blocked_info))}return t.cleanupFailureFor&&t.cleanupFailureFor(e.id)&&Sr(n,"blocked")&&s.push(c`<span class="ctl-chip ctl-chip--cleanup">⚠ 정리 멈춤</span>`),s.length===0?"":c`<div class="board-card__chips">${s}</div>`}function Ih(e){let t=wn(e.created_at),n=wn(e.updated_at);return!t&&!n?"":c`<span class="board-card__times">
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
  </span>`}function Lh(e,t){let n=t.rollupFor?t.rollupFor(e.id):{total:0,count:0,current:null,children:[]};return vi(n,{parent_id:e.id,expanded:t.isExpanded?t.isExpanded(e.id):!0,trailing:Ih(e),empty_label:"children \uC5C6\uC74C",childChips:kl,onToggle:r=>t.onRollupToggle&&t.onRollupToggle(r,e.id),onChildClick:(r,s)=>t.onChildClick&&t.onChildClick(r,s)})}function kl(e){let t=e?.workflow?.chips?.planned_execution,n=e?.workflow?.chips?.exec_receipt;return $i(t,n)?c`<span class="board-card__roll-child-chips">
    ${kd(t,n)}
    ${Ch(n)}
  </span>`:null}function xi(e,t){let n=Eh(e.priority);return c`
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
      ${Oh(e,t)}
      ${e.workflow&&Sr(t.policy||null,"stepper")?ki(e.workflow,e.status,{onOpenDoc:t.onOpenDoc}):""}
      ${Lh(e,t)}
    </article>
  `}function ks(e,t){let n=Array.isArray(e.items)?e.items.length:0,r=e.is_closed===!0;return c`
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
              ${ui.map(i=>c`<option
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
        ${e.items.map(i=>xi(i,t))}
      </div>
    </section>
  `}function wd(e,t,n){return c`
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
          ${e.items.length===0?c`<div class="deferred-popup__empty">Deferred 이슈 없음</div>`:e.items.map(r=>xi(r,t))}
        </div>
      </div>
    </dialog>
  `}var Dh=[{value:"",label:"\uC6B0\uC120\uC21C\uC704"},{value:"0",label:"P0"},{value:"1",label:"P1"},{value:"2",label:"P2"},{value:"3",label:"P3"},{value:"4",label:"P4"}],Ph=[{value:"",label:"\uD0C0\uC785"},{value:"bug",label:"bug"},{value:"feature",label:"feature"},{value:"task",label:"task"},{value:"epic",label:"epic"},{value:"chore",label:"chore"}],Nh=[{value:"created_desc",label:"\uC0DD\uC131 \uCD5C\uC2E0\uC21C"},{value:"created_asc",label:"\uC0DD\uC131 \uC624\uB798\uB41C\uC21C"},{value:"updated_desc",label:"\uC218\uC815 \uCD5C\uC2E0\uC21C"},{value:"priority",label:"\uC6B0\uC120\uC21C\uC704\uC21C"},{value:"manual",label:"\uC218\uB3D9(\uB4DC\uB798\uADF8)"}];function Mh(e,t,n){let r=e.labels.length,s=r>0?`\uB77C\uBCA8 ${r}`:"\uB77C\uBCA8";return c`
    <div class="board-filter__labels">
      <button
        type="button"
        class=${r>0?"board-filter__label-btn is-on":"board-filter__label-btn"}
        aria-haspopup="true"
        aria-expanded=${n.label_menu_open?"true":"false"}
        @click=${t.onLabelMenuToggle}
      >
        ${s} ▾
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
  `}function $d(e,t,n){return c`
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
        ${Dh.map(r=>c`<option
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
        ${Ph.map(r=>c`<option
              value=${r.value}
              ?selected=${e.type===r.value}
            >
              ${r.label}
            </option>`)}
      </select>
      ${Mh(e,t,n)}
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
        ${Nh.map(r=>c`<option
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
  `}var qh=200,jh=["tab:board:ready","tab:board:blocked","tab:board:in-progress","tab:board:resolved","tab:board:deferred","tab:board:closed"],Fh={"ready-col":"open","in-progress-col":"in_progress","resolved-col":"resolved","closed-col":"closed"},Bh=new Set(["blocked-col","ready-col","in-progress-col","resolved-col"]),xd="beads-ui.board.sort",Ad=new Set(["created_desc","created_asc","updated_desc","priority","manual"]);function Uh(){try{let e=window.localStorage.getItem(xd);if(e&&Ad.has(e))return e}catch{}return"created_desc"}function Sd(e,t){let n=zt("views:board"),r=t.gotoIssue,s=t.issueStores,i=t.transport,o=t.uiOrderStore,a=t.displayPolicyStore,l=t.workerQueueStore,u=t.onClosedRangeChange,d=t.onNewIssue,_=t.openDoc,m=t.closedRange||ci,h=s?ys(s,o,{client_ids:jh}):null,g=pd({transport:i,uiOrderStore:o}),T=[],k=[],ee=[],ne=[],z=[],N=[],D=!1,M=0,q=Uh(),G=new Map,P=new Map,$=new Map,O=new Set,C={search:"",priority:"",type:"",labels:[]},oe=!1,ue=null;function me(_e){return String(_e.status||"open")==="open"}function V(_e){return String(_e.status||"open")==="open"}function ie(_e){let xe=C.search.trim().toLowerCase(),Ze=C.priority,yt=C.type,it=C.labels,ut=dd(Y());return _e.filter(bt=>{if(!ut&&ud(bt))return!1;if(xe){let st=String(bt.id||"").toLowerCase(),ze=String(bt.title||"").toLowerCase();if(!st.includes(xe)&&!ze.includes(xe))return!1}if(Ze!==""&&String(bt.priority)!==Ze||yt!==""&&String(bt.issue_type||"")!==yt)return!1;if(it.length>0){let st=Array.isArray(bt.labels)?bt.labels:[];if(!it.some(ze=>st.includes(ze)))return!1}return!0})}function de(){let _e=new Set;for(let xe of[T,k,ee,ne,z,N])for(let Ze of xe){let yt=Array.isArray(Ze.labels)?Ze.labels:[];for(let it of yt)typeof it=="string"&&it.length>0&&_e.add(it)}return Array.from(_e).sort()}function Oe(){return C.search.trim()!==""||C.priority!==""||C.type!==""||C.labels.length>0}function qe(){if(!e.hidden)try{if(h){let _e=h.selectBoardColumn("tab:board:in-progress","in_progress",q),xe=h.selectBoardColumn("tab:board:blocked","blocked",q).filter(V),Ze=new Set(_e.map(K=>K.id)),yt=h.selectBoardColumn("tab:board:ready","ready",q).filter(K=>me(K)&&!Ze.has(K.id)),it=h.selectBoardColumn("tab:board:resolved","resolved",q),ut=h.selectBoardColumn("tab:board:deferred","deferred",q),bt=h.selectBoardColumn("tab:board:closed","closed").slice(0,qh),st=[...xe,...yt,..._e,...it,...bt];Ie(st);let ze=new Set;for(let K of st)K&&K.id&&!hi(K)&&ze.add(K.id);let E=!Oe();T=E?io(xe,ze):xe,k=E?io(yt,ze):yt,ee=E?io(_e,ze):_e,ne=E?io(it,ze):it,z=ut,M=ut.length,N=E?io(bt,ze):bt,G=new Map;for(let K of T)G.set(K.id,"open");for(let K of k)G.set(K.id,"open");for(let K of ee)G.set(K.id,"in_progress");for(let K of ne)G.set(K.id,"resolved");for(let K of z)G.set(K.id,"deferred");for(let K of N)G.set(K.id,"closed");P=new Map;for(let K of T)P.set(K.id,"blocked-col");for(let K of k)P.set(K.id,"ready-col");for(let K of ee)P.set(K.id,"in-progress-col");for(let K of ne)P.set(K.id,"resolved-col");for(let K of N)P.set(K.id,"closed-col")}ot()}catch{T=[],k=[],ee=[],ne=[],z=[],N=[],$=new Map,ot()}}function Ie(_e){$=bi(_e)}function ge(_e){return yi($,_e)}function F(_e){return!O.has(_e)}function ce(_e,xe){_e.preventDefault(),_e.stopPropagation(),O.has(xe)?O.delete(xe):O.add(xe),ot()}function pe(_e,xe){_e.preventDefault(),_e.stopPropagation(),r(xe)}function B(_e,xe){_e.preventDefault(),_e.stopPropagation(),r(xe)}function U(_e,xe){ue||r(xe)}function Re(_e,xe){_e.preventDefault(),_e.stopPropagation(),Wh(xe).then(Ze=>{Ze&&be("\uBCF5\uC0AC\uB428","success",1200)})}function W(_e,xe){ue=xe,_e.dataTransfer&&(_e.dataTransfer.setData("text/plain",xe),_e.dataTransfer.effectAllowed="move"),_e.target.classList.add("board-card--dragging")}function te(_e){_e.target.classList.remove("board-card--dragging"),De(),setTimeout(()=>{ue=null},0)}function J(_e){let xe=String(_e.target.value||"");!xe||xe===m||(m=xe,u&&u(xe),ot())}function Y(){return a?a.get():null}function ke(_e){let xe=l?l.get():null,Ze=xe?xe.cleanup_failed:null;if(!Ze||typeof Ze!="object"||Array.isArray(Ze))return null;let yt=Ze[_e];return!yt||typeof yt!="object"||Array.isArray(yt)?null:yt}let fe={onCardClick:U,onCopyId:Re,onDragStart:W,onDragEnd:te,onClosedRangeChange:J,rollupFor:ge,isExpanded:F,onRollupToggle:ce,onChildClick:pe,onFromChipClick:B,onOpenDoc:_?(_e,xe)=>_(xe):void 0,cleanupFailureFor:ke,get policy(){return Y()}};function Le(_e,xe){ue||(Qe(),r(xe))}function Ne(_e,xe){_e.preventDefault(),_e.stopPropagation(),Qe(),r(xe)}let Je={...fe,onCardClick:Le,onChildClick:Ne,onFromChipClick:Ne,onOpenDoc:_?(_e,xe)=>{Qe(),_(xe)}:void 0,get policy(){return Y()}};function Be(_e){let xe=_e.target,Ze=e.querySelector(".board-filter__labels");xe&&Ze&&Ze.contains(xe)||Te()}function re(_e){_e.key==="Escape"&&Te()}function Q(){oe||(oe=!0,document.addEventListener("mousedown",Be),document.addEventListener("keydown",re),ot())}function Te(){oe&&(oe=!1,document.removeEventListener("mousedown",Be),document.removeEventListener("keydown",re),ot())}function et(_e){_e.key==="Escape"&&Qe()}function dt(){D||(D=!0,document.addEventListener("keydown",et),ot())}function Qe(){D&&(D=!1,document.removeEventListener("keydown",et),ot())}let gt={onClose:Qe,onOverlayClick(_e){_e.target===_e.currentTarget&&Qe()}},Pt={onSearchInput(_e){C.search=String(_e.target.value||""),qe()},onPriorityChange(_e){C.priority=String(_e.target.value||""),qe()},onTypeChange(_e){C.type=String(_e.target.value||""),qe()},onSortChange(_e){let xe=String(_e.target.value||"");if(!(!Ad.has(xe)||xe===q)){q=xe;try{window.localStorage.setItem(xd,xe)}catch{}qe()}},onDeferredToggle(){D?Qe():dt()},onLabelMenuToggle(){oe?Te():Q()},onLabelToggle(_e){let xe=C.labels.indexOf(_e);xe===-1?C.labels.push(_e):C.labels.splice(xe,1),qe()},onLabelClear(){C.labels.length!==0&&(C.labels=[],qe())},onNewIssue(){d&&d()}};function St(){return c`
      <div class="board-view">
        ${$d(C,Pt,{sort_mode:q,deferred_popup_open:D,deferred_count:M,label_options:de(),label_menu_open:oe})}
        <div class="board-root">
          ${ks({title:"Blocked",id:"blocked-col",items:ie(T)},fe)}
          ${ks({title:"Ready",id:"ready-col",items:ie(k)},fe)}
          ${ks({title:"In progress",id:"in-progress-col",items:ie(ee)},fe)}
          ${ks({title:"Resolved",id:"resolved-col",items:ie(ne)},fe)}
          ${ks({title:"Closed",id:"closed-col",items:ie(N),is_closed:!0,closed_range:m},fe)}
        </div>
        ${D?wd({items:ie(z),count:M},Je,gt):""}
      </div>
    `}function ot(){e.hidden||(ct(St(),e),ht())}function ht(){try{let _e=e.querySelector("#deferred-popup");_e&&!_e.open&&(typeof _e.showModal=="function"?_e.showModal():_e.setAttribute("open",""));let xe=Array.from(e.querySelectorAll(".board-column, .deferred-popup__body"));for(let Ze of xe)Array.from(Ze.querySelectorAll(".board-card")).forEach((it,ut)=>{it.tabIndex=ut===0?0:-1})}catch{}}async function Jt(_e,xe){if(!i){be("\uC5F0\uACB0\uB418\uC9C0 \uC54A\uC544 \uC0C1\uD0DC\uB97C \uBCC0\uACBD\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error");return}try{await i("update-status",{id:_e,status:xe}),be("\uC0C1\uD0DC \uBCC0\uACBD\uB428","success",1500)}catch(Ze){n("update-status failed: %o",Ze),be("\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328","error")}}function w(_e){switch(_e){case"blocked-col":return T;case"ready-col":return k;case"in-progress-col":return ee;case"resolved-col":return ne;default:return[]}}function se(_e,xe,Ze){if(!i||!o)return;let yt=w(_e),it=yt.find(E=>E.id===xe);if(!it)return;let ut=yt.filter(E=>E.id!==xe),bt=Ze.closest?Ze.closest(".board-card"):null,st=ut.length;if(bt){let E=bt.getAttribute("data-issue-id");if(E===xe)return;let K=ut.findIndex(X=>X.id===E);K>=0&&(st=K)}let ze=ut.slice();ze.splice(st,0,it),g.applyReorder(xe,ze,st)}function De(){for(let _e of Array.from(e.querySelectorAll(".board-column--drag-over")))_e.classList.remove("board-column--drag-over")}let Se=null;e.addEventListener("dragover",_e=>{_e.preventDefault(),_e.dataTransfer&&(_e.dataTransfer.dropEffect="move");let Ze=_e.target.closest(".board-column");Ze&&Ze!==Se&&(Se&&Se.classList.remove("board-column--drag-over"),Ze.classList.add("board-column--drag-over"),Se=Ze)}),e.addEventListener("dragleave",_e=>{let xe=_e.relatedTarget;(!xe||!e.contains(xe))&&Se&&(Se.classList.remove("board-column--drag-over"),Se=null)}),e.addEventListener("drop",_e=>{_e.preventDefault(),Se&&(Se.classList.remove("board-column--drag-over"),Se=null);let xe=_e.target,Ze=xe.closest(".board-column");if(!Ze)return;let yt=_e.dataTransfer?.getData("text/plain")||"";if(!yt)return;let it=Ze.id,ut=P.get(yt);if(ut&&ut===it){if(Bh.has(it)){if(q!=="manual"){be("\uC218\uB3D9(\uB4DC\uB798\uADF8) \uC815\uB82C \uBAA8\uB4DC\uC5D0\uC11C\uB9CC \uC21C\uC11C\uB97C \uBC14\uAFC0 \uC218 \uC788\uC2B5\uB2C8\uB2E4","warning",2e3);return}se(it,yt,xe)}return}let bt=Fh[it];if(!bt){be("\uC5EC\uAE30\uB85C\uB294 \uC62E\uAE38 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","warning",1500);return}G.get(yt)!==bt&&Jt(yt,bt)}),e.addEventListener("keydown",_e=>{let xe=_e.target;if(!(xe instanceof HTMLElement))return;let Ze=String(xe.tagName||"").toLowerCase();if(Ze==="input"||Ze==="textarea"||Ze==="select"||Ze==="button"||Ze==="a"||xe.isContentEditable===!0)return;let yt=xe.closest(".board-card");if(!yt)return;let it=String(_e.key||"");if(it==="Enter"||it===" "){_e.preventDefault();let ze=yt.getAttribute("data-issue-id");ze&&r(ze);return}if(it!=="ArrowUp"&&it!=="ArrowDown"&&it!=="ArrowLeft"&&it!=="ArrowRight")return;_e.preventDefault();let ut=yt.closest(".board-column");if(!ut)return;let bt=Array.from(ut.querySelectorAll(".board-card")),st=bt.indexOf(yt);if(it==="ArrowDown"&&st<bt.length-1){Me(yt,bt[st+1]);return}if(it==="ArrowUp"&&st>0){Me(yt,bt[st-1]);return}if(it==="ArrowLeft"||it==="ArrowRight"){let ze=Array.from(e.querySelectorAll(".board-column")),E=ze.indexOf(ut),K=it==="ArrowRight"?1:-1,X=E+K;for(;X>=0&&X<ze.length;){let Ee=ze[X].querySelector(".board-card");if(Ee){Me(yt,Ee);return}X+=K}}});function Me(_e,xe){try{_e.tabIndex=-1,xe.tabIndex=0,xe.focus()}catch{}}let We=null;h&&h.subscribe&&(We=h.subscribe(()=>{try{qe()}catch{}}));let tt=null;a&&a.subscribe&&(tt=a.subscribe(()=>{try{qe()}catch{}}));let It=null;return l&&l.subscribe&&(It=l.subscribe(()=>{ot()})),{async load(){n("load"),qe()},clear(){Te(),Qe(),We&&(We(),We=null),tt&&(tt(),tt=null),It&&(It(),It=null),e.replaceChildren(),T=[],k=[],ee=[],ne=[],z=[],N=[],G=new Map,P=new Map}}}function io(e,t){return e.filter(n=>{let r=hi(n);return!(r&&t.has(r))})}async function Wh(e){try{if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")return await navigator.clipboard.writeText(String(e)),!0;let t=document.createElement("textarea");t.value=String(e),t.style.position="fixed",t.style.left="-9999px",document.body.appendChild(t),t.select();let n=!1;try{n=document.execCommand("copy")}finally{t.remove()}return n}catch{return!1}}var Ai=["bug","feature","task","epic","chore"];function Ed(e){switch((e||"").toString().toLowerCase()){case"bug":return"Bug";case"feature":return"Feature";case"task":return"Task";case"epic":return"Epic";case"chore":return"Chore";default:return""}}var Td=[["input_tokens","input"],["output_tokens","output"],["cache_read_input_tokens","cache_read"],["cache_creation_input_tokens","cache_write"]];var ao={usd:null,basis:"none"};function Vr(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function ws(e){return typeof e=="number"&&Number.isFinite(e)}function Hh(e,t){if(!e||typeof t!="string"||t.length===0||!Vr(e.runners))return null;let n=Object.values(e.runners).filter(r=>Vr(r?.models));for(let r of n){let s=r.models[t];if(Vr(s))return Vr(s.price)?s.price:null}for(let r of n)for(let s of Object.values(r.models))if(Vr(s)&&s.id===t)return Vr(s.price)?s.price:null;return null}function Rd(e,t,n){if(!Vr(e))return ao;if(ws(e.total_cost_usd))return{usd:e.total_cost_usd,basis:"reported"};let r=Hh(n,t);if(!r)return ao;if(Td.some(([i])=>ws(e[i]))){let i=0;for(let[o,a]of Td){let l=ws(e[o])?e[o]:0;if(l<=0)continue;let u=r[a];if(!ws(u))return ao;i+=l*u/1e6}return{usd:i,basis:"computed"}}return ws(e.total_tokens)&&ws(r.input)?{usd:e.total_tokens*r.input/1e6,basis:"estimated"}:ao}var wl="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4",zh="\uBD84\uD574 \uC5C6\uC74C \u2014 \uCD1D\uB7C9\uB9CC \uBCF4\uACE0\uB428",Cd="\uBD84\uD574 \uC5C6\uB294 leg",Kh="\uCD1D\uB7C9\uB9CC \uBCF4\uACE0\uB41C leg \uD3EC\uD568 \u2014 \uC785\uB825 \uB2E8\uAC00\uB85C \uCD94\uC815",Gh="API \uD658\uC0B0 \uB2E8\uAC00 \uAE30\uC900",$l={reported:"",computed:"\uACC4\uC0B0",estimated:"\uCD94\uC815",none:"\uB2E8\uAC00 \uC5C6\uC74C"};function Ei(e){if(!e||typeof e.total_cost_usd!="number"||!Number.isFinite(e.total_cost_usd))return null;let t=Zt(e.unpriced_leg_count),n=`$${e.total_cost_usd.toFixed(2)}`;return t>0?`${n} (+${t} leg \uB2E8\uAC00 \uC5C6\uC74C)`:n}function $s(e){let t=Ei(e);if(!t||!e)return[];let n=[t];return e.cost_estimated===!0&&n.push(Kh),n.push(Gh),n}function Zt(e){return typeof e=="number"&&Number.isFinite(e)?e:0}var Jn=["input_tokens","output_tokens","cache_read_input_tokens","cache_creation_input_tokens"],xs=[...Jn,"reasoning_output_tokens"],Vh={codex:["implementation","review-consult"],claude:["subagent"]};function xl(e){return!e||typeof e!="object"?!1:Number.isFinite(e.total_tokens)&&!Jn.some(t=>Number.isFinite(e[t]))}function Yh(e){return!e||typeof e!="object"?!1:xs.some(t=>Number.isFinite(e[t]))}function Al(e){let t=0;for(let n of Jn)t+=Zt(e?.[n]);return t}function Xh(e){return!e||typeof e!="object"?!1:Jn.some(t=>Number.isFinite(e[t]))}function Od(e){return!e||typeof e!="object"?!1:xs.some(t=>Number.isFinite(e[t]))||Number.isFinite(e.total_tokens)}function Qh(e){let t={};for(let n of xs)e&&Number.isFinite(e[n])&&(t[n]=e[n]);return t}function Id(e){let t={};for(let n of xs)Number.isFinite(e[n])&&(t[n]=e[n]);return Number.isFinite(e.total_tokens)&&(t.total_tokens=e.total_tokens),e.replayed===!0&&(t.replayed=!0),typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&(t.total_cost_usd=e.total_cost_usd),t}function Ld(e,t){return xl(t)?Zt(t.total_tokens):e==="codex"?Zt(t.input_tokens)+Zt(t.output_tokens):Al(t)}function Zh(e){return e==="claude"?"Claude":"Codex"}function Jh(e){return`\u03C4 ${Nd(e)}`}function eb(e,t){let n=t.breakdown||{},r=Zt(t.total_only_subtotal);if(xl(n)||r>0&&!Yh(n)){let u=[`\uCD1D ${t.subtotal.toLocaleString("en-US")}`,zh,...$s(t)];return t.replayed&&u.push(wl),u.join(`
`)}let s=[`\uC785\uB825 ${Zt(n.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${Zt(n.output_tokens).toLocaleString("en-US")}`];e==="claude"?s.push(`\uCE90\uC2DC\uC77D\uAE30 ${Zt(n.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${Zt(n.cache_creation_input_tokens).toLocaleString("en-US")}`):(s.push(`\uCE90\uC2DC\uC77D\uAE30 ${Zt(n.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC4F0\uAE30 ${Zt(n.cache_creation_input_tokens).toLocaleString("en-US")}`),Number.isFinite(n.reasoning_output_tokens)&&s.push(`\uCD94\uB860\uCD9C\uB825 ${Zt(n.reasoning_output_tokens).toLocaleString("en-US")}`)),r>0&&s.push(`${Cd} ${r.toLocaleString("en-US")}`);let i=e==="claude"?"\uC785\uB825 + \uCD9C\uB825 + \uCE90\uC2DC\uC77D\uAE30 + \uCE90\uC2DC\uC0DD\uC131":"\uC785\uB825 + \uCD9C\uB825",o=r>0?`${i} + ${Cd}`:i,l=[e==="claude"?`Claude subtotal = ${o}`:`Codex subtotal = ${o}; \uCE90\uC2DC\uC77D\uAE30\xB7\uCE90\uC2DC\uC4F0\uAE30\xB7\uCD94\uB860\uCD9C\uB825\uC740 subtotal\uC5D0 \uD3EC\uD568\uB418\uC9C0 \uC54A\uB294 subset`,`\uCD1D ${t.subtotal.toLocaleString("en-US")}`,s.join(" \xB7 ")];return l.push(...$s(t)),t.replayed&&l.push(wl),l.join(`
`)}function mn(e){let t=[];if(!e||typeof e!="object"||!("providers"in e)||!e.providers)return t;for(let n of["claude","codex"]){let r=e.providers[n];if(!r)continue;let s=Ei(r);t.push({provider:n,label:`${Zh(n)} ${Jh(r.subtotal)}${s?` \xB7 ${s}`:""}`,tooltip:eb(n,r)})}return t}function Ti(e){let t={},n={claude:0,codex:0},r={claude:!1,codex:!1};for(let s of e)if(!(!s||!s.providers))for(let i of["claude","codex"]){let o=s.providers[i];if(!o)continue;let a=t[i];a||(a={subtotal:0,breakdown:{}},t[i]=a),a.subtotal+=o.subtotal,Number.isFinite(o.total_only_subtotal)&&(a.total_only_subtotal=Zt(a.total_only_subtotal)+Zt(o.total_only_subtotal));for(let l of xs)Number.isFinite(o.breakdown[l])&&(a.breakdown[l]=Zt(a.breakdown[l])+Zt(o.breakdown[l]));o.replayed&&(a.replayed=!0),typeof o.total_cost_usd=="number"&&Number.isFinite(o.total_cost_usd)&&(n[i]+=o.total_cost_usd,r[i]=!0,o.cost_estimated===!0&&(a.cost_estimated=!0)),Number.isFinite(o.unpriced_leg_count)&&(a.unpriced_leg_count=Zt(a.unpriced_leg_count)+Zt(o.unpriced_leg_count))}for(let s of["claude","codex"]){let i=t[s];i&&r[s]&&(i.total_cost_usd=n[s])}return Object.keys(t).length===0?null:{providers:t,roles:{}}}function Sl(e,t=null){return!e||typeof e!="object"?null:pr({attempt:{...e,bead_id:"__attempt__"}},"__attempt__",t)}function Dd(e,t){let n=Rd(e.usage,e.model,t);e.price_basis=n.basis,n.usd!==null&&(e.price_usd=n.usd)}function tb(e){if(!e.some(t=>t.price_basis!=="none"))for(let t of e)delete t.price_basis}function nb(e){return e==="codex"?"codex":"claude"}function Zn(){return{subtotal:0,breakdown:Qh(null),total_only:0,legs:[],replayed:!1,cost_usd:0,priced_count:0,unpriced_count:0,estimated:!1}}function Si(e,t){e.subtotal+=t.subtotal,xl(t.usage)&&(e.total_only+=t.subtotal);for(let n of xs)Number.isFinite(t.usage[n])&&(e.breakdown[n]=Zt(e.breakdown[n])+Zt(t.usage[n]));if(e.legs.push(t),t.replayed===!0&&(e.replayed=!0),t.price_basis===void 0||t.price_basis==="none"){e.unpriced_count+=1;return}e.priced_count+=1,e.cost_usd+=Zt(t.price_usd),t.price_basis==="estimated"&&(e.estimated=!0)}function Pd(e,t){let n={subtotal:e.subtotal,breakdown:e.breakdown};return e.priced_count>0&&(n.total_cost_usd=e.cost_usd,e.estimated&&(n.cost_estimated=!0)),e.unpriced_count>0&&(n.unpriced_leg_count=e.unpriced_count),e.total_only>0&&(n.total_only_subtotal=e.total_only),t&&(n.legs=e.legs),e.replayed&&(n.replayed=!0),n}function Nd(e){return e>=1e6?`${(e/1e6).toFixed(1)}M`:e>=1e3?`${(e/1e3).toFixed(1)}k`:String(e)}function As(e){return Xh(e)?`\u03C4 ${Nd(Al(e))}`:null}function dr(e){let t=As(e);if(!t)return null;let n=e?.total_cost_usd;return typeof n=="number"&&Number.isFinite(n)?`${t} \xB7 $${n.toFixed(2)}`:t}function lo(e){if(!e||typeof e!="object")return"";let t=[`\uC785\uB825 ${Zt(e.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${Zt(e.output_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC77D\uAE30 ${Zt(e.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${Zt(e.cache_creation_input_tokens).toLocaleString("en-US")}`];typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&t.push(`$${e.total_cost_usd.toFixed(2)}`);let n=[`\uCD1D ${Al(e).toLocaleString("en-US")}`,t.join(" \xB7 ")];return e.replayed&&n.push(wl),n.join(`
`)}function pr(e,t,n=null){let r={claude:Zn(),codex:Zn()},s={orchestrator:{claude:Zn(),codex:Zn()},implementation:{claude:Zn(),codex:Zn()},"review-consult":{claude:Zn(),codex:Zn()},subagent:{claude:Zn(),codex:Zn()}},i=new Set,o=[];for(let u of Object.values(e||{})){if(!u||u.bead_id!==t)continue;let d=u.usage;if(Od(d)){let m=nb(u.runner),h=Id(d),g={provider:m,role:"orchestrator",attempt_id:String(u.attempt_id||""),usage:h,subtotal:Ld(m,h)};h.replayed===!0&&(g.replayed=!0),typeof u.model=="string"&&(g.model=u.model),typeof u.session_id=="string"&&(g.session_id=u.session_id),Dd(g,n),o.push(g),Si(r[m],g),Si(s.orchestrator[m],g)}let _=Array.isArray(u.usage_legs)?u.usage_legs:[];for(let m of _){let h=m&&m.provider==="claude"?"claude":"codex";if(!m||m.provider!=="codex"&&m.provider!=="claude"||!Vh[h].includes(m.role)||!Od(m.usage))continue;let g=typeof m.receipt_id=="string"&&m.receipt_id.length>0?m.receipt_id:null;if(!g||i.has(g))continue;i.add(g);let T=Id(m.usage),k={provider:h,role:m.role,attempt_id:String(u.attempt_id||""),usage:T,subtotal:Ld(h,T)};k.receipt_id=g,typeof m.agent_type=="string"&&(k.agent_type=m.agent_type),typeof m.agent_id=="string"&&(k.agent_id=m.agent_id),typeof m.model=="string"&&(k.model=m.model),typeof m.effort=="string"&&m.effort.trim().length>0&&(k.effort=m.effort),typeof m.session_id=="string"?k.session_id=m.session_id:typeof m.thread_id=="string"&&(k.session_id=m.thread_id),typeof m.turn_id=="string"&&(k.turn_id=m.turn_id),(typeof m.completed_at=="string"||typeof m.completed_at=="number"&&Number.isFinite(m.completed_at))&&(k.completed_at=m.completed_at),T.replayed===!0&&(k.replayed=!0),Dd(k,n),o.push(k),Si(r[h],k),Si(s[k.role][h],k)}}tb(o);let a={};for(let u of["claude","codex"]){let d=r[u];d.legs.length!==0&&(a[u]=Pd(d,!1))}if(Object.keys(a).length===0)return null;let l={};for(let u of["orchestrator","implementation","review-consult","subagent"]){let d={};for(let _ of["claude","codex"]){let m=s[u][_];m.legs.length>0&&(d[_]={...Pd(m,!0),legs:m.legs})}Object.keys(d).length>0&&(l[u]=d)}return{providers:a,roles:l}}var Md={running:3,paused:2,failed:1};function fr(e){if(!e||typeof e!="object")return!1;let t=e.kind;return t==null||t==="implementation"}function qd(e){let t=Object.values(e||{}),n=new Map;for(let r of t){if(!r||typeof r.bead_id!="string"||r.bead_id.length===0||r.kind!=="review_session"||r.status!=="running")continue;let s=typeof r.started_at=="number"?r.started_at:null,i=n.get(r.bead_id);i&&(i.started_at??0)>(s??0)||n.set(r.bead_id,{attempt:r,origin:r.origin==="click"||r.origin==="auto"?r.origin:null,started_at:s})}return n}function jd(e,t){let n=Object.values(e||{}),r=new Set,s=new Map;for(let o of n)!o||typeof o.bead_id!="string"||(typeof o.resumed_from=="string"&&o.resumed_from.length>0&&r.add(o.resumed_from),fr(o)&&s.set(o.bead_id,o.attempt_id));let i=new Map;for(let o of n){if(!o||typeof o.bead_id!="string"||o.bead_id.length===0||!fr(o))continue;let a=null;if(o.status==="running")a="running";else if(o.status==="paused"&&!r.has(o.attempt_id))a="paused";else if(o.status==="failed"||o.status==="orphaned"){let d=t.get(o.bead_id),_=typeof d=="number"&&d>0&&typeof o.finished_at=="number"&&d>=o.finished_at;s.get(o.bead_id)===o.attempt_id&&!_&&typeof o.dismissed_at!="number"&&(a="failed")}if(!a)continue;let l=typeof o.started_at=="number"?o.started_at:null,u=i.get(o.bead_id);if(u){let d=Md[u.run_state],_=Md[a];if(d>_||d===_&&(u.started_at??0)>(l??0))continue}i.set(o.bead_id,{attempt:o,run_state:a,started_at:l})}return{winners:i,resumed_from_ids:r}}var rb=["workflow_mode","spec_review_model","spec_review_effort","spec_review_speed","plan_review_model","plan_review_effort","plan_review_speed","impl_review_model","impl_review_effort","impl_review_speed","impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed","quick_fix_impl_dispatch","quick_fix_impl_runtime","quick_fix_impl_model","quick_fix_impl_effort","quick_fix_impl_speed","orchestration_model","orchestration_effort","orchestration_speed","quick_fix_orchestration_model","quick_fix_orchestration_effort","quick_fix_orchestration_speed"],Rl=Object.freeze({codex:"Codex \xB7 Sol",astra:"Codex \xB7 Astra"}),Ud=["orchestration_model","orchestration_effort","orchestration_speed"],Wd=["quick_fix_orchestration_model","quick_fix_orchestration_effort","quick_fix_orchestration_speed"],sb=[...Ud,...Wd],Fd={quick_fix_impl_dispatch:"impl_dispatch",quick_fix_impl_runtime:"impl_runtime",quick_fix_impl_model:"impl_model",quick_fix_impl_effort:"impl_effort",quick_fix_impl_speed:"impl_speed",quick_fix_orchestration_model:"orchestration_model",quick_fix_orchestration_effort:"orchestration_effort",quick_fix_orchestration_speed:"orchestration_speed"},Cl={spec_review_effort:"spec_review_model",plan_review_effort:"plan_review_model",impl_review_effort:"impl_review_model"},Bd={spec_review_speed:"spec_review_model",plan_review_speed:"plan_review_model",impl_review_speed:"impl_review_model"},ob=new Set(["native-fixed-posture","unsupported","claude-runner-model-default","catalog-validated","provider-tier-or-runtime-model-default","orchestrator-or-runtime-model-default","actual-effort"]);function ln(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function Mt(e){return typeof e=="string"&&e.length>0?e:null}function Ss(e){return e.startsWith("gpt-")?e.slice(4):e}function Tt(e,t,n,r,s){return{value:e,source:t,display:n,full_value:r,resolution:s}}function Hd(e,t,n){let r=Mt(t[e]);if(r!==null)return{value:r,source:"pin"};let s=Mt(n[e]);return s===null?null:{value:s,source:"global"}}function Tr(e,t,n,r){return Hd(e,t,n)||{value:r,source:"base"}}function El(e,t,n,r){let s=n?.implementation?.model_catalog;if(t&&ln(s?.[t])){let o=Mt(s[t][e]);if(o!==null)return o}if(t&&Array.isArray(s?.[t])&&s[t].includes(e))return e;if(!t&&ln(s)){for(let o of Object.values(s))if(ln(o)){let a=Mt(o[e]);if(a!==null)return a}else if(Array.isArray(o)&&o.includes(e))return e}let i=r?.model_index?.[e];return Mt(r?.runners?.[i]?.models?.[e]?.id)||e}function ib(e,t){return Mt(t?.review?.reviewers?.[e]?.model)||e}function Bn(e,t,n=!1){if(e==="default")return Tt(e,t,`default (\uC77C\uBC18 \xB7 ${t==="pin"?"\uD540":"\uC804\uC5ED \uACE0\uC815"})`,e,"explicit");let r=n?Ss(e):e;return Tt(e,t,r,e,"explicit")}function zd(e,t,n){let r=t?.implementation?.model_catalog?.[e],s=[];ln(r)?s.push(...Object.keys(r)):Array.isArray(r)&&s.push(...r.filter(o=>typeof o=="string"));let i=n?.runners?.[e]?.models;if(ln(i))for(let o of Object.keys(i))s.includes(o)||s.push(o);return s}function ab(e,t){let n=[],r=e?.implementation?.model_catalog;ln(r)&&n.push(...Object.keys(r));let s=t?.runners;if(ln(s))for(let i of Object.keys(s))n.includes(i)||n.push(i);return n}function lb(e,t,n){if(e===null)return{runtime:null,offered:!1};let r=!1;for(let s of ab(t,n)){let i=zd(s,t,n);if(i.length>0&&(r=!0),i.includes(e))return{runtime:s,offered:!0}}return{runtime:null,offered:r}}function Ri(e){return Tt(e.value,e.source,`${e.value} (\uBE44\uD638\uD658)`,e.value,"incompatible")}function Tl(e,t,n){let r=Hd(e,t,n);return r?Bn(r.value,r.source):Tt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable")}function In(e){let t=ln(e.pin)?e.pin:{},n=ln(e.global)?e.global:{},r=ln(e.execution_defaults)?e.execution_defaults:null,s=r?.supported===!0&&ln(r.session)?r.session:null,i=r?.supported===!0&&ln(r.orchestration)?r.orchestration:null,o=ln(e.runner_catalog)?e.runner_catalog:null,a=Mt(n.quick_fix_impl_model),l=lb(a,s,o),u={};if(s){let d=Tr("workflow_mode",t,n,Mt(s.workflow_mode_default));u.workflow_mode=d.source==="base"?Tt(d.value,"base",d.value||"\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",d.value,"default"):Bn(d.value,d.source);for(let z of["spec_review","plan_review","impl_review"]){let N=`${z}_model`,D=Mt(z==="plan_review"?d.value==="fast_track"?s.plan_review?.fast_track_default:s.plan_review?.standard_recommended:s.review?.default),M=Tr(N,t,n,D);if(M.value===null)u[N]=Tt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable");else if(M.value!=="self"&&M.value!=="skip"&&!ln(s.review?.reviewers?.[M.value]))u[N]=Ri(Tt(M.value,M.source,"",null,"explicit"));else{let q=ib(M.value,s);u[N]=Tt(M.value,M.source,Ss(q),q,M.source==="base"?"default":"explicit")}}for(let[z,N]of Object.entries(Cl)){let D=u[N].value;if(D==="self"||D==="skip"){u[z]=Tt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable");continue}let M=Mt(s.review?.reviewers?.[D||""]?.effort),q=Tr(z,t,n,M);u[z]=q.value===null?Tt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"):Tt(q.value,q.source,q.value,q.value,q.source==="base"?"default":"explicit")}for(let[z,N]of Object.entries(Bd)){let D=u[N];if(D.resolution==="incompatible"||D.value==="self"||D.value==="skip"){u[z]=Tt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable");continue}if(D.resolution==="unavailable"){u[z]=Tt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable");continue}let M=Tr(z,t,n,"default");u[z]=M.source==="base"?Tt("default","base","default (\uC77C\uBC18)","default","default"):Bn(M.value,M.source)}let _=ln(s.implementation?.default)?s.implementation.default:{},m=Mt(e.route),h=m!==null&&["quick_fix","spec_backed","full_plan"].includes(m),g=ln(s.implementation?.route_defaults)?s.implementation.route_defaults:{},T=h&&ln(g[m])?g[m]:{},k={},ee=!1;if(m==="quick_fix"){let z=Mt(t.impl_runtime),N=Mt(n.quick_fix_impl_runtime),D=z||N,M=D==="inherit"?Mt(e.controller_runtime):D;ee=a!==null&&l.runtime!==null&&(D===null||M===l.runtime);let q=Mt(t.impl_dispatch),G=Mt(n.quick_fix_impl_dispatch);if(q!==null)u.impl_dispatch=Bn(q,"pin"),k.impl_dispatch="pin";else if(G!==null)u.impl_dispatch=Bn(G,"global"),k.impl_dispatch="quick_fix";else if(ee)u.impl_dispatch=Tt("delegated","global","\uC704\uC784 (\uBAA8\uB378 \uD568\uC758)","delegated","explicit"),k.impl_dispatch="implied";else{let P=Mt(T.dispatch)||Mt(_.dispatch);u.impl_dispatch=P?Tt(P,"base",P,P,"default"):Tt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"),k.impl_dispatch="base"}if(z!==null)u.impl_runtime=Bn(z,"pin"),k.impl_runtime="pin";else if(N!==null)u.impl_runtime=Bn(N,"global"),k.impl_runtime="quick_fix";else if(ee){let P=l.runtime;u.impl_runtime=Tt(P,"global",`${P} (\uC720\uB3C4)`,P,"explicit"),k.impl_runtime="derived"}else{let P=Tr("impl_runtime",{},n,Mt(_.runtime));u.impl_runtime=P.value===null?Tt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"):Tt(P.value,P.source,P.value,P.value,P.source==="base"?"default":"explicit"),k.impl_runtime=P.source}for(let P of["impl_model","impl_effort","impl_speed"]){let $=Mt(t[P]),O=Mt(n[`quick_fix_${P}`]),C;$!==null?(C={value:$,source:"pin"},k[P]="pin"):P==="impl_model"&&ee&&a!==null?(C={value:a,source:"global"},k[P]="quick_fix"):P!=="impl_model"&&O!==null?(C={value:O,source:"global"},k[P]="quick_fix"):(C=Tr(P,{},n,Mt(_[P.replace("impl_","")])),k[P]=C.source),u[P]=C.value===null?Tt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"):Tt(C.value,C.source,C.value,C.value,C.source==="base"?"default":"explicit")}}else for(let z of["impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"]){let N=Tr(z,t,n,z==="impl_dispatch"?Mt(T.dispatch)||Mt(_.dispatch):Mt(_[z.replace("impl_","")]));u[z]=N.value===null?Tt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"):Tt(N.value,N.source,N.value,N.value,N.source==="base"?"default":"explicit")}let ne=u.impl_dispatch.value==="main";if(ne?u.impl_dispatch.display=k.impl_dispatch==="quick_fix"?"\uBA54\uC778 (quick_fix)":"\uBA54\uC778":u.impl_dispatch.value==="delegated"&&(k.impl_dispatch==="quick_fix"?u.impl_dispatch.display="\uC704\uC784 (quick_fix)":k.impl_dispatch!=="implied"&&(u.impl_dispatch.display="\uC704\uC784")),u.impl_runtime.value==="inherit"&&(u.impl_runtime.display=e.controller_runtime?`inherit (${e.controller_runtime})`:"inherit (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_runtime.resolution="dynamic"),u.impl_model.value!==null){let z=u.impl_runtime.value==="inherit"?Mt(e.controller_runtime):u.impl_runtime.value,N=z?zd(z,s,o):[];m==="quick_fix"&&k.impl_model==="base"&&k.impl_runtime!=="base"&&N.length>0&&!N.includes(u.impl_model.value)&&(u.impl_model=Tt("auto","base","auto","auto","default"));let D=u.impl_model.value;if(D!=="auto"&&N.length>0&&!N.includes(D))u.impl_model=Ri(u.impl_model);else{let M=El(D,z,s,o);u.impl_model.display=Ss(M),u.impl_model.full_value=M,k.impl_model==="quick_fix"&&(u.impl_model.display=`${u.impl_model.display} (quick_fix)`)}}if(u.impl_effort.value==="auto"){let z=Mt(e.transport)||(u.impl_runtime.value==="codex"?"codex-native-spawn":u.impl_runtime.value==="claude"?"implement-claude":null),N=z?Mt(s.implementation?.effort_by_transport?.[z]?.auto):null;N&&!ob.has(N)?(u.impl_effort.display=`${N} (\uBE44\uD638\uD658)`,u.impl_effort.full_value=N,u.impl_effort.resolution="incompatible"):(u.impl_effort.display="auto (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_effort.resolution="dynamic")}k.impl_effort==="quick_fix"&&u.impl_effort.value!==null&&(u.impl_effort=Tt(u.impl_effort.value,"global",`${u.impl_effort.value} (quick_fix)`,u.impl_effort.value,"explicit")),u.impl_speed.value==="default"&&(u.impl_speed=k.impl_speed==="quick_fix"?Tt("default","global","default (quick_fix)","default","explicit"):u.impl_speed.source==="base"?Tt("default","base","default (\uC77C\uBC18)","default","default"):Bn("default",u.impl_speed.source));for(let z of["impl_runtime","impl_effort","impl_speed"])k[z]==="quick_fix"&&u[z].value!==null&&!u[z].display.endsWith("(quick_fix)")&&(u[z].display=`${u[z].display} (quick_fix)`);if(m==="quick_fix"){a!==null&&!ee&&l.offered&&(u.quick_fix_impl_model=Ri(Tt(a,"global","",a,"explicit")));for(let[z,N]of Object.entries(Fd))!z.startsWith("quick_fix_orchestration_")&&!Object.hasOwn(u,z)&&(u[z]={...u[N]});u.impl_dispatch.source==="base"&&u.impl_dispatch.value==="main"&&(u.quick_fix_impl_dispatch=Tt("main","base","\uBA54\uC778 (\uD558\uB124\uC2A4)","main","default"))}if(ne)for(let z of["impl_runtime","impl_model","impl_effort","impl_speed"])u[z]=Tt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable")}else for(let d of rb.filter(_=>!sb.includes(_)))u[d]=Tl(d,t,n);if(!s){for(let[d,_]of Object.entries(Cl))(u[_].value==="self"||u[_].value==="skip")&&(u[d]=Tt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable"));for(let[d,_]of Object.entries(Bd))(u[_].value==="self"||u[_].value==="skip")&&(u[d]=Tt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable"));if(u.impl_dispatch.value==="main"){u.impl_dispatch.display="\uBA54\uC778";for(let d of["impl_runtime","impl_model","impl_effort","impl_speed"])u[d]=Tt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable")}else u.impl_dispatch.value==="delegated"&&(u.impl_dispatch.display="\uC704\uC784"),u.impl_runtime.value==="inherit"&&(u.impl_runtime.display=e.controller_runtime?`inherit (${e.controller_runtime})`:"inherit (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_runtime.resolution="dynamic"),u.impl_effort.value==="auto"&&(u.impl_effort.display="auto (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_effort.resolution="dynamic")}for(let d of Ud){if(!i){u[d]=Tl(d,t,n);continue}let _=d.replace("orchestration_",""),m=Mt(i[_]),h=`quick_fix_${d}`,g=e.route==="quick_fix"?Mt(n[h]):null,T=Mt(t[d]),k=T!==null?{value:T,source:"pin"}:g!==null?{value:g,source:"global"}:Tr(d,{},n,m),ee=T===null&&g!==null;if(d==="orchestration_effort"&&k.source==="base"){u[d]=Tt(null,"base","CLI \uAE30\uBCF8 (\uBBF8\uC9C0\uC815)",null,"default");continue}if(k.value===null){u[d]=Tt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable");continue}if(d==="orchestration_model"){let ne=k.source==="base"?Mt(i.model_id)||k.value:El(k.value,null,s,o);u[d]=Tt(k.value,k.source,`${Ss(ne)}${ee?" (quick_fix)":""}`,ne,k.source==="base"?"default":"explicit");continue}if(k.value==="default"){u[d]=ee?Tt("default","global","default (quick_fix)","default","explicit"):k.source==="base"?Tt("default","base","default (\uC77C\uBC18)","default","default"):Bn("default",k.source);continue}u[d]=ee?Tt(k.value,"global",`${k.value} (quick_fix)`,k.value,"explicit"):Bn(k.value,k.source)}for(let d of Wd){let _=Fd[d];u[d]=u[_]?{...u[_]}:Tl(d,t,n)}if(s&&e.route!=="quick_fix")if(a===null){let d=u.orchestration_model.full_value;u.quick_fix_impl_model=Tt(null,"base",d===null?"\uBA54\uC778":`\uBA54\uC778 (orchestration ${Ss(d)})`,null,"default")}else if(l.runtime!==null){let d=El(a,l.runtime,s,o);u.quick_fix_impl_model=Tt(a,"global",Ss(d),d,"explicit")}else l.offered?u.quick_fix_impl_model=Ri(Tt(a,"global","",null,"explicit")):u.quick_fix_impl_model=Bn(a,"global");return u}function cb(e,t){let n=t&&e.value==="default"?"default (\uC77C\uBC18)":e.display;if(!t||e.source==="pin")return`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 ${e.display}`;let r=e.source==="global"?"\uC804\uC5ED":"harness";return`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 ${n} (${r})`}function Ci(e){let t=ln(e.pin)?e.pin:{},n=ln(e.global)?e.global:{},r=ln(e.resolution_global)?{...e.resolution_global}:{};delete r[e.key];let s=_=>{let m={...r,..._};return In({pin:e.layer==="pin"?m:t,global:e.layer==="pin"?n:m,execution_defaults:e.execution_defaults,runner_catalog:e.runner_catalog,route:e.route,controller_runtime:e.controller_runtime})},i=e.layer==="pin"?t:n,o={...i};delete o[e.key];let a=s(o)[e.key],l=s(i)[e.key],u=Mt(i[e.key]),d=[...e.choices];return u!==null&&!d.includes(u)&&d.unshift(u),{unset_label:cb(a,e.layer==="pin"),full_value:a.full_value,unavailable:a.resolution==="unavailable",disabled:l?.resolution==="not_applicable",options:d.map(_=>{let m=s({...i,[e.key]:_})[e.key],h=Object.values(Cl).includes(e.key)&&m.resolution!=="incompatible"&&Object.hasOwn(Rl,_)?Rl[_]:m.display;return{value:_,label:h,full_value:m.full_value}})}}var Oi=["workflow_mode","spec_review_model","spec_review_effort","spec_review_speed","plan_review_model","plan_review_effort","plan_review_speed","impl_review_model","impl_review_effort","impl_review_speed","impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"],ub=["quick_fix_impl_dispatch","quick_fix_impl_runtime","quick_fix_impl_model","quick_fix_impl_effort","quick_fix_impl_speed"],co=[...Oi.filter(e=>e!=="impl_dispatch"),...ub,"base_sync_accept_local_commits","bdui_url"],Kd=["base_sync_accept_local_commits"],uo="true";function Ii(e){let t={};if(!yn(e))return t;for(let[n,r]of Object.entries(e)){if(Kd.includes(n)){r===!0&&(t[n]=uo);continue}typeof r=="string"&&(t[n]=r)}return t}function Gd(e){let t;try{t=new URL(e)}catch{return!1}return(t.protocol==="http:"||t.protocol==="https:")&&e===t.origin}var Un=["orchestration_model","orchestration_effort","orchestration_speed"],Es=["quick_fix_orchestration_model","quick_fix_orchestration_effort","quick_fix_orchestration_speed"],Ol=Object.freeze({orchestration_model:"quick_fix_orchestration_model",orchestration_effort:"quick_fix_orchestration_effort",orchestration_speed:"quick_fix_orchestration_speed",impl_dispatch:"quick_fix_impl_dispatch",impl_runtime:"quick_fix_impl_runtime",impl_model:"quick_fix_impl_model",impl_effort:"quick_fix_impl_effort",impl_speed:"quick_fix_impl_speed"}),Ts=[...Oi,...Un],db=co.filter(e=>Ts.includes(e));function pb(e,t){let n={},r=[];for(let[i,o]of Object.entries(Ol)){let a=e[i];if(!Object.hasOwn(e,i)){n[o]=null;continue}let l=t[o];if(typeof a!="string"||!Array.isArray(l)||!l.includes(a)){n[o]=null,r.push(`lane_incompatible:${o}`);continue}n[o]=a}let s=Object.keys(e).filter(i=>!Object.hasOwn(Ol,i));return{values:n,warnings:r,skipped_keys:s}}var po=["delegated","main"],Li=["inherit","claude","codex"],er=["default","fast"],fo=["standard","fast_track"],_o=["codex","astra","opus","fable","self","skip"],Di=["codex","astra","fable","skip"],Pi=["low","medium","high","xhigh"],Vd=["default","fast"],Cn="auto";function yn(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function Yd(e){if(!yn(e)||!yn(e.runners))return[];let t=[];for(let[n,r]of Object.entries(e.runners))yn(r)&&yn(r.models)&&t.push([n,Object.keys(r.models)]);return t}function Rs(e,t){let n=Yd(e),r=t&&t!=="inherit"?n.filter(([s])=>s===t):n;return[Cn,...r.flatMap(([,s])=>s)]}function Xd(e,t,n,r){if(!yn(e)||!yn(e.runners))return[Cn];let s=[];for(let[i,o]of Object.entries(e.runners))if(!(!yn(o)||!yn(o.models))&&!(t&&t!=="inherit"&&i!==t))for(let[a,l]of Object.entries(o.models)){if(n&&n!==Cn&&a!==n)continue;let u=r(o,l);if(Array.isArray(u))for(let d of u)typeof d=="string"&&!s.includes(d)&&s.push(d)}return[Cn,...s]}function Yr(e,t,n){return Xd(e,t,n,(r,s)=>yn(s)&&Array.isArray(s.efforts)?s.efforts:r.efforts)}function Ni(e,t,n){return Xd(e,t,n,(r,s)=>yn(s)&&Array.isArray(s.orchestration_efforts)?s.orchestration_efforts:yn(s)&&Array.isArray(s.efforts)?s.efforts:r.efforts)}function Cs(e,t){let n=Yd(e);return(t?n.filter(([s])=>s===t):n).flatMap(([,s])=>s)}function Qd(e,t,n){let r={impl_runtime:e?.impl_runtime,impl_model:e?.impl_model,impl_effort:e?.impl_effort},s=r.impl_runtime==="claude"||r.impl_runtime==="codex"?r.impl_runtime:r.impl_runtime==="inherit"?n:null;return s&&(r.impl_model&&!Rs(t,s).includes(r.impl_model)&&(r.impl_model=void 0),r.impl_effort&&!Yr(t,s,r.impl_model||Cn).includes(r.impl_effort)&&(r.impl_effort=void 0)),r}var fb={workflow_mode:"\uC6CC\uD06C\uD50C\uB85C \uBAA8\uB4DC",spec_review_model:"\uC2A4\uD399 \uB9AC\uBDF0\uC5B4",spec_review_effort:"\uC2A4\uD399 \uB9AC\uBDF0 effort",spec_review_speed:"\uC2A4\uD399 \uB9AC\uBDF0 \uC18D\uB3C4",plan_review_model:"\uACC4\uD68D \uB9AC\uBDF0\uC5B4",plan_review_effort:"\uACC4\uD68D \uB9AC\uBDF0 effort",plan_review_speed:"\uACC4\uD68D \uB9AC\uBDF0 \uC18D\uB3C4",impl_review_model:"\uAD6C\uD604 \uB9AC\uBDF0\uC5B4",impl_review_effort:"\uAD6C\uD604 \uB9AC\uBDF0 effort",impl_review_speed:"\uAD6C\uD604 \uB9AC\uBDF0 \uC18D\uB3C4",impl_runtime:"\uC704\uC784 \uB300\uC0C1",impl_model:"\uAD6C\uD604 \uBAA8\uB378",impl_effort:"\uAD6C\uD604 effort",impl_speed:"\uAD6C\uD604 \uC18D\uB3C4",orchestration_model:"\uC6CC\uCEE4 \uBAA8\uB378",orchestration_effort:"\uC6CC\uCEE4 effort",orchestration_speed:"\uC6CC\uCEE4 \uC18D\uB3C4"},_b={quick_fix_orchestration_model:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uBAA8\uB378",quick_fix_orchestration_effort:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 effort",quick_fix_orchestration_speed:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uC18D\uB3C4",quick_fix_impl_dispatch:"\uC2E4\uD589 \uBC29\uC2DD",quick_fix_impl_runtime:"\uC704\uC784 \uB300\uC0C1",quick_fix_impl_model:"\uBAA8\uB378",quick_fix_impl_effort:"effort",quick_fix_impl_speed:"\uC18D\uB3C4"},Il=[...db,...Un],mb=[...Ts,...co].filter((e,t,n)=>n.indexOf(e)===t&&!Il.includes(e));function Zd(e,t){let n=yn(e)?e:{},r=yn(t)?t:{},s=[];for(let o of Il){let a=n[o]??null,l=r[o]??null;a!==l&&s.push({key:o,label:fb[o]||o,before:a,after:l,kind:a===null?"added":l===null?"removed":"changed"})}let i=[];for(let o of[...mb,...Object.keys(r)])!Il.includes(o)&&!i.includes(o)&&Object.hasOwn(r,o)&&i.push(o);return{rows:s,ignored_keys:i}}function Jd(e,t,n){let r=yn(e)?e:{},s=pb(yn(t)?t:{},n),i=[];for(let o of Object.values(Ol)){let a=r[o]??null,l=s.values[o]??null;a!==l&&i.push({key:o,label:_b[o]||o,before:a,after:l,kind:a===null?"added":l===null?"removed":"changed"})}return{rows:i,ignored_keys:s.skipped_keys}}function Ll(e,t,n,r,s,i,o=null){return Ci({key:e,choices:t,layer:"global",global:n,resolution_global:i,execution_defaults:r,runner_catalog:s,route:o})}function ep(e,t){let n={};for(let r of co){let s=e?.[r],i=t?.[r];if(s!==i){if(Kd.includes(r)){n[r]=i===uo?!0:null;continue}n[r]=typeof i=="string"&&i.length>0?i:null}}return n}function tp(e,t){let n={};for(let r of[...Un,...Es]){let s=e?.[r]??null,i=t?.[r]??null;s!==i&&(n[r]=typeof i=="string"&&i.length>0?i:null)}return n}var Dl=[{id:"workflow",label:"\uC6CC\uD06C\uD50C\uB85C\uC6B0",keys:["workflow_mode"]},{id:"review",label:"\uB9AC\uBDF0",keys:["spec_review_model","spec_review_effort","spec_review_speed","plan_review_model","plan_review_effort","plan_review_speed","impl_review_model","impl_review_effort","impl_review_speed"]},{id:"implementation",label:"\uAD6C\uD604",keys:["impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"]},{id:"worker",label:"Worker",keys:[...Un]}],tr={workflow_mode:"\uBAA8\uB4DC",spec_review_model:"\uC0AC\uC591 \uB9AC\uBDF0",spec_review_effort:"\uC0AC\uC591 \uB9AC\uBDF0 effort",spec_review_speed:"\uC0AC\uC591 \uB9AC\uBDF0 \uC18D\uB3C4",plan_review_model:"\uACC4\uD68D \uB9AC\uBDF0",plan_review_effort:"\uACC4\uD68D \uB9AC\uBDF0 effort",plan_review_speed:"\uACC4\uD68D \uB9AC\uBDF0 \uC18D\uB3C4",impl_review_model:"\uAD6C\uD604 \uB9AC\uBDF0",impl_review_effort:"\uAD6C\uD604 \uB9AC\uBDF0 effort",impl_review_speed:"\uAD6C\uD604 \uB9AC\uBDF0 \uC18D\uB3C4",impl_dispatch:"\uC2E4\uD589 \uBC29\uC2DD",impl_runtime:"\uC704\uC784 \uB300\uC0C1",impl_model:"\uBAA8\uB378",impl_effort:"effort",impl_speed:"\uC18D\uB3C4",orchestration_model:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uBAA8\uB378",orchestration_effort:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 effort",orchestration_speed:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uC18D\uB3C4"},Mi={pin:"\uD540",global:"\uC804\uC5ED",base:"\uAE30\uBCF8"};function Pl(e,t,n,r,s,i=null){let o=In({pin:t,global:n,execution_defaults:r,runner_catalog:s,route:t&&typeof t.route=="string"?t.route:null,controller_runtime:i});return e.map(a=>({key:a,...o[a]}))}function np(e,t,n,r,s,i=null){let o={pin:0,global:0,base:0};for(let a of Pl(e,t,n,r,s,i))o[a.source]+=1;return o}function rp(e,t,n){return{id:e,key:t,value:typeof n=="string"?n:""}}function sp(e,t,n){return typeof t!="string"||t.length===0?null:{id:e,preset_id:t,expected_revision:n}}var MA=[...Oi,...Un];var op=["orchestration_model","orchestration_effort","orchestration_speed","spec_review_model","spec_review_effort","spec_review_speed","plan_review_model","plan_review_effort","plan_review_speed","impl_review_model","impl_review_effort","impl_review_speed","impl_runtime","impl_model","impl_effort"];function mo(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function qi(e){if(!mo(e)||!mo(e.runners))return null;let t=Object.entries(e.runners).filter(([,n])=>mo(n)&&mo(n.models));return t.length>0?t:null}function Wn(e,t){let n=qi(e);if(!n||!t)return null;for(let[r,s]of n)if(Object.hasOwn(s.models,t))return r;return null}function ip(e,t){return mo(t)&&Array.isArray(t.efforts)?t.efforts.slice():Array.isArray(e.efforts)?e.efforts.slice():[]}function ap(e,t){let n=qi(e);if(!n||!t)return[];for(let[,r]of n)if(Object.hasOwn(r.models,t))return ip(r,r.models[t]);return[]}function gb(e){let t=qi(e);if(!t)return[];let n=[];for(let[,r]of t)for(let s of Object.values(r.models))for(let i of ip(r,s))n.includes(i)||n.push(i);return n}function hb(e,t){if(!t)return gb(e);let r=qi(e)?.find(([i])=>i===t)?.[1];if(!r)return[];let s=[];for(let i of Object.keys(r.models))for(let o of ap(e,i))s.includes(o)||s.push(o);return s}function lp(e,t,n){let r={impl_runtime:e.impl_runtime||"",impl_model:e.impl_model||"",impl_effort:e.impl_effort||""},s=r.impl_runtime==="inherit"?n:r.impl_runtime==="claude"||r.impl_runtime==="codex"?r.impl_runtime:null;if(r.impl_runtime==="inherit"&&!s)return r.impl_model="",r.impl_effort="",r;let i=Wn(t,r.impl_model);if(r.impl_model&&(!s||i!==s))return r.impl_model="",r.impl_effort="",r;let o=r.impl_model?ap(t,r.impl_model):hb(t,s);return r.impl_effort&&o.length>0&&!o.includes(r.impl_effort)&&(r.impl_effort=""),r}function Ln(e){return[typeof e.runner=="string"?e.runner:null,typeof e.model=="string"?e.model:null,typeof e.effort=="string"?e.effort:null,e.speed==="fast"?"Fast":null].filter(Boolean).join(" \xB7 ")}function ji(e){let t=e.runner==="codex"?e.codex_account:e.claude_account;return[typeof e.runner=="string"?e.runner:null,typeof e.model=="string"?e.model:null,typeof e.effort=="string"?e.effort:null,typeof e.speed=="string"?e.speed:"default",typeof t=="string"&&t.length>0?t:null].filter(Boolean).join(" \xB7 ")}function go(e){return typeof e.resumed_from!="string"||e.resumed_from.length===0?null:`${e.continuation_mode==="session"?"session \uC774\uC5B4\uBC1B\uC74C":e.continuation_mode==="fresh"?"\uC0C8 session\uC73C\uB85C \uC774\uC5B4\uBC1B\uC74C":"\uC774\uC804 attempt\uC5D0\uC11C \uC774\uC5B4\uBC1B\uC74C"} (from ${e.resumed_from})`}var Nl=new Set(["unavailable","not_applicable"]);function Rr(e,t){if(typeof e!="object"||e===null)return null;let n=e[t];return typeof n=="object"&&n!==null?n:null}function Ml(e){return e.filter(t=>t!==null).join(" \xB7 ")}function Cr(e,t){return t===null?null:`${tr[e]}: ${t.display} (${Mi[t.source]})`}function ho(e){return e.filter(t=>t!==null).join(`
`)}function Fi(e){if(typeof e!="object"||e===null)return null;let t=Ln(e);if(t==="")return null;let n=(r,s)=>typeof s=="string"&&s.length>0?`${r}: ${s}`:null;return{text:t,title:ho(["\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \u2014 \uC774 attempt\uC5D0 \uAE30\uB85D\uB41C \uC2E4\uD589\uAC12",n("runner",e.runner),n(tr.orchestration_model,e.model),n(tr.orchestration_effort,e.effort),n(tr.orchestration_speed,e.speed)])}}function Os(e,t){let n=Rr(e,"orchestration_model");if(n===null||n.resolution==="unavailable")return null;let r=Rr(e,"orchestration_effort"),s=Rr(e,"orchestration_speed"),i=Ml([Wn(t,n.value??""),n.display,r!==null&&r.value!==null?r.display:null,s!==null&&s.value==="fast"?"Fast":null]);return i===""?null:{text:i,title:ho(["\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \u2014 \uD604\uC7AC \uD574\uC11D\uAC12 (\uD540 > \uD050 \uAE30\uBCF8\uAC12)",Cr("orchestration_model",n),Cr("orchestration_effort",r),Cr("orchestration_speed",s)])}}function bb(e,t){return e===null||e.value===null||Nl.has(e.resolution)?null:e.value!=="inherit"?e.value:t?`inherit\u2192${t}`:"inherit"}function yb(e){return e===null||Nl.has(e.resolution)?null:e.value==="auto"?"auto":e.display}function vb(e){return e===null?null:e.value==="auto"?"auto":Nl.has(e.resolution)?null:e.display}function Xr(e,t){if(typeof e!="object"||e===null)return null;let n=Rr(e,"impl_dispatch"),r=Rr(e,"impl_runtime"),s=Rr(e,"impl_model"),i=Rr(e,"impl_effort"),o=Rr(e,"impl_speed"),a=n!==null&&n.value==="main"?"\uBA54\uC778":Ml([bb(r,t??null),yb(s),vb(i),o!==null&&o.value==="fast"?"Fast":null]);return a===""?null:{text:a,title:ho(["\uC6CC\uCEE4(\uAD6C\uD604 \uC704\uC784) \u2014 \uD604\uC7AC \uD574\uC11D\uAC12 (\uD540 > \uC804\uC5ED kv > \uAE30\uBCF8). \uC2E4\uD589 \uC911\uC774\uBA74 \uC138\uC158\uC774 \uC2DC\uC791 \uC2DC \uACE0\uC815\uD55C \uAC12\uACFC \uB2E4\uB97C \uC218 \uC788\uC74C",Cr("impl_dispatch",n),Cr("impl_runtime",r),Cr("impl_model",s),Cr("impl_effort",i),Cr("impl_speed",o)])}}function cp(e){if(typeof e!="object"||e===null)return null;if(e.kind==="main")return{text:"\uBA54\uC778",title:ho(["\uC6CC\uCEE4(\uAD6C\uD604 \uC704\uC784) \u2014 \uC774 attempt\uC758 \uBCF4\uC874 \uC601\uC218\uC99D\uC5D0 \uAE30\uB85D\uB41C \uC2E4\uC81C \uAD6C\uD604 \uC8FC\uCCB4","\uAD6C\uD604: \uCEE8\uD2B8\uB864\uB7EC \uC9C1\uC811(main)"])};if(e.kind!=="delegated")return null;let t=typeof e.model=="string"?e.model:null,n=typeof e.effort=="string"?e.effort:null,r=Ml([t,n]);return r===""?null:{text:r,title:ho(["\uC6CC\uCEE4(\uAD6C\uD604 \uC704\uC784) \u2014 \uC774 attempt\uC758 \uBCF4\uC874 \uC601\uC218\uC99D\uC5D0 \uAE30\uB85D\uB41C \uC2E4\uC81C \uAD6C\uD604 \uC8FC\uCCB4",t===null?null:`${tr.impl_model}: ${t}`,n===null?null:`${tr.impl_effort}: ${n}`])}}var kb=Object.freeze(new Set(["push_not_contained","invalid_impl_review","premature_close","head_mismatch","foreign_deploy_unsupported","not_resolved"])),wb=Object.freeze(["delivery_unproven:"]);function Is(e){let t=e&&typeof e.reason=="string"?e.reason:"";if(t.length===0||kb.has(t))return"session";for(let n of wb)if(t.startsWith(n))return"session";return"settlement"}var $b=["hard_diagnosis","invariant_reasoning","verification_by_judgment","claude_bound"];var xb={hard_diagnosis:"\uC6D0\uC778\uC774 \uBD88\uBA85\uD655\uD558\uAC70\uB098 \uC7AC\uD604\uC774 \uBD88\uC548\uC815\uD574 \uAC00\uC124-\uAC80\uC99D \uB8E8\uD504\uAC00 \uD544\uC694\uD558\uB2E4",invariant_reasoning:"\uC815\uD569\uC131\uC774 \uC0C1\uD0DC\uAE30\uACC4\xB7\uB3D9\uC2DC\uC131\xB7\uBD88\uBCC0\uC2DD \uCD94\uB860\uC5D0 \uB2EC\uB824 \uC788\uB2E4",verification_by_judgment:"\uD14C\uC2A4\uD2B8\uAC00 \uBABB \uC7A1\uACE0 \uB9AC\uBDF0\uC5B4\uC758 \uCD94\uB860\uC73C\uB85C\uB9CC \uAC80\uC99D\uD560 \uC218 \uC788\uB2E4",claude_bound:"Claude \uC138\uC158 \uC790\uC0B0\xB7\uC758\uBBF8\uB860\uC5D0 \uAC15\uD558\uAC8C \uBB36\uC5EC \uC788\uB2E4"};function ql(e){return(e&&Array.isArray(e.reasons)?e.reasons:[]).map(n=>xb[n]||"").filter(n=>n.length>0)}var up={orchestration_model:["fable"],impl_runtime:["claude"]},jl={unapplied:"\uBBF8\uC801\uC6A9",applied:"\uC801\uC6A9\uB428",diverged:"\uCD94\uCC9C\uACFC \uB2E4\uB984"};function dp(e){return typeof e=="object"&&e!==null?e:null}function pp(e,t){return typeof e=="string"&&t.includes(e)?e:""}function Ab(e){return typeof e!="string"?[]:e.split("+").map(t=>t.trim()).filter(t=>$b.includes(t))}function bo(e,t=e){let n=dp(e);if(!n)return null;let r=pp(n.rec_orchestration_model,up.orchestration_model);if(r.length===0)return null;let s=pp(n.rec_impl_runtime,up.impl_runtime),i={orchestration_model:r};s.length>0&&(i.impl_runtime=s);let o=dp(t)||{},a=Object.keys(i),l=0,u=0;for(let _ of a){let m=o[_];typeof m=="string"&&m.length>0&&(l+=1,m===i[_]&&(u+=1))}let d=l===0?"unapplied":u===a.length?"applied":"diverged";return{reasons:Ab(n.rec_reason),rec:i,state:d}}function Bi(e){if(!e||typeof e!="object")return"";let t=ql(e),n=jl[e.state]||"",r=["\uBCF5\uC7A1\uD55C \uC791\uC5C5\uC73C\uB85C \uD310\uC815\uB428"];return t.length>0&&r.push(`\uC0AC\uC720: ${t.join(" \xB7 ")}`),n.length>0&&r.push(`\uC0C1\uD0DC: ${n}`),r.join(`
`)}function Ui(e){return e.replace(/\/+$/,"")}function Sb(e,t){let n=Ui(e),r=Ui(t);return n===r||r.startsWith(`${n}/`)||n.startsWith(`${r}/`)}function Wi(e,t){let n=new Set;for(let r of e)for(let s of t){if(!Sb(r,s))continue;let i=Ui(r),o=Ui(s);n.add(i.length>=o.length?i:o)}return[...n].sort()}function Fl(e,t){return`${e}\0${t}`}function fp(e){let t=new Map;for(let n of Array.isArray(e?.running)?e.running:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"running",state:"running"});for(let n of Array.isArray(e?.pr_wait)?e.pr_wait:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"pr_wait",state:"pr_wait"});for(let n of Array.isArray(e?.queue_groups)?e.queue_groups:[]){let r=Array.isArray(n.sublanes?.parallel)?n.sublanes.parallel:Array.isArray(n.items)?n.items:[];for(let s of r)t.set(s.id,{root_dir:s.root_dir,workspace_name:s.workspace_name,lane:"parallel",position:s.queue_position});for(let s of Array.isArray(n.sublanes?.serial)?n.sublanes.serial:[])for(let i of s.items)t.set(i.id,{root_dir:i.root_dir,workspace_name:i.workspace_name,lane:s.id,position:i.queue_position})}for(let n of Array.isArray(e?.runnable)?e.runnable:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"runnable",state:"runnable"});for(let n of Array.isArray(e?.done)?e.done:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"done",state:"done"});return t}function vo(e,t){let n=Array.isArray(t)?t:[],r=e.indexOf("-"),s=r>0?e.slice(0,r):e;return n.some(i=>typeof i?.issue_prefix=="string"&&i.issue_prefix===s)?"internal":n.length>0&&n.every(i=>typeof i?.issue_prefix=="string")?"external":"unknown"}function yo(e){if(e.state==="running")return"\uC2E4\uD589\uC911";if(e.state==="pr_wait")return"PR \uB300\uAE30";if(e.state==="runnable")return"\uC2E4\uD589\uAC00\uB2A5";if(e.state==="done")return"\uC644\uB8CC";let t=e.lane==="parallel"?"\uBCD1\uB82C":e.lane;return`${e.workspace_name} \xB7 ${t} #${e.position}`}function _p(e,t,n,r){let s=n.get(e);if(!!(s&&t&&s.root_dir===t.root_dir&&s.lane===t.lane&&typeof s.position=="number"&&typeof t.position=="number"&&s.position<t.position))return{id:e,label:`\u{1F512} ${e} (\uAC19\uC740 \uB808\uC778 \uC55E)`,location_label:"\uAC19\uC740 \uB808\uC778 \uC55E",scope:null,same_lane_ahead:!0};if(s)return{id:e,label:`\u{1F512} ${e} (${yo(s)})`,location_label:yo(s),scope:null,same_lane_ahead:!1};let o=vo(e,r),a=o==="internal"?"\uBBF8\uC801\uC7AC":o==="external"?"\uC678\uBD80":"\uC704\uCE58 \uBBF8\uD655\uC778";return{id:e,label:`\u{1F512} ${e} (${a})`,location_label:a,scope:o,same_lane_ahead:!1}}function mp(e){let t=Array.isArray(e)?e:[],n=new Map,r=new Map,s=new Map;for(let a of t)for(let l of Array.isArray(a.sublanes?.serial)?a.sublanes.serial:[]){let u=Fl(a.root_dir,l.id);n.set(u,{root_dir:a.root_dir,workspace_name:a.name,lane:l.id}),s.set(u,[]);for(let d of Array.isArray(l.items)?l.items:[])r.set(d.id,u)}for(let a of t)for(let l of Array.isArray(a.sublanes?.serial)?a.sublanes.serial:[]){let u=Fl(a.root_dir,l.id),d=Array.isArray(l.items)?l.items[0]:null,m=!!d&&d.queue_index===0&&(!Array.isArray(l.occupied_by)||l.occupied_by.length===0)&&Array.isArray(d.blocked_by)?d.blocked_by:[],h=s.get(u);if(h)for(let g of m){let T=r.get(g);T&&T!==u&&!h.includes(T)&&h.push(T)}}let i=(a,l)=>{let u=new Set,d=[a];for(;d.length>0;){let _=d.pop();if(_===l)return!0;!_||u.has(_)||(u.add(_),d.push(...s.get(_)||[]))}return!1},o=new Map;for(let[a,l]of s){let u=[];for(let d of l){let _=n.get(d);i(d,a)&&_&&u.push(_)}u.length>0&&o.set(a,u)}return o}function gp(e,t){return Fl(e,t)}var cn=e=>e??en;var Eb=Object.freeze(["done","abandoned"]);function hp(e){return!e||typeof e!="object"||Array.isArray(e)?!1:typeof e.phase=="string"&&!Eb.includes(e.phase)}var Tb=".chip-popover, .judgement-chip";function Ls(e){let t=null,n=!1;function r(d){return t!==null&&t.bead_id===d.bead_id&&t.chip_key===d.chip_key}function s(d){t=r(d)?null:{...d},e()}function i(){t!==null&&(t=null,e())}function o(d){let _=d.target;t!==null&&(_&&typeof _.closest=="function"&&_.closest(Tb)||i())}function a(d){d.key==="Escape"&&i()}function l(){n||(n=!0,document.addEventListener("click",o),document.addEventListener("keydown",a))}function u(){n&&(n=!1,document.removeEventListener("click",o),document.removeEventListener("keydown",a))}return{toggle:s,close:i,isOpen:r,attach:l,detach:u}}function Ds(e){return c`<div
    class="chip-popover"
    role="dialog"
    aria-label=${e.title}
  >
    <div class="chip-popover__title">${e.title}</div>
    <ul class="chip-popover__lines">
      ${e.lines.map(t=>c`<li>${t}</li>`)}
    </ul>
  </div>`}async function $n(e){let t=String(e);if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")try{return await navigator.clipboard.writeText(t),!0}catch{}try{let n=document.createElement("textarea");n.value=t,n.style.position="fixed",n.style.left="-9999px",document.body.appendChild(n),n.select();let r=!1;try{r=document.execCommand("copy")}finally{n.remove()}return r}catch{return!1}}async function Rb(e){let t=await $n(e);be(t?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",t?"success":"error",1200)}function Qr(e){return typeof e!="string"||e.length===0?"":c`<span class="worker-ev__copyline"
    ><code class="worker-ev__path">${e}</code
    ><button
      type="button"
      class="worker-ev__copy"
      data-seam="log-path-copy"
      title="로그 경로 복사"
      aria-label=${`\uB85C\uADF8 \uACBD\uB85C \uBCF5\uC0AC: ${e}`}
      @click=${()=>{Rb(e)}}
    >
      ⧉
    </button></span
  >`}var bp=Object.freeze(["spec_backed","full_plan","quick_fix"]);var Cb="worker-ineligible";function ko(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function yp(e){return ko(e).includes(Cb)}var Ob=new Set(bp),vp=new WeakMap;function Ps(e){return e&&typeof e=="object"?e:{}}function Ib(e){let t=vp.get(e);if(t)return t;let n=wp(e);return vp.set(e,n),n}function Hi(e,t){return(Array.isArray(e)?e:[]).findIndex(r=>r&&r.bead_id===t)}function Lb(e,t){if(e.length===0)return null;if(Ib(t).has(e))return{lane:"running"};if(Hi(t.pr_wait,e)>=0)return{lane:"pr_wait"};let n=Hi(t.queue,e);if(n>=0)return{lane:"parallel",index:n};for(let r of Array.isArray(t.serial_lanes)?t.serial_lanes:[]){if(!r||typeof r.id!="string"||!/^s[1-5]$/.test(r.id))continue;let s=Hi(r.entries,e);if(s>=0)return{lane:r.id,index:s}}return Hi(t.done,e)>=0?{lane:"done"}:null}function Bl(e,t){let n=Ob.has(e.route),r=e.route==="quick_fix";return{placeable:n&&!e.worker_ineligible&&!e.awaiting_user&&(r?e.has_description:e.spec==="published")&&t===null,route_ok:n,worker_ineligible:e.worker_ineligible,awaiting_user:e.awaiting_user,missing_description:r&&!e.has_description,spec:e.spec,location:t}}function wo(e,t){let n=Ps(e),r=Ps(t),s=hs(n),i=n.workflow?.route_source==="explicit"&&typeof n.workflow.route=="string"&&n.workflow.route||(typeof Ps(n.metadata).route=="string"?Ps(n.metadata).route:""),o=i==="quick_fix",a=!Object.hasOwn(n,"description")||typeof n.description=="string"&&n.description.trim().length>0,l=Object.hasOwn(n,"labels")&&yp(n.labels),u=Object.hasOwn(Ps(n.metadata),"awaiting_user"),d=Lb(typeof n.id=="string"?n.id:"",r);return Bl({route:i,spec:o?"n/a":s.conflict?"conflict":s.evidence,has_description:a,awaiting_user:u,worker_ineligible:l},d)}function Zr(e){let t=e.location;if(t)switch(t.lane){case"running":return"\uC2E4\uD589 \uC911\uC774\uB77C \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4";case"pr_wait":return"PR \uB300\uAE30 \uC911\uC774\uB77C \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4";case"done":return"\uC644\uB8CC \uB808\uC778\uC5D0 \uC788\uC5B4 \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4";case"parallel":return`\uC774\uBBF8 \uB300\uAE30 \uC911 \xB7 \uBCD1\uB82C #${t.index+1}`;default:return`\uC774\uBBF8 \uB300\uAE30 \uC911 \xB7 \uC9C1\uB82C ${t.lane.slice(1)} #${t.index+1}`}return e.placeable?"\uB300\uAE30 \uD050 \uB9E8 \uB4A4\uC5D0 \uCD94\uAC00":e.route_ok===!1?"route\uAC00 \uC815\uD574\uC9C0\uC9C0 \uC54A\uC544 \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":e.worker_ineligible?"worker-ineligible label\uB85C \uC6CC\uCEE4\uC5D0\uC11C \uC2E4\uD589\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":e.awaiting_user?"\uC0AC\uC6A9\uC790 \uB9AC\uBDF0\uB97C \uAE30\uB2E4\uB9AC\uB294 \uC911\uC774\uB77C \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":e.missing_description?"description\uC774 \uC5C6\uC5B4 \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":e.spec==="conflict"?"spec \uACBD\uB85C\uAC00 \uCDA9\uB3CC\uD574 \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"spec\uC774 \uBC1C\uD589\uB418\uC9C0 \uC54A\uC544 \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"}function $o(e){let t=Ps(e),n=typeof t.serial_lane_count=="number"&&Number.isInteger(t.serial_lane_count)&&t.serial_lane_count>0?Math.min(t.serial_lane_count,5):0,r=Array.isArray(t.serial_lanes)?t.serial_lanes:[],s=[];for(let o of r){if(s.length>=n)break;!o||typeof o.id!="string"||!/^s[1-5]$/.test(o.id)||!Array.isArray(o.entries)||s.push({id:o.id,label:`\uC9C1\uB82C ${o.id.slice(1)}`,count:o.entries.length})}return s.length===0?null:[{id:"parallel",label:"\uBCD1\uB82C",count:(Array.isArray(t.queue)?t.queue:[]).length},...s]}function kp(e){return/^s[1-5]$/.test(e)?`\uC9C1\uB82C ${e.slice(1)}`:"\uBCD1\uB82C"}function Gi(e){return typeof e=="string"&&e.length>=7?e.slice(0,7):"\u2014"}function Ap(e){return e==="session"?"bead\uAC00 in_progress\uB85C \uC7A1\uD78C \uB4A4 \uB2EB\uD788\uAE30\uAE4C\uC9C0\uC758 \uACBD\uACFC":"attempt \uC2E4\uD589 \uC2DC\uAC04 \uD569\uC0B0 (\uC7AC\uAC1C \uC138\uC158 \uD3EC\uD568)"}function Jr(e){if(typeof e!="number"||!Number.isFinite(e)||e<0)return"\u2014";if(e<1e3)return`${Math.round(e)}ms`;let t=e/1e3;if(t<60)return`${t.toFixed(1)}\uCD08`;let n=Math.floor(t/60);if(n<60)return`${n}\uBD84 ${Math.round(t-n*60)}\uCD08`;let r=Math.floor(n/60),s=n%60;return`${r}\uC2DC\uAC04 ${s}\uBD84`}function Sp(e,t){if(typeof e!="object"||e===null)return[];let n=!1,r=!1;for(let s of Object.values(e)){if(typeof s!="object"||s===null)continue;let i=s;i.bead_id!==t||i.kind!=="review_session"||(n=!0,r=r||i.origin==="auto")}return n?[r?"\uB9AC\uBDF0 \xB7 \uC790\uB3D9":"\uB9AC\uBDF0"]:[]}function $p(e){return e==="auto"||e==="click"?e:null}function Ep(e,t){if(typeof e!="object"||e===null)return{active:!1,failure:null,origin:null};let n=!1,r=null,s=-1,i=null,o=null,a=-1;for(let l of Object.values(e)){if(typeof l!="object"||l===null)continue;let u=l;if(u.bead_id!==t||u.kind!=="review_session")continue;if(u.status==="pending"||u.status==="running"){n=!0;let _=typeof u.started_at=="number"?u.started_at:0;_>=s&&(s=_,r=$p(u.origin));continue}if(u.status!=="failed")continue;let d=typeof u.finished_at=="number"?u.finished_at:0;d>=a&&(a=d,i=typeof u.cause=="string"&&u.cause.length>0?u.cause:null,o=$p(u.origin))}return n?{active:!0,failure:null,origin:r}:{active:!1,failure:i,origin:o}}function Tp(e,t){if(typeof e!="object"||e===null)return null;let n=0,r=!1;for(let s of Object.values(e)){if(typeof s!="object"||s===null)continue;let i=s;if(i.bead_id!==t)continue;let o=i.started_at,a=i.finished_at;typeof o!="number"||typeof a!="number"||!Number.isFinite(o)||!Number.isFinite(a)||a<o||(n+=a-o,r=!0)}return r?n:null}function Vi(e){if(typeof e!="number"||!Number.isFinite(e)||e<=0)return"";let t=new Date(e);return`${String(t.getHours()).padStart(2,"0")}:${String(t.getMinutes()).padStart(2,"0")}`}function Db(e,t){let n=Array.isArray(e)?e:[],r=Array.isArray(t)?t:[];if(n.length===0&&r.length===0)return null;let s=null;for(let o of n)o.kind!=="deploy"||o.state!=="succeeded"||typeof o.target_sha!="string"||(!s||(typeof o.finished_at=="number"?o.finished_at:0)>(typeof s.finished_at=="number"?s.finished_at:0))&&(s=o);let i=n.filter(o=>o.state==="failed"&&!o.dismissed&&!o.superseded_by).length+r.length;return{deploy:s?{sha:Gi(s.target_sha),at:typeof s.finished_at=="number"?s.finished_at:null,elapsed_ms:typeof s.elapsed_ms=="number"?s.elapsed_ms:null}:null,unresolved:i,badge:i>0?{tone:"act",label:`\uD574\uACB0 \uD544\uC694 ${i}`}:{tone:"quiet",label:"\uBAA8\uB450 \uC815\uC0C1"}}}function Rp(e,t){let n=Db(e,t);return n?c`<button
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
            >${Vi(n.deploy.at)}${n.deploy.elapsed_ms!==null?` \xB7 ${Jr(n.deploy.elapsed_ms)}`:""}</span
          >
        </span>`:""}
    <span class="worker-repo-strip__spacer"></span>
    <span
      class="worker-repo-strip__badge worker-repo-strip__badge--${n.badge.tone}"
      >${n.badge.label}</span
    >
  </button>`:""}function Ns(e){let t=wn(e.created_at),n=wn(e.updated_at);return!t&&!n?"":c`<div class="worker-mini__meta">
    ${t?c`<span title=${`\uC0DD\uC131 ${nn(e.created_at)}`}
          >생성 ${t}</span
        >`:""}${t&&n?c`<span>·</span>`:""}${n?c`<span title=${`\uC218\uC815 ${nn(e.updated_at)}`}
          >수정 ${n}</span
        >`:""}
  </div>`}function Pb(e){return!e||e==="requested"?"\uBC31\uC5C5 \uC911":e==="abandoned"?"\uD3D0\uAE30 \uD3EC\uAE30\uB428":e==="backup_verified"||e==="signaled"?"runner \uC885\uB8CC \uC911":e==="merged_revert"||e.startsWith("revert_")?"revert PR \uB300\uAE30":e.startsWith("rollback_")?"\uC6D0\uBCF5 \uBC30\uD3EC \uC911":e==="runner_terminated"||e.startsWith("pr_")||e.includes("ref_")||e.includes("worktree")||e.startsWith("bead_")?"PR \uC815\uB9AC \uC911":`\uD3D0\uAE30 \uCC98\uB9AC \uC911 (${e})`}function Ao(e,t){return t==="merged"?`${e}: \uC774\uBBF8 merge\uB41C \uAD6C\uD604\uC785\uB2C8\uB2E4. \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 revert PR\uC744 \uC0DD\uC131\uD558\uBA70, \uC2E4\uC81C \uC6D0\uBCF5\uC740 \uC0AC\uB78C\uC774 \uADF8 PR\uC744 merge\uD55C \uB4A4 \uC644\uB8CC\uB429\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`:`${e}: \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 runner/PR/branch/worktree\uB97C \uC815\uB9AC\uD558\uACE0 \uC774\uC288\uB97C \uD6C4\uBCF4\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`}function So(e,t){return t.kind==="stale_work_backup_fresh"?`${e}: \uC2E4\uD328\uD55C \uBC31\uC5C5 \uC791\uC5C5\uC744 \uD3EC\uAE30\uD569\uB2C8\uB2E4. \uBC31\uC5C5\uC740 \uB9CC\uB4E4\uC5B4\uC9C0\uC9C0 \uC54A\uC558\uACE0 \uAE30\uC874 \uC791\uC5C5\uC740 \uADF8\uB300\uB85C \uB0A8\uC2B5\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`:`${e}: \uC2E4\uD328\uD55C \uD3D0\uAE30 \uC791\uC5C5\uC744 \uD3EC\uAE30\uD569\uB2C8\uB2E4. \uBC31\uC5C5\uACFC \uD3D0\uAE30\uB294 \uC218\uD589\uB418\uC9C0 \uC54A\uC558\uACE0 bead\uB294 \uD3D0\uAE30 \uC774\uC804 \uC0C1\uD0DC\uB85C \uB3CC\uC544\uAC11\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`}function Yi(e){return e.kind==="stale_work_backup_fresh"?`\uBC31\uC5C5 \uD3EC\uAE30\uB428 \xB7 \uAE30\uC874 \uC791\uC5C5\uC740 \uADF8\uB300\uB85C \uB0A8\uC2B5\uB2C8\uB2E4 (\uC6D0\uC778: ${e.last_error})`:`\uD3D0\uAE30 \uD3EC\uAE30\uB428 \xB7 \uD3D0\uAE30\uB294 \uC218\uD589\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4 (\uC6D0\uC778: ${e.last_error})`}function Xi(e){let t=["\uD3D0\uAE30 \uC644\uB8CC"];return e.operation_id&&t.push(`\uC791\uC5C5 ${e.operation_id}`),e.receipt?.archive_path&&t.push(`\uBC31\uC5C5 ${e.receipt.archive_path}`),e.receipt?.original_pr?.url&&t.push(`\uC6D0\uBCF8 PR ${e.receipt.original_pr.url}`),e.receipt?.revert_pr?.url&&t.push(`revert PR ${e.receipt.revert_pr.url}`),t.join(" \xB7 ")}function Cp(e){return e?.startsWith("orphan_gitlink_content:")?`\uB9E4\uD551 \uC5C6\uB294 gitlink \uACBD\uB85C ${e.slice(23)}\uC5D0 \uB0B4\uC6A9\uC774 \uC788\uC2B5\uB2C8\uB2E4 \u2014 \uC800\uC7A5\uC18C\uC5D0\uC11C \uADF8 \uACBD\uB85C\uB97C \uC815\uB9AC\uD55C \uB4A4 \uC7AC\uC2DC\uB3C4\uD558\uAC70\uB098 \uD3EC\uAE30\uD558\uC138\uC694`:e==="dirty_submodule"?"\uC11C\uBE0C\uBAA8\uB4C8\uC5D0 \uBBF8\uCEE4\uBC0B \uBCC0\uACBD\uC774\uB098 \uBBF8\uCD08\uAE30\uD654 \uD56D\uBAA9\uC774 \uC788\uC2B5\uB2C8\uB2E4 \u2014 \uC815\uB9AC \uD6C4 \uC7AC\uC2DC\uB3C4\uD558\uC138\uC694":e==="submodule_observation_failed"?"\uC11C\uBE0C\uBAA8\uB4C8 \uC0C1\uD0DC\uB97C \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 (git \uC624\uB958) \u2014 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C git \uBA85\uB839\uC744 \uC9C1\uC811 \uD655\uC778\uD558\uC138\uC694":null}function _r(e,t,n={}){let s=Object.values(e&&typeof e=="object"?e:{}).filter(m=>m&&m.bead_id===t&&hp(m)).sort((m,h)=>(m.requested_at||0)-(h.requested_at||0)).at(-1),i=typeof n.attempt_id=="string"&&n.attempt_id.length>0?n.attempt_id:typeof s?.attempt_id=="string"?s.attempt_id:null,o=n.external?"\uC678\uBD80 PR\uC740 Worker\uAC00 \uC18C\uC720\uD558\uC9C0 \uC54A\uC544 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":n.done?"\uC644\uB8CC\uB41C \uC791\uC5C5\uC740 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":n.merge_active?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":n.merge_queued?"\uBA38\uC9C0 \uD050\uC5D0 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 [\uCDE8\uC18C]\uD558\uC138\uC694":n.conflict_active?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 \uC138\uC158\uC744 \uC815\uB9AC\uD558\uC138\uC694":n.cleanup_active?"\uC815\uB9AC \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":null,a=typeof s?.last_error=="string"?s.last_error:null,l=s?Pb(s.phase):null,u=s?.kind==="stale_work_backup_fresh",d=Cp(a),_=n.merged||s?.mode==="merged_revert"?"merged":"unmerged";return{action:!n.external&&!n.done,enabled:!o&&(!s||!!a),label:u?a?"\uBC31\uC5C5 \uC815\uB9AC \uC7AC\uC2DC\uB3C4":"\uBC31\uC5C5 \uD6C4 \uC0C8\uB85C \uC2DC\uC791":a?"\uC7AC\uC2DC\uB3C4":"\uD3D0\uAE30",title:o||(a?d?`\uD3D0\uAE30 \uC2E4\uD328: ${a} \u2014 ${d}`:u?`\uBC31\uC5C5 \uB4A4 \uC815\uB9AC \uC2E4\uD328: ${a} \u2014 \uC6D0\uBCF8\uACFC \uAC80\uC99D \uC601\uC218\uC99D\uC744 \uBCF4\uC874\uD55C \uCC44 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:`\uD3D0\uAE30 \uC2E4\uD328: ${a} \u2014 \uAC19\uC740 \uC791\uC5C5\uC744 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:s?`${l||"\uD3D0\uAE30 \uCC98\uB9AC \uC911"} \u2014 \uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694`:_==="merged"?"\uBCD1\uD569\uB41C \uBCC0\uACBD\uC744 \uC6D0\uBCF5 PR\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4":"\uBC31\uC5C5 \uD6C4 runner\xB7PR\xB7\uC6CC\uD06C\uD2B8\uB9AC\xB7\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4"),attempt_id:i,operation:s||null,progress:l,error:a,confirmation:_,abandon:{action:!!s&&s.phase==="requested"&&!!a,label:u?"\uBC31\uC5C5 \uD3EC\uAE30":"\uD3D0\uAE30 \uD3EC\uAE30",title:u?"\uC2E4\uD328\uD55C \uBC31\uC5C5 \uC791\uC5C5\uC744 \uD3EC\uAE30\uD569\uB2C8\uB2E4 \u2014 \uC6D0\uBCF8\uC740 \uADF8\uB300\uB85C \uB0A8\uACE0 \uC0C8\uB85C \uC2DC\uC791\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4":"\uC2E4\uD328\uD55C \uD3D0\uAE30 \uC791\uC5C5\uC744 \uD3EC\uAE30\uD569\uB2C8\uB2E4 \u2014 \uBC31\uC5C5\xB7\uD3D0\uAE30\uB294 \uC218\uD589\uB418\uC9C0 \uC54A\uC558\uACE0 bead\uB294 \uD3D0\uAE30 \uC774\uC804 \uC0C1\uD0DC\uB85C \uB3CC\uC544\uAC11\uB2C8\uB2E4"}}}function Op(e){if(!e||e.quickfix_lane!==!0)return!1;let t=e.quickfix_landing;return!t||typeof t!="object"?!1:["repo_operations","branch_cleanup","parent_close"].includes(t.cursor)}function Ki(e){let t=e.discard;if(!t||!t.operation)return"";let n=t.operation,r=Cp(t.error),s=n.kind==="stale_work_backup_fresh"&&!t.error?null:n.backup?.path,i=n.original_pr,o=n.revert_pr;return c`<div
    class="worker-discard-receipt"
    role=${t.error?"alert":"status"}
  >
    <span>${t.progress}</span>
    ${t.error?c`<span
          >폐기 실패: ${t.error}${r?` \u2014 ${r}`:""}</span
        >`:""}
    <code>작업: ${n.operation_id}</code>
    ${s?c`<code>백업: ${s}</code>`:t.error?c`<span>아직 아무것도 삭제하지 않음</span>`:""}
    ${i?.url?c`<a href=${i.url} target="_blank" rel="noreferrer noopener"
          >원본 PR #${i.number||"?"}</a
        >`:""}
    ${o?.url?c`<a href=${o.url} target="_blank" rel="noreferrer noopener"
          >revert PR #${o.number||"?"} ·
          ${o.state||"\uC0C1\uD0DC \uBBF8\uD655\uC778"}</a
        >`:""}
  </div>`}var Nb={dirty_unique:"\uCD5C\uC2E0 base\uC5D0 \uC5C6\uB294 \uB85C\uCEEC \uBCC0\uACBD\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",untracked_present:"\uCD94\uC801\uB418\uC9C0 \uC54A\uC740 \uD30C\uC77C\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",branch_ahead:"\uB85C\uCEEC branch\uC5D0 \uACE0\uC720 commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",head_ahead:"worktree HEAD\uC5D0 \uACE0\uC720 commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",ahead_not_contained:"\uB85C\uCEEC branch\uC758 \uACE0\uC720 commit\uC774 \uCD5C\uC2E0 base\uC5D0 \uD3EC\uD568\uB410\uC74C\uC744 \uC99D\uBA85\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",ahead_merge_commit:"\uB85C\uCEEC branch\uC5D0 \uC790\uB3D9 \uC815\uB9AC\uD560 \uC218 \uC5C6\uB294 merge commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",ahead_submodule_path:"\uB85C\uCEEC branch\uC758 \uACE0\uC720 commit\uC774 submodule \uACBD\uB85C\uB97C \uBCC0\uACBD\uD569\uB2C8\uB2E4",archive_failed:"\uACE0\uC720 commit \uBC31\uC5C5\uC744 \uC548\uC804\uD558\uAC8C \uAC80\uC99D\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",ref_delete_failed:"\uD655\uC778\uB41C local branch\uB97C \uC548\uC804\uD558\uAC8C \uC0AD\uC81C\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",resume_available:"\uC774\uC5B4\uAC08 \uC218 \uC788\uB294 \uC774\uC804 Worker session\uC774 \uC788\uC2B5\uB2C8\uB2E4",observe_failed:"Git \uC0C1\uD0DC\uB97C \uC548\uC804\uD558\uAC8C \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",identity_changed:"\uD655\uC778 \uC911 worktree \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4",ownership_unknown:"Worker \uC18C\uC720 worktree\uC778\uC9C0 \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"};function Ip(e,t=!1){if(!e||typeof e!="object")return null;let n=e;if(n.reason!=="worktree_stale_work"||!n.stale_work||typeof n.stale_work!="object")return null;let r=n.stale_work,s=r.action_id;if(typeof s!="string"||s.length===0)return null;let i=r.residue==="branch"?"branch":"worktree",o=r.state==="unique"?"unique":"unknown",a=r.summary&&typeof r.summary=="object"?r.summary:{};function l(d){return Number.isInteger(a[d])?Number(a[d]):0}let u=typeof r.cause=="string"?r.cause:"observe_failed";return{residue:i,state:o,title:i==="branch"?"\uC774\uC804 \uBE0C\uB79C\uCE58 \uBCF4\uC874\uB428":o==="unique"?"\uC774\uC804 \uC791\uC5C5 \uBCF4\uC874\uB428":"\uC774\uC804 \uC791\uC5C5 \uC0C1\uD0DC \uD655\uC778 \uC2E4\uD328",cause:Nb[u]||"\uC548\uC804\uD558\uAC8C \uC790\uB3D9 \uC815\uB9AC\uD560 \uC218 \uC5C6\uB294 \uC774\uC804 \uC791\uC5C5\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",summary:i==="branch"?`\uACE0\uC720 commit ${l("branch_ahead")}`:[`staged ${l("staged_count")}`,`unstaged ${l("unstaged_count")}`,`untracked ${l("untracked_count")}`,`branch ahead ${l("branch_ahead")}`,`HEAD ahead ${l("head_ahead")}`].join(" \xB7 "),action_id:s,can_resume:r.can_resume===!0,can_continue:r.can_continue===!0,can_backup_fresh:r.can_backup_fresh===!0,can_recheck:r.can_recheck===!0,locked:t}}function es(e,t={}){if(!e||!e.orchestration&&!e.worker)return"";let n=t.pin===!0?" exec-chip--pin":"",r=t.pin===!0?`
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
      >`:""}`}function xo(e,t){let n=`worker-dep worker-dep--${t}${e.foreign?" worker-dep--foreign":""}`;return e.openable===!0?c`<button
        type="button"
        class=${`${n} worker-dep__open`}
        data-dep-id=${e.id}
        data-root-dir=${e.root_dir||""}
        title=${e.title||""}
      >
        ${e.label}
      </button>`:c`<span class=${n} title=${e.title||""}>${e.label}</span>`}function Mb(e){return{id:e.id,label:`\u29C9 ${e.id}`,title:[`\uACB9\uCE68 \xB7 ${e.location_label}`,...e.prefixes].join(`
`),openable:!0,...e.root_dir?{root_dir:e.root_dir}:{}}}function Ul(e){return Array.isArray(e)?e.slice().sort((t,n)=>t.id<n.id?-1:t.id>n.id?1:0):[]}function qb(e,t=!1){return e?c`<button
    type="button"
    class="ctl-chip ctl-chip--label judgement-chip worker-card__spec-after-blocker"
    data-chip-key="spec_after_blocker"
    aria-expanded=${t?"true":"false"}
    title="선행의 결과가 설계 전제라 스펙도 선행 뒤에 씁니다"
  >
    스펙 대기
  </button>`:""}function Lp(e){if(!Object.hasOwn(e,"route_ok")||e.queue_placeable===!0)return null;let t="";return e.route_ok===!1&&(t="\uB77C\uC6B0\uD305 \uD544\uC694"),t.length===0&&(e.worker_ineligible===!0||e.awaiting_user===!0)||(t.length===0&&e.missing_description===!0?t="\uBCF8\uBB38 \uD544\uC694":t.length===0&&e.placement_spec==="conflict"?t="\uC2A4\uD399 \uCDA9\uB3CC":t.length===0&&Object.hasOwn(e,"placement_spec")&&e.placement_spec!=="published"&&(t="\uC2A4\uD399 \uBBF8\uBC1C\uD589"),t.length===0)?null:{label:t,title:Zr({placeable:!1,route_ok:e.route_ok,worker_ineligible:e.worker_ineligible===!0,awaiting_user:e.awaiting_user===!0,missing_description:e.missing_description===!0,spec:e.placement_spec})}}function jb(e,t){return e?c`<button
    type="button"
    class="ctl-chip ctl-chip--label judgement-chip worker-card__readiness"
    data-chip-key="readiness"
    aria-expanded=${t?"true":"false"}
    title=${e.title}
  >
    ${e.label}
  </button>`:""}function Qi(e,t=""){if(!e)return t===""?"":c`<div class="worker-deps worker-deps--primary">
          ${t}
        </div>`;let n=Ul(e.predecessors),r=Array.isArray(e.released)?e.released:[],s=Ul(e.dependents),i=Ul(e.overlaps),o=e.scope_missing===!0,a=e.armed_lane||null,l=!!a||n.length>0||s.length>0||t!=="",u=r.length>0||i.length>0||o;return!l&&!u?"":c`${l?c`<div class="worker-deps worker-deps--primary">
        ${a?c`<span
              class=${`worker-dep worker-dep--armed${a.orphan?" worker-dep--armed-orphan":""}`}
              title=${a.orphan?"\uC774 \uD56D\uBAA9\uC744 \uBC1C\uCC28\uD55C \uC5F0\uACB0 \uB808\uC778\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uC2A4\uCF00\uC904\uB7EC\uB294 \uACC4\uC18D \uBC1C\uCC28\uD569\uB2C8\uB2E4":"\uC5F0\uACB0 \uB808\uC778\uC774 \uC774 \uD56D\uBAA9\uC744 \uBC1C\uCC28\uD588\uC2B5\uB2C8\uB2E4 \u2014 \uB808\uD3EC \uC790\uB3D9 \uC9C4\uD589\uACFC \uBB34\uAD00\uD569\uB2C8\uB2E4"}
              >${a.orphan?c`${a.label}<button
                      type="button"
                      class="worker-dep__label mon2-arm__release"
                      data-lane-id=${a.lane_id}
                    >
                      해제
                    </button>`:a.label}</span
            >`:""}${n.map(d=>xo(d,"pred"))}${t}${s.map(d=>xo(d,"dependents"))}
      </div>`:""}${u?c`<div class="worker-deps worker-deps--secondary">
        ${r.map(d=>xo(d,"released"))}${i.map(d=>xo(Mb(d),"overlap"))}${o?c`<span
              class="worker-dep worker-dep--muted"
              title="겹침 판정 불가 — 아티팩트가 있으면 스펙/플랜 front-matter, 없으면 description \`## scope\`에 선언 필요"
              >scope 없음</span
            >`:""}
      </div>`:""}`}function Dp(e,t=""){let n=(Array.isArray(e)?e:[]).filter(r=>typeof r=="string"&&r!=="").slice().sort();return n.length===0?"":c`<div class="worker-deps worker-deps--secondary">
    ${n.map(r=>xo({id:r,label:`\uC774\uC6D4 \u2192 ${r}`,title:`\uC774\uC6D4\uB41C \uD6C4\uC18D ${r} \uC5F4\uAE30`,openable:!0,...t?{root_dir:t}:{}},"dependents"))}
  </div>`}function Zi(e){return e?c`<button
    type="button"
    class="worker-dep worker-dep--lane mon-lane__chip"
    data-lane-id=${e.lane_id}
    title="이 연결 레인으로 이동"
  >
    ${e.label}
  </button>`:""}function ts(e){let t=ia(e);if(t===null)return"";let n=t==="unset";return c`<span
    class="ctl-chip ctl-chip--route${n?" is-derived":""}"
    data-route=${t}
    title=${n?"route \uBBF8\uD540 (metadata unset)":"route"}
    >${t}</span
  >`}function Ji(e,t){let n=ia(e);return{route:n===null?void 0:n,tinted:n!==null&&t===!0}}function Fb(e,t=!1){let n=e?e.quick_fix_review:null;if(!n)return"";let r=n.state;if(r!=="reviewed"&&r!=="stale")return"";let s=Array.isArray(n.missing)?n.missing:[],i=[r==="reviewed"?"quick_fix self-review \uC601\uC218\uC99D\uC774 \uC9C0\uAE08 \uBCF8\uBB38\uACFC \uC77C\uCE58\uD569\uB2C8\uB2E4":"quick_fix self-review \uC601\uC218\uC99D\uC774 \uC9C0\uAE08 \uBCF8\uBB38\uACFC \uB2E4\uB985\uB2C8\uB2E4",...s].join(`
`);return c`<button
    type="button"
    class="ctl-chip judgement-chip worker-card__qfr worker-card__qfr--${r}"
    data-chip-key="qfr"
    aria-expanded=${t?"true":"false"}
    title=${i}
  >
    ${r==="reviewed"?"\uB9AC\uBDF0 \u2713":"\uB9AC\uBDF0 stale"}
  </button>`}function Pp(e){return e?c`<button
    type="button"
    class="ctl-chip ctl-chip--from"
    data-from-id=${e}
    title=${`\uCD9C\uCC98 ${e} \uC5F4\uAE30`}
  >
    ↩ from ${e}
  </button>`:""}function ea(e,t=!1){return e?c`<button
    type="button"
    class="ctl-chip ctl-chip--label judgement-chip worker-card__rec"
    data-chip-key="rec"
    data-state=${e.state}
    aria-expanded=${t?"true":"false"}
    title=${Bi(e)}
  >
    ${"\uBCF5\uC7A1"}
  </button>`:""}var Bb={absent:"\uC2E4\uD589 \uC601\uC218\uC99D\uC774 \uAE30\uB85D\uB418\uC9C0 \uC54A\uC558\uB2E4 \u2014 \uACFC\uAC70 Bead\xB7\uC678\uBD80 \uACBD\uB85C PR\uC740 \uC6D0\uB798 \uC5C6\uB2E4",unparsable:"\uC601\uC218\uC99D \uAC12\uC744 \uC77D\uC744 \uC218 \uC5C6\uB2E4 \u2014 40hex SHA\uB098 `delegated:`/`main:` \uD615\uC2DD\uC774 \uC544\uB2C8\uB2E4",effort_unknown:"effort \uD1A0\uD070\uC774 harness \uC5B4\uD718 \uBC16\uC774\uB2E4 \u2014 \uBAA8\uB378\xB7SHA\xB7unit\uC740 \uC720\uD6A8\uD558\uB2E4",main_reason_retired:"`main:` \uC0AC\uC720\uAC00 \uACE0\uC815 4\uD1A0\uD070(bead\xB7quick_fix_default\xB7phase_line\xB7takeover) \uBC16\uC774\uB2E4",main_receipt_unbacked:"`main:` \uC0AC\uC720\uB97C \uB4B7\uBC1B\uCE68\uD558\uB294 \uBA54\uD0C0\uB370\uC774\uD130(impl_dispatch\xB7route\xB7planned_execution\xB7quick_fix \uAE30\uBCF8 dispatch)\uAC00 \uC5C6\uB2E4",takeover_lineage_missing:"`main:takeover`\uC778\uB370 resolved \uBAA8\uB378\uACFC \uC77C\uCE58\uD558\uB294 \uC644\uB8CC\uB41C \uC704\uC784 \uC138\uC158\uC774 \uC5C6\uB2E4",takeover_lineage_unobservable:"`main:takeover`\uC778\uB370 \uC704\uC784 \uACC4\uBCF4\uB97C \uBAA8\uB2C8\uD130\uAC00 \uBCFC \uC218 \uC5C6\uB2E4(Codex \uBC16 \uB7F0\uD0C0\uC784)"};function Ub(e,t=!1){let n=Np(e);if(n.length===0)return"";let r=n.length>1?`\uC601\uC218\uC99D \xB7 ${n[0]} +${n.length-1}`:`\uC601\uC218\uC99D \xB7 ${n[0]}`;return c`<button
    type="button"
    class="ctl-chip ctl-chip--label judgement-chip worker-card__receipt"
    data-chip-key="receipt"
    data-bead-id=${e.id}
    aria-expanded=${t?"true":"false"}
    title=${n.join(", ")}
  >
    ${r}
  </button>`}function Np(e){let t=e.receipt_badge?e.receipt_badge.codes:null;return Array.isArray(t)?t.filter(n=>typeof n=="string"&&n.length>0):[]}function Wb(e,t){if(typeof e!="string"||e.length===0||!Number.isInteger(t)||t<=0)return!1;try{let n=new URL(e).protocol;return n==="https:"||n==="http:"}catch{return!1}}function Mp(e,t){return Wb(e,t)?c`<a
    class="worker-mini__pr"
    href=${e}
    target="_blank"
    rel="noreferrer noopener"
    title="PR 열기"
    >#${t} ↗</a
  >`:""}function ta(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=Math.max(0,Math.min(4,Math.trunc(e)));return c`<span class="worker-pri" title=${`\uC6B0\uC120\uC21C\uC704 P${t}`}
    >P${t}</span
  >`}function Hb(e){let t=Array.isArray(e.badges)?e.badges:[],n=mn(e.usage),r=dr(e.usage),s=wn(e.done_at);return c`<div
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
      ${Mp(e.pr_url,e.pr_number)}${s?c`<span
            class="worker-mini__done-at"
            title=${`\uC644\uB8CC ${nn(e.done_at)}`}
            >완료 ${s}</span
          >`:""}
      ${t.map(i=>c`<span
            class="worker-mini__badge${e.alert?" worker-mini__badge--alert":""}"
            >${i}</span
          >`)}
    </div>
    <div class="worker-mini__row2">
      <span class="worker-mini__title">${e.title}</span>
    </div>
    ${Dp(e.carried_to,e.root_dir)}
    <div class="worker-mini__row3">
      ${ts(e.workflow)}${e.exec_chips?es(e.exec_chips):""}${n.length>0?n.map(i=>c`<span class="worker-usage" title=${i.tooltip}
                >${i.label}</span
              >`):r?c`<span class="worker-usage" title=${lo(e.usage)}
              >${r}</span
            >`:""}
      ${typeof e.work_ms=="number"?c`<span
            class="worker-mini__work"
            title=${Ap(e.work_kind)}
            >작업 ${Jr(e.work_ms)}</span
          >`:""}
    </div>
  </div>`}function na(e,t){return typeof e=="number"?e+jp-t:0}function Hl(e,t=Date.now()){let n=na(e,t);return n<=0?"":c`<span
    class="worker-dep worker-dep--grace"
    title="대기에 막 들어온 항목입니다 — 남은 시간 동안 자동 실행이 미뤄집니다"
    >⏳ ${Math.ceil(n/1e3)}초</span
  >`}function zl(e,t=Date.now()){return na(e.added_at,t)<=0?"":c`<button
    type="button"
    class="op-btn worker-mini__start-now"
    data-action="queue-start-now"
    data-bead-id=${e.id}
    title="대기 진입 유예를 이 항목에 대해서만 걷고 지금 실행합니다"
  >
    지금 시작
  </button>`}function Ms(e,t={}){if(!(e.draggable!==!0||e.done===!0))return c`<span class="worker-mini__rowops">
    ${zl(e)}${t.nudgeable===!0?c`<button
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
  </span>`}function Hn(e,t={}){if(e.lane==="done"&&e.done_layout==="three_line")return Hb(e);let n=e.draggable&&!e.done,r=Array.isArray(e.badges)?e.badges:[],s=mn(e.usage),i=dr(e.usage),o=e.merge_step||null,a=e.lane==="pr_wait"||!!e.revise_action||!!e.stale_work||e.discard?.abandon.action===!0,l=e.lane==="done"&&!a,u=l?wn(e.done_at):"",d=n?c`<span class="worker-mini__grip" aria-hidden="true">⠿</span>`:"",_=typeof e.seq=="number"?c`<span class="worker-mini__seq" aria-hidden="true"
          >${e.seq}</span
        >`:"",m=e.workspace_name?c`<span class="worker-mini__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:"",h=c`<span class="worker-mini__id" title="클릭하면 ID 복사"
    >${e.id}</span
  >`,g=ts(e.workflow),T=e.lane==="done"?"":Pp(e.from_id),k=ta(e.priority),ee=c`<span class="worker-mini__title">${e.title}</span>`,ne=Mp(e.pr_url,e.pr_number),z=e.foreign_repo?c`<span
        class="worker-mini__foreign-pr"
        title="다른 저장소의 PR입니다. 이 워크스페이스에서는 상태를 관측·머지·정리하지 않습니다."
        >↗ ${e.foreign_repo}</span
      >`:"",N=r.map(J=>J===e.live_badge?c`<span
          class="worker-mini__badge worker-mini__badge--activity"
          title="서버가 이 PR을 처리하는 중입니다"
          ><span class="act-dot" aria-hidden="true"></span>${J}</span
        >`:c`<span
          class="worker-mini__badge${e.alert?" worker-mini__badge--alert":""}"
          title=${J===e.completion_badge&&e.completion_title||""}
          >${J}</span
        >`),D=e.reason?c`<span class="worker-mini__reason">${e.reason}</span>`:"",M=s.length>0?s.map(J=>c`<span class="worker-usage" title=${J.tooltip}
              >${J.label}</span
            >`):i?c`<span class="worker-usage" title=${lo(e.usage)}
            >${i}</span
          >`:"",q=o?c`<span
        class="merge-step${o.failed?" merge-step--failed":""}"
        style=${`--progress: ${o.percent}%`}
        >${o.label}${o.index>0?c`<span class="merge-step__n"
              >${o.index}/${o.total}</span
            >`:""}</span
      >`:"",G=e.merge_action?c`<button
        type="button"
        class="worker-mini__merge"
        data-bead-id=${e.id}
        ?disabled=${e.merge_enabled===!1}
        title=${e.merge_title||""}
      >
        ${e.merge_label||"\uBA38\uC9C0"}
      </button>`:"",P=e.cancel_action?c`<button
        type="button"
        class="worker-mini__merge-cancel"
        data-bead-id=${e.id}
        ?disabled=${e.cancel_enabled===!1}
        title=${e.cancel_title||""}
      >
        취소
      </button>`:"",$=e.discard,O=$?.action||e.discard_action?c`<button
          type="button"
          class="worker-mini__discard"
          data-bead-id=${e.id}
          data-attempt-id=${$?.attempt_id||""}
          data-operation-id=${$?.operation?.operation_id||""}
          data-discard-mode=${$?.confirmation||"unmerged"}
          ?disabled=${$?!$.enabled:e.discard_enabled===!1}
          title=${$?$.title:e.discard_enabled===!1?e.discard_title||"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"PR\uC744 \uB2EB\uACE0 \uC6CC\uD06C\uD2B8\uB9AC/\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4 (\uB418\uB3CC\uB9B4 \uC218 \uC5C6\uC74C). \uB2E4\uC2DC \uC2E4\uD589\uD558\uB824\uBA74 \uD6C4\uBCF4 \uB808\uC778\uC5D0\uC11C \uB300\uAE30 \uB808\uC778\uC73C\uB85C \uC62E\uAE30\uC138\uC694"}
        >
          ${$?.label||"\uD3D0\uAE30"}
        </button>`:"",C=$?.abandon.action?c`<button
        type="button"
        class="worker-mini__discard-abandon"
        data-bead-id=${e.id}
        data-operation-id=${$.operation.operation_id}
        data-operation-kind=${$.operation.kind||""}
        data-last-error=${$.error||""}
        title=${$.abandon.title}
      >
        ${$.abandon.label}
      </button>`:"",oe=e.resolve_action?c`<button
        type="button"
        class="worker-mini__resolve"
        data-bead-id=${e.id}
        ?disabled=${e.resolve_enabled===!1}
        title=${e.resolve_title||"\uC2E4\uD328\uD55C \uC791\uC5C5\uC744 \uC774\uC5B4\uBC1B\uB294 \uB300\uD654\uD615 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4 (\uAE30\uB85D\uB41C \uC138\uC158\uC774 \uC788\uC73C\uBA74 fork)"}
      >
        세션에서 해결
      </button>`:"",ue=$?.abandon.action?c`${O}${C}${oe}`:c`${oe}${O}`,me=e.stale_work||null,V=me?c`${me.can_resume||me.can_continue?c`<button
            type="button"
            class="worker-mini__stale-continue"
            data-bead-id=${e.id}
            data-action-id=${me.action_id}
            ?disabled=${me.locked}
          >
            기존 작업 이어가기
          </button>`:""}${me.can_backup_fresh?c`<button
            type="button"
            class="worker-mini__stale-backup"
            data-bead-id=${e.id}
            data-action-id=${me.action_id}
            ?disabled=${me.locked}
          >
            백업 후 새로 시작
          </button>`:""}${me.can_recheck?c`<button
            type="button"
            class="worker-mini__stale-recheck"
            data-bead-id=${e.id}
            data-action-id=${me.action_id}
            ?disabled=${me.locked}
          >
            다시 확인
          </button>`:""}`:"",ie=me?c`<div class="worker-mini__stale">
        <strong>${me.title}</strong>
        <span>${me.summary}</span>
        <span>${me.cause}</span>
        ${me.can_backup_fresh?c`<small
              >Git-ignored dependency/build output은 archive에 포함되지
              않습니다</small
            >`:""}
      </div>`:"",de=e.revise_action?c`<button
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
        </button>`:"",Oe=!!(e.lane!=="pr_wait"&&e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker)),qe=Oe?es(e.exec_chips,{pin:e.exec_chips_pinned===!0}):"",Ie=ea(e.rec,Or(e,"rec")),ge=Ub(e,Or(e,"receipt")),F=Zi(e.cross_lane_chip),ce=Qr(e.log_path),pe=m||F||g||T||Oe||Ie||ge||M||ce?c`<div class="worker-chips">
          ${m}${F}${g}${T}${qe}${Ie}${ge}${M}${ce}${zi(e)}
        </div>`:"",B=Qi(e.dependency_chips,Hl(e.added_at)),U=Ki(e),Re=t.actions?t.actions:"",W=!!(o||e.merge_action||e.cancel_action||e.resolve_action||e.discard_action||$?.operation||e.revise_action||me),te=Ji(e.workflow,!o&&e.external!==!0&&e.ghost!==!0);return c`<div
    class="worker-mini${a?" worker-mini--card":""}${n?"":" worker-mini--static"}${e.done?" worker-mini--done":""}${e.ghost?" worker-mini--ghost":""}${o?" worker-mini--merging":""}${o?.failed?" worker-mini--merge-failed":""}${e.external?" worker-mini--external":""}${te.tinted?" worker-mini--route-bg":""}${e.search_match===!1?" is-dimmed":""}"
    style=${o?`--progress: ${o.percent}%`:""}
    draggable=${n?"true":"false"}
    data-bead-id=${e.id}
    data-lane=${e.lane}
    data-route=${cn(te.route)}
  >
    ${l?c`<div class="worker-mini__row1">
            ${m}${h}${k}${T}${ne}${z}${ee}${Re}
          </div>
          ${Dp(e.carried_to,e.root_dir)}
          <div class="worker-mini__row2">
            ${g}${qe}${M}${u?c`<span
                  class="worker-mini__done-at"
                  title=${`\uC644\uB8CC ${nn(e.done_at)}`}
                  >완료 ${u}</span
                >`:""}${typeof e.work_ms=="number"?c`<span
                  class="worker-mini__work"
                  title=${Ap(e.work_kind)}
                  >작업 ${Jr(e.work_ms)}</span
                >`:""}${N}${q}
            <span class="worker-mini__actions"
              >${G}${P}${ue}</span
            >
            ${Ns(e)}
          </div>`:a?c`<div class="worker-mini__head">
              ${d}${_}${h}${k}${ne}${z}${N}${D}${Re}
            </div>
            <div class="worker-mini__body">${ee}${ie}</div>
            ${B}${pe}${W?c`<div class="worker-mini__foot">
                  ${q}
                  <span class="worker-mini__actions"
                    >${G}${P}${ue}${de}${V}</span
                  >
                  ${Ki(e)}
                </div>`:""}
            ${Ns(e)}`:c`<div class="worker-mini__line">
              ${d}${_}${h}${k}${ee}${ne}${z}${N}${D}${q}${G}${P}${ue}${Re}
            </div>
            ${B}${pe}${U} ${Ns(e)}`}
  </div>`}function Kl(e,t){let n,r=[];for(let s of e){let i=s.group||"";i.length>0&&i!==n&&r.push(c`<div class="worker-card__place-group">${i}</div>`),n=i,r.push(c`<button
        type="button"
        class="worker-card__place-lane${i.length>0?" worker-card__place-lane--nested":""}"
        data-bead-id=${t}
        data-lane=${s.id}
        ?disabled=${s.disabled===!0}
        title=${s.title||`${s.label} \uB300\uAE30 \uB9E8 \uB4A4\uC5D0 \uCD94\uAC00`}
      >
        <span>${s.label}</span>
        ${typeof s.count=="number"?c`<span class="worker-card__place-count">${s.count}</span>`:""}
      </button>`)}return c`${r}`}var qp={external_roundtrip:"\uD558\uB124\uC2A4 \uBC16 \uC0C1\uB300\uC640 \uC608\uCE21 \uBD88\uAC00 \uC655\uBCF5 \uBC18\uBCF5 \u2014 \uB2E4\uB978 rig \uC138\uC158\xB7\uC0AC\uB78C\xB7\uC678\uBD80 \uC2DC\uC2A4\uD15C",user_feedback_loop:"\uC9C4\uD589 \uC911 \uC0AC\uC6A9\uC790 \uD53C\uB4DC\uBC31 \uC5C6\uC774\uB294 \uD488\uC9C8\uC774 \uB0AE\uC74C \u2014 \uBB38\uC548\xB7\uC124\uACC4 \uC138\uBD80\xB7\uBC29\uD5A5 \uC120\uD0DD"};function Gl(e,t){if(t==="rec"){let n=e.rec;if(!n)return null;let r=jl[n.state]||"";return{title:"\uBCF5\uC7A1\uD55C \uC791\uC5C5\uC73C\uB85C \uD310\uC815\uB428",lines:[...ql(n),...r.length>0?[`\uC0C1\uD0DC: ${r}`]:[],"\uC801\uC6A9\uC740 \uC774\uC288 \uC0C1\uC138\uC758 \uC2E4\uD589 \uC124\uC815 \uD3B8\uC9D1\uAE30\uC5D0\uC11C"]}}if(t==="session_preferred"){if(e.session_preferred!==!0)return null;let n=qp[e.session_preferred_reason||""]||"";return{title:"\uC6CC\uCEE4\uB85C \uB3CC\uB9B4 \uC218 \uC788\uC9C0\uB9CC \uC138\uC158\uC774 \uB0AB\uB2E4",lines:n.length>0?[n]:[]}}if(t==="ineligible")return e.worker_ineligible!==!0?null:{title:"\uC6CC\uCEE4 \uC2E4\uD589 \uB300\uC0C1\uC774 \uC544\uB2C8\uB2E4",lines:["worker-ineligible \uB77C\uBCA8\uC774 \uBD99\uC5B4 \uC788\uB2E4 \u2014 \uB77C\uBCA8\uC740 \uC774\uC288 \uC0C1\uC138\uC758 \uB77C\uBCA8 \uC808\uC5D0\uC11C \uB5C0\uB2E4"]};if(t==="spec_after_blocker")return e.spec_after_blocker!==!0?null:{title:"\uC120\uD589 \uACB0\uACFC\uAC00 \uC124\uACC4 \uC804\uC81C \u2014 \uC2A4\uD399\uB3C4 \uC120\uD589 \uB4A4\uC5D0",lines:[`\uC120\uD589: ${(Array.isArray(e.blocked_by)?e.blocked_by:[]).join(" \xB7 ")}`,"\uC120\uD589\uC774 \uB2EB\uD788\uBA74 \uC774 \uD45C\uC2DC\uB294 \uC800\uC808\uB85C \uC0AC\uB77C\uC9C4\uB2E4 \u2014 \uB77C\uBCA8\uC740 \uC774\uC288 \uC0C1\uC138\uC758 \uB77C\uBCA8 \uC808\uC5D0\uC11C \uB5C0\uB2E4"]};if(t==="readiness"){let n=Lp(e);return n?{title:n.title,lines:[]}:null}if(t==="receipt"){let n=Np(e);return n.length===0?null:{title:"\uC2E4\uD589 \uC601\uC218\uC99D \uD68C\uACC4 \uC794\uC5EC \u2014 \uBA38\uC9C0\uB294 \uC9C4\uD589",lines:[...n.map(r=>Bb[r]||r),"\uC790\uB3D9 \uBA38\uC9C0 \uD310\uC815\uC5D0\uB294 \uC601\uD5A5\uC774 \uC5C6\uB2E4 \u2014 \uC815\uC815\uC740 bd update --set-metadata exec_receipt=\u2026 \uB85C"]}}if(t==="qfr"){let n=e.workflow?e.workflow.quick_fix_review:null;if(!n||n.state!=="reviewed"&&n.state!=="stale")return null;let r=Array.isArray(n.missing)?n.missing:[];return{title:n.state==="reviewed"?"quick_fix self-review \uC601\uC218\uC99D\uC774 \uC9C0\uAE08 \uBCF8\uBB38\uACFC \uC77C\uCE58\uD569\uB2C8\uB2E4":"quick_fix self-review \uC601\uC218\uC99D\uC774 \uC9C0\uAE08 \uBCF8\uBB38\uACFC \uB2E4\uB985\uB2C8\uB2E4",lines:r.length>0?r:["\uBE60\uC9C4 \uD56D\uBAA9 \uC5C6\uC74C"]}}return null}var zb=["rec","receipt","session_preferred","ineligible","qfr","spec_after_blocker","readiness"];function ra(e,t){for(let n of zb){if(!t(n))continue;let r=Gl(e,n);return r?{chip_key:n,content:r}:null}return null}function zi(e){return e.chip_popover?Ds(e.chip_popover.content):""}function Or(e,t){return!!e.chip_popover&&e.chip_popover.chip_key===t}var Vl="\uC0AC\uC6A9\uC790 \uB9AC\uBDF0 \uD544\uC694";function Yl(e,t=null,n={}){let r=e.worker_ineligible===!0,s=e.draggable&&!e.done&&!r,i=e.queue_placeable===!0&&!e.done&&!r,o=i&&t&&t.bead_id===e.id,a=e.session_preferred===!0,l=qp[e.session_preferred_reason||""]||"",u=e.workflow,d=e.missing_description===!0,_=e.awaiting_user===!0,m=typeof e.reason=="string"&&e.reason.startsWith("\u26D4"),h=Or(e,"spec_after_blocker"),g=qb(e.spec_after_blocker===!0,h),T=Lp(e),k=Or(e,"readiness"),ee=jb(T,k),ne=c`${g}${h?zi(e):""}${ee}${k?zi(e):""}`,z=Qi(e.dependency_chips,g===""&&ee===""?"":ne),N=e.workspace_name?c`<span class="worker-card__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:"",D=Zi(e.cross_lane_chip),M=ts(u),q=Pp(e.from_id),G=!!(e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker)),P=!r&&(e.blocked===!0||e.queue_placeable===!1),$=Ji(u,!r);return c`<div
    class="worker-card${s?"":" worker-card--static"}${r?" worker-card--ineligible":""}${P?" worker-card--blocked":""}${$.tinted?" worker-card--route-bg":""}${e.search_match===!1?" is-dimmed":""}"
    draggable=${s?"true":"false"}
    data-bead-id=${e.id}
    data-lane=${e.lane}
    data-route=${cn($.route)}
  >
    <div class="worker-card__head">
      ${s?c`<span class="worker-card__grip" aria-hidden="true">⠿</span>`:""}
      <span class="worker-card__id" title="클릭하면 ID 복사">${e.id}</span
      >${ta(e.priority)}
      ${r?c`<button
            type="button"
            class="ctl-chip ctl-chip--label judgement-chip worker-card__ineligible"
            data-chip-key="ineligible"
            aria-expanded=${Or(e,"ineligible")?"true":"false"}
            title="worker-ineligible label이 붙어 워커 실행 대상이 아닙니다"
          >
            worker-ineligible
          </button>`:a?c`<button
              type="button"
              class="ctl-chip ctl-chip--label judgement-chip worker-card__session-preferred"
              data-chip-key="session_preferred"
              aria-expanded=${Or(e,"session_preferred")?"true":"false"}
              title=${l}
            >
              세션 권장
            </button>`:""}${ea(e.rec,Or(e,"rec"))}${Fb(u,Or(e,"qfr"))}
      ${h||k?"":zi(e)}
    </div>
    <div class="worker-card__title">${e.title}</div>
    ${u?ki(u,e.status,{onOpenDoc:n.onOpenDoc}):""}${z}
    ${N||D||M||q||G?c`<div class="worker-chips">
          ${N}${D}${M}${q}${es(e.exec_chips,{pin:n.exec_chips_mode==="pinned_only"})}
        </div>`:""}
    <div
      class="worker-card__foot${e.reason?"":" worker-card__foot--actions-only"}"
    >
      ${o?c`<div class="worker-card__place-menu">
            ${Kl(t.lanes,e.id)}
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
              title=${Zr({placeable:i,route_ok:e.route_ok,worker_ineligible:r,awaiting_user:_,missing_description:d,spec:e.placement_spec})}
            >
              ↴ 대기로
            </button>`}
    </div>
    ${Ns(e)}
  </div>`}function nr(e){let t=!!e.collapsible&&!!e.collapsed,n=typeof e.count=="number"?e.count:e.items.length,r=c`<span
      class="worker-pane__dot worker-pane__dot--${e.lane}"
      aria-hidden="true"
    ></span>
    <span class="worker-pane__title">${e.title}</span>
    ${t&&e.preview?c`<span class="worker-pane__preview">${e.preview}</span>`:""}
    <span class="worker-pane__count">${n}</span>
    ${typeof e.match_count=="number"?c`<span class="worker-pane__match">일치 ${e.match_count}</span>`:""}`;return c`<section
    class="worker-pane worker-pane--lane-${e.lane}${e.src?" worker-pane--src":""}${e.live?" worker-pane--live":""}${e.collapsible?" worker-pane--collapsible":""}${t?" worker-pane--collapsed":""}"
    id=${cn(e.id||void 0)}
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
                  </div>`:e.items.map(s=>e.lane==="candidate"?Yl(s,e.place_menu,{onOpenDoc:e.onOpenDoc}):Hn(s))}
          </div>`}
  </section>`}function xp(e,t,n){return c`<button
      type="button"
      class="worker-wait__area-toggle"
      data-area=${e}
      aria-expanded=${n?"false":"true"}
      aria-label=${`${t} ${n?"\uD3BC\uCE58\uAE30":"\uC811\uAE30"}`}
    >
      ${n?"\u25B8":"\u25BE"}
    </button>
    <span class="worker-wait__area-name">${t}</span>`}function sa(e){let t=e.parallel,n=e.serial,r=t.drop||{};return c`<div class="worker-wait">
    <section
      class="worker-wait__area worker-wait__area--parallel${t.collapsed?" is-collapsed":""}"
      data-area="parallel"
    >
      <header class="worker-wait__area-hd">
        ${xp("parallel","\uBCD1\uB82C \uC601\uC5ED",t.collapsed)}
        <span class="worker-wait__area-count">${t.count}</span>
      </header>
      ${t.collapsed?"":c`<div
            class="worker-wait__area-body"
            data-drop=${cn(r.drop)}
            data-root-dir=${cn(r.root_dir)}
            data-lane-id=${cn(r.lane_id)}
            data-lane-length=${cn(r.lane_length)}
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
        ${xp("serial","\uC9C1\uB82C \uC601\uC5ED",n.collapsed)}
        ${n.header_control?n.header_control:""}
      </header>
      ${n.collapsed?"":c`<div class="worker-wait__area-body">
            ${n.notice?n.notice:""}
            ${n.extra_panes?n.extra_panes:""}
            ${n.lanes.map(s=>Kb(s))}
          </div>`}
    </section>
  </div>`}function Kb(e){let t=e.drop||{},n=e.badge?c`<span
        class="worker-lane__badge${e.held?" worker-lane__badge--held":""}"
        >${e.badge}</span
      >`:"";return c`<div
    class="worker-wait__lane${e.empty?" worker-wait__lane--empty":""}"
  >
    ${nr({id:typeof e.pane_id=="string"?e.pane_id:`worker-pane-lane-${e.id}`,lane:e.id,title:e.title,items:[],count:e.count,match_count:e.match_count,empty:"\uBE44\uC5B4 \uC788\uC74C \u2014 \uD589\uC744 \uC5EC\uAE30\uB85C \uB4DC\uB798\uADF8",header_control:c`${n}${e.header_control?e.header_control:""}`,body:c`<div
        class="worker-wait__rows"
        data-drop=${cn(t.drop)}
        data-root-dir=${cn(t.root_dir)}
        data-lane-id=${cn(t.lane_id)}
        data-lane-length=${cn(t.lane_length)}
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
  </div>`}function oa(e){return e.count?c`<section
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
  </section>`:""}var Fp=[{step:"merge",label:"\uBA38\uC9C0",index:1},{step:"base",label:"base",index:2},{step:"verify",label:"\uAC80\uC99D",index:3},{step:"deploy",label:"\uBC30\uD3EC",index:4},{step:"child",label:"\uC790\uC2DD",index:5},{step:"branch",label:"\uBE0C\uB79C\uCE58",index:6},{step:"close",label:"close",index:7}],Eo=[{step:"base_containment",label:"base \uD3EC\uD568 \uD655\uC778"},{step:"repo_operations",label:"\uC800\uC7A5\uC18C \uC791\uC5C5"},{step:"post_merge_jobs",label:"\uBA38\uC9C0 \uD6C4 \uC7A1"},{step:"child_sweep",label:"\uC790\uC2DD \uC815\uB9AC"},{step:"branch_cleanup",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC"},{step:"parent_close",label:"\uBD80\uBAA8 close"}];function aa(e,t){let n=Fp.find(s=>s.step===e);if(!n)return null;let r=Fp.length;return{step:n.step,label:t,index:n.index,total:r,percent:Math.round(n.index/r*100)}}function Bp(e){let t=Eo.findIndex(n=>n.step===e);return Eo.map((n,r)=>({step:n.step,label:n.label,state:t<0?"todo":r<t?"done":r===t?"stall":"todo"}))}function ns(e){let t=Eo.find(n=>n.step===e);return t?t.label:typeof e=="string"?e:""}function Gb(e){let t=Eo.findIndex(n=>n.step===e);return t<0?null:{index:t+1,total:Eo.length}}function la(e){let t=Gb(e);return t?`\uBA38\uC9C0 \uC644\uB8CC \xB7 \uC815\uB9AC ${t.total}\uB2E8\uACC4 \uC911 ${t.index}\uB2E8\uACC4\uC5D0\uC11C \uBA48\uCDA4`:"\uBA38\uC9C0\uB428 \xB7 \uC815\uB9AC \uBBF8\uC644"}var Ql=new Set(["queued","running","retry_pending"]),Up=new Set(["failed","succeeded"]),Vb={queued:"\uB300\uAE30",running:"\uC911",retry_pending:"\uC7AC\uC2DC\uB3C4 \uB300\uAE30",failed:"\uC2E4\uD328",succeeded:"\uC644\uB8CC \xB7 \uC815\uB9AC \uC7AC\uC2DC\uB3C4 \uB300\uAE30"},To={base_containment:{step:"base",label:"base \uD655\uC778 \uC911"},child_sweep:{step:"child",label:"\uC790\uC2DD \uC815\uB9AC \uC911"},branch_cleanup:{step:"branch",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC \uC911"},parent_close:{step:"close",label:"\uBD80\uBAA8 close \uC911"}},Yb={merging:{step:"merge",label:"\uBA38\uC9C0 \uC911"},base_containment:To.base_containment,child_sweep:To.child_sweep,branch_cleanup:To.branch_cleanup,parent_close:To.parent_close};function Xb(e){return typeof e=="string"&&/^[0-9a-f]{40}$/.test(e)}function Qb(e,t,n){return!["verify","deploy"].includes(e.kind)||![...Ql,...Up].includes(e.state)||![null,void 0,""].includes(e.superseded_by)||!Array.isArray(e.subjects)?!1:e.subjects.some(r=>r&&typeof r=="object"&&r.bead_id===t&&r.merged_sha===n)}function Zb(e,t){let n=(t.kind==="deploy"?2:1)-(e.kind==="deploy"?2:1);if(n!==0)return n;let r=u=>u.state==="succeeded"?1:2,s=r(t)-r(e);if(s!==0)return s;let i=typeof e.requested_at=="number"?e.requested_at:0,o=typeof t.requested_at=="number"?t.requested_at:0;if(i!==o)return o-i;let a=typeof e.operation_id=="string"?e.operation_id:"",l=typeof t.operation_id=="string"?t.operation_id:"";return a.localeCompare(l)}function Xl(e,t=!1){let n=e.kind,r=n==="verify"?"\uAC80\uC99D":"\uBC30\uD3EC",s=t?"failed":e.state,i=Vb[s];if(!i)return null;let o=aa(n,`${r} ${i}`);return o?{...o,active:Ql.has(s),failed:s==="failed"}:null}function Jb(e){return!e||typeof e!="object"?null:Yb[e.step]||null}function Ro(e){if(!e||typeof e.bead_id!="string")return null;let t=e.bead_id,n=e.merge_progress&&typeof e.merge_progress=="object"?e.merge_progress:{},r=Jb(n),s=e.cleanup_failed&&typeof e.cleanup_failed=="object"?e.cleanup_failed:null,i=["post_merge_jobs","child_sweep","branch_cleanup","parent_close"].includes(typeof e.cleanup_cursor=="string"?e.cleanup_cursor:""),o=!i&&(e.cleanup_cursor==="repo_operations"||n.step==="repo_operations"),a=Xb(e.merge_sha)?e.merge_sha:null,l=!i&&a&&Array.isArray(e.repo_operations)?e.repo_operations.filter(g=>g&&typeof g=="object"&&Qb(g,t,a)).sort(Zb):[],u=o?l:[],d=u.find(g=>Ql.has(g.state));if(d)return Xl(d);if(s)return s.step==="repo_operations"&&l[0]?Xl(l[0],!0):null;let _=u.find(g=>Up.has(g.state)?g.state!=="succeeded"||e.cleanup_cursor==="repo_operations":!1);if(_)return Xl(_);if(r){let g=aa(r.step,r.label);return g?{...g,active:!0,failed:!1}:null}let m=typeof e.cleanup_cursor=="string"?To[e.cleanup_cursor]:null;if(!m)return null;let h=aa(m.step,m.label);return h?{...h,active:!0,failed:!1}:null}function ca(e){return!!e&&e.step!=="merge"&&e.failed!==!0}var ey="\uBBF8\uC801\uC7AC";function Zl(e,t){return`${e} ${t}`}function Jl(e,t,n,r){if(!n)return`${e} \u2014 ${t}`;let s=typeof r=="string"&&r.length>0?`\uB2E4\uB978 \uC800\uC7A5\uC18C(${r})`:"\uB2E4\uB978 \uC800\uC7A5\uC18C";return`${e} \u2014 ${t} \xB7 ${s}\uC758 \uC774\uC288\uB77C \uC5EC\uAE30\uC11C \uB2EB\uC744 \uC218 \uC5C6\uB2E4`}function ty(e){if(typeof e!="string"||e.length===0)return;let t=e.replace(/\/+$/,""),n=t.lastIndexOf("/"),r=t.slice(n+1);return r.length>0?r:void 0}function ec(e,t){let n=Qn(e,t.id),r=Zl("\u26D3",t.id);return{id:t.id,label:r,title:Jl(r,`\uC120\uD589 \u2014 close\uB420 \uB54C\uAE4C\uC9C0 \uCD9C\uBC1C\uD558\uC9C0 \uC54A\uB294\uB2E4 (${t.location_label})`,n,t.workspace_name),...n?{foreign:!0}:{}}}var ny=10080*60*1e3;function Wp(e,t,n){let r=t.closed_at;if(typeof r!="number"||!Number.isFinite(r)||r<n-ny)return null;let s=Qn(e,t.id),i=typeof t.root_dir=="string"?t.root_dir:"",o=Zl("\u{1F513}",t.id),a={id:t.id,label:o,title:Jl(o,`\uD574\uC81C \u2014 ${nn(r)}\uC5D0 close\uB418\uC5B4 \uC774 \uC774\uC288\uAC00 \uD480\uB838\uB2E4`,s,t.workspace_name),...s?{foreign:!0}:{}};return s?i.length>0&&(a.openable=!0,a.root_dir=i):a.openable=!0,a}function Hp(e,t,n,r){let s=Qn(e,t),i=Zl("\u{1F513}",t),o={id:t,label:i,title:Jl(i,"\uD574\uC81C \u2014 \uB354 \uC774\uC0C1 \uC774 \uC774\uC288\uB97C \uB9C9\uC9C0 \uC54A\uB294\uB2E4 \xB7 \uBCF5\uADC0 \uB300\uAE30",s,n),...s?{foreign:!0}:{}};return s?typeof r=="string"&&r.length>0&&(o.openable=!0,o.root_dir=r):o.openable=!0,o}function zp(e,t){let n=Array.isArray(t.ids)?t.ids.filter(i=>typeof i=="string"&&i.length>0):[],r=t.root_dirs&&typeof t.root_dirs=="object"?t.root_dirs:{},s=[];for(let i of[...new Set(n)].sort()){let o=Qn(e,i),a=typeof r[i]=="string"?r[i]:"",l={id:i,label:`\u2192 ${i}`,title:"\uD6C4\uC18D \u2014 \uC774 \uC774\uC288\uAC00 close\uB418\uBA74 \uD480\uB9B0\uB2E4",...o?{foreign:!0}:{}};a.length>0?(l.openable=!0,l.root_dir=a):o||(l.openable=!0),s.push(l)}return s}function Kp(e,t,n={}){let r=new Map,s=new Map;for(let i of t)s.has(i.id)||s.set(i.id,i.location_label);for(let[i,o]of e){if(typeof i!="string"||i.length===0)continue;let a=[];for(let l of Array.isArray(o)?o:[]){if(typeof l!="string"||l.length===0)continue;let u=n[l],d=ty(u),_=ec(i,{id:l,location_label:s.get(l)||ey,...d?{workspace_name:d}:{}});_.foreign!==!0?_.openable=!0:typeof u=="string"&&u.length>0&&(_.openable=!0,_.root_dir=u),a.push(_)}a.length>0&&r.set(i,a)}return r}var pa=1,jp=2e4,Co=[{value:"repo_spec",label:"\uB808\uD3EC \xB7 spec \uC6B0\uC120"},{value:"repo_updated",label:"\uB808\uD3EC \xB7 \uCD5C\uC2E0 \uC218\uC815"},{value:"updated_flat",label:"\uCD5C\uC2E0 \uC218\uC815(\uB808\uD3EC \uBB34\uC2DC)"}],Oo=[{value:"all",label:"\uC804\uCCB4"},{value:"ready",label:"\uCC29\uC218 \uAC00\uB2A5"},{value:"not_ready",label:"\uC900\uBE44 \uD544\uC694"}],ss=[{value:"quick_fix",label:"quick_fix"},{value:"spec_backed",label:"spec_backed"},{value:"full_plan",label:"full_plan"},{value:"unset",label:"unset"}];function rs(e){if(!Array.isArray(e))return[];let t=new Set(ss.map(r=>r.value)),n=[];for(let r of e)typeof r=="string"&&t.has(r)&&!n.includes(r)&&n.push(r);return n}function fa(e,t){let n=rs(e);return n.includes(t)?n.filter(r=>r!==t):rs([...n,t])}var qs={show_blocked:!0,readiness:"all",routes:[]},Gp={auto_merge:"\uC790\uB3D9 \uBA38\uC9C0",merged:"\uBA38\uC9C0",merge:"\uBA38\uC9C0",pr_stop:"PR \uC911\uB2E8",stopped:"\uC911\uB2E8",failed:"\uC2E4\uD328",refuted:"\uBC18\uC99D",no_delta:"\uBB34-delta"};function ry(e,t){let n=null;for(let r of Object.values(e||{}))!r||r.bead_id!==t||!fr(r)||(n=typeof r.status=="string"?r.status:null);return n}function sy(e,t){let n=null,r=-1/0;for(let s of Object.values(e)){if(!s||s.bead_id!==t||s.status==="running"||!fr(s))continue;let i=typeof s.finished_at=="number"?s.finished_at:typeof s.started_at=="number"?s.started_at:0;i>=r&&(r=i,n=s)}return n}function wp(e){let t=Xe(e),n=new Map;for(let r of Array.isArray(t.done)?t.done:[])r&&typeof r.bead_id=="string"&&typeof r.added_at=="number"&&n.set(r.bead_id,r.added_at);return new Set(ef(Xe(t.attempts),n).keys())}function ef(e,t,n={}){let{winners:r,resumed_from_ids:s}=jd(e,t),i=new Map;for(let[o,a]of r){let l=a.attempt,u=a.run_state;if(nf(l))continue;let d=a.started_at,_=typeof l.session_id=="string"&&l.session_id.length>0,h=Is(l.quickfix_landing)==="session",g=u!=="running"&&(_||!h)&&!s.has(l.attempt_id),T=!_&&h?"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":s.has(l.attempt_id)?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":null,k=Xe(n.observations?.[o]),ee=Xe(k.pr),ne=typeof l.merge_sha=="string"&&l.merge_sha.length>0||ee.state==="MERGED",z=_r(n.discard_operations,o,{attempt_id:l.attempt_id,merged:ne}),N=u==="failed"?Yp(l,{resume_eligible:g,resume_reason:T,confirmation:z.confirmation,history:n.bead_timelines?.[o]}):null;i.set(o,{...Vp(l,e,u,n.runner_catalog),started_at:d,...N?{failure:N}:{},can_pause:u==="running"&&_,...l.instructions_restart&&typeof l.instructions_restart=="object"?{instructions_restart:l.instructions_restart}:{},can_resume:g})}for(let[o,a]of py(e,t)){if(i.has(o)||a.run_state==="waiting"&&sf(n.admission,o))continue;let l=a.attempt,u=_r(n.discard_operations,o,{attempt_id:l.attempt_id}),d=rf(l),_=a.run_state==="provider_hold"?uy(l,{provider_hold:n.provider_hold,auto_resume_pending:n.auto_resume_pending,account_catalog:n.account_catalog,attempts:e,history:n.bead_timelines?.[o]}):null;i.set(o,{...Vp(l,e,a.run_state,n.runner_catalog),started_at:typeof l.started_at=="number"?l.started_at:null,...a.run_state==="parked"?{failure:Yp(l,{resume_eligible:!1,resume_reason:"\uC138\uC158 \uB300\uAE30 \u2014 [\uC138\uC158\uC5D0\uC11C \uD574\uACB0]\uB85C \uBB38\uC758\uB97C \uC774\uC5B4\uAC11\uB2C8\uB2E4",confirmation:u.confirmation,history:n.bead_timelines?.[o]})}:{},...a.run_state==="waiting"?{wait:oy(l)}:{},..._?{hold:_}:{},...d?{retry:d}:{},can_pause:!1,can_resume:a.run_state==="provider_hold"})}return i}function Vp(e,t,n,r=null){return{attempt_id:typeof e.attempt_id=="string"?e.attempt_id:"",run_state:n,last_event_at:typeof e.last_event_at=="number"?e.last_event_at:null,last_activity:e.last_activity&&typeof e.last_activity=="object"?e.last_activity:null,legs:Array.isArray(e.legs)?e.legs:[],runner:typeof e.runner=="string"?e.runner:null,model:typeof e.model=="string"?e.model:null,effort:typeof e.effort=="string"?e.effort:null,speed:typeof e.speed=="string"?e.speed:null,resumed_from:typeof e.resumed_from=="string"?e.resumed_from:null,continuation_mode:e.continuation_mode==="session"||e.continuation_mode==="fresh"?e.continuation_mode:null,status:typeof e.status=="string"?e.status:null,usage:pr(t,e.bead_id,r)}}function Yp(e,t){let n=e.cause_detail&&typeof e.cause_detail=="object"?e.cause_detail:null;return{cause:typeof e.cause=="string"?e.cause:null,cause_detail:n,summary:n&&typeof n.summary=="string"?n.summary:null,bead_id:typeof e.bead_id=="string"?e.bead_id:"",finished_at:typeof e.finished_at=="number"?e.finished_at:null,runner:typeof e.runner=="string"?e.runner:null,model:typeof e.model=="string"?e.model:null,effort:typeof e.effort=="string"?e.effort:null,observed_effort:typeof e.observed_effort=="string"?e.observed_effort:null,speed:typeof e.speed=="string"?e.speed:null,attempt_id:typeof e.attempt_id=="string"?e.attempt_id:"",usage:e.usage&&typeof e.usage=="object"?e.usage:null,halted_auto_advance:e.halted_auto_advance===!0,quickfix_lane:e.quickfix_lane===!0,quickfix_landing:e.quickfix_landing&&typeof e.quickfix_landing=="object"?e.quickfix_landing:null,retry:rf(e),resume_eligible:t.resume_eligible,resume_reason:t.resume_reason,...e.continuation_choice==="prior_attempt"?{continuation_choice:"prior_attempt"}:{},landed:Op(e),confirmation:t.confirmation,...tf(t.history)}}function tf(e){if(!e||typeof e!="object")return{};let t=Array.isArray(e.events)?e.events:[],n=[];for(let s of t)!s||typeof s!="object"||typeof s.summary!="string"||s.summary.length===0||n.push({event_id:typeof s.event_id=="string"?s.event_id:"",kind:typeof s.kind=="string"?s.kind:"",summary:s.summary,at:typeof s.at=="number"?s.at:null});n.reverse();let r=typeof e.log_path=="string"&&e.log_path.length>0?e.log_path:null;return{...n.length>0?{timeline:n}:{},...r===null?{}:{log_path:r},...e.log_expired===!0?{log_expired:!0}:{},...e.log_unreadable===!0?{log_unreadable:!0}:{}}}function oy(e){let t=e.cause_detail&&typeof e.cause_detail=="object"?e.cause_detail:null,n=Array.isArray(t?.blockers)?t.blockers:[],r=[];for(let s of n)!s||typeof s!="object"||typeof s.id!="string"||s.id.length===0||r.push({id:s.id,rig:typeof s.rig=="string"?s.rig:null,status:typeof s.status=="string"?s.status:""});return{summary:t&&typeof t.summary=="string"?t.summary:null,blockers:r,since:typeof e.finished_at=="number"?e.finished_at:null}}function nf(e){return e?.status==="paused"&&typeof e.cause=="string"&&e.cause.startsWith("provider_outage:")}function iy(e,t){let n=typeof e.runner=="string"?e.runner:"",r=Xe(t)[n];return!r||!Array.isArray(r.targets)?null:r.targets.find(s=>Array.isArray(s?.attempt_ids)&&s.attempt_ids.includes(e.attempt_id))||null}function ay(e,t){if(e===null)return null;let n=Xe(t).claude;if(!Array.isArray(n))return null;let r=n.find(s=>s?.email===e);return r&&typeof r.alias=="string"&&r.alias.length>0?r.alias:null}function ly(e,t){let n=e,r=new Set;for(;n&&!r.has(n.attempt_id);){if(r.add(n.attempt_id),n.auto_resume_kind==="provider_outage")return!0;n=typeof n.resumed_from=="string"?t[n.resumed_from]:null}return!1}function cy(e,t,n,r){if((Array.isArray(r.auto_resume_pending)?r.auto_resume_pending:[]).some(o=>o?.attempt_id===e.attempt_id))return"pending";let i=e.auto_resume_refused;return typeof i=="string"&&i.length>0?`refused:${i}`:n.startsWith("auto_resume_disarmed:")||t?.auto_switch==="cap"||ly(e,r.attempts)?"disarmed":null}function uy(e,t){let n=e.cause.slice(16),r=e.cause_detail&&typeof e.cause_detail=="object"?e.cause_detail:null,s=iy(e,t.provider_hold),i=typeof s?.model=="string"&&s.model.length>0?s.model:typeof e.model=="string"&&e.model.length>0?e.model:null,o=typeof s?.account=="string"&&s.account.length>0?s.account:typeof e.claude_account=="string"&&e.claude_account.length>0?e.claude_account:null,a=typeof s?.last_error=="string"?s.last_error:"",l=cy(e,s,a,{auto_resume_pending:t.auto_resume_pending,attempts:t.attempts}),u=typeof s?.resets_at=="number"?s.resets_at:typeof r?.resets_at=="number"?r.resets_at:null,d=typeof s?.next_probe_at=="number"?s.next_probe_at:null,_=ay(o,t.account_catalog),m=tf(t.history);return{kind:s?.kind==="usage_limit"||n==="usage_limit"?"usage_limit":"outage",detail:n,...typeof r?.message=="string"?{message:r.message}:{},...typeof r?.summary=="string"?{summary:r.summary}:{},...i||o?{target:{...i?{model:i}:{},...o?{account:o}:{},..._?{account_alias:_}:{}}}:{},...u===null?{}:{resets_at:u},...l===null?{}:{auto_resume:l},...s?.auto_switch==="none"||s?.auto_switch==="disabled"?{auto_switch:s.auto_switch}:{},...d===null?{}:{next_probe_at:d},...m.log_path?{log_path:m.log_path}:{}}}function rf(e){let t=e&&e.retry&&typeof e.retry=="object"?e.retry:null;return t?{cause:typeof t.cause=="string"?t.cause:null,attempts:typeof t.attempts=="number"?t.attempts:0,max:typeof t.max=="number"?t.max:0,next_at:typeof t.next_at=="number"?t.next_at:null}:null}var dy=new Set(["parked","retry_wait","waiting"]);function py(e,t){let n=Object.values(e||{}),r=new Set(n.map(o=>o?.resumed_from).filter(o=>typeof o=="string")),s=new Map;for(let o of n)o&&typeof o.bead_id=="string"&&fr(o)&&s.set(o.bead_id,o.attempt_id);let i=new Map;for(let o of n){let a=nf(o);if(!o||typeof o.bead_id!="string"||o.bead_id.length===0||!fr(o)||!dy.has(o.status)&&!a||s.get(o.bead_id)!==o.attempt_id||typeof o.dismissed_at=="number"||a&&r.has(o.attempt_id))continue;let l=t.get(o.bead_id);typeof l=="number"&&l>0&&typeof o.finished_at=="number"&&l>=o.finished_at||i.set(o.bead_id,{attempt:o,run_state:a?"provider_hold":o.status})}return i}function Xp(e,t){let n=e[t];if(!n)return"";if(n.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let r=typeof n.reason=="string"?n.reason:"";if(r==="grace_period")return"";if(r==="prerequisite_unmet"&&Array.isArray(n.blockers)&&n.blockers.length>0)return"\u26D3 \uC120\uD589 \uB300\uAE30";let s=r.indexOf(":");return s>0&&s<r.length-1?`\u26D4 ${r.slice(0,s)} (${r.slice(s+1)})`:`\u26D4 ${r}`}function sf(e,t){let n=Xe(Xe(e)[t]),r=Xe(n.stale_work);return n.reason==="worktree_stale_work"&&typeof r.action_id=="string"&&r.action_id.length>0}function Xe(e){return e&&typeof e=="object"?e:{}}function rc(e){if(typeof e!="string"||e.length===0)return;let t=e.replace(/\/+$/,""),n=t.lastIndexOf("/"),r=t.slice(n+1);return r.length>0?r:void 0}function fy(e){let t=Xe(e).badge_codes;return Array.isArray(t)?t.filter(n=>typeof n=="string"&&n.length>0):[]}function _y(e,t,n){let r=Xe(t);if(Object.keys(r).length===0)return null;let s=e.execution_defaults,i=e.runner_catalog,o=e.session_defaults;if(!s||!i||!o)return null;let a=m=>In({pin:m,global:o,execution_defaults:s,runner_catalog:i,route:n}),l,u;try{l=a(r),u=a(null)}catch{return null}let d=Qp(Os(l,i),Os(u,i)),_=Qp(Xr(l,null),Xr(u,null));return d||_?{orchestration:d,worker:_}:null}function Qp(e,t){return!e||t&&t.text===e.text?null:e}function my(e,t,n){let s=(t&&typeof t=="object"&&Array.isArray(t.released_by)?t.released_by:[]).filter(o=>o&&typeof o=="object"&&typeof o.id=="string").slice().sort((o,a)=>(typeof a.closed_at=="number"?a.closed_at:0)-(typeof o.closed_at=="number"?o.closed_at:0)),i=[];for(let o of s){let a=typeof o.workspace_name=="string"&&o.workspace_name.length>0?o.workspace_name:rc(o.root_dir),l=Wp(e,{...o,...a?{workspace_name:a}:{}},n);l&&i.push(l)}return i.length===0?null:i}function oc(e,t){return typeof e!="string"||e.length===0||typeof t!="string"||t.length===0||t===e?null:`\u2192 ${t}`}var gy=new Set(["quick_fix","spec_backed","full_plan"]);function Zp(e){return typeof e=="string"&&gy.has(e)}function hy(e){let t={...Xe(e.session_defaults)};for(let n of["orchestration_model","orchestration_effort","orchestration_speed","quick_fix_orchestration_model","quick_fix_orchestration_effort","quick_fix_orchestration_speed"]){let r=e[n];typeof r=="string"&&(t[n]=r)}return t}function Jp(e,t,n){let r=e.runner_catalog??null,s=sc(e,t,n,null);if(!s)return null;let i=Wn(r,s.orchestration_model.value??""),o=i===null?s:sc(e,t,n,i)||s,a=Os(o,r),l=Xr(o,i);return a||l?{orchestration:a,worker:l}:null}function sc(e,t,n,r){let s=Zp(n)?n:Zp(t.route)?t.route:null;try{return In({pin:t,global:hy(e),execution_defaults:e.execution_defaults??null,runner_catalog:e.runner_catalog??null,route:s,controller_runtime:r})}catch{return null}}function by(e,t,n){return!t||!Object.hasOwn(t,"metadata")?null:Xr(sc(e,Xe(t.metadata),t.route,n),n)}function yy(e){if(!e)return null;let t=Fi(e),n=cp(e.impl_actor);return t||n?{orchestration:t,worker:n}:null}function ia(e){if(!e)return null;let t=Xe(e),n=Xe(t.chips),r=typeof n.route=="string"&&n.route.length>0?n.route:typeof t.route=="string"&&t.route.length>0?t.route:"",s=n.route_source==="derived"||t.route_source==="derived";return r.length===0||s?"unset":r}function vy(e){return ia(e.workflow)??"unset"}function ic(e,t){let n=new Set,r=e;for(;r&&!n.has(r.attempt_id);){if(r.conflict_resolution===!0)return!0;n.add(r.attempt_id),r=typeof r.resumed_from=="string"&&r.resumed_from.length>0&&t.get(r.resumed_from)||null}return!1}function ky(e){let t={};for(let a of Jn)t[a]=0;let n=!1,r=0,s=0,i=0;for(let a of e){let l=a.usage;if(!l||typeof l!="object")continue;let u=!1;for(let d of Jn)Number.isFinite(l[d])&&(t[d]+=l[d],n=!0,u=!0);u&&(s+=1,Number.isFinite(l.total_cost_usd)&&(r+=l.total_cost_usd,i+=1))}s>0&&i===s&&(t.total_cost_usd=r);let o=e.map(a=>a.usage).filter(a=>a&&typeof a=="object"&&a.providers);return o.length>0?mn(Ti(o)):n?dr(t):null}function of(e,t){let n=vo(e,t);return n==="internal"?"\uBBF8\uC801\uC7AC":n==="external"?"\uC678\uBD80":"\uC704\uCE58 \uBBF8\uD655\uC778"}function wy(e,t,n){let r=t.get(e);if(!r)return of(e,n);if(typeof r.position=="number"){if(r.lane==="parallel")return`#${r.position}`;if(/^s[1-5]$/.test(r.lane))return`${r.lane} #${r.position}`}return yo(r)}function $y(e,t,n,r,s,i){let o=t.get(e);if(!o)return{label:i&&vo(e,n)==="internal"?"\uC9C4\uD589 \uB300\uAE30":of(e,n),title:""};if(o.state==="runnable"&&i&&vo(e,n)==="internal")return{label:"\uC9C4\uD589 \uB300\uAE30",title:""};if(typeof o.position=="number"&&(o.lane==="parallel"||/^s[1-5]$/.test(o.lane))){let l=r.get(e),u=o.lane==="parallel"?"\uBCD1\uB82C":o.lane,d=s.get(e);return{label:!!d&&d.reason==="prerequisite_unmet"&&Array.isArray(d.blockers)&&d.blockers.length>0?"\u26D3 \uC120\uD589 \uB300\uAE30":l&&l.length>0?"\u{1F512} \uB300\uAE30":"\uB300\uAE30",title:`${o.workspace_name||o.root_dir} ${u} #${o.position}`}}return{label:o.state==="running"?"\u25B6 \uC2E4\uD589\uC911":yo(o),title:""}}function xy(e,t){for(let n of Object.values(e||{}))if(n&&n.attempt_id===t&&typeof n.armed_by_lane=="string"&&n.armed_by_lane.length>0)return n.armed_by_lane;return null}function Ay(e,t,n,r,s,i){return t==="draft"?{state:"draft",badge:"draft",run_label:null,can_stop:!1}:n.some(o=>i.failed_by_bead.get(o.id)===e)?{state:"failed",badge:"\u26D4 \uC2E4\uD328",run_label:"\u25B6 \uB2E4\uC2DC \uC9C4\uD589",can_stop:!1}:i.disarmed_lanes.has(e)?{state:"restart",badge:"\u23F8 \uC7AC\uC2DC\uC791",run_label:"\u25B6 \uC9C4\uD589",can_stop:!1}:n.some(o=>i.armed_by_bead.get(o.id)===e)?{state:"running",badge:"\u25B6 \uC9C4\uD589 \uC911",run_label:s.length>0?"\u25B6 \uC774\uC5B4\uC11C \uC9C4\uD589":null,can_stop:!0}:r?{state:"all_done",badge:"\uBAA8\uB450 \uC644\uB8CC",run_label:null,can_stop:!1}:{state:"confirmed",badge:"\uD655\uC815",run_label:"\u25B6 \uC9C4\uD589",can_stop:!1}}function da(e,t){return`${typeof e=="string"?e:""}\0${t}`}function Sy(e,t,n,r,s,i,o,a,l){let u=[];return e.forEach((d,_)=>{let m=typeof d.id=="string"?d.id:"";if(m.length===0)return;let h=d.status==="confirmed"?"confirmed":"draft",g=Array.isArray(d.entries)?d.entries:[],T=[];g.forEach((z,N)=>{let D=z&&typeof z.bead_id=="string"?z.bead_id:"";if(D.length===0)return;let M=z&&typeof z.root_dir=="string"?z.root_dir:"",q=n.get(D),G=q?q.state:void 0,P=G==="running"||G==="pr_wait"||G==="done",$=!q||G==="runnable",O=q&&q.lane==="parallel"&&typeof q.position=="number"?q.position-1:null,C=$y(D,n,r,t,a,h==="confirmed"),oe=T.length>0?T[T.length-1]:null,ue=h==="confirmed"&&oe!==null&&!oe.done&&!(t.get(D)||[]).includes(oe.id),me=l.get(da(M.length>0||!q?M:q.root_dir,D))||null;T.push({id:D,title:s.get(D)||D,route:me?me.route:null,route_source:me?me.route_source:null,exec_chips:me?me.exec_chips:null,added_at:me?me.added_at:null,root_dir:q?q.root_dir:M,workspace_name:q?q.workspace_name:i.get(M)||"",seq:N+1,location_label:C.label,location_title:C.title,draggable:!P,fixed:P,done:G==="done",unplaced:$,mismatch:ue,...O!==null?{queue_index:O}:{}})}),T.forEach((z,N)=>{z.seq=N+1});let k=T.length>0&&T.every(z=>z.done),ee=T.filter(z=>!z.fixed&&o.armed_by_bead.get(z.id)!==m).map(z=>z.id),ne=Ay(m,h,T,k,ee,o);u.push({lane_id:m,status:h,draft:h==="draft",number:_+1,label:`\uC5F0\uACB0 ${_+1} \xB7 \uB808\uD3EC \uAC04`,rows:T,all_done:k,can_confirm:h==="draft"&&T.length>=2,has_mismatch:h==="confirmed"&&T.some(z=>z.mismatch),unlaunched:ee,...ne})}),u}function Ey(e,t,n){if(e.lane==="runnable"){let o=n.get(e.id);return o?o.length===0?{scope:[],state:"missing"}:{scope:o,state:"declared"}:{scope:[],state:void 0}}let r=t.get(e.root_dir),s=r?r[e.id]:void 0;if(!s||!Array.isArray(s.scope))return{scope:[],state:void 0};let i=s.scope.filter(o=>typeof o=="string"&&o.length>0);return{scope:i,state:i.length===0?"missing":"declared"}}function Ty(e,t,n,r,s){let i=new Map;for(let l of[...e.running,...e.queue,...e.runnable,...e.pr_wait]){if(!t.has(l.root_dir))continue;let u=`${l.root_dir}\0${l.id}`,d=i.get(u);if(d){d.cards.push(l);continue}let{scope:_,state:m}=Ey(l,t,n);m!==void 0&&(l.scope_state=m),i.set(u,{cards:[l],scope:_})}let o=new Map;for(let l of i.values()){let u=l.cards[0].scope_state;if(u!==void 0)for(let m of l.cards)m.scope_state=u;if(l.scope.length===0)continue;let d=l.cards[0].root_dir,_=o.get(d);_?_.push(l):o.set(d,[l])}let a=(l,u,d)=>{let _=u.cards[0],m={id:_.id,title:_.title,location_label:wy(_.id,r,s),prefixes:d,...typeof _.root_dir=="string"&&_.root_dir.length>0?{root_dir:_.root_dir}:{}};for(let h of l.cards)h.overlap_chips?h.overlap_chips.push(m):h.overlap_chips=[m]};for(let l of o.values())for(let u=0;u<l.length;u+=1)for(let d=u+1;d<l.length;d+=1){let _=Wi(l[u].scope,l[d].scope);_.length!==0&&(a(l[u],l[d],_),a(l[d],l[u],_))}}function tc(e,t,n,r){let s=n?n.get(t)?.root_dir:void 0,i=r?r[t]:void 0,o=!Qn(e.id,t),a=typeof e.root_dir=="string"?e.root_dir:"",l=typeof s=="string"&&s.length>0?s:typeof i=="string"&&i.length>0?i:o&&a.length>0?a:"";return l.length>0?{openable:!0,root_dir:l}:o?{openable:!0}:{}}function Ry(e,t,n,r){let s=new Set(e?e.ids:[]);for(let a of t&&Array.isArray(t.ids)?t.ids:[])typeof a=="string"&&a.length>0&&s.add(a);if(s.size===0)return{ids:[]};let i={},o={...e?e.root_dirs:{},...t&&t.root_dirs&&typeof t.root_dirs=="object"?t.root_dirs:{}};for(let a of s){let l=o[a];if(typeof l=="string"&&l.length>0){i[a]=l;continue}if(!Qn(n.id,a)){n.root_dir.length>0&&(i[a]=n.root_dir);continue}let u=r.get(a)?.root_dir;typeof u=="string"&&u.length>0&&(i[a]=u)}return{ids:[...s],root_dirs:i}}function nc(e){if(typeof e=="number")return Number.isFinite(e)?e:null;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:null}return null}function ua(e){if(typeof e=="number"&&Number.isFinite(e))return e;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:0}return 0}function Cy(e){let t=typeof e=="string"?e.trim().toLowerCase():"";return t.length===0?null:n=>{let r=typeof n.id=="string"?n.id.toLowerCase():"",s=typeof n.title=="string"?n.title.toLowerCase():"";return r.includes(t)||s.includes(t)}}function Oy(e,t){let n=[e.runnable,e.runnable_all,e.queue,e.running,e.pr_wait,e.done,e.parallel_rows];for(let s of e.runnable_sections)n.push(s.items);let r=[];for(let s of e.queue_groups){n.push(s.items,s.sublanes.parallel);for(let i of s.sublanes.serial)n.push(i.items),r.push(i.occupants)}for(let s of n)for(let i of s)i.search_match=t(i);for(let s of r)for(let i of s)i.search_match=t(i)}function Ir(e,t,n){let r=Array.isArray(e)?e:[],s=Array.isArray(t)?t:[],i=n&&typeof n.done_since=="number"?n.done_since:void 0,o={...qs,...n&&n.candidate_filter?n.candidate_filter:{}},a=n&&Object.hasOwn(n,"cross_lanes")?n.cross_lanes??null:void 0,l=n&&n.candidate_sort==="as_given"?"as_given":n&&Co.some(w=>w.value===n.candidate_sort)?n.candidate_sort:"repo_spec",u=n&&n.groups==="all"?"all":"nonempty",d=n&&n.candidate_hidden_counts==="per_control"?"per_control":"sequential",_=Date.now(),m=new Map;for(let w of s)w&&typeof w.root_dir=="string"&&m.set(w.root_dir,w);let h=new Map;for(let w of s)w&&typeof w.root_dir=="string"&&h.set(w.root_dir,w.name||w.root_dir);for(let w of r)w&&typeof w.root_dir=="string"&&h.set(w.root_dir,w.name||w.root_dir);let g=[],T=[],k=[],ee=[],ne=[],z=[],N=new Map,D=new Map,M=new Map,q=new Map,G=new Map,P=new Map,$=new Map,O=new Map,C=new Map,oe=new Map,ue=new Map,me=new Map,V=new Map,ie=new Map,de=new Map,Oe=new Map,qe=new Set,Ie=new Map,ge=new Map,F=new Map;for(let w of r){if(!w||typeof w.root_dir!="string")continue;let se=w.root_dir,De=w.name||se,Se=m.get(se),Me=Se&&typeof Se.revision=="number"?Se.revision:typeof w.revision=="number"?w.revision:0,We=Xe(w.attempts),tt=Se&&Se.runner_catalog||w.runner_catalog||null,It=Xe(w.bead_titles);for(let[p,f]of Object.entries(It))typeof f=="string"&&f.length>0&&F.set(p,f);let _e=Xe(w.bead_times),xe=Xe(w.pr_observations),Ze=Xe(w.admission),yt=Xe(w.blocker_workspaces);me.set(se,yt);for(let[p,f]of Object.entries(Ze))f&&typeof f=="object"&&ue.set(p,f);let it=Xe(w.revise_parked),ut=Xe(w.merge_queue_state),bt=Xe(w.cleanup_failed),st=Xe(w.discard_operations),ze=Xe(w.bead_timelines),E=Xe(w.bead_blocked_by);Object.hasOwn(w,"bead_scope")&&Ie.set(se,Xe(w.bead_scope));let K=Xe(w.bead_workflow),X=Xe(w.pr_activity),Ee=Array.isArray(w.repo_operations)?w.repo_operations:[];O.set(se,Ee);let ye=typeof w.declared_base=="string"?w.declared_base:null;$.set(se,ye),P.set(se,Object.entries(bt).map(([p,f])=>({bead_id:p,step:f&&f.step?f.step:"",reason:f&&f.reason?f.reason:"",at:f&&typeof f.at=="number"?f.at:null,detail:f&&typeof f.detail=="string"?f.detail:null,output_tail:f&&typeof f.output_tail=="string"&&f.output_tail?f.output_tail:void 0,log_path:f&&typeof f.log_path=="string"&&f.log_path?f.log_path:void 0,retry_count:f&&typeof f.retry_count=="number"&&Number.isInteger(f.retry_count)&&f.retry_count>0?f.retry_count:0,failure_code:f&&typeof f.failure_code=="string"?f.failure_code:void 0})));for(let[p,f]of Object.entries(Xe(w.bead_overlay)))f&&typeof f=="object"&&C.set(`${se}\0${p}`,f);let wt=new Map;for(let p of Object.values(We))p&&typeof p.attempt_id=="string"&&wt.set(p.attempt_id,p);let kt=Array.isArray(w.merge_queue)?w.merge_queue:[],Rt=new Set(kt.filter(p=>p&&typeof p.bead_id=="string").map(p=>p.bead_id)),jt=new Map(kt.filter(p=>p&&typeof p.bead_id=="string").map(p=>[p.bead_id,p])),Wt=new Map,Xt=new Map,an=new Map,$t=new Map;kt.forEach((p,f)=>{p&&typeof p.bead_id=="string"&&(Wt.set(p.bead_id,f+1),Xt.set(p.bead_id,p.resolution),an.set(p.bead_id,p.continuation_action||null),$t.set(p.bead_id,p.authority||null))});let rn=Xe(w.auto_merge_skips),fn=p=>{let f=rn[p];if(!f)return null;let x=Xe(Xe(xe[p]).pr).head_sha;return x&&x===f.head_sha?f.reason||"":null};G.set(se,{positions:Wt,resolutions:Xt,continuations:an,authorities:$t,state:{active:typeof ut.active=="string"?ut.active:null,failures:Xe(ut.failures),waiting:ut.waiting&&typeof ut.waiting.bead_id=="string"&&typeof ut.waiting.reason=="string"?ut.waiting:null},auto_excluded:(Array.isArray(w.pr_wait)?w.pr_wait:[]).map(p=>p&&p.bead_id).filter(p=>typeof p=="string"&&fn(p)!==null),running:kt.length>0});let qt=Array.isArray(w.queue)?w.queue:[];for(let p of[...qt,...(Array.isArray(w.serial_lanes)?w.serial_lanes:[]).flatMap(f=>Array.isArray(f?.entries)?f.entries:[]),...Array.isArray(w.pr_wait)?w.pr_wait:[]])p&&typeof p.bead_id=="string"&&typeof p.armed_by_lane=="string"&&p.armed_by_lane.length>0&&de.set(p.bead_id,p.armed_by_lane);for(let p of Array.isArray(w.disarmed_on_load)?w.disarmed_on_load:[])typeof p=="string"&&p.length>0&&qe.add(p);let Gt=(Array.isArray(w.serial_lanes)?w.serial_lanes:[]).filter(p=>p&&/^s[1-5]$/.test(p.id)&&Array.isArray(p.entries)),sn=Xe(w.lane_states),Ke=typeof w.serial_lane_count=="number"?Math.max(0,Math.min(5,Math.floor(w.serial_lane_count))):Math.min(5,Gt.length);M.set(se,Ke),q.set(se,qt.length);let L=new Map(Gt.map(p=>[p.id,p])),ve=new Map;for(let p of Gt)for(let f of p.entries)f&&typeof f.bead_id=="string"&&ve.set(f.bead_id,p.id);for(let[p,f]of Object.entries(Xe(w.bead_dependents))){let x=Array.isArray(f?.ids)?f.ids:[],S=Xe(f?.root_dirs),Z=ie.get(p)||{ids:new Set,root_dirs:{}};for(let ae of x)typeof ae=="string"&&ae.length>0&&Z.ids.add(ae);for(let[ae,he]of Object.entries(S))typeof he=="string"&&he.length>0&&(Z.root_dirs[ae]=he);ie.set(p,Z)}for(let[p,f]of Object.entries(E))Array.isArray(f)&&oe.set(p,f.filter(x=>typeof x=="string"&&x.length>0));let je=Array.isArray(w.done)?w.done:[];for(let p of je)p&&typeof p.bead_id=="string"&&z.push({id:p.bead_id,root_dir:se,workspace_name:De});let xt=new Map;for(let p of je)p&&typeof p.bead_id=="string"&&typeof p.added_at=="number"&&xt.set(p.bead_id,p.added_at);let Ve=p=>({id:p,title:It[p]||p,root_dir:se,workspace_name:De,expected_revision:Me,draggable:!1,...Xe(_e[p]).created_at?{created_at:Xe(_e[p]).created_at}:{},...Xe(_e[p]).updated_at?{updated_at:Xe(_e[p]).updated_at}:{}}),Dt=p=>{let f=K[p]?.chips?.pr;return f&&typeof f.number=="number"&&typeof f.url=="string"?{pr_number:f.number,pr_url:f.url}:{}},Ht=p=>Object.hasOwn(E,p)?{blocked_by:Array.isArray(E[p])?E[p].filter(f=>typeof f=="string"&&f.length>0):[]}:{},at=(p,f)=>{let x=Ht(p),S=Ze[p],Z=S&&S.reason==="prerequisite_unmet"&&Array.isArray(S.blockers)?S.blockers:[],ae=(f?.blockers||[]).map(He=>He.id).filter(He=>typeof He=="string"&&He.length>0);if(f&&Object.hasOwn(E,p)){let He=x.blocked_by||[],pt=ae.filter(Ft=>!He.includes(Ft));return pt.length>0&&V.set(`${se}\0${p}`,pt),{blocked_by:He,wait:{...f,returning:He.length===0}}}let he=[...ae,...Z.map(He=>He.id)].filter(He=>typeof He=="string"&&He.length>0);if(he.length===0)return f?{...x,wait:{...f,returning:!1}}:x;let Ue=[...x.blocked_by||[]];for(let He of he)Ue.includes(He)||Ue.push(He);return{blocked_by:Ue,...f?{wait:{...f,returning:!1}}:{}}},Ct=new Set;for(let[p,f]of ef(We,xt,{discard_operations:st,observations:xe,bead_timelines:ze,provider_hold:Xe(w.provider_hold),auto_resume_pending:Array.isArray(w.auto_resume_pending)?w.auto_resume_pending:[],account_catalog:Xe(w.account_catalog),runner_catalog:tt,admission:Ze})){Ct.add(p);let x=f.run_state==="failed"?xy(We,f.attempt_id):null;x!==null&&Oe.set(p,x);let S=wt.get(f.attempt_id)||null,Z=C.get(`${se}\0${p}`),ae=Z&&Z.rollup?Z.rollup:null,he=oc(ye,S?S.target_base:null),Ue=S?ic(S,wt):!1,He=S&&S.quickfix_lane===!0&&S.quickfix_landing&&typeof S.quickfix_landing=="object"?S.quickfix_landing:null,pt=He&&typeof He.reason=="string"&&He.reason.length>0?He.reason:null,Ft=He?Ro({bead_id:p,merge_sha:He.head_sha,cleanup_cursor:He.cursor,cleanup_failed:pt?{step:He.cursor,reason:pt}:null,repo_operations:Ee}):null,A=at(p,f.wait);T.push({...Ve(p),lane:"running",...A,...ve.has(p)?{serial_lane_id:ve.get(p)}:{},attempt_id:f.attempt_id,run_state:f.run_state,status:f.status||void 0,workflow:K[p]||null,can_pause:f.can_pause,...f.instructions_restart?{instructions_restart:f.instructions_restart}:{},can_resume:f.can_resume,started_at:f.started_at,last_event_at:f.last_event_at,last_activity:f.last_activity,legs:f.legs,runner:f.runner,model:f.model,effort:f.effort,speed:f.speed,resumed_from:f.resumed_from,continuation_mode:f.continuation_mode,usage:f.usage,failure:f.failure||null,hold:f.hold||null,wait:A.wait||f.wait||null,retry:f.retry||null,exec_chips:{orchestration:Fi(f),worker:by(Xe(Se),Z,f.runner||null)},discard:_r(st,p,{attempt_id:f.attempt_id,merged:f.failure?.confirmation==="merged"||Xe(xe[p]).pr?.state==="MERGED"}),...ae?{rollup:ae}:{},...Ue?{conflict_resolution:!0}:{},...he?{base_exception:he}:{},...Ft?{landing:Ft}:{},badges:f.run_state==="paused"?["\u23F8 \uC77C\uC2DC\uC815\uC9C0"]:f.run_state==="failed"?["\u26A0 \uC2E4\uD328"]:f.run_state==="parked"?["\u23F8 \uC138\uC158 \uB300\uAE30"]:f.run_state==="retry_wait"?["\u21BB \uC7AC\uC2DC\uB3C4 \uB300\uAE30"]:f.run_state==="waiting"?["\u26D3 \uC120\uD589 \uB300\uAE30"]:f.run_state==="provider_hold"?["\uACF5\uAE09\uC790 \uBCF4\uB958"]:[],alert:f.run_state==="failed"})}for(let[p,f]of qd(We)){if(T.some(S=>S.id===p))continue;let x=f.attempt;T.push({...Ve(p),lane:"running",kind:"session",...Ht(p),attempt_id:typeof x.attempt_id=="string"?x.attempt_id:"",run_state:"running",status:"running",non_occupying:!0,workflow:K[p]||null,can_pause:!1,can_resume:!1,started_at:f.started_at,last_event_at:typeof x.last_event_at=="number"?x.last_event_at:null,last_activity:x.last_activity&&typeof x.last_activity=="object"?x.last_activity:null,legs:Array.isArray(x.legs)?x.legs:[],runner:typeof x.runner=="string"?x.runner:null,model:typeof x.model=="string"?x.model:null,effort:typeof x.effort=="string"?x.effort:null,speed:typeof x.speed=="string"?x.speed:null,resumed_from:null,continuation_mode:null,usage:x.usage&&typeof x.usage=="object"?x.usage:null,exec_chips:{orchestration:Fi(x),worker:null},discard:_r(st,p,{merge_queued:!0}),badges:[f.origin==="auto"?"\uB9AC\uBDF0 \xB7 \uC790\uB3D9":"\uB9AC\uBDF0"],alert:!1})}for(let p of Array.isArray(w.session_active)?w.session_active:[]){let f=p&&p.bead_id;typeof f!="string"||Ct.has(f)||(Ct.add(f),Array.isArray(p.blocked_by)&&p.blocked_by.length>0&&oe.set(f,p.blocked_by.filter(x=>typeof x=="string"&&x.length>0)),typeof p.title=="string"&&p.title.length>0&&F.set(f,p.title),T.push({...Ve(f),title:p.title||It[f]||f,lane:"running",kind:"session",status:"in_progress",started_at:nc(p.started_at)??nc(p.updated_at)??void 0,updated_at:nc(p.updated_at)??void 0,workflow:p.workflow||null,labels:Array.isArray(p.labels)?p.labels:[],spec_id:typeof p.spec_id=="string"?p.spec_id:"",blocked:p.blocked===!0,...Array.isArray(p.blocked_by)?{blocked_by:p.blocked_by.filter(x=>typeof x=="string"&&x.length>0)}:{},draggable:!1,can_pause:!1,can_resume:!1,exec_chips:null,usage:null,legs:[],last_activity:null,session_refs:Array.isArray(p.session_refs)?p.session_refs:[],badges:[],alert:!1}))}for(let p of Array.isArray(w.pr_wait)?w.pr_wait:[]){let f=p&&p.bead_id;if(typeof f!="string"||Ct.has(f))continue;Ct.add(f);let x=Xe(xe[f]),S=Xe(x.pr),Z=x.gate?Xe(x.gate):null,ae=Rt.has(f),he=jt.get(f)?.continuation_action||null,Ue=!!he&&he.continuation===null,He=ut.active===f,pt=p.external===!0,Ft=p.foreign===!0,A=Ft&&typeof p.repo_slug=="string"?p.repo_slug:"",I=Ft&&typeof p.pr_url=="string"?p.pr_url:"",Pe=Ft&&typeof p.pr_number=="number"?p.pr_number:null,Ce=bt[f]||null,rt=Xe(X[f]),ft=Ro({bead_id:f,merge_sha:p.merge_sha,cleanup_cursor:p.cleanup_cursor,merge_progress:rt.merge_progress||null,cleanup_failed:Ce,repo_operations:Ee}),tn=ca(ft),kr=!!Z&&Z.base_badge==="\uCDA9\uB3CC",Vn=!!Ce&&["post_merge_jobs","child_sweep","branch_cleanup","parent_close"].includes(Ce.step)&&!!Z&&Z.tier==="merged",sr=pt&&!!Ce&&!!Z&&Z.tier==="merged",wr=!!Z&&["closed_unmerged","review","undecidable"].includes(Z.tier),y=_r(st,f,{external:pt,merge_active:He||ft?.step==="merge",merge_queued:ae,cleanup_active:tn,merged:!!Ce||Z?.tier==="merged"}),b=!!y.operation,R=fy(x.receipt_check);k.push({...Ve(f),lane:"pr_wait",...Ht(f),...R.length>0?{receipt_badge:{codes:R}}:{},workflow:K[f]||null,pr_number:Pe??(typeof S.number=="number"?S.number:null),pr_url:I||(typeof S.url=="string"?S.url:void 0),external:pt,...A?{foreign_repo:A}:{},usage:pr(We,f,tt),merge_step:ft,badges:Ue?["\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694"]:ft?[Z?.tier==="merged"?"\uBA38\uC9C0\uB428":"\uBA38\uC9C0 \uC911"]:Ce?[ns(Ce.step)?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${ns(Ce.step)}`:"\uC815\uB9AC \uBA48\uCDA4"]:Z?.reason==="pr_repo_foreign"?["\uC678\uBD80 \uC800\uC7A5\uC18C PR"]:typeof Z?.gate_badge=="string"&&Z.gate_badge.length>0?[Z.gate_badge]:[],alert:ft?ft.failed===!0:!!Ce||wr,reason:Ce&&ft?.active!==!0?la(Ce.step):"PR \uB300\uAE30",merge_action:Z?.tier==="merged"&&!Vn&&!sr?!1:!ae||Ue,merge_enabled:!b&&(Ue||Z?.enabled===!0||kr||Vn||sr),merge_label:Ue?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":sr||Vn?"\uC815\uB9AC \uC7AC\uC2DC\uB3C4":kr&&!Vn?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":void 0,merge_title:Ue?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":b?y.error?`\uD3D0\uAE30 \uC2E4\uD328: ${y.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${y.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:sr?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uB2E4\uC2DC \uC2DC\uB3C4\uD569\uB2C8\uB2E4":Vn?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC2DC\uB3C4\uD569\uB2C8\uB2E4":kr?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":Z?.enabled===!0?`\uBA38\uC9C0 (${Z.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4`:`\uBA38\uC9C0 \uBD88\uAC00: ${Z?.reason||"\uAD00\uCE21 \uB300\uAE30"}`,cancel_action:ae&&!Ue,cancel_enabled:!He,continuation_mismatch:he?.mismatch||null,discard:y,discard_action:y.action,discard_enabled:y.enabled,discard_title:y.title})}let hn=(p,f,x,S)=>{let Z=p&&p.bead_id;if(typeof Z!="string"||Ct.has(Z))return null;Ct.add(Z);let ae=it[Z],he=_r(st,Z),Ue=he.operation?he:null,He={...Ve(Z),lane:f,...typeof p.added_at=="number"?{added_at:p.added_at}:{},workflow:K[Z]||null,draggable:!Ue,discard:Ue||void 0,reason:Xp(Ze,Z),seq:x+1,queue_position:x+1,queue_index:x,queue_length:S,badges:ae?["\u23F8 REVISE \uD30C\uD0B9"]:[],alert:!!ae,revise_action:!!ae,revise_enabled:!!ae&&!Ue,revise_title:ae?ae.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${ae.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":""},pt=at(Z,null);return Object.hasOwn(pt,"blocked_by")&&(He.blocked_by=pt.blocked_by),He};for(let p=0;p<qt.length;p++){let f=hn(qt[p],"queue",p,qt.length);if(!f)continue;ee.push(f);let x=N.get(se);x?x.push(f):N.set(se,[f])}let Nt=p=>{let f=k.find(ae=>ae.id===p&&ae.root_dir===se);if(f)return{id:p,title:f.title,badge:"PR \uB300\uAE30 \xB7 \uC810\uC720"};let x=T.find(ae=>ae.id===p&&ae.root_dir===se),S=x?x.run_state:ry(We,p),Z=S==="failed"||S==="orphaned"?"\uC2E4\uD328 \xB7 \uC810\uC720 \uC720\uC9C0":S==="paused"?"\uC77C\uC2DC\uC815\uC9C0 \xB7 \uC810\uC720":"\uC2E4\uD589 \uC911 \xB7 \uC810\uC720";return{id:p,title:x?x.title:Ve(p).title,badge:Z}},vn=[];for(let p=0;p<Math.max(Ke,Gt.length);p++){let f=`s${p+1}`,x=L.get(f),S=x&&Array.isArray(x.entries)?x.entries:[],Z=Xe(sn[f]),ae=Array.isArray(Z.occupied_by)?Z.occupied_by.filter(pt=>typeof pt=="string"):[],he=new Set(ae),Ue=new Set(S.map(pt=>pt?.bead_id).filter(pt=>typeof pt=="string"&&he.has(pt)&&sf(Ze,pt))),He=[];for(let pt=0;pt<S.length;pt++){let Ft=S[pt]&&S[pt].bead_id;if(typeof Ft=="string"&&he.has(Ft)&&!Ue.has(Ft)){Ct.add(Ft);continue}let A=hn(S[pt],f,pt,S.length);A&&(typeof Ft=="string"&&Ue.has(Ft)&&(A.badges=[Nt(Ft).badge,...A.badges||[]]),He.push(A),ee.push(A))}He.length===0&&ae.length===0&&(Ke<=1||p>=Ke)||vn.push({id:f,index:p,items:He,raw_length:S.length,occupied_by:ae,occupants:ae.filter(pt=>!Ue.has(pt)).map(pt=>Nt(pt)),corrections:Array.isArray(Z.corrections)?Z.corrections.length:0,cycle:Z.cycle===!0,...He.length===0&&ae.length===0?{empty:!0}:{}})}D.set(se,vn);let bn=Array.from({length:Ke},(p,f)=>{let x=`s${f+1}`,S=L.get(x),Z=S&&Array.isArray(S.entries)?S.entries:[],ae=Xe(sn[x]);return{id:x,index:Z.length,length:Z.length,occupied_by:Array.isArray(ae.occupied_by)?ae.occupied_by.filter(he=>typeof he=="string"):[]}});for(let p of Array.isArray(w.runnable)?w.runnable:[]){let f=p&&p.bead_id;if(typeof f!="string"||Ct.has(f))continue;Ct.add(f);let x=p.workflow&&typeof p.workflow=="object"?p.workflow:null,S=x&&typeof x.route=="string"&&x.route||(typeof p.route=="string"?p.route:null),Z=_y(Xe(Se),p.exec_pins,S),ae=bo(p.rec,p.exec_pins);Array.isArray(p.blocked_by)&&p.blocked_by.length>0&&oe.set(f,p.blocked_by.filter(ft=>typeof ft=="string"&&ft.length>0)),typeof p.title=="string"&&p.title.length>0&&F.set(f,p.title),Array.isArray(p.scope)&&ge.set(f,p.scope.filter(ft=>typeof ft=="string"&&ft.length>0));let he=Object.hasOwn(p,"eligible"),He=!he&&Object.hasOwn(p,"route")&&Object.hasOwn(p,"spec_state")&&Object.hasOwn(p,"has_description")&&Object.hasOwn(p,"awaiting_user")&&Object.hasOwn(p,"worker_ineligible")?Bl({route:typeof p.route=="string"?p.route:"",spec:p.spec_state,has_description:p.has_description===!0,awaiting_user:p.awaiting_user===!0,worker_ineligible:p.worker_ineligible===!0},null):null,pt=he?p.eligible!==!1:He?He.placeable:!0,Ft=He?He.worker_ineligible:p.worker_ineligible===!0,A=pt&&!Ft,I=He?{route_ok:He.route_ok,awaiting_user:He.awaiting_user,missing_description:He.missing_description,placement_spec:He.spec}:Object.hasOwn(p,"route_ok")?{route_ok:p.route_ok===!0,awaiting_user:p.awaiting_user===!0,missing_description:p.missing_description===!0,placement_spec:p.placement_spec}:null,Pe=[];!he&&He&&!He.placeable&&Pe.push(Zr(He)),typeof p.reason=="string"&&p.reason.length>0&&Pe.push(p.reason);let Ce=Xp(Ze,f);Ce&&Pe.push(Ce);let rt=my(f,p.release_info,_)?.map(ft=>({...ft,...tc({id:f,root_dir:se},ft.id)}));g.push({...Ve(f),title:p.title||It[f]||f,lane:"runnable",draggable:!he&&A,queue_placeable:A,...I||{},...Ft?{worker_ineligible:!0}:{},...p.session_preferred===!0?{session_preferred:!0,session_preferred_reason:typeof p.session_preferred_reason=="string"?p.session_preferred_reason:""}:{},...p.spec_after_blocker===!0?{spec_after_blocker:!0}:{},...rt?{dependency_chips:{released:rt}}:{},...p.dependents_info&&typeof p.dependents_info=="object"?{dependents_info:p.dependents_info}:{},reason:Pe.join(" \xB7 "),created_at:p.created_at??void 0,updated_at:p.updated_at??void 0,status:typeof p.status=="string"?p.status:void 0,labels:Array.isArray(p.labels)?p.labels:[],spec_id:typeof p.spec_id=="string"?p.spec_id:"",published:p.published===!0,workflow:x||(S?{route:S,chips:{route:S}}:null),...Z?{exec_chips:Z}:{},...ae?{rec:ae}:{},blocked:p.blocked===!0,...Array.isArray(p.blocked_by)?{blocked_by:p.blocked_by.filter(ft=>typeof ft=="string"&&ft.length>0)}:{},place_index:qt.length,place_lanes:bn})}for(let p of je){let f=p&&p.bead_id;if(typeof f!="string"||Ct.has(f)||(Ct.add(f),i!==void 0&&typeof p.added_at=="number"&&p.added_at<i))continue;let x=sy(We,f),S=x&&typeof x.done_kind=="string"?x.done_kind:null,Z=yy(x);ne.push({...Ve(f),lane:"done",done:!0,workflow:K[f]||null,...Z?{exec_chips:Z}:{},done_layout:"three_line",usage:pr(We,f,tt),work_ms:Tp(We,f),done_at:typeof p.added_at=="number"?p.added_at:void 0,done_kind:S,...Dt(f),badges:[...S&&Gp[S]?[Gp[S]]:[],...Sp(We,f)]})}for(let p of Array.isArray(w.session_done)?w.session_done:[]){let f=p&&(p.id||p.bead_id);typeof f!="string"||Ct.has(f)||(Ct.add(f),ne.push({...Ve(f),...p,id:f,root_dir:se,workspace_name:De,expected_revision:Me,lane:"done",done:!0}))}}if(C.size>0)for(let w of[...g,...ee,...T,...k,...ne]){let se=C.get(`${w.root_dir}\0${w.id}`);if(!se)continue;typeof se.priority=="number"&&(w.priority=se.priority),typeof se.from_id=="string"&&se.from_id.length>0&&(w.from_id=se.from_id),w.lane==="done"&&Array.isArray(se.carried_to)&&se.carried_to.length>0&&(w.carried_to=se.carried_to);let De=Xe(w.workflow),Se=Xe(De.chips);if(!Se.route&&!De.route&&typeof se.route=="string"&&se.route.length>0&&(w.workflow={...De,route:se.route,chips:{...Se,route:se.route}}),!Object.hasOwn(se,"metadata"))continue;let Me=Xe(se.metadata);if(w.rec=bo(Me),w.lane==="runnable"||w.lane.startsWith("s")||w.lane==="queue"){let We=Jp(Xe(m.get(w.root_dir)),Me,typeof se.route=="string"&&se.route.length>0?se.route:Xe(w.workflow).route);We&&(w.exec_chips=We)}}let ce=new Map;s.forEach((w,se)=>{w&&typeof w.root_dir=="string"&&ce.set(w.root_dir,se)});let pe=n&&n.running_sort==="repo"?"repo":"started";T.sort((w,se)=>{let De=w.kind==="session",Se=se.kind==="session";if(De!==Se)return De?1:-1;if(De&&Se){let tt=ua(se.updated_at)-ua(w.updated_at);return tt!==0?tt:w.id.localeCompare(se.id)}if(pe==="repo"){let tt=ce.get(w.root_dir)??Number.MAX_SAFE_INTEGER,It=ce.get(se.root_dir)??Number.MAX_SAFE_INTEGER;if(tt!==It)return tt-It}let Me=typeof w.started_at=="number"&&Number.isFinite(w.started_at)?w.started_at:null,We=typeof se.started_at=="number"&&Number.isFinite(se.started_at)?se.started_at:null;return Me!==null&&We!==null&&Me!==We?Me-We:Me===null&&We!==null?1:Me!==null&&We===null?-1:w.id.localeCompare(se.id)}),ne.sort((w,se)=>(se.done_at??0)-(w.done_at??0));let B=s.length>0?s:r.map(w=>({root_dir:w&&w.root_dir,name:w&&w.name,auto_advance:w&&w.auto_advance,auto_merge:w&&w.auto_merge,slots:w&&w.slots,revision:w&&w.revision,runner_catalog:w&&w.runner_catalog})),U=new Set(g.map(w=>w.root_dir)),Re=new Map;for(let w of T)w.kind==="session"||w.run_state!=="running"||Re.set(w.root_dir,(Re.get(w.root_dir)||0)+1);let W=new Map;for(let w of ne){let se=W.get(w.root_dir);se?se.push(w):W.set(w.root_dir,[w])}let te={positions:new Map,resolutions:new Map,continuations:new Map,authorities:new Map,state:{active:null,failures:{},waiting:null},auto_excluded:[],running:!1},J=[];for(let w of B){if(!w||typeof w.root_dir!="string")continue;let se=N.get(w.root_dir)||[],De=D.get(w.root_dir)||[],Se=se.length>0||De.some(tt=>tt.items.length>0||tt.occupied_by.length>0);if(u!=="all"&&!Se&&!U.has(w.root_dir))continue;let Me=typeof w.slots=="number"&&w.slots>=pa?w.slots:pa,We=Re.get(w.root_dir)||0;J.push({live_count:We,over_cap:We>Me,merge:G.get(w.root_dir)||te,token_total:ky(W.get(w.root_dir)||[]),cleanup_failures:P.get(w.root_dir)||[],declared_base:$.get(w.root_dir)??null,repo_operations:O.get(w.root_dir)||[],root_dir:w.root_dir,name:w.name||w.root_dir,auto_advance:w.auto_advance===!0,auto_merge:w.auto_merge===!0,slots:Me,revision:typeof w.revision=="number"?w.revision:0,runner_catalog:Xe(w.runner_catalog),items:se,sublanes:{parallel:se,serial:De},serial_lane_count:M.get(w.root_dir)||0,raw_queue_length:q.get(w.root_dir)||0})}let Y={runnable:g,runnable_all:g,runnable_hidden:{blocked:0,readiness:0,route:0},runnable_sections:[],runnable_flat:l==="updated_flat"||l==="as_given",queue:ee,queue_groups:J,running:T,pr_wait:k,done:ne,parallel_rows:[],chain_lanes:[],cross_lanes_revision:a&&typeof a.revision=="number"?a.revision:null,cross_lanes_unreadable:a===null,parallel_raw_length:Object.fromEntries(q),owner_of:{}},ke=fp(Y);for(let w of z)ke.has(w.id)||ke.set(w.id,{root_dir:w.root_dir,workspace_name:w.workspace_name,lane:"done",state:"done"});for(let w of[...Y.queue,...Y.runnable,...Y.running,...Y.pr_wait]){if(!Object.hasOwn(w,"blocked_by"))continue;let se=ke.get(w.id),De=me.get(w.root_dir)||{};w.blockers=(w.blocked_by||[]).map(Se=>{let Me=ke.get(Se)?.workspace_name||rc(De[Se]);return{..._p(Se,se,ke,s),...Me?{workspace_name:Me}:{}}})}for(let w of[...Y.queue,...Y.runnable,...Y.running,...Y.pr_wait]){let se=me.get(w.root_dir)||{},De=(w.blockers||[]).map(tt=>({...ec(w.id,tt),...tc(w,tt.id,ke,se)})),Se=(V.get(`${w.root_dir}\0${w.id}`)||[]).map(tt=>{let It=ke.get(tt),_e=It?.root_dir||se[tt];return{...Hp(w.id,tt,It?.workspace_name||rc(_e),_e),...tc(w,tt,ke,se)}}),Me=zp(w.id,Ry(ie.get(w.id),w.dependents_info,w,ke));if(De.length===0&&Se.length===0&&Me.length===0)continue;let We={...w.dependency_chips||{},...De.length>0?{predecessors:De}:{},...Se.length>0?{released:Se}:{},...Me.length>0?{dependents:Me}:{}};w.dependency_chips=We}Ty(Y,Ie,ge,ke,s);let fe=mp(Y.queue_groups);for(let w of Y.queue_groups)for(let se of w.sublanes.serial){let De=fe.get(gp(w.root_dir,se.id));De&&(se.cross_wait_peers=De)}let Le=new Map;for(let w of[...Y.queue,...Y.running,...Y.pr_wait,...Y.done,...Y.runnable]){let se=da(w.root_dir,w.id);if(Le.has(se))continue;let De=Xe(w.workflow),Se=Xe(De.chips),Me=C.get(`${w.root_dir}\0${w.id}`),We=(typeof Se.route=="string"&&Se.route.length>0?Se.route:typeof De.route=="string"&&De.route.length>0?De.route:Me&&typeof Me.route=="string"&&Me.route.length>0?Me.route:null)||null,tt=typeof Se.route_source=="string"?Se.route_source:typeof De.route_source=="string"?De.route_source:null;Le.set(se,{route:We,route_source:tt,exec_chips:w.exec_chips||null,added_at:typeof w.added_at=="number"?w.added_at:null})}for(let w of a&&Array.isArray(a.lanes)?a.lanes:[])for(let se of Array.isArray(w?.entries)?w.entries:[]){let De=se&&typeof se.bead_id=="string"?se.bead_id:"",Se=se&&typeof se.root_dir=="string"?se.root_dir:"";if(De.length===0||Le.has(da(Se,De)))continue;let Me=C.get(`${Se}\0${De}`);if(!Me)continue;let We=typeof Me.route=="string"&&Me.route.length>0?Me.route:null,tt=Object.hasOwn(Me,"metadata")?Jp(Xe(m.get(Se)),Xe(Me.metadata),We):null;We===null&&tt===null||Le.set(da(Se,De),{route:We,route_source:null,exec_chips:tt,added_at:null})}Y.chain_lanes=Sy(a&&Array.isArray(a.lanes)?a.lanes:[],oe,ke,s,F,h,{armed_by_bead:de,failed_by_bead:Oe,disarmed_lanes:qe},ue,Le);let Ne=new Map;for(let w of[...Y.queue,...Y.runnable])Ne.has(w.id)||Ne.set(w.id,w);let Je=new Set;for(let w of Y.chain_lanes)for(let se of w.rows){if(w.status==="confirmed"&&!se.unplaced&&!se.fixed&&Je.add(se.id),!w.draft&&!se.unplaced)continue;let De=Ne.get(se.id);De&&(De.cross_lane_chip={lane_id:w.lane_id,number:w.number,status:w.status,label:w.draft?`\uC5F0\uACB0 ${w.number} (draft)`:`\uC5F0\uACB0 ${w.number}`})}let Be=new Map(Y.chain_lanes.map(w=>[w.lane_id,w]));for(let w of[...Y.queue,...Y.running]){let se=de.get(w.id);if(typeof se!="string"||se.length===0)continue;let De=Be.get(se);w.armed_lane_chip=De===void 0||De.status==="draft"?{lane_id:se,label:"\u25B6 \uC9C4\uD589 \uC911 \xB7 \uB808\uC778 \uC5C6\uC74C",orphan:!0}:{lane_id:se,label:`\u25B6 \uC5F0\uACB0 ${De.number}`,orphan:!1}}let re=[];for(let w of N.values())for(let se of w)Je.has(se.id)||re.push(se);re.sort((w,se)=>{let De=w.workspace_name.localeCompare(se.workspace_name);return De!==0?De:(w.queue_index??0)-(se.queue_index??0)}),Y.parallel_rows=re;let Q={};for(let[w,se]of ke)typeof se.root_dir=="string"&&se.root_dir.length>0&&(Q[w]=se.root_dir);for(let w of Y.chain_lanes)for(let se of w.rows)!Object.hasOwn(Q,se.id)&&se.root_dir.length>0&&h.has(se.root_dir)&&(Q[se.id]=se.root_dir);Y.owner_of=Q;let Te=Y.runnable.length;Y.runnable_all=Y.runnable.slice();let et=Y.runnable,dt=w=>o.show_blocked||w.blocked!==!0,Qe=w=>o.readiness==="all"||(o.readiness==="ready"?w.queue_placeable===!0:w.queue_placeable!==!0),gt=rs(o.routes),Pt=w=>gt.length===0||gt.includes(vy(w));if(d==="per_control"){let w=[],se=0,De=0,Se=0;for(let Me of et){let We=dt(Me),tt=Qe(Me),It=Pt(Me);if(We&&tt&&It){w.push(Me);continue}(We?0:1)+(tt?0:1)+(It?0:1)>1||(We?tt?Se+=1:De+=1:se+=1)}et=w,Y.runnable_hidden={blocked:se,readiness:De,route:Se}}else{et=et.filter(dt);let w=et.length;et=et.filter(Qe);let se=et.length;et=et.filter(Pt),Y.runnable_hidden={blocked:Te-w,readiness:w-se,route:se-et.length}}let St=(w,se)=>{let De=ua(se.updated_at)-ua(w.updated_at);return De!==0?De:w.id.localeCompare(se.id)},ht=l==="repo_spec"?(w,se)=>{let De=w.queue_placeable===!0?0:1,Se=se.queue_placeable===!0?0:1;if(De!==Se)return De-Se;let Me=w.published===!0?0:1,We=se.published===!0?0:1;return Me!==We?Me-We:St(w,se)}:St;if(l==="as_given")Y.runnable=et,Y.runnable_sections=[];else if(l==="updated_flat")Y.runnable=et.slice().sort(St),Y.runnable_sections=[];else{let w=new Map;for(let Se of et){let Me=w.get(Se.root_dir);Me?Me.push(Se):w.set(Se.root_dir,[Se])}let se=[],De=[];for(let Se of B){if(!Se||typeof Se.root_dir!="string")continue;let Me=(w.get(Se.root_dir)||[]).slice().sort(ht);w.delete(Se.root_dir),Me.length!==0&&(se.push({root_dir:Se.root_dir,name:Se.name||Se.root_dir,items:Me.map(We=>({...We,workspace_name:""}))}),De.push(...Me))}for(let[Se,Me]of w){let We=Me.slice().sort(ht);se.push({root_dir:Se,name:We[0]?.workspace_name||Se,items:We.map(tt=>({...tt,workspace_name:""}))}),De.push(...We)}Y.runnable=De,Y.runnable_sections=se}let Jt=Cy(n?n.search:void 0);return Jt&&Oy(Y,Jt),Y}var _a=["impl_review_model","impl_review_effort","impl_review_speed"],Iy=Object.freeze({impl_review_model:"fable",impl_review_effort:"xhigh",impl_review_speed:"default"});function os(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function mr(e){return typeof e=="string"&&e.length>0?e:null}function lc(e){let t=os(e)&&os(e.metadata)?e.metadata:{};return t.route!=="quick_fix"?{eligible:!1,reason:"route=quick_fix \uC774\uC288\uB9CC \uC6D0\uBCF8\uC774 \uB429\uB2C8\uB2E4"}:mr(t.quick_fix_review)===null?{eligible:!1,reason:"quick_fix_review \uC601\uC218\uC99D\uC774 \uC5C6\uC2B5\uB2C8\uB2E4"}:{eligible:!0,reason:""}}function af(e,t,n=20){let r=String(t||"").trim().toLowerCase(),s=[],i=new Set;for(let o of Array.isArray(e)?e:[]){let a=mr(os(o)?o.id:null);if(a===null||i.has(a))continue;let l=mr(o.title)??"";if(r.length>0&&!a.toLowerCase().includes(r)&&!l.toLowerCase().includes(r))continue;i.add(a);let u=lc(o);if(s.push({id:a,title:l,eligible:u.eligible,reason:u.reason}),s.length>=n)break}return s.sort((o,a)=>o.eligible===a.eligible?0:o.eligible?-1:1)}function cc(e){let t=typeof e=="number"?e:Number.parseInt(String(e??""),10);return Number.isFinite(t)?Math.min(5,Math.max(1,Math.trunc(t))):1}function ma(e){for(let t of Array.isArray(e)?e:[]){let n=os(t)&&os(t.reviewer)?t.reviewer:null;if(n===null)continue;let r={},s=!0;for(let i of _a){let o=mr(n[i]);if(o===null){s=!1;break}r[i]=o}if(s)return r}return{...Iy}}function lf(e){return mr(e.source_id)===null||e.source_eligible!==!0||!Array.isArray(e.preset_ids)||e.preset_ids.length===0||cc(e.repeats)!==e.repeats?!1:e.reviewer_mode==="fixed"?_a.every(t=>mr(e.reviewer?.[t])!==null):!0}var ac=Object.freeze({bad_request:"\uC785\uB825\uC774 \uC11C\uBC84 \uC870\uAC74\uC744 \uB9CC\uC871\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4",bd_error:"\uC6D0\uBCF8 \uC774\uC288\uB97C \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",bench_base_unreadable:"base tip\uC744 \uC77D\uC9C0 \uBABB\uD574 \uC2E4\uD5D8\uC744 \uC2DC\uC791\uD558\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4",bench_tuple_unresolved:"\uD504\uB9AC\uC14B\uC744 \uC644\uC804\uD55C \uC2E4\uD589 tuple\uB85C \uD574\uC11D\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",worker_unavailable:"Worker \uB7F0\uD0C0\uC784\uC774 \uBD99\uC5B4 \uC788\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4",bench_run_create_failed:"\uD074\uB860 \uC0DD\uC131\uC5D0 \uC2E4\uD328\uD574 \uC2E4\uD5D8\uC744 \uB9CC\uB4E4\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4",bench_run_list_failed:"\uC2E4\uD5D8 \uBAA9\uB85D\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"});function cf(e){if(typeof e=="string")return ac[e]??e;if(!os(e))return"\uC2E4\uD5D8 \uC0DD\uC131\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4";let t=mr(e.code)??mr(e.error)??"",n=mr(e.message)??"",r=ac[t]??(n.length>0?n:t),s=[r.length>0?r:"\uC2E4\uD5D8 \uC0DD\uC131\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4"];t.length>0&&n.length>0&&ac[t]&&s.push(`(${n})`);let i=os(e.details)?e.details:{},o=Array.isArray(i.aborted)?i.aborted.filter(a=>typeof a=="string"&&a.length>0):[];return o.length>0&&s.push(`\u2014 \uB2EB\uD78C \uD074\uB860: ${o.join(", ")}`),s.join(" ")}function uc(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function Mn(e){return typeof e=="number"&&Number.isFinite(e)?e:null}function Lr(e){return typeof e=="string"&&e.length>0?e:null}var Ly=new Set(["failed","orphaned"]);function uf(e){if(!uc(e))return null;let t=Mn(e.cell_count),n=Mn(e.terminal_count);return t===null||n===null?null:{terminal:n,total:t,text:`${n}/${t}`}}function js(e){let t=e.map(i=>Mn(i)).filter(i=>i!==null).sort((i,o)=>i-o),n=e.length;if(t.length===0)return{median:null,sample:0,total:n};let r=Math.floor(t.length/2);return{median:t.length%2===1?t[r]:(t[r-1]+t[r])/2,sample:t.length,total:n}}function Dy(e){let t=e.filter(n=>n==="pass"||n==="fail");return t.length<2?null:{k:t.length,value:t.every(n=>n==="pass")?1:0}}function Py(e,t){if(t&&(t.verify==="pass"||t.verify==="fail"))return t.verify;let n=uc(e.bench_verify)?e.bench_verify:null;return n===null?null:n.ok===!0?"pass":"fail"}function df(e,t){if(!uc(e))return[];let n=new Map;for(let o of Array.isArray(t)?t:[]){let a=Lr(o?.attempt_id);a!==null&&n.set(a,o)}let r=Array.isArray(e.cells)?e.cells:[],s=Array.isArray(e.presets)?e.presets:[],i=[];for(let o of s){let a=Lr(o?.id);if(a===null)continue;let u=r.filter(m=>m?.preset_id===a).sort((m,h)=>(Mn(m?.k)??0)-(Mn(h?.k)??0)).map(m=>{let h=Lr(m.attempt_id),g=h===null?null:n.get(h)??null,T=Py(m,g);return{...g??{},bead_id:Lr(m.bead_id)??"",attempt_id:h,cell_k:Mn(m.k),status:Lr(g?.status)??Lr(m.status),failed:g?.failed===!0||Ly.has(String(m.status??"")),verify:T,workspace_name:m.k===null?"":`#${m.k}`}}),d=u.filter(m=>m.verify==="pass"||m.verify==="fail"),_=d.filter(m=>m.verify==="pass"&&m.status==="done");i.push({key:`${Lr(e.run_id)??""}:${a}`,name:Lr(o?.name)??a,n:u.length,success_rate:d.length===0?null:_.length/d.length,success_sample:d.length,unknown_count:u.length-d.length,pass_caret:Dy(u.map(m=>m.verify)),failed_count:u.filter(m=>m.failed===!0).length,retry_count:u.filter(m=>m.is_retry===!0).length,duration_ms:js(u.map(m=>Mn(m.duration_ms))),tokens:js(u.map(m=>Mn(m.usage?.tokens))),cost_usd:js(u.map(m=>Mn(m.usage?.total_cost_usd))),blocking:js(u.map(m=>Mn(m.review?.blocking))),minor:js(u.map(m=>Mn(m.review?.minor))),round:js(u.map(m=>Mn(m.review?.round))),rows:u})}return i}var un="\u2014";function rr(e){return typeof e=="number"&&Number.isFinite(e)?e:null}function ga(e){let t=rr(e);if(t===null||t<0)return un;let n=Math.round(t/1e3);if(n<60)return`${n}\uCD08`;let r=Math.floor(n/60);return r<60?`${r}\uBD84`:`${Math.floor(r/60)}\uC2DC\uAC04 ${r%60}\uBD84`}function ha(e){let t=rr(e);return t===null||t<=0?un:t>=1e6?`\u03C4 ${(t/1e6).toFixed(1)}M`:t>=1e3?`\u03C4 ${(t/1e3).toFixed(1)}k`:`\u03C4 ${t}`}function pf(e){return!e||rr(e.total_cost_usd)===null?un:Ei({total_cost_usd:e.total_cost_usd,unpriced_leg_count:e.unpriced_leg_count})??un}function dc(e){let t=rr(e);return t===null?un:`$${t.toFixed(2)}`}function ff(e){let t=rr(e?.sample)??0,n=rr(e?.total)??0;return t===0||t===n?"":`n=${t}/${n}`}function pc(e){let t=rr(e);return t===null?un:`${Math.round(t*100)}%`}function _f(e){return e==="pass"?"\uD1B5\uACFC":e==="fail"?"\uC2E4\uD328":"\uBBF8\uC0C1"}function mf(e){let t=[];return e.failed===!0&&t.push(typeof e.cause=="string"&&e.cause.length>0?`\uC2E4\uD328 \xB7 ${e.cause}`:"\uC2E4\uD328"),e.is_retry===!0&&t.push("\uC7AC\uC2DC\uB3C4"),t.length===0?un:t.join(" \xB7 ")}function gf(e){if(!e)return un;let t=rr(e.blocking),n=rr(e.minor),r=rr(e.round);if(t===null&&n===null&&r===null)return un;let s=t===null&&n===null?null:`b${t??0}/m${n??0}`,i=r===null?null:`r${r}`;return[s,i].filter(o=>o!==null).join(" \xB7 ")}var Ny="30d";function hf(e,t={}){let n=zt("views:compare"),r=t.transport,s=t.gotoIssue,i=t.execPresetStore,o=t.sourceCandidates,a={range:Ny,root_dir:"",issue_type:"",route:"",include_bench:!1},l={rows:[],groups:[],workspaces:[]},u=new Set,d=!1,_=null,m=!1,h=0,g={runs:[],selected:null,rows:[]},T=new Set,k={open:!1,source_id:"",query:"",preset_ids:[],repeats:1,reviewer_mode:"fixed",reviewer:ma([]),error:null,submitting:!1};async function ee(){if(!r)return;let F=h+=1;d=!0,_=null,Ie();try{let ce=await r("get-compare",{range:a.range,root_dirs:a.root_dir?[a.root_dir]:[],issue_types:a.issue_type?[a.issue_type]:[],routes:a.route?[a.route]:[],include_bench:a.include_bench});if(F!==h)return;let pe=ce&&ce.payload?ce.payload:ce;l={rows:Array.isArray(pe?.rows)?pe.rows:[],groups:Array.isArray(pe?.groups)?pe.groups:[],workspaces:Array.isArray(pe?.workspaces)?pe.workspaces:l.workspaces},g.runs=Array.isArray(pe?.runs)?pe.runs:[],g.rows=Array.isArray(pe?.bench_rows)?pe.bench_rows:[],g.selected!==null&&!g.runs.some(B=>B.run_id===g.selected)&&(g.selected=null),k.open||(k.reviewer=ma(g.runs)),m=!0}catch(ce){if(F!==h)return;n("get-compare failed: %o",ce),_=ce instanceof Error?ce.message:String(ce)}finally{F===h&&(d=!1,Ie())}}function ne(F){g.selected=g.selected===F?null:F,Ie()}function z(){let F=D(k.source_id);return lf({source_id:k.source_id,source_eligible:F===null?!1:lc(F).eligible,preset_ids:k.preset_ids,repeats:k.repeats,reviewer_mode:k.reviewer_mode,reviewer:k.reviewer})}async function N(){if(!(!r||k.submitting||!z())){k.submitting=!0,k.error=null,Ie();try{let F=await r("bench-run-create",{source_id:k.source_id,preset_ids:[...k.preset_ids],repeats:k.repeats,reviewer_mode:k.reviewer_mode,...k.reviewer_mode==="fixed"?{reviewer:k.reviewer}:{}}),ce=F&&F.payload?F.payload:F,pe=ce&&ce.run&&typeof ce.run.run_id=="string"?ce.run.run_id:null;k.open=!1,k.error=null,await ee(),pe!==null&&g.selected!==pe&&ne(pe)}catch(F){n("bench-run-create failed: %o",F),k.error=cf(F)}finally{k.submitting=!1,Ie()}}}function D(F){if(!o||F.length===0)return null;for(let ce of o())if(ce&&ce.id===F)return ce;return null}function M(F,ce){a[F]=ce,ee()}function q(F){u.has(F)?u.delete(F):u.add(F),Ie()}function G(F,ce,pe,B){return c`
      <label class="cmp-filter">
        <span class="cmp-filter__label">${F}</span>
        <select
          class="cmp-filter__select"
          .value=${ce}
          @change=${U=>B(U.target.value)}
        >
          ${pe.map(U=>c`<option
                value=${U.value}
                ?selected=${U.value===ce}
              >
                ${U.label}
              </option>`)}
        </select>
      </label>
    `}function P(){let F=[{value:"",label:"\uC804\uCCB4 \uC800\uC7A5\uC18C"},...l.workspaces.map(ce=>({value:ce.root_dir,label:ce.name}))];return c`
      <div class="cmp-filters">
        ${G("\uAE30\uAC04",a.range,ui.map(ce=>({value:ce.value,label:ce.label})),ce=>M("range",ce))}
        ${G("\uC800\uC7A5\uC18C",a.root_dir,F,ce=>M("root_dir",ce))}
        ${G("\uC720\uD615",a.issue_type,[{value:"",label:"\uC804\uCCB4 \uC720\uD615"},...Ai.map(ce=>({value:ce,label:ce}))],ce=>M("issue_type",ce))}
        ${G("route",a.route,[{value:"",label:"\uC804\uCCB4 route"},...ss.filter(ce=>ce.value!=="unset").map(ce=>({value:ce.value,label:ce.label}))],ce=>M("route",ce))}
        <label class="cmp-filter cmp-filter--check">
          <input
            type="checkbox"
            .checked=${a.include_bench}
            @change=${ce=>{a.include_bench=ce.target.checked,ee()}}
          />
          <span>bench 실험 포함</span>
        </label>
        <button
          type="button"
          class="op-btn cmp-refresh"
          ?disabled=${d}
          @click=${()=>{ee()}}
        >
          새로고침
        </button>
      </div>
    `}function $(F){let ce=pc(F.success_rate),pe=typeof F.unknown_count=="number"&&F.unknown_count>0?c`<span class="cmp-note">미상 ${F.unknown_count}</span>`:null,B=F.pass_caret?c`<span class="cmp-note"
          >pass^${F.pass_caret.k}
          ${pc(F.pass_caret.value)}</span
        >`:null,U=typeof F.success_sample=="number"&&F.success_sample!==F.n?c`<span class="cmp-note"
            >n=${F.success_sample}/${F.n}</span
          >`:null;return c`${ce} ${U} ${B} ${pe}`}function O(F,ce){let pe=ff(F);return c`${ce(F?.median)}
    ${pe?c`<span class="cmp-note">${pe}</span>`:null}`}function C(F){let ce=$s(F.usage||null).join(`
`);return c`
      <tr
        class="cmp-row cmp-row--attempt"
        @click=${()=>s&&s(F.bead_id)}
      >
        <td class="cmp-cell cmp-cell--issue">
          <span class="cmp-issue-id">${F.bead_id}</span>
          <span class="cmp-issue-title">${F.title||""}</span>
          <span class="cmp-note">${F.workspace_name}</span>
        </td>
        <td class="cmp-cell">${ga(F.duration_ms)}</td>
        <td class="cmp-cell">${mf(F)}</td>
        <td class="cmp-cell">${_f(F.verify)}</td>
        <td class="cmp-cell">${gf(F.review)}</td>
        <td class="cmp-cell">${ha(F.usage?.tokens)}</td>
        <td class="cmp-cell" title=${ce}>${pf(F.usage)}</td>
        <td class="cmp-cell cmp-cell--time">
          ${F.finished_at?nn(F.finished_at):un}
        </td>
      </tr>
    `}function oe(F){let ce=u.has(F.key),pe=new Set(F.attempt_ids||[]),B=ce?l.rows.filter(U=>pe.has(U.attempt_id)):[];return c`
      <tr
        class="cmp-row cmp-row--group ${ce?"is-open":""}"
        @click=${()=>q(F.key)}
      >
        <td class="cmp-cell cmp-cell--name">
          <span class="cmp-caret" aria-hidden="true">${ce?"\u25BE":"\u25B8"}</span>
          <span class="cmp-group-name">${F.name}</span>
          <span class="cmp-note">${F.n}건</span>
        </td>
        <td class="cmp-cell">
          ${O(F.duration_ms,ga)}
        </td>
        <td class="cmp-cell">
          실패 ${F.failed_count} · 재시도 ${F.retry_count}
        </td>
        <td class="cmp-cell">${$(F)}</td>
        <td class="cmp-cell">
          ${O(F.blocking,U=>typeof U=="number"?`b${U}`:un)}
          ${O(F.minor,U=>typeof U=="number"?`m${U}`:un)}
          ${O(F.round,U=>typeof U=="number"?`r${U}`:un)}
        </td>
        <td class="cmp-cell">${O(F.tokens,ha)}</td>
        <td class="cmp-cell">
          ${O(F.cost_usd,dc)}
        </td>
        <td class="cmp-cell cmp-cell--time"></td>
      </tr>
      ${B.map(U=>C(U))}
    `}function ue(F){let ce=g.selected===F.run_id,pe=D(String(F.source_bead_id||"")),B=pe&&typeof pe.title=="string"&&pe.title.length>0?pe.title:String(F.source_bead_id||""),U=uf(F),Re=Array.isArray(F.presets)?F.presets.length:0;return c`
      <button
        type="button"
        class="cmp-run ${ce?"is-selected":""}"
        data-run-id=${F.run_id}
        @click=${()=>ne(String(F.run_id))}
      >
        <span class="cmp-run__title">${B}</span>
        <span class="cmp-note">프리셋 ${Re}</span>
        <span class="cmp-note">반복 ${F.repeats??un}</span>
        <span class="cmp-note"
          >${typeof F.created_at=="number"?nn(F.created_at):un}</span
        >
        <span class="cmp-run__progress"
          >${U===null?un:U.text}</span
        >
      </button>
    `}function me(F){let ce=T.has(F.key);return c`
      <tr
        class="cmp-row cmp-row--group ${ce?"is-open":""}"
        @click=${()=>{T.has(F.key)?T.delete(F.key):T.add(F.key),Ie()}}
      >
        <td class="cmp-cell cmp-cell--name">
          <span class="cmp-caret" aria-hidden="true">${ce?"\u25BE":"\u25B8"}</span>
          <span class="cmp-group-name">${F.name}</span>
          <span class="cmp-note">${F.n}건</span>
        </td>
        <td class="cmp-cell">
          ${O(F.duration_ms,ga)}
        </td>
        <td class="cmp-cell">
          실패 ${F.failed_count} · 재시도 ${F.retry_count}
        </td>
        <td class="cmp-cell">${$(F)}</td>
        <td class="cmp-cell">
          ${O(F.blocking,pe=>typeof pe=="number"?`b${pe}`:un)}
          ${O(F.minor,pe=>typeof pe=="number"?`m${pe}`:un)}
          ${O(F.round,pe=>typeof pe=="number"?`r${pe}`:un)}
        </td>
        <td class="cmp-cell">${O(F.tokens,ha)}</td>
        <td class="cmp-cell">
          ${O(F.cost_usd,dc)}
        </td>
        <td class="cmp-cell cmp-cell--time"></td>
      </tr>
      ${ce?(F.rows||[]).map(pe=>C(pe)):null}
    `}function V(F){let ce=df(F,g.rows);return c`
      <div class="cmp-run-detail">
        <div class="cmp-run-detail__head">
          <span class="cmp-run-detail__flag">구현 위임 강제</span>
          <span class="cmp-note"
            >리뷰어
            ${F.reviewer_mode==="preset"?"\uD504\uB9AC\uC14B \uAC12":"\uACE0\uC815"}</span
          >
          <span class="cmp-note"
            >base ${String(F.base_sha||"").slice(0,12)}</span
          >
        </div>
        ${ce.length===0?c`<div class="cmp-empty">셀이 없습니다</div>`:c`<table class="cmp-table cmp-table--bench">
              <thead>
                <tr>
                  <th scope="col">프리셋</th>
                  <th scope="col">시간</th>
                  <th scope="col">실패 · 재시도</th>
                  <th scope="col">검증</th>
                  <th scope="col">리뷰 지적 · 라운드</th>
                  <th scope="col">토큰</th>
                  <th scope="col">가격</th>
                  <th scope="col">종료</th>
                </tr>
              </thead>
              <tbody>
                ${ce.map(pe=>me(pe))}
              </tbody>
            </table>`}
      </div>
    `}function ie(){let F=i?i.get():null,ce=Array.isArray(F?.presets)?F.presets:[],pe=af(o?o():[],k.query);return c`
      <form
        class="cmp-form"
        @submit=${B=>{B.preventDefault(),N()}}
      >
        <div class="cmp-form__note">구현 위임 강제</div>
        <label class="cmp-form__field">
          <span class="cmp-form__label">원본 이슈</span>
          <input
            type="text"
            class="cmp-form__input"
            placeholder="제목 또는 ID"
            .value=${k.query}
            @input=${B=>{k.query=String(B.target.value||""),Ie()}}
          />
        </label>
        <div class="cmp-form__candidates">
          ${pe.length===0?c`<div class="cmp-empty">후보 없음</div>`:pe.map(B=>c`
                  <button
                    type="button"
                    class="cmp-candidate ${k.source_id===B.id?"is-selected":""}"
                    data-source-id=${B.id}
                    ?disabled=${!B.eligible}
                    title=${B.reason}
                    @click=${()=>{k.source_id=B.id,Ie()}}
                  >
                    <span class="cmp-candidate__id">${B.id}</span>
                    <span class="cmp-candidate__title">${B.title}</span>
                    ${B.eligible?null:c`<span class="cmp-candidate__reason"
                          >${B.reason}</span
                        >`}
                  </button>
                `)}
        </div>
        <div class="cmp-form__field">
          <span class="cmp-form__label">프리셋</span>
          <div class="cmp-form__presets">
            ${ce.length===0?c`<div class="cmp-empty">프리셋 없음</div>`:ce.map(B=>c`
                    <label class="cmp-form__preset">
                      <input
                        type="checkbox"
                        data-preset-id=${B.id}
                        .checked=${k.preset_ids.includes(B.id)}
                        @change=${U=>{let Re=U.target.checked;k.preset_ids=Re?[...k.preset_ids,B.id]:k.preset_ids.filter(W=>W!==B.id),Ie()}}
                      />
                      <span>${B.name}</span>
                    </label>
                  `)}
          </div>
        </div>
        <label class="cmp-form__field">
          <span class="cmp-form__label">반복</span>
          <input
            type="number"
            class="cmp-form__input cmp-form__input--repeats"
            min="1"
            max="5"
            .value=${String(k.repeats)}
            @change=${B=>{let U=B.target;k.repeats=cc(U.value),U.value=String(k.repeats),Ie()}}
          />
        </label>
        <div class="cmp-form__field">
          <span class="cmp-form__label">리뷰어</span>
          <div class="cmp-form__reviewer-mode">
            ${[{value:"fixed",label:"\uACE0\uC815"},{value:"preset",label:"\uD504\uB9AC\uC14B \uAC12"}].map(B=>c`
                <label class="cmp-form__radio">
                  <input
                    type="radio"
                    name="cmp-reviewer-mode"
                    value=${B.value}
                    .checked=${k.reviewer_mode===B.value}
                    @change=${()=>{k.reviewer_mode=B.value,Ie()}}
                  />
                  <span>${B.label}</span>
                </label>
              `)}
          </div>
        </div>
        ${k.reviewer_mode==="fixed"?c`<div class="cmp-form__reviewer">
              ${_a.map(B=>c`
                  <label class="cmp-form__field">
                    <span class="cmp-form__label">${B}</span>
                    <input
                      type="text"
                      class="cmp-form__input"
                      data-reviewer-key=${B}
                      .value=${k.reviewer[B]||""}
                      @input=${U=>{k.reviewer={...k.reviewer,[B]:String(U.target.value||"")}}}
                    />
                  </label>
                `)}
            </div>`:null}
        ${k.error!==null?c`<div class="cmp-error" role="alert">${k.error}</div>`:null}
        <div class="cmp-form__actions">
          <button
            type="submit"
            class="op-btn"
            ?disabled=${k.submitting||!z()}
          >
            실험 시작
          </button>
          <button
            type="button"
            class="op-btn"
            @click=${()=>{k.open=!1,k.error=null,Ie()}}
          >
            취소
          </button>
        </div>
      </form>
    `}function de(){let F=g.selected===null?null:g.runs.find(ce=>ce.run_id===g.selected)??null;return c`
      <section class="cmp-bench">
        <div class="cmp-bench__head">
          <h3 class="cmp-bench__title">실험</h3>
          <button
            type="button"
            class="op-btn cmp-bench__new"
            @click=${()=>{k.open=!k.open,k.open&&(k.error=null,k.reviewer=ma(g.runs)),Ie()}}
          >
            새 실험
          </button>
        </div>
        ${k.open?ie():null}
        ${g.runs.length===0?c`<div class="cmp-empty">
              ${d?"\uC77D\uB294 \uC911\u2026":"\uC2E4\uD5D8 \uC5C6\uC74C"}
            </div>`:c`<div class="cmp-runs">
              ${g.runs.map(ce=>ue(ce))}
            </div>`}
        ${F===null?null:V(F)}
      </section>
    `}function Oe(){return _!==null?c`
        <div class="cmp-error" role="alert">
          <span>비교 데이터를 읽지 못했습니다 — ${_}</span>
          <button
            type="button"
            class="op-btn"
            @click=${()=>{ee()}}
          >
            새로고침
          </button>
        </div>
      `:m?l.groups.length===0?c`<div class="cmp-empty">
        해당 조건의 실행 기록이 없습니다
      </div>`:c`
      <table class="cmp-table">
        <thead>
          <tr>
            <th scope="col">프리셋 · 서명</th>
            <th scope="col">시간</th>
            <th scope="col">실패 · 재시도</th>
            <th scope="col">검증</th>
            <th scope="col">리뷰 지적 · 라운드</th>
            <th scope="col">토큰</th>
            <th scope="col">가격</th>
            <th scope="col">종료</th>
          </tr>
        </thead>
        <tbody>
          ${l.groups.map(F=>oe(F))}
        </tbody>
      </table>
    `:c`<div class="cmp-empty">${d?"\uC77D\uB294 \uC911\u2026":""}</div>`}function qe(){return c`
      <div class="cmp">
        <header class="cmp-head">
          <h2 class="cmp-title">프리셋 실사용 비교</h2>
          ${P()}
        </header>
        ${de()} ${Oe()}
      </div>
    `}function Ie(){ct(qe(),e)}let ge=null;return i&&i.subscribe&&(ge=i.subscribe(()=>{k.open&&Ie()})),Ie(),{load(){d||ee()},pause(){h+=1,d=!1},refresh(){return ee()},destroy(){ge&&(ge(),ge=null),ct(c``,e)}}}function My(e,t=document){let n=t.createElement("dialog");n.className="op-dialog continuation-dialog";let r=t.createElement("button"),s=t.createElement("button"),i=t.createElement("button"),o=t.createElement("h2"),a=t.createElement("p"),l=t.createElement("div");return l.className="op-dialog__actions",o.textContent="\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4",a.textContent=`${Ln(e.prior||{})||"\uC774\uC804 \uC124\uC815"} \u2192 ${Ln(e.current||{})||"\uD604\uC7AC \uC124\uC815"}`,r.type="button",r.className="op-btn",r.textContent="\uAE30\uC874 session \uC774\uC5B4\uD558\uAE30",r.disabled=e.prior_available===!1,s.type="button",s.className="op-btn",s.textContent="\uD604\uC7AC preset\uC73C\uB85C \uC0C8 session",i.type="button",i.className="op-btn",i.textContent="\uCDE8\uC18C",l.append(r,s,i),n.append(o,a,l),t.body.append(n),new Promise(u=>{let d=_=>{typeof n.close=="function"&&n.close(),n.remove(),u(_)};r.addEventListener("click",()=>d("prior_session")),s.addEventListener("click",()=>d("fresh_current")),i.addEventListener("click",()=>d(null)),n.addEventListener("cancel",_=>{_.preventDefault(),d(null)}),typeof n.showModal=="function"?n.showModal():n.setAttribute("open","")})}async function Dr(e,t,n={}){let r=e;for(n.onResult?.(r);r?.continuation_mismatch;){let s=r.continuation_mismatch,i=await My(s);if(i===null)return r;r=await t(i,s.decision_token),n.onResult?.(r),r?.conflict&&n.refresh&&(r=await n.refresh(r),n.onResult?.(r))}return r}function fc(e,t=document,n={}){let r=e?.kind,s=r==="settlement",i=r==="restart",o=r==="resume_recorded",a=i||o,l=n?.onSubmit,u=t.createElement("dialog");u.className="op-dialog resume-instructions-dialog";let d=t.createElement("h2"),_=t.createElement("textarea"),m=t.createElement("div"),h=t.createElement("button"),g=t.createElement("button"),T=t.createElement("p"),k=[e?.bead_id,e?.tuple].filter(ne=>typeof ne=="string"&&ne!=="").join(" \xB7 ");if(d.textContent=i?"\uC9C0\uC2DC\uC640 \uD568\uAED8 \uC7AC\uC2DC\uC791":o?"\uC9C0\uC2DC\uC640 \uD568\uAED8 \uC774\uC5B4\uD558\uAE30":s?"\uCC29\uC9C0 \uD6C4 \uC815\uB9AC \uC7AC\uC2DC\uB3C4":"\uC138\uC158 \uC774\uC5B4\uD558\uAE30",_.placeholder=a?"\uC774\uBC88 \uC7AC\uAC1C\uC5D0 \uC804\uB2EC\uD560 \uC9C0\uCE68 (\uD544\uC218)":"\uCD94\uAC00 \uC9C0\uCE68 (\uC120\uD0DD) \u2014 \uBE44\uC6CC\uB450\uBA74 \uAE30\uBCF8 \uC808\uCC28\uB85C \uC7AC\uAC1C",_.maxLength=4e3,a&&(_.required=!0),m.className="op-dialog__actions resume-instructions-dialog__actions",h.type="button",h.className="op-btn op-btn--primary",h.textContent=i?"\uC911\uB2E8 \uD6C4 \uC7AC\uC2DC\uC791":o?"\uC774\uC5B4\uD558\uAE30":s?"\uC815\uB9AC \uC7AC\uC2DC\uB3C4":"\uC774\uC5B4\uD558\uAE30",g.type="button",g.className="op-btn",g.textContent="\uCDE8\uC18C",T.className="resume-instructions-dialog__error",T.hidden=!0,m.append(h,g),u.append(d),a){let ne=t.createElement("p");ne.className="resume-instructions-dialog__desc",ne.textContent=i?"\uC2E4\uD589\uC744 \uC911\uB2E8\uD55C \uB4A4 \uAC19\uC740 \uC138\uC158 \uAE30\uB85D\uACFC \uC2E4\uD589 \uC124\uC815\uC73C\uB85C \uC774\uC5B4\uAC11\uB2C8\uB2E4. \uC2E4\uD589 \uC911\uC778 \uB3C4\uAD6C\uB294 \uC911\uB2E8\uB420 \uC218 \uC788\uC73C\uBA70 \uC791\uC5C5 \uB514\uB809\uD130\uB9AC\uB294 \uBCF4\uC874\uB429\uB2C8\uB2E4.":"\uAC19\uC740 \uC138\uC158 \uAE30\uB85D\uACFC \uC2E4\uD589 \uC124\uC815\uC73C\uB85C \uC774\uC5B4\uAC11\uB2C8\uB2E4. \uC2E4\uD589 \uC911\uC778 \uB3C4\uAD6C\uB294 \uC911\uB2E8\uB420 \uC218 \uC788\uC73C\uBA70 \uC791\uC5C5 \uB514\uB809\uD130\uB9AC\uB294 \uBCF4\uC874\uB429\uB2C8\uB2E4.",u.append(ne)}if(k!==""){let ne=t.createElement("p");ne.className="resume-instructions-dialog__target",ne.textContent=k,u.append(ne)}u.append(_,T,m),t.body.append(u);let ee=()=>{a&&(h.disabled=_.value.trim().length===0)};return ee(),new Promise(ne=>{let z=!1,N=!1,D=q=>{z||(z=!0,typeof u.close=="function"&&u.close(),u.remove(),ne(q))},M=async()=>{if(z||N)return;let q=_.value.trim();if(a&&q.length===0)return;if(!l){D(q);return}N=!0,h.disabled=!0,g.disabled=!0,T.hidden=!0;let G;try{G=await l(q)}catch{G={ok:!1,message:"\uC694\uCCAD\uC744 \uBCF4\uB0B4\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4."}}if(N=!1,G?.ok){D(q);return}T.textContent=G?.message||"\uC694\uCCAD\uC774 \uAC70\uBD80\uB418\uC5C8\uC2B5\uB2C8\uB2E4.",T.hidden=!1,g.disabled=!1,h.disabled=!1,ee(),_.focus()};h.addEventListener("click",()=>{M()}),g.addEventListener("click",()=>{N||D(null)}),_.addEventListener("input",ee),_.addEventListener("keydown",q=>{q.key==="Enter"&&(q.ctrlKey||q.metaKey)&&(q.preventDefault(),M())}),u.addEventListener("cancel",q=>{q.preventDefault(),N||D(null)}),typeof u.showModal=="function"?u.showModal():u.setAttribute("open",""),_.focus()})}async function Fs(e){let{context:t,transport:n,adopt:r}=e,s=await fc(t);if(s===null)return null;let i=s===""?{}:{instructions:s},o=await n({...i});if(r?.(o),o&&o.conflict&&(o=await n({...i}),r?.(o)),o=await Dr(o,(a,l)=>n({...i,continuation:a,decision_token:l}),{onResult:r,refresh:()=>n({...i})}),o&&o.resumed===!1&&!o.conflict&&o.reason){let a=t?.kind==="settlement"?"\uC815\uB9AC \uC7AC\uC2DC\uB3C4":"\uC774\uC5B4\uD558\uAE30";be(`${a} \uAC70\uBD80: ${o.reason}`,"error",2400)}return o}async function ba(e){let{context:t,pause:n,resume:r,snapshot:s}=e,i=t?.attempt_id||"",o=u=>u&&u.attempts&&u.attempts[i]||null,a=u=>Object.values(u?.attempts||{}).some(d=>d&&d.resumed_from===i),l=!1;return fc(t,document,{onSubmit:async u=>{if(t?.kind==="restart"&&!l){let m;try{m=await n()}catch{m=null}if(m&&m.paused===!0)l=!0;else{if(m&&m.paused===!1)return{ok:!1,message:`\uC7AC\uC2DC\uC791 \uAC70\uBD80: ${m.reason||"unknown"}`};{let h=o(s());return h&&h.status==="paused"?{ok:!1,message:"\uC911\uB2E8\uC740 \uC644\uB8CC\uB410\uC9C0\uB9CC \uC751\uB2F5\uC744 \uBC1B\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4. paused \uD589\uC758 [\uC9C0\uC2DC\uC640 \uD568\uAED8 \uC774\uC5B4\uD558\uAE30]\uB85C \uC7AC\uAC1C\uD558\uC138\uC694."}:{ok:!1,message:"\uC911\uB2E8 \uC751\uB2F5\uC744 \uBC1B\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694."}}}}let d={continuation:"prior_attempt",instructions:u},_;try{_=await r({...d}),_&&_.conflict===!0&&(_=await r({...d}))}catch{_=null}return _&&_.resumed===!0?{ok:!0}:_&&_.resumed===!1?{ok:!1,message:`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${_.reason||"unknown"}`}:a(s())?(be("\uC774\uBBF8 \uC7AC\uAC1C\uB428","info",2400),{ok:!0}):{ok:!1,message:"\uC7AC\uAC1C \uC751\uB2F5\uC744 \uBC1B\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4."}}})}function _c(e){return`session:${e.provider}:${e.session_id}`}function Io(e){return`${e.provider} \xB7 ${e.session_id.slice(0,8)}`}function qy(e,t){return e.current&&t==="in_progress"&&e.locality==="local"?"running":"done"}function Bs(e,t,n,r){return{attempt_id:_c(e),session_ref:{bead_id:t,provider:e.provider,session_id:e.session_id},...typeof r=="string"&&r.length>0?{root_dir:r}:{},hide_prompt:!0,meta:{runner:e.provider,label:Io(e),session_id:e.session_id,...typeof e.resume_command=="string"&&e.resume_command.length>0?{resume_command:e.resume_command}:{},status:qy(e,n)}}}function bf(e,t){let n=new Map(e.map((l,u)=>[l,u])),r=new Map(e.map(l=>[l,new Set]));for(let l of t)l.blocker!==l.blockee&&n.has(l.blocker)&&n.has(l.blockee)&&r.get(l.blockee).add(l.blocker);let s=new Set,i=[];for(;i.length<e.length;){let l=e.find(u=>{if(s.has(u))return!1;for(let d of r.get(u))if(!s.has(d))return!1;return!0});if(l===void 0)return{order:[...e],corrections:[],cycle:!0};s.add(l),i.push(l)}let o=[],a=new Map(i.map((l,u)=>[l,u]));for(let l of i){let u=null;for(let d of r.get(l)){let _=Number(n.get(l))<Number(n.get(d)),m=Number(a.get(l))>Number(a.get(d));_&&m&&(u===null||Number(a.get(d))>Number(a.get(u)))&&(u=d)}u!==null&&o.push({bead_id:l,after:u})}return{order:i,corrections:o,cycle:!1}}var jy="\uB2E4\uB978 \uB808\uD3EC \uC774\uC288\uB294 \uC774 \uC9C1\uB82C \uB808\uC778\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",ya="\uC758\uC874 \uC790\uB8CC \uBBF8\uD655\uC815 \u2014 \uAD50\uC815 \uBCF4\uB958",Fy="Worker \uD0ED \uC9C1\uB82C \uB808\uC778\uC5D0\uC11C \uBA3C\uC800 \uBE7C \uC8FC\uC138\uC694",By="\uC774\uBBF8 \uC9C4\uD589 \uC911\uC778 \uC774\uC288 \uC55E\uC5D0\uB294 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",Us="\uC5F0\uACB0 \uB808\uC778\uC774 \uC5C6\uC2B5\uB2C8\uB2E4";function Lo(e,t){return`${e}\0${t}`}function Uy(e,t){let n=new Set(e),r=new Map;for(let s of e){let i=t.placed_members.has(s)?t.snapshot_blocked_by:t.runnable_blocked_by,o=i instanceof Map?i.get(s):void 0;if(!Array.isArray(o))return null;r.set(s,o.filter(a=>a!==s&&n.has(a)))}return r}function Wy(e,t){if(e.status!=="confirmed")return 0;let n=-1;return e.entries.forEach((r,s)=>{t.fixed_members.has(r.bead_id)&&(n=s)}),n+1}function No(e,t){let n=e.entries,r=n.map(_=>_.bead_id),s=Uy(r,t);if(s===null)return{entries:n,corrections:[],cycle:!1,held:!0,mismatched:[]};let i=[];for(let[_,m]of s)for(let h of m)i.push({blocker:h,blockee:_});let o=Wy(e,t),a=new Map(r.map((_,m)=>[_,m])),l=r.slice(0,o).filter(_=>s.get(_).some(m=>Number(a.get(m))>Number(a.get(_)))),u=bf(r.slice(o),i);if(u.cycle)return{entries:n,corrections:[],cycle:!0,held:!1,mismatched:l};let d=new Map(n.map(_=>[_.bead_id,_]));return{entries:[...n.slice(0,o),...u.order.map(_=>d.get(_))],corrections:u.corrections,cycle:!1,held:!1,mismatched:l}}function vf(e,t){let n=t.cross_lanes.get(e);return n===void 0?null:No(n,t)}function Hy(e,t){if(!(t.corrections.length===0&&!t.cycle&&!t.held&&t.mismatched.length===0))return{lane_id:e,corrected:t.corrections.length,cycle:t.cycle,held:t.held,mismatched:t.mismatched}}function zy(e){return`${e}\uC758 \uB808\uD3EC\uB97C \uC54C \uC218 \uC5C6\uC5B4 \uC758\uC874\uC744 \uBC14\uAFC0 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4`}function Ky(e){let t=new Map;for(let[n,r]of e)t.set(n,r.slice());return t}function mc(e,t,n){let r=new Set([t]),s=[t];for(;s.length>0;){let i=s.pop();for(let o of e.get(i)||[]){if(o===n)return!0;r.has(o)||(r.add(o),s.push(o))}}return!1}function Gy(e,t){let n=new Set;for(let[o,a]of t)for(let l of a)n.add(Lo(o,l));let r=new Map,s=new Map;for(let o of e){let a=Lo(o.a,o.b);r.set(a,o),s.set(a,o.type==="dep-add")}let i=[];for(let o of e){let a=Lo(o.a,o.b);r.get(a)===o&&s.get(a)!==n.has(a)&&i.push(o)}return i}function Vy(e,t,n){let r=e.parallel_rows,s=Math.max(0,Math.min(r.length,n)),i=r[s];if(i&&i.root_dir===t)return i.queue_index;for(let o=s-1;o>=0;o--)if(r[o].root_dir===t)return r[o].queue_index+1;for(let o=s;o<r.length;o++)if(r[o].root_dir===t)return r[o].queue_index;return e.parallel_raw_length.get(t)??0}function Yy(e,t){return e.parallel_rows.some(n=>n.root_dir===t)}function yf(e,t,n,r){return{type:"worker-queue-place",payload:{bead_id:e,...r?{lane:r}:{},index:n},root_dir:t}}function gc(e,t){let n=0;for(let r of e.cross_lanes.keys())if(n+=1,r===t)return n;return n+1}function Mo(e){let t=Ky(e.blocked_by_map),n=[],r=new Set,s={refusal:null},i=u=>{let d=e.owner_of.get(u);return typeof d!="string"||d.length===0?(s.refusal=zy(u),null):d};return{graph:t,dep_ops:n,state:s,ownerOf:i,addDep:(u,d,_)=>{if(s.refusal!==null||u===d)return;let m=t.get(u)||[];if(m.includes(d))return;let h=i(u);if(h!==null){if(mc(t,d,u)){s.refusal=`\uC758\uC874 \uC0AC\uC774\uD074\uC774 \uC0DD\uAE41\uB2C8\uB2E4 \u2014 ${u}\uAC00 \uC774\uBBF8 ${d}\uB97C \uB9C9\uACE0 \uC788\uC2B5\uB2C8\uB2E4`;return}t.set(u,[...m,d]),_!==void 0&&r.add(Lo(u,d)),n.push({type:"dep-add",a:u,b:d,root_dir:h,..._===void 0?{}:{lane_id:_}})}},removeDep:(u,d)=>{if(s.refusal!==null||u===d)return;let _=t.get(u)||[];if(!_.includes(d))return;let m=i(u);m!==null&&(t.set(u,_.filter(h=>h!==d)),n.push({type:"dep-remove",a:u,b:d,root_dir:m}))},laneCreated:(u,d)=>r.has(Lo(u,d))}}function qo(e,t,n,r,s={}){if(e.state.refusal!==null)return{refused:e.state.refusal};let i=Gy(e.dep_ops,t.blocked_by_map),o=i.filter(d=>d.type==="dep-remove"),a=i.filter(d=>d.type==="dep-add"),l=s.disarm_ops??[],u=s.lane_id===void 0||s.correction===void 0?void 0:Hy(s.lane_id,s.correction);return{lane_ops:n,ops:[...o,...l,...a,...r],lane_op_index:o.length+l.length,...u===void 0?{}:{correction:u}}}function kf(e,t,n){for(let r=1;r<t.length;r+=1)e.addDep(t[r].bead_id,t[r-1].bead_id,n)}function Do(e,t){return t>0&&e.entries[t]?.dep_created_by_lane===!0}function wf(e,t,n,r){if(t.status!=="confirmed")return[];let s=[],i=new Map;for(let o of r){let a=e.owner_of.get(o.bead_id)||o.root_dir;typeof a!="string"||a.length===0||i.set(a,[...i.get(a)||[],o.bead_id])}for(let[o,a]of i)s.push({type:"worker-queue-disarm",payload:{bead_ids:a,lane_id:n},root_dir:o});return s}function Po(e){return e.map(t=>({bead_id:t.bead_id,root_dir:t.root_dir}))}function va(e,t){return e.length===t.length&&e.every((n,r)=>n.bead_id===t[r].bead_id&&n.root_dir===t[r].root_dir)}function ka(e,t,n){let r=Mo(n),s=[],i=[],o=[],a,l=n.owner_lane_of.get(e.bead_id),u=e.kind==="chain"?e.lane_id??l:void 0,d=u===void 0?void 0:n.cross_lanes.get(u);if(t.kind==="repo-serial"&&e.root_dir!==t.root_dir)return{refused:jy};if(t.kind==="chain"){if(e.kind==="repo-serial")return{refused:Fy};if(e.kind!=="chain"&&typeof l=="string"&&l!==t.lane_id&&n.cross_lanes.has(l))return{refused:`\uC774\uBBF8 \uC5F0\uACB0 ${gc(n,l)}\uC5D0 \uC788\uC2B5\uB2C8\uB2E4`};if(!n.cross_lanes.has(t.lane_id))return{refused:Us}}if(e.kind==="chain"&&d===void 0)return{refused:Us};let _=()=>{if(d===void 0||d.status!=="confirmed")return;let g=d.entries.findIndex(z=>z.bead_id===e.bead_id);if(g<0)return;let T=g>0?d.entries[g-1]:null,k=g+1<d.entries.length?d.entries[g+1]:null,ee=Do(d,g),ne=k!==null&&Do(d,g+1);ee&&T!==null&&r.removeDep(e.bead_id,T.bead_id),ne&&k!==null&&r.removeDep(k.bead_id,e.bead_id),(ee||ne)&&T!==null&&k!==null&&r.addDep(k.bead_id,T.bead_id,u)},m=(g,T)=>{let k=n.cross_lanes.get(g),ee=k.entries.findIndex($=>$.bead_id===e.bead_id),ne=k.entries.filter($=>$.bead_id!==e.bead_id),z=Math.max(0,Math.min(ne.length,ee>=0&&T>ee?T-1:T)),N=-1;if(ne.forEach(($,O)=>{n.fixed_members.has($.bead_id)&&(N=O)}),z<=N){r.state.refusal=By;return}let D=ee>=0?k.entries[ee]:d?.entries.find($=>$.bead_id===e.bead_id)??{bead_id:e.bead_id,root_dir:e.root_dir};a=No({status:k.status,entries:[...ne.slice(0,z),D,...ne.slice(z)]},n);let M=a.entries;if(va(M,k.entries)||s.push({type:"monitor-lane-update",payload:{lane_id:g,entries:Po(M)}}),k.status!=="confirmed")return;let q=M.findIndex($=>$.bead_id===e.bead_id),G=q>0?M[q-1].bead_id:null,P=q+1<M.length?M[q+1].bead_id:null;if(G===null){P!==null&&r.addDep(P,e.bead_id,g);return}if(r.addDep(e.bead_id,G,g),P!==null&&(r.graph.get(P)||[]).includes(G)){let $=k.entries.findIndex(O=>O.bead_id===P);(r.laneCreated(P,G)||$>0&&k.entries[$-1].bead_id===G&&Do(k,$))&&r.removeDep(P,G),r.addDep(P,e.bead_id,g)}},h=typeof e.queue_index=="number"?e.queue_index:n.queue_index_of.get(e.bead_id);if(e.kind==="chain"&&(_(),d!==void 0&&(t.kind!=="chain"||t.lane_id!==u))){let g=d.entries.filter(k=>k.bead_id!==e.bead_id),T=d.status==="confirmed"&&g.length<2?d.entries:d.entries.filter(k=>k.bead_id===e.bead_id);o.push(...wf(n,d,u,T)),s.push({type:"monitor-lane-update",payload:{lane_id:u,entries:Po(g)}})}if(t.kind==="chain"&&m(t.lane_id,t.marker_index),r.state.refusal!==null)return{refused:r.state.refusal};if(t.kind==="candidate")e.kind!=="candidate"&&i.push({type:"worker-queue-remove",payload:{bead_id:e.bead_id},root_dir:e.root_dir});else if(t.kind==="parallel"){let g=Vy(n,e.root_dir,t.marker_index);if(e.kind==="candidate"||e.kind==="repo-serial")i.push(yf(e.bead_id,e.root_dir,g));else if(e.kind==="parallel"){let T=n.parallel_rows,k=T[Math.max(0,Math.min(T.length,t.marker_index))];if(!(!!k&&k.bead_id===e.bead_id)&&Yy(n,e.root_dir)&&h!==void 0){let ne=h>g?g:g-1;ne>=0&&ne!==h&&i.push({type:"worker-queue-reorder",payload:{bead_id:e.bead_id,to_index:ne},root_dir:e.root_dir})}}}else if(t.kind!=="chain")if(e.kind==="repo-serial"&&e.lane_id===t.lane_id){if(h!==void 0&&t.index!==h){let g=h>t.index?t.index:t.index-1;g>=0&&g!==h&&i.push({type:"worker-queue-reorder",payload:{bead_id:e.bead_id,lane:t.lane_id,to_index:g},root_dir:e.root_dir})}}else i.push(yf(e.bead_id,e.root_dir,t.index,t.lane_id));return qo(r,n,s,i,{disarm_ops:o,...t.kind==="chain"?{lane_id:t.lane_id,correction:a}:{}})}function $f(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:Us};if(n.entries.length<2)return{refused:"\uD655\uC815\uD558\uB824\uBA74 \uBA64\uBC84\uAC00 2\uAC1C \uC774\uC0C1\uC774\uC5B4\uC57C \uD569\uB2C8\uB2E4"};let r=No(n,t);if(r.held)return{refused:ya};let s=r.entries,i=Mo(t),o=[];kf(i,s,e);let a=va(s,n.entries)?[]:[{type:"monitor-lane-update",payload:{lane_id:e,entries:Po(s)}}];return a.push({type:"monitor-lane-confirm",payload:{lane_id:e}}),qo(i,t,a,o,{lane_id:e,correction:r})}function xf(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:Us};let r=No(n,t),s=r.entries,i=Mo(t),o=[];kf(i,s,e);let a=va(s,n.entries)?[]:[{type:"monitor-lane-update",payload:{lane_id:e,entries:Po(s)}}];return qo(i,t,a,o,{lane_id:e,correction:r})}function Af(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:Us};let r=No(n,t),s=r.entries;return qo(Mo(t),t,va(s,n.entries)?[]:[{type:"monitor-lane-update",payload:{lane_id:e,entries:Po(s)}}],[],{lane_id:e,correction:r})}function Sf(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:Us};let r=Mo(t);if(n.status==="confirmed")for(let s=1;s<n.entries.length;s+=1)Do(n,s)&&r.removeDep(n.entries[s].bead_id,n.entries[s-1].bead_id);return qo(r,t,[{type:"monitor-lane-remove",payload:{lane_id:e}}],[],{disarm_ops:wf(t,n,e,n.entries)})}function Ef(e,t){let n=t.cross_lanes.get(e);if(n===void 0||n.status!=="confirmed")return null;let r=[],s=[];for(let o=1;o<n.entries.length;o+=1){let a=`  ${n.entries[o].bead_id} \u2190 ${n.entries[o-1].bead_id}`;Do(n,o)?r.push(a):s.push(`${a} (\uB808\uC778\uC774 \uB9CC\uB4E4\uC9C0 \uC54A\uC74C)`)}let i=`\uC5F0\uACB0 ${gc(t,e)}\uC744 \uC9C0\uC6C1\uB2C8\uB2E4.`;return r.length===0?`${i}
\uC758\uC874\uC740 \uADF8\uB300\uB85C \uB461\uB2C8\uB2E4`:[i,"\uD568\uAED8 \uC81C\uAC70\uD560 \uC758\uC874:",...r,...s.length===0?[]:["\uADF8\uB300\uB85C \uB450\uB294 \uC758\uC874:",...s]].join(`
`)}function Tf(e){let t=new Map;for(let n of e)n.type!=="dep-add"||typeof n.lane_id!="string"||t.set(n.lane_id,[...t.get(n.lane_id)||[],{bead_id:n.a,after:n.b}]);return[...t].map(([n,r])=>({lane_id:n,pairs:r}))}function Rf(e,t){let n=new Map(e.map((r,s)=>[r.bead_id,s]));return t.filter(r=>{let s=n.get(r.bead_id);return s!==void 0&&s>0&&e[s-1].bead_id===r.after})}function hc(e,t){if(e!==null){let n=t.owner_lane_of.get(e.bead_id);if(typeof n=="string"&&t.cross_lanes.has(n))return{refused:`\uC774\uBBF8 \uC5F0\uACB0 ${gc(t,n)}\uC5D0 \uC788\uC2B5\uB2C8\uB2E4`}}return{lane_ops:[{type:"monitor-lane-create",payload:{entries:e===null?[]:[e]}}],ops:[],lane_op_index:0}}var Xy="\uC0AC\uC774\uD074";function Qy(e){let t=new Map,n=r=>Array.isArray(r)?r.filter(s=>typeof s=="string"&&s.length>0):[];for(let r of Array.isArray(e)?e:[]){if(!r||typeof r!="object")continue;let s=r.bead_blocked_by&&typeof r.bead_blocked_by=="object"?r.bead_blocked_by:{};for(let[i,o]of Object.entries(s))Array.isArray(o)&&t.set(i,n(o));for(let i of[...Array.isArray(r.runnable)?r.runnable:[],...Array.isArray(r.session_active)?r.session_active:[]])i&&typeof i.bead_id=="string"&&Array.isArray(i.blocked_by)&&i.blocked_by.length>0&&t.set(i.bead_id,n(i.blocked_by))}return t}function bc(e,t,n){let r=Ir(e,t),s=[],i=new Set,o=(l,u)=>{for(let d of l)i.has(d.id)||(i.add(d.id),s.push({bead_id:d.id,root_dir:d.root_dir,workspace_name:d.workspace_name,title:d.title,lane:u}))};o(r.running,"running"),o(r.pr_wait,"pr_wait"),o(r.queue,"queue"),o(r.runnable_all,"runnable");let a=n&&typeof n.root_dir=="string"&&n.root_dir.length?n.root_dir:null;return{issues:a===null?s:s.filter(l=>l.root_dir===a),blocked_by_map:Qy(e)}}function Cf(e,t){let n=new Map;for(let o of t.issues)!o||typeof o.bead_id!="string"||o.bead_id.length===0||n.has(o.bead_id)||n.set(o.bead_id,o);let r=n.get(e)?.root_dir,s=t.blocked_by_map.get(e)||[],i=[];for(let o of n.values()){if(o.bead_id===e||o.lane==="done"||s.includes(o.bead_id))continue;let a=mc(t.blocked_by_map,o.bead_id,e);i.push({...o,disabled:a,...a?{reason:Xy}:{}})}return i.sort((o,a)=>{let l=r!==void 0&&o.root_dir===r,u=r!==void 0&&a.root_dir===r;return l!==u?l?-1:1:o.bead_id.localeCompare(a.bead_id)}),i}function Of(e,t){let n=t.trim().toLowerCase();return n.length===0?e.slice():e.filter(r=>r.bead_id.toLowerCase().includes(n)||r.title.toLowerCase().includes(n))}var Zy=/^\S+-\S+$/;function If(e){return Zy.test(e.trim())}var{entries:Bf,setPrototypeOf:Lf,isFrozen:Jy,getPrototypeOf:ev,getOwnPropertyDescriptor:tv}=Object,{freeze:An,seal:qn,create:Ac}=Object,{apply:Sc,construct:Ec}=typeof Reflect<"u"&&Reflect;An||(An=function(t){return t});qn||(qn=function(t){return t});Sc||(Sc=function(t,n){for(var r=arguments.length,s=new Array(r>2?r-2:0),i=2;i<r;i++)s[i-2]=arguments[i];return t.apply(n,s)});Ec||(Ec=function(t){for(var n=arguments.length,r=new Array(n>1?n-1:0),s=1;s<n;s++)r[s-1]=arguments[s];return new t(...r)});var wa=Sn(Array.prototype.forEach),nv=Sn(Array.prototype.lastIndexOf),Df=Sn(Array.prototype.pop),jo=Sn(Array.prototype.push),rv=Sn(Array.prototype.splice),xa=Sn(String.prototype.toLowerCase),yc=Sn(String.prototype.toString),vc=Sn(String.prototype.match),Fo=Sn(String.prototype.replace),sv=Sn(String.prototype.indexOf),ov=Sn(String.prototype.trim),zn=Sn(Object.prototype.hasOwnProperty),xn=Sn(RegExp.prototype.test),Bo=iv(TypeError);function Sn(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var n=arguments.length,r=new Array(n>1?n-1:0),s=1;s<n;s++)r[s-1]=arguments[s];return Sc(e,t,r)}}function iv(e){return function(){for(var t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];return Ec(e,n)}}function Lt(e,t){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:xa;Lf&&Lf(e,null);let r=t.length;for(;r--;){let s=t[r];if(typeof s=="string"){let i=n(s);i!==s&&(Jy(t)||(t[r]=i),s=i)}e[s]=!0}return e}function av(e){for(let t=0;t<e.length;t++)zn(e,t)||(e[t]=null);return e}function gr(e){let t=Ac(null);for(let[n,r]of Bf(e))zn(e,n)&&(Array.isArray(r)?t[n]=av(r):r&&typeof r=="object"&&r.constructor===Object?t[n]=gr(r):t[n]=r);return t}function Uo(e,t){for(;e!==null;){let r=tv(e,t);if(r){if(r.get)return Sn(r.get);if(typeof r.value=="function")return Sn(r.value)}e=ev(e)}function n(){return null}return n}var Pf=An(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),kc=An(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),wc=An(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),lv=An(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),$c=An(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),cv=An(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),Nf=An(["#text"]),Mf=An(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),xc=An(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),qf=An(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),$a=An(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),uv=qn(/\{\{[\w\W]*|[\w\W]*\}\}/gm),dv=qn(/<%[\w\W]*|[\w\W]*%>/gm),pv=qn(/\$\{[\w\W]*/gm),fv=qn(/^data-[\-\w.\u00B7-\uFFFF]+$/),_v=qn(/^aria-[\-\w]+$/),Uf=qn(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),mv=qn(/^(?:\w+script|data):/i),gv=qn(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),Wf=qn(/^html$/i),hv=qn(/^[a-z][.\w]*(-[.\w]+)+$/i),jf=Object.freeze({__proto__:null,ARIA_ATTR:_v,ATTR_WHITESPACE:gv,CUSTOM_ELEMENT:hv,DATA_ATTR:fv,DOCTYPE_NAME:Wf,ERB_EXPR:dv,IS_ALLOWED_URI:Uf,IS_SCRIPT_OR_DATA:mv,MUSTACHE_EXPR:uv,TMPLIT_EXPR:pv}),Wo={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,progressingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},bv=function(){return typeof window>"u"?null:window},yv=function(t,n){if(typeof t!="object"||typeof t.createPolicy!="function")return null;let r=null,s="data-tt-policy-suffix";n&&n.hasAttribute(s)&&(r=n.getAttribute(s));let i="dompurify"+(r?"#"+r:"");try{return t.createPolicy(i,{createHTML(o){return o},createScriptURL(o){return o}})}catch{return console.warn("TrustedTypes policy "+i+" could not be created."),null}},Ff=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function Hf(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:bv(),t=Ke=>Hf(Ke);if(t.version="3.3.0",t.removed=[],!e||!e.document||e.document.nodeType!==Wo.document||!e.Element)return t.isSupported=!1,t;let{document:n}=e,r=n,s=r.currentScript,{DocumentFragment:i,HTMLTemplateElement:o,Node:a,Element:l,NodeFilter:u,NamedNodeMap:d=e.NamedNodeMap||e.MozNamedAttrMap,HTMLFormElement:_,DOMParser:m,trustedTypes:h}=e,g=l.prototype,T=Uo(g,"cloneNode"),k=Uo(g,"remove"),ee=Uo(g,"nextSibling"),ne=Uo(g,"childNodes"),z=Uo(g,"parentNode");if(typeof o=="function"){let Ke=n.createElement("template");Ke.content&&Ke.content.ownerDocument&&(n=Ke.content.ownerDocument)}let N,D="",{implementation:M,createNodeIterator:q,createDocumentFragment:G,getElementsByTagName:P}=n,{importNode:$}=r,O=Ff();t.isSupported=typeof Bf=="function"&&typeof z=="function"&&M&&M.createHTMLDocument!==void 0;let{MUSTACHE_EXPR:C,ERB_EXPR:oe,TMPLIT_EXPR:ue,DATA_ATTR:me,ARIA_ATTR:V,IS_SCRIPT_OR_DATA:ie,ATTR_WHITESPACE:de,CUSTOM_ELEMENT:Oe}=jf,{IS_ALLOWED_URI:qe}=jf,Ie=null,ge=Lt({},[...Pf,...kc,...wc,...$c,...Nf]),F=null,ce=Lt({},[...Mf,...xc,...qf,...$a]),pe=Object.seal(Ac(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),B=null,U=null,Re=Object.seal(Ac(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}})),W=!0,te=!0,J=!1,Y=!0,ke=!1,fe=!0,Le=!1,Ne=!1,Je=!1,Be=!1,re=!1,Q=!1,Te=!0,et=!1,dt="user-content-",Qe=!0,gt=!1,Pt={},St=null,ot=Lt({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]),ht=null,Jt=Lt({},["audio","video","img","source","image","track"]),w=null,se=Lt({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),De="http://www.w3.org/1998/Math/MathML",Se="http://www.w3.org/2000/svg",Me="http://www.w3.org/1999/xhtml",We=Me,tt=!1,It=null,_e=Lt({},[De,Se,Me],yc),xe=Lt({},["mi","mo","mn","ms","mtext"]),Ze=Lt({},["annotation-xml"]),yt=Lt({},["title","style","font","a","script"]),it=null,ut=["application/xhtml+xml","text/html"],bt="text/html",st=null,ze=null,E=n.createElement("form"),K=function(L){return L instanceof RegExp||L instanceof Function},X=function(){let L=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(ze&&ze===L)){if((!L||typeof L!="object")&&(L={}),L=gr(L),it=ut.indexOf(L.PARSER_MEDIA_TYPE)===-1?bt:L.PARSER_MEDIA_TYPE,st=it==="application/xhtml+xml"?yc:xa,Ie=zn(L,"ALLOWED_TAGS")?Lt({},L.ALLOWED_TAGS,st):ge,F=zn(L,"ALLOWED_ATTR")?Lt({},L.ALLOWED_ATTR,st):ce,It=zn(L,"ALLOWED_NAMESPACES")?Lt({},L.ALLOWED_NAMESPACES,yc):_e,w=zn(L,"ADD_URI_SAFE_ATTR")?Lt(gr(se),L.ADD_URI_SAFE_ATTR,st):se,ht=zn(L,"ADD_DATA_URI_TAGS")?Lt(gr(Jt),L.ADD_DATA_URI_TAGS,st):Jt,St=zn(L,"FORBID_CONTENTS")?Lt({},L.FORBID_CONTENTS,st):ot,B=zn(L,"FORBID_TAGS")?Lt({},L.FORBID_TAGS,st):gr({}),U=zn(L,"FORBID_ATTR")?Lt({},L.FORBID_ATTR,st):gr({}),Pt=zn(L,"USE_PROFILES")?L.USE_PROFILES:!1,W=L.ALLOW_ARIA_ATTR!==!1,te=L.ALLOW_DATA_ATTR!==!1,J=L.ALLOW_UNKNOWN_PROTOCOLS||!1,Y=L.ALLOW_SELF_CLOSE_IN_ATTR!==!1,ke=L.SAFE_FOR_TEMPLATES||!1,fe=L.SAFE_FOR_XML!==!1,Le=L.WHOLE_DOCUMENT||!1,Be=L.RETURN_DOM||!1,re=L.RETURN_DOM_FRAGMENT||!1,Q=L.RETURN_TRUSTED_TYPE||!1,Je=L.FORCE_BODY||!1,Te=L.SANITIZE_DOM!==!1,et=L.SANITIZE_NAMED_PROPS||!1,Qe=L.KEEP_CONTENT!==!1,gt=L.IN_PLACE||!1,qe=L.ALLOWED_URI_REGEXP||Uf,We=L.NAMESPACE||Me,xe=L.MATHML_TEXT_INTEGRATION_POINTS||xe,Ze=L.HTML_INTEGRATION_POINTS||Ze,pe=L.CUSTOM_ELEMENT_HANDLING||{},L.CUSTOM_ELEMENT_HANDLING&&K(L.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(pe.tagNameCheck=L.CUSTOM_ELEMENT_HANDLING.tagNameCheck),L.CUSTOM_ELEMENT_HANDLING&&K(L.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(pe.attributeNameCheck=L.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),L.CUSTOM_ELEMENT_HANDLING&&typeof L.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(pe.allowCustomizedBuiltInElements=L.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),ke&&(te=!1),re&&(Be=!0),Pt&&(Ie=Lt({},Nf),F=[],Pt.html===!0&&(Lt(Ie,Pf),Lt(F,Mf)),Pt.svg===!0&&(Lt(Ie,kc),Lt(F,xc),Lt(F,$a)),Pt.svgFilters===!0&&(Lt(Ie,wc),Lt(F,xc),Lt(F,$a)),Pt.mathMl===!0&&(Lt(Ie,$c),Lt(F,qf),Lt(F,$a))),L.ADD_TAGS&&(typeof L.ADD_TAGS=="function"?Re.tagCheck=L.ADD_TAGS:(Ie===ge&&(Ie=gr(Ie)),Lt(Ie,L.ADD_TAGS,st))),L.ADD_ATTR&&(typeof L.ADD_ATTR=="function"?Re.attributeCheck=L.ADD_ATTR:(F===ce&&(F=gr(F)),Lt(F,L.ADD_ATTR,st))),L.ADD_URI_SAFE_ATTR&&Lt(w,L.ADD_URI_SAFE_ATTR,st),L.FORBID_CONTENTS&&(St===ot&&(St=gr(St)),Lt(St,L.FORBID_CONTENTS,st)),Qe&&(Ie["#text"]=!0),Le&&Lt(Ie,["html","head","body"]),Ie.table&&(Lt(Ie,["tbody"]),delete B.tbody),L.TRUSTED_TYPES_POLICY){if(typeof L.TRUSTED_TYPES_POLICY.createHTML!="function")throw Bo('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof L.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw Bo('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');N=L.TRUSTED_TYPES_POLICY,D=N.createHTML("")}else N===void 0&&(N=yv(h,s)),N!==null&&typeof D=="string"&&(D=N.createHTML(""));An&&An(L),ze=L}},Ee=Lt({},[...kc,...wc,...lv]),ye=Lt({},[...$c,...cv]),wt=function(L){let ve=z(L);(!ve||!ve.tagName)&&(ve={namespaceURI:We,tagName:"template"});let je=xa(L.tagName),xt=xa(ve.tagName);return It[L.namespaceURI]?L.namespaceURI===Se?ve.namespaceURI===Me?je==="svg":ve.namespaceURI===De?je==="svg"&&(xt==="annotation-xml"||xe[xt]):!!Ee[je]:L.namespaceURI===De?ve.namespaceURI===Me?je==="math":ve.namespaceURI===Se?je==="math"&&Ze[xt]:!!ye[je]:L.namespaceURI===Me?ve.namespaceURI===Se&&!Ze[xt]||ve.namespaceURI===De&&!xe[xt]?!1:!ye[je]&&(yt[je]||!Ee[je]):!!(it==="application/xhtml+xml"&&It[L.namespaceURI]):!1},kt=function(L){jo(t.removed,{element:L});try{z(L).removeChild(L)}catch{k(L)}},Rt=function(L,ve){try{jo(t.removed,{attribute:ve.getAttributeNode(L),from:ve})}catch{jo(t.removed,{attribute:null,from:ve})}if(ve.removeAttribute(L),L==="is")if(Be||re)try{kt(ve)}catch{}else try{ve.setAttribute(L,"")}catch{}},jt=function(L){let ve=null,je=null;if(Je)L="<remove></remove>"+L;else{let Dt=vc(L,/^[\r\n\t ]+/);je=Dt&&Dt[0]}it==="application/xhtml+xml"&&We===Me&&(L='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+L+"</body></html>");let xt=N?N.createHTML(L):L;if(We===Me)try{ve=new m().parseFromString(xt,it)}catch{}if(!ve||!ve.documentElement){ve=M.createDocument(We,"template",null);try{ve.documentElement.innerHTML=tt?D:xt}catch{}}let Ve=ve.body||ve.documentElement;return L&&je&&Ve.insertBefore(n.createTextNode(je),Ve.childNodes[0]||null),We===Me?P.call(ve,Le?"html":"body")[0]:Le?ve.documentElement:Ve},Wt=function(L){return q.call(L.ownerDocument||L,L,u.SHOW_ELEMENT|u.SHOW_COMMENT|u.SHOW_TEXT|u.SHOW_PROCESSING_INSTRUCTION|u.SHOW_CDATA_SECTION,null)},Xt=function(L){return L instanceof _&&(typeof L.nodeName!="string"||typeof L.textContent!="string"||typeof L.removeChild!="function"||!(L.attributes instanceof d)||typeof L.removeAttribute!="function"||typeof L.setAttribute!="function"||typeof L.namespaceURI!="string"||typeof L.insertBefore!="function"||typeof L.hasChildNodes!="function")},an=function(L){return typeof a=="function"&&L instanceof a};function $t(Ke,L,ve){wa(Ke,je=>{je.call(t,L,ve,ze)})}let rn=function(L){let ve=null;if($t(O.beforeSanitizeElements,L,null),Xt(L))return kt(L),!0;let je=st(L.nodeName);if($t(O.uponSanitizeElement,L,{tagName:je,allowedTags:Ie}),fe&&L.hasChildNodes()&&!an(L.firstElementChild)&&xn(/<[/\w!]/g,L.innerHTML)&&xn(/<[/\w!]/g,L.textContent)||L.nodeType===Wo.progressingInstruction||fe&&L.nodeType===Wo.comment&&xn(/<[/\w]/g,L.data))return kt(L),!0;if(!(Re.tagCheck instanceof Function&&Re.tagCheck(je))&&(!Ie[je]||B[je])){if(!B[je]&&qt(je)&&(pe.tagNameCheck instanceof RegExp&&xn(pe.tagNameCheck,je)||pe.tagNameCheck instanceof Function&&pe.tagNameCheck(je)))return!1;if(Qe&&!St[je]){let xt=z(L)||L.parentNode,Ve=ne(L)||L.childNodes;if(Ve&&xt){let Dt=Ve.length;for(let Ht=Dt-1;Ht>=0;--Ht){let at=T(Ve[Ht],!0);at.__removalCount=(L.__removalCount||0)+1,xt.insertBefore(at,ee(L))}}}return kt(L),!0}return L instanceof l&&!wt(L)||(je==="noscript"||je==="noembed"||je==="noframes")&&xn(/<\/no(script|embed|frames)/i,L.innerHTML)?(kt(L),!0):(ke&&L.nodeType===Wo.text&&(ve=L.textContent,wa([C,oe,ue],xt=>{ve=Fo(ve,xt," ")}),L.textContent!==ve&&(jo(t.removed,{element:L.cloneNode()}),L.textContent=ve)),$t(O.afterSanitizeElements,L,null),!1)},fn=function(L,ve,je){if(Te&&(ve==="id"||ve==="name")&&(je in n||je in E))return!1;if(!(te&&!U[ve]&&xn(me,ve))){if(!(W&&xn(V,ve))){if(!(Re.attributeCheck instanceof Function&&Re.attributeCheck(ve,L))){if(!F[ve]||U[ve]){if(!(qt(L)&&(pe.tagNameCheck instanceof RegExp&&xn(pe.tagNameCheck,L)||pe.tagNameCheck instanceof Function&&pe.tagNameCheck(L))&&(pe.attributeNameCheck instanceof RegExp&&xn(pe.attributeNameCheck,ve)||pe.attributeNameCheck instanceof Function&&pe.attributeNameCheck(ve,L))||ve==="is"&&pe.allowCustomizedBuiltInElements&&(pe.tagNameCheck instanceof RegExp&&xn(pe.tagNameCheck,je)||pe.tagNameCheck instanceof Function&&pe.tagNameCheck(je))))return!1}else if(!w[ve]){if(!xn(qe,Fo(je,de,""))){if(!((ve==="src"||ve==="xlink:href"||ve==="href")&&L!=="script"&&sv(je,"data:")===0&&ht[L])){if(!(J&&!xn(ie,Fo(je,de,"")))){if(je)return!1}}}}}}}return!0},qt=function(L){return L!=="annotation-xml"&&vc(L,Oe)},Gt=function(L){$t(O.beforeSanitizeAttributes,L,null);let{attributes:ve}=L;if(!ve||Xt(L))return;let je={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:F,forceKeepAttr:void 0},xt=ve.length;for(;xt--;){let Ve=ve[xt],{name:Dt,namespaceURI:Ht,value:at}=Ve,Ct=st(Dt),hn=at,Nt=Dt==="value"?hn:ov(hn);if(je.attrName=Ct,je.attrValue=Nt,je.keepAttr=!0,je.forceKeepAttr=void 0,$t(O.uponSanitizeAttribute,L,je),Nt=je.attrValue,et&&(Ct==="id"||Ct==="name")&&(Rt(Dt,L),Nt=dt+Nt),fe&&xn(/((--!?|])>)|<\/(style|title|textarea)/i,Nt)){Rt(Dt,L);continue}if(Ct==="attributename"&&vc(Nt,"href")){Rt(Dt,L);continue}if(je.forceKeepAttr)continue;if(!je.keepAttr){Rt(Dt,L);continue}if(!Y&&xn(/\/>/i,Nt)){Rt(Dt,L);continue}ke&&wa([C,oe,ue],bn=>{Nt=Fo(Nt,bn," ")});let vn=st(L.nodeName);if(!fn(vn,Ct,Nt)){Rt(Dt,L);continue}if(N&&typeof h=="object"&&typeof h.getAttributeType=="function"&&!Ht)switch(h.getAttributeType(vn,Ct)){case"TrustedHTML":{Nt=N.createHTML(Nt);break}case"TrustedScriptURL":{Nt=N.createScriptURL(Nt);break}}if(Nt!==hn)try{Ht?L.setAttributeNS(Ht,Dt,Nt):L.setAttribute(Dt,Nt),Xt(L)?kt(L):Df(t.removed)}catch{Rt(Dt,L)}}$t(O.afterSanitizeAttributes,L,null)},sn=function Ke(L){let ve=null,je=Wt(L);for($t(O.beforeSanitizeShadowDOM,L,null);ve=je.nextNode();)$t(O.uponSanitizeShadowNode,ve,null),rn(ve),Gt(ve),ve.content instanceof i&&Ke(ve.content);$t(O.afterSanitizeShadowDOM,L,null)};return t.sanitize=function(Ke){let L=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},ve=null,je=null,xt=null,Ve=null;if(tt=!Ke,tt&&(Ke="<!-->"),typeof Ke!="string"&&!an(Ke))if(typeof Ke.toString=="function"){if(Ke=Ke.toString(),typeof Ke!="string")throw Bo("dirty is not a string, aborting")}else throw Bo("toString is not a function");if(!t.isSupported)return Ke;if(Ne||X(L),t.removed=[],typeof Ke=="string"&&(gt=!1),gt){if(Ke.nodeName){let at=st(Ke.nodeName);if(!Ie[at]||B[at])throw Bo("root node is forbidden and cannot be sanitized in-place")}}else if(Ke instanceof a)ve=jt("<!---->"),je=ve.ownerDocument.importNode(Ke,!0),je.nodeType===Wo.element&&je.nodeName==="BODY"||je.nodeName==="HTML"?ve=je:ve.appendChild(je);else{if(!Be&&!ke&&!Le&&Ke.indexOf("<")===-1)return N&&Q?N.createHTML(Ke):Ke;if(ve=jt(Ke),!ve)return Be?null:Q?D:""}ve&&Je&&kt(ve.firstChild);let Dt=Wt(gt?Ke:ve);for(;xt=Dt.nextNode();)rn(xt),Gt(xt),xt.content instanceof i&&sn(xt.content);if(gt)return Ke;if(Be){if(re)for(Ve=G.call(ve.ownerDocument);ve.firstChild;)Ve.appendChild(ve.firstChild);else Ve=ve;return(F.shadowroot||F.shadowrootmode)&&(Ve=$.call(r,Ve,!0)),Ve}let Ht=Le?ve.outerHTML:ve.innerHTML;return Le&&Ie["!doctype"]&&ve.ownerDocument&&ve.ownerDocument.doctype&&ve.ownerDocument.doctype.name&&xn(Wf,ve.ownerDocument.doctype.name)&&(Ht="<!DOCTYPE "+ve.ownerDocument.doctype.name+`>
`+Ht),ke&&wa([C,oe,ue],at=>{Ht=Fo(Ht,at," ")}),N&&Q?N.createHTML(Ht):Ht},t.setConfig=function(){let Ke=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};X(Ke),Ne=!0},t.clearConfig=function(){ze=null,Ne=!1},t.isValidAttribute=function(Ke,L,ve){ze||X({});let je=st(Ke),xt=st(L);return fn(je,xt,ve)},t.addHook=function(Ke,L){typeof L=="function"&&jo(O[Ke],L)},t.removeHook=function(Ke,L){if(L!==void 0){let ve=nv(O[Ke],L);return ve===-1?void 0:rv(O[Ke],ve,1)[0]}return Df(O[Ke])},t.removeHooks=function(Ke){O[Ke]=[]},t.removeAllHooks=function(){O=Ff()},t}var zf=Hf();var hr={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},Aa=e=>(...t)=>({_$litDirective$:e,values:t}),Ws=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,n,r){this._$Ct=t,this._$AM=n,this._$Ci=r}_$AS(t,n){return this.update(t,n)}update(t,n){return this.render(...n)}};var Ho=class extends Ws{constructor(t){if(super(t),this.it=en,t.type!==hr.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===en||t==null)return this._t=void 0,this.it=t;if(t===Nn)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;let n=[t];return n.raw=n,this._t={_$litType$:this.constructor.resultType,strings:n,values:[]}}};Ho.directiveName="unsafeHTML",Ho.resultType=1;var Kf=Aa(Ho);function Oc(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var as=Oc();function Jf(e){as=e}var Vo={exec:()=>null};function Ut(e,t=""){let n=typeof e=="string"?e:e.source,r={replace:(s,i)=>{let o=typeof i=="string"?i:i.source;return o=o.replace(En.caret,"$1"),n=n.replace(s,o),r},getRegex:()=>new RegExp(n,t)};return r}var vv=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),En={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i")},kv=/^(?:[ \t]*(?:\n|$))+/,wv=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,$v=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,Yo=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,xv=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,Ic=/(?:[*+-]|\d{1,9}[.)])/,e_=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,t_=Ut(e_).replace(/bull/g,Ic).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),Av=Ut(e_).replace(/bull/g,Ic).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),Lc=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,Sv=/^[^\n]+/,Dc=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,Ev=Ut(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",Dc).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),Tv=Ut(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,Ic).getRegex(),Oa="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",Pc=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,Rv=Ut("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",Pc).replace("tag",Oa).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),n_=Ut(Lc).replace("hr",Yo).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Oa).getRegex(),Cv=Ut(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",n_).getRegex(),Nc={blockquote:Cv,code:wv,def:Ev,fences:$v,heading:xv,hr:Yo,html:Rv,lheading:t_,list:Tv,newline:kv,paragraph:n_,table:Vo,text:Sv},Gf=Ut("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",Yo).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Oa).getRegex(),Ov={...Nc,lheading:Av,table:Gf,paragraph:Ut(Lc).replace("hr",Yo).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",Gf).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Oa).getRegex()},Iv={...Nc,html:Ut(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",Pc).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:Vo,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:Ut(Lc).replace("hr",Yo).replace("heading",` *#{1,6} *[^
]`).replace("lheading",t_).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},Lv=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,Dv=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,r_=/^( {2,}|\\)\n(?!\s*$)/,Pv=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,Ia=/[\p{P}\p{S}]/u,Mc=/[\s\p{P}\p{S}]/u,s_=/[^\s\p{P}\p{S}]/u,Nv=Ut(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,Mc).getRegex(),o_=/(?!~)[\p{P}\p{S}]/u,Mv=/(?!~)[\s\p{P}\p{S}]/u,qv=/(?:[^\s\p{P}\p{S}]|~)/u,jv=Ut(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",vv?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),i_=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,Fv=Ut(i_,"u").replace(/punct/g,Ia).getRegex(),Bv=Ut(i_,"u").replace(/punct/g,o_).getRegex(),a_="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",Uv=Ut(a_,"gu").replace(/notPunctSpace/g,s_).replace(/punctSpace/g,Mc).replace(/punct/g,Ia).getRegex(),Wv=Ut(a_,"gu").replace(/notPunctSpace/g,qv).replace(/punctSpace/g,Mv).replace(/punct/g,o_).getRegex(),Hv=Ut("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,s_).replace(/punctSpace/g,Mc).replace(/punct/g,Ia).getRegex(),zv=Ut(/\\(punct)/,"gu").replace(/punct/g,Ia).getRegex(),Kv=Ut(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),Gv=Ut(Pc).replace("(?:-->|$)","-->").getRegex(),Vv=Ut("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",Gv).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),Ta=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,Yv=Ut(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",Ta).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),l_=Ut(/^!?\[(label)\]\[(ref)\]/).replace("label",Ta).replace("ref",Dc).getRegex(),c_=Ut(/^!?\[(ref)\](?:\[\])?/).replace("ref",Dc).getRegex(),Xv=Ut("reflink|nolink(?!\\()","g").replace("reflink",l_).replace("nolink",c_).getRegex(),Vf=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,qc={_backpedal:Vo,anyPunctuation:zv,autolink:Kv,blockSkip:jv,br:r_,code:Dv,del:Vo,emStrongLDelim:Fv,emStrongRDelimAst:Uv,emStrongRDelimUnd:Hv,escape:Lv,link:Yv,nolink:c_,punctuation:Nv,reflink:l_,reflinkSearch:Xv,tag:Vv,text:Pv,url:Vo},Qv={...qc,link:Ut(/^!?\[(label)\]\((.*?)\)/).replace("label",Ta).getRegex(),reflink:Ut(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",Ta).getRegex()},Tc={...qc,emStrongRDelimAst:Wv,emStrongLDelim:Bv,url:Ut(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",Vf).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:Ut(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",Vf).getRegex()},Zv={...Tc,br:Ut(r_).replace("{2,}","*").getRegex(),text:Ut(Tc.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},Sa={normal:Nc,gfm:Ov,pedantic:Iv},zo={normal:qc,gfm:Tc,breaks:Zv,pedantic:Qv},Jv={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},Yf=e=>Jv[e];function br(e,t){if(t){if(En.escapeTest.test(e))return e.replace(En.escapeReplace,Yf)}else if(En.escapeTestNoEncode.test(e))return e.replace(En.escapeReplaceNoEncode,Yf);return e}function Xf(e){try{e=encodeURI(e).replace(En.percentDecode,"%")}catch{return null}return e}function Qf(e,t){let n=e.replace(En.findPipe,(i,o,a)=>{let l=!1,u=o;for(;--u>=0&&a[u]==="\\";)l=!l;return l?"|":" |"}),r=n.split(En.splitPipe),s=0;if(r[0].trim()||r.shift(),r.length>0&&!r.at(-1)?.trim()&&r.pop(),t)if(r.length>t)r.splice(t);else for(;r.length<t;)r.push("");for(;s<r.length;s++)r[s]=r[s].trim().replace(En.slashPipe,"|");return r}function Ko(e,t,n){let r=e.length;if(r===0)return"";let s=0;for(;s<r;){let i=e.charAt(r-s-1);if(i===t&&!n)s++;else if(i!==t&&n)s++;else break}return e.slice(0,r-s)}function ek(e,t){if(e.indexOf(t[1])===-1)return-1;let n=0;for(let r=0;r<e.length;r++)if(e[r]==="\\")r++;else if(e[r]===t[0])n++;else if(e[r]===t[1]&&(n--,n<0))return r;return n>0?-2:-1}function Zf(e,t,n,r,s){let i=t.href,o=t.title||null,a=e[1].replace(s.other.outputLinkReplace,"$1");r.state.inLink=!0;let l={type:e[0].charAt(0)==="!"?"image":"link",raw:n,href:i,title:o,text:a,tokens:r.inlineTokens(a)};return r.state.inLink=!1,l}function tk(e,t,n){let r=e.match(n.other.indentCodeCompensation);if(r===null)return t;let s=r[1];return t.split(`
`).map(i=>{let o=i.match(n.other.beginningSpace);if(o===null)return i;let[a]=o;return a.length>=s.length?i.slice(s.length):i}).join(`
`)}var Ra=class{constructor(e){Yt(this,"options");Yt(this,"rules");Yt(this,"lexer");this.options=e||as}space(e){let t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){let t=this.rules.block.code.exec(e);if(t){let n=t[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?n:Ko(n,`
`)}}}fences(e){let t=this.rules.block.fences.exec(e);if(t){let n=t[0],r=tk(n,t[3]||"",this.rules);return{type:"code",raw:n,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:r}}}heading(e){let t=this.rules.block.heading.exec(e);if(t){let n=t[2].trim();if(this.rules.other.endingHash.test(n)){let r=Ko(n,"#");(this.options.pedantic||!r||this.rules.other.endingSpaceChar.test(r))&&(n=r.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:n,tokens:this.lexer.inline(n)}}}hr(e){let t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:Ko(t[0],`
`)}}blockquote(e){let t=this.rules.block.blockquote.exec(e);if(t){let n=Ko(t[0],`
`).split(`
`),r="",s="",i=[];for(;n.length>0;){let o=!1,a=[],l;for(l=0;l<n.length;l++)if(this.rules.other.blockquoteStart.test(n[l]))a.push(n[l]),o=!0;else if(!o)a.push(n[l]);else break;n=n.slice(l);let u=a.join(`
`),d=u.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");r=r?`${r}
${u}`:u,s=s?`${s}
${d}`:d;let _=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(d,i,!0),this.lexer.state.top=_,n.length===0)break;let m=i.at(-1);if(m?.type==="code")break;if(m?.type==="blockquote"){let h=m,g=h.raw+`
`+n.join(`
`),T=this.blockquote(g);i[i.length-1]=T,r=r.substring(0,r.length-h.raw.length)+T.raw,s=s.substring(0,s.length-h.text.length)+T.text;break}else if(m?.type==="list"){let h=m,g=h.raw+`
`+n.join(`
`),T=this.list(g);i[i.length-1]=T,r=r.substring(0,r.length-m.raw.length)+T.raw,s=s.substring(0,s.length-h.raw.length)+T.raw,n=g.substring(i.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:r,tokens:i,text:s}}}list(e){let t=this.rules.block.list.exec(e);if(t){let n=t[1].trim(),r=n.length>1,s={type:"list",raw:"",ordered:r,start:r?+n.slice(0,-1):"",loose:!1,items:[]};n=r?`\\d{1,9}\\${n.slice(-1)}`:`\\${n}`,this.options.pedantic&&(n=r?n:"[*+-]");let i=this.rules.other.listItemRegex(n),o=!1;for(;e;){let l=!1,u="",d="";if(!(t=i.exec(e))||this.rules.block.hr.test(e))break;u=t[0],e=e.substring(u.length);let _=t[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,T=>" ".repeat(3*T.length)),m=e.split(`
`,1)[0],h=!_.trim(),g=0;if(this.options.pedantic?(g=2,d=_.trimStart()):h?g=t[1].length+1:(g=t[2].search(this.rules.other.nonSpaceChar),g=g>4?1:g,d=_.slice(g),g+=t[1].length),h&&this.rules.other.blankLine.test(m)&&(u+=m+`
`,e=e.substring(m.length+1),l=!0),!l){let T=this.rules.other.nextBulletRegex(g),k=this.rules.other.hrRegex(g),ee=this.rules.other.fencesBeginRegex(g),ne=this.rules.other.headingBeginRegex(g),z=this.rules.other.htmlBeginRegex(g);for(;e;){let N=e.split(`
`,1)[0],D;if(m=N,this.options.pedantic?(m=m.replace(this.rules.other.listReplaceNesting,"  "),D=m):D=m.replace(this.rules.other.tabCharGlobal,"    "),ee.test(m)||ne.test(m)||z.test(m)||T.test(m)||k.test(m))break;if(D.search(this.rules.other.nonSpaceChar)>=g||!m.trim())d+=`
`+D.slice(g);else{if(h||_.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||ee.test(_)||ne.test(_)||k.test(_))break;d+=`
`+m}!h&&!m.trim()&&(h=!0),u+=N+`
`,e=e.substring(N.length+1),_=D.slice(g)}}s.loose||(o?s.loose=!0:this.rules.other.doubleBlankLine.test(u)&&(o=!0)),s.items.push({type:"list_item",raw:u,task:!!this.options.gfm&&this.rules.other.listIsTask.test(d),loose:!1,text:d,tokens:[]}),s.raw+=u}let a=s.items.at(-1);if(a)a.raw=a.raw.trimEnd(),a.text=a.text.trimEnd();else return;s.raw=s.raw.trimEnd();for(let l of s.items){if(this.lexer.state.top=!1,l.tokens=this.lexer.blockTokens(l.text,[]),l.task){if(l.text=l.text.replace(this.rules.other.listReplaceTask,""),l.tokens[0]?.type==="text"||l.tokens[0]?.type==="paragraph"){l.tokens[0].raw=l.tokens[0].raw.replace(this.rules.other.listReplaceTask,""),l.tokens[0].text=l.tokens[0].text.replace(this.rules.other.listReplaceTask,"");for(let d=this.lexer.inlineQueue.length-1;d>=0;d--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[d].src)){this.lexer.inlineQueue[d].src=this.lexer.inlineQueue[d].src.replace(this.rules.other.listReplaceTask,"");break}}let u=this.rules.other.listTaskCheckbox.exec(l.raw);if(u){let d={type:"checkbox",raw:u[0]+" ",checked:u[0]!=="[ ]"};l.checked=d.checked,s.loose?l.tokens[0]&&["paragraph","text"].includes(l.tokens[0].type)&&"tokens"in l.tokens[0]&&l.tokens[0].tokens?(l.tokens[0].raw=d.raw+l.tokens[0].raw,l.tokens[0].text=d.raw+l.tokens[0].text,l.tokens[0].tokens.unshift(d)):l.tokens.unshift({type:"paragraph",raw:d.raw,text:d.raw,tokens:[d]}):l.tokens.unshift(d)}}if(!s.loose){let u=l.tokens.filter(_=>_.type==="space"),d=u.length>0&&u.some(_=>this.rules.other.anyLine.test(_.raw));s.loose=d}}if(s.loose)for(let l of s.items){l.loose=!0;for(let u of l.tokens)u.type==="text"&&(u.type="paragraph")}return s}}html(e){let t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){let t=this.rules.block.def.exec(e);if(t){let n=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),r=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",s=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:n,raw:t[0],href:r,title:s}}}table(e){let t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;let n=Qf(t[1]),r=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),s=t[3]?.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],i={type:"table",raw:t[0],header:[],align:[],rows:[]};if(n.length===r.length){for(let o of r)this.rules.other.tableAlignRight.test(o)?i.align.push("right"):this.rules.other.tableAlignCenter.test(o)?i.align.push("center"):this.rules.other.tableAlignLeft.test(o)?i.align.push("left"):i.align.push(null);for(let o=0;o<n.length;o++)i.header.push({text:n[o],tokens:this.lexer.inline(n[o]),header:!0,align:i.align[o]});for(let o of s)i.rows.push(Qf(o,i.header.length).map((a,l)=>({text:a,tokens:this.lexer.inline(a),header:!1,align:i.align[l]})));return i}}lheading(e){let t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){let t=this.rules.block.paragraph.exec(e);if(t){let n=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:n,tokens:this.lexer.inline(n)}}}text(e){let t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){let t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){let t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){let t=this.rules.inline.link.exec(e);if(t){let n=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(n)){if(!this.rules.other.endAngleBracket.test(n))return;let i=Ko(n.slice(0,-1),"\\");if((n.length-i.length)%2===0)return}else{let i=ek(t[2],"()");if(i===-2)return;if(i>-1){let o=(t[0].indexOf("!")===0?5:4)+t[1].length+i;t[2]=t[2].substring(0,i),t[0]=t[0].substring(0,o).trim(),t[3]=""}}let r=t[2],s="";if(this.options.pedantic){let i=this.rules.other.pedanticHrefTitle.exec(r);i&&(r=i[1],s=i[3])}else s=t[3]?t[3].slice(1,-1):"";return r=r.trim(),this.rules.other.startAngleBracket.test(r)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(n)?r=r.slice(1):r=r.slice(1,-1)),Zf(t,{href:r&&r.replace(this.rules.inline.anyPunctuation,"$1"),title:s&&s.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let n;if((n=this.rules.inline.reflink.exec(e))||(n=this.rules.inline.nolink.exec(e))){let r=(n[2]||n[1]).replace(this.rules.other.multipleSpaceGlobal," "),s=t[r.toLowerCase()];if(!s){let i=n[0].charAt(0);return{type:"text",raw:i,text:i}}return Zf(n,s,n[0],this.lexer,this.rules)}}emStrong(e,t,n=""){let r=this.rules.inline.emStrongLDelim.exec(e);if(!(!r||r[3]&&n.match(this.rules.other.unicodeAlphaNumeric))&&(!(r[1]||r[2])||!n||this.rules.inline.punctuation.exec(n))){let s=[...r[0]].length-1,i,o,a=s,l=0,u=r[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(u.lastIndex=0,t=t.slice(-1*e.length+s);(r=u.exec(t))!=null;){if(i=r[1]||r[2]||r[3]||r[4]||r[5]||r[6],!i)continue;if(o=[...i].length,r[3]||r[4]){a+=o;continue}else if((r[5]||r[6])&&s%3&&!((s+o)%3)){l+=o;continue}if(a-=o,a>0)continue;o=Math.min(o,o+a+l);let d=[...r[0]][0].length,_=e.slice(0,s+r.index+d+o);if(Math.min(s,o)%2){let h=_.slice(1,-1);return{type:"em",raw:_,text:h,tokens:this.lexer.inlineTokens(h)}}let m=_.slice(2,-2);return{type:"strong",raw:_,text:m,tokens:this.lexer.inlineTokens(m)}}}}codespan(e){let t=this.rules.inline.code.exec(e);if(t){let n=t[2].replace(this.rules.other.newLineCharGlobal," "),r=this.rules.other.nonSpaceChar.test(n),s=this.rules.other.startingSpaceChar.test(n)&&this.rules.other.endingSpaceChar.test(n);return r&&s&&(n=n.substring(1,n.length-1)),{type:"codespan",raw:t[0],text:n}}}br(e){let t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){let t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){let t=this.rules.inline.autolink.exec(e);if(t){let n,r;return t[2]==="@"?(n=t[1],r="mailto:"+n):(n=t[1],r=n),{type:"link",raw:t[0],text:n,href:r,tokens:[{type:"text",raw:n,text:n}]}}}url(e){let t;if(t=this.rules.inline.url.exec(e)){let n,r;if(t[2]==="@")n=t[0],r="mailto:"+n;else{let s;do s=t[0],t[0]=this.rules.inline._backpedal.exec(t[0])?.[0]??"";while(s!==t[0]);n=t[0],t[1]==="www."?r="http://"+t[0]:r=t[0]}return{type:"link",raw:t[0],text:n,href:r,tokens:[{type:"text",raw:n,text:n}]}}}inlineText(e){let t=this.rules.inline.text.exec(e);if(t){let n=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:n}}}},Kn=class Rc{constructor(t){Yt(this,"tokens");Yt(this,"options");Yt(this,"state");Yt(this,"inlineQueue");Yt(this,"tokenizer");this.tokens=[],this.tokens.links=Object.create(null),this.options=t||as,this.options.tokenizer=this.options.tokenizer||new Ra,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let n={other:En,block:Sa.normal,inline:zo.normal};this.options.pedantic?(n.block=Sa.pedantic,n.inline=zo.pedantic):this.options.gfm&&(n.block=Sa.gfm,this.options.breaks?n.inline=zo.breaks:n.inline=zo.gfm),this.tokenizer.rules=n}static get rules(){return{block:Sa,inline:zo}}static lex(t,n){return new Rc(n).lex(t)}static lexInline(t,n){return new Rc(n).inlineTokens(t)}lex(t){t=t.replace(En.carriageReturn,`
`),this.blockTokens(t,this.tokens);for(let n=0;n<this.inlineQueue.length;n++){let r=this.inlineQueue[n];this.inlineTokens(r.src,r.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(t,n=[],r=!1){for(this.options.pedantic&&(t=t.replace(En.tabCharGlobal,"    ").replace(En.spaceLine,""));t;){let s;if(this.options.extensions?.block?.some(o=>(s=o.call({lexer:this},t,n))?(t=t.substring(s.raw.length),n.push(s),!0):!1))continue;if(s=this.tokenizer.space(t)){t=t.substring(s.raw.length);let o=n.at(-1);s.raw.length===1&&o!==void 0?o.raw+=`
`:n.push(s);continue}if(s=this.tokenizer.code(t)){t=t.substring(s.raw.length);let o=n.at(-1);o?.type==="paragraph"||o?.type==="text"?(o.raw+=(o.raw.endsWith(`
`)?"":`
`)+s.raw,o.text+=`
`+s.text,this.inlineQueue.at(-1).src=o.text):n.push(s);continue}if(s=this.tokenizer.fences(t)){t=t.substring(s.raw.length),n.push(s);continue}if(s=this.tokenizer.heading(t)){t=t.substring(s.raw.length),n.push(s);continue}if(s=this.tokenizer.hr(t)){t=t.substring(s.raw.length),n.push(s);continue}if(s=this.tokenizer.blockquote(t)){t=t.substring(s.raw.length),n.push(s);continue}if(s=this.tokenizer.list(t)){t=t.substring(s.raw.length),n.push(s);continue}if(s=this.tokenizer.html(t)){t=t.substring(s.raw.length),n.push(s);continue}if(s=this.tokenizer.def(t)){t=t.substring(s.raw.length);let o=n.at(-1);o?.type==="paragraph"||o?.type==="text"?(o.raw+=(o.raw.endsWith(`
`)?"":`
`)+s.raw,o.text+=`
`+s.raw,this.inlineQueue.at(-1).src=o.text):this.tokens.links[s.tag]||(this.tokens.links[s.tag]={href:s.href,title:s.title},n.push(s));continue}if(s=this.tokenizer.table(t)){t=t.substring(s.raw.length),n.push(s);continue}if(s=this.tokenizer.lheading(t)){t=t.substring(s.raw.length),n.push(s);continue}let i=t;if(this.options.extensions?.startBlock){let o=1/0,a=t.slice(1),l;this.options.extensions.startBlock.forEach(u=>{l=u.call({lexer:this},a),typeof l=="number"&&l>=0&&(o=Math.min(o,l))}),o<1/0&&o>=0&&(i=t.substring(0,o+1))}if(this.state.top&&(s=this.tokenizer.paragraph(i))){let o=n.at(-1);r&&o?.type==="paragraph"?(o.raw+=(o.raw.endsWith(`
`)?"":`
`)+s.raw,o.text+=`
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=o.text):n.push(s),r=i.length!==t.length,t=t.substring(s.raw.length);continue}if(s=this.tokenizer.text(t)){t=t.substring(s.raw.length);let o=n.at(-1);o?.type==="text"?(o.raw+=(o.raw.endsWith(`
`)?"":`
`)+s.raw,o.text+=`
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=o.text):n.push(s);continue}if(t){let o="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(o);break}else throw new Error(o)}}return this.state.top=!0,n}inline(t,n=[]){return this.inlineQueue.push({src:t,tokens:n}),n}inlineTokens(t,n=[]){let r=t,s=null;if(this.tokens.links){let l=Object.keys(this.tokens.links);if(l.length>0)for(;(s=this.tokenizer.rules.inline.reflinkSearch.exec(r))!=null;)l.includes(s[0].slice(s[0].lastIndexOf("[")+1,-1))&&(r=r.slice(0,s.index)+"["+"a".repeat(s[0].length-2)+"]"+r.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(s=this.tokenizer.rules.inline.anyPunctuation.exec(r))!=null;)r=r.slice(0,s.index)+"++"+r.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let i;for(;(s=this.tokenizer.rules.inline.blockSkip.exec(r))!=null;)i=s[2]?s[2].length:0,r=r.slice(0,s.index+i)+"["+"a".repeat(s[0].length-i-2)+"]"+r.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);r=this.options.hooks?.emStrongMask?.call({lexer:this},r)??r;let o=!1,a="";for(;t;){o||(a=""),o=!1;let l;if(this.options.extensions?.inline?.some(d=>(l=d.call({lexer:this},t,n))?(t=t.substring(l.raw.length),n.push(l),!0):!1))continue;if(l=this.tokenizer.escape(t)){t=t.substring(l.raw.length),n.push(l);continue}if(l=this.tokenizer.tag(t)){t=t.substring(l.raw.length),n.push(l);continue}if(l=this.tokenizer.link(t)){t=t.substring(l.raw.length),n.push(l);continue}if(l=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(l.raw.length);let d=n.at(-1);l.type==="text"&&d?.type==="text"?(d.raw+=l.raw,d.text+=l.text):n.push(l);continue}if(l=this.tokenizer.emStrong(t,r,a)){t=t.substring(l.raw.length),n.push(l);continue}if(l=this.tokenizer.codespan(t)){t=t.substring(l.raw.length),n.push(l);continue}if(l=this.tokenizer.br(t)){t=t.substring(l.raw.length),n.push(l);continue}if(l=this.tokenizer.del(t)){t=t.substring(l.raw.length),n.push(l);continue}if(l=this.tokenizer.autolink(t)){t=t.substring(l.raw.length),n.push(l);continue}if(!this.state.inLink&&(l=this.tokenizer.url(t))){t=t.substring(l.raw.length),n.push(l);continue}let u=t;if(this.options.extensions?.startInline){let d=1/0,_=t.slice(1),m;this.options.extensions.startInline.forEach(h=>{m=h.call({lexer:this},_),typeof m=="number"&&m>=0&&(d=Math.min(d,m))}),d<1/0&&d>=0&&(u=t.substring(0,d+1))}if(l=this.tokenizer.inlineText(u)){t=t.substring(l.raw.length),l.raw.slice(-1)!=="_"&&(a=l.raw.slice(-1)),o=!0;let d=n.at(-1);d?.type==="text"?(d.raw+=l.raw,d.text+=l.text):n.push(l);continue}if(t){let d="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(d);break}else throw new Error(d)}}return n}},Ca=class{constructor(e){Yt(this,"options");Yt(this,"parser");this.options=e||as}space(e){return""}code({text:e,lang:t,escaped:n}){let r=(t||"").match(En.notSpaceStart)?.[0],s=e.replace(En.endingNewline,"")+`
`;return r?'<pre><code class="language-'+br(r)+'">'+(n?s:br(s,!0))+`</code></pre>
`:"<pre><code>"+(n?s:br(s,!0))+`</code></pre>
`}blockquote({tokens:e}){return`<blockquote>
${this.parser.parse(e)}</blockquote>
`}html({text:e}){return e}def(e){return""}heading({tokens:e,depth:t}){return`<h${t}>${this.parser.parseInline(e)}</h${t}>
`}hr(e){return`<hr>
`}list(e){let t=e.ordered,n=e.start,r="";for(let o=0;o<e.items.length;o++){let a=e.items[o];r+=this.listitem(a)}let s=t?"ol":"ul",i=t&&n!==1?' start="'+n+'"':"";return"<"+s+i+`>
`+r+"</"+s+`>
`}listitem(e){return`<li>${this.parser.parse(e.tokens)}</li>
`}checkbox({checked:e}){return"<input "+(e?'checked="" ':"")+'disabled="" type="checkbox"> '}paragraph({tokens:e}){return`<p>${this.parser.parseInline(e)}</p>
`}table(e){let t="",n="";for(let s=0;s<e.header.length;s++)n+=this.tablecell(e.header[s]);t+=this.tablerow({text:n});let r="";for(let s=0;s<e.rows.length;s++){let i=e.rows[s];n="";for(let o=0;o<i.length;o++)n+=this.tablecell(i[o]);r+=this.tablerow({text:n})}return r&&(r=`<tbody>${r}</tbody>`),`<table>
<thead>
`+t+`</thead>
`+r+`</table>
`}tablerow({text:e}){return`<tr>
${e}</tr>
`}tablecell(e){let t=this.parser.parseInline(e.tokens),n=e.header?"th":"td";return(e.align?`<${n} align="${e.align}">`:`<${n}>`)+t+`</${n}>
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${br(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:n}){let r=this.parser.parseInline(n),s=Xf(e);if(s===null)return r;e=s;let i='<a href="'+e+'"';return t&&(i+=' title="'+br(t)+'"'),i+=">"+r+"</a>",i}image({href:e,title:t,text:n,tokens:r}){r&&(n=this.parser.parseInline(r,this.parser.textRenderer));let s=Xf(e);if(s===null)return br(n);e=s;let i=`<img src="${e}" alt="${n}"`;return t&&(i+=` title="${br(t)}"`),i+=">",i}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:br(e.text)}},jc=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}checkbox({raw:e}){return e}},Gn=class Cc{constructor(t){Yt(this,"options");Yt(this,"renderer");Yt(this,"textRenderer");this.options=t||as,this.options.renderer=this.options.renderer||new Ca,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new jc}static parse(t,n){return new Cc(n).parse(t)}static parseInline(t,n){return new Cc(n).parseInline(t)}parse(t){let n="";for(let r=0;r<t.length;r++){let s=t[r];if(this.options.extensions?.renderers?.[s.type]){let o=s,a=this.options.extensions.renderers[o.type].call({parser:this},o);if(a!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(o.type)){n+=a||"";continue}}let i=s;switch(i.type){case"space":{n+=this.renderer.space(i);break}case"hr":{n+=this.renderer.hr(i);break}case"heading":{n+=this.renderer.heading(i);break}case"code":{n+=this.renderer.code(i);break}case"table":{n+=this.renderer.table(i);break}case"blockquote":{n+=this.renderer.blockquote(i);break}case"list":{n+=this.renderer.list(i);break}case"checkbox":{n+=this.renderer.checkbox(i);break}case"html":{n+=this.renderer.html(i);break}case"def":{n+=this.renderer.def(i);break}case"paragraph":{n+=this.renderer.paragraph(i);break}case"text":{n+=this.renderer.text(i);break}default:{let o='Token with "'+i.type+'" type was not found.';if(this.options.silent)return console.error(o),"";throw new Error(o)}}}return n}parseInline(t,n=this.renderer){let r="";for(let s=0;s<t.length;s++){let i=t[s];if(this.options.extensions?.renderers?.[i.type]){let a=this.options.extensions.renderers[i.type].call({parser:this},i);if(a!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(i.type)){r+=a||"";continue}}let o=i;switch(o.type){case"escape":{r+=n.text(o);break}case"html":{r+=n.html(o);break}case"link":{r+=n.link(o);break}case"image":{r+=n.image(o);break}case"checkbox":{r+=n.checkbox(o);break}case"strong":{r+=n.strong(o);break}case"em":{r+=n.em(o);break}case"codespan":{r+=n.codespan(o);break}case"br":{r+=n.br(o);break}case"del":{r+=n.del(o);break}case"text":{r+=n.text(o);break}default:{let a='Token with "'+o.type+'" type was not found.';if(this.options.silent)return console.error(a),"";throw new Error(a)}}}return r}},Ea,Go=(Ea=class{constructor(e){Yt(this,"options");Yt(this,"block");this.options=e||as}preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}emStrongMask(e){return e}provideLexer(){return this.block?Kn.lex:Kn.lexInline}provideParser(){return this.block?Gn.parse:Gn.parseInline}},Yt(Ea,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens","emStrongMask"])),Yt(Ea,"passThroughHooksRespectAsync",new Set(["preprocess","postprocess","processAllTokens"])),Ea),nk=class{constructor(...e){Yt(this,"defaults",Oc());Yt(this,"options",this.setOptions);Yt(this,"parse",this.parseMarkdown(!0));Yt(this,"parseInline",this.parseMarkdown(!1));Yt(this,"Parser",Gn);Yt(this,"Renderer",Ca);Yt(this,"TextRenderer",jc);Yt(this,"Lexer",Kn);Yt(this,"Tokenizer",Ra);Yt(this,"Hooks",Go);this.use(...e)}walkTokens(e,t){let n=[];for(let r of e)switch(n=n.concat(t.call(this,r)),r.type){case"table":{let s=r;for(let i of s.header)n=n.concat(this.walkTokens(i.tokens,t));for(let i of s.rows)for(let o of i)n=n.concat(this.walkTokens(o.tokens,t));break}case"list":{let s=r;n=n.concat(this.walkTokens(s.items,t));break}default:{let s=r;this.defaults.extensions?.childTokens?.[s.type]?this.defaults.extensions.childTokens[s.type].forEach(i=>{let o=s[i].flat(1/0);n=n.concat(this.walkTokens(o,t))}):s.tokens&&(n=n.concat(this.walkTokens(s.tokens,t)))}}return n}use(...e){let t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(n=>{let r={...n};if(r.async=this.defaults.async||r.async||!1,n.extensions&&(n.extensions.forEach(s=>{if(!s.name)throw new Error("extension name required");if("renderer"in s){let i=t.renderers[s.name];i?t.renderers[s.name]=function(...o){let a=s.renderer.apply(this,o);return a===!1&&(a=i.apply(this,o)),a}:t.renderers[s.name]=s.renderer}if("tokenizer"in s){if(!s.level||s.level!=="block"&&s.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let i=t[s.level];i?i.unshift(s.tokenizer):t[s.level]=[s.tokenizer],s.start&&(s.level==="block"?t.startBlock?t.startBlock.push(s.start):t.startBlock=[s.start]:s.level==="inline"&&(t.startInline?t.startInline.push(s.start):t.startInline=[s.start]))}"childTokens"in s&&s.childTokens&&(t.childTokens[s.name]=s.childTokens)}),r.extensions=t),n.renderer){let s=this.defaults.renderer||new Ca(this.defaults);for(let i in n.renderer){if(!(i in s))throw new Error(`renderer '${i}' does not exist`);if(["options","parser"].includes(i))continue;let o=i,a=n.renderer[o],l=s[o];s[o]=(...u)=>{let d=a.apply(s,u);return d===!1&&(d=l.apply(s,u)),d||""}}r.renderer=s}if(n.tokenizer){let s=this.defaults.tokenizer||new Ra(this.defaults);for(let i in n.tokenizer){if(!(i in s))throw new Error(`tokenizer '${i}' does not exist`);if(["options","rules","lexer"].includes(i))continue;let o=i,a=n.tokenizer[o],l=s[o];s[o]=(...u)=>{let d=a.apply(s,u);return d===!1&&(d=l.apply(s,u)),d}}r.tokenizer=s}if(n.hooks){let s=this.defaults.hooks||new Go;for(let i in n.hooks){if(!(i in s))throw new Error(`hook '${i}' does not exist`);if(["options","block"].includes(i))continue;let o=i,a=n.hooks[o],l=s[o];Go.passThroughHooks.has(i)?s[o]=u=>{if(this.defaults.async&&Go.passThroughHooksRespectAsync.has(i))return(async()=>{let _=await a.call(s,u);return l.call(s,_)})();let d=a.call(s,u);return l.call(s,d)}:s[o]=(...u)=>{if(this.defaults.async)return(async()=>{let _=await a.apply(s,u);return _===!1&&(_=await l.apply(s,u)),_})();let d=a.apply(s,u);return d===!1&&(d=l.apply(s,u)),d}}r.hooks=s}if(n.walkTokens){let s=this.defaults.walkTokens,i=n.walkTokens;r.walkTokens=function(o){let a=[];return a.push(i.call(this,o)),s&&(a=a.concat(s.call(this,o))),a}}this.defaults={...this.defaults,...r}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return Kn.lex(e,t??this.defaults)}parser(e,t){return Gn.parse(e,t??this.defaults)}parseMarkdown(e){return(t,n)=>{let r={...n},s={...this.defaults,...r},i=this.onError(!!s.silent,!!s.async);if(this.defaults.async===!0&&r.async===!1)return i(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof t>"u"||t===null)return i(new Error("marked(): input parameter is undefined or null"));if(typeof t!="string")return i(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(t)+", string expected"));if(s.hooks&&(s.hooks.options=s,s.hooks.block=e),s.async)return(async()=>{let o=s.hooks?await s.hooks.preprocess(t):t,a=await(s.hooks?await s.hooks.provideLexer():e?Kn.lex:Kn.lexInline)(o,s),l=s.hooks?await s.hooks.processAllTokens(a):a;s.walkTokens&&await Promise.all(this.walkTokens(l,s.walkTokens));let u=await(s.hooks?await s.hooks.provideParser():e?Gn.parse:Gn.parseInline)(l,s);return s.hooks?await s.hooks.postprocess(u):u})().catch(i);try{s.hooks&&(t=s.hooks.preprocess(t));let o=(s.hooks?s.hooks.provideLexer():e?Kn.lex:Kn.lexInline)(t,s);s.hooks&&(o=s.hooks.processAllTokens(o)),s.walkTokens&&this.walkTokens(o,s.walkTokens);let a=(s.hooks?s.hooks.provideParser():e?Gn.parse:Gn.parseInline)(o,s);return s.hooks&&(a=s.hooks.postprocess(a)),a}catch(o){return i(o)}}}onError(e,t){return n=>{if(n.message+=`
Please report this to https://github.com/markedjs/marked.`,e){let r="<p>An error occurred:</p><pre>"+br(n.message+"",!0)+"</pre>";return t?Promise.resolve(r):r}if(t)return Promise.reject(n);throw n}}},is=new nk;function Kt(e,t){return is.parse(e,t)}Kt.options=Kt.setOptions=function(e){return is.setOptions(e),Kt.defaults=is.defaults,Jf(Kt.defaults),Kt};Kt.getDefaults=Oc;Kt.defaults=as;Kt.use=function(...e){return is.use(...e),Kt.defaults=is.defaults,Jf(Kt.defaults),Kt};Kt.walkTokens=function(e,t){return is.walkTokens(e,t)};Kt.parseInline=is.parseInline;Kt.Parser=Gn;Kt.parser=Gn.parse;Kt.Renderer=Ca;Kt.TextRenderer=jc;Kt.Lexer=Kn;Kt.lexer=Kn.lex;Kt.Tokenizer=Ra;Kt.Hooks=Go;Kt.parse=Kt;var TE=Kt.options,RE=Kt.setOptions,CE=Kt.use,OE=Kt.walkTokens,IE=Kt.parseInline;var LE=Gn.parse,DE=Kn.lex;function yr(e){let t=Kt.parse(e),n=zf.sanitize(t);return Kf(n)}function vr(e,t){return c`<div class="prompt-block">
    <div class="prompt-block__label">${e}</div>
    <pre class="prompt-block__body">${t}</pre>
  </div>`}function Hs(e){return e.loading?c`<div class="prompt-block__status">불러오는 중…</div>`:e.error?c`<div class="prompt-block__status prompt-block__status--error">
      프롬프트를 불러오지 못했습니다
    </div>`:""}function La(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),n=r=>String(r).padStart(2,"0");return`${t.getFullYear()}-${n(t.getMonth()+1)}-${n(t.getDate())} ${n(t.getHours())}:${n(t.getMinutes())}`}var p_={Read:"\u{1F4D6}",Edit:"\u270E",MultiEdit:"\u270E",Write:"\u{1F4DD}",Bash:"\u26A1",Grep:"\u{1F50E}",Glob:"\u{1F50E}",Task:"\u{1F916}",Agent:"\u{1F916}",WebFetch:"\u{1F310}",WebSearch:"\u{1F310}"},rk={command_execution:"\uBA85\uB839 \uC2E4\uD589",file_change:"\uD30C\uC77C \uBCC0\uACBD",mcp_call:"MCP \uD638\uCD9C",web_search:"\uC6F9 \uAC80\uC0C9",plan:"\uACC4\uD68D"},sk=new Set(["codex-delegation-monitor-v1","codex-delegation-monitor-v2"]),ok=new Set(["read","list_files","search","unknown"]),ik=new Set(["add","modify","delete"]),u_=20,ak=128,lk=256,f_=/[\u0000-\u001f\u007f-\u009f]/,ck={add:"\uCD94\uAC00",modify:"\uC218\uC815",delete:"\uC0AD\uC81C"};function Fc(e){return typeof e=="string"&&sk.has(e)}function __(e,t){return Object.keys(e).every(n=>t.has(n))}function m_(e){return typeof e!="string"||e.length===0||e.length>lk||f_.test(e)||e.startsWith("/")||e.startsWith("\\")||/^[A-Za-z]:[\\/]/.test(e)?!1:!e.split(/[\\/]/).includes("..")}function uk(e){if(!Dn(e)||!__(e,dk)||typeof e.type!="string"||!ok.has(e.type))return null;let t={type:e.type};return typeof e.name=="string"&&e.name.length>0&&e.name.length<=ak&&!f_.test(e.name)&&(t.name=e.name),m_(e.path)&&(t.path=e.path),t}var dk=new Set(["type","name","path"]),pk=new Set(["path","kind"]);function fk(e){return!Dn(e)||!__(e,pk)||typeof e.kind!="string"||!ik.has(e.kind)||!m_(e.path)?null:{path:e.path,kind:e.kind}}function _k(e,t={}){let n={},r=t.completed===!0;if(e.activity==="command_execution"&&Array.isArray(e.parsed_cmd)&&e.parsed_cmd.length<=u_){let s=e.parsed_cmd.map(uk);s.every(i=>i!==null)&&(n.parsed_cmd=s)}if(e.activity==="command_execution"&&r&&typeof e.exit_code=="number"&&Number.isInteger(e.exit_code)&&(n.exit_code=e.exit_code),e.activity==="file_change"&&Array.isArray(e.changes)&&e.changes.length<=u_){let s=e.changes.map(fk);s.every(i=>i!==null)&&(n.changes=s)}return typeof e.details_truncated=="boolean"&&(n.parsed_cmd!==void 0||n.changes!==void 0)&&(n.details_truncated=e.details_truncated),n}function mk(e){let t=_k(e,{completed:!0}),n=[];for(let r of t.parsed_cmd||[]){let s=[r.path,r.name].filter(i=>typeof i=="string"&&i.length>0);n.push([r.type,...s].join(" "))}for(let r of t.changes||[])n.push(`${ck[r.kind]} ${r.path}`);return t.details_truncated===!0&&n.length>0&&n.push("\u2026"),typeof t.exit_code=="number"&&n.push(`exit ${t.exit_code}`),n.join(" \xB7 ")}var gk=/^\s*([✓✗⊘])\s*(spec|impl|implementation|plan)\s*게이트\s*[—–-]\s*(\S+)\s+(APPROVE|REVISE|REJECT|BLOCK|SKIP)(?:\s*·\s*(.+))?/,hk=/^\s*#{0,3}\s*Phase\s+\d+(?:\s*\/\s*\d+)?\s*(?:[·:—–-]\s*.+)?$/;function Dn(e){return!!e&&typeof e=="object"}function Bc(e){return typeof e!="string"||e.length===0?[]:e.split(/\r?\n/)}function Uc(e,t){let n=Bc(e),r=Bc(t),s=new Map;for(let a of n)s.set(a,(s.get(a)||0)+1);let i=0;for(let a of r){let l=s.get(a)||0;l>0?s.set(a,l-1):i+=1}let o=0;for(let a of s.values())o+=a;return{added:i,removed:o}}function g_(e){let t="";typeof e=="string"?t=e:Array.isArray(e)?t=e.map(s=>Dn(s)&&typeof s.text=="string"?s.text:"").join(""):Dn(e)&&typeof e.text=="string"&&(t=e.text);let r=(String(t).split(/\r?\n/).find(s=>s.trim().length>0)||"").trim();return r.length>120?`${r.slice(0,117)}\u2026`:r}function bk(e){let t=String(e.name||""),n=e.input||{},r={kind:"tool",tool:t,icon:p_[t]||"\u{1F527}",input:n,expandable:!0};if((t==="Read"||t==="Write")&&(r.path=String(n.file_path||n.path||"")),t==="Write"&&(r.added=Bc(n.content).length),t==="Edit"){r.path=String(n.file_path||n.path||"");let{added:s,removed:i}=Uc(n.old_string,n.new_string);r.added=s,r.removed=i}if(t==="MultiEdit"){r.path=String(n.file_path||n.path||"");let s=0,i=0,o=Array.isArray(n.edits)?n.edits:[];for(let a of o){let l=Uc(Dn(a)?a.old_string:"",Dn(a)?a.new_string:"");s+=l.added,i+=l.removed}r.added=s,r.removed=i}return t==="Bash"&&(r.command=String(n.command||"")),(t==="Grep"||t==="Glob")&&(r.command=String(n.pattern||n.query||"")),t==="Agent"&&(typeof e.id=="string"&&e.id.length>0&&(r.launch_id=e.id),typeof n.description=="string"&&(r.command=n.description)),r}function Wc(e){return typeof e!="string"||e.trim().length===0?null:{kind:"thinking",text:e}}var yk=/<system-reminder>[\s\S]*?<\/system-reminder>/g;function h_(e){let t;if(typeof e=="string")t=e;else if(Array.isArray(e))t=e.filter(r=>Dn(r)&&r.type==="text"&&typeof r.text=="string").map(r=>String(r.text)).join(`
`);else return null;let n=t.replace(yk,"").trim();return n.length>0?{kind:"user",text:n}:null}function Hc(e){let t=e.split(/\r?\n/).find(r=>r.trim().length>0)||"",n=gk.exec(t);return n?{kind:"gate",gate:n[2]==="implementation"?"impl":n[2],reviewer:n[3],verdict:n[4],time:n[5]?n[5].trim():void 0,text:t.trim()}:hk.test(t)&&t.trim().length<=80?{kind:"phase",text:t.trim()}:{kind:"assistant",text:e}}function vk(e,t){if(e.subtype==="init"){let n=typeof e.model=="string"?e.model:"";return t.progress=null,[{kind:"thinking",text:n?`\uC138\uC158 \uC2DC\uC791 \xB7 ${n}`:"\uC138\uC158 \uC2DC\uC791"}]}if(e.subtype==="thinking_tokens"){let r=`\uC0DD\uAC01 \uC911\u2026 ${typeof e.estimated_tokens=="number"&&Number.isFinite(e.estimated_tokens)?Math.max(0,Math.round(e.estimated_tokens)):0} \uD1A0\uD070`;return t.progress?(t.progress.text=r,[]):(t.progress={kind:"thinking",text:r},[t.progress])}return[]}function kk(e,t){let n=typeof e.parent_tool_use_id=="string"&&e.parent_tool_use_id.length>0?e.parent_tool_use_id:null;if(e.type==="assistant"){let r=e.message,s=r&&Array.isArray(r.content)?r.content:[],i=[];for(let o of s)if(Dn(o)){if(o.type==="text"&&typeof o.text=="string")i.push(Hc(o.text));else if(o.type==="thinking"){let a=Wc(o.thinking);a&&i.push(a)}else if(o.type==="tool_use"){let a=bk(o);typeof o.id=="string"&&t.set(o.id,a),i.push(a)}}return n?d_(i,n):i}if(e.type==="user"){let r=e.message,s=r&&Array.isArray(r.content)?r.content:[];for(let o of s)if(Dn(o)&&o.type==="tool_result"){let a=t.get(String(o.tool_use_id));if(a){let l=g_(o.content);a.result=l,a.output=typeof o.content=="string"?o.content:l,o.is_error===!0&&(a.is_error=!0)}}let i=h_(r&&r.content);return i?[i]:[]}if(e.type==="result"){let r=e.is_error===!1&&e.subtype==="success",s={kind:"result",success:r,text:typeof e.result=="string"?e.result:r?"DONE":""};return n?d_([s],n):[s]}return[]}function d_(e,t){for(let n of e)n.parent_tool_use_id=t;return e}function wk(e){let t=typeof e.command=="string"?e.command:"",n=g_(e.aggregated_output===void 0?e.output:e.aggregated_output),s=[typeof e.exit_code=="number"&&Number.isFinite(e.exit_code)?`exit ${e.exit_code}`:typeof e.status=="string"&&e.status.length>0?e.status:"",n].filter(o=>o.length>0).join(" \xB7 "),i={kind:"tool",tool:"shell",icon:p_.Bash,command:t,input:{command:t},expandable:!0};return s.length>0&&(i.result=s),typeof e.aggregated_output=="string"&&(i.output=e.aggregated_output),i}function $k(e){if(e.type==="item.completed"&&Dn(e.item)){let t=e.item;if(t.type==="agent_message"&&typeof t.text=="string")return[Hc(t.text)];if(t.type==="user_message"){let n=h_(t.text);return n?[n]:[]}if(t.type==="reasoning"){let n=Wc(t.text);return n?[n]:[]}return t.type==="error"?[{kind:"error",text:String(t.message||"")}]:t.type==="command_execution"?[wk(t)]:[]}if(e.type==="turn.completed")return[{kind:"result",success:!0,text:"DONE"}];if(e.type==="turn.failed"){let t=e.error;return[{kind:"error",text:t&&typeof t.message=="string"?t.message:"turn failed"}]}return e.type==="error"?[{kind:"error",text:String(e.message||"")}]:[]}function xk(e){if(!Fc(e.schema)||!Dn(e.event))return[];let t=e.event;if(t.type==="session.started"||t.type==="turn.started")return[];if((t.type==="item.started"||t.type==="item.completed")&&Dn(t.item)){let n=t.item;if(typeof n.id!="string"||n.id.length===0)return[];if(t.type==="item.completed"&&n.kind==="agent_message"&&typeof n.text=="string"&&n.text.trim().length>0)return[Hc(n.text)];if(t.type==="item.completed"&&n.kind==="reasoning"){let o=Wc(n.text);return o?[o]:[]}if(t.type!=="item.completed"||n.kind!=="activity"||typeof n.activity!="string")return[];let r=rk[n.activity];if(!r)return[];let s,i;if(n.status==="completed")s="\uC644\uB8CC",i="\u2713";else if(n.status==="failed")s="\uC2E4\uD328",i="\u2717";else return[];return[{kind:"tool",tool:`${r} \xB7 ${s}`,icon:i,expandable:!1,result:mk(n)}]}return t.type==="turn.completed"&&t.status==="completed"?[{kind:"result",success:!0,text:"DONE"}]:t.type==="turn.failed"&&(t.status==="failed"||t.status==="interrupted")&&typeof t.error_code=="string"&&t.error_code.length>0?[{kind:"error",text:t.error_code}]:[]}function Ak(e){let t=e.type;return typeof t=="string"&&(t==="error"||t.startsWith("thread.")||t.startsWith("turn.")||t.startsWith("item."))}function Sk(e){let t=e;if(typeof e=="string"){let n=e.trim();if(n.length===0)return null;try{t=JSON.parse(n)}catch{return null}}return Dn(t)?t:null}function b_(e={}){let t=e.skip_delegated===!0,n=new Map,r={progress:null};return{push(s){let i=Sk(s);if(!i)return[];if(t&&typeof i.parent_tool_use_id=="string"&&i.parent_tool_use_id.length>0)return[];if(i.type==="system"&&!Fc(i.schema))return vk(i,r);let o=Fc(i.schema)?xk(i):Ak(i)?$k(i):kk(i,n);return o.length>0&&(r.progress=null),o}}}function zc(e){let t=[],n=b_(),r=Array.isArray(e)?e:[];for(let s of r)for(let i of n.push(s))t.push(i);return t}var Ek=5,Tk=10,Rk=/Task\s+#(\d+)/,Ck=/\bgh\s+pr\s+create\b|\bgit\s+push\b/,Ok=/\bnpm\s+(?:run\s+)?(?:test|tsc|lint|build)\b|\bvitest\b/;function Xo(e){return typeof e!="string"?"":(e.split(/\r?\n/).find(t=>t.trim().length>0)||"").trim()}function Ik(e){return typeof e!="string"||e.length===0?0:e.split(/\r?\n/).length}function Lk(e){for(let t=e.length-1;t>=0;t-=1){let n=e[t];if(n.kind==="phase"||n.kind==="gate")return n.text||null}return null}function Dk(e){let t=new Map,n=0;for(let s of e){if(s.kind!=="tool")continue;n+=1;let i=s.input||{};if(s.tool==="TaskCreate"){let l=Rk.exec(s.output||s.result||""),u=String(i.activeForm||i.subject||"").trim();if(!l||u.length===0)continue;t.set(l[1],{label:u,active:i.status==="in_progress"?n:0});continue}if(s.tool!=="TaskUpdate")continue;let o=t.get(String(i.taskId??""));if(!o)continue;let a=i.activeForm||i.subject;typeof a=="string"&&a.trim().length>0&&(o.label=a.trim()),typeof i.status=="string"&&(o.active=i.status==="in_progress"?n:0)}let r=null;for(let s of t.values())s.active>0&&(!r||s.active>r.active)&&(r=s);return r?r.label:null}function Pk(e){if(e.tool==="Bash"){let t=e.command||"";return Ck.test(t)?"~ PR/\uAC8C\uC2DC \uC911":Ok.test(t)?"~ \uAC80\uC99D \uC911":null}return e.tool==="Edit"||e.tool==="Write"||e.tool==="MultiEdit"?"~ \uAD6C\uD604 \uC911":e.tool==="Read"||e.tool==="Grep"||e.tool==="Glob"?"~ \uD0D0\uC0C9 \uC911":null}function Nk(e){let t=e.filter(s=>s.kind==="tool").slice(-Tk),n=new Map;t.forEach((s,i)=>{let o=Pk(s);if(!o)return;let a=n.get(o)||{count:0,last:-1};a.count+=1,a.last=i,n.set(o,a)});let r=null;for(let[s,i]of n)(!r||i.count>r.count||i.count===r.count&&i.last>r.last)&&(r={label:s,count:i.count,last:i.last});return r?r.label:null}function Mk(e){let t=Lk(e);if(t)return{text:t,guess:!1};let n=Dk(e);if(n)return{text:n,guess:!1};let r=Nk(e);return r?{text:r,guess:!0}:null}function qk(e,t){if(typeof e!="number")return"";let n=Math.max(0,Math.floor((t-e)/1e3));return n<60?`${n}\uCD08 \uC804`:wn(e,t)}function zs(e,t={}){let{transport:n,sessionLogStore:r,onClose:s}=t,i=null,o=null,a=null,l=null,u=null,d=!1,_={},m=!0,h=new Set,g=new Set,T=null,k=null,ee=!1,ne=!1,z=!1,N=null,D=null;function M(){ee=!1,ne=!1,z=!1,N=null,D=null}async function q(re){if(n){ne=!0,z=!1,B();try{let Q=await Promise.resolve(n("get-attempt-prompt",{attempt_id:re,...u?{root_dir:u}:{}}));if(i!==re)return;!Q||typeof Q!="object"||Array.isArray(Q)?z=!0:(N=Q,D=re)}catch{i===re&&(z=!0)}finally{i===re&&(ne=!1,B())}}}function G(){if(ee=!ee,ee&&i&&D!==i){q(i);return}B()}function P(){if(!ee)return"";let re=Hs({loading:ne,error:z});if(re)return c`<div class="sv__prompt" data-seam="attempt-prompt">
        ${re}
      </div>`;if(!N)return"";if(N.missing)return c`<div class="sv__prompt" data-seam="attempt-prompt">
        <div class="prompt-block__status">
          기록 없음 — 프롬프트 기록 이전에 실행된 attempt입니다
        </div>
      </div>`;let Q=La(N.recorded_at);return c`<div class="sv__prompt" data-seam="attempt-prompt">
      ${Q?c`<div class="prompt-block__meta">${Q} 발송</div>`:""}
      ${typeof N.task_prompt=="string"?vr("\uACFC\uC5C5 (user)",N.task_prompt):""}
      ${typeof N.system_prompt=="string"?vr("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",N.system_prompt):""}
    </div>`}function $(){if(!l||!r)return[];let re=r.get(l);return zc(re?re.lines:[])}function O(){if(!l||!r)return null;let re=r.get(l),Q=re?re.last_event_at:null;return typeof Q=="number"?Q:null}function C(){return _.status==="running"}function oe(){if(C()&&i){k||(k=setInterval(()=>B(),1e3));return}ue()}function ue(){k&&(clearInterval(k),k=null)}function me(re){let Q=[],Te=0;for(;Te<re.length;){let{idx:et,line:dt}=re[Te];if(dt.kind==="tool"){let Qe=Te;for(;Qe<re.length&&re[Qe].line.kind==="tool"&&re[Qe].line.tool===dt.tool;)Qe+=1;if(Qe-Te>=Ek&&!g.has(et)){Q.push({kind:"group",idx:et,tool:dt.tool||"",lines:re.slice(Te,Qe)}),Te=Qe;continue}}Q.push({kind:"line",idx:et,line:dt}),Te+=1}return Q}function V(re){let Q=[],Te=new Map;for(let Qe=0;Qe<re.length;Qe+=1){let gt=re[Qe],Pt=gt.parent_tool_use_id;if(typeof Pt=="string"&&Pt.length>0){let St=Te.get(Pt);St||(St={kind:"subagent",idx:Qe,launch_id:Pt,agent_type:null,header:null,lines:[]},Te.set(Pt,St),Q.push(St)),St.lines.push({idx:Qe,line:gt});continue}if(gt.kind==="tool"&&gt.tool==="Agent"&&typeof gt.launch_id=="string"&&gt.launch_id.length>0){let St=ie(gt),ot=Te.get(gt.launch_id);if(ot){ot.header={idx:Qe,line:gt},ot.agent_type=St;continue}let ht={kind:"subagent",idx:Qe,launch_id:gt.launch_id,agent_type:St,header:{idx:Qe,line:gt},lines:[]};Te.set(gt.launch_id,ht),Q.push(ht);continue}Q.push({kind:"entry",idx:Qe,line:gt})}let et=[],dt=0;for(;dt<Q.length;){if(Q[dt].kind!=="entry"){et.push(Q[dt]),dt+=1;continue}let Qe=dt;for(;Qe<Q.length&&Q[Qe].kind==="entry";)Qe+=1;et.push(...me(Q.slice(dt,Qe))),dt=Qe}return et}function ie(re){let Q=re.input;return Q&&typeof Q.subagent_type=="string"?Q.subagent_type:null}function de(re){for(let Q=re.length-1;Q>=0;Q-=1){let Te=re[Q];if(Te.kind==="result"||Te.kind==="error")return null;if(Te.kind==="tool"&&!Object.hasOwn(Te,"result"))return Te}return null}function Oe(re){for(let Q=re.length-1;Q>=0;Q-=1)if(re[Q].kind==="thinking")return re[Q];return null}function qe(re,Q){if(Q.kind==="gate")return c`<div class="sv__gate">${Q.text}</div>`;if(Q.kind==="phase")return c`<div class="sv__phase">${Q.text}</div>`;if(Q.kind==="result")return c`<div
        class="sv__result${Q.success?" sv__result--ok":" sv__result--fail"}"
      >
        <span class="sv__result-glyph">${Q.success?"\u2713":"\u2717"}</span>
        <span class="sv__result-body"
          >${yr(Q.text||(Q.success?"DONE":"\uC2E4\uD328"))}</span
        >
      </div>`;if(Q.kind==="thinking"){let Te=h.has(re);return c`<div
        class="sv__think${Te?" sv__think--expanded":""}"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>Re(re)}
      >
        <span class="sv__think-line">💭 ${Xo(Q.text)}</span>
        ${Te?c`<pre class="sv__think-expand">${Q.text}</pre>`:""}
      </div>`}if(Q.kind==="user"){let Te=h.has(re);return c`<div
        class="sv__line sv__line--user${Te?" sv__line--expanded":""}"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>Re(re)}
      >
        <span class="sv__user-line">▷ ${Xo(Q.text)}</span>
        ${Te?c`<pre class="sv__user-expand">${Q.text}</pre>`:""}
      </div>`}if(Q.kind==="error")return c`<div class="sv__error">⛔ ${Q.text}</div>`;if(Q.kind==="blocker")return c`<div class="sv__error">⛔ ${Q.text}</div>`;if(Q.kind==="tool"){let Te=h.has(re),et=Q.tool==="Bash"?Ik(Q.command):0,dt=Q.tool==="Bash"?et>1?Xo(Q.command):Q.command:Q.path||Q.command||"";return c`<div
        class="sv__tool${Te?" sv__tool--expanded":""}"
        role="button"
        tabindex="0"
        @click=${()=>Re(re)}
      >
        <span class="sv__tool-line">
          <span class="sv__tool-icon">${Q.icon}</span>
          <span class="sv__tool-name">${Q.tool}</span>
          ${dt?c`<span class="sv__tool-detail">${dt}</span>`:""}
          ${et>1?c`<span class="sv__tool-more">⋯ ${et}줄</span>`:""}
          ${typeof Q.added=="number"?c`<span class="sv__diff-add">+${Q.added}</span>`:""}
          ${typeof Q.removed=="number"?c`<span class="sv__diff-del">−${Q.removed}</span>`:""}
          ${Q.result?c`<span class="sv__tool-ok">→ ${Q.result}</span>`:""}
        </span>
        ${Te?c`<pre class="sv__tool-expand">${Ie(Q)}</pre>`:""}
      </div>`}return c`<div class="sv__as">${yr(Q.text||"")}</div>`}function Ie(re){let Q=[];if(re.tool==="Bash"&&typeof re.command=="string"&&re.command.length>0)Q.push(re.command);else if(re.input!==void 0)try{Q.push(`input: ${JSON.stringify(re.input,null,2)}`)}catch{}return typeof re.output=="string"&&re.output.length>0&&Q.push(`output:
${re.output}`),Q.join(`

`)}function ge(){if(!i)return c``;let re=$(),Q=(o?[_.agent_type,_.model,_.effort]:[_.runner,_.model,_.effort]).filter(Boolean).join(" \xB7 "),Te=_.session_id||"",et=`\uB77C\uC774\uBE0C \uB530\uB77C\uAC00\uAE30 ${m?"ON":"OFF"}`,dt=C(),Qe=dt?qk(O(),Date.now()):"",gt=dt?de(re):null,Pt=dt?Oe(re):null,St=Mk(re);return c`<div class="sv" data-attempt-id=${i}>
      <div class="sv__bar">
        <span class="sv__id"
          >${_.label||(o?_.role||"":i)}</span
        >
        ${St?c`<span
              class="sv__stage${St.guess?" sv__stage--guess":""}"
              title=${St.text}
              >${St.text}</span
            >`:""}
        ${dt?c`<span
              class="sv__live"
              title="세션이 진행 중입니다"
              aria-label=${Qe?`\uC9C4\uD589 \uC911 \xB7 \uB9C8\uC9C0\uB9C9 \uC774\uBCA4\uD2B8 ${Qe}`:"\uC9C4\uD589 \uC911"}
              ><span class="sv__live-dot" aria-hidden="true"></span>${Qe?c`<span class="sv__live-ago">${Qe}</span>`:""}</span
            >`:""}
        ${Te?c`<button
              type="button"
              class="sv__session"
              title=${Te}
              aria-label=${`\uC138\uC158 ID \uBCF5\uC0AC: ${Te}`}
              @click=${()=>te(Te)}
            >
              ⧉ ${Te.slice(0,8)}
            </button>`:""}
        ${_.resume_command?c`<button
              type="button"
              class="sv__resume-cmd"
              title=${_.resume_command}
              aria-label=${`\uC7AC\uAC1C \uBA85\uB839 \uBCF5\uC0AC: ${_.resume_command}`}
              @click=${()=>te(_.resume_command||"")}
            >
              ⧉ 재개 명령
            </button>`:""}
        ${Q?c`<span class="sv__meta">${Q}</span>`:""}
        ${_.worktree?c`<span class="sv__wt" title=${_.worktree}
              >${_.worktree}</span
            >`:""}
        ${o||d?"":c`<button
              type="button"
              class="sv__prompt-toggle${ee?" sv__prompt-toggle--on":""}"
              data-seam="attempt-prompt-toggle"
              aria-pressed=${ee?"true":"false"}
              aria-label="발송 프롬프트 보기"
              title="이 세션에 실제로 보낸 시스템·과업 프롬프트"
              @click=${G}
            >
              ✉ 프롬프트
            </button>`}
        <button
          type="button"
          class="sv__follow${m?" sv__follow--on":""}"
          aria-pressed=${m?"true":"false"}
          aria-label=${et}
          @click=${W}
        >
          <span class="sv__follow-full">⇣ ${et}</span>
          <span class="sv__follow-short">⇣ ${m?"ON":"OFF"}</span>
        </button>
        <button
          type="button"
          class="sv__close"
          aria-label="닫기"
          @click=${()=>Be()}
        >
          ✕
        </button>
      </div>
      ${o||d?"":P()}
      <div class="sv__body">
        ${re.length===0?c`<div class="sv__empty">세션 로그 없음</div>`:V(re).map(ot=>ot.kind==="subagent"?ce(ot):ot.kind==="group"?F(ot):qe(ot.idx,ot.line))}
      </div>
      ${gt||Pt?c`<div class="sv__now">
            <span class="sv__now-label">지금</span>
            ${gt?c`<span class="sv__now-icon">${gt.icon}</span>
                  <span class="sv__now-name">${gt.tool}</span>
                  <span class="sv__now-detail"
                    >${gt.tool==="Bash"?Xo(gt.command):gt.path||gt.command||""}</span
                  >`:""}
            ${Pt?c`<span class="sv__now-think"
                  >💭 ${Xo(Pt.text)}</span
                >`:""}
          </div>`:""}
    </div>`}function F(re){return c`<div
      class="sv__group"
      role="button"
      tabindex="0"
      title="펼치기"
      @click=${()=>pe(re.idx)}
    >
      <span class="sv__group-icon">${re.lines[0].line.icon}</span>
      <span class="sv__group-name">${re.tool}</span>
      <span class="sv__group-count">${re.lines.length}</span>
      <span class="sv__group-caret" aria-hidden="true">▸</span>
    </div>`}function ce(re){let Q=g.has(re.idx),Te=re.header?re.header.line:null,et=Te?Te.is_error===!0?"\u2717":typeof Te.result=="string"?"\u2713":"\u27F3":"",dt=Te&&Te.command?Te.command:"";return c`<div class="sv__sub${Q?" sv__sub--open":""}">
      <div
        class="sv__sub-head"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>pe(re.idx)}
      >
        <span class="sv__sub-icon" aria-hidden="true">🤖</span>
        <span class="sv__sub-name">${re.agent_type||"subagent"}</span>
        ${dt?c`<span class="sv__sub-detail">${dt}</span>`:""}
        <span class="sv__sub-count">${re.lines.length}줄</span>
        ${et?c`<span class="sv__sub-state">${et}</span>`:""}
        ${Q?"":c`<span class="sv__sub-caret" aria-hidden="true">▸</span>`}
      </div>
      ${Q?c`<div class="sv__sub-body">
            ${me(re.lines).map(Qe=>Qe.kind==="group"?F(Qe):qe(Qe.idx,Qe.line))}
          </div>`:""}
    </div>`}function pe(re){g.add(re),B()}function B(){ct(ge(),e),oe(),m&&U()}function U(){let re=e.querySelector(".sv__body");re&&(re.scrollTop=re.scrollHeight)}function Re(re){h.has(re)?h.delete(re):h.add(re),B()}function W(){m=!m,B()}function te(re){$n(re).then(Q=>{Q?be("\uBCF5\uC0AC\uB428","success",1200):be("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function J(re){!i||!re||(_={..._,...re},B())}function Y(re){let Q=re.target;if(!Q||!Q.classList||!Q.classList.contains("sv__body"))return;!(Q.scrollHeight-Q.scrollTop-Q.clientHeight<=4)&&m&&(m=!1,B())}e.addEventListener("scroll",Y,!0);function ke(re){let Q=re.target;!Q||typeof Q.closest!="function"||e.contains(Q)||Q.closest("dialog")||Q.closest(".md-viewer-root")||Be()}let fe=!1;function Le(){fe||(document.addEventListener("mousedown",ke),fe=!0)}function Ne(){fe&&(document.removeEventListener("mousedown",ke),fe=!1)}function Je(re){let Q=re&&re.attempt_id;if(!Q)return;let Te=typeof re.launch_id=="string"&&re.launch_id.length>0?re.launch_id:null,et=re.session_ref&&typeof re.session_ref=="object"?re.session_ref:null;if(Te&&et)return;let dt=l;i=Q,o=Te,a=et,l=o?`session-log:${i}:${o}`:`session-log:${i}`,n&&dt&&dt!==l&&Promise.resolve(n("unsubscribe-session-log",{id:dt})).catch(()=>{}),u=typeof re.root_dir=="string"&&re.root_dir.length>0?re.root_dir:null,_=re.meta||{},d=re.hide_prompt===!0,m=!0,h.clear(),g.clear(),M(),!T&&r&&(T=r.subscribe(B)),n&&Promise.resolve(n("subscribe-session-log",{id:l,attempt_id:i,...o?{launch_id:o}:{},...a?{session_ref:a}:{},...u?{root_dir:u}:{}})).catch(()=>{}),Le(),B()}function Be(){let re=l;Ne(),i=null,o=null,a=null,l=null,u=null,d=!1,h.clear(),g.clear(),M(),ue(),n&&re&&Promise.resolve(n("unsubscribe-session-log",{id:re})).catch(()=>{}),ct(c``,e),s&&s()}return{open:Je,updateMeta:J,close:Be,isOpen(){return i!==null},destroy(){ue(),Ne(),T&&(T(),T=null),e.removeEventListener("scroll",Y,!0),i=null,o=null,a=null,l=null,u=null,d=!1,ct(c``,e)}}}function jk(e){let t=[],n=e?.workflow?.stages,r=n?.spec?.doc;r&&t.push({kind:"spec",path:r.path,missing_state:r.missing_state});let s=n?.plan?.doc;return s&&t.push({kind:"plan",path:s.path,missing_state:s.missing_state}),t}function y_(e,t){let n=jk(e);return c`
    <div class="detail-section-label">Artifacts</div>
    ${n.length===0?c`<div class="detail-empty">산출물 없음</div>`:c`
          ${n.map(r=>c`<div class="detail-art">
                <span class="detail-art__ic" aria-hidden="true">▤</span>
                <button
                  type="button"
                  class="detail-art__path"
                  title=${`${r.path} \xB7 \uD074\uB9AD\uD558\uBA74 \uBCF5\uC0AC`}
                  @click=${s=>t.onCopyPath(s,r.path)}
                >
                  ${r.path}
                </button>
                ${r.missing_state==="spec_draft"?c`<span class="detail-art__badge">draft</span>`:null}
                <button
                  type="button"
                  class="detail-art__op"
                  @click=${s=>t.onOpenDoc(s,r.path,r.missing_state)}
                >
                  열기
                </button>
              </div>`)}
          <div class="detail-art__cap">경로 클릭 = 복사 · 열기 = 뷰어</div>
        `}
  `}var Fk="## \u{1F916} \uC791\uC5C5 \uBCF4\uACE0\uC11C",Bk=/^> (worker · attempt|session · sid) ([A-Za-z0-9._-]{1,64}) · (\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z)$/,Uk=/^\*\*결론\*\* — (.+)$/;function Da(e){if(typeof e!="string"||e.length===0)return null;let t=e.split(/\r?\n/);if(t[0]!==Fk)return null;let n=Bk.exec(t[1]||"");if(!n)return null;let r=n[1].split(" ")[0],s=n[2],i=n[3],o=2;for(;o<t.length&&t[o].trim().length===0;)o+=1;let a=o<t.length?Uk.exec(t[o]):null,l=a?a[1].replace(/\s+/g," ").trim():"",u=a?o+1:o;return{lane:r,identifier:s,timestamp:i,conclusion:l,body:t.slice(u).join(`
`).trim()}}var Wk=/^## 🔎 리뷰 결과 · (spec|impl|plan) · r([0-9]+)$/,Hk=/^VERDICT: (APPROVE|REVISE)$/,zk=/^anchor: ([0-9a-fA-F]+)$/,Kk=/^[0-9]+\. /,Gk="- \uC9C0\uC801 \uC5C6\uC74C",Vk={spec:40,impl:40,plan:12};function v_(e){if(typeof e!="string"||e.length===0)return null;let t=e.split(/\r?\n/),n=Wk.exec(t[0]||"");if(!n)return null;let r=Hk.exec(t[1]||""),s=zk.exec(t[2]||"");if(!r||!s)return null;let i=n[1],o=s[1];if(o.length!==Vk[i])return null;let a=t.slice(3),l=0,u=!1;for(let d of a)Kk.test(d)?l+=1:d.trim()===Gk&&(u=!0);return{step:i,round:Number(n[2]),verdict:r[1],anchor:o,points:l>0?l:u?0:null,body:a.join(`
`).trim()}}var k_=20;function Kc(e){if(e==null||e==="")return"";let t=new Date(e);if(Number.isNaN(t.getTime()))return"";let n=String(t.getMonth()+1).padStart(2,"0"),r=String(t.getDate()).padStart(2,"0"),s=String(t.getHours()).padStart(2,"0"),i=String(t.getMinutes()).padStart(2,"0");return`${n}-${r} ${s}:${i}`}function Yk(e){return e.length>k_?`${e.slice(0,k_)}\u2026`:e}function Xk(e,t,n,r){let s=`${t.lane} ${Yk(t.identifier)}`;return c`<div class="detail-report">
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
          >${s}</span
        >
        <span class="detail-report__time">${Kc(t.timestamp)}</span>
      </span>
      <span class="detail-report__concl">${t.conclusion}</span>
    </button>
    ${r&&t.body.length>0?c`<div class="detail-report__body">
          ${yr(t.body)}
        </div>`:""}
  </div>`}var w_=12;function Qk(e){return e.points===null?"":e.points===0?"\uC9C0\uC801 \uC5C6\uC74C":`\uC9C0\uC801 ${e.points}\uAC74`}function Zk(e,t,n,r){let s=t.anchor.length>w_?`${t.anchor.slice(0,w_)}\u2026`:t.anchor,i=Qk(t);return c`<div class="detail-report detail-report--review">
    <button
      type="button"
      class="detail-report__head"
      data-comment-id=${e.id}
      aria-expanded=${r?"true":"false"}
      @click=${()=>n.onToggle&&n.onToggle(e.id)}
    >
      <span class="detail-report__tri">${r?"\u25BE":"\u25B8"}</span>
      <span class="detail-report__glyph">🔎</span>
      <span class="detail-report__meta">
        <span class="detail-report__kind">리뷰 결과</span>
        <span class="detail-report__lane"
          >${t.step} · r${t.round}</span
        >
        <span class="detail-report__anchor" title=${t.anchor}
          >${s}</span
        >
        <span class="detail-report__time"
          >${Kc(e.created_at)}</span
        >
      </span>
      <span class="detail-report__concl">
        <span
          class="detail-report__verdict detail-report__verdict--${t.verdict==="APPROVE"?"approve":"revise"}"
          >${t.verdict}</span
        >${i?c`<span class="detail-report__points">${i}</span>`:""}
      </span>
    </button>
    ${r&&t.body.length>0?c`<div class="detail-report__body">
          ${yr(t.body)}
        </div>`:""}
  </div>`}function Jk(e){return c`<div class="detail-comment" data-comment-id=${e.id}>
    <div class="detail-comment__meta">
      <span class="detail-comment__author"
        >${e.author||"(\uC791\uC131\uC790 \uC5C6\uC74C)"}</span
      >
      <span class="detail-comment__time"
        >${Kc(e.created_at)}</span
      >
    </div>
    <div class="detail-comment__body">
      ${yr(typeof e.text=="string"?e.text:"")}
    </div>
  </div>`}function $_(e,t={},n={}){let r=Array.isArray(e)?e.filter(Boolean):[],s=n.expanded||new Set,i=typeof n.draft=="string"?n.draft:"",o=n.sending===!0,a=r.slice().sort((l,u)=>String(u.created_at||"").localeCompare(String(l.created_at||"")));return c`
    <div class="detail-section-label">댓글 (${r.length})</div>
    ${n.error?c`<div class="detail-empty" data-seam="comments-error">
          댓글을 불러오지 못했습니다
        </div>`:a.length===0?c`<div class="detail-empty" data-seam="comments">댓글 없음</div>`:c`<div class="detail-comments" data-seam="comments">
            ${a.map(l=>{let u=typeof l.text=="string"?l.text:"",d=Da(u);if(d)return Xk(l,d,t,s.has(l.id));let _=v_(u);return _?Zk(l,_,t,s.has(l.id)):Jk(l)})}
          </div>`}
    <div class="detail-comment-compose">
      <textarea
        class="detail-comment-compose__input"
        aria-label="댓글 추가"
        placeholder="댓글 추가"
        rows="3"
        ?disabled=${o}
        .value=${i}
        @input=${l=>t.onDraftInput&&t.onDraftInput(l.target.value)}
      ></textarea>
      <div class="detail-comment-compose__row">
        <button
          type="button"
          class="detail-comment-compose__btn"
          ?disabled=${o||i.trim().length===0}
          @click=${()=>t.onSubmit&&t.onSubmit()}
        >
          댓글 추가
        </button>
      </div>
    </div>
  `}var{I:fT}=Au;var x_=e=>e.strings===void 0;var ew={},A_=(e,t=ew)=>e._$AH=t;var Pr=Aa(class extends Ws{constructor(e){if(super(e),e.type!==hr.PROPERTY&&e.type!==hr.ATTRIBUTE&&e.type!==hr.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!x_(e))throw Error("`live` bindings can only contain a single expression")}render(e){return e}update(e,[t]){if(t===Nn||t===en)return t;let n=e.element,r=e.name;if(e.type===hr.PROPERTY){if(t===n[r])return Nn}else if(e.type===hr.BOOLEAN_ATTRIBUTE){if(!!t===n.hasAttribute(r))return Nn}else if(e.type===hr.ATTRIBUTE&&n.getAttribute(r)===t+"")return Nn;return A_(e),t}});var tw=[{id:"spec",label:"spec \uB9AC\uBDF0",receipt:"spec_review",receipt_stage:null,fill_stage:"spec",stale_stage:"spec",hue:"spec"},{id:"plan",label:"\uACC4\uD68D \uB9AC\uBDF0",receipt:null,receipt_stage:"plan",fill_stage:"plan",stale_stage:"plan",hue:"plan"},{id:"impl",label:"\uAD6C\uD604",receipt:null,receipt_stage:null,fill_stage:"impl",stale_stage:null,hue:"impl"},{id:"impl_review",label:"impl \uB9AC\uBDF0",receipt:"impl_review",receipt_stage:null,fill_stage:null,stale_stage:"impl",hue:"impl"},{id:"pr",label:"PR",receipt:null,receipt_stage:null,fill_stage:"pr",stale_stage:null,hue:"pr"}],Gc={quick_fix:["impl","impl_review"],spec_backed:["spec","impl","impl_review","pr"],full_plan:["spec","plan","impl","impl_review","pr"]},S_={missing:"\uC2B9\uC778 \uD544\uC694",stale:"\uC7AC\uC2B9\uC778 \uD544\uC694",unknown:"\uC2B9\uC778 \uD655\uC778 \uBD88\uAC00"},nw={pin:"pin",global:"global",base:"base"};function rw(e){return c`<span
    class=${`detail-layer-rail detail-layer-rail--${nw[e]}`}
    data-source=${e}
    aria-hidden="true"
    ><i></i><i></i><i></i
  ></span>`}function sw(e,t,n){switch(e){case"workflow_mode":return fo;case"spec_review_model":case"impl_review_model":return _o;case"plan_review_model":return Di;case"spec_review_effort":case"plan_review_effort":case"impl_review_effort":return Pi;case"spec_review_speed":case"plan_review_speed":case"impl_review_speed":return er;case"impl_dispatch":return po;case"impl_runtime":return Li;case"impl_model":return Rs(n,t.impl_runtime);case"impl_effort":return Yr(n,t.impl_runtime,t.impl_model);case"impl_speed":case"orchestration_speed":return er;case"orchestration_model":return Cs(n,null);case"orchestration_effort":return Yr(n,void 0,t.orchestration_model||Cn).filter(r=>r!==Cn);default:return[]}}function ow(e,t){return c`<div class="detail-effective__row" data-key=${e.key}>
    ${rw(e.source)}
    <span class="detail-effective__k"
      >${tr[e.key]||e.key}</span
    >
    <span
      class=${`detail-effective__v${e.source==="base"?" detail-effective__v--dim":""}`}
      title=${e.full_value||""}
      >${e.display}</span
    >
    <span
      class=${`detail-effective__badge detail-effective__badge--${e.source}`}
      >${Mi[e.source]}</span
    >
    ${t.expanded?c`<select
          class="detail-effective__edit"
          data-edit-key=${e.key}
          aria-label=${`${tr[e.key]||e.key} \uD3B8\uC9D1`}
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
  </div>`}function E_(e,t){let n=Dl.flatMap(l=>l.keys),r=Pl(n,e.metadata,e.workspace_values,e.execution_defaults,e.catalog,e.controller_runtime||null),s=np(n,e.metadata,e.workspace_values,e.execution_defaults,e.catalog,e.controller_runtime||null),i=Object.fromEntries(r.map(l=>[l.key,l])),o=Object.fromEntries(r.filter(l=>l.value!==null).map(l=>[l.key,l.value])),a=r.filter(l=>l.full_value&&l.display!==l.full_value).map(l=>l.full_value).join(" \xB7 ");return c`<details
    class=${`detail-effective${e.expanded?" detail-effective--open":""}`}
    data-seam="effective-settings"
    ?open=${e.expanded}
    @toggle=${l=>t.onToggle(l.currentTarget.open)}
  >
    <summary
      class="detail-effective__head"
      data-seam="effective-settings-toggle"
      @click=${l=>{l.preventDefault();let u=l.currentTarget.parentElement;t.onToggle(!u.open)}}
    >
      <span class="detail-effective__t">유효 실행 설정</span>
      <span class="detail-effective__summary" title=${a}
        >${iw(i)}</span
      >
      <span class="detail-effective__counts">
        <span class="detail-effective__count detail-effective__count--pin"
          >핀 ${s.pin}</span
        >
        <span class="detail-effective__count detail-effective__count--global"
          >전역 ${s.global}</span
        >
        <span class="detail-effective__count detail-effective__count--base"
          >기본 ${s.base}</span
        >
      </span>
      <span class="detail-effective__chev">▸</span>
    </summary>
    ${e.expanded?c`<div class="detail-effective__body">
          ${Dl.map(l=>c`
              <div class="detail-effective__subhead">${l.label}</div>
              ${r.filter(u=>l.keys.includes(u.key)).map(u=>{let d=Ci({key:u.key,choices:sw(u.key,o,e.catalog),layer:"pin",pin:e.metadata,global:e.workspace_values,execution_defaults:e.execution_defaults,runner_catalog:e.catalog,route:typeof e.metadata?.route=="string"?e.metadata.route:null,controller_runtime:e.controller_runtime||null});return ow(u,{expanded:e.expanded,options:d.options,default_label:d.unset_label,default_full_value:d.full_value,onEdit:t.onEdit})})}
            `)}
          <div class="detail-effective__foot">
            <select
              data-impl-preset-select
              aria-label="실행 프리셋"
              .value=${Pr(e.preset_id)}
              ?disabled=${e.preset_busy}
              @change=${l=>t.onPresetSelect(String(l.target.value))}
            >
              <option value="" ?selected=${e.preset_id===""}>
                실행 프리셋…
              </option>
              ${e.presets.map(l=>c`<option
                    value=${l.id}
                    ?selected=${l.id===e.preset_id}
                  >
                    ${l.name}${l.compatible===!1?" (\uBE44\uD638\uD658)":""}
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
  </details>`}function iw(e){let t=[];if(e.workflow_mode&&t.push(e.workflow_mode.display),e.impl_dispatch?.value==="main")t.push("\uBA54\uC778");else if(e.impl_dispatch?.value==="delegated"){let n=e.impl_runtime?` ${e.impl_runtime.display}`:"";t.push(`\uC704\uC784${n}`)}for(let n of["impl_model","impl_effort","impl_speed"])e[n]?.resolution!=="not_applicable"&&t.push(e[n]?.display||"\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00");return t.join(" \xB7 ")}function aw(e){if(!e||typeof e!="object")return null;let{kind:t,actor:n,effort:r,sha:s}=e;return typeof t!="string"||typeof n!="string"||typeof s!="string"?null:{kind:t,actor:n,effort:typeof r=="string"?r:null,sha:s}}function T_(e,t={}){let n=e&&typeof e.metadata=="object"&&e.metadata?e.metadata:{},r=e&&typeof e.workflow=="object"&&e.workflow?e.workflow:{},s=r.stages||{},i=r.route||n.route||null,o=typeof n.pr_url=="string"?n.pr_url:"",a=typeof n.exec_receipt=="string"?n.exec_receipt:"",l=aw(r.exec_receipt),u=l?ur(l):a,d=l?`${l.kind}:${l.actor}`:a.split("@")[0],_=$i(r.planned_execution,r.exec_receipt),m=r.chips?.pr?.number,h=typeof m=="number"?`PR #${m}`:"PR",g=bo(n),T=g!==null&&t.isChipOpen?.("rec")===!0,k=T?Gl({rec:g},"rec"):null;return c`<section class="detail-summary" data-seam="detail-summary">
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
      ${o?c`<a
            class="detail-summary__chip detail-summary__chip--pr"
            href=${o}
            target="_blank"
            rel="noreferrer"
            >${h}</a
          >`:""}
      ${_?c`<span
            class="detail-summary__chip detail-summary__chip--planned ctl-chip--planned"
            data-kind=${_.kind}
            title=${_.title}
            >${_.label}</span
          >`:""}
      ${u?c`<span
            class="detail-summary__chip detail-summary__chip--receipt"
            title=${u}
            >${d}${l?.effort?c`${" "}<span
                    class="detail-summary__chip-effort"
                    data-seam="exec-receipt-effort"
                    >${l.effort}</span
                  >`:""}</span
          >`:""}
      ${g?c`<button
            type="button"
            class="detail-summary__chip detail-summary__chip--rec judgement-chip"
            data-chip-key="rec"
            data-state=${g.state}
            aria-expanded=${T?"true":"false"}
            title=${Bi(g)}
            @click=${()=>t.onChipToggle?.("rec")}
          >
            ${"\uBCF5\uC7A1"}
          </button>`:""}
    </div>
    ${k?Ds(k):""}
    <div
      class="detail-summary__gates"
      role="group"
      aria-label="워크플로 게이트"
    >
      ${lw(i).map(ee=>cw(ee,n,s,{label:ee.id==="pr"?h:ee.label,href:ee.id==="pr"?o:""}))}
    </div>
  </section>`}function lw(e){let n=typeof e=="string"&&Object.hasOwn(Gc,e)&&Gc[e]||Gc.spec_backed;return tw.filter(r=>n.includes(r.id))}var Pa={on:"\uD1B5\uACFC",stale:"\uC7AC\uAC80\uD1A0 \uD544\uC694",current:"\uC9C4\uD589 \uC911",none:"\uBBF8\uB3C4\uB2EC"};function cw(e,t,n,r){let s=uw(e,t,n),i=e.fill_stage?n[e.fill_stage]:null,o=typeof i?.fill=="string"?i.fill:null,a=o?o==="full":s.length>0,l=!a&&o==="dim",u=e.stale_stage?n[e.stale_stage]?.stale===!0:!1,d=s&&s.split("@")[1]?.slice(0,7)||"",_=u?Pa.stale:a?Pa.on:l?Pa.current:Pa.none,m=pw(e,n),h=`${r.label} \xB7 ${_}${m?` \xB7 ${m}`:""}${s?` \xB7 ${s}`:""}`,g=`detail-summary__gate${a?" detail-summary__gate--on":""}${l?" detail-summary__gate--current":""}${u?" detail-summary__gate--stale":""}${d?" detail-summary__gate--receipt":""}`,T=c`<span class="detail-summary__gate-label"
      >${r.label}</span
    >
    <span class="detail-summary__gate-rail"></span>
    <span class="detail-summary__gate-sha">${d}</span>`;return r.href?c`<a
      class=${g}
      data-gate=${e.id}
      data-hue=${e.hue}
      href=${r.href}
      target="_blank"
      rel="noreferrer"
      title=${h}
      >${T}</a
    >`:c`<span
    class=${g}
    data-gate=${e.id}
    data-hue=${e.hue}
    title=${h}
    >${T}</span
  >`}function uw(e,t,n){if(e.receipt&&typeof t[e.receipt]=="string")return String(t[e.receipt]);if(e.receipt_stage){let r=n[e.receipt_stage]?.receipt;return typeof r=="string"?r:""}return""}var dw="\uAC80\uD1A0 \uAE30\uB85D \uBD88\uC644\uC804 \u2014 \uC575\uCEE4 \uBD88\uC77C\uCE58";function pw(e,t){if(e.id!=="plan")return"";let n=t.plan?.approval_state,r=typeof n=="string"&&Object.hasOwn(S_,n)?S_[n]:"";return t.plan?.review_state!=="incomplete"?r:[dw,r].filter(Boolean).join(" \xB7 ")}function Na(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function R_(e){return Na(e)&&typeof e.key=="string"&&e.key.length>0&&typeof e.email=="string"&&e.email.length>0}function C_(e,t){let n=e&&e[t];if(!Na(n)||!Array.isArray(n.accounts))return null;let r=n.accounts.filter(R_),s=R_(n.active)?n.active:null;return{accounts:r,active:s||r.find(i=>i.active===!0)||null}}function L_(e){return typeof e.alias=="string"&&e.alias.length>0?` (${e.alias})`:""}function Ma(e){let t=typeof e.status=="string"&&e.status!=="ok"?` \xB7 ${e.status}`:"";return`${e.email}${L_(e)}${t}`}function Ks(e){let t=typeof e.plan=="string"&&e.plan.length>0?e.plan:"plan \uD655\uC778 \uBD88\uAC00";return`${e.email} \xB7 ${t}${L_(e)}`}function fw(e,t,n){if(n!==null){let s=e==="claude"?Ma:Ks,i=t?t.accounts.find(o=>o.key===n):void 0;return`\uB808\uD3EC \uAE30\uBCF8\uAC12 \uC0AC\uC6A9(${i?s(i):n})`}return t?t.active?`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(${e==="claude"?t.active.email:Ks({...t.active,alias:null})})`:"\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(\uD655\uC778 \uBD88\uAC00)":"(\uAE30\uBCF8)"}function O_(e,t){if(!Na(e)||e.state!=="usable"||!Na(e.values))return null;let n=e.values[t];return typeof n=="string"&&n.length>0?n:null}function I_(e){let t=e.provider_key==="claude"?Ma:Ks,n=!!e.provider?.accounts.some(r=>r.key===e.selected);return c`<div class="detail-kv" data-exec-account-row=${e.key}>
    <span class="detail-kv__k">${e.title}</span>
    <span class="detail-kv__vgroup">
      <select
        class=${e.selected?"detail-kv__v detail-kv__v--sel":"detail-kv__v"}
        aria-label=${e.title}
        data-exec-key=${e.key}
        @change=${r=>e.handlers.onExecChange(e.key,r.target.value)}
      >
        <option value="" ?selected=${e.selected.length===0}>
          ${fw(e.provider_key,e.provider,e.workspace_default)}
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
  </div>`}function D_({md:e,catalog:t,workspace_defaults:n=null,handlers:r}){let s=typeof e.claude_account=="string"?e.claude_account:"",i=typeof e.codex_account=="string"?e.codex_account:"";return c`<section class="exec-accounts" data-exec-accounts>
    <div class="detail-section-label">실행 계정</div>
    <div class="exec-settings-core">
      ${I_({key:"claude_account",title:"Claude \uACC4\uC815",provider_key:"claude",provider:C_(t,"claude"),selected:s,workspace_default:O_(n,"claude_account"),handlers:r,hint:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uB7F0\uD0C0\uC784\uC774 claude\uC77C \uB54C \uC801\uC6A9\uB429\uB2C8\uB2E4"})}
      ${I_({key:"codex_account",title:"Codex \uACC4\uC815",provider_key:"codex",provider:C_(t,"codex"),selected:i,workspace_default:O_(n,"codex_account"),handlers:r})}
    </div>
  </section>`}function _w(e){return String(e||"").replace(/^docs\/(superpowers\/)?/,"")}function mw(e){let t=/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(e);if(!t)return{front:null,body:e};let n=t[1].trim();return{front:n.length>0?n:null,body:e.slice(t[0].length)}}function qa(e,t){let n=t.getWorkspacePath,r=t.fetchImpl||globalThis.fetch?.bind(globalThis),s=null,i="loading",o="",a=null,l="";function u(T){T.key==="Escape"&&s&&(T.preventDefault(),h())}document.addEventListener("keydown",u);function d(){return s?c`
      <div class="mv-overlay" role="dialog" aria-modal="true">
        <div class="mv-overlay__backdrop" @click=${()=>h()}></div>
        <div class="mv">
          <div class="mv__bar">
            <span class="mv__path" title=${s}
              >${_w(s)}</span
            >
            <button
              type="button"
              class="mv__close"
              aria-label="닫기"
              @click=${()=>h()}
            >
              ✕
            </button>
          </div>
          <div class="mv__body">
            ${i==="loading"?c`<div class="mv__status">불러오는 중…</div>`:i==="pending"?c`<div class="mv__status">${l}</div>`:i==="error"?c`<div class="mv__status mv__status--error">
                      ${l||"\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"}
                    </div>`:c`${a===null?null:c`<pre class="mv__front">
${a}</pre
                        >`}${yr(o)}`}
          </div>
        </div>
      </div>
    `:c``}function _(){ct(d(),e)}async function m(T,k={}){s=T,i="loading",o="",a=null,l="",_();let ee=k.workspace||(n?n():"");if(!ee){i="error",l="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4",_();return}if(!r){i="error",l="fetch\uB97C \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",_();return}let ne="/api/doc?workspace="+encodeURIComponent(ee)+"&path="+encodeURIComponent(T);try{let z=await r(ne),N=await z.json().catch(()=>({}));if(!z.ok||!N||N.ok!==!0){if(N?.error==="not_found"&&k.missing_state==="plan_pending"){i="pending",l="\uACC4\uD68D \uC791\uC131 \uC804 \xB7 \uACBD\uB85C\uB9CC \uC608\uC57D\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4",_();return}i="error",l="\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 ("+String(N&&N.error||z.status)+")",_();return}let D=mw(String(N.content||""));a=D.front,o=D.body,i="ready",_()}catch{i="error",l="\uBB38\uC11C \uC694\uCCAD \uC2E4\uD328",_()}}function h(){s=null,ct(c``,e)}function g(){document.removeEventListener("keydown",u),h()}return{open:m,close:h,destroy:g}}function M_(e){if(!e||typeof e.price_basis!="string")return"";let t=e.price_basis;if(!(t in $l))return"";let n=$l[t];if(t==="none")return c`<span class="detail-session__price detail-session__price--none"
      >${n}</span
    >`;let r=$s({total_cost_usd:e.price_usd,cost_estimated:t==="estimated"});return r.length===0?"":c`<span class="detail-session__price" title=${r.join(`
`)}
    >${r[0]}${n?` ${n}`:""}</span
  >`}var gw=[{key:"input_tokens",label:"\uC785\uB825"},{key:"output_tokens",label:"\uCD9C\uB825"},{key:"cache_read_input_tokens",label:"\uCE90\uC2DC \uC77D\uAE30"}],q_="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4",ja=[{role:"implementation",provider:"codex"},{role:"review-consult",provider:"codex"},{role:"subagent",provider:"claude"}],hw=new Set(["codex-runner","Explore","Plan","advisor","advisor-xhigh","claude-code-guide","statusline-setup"]);function P_(e){return typeof e=="string"&&hw.has(e)}var bw=["running","done","failed","interrupted"],Xc={running:"\u25CF",done:"\u2713",failed:"\u2717",interrupted:"\u26A0"};function yw(e){return typeof e=="number"&&Number.isFinite(e)?e:0}function vw(e){let t=mn(e);if(t.length>0)return t.map(s=>c`<span class="detail-usage-total" title=${s.tooltip}
          >${s.label}</span
        >`);let n=As(e);if(!n||!e)return"";let r=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?` \xB7 $${e.total_cost_usd.toFixed(2)}`:"";return c`<span
      class="detail-usage-total"
      title="이 이슈의 모든 attempt 토큰 합계 (입력+출력+캐시)"
      >${n.replace(/^τ /,"\u03C4 \uCD1D ")}${r}</span
    >${e.replayed?c`<span class="detail-usage-partial" title=${q_}
          >부분 집계</span
        >`:""}`}function N_(e){return!e||!e.roles.orchestrator?null:{providers:e.roles.orchestrator,roles:{}}}function Fa(e){if(typeof e=="number")return Gs(e);if(typeof e!="string")return"";let t=Date.parse(e);return Number.isFinite(t)?Gs(t):""}function j_(e){return typeof e=="string"?e.replace(/-\d{8}$/,""):""}function F_(e,t,n){if(e.provider!=="claude"){let s=e.session_id?` \xB7 thread ${e.session_id}`:"",i=n?" \xB7 \uC774\uC804 \uB77C\uC6B4\uB4DC \uC2A4\uB808\uB4DC \uC774\uC5B4\uAC10":"";return{text:`${n?"\u21A9 ":""}${e.launch_id}`,title:`${e.launch_id}${s}${i}`,thread:e.session_id?{text:e.session_id.slice(0,8),title:e.session_id}:null}}let r=t&&typeof t.agent_id=="string"?t.agent_id:"";return r.length>0?{text:r.slice(0,8),title:r,thread:null}:{text:e.launch_id.slice(-8),title:e.launch_id,thread:null}}function B_(e){return e?c`<span
        class="detail-session__leg-thread detail-session__sid"
        title=${e.title}
        >${e.text}</span
      >`:""}function Vc(e){return e===null||typeof e=="string"&&e.trim().length>0}function Yc(e){return e===null||typeof e=="number"&&Number.isFinite(e)}function kw(e){if(!e||typeof e!="object"||Array.isArray(e))return null;let t=e,n=t.provider==="claude";return typeof t.launch_id!="string"||t.launch_id.length===0||!ja.some(r=>r.role===t.role&&r.provider===t.provider)||!(n?Vc(t.model):typeof t.model=="string"&&t.model.length>0)||!(!("effort"in t)||Vc(t.effort))||!(!("agent_type"in t)||Vc(t.agent_type))||typeof t.session_id!="string"||t.session_id.length===0||!bw.includes(t.status)||!(t.turn_id===null||typeof t.turn_id=="string")?null:n?!Yc(t.started_at)||!Yc(t.last_event_at)||!Yc(t.completed_at)?null:t:typeof t.started_at!="number"||!Number.isFinite(t.started_at)||typeof t.last_event_at!="number"||!Number.isFinite(t.last_event_at)||!(t.completed_at===null||typeof t.completed_at=="string"&&Number.isFinite(Date.parse(t.completed_at)))?null:t}function ww(e,t,n,r){let i=mn({providers:{[t]:{subtotal:n.subtotal,breakdown:n.usage,...n.replayed?{replayed:!0}:{}}},roles:{}})[0],o=F_({provider:t,launch_id:n.receipt_id,session_id:typeof n.session_id=="string"?n.session_id:void 0},n,r);return c`<div class="detail-session__leg detail-session__usage-detail">
    <span class="detail-session__leg-role detail-session__usage-label"
      >${e}</span
    >
    <span class="detail-session__leg-meta detail-session__usage-value"
      >${[n.provider,n.model,n.effort].filter(Boolean).join(" \xB7 ")}</span
    >
    <span
      class="detail-session__leg-sid detail-session__sid"
      title=${o.title}
      >${o.text}</span
    >
    ${B_(o.thread)}
    ${Fa(n.completed_at)?c`<span class="detail-session__leg-time detail-session__time"
          >${Fa(n.completed_at)}</span
        >`:""}
    ${i?c`<span class="detail-session__usage" title=${i.tooltip}
          >${i.label}</span
        >`:""}${M_(n)}
  </div>`}function $w(e,t,n,r,s){let i=e.status==="running"?null:t,a=(i?mn({providers:{[e.provider]:{subtotal:i.subtotal,breakdown:i.usage,...i.replayed?{replayed:!0}:{}}},roles:{}}):[])[0],l=e.status==="running"?Gs(e.last_event_at):i?Fa(i.completed_at):"",u=(e.provider==="claude"?["Claude",e.agent_type,j_(e.model),e.effort]:["codex",e.model,e.effort]).filter(Boolean).join(" \xB7 "),d=F_(e,i,s);return c`<button
    type="button"
    class="detail-session__leg detail-session__usage-detail detail-session__leg--${e.status}"
    data-launch-id=${e.launch_id}
    @click=${()=>r.onOpenDelegation&&r.onOpenDelegation(n,e.launch_id)}
  >
    <span class="detail-session__leg-glyph" aria-hidden="true"
      >${Xc[e.status]}</span
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
    ${B_(d.thread)}
    ${l?c`<span class="detail-session__leg-time detail-session__time"
          >${l}</span
        >`:""}
    ${a?c`<span class="detail-session__usage" title=${a.tooltip}
          >${a.label}</span
        >`:""}${M_(i)}
  </button>`}function xw(e,t){return e.role===t.role&&(e.model===null||t.model===void 0||e.model===t.model)&&e.session_id===t.session_id}var Aw="\uC804\uCCB4 \uD569\uACC4\uC5D0 \uBCC4\uB3C4 \uAC00\uC0B0\uD558\uC9C0 \uC54A\uC74C";function Sw(e){if(!e||typeof e!="object")return null;let t={},n=[["input_tokens","input_tokens","\uC785\uB825"],["output_tokens","output_tokens","\uCD9C\uB825"],["cached_input_tokens","cache_read_input_tokens","\uCE90\uC2DC\uC77D\uAE30"],["cache_write_input_tokens","cache_creation_input_tokens","\uCE90\uC2DC\uC4F0\uAE30"],["reasoning_output_tokens","reasoning_output_tokens","\uCD94\uB860\uCD9C\uB825"]],r=[],s=0,i=0;for(let[u,d,_]of n){let m=e[u];typeof m=="number"&&Number.isFinite(m)&&(t[d]=m,r.push(`${_} ${m.toLocaleString("en-US")}`),i+=1,(d==="input_tokens"||d==="output_tokens")&&(s+=m))}let o=e.total_tokens,a=typeof o=="number"&&Number.isFinite(o)?o:null;if(i===0)return a===null?null:{subtotal:a,breakdown:{total_tokens:a},lines:[`\uCD1D ${a.toLocaleString("en-US")}`,"\uC138\uBD80 \uB0B4\uC5ED \uBBF8\uAD00\uCE21"]};let l=[...r];return a!==null&&l.unshift(`\uCD1D ${a.toLocaleString("en-US")}`),{subtotal:a??s,breakdown:t,lines:l}}function Ew(e){let t=Sw(e.usage),r=(t?mn({providers:{codex:{subtotal:t.subtotal,breakdown:t.breakdown}},roles:{}}):[])[0],s=typeof e.status=="string"&&e.status in Xc?e.status:"running",i=typeof e.thread_id=="string"?e.thread_id:"",o=s==="running"?Gs(e.last_event_at):Fa(e.completed_at),a=["codex",e.agent_path,j_(e.model),e.effort].filter(Boolean).join(" \xB7 ");return c`<div
    class="detail-session__leg detail-session__usage-detail detail-session__leg--${s}"
  >
    <span class="detail-session__leg-glyph" aria-hidden="true"
      >${Xc[s]}</span
    >
    <span class="detail-session__leg-role detail-session__usage-label"
      >native child</span
    >
    <span class="detail-session__leg-meta detail-session__usage-value"
      >${a}</span
    >
    <span
      class="detail-session__leg-sid detail-session__sid"
      title=${e.launch_id||i}
      >${i.slice(0,8)}</span
    >
    ${o?c`<span class="detail-session__leg-time detail-session__time"
          >${o}</span
        >`:""}
    ${r&&t?c`<span
          class="detail-session__usage"
          title=${[...t.lines,Aw].join(`
`)}
          >${r.label}</span
        >`:""}
  </div>`}function Tw(e){let t=Array.isArray(e.codex_children)?e.codex_children:[],n=new Set,r=[];for(let s of t)!s||typeof s!="object"||typeof s.thread_id!="string"||s.thread_id.length===0||n.has(s.thread_id)||(n.add(s.thread_id),r.push(Ew(s)));return r}function Rw(e,t,n){let r=[],s=new Set,i=Array.isArray(e.delegation_sessions)?e.delegation_sessions:[];for(let _ of i){let m=kw(_);!m||s.has(m.launch_id)||P_(m.agent_type)||(s.add(m.launch_id),r.push(m))}r.sort((_,m)=>(_.started_at||0)-(m.started_at||0));let o={};for(let{role:_,provider:m}of ja){let h=t?t.roles[_]?.[m]:null;o[_]=h?[...h.legs]:[]}let a=ja.flatMap(({role:_})=>o[_]),l=new Set,u=new Set,d=[];for(let{role:_,provider:m}of ja){for(let h of r.filter(g=>g.role===_&&g.provider===m)){let g=a.find(k=>k.receipt_id===h.launch_id)||null;if(g&&!xw(h,g))continue;g&&l.add(g.receipt_id);let T=m==="codex"&&u.has(h.session_id);d.push($w(h,g,e.attempt_id,n,T)),m==="codex"&&u.add(h.session_id)}for(let h of o[_])if(!l.has(h.receipt_id)&&!P_(h.agent_type)){let g=typeof h.session_id=="string"&&h.session_id.length>0?h.session_id:null,T=m==="codex"&&g!==null&&u.has(g);d.push(ww(_,m,h,T)),m==="codex"&&g!==null&&u.add(g)}}return d}function Cw(e,t){let n=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?e.total_cost_usd:null,r=[...gw,{key:"cache_creation_input_tokens",label:t==="codex"?"\uCE90\uC2DC \uC4F0\uAE30":"\uCE90\uC2DC \uC0DD\uC131"},...t==="codex"&&typeof e.reasoning_output_tokens=="number"&&Number.isFinite(e.reasoning_output_tokens)?[{key:"reasoning_output_tokens",label:"\uCD94\uB860 \uCD9C\uB825"}]:[]];return c`<div class="detail-session__usage-detail">
    ${r.map(s=>c`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">${s.label}</span
          ><span class="detail-session__usage-value"
            >${yw(e[s.key]).toLocaleString("en-US")}</span
          ></span
        >`)}
    ${n===null?"":c`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">비용</span
          ><span class="detail-session__usage-value"
            >$${n.toFixed(2)}</span
          ></span
        >`}
    ${e.replayed?c`<span class="detail-session__usage-note">${q_}</span>`:""}
  </div>`}var Ow={running:"\u25CF",done:"\u2713",failed:"\u2717",orphaned:"\u26A0"};function Gs(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),n=String(t.getHours()).padStart(2,"0"),r=String(t.getMinutes()).padStart(2,"0");return`${n}:${r}`}function Iw(e){if(typeof e.exec_default_preset_id!="string"||e.exec_default_preset_id.length===0)return"";let t=e.exec_values&&typeof e.exec_values=="object"?Object.entries(e.exec_values).filter(([,r])=>typeof r=="string"&&r.length>0).map(([r,s])=>`${r}=${s}`).join(" \xB7 "):"",n=typeof e.exec_default_preset_revision=="number"?` r${e.exec_default_preset_revision}`:"";return c`<div
    class="detail-session__preset-audit"
    data-attempt-preset-audit
  >
    <strong>외부 실행 preset</strong>
    <span>${e.exec_default_preset_id}${n}</span>
    ${t?c`<small>${t}</small>`:""}
    <small>내부 workflow 실행 영수증과 별도 기록</small>
  </div>`}var Lw={remote:"\uB2E4\uB978 \uBA38\uC2E0 \uC138\uC158 \u2014 \uC774 \uC11C\uBC84\uC5D0 transcript \uC5C6\uC74C",missing:"transcript \uD30C\uC77C \uC5C6\uC74C"};function Dw(e,t){let n=Lw[e.locality]||"",r=e.locality==="remote"?`${e.host} \xB7 \uB2E4\uB978 \uBA38\uC2E0`:e.locality==="missing"?`${e.host} \xB7 \uD30C\uC77C \uC5C6\uC74C`:e.host;return c`<div class="detail-session-row">
    <button
      type="button"
      class="detail-session detail-session--session"
      data-session-key=${_c(e)}
      ?disabled=${n.length>0}
      title=${n}
      @click=${()=>{n.length===0&&t.onOpenSessionRef&&t.onOpenSessionRef(e)}}
    >
      <span class="detail-session__glyph">${e.current?"\u25D0":"\xB7"}</span>
      <span class="detail-session__id">${Io(e)}</span>
      <span class="detail-session__meta">${r}</span>
      <span class="detail-session__sid" title=${e.session_id}
        >${e.session_id.slice(0,8)}</span
      >
      <span class="detail-session__time">${Gs(e.last_event_at)}</span>
    </button>
    ${e.resume_command?c`<button
          type="button"
          class="op-btn detail-session__resume-cmd"
          title=${e.resume_command}
          @click=${s=>{s.stopPropagation(),t.onCopyResumeCommand&&e.resume_command&&t.onCopyResumeCommand(e.resume_command)}}
        >
          ⧉ 재개
        </button>`:""}
  </div>`}function U_(e,t={},n={},r=[]){let s=Array.isArray(e)?e:[],i=Array.isArray(r)?r:[],o=[...i.filter(g=>g&&g.current===!0),...i.filter(g=>g&&g.current!==!0).sort((g,T)=>T.index-g.index)],a=o.map(g=>Dw(g,t)),l=n.expanded||new Set,u=n.catalog||null;if(s.length===0&&o.length===0)return c`
      <div class="detail-section-label">세션 이력</div>
      <div class="detail-empty" data-seam="session-history">세션 이력 없음</div>
    `;let d=new Set;for(let g of s)g&&typeof g.resumed_from=="string"&&g.resumed_from.length>0&&d.add(g.resumed_from);let _=g=>{if(!(g.status==="failed"||g.status==="orphaned"))return"";let k=typeof g.session_id=="string"&&g.session_id.length>0,ee=d.has(g.attempt_id),ne=k&&!ee,z=k?ee?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":"\uC774 \uC138\uC158\uC744 \uAC19\uC740 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C \uC774\uC5B4\uC11C \uC9C4\uD589":"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00";return c`<button
      type="button"
      class="op-btn detail-session__resume"
      data-attempt-id=${g.attempt_id}
      ?disabled=${!ne}
      title=${z}
      @click=${N=>{N.stopPropagation(),ne&&t.onResume&&t.onResume(g.attempt_id)}}
    >
      ↻ 이어하기
    </button>`},m=g=>{if(!(g.status==="failed"||g.status==="orphaned")||typeof g.cause!="string"||g.cause==="")return"";let k=g.cause_detail,ee=k&&typeof k.reason=="string"&&k.reason.length>0?typeof k.command=="string"&&k.command.length>0?`${k.reason} \xB7 ${k.command}`:k.reason:g.cause;return c`<div class="detail-session__cause" title=${ee}>
      ${g.cause}
    </div>`},h=g=>{let T=N_(Sl(g,u));if(mn(T).length===0&&!As(g.usage))return"";let k=l.has(g.attempt_id);return c`<button
      type="button"
      class="detail-session__usage-toggle"
      data-attempt-id=${g.attempt_id}
      aria-expanded=${k?"true":"false"}
      title=${k?"\uD1A0\uD070 \uB0B4\uC5ED \uC811\uAE30":"\uD1A0\uD070 \uB0B4\uC5ED \uD3BC\uCE58\uAE30"}
      @click=${ee=>{ee.stopPropagation(),t.onToggleUsage&&t.onToggleUsage(g.attempt_id)}}
    >
      τ 자세히
    </button>`};return c`
    <div class="detail-section-label">
      세션 이력${vw(n.total)}
    </div>
    <div class="detail-sessions" data-seam="session-history">
      ${a}${s.map(g=>{let T=Sl(g,u),k=N_(T),ee=mn(k);return c`<div class="detail-session-row">
          <button
            type="button"
            class="detail-session detail-session--${g.status||"unknown"}"
            data-attempt-id=${g.attempt_id}
            @click=${()=>t.onOpen&&t.onOpen(g.attempt_id)}
          >
            <span class="detail-session__glyph"
              >${Ow[g.status||""]||"\xB7"}</span
            >
            <span class="detail-session__id">${g.attempt_id}</span>
            ${go(g)?c`<span
                  class="detail-session__resumed"
                  title=${go(g)}
                  >↻</span
                >`:""}
            <span class="detail-session__meta">${Ln(g)}</span>
            ${ee.length>0?c`<span class="detail-session__role">orchestrator</span>`:""}
            ${g.session_id?c`<span class="detail-session__sid" title=${g.session_id}
                  >${String(g.session_id).slice(0,8)}</span
                >`:""}
            ${ee.length>0?ee.map(ne=>c`<span
                      class="detail-session__usage"
                      title=${ne.tooltip}
                      >${ne.label}</span
                    >`):As(g.usage)?c`<span class="detail-session__usage"
                    >${As(g.usage)}</span
                  >`:""}
            <span class="detail-session__time">${Gs(g.started_at)}</span>
          </button>
          ${h(g)} ${_(g)} ${m(g)} ${Iw(g)}
          ${l.has(g.attempt_id)&&g.usage?Cw(g.usage,g.runner==="codex"?"codex":"claude"):""}
          ${Rw(g,T,t)} ${Tw(g)}
        </div>`})}
    </div>
  `}function W_(e,t={}){return c`
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
          ${Pw(e)}
        </div>`:""}
  `}function Pw(e){let t=Hs(e);if(t)return t;let n=e.data;if(!n)return"";if(n.missing)return c`<div class="detail-prompt__missing">
        기록 없음 — 아직 이 이슈로 디스패치된 세션이 없습니다. 아래는 다음
        디스패치가 보낼 기본 과업입니다.
      </div>
      ${typeof n.default_task_prompt=="string"?vr("\uC608\uC0C1 \uAE30\uBCF8 \uACFC\uC5C5",n.default_task_prompt):""}`;let r=La(n.recorded_at);return c`<div class="detail-prompt__meta">
      ${n.attempt_id}${r?` \xB7 ${r}`:""}
    </div>
    ${typeof n.task_prompt=="string"?vr("\uACFC\uC5C5 (user)",n.task_prompt):""}
    ${typeof n.system_prompt=="string"?vr("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",n.system_prompt):""}`}var ls=10;function H_(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),n=r=>String(r).padStart(2,"0");return`${n(t.getMonth()+1)}-${n(t.getDate())} ${n(t.getHours())}:${n(t.getMinutes())}`}function z_(e,t={}){let r=(Array.isArray(e?.events)?e.events:[]).filter(a=>a&&typeof a.summary=="string"&&a.summary.trim().length>0);if(r.length===0)return"";let s=typeof e.shown=="number"&&e.shown>0?e.shown:ls,i=r.slice(0,s),o=r.length-i.length;return c`
    <div class="detail-section-label">Worker 이력 (${r.length})</div>
    <ol class="detail-timeline" data-seam="worker-timeline">
      ${i.map(a=>c`<li class="detail-timeline__row">
            ${H_(a.at)?c`<span class="detail-timeline__at"
                  >${H_(a.at)}</span
                >`:""}
            <span class="detail-timeline__summary">${a.summary}</span>
          </li>`)}
    </ol>
    ${o>0?c`<button
          type="button"
          class="detail-timeline__more"
          data-seam="worker-timeline-more"
          @click=${()=>t.onMore&&t.onMore()}
        >
          더 보기 (${o})
        </button>`:""}
  `}var Nw=["open","in_progress","deferred","resolved","closed"],Mw=[0,1,2,3,4];function K_(e,t){let n=t.issueStores,r=t.onClose,s=t.transport,i=t.onNavigate,o=t.queueStore,a=t.execPresetStore,l=t.sessionLogStore,u=null,d=null,_={},m="",h=!1,g=[],T=!1,k=!1,ee={},ne={claude:null,codex:null},z=null,N=null,D=0,M=!1,q=!1,G="",P="",$="",O="",C=!1;function oe(){M=!1,q=!1,G="",P="",$="",O="",C=!1}function ue(){ne={claude:null,codex:null},z=null,N=null,D+=1}async function me(){if(!s)return null;try{let v=await Promise.resolve(s("get-workspace-accounts",{}));return v&&typeof v.state=="string"?v:null}catch{return null}}async function V(v){try{let j=await fetch(v);if(!j.ok)return null;let H=await j.json();if(!H||typeof H!="object"||!Array.isArray(H.accounts))return null;let $e=H.accounts.filter(Ye=>Ye!==null&&typeof Ye=="object"&&!Array.isArray(Ye));return{accounts:$e,active:$e.find(Ye=>Ye.active===!0)||null}}catch{return null}}async function ie(v){N=v;let j=++D,[H,$e,Ye]=await Promise.all([V("/api/claude-usage"),V("/api/codex-usage"),me()]);j!==D||v!==u||(ne={claude:H,codex:$e},z=Ye,lt())}let de=[],Oe=null,qe=null,Ie=!1,ge="",F=!1,ce=0,pe=new Set;function B(){de=[],Oe=null,qe=null,Ie=!1,ge="",F=!1,ce+=1,pe.clear()}async function U(v){if(!s)return;let j=++ce;try{let H=await Promise.resolve(s("get-comments",{id:v}));if(j!==ce||v!==u)return;de=Array.isArray(H)?H:[],Ie=!1}catch{if(j!==ce||v!==u)return;Ie=!0}lt()}function Re(){if(!s||!u)return;let v=d&&typeof d.comment_count=="number"?d.comment_count:null;if(Oe!==u){Oe=u,qe=v,U(u);return}v!==null&&v!==qe&&(qe=v,U(u))}function W(v){pe.has(v)?pe.delete(v):pe.add(v),lt()}function te(v){let j=ge.trim().length===0;ge=v,j!==(v.trim().length===0)&&lt()}async function J(){let v=ge.trim();if(!s||!u||v.length===0||F)return;let j=u;F=!0,lt();let H=!1;try{let $e=await Promise.resolve(s("add-comment",{id:j,text:v}));Array.isArray($e)&&$e.length>0&&(H=!0,j===u&&(de=$e,Ie=!1,ge="",qe=$e.length))}catch{H=!1}H||be("\uB313\uAE00 \uCD94\uAC00 \uC2E4\uD328","error"),j===u&&(F=!1),lt()}let Y={onToggle:W,onDraftInput:te,onSubmit:J},ke=t.mdViewer||null,fe=null;ke||(fe=document.createElement("div"),fe.className="md-viewer-root",document.body.appendChild(fe));let Le=ke||qa(fe,{getWorkspacePath:t.getWorkspacePath||(()=>"")}),Ne=document.createElement("div");Ne.className="session-log-root",document.body.appendChild(Ne);let Je=zs(Ne,{transport:s?(v,j)=>Promise.resolve(s(v,j)):void 0,sessionLogStore:l}),Be=!1,re=!1,Q=!1,Te=null,et=null,dt=0;function Qe(v){return`${t.getWorkspacePath&&t.getWorkspacePath()||""}::${v}`}function gt(){Be=!1,re=!1,Q=!1,Te=null,et=null,dt+=1}async function Pt(v){if(!s)return;let j=++dt;re=!0,Q=!1,lt();try{let H=await Promise.resolve(s("get-bead-prompt",{bead_id:v}));if(j!==dt)return;!H||typeof H!="object"||Array.isArray(H)?Q=!0:(Te=H,et=Qe(v))}catch{j===dt&&(Q=!0)}finally{j===dt&&(re=!1,lt())}}let St=[],ot=null,ht=0;function Jt(v,j){return`${t.getWorkspacePath&&t.getWorkspacePath()||""}::${v}::${j}`}function w(){St=[],ot=null,ht+=1}async function se(v,j){if(!s)return;let H=++ht,$e;try{$e=await Promise.resolve(s("get-session-refs",{bead_id:v}))}catch{$e=null}H!==ht||j!==ot||(St=$e&&Array.isArray($e.sessions)?$e.sessions:[],lt())}function De(){if(!s||!u)return;let v=d&&d.metadata,j=v&&typeof v=="object"&&typeof v.session_ref=="string"?v.session_ref:null;if(j===null){w();return}let H=Jt(u,j);ot!==H&&(St=[],ot=H,se(u,H))}let Se=[],Me=[],We=ls,tt=null,It=0;function _e(v){return`${t.getWorkspacePath&&t.getWorkspacePath()||""}::${v}`}function xe(){Se=[],Me=[],We=ls,tt=null,It+=1}async function Ze(v,j){if(!s)return;let H=++It,$e;try{$e=await Promise.resolve(s("get-bead-timeline",{bead_id:v}))}catch{$e=null}H!==It||j!==tt||(Se=$e&&Array.isArray($e.events)?$e.events:[],Me=$e&&Array.isArray($e.attempts)?$e.attempts:[],We=ls,lt())}function yt(){if(!s||!u)return;let v=_e(u);tt!==v&&(Se=[],Me=[],We=ls,tt=v,Ze(u,v))}function it(){We+=ls,lt()}function ut(){if(Be=!Be,Be&&u&&et!==Qe(u)){Te=null,Pt(u);return}lt()}function bt(){let v={};for(let H of Me)H&&typeof H=="object"&&H.bead_id===u&&(v[String(H.attempt_id)]=H);let j=o?o.get():null;for(let H of j&&j.attempts?Object.values(j.attempts):[]){let $e=H;$e&&$e.bead_id===u&&(v[String($e.attempt_id)]=$e)}return v}function st(){return u?Object.values(bt()).sort((j,H)=>(H.started_at||0)-(j.started_at||0)).map(j=>({attempt_id:j.attempt_id,bead_id:j.bead_id,status:j.status,started_at:typeof j.started_at=="number"?j.started_at:null,runner:j.runner||null,model:j.model||null,effort:j.effort||j.observed_effort||null,speed:j.speed||null,session_id:j.session_id||null,resumed_from:j.resumed_from||null,continuation_mode:j.continuation_mode||null,dismissed_at:typeof j.dismissed_at=="number"?j.dismissed_at:null,cause:typeof j.cause=="string"?j.cause:null,cause_detail:j.cause_detail||null,exec_default_preset_id:typeof j.exec_default_preset_id=="string"?j.exec_default_preset_id:null,exec_default_preset_revision:typeof j.exec_default_preset_revision=="number"?j.exec_default_preset_revision:null,exec_values:j.exec_values&&typeof j.exec_values=="object"?j.exec_values:null,usage:j.usage||null,usage_legs:Array.isArray(j.usage_legs)?j.usage_legs:[],delegation_sessions:Array.isArray(j.delegation_sessions)?j.delegation_sessions:[],codex_children:Array.isArray(j.codex_children)?j.codex_children:[]})):[]}function ze(){return u?pr(bt(),u,$t()):null}let E=new Set;function K(v){E.has(v)?E.delete(v):E.add(v),lt()}function X(v){let j=o?o.get():null,H=j&&j.attempts?j.attempts[v]:null;Je.open({attempt_id:v,meta:H?{runner:H.runner||void 0,model:H.model||void 0,effort:H.effort||void 0,status:H.status||void 0,session_id:H.session_id||void 0}:{}})}function Ee(v,j){let H=o?o.get():null,$e=H&&H.attempts?H.attempts[v]:null,mt=($e&&Array.isArray($e.delegation_sessions)?$e.delegation_sessions:[]).find(Vt=>Vt&&typeof Vt=="object"&&Vt.launch_id===j);mt&&Je.open({attempt_id:v,launch_id:j,meta:{runner:mt.provider==="claude"?"claude":"codex",role:mt.role,...typeof mt.agent_type=="string"?{agent_type:mt.agent_type}:{},model:mt.model,effort:mt.effort,session_id:mt.session_id,status:mt.status}})}async function ye(v){if(!s||!v)return;let j=s,H=()=>{let Ye=o?o.get():null;return Ye&&typeof Ye.revision=="number"?Ye.revision:0},$e=o?.get()?.attempts?.[v]||null;await Fs({context:{bead_id:$e?.bead_id||u||"",kind:"session",tuple:$e?Ln($e):""},transport:Ye=>j("worker-attempt-resume",{attempt_id:v,expected_revision:H(),...Ye}),adopt:Ye=>{Ye?.queue&&o?.set&&o.set(Ye.queue)}})}async function wt(v,j){if(!s||!v)return;let H=s,$e=()=>{let vt=o?o.get():null;return{bead_id:v,...j==="parallel"?{}:{lane:j},expected_revision:vt&&typeof vt.revision=="number"?vt.revision:0}},Ye=vt=>{vt?.queue&&o?.set&&o.set(vt.queue)},mt=await Promise.resolve(H("worker-queue-place",$e()));if(Ye(mt),mt&&mt.conflict&&(mt=await Promise.resolve(H("worker-queue-place",$e())),Ye(mt)),lt(),!mt)return;if(mt.applied===!1&&typeof mt.admission_reason=="string"){be(`\uB300\uAE30 \uC801\uC7AC \uAC70\uBD80: ${mt.admission_reason}`,"error",2400);return}if(mt.reason==="rejected"){be("\uB300\uAE30 \uC801\uC7AC \uAC70\uBD80: rejected","error",2400);return}if(mt.applied===!1)return;let Vt=mt.queue?wo({id:v},mt.queue).location:null;Vt&&"index"in Vt&&be(`${kp(Vt.lane)} \uB300\uAE30 #${Vt.index+1}\uC5D0 \uCD94\uAC00`,"success",2400)}function kt(v,j){if(j){k=!0,lt();return}wt(v,"parallel")}function Rt(v,j){let Ye=(v.target?.closest?.(".worker-card__place-lane")||null)?.dataset.lane;Ye&&(Ye!=="parallel"&&!/^s[1-5]$/.test(Ye)||(k=!1,lt(),wt(j,Ye)))}function jt(v){!v||!u||Je.open(Bs(v,u,d&&d.status))}let Wt={onOpen:X,onOpenDelegation:Ee,onResume:ye,onToggleUsage:K,onOpenSessionRef:jt,onCopyResumeCommand:Ct};function Xt(){let v=o?o.get():null,j={...ee};for(let H of[...Un,...Es]){let $e=v&&v[H];typeof $e=="string"&&(j[H]=$e)}return j}async function an(){if(s){try{let v=await Promise.resolve(s("get-session-defaults",{}));ee=v&&v.values&&typeof v.values=="object"?v.values:{}}catch{ee={}}lt()}}function $t(){let v=o?o.get():null;return v&&v.runner_catalog||null}function rn(){let v=o?o.get():null;return v&&typeof v.execution_defaults=="object"?v.execution_defaults:null}function fn(){let v=d?.metadata&&typeof d.metadata=="object"?d.metadata:{},H=In({pin:{...v,..._},global:Xt(),execution_defaults:rn(),runner_catalog:$t(),route:typeof v.route=="string"?v.route:null}).orchestration_model.value||"";return Wn($t(),H)}function qt(){let v=a?a.get():null;return!v||typeof v.revision!="number"?null:{revision:v.revision,presets:Array.isArray(v.presets)?v.presets:[]}}function Gt(v){return v?.compatible===!1}function sn(v){a&&v&&typeof v.revision=="number"&&Array.isArray(v.presets)&&a.set({revision:v.revision,presets:v.presets})}async function Ke(){let v=qt(),j=v?.presets.find(H=>H.id===m);if(!(!s||!u||!v||!j||Gt(j)||h)){h=!0,g=[],lt();try{let H=await Promise.resolve(s("apply-impl-preset",sp(u,j.id,v.revision)));if(H&&H.conflict){sn(H),be("\uD504\uB9AC\uC14B\uC774 \uBCC0\uACBD\uB410\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uBAA9\uB85D\uC5D0\uC11C \uB2E4\uC2DC \uC801\uC6A9\uD558\uC138\uC694.","error",4e3);return}let $e=H&&Array.isArray(H.issue)?H.issue[0]:H?.issue;if(H&&H.applied&&$e&&typeof $e=="object"){d=$e,g=Array.isArray(H.skipped_orchestration_keys)?H.skipped_orchestration_keys.filter(Ye=>typeof Ye=="string"):[];for(let Ye of op)delete _[Ye];be(g.length>0?"\uC2E4\uD589 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4. \uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 3\uD0A4\uB294 Bead\uC5D0 \uD540\uD560 \uC218 \uC5C6\uC5B4 \uAC74\uB108\uB6F0\uC5C8\uC2B5\uB2C8\uB2E4.":"\uC2E4\uD589 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4.","success",4e3);return}H&&H.error==="bd_readback_failed"?be("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):be("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}catch(H){H&&typeof H=="object"&&H.code==="bd_readback_failed"?be("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):be("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}finally{h=!1,lt()}}}let L=null;n&&n.subscribe&&(L=n.subscribe(v=>{!u||v!==`detail:${u}`||at()}));let ve=null;o&&typeof o.subscribe=="function"&&(ve=o.subscribe(()=>{u&&lt()}));let je=null,xt=null;function Ve(){xt&&(xt(),xt=null)}a&&typeof a.subscribe=="function"&&(je=a.subscribe(()=>{u&&lt()}));function Dt(v){v.key==="Escape"&&u&&(v.preventDefault(),r())}document.addEventListener("keydown",Dt);let Ht=Ls(()=>lt());Ht.attach();function at(){if(u){if(n&&typeof n.snapshotFor=="function"){let v=n.snapshotFor("detail:"+u)||[];d=v.find(H=>H&&H.id===u)||v[0]||d}Re(),De(),yt(),lt()}}function Ct(v){$n(v).then(j=>{j?be("\uBCF5\uC0AC\uB428","success",1200):be("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function hn(v){v.preventDefault(),v.stopPropagation(),u&&Ct(u)}function Nt(v,j){v.preventDefault(),v.stopPropagation(),Ct(j)}function vn(v,j,H){v.preventDefault(),v.stopPropagation(),Le.open(j,{missing_state:H})}async function bn(v,j){let H=Object.hasOwn(_,v),$e=_[v];if(_[v]=j,lt(),!(!s||!u))try{let Ye=await Promise.resolve(s("update-exec-settings",rp(u,v,j.length===0?null:j))),mt=Array.isArray(Ye)?Ye[0]:Ye;if(!mt||typeof mt!="object"||!mt.id)throw new Error("exec settings readback failed");d=mt,delete _[v],lt()}catch(Ye){throw H?_[v]=$e:delete _[v],lt(),be("\uC2E4\uD589 \uC124\uC815 \uBCC0\uACBD \uC2E4\uD328","error"),Ye}}function p(v){v.catch(()=>{})}async function f(v,j){let H=d||{},$e=H.metadata&&typeof H.metadata=="object"?H.metadata:{},Ye={};for(let vt of["impl_runtime","impl_model","impl_effort"])Ye[vt]=Object.hasOwn(_,vt)?_[vt]:typeof $e[vt]=="string"?$e[vt]:"";Ye[v]=j;let mt=lp(Ye,$t(),fn()),Vt={};for(let vt of["impl_runtime","impl_model","impl_effort"])Vt[vt]=_[vt],_[vt]=mt[vt]||"";if(lt(),!(!s||!u))return Promise.resolve(s("update-impl-target",{id:u,...mt,orchestration_runtime:fn()})).then(vt=>{let Et=Array.isArray(vt)?vt[0]:vt;if(!Et||typeof Et!="object"||!Et.id)throw new Error("implementation target readback failed");d=Et;for(let Ae of["impl_runtime","impl_model","impl_effort"])delete _[Ae];lt()}).catch(vt=>{for(let Et of["impl_runtime","impl_model","impl_effort"])Vt[Et]===void 0?delete _[Et]:_[Et]=Vt[Et];throw lt(),be("\uAD6C\uD604 target \uBCC0\uACBD \uC2E4\uD328","error"),vt})}async function x(v,j,H){if(!s||!u)return!1;try{let $e=await Promise.resolve(s(v,j)),Ye=Array.isArray($e)?$e[0]:$e;return Ye&&typeof Ye=="object"&&Ye.id?(d=Ye,!0):(be(H,"error"),!1)}catch($e){return $e&&typeof $e=="object"&&$e.code==="bd_readback_failed"?(be("\uC800\uC7A5\uB410\uC73C\uB098 \uD655\uC778 \uC2E4\uD328 \u2014 \uACE7 \uAC31\uC2E0\uB429\uB2C8\uB2E4","error"),{ok:!1,saved:!0}):(be(S(H,$e),"error"),!1)}}function S(v,j){let H=j&&typeof j=="object"&&typeof j.message=="string"?j.message.trim():"";return H.length>0?`${v} \u2014 ${H}`:v}function Z(v){setTimeout(()=>{try{let j=e.querySelector(v);j&&typeof j.focus=="function"&&j.focus()}catch{}},0)}function ae(){M=!0,G=d&&d.title||"",lt(),Z('.detail-edit__input[data-edit="title"]')}function he(v){G=v.target.value}function Ue(){M=!1,G="",lt()}function He(){x("edit-text",{id:u,field:"title",value:G},"\uC81C\uBAA9 \uC800\uC7A5 \uC2E4\uD328").then(j=>{j===!0&&(M=!1,G=""),lt()})}function pt(){q=!0,P=d&&d.description||"",lt(),Z('.detail-edit__textarea[data-edit="description"]')}function Ft(v){P=v.target.value}function A(){q=!1,P="",lt()}function I(){x("edit-text",{id:u,field:"description",value:P},"\uC124\uBA85 \uC800\uC7A5 \uC2E4\uD328").then(j=>{j===!0&&(q=!1,P=""),lt()})}function Pe(v,j,H,$e){if(v.key==="Escape"){v.stopPropagation(),H();return}v.key==="Enter"&&(!$e||v.ctrlKey||v.metaKey)&&(v.preventDefault(),j())}function Ce(v){let j=v.target.value;x("update-status",{id:u,status:j},"\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328").then(()=>lt())}function rt(v){let j=Number(v.target.value);x("update-priority",{id:u,priority:j},"\uC6B0\uC120\uC21C\uC704 \uBCC0\uACBD \uC2E4\uD328").then(()=>lt())}function ft(v){$=v.target.value}function tn(){let v=$.trim();v.length!==0&&x("label-add",{id:u,label:v},"\uB77C\uBCA8 \uCD94\uAC00 \uC2E4\uD328").then(j=>{j===!0&&($=""),lt()})}function kr(v){if(v.key==="Escape"){v.stopPropagation(),$="",lt();return}v.key==="Enter"&&(v.preventDefault(),tn())}function Vn(v){x("label-remove",{id:u,label:v},"\uB77C\uBCA8 \uC81C\uAC70 \uC2E4\uD328").then(()=>lt())}let sr={onCopyPath:Nt,onOpenDoc:vn};function wr(v){return typeof v=="string"?v:v&&typeof v=="object"?String(v.id||v.to||v.issue_id||v.depends_on||""):""}function y(v){return v&&typeof v=="object"?String(v.dependency_type||v.type||""):""}function b(v){switch(v){case"discovered-from":return{glyph:"\u21A9 ",relation:"\uBC1C\uACAC"};case"parent-child":return{glyph:"\u2338 ",relation:"\uC0C1\uC704"};case"related":return{glyph:"\u2194 ",relation:"\uAD00\uB828"};default:return v.length>0?{glyph:`${v} `,relation:v}:{glyph:"",relation:""}}}function R(v,j){let H=le(j),$e=[];return v.length>0&&$e.push(v),H&&$e.push(H),$e.length>0?$e.join(`
`):void 0}function le(v){if(!v||typeof v!="object")return;let j=typeof v.status=="string"?v.status:"",H=typeof v.title=="string"?v.title:"";return j.length>0&&H.length>0?`${j} \xB7 ${H}`:void 0}function we(){return(t.getWorkspacePath&&t.getWorkspacePath()||"").trim()}function Fe(){return t.depCandidates?t.depCandidates():null}async function nt(v,j,H){let $e=we(),Ye=u;if(!Ye)return;if($e.length===0){be("\uB808\uD3EC\uB97C \uC54C \uC218 \uC5C6\uC5B4 \uC758\uC874\uC744 \uBC14\uAFC0 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error");return}let mt=await x(v,{a:Ye,b:j,view_id:Ye,root_dir:$e},H),Vt=mt===!0||mt!==!1&&mt.saved===!0;Vt&&t.onDepChanged&&t.onDepChanged({type:v,a:Ye,b:j}),v==="dep-add"&&Vt&&(O="",C=!1),lt()}function Bt(v){if(!u)return;let j=globalThis.confirm;typeof j=="function"&&!j(`${v}\uAC00 ${u}\uB97C \uB9C9\uB294 \uC5F0\uACB0\uC744 \uB04A\uC744\uAE4C\uC694?`)||nt("dep-remove",v,"\uC758\uC874 \uD574\uC81C \uC2E4\uD328")}function on(v){v.disabled||_t(v.bead_id)}function _t(v){nt("dep-add",v,"\uC758\uC874 \uCD94\uAC00 \uC2E4\uD328")}function kn(v,j){let H=O.trim();return!If(H)||H===u||j.includes(H)||v.some($e=>$e.bead_id===H)?null:H}function Tn(v){O=v.target.value,C=!0,lt()}function jr(){C||(C=!0,lt())}function Yn(v,j,H){if(v.key==="Escape"){v.stopPropagation(),O="",C=!1,lt();return}v.key==="Enter"&&(v.preventDefault(),j.length===1&&!j[0].disabled?on(j[0]):H!==null&&_t(H))}function or(v,j){return c`<div class="detail-dep-add">
      <input
        class="detail-dep-add__input"
        aria-label="막는 이슈 추가"
        placeholder="막는 이슈 추가"
        .value=${O}
        @focus=${jr}
        @input=${Tn}
        @keydown=${H=>Yn(H,v,j)}
      />
      ${C||O.length>0?c`<div class="detail-dep-add__list">
            ${v.length===0&&j===null?c`<div class="detail-dep-add__empty">후보 없음</div>`:v.map(H=>c`<button
                      type="button"
                      class="detail-dep-add__cand"
                      data-dep-cand=${H.bead_id}
                      ?disabled=${H.disabled}
                      title=${cn(H.reason)}
                      @click=${()=>on(H)}
                    >
                      <span class="detail-dep-add__repo"
                        >${H.workspace_name}</span
                      >
                      <span class="detail-dep-add__id"
                        >${H.bead_id}</span
                      >
                      <span class="detail-dep-add__title"
                        >${H.title}</span
                      >
                    </button>`)}
            ${j===null?"":c`<button
                  type="button"
                  class="detail-dep-add__cand"
                  data-dep-cand=${j}
                  data-dep-direct="1"
                  @click=${()=>_t(j)}
                >
                  <span class="detail-dep-add__id">${j}</span>
                  <span class="detail-dep-add__title">직접 추가</span>
                </button>`}
          </div>`:""}
    </div>`}function ir(v,j){let H=j.get(v.id),$e=i?c`<button
          type="button"
          class="detail-dep__link"
          title=${cn(v.title)}
          @click=${()=>H===void 0?i(v.id):i(v.id,H)}
        >
          ${v.label}
        </button>`:c`<span class="detail-dep__link" title=${cn(v.title)}
          >${v.label}</span
        >`;return c`<span
      class=${`detail-dep detail-dep--${v.kind}${i?" detail-dep--link":""}`}
      >${$e}${v.kind==="pred"?c`<button
            type="button"
            class="detail-dep__unlink"
            data-dep-b=${v.id}
            aria-label=${"\uC758\uC874 \uD574\uC81C: "+v.id}
            @click=${()=>Bt(v.id)}
          >
            ✕
          </button>`:""}</span
    >`}function ar(v){let j=Array.isArray(v.dependencies)?v.dependencies:[],H=Array.isArray(v.dependents)?v.dependents:[],$e=[];for(let Et of j){let Ae=wr(Et);Ae.length>0&&y(Et)==="blocks"&&$e.push({id:Ae,label:`\u26D3 ${Ae}`,kind:"pred",title:R("\uB9C9\uB294",Et)})}for(let Et of H){let Ae=wr(Et);Ae.length>0&&y(Et)==="blocks"&&$e.push({id:Ae,label:`\u2192 ${Ae}`,kind:"succ",title:R("\uB9C9\uD788\uB294",Et)})}for(let Et of j){let Ae=wr(Et),At=y(Et);if(Ae.length>0&&At!=="blocks"){let Ot=b(At);$e.push({id:Ae,label:`${Ot.glyph}${Ae}`,kind:"other",title:R(Ot.relation,Et)})}}let Ye=Fe(),mt=new Map;if(Ye)for(let Et of Ye.issues)mt.has(Et.bead_id)||mt.set(Et.bead_id,Et.root_dir);let Vt=Ye&&u?Of(Cf(u,Ye),O):[],vt=kn(Vt,$e.filter(Et=>Et.kind==="pred").map(Et=>Et.id));return c`
      <div class="detail-section-label">의존성</div>
      ${$e.length===0?c`<div class="detail-empty">의존성 없음</div>`:c`<div class="detail-deps">
            ${$e.map(Et=>ir(Et,mt))}
          </div>`}
      ${Ye===null?c`<div class="detail-empty">후보를 불러올 수 없음</div>`:or(Vt,vt)}
    `}function _n(v){let j=v.metadata||{},H=v.workflow||{},$e=H.stages||{},Ye=$e.spec&&$e.spec.stale,mt=$e.impl&&$e.impl.stale,Vt=H.quick_fix_review?.state==="stale",vt=$e.plan||null,Et=H.route_source==="derived",Ae=H.route||j.route||"\u2014";return c`
      <div class="detail-section-label">워크플로우</div>
      <div class="detail-kv">
        <span class="detail-kv__k">route</span>
        <span
          class="detail-kv__v${Et?" detail-kv__v--derived":""}"
          title=${Et?"route \uBBF8\uD540 (metadata unset)":"route"}
          >${Et?"unset":Ae}</span
        >
      </div>
      ${H.route!=="quick_fix"||Object.hasOwn(j,"spec_review")?c`<div class="detail-kv">
            <span class="detail-kv__k">spec_review</span>
            <span class="detail-kv__v"
              >${j.spec_review||"\uC5C6\uC74C"}${Ye?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${H.route==="full_plan"?c`<div class="detail-kv">
              <span class="detail-kv__k">plan_review</span>
              <span class="detail-kv__v"
                >${vt?.receipt||"\uC5C6\uC74C"}${vt?.review_state==="incomplete"?" \xB7 \uBD88\uC644\uC804(\uC575\uCEE4 \uBD88\uC77C\uCE58)":""}</span
              >
            </div>
            <div class="detail-kv">
              <span class="detail-kv__k">plan_approval</span>
              <span class="detail-kv__v"
                >${vt?.approval_receipt||"\uC5C6\uC74C"}${vt?.approval_state==="stale"?" \xB7 stale":vt?.approval_state==="unknown"?" \xB7 unknown":""}</span
              >
            </div>`:""}
      ${H.route!=="quick_fix"||Object.hasOwn(j,"impl_review")?c`<div class="detail-kv">
            <span class="detail-kv__k">impl_review</span>
            <span class="detail-kv__v"
              >${j.impl_review||"\uC5C6\uC74C"}${mt?" \xB7 stale":""}</span
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
      ${H.route==="quick_fix"||Object.hasOwn(j,"quick_fix_review")?c`<div class="detail-kv">
            <span class="detail-kv__k">quick_fix_review</span>
            <span class="detail-kv__v"
              >${j.quick_fix_review||"\uC5C6\uC74C"}${Vt?" \xB7 stale":""}</span
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
              >${ur(H.exec_receipt)}</span
            >
          </div>`:""}
      ${H.impl_entry?c`<div class="detail-kv">
            <span class="detail-kv__k">impl_entry</span>
            <span class="detail-kv__v"
              >${`${H.impl_entry.actor}@${H.impl_entry.sha}`}</span
            >
          </div>`:""}
      ${j.pr_url?c`<div class="detail-kv">
            <span class="detail-kv__k">pr_url</span>
            <span class="detail-kv__v detail-kv__v--wrap">${j.pr_url}</span>
          </div>`:""}
    `}let lr={route:["quick_fix","spec_backed","full_plan"]};async function $r(v,j){let H=j.target.value;if(v==="route"&&d&&d.metadata&&d.metadata.route==="full_plan"&&H!=="full_plan"&&!window.confirm(`full_plan \u2192 ${H||"(\uBBF8\uC124\uC815)"} \uC804\uD658: \uC800\uC7A5\uB41C plan \uC2B9\uC778\uC740 \uD3EC\uAE30\uB418\uBA70, plan \uD30C\uC77C\xB7\uB9C8\uCEE4 \uC815\uB9AC\uB294 \uC138\uC158 \uACC4\uC57D\uC774 \uC218\uD589\uD569\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`)){lt();return}await x("update-workflow-meta",{id:u,key:v,value:H},"\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uBA54\uD0C0 \uBCC0\uACBD \uC2E4\uD328"),lt()}function xr(v){let j=v.metadata||{};return c` ${(($e,Ye)=>{let mt=lr[$e],Vt=typeof j[$e]=="string"?j[$e]:"";return c`<div class="detail-kv">
        <span class="detail-kv__k">${$e}</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label=${$e}
          data-edit=${`wfmeta-${$e}`}
          @change=${vt=>$r($e,vt)}
        >
          <option value="" ?selected=${!mt.includes(Vt)}>
            ${Ye}
          </option>
          ${mt.map(vt=>c`<option value=${vt} ?selected=${Vt===vt}>${vt}</option>`)}
        </select>
      </div>`})("route","(unset)")} `}function Fr(v,j){return M?c`
        <div class="detail-edit">
          <input
            class="detail-edit__input"
            data-edit="title"
            aria-label="제목 편집"
            .value=${G}
            @input=${he}
            @keydown=${H=>Pe(H,He,Ue,!1)}
          />
          <div class="detail-edit__actions">
            <button
              type="button"
              class="detail-edit__save"
              data-edit="title-save"
              @click=${He}
            >
              저장
            </button>
            <button
              type="button"
              class="detail-edit__cancel"
              data-edit="title-cancel"
              @click=${Ue}
            >
              취소
            </button>
          </div>
        </div>
      `:c`
      <div class="detail-title-row">
        <h2 class="detail-overlay__title">${v}</h2>
        ${mn(j).map(H=>c`<span class="detail-usage-total" title=${H.tooltip}
              >${H.label}</span
            >`)}
        <button
          type="button"
          class="detail-edit-btn"
          data-edit="title"
          aria-label="제목 편집"
          @click=${ae}
        >
          ✎
        </button>
      </div>
    `}function Ge(v){let j=nn(v.created_at),H=nn(v.updated_at);return!j&&!H?c``:c`
      ${j?c`<div class="detail-kv">
            <span class="detail-kv__k">생성</span>
            <span class="detail-kv__v detail-kv__v--time">${j}</span>
          </div>`:""}
      ${H?c`<div class="detail-kv">
            <span class="detail-kv__k">수정</span>
            <span class="detail-kv__v detail-kv__v--time">${H}</span>
          </div>`:""}
    `}function Qt(v,j){return c`
      <div class="detail-section-label">속성 (수정 가능)</div>
      <div class="detail-kv">
        <span class="detail-kv__k">status</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label="status"
          data-edit="status"
          @change=${Ce}
        >
          ${Nw.map(H=>c`<option value=${H} ?selected=${H===v}>${H}</option>`)}
        </select>
      </div>
      <div class="detail-kv">
        <span class="detail-kv__k">priority</span>
        <select
          class="detail-kv__v"
          aria-label="priority"
          data-edit="priority"
          @change=${rt}
        >
          ${Mw.map(H=>c`<option value=${String(H)} ?selected=${H===j}>
                P${H}
              </option>`)}
        </select>
      </div>
    `}function On(v){return c`
      <div class="detail-title-row">
        <div class="detail-overlay__section-label">설명</div>
        ${q?"":c`<button
              type="button"
              class="detail-edit-btn"
              data-edit="description"
              aria-label="설명 편집"
              @click=${pt}
            >
              ✎
            </button>`}
      </div>
      ${q?c`<div class="detail-edit">
            <textarea
              class="detail-edit__textarea"
              data-edit="description"
              aria-label="설명 편집"
              rows="6"
              .value=${P}
              @input=${Ft}
              @keydown=${j=>Pe(j,I,A,!0)}
            ></textarea>
            <div class="detail-edit__actions">
              <button
                type="button"
                class="detail-edit__save"
                data-edit="description-save"
                @click=${I}
              >
                저장
              </button>
              <button
                type="button"
                class="detail-edit__cancel"
                data-edit="description-cancel"
                @click=${A}
              >
                취소
              </button>
            </div>
          </div>`:c`<div class="detail-overlay__desc">
            ${v||"(\uC124\uBA85 \uC5C6\uC74C)"}
          </div>`}
    `}function Qs(v){let j=typeof v.notes=="string"?v.notes:"";return j.trim().length===0?c``:c`
      <div class="detail-overlay__section-label">노트</div>
      <div class="detail-overlay__notes">${j}</div>
    `}function Zs(v){let j=Array.isArray(v.labels)?v.labels:[];return c`
      <div class="detail-section-label">라벨</div>
      <div class="detail-labels">
        ${j.map(H=>c`<span class="detail-label-chip"
              >${H}<button
                type="button"
                class="detail-label-chip__x"
                data-label=${H}
                aria-label=${"\uB77C\uBCA8 \uC81C\uAC70: "+H}
                @click=${()=>Vn(H)}
              >
                ×
              </button></span
            >`)}
        <span class="detail-label-add">
          <input
            class="detail-label-add__input"
            aria-label="라벨 추가"
            placeholder="라벨 추가"
            .value=${$}
            @input=${ft}
            @keydown=${kr}
          />
          <button
            type="button"
            class="detail-label-add__btn"
            @click=${tn}
          >
            추가
          </button>
        </span>
      </div>
    `}function ti(){if(!u)return c``;let v=d||{},j=String(v.id||u),H=v.title||"(\uC81C\uBAA9 \uC5C6\uC74C)",$e=ze(),Ye=v.status||"open",mt=typeof v.priority=="number"?Math.max(0,Math.min(4,v.priority)):"",Vt=v.description||"",vt=o?o.get():null,Et=vt&&Ye!=="closed"?wo({...v,id:j},vt):null,Ae=vt?$o(vt):null,At={...v,metadata:{...v.metadata||{},..._}};return c`
      <div class="detail-overlay" role="dialog" aria-modal="true">
        <div class="detail-overlay__backdrop" @click=${()=>r()}></div>
        <div class="detail-overlay__panel">
          <div class="detail-overlay__bar">
            <button
              type="button"
              class="detail-overlay__id"
              title="ID 복사"
              @click=${hn}
            >
              ${j}
            </button>
            ${Et?c`<button
                  type="button"
                  class="op-btn op-btn--primary detail-overlay__place"
                  data-bead-id=${j}
                  ?disabled=${!Et.placeable}
                  title=${Zr(Et)}
                  @click=${()=>kt(j,Ae)}
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
          ${Et&&k&&Ae?c`<div
                class="place-menu detail-overlay__place-menu"
                @click=${Ot=>Rt(Ot,j)}
              >
                ${Kl(Ae,j)}
                <button
                  type="button"
                  class="op-btn op-btn--icon worker-card__place-cancel"
                  data-bead-id=${j}
                  title="레인 선택 취소"
                  aria-label="레인 선택 취소"
                  @click=${()=>{k=!1,lt()}}
                >
                  ✕
                </button>
              </div>`:""}
          ${Fr(H,$e)}
          ${T_(At,{onChipToggle:Ot=>Ht.toggle({bead_id:j,chip_key:Ot}),isChipOpen:Ot=>Ht.isOpen({bead_id:j,chip_key:Ot})})}
          ${E_({metadata:At.metadata,workspace_values:Xt(),catalog:$t(),execution_defaults:rn(),expanded:T,presets:qt()?.presets||[],preset_id:m,preset_busy:h,skipped_orchestration_keys:g},{onToggle:Ot=>{T=Ot,lt()},onEdit:(Ot,ni)=>{if(Ot==="impl_runtime"||Ot==="impl_model"||Ot==="impl_effort"){p(f(Ot,ni??""));return}p(bn(Ot,ni??""))},onPresetSelect:Ot=>{m=Ot,g=[],lt()},onPresetApply:()=>{Ke()}})}
          ${D_({md:At.metadata,catalog:ne,workspace_defaults:z,handlers:{onExecChange:(Ot,ni)=>p(bn(Ot,ni))}})}
          ${Qt(Ye,mt)} ${Ge(v)}
          ${On(Vt)}
          ${$_(de,Y,{expanded:pe,draft:ge,sending:F,error:Ie})}
          ${Qs(v)} ${Zs(v)} ${ar(v)}
          ${_n(v)} ${xr(v)}
          ${y_(v,sr)}
          ${W_({expanded:Be,loading:re,error:Q,data:Te},{onToggle:ut})}
          ${U_(st(),Wt,{total:$e,expanded:E,catalog:$t()},St)}
          ${z_({events:Se,shown:We},{onMore:it})}
        </div>
      </div>
    `}function lt(){ct(ti(),e)}return{load(v){v!==u&&(_={},k=!1,m="",g=[],T=!1,oe(),B(),gt(),w(),xe(),ue()),u=v,d=null,!xt&&t.subscribeCandidates&&(xt=t.subscribeCandidates(()=>{u&&lt()})),at(),an(),N!==v&&ie(v)},clear(){u=null,d=null,_={},k=!1,m="",h=!1,g=[],T=!1,oe(),B(),gt(),w(),xe(),ue(),Ve(),Le.close(),Je.close(),ct(c``,e)},destroy(){L&&(L(),L=null),ve&&(ve(),ve=null),je&&(je(),je=null),Ve(),document.removeEventListener("keydown",Dt),Ht.detach(),ke||(Le.destroy(),fe&&fe.parentNode&&fe.parentNode.removeChild(fe)),Je.destroy(),Ne.parentNode&&Ne.parentNode.removeChild(Ne),u=null,d=null,ue(),m="",h=!1,g=[],B(),gt(),w(),xe(),ct(c``,e)}}}function G_(e){let t=document.createElement("dialog");t.id="fatal-error-dialog",t.setAttribute("role","alertdialog"),t.setAttribute("aria-modal","true"),t.innerHTML=`
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
    </div>`,e.appendChild(t);let n=t.querySelector("#fatal-error-title"),r=t.querySelector("#fatal-error-message"),s=t.querySelector("#fatal-error-detail"),i=t.querySelector("#fatal-error-reload"),o=t.querySelector("#fatal-error-close"),a=()=>{if(typeof t.close=="function")try{t.close()}catch{}t.removeAttribute("open")},l=(u,d,_="")=>{n&&(n.textContent=u||"Unexpected Error"),r&&(r.textContent=d||"An unrecoverable error occurred.");let m=typeof _=="string"?_.trim():"";if(s&&(m.length>0?(s.textContent=m,s.removeAttribute("hidden")):(s.textContent="No additional diagnostics available.",s.setAttribute("hidden",""))),typeof t.showModal=="function")try{t.showModal(),t.setAttribute("open","")}catch{t.setAttribute("open","")}else t.setAttribute("open","")};return i&&i.addEventListener("click",()=>{window.location.reload()}),o&&o.addEventListener("click",()=>a()),t.addEventListener("cancel",u=>{u.preventDefault(),a()}),{open:l,close:a,getElement(){return t}}}var qw="(max-width: 640px)";function Ba(e){if(typeof window.matchMedia!="function")return e(!1),()=>{};let t=window.matchMedia(qw),n=!!t.matches;e(n);let r=s=>{let o=!!(typeof s=="object"&&s!==null&&typeof s.matches=="boolean"?s.matches:t.matches);o!==n&&(n=o,e(o))};return typeof t.addEventListener=="function"?(t.addEventListener("change",r),()=>{t.removeEventListener("change",r)}):typeof t.addListener=="function"?(t.addListener(r),()=>{typeof t.removeListener=="function"&&t.removeListener(r)}):()=>{}}function jw(){return{lanes:{done:!0},areas:{}}}function Qo(e){let t={};if(typeof e!="object"||e===null)return t;for(let[n,r]of Object.entries(e))typeof r=="boolean"&&(t[n]=r);return t}function Fw(e){try{let t=window.localStorage.getItem(e);if(!t)return null;let n=JSON.parse(t);if(typeof n!="object"||n===null)return null;let r=n;return typeof r.lanes=="object"&&r.lanes!==null?{lanes:Qo(r.lanes),areas:Qo(r.areas)}:{lanes:Qo(r),areas:{}}}catch{return null}}function V_(e,t){try{window.localStorage.setItem(e,JSON.stringify(t))}catch{}}function Ua(e,t=jw()){let n={lanes:Qo(t.lanes),areas:Qo(t.areas)},r=Fw(e),s={lanes:{...n.lanes,...r?r.lanes:{}},areas:{...n.areas,...r?r.areas:{}}};return{isCollapsed(i){return s.lanes[i]===!0},isAreaCollapsed(i){return s.areas[i]===!0},toggle(i){let o=s.lanes[i]!==!0;return s={...s,lanes:{...s.lanes,[i]:o}},V_(e,s),o},toggleArea(i){let o=s.areas[i]!==!0;return s={...s,areas:{...s.areas,[i]:o}},V_(e,s),o}}}function Qc(e){if(typeof e=="string"&&e.length>0)return e;if(e&&typeof e=="object"){let t=e;if(typeof t.message=="string"&&t.message.length>0)return t.message;if(typeof t.error=="string"&&t.error.length>0)return t.error;if(t.error&&typeof t.error=="object"&&typeof t.error.message=="string")return t.error.message}return"\uC694\uCCAD\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4"}function Wa(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"&&t.length>0):[]}function Ha(e){let{transport:t,console_el:n,getLanes:r,getWorkspaces:s,getCrossLanes:i,reproject:o,onCorrection:a,showToast:l,requestRender:u,adoptQueue:d,onDragBegin:_,candidate_drop:m}=e,h=[],g=null,T=!1,k=null,ee=null,ne=null;function z(){k!==null&&clearTimeout(k),k=setTimeout(()=>{k=null,T=!1},0)}function N(){return i()??null}function D(){let W=new Map,te=s();for(let J of Array.isArray(te)?te:[]){if(!J||typeof J!="object")continue;let Y=J.bead_blocked_by&&typeof J.bead_blocked_by=="object"?J.bead_blocked_by:{};for(let[ke,fe]of Object.entries(Y))Array.isArray(fe)&&W.set(ke,Wa(fe));for(let ke of[...Array.isArray(J.runnable)?J.runnable:[],...Array.isArray(J.session_active)?J.session_active:[]])ke&&typeof ke.bead_id=="string"&&Array.isArray(ke.blocked_by)&&ke.blocked_by.length>0&&W.set(ke.bead_id,Wa(ke.blocked_by))}return W}function M(){let W=new Map,te=new Map,J=s();for(let Y of Array.isArray(J)?J:[]){if(!Y||typeof Y!="object")continue;let ke=Y.bead_blocked_by&&typeof Y.bead_blocked_by=="object"?Y.bead_blocked_by:{};for(let[fe,Le]of Object.entries(ke))Array.isArray(Le)&&W.set(fe,Wa(Le));for(let fe of Array.isArray(Y.runnable)?Y.runnable:[])fe&&typeof fe.bead_id=="string"&&Array.isArray(fe.blocked_by)&&te.set(fe.bead_id,Wa(fe.blocked_by))}for(let Y of h)for(let ke of[W,te]){let fe=ke.get(Y.a);fe!==void 0&&ke.set(Y.a,Y.type==="dep-remove"?fe.filter(Le=>Le!==Y.b):fe.includes(Y.b)?fe:[...fe,Y.b])}return{snapshot:W,runnable:te}}function q(){let W=D();for(let te of h){let J=(W.get(te.a)||[]).slice();te.type==="dep-remove"?W.set(te.a,J.filter(Y=>Y!==te.b)):J.includes(te.b)||W.set(te.a,[...J,te.b])}return W}function G(W=r(),te=N()){let J=new Map;for(let Be of Array.isArray(te?.lanes)?te.lanes:[]){let re=new Map;for(let Q of Array.isArray(Be?.entries)?Be.entries:[])Q&&typeof Q.bead_id=="string"&&re.set(Q.bead_id,Q.dep_created_by_lane===!0);J.set(typeof Be?.id=="string"?Be.id:"",re)}let Y=new Map,ke=new Map,fe=new Set,Le=new Set;for(let Be of W.chain_lanes){let re=J.get(Be.lane_id);Y.set(Be.lane_id,{status:Be.status,entries:Be.rows.map((Q,Te)=>({bead_id:Q.id,root_dir:Q.root_dir,...Te===0?{}:{dep_created_by_lane:re?.get(Q.id)===!0}}))});for(let Q of Be.rows)ke.set(Q.id,Be.lane_id),Q.fixed&&fe.add(Q.id),Q.unplaced||Le.add(Q.id)}let Ne=new Map;for(let Be of W.parallel_rows)typeof Be.queue_index=="number"&&Ne.set(Be.id,Be.queue_index);for(let Be of W.queue_groups)for(let re of Be.sublanes.serial)for(let Q of re.items)typeof Q.queue_index=="number"&&Ne.set(Q.id,Q.queue_index);let Je=M();return{blocked_by_map:q(),snapshot_blocked_by:Je.snapshot,runnable_blocked_by:Je.runnable,owner_of:new Map(Object.entries(W.owner_of)),cross_lanes:Y,owner_lane_of:ke,fixed_members:fe,placed_members:Le,parallel_rows:W.parallel_rows.map(Be=>({bead_id:Be.id,root_dir:Be.root_dir,queue_index:Be.queue_index??0})),parallel_raw_length:new Map(Object.entries(W.parallel_raw_length)),queue_index_of:Ne}}function P(W,te){let J=r();for(let ke of[...J.runnable,...J.queue,...J.running,...J.pr_wait,...J.done])if(!(ke.non_occupying||ke.id!==te)){if(ke.root_dir===W)return ke.expected_revision;break}let Y=J.queue_groups.find(ke=>ke.root_dir===W);return Y?Y.revision:0}async function $(W,te,J,Y){if(!t)return null;let fe=await t(W,{...te,...J?{root_dir:J}:{},expected_revision:Y});if(fe&&fe.conflict){fe.queue&&d?.(J,fe.queue);let Le=fe.queue&&typeof fe.queue.revision=="number"?fe.queue.revision:Y;fe=await t(W,{...te,...J?{root_dir:J}:{},expected_revision:Le})}return fe&&fe.queue&&d?.(J,fe.queue),fe}async function O(W,te,J,Y,ke){try{let fe=await $(W,te,J,Y.get(J)??P(J,ke.bead_id));return!fe||typeof fe.applied!="boolean"?(l("\uD050 \uC694\uCCAD\uC774 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error"),null):(fe.queue&&typeof fe.queue.revision=="number"&&Y.set(J,fe.queue.revision),fe.conflict?(l("\uD050\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD574 \uC8FC\uC138\uC694","error"),null):fe.applied===!1?(l(fe.admission_reason?`\uD050 \uC801\uC7AC \uAC70\uBD80: ${fe.admission_reason}`:"\uD050 \uC694\uCCAD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4","error"),null):fe.queue&&typeof fe.queue.revision=="number"?fe.queue.revision:Y.get(J)??0)}catch(fe){return l(Qc(fe),"error"),null}}async function C(W,te,J=new Map){if(W.type==="worker-queue-disarm"){try{let Y=await $(W.type,W.payload,W.root_dir,J.get(W.root_dir)??P(W.root_dir,te));Y&&Y.queue&&typeof Y.queue.revision=="number"&&J.set(W.root_dir,Y.queue.revision)}catch{}return!0}if(W.type==="worker-queue-place"||W.type==="worker-queue-reorder"||W.type==="worker-queue-remove")return await O(W.type,W.payload,W.root_dir,J,{bead_id:te})!==null;try{return(W.type==="dep-add"||W.type==="dep-remove")&&t&&await t(W.type,{a:W.a,b:W.b,...W.root_dir?{root_dir:W.root_dir}:{}}),!0}catch(Y){return l(Qc(Y),"error"),!1}}function oe(W){(W.type==="dep-add"||W.type==="dep-remove")&&(h=[...h,{type:W.type,a:W.a,b:W.b}])}async function ue(W,te){if(!t)return{ok:!1};try{let J=await t(W.type,{...W.payload,expected_revision:te});return!J||typeof J.revision!="number"?(l("\uC5F0\uACB0 \uB808\uC778 \uC751\uB2F5\uC5D0 revision\uC774 \uC5C6\uC2B5\uB2C8\uB2E4","error"),{ok:!1}):{ok:!0,revision:J.revision}}catch(J){let Y=J,ke=Y&&Y.code==="conflict"?Y.details?.cross_lanes:null;return ke&&typeof ke.revision=="number"&&Array.isArray(ke.lanes)?{ok:!1,conflict:ke}:(l(Qc(J),"error"),{ok:!1})}}async function me(W,te,J){let Y=new Map,ke=[],fe=W.ops.slice(0,W.lane_op_index),Le=W.ops.slice(W.lane_op_index);for(let Je of fe){if(!await C(Je,J,Y))return{done:!0};oe(Je)}let Ne=te;for(let Je of W.lane_ops){if(Ne===null)return l("\uC5F0\uACB0 \uB808\uC778 \uC800\uC7A5\uC18C\uB97C \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error"),{done:!0};let Be=await ue(Je,Ne);if(!Be.ok)return Be.conflict?{done:!1,conflict:Be.conflict}:{done:!0};Ne=Be.revision}for(let Je of Le){if(!await C(Je,J,Y))return{done:!0};oe(Je),Je.type==="dep-add"&&ke.push(Je)}for(let Je of Tf(ke))Ne=await V(Je,Ne);return{done:!0}}async function V(W,te){if(te===null||!t)return te;let J=W.pairs,Y=te;for(let ke=0;ke<2;ke+=1){if(J.length===0)return Y;try{let fe=await t("monitor-lane-provenance",{lane_id:W.lane_id,pairs:J.map(Le=>({bead_id:Le.bead_id,after:Le.after,value:!0})),expected_revision:Y});return fe&&typeof fe.revision=="number"?fe.revision:Y}catch(fe){let Le=fe,Ne=Le&&Le.code==="conflict"?Le.details?.cross_lanes:null;if(!Ne||typeof Ne.revision!="number"||!Array.isArray(Ne.lanes))return Y;let Je=Ne.lanes.find(Be=>Be&&Be.id===W.lane_id);J=Rf(Array.isArray(Je?.entries)?Je.entries:[],J),Y=Ne.revision}}return Y}async function ie(W,te,J=[]){h=J,a("",0);let Y=r(),ke=N();for(let fe=0;;fe+=1){let Le=W(G(Y,ke));if("refused"in Le){l(Le.refused,"error");break}let Ne=await me(Le,Y.cross_lanes_revision,te);if(Ne.done){Le.correction&&a(Le.correction.lane_id,Le.correction.corrected);break}if(fe>=1){l("\uB808\uC778\uC774 \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4","error");break}let Je=o(Ne.conflict);Y=Je.lanes,ke=Je.raw_lanes}h=[],u()}async function de(W,te){await ie(J=>ka(W,te,J),W.bead_id)}function Oe(W,te){let J=te&&typeof te.closest=="function"?te.closest("[data-row-index]"):null;if(J&&W.contains(J)){let Y=Number(J.getAttribute("data-row-index"));return Number.isFinite(Y)?Y:0}return W.querySelectorAll("[data-row-index]").length}function qe(W){let te=typeof W?.closest=="function"?W.closest(".worker-pane--collapsed[data-lane]"):null;if(!te)return null;let J=te.getAttribute("data-lane");return J==="queue"?{zone:te,target:{kind:"parallel",marker_index:r().parallel_rows.length}}:J==="candidate"&&m===!0?{zone:te,target:{kind:"candidate"}}:null}function Ie(W){let te=W.target;if(!g)return null;let J=typeof te?.closest=="function"?te.closest("[data-drop]"):null;if(!J)return qe(te);let Y=J.getAttribute("data-drop");if(Y==="candidate")return{zone:J,target:{kind:"candidate"}};if(Y==="parallel")return{zone:J,target:{kind:"parallel",marker_index:Oe(J,te)}};if(Y==="chain")return{zone:J,target:{kind:"chain",lane_id:J.getAttribute("data-lane-id")||"",marker_index:Oe(J,te)}};if(Y==="repo-serial"){let ke=J.getAttribute("data-root-dir")||"";if(ke!==g.root_dir)return null;let fe=typeof te?.closest=="function"?te.closest("[data-queue-index]"):null,Le=fe&&J.contains(fe)?fe.getAttribute("data-queue-index"):J.getAttribute("data-lane-length"),Ne=Number(Le);return{zone:J,target:{kind:"repo-serial",root_dir:ke,lane_id:J.getAttribute("data-lane-id")||"",index:Number.isFinite(Ne)?Ne:0}}}return null}function ge(){for(let W of Array.from(n.querySelectorAll(".is-drop-over")))W.classList.remove("is-drop-over")}function F(W){ee=W.target instanceof Element?W.target:null}function ce(W){let te=W.target,J=typeof te?.closest=="function"?te.closest('[draggable="true"][data-bead-id]'):null,Y=J?J.closest("[data-drag-kind]"):null;if(!Y)return;if(J&&ee&&J.contains(ee)&&typeof ee.closest=="function"&&ee.closest("input, button, a")){W.preventDefault();return}let ke=Y.getAttribute("data-bead-id")||"",fe=Y.getAttribute("data-drag-kind")||"",Le=Y.getAttribute("data-root-dir")||"";if(!ke||!fe)return;let Ne=Y.getAttribute("data-queue-index")||"",Je=Number(Ne),Be=Y.getAttribute("data-lane-id")||"";g={kind:fe,bead_id:ke,root_dir:Le,...Ne!==""&&Number.isFinite(Je)?{queue_index:Je}:{},...Be?{lane_id:Be}:{}},T=!0,_?.(),n.classList.add("is-dragging");try{W.dataTransfer?.setData("text/plain",ke),W.dataTransfer&&(W.dataTransfer.effectAllowed="move")}catch{}}function pe(W){let te=Ie(W);te&&(W.preventDefault(),W.dataTransfer&&(W.dataTransfer.dropEffect="move"),te.zone.classList.add("is-drop-over"))}function B(W){let te=W.target;typeof te?.closest=="function"&&(te.closest("[data-drop]")?.classList.remove("is-drop-over"),te.closest(".worker-pane--collapsed")?.classList.remove("is-drop-over"))}function U(){g=null,ge(),n.classList.remove("is-dragging"),z()}function Re(W){let te=Ie(W),J=g;g=null,ge(),n.classList.remove("is-dragging"),!(!te||!J)&&(W.preventDefault(),de(J,te.target))}return{attach(W){ne||(ne=W,W.addEventListener("pointerdown",F),W.addEventListener("dragstart",ce),W.addEventListener("dragover",pe),W.addEventListener("dragleave",B),W.addEventListener("drop",Re),W.addEventListener("dragend",U))},detach(){k!==null&&(clearTimeout(k),k=null);let W=ne;ne=null,W&&(W.removeEventListener("pointerdown",F),W.removeEventListener("dragstart",ce),W.removeEventListener("dragover",pe),W.removeEventListener("dragleave",B),W.removeEventListener("drop",Re),W.removeEventListener("dragend",U))},isDragging(){return g!==null},consumeClickSuppression(){let W=T;return T=!1,W},applyDrop:de,runPlanned:ie,dropModel:G,sendOp:C,sendQueueCas:O,rememberDep:oe}}function dn(e){return e&&typeof e=="object"?e:{}}function Bw(e,t){for(let n of Object.values(dn(t.provider_hold)))for(let r of Array.isArray(n?.targets)?n.targets:[])if(Array.isArray(r?.attempt_ids)&&r.attempt_ids.includes(e))return r;return null}function Uw(e,t){let r=dn(dn(t).account_catalog)[e];return Array.isArray(r)?r:[]}function Y_(e,t){let n=e==="codex"?t?.key:t?.email;return typeof n=="string"?n:""}function Ww(e,t){if(e!=="claude")return{eligible:!0,reason:""};if(t?.status!=="ok")return{eligible:!1,reason:`\uACC4\uC815 \uC0C1\uD0DC ${String(t?.status||"\uBBF8\uC0C1")}`};let n=Array.isArray(t.windows)?t.windows:[],r=n.find(i=>i?.key==="5h"),s=n.find(i=>i?.key==="7d");if(!r||typeof r.pct!="number")return{eligible:!1,reason:"5\uC2DC\uAC04 \uC0AC\uC6A9\uB7C9 \uBBF8\uAD00\uCE21"};if(r.pct>80)return{eligible:!1,reason:"5\uC2DC\uAC04 \uC0AC\uC6A9\uB7C9 80% \uCD08\uACFC"};if(s){if(typeof s.pct!="number")return{eligible:!1,reason:"7\uC77C \uC0AC\uC6A9\uB7C9 \uBBF8\uAD00\uCE21"};if(s.pct>90)return{eligible:!1,reason:"7\uC77C \uC0AC\uC6A9\uB7C9 90% \uCD08\uACFC"}}return{eligible:!0,reason:""}}function za(e,t){let n=dn(dn(t).attempts)[e];if(!n)return null;let r=dn(dn(t).runner_catalog),s=dn(r.runners),i=typeof n.runner=="string"&&s[n.runner]?n.runner:Object.keys(s)[0]||"",o=dn(s[i]),a=dn(o.models),l=typeof n.model=="string"&&a[n.model]?n.model:typeof o.default_model=="string"?o.default_model:Object.keys(a)[0]||"",u=Bw(e,dn(t)),d=i==="codex"?n.codex_account:n.claude_account,_=typeof d=="string"?d:typeof u?.account=="string"?u.account:"";return{attempt_id:e,original_runner:i,runner:i,model:l,account:_,fresh_current:!1}}function Ka(e,t,n){if(!e||!t||typeof t.closest!="function")return null;let r=t.closest(".provider-resume-dialog__runner");if(r){let a=dn(dn(dn(n).runner_catalog).runners),l=dn(a[r.value]),u=Object.keys(dn(l.models));return{...e,runner:r.value,account:r.value===e.runner?e.account:"",model:typeof l.default_model=="string"?l.default_model:u[0]||""}}let s=t.closest(".provider-resume-dialog__model");if(s){try{let[a,l]=JSON.parse(s.value);if(typeof a=="string"&&typeof l=="string")return{...e,runner:a,model:l,account:a===e.runner?e.account:""}}catch{}return e}let i=t.closest(".provider-resume-dialog__account");if(i)return{...e,account:i.value};let o=t.closest(".provider-resume-dialog__fresh-input");return o?{...e,fresh_current:o.checked}:null}function Zc(e){return e==="claude"}function Hw(e){return e==="claude"||e==="codex"}function Ga(e){if(!e||!e.runner||!e.model||Zc(e.runner)&&!e.account)return null;let t={runner:e.runner,model:e.model};e.account&&(e.runner==="claude"?t.claude_account=e.account:e.runner==="codex"&&(t.codex_account=e.account));let n=e.fresh_current||e.runner!==e.original_runner;return{attempt_id:e.attempt_id,payload:{exec_override:t,...n?{continuation:"fresh_current",decision_token:{}}:{}}}}function Vs(e,t){if(!e)return"";let n=dn(dn(dn(t).runner_catalog).runners),r=Uw(e.runner,t),s=e.runner!==e.original_runner;return c`<dialog
    class="op-dialog provider-resume-dialog"
    aria-label="다른 방법으로 이어하기"
  >
    <h2>다른 방법으로 이어하기</h2>
    <div class="provider-resume-dialog__fields">
      <label>
        러너
        <select class="provider-resume-dialog__runner">
          ${Object.keys(n).map(i=>c`<option value=${i} ?selected=${i===e.runner}>
                ${i}
              </option>`)}
        </select>
      </label>
      <label>
        모델
        <select class="provider-resume-dialog__model">
          ${Object.entries(n).map(([i,o])=>c`<optgroup label=${i}>
                ${Object.keys(dn(o?.models)).map(a=>c`<option
                      value=${JSON.stringify([i,a])}
                      ?selected=${i===e.runner&&a===e.model}
                    >
                      ${a}
                    </option>`)}
              </optgroup>`)}
        </select>
      </label>
      ${Hw(e.runner)?c`<label>
            계정
            <select class="provider-resume-dialog__account">
              ${e.account?"":c`<option value="" selected>계정 선택</option>`}
              ${e.account&&!r.some(i=>Y_(e.runner,i)===e.account)?c`<option value=${e.account} selected>
                    ${e.account} (목록에 없음)
                  </option>`:""}
              ${r.map(i=>{let o=Ww(e.runner,i),a=Y_(e.runner,i),l=i.alias||i.email||a;return c`<option
                  value=${a}
                  ?selected=${a===e.account}
                  ?disabled=${!o.eligible}
                  title=${o.reason}
                >
                  ${l}${o.reason?` \u2014 ${o.reason}`:""}
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
    ${s||e.fresh_current?c`<p class="provider-resume-dialog__notice">
          이전 세션 맥락을 요약 인계합니다
        </p>`:""}
    <div class="op-dialog__actions provider-resume-dialog__actions">
      <button type="button" class="op-btn provider-resume-dialog__cancel">
        취소
      </button>
      <button
        type="button"
        class="op-btn op-btn--primary provider-resume-dialog__confirm"
        ?disabled=${Zc(e.runner)&&!e.account}
        title=${Zc(e.runner)&&!e.account?"\uACC4\uC815\uC744 \uBA3C\uC800 \uACE0\uB974\uC138\uC694":""}
      >
        이어하기
      </button>
    </div>
  </dialog>`}function Va(e){let t=e?.querySelector?.(".provider-resume-dialog")||null;!t||t.open||(typeof t.showModal=="function"?t.showModal():t.setAttribute("open",""))}var Jc=Object.freeze({repo_ops_worktree_unowned:"\uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC\uAC00 \uC544\uC9C1 Worker \uC18C\uC720\uAC00 \uC544\uB2C8\uC5B4\uC11C \uC2A4\uD06C\uB9BD\uD2B8 \uC2E4\uD589 \uC804\uC5D0 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4.",verify_cmd_failed:"\uBA38\uC9C0 \uD6C4 \uAC80\uC99D \uBA85\uB839\uC774 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",gh_observation_failed:"GitHub\uC5D0\uC11C PR \uC0C1\uD0DC\uB97C \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",verify_script_failure:"\uAC80\uC99D \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",deploy_script_failure:"\uBC30\uD3EC \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",interrupted_without_terminal_exit:"\uC791\uC5C5\uC774 \uC885\uB8CC \uAE30\uB85D \uC5C6\uC774 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4.",manual_target_missing:"\uC218\uB3D9 \uBC30\uD3EC \uAE30\uB85D\uC5D0 \uD540\uB41C \uB300\uC0C1 SHA\uAC00 \uC5C6\uC5B4 \uC2E4\uD589\uD558\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4.",bootstrap_not_approved:"\uCCAB [deploy] \uC120\uC5B8\uC740 \uC0AC\uB78C \uC2B9\uC778 \uC5C6\uC774 \uC2E4\uD589\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4. Worker \uC124\uC815\uC758 [\uBC30\uD3EC \uC2E4\uD589]\uC73C\uB85C \uC6D0\uACA9 base tip\uC744 \uD55C \uBC88 \uBC30\uD3EC\uD55C \uB4A4 [\uC815\uB9AC \uC7AC\uC2DC\uB3C4]\uB97C \uB204\uB974\uC138\uC694 \u2014 \uADF8 \uB4A4 \uBA38\uC9C0\uBD80\uD130\uB294 \uC790\uB3D9 \uBC30\uD3EC\uB429\uB2C8\uB2E4.",base_unresolved:"PR\uC774 \uC5B4\uB290 base \uBE0C\uB79C\uCE58\uB85C \uBA38\uC9C0\uB418\uB294\uC9C0 \uD655\uC815\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_ref_unobserved:"PR\uC758 base \uBE0C\uB79C\uCE58\uB97C \uC544\uC9C1 \uAD00\uCE21\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",merge_sha_unobserved:"\uBA38\uC9C0 \uCEE4\uBC0B SHA\uB97C \uC544\uC9C1 \uAD00\uCE21\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_fetch_failed:"\uC6D0\uACA9 base \uBE0C\uB79C\uCE58\uB97C fetch\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_rev_unavailable:"fetch\uD55C \uC6D0\uACA9 base \uBE0C\uB79C\uCE58\uC758 \uCEE4\uBC0B\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_ff_diverged:"\uB85C\uCEEC base \uBE0C\uB79C\uCE58\uAC00 \uC6D0\uACA9\uACFC \uAC08\uB77C\uC838 fast-forward\uB85C \uC815\uB82C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",deployment_target_not_covering_merge:"\uBC30\uD3EC \uB300\uC0C1 base\uAC00 \uC774 \uBA38\uC9C0 \uCEE4\uBC0B\uC744 \uD3EC\uD568\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.",deployment_candidate_ancestry_check_failed:"\uBC30\uD3EC \uB300\uC0C1 base\uAC00 \uC774 \uBA38\uC9C0 \uCEE4\uBC0B\uC744 \uD3EC\uD568\uD558\uB294\uC9C0 \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",verify_red:"\uBA38\uC9C0 \uD6C4 \uAC80\uC99D\uC774 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",cleanup_failed:"\uBA38\uC9C0 \uD6C4 \uC815\uB9AC\uAC00 \uB05D\uB098\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",retry_exhausted:"\uC790\uB3D9 \uC7AC\uC2DC\uB3C4\uB97C \uBAA8\uB450 \uC4F0\uACE0\uB3C4 \uAC19\uC740 \uC2E4\uD328\uAC00 \uC774\uC5B4\uC84C\uC2B5\uB2C8\uB2E4.",conflict_unresolved:"\uCDA9\uB3CC \uD574\uC18C\uAC00 \uB05D\uB098\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",internal_record_failed:"Worker \uB0B4\uBD80 \uAE30\uB85D\uC774 \uC2E4\uD328\uD574 \uC9C4\uD589\uC744 \uBA48\uCDC4\uC2B5\uB2C8\uB2E4.",foreign_landing_unpinned:"\uB2E4\uB978 \uC800\uC7A5\uC18C \uCC29\uC9C0\uC778\uB370 foreign_repo\xB7foreign_path\xB7foreign_base \uD540\uC774 \uC5C6\uAC70\uB098 \uD615\uC2DD\uC774 \uD2C0\uB9BD\uB2C8\uB2E4.",foreign_checkout_unavailable:"\uD540\uB41C \uB300\uC0C1 \uC800\uC7A5\uC18C \uCCB4\uD06C\uC544\uC6C3\uC774 \uC5C6\uAC70\uB098 foreign_repo\uC640 \uAC19\uC740 URL\uC758 remote\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4.",foreign_deploy_unsupported:"\uB300\uC0C1 \uC800\uC7A5\uC18C\uAC00 [deploy]\uB97C \uC120\uC5B8\uD574 Worker\uAC00 \uBC30\uD3EC \uC99D\uAC70\uB97C \uB9CC\uB4E4 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4. \uC138\uC158\uC774 \uBC30\uD3EC\uC640 \uB9C8\uAC10\uC744 \uC18C\uC720\uD569\uB2C8\uB2E4.",repair_lane_retired:"\uC790\uB3D9 \uC218\uB9AC \uB808\uC778\uC774 \uC740\uD1F4\uD574 \uC0AC\uB78C \uCC98\uB9AC\uB85C \uB118\uC5B4\uC654\uC2B5\uB2C8\uB2E4."}),eu=Object.freeze({verify_cmd_failed:"\uC2E4\uD328\uD55C \uBA85\uB839\uACFC \uADF8 \uCD9C\uB825\uC744 \uD655\uC778\uD558\uACE0 \uC6D0\uC778\uC744 \uACE0\uCE58\uB294 \uAC83\uC774 \uBA3C\uC800\uC785\uB2C8\uB2E4.",verify_script_failure:"\uC2E4\uD328\uD55C \uBA85\uB839\uACFC \uADF8 \uCD9C\uB825\uC744 \uD655\uC778\uD558\uACE0 \uC6D0\uC778\uC744 \uACE0\uCE58\uB294 \uAC83\uC774 \uBA3C\uC800\uC785\uB2C8\uB2E4.",deploy_script_failure:"\uC2E4\uD328\uD55C \uBA85\uB839\uACFC \uADF8 \uCD9C\uB825\uC744 \uD655\uC778\uD558\uACE0 \uC6D0\uC778\uC744 \uACE0\uCE58\uB294 \uAC83\uC774 \uBA3C\uC800\uC785\uB2C8\uB2E4.",verify_red:"\uC2E4\uD328\uD55C \uBA85\uB839\uACFC \uADF8 \uCD9C\uB825\uC744 \uD655\uC778\uD558\uACE0 \uC6D0\uC778\uC744 \uACE0\uCE58\uB294 \uAC83\uC774 \uBA3C\uC800\uC785\uB2C8\uB2E4.",base_fetch_failed:"\uC6D0\uACA9 \uC5F0\uACB0\uACFC \uAD00\uCE21 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uB294 \uAC83\uC774 \uBA3C\uC800\uC785\uB2C8\uB2E4.",gh_observation_failed:"\uC6D0\uACA9 \uC5F0\uACB0\uACFC \uAD00\uCE21 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uB294 \uAC83\uC774 \uBA3C\uC800\uC785\uB2C8\uB2E4.",base_ref_unobserved:"\uC6D0\uACA9 \uC5F0\uACB0\uACFC \uAD00\uCE21 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uB294 \uAC83\uC774 \uBA3C\uC800\uC785\uB2C8\uB2E4.",merge_sha_unobserved:"\uC6D0\uACA9 \uC5F0\uACB0\uACFC \uAD00\uCE21 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uB294 \uAC83\uC774 \uBA3C\uC800\uC785\uB2C8\uB2E4.",base_rev_unavailable:"\uC6D0\uACA9 \uC5F0\uACB0\uACFC \uAD00\uCE21 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uB294 \uAC83\uC774 \uBA3C\uC800\uC785\uB2C8\uB2E4.",deployment_candidate_ancestry_check_failed:"\uC6D0\uACA9 \uC5F0\uACB0\uACFC \uAD00\uCE21 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uB294 \uAC83\uC774 \uBA3C\uC800\uC785\uB2C8\uB2E4.",base_ff_diverged:"\uB300\uC0C1 \uBE0C\uB79C\uCE58\uC640 \uC18C\uC720\xB7\uBE0C\uB79C\uCE58 \uC0C1\uD0DC\uB97C \uC138\uC158\uC5D0\uC11C \uD655\uC778\uD558\uC138\uC694.",deployment_target_not_covering_merge:"\uB300\uC0C1 \uBE0C\uB79C\uCE58\uC640 \uC18C\uC720\xB7\uBE0C\uB79C\uCE58 \uC0C1\uD0DC\uB97C \uC138\uC158\uC5D0\uC11C \uD655\uC778\uD558\uC138\uC694.",repo_ops_worktree_unowned:"\uB300\uC0C1 \uBE0C\uB79C\uCE58\uC640 \uC18C\uC720\xB7\uBE0C\uB79C\uCE58 \uC0C1\uD0DC\uB97C \uC138\uC158\uC5D0\uC11C \uD655\uC778\uD558\uC138\uC694.",manual_target_missing:"\uB300\uC0C1 \uBE0C\uB79C\uCE58\uC640 \uC18C\uC720\xB7\uBE0C\uB79C\uCE58 \uC0C1\uD0DC\uB97C \uC138\uC158\uC5D0\uC11C \uD655\uC778\uD558\uC138\uC694.",base_unresolved:"\uB300\uC0C1 \uBE0C\uB79C\uCE58\uC640 \uC18C\uC720\xB7\uBE0C\uB79C\uCE58 \uC0C1\uD0DC\uB97C \uC138\uC158\uC5D0\uC11C \uD655\uC778\uD558\uC138\uC694.",bootstrap_not_approved:"Worker \uC124\uC815\uC758 [\uBC30\uD3EC \uC2E4\uD589]\uC73C\uB85C \uC6D0\uACA9 base tip\uC744 \uD55C \uBC88 \uBC30\uD3EC\uD558\uB294 \uAC83\uC774 \uBA3C\uC800\uC785\uB2C8\uB2E4.",foreign_landing_unpinned:"\uC678\uBD80 \uB300\uC0C1 \uC800\uC7A5\uC18C\uC758 \uD540 \uC124\uC815\uC744 \uD655\uC778\uD558\uAC70\uB098, \uC6D0 \uC138\uC158\uC5D0\uC11C \uBC30\uD3EC\xB7\uB9C8\uAC10\uC744 \uD655\uC778\uD558\uC138\uC694.",foreign_checkout_unavailable:"\uC678\uBD80 \uB300\uC0C1 \uC800\uC7A5\uC18C\uC758 \uD540 \uC124\uC815\uC744 \uD655\uC778\uD558\uAC70\uB098, \uC6D0 \uC138\uC158\uC5D0\uC11C \uBC30\uD3EC\xB7\uB9C8\uAC10\uC744 \uD655\uC778\uD558\uC138\uC694.",foreign_deploy_unsupported:"\uC678\uBD80 \uB300\uC0C1 \uC800\uC7A5\uC18C\uC758 \uD540 \uC124\uC815\uC744 \uD655\uC778\uD558\uAC70\uB098, \uC6D0 \uC138\uC158\uC5D0\uC11C \uBC30\uD3EC\xB7\uB9C8\uAC10\uC744 \uD655\uC778\uD558\uC138\uC694.",interrupted_without_terminal_exit:"\uB0A8\uC544 \uC788\uB294 \uC6D0\uC778\uACFC \uC2E4\uD589 \uAE30\uB85D\uC744 \uBA3C\uC800 \uD655\uC778\uD558\uC138\uC694.",cleanup_failed:"\uB0A8\uC544 \uC788\uB294 \uC6D0\uC778\uACFC \uC2E4\uD589 \uAE30\uB85D\uC744 \uBA3C\uC800 \uD655\uC778\uD558\uC138\uC694.",retry_exhausted:"\uB0A8\uC544 \uC788\uB294 \uC6D0\uC778\uACFC \uC2E4\uD589 \uAE30\uB85D\uC744 \uBA3C\uC800 \uD655\uC778\uD558\uC138\uC694.",conflict_unresolved:"\uB0A8\uC544 \uC788\uB294 \uC6D0\uC778\uACFC \uC2E4\uD589 \uAE30\uB85D\uC744 \uBA3C\uC800 \uD655\uC778\uD558\uC138\uC694.",internal_record_failed:"\uB0A8\uC544 \uC788\uB294 \uC6D0\uC778\uACFC \uC2E4\uD589 \uAE30\uB85D\uC744 \uBA3C\uC800 \uD655\uC778\uD558\uC138\uC694.",repair_lane_retired:"\uB0A8\uC544 \uC788\uB294 \uC6D0\uC778\uACFC \uC2E4\uD589 \uAE30\uB85D\uC744 \uBA3C\uC800 \uD655\uC778\uD558\uC138\uC694."}),tu=Object.freeze({revision_conflict:"\uC791\uC5C5 \uBAA9\uB85D\uC774 \uAC31\uC2E0\uB418\uC5C8\uC2B5\uB2C8\uB2E4. \uD604\uC7AC \uC0C1\uD0DC\uB97C \uD655\uC778\uD55C \uB4A4 \uB2E4\uC2DC \uC120\uD0DD\uD558\uC138\uC694.",stale_work_conflict:"\uC774\uC804 \uC791\uC5C5\uC758 \uD655\uC778 \uACB0\uACFC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4. \uD604\uC7AC \uD45C\uC2DC\uB41C \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694.",waiting_lane_changed:"\uB300\uAE30\uC5F4 \uBC30\uCE58\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4. \uD604\uC7AC \uC704\uCE58\uB97C \uD655\uC778\uD55C \uB4A4 \uB2E4\uC2DC \uC120\uD0DD\uD558\uC138\uC694.",discard_in_progress:"\uC774 \uC791\uC5C5\uC758 \uD3D0\uAE30\uAC00 \uC9C4\uD589 \uC911\uC785\uB2C8\uB2E4. \uB05D\uB09C \uB4A4 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694.",action_in_flight:"\uB2E4\uB978 \uC791\uC5C5 \uCC98\uB9AC\uAC00 \uC9C4\uD589 \uC911\uC785\uB2C8\uB2E4. \uB05D\uB09C \uB4A4 \uB2E4\uC2DC \uC120\uD0DD\uD558\uC138\uC694.",bead_running:"\uC774 \uC774\uC288\uC758 \uC138\uC158\uC774 \uC2E4\uD589 \uC911\uC785\uB2C8\uB2E4. \uC2E4\uD589 \uC0C1\uD0DC\uB97C \uBA3C\uC800 \uD655\uC778\uD558\uC138\uC694.",external_pr_owner:"\uB2E4\uB978 \uC138\uC158\uC774 \uAD00\uB9AC\uD558\uB294 PR\uC774 \uC788\uC2B5\uB2C8\uB2E4. \uD574\uB2F9 PR\uACFC \uC138\uC158 \uC0C1\uD0DC\uB97C \uBA3C\uC800 \uD655\uC778\uD558\uC138\uC694.",remote_branch_owner:"\uC6D0\uACA9 \uBE0C\uB79C\uCE58\uAC00 \uB0A8\uC544 \uC788\uC5B4 \uC790\uB3D9\uC73C\uB85C \uCC98\uB9AC\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4. \uBE0C\uB79C\uCE58\uC640 PR \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694.",base_identity_changed:"\uAE30\uC900 \uBE0C\uB79C\uCE58\uC758 \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4. \uD604\uC7AC \uAE30\uC900 \uBE0C\uB79C\uCE58\uB97C \uD655\uC778\uD558\uC138\uC694.",worktree_identity_changed:"\uC791\uC5C5 \uB514\uB809\uD130\uB9AC\uC758 \uC2DD\uBCC4 \uC815\uBCF4\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4. \uD574\uB2F9 \uC791\uC5C5 \uB514\uB809\uD130\uB9AC\uB97C \uD655\uC778\uD558\uC138\uC694.",remote_ref_observe_failed:"\uC6D0\uACA9 PR\xB7\uBE0C\uB79C\uCE58 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4. \uC5F0\uACB0\uACFC \uC811\uADFC \uAD8C\uD55C\uC744 \uD655\uC778\uD55C \uB4A4 \uB2E4\uC2DC \uC120\uD0DD\uD558\uC138\uC694."});var X_={verify_failed:"\uAC80\uC99D \uC2E4\uD328",verify_cmd_failed:"\uAC80\uC99D \uC2E4\uD328",verify_script_failure:"\uAC80\uC99D \uC2E4\uD328",deploy_failed:"\uBC30\uD3EC \uC2E4\uD328",deploy_script_failure:"\uBC30\uD3EC \uC2E4\uD328",job_script_failure:"\uC7A1 \uC2E4\uD328",interrupted_without_terminal_exit:"\uC911\uB2E8\uB428",quickfix_landing_failed:"\uCC29\uC9C0 \uC2E4\uD328",runner_exit:"\uC138\uC158 \uC2E4\uD328",session_parked:"\uC138\uC158 \uB300\uAE30",session_ended_unresolved:"\uC138\uC158 \uC885\uB8CC",prerequisite_unmet:"\uC120\uD589 \uB300\uAE30",delivery_unproven:"\uCC29\uC9C0 \uC99D\uAC70 \uBD80\uC871"},Q_={overloaded_529:"Claude API \uACFC\uBD80\uD558(529)\uB85C \uBCF4\uB958",rate_limited_429:"Claude API \uC694\uCCAD \uD55C\uB3C4(429)\uB85C \uBCF4\uB958"},Z_={"session_hard_stop:failure":"\uC138\uC158\uC774 \uC2E4\uD328\uB97C \uBCF4\uACE0\uD558\uACE0 \uC885\uB8CC","session_hard_stop:environment":"\uC138\uC158\uC774 \uD658\uACBD \uC624\uB958\uB97C \uBCF4\uACE0\uD558\uACE0 \uC885\uB8CC","resume_failed:transcript_missing":"\uC774\uC5B4\uD558\uAE30 \uB300\uC0C1 \uC138\uC158 \uAE30\uB85D\uC774 \uC5C6\uC74C \u2014 \uC0C8 \uC138\uC158\uC73C\uB85C \uB300\uCCB4"};function zw(e){return typeof e!="number"||!Number.isFinite(e)?"":new Date(e).toLocaleTimeString("ko-KR",{hour:"2-digit",minute:"2-digit"})}function Kw(e,t){if(typeof e!="string"||!e.startsWith("provider_outage:"))return null;let n=e.slice(16);if(n==="usage_limit"){let s=t&&typeof t=="object"?t.resets_at:null,i=zw(s);return i?`\uACC4\uC815 \uC0AC\uC6A9 \uD55C\uB3C4\uB85C \uBCF4\uB958 \u2014 \uB9AC\uC14B ${i}`:"\uACC4\uC815 \uC0AC\uC6A9 \uD55C\uB3C4\uB85C \uBCF4\uB958"}if(Object.hasOwn(Q_,n))return Q_[n];let r=/^http_(5\d\d)$/.exec(n);return r?`Claude API \uC624\uB958(${r[1]})\uB85C \uBCF4\uB958`:null}function Zo(e){return typeof e!="string"||e.length===0?[]:e.split(":").filter(t=>t.length>0)}function Ya(e){for(let t of Zo(e)){if(Object.hasOwn(X_,t))return X_[t];if(t.startsWith("session_"))return"\uC138\uC158 \uC2E4\uD328"}return null}function em(e){return Zo(e).length===0?null:Ya(e)||"\uC2E4\uD328"}function cs(e){let t=null;for(let n of Zo(e))Object.hasOwn(Jc,n)&&(t=Jc[n]);return t}function tm(e){let t=null;for(let n of Zo(e))Object.hasOwn(eu,n)&&(t=eu[n]);return t}function Nr(e,t){if(typeof e=="string"&&Object.hasOwn(Z_,e))return Z_[e];let n=Kw(e,t);if(n!==null)return n;let r=Ya(e),s=cs(e);return r&&s?`${r} \u2014 ${s}`:r||s?r||s:typeof e=="string"?e:""}function nm(e,t){let n=Ya(e)??Ya(t),r=cs(t)??cs(e);return n&&r?`${n} \u2014 ${r}`:n||r?n||r:typeof t=="string"?t:""}var Gw=new Set(["repo_operation_timeout_unresolved"]);function Vw(e){for(let t of Zo(e))if(Gw.has(t)||t.startsWith("repo_ops_"))return!0;return!1}function Yw(e,t){return t.code==="interrupted"||t.interrupted===!0||e.failure_kind==="interrupted_without_terminal_exit"||t.code==="interrupted_without_terminal_exit"}function rm(e,t){if(!e||typeof e!="object")return"";let n=e.failure;if(!n||typeof n!="object"||Vw(n.code))return"";if(n.code==="timeout"){let s=Number(t);return Number.isFinite(s)&&s>0?`\uD0C0\uC784\uC544\uC6C3 ${Math.round(s/1e3)}\uCD08 \uCD08\uACFC`:"\uD0C0\uC784\uC544\uC6C3 \uCD08\uACFC"}if(Yw(e,n))return"\uC885\uB8CC \uAE30\uB85D \uC5C6\uC74C \u2014 \uC911\uB2E8\uB428";let r=typeof e.elapsed_ms=="number"&&Number.isFinite(e.elapsed_ms)&&e.elapsed_ms>=0?` \xB7 ${Jr(e.elapsed_ms)}`:"";return typeof e.signal=="string"&&e.signal.length>0?`signal ${e.signal}${r}`:Number.isInteger(e.exit_code)?`exit ${e.exit_code}${r}`:""}var J_={schema_unsupported:"\uD540\uB41C \uC815\uCC45 \uC2A4\uD0A4\uB9C8\uB97C \uC9C0\uC6D0\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4."};function sm(e){if(!e||typeof e!="object")return"";let t=e.retry;if(!t||typeof t!="object")return"";if(typeof t.blocked_reason=="string"&&t.blocked_reason)return`\uC790\uB3D9 \uC7AC\uC2DC\uB3C4 \uBABB \uD568 \u2014 ${Object.hasOwn(J_,t.blocked_reason)?J_[t.blocked_reason]:t.blocked_reason}`;if(t.status==="absorbed"){let n=t.absorbed&&typeof t.absorbed=="object"?t.absorbed:null,r=Nr(n?.first_failure?.code);return r?`\uC790\uB3D9 \uC7AC\uC2DC\uB3C4\uB85C \uD574\uC18C\uB428 \u2014 \uCCAB \uC2E4\uD328: ${r}`:"\uC790\uB3D9 \uC7AC\uC2DC\uB3C4\uB85C \uD574\uC18C\uB428"}if(e.state!=="failed")return"";if(t.status==="not_applicable")return"\uC7AC\uC2DC\uB3C4 \uB300\uC0C1 \uC544\uB2D8 \u2014 \uC2A4\uD06C\uB9BD\uD2B8 \uC2E4\uD589 \uC804 \uC2E4\uD328";if(t.status==="consumed"){let n=typeof t.first_fingerprint=="string"&&t.first_fingerprint?t.first_fingerprint:null;if(n===null)return"";if(n===e.failure?.fingerprint)return"\uC790\uB3D9 \uC7AC\uC2DC\uB3C4 1\uD68C \u2014 \uAC19\uC740 \uC2E4\uD328";let r=Nr(t.first_failure?.code);return r?`\uC790\uB3D9 \uC7AC\uC2DC\uB3C4 1\uD68C \u2014 \uB2E4\uB978 \uC2E4\uD328: ${r}`:"\uC790\uB3D9 \uC7AC\uC2DC\uB3C4 1\uD68C \u2014 \uB2E4\uB978 \uC2E4\uD328"}return""}function Xw(e){if(!Number.isFinite(e)||e<0)return"0s";let t=Math.floor(e/1e3),n=Math.floor(t/60),r=t%60;return n>0?`${n}m ${String(r).padStart(2,"0")}s`:`${r}s`}var om=200;function Qw(e){return typeof e!="string"||e.length===0?"":e.length>om?`${e.slice(0,om)}\u2026`:e}function Zw(e){let t=e&&e.attempts>0&&e.max>0?` ${e.attempts}/${e.max}`:"",n=e&&typeof e.next_at=="number"?` \xB7 ${new Date(e.next_at).toLocaleTimeString("ko-KR",{hour:"2-digit",minute:"2-digit"})}`:"";return`\u21BB \uC7AC\uC2DC\uB3C4 \uB300\uAE30${t}${n}`}function nu(e){return typeof e!="number"||!Number.isFinite(e)?"":new Date(e).toLocaleTimeString("ko-KR",{hour:"2-digit",minute:"2-digit"})}function Jw(e){if(!e)return"";let t=e.auto_resume==="disarmed"?" \xB7 \uC218\uB3D9 \uC870\uCE58":"";if(e.kind==="usage_limit"){let r=nu(e.resets_at);if(!r)return`\u23F3 \uD55C\uB3C4 \uB300\uAE30 \xB7 \uB9AC\uC14B \uBBF8\uC0C1${t}`;let s=e.target?.account_alias||e.target?.account||"";return`\u23F3 \uD55C\uB3C4 \uB300\uAE30 ${r}${s?` \xB7 ${s}`:""}${t}`}let n=nu(e.next_probe_at);return`\u26A0\uFE0F \uACF5\uAE09\uC790 \uC7A5\uC560${n?` \xB7 \uB2E4\uC74C \uD504\uB85C\uBE0C ${n}`:""}${t}`}function am(e){if(!e)return"";let t=Array.isArray(e.timeline)?e.timeline:[],n=typeof e.log_path=="string"?e.log_path:"",r=e.log_expired===!0,s=e.log_unreadable===!0;return t.length===0&&n.length===0&&!r&&!s?"":c`${t.length>0?c`<ol class="rtile__history" data-seam="tile-timeline">
        ${t.map(i=>c`<li class="rtile__history-row">
              ${im(i.at)?c`<span class="rtile__history-at"
                    >${im(i.at)}</span
                  >`:""}<span class="rtile__history-summary">${i.summary}</span>
            </li>`)}
      </ol>`:""}${s?c`<p
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
            ${Qr(n)}
          </p>`:""}`}function im(e){return typeof e!="number"||!Number.isFinite(e)?"":new Date(e).toLocaleTimeString("ko-KR",{hour:"2-digit",minute:"2-digit"})}var lm=Object.freeze({settlement:"\uC815\uB9AC \uC7AC\uC2DC\uB3C4",session:"\uC774\uC5B4\uD558\uAE30"});function e$(e){let t=tm(e.cause);if(!t)return"";let n=Is(e.quickfix_landing);if(e.resume_eligible!==!1)return`${t} ${n==="settlement"?"\uC544\uB798 [\uC815\uB9AC \uC7AC\uC2DC\uB3C4]\uB97C \uB20C\uB7EC \uC2E4\uD328\uD55C \uCC29\uC9C0 \uD6C4 \uC808\uCC28\uB97C \uB2E4\uC2DC \uC2E4\uD589\uD558\uC138\uC694.":"\uC6D0\uC778\uC744 \uD655\uC778\uD55C \uB4A4 \uC544\uB798 [\uC774\uC5B4\uD558\uAE30]\uB85C \uAC19\uC740 \uC138\uC158\uC5D0\uC11C \uC791\uC5C5\uC744 \uACC4\uC18D\uD558\uC138\uC694."}`;let r=typeof e.resume_reason=="string"&&e.resume_reason.length>0?e.resume_reason:"";return e.attempt_id?[t,r,"\uC138\uC158 \uAE30\uB85D\uC744 \uC5F4\uC5B4 \uC6D0\uC778\uC744 \uD655\uC778\uD558\uC138\uC694."].filter(s=>s.length>0).join(" "):[t,r].filter(s=>s.length>0).join(" ")}function t$(e,t){if(!e||e.open!==!0)return"";let n=cs(e.cause)||Nr(e.cause,e.cause_detail),s=e.continuation_choice==="prior_attempt"&&typeof e.cause=="string"&&(e.cause.startsWith("resume_failed")||e.cause.startsWith("session_failed"))?e.cause==="resume_failed:transcript_missing"?"\uC774\uC5B4\uAC08 \uC138\uC158 \uAE30\uB85D\uC774 \uC5C6\uC2B5\uB2C8\uB2E4. \uC0C8 \uC138\uC158\uC744 \uC790\uB3D9\uC73C\uB85C \uC2DC\uC791\uD558\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4.":`${n} \uC0C8 \uC138\uC158\uC744 \uC790\uB3D9\uC73C\uB85C \uC2DC\uC791\uD558\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4.`:n,i=e.retry&&e.retry.attempts>0?`\uC790\uB3D9 \uC7AC\uC2DC\uB3C4 ${e.retry.attempts}\uD68C \u2014 \uAC19\uC740 \uC624\uB958`:"",o=e.cause_detail,a=e.quickfix_lane&&e.quickfix_landing?e.quickfix_landing:null,l=a?[a.cursor||null,typeof a.head_sha=="string"?a.head_sha.slice(0,7):null,a.reason||null].filter(Boolean).join(" \xB7 "):"",u=typeof e.finished_at=="number"?`${new Date(e.finished_at).toLocaleString("ko-KR")} \xB7 ${wn(e.finished_at,t)}`:"",d=[e.runner,e.model,e.observed_effort??e.effort,e.speed].filter(k=>typeof k=="string"&&k.length>0).join(" \xB7 "),_=e.usage?.total_cost_usd,m=typeof _=="number"&&Number.isFinite(_)?`$${_.toFixed(2)}`:"",h=am(e),g=e$(e),T=lm[Is(e.quickfix_landing)];return c`<div
    class="rtile__failure-pop"
    role="dialog"
    aria-label="실패 상세"
  >
    <dl class="rtile__failure-kv">
      ${e.summary?c`<div>
            <dt>보고</dt>
            <dd>${e.summary}</dd>
          </div>`:""}
      ${h?c`<div>
            <dt>이력</dt>
            <dd>${h}</dd>
          </div>`:""}
      ${s?c`<div>
            <dt>원인</dt>
            <dd>${s}</dd>
          </div>`:""}
      ${g?c`<div>
            <dt>다음</dt>
            <dd>${g}</dd>
          </div>`:""}
      ${i?c`<div>
            <dt>재시도 이력</dt>
            <dd>${i}</dd>
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
      ${l?c`<div>
            <dt>착지 단계</dt>
            <dd>${l}</dd>
          </div>`:""}
      ${u?c`<div>
            <dt>실패 시각</dt>
            <dd>${u}</dd>
          </div>`:""}
      ${d?c`<div>
            <dt>실행</dt>
            <dd>${d}</dd>
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
      ${m?c`<div>
            <dt>비용</dt>
            <dd>${m}</dd>
          </div>`:""}
      <div>
        <dt>재개</dt>
        <dd>
          ${e.resume_eligible?`${T} \uAC00\uB2A5`:e.resume_reason||`${T} \uBD88\uAC00`}
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
          이미 base에 착지됨 — ${T}로 배포·정리를 재개
        </p>`:""}
  </div>`}function n$(e){return e==="pending"?"\uD68C\uBCF5 \uD6C4 \uC790\uB3D9 \uC7AC\uAC1C \uB300\uAE30":e==="disarmed"?"\uC790\uB3D9 \uC7AC\uAC1C \uC18C\uC9C4 \xB7 \uC218\uB3D9 \uC870\uCE58 \uD544\uC694":typeof e=="string"&&e.startsWith("refused:")?`\uC790\uB3D9 \uC7AC\uAC1C \uAC70\uBD80 \xB7 ${e.slice(8)}`:""}function r$(e){return e==="none"?"\uACC4\uC815 \uC804\uD658 \uC548 \uD568 \xB7 \uC870\uAC74\uC744 \uB9CC\uC871\uD558\uB294 \uB2E4\uB978 \uACC4\uC815 \uC5C6\uC74C":e==="disabled"?"\uACC4\uC815 \uC804\uD658 \uC548 \uD568 \xB7 \uC790\uB3D9 \uC804\uD658 \uAEBC\uC9D0":""}function s$(e){if(!e||e.open!==!0)return"";let t=[e.target?.model,e.target?.account_alias||e.target?.account].filter(i=>typeof i=="string"&&i.length>0).join(" \xB7 "),n=nu(e.resets_at),r=n$(e.auto_resume),s=r$(e.auto_switch);return c`<div
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
      ${s?c`<div>
            <dt>계정 전환</dt>
            <dd>${s}</dd>
          </div>`:""}
      ${e.log_path?c`<div>
            <dt>로그</dt>
            <dd>${Qr(e.log_path)}</dd>
          </div>`:""}
    </dl>
  </div>`}function o$(e){return!e||!e.repo&&!e.serial_lane_id?"":c`${e.repo?c`<span
        class="worker-card__repo rtile__repo"
        title=${e.root_dir||""}
        >${e.repo}</span
      >`:""}${e.serial_lane_id?c`<span class="rtile__lane">${e.serial_lane_id}</span>`:""}`}var i$=new Set(["codex-runner"]);function a$(e,t,n,r=null){if(!e)return"";let s=e.last_activity||null,i=s&&typeof s.text=="string"?s.text:"",o=s&&typeof s.at=="number"?s.at:null,a=(r||!Array.isArray(e.legs)?[]:e.legs).filter(h=>h&&!(typeof h.agent_type=="string"&&i$.has(h.agent_type))),l=a.filter(h=>h&&h.state==="live"),u=a.filter(h=>h&&h.state!=="live"),d=r&&typeof r.last_event_at=="number"?wn(r.last_event_at,t):"",_=r?wn(r.updated_at,t):"",m=d?`\uCD5C\uADFC \uD65C\uB3D9 ${d}`:_?`\uAC31\uC2E0 ${_}`:"";return c`${i?c`<div class="rtile__activity${n?" is-paused":""}">
        <span class="rtile__activity-dot" aria-hidden="true"></span>
        <span class="rtile__activity-text">${i}</span>
        ${o!==null?c`<span class="rtile__activity-age"
              >${wn(o,t)}</span
            >`:""}
      </div>`:m?c`<div class="rtile__activity rtile__activity--session">
          <span class="rtile__activity-dot" aria-hidden="true"></span>
          <span class="rtile__activity-text">${m}</span>
        </div>`:""}${l.length>0||u.length>0?c`<div class="rtile__legs">
        ${l.map(h=>c`<span
              class="rtile__leg rtile__leg--live"
              title="이 세션이 띄운 서브에이전트/Codex 세션이 실행 중입니다"
              >위임 중 · ${h.label}</span
            >`)}${u.length>0?c`<span
              class="rtile__leg rtile__leg--done"
              title=${`\uC644\uB8CC\uB41C \uC704\uC784: ${u.map(h=>h.label).join(", ")}`}
              >위임 완료 ${u.length}</span
            >`:""}
      </div>`:""}`}var l$={remote:"\uB2E4\uB978 \uBA38\uC2E0 \uC138\uC158 \u2014 \uC774 \uC11C\uBC84\uC5D0 transcript \uC5C6\uC74C",missing:"transcript \uD30C\uC77C \uC5C6\uC74C"};function c$(e){if(!e)return"";let t=l$[e.locality]||"";return c`<button
    type="button"
    class="rtile__session"
    ?disabled=${t.length>0}
    title=${t||"\uB77C\uC774\uBE0C \uC138\uC158 \uC5F4\uAE30"}
    aria-label="라이브 세션 열기"
  >
    ▤ 세션
  </button>`}function u$(e,t,n,r="",s="",i=!1){if(e==="provider_hold")return c`<div class="rtile__foot">
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
    </div>`;if(e==="retry_wait")return n?c`<div class="rtile__foot">${n}</div>`:"";let o=Qw(t?.summary);if(e==="waiting")return c`${o?c`<p class="rtile__held-summary">${o}</p>`:""}${r}
      <div class="rtile__foot">${n}</div>`;let a=am(t);return c`${o?c`<p class="rtile__held-summary">${o}</p>`:""}${a}
    <div class="rtile__foot">
      ${i?c`${n}${s}`:c`${s}${n}`}
    </div>`}function ru(e,t,n=null,r={}){let s=e.kind==="session",i=s&&Array.isArray(e.session_refs)&&e.session_refs.find(Be=>Be&&Be.current===!0)||null,o=e.failed===!0,a=o&&e.failure||null,l=e.parked===!0&&!o,u=e.retry_wait===!0&&!o&&!l,d=e.waiting===!0&&!o&&!l&&!u,_=e.provider_hold===!0&&!o&&!l&&!u&&!d,m=l&&e.failure||null,h=d&&e.wait||null,g=_&&e.hold||null,T=l||u||d||_,k=!!e.paused,ee=o||T?e.status_label||(l?"\uC138\uC158 \uB300\uAE30":u?"\uC7AC\uC2DC\uB3C4 \uB300\uAE30":d?"\uC120\uD589 \uB300\uAE30":_?"\uACF5\uAE09\uC790 \uBCF4\uB958":e.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328"):k?"\uC77C\uC2DC\uC815\uC9C0":typeof e.started_at=="number"?Xw(t-e.started_at):"\u2014",ne=e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker)?e.exec_chips:null,z=go(e),N=mn(e.usage),D=dr(e.usage),M=e.conflict_resolution?k?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":"\uCDA9\uB3CC \uD574\uC18C":null,q=e.base_exception||null,G=e.landing,P=e.attempt_id&&e.attempt_id===n,$=r.monitor||null,O=o$($),C=Zi($?.cross_lane_chip),oe=$?Qi($.dependency_chips):"",ue=a$($,t,k,s?{updated_at:e.updated_at??null,last_event_at:i&&i.locality==="local"?i.last_event_at:null}:null),me=s&&e.workflow?.chips?.exec_receipt||null,V=ts(e.workflow),ie=ea(e.rec,e.chip_popover?.chip_key==="rec"),de=e.chip_popover?Ds(e.chip_popover.content):"",Oe=me?c`<span
        class="ctl-chip ctl-chip--exec-receipt"
        title=${`exec_receipt ${ur(me)}`}
        >${`${me.kind}:${wi(me)}`}</span
      >`:"",qe=i?c`<span
        class="ctl-chip ctl-chip--sref"
        title=${`${i.provider}:${i.session_id}@${i.host}${(e.session_refs||[]).length>=2?` \xB7 \uC774\uB825 ${(e.session_refs||[]).length}`:""}`}
        >${Io(i)}</span
      >`:"",Ie=O||C||V||qe||Oe||ie?c`<div class="rtile__meta">
          ${O}${C}${V}${qe}${Oe}${ie}${de}
        </div>`:"",ge=a?c`<button
          type="button"
          class="rtile__failure-badge"
          data-attempt-id=${a.attempt_id}
          aria-expanded=${a.open===!0?"true":"false"}
          aria-label="실패 상세"
        >
          ⛔ ${em(a.cause)||"\uC2E4\uD328"}
        </button>
        ${a.halted_auto_advance?c`<span class="rtile__auto-halted">자동 진행 꺼짐</span>`:""}`:"",F=l?c`<span
        class="rtile__held-badge"
        title="세션이 사용자 결정을 기다리며 정상 종료했습니다 — 큐는 계속 갑니다"
        >⏸ 세션 대기</span
      >`:u?c`<span
          class="rtile__held-badge"
          title="환경성 실패의 자동 재시도를 기다립니다 — 사람이 할 일은 없습니다"
          >${Zw(e.retry)}</span
        >`:d?e.wait?.returning?c`<span
              class="rtile__held-badge"
              title="막고 있던 선행이 남지 않았습니다 — 다음 pass에서 후보로 돌아갑니다 (슬롯·레인 순서 대기)"
              >⛓ 복귀 대기</span
            >`:c`<span
              class="rtile__held-badge"
              title="세션이 선행 미충족으로 착수를 거부했습니다 — 선행이 닫히면 저절로 다시 돕니다"
              >⛓ 선행 대기</span
            >`:_&&g?c`<button
              type="button"
              class="rtile__held-badge rtile__provider-hold-badge"
              data-attempt-id=${e.attempt_id}
              aria-expanded=${g.open===!0?"true":"false"}
              aria-label="공급자 보류 상세"
            >
              ${Jw(g)}
            </button>`:"",ce=c`${M?c`<span class="worker-mini__badge">${M}</span>`:""}${q?c`<span
        class="worker-mini__badge"
        title="이 세션의 target base가 워크스페이스 선언 base와 다릅니다"
        >${q}</span
      >`:""}${ge}${F}`,pe=s?"":Ns(e),B=Is(a?.quickfix_landing),U=lm[B],Re=B==="settlement"?"\uCC29\uC9C0 \uD6C4 \uC815\uB9AC \uC808\uCC28\uB97C \uB2E4\uC2DC \uC2E4\uD589 (\uC138\uC158\uC744 \uC5F4\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4)":"\uAC19\uC740 \uC138\uC158\uC73C\uB85C \uC774\uC5B4\uC11C \uC9C4\uD589",W=e.resolve_action?c`<button
        type="button"
        class="rtile__resolve"
        ?disabled=${e.resolve_enabled===!1}
        title=${e.resolve_title||"\uC774 \uC2E4\uD328\uB97C \uC0AC\uB78C\uC774 \uC774\uC5B4\uBC1B\uB294 \uB300\uD654\uD615 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4"}
        aria-label="세션에서 해결"
      >
        세션에서 해결
      </button>`:"",te=e.discard?.action&&!(o&&a?.landed===!0)?c`<button
          type="button"
          class="rtile__discard"
          data-operation-id=${e.discard.operation?.operation_id||""}
          data-confirmation=${a?.confirmation||"unmerged"}
          ?disabled=${!e.discard.enabled}
          title=${e.discard.title}
          aria-label=${e.discard.label}
        >
          ${e.discard.label}
        </button>`:"",J=te&&e.discard?.abandon?.action===!0?c`<button
          type="button"
          class="rtile__discard-abandon"
          data-operation-id=${e.discard.operation?.operation_id||""}
          data-operation-kind=${e.discard.operation?.kind||""}
          data-last-error=${e.discard.error||""}
          title=${e.discard.abandon.title}
          aria-label=${e.discard.abandon.label}
        >
          ${e.discard.abandon.label}
        </button>`:"",Y=J?c`${te}${J}`:te,ke=e.instructions_restart||null,fe=ke?.eligible===!0,Le=ke?c`<button
        type="button"
        class="op-btn rtile__restart-instructions"
        ?disabled=${!fe}
        title=${fe?"\uC2E4\uD589\uC744 \uC911\uB2E8\uD55C \uB4A4 \uC9C0\uC2DC\uB97C \uB2F4\uC544 \uAC19\uC740 \uC138\uC158 \uAE30\uB85D\uC73C\uB85C \uC7AC\uC2DC\uC791":ke.reason||"\uC9C0\uC2DC\uC640 \uD568\uAED8 \uC7AC\uC2DC\uC791 \uBD88\uAC00"}
        aria-label="지시와 함께 재시작"
      >
        지시와 함께 재시작
      </button>`:"",Ne=ke?c`<button
        type="button"
        class="op-btn rtile__resume-instructions"
        ?disabled=${!fe}
        title=${fe?"\uC9C0\uC2DC\uB97C \uB2F4\uC544 \uAC19\uC740 \uC138\uC158 \uAE30\uB85D\uACFC \uC2E4\uD589 \uC124\uC815\uC73C\uB85C \uC774\uC5B4\uD558\uAE30":ke.reason||"\uC9C0\uC2DC\uC640 \uD568\uAED8 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00"}
        aria-label="지시와 함께 이어하기"
      >
        지시와 함께 이어하기
      </button>`:"",Je=Ji(e.workflow,!1);return c`<div
    class="rtile${P?" rtile--sel":""}${k?" rtile--paused":""}${o?" rtile--failed rtile--compact":""}${T?" rtile--held rtile--compact":""}${l?" rtile--parked":""}${u?" rtile--retry-wait":""}${d?" rtile--waiting":""}${s?" rtile--session":""}${_?" rtile--provider-hold":""}${e.search_match===!1?" is-dimmed":""}"
    data-bead-id=${e.bead_id}
    data-attempt-id=${e.attempt_id||""}
    data-route=${cn(Je.route)}
  >
    <div class="rtile__hd">
      <span
        class="rtile__dot${s?" rtile__dot--session":""}"
        aria-hidden="true"
      ></span>
      <span class="rtile__id" title="클릭하면 ID 복사">${e.bead_id}</span>
      ${ta(e.priority)}${z?c`<span class="rtile__resumed" title=${z}>↻</span>`:""}${ce}
      <div class="rtile__hd-actions">
        ${s?c`${typeof e.started_at=="number"?c`<span class="rtile__elapsed">${ee}</span>`:""}${c$(i)}<span
                class="rtile__session-badge"
                title="Worker가 아닌 세션이 in_progress로 잡은 이슈"
                >세션</span
              >`:c`<span class="rtile__elapsed">${ee}</span>`}
        ${s||T?"":o?c`<button
                  type="button"
                  class="op-btn rtile__resume"
                  data-resume-kind=${B}
                  ?disabled=${a?.resume_eligible===!1}
                  title=${a?.resume_eligible===!1?a.resume_reason||`${U} \uBD88\uAC00`:Re}
                  aria-label=${U}
                >
                  ↻ ${U}
                </button>
                ${Y}`:c`<button
                  type="button"
                  class="rtile__session"
                  title="라이브 세션 열기"
                  aria-label="라이브 세션 열기"
                >
                  ▤ 세션
                </button>
                ${k?c`${Ne}<button
                        type="button"
                        class="op-btn rtile__resume"
                        title="같은 세션으로 이어서 재개 (현재 실행 설정을 적용할 수 있음)"
                        aria-label="재개"
                      >
                        ▶ 재개
                      </button>`:c`${Le}<button
                        type="button"
                        class="rtile__pause"
                        ?disabled=${e.can_pause===!1}
                        title=${e.can_pause===!1?"\uC138\uC158 ID \uAE30\uB85D \uC804 \u2014 \uC77C\uC2DC\uC815\uC9C0 \uBD88\uAC00":"\uC77C\uC2DC\uC815\uC9C0 (\uAC19\uC740 \uC138\uC158\uC73C\uB85C \uC7AC\uAC1C \uAC00\uB2A5)"}
                        aria-label="일시정지"
                      >
                        ⏸
                      </button>`}
                ${Y}`}${l?"":W}
      </div>
    </div>
    <div class="rtile__title">${e.title}</div>
    ${T?u$(l?"parked":u?"retry_wait":d?"waiting":"provider_hold",l?m:d?h:g,Y,d?oe:"",l?W:"",l&&!!e.discard?.error):o?"":c`${ue}${e.rollup?vi(e.rollup,{parent_id:e.bead_id,expanded:e.rollup_expanded===!0,childChips:kl}):""}
            ${G?c`<div class="rtile__landing">
                  <span
                    class="merge-step${G.failed?" merge-step--failed":""}"
                    style=${`--progress: ${G.percent}%`}
                    >${G.label}${G.index>0?c`<span class="merge-step__n"
                          >${G.index}/${G.total}</span
                        >`:""}</span
                  >
                </div>`:""}
            ${oe}
            ${s?Ie:O||C||V||ne||ie||N.length>0||D?c`<div class="rtile__meta">
                    ${O}${C}${V}${es(e.exec_chips)}${ie}
                    ${N.length>0?N.map(Be=>c`<span
                              class="worker-usage"
                              title=${Be.tooltip}
                              >${Be.label}</span
                            >`):D?c`<span
                            class="worker-usage"
                            title=${lo(e.usage)}
                            >${D}</span
                          >`:""}${de}
                  </div>`:""}
            ${Ki(e)} ${pe}
            <!-- 살아있음만 말하는 비의미적 액센트 (UI-58y2 데스크톱 §실행 타일).
         quick_fix landing의 실제 진행은 위의 별도 진행 줄이 소유한다.
         일시정지된 타일은 살아있지 않으므로 액센트도 없다. -->
            ${o||k?"":c`<div class="rtile__accent" aria-hidden="true"></div>`}`}
    ${t$(a,t)}${s$(g)}
  </div>`}function d$(e){let t=e.last_activity&&typeof e.last_activity=="object"?e.last_activity:null,n=Array.isArray(e.legs)?e.legs:[],r=e.dependency_chips||null;return!t&&n.length===0&&!r&&e.kind!=="session"?null:{...t?{last_activity:t}:{},...n.length>0?{legs:n}:{},...r?{dependency_chips:r}:{}}}function cm(e,t=Date.now(),n=null){let r=Array.isArray(e)?e:[];return c`<div class="worker-rungrid" id="worker-rungrid">
    ${r.length===0?c`<div class="worker-rungrid__empty">실행 세션 없음</div>`:r.map(s=>ru(s,t,n,{monitor:d$(s)}))}
  </div>`}function Ys(e,t,n=!1){let r=!!t.discard?.error;return!e||!r&&t.parked!==!0?{}:{resolve_action:!0,resolve_enabled:!n,resolve_title:n?"\uC138\uC158 \uAE30\uB3D9 \uC694\uCCAD \uC911 \u2014 \uC11C\uBC84 \uC751\uB2F5\uC744 \uAE30\uB2E4\uB9BD\uB2C8\uB2E4":r?"\uC2E4\uD328\uD55C \uD3D0\uAE30\uB97C \uC0AC\uB78C\uC774 \uC774\uC5B4\uBC1B\uB294 \uB300\uD654\uD615 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4 \u2014 \uAE30\uB85D\uB41C \uC138\uC158\uC774 \uC788\uC73C\uBA74 fork\uD558\uACE0, \uC5C6\uC73C\uBA74 \uC0C8 \uC138\uC158\uC5D0 \uC0AC\uC720\uB97C \uC2E3\uC2B5\uB2C8\uB2E4":"\uD30C\uD0B9\uC744 \uC0AC\uB78C\uC774 \uC774\uC5B4\uBC1B\uB294 \uB300\uD654\uD615 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4 \u2014 \uC0B4\uC544 \uC788\uB294 \uBB38\uC758 \uC138\uC158\uC774 \uC788\uC73C\uBA74 \uADF8 \uCC3D\uC744 \uAC00\uB9AC\uD0B5\uB2C8\uB2E4"}}var pn="",p$=["impl_runtime","impl_model","impl_effort"],um=["claude","codex"],f$=["claude_account","codex_account"],_$=5,Xa=1;function jn(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function Qa(e,t){let n=t.transport,r=typeof t.root_dir=="string"&&t.root_dir.length>0?t.root_dir:null,s=t.notify||(E=>be(E,"error",4e3)),i={},o={},a={},l={},u=[],d=!1,_={state:"absent",values:{},warnings:[]},m={},h={},g=Promise.resolve(),T=Promise.resolve(),k={claude:null,codex:null},ee=!1,ne=null,z={},N="",D="general",M="",q=!1,G=!1,P=!1,$=null,O=!1;function C(){let E=t.queue?t.queue():null;return jn(E)?E:null}function oe(){let E=C();return E?E.runner_catalog:null}function ue(){let E=C();return E&&jn(E.execution_defaults)?E.execution_defaults:null}function me(){let E=C();return!!(E&&Object.hasOwn(E,"quick_fix_orchestration_model"))}function V(){let E=t.implPresetStore?.get();return jn(E)&&Array.isArray(E.presets)?E:null}function ie(){return r===null?{}:{root_dir:r}}async function de(E,K){return O||!n?null:await n(E,K)}function Oe(E){E&&jn(E.queue)&&t.onQueueAdopt?.(E.queue)}async function qe(E,K){let X=C();if(!X||O)return null;let Ee=await de(E,{...K,...ie(),expected_revision:X.revision});if(Oe(Ee),r!==null&&Ee&&Ee.conflict){let ye=Ee.queue&&typeof Ee.queue.revision=="number"?Ee.queue.revision:C()?.revision??X.revision;Ee=await de(E,{...K,...ie(),expected_revision:ye}),Oe(Ee)}return Ee}async function Ie(){d=!0,ze();try{let E=await de("get-session-defaults",{...ie()});i=Ii(E?.values),o={...i},a={},l={},u=Array.isArray(E?.warnings)?E.warnings:[]}catch(E){u=["kv_read_failed"],s(`\uC138\uC158 \uAE30\uBCF8\uAC12\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4: ${E instanceof Error?E.message:String(E)}`)}finally{d=!1,ze()}}function ge(E,K){let X={...K};for(let Ee of co){let ye=o[Ee];ye!==E[Ee]&&(typeof ye=="string"?X[Ee]=ye:delete X[Ee])}return X}function F(){T=T.then(()=>ce())}async function ce(){let E=ep(i,o);if(Object.keys(E).length===0)return;let K={...o};try{let X=await de("set-session-defaults",{values:E,...ie()});i=Ii(X?.values),o=ge(K,i),u=Array.isArray(X?.warnings)?X.warnings:[]}catch(X){s(`\uC138\uC158 \uAE30\uBCF8\uAC12 \uC800\uC7A5 \uC2E4\uD328: ${X instanceof Error?X.message:String(X)}`)}ze()}function pe(E,K){if(!jn(E))return;let X=E.state;_={state:X==="usable"||X==="unusable"||X==="absent"?X:"absent",values:jn(E.values)?{...E.values}:{},warnings:Array.isArray(E.warnings)?E.warnings:[]},h={..._.values},K&&(m={...h})}async function B(){try{pe(await de("get-workspace-accounts",{...ie()}),!0)}catch(E){_={state:"unusable",values:{},warnings:["kv_read_failed"]},h={},m={},s(`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4: ${E instanceof Error?E.message:String(E)}`)}ze()}async function U(E){try{let K=await fetch(E);if(!K.ok)return null;let X=await K.json();if(!jn(X)||!Array.isArray(X.accounts))return null;let Ee=X.accounts.filter(ye=>jn(ye)&&typeof ye.key=="string"&&ye.key.length>0&&typeof ye.email=="string"&&ye.email.length>0);return{accounts:Ee,active:Ee.find(ye=>ye.active===!0)||null}}catch{return null}}async function Re(){ee=!0;let[E,K]=await Promise.all([U("/api/claude-usage"),U("/api/codex-usage")]);O||(k={claude:E,codex:K},ze())}function W(){let E={};for(let K of f$){let X=Object.hasOwn(m,K)?m[K]:null,Ee=Object.hasOwn(h,K)?h[K]:null;X!==Ee&&(E[K]=X)}return E}async function te(){let E=W();if(Object.keys(E).length!==0){try{pe(await de("set-workspace-accounts",{values:E,...ie()}),!1)}catch(K){s(`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12 \uC800\uC7A5 \uC2E4\uD328: ${K instanceof Error?K.message:String(K)}`)}ze()}}function J(E,K){K===pn?delete m[E]:m[E]=K,ze(),g=g.then(()=>te())}function Y(E,K){if(p$.includes(E)){Je(E,K);return}K===pn?delete o[E]:o[E]=K,ze(),F()}function ke(E,K){a[E]=K,delete l[E]}function fe(E,K,X){if(a[E]=K,K.length>0&&!X(K)){l[E]=!0,ze();return}delete a[E],delete l[E],K.length===0?delete o[E]:o[E]=K,ze(),F()}function Le(){let E=ut().orchestration_model,K=In({global:{orchestration_model:E??void 0},execution_defaults:ue(),runner_catalog:oe()}).orchestration_model.value;return K?Wn(oe(),K):null}function Ne(E,K){typeof K=="string"&&K.length>0?o[E]=K:delete o[E]}function Je(E,K){let X=K===pn?void 0:K,Ee=Qd({impl_runtime:E==="impl_runtime"?X:o.impl_runtime,impl_model:E==="impl_model"?X:o.impl_model,impl_effort:E==="impl_effort"?X:o.impl_effort},oe(),Le());Ne("impl_runtime",Ee.impl_runtime),Ne("impl_model",Ee.impl_model),Ne("impl_effort",Ee.impl_effort),ze(),F()}async function Be(){let E=C();if(!E)return;let K={orchestration_model:E.orchestration_model??null,orchestration_effort:E.orchestration_effort??null,orchestration_speed:E.orchestration_speed??null,quick_fix_orchestration_model:E.quick_fix_orchestration_model??null,quick_fix_orchestration_effort:E.quick_fix_orchestration_effort??null,quick_fix_orchestration_speed:E.quick_fix_orchestration_speed??null},X=tp(K,{...K,...z});if(Object.keys(X).length!==0){try{let Ee=await qe("worker-queue-set-orchestration-defaults",{values:X});if(Ee&&Ee.applied===!1){s("Worker \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC");return}z={}}catch(Ee){s(`Worker \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${Ee instanceof Error?Ee.message:String(Ee)}`)}ze()}}function re(E,K){z[E]=K===pn?null:K,ze(),Be()}function Q(E){if(ne=E,!E){ze();return}let K=oe(),X=ut(),Ee=X.orchestration_model;Ee&&!Cs(K,E).includes(Ee)&&(z.orchestration_model=null,Ee=null);let ye=X.orchestration_effort;ye&&!Ni(K,E,Ee||Cn).includes(ye)&&(z.orchestration_effort=null),ze(),Be()}async function Te(E){if(!(!C()||E<Xa)){try{await qe("worker-queue-set-slots",{slots:E})}catch(K){s(`slots \uC800\uC7A5 \uC2E4\uD328: ${K instanceof Error?K.message:String(K)}`)}ze()}}async function et(E){if(!(!C()||E<Xa||E>_$)){try{await qe("worker-queue-set-serial-lane-count",{count:E})}catch(K){s(`\uC9C1\uB82C \uB808\uC778 \uC800\uC7A5 \uC2E4\uD328: ${K instanceof Error?K.message:String(K)}`)}ze()}}async function dt(E,K){let X=E==="auto_advance"?"worker-automation-toggle":E==="auto_merge"?"worker-merge-auto-toggle":"worker-provider-auto-switch-toggle";try{await qe(X,{on:K})}catch(Ee){s(`\uC790\uB3D9\uD654 \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${Ee instanceof Error?Ee.message:String(Ee)}`)}ze()}function Qe(){let E={},K=ut();for(let X of Ts){let Ee=Un.includes(X)?K[X]:o[X];typeof Ee=="string"&&Ee.length>0&&(E[X]=Ee)}return E}async function gt(){let E=V();if(!E)return;let K=Qe();if(Object.keys(K).length===0){s("\uC800\uC7A5\uD560 \uC2E4\uD589 \uC124\uC815\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uBA3C\uC800 \uC2E4\uD589 \uAC12\uC744 \uC120\uD0DD\uD558\uC138\uC694");return}let X=(E.presets||[]).find(ye=>ye.id===N),Ee=M.trim()||(X?X.name:"");if(!Ee){s("\uD504\uB9AC\uC14B \uC774\uB984\uC744 \uC785\uB825\uD558\uC138\uC694");return}try{let ye=X?await de("impl-preset-update",{expected_revision:E.revision,id:X.id,name:Ee,settings:K}):await de("impl-preset-create",{expected_revision:E.revision,name:Ee,settings:K});if(ye&&ye.applied){if(M="",!X&&Array.isArray(ye.presets)){let wt=ye.presets.find(kt=>kt.name===Ee);N=wt?wt.id:N}ze()}else s("\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4"),ze()}catch(ye){s(`\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328: ${ye instanceof Error?ye.message:String(ye)}`)}}async function Pt(){let E=V();if(!(!E||N.length===0))try{let K=await de("impl-preset-delete",{expected_revision:E.revision,id:N});K&&K.applied?(N="",ze()):(s("\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328: \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4"),ze())}catch(K){s(`\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328: ${K instanceof Error?K.message:String(K)}`)}}function St(E){i=Ii(E.values),o={...i},u=Array.isArray(E.warnings)?E.warnings:[],jn(E.queue)&&(t.onQueueAdopt?.(E.queue),z={})}async function ot(E){let K=V(),X=C();if(!K||!X||N.length===0||E==="quick_fix"&&!me())return;let Ee=ye=>({preset_id:N,expected_revision:K.revision,expected_queue_revision:ye,...E==="quick_fix"?{lane:"quick_fix"}:{},...ie()});try{let ye=await de("apply-impl-preset-global",Ee(X.revision));if(E==="quick_fix"&&ye&&ye.lane!=="quick_fix"){s("\uC11C\uBC84 \uC751\uB2F5\uC5D0 lane\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uD050 \uC2A4\uB0C5\uC0F7\uC744 \uB2E4\uC2DC \uBC1B\uC740 \uB4A4 \uD655\uC778\uD558\uC138\uC694"),ze();return}if(ye&&ye.applied&&St(ye),r!==null&&ye&&ye.queue_applied===!1){let wt=ye.queue&&typeof ye.queue.revision=="number"?ye.queue.revision:C()?.revision??X.revision;if(ye=await de("apply-impl-preset-global",Ee(wt)),E==="quick_fix"&&ye&&ye.lane!=="quick_fix"){s("\uC11C\uBC84 \uC751\uB2F5\uC5D0 lane\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uD050 \uC2A4\uB0C5\uC0F7\uC744 \uB2E4\uC2DC \uBC1B\uC740 \uB4A4 \uD655\uC778\uD558\uC138\uC694"),ze();return}ye&&ye.applied&&St(ye)}ye&&ye.applied?ye.queue_applied===!1&&s("\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uAC12\uC740 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC138\uC694"):ye&&ye.conflict&&s("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328: \uD504\uB9AC\uC14B\uC774 \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4")}catch(ye){s(`\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328: ${ye instanceof Error?ye.message:String(ye)}`)}ze()}async function ht(){G=!0,P=!1,ze();try{let E=await de("get-worker-system-prompt",{});!E||typeof E!="object"||Array.isArray(E)?P=!0:$=E}catch{P=!0}finally{G=!1,ze()}}function Jt(){if(q=!q,q&&!$){ht();return}ze()}function w(){let E=Hs({loading:G,error:P});if(E)return E;if(!$)return"";let K=Array.isArray($.variants)?$.variants:[];return c`<div class="settings-dialog__sp-body">
      ${$.target_base_placeholder?c`<div class="prompt-block__meta">
            \`${$.target_base_placeholder}\`는 디스패치 시점에 해석된
            base로 치환됩니다.
          </div>`:""}
      ${K.map(X=>c`<div class="settings-dialog__sp-variant" data-variant=${X.key}>
            <div class="settings-dialog__sp-cond">${X.condition}</div>
            ${vr(X.label,X.system_prompt)}
          </div>`)}
    </div>`}function se(){return c`<section
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
        @click=${Jt}
      >
        ${q?"\uC811\uAE30":"\uC804\uBB38 \uBCF4\uAE30"}
      </button>
      ${q?w():""}
    </section>`}function De(E,K,X,Ee,ye,wt,kt,Rt){let jt=ye[E]??pn,Wt=Ll(E,X,ye,ue(),oe(),kt,Rt),Xt=Wt.options.find($t=>$t.value===jt),an=jt===pn?Wt.full_value:Xt?.full_value;return c`<select
        class=${jt===pn?"settings-dialog__unset":""}
        data-key=${E}
        aria-label=${K}
        title=${an||""}
        ?disabled=${wt===!0||Rt!=="quick_fix"&&Wt.disabled}
        .value=${Pr(String(jt))}
        @change=${$t=>Ee(E,String($t.target.value))}
      >
        <option value=${pn} ?selected=${jt===pn}>
          ${Wt.unset_label}
        </option>
        ${Wt.options.map($t=>c`<option
              value=${$t.value}
              title=${$t.full_value||""}
              ?selected=${$t.value===jt}
            >
              ${$t.label}
            </option>`)}
      </select>
      ${jt===pn?c`<span class="settings-dialog__source-badge">기본</span>`:""}`}function Se(E,K,X,Ee,ye,wt=!1,kt,Rt=null,jt=null){return c`<div
      class=${`settings-dialog__row${wt?" settings-dialog__row--off":""}`}
      title=${wt&&jt?jt:""}
    >
      <span class="settings-dialog__row-label">${K}</span>
      <span class="settings-dialog__controls">
        ${De(E,K,X,Ee,ye,wt,kt,Rt)}
      </span>
    </div>`}function Me(E,K,X,Ee,ye,wt){let kt=Object.hasOwn(l,E),Rt=a[E]??o[E]??pn;return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${K}</span>
      <span class="settings-dialog__controls">
        <input
          type="text"
          class=${`settings-dialog__text${kt?" settings-dialog__text--invalid":""}`}
          data-key=${E}
          aria-label=${K}
          aria-invalid=${String(kt)}
          placeholder=${X}
          .value=${Pr(Rt)}
          @input=${jt=>ke(E,String(jt.target.value))}
          @change=${jt=>fe(E,String(jt.target.value).trim(),wt)}
        />
        ${Rt.length===0?c`<span class="settings-dialog__source-badge">기본</span>`:""}
        <span class="settings-dialog__hint" data-key-hint=${E}
          >${kt?ye:Ee}</span
        >
      </span>
    </div>`}function We(E,K,X,Ee){return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${K}</span>
      <span class="settings-dialog__controls">
        <label class="settings-dialog__check">
          <input
            type="checkbox"
            data-key=${E}
            .checked=${o[E]===uo}
            @change=${ye=>Y(E,ye.target.checked?uo:pn)}
          />
          ${X}
        </label>
        <span class="settings-dialog__hint" data-key-hint=${E}>${Ee}</span>
      </span>
    </div>`}function tt(E,K){let X=K?K.active:null;return jn(X)?`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(${E==="claude"?X.email:Ks({...X,alias:null})})`:"\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(\uD655\uC778 \uBD88\uAC00)"}function It(E,K,X){let Ee=k[X],ye=Object.hasOwn(m,E)?m[E]:pn,wt=X==="claude"?Ma:Ks,kt=!!Ee?.accounts.some(Rt=>Rt.key===ye);return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${K}</span>
      <span class="settings-dialog__controls">
        <select
          aria-label=${K}
          data-account-key=${E}
          @change=${Rt=>J(E,String(Rt.target.value))}
        >
          <option value=${pn} ?selected=${ye.length===0}>
            ${tt(X,Ee)}
          </option>
          ${ye.length>0&&!kt?c`<option value=${ye} selected>
                ${ye} (목록에 없음)
              </option>`:""}
          ${Ee?.accounts.map(Rt=>c`<option value=${Rt.key} ?selected=${Rt.key===ye}>
                ${wt(Rt)}
              </option>`)||""}
        </select>
        ${Ee?"":c`<span class="settings-dialog__hint"
              >계정 목록을 불러올 수 없습니다</span
            >`}
      </span>
    </div>`}function _e(){let E=_.warnings.join(", ");return _.state==="unusable"?`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12\uC744 \uD574\uC11D\uD560 \uC218 \uC5C6\uC5B4 \uC774 \uB808\uD3EC\uC758 \uB514\uC2A4\uD328\uCE58\uAC00 \uAC70\uBD80\uB429\uB2C8\uB2E4 \u2014 ${E} \xB7 \uACC4\uC815\uC744 \uB2E4\uC2DC \uACE0\uB974\uBA74 \uD574\uC18C\uB429\uB2C8\uB2E4`:_.warnings.length>0?`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12\uC5D0 \uC54C \uC218 \uC5C6\uB294 \uD0A4\uAC00 \uC788\uC2B5\uB2C8\uB2E4 \u2014 ${E}`:null}function xe(E,K,X,Ee,ye,wt){return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">
        <i
          class="settings-dialog__stage-dot"
          style=${`background: var(--stage-${K}-on)`}
        ></i>
        ${E}
      </span>
      <span class="settings-dialog__controls">
        ${De(X,`${E} \uBAA8\uB378`,Ee,Y,o,!1)}
        ${De(ye,`${E} effort`,Pi,Y,o,!1)}
        ${De(wt,`${E} \uC18D\uB3C4`,Vd,Y,o,!1)}
      </span>
    </div>`}function Ze(E,K,X,Ee){return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${K}</span>
      <span class="settings-dialog__controls">
        <button
          type="button"
          class=${`settings-dialog__toggle${Ee?" is-on":""}`}
          data-automation=${E}
          aria-pressed=${Ee?"true":"false"}
          aria-label=${K}
          @click=${()=>dt(E,!Ee)}
        >
          ${Ee?"\uCF1C\uC9D0":"\uAEBC\uC9D0"}
        </button>
        <span class="settings-dialog__hint">${X}</span>
      </span>
    </div>`}function yt(E,K,X,Ee){return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${K}</span>
      <span class="settings-dialog__controls">
        <span class="settings-dialog__stepper" data-stepper=${E}>
          <button
            type="button"
            aria-label=${`${K} \uAC10\uC18C`}
            @click=${()=>Ee(X-1)}
          >
            −
          </button>
          <span class="settings-dialog__stepper-value">${X}</span>
          <button
            type="button"
            aria-label=${`${K} \uC99D\uAC00`}
            @click=${()=>Ee(X+1)}
          >
            +
          </button>
        </span>
      </span>
    </div>`}function it(E,K){return c`<div class="settings-dialog__preset-diff" data-preset-diff>
      <div class="settings-dialog__preset-diff-head">
        ${E.rows.length>0?`\uBCC0\uACBD ${E.rows.length}\uAC1C \xB7 \uC801\uC6A9\uD558\uBA74 \uC544\uB798\uC640 \uAC19\uC774 \uBC14\uB01D\uB2C8\uB2E4`:"\uD604\uC7AC \uC124\uC815\uACFC \uAC19\uC2B5\uB2C8\uB2E4 \u2014 \uC801\uC6A9\uD560 \uBCC0\uACBD\uC774 \uC5C6\uC2B5\uB2C8\uB2E4"}
      </div>
      ${E.rows.map(X=>c`<div
            class="settings-dialog__preset-diff-row"
            data-diff-kind=${X.kind}
          >
            <span class="settings-dialog__preset-diff-label">${X.label}</span>
            <span class="settings-dialog__preset-diff-value"
              >${X.before??"\uAE30\uBCF8"}</span
            >
            <span class="settings-dialog__preset-diff-arrow">→</span>
            <span
              class="settings-dialog__preset-diff-value settings-dialog__preset-diff-after"
              >${X.after??(K==="quick_fix"?"\uAE30\uBCF8(\uD574\uC81C \u2192 \uC77C\uBC18 \uD504\uB85C\uD30C\uC77C)":"\uAE30\uBCF8(\uD574\uC81C)")}</span
            >
          </div>`)}
      ${E.ignored_keys.length>0?c`<div class="settings-dialog__preset-diff-note">
            ${E.ignored_keys.join(", ")}은(는)
            ${K==="quick_fix"?"quick_fix \uB808\uC778":"\uC804\uC5ED"} 적용이 쓰지 않는
            키라 무시됩니다
          </div>`:""}
    </div>`}function ut(){let E=C(),K={};for(let X of[...Un,...Es])K[X]=Object.prototype.hasOwnProperty.call(z,X)?z[X]:E&&typeof E[X]=="string"?E[X]:null;return K}function bt(){let E=ut(),K={};for(let X of Es)K[X]=E[X]??null;for(let X of["quick_fix_impl_dispatch","quick_fix_impl_runtime","quick_fix_impl_model","quick_fix_impl_effort","quick_fix_impl_speed"])K[X]=o[X]??null;return K}function st(){let E=oe(),K=o.impl_runtime,X=o.impl_model,Ee=V(),ye=C(),wt=ut(),kt=Cs(E,ne),Rt=Rs(E,void 0).filter(Ve=>Ve!==Cn),jt=Yr(E,void 0,void 0),Wt=Ni(E,ne,wt.orchestration_model||Cn).filter(Ve=>Ve!==Cn),Xt=N?(Ee?.presets||[]).find(Ve=>Ve.id===N):null,an=Xt?Zd(Qe(),jn(Xt.settings)?Xt.settings:{}):null,$t={quick_fix_orchestration_model:Cs(E,null),quick_fix_orchestration_effort:Ni(E,null,null).filter(Ve=>Ve!==Cn),quick_fix_orchestration_speed:er,quick_fix_impl_dispatch:po,quick_fix_impl_runtime:um,quick_fix_impl_model:Rt,quick_fix_impl_effort:jt,quick_fix_impl_speed:er},rn=Xt?Jd(bt(),jn(Xt.settings)?Xt.settings:{},$t):null,fn=D==="quick_fix"?rn:an,qt=me(),Gt=qt?null:"\uC11C\uBC84\uAC00 quick_fix \uB808\uC778\uC744 \uC9C0\uC6D0\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4",sn={...o,...wt},Ke=ye&&typeof ye.slots=="number"?ye.slots:Xa+1,L=ye&&typeof ye.serial_lane_count=="number"?ye.serial_lane_count:Xa,ve=ue()?.supported===!0,je=_e(),xt=Ll("workflow_mode",fo,o,ue(),E);return c`
      ${u.length>0?c`<div class="settings-dialog__banner" role="alert">
            워크스페이스 기본값을 일부 읽지 못했습니다 —
            ${u.join(", ")}
          </div>`:""}
      ${je?c`<div
            class="settings-dialog__banner"
            data-account-warning
            role="alert"
          >
            ${je}
          </div>`:""}
      ${ve?"":c`<div
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
                .value=${Pr(N)}
                @change=${Ve=>{N=String(Ve.target.value),ze()}}
              >
                <option value="" ?selected=${N===""}>
                  실행 프리셋…
                </option>
                ${(Ee?.presets||[]).map(Ve=>c`<option
                      value=${Ve.id}
                      ?selected=${Ve.id===N}
                    >
                      ${Ve.name}
                    </option>`)}
              </select>
              <button
                type="button"
                class="settings-dialog__btn settings-dialog__btn--primary op-btn"
                data-preset-apply-global
                data-preset-apply-general
                ?disabled=${!an||an.rows.length===0}
                @click=${()=>ot("general")}
              >
                일반에 적용
              </button>
              <button
                type="button"
                class="settings-dialog__btn op-btn"
                data-preset-apply-quick-fix
                title=${Gt||""}
                ?disabled=${!qt||!rn||rn.rows.length===0}
                @click=${()=>ot("quick_fix")}
              >
                quick_fix 레인에 적용
              </button>
              <input
                type="text"
                class="settings-dialog__preset-name"
                placeholder=${N?"\uC774\uB984 (\uBE44\uC6B0\uBA74 \uC720\uC9C0)":"\uC0C8 \uD504\uB9AC\uC14B \uC774\uB984"}
                aria-label="프리셋 이름"
                .value=${Pr(M)}
                @input=${Ve=>{M=String(Ve.target.value)}}
              />
              <button
                type="button"
                class="settings-dialog__btn"
                data-preset-save
                title=${N?"\uD604\uC7AC \uD654\uBA74\uC758 \uC2E4\uD589 \uC124\uC815\uC744 \uC774 \uD504\uB9AC\uC14B\uC5D0 \uC800\uC7A5\uD569\uB2C8\uB2E4 (\uD504\uB9AC\uC14B \u2192 \uC124\uC815 \uBC29\uD5A5\uC774 \uC544\uB2D8)":"\uD604\uC7AC \uD654\uBA74\uC758 \uC2E4\uD589 \uC124\uC815\uC744 \uC0C8 \uD504\uB9AC\uC14B\uC73C\uB85C \uC800\uC7A5\uD569\uB2C8\uB2E4"}
                @click=${gt}
              >
                ${N?"\uD604\uC7AC \uC124\uC815\uC73C\uB85C \uB36E\uC5B4\uC4F0\uAE30":"\uC0C8 \uD504\uB9AC\uC14B \uC800\uC7A5"}
              </button>
              <button
                type="button"
                class="settings-dialog__btn"
                data-preset-delete
                ?disabled=${N.length===0}
                @click=${Pt}
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
                aria-pressed=${String(D==="general")}
                @click=${()=>{D="general",ze()}}
              >
                일반
              </button>
              <button
                type="button"
                data-preset-lane="quick_fix"
                aria-pressed=${String(D==="quick_fix")}
                @click=${()=>{D="quick_fix",ze()}}
              >
                quick_fix
              </button>
            </div>
            ${fn?it(fn,D):""}

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">오케스트레이션</div>
              <div class="settings-dialog__row">
                <span class="settings-dialog__row-label">런타임</span>
                <span class="settings-dialog__controls">
                  <select
                    aria-label="런타임"
                    data-key="orchestration_runtime_filter"
                    .value=${Pr(ne||pn)}
                    @change=${Ve=>{let Dt=String(Ve.target.value);Q(Dt===pn?null:Dt)}}
                  >
                    <option value=${pn} ?selected=${!ne}>
                      전체
                    </option>
                    <option
                      value="claude"
                      ?selected=${ne==="claude"}
                    >
                      claude
                    </option>
                    <option
                      value="codex"
                      ?selected=${ne==="codex"}
                    >
                      codex
                    </option>
                  </select>
                  <span class="settings-dialog__hint"
                    >모델 목록을 좁힙니다</span
                  >
                </span>
              </div>
              ${Se("orchestration_model","\uBAA8\uB378",kt,re,wt)}
              ${Se("orchestration_effort","effort",Wt,re,wt)}
              ${Se("orchestration_speed","\uC18D\uB3C4",er,re,wt)}
            </div>

            <div class="settings-dialog__group" data-exec-accounts-group>
              <div class="settings-dialog__group-title">실행 계정</div>
              ${It("claude_account","Claude","claude")}
              ${It("codex_account","Codex","codex")}
              <div class="settings-dialog__row">
                <span class="settings-dialog__row-label">한도 대응</span>
                <span class="settings-dialog__controls">
                  <label class="settings-dialog__check">
                    <input
                      type="checkbox"
                      data-provider-auto-switch
                      .checked=${ye?.provider_auto_switch!==!1}
                      @change=${Ve=>dt("provider_auto_switch",Ve.target.checked)}
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
                      data-mode=${pn}
                      aria-pressed=${String(!o.workflow_mode)}
                      @click=${()=>Y("workflow_mode",pn)}
                    >
                      ${xt.unset_label}
                    </button>
                    ${o.workflow_mode?"":c`<span class="settings-dialog__source-badge"
                          >기본</span
                        >`}
                    ${fo.map(Ve=>c`<button
                          type="button"
                          data-mode=${Ve}
                          aria-pressed=${String(o.workflow_mode===Ve)}
                          @click=${()=>Y("workflow_mode",Ve)}
                        >
                          ${Ve}
                        </button>`)}
                  </span>
                </span>
              </div>
              ${Me("bdui_url","beads-ui \uC8FC\uC18C","http://\uD638\uC2A4\uD2B8:3000","\uC138\uC158\uC774 Worker \uB808\uC778 \uBC30\uCE58\uB97C \uBB3C\uC5B4\uBCFC \uB54C \uC4F0\uB294 \uC8FC\uC18C\uC785\uB2C8\uB2E4","http:// \uB610\uB294 https:// \uB85C \uC2DC\uC791\uD558\uB294 \uC8FC\uC18C\uB9CC \uC800\uC7A5\uB429\uB2C8\uB2E4 (\uACBD\uB85C \uC5C6\uC774)",Gd)}
              ${We("base_sync_accept_local_commits","base \uB3D9\uAE30\uD654","\uB85C\uCEEC base \uC0AC\uC6A9\uC790 \uCEE4\uBC0B \uC790\uB3D9 rebase+push","\uAEBC\uB450\uBA74 \uB85C\uCEEC base \uCCB4\uD06C\uC544\uC6C3\uC758 \uC0AC\uC6A9\uC790 \uCEE4\uBC0B\uC740 \uADF8\uB300\uB85C \uB0A8\uC2B5\uB2C8\uB2E4")}
            </div>

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">
                리뷰 게이트
                <span class="settings-dialog__hint">모델 · effort · 속도</span>
              </div>
              ${xe("\uC0AC\uC591 \uB9AC\uBDF0","spec","spec_review_model",_o,"spec_review_effort","spec_review_speed")}
              ${xe("\uACC4\uD68D \uB9AC\uBDF0","plan","plan_review_model",Di,"plan_review_effort","plan_review_speed")}
              ${xe("\uAD6C\uD604 \uB9AC\uBDF0","impl","impl_review_model",_o,"impl_review_effort","impl_review_speed")}
            </div>

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">
                구현
                <span class="settings-dialog__hint"
                  >이슈 핀이 있으면 핀이 우선합니다</span
                >
              </div>
              ${Se("impl_runtime","\uC704\uC784 \uB300\uC0C1",Li,Y,o)}
              ${Se("impl_model","\uBAA8\uB378",Rs(E,K),Y,o)}
              ${Se("impl_effort","effort",Yr(E,K,X),Y,o)}
              ${Se("impl_speed","\uC18D\uB3C4",er,Y,o)}
            </div>

            <div
              class="settings-dialog__group"
              data-quick-fix-group
              title=${Gt||""}
            >
              <div class="settings-dialog__group-title">
                quick_fix 레인
                <span class="settings-dialog__hint"
                  >${"\uBE44\uC5B4 \uC788\uB294 \uAC12\uC740 \uC77C\uBC18 \uD504\uB85C\uD30C\uC77C\uB85C \uB5A8\uC5B4\uC9D1\uB2C8\uB2E4. \uC774\uC288 \uD540\uC774 \uC788\uC73C\uBA74 \uD540\uC774 \uC6B0\uC120\uD569\uB2C8\uB2E4."}</span
                >
              </div>
              ${Se("quick_fix_orchestration_model","\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uBAA8\uB378",$t.quick_fix_orchestration_model,re,wt,!qt,sn,"quick_fix",Gt)}
              ${Se("quick_fix_orchestration_effort","\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 effort",$t.quick_fix_orchestration_effort,re,wt,!qt,sn,"quick_fix",Gt)}
              ${Se("quick_fix_orchestration_speed","\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uC18D\uB3C4",er,re,wt,!qt,sn,"quick_fix",Gt)}
              ${Se("quick_fix_impl_dispatch","\uC2E4\uD589 \uBC29\uC2DD",po,Y,o,!qt,sn,"quick_fix",Gt)}
              ${Se("quick_fix_impl_runtime","\uC704\uC784 \uB300\uC0C1",um,Y,o,!qt,sn,"quick_fix",Gt)}
              ${Se("quick_fix_impl_model","\uBAA8\uB378",Rt,Y,o,!qt,sn,"quick_fix",Gt)}
              ${Se("quick_fix_impl_effort","effort",jt,Y,o,!qt,sn,"quick_fix",Gt)}
              ${Se("quick_fix_impl_speed","\uC18D\uB3C4",er,Y,o,!qt,sn,"quick_fix",Gt)}
            </div>

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">
                자동화
                <span class="settings-dialog__hint"
                  >이 레포의 워커 큐가 스스로 진행하는 범위</span
                >
              </div>
              ${Ze("auto_advance","\uC790\uB3D9\uD654","\uC2AC\uB86F\uC774 \uBE44\uBA74 \uB300\uAE30 \uC55E \uD589\uC774 \uCD9C\uBC1C\uD569\uB2C8\uB2E4",ye?.auto_advance===!0)}
              ${Ze("auto_merge","\uBA38\uC9C0","\uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4",ye?.auto_merge===!0)}
              ${yt("slots","\uB3D9\uC2DC \uC2E4\uD589",Ke,Ve=>Te(Ve))}
              ${yt("serial-lane-count","\uC9C1\uB82C \uB808\uC778",L,Ve=>et(Ve))}
            </div>
            ${se()}
          `}
    `}function ze(){O||ct(st(),e)}return{load(){z={},D="general",a={},l={};let E=[Ie(),B()];return ee||E.push(Re()),Promise.all(E).then(()=>{})},render:ze,sessionDraft:()=>({...o}),destroy(){O=!0,ct(c``,e)}}}function Za(e){return c`<svg
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
  </svg>`}function dm(){return Za(so`<path d="M5.5 3.6 12 8l-6.5 4.4z" />`)}function pm(){return Za(so`<path d="M6 3.8v8.4M10 3.8v8.4" />`)}function fm(){return Za(so`<path
      d="M4.6 5.6v4.8M4.6 8.2h2.2A3.2 3.2 0 0 0 10 5"
    />
    <circle cx="4.6" cy="4" r="1.5" />
    <circle cx="4.6" cy="12" r="1.5" />
    <circle cx="11.4" cy="4" r="1.5" />`)}function _m(){return Za(so`<circle cx="8" cy="8" r="2.1" />
    <path
      d="M8 1.9v1.8M8 12.3v1.8M1.9 8h1.8M12.3 8h1.8M3.7 3.7l1.3 1.3M11 11l1.3 1.3M12.3 3.7 11 5M5 11l-1.3 1.3"
    />`)}function mm(e){return`${e} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}function gm(e){let t=(Array.isArray(e)?e:[]).map(a=>a&&a.usage).filter(a=>a&&typeof a=="object"&&"providers"in a);if(t.length>0)return mn(Ti(t));let n={};for(let a of Jn)n[a]=0;let r=!1,s=0,i=0,o=0;for(let a of Array.isArray(e)?e:[]){let l=a&&a.usage;if(l&&typeof l=="object"){let u=!1;for(let d of Jn){let _=l[d];typeof _=="number"&&Number.isFinite(_)&&(n[d]+=_,r=!0,u=!0)}if(u){i+=1;let d=l.total_cost_usd;typeof d=="number"&&Number.isFinite(d)&&(s+=d,o+=1)}}}return i>0&&o===i&&(n.total_cost_usd=s),r?dr(n):null}function Pn(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function su(e,t){let n=Pn(e?.counts)?e.counts:null,r=n?n[t]:null;return typeof r=="number"&&Number.isFinite(r)?r:0}function m$(e,t){if(!Pn(t))return e;let n={...e};for(let[r,s]of Object.entries(t))s!==void 0&&(n[r]=s);return n}function g$(e){if(!Pn(e)||!Pn(e.execution_defaults)||!Pn(e.runner_catalog)||!Pn(e.session_defaults))return null;let t={...e.session_defaults};for(let o of["orchestration_model","orchestration_effort","orchestration_speed"])typeof e[o]=="string"&&e[o].length>0&&(t[o]=e[o]);let n=In({global:t,execution_defaults:e.execution_defaults,runner_catalog:e.runner_catalog}),r=Wn(e.runner_catalog,n.orchestration_model.value??""),s=Os(n,e.runner_catalog),i=Xr(n,r);return s===null&&i===null?null:{orchestration:s,worker:i}}function hm(e,t){let n=t.notify||(B=>be(B,"error",4e3)),r=document.createElement("div");r.className="mon2-deck__main",e.appendChild(r);let s=document.createElement("div");s.className="mon2-deck__panel",s.hidden=!0;let i=document.createElement("div");i.className="mon2-deck__panel-hd";let o=document.createElement("span");o.className="mon2-deck__panel-title";let a=document.createElement("button");a.type="button",a.className="mon2-deck__panel-close",a.setAttribute("aria-label","\uC2E4\uD589 \uC124\uC815 \uB2EB\uAE30"),a.textContent="\u2715",i.append(o,a);let l=document.createElement("div");l.className="mon2-deck__panel-body",s.append(i,l),e.appendChild(s);let u=null,d=null,_=null,m=new Map;function h(){let B=t.workspacesState?t.workspacesState():[];return Array.isArray(B)?B.filter(U=>Pn(U)):[]}function g(B){return h().find(U=>U.root_dir===B)||null}function T(B){return m$(g(B),m.get(B))}function k(){for(let B of h()){let U=m.get(B.root_dir);U&&typeof U.revision=="number"&&typeof B.revision=="number"&&B.revision>=U.revision&&m.delete(B.root_dir)}}async function ee(B,U,Re){let W=t.transport,te=T(U);if(!(!W||!Pn(te))){try{let J=await W(B,{...Re,root_dir:U,expected_revision:te.revision});if(Pn(J?.queue)&&m.set(U,J.queue),J&&J.conflict){let Y=Pn(J.queue)&&typeof J.queue.revision=="number"?J.queue.revision:T(U)?.revision;J=await W(B,{...Re,root_dir:U,expected_revision:Y}),Pn(J?.queue)&&m.set(U,J.queue)}}catch(J){n(`\uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${J instanceof Error?J.message:String(J)}`)}F()}}function ne(B){u!==B&&(u=B,t.onFocusChange?.(u),F())}function z(B){ne(u===B?null:B)}function N(B){if(d===B){M();return}D(),d=B;let U=g(B);o.textContent=`${U?.name||B} \uC2E4\uD589 \uC124\uC815 \xB7 Worker \uD0ED \u2699 \uC2E4\uD589 \uD0ED\uACFC \uAC19\uC740 \uC800\uC7A5\uC18C`,s.hidden=!1,_=Qa(l,{root_dir:B,queue:()=>T(B),transport:t.transport,implPresetStore:t.implPresetStore,notify:n,onQueueAdopt:Re=>{m.set(B,Re),F()}}),_.load(),F()}function D(){_?.destroy(),_=null}function M(B){D(),d=null,s.hidden=!0,o.textContent="",B!==!0&&F()}let q=()=>M();a.addEventListener("click",q);function G(B){B.key==="Escape"&&u!==null&&ne(null)}document.addEventListener("keydown",G);function P(B,U){let Re=Math.max(U,B,1);return c`<span
      class="mon2-deck__rail"
      role="img"
      aria-label=${`\uC2AC\uB86F ${U}\uAC1C \uC911 ${B}\uAC1C \uC2E4\uD589 \uC911`}
    >
      ${Array.from({length:Re},(W,te)=>te<B?c`<i class="mon2-deck__slot is-run"></i>`:c`<i class="mon2-deck__slot"></i>`)}
    </span>`}function $(B){let U=B.auto_advance===!0,Re=B.auto_merge===!0;return c`<button
        type="button"
        class=${`mon2-deck__op mon2-deck__auto${U?" is-on":""}`}
        data-act="auto"
        aria-pressed=${U?"true":"false"}
        aria-label=${`${B.name} \uC790\uB3D9\uD654`}
        title=${U?"\uC790\uB3D9\uD654 \uCF1C\uC9D0 \u2014 \uC2AC\uB86F\uC774 \uBE44\uBA74 \uB2E4\uC74C \uD589\uC774 \uCD9C\uBC1C\uD569\uB2C8\uB2E4":"\uC790\uB3D9\uD654 \uAEBC\uC9D0 \u2014 \uB2E4\uC74C \uD589\uC740 \uC218\uB3D9\uC73C\uB85C\uB9CC \uCD9C\uBC1C\uD569\uB2C8\uB2E4"}
      >
        ${U?pm():dm()}
      </button>
      <button
        type="button"
        class=${`mon2-deck__op mon2-deck__merge${Re?" is-on":""}`}
        data-act="merge"
        aria-pressed=${Re?"true":"false"}
        aria-label=${`${B.name} \uC790\uB3D9 \uBA38\uC9C0`}
        title=${Re?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0"}
      >
        ${fm()}
      </button>
      <button
        type="button"
        class=${`mon2-deck__op mon2-deck__gear${d===B.root_dir?" is-on":""}`}
        data-act="gear"
        aria-expanded=${d===B.root_dir?"true":"false"}
        aria-label=${`${B.name} \uC2E4\uD589 \uC124\uC815`}
        title="이 레포의 실행 설정"
      >
        ${_m()}
      </button>`}function O(B){let U=g$(B);return U?c`<div class="mon2-deck__chips">
      ${U.orchestration?c`<span class="mon2-deck__chip" title=${U.orchestration.title}
            >오케 ${U.orchestration.text}</span
          >`:""}
      ${U.worker?c`<span class="mon2-deck__chip" title=${U.worker.title}
            >워커 ${U.worker.text}</span
          >`:""}
    </div>`:""}let C={equal:"\uB3D9\uAE30",behind:"\uB4A4\uCC98\uC9D0",ahead:"\uC55E\uC12C",diverged:"\uAC08\uB77C\uC9D0"},oe={missing_checkout:"\uCCB4\uD06C\uC544\uC6C3 \uC5C6\uC74C",invalid_target:"\uAE30\uC900 \uB300\uC0C1 \uD655\uC778 \uBD88\uAC00",fetch_failed:"\uC6D0\uACA9 \uAC31\uC2E0 \uC2E4\uD328",judge_failed:"\uD310\uC815 \uC2E4\uD328",invalid_result:"\uACB0\uACFC \uD615\uC2DD \uC624\uB958"},ue=[["conflict","\uCDA9\uB3CC"],["staged","staged"],["unmerged","unmerged"]];function me(B,U){return U?`${B}+`:String(B)}function V(B,U){let Re=Date.parse(B);if(Number.isNaN(Re))return"";let W=Math.max(0,Math.floor((U-Re)/6e4));if(W<60)return`${W}\uBD84 \uC804`;let te=Math.floor(W/60);return te<24?`${te}\uC2DC\uAC04 \uC804`:`${Math.floor(te/24)}\uC77C \uC804`}function ie(B){let U=Pn(B?.repo_health)?B.repo_health:null,Re=U?U.state:"unknown";if(!U||Re==="unknown")return c`<span
        class="mon2-deck__health is-unknown"
        title="저장소 건강 기록이 없습니다"
        >미확인</span
      >`;let W=typeof U.observed_at=="string"?V(U.observed_at,Date.now()):"",te=[];if(Re==="error"||Re==="stale"){let Y=oe[U.error_code];Y&&te.push(`\uC218\uC9D1 \uC2E4\uD328 ${Y}`)}if(typeof U.head_relation=="string"){let Y=C[U.head_relation],ke=[typeof U.behind=="number"&&U.behind>0?`-${U.behind}`:"",typeof U.ahead=="number"&&U.ahead>0?`+${U.ahead}`:""].filter(fe=>fe.length>0);te.push([Y||U.head_relation,...ke].join(" "))}let J=Pn(U.classes)?U.classes:null;if(J)for(let[Y,ke]of ue){let fe=J[Y];typeof fe=="number"&&fe>0&&te.push(`${ke} ${me(fe,U.truncated===!0)}`)}return Re==="stale"&&te.push("\uC624\uB798\uB41C \uAD00\uCC30\uAC12"),W.length>0&&te.push(W),te.length===0?"":c`<span
      class=${`mon2-deck__health is-${Re}`}
      title=${`\uC800\uC7A5\uC18C \uAC74\uAC15 \u2014 ${U.truncated===!0?"\uC218\uCE58\uB294 \uC798\uB824 \uC774\uC0C1\uAC12\uC785\uB2C8\uB2E4":"15\uBD84\uB9C8\uB2E4 dotfiles\uAC00 \uAE30\uB85D\uD569\uB2C8\uB2E4"}`}
      >${te.join(" \xB7 ")}</span
    >`}function de(B){let U=[];for(let[Re,W]of[["queue","\uB300\uAE30"],["pr_wait","PR"],["session_active","\uC138\uC158"]]){let te=su(B,Re);te>0&&U.push(`${W} ${te}`)}return U.join(" \xB7 ")}function Oe(B){let U=su(B,"running"),Re=typeof B.slots=="number"?B.slots:1;return c`<div
      class=${`mon2-deck__tile${u===B.root_dir?" is-focus":""}`}
      role="button"
      tabindex="0"
      data-root-dir=${B.root_dir}
      aria-pressed=${u===B.root_dir?"true":"false"}
      title="클릭하면 이 레포만 선명하게 봅니다 (Esc로 해제)"
    >
      <div class="mon2-deck__tile-hd">
        <span class="mon2-deck__name" title=${B.root_dir}>${B.name}</span>
        <span
          class="mon2-deck__load"
          title=${`\uC2AC\uB86F ${Re}\uAC1C \uC911 ${U}\uAC1C \uC2E4\uD589 \uC911`}
        >
          <span class="mon2-deck__load-n">${U}/${Re}</span>
          ${P(U,Re)}
        </span>
        <button
          type="button"
          class="mon2-deck__worker"
          data-act="worker"
          aria-label=${`${B.name} Worker \uD0ED\uC73C\uB85C \uC774\uB3D9`}
          title="이 레포의 Worker 탭으로 이동"
        >
          ↗
        </button>
      </div>
      <div class="mon2-deck__tile-ft">
        <div class="mon2-deck__ops">${$(B)}</div>
        <span class="mon2-deck__counts">${de(B)}</span>
        ${ie(B)} ${O(B)}
      </div>
    </div>`}function qe(B){let U=t.doneItems?t.doneItems():[],Re=t.rangeLabel?t.rangeLabel():"",W=gm(Array.isArray(U)?U:[]),te=J=>B.reduce((Y,ke)=>Y+su(ke,J),0);return c`<div class="mon2-deck__bar">
      <span
        class="mon2-deck__total-counts"
        title=${`visible \uB808\uD3EC ${B.length}\uACF3\uC758 \uD569\uACC4\uC785\uB2C8\uB2E4 \u2014 \uC2E4\uD589\xB7\uB300\uAE30\xB7PR\uC740 \uC9C0\uAE08, \uC644\uB8CC\uB294 ${Re}`}
        >실행 ${te("running")} · 대기 ${te("queue")} · PR
        ${te("pr_wait")}${te("session_active")>0?` \xB7 \uC138\uC158 ${te("session_active")}`:""}
        · ${Re} 완료
        ${Array.isArray(U)?U.length:0}</span
      >
      ${W===null?"":c`<span class="mon2-deck__total-tokens">
            ${typeof W=="string"?c`<span
                  class="mon2-deck__tok"
                  title=${mm(Re)}
                  >${W}</span
                >`:W.map(J=>c`<span
                      class="mon2-deck__tok"
                      data-provider=${J.provider}
                      title=${J.tooltip}
                      >${J.label}</span
                    >`)}
          </span>`}
    </div>`}function Ie(){let B=h();return B.length===0?"":c`${qe(B)}
      <div class="mon2-deck__strip">
        ${B.map(U=>Oe(U))}
      </div>`}function ge(){u!==null&&!g(u)&&(u=null,t.onFocusChange?.(null))}function F(){k(),ge(),d!==null&&!g(d)&&M(!0),ct(Ie(),r),_?.render()}function ce(B){let U=B.target;if(!U||typeof U.closest!="function")return;let Re=U.closest("[data-root-dir]");if(!Re)return;let W=Re.getAttribute("data-root-dir")||"",te=U.closest("[data-act]")?.getAttribute("data-act");if(te==="worker"){t.gotoWorkerTab?.(W);return}if(te==="auto"){ee("worker-automation-toggle",W,{on:T(W)?.auto_advance!==!0});return}if(te==="merge"){ee("worker-merge-auto-toggle",W,{on:T(W)?.auto_merge!==!0});return}if(te==="gear"){N(W);return}z(W)}function pe(B){if(B.key!=="Enter"&&B.key!==" ")return;let U=B.target;if(!U||typeof U.closest!="function")return;let Re=U.closest('[data-root-dir][role="button"]');!Re||Re!==U||(B.preventDefault(),z(Re.getAttribute("data-root-dir")||""))}return r.addEventListener("click",ce),r.addEventListener("keydown",pe),{render:F,focusRoot:()=>u,panelRoot:()=>d,destroy(){document.removeEventListener("keydown",G),r.removeEventListener("click",ce),r.removeEventListener("keydown",pe),a.removeEventListener("click",q),D(),ct(c``,r),e.replaceChildren()}}}var h$=1e4,vm="bdui.monitor.done-range",km="bdui.monitor.running_sort",wm="bdui.monitor.candidate_sort",$m="beads-ui.monitor.candidate-filter",xm="beads-ui.monitor.sections";function b$(){try{let e=window.localStorage.getItem($m);if(!e)return{...qs};let t=JSON.parse(e);return!t||typeof t!="object"?{...qs}:{show_blocked:typeof t.show_blocked=="boolean"?t.show_blocked:qs.show_blocked,readiness:Oo.some(n=>n.value===t.readiness)?t.readiness:"all",routes:rs(t.routes)}}catch{return{...qs}}}function ou(e){try{window.localStorage.setItem($m,JSON.stringify({show_blocked:e.show_blocked,readiness:e.readiness,routes:e.routes}))}catch{}}function y$(){try{let e=window.localStorage.getItem(wm);return Co.some(t=>t.value===e)?e:"repo_spec"}catch{return"repo_spec"}}function v$(e){try{window.localStorage.setItem(wm,e)}catch{}}function k$(){try{let e=window.localStorage.getItem(xm);if(!e)return{};let t=JSON.parse(e);return t&&typeof t=="object"?t:{}}catch{return{}}}function w$(e){try{window.localStorage.setItem(xm,JSON.stringify(e))}catch{}}function $$(){try{let e=window.localStorage.getItem(vm);return e===null?"today":Xn(e)}catch{return"today"}}function x$(e){try{window.localStorage.setItem(vm,e)}catch{}}function A$(){try{return window.localStorage.getItem(km)==="repo"?"repo":"started"}catch{return"started"}}function S$(e){try{window.localStorage.setItem(km,e)}catch{}}var Am="tab:monitor:pipeline",E$=1e3,bm=[{lane:"runnable",pane:"candidate",title:"\uD6C4\uBCF4",empty:"\uC2E4\uD589 \uC790\uACA9\uC744 \uAC16\uCD98 \uC774\uC288 \uC5C6\uC74C"},{lane:"queue",pane:"queue",title:"\uB300\uAE30",empty:"\uD45C\uC2DC\uD560 \uB808\uD3EC \uC5C6\uC74C"},{lane:"running",pane:"running",title:"\uC2E4\uD589 \uC911",empty:"\uC2E4\uD589 \uC911 \uC5C6\uC74C"},{lane:"pr_wait",pane:"pr_wait",title:"PR \uB300\uAE30",empty:"PR \uC5C6\uC74C"},{lane:"done",pane:"done",title:"\uC644\uB8CC",empty:"\uC644\uB8CC \uAE30\uB85D \uC5C6\uC74C"}],T$=["queue","runnable","done"],ym="\u2460\u2461\u2462\u2463\u2464\u2465\u2466\u2467\u2468\u2469\u246A\u246B\u246C\u246D\u246E\u246F\u2470\u2471\u2472\u2473";function R$(e){return e>=1&&e<=ym.length?ym[e-1]:`(${e})`}function Sm(e,t){let n=zt("views:monitor"),r=t.gotoIssue,s=t.pipelineStore,i=t.transport,o=t.getWorkspacePath,a=t.openDoc,l=t.switchWorkspace,u=t.router,d=t.now||(()=>Date.now()),_=t.confirm||(p=>typeof globalThis.confirm!="function"||globalThis.confirm(p)),m=$$(),h=A$(),g=b$(),T=y$(),k=k$(),ee=Ua("beads-ui.monitor.lane-collapsed"),ne=!1,z=null,N=null,D=null,M=null,q=null,G=null,P=Ls(()=>X()),$=null,O=null,C=null,oe=null;function ue(p){return oe===null&&(oe=Y()),vf(p,oe)}function me(p,f){V(),!(f<=0)&&(O={lane_id:p,corrected:f},C=setTimeout(()=>{C=null,O=null,X()},h$))}function V(){C!==null&&(clearTimeout(C),C=null),O=null}function ie(){let p=fs.find(f=>f.value===m);return p?p.label:""}let de=document.createElement("div");de.className="mon",e.appendChild(de);let Oe=document.createElement("div");Oe.className="worker-drawer-overlay",Oe.hidden=!0;let qe=document.createElement("div");qe.className="worker-drawer-overlay__backdrop";let Ie=document.createElement("div");Ie.className="worker-drawer-host mon2-drawer",Oe.append(qe,Ie),e.appendChild(Oe);let ge=Ir(null,null),F=new Map,ce=new Map,pe=new Set,B=null,U=null,Re=null,W=zs(Ie,{transport:i,sessionLogStore:t.sessionLogStore,onClose:()=>{N=null,Oe.hidden=!0,X()}}),te=Ha({transport:i,console_el:de,getLanes:()=>ge,getWorkspaces:()=>s&&s.get?s.get():null,getCrossLanes:an,reproject:p=>({lanes:K(p),raw_lanes:p}),onCorrection:me,showToast:be,requestRender:()=>X(),adoptQueue:(p,f)=>{ce.set(p,f)},onDragBegin:()=>{D=null},candidate_drop:!0}),{applyDrop:J,dropModel:Y,runPlanned:ke,sendQueueCas:fe}=te;async function Le(p,f,x,S,Z=!0){if(!i||!x)return null;let ae=await i(p,{...f,root_dir:x,expected_revision:S});if(ae&&ae.conflict&&Z){ae.queue&&ce.set(x,ae.queue);let he=ae.queue&&typeof ae.queue.revision=="number"?ae.queue.revision:S;ae=await i(p,{...f,root_dir:x,expected_revision:he})}return ae&&ae.queue&&x&&ce.set(x,ae.queue),ae}function Ne(p){let f=ce.get(p);if(f)return f;let x=s&&s.get?s.get():null;return(Array.isArray(x)?x:[]).find(S=>S?.root_dir===p)||{}}function Je(p,f){return Ne(p)?.merge_queue?.find(S=>S.bead_id===f)?.continuation_action}async function Be(p,f,x,S){let Z=await Le(p,f,x,S),ae=ce.get(x)?.revision??Z?.queue?.revision??S;return Dr(Z,(he,Ue)=>Le(p,{...f,continuation:he,decision_token:Ue},x,ae,!1),{refresh:he=>Le(p,f,x,he?.queue?.revision??ce.get(x)?.revision??ae,!1)})}async function re(p,f,x,S){let Z=await Dr({continuation_mismatch:S},(he,Ue)=>Le("worker-merge-queue-add",{bead_id:f,continuation:he,decision_token:Ue},p,x,!1)),ae=Z?.queue?.merge_queue?.find(he=>he.bead_id===f)?.continuation_action;Z?.applied!==!0&&ae?.continuation===null&&ae.mismatch&&await re(p,f,Z.queue.revision,ae.mismatch)}async function Q(p,f,x){let S=await Le("worker-discard",p,f,x);if(S&&S.discarded===!0){be(Xi(S),"success",5e3);return}if(S&&S.reason){be(`\uD3D0\uAE30 \uC2E4\uD328: ${S.reason}`,"error");return}if(S&&S.accepted&&S.pending==="merged_revert"){be("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success");return}if(S&&S.accepted){be(`\uD3D0\uAE30 \uC9C4\uD589: ${S.phase||"\uBC31\uC5C5 \uC911"}`,"success");return}S&&!S.conflict&&be("\uD3D0\uAE30 \uAC70\uBD80: unknown","error")}async function Te(p,f,x,S){let Z=await Le("worker-discard-abandon",p,f,x);if(Z&&Z.abandoned===!0){be(Yi(S),"success",5e3);return}if(Z&&Z.reason){be(`\uD3D0\uAE30 \uD3EC\uAE30 \uAC70\uBD80: ${Z.reason}`,"error");return}Z&&!Z.conflict&&be("\uD3D0\uAE30 \uD3EC\uAE30 \uAC70\uBD80: unknown","error")}async function et(p,f,x){return!i||!x?null:await i(p,{...f,root_dir:x})}async function dt(p,f,x){if(!pe.has(p)){pe.add(p),X();try{let S=await Le("worker-resolve-in-session",{bead_id:p},f,x,!1);S?.session==="already_running"?be(`\uC774\uBBF8 \uC5F4\uB824 \uC788\uC2B5\uB2C8\uB2E4 \xB7 ${S.tmux_window||"?"}`,"error"):S?.launched!==!0?be(`\uC138\uC158 \uAE30\uB3D9 \uC2E4\uD328: ${S?.reason||"unknown"}`,"error"):S.mode!=="fork"&&be(`${typeof S.runner=="string"?S.runner:"claude"} \uC0C8 \uC138\uC158\uC73C\uB85C \uC2DC\uC791 (${S.fallback_reason||"unknown"})`,"success")}finally{pe.delete(p),X()}}}async function Qe(){let p=new Map;for(let f of ge.pr_wait)p.has(f.root_dir)||p.set(f.root_dir,f.expected_revision);for(let[f,x]of p)await Le("worker-merge-queue-add-all",{},f,x)}function gt(p){let f=k[p];return!!(f&&f.runnable===!0)}function Pt(p){let f={...k[p]||{}};f.runnable=!f.runnable,k={...k,[p]:f},w$(k),X()}function St(p){ee.toggle(p),X()}function ot(p){ee.toggleArea(p),X()}function ht(p){let f=p.dependency_chips||null,x=p.overlap_chips||[],S=p.scope_state==="missing",Z=p.armed_lane_chip;return!f&&x.length===0&&!S&&!Z?null:{...f||{},...x.length>0?{overlaps:x}:{},...S?{scope_missing:!0}:{},...Z?{armed_lane:Z}:{}}}function Jt(p){return ra(p,f=>P.isOpen({bead_id:p.id,chip_key:f}))}function w(p){let f=ht(p),x=Jt(p);return f||x?{...p,...f?{dependency_chips:f}:{},...x?{chip_popover:x}:{}}:p}function se(p){let f=gt(p.root_dir);return c`<header class="mon2-sec__hd">
      <button
        type="button"
        class="mon2-sec__toggle"
        data-root-dir=${p.root_dir}
        data-section="runnable"
        aria-expanded=${f?"false":"true"}
        aria-label=${`${p.name} \uC139\uC158 ${f?"\uD3BC\uCE58\uAE30":"\uC811\uAE30"}`}
      >
        ${f?"\u25B8":"\u25BE"}
      </button>
      <span class="mon2-sec__name" title=${p.root_dir}>${p.name}</span>
      <span class="mon2-sec__count">${p.count}</span>
      <button
        type="button"
        class="mon2-sec__worker"
        data-root-dir=${p.root_dir}
        title="이 레포의 Worker 탭으로 이동"
      >
        Worker ↗
      </button>
    </header>`}function De(p,f){return c`<div
      class="mon2-item"
      data-bead-id=${p.id}
      data-drag-kind="candidate"
      data-root-dir=${p.root_dir}
    >
      ${f}
    </div>`}function Se(p){if(D!==p.id)return null;let f=ge.queue_groups.find(ae=>ae.root_dir===p.root_dir),x=p.place_lanes||[],S=ge.cross_lanes_revision!==null,Z=[{id:"parallel",label:"\uBCD1\uB82C",count:p.place_index??0}];for(let ae of ge.chain_lanes)Z.push({id:`lane:${ae.lane_id}`,label:`\uC5F0\uACB0 ${ae.number} (${ae.draft?"draft":"\uD655\uC815"}) \uB05D\uC5D0`,count:ae.rows.length,group:"\uC5F0\uACB0 \uB808\uC778",disabled:!S});Z.push({id:"new-lane",label:"+ \uC0C8 \uC5F0\uACB0 \uB808\uC778",group:"\uC5F0\uACB0 \uB808\uC778",disabled:!S,title:S?"\uC774 \uC774\uC288\uB9CC \uB4E0 draft \uB808\uC778\uC744 \uB9CC\uB4ED\uB2C8\uB2E4":"\uC5F0\uACB0 \uB808\uC778 \uC800\uC7A5\uC18C\uB97C \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"});for(let ae of x)Z.push({id:`serial:${ae.id}`,label:`\uC9C1\uB82C ${Number(ae.id.slice(1))}`,count:ae.length,group:`${f?f.name:""} \uC9C1\uB82C`});return{bead_id:p.id,lanes:Z}}function Me(p){return De(p,c`${Yl(w(p),Se(p),{exec_chips_mode:"pinned_only",onOpenDoc:a?(f,x)=>a(x,p.root_dir):void 0})}`)}function We(){return ge.runnable_flat?c`<div class="mon2-flat" data-drop="candidate">
        ${ge.runnable.map(p=>Me(p))}
      </div>`:c`${ge.runnable_sections.map(p=>{let f=gt(p.root_dir);return c`<section
        class="mon2-sec${f?" is-collapsed":""}"
        data-root-dir=${p.root_dir}
        data-section="runnable"
      >
        ${se({root_dir:p.root_dir,name:p.name,count:p.items.length})}
        ${f?"":c`<div
              class="mon2-sec__body"
              data-lane="candidate"
              data-drop="candidate"
            >
              ${p.items.map(x=>Me(x))}
            </div>`}
      </section>`})}`}function tt(p,f){return c`<div
      class="mon2-item"
      data-bead-id=${p.id}
      data-drag-kind="parallel"
      data-root-dir=${p.root_dir}
      data-row-index=${f}
      data-queue-index=${String(p.queue_index??0)}
    >
      ${Hn(w(p),{actions:Ms(p,{nudgeable:!0})})}
    </div>`}function It(p,f,x,S){return c`<div
      class="mon2-crow${f.fixed?" mon2-crow--fixed":""}"
      draggable=${f.draggable?"true":"false"}
      data-bead-id=${f.id}
      data-drag-kind="chain"
      data-root-dir=${f.root_dir}
      data-lane-id=${p.lane_id}
      data-row-index=${x}
      data-queue-index=${typeof f.queue_index=="number"?String(f.queue_index):""}
    >
      <span class="mon2-crow__seq" aria-hidden="true"
        >${R$(f.seq)}</span
      >
      ${f.workspace_name?c`<span class="worker-mini__repo" title=${f.root_dir}
            >${f.workspace_name}</span
          >`:""}
      <span class="worker-mini__id" title="클릭하면 ID 복사">${f.id}</span>
      <span class="mon2-crow__title">${f.title}</span>
      ${f.mismatch?c`<span
            class="mon2-crow__mismatch"
            title="레인 순서가 주장하는 선행이 bd 의존에 없습니다 — 재적용으로 복구합니다"
            >⚠ 의존 없음</span
          >`:""}
      ${S.includes(f.id)?c`<span
            class="mon2-crow__mismatch"
            title="이미 실행된 뒤 의존이 바뀌었습니다 — 이 행은 움직일 수 없어 교정하지 않습니다"
            >⚠ 의존 순서와 다름</span
          >`:""}
      <span class="mon2-crow__where" title=${f.location_title}
        >${f.location_label}</span
      >
      ${ts(f.route?{route:f.route,route_source:f.route_source??void 0}:null)}${f.exec_chips?es(f.exec_chips):""}
      ${Hl(f.added_at)}
      ${zl({id:f.id,...typeof f.added_at=="number"?{added_at:f.added_at}:{}})}
      <button
        type="button"
        class="mon2-crow__detach"
        data-bead-id=${f.id}
        title="연결에서 빼고 앞뒤를 이어 붙입니다"
        aria-label="연결에서 빼기"
      >
        ✕
      </button>
    </div>`}function _e(p){let f=ge.cross_lanes_revision!==null,x=ue(p.lane_id),S=x?.held===!0,Z=x?.cycle===!0,ae=x?x.mismatched:[],he=O&&O.lane_id===p.lane_id?O.corrected:0;return c`<div class="mon2-clane" data-lane-id=${p.lane_id}>
      <header class="mon2-clane__hd">
        <span class="mon2-clane__name">${p.label}</span>
        <span class="mon2-clane__count">${p.rows.length}</span>
        <span class="mon2-clane__badge mon2-clane__badge--${p.state}"
          >${p.badge}</span
        >
        ${he>0?c`<span
              class="mon2-clane__corrected"
              title="기존 blocks 의존이 드롭 순서를 이깁니다 — 그 순서로 다시 놓았습니다"
              >의존에 맞춰 ${he}건 자동 교정</span
            >`:""}
        ${Z?c`<span
              class="mon2-clane__cycle"
              title="멤버들의 blocks 의존이 순환합니다 — 어느 순서도 의존을 만족시키지 못합니다"
              >⛔ 의존 사이클 — 자동 교정 불가</span
            >`:""}
        ${S?c`<span
              class="mon2-clane__hold"
              title="멤버 한 명의 의존 자료가 이 스냅샷에 아직 없습니다 — 다음 스냅샷이 채우면 교정합니다"
              >${ya}</span
            >`:""}
        ${p.draft?c`<button
              type="button"
              class="mon2-clane__confirm"
              data-lane-id=${p.lane_id}
              ?disabled=${!f||!p.can_confirm||S}
              title=${S?ya:p.can_confirm?"\uC778\uC811 \uC758\uC874\uC744 \uAC78\uACE0 \uBBF8\uC801\uC7AC \uBA64\uBC84\uB97C \uAC01\uC790 \uB808\uD3EC \uBCD1\uB82C \uD050 \uB05D\uC5D0 \uC62C\uB9BD\uB2C8\uB2E4":"\uBA64\uBC84\uAC00 2\uAC1C \uC774\uC0C1\uC774\uC5B4\uC57C \uD655\uC815\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4"}
            >
              확정
            </button>`:""}
        ${p.run_label!==null?c`<button
              type="button"
              class="mon2-clane__run"
              data-lane-id=${p.lane_id}
              ?disabled=${!f}
              title="이 레인 멤버만 발차합니다 — 레포 자동 진행은 켜지 않습니다"
            >
              ${p.run_label}
            </button>`:""}
        ${p.state==="confirmed"&&p.has_mismatch?c`<button
              type="button"
              class="mon2-clane__reapply"
              data-lane-id=${p.lane_id}
              ?disabled=${!f}
              title="빠진 인접 의존을 다시 걸고 미적재 멤버를 다시 올립니다"
            >
              재적용
            </button>`:""}
        ${p.can_stop?c`<button
              type="button"
              class="mon2-clane__stop"
              data-lane-id=${p.lane_id}
              ?disabled=${!f}
              title="남은 멤버의 발차만 멈춥니다 — 도는 세션과 머지 큐 항목은 끝까지 갑니다"
            >
              ⏸ 정지
            </button>`:""}
        <button
          type="button"
          class="mon2-clane__remove"
          data-lane-id=${p.lane_id}
          ?disabled=${!f}
          title=${p.draft?"\uC774 draft \uB808\uC778\uC744 \uC9C0\uC6C1\uB2C8\uB2E4":"\uC774 \uB808\uC778\uACFC \uB808\uC778\uC774 \uB9CC\uB4E0 \uC758\uC874\uC744 \uD568\uAED8 \uC9C0\uC6C1\uB2C8\uB2E4"}
          aria-label="연결 레인 삭제"
        >
          ✕
        </button>
      </header>
      <div
        class="mon2-clane__body"
        data-drop="chain"
        data-lane-id=${p.lane_id}
      >
        ${p.rows.length===0?c`<div class="mon2-clane__hint">
              여기로 끌어다 놓으면 연결이 시작됩니다
            </div>`:p.rows.map((Ue,He)=>It(p,Ue,He,ae))}
      </div>
    </div>`}function xe(p,f,x){return c`<div
      class="mon2-item"
      data-bead-id=${f.id}
      data-drag-kind="repo-serial"
      data-root-dir=${f.root_dir}
      data-lane-id=${p.id}
      data-row-index=${x}
      data-queue-index=${String(f.queue_index??0)}
    >
      ${Hn(w(f),{actions:Ms(f)})}
    </div>`}function Ze(p){if(p.length===0)return"";let f=p.length-1;return`${p[0].id} \uC810\uC720${f>0?` +${f}`:""}`}function yt(p){return c`<div
      class="mon2-item mon2-item--ghost"
      data-bead-id=${p.id}
    >
      ${Hn({id:p.id,title:p.title,lane:"running",draggable:!1,ghost:!0,badges:[p.badge]})}
    </div>`}function it(p,f){let x=f.occupants,S=f.cross_wait_peers||[];return{id:f.id,pane_id:"",title:`${p.name} \xB7 \uC9C1\uB82C ${f.index+1}`,rows:[...x.map(Z=>yt(Z)),...f.items.map((Z,ae)=>xe(f,Z,ae))],count:f.items.length,empty:f.empty===!0,...x.length>0?{badge:c`<span
              class="mon2-lane__occupant"
              title=${x.map(Z=>`${Z.id} \u2014 ${Z.badge}`).join(`
`)}
              >${Ze(x)}</span
            >`,held:!0}:{},cycle:f.cycle,header_control:c`<button
        type="button"
        class="mon2-sec__worker"
        data-root-dir=${p.root_dir}
        title="이 레포의 Worker 탭으로 이동"
      >
        Worker ↗
      </button>`,...S.length>0?{after:c`${S.map(Z=>c`<div class="mon2-lane__cross-wait">
                  ⚠ 상호 정지 — ${Z.workspace_name}·${Z.lane}과 교차 대기
                </div>`)}`}:{}}}function ut(){let p=ge.cross_lanes_revision!==null,f=ge.chain_lanes.some(x=>x.draft&&x.rows.length===0);return sa({parallel:{rows:ge.parallel_rows.map((x,S)=>tt(x,S)),count:ge.parallel_rows.length,collapsed:ee.isAreaCollapsed("parallel"),drop:{drop:"parallel"}},serial:{lanes:ge.queue_groups.flatMap(x=>x.sublanes.serial.map(S=>({...it(x,S),drop:{drop:"repo-serial",root_dir:x.root_dir,lane_id:S.id,lane_length:String(S.raw_length)}}))),collapsed:ee.isAreaCollapsed("serial"),extra_panes:ge.chain_lanes.map(x=>_e(x)),header_control:c`<button
          type="button"
          class="mon2-newlane"
          ?disabled=${f||!p}
          title=${p?f?"\uBE48 \uC5F0\uACB0 \uB808\uC778\uC774 \uC774\uBBF8 \uC788\uC2B5\uB2C8\uB2E4":"\uBE48 \uC5F0\uACB0 \uB808\uC778\uC744 \uD558\uB098 \uB9CC\uB4ED\uB2C8\uB2E4":"\uC5F0\uACB0 \uB808\uC778 \uC800\uC7A5\uC18C\uB97C \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"}
        >
          + 연결 레인
        </button>`,...ge.cross_lanes_unreadable?{notice:c`<div class="mon2-clane__unreadable">
                연결 레인 저장소를 읽을 수 없음
              </div>`}:{}}})}function bt(p){return c`<div class="worker-rungrid">
      ${ge.running.length===0?c`<div class="worker-rungrid__empty">실행 세션 없음</div>`:ge.running.map(f=>ru({bead_id:f.id,attempt_id:f.attempt_id||"",title:f.title,runner:f.runner??null,model:f.model??null,effort:f.effort??null,speed:f.speed??null,started_at:f.started_at??null,kind:f.kind,...f.kind==="session"?{updated_at:f.updated_at,session_refs:f.session_refs||[]}:{},workflow:f.workflow||null,resumed_from:f.resumed_from??null,continuation_mode:f.continuation_mode??null,paused:f.run_state==="paused",failed:f.run_state==="failed",parked:f.run_state==="parked",retry_wait:f.run_state==="retry_wait",waiting:f.run_state==="waiting",wait:f.wait||null,provider_hold:f.run_state==="provider_hold",hold:f.hold?{...f.hold,open:q===f.attempt_id}:null,retry:f.retry||null,status:f.status,status_label:f.run_state==="failed"?"\uC2E4\uD328":f.run_state==="parked"?"\uC138\uC158 \uB300\uAE30":f.run_state==="retry_wait"?"\uC7AC\uC2DC\uB3C4 \uB300\uAE30":f.run_state==="waiting"?"\uC120\uD589 \uB300\uAE30":f.run_state==="provider_hold"?"\uACF5\uAE09\uC790 \uBCF4\uB958":void 0,can_pause:f.can_pause!==!1,...f.instructions_restart?{instructions_restart:f.instructions_restart}:{},exec_chips:f.exec_chips||null,usage:f.usage||null,chip_popover:Jt(f),discard:f.discard,failure:f.failure?{...f.failure,open:M===f.attempt_id}:null,...Ys(f.id,{discard:f.discard,parked:f.run_state==="parked"},pe.has(f.id))},p,N,{monitor:{repo:f.workspace_name,root_dir:f.root_dir,serial_lane_id:f.serial_lane_id,cross_lane_chip:f.cross_lane_chip||null,last_activity:f.last_activity||null,legs:f.legs||[],dependency_chips:ht(f)}}))}
    </div>`}function st(p){let f={runnable:ge.runnable,queue:ge.queue,running:ge.running,pr_wait:ge.pr_wait,done:ge.done},x=S=>{let Z=f[S.lane],ae=S.lane==="runnable"?ge.runnable_flat?Z.length>0?We():void 0:ge.runnable_sections.length>0?We():void 0:S.lane==="queue"?ge.queue_groups.length>0||ge.chain_lanes.length>0||ge.parallel_rows.length>0||ge.cross_lanes_unreadable?ut():void 0:S.lane==="running"?bt(p):Z.length>0?c`${Z.map(he=>Hn(w(he)))}`:void 0;return nr({id:`monitor-${S.lane}`,lane:S.pane,title:S.title,items:Z,count:Z.length,src:S.lane==="runnable",empty:S.empty,body:ae,live:S.lane==="running"&&Z.length>0,collapsible:!0,collapsed:ee.isCollapsed(S.pane),controls:S.lane==="runnable"?ze():void 0,header_control:E(S.lane,Z.length)})};if(ne){let S=T$.map(Z=>bm.find(ae=>ae.lane===Z)).filter(Z=>Z!==void 0);return c`<div class="mon2-deck"></div>
        <div class="worker-lanes-host">
          <div class="worker-lanes worker-lanes--mobile mon2-lanes">
            ${oa({live:ge.running.length>0,running_body:ge.running.length>0?bt(p):"",pr_wait_rows:ge.pr_wait.map(Z=>Hn(w(Z))),count:ge.running.length+ge.pr_wait.length})}
            ${S.map(Z=>x(Z))}
          </div>
        </div>
        ${Vs(G?.draft||null,G?Ne(G.root_dir):{})}`}return c`<div class="mon2-deck"></div>
      <div class="worker-lanes-host">
        <div class="worker-lanes mon2-lanes">
          ${bm.map(S=>x(S))}
        </div>
      </div>
      ${Vs(G?.draft||null,G?Ne(G.root_dir):{})}`}function ze(){return c`<div class="worker-filter">
      <label class="worker-filter__tgl" title="blocked 이슈 표시">
        <input
          type="checkbox"
          class="mon-filter__blocked"
          .checked=${g.show_blocked}
        />
        🔒
        blocked${ge.runnable_hidden.blocked>0?` ${ge.runnable_hidden.blocked}`:""}
      </label>
      <div
        class="worker-filter__readiness"
        role="group"
        aria-label="준비도 필터"
      >
        ${Oo.map(p=>c`<button
              type="button"
              class="mon-filter__readiness worker-filter__chip${g.readiness===p.value?" is-active":""}"
              data-readiness=${p.value}
              aria-pressed=${g.readiness===p.value?"true":"false"}
            >
              ${p.label}
            </button>`)}
        ${ge.runnable_hidden.readiness>0?c`<span class="worker-filter__hidden"
              >숨김 ${ge.runnable_hidden.readiness}</span
            >`:""}
      </div>
      <div class="worker-filter__routes" role="group" aria-label="route 필터">
        ${ss.map(p=>c`<button
              type="button"
              class="mon-filter__route worker-filter__chip${g.routes.includes(p.value)?" is-active":""}"
              data-route=${p.value}
              aria-pressed=${g.routes.includes(p.value)?"true":"false"}
            >
              ${p.label}
            </button>`)}
        ${ge.runnable_hidden.route>0?c`<span class="worker-filter__hidden"
              >숨김 ${ge.runnable_hidden.route}</span
            >`:""}
      </div>
    </div>`}function E(p,f){return p==="runnable"?c`<select
        class="mon-candidate-sort worker-sort"
        aria-label="후보 정렬"
        title="후보 정렬"
        .value=${T}
      >
        ${Co.map(x=>c`<option
              value=${x.value}
              ?selected=${T===x.value}
            >
              ${x.label}
            </option>`)}
      </select>`:p==="running"?c`<select
        class="mon-running-sort worker-sort"
        aria-label="실행중 정렬"
        title="실행중 정렬"
        .value=${h}
      >
        <option value="started" ?selected=${h==="started"}>
          시작순
        </option>
        <option value="repo" ?selected=${h==="repo"}>
          레포순
        </option>
      </select>`:p==="pr_wait"&&f>0?c`<button
        type="button"
        class="mon-lane-op mon-merge-all"
        title="자격이 생기는 PR을 각 레포의 머지 큐에 한 번에 넣습니다"
      >
        일괄 머지
      </button>`:p==="done"?c`<select
        class="mon-done-range worker-sort"
        aria-label="완료 기간"
        title="완료 기간"
        .value=${m}
      >
        ${fs.map(x=>c`<option value=${x.value} ?selected=${m===x.value}>
              ${x.label}
            </option>`)}
      </select>`:""}function K(p){let f=s&&s.get?s.get():null,x=s&&s.getWorkspacesState?s.getWorkspacesState():[],S=p===void 0?s&&s.crossLanes?s.crossLanes():void 0:p,Z={done_since:Kr(m,d()),running_sort:h,candidate_filter:g,candidate_sort:T};return S!==void 0&&(Z.cross_lanes=S),Ir(f,x,Z)}function X(){if(e.hidden)return;let p=d();ge=K(),oe=null,F=new Map;for(let f of[...ge.runnable,...ge.queue,...ge.running,...ge.pr_wait,...ge.done])!f.non_occupying&&!F.has(f.id)&&F.set(f.id,f);ct(st(p),de),Va(de),ye()?.render(),Ee(),wt()}function Ee(){let p=new Map;for(let f of ge.queue_groups)p.set(f.root_dir,f.auto_advance);for(let f of Array.from(de.querySelectorAll(".worker-wait__area--parallel .worker-mini__repo"))){let x=f.closest(".mon2-item")?.getAttribute("data-root-dir")||"",S=p.get(x);typeof S=="boolean"&&f.setAttribute("title",`${f.textContent||""} \xB7 ${S?"\uC790\uB3D9\uD654 \uCF1C\uC9D0":"\uC790\uB3D9\uD654 \uAEBC\uC9D0"}`)}}function ye(){if(Re)return Re;let p=de.querySelector(".mon2-deck");return p?(Re=hm(p,{workspacesState:()=>s&&s.getWorkspacesState?s.getWorkspacesState():[],doneItems:()=>ge.done,rangeLabel:ie,transport:i,implPresetStore:t.execPresetStore,gotoWorkerTab:Rt,onFocusChange:f=>{$=f,wt()}}),Re):null}function wt(){de.classList.toggle("has-focus",$!==null);for(let p of Array.from(de.querySelectorAll(".mon2-sec[data-root-dir]")))p.classList.toggle("is-focus",$!==null&&p.getAttribute("data-root-dir")===$);for(let p of Array.from(de.querySelectorAll(".mon2-item[data-bead-id], .rtile[data-bead-id], .worker-mini[data-bead-id], .worker-card[data-bead-id]"))){let f=F.get(p.getAttribute("data-bead-id")||"");p.classList.toggle("is-focus",$!==null&&!!f&&f.root_dir===$)}for(let p of Array.from(de.querySelectorAll(".mon2-crow[data-root-dir]")))p.classList.toggle("is-focus",$!==null&&p.getAttribute("data-root-dir")===$)}function kt(p,f){let x=o?o():void 0;if(!f||!x||f===x||!l){r(p);return}l(f).then(()=>{r(p)}).catch(S=>{n("workspace switch for %s failed: %o",f,S)})}function Rt(p){if(!p)return;let f=o?o():void 0,x=()=>{try{u?.gotoView("worker")}catch(S){n("gotoView(worker) failed: %o",S)}};if(!l||f&&f===p){x();return}l(p).then(x).catch(S=>{n("workspace switch for %s failed: %o",p,S),be("\uB808\uD3EC \uC804\uD658\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error")})}function jt(p){$n(p).then(f=>{be(f?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",f?"success":"error",1400)})}function Wt(p){let f=F.get(p)||null;return{item:f,root_dir:f?f.root_dir:"",revision:f?f.expected_revision:0}}async function Xt(p,f,x){if(p!=="dep-add")return;let S=ge.chain_lanes.find(Z=>Z.rows.some(ae=>ae.id===f));!S||!S.rows.some(Z=>Z.id===x)||await ke(Z=>Af(S.lane_id,Z),"",[{type:p,a:f,b:x}])}function an(){return(s&&s.crossLanes?s.crossLanes():null)??null}async function $t(p,f){if(p==="run"){await fn(f);return}if(p==="stop"){await qt(f);return}if(p==="create"){await ke(x=>hc(null,x),"");return}if(p==="remove"){let x=Ef(f,Y());if(x!==null&&!_(x))return;await ke(S=>Sf(f,S),"");return}await ke(x=>p==="confirm"?$f(f,x):xf(f,x),"")}function rn(p){let f=new Map;for(let x of p.rows){let S=ge.owner_of[x.id]||x.root_dir;typeof S!="string"||S.length===0||f.set(S,[...f.get(S)||[],x.id])}return f}async function fn(p){let f=ge.chain_lanes.find(ae=>ae.lane_id===p);if(!f||ge.cross_lanes_revision===null){X();return}V();let x=new Map,S=new Map,Z=rn(f);for(let ae of f.rows){if(ae.fixed||!ae.unplaced)continue;let he=ge.owner_of[ae.id]||ae.root_dir;if(typeof he!="string"||he.length===0){be(`${ae.id}\uC758 \uB808\uD3EC\uB97C \uC54C \uC218 \uC5C6\uC5B4 \uC801\uC7AC\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4`,"error"),X();return}let Ue=S.get(he)??0;if(await fe("worker-queue-place",{bead_id:ae.id,lane:"parallel",index:(ge.parallel_raw_length[he]??0)+Ue},he,x,{bead_id:ae.id})===null){X();return}S.set(he,Ue+1)}for(let[ae,he]of Z)if(await fe("worker-queue-arm",{bead_ids:he,lane_id:p},ae,x,{bead_id:he[0]})===null){be("\uC77C\uBD80 \uB808\uD3EC\uC5D0\uC11C \uC9C4\uD589\uC744 \uCF1C\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 \u2014 [\u25B6 \uC774\uC5B4\uC11C \uC9C4\uD589]\uC73C\uB85C \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC138\uC694","error"),X();return}X()}async function qt(p){let f=ge.chain_lanes.find(S=>S.lane_id===p);if(!f||ge.cross_lanes_revision===null){X();return}V();let x=new Map;for(let[S,Z]of rn(f))if(await fe("worker-queue-disarm",{lane_id:p},S,x,{bead_id:Z[0]})===null)break;X()}async function Gt(p,f){if(!i||!p||f.length===0){X();return}let x=await i("worker-queue-start-now",{bead_id:p,root_dir:f});x&&x.queue&&ce.set(f,x.queue),x&&x.ok===!1&&be(`\uC9C0\uAE08 \uC2DC\uC791 \uAC70\uBD80: ${x.reason==="not_waiting"?"\uC774 \uC774\uC288\uB294 \uB354 \uC774\uC0C1 \uB300\uAE30 \uB808\uC778\uC5D0 \uC5C6\uC2B5\uB2C8\uB2E4":x.reason||""}`,"error",2800),X()}async function sn(p,f){let{root_dir:x,revision:S}=Wt(p);if(x.length===0){X();return}await fe("worker-queue-disarm",{bead_ids:[p],lane_id:f},x,new Map([[x,S]]),{bead_id:p}),X()}async function Ke(p,f){let x=F.get(p);if(!x){X();return}let S={kind:"candidate",bead_id:p,root_dir:x.root_dir};if(f==="new-lane"){await ke(Z=>hc({bead_id:p,root_dir:x.root_dir},Z),p);return}if(f.startsWith("lane:")){let Z=f.slice(5);if(!ge.chain_lanes.find(he=>he.lane_id===Z)){X();return}await ke(he=>ka(S,{kind:"chain",lane_id:Z,marker_index:(he.cross_lanes.get(Z)?.entries??[]).length},he),p);return}if(f.startsWith("serial:")){let Z=f.slice(7),ae=(x.place_lanes||[]).find(he=>he.id===Z);await J(S,{kind:"repo-serial",root_dir:x.root_dir,lane_id:Z,index:ae?ae.index:0});return}await J(S,{kind:"parallel",marker_index:ge.parallel_rows.length})}async function L(p,f){let x=ge.parallel_rows,S=x.findIndex(pt=>pt.id===p);if(S<0)return;let Z=x[S].root_dir,ae=[];x.forEach((pt,Ft)=>{pt.root_dir===Z&&ae.push(Ft)});let he=ae.indexOf(S),Ue=ae[he+f];if(typeof Ue!="number")return;let He=f===-1?Ue:ae[he+2]??Math.min(x.length,Ue+1);await J({kind:"parallel",bead_id:p,root_dir:Z,queue_index:x[S].queue_index??0},{kind:"parallel",marker_index:He})}async function ve(p){for(let f of ge.chain_lanes){let x=f.rows.find(S=>S.id===p);if(x){await J({kind:"chain",bead_id:p,root_dir:x.root_dir,lane_id:f.lane_id,...typeof x.queue_index=="number"?{queue_index:x.queue_index}:{}},{kind:"parallel",marker_index:ge.parallel_rows.length});return}}}function je(p){return{runner:p.runner||void 0,model:p.model||void 0,effort:p.effort||void 0,status:p.run_state==="running"?"running":p.run_state,worktree:p.root_dir}}function xt(p,f,x,S,Z={}){let ae=F.get(p)||null;Fs({context:{bead_id:p,kind:S,tuple:ae?Ln(ae):""},transport:he=>Le("worker-attempt-resume",{attempt_id:f,...Z,...he},x,ce.get(x)?.revision??Wt(p).revision,!1)})}function Ve(p,f,x,S){let Z=Ne(x)?.attempts?.[f]||null;ba({context:{bead_id:p,kind:S,attempt_id:f,tuple:Z?ji(Z):""},pause:()=>et("worker-attempt-pause",{attempt_id:f,require_durable:!0},x),resume:ae=>Le("worker-attempt-resume",{attempt_id:f,...ae},x,ce.get(x)?.revision??Wt(p).revision,!1),snapshot:()=>Ne(x)})}function Dt(){G=null,X()}function Ht(){let p=G,f=p?Ga(p.draft):null;!p||!f||(G=null,X(),xt(p.bead_id,f.attempt_id,p.root_dir,"session",f.payload))}function at(p,f){let{item:x,root_dir:S,revision:Z}=Wt(f),ae=x?.attempt_id||"",he=p.classList;if(he.contains("worker-mini__rowops-up")||he.contains("worker-mini__rowops-down")){L(f,he.contains("worker-mini__rowops-up")?-1:1);return}if(he.contains("worker-mini__rowops-remove")){Le("worker-queue-remove",{bead_id:f},S,Z);return}if(he.contains("worker-mini__start-now")){Gt(f,S);return}if(he.contains("mon2-crow__detach")){ve(f);return}if(he.contains("worker-dep__open")){kt(p.getAttribute("data-dep-id")||"",p.getAttribute("data-root-dir")||"");return}if(he.contains("mon2-arm__release")){sn(f,p.getAttribute("data-lane-id")||"");return}if(he.contains("mon-lane__chip")){let Ue=p.getAttribute("data-lane-id")||"";de.querySelector(`.mon2-clane[data-lane-id="${Ue}"]`)?.scrollIntoView({block:"nearest"});return}if(he.contains("judgement-chip")){let Ue=p.getAttribute("data-chip-key")||"";Ue&&P.toggle({bead_id:f,chip_key:Ue});return}if(he.contains("rtile__failure-badge")){M=M===ae?null:ae,X();return}if(he.contains("rtile__provider-hold-badge")){q=q===ae?null:ae,X();return}if(he.contains("rtile__attempt-copy")){let Ue=p.getAttribute("data-attempt-id")||"";Ue&&$n(Ue).then(He=>{be(He?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",He?"success":"error",1400)});return}if(he.contains("worker-card__place")){D=D===f?null:f,X();return}if(he.contains("worker-card__place-cancel")){D=null,X();return}if(he.contains("worker-card__place-lane")){let Ue=p.getAttribute("data-lane")||"parallel";D=null,Ke(f,Ue);return}if(he.contains("rtile__session")){if(x&&x.kind==="session"){let Ue=(x.session_refs||[]).find(He=>He&&He.current===!0);Ue&&(Oe.hidden=!1,W.open(Bs(Ue,f,"in_progress",S)),X());return}N=ae,ae&&x&&(Oe.hidden=!1,W.open({attempt_id:ae,root_dir:S,meta:je(x)})),X();return}if(he.contains("rtile__restart-instructions")){Ve(f,ae,S,"restart");return}if(he.contains("rtile__resume-instructions")){Ve(f,ae,S,"resume_recorded");return}if(he.contains("rtile__pause")){et("worker-attempt-pause",{attempt_id:ae},S);return}if(he.contains("rtile__resume-alternate")){let Ue=za(ae,Ne(S));Ue&&(G={root_dir:S,bead_id:f,draft:Ue},X());return}if(he.contains("rtile__resume")){xt(f,ae,S,p.dataset.resumeKind==="settlement"?"settlement":"session");return}if(he.contains("rtile__resolve")){dt(f,S,ce.get(S)?.revision??Wt(f).revision);return}if(he.contains("rtile__discard-abandon")){let Ue={kind:p.dataset.operationKind||"",last_error:p.dataset.lastError||""};if(!_(So(f,Ue)))return;Te({bead_id:f,operation_id:p.dataset.operationId||""},S,Z,Ue);return}if(he.contains("rtile__discard")){let Ue=p.dataset.confirmation==="merged"?"merged":"unmerged";if(!_(Ao(f,Ue)))return;Q({bead_id:f,...ae?{attempt_id:ae}:{},...p.dataset.operationId?{operation_id:p.dataset.operationId}:{}},S,Z);return}if(he.contains("worker-mini__merge")){let Ue=Je(S,f);Ue?.mismatch&&Ue.continuation===null?re(S,f,Z,Ue.mismatch):Le("worker-merge-queue-add",{bead_id:f},S,Z);return}if(he.contains("worker-mini__merge-cancel")){Le("worker-merge-queue-remove",{bead_id:f},S,Z);return}if(he.contains("worker-mini__discard-abandon")){let Ue={kind:p.dataset.operationKind||"",last_error:p.dataset.lastError||""};if(!_(So(f,Ue)))return;Te({bead_id:f,operation_id:p.dataset.operationId||""},S,Z,Ue);return}if(he.contains("worker-mini__discard")){let Ue=p.dataset.discardMode==="merged"?"merged":"unmerged";if(!_(Ao(f,Ue)))return;Q({bead_id:f,...p.dataset.attemptId?{attempt_id:p.dataset.attemptId}:{},...p.dataset.operationId?{operation_id:p.dataset.operationId}:{}},S,Z);return}if(he.contains("worker-mini__revise-fix")){Be("worker-revise-fix",{bead_id:f},S,Z);return}he.contains("worker-mini__revise-approve")&&Le("worker-revise-approve",{bead_id:f},S,Z)}function Ct(p){let f=te.consumeClickSuppression(),x=p.target;if(!x||typeof x.closest!="function")return;if(x.closest(".provider-resume-dialog__cancel")){Dt();return}if(x.closest(".provider-resume-dialog__confirm")){Ht();return}if(x.closest("dialog")||x.closest(".worker-drawer-overlay")||x.closest("a"))return;let S=x.closest(".worker-card__id, .worker-mini__id, .rtile__id");if(S){p.preventDefault();let rt=x.closest(".mon2-item, .rtile, .mon2-crow, .worker-mini")?.getAttribute("data-bead-id")||S.textContent?.trim()||"";rt&&jt(rt);return}let Z=x.closest(".worker-mini__repo, .worker-card__repo, .mon2-sec__worker");if(Z){p.preventDefault();let Ce=Z.getAttribute("data-root-dir")||F.get(x.closest(".mon2-item, .rtile, .worker-mini")?.getAttribute("data-bead-id")||"")?.root_dir||Z.getAttribute("title")||"";Rt(Ce);return}let ae=x.closest(".mon2-sec__toggle");if(ae){p.preventDefault(),Pt(ae.getAttribute("data-root-dir")||"");return}let he=x.closest(".worker-pane__toggle[data-lane]");if(he){p.preventDefault();let Ce=he.getAttribute("data-lane")||"";(Ce==="candidate"||Ce==="queue"||Ce==="running"||Ce==="pr_wait"||Ce==="done")&&St(Ce);return}let Ue=x.closest(".worker-wait__area-toggle[data-area]");if(Ue){p.preventDefault(),ot(Ue.getAttribute("data-area")||"parallel");return}if(x.closest(".mon2-newlane")){p.preventDefault(),$t("create","");return}let He=x.closest(".mon2-clane__confirm, .mon2-clane__reapply, .mon2-clane__remove, .mon2-clane__run, .mon2-clane__stop");if(He){p.preventDefault();let Ce=He.getAttribute("data-lane-id")||"",rt=He.classList;$t(rt.contains("mon2-clane__confirm")?"confirm":rt.contains("mon2-clane__reapply")?"reapply":rt.contains("mon2-clane__run")?"run":rt.contains("mon2-clane__stop")?"stop":"remove",Ce);return}if(x.closest(".mon-merge-all")){p.preventDefault(),Qe();return}let pt=x.closest(".mon-filter__route");if(pt){p.preventDefault(),g={...g,routes:fa(g.routes,pt.getAttribute("data-route")||"")},ou(g),X();return}let Ft=x.closest(".mon-filter__readiness");if(Ft){p.preventDefault(),g={...g,readiness:Ft.getAttribute("data-readiness")||"all"},ou(g),X();return}let A=x.closest(".mon2-item, .rtile, .mon2-crow, .worker-mini, .worker-card");if(!A)return;let I=A.getAttribute("data-bead-id")||"",Pe=x.closest("button");if(Pe){p.preventDefault(),at(Pe,I);return}x.closest(".rtile__failure-pop, .chip-popover")||I&&!f&&(p.preventDefault(),kt(I,A.getAttribute("data-root-dir")||Wt(I).root_dir))}function hn(p){let f=p.target;if(!f||typeof f.closest!="function")return;if(G){let he=Ka(G.draft,f,Ne(G.root_dir));if(he){he!==G.draft&&(G={...G,draft:he},X());return}}let x=f.closest(".mon-filter__blocked");if(x){g={...g,show_blocked:x.checked},ou(g),X();return}let S=f.closest(".mon-candidate-sort");if(S){T=Co.some(he=>he.value===S.value)?S.value:"repo_spec",v$(T),X();return}let Z=f.closest(".mon-running-sort");if(Z){h=Z.value==="repo"?"repo":"started",S$(h),X();return}let ae=f.closest(".mon-done-range");ae&&(m=Xn(ae.value),x$(m),X())}function Nt(p){let f=p.target,x=f&&typeof f.closest=="function"?Z=>f.closest(Z):()=>null,S=!1;M&&!x(".rtile__failure-pop, .rtile__failure-badge")&&(M=null,S=!0),q&&!x(".rtile__provider-hold-pop, .rtile__provider-hold-badge")&&(q=null,S=!0),S&&X()}function vn(p){p.key==="Escape"&&(M===null&&q===null&&G===null||(M=null,q=null,G=null,X()))}e.addEventListener("click",Ct),e.addEventListener("change",hn),document.addEventListener("click",Nt),document.addEventListener("keydown",vn),P.attach(),te.attach(e);{let p=!0;z=Ba(f=>{if(ne=f,p){p=!1;return}X()})}s&&typeof s.subscribe=="function"&&(B=s.subscribe(()=>{try{ce.clear(),X()}catch{}}));function bn(){U!==null&&(clearInterval(U),U=null)}return{recorrectSharedLane:Xt,load(){n("load"),X(),U===null&&(U=setInterval(()=>{try{X()}catch{}},E$))},pause(){bn()},clear(){bn(),V(),te.detach(),B&&(B(),B=null),z&&(z(),z=null),W.destroy(),Oe.hidden=!0,Re?.destroy(),Re=null,e.removeEventListener("click",Ct),e.removeEventListener("change",hn),document.removeEventListener("click",Nt),document.removeEventListener("keydown",vn),P.detach(),e.replaceChildren()}}}var C$=["board","worker","monitor","compare","adr"];function Em(e,t,n){let r=zt("views:nav"),{global_element:s,repo_element:i}=e,o=null;function a(m){return h=>{h.preventDefault();let g=m==="monitor"&&l()==="monitor"?"worker":m;r("click tab %s",g),n.gotoView(g)}}function l(){let m=t.getState();return C$.includes(m.view)?m.view:"board"}function u(){let m=l();return c`
      <div class="ctl-tabs">
        <a
          href="#/monitor"
          class="ctl-tab ctl-tab--monitor ${m==="monitor"?"is-active":""}"
          @click=${a("monitor")}
        >
          <span class="ctl-tab__dots" aria-hidden="true"
            ><i></i><i></i><i></i><i></i
          ></span>
          Monitor
        </a>
        <a
          href="#/compare"
          class="ctl-tab ctl-tab--compare ${m==="compare"?"is-active":""}"
          @click=${a("compare")}
          >비교</a
        >
        <a
          href="#/adr"
          class="ctl-tab ctl-tab--adr ${m==="adr"?"is-active":""}"
          @click=${a("adr")}
          >ADR</a
        >
      </div>
    `}function d(){let m=l();return c`
      <div class="ctl-tabs">
        <a
          href="#/board"
          class="ctl-tab ${m==="board"?"is-active":""}"
          @click=${a("board")}
          >Board</a
        >
        <a
          href="#/worker"
          class="ctl-tab ${m==="worker"?"is-active":""}"
          @click=${a("worker")}
          >Worker</a
        >
      </div>
    `}function _(){s&&ct(u(),s),i&&ct(d(),i)}return _(),o=t.subscribe(()=>_()),{destroy(){o&&(o(),o=null),s&&ct(c``,s),i&&ct(c``,i)}}}var Tm=["Critical","High","Medium","Low","Backlog"];function Rm(e,t){let n=document.createElement("dialog");n.id="new-issue-dialog",n.setAttribute("role","dialog"),n.setAttribute("aria-modal","true"),n.innerHTML=`
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
  `,e.appendChild(n);let r=n.querySelector("#new-issue-form"),s=n.querySelector("#new-title"),i=n.querySelector("#new-type"),o=n.querySelector("#new-priority"),a=n.querySelector("#new-labels"),l=n.querySelector("#new-description"),u=n.querySelector("#new-issue-error"),d=n.querySelector("#btn-cancel"),_=n.querySelector("#btn-create"),m=n.querySelector(".new-issue__close");function h(){i.replaceChildren();let D=document.createElement("option");D.value="",D.textContent="\u2014 Select \u2014",i.appendChild(D);for(let M of Ai){let q=document.createElement("option");q.value=M,q.textContent=Ed(M),i.appendChild(q)}o.replaceChildren();for(let M=0;M<=4;M+=1){let q=document.createElement("option");q.value=String(M);let G=Tm[M]||"Medium";q.textContent=`${M} \u2013 ${G}`,o.appendChild(q)}}h();function g(){try{typeof n.close=="function"?n.close():n.removeAttribute("open")}catch{n.removeAttribute("open")}}function T(D){s.disabled=D,i.disabled=D,o.disabled=D,a.disabled=D,l.disabled=D,d.disabled=D,_.disabled=D,_.textContent=D?"Creating\u2026":"Create"}function k(){u.textContent=""}function ee(D){u.textContent=D}function ne(){try{let D=window.localStorage.getItem("beads-ui.new.type");D?i.value=D:i.value="";let M=window.localStorage.getItem("beads-ui.new.priority");M&&/^\d$/.test(M)?o.value=M:o.value="2"}catch{i.value="",o.value="2"}}function z(){let D=i.value||"",M=o.value||"";D.length>0&&window.localStorage.setItem("beads-ui.new.type",D),M.length>0&&window.localStorage.setItem("beads-ui.new.priority",M)}async function N(){k();let D=String(s.value||"").trim();if(D.length===0){ee("Title is required"),s.focus();return}let M=Number(o.value||"2");if(!(M>=0&&M<=4)){ee("Priority must be 0..4"),o.focus();return}let q=String(i.value||""),G=String(l.value||""),P={title:D};q.length>0&&(P.type=q),String(M).length>0&&(P.priority=M),G.length>0&&(P.description=G),T(!0);try{await t("create-issue",P)}catch{T(!1),ee("Failed to create issue");return}z(),T(!1),g()}return n.addEventListener("cancel",D=>{D.preventDefault(),g()}),m.addEventListener("click",()=>g()),d.addEventListener("click",()=>g()),n.addEventListener("keydown",D=>{D.key==="Enter"&&(D.ctrlKey||D.metaKey)&&(D.preventDefault(),N())}),r.addEventListener("submit",D=>{D.preventDefault(),N()}),{open(){r.reset(),k(),ne();try{"showModal"in n&&typeof n.showModal=="function"?n.showModal():n.setAttribute("open","")}catch{n.setAttribute("open","")}setTimeout(()=>{try{s.focus()}catch{}},0)},close(){g()}}}var O$=[["route","route \uCE69"],["fast_track","\u26A1 fast_track \uCE69"],["pr","PR \uCE69"],["from","\u21A9 from \uCE69"],["blocked","blocked\xB7\uC0AC\uC6A9\uC790 \uB9AC\uBDF0 \uD544\uC694 \uCE69"],["stepper","stepper"]];function I$(e,t){return yl(e,t)?"shown":t.hidden_labels.includes(e)?"hidden_exact":"hidden_prefix"}function Cm(e,t,n){return c`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">라벨 표시</div>
      <p class="settings-dialog__hint-block">
        라벨을 눌러 표시/숨김을 전환합니다. prefix 규칙으로 숨겨진 라벨을 누르면
        그 라벨만 예외로 다시 표시됩니다.
      </p>
      ${t.length===0?c`<div class="settings-dialog__empty">라벨 없음</div>`:c`<div class="settings-dialog__pills">
            ${t.map(r=>{let s=I$(r,e);return c`<button
                type="button"
                class=${`settings-dialog__pill settings-dialog__pill--${s}`}
                data-label=${r}
                data-state=${s}
                @click=${()=>n(r)}
              >
                ${r}
              </button>`})}
          </div>`}
    </section>
  `}function Om(e,t,n){return c`
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
  `}function Im(e,t){return c`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">카드 표시 요소</div>
      <div class="settings-dialog__toggles">
        ${O$.map(([n,r])=>c`<label class="settings-dialog__toggle">
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
  `}var L$=[{id:"execution",label:"\uC2E4\uD589",glyph:"\u25C6"},{id:"display",label:"\uD45C\uC2DC",glyph:"\u25EB"}];function Lm(e,t){let{transport:n,policyStore:r,labelOptions:s}=t,i=t.notify||(oe=>be(oe,"error",4e3)),o=document.createElement("dialog");o.id="settings-dialog",o.className="settings-dialog",o.setAttribute("role","dialog"),o.setAttribute("aria-modal","true"),o.setAttribute("aria-label","\uC124\uC815"),e.appendChild(o);let a="execution",l=!1,u="",d=null;function _(){if(d)return d;let oe=o.querySelector('[data-pane="execution"]');return oe?(d=Qa(oe,{root_dir:null,queue:()=>t.queueStore?.get()??null,transport:n,implPresetStore:t.implPresetStore,notify:i,onQueueAdopt:ue=>t.queueStore?.set?.(ue)}),d):null}function m(){return c`
      <section
        class=${`settings-dialog__pane${a==="execution"?" settings-dialog__pane--active":""}`}
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
    `}function h(){let oe=r.get();return c`
      <section
        class=${`settings-dialog__pane${a==="display"?" settings-dialog__pane--active":""}`}
        role="tabpanel"
        id="settings-pane-display"
        aria-label="표시 설정"
      >
        <header class="settings-dialog__pane-head"><h2>표시 설정</h2></header>
        <p class="settings-dialog__pane-sub">
          이 워크스페이스의 라벨·칩 표시 정책입니다.
        </p>
        ${oe?c`
              ${Cm(oe,s(),ee)}
              ${Om(oe,u,{onDraft:ue=>{u=ue},onAdd:ne,onRemove:z})}
              ${Im(oe,N)}
            `:c`<div class="settings-dialog__empty">
              표시 정책을 불러오는 중…
            </div>`}
      </section>
    `}async function g(oe){let ue=r.get();if(ue)try{let me=await n("display-policy-set",{expected_revision:ue.revision,policy:oe(ue)});T(me),me&&me.conflict&&me.policy&&(me=await n("display-policy-set",{expected_revision:me.policy.revision,policy:oe(me.policy)}),T(me)),me&&me.conflict&&i("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC")}catch{i("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328")}}function T(oe){oe&&oe.policy&&typeof oe.policy=="object"&&r.set(oe.policy)}function k(oe){g(oe)}function ee(oe){let ue=r.get();if(!ue)return;let me=!D$(oe,ue);k(V=>P$(oe,V,me))}function ne(){let oe=u.trim();oe.length!==0&&(u="",k(ue=>ue.hidden_prefixes.includes(oe)?{hidden_prefixes:ue.hidden_prefixes}:{hidden_prefixes:[...ue.hidden_prefixes,oe]}),D())}function z(oe){k(ue=>({hidden_prefixes:ue.hidden_prefixes.filter(me=>me!==oe)}))}function N(oe){let ue=r.get();if(!ue)return;let me=ue.chips[oe]===!1;k(()=>({chips:{[oe]:me}}))}function D(){ct(c`
        <div class="settings-dialog__container">
          <nav
            class="settings-dialog__rail"
            role="tablist"
            aria-orientation="vertical"
          >
            <div class="settings-dialog__rail-title">설정</div>
            ${L$.map(oe=>c`<button
                  type="button"
                  class="settings-dialog__tab"
                  role="tab"
                  data-tab=${oe.id}
                  aria-selected=${String(a===oe.id)}
                  aria-controls=${`settings-pane-${oe.id}`}
                  @click=${()=>M(oe.id)}
                >
                  <span class="settings-dialog__glyph">${oe.glyph}</span>
                  ${oe.label}
                </button>`)}
            <button
              type="button"
              class="settings-dialog__close"
              aria-label="닫기"
              @click=${C}
            >
              닫기
            </button>
          </nav>
          <div class="settings-dialog__panes">
            ${m()} ${h()}
          </div>
        </div>
      `,o),_()}function M(oe){a=oe,D()}let q=()=>{l=!1,t.onOpenChange?.(!1)};o.addEventListener("close",q),o.addEventListener("cancel",q);let G=oe=>{oe.target===o&&C()};o.addEventListener("click",G);let P=null;r.subscribe&&(P=r.subscribe(()=>{l&&D()}));let $=null;t.implPresetStore?.subscribe&&($=t.implPresetStore.subscribe(()=>{l&&d?.render()}));function O(oe="execution"){l||(l=!0,t.onOpenChange?.(!0),a=oe,u="",D(),typeof o.showModal=="function"?o.showModal():o.setAttribute("open",""),_()?.load())}function C(){l&&(l=!1,t.onOpenChange?.(!1),typeof o.close=="function"?o.close():o.removeAttribute("open"))}return{open:O,close:C,sessionDraft:()=>d?.sessionDraft()??{},destroy(){l=!1,o.removeEventListener("close",q),o.removeEventListener("cancel",q),o.removeEventListener("click",G),P&&(P(),P=null),$&&($(),$=null),d?.destroy(),d=null,o.remove()}}}function D$(e,t){return t.visible_labels.includes(e)?!0:t.hidden_labels.includes(e)?!1:!t.hidden_prefixes.some(n=>n.length>0&&e.startsWith(n))}function P$(e,t,n){if(!n)return{hidden_labels:t.hidden_labels.includes(e)?t.hidden_labels:[...t.hidden_labels,e],visible_labels:t.visible_labels.filter(i=>i!==e)};let r=t.hidden_labels.filter(i=>i!==e);return t.hidden_prefixes.some(i=>i.length>0&&e.startsWith(i))?{hidden_labels:r,visible_labels:t.visible_labels.includes(e)?t.visible_labels:[...t.visible_labels,e]}:{hidden_labels:r}}var N$=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],Dm="usage-meter-card",M$="usage-meter-layer",iu=600,q$=["token_expired","relogin_required"];function Pm(e){return String(e).padStart(2,"0")}function j$(e,t){let n=Math.max(0,Math.ceil((e-t)/6e4)),r=Math.floor(n/1440),s=Math.floor(n%1440/60),i=n%60;return r>0?`${r}d${s>0?` ${s}h`:""}`:s>0?`${s}h${i>0?` ${i}m`:""}`:`${i}m`}function Nm(e,t=Date.now()){let n=Date.parse(e);if(!Number.isFinite(n))return"";let r=new Date(n),s=new Date(t),i=`${Pm(r.getHours())}:${Pm(r.getMinutes())}`,a=r.getFullYear()===s.getFullYear()&&r.getMonth()===s.getMonth()&&r.getDate()===s.getDate()?i:`${N$[r.getMonth()]} ${r.getDate()} ${i}`;return`${j$(n,t)} \xB7 ${a}`}function F$(e){let t=Math.max(0,Math.floor(e));return t<60?`${t}\uCD08 \uC804`:t<3600?`${Math.floor(t/60)}\uBD84 \uC804`:`${Math.floor(t/3600)}\uC2DC\uAC04 \uC804`}function Mm(e){return e>=85?"usage-meter__window--danger":e>=60?"usage-meter__window--warn":"usage-meter__window--success"}function qm(e){let t=typeof e=="number"&&Number.isFinite(e)?e:0;return Math.min(100,Math.max(0,t))}var jm=[{key:"claude",label:"Claude",endpoint:"/api/claude-usage",switch_endpoint:"/api/claude-account/switch",tool:"cswap"},{key:"codex",label:"Codex",endpoint:"/api/codex-usage",switch_endpoint:"/api/codex-account/switch",tool:"codex-auth"}];function Bm(e){let t=[];for(let n of e){if(!n||typeof n!="object")continue;let r=n;typeof r.key!="string"||r.key.length===0||typeof r.pct!="number"||!Number.isFinite(r.pct)||t.push({key:r.key,pct:r.pct,resetsAt:typeof r.resetsAt=="string"?r.resetsAt:""})}return t}function B$(e){if(!e||typeof e!="object")return null;let t=e;return!Number.isInteger(t.number)||t.number<=0||typeof t.email!="string"||t.email.length===0||typeof t.status!="string"||t.status.length===0||typeof t.active!="boolean"||!Array.isArray(t.windows)?null:{number:t.number,email:t.email,alias:typeof t.alias=="string"&&t.alias.length>0?t.alias:null,plan:typeof t.plan=="string"&&t.plan.length>0?t.plan:null,active:t.active,status:t.status,windows:Bm(t.windows),fetchedAt:typeof t.fetchedAt=="string"?t.fetchedAt:null,ageSeconds:typeof t.ageSeconds=="number"&&Number.isFinite(t.ageSeconds)?t.ageSeconds:null}}function U$(e,t){if(!e||typeof e!="object")return null;let n=e,r=[];if(Array.isArray(n.accounts))for(let i of n.accounts){let o=B$(i);o&&r.push(o)}let s=n.available===!0&&Array.isArray(n.windows);return!s&&r.length===0?null:{available:s,windows:s?Bm(n.windows):[],ageSeconds:typeof n.ageSeconds=="number"&&Number.isFinite(n.ageSeconds)?n.ageSeconds:null,accounts:r,receivedAtMs:t,held:!1}}function W$(e,t){if(!e||typeof e!="object")return{kind:"error"};let n=U$(e,t);return n?{kind:"ok",snapshot:n}:Array.isArray(e.accounts)?{kind:"empty"}:{kind:"error"}}function Um(e,t){return(e.ageSeconds===null?0:e.ageSeconds)+Math.max(0,t-e.receivedAtMs)/1e3}function H$(e,t){return!e.held||Um(e,t)<=iu?e:{...e,available:!1,windows:[],accounts:[]}}function Fm(e,t){return`${e}:${t}`}function Wm(e){let t=!1,n=null,r=new Map,s=null,i=new Map,o=new Map,a=0,l=null;function u(){ct(c``,e),e.hidden=!0,_()}function d(){if(l===null){let V=e.ownerDocument;l=V.createElement("div"),l.id=M$,l.className="usage-meter__layer",V.body.appendChild(l)}return l}function _(){l!==null&&(ct(c``,l),l.remove(),l=null)}function m(V){n!==V&&(n===null&&(document.addEventListener("mousedown",g),document.addEventListener("keydown",k),window.addEventListener("resize",T)),n=V)}function h(){n!==null&&(n=null,document.removeEventListener("mousedown",g),document.removeEventListener("keydown",k),window.removeEventListener("resize",T))}function g(V){let ie=V.target;ie&&(e.contains(ie)||l!==null&&l.contains(ie))||(h(),C())}function T(){C()}function k(V){V.key==="Escape"&&(h(),C())}function ee(V){n===V?h():m(V),C()}function ne(){h(),C()}async function z(V,ie){if(r.has(V.key))return;let de=Fm(V.key,ie);r.set(V.key,ie),o.delete(de),C();let Oe=null;try{Oe=await(await fetch(V.switch_endpoint,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({number:ie})})).json()}catch{Oe=null}if(t)return;if(r.delete(V.key),!Oe||Oe.ok!==!0){let Ie=Oe&&typeof Oe.error=="string"&&Oe.error.length>0?Oe.error:"network_error";o.set(de,{kind:"error",text:`\uC804\uD658 \uC2E4\uD328 \u2014 ${Ie}`}),C();return}let qe=Array.isArray(Oe.warnings)?Oe.warnings.filter(Ie=>typeof Ie=="string"&&Ie.length>0):[];qe.length>0&&o.set(de,{kind:"warn",text:qe.join(" \xB7 ")}),C(),await me()}function N(V,ie,de,Oe){let qe=qm(V.pct),ge=`resets ${Nm(V.resetsAt,Oe)}${ie?` \xB7 ${de}`:""}`;return c`<span
      class="usage-meter__window ${Mm(qe)}"
      style=${`--progress: ${qe}%`}
      title=${ge}
    >
      <span class="usage-meter__label">${V.key}</span>
      <span class="usage-meter__track" aria-hidden="true">
        <span class="usage-meter__fill"></span>
      </span>
      <span class="usage-meter__pct">${qe}%</span>
    </span>`}function D(V,ie,de){let Oe=Um(ie,de),qe=ie.available&&(ie.held||Oe>iu),Ie=qe?`${Math.floor(Oe/60)}\uBD84 \uC804 \uCE21\uC815`:"",ge=ie.accounts.filter(B=>!B.active).length,F=`usage-meter__group${qe?" usage-meter__group--stale":""}`,ce=c`<span class="usage-meter__provider"
        >${V.label}</span
      >
      ${ie.available?ie.windows.map(B=>N(B,qe,Ie,de)):c`<span class="usage-meter__empty">사용량 없음</span>`}
      ${ge>0?c`<span class="usage-meter__badge">+${ge}</span>`:""}`;if(ie.accounts.length===0)return c`<span
        class=${F}
        aria-label=${`${V.label} usage`}
        >${ce}</span
      >`;let pe=n===V.key;return c`<button
      type="button"
      class=${`usage-meter__toggle ${F}`}
      aria-label=${`${V.label} usage`}
      aria-expanded=${pe?"true":"false"}
      aria-controls=${Dm}
      @click=${()=>ee(V.key)}
    >
      ${ce}
    </button>`}function M(V,ie){return c`<span class="usage-meter" aria-label="Usage">
      ${V.map(de=>D(de.provider,de.snapshot,ie))}
    </span>`}function q(V,ie){let de=qm(V.pct),Oe=Nm(V.resetsAt,ie);return c`<span
      class="usage-meter__account-window ${Mm(de)}"
      style=${`--progress: ${de}%`}
    >
      <span class="usage-meter__account-key">${V.key}</span>
      <span class="usage-meter__account-track" aria-hidden="true">
        <span class="usage-meter__account-fill"></span>
      </span>
      <span class="usage-meter__account-pct">${de}%</span>
      <span class="usage-meter__account-reset"
        >${Oe.length>0?`\u21BB ${Oe}`:""}</span
      >
    </span>`}function G(V,ie){return q$.includes(ie)?`\uD1A0\uD070 \uB9CC\uB8CC \u2014 ${V.tool} \uC7AC\uB85C\uADF8\uC778 \uD544\uC694`:"\uC0AC\uC6A9\uB7C9 \uC5C6\uC74C"}function P(V,ie,de){let Oe=ie.status==="ok",qe=typeof ie.ageSeconds=="number"&&ie.ageSeconds>iu,Ie=o.get(Fm(V.key,ie.number)),ge=r.get(V.key),F=ge!==void 0,ce=ge===ie.number,pe=["usage-meter__account"];return ie.active&&pe.push("usage-meter__account--active"),Oe||pe.push("usage-meter__account--unavailable"),qe&&pe.push("usage-meter__account--stale"),c`<div class=${pe.join(" ")}>
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
              >${F$(ie.ageSeconds)}</span
            >`}
        ${ie.active?"":c`<button
              type="button"
              class="usage-meter__switch"
              ?disabled=${F}
              @click=${()=>{z(V,ie.number)}}
            >
              ${ce?"\uC804\uD658 \uC911\u2026":"\uC804\uD658"}
            </button>`}
      </div>
      ${Oe?c`<div class="usage-meter__account-windows">
            ${ie.windows.map(B=>q(B,de))}
          </div>`:c`<div class="usage-meter__account-status">
            ${G(V,ie.status)}
          </div>`}
      ${Ie===void 0?"":c`<div
            class="usage-meter__account-message usage-meter__account-message--${Ie.kind}"
          >
            ${Ie.text}
          </div>`}
    </div>`}function $(V,ie,de){let Oe=ie.accounts.filter(qe=>qe.active).length;return c`<section class="usage-meter__section">
      <h2 class="usage-meter__section-title">
        ${V.label} · 활성 ${Oe} / 전체
        ${ie.accounts.length}
      </h2>
      ${ie.accounts.map(qe=>P(V,qe,de))}
    </section>`}function O(V,ie){return c`<div
      class="usage-meter__card"
      id=${Dm}
      role="dialog"
      aria-label=${`${V.provider.label} \uACC4\uC815 \uC0AC\uC6A9\uB7C9`}
    >
      ${$(V.provider,V.snapshot,ie)}
      <p class="usage-meter__note">전환은 새로 시작하는 세션부터 적용됩니다.</p>
    </div>`}function C(){let V=Date.now(),ie=[];for(let Oe of jm){let qe=i.get(Oe.key);qe&&ie.push({provider:Oe,snapshot:H$(qe,V)})}if(ie.length===0){h(),u();return}let de=ie.find(Oe=>Oe.provider.key===n&&Oe.snapshot.accounts.length>0);de||h(),ct(M(ie,V),e),e.hidden=!1,de?oe(de,V):_()}function oe(V,ie){let de=d(),Oe=e.getBoundingClientRect(),qe=e.ownerDocument.documentElement.clientWidth;de.style.setProperty("--usage-meter-anchor-top",`${Oe.bottom}px`),de.style.setProperty("--usage-meter-anchor-right",`${Math.max(0,qe-Oe.right)}px`),ct(c`<div
          class="usage-meter__scrim"
          aria-hidden="true"
          @mousedown=${ne}
        ></div>
        ${O(V,ie)}`,de)}async function ue(V){try{let ie=await fetch(V.endpoint);return ie.ok?W$(await ie.json(),Date.now()):{kind:"error"}}catch{return{kind:"error"}}}async function me(){a+=1;let V=a,ie=await Promise.all(jm.map(async de=>({provider:de,read:await ue(de)})));if(!(t||V!==a)){for(let de of ie){let Oe=de.provider.key;if(de.read.kind==="ok"){i.set(Oe,de.read.snapshot);continue}if(de.read.kind==="empty"){i.delete(Oe);continue}let qe=i.get(Oe);qe!==void 0&&!qe.held&&i.set(Oe,{...qe,held:!0})}C()}}return u(),me(),s=setInterval(()=>{me()},6e4),{destroy(){t=!0,s!==null&&(clearInterval(s),s=null),h(),u()}}}function Xs(e){let t=e?.blocked_info;return t&&typeof t=="object"?Array.isArray(t.blockers)?t.blockers.filter(r=>typeof r=="string"&&r.length>0):[]:(Array.isArray(e?.dependencies)?e.dependencies:[]).map(r=>{if(typeof r=="string")return r;if(!r||typeof r!="object")return"";let s=r.type??r.dependency_type;return s!==void 0&&s!=="blocks"?"":r.depends_on_id||r.id||""}).filter(Boolean)}var Km="bdui.worker.candidate_sort",Jo=Object.freeze([{id:"spec",label:"spec \uC6B0\uC120",chain:[{key:"spec",dir:"desc"},{key:"created",dir:"asc"}]},{id:"bottleneck",label:"\uBCD1\uBAA9 \uC6B0\uC120",chain:[{key:"priority",dir:"asc"},{key:"dependents",dir:"desc"},{key:"released",dir:"desc"}]},{id:"created",label:"\uCD5C\uC2E0 \uC0DD\uC131",chain:[{key:"created",dir:"desc"},{key:"priority",dir:"asc"}]},{id:"updated",label:"\uCD5C\uC2E0 \uC218\uC815",chain:[{key:"updated",dir:"desc"}]}]),Ja=Object.freeze({preset:"spec"}),Gm=3,Vm=Object.freeze([{key:"priority",label:"\uC6B0\uC120\uC21C\uC704"},{key:"dependents",label:"\uD6C4\uC18D \uC218"},{key:"released",label:"\uD574\uC81C \uC2DC\uAC01"},{key:"spec",label:"spec \uC720\uBB34"},{key:"created",label:"\uC0DD\uC131"},{key:"updated",label:"\uC218\uC815"}]);function Hm(e){return Jo.some(t=>t.id===e)}function zm(e){let t=Jo.find(n=>n.id===e);return t?t.chain.map(n=>({...n})):[]}function z$(e,t){return e.length===t.length&&e.every((n,r)=>n.key===t[r].key&&n.dir===t[r].dir)}function ei(e){return e&&"preset"in e?zm(e.preset):e&&Array.isArray(e.chain)?e.chain.map(t=>({...t})):zm("spec")}function au(e){return e&&"preset"in e?e.preset:null}function us(e){if(typeof e=="string"){let i;try{i=JSON.parse(e)}catch{return Hm(e)?{preset:e}:Ja}return us(i)}if(!e||typeof e!="object")return Ja;let t=e;if(Hm(t.preset))return{preset:t.preset};let n=t.chain;if(!Array.isArray(n)||n.length===0||n.length>Gm||!n.every(dl))return Ja;let r=[];for(let i of n)r.some(o=>o.key===i.key)||r.push({key:i.key,dir:i.dir});let s=Jo.find(i=>z$(i.chain,r));return s?{preset:s.id}:{chain:r}}function Ym(){try{return us(window.localStorage.getItem(Km))}catch{return Ja}}function lu(e){try{window.localStorage.setItem(Km,JSON.stringify(e))}catch{}}function Xm(e,t,n){let r=e.map(l=>({...l}));if(!n)return r.slice(0,t);if(!Object.prototype.hasOwnProperty.call(fi,n))return r;let s=n;if(r.slice(0,t).some(l=>l.key===s))return r.slice(0,t);let i={key:s,dir:r[t]&&r[t].key===s?r[t].dir:fi[s]},o=r.slice(0,t),a=r.slice(t+1).filter(l=>l.key!==s);return[...o,i,...a].slice(0,Gm)}function Qm(e,t){return e.map((n,r)=>r===t?{key:n.key,dir:n.dir==="asc"?"desc":"asc"}:{...n})}function K$(e){let t=new Set(e.map(a=>a.id)),n=new Map,r=new Map;for(let a of e){let l=Xs(a).filter(u=>t.has(u));n.set(a.id,l);for(let u of l){let d=r.get(u);d?d.push(a):r.set(u,[a])}}let s=new Set,i=[],o=a=>{s.add(a.id),i.push(a);for(let l of r.get(a.id)??[])!s.has(l.id)&&(n.get(l.id)??[]).every(u=>s.has(u))&&o(l)};for(;i.length<e.length;){let a=e.find(l=>!s.has(l.id)&&(n.get(l.id)??[]).every(u=>s.has(u)));o(a??e.find(l=>!s.has(l.id)))}return i}function Zm(e,t){let n=Array.isArray(e)?e.slice():[];return n.sort(Ku(ei(t))),K$(n)}function Jm(e,t){let n=new Map;if(!e||typeof e!="object")return n;let r=e,s=[],i=new Set;for(let o of t){if(i.has(o.id))continue;i.add(o.id);let a=r[o.id];if(!a||!Array.isArray(a.scope))continue;let l=a.scope.filter(u=>typeof u=="string"&&u.length>0);if(l.length===0){n.set(o.id,{overlaps:[],scope_missing:!0});continue}n.set(o.id,{overlaps:[],scope_missing:!1}),s.push({member:o,scope:l})}for(let o=0;o<s.length;o+=1)for(let a=o+1;a<s.length;a+=1){let l=Wi(s[o].scope,s[a].scope);if(l.length===0)continue;let u=s[o].member,d=s[a].member;n.get(u.id)?.overlaps.push({id:d.id,title:d.title,location_label:d.location_label,prefixes:l}),n.get(d.id)?.overlaps.push({id:u.id,title:u.title,location_label:u.location_label,prefixes:l})}return n}var eg=new Set(["sh","bash","zsh","dash","ksh"]),tg=/('(?:[^']*)'|"(?:\\.|[^"\\])*"|#.*|\$(?:\{[^}\n]*\}|[A-Za-z_][A-Za-z0-9_]*|[?#@*!$0-9-])|\b(?:if|then|else|elif|fi|for|while|until|do|done|case|esac|in|function|select|time)\b)/g;function ng(e){let t=e.split("/");return t[t.length-1]||""}function G$(e){let t=e.split(`
`,1)[0];if(!t.startsWith("#!"))return!1;let n=t.slice(2).trim().split(/\s+/).filter(Boolean);if(n.length===0)return!1;let r=ng(n[0]);if(r!=="env")return eg.has(r);let s=n.slice(1).find(i=>!i.startsWith("-")&&!i.includes("="));return s!==void 0&&eg.has(ng(s))}function V$(e){return e.startsWith("#")?"comment":e.startsWith("'")||e.startsWith('"')?"string":e.startsWith("$")?"variable":"keyword"}function Y$(e){let t=[],n=0;tg.lastIndex=0;for(let r of e.matchAll(tg)){let s=r.index;s>n&&t.push({text:e.slice(n,s),kind:"plain"}),t.push({text:r[0],kind:V$(r[0])}),n=s+r[0].length}return n<e.length&&t.push({text:e.slice(n),kind:"plain"}),t.length===0&&t.push({text:e,kind:"plain"}),t}function X$(e){return{bad_request:"\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD\uC774 \uC62C\uBC14\uB974\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.",forbidden:"\uB4F1\uB85D\uB418\uC9C0 \uC54A\uC740 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uC758 \uC2A4\uD06C\uB9BD\uD2B8\uB294 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",lane_not_declared:"\uD604\uC7AC \uACE0\uC815 \uC120\uC5B8\uC5D0 \uD574\uB2F9 \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4.",stale_declaration:"\uC800\uC7A5\uC18C \uC791\uC5C5 \uC120\uC5B8\uC774 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uD654\uBA74\uC5D0\uC11C \uB2E4\uC2DC \uC5F4\uC5B4 \uC8FC\uC138\uC694.",too_large:"\uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uB108\uBB34 \uCEE4\uC11C \uD654\uBA74\uC5D0 \uD45C\uC2DC\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",unsupported_content:"\uD14D\uC2A4\uD2B8 \uD615\uC2DD\uC758 \uC2A4\uD06C\uB9BD\uD2B8\uB9CC \uD45C\uC2DC\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.",unreadable:"\uACE0\uC815\uB41C \uC2A4\uD06C\uB9BD\uD2B8 \uB0B4\uC6A9\uC744 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4."}[e]||"\uC2A4\uD06C\uB9BD\uD2B8\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4."}function rg(e){let t=e.getWorkspacePath,n=e.fetchImpl||globalThis.fetch?.bind(globalThis),r=document.createElement("div");r.className="repo-ops-script-viewer-root",document.body.appendChild(r);let s=null,i="loading",o="",a="",l=0,u=null,d=!1;function _(D,M){return M?Y$(D).map(q=>q.kind==="plain"?q.text:c`<span
            class="repo-ops-script-viewer__token repo-ops-script-viewer__token--${q.kind}"
            >${q.text}</span
          >`):D}function m(){if(!s)return c``;let D=i==="ready"&&G$(o),M=i==="ready"?o.split(`
`):[];return c`<div
      class="repo-ops-script-viewer"
      role="dialog"
      aria-modal="true"
      aria-label=${`\uC2A4\uD06C\uB9BD\uD2B8 \uB0B4\uC6A9: ${s.path}`}
    >
      <div
        class="repo-ops-script-viewer__backdrop"
        @click=${()=>z()}
      ></div>
      <section class="repo-ops-script-viewer__panel">
        <header class="repo-ops-script-viewer__header">
          <div class="repo-ops-script-viewer__identity">
            <span
              class="repo-ops-script-viewer__path"
              title=${s.path}
              >${s.path}</span
            >
            <span class="repo-ops-script-viewer__ref"
              >${s.base_ref}@${s.base_sha.slice(0,7)}</span
            >
          </div>
          <div class="repo-ops-script-viewer__actions">
            <button
              type="button"
              class="repo-ops-script-viewer__copy"
              ?disabled=${i!=="ready"}
              @click=${()=>{g()}}
            >
              복사
            </button>
            <button
              type="button"
              class="repo-ops-script-viewer__close"
              aria-label="스크립트 팝업 닫기"
              @click=${()=>z()}
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
                  ${a}
                </div>`:c`<div class="repo-ops-script-viewer__code" tabindex="0">
                  ${M.map((q,G)=>c`<div class="repo-ops-script-viewer__row">
                        <span
                          class="repo-ops-script-viewer__line-number"
                          aria-hidden="true"
                          >${G+1}</span
                        ><code class="repo-ops-script-viewer__code-line"
                          >${_(q,D)}</code
                        >
                      </div>`)}
                </div>`}
        </div>
      </section>
    </div>`}function h(){ct(m(),r)}async function g(){if(i!=="ready")return;let D=await $n(o);be(D?"\uC2A4\uD06C\uB9BD\uD2B8 \uBCF5\uC0AC\uB428":"\uC2A4\uD06C\uB9BD\uD2B8 \uBCF5\uC0AC \uC2E4\uD328",D?"success":"error")}function T(D){D.key==="Escape"&&s&&(D.preventDefault(),z())}function k(){d||(document.addEventListener("keydown",T),d=!0)}function ee(){d&&(document.removeEventListener("keydown",T),d=!1)}async function ne(D,M=null){let q=++l;k(),s={...D},u=M||(document.activeElement instanceof HTMLElement?document.activeElement:null),i="loading",o="",a="",h(),r.querySelector(".repo-ops-script-viewer__close")?.focus();let P=t?t():"";if(!P){i="error",a="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4.",h();return}if(!n){i="error",a="\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD \uAE30\uB2A5\uC744 \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",h();return}let $="/api/repo-ops-script?workspace="+encodeURIComponent(P)+"&lane="+encodeURIComponent(D.lane)+"&base_sha="+encodeURIComponent(D.base_sha);try{let O=await n($),C=await O.json().catch(()=>({}));if(q!==l)return;if((t?t():"")!==P){z();return}if(!O.ok||!C||C.ok!==!0){i="error",a=X$(C&&typeof C.error=="string"?C.error:""),h();return}s={lane:C.lane,base_sha:C.base_sha,path:C.path,base_ref:C.base_ref},o=String(C.content),i="ready",h()}catch{if(q!==l)return;i="error",a="\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",h()}}function z(){l+=1,ee(),s=null,o="",h();let D=u;u=null,D?.isConnected&&D.focus()}function N(){z(),r.remove()}return{open:ne,close:z,destroy:N}}var sg={deploy_not_declared:"\uC120\uC5B8 \uC5C6\uC74C",deploy_opted_out:"\uC774 workspace\uC5D0\uC11C \uBC30\uD3EC \uC2E4\uD589\uC774 \uAEBC\uC838 \uC788\uC74C",deploy_in_flight:"\uBC30\uD3EC \uC9C4\uD589 \uC911",target_unresolved:"\uB300\uC0C1 tip\uC744 \uD655\uC815\uD558\uC9C0 \uBABB\uD568",remote_history_not_monotonic:"\uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC\uC640 \uC6D0\uACA9 \uC774\uB825\uC774 \uAC08\uB77C\uC9D0"},Q$=new Set(["queued","running","retry_pending"]);function og(e){let t=e.queueStore,n=e.transport,r=e.onChanged||(()=>{}),s=e.onOpenScript;function i(){return t&&t.get()||{}}function o(){let $=i();return typeof $.revision=="number"?$.revision:0}function a($){t&&$&&$.queue&&typeof $.queue=="object"&&t.set($.queue)}function l(){let $=i().workspace_info;return $&&typeof $=="object"?$:{}}function u($,O){return c`<span
      class="worker-repo-ops__vd-badge worker-repo-ops__vd-badge--${$}"
      >${O}</span
    >`}function d($){if(typeof $!="number"||!Number.isFinite($))return"";let O=$/6e4;return Number.isInteger(O)?`timeout ${O}\uBD84`:`timeout ${Math.round($/1e3)}\uCD08`}function _($){let O=d($);return O?u("config",O):""}function m($,O,C){return c`<button
      type="button"
      class="worker-repo-ops__vd-cmd worker-repo-ops__vd-cmd--link"
      .textContent=${C.script}
      @click=${oe=>{s&&s({lane:$,base_sha:O.base_sha,path:C.script,base_ref:O.base_ref},oe.currentTarget)}}
    ></button>`}function h(){let $=i().repo_operations;return Array.isArray($)?$:[]}function g(){let $=l().repo_ops,O=$&&typeof $=="object"?$.repo_id:null;return typeof O=="string"&&O?O:null}function T(){return h().some($=>$&&$.kind==="deploy"&&Q$.has($.state))}function k(){let $=T(),O=g()===null;return c`<button
      type="button"
      class="worker-repo-ops__deploy-run"
      data-seam="repo-ops-deploy-run"
      ?disabled=${$||O}
      title=${$?"\uBC30\uD3EC \uC9C4\uD589 \uC911":O?"\uC800\uC7A5\uC18C\uB97C \uD655\uC778\uD560 \uC218 \uC5C6\uC74C":"\uC6D0\uACA9 base tip\uC5D0\uC11C \uBC30\uD3EC \uC2A4\uD06C\uB9BD\uD2B8\uB97C 1\uD68C \uC2E4\uD589\uD569\uB2C8\uB2E4"}
      @click=${()=>{M()}}
    >
      배포 실행
    </button>`}function ee(){let $=i().repo_ops_opt_out;return{verify:$?.verify===!0,deploy:$?.deploy===!0}}function ne($,O){return c`<label class="worker-repo-ops__lane-run">
      <input
        type="checkbox"
        .checked=${!O}
        @change=${C=>{D($,!C.target.checked)}}
      />
      이 workspace에서 실행
    </label>`}function z($){let O=typeof $.base_sha=="string"?$.base_sha:"",C=`${$.source_path||"repo-ops/config.toml"} @ ${$.base_ref||"?"}${O?`@${O.slice(0,7)}`:""}`,oe=ee(),ue=!!$.verify&&oe.verify,me=!!$.deploy&&oe.deploy;return c`<section class="worker-repo-ops__vd" data-seam="repo-ops">
      <p class="worker-repo-ops__vd-title">
        저장소 작업 선언
        <span class="worker-repo-ops__vd-src">${C}</span>
      </p>
      <div
        class="worker-repo-ops__lane${ue?" worker-repo-ops__lane--skipped":""}"
        data-lane="verify"
      >
        <span class="worker-repo-ops__lane-k">머지 전 검증</span>
        <span class="worker-repo-ops__lane-v"
          >${$.verify?c`${m("verify",$,$.verify)}
              ${_($.verify.timeout_ms)}
              ${ue?u("skipped","\uC774 workspace\uC5D0\uC11C \uAC74\uB108\uB700"):""}`:c`선언 없음${u("absent","verify \uC5C6\uC774 \uD310\uC815")}`}</span
        >
        <span class="worker-repo-ops__lane-d"
          >${ue?"\uC774 workspace\uC5D0\uC11C\uB294 \uAC80\uC99D \uC5C6\uC774 \uD310\uC815\uD569\uB2C8\uB2E4.":$.verify?"\uBA38\uC9C0 \uC804\uC5D0 \uC774 \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uD1B5\uACFC\uD574\uC57C \uC790\uACA9\uC744 \uC5BB\uC2B5\uB2C8\uB2E4.":"\uBA38\uC9C0 \uC790\uACA9\uC740 PR/base/head \uC2E0\uC120\uB3C4\xB7mergeability\xB7\uB9AC\uBDF0 \uC601\uC218\uC99D\uC73C\uB85C\uB9CC \uD310\uC815\uD569\uB2C8\uB2E4."}</span
        >
        ${$.verify?ne("verify",oe.verify):""}
      </div>
      <div
        class="worker-repo-ops__lane${me?" worker-repo-ops__lane--skipped":""}"
        data-lane="deploy"
      >
        <span class="worker-repo-ops__lane-k">머지 후 배포</span>
        <span class="worker-repo-ops__lane-v"
          >${$.deploy?c`${m("deploy",$,$.deploy)}
              ${_($.deploy.timeout_ms)}
              ${me?u("skipped","\uC774 workspace\uC5D0\uC11C \uAC74\uB108\uB700"):k()}`:c`선언 없음${u("absent","\uBC30\uD3EC \uC5C6\uC74C")}`}</span
        >
        <span class="worker-repo-ops__lane-d"
          >${me?"\uC774 workspace\uC5D0\uC11C\uB294 \uBC30\uD3EC \uC5C6\uC774 \uACE7\uBC14\uB85C \uC815\uB9AC\uB85C \uB118\uC5B4\uAC11\uB2C8\uB2E4.":$.deploy?c`Worker가 <code>.worktrees/.repo-ops-deploy</code>에서 대상
                  SHA로 정렬한 뒤 1회 실행합니다.`:"\uBA38\uC9C0 \uD6C4 \uBC30\uD3EC \uB2E8\uACC4 \uC5C6\uC774 \uACE7\uBC14\uB85C \uC815\uB9AC\uB85C \uB118\uC5B4\uAC11\uB2C8\uB2E4."}</span
        >
        ${$.deploy?ne("deploy",oe.deploy):""}
      </div>
    </section>`}function N($){let O=$.repo_ops&&typeof $.repo_ops=="object"?$.repo_ops:null;return O&&(O.status==="resolved"||O.status==="absent")?z(O):O&&(O.status==="pending"||O.status==="error")?c`<section class="worker-repo-ops__vd" data-seam="repo-ops">
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
          ${O.status==="pending"?"\uC120\uC5B8 \uD655\uC778 \uC911":c`선언 읽기
              실패${O.error_code?c` — <code>${O.error_code}</code>`:""}`}
        </div>
      </section>`:c`<section class="worker-repo-ops__vd" data-seam="repo-ops">
      <p class="worker-repo-ops__vd-title">저장소 작업 선언</p>
      <div class="worker-repo-ops__vd-line worker-repo-ops__vd-absent">
        선언 확인 중
      </div>
    </section>`}async function D($,O){if(!n)return;let C=await n("worker-repo-ops-opt-out-toggle",{kind:$,opted_out:O,expected_revision:o()});if(a(C),C&&C.conflict){let oe=await n("worker-repo-ops-opt-out-toggle",{kind:$,opted_out:O,expected_revision:o()});a(oe)}r()}async function M(){let $=g();if(!n||$===null)return;let O=await n("worker-repo-operation-deploy-run",{repo_id:$});if(a(O),!O||O.ok!==!0){let C=O&&typeof O.reason=="string"?O.reason:"",oe=Object.hasOwn(sg,C)?sg[C]:C||"\uBC30\uD3EC \uC2E4\uD589\uC744 \uC2DC\uC791\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4";be(`\uBC30\uD3EC \uC2E4\uD589 \uAC70\uBD80 \u2014 ${oe}`,"error")}else be("\uBC30\uD3EC \uC2E4\uD589\uC744 \uC2DC\uC791\uD588\uC2B5\uB2C8\uB2E4","success");r()}let q={owned_deploy_worktree_fetch_detached_alignment_recreate:"\uC804\uC6A9 \uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC \uC815\uB82C\xB7\uBCF5\uAD6C",recovered_pre_execution_fetch_timeout_retry_once:"fetch \uD0C0\uC784\uC544\uC6C3 1\uD68C \uBCF5\uAD6C",repo_serial_lock_wait:"\uC800\uC7A5\uC18C \uC21C\uCC28 \uC2E4\uD589 \uB300\uAE30",restart_operation_adoption:"\uC7AC\uC2DC\uC791 \uD6C4 \uC791\uC5C5 \uC778\uACC4",exact_input_exit_zero_evidence_adoption:"\uB3D9\uC77C \uC785\uB825 \uC131\uACF5 \uC99D\uAC70 \uC778\uACC4",descendant_success_covers_ancestor_rows:"\uCD5C\uC2E0 SHA \uC131\uACF5\uC774 \uC774\uC804 \uD589 \uCEE4\uBC84",owned_verify_candidate_cleanup:"\uAC80\uC99D \uC784\uC2DC \uCCB4\uD06C\uC544\uC6C3 \uC815\uB9AC",bounded_single_script_retry_exceeded:"\uB2E8\uC77C \uC2A4\uD06C\uB9BD\uD2B8 \uC7AC\uC2DC\uB3C4 \uD55C\uB3C4 \uCD08\uACFC",repair_session_dispatch:"\uC2E4\uD328 \uD574\uACB0 \uC138\uC158 \uC790\uB3D9 \uC2E4\uD589",baseline_failure_ignore:"\uAE30\uC874 \uC2E4\uD328 \uBB34\uC2DC",config_or_script_deletion_to_bypass_gate:"\uC124\uC815\xB7\uC2A4\uD06C\uB9BD\uD2B8 \uC0AD\uC81C\uB85C \uAC8C\uC774\uD2B8 \uC6B0\uD68C",credential_entry:"\uC790\uACA9\uC99D\uBA85 \uC785\uB825\xB7\uCD9C\uB825",destructive_action:"\uD30C\uAD34\uC801 \uC791\uC5C5",history_rewrite:"\uD788\uC2A4\uD1A0\uB9AC \uC7AC\uC791\uC131",agent_self_report_as_success:"\uC138\uC158 \uC790\uAE30\uBCF4\uACE0\uB97C \uC131\uACF5 \uCC98\uB9AC"};function G($,O,C){return c`<div class="worker-repo-ops__policy-group" data-policy=${C}>
      <div class="worker-repo-ops__policy-label">${$}</div>
      <ul class="worker-repo-ops__policy-list">
        ${O.map(oe=>c`<li data-token=${oe}>
              ${q[oe]||oe}
            </li>`)}
      </ul>
    </div>`}function P(){let $=i(),O=$.repo_operation_policy&&typeof $.repo_operation_policy=="object"?$.repo_operation_policy:null;return O?c`<section
      class="worker-repo-ops__repair"
      data-seam="repo-ops-policy"
    >
      <details class="worker-repo-ops__policy" data-seam="policy-lists">
        <summary>
          Worker 자동 처리 기준
          <span class="worker-repo-ops__policy-count"
            >자동 ${(O.worker_automatic||[]).length} · 금지
            ${(O.never_automatic||[]).length}</span
          >
        </summary>
        ${O.supported===!1?c`<div
              class="worker-repo-ops__policy-group"
              data-policy="policy-schema"
            >
              ${`\uACC4\uC57D \uC2A4\uD0A4\uB9C8 \uBD88\uC77C\uCE58 \u2014 \uC790\uB3D9 \uC7AC\uC2DC\uB3C4\uAC00 \uC815\uC9C0\uB418\uC5C8\uC2B5\uB2C8\uB2E4 (v${O.schema_version})`}
            </div>`:""}
        ${G("Worker\uAC00 \uC790\uB3D9 \uCC98\uB9AC",O.worker_automatic||[],"worker-automatic")}
        ${G("\uC790\uB3D9\uC73C\uB85C \uD558\uC9C0 \uC54A\uC74C",O.never_automatic||[],"never-automatic")}
      </details>
    </section>`:""}return{template(){return c`<details class="worker-repo-ops-settings">
        <summary class="worker-repo-ops-settings__summary">
          저장소 작업 · 검증/배포 선언
        </summary>
        ${N(l())} ${P()}
      </details>`}}}var lg=20,Z$=5,J$=new Set(["failed","running","queued","retry_pending"]),cu={verify:"\uBA38\uC9C0 \uC804 \uAC80\uC99D",deploy:"\uBA38\uC9C0 \uD6C4 \uBC30\uD3EC",job:"\uBA38\uC9C0 \uD6C4 \uC7A1"},ig={verify:"verify",deploy:"deploy",job:"deploy"};function ex(e){if(typeof e!="string")return"";let t=e.split("/").filter(n=>n.length>0);return t.length>0?t[t.length-1]:""}function tx(e){return!e||typeof e!="object"?"":e.kind==="job"?ex(e.script_path)||cu.job:Object.hasOwn(cu,e.kind)?cu[e.kind]:e.kind}function nx(e,t,n=lg){let r=[];for(let s of Array.isArray(e)?e:[])!s||typeof s!="object"||r.push({type:"operation",id:s.operation_id,at:typeof s.finished_at=="number"?s.finished_at:typeof s.requested_at=="number"?s.requested_at:null,operation:s});for(let s of Array.isArray(t)?t:[])!s||typeof s!="object"||r.push({type:"cleanup",id:s.bead_id,at:typeof s.at=="number"?s.at:null,cleanup:s});return r.sort((s,i)=>s.at===null&&i.at===null?String(s.id||"").localeCompare(String(i.id||"")):s.at===null?1:i.at===null?-1:i.at-s.at),r.slice(0,Math.max(0,n))}function rx(e){if(e.type==="cleanup")return!0;let t=e.operation;return J$.has(t.state)&&!t.dismissed&&!t.superseded_by}function sx(e,t,n={}){let r=nx(e,t,1/0),s=n.expanded===!0?lg:Z$,i=new Set(r.slice(0,s)),o=r.filter(a=>i.has(a)||rx(a));return{visible:o,hidden:r.length-o.length}}function ag(e){if(e.type==="cleanup")return"warn";let t=e.operation.state;return t==="succeeded"?"ok":t==="failed"?"fail":"live"}function ox(e){if(e.type==="cleanup")return"\uBA48\uCDA4";switch(e.operation.state){case"succeeded":return"\uC131\uACF5";case"failed":return"\uC2E4\uD328";case"retry_pending":return"\uC7AC\uC2DC\uB3C4 \uC911";case"running":return"\uC2E4\uD589 \uC911";default:return"\uB300\uAE30"}}function cg(e){let t=e.filter(n=>n.value);return t.length===0?"":c`<details class="worker-ev__details">
    <summary>세부</summary>
    <dl class="worker-ev__kv">
      ${t.map(n=>{let r=n.copy===!0?Qr(n.value):n.value;return c`<div>
          <dt>${n.term}</dt>
          <dd>${r}</dd>
        </div>`})}
    </dl>
  </details>`}function ug(e,t="",n=!1){return!e&&!t?"":c`<p
    class="worker-ev__explain${n?" worker-ev__explain--warn":""}"
  >
    <span class="worker-ev__cause">${e}</span>${t?c`<br />${t}`:""}
  </p>`}function ix(e,t){if(!e||typeof e!="object")return;let n=t&&typeof t=="object"?t.kind:"";if(!Object.hasOwn(ig,n))return;let r=e[ig[n]],s=r&&typeof r=="object"?r.timeout_ms:void 0;return typeof s=="number"&&Number.isFinite(s)?s:void 0}function ax(e,t){let n=rm(e,t),r=sm(e);return!n&&!r?"":c`<p class="worker-ev__why">
    ${n?c`<span class="worker-ev__why-line">${n}</span>`:""}${r?c`<span class="worker-ev__why-line">${r}</span>`:""}
  </p>`}function lx(e){return e.state!=="failed"||e.superseded_by||e.dismissed?"":c`<div class="worker-ev__acts">
    <button
      type="button"
      class="worker-ev__btn worker-repo-op__dismiss"
      data-operation-id=${e.operation_id}
      title="사람이 확인한 실패로 접수합니다 — 기록은 그대로 남고 해결 필요 집계에서만 빠집니다"
    >
      기록 닫기
    </button>
  </div>`}function cx(e,t){let n=e.operation,r=n.state==="failed",s=n.failure?n.failure.code:"";return c`<li
    class="worker-ev"
    data-operation-id=${n.operation_id}
    data-state=${n.state}
  >
    <span
      class="worker-ev__t"
      title=${e.at?nn(e.at):""}
      >${Vi(e.at)||"\u2014"}</span
    >
    <span class="worker-ev__node" aria-hidden="true"
      ><span class="worker-ev__dot worker-ev__dot--${ag(e)}"></span
    ></span>
    <div class="worker-ev__body">
      <div class="worker-ev__line1">
        <span class="worker-ev__what">${tx(n)}</span>
        <span class="worker-ev__meta"
          >${n.target_base}@${Gi(n.target_sha)}${typeof n.elapsed_ms=="number"?` \xB7 ${Jr(n.elapsed_ms)}`:""}</span
        >
        <span class="worker-ev__st worker-ev__st--${ag(e)}"
          >${ox(e)}</span
        >
        ${n.dismissed?c`<span class="worker-ev__st worker-ev__st--quiet">접수됨</span>`:""}
        ${n.superseded_by?c`<span class="worker-ev__st worker-ev__st--quiet">덮임</span>`:""}
        ${n.source==="manual"?c`<span
              class="worker-ev__st worker-ev__st--manual"
              title="사람이 배포 실행을 눌러 시작한 작업입니다"
              >수동</span
            >`:""}
      </div>
      ${r?ug(nm(n.failure_kind,s)):""}
      ${ax(n,ix(t,n))}
      ${lx(n)}
      ${cg([{term:"\uC2E4\uD328 \uCF54\uB4DC",value:r?s:""},{term:"script",value:[n.script_path||"",n.script_blob_sha?`blob ${Gi(n.script_blob_sha)}`:"",Number.isInteger(n.exit_code)?`exit ${n.exit_code}`:""].filter(Boolean).join(" \xB7 ")},{term:"\uB85C\uADF8",value:n.log_path||"",copy:!0},{term:"\uCD9C\uB825",value:n.output_tail||""}])}
    </div>
  </li>`}function ux(e){let t=e.cleanup,n=ns(t.step);return c`<li
    class="worker-ev"
    data-bead-id=${t.bead_id}
    data-state="cleanup_stalled"
  >
    <span
      class="worker-ev__t"
      title=${e.at?nn(e.at):""}
      >${Vi(e.at)||"\u2014"}</span
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
        ${Bp(t.step).map(r=>c`<li
              class="worker-step worker-step--${r.state}"
              data-step=${r.step}
            >
              <span class="worker-step__pip" aria-hidden="true"></span>
              <span class="worker-step__lb">${r.label}</span>
            </li>`)}
      </ol>
      ${ug(Nr(t.reason),typeof t.retry_count=="number"&&t.retry_count>0?`${t.retry_count}\uD68C \uC790\uB3D9 \uC7AC\uC2DC\uB3C4 \uD6C4\uC5D0\uB3C4 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4 \u2014 \uC815\uB9AC\uB97C \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uBA74 \uBA48\uCD98 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4.`:"\uC815\uB9AC\uB97C \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uBA74 \uBA48\uCD98 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4.",!0)}
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
      ${cg([{term:"\uC2E4\uD328 \uCF54\uB4DC",value:t.reason||""},{term:"\uC9C4\uB2E8",value:t.detail||""},{term:"\uB85C\uADF8",value:t.log_path||"",copy:!0},{term:"\uCD9C\uB825",value:t.output_tail||""}])}
    </div>
  </li>`}function dx(e){let t=typeof e.hidden=="number"?e.hidden:0,n=e.expanded===!0;return c`<section class="worker-repo-drawer" data-seam="repo-ops-timeline">
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
          ${e.events.map(r=>r.type==="cleanup"?ux(r):cx(r,e.repo_ops))}
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
  </section>`}function dg(e,t={}){let n=null;function r(){if(n===null){ct(c``,e);return}let o=sx(n.operations,n.cleanup_failures,{expanded:n.expanded});ct(dx({events:o.visible,hidden:o.hidden,expanded:n.expanded,repo:n.repo,repo_ops:n.repo_ops}),e)}e.addEventListener("click",o=>{let a=o.target;if(a?.closest?.('[data-seam="repo-ops-close"]')){i();return}a?.closest?.('[data-seam="repo-ops-more"]')&&n&&(n.expanded=!n.expanded,r())});function s(o){n={operations:o.operations,cleanup_failures:o.cleanup_failures,repo:o.repo||"",repo_ops:o.repo_ops||null,expanded:!1},r()}function i(){n!==null&&(n=null,r(),t.onClose&&t.onClose())}return{open:s,close:i,isOpen:()=>n!==null,refresh(o){n&&(n={operations:o.operations,cleanup_failures:o.cleanup_failures,repo:o.repo||"",repo_ops:o.repo_ops||null,expanded:n.expanded},r())}}}function px(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)?e:{}}function pg(e){let t=new Map;for(let r of Array.isArray(e)?e:[]){if(!r||typeof r.id!="string"||r.id.length===0)continue;let s=px(r.metadata).carried_from;if(!(typeof s!="string"||s.length===0))for(let i of Xs({dependencies:r.dependencies})){let o=t.get(i);o||(o=new Set,t.set(i,o)),o.add(r.id)}}let n=new Map;for(let[r,s]of t)n.set(r,[...s].sort());return n}var fx="session-preferred",_x=["external_roundtrip","user_feedback_loop"];function fg(e,t){if(!ko(e).includes(fx)||typeof t!="object"||t===null)return"";let n=t.session_preferred_reason;return typeof n=="string"&&_x.includes(n)?n:""}var mx="spec-after-blocker";function _g(e,t){return ko(e).includes(mx)&&Array.isArray(t)&&t.length>0}var gx=zt("views:worker:adapter"),mg="tab:worker:ready",gg="tab:worker:blocked",hg="tab:worker:in-progress",bg="tab:worker:resolved",yg="tab:worker:closed",hx="\u{1F512} blocked",bx={revision:0,auto_advance:!1,auto_merge:!1,slots:pa,queue:[],serial_lanes:[],serial_lane_count:0,pr_wait:[],done:[]},yx=["claude_account","codex_account"],vx=[...Ts,...yx];function kx(e){let t=e&&e.parent;return(typeof t=="string"?t.length>0:!!(t&&t.id))||/\.\d+$/.test(e&&e.id||"")}function wx(e){let t=e&&typeof e=="object"?e.awaiting_user:void 0,n=typeof t=="string"?t.trim():"";return n.length>0?`${Vl}: ${n}`:Vl}function ds(e){return e&&typeof e=="object"?e:{}}function $x(e){let t={};for(let n of vx){let r=e[n];typeof r=="string"&&r.length>0&&(t[n]=r)}return t}function xx(e){let t=e.replace(/\/+$/,""),n=t.lastIndexOf("/");return n>=0?t.slice(n+1):t}function vg(e={}){let{queueStore:t,issueStores:n,transport:r,getWorkspacePath:s,onInvalidate:i}=e,o=n?ys(n,void 0,{client_ids:[mg,gg,hg,bg,yg]}):null,a=new Map,l={},u=null,d=0,_=null,m=!1;function h(){m||!i||i()}function g(M){return u===M?l:{}}async function T(){if(!r||m)return;let M=s?.()||"";if(u===M||_&&_.key===M&&_.generation===d)return;let q=++d;_={key:M,generation:q};let G=null;try{G=await Promise.resolve(r("get-session-defaults",{}))}catch(P){if(q!==d)return;_=null,gx("get-session-defaults failed: %o",P),h();return}q===d&&(l=G&&typeof G.values=="object"&&G.values!==null?{...G.values}:{},u=M,_=null,h())}function k(){u=null,d+=1,T()}function ee(){for(let[M,q]of a)q==="failed"&&a.delete(M)}function ne(M,q){return o?o.selectBoardColumn(M,q):[]}function z(M,q,G,P){let $=new Set(G.map(V=>V.id)),O=new Set,C=new Map,oe=[];for(let V of[...q,...G]){if(O.has(V.id)||kx(V))continue;let ie=wo(V,M);ie.location===null&&(O.add(V.id),C.set(V.id,ie),oe.push(V))}let ue=Zm(oe,us(P)),me=ds(M.bead_scope);return ue.map(V=>{let ie=C.get(V.id),de=hs(V),Oe=de.evidence==="published",qe=typeof V.workflow?.route=="string"&&V.workflow.route||(V.metadata&&typeof V.metadata.route=="string"?V.metadata.route:""),Ie=ie.worker_ineligible,ge=Ie||!Object.hasOwn(V,"labels")?"":fg(V.labels,V.metadata),F=$.has(V.id),ce=F?Xs(V):[],pe=[];F&&ce.length===0&&pe.push(hx),ie.awaiting_user&&pe.push(wx(V.metadata)),ie.missing_description?pe.push("missing_description"):ie.spec==="conflict"?pe.push("spec_id_conflict"):ie.spec==="none"?pe.push("spec \uC5C6\uC74C"):ie.spec==="draft"&&pe.push("spec \uBBF8\uBC1C\uD589(draft)");let B=me[V.id];return{bead_id:V.id,title:V.title||V.id,route:qe,spec_id:de.conflict?"":de.path,published:Oe,blocked:F,blocked_by:ce,labels:Array.isArray(V.labels)?V.labels:[],created_at:V.created_at,updated_at:V.updated_at,status:V.status,workflow:V.workflow||null,exec_pins:$x(ds(V.metadata)),rec:null,...B&&Array.isArray(B.scope)?{scope:B.scope}:{},eligible:ie.placeable,route_ok:ie.route_ok,awaiting_user:ie.awaiting_user,missing_description:ie.missing_description,placement_spec:ie.spec,reason:pe.join(" \xB7 "),worker_ineligible:Ie,session_preferred:ge.length>0,session_preferred_reason:ge,spec_after_blocker:_g(V.labels,ce),release_info:V.release_info,dependents_info:V.dependents_info}})}function N(M){let[q,G,P,$,O]=M,C=bi([...q,...G,...P,...$,...O]),oe=pg([...q,...G,...P,...$]),ue={},me=(V,ie)=>{if(!V||typeof V.id!="string"||V.id.length===0)return;let de=ue[V.id]||(ue[V.id]={});if(typeof V.priority=="number"&&!("priority"in de)&&(de.priority=V.priority),typeof V.from_id=="string"&&!("from_id"in de)&&(de.from_id=V.from_id),ie&&!("metadata"in de)){de.metadata=ds(V.metadata);let Oe=ds(V.workflow).route;typeof Oe=="string"&&Oe.length>0&&(de.route=Oe)}};for(let V of[...q,...G,...P])me(V,!0);for(let V of[...$,...O])me(V,!1);for(let V of new Set([...Object.keys(ue),...C.keys()])){let ie=yi(C,V);if(ie.total>0){let de=ue[V]||(ue[V]={});de.rollup=ie}}for(let[V,ie]of oe){let de=ue[V]||(ue[V]={});de.carried_to=ie}return ue}function D(M,q,G,P){let $=new Set((Array.isArray(M.done)?M.done:[]).map(C=>C?.bead_id).filter(C=>typeof C=="string")),O=[];for(let C of q){let oe=Ar(C.closed_at);if(typeof C.id!="string"||$.has(C.id)||oe===null||P!==void 0&&oe<P||typeof C.comment_count!="number"||C.comment_count<=0)continue;let ue=`${G}\0${C.id}\0${String(C.updated_at)}\0${C.comment_count}`,me=a.get(ue);if(me===void 0&&r&&(a.set(ue,"pending"),Promise.resolve(r("get-comments",{id:C.id})).then(ie=>{let de=Array.isArray(ie)&&ie.some(Oe=>Da(typeof Oe?.text=="string"?Oe.text:"")?.lane==="session");a.set(ue,de?"session":"not-session"),h()}).catch(()=>{a.set(ue,"failed"),h()})),me!=="session")continue;let V=Ar(C.started_at);O.push({id:C.id,title:C.title||C.id,reason:"",draggable:!1,done:!0,lane:"done",selectable:!1,selected:!1,badges:["\uC138\uC158 \uC791\uC5C5"],alert:!1,usage:null,work_ms:V!==null&&oe>=V?oe-V:null,work_kind:"session",done_at:oe,created_at:C.created_at,updated_at:C.updated_at})}return O}return{read(M){if(!t)return{workspaces:[],workspaces_state:[]};let q=t.get()||bx,G=s?.()||"",P=M&&typeof M.done_since=="number"?M.done_since:void 0,$=ne(mg,"ready"),O=ne(gg,"blocked"),C=ne(hg,"in_progress"),oe=ne(bg,"resolved"),ue=ne(yg,"closed");return{workspaces:[{...q,bead_titles:{...ds(q.bead_titles),...Object.fromEntries([...$,...O].filter(me=>me&&typeof me.id=="string").map(me=>[me.id,me.title||me.id]))},root_dir:G,name:xx(G),runnable:z(q,$,O,M?M.candidate_sort:void 0),session_done:D(q,ue,G,P),bead_overlay:N([$,O,C,oe,ue])}],workspaces_state:[{root_dir:G,revision:q.revision,auto_advance:q.auto_advance,auto_merge:q.auto_merge,slots:typeof ds(q.workspace_info).slots=="number"?ds(q.workspace_info).slots:q.slots,runner_catalog:q.runner_catalog,execution_defaults:q.execution_defaults,session_defaults:g(G),orchestration_model:q.orchestration_model,orchestration_effort:q.orchestration_effort,orchestration_speed:q.orchestration_speed,quick_fix_orchestration_model:q.quick_fix_orchestration_model,quick_fix_orchestration_effort:q.quick_fix_orchestration_effort,quick_fix_orchestration_speed:q.quick_fix_orchestration_speed,issue_prefix:""}]}},ensureSessionDefaults(){T()},refreshSessionDefaults:k,notifyIssuesChanged:ee,destroy(){m=!0,d+=1,_=null,a.clear()}}}var el=1,kg=5,Ax={root_dir:"",name:"",auto_advance:!1,auto_merge:!1,slots:el,revision:0,runner_catalog:{},items:[],sublanes:{parallel:[],serial:[]},serial_lane_count:0,raw_queue_length:0,live_count:0,over_cap:!1,merge:{positions:new Map,resolutions:new Map,continuations:new Map,authorities:new Map,state:{active:null,failures:{},waiting:null},auto_excluded:[],running:!1},token_total:null,cleanup_failures:[],declared_base:null,repo_operations:[]};function gn(e){return e&&typeof e=="object"?e:{}}var xg="beads-ui.worker.candidate-filter",uu={show_blocked:!1,readiness:"all",routes:[]},Sx=1e3;function Ex(){try{let e=window.localStorage.getItem(xg);if(!e)return{...uu};let t=JSON.parse(e);if(!t||typeof t!="object")return{...uu};let n=t.readiness;return{show_blocked:t.show_blocked===!0,readiness:n==="ready"||n==="not_ready"?n:"all",routes:rs(t.routes)}}catch{return{...uu}}}function Tx(e){try{window.localStorage.setItem(xg,JSON.stringify(e))}catch{}}var Ag="bdui.worker.done-range";function Rx(){try{let e=window.localStorage.getItem(Ag);return e===null?"today":Xn(e)}catch{return"today"}}function Cx(e){try{window.localStorage.setItem(Ag,e)}catch{}}function wg(e){let t=Array.isArray(e)&&e.length>0?e[0]:null;if(!t)return"";let n=typeof t.title=="string"?t.title:t.id||"";return n.length>22?`${n.slice(0,22)}\u2026`:n}function Ox(e){return e==="receipt_not_current"?"\uB9AC\uBDF0 \uD6C4\uC5D0\uB3C4 \uC601\uC218\uC99D\uC774 \uCD5C\uC885 head\uC5D0 \uC720\uD6A8\uD558\uC9C0 \uC54A\uC74C":e==="cancelled"?"\uB9AC\uBDF0 \uC138\uC158 \uCDE8\uC18C\uB428":e.startsWith("launch_failed:")?`\uB9AC\uBDF0 \uC138\uC158 \uC2DC\uC791 \uC2E4\uD328(${e.slice(14)})`:e.startsWith("session_failed:")?`\uB9AC\uBDF0 \uC138\uC158 \uBE44\uC815\uC0C1 \uC885\uB8CC(${e.slice(15)})`:`\uB9AC\uBDF0 \uC138\uC158 \uC2E4\uD328(${e})`}function $g(e){if(e.startsWith("receipt_unbacked:"))return`\uC2E4\uD589 \uC601\uC218\uC99D \uC790\uB3D9 \uAC80\uC99D \uBD88\uAC00(${e.slice(17)}) \u2014 [\uBA38\uC9C0] \uD074\uB9AD\uC73C\uB85C \uC218\uB3D9 \uC9C4\uD589 \uAC00\uB2A5`;switch(e){case"not_in_pr_wait":return"PR \uB300\uAE30 \uC0C1\uD0DC \uB3D9\uAE30\uD654 \uC2E4\uD328";case"resolution_round_cap":return"\uCDA9\uB3CC \uD574\uC18C 2\uD68C \uCD08\uACFC";case"resolution_rebase_cap":return"\uD050 \uC7AC\uCDA9\uB3CC 3\uD68C \uCD08\uACFC";case"resolution_timeout":return"\uCDA9\uB3CC \uD574\uC18C \uB300\uAE30 \uC2DC\uAC04 \uCD08\uACFC";case"resolution_refused":return"\uD574\uC18C \uC138\uC158 \uB514\uC2A4\uD328\uCE58 \uAC70\uBD80";case"worktree_missing":return"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uD574\uC18C \uD544\uC694";case"worktree_restore_branch_mismatch":return"\uC6CC\uD06C\uD2B8\uB9AC \uBCF5\uC6D0 \uC2E4\uD328 \u2014 \uBE0C\uB79C\uCE58 \uC774\uB984 \uBD88\uC77C\uCE58";case"worktree_restore_path_exists":return"\uC6CC\uD06C\uD2B8\uB9AC \uBCF5\uC6D0 \uC2E4\uD328 \u2014 \uACBD\uB85C \uC774\uBBF8 \uC788\uC74C";case"worktree_restore_branch_missing":return"\uC6CC\uD06C\uD2B8\uB9AC \uBCF5\uC6D0 \uC2E4\uD328 \u2014 origin\uC5D0 \uBE0C\uB79C\uCE58 \uC5C6\uC74C";case"worktree_restore_branch_diverged":return"\uC6CC\uD06C\uD2B8\uB9AC \uBCF5\uC6D0 \uC2E4\uD328 \u2014 \uB85C\uCEEC \uBE0C\uB79C\uCE58\uAC00 origin\uACFC \uB2E4\uB984";case"worktree_restore_failed":return"\uC6CC\uD06C\uD2B8\uB9AC \uBCF5\uC6D0 \uC2E4\uD328";case"merge_unconfirmed_timeout":return"\uBA38\uC9C0 \uD655\uC778 \uC2DC\uAC04 \uCD08\uACFC";case"pr_closed_unmerged":return"PR \uB2EB\uD798";case"merge_error":return"\uBA38\uC9C0 \uC624\uB958";case"spec_id_missing":return"\uC2A4\uD399 ID \uAE30\uB85D \uC5C6\uC74C";default:return e}}function Ix(e){if(e==="lane_occupied")return"\uC2E4\uD589 \uB808\uC778\uC5D0 \uB0A8\uC544 \uC788\uC5B4 \uBA38\uC9C0 \uB300\uC0C1\uC774 \uC544\uB2D9\uB2C8\uB2E4";let t="\uBA38\uC9C0 \uD050\uC5D0 \uB123\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 (\uC774\uBBF8 \uB300\uAE30 \uC911\uC774\uAC70\uB098 \uB300\uC0C1 \uC544\uB2D8)";return typeof e=="string"&&e.length>0?`${t}: ${e}`:t}function Lx(e){if(!e||typeof e!="object")return"\uC138\uC158 \uAE30\uB3D9 \uC751\uB2F5\uC744 \uBC1B\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4";if(e.conflict===!0)return"\uD050\uAC00 \uBC14\uB00C\uC5B4 \uD074\uB9AD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uB20C\uB7EC\uC8FC\uC138\uC694";if(e.session==="already_running")return`\uC774\uBBF8 \uC5F4\uB824 \uC788\uC2B5\uB2C8\uB2E4 \xB7 ${e.tmux_window||"?"}`;if(e.launched!==!0)return`\uC138\uC158 \uAE30\uB3D9 \uC2E4\uD328: ${e.reason||"unknown"}`;let t=typeof e.runner=="string"?e.runner:"claude";return e.mode==="fork"?null:`${t} \uC0C8 \uC138\uC158\uC73C\uB85C \uC2DC\uC791 (${e.fallback_reason||"unknown"})`}function Dx(e){return e&&e.launched===!0?"success":"error"}function Px(e){if(e==="worker_sessions_busy")return"\uD574\uC18C \uB300\uAE30 \u2014 \uC2E4\uD589 \uC2AC\uB86F \uB300\uAE30 \uC911";if(typeof e!="string"||!e.startsWith("completion_waiting:"))return null;let t=e.slice(19);if(t.length===0)return null;switch(t){case"gating":return"\uBA38\uC9C0 \uC870\uAC74 \uD655\uC778 \uC911";case"merging":return"\uBA38\uC9C0 \uC911";case"cleaning":return"\uB9C8\uBB34\uB9AC \uC911";case"paused":return"\uC790\uB3D9 \uC9C4\uD589 \uC77C\uC2DC\uC815\uC9C0";case"needs_human":return"\uD655\uC778 \uD544\uC694";default:return null}}function Nx(e){if(!e||typeof e!="object")return null;switch(e.state){case"waiting":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC911",live:!0};case"yielded":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uACC4\uC18D \uC911 \xB7 \uC644\uB8CC \uD6C4 \uC6B0\uC120 \uBA38\uC9C0",live:!0};case"ready":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC644\uB8CC \xB7 \uC7AC\uAC80\uC99D \uB300\uAE30",live:!1};default:return null}}var Mx=new Set(["paused","needs_human","waiting_metadata","reviewing","retrying"]),qx=new Set(["waiting_metadata","reviewing","retrying"]),du=new Set(["review_receipt_missing","review_receipt_stale","review_receipt_invalid","review_receipt_undetermined"]);function jx(e){let t=e&&typeof e=="object"?e.auto_resolution:null,n=t&&typeof t=="object"&&!Array.isArray(t)?t:null;if(!n||!e)return null;let r=typeof n.origin_reason=="string"&&n.origin_reason.length>0?`\uC6D0 \uC0AC\uC720: ${n.origin_reason}`:"";switch(e.phase){case"waiting_metadata":{let s=typeof n.origin_reason=="string"&&n.origin_reason.startsWith("receipt_unbacked:")?n.origin_reason.slice(17):null;return s!==null?{label:`\uC601\uC218\uC99D \uB300\uAE30 \u2014 ${s}`,details:[r,"\uC0C8 \uCEE4\uBC0B\xB7\uC0C8 \uC601\uC218\uC99D\xB7\uC7AC\uAD00\uCE21\uC774 \uC624\uBA74 \uC790\uB3D9 \uC7AC\uAC1C"].filter(Boolean),live:!1}:{label:"\uC815\uC815 \uB300\uAE30",details:[r,"\uBA54\uD0C0\uB370\uC774\uD130 \uC815\uC815\uC774 \uAD00\uCE21\uB418\uBA74 \uC790\uB3D9 \uC7AC\uAC1C"].filter(Boolean),live:!1}}case"retrying":{let s=Number.isInteger(n.attempts)?Math.max(0,Number(n.attempts)):0,i=Number.isInteger(n.attempt_cap)&&Number(n.attempt_cap)>0?Number(n.attempt_cap):0,o=typeof n.next_at=="number"?nn(n.next_at):"",a=typeof n.last_error=="string"&&n.last_error.length>0?n.last_error:"";return{label:i>0?`\uC7AC\uC2DC\uB3C4 ${Math.min(s,i)}/${i}`:`\uC7AC\uC2DC\uB3C4 ${s}`,details:[r,o?`\uB2E4\uC74C \uC2DC\uAC01 ${o}`:"",a?`\uB9C8\uC9C0\uB9C9 \uC624\uB958: ${a}`:""].filter(Boolean),live:!0}}default:return null}}function Fx(e){if(typeof e!="string")return"";for(let t of["retry_exhausted:","auto_review_exhausted:"])if(e.startsWith(t))return e.slice(t.length);return""}function Bx(e,t=null){if(!e||typeof e!="object")return null;let n="";switch(e.phase){case"gating":n="\uBA38\uC9C0 \uC870\uAC74 \uD655\uC778 \uC911";break;case"merging":n="\uBA38\uC9C0 \uC911";break;case"cleaning":n="\uB9C8\uBB34\uB9AC \uC911";break;case"waiting_metadata":case"reviewing":case"retrying":if(!t)return null;n=t.label;break;case"paused":n="\uC790\uB3D9 \uC9C4\uD589 \uC77C\uC2DC\uC815\uC9C0";break;case"needs_human":n="\uD655\uC778 \uD544\uC694";break;case"completed":return null;default:return null}let r=[n];e.head_sha&&r.push(`head ${e.head_sha}`),e.base_sha&&r.push(`base ${e.base_sha}`),(e.failure_stage||e.failure_reason)&&r.push(`${e.failure_stage||"failure"} \xB7 ${e.failure_reason||"\uC6D0\uC778 \uBBF8\uC0C1"}`);let s=Fx(e.terminal_reason);s&&r.push(`\uC6D0 \uC0AC\uC720: ${s}`);let i=e.phase==="needs_human"&&!s?cs(e.terminal_reason):null;i&&r.push(e.failure_stage?`${e.failure_stage} \xB7 ${i}`:i);for(let o of t?t.details:[])r.push(o);return e.active_attempt_id&&r.push(`attempt ${e.active_attempt_id}`),e.evidence&&r.push(e.evidence),e.log_path&&r.push(e.log_path),{badge:n,title:r.join(`
`),alert:e.phase==="needs_human",lock_actions:!Mx.has(e.phase)}}function Ux(e){if(!e||typeof e!="object")return[];let t=e.blocking_codes;return Array.isArray(t)?t.filter(n=>typeof n=="string"&&n.length>0):[]}function Wx(e){if(!e||typeof e!="object")return[];let t=e.badge_codes;return Array.isArray(t)?t.filter(n=>typeof n=="string"&&n.length>0):[]}function Hx(e){let t=e.queue_failure?`\uBA38\uC9C0 \uC2E4\uD328 \uC6D0\uBB38: ${e.queue_failure}`:e.auto_skip?`\uC790\uB3D9 \uC81C\uC678 \uC6D0\uBB38: ${e.auto_skip}`:"",n=(i,o={})=>{let a=[o.title||"",t].filter(Boolean);return{label:i,title:a.join(`
`),live:o.live===!0,alert:o.alert===!0}};if(e.continuation_required)return n("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694",{alert:!0});if(e.queueing)return e.queueing==="cleanup"?n("\uC815\uB9AC \uC7AC\uC2DC\uB3C4 \uC694\uCCAD \uC911",{title:"\uC11C\uBC84 \uC751\uB2F5\uC744 \uAE30\uB2E4\uB9AC\uB294 \uC911\uC785\uB2C8\uB2E4",live:!0}):n("\uD050 \uB4F1\uB85D \uC911",{title:"\uBA38\uC9C0 \uD050\uC5D0 \uB123\uB294 \uC911 \u2014 \uC11C\uBC84 \uC751\uB2F5\uC744 \uAE30\uB2E4\uB9BD\uB2C8\uB2E4",live:!0});if(e.merge_step)return e.gate?.tier==="merged"?n("\uBA38\uC9C0\uB428",{title:e.merge_step.label,alert:e.merge_step.failed===!0}):n("\uBA38\uC9C0 \uC911",{title:e.merge_step.label,live:!0});if(e.conflict_badge)return n(e.conflict_badge,{live:e.conflict_live===!0});if(e.auto_resolution)return n(e.auto_resolution.label,{title:e.auto_resolution.details.join(`
`),live:e.auto_resolution.live===!0});if(e.recovery?.lock_actions)return n(e.recovery.badge,{title:e.recovery.title,live:!0});if(e.cleanup_failed)return n(e.cleanup_label?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${e.cleanup_label}`:"\uC815\uB9AC \uBA48\uCDA4",{title:e.cleanup_failed.reason||"",alert:!0});if(e.base_exception)return n("\uB2E4\uB978 base \uB300\uC0C1",{title:e.base_exception,alert:!0});let r=Ux(e.receipt_check),s=e.conflicting||e.gate?.reason==="base_behind"||r.length>0;if(e.auto_pending&&s)return n("\uD655\uC778 \uC911",{title:"\uBA38\uC9C0 \uD050\uAC00 \uC790\uB3D9\uC73C\uB85C \uCC98\uB9AC \uC911 \u2014 \uB2E4\uC74C \uAD00\uCE21\uC744 \uAE30\uB2E4\uB9BD\uB2C8\uB2E4",live:!0});if(e.conflicting)return n("\uCDA9\uB3CC \uD574\uACB0 \uD544\uC694",{alert:!0});if(e.gate?.reason==="base_behind")return n("base \uAC31\uC2E0 \uD544\uC694",{alert:!0});if(du.has(e.gate?.reason)){let i=e.gate.reason==="review_receipt_stale"?"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC774 \uD604\uC7AC head\uC758 \uC870\uC0C1\uC774 \uC544\uB2D9\uB2C8\uB2E4 \u2014 \uD788\uC2A4\uD1A0\uB9AC \uC7AC\uC791\uC131\xB7\uBE0C\uB79C\uCE58 \uB9AC\uC14B \uBCF5\uAD6C \uACBD\uB85C\uC785\uB2C8\uB2E4. [\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0]\uAC00 \uC774 \uBCF4\uB958\uC758 \uCD9C\uAD6C\uC785\uB2C8\uB2E4":e.gate.reason==="review_receipt_invalid"?"\uB9AC\uBDF0 \uC601\uC218\uC99D \uAE30\uB85D\uC774 \uC131\uB9BD\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4 \u2014 [\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0]\uAC00 \uC774 \uBCF4\uB958\uC758 \uCD9C\uAD6C\uC785\uB2C8\uB2E4":e.gate.reason==="review_receipt_undetermined"?"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC758 ancestry probe\uB97C \uC644\uB8CC\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 \u2014 [\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0]\uAC00 \uC774 \uBCF4\uB958\uC758 \uCD9C\uAD6C\uC785\uB2C8\uB2E4":"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 [\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0]\uAC00 \uC774 \uBCF4\uB958\uC758 \uCD9C\uAD6C\uC785\uB2C8\uB2E4";if(e.review_session?.active===!0)return n(e.review_session.origin==="auto"?"\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694 \xB7 \uC790\uB3D9 \uB9AC\uBDF0 \uC138\uC158 \uC2E4\uD589 \uC911":"\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694 \xB7 \uB9AC\uBDF0 \uC138\uC158 \uC2E4\uD589 \uC911",{title:`${i}
\uB9AC\uBDF0 \uC138\uC158\uC774 \uC2E4\uD589 \uC911\uC785\uB2C8\uB2E4 \u2014 \uB05D\uB098\uBA74 \uC601\uC218\uC99D\uC744 \uB2E4\uC2DC \uD310\uC815\uD569\uB2C8\uB2E4`,live:!0});if(e.auto_review_wait==="slot")return n("\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694 \xB7 \uB9AC\uBDF0 \uC138\uC158 \uC2AC\uB86F \uB300\uAE30",{title:`${i}
\uC2E4\uD589 \uC2AC\uB86F\uC774 \uBE44\uBA74 \uC790\uB3D9\uC73C\uB85C \uB9AC\uBDF0 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4. \uC9C0\uAE08 \uD074\uB9AD\uD558\uBA74 \uC989\uC2DC \uB744\uC6C1\uB2C8\uB2E4`,live:!0});if(e.review_session?.failure){let o=e.review_dispatch?.state==="exhausted"&&e.review_session.origin==="auto";return n(`\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694 \xB7 ${o?"\uC790\uB3D9 \uB9AC\uBDF0 1\uD68C \uC18C\uC9C4 \xB7 ":""}${Ox(e.review_session.failure)}`,{title:`${i}
\uC9C1\uC804 \uB9AC\uBDF0 \uC138\uC158 \uC885\uB8CC \uC0AC\uC720: ${e.review_session.failure}`,alert:!0})}return n("\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694",{title:i,alert:!0})}return e.gate?.reason==="spec_id_missing"?n("\uC2A4\uD399 ID \uB204\uB77D",{title:"native spec_id \uBBF8\uAE30\uB85D \u2014 bd update --spec-id \uD544\uC694",alert:!0}):r.length>0?n(`\uC601\uC218\uC99D \uD655\uC778 \uD544\uC694 \xB7 ${r[0]}`,{title:`\uC131\uB9BD\uD558\uC9C0 \uC54A\uB294 \uC2E4\uD589 \uC601\uC218\uC99D \u2014 ${r.join(", ")}`,alert:!0}):e.recovery?n(e.recovery.badge,{title:e.recovery.title,alert:!0}):e.gate?.tier==="verify"&&e.gate.gate_badge==="\uAC80\uC99D \uC2E4\uD328"?n("\uAC80\uC99D \uC2E4\uD328",{title:e.gate.reason||"",alert:!0}):e.queue_failure?n(`\uBA38\uC9C0 \uC2E4\uD328 \u2014 ${$g(e.queue_failure)}`,{title:e.queue_failure,alert:!0}):e.auto_skip?n(`\uC790\uB3D9 \uC81C\uC678 \u2014 ${$g(e.auto_skip)}`,{title:e.auto_skip,alert:!0}):e.queued&&!e.queue_active?n(`\uBA38\uC9C0 \uB300\uAE30 #${e.queue_position}`):e.gate?.enabled===!0?n("\uBA38\uC9C0 \uAC00\uB2A5"):e.gate?.tier==="merged"?n("\uBA38\uC9C0\uB428"):e.gate?.tier==="closed_unmerged"?n("\uB2EB\uD798",{alert:!0}):e.activity?n("\uD655\uC778 \uC911",{live:!0}):e.gate?.reason==="pr_repo_foreign"?n("\uC678\uBD80 \uC800\uC7A5\uC18C PR",{title:"\uB2E4\uB978 \uC800\uC7A5\uC18C\uC758 PR\uC785\uB2C8\uB2E4. \uC774 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uC5D0\uC11C\uB294 \uC0C1\uD0DC\uB97C \uAD00\uCE21\xB7\uBA38\uC9C0\xB7\uC815\uB9AC\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4."}):e.gate?.tier==="undecidable"||e.gate?.reason==="mergeability_unknown"?n("\uC0C1\uD0DC \uD655\uC778 \uC2E4\uD328",{title:e.gate.reason||"",alert:!0}):e.gate?.tier==="unobserved"||e.gate?.tier==="verify"||e.gate?.gate_badge==="\uAD00\uCE21 \uB300\uAE30"?n("\uD655\uC778 \uC911"):e.gate?.gate_badge?n(e.gate.gate_badge,{title:e.gate.reason||"",alert:e.gate.enabled!==!0}):null}function zx(e,t,n,r,s=null,i=null,o=null,a=!1,l=null,u=!0,d=null,_=null,m=null,h={},g=!1,T={},k=null,ee={active:!1,failure:null,origin:null},ne=!1,z={}){let N=!!l&&l.position>0,D=!!l?.continuation_action&&l.continuation_action.continuation===null,M=!!l&&l.active===!0,q=l&&l.failure||null,G=Px(l?l.waiting:null),P=n[e]||null,$=P&&P.gate?P.gate:null,O=P&&P.pr?P.pr:null,C=z.foreign===!0,oe=C&&typeof z.repo_slug=="string"?z.repo_slug:"",ue=C&&typeof z.pr_url=="string"?z.pr_url:"",me=C&&typeof z.pr_number=="number"?z.pr_number:null,V=Nx(l?l.resolution:null),ie=jx(m),de=Bx(m,ie),Oe=l&&l.authority||null,qe=l&&l.review_dispatch||null,Ie=l?.hold?.auto_review_wait==="slot"?"slot":null,ge=!!m&&typeof m=="object"&&qx.has(m.phase),F=N&&!M&&(!Oe||ge||Oe.source==="automatic"&&!g),ce=o==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":V?V.badge:o==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC911":G,pe=!!$&&$.base_badge==="\uCDA9\uB3CC",B=!!$&&$.enabled===!0,U=Ro({bead_id:e,merge_sha:T.merge_sha,cleanup_cursor:T.cleanup_cursor,merge_progress:i&&i.merge_progress?i.merge_progress:null,cleanup_failed:r,repo_operations:T.repo_operations}),Re=ca(U),W=i&&!U&&(i.queueing??null)?i.queueing:null,te=!!r&&["repo_operations","post_merge_jobs","child_sweep","branch_cleanup","parent_close"].includes(r.step)&&!!$&&$.tier==="merged",J=r&&r.step==="repo_operations"&&U?.failed===!0&&(U.step==="deploy"||U.step==="verify")?U.step:null,Y=a&&!!r&&!!$&&$.tier==="merged",ke=F&&(B||pe||$?.reason==="base_behind"||du.has($?.reason)||te||Y),fe=du.has($?.reason),Le=a&&pe&&u===!1,Ne=_r(h,e,{external:a,merge_active:M||U?.step==="merge",merge_queued:N,conflict_active:!!o,cleanup_active:Re,merged:!!r||$?.tier==="merged"}),Je=!!Ne.operation,Be=!!r||m?.phase==="needs_human"||!!Ne.error,re=N&&!q&&!D&&!te&&!(de&&de.lock_actions),Q=Hx({auto_pending:re,continuation_required:D,queueing:W,merge_step:U,conflict_badge:ce,conflict_live:V?.live===!0||o==="running",auto_resolution:ie,recovery:de,cleanup_failed:r,cleanup_label:r?ns(r.step):null,base_exception:_,conflicting:pe,gate:$,receipt_check:P&&P.receipt_check?P.receipt_check:null,queue_failure:q,auto_skip:d,queued:N,queue_active:M,queue_position:l?l.position:0,review_session:ee,review_dispatch:qe,auto_review_wait:Ie,activity:ce?null:i&&i.activity||null}),Te=Q?.live===!0&&Q.title?c`<span title=${Q.title}>${Q.label}</span>`:Q?.label||null,et=Wx(P&&P.receipt_check?P.receipt_check:null);return{id:e,title:a?c`${t}<span class="muted"> · 세션</span>`:t,reason:r&&U?.active!==!0?la(r.step):"PR \uB300\uAE30",draggable:!1,done:!0,lane:"pr_wait",...k?{dependency_chips:k}:{},external:a,pr_number:me??(O&&typeof O.number=="number"?O.number:null),pr_url:ue||(O&&typeof O.url=="string"?O.url:""),...oe?{foreign_repo:oe}:{},completion_badge:Q?.live!==!0&&Q?.title?Q.label:null,completion_title:Q?.title||"",...m?.phase==="needs_human"&&typeof m.log_path=="string"&&m.log_path.length>0?{log_path:m.log_path}:{},...et.length>0?{receipt_badge:{codes:et}}:{},badges:Te?[Te]:[],live_badge:Q?.live===!0?Te:null,usage:s,alert:Q?.alert===!0,merge_action:$?.tier==="merged"&&!te&&!Y?!1:!N||D||F||fe,cancel_action:N&&!D,cancel_enabled:!M&&!(de&&de.lock_actions),cancel_title:de&&de.lock_actions?`${de.badge} \u2014 \uC911\uB2E8\uD558\uB824\uBA74 \uC0C1\uB2E8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8\uC744 \uC0AC\uC6A9\uD558\uC138\uC694`:M?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"\uBA38\uC9C0 \uD050\uC5D0\uC11C \uC774 \uD56D\uBAA9\uC744 \uBE8D\uB2C8\uB2E4 (\uB2E4\uC2DC [\uBA38\uC9C0]\uB85C \uB123\uC744 \uC218 \uC788\uC2B5\uB2C8\uB2E4)",discard:Ne,discard_action:Ne.action,resolve_action:Be,resolve_enabled:!ne,resolve_title:ne?"\uC138\uC158 \uAE30\uB3D9 \uC694\uCCAD \uC911 \u2014 \uC11C\uBC84 \uC751\uB2F5\uC744 \uAE30\uB2E4\uB9BD\uB2C8\uB2E4":"\uC774 \uC2E4\uD328\uB97C \uC0AC\uB78C\uC774 \uC774\uC5B4\uBC1B\uB294 \uB300\uD654\uD615 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4 \u2014 \uAE30\uB85D\uB41C \uC138\uC158\uC774 \uC788\uC73C\uBA74 fork\uD558\uACE0, \uC5C6\uC73C\uBA74 \uC0C8 \uC138\uC158\uC5D0 \uC0AC\uC720\uB97C \uC2E3\uC2B5\uB2C8\uB2E4",merge_step:U,discard_enabled:Ne.enabled,discard_title:Ne.title,merge_enabled:!U&&!W&&!o&&!Je&&!_&&!(de&&de.lock_actions)&&!Le&&ee.active!==!0&&(B||pe||$?.reason==="base_behind"||fe||te||Y||ke||ge&&!M),merge_label:D?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":te||Y?J==="deploy"?"\uBC30\uD3EC \uC7AC\uC2DC\uB3C4 \uD6C4 \uC815\uB9AC":J==="verify"?"\uAC80\uC99D \uC7AC\uC2DC\uB3C4 \uD6C4 \uC815\uB9AC":"\uC815\uB9AC \uC7AC\uC2DC\uB3C4":pe&&!U&&!te?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":$?.reason==="base_behind"?"base \uAC31\uC2E0 \uD6C4 \uBA38\uC9C0":fe?"\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0":F?"\uB2E4\uC2DC \uBA38\uC9C0":void 0,merge_title:Je?Ne.error?`\uD3D0\uAE30 \uC2E4\uD328: ${Ne.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${Ne.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:D?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":W?"\uC694\uCCAD\uC744 \uBCF4\uB0B4\uB294 \uC911 \u2014 \uC11C\uBC84 \uC751\uB2F5\uC744 \uAE30\uB2E4\uB9BD\uB2C8\uB2E4":U?`\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 ${U.label}`:J?`\uBA38\uC9C0 \uC644\uB8CC \u2014 ${J==="deploy"?"\uBC30\uD3EC":"\uAC80\uC99D"} \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD574 \uC815\uB9AC\uAC00 \uBA48\uCDC4\uC2B5\uB2C8\uB2E4. \uD074\uB9AD\uD558\uBA74 \uC800\uC7A5\uC18C \uC791\uC5C5\uBD80\uD130 \uC815\uB9AC\uB97C \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4`:Y?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uB2E4\uC2DC \uC2DC\uB3C4\uD569\uB2C8\uB2E4":Le?"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uC9C1\uC811 \uD574\uC18C\uD558\uC138\uC694":o==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC2E4\uD589 \uC911 \u2014 \uC644\uB8CC \uD6C4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":o==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC77C\uC2DC\uC815\uC9C0 \u2014 \uC7AC\uAC1C \uD6C4 \uC644\uB8CC\uB418\uBA74 \uBA38\uC9C0\uD558\uC138\uC694":te?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC2DC\uB3C4\uD569\uB2C8\uB2E4":pe?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":$?.reason==="base_behind"?"base\uB97C \uC790\uB3D9 \uAC31\uC2E0\uD55C \uB4A4 \uBA38\uC9C0\uD569\uB2C8\uB2E4":ee.active===!0?ee.origin==="auto"?"\uC790\uB3D9 \uB9AC\uBDF0 \uC138\uC158 \uC2E4\uD589 \uC911 \u2014 \uB05D\uB098\uBA74 \uC601\uC218\uC99D\uC744 \uB2E4\uC2DC \uD310\uC815\uD569\uB2C8\uB2E4":"\uB9AC\uBDF0 \uC138\uC158 \uC2E4\uD589 \uC911 \u2014 \uB05D\uB098\uBA74 \uC601\uC218\uC99D\uC744 \uB2E4\uC2DC \uD310\uC815\uD569\uB2C8\uB2E4":$?.reason==="review_receipt_missing"?"\uB9AC\uBDF0 \uC601\uC218\uC99D \uC5C6\uC74C \u2014 \uBA38\uC9C0 \uAC8C\uC774\uD2B8 \uBCF4\uB958\uC785\uB2C8\uB2E4. \uD074\uB9AD\uD558\uBA74 \uAE30\uB85D\uB41C \uC138\uC158\uC744 \uC774\uC5B4 \uB9AC\uBDF0\uB9CC \uC218\uD589\uC2DC\uD0A4\uACE0, \uC601\uC218\uC99D\uC774 \uCD5C\uC885 head\uC5D0 \uC720\uD6A8\uD574\uC9C0\uBA74 \uD050\uAC00 \uBA38\uC9C0\uD569\uB2C8\uB2E4":$?.reason==="review_receipt_stale"?"head \uC7AC\uC791\uC131\uB428(\uC601\uC218\uC99D\uC774 \uD604\uC7AC head\uC758 \uC870\uC0C1\uC774 \uC544\uB2D8) \u2014 \uBA38\uC9C0 \uAC8C\uC774\uD2B8 \uBCF4\uB958\uC785\uB2C8\uB2E4. \uD074\uB9AD\uD558\uBA74 \uAE30\uB85D\uB41C \uC138\uC158\uC744 \uC774\uC5B4 \uCD5C\uC885 head\uB97C \uB2E4\uC2DC \uB9AC\uBDF0\uC2DC\uD0A4\uACE0, \uC601\uC218\uC99D\uC774 \uC720\uD6A8\uD574\uC9C0\uBA74 \uD050\uAC00 \uBA38\uC9C0\uD569\uB2C8\uB2E4":$?.reason==="review_receipt_invalid"?"\uB9AC\uBDF0 \uC601\uC218\uC99D \uAE30\uB85D\uC774 \uC131\uB9BD\uD558\uC9C0 \uC54A\uC74C \u2014 \uBA38\uC9C0 \uAC8C\uC774\uD2B8 \uBCF4\uB958\uC785\uB2C8\uB2E4. \uD074\uB9AD\uD558\uBA74 \uAE30\uB85D\uB41C \uC138\uC158\uC744 \uC774\uC5B4 \uCD5C\uC885 head\uB97C \uB2E4\uC2DC \uB9AC\uBDF0\uC2DC\uD0A4\uACE0, \uC601\uC218\uC99D\uC774 \uC720\uD6A8\uD574\uC9C0\uBA74 \uD050\uAC00 \uBA38\uC9C0\uD569\uB2C8\uB2E4":$?.reason==="review_receipt_undetermined"?"\uB9AC\uBDF0 \uC601\uC218\uC99D ancestry probe \uBBF8\uC644\uB8CC \u2014 \uBA38\uC9C0 \uAC8C\uC774\uD2B8 \uBCF4\uB958\uC785\uB2C8\uB2E4. \uD074\uB9AD\uD558\uBA74 \uAE30\uB85D\uB41C \uC138\uC158\uC744 \uC774\uC5B4 \uCD5C\uC885 head\uB97C \uB2E4\uC2DC \uB9AC\uBDF0\uC2DC\uD0A4\uACE0, \uC0C8 \uC601\uC218\uC99D\uC774 \uCD5C\uC885 head\uC5D0 \uC720\uD6A8\uD574\uC9C0\uBA74 \uD050\uAC00 \uBA38\uC9C0\uD569\uB2C8\uB2E4":$?.reason==="spec_id_missing"?"native spec_id \uBBF8\uAE30\uB85D \u2014 bd update --spec-id\uB85C \uAE30\uB85D\uD55C \uB4A4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":B?`\uBA38\uC9C0 (${$.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4 (\uCC28\uB840\uAC00 \uB418\uBA74 \uB2E4\uC2DC \uD655\uC778)`:$&&$.tier==="merged"?"\uBA38\uC9C0\uB428 \u2014 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC \uC9C4\uD589 \uC911":`\uBA38\uC9C0 \uBD88\uAC00: ${$&&$.reason||"\uAD00\uCE21 \uB300\uAE30"}`}}var Kx=["tab:worker:ready","tab:worker:blocked","tab:worker:in-progress","tab:worker:resolved","tab:worker:closed"];function pu(e,t={}){let{transport:n,issueStores:r,queueStore:s,sessionLogStore:i,gotoIssue:o,getWorkspacePath:a,switchWorkspace:l,openDoc:u,doneRange:d,onDoneRangeChange:_}=t,m=r?ys(r,void 0,{client_ids:Kx}):null,h=Ex(),g=null,T=null,k=null,ee=null,ne=null,z=Ls(()=>S()),N=new Map,D=new Map,M=Ym(),q=au(M)===null,G=d?Xn(d):Rx();function P(){let y=fs.find(b=>b.value===G);return y?y.label:"\uC624\uB298"}let $=Ua("beads-ui.worker.lane-collapsed"),O=!1,C="";function oe(){return C.trim().length>0}function ue(y){return oe()?y.filter(b=>b.search_match===!0).length:void 0}let me=new Set,V=new Set,ie=new Set,de=new Set,Oe=new Set,qe=new Set,Ie=null,ge=[],F=vg({queueStore:s,issueStores:r,transport:n,getWorkspacePath:a,onInvalidate:()=>S()});function ce(){F.refreshSessionDefaults()}let pe=document.createElement("div");pe.className="worker-console";let B=document.createElement("div");B.className="worker-top";let U=document.createElement("div");U.className="worker-drawer-overlay",U.hidden=!0;let Re=document.createElement("div");Re.className="worker-drawer-overlay__backdrop";let W=document.createElement("div");W.className="worker-drawer-host";let te=document.createElement("div");te.className="worker-drawer-host",te.hidden=!0,U.append(Re,W,te);let J=document.createElement("div");J.className="worker-lanes-host",pe.append(B,U,J),e.appendChild(pe);let Y=Ir(null,null),ke=[],fe=Ha({transport:n,console_el:pe,getLanes:()=>Y,getWorkspaces:()=>ke,getCrossLanes:()=>null,reproject:()=>({lanes:Ee(),raw_lanes:null}),onCorrection:()=>{},showToast:be,requestRender:()=>S(),adoptQueue:(y,b)=>{s&&s.set(b)},onDragBegin:()=>{T=null}}),Le=null,Ne=zs(W,{transport:n,sessionLogStore:i,onClose:()=>{Le=null,U.hidden=!0,S()}}),Je=dg(te,{onClose:()=>{te.hidden=!0,U.hidden=!0,S()}}),Be=rg({getWorkspacePath:a||(()=>"")}),re=a&&a()||"",Q=og({queueStore:s,transport:n,onChanged:()=>S(),onOpenScript:(y,b)=>{Be.open(y,b)}});function Te(){return s&&s.get()||{revision:0,auto_advance:!1,auto_merge:!1,slots:el,queue:[],serial_lanes:[],serial_lane_count:0,pr_wait:[],done:[]}}function et(y){let b=za(y,Te());b&&(ne=b,S())}function dt(){ne=null,S()}function Qe(){let y=Ga(ne);y&&(ne=null,S(),w(y.attempt_id,"session",y.payload))}function gt(y){if(!T||!y.some(R=>R.id===T))return null;let b=$o(Te());return b?{bead_id:T,lanes:b}:null}function Pt(){return a&&a()||""}async function St(y,b){await fe.sendOp({type:"worker-queue-place",payload:{bead_id:y,...b==="parallel"?{}:{lane:b}},root_dir:Pt()},y)}function ot(){let y=Te();return typeof y.revision=="number"?y.revision:0}function ht(y){y&&y.queue&&s&&s.set(y.queue)}async function Jt(y){if(!n||!y)return;let b=await n("worker-attempt-pause",{attempt_id:y});b&&b.paused===!1&&b.reason&&be(`\uC77C\uC2DC\uC815\uC9C0 \uAC70\uBD80: ${b.reason}`,"error",2400)}async function w(y,b="session",R={}){if(!n||!y)return;let le=n,we=Te().attempts?.[y]||null;await Fs({context:{bead_id:we?.bead_id||"",kind:b,tuple:we?Ln(we):""},transport:Fe=>le("worker-attempt-resume",{attempt_id:y,expected_revision:ot(),...R,...Fe}),adopt:ht})}async function se(y,b){if(!n||!y)return;let R=n,le=Te().attempts?.[y]||null;await ba({context:{bead_id:le?.bead_id||"",kind:b,attempt_id:y,tuple:le?ji(le):""},pause:()=>R("worker-attempt-pause",{attempt_id:y,require_durable:!0}),resume:async we=>{let Fe=await R("worker-attempt-resume",{attempt_id:y,expected_revision:ot(),...we});return ht(Fe),Fe},snapshot:()=>Te()})}async function De(y,b,R=!0){if(!n)return null;let le=n,we=await le(y,{...b,expected_revision:ot()});return ht(we),we&&we.conflict&&R&&(we=await le(y,{...b,expected_revision:ot()}),ht(we)),we}async function Se(y){if(!n||!y)return;let b=Te().merge_queue?.find(le=>le.bead_id===y)?.continuation_action;if(b?.mismatch&&b.continuation===null){await _e(y,b.mismatch);return}me.add(y),S();let R;try{R=await De("worker-merge-queue-add",{bead_id:y})}catch{be("\uBA38\uC9C0 \uD074\uB9AD\uC774 \uC11C\uBC84\uC5D0 \uC804\uB2EC\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4(\uC5F0\uACB0 \uBB38\uC81C) \u2014 \uC5F0\uACB0 \uBCF5\uAD6C \uD6C4 \uB2E4\uC2DC \uB20C\uB7EC\uC8FC\uC138\uC694","error",3200);return}finally{me.delete(y),S()}if(!(!R||R.applied)){if(R.conflict){be("\uD050\uAC00 \uBC14\uB00C\uC5B4 \uBA38\uC9C0 \uD074\uB9AD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uB20C\uB7EC\uC8FC\uC138\uC694","error",2400);return}be(Ix(R.reason),"error",2400)}}async function Me(y){if(!(!n||!y||V.has(y))){V.add(y),S();try{let b=await n("worker-cleanup-retry",{bead_id:y,expected_revision:ot()});ht(b),b&&!b.retried&&!b.conflict&&b.reason&&be(`\uC815\uB9AC \uC7AC\uC2DC\uB3C4 \uAC70\uBD80: ${b.reason}`,"error",2400)}finally{V.delete(y),S()}}}async function We(y){if(!(!n||!y||ie.has(y))){ie.add(y),S();try{let b=await n("worker-resolve-in-session",{bead_id:y,expected_revision:ot()});ht(b);let R=Lx(b);R!==null&&be(R,Dx(b),4e3)}finally{ie.delete(y),S()}}}async function tt(y,b){let R=Te().hold;if(!n||!R||typeof R.since!="number")return;let le=await n(y,{since:R.since});ht(le),le&&le.ok===!1&&be(`${b}: ${le.reason==="hold_changed"?"\uD050 \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uD655\uC778\uD558\uC138\uC694":le.reason||""}`,"error",2800)}async function It(y){if(!n||!y)return;let b=await n("worker-queue-start-now",{bead_id:y});ht(b),b&&b.ok===!1&&be(`\uC9C0\uAE08 \uC2DC\uC791 \uAC70\uBD80: ${b.reason==="not_waiting"?"\uC774 \uC774\uC288\uB294 \uB354 \uC774\uC0C1 \uB300\uAE30 \uB808\uC778\uC5D0 \uC5C6\uC2B5\uB2C8\uB2E4":b.reason||""}`,"error",2800)}async function _e(y,b){let R=await Dr({continuation_mismatch:b},(we,Fe)=>De("worker-merge-queue-add",{bead_id:y,continuation:we,decision_token:Fe},!1)),le=R?.queue?.merge_queue?.find(we=>we.bead_id===y)?.continuation_action;if(R?.applied!==!0&&le?.continuation===null&&le.mismatch){await _e(y,le.mismatch);return}R&&R.applied===!1&&!R.conflict&&be("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD\uC774 \uCD5C\uC2E0 \uC0C1\uD0DC\uC640 \uC77C\uCE58\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4","error",2800)}async function xe(y){if(!n)return;let b=await De("worker-merge-auto-toggle",{on:y});!b||b.conflict||be(y?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0 \u2014 \uB300\uAE30 \uD56D\uBAA9\uC744 \uBE44\uC6E0\uC2B5\uB2C8\uB2E4",y?"success":"info",2400)}async function Ze(y){if(!n||!y)return;let b=await De("worker-merge-queue-remove",{bead_id:y});b&&!b.conflict&&!b.applied&&b.reason==="merge_active"&&be("\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error",2400)}async function yt(){await De("worker-merge-queue-remove",{all:!0})}async function it(y,b=null,R="unmerged",le=null){if(!n||!y)return;let we=Ao(y,R);if(!(!!le||typeof globalThis.confirm!="function"||globalThis.confirm(we)))return;let nt=await n("worker-discard",{bead_id:y,...b?{attempt_id:b}:{},...le?{operation_id:le}:{},expected_revision:ot()});if(ht(nt),nt&&nt.conflict&&(nt=await n("worker-discard",{bead_id:y,...b?{attempt_id:b}:{},...le?{operation_id:le}:{},expected_revision:ot()}),ht(nt)),nt&&nt.discarded===!0){be(Xi(nt),"success",5e3);return}if(nt&&nt.reason){be(`\uD3D0\uAE30 \uC2E4\uD328: ${nt.reason}`,"error",2800);return}if(nt&&nt.accepted&&nt.pending==="merged_revert"){be("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success",2400);return}if(nt&&nt.accepted&&!nt.discarded){be(`\uD3D0\uAE30 \uC9C4\uD589: ${nt.phase||"\uBC31\uC5C5 \uC911"}`,"success",2400);return}nt&&!nt.conflict&&be("\uD3D0\uAE30 \uAC70\uBD80: unknown","error",2800)}async function ut(y,b,R){if(!n||!y||!b||typeof globalThis.confirm=="function"&&!globalThis.confirm(So(y,R)))return;let le=await n("worker-discard-abandon",{bead_id:y,operation_id:b,expected_revision:ot()});if(ht(le),le&&le.conflict&&(le=await n("worker-discard-abandon",{bead_id:y,operation_id:b,expected_revision:ot()}),ht(le)),le&&le.abandoned===!0){be(Yi(R),"success",5e3);return}if(le&&le.reason){be(`\uD3D0\uAE30 \uD3EC\uAE30 \uAC70\uBD80: ${le.reason}`,"error",2800);return}le&&!le.conflict&&be("\uD3D0\uAE30 \uD3EC\uAE30 \uAC70\uBD80: unknown","error",2800)}async function bt(y,b,R){if(!(!n||!b||!R||Oe.has(b))){Oe.add(b),S();try{let le=await n(y,{bead_id:b,action_id:R,expected_revision:ot()});ht(le);let we=typeof le?.reason=="string"&&le.reason.length>0?le.reason:"",Fe=Object.hasOwn(tu,we)?tu[we]:"";Fe.length>0?be(Fe,"error",2800):le?.conflict?be("\uC774\uC804 \uC791\uC5C5 \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694.","error",2800):!le?.ok&&we.length>0&&be(`\uC774\uC804 \uC791\uC5C5 \uCC98\uB9AC \uAC70\uBD80: ${we}`,"error",2800)}finally{Oe.delete(b),S()}}}async function st(y,b){if(!n||!b||de.has(b))return;de.add(b),S();let R;try{let le=async(we={})=>await n(y,{bead_id:b,expected_revision:ot(),...we});R=await le(),ht(R),R&&R.conflict&&(R=await n(y,{bead_id:b,expected_revision:ot()}),ht(R)),y==="worker-revise-fix"&&(R=await Dr(R,(we,Fe)=>le({continuation:we,decision_token:Fe}),{onResult:ht,refresh:()=>le()}))}finally{de.delete(b),S()}if(!(!R||R.conflict)){if(R.ok){be(y==="worker-revise-fix"?"\uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4 \u2014 \uC218\uB9AC \uD6C4 \uAD6C\uD604\uC774 \uC7AC\uB514\uC2A4\uD328\uCE58\uB429\uB2C8\uB2E4":"\uB378\uD0C0 \uC2B9\uC778 \uC644\uB8CC \u2014 \uC601\uC218\uC99D \uAC31\uC2E0 + \uD30C\uD0B9 \uD574\uC81C","success",2800);return}be(`\uCC98\uBD84 \uAC70\uBD80: ${R.reason||""}`,"error",3e3)}}async function ze(y){if(!n)return;let b=await n("worker-automation-toggle",{on:y,expected_revision:ot()});ht(b),b&&b.conflict&&await n("worker-automation-toggle",{on:y,expected_revision:ot()}).then(ht)}async function E(y){if(!n||!y)return;let b=await n("worker-repo-operation-dismiss",{operation_id:y});ht(b),b&&b.ok===!1&&be(`\uAE30\uB85D \uB2EB\uAE30 \uAC70\uBD80: ${b.reason||""}`,"error",3e3)}async function K(y){if(!n||!Number.isFinite(y))return;let b=Math.max(el,Math.floor(y)),R=await n("worker-queue-set-slots",{slots:b,expected_revision:ot()});ht(R),R&&R.conflict&&await n("worker-queue-set-slots",{slots:b,expected_revision:ot()}).then(ht)}async function X(y){if(!n||!Number.isInteger(y)||y<1||y>kg)return;let b=Te(),R=(Array.isArray(b.serial_lanes)?b.serial_lanes:[]).slice(y).reduce((Fe,nt)=>Fe+(Array.isArray(nt?.entries)?nt.entries.length:0),0),le=()=>({count:y,expected_revision:ot()}),we=await n("worker-queue-set-serial-lane-count",le());ht(we),we&&we.conflict&&(we=await n("worker-queue-set-serial-lane-count",le()),ht(we)),we&&we.applied&&R>0&&be(`\uC9C1\uB82C \uB808\uC778 \uCD95\uC18C \u2014 ${R}\uAC1C \uD56D\uBAA9\uC774 \uBCD1\uB82C \uB300\uAE30\uB85C \uC774\uB3D9`)}function Ee(){let y=Kr(G),b=F.read({candidate_sort:M,done_since:y});return ke=b.workspaces,Y=Ir(b.workspaces,b.workspaces_state,{done_since:y,candidate_filter:h,candidate_hidden_counts:"per_control",candidate_sort:"as_given",groups:"all",search:C}),Y}function ye(y){return y.queue_groups[0]||Ax}function wt(y){let b=y.dependency_chips||null,R={...b&&b.released?{released:b.released}:{},...b&&b.dependents?{dependents:b.dependents}:{}},le=N.get(y.id),we=D.get(y.id)||null,Fe=le&&le.overlaps.length>0?le.overlaps:null,nt=!!le&&le.scope_missing;return!we&&!Fe&&!nt&&Object.keys(R).length===0?null:{...R,...we?{predecessors:we}:{},...Fe?{overlaps:Fe}:{},...nt?{scope_missing:!0}:{}}}function kt(y){return{...y,workspace_name:"",done_layout:void 0,dependency_chips:wt(y)||void 0,chip_popover:Rt(y)}}function Rt(y){return ra(y,b=>z.isOpen({bead_id:y.id,chip_key:b}))}function jt(){let y=Te(),b=new Map;for(let R of Object.values(gn(y.lane_states))){let le=Array.isArray(R?.corrections)?R.corrections:[];for(let we of le)we&&typeof we.bead_id=="string"&&typeof we.after=="string"&&b.set(we.bead_id,we.after)}return{admission:gn(y.admission),correction_after:b}}function Wt(y,b){let R=kt(y),le=Ip(b.admission[y.id]||null,!!y.discard||Oe.has(y.id)),we=b.correction_after.get(y.id);return{...R,draggable:R.draggable===!0&&!le,stale_work:le,reason:le?"":R.reason,badges:we?[`\u{1F517} ${we} \uB4A4 (blocks \uC790\uB3D9)`,...R.badges||[]]:R.badges,revise_enabled:R.revise_enabled===!0&&!de.has(y.id)}}function Xt(y){let b=jt();return ye(y).sublanes.parallel.map(R=>Wt(R,b))}function an(y){let b=jt();return ye(y).sublanes.serial.map(R=>{let le=R.occupants.map(we=>({id:we.id,title:we.title,draggable:!1,lane:R.id,ghost:!0,badges:[we.badge],...typeof we.search_match=="boolean"?{search_match:we.search_match}:{}}));return{id:R.id,index:R.index+1,raw_length:R.raw_length,ghosts:le,items:R.items.map(we=>Wt(we,b)),occupied:R.occupied_by.length>0,badge:R.occupants.length>0?R.occupants[0].badge:"\uB300\uAE30",cycle:R.cycle===!0}})}function $t(y){return y.runnable.map(b=>kt(b))}function rn(y){return y.done.map(b=>kt(b))}function fn(y){let b=y.running.filter(R=>R.non_occupying!==!0).map(R=>({...R,bead_id:R.id,attempt_id:R.attempt_id||"",paused:R.run_state==="paused",failed:R.run_state==="failed",parked:R.run_state==="parked",retry_wait:R.run_state==="retry_wait",waiting:R.run_state==="waiting",wait:R.wait||null,provider_hold:R.run_state==="provider_hold",hold:R.hold?{...R.hold,open:ee===R.attempt_id}:null,status_label:R.run_state==="failed"?R.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328":R.run_state==="parked"?"\uC138\uC158 \uB300\uAE30":R.run_state==="retry_wait"?"\uC7AC\uC2DC\uB3C4 \uB300\uAE30":R.run_state==="waiting"?"\uC120\uD589 \uB300\uAE30":R.run_state==="provider_hold"?"\uACF5\uAE09\uC790 \uBCF4\uB958":void 0,can_pause:R.can_pause!==!1,...R.instructions_restart?{instructions_restart:R.instructions_restart}:{},workspace_name:"",dependency_chips:wt(R)||void 0,chip_popover:Rt(R),rollup_expanded:qe.has(R.id),failure:R.failure?{...R.failure,open:k===R.attempt_id}:null,...Ys(R.id,{discard:R.discard,parked:R.run_state==="parked"},ie.has(R.id))}));return[...b.filter(R=>R.failed===!0),...b.filter(R=>R.failed!==!0&&R.parked===!0),...b.filter(R=>R.failed!==!0&&R.parked!==!0)]}function qt(y){return Gt(y).map(b=>({...b,chip_popover:Rt(b)}))}function Gt(y){if(Ie&&Ie.model===y)return Ie.rows;let b=Te(),R=ye(y),le=gn(b.attempts),we=Object.values(le).filter(fr),Fe=new Map;for(let Ge of we)Fe.set(Ge.attempt_id,Ge);let nt=new Map;for(let Ge of we)nt.set(Ge.bead_id,Ge);let Bt=new Map;for(let Ge of[...y.pr_wait,...y.running,...y.queue,...y.runnable,...y.done])Bt.has(Ge.id)||Bt.set(Ge.id,Ge);let on=Ge=>{let Qt=null;for(let On of we)!On||On.bead_id!==Ge||ic(On,Fe)||(Qt===null||(typeof On.started_at=="number"?On.started_at:0)>=(typeof Qt.started_at=="number"?Qt.started_at:0))&&(Qt=On);return Qt&&typeof Qt.target_base=="string"?Qt.target_base:null},_t=new Map;for(let Ge of y.running)Ge.run_state==="failed"||Ge.conflict_resolution!==!0||(Ge.run_state!=="paused"?_t.set(Ge.id,"running"):_t.has(Ge.id)||_t.set(Ge.id,"paused"));let kn=gn(b.auto_merge_skips),Tn=new Set(R.merge.auto_excluded),jr=gn(b.pr_observations),Yn=gn(b.pr_activity),or=gn(b.cleanup_failed),ir=gn(b.discard_operations),ar=gn(b.bead_workflow),_n=gn(b.bead_titles),lr=b.merge_queue_state||{active:null,failures:{}},$r=R.merge.state.waiting,xr=new Map;for(let Ge of Array.isArray(b.merge_queue)?b.merge_queue:[])Ge&&typeof Ge=="object"&&Ge.bead_id&&xr.set(Ge.bead_id,Ge);let Fr=(Array.isArray(b.pr_wait)?b.pr_wait:[]).map(Ge=>{let Qt=Bt.get(Ge.bead_id);return{...zx(Ge.bead_id,Qt?.title||_n[Ge.bead_id]||Ge.bead_id,jr,or[Ge.bead_id]||null,pr(le,Ge.bead_id,R.runner_catalog||null),Yn[Ge.bead_id]||(me.has(Ge.bead_id)?{activity:null,merge_progress:null,queueing:"merge"}:V.has(Ge.bead_id)?{activity:null,merge_progress:null,queueing:"cleanup"}:null),_t.get(Ge.bead_id)||null,Ge.external===!0,{position:R.merge.positions.get(Ge.bead_id)||0,active:lr.active===Ge.bead_id,failure:gn(lr.failures)[Ge.bead_id]||null,waiting:$r&&$r.bead_id===Ge.bead_id?$r.reason:null,resolution:R.merge.resolutions.get(Ge.bead_id),continuation_action:R.merge.continuations.get(Ge.bead_id),authority:R.merge.authorities.get(Ge.bead_id)||null,hold:xr.get(Ge.bead_id)?.hold||null,review_dispatch:xr.get(Ge.bead_id)?.review_dispatch||null},Ge.wt_present!==!1,b.auto_merge===!0&&Tn.has(Ge.bead_id)?kn[Ge.bead_id]?.reason||"":null,oc(R.declared_base,on(Ge.bead_id)),gn(b.completion_status)[Ge.bead_id]||null,ir,b.auto_merge===!0,{merge_sha:Ge.merge_sha,cleanup_cursor:Ge.cleanup_cursor,repo_operations:R.repo_operations},Qt?wt(Qt):null,Ep(le,Ge.bead_id),ie.has(Ge.bead_id),{...Ge.foreign===!0?{foreign:!0}:{},...typeof Ge.repo_slug=="string"?{repo_slug:Ge.repo_slug}:{},...typeof Ge.pr_url=="string"?{pr_url:Ge.pr_url}:{},...typeof Ge.pr_number=="number"?{pr_number:Ge.pr_number}:{}}),...Qt?.search_match===void 0?{}:{search_match:Qt.search_match},workflow:ar[Ge.bead_id]||null,priority:Qt?.priority,from_id:Qt?.from_id,...Qt?.created_at===void 0?{}:{created_at:Qt.created_at},...Qt?.updated_at===void 0?{}:{updated_at:Qt.updated_at}}});return Ie={model:y,rows:Fr},Fr}function sn(y){let b=ye(y),R=[];for(let Fe of y.running)Fe.non_occupying!==!0&&R.push({id:Fe.id,title:Fe.title,location_label:"\uC2E4\uD589\uC911",kind:"running",lane_id:Fe.serial_lane_id??null});for(let Fe of y.pr_wait)R.push({id:Fe.id,title:Fe.title,location_label:"PR \uB300\uAE30",kind:"pr_wait",lane_id:null});for(let Fe of b.sublanes.serial)Fe.items.forEach((nt,Bt)=>{R.push({id:nt.id,title:nt.title,location_label:`${Fe.id} #${Bt+1}`,kind:"serial",lane_id:Fe.id})});b.sublanes.parallel.forEach((Fe,nt)=>{R.push({id:Fe.id,title:Fe.title,location_label:`#${nt+1}`,kind:"parallel",lane_id:null})});for(let Fe of y.runnable)R.push({id:Fe.id,title:Fe.title,location_label:"\uD6C4\uBCF4",kind:"candidate",lane_id:null,queue_placeable:Fe.queue_placeable===!0});let le=Te();N=Jm(le.bead_scope,R);let we=new Map;for(let Fe of[...y.running,...y.runnable])Array.isArray(Fe.blocked_by)&&Fe.blocked_by.length>0&&we.set(Fe.id,Fe.blocked_by);for(let[Fe,nt]of Object.entries(gn(le.bead_blocked_by)))Array.isArray(nt)&&we.set(Fe,nt.filter(Bt=>typeof Bt=="string"&&Bt.length>0));D=Kp(we,R,gn(le.blocker_workspaces))}function Ke(y){let b=y.hold&&typeof y.hold=="object"?y.hold:null;if(!b||b.kind!=="env"&&b.kind!=="systemic")return"";let R=Nr(b.cause)||String(b.cause||""),le=Array.isArray(y.lineages)?y.lineages:[];if(b.kind==="env"){let Fe=le.map(Bt=>Bt&&Bt.next_at).filter(Bt=>typeof Bt=="number").sort((Bt,on)=>Bt-on)[0],nt=typeof Fe=="number"?` \xB7 \uB2E4\uC74C ${new Date(Fe).toLocaleTimeString("ko-KR",{hour:"2-digit",minute:"2-digit"})}`:"";return c`<div class="worker-hold worker-hold--env" role="status">
        <span class="worker-hold__text"
          >환경 보류: ${R} — 재시도 대기${nt}</span
        >
        <button
          type="button"
          class="worker-hold__retry"
          title="예약된 재시도를 지금 실행합니다"
        >
          지금 재시도
        </button>
      </div>`}let we=(Array.isArray(b.bead_ids)?b.bead_ids:[]).filter(Fe=>typeof Fe=="string"&&Fe.length>0);return c`<div class="worker-hold worker-hold--systemic" role="alert">
      <span class="worker-hold__text"
        >${R}${we.length>0?` \u2014 bead ${we.join(", ")}`:""}</span
      >
      <button
        type="button"
        class="worker-hold__resume"
        title="정지를 풀고 멈춰 있던 bead를 다시 디스패치합니다"
      >
        재개
      </button>
    </div>`}function L(y){let b=[];for(let[_t,kn]of Object.entries(gn(y.provider_hold)))for(let Tn of Array.isArray(kn?.targets)?kn.targets:[])b.push({runner:_t,target:Tn});if(b.length===0)return"";let R=b.find(_t=>_t.target?.kind==="outage");if(R){let _t=typeof R.target.next_probe_at=="number"?new Date(R.target.next_probe_at).toLocaleTimeString("ko-KR",{hour:"2-digit",minute:"2-digit"}):"";return c`<div class="worker-provider-gate" role="status">
        ⚠️ ${R.runner} 공급자 장애 — 신규 디스패치
        보류${_t?`, \uB2E4\uC74C \uD504\uB85C\uBE0C ${_t}`:""}
      </div>`}let le=Array.isArray(gn(y.account_catalog).claude)?gn(y.account_catalog).claude:[],we=_t=>le.find(Tn=>Tn?.email===_t)?.alias||_t,Fe=b.find(_t=>typeof _t.target?.account!="string"),nt=_t=>typeof _t?.resets_at=="number"?new Date(_t.resets_at).toLocaleTimeString("ko-KR",{hour:"2-digit",minute:"2-digit"}):"";if(Fe){let _t=nt(Fe.target);return c`<div class="worker-provider-gate" role="status">
        ⏳ ${Fe.runner} 사용 한도 — 계정 미확인이라 러너 전체 디스패치
        보류${_t?`, \uB9AC\uC14B ${_t}`:""}
      </div>`}let Bt=[...new Set(b.map(_t=>we(String(_t.target.account))))],on=nt(b[0].target);return c`<div class="worker-provider-gate" role="status">
      ⏳ ${Bt.join(", ")} 사용 한도 —
      ${Bt.length>1?"\uADF8 \uACC4\uC815\uB4E4":"\uADF8 \uACC4\uC815"} 디스패치
      보류${on?`, \uB9AC\uC14B ${on}`:""}
    </div>`}function ve(y){let b=Te(),R=ye(y),le=R.sublanes.parallel,we=le.length>0?le[0].id:"\u2014",Fe=c`<button
      type="button"
      class="worker-play${b.auto_advance?" is-active":""}"
    >
      ${b.auto_advance?"\u23F8 \uC790\uB3D9\uD654 \uBA48\uCDA4":"\u25B6 \uC790\uB3D9\uD654"}
    </button>`,nt=Ht(y),Bt=R.over_cap?c`<span
          class="worker-overcap"
          title="수동 재개(▶)는 슬롯 cap을 초과할 수 있습니다 — 자동 진행은 cap을 지킵니다"
          >cap 초과</span
        >`:"",on=b.auto_advance?0:(Array.isArray(b.queue)?b.queue:[]).filter(_n=>_n&&typeof _n.armed_by_lane=="string"&&_n.armed_by_lane.length>0).length,_t=on>0?c`<span
            class="worker-kpi__chip worker-kpi__chip--armed"
            title="모니터 연결 레인이 발차한 대기 행입니다 — 이 레포의 자동 진행은 꺼진 채입니다"
            >⏸ 자동 진행 꺼짐 · 연결 레인 ${on}건 진행 중</span
          >`:"",kn=c`<span class="worker-kpi__chip worker-kpi__chip--running"
        >실행 <b>${R.live_count}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--pr"
        >PR 대기 <b>${qt(y).length}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--done"
        >${P()} 완료 <b>${y.done.length}</b></span
      >`,Tn=c`<span
      class="worker-kpi__chip worker-kpi__chip--base"
      title=${R.declared_base?"\uC774 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uC5B8\uD55C target base (docs/agents/repo-ops.toml). \uB514\uC2A4\uD328\uCE58 \uC2DC\uC810\uC758 \uAC80\uC99D\uC740 \uBCC4\uB3C4":"\uC120\uC5B8 \uD30C\uC77C\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 \u2014 target base \uD655\uC778 \uBD88\uAC00"}
      >base ${R.declared_base||"?"}</span
    >`,jr=c`<label class="worker-tgl worker-slots"
        >동시 실행
        <input
          type="number"
          class="worker-slots__input"
          min=${el}
          step="1"
          .value=${String(R.slots)}
          title="동시에 실행할 세션 수 (최소 1 = 순차 실행)"
      /></label>
      <label
        class="worker-tgl worker-serial-lanes"
        title="고정 직렬 레인 수 (1~5). 축소 시 잘린 레인의 대기 항목은 병렬 대기로 돌아갑니다"
        >직렬 레인
        <select class="worker-serial-lane-count" aria-label="직렬 레인 수">
          ${Array.from({length:kg},(_n,lr)=>lr+1).map(_n=>c`<option
                value=${String(_n)}
                ?selected=${R.serial_lane_count===_n}
              >
                ${_n}
              </option>`)}
        </select>
      </label> `,Yn=c`<input
      type="search"
      class="worker-search"
      placeholder="ID·제목 검색"
      aria-label="이슈 검색 (ID·제목)"
      .value=${C}
    />`,or=Rp(R.repo_operations,R.cleanup_failures),ir=Ke(b),ar=L(b);return O?c`<div class="worker-ribbon">
          ${Fe} ${nt}
          <div class="worker-kpi worker-kpi--ribbon">
            ${Bt}${_t}${kn}
          </div>
        </div>
        <div class="worker-ctrl worker-ctrl--mobile">
          <div class="worker-ctrl__ops">${jr}${Yn}</div>
          <div class="worker-kpi">${Tn}</div>
        </div>
        ${ar}${ir}${or}${Q.template()}`:c`<div class="worker-ctrl">
        <div class="worker-ctrl__ops">
          ${Fe}${nt}${jr}${Yn}
        </div>
        <div class="worker-kpi">
          ${Bt}${_t}${kn}${Tn}
          ${(Array.isArray(R.token_total)?R.token_total:R.token_total?[{label:R.token_total,tooltip:`${P()} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}]:[]).map(_n=>c`<span
                class="worker-kpi__chip worker-kpi__chip--tokens"
                title=${_n.tooltip}
                >${P()} 완료 · 누적 ${_n.label}</span
              >`)}
          <span class="worker-kpi__next worker-stat"
            >다음 <b>${we}</b></span
          >
        </div>
      </div>
      ${ar}${ir}${or}${Q.template()}`}function je(y){let b=y.runnable_hidden;return c`<div class="worker-filter">
      <label class="worker-filter__tgl" title="blocked 이슈 표시 (기본 숨김)">
        <input
          type="checkbox"
          class="worker-filter__blocked"
          .checked=${h.show_blocked}
        />
        🔒 blocked${b.blocked>0?` ${b.blocked}`:""}
      </label>
      <div
        class="worker-filter__readiness"
        role="group"
        aria-label="준비도 필터"
      >
        ${Oo.map(R=>c`<button
              type="button"
              class="worker-filter__chip${h.readiness===R.value?" is-active":""}"
              data-readiness=${R.value}
              aria-pressed=${h.readiness===R.value?"true":"false"}
            >
              ${R.label}
            </button>`)}
        ${b.readiness>0?c`<span class="worker-filter__hidden"
              >숨김 ${b.readiness}</span
            >`:""}
      </div>
      <div class="worker-filter__routes" role="group" aria-label="route 필터">
        ${ss.map(R=>c`<button
              type="button"
              class="worker-filter__chip worker-filter__route${h.routes.includes(R.value)?" is-active":""}"
              data-route=${R.value}
              aria-pressed=${h.routes.includes(R.value)?"true":"false"}
            >
              ${R.label}
            </button>`)}
        ${b.route>0?c`<span class="worker-filter__hidden"
              >숨김 ${b.route}</span
            >`:""}
      </div>
    </div>`}function xt(){let y=q?"custom":au(M)||"custom";return c`<select
      class="worker-sort"
      aria-label="후보 정렬"
      title="후보 정렬"
      .value=${y}
    >
      ${Jo.map(b=>c`<option value=${b.id} ?selected=${y===b.id}>
            ${b.label}
          </option>`)}
      <option value="custom" ?selected=${y==="custom"}>
        사용자 지정…
      </option>
    </select>`}function Ve(){let y=ei(M);return c`<div
      class="worker-sort-chain"
      role="group"
      aria-label="후보 정렬 체인"
    >
      ${[0,1,2].map(b=>{let R=y[b];return c`<span class="worker-sort-chain__step">
          <select
            class="worker-sort-chain__key"
            data-step=${b}
            aria-label=${`${b+1}\uCC28 \uC815\uB82C \uD0A4`}
            .value=${R?R.key:""}
          >
            ${b===0?"":c`<option value="" ?selected=${!R}>없음</option>`}
            ${Vm.map(le=>c`<option
                  value=${le.key}
                  ?selected=${!!R&&R.key===le.key}
                >
                  ${le.label}
                </option>`)}
          </select>
          ${R?c`<button
                type="button"
                class="worker-sort-chain__dir"
                data-step=${b}
                aria-label=${R.dir==="asc"?"\uC624\uB984\uCC28\uC21C":"\uB0B4\uB9BC\uCC28\uC21C"}
                title=${R.dir==="asc"?"\uC624\uB984\uCC28\uC21C":"\uB0B4\uB9BC\uCC28\uC21C"}
              >
                ${R.dir==="asc"?"\u2191":"\u2193"}
              </button>`:""}
        </span>`})}
    </div>`}function Dt(){return c`<div class="worker-done-controls">
      <select
        class="worker-sort worker-done-range"
        aria-label="완료 기간"
        title="완료 기간"
        .value=${G}
      >
        ${fs.map(y=>c`<option value=${y.value} ?selected=${G===y.value}>
              ${y.label}
            </option>`)}
      </select>
    </div>`}function Ht(y){let b=ye(y).merge,R=Te().auto_merge===!0;if(b.running)return c`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop${R?" is-active":""}"
        title=${R?"\uC790\uB3D9 \uBA38\uC9C0\uB97C \uB044\uACE0 \uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)":"\uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)"}
      >
        ${R?"\u23F8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8":"\uC77C\uAD04 \uBA38\uC9C0 \uC911\uB2E8"} ${b.positions.size}
      </button>`;if(R)return c`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop is-active"
        title="자동 머지 켜짐 — 자격이 생기는 PR을 계속 큐에 넣습니다. 클릭하면 끕니다"
      >
        ⏸ 자동 머지
      </button>`;let le=new Set(b.auto_excluded),we=qt(y).filter(Fe=>Fe.merge_action&&Fe.merge_enabled&&!le.has(Fe.id)).length;return c`<button
      type="button"
      class="worker-merge-all"
      title="켜 두면 자격이 생기는 PR을 계속 큐에 넣어 순서대로 충돌 해소·머지합니다"
    >
      ▶ 자동 머지${we>0?` ${we}`:""}
    </button>`}function at(y,b){return c`<div
      data-bead-id=${y.id}
      data-drag-kind=${b.kind}
      data-root-dir=${b.root_dir}
      data-lane-id=${cn(b.lane_id)}
      data-row-index=${b.row_index}
      data-queue-index=${String(y.queue_index??0)}
    >
      ${Hn({...y,...Ys(y.id,{discard:y.discard,parked:!1},ie.has(y.id))},{actions:Ms(y)})}
    </div>`}function Ct(y){let b=Xt(y),R=Pt();return sa({parallel:{rows:b.map((le,we)=>at(le,{kind:"parallel",root_dir:R,row_index:we})),count:b.length,collapsed:$.isAreaCollapsed("parallel"),drop:{drop:"parallel",root_dir:R}},serial:{lanes:an(y).map(le=>({id:le.id,title:`\uC9C1\uB82C ${le.index}`,rows:[...le.ghosts.map(we=>Hn({...we,...Ys(we.id,{discard:we.discard,parked:!1},ie.has(we.id))},{actions:Ms(we)})),...le.items.map((we,Fe)=>at(we,{kind:"repo-serial",root_dir:R,row_index:Fe,lane_id:le.id}))],count:le.ghosts.length+le.items.length,match_count:ue([...le.ghosts,...le.items]),empty:le.ghosts.length+le.items.length===0,badge:le.badge,held:le.occupied,cycle:le.cycle,drop:{drop:"repo-serial",root_dir:R,lane_id:le.id,lane_length:String(le.raw_length)}})),collapsed:$.isAreaCollapsed("serial")}})}function hn(y){return cm(fn(y),Date.now(),Le)}function Nt(y){return y.running.some(b=>b.kind!=="session"&&b.run_state==="running")}function vn(y){let b=ye(y),R=$t(y),le=Xt(y),we=rn(y),Fe=qt(y),nt=fn(y),Bt=nr({id:"worker-pane-candidate",lane:"candidate",title:"\uD6C4\uBCF4",items:R,match_count:ue(R),src:!0,empty:"\uD6C4\uBCF4 \uC5C6\uC74C",header_control:xt(),header_row:q?Ve():void 0,controls:je(y),collapsible:!0,collapsed:$.isCollapsed("candidate"),place_menu:gt(R),onOpenDoc:u?(_t,kn)=>u(kn):void 0}),on=nr({id:"worker-pane-done",lane:"done",title:"\uC644\uB8CC",items:we,match_count:ue(we),empty:`${P()} \uC644\uB8CC \uC5C6\uC74C`,header_control:Dt(),collapsible:!0,collapsed:$.isCollapsed("done"),preview:O?Array.isArray(b.token_total)?b.token_total.map(_t=>_t.label).join(" \xB7 "):b.token_total||wg(we):void 0});return O?c`<div class="worker-lanes worker-lanes--mobile">
          ${oa({live:Nt(y),running_body:nt.length>0?hn(y):"",pr_wait_rows:Fe.map(_t=>Hn(_t)),count:nt.length+Fe.length})}
          ${nr({id:"worker-pane-queue",lane:"queue",title:"\uB300\uAE30",items:le,count:le.length,match_count:ue(le),collapsible:!0,collapsed:$.isCollapsed("queue"),preview:wg(le),body:Ct(y)})}
          ${Bt} ${on}
        </div>
        ${Vs(ne,Te())}`:c`<div class="worker-lanes">
        ${Bt}
        ${nr({id:"worker-pane-queue",lane:"queue",title:"\uB300\uAE30",items:le,count:le.length,match_count:ue(le),collapsible:!0,collapsed:$.isCollapsed("queue"),body:Ct(y)})}
        ${nr({id:"worker-pane-running",lane:"running",title:"\uC2E4\uD589 \uC911",items:nt,match_count:ue(nt),header_control:c`<span class="worker-pane__meta"
            >슬롯 ${b.slots}</span
          >`,live:Nt(y),collapsible:!0,collapsed:$.isCollapsed("running"),body:hn(y)})}
        ${nr({id:"worker-pane-pr-wait",lane:"pr_wait",title:"PR \uB300\uAE30",items:Fe,match_count:ue(Fe),empty:"PR \uB300\uAE30 \uC5C6\uC74C",collapsible:!0,collapsed:$.isCollapsed("pr_wait")})}
        ${on}
      </div>
      ${Vs(ne,Te())}`}function bn(y){$.toggle(y),S()}function p(y){$.toggleArea(y),S()}function f(y){let b=Date.now();if(!y.queue.some(le=>na(le.added_at,b)>0)){x();return}g===null&&(g=window.setInterval(()=>{try{S()}catch{}},Sx))}function x(){g!==null&&(window.clearInterval(g),g=null)}function S(){if(e.hidden)return;let y=Ee();f(y),sn(y),ct(ve(y),B),ct(vn(y),J),Va(J)}function Z(){let y=!0,b=Ba(R=>{if(O=R,y){y=!1;return}S()});ge.push(b)}function ae(y){h=y,Tx(y),S()}function he(y){if(y==="custom"){q=!0,S();return}M=us(y),lu(M),q=!1,S()}function Ue(y){M=us({chain:y}),lu(M),S()}function He(y){G=Xn(y),Cx(G),_?.(G),S()}function pt(y){let b=y.target;if(ne){let _t=Ka(ne,b,Te());if(_t){_t!==ne&&(ne=_t,S());return}}let R=b?.closest?.(".worker-serial-lane-count");if(R){let _t=Number.parseInt(R.value,10);Number.isFinite(_t)&&X(_t).then(S);return}let le=y.target?.closest?.(".worker-filter__blocked");if(le){ae({...h,show_blocked:le.checked});return}let we=y.target?.closest?.(".worker-sort-chain__key");if(we){let _t=Number.parseInt(we.getAttribute("data-step")||"",10);Number.isFinite(_t)&&Ue(Xm(ei(M),_t,we.value));return}let Fe=y.target?.closest?.(".worker-done-range");if(Fe){He(Fe.value);return}let nt=y.target?.closest?.(".worker-sort");if(nt){he(nt.value);return}let Bt=y.target?.closest?.(".worker-slots__input");if(!Bt)return;let on=Number.parseInt(Bt.value,10);if(!Number.isFinite(on)){S();return}K(on).then(S)}function Ft(y){return y?{runner:y.runner||void 0,model:y.model||void 0,effort:y.effort||void 0,worktree:y.worktree||void 0,status:y.status||void 0,session_id:y.session_id||void 0}:{}}function A(){let y=ye(Ee()),b=Te().workspace_info,R=b&&typeof b=="object"&&b.repo_ops&&typeof b.repo_ops=="object"?b.repo_ops:null;return{operations:y.repo_operations,cleanup_failures:y.cleanup_failures,repo:a&&a()||"",repo_ops:R}}function I(){Le&&Ne.close(),te.hidden=!1,U.hidden=!1,Je.open(A()),S()}function Pe(y){let b=Te(),R=b.attempts?b.attempts[y]:null;Le=y,Je.close(),te.hidden=!0,U.hidden=!1,Ne.open({attempt_id:y,meta:Ft(R)}),S()}function Ce(y){let b=Te(),R=(Array.isArray(b.session_active)?b.session_active:[]).find(we=>we&&we.bead_id===y),le=(R&&Array.isArray(R.session_refs)?R.session_refs:[]).find(we=>we&&we.current===!0);le&&(Je.close(),te.hidden=!0,U.hidden=!1,Ne.open(Bs(le,y,"in_progress")),S())}function rt(){if(Je.isOpen()&&Je.refresh(A()),!Le)return;let y=Te(),b=y.attempts?y.attempts[Le]:null;if(b){Ne.updateMeta(Ft(b));return}Ne.close()}function ft(y,b){if(y.length===0||!o)return;let R=a?a():void 0;if(b.length===0||!R||b===R||!l){o(y);return}Promise.resolve(l(b)).then(()=>{o(y)}).catch(()=>{be("\uB808\uD3EC \uC804\uD658\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error",2400)})}function tn(y){let b=y.target;if(b?.closest?.(".provider-resume-dialog__cancel")){dt();return}if(b?.closest?.(".provider-resume-dialog__confirm")){Qe();return}if(b?.closest?.(".provider-resume-dialog")||b?.closest?.(".worker-mini__grip"))return;let R=b?.closest?.(".worker-sort-chain__dir");if(R){let Ae=Number.parseInt(R.getAttribute("data-step")||"",10);Number.isFinite(Ae)&&Ue(Qm(ei(M),Ae));return}let le=b?.closest?.(".worker-dep__open");if(le){ft(le.getAttribute("data-dep-id")||"",le.getAttribute("data-root-dir")||"");return}let we=b?.closest?.(".judgement-chip");if(we){let Ae=we.closest("[data-bead-id]"),At=Ae&&Ae.getAttribute("data-bead-id")||"",Ot=we.getAttribute("data-chip-key")||"";At&&Ot&&z.toggle({bead_id:At,chip_key:Ot});return}if(b?.closest?.(".chip-popover"))return;if(b?.closest?.(".worker-repo-strip")){I();return}let Fe=b?.closest?.(".worker-repo-op__dismiss");if(Fe){E(Fe.dataset.operationId||"");return}let nt=b?.closest?.(".worker-cleanup__resume");if(nt){let Ae=nt.dataset.beadId;Ae&&Me(Ae);return}let Bt=b?.closest?.(".worker-cleanup__resolve");if(Bt){let Ae=Bt.dataset.beadId;Ae&&We(Ae);return}if(b?.closest?.(".worker-hold__retry")){tt("worker-queue-hold-retry-now","\uC9C0\uAE08 \uC7AC\uC2DC\uB3C4 \uAC70\uBD80");return}if(b?.closest?.(".worker-hold__resume")){tt("worker-queue-hold-resume","\uC7AC\uAC1C \uAC70\uBD80");return}if(b?.closest?.(".worker-play")){ze(!Te().auto_advance);return}let on=b?.closest?.(".worker-merge-all");if(on){on.classList.contains("worker-merge-all--stop")?Te().auto_merge===!0?xe(!1):yt():xe(!0);return}let _t=b?.closest?.(".worker-pane__toggle[data-lane]");if(_t){let Ae=_t.dataset.lane;(Ae==="candidate"||Ae==="queue"||Ae==="running"||Ae==="pr_wait"||Ae==="done")&&bn(Ae);return}let kn=b?.closest?.(".worker-wait__area-toggle[data-area]");if(kn){let Ae=kn.dataset.area;(Ae==="parallel"||Ae==="serial")&&p(Ae);return}let Tn=b?.closest?.(".worker-card__place-lane");if(Tn){let Ae=Tn.dataset.beadId,At=Tn.dataset.lane;Ae&&(At==="parallel"||/^s[1-5]$/.test(At||""))&&(T=null,S(),St(Ae,At));return}if(b?.closest?.(".worker-card__place-cancel")){T=null,S();return}let Yn=b?.closest?.(".worker-card__place");if(Yn){let Ae=Yn.dataset.beadId;Ae&&!Yn.disabled&&($o(Te())?(T=Ae,S()):St(Ae,"parallel"));return}let or=b?.closest?.(".worker-filter__route");if(or){let Ae=or.dataset.route||"";Ae&&ae({...h,routes:fa(h.routes,Ae)});return}let ir=b?.closest?.(".worker-filter__chip");if(ir){let Ae=ir.dataset.readiness;(Ae==="all"||Ae==="ready"||Ae==="not_ready")&&ae({...h,readiness:Ae});return}let ar=b?.closest?.('[data-action="queue-start-now"]');if(ar){It(ar.dataset.beadId||"");return}let _n=b?.closest?.('[data-action="queue-remove"]');if(_n){let Ae=_n.dataset.beadId||"";Ae&&fe.sendOp({type:"worker-queue-remove",payload:{bead_id:Ae},root_dir:Pt()},Ae);return}let lr=b?.closest?.(".worker-mini__merge");if(lr){let Ae=lr.dataset.beadId||"";Te().cleanup_failed?.[Ae]?Me(Ae):Se(Ae);return}let $r=b?.closest?.(".worker-mini__merge-cancel");if($r){Ze($r.dataset.beadId||"");return}let xr=b?.closest?.(".worker-mini__resolve");if(xr){We(xr.dataset.beadId||"");return}let Fr=b?.closest?.(".rtile__resolve");if(Fr){let Ae=Fr.closest(".rtile");We(Ae?.dataset.beadId||"");return}let Ge=b?.closest?.(".worker-mini__discard"),Qt=b?.closest?.(".worker-mini__discard-abandon");if(Qt){ut(Qt.dataset.beadId||"",Qt.dataset.operationId||"",{kind:Qt.dataset.operationKind||"",last_error:Qt.dataset.lastError||""});return}if(Ge){it(Ge.dataset.beadId||"",Ge.dataset.attemptId||null,Ge.dataset.discardMode==="merged"?"merged":"unmerged",Ge.dataset.operationId||null);return}let On=b?.closest?.(".worker-mini__stale-continue");if(On){bt("worker-stale-work-continue",On.dataset.beadId||"",On.dataset.actionId||"");return}let Qs=b?.closest?.(".worker-mini__stale-backup");if(Qs){bt("worker-stale-work-backup-fresh",Qs.dataset.beadId||"",Qs.dataset.actionId||"");return}let Zs=b?.closest?.(".worker-mini__stale-recheck");if(Zs){bt("worker-stale-work-recheck",Zs.dataset.beadId||"",Zs.dataset.actionId||"");return}let ti=b?.closest?.(".worker-mini__revise-fix");if(ti){st("worker-revise-fix",ti.dataset.beadId||"");return}let lt=b?.closest?.(".worker-mini__revise-approve");if(lt){st("worker-revise-approve",lt.dataset.beadId||"");return}if(b?.closest?.(".worker-mini__pr"))return;let v=b?.closest?.(".rtile__failure-badge");if(v){let Ae=v.dataset.attemptId||"";k=k===Ae?null:Ae,S();return}let j=b?.closest?.(".rtile__provider-hold-badge");if(j){let Ae=j.dataset.attemptId||"";ee=ee===Ae?null:Ae,S();return}let H=b?.closest?.(".rtile__attempt-copy");if(H){let Ae=H.dataset.attemptId||"";Ae&&$n(Ae).then(At=>{be(At?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",At?"success":"error",1400)});return}let $e=b?.closest?.(".rtile__discard-abandon");if($e){let At=b?.closest?.(".rtile")?.dataset?.beadId;At&&ut(At,$e.dataset.operationId||"",{kind:$e.dataset.operationKind||"",last_error:$e.dataset.lastError||""});return}let Ye=b?.closest?.(".rtile__discard");if(Ye){let Ae=b?.closest?.(".rtile"),At=Ae?.dataset?.beadId,Ot=Ae?.dataset?.attemptId;At&&it(At,Ot||null,Ye.dataset.confirmation==="merged"?"merged":"unmerged",Ye.dataset.operationId||null);return}if(b?.closest?.(".rtile__restart-instructions")){let At=b?.closest?.(".rtile")?.dataset?.attemptId;At&&se(At,"restart");return}if(b?.closest?.(".rtile__resume-instructions")){let At=b?.closest?.(".rtile")?.dataset?.attemptId;At&&se(At,"resume_recorded");return}if(b?.closest?.(".rtile__pause")){let At=b?.closest?.(".rtile")?.dataset?.attemptId;At&&Jt(At);return}if(b?.closest?.(".rtile__resume-alternate")){let At=b?.closest?.(".rtile")?.dataset?.attemptId;At&&et(At);return}if(b?.closest?.(".rtile__resume")){let Ae=b?.closest?.(".rtile__resume"),Ot=b?.closest?.(".rtile")?.dataset?.attemptId;Ot&&w(Ot,Ae?.dataset?.resumeKind==="settlement"?"settlement":"session");return}if(b?.closest?.(".rtile__session")){let Ae=b?.closest?.(".rtile"),At=Ae?.dataset?.attemptId;if(At){Pe(At);return}let Ot=Ae?.dataset?.beadId;Ot&&Ce(Ot);return}if(b?.closest?.(".rtile__failure-pop"))return;if(b?.closest?.(".worker-drawer-overlay__backdrop")){Je.close(),Ne.close();return}if(b?.closest?.(".worker-drawer-host"))return;let mt=b?.closest?.(".rtile .board-card__roll-toggle");if(mt){let Ae=mt.dataset.rollParent;Ae&&(qe.has(Ae)?qe.delete(Ae):qe.add(Ae),S());return}let Vt=b?.closest?.(".rtile .board-card__roll-child");if(Vt){let Ae=Vt.dataset.childId;Ae&&o&&o(Ae);return}let vt=b?.closest?.(".rtile");if(vt){if(b?.closest?.(".rtile__id")){let At=vt.dataset.beadId;At&&$n(At).then(Ot=>{Ot?be("\uBCF5\uC0AC\uB428","success",1200):be("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}let Ae=vt.dataset.beadId;Ae&&o&&o(Ae);return}let Et=b?.closest?.(".worker-mini, .worker-card");if(Et){let Ae=Et.dataset.beadId;if(b?.closest?.('[data-seam="log-path-copy"]'))return;if(b?.closest?.(".worker-mini__id, .worker-card__id")){Ae&&$n(Ae).then(Ot=>{Ot?be("\uBCF5\uC0AC\uB428","success",1200):be("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}let At=b?.closest?.(".ctl-chip--from");if(At){let Ot=At.dataset.fromId;Ot&&o&&o(Ot);return}Ae&&o&&o(Ae)}}function kr(y){let b=y.target;b?.closest?.(".worker-search")&&(C=b.value,S())}function Vn(y){let b=y.target;y.key!=="Escape"||!b?.closest?.(".worker-search")||C.length===0||(C="",S())}fe.attach(e),e.addEventListener("click",tn),e.addEventListener("change",pt),e.addEventListener("input",kr),e.addEventListener("keydown",Vn);function sr(y){let b=y.target,R=b&&typeof b.closest=="function"?we=>b.closest(we):()=>null,le=!1;k&&!R(".rtile__failure-pop, .rtile__failure-badge")&&(k=null,le=!0),ee&&!R(".rtile__provider-hold-pop, .rtile__provider-hold-badge")&&(ee=null,le=!0),le&&S()}function wr(y){y.key==="Escape"&&(k===null&&ee===null&&ne===null||(k=null,ee=null,ne=null,S()))}return document.addEventListener("click",sr),document.addEventListener("keydown",wr),z.attach(),ge.push(()=>{document.removeEventListener("click",sr),document.removeEventListener("keydown",wr),z.detach()}),Z(),m&&ge.push(m.subscribe(()=>{F.notifyIssuesChanged(),S()})),s&&ge.push(s.subscribe(()=>{let y=a&&a()||"";y!==re&&(re=y,Be.close()),S(),rt()})),S(),{load(){F.ensureSessionDefaults(),S()},pause(){x()},refreshSessionDefaults:ce,destroy(){x();for(let y of ge.splice(0))try{y()}catch{}fe.detach(),e.removeEventListener("click",tn),e.removeEventListener("change",pt),e.removeEventListener("input",kr),e.removeEventListener("keydown",Vn),F.destroy();try{Ne.destroy()}catch{}U.hidden=!0;try{Be.destroy()}catch{}ct(c``,e)}}}function fu(e){if(!e)return"Unknown";let t=e.split("/").filter(Boolean);return t.length>0?t[t.length-1]:"Unknown"}function Sg(e,t,n,r=async()=>{},s=async()=>{}){let i=zt("views:workspace-picker"),o=null,a=!1,l=!1,u=!1;async function d(M){let G=M.target.value,$=t.getState().workspace?.current?.path||"";if(G&&G!==$){i("switching workspace to %s",G),a=!0,D();try{await n(G)}catch(O){i("workspace switch failed: %o",O)}finally{a=!1,D()}}}async function _(){let M=t.getState(),q=M.workspace?.current?.path||M.workspace?.available?.[0]?.path||"";if(!(!q||l)){i("git-pulling workspace %s",q),l=!0,D();try{await r(q)}catch(G){i("workspace git pull failed: %o",G)}finally{l=!1,D()}}}function m(M){let q=M.target;q&&e.contains(q)||T()}function h(M){M.key==="Escape"&&T()}function g(){u||(u=!0,document.addEventListener("mousedown",m),document.addEventListener("keydown",h),D())}function T(){u&&(u=!1,document.removeEventListener("mousedown",m),document.removeEventListener("keydown",h),D())}function k(){u?T():g()}async function ee(M){let q=M.target,G=q.value,P=q.checked;i("toggling visibility %s \u2192 %s",G,String(P));try{await s(G,P)}catch($){i("workspace visibility toggle failed: %o",$)}}function ne(M){return M?c`
      <button
        type="button"
        class="workspace-picker__git-pull-button"
        @click=${_}
        ?disabled=${a||l}
        aria-label="Git Pull"
        title="Git Pull"
      >
        <span aria-hidden="true">⬇</span>
      </button>
    `:c``}function z(M,q){return c`
      <div class="workspace-picker__manage">
        <button
          type="button"
          class="workspace-picker__manage-button"
          @click=${k}
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
                ${M.map(G=>c`
                    <label
                      class="workspace-picker__manage-row"
                      title="${G.path}"
                    >
                      <input
                        type="checkbox"
                        class="workspace-picker__manage-checkbox"
                        value="${G.path}"
                        .checked=${!q.has(G.path)}
                        @change=${ee}
                      />
                      <span class="workspace-picker__manage-name"
                        >${fu(G.path)}</span
                      >
                    </label>
                  `)}
              </div>
            `:""}
      </div>
    `}function N(){let M=t.getState(),q=M.workspace?.current,G=M.workspace?.available||[],P=new Set(M.workspace?.hidden||[]),$=q?.path||G[0]?.path||"";if(G.length===0)return c``;let O=G.filter(C=>!P.has(C.path)||C.path===$);if(O.length<=1){let C=O[0]||G[0],oe=fu(C.path);return c`
        <div class="workspace-picker workspace-picker--single">
          <span class="workspace-picker__label" title="${C.path}"
            >${oe}</span
          >
          ${z(G,P)}
          ${ne($)}
          ${l?c`<span
                class="workspace-picker__loading"
                aria-hidden="true"
              ></span>`:""}
        </div>
      `}return c`
      <div class="workspace-picker">
        <select
          class="workspace-picker__select"
          @change=${d}
          ?disabled=${a||l}
          aria-label="Select project workspace"
        >
          ${O.map(C=>c`
              <option
                value="${C.path}"
                ?selected=${C.path===$}
                title="${C.path}"
              >
                ${fu(C.path)}
              </option>
            `)}
        </select>
        ${z(G,P)}
        ${ne($)}
        ${a||l?c`<span
              class="workspace-picker__loading"
              aria-hidden="true"
            ></span>`:""}
      </div>
    `}function D(){ct(N(),e)}return D(),o=t.subscribe(()=>D()),{destroy(){o&&(o(),o=null),document.removeEventListener("mousedown",m),document.removeEventListener("keydown",h),ct(c``,e)}}}var Eg=["update-status","edit-text","update-priority","create-issue","dep-add","dep-remove","update-assignee","update-exec-settings","update-impl-target","get-session-defaults","set-session-defaults","get-workspace-accounts","set-workspace-accounts","update-workflow-meta","label-add","label-remove","subscribe-list","unsubscribe-list","snapshot","upsert","delete","get-comments","add-comment","delete-issue","list-workspaces","set-workspace","set-workspace-visibility","get-workspace","workspace-changed","git-pull-workspace","subscribe-worker-queue","unsubscribe-worker-queue","worker-queue-snapshot","worker-queue-place","worker-queue-reorder","worker-queue-toggle","worker-automation-toggle","worker-provider-auto-switch-toggle","worker-repo-ops-opt-out-toggle","worker-repo-operation-dismiss","worker-repo-operation-deploy-run","worker-queue-set-slots","worker-queue-set-serial-lane-count","worker-queue-set-orchestration-defaults","worker-queue-remove","worker-queue-arm","worker-queue-disarm","worker-queue-start-now","worker-attempt-pause","worker-attempt-stop","worker-attempt-resume","worker-cleanup-retry","worker-resolve-in-session","worker-queue-hold-resume","worker-queue-hold-retry-now","worker-merge-queue-add","worker-merge-queue-add-all","worker-merge-auto-toggle","worker-merge-queue-remove","worker-discard","worker-discard-abandon","worker-stale-work-continue","worker-stale-work-backup-fresh","worker-stale-work-recheck","worker-pr-discard","worker-revise-fix","worker-revise-approve","subscribe-ui-order","unsubscribe-ui-order","ui-order-set","ui-order-snapshot","subscribe-display-policy","unsubscribe-display-policy","display-policy-set","display-policy-snapshot","subscribe-session-log","unsubscribe-session-log","session-log-snapshot","session-log-append","get-attempt-prompt","get-bead-prompt","get-bead-timeline","get-worker-system-prompt","get-session-refs","subscribe-adr","unsubscribe-adr","adr-snapshot","subscribe-monitor-pipeline","unsubscribe-monitor-pipeline","monitor-pipeline-snapshot","subscribe-impl-presets","unsubscribe-impl-presets","impl-presets-snapshot","impl-preset-create","impl-preset-update","impl-preset-delete","apply-impl-preset","apply-impl-preset-global","monitor-auto-toggle","monitor-lane-create","monitor-lane-update","monitor-lane-confirm","monitor-lane-remove","monitor-lane-provenance","get-compare","compare-snapshot","bench-run-create"];function _u(){let e=Date.now().toString(36),t=Math.random().toString(36).slice(2,8);return`${e}-${t}`}function Tg(e,t,n=_u()){return{id:n,type:e,payload:t}}function Rg(e={}){let t=zt("ws"),n={initialMs:e.backoff?.initialMs??1e3,maxMs:e.backoff?.maxMs??3e4,factor:e.backoff?.factor??2,jitterRatio:e.backoff?.jitterRatio??.2},r=()=>e.url&&e.url.length>0?e.url:typeof location<"u"?(location.protocol==="https:"?"wss://":"ws://")+location.host+"/ws":"ws://localhost/ws",s=null,i="closed",o=0,a=null,l=!0,u=new Map,d=[],_=new Map,m=new Set;function h(N){for(let D of Array.from(m))try{D(N)}catch{}}function g(){if(!l||a)return;i="reconnecting",t("ws reconnecting\u2026"),h(i);let N=Math.min(n.maxMs||0,(n.initialMs||0)*Math.pow(n.factor||1,o)),D=(n.jitterRatio||0)*N,M=Math.max(0,Math.round(N+(Math.random()*2-1)*D));t("ws retry in %d ms (attempt %d)",M,o+1),a=setTimeout(()=>{a=null,z()},M)}function T(N){try{s?.send(JSON.stringify(N))}catch(D){t("ws send failed",D)}}function k(){for(i="open",t("ws open"),h(i),o=0;d.length;){let N=d.shift();N&&T(N)}}function ee(N){let D;try{D=JSON.parse(String(N.data))}catch{t("ws received non-JSON message");return}if(!D||typeof D.id!="string"||typeof D.type!="string"){t("ws received invalid envelope");return}if(u.has(D.id)){let q=u.get(D.id);u.delete(D.id),D.ok?q?.resolve(D.payload):q?.reject(D.error||new Error("ws error"));return}let M=_.get(D.type);if(M&&M.size>0)for(let q of Array.from(M))try{q(D.payload)}catch(G){t("ws event handler error",G)}else t("ws received unhandled message type: %s",D.type)}function ne(){i="closed",t("ws closed"),h(i);for(let[N,D]of u.entries())D.reject(new Error("ws disconnected")),u.delete(N);o+=1,g()}function z(){if(!l)return;let N=r();try{s=new WebSocket(N),t("ws connecting %s",N),i="connecting",h(i),s.addEventListener("open",k),s.addEventListener("message",ee),s.addEventListener("error",()=>{}),s.addEventListener("close",ne)}catch(D){t("ws connect failed %o",D),g()}}return z(),{send(N,D){if(!Eg.includes(N))return Promise.reject(new Error(`unknown message type: ${N}`));let M=_u(),q=Tg(N,D,M);return t("send %s id=%s",N,M),new Promise((G,P)=>{u.set(M,{resolve:G,reject:P,type:N}),s&&s.readyState===s.OPEN?T(q):(t("queue %s id=%s (state=%s)",N,M,i),d.push(q))})},on(N,D){_.has(N)||_.set(N,new Set);let M=_.get(N);return M?.add(D),()=>{M?.delete(D)}},onConnection(N){return m.add(N),()=>{m.delete(N)}},reconnect(){l=!0,a&&(clearTimeout(a),a=null),o=0,z()},close(){l=!1,a&&(clearTimeout(a),a=null);try{s?.close()}catch{}},getState(){return i}}}function Gx(){let e=window.__BDUI_BOOTSTRAP__;return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:null}}}async function Vx(e,t){try{let r=await(await fetch("/api/config")).json();e.setState({config:r})}catch(n){t("config refresh failed",n)}}var tl=[["tab:board:ready","ready-issues"],["tab:board:blocked","blocked-issues"],["tab:board:in-progress","in-progress-issues"],["tab:board:resolved","resolved-issues"],["tab:board:deferred","deferred-issues"],["tab:board:closed","closed-issues"]],Cg=[["tab:worker:ready","ready-issues"],["tab:worker:blocked","blocked-issues"],["tab:worker:in-progress","in-progress-issues"],["tab:worker:resolved","resolved-issues"],["tab:worker:closed","closed-issues"]],Mr="tab:worker:closed",Yx="bdui.worker.done-range",Og=Am,Ig="worker:queue",Lg="ui:order",Dg="ui:display-policy",Pg="exec:presets",qr="tab:board:closed",Ng="beads-ui.board.closed-range";function Xx(e){if(!e)return()=>{};function t(r){document.documentElement.style.setProperty("--app-header-h",`${Math.round(r)}px`)}if(t(e.getBoundingClientRect().height),typeof ResizeObserver!="function")return()=>{};let n=new ResizeObserver(r=>{for(let s of r)t(s.contentRect.height+Qx(e))});return n.observe(e),()=>n.disconnect()}function Qx(e){let t=getComputedStyle(e);return[t.paddingTop,t.paddingBottom,t.borderTopWidth,t.borderBottomWidth].reduce((r,s)=>r+(parseFloat(s)||0),0)}function Zx(){let e=null,t=new Set;return{get:()=>e,set(n){e=n;for(let r of t)try{r()}catch{}},subscribe(n){return t.add(n),()=>t.delete(n)}}}function Jx(e){let t=zt("main");t("bootstrap start"),Xx(document.querySelector(".app-header"));let n=c`
    <section id="board-root" class="route board"></section>
    <section id="worker-root" class="route worker" hidden></section>
    <section id="monitor-root" class="route monitor" hidden></section>
    <section id="compare-root" class="route compare" hidden></section>
    <section id="adr-root" class="route adr" hidden></section>
    <section id="detail-panel" class="route detail" hidden></section>
  `;ct(n,e);let r=document.getElementById("global-nav"),s=document.getElementById("top-nav"),i=document.getElementById("repo-scope"),o=document.getElementById("usage-meter"),a=document.getElementById("board-root"),l=document.getElementById("worker-root"),u=document.getElementById("monitor-root"),d=document.getElementById("compare-root"),_=document.getElementById("adr-root"),m=document.getElementById("detail-panel");if(o&&Wm(o),a&&l&&u&&d&&_&&m){let B=function(A,I){let Pe="Request failed",Ce="";if(A&&typeof A=="object"){let ft=A;if(typeof ft.message=="string"&&ft.message.length>0&&(Pe=ft.message),typeof ft.details=="string")Ce=ft.details;else if(ft.details&&typeof ft.details=="object")try{Ce=JSON.stringify(ft.details,null,2)}catch{Ce=""}}else typeof A=="string"&&A.length>0&&(Pe=A);let rt=I&&I.length>0?`Failed to load ${I}`:"Request failed";pe.open(rt,Pe,Ce)},Pt=function(A){return`${at.getState().workspace.current?.path||""}\0${A}`},St=function(){Be&&(Be().catch(()=>{}),Be=null),re=null,Q=null},ht=function(A){Te=A;let I=()=>{Te!==A||at.getState().selected_id!==A||(Te=null,ot(A))};if(!Qe){dt.then(I);return}I()},De=function(A,I,Pe,Ce,rt){return Pe!==se[I]?(rt().catch(()=>{}),!1):(A.set(Ce,rt),!0)},Me=function(){let A=at.getState();xe(A.view==="board"),st(A.view==="worker"),ye(Ee(A)),Rt(A.view==="adr"),E(A.view==="board"||A.view==="worker"||Se||!!A.selected_id)},It=function(){let A=Kr(We);return A===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:A}}},_e=function(){let A=Kr(tt);return A===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:A}}},xe=function(A){if(A)for(let[I,Pe]of tl){if(Jt.has(I)||w.has(I))continue;let Ce=I===qr?It():{type:Pe};try{te.register(I,Ce)}catch(tn){t("register %s store failed: %o",I,tn)}w.add(I);let rt=se.board,ft=!1;W.subscribeList(I,Ce).then(tn=>{ft=!De(Jt,"board",rt,I,tn)}).catch(tn=>{t("subscribe %s failed: %o",I,tn),B(tn,"board")}).finally(()=>{w.delete(I),ft&&Me()})}else it()},it=function(){se.board+=1;for(let[A]of tl){let I=Jt.get(A);I&&(I().catch(()=>{}),Jt.delete(A));try{te.unregister(A)}catch(Pe){t("unregister %s failed: %o",A,Pe)}}},st=function(A){if(!A){ze();return}for(let[I,Pe]of Cg){if(ut.has(I)||w.has(I))continue;let Ce=I===Mr?_e():{type:Pe};try{te.register(I,Ce)}catch(tn){t("register %s store failed: %o",I,tn)}w.add(I);let rt=se.worker,ft=!1;W.subscribeList(I,Ce).then(tn=>{ft=!De(ut,"worker",rt,I,tn)}).catch(tn=>{t("subscribe %s failed: %o",I,tn),B(tn,"worker")}).finally(()=>{w.delete(I),ft&&Me()})}},ze=function(){se.worker+=1;for(let[A]of Cg){let I=ut.get(A);I&&(I().catch(()=>{}),ut.delete(A));try{te.unregister(A)}catch(Pe){t("unregister %s failed: %o",A,Pe)}}},E=function(A){if(!A){K();return}bt||(Re("subscribe-worker-queue",{id:Ig}).catch(I=>{t("subscribe-worker-queue failed: %o",I)}),bt=()=>Re("unsubscribe-worker-queue",{id:Ig}))},K=function(){bt&&(bt().catch(()=>{}),bt=null)},Ee=function(A){return A.view==="monitor"||A.selected_id!=null},ye=function(A){if(!A){wt();return}X||(Re("subscribe-monitor-pipeline",{id:Og}).catch(I=>{t("subscribe-monitor-pipeline failed: %o",I)}),X=()=>Re("unsubscribe-monitor-pipeline",{id:Og}))},wt=function(){X&&(X().catch(()=>{}),X=null)},Rt=function(A){if(!A){jt();return}kt||(Re("subscribe-adr",{id:bl}).catch(I=>{t("subscribe-adr failed: %o",I)}),kt=()=>Re("unsubscribe-adr",{id:bl}))},jt=function(){kt&&(kt().catch(()=>{}),kt=null)},Xt=function(){Wt||(Re("subscribe-ui-order",{id:Lg}).catch(A=>{t("subscribe-ui-order failed: %o",A)}),Wt=()=>Re("unsubscribe-ui-order",{id:Lg}))},an=function(){Wt&&(Wt().catch(()=>{}),Wt=null),ke.clear()},rn=function(){$t||(Re("subscribe-display-policy",{id:Dg}).catch(A=>{t("subscribe-display-policy failed: %o",A)}),$t=()=>Re("unsubscribe-display-policy",{id:Dg}))},fn=function(){$t&&($t().catch(()=>{}),$t=null),fe.clear()},Gt=function(){qt||(Re("subscribe-impl-presets",{id:Pg}).catch(A=>{t("subscribe-impl-presets failed: %o",A)}),qt=()=>Re("unsubscribe-impl-presets",{id:Pg}))},xt=function(A){if(!A)return"Unknown";let I=A.split("/").filter(Boolean);return I.length>0?I[I.length-1]:"Unknown"},S=function(A,I){x.open(A.path,{missing_state:A.missing_state,...I?{workspace:I}:{}})};var h=B,g=Pt,T=St,k=ht,ee=De,ne=Me,z=It,N=_e,D=xe,M=it,q=st,G=ze,P=E,$=K,O=Ee,C=ye,oe=wt,ue=Rt,me=jt,V=Xt,ie=an,de=rn,Oe=fn,qe=Gt,Ie=xt,ge=S;let F=document.getElementById("header-loading"),ce=nd(F),pe=G_(e),U=Rg(),Re=ce.wrapSend((A,I)=>U.send(A,I)),W=Yu(Re),te=Xu(),J=Zu(),Y=Tu(),ke=Qu(),fe=Su(),Le=Eu(),Ne=Ru(),Je=Zx();U.on("impl-presets-snapshot",A=>{let I=A;I&&typeof I.revision=="number"&&Array.isArray(I.presets)&&Le.set({revision:I.revision,presets:I.presets})}),U.on("adr-snapshot",A=>{let I=A;!I||!Array.isArray(I.workspaces)||Je.set({workspaces:I.workspaces})}),U.on("monitor-pipeline-snapshot",A=>{let I=A;if(!(!I||!Array.isArray(I.workspaces)))try{Y.set(I.workspaces,I.workspaces_state,I.cross_lanes)}catch{}}),U.on("ui-order-snapshot",A=>{let I=A;if(I&&typeof I.revision=="number")try{ke.set({revision:I.revision,order:I.order&&typeof I.order=="object"?I.order:{}})}catch{}}),U.on("display-policy-snapshot",A=>{let I=A;if(I&&I.policy&&typeof I.policy=="object")try{fe.set(I.policy)}catch{}}),U.on("session-log-snapshot",A=>{let I=A;if(I&&typeof I.id=="string")try{Ne.set(I.id,Array.isArray(I.lines)?I.lines:[],typeof I.last_event_at=="number"?I.last_event_at:null)}catch{}}),U.on("session-log-append",A=>{let I=A;if(I&&typeof I.id=="string")try{Ne.append(I.id,I.event)}catch{}}),U.on("snapshot",A=>{let I=A,Pe=I&&typeof I.id=="string"?I.id:"",Ce=Pe?te.getStore(Pe):null;if(Ce&&I&&I.type==="snapshot")try{Ce.applyPush(I)}catch{}}),U.on("upsert",A=>{let I=A,Pe=I&&typeof I.id=="string"?I.id:"",Ce=Pe?te.getStore(Pe):null;if(Ce&&I&&I.type==="upsert")try{Ce.applyPush(I)}catch{}}),U.on("delete",A=>{let I=A,Pe=I&&typeof I.id=="string"?I.id:"",Ce=Pe?te.getStore(Pe):null;if(Ce&&I&&I.type==="delete")try{Ce.applyPush(I)}catch{}});let Be=null,re=null,Q=null,Te=null,et=()=>{},dt=new Promise(A=>{et=()=>A(void 0)}),Qe=!1,gt=!1;async function ot(A){let I=Pt(A);if(I===re||I===Q)return;Q=I;let Pe=`detail:${A}`,Ce={type:"issue-detail",params:{id:A}};try{te.register(Pe,Ce)}catch(rt){t("register detail store failed: %o",rt)}try{let rt=await W.subscribeList(Pe,Ce);if(at.getState().selected_id!==A||Pt(A)!==I){await rt().catch(()=>{});return}Be&&await Be().catch(()=>{}),Be=rt,re=I}catch(rt){t("detail subscribe failed: %o",rt),B(rt,"issue details")}finally{Q===I&&(Q=null)}}let Jt=new Map,w=new Set,se={board:0,worker:0},Se=!1,We=ci;try{let A=window.localStorage.getItem(Ng);cl(A)&&(We=A)}catch{}let tt="today";try{let A=window.localStorage.getItem(Yx);A!==null&&(tt=Xn(A))}catch{}async function Ze(A){if(!cl(A)||A===We)return;We=A;try{window.localStorage.setItem(Ng,A)}catch{}let I=Jt.get(qr);if(!I)return;Jt.delete(qr),await I().catch(()=>{});let Pe=It();try{te.register(qr,Pe)}catch(Ce){t("register %s store failed: %o",qr,Ce)}try{let Ce=await W.subscribeList(qr,Pe);Jt.set(qr,Ce)}catch(Ce){t("re-subscribe %s failed: %o",qr,Ce),B(Ce,"board")}}async function yt(A){let I=Xn(A);if(I===tt)return;tt=I;let Pe=ut.get(Mr);if(!Pe)return;ut.delete(Mr),await Pe().catch(()=>{});let Ce=_e();try{te.register(Mr,Ce)}catch(rt){t("register %s store failed: %o",Mr,rt)}try{let rt=await W.subscribeList(Mr,Ce);ut.set(Mr,rt)}catch(rt){t("re-subscribe %s failed: %o",Mr,rt),B(rt,"worker")}}let ut=new Map,bt=null,X=null,kt=null,Wt=null,$t=null,qt=null;async function sn(){$t=null,fe.clear(),qt=null,Le.clear(),bt=null,X=null,kt=null,Jt.clear(),ut.clear(),se.board+=1,se.worker+=1,Gt();let A=at.getState().workspace.current?.path;if(A)try{await U.send("set-workspace",{path:A})}catch(Pe){t("workspace restore after reconnect failed: %o",Pe);return}rn();let I=at.getState();xe(I.view==="board"),st(I.view==="worker"),ye(Ee(I)),Rt(I.view==="adr"),E(I.view==="board"||I.view==="worker"||!!I.selected_id)}async function Ke(){t("clearing all subscriptions for workspace switch"),it(),ze(),K(),J.clear(),an(),Xt(),fn(),rn(),St();let A=at.getState();if(A.selected_id)try{te.unregister(`detail:${A.selected_id}`)}catch{}let I=at.getState();xe(I.view==="board"),st(I.view==="worker"),ye(Ee(I)),E(I.view==="board"||I.view==="worker"||!!I.selected_id),I.selected_id&&ht(I.selected_id)}async function L(A){t("requesting workspace switch to %s",A),gt=!0;try{let I=await U.send("set-workspace",{path:A});t("workspace switch result: %o",I),I&&I.workspace&&(at.setState({workspace:{current:{path:I.workspace.root_dir,database:I.workspace.db_path}}}),window.localStorage.setItem("beads-ui.workspace",A),I.changed&&(await Ke(),be("Switched to "+xt(A),"success",2e3)))}catch(I){throw t("workspace switch failed: %o",I),be("Failed to switch workspace","error",3e3),I}finally{gt=!1}}async function ve(A){t("requesting workspace git pull for %s",A);try{let I=await U.send("git-pull-workspace",{});t("workspace git pull result: %o",I);let Pe=I?.status;if(Pe==="up_to_date"){be("Already up to date","success",2e3);return}if(Pe==="stash_pop_conflict"){be("Git pulled, but stash pop conflicted (check git stash list)","warning",4e3);return}be("Git pulled "+xt(A),"success",2e3)}catch(I){t("workspace git pull failed: %o",I);let Pe=I?.code,Ce=I?.message;if(Pe==="rebase_conflict"){be("Git pull conflicts \u2014 reverted (manual resolve required)","error",4e3);return}if(Pe==="rebase_conflict_abort_failed"){be("Git pull conflicts AND rebase --abort failed \u2014 repo left mid-rebase, run 'git rebase --abort' manually","error",6e3);return}if(Pe==="busy"){be("Git pull skipped: another operation is running","warning",3e3);return}let rt=Ce?`: ${Ce}`:"";throw be(`Git pull failed${rt}`,"error",3e3),I}}async function je(A,I){t("setting workspace visibility %s \u2192 %s",A,String(I));try{await U.send("set-workspace-visibility",{path:A,visible:I}),await Ve()}catch(Pe){t("workspace visibility update failed: %o",Pe),be("Failed to update project visibility","error",3e3)}}async function Ve(){try{let A=await U.send("list-workspaces",{});if(t("workspaces loaded: %o",A),A&&Array.isArray(A.workspaces)){let I=A.workspaces.map(ft=>({path:ft.path,database:ft.database,pid:ft.pid,version:ft.version})),Pe=A.current?{path:A.current.root_dir,database:A.current.db_path}:null,Ce=Array.isArray(A.hidden)?A.hidden.filter(ft=>typeof ft=="string"):[];at.setState({workspace:{current:Pe,available:I,hidden:Ce}});let rt=window.localStorage.getItem("beads-ui.workspace");rt&&(!I.some(tn=>tn.path===rt)||Ce.includes(rt)?window.localStorage.removeItem("beads-ui.workspace"):Pe&&rt!==Pe.path&&(t("restoring saved workspace preference: %s",rt),await L(rt)))}}catch(A){t("failed to load workspaces: %o",A)}}U.on("workspace-changed",A=>{t("workspace-changed event: %o",A),A&&A.root_dir&&(at.setState({workspace:{current:{path:A.root_dir,database:A.db_path}}}),Ve(),Ke())});let Dt=!1;if(typeof U.onConnection=="function"){let A=I=>{t("ws state %s",I),I==="reconnecting"||I==="closed"?(Dt=!0,be("Connection lost. Reconnecting\u2026","error",4e3)):I==="open"&&Dt&&(Dt=!1,be("Reconnected","success",2200),Vx(at,(Pe,Ce)=>{t(`${Pe}: %o`,Ce)}),sn())};U.onConnection(A)}let Ht="board";try{let A=window.localStorage.getItem("beads-ui.view");(A==="board"||A==="worker"||A==="monitor"||A==="compare"||A==="adr")&&(Ht=A)}catch(A){t("view parse error: %o",A)}let at=td({config:Gx(),view:Ht});U.on("worker-queue-snapshot",A=>{let I=A;if(!I||!I.queue)return;let Pe=at.getState().workspace.current?.path;if(typeof Pe=="string"&&Pe.length>0&&I.root_dir!==Pe){t("dropping worker-queue snapshot for %s",String(I.root_dir));return}try{J.set(I.queue)}catch{}});let Ct=Ju(at);Ct.start();let hn=new Set(["get-comments","dep-add","dep-remove","impl-preset-create","impl-preset-update","impl-preset-delete","apply-impl-preset","apply-impl-preset-global","get-session-defaults","set-session-defaults","monitor-lane-create","monitor-lane-update","monitor-lane-confirm","monitor-lane-remove"]),Nt=async(A,I)=>{try{return await Re(A,I)}catch(Pe){if(hn.has(A))throw Pe;return[]}};Em({global_element:r,repo_element:s},at,Ct);let vn=document.getElementById("workspace-picker");vn&&Sg(vn,at,L,ve,je);let bn=Rm(e,(A,I)=>Re(A,I));try{let A=document.getElementById("new-issue-btn");A&&A.addEventListener("click",()=>bn.open())}catch{}let p=Lm(e,{policyStore:fe,queueStore:J,implPresetStore:Le,transport:(A,I)=>Re(A,I),onOpenChange:A=>{let I=Se;Se=A,Me(),I&&A===!1&&ae.refreshSessionDefaults()},labelOptions:()=>{let A=new Set;for(let[I]of tl)for(let Pe of te.snapshotFor(I)||[]){let Ce=Pe.labels;if(Array.isArray(Ce))for(let rt of Ce)typeof rt=="string"&&rt.length>0&&A.add(rt)}return Array.from(A).sort()}});try{let A=document.getElementById("display-settings-btn");A&&(A.setAttribute("aria-label","\uC124\uC815"),A.setAttribute("title","\uC124\uC815"),A.addEventListener("click",()=>p.open()))}catch{}let f=document.createElement("div");f.className="md-viewer-root",document.body.appendChild(f);let x=qa(f,{getWorkspacePath:()=>at.getState().workspace.current?.path}),Z=Sd(a,{gotoIssue:A=>Ct.gotoIssue(A),issueStores:te,transport:Nt,workerQueueStore:J,uiOrderStore:ke,displayPolicyStore:fe,closedRange:We,onClosedRangeChange:A=>{Ze(A)},onNewIssue:()=>bn.open(),openDoc:S}),ae=pu(l,{transport:Nt,issueStores:te,queueStore:J,sessionLogStore:Ne,gotoIssue:A=>at.setState({selected_id:A}),getWorkspacePath:()=>at.getState().workspace.current?.path,switchWorkspace:A=>L(A),openDoc:S,doneRange:tt,onDoneRangeChange:A=>{yt(A)}}),he=Sm(u,{transport:Nt,pipelineStore:Y,execPresetStore:Le,sessionLogStore:Ne,router:Ct,gotoIssue:A=>Ct.gotoIssue(A),getWorkspacePath:()=>at.getState().workspace.current?.path,switchWorkspace:A=>L(A),openDoc:S}),Ue=hf(d,{transport:Nt,gotoIssue:A=>Ct.gotoIssue(A),execPresetStore:Le,sourceCandidates:()=>{let A=new Map;for(let[I]of tl)for(let Pe of te.snapshotFor(I)||[]){let Ce=Pe?.id;typeof Ce=="string"&&Ce.length>0&&!A.has(Ce)&&A.set(Ce,Pe)}return Array.from(A.values())}});id(_,{adrStore:Je,gotoIssue:A=>Ct.gotoIssue(A),getWorkspacePath:()=>at.getState().workspace.current?.path,switchWorkspace:A=>L(A),openDoc:S});let He=K_(m,{issueStores:te,transport:Nt,queueStore:J,execPresetStore:Le,sessionLogStore:Ne,getWorkspacePath:()=>at.getState().workspace.current?.path,mdViewer:x,depCandidates:()=>{let A=Y.get();if(A===null)return null;let I=Y.getWorkspacesState(),Pe=at.getState();if(Pe.view==="monitor")return bc(A,I);let Ce=Pe.workspace.current?.path;return Ce?bc(A,I,{root_dir:Ce}):null},subscribeCandidates:A=>Y.subscribe(A),onDepChanged:({type:A,a:I,b:Pe})=>{let Ce=he;A==="dep-add"&&Ce&&typeof Ce.recorrectSharedLane=="function"&&Ce.recorrectSharedLane(A,I,Pe)},onNavigate:(A,I)=>{let Pe=()=>{at.getState().view==="worker"?at.setState({selected_id:A}):Ct.gotoIssue(A)},Ce=at.getState().workspace.current?.path;if(typeof I!="string"||I.length===0||!Ce||I===Ce){Pe();return}Promise.resolve(L(I)).then(Pe).catch(()=>{be("\uB808\uD3EC \uC804\uD658\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error",2400)})},onClose:()=>{let A=at.getState();at.setState({selected_id:null});try{Ct.gotoView(A.view==="worker"||A.view==="monitor"?A.view:"board")}catch{}},onOpenExecPresets:()=>{p.open("execution")}}),pt=at.getState().selected_id;pt&&(m.hidden=!1,He.load(pt),ht(pt)),at.subscribe(A=>{let I=A.selected_id;I?(m.hidden=!1,He.load(I),gt||ht(I)):(He.clear(),m.hidden=!0,St())});let Ft=A=>{a.hidden=A.view!=="board",l.hidden=A.view!=="worker",u.hidden=A.view!=="monitor",d.hidden=A.view!=="compare",_.hidden=A.view!=="adr",i&&i.classList.toggle("is-quiet",A.view==="monitor"||A.view==="compare"||A.view==="adr"),xe(A.view==="board"),st(A.view==="worker"),ye(Ee(A)),Rt(A.view==="adr"),E(A.view==="board"||A.view==="worker"||Se||!!A.selected_id),!A.selected_id&&A.view==="board"&&Z.load(),A.view==="worker"?ae.load():ae.pause(),A.view==="monitor"?he.load():he.pause(),A.view==="compare"?Ue.load():Ue.pause(),window.localStorage.setItem("beads-ui.view",A.view)};at.subscribe(Ft),Ft(at.getState()),Xt(),rn(),Gt(),Ve().finally(()=>{Qe=!0,et()}),window.addEventListener("keydown",A=>{let I=A.ctrlKey||A.metaKey,Pe=String(A.key||"").toLowerCase(),Ce=A.target,rt=Ce&&Ce.tagName?String(Ce.tagName).toLowerCase():"",ft=rt==="input"||rt==="textarea"||rt==="select"||Ce&&typeof Ce.isContentEditable=="boolean"&&Ce.isContentEditable;I&&Pe==="n"&&(ft||(A.preventDefault(),bn.open()))})}}typeof window<"u"&&typeof document<"u"&&window.addEventListener("DOMContentLoaded",()=>{try{let n=window.localStorage.getItem("beads-ui.theme"),r=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches,s=n==="dark"||n==="light"?n:r?"dark":"light";document.documentElement.setAttribute("data-theme",s);let i=document.getElementById("theme-switch");i&&(i.checked=s==="dark")}catch{}let e=document.getElementById("theme-switch");e&&e.addEventListener("change",()=>{let n=e.checked?"dark":"light";document.documentElement.setAttribute("data-theme",n),window.localStorage.setItem("beads-ui.theme",n)});let t=document.getElementById("app");t&&Jx(t)});export{Jx as bootstrap,Gx as readBootstrapConfig,Vx as refreshConfigSnapshot};
//# sourceMappingURL=main.bundle.js.map
