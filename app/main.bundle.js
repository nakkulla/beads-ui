var cg=Object.create;var Ga=Object.defineProperty;var ug=Object.getOwnPropertyDescriptor;var dg=Object.getOwnPropertyNames;var pg=Object.getPrototypeOf,fg=Object.prototype.hasOwnProperty;var _g=(e,t,n)=>t in e?Ga(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var Va=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var mg=(e,t,n,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let o of dg(t))!fg.call(e,o)&&o!==n&&Ga(e,o,{get:()=>t[o],enumerable:!(r=ug(t,o))||r.enumerable});return e};var gg=(e,t,n)=>(n=e!=null?cg(pg(e)):{},mg(t||!e||!e.__esModule?Ga(n,"default",{value:e,enumerable:!0}):n,e));var Vt=(e,t,n)=>_g(e,typeof t!="symbol"?t+"":t,n);var mu=Va((bx,_u)=>{var _o=1e3,mo=_o*60,go=mo*60,Gr=go*24,yg=Gr*7,vg=Gr*365.25;_u.exports=function(e,t){t=t||{};var n=typeof e;if(n==="string"&&e.length>0)return kg(e);if(n==="number"&&isFinite(e))return t.long?$g(e):wg(e);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(e))};function kg(e){if(e=String(e),!(e.length>100)){var t=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(e);if(t){var n=parseFloat(t[1]),r=(t[2]||"ms").toLowerCase();switch(r){case"years":case"year":case"yrs":case"yr":case"y":return n*vg;case"weeks":case"week":case"w":return n*yg;case"days":case"day":case"d":return n*Gr;case"hours":case"hour":case"hrs":case"hr":case"h":return n*go;case"minutes":case"minute":case"mins":case"min":case"m":return n*mo;case"seconds":case"second":case"secs":case"sec":case"s":return n*_o;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return n;default:return}}}}function wg(e){var t=Math.abs(e);return t>=Gr?Math.round(e/Gr)+"d":t>=go?Math.round(e/go)+"h":t>=mo?Math.round(e/mo)+"m":t>=_o?Math.round(e/_o)+"s":e+"ms"}function $g(e){var t=Math.abs(e);return t>=Gr?li(e,t,Gr,"day"):t>=go?li(e,t,go,"hour"):t>=mo?li(e,t,mo,"minute"):t>=_o?li(e,t,_o,"second"):e+" ms"}function li(e,t,n,r){var o=t>=n*1.5;return Math.round(e/n)+" "+r+(o?"s":"")}});var hu=Va((yx,gu)=>{function xg(e){n.debug=n,n.default=n,n.coerce=a,n.disable=s,n.enable=o,n.enabled=l,n.humanize=mu(),n.destroy=u,Object.keys(e).forEach(d=>{n[d]=e[d]}),n.names=[],n.skips=[],n.formatters={};function t(d){let f=0;for(let _=0;_<d.length;_++)f=(f<<5)-f+d.charCodeAt(_),f|=0;return n.colors[Math.abs(f)%n.colors.length]}n.selectColor=t;function n(d){let f,_=null,y,g;function C(...k){if(!C.enabled)return;let X=C,ae=Number(new Date),H=ae-(f||ae);X.diff=H,X.prev=f,X.curr=ae,f=ae,k[0]=n.coerce(k[0]),typeof k[0]!="string"&&k.unshift("%O");let N=0;k[0]=k[0].replace(/%([a-zA-Z%])/g,(j,B)=>{if(j==="%%")return"%";N++;let W=n.formatters[B];if(typeof W=="function"){let T=k[N];j=W.call(X,T),k.splice(N,1),N--}return j}),n.formatArgs.call(X,k),(X.log||n.log).apply(X,k)}return C.namespace=d,C.useColors=n.useColors(),C.color=n.selectColor(d),C.extend=r,C.destroy=n.destroy,Object.defineProperty(C,"enabled",{enumerable:!0,configurable:!1,get:()=>_!==null?_:(y!==n.namespaces&&(y=n.namespaces,g=n.enabled(d)),g),set:k=>{_=k}}),typeof n.init=="function"&&n.init(C),C}function r(d,f){let _=n(this.namespace+(typeof f>"u"?":":f)+d);return _.log=this.log,_}function o(d){n.save(d),n.namespaces=d,n.names=[],n.skips=[];let f=(typeof d=="string"?d:"").trim().replace(/\s+/g,",").split(",").filter(Boolean);for(let _ of f)_[0]==="-"?n.skips.push(_.slice(1)):n.names.push(_)}function i(d,f){let _=0,y=0,g=-1,C=0;for(;_<d.length;)if(y<f.length&&(f[y]===d[_]||f[y]==="*"))f[y]==="*"?(g=y,C=_,y++):(_++,y++);else if(g!==-1)y=g+1,C++,_=C;else return!1;for(;y<f.length&&f[y]==="*";)y++;return y===f.length}function s(){let d=[...n.names,...n.skips.map(f=>"-"+f)].join(",");return n.enable(""),d}function l(d){for(let f of n.skips)if(i(d,f))return!1;for(let f of n.names)if(i(d,f))return!0;return!1}function a(d){return d instanceof Error?d.stack||d.message:d}function u(){console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")}return n.enable(n.load()),n}gu.exports=xg});var bu=Va((Cn,ci)=>{Cn.formatArgs=Sg;Cn.save=Eg;Cn.load=Tg;Cn.useColors=Ag;Cn.storage=Cg();Cn.destroy=(()=>{let e=!1;return()=>{e||(e=!0,console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."))}})();Cn.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"];function Ag(){if(typeof window<"u"&&window.process&&(window.process.type==="renderer"||window.process.__nwjs))return!0;if(typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))return!1;let e;return typeof document<"u"&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||typeof window<"u"&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||typeof navigator<"u"&&navigator.userAgent&&(e=navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/))&&parseInt(e[1],10)>=31||typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)}function Sg(e){if(e[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+e[0]+(this.useColors?"%c ":" ")+"+"+ci.exports.humanize(this.diff),!this.useColors)return;let t="color: "+this.color;e.splice(1,0,t,"color: inherit");let n=0,r=0;e[0].replace(/%[a-zA-Z%]/g,o=>{o!=="%%"&&(n++,o==="%c"&&(r=n))}),e.splice(r,0,t)}Cn.log=console.debug||console.log||(()=>{});function Eg(e){try{e?Cn.storage.setItem("debug",e):Cn.storage.removeItem("debug")}catch{}}function Tg(){let e;try{e=Cn.storage.getItem("debug")||Cn.storage.getItem("DEBUG")}catch{}return!e&&typeof process<"u"&&"env"in process&&(e=process.env.DEBUG),e}function Cg(){try{return localStorage}catch{}}ci.exports=hu()(Cn);var{formatters:Rg}=ci.exports;Rg.j=function(e){try{return JSON.stringify(e)}catch(t){return"[UnexpectedJSONParseError]: "+t.message}}});var Xo=globalThis,ei=Xo.trustedTypes,Jc=ei?ei.createPolicy("lit-html",{createHTML:e=>e}):void 0,Qa="$lit$",ar=`lit$${Math.random().toFixed(9).slice(2)}$`,Xa="?"+ar,hg=`<${Xa}>`,Wr=document,Zo=()=>Wr.createComment(""),Jo=e=>e===null||typeof e!="object"&&typeof e!="function",Za=Array.isArray,su=e=>Za(e)||typeof e?.[Symbol.iterator]=="function",Ya=`[ 	
\f\r]`,Qo=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,eu=/-->/g,tu=/>/g,Br=RegExp(`>|${Ya}(?:([^\\s"'>=/]+)(${Ya}*=${Ya}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),nu=/'/g,ru=/"/g,iu=/^(?:script|style|textarea|title)$/i,Ja=e=>(t,...n)=>({_$litType$:e,strings:t,values:n}),c=Ja(1),ts=Ja(2),dx=Ja(3),Pn=Symbol.for("lit-noChange"),Jt=Symbol.for("lit-nothing"),ou=new WeakMap,Ur=Wr.createTreeWalker(Wr,129);function au(e,t){if(!Za(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return Jc!==void 0?Jc.createHTML(t):t}var lu=(e,t)=>{let n=e.length-1,r=[],o,i=t===2?"<svg>":t===3?"<math>":"",s=Qo;for(let l=0;l<n;l++){let a=e[l],u,d,f=-1,_=0;for(;_<a.length&&(s.lastIndex=_,d=s.exec(a),d!==null);)_=s.lastIndex,s===Qo?d[1]==="!--"?s=eu:d[1]!==void 0?s=tu:d[2]!==void 0?(iu.test(d[2])&&(o=RegExp("</"+d[2],"g")),s=Br):d[3]!==void 0&&(s=Br):s===Br?d[0]===">"?(s=o??Qo,f=-1):d[1]===void 0?f=-2:(f=s.lastIndex-d[2].length,u=d[1],s=d[3]===void 0?Br:d[3]==='"'?ru:nu):s===ru||s===nu?s=Br:s===eu||s===tu?s=Qo:(s=Br,o=void 0);let y=s===Br&&e[l+1].startsWith("/>")?" ":"";i+=s===Qo?a+hg:f>=0?(r.push(u),a.slice(0,f)+Qa+a.slice(f)+ar+y):a+ar+(f===-2?l:y)}return[au(e,i+(e[n]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),r]},es=class e{constructor({strings:t,_$litType$:n},r){let o;this.parts=[];let i=0,s=0,l=t.length-1,a=this.parts,[u,d]=lu(t,n);if(this.el=e.createElement(u,r),Ur.currentNode=this.el.content,n===2||n===3){let f=this.el.content.firstChild;f.replaceWith(...f.childNodes)}for(;(o=Ur.nextNode())!==null&&a.length<l;){if(o.nodeType===1){if(o.hasAttributes())for(let f of o.getAttributeNames())if(f.endsWith(Qa)){let _=d[s++],y=o.getAttribute(f).split(ar),g=/([.?@])?(.*)/.exec(_);a.push({type:1,index:i,name:g[2],strings:y,ctor:g[1]==="."?ni:g[1]==="?"?ri:g[1]==="@"?oi:zr}),o.removeAttribute(f)}else f.startsWith(ar)&&(a.push({type:6,index:i}),o.removeAttribute(f));if(iu.test(o.tagName)){let f=o.textContent.split(ar),_=f.length-1;if(_>0){o.textContent=ei?ei.emptyScript:"";for(let y=0;y<_;y++)o.append(f[y],Zo()),Ur.nextNode(),a.push({type:2,index:++i});o.append(f[_],Zo())}}}else if(o.nodeType===8)if(o.data===Xa)a.push({type:2,index:i});else{let f=-1;for(;(f=o.data.indexOf(ar,f+1))!==-1;)a.push({type:7,index:i}),f+=ar.length-1}i++}}static createElement(t,n){let r=Wr.createElement("template");return r.innerHTML=t,r}};function Hr(e,t,n=e,r){if(t===Pn)return t;let o=r!==void 0?n._$Co?.[r]:n._$Cl,i=Jo(t)?void 0:t._$litDirective$;return o?.constructor!==i&&(o?._$AO?.(!1),i===void 0?o=void 0:(o=new i(e),o._$AT(e,n,r)),r!==void 0?(n._$Co??(n._$Co=[]))[r]=o:n._$Cl=o),o!==void 0&&(t=Hr(e,o._$AS(e,t.values),o,r)),t}var ti=class{constructor(t,n){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=n}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:n},parts:r}=this._$AD,o=(t?.creationScope??Wr).importNode(n,!0);Ur.currentNode=o;let i=Ur.nextNode(),s=0,l=0,a=r[0];for(;a!==void 0;){if(s===a.index){let u;a.type===2?u=new po(i,i.nextSibling,this,t):a.type===1?u=new a.ctor(i,a.name,a.strings,this,t):a.type===6&&(u=new si(i,this,t)),this._$AV.push(u),a=r[++l]}s!==a?.index&&(i=Ur.nextNode(),s++)}return Ur.currentNode=Wr,o}p(t){let n=0;for(let r of this._$AV)r!==void 0&&(r.strings!==void 0?(r._$AI(t,r,n),n+=r.strings.length-2):r._$AI(t[n])),n++}},po=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,n,r,o){this.type=2,this._$AH=Jt,this._$AN=void 0,this._$AA=t,this._$AB=n,this._$AM=r,this.options=o,this._$Cv=o?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,n=this._$AM;return n!==void 0&&t?.nodeType===11&&(t=n.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,n=this){t=Hr(this,t,n),Jo(t)?t===Jt||t==null||t===""?(this._$AH!==Jt&&this._$AR(),this._$AH=Jt):t!==this._$AH&&t!==Pn&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):su(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==Jt&&Jo(this._$AH)?this._$AA.nextSibling.data=t:this.T(Wr.createTextNode(t)),this._$AH=t}$(t){let{values:n,_$litType$:r}=t,o=typeof r=="number"?this._$AC(t):(r.el===void 0&&(r.el=es.createElement(au(r.h,r.h[0]),this.options)),r);if(this._$AH?._$AD===o)this._$AH.p(n);else{let i=new ti(o,this),s=i.u(this.options);i.p(n),this.T(s),this._$AH=i}}_$AC(t){let n=ou.get(t.strings);return n===void 0&&ou.set(t.strings,n=new es(t)),n}k(t){Za(this._$AH)||(this._$AH=[],this._$AR());let n=this._$AH,r,o=0;for(let i of t)o===n.length?n.push(r=new e(this.O(Zo()),this.O(Zo()),this,this.options)):r=n[o],r._$AI(i),o++;o<n.length&&(this._$AR(r&&r._$AB.nextSibling,o),n.length=o)}_$AR(t=this._$AA.nextSibling,n){for(this._$AP?.(!1,!0,n);t!==this._$AB;){let r=t.nextSibling;t.remove(),t=r}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},zr=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,n,r,o,i){this.type=1,this._$AH=Jt,this._$AN=void 0,this.element=t,this.name=n,this._$AM=o,this.options=i,r.length>2||r[0]!==""||r[1]!==""?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=Jt}_$AI(t,n=this,r,o){let i=this.strings,s=!1;if(i===void 0)t=Hr(this,t,n,0),s=!Jo(t)||t!==this._$AH&&t!==Pn,s&&(this._$AH=t);else{let l=t,a,u;for(t=i[0],a=0;a<i.length-1;a++)u=Hr(this,l[r+a],n,a),u===Pn&&(u=this._$AH[a]),s||(s=!Jo(u)||u!==this._$AH[a]),u===Jt?t=Jt:t!==Jt&&(t+=(u??"")+i[a+1]),this._$AH[a]=u}s&&!o&&this.j(t)}j(t){t===Jt?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},ni=class extends zr{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===Jt?void 0:t}},ri=class extends zr{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==Jt)}},oi=class extends zr{constructor(t,n,r,o,i){super(t,n,r,o,i),this.type=5}_$AI(t,n=this){if((t=Hr(this,t,n,0)??Jt)===Pn)return;let r=this._$AH,o=t===Jt&&r!==Jt||t.capture!==r.capture||t.once!==r.once||t.passive!==r.passive,i=t!==Jt&&(r===Jt||o);o&&this.element.removeEventListener(this.name,this,r),i&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},si=class{constructor(t,n,r){this.element=t,this.type=6,this._$AN=void 0,this._$AM=n,this.options=r}get _$AU(){return this._$AM._$AU}_$AI(t){Hr(this,t)}},cu={M:Qa,P:ar,A:Xa,C:1,L:lu,R:ti,D:su,V:Hr,I:po,H:zr,N:ri,U:oi,B:ni,F:si},bg=Xo.litHtmlPolyfillSupport;bg?.(es,po),(Xo.litHtmlVersions??(Xo.litHtmlVersions=[])).push("3.3.1");var lt=(e,t,n)=>{let r=n?.renderBefore??t,o=r._$litPart$;if(o===void 0){let i=n?.renderBefore??null;r._$litPart$=o=new po(t.insertBefore(Zo(),i),i,void 0,n??{})}return o._$AI(e),o};var ii="today",ai=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"},{value:"30d",label:"\uCD5C\uADFC 30\uC77C"},{value:"all",label:"\uC804\uCCB4"}],fo=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"}];function Qn(e){return e==="today"?"today":"7d"}function el(e){return e==="today"||e==="7d"||e==="30d"||e==="all"}function Kr(e,t=Date.now()){switch(e){case"today":{let n=new Date(t);return n.setHours(0,0,0,0),n.getTime()}case"7d":return t-7*864e5;case"30d":return t-30*864e5;case"all":default:return}}function uu(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function du(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function pu(){let e=null,t=[],n,r=new Set;function o(){for(let i of Array.from(r))try{i()}catch{}}return{get(){return e},getWorkspacesState(){return t},crossLanes(){return n},set(i,s,l){e=Array.isArray(i)?i:null,t=Array.isArray(s)?s:[],n=l===void 0?void 0:l!==null&&typeof l=="object"&&typeof l.revision=="number"&&Array.isArray(l.lanes)?{revision:l.revision,lanes:l.lanes}:null,o()},clear(){e=null,t=[],n=void 0,o()},subscribe(i){return r.add(i),()=>r.delete(i)}}}function fu(){let e=new Map,t=new Set;function n(o){return o.startsWith("session-log:")?o:`session-log:${o}`}function r(){for(let o of Array.from(t))try{o()}catch{}}return{set(o,i,s=null){e.set(n(o),{lines:Array.isArray(i)?[...i]:[],last_event_at:typeof s=="number"?s:null}),r()},append(o,i){let s=n(o),l=e.get(s)||{lines:[],last_event_at:null};l.lines=[...l.lines,i],l.last_event_at=Date.now(),e.set(s,l),r()},get(o){return e.get(n(o))||null},clear(o){typeof o=="string"?e.delete(n(o)):e.clear(),r()},subscribe(o){return t.add(o),()=>t.delete(o)}}}var yu=gg(bu(),1);function Ht(e){return(0,yu.default)(`beads-ui:${e}`)}function Og(e){let n=vu((e&&typeof e=="object"?e:{}).spec_id);return n?{path:n,source:"native",conflict:!1}:{path:"",source:"none",conflict:!1}}function vu(e){return typeof e=="string"?e.trim():""}function Ig(e){let t=e&&typeof e=="object"?e:{};return t.metadata&&typeof t.metadata=="object"?t.metadata:{}}var Lg=/^[A-Za-z0-9_.:-]+@[0-9a-fA-F]{40}$/;function ho(e){let t=Og(e),n=vu(Ig(e).spec_review),r=Lg.test(n),o=r&&n.slice(0,n.indexOf("@"))==="skipped";return t.source==="none"?{...t,evidence:"none",skipped:o}:{...t,evidence:r?"published":"draft",skipped:o}}function jn(e){if(typeof e=="number")return Number.isFinite(e)?e:0;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:0}return 0}function ns(e,t){let n=jn(e.created_at),r=jn(t.created_at);if(n!==r)return n<r?1:-1;let o=e.priority??2,i=t.priority??2;if(o!==i)return o-i;let s=e.id,l=t.id;return s<l?-1:s>l?1:0}function Su(e,t){let n=jn(e.created_at),r=jn(t.created_at);if(n!==r)return n<r?-1:1;let o=e.priority??2,i=t.priority??2;if(o!==i)return o-i;let s=e.id,l=t.id;return s<l?-1:s>l?1:0}function Eu(e,t){let n=jn(e.updated_at),r=jn(t.updated_at);if(n!==r)return n<r?1:-1;let o=e.id,i=t.id;return o<i?-1:o>i?1:0}function Tu(e,t){let n=e.priority??2,r=t.priority??2;if(n!==r)return n-r;let o=jn(e.created_at),i=jn(t.created_at);if(o!==i)return o<i?1:-1;let s=e.id,l=t.id;return s<l?-1:s>l?1:0}function Cu(e,t){let n=e.closed_at??0,r=t.closed_at??0;if(n!==r)return n<r?1:-1;let o=e?.id,i=t?.id;return o<i?-1:o>i?1:0}var ui=Object.freeze({priority:"asc",dependents:"desc",released:"desc",spec:"desc",created:"asc",updated:"desc"});function Dg(e){return typeof e=="string"&&Object.prototype.hasOwnProperty.call(ui,e)}function nl(e){if(!e||typeof e!="object")return!1;let t=e;return Dg(t.key)&&(t.dir==="asc"||t.dir==="desc")}function ku(e){if(typeof e=="number")return Number.isFinite(e)?e:null;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:null}return null}function wu(e,t){switch(t){case"priority":{let n=e.priority;return typeof n=="number"&&Number.isFinite(n)?n:null}case"dependents":{let n=e.dependents_info?e.dependents_info.count:null;return typeof n=="number"&&Number.isFinite(n)?n:null}case"released":{let n=e.release_info?e.release_info.last_released_at:null;return typeof n=="number"&&Number.isFinite(n)?n:null}case"spec":return ho(e).evidence==="published"?1:0;case"created":return ku(e.created_at);case"updated":return ku(e.updated_at);default:return null}}function $u(e,t,n){let r=wu(e,n.key),o=wu(t,n.key);if(r===null||o===null)return r===o?0:r===null?1:-1;if(r===o)return 0;let i=r<o?-1:1;return n.dir==="desc"?-i:i}function Ru(e){let t=Array.isArray(e)?e.filter(nl):[];return(n,r)=>{for(let l of t){let a=$u(n,r,l);if(a!==0)return a}let o=$u(n,r,{key:"created",dir:"asc"});if(o!==0)return o;let i=n.id,s=r.id;return i<s?-1:i>s?1:0}}var Pg=/^(?:[A-Za-z][A-Za-z0-9]*(?:-[A-Za-z0-9]+)+\s+)?(?:Task|Phase|T)\s*(\d+)/i;function xu(e){let t=e&&e.metadata,n=t?t.task_order:void 0;if(n==null||n==="")return Number.POSITIVE_INFINITY;let r=Number(n);return Number.isFinite(r)?r:Number.POSITIVE_INFINITY}function Au(e){let t=e&&e.title;if(typeof t!="string")return Number.POSITIVE_INFINITY;let n=Pg.exec(t);if(!n)return Number.POSITIVE_INFINITY;let r=Number(n[1]);return Number.isFinite(r)?r:Number.POSITIVE_INFINITY}function Ou(e,t){let n=xu(e),r=xu(t);if(n!==r)return n<r?-1:1;let o=Au(e),i=Au(t);if(o!==i)return o<i?-1:1;let s=jn(e&&e.created_at),l=jn(t&&t.created_at);if(s!==l)return s<l?-1:1;let a=e&&e.id,u=t&&t.id;return a===u?0:String(a)<String(u)?-1:1}var tl=2**20;function bo(e,t){let n=e&&e.id;return t&&typeof n=="string"&&Object.prototype.hasOwnProperty.call(t,n)&&typeof t[n]=="number"&&Number.isFinite(t[n])?t[n]:-jn(e&&e.created_at)}function Iu(e){return(t,n)=>{let r=bo(t,e),o=bo(n,e);if(r!==o)return r<o?-1:1;let i=t?.id,s=n?.id;return i<s?-1:i>s?1:0}}function rl(e,t,n){let r=Array.isArray(e)?e:[],o=r.length,i=Math.max(0,Math.min(t,o-1)),s=i-1>=0?r[i-1]:null,l=i+1<o?r[i+1]:null;if(!s&&!l)return{rank:0};if(!s)return{rank:bo(l,n)-tl};if(!l)return{rank:bo(s,n)+tl};let a=bo(s,n),u=bo(l,n),d=(a+u)/2;return a<d&&d<u?{rank:d}:{renormalize:r.map((f,_)=>({bead_id:f.id,rank:_*tl}))}}function ol(e,t={}){let n=Ht(`issue-store:${e}`),r=new Map,o=[],i=0,s=new Set,l=!1,a=t.sort||ns;function u(){for(let _ of Array.from(s))try{_()}catch{}}function d(){o=Array.from(r.values()).sort(a)}function f(_){if(l||!_||_.id!==e)return;let y=Number(_.revision)||0;if(n("apply %s rev=%d",_.type,y),!(y<=i&&_.type!=="snapshot")){if(_.type==="snapshot"){if(y<=i)return;r.clear();let g=Array.isArray(_.issues)?_.issues:[];for(let C of g)C&&typeof C.id=="string"&&C.id.length>0&&r.set(C.id,C);d(),i=y,u();return}if(_.type==="upsert"){let g=_.issue;if(g&&typeof g.id=="string"&&g.id.length>0){let C=r.get(g.id);if(!C)r.set(g.id,g);else{let k=Number.isFinite(C.updated_at)?C.updated_at:0,X=Number.isFinite(g.updated_at)?g.updated_at:0;if(k<=X){for(let ae of Object.keys(C))ae in g||delete C[ae];for(let[ae,H]of Object.entries(g))C[ae]=H}}d()}i=y,u()}else if(_.type==="delete"){let g=String(_.issue_id||"");g&&(r.delete(g),d()),i=y,u()}}}return{id:e,subscribe(_){return s.add(_),()=>{s.delete(_)}},applyPush:f,snapshot(){return o},size(){return r.size},getById(_){return r.get(_)},dispose(){l=!0,r.clear(),o=[],s.clear(),i=0}}}function di(e){let t=String(e.type||"").trim(),n={};if(e.params&&typeof e.params=="object"){let o=Object.keys(e.params).sort();for(let i of o){let s=e.params[i];n[i]=String(s)}}let r=new URLSearchParams(n).toString();return r.length>0?`${t}?${r}`:t}function Lu(e){let t=Ht("subs"),n=new Map,r=new Map;function o(l,a){t("applyDelta %s +%d ~%d -%d",l,(a.added||[]).length,(a.updated||[]).length,(a.removed||[]).length);let u=r.get(l);if(!u||u.size===0)return;let d=Array.isArray(a.added)?a.added:[],f=Array.isArray(a.updated)?a.updated:[],_=Array.isArray(a.removed)?a.removed:[];for(let y of Array.from(u)){let g=n.get(y);if(!g)continue;let C=g.itemsById;for(let k of d)typeof k=="string"&&k.length>0&&C.set(k,!0);for(let k of f)typeof k=="string"&&k.length>0&&C.set(k,!0);for(let k of _)typeof k=="string"&&k.length>0&&C.delete(k)}}async function i(l,a){let u=di(a);if(t("subscribe %s key=%s",l,u),!n.has(l))n.set(l,{key:u,itemsById:new Map});else{let f=n.get(l);if(f&&f.key!==u){let _=r.get(f.key);_&&(_.delete(l),_.size===0&&r.delete(f.key)),n.set(l,{key:u,itemsById:new Map})}}r.has(u)||r.set(u,new Set);let d=r.get(u);d&&d.add(l);try{await e("subscribe-list",{id:l,type:a.type,params:a.params})}catch(f){let _=n.get(l)||null;if(_){let y=r.get(_.key);y&&(y.delete(l),y.size===0&&r.delete(_.key))}throw n.delete(l),f}return async()=>{t("unsubscribe %s key=%s",l,u);try{await e("unsubscribe-list",{id:l})}catch{}let f=n.get(l)||null;if(f){let _=r.get(f.key);_&&(_.delete(l),_.size===0&&r.delete(f.key))}n.delete(l)}}return{subscribeList:i,_applyDelta:o,_subKeyOf:di,selectors:{getIds(l){let a=n.get(l);return a?Array.from(a.itemsById.keys()):[]},has(l,a){let u=n.get(l);return u?u.itemsById.has(a):!1},count(l){let a=n.get(l);return a?a.itemsById.size:0},getItemsById(l){let a=n.get(l),u={};if(!a)return u;for(let d of a.itemsById.keys())u[d]=!0;return u}}}}function Du(){let e=Ht("issue-stores"),t=new Map,n=new Map,r=new Set,o=new Map;function i(){for(let a of Array.from(r))try{a()}catch{}}function s(a,u,d){let f=u?di(u):"",_=n.get(a)||"",y=t.has(a);if(e("register %s key=%s (prev=%s)",a,f,_),y&&_&&f&&_!==f){let g=t.get(a);if(g)try{g.dispose()}catch{}let C=o.get(a);if(C){try{C()}catch{}o.delete(a)}let k=ol(a,d);t.set(a,k);let X=k.subscribe(()=>i());o.set(a,X)}else if(!y){let g=ol(a,d);t.set(a,g);let C=g.subscribe(()=>i());o.set(a,C)}return n.set(a,f),()=>l(a)}function l(a){e("unregister %s",a),n.delete(a);let u=t.get(a);u&&(u.dispose(),t.delete(a));let d=o.get(a);if(d){try{d()}catch{}o.delete(a)}}return{register:s,unregister:l,getStore(a){return t.get(a)||null},snapshotFor(a){let u=t.get(a);return u?u.snapshot().slice():[]},subscribe(a){return r.add(a),()=>r.delete(a)}}}function Pu(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function Mu(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function sl(e,t){return`#/${e==="worker"||e==="monitor"||e==="compare"||e==="adr"?e:"board"}?issue=${encodeURIComponent(t)}`}function Mg(e){let t=String(e||""),n=t.startsWith("#")?t.slice(1):t,r=n.indexOf("?"),o=r>=0?n.slice(r+1):"";if(o){let l=new URLSearchParams(o).get("issue");if(l)return decodeURIComponent(l)}let i=/^\/issue\/([^\s?#]+)/.exec(n);return i&&i[1]?decodeURIComponent(i[1]):null}function Ng(e){let t=String(e||"");return/^#\/worker(\b|\/|$)/.test(t)?"worker":/^#\/monitor(\b|\/|$)/.test(t)?"monitor":/^#\/compare(\b|\/|$)/.test(t)?"compare":/^#\/adr(\b|\/|$)/.test(t)?"adr":"board"}function Nu(e){let t=Ht("router"),n=()=>{let r=window.location.hash||"",o=/^#\/issue\/([^\s?#]+)/.exec(r),i=o&&o[1]?decodeURIComponent(o[1]):Mg(r),s=Ng(r);if(t("hash change \u2192 view=%s id=%s",s,i),e.setState({selected_id:s==="worker"?null:i,view:s,worker:{selected_parent_id:s==="worker"?i:null}}),!!o||/^#\/(issues|epics)(\b|\/|\?|$)/.test(r)){let a=i?`#/${s}?issue=${encodeURIComponent(i)}`:`#/${s}`;window.location.hash!==a&&(window.location.hash=a)}};return{start(){window.addEventListener("hashchange",n),n()},stop(){window.removeEventListener("hashchange",n)},gotoIssue(r){let o=e.getState?e.getState():{view:"board"},i=o.view==="worker"||o.view==="monitor"||o.view==="compare"||o.view==="adr"?o.view:"board",s=sl(i,r);t("goto issue %s (view=%s)",r,i),window.location.hash!==s?window.location.hash=s:e.setState({selected_id:i==="worker"?null:r,view:i,worker:{selected_parent_id:i==="worker"?r:null}})},gotoView(r){let o=e.getState?e.getState():{selected_id:null,worker:{selected_parent_id:null}},i=r==="worker"?o.worker?.selected_parent_id:o.selected_id,s=i?sl(r,i):`#/${r}`;t("goto view %s (id=%s)",r,i||""),window.location.hash!==s?window.location.hash=s:e.setState({view:r,selected_id:r==="worker"?null:o.selected_id})}}}var qg=Object.freeze({workspace_config:{default_workspace:null}});function qu(e){return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:qg.workspace_config.default_workspace}}}function ju(e={}){let t=Ht("state"),n={selected_id:e.selected_id??null,view:e.view??"board",filters:{status:e.filters?.status??"all",search:e.filters?.search??"",type:typeof e.filters?.type=="string"?e.filters?.type:""},board:{closed_filter:e.board?.closed_filter==="3"||e.board?.closed_filter==="7"||e.board?.closed_filter==="today"?e.board?.closed_filter:"today"},worker:{selected_parent_id:e.worker?.selected_parent_id??null,show_closed_children:Array.isArray(e.worker?.show_closed_children)?e.worker.show_closed_children:[]},workspace:{current:e.workspace?.current??null,available:e.workspace?.available??[],hidden:e.workspace?.hidden??[]},config:qu(e.config)},r=new Set;function o(){for(let i of Array.from(r))try{i(n)}catch{}}return{getState(){return n},setState(i){let s={...n,...i,filters:{...n.filters,...i.filters||{}},board:{...n.board,...i.board||{}},worker:{...n.worker,...i.worker||{}},workspace:{current:i.workspace?.current!==void 0?i.workspace.current:n.workspace.current,available:i.workspace?.available!==void 0?i.workspace.available:n.workspace.available,hidden:i.workspace?.hidden!==void 0?i.workspace.hidden:n.workspace.hidden},config:i.config!==void 0?qu(i.config):n.config},l=s.workspace.current?.path!==n.workspace.current?.path||s.workspace.available.length!==n.workspace.available.length||s.workspace.hidden.length!==n.workspace.hidden.length||s.workspace.hidden.some((u,d)=>u!==n.workspace.hidden[d]),a=s.config.workspace_config.default_workspace!==n.config.workspace_config.default_workspace;s.selected_id===n.selected_id&&s.view===n.view&&s.filters.status===n.filters.status&&s.filters.search===n.filters.search&&s.filters.type===n.filters.type&&s.board.closed_filter===n.board.closed_filter&&s.worker.selected_parent_id===n.worker.selected_parent_id&&s.worker.show_closed_children.length===n.worker.show_closed_children.length&&s.worker.show_closed_children.every((u,d)=>u===n.worker.show_closed_children[d])&&!l&&!a||(n=s,t("state change %o",{selected_id:n.selected_id,view:n.view,filters:n.filters,board:n.board,worker:n.worker,workspace:n.workspace.current?.path,config:{default_workspace:n.config.workspace_config.default_workspace}}),o())},subscribe(i){return r.add(i),()=>r.delete(i)}}}function Fu(e){let t=Ht("activity"),n=0,r=new Map,o=1;function i(){if(!e)return;let u=n>0;e.toggleAttribute("hidden",!u),e.setAttribute("aria-busy",u?"true":"false")}function s(){n+=1,t("start count=%d",n),i()}function l(){let u=n;n=Math.max(0,n-1),u<=0?t("done called but count was already %d",u):t("done count=%d\u2192%d",u,n),i()}function a(u){return async(f,_)=>{let y=o++,g=Date.now();r.set(y,{type:f,start_ts:g}),t("request start id=%d type=%s count=%d",y,f,n+1),s();let C=!1,k=()=>{C||(C=!0,r.delete(y),l())},X=setTimeout(()=>{C||(t("request TIMEOUT id=%d type=%s elapsed=%dms",y,f,Date.now()-g),k())},3e4);try{let ae=await u(f,_),H=Date.now()-g;return t("request done id=%d type=%s elapsed=%dms",y,f,H),ae}catch(ae){let H=Date.now()-g;throw t("request error id=%d type=%s elapsed=%dms err=%o",y,f,H,ae),ae}finally{clearTimeout(X),k()}}}return i(),{wrapSend:a,start:s,done:l,getCount:()=>n,getActiveRequests:()=>{let u=Date.now();return Array.from(r.entries()).map(([d,f])=>({id:d,type:f.type,elapsed_ms:u-f.start_ts}))}}}function ye(e,t="info",n=2800){let r=document.createElement("div");r.className="toast",r.textContent=e,r.style.position="fixed",r.style.right="12px",r.style.bottom="12px",r.style.zIndex="1000",r.style.color="#fff",r.style.padding="8px 10px",r.style.borderRadius="4px",r.style.fontSize="12px",t==="success"?r.style.background="#156d36":t==="warning"?r.style.background="#a36a00":t==="error"?r.style.background="#9f2011":r.style.background="rgba(0,0,0,0.85)",(document.body||document.documentElement).appendChild(r),setTimeout(()=>{try{r.remove()}catch{}},n)}var ll="adr:snapshot",Bu=["missing","retired"],Uu=["adr_missing","supersede_unapplied"],Wu="token_missing",il="section_missing",al="usage",jg=["adr_status"];function Fg(e){return typeof e=="string"&&e.startsWith("docs/")}function Bg(e){return new Date(e).toTimeString().slice(0,8)}function Ug(e){let t=e.citations_stale||[],n=e.candidates||[],r=[];for(let u of n)for(let d of u.errors||[])r.push(d);let o=t.filter(u=>Bu.includes(u.kind)),i=r.filter(u=>Uu.includes(u.kind)),s=r.filter(u=>u.kind===Wu),l=r.filter(u=>u.kind===il),a=[...t.filter(u=>!Bu.includes(u.kind)),...r.filter(u=>jg.includes(u.kind)||!Uu.includes(u.kind)&&u.kind!==Wu&&u.kind!==il&&u.kind!==al)];return{current:(e.current||[]).length,drift:!!(e.index_drift&&e.index_drift.ok===!1),citation_stale:o.length,unresolved:i.length,token_missing:s.length,pending:l.length,other:a.length,cross:(e.cross_citations||[]).length}}function Wg(e,t,n){let r=[],o=(e.citations_stale||[]).filter(a=>a.kind==="retired"&&a.adr===t.id);o.length>0&&r.push({key:"cite",text:`\uC778\uC6A9 stale ${o.length}`});let i=0;for(let a of e.candidates||[])for(let u of a.errors||[])u.adr===t.id&&(i+=1);i>0&&r.push({key:"cand",text:`\uD6C4\uBCF4 ${i}`}),(e.frontmatter_errors||[]).filter(a=>a.file===t.file).length>0&&r.push({key:"fm",text:"frontmatter \uC624\uB958"});let l=0;for(let a of n)if(a.root_dir!==e.root_dir)for(let u of a.cross_citations||[])u.adr===t.id&&u.target?.root_dir===e.root_dir&&(l+=1);return l>0&&r.push({key:"cross",text:`\uD53C\uC778\uC6A9 ${l}`}),r}function Hu(e,t){return t?[String(e.id),e.title||"",e.summary||"",e.spec||"",e.bead||""].join(`
`).toLowerCase().includes(t):!0}function Hg(e){return e?{tone:e.status==="accepted"?"ok":"warn",text:e.status}:{tone:"unknown",text:"\uBBF8\uD655\uC778"}}function zu(e,t={}){let n=Ht("views:adr"),r=t.adrStore,o=t.gotoIssue,i=t.getWorkspacePath,s=t.switchWorkspace,l=t.openDoc,a={repo:"",query:"",stale_first:!0},u=null;function d(){let T=r?r.get():null;return T&&Array.isArray(T.workspaces)?T.workspaces:[]}function f(T,S,I){let O=I||T;return!Fg(T)||!l?c`<span class="adr-doc adr-doc--plain">${O}</span>`:c`<button
      type="button"
      class="adr-doc adr-doc--link"
      @click=${()=>l({path:T,missing_state:null},S)}
    >
      ${O}
    </button>`}function _(T,S){return c`<button
      type="button"
      class="adr-bead"
      @click=${async()=>{let I=i?i():void 0;if(s&&S&&S!==I)try{await s(S)}catch(O){n("switch workspace failed: %o",O);return}o&&o(T)}}
    >
      ${T}
    </button>`}function y(T,S){let I=a.query.trim().toLowerCase(),O=(T.current||[]).filter(ce=>Hu(ce,I));if(O.length===0)return c``;let J=O.map(ce=>({adr:ce,chips:Wg(T,ce,S)}));return J.sort((ce,Se)=>{if(a.stale_first){let K=ce.chips.length>0?1:0,te=Se.chips.length>0?1:0;if(K!==te)return te-K}return Se.adr.id-ce.adr.id}),c`
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
            ${J.map(({adr:ce,chips:Se})=>c`
                <tr data-adr=${String(ce.id)}>
                  <td class="adr-num">${ce.id}</td>
                  <td>
                    ${f(`docs/adr/${ce.file}`,T.root_dir,ce.title||ce.file)}
                  </td>
                  <td class="adr-date">${ce.date||""}</td>
                  <td class="adr-summary">${ce.summary||""}</td>
                  <td>${ce.spec?f(ce.spec,T.root_dir):c``}</td>
                  <td>
                    ${ce.bead?_(ce.bead,T.root_dir):c``}
                  </td>
                  <td class="adr-signals">
                    ${Se.map(K=>c`<span class="adr-chip adr-chip--signal"
                          >${K.text}</span
                        >`)}
                  </td>
                </tr>
              `)}
          </tbody>
        </table>
      </div>
    `}function g(T){let S=a.query.trim().toLowerCase(),I=(T.history||[]).filter(O=>Hu(O,S)).slice().sort((O,J)=>J.id-O.id);return I.length===0?c``:c`
      <details class="adr-history">
        <summary>이력 ${I.length}</summary>
        <div class="adr-tablewrap">
          <table class="adr-table adr-table--history">
            <tbody>
              ${I.map(O=>c`
                  <tr data-adr=${String(O.id)}>
                    <td class="adr-num">${O.id}</td>
                    <td>${O.title||O.file}</td>
                    <td class="adr-status">${O.status}</td>
                    <td class="adr-superseded">
                      ${O.superseded_by===null||O.superseded_by===void 0?"":`\u2192 ${O.superseded_by}`}
                    </td>
                  </tr>
                `)}
            </tbody>
          </table>
        </div>
      </details>
    `}function C(T){return c`<p class="adr-env">환경 · ${T}</p>`}function k(T){let S=T.env_errors?.index;if(S)return c`<section class="adr-sec adr-sec--drift">
        ${C(S)}
      </section>`;let I=T.index_drift;return!I||I.ok!==!1?c``:c`<section class="adr-sec adr-sec--drift">
      <h3>인덱스 drift</h3>
      <p class="adr-drift">${I.detail||"\uC778\uB371\uC2A4\uAC00 ADR\uACFC \uC5B4\uAE0B\uB09C\uB2E4"}</p>
    </section>`}function X(T){let S=T.env_errors?.citations;if(S)return c`<section class="adr-sec adr-sec--cite">
        ${C(S)}
      </section>`;let I=T.citations_stale||[];return I.length===0?c``:c`<section class="adr-sec adr-sec--cite">
      <h3>지침 인용 stale ${I.length}</h3>
      <ul class="adr-rows">
        ${I.map(O=>c`
            <li class="adr-row">
              ${f(O.file,T.root_dir,`${O.file}${O.line===null||O.line===void 0?"":`:${O.line}`}`)}
              <span class="adr-row__mid"
                >${O.adr===null||O.adr===void 0?"":`ADR ${O.adr}`}</span
              >
              <span class="adr-chip adr-chip--kind">${O.kind}</span>
              <span class="adr-row__detail">${O.detail||""}</span>
            </li>
          `)}
      </ul>
    </section>`}function ae(T){let S=T.env_errors?.candidates;if(S)return c`<section class="adr-sec adr-sec--cand">
        ${C(S)}
      </section>`;let I=(T.candidates||[]).filter(ce=>(ce.errors||[]).length>0),O=[],J=[];for(let ce of I){let Se=ce.errors||[],K=Se.filter(fe=>fe.kind!==il&&fe.kind!==al),te=Se.some(fe=>fe.kind===al);if(K.length===0&&!te){J.push(ce.spec);continue}O.push({spec:ce.spec,errors:K,env:te})}return O.length===0&&J.length===0?c``:c`<section class="adr-sec adr-sec--cand">
      <h3>후보 미실체화</h3>
      ${O.map(ce=>c`
          <div class="adr-candspec" data-spec=${ce.spec}>
            <div class="adr-candspec__hd">
              ${f(ce.spec,T.root_dir)}
              ${ce.env?c`<span class="adr-chip adr-chip--env">환경</span>`:c``}
            </div>
            <ul class="adr-rows">
              ${ce.errors.map(Se=>c`
                  <li class="adr-row">
                    <span class="adr-chip adr-chip--kind">${Se.kind}</span>
                    <span class="adr-row__mid"
                      >${Se.adr===null||Se.adr===void 0?"":`ADR ${Se.adr}`}</span
                    >
                    <span class="adr-row__detail">${Se.detail||""}</span>
                  </li>
                `)}
            </ul>
          </div>
        `)}
      ${J.length>0?c`<details class="adr-pending">
            <summary>이행 전 스펙 ${J.length}</summary>
            <ul class="adr-rows">
              ${J.map(ce=>c`<li class="adr-row">${f(ce,T.root_dir)}</li>`)}
            </ul>
          </details>`:c``}
    </section>`}function H(T){let S=T.cross_citations||[];return S.length===0?c``:c`<section class="adr-sec adr-sec--cross">
      <h3>교차 인용 ${S.length}</h3>
      <ul class="adr-rows">
        ${S.map(I=>{let O=Hg(I.target);return c`
            <li class="adr-row">
              ${f(I.file,T.root_dir,`${I.file}:${I.line}`)}
              <span class="adr-row__mid"
                >→ ADR ${I.repo}/${String(I.adr).padStart(4,"0")}</span
              >
              <span class="adr-chip adr-chip--cross is-${O.tone}"
                >${O.text}</span
              >
            </li>
          `})}
      </ul>
    </section>`}function N(T){let S=Ug(T),I=[];return S.current>0&&I.push({key:"current",text:`\uD604\uC7AC \uC720\uD6A8 ${S.current}`}),S.drift&&I.push({key:"drift",text:"\uC778\uB371\uC2A4 drift"}),S.citation_stale>0&&I.push({key:"cite",text:`\uC778\uC6A9 stale ${S.citation_stale}`}),S.unresolved>0&&I.push({key:"cand",text:`\uD6C4\uBCF4 \uBBF8\uC2E4\uCCB4\uD654 ${S.unresolved}`}),S.token_missing>0&&I.push({key:"token",text:`\uD1A0\uD070 \uC5C6\uC74C ${S.token_missing}`}),S.pending>0&&I.push({key:"pending",text:`\uC774\uD589 \uC804 \uC2A4\uD399 ${S.pending}`}),S.other>0&&I.push({key:"other",text:`\uAE30\uD0C0 ${S.other}`}),S.cross>0&&I.push({key:"cross",text:`\uAD50\uCC28 \uC778\uC6A9 ${S.cross}`}),T.computing?I.push({key:"computing",text:"\uACC4\uC0B0 \uC911"}):typeof T.computed_at=="number"&&T.computed_at>0&&I.push({key:"computed",text:`\uAC31\uC2E0 ${Bg(T.computed_at)}`}),c`<div class="adr-counts">
      ${I.map(O=>c`<span class="adr-chip adr-chip--count adr-count--${O.key}"
            >${O.text}</span
          >`)}
    </div>`}function P(T,S){let I=T.adr_dir_missing===!0;return c`
      <section class="adr-ws" data-repo=${T.root_dir}>
        <header class="adr-ws__hd">
          <h2>${T.name}</h2>
          ${T.name_duplicate?c`<span class="adr-chip adr-chip--dup">이름 중복</span>`:c``}
        </header>
        ${N(T)} ${y(T,S)} ${g(T)}
        ${I?c``:k(T)}
        ${I?c``:X(T)}
        ${I?c``:ae(T)}
        ${I?c``:H(T)}
      </section>
    `}function j(T){return c`
      <div class="adr-toolbar">
        <div class="adr-filters" role="group" aria-label="저장소 필터">
          <button
            type="button"
            class="adr-filter"
            aria-pressed=${a.repo===""?"true":"false"}
            @click=${()=>{a.repo="",W()}}
          >
            전체
          </button>
          ${T.map(S=>c`
              <button
                type="button"
                class="adr-filter"
                data-repo=${S.root_dir}
                aria-pressed=${a.repo===S.root_dir?"true":"false"}
                @click=${()=>{a.repo=S.root_dir,W()}}
              >
                ${S.name}
              </button>
            `)}
        </div>
        <input
          type="search"
          class="adr-search"
          placeholder="번호·제목·summary·spec·bead"
          aria-label="ADR 검색"
          .value=${a.query}
          @input=${S=>{a.query=S.target.value,W()}}
        />
        <button
          type="button"
          class="adr-sort"
          aria-pressed=${a.stale_first?"true":"false"}
          @click=${()=>{a.stale_first=!a.stale_first,W()}}
        >
          stale 우선
        </button>
      </div>
    `}function B(){let T=d(),S=a.repo?T.filter(I=>I.root_dir===a.repo):T;return c`
      ${j(T)}
      <div class="adr-body">
        ${S.map(I=>P(I,T))}
      </div>
    `}function W(){lt(B(),e)}return W(),r&&typeof r.subscribe=="function"&&(u=r.subscribe(()=>W())),{destroy(){u&&(u(),u=null),lt(c``,e)}}}function yo(e=void 0,t=void 0){function n(){if(!t||typeof t.get!="function")return null;let i=t.get();return i&&i.order?i.order:{}}function r(i,s,l){let a=e&&e.snapshotFor?e.snapshotFor(i).slice():[];if(s==="closed")return a.sort(Cu),a;switch(l){case"created_desc":return a.sort(ns),a;case"created_asc":return a.sort(Su),a;case"updated_desc":return a.sort(Eu),a;case"priority":return a.sort(Tu),a;case"manual":default:{let u=n();return u?a.sort(Iu(u)):a.sort(ns),a}}}function o(i){let s=[];return e&&typeof e.subscribe=="function"&&s.push(e.subscribe(i)),t&&typeof t.subscribe=="function"&&s.push(t.subscribe(i)),()=>{for(let l of s)try{l()}catch{}}}return{selectBoardColumn:r,subscribe:o}}function kr(e){if(!e)return null;if(typeof e=="number")return Number.isFinite(e)?e:null;let t=Date.parse(e);return Number.isFinite(t)?t:null}function rn(e){let t=kr(e);if(t===null)return"";let n=new Date(t),r=o=>String(o).padStart(2,"0");return`${n.getFullYear()}-${r(n.getMonth()+1)}-${r(n.getDate())} ${r(n.getHours())}:${r(n.getMinutes())}`}function wn(e,t){let n=kr(e);if(n===null)return"";let o=(typeof t=="number"?t:Date.now())-n;if(o<6e4)return"\uBC29\uAE08";let i=Math.floor(o/6e4);if(i<60)return`${i}\uBD84 \uC804`;let s=Math.floor(o/36e5);if(s<24)return`${s}\uC2DC\uAC04 \uC804`;let l=Math.floor(o/864e5);if(l<7)return`${l}\uC77C \uC804`;let a=Math.floor(l/7);if(l<30)return`${a}\uC8FC \uC804`;let u=Math.floor(l/30);return u<12?`${u}\uAC1C\uC6D4 \uC804`:`${Math.floor(l/365)}\uB144 \uC804`}function Ku(e){if(!Array.isArray(e))return null;let t=null,n=-1;for(let r of e){if(!r||r.status!=="in_progress")continue;let o=kr(r.updated_at)??0;if(t===null||o>n){t=r,n=o;continue}o===n&&String(r.id)<String(t.id)&&(t=r)}return t}function pi(e){let t=e&&e.parent;return typeof t=="string"?t:t&&t.id?String(t.id):""}function fi(e){let t=new Map;for(let r of e)r&&r.id&&!t.has(r.id)&&t.set(r.id,r);let n=new Map;for(let r of t.values()){let o=pi(r);if(!o)continue;let i=n.get(o);i||(i=[],n.set(o,i)),i.push({id:r.id,title:r.title,status:r.status,metadata:r.metadata,workflow:r.workflow,created_at:r.created_at,updated_at:r.updated_at})}return n}function _i(e,t){let n=e.get(t)||[],r=0;for(let i of n)(i.status==="resolved"||i.status==="closed")&&(r+=1);let o=Ku(n);return{total:n.length,count:r,current:o,children:n}}function vo(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function cl(e,t){return!t||typeof e!="string"||e.length===0||vo(t.visible_labels).includes(e)?!0:vo(t.hidden_labels).includes(e)?!1:!vo(t.hidden_prefixes).some(n=>n.length>0&&e.startsWith(n))}function Gu(e,t){return vo(e).filter(n=>cl(n,t))}function wr(e,t){let n=e&&e.chips?e.chips[t]:void 0;return typeof n=="boolean"?n:!0}var Vu="bench";function Yu(e){let t=e&&typeof e=="object"?e.labels:null;return vo(t).includes(Vu)}function Qu(e){return!!e&&vo(e.visible_labels).includes(Vu)}function Xu(e){let t=e.transport,n=e.uiOrderStore;function r(s,l){return"renormalize"in s?s.renormalize:[{bead_id:l,rank:s.rank}]}function o(s,l){let a={...s.order};for(let u of l)a[u.bead_id]=u.rank;n&&n.set({revision:s.revision,order:a})}async function i(s,l,a){if(!t||!n)return;let u=n.get()||{revision:0,order:{}},d=r(rl(l,a,u.order),s);o(u,d);let f=await t("ui-order-set",{expected_revision:u.revision,entries:d});if(f&&f.conflict){let _={revision:typeof f.revision=="number"?f.revision:0,order:f.order||{}};n.set(_);let y=r(rl(l,a,_.order),s);o(_,y);let g=await t("ui-order-set",{expected_revision:_.revision,entries:y});g&&g.applied&&n.set({revision:typeof g.revision=="number"?g.revision:0,order:g.order||{}})}else f&&f.applied&&n.set({revision:typeof f.revision=="number"?f.revision:0,order:f.order||{}})}return{applyReorder:i}}function Zu(e){if(typeof e!="string")return"";let t=e.indexOf("-");return t>0?e.slice(0,t):""}function Xn(e,t){let n=Zu(e),r=Zu(t);return n.length===0||r.length===0?!1:n!==r}function zg(e){switch(e){case"in_progress":return"board-card__dot board-card__dot--progress";case"resolved":return"board-card__dot board-card__dot--resolved";case"closed":return"board-card__dot board-card__dot--closed";case"blocked":return"board-card__dot board-card__dot--blocked";default:return"board-card__dot"}}function Kg(e,t,n,r,o){return c`<button
    type="button"
    class="board-card__roll-toggle"
    data-roll-parent=${e}
    aria-expanded=${r?"true":"false"}
    @click=${o}
  >
    children ${t}/${n} ${r?"\u25B4":"\u25BE"}
  </button>`}function Gg(e,t,n,r){return c`<button
    type="button"
    class="board-card__roll-child"
    data-child-id=${e.id}
    @click=${r?o=>r(o,e.id):void 0}
  >
    <span class=${zg(e.status)}>●</span>
    <span class="board-card__roll-child-ord">${t}</span>
    <span class="board-card__roll-child-title">${e.title||e.id}</span>
    ${n}
  </button>`}function mi(e,t){let n=e.total||0,r=!!t.expanded,o=t.trailing??"",i=typeof t.empty_label=="string"&&t.empty_label.length>0?t.empty_label:null;if(n===0&&i===null)return"";let s=Array.isArray(e.children)?e.children:[],l=n>0?s.slice().sort(Ou):s;return c`
    <div class="board-card__roll">
      <div class="board-card__roll-meta">
        ${n>0?Kg(t.parent_id,e.count,n,r,t.onToggle):c`<span class="board-card__roll-none">${i}</span>`}
        ${o}
      </div>
      ${n>0&&e.current?c`<div class="board-card__roll-current">
            └
            <span class="board-card__cur-child"
              >● ${e.current.title||e.current.id}</span
            >
          </div>`:""}
      ${r&&n>0?c`<div class="board-card__roll-list">
            ${l.map((a,u)=>Gg(a,u+1,t.childChips?t.childChips(a):null,t.onChildClick))}
          </div>`:""}
    </div>
  `}var Vg={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"mrg",close:"mrg"},ed={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"merge",close:"close"},Ju={quick_fix:["impl","close"],spec_backed:["spec","impl","pr","merge"],full_plan:["spec","plan","impl","pr","merge"]},Yg={review:"\u2713",skip:"\u2298"},$r={none:"\uBBF8\uB3C4\uB2EC",dim:"\uC9C4\uD589 \uC911",stale:"\uC7AC\uAC80\uD1A0 \uD544\uC694",review:"\uAC80\uD1A0 \uC644\uB8CC",skip:"\uAC80\uD1A0 \uC0DD\uB7B5",done:"\uC644\uB8CC"};function Qg(e,t,n){if(!(n==="in_progress"||n==="resolved"))return null;for(let o of e){let i=t[o];if(i&&i.fill==="dim"&&i.stale!==!0)return o}return null}function td(e){let t=e&&e.fill||"none";return t==="none"?$r.none:e&&e.stale===!0?$r.stale:t==="dim"?$r.dim:e&&e.glyph==="review"?$r.review:e&&e.glyph==="skip"?$r.skip:$r.done}function Xg(e){if(!e||e.fill==="none"||!e.approval_state)return td(e);let t=[];return e.glyph==="review"?t.push($r.review):e.glyph==="skip"&&t.push($r.skip),e.approval_state==="missing"?t.push("\uC2B9\uC778 \uD544\uC694"):e.approval_state==="stale"?t.push("\uC7AC\uC2B9\uC778 \uD544\uC694"):e.approval_state==="unknown"?t.push("\uC2B9\uC778 \uD655\uC778 \uBD88\uAC00"):t.push("\uC2B9\uC778 \uC644\uB8CC"),t.join(" \xB7 ")}function Zg(e,t,n,r){let o=Vg[e]||e,i=t&&t.fill||"none",s=!!t&&t.stale===!0,l=Yg[t&&t.glyph||""]||"",a="bar";i==="dim"?a+=` b-${o} dim`:i==="full"&&(a+=` b-${o} full`),s&&(a+=" stale"),n&&(a+=" cur");let u=i==="none"?"lbl":`lbl l-${o} on`,d=n?`color: var(--stage-${o}-on)`:"",f=ed[e]||e,_=r?nd(t):null;if(!_)return c`
      <div class="seg">
        <div class=${a} style=${d}>${l}</div>
        <div class=${u}>${f}</div>
      </div>
    `;let y=`${f} \uBB38\uC11C \uC5F4\uAE30 \xB7 ${_.path}`;return c`
    <button
      type="button"
      class="seg seg--doc"
      aria-label=${y}
      title=${y}
      @click=${g=>{g.preventDefault(),g.stopPropagation(),r(g,_,e)}}
    >
      <div class=${a} style=${d}>${l}</div>
      <div class=${u}>${f}</div>
    </button>
  `}function nd(e){let t=e?e.doc:null;return!t||typeof t.path!="string"||t.path.length===0?null:t}function gi(e,t,n={}){if(!e||!e.stages)return"";let r=n.onOpenDoc,o=Ju[e.route]||Ju.spec_backed,i=e.stages,s=Qg(o,i,String(t||"open")),l=`\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uC9C4\uD589: ${o.map(u=>`${ed[u]||u} ${u==="plan"?Xg(i[u]||{}):td(i[u]||{})}`).join(" \xB7 ")}`,a=!!r&&o.some(u=>nd(i[u]||{})!==null);return c`
    <div
      class="stp"
      role=${a?"group":"img"}
      aria-label=${l}
    >
      ${o.map(u=>Zg(u,i[u]||{},u===s,r))}
    </div>
  `}function Jg(e){return typeof e!="number"||!Number.isFinite(e)?"":`P${Math.max(0,Math.min(4,e))}`}var rd=2;function od(e){let t=e.slice(0,rd).join(", "),n=e.length-rd;return`\u26D3 blocked: ${t}${n>0?` +${n}`:""}`}function eh(e,t){if(!t)return[];let n=[],r=Array.isArray(t.blockers)?t.blockers:[],o=[],i=[];for(let s of r)(Xn(e,s)?i:o).push(s);return o.length>0&&n.push(c`<span class="ctl-chip ctl-chip--blocked-dep"
        >${od(o)}</span
      >`),i.length>0&&n.push(c`<span class="ctl-chip ctl-chip--blocked-foreign"
        >${od(i)}</span
      >`),n}function th(e){if(!e||typeof e!="object")return null;let t=e.awaiting_user;if(typeof t!="string")return null;let n=t.trim();return n.length===0?null:c`<span class="ctl-chip ctl-chip--blocked"
    >${`\u23F8 \uC0AC\uC6A9\uC790 \uB9AC\uBDF0 \uD544\uC694: ${n}`}</span
  >`}function ul(e){return e==="delegated"?"\uC704\uC784":e==="main"?"\uBA54\uC778":null}function hi(e){return e.effort?`${e.actor}:${e.effort}`:e.actor}function lr(e){return`${e.kind}:${hi(e)}@${e.sha}`}function bi(e,t){if(!e)return null;let n=ul(e.kind),r=e.reason,o=e.kind==="delegated"?r===null:typeof r=="string"&&r.trim().length>0&&!/[\r\n]/.test(r);if(!n||!o)return null;let i=ul(t?.kind),s=i!==null&&t?.kind!==e.kind,l=`\uACC4\uD68D \xB7 ${n}${s?` \u2192 ${i}`:""}`,a=`planned_execution ${e.kind}${typeof r=="string"?`:${r}`:""}`,u=t?` \xB7 exec_receipt ${lr(t)}`:"";return{kind:e.kind,label:l,title:`${a}${u}`}}function sd(e,t){let n=bi(e,t);return n?c`<span
        class="ctl-chip ctl-chip--planned"
        data-kind=${n.kind}
        title=${n.title}
        >${n.label}</span
      >`:null}function nh(e){if(!e)return null;let t=ul(e.kind);return t?c`<span
    class="ctl-chip ctl-chip--exec-receipt"
    title=${`exec_receipt ${lr(e)}`}
    >${`\uC2E4\uD589 \xB7 ${t}`}</span
  >`:null}function rh(e,t){let n=t.policy||null,r=e.workflow&&e.workflow.chips||{},o=[];if(r.route&&wr(n,"route")){let l=r.route_source==="derived";o.push(c`<span
        class="ctl-chip ctl-chip--route${l?" is-derived":""}"
        title=${l?"route \uBBF8\uD540 (metadata unset)":"route"}
        >${l?"unset":r.route}</span
      >`)}if(r.fast_track&&wr(n,"fast_track")&&o.push(c`<span class="ctl-chip ctl-chip--ft">⚡ fast_track</span>`),r.pr&&wr(n,"pr")){let l=r.pr.number;o.push(c`<span class="ctl-chip ctl-chip--pr"
        >${`PR${l!=null?` #${l}`:""}`}</span
      >`)}let i=sd(r.planned_execution,r.exec_receipt);if(i&&o.push(i),r.exec_receipt){let l=r.exec_receipt;o.push(c`<span
        class="ctl-chip ctl-chip--exec-receipt"
        title=${`exec_receipt ${lr(l)}`}
        >${`exec ${l.kind==="delegated"?hi(l):`main:${l.actor}`} \xB7 ${l.sha.slice(0,7)}`}</span
      >`)}if(r.impl_entry){let l=r.impl_entry;o.push(c`<span
        class="ctl-chip ctl-chip--impl-entry"
        title=${`impl_entry ${l.actor}@${l.sha}`}
        >${`impl ${l.actor} \xB7 ${l.sha.slice(0,7)}`}</span
      >`)}for(let l of Gu(e.labels,n))o.push(c`<span class="ctl-chip ctl-chip--label">${l}</span>`);if(e.from_id&&wr(n,"from")&&o.push(c`<button
        type="button"
        class="ctl-chip ctl-chip--from"
        title=${`\uCD9C\uCC98 ${e.from_id} \uC5F4\uAE30`}
        @click=${l=>{l.stopPropagation(),t.onFromChipClick&&t.onFromChipClick(l,String(e.from_id))}}
      >
        ↩ from ${e.from_id}
      </button>`),wr(n,"blocked")){let l=th(e.metadata);l&&o.push(l),o.push(...eh(e.id,e.blocked_info))}return t.cleanupFailureFor&&t.cleanupFailureFor(e.id)&&wr(n,"blocked")&&o.push(c`<span class="ctl-chip ctl-chip--cleanup">⚠ 정리 멈춤</span>`),o.length===0?"":c`<div class="board-card__chips">${o}</div>`}function oh(e){let t=wn(e.created_at),n=wn(e.updated_at);return!t&&!n?"":c`<span class="board-card__times">
    ${t?c`<span
          class="board-card__time"
          title=${`\uC0DD\uC131 ${rn(e.created_at)}`}
          >생성 ${t}</span
        >`:""}
    ${t&&n?c`<span class="board-card__time-sep">·</span>`:""}
    ${n?c`<span
          class="board-card__time"
          title=${`\uC218\uC815 ${rn(e.updated_at)}`}
          >수정 ${n}</span
        >`:""}
  </span>`}function sh(e,t){let n=t.rollupFor?t.rollupFor(e.id):{total:0,count:0,current:null,children:[]};return mi(n,{parent_id:e.id,expanded:t.isExpanded?t.isExpanded(e.id):!0,trailing:oh(e),empty_label:"children \uC5C6\uC74C",childChips:dl,onToggle:r=>t.onRollupToggle&&t.onRollupToggle(r,e.id),onChildClick:(r,o)=>t.onChildClick&&t.onChildClick(r,o)})}function dl(e){let t=e?.workflow?.chips?.planned_execution,n=e?.workflow?.chips?.exec_receipt;return bi(t,n)?c`<span class="board-card__roll-child-chips">
    ${sd(t,n)}
    ${nh(n)}
  </span>`:null}function yi(e,t){let n=Jg(e.priority);return c`
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
      ${rh(e,t)}
      ${e.workflow&&wr(t.policy||null,"stepper")?gi(e.workflow,e.status,{onOpenDoc:t.onOpenDoc}):""}
      ${sh(e,t)}
    </article>
  `}function ko(e,t){let n=Array.isArray(e.items)?e.items.length:0,r=e.is_closed===!0;return c`
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
              ${ai.map(i=>c`<option
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
        ${e.items.map(i=>yi(i,t))}
      </div>
    </section>
  `}function id(e,t,n){return c`
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
          ${e.items.length===0?c`<div class="deferred-popup__empty">Deferred 이슈 없음</div>`:e.items.map(r=>yi(r,t))}
        </div>
      </div>
    </dialog>
  `}var ih=[{value:"",label:"\uC6B0\uC120\uC21C\uC704"},{value:"0",label:"P0"},{value:"1",label:"P1"},{value:"2",label:"P2"},{value:"3",label:"P3"},{value:"4",label:"P4"}],ah=[{value:"",label:"\uD0C0\uC785"},{value:"bug",label:"bug"},{value:"feature",label:"feature"},{value:"task",label:"task"},{value:"epic",label:"epic"},{value:"chore",label:"chore"}],lh=[{value:"created_desc",label:"\uC0DD\uC131 \uCD5C\uC2E0\uC21C"},{value:"created_asc",label:"\uC0DD\uC131 \uC624\uB798\uB41C\uC21C"},{value:"updated_desc",label:"\uC218\uC815 \uCD5C\uC2E0\uC21C"},{value:"priority",label:"\uC6B0\uC120\uC21C\uC704\uC21C"},{value:"manual",label:"\uC218\uB3D9(\uB4DC\uB798\uADF8)"}];function ch(e,t,n){let r=e.labels.length,o=r>0?`\uB77C\uBCA8 ${r}`:"\uB77C\uBCA8";return c`
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
  `}function ad(e,t,n){return c`
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
        ${ih.map(r=>c`<option
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
        ${ah.map(r=>c`<option
              value=${r.value}
              ?selected=${e.type===r.value}
            >
              ${r.label}
            </option>`)}
      </select>
      ${ch(e,t,n)}
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
        ${lh.map(r=>c`<option
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
  `}var uh=200,dh={"ready-col":"open","in-progress-col":"in_progress","resolved-col":"resolved","closed-col":"closed"},ph=new Set(["blocked-col","ready-col","in-progress-col","resolved-col"]),ld="beads-ui.board.sort",cd=new Set(["created_desc","created_asc","updated_desc","priority","manual"]);function fh(){try{let e=window.localStorage.getItem(ld);if(e&&cd.has(e))return e}catch{}return"created_desc"}function ud(e,t){let n=Ht("views:board"),r=t.gotoIssue,o=t.issueStores,i=t.transport,s=t.uiOrderStore,l=t.displayPolicyStore,a=t.workerQueueStore,u=t.onClosedRangeChange,d=t.onNewIssue,f=t.openDoc,_=t.closedRange||ii,y=o?yo(o,s):null,g=Xu({transport:i,uiOrderStore:s}),C=[],k=[],X=[],ae=[],H=[],N=[],P=!1,j=0,B=fh(),W=new Map,T=new Map,S=new Map,I=new Set,O={search:"",priority:"",type:"",labels:[]},J=!1,ce=null;function Se(pe){return String(pe.status||"open")==="open"}function K(pe){return String(pe.status||"open")==="open"}function te(pe){let $e=O.search.trim().toLowerCase(),Qe=O.priority,ht=O.type,st=O.labels,ut=Qu(Q());return pe.filter(vt=>{if(!ut&&Yu(vt))return!1;if($e){let tt=String(vt.id||"").toLowerCase(),Be=String(vt.title||"").toLowerCase();if(!tt.includes($e)&&!Be.includes($e))return!1}if(Qe!==""&&String(vt.priority)!==Qe||ht!==""&&String(vt.issue_type||"")!==ht)return!1;if(st.length>0){let tt=Array.isArray(vt.labels)?vt.labels:[];if(!st.some(Be=>tt.includes(Be)))return!1}return!0})}function fe(){let pe=new Set;for(let $e of[C,k,X,ae,H,N])for(let Qe of $e){let ht=Array.isArray(Qe.labels)?Qe.labels:[];for(let st of ht)typeof st=="string"&&st.length>0&&pe.add(st)}return Array.from(pe).sort()}function Re(){return O.search.trim()!==""||O.priority!==""||O.type!==""||O.labels.length>0}function V(){try{if(y){let pe=y.selectBoardColumn("tab:board:in-progress","in_progress",B),$e=y.selectBoardColumn("tab:board:blocked","blocked",B).filter(K),Qe=new Set(pe.map(U=>U.id)),ht=y.selectBoardColumn("tab:board:ready","ready",B).filter(U=>Se(U)&&!Qe.has(U.id)),st=y.selectBoardColumn("tab:board:resolved","resolved",B),ut=y.selectBoardColumn("tab:board:deferred","deferred",B),vt=y.selectBoardColumn("tab:board:closed","closed").slice(0,uh),tt=[...$e,...ht,...pe,...st,...vt];le(tt);let Be=new Set;for(let U of tt)U&&U.id&&!pi(U)&&Be.add(U.id);let E=!Re();C=E?rs($e,Be):$e,k=E?rs(ht,Be):ht,X=E?rs(pe,Be):pe,ae=E?rs(st,Be):st,H=ut,j=ut.length,N=E?rs(vt,Be):vt,W=new Map;for(let U of C)W.set(U.id,"open");for(let U of k)W.set(U.id,"open");for(let U of X)W.set(U.id,"in_progress");for(let U of ae)W.set(U.id,"resolved");for(let U of H)W.set(U.id,"deferred");for(let U of N)W.set(U.id,"closed");T=new Map;for(let U of C)T.set(U.id,"blocked-col");for(let U of k)T.set(U.id,"ready-col");for(let U of X)T.set(U.id,"in-progress-col");for(let U of ae)T.set(U.id,"resolved-col");for(let U of N)T.set(U.id,"closed-col")}rt()}catch{C=[],k=[],X=[],ae=[],H=[],N=[],S=new Map,rt()}}function le(pe){S=fi(pe)}function ee(pe){return _i(S,pe)}function M(pe){return!I.has(pe)}function oe(pe,$e){pe.preventDefault(),pe.stopPropagation(),I.has($e)?I.delete($e):I.add($e),rt()}function se(pe,$e){pe.preventDefault(),pe.stopPropagation(),r($e)}function he(pe,$e){pe.preventDefault(),pe.stopPropagation(),r($e)}function xe(pe,$e){ce||r($e)}function Ze(pe,$e){pe.preventDefault(),pe.stopPropagation(),_h($e).then(Qe=>{Qe&&ye("\uBCF5\uC0AC\uB428","success",1200)})}function G(pe,$e){ce=$e,pe.dataTransfer&&(pe.dataTransfer.setData("text/plain",$e),pe.dataTransfer.effectAllowed="move"),pe.target.classList.add("board-card--dragging")}function ge(pe){pe.target.classList.remove("board-card--dragging"),Ne(),setTimeout(()=>{ce=null},0)}function ue(pe){let $e=String(pe.target.value||"");!$e||$e===_||(_=$e,u&&u($e),rt())}function Q(){return l?l.get():null}function Ee(pe){let $e=a?a.get():null,Qe=$e?$e.cleanup_failed:null;if(!Qe||typeof Qe!="object"||Array.isArray(Qe))return null;let ht=Qe[pe];return!ht||typeof ht!="object"||Array.isArray(ht)?null:ht}let be={onCardClick:xe,onCopyId:Ze,onDragStart:G,onDragEnd:ge,onClosedRangeChange:ue,rollupFor:ee,isExpanded:M,onRollupToggle:oe,onChildClick:se,onFromChipClick:he,onOpenDoc:f?(pe,$e)=>f($e):void 0,cleanupFailureFor:Ee,get policy(){return Q()}};function Le(pe,$e){ce||(Ye(),r($e))}function qe(pe,$e){pe.preventDefault(),pe.stopPropagation(),Ye(),r($e)}let Je={...be,onCardClick:Le,onChildClick:qe,onFromChipClick:qe,onOpenDoc:f?(pe,$e)=>{Ye(),f($e)}:void 0,get policy(){return Q()}};function He(pe){let $e=pe.target,Qe=e.querySelector(".board-filter__labels");$e&&Qe&&Qe.contains($e)||Oe()}function ie(pe){pe.key==="Escape"&&Oe()}function Z(){J||(J=!0,document.addEventListener("mousedown",He),document.addEventListener("keydown",ie),rt())}function Oe(){J&&(J=!1,document.removeEventListener("mousedown",He),document.removeEventListener("keydown",ie),rt())}function nt(pe){pe.key==="Escape"&&Ye()}function pt(){P||(P=!0,document.addEventListener("keydown",nt),rt())}function Ye(){P&&(P=!1,document.removeEventListener("keydown",nt),rt())}let _t={onClose:Ye,onOverlayClick(pe){pe.target===pe.currentTarget&&Ye()}},Pt={onSearchInput(pe){O.search=String(pe.target.value||""),V()},onPriorityChange(pe){O.priority=String(pe.target.value||""),V()},onTypeChange(pe){O.type=String(pe.target.value||""),V()},onSortChange(pe){let $e=String(pe.target.value||"");if(!(!cd.has($e)||$e===B)){B=$e;try{window.localStorage.setItem(ld,$e)}catch{}V()}},onDeferredToggle(){P?Ye():pt()},onLabelMenuToggle(){J?Oe():Z()},onLabelToggle(pe){let $e=O.labels.indexOf(pe);$e===-1?O.labels.push(pe):O.labels.splice($e,1),V()},onLabelClear(){O.labels.length!==0&&(O.labels=[],V())},onNewIssue(){d&&d()}};function Et(){return c`
      <div class="board-view">
        ${ad(O,Pt,{sort_mode:B,deferred_popup_open:P,deferred_count:j,label_options:fe(),label_menu_open:J})}
        <div class="board-root">
          ${ko({title:"Blocked",id:"blocked-col",items:te(C)},be)}
          ${ko({title:"Ready",id:"ready-col",items:te(k)},be)}
          ${ko({title:"In progress",id:"in-progress-col",items:te(X)},be)}
          ${ko({title:"Resolved",id:"resolved-col",items:te(ae)},be)}
          ${ko({title:"Closed",id:"closed-col",items:te(N),is_closed:!0,closed_range:_},be)}
        </div>
        ${P?id({items:te(H),count:j},Je,_t):""}
      </div>
    `}function rt(){lt(Et(),e),gt()}function gt(){try{let pe=e.querySelector("#deferred-popup");pe&&!pe.open&&(typeof pe.showModal=="function"?pe.showModal():pe.setAttribute("open",""));let $e=Array.from(e.querySelectorAll(".board-column, .deferred-popup__body"));for(let Qe of $e)Array.from(Qe.querySelectorAll(".board-card")).forEach((st,ut)=>{st.tabIndex=ut===0?0:-1})}catch{}}async function Zt(pe,$e){if(!i){ye("\uC5F0\uACB0\uB418\uC9C0 \uC54A\uC544 \uC0C1\uD0DC\uB97C \uBCC0\uACBD\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error");return}try{await i("update-status",{id:pe,status:$e}),ye("\uC0C1\uD0DC \uBCC0\uACBD\uB428","success",1500)}catch(Qe){n("update-status failed: %o",Qe),ye("\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328","error")}}function x(pe){switch(pe){case"blocked-col":return C;case"ready-col":return k;case"in-progress-col":return X;case"resolved-col":return ae;default:return[]}}function re(pe,$e,Qe){if(!i||!s)return;let ht=x(pe),st=ht.find(E=>E.id===$e);if(!st)return;let ut=ht.filter(E=>E.id!==$e),vt=Qe.closest?Qe.closest(".board-card"):null,tt=ut.length;if(vt){let E=vt.getAttribute("data-issue-id");if(E===$e)return;let U=ut.findIndex(z=>z.id===E);U>=0&&(tt=U)}let Be=ut.slice();Be.splice(tt,0,st),g.applyReorder($e,Be,tt)}function Ne(){for(let pe of Array.from(e.querySelectorAll(".board-column--drag-over")))pe.classList.remove("board-column--drag-over")}let Ce=null;e.addEventListener("dragover",pe=>{pe.preventDefault(),pe.dataTransfer&&(pe.dataTransfer.dropEffect="move");let Qe=pe.target.closest(".board-column");Qe&&Qe!==Ce&&(Ce&&Ce.classList.remove("board-column--drag-over"),Qe.classList.add("board-column--drag-over"),Ce=Qe)}),e.addEventListener("dragleave",pe=>{let $e=pe.relatedTarget;(!$e||!e.contains($e))&&Ce&&(Ce.classList.remove("board-column--drag-over"),Ce=null)}),e.addEventListener("drop",pe=>{pe.preventDefault(),Ce&&(Ce.classList.remove("board-column--drag-over"),Ce=null);let $e=pe.target,Qe=$e.closest(".board-column");if(!Qe)return;let ht=pe.dataTransfer?.getData("text/plain")||"";if(!ht)return;let st=Qe.id,ut=T.get(ht);if(ut&&ut===st){if(ph.has(st)){if(B!=="manual"){ye("\uC218\uB3D9(\uB4DC\uB798\uADF8) \uC815\uB82C \uBAA8\uB4DC\uC5D0\uC11C\uB9CC \uC21C\uC11C\uB97C \uBC14\uAFC0 \uC218 \uC788\uC2B5\uB2C8\uB2E4","warning",2e3);return}re(st,ht,$e)}return}let vt=dh[st];if(!vt){ye("\uC5EC\uAE30\uB85C\uB294 \uC62E\uAE38 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","warning",1500);return}W.get(ht)!==vt&&Zt(ht,vt)}),e.addEventListener("keydown",pe=>{let $e=pe.target;if(!($e instanceof HTMLElement))return;let Qe=String($e.tagName||"").toLowerCase();if(Qe==="input"||Qe==="textarea"||Qe==="select"||Qe==="button"||Qe==="a"||$e.isContentEditable===!0)return;let ht=$e.closest(".board-card");if(!ht)return;let st=String(pe.key||"");if(st==="Enter"||st===" "){pe.preventDefault();let Be=ht.getAttribute("data-issue-id");Be&&r(Be);return}if(st!=="ArrowUp"&&st!=="ArrowDown"&&st!=="ArrowLeft"&&st!=="ArrowRight")return;pe.preventDefault();let ut=ht.closest(".board-column");if(!ut)return;let vt=Array.from(ut.querySelectorAll(".board-card")),tt=vt.indexOf(ht);if(st==="ArrowDown"&&tt<vt.length-1){je(ht,vt[tt+1]);return}if(st==="ArrowUp"&&tt>0){je(ht,vt[tt-1]);return}if(st==="ArrowLeft"||st==="ArrowRight"){let Be=Array.from(e.querySelectorAll(".board-column")),E=Be.indexOf(ut),U=st==="ArrowRight"?1:-1,z=E+U;for(;z>=0&&z<Be.length;){let ve=Be[z].querySelector(".board-card");if(ve){je(ht,ve);return}z+=U}}});function je(pe,$e){try{pe.tabIndex=-1,$e.tabIndex=0,$e.focus()}catch{}}let We=null;y&&y.subscribe&&(We=y.subscribe(()=>{try{V()}catch{}}));let ct=null;l&&l.subscribe&&(ct=l.subscribe(()=>{try{V()}catch{}}));let It=null;return a&&a.subscribe&&(It=a.subscribe(()=>{rt()})),{async load(){n("load"),V()},clear(){Oe(),Ye(),We&&(We(),We=null),ct&&(ct(),ct=null),It&&(It(),It=null),e.replaceChildren(),C=[],k=[],X=[],ae=[],H=[],N=[],W=new Map,T=new Map}}}function rs(e,t){return e.filter(n=>{let r=pi(n);return!(r&&t.has(r))})}async function _h(e){try{if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")return await navigator.clipboard.writeText(String(e)),!0;let t=document.createElement("textarea");t.value=String(e),t.style.position="fixed",t.style.left="-9999px",document.body.appendChild(t),t.select();let n=!1;try{n=document.execCommand("copy")}finally{t.remove()}return n}catch{return!1}}var vi=["bug","feature","task","epic","chore"];function dd(e){switch((e||"").toString().toLowerCase()){case"bug":return"Bug";case"feature":return"Feature";case"task":return"Task";case"epic":return"Epic";case"chore":return"Chore";default:return""}}var pd=[["input_tokens","input"],["output_tokens","output"],["cache_read_input_tokens","cache_read"],["cache_creation_input_tokens","cache_write"]];var os={usd:null,basis:"none"};function Vr(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function wo(e){return typeof e=="number"&&Number.isFinite(e)}function mh(e,t){if(!e||typeof t!="string"||t.length===0||!Vr(e.runners))return null;let n=Object.values(e.runners).filter(r=>Vr(r?.models));for(let r of n){let o=r.models[t];if(Vr(o))return Vr(o.price)?o.price:null}for(let r of n)for(let o of Object.values(r.models))if(Vr(o)&&o.id===t)return Vr(o.price)?o.price:null;return null}function fd(e,t,n){if(!Vr(e))return os;if(wo(e.total_cost_usd))return{usd:e.total_cost_usd,basis:"reported"};let r=mh(n,t);if(!r)return os;if(pd.some(([i])=>wo(e[i]))){let i=0;for(let[s,l]of pd){let a=wo(e[s])?e[s]:0;if(a<=0)continue;let u=r[l];if(!wo(u))return os;i+=a*u/1e6}return{usd:i,basis:"computed"}}return wo(e.total_tokens)&&wo(r.input)?{usd:e.total_tokens*r.input/1e6,basis:"estimated"}:os}var pl="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4",gh="\uBD84\uD574 \uC5C6\uC74C \u2014 \uCD1D\uB7C9\uB9CC \uBCF4\uACE0\uB428",_d="\uBD84\uD574 \uC5C6\uB294 leg",hh="\uCD1D\uB7C9\uB9CC \uBCF4\uACE0\uB41C leg \uD3EC\uD568 \u2014 \uC785\uB825 \uB2E8\uAC00\uB85C \uCD94\uC815",bh="API \uD658\uC0B0 \uB2E8\uAC00 \uAE30\uC900",fl={reported:"",computed:"\uACC4\uC0B0",estimated:"\uCD94\uC815",none:"\uB2E8\uAC00 \uC5C6\uC74C"};function wi(e){if(!e||typeof e.total_cost_usd!="number"||!Number.isFinite(e.total_cost_usd))return null;let t=Xt(e.unpriced_leg_count),n=`$${e.total_cost_usd.toFixed(2)}`;return t>0?`${n} (+${t} leg \uB2E8\uAC00 \uC5C6\uC74C)`:n}function $o(e){let t=wi(e);if(!t||!e)return[];let n=[t];return e.cost_estimated===!0&&n.push(hh),n.push(bh),n}function Xt(e){return typeof e=="number"&&Number.isFinite(e)?e:0}var Jn=["input_tokens","output_tokens","cache_read_input_tokens","cache_creation_input_tokens"],xo=[...Jn,"reasoning_output_tokens"],yh={codex:["implementation","review-consult"],claude:["subagent"]};function _l(e){return!e||typeof e!="object"?!1:Number.isFinite(e.total_tokens)&&!Jn.some(t=>Number.isFinite(e[t]))}function vh(e){return!e||typeof e!="object"?!1:xo.some(t=>Number.isFinite(e[t]))}function ml(e){let t=0;for(let n of Jn)t+=Xt(e?.[n]);return t}function kh(e){return!e||typeof e!="object"?!1:Jn.some(t=>Number.isFinite(e[t]))}function md(e){return!e||typeof e!="object"?!1:xo.some(t=>Number.isFinite(e[t]))||Number.isFinite(e.total_tokens)}function wh(e){let t={};for(let n of xo)e&&Number.isFinite(e[n])&&(t[n]=e[n]);return t}function gd(e){let t={};for(let n of xo)Number.isFinite(e[n])&&(t[n]=e[n]);return Number.isFinite(e.total_tokens)&&(t.total_tokens=e.total_tokens),e.replayed===!0&&(t.replayed=!0),typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&(t.total_cost_usd=e.total_cost_usd),t}function hd(e,t){return _l(t)?Xt(t.total_tokens):e==="codex"?Xt(t.input_tokens)+Xt(t.output_tokens):ml(t)}function $h(e){return e==="claude"?"Claude":"Codex"}function xh(e){return`\u03C4 ${vd(e)}`}function Ah(e,t){let n=t.breakdown||{},r=Xt(t.total_only_subtotal);if(_l(n)||r>0&&!vh(n)){let u=[`\uCD1D ${t.subtotal.toLocaleString("en-US")}`,gh,...$o(t)];return t.replayed&&u.push(pl),u.join(`
`)}let o=[`\uC785\uB825 ${Xt(n.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${Xt(n.output_tokens).toLocaleString("en-US")}`];e==="claude"?o.push(`\uCE90\uC2DC\uC77D\uAE30 ${Xt(n.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${Xt(n.cache_creation_input_tokens).toLocaleString("en-US")}`):(o.push(`\uCE90\uC2DC\uC77D\uAE30 ${Xt(n.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC4F0\uAE30 ${Xt(n.cache_creation_input_tokens).toLocaleString("en-US")}`),Number.isFinite(n.reasoning_output_tokens)&&o.push(`\uCD94\uB860\uCD9C\uB825 ${Xt(n.reasoning_output_tokens).toLocaleString("en-US")}`)),r>0&&o.push(`${_d} ${r.toLocaleString("en-US")}`);let i=e==="claude"?"\uC785\uB825 + \uCD9C\uB825 + \uCE90\uC2DC\uC77D\uAE30 + \uCE90\uC2DC\uC0DD\uC131":"\uC785\uB825 + \uCD9C\uB825",s=r>0?`${i} + ${_d}`:i,a=[e==="claude"?`Claude subtotal = ${s}`:`Codex subtotal = ${s}; \uCE90\uC2DC\uC77D\uAE30\xB7\uCE90\uC2DC\uC4F0\uAE30\xB7\uCD94\uB860\uCD9C\uB825\uC740 subtotal\uC5D0 \uD3EC\uD568\uB418\uC9C0 \uC54A\uB294 subset`,`\uCD1D ${t.subtotal.toLocaleString("en-US")}`,o.join(" \xB7 ")];return a.push(...$o(t)),t.replayed&&a.push(pl),a.join(`
`)}function gn(e){let t=[];if(!e||typeof e!="object"||!("providers"in e)||!e.providers)return t;for(let n of["claude","codex"]){let r=e.providers[n];if(!r)continue;let o=wi(r);t.push({provider:n,label:`${$h(n)} ${xh(r.subtotal)}${o?` \xB7 ${o}`:""}`,tooltip:Ah(n,r)})}return t}function $i(e){let t={},n={claude:0,codex:0},r={claude:!1,codex:!1};for(let o of e)if(!(!o||!o.providers))for(let i of["claude","codex"]){let s=o.providers[i];if(!s)continue;let l=t[i];l||(l={subtotal:0,breakdown:{}},t[i]=l),l.subtotal+=s.subtotal,Number.isFinite(s.total_only_subtotal)&&(l.total_only_subtotal=Xt(l.total_only_subtotal)+Xt(s.total_only_subtotal));for(let a of xo)Number.isFinite(s.breakdown[a])&&(l.breakdown[a]=Xt(l.breakdown[a])+Xt(s.breakdown[a]));s.replayed&&(l.replayed=!0),typeof s.total_cost_usd=="number"&&Number.isFinite(s.total_cost_usd)&&(n[i]+=s.total_cost_usd,r[i]=!0,s.cost_estimated===!0&&(l.cost_estimated=!0)),Number.isFinite(s.unpriced_leg_count)&&(l.unpriced_leg_count=Xt(l.unpriced_leg_count)+Xt(s.unpriced_leg_count))}for(let o of["claude","codex"]){let i=t[o];i&&r[o]&&(i.total_cost_usd=n[o])}return Object.keys(t).length===0?null:{providers:t,roles:{}}}function gl(e,t=null){return!e||typeof e!="object"?null:ur({attempt:{...e,bead_id:"__attempt__"}},"__attempt__",t)}function bd(e,t){let n=fd(e.usage,e.model,t);e.price_basis=n.basis,n.usd!==null&&(e.price_usd=n.usd)}function Sh(e){if(!e.some(t=>t.price_basis!=="none"))for(let t of e)delete t.price_basis}function Eh(e){return e==="codex"?"codex":"claude"}function Zn(){return{subtotal:0,breakdown:wh(null),total_only:0,legs:[],replayed:!1,cost_usd:0,priced_count:0,unpriced_count:0,estimated:!1}}function ki(e,t){e.subtotal+=t.subtotal,_l(t.usage)&&(e.total_only+=t.subtotal);for(let n of xo)Number.isFinite(t.usage[n])&&(e.breakdown[n]=Xt(e.breakdown[n])+Xt(t.usage[n]));if(e.legs.push(t),t.replayed===!0&&(e.replayed=!0),t.price_basis===void 0||t.price_basis==="none"){e.unpriced_count+=1;return}e.priced_count+=1,e.cost_usd+=Xt(t.price_usd),t.price_basis==="estimated"&&(e.estimated=!0)}function yd(e,t){let n={subtotal:e.subtotal,breakdown:e.breakdown};return e.priced_count>0&&(n.total_cost_usd=e.cost_usd,e.estimated&&(n.cost_estimated=!0)),e.unpriced_count>0&&(n.unpriced_leg_count=e.unpriced_count),e.total_only>0&&(n.total_only_subtotal=e.total_only),t&&(n.legs=e.legs),e.replayed&&(n.replayed=!0),n}function vd(e){return e>=1e6?`${(e/1e6).toFixed(1)}M`:e>=1e3?`${(e/1e3).toFixed(1)}k`:String(e)}function Ao(e){return kh(e)?`\u03C4 ${vd(ml(e))}`:null}function cr(e){let t=Ao(e);if(!t)return null;let n=e?.total_cost_usd;return typeof n=="number"&&Number.isFinite(n)?`${t} \xB7 $${n.toFixed(2)}`:t}function ss(e){if(!e||typeof e!="object")return"";let t=[`\uC785\uB825 ${Xt(e.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${Xt(e.output_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC77D\uAE30 ${Xt(e.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${Xt(e.cache_creation_input_tokens).toLocaleString("en-US")}`];typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&t.push(`$${e.total_cost_usd.toFixed(2)}`);let n=[`\uCD1D ${ml(e).toLocaleString("en-US")}`,t.join(" \xB7 ")];return e.replayed&&n.push(pl),n.join(`
`)}function ur(e,t,n=null){let r={claude:Zn(),codex:Zn()},o={orchestrator:{claude:Zn(),codex:Zn()},implementation:{claude:Zn(),codex:Zn()},"review-consult":{claude:Zn(),codex:Zn()},subagent:{claude:Zn(),codex:Zn()}},i=new Set,s=[];for(let u of Object.values(e||{})){if(!u||u.bead_id!==t)continue;let d=u.usage;if(md(d)){let _=Eh(u.runner),y=gd(d),g={provider:_,role:"orchestrator",attempt_id:String(u.attempt_id||""),usage:y,subtotal:hd(_,y)};y.replayed===!0&&(g.replayed=!0),typeof u.model=="string"&&(g.model=u.model),typeof u.session_id=="string"&&(g.session_id=u.session_id),bd(g,n),s.push(g),ki(r[_],g),ki(o.orchestrator[_],g)}let f=Array.isArray(u.usage_legs)?u.usage_legs:[];for(let _ of f){let y=_&&_.provider==="claude"?"claude":"codex";if(!_||_.provider!=="codex"&&_.provider!=="claude"||!yh[y].includes(_.role)||!md(_.usage))continue;let g=typeof _.receipt_id=="string"&&_.receipt_id.length>0?_.receipt_id:null;if(!g||i.has(g))continue;i.add(g);let C=gd(_.usage),k={provider:y,role:_.role,attempt_id:String(u.attempt_id||""),usage:C,subtotal:hd(y,C)};k.receipt_id=g,typeof _.agent_type=="string"&&(k.agent_type=_.agent_type),typeof _.agent_id=="string"&&(k.agent_id=_.agent_id),typeof _.model=="string"&&(k.model=_.model),typeof _.effort=="string"&&_.effort.trim().length>0&&(k.effort=_.effort),typeof _.session_id=="string"?k.session_id=_.session_id:typeof _.thread_id=="string"&&(k.session_id=_.thread_id),typeof _.turn_id=="string"&&(k.turn_id=_.turn_id),(typeof _.completed_at=="string"||typeof _.completed_at=="number"&&Number.isFinite(_.completed_at))&&(k.completed_at=_.completed_at),C.replayed===!0&&(k.replayed=!0),bd(k,n),s.push(k),ki(r[y],k),ki(o[k.role][y],k)}}Sh(s);let l={};for(let u of["claude","codex"]){let d=r[u];d.legs.length!==0&&(l[u]=yd(d,!1))}if(Object.keys(l).length===0)return null;let a={};for(let u of["orchestrator","implementation","review-consult","subagent"]){let d={};for(let f of["claude","codex"]){let _=o[u][f];_.legs.length>0&&(d[f]={...yd(_,!0),legs:_.legs})}Object.keys(d).length>0&&(a[u]=d)}return{providers:l,roles:a}}var kd={running:3,paused:2,failed:1};function dr(e){if(!e||typeof e!="object")return!1;let t=e.kind;return t==null||t==="implementation"}function wd(e){let t=Object.values(e||{}),n=new Map;for(let r of t){if(!r||typeof r.bead_id!="string"||r.bead_id.length===0||r.kind!=="review_session"||r.status!=="running")continue;let o=typeof r.started_at=="number"?r.started_at:null,i=n.get(r.bead_id);i&&(i.started_at??0)>(o??0)||n.set(r.bead_id,{attempt:r,origin:r.origin==="click"||r.origin==="auto"?r.origin:null,started_at:o})}return n}function $d(e,t){let n=Object.values(e||{}),r=new Set,o=new Map;for(let s of n)!s||typeof s.bead_id!="string"||(typeof s.resumed_from=="string"&&s.resumed_from.length>0&&r.add(s.resumed_from),dr(s)&&o.set(s.bead_id,s.attempt_id));let i=new Map;for(let s of n){if(!s||typeof s.bead_id!="string"||s.bead_id.length===0||!dr(s))continue;let l=null;if(s.status==="running")l="running";else if(s.status==="paused"&&!r.has(s.attempt_id))l="paused";else if(s.status==="failed"||s.status==="orphaned"){let d=t.get(s.bead_id),f=typeof d=="number"&&d>0&&typeof s.finished_at=="number"&&d>=s.finished_at;o.get(s.bead_id)===s.attempt_id&&!f&&typeof s.dismissed_at!="number"&&(l="failed")}if(!l)continue;let a=typeof s.started_at=="number"?s.started_at:null,u=i.get(s.bead_id);if(u){let d=kd[u.run_state],f=kd[l];if(d>f||d===f&&(u.started_at??0)>(a??0))continue}i.set(s.bead_id,{attempt:s,run_state:l,started_at:a})}return{winners:i,resumed_from_ids:r}}var Th=["workflow_mode","spec_review_model","spec_review_effort","spec_review_speed","plan_review_model","plan_review_effort","plan_review_speed","impl_review_model","impl_review_effort","impl_review_speed","impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed","quick_fix_impl_dispatch","quick_fix_impl_runtime","quick_fix_impl_model","quick_fix_impl_effort","quick_fix_impl_speed","orchestration_model","orchestration_effort","orchestration_speed","quick_fix_orchestration_model","quick_fix_orchestration_effort","quick_fix_orchestration_speed"],Ed=["orchestration_model","orchestration_effort","orchestration_speed"],Td=["quick_fix_orchestration_model","quick_fix_orchestration_effort","quick_fix_orchestration_speed"],Ch=[...Ed,...Td],xd={quick_fix_impl_dispatch:"impl_dispatch",quick_fix_impl_runtime:"impl_runtime",quick_fix_impl_model:"impl_model",quick_fix_impl_effort:"impl_effort",quick_fix_impl_speed:"impl_speed",quick_fix_orchestration_model:"orchestration_model",quick_fix_orchestration_effort:"orchestration_effort",quick_fix_orchestration_speed:"orchestration_speed"},Ad={spec_review_effort:"spec_review_model",plan_review_effort:"plan_review_model",impl_review_effort:"impl_review_model"},Sd={spec_review_speed:"spec_review_model",plan_review_speed:"plan_review_model",impl_review_speed:"impl_review_model"},Rh=new Set(["native-fixed-posture","unsupported","claude-runner-model-default","catalog-validated","provider-tier-or-runtime-model-default","actual-effort"]);function cn(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function Mt(e){return typeof e=="string"&&e.length>0?e:null}function So(e){return e.startsWith("gpt-")?e.slice(4):e}function Tt(e,t,n,r,o){return{value:e,source:t,display:n,full_value:r,resolution:o}}function Cd(e,t,n){let r=Mt(t[e]);if(r!==null)return{value:r,source:"pin"};let o=Mt(n[e]);return o===null?null:{value:o,source:"global"}}function xr(e,t,n,r){return Cd(e,t,n)||{value:r,source:"base"}}function hl(e,t,n,r){let o=n?.implementation?.model_catalog;if(t&&cn(o?.[t])){let s=Mt(o[t][e]);if(s!==null)return s}if(t&&Array.isArray(o?.[t])&&o[t].includes(e))return e;if(!t&&cn(o)){for(let s of Object.values(o))if(cn(s)){let l=Mt(s[e]);if(l!==null)return l}else if(Array.isArray(s)&&s.includes(e))return e}let i=r?.model_index?.[e];return Mt(r?.runners?.[i]?.models?.[e]?.id)||e}function Oh(e,t){return Mt(t?.review?.reviewers?.[e]?.model)||e}function Fn(e,t,n=!1){if(e==="default")return Tt(e,t,`default (\uC77C\uBC18 \xB7 ${t==="pin"?"\uD540":"\uC804\uC5ED \uACE0\uC815"})`,e,"explicit");let r=n?So(e):e;return Tt(e,t,r,e,"explicit")}function Rd(e,t,n){let r=t?.implementation?.model_catalog?.[e],o=[];cn(r)?o.push(...Object.keys(r)):Array.isArray(r)&&o.push(...r.filter(s=>typeof s=="string"));let i=n?.runners?.[e]?.models;if(cn(i))for(let s of Object.keys(i))o.includes(s)||o.push(s);return o}function Ih(e,t){let n=[],r=e?.implementation?.model_catalog;cn(r)&&n.push(...Object.keys(r));let o=t?.runners;if(cn(o))for(let i of Object.keys(o))n.includes(i)||n.push(i);return n}function Lh(e,t,n){if(e===null)return{runtime:null,offered:!1};let r=!1;for(let o of Ih(t,n)){let i=Rd(o,t,n);if(i.length>0&&(r=!0),i.includes(e))return{runtime:o,offered:!0}}return{runtime:null,offered:r}}function xi(e){return Tt(e.value,e.source,`${e.value} (\uBE44\uD638\uD658)`,e.value,"incompatible")}function bl(e,t,n){let r=Cd(e,t,n);return r?Fn(r.value,r.source):Tt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable")}function In(e){let t=cn(e.pin)?e.pin:{},n=cn(e.global)?e.global:{},r=cn(e.execution_defaults)?e.execution_defaults:null,o=r?.supported===!0&&cn(r.session)?r.session:null,i=r?.supported===!0&&cn(r.orchestration)?r.orchestration:null,s=cn(e.runner_catalog)?e.runner_catalog:null,l=Mt(n.quick_fix_impl_model),a=Lh(l,o,s),u={};if(o){let d=xr("workflow_mode",t,n,Mt(o.workflow_mode_default));u.workflow_mode=d.source==="base"?Tt(d.value,"base",d.value||"\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",d.value,"default"):Fn(d.value,d.source);for(let H of["spec_review","plan_review","impl_review"]){let N=`${H}_model`,P=Mt(H==="plan_review"?d.value==="fast_track"?o.plan_review?.fast_track_default:o.plan_review?.standard_recommended:o.review?.default),j=xr(N,t,n,P);if(j.value===null)u[N]=Tt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable");else if(j.value!=="self"&&j.value!=="skip"&&!cn(o.review?.reviewers?.[j.value]))u[N]=xi(Tt(j.value,j.source,"",null,"explicit"));else{let B=Oh(j.value,o);u[N]=Tt(j.value,j.source,So(B),B,j.source==="base"?"default":"explicit")}}for(let[H,N]of Object.entries(Ad)){let P=u[N].value;if(P==="self"||P==="skip"){u[H]=Tt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable");continue}let j=Mt(o.review?.reviewers?.[P||""]?.effort),B=xr(H,t,n,j);u[H]=B.value===null?Tt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"):Tt(B.value,B.source,B.value,B.value,B.source==="base"?"default":"explicit")}for(let[H,N]of Object.entries(Sd)){let P=u[N];if(P.resolution==="incompatible"||P.value==="self"||P.value==="skip"){u[H]=Tt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable");continue}if(P.resolution==="unavailable"){u[H]=Tt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable");continue}let j=xr(H,t,n,"default");u[H]=j.source==="base"?Tt("default","base","default (\uC77C\uBC18)","default","default"):Fn(j.value,j.source)}let f=cn(o.implementation?.default)?o.implementation.default:{},_=Mt(e.route),y=_!==null&&["quick_fix","spec_backed","full_plan"].includes(_),g=cn(o.implementation?.route_defaults)?o.implementation.route_defaults:{},C=y&&cn(g[_])?g[_]:{},k={},X=!1;if(_==="quick_fix"){let H=Mt(t.impl_runtime),N=Mt(n.quick_fix_impl_runtime),P=H||N,j=P==="inherit"?Mt(e.controller_runtime):P;X=l!==null&&a.runtime!==null&&(P===null||j===a.runtime);let B=Mt(t.impl_dispatch),W=Mt(n.quick_fix_impl_dispatch);if(B!==null)u.impl_dispatch=Fn(B,"pin"),k.impl_dispatch="pin";else if(W!==null)u.impl_dispatch=Fn(W,"global"),k.impl_dispatch="quick_fix";else if(X)u.impl_dispatch=Tt("delegated","global","\uC704\uC784 (\uBAA8\uB378 \uD568\uC758)","delegated","explicit"),k.impl_dispatch="implied";else{let T=Mt(C.dispatch)||Mt(f.dispatch);u.impl_dispatch=T?Tt(T,"base",T,T,"default"):Tt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"),k.impl_dispatch="base"}if(H!==null)u.impl_runtime=Fn(H,"pin"),k.impl_runtime="pin";else if(N!==null)u.impl_runtime=Fn(N,"global"),k.impl_runtime="quick_fix";else if(X){let T=a.runtime;u.impl_runtime=Tt(T,"global",`${T} (\uC720\uB3C4)`,T,"explicit"),k.impl_runtime="derived"}else{let T=xr("impl_runtime",{},n,Mt(f.runtime));u.impl_runtime=T.value===null?Tt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"):Tt(T.value,T.source,T.value,T.value,T.source==="base"?"default":"explicit"),k.impl_runtime=T.source}for(let T of["impl_model","impl_effort","impl_speed"]){let S=Mt(t[T]),I=Mt(n[`quick_fix_${T}`]),O;S!==null?(O={value:S,source:"pin"},k[T]="pin"):T==="impl_model"&&X&&l!==null?(O={value:l,source:"global"},k[T]="quick_fix"):T!=="impl_model"&&I!==null?(O={value:I,source:"global"},k[T]="quick_fix"):(O=xr(T,{},n,Mt(f[T.replace("impl_","")])),k[T]=O.source),u[T]=O.value===null?Tt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"):Tt(O.value,O.source,O.value,O.value,O.source==="base"?"default":"explicit")}}else for(let H of["impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"]){let N=xr(H,t,n,H==="impl_dispatch"?Mt(C.dispatch)||Mt(f.dispatch):Mt(f[H.replace("impl_","")]));u[H]=N.value===null?Tt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"):Tt(N.value,N.source,N.value,N.value,N.source==="base"?"default":"explicit")}let ae=u.impl_dispatch.value==="main";if(ae?u.impl_dispatch.display=k.impl_dispatch==="quick_fix"?"\uBA54\uC778 (quick_fix)":"\uBA54\uC778":u.impl_dispatch.value==="delegated"&&(k.impl_dispatch==="quick_fix"?u.impl_dispatch.display="\uC704\uC784 (quick_fix)":k.impl_dispatch!=="implied"&&(u.impl_dispatch.display="\uC704\uC784")),u.impl_runtime.value==="inherit"&&(u.impl_runtime.display=e.controller_runtime?`inherit (${e.controller_runtime})`:"inherit (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_runtime.resolution="dynamic"),u.impl_model.value!==null){let H=u.impl_runtime.value==="inherit"?Mt(e.controller_runtime):u.impl_runtime.value,N=H?Rd(H,o,s):[];_==="quick_fix"&&k.impl_model==="base"&&k.impl_runtime!=="base"&&N.length>0&&!N.includes(u.impl_model.value)&&(u.impl_model=Tt("auto","base","auto","auto","default"));let P=u.impl_model.value;if(P!=="auto"&&N.length>0&&!N.includes(P))u.impl_model=xi(u.impl_model);else{let j=hl(P,H,o,s);u.impl_model.display=So(j),u.impl_model.full_value=j,k.impl_model==="quick_fix"&&(u.impl_model.display=`${u.impl_model.display} (quick_fix)`)}}if(u.impl_effort.value==="auto"){let H=Mt(e.transport)||(u.impl_runtime.value==="codex"?"codex-native-spawn":u.impl_runtime.value==="claude"?"implement-claude":null),N=H?Mt(o.implementation?.effort_by_transport?.[H]?.auto):null;N&&!Rh.has(N)?(u.impl_effort.display=`${N} (\uBE44\uD638\uD658)`,u.impl_effort.full_value=N,u.impl_effort.resolution="incompatible"):(u.impl_effort.display="auto (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_effort.resolution="dynamic")}k.impl_effort==="quick_fix"&&u.impl_effort.value!==null&&(u.impl_effort=Tt(u.impl_effort.value,"global",`${u.impl_effort.value} (quick_fix)`,u.impl_effort.value,"explicit")),u.impl_speed.value==="default"&&(u.impl_speed=k.impl_speed==="quick_fix"?Tt("default","global","default (quick_fix)","default","explicit"):u.impl_speed.source==="base"?Tt("default","base","default (\uC77C\uBC18)","default","default"):Fn("default",u.impl_speed.source));for(let H of["impl_runtime","impl_effort","impl_speed"])k[H]==="quick_fix"&&u[H].value!==null&&!u[H].display.endsWith("(quick_fix)")&&(u[H].display=`${u[H].display} (quick_fix)`);if(_==="quick_fix"){l!==null&&!X&&a.offered&&(u.quick_fix_impl_model=xi(Tt(l,"global","",l,"explicit")));for(let[H,N]of Object.entries(xd))!H.startsWith("quick_fix_orchestration_")&&!Object.hasOwn(u,H)&&(u[H]={...u[N]});u.impl_dispatch.source==="base"&&u.impl_dispatch.value==="main"&&(u.quick_fix_impl_dispatch=Tt("main","base","\uBA54\uC778 (\uD558\uB124\uC2A4)","main","default"))}if(ae)for(let H of["impl_runtime","impl_model","impl_effort","impl_speed"])u[H]=Tt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable")}else for(let d of Th.filter(f=>!Ch.includes(f)))u[d]=bl(d,t,n);if(!o){for(let[d,f]of Object.entries(Ad))(u[f].value==="self"||u[f].value==="skip")&&(u[d]=Tt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable"));for(let[d,f]of Object.entries(Sd))(u[f].value==="self"||u[f].value==="skip")&&(u[d]=Tt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable"));if(u.impl_dispatch.value==="main"){u.impl_dispatch.display="\uBA54\uC778";for(let d of["impl_runtime","impl_model","impl_effort","impl_speed"])u[d]=Tt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable")}else u.impl_dispatch.value==="delegated"&&(u.impl_dispatch.display="\uC704\uC784"),u.impl_runtime.value==="inherit"&&(u.impl_runtime.display=e.controller_runtime?`inherit (${e.controller_runtime})`:"inherit (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_runtime.resolution="dynamic"),u.impl_effort.value==="auto"&&(u.impl_effort.display="auto (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_effort.resolution="dynamic")}for(let d of Ed){if(!i){u[d]=bl(d,t,n);continue}let f=d.replace("orchestration_",""),_=Mt(i[f]),y=`quick_fix_${d}`,g=e.route==="quick_fix"?Mt(n[y]):null,C=Mt(t[d]),k=C!==null?{value:C,source:"pin"}:g!==null?{value:g,source:"global"}:xr(d,{},n,_),X=C===null&&g!==null;if(d==="orchestration_effort"&&k.source==="base"){u[d]=Tt(null,"base","CLI \uAE30\uBCF8 (\uBBF8\uC9C0\uC815)",null,"default");continue}if(k.value===null){u[d]=Tt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable");continue}if(d==="orchestration_model"){let ae=k.source==="base"?Mt(i.model_id)||k.value:hl(k.value,null,o,s);u[d]=Tt(k.value,k.source,`${So(ae)}${X?" (quick_fix)":""}`,ae,k.source==="base"?"default":"explicit");continue}if(k.value==="default"){u[d]=X?Tt("default","global","default (quick_fix)","default","explicit"):k.source==="base"?Tt("default","base","default (\uC77C\uBC18)","default","default"):Fn("default",k.source);continue}u[d]=X?Tt(k.value,"global",`${k.value} (quick_fix)`,k.value,"explicit"):Fn(k.value,k.source)}for(let d of Td){let f=xd[d];u[d]=u[f]?{...u[f]}:bl(d,t,n)}if(o&&e.route!=="quick_fix")if(l===null){let d=u.orchestration_model.full_value;u.quick_fix_impl_model=Tt(null,"base",d===null?"\uBA54\uC778":`\uBA54\uC778 (orchestration ${So(d)})`,null,"default")}else if(a.runtime!==null){let d=hl(l,a.runtime,o,s);u.quick_fix_impl_model=Tt(l,"global",So(d),d,"explicit")}else a.offered?u.quick_fix_impl_model=xi(Tt(l,"global","",null,"explicit")):u.quick_fix_impl_model=Fn(l,"global");return u}function Dh(e,t){let n=t&&e.value==="default"?"default (\uC77C\uBC18)":e.display;if(!t||e.source==="pin")return`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 ${e.display}`;let r=e.source==="global"?"\uC804\uC5ED":"harness";return`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 ${n} (${r})`}function Ai(e){let t=cn(e.pin)?e.pin:{},n=cn(e.global)?e.global:{},r=cn(e.resolution_global)?{...e.resolution_global}:{};delete r[e.key];let o=f=>{let _={...r,...f};return In({pin:e.layer==="pin"?_:t,global:e.layer==="pin"?n:_,execution_defaults:e.execution_defaults,runner_catalog:e.runner_catalog,route:e.route,controller_runtime:e.controller_runtime})},i=e.layer==="pin"?t:n,s={...i};delete s[e.key];let l=o(s)[e.key],a=o(i)[e.key],u=Mt(i[e.key]),d=[...e.choices];return u!==null&&!d.includes(u)&&d.unshift(u),{unset_label:Dh(l,e.layer==="pin"),full_value:l.full_value,unavailable:l.resolution==="unavailable",disabled:a?.resolution==="not_applicable",options:d.map(f=>{let _=o({...i,[e.key]:f})[e.key];return{value:f,label:_.display,full_value:_.full_value}})}}var Si=["workflow_mode","spec_review_model","spec_review_effort","spec_review_speed","plan_review_model","plan_review_effort","plan_review_speed","impl_review_model","impl_review_effort","impl_review_speed","impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"],Ph=["quick_fix_impl_dispatch","quick_fix_impl_runtime","quick_fix_impl_model","quick_fix_impl_effort","quick_fix_impl_speed"],is=[...Si.filter(e=>e!=="impl_dispatch"),...Ph,"base_sync_accept_local_commits","bdui_url"],Od=["base_sync_accept_local_commits"],as="true";function Ei(e){let t={};if(!yn(e))return t;for(let[n,r]of Object.entries(e)){if(Od.includes(n)){r===!0&&(t[n]=as);continue}typeof r=="string"&&(t[n]=r)}return t}function Id(e){let t;try{t=new URL(e)}catch{return!1}return(t.protocol==="http:"||t.protocol==="https:")&&e===t.origin}var Bn=["orchestration_model","orchestration_effort","orchestration_speed"],Eo=["quick_fix_orchestration_model","quick_fix_orchestration_effort","quick_fix_orchestration_speed"],yl=Object.freeze({orchestration_model:"quick_fix_orchestration_model",orchestration_effort:"quick_fix_orchestration_effort",orchestration_speed:"quick_fix_orchestration_speed",impl_dispatch:"quick_fix_impl_dispatch",impl_runtime:"quick_fix_impl_runtime",impl_model:"quick_fix_impl_model",impl_effort:"quick_fix_impl_effort",impl_speed:"quick_fix_impl_speed"}),To=[...Si,...Bn],Mh=is.filter(e=>To.includes(e));function Nh(e,t){let n={},r=[];for(let[i,s]of Object.entries(yl)){let l=e[i];if(!Object.hasOwn(e,i)){n[s]=null;continue}let a=t[s];if(typeof l!="string"||!Array.isArray(a)||!a.includes(l)){n[s]=null,r.push(`lane_incompatible:${s}`);continue}n[s]=l}let o=Object.keys(e).filter(i=>!Object.hasOwn(yl,i));return{values:n,warnings:r,skipped_keys:o}}var ls=["delegated","main"],Ti=["inherit","claude","codex"],er=["default","fast"],cs=["standard","fast_track"],us=["codex","opus","fable","self","skip"],Ci=["codex","fable","skip"],Ri=["low","medium","high","xhigh"],Ld=["default","fast"],Rn="auto";function yn(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function Dd(e){if(!yn(e)||!yn(e.runners))return[];let t=[];for(let[n,r]of Object.entries(e.runners))yn(r)&&yn(r.models)&&t.push([n,Object.keys(r.models)]);return t}function Co(e,t){let n=Dd(e),r=t&&t!=="inherit"?n.filter(([o])=>o===t):n;return[Rn,...r.flatMap(([,o])=>o)]}function Pd(e,t,n,r){if(!yn(e)||!yn(e.runners))return[Rn];let o=[];for(let[i,s]of Object.entries(e.runners))if(!(!yn(s)||!yn(s.models))&&!(t&&t!=="inherit"&&i!==t))for(let[l,a]of Object.entries(s.models)){if(n&&n!==Rn&&l!==n)continue;let u=r(s,a);if(Array.isArray(u))for(let d of u)typeof d=="string"&&!o.includes(d)&&o.push(d)}return[Rn,...o]}function Yr(e,t,n){return Pd(e,t,n,(r,o)=>yn(o)&&Array.isArray(o.efforts)?o.efforts:r.efforts)}function Oi(e,t,n){return Pd(e,t,n,(r,o)=>yn(o)&&Array.isArray(o.orchestration_efforts)?o.orchestration_efforts:yn(o)&&Array.isArray(o.efforts)?o.efforts:r.efforts)}function Ro(e,t){let n=Dd(e);return(t?n.filter(([o])=>o===t):n).flatMap(([,o])=>o)}function Md(e,t,n){let r={impl_runtime:e?.impl_runtime,impl_model:e?.impl_model,impl_effort:e?.impl_effort},o=r.impl_runtime==="claude"||r.impl_runtime==="codex"?r.impl_runtime:r.impl_runtime==="inherit"?n:null;return o&&(r.impl_model&&!Co(t,o).includes(r.impl_model)&&(r.impl_model=void 0),r.impl_effort&&!Yr(t,o,r.impl_model||Rn).includes(r.impl_effort)&&(r.impl_effort=void 0)),r}var qh={workflow_mode:"\uC6CC\uD06C\uD50C\uB85C \uBAA8\uB4DC",spec_review_model:"\uC2A4\uD399 \uB9AC\uBDF0\uC5B4",spec_review_effort:"\uC2A4\uD399 \uB9AC\uBDF0 effort",spec_review_speed:"\uC2A4\uD399 \uB9AC\uBDF0 \uC18D\uB3C4",plan_review_model:"\uACC4\uD68D \uB9AC\uBDF0\uC5B4",plan_review_effort:"\uACC4\uD68D \uB9AC\uBDF0 effort",plan_review_speed:"\uACC4\uD68D \uB9AC\uBDF0 \uC18D\uB3C4",impl_review_model:"\uAD6C\uD604 \uB9AC\uBDF0\uC5B4",impl_review_effort:"\uAD6C\uD604 \uB9AC\uBDF0 effort",impl_review_speed:"\uAD6C\uD604 \uB9AC\uBDF0 \uC18D\uB3C4",impl_runtime:"\uC704\uC784 \uB300\uC0C1",impl_model:"\uAD6C\uD604 \uBAA8\uB378",impl_effort:"\uAD6C\uD604 effort",impl_speed:"\uAD6C\uD604 \uC18D\uB3C4",orchestration_model:"\uC6CC\uCEE4 \uBAA8\uB378",orchestration_effort:"\uC6CC\uCEE4 effort",orchestration_speed:"\uC6CC\uCEE4 \uC18D\uB3C4"},jh={quick_fix_orchestration_model:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uBAA8\uB378",quick_fix_orchestration_effort:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 effort",quick_fix_orchestration_speed:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uC18D\uB3C4",quick_fix_impl_dispatch:"\uC2E4\uD589 \uBC29\uC2DD",quick_fix_impl_runtime:"\uC704\uC784 \uB300\uC0C1",quick_fix_impl_model:"\uBAA8\uB378",quick_fix_impl_effort:"effort",quick_fix_impl_speed:"\uC18D\uB3C4"},vl=[...Mh,...Bn],Fh=[...To,...is].filter((e,t,n)=>n.indexOf(e)===t&&!vl.includes(e));function Nd(e,t){let n=yn(e)?e:{},r=yn(t)?t:{},o=[];for(let s of vl){let l=n[s]??null,a=r[s]??null;l!==a&&o.push({key:s,label:qh[s]||s,before:l,after:a,kind:l===null?"added":a===null?"removed":"changed"})}let i=[];for(let s of[...Fh,...Object.keys(r)])!vl.includes(s)&&!i.includes(s)&&Object.hasOwn(r,s)&&i.push(s);return{rows:o,ignored_keys:i}}function qd(e,t,n){let r=yn(e)?e:{},o=Nh(yn(t)?t:{},n),i=[];for(let s of Object.values(yl)){let l=r[s]??null,a=o.values[s]??null;l!==a&&i.push({key:s,label:jh[s]||s,before:l,after:a,kind:l===null?"added":a===null?"removed":"changed"})}return{rows:i,ignored_keys:o.skipped_keys}}function kl(e,t,n,r,o,i,s=null){return Ai({key:e,choices:t,layer:"global",global:n,resolution_global:i,execution_defaults:r,runner_catalog:o,route:s})}function jd(e,t){let n={};for(let r of is){let o=e?.[r],i=t?.[r];if(o!==i){if(Od.includes(r)){n[r]=i===as?!0:null;continue}n[r]=typeof i=="string"&&i.length>0?i:null}}return n}function Fd(e,t){let n={};for(let r of[...Bn,...Eo]){let o=e?.[r]??null,i=t?.[r]??null;o!==i&&(n[r]=typeof i=="string"&&i.length>0?i:null)}return n}var wl=[{id:"workflow",label:"\uC6CC\uD06C\uD50C\uB85C\uC6B0",keys:["workflow_mode"]},{id:"review",label:"\uB9AC\uBDF0",keys:["spec_review_model","spec_review_effort","spec_review_speed","plan_review_model","plan_review_effort","plan_review_speed","impl_review_model","impl_review_effort","impl_review_speed"]},{id:"implementation",label:"\uAD6C\uD604",keys:["impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"]},{id:"worker",label:"Worker",keys:[...Bn]}],Ar={workflow_mode:"\uBAA8\uB4DC",spec_review_model:"\uC0AC\uC591 \uB9AC\uBDF0",spec_review_effort:"\uC0AC\uC591 \uB9AC\uBDF0 effort",spec_review_speed:"\uC0AC\uC591 \uB9AC\uBDF0 \uC18D\uB3C4",plan_review_model:"\uACC4\uD68D \uB9AC\uBDF0",plan_review_effort:"\uACC4\uD68D \uB9AC\uBDF0 effort",plan_review_speed:"\uACC4\uD68D \uB9AC\uBDF0 \uC18D\uB3C4",impl_review_model:"\uAD6C\uD604 \uB9AC\uBDF0",impl_review_effort:"\uAD6C\uD604 \uB9AC\uBDF0 effort",impl_review_speed:"\uAD6C\uD604 \uB9AC\uBDF0 \uC18D\uB3C4",impl_dispatch:"\uC2E4\uD589 \uBC29\uC2DD",impl_runtime:"\uC704\uC784 \uB300\uC0C1",impl_model:"\uBAA8\uB378",impl_effort:"effort",impl_speed:"\uC18D\uB3C4",orchestration_model:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uBAA8\uB378",orchestration_effort:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 effort",orchestration_speed:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uC18D\uB3C4"},Ii={pin:"\uD540",global:"\uC804\uC5ED",base:"\uAE30\uBCF8"};function $l(e,t,n,r,o,i=null){let s=In({pin:t,global:n,execution_defaults:r,runner_catalog:o,route:t&&typeof t.route=="string"?t.route:null,controller_runtime:i});return e.map(l=>({key:l,...s[l]}))}function Bd(e,t,n,r,o,i=null){let s={pin:0,global:0,base:0};for(let l of $l(e,t,n,r,o,i))s[l.source]+=1;return s}function Ud(e,t,n){return{id:e,key:t,value:typeof n=="string"?n:""}}function Wd(e,t,n){return typeof t!="string"||t.length===0?null:{id:e,preset_id:t,expected_revision:n}}var G0=[...Si,...Bn];var Hd=["orchestration_model","orchestration_effort","orchestration_speed","spec_review_model","spec_review_effort","spec_review_speed","plan_review_model","plan_review_effort","plan_review_speed","impl_review_model","impl_review_effort","impl_review_speed","impl_runtime","impl_model","impl_effort"];function ds(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function Li(e){if(!ds(e)||!ds(e.runners))return null;let t=Object.entries(e.runners).filter(([,n])=>ds(n)&&ds(n.models));return t.length>0?t:null}function Un(e,t){let n=Li(e);if(!n||!t)return null;for(let[r,o]of n)if(Object.hasOwn(o.models,t))return r;return null}function zd(e,t){return ds(t)&&Array.isArray(t.efforts)?t.efforts.slice():Array.isArray(e.efforts)?e.efforts.slice():[]}function Kd(e,t){let n=Li(e);if(!n||!t)return[];for(let[,r]of n)if(Object.hasOwn(r.models,t))return zd(r,r.models[t]);return[]}function Bh(e){let t=Li(e);if(!t)return[];let n=[];for(let[,r]of t)for(let o of Object.values(r.models))for(let i of zd(r,o))n.includes(i)||n.push(i);return n}function Uh(e,t){if(!t)return Bh(e);let r=Li(e)?.find(([i])=>i===t)?.[1];if(!r)return[];let o=[];for(let i of Object.keys(r.models))for(let s of Kd(e,i))o.includes(s)||o.push(s);return o}function Gd(e,t,n){let r={impl_runtime:e.impl_runtime||"",impl_model:e.impl_model||"",impl_effort:e.impl_effort||""},o=r.impl_runtime==="inherit"?n:r.impl_runtime==="claude"||r.impl_runtime==="codex"?r.impl_runtime:null;if(r.impl_runtime==="inherit"&&!o)return r.impl_model="",r.impl_effort="",r;let i=Un(t,r.impl_model);if(r.impl_model&&(!o||i!==o))return r.impl_model="",r.impl_effort="",r;let s=r.impl_model?Kd(t,r.impl_model):Uh(t,o);return r.impl_effort&&s.length>0&&!s.includes(r.impl_effort)&&(r.impl_effort=""),r}function Ln(e){return[typeof e.runner=="string"?e.runner:null,typeof e.model=="string"?e.model:null,typeof e.effort=="string"?e.effort:null,e.speed==="fast"?"Fast":null].filter(Boolean).join(" \xB7 ")}function ps(e){return typeof e.resumed_from!="string"||e.resumed_from.length===0?null:`${e.continuation_mode==="session"?"session \uC774\uC5B4\uBC1B\uC74C":e.continuation_mode==="fresh"?"\uC0C8 session\uC73C\uB85C \uC774\uC5B4\uBC1B\uC74C":"\uC774\uC804 attempt\uC5D0\uC11C \uC774\uC5B4\uBC1B\uC74C"} (from ${e.resumed_from})`}var xl=new Set(["unavailable","not_applicable"]);function Sr(e,t){if(typeof e!="object"||e===null)return null;let n=e[t];return typeof n=="object"&&n!==null?n:null}function Vd(e){return e.filter(t=>t!==null).join(" \xB7 ")}function Er(e,t){return t===null?null:`${Ar[e]}: ${t.display} (${Ii[t.source]})`}function Al(e){return e.filter(t=>t!==null).join(`
`)}function Di(e){if(typeof e!="object"||e===null)return null;let t=Ln(e);if(t==="")return null;let n=(r,o)=>typeof o=="string"&&o.length>0?`${r}: ${o}`:null;return{text:t,title:Al(["\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \u2014 \uC774 attempt\uC5D0 \uAE30\uB85D\uB41C \uC2E4\uD589\uAC12",n("runner",e.runner),n(Ar.orchestration_model,e.model),n(Ar.orchestration_effort,e.effort),n(Ar.orchestration_speed,e.speed)])}}function Oo(e,t){let n=Sr(e,"orchestration_model");if(n===null||n.resolution==="unavailable")return null;let r=Sr(e,"orchestration_effort"),o=Sr(e,"orchestration_speed"),i=Vd([Un(t,n.value??""),n.display,r!==null&&r.value!==null?r.display:null,o!==null&&o.value==="fast"?"Fast":null]);return i===""?null:{text:i,title:Al(["\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \u2014 \uD604\uC7AC \uD574\uC11D\uAC12 (\uD540 > \uD050 \uAE30\uBCF8\uAC12)",Er("orchestration_model",n),Er("orchestration_effort",r),Er("orchestration_speed",o)])}}function Wh(e,t){return e===null||e.value===null||xl.has(e.resolution)?null:e.value!=="inherit"?e.value:t?`inherit\u2192${t}`:"inherit"}function Hh(e){return e===null||xl.has(e.resolution)?null:e.value==="auto"?"auto":e.display}function zh(e){return e===null?null:e.value==="auto"?"auto":xl.has(e.resolution)?null:e.display}function Qr(e,t){if(typeof e!="object"||e===null)return null;let n=Sr(e,"impl_dispatch"),r=Sr(e,"impl_runtime"),o=Sr(e,"impl_model"),i=Sr(e,"impl_effort"),s=Sr(e,"impl_speed"),l=n!==null&&n.value==="main"?"\uBA54\uC778":Vd([Wh(r,t??null),Hh(o),zh(i),s!==null&&s.value==="fast"?"Fast":null]);return l===""?null:{text:l,title:Al(["\uC6CC\uCEE4(\uAD6C\uD604 \uC704\uC784) \u2014 \uD604\uC7AC \uD574\uC11D\uAC12 (\uD540 > \uC804\uC5ED kv > \uAE30\uBCF8). \uC2E4\uD589 \uC911\uC774\uBA74 \uC138\uC158\uC774 \uC2DC\uC791 \uC2DC \uACE0\uC815\uD55C \uAC12\uACFC \uB2E4\uB97C \uC218 \uC788\uC74C",Er("impl_dispatch",n),Er("impl_runtime",r),Er("impl_model",o),Er("impl_effort",i),Er("impl_speed",s)])}}var Kh=Object.freeze(new Set(["push_not_contained","invalid_impl_review","premature_close","head_mismatch","foreign_deploy_unsupported","not_resolved"])),Gh=Object.freeze(["delivery_unproven:"]);function Pi(e){let t=e&&typeof e.reason=="string"?e.reason:"";if(t.length===0||Kh.has(t))return"session";for(let n of Gh)if(t.startsWith(n))return"session";return"settlement"}var Vh=["hard_diagnosis","invariant_reasoning","verification_by_judgment","claude_bound"];var Yh={hard_diagnosis:"\uC6D0\uC778\uC774 \uBD88\uBA85\uD655\uD558\uAC70\uB098 \uC7AC\uD604\uC774 \uBD88\uC548\uC815\uD574 \uAC00\uC124-\uAC80\uC99D \uB8E8\uD504\uAC00 \uD544\uC694\uD558\uB2E4",invariant_reasoning:"\uC815\uD569\uC131\uC774 \uC0C1\uD0DC\uAE30\uACC4\xB7\uB3D9\uC2DC\uC131\xB7\uBD88\uBCC0\uC2DD \uCD94\uB860\uC5D0 \uB2EC\uB824 \uC788\uB2E4",verification_by_judgment:"\uD14C\uC2A4\uD2B8\uAC00 \uBABB \uC7A1\uACE0 \uB9AC\uBDF0\uC5B4\uC758 \uCD94\uB860\uC73C\uB85C\uB9CC \uAC80\uC99D\uD560 \uC218 \uC788\uB2E4",claude_bound:"Claude \uC138\uC158 \uC790\uC0B0\xB7\uC758\uBBF8\uB860\uC5D0 \uAC15\uD558\uAC8C \uBB36\uC5EC \uC788\uB2E4"};function Sl(e){return(e&&Array.isArray(e.reasons)?e.reasons:[]).map(n=>Yh[n]||"").filter(n=>n.length>0)}var Yd={orchestration_model:["fable"],impl_runtime:["claude"]},El={unapplied:"\uBBF8\uC801\uC6A9",applied:"\uC801\uC6A9\uB428",diverged:"\uCD94\uCC9C\uACFC \uB2E4\uB984"};function Qd(e){return typeof e=="object"&&e!==null?e:null}function Xd(e,t){return typeof e=="string"&&t.includes(e)?e:""}function Qh(e){return typeof e!="string"?[]:e.split("+").map(t=>t.trim()).filter(t=>Vh.includes(t))}function fs(e,t=e){let n=Qd(e);if(!n)return null;let r=Xd(n.rec_orchestration_model,Yd.orchestration_model);if(r.length===0)return null;let o=Xd(n.rec_impl_runtime,Yd.impl_runtime),i={orchestration_model:r};o.length>0&&(i.impl_runtime=o);let s=Qd(t)||{},l=Object.keys(i),a=0,u=0;for(let f of l){let _=s[f];typeof _=="string"&&_.length>0&&(a+=1,_===i[f]&&(u+=1))}let d=a===0?"unapplied":u===l.length?"applied":"diverged";return{reasons:Qh(n.rec_reason),rec:i,state:d}}function Mi(e){if(!e||typeof e!="object")return"";let t=Sl(e),n=El[e.state]||"",r=["\uBCF5\uC7A1\uD55C \uC791\uC5C5\uC73C\uB85C \uD310\uC815\uB428"];return t.length>0&&r.push(`\uC0AC\uC720: ${t.join(" \xB7 ")}`),n.length>0&&r.push(`\uC0C1\uD0DC: ${n}`),r.join(`
`)}function Ni(e){return e.replace(/\/+$/,"")}function Xh(e,t){let n=Ni(e),r=Ni(t);return n===r||r.startsWith(`${n}/`)||n.startsWith(`${r}/`)}function qi(e,t){let n=new Set;for(let r of e)for(let o of t){if(!Xh(r,o))continue;let i=Ni(r),s=Ni(o);n.add(i.length>=s.length?i:s)}return[...n].sort()}function Tl(e,t){return`${e}\0${t}`}function Zd(e){let t=new Map;for(let n of Array.isArray(e?.running)?e.running:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"running",state:"running"});for(let n of Array.isArray(e?.pr_wait)?e.pr_wait:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"pr_wait",state:"pr_wait"});for(let n of Array.isArray(e?.queue_groups)?e.queue_groups:[]){let r=Array.isArray(n.sublanes?.parallel)?n.sublanes.parallel:Array.isArray(n.items)?n.items:[];for(let o of r)t.set(o.id,{root_dir:o.root_dir,workspace_name:o.workspace_name,lane:"parallel",position:o.queue_position});for(let o of Array.isArray(n.sublanes?.serial)?n.sublanes.serial:[])for(let i of o.items)t.set(i.id,{root_dir:i.root_dir,workspace_name:i.workspace_name,lane:o.id,position:i.queue_position})}for(let n of Array.isArray(e?.runnable)?e.runnable:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"runnable",state:"runnable"});for(let n of Array.isArray(e?.done)?e.done:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"done",state:"done"});return t}function ms(e,t){let n=Array.isArray(t)?t:[],r=e.indexOf("-"),o=r>0?e.slice(0,r):e;return n.some(i=>typeof i?.issue_prefix=="string"&&i.issue_prefix===o)?"internal":n.length>0&&n.every(i=>typeof i?.issue_prefix=="string")?"external":"unknown"}function _s(e){if(e.state==="running")return"\uC2E4\uD589\uC911";if(e.state==="pr_wait")return"PR \uB300\uAE30";if(e.state==="runnable")return"\uC2E4\uD589\uAC00\uB2A5";if(e.state==="done")return"\uC644\uB8CC";let t=e.lane==="parallel"?"\uBCD1\uB82C":e.lane;return`${e.workspace_name} \xB7 ${t} #${e.position}`}function Jd(e,t,n,r){let o=n.get(e);if(!!(o&&t&&o.root_dir===t.root_dir&&o.lane===t.lane&&typeof o.position=="number"&&typeof t.position=="number"&&o.position<t.position))return{id:e,label:`\u{1F512} ${e} (\uAC19\uC740 \uB808\uC778 \uC55E)`,location_label:"\uAC19\uC740 \uB808\uC778 \uC55E",scope:null,same_lane_ahead:!0};if(o)return{id:e,label:`\u{1F512} ${e} (${_s(o)})`,location_label:_s(o),scope:null,same_lane_ahead:!1};let s=ms(e,r),l=s==="internal"?"\uBBF8\uC801\uC7AC":s==="external"?"\uC678\uBD80":"\uC704\uCE58 \uBBF8\uD655\uC778";return{id:e,label:`\u{1F512} ${e} (${l})`,location_label:l,scope:s,same_lane_ahead:!1}}function ep(e){let t=Array.isArray(e)?e:[],n=new Map,r=new Map,o=new Map;for(let l of t)for(let a of Array.isArray(l.sublanes?.serial)?l.sublanes.serial:[]){let u=Tl(l.root_dir,a.id);n.set(u,{root_dir:l.root_dir,workspace_name:l.name,lane:a.id}),o.set(u,[]);for(let d of Array.isArray(a.items)?a.items:[])r.set(d.id,u)}for(let l of t)for(let a of Array.isArray(l.sublanes?.serial)?l.sublanes.serial:[]){let u=Tl(l.root_dir,a.id),d=Array.isArray(a.items)?a.items[0]:null,_=!!d&&d.queue_index===0&&(!Array.isArray(a.occupied_by)||a.occupied_by.length===0)&&Array.isArray(d.blocked_by)?d.blocked_by:[],y=o.get(u);if(y)for(let g of _){let C=r.get(g);C&&C!==u&&!y.includes(C)&&y.push(C)}}let i=(l,a)=>{let u=new Set,d=[l];for(;d.length>0;){let f=d.pop();if(f===a)return!0;!f||u.has(f)||(u.add(f),d.push(...o.get(f)||[]))}return!1},s=new Map;for(let[l,a]of o){let u=[];for(let d of a){let f=n.get(d);i(d,l)&&f&&u.push(f)}u.length>0&&s.set(l,u)}return s}function tp(e,t){return Tl(e,t)}var vn=e=>e??Jt;var Zh=Object.freeze(["done","abandoned"]);function np(e){return!e||typeof e!="object"||Array.isArray(e)?!1:typeof e.phase=="string"&&!Zh.includes(e.phase)}var Jh=".chip-popover, .judgement-chip";function Io(e){let t=null,n=!1;function r(d){return t!==null&&t.bead_id===d.bead_id&&t.chip_key===d.chip_key}function o(d){t=r(d)?null:{...d},e()}function i(){t!==null&&(t=null,e())}function s(d){let f=d.target;t!==null&&(f&&typeof f.closest=="function"&&f.closest(Jh)||i())}function l(d){d.key==="Escape"&&i()}function a(){n||(n=!0,document.addEventListener("click",s),document.addEventListener("keydown",l))}function u(){n&&(n=!1,document.removeEventListener("click",s),document.removeEventListener("keydown",l))}return{toggle:o,close:i,isOpen:r,attach:a,detach:u}}function Lo(e){return c`<div
    class="chip-popover"
    role="dialog"
    aria-label=${e.title}
  >
    <div class="chip-popover__title">${e.title}</div>
    <ul class="chip-popover__lines">
      ${e.lines.map(t=>c`<li>${t}</li>`)}
    </ul>
  </div>`}async function $n(e){let t=String(e);if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")try{return await navigator.clipboard.writeText(t),!0}catch{}try{let n=document.createElement("textarea");n.value=t,n.style.position="fixed",n.style.left="-9999px",document.body.appendChild(n),n.select();let r=!1;try{r=document.execCommand("copy")}finally{n.remove()}return r}catch{return!1}}async function eb(e){let t=await $n(e);ye(t?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",t?"success":"error",1200)}function Xr(e){return typeof e!="string"||e.length===0?"":c`<span class="worker-ev__copyline"
    ><code class="worker-ev__path">${e}</code
    ><button
      type="button"
      class="worker-ev__copy"
      data-seam="log-path-copy"
      title="로그 경로 복사"
      aria-label=${`\uB85C\uADF8 \uACBD\uB85C \uBCF5\uC0AC: ${e}`}
      @click=${()=>{eb(e)}}
    >
      ⧉
    </button></span
  >`}var rp=Object.freeze(["spec_backed","full_plan","quick_fix"]);var tb="worker-ineligible";function gs(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function op(e){return gs(e).includes(tb)}var nb=new Set(rp),sp=new WeakMap;function Do(e){return e&&typeof e=="object"?e:{}}function rb(e){let t=sp.get(e);if(t)return t;let n=ap(e);return sp.set(e,n),n}function ji(e,t){return(Array.isArray(e)?e:[]).findIndex(r=>r&&r.bead_id===t)}function ob(e,t){if(e.length===0)return null;if(rb(t).has(e))return{lane:"running"};if(ji(t.pr_wait,e)>=0)return{lane:"pr_wait"};let n=ji(t.queue,e);if(n>=0)return{lane:"parallel",index:n};for(let r of Array.isArray(t.serial_lanes)?t.serial_lanes:[]){if(!r||typeof r.id!="string"||!/^s[1-5]$/.test(r.id))continue;let o=ji(r.entries,e);if(o>=0)return{lane:r.id,index:o}}return ji(t.done,e)>=0?{lane:"done"}:null}function Cl(e,t){let n=nb.has(e.route),r=e.route==="quick_fix";return{placeable:n&&!e.worker_ineligible&&!e.awaiting_user&&(r?e.has_description:e.spec==="published")&&t===null,route_ok:n,worker_ineligible:e.worker_ineligible,awaiting_user:e.awaiting_user,missing_description:r&&!e.has_description,spec:e.spec,location:t}}function hs(e,t){let n=Do(e),r=Do(t),o=ho(n),i=n.workflow?.route_source==="explicit"&&typeof n.workflow.route=="string"&&n.workflow.route||(typeof Do(n.metadata).route=="string"?Do(n.metadata).route:""),s=i==="quick_fix",l=!Object.hasOwn(n,"description")||typeof n.description=="string"&&n.description.trim().length>0,a=Object.hasOwn(n,"labels")&&op(n.labels),u=Object.hasOwn(Do(n.metadata),"awaiting_user"),d=ob(typeof n.id=="string"?n.id:"",r);return Cl({route:i,spec:s?"n/a":o.conflict?"conflict":o.evidence,has_description:l,awaiting_user:u,worker_ineligible:a},d)}function Zr(e){let t=e.location;if(t)switch(t.lane){case"running":return"\uC2E4\uD589 \uC911\uC774\uB77C \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4";case"pr_wait":return"PR \uB300\uAE30 \uC911\uC774\uB77C \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4";case"done":return"\uC644\uB8CC \uB808\uC778\uC5D0 \uC788\uC5B4 \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4";case"parallel":return`\uC774\uBBF8 \uB300\uAE30 \uC911 \xB7 \uBCD1\uB82C #${t.index+1}`;default:return`\uC774\uBBF8 \uB300\uAE30 \uC911 \xB7 \uC9C1\uB82C ${t.lane.slice(1)} #${t.index+1}`}return e.placeable?"\uB300\uAE30 \uD050 \uB9E8 \uB4A4\uC5D0 \uCD94\uAC00":e.route_ok===!1?"route\uAC00 \uC815\uD574\uC9C0\uC9C0 \uC54A\uC544 \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":e.worker_ineligible?"worker-ineligible label\uB85C \uC6CC\uCEE4\uC5D0\uC11C \uC2E4\uD589\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":e.awaiting_user?"\uC0AC\uC6A9\uC790 \uB9AC\uBDF0\uB97C \uAE30\uB2E4\uB9AC\uB294 \uC911\uC774\uB77C \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":e.missing_description?"description\uC774 \uC5C6\uC5B4 \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":e.spec==="conflict"?"spec \uACBD\uB85C\uAC00 \uCDA9\uB3CC\uD574 \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"spec\uC774 \uBC1C\uD589\uB418\uC9C0 \uC54A\uC544 \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"}function bs(e){let t=Do(e),n=typeof t.serial_lane_count=="number"&&Number.isInteger(t.serial_lane_count)&&t.serial_lane_count>0?Math.min(t.serial_lane_count,5):0,r=Array.isArray(t.serial_lanes)?t.serial_lanes:[],o=[];for(let s of r){if(o.length>=n)break;!s||typeof s.id!="string"||!/^s[1-5]$/.test(s.id)||!Array.isArray(s.entries)||o.push({id:s.id,label:`\uC9C1\uB82C ${s.id.slice(1)}`,count:s.entries.length})}return o.length===0?null:[{id:"parallel",label:"\uBCD1\uB82C",count:(Array.isArray(t.queue)?t.queue:[]).length},...o]}function ip(e){return/^s[1-5]$/.test(e)?`\uC9C1\uB82C ${e.slice(1)}`:"\uBCD1\uB82C"}function Ui(e){return typeof e=="string"&&e.length>=7?e.slice(0,7):"\u2014"}function up(e){return e==="session"?"bead\uAC00 in_progress\uB85C \uC7A1\uD78C \uB4A4 \uB2EB\uD788\uAE30\uAE4C\uC9C0\uC758 \uACBD\uACFC":"attempt \uC2E4\uD589 \uC2DC\uAC04 \uD569\uC0B0 (\uC7AC\uAC1C \uC138\uC158 \uD3EC\uD568)"}function Jr(e){if(typeof e!="number"||!Number.isFinite(e)||e<0)return"\u2014";if(e<1e3)return`${Math.round(e)}ms`;let t=e/1e3;if(t<60)return`${t.toFixed(1)}\uCD08`;let n=Math.floor(t/60);if(n<60)return`${n}\uBD84 ${Math.round(t-n*60)}\uCD08`;let r=Math.floor(n/60),o=n%60;return`${r}\uC2DC\uAC04 ${o}\uBD84`}function dp(e,t){if(typeof e!="object"||e===null)return[];let n=!1,r=!1;for(let o of Object.values(e)){if(typeof o!="object"||o===null)continue;let i=o;i.bead_id!==t||i.kind!=="review_session"||(n=!0,r=r||i.origin==="auto")}return n?[r?"\uB9AC\uBDF0 \xB7 \uC790\uB3D9":"\uB9AC\uBDF0"]:[]}function lp(e){return e==="auto"||e==="click"?e:null}function pp(e,t){if(typeof e!="object"||e===null)return{active:!1,failure:null,origin:null};let n=!1,r=null,o=-1,i=null,s=null,l=-1;for(let a of Object.values(e)){if(typeof a!="object"||a===null)continue;let u=a;if(u.bead_id!==t||u.kind!=="review_session")continue;if(u.status==="pending"||u.status==="running"){n=!0;let f=typeof u.started_at=="number"?u.started_at:0;f>=o&&(o=f,r=lp(u.origin));continue}if(u.status!=="failed")continue;let d=typeof u.finished_at=="number"?u.finished_at:0;d>=l&&(l=d,i=typeof u.cause=="string"&&u.cause.length>0?u.cause:null,s=lp(u.origin))}return n?{active:!0,failure:null,origin:r}:{active:!1,failure:i,origin:s}}function fp(e,t){if(typeof e!="object"||e===null)return null;let n=0,r=!1;for(let o of Object.values(e)){if(typeof o!="object"||o===null)continue;let i=o;if(i.bead_id!==t)continue;let s=i.started_at,l=i.finished_at;typeof s!="number"||typeof l!="number"||!Number.isFinite(s)||!Number.isFinite(l)||l<s||(n+=l-s,r=!0)}return r?n:null}function Wi(e){if(typeof e!="number"||!Number.isFinite(e)||e<=0)return"";let t=new Date(e);return`${String(t.getHours()).padStart(2,"0")}:${String(t.getMinutes()).padStart(2,"0")}`}function sb(e,t){let n=Array.isArray(e)?e:[],r=Array.isArray(t)?t:[];if(n.length===0&&r.length===0)return null;let o=null;for(let s of n)s.kind!=="deploy"||s.state!=="succeeded"||typeof s.target_sha!="string"||(!o||(typeof s.finished_at=="number"?s.finished_at:0)>(typeof o.finished_at=="number"?o.finished_at:0))&&(o=s);let i=n.filter(s=>s.state==="failed"&&!s.dismissed&&!s.superseded_by).length+r.length;return{deploy:o?{sha:Ui(o.target_sha),at:typeof o.finished_at=="number"?o.finished_at:null,elapsed_ms:typeof o.elapsed_ms=="number"?o.elapsed_ms:null}:null,unresolved:i,badge:i>0?{tone:"act",label:`\uD574\uACB0 \uD544\uC694 ${i}`}:{tone:"quiet",label:"\uBAA8\uB450 \uC815\uC0C1"}}}function _p(e,t){let n=sb(e,t);return n?c`<button
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
            title=${n.deploy.at?rn(n.deploy.at):""}
            >${Wi(n.deploy.at)}${n.deploy.elapsed_ms!==null?` \xB7 ${Jr(n.deploy.elapsed_ms)}`:""}</span
          >
        </span>`:""}
    <span class="worker-repo-strip__spacer"></span>
    <span
      class="worker-repo-strip__badge worker-repo-strip__badge--${n.badge.tone}"
      >${n.badge.label}</span
    >
  </button>`:""}function Po(e){let t=wn(e.created_at),n=wn(e.updated_at);return!t&&!n?"":c`<div class="worker-mini__meta">
    ${t?c`<span title=${`\uC0DD\uC131 ${rn(e.created_at)}`}
          >생성 ${t}</span
        >`:""}${t&&n?c`<span>·</span>`:""}${n?c`<span title=${`\uC218\uC815 ${rn(e.updated_at)}`}
          >수정 ${n}</span
        >`:""}
  </div>`}function ib(e){return!e||e==="requested"?"\uBC31\uC5C5 \uC911":e==="abandoned"?"\uD3D0\uAE30 \uD3EC\uAE30\uB428":e==="backup_verified"||e==="signaled"?"runner \uC885\uB8CC \uC911":e==="merged_revert"||e.startsWith("revert_")?"revert PR \uB300\uAE30":e.startsWith("rollback_")?"\uC6D0\uBCF5 \uBC30\uD3EC \uC911":e==="runner_terminated"||e.startsWith("pr_")||e.includes("ref_")||e.includes("worktree")||e.startsWith("bead_")?"PR \uC815\uB9AC \uC911":`\uD3D0\uAE30 \uCC98\uB9AC \uC911 (${e})`}function vs(e,t){return t==="merged"?`${e}: \uC774\uBBF8 merge\uB41C \uAD6C\uD604\uC785\uB2C8\uB2E4. \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 revert PR\uC744 \uC0DD\uC131\uD558\uBA70, \uC2E4\uC81C \uC6D0\uBCF5\uC740 \uC0AC\uB78C\uC774 \uADF8 PR\uC744 merge\uD55C \uB4A4 \uC644\uB8CC\uB429\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`:`${e}: \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 runner/PR/branch/worktree\uB97C \uC815\uB9AC\uD558\uACE0 \uC774\uC288\uB97C \uD6C4\uBCF4\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`}function ks(e,t){return t.kind==="stale_work_backup_fresh"?`${e}: \uC2E4\uD328\uD55C \uBC31\uC5C5 \uC791\uC5C5\uC744 \uD3EC\uAE30\uD569\uB2C8\uB2E4. \uBC31\uC5C5\uC740 \uB9CC\uB4E4\uC5B4\uC9C0\uC9C0 \uC54A\uC558\uACE0 \uAE30\uC874 \uC791\uC5C5\uC740 \uADF8\uB300\uB85C \uB0A8\uC2B5\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`:`${e}: \uC2E4\uD328\uD55C \uD3D0\uAE30 \uC791\uC5C5\uC744 \uD3EC\uAE30\uD569\uB2C8\uB2E4. \uBC31\uC5C5\uACFC \uD3D0\uAE30\uB294 \uC218\uD589\uB418\uC9C0 \uC54A\uC558\uACE0 bead\uB294 \uD3D0\uAE30 \uC774\uC804 \uC0C1\uD0DC\uB85C \uB3CC\uC544\uAC11\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`}function Hi(e){return e.kind==="stale_work_backup_fresh"?`\uBC31\uC5C5 \uD3EC\uAE30\uB428 \xB7 \uAE30\uC874 \uC791\uC5C5\uC740 \uADF8\uB300\uB85C \uB0A8\uC2B5\uB2C8\uB2E4 (\uC6D0\uC778: ${e.last_error})`:`\uD3D0\uAE30 \uD3EC\uAE30\uB428 \xB7 \uD3D0\uAE30\uB294 \uC218\uD589\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4 (\uC6D0\uC778: ${e.last_error})`}function zi(e){let t=["\uD3D0\uAE30 \uC644\uB8CC"];return e.operation_id&&t.push(`\uC791\uC5C5 ${e.operation_id}`),e.receipt?.archive_path&&t.push(`\uBC31\uC5C5 ${e.receipt.archive_path}`),e.receipt?.original_pr?.url&&t.push(`\uC6D0\uBCF8 PR ${e.receipt.original_pr.url}`),e.receipt?.revert_pr?.url&&t.push(`revert PR ${e.receipt.revert_pr.url}`),t.join(" \xB7 ")}function mp(e){return e?.startsWith("orphan_gitlink_content:")?`\uB9E4\uD551 \uC5C6\uB294 gitlink \uACBD\uB85C ${e.slice(23)}\uC5D0 \uB0B4\uC6A9\uC774 \uC788\uC2B5\uB2C8\uB2E4 \u2014 \uC800\uC7A5\uC18C\uC5D0\uC11C \uADF8 \uACBD\uB85C\uB97C \uC815\uB9AC\uD55C \uB4A4 \uC7AC\uC2DC\uB3C4\uD558\uAC70\uB098 \uD3EC\uAE30\uD558\uC138\uC694`:e==="dirty_submodule"?"\uC11C\uBE0C\uBAA8\uB4C8\uC5D0 \uBBF8\uCEE4\uBC0B \uBCC0\uACBD\uC774\uB098 \uBBF8\uCD08\uAE30\uD654 \uD56D\uBAA9\uC774 \uC788\uC2B5\uB2C8\uB2E4 \u2014 \uC815\uB9AC \uD6C4 \uC7AC\uC2DC\uB3C4\uD558\uC138\uC694":e==="submodule_observation_failed"?"\uC11C\uBE0C\uBAA8\uB4C8 \uC0C1\uD0DC\uB97C \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 (git \uC624\uB958) \u2014 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C git \uBA85\uB839\uC744 \uC9C1\uC811 \uD655\uC778\uD558\uC138\uC694":null}function pr(e,t,n={}){let o=Object.values(e&&typeof e=="object"?e:{}).filter(_=>_&&_.bead_id===t&&np(_)).sort((_,y)=>(_.requested_at||0)-(y.requested_at||0)).at(-1),i=typeof n.attempt_id=="string"&&n.attempt_id.length>0?n.attempt_id:typeof o?.attempt_id=="string"?o.attempt_id:null,s=n.external?"\uC678\uBD80 PR\uC740 Worker\uAC00 \uC18C\uC720\uD558\uC9C0 \uC54A\uC544 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":n.done?"\uC644\uB8CC\uB41C \uC791\uC5C5\uC740 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":n.merge_active?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":n.merge_queued?"\uBA38\uC9C0 \uD050\uC5D0 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 [\uCDE8\uC18C]\uD558\uC138\uC694":n.conflict_active?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 \uC138\uC158\uC744 \uC815\uB9AC\uD558\uC138\uC694":n.cleanup_active?"\uC815\uB9AC \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":null,l=typeof o?.last_error=="string"?o.last_error:null,a=o?ib(o.phase):null,u=o?.kind==="stale_work_backup_fresh",d=mp(l),f=n.merged||o?.mode==="merged_revert"?"merged":"unmerged";return{action:!n.external&&!n.done,enabled:!s&&(!o||!!l),label:u?l?"\uBC31\uC5C5 \uC815\uB9AC \uC7AC\uC2DC\uB3C4":"\uBC31\uC5C5 \uD6C4 \uC0C8\uB85C \uC2DC\uC791":l?"\uC7AC\uC2DC\uB3C4":"\uD3D0\uAE30",title:s||(l?d?`\uD3D0\uAE30 \uC2E4\uD328: ${l} \u2014 ${d}`:u?`\uBC31\uC5C5 \uB4A4 \uC815\uB9AC \uC2E4\uD328: ${l} \u2014 \uC6D0\uBCF8\uACFC \uAC80\uC99D \uC601\uC218\uC99D\uC744 \uBCF4\uC874\uD55C \uCC44 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:`\uD3D0\uAE30 \uC2E4\uD328: ${l} \u2014 \uAC19\uC740 \uC791\uC5C5\uC744 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:o?`${a||"\uD3D0\uAE30 \uCC98\uB9AC \uC911"} \u2014 \uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694`:f==="merged"?"\uBCD1\uD569\uB41C \uBCC0\uACBD\uC744 \uC6D0\uBCF5 PR\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4":"\uBC31\uC5C5 \uD6C4 runner\xB7PR\xB7\uC6CC\uD06C\uD2B8\uB9AC\xB7\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4"),attempt_id:i,operation:o||null,progress:a,error:l,confirmation:f,abandon:{action:!!o&&o.phase==="requested"&&!!l,label:u?"\uBC31\uC5C5 \uD3EC\uAE30":"\uD3D0\uAE30 \uD3EC\uAE30",title:u?"\uC2E4\uD328\uD55C \uBC31\uC5C5 \uC791\uC5C5\uC744 \uD3EC\uAE30\uD569\uB2C8\uB2E4 \u2014 \uC6D0\uBCF8\uC740 \uADF8\uB300\uB85C \uB0A8\uACE0 \uC0C8\uB85C \uC2DC\uC791\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4":"\uC2E4\uD328\uD55C \uD3D0\uAE30 \uC791\uC5C5\uC744 \uD3EC\uAE30\uD569\uB2C8\uB2E4 \u2014 \uBC31\uC5C5\xB7\uD3D0\uAE30\uB294 \uC218\uD589\uB418\uC9C0 \uC54A\uC558\uACE0 bead\uB294 \uD3D0\uAE30 \uC774\uC804 \uC0C1\uD0DC\uB85C \uB3CC\uC544\uAC11\uB2C8\uB2E4"}}}function gp(e){if(!e||e.quickfix_lane!==!0)return!1;let t=e.quickfix_landing;return!t||typeof t!="object"?!1:["repo_operations","branch_cleanup","parent_close"].includes(t.cursor)}function Bi(e){let t=e.discard;if(!t||!t.operation)return"";let n=t.operation,r=mp(t.error),o=n.kind==="stale_work_backup_fresh"&&!t.error?null:n.backup?.path,i=n.original_pr,s=n.revert_pr;return c`<div
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
  </div>`}var ab={dirty_unique:"\uCD5C\uC2E0 base\uC5D0 \uC5C6\uB294 \uB85C\uCEEC \uBCC0\uACBD\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",untracked_present:"\uCD94\uC801\uB418\uC9C0 \uC54A\uC740 \uD30C\uC77C\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",branch_ahead:"\uB85C\uCEEC branch\uC5D0 \uACE0\uC720 commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",head_ahead:"worktree HEAD\uC5D0 \uACE0\uC720 commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",ahead_not_contained:"\uB85C\uCEEC branch\uC758 \uACE0\uC720 commit\uC774 \uCD5C\uC2E0 base\uC5D0 \uD3EC\uD568\uB410\uC74C\uC744 \uC99D\uBA85\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",ahead_merge_commit:"\uB85C\uCEEC branch\uC5D0 \uC790\uB3D9 \uC815\uB9AC\uD560 \uC218 \uC5C6\uB294 merge commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",ahead_submodule_path:"\uB85C\uCEEC branch\uC758 \uACE0\uC720 commit\uC774 submodule \uACBD\uB85C\uB97C \uBCC0\uACBD\uD569\uB2C8\uB2E4",archive_failed:"\uACE0\uC720 commit \uBC31\uC5C5\uC744 \uC548\uC804\uD558\uAC8C \uAC80\uC99D\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",ref_delete_failed:"\uD655\uC778\uB41C local branch\uB97C \uC548\uC804\uD558\uAC8C \uC0AD\uC81C\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",resume_available:"\uC774\uC5B4\uAC08 \uC218 \uC788\uB294 \uC774\uC804 Worker session\uC774 \uC788\uC2B5\uB2C8\uB2E4",observe_failed:"Git \uC0C1\uD0DC\uB97C \uC548\uC804\uD558\uAC8C \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",identity_changed:"\uD655\uC778 \uC911 worktree \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4",ownership_unknown:"Worker \uC18C\uC720 worktree\uC778\uC9C0 \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"};function hp(e,t=!1){if(!e||typeof e!="object")return null;let n=e;if(n.reason!=="worktree_stale_work"||!n.stale_work||typeof n.stale_work!="object")return null;let r=n.stale_work,o=r.action_id;if(typeof o!="string"||o.length===0)return null;let i=r.residue==="branch"?"branch":"worktree",s=r.state==="unique"?"unique":"unknown",l=r.summary&&typeof r.summary=="object"?r.summary:{};function a(d){return Number.isInteger(l[d])?Number(l[d]):0}let u=typeof r.cause=="string"?r.cause:"observe_failed";return{residue:i,state:s,title:i==="branch"?"\uC774\uC804 \uBE0C\uB79C\uCE58 \uBCF4\uC874\uB428":s==="unique"?"\uC774\uC804 \uC791\uC5C5 \uBCF4\uC874\uB428":"\uC774\uC804 \uC791\uC5C5 \uC0C1\uD0DC \uD655\uC778 \uC2E4\uD328",cause:ab[u]||"\uC548\uC804\uD558\uAC8C \uC790\uB3D9 \uC815\uB9AC\uD560 \uC218 \uC5C6\uB294 \uC774\uC804 \uC791\uC5C5\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",summary:i==="branch"?`\uACE0\uC720 commit ${a("branch_ahead")}`:[`staged ${a("staged_count")}`,`unstaged ${a("unstaged_count")}`,`untracked ${a("untracked_count")}`,`branch ahead ${a("branch_ahead")}`,`HEAD ahead ${a("head_ahead")}`].join(" \xB7 "),action_id:o,can_resume:r.can_resume===!0,can_continue:r.can_continue===!0,can_backup_fresh:r.can_backup_fresh===!0,can_recheck:r.can_recheck===!0,locked:t}}function eo(e,t={}){if(!e||!e.orchestration&&!e.worker)return"";let n=t.pin===!0?" exec-chip--pin":"",r=t.pin===!0?`
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
      >`:""}`}function ys(e,t){let n=`worker-dep worker-dep--${t}${e.foreign?" worker-dep--foreign":""}`;return e.openable===!0?c`<button
        type="button"
        class=${`${n} worker-dep__open`}
        data-dep-id=${e.id}
        data-root-dir=${e.root_dir||""}
        title=${e.title||""}
      >
        ${e.label}
      </button>`:c`<span class=${n} title=${e.title||""}>${e.label}</span>`}function lb(e){return{id:e.id,label:`\u29C9 ${e.id}`,title:[`\uACB9\uCE68 \xB7 ${e.location_label}`,...e.prefixes].join(`
`),openable:!0,...e.root_dir?{root_dir:e.root_dir}:{}}}function Rl(e){return Array.isArray(e)?e.slice().sort((t,n)=>t.id<n.id?-1:t.id>n.id?1:0):[]}function cb(e,t=!1){return e?c`<button
    type="button"
    class="ctl-chip ctl-chip--label judgement-chip worker-card__spec-after-blocker"
    data-chip-key="spec_after_blocker"
    aria-expanded=${t?"true":"false"}
    title="선행의 결과가 설계 전제라 스펙도 선행 뒤에 씁니다"
  >
    스펙 대기
  </button>`:""}function bp(e){if(!Object.hasOwn(e,"route_ok")||e.queue_placeable===!0)return null;let t="";return e.route_ok===!1&&(t="\uB77C\uC6B0\uD305 \uD544\uC694"),t.length===0&&(e.worker_ineligible===!0||e.awaiting_user===!0)||(t.length===0&&e.missing_description===!0?t="\uBCF8\uBB38 \uD544\uC694":t.length===0&&e.placement_spec==="conflict"?t="\uC2A4\uD399 \uCDA9\uB3CC":t.length===0&&Object.hasOwn(e,"placement_spec")&&e.placement_spec!=="published"&&(t="\uC2A4\uD399 \uBBF8\uBC1C\uD589"),t.length===0)?null:{label:t,title:Zr({placeable:!1,route_ok:e.route_ok,worker_ineligible:e.worker_ineligible===!0,awaiting_user:e.awaiting_user===!0,missing_description:e.missing_description===!0,spec:e.placement_spec})}}function ub(e,t){return e?c`<button
    type="button"
    class="ctl-chip ctl-chip--label judgement-chip worker-card__readiness"
    data-chip-key="readiness"
    aria-expanded=${t?"true":"false"}
    title=${e.title}
  >
    ${e.label}
  </button>`:""}function Ki(e,t=""){if(!e)return t===""?"":c`<div class="worker-deps worker-deps--primary">
          ${t}
        </div>`;let n=Rl(e.predecessors),r=Array.isArray(e.released)?e.released:[],o=Rl(e.dependents),i=Rl(e.overlaps),s=e.scope_missing===!0,l=e.armed_lane||null,a=!!l||n.length>0||o.length>0||t!=="",u=r.length>0||i.length>0||s;return!a&&!u?"":c`${a?c`<div class="worker-deps worker-deps--primary">
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
            >`:""}${n.map(d=>ys(d,"pred"))}${t}${o.map(d=>ys(d,"dependents"))}
      </div>`:""}${u?c`<div class="worker-deps worker-deps--secondary">
        ${r.map(d=>ys(d,"released"))}${i.map(d=>ys(lb(d),"overlap"))}${s?c`<span
              class="worker-dep worker-dep--muted"
              title="겹침 판정 불가 — 아티팩트가 있으면 스펙/플랜 front-matter, 없으면 description \`## scope\`에 선언 필요"
              >scope 없음</span
            >`:""}
      </div>`:""}`}function yp(e,t=""){let n=(Array.isArray(e)?e:[]).filter(r=>typeof r=="string"&&r!=="").slice().sort();return n.length===0?"":c`<div class="worker-deps worker-deps--secondary">
    ${n.map(r=>ys({id:r,label:`\uC774\uC6D4 \u2192 ${r}`,title:`\uC774\uC6D4\uB41C \uD6C4\uC18D ${r} \uC5F4\uAE30`,openable:!0,...t?{root_dir:t}:{}},"dependents"))}
  </div>`}function Gi(e){return e?c`<button
    type="button"
    class="worker-dep worker-dep--lane mon-lane__chip"
    data-lane-id=${e.lane_id}
    title="이 연결 레인으로 이동"
  >
    ${e.label}
  </button>`:""}function to(e){let t=ql(e);if(t===null)return"";let n=t==="unset";return c`<span
    class="ctl-chip ctl-chip--route${n?" is-derived":""}"
    title=${n?"route \uBBF8\uD540 (metadata unset)":"route"}
    >${t}</span
  >`}function db(e,t=!1){let n=e?e.quick_fix_review:null;if(!n)return"";let r=n.state;if(r!=="reviewed"&&r!=="stale")return"";let o=Array.isArray(n.missing)?n.missing:[],i=[r==="reviewed"?"quick_fix self-review \uC601\uC218\uC99D\uC774 \uC9C0\uAE08 \uBCF8\uBB38\uACFC \uC77C\uCE58\uD569\uB2C8\uB2E4":"quick_fix self-review \uC601\uC218\uC99D\uC774 \uC9C0\uAE08 \uBCF8\uBB38\uACFC \uB2E4\uB985\uB2C8\uB2E4",...o].join(`
`);return c`<button
    type="button"
    class="ctl-chip judgement-chip worker-card__qfr worker-card__qfr--${r}"
    data-chip-key="qfr"
    aria-expanded=${t?"true":"false"}
    title=${i}
  >
    ${r==="reviewed"?"\uB9AC\uBDF0 \u2713":"\uB9AC\uBDF0 stale"}
  </button>`}function vp(e){return e?c`<button
    type="button"
    class="ctl-chip ctl-chip--from"
    data-from-id=${e}
    title=${`\uCD9C\uCC98 ${e} \uC5F4\uAE30`}
  >
    ↩ from ${e}
  </button>`:""}function Vi(e,t=!1){return e?c`<button
    type="button"
    class="ctl-chip ctl-chip--label judgement-chip worker-card__rec"
    data-chip-key="rec"
    data-state=${e.state}
    aria-expanded=${t?"true":"false"}
    title=${Mi(e)}
  >
    ${"\uBCF5\uC7A1"}
  </button>`:""}var pb={absent:"\uC2E4\uD589 \uC601\uC218\uC99D\uC774 \uAE30\uB85D\uB418\uC9C0 \uC54A\uC558\uB2E4 \u2014 \uACFC\uAC70 Bead\xB7\uC678\uBD80 \uACBD\uB85C PR\uC740 \uC6D0\uB798 \uC5C6\uB2E4",unparsable:"\uC601\uC218\uC99D \uAC12\uC744 \uC77D\uC744 \uC218 \uC5C6\uB2E4 \u2014 40hex SHA\uB098 `delegated:`/`main:` \uD615\uC2DD\uC774 \uC544\uB2C8\uB2E4",effort_unknown:"effort \uD1A0\uD070\uC774 harness \uC5B4\uD718 \uBC16\uC774\uB2E4 \u2014 \uBAA8\uB378\xB7SHA\xB7unit\uC740 \uC720\uD6A8\uD558\uB2E4",main_reason_retired:"`main:` \uC0AC\uC720\uAC00 \uACE0\uC815 4\uD1A0\uD070(bead\xB7quick_fix_default\xB7phase_line\xB7takeover) \uBC16\uC774\uB2E4",main_receipt_unbacked:"`main:` \uC0AC\uC720\uB97C \uB4B7\uBC1B\uCE68\uD558\uB294 \uBA54\uD0C0\uB370\uC774\uD130(impl_dispatch\xB7route\xB7planned_execution\xB7quick_fix \uAE30\uBCF8 dispatch)\uAC00 \uC5C6\uB2E4",takeover_lineage_missing:"`main:takeover`\uC778\uB370 resolved \uBAA8\uB378\uACFC \uC77C\uCE58\uD558\uB294 \uC644\uB8CC\uB41C \uC704\uC784 \uC138\uC158\uC774 \uC5C6\uB2E4",takeover_lineage_unobservable:"`main:takeover`\uC778\uB370 \uC704\uC784 \uACC4\uBCF4\uB97C \uBAA8\uB2C8\uD130\uAC00 \uBCFC \uC218 \uC5C6\uB2E4(Codex \uBC16 \uB7F0\uD0C0\uC784)"};function fb(e,t=!1){let n=kp(e);if(n.length===0)return"";let r=n.length>1?`\uC601\uC218\uC99D \xB7 ${n[0]} +${n.length-1}`:`\uC601\uC218\uC99D \xB7 ${n[0]}`;return c`<button
    type="button"
    class="ctl-chip ctl-chip--label judgement-chip worker-card__receipt"
    data-chip-key="receipt"
    data-bead-id=${e.id}
    aria-expanded=${t?"true":"false"}
    title=${n.join(", ")}
  >
    ${r}
  </button>`}function kp(e){let t=e.receipt_badge?e.receipt_badge.codes:null;return Array.isArray(t)?t.filter(n=>typeof n=="string"&&n.length>0):[]}function wp(e,t){return!e||typeof t!="number"?"":c`<a
    class="worker-mini__pr"
    href=${e}
    target="_blank"
    rel="noreferrer noopener"
    title="PR 열기"
    >#${t} ↗</a
  >`}function Yi(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=Math.max(0,Math.min(4,Math.trunc(e)));return c`<span class="worker-pri" title=${`\uC6B0\uC120\uC21C\uC704 P${t}`}
    >P${t}</span
  >`}function _b(e){let t=Array.isArray(e.badges)?e.badges:[],n=gn(e.usage),r=cr(e.usage),o=wn(e.done_at);return c`<div
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
      ${wp(e.pr_url,e.pr_number)}${o?c`<span
            class="worker-mini__done-at"
            title=${`\uC644\uB8CC ${rn(e.done_at)}`}
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
    ${yp(e.carried_to,e.root_dir)}
    <div class="worker-mini__row3">
      ${to(e.workflow)}${e.exec_chips?eo(e.exec_chips):""}${n.length>0?n.map(i=>c`<span class="worker-usage" title=${i.tooltip}
                >${i.label}</span
              >`):r?c`<span class="worker-usage" title=${ss(e.usage)}
              >${r}</span
            >`:""}
      ${typeof e.work_ms=="number"?c`<span
            class="worker-mini__work"
            title=${up(e.work_kind)}
            >작업 ${Jr(e.work_ms)}</span
          >`:""}
    </div>
  </div>`}function Qi(e,t){return typeof e=="number"?e+xp-t:0}function Il(e,t=Date.now()){let n=Qi(e,t);return n<=0?"":c`<span
    class="worker-dep worker-dep--grace"
    title="대기에 막 들어온 항목입니다 — 남은 시간 동안 자동 실행이 미뤄집니다"
    >⏳ ${Math.ceil(n/1e3)}초</span
  >`}function Ll(e,t=Date.now()){return Qi(e.added_at,t)<=0?"":c`<button
    type="button"
    class="op-btn worker-mini__start-now"
    data-action="queue-start-now"
    data-bead-id=${e.id}
    title="대기 진입 유예를 이 항목에 대해서만 걷고 지금 실행합니다"
  >
    지금 시작
  </button>`}function Mo(e,t={}){if(!(e.draggable!==!0||e.done===!0))return c`<span class="worker-mini__rowops">
    ${Ll(e)}${t.nudgeable===!0?c`<button
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
  </span>`}function Wn(e,t={}){if(e.lane==="done"&&e.done_layout==="three_line")return _b(e);let n=e.draggable&&!e.done,r=Array.isArray(e.badges)?e.badges:[],o=gn(e.usage),i=cr(e.usage),s=e.merge_step||null,l=e.lane==="pr_wait"||!!e.revise_action||!!e.stale_work||e.discard?.abandon.action===!0,a=e.lane==="done"&&!l,u=a?wn(e.done_at):"",d=n?c`<span class="worker-mini__grip" aria-hidden="true">⠿</span>`:"",f=typeof e.seq=="number"?c`<span class="worker-mini__seq" aria-hidden="true"
          >${e.seq}</span
        >`:"",_=e.workspace_name?c`<span class="worker-mini__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:"",y=c`<span class="worker-mini__id" title="클릭하면 ID 복사"
    >${e.id}</span
  >`,g=to(e.workflow),C=e.lane==="done"?"":vp(e.from_id),k=Yi(e.priority),X=c`<span class="worker-mini__title">${e.title}</span>`,ae=wp(e.pr_url,e.pr_number),H=r.map(G=>G===e.live_badge?c`<span
          class="worker-mini__badge worker-mini__badge--activity"
          title="서버가 이 PR을 처리하는 중입니다"
          ><span class="act-dot" aria-hidden="true"></span>${G}</span
        >`:c`<span
          class="worker-mini__badge${e.alert?" worker-mini__badge--alert":""}"
          title=${G===e.completion_badge&&e.completion_title||""}
          >${G}</span
        >`),N=e.reason?c`<span class="worker-mini__reason">${e.reason}</span>`:"",P=o.length>0?o.map(G=>c`<span class="worker-usage" title=${G.tooltip}
              >${G.label}</span
            >`):i?c`<span class="worker-usage" title=${ss(e.usage)}
            >${i}</span
          >`:"",j=s?c`<span
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
      </button>`:"",W=e.cancel_action?c`<button
        type="button"
        class="worker-mini__merge-cancel"
        data-bead-id=${e.id}
        ?disabled=${e.cancel_enabled===!1}
        title=${e.cancel_title||""}
      >
        취소
      </button>`:"",T=e.discard,S=T?.action||e.discard_action?c`<button
          type="button"
          class="worker-mini__discard"
          data-bead-id=${e.id}
          data-attempt-id=${T?.attempt_id||""}
          data-operation-id=${T?.operation?.operation_id||""}
          data-discard-mode=${T?.confirmation||"unmerged"}
          ?disabled=${T?!T.enabled:e.discard_enabled===!1}
          title=${T?T.title:e.discard_enabled===!1?e.discard_title||"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"PR\uC744 \uB2EB\uACE0 \uC6CC\uD06C\uD2B8\uB9AC/\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4 (\uB418\uB3CC\uB9B4 \uC218 \uC5C6\uC74C). \uB2E4\uC2DC \uC2E4\uD589\uD558\uB824\uBA74 \uD6C4\uBCF4 \uB808\uC778\uC5D0\uC11C \uB300\uAE30 \uB808\uC778\uC73C\uB85C \uC62E\uAE30\uC138\uC694"}
        >
          ${T?.label||"\uD3D0\uAE30"}
        </button>`:"",I=T?.abandon.action?c`<button
        type="button"
        class="worker-mini__discard-abandon"
        data-bead-id=${e.id}
        data-operation-id=${T.operation.operation_id}
        data-operation-kind=${T.operation.kind||""}
        data-last-error=${T.error||""}
        title=${T.abandon.title}
      >
        ${T.abandon.label}
      </button>`:"",O=e.resolve_action?c`<button
        type="button"
        class="worker-mini__resolve"
        data-bead-id=${e.id}
        ?disabled=${e.resolve_enabled===!1}
        title=${e.resolve_title||"\uC2E4\uD328\uD55C \uC791\uC5C5\uC744 \uC774\uC5B4\uBC1B\uB294 \uB300\uD654\uD615 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4 (\uAE30\uB85D\uB41C \uC138\uC158\uC774 \uC788\uC73C\uBA74 fork)"}
      >
        세션에서 해결
      </button>`:"",J=T?.abandon.action?c`${S}${I}${O}`:c`${O}${S}`,ce=e.stale_work||null,Se=ce?c`${ce.can_resume||ce.can_continue?c`<button
            type="button"
            class="worker-mini__stale-continue"
            data-bead-id=${e.id}
            data-action-id=${ce.action_id}
            ?disabled=${ce.locked}
          >
            기존 작업 이어가기
          </button>`:""}${ce.can_backup_fresh?c`<button
            type="button"
            class="worker-mini__stale-backup"
            data-bead-id=${e.id}
            data-action-id=${ce.action_id}
            ?disabled=${ce.locked}
          >
            백업 후 새로 시작
          </button>`:""}${ce.can_recheck?c`<button
            type="button"
            class="worker-mini__stale-recheck"
            data-bead-id=${e.id}
            data-action-id=${ce.action_id}
            ?disabled=${ce.locked}
          >
            다시 확인
          </button>`:""}`:"",K=ce?c`<div class="worker-mini__stale">
        <strong>${ce.title}</strong>
        <span>${ce.summary}</span>
        <span>${ce.cause}</span>
        ${ce.can_backup_fresh?c`<small
              >Git-ignored dependency/build output은 archive에 포함되지
              않습니다</small
            >`:""}
      </div>`:"",te=e.revise_action?c`<button
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
        </button>`:"",fe=!!(e.lane!=="pr_wait"&&e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker)),Re=fe?eo(e.exec_chips,{pin:e.exec_chips_pinned===!0}):"",V=Vi(e.rec,Tr(e,"rec")),le=fb(e,Tr(e,"receipt")),ee=Gi(e.cross_lane_chip),M=Xr(e.log_path),oe=_||ee||g||C||fe||V||le||P||M?c`<div class="worker-chips">
          ${_}${ee}${g}${C}${Re}${V}${le}${P}${M}${Fi(e)}
        </div>`:"",se=Ki(e.dependency_chips,Il(e.added_at)),he=Bi(e),xe=t.actions?t.actions:"",Ze=!!(s||e.merge_action||e.cancel_action||e.resolve_action||e.discard_action||T?.operation||e.revise_action||ce);return c`<div
    class="worker-mini${l?" worker-mini--card":""}${n?"":" worker-mini--static"}${e.done?" worker-mini--done":""}${e.ghost?" worker-mini--ghost":""}${s?" worker-mini--merging":""}${s?.failed?" worker-mini--merge-failed":""}${e.external?" worker-mini--external":""}${e.search_match===!1?" is-dimmed":""}"
    style=${s?`--progress: ${s.percent}%`:""}
    draggable=${n?"true":"false"}
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    ${a?c`<div class="worker-mini__row1">
            ${_}${y}${k}${C}${ae}${X}${xe}
          </div>
          ${yp(e.carried_to,e.root_dir)}
          <div class="worker-mini__row2">
            ${g}${Re}${P}${u?c`<span
                  class="worker-mini__done-at"
                  title=${`\uC644\uB8CC ${rn(e.done_at)}`}
                  >완료 ${u}</span
                >`:""}${typeof e.work_ms=="number"?c`<span
                  class="worker-mini__work"
                  title=${up(e.work_kind)}
                  >작업 ${Jr(e.work_ms)}</span
                >`:""}${H}${j}
            <span class="worker-mini__actions"
              >${B}${W}${J}</span
            >
            ${Po(e)}
          </div>`:l?c`<div class="worker-mini__head">
              ${d}${f}${y}${k}${ae}${H}${N}${xe}
            </div>
            <div class="worker-mini__body">${X}${K}</div>
            ${se}${oe}${Ze?c`<div class="worker-mini__foot">
                  ${j}
                  <span class="worker-mini__actions"
                    >${B}${W}${J}${te}${Se}</span
                  >
                  ${Bi(e)}
                </div>`:""}
            ${Po(e)}`:c`<div class="worker-mini__line">
              ${d}${f}${y}${k}${X}${ae}${H}${N}${j}${B}${W}${J}${xe}
            </div>
            ${se}${oe}${he} ${Po(e)}`}
  </div>`}function Dl(e,t){let n,r=[];for(let o of e){let i=o.group||"";i.length>0&&i!==n&&r.push(c`<div class="worker-card__place-group">${i}</div>`),n=i,r.push(c`<button
        type="button"
        class="worker-card__place-lane${i.length>0?" worker-card__place-lane--nested":""}"
        data-bead-id=${t}
        data-lane=${o.id}
        ?disabled=${o.disabled===!0}
        title=${o.title||`${o.label} \uB300\uAE30 \uB9E8 \uB4A4\uC5D0 \uCD94\uAC00`}
      >
        <span>${o.label}</span>
        ${typeof o.count=="number"?c`<span class="worker-card__place-count">${o.count}</span>`:""}
      </button>`)}return c`${r}`}var $p={external_roundtrip:"\uD558\uB124\uC2A4 \uBC16 \uC0C1\uB300\uC640 \uC608\uCE21 \uBD88\uAC00 \uC655\uBCF5 \uBC18\uBCF5 \u2014 \uB2E4\uB978 rig \uC138\uC158\xB7\uC0AC\uB78C\xB7\uC678\uBD80 \uC2DC\uC2A4\uD15C",user_feedback_loop:"\uC9C4\uD589 \uC911 \uC0AC\uC6A9\uC790 \uD53C\uB4DC\uBC31 \uC5C6\uC774\uB294 \uD488\uC9C8\uC774 \uB0AE\uC74C \u2014 \uBB38\uC548\xB7\uC124\uACC4 \uC138\uBD80\xB7\uBC29\uD5A5 \uC120\uD0DD"};function Pl(e,t){if(t==="rec"){let n=e.rec;if(!n)return null;let r=El[n.state]||"";return{title:"\uBCF5\uC7A1\uD55C \uC791\uC5C5\uC73C\uB85C \uD310\uC815\uB428",lines:[...Sl(n),...r.length>0?[`\uC0C1\uD0DC: ${r}`]:[],"\uC801\uC6A9\uC740 \uC774\uC288 \uC0C1\uC138\uC758 \uC2E4\uD589 \uC124\uC815 \uD3B8\uC9D1\uAE30\uC5D0\uC11C"]}}if(t==="session_preferred"){if(e.session_preferred!==!0)return null;let n=$p[e.session_preferred_reason||""]||"";return{title:"\uC6CC\uCEE4\uB85C \uB3CC\uB9B4 \uC218 \uC788\uC9C0\uB9CC \uC138\uC158\uC774 \uB0AB\uB2E4",lines:n.length>0?[n]:[]}}if(t==="ineligible")return e.worker_ineligible!==!0?null:{title:"\uC6CC\uCEE4 \uC2E4\uD589 \uB300\uC0C1\uC774 \uC544\uB2C8\uB2E4",lines:["worker-ineligible \uB77C\uBCA8\uC774 \uBD99\uC5B4 \uC788\uB2E4 \u2014 \uB77C\uBCA8\uC740 \uC774\uC288 \uC0C1\uC138\uC758 \uB77C\uBCA8 \uC808\uC5D0\uC11C \uB5C0\uB2E4"]};if(t==="spec_after_blocker")return e.spec_after_blocker!==!0?null:{title:"\uC120\uD589 \uACB0\uACFC\uAC00 \uC124\uACC4 \uC804\uC81C \u2014 \uC2A4\uD399\uB3C4 \uC120\uD589 \uB4A4\uC5D0",lines:[`\uC120\uD589: ${(Array.isArray(e.blocked_by)?e.blocked_by:[]).join(" \xB7 ")}`,"\uC120\uD589\uC774 \uB2EB\uD788\uBA74 \uC774 \uD45C\uC2DC\uB294 \uC800\uC808\uB85C \uC0AC\uB77C\uC9C4\uB2E4 \u2014 \uB77C\uBCA8\uC740 \uC774\uC288 \uC0C1\uC138\uC758 \uB77C\uBCA8 \uC808\uC5D0\uC11C \uB5C0\uB2E4"]};if(t==="readiness"){let n=bp(e);return n?{title:n.title,lines:[]}:null}if(t==="receipt"){let n=kp(e);return n.length===0?null:{title:"\uC2E4\uD589 \uC601\uC218\uC99D \uD68C\uACC4 \uC794\uC5EC \u2014 \uBA38\uC9C0\uB294 \uC9C4\uD589",lines:[...n.map(r=>pb[r]||r),"\uC790\uB3D9 \uBA38\uC9C0 \uD310\uC815\uC5D0\uB294 \uC601\uD5A5\uC774 \uC5C6\uB2E4 \u2014 \uC815\uC815\uC740 bd update --set-metadata exec_receipt=\u2026 \uB85C"]}}if(t==="qfr"){let n=e.workflow?e.workflow.quick_fix_review:null;if(!n||n.state!=="reviewed"&&n.state!=="stale")return null;let r=Array.isArray(n.missing)?n.missing:[];return{title:n.state==="reviewed"?"quick_fix self-review \uC601\uC218\uC99D\uC774 \uC9C0\uAE08 \uBCF8\uBB38\uACFC \uC77C\uCE58\uD569\uB2C8\uB2E4":"quick_fix self-review \uC601\uC218\uC99D\uC774 \uC9C0\uAE08 \uBCF8\uBB38\uACFC \uB2E4\uB985\uB2C8\uB2E4",lines:r.length>0?r:["\uBE60\uC9C4 \uD56D\uBAA9 \uC5C6\uC74C"]}}return null}var mb=["rec","receipt","session_preferred","ineligible","qfr","spec_after_blocker","readiness"];function Xi(e,t){for(let n of mb){if(!t(n))continue;let r=Pl(e,n);return r?{chip_key:n,content:r}:null}return null}function Fi(e){return e.chip_popover?Lo(e.chip_popover.content):""}function Tr(e,t){return!!e.chip_popover&&e.chip_popover.chip_key===t}var Ml="\uC0AC\uC6A9\uC790 \uB9AC\uBDF0 \uD544\uC694";function Nl(e,t=null,n={}){let r=e.worker_ineligible===!0,o=e.draggable&&!e.done&&!r,i=e.queue_placeable===!0&&!e.done&&!r,s=i&&t&&t.bead_id===e.id,l=e.session_preferred===!0,a=$p[e.session_preferred_reason||""]||"",u=e.workflow,d=e.missing_description===!0,f=e.awaiting_user===!0,_=typeof e.reason=="string"&&e.reason.startsWith("\u26D4"),y=Tr(e,"spec_after_blocker"),g=cb(e.spec_after_blocker===!0,y),C=bp(e),k=Tr(e,"readiness"),X=ub(C,k),ae=c`${g}${y?Fi(e):""}${X}${k?Fi(e):""}`,H=Ki(e.dependency_chips,g===""&&X===""?"":ae),N=e.workspace_name?c`<span class="worker-card__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:"",P=Gi(e.cross_lane_chip),j=to(u),B=vp(e.from_id),W=!!(e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker)),T=!r&&(e.blocked===!0||e.queue_placeable===!1);return c`<div
    class="worker-card${o?"":" worker-card--static"}${r?" worker-card--ineligible":""}${T?" worker-card--blocked":""}${e.search_match===!1?" is-dimmed":""}"
    draggable=${o?"true":"false"}
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    <div class="worker-card__head">
      ${o?c`<span class="worker-card__grip" aria-hidden="true">⠿</span>`:""}
      <span class="worker-card__id" title="클릭하면 ID 복사">${e.id}</span
      >${Yi(e.priority)}
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
            </button>`:""}${Vi(e.rec,Tr(e,"rec"))}${db(u,Tr(e,"qfr"))}
      ${y||k?"":Fi(e)}
    </div>
    <div class="worker-card__title">${e.title}</div>
    ${u?gi(u,e.status,{onOpenDoc:n.onOpenDoc}):""}${H}
    ${N||P||j||B||W?c`<div class="worker-chips">
          ${N}${P}${j}${B}${eo(e.exec_chips,{pin:n.exec_chips_mode==="pinned_only"})}
        </div>`:""}
    <div
      class="worker-card__foot${e.reason?"":" worker-card__foot--actions-only"}"
    >
      ${s?c`<div class="worker-card__place-menu">
            ${Dl(t.lanes,e.id)}
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
              title=${Zr({placeable:i,route_ok:e.route_ok,worker_ineligible:r,awaiting_user:f,missing_description:d,spec:e.placement_spec})}
            >
              ↴ 대기로
            </button>`}
    </div>
    ${Po(e)}
  </div>`}function tr(e){let t=!!e.collapsible&&!!e.collapsed,n=typeof e.count=="number"?e.count:e.items.length,r=c`<span
      class="worker-pane__dot worker-pane__dot--${e.lane}"
      aria-hidden="true"
    ></span>
    <span class="worker-pane__title">${e.title}</span>
    ${t&&e.preview?c`<span class="worker-pane__preview">${e.preview}</span>`:""}
    <span class="worker-pane__count">${n}</span>
    ${typeof e.match_count=="number"?c`<span class="worker-pane__match">일치 ${e.match_count}</span>`:""}`;return c`<section
    class="worker-pane worker-pane--lane-${e.lane}${e.src?" worker-pane--src":""}${e.live?" worker-pane--live":""}${e.collapsible?" worker-pane--collapsible":""}${t?" worker-pane--collapsed":""}"
    id=${vn(e.id||void 0)}
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
                  </div>`:e.items.map(o=>e.lane==="candidate"?Nl(o,e.place_menu,{onOpenDoc:e.onOpenDoc}):Wn(o))}
          </div>`}
  </section>`}function cp(e,t,n){return c`<button
      type="button"
      class="worker-wait__area-toggle"
      data-area=${e}
      aria-expanded=${n?"false":"true"}
      aria-label=${`${t} ${n?"\uD3BC\uCE58\uAE30":"\uC811\uAE30"}`}
    >
      ${n?"\u25B8":"\u25BE"}
    </button>
    <span class="worker-wait__area-name">${t}</span>`}function Zi(e){let t=e.parallel,n=e.serial,r=t.drop||{};return c`<div class="worker-wait">
    <section
      class="worker-wait__area worker-wait__area--parallel${t.collapsed?" is-collapsed":""}"
      data-area="parallel"
    >
      <header class="worker-wait__area-hd">
        ${cp("parallel","\uBCD1\uB82C \uC601\uC5ED",t.collapsed)}
        <span class="worker-wait__area-count">${t.count}</span>
      </header>
      ${t.collapsed?"":c`<div
            class="worker-wait__area-body"
            data-drop=${vn(r.drop)}
            data-root-dir=${vn(r.root_dir)}
            data-lane-id=${vn(r.lane_id)}
            data-lane-length=${vn(r.lane_length)}
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
        ${cp("serial","\uC9C1\uB82C \uC601\uC5ED",n.collapsed)}
        ${n.header_control?n.header_control:""}
      </header>
      ${n.collapsed?"":c`<div class="worker-wait__area-body">
            ${n.notice?n.notice:""}
            ${n.extra_panes?n.extra_panes:""}
            ${n.lanes.map(o=>gb(o))}
          </div>`}
    </section>
  </div>`}function gb(e){let t=e.drop||{},n=e.badge?c`<span
        class="worker-lane__badge${e.held?" worker-lane__badge--held":""}"
        >${e.badge}</span
      >`:"";return c`<div
    class="worker-wait__lane${e.empty?" worker-wait__lane--empty":""}"
  >
    ${tr({id:typeof e.pane_id=="string"?e.pane_id:`worker-pane-lane-${e.id}`,lane:e.id,title:e.title,items:[],count:e.count,match_count:e.match_count,empty:"\uBE44\uC5B4 \uC788\uC74C \u2014 \uD589\uC744 \uC5EC\uAE30\uB85C \uB4DC\uB798\uADF8",header_control:c`${n}${e.header_control?e.header_control:""}`,body:c`<div
        class="worker-wait__rows"
        data-drop=${vn(t.drop)}
        data-root-dir=${vn(t.root_dir)}
        data-lane-id=${vn(t.lane_id)}
        data-lane-length=${vn(t.lane_length)}
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
  </div>`}function Ji(e){return e.count?c`<section
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
  </section>`:""}var Ap=[{step:"merge",label:"\uBA38\uC9C0",index:1},{step:"base",label:"base",index:2},{step:"verify",label:"\uAC80\uC99D",index:3},{step:"deploy",label:"\uBC30\uD3EC",index:4},{step:"child",label:"\uC790\uC2DD",index:5},{step:"branch",label:"\uBE0C\uB79C\uCE58",index:6},{step:"close",label:"close",index:7}],ws=[{step:"base_containment",label:"base \uD3EC\uD568 \uD655\uC778"},{step:"repo_operations",label:"\uC800\uC7A5\uC18C \uC791\uC5C5"},{step:"post_merge_jobs",label:"\uBA38\uC9C0 \uD6C4 \uC7A1"},{step:"child_sweep",label:"\uC790\uC2DD \uC815\uB9AC"},{step:"branch_cleanup",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC"},{step:"parent_close",label:"\uBD80\uBAA8 close"}];function ea(e,t){let n=Ap.find(o=>o.step===e);if(!n)return null;let r=Ap.length;return{step:n.step,label:t,index:n.index,total:r,percent:Math.round(n.index/r*100)}}function Sp(e){let t=ws.findIndex(n=>n.step===e);return ws.map((n,r)=>({step:n.step,label:n.label,state:t<0?"todo":r<t?"done":r===t?"stall":"todo"}))}function no(e){let t=ws.find(n=>n.step===e);return t?t.label:typeof e=="string"?e:""}function hb(e){let t=ws.findIndex(n=>n.step===e);return t<0?null:{index:t+1,total:ws.length}}function ta(e){let t=hb(e);return t?`\uBA38\uC9C0 \uC644\uB8CC \xB7 \uC815\uB9AC ${t.total}\uB2E8\uACC4 \uC911 ${t.index}\uB2E8\uACC4\uC5D0\uC11C \uBA48\uCDA4`:"\uBA38\uC9C0\uB428 \xB7 \uC815\uB9AC \uBBF8\uC644"}var Fl=new Set(["queued","running","retry_pending"]),Ep=new Set(["failed","succeeded"]),bb={queued:"\uB300\uAE30",running:"\uC911",retry_pending:"\uC7AC\uC2DC\uB3C4 \uB300\uAE30",failed:"\uC2E4\uD328",succeeded:"\uC644\uB8CC \xB7 \uC815\uB9AC \uC7AC\uC2DC\uB3C4 \uB300\uAE30"},$s={base_containment:{step:"base",label:"base \uD655\uC778 \uC911"},child_sweep:{step:"child",label:"\uC790\uC2DD \uC815\uB9AC \uC911"},branch_cleanup:{step:"branch",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC \uC911"},parent_close:{step:"close",label:"\uBD80\uBAA8 close \uC911"}},yb={merging:{step:"merge",label:"\uBA38\uC9C0 \uC911"},base_containment:$s.base_containment,child_sweep:$s.child_sweep,branch_cleanup:$s.branch_cleanup,parent_close:$s.parent_close};function vb(e){return typeof e=="string"&&/^[0-9a-f]{40}$/.test(e)}function kb(e,t,n){return!["verify","deploy"].includes(e.kind)||![...Fl,...Ep].includes(e.state)||![null,void 0,""].includes(e.superseded_by)||!Array.isArray(e.subjects)?!1:e.subjects.some(r=>r&&typeof r=="object"&&r.bead_id===t&&r.merged_sha===n)}function wb(e,t){let n=(t.kind==="deploy"?2:1)-(e.kind==="deploy"?2:1);if(n!==0)return n;let r=u=>u.state==="succeeded"?1:2,o=r(t)-r(e);if(o!==0)return o;let i=typeof e.requested_at=="number"?e.requested_at:0,s=typeof t.requested_at=="number"?t.requested_at:0;if(i!==s)return s-i;let l=typeof e.operation_id=="string"?e.operation_id:"",a=typeof t.operation_id=="string"?t.operation_id:"";return l.localeCompare(a)}function jl(e,t=!1){let n=e.kind,r=n==="verify"?"\uAC80\uC99D":"\uBC30\uD3EC",o=t?"failed":e.state,i=bb[o];if(!i)return null;let s=ea(n,`${r} ${i}`);return s?{...s,active:Fl.has(o),failed:o==="failed"}:null}function $b(e){return!e||typeof e!="object"?null:yb[e.step]||null}function xs(e){if(!e||typeof e.bead_id!="string")return null;let t=e.bead_id,n=e.merge_progress&&typeof e.merge_progress=="object"?e.merge_progress:{},r=$b(n),o=e.cleanup_failed&&typeof e.cleanup_failed=="object"?e.cleanup_failed:null,i=["post_merge_jobs","child_sweep","branch_cleanup","parent_close"].includes(typeof e.cleanup_cursor=="string"?e.cleanup_cursor:""),s=!i&&(e.cleanup_cursor==="repo_operations"||n.step==="repo_operations"),l=vb(e.merge_sha)?e.merge_sha:null,a=!i&&l&&Array.isArray(e.repo_operations)?e.repo_operations.filter(g=>g&&typeof g=="object"&&kb(g,t,l)).sort(wb):[],u=s?a:[],d=u.find(g=>Fl.has(g.state));if(d)return jl(d);if(o)return o.step==="repo_operations"&&a[0]?jl(a[0],!0):null;let f=u.find(g=>Ep.has(g.state)?g.state!=="succeeded"||e.cleanup_cursor==="repo_operations":!1);if(f)return jl(f);if(r){let g=ea(r.step,r.label);return g?{...g,active:!0,failed:!1}:null}let _=typeof e.cleanup_cursor=="string"?$s[e.cleanup_cursor]:null;if(!_)return null;let y=ea(_.step,_.label);return y?{...y,active:!0,failed:!1}:null}function na(e){return!!e&&e.step!=="merge"&&e.failed!==!0}var xb="\uBBF8\uC801\uC7AC";function Bl(e,t,n,r){if(!n)return`${e} ${t}`;let o=typeof r=="string"&&r.length>0?r:"\uC678\uBD80";return`${e} ${o}/${t}`}function Ul(e,t,n){return`${e} \u2014 ${t}${n?" \xB7 \uB2E4\uB978 \uC800\uC7A5\uC18C\uC758 \uC774\uC288\uB77C \uC5EC\uAE30\uC11C \uB2EB\uC744 \uC218 \uC5C6\uB2E4":""}`}function Ab(e){if(typeof e!="string"||e.length===0)return;let t=e.replace(/\/+$/,""),n=t.lastIndexOf("/"),r=t.slice(n+1);return r.length>0?r:void 0}function Wl(e,t){let n=Xn(e,t.id),r=Bl("\u26D3",t.id,n,t.workspace_name);return{id:t.id,label:r,title:Ul(r,`\uC120\uD589 \u2014 close\uB420 \uB54C\uAE4C\uC9C0 \uCD9C\uBC1C\uD558\uC9C0 \uC54A\uB294\uB2E4 (${t.location_label})`,n),...n?{foreign:!0}:{}}}var Sb=10080*60*1e3;function Tp(e,t,n){let r=t.closed_at;if(typeof r!="number"||!Number.isFinite(r)||r<n-Sb)return null;let o=Xn(e,t.id),i=typeof t.root_dir=="string"?t.root_dir:"",s=Bl("\u{1F513}",t.id,o,t.workspace_name),l={id:t.id,label:s,title:Ul(s,`\uD574\uC81C \u2014 ${rn(r)}\uC5D0 close\uB418\uC5B4 \uC774 \uC774\uC288\uAC00 \uD480\uB838\uB2E4`,o),...o?{foreign:!0}:{}};return o?i.length>0&&(l.openable=!0,l.root_dir=i):l.openable=!0,l}function Cp(e,t,n,r){let o=Xn(e,t),i=Bl("\u{1F513}",t,o,n),s={id:t,label:i,title:Ul(i,"\uD574\uC81C \u2014 \uB354 \uC774\uC0C1 \uC774 \uC774\uC288\uB97C \uB9C9\uC9C0 \uC54A\uB294\uB2E4 \xB7 \uBCF5\uADC0 \uB300\uAE30",o),...o?{foreign:!0}:{}};return o?typeof r=="string"&&r.length>0&&(s.openable=!0,s.root_dir=r):s.openable=!0,s}function Rp(e,t){let n=Array.isArray(t.ids)?t.ids.filter(i=>typeof i=="string"&&i.length>0):[],r=t.root_dirs&&typeof t.root_dirs=="object"?t.root_dirs:{},o=[];for(let i of[...new Set(n)].sort()){let s=Xn(e,i),l=typeof r[i]=="string"?r[i]:"",a={id:i,label:`\u2192 ${i}`,title:"\uD6C4\uC18D \u2014 \uC774 \uC774\uC288\uAC00 close\uB418\uBA74 \uD480\uB9B0\uB2E4",...s?{foreign:!0}:{}};l.length>0?(a.openable=!0,a.root_dir=l):s||(a.openable=!0),o.push(a)}return o}function Op(e,t,n={}){let r=new Map,o=new Map;for(let i of t)o.has(i.id)||o.set(i.id,i.location_label);for(let[i,s]of e){if(typeof i!="string"||i.length===0)continue;let l=[];for(let a of Array.isArray(s)?s:[]){if(typeof a!="string"||a.length===0)continue;let u=n[a],d=Ab(u),f=Wl(i,{id:a,location_label:o.get(a)||xb,...d?{workspace_name:d}:{}});f.foreign!==!0?f.openable=!0:typeof u=="string"&&u.length>0&&(f.openable=!0,f.root_dir=u),l.push(f)}l.length>0&&r.set(i,l)}return r}var oa=1,xp=2e4,As=[{value:"repo_spec",label:"\uB808\uD3EC \xB7 spec \uC6B0\uC120"},{value:"repo_updated",label:"\uB808\uD3EC \xB7 \uCD5C\uC2E0 \uC218\uC815"},{value:"updated_flat",label:"\uCD5C\uC2E0 \uC218\uC815(\uB808\uD3EC \uBB34\uC2DC)"}],Ss=[{value:"all",label:"\uC804\uCCB4"},{value:"ready",label:"\uCC29\uC218 \uAC00\uB2A5"},{value:"not_ready",label:"\uC900\uBE44 \uD544\uC694"}],oo=[{value:"quick_fix",label:"quick_fix"},{value:"spec_backed",label:"spec_backed"},{value:"full_plan",label:"full_plan"},{value:"unset",label:"unset"}];function ro(e){if(!Array.isArray(e))return[];let t=new Set(oo.map(r=>r.value)),n=[];for(let r of e)typeof r=="string"&&t.has(r)&&!n.includes(r)&&n.push(r);return n}function sa(e,t){let n=ro(e);return n.includes(t)?n.filter(r=>r!==t):ro([...n,t])}var No={show_blocked:!0,readiness:"all",routes:[]},Ip={auto_merge:"\uC790\uB3D9 \uBA38\uC9C0",merged:"\uBA38\uC9C0",merge:"\uBA38\uC9C0",pr_stop:"PR \uC911\uB2E8",stopped:"\uC911\uB2E8",failed:"\uC2E4\uD328",refuted:"\uBC18\uC99D",no_delta:"\uBB34-delta"};function Eb(e,t){let n=null;for(let r of Object.values(e||{}))!r||r.bead_id!==t||!dr(r)||(n=typeof r.status=="string"?r.status:null);return n}function Tb(e,t){let n=null,r=-1/0;for(let o of Object.values(e)){if(!o||o.bead_id!==t||o.status==="running"||!dr(o))continue;let i=typeof o.finished_at=="number"?o.finished_at:typeof o.started_at=="number"?o.started_at:0;i>=r&&(r=i,n=o)}return n}function ap(e){let t=Xe(e),n=new Map;for(let r of Array.isArray(t.done)?t.done:[])r&&typeof r.bead_id=="string"&&typeof r.added_at=="number"&&n.set(r.bead_id,r.added_at);return new Set(qp(Xe(t.attempts),n).keys())}function qp(e,t,n={}){let{winners:r,resumed_from_ids:o}=$d(e,t),i=new Map;for(let[s,l]of r){let a=l.attempt,u=l.run_state;if(Fp(a))continue;let d=l.started_at,f=typeof a.session_id=="string"&&a.session_id.length>0,y=Pi(a.quickfix_landing)==="session",g=u!=="running"&&(f||!y)&&!o.has(a.attempt_id),C=!f&&y?"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":o.has(a.attempt_id)?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":null,k=Xe(n.observations?.[s]),X=Xe(k.pr),ae=typeof a.merge_sha=="string"&&a.merge_sha.length>0||X.state==="MERGED",H=pr(n.discard_operations,s,{attempt_id:a.attempt_id,merged:ae}),N=u==="failed"?Dp(a,{resume_eligible:g,resume_reason:C,confirmation:H.confirmation,history:n.bead_timelines?.[s]}):null;i.set(s,{...Lp(a,e,u,n.runner_catalog),started_at:d,...N?{failure:N}:{},can_pause:u==="running"&&f,can_resume:g})}for(let[s,l]of Mb(e,t)){if(i.has(s)||l.run_state==="waiting"&&Up(n.admission,s))continue;let a=l.attempt,u=pr(n.discard_operations,s,{attempt_id:a.attempt_id}),d=Bp(a),f=l.run_state==="provider_hold"?Db(a,{provider_hold:n.provider_hold,auto_resume_pending:n.auto_resume_pending,account_catalog:n.account_catalog,attempts:e,history:n.bead_timelines?.[s]}):null;i.set(s,{...Lp(a,e,l.run_state,n.runner_catalog),started_at:typeof a.started_at=="number"?a.started_at:null,...l.run_state==="parked"?{failure:Dp(a,{resume_eligible:!1,resume_reason:"\uC138\uC158 \uB300\uAE30 \u2014 [\uC138\uC158\uC5D0\uC11C \uD574\uACB0]\uB85C \uBB38\uC758\uB97C \uC774\uC5B4\uAC11\uB2C8\uB2E4",confirmation:u.confirmation,history:n.bead_timelines?.[s]})}:{},...l.run_state==="waiting"?{wait:Cb(a)}:{},...f?{hold:f}:{},...d?{retry:d}:{},can_pause:!1,can_resume:l.run_state==="provider_hold"})}return i}function Lp(e,t,n,r=null){return{attempt_id:typeof e.attempt_id=="string"?e.attempt_id:"",run_state:n,last_event_at:typeof e.last_event_at=="number"?e.last_event_at:null,last_activity:e.last_activity&&typeof e.last_activity=="object"?e.last_activity:null,legs:Array.isArray(e.legs)?e.legs:[],runner:typeof e.runner=="string"?e.runner:null,model:typeof e.model=="string"?e.model:null,effort:typeof e.effort=="string"?e.effort:null,speed:typeof e.speed=="string"?e.speed:null,resumed_from:typeof e.resumed_from=="string"?e.resumed_from:null,continuation_mode:e.continuation_mode==="session"||e.continuation_mode==="fresh"?e.continuation_mode:null,status:typeof e.status=="string"?e.status:null,usage:ur(t,e.bead_id,r)}}function Dp(e,t){let n=e.cause_detail&&typeof e.cause_detail=="object"?e.cause_detail:null;return{cause:typeof e.cause=="string"?e.cause:null,cause_detail:n,summary:n&&typeof n.summary=="string"?n.summary:null,bead_id:typeof e.bead_id=="string"?e.bead_id:"",finished_at:typeof e.finished_at=="number"?e.finished_at:null,runner:typeof e.runner=="string"?e.runner:null,model:typeof e.model=="string"?e.model:null,effort:typeof e.effort=="string"?e.effort:null,observed_effort:typeof e.observed_effort=="string"?e.observed_effort:null,speed:typeof e.speed=="string"?e.speed:null,attempt_id:typeof e.attempt_id=="string"?e.attempt_id:"",usage:e.usage&&typeof e.usage=="object"?e.usage:null,halted_auto_advance:e.halted_auto_advance===!0,quickfix_lane:e.quickfix_lane===!0,quickfix_landing:e.quickfix_landing&&typeof e.quickfix_landing=="object"?e.quickfix_landing:null,retry:Bp(e),resume_eligible:t.resume_eligible,resume_reason:t.resume_reason,landed:gp(e),confirmation:t.confirmation,...jp(t.history)}}function jp(e){if(!e||typeof e!="object")return{};let t=Array.isArray(e.events)?e.events:[],n=[];for(let o of t)!o||typeof o!="object"||typeof o.summary!="string"||o.summary.length===0||n.push({event_id:typeof o.event_id=="string"?o.event_id:"",kind:typeof o.kind=="string"?o.kind:"",summary:o.summary,at:typeof o.at=="number"?o.at:null});n.reverse();let r=typeof e.log_path=="string"&&e.log_path.length>0?e.log_path:null;return{...n.length>0?{timeline:n}:{},...r===null?{}:{log_path:r},...e.log_expired===!0?{log_expired:!0}:{},...e.log_unreadable===!0?{log_unreadable:!0}:{}}}function Cb(e){let t=e.cause_detail&&typeof e.cause_detail=="object"?e.cause_detail:null,n=Array.isArray(t?.blockers)?t.blockers:[],r=[];for(let o of n)!o||typeof o!="object"||typeof o.id!="string"||o.id.length===0||r.push({id:o.id,rig:typeof o.rig=="string"?o.rig:null,status:typeof o.status=="string"?o.status:""});return{summary:t&&typeof t.summary=="string"?t.summary:null,blockers:r,since:typeof e.finished_at=="number"?e.finished_at:null}}function Fp(e){return e?.status==="paused"&&typeof e.cause=="string"&&e.cause.startsWith("provider_outage:")}function Rb(e,t){let n=typeof e.runner=="string"?e.runner:"",r=Xe(t)[n];return!r||!Array.isArray(r.targets)?null:r.targets.find(o=>Array.isArray(o?.attempt_ids)&&o.attempt_ids.includes(e.attempt_id))||null}function Ob(e,t){if(e===null)return null;let n=Xe(t).claude;if(!Array.isArray(n))return null;let r=n.find(o=>o?.email===e);return r&&typeof r.alias=="string"&&r.alias.length>0?r.alias:null}function Ib(e,t){let n=e,r=new Set;for(;n&&!r.has(n.attempt_id);){if(r.add(n.attempt_id),n.auto_resume_kind==="provider_outage")return!0;n=typeof n.resumed_from=="string"?t[n.resumed_from]:null}return!1}function Lb(e,t,n,r){if((Array.isArray(r.auto_resume_pending)?r.auto_resume_pending:[]).some(s=>s?.attempt_id===e.attempt_id))return"pending";let i=e.auto_resume_refused;return typeof i=="string"&&i.length>0?`refused:${i}`:n.startsWith("auto_resume_disarmed:")||t?.auto_switch==="cap"||Ib(e,r.attempts)?"disarmed":null}function Db(e,t){let n=e.cause.slice(16),r=e.cause_detail&&typeof e.cause_detail=="object"?e.cause_detail:null,o=Rb(e,t.provider_hold),i=typeof o?.model=="string"&&o.model.length>0?o.model:typeof e.model=="string"&&e.model.length>0?e.model:null,s=typeof o?.account=="string"&&o.account.length>0?o.account:typeof e.claude_account=="string"&&e.claude_account.length>0?e.claude_account:null,l=typeof o?.last_error=="string"?o.last_error:"",a=Lb(e,o,l,{auto_resume_pending:t.auto_resume_pending,attempts:t.attempts}),u=typeof o?.resets_at=="number"?o.resets_at:typeof r?.resets_at=="number"?r.resets_at:null,d=typeof o?.next_probe_at=="number"?o.next_probe_at:null,f=Ob(s,t.account_catalog),_=jp(t.history);return{kind:o?.kind==="usage_limit"||n==="usage_limit"?"usage_limit":"outage",detail:n,...typeof r?.message=="string"?{message:r.message}:{},...typeof r?.summary=="string"?{summary:r.summary}:{},...i||s?{target:{...i?{model:i}:{},...s?{account:s}:{},...f?{account_alias:f}:{}}}:{},...u===null?{}:{resets_at:u},...a===null?{}:{auto_resume:a},...o?.auto_switch==="none"||o?.auto_switch==="disabled"?{auto_switch:o.auto_switch}:{},...d===null?{}:{next_probe_at:d},..._.log_path?{log_path:_.log_path}:{}}}function Bp(e){let t=e&&e.retry&&typeof e.retry=="object"?e.retry:null;return t?{cause:typeof t.cause=="string"?t.cause:null,attempts:typeof t.attempts=="number"?t.attempts:0,max:typeof t.max=="number"?t.max:0,next_at:typeof t.next_at=="number"?t.next_at:null}:null}var Pb=new Set(["parked","retry_wait","waiting"]);function Mb(e,t){let n=Object.values(e||{}),r=new Set(n.map(s=>s?.resumed_from).filter(s=>typeof s=="string")),o=new Map;for(let s of n)s&&typeof s.bead_id=="string"&&dr(s)&&o.set(s.bead_id,s.attempt_id);let i=new Map;for(let s of n){let l=Fp(s);if(!s||typeof s.bead_id!="string"||s.bead_id.length===0||!dr(s)||!Pb.has(s.status)&&!l||o.get(s.bead_id)!==s.attempt_id||typeof s.dismissed_at=="number"||l&&r.has(s.attempt_id))continue;let a=t.get(s.bead_id);typeof a=="number"&&a>0&&typeof s.finished_at=="number"&&a>=s.finished_at||i.set(s.bead_id,{attempt:s,run_state:l?"provider_hold":s.status})}return i}function Pp(e,t){let n=e[t];if(!n)return"";if(n.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let r=typeof n.reason=="string"?n.reason:"";if(r==="grace_period")return"";if(r==="prerequisite_unmet"&&Array.isArray(n.blockers)&&n.blockers.length>0)return"\u26D3 \uC120\uD589 \uB300\uAE30";let o=r.indexOf(":");return o>0&&o<r.length-1?`\u26D4 ${r.slice(0,o)} (${r.slice(o+1)})`:`\u26D4 ${r}`}function Up(e,t){let n=Xe(Xe(e)[t]),r=Xe(n.stale_work);return n.reason==="worktree_stale_work"&&typeof r.action_id=="string"&&r.action_id.length>0}function Xe(e){return e&&typeof e=="object"?e:{}}function Kl(e){if(typeof e!="string"||e.length===0)return;let t=e.replace(/\/+$/,""),n=t.lastIndexOf("/"),r=t.slice(n+1);return r.length>0?r:void 0}function Nb(e){let t=Xe(e).badge_codes;return Array.isArray(t)?t.filter(n=>typeof n=="string"&&n.length>0):[]}function qb(e,t,n){let r=Xe(t);if(Object.keys(r).length===0)return null;let o=e.execution_defaults,i=e.runner_catalog,s=e.session_defaults;if(!o||!i||!s)return null;let l=_=>In({pin:_,global:s,execution_defaults:o,runner_catalog:i,route:n}),a,u;try{a=l(r),u=l(null)}catch{return null}let d=Mp(Oo(a,i),Oo(u,i)),f=Mp(Qr(a,null),Qr(u,null));return d||f?{orchestration:d,worker:f}:null}function Mp(e,t){return!e||t&&t.text===e.text?null:e}function jb(e,t,n){let o=(t&&typeof t=="object"&&Array.isArray(t.released_by)?t.released_by:[]).filter(s=>s&&typeof s=="object"&&typeof s.id=="string").slice().sort((s,l)=>(typeof l.closed_at=="number"?l.closed_at:0)-(typeof s.closed_at=="number"?s.closed_at:0)),i=[];for(let s of o){let l=typeof s.workspace_name=="string"&&s.workspace_name.length>0?s.workspace_name:Kl(s.root_dir),a=Tp(e,{...s,...l?{workspace_name:l}:{}},n);a&&i.push(a)}return i.length===0?null:i}function Vl(e,t){return typeof e!="string"||e.length===0||typeof t!="string"||t.length===0||t===e?null:`\u2192 ${t}`}var Fb=new Set(["quick_fix","spec_backed","full_plan"]);function Np(e){return typeof e=="string"&&Fb.has(e)}function Bb(e){let t={...Xe(e.session_defaults)};for(let n of["orchestration_model","orchestration_effort","orchestration_speed","quick_fix_orchestration_model","quick_fix_orchestration_effort","quick_fix_orchestration_speed"]){let r=e[n];typeof r=="string"&&(t[n]=r)}return t}function Ub(e,t,n){let r=e.runner_catalog??null,o=Gl(e,t,n,null);if(!o)return null;let i=Un(r,o.orchestration_model.value??""),s=i===null?o:Gl(e,t,n,i)||o,l=Oo(s,r),a=Qr(s,i);return l||a?{orchestration:l,worker:a}:null}function Gl(e,t,n,r){let o=Np(n)?n:Np(t.route)?t.route:null;try{return In({pin:t,global:Bb(e),execution_defaults:e.execution_defaults??null,runner_catalog:e.runner_catalog??null,route:o,controller_runtime:r})}catch{return null}}function Wp(e,t,n){return!t||!Object.hasOwn(t,"metadata")?null:Qr(Gl(e,Xe(t.metadata),t.route,n),n)}function Wb(e,t,n){if(!n)return null;let r=Di(n),o=Wp(e,t,typeof n.runner=="string"?n.runner:null);return r||o?{orchestration:r,worker:o}:null}function ql(e){if(!e)return null;let t=Xe(e),n=Xe(t.chips),r=typeof n.route=="string"&&n.route.length>0?n.route:typeof t.route=="string"&&t.route.length>0?t.route:"",o=n.route_source==="derived"||t.route_source==="derived";return r.length===0||o?"unset":r}function Hb(e){return ql(e.workflow)??"unset"}function Yl(e,t){let n=new Set,r=e;for(;r&&!n.has(r.attempt_id);){if(r.conflict_resolution===!0)return!0;n.add(r.attempt_id),r=typeof r.resumed_from=="string"&&r.resumed_from.length>0&&t.get(r.resumed_from)||null}return!1}function zb(e){let t={};for(let l of Jn)t[l]=0;let n=!1,r=0,o=0,i=0;for(let l of e){let a=l.usage;if(!a||typeof a!="object")continue;let u=!1;for(let d of Jn)Number.isFinite(a[d])&&(t[d]+=a[d],n=!0,u=!0);u&&(o+=1,Number.isFinite(a.total_cost_usd)&&(r+=a.total_cost_usd,i+=1))}o>0&&i===o&&(t.total_cost_usd=r);let s=e.map(l=>l.usage).filter(l=>l&&typeof l=="object"&&l.providers);return s.length>0?gn($i(s)):n?cr(t):null}function Hp(e,t){let n=ms(e,t);return n==="internal"?"\uBBF8\uC801\uC7AC":n==="external"?"\uC678\uBD80":"\uC704\uCE58 \uBBF8\uD655\uC778"}function Kb(e,t,n){let r=t.get(e);if(!r)return Hp(e,n);if(typeof r.position=="number"){if(r.lane==="parallel")return`#${r.position}`;if(/^s[1-5]$/.test(r.lane))return`${r.lane} #${r.position}`}return _s(r)}function Gb(e,t,n,r,o,i){let s=t.get(e);if(!s)return{label:i&&ms(e,n)==="internal"?"\uC9C4\uD589 \uB300\uAE30":Hp(e,n),title:""};if(s.state==="runnable"&&i&&ms(e,n)==="internal")return{label:"\uC9C4\uD589 \uB300\uAE30",title:""};if(typeof s.position=="number"&&(s.lane==="parallel"||/^s[1-5]$/.test(s.lane))){let a=r.get(e),u=s.lane==="parallel"?"\uBCD1\uB82C":s.lane,d=o.get(e);return{label:!!d&&d.reason==="prerequisite_unmet"&&Array.isArray(d.blockers)&&d.blockers.length>0?"\u26D3 \uC120\uD589 \uB300\uAE30":a&&a.length>0?"\u{1F512} \uB300\uAE30":"\uB300\uAE30",title:`${s.workspace_name||s.root_dir} ${u} #${s.position}`}}return{label:s.state==="running"?"\u25B6 \uC2E4\uD589\uC911":_s(s),title:""}}function Vb(e,t){for(let n of Object.values(e||{}))if(n&&n.attempt_id===t&&typeof n.armed_by_lane=="string"&&n.armed_by_lane.length>0)return n.armed_by_lane;return null}function Yb(e,t,n,r,o,i){return t==="draft"?{state:"draft",badge:"draft",run_label:null,can_stop:!1}:n.some(s=>i.failed_by_bead.get(s.id)===e)?{state:"failed",badge:"\u26D4 \uC2E4\uD328",run_label:"\u25B6 \uB2E4\uC2DC \uC9C4\uD589",can_stop:!1}:i.disarmed_lanes.has(e)?{state:"restart",badge:"\u23F8 \uC7AC\uC2DC\uC791",run_label:"\u25B6 \uC9C4\uD589",can_stop:!1}:n.some(s=>i.armed_by_bead.get(s.id)===e)?{state:"running",badge:"\u25B6 \uC9C4\uD589 \uC911",run_label:o.length>0?"\u25B6 \uC774\uC5B4\uC11C \uC9C4\uD589":null,can_stop:!0}:r?{state:"all_done",badge:"\uBAA8\uB450 \uC644\uB8CC",run_label:null,can_stop:!1}:{state:"confirmed",badge:"\uD655\uC815",run_label:"\u25B6 \uC9C4\uD589",can_stop:!1}}function Qb(e,t,n,r,o,i,s,l,a){let u=[];return e.forEach((d,f)=>{let _=typeof d.id=="string"?d.id:"";if(_.length===0)return;let y=d.status==="confirmed"?"confirmed":"draft",g=Array.isArray(d.entries)?d.entries:[],C=[];g.forEach((H,N)=>{let P=H&&typeof H.bead_id=="string"?H.bead_id:"";if(P.length===0)return;let j=H&&typeof H.root_dir=="string"?H.root_dir:"",B=n.get(P),W=B?B.state:void 0,T=W==="running"||W==="pr_wait"||W==="done",S=!B||W==="runnable",I=B&&B.lane==="parallel"&&typeof B.position=="number"?B.position-1:null,O=Gb(P,n,r,t,l,y==="confirmed"),J=C.length>0?C[C.length-1]:null,ce=y==="confirmed"&&J!==null&&!J.done&&!(t.get(P)||[]).includes(J.id),Se=a.get(P)||null;C.push({id:P,title:o.get(P)||P,route:Se?Se.route:null,route_source:Se?Se.route_source:null,exec_chips:Se?Se.exec_chips:null,added_at:Se?Se.added_at:null,root_dir:B?B.root_dir:j,workspace_name:B?B.workspace_name:i.get(j)||"",seq:N+1,location_label:O.label,location_title:O.title,draggable:!T,fixed:T,done:W==="done",unplaced:S,mismatch:ce,...I!==null?{queue_index:I}:{}})}),C.forEach((H,N)=>{H.seq=N+1});let k=C.length>0&&C.every(H=>H.done),X=C.filter(H=>!H.fixed&&s.armed_by_bead.get(H.id)!==_).map(H=>H.id),ae=Yb(_,y,C,k,X,s);u.push({lane_id:_,status:y,draft:y==="draft",number:f+1,label:`\uC5F0\uACB0 ${f+1} \xB7 \uB808\uD3EC \uAC04`,rows:C,all_done:k,can_confirm:y==="draft"&&C.length>=2,has_mismatch:y==="confirmed"&&C.some(H=>H.mismatch),unlaunched:X,...ae})}),u}function Xb(e,t,n){if(e.lane==="runnable"){let s=n.get(e.id);return s?s.length===0?{scope:[],state:"missing"}:{scope:s,state:"declared"}:{scope:[],state:void 0}}let r=t.get(e.root_dir),o=r?r[e.id]:void 0;if(!o||!Array.isArray(o.scope))return{scope:[],state:void 0};let i=o.scope.filter(s=>typeof s=="string"&&s.length>0);return{scope:i,state:i.length===0?"missing":"declared"}}function Zb(e,t,n,r,o){let i=new Map;for(let a of[...e.running,...e.queue,...e.runnable,...e.pr_wait]){if(!t.has(a.root_dir))continue;let u=`${a.root_dir}\0${a.id}`,d=i.get(u);if(d){d.cards.push(a);continue}let{scope:f,state:_}=Xb(a,t,n);_!==void 0&&(a.scope_state=_),i.set(u,{cards:[a],scope:f})}let s=new Map;for(let a of i.values()){let u=a.cards[0].scope_state;if(u!==void 0)for(let _ of a.cards)_.scope_state=u;if(a.scope.length===0)continue;let d=a.cards[0].root_dir,f=s.get(d);f?f.push(a):s.set(d,[a])}let l=(a,u,d)=>{let f=u.cards[0],_={id:f.id,title:f.title,location_label:Kb(f.id,r,o),prefixes:d,...typeof f.root_dir=="string"&&f.root_dir.length>0?{root_dir:f.root_dir}:{}};for(let y of a.cards)y.overlap_chips?y.overlap_chips.push(_):y.overlap_chips=[_]};for(let a of s.values())for(let u=0;u<a.length;u+=1)for(let d=u+1;d<a.length;d+=1){let f=qi(a[u].scope,a[d].scope);f.length!==0&&(l(a[u],a[d],f),l(a[d],a[u],f))}}function Hl(e,t,n,r){let o=n?n.get(t)?.root_dir:void 0,i=r?r[t]:void 0,s=!Xn(e.id,t),l=typeof e.root_dir=="string"?e.root_dir:"",a=typeof o=="string"&&o.length>0?o:typeof i=="string"&&i.length>0?i:s&&l.length>0?l:"";return a.length>0?{openable:!0,root_dir:a}:s?{openable:!0}:{}}function Jb(e,t,n,r){let o=new Set(e?e.ids:[]);for(let l of t&&Array.isArray(t.ids)?t.ids:[])typeof l=="string"&&l.length>0&&o.add(l);if(o.size===0)return{ids:[]};let i={},s={...e?e.root_dirs:{},...t&&t.root_dirs&&typeof t.root_dirs=="object"?t.root_dirs:{}};for(let l of o){let a=s[l];if(typeof a=="string"&&a.length>0){i[l]=a;continue}if(!Xn(n.id,l)){n.root_dir.length>0&&(i[l]=n.root_dir);continue}let u=r.get(l)?.root_dir;typeof u=="string"&&u.length>0&&(i[l]=u)}return{ids:[...o],root_dirs:i}}function zl(e){if(typeof e=="number")return Number.isFinite(e)?e:null;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:null}return null}function ra(e){if(typeof e=="number"&&Number.isFinite(e))return e;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:0}return 0}function ey(e){let t=typeof e=="string"?e.trim().toLowerCase():"";return t.length===0?null:n=>{let r=typeof n.id=="string"?n.id.toLowerCase():"",o=typeof n.title=="string"?n.title.toLowerCase():"";return r.includes(t)||o.includes(t)}}function ty(e,t){let n=[e.runnable,e.runnable_all,e.queue,e.running,e.pr_wait,e.done,e.parallel_rows];for(let o of e.runnable_sections)n.push(o.items);let r=[];for(let o of e.queue_groups){n.push(o.items,o.sublanes.parallel);for(let i of o.sublanes.serial)n.push(i.items),r.push(i.occupants)}for(let o of n)for(let i of o)i.search_match=t(i);for(let o of r)for(let i of o)i.search_match=t(i)}function Cr(e,t,n){let r=Array.isArray(e)?e:[],o=Array.isArray(t)?t:[],i=n&&typeof n.done_since=="number"?n.done_since:void 0,s={...No,...n&&n.candidate_filter?n.candidate_filter:{}},l=n&&Object.hasOwn(n,"cross_lanes")?n.cross_lanes??null:void 0,a=n&&n.candidate_sort==="as_given"?"as_given":n&&As.some(x=>x.value===n.candidate_sort)?n.candidate_sort:"repo_spec",u=n&&n.groups==="all"?"all":"nonempty",d=n&&n.candidate_hidden_counts==="per_control"?"per_control":"sequential",f=Date.now(),_=new Map;for(let x of o)x&&typeof x.root_dir=="string"&&_.set(x.root_dir,x);let y=new Map;for(let x of o)x&&typeof x.root_dir=="string"&&y.set(x.root_dir,x.name||x.root_dir);for(let x of r)x&&typeof x.root_dir=="string"&&y.set(x.root_dir,x.name||x.root_dir);let g=[],C=[],k=[],X=[],ae=[],H=[],N=new Map,P=new Map,j=new Map,B=new Map,W=new Map,T=new Map,S=new Map,I=new Map,O=new Map,J=new Map,ce=new Map,Se=new Map,K=new Map,te=new Map,fe=new Map,Re=new Map,V=new Set,le=new Map,ee=new Map,M=new Map;for(let x of r){if(!x||typeof x.root_dir!="string")continue;let re=x.root_dir,Ne=x.name||re,Ce=_.get(re),je=Ce&&typeof Ce.revision=="number"?Ce.revision:typeof x.revision=="number"?x.revision:0,We=Xe(x.attempts),ct=Ce&&Ce.runner_catalog||x.runner_catalog||null,It=Xe(x.bead_titles);for(let[p,m]of Object.entries(It))typeof m=="string"&&m.length>0&&M.set(p,m);let pe=Xe(x.bead_times),$e=Xe(x.pr_observations),Qe=Xe(x.admission),ht=Xe(x.blocker_workspaces);Se.set(re,ht);for(let[p,m]of Object.entries(Qe))m&&typeof m=="object"&&ce.set(p,m);let st=Xe(x.revise_parked),ut=Xe(x.merge_queue_state),vt=Xe(x.cleanup_failed),tt=Xe(x.discard_operations),Be=Xe(x.bead_timelines),E=Xe(x.bead_blocked_by);Object.hasOwn(x,"bead_scope")&&le.set(re,Xe(x.bead_scope));let U=Xe(x.bead_workflow),z=Xe(x.pr_activity),ve=Array.isArray(x.repo_operations)?x.repo_operations:[];I.set(re,ve);let Ae=typeof x.declared_base=="string"?x.declared_base:null;S.set(re,Ae),T.set(re,Object.entries(vt).map(([p,m])=>({bead_id:p,step:m&&m.step?m.step:"",reason:m&&m.reason?m.reason:"",at:m&&typeof m.at=="number"?m.at:null,detail:m&&typeof m.detail=="string"?m.detail:null,output_tail:m&&typeof m.output_tail=="string"&&m.output_tail?m.output_tail:void 0,log_path:m&&typeof m.log_path=="string"&&m.log_path?m.log_path:void 0,retry_count:m&&typeof m.retry_count=="number"&&Number.isInteger(m.retry_count)&&m.retry_count>0?m.retry_count:0,failure_code:m&&typeof m.failure_code=="string"?m.failure_code:void 0})));for(let[p,m]of Object.entries(Xe(x.bead_overlay)))m&&typeof m=="object"&&O.set(`${re}\0${p}`,m);let $t=new Map;for(let p of Object.values(We))p&&typeof p.attempt_id=="string"&&$t.set(p.attempt_id,p);let kt=Array.isArray(x.merge_queue)?x.merge_queue:[],Ct=new Set(kt.filter(p=>p&&typeof p.bead_id=="string").map(p=>p.bead_id)),jt=new Map(kt.filter(p=>p&&typeof p.bead_id=="string").map(p=>[p.bead_id,p])),Wt=new Map,Qt=new Map,sn=new Map,xt=new Map;kt.forEach((p,m)=>{p&&typeof p.bead_id=="string"&&(Wt.set(p.bead_id,m+1),Qt.set(p.bead_id,p.resolution),sn.set(p.bead_id,p.continuation_action||null),xt.set(p.bead_id,p.authority||null))});let tn=Xe(x.auto_merge_skips),pn=p=>{let m=tn[p];if(!m)return null;let w=Xe(Xe($e[p]).pr).head_sha;return w&&w===m.head_sha?m.reason||"":null};W.set(re,{positions:Wt,resolutions:Qt,continuations:sn,authorities:xt,state:{active:typeof ut.active=="string"?ut.active:null,failures:Xe(ut.failures),waiting:ut.waiting&&typeof ut.waiting.bead_id=="string"&&typeof ut.waiting.reason=="string"?ut.waiting:null},auto_excluded:(Array.isArray(x.pr_wait)?x.pr_wait:[]).map(p=>p&&p.bead_id).filter(p=>typeof p=="string"&&pn(p)!==null),running:kt.length>0});let Bt=Array.isArray(x.queue)?x.queue:[];for(let p of[...Bt,...Array.isArray(x.pr_wait)?x.pr_wait:[]])p&&typeof p.bead_id=="string"&&typeof p.armed_by_lane=="string"&&p.armed_by_lane.length>0&&fe.set(p.bead_id,p.armed_by_lane);for(let p of Array.isArray(x.disarmed_on_load)?x.disarmed_on_load:[])typeof p=="string"&&p.length>0&&V.add(p);let Gt=(Array.isArray(x.serial_lanes)?x.serial_lanes:[]).filter(p=>p&&/^s[1-5]$/.test(p.id)&&Array.isArray(p.entries)),on=Xe(x.lane_states),Ue=typeof x.serial_lane_count=="number"?Math.max(0,Math.min(5,Math.floor(x.serial_lane_count))):Math.min(5,Gt.length);j.set(re,Ue),B.set(re,Bt.length);let L=new Map(Gt.map(p=>[p.id,p])),ke=new Map;for(let p of Gt)for(let m of p.entries)m&&typeof m.bead_id=="string"&&ke.set(m.bead_id,p.id);for(let[p,m]of Object.entries(Xe(x.bead_dependents))){let w=Array.isArray(m?.ids)?m.ids:[],Y=Xe(m?.root_dirs),ne=te.get(p)||{ids:new Set,root_dirs:{}};for(let _e of w)typeof _e=="string"&&_e.length>0&&ne.ids.add(_e);for(let[_e,Pe]of Object.entries(Y))typeof Pe=="string"&&Pe.length>0&&(ne.root_dirs[_e]=Pe);te.set(p,ne)}for(let[p,m]of Object.entries(E))Array.isArray(m)&&J.set(p,m.filter(w=>typeof w=="string"&&w.length>0));let Me=Array.isArray(x.done)?x.done:[];for(let p of Me)p&&typeof p.bead_id=="string"&&H.push({id:p.bead_id,root_dir:re,workspace_name:Ne});let At=new Map;for(let p of Me)p&&typeof p.bead_id=="string"&&typeof p.added_at=="number"&&At.set(p.bead_id,p.added_at);let ze=p=>({id:p,title:It[p]||p,root_dir:re,workspace_name:Ne,expected_revision:je,draggable:!1,...Xe(pe[p]).created_at?{created_at:Xe(pe[p]).created_at}:{},...Xe(pe[p]).updated_at?{updated_at:Xe(pe[p]).updated_at}:{}}),Dt=p=>{let m=U[p]?.chips?.pr;return m&&typeof m.number=="number"&&typeof m.url=="string"?{pr_number:m.number,pr_url:m.url}:{}},Ut=p=>Object.hasOwn(E,p)?{blocked_by:Array.isArray(E[p])?E[p].filter(m=>typeof m=="string"&&m.length>0):[]}:{},ot=(p,m)=>{let w=Ut(p),Y=Qe[p],ne=Y&&Y.reason==="prerequisite_unmet"&&Array.isArray(Y.blockers)?Y.blockers:[],_e=(m?.blockers||[]).map(Ke=>Ke.id).filter(Ke=>typeof Ke=="string"&&Ke.length>0);if(m&&Object.hasOwn(E,p)){let Ke=w.blocked_by||[],bt=_e.filter(Ot=>!Ke.includes(Ot));return bt.length>0&&K.set(`${re}\0${p}`,bt),{blocked_by:Ke,wait:{...m,returning:Ke.length===0}}}let Pe=[..._e,...ne.map(Ke=>Ke.id)].filter(Ke=>typeof Ke=="string"&&Ke.length>0);if(Pe.length===0)return m?{...w,wait:{...m,returning:!1}}:w;let wt=[...w.blocked_by||[]];for(let Ke of Pe)wt.includes(Ke)||wt.push(Ke);return{blocked_by:wt,...m?{wait:{...m,returning:!1}}:{}}},Rt=new Set;for(let[p,m]of qp(We,At,{discard_operations:tt,observations:$e,bead_timelines:Be,provider_hold:Xe(x.provider_hold),auto_resume_pending:Array.isArray(x.auto_resume_pending)?x.auto_resume_pending:[],account_catalog:Xe(x.account_catalog),runner_catalog:ct,admission:Qe})){Rt.add(p);let w=m.run_state==="failed"?Vb(We,m.attempt_id):null;w!==null&&Re.set(p,w);let Y=$t.get(m.attempt_id)||null,ne=O.get(`${re}\0${p}`),_e=ne&&ne.rollup?ne.rollup:null,Pe=Vl(Ae,Y?Y.target_base:null),wt=Y?Yl(Y,$t):!1,Ke=Y&&Y.quickfix_lane===!0&&Y.quickfix_landing&&typeof Y.quickfix_landing=="object"?Y.quickfix_landing:null,bt=Ke&&typeof Ke.reason=="string"&&Ke.reason.length>0?Ke.reason:null,Ot=Ke?xs({bead_id:p,merge_sha:Ke.head_sha,cleanup_cursor:Ke.cursor,cleanup_failed:bt?{step:Ke.cursor,reason:bt}:null,repo_operations:ve}):null,A=ot(p,m.wait);C.push({...ze(p),lane:"running",...A,...ke.has(p)?{serial_lane_id:ke.get(p)}:{},attempt_id:m.attempt_id,run_state:m.run_state,status:m.status||void 0,workflow:U[p]||null,can_pause:m.can_pause,can_resume:m.can_resume,started_at:m.started_at,last_event_at:m.last_event_at,last_activity:m.last_activity,legs:m.legs,runner:m.runner,model:m.model,effort:m.effort,speed:m.speed,resumed_from:m.resumed_from,continuation_mode:m.continuation_mode,usage:m.usage,failure:m.failure||null,hold:m.hold||null,wait:A.wait||m.wait||null,retry:m.retry||null,exec_chips:{orchestration:Di(m),worker:Wp(Xe(Ce),ne,m.runner||null)},discard:pr(tt,p,{attempt_id:m.attempt_id,merged:m.failure?.confirmation==="merged"||Xe($e[p]).pr?.state==="MERGED"}),..._e?{rollup:_e}:{},...wt?{conflict_resolution:!0}:{},...Pe?{base_exception:Pe}:{},...Ot?{landing:Ot}:{},badges:m.run_state==="paused"?["\u23F8 \uC77C\uC2DC\uC815\uC9C0"]:m.run_state==="failed"?["\u26A0 \uC2E4\uD328"]:m.run_state==="parked"?["\u23F8 \uC138\uC158 \uB300\uAE30"]:m.run_state==="retry_wait"?["\u21BB \uC7AC\uC2DC\uB3C4 \uB300\uAE30"]:m.run_state==="waiting"?["\u26D3 \uC120\uD589 \uB300\uAE30"]:m.run_state==="provider_hold"?["\uACF5\uAE09\uC790 \uBCF4\uB958"]:[],alert:m.run_state==="failed"})}for(let[p,m]of wd(We)){if(C.some(Y=>Y.id===p))continue;let w=m.attempt;C.push({...ze(p),lane:"running",kind:"session",...Ut(p),attempt_id:typeof w.attempt_id=="string"?w.attempt_id:"",run_state:"running",status:"running",non_occupying:!0,workflow:U[p]||null,can_pause:!1,can_resume:!1,started_at:m.started_at,last_event_at:typeof w.last_event_at=="number"?w.last_event_at:null,last_activity:w.last_activity&&typeof w.last_activity=="object"?w.last_activity:null,legs:Array.isArray(w.legs)?w.legs:[],runner:typeof w.runner=="string"?w.runner:null,model:typeof w.model=="string"?w.model:null,effort:typeof w.effort=="string"?w.effort:null,speed:typeof w.speed=="string"?w.speed:null,resumed_from:null,continuation_mode:null,usage:w.usage&&typeof w.usage=="object"?w.usage:null,exec_chips:{orchestration:Di(w),worker:null},discard:pr(tt,p,{merge_queued:!0}),badges:[m.origin==="auto"?"\uB9AC\uBDF0 \xB7 \uC790\uB3D9":"\uB9AC\uBDF0"],alert:!1})}for(let p of Array.isArray(x.session_active)?x.session_active:[]){let m=p&&p.bead_id;typeof m!="string"||Rt.has(m)||(Rt.add(m),Array.isArray(p.blocked_by)&&p.blocked_by.length>0&&J.set(m,p.blocked_by.filter(w=>typeof w=="string"&&w.length>0)),typeof p.title=="string"&&p.title.length>0&&M.set(m,p.title),C.push({...ze(m),title:p.title||It[m]||m,lane:"running",kind:"session",status:"in_progress",started_at:zl(p.started_at)??zl(p.updated_at)??void 0,updated_at:zl(p.updated_at)??void 0,workflow:p.workflow||null,labels:Array.isArray(p.labels)?p.labels:[],spec_id:typeof p.spec_id=="string"?p.spec_id:"",blocked:p.blocked===!0,...Array.isArray(p.blocked_by)?{blocked_by:p.blocked_by.filter(w=>typeof w=="string"&&w.length>0)}:{},draggable:!1,can_pause:!1,can_resume:!1,exec_chips:null,usage:null,legs:[],last_activity:null,session_refs:Array.isArray(p.session_refs)?p.session_refs:[],badges:[],alert:!1}))}for(let p of Array.isArray(x.pr_wait)?x.pr_wait:[]){let m=p&&p.bead_id;if(typeof m!="string"||Rt.has(m))continue;Rt.add(m);let w=Xe($e[m]),Y=Xe(w.pr),ne=w.gate?Xe(w.gate):null,_e=Ct.has(m),Pe=jt.get(m)?.continuation_action||null,wt=!!Pe&&Pe.continuation===null,Ke=ut.active===m,bt=p.external===!0,Ot=vt[m]||null,A=Xe(z[m]),R=xs({bead_id:m,merge_sha:p.merge_sha,cleanup_cursor:p.cleanup_cursor,merge_progress:A.merge_progress||null,cleanup_failed:Ot,repo_operations:ve}),Ie=na(R),De=!!ne&&ne.base_badge==="\uCDA9\uB3CC",it=!!Ot&&["post_merge_jobs","child_sweep","branch_cleanup","parent_close"].includes(Ot.step)&&!!ne&&ne.tier==="merged",yt=bt&&!!Ot&&!!ne&&ne.tier==="merged",nn=!!ne&&["closed_unmerged","review","undecidable"].includes(ne.tier),Dn=pr(tt,m,{external:bt,merge_active:Ke||R?.step==="merge",merge_queued:_e,cleanup_active:Ie,merged:!!Ot||ne?.tier==="merged"}),Nr=!!Dn.operation,qr=Nb(w.receipt_check);k.push({...ze(m),lane:"pr_wait",...Ut(m),...qr.length>0?{receipt_badge:{codes:qr}}:{},workflow:U[m]||null,pr_number:typeof Y.number=="number"?Y.number:null,pr_url:typeof Y.url=="string"?Y.url:void 0,external:bt,usage:ur(We,m,ct),merge_step:R,badges:wt?["\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694"]:R?[ne?.tier==="merged"?"\uBA38\uC9C0\uB428":"\uBA38\uC9C0 \uC911"]:Ot?[no(Ot.step)?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${no(Ot.step)}`:"\uC815\uB9AC \uBA48\uCDA4"]:typeof ne?.gate_badge=="string"&&ne.gate_badge.length>0?[ne.gate_badge]:[],alert:R?R.failed===!0:!!Ot||nn,reason:Ot&&R?.active!==!0?ta(Ot.step):"PR \uB300\uAE30",merge_action:ne?.tier==="merged"&&!it&&!yt?!1:!_e||wt,merge_enabled:!Nr&&(wt||ne?.enabled===!0||De||it||yt),merge_label:wt?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":yt||it?"\uC815\uB9AC \uC7AC\uC2DC\uB3C4":De&&!it?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":void 0,merge_title:wt?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":Nr?Dn.error?`\uD3D0\uAE30 \uC2E4\uD328: ${Dn.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${Dn.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:yt?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uB2E4\uC2DC \uC2DC\uB3C4\uD569\uB2C8\uB2E4":it?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC2DC\uB3C4\uD569\uB2C8\uB2E4":De?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":ne?.enabled===!0?`\uBA38\uC9C0 (${ne.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4`:`\uBA38\uC9C0 \uBD88\uAC00: ${ne?.reason||"\uAD00\uCE21 \uB300\uAE30"}`,cancel_action:_e&&!wt,cancel_enabled:!Ke,continuation_mismatch:Pe?.mismatch||null,discard:Dn,discard_action:Dn.action,discard_enabled:Dn.enabled,discard_title:Dn.title})}let bn=(p,m,w,Y)=>{let ne=p&&p.bead_id;if(typeof ne!="string"||Rt.has(ne))return null;Rt.add(ne);let _e=st[ne],Pe=pr(tt,ne),wt=Pe.operation?Pe:null,Ke={...ze(ne),lane:m,...typeof p.added_at=="number"?{added_at:p.added_at}:{},workflow:U[ne]||null,draggable:!wt,discard:wt||void 0,reason:Pp(Qe,ne),seq:w+1,queue_position:w+1,queue_index:w,queue_length:Y,badges:_e?["\u23F8 REVISE \uD30C\uD0B9"]:[],alert:!!_e,revise_action:!!_e,revise_enabled:!!_e&&!wt,revise_title:_e?_e.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${_e.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":""},bt=ot(ne,null);return Object.hasOwn(bt,"blocked_by")&&(Ke.blocked_by=bt.blocked_by),Ke};for(let p=0;p<Bt.length;p++){let m=bn(Bt[p],"queue",p,Bt.length);if(!m)continue;X.push(m);let w=N.get(re);w?w.push(m):N.set(re,[m])}let Nt=p=>{let m=k.find(_e=>_e.id===p&&_e.root_dir===re);if(m)return{id:p,title:m.title,badge:"PR \uB300\uAE30 \xB7 \uC810\uC720"};let w=C.find(_e=>_e.id===p&&_e.root_dir===re),Y=w?w.run_state:Eb(We,p),ne=Y==="failed"||Y==="orphaned"?"\uC2E4\uD328 \xB7 \uC810\uC720 \uC720\uC9C0":Y==="paused"?"\uC77C\uC2DC\uC815\uC9C0 \xB7 \uC810\uC720":"\uC2E4\uD589 \uC911 \xB7 \uC810\uC720";return{id:p,title:w?w.title:ze(p).title,badge:ne}},kn=[];for(let p=0;p<Math.max(Ue,Gt.length);p++){let m=`s${p+1}`,w=L.get(m),Y=w&&Array.isArray(w.entries)?w.entries:[],ne=Xe(on[m]),_e=Array.isArray(ne.occupied_by)?ne.occupied_by.filter(bt=>typeof bt=="string"):[],Pe=new Set(_e),wt=new Set(Y.map(bt=>bt?.bead_id).filter(bt=>typeof bt=="string"&&Pe.has(bt)&&Up(Qe,bt))),Ke=[];for(let bt=0;bt<Y.length;bt++){let Ot=Y[bt]&&Y[bt].bead_id;if(typeof Ot=="string"&&Pe.has(Ot)&&!wt.has(Ot)){Rt.add(Ot);continue}let A=bn(Y[bt],m,bt,Y.length);A&&(typeof Ot=="string"&&wt.has(Ot)&&(A.badges=[Nt(Ot).badge,...A.badges||[]]),Ke.push(A),X.push(A))}Ke.length===0&&_e.length===0&&(Ue<=1||p>=Ue)||kn.push({id:m,index:p,items:Ke,raw_length:Y.length,occupied_by:_e,occupants:_e.filter(bt=>!wt.has(bt)).map(bt=>Nt(bt)),corrections:Array.isArray(ne.corrections)?ne.corrections.length:0,cycle:ne.cycle===!0,...Ke.length===0&&_e.length===0?{empty:!0}:{}})}P.set(re,kn);let b=Array.from({length:Ue},(p,m)=>{let w=`s${m+1}`,Y=L.get(w),ne=Y&&Array.isArray(Y.entries)?Y.entries:[],_e=Xe(on[w]);return{id:w,index:ne.length,length:ne.length,occupied_by:Array.isArray(_e.occupied_by)?_e.occupied_by.filter(Pe=>typeof Pe=="string"):[]}});for(let p of Array.isArray(x.runnable)?x.runnable:[]){let m=p&&p.bead_id;if(typeof m!="string"||Rt.has(m))continue;Rt.add(m);let w=p.workflow&&typeof p.workflow=="object"?p.workflow:null,Y=w&&typeof w.route=="string"&&w.route||(typeof p.route=="string"?p.route:null),ne=qb(Xe(Ce),p.exec_pins,Y),_e=fs(p.rec,p.exec_pins);Array.isArray(p.blocked_by)&&p.blocked_by.length>0&&J.set(m,p.blocked_by.filter(yt=>typeof yt=="string"&&yt.length>0)),typeof p.title=="string"&&p.title.length>0&&M.set(m,p.title),Array.isArray(p.scope)&&ee.set(m,p.scope.filter(yt=>typeof yt=="string"&&yt.length>0));let Pe=Object.hasOwn(p,"eligible"),Ke=!Pe&&Object.hasOwn(p,"route")&&Object.hasOwn(p,"spec_state")&&Object.hasOwn(p,"has_description")&&Object.hasOwn(p,"awaiting_user")&&Object.hasOwn(p,"worker_ineligible")?Cl({route:typeof p.route=="string"?p.route:"",spec:p.spec_state,has_description:p.has_description===!0,awaiting_user:p.awaiting_user===!0,worker_ineligible:p.worker_ineligible===!0},null):null,bt=Pe?p.eligible!==!1:Ke?Ke.placeable:!0,Ot=Ke?Ke.worker_ineligible:p.worker_ineligible===!0,A=bt&&!Ot,R=Ke?{route_ok:Ke.route_ok,awaiting_user:Ke.awaiting_user,missing_description:Ke.missing_description,placement_spec:Ke.spec}:Object.hasOwn(p,"route_ok")?{route_ok:p.route_ok===!0,awaiting_user:p.awaiting_user===!0,missing_description:p.missing_description===!0,placement_spec:p.placement_spec}:null,Ie=[];!Pe&&Ke&&!Ke.placeable&&Ie.push(Zr(Ke)),typeof p.reason=="string"&&p.reason.length>0&&Ie.push(p.reason);let De=Pp(Qe,m);De&&Ie.push(De);let it=jb(m,p.release_info,f)?.map(yt=>({...yt,...Hl({id:m,root_dir:re},yt.id)}));g.push({...ze(m),title:p.title||It[m]||m,lane:"runnable",draggable:!Pe&&A,queue_placeable:A,...R||{},...Ot?{worker_ineligible:!0}:{},...p.session_preferred===!0?{session_preferred:!0,session_preferred_reason:typeof p.session_preferred_reason=="string"?p.session_preferred_reason:""}:{},...p.spec_after_blocker===!0?{spec_after_blocker:!0}:{},...it?{dependency_chips:{released:it}}:{},...p.dependents_info&&typeof p.dependents_info=="object"?{dependents_info:p.dependents_info}:{},reason:Ie.join(" \xB7 "),created_at:p.created_at??void 0,updated_at:p.updated_at??void 0,status:typeof p.status=="string"?p.status:void 0,labels:Array.isArray(p.labels)?p.labels:[],spec_id:typeof p.spec_id=="string"?p.spec_id:"",published:p.published===!0,workflow:w||(Y?{route:Y,chips:{route:Y}}:null),...ne?{exec_chips:ne}:{},..._e?{rec:_e}:{},blocked:p.blocked===!0,...Array.isArray(p.blocked_by)?{blocked_by:p.blocked_by.filter(yt=>typeof yt=="string"&&yt.length>0)}:{},place_index:Bt.length,place_lanes:b})}for(let p of Me){let m=p&&p.bead_id;if(typeof m!="string"||Rt.has(m)||(Rt.add(m),i!==void 0&&typeof p.added_at=="number"&&p.added_at<i))continue;let w=Tb(We,m),Y=w&&typeof w.done_kind=="string"?w.done_kind:null,ne=Wb(Xe(Ce),O.get(`${re}\0${m}`),w);ae.push({...ze(m),lane:"done",done:!0,workflow:U[m]||null,...ne?{exec_chips:ne}:{},done_layout:"three_line",usage:ur(We,m,ct),work_ms:fp(We,m),done_at:typeof p.added_at=="number"?p.added_at:void 0,done_kind:Y,...Dt(m),badges:[...Y&&Ip[Y]?[Ip[Y]]:[],...dp(We,m)]})}for(let p of Array.isArray(x.session_done)?x.session_done:[]){let m=p&&(p.id||p.bead_id);typeof m!="string"||Rt.has(m)||(Rt.add(m),ae.push({...ze(m),...p,id:m,root_dir:re,workspace_name:Ne,expected_revision:je,lane:"done",done:!0}))}}if(O.size>0)for(let x of[...g,...X,...C,...k,...ae]){let re=O.get(`${x.root_dir}\0${x.id}`);if(!re)continue;typeof re.priority=="number"&&(x.priority=re.priority),typeof re.from_id=="string"&&re.from_id.length>0&&(x.from_id=re.from_id),x.lane==="done"&&Array.isArray(re.carried_to)&&re.carried_to.length>0&&(x.carried_to=re.carried_to);let Ne=Xe(x.workflow),Ce=Xe(Ne.chips);if(!Ce.route&&!Ne.route&&typeof re.route=="string"&&re.route.length>0&&(x.workflow={...Ne,route:re.route,chips:{...Ce,route:re.route}}),!Object.hasOwn(re,"metadata"))continue;let je=Xe(re.metadata);if(x.rec=fs(je),x.lane==="runnable"||x.lane.startsWith("s")||x.lane==="queue"){let We=Ub(Xe(_.get(x.root_dir)),je,typeof re.route=="string"&&re.route.length>0?re.route:Xe(x.workflow).route);We&&(x.exec_chips=We)}}let oe=new Map;o.forEach((x,re)=>{x&&typeof x.root_dir=="string"&&oe.set(x.root_dir,re)});let se=n&&n.running_sort==="repo"?"repo":"started";C.sort((x,re)=>{let Ne=x.kind==="session",Ce=re.kind==="session";if(Ne!==Ce)return Ne?1:-1;if(Ne&&Ce){let ct=ra(re.updated_at)-ra(x.updated_at);return ct!==0?ct:x.id.localeCompare(re.id)}if(se==="repo"){let ct=oe.get(x.root_dir)??Number.MAX_SAFE_INTEGER,It=oe.get(re.root_dir)??Number.MAX_SAFE_INTEGER;if(ct!==It)return ct-It}let je=typeof x.started_at=="number"&&Number.isFinite(x.started_at)?x.started_at:null,We=typeof re.started_at=="number"&&Number.isFinite(re.started_at)?re.started_at:null;return je!==null&&We!==null&&je!==We?je-We:je===null&&We!==null?1:je!==null&&We===null?-1:x.id.localeCompare(re.id)}),ae.sort((x,re)=>(re.done_at??0)-(x.done_at??0));let he=o.length>0?o:r.map(x=>({root_dir:x&&x.root_dir,name:x&&x.name,auto_advance:x&&x.auto_advance,auto_merge:x&&x.auto_merge,slots:x&&x.slots,revision:x&&x.revision,runner_catalog:x&&x.runner_catalog})),xe=new Set(g.map(x=>x.root_dir)),Ze=new Map;for(let x of C)x.kind==="session"||x.run_state!=="running"||Ze.set(x.root_dir,(Ze.get(x.root_dir)||0)+1);let G=new Map;for(let x of ae){let re=G.get(x.root_dir);re?re.push(x):G.set(x.root_dir,[x])}let ge={positions:new Map,resolutions:new Map,continuations:new Map,authorities:new Map,state:{active:null,failures:{},waiting:null},auto_excluded:[],running:!1},ue=[];for(let x of he){if(!x||typeof x.root_dir!="string")continue;let re=N.get(x.root_dir)||[],Ne=P.get(x.root_dir)||[],Ce=re.length>0||Ne.some(ct=>ct.items.length>0||ct.occupied_by.length>0);if(u!=="all"&&!Ce&&!xe.has(x.root_dir))continue;let je=typeof x.slots=="number"&&x.slots>=oa?x.slots:oa,We=Ze.get(x.root_dir)||0;ue.push({live_count:We,over_cap:We>je,merge:W.get(x.root_dir)||ge,token_total:zb(G.get(x.root_dir)||[]),cleanup_failures:T.get(x.root_dir)||[],declared_base:S.get(x.root_dir)??null,repo_operations:I.get(x.root_dir)||[],root_dir:x.root_dir,name:x.name||x.root_dir,auto_advance:x.auto_advance===!0,auto_merge:x.auto_merge===!0,slots:je,revision:typeof x.revision=="number"?x.revision:0,runner_catalog:Xe(x.runner_catalog),items:re,sublanes:{parallel:re,serial:Ne},serial_lane_count:j.get(x.root_dir)||0,raw_queue_length:B.get(x.root_dir)||0})}let Q={runnable:g,runnable_all:g,runnable_hidden:{blocked:0,readiness:0,route:0},runnable_sections:[],runnable_flat:a==="updated_flat"||a==="as_given",queue:X,queue_groups:ue,running:C,pr_wait:k,done:ae,parallel_rows:[],chain_lanes:[],cross_lanes_revision:l&&typeof l.revision=="number"?l.revision:null,cross_lanes_unreadable:l===null,parallel_raw_length:Object.fromEntries(B),owner_of:{}},Ee=Zd(Q);for(let x of H)Ee.has(x.id)||Ee.set(x.id,{root_dir:x.root_dir,workspace_name:x.workspace_name,lane:"done",state:"done"});for(let x of[...Q.queue,...Q.runnable,...Q.running,...Q.pr_wait]){if(!Object.hasOwn(x,"blocked_by"))continue;let re=Ee.get(x.id),Ne=Se.get(x.root_dir)||{};x.blockers=(x.blocked_by||[]).map(Ce=>{let je=Ee.get(Ce)?.workspace_name||Kl(Ne[Ce]);return{...Jd(Ce,re,Ee,o),...je?{workspace_name:je}:{}}})}for(let x of[...Q.queue,...Q.runnable,...Q.running,...Q.pr_wait]){let re=Se.get(x.root_dir)||{},Ne=(x.blockers||[]).map(ct=>({...Wl(x.id,ct),...Hl(x,ct.id,Ee,re)})),Ce=(K.get(`${x.root_dir}\0${x.id}`)||[]).map(ct=>{let It=Ee.get(ct),pe=It?.root_dir||re[ct];return{...Cp(x.id,ct,It?.workspace_name||Kl(pe),pe),...Hl(x,ct,Ee,re)}}),je=Rp(x.id,Jb(te.get(x.id),x.dependents_info,x,Ee));if(Ne.length===0&&Ce.length===0&&je.length===0)continue;let We={...x.dependency_chips||{},...Ne.length>0?{predecessors:Ne}:{},...Ce.length>0?{released:Ce}:{},...je.length>0?{dependents:je}:{}};x.dependency_chips=We}Zb(Q,le,ee,Ee,o);let be=ep(Q.queue_groups);for(let x of Q.queue_groups)for(let re of x.sublanes.serial){let Ne=be.get(tp(x.root_dir,re.id));Ne&&(re.cross_wait_peers=Ne)}let Le=new Map;for(let x of[...Q.queue,...Q.running,...Q.pr_wait,...Q.done,...Q.runnable]){if(Le.has(x.id))continue;let re=Xe(x.workflow),Ne=Xe(re.chips),Ce=O.get(`${x.root_dir}\0${x.id}`),je=(typeof Ne.route=="string"&&Ne.route.length>0?Ne.route:typeof re.route=="string"&&re.route.length>0?re.route:Ce&&typeof Ce.route=="string"&&Ce.route.length>0?Ce.route:null)||null,We=typeof Ne.route_source=="string"?Ne.route_source:typeof re.route_source=="string"?re.route_source:null;Le.set(x.id,{route:je,route_source:We,exec_chips:x.exec_chips||null,added_at:typeof x.added_at=="number"?x.added_at:null})}Q.chain_lanes=Qb(l&&Array.isArray(l.lanes)?l.lanes:[],J,Ee,o,M,y,{armed_by_bead:fe,failed_by_bead:Re,disarmed_lanes:V},ce,Le);let qe=new Map;for(let x of[...Q.queue,...Q.runnable])qe.has(x.id)||qe.set(x.id,x);let Je=new Set;for(let x of Q.chain_lanes)for(let re of x.rows){if(x.status==="confirmed"&&!re.unplaced&&!re.fixed&&Je.add(re.id),!x.draft&&!re.unplaced)continue;let Ne=qe.get(re.id);Ne&&(Ne.cross_lane_chip={lane_id:x.lane_id,number:x.number,status:x.status,label:x.draft?`\uC5F0\uACB0 ${x.number} (draft)`:`\uC5F0\uACB0 ${x.number}`})}let He=new Map(Q.chain_lanes.map(x=>[x.lane_id,x]));for(let x of[...Q.queue,...Q.running]){let re=fe.get(x.id);if(typeof re!="string"||re.length===0)continue;let Ne=He.get(re);x.armed_lane_chip=Ne===void 0||Ne.status==="draft"?{lane_id:re,label:"\u25B6 \uC9C4\uD589 \uC911 \xB7 \uB808\uC778 \uC5C6\uC74C",orphan:!0}:{lane_id:re,label:`\u25B6 \uC5F0\uACB0 ${Ne.number}`,orphan:!1}}let ie=[];for(let x of N.values())for(let re of x)Je.has(re.id)||ie.push(re);ie.sort((x,re)=>{let Ne=x.workspace_name.localeCompare(re.workspace_name);return Ne!==0?Ne:(x.queue_index??0)-(re.queue_index??0)}),Q.parallel_rows=ie;let Z={};for(let[x,re]of Ee)typeof re.root_dir=="string"&&re.root_dir.length>0&&(Z[x]=re.root_dir);for(let x of Q.chain_lanes)for(let re of x.rows)!Object.hasOwn(Z,re.id)&&re.root_dir.length>0&&y.has(re.root_dir)&&(Z[re.id]=re.root_dir);Q.owner_of=Z;let Oe=Q.runnable.length;Q.runnable_all=Q.runnable.slice();let nt=Q.runnable,pt=x=>s.show_blocked||x.blocked!==!0,Ye=x=>s.readiness==="all"||(s.readiness==="ready"?x.queue_placeable===!0:x.queue_placeable!==!0),_t=ro(s.routes),Pt=x=>_t.length===0||_t.includes(Hb(x));if(d==="per_control"){let x=[],re=0,Ne=0,Ce=0;for(let je of nt){let We=pt(je),ct=Ye(je),It=Pt(je);if(We&&ct&&It){x.push(je);continue}(We?0:1)+(ct?0:1)+(It?0:1)>1||(We?ct?Ce+=1:Ne+=1:re+=1)}nt=x,Q.runnable_hidden={blocked:re,readiness:Ne,route:Ce}}else{nt=nt.filter(pt);let x=nt.length;nt=nt.filter(Ye);let re=nt.length;nt=nt.filter(Pt),Q.runnable_hidden={blocked:Oe-x,readiness:x-re,route:re-nt.length}}let Et=(x,re)=>{let Ne=ra(re.updated_at)-ra(x.updated_at);return Ne!==0?Ne:x.id.localeCompare(re.id)},gt=a==="repo_spec"?(x,re)=>{let Ne=x.queue_placeable===!0?0:1,Ce=re.queue_placeable===!0?0:1;if(Ne!==Ce)return Ne-Ce;let je=x.published===!0?0:1,We=re.published===!0?0:1;return je!==We?je-We:Et(x,re)}:Et;if(a==="as_given")Q.runnable=nt,Q.runnable_sections=[];else if(a==="updated_flat")Q.runnable=nt.slice().sort(Et),Q.runnable_sections=[];else{let x=new Map;for(let Ce of nt){let je=x.get(Ce.root_dir);je?je.push(Ce):x.set(Ce.root_dir,[Ce])}let re=[],Ne=[];for(let Ce of he){if(!Ce||typeof Ce.root_dir!="string")continue;let je=(x.get(Ce.root_dir)||[]).slice().sort(gt);x.delete(Ce.root_dir),je.length!==0&&(re.push({root_dir:Ce.root_dir,name:Ce.name||Ce.root_dir,items:je.map(We=>({...We,workspace_name:""}))}),Ne.push(...je))}for(let[Ce,je]of x){let We=je.slice().sort(gt);re.push({root_dir:Ce,name:We[0]?.workspace_name||Ce,items:We.map(ct=>({...ct,workspace_name:""}))}),Ne.push(...We)}Q.runnable=Ne,Q.runnable_sections=re}let Zt=ey(n?n.search:void 0);return Zt&&ty(Q,Zt),Q}var ia=["impl_review_model","impl_review_effort","impl_review_speed"],ny=Object.freeze({impl_review_model:"fable",impl_review_effort:"xhigh",impl_review_speed:"default"});function so(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function fr(e){return typeof e=="string"&&e.length>0?e:null}function Xl(e){let t=so(e)&&so(e.metadata)?e.metadata:{};return t.route!=="quick_fix"?{eligible:!1,reason:"route=quick_fix \uC774\uC288\uB9CC \uC6D0\uBCF8\uC774 \uB429\uB2C8\uB2E4"}:fr(t.quick_fix_review)===null?{eligible:!1,reason:"quick_fix_review \uC601\uC218\uC99D\uC774 \uC5C6\uC2B5\uB2C8\uB2E4"}:{eligible:!0,reason:""}}function zp(e,t,n=20){let r=String(t||"").trim().toLowerCase(),o=[],i=new Set;for(let s of Array.isArray(e)?e:[]){let l=fr(so(s)?s.id:null);if(l===null||i.has(l))continue;let a=fr(s.title)??"";if(r.length>0&&!l.toLowerCase().includes(r)&&!a.toLowerCase().includes(r))continue;i.add(l);let u=Xl(s);if(o.push({id:l,title:a,eligible:u.eligible,reason:u.reason}),o.length>=n)break}return o.sort((s,l)=>s.eligible===l.eligible?0:s.eligible?-1:1)}function Zl(e){let t=typeof e=="number"?e:Number.parseInt(String(e??""),10);return Number.isFinite(t)?Math.min(5,Math.max(1,Math.trunc(t))):1}function aa(e){for(let t of Array.isArray(e)?e:[]){let n=so(t)&&so(t.reviewer)?t.reviewer:null;if(n===null)continue;let r={},o=!0;for(let i of ia){let s=fr(n[i]);if(s===null){o=!1;break}r[i]=s}if(o)return r}return{...ny}}function Kp(e){return fr(e.source_id)===null||e.source_eligible!==!0||!Array.isArray(e.preset_ids)||e.preset_ids.length===0||Zl(e.repeats)!==e.repeats?!1:e.reviewer_mode==="fixed"?ia.every(t=>fr(e.reviewer?.[t])!==null):!0}var Ql=Object.freeze({bad_request:"\uC785\uB825\uC774 \uC11C\uBC84 \uC870\uAC74\uC744 \uB9CC\uC871\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4",bd_error:"\uC6D0\uBCF8 \uC774\uC288\uB97C \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",bench_base_unreadable:"base tip\uC744 \uC77D\uC9C0 \uBABB\uD574 \uC2E4\uD5D8\uC744 \uC2DC\uC791\uD558\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4",bench_tuple_unresolved:"\uD504\uB9AC\uC14B\uC744 \uC644\uC804\uD55C \uC2E4\uD589 tuple\uB85C \uD574\uC11D\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",worker_unavailable:"Worker \uB7F0\uD0C0\uC784\uC774 \uBD99\uC5B4 \uC788\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4",bench_run_create_failed:"\uD074\uB860 \uC0DD\uC131\uC5D0 \uC2E4\uD328\uD574 \uC2E4\uD5D8\uC744 \uB9CC\uB4E4\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4",bench_run_list_failed:"\uC2E4\uD5D8 \uBAA9\uB85D\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"});function Gp(e){if(typeof e=="string")return Ql[e]??e;if(!so(e))return"\uC2E4\uD5D8 \uC0DD\uC131\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4";let t=fr(e.code)??fr(e.error)??"",n=fr(e.message)??"",r=Ql[t]??(n.length>0?n:t),o=[r.length>0?r:"\uC2E4\uD5D8 \uC0DD\uC131\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4"];t.length>0&&n.length>0&&Ql[t]&&o.push(`(${n})`);let i=so(e.details)?e.details:{},s=Array.isArray(i.aborted)?i.aborted.filter(l=>typeof l=="string"&&l.length>0):[];return s.length>0&&o.push(`\u2014 \uB2EB\uD78C \uD074\uB860: ${s.join(", ")}`),o.join(" ")}function Jl(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function Mn(e){return typeof e=="number"&&Number.isFinite(e)?e:null}function Rr(e){return typeof e=="string"&&e.length>0?e:null}var ry=new Set(["failed","orphaned"]);function Vp(e){if(!Jl(e))return null;let t=Mn(e.cell_count),n=Mn(e.terminal_count);return t===null||n===null?null:{terminal:n,total:t,text:`${n}/${t}`}}function qo(e){let t=e.map(i=>Mn(i)).filter(i=>i!==null).sort((i,s)=>i-s),n=e.length;if(t.length===0)return{median:null,sample:0,total:n};let r=Math.floor(t.length/2);return{median:t.length%2===1?t[r]:(t[r-1]+t[r])/2,sample:t.length,total:n}}function oy(e){let t=e.filter(n=>n==="pass"||n==="fail");return t.length<2?null:{k:t.length,value:t.every(n=>n==="pass")?1:0}}function sy(e,t){if(t&&(t.verify==="pass"||t.verify==="fail"))return t.verify;let n=Jl(e.bench_verify)?e.bench_verify:null;return n===null?null:n.ok===!0?"pass":"fail"}function Yp(e,t){if(!Jl(e))return[];let n=new Map;for(let s of Array.isArray(t)?t:[]){let l=Rr(s?.attempt_id);l!==null&&n.set(l,s)}let r=Array.isArray(e.cells)?e.cells:[],o=Array.isArray(e.presets)?e.presets:[],i=[];for(let s of o){let l=Rr(s?.id);if(l===null)continue;let u=r.filter(_=>_?.preset_id===l).sort((_,y)=>(Mn(_?.k)??0)-(Mn(y?.k)??0)).map(_=>{let y=Rr(_.attempt_id),g=y===null?null:n.get(y)??null,C=sy(_,g);return{...g??{},bead_id:Rr(_.bead_id)??"",attempt_id:y,cell_k:Mn(_.k),status:Rr(g?.status)??Rr(_.status),failed:g?.failed===!0||ry.has(String(_.status??"")),verify:C,workspace_name:_.k===null?"":`#${_.k}`}}),d=u.filter(_=>_.verify==="pass"||_.verify==="fail"),f=d.filter(_=>_.verify==="pass"&&_.status==="done");i.push({key:`${Rr(e.run_id)??""}:${l}`,name:Rr(s?.name)??l,n:u.length,success_rate:d.length===0?null:f.length/d.length,success_sample:d.length,unknown_count:u.length-d.length,pass_caret:oy(u.map(_=>_.verify)),failed_count:u.filter(_=>_.failed===!0).length,retry_count:u.filter(_=>_.is_retry===!0).length,duration_ms:qo(u.map(_=>Mn(_.duration_ms))),tokens:qo(u.map(_=>Mn(_.usage?.tokens))),cost_usd:qo(u.map(_=>Mn(_.usage?.total_cost_usd))),blocking:qo(u.map(_=>Mn(_.review?.blocking))),minor:qo(u.map(_=>Mn(_.review?.minor))),round:qo(u.map(_=>Mn(_.review?.round))),rows:u})}return i}var un="\u2014";function nr(e){return typeof e=="number"&&Number.isFinite(e)?e:null}function la(e){let t=nr(e);if(t===null||t<0)return un;let n=Math.round(t/1e3);if(n<60)return`${n}\uCD08`;let r=Math.floor(n/60);return r<60?`${r}\uBD84`:`${Math.floor(r/60)}\uC2DC\uAC04 ${r%60}\uBD84`}function ca(e){let t=nr(e);return t===null||t<=0?un:t>=1e6?`\u03C4 ${(t/1e6).toFixed(1)}M`:t>=1e3?`\u03C4 ${(t/1e3).toFixed(1)}k`:`\u03C4 ${t}`}function Qp(e){return!e||nr(e.total_cost_usd)===null?un:wi({total_cost_usd:e.total_cost_usd,unpriced_leg_count:e.unpriced_leg_count})??un}function ec(e){let t=nr(e);return t===null?un:`$${t.toFixed(2)}`}function Xp(e){let t=nr(e?.sample)??0,n=nr(e?.total)??0;return t===0||t===n?"":`n=${t}/${n}`}function tc(e){let t=nr(e);return t===null?un:`${Math.round(t*100)}%`}function Zp(e){return e==="pass"?"\uD1B5\uACFC":e==="fail"?"\uC2E4\uD328":"\uBBF8\uC0C1"}function Jp(e){let t=[];return e.failed===!0&&t.push(typeof e.cause=="string"&&e.cause.length>0?`\uC2E4\uD328 \xB7 ${e.cause}`:"\uC2E4\uD328"),e.is_retry===!0&&t.push("\uC7AC\uC2DC\uB3C4"),t.length===0?un:t.join(" \xB7 ")}function ef(e){if(!e)return un;let t=nr(e.blocking),n=nr(e.minor),r=nr(e.round);if(t===null&&n===null&&r===null)return un;let o=t===null&&n===null?null:`b${t??0}/m${n??0}`,i=r===null?null:`r${r}`;return[o,i].filter(s=>s!==null).join(" \xB7 ")}var iy="30d";function tf(e,t={}){let n=Ht("views:compare"),r=t.transport,o=t.gotoIssue,i=t.execPresetStore,s=t.sourceCandidates,l={range:iy,root_dir:"",issue_type:"",route:"",include_bench:!1},a={rows:[],groups:[],workspaces:[]},u=new Set,d=!1,f=null,_=!1,y=0,g={runs:[],selected:null,rows:[]},C=new Set,k={open:!1,source_id:"",query:"",preset_ids:[],repeats:1,reviewer_mode:"fixed",reviewer:aa([]),error:null,submitting:!1};async function X(){if(!r)return;let M=y+=1;d=!0,f=null,le();try{let oe=await r("get-compare",{range:l.range,root_dirs:l.root_dir?[l.root_dir]:[],issue_types:l.issue_type?[l.issue_type]:[],routes:l.route?[l.route]:[],include_bench:l.include_bench});if(M!==y)return;let se=oe&&oe.payload?oe.payload:oe;a={rows:Array.isArray(se?.rows)?se.rows:[],groups:Array.isArray(se?.groups)?se.groups:[],workspaces:Array.isArray(se?.workspaces)?se.workspaces:a.workspaces},g.runs=Array.isArray(se?.runs)?se.runs:[],g.rows=Array.isArray(se?.bench_rows)?se.bench_rows:[],g.selected!==null&&!g.runs.some(he=>he.run_id===g.selected)&&(g.selected=null),k.open||(k.reviewer=aa(g.runs)),_=!0}catch(oe){if(M!==y)return;n("get-compare failed: %o",oe),f=oe instanceof Error?oe.message:String(oe)}finally{M===y&&(d=!1,le())}}function ae(M){g.selected=g.selected===M?null:M,le()}function H(){let M=P(k.source_id);return Kp({source_id:k.source_id,source_eligible:M===null?!1:Xl(M).eligible,preset_ids:k.preset_ids,repeats:k.repeats,reviewer_mode:k.reviewer_mode,reviewer:k.reviewer})}async function N(){if(!(!r||k.submitting||!H())){k.submitting=!0,k.error=null,le();try{let M=await r("bench-run-create",{source_id:k.source_id,preset_ids:[...k.preset_ids],repeats:k.repeats,reviewer_mode:k.reviewer_mode,...k.reviewer_mode==="fixed"?{reviewer:k.reviewer}:{}}),oe=M&&M.payload?M.payload:M,se=oe&&oe.run&&typeof oe.run.run_id=="string"?oe.run.run_id:null;k.open=!1,k.error=null,await X(),se!==null&&g.selected!==se&&ae(se)}catch(M){n("bench-run-create failed: %o",M),k.error=Gp(M)}finally{k.submitting=!1,le()}}}function P(M){if(!s||M.length===0)return null;for(let oe of s())if(oe&&oe.id===M)return oe;return null}function j(M,oe){l[M]=oe,X()}function B(M){u.has(M)?u.delete(M):u.add(M),le()}function W(M,oe,se,he){return c`
      <label class="cmp-filter">
        <span class="cmp-filter__label">${M}</span>
        <select
          class="cmp-filter__select"
          .value=${oe}
          @change=${xe=>he(xe.target.value)}
        >
          ${se.map(xe=>c`<option
                value=${xe.value}
                ?selected=${xe.value===oe}
              >
                ${xe.label}
              </option>`)}
        </select>
      </label>
    `}function T(){let M=[{value:"",label:"\uC804\uCCB4 \uC800\uC7A5\uC18C"},...a.workspaces.map(oe=>({value:oe.root_dir,label:oe.name}))];return c`
      <div class="cmp-filters">
        ${W("\uAE30\uAC04",l.range,ai.map(oe=>({value:oe.value,label:oe.label})),oe=>j("range",oe))}
        ${W("\uC800\uC7A5\uC18C",l.root_dir,M,oe=>j("root_dir",oe))}
        ${W("\uC720\uD615",l.issue_type,[{value:"",label:"\uC804\uCCB4 \uC720\uD615"},...vi.map(oe=>({value:oe,label:oe}))],oe=>j("issue_type",oe))}
        ${W("route",l.route,[{value:"",label:"\uC804\uCCB4 route"},...oo.filter(oe=>oe.value!=="unset").map(oe=>({value:oe.value,label:oe.label}))],oe=>j("route",oe))}
        <label class="cmp-filter cmp-filter--check">
          <input
            type="checkbox"
            .checked=${l.include_bench}
            @change=${oe=>{l.include_bench=oe.target.checked,X()}}
          />
          <span>bench 실험 포함</span>
        </label>
        <button
          type="button"
          class="op-btn cmp-refresh"
          ?disabled=${d}
          @click=${()=>{X()}}
        >
          새로고침
        </button>
      </div>
    `}function S(M){let oe=tc(M.success_rate),se=typeof M.unknown_count=="number"&&M.unknown_count>0?c`<span class="cmp-note">미상 ${M.unknown_count}</span>`:null,he=M.pass_caret?c`<span class="cmp-note"
          >pass^${M.pass_caret.k}
          ${tc(M.pass_caret.value)}</span
        >`:null,xe=typeof M.success_sample=="number"&&M.success_sample!==M.n?c`<span class="cmp-note"
            >n=${M.success_sample}/${M.n}</span
          >`:null;return c`${oe} ${xe} ${he} ${se}`}function I(M,oe){let se=Xp(M);return c`${oe(M?.median)}
    ${se?c`<span class="cmp-note">${se}</span>`:null}`}function O(M){let oe=$o(M.usage||null).join(`
`);return c`
      <tr
        class="cmp-row cmp-row--attempt"
        @click=${()=>o&&o(M.bead_id)}
      >
        <td class="cmp-cell cmp-cell--issue">
          <span class="cmp-issue-id">${M.bead_id}</span>
          <span class="cmp-issue-title">${M.title||""}</span>
          <span class="cmp-note">${M.workspace_name}</span>
        </td>
        <td class="cmp-cell">${la(M.duration_ms)}</td>
        <td class="cmp-cell">${Jp(M)}</td>
        <td class="cmp-cell">${Zp(M.verify)}</td>
        <td class="cmp-cell">${ef(M.review)}</td>
        <td class="cmp-cell">${ca(M.usage?.tokens)}</td>
        <td class="cmp-cell" title=${oe}>${Qp(M.usage)}</td>
        <td class="cmp-cell cmp-cell--time">
          ${M.finished_at?rn(M.finished_at):un}
        </td>
      </tr>
    `}function J(M){let oe=u.has(M.key),se=new Set(M.attempt_ids||[]),he=oe?a.rows.filter(xe=>se.has(xe.attempt_id)):[];return c`
      <tr
        class="cmp-row cmp-row--group ${oe?"is-open":""}"
        @click=${()=>B(M.key)}
      >
        <td class="cmp-cell cmp-cell--name">
          <span class="cmp-caret" aria-hidden="true">${oe?"\u25BE":"\u25B8"}</span>
          <span class="cmp-group-name">${M.name}</span>
          <span class="cmp-note">${M.n}건</span>
        </td>
        <td class="cmp-cell">
          ${I(M.duration_ms,la)}
        </td>
        <td class="cmp-cell">
          실패 ${M.failed_count} · 재시도 ${M.retry_count}
        </td>
        <td class="cmp-cell">${S(M)}</td>
        <td class="cmp-cell">
          ${I(M.blocking,xe=>typeof xe=="number"?`b${xe}`:un)}
          ${I(M.minor,xe=>typeof xe=="number"?`m${xe}`:un)}
          ${I(M.round,xe=>typeof xe=="number"?`r${xe}`:un)}
        </td>
        <td class="cmp-cell">${I(M.tokens,ca)}</td>
        <td class="cmp-cell">
          ${I(M.cost_usd,ec)}
        </td>
        <td class="cmp-cell cmp-cell--time"></td>
      </tr>
      ${he.map(xe=>O(xe))}
    `}function ce(M){let oe=g.selected===M.run_id,se=P(String(M.source_bead_id||"")),he=se&&typeof se.title=="string"&&se.title.length>0?se.title:String(M.source_bead_id||""),xe=Vp(M),Ze=Array.isArray(M.presets)?M.presets.length:0;return c`
      <button
        type="button"
        class="cmp-run ${oe?"is-selected":""}"
        data-run-id=${M.run_id}
        @click=${()=>ae(String(M.run_id))}
      >
        <span class="cmp-run__title">${he}</span>
        <span class="cmp-note">프리셋 ${Ze}</span>
        <span class="cmp-note">반복 ${M.repeats??un}</span>
        <span class="cmp-note"
          >${typeof M.created_at=="number"?rn(M.created_at):un}</span
        >
        <span class="cmp-run__progress"
          >${xe===null?un:xe.text}</span
        >
      </button>
    `}function Se(M){let oe=C.has(M.key);return c`
      <tr
        class="cmp-row cmp-row--group ${oe?"is-open":""}"
        @click=${()=>{C.has(M.key)?C.delete(M.key):C.add(M.key),le()}}
      >
        <td class="cmp-cell cmp-cell--name">
          <span class="cmp-caret" aria-hidden="true">${oe?"\u25BE":"\u25B8"}</span>
          <span class="cmp-group-name">${M.name}</span>
          <span class="cmp-note">${M.n}건</span>
        </td>
        <td class="cmp-cell">
          ${I(M.duration_ms,la)}
        </td>
        <td class="cmp-cell">
          실패 ${M.failed_count} · 재시도 ${M.retry_count}
        </td>
        <td class="cmp-cell">${S(M)}</td>
        <td class="cmp-cell">
          ${I(M.blocking,se=>typeof se=="number"?`b${se}`:un)}
          ${I(M.minor,se=>typeof se=="number"?`m${se}`:un)}
          ${I(M.round,se=>typeof se=="number"?`r${se}`:un)}
        </td>
        <td class="cmp-cell">${I(M.tokens,ca)}</td>
        <td class="cmp-cell">
          ${I(M.cost_usd,ec)}
        </td>
        <td class="cmp-cell cmp-cell--time"></td>
      </tr>
      ${oe?(M.rows||[]).map(se=>O(se)):null}
    `}function K(M){let oe=Yp(M,g.rows);return c`
      <div class="cmp-run-detail">
        <div class="cmp-run-detail__head">
          <span class="cmp-run-detail__flag">구현 위임 강제</span>
          <span class="cmp-note"
            >리뷰어
            ${M.reviewer_mode==="preset"?"\uD504\uB9AC\uC14B \uAC12":"\uACE0\uC815"}</span
          >
          <span class="cmp-note"
            >base ${String(M.base_sha||"").slice(0,12)}</span
          >
        </div>
        ${oe.length===0?c`<div class="cmp-empty">셀이 없습니다</div>`:c`<table class="cmp-table cmp-table--bench">
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
                ${oe.map(se=>Se(se))}
              </tbody>
            </table>`}
      </div>
    `}function te(){let M=i?i.get():null,oe=Array.isArray(M?.presets)?M.presets:[],se=zp(s?s():[],k.query);return c`
      <form
        class="cmp-form"
        @submit=${he=>{he.preventDefault(),N()}}
      >
        <div class="cmp-form__note">구현 위임 강제</div>
        <label class="cmp-form__field">
          <span class="cmp-form__label">원본 이슈</span>
          <input
            type="text"
            class="cmp-form__input"
            placeholder="제목 또는 ID"
            .value=${k.query}
            @input=${he=>{k.query=String(he.target.value||""),le()}}
          />
        </label>
        <div class="cmp-form__candidates">
          ${se.length===0?c`<div class="cmp-empty">후보 없음</div>`:se.map(he=>c`
                  <button
                    type="button"
                    class="cmp-candidate ${k.source_id===he.id?"is-selected":""}"
                    data-source-id=${he.id}
                    ?disabled=${!he.eligible}
                    title=${he.reason}
                    @click=${()=>{k.source_id=he.id,le()}}
                  >
                    <span class="cmp-candidate__id">${he.id}</span>
                    <span class="cmp-candidate__title">${he.title}</span>
                    ${he.eligible?null:c`<span class="cmp-candidate__reason"
                          >${he.reason}</span
                        >`}
                  </button>
                `)}
        </div>
        <div class="cmp-form__field">
          <span class="cmp-form__label">프리셋</span>
          <div class="cmp-form__presets">
            ${oe.length===0?c`<div class="cmp-empty">프리셋 없음</div>`:oe.map(he=>c`
                    <label class="cmp-form__preset">
                      <input
                        type="checkbox"
                        data-preset-id=${he.id}
                        .checked=${k.preset_ids.includes(he.id)}
                        @change=${xe=>{let Ze=xe.target.checked;k.preset_ids=Ze?[...k.preset_ids,he.id]:k.preset_ids.filter(G=>G!==he.id),le()}}
                      />
                      <span>${he.name}</span>
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
            @change=${he=>{let xe=he.target;k.repeats=Zl(xe.value),xe.value=String(k.repeats),le()}}
          />
        </label>
        <div class="cmp-form__field">
          <span class="cmp-form__label">리뷰어</span>
          <div class="cmp-form__reviewer-mode">
            ${[{value:"fixed",label:"\uACE0\uC815"},{value:"preset",label:"\uD504\uB9AC\uC14B \uAC12"}].map(he=>c`
                <label class="cmp-form__radio">
                  <input
                    type="radio"
                    name="cmp-reviewer-mode"
                    value=${he.value}
                    .checked=${k.reviewer_mode===he.value}
                    @change=${()=>{k.reviewer_mode=he.value,le()}}
                  />
                  <span>${he.label}</span>
                </label>
              `)}
          </div>
        </div>
        ${k.reviewer_mode==="fixed"?c`<div class="cmp-form__reviewer">
              ${ia.map(he=>c`
                  <label class="cmp-form__field">
                    <span class="cmp-form__label">${he}</span>
                    <input
                      type="text"
                      class="cmp-form__input"
                      data-reviewer-key=${he}
                      .value=${k.reviewer[he]||""}
                      @input=${xe=>{k.reviewer={...k.reviewer,[he]:String(xe.target.value||"")}}}
                    />
                  </label>
                `)}
            </div>`:null}
        ${k.error!==null?c`<div class="cmp-error" role="alert">${k.error}</div>`:null}
        <div class="cmp-form__actions">
          <button
            type="submit"
            class="op-btn"
            ?disabled=${k.submitting||!H()}
          >
            실험 시작
          </button>
          <button
            type="button"
            class="op-btn"
            @click=${()=>{k.open=!1,k.error=null,le()}}
          >
            취소
          </button>
        </div>
      </form>
    `}function fe(){let M=g.selected===null?null:g.runs.find(oe=>oe.run_id===g.selected)??null;return c`
      <section class="cmp-bench">
        <div class="cmp-bench__head">
          <h3 class="cmp-bench__title">실험</h3>
          <button
            type="button"
            class="op-btn cmp-bench__new"
            @click=${()=>{k.open=!k.open,k.open&&(k.error=null,k.reviewer=aa(g.runs)),le()}}
          >
            새 실험
          </button>
        </div>
        ${k.open?te():null}
        ${g.runs.length===0?c`<div class="cmp-empty">
              ${d?"\uC77D\uB294 \uC911\u2026":"\uC2E4\uD5D8 \uC5C6\uC74C"}
            </div>`:c`<div class="cmp-runs">
              ${g.runs.map(oe=>ce(oe))}
            </div>`}
        ${M===null?null:K(M)}
      </section>
    `}function Re(){return f!==null?c`
        <div class="cmp-error" role="alert">
          <span>비교 데이터를 읽지 못했습니다 — ${f}</span>
          <button
            type="button"
            class="op-btn"
            @click=${()=>{X()}}
          >
            새로고침
          </button>
        </div>
      `:_?a.groups.length===0?c`<div class="cmp-empty">
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
          ${a.groups.map(M=>J(M))}
        </tbody>
      </table>
    `:c`<div class="cmp-empty">${d?"\uC77D\uB294 \uC911\u2026":""}</div>`}function V(){return c`
      <div class="cmp">
        <header class="cmp-head">
          <h2 class="cmp-title">프리셋 실사용 비교</h2>
          ${T()}
        </header>
        ${fe()} ${Re()}
      </div>
    `}function le(){lt(V(),e)}let ee=null;return i&&i.subscribe&&(ee=i.subscribe(()=>{k.open&&le()})),le(),{load(){d||X()},pause(){y+=1,d=!1},refresh(){return X()},destroy(){ee&&(ee(),ee=null),lt(c``,e)}}}function ay(e,t=document){let n=t.createElement("dialog");n.className="op-dialog continuation-dialog";let r=t.createElement("button"),o=t.createElement("button"),i=t.createElement("button"),s=t.createElement("h2"),l=t.createElement("p"),a=t.createElement("div");return a.className="op-dialog__actions",s.textContent="\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4",l.textContent=`${Ln(e.prior||{})||"\uC774\uC804 \uC124\uC815"} \u2192 ${Ln(e.current||{})||"\uD604\uC7AC \uC124\uC815"}`,r.type="button",r.className="op-btn",r.textContent="\uAE30\uC874 session \uC774\uC5B4\uD558\uAE30",r.disabled=e.prior_available===!1,o.type="button",o.className="op-btn",o.textContent="\uD604\uC7AC preset\uC73C\uB85C \uC0C8 session",i.type="button",i.className="op-btn",i.textContent="\uCDE8\uC18C",a.append(r,o,i),n.append(s,l,a),t.body.append(n),new Promise(u=>{let d=f=>{typeof n.close=="function"&&n.close(),n.remove(),u(f)};r.addEventListener("click",()=>d("prior_session")),o.addEventListener("click",()=>d("fresh_current")),i.addEventListener("click",()=>d(null)),n.addEventListener("cancel",f=>{f.preventDefault(),d(null)}),typeof n.showModal=="function"?n.showModal():n.setAttribute("open","")})}async function Or(e,t,n={}){let r=e;for(n.onResult?.(r);r?.continuation_mismatch;){let o=r.continuation_mismatch,i=await ay(o);if(i===null)return r;r=await t(i,o.decision_token),n.onResult?.(r),r?.conflict&&n.refresh&&(r=await n.refresh(r),n.onResult?.(r))}return r}function nf(e,t=document){let n=e?.kind==="settlement",r=t.createElement("dialog");r.className="op-dialog resume-instructions-dialog";let o=t.createElement("h2"),i=t.createElement("textarea"),s=t.createElement("div"),l=t.createElement("button"),a=t.createElement("button"),u=[e?.bead_id,e?.tuple].filter(d=>typeof d=="string"&&d!=="").join(" \xB7 ");if(o.textContent=n?"\uCC29\uC9C0 \uC815\uC0B0 \uC7AC\uAC1C":"\uC138\uC158 \uC774\uC5B4\uD558\uAE30",i.placeholder="\uCD94\uAC00 \uC9C0\uCE68 (\uC120\uD0DD) \u2014 \uBE44\uC6CC\uB450\uBA74 \uAE30\uBCF8 \uC808\uCC28\uB85C \uC7AC\uAC1C",i.maxLength=4e3,s.className="op-dialog__actions resume-instructions-dialog__actions",l.type="button",l.className="op-btn op-btn--primary",l.textContent=n?"\uC815\uC0B0 \uC7AC\uAC1C":"\uC774\uC5B4\uD558\uAE30",a.type="button",a.className="op-btn",a.textContent="\uCDE8\uC18C",s.append(l,a),r.append(o),u!==""){let d=t.createElement("p");d.className="resume-instructions-dialog__target",d.textContent=u,r.append(d)}return r.append(i,s),t.body.append(r),new Promise(d=>{let f=!1,_=g=>{f||(f=!0,typeof r.close=="function"&&r.close(),r.remove(),d(g))},y=()=>_(i.value.trim());l.addEventListener("click",y),a.addEventListener("click",()=>_(null)),i.addEventListener("keydown",g=>{g.key==="Enter"&&(g.ctrlKey||g.metaKey)&&(g.preventDefault(),y())}),r.addEventListener("cancel",g=>{g.preventDefault(),_(null)}),typeof r.showModal=="function"?r.showModal():r.setAttribute("open",""),i.focus()})}async function jo(e){let{context:t,transport:n,adopt:r}=e,o=await nf(t);if(o===null)return null;let i=o===""?{}:{instructions:o},s=await n({...i});if(r?.(s),s&&s.conflict&&(s=await n({...i}),r?.(s)),s=await Or(s,(l,a)=>n({...i,continuation:l,decision_token:a}),{onResult:r,refresh:()=>n({...i})}),s&&s.resumed===!1&&!s.conflict&&s.reason){let l=t?.kind==="settlement"?"\uC815\uC0B0 \uC7AC\uAC1C":"\uC774\uC5B4\uD558\uAE30";ye(`${l} \uAC70\uBD80: ${s.reason}`,"error",2400)}return s}function nc(e){return`session:${e.provider}:${e.session_id}`}function Es(e){return`${e.provider} \xB7 ${e.session_id.slice(0,8)}`}function ly(e,t){return e.current&&t==="in_progress"&&e.locality==="local"?"running":"done"}function Fo(e,t,n,r){return{attempt_id:nc(e),session_ref:{bead_id:t,provider:e.provider,session_id:e.session_id},...typeof r=="string"&&r.length>0?{root_dir:r}:{},hide_prompt:!0,meta:{runner:e.provider,label:Es(e),session_id:e.session_id,...typeof e.resume_command=="string"&&e.resume_command.length>0?{resume_command:e.resume_command}:{},status:ly(e,n)}}}function rf(e,t){let n=new Map(e.map((a,u)=>[a,u])),r=new Map(e.map(a=>[a,new Set]));for(let a of t)a.blocker!==a.blockee&&n.has(a.blocker)&&n.has(a.blockee)&&r.get(a.blockee).add(a.blocker);let o=new Set,i=[];for(;i.length<e.length;){let a=e.find(u=>{if(o.has(u))return!1;for(let d of r.get(u))if(!o.has(d))return!1;return!0});if(a===void 0)return{order:[...e],corrections:[],cycle:!0};o.add(a),i.push(a)}let s=[],l=new Map(i.map((a,u)=>[a,u]));for(let a of i){let u=null;for(let d of r.get(a)){let f=Number(n.get(a))<Number(n.get(d)),_=Number(l.get(a))>Number(l.get(d));f&&_&&(u===null||Number(l.get(d))>Number(l.get(u)))&&(u=d)}u!==null&&s.push({bead_id:a,after:u})}return{order:i,corrections:s,cycle:!1}}var cy="\uB2E4\uB978 \uB808\uD3EC \uC774\uC288\uB294 \uC774 \uC9C1\uB82C \uB808\uC778\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",ua="\uC758\uC874 \uC790\uB8CC \uBBF8\uD655\uC815 \u2014 \uAD50\uC815 \uBCF4\uB958",uy="Worker \uD0ED \uC9C1\uB82C \uB808\uC778\uC5D0\uC11C \uBA3C\uC800 \uBE7C \uC8FC\uC138\uC694",dy="\uC774\uBBF8 \uC9C4\uD589 \uC911\uC778 \uC774\uC288 \uC55E\uC5D0\uB294 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",Bo="\uC5F0\uACB0 \uB808\uC778\uC774 \uC5C6\uC2B5\uB2C8\uB2E4";function Ts(e,t){return`${e}\0${t}`}function py(e,t){let n=new Set(e),r=new Map;for(let o of e){let i=t.placed_members.has(o)?t.snapshot_blocked_by:t.runnable_blocked_by,s=i instanceof Map?i.get(o):void 0;if(!Array.isArray(s))return null;r.set(o,s.filter(l=>l!==o&&n.has(l)))}return r}function fy(e,t){if(e.status!=="confirmed")return 0;let n=-1;return e.entries.forEach((r,o)=>{t.fixed_members.has(r.bead_id)&&(n=o)}),n+1}function Os(e,t){let n=e.entries,r=n.map(f=>f.bead_id),o=py(r,t);if(o===null)return{entries:n,corrections:[],cycle:!1,held:!0,mismatched:[]};let i=[];for(let[f,_]of o)for(let y of _)i.push({blocker:y,blockee:f});let s=fy(e,t),l=new Map(r.map((f,_)=>[f,_])),a=r.slice(0,s).filter(f=>o.get(f).some(_=>Number(l.get(_))>Number(l.get(f)))),u=rf(r.slice(s),i);if(u.cycle)return{entries:n,corrections:[],cycle:!0,held:!1,mismatched:a};let d=new Map(n.map(f=>[f.bead_id,f]));return{entries:[...n.slice(0,s),...u.order.map(f=>d.get(f))],corrections:u.corrections,cycle:!1,held:!1,mismatched:a}}function sf(e,t){let n=t.cross_lanes.get(e);return n===void 0?null:Os(n,t)}function _y(e,t){if(!(t.corrections.length===0&&!t.cycle&&!t.held&&t.mismatched.length===0))return{lane_id:e,corrected:t.corrections.length,cycle:t.cycle,held:t.held,mismatched:t.mismatched}}function my(e){return`${e}\uC758 \uB808\uD3EC\uB97C \uC54C \uC218 \uC5C6\uC5B4 \uC758\uC874\uC744 \uBC14\uAFC0 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4`}function gy(e){let t=new Map;for(let[n,r]of e)t.set(n,r.slice());return t}function rc(e,t,n){let r=new Set([t]),o=[t];for(;o.length>0;){let i=o.pop();for(let s of e.get(i)||[]){if(s===n)return!0;r.has(s)||(r.add(s),o.push(s))}}return!1}function hy(e,t){let n=new Set;for(let[s,l]of t)for(let a of l)n.add(Ts(s,a));let r=new Map,o=new Map;for(let s of e){let l=Ts(s.a,s.b);r.set(l,s),o.set(l,s.type==="dep-add")}let i=[];for(let s of e){let l=Ts(s.a,s.b);r.get(l)===s&&o.get(l)!==n.has(l)&&i.push(s)}return i}function by(e,t,n){let r=e.parallel_rows,o=Math.max(0,Math.min(r.length,n)),i=r[o];if(i&&i.root_dir===t)return i.queue_index;for(let s=o-1;s>=0;s--)if(r[s].root_dir===t)return r[s].queue_index+1;for(let s=o;s<r.length;s++)if(r[s].root_dir===t)return r[s].queue_index;return e.parallel_raw_length.get(t)??0}function yy(e,t){return e.parallel_rows.some(n=>n.root_dir===t)}function of(e,t,n,r){return{type:"worker-queue-place",payload:{bead_id:e,...r?{lane:r}:{},index:n},root_dir:t}}function oc(e,t){let n=0;for(let r of e.cross_lanes.keys())if(n+=1,r===t)return n;return n+1}function Is(e){let t=gy(e.blocked_by_map),n=[],r=new Set,o={refusal:null},i=u=>{let d=e.owner_of.get(u);return typeof d!="string"||d.length===0?(o.refusal=my(u),null):d};return{graph:t,dep_ops:n,state:o,ownerOf:i,addDep:(u,d,f)=>{if(o.refusal!==null||u===d)return;let _=t.get(u)||[];if(_.includes(d))return;let y=i(u);if(y!==null){if(rc(t,d,u)){o.refusal=`\uC758\uC874 \uC0AC\uC774\uD074\uC774 \uC0DD\uAE41\uB2C8\uB2E4 \u2014 ${u}\uAC00 \uC774\uBBF8 ${d}\uB97C \uB9C9\uACE0 \uC788\uC2B5\uB2C8\uB2E4`;return}t.set(u,[..._,d]),f!==void 0&&r.add(Ts(u,d)),n.push({type:"dep-add",a:u,b:d,root_dir:y,...f===void 0?{}:{lane_id:f}})}},removeDep:(u,d)=>{if(o.refusal!==null||u===d)return;let f=t.get(u)||[];if(!f.includes(d))return;let _=i(u);_!==null&&(t.set(u,f.filter(y=>y!==d)),n.push({type:"dep-remove",a:u,b:d,root_dir:_}))},laneCreated:(u,d)=>r.has(Ts(u,d))}}function Ls(e,t,n,r,o={}){if(e.state.refusal!==null)return{refused:e.state.refusal};let i=hy(e.dep_ops,t.blocked_by_map),s=i.filter(d=>d.type==="dep-remove"),l=i.filter(d=>d.type==="dep-add"),a=o.disarm_ops??[],u=o.lane_id===void 0||o.correction===void 0?void 0:_y(o.lane_id,o.correction);return{lane_ops:n,ops:[...s,...a,...l,...r],lane_op_index:s.length+a.length,...u===void 0?{}:{correction:u}}}function af(e,t,n){for(let r=1;r<t.length;r+=1)e.addDep(t[r].bead_id,t[r-1].bead_id,n)}function Cs(e,t){return t>0&&e.entries[t]?.dep_created_by_lane===!0}function lf(e,t,n,r){if(t.status!=="confirmed")return[];let o=[],i=new Map;for(let s of r){let l=e.owner_of.get(s.bead_id)||s.root_dir;typeof l!="string"||l.length===0||i.set(l,[...i.get(l)||[],s.bead_id])}for(let[s,l]of i)o.push({type:"worker-queue-disarm",payload:{bead_ids:l,lane_id:n},root_dir:s});return o}function Rs(e){return e.map(t=>({bead_id:t.bead_id,root_dir:t.root_dir}))}function da(e,t){return e.length===t.length&&e.every((n,r)=>n.bead_id===t[r].bead_id&&n.root_dir===t[r].root_dir)}function pa(e,t,n){let r=Is(n),o=[],i=[],s=[],l,a=n.owner_lane_of.get(e.bead_id),u=e.kind==="chain"?e.lane_id??a:void 0,d=u===void 0?void 0:n.cross_lanes.get(u);if(t.kind==="repo-serial"&&e.root_dir!==t.root_dir)return{refused:cy};if(t.kind==="chain"){if(e.kind==="repo-serial")return{refused:uy};if(e.kind!=="chain"&&typeof a=="string"&&a!==t.lane_id&&n.cross_lanes.has(a))return{refused:`\uC774\uBBF8 \uC5F0\uACB0 ${oc(n,a)}\uC5D0 \uC788\uC2B5\uB2C8\uB2E4`};if(!n.cross_lanes.has(t.lane_id))return{refused:Bo}}if(e.kind==="chain"&&d===void 0)return{refused:Bo};let f=()=>{if(d===void 0||d.status!=="confirmed")return;let g=d.entries.findIndex(H=>H.bead_id===e.bead_id);if(g<0)return;let C=g>0?d.entries[g-1]:null,k=g+1<d.entries.length?d.entries[g+1]:null,X=Cs(d,g),ae=k!==null&&Cs(d,g+1);X&&C!==null&&r.removeDep(e.bead_id,C.bead_id),ae&&k!==null&&r.removeDep(k.bead_id,e.bead_id),(X||ae)&&C!==null&&k!==null&&r.addDep(k.bead_id,C.bead_id,u)},_=(g,C)=>{let k=n.cross_lanes.get(g),X=k.entries.findIndex(S=>S.bead_id===e.bead_id),ae=k.entries.filter(S=>S.bead_id!==e.bead_id),H=Math.max(0,Math.min(ae.length,X>=0&&C>X?C-1:C)),N=-1;if(ae.forEach((S,I)=>{n.fixed_members.has(S.bead_id)&&(N=I)}),H<=N){r.state.refusal=dy;return}let P=X>=0?k.entries[X]:d?.entries.find(S=>S.bead_id===e.bead_id)??{bead_id:e.bead_id,root_dir:e.root_dir};l=Os({status:k.status,entries:[...ae.slice(0,H),P,...ae.slice(H)]},n);let j=l.entries;if(da(j,k.entries)||o.push({type:"monitor-lane-update",payload:{lane_id:g,entries:Rs(j)}}),k.status!=="confirmed")return;let B=j.findIndex(S=>S.bead_id===e.bead_id),W=B>0?j[B-1].bead_id:null,T=B+1<j.length?j[B+1].bead_id:null;if(W===null){T!==null&&r.addDep(T,e.bead_id,g);return}if(r.addDep(e.bead_id,W,g),T!==null&&(r.graph.get(T)||[]).includes(W)){let S=k.entries.findIndex(I=>I.bead_id===T);(r.laneCreated(T,W)||S>0&&k.entries[S-1].bead_id===W&&Cs(k,S))&&r.removeDep(T,W),r.addDep(T,e.bead_id,g)}},y=typeof e.queue_index=="number"?e.queue_index:n.queue_index_of.get(e.bead_id);if(e.kind==="chain"&&(f(),d!==void 0&&(t.kind!=="chain"||t.lane_id!==u))){let g=d.entries.filter(k=>k.bead_id!==e.bead_id),C=d.status==="confirmed"&&g.length<2?d.entries:d.entries.filter(k=>k.bead_id===e.bead_id);s.push(...lf(n,d,u,C)),o.push({type:"monitor-lane-update",payload:{lane_id:u,entries:Rs(g)}})}if(t.kind==="chain"&&_(t.lane_id,t.marker_index),r.state.refusal!==null)return{refused:r.state.refusal};if(t.kind==="candidate")e.kind!=="candidate"&&i.push({type:"worker-queue-remove",payload:{bead_id:e.bead_id},root_dir:e.root_dir});else if(t.kind==="parallel"){let g=by(n,e.root_dir,t.marker_index);if(e.kind==="candidate"||e.kind==="repo-serial")i.push(of(e.bead_id,e.root_dir,g));else if(e.kind==="parallel"){let C=n.parallel_rows,k=C[Math.max(0,Math.min(C.length,t.marker_index))];if(!(!!k&&k.bead_id===e.bead_id)&&yy(n,e.root_dir)&&y!==void 0){let ae=y>g?g:g-1;ae>=0&&ae!==y&&i.push({type:"worker-queue-reorder",payload:{bead_id:e.bead_id,to_index:ae},root_dir:e.root_dir})}}}else if(t.kind!=="chain")if(e.kind==="repo-serial"&&e.lane_id===t.lane_id){if(y!==void 0&&t.index!==y){let g=y>t.index?t.index:t.index-1;g>=0&&g!==y&&i.push({type:"worker-queue-reorder",payload:{bead_id:e.bead_id,lane:t.lane_id,to_index:g},root_dir:e.root_dir})}}else i.push(of(e.bead_id,e.root_dir,t.index,t.lane_id));return Ls(r,n,o,i,{disarm_ops:s,...t.kind==="chain"?{lane_id:t.lane_id,correction:l}:{}})}function cf(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:Bo};if(n.entries.length<2)return{refused:"\uD655\uC815\uD558\uB824\uBA74 \uBA64\uBC84\uAC00 2\uAC1C \uC774\uC0C1\uC774\uC5B4\uC57C \uD569\uB2C8\uB2E4"};let r=Os(n,t);if(r.held)return{refused:ua};let o=r.entries,i=Is(t),s=[];af(i,o,e);let l=da(o,n.entries)?[]:[{type:"monitor-lane-update",payload:{lane_id:e,entries:Rs(o)}}];return l.push({type:"monitor-lane-confirm",payload:{lane_id:e}}),Ls(i,t,l,s,{lane_id:e,correction:r})}function uf(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:Bo};let r=Os(n,t),o=r.entries,i=Is(t),s=[];af(i,o,e);let l=da(o,n.entries)?[]:[{type:"monitor-lane-update",payload:{lane_id:e,entries:Rs(o)}}];return Ls(i,t,l,s,{lane_id:e,correction:r})}function df(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:Bo};let r=Os(n,t),o=r.entries;return Ls(Is(t),t,da(o,n.entries)?[]:[{type:"monitor-lane-update",payload:{lane_id:e,entries:Rs(o)}}],[],{lane_id:e,correction:r})}function pf(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:Bo};let r=Is(t);if(n.status==="confirmed")for(let o=1;o<n.entries.length;o+=1)Cs(n,o)&&r.removeDep(n.entries[o].bead_id,n.entries[o-1].bead_id);return Ls(r,t,[{type:"monitor-lane-remove",payload:{lane_id:e}}],[],{disarm_ops:lf(t,n,e,n.entries)})}function ff(e,t){let n=t.cross_lanes.get(e);if(n===void 0||n.status!=="confirmed")return null;let r=[],o=[];for(let s=1;s<n.entries.length;s+=1){let l=`  ${n.entries[s].bead_id} \u2190 ${n.entries[s-1].bead_id}`;Cs(n,s)?r.push(l):o.push(`${l} (\uB808\uC778\uC774 \uB9CC\uB4E4\uC9C0 \uC54A\uC74C)`)}let i=`\uC5F0\uACB0 ${oc(t,e)}\uC744 \uC9C0\uC6C1\uB2C8\uB2E4.`;return r.length===0?`${i}
\uC758\uC874\uC740 \uADF8\uB300\uB85C \uB461\uB2C8\uB2E4`:[i,"\uD568\uAED8 \uC81C\uAC70\uD560 \uC758\uC874:",...r,...o.length===0?[]:["\uADF8\uB300\uB85C \uB450\uB294 \uC758\uC874:",...o]].join(`
`)}function _f(e){let t=new Map;for(let n of e)n.type!=="dep-add"||typeof n.lane_id!="string"||t.set(n.lane_id,[...t.get(n.lane_id)||[],{bead_id:n.a,after:n.b}]);return[...t].map(([n,r])=>({lane_id:n,pairs:r}))}function mf(e,t){let n=new Map(e.map((r,o)=>[r.bead_id,o]));return t.filter(r=>{let o=n.get(r.bead_id);return o!==void 0&&o>0&&e[o-1].bead_id===r.after})}function sc(e,t){if(e!==null){let n=t.owner_lane_of.get(e.bead_id);if(typeof n=="string"&&t.cross_lanes.has(n))return{refused:`\uC774\uBBF8 \uC5F0\uACB0 ${oc(t,n)}\uC5D0 \uC788\uC2B5\uB2C8\uB2E4`}}return{lane_ops:[{type:"monitor-lane-create",payload:{entries:e===null?[]:[e]}}],ops:[],lane_op_index:0}}var vy="\uC0AC\uC774\uD074";function ky(e){let t=new Map,n=r=>Array.isArray(r)?r.filter(o=>typeof o=="string"&&o.length>0):[];for(let r of Array.isArray(e)?e:[]){if(!r||typeof r!="object")continue;let o=r.bead_blocked_by&&typeof r.bead_blocked_by=="object"?r.bead_blocked_by:{};for(let[i,s]of Object.entries(o))Array.isArray(s)&&t.set(i,n(s));for(let i of[...Array.isArray(r.runnable)?r.runnable:[],...Array.isArray(r.session_active)?r.session_active:[]])i&&typeof i.bead_id=="string"&&Array.isArray(i.blocked_by)&&i.blocked_by.length>0&&t.set(i.bead_id,n(i.blocked_by))}return t}function ic(e,t,n){let r=Cr(e,t),o=[],i=new Set,s=(a,u)=>{for(let d of a)i.has(d.id)||(i.add(d.id),o.push({bead_id:d.id,root_dir:d.root_dir,workspace_name:d.workspace_name,title:d.title,lane:u}))};s(r.running,"running"),s(r.pr_wait,"pr_wait"),s(r.queue,"queue"),s(r.runnable_all,"runnable");let l=n&&typeof n.root_dir=="string"&&n.root_dir.length?n.root_dir:null;return{issues:l===null?o:o.filter(a=>a.root_dir===l),blocked_by_map:ky(e)}}function gf(e,t){let n=new Map;for(let s of t.issues)!s||typeof s.bead_id!="string"||s.bead_id.length===0||n.has(s.bead_id)||n.set(s.bead_id,s);let r=n.get(e)?.root_dir,o=t.blocked_by_map.get(e)||[],i=[];for(let s of n.values()){if(s.bead_id===e||s.lane==="done"||o.includes(s.bead_id))continue;let l=rc(t.blocked_by_map,s.bead_id,e);i.push({...s,disabled:l,...l?{reason:vy}:{}})}return i.sort((s,l)=>{let a=r!==void 0&&s.root_dir===r,u=r!==void 0&&l.root_dir===r;return a!==u?a?-1:1:s.bead_id.localeCompare(l.bead_id)}),i}function hf(e,t){let n=t.trim().toLowerCase();return n.length===0?e.slice():e.filter(r=>r.bead_id.toLowerCase().includes(n)||r.title.toLowerCase().includes(n))}var wy=/^\S+-\S+$/;function bf(e){return wy.test(e.trim())}var{entries:Ef,setPrototypeOf:yf,isFrozen:$y,getPrototypeOf:xy,getOwnPropertyDescriptor:Ay}=Object,{freeze:An,seal:Nn,create:fc}=Object,{apply:_c,construct:mc}=typeof Reflect<"u"&&Reflect;An||(An=function(t){return t});Nn||(Nn=function(t){return t});_c||(_c=function(t,n){for(var r=arguments.length,o=new Array(r>2?r-2:0),i=2;i<r;i++)o[i-2]=arguments[i];return t.apply(n,o)});mc||(mc=function(t){for(var n=arguments.length,r=new Array(n>1?n-1:0),o=1;o<n;o++)r[o-1]=arguments[o];return new t(...r)});var fa=Sn(Array.prototype.forEach),Sy=Sn(Array.prototype.lastIndexOf),vf=Sn(Array.prototype.pop),Ds=Sn(Array.prototype.push),Ey=Sn(Array.prototype.splice),ma=Sn(String.prototype.toLowerCase),ac=Sn(String.prototype.toString),lc=Sn(String.prototype.match),Ps=Sn(String.prototype.replace),Ty=Sn(String.prototype.indexOf),Cy=Sn(String.prototype.trim),Hn=Sn(Object.prototype.hasOwnProperty),xn=Sn(RegExp.prototype.test),Ms=Ry(TypeError);function Sn(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var n=arguments.length,r=new Array(n>1?n-1:0),o=1;o<n;o++)r[o-1]=arguments[o];return _c(e,t,r)}}function Ry(e){return function(){for(var t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];return mc(e,n)}}function Lt(e,t){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:ma;yf&&yf(e,null);let r=t.length;for(;r--;){let o=t[r];if(typeof o=="string"){let i=n(o);i!==o&&($y(t)||(t[r]=i),o=i)}e[o]=!0}return e}function Oy(e){for(let t=0;t<e.length;t++)Hn(e,t)||(e[t]=null);return e}function _r(e){let t=fc(null);for(let[n,r]of Ef(e))Hn(e,n)&&(Array.isArray(r)?t[n]=Oy(r):r&&typeof r=="object"&&r.constructor===Object?t[n]=_r(r):t[n]=r);return t}function Ns(e,t){for(;e!==null;){let r=Ay(e,t);if(r){if(r.get)return Sn(r.get);if(typeof r.value=="function")return Sn(r.value)}e=xy(e)}function n(){return null}return n}var kf=An(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),cc=An(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),uc=An(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),Iy=An(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),dc=An(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),Ly=An(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),wf=An(["#text"]),$f=An(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),pc=An(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),xf=An(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),_a=An(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),Dy=Nn(/\{\{[\w\W]*|[\w\W]*\}\}/gm),Py=Nn(/<%[\w\W]*|[\w\W]*%>/gm),My=Nn(/\$\{[\w\W]*/gm),Ny=Nn(/^data-[\-\w.\u00B7-\uFFFF]+$/),qy=Nn(/^aria-[\-\w]+$/),Tf=Nn(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),jy=Nn(/^(?:\w+script|data):/i),Fy=Nn(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),Cf=Nn(/^html$/i),By=Nn(/^[a-z][.\w]*(-[.\w]+)+$/i),Af=Object.freeze({__proto__:null,ARIA_ATTR:qy,ATTR_WHITESPACE:Fy,CUSTOM_ELEMENT:By,DATA_ATTR:Ny,DOCTYPE_NAME:Cf,ERB_EXPR:Py,IS_ALLOWED_URI:Tf,IS_SCRIPT_OR_DATA:jy,MUSTACHE_EXPR:Dy,TMPLIT_EXPR:My}),qs={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,progressingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},Uy=function(){return typeof window>"u"?null:window},Wy=function(t,n){if(typeof t!="object"||typeof t.createPolicy!="function")return null;let r=null,o="data-tt-policy-suffix";n&&n.hasAttribute(o)&&(r=n.getAttribute(o));let i="dompurify"+(r?"#"+r:"");try{return t.createPolicy(i,{createHTML(s){return s},createScriptURL(s){return s}})}catch{return console.warn("TrustedTypes policy "+i+" could not be created."),null}},Sf=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function Rf(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:Uy(),t=Ue=>Rf(Ue);if(t.version="3.3.0",t.removed=[],!e||!e.document||e.document.nodeType!==qs.document||!e.Element)return t.isSupported=!1,t;let{document:n}=e,r=n,o=r.currentScript,{DocumentFragment:i,HTMLTemplateElement:s,Node:l,Element:a,NodeFilter:u,NamedNodeMap:d=e.NamedNodeMap||e.MozNamedAttrMap,HTMLFormElement:f,DOMParser:_,trustedTypes:y}=e,g=a.prototype,C=Ns(g,"cloneNode"),k=Ns(g,"remove"),X=Ns(g,"nextSibling"),ae=Ns(g,"childNodes"),H=Ns(g,"parentNode");if(typeof s=="function"){let Ue=n.createElement("template");Ue.content&&Ue.content.ownerDocument&&(n=Ue.content.ownerDocument)}let N,P="",{implementation:j,createNodeIterator:B,createDocumentFragment:W,getElementsByTagName:T}=n,{importNode:S}=r,I=Sf();t.isSupported=typeof Ef=="function"&&typeof H=="function"&&j&&j.createHTMLDocument!==void 0;let{MUSTACHE_EXPR:O,ERB_EXPR:J,TMPLIT_EXPR:ce,DATA_ATTR:Se,ARIA_ATTR:K,IS_SCRIPT_OR_DATA:te,ATTR_WHITESPACE:fe,CUSTOM_ELEMENT:Re}=Af,{IS_ALLOWED_URI:V}=Af,le=null,ee=Lt({},[...kf,...cc,...uc,...dc,...wf]),M=null,oe=Lt({},[...$f,...pc,...xf,..._a]),se=Object.seal(fc(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),he=null,xe=null,Ze=Object.seal(fc(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}})),G=!0,ge=!0,ue=!1,Q=!0,Ee=!1,be=!0,Le=!1,qe=!1,Je=!1,He=!1,ie=!1,Z=!1,Oe=!0,nt=!1,pt="user-content-",Ye=!0,_t=!1,Pt={},Et=null,rt=Lt({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]),gt=null,Zt=Lt({},["audio","video","img","source","image","track"]),x=null,re=Lt({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),Ne="http://www.w3.org/1998/Math/MathML",Ce="http://www.w3.org/2000/svg",je="http://www.w3.org/1999/xhtml",We=je,ct=!1,It=null,pe=Lt({},[Ne,Ce,je],ac),$e=Lt({},["mi","mo","mn","ms","mtext"]),Qe=Lt({},["annotation-xml"]),ht=Lt({},["title","style","font","a","script"]),st=null,ut=["application/xhtml+xml","text/html"],vt="text/html",tt=null,Be=null,E=n.createElement("form"),U=function(L){return L instanceof RegExp||L instanceof Function},z=function(){let L=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(Be&&Be===L)){if((!L||typeof L!="object")&&(L={}),L=_r(L),st=ut.indexOf(L.PARSER_MEDIA_TYPE)===-1?vt:L.PARSER_MEDIA_TYPE,tt=st==="application/xhtml+xml"?ac:ma,le=Hn(L,"ALLOWED_TAGS")?Lt({},L.ALLOWED_TAGS,tt):ee,M=Hn(L,"ALLOWED_ATTR")?Lt({},L.ALLOWED_ATTR,tt):oe,It=Hn(L,"ALLOWED_NAMESPACES")?Lt({},L.ALLOWED_NAMESPACES,ac):pe,x=Hn(L,"ADD_URI_SAFE_ATTR")?Lt(_r(re),L.ADD_URI_SAFE_ATTR,tt):re,gt=Hn(L,"ADD_DATA_URI_TAGS")?Lt(_r(Zt),L.ADD_DATA_URI_TAGS,tt):Zt,Et=Hn(L,"FORBID_CONTENTS")?Lt({},L.FORBID_CONTENTS,tt):rt,he=Hn(L,"FORBID_TAGS")?Lt({},L.FORBID_TAGS,tt):_r({}),xe=Hn(L,"FORBID_ATTR")?Lt({},L.FORBID_ATTR,tt):_r({}),Pt=Hn(L,"USE_PROFILES")?L.USE_PROFILES:!1,G=L.ALLOW_ARIA_ATTR!==!1,ge=L.ALLOW_DATA_ATTR!==!1,ue=L.ALLOW_UNKNOWN_PROTOCOLS||!1,Q=L.ALLOW_SELF_CLOSE_IN_ATTR!==!1,Ee=L.SAFE_FOR_TEMPLATES||!1,be=L.SAFE_FOR_XML!==!1,Le=L.WHOLE_DOCUMENT||!1,He=L.RETURN_DOM||!1,ie=L.RETURN_DOM_FRAGMENT||!1,Z=L.RETURN_TRUSTED_TYPE||!1,Je=L.FORCE_BODY||!1,Oe=L.SANITIZE_DOM!==!1,nt=L.SANITIZE_NAMED_PROPS||!1,Ye=L.KEEP_CONTENT!==!1,_t=L.IN_PLACE||!1,V=L.ALLOWED_URI_REGEXP||Tf,We=L.NAMESPACE||je,$e=L.MATHML_TEXT_INTEGRATION_POINTS||$e,Qe=L.HTML_INTEGRATION_POINTS||Qe,se=L.CUSTOM_ELEMENT_HANDLING||{},L.CUSTOM_ELEMENT_HANDLING&&U(L.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(se.tagNameCheck=L.CUSTOM_ELEMENT_HANDLING.tagNameCheck),L.CUSTOM_ELEMENT_HANDLING&&U(L.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(se.attributeNameCheck=L.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),L.CUSTOM_ELEMENT_HANDLING&&typeof L.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(se.allowCustomizedBuiltInElements=L.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),Ee&&(ge=!1),ie&&(He=!0),Pt&&(le=Lt({},wf),M=[],Pt.html===!0&&(Lt(le,kf),Lt(M,$f)),Pt.svg===!0&&(Lt(le,cc),Lt(M,pc),Lt(M,_a)),Pt.svgFilters===!0&&(Lt(le,uc),Lt(M,pc),Lt(M,_a)),Pt.mathMl===!0&&(Lt(le,dc),Lt(M,xf),Lt(M,_a))),L.ADD_TAGS&&(typeof L.ADD_TAGS=="function"?Ze.tagCheck=L.ADD_TAGS:(le===ee&&(le=_r(le)),Lt(le,L.ADD_TAGS,tt))),L.ADD_ATTR&&(typeof L.ADD_ATTR=="function"?Ze.attributeCheck=L.ADD_ATTR:(M===oe&&(M=_r(M)),Lt(M,L.ADD_ATTR,tt))),L.ADD_URI_SAFE_ATTR&&Lt(x,L.ADD_URI_SAFE_ATTR,tt),L.FORBID_CONTENTS&&(Et===rt&&(Et=_r(Et)),Lt(Et,L.FORBID_CONTENTS,tt)),Ye&&(le["#text"]=!0),Le&&Lt(le,["html","head","body"]),le.table&&(Lt(le,["tbody"]),delete he.tbody),L.TRUSTED_TYPES_POLICY){if(typeof L.TRUSTED_TYPES_POLICY.createHTML!="function")throw Ms('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof L.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw Ms('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');N=L.TRUSTED_TYPES_POLICY,P=N.createHTML("")}else N===void 0&&(N=Wy(y,o)),N!==null&&typeof P=="string"&&(P=N.createHTML(""));An&&An(L),Be=L}},ve=Lt({},[...cc,...uc,...Iy]),Ae=Lt({},[...dc,...Ly]),$t=function(L){let ke=H(L);(!ke||!ke.tagName)&&(ke={namespaceURI:We,tagName:"template"});let Me=ma(L.tagName),At=ma(ke.tagName);return It[L.namespaceURI]?L.namespaceURI===Ce?ke.namespaceURI===je?Me==="svg":ke.namespaceURI===Ne?Me==="svg"&&(At==="annotation-xml"||$e[At]):!!ve[Me]:L.namespaceURI===Ne?ke.namespaceURI===je?Me==="math":ke.namespaceURI===Ce?Me==="math"&&Qe[At]:!!Ae[Me]:L.namespaceURI===je?ke.namespaceURI===Ce&&!Qe[At]||ke.namespaceURI===Ne&&!$e[At]?!1:!Ae[Me]&&(ht[Me]||!ve[Me]):!!(st==="application/xhtml+xml"&&It[L.namespaceURI]):!1},kt=function(L){Ds(t.removed,{element:L});try{H(L).removeChild(L)}catch{k(L)}},Ct=function(L,ke){try{Ds(t.removed,{attribute:ke.getAttributeNode(L),from:ke})}catch{Ds(t.removed,{attribute:null,from:ke})}if(ke.removeAttribute(L),L==="is")if(He||ie)try{kt(ke)}catch{}else try{ke.setAttribute(L,"")}catch{}},jt=function(L){let ke=null,Me=null;if(Je)L="<remove></remove>"+L;else{let Dt=lc(L,/^[\r\n\t ]+/);Me=Dt&&Dt[0]}st==="application/xhtml+xml"&&We===je&&(L='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+L+"</body></html>");let At=N?N.createHTML(L):L;if(We===je)try{ke=new _().parseFromString(At,st)}catch{}if(!ke||!ke.documentElement){ke=j.createDocument(We,"template",null);try{ke.documentElement.innerHTML=ct?P:At}catch{}}let ze=ke.body||ke.documentElement;return L&&Me&&ze.insertBefore(n.createTextNode(Me),ze.childNodes[0]||null),We===je?T.call(ke,Le?"html":"body")[0]:Le?ke.documentElement:ze},Wt=function(L){return B.call(L.ownerDocument||L,L,u.SHOW_ELEMENT|u.SHOW_COMMENT|u.SHOW_TEXT|u.SHOW_PROCESSING_INSTRUCTION|u.SHOW_CDATA_SECTION,null)},Qt=function(L){return L instanceof f&&(typeof L.nodeName!="string"||typeof L.textContent!="string"||typeof L.removeChild!="function"||!(L.attributes instanceof d)||typeof L.removeAttribute!="function"||typeof L.setAttribute!="function"||typeof L.namespaceURI!="string"||typeof L.insertBefore!="function"||typeof L.hasChildNodes!="function")},sn=function(L){return typeof l=="function"&&L instanceof l};function xt(Ue,L,ke){fa(Ue,Me=>{Me.call(t,L,ke,Be)})}let tn=function(L){let ke=null;if(xt(I.beforeSanitizeElements,L,null),Qt(L))return kt(L),!0;let Me=tt(L.nodeName);if(xt(I.uponSanitizeElement,L,{tagName:Me,allowedTags:le}),be&&L.hasChildNodes()&&!sn(L.firstElementChild)&&xn(/<[/\w!]/g,L.innerHTML)&&xn(/<[/\w!]/g,L.textContent)||L.nodeType===qs.progressingInstruction||be&&L.nodeType===qs.comment&&xn(/<[/\w]/g,L.data))return kt(L),!0;if(!(Ze.tagCheck instanceof Function&&Ze.tagCheck(Me))&&(!le[Me]||he[Me])){if(!he[Me]&&Bt(Me)&&(se.tagNameCheck instanceof RegExp&&xn(se.tagNameCheck,Me)||se.tagNameCheck instanceof Function&&se.tagNameCheck(Me)))return!1;if(Ye&&!Et[Me]){let At=H(L)||L.parentNode,ze=ae(L)||L.childNodes;if(ze&&At){let Dt=ze.length;for(let Ut=Dt-1;Ut>=0;--Ut){let ot=C(ze[Ut],!0);ot.__removalCount=(L.__removalCount||0)+1,At.insertBefore(ot,X(L))}}}return kt(L),!0}return L instanceof a&&!$t(L)||(Me==="noscript"||Me==="noembed"||Me==="noframes")&&xn(/<\/no(script|embed|frames)/i,L.innerHTML)?(kt(L),!0):(Ee&&L.nodeType===qs.text&&(ke=L.textContent,fa([O,J,ce],At=>{ke=Ps(ke,At," ")}),L.textContent!==ke&&(Ds(t.removed,{element:L.cloneNode()}),L.textContent=ke)),xt(I.afterSanitizeElements,L,null),!1)},pn=function(L,ke,Me){if(Oe&&(ke==="id"||ke==="name")&&(Me in n||Me in E))return!1;if(!(ge&&!xe[ke]&&xn(Se,ke))){if(!(G&&xn(K,ke))){if(!(Ze.attributeCheck instanceof Function&&Ze.attributeCheck(ke,L))){if(!M[ke]||xe[ke]){if(!(Bt(L)&&(se.tagNameCheck instanceof RegExp&&xn(se.tagNameCheck,L)||se.tagNameCheck instanceof Function&&se.tagNameCheck(L))&&(se.attributeNameCheck instanceof RegExp&&xn(se.attributeNameCheck,ke)||se.attributeNameCheck instanceof Function&&se.attributeNameCheck(ke,L))||ke==="is"&&se.allowCustomizedBuiltInElements&&(se.tagNameCheck instanceof RegExp&&xn(se.tagNameCheck,Me)||se.tagNameCheck instanceof Function&&se.tagNameCheck(Me))))return!1}else if(!x[ke]){if(!xn(V,Ps(Me,fe,""))){if(!((ke==="src"||ke==="xlink:href"||ke==="href")&&L!=="script"&&Ty(Me,"data:")===0&&gt[L])){if(!(ue&&!xn(te,Ps(Me,fe,"")))){if(Me)return!1}}}}}}}return!0},Bt=function(L){return L!=="annotation-xml"&&lc(L,Re)},Gt=function(L){xt(I.beforeSanitizeAttributes,L,null);let{attributes:ke}=L;if(!ke||Qt(L))return;let Me={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:M,forceKeepAttr:void 0},At=ke.length;for(;At--;){let ze=ke[At],{name:Dt,namespaceURI:Ut,value:ot}=ze,Rt=tt(Dt),bn=ot,Nt=Dt==="value"?bn:Cy(bn);if(Me.attrName=Rt,Me.attrValue=Nt,Me.keepAttr=!0,Me.forceKeepAttr=void 0,xt(I.uponSanitizeAttribute,L,Me),Nt=Me.attrValue,nt&&(Rt==="id"||Rt==="name")&&(Ct(Dt,L),Nt=pt+Nt),be&&xn(/((--!?|])>)|<\/(style|title|textarea)/i,Nt)){Ct(Dt,L);continue}if(Rt==="attributename"&&lc(Nt,"href")){Ct(Dt,L);continue}if(Me.forceKeepAttr)continue;if(!Me.keepAttr){Ct(Dt,L);continue}if(!Q&&xn(/\/>/i,Nt)){Ct(Dt,L);continue}Ee&&fa([O,J,ce],b=>{Nt=Ps(Nt,b," ")});let kn=tt(L.nodeName);if(!pn(kn,Rt,Nt)){Ct(Dt,L);continue}if(N&&typeof y=="object"&&typeof y.getAttributeType=="function"&&!Ut)switch(y.getAttributeType(kn,Rt)){case"TrustedHTML":{Nt=N.createHTML(Nt);break}case"TrustedScriptURL":{Nt=N.createScriptURL(Nt);break}}if(Nt!==bn)try{Ut?L.setAttributeNS(Ut,Dt,Nt):L.setAttribute(Dt,Nt),Qt(L)?kt(L):vf(t.removed)}catch{Ct(Dt,L)}}xt(I.afterSanitizeAttributes,L,null)},on=function Ue(L){let ke=null,Me=Wt(L);for(xt(I.beforeSanitizeShadowDOM,L,null);ke=Me.nextNode();)xt(I.uponSanitizeShadowNode,ke,null),tn(ke),Gt(ke),ke.content instanceof i&&Ue(ke.content);xt(I.afterSanitizeShadowDOM,L,null)};return t.sanitize=function(Ue){let L=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},ke=null,Me=null,At=null,ze=null;if(ct=!Ue,ct&&(Ue="<!-->"),typeof Ue!="string"&&!sn(Ue))if(typeof Ue.toString=="function"){if(Ue=Ue.toString(),typeof Ue!="string")throw Ms("dirty is not a string, aborting")}else throw Ms("toString is not a function");if(!t.isSupported)return Ue;if(qe||z(L),t.removed=[],typeof Ue=="string"&&(_t=!1),_t){if(Ue.nodeName){let ot=tt(Ue.nodeName);if(!le[ot]||he[ot])throw Ms("root node is forbidden and cannot be sanitized in-place")}}else if(Ue instanceof l)ke=jt("<!---->"),Me=ke.ownerDocument.importNode(Ue,!0),Me.nodeType===qs.element&&Me.nodeName==="BODY"||Me.nodeName==="HTML"?ke=Me:ke.appendChild(Me);else{if(!He&&!Ee&&!Le&&Ue.indexOf("<")===-1)return N&&Z?N.createHTML(Ue):Ue;if(ke=jt(Ue),!ke)return He?null:Z?P:""}ke&&Je&&kt(ke.firstChild);let Dt=Wt(_t?Ue:ke);for(;At=Dt.nextNode();)tn(At),Gt(At),At.content instanceof i&&on(At.content);if(_t)return Ue;if(He){if(ie)for(ze=W.call(ke.ownerDocument);ke.firstChild;)ze.appendChild(ke.firstChild);else ze=ke;return(M.shadowroot||M.shadowrootmode)&&(ze=S.call(r,ze,!0)),ze}let Ut=Le?ke.outerHTML:ke.innerHTML;return Le&&le["!doctype"]&&ke.ownerDocument&&ke.ownerDocument.doctype&&ke.ownerDocument.doctype.name&&xn(Cf,ke.ownerDocument.doctype.name)&&(Ut="<!DOCTYPE "+ke.ownerDocument.doctype.name+`>
`+Ut),Ee&&fa([O,J,ce],ot=>{Ut=Ps(Ut,ot," ")}),N&&Z?N.createHTML(Ut):Ut},t.setConfig=function(){let Ue=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};z(Ue),qe=!0},t.clearConfig=function(){Be=null,qe=!1},t.isValidAttribute=function(Ue,L,ke){Be||z({});let Me=tt(Ue),At=tt(L);return pn(Me,At,ke)},t.addHook=function(Ue,L){typeof L=="function"&&Ds(I[Ue],L)},t.removeHook=function(Ue,L){if(L!==void 0){let ke=Sy(I[Ue],L);return ke===-1?void 0:Ey(I[Ue],ke,1)[0]}return vf(I[Ue])},t.removeHooks=function(Ue){I[Ue]=[]},t.removeAllHooks=function(){I=Sf()},t}var Of=Rf();var mr={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},ga=e=>(...t)=>({_$litDirective$:e,values:t}),Uo=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,n,r){this._$Ct=t,this._$AM=n,this._$Ci=r}_$AS(t,n){return this.update(t,n)}update(t,n){return this.render(...n)}};var js=class extends Uo{constructor(t){if(super(t),this.it=Jt,t.type!==mr.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===Jt||t==null)return this._t=void 0,this.it=t;if(t===Pn)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;let n=[t];return n.raw=n,this._t={_$litType$:this.constructor.resultType,strings:n,values:[]}}};js.directiveName="unsafeHTML",js.resultType=1;var If=ga(js);function yc(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var ao=yc();function jf(e){ao=e}var Ws={exec:()=>null};function Ft(e,t=""){let n=typeof e=="string"?e:e.source,r={replace:(o,i)=>{let s=typeof i=="string"?i:i.source;return s=s.replace(En.caret,"$1"),n=n.replace(o,s),r},getRegex:()=>new RegExp(n,t)};return r}var Hy=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),En={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i")},zy=/^(?:[ \t]*(?:\n|$))+/,Ky=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,Gy=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,Hs=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,Vy=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,vc=/(?:[*+-]|\d{1,9}[.)])/,Ff=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,Bf=Ft(Ff).replace(/bull/g,vc).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),Yy=Ft(Ff).replace(/bull/g,vc).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),kc=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,Qy=/^[^\n]+/,wc=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,Xy=Ft(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",wc).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),Zy=Ft(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,vc).getRegex(),wa="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",$c=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,Jy=Ft("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",$c).replace("tag",wa).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),Uf=Ft(kc).replace("hr",Hs).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",wa).getRegex(),ev=Ft(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",Uf).getRegex(),xc={blockquote:ev,code:Ky,def:Xy,fences:Gy,heading:Vy,hr:Hs,html:Jy,lheading:Bf,list:Zy,newline:zy,paragraph:Uf,table:Ws,text:Qy},Lf=Ft("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",Hs).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",wa).getRegex(),tv={...xc,lheading:Yy,table:Lf,paragraph:Ft(kc).replace("hr",Hs).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",Lf).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",wa).getRegex()},nv={...xc,html:Ft(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",$c).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:Ws,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:Ft(kc).replace("hr",Hs).replace("heading",` *#{1,6} *[^
]`).replace("lheading",Bf).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},rv=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,ov=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,Wf=/^( {2,}|\\)\n(?!\s*$)/,sv=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,$a=/[\p{P}\p{S}]/u,Ac=/[\s\p{P}\p{S}]/u,Hf=/[^\s\p{P}\p{S}]/u,iv=Ft(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,Ac).getRegex(),zf=/(?!~)[\p{P}\p{S}]/u,av=/(?!~)[\s\p{P}\p{S}]/u,lv=/(?:[^\s\p{P}\p{S}]|~)/u,cv=Ft(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",Hy?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),Kf=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,uv=Ft(Kf,"u").replace(/punct/g,$a).getRegex(),dv=Ft(Kf,"u").replace(/punct/g,zf).getRegex(),Gf="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",pv=Ft(Gf,"gu").replace(/notPunctSpace/g,Hf).replace(/punctSpace/g,Ac).replace(/punct/g,$a).getRegex(),fv=Ft(Gf,"gu").replace(/notPunctSpace/g,lv).replace(/punctSpace/g,av).replace(/punct/g,zf).getRegex(),_v=Ft("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,Hf).replace(/punctSpace/g,Ac).replace(/punct/g,$a).getRegex(),mv=Ft(/\\(punct)/,"gu").replace(/punct/g,$a).getRegex(),gv=Ft(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),hv=Ft($c).replace("(?:-->|$)","-->").getRegex(),bv=Ft("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",hv).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),ya=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,yv=Ft(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",ya).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),Vf=Ft(/^!?\[(label)\]\[(ref)\]/).replace("label",ya).replace("ref",wc).getRegex(),Yf=Ft(/^!?\[(ref)\](?:\[\])?/).replace("ref",wc).getRegex(),vv=Ft("reflink|nolink(?!\\()","g").replace("reflink",Vf).replace("nolink",Yf).getRegex(),Df=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,Sc={_backpedal:Ws,anyPunctuation:mv,autolink:gv,blockSkip:cv,br:Wf,code:ov,del:Ws,emStrongLDelim:uv,emStrongRDelimAst:pv,emStrongRDelimUnd:_v,escape:rv,link:yv,nolink:Yf,punctuation:iv,reflink:Vf,reflinkSearch:vv,tag:bv,text:sv,url:Ws},kv={...Sc,link:Ft(/^!?\[(label)\]\((.*?)\)/).replace("label",ya).getRegex(),reflink:Ft(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",ya).getRegex()},gc={...Sc,emStrongRDelimAst:fv,emStrongLDelim:dv,url:Ft(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",Df).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:Ft(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",Df).getRegex()},wv={...gc,br:Ft(Wf).replace("{2,}","*").getRegex(),text:Ft(gc.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},ha={normal:xc,gfm:tv,pedantic:nv},Fs={normal:Sc,gfm:gc,breaks:wv,pedantic:kv},$v={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},Pf=e=>$v[e];function gr(e,t){if(t){if(En.escapeTest.test(e))return e.replace(En.escapeReplace,Pf)}else if(En.escapeTestNoEncode.test(e))return e.replace(En.escapeReplaceNoEncode,Pf);return e}function Mf(e){try{e=encodeURI(e).replace(En.percentDecode,"%")}catch{return null}return e}function Nf(e,t){let n=e.replace(En.findPipe,(i,s,l)=>{let a=!1,u=s;for(;--u>=0&&l[u]==="\\";)a=!a;return a?"|":" |"}),r=n.split(En.splitPipe),o=0;if(r[0].trim()||r.shift(),r.length>0&&!r.at(-1)?.trim()&&r.pop(),t)if(r.length>t)r.splice(t);else for(;r.length<t;)r.push("");for(;o<r.length;o++)r[o]=r[o].trim().replace(En.slashPipe,"|");return r}function Bs(e,t,n){let r=e.length;if(r===0)return"";let o=0;for(;o<r;){let i=e.charAt(r-o-1);if(i===t&&!n)o++;else if(i!==t&&n)o++;else break}return e.slice(0,r-o)}function xv(e,t){if(e.indexOf(t[1])===-1)return-1;let n=0;for(let r=0;r<e.length;r++)if(e[r]==="\\")r++;else if(e[r]===t[0])n++;else if(e[r]===t[1]&&(n--,n<0))return r;return n>0?-2:-1}function qf(e,t,n,r,o){let i=t.href,s=t.title||null,l=e[1].replace(o.other.outputLinkReplace,"$1");r.state.inLink=!0;let a={type:e[0].charAt(0)==="!"?"image":"link",raw:n,href:i,title:s,text:l,tokens:r.inlineTokens(l)};return r.state.inLink=!1,a}function Av(e,t,n){let r=e.match(n.other.indentCodeCompensation);if(r===null)return t;let o=r[1];return t.split(`
`).map(i=>{let s=i.match(n.other.beginningSpace);if(s===null)return i;let[l]=s;return l.length>=o.length?i.slice(o.length):i}).join(`
`)}var va=class{constructor(e){Vt(this,"options");Vt(this,"rules");Vt(this,"lexer");this.options=e||ao}space(e){let t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){let t=this.rules.block.code.exec(e);if(t){let n=t[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?n:Bs(n,`
`)}}}fences(e){let t=this.rules.block.fences.exec(e);if(t){let n=t[0],r=Av(n,t[3]||"",this.rules);return{type:"code",raw:n,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:r}}}heading(e){let t=this.rules.block.heading.exec(e);if(t){let n=t[2].trim();if(this.rules.other.endingHash.test(n)){let r=Bs(n,"#");(this.options.pedantic||!r||this.rules.other.endingSpaceChar.test(r))&&(n=r.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:n,tokens:this.lexer.inline(n)}}}hr(e){let t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:Bs(t[0],`
`)}}blockquote(e){let t=this.rules.block.blockquote.exec(e);if(t){let n=Bs(t[0],`
`).split(`
`),r="",o="",i=[];for(;n.length>0;){let s=!1,l=[],a;for(a=0;a<n.length;a++)if(this.rules.other.blockquoteStart.test(n[a]))l.push(n[a]),s=!0;else if(!s)l.push(n[a]);else break;n=n.slice(a);let u=l.join(`
`),d=u.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");r=r?`${r}
${u}`:u,o=o?`${o}
${d}`:d;let f=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(d,i,!0),this.lexer.state.top=f,n.length===0)break;let _=i.at(-1);if(_?.type==="code")break;if(_?.type==="blockquote"){let y=_,g=y.raw+`
`+n.join(`
`),C=this.blockquote(g);i[i.length-1]=C,r=r.substring(0,r.length-y.raw.length)+C.raw,o=o.substring(0,o.length-y.text.length)+C.text;break}else if(_?.type==="list"){let y=_,g=y.raw+`
`+n.join(`
`),C=this.list(g);i[i.length-1]=C,r=r.substring(0,r.length-_.raw.length)+C.raw,o=o.substring(0,o.length-y.raw.length)+C.raw,n=g.substring(i.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:r,tokens:i,text:o}}}list(e){let t=this.rules.block.list.exec(e);if(t){let n=t[1].trim(),r=n.length>1,o={type:"list",raw:"",ordered:r,start:r?+n.slice(0,-1):"",loose:!1,items:[]};n=r?`\\d{1,9}\\${n.slice(-1)}`:`\\${n}`,this.options.pedantic&&(n=r?n:"[*+-]");let i=this.rules.other.listItemRegex(n),s=!1;for(;e;){let a=!1,u="",d="";if(!(t=i.exec(e))||this.rules.block.hr.test(e))break;u=t[0],e=e.substring(u.length);let f=t[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,C=>" ".repeat(3*C.length)),_=e.split(`
`,1)[0],y=!f.trim(),g=0;if(this.options.pedantic?(g=2,d=f.trimStart()):y?g=t[1].length+1:(g=t[2].search(this.rules.other.nonSpaceChar),g=g>4?1:g,d=f.slice(g),g+=t[1].length),y&&this.rules.other.blankLine.test(_)&&(u+=_+`
`,e=e.substring(_.length+1),a=!0),!a){let C=this.rules.other.nextBulletRegex(g),k=this.rules.other.hrRegex(g),X=this.rules.other.fencesBeginRegex(g),ae=this.rules.other.headingBeginRegex(g),H=this.rules.other.htmlBeginRegex(g);for(;e;){let N=e.split(`
`,1)[0],P;if(_=N,this.options.pedantic?(_=_.replace(this.rules.other.listReplaceNesting,"  "),P=_):P=_.replace(this.rules.other.tabCharGlobal,"    "),X.test(_)||ae.test(_)||H.test(_)||C.test(_)||k.test(_))break;if(P.search(this.rules.other.nonSpaceChar)>=g||!_.trim())d+=`
`+P.slice(g);else{if(y||f.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||X.test(f)||ae.test(f)||k.test(f))break;d+=`
`+_}!y&&!_.trim()&&(y=!0),u+=N+`
`,e=e.substring(N.length+1),f=P.slice(g)}}o.loose||(s?o.loose=!0:this.rules.other.doubleBlankLine.test(u)&&(s=!0)),o.items.push({type:"list_item",raw:u,task:!!this.options.gfm&&this.rules.other.listIsTask.test(d),loose:!1,text:d,tokens:[]}),o.raw+=u}let l=o.items.at(-1);if(l)l.raw=l.raw.trimEnd(),l.text=l.text.trimEnd();else return;o.raw=o.raw.trimEnd();for(let a of o.items){if(this.lexer.state.top=!1,a.tokens=this.lexer.blockTokens(a.text,[]),a.task){if(a.text=a.text.replace(this.rules.other.listReplaceTask,""),a.tokens[0]?.type==="text"||a.tokens[0]?.type==="paragraph"){a.tokens[0].raw=a.tokens[0].raw.replace(this.rules.other.listReplaceTask,""),a.tokens[0].text=a.tokens[0].text.replace(this.rules.other.listReplaceTask,"");for(let d=this.lexer.inlineQueue.length-1;d>=0;d--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[d].src)){this.lexer.inlineQueue[d].src=this.lexer.inlineQueue[d].src.replace(this.rules.other.listReplaceTask,"");break}}let u=this.rules.other.listTaskCheckbox.exec(a.raw);if(u){let d={type:"checkbox",raw:u[0]+" ",checked:u[0]!=="[ ]"};a.checked=d.checked,o.loose?a.tokens[0]&&["paragraph","text"].includes(a.tokens[0].type)&&"tokens"in a.tokens[0]&&a.tokens[0].tokens?(a.tokens[0].raw=d.raw+a.tokens[0].raw,a.tokens[0].text=d.raw+a.tokens[0].text,a.tokens[0].tokens.unshift(d)):a.tokens.unshift({type:"paragraph",raw:d.raw,text:d.raw,tokens:[d]}):a.tokens.unshift(d)}}if(!o.loose){let u=a.tokens.filter(f=>f.type==="space"),d=u.length>0&&u.some(f=>this.rules.other.anyLine.test(f.raw));o.loose=d}}if(o.loose)for(let a of o.items){a.loose=!0;for(let u of a.tokens)u.type==="text"&&(u.type="paragraph")}return o}}html(e){let t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){let t=this.rules.block.def.exec(e);if(t){let n=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),r=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",o=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:n,raw:t[0],href:r,title:o}}}table(e){let t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;let n=Nf(t[1]),r=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),o=t[3]?.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],i={type:"table",raw:t[0],header:[],align:[],rows:[]};if(n.length===r.length){for(let s of r)this.rules.other.tableAlignRight.test(s)?i.align.push("right"):this.rules.other.tableAlignCenter.test(s)?i.align.push("center"):this.rules.other.tableAlignLeft.test(s)?i.align.push("left"):i.align.push(null);for(let s=0;s<n.length;s++)i.header.push({text:n[s],tokens:this.lexer.inline(n[s]),header:!0,align:i.align[s]});for(let s of o)i.rows.push(Nf(s,i.header.length).map((l,a)=>({text:l,tokens:this.lexer.inline(l),header:!1,align:i.align[a]})));return i}}lheading(e){let t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){let t=this.rules.block.paragraph.exec(e);if(t){let n=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:n,tokens:this.lexer.inline(n)}}}text(e){let t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){let t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){let t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){let t=this.rules.inline.link.exec(e);if(t){let n=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(n)){if(!this.rules.other.endAngleBracket.test(n))return;let i=Bs(n.slice(0,-1),"\\");if((n.length-i.length)%2===0)return}else{let i=xv(t[2],"()");if(i===-2)return;if(i>-1){let s=(t[0].indexOf("!")===0?5:4)+t[1].length+i;t[2]=t[2].substring(0,i),t[0]=t[0].substring(0,s).trim(),t[3]=""}}let r=t[2],o="";if(this.options.pedantic){let i=this.rules.other.pedanticHrefTitle.exec(r);i&&(r=i[1],o=i[3])}else o=t[3]?t[3].slice(1,-1):"";return r=r.trim(),this.rules.other.startAngleBracket.test(r)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(n)?r=r.slice(1):r=r.slice(1,-1)),qf(t,{href:r&&r.replace(this.rules.inline.anyPunctuation,"$1"),title:o&&o.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let n;if((n=this.rules.inline.reflink.exec(e))||(n=this.rules.inline.nolink.exec(e))){let r=(n[2]||n[1]).replace(this.rules.other.multipleSpaceGlobal," "),o=t[r.toLowerCase()];if(!o){let i=n[0].charAt(0);return{type:"text",raw:i,text:i}}return qf(n,o,n[0],this.lexer,this.rules)}}emStrong(e,t,n=""){let r=this.rules.inline.emStrongLDelim.exec(e);if(!(!r||r[3]&&n.match(this.rules.other.unicodeAlphaNumeric))&&(!(r[1]||r[2])||!n||this.rules.inline.punctuation.exec(n))){let o=[...r[0]].length-1,i,s,l=o,a=0,u=r[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(u.lastIndex=0,t=t.slice(-1*e.length+o);(r=u.exec(t))!=null;){if(i=r[1]||r[2]||r[3]||r[4]||r[5]||r[6],!i)continue;if(s=[...i].length,r[3]||r[4]){l+=s;continue}else if((r[5]||r[6])&&o%3&&!((o+s)%3)){a+=s;continue}if(l-=s,l>0)continue;s=Math.min(s,s+l+a);let d=[...r[0]][0].length,f=e.slice(0,o+r.index+d+s);if(Math.min(o,s)%2){let y=f.slice(1,-1);return{type:"em",raw:f,text:y,tokens:this.lexer.inlineTokens(y)}}let _=f.slice(2,-2);return{type:"strong",raw:f,text:_,tokens:this.lexer.inlineTokens(_)}}}}codespan(e){let t=this.rules.inline.code.exec(e);if(t){let n=t[2].replace(this.rules.other.newLineCharGlobal," "),r=this.rules.other.nonSpaceChar.test(n),o=this.rules.other.startingSpaceChar.test(n)&&this.rules.other.endingSpaceChar.test(n);return r&&o&&(n=n.substring(1,n.length-1)),{type:"codespan",raw:t[0],text:n}}}br(e){let t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){let t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){let t=this.rules.inline.autolink.exec(e);if(t){let n,r;return t[2]==="@"?(n=t[1],r="mailto:"+n):(n=t[1],r=n),{type:"link",raw:t[0],text:n,href:r,tokens:[{type:"text",raw:n,text:n}]}}}url(e){let t;if(t=this.rules.inline.url.exec(e)){let n,r;if(t[2]==="@")n=t[0],r="mailto:"+n;else{let o;do o=t[0],t[0]=this.rules.inline._backpedal.exec(t[0])?.[0]??"";while(o!==t[0]);n=t[0],t[1]==="www."?r="http://"+t[0]:r=t[0]}return{type:"link",raw:t[0],text:n,href:r,tokens:[{type:"text",raw:n,text:n}]}}}inlineText(e){let t=this.rules.inline.text.exec(e);if(t){let n=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:n}}}},zn=class hc{constructor(t){Vt(this,"tokens");Vt(this,"options");Vt(this,"state");Vt(this,"inlineQueue");Vt(this,"tokenizer");this.tokens=[],this.tokens.links=Object.create(null),this.options=t||ao,this.options.tokenizer=this.options.tokenizer||new va,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let n={other:En,block:ha.normal,inline:Fs.normal};this.options.pedantic?(n.block=ha.pedantic,n.inline=Fs.pedantic):this.options.gfm&&(n.block=ha.gfm,this.options.breaks?n.inline=Fs.breaks:n.inline=Fs.gfm),this.tokenizer.rules=n}static get rules(){return{block:ha,inline:Fs}}static lex(t,n){return new hc(n).lex(t)}static lexInline(t,n){return new hc(n).inlineTokens(t)}lex(t){t=t.replace(En.carriageReturn,`
`),this.blockTokens(t,this.tokens);for(let n=0;n<this.inlineQueue.length;n++){let r=this.inlineQueue[n];this.inlineTokens(r.src,r.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(t,n=[],r=!1){for(this.options.pedantic&&(t=t.replace(En.tabCharGlobal,"    ").replace(En.spaceLine,""));t;){let o;if(this.options.extensions?.block?.some(s=>(o=s.call({lexer:this},t,n))?(t=t.substring(o.raw.length),n.push(o),!0):!1))continue;if(o=this.tokenizer.space(t)){t=t.substring(o.raw.length);let s=n.at(-1);o.raw.length===1&&s!==void 0?s.raw+=`
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
`+o.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=s.text):n.push(o);continue}if(t){let s="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(s);break}else throw new Error(s)}}return this.state.top=!0,n}inline(t,n=[]){return this.inlineQueue.push({src:t,tokens:n}),n}inlineTokens(t,n=[]){let r=t,o=null;if(this.tokens.links){let a=Object.keys(this.tokens.links);if(a.length>0)for(;(o=this.tokenizer.rules.inline.reflinkSearch.exec(r))!=null;)a.includes(o[0].slice(o[0].lastIndexOf("[")+1,-1))&&(r=r.slice(0,o.index)+"["+"a".repeat(o[0].length-2)+"]"+r.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(o=this.tokenizer.rules.inline.anyPunctuation.exec(r))!=null;)r=r.slice(0,o.index)+"++"+r.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let i;for(;(o=this.tokenizer.rules.inline.blockSkip.exec(r))!=null;)i=o[2]?o[2].length:0,r=r.slice(0,o.index+i)+"["+"a".repeat(o[0].length-i-2)+"]"+r.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);r=this.options.hooks?.emStrongMask?.call({lexer:this},r)??r;let s=!1,l="";for(;t;){s||(l=""),s=!1;let a;if(this.options.extensions?.inline?.some(d=>(a=d.call({lexer:this},t,n))?(t=t.substring(a.raw.length),n.push(a),!0):!1))continue;if(a=this.tokenizer.escape(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.tag(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.link(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(a.raw.length);let d=n.at(-1);a.type==="text"&&d?.type==="text"?(d.raw+=a.raw,d.text+=a.text):n.push(a);continue}if(a=this.tokenizer.emStrong(t,r,l)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.codespan(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.br(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.del(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.autolink(t)){t=t.substring(a.raw.length),n.push(a);continue}if(!this.state.inLink&&(a=this.tokenizer.url(t))){t=t.substring(a.raw.length),n.push(a);continue}let u=t;if(this.options.extensions?.startInline){let d=1/0,f=t.slice(1),_;this.options.extensions.startInline.forEach(y=>{_=y.call({lexer:this},f),typeof _=="number"&&_>=0&&(d=Math.min(d,_))}),d<1/0&&d>=0&&(u=t.substring(0,d+1))}if(a=this.tokenizer.inlineText(u)){t=t.substring(a.raw.length),a.raw.slice(-1)!=="_"&&(l=a.raw.slice(-1)),s=!0;let d=n.at(-1);d?.type==="text"?(d.raw+=a.raw,d.text+=a.text):n.push(a);continue}if(t){let d="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(d);break}else throw new Error(d)}}return n}},ka=class{constructor(e){Vt(this,"options");Vt(this,"parser");this.options=e||ao}space(e){return""}code({text:e,lang:t,escaped:n}){let r=(t||"").match(En.notSpaceStart)?.[0],o=e.replace(En.endingNewline,"")+`
`;return r?'<pre><code class="language-'+gr(r)+'">'+(n?o:gr(o,!0))+`</code></pre>
`:"<pre><code>"+(n?o:gr(o,!0))+`</code></pre>
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
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${gr(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:n}){let r=this.parser.parseInline(n),o=Mf(e);if(o===null)return r;e=o;let i='<a href="'+e+'"';return t&&(i+=' title="'+gr(t)+'"'),i+=">"+r+"</a>",i}image({href:e,title:t,text:n,tokens:r}){r&&(n=this.parser.parseInline(r,this.parser.textRenderer));let o=Mf(e);if(o===null)return gr(n);e=o;let i=`<img src="${e}" alt="${n}"`;return t&&(i+=` title="${gr(t)}"`),i+=">",i}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:gr(e.text)}},Ec=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}checkbox({raw:e}){return e}},Kn=class bc{constructor(t){Vt(this,"options");Vt(this,"renderer");Vt(this,"textRenderer");this.options=t||ao,this.options.renderer=this.options.renderer||new ka,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new Ec}static parse(t,n){return new bc(n).parse(t)}static parseInline(t,n){return new bc(n).parseInline(t)}parse(t){let n="";for(let r=0;r<t.length;r++){let o=t[r];if(this.options.extensions?.renderers?.[o.type]){let s=o,l=this.options.extensions.renderers[s.type].call({parser:this},s);if(l!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(s.type)){n+=l||"";continue}}let i=o;switch(i.type){case"space":{n+=this.renderer.space(i);break}case"hr":{n+=this.renderer.hr(i);break}case"heading":{n+=this.renderer.heading(i);break}case"code":{n+=this.renderer.code(i);break}case"table":{n+=this.renderer.table(i);break}case"blockquote":{n+=this.renderer.blockquote(i);break}case"list":{n+=this.renderer.list(i);break}case"checkbox":{n+=this.renderer.checkbox(i);break}case"html":{n+=this.renderer.html(i);break}case"def":{n+=this.renderer.def(i);break}case"paragraph":{n+=this.renderer.paragraph(i);break}case"text":{n+=this.renderer.text(i);break}default:{let s='Token with "'+i.type+'" type was not found.';if(this.options.silent)return console.error(s),"";throw new Error(s)}}}return n}parseInline(t,n=this.renderer){let r="";for(let o=0;o<t.length;o++){let i=t[o];if(this.options.extensions?.renderers?.[i.type]){let l=this.options.extensions.renderers[i.type].call({parser:this},i);if(l!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(i.type)){r+=l||"";continue}}let s=i;switch(s.type){case"escape":{r+=n.text(s);break}case"html":{r+=n.html(s);break}case"link":{r+=n.link(s);break}case"image":{r+=n.image(s);break}case"checkbox":{r+=n.checkbox(s);break}case"strong":{r+=n.strong(s);break}case"em":{r+=n.em(s);break}case"codespan":{r+=n.codespan(s);break}case"br":{r+=n.br(s);break}case"del":{r+=n.del(s);break}case"text":{r+=n.text(s);break}default:{let l='Token with "'+s.type+'" type was not found.';if(this.options.silent)return console.error(l),"";throw new Error(l)}}}return r}},ba,Us=(ba=class{constructor(e){Vt(this,"options");Vt(this,"block");this.options=e||ao}preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}emStrongMask(e){return e}provideLexer(){return this.block?zn.lex:zn.lexInline}provideParser(){return this.block?Kn.parse:Kn.parseInline}},Vt(ba,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens","emStrongMask"])),Vt(ba,"passThroughHooksRespectAsync",new Set(["preprocess","postprocess","processAllTokens"])),ba),Sv=class{constructor(...e){Vt(this,"defaults",yc());Vt(this,"options",this.setOptions);Vt(this,"parse",this.parseMarkdown(!0));Vt(this,"parseInline",this.parseMarkdown(!1));Vt(this,"Parser",Kn);Vt(this,"Renderer",ka);Vt(this,"TextRenderer",Ec);Vt(this,"Lexer",zn);Vt(this,"Tokenizer",va);Vt(this,"Hooks",Us);this.use(...e)}walkTokens(e,t){let n=[];for(let r of e)switch(n=n.concat(t.call(this,r)),r.type){case"table":{let o=r;for(let i of o.header)n=n.concat(this.walkTokens(i.tokens,t));for(let i of o.rows)for(let s of i)n=n.concat(this.walkTokens(s.tokens,t));break}case"list":{let o=r;n=n.concat(this.walkTokens(o.items,t));break}default:{let o=r;this.defaults.extensions?.childTokens?.[o.type]?this.defaults.extensions.childTokens[o.type].forEach(i=>{let s=o[i].flat(1/0);n=n.concat(this.walkTokens(s,t))}):o.tokens&&(n=n.concat(this.walkTokens(o.tokens,t)))}}return n}use(...e){let t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(n=>{let r={...n};if(r.async=this.defaults.async||r.async||!1,n.extensions&&(n.extensions.forEach(o=>{if(!o.name)throw new Error("extension name required");if("renderer"in o){let i=t.renderers[o.name];i?t.renderers[o.name]=function(...s){let l=o.renderer.apply(this,s);return l===!1&&(l=i.apply(this,s)),l}:t.renderers[o.name]=o.renderer}if("tokenizer"in o){if(!o.level||o.level!=="block"&&o.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let i=t[o.level];i?i.unshift(o.tokenizer):t[o.level]=[o.tokenizer],o.start&&(o.level==="block"?t.startBlock?t.startBlock.push(o.start):t.startBlock=[o.start]:o.level==="inline"&&(t.startInline?t.startInline.push(o.start):t.startInline=[o.start]))}"childTokens"in o&&o.childTokens&&(t.childTokens[o.name]=o.childTokens)}),r.extensions=t),n.renderer){let o=this.defaults.renderer||new ka(this.defaults);for(let i in n.renderer){if(!(i in o))throw new Error(`renderer '${i}' does not exist`);if(["options","parser"].includes(i))continue;let s=i,l=n.renderer[s],a=o[s];o[s]=(...u)=>{let d=l.apply(o,u);return d===!1&&(d=a.apply(o,u)),d||""}}r.renderer=o}if(n.tokenizer){let o=this.defaults.tokenizer||new va(this.defaults);for(let i in n.tokenizer){if(!(i in o))throw new Error(`tokenizer '${i}' does not exist`);if(["options","rules","lexer"].includes(i))continue;let s=i,l=n.tokenizer[s],a=o[s];o[s]=(...u)=>{let d=l.apply(o,u);return d===!1&&(d=a.apply(o,u)),d}}r.tokenizer=o}if(n.hooks){let o=this.defaults.hooks||new Us;for(let i in n.hooks){if(!(i in o))throw new Error(`hook '${i}' does not exist`);if(["options","block"].includes(i))continue;let s=i,l=n.hooks[s],a=o[s];Us.passThroughHooks.has(i)?o[s]=u=>{if(this.defaults.async&&Us.passThroughHooksRespectAsync.has(i))return(async()=>{let f=await l.call(o,u);return a.call(o,f)})();let d=l.call(o,u);return a.call(o,d)}:o[s]=(...u)=>{if(this.defaults.async)return(async()=>{let f=await l.apply(o,u);return f===!1&&(f=await a.apply(o,u)),f})();let d=l.apply(o,u);return d===!1&&(d=a.apply(o,u)),d}}r.hooks=o}if(n.walkTokens){let o=this.defaults.walkTokens,i=n.walkTokens;r.walkTokens=function(s){let l=[];return l.push(i.call(this,s)),o&&(l=l.concat(o.call(this,s))),l}}this.defaults={...this.defaults,...r}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return zn.lex(e,t??this.defaults)}parser(e,t){return Kn.parse(e,t??this.defaults)}parseMarkdown(e){return(t,n)=>{let r={...n},o={...this.defaults,...r},i=this.onError(!!o.silent,!!o.async);if(this.defaults.async===!0&&r.async===!1)return i(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof t>"u"||t===null)return i(new Error("marked(): input parameter is undefined or null"));if(typeof t!="string")return i(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(t)+", string expected"));if(o.hooks&&(o.hooks.options=o,o.hooks.block=e),o.async)return(async()=>{let s=o.hooks?await o.hooks.preprocess(t):t,l=await(o.hooks?await o.hooks.provideLexer():e?zn.lex:zn.lexInline)(s,o),a=o.hooks?await o.hooks.processAllTokens(l):l;o.walkTokens&&await Promise.all(this.walkTokens(a,o.walkTokens));let u=await(o.hooks?await o.hooks.provideParser():e?Kn.parse:Kn.parseInline)(a,o);return o.hooks?await o.hooks.postprocess(u):u})().catch(i);try{o.hooks&&(t=o.hooks.preprocess(t));let s=(o.hooks?o.hooks.provideLexer():e?zn.lex:zn.lexInline)(t,o);o.hooks&&(s=o.hooks.processAllTokens(s)),o.walkTokens&&this.walkTokens(s,o.walkTokens);let l=(o.hooks?o.hooks.provideParser():e?Kn.parse:Kn.parseInline)(s,o);return o.hooks&&(l=o.hooks.postprocess(l)),l}catch(s){return i(s)}}}onError(e,t){return n=>{if(n.message+=`
Please report this to https://github.com/markedjs/marked.`,e){let r="<p>An error occurred:</p><pre>"+gr(n.message+"",!0)+"</pre>";return t?Promise.resolve(r):r}if(t)return Promise.reject(n);throw n}}},io=new Sv;function zt(e,t){return io.parse(e,t)}zt.options=zt.setOptions=function(e){return io.setOptions(e),zt.defaults=io.defaults,jf(zt.defaults),zt};zt.getDefaults=yc;zt.defaults=ao;zt.use=function(...e){return io.use(...e),zt.defaults=io.defaults,jf(zt.defaults),zt};zt.walkTokens=function(e,t){return io.walkTokens(e,t)};zt.parseInline=io.parseInline;zt.Parser=Kn;zt.parser=Kn.parse;zt.Renderer=ka;zt.TextRenderer=Ec;zt.Lexer=zn;zt.lexer=zn.lex;zt.Tokenizer=va;zt.Hooks=Us;zt.parse=zt;var qS=zt.options,jS=zt.setOptions,FS=zt.use,BS=zt.walkTokens,US=zt.parseInline;var WS=Kn.parse,HS=zn.lex;function hr(e){let t=zt.parse(e),n=Of.sanitize(t);return If(n)}function br(e,t){return c`<div class="prompt-block">
    <div class="prompt-block__label">${e}</div>
    <pre class="prompt-block__body">${t}</pre>
  </div>`}function Wo(e){return e.loading?c`<div class="prompt-block__status">불러오는 중…</div>`:e.error?c`<div class="prompt-block__status prompt-block__status--error">
      프롬프트를 불러오지 못했습니다
    </div>`:""}function xa(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),n=r=>String(r).padStart(2,"0");return`${t.getFullYear()}-${n(t.getMonth()+1)}-${n(t.getDate())} ${n(t.getHours())}:${n(t.getMinutes())}`}var Xf={Read:"\u{1F4D6}",Edit:"\u270E",MultiEdit:"\u270E",Write:"\u{1F4DD}",Bash:"\u26A1",Grep:"\u{1F50E}",Glob:"\u{1F50E}",Task:"\u{1F916}",Agent:"\u{1F916}",WebFetch:"\u{1F310}",WebSearch:"\u{1F310}"},Ev={command_execution:"\uBA85\uB839 \uC2E4\uD589",file_change:"\uD30C\uC77C \uBCC0\uACBD",mcp_call:"MCP \uD638\uCD9C",web_search:"\uC6F9 \uAC80\uC0C9",plan:"\uACC4\uD68D"},Tv=/^\s*([✓✗⊘])\s*(spec|impl|implementation|plan)\s*게이트\s*[—–-]\s*(\S+)\s+(APPROVE|REVISE|REJECT|BLOCK|SKIP)(?:\s*·\s*(.+))?/,Cv=/^\s*#{0,3}\s*Phase\s+\d+(?:\s*\/\s*\d+)?\s*(?:[·:—–-]\s*.+)?$/;function Gn(e){return!!e&&typeof e=="object"}function Tc(e){return typeof e!="string"||e.length===0?[]:e.split(/\r?\n/)}function Cc(e,t){let n=Tc(e),r=Tc(t),o=new Map;for(let l of n)o.set(l,(o.get(l)||0)+1);let i=0;for(let l of r){let a=o.get(l)||0;a>0?o.set(l,a-1):i+=1}let s=0;for(let l of o.values())s+=l;return{added:i,removed:s}}function Zf(e){let t="";typeof e=="string"?t=e:Array.isArray(e)?t=e.map(o=>Gn(o)&&typeof o.text=="string"?o.text:"").join(""):Gn(e)&&typeof e.text=="string"&&(t=e.text);let r=(String(t).split(/\r?\n/).find(o=>o.trim().length>0)||"").trim();return r.length>120?`${r.slice(0,117)}\u2026`:r}function Rv(e){let t=String(e.name||""),n=e.input||{},r={kind:"tool",tool:t,icon:Xf[t]||"\u{1F527}",input:n,expandable:!0};if((t==="Read"||t==="Write")&&(r.path=String(n.file_path||n.path||"")),t==="Write"&&(r.added=Tc(n.content).length),t==="Edit"){r.path=String(n.file_path||n.path||"");let{added:o,removed:i}=Cc(n.old_string,n.new_string);r.added=o,r.removed=i}if(t==="MultiEdit"){r.path=String(n.file_path||n.path||"");let o=0,i=0,s=Array.isArray(n.edits)?n.edits:[];for(let l of s){let a=Cc(Gn(l)?l.old_string:"",Gn(l)?l.new_string:"");o+=a.added,i+=a.removed}r.added=o,r.removed=i}return t==="Bash"&&(r.command=String(n.command||"")),(t==="Grep"||t==="Glob")&&(r.command=String(n.pattern||n.query||"")),t==="Agent"&&(typeof e.id=="string"&&e.id.length>0&&(r.launch_id=e.id),typeof n.description=="string"&&(r.command=n.description)),r}function Rc(e){return typeof e!="string"||e.trim().length===0?null:{kind:"thinking",text:e}}var Ov=/<system-reminder>[\s\S]*?<\/system-reminder>/g;function Jf(e){let t;if(typeof e=="string")t=e;else if(Array.isArray(e))t=e.filter(r=>Gn(r)&&r.type==="text"&&typeof r.text=="string").map(r=>String(r.text)).join(`
`);else return null;let n=t.replace(Ov,"").trim();return n.length>0?{kind:"user",text:n}:null}function Oc(e){let t=e.split(/\r?\n/).find(r=>r.trim().length>0)||"",n=Tv.exec(t);return n?{kind:"gate",gate:n[2]==="implementation"?"impl":n[2],reviewer:n[3],verdict:n[4],time:n[5]?n[5].trim():void 0,text:t.trim()}:Cv.test(t)&&t.trim().length<=80?{kind:"phase",text:t.trim()}:{kind:"assistant",text:e}}function Iv(e,t){if(e.subtype==="init"){let n=typeof e.model=="string"?e.model:"";return t.progress=null,[{kind:"thinking",text:n?`\uC138\uC158 \uC2DC\uC791 \xB7 ${n}`:"\uC138\uC158 \uC2DC\uC791"}]}if(e.subtype==="thinking_tokens"){let r=`\uC0DD\uAC01 \uC911\u2026 ${typeof e.estimated_tokens=="number"&&Number.isFinite(e.estimated_tokens)?Math.max(0,Math.round(e.estimated_tokens)):0} \uD1A0\uD070`;return t.progress?(t.progress.text=r,[]):(t.progress={kind:"thinking",text:r},[t.progress])}return[]}function Lv(e,t){let n=typeof e.parent_tool_use_id=="string"&&e.parent_tool_use_id.length>0?e.parent_tool_use_id:null;if(e.type==="assistant"){let r=e.message,o=r&&Array.isArray(r.content)?r.content:[],i=[];for(let s of o)if(Gn(s)){if(s.type==="text"&&typeof s.text=="string")i.push(Oc(s.text));else if(s.type==="thinking"){let l=Rc(s.thinking);l&&i.push(l)}else if(s.type==="tool_use"){let l=Rv(s);typeof s.id=="string"&&t.set(s.id,l),i.push(l)}}return n?Qf(i,n):i}if(e.type==="user"){let r=e.message,o=r&&Array.isArray(r.content)?r.content:[];for(let s of o)if(Gn(s)&&s.type==="tool_result"){let l=t.get(String(s.tool_use_id));if(l){let a=Zf(s.content);l.result=a,l.output=typeof s.content=="string"?s.content:a,s.is_error===!0&&(l.is_error=!0)}}let i=Jf(r&&r.content);return i?[i]:[]}if(e.type==="result"){let r=e.is_error===!1&&e.subtype==="success",o={kind:"result",success:r,text:typeof e.result=="string"?e.result:r?"DONE":""};return n?Qf([o],n):[o]}return[]}function Qf(e,t){for(let n of e)n.parent_tool_use_id=t;return e}function Dv(e){let t=typeof e.command=="string"?e.command:"",n=Zf(e.aggregated_output===void 0?e.output:e.aggregated_output),o=[typeof e.exit_code=="number"&&Number.isFinite(e.exit_code)?`exit ${e.exit_code}`:typeof e.status=="string"&&e.status.length>0?e.status:"",n].filter(s=>s.length>0).join(" \xB7 "),i={kind:"tool",tool:"shell",icon:Xf.Bash,command:t,input:{command:t},expandable:!0};return o.length>0&&(i.result=o),typeof e.aggregated_output=="string"&&(i.output=e.aggregated_output),i}function Pv(e){if(e.type==="item.completed"&&Gn(e.item)){let t=e.item;if(t.type==="agent_message"&&typeof t.text=="string")return[Oc(t.text)];if(t.type==="user_message"){let n=Jf(t.text);return n?[n]:[]}if(t.type==="reasoning"){let n=Rc(t.text);return n?[n]:[]}return t.type==="error"?[{kind:"error",text:String(t.message||"")}]:t.type==="command_execution"?[Dv(t)]:[]}if(e.type==="turn.completed")return[{kind:"result",success:!0,text:"DONE"}];if(e.type==="turn.failed"){let t=e.error;return[{kind:"error",text:t&&typeof t.message=="string"?t.message:"turn failed"}]}return e.type==="error"?[{kind:"error",text:String(e.message||"")}]:[]}function Mv(e){if(e.schema!=="codex-delegation-monitor-v1"||!Gn(e.event))return[];let t=e.event;if(t.type==="session.started"||t.type==="turn.started")return[];if((t.type==="item.started"||t.type==="item.completed")&&Gn(t.item)){let n=t.item;if(typeof n.id!="string"||n.id.length===0)return[];if(t.type==="item.completed"&&n.kind==="agent_message"&&typeof n.text=="string"&&n.text.trim().length>0)return[Oc(n.text)];if(t.type==="item.completed"&&n.kind==="reasoning"){let s=Rc(n.text);return s?[s]:[]}if(t.type!=="item.completed"||n.kind!=="activity"||typeof n.activity!="string")return[];let r=Ev[n.activity];if(!r)return[];let o,i;if(n.status==="completed")o="\uC644\uB8CC",i="\u2713";else if(n.status==="failed")o="\uC2E4\uD328",i="\u2717";else return[];return[{kind:"tool",tool:`${r} \xB7 ${o}`,icon:i,expandable:!1,result:""}]}return t.type==="turn.completed"&&t.status==="completed"?[{kind:"result",success:!0,text:"DONE"}]:t.type==="turn.failed"&&(t.status==="failed"||t.status==="interrupted")&&typeof t.error_code=="string"&&t.error_code.length>0?[{kind:"error",text:t.error_code}]:[]}function Nv(e){let t=e.type;return typeof t=="string"&&(t==="error"||t.startsWith("thread.")||t.startsWith("turn.")||t.startsWith("item."))}function qv(e){let t=e;if(typeof e=="string"){let n=e.trim();if(n.length===0)return null;try{t=JSON.parse(n)}catch{return null}}return Gn(t)?t:null}function e_(e={}){let t=e.skip_delegated===!0,n=new Map,r={progress:null};return{push(o){let i=qv(o);if(!i)return[];if(t&&typeof i.parent_tool_use_id=="string"&&i.parent_tool_use_id.length>0)return[];if(i.type==="system"&&i.schema!=="codex-delegation-monitor-v1")return Iv(i,r);let s=i.schema==="codex-delegation-monitor-v1"?Mv(i):Nv(i)?Pv(i):Lv(i,n);return s.length>0&&(r.progress=null),s}}}function Ic(e){let t=[],n=e_(),r=Array.isArray(e)?e:[];for(let o of r)for(let i of n.push(o))t.push(i);return t}var jv=5,Fv=10,Bv=/Task\s+#(\d+)/,Uv=/\bgh\s+pr\s+create\b|\bgit\s+push\b/,Wv=/\bnpm\s+(?:run\s+)?(?:test|tsc|lint|build)\b|\bvitest\b/;function zs(e){return typeof e!="string"?"":(e.split(/\r?\n/).find(t=>t.trim().length>0)||"").trim()}function Hv(e){return typeof e!="string"||e.length===0?0:e.split(/\r?\n/).length}function zv(e){for(let t=e.length-1;t>=0;t-=1){let n=e[t];if(n.kind==="phase"||n.kind==="gate")return n.text||null}return null}function Kv(e){let t=new Map,n=0;for(let o of e){if(o.kind!=="tool")continue;n+=1;let i=o.input||{};if(o.tool==="TaskCreate"){let a=Bv.exec(o.output||o.result||""),u=String(i.activeForm||i.subject||"").trim();if(!a||u.length===0)continue;t.set(a[1],{label:u,active:i.status==="in_progress"?n:0});continue}if(o.tool!=="TaskUpdate")continue;let s=t.get(String(i.taskId??""));if(!s)continue;let l=i.activeForm||i.subject;typeof l=="string"&&l.trim().length>0&&(s.label=l.trim()),typeof i.status=="string"&&(s.active=i.status==="in_progress"?n:0)}let r=null;for(let o of t.values())o.active>0&&(!r||o.active>r.active)&&(r=o);return r?r.label:null}function Gv(e){if(e.tool==="Bash"){let t=e.command||"";return Uv.test(t)?"~ PR/\uAC8C\uC2DC \uC911":Wv.test(t)?"~ \uAC80\uC99D \uC911":null}return e.tool==="Edit"||e.tool==="Write"||e.tool==="MultiEdit"?"~ \uAD6C\uD604 \uC911":e.tool==="Read"||e.tool==="Grep"||e.tool==="Glob"?"~ \uD0D0\uC0C9 \uC911":null}function Vv(e){let t=e.filter(o=>o.kind==="tool").slice(-Fv),n=new Map;t.forEach((o,i)=>{let s=Gv(o);if(!s)return;let l=n.get(s)||{count:0,last:-1};l.count+=1,l.last=i,n.set(s,l)});let r=null;for(let[o,i]of n)(!r||i.count>r.count||i.count===r.count&&i.last>r.last)&&(r={label:o,count:i.count,last:i.last});return r?r.label:null}function Yv(e){let t=zv(e);if(t)return{text:t,guess:!1};let n=Kv(e);if(n)return{text:n,guess:!1};let r=Vv(e);return r?{text:r,guess:!0}:null}function Qv(e,t){if(typeof e!="number")return"";let n=Math.max(0,Math.floor((t-e)/1e3));return n<60?`${n}\uCD08 \uC804`:wn(e,t)}function Ho(e,t={}){let{transport:n,sessionLogStore:r,onClose:o}=t,i=null,s=null,l=null,a=null,u=null,d=!1,f={},_=!0,y=new Set,g=new Set,C=null,k=null,X=!1,ae=!1,H=!1,N=null,P=null;function j(){X=!1,ae=!1,H=!1,N=null,P=null}async function B(ie){if(n){ae=!0,H=!1,he();try{let Z=await Promise.resolve(n("get-attempt-prompt",{attempt_id:ie,...u?{root_dir:u}:{}}));if(i!==ie)return;!Z||typeof Z!="object"||Array.isArray(Z)?H=!0:(N=Z,P=ie)}catch{i===ie&&(H=!0)}finally{i===ie&&(ae=!1,he())}}}function W(){if(X=!X,X&&i&&P!==i){B(i);return}he()}function T(){if(!X)return"";let ie=Wo({loading:ae,error:H});if(ie)return c`<div class="sv__prompt" data-seam="attempt-prompt">
        ${ie}
      </div>`;if(!N)return"";if(N.missing)return c`<div class="sv__prompt" data-seam="attempt-prompt">
        <div class="prompt-block__status">
          기록 없음 — 프롬프트 기록 이전에 실행된 attempt입니다
        </div>
      </div>`;let Z=xa(N.recorded_at);return c`<div class="sv__prompt" data-seam="attempt-prompt">
      ${Z?c`<div class="prompt-block__meta">${Z} 발송</div>`:""}
      ${typeof N.task_prompt=="string"?br("\uACFC\uC5C5 (user)",N.task_prompt):""}
      ${typeof N.system_prompt=="string"?br("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",N.system_prompt):""}
    </div>`}function S(){if(!a||!r)return[];let ie=r.get(a);return Ic(ie?ie.lines:[])}function I(){if(!a||!r)return null;let ie=r.get(a),Z=ie?ie.last_event_at:null;return typeof Z=="number"?Z:null}function O(){return f.status==="running"}function J(){if(O()&&i){k||(k=setInterval(()=>he(),1e3));return}ce()}function ce(){k&&(clearInterval(k),k=null)}function Se(ie){let Z=[],Oe=0;for(;Oe<ie.length;){let{idx:nt,line:pt}=ie[Oe];if(pt.kind==="tool"){let Ye=Oe;for(;Ye<ie.length&&ie[Ye].line.kind==="tool"&&ie[Ye].line.tool===pt.tool;)Ye+=1;if(Ye-Oe>=jv&&!g.has(nt)){Z.push({kind:"group",idx:nt,tool:pt.tool||"",lines:ie.slice(Oe,Ye)}),Oe=Ye;continue}}Z.push({kind:"line",idx:nt,line:pt}),Oe+=1}return Z}function K(ie){let Z=[],Oe=new Map;for(let Ye=0;Ye<ie.length;Ye+=1){let _t=ie[Ye],Pt=_t.parent_tool_use_id;if(typeof Pt=="string"&&Pt.length>0){let Et=Oe.get(Pt);Et||(Et={kind:"subagent",idx:Ye,launch_id:Pt,agent_type:null,header:null,lines:[]},Oe.set(Pt,Et),Z.push(Et)),Et.lines.push({idx:Ye,line:_t});continue}if(_t.kind==="tool"&&_t.tool==="Agent"&&typeof _t.launch_id=="string"&&_t.launch_id.length>0){let Et=te(_t),rt=Oe.get(_t.launch_id);if(rt){rt.header={idx:Ye,line:_t},rt.agent_type=Et;continue}let gt={kind:"subagent",idx:Ye,launch_id:_t.launch_id,agent_type:Et,header:{idx:Ye,line:_t},lines:[]};Oe.set(_t.launch_id,gt),Z.push(gt);continue}Z.push({kind:"entry",idx:Ye,line:_t})}let nt=[],pt=0;for(;pt<Z.length;){if(Z[pt].kind!=="entry"){nt.push(Z[pt]),pt+=1;continue}let Ye=pt;for(;Ye<Z.length&&Z[Ye].kind==="entry";)Ye+=1;nt.push(...Se(Z.slice(pt,Ye))),pt=Ye}return nt}function te(ie){let Z=ie.input;return Z&&typeof Z.subagent_type=="string"?Z.subagent_type:null}function fe(ie){for(let Z=ie.length-1;Z>=0;Z-=1){let Oe=ie[Z];if(Oe.kind==="result"||Oe.kind==="error")return null;if(Oe.kind==="tool"&&!Object.hasOwn(Oe,"result"))return Oe}return null}function Re(ie){for(let Z=ie.length-1;Z>=0;Z-=1)if(ie[Z].kind==="thinking")return ie[Z];return null}function V(ie,Z){if(Z.kind==="gate")return c`<div class="sv__gate">${Z.text}</div>`;if(Z.kind==="phase")return c`<div class="sv__phase">${Z.text}</div>`;if(Z.kind==="result")return c`<div
        class="sv__result${Z.success?" sv__result--ok":" sv__result--fail"}"
      >
        <span class="sv__result-glyph">${Z.success?"\u2713":"\u2717"}</span>
        <span class="sv__result-body"
          >${hr(Z.text||(Z.success?"DONE":"\uC2E4\uD328"))}</span
        >
      </div>`;if(Z.kind==="thinking"){let Oe=y.has(ie);return c`<div
        class="sv__think${Oe?" sv__think--expanded":""}"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>Ze(ie)}
      >
        <span class="sv__think-line">💭 ${zs(Z.text)}</span>
        ${Oe?c`<pre class="sv__think-expand">${Z.text}</pre>`:""}
      </div>`}if(Z.kind==="user"){let Oe=y.has(ie);return c`<div
        class="sv__line sv__line--user${Oe?" sv__line--expanded":""}"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>Ze(ie)}
      >
        <span class="sv__user-line">▷ ${zs(Z.text)}</span>
        ${Oe?c`<pre class="sv__user-expand">${Z.text}</pre>`:""}
      </div>`}if(Z.kind==="error")return c`<div class="sv__error">⛔ ${Z.text}</div>`;if(Z.kind==="blocker")return c`<div class="sv__error">⛔ ${Z.text}</div>`;if(Z.kind==="tool"){let Oe=y.has(ie),nt=Z.tool==="Bash"?Hv(Z.command):0,pt=Z.tool==="Bash"?nt>1?zs(Z.command):Z.command:Z.path||Z.command||"";return c`<div
        class="sv__tool${Oe?" sv__tool--expanded":""}"
        role="button"
        tabindex="0"
        @click=${()=>Ze(ie)}
      >
        <span class="sv__tool-line">
          <span class="sv__tool-icon">${Z.icon}</span>
          <span class="sv__tool-name">${Z.tool}</span>
          ${pt?c`<span class="sv__tool-detail">${pt}</span>`:""}
          ${nt>1?c`<span class="sv__tool-more">⋯ ${nt}줄</span>`:""}
          ${typeof Z.added=="number"?c`<span class="sv__diff-add">+${Z.added}</span>`:""}
          ${typeof Z.removed=="number"?c`<span class="sv__diff-del">−${Z.removed}</span>`:""}
          ${Z.result?c`<span class="sv__tool-ok">→ ${Z.result}</span>`:""}
        </span>
        ${Oe?c`<pre class="sv__tool-expand">${le(Z)}</pre>`:""}
      </div>`}return c`<div class="sv__as">${hr(Z.text||"")}</div>`}function le(ie){let Z=[];if(ie.tool==="Bash"&&typeof ie.command=="string"&&ie.command.length>0)Z.push(ie.command);else if(ie.input!==void 0)try{Z.push(`input: ${JSON.stringify(ie.input,null,2)}`)}catch{}return typeof ie.output=="string"&&ie.output.length>0&&Z.push(`output:
${ie.output}`),Z.join(`

`)}function ee(){if(!i)return c``;let ie=S(),Z=(s?[f.agent_type,f.model,f.effort]:[f.runner,f.model,f.effort]).filter(Boolean).join(" \xB7 "),Oe=f.session_id||"",nt=`\uB77C\uC774\uBE0C \uB530\uB77C\uAC00\uAE30 ${_?"ON":"OFF"}`,pt=O(),Ye=pt?Qv(I(),Date.now()):"",_t=pt?fe(ie):null,Pt=pt?Re(ie):null,Et=Yv(ie);return c`<div class="sv" data-attempt-id=${i}>
      <div class="sv__bar">
        <span class="sv__id"
          >${f.label||(s?f.role||"":i)}</span
        >
        ${Et?c`<span
              class="sv__stage${Et.guess?" sv__stage--guess":""}"
              title=${Et.text}
              >${Et.text}</span
            >`:""}
        ${pt?c`<span
              class="sv__live"
              title="세션이 진행 중입니다"
              aria-label=${Ye?`\uC9C4\uD589 \uC911 \xB7 \uB9C8\uC9C0\uB9C9 \uC774\uBCA4\uD2B8 ${Ye}`:"\uC9C4\uD589 \uC911"}
              ><span class="sv__live-dot" aria-hidden="true"></span>${Ye?c`<span class="sv__live-ago">${Ye}</span>`:""}</span
            >`:""}
        ${Oe?c`<button
              type="button"
              class="sv__session"
              title=${Oe}
              aria-label=${`\uC138\uC158 ID \uBCF5\uC0AC: ${Oe}`}
              @click=${()=>ge(Oe)}
            >
              ⧉ ${Oe.slice(0,8)}
            </button>`:""}
        ${f.resume_command?c`<button
              type="button"
              class="sv__resume-cmd"
              title=${f.resume_command}
              aria-label=${`\uC7AC\uAC1C \uBA85\uB839 \uBCF5\uC0AC: ${f.resume_command}`}
              @click=${()=>ge(f.resume_command||"")}
            >
              ⧉ 재개 명령
            </button>`:""}
        ${Z?c`<span class="sv__meta">${Z}</span>`:""}
        ${f.worktree?c`<span class="sv__wt" title=${f.worktree}
              >${f.worktree}</span
            >`:""}
        ${s||d?"":c`<button
              type="button"
              class="sv__prompt-toggle${X?" sv__prompt-toggle--on":""}"
              data-seam="attempt-prompt-toggle"
              aria-pressed=${X?"true":"false"}
              aria-label="발송 프롬프트 보기"
              title="이 세션에 실제로 보낸 시스템·과업 프롬프트"
              @click=${W}
            >
              ✉ 프롬프트
            </button>`}
        <button
          type="button"
          class="sv__follow${_?" sv__follow--on":""}"
          aria-pressed=${_?"true":"false"}
          aria-label=${nt}
          @click=${G}
        >
          <span class="sv__follow-full">⇣ ${nt}</span>
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
      ${s||d?"":T()}
      <div class="sv__body">
        ${ie.length===0?c`<div class="sv__empty">세션 로그 없음</div>`:K(ie).map(rt=>rt.kind==="subagent"?oe(rt):rt.kind==="group"?M(rt):V(rt.idx,rt.line))}
      </div>
      ${_t||Pt?c`<div class="sv__now">
            <span class="sv__now-label">지금</span>
            ${_t?c`<span class="sv__now-icon">${_t.icon}</span>
                  <span class="sv__now-name">${_t.tool}</span>
                  <span class="sv__now-detail"
                    >${_t.tool==="Bash"?zs(_t.command):_t.path||_t.command||""}</span
                  >`:""}
            ${Pt?c`<span class="sv__now-think"
                  >💭 ${zs(Pt.text)}</span
                >`:""}
          </div>`:""}
    </div>`}function M(ie){return c`<div
      class="sv__group"
      role="button"
      tabindex="0"
      title="펼치기"
      @click=${()=>se(ie.idx)}
    >
      <span class="sv__group-icon">${ie.lines[0].line.icon}</span>
      <span class="sv__group-name">${ie.tool}</span>
      <span class="sv__group-count">${ie.lines.length}</span>
      <span class="sv__group-caret" aria-hidden="true">▸</span>
    </div>`}function oe(ie){let Z=g.has(ie.idx),Oe=ie.header?ie.header.line:null,nt=Oe?Oe.is_error===!0?"\u2717":typeof Oe.result=="string"?"\u2713":"\u27F3":"",pt=Oe&&Oe.command?Oe.command:"";return c`<div class="sv__sub${Z?" sv__sub--open":""}">
      <div
        class="sv__sub-head"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>se(ie.idx)}
      >
        <span class="sv__sub-icon" aria-hidden="true">🤖</span>
        <span class="sv__sub-name">${ie.agent_type||"subagent"}</span>
        ${pt?c`<span class="sv__sub-detail">${pt}</span>`:""}
        <span class="sv__sub-count">${ie.lines.length}줄</span>
        ${nt?c`<span class="sv__sub-state">${nt}</span>`:""}
        ${Z?"":c`<span class="sv__sub-caret" aria-hidden="true">▸</span>`}
      </div>
      ${Z?c`<div class="sv__sub-body">
            ${Se(ie.lines).map(Ye=>Ye.kind==="group"?M(Ye):V(Ye.idx,Ye.line))}
          </div>`:""}
    </div>`}function se(ie){g.add(ie),he()}function he(){lt(ee(),e),J(),_&&xe()}function xe(){let ie=e.querySelector(".sv__body");ie&&(ie.scrollTop=ie.scrollHeight)}function Ze(ie){y.has(ie)?y.delete(ie):y.add(ie),he()}function G(){_=!_,he()}function ge(ie){$n(ie).then(Z=>{Z?ye("\uBCF5\uC0AC\uB428","success",1200):ye("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function ue(ie){!i||!ie||(f={...f,...ie},he())}function Q(ie){let Z=ie.target;if(!Z||!Z.classList||!Z.classList.contains("sv__body"))return;!(Z.scrollHeight-Z.scrollTop-Z.clientHeight<=4)&&_&&(_=!1,he())}e.addEventListener("scroll",Q,!0);function Ee(ie){let Z=ie.target;!Z||typeof Z.closest!="function"||e.contains(Z)||Z.closest("dialog")||Z.closest(".md-viewer-root")||He()}let be=!1;function Le(){be||(document.addEventListener("mousedown",Ee),be=!0)}function qe(){be&&(document.removeEventListener("mousedown",Ee),be=!1)}function Je(ie){let Z=ie&&ie.attempt_id;if(!Z)return;let Oe=typeof ie.launch_id=="string"&&ie.launch_id.length>0?ie.launch_id:null,nt=ie.session_ref&&typeof ie.session_ref=="object"?ie.session_ref:null;if(Oe&&nt)return;let pt=a;i=Z,s=Oe,l=nt,a=s?`session-log:${i}:${s}`:`session-log:${i}`,n&&pt&&pt!==a&&Promise.resolve(n("unsubscribe-session-log",{id:pt})).catch(()=>{}),u=typeof ie.root_dir=="string"&&ie.root_dir.length>0?ie.root_dir:null,f=ie.meta||{},d=ie.hide_prompt===!0,_=!0,y.clear(),g.clear(),j(),!C&&r&&(C=r.subscribe(he)),n&&Promise.resolve(n("subscribe-session-log",{id:a,attempt_id:i,...s?{launch_id:s}:{},...l?{session_ref:l}:{},...u?{root_dir:u}:{}})).catch(()=>{}),Le(),he()}function He(){let ie=a;qe(),i=null,s=null,l=null,a=null,u=null,d=!1,y.clear(),g.clear(),j(),ce(),n&&ie&&Promise.resolve(n("unsubscribe-session-log",{id:ie})).catch(()=>{}),lt(c``,e),o&&o()}return{open:Je,updateMeta:ue,close:He,isOpen(){return i!==null},destroy(){ce(),qe(),C&&(C(),C=null),e.removeEventListener("scroll",Q,!0),i=null,s=null,l=null,a=null,u=null,d=!1,lt(c``,e)}}}function Xv(e){let t=[],n=e?.workflow?.stages,r=n?.spec?.doc;r&&t.push({kind:"spec",path:r.path,missing_state:r.missing_state});let o=n?.plan?.doc;return o&&t.push({kind:"plan",path:o.path,missing_state:o.missing_state}),t}function t_(e,t){let n=Xv(e);return c`
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
  `}var Zv="## \u{1F916} \uC791\uC5C5 \uBCF4\uACE0\uC11C",Jv=/^> (worker · attempt|session · sid) ([A-Za-z0-9._-]{1,64}) · (\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z)$/,ek=/^\*\*결론\*\* — (.+)$/;function Aa(e){if(typeof e!="string"||e.length===0)return null;let t=e.split(/\r?\n/);if(t[0]!==Zv)return null;let n=Jv.exec(t[1]||"");if(!n)return null;let r=n[1].split(" ")[0],o=n[2],i=n[3],s=2;for(;s<t.length&&t[s].trim().length===0;)s+=1;let l=s<t.length?ek.exec(t[s]):null,a=l?l[1].replace(/\s+/g," ").trim():"",u=l?s+1:s;return{lane:r,identifier:o,timestamp:i,conclusion:a,body:t.slice(u).join(`
`).trim()}}var tk=/^## 🔎 리뷰 결과 · (spec|impl|plan) · r([0-9]+)$/,nk=/^VERDICT: (APPROVE|REVISE)$/,rk=/^anchor: ([0-9a-fA-F]+)$/,ok=/^[0-9]+\. /,sk="- \uC9C0\uC801 \uC5C6\uC74C",ik={spec:40,impl:40,plan:12};function n_(e){if(typeof e!="string"||e.length===0)return null;let t=e.split(/\r?\n/),n=tk.exec(t[0]||"");if(!n)return null;let r=nk.exec(t[1]||""),o=rk.exec(t[2]||"");if(!r||!o)return null;let i=n[1],s=o[1];if(s.length!==ik[i])return null;let l=t.slice(3),a=0,u=!1;for(let d of l)ok.test(d)?a+=1:d.trim()===sk&&(u=!0);return{step:i,round:Number(n[2]),verdict:r[1],anchor:s,points:a>0?a:u?0:null,body:l.join(`
`).trim()}}var r_=20;function Lc(e){if(e==null||e==="")return"";let t=new Date(e);if(Number.isNaN(t.getTime()))return"";let n=String(t.getMonth()+1).padStart(2,"0"),r=String(t.getDate()).padStart(2,"0"),o=String(t.getHours()).padStart(2,"0"),i=String(t.getMinutes()).padStart(2,"0");return`${n}-${r} ${o}:${i}`}function ak(e){return e.length>r_?`${e.slice(0,r_)}\u2026`:e}function lk(e,t,n,r){let o=`${t.lane} ${ak(t.identifier)}`;return c`<div class="detail-report">
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
        <span class="detail-report__time">${Lc(t.timestamp)}</span>
      </span>
      <span class="detail-report__concl">${t.conclusion}</span>
    </button>
    ${r&&t.body.length>0?c`<div class="detail-report__body">
          ${hr(t.body)}
        </div>`:""}
  </div>`}var o_=12;function ck(e){return e.points===null?"":e.points===0?"\uC9C0\uC801 \uC5C6\uC74C":`\uC9C0\uC801 ${e.points}\uAC74`}function uk(e,t,n,r){let o=t.anchor.length>o_?`${t.anchor.slice(0,o_)}\u2026`:t.anchor,i=ck(t);return c`<div class="detail-report detail-report--review">
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
          >${o}</span
        >
        <span class="detail-report__time"
          >${Lc(e.created_at)}</span
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
          ${hr(t.body)}
        </div>`:""}
  </div>`}function dk(e){return c`<div class="detail-comment" data-comment-id=${e.id}>
    <div class="detail-comment__meta">
      <span class="detail-comment__author"
        >${e.author||"(\uC791\uC131\uC790 \uC5C6\uC74C)"}</span
      >
      <span class="detail-comment__time"
        >${Lc(e.created_at)}</span
      >
    </div>
    <div class="detail-comment__body">
      ${hr(typeof e.text=="string"?e.text:"")}
    </div>
  </div>`}function s_(e,t={},n={}){let r=Array.isArray(e)?e.filter(Boolean):[],o=n.expanded||new Set,i=typeof n.draft=="string"?n.draft:"",s=n.sending===!0,l=r.slice().sort((a,u)=>String(u.created_at||"").localeCompare(String(a.created_at||"")));return c`
    <div class="detail-section-label">댓글 (${r.length})</div>
    ${n.error?c`<div class="detail-empty" data-seam="comments-error">
          댓글을 불러오지 못했습니다
        </div>`:l.length===0?c`<div class="detail-empty" data-seam="comments">댓글 없음</div>`:c`<div class="detail-comments" data-seam="comments">
            ${l.map(a=>{let u=typeof a.text=="string"?a.text:"",d=Aa(u);if(d)return lk(a,d,t,o.has(a.id));let f=n_(u);return f?uk(a,f,t,o.has(a.id)):dk(a)})}
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
  `}var{I:$E}=cu;var i_=e=>e.strings===void 0;var pk={},a_=(e,t=pk)=>e._$AH=t;var Ir=ga(class extends Uo{constructor(e){if(super(e),e.type!==mr.PROPERTY&&e.type!==mr.ATTRIBUTE&&e.type!==mr.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!i_(e))throw Error("`live` bindings can only contain a single expression")}render(e){return e}update(e,[t]){if(t===Pn||t===Jt)return t;let n=e.element,r=e.name;if(e.type===mr.PROPERTY){if(t===n[r])return Pn}else if(e.type===mr.BOOLEAN_ATTRIBUTE){if(!!t===n.hasAttribute(r))return Pn}else if(e.type===mr.ATTRIBUTE&&n.getAttribute(r)===t+"")return Pn;return a_(e),t}});var fk=[{id:"spec",label:"spec \uB9AC\uBDF0",receipt:"spec_review",receipt_stage:null,fill_stage:"spec",stale_stage:"spec",hue:"spec"},{id:"plan",label:"\uACC4\uD68D \uB9AC\uBDF0",receipt:null,receipt_stage:"plan",fill_stage:"plan",stale_stage:"plan",hue:"plan"},{id:"impl",label:"\uAD6C\uD604",receipt:null,receipt_stage:null,fill_stage:"impl",stale_stage:null,hue:"impl"},{id:"impl_review",label:"impl \uB9AC\uBDF0",receipt:"impl_review",receipt_stage:null,fill_stage:null,stale_stage:"impl",hue:"impl"},{id:"pr",label:"PR",receipt:null,receipt_stage:null,fill_stage:"pr",stale_stage:null,hue:"pr"}],Dc={quick_fix:["impl","impl_review"],spec_backed:["spec","impl","impl_review","pr"],full_plan:["spec","plan","impl","impl_review","pr"]},l_={missing:"\uC2B9\uC778 \uD544\uC694",stale:"\uC7AC\uC2B9\uC778 \uD544\uC694",unknown:"\uC2B9\uC778 \uD655\uC778 \uBD88\uAC00"},_k={pin:"pin",global:"global",base:"base"};function mk(e){return c`<span
    class=${`detail-layer-rail detail-layer-rail--${_k[e]}`}
    data-source=${e}
    aria-hidden="true"
    ><i></i><i></i><i></i
  ></span>`}function gk(e,t,n){switch(e){case"workflow_mode":return cs;case"spec_review_model":case"impl_review_model":return us;case"plan_review_model":return Ci;case"spec_review_effort":case"plan_review_effort":case"impl_review_effort":return Ri;case"spec_review_speed":case"plan_review_speed":case"impl_review_speed":return er;case"impl_dispatch":return ls;case"impl_runtime":return Ti;case"impl_model":return Co(n,t.impl_runtime);case"impl_effort":return Yr(n,t.impl_runtime,t.impl_model);case"impl_speed":case"orchestration_speed":return er;case"orchestration_model":return Ro(n,null);case"orchestration_effort":return Yr(n,void 0,t.orchestration_model||Rn).filter(r=>r!==Rn);default:return[]}}function hk(e,t){return c`<div class="detail-effective__row" data-key=${e.key}>
    ${mk(e.source)}
    <span class="detail-effective__k"
      >${Ar[e.key]||e.key}</span
    >
    <span
      class=${`detail-effective__v${e.source==="base"?" detail-effective__v--dim":""}`}
      title=${e.full_value||""}
      >${e.display}</span
    >
    <span
      class=${`detail-effective__badge detail-effective__badge--${e.source}`}
      >${Ii[e.source]}</span
    >
    ${t.expanded?c`<select
          class="detail-effective__edit"
          data-edit-key=${e.key}
          aria-label=${`${Ar[e.key]||e.key} \uD3B8\uC9D1`}
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
  </div>`}function c_(e,t){let n=wl.flatMap(a=>a.keys),r=$l(n,e.metadata,e.workspace_values,e.execution_defaults,e.catalog,e.controller_runtime||null),o=Bd(n,e.metadata,e.workspace_values,e.execution_defaults,e.catalog,e.controller_runtime||null),i=Object.fromEntries(r.map(a=>[a.key,a])),s=Object.fromEntries(r.filter(a=>a.value!==null).map(a=>[a.key,a.value])),l=r.filter(a=>a.full_value&&a.display!==a.full_value).map(a=>a.full_value).join(" \xB7 ");return c`<details
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
        >${bk(i)}</span
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
          ${wl.map(a=>c`
              <div class="detail-effective__subhead">${a.label}</div>
              ${r.filter(u=>a.keys.includes(u.key)).map(u=>{let d=Ai({key:u.key,choices:gk(u.key,s,e.catalog),layer:"pin",pin:e.metadata,global:e.workspace_values,execution_defaults:e.execution_defaults,runner_catalog:e.catalog,route:typeof e.metadata?.route=="string"?e.metadata.route:null,controller_runtime:e.controller_runtime||null});return hk(u,{expanded:e.expanded,options:d.options,default_label:d.unset_label,default_full_value:d.full_value,onEdit:t.onEdit})})}
            `)}
          <div class="detail-effective__foot">
            <select
              data-impl-preset-select
              aria-label="실행 프리셋"
              .value=${Ir(e.preset_id)}
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
  </details>`}function bk(e){let t=[];if(e.workflow_mode&&t.push(e.workflow_mode.display),e.impl_dispatch?.value==="main")t.push("\uBA54\uC778");else if(e.impl_dispatch?.value==="delegated"){let n=e.impl_runtime?` ${e.impl_runtime.display}`:"";t.push(`\uC704\uC784${n}`)}for(let n of["impl_model","impl_effort","impl_speed"])e[n]?.resolution!=="not_applicable"&&t.push(e[n]?.display||"\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00");return t.join(" \xB7 ")}function yk(e){if(!e||typeof e!="object")return null;let{kind:t,actor:n,effort:r,sha:o}=e;return typeof t!="string"||typeof n!="string"||typeof o!="string"?null:{kind:t,actor:n,effort:typeof r=="string"?r:null,sha:o}}function u_(e,t={}){let n=e&&typeof e.metadata=="object"&&e.metadata?e.metadata:{},r=e&&typeof e.workflow=="object"&&e.workflow?e.workflow:{},o=r.stages||{},i=r.route||n.route||null,s=typeof n.pr_url=="string"?n.pr_url:"",l=typeof n.exec_receipt=="string"?n.exec_receipt:"",a=yk(r.exec_receipt),u=a?lr(a):l,d=a?`${a.kind}:${a.actor}`:l.split("@")[0],f=bi(r.planned_execution,r.exec_receipt),_=r.chips?.pr?.number,y=typeof _=="number"?`PR #${_}`:"PR",g=fs(n),C=g!==null&&t.isChipOpen?.("rec")===!0,k=C?Pl({rec:g},"rec"):null;return c`<section class="detail-summary" data-seam="detail-summary">
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
            >${y}</a
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
      ${g?c`<button
            type="button"
            class="detail-summary__chip detail-summary__chip--rec judgement-chip"
            data-chip-key="rec"
            data-state=${g.state}
            aria-expanded=${C?"true":"false"}
            title=${Mi(g)}
            @click=${()=>t.onChipToggle?.("rec")}
          >
            ${"\uBCF5\uC7A1"}
          </button>`:""}
    </div>
    ${k?Lo(k):""}
    <div
      class="detail-summary__gates"
      role="group"
      aria-label="워크플로 게이트"
    >
      ${vk(i).map(X=>kk(X,n,o,{label:X.id==="pr"?y:X.label,href:X.id==="pr"?s:""}))}
    </div>
  </section>`}function vk(e){let n=typeof e=="string"&&Object.hasOwn(Dc,e)&&Dc[e]||Dc.spec_backed;return fk.filter(r=>n.includes(r.id))}var Sa={on:"\uD1B5\uACFC",stale:"\uC7AC\uAC80\uD1A0 \uD544\uC694",current:"\uC9C4\uD589 \uC911",none:"\uBBF8\uB3C4\uB2EC"};function kk(e,t,n,r){let o=wk(e,t,n),i=e.fill_stage?n[e.fill_stage]:null,s=typeof i?.fill=="string"?i.fill:null,l=s?s==="full":o.length>0,a=!l&&s==="dim",u=e.stale_stage?n[e.stale_stage]?.stale===!0:!1,d=o&&o.split("@")[1]?.slice(0,7)||"",f=u?Sa.stale:l?Sa.on:a?Sa.current:Sa.none,_=$k(e,n),y=`${r.label} \xB7 ${f}${_?` \xB7 ${_}`:""}${o?` \xB7 ${o}`:""}`,g=`detail-summary__gate${l?" detail-summary__gate--on":""}${a?" detail-summary__gate--current":""}${u?" detail-summary__gate--stale":""}${d?" detail-summary__gate--receipt":""}`,C=c`<span class="detail-summary__gate-label"
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
      title=${y}
      >${C}</a
    >`:c`<span
    class=${g}
    data-gate=${e.id}
    data-hue=${e.hue}
    title=${y}
    >${C}</span
  >`}function wk(e,t,n){if(e.receipt&&typeof t[e.receipt]=="string")return String(t[e.receipt]);if(e.receipt_stage){let r=n[e.receipt_stage]?.receipt;return typeof r=="string"?r:""}return""}function $k(e,t){if(e.id!=="plan")return"";let n=t.plan?.approval_state;return typeof n=="string"&&Object.hasOwn(l_,n)?l_[n]:""}function Ea(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function d_(e){return Ea(e)&&typeof e.key=="string"&&e.key.length>0&&typeof e.email=="string"&&e.email.length>0}function p_(e,t){let n=e&&e[t];if(!Ea(n)||!Array.isArray(n.accounts))return null;let r=n.accounts.filter(d_),o=d_(n.active)?n.active:null;return{accounts:r,active:o||r.find(i=>i.active===!0)||null}}function m_(e){return typeof e.alias=="string"&&e.alias.length>0?` (${e.alias})`:""}function Ta(e){let t=typeof e.status=="string"&&e.status!=="ok"?` \xB7 ${e.status}`:"";return`${e.email}${m_(e)}${t}`}function zo(e){let t=typeof e.plan=="string"&&e.plan.length>0?e.plan:"plan \uD655\uC778 \uBD88\uAC00";return`${e.email} \xB7 ${t}${m_(e)}`}function xk(e,t,n){if(n!==null){let o=e==="claude"?Ta:zo,i=t?t.accounts.find(s=>s.key===n):void 0;return`\uB808\uD3EC \uAE30\uBCF8\uAC12 \uC0AC\uC6A9(${i?o(i):n})`}return t?t.active?`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(${e==="claude"?t.active.email:zo({...t.active,alias:null})})`:"\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(\uD655\uC778 \uBD88\uAC00)":"(\uAE30\uBCF8)"}function f_(e,t){if(!Ea(e)||e.state!=="usable"||!Ea(e.values))return null;let n=e.values[t];return typeof n=="string"&&n.length>0?n:null}function __(e){let t=e.provider_key==="claude"?Ta:zo,n=!!e.provider?.accounts.some(r=>r.key===e.selected);return c`<div class="detail-kv" data-exec-account-row=${e.key}>
    <span class="detail-kv__k">${e.title}</span>
    <span class="detail-kv__vgroup">
      <select
        class=${e.selected?"detail-kv__v detail-kv__v--sel":"detail-kv__v"}
        aria-label=${e.title}
        data-exec-key=${e.key}
        @change=${r=>e.handlers.onExecChange(e.key,r.target.value)}
      >
        <option value="" ?selected=${e.selected.length===0}>
          ${xk(e.provider_key,e.provider,e.workspace_default)}
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
  </div>`}function g_({md:e,catalog:t,workspace_defaults:n=null,handlers:r}){let o=typeof e.claude_account=="string"?e.claude_account:"",i=typeof e.codex_account=="string"?e.codex_account:"";return c`<section class="exec-accounts" data-exec-accounts>
    <div class="detail-section-label">실행 계정</div>
    <div class="exec-settings-core">
      ${__({key:"claude_account",title:"Claude \uACC4\uC815",provider_key:"claude",provider:p_(t,"claude"),selected:o,workspace_default:f_(n,"claude_account"),handlers:r,hint:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uB7F0\uD0C0\uC784\uC774 claude\uC77C \uB54C \uC801\uC6A9\uB429\uB2C8\uB2E4"})}
      ${__({key:"codex_account",title:"Codex \uACC4\uC815",provider_key:"codex",provider:p_(t,"codex"),selected:i,workspace_default:f_(n,"codex_account"),handlers:r})}
    </div>
  </section>`}function Ak(e){return String(e||"").replace(/^docs\/(superpowers\/)?/,"")}function Sk(e){let t=/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(e);if(!t)return{front:null,body:e};let n=t[1].trim();return{front:n.length>0?n:null,body:e.slice(t[0].length)}}function Ca(e,t){let n=t.getWorkspacePath,r=t.fetchImpl||globalThis.fetch?.bind(globalThis),o=null,i="loading",s="",l=null,a="";function u(C){C.key==="Escape"&&o&&(C.preventDefault(),y())}document.addEventListener("keydown",u);function d(){return o?c`
      <div class="mv-overlay" role="dialog" aria-modal="true">
        <div class="mv-overlay__backdrop" @click=${()=>y()}></div>
        <div class="mv">
          <div class="mv__bar">
            <span class="mv__path" title=${o}
              >${Ak(o)}</span
            >
            <button
              type="button"
              class="mv__close"
              aria-label="닫기"
              @click=${()=>y()}
            >
              ✕
            </button>
          </div>
          <div class="mv__body">
            ${i==="loading"?c`<div class="mv__status">불러오는 중…</div>`:i==="pending"?c`<div class="mv__status">${a}</div>`:i==="error"?c`<div class="mv__status mv__status--error">
                      ${a||"\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"}
                    </div>`:c`${l===null?null:c`<pre class="mv__front">
${l}</pre
                        >`}${hr(s)}`}
          </div>
        </div>
      </div>
    `:c``}function f(){lt(d(),e)}async function _(C,k={}){o=C,i="loading",s="",l=null,a="",f();let X=k.workspace||(n?n():"");if(!X){i="error",a="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4",f();return}if(!r){i="error",a="fetch\uB97C \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",f();return}let ae="/api/doc?workspace="+encodeURIComponent(X)+"&path="+encodeURIComponent(C);try{let H=await r(ae),N=await H.json().catch(()=>({}));if(!H.ok||!N||N.ok!==!0){if(N?.error==="not_found"&&k.missing_state==="plan_pending"){i="pending",a="\uACC4\uD68D \uC791\uC131 \uC804 \xB7 \uACBD\uB85C\uB9CC \uC608\uC57D\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4",f();return}i="error",a="\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 ("+String(N&&N.error||H.status)+")",f();return}let P=Sk(String(N.content||""));l=P.front,s=P.body,i="ready",f()}catch{i="error",a="\uBB38\uC11C \uC694\uCCAD \uC2E4\uD328",f()}}function y(){o=null,lt(c``,e)}function g(){document.removeEventListener("keydown",u),y()}return{open:_,close:y,destroy:g}}function y_(e){if(!e||typeof e.price_basis!="string")return"";let t=e.price_basis;if(!(t in fl))return"";let n=fl[t];if(t==="none")return c`<span class="detail-session__price detail-session__price--none"
      >${n}</span
    >`;let r=$o({total_cost_usd:e.price_usd,cost_estimated:t==="estimated"});return r.length===0?"":c`<span class="detail-session__price" title=${r.join(`
`)}
    >${r[0]}${n?` ${n}`:""}</span
  >`}var Ek=[{key:"input_tokens",label:"\uC785\uB825"},{key:"output_tokens",label:"\uCD9C\uB825"},{key:"cache_read_input_tokens",label:"\uCE90\uC2DC \uC77D\uAE30"}],v_="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4",Ra=[{role:"implementation",provider:"codex"},{role:"review-consult",provider:"codex"},{role:"subagent",provider:"claude"}],Tk=new Set(["codex-runner","Explore","Plan","advisor","advisor-xhigh","claude-code-guide","statusline-setup"]);function h_(e){return typeof e=="string"&&Tk.has(e)}var Ck=["running","done","failed","interrupted"],Rk={running:"\u25CF",done:"\u2713",failed:"\u2717",interrupted:"\u26A0"};function Ok(e){return typeof e=="number"&&Number.isFinite(e)?e:0}function Ik(e){let t=gn(e);if(t.length>0)return t.map(o=>c`<span class="detail-usage-total" title=${o.tooltip}
          >${o.label}</span
        >`);let n=Ao(e);if(!n||!e)return"";let r=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?` \xB7 $${e.total_cost_usd.toFixed(2)}`:"";return c`<span
      class="detail-usage-total"
      title="이 이슈의 모든 attempt 토큰 합계 (입력+출력+캐시)"
      >${n.replace(/^τ /,"\u03C4 \uCD1D ")}${r}</span
    >${e.replayed?c`<span class="detail-usage-partial" title=${v_}
          >부분 집계</span
        >`:""}`}function b_(e){return!e||!e.roles.orchestrator?null:{providers:e.roles.orchestrator,roles:{}}}function Nc(e){if(typeof e=="number")return Ks(e);if(typeof e!="string")return"";let t=Date.parse(e);return Number.isFinite(t)?Ks(t):""}function Lk(e){return typeof e=="string"?e.replace(/-\d{8}$/,""):""}function k_(e,t,n){if(e.provider!=="claude"){let o=e.session_id?` \xB7 thread ${e.session_id}`:"",i=n?" \xB7 \uC774\uC804 \uB77C\uC6B4\uB4DC \uC2A4\uB808\uB4DC \uC774\uC5B4\uAC10":"";return{text:`${n?"\u21A9 ":""}${e.launch_id}`,title:`${e.launch_id}${o}${i}`,thread:e.session_id?{text:e.session_id.slice(0,8),title:e.session_id}:null}}let r=t&&typeof t.agent_id=="string"?t.agent_id:"";return r.length>0?{text:r.slice(0,8),title:r,thread:null}:{text:e.launch_id.slice(-8),title:e.launch_id,thread:null}}function w_(e){return e?c`<span
        class="detail-session__leg-thread detail-session__sid"
        title=${e.title}
        >${e.text}</span
      >`:""}function Pc(e){return e===null||typeof e=="string"&&e.trim().length>0}function Mc(e){return e===null||typeof e=="number"&&Number.isFinite(e)}function Dk(e){if(!e||typeof e!="object"||Array.isArray(e))return null;let t=e,n=t.provider==="claude";return typeof t.launch_id!="string"||t.launch_id.length===0||!Ra.some(r=>r.role===t.role&&r.provider===t.provider)||!(n?Pc(t.model):typeof t.model=="string"&&t.model.length>0)||!(!("effort"in t)||Pc(t.effort))||!(!("agent_type"in t)||Pc(t.agent_type))||typeof t.session_id!="string"||t.session_id.length===0||!Ck.includes(t.status)||!(t.turn_id===null||typeof t.turn_id=="string")?null:n?!Mc(t.started_at)||!Mc(t.last_event_at)||!Mc(t.completed_at)?null:t:typeof t.started_at!="number"||!Number.isFinite(t.started_at)||typeof t.last_event_at!="number"||!Number.isFinite(t.last_event_at)||!(t.completed_at===null||typeof t.completed_at=="string"&&Number.isFinite(Date.parse(t.completed_at)))?null:t}function Pk(e,t,n,r){let i=gn({providers:{[t]:{subtotal:n.subtotal,breakdown:n.usage,...n.replayed?{replayed:!0}:{}}},roles:{}})[0],s=k_({provider:t,launch_id:n.receipt_id,session_id:typeof n.session_id=="string"?n.session_id:void 0},n,r);return c`<div class="detail-session__leg detail-session__usage-detail">
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
    ${w_(s.thread)}
    ${Nc(n.completed_at)?c`<span class="detail-session__leg-time detail-session__time"
          >${Nc(n.completed_at)}</span
        >`:""}
    ${i?c`<span class="detail-session__usage" title=${i.tooltip}
          >${i.label}</span
        >`:""}${y_(n)}
  </div>`}function Mk(e,t,n,r,o){let i=e.status==="running"?null:t,l=(i?gn({providers:{[e.provider]:{subtotal:i.subtotal,breakdown:i.usage,...i.replayed?{replayed:!0}:{}}},roles:{}}):[])[0],a=e.status==="running"?Ks(e.last_event_at):i?Nc(i.completed_at):"",u=(e.provider==="claude"?["Claude",e.agent_type,Lk(e.model),e.effort]:["codex",e.model,e.effort]).filter(Boolean).join(" \xB7 "),d=k_(e,i,o);return c`<button
    type="button"
    class="detail-session__leg detail-session__usage-detail detail-session__leg--${e.status}"
    data-launch-id=${e.launch_id}
    @click=${()=>r.onOpenDelegation&&r.onOpenDelegation(n,e.launch_id)}
  >
    <span class="detail-session__leg-glyph" aria-hidden="true"
      >${Rk[e.status]}</span
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
    ${w_(d.thread)}
    ${a?c`<span class="detail-session__leg-time detail-session__time"
          >${a}</span
        >`:""}
    ${l?c`<span class="detail-session__usage" title=${l.tooltip}
          >${l.label}</span
        >`:""}${y_(i)}
  </button>`}function Nk(e,t){return e.role===t.role&&(e.model===null||t.model===void 0||e.model===t.model)&&e.session_id===t.session_id}function qk(e,t,n){let r=[],o=new Set,i=Array.isArray(e.delegation_sessions)?e.delegation_sessions:[];for(let f of i){let _=Dk(f);!_||o.has(_.launch_id)||h_(_.agent_type)||(o.add(_.launch_id),r.push(_))}r.sort((f,_)=>(f.started_at||0)-(_.started_at||0));let s={};for(let{role:f,provider:_}of Ra){let y=t?t.roles[f]?.[_]:null;s[f]=y?[...y.legs]:[]}let l=Ra.flatMap(({role:f})=>s[f]),a=new Set,u=new Set,d=[];for(let{role:f,provider:_}of Ra){for(let y of r.filter(g=>g.role===f&&g.provider===_)){let g=l.find(k=>k.receipt_id===y.launch_id)||null;if(g&&!Nk(y,g))continue;g&&a.add(g.receipt_id);let C=_==="codex"&&u.has(y.session_id);d.push(Mk(y,g,e.attempt_id,n,C)),_==="codex"&&u.add(y.session_id)}for(let y of s[f])if(!a.has(y.receipt_id)&&!h_(y.agent_type)){let g=typeof y.session_id=="string"&&y.session_id.length>0?y.session_id:null,C=_==="codex"&&g!==null&&u.has(g);d.push(Pk(f,_,y,C)),_==="codex"&&g!==null&&u.add(g)}}return d}function jk(e,t){let n=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?e.total_cost_usd:null,r=[...Ek,{key:"cache_creation_input_tokens",label:t==="codex"?"\uCE90\uC2DC \uC4F0\uAE30":"\uCE90\uC2DC \uC0DD\uC131"},...t==="codex"&&typeof e.reasoning_output_tokens=="number"&&Number.isFinite(e.reasoning_output_tokens)?[{key:"reasoning_output_tokens",label:"\uCD94\uB860 \uCD9C\uB825"}]:[]];return c`<div class="detail-session__usage-detail">
    ${r.map(o=>c`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">${o.label}</span
          ><span class="detail-session__usage-value"
            >${Ok(e[o.key]).toLocaleString("en-US")}</span
          ></span
        >`)}
    ${n===null?"":c`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">비용</span
          ><span class="detail-session__usage-value"
            >$${n.toFixed(2)}</span
          ></span
        >`}
    ${e.replayed?c`<span class="detail-session__usage-note">${v_}</span>`:""}
  </div>`}var Fk={running:"\u25CF",done:"\u2713",failed:"\u2717",orphaned:"\u26A0"};function Ks(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),n=String(t.getHours()).padStart(2,"0"),r=String(t.getMinutes()).padStart(2,"0");return`${n}:${r}`}function Bk(e){if(typeof e.exec_default_preset_id!="string"||e.exec_default_preset_id.length===0)return"";let t=e.exec_values&&typeof e.exec_values=="object"?Object.entries(e.exec_values).filter(([,r])=>typeof r=="string"&&r.length>0).map(([r,o])=>`${r}=${o}`).join(" \xB7 "):"",n=typeof e.exec_default_preset_revision=="number"?` r${e.exec_default_preset_revision}`:"";return c`<div
    class="detail-session__preset-audit"
    data-attempt-preset-audit
  >
    <strong>외부 실행 preset</strong>
    <span>${e.exec_default_preset_id}${n}</span>
    ${t?c`<small>${t}</small>`:""}
    <small>내부 workflow 실행 영수증과 별도 기록</small>
  </div>`}var Uk={remote:"\uB2E4\uB978 \uBA38\uC2E0 \uC138\uC158 \u2014 \uC774 \uC11C\uBC84\uC5D0 transcript \uC5C6\uC74C",missing:"transcript \uD30C\uC77C \uC5C6\uC74C"};function Wk(e,t){let n=Uk[e.locality]||"",r=e.locality==="remote"?`${e.host} \xB7 \uB2E4\uB978 \uBA38\uC2E0`:e.locality==="missing"?`${e.host} \xB7 \uD30C\uC77C \uC5C6\uC74C`:e.host;return c`<div class="detail-session-row">
    <button
      type="button"
      class="detail-session detail-session--session"
      data-session-key=${nc(e)}
      ?disabled=${n.length>0}
      title=${n}
      @click=${()=>{n.length===0&&t.onOpenSessionRef&&t.onOpenSessionRef(e)}}
    >
      <span class="detail-session__glyph">${e.current?"\u25D0":"\xB7"}</span>
      <span class="detail-session__id">${Es(e)}</span>
      <span class="detail-session__meta">${r}</span>
      <span class="detail-session__sid" title=${e.session_id}
        >${e.session_id.slice(0,8)}</span
      >
      <span class="detail-session__time">${Ks(e.last_event_at)}</span>
    </button>
    ${e.resume_command?c`<button
          type="button"
          class="op-btn detail-session__resume-cmd"
          title=${e.resume_command}
          @click=${o=>{o.stopPropagation(),t.onCopyResumeCommand&&e.resume_command&&t.onCopyResumeCommand(e.resume_command)}}
        >
          ⧉ 재개
        </button>`:""}
  </div>`}function $_(e,t={},n={},r=[]){let o=Array.isArray(e)?e:[],i=Array.isArray(r)?r:[],s=[...i.filter(g=>g&&g.current===!0),...i.filter(g=>g&&g.current!==!0).sort((g,C)=>C.index-g.index)],l=s.map(g=>Wk(g,t)),a=n.expanded||new Set,u=n.catalog||null;if(o.length===0&&s.length===0)return c`
      <div class="detail-section-label">세션 이력</div>
      <div class="detail-empty" data-seam="session-history">세션 이력 없음</div>
    `;let d=new Set;for(let g of o)g&&typeof g.resumed_from=="string"&&g.resumed_from.length>0&&d.add(g.resumed_from);let f=g=>{if(!(g.status==="failed"||g.status==="orphaned"))return"";let k=typeof g.session_id=="string"&&g.session_id.length>0,X=d.has(g.attempt_id),ae=k&&!X,H=k?X?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":"\uC774 \uC138\uC158\uC744 \uAC19\uC740 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C \uC774\uC5B4\uC11C \uC9C4\uD589":"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00";return c`<button
      type="button"
      class="op-btn detail-session__resume"
      data-attempt-id=${g.attempt_id}
      ?disabled=${!ae}
      title=${H}
      @click=${N=>{N.stopPropagation(),ae&&t.onResume&&t.onResume(g.attempt_id)}}
    >
      ↻ 이어하기
    </button>`},_=g=>{if(!(g.status==="failed"||g.status==="orphaned")||typeof g.cause!="string"||g.cause==="")return"";let k=g.cause_detail,X=k&&typeof k.reason=="string"&&k.reason.length>0?typeof k.command=="string"&&k.command.length>0?`${k.reason} \xB7 ${k.command}`:k.reason:g.cause;return c`<div class="detail-session__cause" title=${X}>
      ${g.cause}
    </div>`},y=g=>{let C=b_(gl(g,u));if(gn(C).length===0&&!Ao(g.usage))return"";let k=a.has(g.attempt_id);return c`<button
      type="button"
      class="detail-session__usage-toggle"
      data-attempt-id=${g.attempt_id}
      aria-expanded=${k?"true":"false"}
      title=${k?"\uD1A0\uD070 \uB0B4\uC5ED \uC811\uAE30":"\uD1A0\uD070 \uB0B4\uC5ED \uD3BC\uCE58\uAE30"}
      @click=${X=>{X.stopPropagation(),t.onToggleUsage&&t.onToggleUsage(g.attempt_id)}}
    >
      τ 자세히
    </button>`};return c`
    <div class="detail-section-label">
      세션 이력${Ik(n.total)}
    </div>
    <div class="detail-sessions" data-seam="session-history">
      ${l}${o.map(g=>{let C=gl(g,u),k=b_(C),X=gn(k);return c`<div class="detail-session-row">
          <button
            type="button"
            class="detail-session detail-session--${g.status||"unknown"}"
            data-attempt-id=${g.attempt_id}
            @click=${()=>t.onOpen&&t.onOpen(g.attempt_id)}
          >
            <span class="detail-session__glyph"
              >${Fk[g.status||""]||"\xB7"}</span
            >
            <span class="detail-session__id">${g.attempt_id}</span>
            ${ps(g)?c`<span
                  class="detail-session__resumed"
                  title=${ps(g)}
                  >↻</span
                >`:""}
            <span class="detail-session__meta">${Ln(g)}</span>
            ${X.length>0?c`<span class="detail-session__role">orchestrator</span>`:""}
            ${g.session_id?c`<span class="detail-session__sid" title=${g.session_id}
                  >${String(g.session_id).slice(0,8)}</span
                >`:""}
            ${X.length>0?X.map(ae=>c`<span
                      class="detail-session__usage"
                      title=${ae.tooltip}
                      >${ae.label}</span
                    >`):Ao(g.usage)?c`<span class="detail-session__usage"
                    >${Ao(g.usage)}</span
                  >`:""}
            <span class="detail-session__time">${Ks(g.started_at)}</span>
          </button>
          ${y(g)} ${f(g)} ${_(g)} ${Bk(g)}
          ${a.has(g.attempt_id)&&g.usage?jk(g.usage,g.runner==="codex"?"codex":"claude"):""}
          ${qk(g,C,t)}
        </div>`})}
    </div>
  `}function x_(e,t={}){return c`
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
          ${Hk(e)}
        </div>`:""}
  `}function Hk(e){let t=Wo(e);if(t)return t;let n=e.data;if(!n)return"";if(n.missing)return c`<div class="detail-prompt__missing">
        기록 없음 — 아직 이 이슈로 디스패치된 세션이 없습니다. 아래는 다음
        디스패치가 보낼 기본 과업입니다.
      </div>
      ${typeof n.default_task_prompt=="string"?br("\uC608\uC0C1 \uAE30\uBCF8 \uACFC\uC5C5",n.default_task_prompt):""}`;let r=xa(n.recorded_at);return c`<div class="detail-prompt__meta">
      ${n.attempt_id}${r?` \xB7 ${r}`:""}
    </div>
    ${typeof n.task_prompt=="string"?br("\uACFC\uC5C5 (user)",n.task_prompt):""}
    ${typeof n.system_prompt=="string"?br("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",n.system_prompt):""}`}var lo=10;function A_(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),n=r=>String(r).padStart(2,"0");return`${n(t.getMonth()+1)}-${n(t.getDate())} ${n(t.getHours())}:${n(t.getMinutes())}`}function S_(e,t={}){let r=(Array.isArray(e?.events)?e.events:[]).filter(l=>l&&typeof l.summary=="string"&&l.summary.trim().length>0);if(r.length===0)return"";let o=typeof e.shown=="number"&&e.shown>0?e.shown:lo,i=r.slice(0,o),s=r.length-i.length;return c`
    <div class="detail-section-label">Worker 이력 (${r.length})</div>
    <ol class="detail-timeline" data-seam="worker-timeline">
      ${i.map(l=>c`<li class="detail-timeline__row">
            ${A_(l.at)?c`<span class="detail-timeline__at"
                  >${A_(l.at)}</span
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
  `}var zk=["open","in_progress","deferred","resolved","closed"],Kk=[0,1,2,3,4];function E_(e,t){let n=t.issueStores,r=t.onClose,o=t.transport,i=t.onNavigate,s=t.queueStore,l=t.execPresetStore,a=t.sessionLogStore,u=null,d=null,f={},_="",y=!1,g=[],C=!1,k=!1,X={},ae={claude:null,codex:null},H=null,N=null,P=0,j=!1,B=!1,W="",T="",S="",I="",O=!1;function J(){j=!1,B=!1,W="",T="",S="",I="",O=!1}function ce(){ae={claude:null,codex:null},H=null,N=null,P+=1}async function Se(){if(!o)return null;try{let v=await Promise.resolve(o("get-workspace-accounts",{}));return v&&typeof v.state=="string"?v:null}catch{return null}}async function K(v){try{let q=await fetch(v);if(!q.ok)return null;let F=await q.json();if(!F||typeof F!="object"||!Array.isArray(F.accounts))return null;let we=F.accounts.filter(Ge=>Ge!==null&&typeof Ge=="object"&&!Array.isArray(Ge));return{accounts:we,active:we.find(Ge=>Ge.active===!0)||null}}catch{return null}}async function te(v){N=v;let q=++P,[F,we,Ge]=await Promise.all([K("/api/claude-usage"),K("/api/codex-usage"),Se()]);q!==P||v!==u||(ae={claude:F,codex:we},H=Ge,at())}let fe=[],Re=null,V=null,le=!1,ee="",M=!1,oe=0,se=new Set;function he(){fe=[],Re=null,V=null,le=!1,ee="",M=!1,oe+=1,se.clear()}async function xe(v){if(!o)return;let q=++oe;try{let F=await Promise.resolve(o("get-comments",{id:v}));if(q!==oe||v!==u)return;fe=Array.isArray(F)?F:[],le=!1}catch{if(q!==oe||v!==u)return;le=!0}at()}function Ze(){if(!o||!u)return;let v=d&&typeof d.comment_count=="number"?d.comment_count:null;if(Re!==u){Re=u,V=v,xe(u);return}v!==null&&v!==V&&(V=v,xe(u))}function G(v){se.has(v)?se.delete(v):se.add(v),at()}function ge(v){let q=ee.trim().length===0;ee=v,q!==(v.trim().length===0)&&at()}async function ue(){let v=ee.trim();if(!o||!u||v.length===0||M)return;let q=u;M=!0,at();let F=!1;try{let we=await Promise.resolve(o("add-comment",{id:q,text:v}));Array.isArray(we)&&we.length>0&&(F=!0,q===u&&(fe=we,le=!1,ee="",V=we.length))}catch{F=!1}F||ye("\uB313\uAE00 \uCD94\uAC00 \uC2E4\uD328","error"),q===u&&(M=!1),at()}let Q={onToggle:G,onDraftInput:ge,onSubmit:ue},Ee=t.mdViewer||null,be=null;Ee||(be=document.createElement("div"),be.className="md-viewer-root",document.body.appendChild(be));let Le=Ee||Ca(be,{getWorkspacePath:t.getWorkspacePath||(()=>"")}),qe=document.createElement("div");qe.className="session-log-root",document.body.appendChild(qe);let Je=Ho(qe,{transport:o?(v,q)=>Promise.resolve(o(v,q)):void 0,sessionLogStore:a}),He=!1,ie=!1,Z=!1,Oe=null,nt=null,pt=0;function Ye(v){return`${t.getWorkspacePath&&t.getWorkspacePath()||""}::${v}`}function _t(){He=!1,ie=!1,Z=!1,Oe=null,nt=null,pt+=1}async function Pt(v){if(!o)return;let q=++pt;ie=!0,Z=!1,at();try{let F=await Promise.resolve(o("get-bead-prompt",{bead_id:v}));if(q!==pt)return;!F||typeof F!="object"||Array.isArray(F)?Z=!0:(Oe=F,nt=Ye(v))}catch{q===pt&&(Z=!0)}finally{q===pt&&(ie=!1,at())}}let Et=[],rt=null,gt=0;function Zt(v,q){return`${t.getWorkspacePath&&t.getWorkspacePath()||""}::${v}::${q}`}function x(){Et=[],rt=null,gt+=1}async function re(v,q){if(!o)return;let F=++gt,we;try{we=await Promise.resolve(o("get-session-refs",{bead_id:v}))}catch{we=null}F!==gt||q!==rt||(Et=we&&Array.isArray(we.sessions)?we.sessions:[],at())}function Ne(){if(!o||!u)return;let v=d&&d.metadata,q=v&&typeof v=="object"&&typeof v.session_ref=="string"?v.session_ref:null;if(q===null){x();return}let F=Zt(u,q);rt!==F&&(Et=[],rt=F,re(u,F))}let Ce=[],je=[],We=lo,ct=null,It=0;function pe(v){return`${t.getWorkspacePath&&t.getWorkspacePath()||""}::${v}`}function $e(){Ce=[],je=[],We=lo,ct=null,It+=1}async function Qe(v,q){if(!o)return;let F=++It,we;try{we=await Promise.resolve(o("get-bead-timeline",{bead_id:v}))}catch{we=null}F!==It||q!==ct||(Ce=we&&Array.isArray(we.events)?we.events:[],je=we&&Array.isArray(we.attempts)?we.attempts:[],We=lo,at())}function ht(){if(!o||!u)return;let v=pe(u);ct!==v&&(Ce=[],je=[],We=lo,ct=v,Qe(u,v))}function st(){We+=lo,at()}function ut(){if(He=!He,He&&u&&nt!==Ye(u)){Oe=null,Pt(u);return}at()}function vt(){let v={};for(let F of je)F&&typeof F=="object"&&F.bead_id===u&&(v[String(F.attempt_id)]=F);let q=s?s.get():null;for(let F of q&&q.attempts?Object.values(q.attempts):[]){let we=F;we&&we.bead_id===u&&(v[String(we.attempt_id)]=we)}return v}function tt(){return u?Object.values(vt()).sort((q,F)=>(F.started_at||0)-(q.started_at||0)).map(q=>({attempt_id:q.attempt_id,bead_id:q.bead_id,status:q.status,started_at:typeof q.started_at=="number"?q.started_at:null,runner:q.runner||null,model:q.model||null,effort:q.effort||q.observed_effort||null,speed:q.speed||null,session_id:q.session_id||null,resumed_from:q.resumed_from||null,continuation_mode:q.continuation_mode||null,dismissed_at:typeof q.dismissed_at=="number"?q.dismissed_at:null,cause:typeof q.cause=="string"?q.cause:null,cause_detail:q.cause_detail||null,exec_default_preset_id:typeof q.exec_default_preset_id=="string"?q.exec_default_preset_id:null,exec_default_preset_revision:typeof q.exec_default_preset_revision=="number"?q.exec_default_preset_revision:null,exec_values:q.exec_values&&typeof q.exec_values=="object"?q.exec_values:null,usage:q.usage||null,usage_legs:Array.isArray(q.usage_legs)?q.usage_legs:[],delegation_sessions:Array.isArray(q.delegation_sessions)?q.delegation_sessions:[]})):[]}function Be(){return u?ur(vt(),u,xt()):null}let E=new Set;function U(v){E.has(v)?E.delete(v):E.add(v),at()}function z(v){let q=s?s.get():null,F=q&&q.attempts?q.attempts[v]:null;Je.open({attempt_id:v,meta:F?{runner:F.runner||void 0,model:F.model||void 0,effort:F.effort||void 0,status:F.status||void 0,session_id:F.session_id||void 0}:{}})}function ve(v,q){let F=s?s.get():null,we=F&&F.attempts?F.attempts[v]:null,ft=(we&&Array.isArray(we.delegation_sessions)?we.delegation_sessions:[]).find(Kt=>Kt&&typeof Kt=="object"&&Kt.launch_id===q);ft&&Je.open({attempt_id:v,launch_id:q,meta:{runner:ft.provider==="claude"?"claude":"codex",role:ft.role,...typeof ft.agent_type=="string"?{agent_type:ft.agent_type}:{},model:ft.model,effort:ft.effort,session_id:ft.session_id,status:ft.status}})}async function Ae(v){if(!o||!v)return;let q=o,F=()=>{let Ge=s?s.get():null;return Ge&&typeof Ge.revision=="number"?Ge.revision:0},we=s?.get()?.attempts?.[v]||null;await jo({context:{bead_id:we?.bead_id||u||"",kind:"session",tuple:we?Ln(we):""},transport:Ge=>q("worker-attempt-resume",{attempt_id:v,expected_revision:F(),...Ge}),adopt:Ge=>{Ge?.queue&&s?.set&&s.set(Ge.queue)}})}async function $t(v,q){if(!o||!v)return;let F=o,we=()=>{let St=s?s.get():null;return{bead_id:v,...q==="parallel"?{}:{lane:q},expected_revision:St&&typeof St.revision=="number"?St.revision:0}},Ge=St=>{St?.queue&&s?.set&&s.set(St.queue)},ft=await Promise.resolve(F("worker-queue-place",we()));if(Ge(ft),ft&&ft.conflict&&(ft=await Promise.resolve(F("worker-queue-place",we())),Ge(ft)),at(),!ft)return;if(ft.applied===!1&&typeof ft.admission_reason=="string"){ye(`\uB300\uAE30 \uC801\uC7AC \uAC70\uBD80: ${ft.admission_reason}`,"error",2400);return}if(ft.reason==="rejected"){ye("\uB300\uAE30 \uC801\uC7AC \uAC70\uBD80: rejected","error",2400);return}if(ft.applied===!1)return;let Kt=ft.queue?hs({id:v},ft.queue).location:null;Kt&&"index"in Kt&&ye(`${ip(Kt.lane)} \uB300\uAE30 #${Kt.index+1}\uC5D0 \uCD94\uAC00`,"success",2400)}function kt(v,q){if(q){k=!0,at();return}$t(v,"parallel")}function Ct(v,q){let Ge=(v.target?.closest?.(".worker-card__place-lane")||null)?.dataset.lane;Ge&&(Ge!=="parallel"&&!/^s[1-5]$/.test(Ge)||(k=!1,at(),$t(q,Ge)))}function jt(v){!v||!u||Je.open(Fo(v,u,d&&d.status))}let Wt={onOpen:z,onOpenDelegation:ve,onResume:Ae,onToggleUsage:U,onOpenSessionRef:jt,onCopyResumeCommand:Rt};function Qt(){let v=s?s.get():null,q={...X};for(let F of[...Bn,...Eo]){let we=v&&v[F];typeof we=="string"&&(q[F]=we)}return q}async function sn(){if(o){try{let v=await Promise.resolve(o("get-session-defaults",{}));X=v&&v.values&&typeof v.values=="object"?v.values:{}}catch{X={}}at()}}function xt(){let v=s?s.get():null;return v&&v.runner_catalog||null}function tn(){let v=s?s.get():null;return v&&typeof v.execution_defaults=="object"?v.execution_defaults:null}function pn(){let v=d?.metadata&&typeof d.metadata=="object"?d.metadata:{},F=In({pin:{...v,...f},global:Qt(),execution_defaults:tn(),runner_catalog:xt(),route:typeof v.route=="string"?v.route:null}).orchestration_model.value||"";return Un(xt(),F)}function Bt(){let v=l?l.get():null;return!v||typeof v.revision!="number"?null:{revision:v.revision,presets:Array.isArray(v.presets)?v.presets:[]}}function Gt(v){return v?.compatible===!1}function on(v){l&&v&&typeof v.revision=="number"&&Array.isArray(v.presets)&&l.set({revision:v.revision,presets:v.presets})}async function Ue(){let v=Bt(),q=v?.presets.find(F=>F.id===_);if(!(!o||!u||!v||!q||Gt(q)||y)){y=!0,g=[],at();try{let F=await Promise.resolve(o("apply-impl-preset",Wd(u,q.id,v.revision)));if(F&&F.conflict){on(F),ye("\uD504\uB9AC\uC14B\uC774 \uBCC0\uACBD\uB410\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uBAA9\uB85D\uC5D0\uC11C \uB2E4\uC2DC \uC801\uC6A9\uD558\uC138\uC694.","error",4e3);return}let we=F&&Array.isArray(F.issue)?F.issue[0]:F?.issue;if(F&&F.applied&&we&&typeof we=="object"){d=we,g=Array.isArray(F.skipped_orchestration_keys)?F.skipped_orchestration_keys.filter(Ge=>typeof Ge=="string"):[];for(let Ge of Hd)delete f[Ge];ye(g.length>0?"\uC2E4\uD589 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4. \uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 3\uD0A4\uB294 Bead\uC5D0 \uD540\uD560 \uC218 \uC5C6\uC5B4 \uAC74\uB108\uB6F0\uC5C8\uC2B5\uB2C8\uB2E4.":"\uC2E4\uD589 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4.","success",4e3);return}F&&F.error==="bd_readback_failed"?ye("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):ye("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}catch(F){F&&typeof F=="object"&&F.code==="bd_readback_failed"?ye("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):ye("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}finally{y=!1,at()}}}let L=null;n&&n.subscribe&&(L=n.subscribe(()=>ot()));let ke=null;s&&typeof s.subscribe=="function"&&(ke=s.subscribe(()=>{u&&at()}));let Me=null,At=null;function ze(){At&&(At(),At=null)}l&&typeof l.subscribe=="function"&&(Me=l.subscribe(()=>{u&&at()}));function Dt(v){v.key==="Escape"&&u&&(v.preventDefault(),r())}document.addEventListener("keydown",Dt);let Ut=Io(()=>at());Ut.attach();function ot(){if(u){if(n&&typeof n.snapshotFor=="function"){let v=n.snapshotFor("detail:"+u)||[];d=v.find(F=>F&&F.id===u)||v[0]||d}Ze(),Ne(),ht(),at()}}function Rt(v){$n(v).then(q=>{q?ye("\uBCF5\uC0AC\uB428","success",1200):ye("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function bn(v){v.preventDefault(),v.stopPropagation(),u&&Rt(u)}function Nt(v,q){v.preventDefault(),v.stopPropagation(),Rt(q)}function kn(v,q,F){v.preventDefault(),v.stopPropagation(),Le.open(q,{missing_state:F})}async function b(v,q){let F=Object.hasOwn(f,v),we=f[v];if(f[v]=q,at(),!(!o||!u))try{let Ge=await Promise.resolve(o("update-exec-settings",Ud(u,v,q.length===0?null:q))),ft=Array.isArray(Ge)?Ge[0]:Ge;if(!ft||typeof ft!="object"||!ft.id)throw new Error("exec settings readback failed");d=ft,delete f[v],at()}catch(Ge){throw F?f[v]=we:delete f[v],at(),ye("\uC2E4\uD589 \uC124\uC815 \uBCC0\uACBD \uC2E4\uD328","error"),Ge}}function p(v){v.catch(()=>{})}async function m(v,q){let F=d||{},we=F.metadata&&typeof F.metadata=="object"?F.metadata:{},Ge={};for(let St of["impl_runtime","impl_model","impl_effort"])Ge[St]=Object.hasOwn(f,St)?f[St]:typeof we[St]=="string"?we[St]:"";Ge[v]=q;let ft=Gd(Ge,xt(),pn()),Kt={};for(let St of["impl_runtime","impl_model","impl_effort"])Kt[St]=f[St],f[St]=ft[St]||"";if(at(),!(!o||!u))return Promise.resolve(o("update-impl-target",{id:u,...ft,orchestration_runtime:pn()})).then(St=>{let me=Array.isArray(St)?St[0]:St;if(!me||typeof me!="object"||!me.id)throw new Error("implementation target readback failed");d=me;for(let dt of["impl_runtime","impl_model","impl_effort"])delete f[dt];at()}).catch(St=>{for(let me of["impl_runtime","impl_model","impl_effort"])Kt[me]===void 0?delete f[me]:f[me]=Kt[me];throw at(),ye("\uAD6C\uD604 target \uBCC0\uACBD \uC2E4\uD328","error"),St})}async function w(v,q,F){if(!o||!u)return!1;try{let we=await Promise.resolve(o(v,q)),Ge=Array.isArray(we)?we[0]:we;return Ge&&typeof Ge=="object"&&Ge.id?(d=Ge,!0):(ye(F,"error"),!1)}catch(we){return we&&typeof we=="object"&&we.code==="bd_readback_failed"?(ye("\uC800\uC7A5\uB410\uC73C\uB098 \uD655\uC778 \uC2E4\uD328 \u2014 \uACE7 \uAC31\uC2E0\uB429\uB2C8\uB2E4","error"),{ok:!1,saved:!0}):(ye(Y(F,we),"error"),!1)}}function Y(v,q){let F=q&&typeof q=="object"&&typeof q.message=="string"?q.message.trim():"";return F.length>0?`${v} \u2014 ${F}`:v}function ne(v){setTimeout(()=>{try{let q=e.querySelector(v);q&&typeof q.focus=="function"&&q.focus()}catch{}},0)}function _e(){j=!0,W=d&&d.title||"",at(),ne('.detail-edit__input[data-edit="title"]')}function Pe(v){W=v.target.value}function wt(){j=!1,W="",at()}function Ke(){w("edit-text",{id:u,field:"title",value:W},"\uC81C\uBAA9 \uC800\uC7A5 \uC2E4\uD328").then(q=>{q===!0&&(j=!1,W=""),at()})}function bt(){B=!0,T=d&&d.description||"",at(),ne('.detail-edit__textarea[data-edit="description"]')}function Ot(v){T=v.target.value}function A(){B=!1,T="",at()}function R(){w("edit-text",{id:u,field:"description",value:T},"\uC124\uBA85 \uC800\uC7A5 \uC2E4\uD328").then(q=>{q===!0&&(B=!1,T=""),at()})}function Ie(v,q,F,we){if(v.key==="Escape"){v.stopPropagation(),F();return}v.key==="Enter"&&(!we||v.ctrlKey||v.metaKey)&&(v.preventDefault(),q())}function De(v){let q=v.target.value;w("update-status",{id:u,status:q},"\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328").then(()=>at())}function it(v){let q=Number(v.target.value);w("update-priority",{id:u,priority:q},"\uC6B0\uC120\uC21C\uC704 \uBCC0\uACBD \uC2E4\uD328").then(()=>at())}function yt(v){S=v.target.value}function nn(){let v=S.trim();v.length!==0&&w("label-add",{id:u,label:v},"\uB77C\uBCA8 \uCD94\uAC00 \uC2E4\uD328").then(q=>{q===!0&&(S=""),at()})}function Dn(v){if(v.key==="Escape"){v.stopPropagation(),S="",at();return}v.key==="Enter"&&(v.preventDefault(),nn())}function Nr(v){w("label-remove",{id:u,label:v},"\uB77C\uBCA8 \uC81C\uAC70 \uC2E4\uD328").then(()=>at())}let qr={onCopyPath:Nt,onOpenDoc:kn};function $(v){return typeof v=="string"?v:v&&typeof v=="object"?String(v.id||v.to||v.issue_id||v.depends_on||""):""}function h(v){return v&&typeof v=="object"?String(v.dependency_type||v.type||""):""}function D(v){switch(v){case"discovered-from":return{glyph:"\u21A9 ",relation:"\uBC1C\uACAC"};case"parent-child":return{glyph:"\u2338 ",relation:"\uC0C1\uC704"};case"related":return{glyph:"\u2194 ",relation:"\uAD00\uB828"};default:return v.length>0?{glyph:`${v} `,relation:v}:{glyph:"",relation:""}}}function de(v,q){let F=Te(q),we=[];return v.length>0&&we.push(v),F&&we.push(F),we.length>0?we.join(`
`):void 0}function Te(v){if(!v||typeof v!="object")return;let q=typeof v.status=="string"?v.status:"",F=typeof v.title=="string"?v.title:"";return q.length>0&&F.length>0?`${q} \xB7 ${F}`:void 0}function Fe(){return(t.getWorkspacePath&&t.getWorkspacePath()||"").trim()}function et(){return t.depCandidates?t.depCandidates():null}async function qt(v,q,F){let we=Fe(),Ge=u;if(!Ge)return;if(we.length===0){ye("\uB808\uD3EC\uB97C \uC54C \uC218 \uC5C6\uC5B4 \uC758\uC874\uC744 \uBC14\uAFC0 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error");return}let ft=await w(v,{a:Ge,b:q,view_id:Ge,root_dir:we},F),Kt=ft===!0||ft!==!1&&ft.saved===!0;Kt&&t.onDepChanged&&t.onDepChanged({type:v,a:Ge,b:q}),v==="dep-add"&&Kt&&(I="",O=!1),at()}function an(v){if(!u)return;let q=globalThis.confirm;typeof q=="function"&&!q(`${v}\uAC00 ${u}\uB97C \uB9C9\uB294 \uC5F0\uACB0\uC744 \uB04A\uC744\uAE4C\uC694?`)||qt("dep-remove",v,"\uC758\uC874 \uD574\uC81C \uC2E4\uD328")}function mt(v){v.disabled||mn(v.bead_id)}function mn(v){qt("dep-add",v,"\uC758\uC874 \uCD94\uAC00 \uC2E4\uD328")}function Tn(v,q){let F=I.trim();return!bf(F)||F===u||q.includes(F)||v.some(we=>we.bead_id===F)?null:F}function jr(v){I=v.target.value,O=!0,at()}function Yn(){O||(O=!0,at())}function rr(v,q,F){if(v.key==="Escape"){v.stopPropagation(),I="",O=!1,at();return}v.key==="Enter"&&(v.preventDefault(),q.length===1&&!q[0].disabled?mt(q[0]):F!==null&&mn(F))}function or(v,q){return c`<div class="detail-dep-add">
      <input
        class="detail-dep-add__input"
        aria-label="막는 이슈 추가"
        placeholder="막는 이슈 추가"
        .value=${I}
        @focus=${Yn}
        @input=${jr}
        @keydown=${F=>rr(F,v,q)}
      />
      ${O||I.length>0?c`<div class="detail-dep-add__list">
            ${v.length===0&&q===null?c`<div class="detail-dep-add__empty">후보 없음</div>`:v.map(F=>c`<button
                      type="button"
                      class="detail-dep-add__cand"
                      data-dep-cand=${F.bead_id}
                      ?disabled=${F.disabled}
                      title=${vn(F.reason)}
                      @click=${()=>mt(F)}
                    >
                      <span class="detail-dep-add__repo"
                        >${F.workspace_name}</span
                      >
                      <span class="detail-dep-add__id"
                        >${F.bead_id}</span
                      >
                      <span class="detail-dep-add__title"
                        >${F.title}</span
                      >
                    </button>`)}
            ${q===null?"":c`<button
                  type="button"
                  class="detail-dep-add__cand"
                  data-dep-cand=${q}
                  data-dep-direct="1"
                  @click=${()=>mn(q)}
                >
                  <span class="detail-dep-add__id">${q}</span>
                  <span class="detail-dep-add__title">직접 추가</span>
                </button>`}
          </div>`:""}
    </div>`}function sr(v,q){let F=q.get(v.id),we=i?c`<button
          type="button"
          class="detail-dep__link"
          title=${vn(v.title)}
          @click=${()=>F===void 0?i(v.id):i(v.id,F)}
        >
          ${v.label}
        </button>`:c`<span class="detail-dep__link" title=${vn(v.title)}
          >${v.label}</span
        >`;return c`<span
      class=${`detail-dep detail-dep--${v.kind}${i?" detail-dep--link":""}`}
      >${we}${v.kind==="pred"?c`<button
            type="button"
            class="detail-dep__unlink"
            data-dep-b=${v.id}
            aria-label=${"\uC758\uC874 \uD574\uC81C: "+v.id}
            @click=${()=>an(v.id)}
          >
            ✕
          </button>`:""}</span
    >`}function _n(v){let q=Array.isArray(v.dependencies)?v.dependencies:[],F=Array.isArray(v.dependents)?v.dependents:[],we=[];for(let me of q){let dt=$(me);dt.length>0&&h(me)==="blocks"&&we.push({id:dt,label:`\u26D3 ${dt}`,kind:"pred",title:de("\uB9C9\uB294",me)})}for(let me of F){let dt=$(me);dt.length>0&&h(me)==="blocks"&&we.push({id:dt,label:`\u2192 ${dt}`,kind:"succ",title:de("\uB9C9\uD788\uB294",me)})}for(let me of q){let dt=$(me),en=h(me);if(dt.length>0&&en!=="blocks"){let ln=D(en);we.push({id:dt,label:`${ln.glyph}${dt}`,kind:"other",title:de(ln.relation,me)})}}let Ge=et(),ft=new Map;if(Ge)for(let me of Ge.issues)ft.has(me.bead_id)||ft.set(me.bead_id,me.root_dir);let Kt=Ge&&u?hf(gf(u,Ge),I):[],St=Tn(Kt,we.filter(me=>me.kind==="pred").map(me=>me.id));return c`
      <div class="detail-section-label">의존성</div>
      ${we.length===0?c`<div class="detail-empty">의존성 없음</div>`:c`<div class="detail-deps">
            ${we.map(me=>sr(me,ft))}
          </div>`}
      ${Ge===null?c`<div class="detail-empty">후보를 불러올 수 없음</div>`:or(Kt,St)}
    `}function ir(v){let q=v.metadata||{},F=v.workflow||{},we=F.stages||{},Ge=we.spec&&we.spec.stale,ft=we.impl&&we.impl.stale,Kt=F.quick_fix_review?.state==="stale",St=we.plan||null,me=F.route_source==="derived",dt=F.route||q.route||"\u2014";return c`
      <div class="detail-section-label">워크플로우</div>
      <div class="detail-kv">
        <span class="detail-kv__k">route</span>
        <span
          class="detail-kv__v${me?" detail-kv__v--derived":""}"
          title=${me?"route \uBBF8\uD540 (metadata unset)":"route"}
          >${me?"unset":dt}</span
        >
      </div>
      ${F.route!=="quick_fix"||Object.hasOwn(q,"spec_review")?c`<div class="detail-kv">
            <span class="detail-kv__k">spec_review</span>
            <span class="detail-kv__v"
              >${q.spec_review||"\uC5C6\uC74C"}${Ge?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${F.route==="full_plan"?c`<div class="detail-kv">
              <span class="detail-kv__k">plan_review</span>
              <span class="detail-kv__v">${St?.receipt||"\uC5C6\uC74C"}</span>
            </div>
            <div class="detail-kv">
              <span class="detail-kv__k">plan_approval</span>
              <span class="detail-kv__v"
                >${St?.approval_receipt||"\uC5C6\uC74C"}${St?.approval_state==="stale"?" \xB7 stale":St?.approval_state==="unknown"?" \xB7 unknown":""}</span
              >
            </div>`:""}
      ${F.route!=="quick_fix"||Object.hasOwn(q,"impl_review")?c`<div class="detail-kv">
            <span class="detail-kv__k">impl_review</span>
            <span class="detail-kv__v"
              >${q.impl_review||"\uC5C6\uC74C"}${ft?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${F.resolver?c`<div class="detail-kv">
            <span class="detail-kv__k">↳ 충돌 해소</span>
            <span
              class="detail-kv__v detail-kv__v--resolver detail-kv__v--wrap"
              title=${`resolver-self:${F.resolver.attempt} \xB7 ${F.resolver.prior_sha} \u2192 ${F.resolver.sha}`}
              >${`${F.resolver.prior_sha.slice(0,7)} \u2192 ${F.resolver.sha.slice(0,7)}`}</span
            >
          </div>`:""}
      ${F.route==="quick_fix"||Object.hasOwn(q,"quick_fix_review")?c`<div class="detail-kv">
            <span class="detail-kv__k">quick_fix_review</span>
            <span class="detail-kv__v"
              >${q.quick_fix_review||"\uC5C6\uC74C"}${Kt?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${F.planned_execution?c`<div class="detail-kv">
              <span class="detail-kv__k">planned_execution</span>
              <span class="detail-kv__v">${F.planned_execution.kind}</span>
            </div>
            ${F.planned_execution.kind==="main"?c`<div class="detail-kv">
                  <span class="detail-kv__k">planned_execution_reason</span>
                  <span class="detail-kv__v detail-kv__v--wrap"
                    >${F.planned_execution.reason}</span
                  >
                </div>`:""}`:""}
      ${F.exec_receipt?c`<div class="detail-kv">
            <span class="detail-kv__k">exec_receipt</span>
            <span class="detail-kv__v detail-kv__v--wrap"
              >${lr(F.exec_receipt)}</span
            >
          </div>`:""}
      ${F.impl_entry?c`<div class="detail-kv">
            <span class="detail-kv__k">impl_entry</span>
            <span class="detail-kv__v"
              >${`${F.impl_entry.actor}@${F.impl_entry.sha}`}</span
            >
          </div>`:""}
      ${q.pr_url?c`<div class="detail-kv">
            <span class="detail-kv__k">pr_url</span>
            <span class="detail-kv__v detail-kv__v--wrap">${q.pr_url}</span>
          </div>`:""}
    `}let yr={route:["quick_fix","spec_backed","full_plan"]};async function vr(v,q){let F=q.target.value;if(v==="route"&&d&&d.metadata&&d.metadata.route==="full_plan"&&F!=="full_plan"&&!window.confirm(`full_plan \u2192 ${F||"(\uBBF8\uC124\uC815)"} \uC804\uD658: \uC800\uC7A5\uB41C plan \uC2B9\uC778\uC740 \uD3EC\uAE30\uB418\uBA70, plan \uD30C\uC77C\xB7\uB9C8\uCEE4 \uC815\uB9AC\uB294 \uC138\uC158 \uACC4\uC57D\uC774 \uC218\uD589\uD569\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`)){at();return}await w("update-workflow-meta",{id:u,key:v,value:F},"\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uBA54\uD0C0 \uBCC0\uACBD \uC2E4\uD328"),at()}function Fr(v){let q=v.metadata||{};return c` ${((we,Ge)=>{let ft=yr[we],Kt=typeof q[we]=="string"?q[we]:"";return c`<div class="detail-kv">
        <span class="detail-kv__k">${we}</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label=${we}
          data-edit=${`wfmeta-${we}`}
          @change=${St=>vr(we,St)}
        >
          <option value="" ?selected=${!ft.includes(Kt)}>
            ${Ge}
          </option>
          ${ft.map(St=>c`<option value=${St} ?selected=${Kt===St}>${St}</option>`)}
        </select>
      </div>`})("route","(unset)")} `}function Ve(v,q){return j?c`
        <div class="detail-edit">
          <input
            class="detail-edit__input"
            data-edit="title"
            aria-label="제목 편집"
            .value=${W}
            @input=${Pe}
            @keydown=${F=>Ie(F,Ke,wt,!1)}
          />
          <div class="detail-edit__actions">
            <button
              type="button"
              class="detail-edit__save"
              data-edit="title-save"
              @click=${Ke}
            >
              저장
            </button>
            <button
              type="button"
              class="detail-edit__cancel"
              data-edit="title-cancel"
              @click=${wt}
            >
              취소
            </button>
          </div>
        </div>
      `:c`
      <div class="detail-title-row">
        <h2 class="detail-overlay__title">${v}</h2>
        ${gn(q).map(F=>c`<span class="detail-usage-total" title=${F.tooltip}
              >${F.label}</span
            >`)}
        <button
          type="button"
          class="detail-edit-btn"
          data-edit="title"
          aria-label="제목 편집"
          @click=${_e}
        >
          ✎
        </button>
      </div>
    `}function Yt(v){let q=rn(v.created_at),F=rn(v.updated_at);return!q&&!F?c``:c`
      ${q?c`<div class="detail-kv">
            <span class="detail-kv__k">생성</span>
            <span class="detail-kv__v detail-kv__v--time">${q}</span>
          </div>`:""}
      ${F?c`<div class="detail-kv">
            <span class="detail-kv__k">수정</span>
            <span class="detail-kv__v detail-kv__v--time">${F}</span>
          </div>`:""}
    `}function On(v,q){return c`
      <div class="detail-section-label">속성 (수정 가능)</div>
      <div class="detail-kv">
        <span class="detail-kv__k">status</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label="status"
          data-edit="status"
          @change=${De}
        >
          ${zk.map(F=>c`<option value=${F} ?selected=${F===v}>${F}</option>`)}
        </select>
      </div>
      <div class="detail-kv">
        <span class="detail-kv__k">priority</span>
        <select
          class="detail-kv__v"
          aria-label="priority"
          data-edit="priority"
          @change=${it}
        >
          ${Kk.map(F=>c`<option value=${String(F)} ?selected=${F===q}>
                P${F}
              </option>`)}
        </select>
      </div>
    `}function Vo(v){return c`
      <div class="detail-title-row">
        <div class="detail-overlay__section-label">설명</div>
        ${B?"":c`<button
              type="button"
              class="detail-edit-btn"
              data-edit="description"
              aria-label="설명 편집"
              @click=${bt}
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
              .value=${T}
              @input=${Ot}
              @keydown=${q=>Ie(q,R,A,!0)}
            ></textarea>
            <div class="detail-edit__actions">
              <button
                type="button"
                class="detail-edit__save"
                data-edit="description-save"
                @click=${R}
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
    `}function Yo(v){let q=typeof v.notes=="string"?v.notes:"";return q.trim().length===0?c``:c`
      <div class="detail-overlay__section-label">노트</div>
      <div class="detail-overlay__notes">${q}</div>
    `}function Xs(v){let q=Array.isArray(v.labels)?v.labels:[];return c`
      <div class="detail-section-label">라벨</div>
      <div class="detail-labels">
        ${q.map(F=>c`<span class="detail-label-chip"
              >${F}<button
                type="button"
                class="detail-label-chip__x"
                data-label=${F}
                aria-label=${"\uB77C\uBCA8 \uC81C\uAC70: "+F}
                @click=${()=>Nr(F)}
              >
                ×
              </button></span
            >`)}
        <span class="detail-label-add">
          <input
            class="detail-label-add__input"
            aria-label="라벨 추가"
            placeholder="라벨 추가"
            .value=${S}
            @input=${yt}
            @keydown=${Dn}
          />
          <button
            type="button"
            class="detail-label-add__btn"
            @click=${nn}
          >
            추가
          </button>
        </span>
      </div>
    `}function Zs(){if(!u)return c``;let v=d||{},q=String(v.id||u),F=v.title||"(\uC81C\uBAA9 \uC5C6\uC74C)",we=Be(),Ge=v.status||"open",ft=typeof v.priority=="number"?Math.max(0,Math.min(4,v.priority)):"",Kt=v.description||"",St=s?s.get():null,me=St&&Ge!=="closed"?hs({...v,id:q},St):null,dt=St?bs(St):null,en={...v,metadata:{...v.metadata||{},...f}};return c`
      <div class="detail-overlay" role="dialog" aria-modal="true">
        <div class="detail-overlay__backdrop" @click=${()=>r()}></div>
        <div class="detail-overlay__panel">
          <div class="detail-overlay__bar">
            <button
              type="button"
              class="detail-overlay__id"
              title="ID 복사"
              @click=${bn}
            >
              ${q}
            </button>
            ${me?c`<button
                  type="button"
                  class="op-btn op-btn--primary detail-overlay__place"
                  data-bead-id=${q}
                  ?disabled=${!me.placeable}
                  title=${Zr(me)}
                  @click=${()=>kt(q,dt)}
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
          ${me&&k&&dt?c`<div
                class="place-menu detail-overlay__place-menu"
                @click=${ln=>Ct(ln,q)}
              >
                ${Dl(dt,q)}
                <button
                  type="button"
                  class="op-btn op-btn--icon worker-card__place-cancel"
                  data-bead-id=${q}
                  title="레인 선택 취소"
                  aria-label="레인 선택 취소"
                  @click=${()=>{k=!1,at()}}
                >
                  ✕
                </button>
              </div>`:""}
          ${Ve(F,we)}
          ${u_(en,{onChipToggle:ln=>Ut.toggle({bead_id:q,chip_key:ln}),isChipOpen:ln=>Ut.isOpen({bead_id:q,chip_key:ln})})}
          ${c_({metadata:en.metadata,workspace_values:Qt(),catalog:xt(),execution_defaults:tn(),expanded:C,presets:Bt()?.presets||[],preset_id:_,preset_busy:y,skipped_orchestration_keys:g},{onToggle:ln=>{C=ln,at()},onEdit:(ln,Js)=>{if(ln==="impl_runtime"||ln==="impl_model"||ln==="impl_effort"){p(m(ln,Js??""));return}p(b(ln,Js??""))},onPresetSelect:ln=>{_=ln,g=[],at()},onPresetApply:()=>{Ue()}})}
          ${g_({md:en.metadata,catalog:ae,workspace_defaults:H,handlers:{onExecChange:(ln,Js)=>p(b(ln,Js))}})}
          ${On(Ge,ft)} ${Yt(v)}
          ${Vo(Kt)}
          ${s_(fe,Q,{expanded:se,draft:ee,sending:M,error:le})}
          ${Yo(v)} ${Xs(v)} ${_n(v)}
          ${ir(v)} ${Fr(v)}
          ${t_(v,qr)}
          ${x_({expanded:He,loading:ie,error:Z,data:Oe},{onToggle:ut})}
          ${$_(tt(),Wt,{total:we,expanded:E,catalog:xt()},Et)}
          ${S_({events:Ce,shown:We},{onMore:st})}
        </div>
      </div>
    `}function at(){lt(Zs(),e)}return{load(v){v!==u&&(f={},k=!1,_="",g=[],C=!1,J(),he(),_t(),x(),$e(),ce()),u=v,d=null,!At&&t.subscribeCandidates&&(At=t.subscribeCandidates(()=>{u&&at()})),ot(),sn(),N!==v&&te(v)},clear(){u=null,d=null,f={},k=!1,_="",y=!1,g=[],C=!1,J(),he(),_t(),x(),$e(),ce(),ze(),Le.close(),Je.close(),lt(c``,e)},destroy(){L&&(L(),L=null),ke&&(ke(),ke=null),Me&&(Me(),Me=null),ze(),document.removeEventListener("keydown",Dt),Ut.detach(),Ee||(Le.destroy(),be&&be.parentNode&&be.parentNode.removeChild(be)),Je.destroy(),qe.parentNode&&qe.parentNode.removeChild(qe),u=null,d=null,ce(),_="",y=!1,g=[],he(),_t(),x(),$e(),lt(c``,e)}}}function T_(e){let t=document.createElement("dialog");t.id="fatal-error-dialog",t.setAttribute("role","alertdialog"),t.setAttribute("aria-modal","true"),t.innerHTML=`
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
    </div>`,e.appendChild(t);let n=t.querySelector("#fatal-error-title"),r=t.querySelector("#fatal-error-message"),o=t.querySelector("#fatal-error-detail"),i=t.querySelector("#fatal-error-reload"),s=t.querySelector("#fatal-error-close"),l=()=>{if(typeof t.close=="function")try{t.close()}catch{}t.removeAttribute("open")},a=(u,d,f="")=>{n&&(n.textContent=u||"Unexpected Error"),r&&(r.textContent=d||"An unrecoverable error occurred.");let _=typeof f=="string"?f.trim():"";if(o&&(_.length>0?(o.textContent=_,o.removeAttribute("hidden")):(o.textContent="No additional diagnostics available.",o.setAttribute("hidden",""))),typeof t.showModal=="function")try{t.showModal(),t.setAttribute("open","")}catch{t.setAttribute("open","")}else t.setAttribute("open","")};return i&&i.addEventListener("click",()=>{window.location.reload()}),s&&s.addEventListener("click",()=>l()),t.addEventListener("cancel",u=>{u.preventDefault(),l()}),{open:a,close:l,getElement(){return t}}}var Gk="(max-width: 640px)";function Oa(e){if(typeof window.matchMedia!="function")return e(!1),()=>{};let t=window.matchMedia(Gk),n=!!t.matches;e(n);let r=o=>{let s=!!(typeof o=="object"&&o!==null&&typeof o.matches=="boolean"?o.matches:t.matches);s!==n&&(n=s,e(s))};return typeof t.addEventListener=="function"?(t.addEventListener("change",r),()=>{t.removeEventListener("change",r)}):typeof t.addListener=="function"?(t.addListener(r),()=>{typeof t.removeListener=="function"&&t.removeListener(r)}):()=>{}}function Vk(){return{lanes:{done:!0},areas:{}}}function Gs(e){let t={};if(typeof e!="object"||e===null)return t;for(let[n,r]of Object.entries(e))typeof r=="boolean"&&(t[n]=r);return t}function Yk(e){try{let t=window.localStorage.getItem(e);if(!t)return null;let n=JSON.parse(t);if(typeof n!="object"||n===null)return null;let r=n;return typeof r.lanes=="object"&&r.lanes!==null?{lanes:Gs(r.lanes),areas:Gs(r.areas)}:{lanes:Gs(r),areas:{}}}catch{return null}}function C_(e,t){try{window.localStorage.setItem(e,JSON.stringify(t))}catch{}}function Ia(e,t=Vk()){let n={lanes:Gs(t.lanes),areas:Gs(t.areas)},r=Yk(e),o={lanes:{...n.lanes,...r?r.lanes:{}},areas:{...n.areas,...r?r.areas:{}}};return{isCollapsed(i){return o.lanes[i]===!0},isAreaCollapsed(i){return o.areas[i]===!0},toggle(i){let s=o.lanes[i]!==!0;return o={...o,lanes:{...o.lanes,[i]:s}},C_(e,o),s},toggleArea(i){let s=o.areas[i]!==!0;return o={...o,areas:{...o.areas,[i]:s}},C_(e,o),s}}}function qc(e){if(typeof e=="string"&&e.length>0)return e;if(e&&typeof e=="object"){let t=e;if(typeof t.message=="string"&&t.message.length>0)return t.message;if(typeof t.error=="string"&&t.error.length>0)return t.error;if(t.error&&typeof t.error=="object"&&typeof t.error.message=="string")return t.error.message}return"\uC694\uCCAD\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4"}function La(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"&&t.length>0):[]}function Da(e){let{transport:t,console_el:n,getLanes:r,getWorkspaces:o,getCrossLanes:i,reproject:s,onCorrection:l,showToast:a,requestRender:u,adoptQueue:d,onDragBegin:f,candidate_drop:_}=e,y=[],g=null,C=!1,k=null,X=null,ae=null;function H(){k!==null&&clearTimeout(k),k=setTimeout(()=>{k=null,C=!1},0)}function N(){return i()??null}function P(){let G=new Map,ge=o();for(let ue of Array.isArray(ge)?ge:[]){if(!ue||typeof ue!="object")continue;let Q=ue.bead_blocked_by&&typeof ue.bead_blocked_by=="object"?ue.bead_blocked_by:{};for(let[Ee,be]of Object.entries(Q))Array.isArray(be)&&G.set(Ee,La(be));for(let Ee of[...Array.isArray(ue.runnable)?ue.runnable:[],...Array.isArray(ue.session_active)?ue.session_active:[]])Ee&&typeof Ee.bead_id=="string"&&Array.isArray(Ee.blocked_by)&&Ee.blocked_by.length>0&&G.set(Ee.bead_id,La(Ee.blocked_by))}return G}function j(){let G=new Map,ge=new Map,ue=o();for(let Q of Array.isArray(ue)?ue:[]){if(!Q||typeof Q!="object")continue;let Ee=Q.bead_blocked_by&&typeof Q.bead_blocked_by=="object"?Q.bead_blocked_by:{};for(let[be,Le]of Object.entries(Ee))Array.isArray(Le)&&G.set(be,La(Le));for(let be of Array.isArray(Q.runnable)?Q.runnable:[])be&&typeof be.bead_id=="string"&&Array.isArray(be.blocked_by)&&ge.set(be.bead_id,La(be.blocked_by))}for(let Q of y)for(let Ee of[G,ge]){let be=Ee.get(Q.a);be!==void 0&&Ee.set(Q.a,Q.type==="dep-remove"?be.filter(Le=>Le!==Q.b):be.includes(Q.b)?be:[...be,Q.b])}return{snapshot:G,runnable:ge}}function B(){let G=P();for(let ge of y){let ue=(G.get(ge.a)||[]).slice();ge.type==="dep-remove"?G.set(ge.a,ue.filter(Q=>Q!==ge.b)):ue.includes(ge.b)||G.set(ge.a,[...ue,ge.b])}return G}function W(G=r(),ge=N()){let ue=new Map;for(let He of Array.isArray(ge?.lanes)?ge.lanes:[]){let ie=new Map;for(let Z of Array.isArray(He?.entries)?He.entries:[])Z&&typeof Z.bead_id=="string"&&ie.set(Z.bead_id,Z.dep_created_by_lane===!0);ue.set(typeof He?.id=="string"?He.id:"",ie)}let Q=new Map,Ee=new Map,be=new Set,Le=new Set;for(let He of G.chain_lanes){let ie=ue.get(He.lane_id);Q.set(He.lane_id,{status:He.status,entries:He.rows.map((Z,Oe)=>({bead_id:Z.id,root_dir:Z.root_dir,...Oe===0?{}:{dep_created_by_lane:ie?.get(Z.id)===!0}}))});for(let Z of He.rows)Ee.set(Z.id,He.lane_id),Z.fixed&&be.add(Z.id),Z.unplaced||Le.add(Z.id)}let qe=new Map;for(let He of G.parallel_rows)typeof He.queue_index=="number"&&qe.set(He.id,He.queue_index);for(let He of G.queue_groups)for(let ie of He.sublanes.serial)for(let Z of ie.items)typeof Z.queue_index=="number"&&qe.set(Z.id,Z.queue_index);let Je=j();return{blocked_by_map:B(),snapshot_blocked_by:Je.snapshot,runnable_blocked_by:Je.runnable,owner_of:new Map(Object.entries(G.owner_of)),cross_lanes:Q,owner_lane_of:Ee,fixed_members:be,placed_members:Le,parallel_rows:G.parallel_rows.map(He=>({bead_id:He.id,root_dir:He.root_dir,queue_index:He.queue_index??0})),parallel_raw_length:new Map(Object.entries(G.parallel_raw_length)),queue_index_of:qe}}function T(G,ge){let ue=r();for(let Ee of[...ue.runnable,...ue.queue,...ue.running,...ue.pr_wait,...ue.done])if(!(Ee.non_occupying||Ee.id!==ge)){if(Ee.root_dir===G)return Ee.expected_revision;break}let Q=ue.queue_groups.find(Ee=>Ee.root_dir===G);return Q?Q.revision:0}async function S(G,ge,ue,Q){if(!t)return null;let be=await t(G,{...ge,...ue?{root_dir:ue}:{},expected_revision:Q});if(be&&be.conflict){be.queue&&d?.(ue,be.queue);let Le=be.queue&&typeof be.queue.revision=="number"?be.queue.revision:Q;be=await t(G,{...ge,...ue?{root_dir:ue}:{},expected_revision:Le})}return be&&be.queue&&d?.(ue,be.queue),be}async function I(G,ge,ue,Q,Ee){try{let be=await S(G,ge,ue,Q.get(ue)??T(ue,Ee.bead_id));return!be||typeof be.applied!="boolean"?(a("\uD050 \uC694\uCCAD\uC774 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error"),null):(be.queue&&typeof be.queue.revision=="number"&&Q.set(ue,be.queue.revision),be.conflict?(a("\uD050\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD574 \uC8FC\uC138\uC694","error"),null):be.applied===!1?(a(be.admission_reason?`\uD050 \uC801\uC7AC \uAC70\uBD80: ${be.admission_reason}`:"\uD050 \uC694\uCCAD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4","error"),null):be.queue&&typeof be.queue.revision=="number"?be.queue.revision:Q.get(ue)??0)}catch(be){return a(qc(be),"error"),null}}async function O(G,ge,ue=new Map){if(G.type==="worker-queue-disarm"){try{let Q=await S(G.type,G.payload,G.root_dir,ue.get(G.root_dir)??T(G.root_dir,ge));Q&&Q.queue&&typeof Q.queue.revision=="number"&&ue.set(G.root_dir,Q.queue.revision)}catch{}return!0}if(G.type==="worker-queue-place"||G.type==="worker-queue-reorder"||G.type==="worker-queue-remove")return await I(G.type,G.payload,G.root_dir,ue,{bead_id:ge})!==null;try{return(G.type==="dep-add"||G.type==="dep-remove")&&t&&await t(G.type,{a:G.a,b:G.b,...G.root_dir?{root_dir:G.root_dir}:{}}),!0}catch(Q){return a(qc(Q),"error"),!1}}function J(G){(G.type==="dep-add"||G.type==="dep-remove")&&(y=[...y,{type:G.type,a:G.a,b:G.b}])}async function ce(G,ge){if(!t)return{ok:!1};try{let ue=await t(G.type,{...G.payload,expected_revision:ge});return!ue||typeof ue.revision!="number"?(a("\uC5F0\uACB0 \uB808\uC778 \uC751\uB2F5\uC5D0 revision\uC774 \uC5C6\uC2B5\uB2C8\uB2E4","error"),{ok:!1}):{ok:!0,revision:ue.revision}}catch(ue){let Q=ue,Ee=Q&&Q.code==="conflict"?Q.details?.cross_lanes:null;return Ee&&typeof Ee.revision=="number"&&Array.isArray(Ee.lanes)?{ok:!1,conflict:Ee}:(a(qc(ue),"error"),{ok:!1})}}async function Se(G,ge,ue){let Q=new Map,Ee=[],be=G.ops.slice(0,G.lane_op_index),Le=G.ops.slice(G.lane_op_index);for(let Je of be){if(!await O(Je,ue,Q))return{done:!0};J(Je)}let qe=ge;for(let Je of G.lane_ops){if(qe===null)return a("\uC5F0\uACB0 \uB808\uC778 \uC800\uC7A5\uC18C\uB97C \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error"),{done:!0};let He=await ce(Je,qe);if(!He.ok)return He.conflict?{done:!1,conflict:He.conflict}:{done:!0};qe=He.revision}for(let Je of Le){if(!await O(Je,ue,Q))return{done:!0};J(Je),Je.type==="dep-add"&&Ee.push(Je)}for(let Je of _f(Ee))qe=await K(Je,qe);return{done:!0}}async function K(G,ge){if(ge===null||!t)return ge;let ue=G.pairs,Q=ge;for(let Ee=0;Ee<2;Ee+=1){if(ue.length===0)return Q;try{let be=await t("monitor-lane-provenance",{lane_id:G.lane_id,pairs:ue.map(Le=>({bead_id:Le.bead_id,after:Le.after,value:!0})),expected_revision:Q});return be&&typeof be.revision=="number"?be.revision:Q}catch(be){let Le=be,qe=Le&&Le.code==="conflict"?Le.details?.cross_lanes:null;if(!qe||typeof qe.revision!="number"||!Array.isArray(qe.lanes))return Q;let Je=qe.lanes.find(He=>He&&He.id===G.lane_id);ue=mf(Array.isArray(Je?.entries)?Je.entries:[],ue),Q=qe.revision}}return Q}async function te(G,ge,ue=[]){y=ue,l("",0);let Q=r(),Ee=N();for(let be=0;;be+=1){let Le=G(W(Q,Ee));if("refused"in Le){a(Le.refused,"error");break}let qe=await Se(Le,Q.cross_lanes_revision,ge);if(qe.done){Le.correction&&l(Le.correction.lane_id,Le.correction.corrected);break}if(be>=1){a("\uB808\uC778\uC774 \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4","error");break}let Je=s(qe.conflict);Q=Je.lanes,Ee=Je.raw_lanes}y=[],u()}async function fe(G,ge){await te(ue=>pa(G,ge,ue),G.bead_id)}function Re(G,ge){let ue=ge&&typeof ge.closest=="function"?ge.closest("[data-row-index]"):null;if(ue&&G.contains(ue)){let Q=Number(ue.getAttribute("data-row-index"));return Number.isFinite(Q)?Q:0}return G.querySelectorAll("[data-row-index]").length}function V(G){let ge=typeof G?.closest=="function"?G.closest(".worker-pane--collapsed[data-lane]"):null;if(!ge)return null;let ue=ge.getAttribute("data-lane");return ue==="queue"?{zone:ge,target:{kind:"parallel",marker_index:r().parallel_rows.length}}:ue==="candidate"&&_===!0?{zone:ge,target:{kind:"candidate"}}:null}function le(G){let ge=G.target;if(!g)return null;let ue=typeof ge?.closest=="function"?ge.closest("[data-drop]"):null;if(!ue)return V(ge);let Q=ue.getAttribute("data-drop");if(Q==="candidate")return{zone:ue,target:{kind:"candidate"}};if(Q==="parallel")return{zone:ue,target:{kind:"parallel",marker_index:Re(ue,ge)}};if(Q==="chain")return{zone:ue,target:{kind:"chain",lane_id:ue.getAttribute("data-lane-id")||"",marker_index:Re(ue,ge)}};if(Q==="repo-serial"){let Ee=ue.getAttribute("data-root-dir")||"";if(Ee!==g.root_dir)return null;let be=typeof ge?.closest=="function"?ge.closest("[data-queue-index]"):null,Le=be&&ue.contains(be)?be.getAttribute("data-queue-index"):ue.getAttribute("data-lane-length"),qe=Number(Le);return{zone:ue,target:{kind:"repo-serial",root_dir:Ee,lane_id:ue.getAttribute("data-lane-id")||"",index:Number.isFinite(qe)?qe:0}}}return null}function ee(){for(let G of Array.from(n.querySelectorAll(".is-drop-over")))G.classList.remove("is-drop-over")}function M(G){X=G.target instanceof Element?G.target:null}function oe(G){let ge=G.target,ue=typeof ge?.closest=="function"?ge.closest('[draggable="true"][data-bead-id]'):null,Q=ue?ue.closest("[data-drag-kind]"):null;if(!Q)return;if(ue&&X&&ue.contains(X)&&typeof X.closest=="function"&&X.closest("input, button, a")){G.preventDefault();return}let Ee=Q.getAttribute("data-bead-id")||"",be=Q.getAttribute("data-drag-kind")||"",Le=Q.getAttribute("data-root-dir")||"";if(!Ee||!be)return;let qe=Q.getAttribute("data-queue-index")||"",Je=Number(qe),He=Q.getAttribute("data-lane-id")||"";g={kind:be,bead_id:Ee,root_dir:Le,...qe!==""&&Number.isFinite(Je)?{queue_index:Je}:{},...He?{lane_id:He}:{}},C=!0,f?.(),n.classList.add("is-dragging");try{G.dataTransfer?.setData("text/plain",Ee),G.dataTransfer&&(G.dataTransfer.effectAllowed="move")}catch{}}function se(G){let ge=le(G);ge&&(G.preventDefault(),G.dataTransfer&&(G.dataTransfer.dropEffect="move"),ge.zone.classList.add("is-drop-over"))}function he(G){let ge=G.target;typeof ge?.closest=="function"&&(ge.closest("[data-drop]")?.classList.remove("is-drop-over"),ge.closest(".worker-pane--collapsed")?.classList.remove("is-drop-over"))}function xe(){g=null,ee(),n.classList.remove("is-dragging"),H()}function Ze(G){let ge=le(G),ue=g;g=null,ee(),n.classList.remove("is-dragging"),!(!ge||!ue)&&(G.preventDefault(),fe(ue,ge.target))}return{attach(G){ae||(ae=G,G.addEventListener("pointerdown",M),G.addEventListener("dragstart",oe),G.addEventListener("dragover",se),G.addEventListener("dragleave",he),G.addEventListener("drop",Ze),G.addEventListener("dragend",xe))},detach(){k!==null&&(clearTimeout(k),k=null);let G=ae;ae=null,G&&(G.removeEventListener("pointerdown",M),G.removeEventListener("dragstart",oe),G.removeEventListener("dragover",se),G.removeEventListener("dragleave",he),G.removeEventListener("drop",Ze),G.removeEventListener("dragend",xe))},isDragging(){return g!==null},consumeClickSuppression(){let G=C;return C=!1,G},applyDrop:fe,runPlanned:te,dropModel:W,sendOp:O,sendQueueCas:I,rememberDep:J}}function dn(e){return e&&typeof e=="object"?e:{}}function Qk(e,t){for(let n of Object.values(dn(t.provider_hold)))for(let r of Array.isArray(n?.targets)?n.targets:[])if(Array.isArray(r?.attempt_ids)&&r.attempt_ids.includes(e))return r;return null}function Xk(e){if(e?.status!=="ok")return{eligible:!1,reason:`\uACC4\uC815 \uC0C1\uD0DC ${String(e?.status||"\uBBF8\uC0C1")}`};let t=Array.isArray(e.windows)?e.windows:[],n=t.find(o=>o?.key==="5h"),r=t.find(o=>o?.key==="7d");if(!n||typeof n.pct!="number")return{eligible:!1,reason:"5\uC2DC\uAC04 \uC0AC\uC6A9\uB7C9 \uBBF8\uAD00\uCE21"};if(n.pct>80)return{eligible:!1,reason:"5\uC2DC\uAC04 \uC0AC\uC6A9\uB7C9 80% \uCD08\uACFC"};if(r){if(typeof r.pct!="number")return{eligible:!1,reason:"7\uC77C \uC0AC\uC6A9\uB7C9 \uBBF8\uAD00\uCE21"};if(r.pct>90)return{eligible:!1,reason:"7\uC77C \uC0AC\uC6A9\uB7C9 90% \uCD08\uACFC"}}return{eligible:!0,reason:""}}function Pa(e,t){let n=dn(dn(t).attempts)[e];if(!n)return null;let r=dn(dn(t).runner_catalog),o=dn(r.runners),i=typeof n.runner=="string"&&o[n.runner]?n.runner:Object.keys(o)[0]||"",s=dn(o[i]),l=dn(s.models),a=typeof n.model=="string"&&l[n.model]?n.model:typeof s.default_model=="string"?s.default_model:Object.keys(l)[0]||"",u=Qk(e,dn(t)),d=typeof n.claude_account=="string"?n.claude_account:typeof u?.account=="string"?u.account:"";return{attempt_id:e,original_runner:i,runner:i,model:a,account:d,fresh_current:!1}}function Ma(e,t,n){if(!e||!t||typeof t.closest!="function")return null;let r=t.closest(".provider-resume-dialog__runner");if(r){let l=dn(dn(dn(n).runner_catalog).runners),a=dn(l[r.value]),u=Object.keys(dn(a.models));return{...e,runner:r.value,model:typeof a.default_model=="string"?a.default_model:u[0]||""}}let o=t.closest(".provider-resume-dialog__model");if(o){try{let[l,a]=JSON.parse(o.value);if(typeof l=="string"&&typeof a=="string")return{...e,runner:l,model:a}}catch{}return e}let i=t.closest(".provider-resume-dialog__account");if(i)return{...e,account:i.value};let s=t.closest(".provider-resume-dialog__fresh-input");return s?{...e,fresh_current:s.checked}:null}function Na(e){if(!e||!e.runner||!e.model||e.runner==="claude"&&!e.account)return null;let t={runner:e.runner,model:e.model};e.runner==="claude"&&e.account&&(t.claude_account=e.account);let n=e.fresh_current||e.runner!==e.original_runner;return{attempt_id:e.attempt_id,payload:{exec_override:t,...n?{continuation:"fresh_current",decision_token:{}}:{}}}}function Ko(e,t){if(!e)return"";let n=dn(dn(dn(t).runner_catalog).runners),r=dn(dn(t).account_catalog),o=Array.isArray(r.claude)?r.claude:[],i=e.runner!==e.original_runner;return c`<dialog
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
                ${Object.keys(dn(l?.models)).map(a=>c`<option
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
              ${o.map(s=>{let l=Xk(s),a=s.alias||s.email;return c`<option
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
  </dialog>`}function qa(e){let t=e?.querySelector?.(".provider-resume-dialog")||null;!t||t.open||(typeof t.showModal=="function"?t.showModal():t.setAttribute("open",""))}var jc=Object.freeze({repo_ops_worktree_unowned:"\uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC\uAC00 \uC544\uC9C1 Worker \uC18C\uC720\uAC00 \uC544\uB2C8\uC5B4\uC11C \uC2A4\uD06C\uB9BD\uD2B8 \uC2E4\uD589 \uC804\uC5D0 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4.",verify_cmd_failed:"\uBA38\uC9C0 \uD6C4 \uAC80\uC99D \uBA85\uB839\uC774 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",gh_observation_failed:"GitHub\uC5D0\uC11C PR \uC0C1\uD0DC\uB97C \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",verify_script_failure:"\uAC80\uC99D \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",deploy_script_failure:"\uBC30\uD3EC \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",interrupted_without_terminal_exit:"\uC791\uC5C5\uC774 \uC885\uB8CC \uAE30\uB85D \uC5C6\uC774 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4.",manual_target_missing:"\uC218\uB3D9 \uBC30\uD3EC \uAE30\uB85D\uC5D0 \uD540\uB41C \uB300\uC0C1 SHA\uAC00 \uC5C6\uC5B4 \uC2E4\uD589\uD558\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4.",bootstrap_not_approved:"\uCCAB [deploy] \uC120\uC5B8\uC740 \uC0AC\uB78C \uC2B9\uC778 \uC5C6\uC774 \uC2E4\uD589\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4. Worker \uC124\uC815\uC758 [\uBC30\uD3EC \uC2E4\uD589]\uC73C\uB85C \uC6D0\uACA9 base tip\uC744 \uD55C \uBC88 \uBC30\uD3EC\uD55C \uB4A4 [\uC815\uC0B0 \uC7AC\uAC1C]\uB97C \uB204\uB974\uC138\uC694 \u2014 \uADF8 \uB4A4 \uBA38\uC9C0\uBD80\uD130\uB294 \uC790\uB3D9 \uBC30\uD3EC\uB429\uB2C8\uB2E4.",base_unresolved:"PR\uC774 \uC5B4\uB290 base \uBE0C\uB79C\uCE58\uB85C \uBA38\uC9C0\uB418\uB294\uC9C0 \uD655\uC815\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_ref_unobserved:"PR\uC758 base \uBE0C\uB79C\uCE58\uB97C \uC544\uC9C1 \uAD00\uCE21\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",merge_sha_unobserved:"\uBA38\uC9C0 \uCEE4\uBC0B SHA\uB97C \uC544\uC9C1 \uAD00\uCE21\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_fetch_failed:"\uC6D0\uACA9 base \uBE0C\uB79C\uCE58\uB97C fetch\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_rev_unavailable:"fetch\uD55C \uC6D0\uACA9 base \uBE0C\uB79C\uCE58\uC758 \uCEE4\uBC0B\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_ff_diverged:"\uB85C\uCEEC base \uBE0C\uB79C\uCE58\uAC00 \uC6D0\uACA9\uACFC \uAC08\uB77C\uC838 fast-forward\uB85C \uC815\uB82C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",deployment_target_not_covering_merge:"\uBC30\uD3EC \uB300\uC0C1 base\uAC00 \uC774 \uBA38\uC9C0 \uCEE4\uBC0B\uC744 \uD3EC\uD568\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.",deployment_candidate_ancestry_check_failed:"\uBC30\uD3EC \uB300\uC0C1 base\uAC00 \uC774 \uBA38\uC9C0 \uCEE4\uBC0B\uC744 \uD3EC\uD568\uD558\uB294\uC9C0 \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",verify_red:"\uBA38\uC9C0 \uD6C4 \uAC80\uC99D\uC774 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",cleanup_failed:"\uBA38\uC9C0 \uD6C4 \uC815\uB9AC\uAC00 \uB05D\uB098\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",retry_exhausted:"\uC790\uB3D9 \uC7AC\uC2DC\uB3C4\uB97C \uBAA8\uB450 \uC4F0\uACE0\uB3C4 \uAC19\uC740 \uC2E4\uD328\uAC00 \uC774\uC5B4\uC84C\uC2B5\uB2C8\uB2E4.",conflict_unresolved:"\uCDA9\uB3CC \uD574\uC18C\uAC00 \uB05D\uB098\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",internal_record_failed:"Worker \uB0B4\uBD80 \uAE30\uB85D\uC774 \uC2E4\uD328\uD574 \uC9C4\uD589\uC744 \uBA48\uCDC4\uC2B5\uB2C8\uB2E4.",foreign_landing_unpinned:"\uB2E4\uB978 \uC800\uC7A5\uC18C \uCC29\uC9C0\uC778\uB370 foreign_repo\xB7foreign_path\xB7foreign_base \uD540\uC774 \uC5C6\uAC70\uB098 \uD615\uC2DD\uC774 \uD2C0\uB9BD\uB2C8\uB2E4.",foreign_checkout_unavailable:"\uD540\uB41C \uB300\uC0C1 \uC800\uC7A5\uC18C \uCCB4\uD06C\uC544\uC6C3\uC774 \uC5C6\uAC70\uB098 foreign_repo\uC640 \uAC19\uC740 URL\uC758 remote\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4.",foreign_deploy_unsupported:"\uB300\uC0C1 \uC800\uC7A5\uC18C\uAC00 [deploy]\uB97C \uC120\uC5B8\uD574 Worker\uAC00 \uBC30\uD3EC \uC99D\uAC70\uB97C \uB9CC\uB4E4 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4. \uC138\uC158\uC774 \uBC30\uD3EC\uC640 \uB9C8\uAC10\uC744 \uC18C\uC720\uD569\uB2C8\uB2E4.",repair_lane_retired:"\uC790\uB3D9 \uC218\uB9AC \uB808\uC778\uC774 \uC740\uD1F4\uD574 \uC0AC\uB78C \uCC98\uB9AC\uB85C \uB118\uC5B4\uC654\uC2B5\uB2C8\uB2E4."});var R_={verify_failed:"\uAC80\uC99D \uC2E4\uD328",verify_cmd_failed:"\uAC80\uC99D \uC2E4\uD328",verify_script_failure:"\uAC80\uC99D \uC2E4\uD328",deploy_failed:"\uBC30\uD3EC \uC2E4\uD328",deploy_script_failure:"\uBC30\uD3EC \uC2E4\uD328",job_script_failure:"\uC7A1 \uC2E4\uD328",interrupted_without_terminal_exit:"\uC911\uB2E8\uB428",quickfix_landing_failed:"\uCC29\uC9C0 \uC2E4\uD328",runner_exit:"\uC138\uC158 \uC2E4\uD328",session_parked:"\uC138\uC158 \uB300\uAE30",session_ended_unresolved:"\uC138\uC158 \uC885\uB8CC",prerequisite_unmet:"\uC120\uD589 \uB300\uAE30",delivery_unproven:"\uCC29\uC9C0 \uC99D\uAC70 \uBD80\uC871"},O_={overloaded_529:"Claude API \uACFC\uBD80\uD558(529)\uB85C \uBCF4\uB958",rate_limited_429:"Claude API \uC694\uCCAD \uD55C\uB3C4(429)\uB85C \uBCF4\uB958"},I_={"session_hard_stop:failure":"\uC138\uC158\uC774 \uC2E4\uD328\uB97C \uBCF4\uACE0\uD558\uACE0 \uC885\uB8CC","session_hard_stop:environment":"\uC138\uC158\uC774 \uD658\uACBD \uC624\uB958\uB97C \uBCF4\uACE0\uD558\uACE0 \uC885\uB8CC","resume_failed:transcript_missing":"\uC774\uC5B4\uD558\uAE30 \uB300\uC0C1 \uC138\uC158 \uAE30\uB85D\uC774 \uC5C6\uC74C \u2014 \uC0C8 \uC138\uC158\uC73C\uB85C \uB300\uCCB4"};function Zk(e){return typeof e!="number"||!Number.isFinite(e)?"":new Date(e).toLocaleTimeString("ko-KR",{hour:"2-digit",minute:"2-digit"})}function Jk(e,t){if(typeof e!="string"||!e.startsWith("provider_outage:"))return null;let n=e.slice(16);if(n==="usage_limit"){let o=t&&typeof t=="object"?t.resets_at:null,i=Zk(o);return i?`\uACC4\uC815 \uC0AC\uC6A9 \uD55C\uB3C4\uB85C \uBCF4\uB958 \u2014 \uB9AC\uC14B ${i}`:"\uACC4\uC815 \uC0AC\uC6A9 \uD55C\uB3C4\uB85C \uBCF4\uB958"}if(Object.hasOwn(O_,n))return O_[n];let r=/^http_(5\d\d)$/.exec(n);return r?`Claude API \uC624\uB958(${r[1]})\uB85C \uBCF4\uB958`:null}function Fa(e){return typeof e!="string"||e.length===0?[]:e.split(":").filter(t=>t.length>0)}function ja(e){for(let t of Fa(e)){if(Object.hasOwn(R_,t))return R_[t];if(t.startsWith("session_"))return"\uC138\uC158 \uC2E4\uD328"}return null}function D_(e){return Fa(e).length===0?null:ja(e)||"\uC2E4\uD328"}function co(e){let t=null;for(let n of Fa(e))Object.hasOwn(jc,n)&&(t=jc[n]);return t}function Lr(e,t){if(typeof e=="string"&&Object.hasOwn(I_,e))return I_[e];let n=Jk(e,t);if(n!==null)return n;let r=ja(e),o=co(e);return r&&o?`${r} \u2014 ${o}`:r||o?r||o:typeof e=="string"?e:""}function P_(e,t){let n=ja(e)??ja(t),r=co(t)??co(e);return n&&r?`${n} \u2014 ${r}`:n||r?n||r:typeof t=="string"?t:""}var ew=new Set(["repo_operation_timeout_unresolved"]);function tw(e){for(let t of Fa(e))if(ew.has(t)||t.startsWith("repo_ops_"))return!0;return!1}function nw(e,t){return t.code==="interrupted"||t.interrupted===!0||e.failure_kind==="interrupted_without_terminal_exit"||t.code==="interrupted_without_terminal_exit"}function M_(e,t){if(!e||typeof e!="object")return"";let n=e.failure;if(!n||typeof n!="object"||tw(n.code))return"";if(n.code==="timeout"){let o=Number(t);return Number.isFinite(o)&&o>0?`\uD0C0\uC784\uC544\uC6C3 ${Math.round(o/1e3)}\uCD08 \uCD08\uACFC`:"\uD0C0\uC784\uC544\uC6C3 \uCD08\uACFC"}if(nw(e,n))return"\uC885\uB8CC \uAE30\uB85D \uC5C6\uC74C \u2014 \uC911\uB2E8\uB428";let r=typeof e.elapsed_ms=="number"&&Number.isFinite(e.elapsed_ms)&&e.elapsed_ms>=0?` \xB7 ${Jr(e.elapsed_ms)}`:"";return typeof e.signal=="string"&&e.signal.length>0?`signal ${e.signal}${r}`:Number.isInteger(e.exit_code)?`exit ${e.exit_code}${r}`:""}var L_={schema_unsupported:"\uD540\uB41C \uC815\uCC45 \uC2A4\uD0A4\uB9C8\uB97C \uC9C0\uC6D0\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4."};function N_(e){if(!e||typeof e!="object")return"";let t=e.retry;if(!t||typeof t!="object")return"";if(typeof t.blocked_reason=="string"&&t.blocked_reason)return`\uC790\uB3D9 \uC7AC\uC2DC\uB3C4 \uBABB \uD568 \u2014 ${Object.hasOwn(L_,t.blocked_reason)?L_[t.blocked_reason]:t.blocked_reason}`;if(t.status==="absorbed"){let n=t.absorbed&&typeof t.absorbed=="object"?t.absorbed:null,r=Lr(n?.first_failure?.code);return r?`\uC790\uB3D9 \uC7AC\uC2DC\uB3C4\uB85C \uD574\uC18C\uB428 \u2014 \uCCAB \uC2E4\uD328: ${r}`:"\uC790\uB3D9 \uC7AC\uC2DC\uB3C4\uB85C \uD574\uC18C\uB428"}if(e.state!=="failed")return"";if(t.status==="not_applicable")return"\uC7AC\uC2DC\uB3C4 \uB300\uC0C1 \uC544\uB2D8 \u2014 \uC2A4\uD06C\uB9BD\uD2B8 \uC2E4\uD589 \uC804 \uC2E4\uD328";if(t.status==="consumed"){let n=typeof t.first_fingerprint=="string"&&t.first_fingerprint?t.first_fingerprint:null;if(n===null)return"";if(n===e.failure?.fingerprint)return"\uC790\uB3D9 \uC7AC\uC2DC\uB3C4 1\uD68C \u2014 \uAC19\uC740 \uC2E4\uD328";let r=Lr(t.first_failure?.code);return r?`\uC790\uB3D9 \uC7AC\uC2DC\uB3C4 1\uD68C \u2014 \uB2E4\uB978 \uC2E4\uD328: ${r}`:"\uC790\uB3D9 \uC7AC\uC2DC\uB3C4 1\uD68C \u2014 \uB2E4\uB978 \uC2E4\uD328"}return""}function rw(e){if(!Number.isFinite(e)||e<0)return"0s";let t=Math.floor(e/1e3),n=Math.floor(t/60),r=t%60;return n>0?`${n}m ${String(r).padStart(2,"0")}s`:`${r}s`}var q_=200;function ow(e){return typeof e!="string"||e.length===0?"":e.length>q_?`${e.slice(0,q_)}\u2026`:e}function sw(e){let t=e&&e.attempts>0&&e.max>0?` ${e.attempts}/${e.max}`:"",n=e&&typeof e.next_at=="number"?` \xB7 ${new Date(e.next_at).toLocaleTimeString("ko-KR",{hour:"2-digit",minute:"2-digit"})}`:"";return`\u21BB \uC7AC\uC2DC\uB3C4 \uB300\uAE30${t}${n}`}function Fc(e){return typeof e!="number"||!Number.isFinite(e)?"":new Date(e).toLocaleTimeString("ko-KR",{hour:"2-digit",minute:"2-digit"})}function iw(e){if(!e)return"";let t=e.auto_resume==="disarmed"?" \xB7 \uC218\uB3D9 \uC870\uCE58":"";if(e.kind==="usage_limit"){let r=Fc(e.resets_at);if(!r)return`\u23F3 \uD55C\uB3C4 \uB300\uAE30 \xB7 \uB9AC\uC14B \uBBF8\uC0C1${t}`;let o=e.target?.account_alias||e.target?.account||"";return`\u23F3 \uD55C\uB3C4 \uB300\uAE30 ${r}${o?` \xB7 ${o}`:""}${t}`}let n=Fc(e.next_probe_at);return`\u26A0\uFE0F \uACF5\uAE09\uC790 \uC7A5\uC560${n?` \xB7 \uB2E4\uC74C \uD504\uB85C\uBE0C ${n}`:""}${t}`}function F_(e){if(!e)return"";let t=Array.isArray(e.timeline)?e.timeline:[],n=typeof e.log_path=="string"?e.log_path:"",r=e.log_expired===!0,o=e.log_unreadable===!0;return t.length===0&&n.length===0&&!r&&!o?"":c`${t.length>0?c`<ol class="rtile__history" data-seam="tile-timeline">
        ${t.map(i=>c`<li class="rtile__history-row">
              ${j_(i.at)?c`<span class="rtile__history-at"
                    >${j_(i.at)}</span
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
            ${Xr(n)}
          </p>`:""}`}function j_(e){return typeof e!="number"||!Number.isFinite(e)?"":new Date(e).toLocaleTimeString("ko-KR",{hour:"2-digit",minute:"2-digit"})}function aw(e,t){if(!e||e.open!==!0)return"";let n=co(e.cause)||Lr(e.cause,e.cause_detail),r=e.retry&&e.retry.attempts>0?`\uC790\uB3D9 \uC7AC\uC2DC\uB3C4 ${e.retry.attempts}\uD68C \u2014 \uAC19\uC740 \uC624\uB958`:"",o=e.cause_detail,i=e.quickfix_lane&&e.quickfix_landing?e.quickfix_landing:null,s=i?[i.cursor||null,typeof i.head_sha=="string"?i.head_sha.slice(0,7):null,i.reason||null].filter(Boolean).join(" \xB7 "):"",l=typeof e.finished_at=="number"?`${new Date(e.finished_at).toLocaleString("ko-KR")} \xB7 ${wn(e.finished_at,t)}`:"",a=[e.runner,e.model,e.observed_effort??e.effort,e.speed].filter(_=>typeof _=="string"&&_.length>0).join(" \xB7 "),u=e.usage?.total_cost_usd,d=typeof u=="number"&&Number.isFinite(u)?`$${u.toFixed(2)}`:"",f=F_(e);return c`<div
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
  </div>`}function lw(e){return e==="pending"?"\uD68C\uBCF5 \uD6C4 \uC790\uB3D9 \uC7AC\uAC1C \uB300\uAE30":e==="disarmed"?"\uC790\uB3D9 \uC7AC\uAC1C \uC18C\uC9C4 \xB7 \uC218\uB3D9 \uC870\uCE58 \uD544\uC694":typeof e=="string"&&e.startsWith("refused:")?`\uC790\uB3D9 \uC7AC\uAC1C \uAC70\uBD80 \xB7 ${e.slice(8)}`:""}function cw(e){return e==="none"?"\uACC4\uC815 \uC804\uD658 \uC548 \uD568 \xB7 \uC870\uAC74\uC744 \uB9CC\uC871\uD558\uB294 \uB2E4\uB978 \uACC4\uC815 \uC5C6\uC74C":e==="disabled"?"\uACC4\uC815 \uC804\uD658 \uC548 \uD568 \xB7 \uC790\uB3D9 \uC804\uD658 \uAEBC\uC9D0":""}function uw(e){if(!e||e.open!==!0)return"";let t=[e.target?.model,e.target?.account_alias||e.target?.account].filter(i=>typeof i=="string"&&i.length>0).join(" \xB7 "),n=Fc(e.resets_at),r=lw(e.auto_resume),o=cw(e.auto_switch);return c`<div
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
            <dd>${Xr(e.log_path)}</dd>
          </div>`:""}
    </dl>
  </div>`}function dw(e){return!e||!e.repo&&!e.serial_lane_id?"":c`${e.repo?c`<span
        class="worker-card__repo rtile__repo"
        title=${e.root_dir||""}
        >${e.repo}</span
      >`:""}${e.serial_lane_id?c`<span class="rtile__lane">${e.serial_lane_id}</span>`:""}`}var pw=new Set(["codex-runner"]);function fw(e,t,n,r=null){if(!e)return"";let o=e.last_activity||null,i=o&&typeof o.text=="string"?o.text:"",s=o&&typeof o.at=="number"?o.at:null,l=(r||!Array.isArray(e.legs)?[]:e.legs).filter(y=>y&&!(typeof y.agent_type=="string"&&pw.has(y.agent_type))),a=l.filter(y=>y&&y.state==="live"),u=l.filter(y=>y&&y.state!=="live"),d=r&&typeof r.last_event_at=="number"?wn(r.last_event_at,t):"",f=r?wn(r.updated_at,t):"",_=d?`\uCD5C\uADFC \uD65C\uB3D9 ${d}`:f?`\uAC31\uC2E0 ${f}`:"";return c`${i?c`<div class="rtile__activity${n?" is-paused":""}">
        <span class="rtile__activity-dot" aria-hidden="true"></span>
        <span class="rtile__activity-text">${i}</span>
        ${s!==null?c`<span class="rtile__activity-age"
              >${wn(s,t)}</span
            >`:""}
      </div>`:_?c`<div class="rtile__activity rtile__activity--session">
          <span class="rtile__activity-dot" aria-hidden="true"></span>
          <span class="rtile__activity-text">${_}</span>
        </div>`:""}${a.length>0||u.length>0?c`<div class="rtile__legs">
        ${a.map(y=>c`<span
              class="rtile__leg rtile__leg--live"
              title="이 세션이 띄운 서브에이전트/Codex 세션이 실행 중입니다"
              >위임 중 · ${y.label}</span
            >`)}${u.length>0?c`<span
              class="rtile__leg rtile__leg--done"
              title=${`\uC644\uB8CC\uB41C \uC704\uC784: ${u.map(y=>y.label).join(", ")}`}
              >위임 완료 ${u.length}</span
            >`:""}
      </div>`:""}`}var _w={remote:"\uB2E4\uB978 \uBA38\uC2E0 \uC138\uC158 \u2014 \uC774 \uC11C\uBC84\uC5D0 transcript \uC5C6\uC74C",missing:"transcript \uD30C\uC77C \uC5C6\uC74C"};function mw(e){if(!e)return"";let t=_w[e.locality]||"";return c`<button
    type="button"
    class="rtile__session"
    ?disabled=${t.length>0}
    title=${t||"\uB77C\uC774\uBE0C \uC138\uC158 \uC5F4\uAE30"}
    aria-label="라이브 세션 열기"
  >
    ▤ 세션
  </button>`}function gw(e,t,n,r="",o="",i=!1){if(e==="provider_hold")return c`<div class="rtile__foot">
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
    </div>`;if(e==="retry_wait")return n?c`<div class="rtile__foot">${n}</div>`:"";let s=ow(t?.summary);if(e==="waiting")return c`${s?c`<p class="rtile__held-summary">${s}</p>`:""}${r}
      <div class="rtile__foot">${n}</div>`;let l=F_(t);return c`${s?c`<p class="rtile__held-summary">${s}</p>`:""}${l}
    <div class="rtile__foot">
      ${i?c`${n}${o}`:c`${o}${n}`}
    </div>`}function Bc(e,t,n=null,r={}){let o=e.kind==="session",i=o&&Array.isArray(e.session_refs)&&e.session_refs.find(Ee=>Ee&&Ee.current===!0)||null,s=e.failed===!0,l=s&&e.failure||null,a=e.parked===!0&&!s,u=e.retry_wait===!0&&!s&&!a,d=e.waiting===!0&&!s&&!a&&!u,f=e.provider_hold===!0&&!s&&!a&&!u&&!d,_=a&&e.failure||null,y=d&&e.wait||null,g=f&&e.hold||null,C=a||u||d||f,k=!!e.paused,X=s||C?e.status_label||(a?"\uC138\uC158 \uB300\uAE30":u?"\uC7AC\uC2DC\uB3C4 \uB300\uAE30":d?"\uC120\uD589 \uB300\uAE30":f?"\uACF5\uAE09\uC790 \uBCF4\uB958":e.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328"):k?"\uC77C\uC2DC\uC815\uC9C0":typeof e.started_at=="number"?rw(t-e.started_at):"\u2014",ae=e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker)?e.exec_chips:null,H=ps(e),N=gn(e.usage),P=cr(e.usage),j=e.conflict_resolution?k?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":"\uCDA9\uB3CC \uD574\uC18C":null,B=e.base_exception||null,W=e.landing,T=e.attempt_id&&e.attempt_id===n,S=r.monitor||null,I=dw(S),O=Gi(S?.cross_lane_chip),J=S?Ki(S.dependency_chips):"",ce=fw(S,t,k,o?{updated_at:e.updated_at??null,last_event_at:i&&i.locality==="local"?i.last_event_at:null}:null),Se=o&&e.workflow?.chips?.exec_receipt||null,K=to(e.workflow),te=Vi(e.rec,e.chip_popover?.chip_key==="rec"),fe=e.chip_popover?Lo(e.chip_popover.content):"",Re=Se?c`<span
        class="ctl-chip ctl-chip--exec-receipt"
        title=${`exec_receipt ${lr(Se)}`}
        >${`${Se.kind}:${hi(Se)}`}</span
      >`:"",V=i?c`<span
        class="ctl-chip ctl-chip--sref"
        title=${`${i.provider}:${i.session_id}@${i.host}${(e.session_refs||[]).length>=2?` \xB7 \uC774\uB825 ${(e.session_refs||[]).length}`:""}`}
        >${Es(i)}</span
      >`:"",le=I||O||K||V||Re||te?c`<div class="rtile__meta">
          ${I}${O}${K}${V}${Re}${te}${fe}
        </div>`:"",ee=l?c`<button
          type="button"
          class="rtile__failure-badge"
          data-attempt-id=${l.attempt_id}
          aria-expanded=${l.open===!0?"true":"false"}
          aria-label="실패 상세"
        >
          ⛔ ${D_(l.cause)||"\uC2E4\uD328"}
        </button>
        ${l.halted_auto_advance?c`<span class="rtile__auto-halted">자동 진행 꺼짐</span>`:""}`:"",M=a?c`<span
        class="rtile__held-badge"
        title="세션이 사용자 결정을 기다리며 정상 종료했습니다 — 큐는 계속 갑니다"
        >⏸ 세션 대기</span
      >`:u?c`<span
          class="rtile__held-badge"
          title="환경성 실패의 자동 재시도를 기다립니다 — 사람이 할 일은 없습니다"
          >${sw(e.retry)}</span
        >`:d?e.wait?.returning?c`<span
              class="rtile__held-badge"
              title="막고 있던 선행이 남지 않았습니다 — 다음 pass에서 후보로 돌아갑니다 (슬롯·레인 순서 대기)"
              >⛓ 복귀 대기</span
            >`:c`<span
              class="rtile__held-badge"
              title="세션이 선행 미충족으로 착수를 거부했습니다 — 선행이 닫히면 저절로 다시 돕니다"
              >⛓ 선행 대기</span
            >`:f&&g?c`<button
              type="button"
              class="rtile__held-badge rtile__provider-hold-badge"
              data-attempt-id=${e.attempt_id}
              aria-expanded=${g.open===!0?"true":"false"}
              aria-label="공급자 보류 상세"
            >
              ${iw(g)}
            </button>`:"",oe=c`${j?c`<span class="worker-mini__badge">${j}</span>`:""}${B?c`<span
        class="worker-mini__badge"
        title="이 세션의 target base가 워크스페이스 선언 base와 다릅니다"
        >${B}</span
      >`:""}${ee}${M}`,se=o?"":Po(e),he=Pi(l?.quickfix_landing),xe=he==="settlement"?"\uC815\uC0B0 \uC7AC\uAC1C":"\uC774\uC5B4\uD558\uAE30",Ze=he==="settlement"?"\uCC29\uC9C0 \uC815\uC0B0\uC744 \uB2E4\uC2DC \uC2E4\uD589":"\uAC19\uC740 \uC138\uC158\uC73C\uB85C \uC774\uC5B4\uC11C \uC9C4\uD589",G=e.resolve_action?c`<button
        type="button"
        class="rtile__resolve"
        ?disabled=${e.resolve_enabled===!1}
        title=${e.resolve_title||"\uC774 \uC2E4\uD328\uB97C \uC0AC\uB78C\uC774 \uC774\uC5B4\uBC1B\uB294 \uB300\uD654\uD615 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4"}
        aria-label="세션에서 해결"
      >
        세션에서 해결
      </button>`:"",ge=e.discard?.action&&!(s&&l?.landed===!0)?c`<button
          type="button"
          class="rtile__discard"
          data-operation-id=${e.discard.operation?.operation_id||""}
          data-confirmation=${l?.confirmation||"unmerged"}
          ?disabled=${!e.discard.enabled}
          title=${e.discard.title}
          aria-label=${e.discard.label}
        >
          ${e.discard.label}
        </button>`:"",ue=ge&&e.discard?.abandon?.action===!0?c`<button
          type="button"
          class="rtile__discard-abandon"
          data-operation-id=${e.discard.operation?.operation_id||""}
          data-operation-kind=${e.discard.operation?.kind||""}
          data-last-error=${e.discard.error||""}
          title=${e.discard.abandon.title}
          aria-label=${e.discard.abandon.label}
        >
          ${e.discard.abandon.label}
        </button>`:"",Q=ue?c`${ge}${ue}`:ge;return c`<div
    class="rtile${T?" rtile--sel":""}${k?" rtile--paused":""}${s?" rtile--failed rtile--compact":""}${C?" rtile--held rtile--compact":""}${a?" rtile--parked":""}${u?" rtile--retry-wait":""}${d?" rtile--waiting":""}${o?" rtile--session":""}${f?" rtile--provider-hold":""}${e.search_match===!1?" is-dimmed":""}"
    data-bead-id=${e.bead_id}
    data-attempt-id=${e.attempt_id||""}
  >
    <div class="rtile__hd">
      <span
        class="rtile__dot${o?" rtile__dot--session":""}"
        aria-hidden="true"
      ></span>
      <span class="rtile__id" title="클릭하면 ID 복사">${e.bead_id}</span>
      ${Yi(e.priority)}${H?c`<span class="rtile__resumed" title=${H}>↻</span>`:""}${oe}
      <div class="rtile__hd-actions">
        ${o?c`${typeof e.started_at=="number"?c`<span class="rtile__elapsed">${X}</span>`:""}${mw(i)}<span
                class="rtile__session-badge"
                title="Worker가 아닌 세션이 in_progress로 잡은 이슈"
                >세션</span
              >`:c`<span class="rtile__elapsed">${X}</span>`}
        ${o||C?"":s?c`<button
                  type="button"
                  class="op-btn rtile__resume"
                  data-resume-kind=${he}
                  ?disabled=${l?.resume_eligible===!1}
                  title=${l?.resume_eligible===!1?l.resume_reason||`${xe} \uBD88\uAC00`:Ze}
                  aria-label=${xe}
                >
                  ↻ ${xe}
                </button>
                ${Q}`:c`<button
                  type="button"
                  class="rtile__session"
                  title="라이브 세션 열기"
                  aria-label="라이브 세션 열기"
                >
                  ▤ 세션
                </button>
                ${k?c`<button
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
                ${Q}`}${a?"":G}
      </div>
    </div>
    <div class="rtile__title">${e.title}</div>
    ${C?gw(a?"parked":u?"retry_wait":d?"waiting":"provider_hold",a?_:d?y:g,Q,d?J:"",a?G:"",a&&!!e.discard?.error):s?"":c`${ce}${e.rollup?mi(e.rollup,{parent_id:e.bead_id,expanded:e.rollup_expanded===!0,childChips:dl}):""}
            ${W?c`<div class="rtile__landing">
                  <span
                    class="merge-step${W.failed?" merge-step--failed":""}"
                    style=${`--progress: ${W.percent}%`}
                    >${W.label}${W.index>0?c`<span class="merge-step__n"
                          >${W.index}/${W.total}</span
                        >`:""}</span
                  >
                </div>`:""}
            ${J}
            ${o?le:I||O||K||ae||te||N.length>0||P?c`<div class="rtile__meta">
                    ${I}${O}${K}${eo(e.exec_chips)}${te}
                    ${N.length>0?N.map(Ee=>c`<span
                              class="worker-usage"
                              title=${Ee.tooltip}
                              >${Ee.label}</span
                            >`):P?c`<span
                            class="worker-usage"
                            title=${ss(e.usage)}
                            >${P}</span
                          >`:""}${fe}
                  </div>`:""}
            ${Bi(e)} ${se}
            <!-- 살아있음만 말하는 비의미적 액센트 (UI-58y2 데스크톱 §실행 타일).
         quick_fix landing의 실제 진행은 위의 별도 진행 줄이 소유한다.
         일시정지된 타일은 살아있지 않으므로 액센트도 없다. -->
            ${s||k?"":c`<div class="rtile__accent" aria-hidden="true"></div>`}`}
    ${aw(l,t)}${uw(g)}
  </div>`}function hw(e){let t=e.last_activity&&typeof e.last_activity=="object"?e.last_activity:null,n=Array.isArray(e.legs)?e.legs:[],r=e.dependency_chips||null;return!t&&n.length===0&&!r&&e.kind!=="session"?null:{...t?{last_activity:t}:{},...n.length>0?{legs:n}:{},...r?{dependency_chips:r}:{}}}function B_(e,t=Date.now(),n=null){let r=Array.isArray(e)?e:[];return c`<div class="worker-rungrid" id="worker-rungrid">
    ${r.length===0?c`<div class="worker-rungrid__empty">실행 세션 없음</div>`:r.map(o=>Bc(o,t,n,{monitor:hw(o)}))}
  </div>`}function Go(e,t,n=!1){let r=!!t.discard?.error;return!e||!r&&t.parked!==!0?{}:{resolve_action:!0,resolve_enabled:!n,resolve_title:n?"\uC138\uC158 \uAE30\uB3D9 \uC694\uCCAD \uC911 \u2014 \uC11C\uBC84 \uC751\uB2F5\uC744 \uAE30\uB2E4\uB9BD\uB2C8\uB2E4":r?"\uC2E4\uD328\uD55C \uD3D0\uAE30\uB97C \uC0AC\uB78C\uC774 \uC774\uC5B4\uBC1B\uB294 \uB300\uD654\uD615 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4 \u2014 \uAE30\uB85D\uB41C \uC138\uC158\uC774 \uC788\uC73C\uBA74 fork\uD558\uACE0, \uC5C6\uC73C\uBA74 \uC0C8 \uC138\uC158\uC5D0 \uC0AC\uC720\uB97C \uC2E3\uC2B5\uB2C8\uB2E4":"\uD30C\uD0B9\uC744 \uC0AC\uB78C\uC774 \uC774\uC5B4\uBC1B\uB294 \uB300\uD654\uD615 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4 \u2014 \uC0B4\uC544 \uC788\uB294 \uBB38\uC758 \uC138\uC158\uC774 \uC788\uC73C\uBA74 \uADF8 \uCC3D\uC744 \uAC00\uB9AC\uD0B5\uB2C8\uB2E4"}}var fn="",bw=["impl_runtime","impl_model","impl_effort"],U_=["claude","codex"],yw=["claude_account","codex_account"],vw=5,Ba=1;function qn(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function Ua(e,t){let n=t.transport,r=typeof t.root_dir=="string"&&t.root_dir.length>0?t.root_dir:null,o=t.notify||(E=>ye(E,"error",4e3)),i={},s={},l={},a={},u=[],d=!1,f={state:"absent",values:{},warnings:[]},_={},y={},g=Promise.resolve(),C=Promise.resolve(),k={claude:null,codex:null},X=!1,ae=null,H={},N="",P="general",j="",B=!1,W=!1,T=!1,S=null,I=!1;function O(){let E=t.queue?t.queue():null;return qn(E)?E:null}function J(){let E=O();return E?E.runner_catalog:null}function ce(){let E=O();return E&&qn(E.execution_defaults)?E.execution_defaults:null}function Se(){let E=O();return!!(E&&Object.hasOwn(E,"quick_fix_orchestration_model"))}function K(){let E=t.implPresetStore?.get();return qn(E)&&Array.isArray(E.presets)?E:null}function te(){return r===null?{}:{root_dir:r}}async function fe(E,U){return I||!n?null:await n(E,U)}function Re(E){E&&qn(E.queue)&&t.onQueueAdopt?.(E.queue)}async function V(E,U){let z=O();if(!z||I)return null;let ve=await fe(E,{...U,...te(),expected_revision:z.revision});if(Re(ve),r!==null&&ve&&ve.conflict){let Ae=ve.queue&&typeof ve.queue.revision=="number"?ve.queue.revision:O()?.revision??z.revision;ve=await fe(E,{...U,...te(),expected_revision:Ae}),Re(ve)}return ve}async function le(){d=!0,Be();try{let E=await fe("get-session-defaults",{...te()});i=Ei(E?.values),s={...i},l={},a={},u=Array.isArray(E?.warnings)?E.warnings:[]}catch(E){u=["kv_read_failed"],o(`\uC138\uC158 \uAE30\uBCF8\uAC12\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4: ${E instanceof Error?E.message:String(E)}`)}finally{d=!1,Be()}}function ee(E,U){let z={...U};for(let ve of is){let Ae=s[ve];Ae!==E[ve]&&(typeof Ae=="string"?z[ve]=Ae:delete z[ve])}return z}function M(){C=C.then(()=>oe())}async function oe(){let E=jd(i,s);if(Object.keys(E).length===0)return;let U={...s};try{let z=await fe("set-session-defaults",{values:E,...te()});i=Ei(z?.values),s=ee(U,i),u=Array.isArray(z?.warnings)?z.warnings:[]}catch(z){o(`\uC138\uC158 \uAE30\uBCF8\uAC12 \uC800\uC7A5 \uC2E4\uD328: ${z instanceof Error?z.message:String(z)}`)}Be()}function se(E,U){if(!qn(E))return;let z=E.state;f={state:z==="usable"||z==="unusable"||z==="absent"?z:"absent",values:qn(E.values)?{...E.values}:{},warnings:Array.isArray(E.warnings)?E.warnings:[]},y={...f.values},U&&(_={...y})}async function he(){try{se(await fe("get-workspace-accounts",{...te()}),!0)}catch(E){f={state:"unusable",values:{},warnings:["kv_read_failed"]},y={},_={},o(`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4: ${E instanceof Error?E.message:String(E)}`)}Be()}async function xe(E){try{let U=await fetch(E);if(!U.ok)return null;let z=await U.json();if(!qn(z)||!Array.isArray(z.accounts))return null;let ve=z.accounts.filter(Ae=>qn(Ae)&&typeof Ae.key=="string"&&Ae.key.length>0&&typeof Ae.email=="string"&&Ae.email.length>0);return{accounts:ve,active:ve.find(Ae=>Ae.active===!0)||null}}catch{return null}}async function Ze(){X=!0;let[E,U]=await Promise.all([xe("/api/claude-usage"),xe("/api/codex-usage")]);I||(k={claude:E,codex:U},Be())}function G(){let E={};for(let U of yw){let z=Object.hasOwn(_,U)?_[U]:null,ve=Object.hasOwn(y,U)?y[U]:null;z!==ve&&(E[U]=z)}return E}async function ge(){let E=G();if(Object.keys(E).length!==0){try{se(await fe("set-workspace-accounts",{values:E,...te()}),!1)}catch(U){o(`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12 \uC800\uC7A5 \uC2E4\uD328: ${U instanceof Error?U.message:String(U)}`)}Be()}}function ue(E,U){U===fn?delete _[E]:_[E]=U,Be(),g=g.then(()=>ge())}function Q(E,U){if(bw.includes(E)){Je(E,U);return}U===fn?delete s[E]:s[E]=U,Be(),M()}function Ee(E,U){l[E]=U,delete a[E]}function be(E,U,z){if(l[E]=U,U.length>0&&!z(U)){a[E]=!0,Be();return}delete l[E],delete a[E],U.length===0?delete s[E]:s[E]=U,Be(),M()}function Le(){let E=ut().orchestration_model,U=In({global:{orchestration_model:E??void 0},execution_defaults:ce(),runner_catalog:J()}).orchestration_model.value;return U?Un(J(),U):null}function qe(E,U){typeof U=="string"&&U.length>0?s[E]=U:delete s[E]}function Je(E,U){let z=U===fn?void 0:U,ve=Md({impl_runtime:E==="impl_runtime"?z:s.impl_runtime,impl_model:E==="impl_model"?z:s.impl_model,impl_effort:E==="impl_effort"?z:s.impl_effort},J(),Le());qe("impl_runtime",ve.impl_runtime),qe("impl_model",ve.impl_model),qe("impl_effort",ve.impl_effort),Be(),M()}async function He(){let E=O();if(!E)return;let U={orchestration_model:E.orchestration_model??null,orchestration_effort:E.orchestration_effort??null,orchestration_speed:E.orchestration_speed??null,quick_fix_orchestration_model:E.quick_fix_orchestration_model??null,quick_fix_orchestration_effort:E.quick_fix_orchestration_effort??null,quick_fix_orchestration_speed:E.quick_fix_orchestration_speed??null},z=Fd(U,{...U,...H});if(Object.keys(z).length!==0){try{let ve=await V("worker-queue-set-orchestration-defaults",{values:z});if(ve&&ve.applied===!1){o("Worker \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC");return}H={}}catch(ve){o(`Worker \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${ve instanceof Error?ve.message:String(ve)}`)}Be()}}function ie(E,U){H[E]=U===fn?null:U,Be(),He()}function Z(E){if(ae=E,!E){Be();return}let U=J(),z=ut(),ve=z.orchestration_model;ve&&!Ro(U,E).includes(ve)&&(H.orchestration_model=null,ve=null);let Ae=z.orchestration_effort;Ae&&!Oi(U,E,ve||Rn).includes(Ae)&&(H.orchestration_effort=null),Be(),He()}async function Oe(E){if(!(!O()||E<Ba)){try{await V("worker-queue-set-slots",{slots:E})}catch(U){o(`slots \uC800\uC7A5 \uC2E4\uD328: ${U instanceof Error?U.message:String(U)}`)}Be()}}async function nt(E){if(!(!O()||E<Ba||E>vw)){try{await V("worker-queue-set-serial-lane-count",{count:E})}catch(U){o(`\uC9C1\uB82C \uB808\uC778 \uC800\uC7A5 \uC2E4\uD328: ${U instanceof Error?U.message:String(U)}`)}Be()}}async function pt(E,U){let z=E==="auto_advance"?"worker-automation-toggle":E==="auto_merge"?"worker-merge-auto-toggle":"worker-provider-auto-switch-toggle";try{await V(z,{on:U})}catch(ve){o(`\uC790\uB3D9\uD654 \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${ve instanceof Error?ve.message:String(ve)}`)}Be()}function Ye(){let E={},U=ut();for(let z of To){let ve=Bn.includes(z)?U[z]:s[z];typeof ve=="string"&&ve.length>0&&(E[z]=ve)}return E}async function _t(){let E=K();if(!E)return;let U=Ye();if(Object.keys(U).length===0){o("\uC800\uC7A5\uD560 \uC2E4\uD589 \uC124\uC815\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uBA3C\uC800 \uC2E4\uD589 \uAC12\uC744 \uC120\uD0DD\uD558\uC138\uC694");return}let z=(E.presets||[]).find(Ae=>Ae.id===N),ve=j.trim()||(z?z.name:"");if(!ve){o("\uD504\uB9AC\uC14B \uC774\uB984\uC744 \uC785\uB825\uD558\uC138\uC694");return}try{let Ae=z?await fe("impl-preset-update",{expected_revision:E.revision,id:z.id,name:ve,settings:U}):await fe("impl-preset-create",{expected_revision:E.revision,name:ve,settings:U});if(Ae&&Ae.applied){if(j="",!z&&Array.isArray(Ae.presets)){let $t=Ae.presets.find(kt=>kt.name===ve);N=$t?$t.id:N}Be()}else o("\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4"),Be()}catch(Ae){o(`\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328: ${Ae instanceof Error?Ae.message:String(Ae)}`)}}async function Pt(){let E=K();if(!(!E||N.length===0))try{let U=await fe("impl-preset-delete",{expected_revision:E.revision,id:N});U&&U.applied?(N="",Be()):(o("\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328: \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4"),Be())}catch(U){o(`\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328: ${U instanceof Error?U.message:String(U)}`)}}function Et(E){i=Ei(E.values),s={...i},u=Array.isArray(E.warnings)?E.warnings:[],qn(E.queue)&&(t.onQueueAdopt?.(E.queue),H={})}async function rt(E){let U=K(),z=O();if(!U||!z||N.length===0||E==="quick_fix"&&!Se())return;let ve=Ae=>({preset_id:N,expected_revision:U.revision,expected_queue_revision:Ae,...E==="quick_fix"?{lane:"quick_fix"}:{},...te()});try{let Ae=await fe("apply-impl-preset-global",ve(z.revision));if(E==="quick_fix"&&Ae&&Ae.lane!=="quick_fix"){o("\uC11C\uBC84 \uC751\uB2F5\uC5D0 lane\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uD050 \uC2A4\uB0C5\uC0F7\uC744 \uB2E4\uC2DC \uBC1B\uC740 \uB4A4 \uD655\uC778\uD558\uC138\uC694"),Be();return}if(Ae&&Ae.applied&&Et(Ae),r!==null&&Ae&&Ae.queue_applied===!1){let $t=Ae.queue&&typeof Ae.queue.revision=="number"?Ae.queue.revision:O()?.revision??z.revision;if(Ae=await fe("apply-impl-preset-global",ve($t)),E==="quick_fix"&&Ae&&Ae.lane!=="quick_fix"){o("\uC11C\uBC84 \uC751\uB2F5\uC5D0 lane\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uD050 \uC2A4\uB0C5\uC0F7\uC744 \uB2E4\uC2DC \uBC1B\uC740 \uB4A4 \uD655\uC778\uD558\uC138\uC694"),Be();return}Ae&&Ae.applied&&Et(Ae)}Ae&&Ae.applied?Ae.queue_applied===!1&&o("\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uAC12\uC740 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC138\uC694"):Ae&&Ae.conflict&&o("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328: \uD504\uB9AC\uC14B\uC774 \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4")}catch(Ae){o(`\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328: ${Ae instanceof Error?Ae.message:String(Ae)}`)}Be()}async function gt(){W=!0,T=!1,Be();try{let E=await fe("get-worker-system-prompt",{});!E||typeof E!="object"||Array.isArray(E)?T=!0:S=E}catch{T=!0}finally{W=!1,Be()}}function Zt(){if(B=!B,B&&!S){gt();return}Be()}function x(){let E=Wo({loading:W,error:T});if(E)return E;if(!S)return"";let U=Array.isArray(S.variants)?S.variants:[];return c`<div class="settings-dialog__sp-body">
      ${S.target_base_placeholder?c`<div class="prompt-block__meta">
            \`${S.target_base_placeholder}\`는 디스패치 시점에 해석된
            base로 치환됩니다.
          </div>`:""}
      ${U.map(z=>c`<div class="settings-dialog__sp-variant" data-variant=${z.key}>
            <div class="settings-dialog__sp-cond">${z.condition}</div>
            ${br(z.label,z.system_prompt)}
          </div>`)}
    </div>`}function re(){return c`<section
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
        @click=${Zt}
      >
        ${B?"\uC811\uAE30":"\uC804\uBB38 \uBCF4\uAE30"}
      </button>
      ${B?x():""}
    </section>`}function Ne(E,U,z,ve,Ae,$t,kt,Ct){let jt=Ae[E]??fn,Wt=kl(E,z,Ae,ce(),J(),kt,Ct),Qt=Wt.options.find(xt=>xt.value===jt),sn=jt===fn?Wt.full_value:Qt?.full_value;return c`<select
        class=${jt===fn?"settings-dialog__unset":""}
        data-key=${E}
        aria-label=${U}
        title=${sn||""}
        ?disabled=${$t===!0||Ct!=="quick_fix"&&Wt.disabled}
        .value=${Ir(String(jt))}
        @change=${xt=>ve(E,String(xt.target.value))}
      >
        <option value=${fn} ?selected=${jt===fn}>
          ${Wt.unset_label}
        </option>
        ${Wt.options.map(xt=>c`<option
              value=${xt.value}
              title=${xt.full_value||""}
              ?selected=${xt.value===jt}
            >
              ${xt.label}
            </option>`)}
      </select>
      ${jt===fn?c`<span class="settings-dialog__source-badge">기본</span>`:""}`}function Ce(E,U,z,ve,Ae,$t=!1,kt,Ct=null,jt=null){return c`<div
      class=${`settings-dialog__row${$t?" settings-dialog__row--off":""}`}
      title=${$t&&jt?jt:""}
    >
      <span class="settings-dialog__row-label">${U}</span>
      <span class="settings-dialog__controls">
        ${Ne(E,U,z,ve,Ae,$t,kt,Ct)}
      </span>
    </div>`}function je(E,U,z,ve,Ae,$t){let kt=Object.hasOwn(a,E),Ct=l[E]??s[E]??fn;return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${U}</span>
      <span class="settings-dialog__controls">
        <input
          type="text"
          class=${`settings-dialog__text${kt?" settings-dialog__text--invalid":""}`}
          data-key=${E}
          aria-label=${U}
          aria-invalid=${String(kt)}
          placeholder=${z}
          .value=${Ir(Ct)}
          @input=${jt=>Ee(E,String(jt.target.value))}
          @change=${jt=>be(E,String(jt.target.value).trim(),$t)}
        />
        ${Ct.length===0?c`<span class="settings-dialog__source-badge">기본</span>`:""}
        <span class="settings-dialog__hint" data-key-hint=${E}
          >${kt?Ae:ve}</span
        >
      </span>
    </div>`}function We(E,U,z,ve){return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${U}</span>
      <span class="settings-dialog__controls">
        <label class="settings-dialog__check">
          <input
            type="checkbox"
            data-key=${E}
            .checked=${s[E]===as}
            @change=${Ae=>Q(E,Ae.target.checked?as:fn)}
          />
          ${z}
        </label>
        <span class="settings-dialog__hint" data-key-hint=${E}>${ve}</span>
      </span>
    </div>`}function ct(E,U){let z=U?U.active:null;return qn(z)?`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(${E==="claude"?z.email:zo({...z,alias:null})})`:"\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(\uD655\uC778 \uBD88\uAC00)"}function It(E,U,z){let ve=k[z],Ae=Object.hasOwn(_,E)?_[E]:fn,$t=z==="claude"?Ta:zo,kt=!!ve?.accounts.some(Ct=>Ct.key===Ae);return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${U}</span>
      <span class="settings-dialog__controls">
        <select
          aria-label=${U}
          data-account-key=${E}
          @change=${Ct=>ue(E,String(Ct.target.value))}
        >
          <option value=${fn} ?selected=${Ae.length===0}>
            ${ct(z,ve)}
          </option>
          ${Ae.length>0&&!kt?c`<option value=${Ae} selected>
                ${Ae} (목록에 없음)
              </option>`:""}
          ${ve?.accounts.map(Ct=>c`<option value=${Ct.key} ?selected=${Ct.key===Ae}>
                ${$t(Ct)}
              </option>`)||""}
        </select>
        ${ve?"":c`<span class="settings-dialog__hint"
              >계정 목록을 불러올 수 없습니다</span
            >`}
      </span>
    </div>`}function pe(){let E=f.warnings.join(", ");return f.state==="unusable"?`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12\uC744 \uD574\uC11D\uD560 \uC218 \uC5C6\uC5B4 \uC774 \uB808\uD3EC\uC758 \uB514\uC2A4\uD328\uCE58\uAC00 \uAC70\uBD80\uB429\uB2C8\uB2E4 \u2014 ${E} \xB7 \uACC4\uC815\uC744 \uB2E4\uC2DC \uACE0\uB974\uBA74 \uD574\uC18C\uB429\uB2C8\uB2E4`:f.warnings.length>0?`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12\uC5D0 \uC54C \uC218 \uC5C6\uB294 \uD0A4\uAC00 \uC788\uC2B5\uB2C8\uB2E4 \u2014 ${E}`:null}function $e(E,U,z,ve,Ae,$t){return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">
        <i
          class="settings-dialog__stage-dot"
          style=${`background: var(--stage-${U}-on)`}
        ></i>
        ${E}
      </span>
      <span class="settings-dialog__controls">
        ${Ne(z,`${E} \uBAA8\uB378`,ve,Q,s,!1)}
        ${Ne(Ae,`${E} effort`,Ri,Q,s,!1)}
        ${Ne($t,`${E} \uC18D\uB3C4`,Ld,Q,s,!1)}
      </span>
    </div>`}function Qe(E,U,z,ve){return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${U}</span>
      <span class="settings-dialog__controls">
        <button
          type="button"
          class=${`settings-dialog__toggle${ve?" is-on":""}`}
          data-automation=${E}
          aria-pressed=${ve?"true":"false"}
          aria-label=${U}
          @click=${()=>pt(E,!ve)}
        >
          ${ve?"\uCF1C\uC9D0":"\uAEBC\uC9D0"}
        </button>
        <span class="settings-dialog__hint">${z}</span>
      </span>
    </div>`}function ht(E,U,z,ve){return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${U}</span>
      <span class="settings-dialog__controls">
        <span class="settings-dialog__stepper" data-stepper=${E}>
          <button
            type="button"
            aria-label=${`${U} \uAC10\uC18C`}
            @click=${()=>ve(z-1)}
          >
            −
          </button>
          <span class="settings-dialog__stepper-value">${z}</span>
          <button
            type="button"
            aria-label=${`${U} \uC99D\uAC00`}
            @click=${()=>ve(z+1)}
          >
            +
          </button>
        </span>
      </span>
    </div>`}function st(E,U){return c`<div class="settings-dialog__preset-diff" data-preset-diff>
      <div class="settings-dialog__preset-diff-head">
        ${E.rows.length>0?`\uBCC0\uACBD ${E.rows.length}\uAC1C \xB7 \uC801\uC6A9\uD558\uBA74 \uC544\uB798\uC640 \uAC19\uC774 \uBC14\uB01D\uB2C8\uB2E4`:"\uD604\uC7AC \uC124\uC815\uACFC \uAC19\uC2B5\uB2C8\uB2E4 \u2014 \uC801\uC6A9\uD560 \uBCC0\uACBD\uC774 \uC5C6\uC2B5\uB2C8\uB2E4"}
      </div>
      ${E.rows.map(z=>c`<div
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
              >${z.after??(U==="quick_fix"?"\uAE30\uBCF8(\uD574\uC81C \u2192 \uC77C\uBC18 \uD504\uB85C\uD30C\uC77C)":"\uAE30\uBCF8(\uD574\uC81C)")}</span
            >
          </div>`)}
      ${E.ignored_keys.length>0?c`<div class="settings-dialog__preset-diff-note">
            ${E.ignored_keys.join(", ")}은(는)
            ${U==="quick_fix"?"quick_fix \uB808\uC778":"\uC804\uC5ED"} 적용이 쓰지 않는
            키라 무시됩니다
          </div>`:""}
    </div>`}function ut(){let E=O(),U={};for(let z of[...Bn,...Eo])U[z]=Object.prototype.hasOwnProperty.call(H,z)?H[z]:E&&typeof E[z]=="string"?E[z]:null;return U}function vt(){let E=ut(),U={};for(let z of Eo)U[z]=E[z]??null;for(let z of["quick_fix_impl_dispatch","quick_fix_impl_runtime","quick_fix_impl_model","quick_fix_impl_effort","quick_fix_impl_speed"])U[z]=s[z]??null;return U}function tt(){let E=J(),U=s.impl_runtime,z=s.impl_model,ve=K(),Ae=O(),$t=ut(),kt=Ro(E,ae),Ct=Co(E,void 0).filter(ze=>ze!==Rn),jt=Yr(E,void 0,void 0),Wt=Oi(E,ae,$t.orchestration_model||Rn).filter(ze=>ze!==Rn),Qt=N?(ve?.presets||[]).find(ze=>ze.id===N):null,sn=Qt?Nd(Ye(),qn(Qt.settings)?Qt.settings:{}):null,xt={quick_fix_orchestration_model:Ro(E,null),quick_fix_orchestration_effort:Oi(E,null,null).filter(ze=>ze!==Rn),quick_fix_orchestration_speed:er,quick_fix_impl_dispatch:ls,quick_fix_impl_runtime:U_,quick_fix_impl_model:Ct,quick_fix_impl_effort:jt,quick_fix_impl_speed:er},tn=Qt?qd(vt(),qn(Qt.settings)?Qt.settings:{},xt):null,pn=P==="quick_fix"?tn:sn,Bt=Se(),Gt=Bt?null:"\uC11C\uBC84\uAC00 quick_fix \uB808\uC778\uC744 \uC9C0\uC6D0\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4",on={...s,...$t},Ue=Ae&&typeof Ae.slots=="number"?Ae.slots:Ba+1,L=Ae&&typeof Ae.serial_lane_count=="number"?Ae.serial_lane_count:Ba,ke=ce()?.supported===!0,Me=pe(),At=kl("workflow_mode",cs,s,ce(),E);return c`
      ${u.length>0?c`<div class="settings-dialog__banner" role="alert">
            워크스페이스 기본값을 일부 읽지 못했습니다 —
            ${u.join(", ")}
          </div>`:""}
      ${Me?c`<div
            class="settings-dialog__banner"
            data-account-warning
            role="alert"
          >
            ${Me}
          </div>`:""}
      ${ke?"":c`<div
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
                .value=${Ir(N)}
                @change=${ze=>{N=String(ze.target.value),Be()}}
              >
                <option value="" ?selected=${N===""}>
                  실행 프리셋…
                </option>
                ${(ve?.presets||[]).map(ze=>c`<option
                      value=${ze.id}
                      ?selected=${ze.id===N}
                    >
                      ${ze.name}
                    </option>`)}
              </select>
              <button
                type="button"
                class="settings-dialog__btn settings-dialog__btn--primary op-btn"
                data-preset-apply-global
                data-preset-apply-general
                ?disabled=${!sn||sn.rows.length===0}
                @click=${()=>rt("general")}
              >
                일반에 적용
              </button>
              <button
                type="button"
                class="settings-dialog__btn op-btn"
                data-preset-apply-quick-fix
                title=${Gt||""}
                ?disabled=${!Bt||!tn||tn.rows.length===0}
                @click=${()=>rt("quick_fix")}
              >
                quick_fix 레인에 적용
              </button>
              <input
                type="text"
                class="settings-dialog__preset-name"
                placeholder=${N?"\uC774\uB984 (\uBE44\uC6B0\uBA74 \uC720\uC9C0)":"\uC0C8 \uD504\uB9AC\uC14B \uC774\uB984"}
                aria-label="프리셋 이름"
                .value=${Ir(j)}
                @input=${ze=>{j=String(ze.target.value)}}
              />
              <button
                type="button"
                class="settings-dialog__btn"
                data-preset-save
                title=${N?"\uD604\uC7AC \uD654\uBA74\uC758 \uC2E4\uD589 \uC124\uC815\uC744 \uC774 \uD504\uB9AC\uC14B\uC5D0 \uC800\uC7A5\uD569\uB2C8\uB2E4 (\uD504\uB9AC\uC14B \u2192 \uC124\uC815 \uBC29\uD5A5\uC774 \uC544\uB2D8)":"\uD604\uC7AC \uD654\uBA74\uC758 \uC2E4\uD589 \uC124\uC815\uC744 \uC0C8 \uD504\uB9AC\uC14B\uC73C\uB85C \uC800\uC7A5\uD569\uB2C8\uB2E4"}
                @click=${_t}
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
                aria-pressed=${String(P==="general")}
                @click=${()=>{P="general",Be()}}
              >
                일반
              </button>
              <button
                type="button"
                data-preset-lane="quick_fix"
                aria-pressed=${String(P==="quick_fix")}
                @click=${()=>{P="quick_fix",Be()}}
              >
                quick_fix
              </button>
            </div>
            ${pn?st(pn,P):""}

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">오케스트레이션</div>
              <div class="settings-dialog__row">
                <span class="settings-dialog__row-label">런타임</span>
                <span class="settings-dialog__controls">
                  <select
                    aria-label="런타임"
                    data-key="orchestration_runtime_filter"
                    .value=${Ir(ae||fn)}
                    @change=${ze=>{let Dt=String(ze.target.value);Z(Dt===fn?null:Dt)}}
                  >
                    <option value=${fn} ?selected=${!ae}>
                      전체
                    </option>
                    <option
                      value="claude"
                      ?selected=${ae==="claude"}
                    >
                      claude
                    </option>
                    <option
                      value="codex"
                      ?selected=${ae==="codex"}
                    >
                      codex
                    </option>
                  </select>
                  <span class="settings-dialog__hint"
                    >모델 목록을 좁힙니다</span
                  >
                </span>
              </div>
              ${Ce("orchestration_model","\uBAA8\uB378",kt,ie,$t)}
              ${Ce("orchestration_effort","effort",Wt,ie,$t)}
              ${Ce("orchestration_speed","\uC18D\uB3C4",er,ie,$t)}
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
                      .checked=${Ae?.provider_auto_switch!==!1}
                      @change=${ze=>pt("provider_auto_switch",ze.target.checked)}
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
                      data-mode=${fn}
                      aria-pressed=${String(!s.workflow_mode)}
                      @click=${()=>Q("workflow_mode",fn)}
                    >
                      ${At.unset_label}
                    </button>
                    ${s.workflow_mode?"":c`<span class="settings-dialog__source-badge"
                          >기본</span
                        >`}
                    ${cs.map(ze=>c`<button
                          type="button"
                          data-mode=${ze}
                          aria-pressed=${String(s.workflow_mode===ze)}
                          @click=${()=>Q("workflow_mode",ze)}
                        >
                          ${ze}
                        </button>`)}
                  </span>
                </span>
              </div>
              ${je("bdui_url","beads-ui \uC8FC\uC18C","http://\uD638\uC2A4\uD2B8:3000","\uC138\uC158\uC774 Worker \uB808\uC778 \uBC30\uCE58\uB97C \uBB3C\uC5B4\uBCFC \uB54C \uC4F0\uB294 \uC8FC\uC18C\uC785\uB2C8\uB2E4","http:// \uB610\uB294 https:// \uB85C \uC2DC\uC791\uD558\uB294 \uC8FC\uC18C\uB9CC \uC800\uC7A5\uB429\uB2C8\uB2E4 (\uACBD\uB85C \uC5C6\uC774)",Id)}
              ${We("base_sync_accept_local_commits","base \uB3D9\uAE30\uD654","\uB85C\uCEEC base \uC0AC\uC6A9\uC790 \uCEE4\uBC0B \uC790\uB3D9 rebase+push","\uAEBC\uB450\uBA74 \uB85C\uCEEC base \uCCB4\uD06C\uC544\uC6C3\uC758 \uC0AC\uC6A9\uC790 \uCEE4\uBC0B\uC740 \uADF8\uB300\uB85C \uB0A8\uC2B5\uB2C8\uB2E4")}
            </div>

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">
                리뷰 게이트
                <span class="settings-dialog__hint">모델 · effort · 속도</span>
              </div>
              ${$e("\uC0AC\uC591 \uB9AC\uBDF0","spec","spec_review_model",us,"spec_review_effort","spec_review_speed")}
              ${$e("\uACC4\uD68D \uB9AC\uBDF0","plan","plan_review_model",Ci,"plan_review_effort","plan_review_speed")}
              ${$e("\uAD6C\uD604 \uB9AC\uBDF0","impl","impl_review_model",us,"impl_review_effort","impl_review_speed")}
            </div>

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">
                구현
                <span class="settings-dialog__hint"
                  >이슈 핀이 있으면 핀이 우선합니다</span
                >
              </div>
              ${Ce("impl_runtime","\uC704\uC784 \uB300\uC0C1",Ti,Q,s)}
              ${Ce("impl_model","\uBAA8\uB378",Co(E,U),Q,s)}
              ${Ce("impl_effort","effort",Yr(E,U,z),Q,s)}
              ${Ce("impl_speed","\uC18D\uB3C4",er,Q,s)}
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
              ${Ce("quick_fix_orchestration_model","\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uBAA8\uB378",xt.quick_fix_orchestration_model,ie,$t,!Bt,on,"quick_fix",Gt)}
              ${Ce("quick_fix_orchestration_effort","\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 effort",xt.quick_fix_orchestration_effort,ie,$t,!Bt,on,"quick_fix",Gt)}
              ${Ce("quick_fix_orchestration_speed","\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uC18D\uB3C4",er,ie,$t,!Bt,on,"quick_fix",Gt)}
              ${Ce("quick_fix_impl_dispatch","\uC2E4\uD589 \uBC29\uC2DD",ls,Q,s,!Bt,on,"quick_fix",Gt)}
              ${Ce("quick_fix_impl_runtime","\uC704\uC784 \uB300\uC0C1",U_,Q,s,!Bt,on,"quick_fix",Gt)}
              ${Ce("quick_fix_impl_model","\uBAA8\uB378",Ct,Q,s,!Bt,on,"quick_fix",Gt)}
              ${Ce("quick_fix_impl_effort","effort",jt,Q,s,!Bt,on,"quick_fix",Gt)}
              ${Ce("quick_fix_impl_speed","\uC18D\uB3C4",er,Q,s,!Bt,on,"quick_fix",Gt)}
            </div>

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">
                자동화
                <span class="settings-dialog__hint"
                  >이 레포의 워커 큐가 스스로 진행하는 범위</span
                >
              </div>
              ${Qe("auto_advance","\uC790\uB3D9\uD654","\uC2AC\uB86F\uC774 \uBE44\uBA74 \uB300\uAE30 \uC55E \uD589\uC774 \uCD9C\uBC1C\uD569\uB2C8\uB2E4",Ae?.auto_advance===!0)}
              ${Qe("auto_merge","\uBA38\uC9C0","\uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4",Ae?.auto_merge===!0)}
              ${ht("slots","\uB3D9\uC2DC \uC2E4\uD589",Ue,ze=>Oe(ze))}
              ${ht("serial-lane-count","\uC9C1\uB82C \uB808\uC778",L,ze=>nt(ze))}
            </div>
            ${re()}
          `}
    `}function Be(){I||lt(tt(),e)}return{load(){H={},P="general",l={},a={};let E=[le(),he()];return X||E.push(Ze()),Promise.all(E).then(()=>{})},render:Be,sessionDraft:()=>({...s}),destroy(){I=!0,lt(c``,e)}}}function Wa(e){return c`<svg
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
  </svg>`}function W_(){return Wa(ts`<path d="M5.5 3.6 12 8l-6.5 4.4z" />`)}function H_(){return Wa(ts`<path d="M6 3.8v8.4M10 3.8v8.4" />`)}function z_(){return Wa(ts`<path
      d="M4.6 5.6v4.8M4.6 8.2h2.2A3.2 3.2 0 0 0 10 5"
    />
    <circle cx="4.6" cy="4" r="1.5" />
    <circle cx="4.6" cy="12" r="1.5" />
    <circle cx="11.4" cy="4" r="1.5" />`)}function K_(){return Wa(ts`<circle cx="8" cy="8" r="2.1" />
    <path
      d="M8 1.9v1.8M8 12.3v1.8M1.9 8h1.8M12.3 8h1.8M3.7 3.7l1.3 1.3M11 11l1.3 1.3M12.3 3.7 11 5M5 11l-1.3 1.3"
    />`)}function G_(e){return`${e} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}function V_(e){let t=(Array.isArray(e)?e:[]).map(l=>l&&l.usage).filter(l=>l&&typeof l=="object"&&"providers"in l);if(t.length>0)return gn($i(t));let n={};for(let l of Jn)n[l]=0;let r=!1,o=0,i=0,s=0;for(let l of Array.isArray(e)?e:[]){let a=l&&l.usage;if(a&&typeof a=="object"){let u=!1;for(let d of Jn){let f=a[d];typeof f=="number"&&Number.isFinite(f)&&(n[d]+=f,r=!0,u=!0)}if(u){i+=1;let d=a.total_cost_usd;typeof d=="number"&&Number.isFinite(d)&&(o+=d,s+=1)}}}return i>0&&s===i&&(n.total_cost_usd=o),r?cr(n):null}function Vn(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function Uc(e,t){let n=Vn(e?.counts)?e.counts:null,r=n?n[t]:null;return typeof r=="number"&&Number.isFinite(r)?r:0}function kw(e,t){if(!Vn(t))return e;let n={...e};for(let[r,o]of Object.entries(t))o!==void 0&&(n[r]=o);return n}function ww(e){if(!Vn(e)||!Vn(e.execution_defaults)||!Vn(e.runner_catalog)||!Vn(e.session_defaults))return null;let t={...e.session_defaults};for(let s of["orchestration_model","orchestration_effort","orchestration_speed"])typeof e[s]=="string"&&e[s].length>0&&(t[s]=e[s]);let n=In({global:t,execution_defaults:e.execution_defaults,runner_catalog:e.runner_catalog}),r=Un(e.runner_catalog,n.orchestration_model.value??""),o=Oo(n,e.runner_catalog),i=Qr(n,r);return o===null&&i===null?null:{orchestration:o,worker:i}}function Y_(e,t){let n=t.notify||(V=>ye(V,"error",4e3)),r=document.createElement("div");r.className="mon2-deck__main",e.appendChild(r);let o=document.createElement("div");o.className="mon2-deck__panel",o.hidden=!0;let i=document.createElement("div");i.className="mon2-deck__panel-hd";let s=document.createElement("span");s.className="mon2-deck__panel-title";let l=document.createElement("button");l.type="button",l.className="mon2-deck__panel-close",l.setAttribute("aria-label","\uC2E4\uD589 \uC124\uC815 \uB2EB\uAE30"),l.textContent="\u2715",i.append(s,l);let a=document.createElement("div");a.className="mon2-deck__panel-body",o.append(i,a),e.appendChild(o);let u=null,d=null,f=null,_=new Map;function y(){let V=t.workspacesState?t.workspacesState():[];return Array.isArray(V)?V.filter(le=>Vn(le)):[]}function g(V){return y().find(le=>le.root_dir===V)||null}function C(V){return kw(g(V),_.get(V))}function k(){for(let V of y()){let le=_.get(V.root_dir);le&&typeof le.revision=="number"&&typeof V.revision=="number"&&V.revision>=le.revision&&_.delete(V.root_dir)}}async function X(V,le,ee){let M=t.transport,oe=C(le);if(!(!M||!Vn(oe))){try{let se=await M(V,{...ee,root_dir:le,expected_revision:oe.revision});if(Vn(se?.queue)&&_.set(le,se.queue),se&&se.conflict){let he=Vn(se.queue)&&typeof se.queue.revision=="number"?se.queue.revision:C(le)?.revision;se=await M(V,{...ee,root_dir:le,expected_revision:he}),Vn(se?.queue)&&_.set(le,se.queue)}}catch(se){n(`\uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${se instanceof Error?se.message:String(se)}`)}te()}}function ae(V){u!==V&&(u=V,t.onFocusChange?.(u),te())}function H(V){ae(u===V?null:V)}function N(V){if(d===V){j();return}P(),d=V;let le=g(V);s.textContent=`${le?.name||V} \uC2E4\uD589 \uC124\uC815 \xB7 Worker \uD0ED \u2699 \uC2E4\uD589 \uD0ED\uACFC \uAC19\uC740 \uC800\uC7A5\uC18C`,o.hidden=!1,f=Ua(a,{root_dir:V,queue:()=>C(V),transport:t.transport,implPresetStore:t.implPresetStore,notify:n,onQueueAdopt:ee=>{_.set(V,ee),te()}}),f.load(),te()}function P(){f?.destroy(),f=null}function j(V){P(),d=null,o.hidden=!0,s.textContent="",V!==!0&&te()}let B=()=>j();l.addEventListener("click",B);function W(V){V.key==="Escape"&&u!==null&&ae(null)}document.addEventListener("keydown",W);function T(V,le){let ee=Math.max(le,V,1);return c`<span
      class="mon2-deck__rail"
      role="img"
      aria-label=${`\uC2AC\uB86F ${le}\uAC1C \uC911 ${V}\uAC1C \uC2E4\uD589 \uC911`}
    >
      ${Array.from({length:ee},(M,oe)=>oe<V?c`<i class="mon2-deck__slot is-run"></i>`:c`<i class="mon2-deck__slot"></i>`)}
    </span>`}function S(V){let le=V.auto_advance===!0,ee=V.auto_merge===!0;return c`<button
        type="button"
        class=${`mon2-deck__op mon2-deck__auto${le?" is-on":""}`}
        data-act="auto"
        aria-pressed=${le?"true":"false"}
        aria-label=${`${V.name} \uC790\uB3D9\uD654`}
        title=${le?"\uC790\uB3D9\uD654 \uCF1C\uC9D0 \u2014 \uC2AC\uB86F\uC774 \uBE44\uBA74 \uB2E4\uC74C \uD589\uC774 \uCD9C\uBC1C\uD569\uB2C8\uB2E4":"\uC790\uB3D9\uD654 \uAEBC\uC9D0 \u2014 \uB2E4\uC74C \uD589\uC740 \uC218\uB3D9\uC73C\uB85C\uB9CC \uCD9C\uBC1C\uD569\uB2C8\uB2E4"}
      >
        ${le?H_():W_()}
      </button>
      <button
        type="button"
        class=${`mon2-deck__op mon2-deck__merge${ee?" is-on":""}`}
        data-act="merge"
        aria-pressed=${ee?"true":"false"}
        aria-label=${`${V.name} \uC790\uB3D9 \uBA38\uC9C0`}
        title=${ee?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0"}
      >
        ${z_()}
      </button>
      <button
        type="button"
        class=${`mon2-deck__op mon2-deck__gear${d===V.root_dir?" is-on":""}`}
        data-act="gear"
        aria-expanded=${d===V.root_dir?"true":"false"}
        aria-label=${`${V.name} \uC2E4\uD589 \uC124\uC815`}
        title="이 레포의 실행 설정"
      >
        ${K_()}
      </button>`}function I(V){let le=ww(V);return le?c`<div class="mon2-deck__chips">
      ${le.orchestration?c`<span class="mon2-deck__chip" title=${le.orchestration.title}
            >오케 ${le.orchestration.text}</span
          >`:""}
      ${le.worker?c`<span class="mon2-deck__chip" title=${le.worker.title}
            >워커 ${le.worker.text}</span
          >`:""}
    </div>`:""}function O(V){let le=[];for(let[ee,M]of[["queue","\uB300\uAE30"],["pr_wait","PR"],["session_active","\uC138\uC158"]]){let oe=Uc(V,ee);oe>0&&le.push(`${M} ${oe}`)}return le.join(" \xB7 ")}function J(V){let le=Uc(V,"running"),ee=typeof V.slots=="number"?V.slots:1;return c`<div
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
          title=${`\uC2AC\uB86F ${ee}\uAC1C \uC911 ${le}\uAC1C \uC2E4\uD589 \uC911`}
        >
          <span class="mon2-deck__load-n">${le}/${ee}</span>
          ${T(le,ee)}
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
        <div class="mon2-deck__ops">${S(V)}</div>
        <span class="mon2-deck__counts">${O(V)}</span>
        ${I(V)}
      </div>
    </div>`}function ce(V){let le=t.doneItems?t.doneItems():[],ee=t.rangeLabel?t.rangeLabel():"",M=V_(Array.isArray(le)?le:[]),oe=se=>V.reduce((he,xe)=>he+Uc(xe,se),0);return c`<div class="mon2-deck__bar">
      <span
        class="mon2-deck__total-counts"
        title=${`visible \uB808\uD3EC ${V.length}\uACF3\uC758 \uD569\uACC4\uC785\uB2C8\uB2E4 \u2014 \uC2E4\uD589\xB7\uB300\uAE30\xB7PR\uC740 \uC9C0\uAE08, \uC644\uB8CC\uB294 ${ee}`}
        >실행 ${oe("running")} · 대기 ${oe("queue")} · PR
        ${oe("pr_wait")}${oe("session_active")>0?` \xB7 \uC138\uC158 ${oe("session_active")}`:""}
        · ${ee} 완료
        ${Array.isArray(le)?le.length:0}</span
      >
      ${M===null?"":c`<span class="mon2-deck__total-tokens">
            ${typeof M=="string"?c`<span
                  class="mon2-deck__tok"
                  title=${G_(ee)}
                  >${M}</span
                >`:M.map(se=>c`<span
                      class="mon2-deck__tok"
                      data-provider=${se.provider}
                      title=${se.tooltip}
                      >${se.label}</span
                    >`)}
          </span>`}
    </div>`}function Se(){let V=y();return V.length===0?"":c`${ce(V)}
      <div class="mon2-deck__strip">
        ${V.map(le=>J(le))}
      </div>`}function K(){u!==null&&!g(u)&&(u=null,t.onFocusChange?.(null))}function te(){k(),K(),d!==null&&!g(d)&&j(!0),lt(Se(),r),f?.render()}function fe(V){let le=V.target;if(!le||typeof le.closest!="function")return;let ee=le.closest("[data-root-dir]");if(!ee)return;let M=ee.getAttribute("data-root-dir")||"",oe=le.closest("[data-act]")?.getAttribute("data-act");if(oe==="worker"){t.gotoWorkerTab?.(M);return}if(oe==="auto"){X("worker-automation-toggle",M,{on:C(M)?.auto_advance!==!0});return}if(oe==="merge"){X("worker-merge-auto-toggle",M,{on:C(M)?.auto_merge!==!0});return}if(oe==="gear"){N(M);return}H(M)}function Re(V){if(V.key!=="Enter"&&V.key!==" ")return;let le=V.target;if(!le||typeof le.closest!="function")return;let ee=le.closest('[data-root-dir][role="button"]');!ee||ee!==le||(V.preventDefault(),H(ee.getAttribute("data-root-dir")||""))}return r.addEventListener("click",fe),r.addEventListener("keydown",Re),{render:te,focusRoot:()=>u,panelRoot:()=>d,destroy(){document.removeEventListener("keydown",W),r.removeEventListener("click",fe),r.removeEventListener("keydown",Re),l.removeEventListener("click",B),P(),lt(c``,r),e.replaceChildren()}}}var $w=1e4,Z_="bdui.monitor.done-range",J_="bdui.monitor.running_sort",em="bdui.monitor.candidate_sort",tm="beads-ui.monitor.candidate-filter",nm="beads-ui.monitor.sections";function xw(){try{let e=window.localStorage.getItem(tm);if(!e)return{...No};let t=JSON.parse(e);return!t||typeof t!="object"?{...No}:{show_blocked:typeof t.show_blocked=="boolean"?t.show_blocked:No.show_blocked,readiness:Ss.some(n=>n.value===t.readiness)?t.readiness:"all",routes:ro(t.routes)}}catch{return{...No}}}function Wc(e){try{window.localStorage.setItem(tm,JSON.stringify({show_blocked:e.show_blocked,readiness:e.readiness,routes:e.routes}))}catch{}}function Aw(){try{let e=window.localStorage.getItem(em);return As.some(t=>t.value===e)?e:"repo_spec"}catch{return"repo_spec"}}function Sw(e){try{window.localStorage.setItem(em,e)}catch{}}function Ew(){try{let e=window.localStorage.getItem(nm);if(!e)return{};let t=JSON.parse(e);return t&&typeof t=="object"?t:{}}catch{return{}}}function Tw(e){try{window.localStorage.setItem(nm,JSON.stringify(e))}catch{}}function Cw(){try{let e=window.localStorage.getItem(Z_);return e===null?"today":Qn(e)}catch{return"today"}}function Rw(e){try{window.localStorage.setItem(Z_,e)}catch{}}function Ow(){try{return window.localStorage.getItem(J_)==="repo"?"repo":"started"}catch{return"started"}}function Iw(e){try{window.localStorage.setItem(J_,e)}catch{}}var rm="tab:monitor:pipeline",Lw=1e3,Q_=[{lane:"runnable",pane:"candidate",title:"\uD6C4\uBCF4",empty:"\uC2E4\uD589 \uC790\uACA9\uC744 \uAC16\uCD98 \uC774\uC288 \uC5C6\uC74C"},{lane:"queue",pane:"queue",title:"\uB300\uAE30",empty:"\uD45C\uC2DC\uD560 \uB808\uD3EC \uC5C6\uC74C"},{lane:"running",pane:"running",title:"\uC2E4\uD589 \uC911",empty:"\uC2E4\uD589 \uC911 \uC5C6\uC74C"},{lane:"pr_wait",pane:"pr_wait",title:"PR \uB300\uAE30",empty:"PR \uC5C6\uC74C"},{lane:"done",pane:"done",title:"\uC644\uB8CC",empty:"\uC644\uB8CC \uAE30\uB85D \uC5C6\uC74C"}],Dw=["queue","runnable","done"],X_="\u2460\u2461\u2462\u2463\u2464\u2465\u2466\u2467\u2468\u2469\u246A\u246B\u246C\u246D\u246E\u246F\u2470\u2471\u2472\u2473";function Pw(e){return e>=1&&e<=X_.length?X_[e-1]:`(${e})`}function om(e,t){let n=Ht("views:monitor"),r=t.gotoIssue,o=t.pipelineStore,i=t.transport,s=t.getWorkspacePath,l=t.openDoc,a=t.switchWorkspace,u=t.router,d=t.now||(()=>Date.now()),f=t.confirm||(b=>typeof globalThis.confirm!="function"||globalThis.confirm(b)),_=Cw(),y=Ow(),g=xw(),C=Aw(),k=Ew(),X=Ia("beads-ui.monitor.lane-collapsed"),ae=!1,H=null,N=null,P=null,j=null,B=null,W=null,T=Io(()=>z()),S=null,I=null,O=null,J=null;function ce(b){return J===null&&(J=Q()),sf(b,J)}function Se(b,p){K(),!(p<=0)&&(I={lane_id:b,corrected:p},O=setTimeout(()=>{O=null,I=null,z()},$w))}function K(){O!==null&&(clearTimeout(O),O=null),I=null}function te(){let b=fo.find(p=>p.value===_);return b?b.label:""}let fe=document.createElement("div");fe.className="mon",e.appendChild(fe);let Re=document.createElement("div");Re.className="worker-drawer-overlay",Re.hidden=!0;let V=document.createElement("div");V.className="worker-drawer-overlay__backdrop";let le=document.createElement("div");le.className="worker-drawer-host mon2-drawer",Re.append(V,le),e.appendChild(Re);let ee=Cr(null,null),M=new Map,oe=new Map,se=new Set,he=null,xe=null,Ze=null,G=Ho(le,{transport:i,sessionLogStore:t.sessionLogStore,onClose:()=>{N=null,Re.hidden=!0,z()}}),ge=Da({transport:i,console_el:fe,getLanes:()=>ee,getWorkspaces:()=>o&&o.get?o.get():null,getCrossLanes:sn,reproject:b=>({lanes:U(b),raw_lanes:b}),onCorrection:Se,showToast:ye,requestRender:()=>z(),adoptQueue:(b,p)=>{oe.set(b,p)},onDragBegin:()=>{P=null},candidate_drop:!0}),{applyDrop:ue,dropModel:Q,runPlanned:Ee,sendQueueCas:be}=ge;async function Le(b,p,m,w,Y=!0){if(!i||!m)return null;let ne=await i(b,{...p,root_dir:m,expected_revision:w});if(ne&&ne.conflict&&Y){ne.queue&&oe.set(m,ne.queue);let _e=ne.queue&&typeof ne.queue.revision=="number"?ne.queue.revision:w;ne=await i(b,{...p,root_dir:m,expected_revision:_e})}return ne&&ne.queue&&m&&oe.set(m,ne.queue),ne}function qe(b){let p=oe.get(b);if(p)return p;let m=o&&o.get?o.get():null;return(Array.isArray(m)?m:[]).find(w=>w?.root_dir===b)||{}}function Je(b,p){return qe(b)?.merge_queue?.find(w=>w.bead_id===p)?.continuation_action}async function He(b,p,m,w){let Y=await Le(b,p,m,w),ne=oe.get(m)?.revision??Y?.queue?.revision??w;return Or(Y,(_e,Pe)=>Le(b,{...p,continuation:_e,decision_token:Pe},m,ne,!1),{refresh:_e=>Le(b,p,m,_e?.queue?.revision??oe.get(m)?.revision??ne,!1)})}async function ie(b,p,m,w){let Y=await Or({continuation_mismatch:w},(_e,Pe)=>Le("worker-merge-queue-add",{bead_id:p,continuation:_e,decision_token:Pe},b,m,!1)),ne=Y?.queue?.merge_queue?.find(_e=>_e.bead_id===p)?.continuation_action;Y?.applied!==!0&&ne?.continuation===null&&ne.mismatch&&await ie(b,p,Y.queue.revision,ne.mismatch)}async function Z(b,p,m){let w=await Le("worker-discard",b,p,m);if(w&&w.discarded===!0){ye(zi(w),"success",5e3);return}if(w&&w.reason){ye(`\uD3D0\uAE30 \uC2E4\uD328: ${w.reason}`,"error");return}if(w&&w.accepted&&w.pending==="merged_revert"){ye("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success");return}if(w&&w.accepted){ye(`\uD3D0\uAE30 \uC9C4\uD589: ${w.phase||"\uBC31\uC5C5 \uC911"}`,"success");return}w&&!w.conflict&&ye("\uD3D0\uAE30 \uAC70\uBD80: unknown","error")}async function Oe(b,p,m,w){let Y=await Le("worker-discard-abandon",b,p,m);if(Y&&Y.abandoned===!0){ye(Hi(w),"success",5e3);return}if(Y&&Y.reason){ye(`\uD3D0\uAE30 \uD3EC\uAE30 \uAC70\uBD80: ${Y.reason}`,"error");return}Y&&!Y.conflict&&ye("\uD3D0\uAE30 \uD3EC\uAE30 \uAC70\uBD80: unknown","error")}async function nt(b,p,m){return!i||!m?null:await i(b,{...p,root_dir:m})}async function pt(b,p,m){if(!se.has(b)){se.add(b),z();try{let w=await Le("worker-resolve-in-session",{bead_id:b},p,m,!1);w?.session==="already_running"?ye(`\uC774\uBBF8 \uC5F4\uB824 \uC788\uC2B5\uB2C8\uB2E4 \xB7 ${w.tmux_window||"?"}`,"error"):w?.launched!==!0?ye(`\uC138\uC158 \uAE30\uB3D9 \uC2E4\uD328: ${w?.reason||"unknown"}`,"error"):w.mode!=="fork"&&ye(`\uC0C8 \uC138\uC158\uC73C\uB85C \uC2DC\uC791 (${w.fallback_reason||"unknown"})`,"success")}finally{se.delete(b),z()}}}async function Ye(){let b=new Map;for(let p of ee.pr_wait)b.has(p.root_dir)||b.set(p.root_dir,p.expected_revision);for(let[p,m]of b)await Le("worker-merge-queue-add-all",{},p,m)}function _t(b){let p=k[b];return!!(p&&p.runnable===!0)}function Pt(b){let p={...k[b]||{}};p.runnable=!p.runnable,k={...k,[b]:p},Tw(k),z()}function Et(b){X.toggle(b),z()}function rt(b){X.toggleArea(b),z()}function gt(b){let p=b.dependency_chips||null,m=b.overlap_chips||[],w=b.scope_state==="missing",Y=b.armed_lane_chip;return!p&&m.length===0&&!w&&!Y?null:{...p||{},...m.length>0?{overlaps:m}:{},...w?{scope_missing:!0}:{},...Y?{armed_lane:Y}:{}}}function Zt(b){return Xi(b,p=>T.isOpen({bead_id:b.id,chip_key:p}))}function x(b){let p=gt(b),m=Zt(b);return p||m?{...b,...p?{dependency_chips:p}:{},...m?{chip_popover:m}:{}}:b}function re(b){let p=_t(b.root_dir);return c`<header class="mon2-sec__hd">
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
    </header>`}function Ne(b,p){return c`<div
      class="mon2-item"
      data-bead-id=${b.id}
      data-drag-kind="candidate"
      data-root-dir=${b.root_dir}
    >
      ${p}
    </div>`}function Ce(b){if(P!==b.id)return null;let p=ee.queue_groups.find(ne=>ne.root_dir===b.root_dir),m=b.place_lanes||[],w=ee.cross_lanes_revision!==null,Y=[{id:"parallel",label:"\uBCD1\uB82C",count:b.place_index??0}];for(let ne of ee.chain_lanes)Y.push({id:`lane:${ne.lane_id}`,label:`\uC5F0\uACB0 ${ne.number} (${ne.draft?"draft":"\uD655\uC815"}) \uB05D\uC5D0`,count:ne.rows.length,group:"\uC5F0\uACB0 \uB808\uC778",disabled:!w});Y.push({id:"new-lane",label:"+ \uC0C8 \uC5F0\uACB0 \uB808\uC778",group:"\uC5F0\uACB0 \uB808\uC778",disabled:!w,title:w?"\uC774 \uC774\uC288\uB9CC \uB4E0 draft \uB808\uC778\uC744 \uB9CC\uB4ED\uB2C8\uB2E4":"\uC5F0\uACB0 \uB808\uC778 \uC800\uC7A5\uC18C\uB97C \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"});for(let ne of m)Y.push({id:`serial:${ne.id}`,label:`\uC9C1\uB82C ${Number(ne.id.slice(1))}`,count:ne.length,group:`${p?p.name:""} \uC9C1\uB82C`});return{bead_id:b.id,lanes:Y}}function je(b){return Ne(b,c`${Nl(x(b),Ce(b),{exec_chips_mode:"pinned_only",onOpenDoc:l?(p,m)=>l(m,b.root_dir):void 0})}`)}function We(){return ee.runnable_flat?c`<div class="mon2-flat" data-drop="candidate">
        ${ee.runnable.map(b=>je(b))}
      </div>`:c`${ee.runnable_sections.map(b=>{let p=_t(b.root_dir);return c`<section
        class="mon2-sec${p?" is-collapsed":""}"
        data-root-dir=${b.root_dir}
        data-section="runnable"
      >
        ${re({root_dir:b.root_dir,name:b.name,count:b.items.length})}
        ${p?"":c`<div
              class="mon2-sec__body"
              data-lane="candidate"
              data-drop="candidate"
            >
              ${b.items.map(m=>je(m))}
            </div>`}
      </section>`})}`}function ct(b,p){return c`<div
      class="mon2-item"
      data-bead-id=${b.id}
      data-drag-kind="parallel"
      data-root-dir=${b.root_dir}
      data-row-index=${p}
      data-queue-index=${String(b.queue_index??0)}
    >
      ${Wn(x(b),{actions:Mo(b,{nudgeable:!0})})}
    </div>`}function It(b,p,m,w){return c`<div
      class="mon2-crow${p.fixed?" mon2-crow--fixed":""}"
      draggable=${p.draggable?"true":"false"}
      data-bead-id=${p.id}
      data-drag-kind="chain"
      data-root-dir=${p.root_dir}
      data-lane-id=${b.lane_id}
      data-row-index=${m}
      data-queue-index=${typeof p.queue_index=="number"?String(p.queue_index):""}
    >
      <span class="mon2-crow__seq" aria-hidden="true"
        >${Pw(p.seq)}</span
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
      ${w.includes(p.id)?c`<span
            class="mon2-crow__mismatch"
            title="이미 실행된 뒤 의존이 바뀌었습니다 — 이 행은 움직일 수 없어 교정하지 않습니다"
            >⚠ 의존 순서와 다름</span
          >`:""}
      <span class="mon2-crow__where" title=${p.location_title}
        >${p.location_label}</span
      >
      ${to(p.route?{route:p.route,route_source:p.route_source??void 0}:null)}${p.exec_chips?eo(p.exec_chips):""}
      ${Il(p.added_at)}
      ${Ll({id:p.id,...typeof p.added_at=="number"?{added_at:p.added_at}:{}})}
      <button
        type="button"
        class="mon2-crow__detach"
        data-bead-id=${p.id}
        title="연결에서 빼고 앞뒤를 이어 붙입니다"
        aria-label="연결에서 빼기"
      >
        ✕
      </button>
    </div>`}function pe(b){let p=ee.cross_lanes_revision!==null,m=ce(b.lane_id),w=m?.held===!0,Y=m?.cycle===!0,ne=m?m.mismatched:[],_e=I&&I.lane_id===b.lane_id?I.corrected:0;return c`<div class="mon2-clane" data-lane-id=${b.lane_id}>
      <header class="mon2-clane__hd">
        <span class="mon2-clane__name">${b.label}</span>
        <span class="mon2-clane__count">${b.rows.length}</span>
        <span class="mon2-clane__badge mon2-clane__badge--${b.state}"
          >${b.badge}</span
        >
        ${_e>0?c`<span
              class="mon2-clane__corrected"
              title="기존 blocks 의존이 드롭 순서를 이깁니다 — 그 순서로 다시 놓았습니다"
              >의존에 맞춰 ${_e}건 자동 교정</span
            >`:""}
        ${Y?c`<span
              class="mon2-clane__cycle"
              title="멤버들의 blocks 의존이 순환합니다 — 어느 순서도 의존을 만족시키지 못합니다"
              >⛔ 의존 사이클 — 자동 교정 불가</span
            >`:""}
        ${w?c`<span
              class="mon2-clane__hold"
              title="멤버 한 명의 의존 자료가 이 스냅샷에 아직 없습니다 — 다음 스냅샷이 채우면 교정합니다"
              >${ua}</span
            >`:""}
        ${b.draft?c`<button
              type="button"
              class="mon2-clane__confirm"
              data-lane-id=${b.lane_id}
              ?disabled=${!p||!b.can_confirm||w}
              title=${w?ua:b.can_confirm?"\uC778\uC811 \uC758\uC874\uC744 \uAC78\uACE0 \uBBF8\uC801\uC7AC \uBA64\uBC84\uB97C \uAC01\uC790 \uB808\uD3EC \uBCD1\uB82C \uD050 \uB05D\uC5D0 \uC62C\uB9BD\uB2C8\uB2E4":"\uBA64\uBC84\uAC00 2\uAC1C \uC774\uC0C1\uC774\uC5B4\uC57C \uD655\uC815\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4"}
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
            </div>`:b.rows.map((Pe,wt)=>It(b,Pe,wt,ne))}
      </div>
    </div>`}function $e(b,p,m){return c`<div
      class="mon2-item"
      data-bead-id=${p.id}
      data-drag-kind="repo-serial"
      data-root-dir=${p.root_dir}
      data-lane-id=${b.id}
      data-row-index=${m}
      data-queue-index=${String(p.queue_index??0)}
    >
      ${Wn(x(p),{actions:Mo(p)})}
    </div>`}function Qe(b){if(b.length===0)return"";let p=b.length-1;return`${b[0].id} \uC810\uC720${p>0?` +${p}`:""}`}function ht(b){return c`<div
      class="mon2-item mon2-item--ghost"
      data-bead-id=${b.id}
    >
      ${Wn({id:b.id,title:b.title,lane:"running",draggable:!1,ghost:!0,badges:[b.badge]})}
    </div>`}function st(b,p){let m=p.occupants,w=p.cross_wait_peers||[];return{id:p.id,pane_id:"",title:`${b.name} \xB7 \uC9C1\uB82C ${p.index+1}`,rows:[...m.map(Y=>ht(Y)),...p.items.map((Y,ne)=>$e(p,Y,ne))],count:p.items.length,empty:p.empty===!0,...m.length>0?{badge:c`<span
              class="mon2-lane__occupant"
              title=${m.map(Y=>`${Y.id} \u2014 ${Y.badge}`).join(`
`)}
              >${Qe(m)}</span
            >`,held:!0}:{},cycle:p.cycle,header_control:c`<button
        type="button"
        class="mon2-sec__worker"
        data-root-dir=${b.root_dir}
        title="이 레포의 Worker 탭으로 이동"
      >
        Worker ↗
      </button>`,...w.length>0?{after:c`${w.map(Y=>c`<div class="mon2-lane__cross-wait">
                  ⚠ 상호 정지 — ${Y.workspace_name}·${Y.lane}과 교차 대기
                </div>`)}`}:{}}}function ut(){let b=ee.cross_lanes_revision!==null,p=ee.chain_lanes.some(m=>m.draft&&m.rows.length===0);return Zi({parallel:{rows:ee.parallel_rows.map((m,w)=>ct(m,w)),count:ee.parallel_rows.length,collapsed:X.isAreaCollapsed("parallel"),drop:{drop:"parallel"}},serial:{lanes:ee.queue_groups.flatMap(m=>m.sublanes.serial.map(w=>({...st(m,w),drop:{drop:"repo-serial",root_dir:m.root_dir,lane_id:w.id,lane_length:String(w.raw_length)}}))),collapsed:X.isAreaCollapsed("serial"),extra_panes:ee.chain_lanes.map(m=>pe(m)),header_control:c`<button
          type="button"
          class="mon2-newlane"
          ?disabled=${p||!b}
          title=${b?p?"\uBE48 \uC5F0\uACB0 \uB808\uC778\uC774 \uC774\uBBF8 \uC788\uC2B5\uB2C8\uB2E4":"\uBE48 \uC5F0\uACB0 \uB808\uC778\uC744 \uD558\uB098 \uB9CC\uB4ED\uB2C8\uB2E4":"\uC5F0\uACB0 \uB808\uC778 \uC800\uC7A5\uC18C\uB97C \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"}
        >
          + 연결 레인
        </button>`,...ee.cross_lanes_unreadable?{notice:c`<div class="mon2-clane__unreadable">
                연결 레인 저장소를 읽을 수 없음
              </div>`}:{}}})}function vt(b){return c`<div class="worker-rungrid">
      ${ee.running.length===0?c`<div class="worker-rungrid__empty">실행 세션 없음</div>`:ee.running.map(p=>Bc({bead_id:p.id,attempt_id:p.attempt_id||"",title:p.title,runner:p.runner??null,model:p.model??null,effort:p.effort??null,speed:p.speed??null,started_at:p.started_at??null,kind:p.kind,...p.kind==="session"?{updated_at:p.updated_at,session_refs:p.session_refs||[]}:{},workflow:p.workflow||null,resumed_from:p.resumed_from??null,continuation_mode:p.continuation_mode??null,paused:p.run_state==="paused",failed:p.run_state==="failed",parked:p.run_state==="parked",retry_wait:p.run_state==="retry_wait",waiting:p.run_state==="waiting",wait:p.wait||null,provider_hold:p.run_state==="provider_hold",hold:p.hold?{...p.hold,open:B===p.attempt_id}:null,retry:p.retry||null,status:p.status,status_label:p.run_state==="failed"?"\uC2E4\uD328":p.run_state==="parked"?"\uC138\uC158 \uB300\uAE30":p.run_state==="retry_wait"?"\uC7AC\uC2DC\uB3C4 \uB300\uAE30":p.run_state==="waiting"?"\uC120\uD589 \uB300\uAE30":p.run_state==="provider_hold"?"\uACF5\uAE09\uC790 \uBCF4\uB958":void 0,can_pause:p.can_pause!==!1,exec_chips:p.exec_chips||null,usage:p.usage||null,chip_popover:Zt(p),discard:p.discard,failure:p.failure?{...p.failure,open:j===p.attempt_id}:null,...Go(p.id,{discard:p.discard,parked:p.run_state==="parked"},se.has(p.id))},b,N,{monitor:{repo:p.workspace_name,root_dir:p.root_dir,serial_lane_id:p.serial_lane_id,cross_lane_chip:p.cross_lane_chip||null,last_activity:p.last_activity||null,legs:p.legs||[],dependency_chips:gt(p)}}))}
    </div>`}function tt(b){let p={runnable:ee.runnable,queue:ee.queue,running:ee.running,pr_wait:ee.pr_wait,done:ee.done},m=w=>{let Y=p[w.lane],ne=w.lane==="runnable"?ee.runnable_flat?Y.length>0?We():void 0:ee.runnable_sections.length>0?We():void 0:w.lane==="queue"?ee.queue_groups.length>0||ee.chain_lanes.length>0||ee.parallel_rows.length>0||ee.cross_lanes_unreadable?ut():void 0:w.lane==="running"?vt(b):Y.length>0?c`${Y.map(_e=>Wn(x(_e)))}`:void 0;return tr({id:`monitor-${w.lane}`,lane:w.pane,title:w.title,items:Y,count:Y.length,src:w.lane==="runnable",empty:w.empty,body:ne,live:w.lane==="running"&&Y.length>0,collapsible:!0,collapsed:X.isCollapsed(w.pane),controls:w.lane==="runnable"?Be():void 0,header_control:E(w.lane,Y.length)})};if(ae){let w=Dw.map(Y=>Q_.find(ne=>ne.lane===Y)).filter(Y=>Y!==void 0);return c`<div class="mon2-deck"></div>
        <div class="worker-lanes-host">
          <div class="worker-lanes worker-lanes--mobile mon2-lanes">
            ${Ji({live:ee.running.length>0,running_body:ee.running.length>0?vt(b):"",pr_wait_rows:ee.pr_wait.map(Y=>Wn(x(Y))),count:ee.running.length+ee.pr_wait.length})}
            ${w.map(Y=>m(Y))}
          </div>
        </div>
        ${Ko(W?.draft||null,W?qe(W.root_dir):{})}`}return c`<div class="mon2-deck"></div>
      <div class="worker-lanes-host">
        <div class="worker-lanes mon2-lanes">
          ${Q_.map(w=>m(w))}
        </div>
      </div>
      ${Ko(W?.draft||null,W?qe(W.root_dir):{})}`}function Be(){return c`<div class="worker-filter">
      <label class="worker-filter__tgl" title="blocked 이슈 표시">
        <input
          type="checkbox"
          class="mon-filter__blocked"
          .checked=${g.show_blocked}
        />
        🔒
        blocked${ee.runnable_hidden.blocked>0?` ${ee.runnable_hidden.blocked}`:""}
      </label>
      <div
        class="worker-filter__readiness"
        role="group"
        aria-label="준비도 필터"
      >
        ${Ss.map(b=>c`<button
              type="button"
              class="mon-filter__readiness worker-filter__chip${g.readiness===b.value?" is-active":""}"
              data-readiness=${b.value}
              aria-pressed=${g.readiness===b.value?"true":"false"}
            >
              ${b.label}
            </button>`)}
        ${ee.runnable_hidden.readiness>0?c`<span class="worker-filter__hidden"
              >숨김 ${ee.runnable_hidden.readiness}</span
            >`:""}
      </div>
      <div class="worker-filter__routes" role="group" aria-label="route 필터">
        ${oo.map(b=>c`<button
              type="button"
              class="mon-filter__route worker-filter__chip${g.routes.includes(b.value)?" is-active":""}"
              data-route=${b.value}
              aria-pressed=${g.routes.includes(b.value)?"true":"false"}
            >
              ${b.label}
            </button>`)}
        ${ee.runnable_hidden.route>0?c`<span class="worker-filter__hidden"
              >숨김 ${ee.runnable_hidden.route}</span
            >`:""}
      </div>
    </div>`}function E(b,p){return b==="runnable"?c`<select
        class="mon-candidate-sort worker-sort"
        aria-label="후보 정렬"
        title="후보 정렬"
        .value=${C}
      >
        ${As.map(m=>c`<option
              value=${m.value}
              ?selected=${C===m.value}
            >
              ${m.label}
            </option>`)}
      </select>`:b==="running"?c`<select
        class="mon-running-sort worker-sort"
        aria-label="실행중 정렬"
        title="실행중 정렬"
        .value=${y}
      >
        <option value="started" ?selected=${y==="started"}>
          시작순
        </option>
        <option value="repo" ?selected=${y==="repo"}>
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
        .value=${_}
      >
        ${fo.map(m=>c`<option value=${m.value} ?selected=${_===m.value}>
              ${m.label}
            </option>`)}
      </select>`:""}function U(b){let p=o&&o.get?o.get():null,m=o&&o.getWorkspacesState?o.getWorkspacesState():[],w=b===void 0?o&&o.crossLanes?o.crossLanes():void 0:b,Y={done_since:Kr(_,d()),running_sort:y,candidate_filter:g,candidate_sort:C};return w!==void 0&&(Y.cross_lanes=w),Cr(p,m,Y)}function z(){let b=d();ee=U(),J=null,M=new Map;for(let p of[...ee.runnable,...ee.queue,...ee.running,...ee.pr_wait,...ee.done])!p.non_occupying&&!M.has(p.id)&&M.set(p.id,p);lt(tt(b),fe),qa(fe),Ae()?.render(),ve(),$t()}function ve(){let b=new Map;for(let p of ee.queue_groups)b.set(p.root_dir,p.auto_advance);for(let p of Array.from(fe.querySelectorAll(".worker-wait__area--parallel .worker-mini__repo"))){let m=p.closest(".mon2-item")?.getAttribute("data-root-dir")||"",w=b.get(m);typeof w=="boolean"&&p.setAttribute("title",`${p.textContent||""} \xB7 ${w?"\uC790\uB3D9\uD654 \uCF1C\uC9D0":"\uC790\uB3D9\uD654 \uAEBC\uC9D0"}`)}}function Ae(){if(Ze)return Ze;let b=fe.querySelector(".mon2-deck");return b?(Ze=Y_(b,{workspacesState:()=>o&&o.getWorkspacesState?o.getWorkspacesState():[],doneItems:()=>ee.done,rangeLabel:te,transport:i,implPresetStore:t.execPresetStore,gotoWorkerTab:Ct,onFocusChange:p=>{S=p,$t()}}),Ze):null}function $t(){fe.classList.toggle("has-focus",S!==null);for(let b of Array.from(fe.querySelectorAll(".mon2-sec[data-root-dir]")))b.classList.toggle("is-focus",S!==null&&b.getAttribute("data-root-dir")===S);for(let b of Array.from(fe.querySelectorAll(".mon2-item[data-bead-id], .rtile[data-bead-id], .worker-mini[data-bead-id], .worker-card[data-bead-id]"))){let p=M.get(b.getAttribute("data-bead-id")||"");b.classList.toggle("is-focus",S!==null&&!!p&&p.root_dir===S)}for(let b of Array.from(fe.querySelectorAll(".mon2-crow[data-root-dir]")))b.classList.toggle("is-focus",S!==null&&b.getAttribute("data-root-dir")===S)}function kt(b,p){let m=s?s():void 0;if(!p||!m||p===m||!a){r(b);return}a(p).then(()=>{r(b)}).catch(w=>{n("workspace switch for %s failed: %o",p,w)})}function Ct(b){if(!b)return;let p=s?s():void 0,m=()=>{try{u?.gotoView("worker")}catch(w){n("gotoView(worker) failed: %o",w)}};if(!a||p&&p===b){m();return}a(b).then(m).catch(w=>{n("workspace switch for %s failed: %o",b,w),ye("\uB808\uD3EC \uC804\uD658\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error")})}function jt(b){$n(b).then(p=>{ye(p?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",p?"success":"error",1400)})}function Wt(b){let p=M.get(b)||null;return{item:p,root_dir:p?p.root_dir:"",revision:p?p.expected_revision:0}}async function Qt(b,p,m){if(b!=="dep-add")return;let w=ee.chain_lanes.find(Y=>Y.rows.some(ne=>ne.id===p));!w||!w.rows.some(Y=>Y.id===m)||await Ee(Y=>df(w.lane_id,Y),"",[{type:b,a:p,b:m}])}function sn(){return(o&&o.crossLanes?o.crossLanes():null)??null}async function xt(b,p){if(b==="run"){await pn(p);return}if(b==="stop"){await Bt(p);return}if(b==="create"){await Ee(m=>sc(null,m),"");return}if(b==="remove"){let m=ff(p,Q());if(m!==null&&!f(m))return;await Ee(w=>pf(p,w),"");return}await Ee(m=>b==="confirm"?cf(p,m):uf(p,m),"")}function tn(b){let p=new Map;for(let m of b.rows){let w=ee.owner_of[m.id]||m.root_dir;typeof w!="string"||w.length===0||p.set(w,[...p.get(w)||[],m.id])}return p}async function pn(b){let p=ee.chain_lanes.find(ne=>ne.lane_id===b);if(!p||ee.cross_lanes_revision===null){z();return}K();let m=new Map,w=new Map,Y=tn(p);for(let ne of p.rows){if(ne.fixed||typeof ne.queue_index=="number")continue;let _e=ee.owner_of[ne.id]||ne.root_dir;if(typeof _e!="string"||_e.length===0){ye(`${ne.id}\uC758 \uB808\uD3EC\uB97C \uC54C \uC218 \uC5C6\uC5B4 \uC801\uC7AC\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4`,"error"),z();return}let Pe=w.get(_e)??0;if(await be("worker-queue-place",{bead_id:ne.id,lane:"parallel",index:(ee.parallel_raw_length[_e]??0)+Pe},_e,m,{bead_id:ne.id})===null){z();return}w.set(_e,Pe+1)}for(let[ne,_e]of Y)if(await be("worker-queue-arm",{bead_ids:_e,lane_id:b},ne,m,{bead_id:_e[0]})===null){ye("\uC77C\uBD80 \uB808\uD3EC\uC5D0\uC11C \uC9C4\uD589\uC744 \uCF1C\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 \u2014 [\u25B6 \uC774\uC5B4\uC11C \uC9C4\uD589]\uC73C\uB85C \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC138\uC694","error"),z();return}z()}async function Bt(b){let p=ee.chain_lanes.find(w=>w.lane_id===b);if(!p||ee.cross_lanes_revision===null){z();return}K();let m=new Map;for(let[w,Y]of tn(p))if(await be("worker-queue-disarm",{lane_id:b},w,m,{bead_id:Y[0]})===null)break;z()}async function Gt(b,p){if(!i||!b||p.length===0){z();return}let m=await i("worker-queue-start-now",{bead_id:b,root_dir:p});m&&m.queue&&oe.set(p,m.queue),m&&m.ok===!1&&ye(`\uC9C0\uAE08 \uC2DC\uC791 \uAC70\uBD80: ${m.reason==="not_waiting"?"\uC774 \uC774\uC288\uB294 \uB354 \uC774\uC0C1 \uB300\uAE30 \uB808\uC778\uC5D0 \uC5C6\uC2B5\uB2C8\uB2E4":m.reason||""}`,"error",2800),z()}async function on(b,p){let{root_dir:m,revision:w}=Wt(b);if(m.length===0){z();return}await be("worker-queue-disarm",{bead_ids:[b],lane_id:p},m,new Map([[m,w]]),{bead_id:b}),z()}async function Ue(b,p){let m=M.get(b);if(!m){z();return}let w={kind:"candidate",bead_id:b,root_dir:m.root_dir};if(p==="new-lane"){await Ee(Y=>sc({bead_id:b,root_dir:m.root_dir},Y),b);return}if(p.startsWith("lane:")){let Y=p.slice(5);if(!ee.chain_lanes.find(_e=>_e.lane_id===Y)){z();return}await Ee(_e=>pa(w,{kind:"chain",lane_id:Y,marker_index:(_e.cross_lanes.get(Y)?.entries??[]).length},_e),b);return}if(p.startsWith("serial:")){let Y=p.slice(7),ne=(m.place_lanes||[]).find(_e=>_e.id===Y);await ue(w,{kind:"repo-serial",root_dir:m.root_dir,lane_id:Y,index:ne?ne.index:0});return}await ue(w,{kind:"parallel",marker_index:ee.parallel_rows.length})}async function L(b,p){let m=ee.parallel_rows,w=m.findIndex(Ke=>Ke.id===b);if(w<0)return;let Y=m[w].root_dir,ne=[];m.forEach((Ke,bt)=>{Ke.root_dir===Y&&ne.push(bt)});let _e=ne.indexOf(w),Pe=ne[_e+p];if(typeof Pe!="number")return;let wt=p===-1?Pe:ne[_e+2]??Math.min(m.length,Pe+1);await ue({kind:"parallel",bead_id:b,root_dir:Y,queue_index:m[w].queue_index??0},{kind:"parallel",marker_index:wt})}async function ke(b){for(let p of ee.chain_lanes){let m=p.rows.find(w=>w.id===b);if(m){await ue({kind:"chain",bead_id:b,root_dir:m.root_dir,lane_id:p.lane_id,...typeof m.queue_index=="number"?{queue_index:m.queue_index}:{}},{kind:"parallel",marker_index:ee.parallel_rows.length});return}}}function Me(b){return{runner:b.runner||void 0,model:b.model||void 0,effort:b.effort||void 0,status:b.run_state==="running"?"running":b.run_state,worktree:b.root_dir}}function At(b,p,m,w,Y={}){let ne=M.get(b)||null;jo({context:{bead_id:b,kind:w,tuple:ne?Ln(ne):""},transport:_e=>Le("worker-attempt-resume",{attempt_id:p,...Y,..._e},m,oe.get(m)?.revision??Wt(b).revision,!1)})}function ze(){W=null,z()}function Dt(){let b=W,p=b?Na(b.draft):null;!b||!p||(W=null,z(),At(b.bead_id,p.attempt_id,b.root_dir,"session",p.payload))}function Ut(b,p){let{item:m,root_dir:w,revision:Y}=Wt(p),ne=m?.attempt_id||"",_e=b.classList;if(_e.contains("worker-mini__rowops-up")||_e.contains("worker-mini__rowops-down")){L(p,_e.contains("worker-mini__rowops-up")?-1:1);return}if(_e.contains("worker-mini__rowops-remove")){Le("worker-queue-remove",{bead_id:p},w,Y);return}if(_e.contains("worker-mini__start-now")){Gt(p,w);return}if(_e.contains("mon2-crow__detach")){ke(p);return}if(_e.contains("worker-dep__open")){kt(b.getAttribute("data-dep-id")||"",b.getAttribute("data-root-dir")||"");return}if(_e.contains("mon2-arm__release")){on(p,b.getAttribute("data-lane-id")||"");return}if(_e.contains("mon-lane__chip")){let Pe=b.getAttribute("data-lane-id")||"";fe.querySelector(`.mon2-clane[data-lane-id="${Pe}"]`)?.scrollIntoView({block:"nearest"});return}if(_e.contains("judgement-chip")){let Pe=b.getAttribute("data-chip-key")||"";Pe&&T.toggle({bead_id:p,chip_key:Pe});return}if(_e.contains("rtile__failure-badge")){j=j===ne?null:ne,z();return}if(_e.contains("rtile__provider-hold-badge")){B=B===ne?null:ne,z();return}if(_e.contains("rtile__attempt-copy")){let Pe=b.getAttribute("data-attempt-id")||"";Pe&&$n(Pe).then(wt=>{ye(wt?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",wt?"success":"error",1400)});return}if(_e.contains("worker-card__place")){P=P===p?null:p,z();return}if(_e.contains("worker-card__place-cancel")){P=null,z();return}if(_e.contains("worker-card__place-lane")){let Pe=b.getAttribute("data-lane")||"parallel";P=null,Ue(p,Pe);return}if(_e.contains("rtile__session")){if(m&&m.kind==="session"){let Pe=(m.session_refs||[]).find(wt=>wt&&wt.current===!0);Pe&&(Re.hidden=!1,G.open(Fo(Pe,p,"in_progress",w)),z());return}N=ne,ne&&m&&(Re.hidden=!1,G.open({attempt_id:ne,root_dir:w,meta:Me(m)})),z();return}if(_e.contains("rtile__pause")){nt("worker-attempt-pause",{attempt_id:ne},w);return}if(_e.contains("rtile__resume-alternate")){let Pe=Pa(ne,qe(w));Pe&&(W={root_dir:w,bead_id:p,draft:Pe},z());return}if(_e.contains("rtile__resume")){At(p,ne,w,b.dataset.resumeKind==="settlement"?"settlement":"session");return}if(_e.contains("rtile__resolve")){pt(p,w,oe.get(w)?.revision??Wt(p).revision);return}if(_e.contains("rtile__discard-abandon")){let Pe={kind:b.dataset.operationKind||"",last_error:b.dataset.lastError||""};if(!f(ks(p,Pe)))return;Oe({bead_id:p,operation_id:b.dataset.operationId||""},w,Y,Pe);return}if(_e.contains("rtile__discard")){let Pe=b.dataset.confirmation==="merged"?"merged":"unmerged";if(!f(vs(p,Pe)))return;Z({bead_id:p,...ne?{attempt_id:ne}:{},...b.dataset.operationId?{operation_id:b.dataset.operationId}:{}},w,Y);return}if(_e.contains("worker-mini__merge")){let Pe=Je(w,p);Pe?.mismatch&&Pe.continuation===null?ie(w,p,Y,Pe.mismatch):Le("worker-merge-queue-add",{bead_id:p},w,Y);return}if(_e.contains("worker-mini__merge-cancel")){Le("worker-merge-queue-remove",{bead_id:p},w,Y);return}if(_e.contains("worker-mini__discard-abandon")){let Pe={kind:b.dataset.operationKind||"",last_error:b.dataset.lastError||""};if(!f(ks(p,Pe)))return;Oe({bead_id:p,operation_id:b.dataset.operationId||""},w,Y,Pe);return}if(_e.contains("worker-mini__discard")){let Pe=b.dataset.discardMode==="merged"?"merged":"unmerged";if(!f(vs(p,Pe)))return;Z({bead_id:p,...b.dataset.attemptId?{attempt_id:b.dataset.attemptId}:{},...b.dataset.operationId?{operation_id:b.dataset.operationId}:{}},w,Y);return}if(_e.contains("worker-mini__revise-fix")){He("worker-revise-fix",{bead_id:p},w,Y);return}_e.contains("worker-mini__revise-approve")&&Le("worker-revise-approve",{bead_id:p},w,Y)}function ot(b){let p=ge.consumeClickSuppression(),m=b.target;if(!m||typeof m.closest!="function")return;if(m.closest(".provider-resume-dialog__cancel")){ze();return}if(m.closest(".provider-resume-dialog__confirm")){Dt();return}if(m.closest("dialog")||m.closest(".worker-drawer-overlay")||m.closest("a"))return;let w=m.closest(".worker-card__id, .worker-mini__id, .rtile__id");if(w){b.preventDefault();let De=m.closest(".mon2-item, .rtile, .mon2-crow, .worker-mini")?.getAttribute("data-bead-id")||w.textContent?.trim()||"";De&&jt(De);return}let Y=m.closest(".worker-mini__repo, .worker-card__repo, .mon2-sec__worker");if(Y){b.preventDefault();let Ie=Y.getAttribute("data-root-dir")||M.get(m.closest(".mon2-item, .rtile, .worker-mini")?.getAttribute("data-bead-id")||"")?.root_dir||Y.getAttribute("title")||"";Ct(Ie);return}let ne=m.closest(".mon2-sec__toggle");if(ne){b.preventDefault(),Pt(ne.getAttribute("data-root-dir")||"");return}let _e=m.closest(".worker-pane__toggle[data-lane]");if(_e){b.preventDefault();let Ie=_e.getAttribute("data-lane")||"";(Ie==="candidate"||Ie==="queue"||Ie==="running"||Ie==="pr_wait"||Ie==="done")&&Et(Ie);return}let Pe=m.closest(".worker-wait__area-toggle[data-area]");if(Pe){b.preventDefault(),rt(Pe.getAttribute("data-area")||"parallel");return}if(m.closest(".mon2-newlane")){b.preventDefault(),xt("create","");return}let wt=m.closest(".mon2-clane__confirm, .mon2-clane__reapply, .mon2-clane__remove, .mon2-clane__run, .mon2-clane__stop");if(wt){b.preventDefault();let Ie=wt.getAttribute("data-lane-id")||"",De=wt.classList;xt(De.contains("mon2-clane__confirm")?"confirm":De.contains("mon2-clane__reapply")?"reapply":De.contains("mon2-clane__run")?"run":De.contains("mon2-clane__stop")?"stop":"remove",Ie);return}if(m.closest(".mon-merge-all")){b.preventDefault(),Ye();return}let Ke=m.closest(".mon-filter__route");if(Ke){b.preventDefault(),g={...g,routes:sa(g.routes,Ke.getAttribute("data-route")||"")},Wc(g),z();return}let bt=m.closest(".mon-filter__readiness");if(bt){b.preventDefault(),g={...g,readiness:bt.getAttribute("data-readiness")||"all"},Wc(g),z();return}let Ot=m.closest(".mon2-item, .rtile, .mon2-crow, .worker-mini, .worker-card");if(!Ot)return;let A=Ot.getAttribute("data-bead-id")||"",R=m.closest("button");if(R){b.preventDefault(),Ut(R,A);return}m.closest(".rtile__failure-pop, .chip-popover")||A&&!p&&(b.preventDefault(),kt(A,Ot.getAttribute("data-root-dir")||Wt(A).root_dir))}function Rt(b){let p=b.target;if(!p||typeof p.closest!="function")return;if(W){let _e=Ma(W.draft,p,qe(W.root_dir));if(_e){_e!==W.draft&&(W={...W,draft:_e},z());return}}let m=p.closest(".mon-filter__blocked");if(m){g={...g,show_blocked:m.checked},Wc(g),z();return}let w=p.closest(".mon-candidate-sort");if(w){C=As.some(_e=>_e.value===w.value)?w.value:"repo_spec",Sw(C),z();return}let Y=p.closest(".mon-running-sort");if(Y){y=Y.value==="repo"?"repo":"started",Iw(y),z();return}let ne=p.closest(".mon-done-range");ne&&(_=Qn(ne.value),Rw(_),z())}function bn(b){let p=b.target,m=p&&typeof p.closest=="function"?Y=>p.closest(Y):()=>null,w=!1;j&&!m(".rtile__failure-pop, .rtile__failure-badge")&&(j=null,w=!0),B&&!m(".rtile__provider-hold-pop, .rtile__provider-hold-badge")&&(B=null,w=!0),w&&z()}function Nt(b){b.key==="Escape"&&(j===null&&B===null&&W===null||(j=null,B=null,W=null,z()))}e.addEventListener("click",ot),e.addEventListener("change",Rt),document.addEventListener("click",bn),document.addEventListener("keydown",Nt),T.attach(),ge.attach(e);{let b=!0;H=Oa(p=>{if(ae=p,b){b=!1;return}z()})}o&&typeof o.subscribe=="function"&&(he=o.subscribe(()=>{try{oe.clear(),z()}catch{}}));function kn(){xe!==null&&(clearInterval(xe),xe=null)}return{recorrectSharedLane:Qt,load(){n("load"),z(),xe===null&&(xe=setInterval(()=>{try{z()}catch{}},Lw))},pause(){kn()},clear(){kn(),ge.detach(),he&&(he(),he=null),H&&(H(),H=null),G.destroy(),Re.hidden=!0,Ze?.destroy(),Ze=null,e.removeEventListener("click",ot),e.removeEventListener("change",Rt),document.removeEventListener("click",bn),document.removeEventListener("keydown",Nt),T.detach(),e.replaceChildren()}}}var Mw=["board","worker","monitor","compare","adr"];function sm(e,t,n){let r=Ht("views:nav"),{global_element:o,repo_element:i}=e,s=null;function l(_){return y=>{y.preventDefault();let g=_==="monitor"&&a()==="monitor"?"worker":_;r("click tab %s",g),n.gotoView(g)}}function a(){let _=t.getState();return Mw.includes(_.view)?_.view:"board"}function u(){let _=a();return c`
      <div class="ctl-tabs">
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
        <a
          href="#/compare"
          class="ctl-tab ctl-tab--compare ${_==="compare"?"is-active":""}"
          @click=${l("compare")}
          >비교</a
        >
        <a
          href="#/adr"
          class="ctl-tab ctl-tab--adr ${_==="adr"?"is-active":""}"
          @click=${l("adr")}
          >ADR</a
        >
      </div>
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
    `}function f(){o&&lt(u(),o),i&&lt(d(),i)}return f(),s=t.subscribe(()=>f()),{destroy(){s&&(s(),s=null),o&&lt(c``,o),i&&lt(c``,i)}}}var im=["Critical","High","Medium","Low","Backlog"];function am(e,t){let n=document.createElement("dialog");n.id="new-issue-dialog",n.setAttribute("role","dialog"),n.setAttribute("aria-modal","true"),n.innerHTML=`
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
  `,e.appendChild(n);let r=n.querySelector("#new-issue-form"),o=n.querySelector("#new-title"),i=n.querySelector("#new-type"),s=n.querySelector("#new-priority"),l=n.querySelector("#new-labels"),a=n.querySelector("#new-description"),u=n.querySelector("#new-issue-error"),d=n.querySelector("#btn-cancel"),f=n.querySelector("#btn-create"),_=n.querySelector(".new-issue__close");function y(){i.replaceChildren();let P=document.createElement("option");P.value="",P.textContent="\u2014 Select \u2014",i.appendChild(P);for(let j of vi){let B=document.createElement("option");B.value=j,B.textContent=dd(j),i.appendChild(B)}s.replaceChildren();for(let j=0;j<=4;j+=1){let B=document.createElement("option");B.value=String(j);let W=im[j]||"Medium";B.textContent=`${j} \u2013 ${W}`,s.appendChild(B)}}y();function g(){try{typeof n.close=="function"?n.close():n.removeAttribute("open")}catch{n.removeAttribute("open")}}function C(P){o.disabled=P,i.disabled=P,s.disabled=P,l.disabled=P,a.disabled=P,d.disabled=P,f.disabled=P,f.textContent=P?"Creating\u2026":"Create"}function k(){u.textContent=""}function X(P){u.textContent=P}function ae(){try{let P=window.localStorage.getItem("beads-ui.new.type");P?i.value=P:i.value="";let j=window.localStorage.getItem("beads-ui.new.priority");j&&/^\d$/.test(j)?s.value=j:s.value="2"}catch{i.value="",s.value="2"}}function H(){let P=i.value||"",j=s.value||"";P.length>0&&window.localStorage.setItem("beads-ui.new.type",P),j.length>0&&window.localStorage.setItem("beads-ui.new.priority",j)}async function N(){k();let P=String(o.value||"").trim();if(P.length===0){X("Title is required"),o.focus();return}let j=Number(s.value||"2");if(!(j>=0&&j<=4)){X("Priority must be 0..4"),s.focus();return}let B=String(i.value||""),W=String(a.value||""),T={title:P};B.length>0&&(T.type=B),String(j).length>0&&(T.priority=j),W.length>0&&(T.description=W),C(!0);try{await t("create-issue",T)}catch{C(!1),X("Failed to create issue");return}H(),C(!1),g()}return n.addEventListener("cancel",P=>{P.preventDefault(),g()}),_.addEventListener("click",()=>g()),d.addEventListener("click",()=>g()),n.addEventListener("keydown",P=>{P.key==="Enter"&&(P.ctrlKey||P.metaKey)&&(P.preventDefault(),N())}),r.addEventListener("submit",P=>{P.preventDefault(),N()}),{open(){r.reset(),k(),ae();try{"showModal"in n&&typeof n.showModal=="function"?n.showModal():n.setAttribute("open","")}catch{n.setAttribute("open","")}setTimeout(()=>{try{o.focus()}catch{}},0)},close(){g()}}}var Nw=[["route","route \uCE69"],["fast_track","\u26A1 fast_track \uCE69"],["pr","PR \uCE69"],["from","\u21A9 from \uCE69"],["blocked","blocked\xB7\uC0AC\uC6A9\uC790 \uB9AC\uBDF0 \uD544\uC694 \uCE69"],["stepper","stepper"]];function qw(e,t){return cl(e,t)?"shown":t.hidden_labels.includes(e)?"hidden_exact":"hidden_prefix"}function lm(e,t,n){return c`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">라벨 표시</div>
      <p class="settings-dialog__hint-block">
        라벨을 눌러 표시/숨김을 전환합니다. prefix 규칙으로 숨겨진 라벨을 누르면
        그 라벨만 예외로 다시 표시됩니다.
      </p>
      ${t.length===0?c`<div class="settings-dialog__empty">라벨 없음</div>`:c`<div class="settings-dialog__pills">
            ${t.map(r=>{let o=qw(r,e);return c`<button
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
  `}function cm(e,t,n){return c`
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
  `}function um(e,t){return c`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">카드 표시 요소</div>
      <div class="settings-dialog__toggles">
        ${Nw.map(([n,r])=>c`<label class="settings-dialog__toggle">
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
  `}var jw=[{id:"execution",label:"\uC2E4\uD589",glyph:"\u25C6"},{id:"display",label:"\uD45C\uC2DC",glyph:"\u25EB"}];function dm(e,t){let{transport:n,policyStore:r,labelOptions:o}=t,i=t.notify||(J=>ye(J,"error",4e3)),s=document.createElement("dialog");s.id="settings-dialog",s.className="settings-dialog",s.setAttribute("role","dialog"),s.setAttribute("aria-modal","true"),s.setAttribute("aria-label","\uC124\uC815"),e.appendChild(s);let l="execution",a=!1,u="",d=null;function f(){if(d)return d;let J=s.querySelector('[data-pane="execution"]');return J?(d=Ua(J,{root_dir:null,queue:()=>t.queueStore?.get()??null,transport:n,implPresetStore:t.implPresetStore,notify:i,onQueueAdopt:ce=>t.queueStore?.set?.(ce)}),d):null}function _(){return c`
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
    `}function y(){let J=r.get();return c`
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
        ${J?c`
              ${lm(J,o(),X)}
              ${cm(J,u,{onDraft:ce=>{u=ce},onAdd:ae,onRemove:H})}
              ${um(J,N)}
            `:c`<div class="settings-dialog__empty">
              표시 정책을 불러오는 중…
            </div>`}
      </section>
    `}async function g(J){let ce=r.get();if(ce)try{let Se=await n("display-policy-set",{expected_revision:ce.revision,policy:J(ce)});C(Se),Se&&Se.conflict&&Se.policy&&(Se=await n("display-policy-set",{expected_revision:Se.policy.revision,policy:J(Se.policy)}),C(Se)),Se&&Se.conflict&&i("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC")}catch{i("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328")}}function C(J){J&&J.policy&&typeof J.policy=="object"&&r.set(J.policy)}function k(J){g(J)}function X(J){let ce=r.get();if(!ce)return;let Se=!Fw(J,ce);k(K=>Bw(J,K,Se))}function ae(){let J=u.trim();J.length!==0&&(u="",k(ce=>ce.hidden_prefixes.includes(J)?{hidden_prefixes:ce.hidden_prefixes}:{hidden_prefixes:[...ce.hidden_prefixes,J]}),P())}function H(J){k(ce=>({hidden_prefixes:ce.hidden_prefixes.filter(Se=>Se!==J)}))}function N(J){let ce=r.get();if(!ce)return;let Se=ce.chips[J]===!1;k(()=>({chips:{[J]:Se}}))}function P(){lt(c`
        <div class="settings-dialog__container">
          <nav
            class="settings-dialog__rail"
            role="tablist"
            aria-orientation="vertical"
          >
            <div class="settings-dialog__rail-title">설정</div>
            ${jw.map(J=>c`<button
                  type="button"
                  class="settings-dialog__tab"
                  role="tab"
                  data-tab=${J.id}
                  aria-selected=${String(l===J.id)}
                  aria-controls=${`settings-pane-${J.id}`}
                  @click=${()=>j(J.id)}
                >
                  <span class="settings-dialog__glyph">${J.glyph}</span>
                  ${J.label}
                </button>`)}
            <button
              type="button"
              class="settings-dialog__close"
              aria-label="닫기"
              @click=${O}
            >
              닫기
            </button>
          </nav>
          <div class="settings-dialog__panes">
            ${_()} ${y()}
          </div>
        </div>
      `,s),f()}function j(J){l=J,P()}let B=()=>{a=!1,t.onOpenChange?.(!1)};s.addEventListener("close",B),s.addEventListener("cancel",B);let W=J=>{J.target===s&&O()};s.addEventListener("click",W);let T=null;r.subscribe&&(T=r.subscribe(()=>{a&&P()}));let S=null;t.implPresetStore?.subscribe&&(S=t.implPresetStore.subscribe(()=>{a&&d?.render()}));function I(J="execution"){a||(a=!0,t.onOpenChange?.(!0),l=J,u="",P(),typeof s.showModal=="function"?s.showModal():s.setAttribute("open",""),f()?.load())}function O(){a&&(a=!1,t.onOpenChange?.(!1),typeof s.close=="function"?s.close():s.removeAttribute("open"))}return{open:I,close:O,sessionDraft:()=>d?.sessionDraft()??{},destroy(){a=!1,s.removeEventListener("close",B),s.removeEventListener("cancel",B),s.removeEventListener("click",W),T&&(T(),T=null),S&&(S(),S=null),d?.destroy(),d=null,s.remove()}}}function Fw(e,t){return t.visible_labels.includes(e)?!0:t.hidden_labels.includes(e)?!1:!t.hidden_prefixes.some(n=>n.length>0&&e.startsWith(n))}function Bw(e,t,n){if(!n)return{hidden_labels:t.hidden_labels.includes(e)?t.hidden_labels:[...t.hidden_labels,e],visible_labels:t.visible_labels.filter(i=>i!==e)};let r=t.hidden_labels.filter(i=>i!==e);return t.hidden_prefixes.some(i=>i.length>0&&e.startsWith(i))?{hidden_labels:r,visible_labels:t.visible_labels.includes(e)?t.visible_labels:[...t.visible_labels,e]}:{hidden_labels:r}}var Uw=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],pm="usage-meter-card",Ww="usage-meter-layer",Hc=600,Hw=["token_expired","relogin_required"];function fm(e){return String(e).padStart(2,"0")}function zw(e,t){let n=Math.max(0,Math.ceil((e-t)/6e4)),r=Math.floor(n/1440),o=Math.floor(n%1440/60),i=n%60;return r>0?`${r}d${o>0?` ${o}h`:""}`:o>0?`${o}h${i>0?` ${i}m`:""}`:`${i}m`}function _m(e,t=Date.now()){let n=Date.parse(e);if(!Number.isFinite(n))return"";let r=new Date(n),o=new Date(t),i=`${fm(r.getHours())}:${fm(r.getMinutes())}`,l=r.getFullYear()===o.getFullYear()&&r.getMonth()===o.getMonth()&&r.getDate()===o.getDate()?i:`${Uw[r.getMonth()]} ${r.getDate()} ${i}`;return`${zw(n,t)} \xB7 ${l}`}function Kw(e){let t=Math.max(0,Math.floor(e));return t<60?`${t}\uCD08 \uC804`:t<3600?`${Math.floor(t/60)}\uBD84 \uC804`:`${Math.floor(t/3600)}\uC2DC\uAC04 \uC804`}function mm(e){return e>=85?"usage-meter__window--danger":e>=60?"usage-meter__window--warn":"usage-meter__window--success"}function gm(e){let t=typeof e=="number"&&Number.isFinite(e)?e:0;return Math.min(100,Math.max(0,t))}var hm=[{key:"claude",label:"Claude",endpoint:"/api/claude-usage",switch_endpoint:"/api/claude-account/switch",tool:"cswap"},{key:"codex",label:"Codex",endpoint:"/api/codex-usage",switch_endpoint:"/api/codex-account/switch",tool:"codex-auth"}];function ym(e){let t=[];for(let n of e){if(!n||typeof n!="object")continue;let r=n;typeof r.key!="string"||r.key.length===0||typeof r.pct!="number"||!Number.isFinite(r.pct)||t.push({key:r.key,pct:r.pct,resetsAt:typeof r.resetsAt=="string"?r.resetsAt:""})}return t}function Gw(e){if(!e||typeof e!="object")return null;let t=e;return!Number.isInteger(t.number)||t.number<=0||typeof t.email!="string"||t.email.length===0||typeof t.status!="string"||t.status.length===0||typeof t.active!="boolean"||!Array.isArray(t.windows)?null:{number:t.number,email:t.email,alias:typeof t.alias=="string"&&t.alias.length>0?t.alias:null,plan:typeof t.plan=="string"&&t.plan.length>0?t.plan:null,active:t.active,status:t.status,windows:ym(t.windows),fetchedAt:typeof t.fetchedAt=="string"?t.fetchedAt:null,ageSeconds:typeof t.ageSeconds=="number"&&Number.isFinite(t.ageSeconds)?t.ageSeconds:null}}function Vw(e,t){if(!e||typeof e!="object")return null;let n=e,r=[];if(Array.isArray(n.accounts))for(let i of n.accounts){let s=Gw(i);s&&r.push(s)}let o=n.available===!0&&Array.isArray(n.windows);return!o&&r.length===0?null:{available:o,windows:o?ym(n.windows):[],ageSeconds:typeof n.ageSeconds=="number"&&Number.isFinite(n.ageSeconds)?n.ageSeconds:null,accounts:r,receivedAtMs:t,held:!1}}function Yw(e,t){if(!e||typeof e!="object")return{kind:"error"};let n=Vw(e,t);return n?{kind:"ok",snapshot:n}:Array.isArray(e.accounts)?{kind:"empty"}:{kind:"error"}}function vm(e,t){return(e.ageSeconds===null?0:e.ageSeconds)+Math.max(0,t-e.receivedAtMs)/1e3}function Qw(e,t){return!e.held||vm(e,t)<=Hc?e:{...e,available:!1,windows:[],accounts:[]}}function bm(e,t){return`${e}:${t}`}function km(e){let t=!1,n=null,r=new Map,o=null,i=new Map,s=new Map,l=0,a=null;function u(){lt(c``,e),e.hidden=!0,f()}function d(){if(a===null){let K=e.ownerDocument;a=K.createElement("div"),a.id=Ww,a.className="usage-meter__layer",K.body.appendChild(a)}return a}function f(){a!==null&&(lt(c``,a),a.remove(),a=null)}function _(K){n!==K&&(n===null&&(document.addEventListener("mousedown",g),document.addEventListener("keydown",k),window.addEventListener("resize",C)),n=K)}function y(){n!==null&&(n=null,document.removeEventListener("mousedown",g),document.removeEventListener("keydown",k),window.removeEventListener("resize",C))}function g(K){let te=K.target;te&&(e.contains(te)||a!==null&&a.contains(te))||(y(),O())}function C(){O()}function k(K){K.key==="Escape"&&(y(),O())}function X(K){n===K?y():_(K),O()}function ae(){y(),O()}async function H(K,te){if(r.has(K.key))return;let fe=bm(K.key,te);r.set(K.key,te),s.delete(fe),O();let Re=null;try{Re=await(await fetch(K.switch_endpoint,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({number:te})})).json()}catch{Re=null}if(t)return;if(r.delete(K.key),!Re||Re.ok!==!0){let le=Re&&typeof Re.error=="string"&&Re.error.length>0?Re.error:"network_error";s.set(fe,{kind:"error",text:`\uC804\uD658 \uC2E4\uD328 \u2014 ${le}`}),O();return}let V=Array.isArray(Re.warnings)?Re.warnings.filter(le=>typeof le=="string"&&le.length>0):[];V.length>0&&s.set(fe,{kind:"warn",text:V.join(" \xB7 ")}),O(),await Se()}function N(K,te,fe,Re){let V=gm(K.pct),ee=`resets ${_m(K.resetsAt,Re)}${te?` \xB7 ${fe}`:""}`;return c`<span
      class="usage-meter__window ${mm(V)}"
      style=${`--progress: ${V}%`}
      title=${ee}
    >
      <span class="usage-meter__label">${K.key}</span>
      <span class="usage-meter__track" aria-hidden="true">
        <span class="usage-meter__fill"></span>
      </span>
      <span class="usage-meter__pct">${V}%</span>
    </span>`}function P(K,te,fe){let Re=vm(te,fe),V=te.available&&(te.held||Re>Hc),le=V?`${Math.floor(Re/60)}\uBD84 \uC804 \uCE21\uC815`:"",ee=te.accounts.filter(he=>!he.active).length,M=`usage-meter__group${V?" usage-meter__group--stale":""}`,oe=c`<span class="usage-meter__provider"
        >${K.label}</span
      >
      ${te.available?te.windows.map(he=>N(he,V,le,fe)):c`<span class="usage-meter__empty">사용량 없음</span>`}
      ${ee>0?c`<span class="usage-meter__badge">+${ee}</span>`:""}`;if(te.accounts.length===0)return c`<span
        class=${M}
        aria-label=${`${K.label} usage`}
        >${oe}</span
      >`;let se=n===K.key;return c`<button
      type="button"
      class=${`usage-meter__toggle ${M}`}
      aria-label=${`${K.label} usage`}
      aria-expanded=${se?"true":"false"}
      aria-controls=${pm}
      @click=${()=>X(K.key)}
    >
      ${oe}
    </button>`}function j(K,te){return c`<span class="usage-meter" aria-label="Usage">
      ${K.map(fe=>P(fe.provider,fe.snapshot,te))}
    </span>`}function B(K,te){let fe=gm(K.pct),Re=_m(K.resetsAt,te);return c`<span
      class="usage-meter__account-window ${mm(fe)}"
      style=${`--progress: ${fe}%`}
    >
      <span class="usage-meter__account-key">${K.key}</span>
      <span class="usage-meter__account-track" aria-hidden="true">
        <span class="usage-meter__account-fill"></span>
      </span>
      <span class="usage-meter__account-pct">${fe}%</span>
      <span class="usage-meter__account-reset"
        >${Re.length>0?`\u21BB ${Re}`:""}</span
      >
    </span>`}function W(K,te){return Hw.includes(te)?`\uD1A0\uD070 \uB9CC\uB8CC \u2014 ${K.tool} \uC7AC\uB85C\uADF8\uC778 \uD544\uC694`:"\uC0AC\uC6A9\uB7C9 \uC5C6\uC74C"}function T(K,te,fe){let Re=te.status==="ok",V=typeof te.ageSeconds=="number"&&te.ageSeconds>Hc,le=s.get(bm(K.key,te.number)),ee=r.get(K.key),M=ee!==void 0,oe=ee===te.number,se=["usage-meter__account"];return te.active&&se.push("usage-meter__account--active"),Re||se.push("usage-meter__account--unavailable"),V&&se.push("usage-meter__account--stale"),c`<div class=${se.join(" ")}>
      <div class="usage-meter__account-head">
        <span class="usage-meter__account-label" title=${te.email}
          >${te.alias===null?te.email:te.alias}</span
        >
        ${te.plan===null?"":c`<span class="usage-meter__account-tag">${te.plan}</span>`}
        ${te.active?c`<span
              class="usage-meter__account-tag usage-meter__account-tag--active"
              >active</span
            >`:""}
        ${te.ageSeconds===null?"":c`<span class="usage-meter__account-age"
              >${Kw(te.ageSeconds)}</span
            >`}
        ${te.active?"":c`<button
              type="button"
              class="usage-meter__switch"
              ?disabled=${M}
              @click=${()=>{H(K,te.number)}}
            >
              ${oe?"\uC804\uD658 \uC911\u2026":"\uC804\uD658"}
            </button>`}
      </div>
      ${Re?c`<div class="usage-meter__account-windows">
            ${te.windows.map(he=>B(he,fe))}
          </div>`:c`<div class="usage-meter__account-status">
            ${W(K,te.status)}
          </div>`}
      ${le===void 0?"":c`<div
            class="usage-meter__account-message usage-meter__account-message--${le.kind}"
          >
            ${le.text}
          </div>`}
    </div>`}function S(K,te,fe){let Re=te.accounts.filter(V=>V.active).length;return c`<section class="usage-meter__section">
      <h2 class="usage-meter__section-title">
        ${K.label} · 활성 ${Re} / 전체
        ${te.accounts.length}
      </h2>
      ${te.accounts.map(V=>T(K,V,fe))}
    </section>`}function I(K,te){return c`<div
      class="usage-meter__card"
      id=${pm}
      role="dialog"
      aria-label=${`${K.provider.label} \uACC4\uC815 \uC0AC\uC6A9\uB7C9`}
    >
      ${S(K.provider,K.snapshot,te)}
      <p class="usage-meter__note">전환은 새로 시작하는 세션부터 적용됩니다.</p>
    </div>`}function O(){let K=Date.now(),te=[];for(let Re of hm){let V=i.get(Re.key);V&&te.push({provider:Re,snapshot:Qw(V,K)})}if(te.length===0){y(),u();return}let fe=te.find(Re=>Re.provider.key===n&&Re.snapshot.accounts.length>0);fe||y(),lt(j(te,K),e),e.hidden=!1,fe?J(fe,K):f()}function J(K,te){let fe=d(),Re=e.getBoundingClientRect(),V=e.ownerDocument.documentElement.clientWidth;fe.style.setProperty("--usage-meter-anchor-top",`${Re.bottom}px`),fe.style.setProperty("--usage-meter-anchor-right",`${Math.max(0,V-Re.right)}px`),lt(c`<div
          class="usage-meter__scrim"
          aria-hidden="true"
          @mousedown=${ae}
        ></div>
        ${I(K,te)}`,fe)}async function ce(K){try{let te=await fetch(K.endpoint);return te.ok?Yw(await te.json(),Date.now()):{kind:"error"}}catch{return{kind:"error"}}}async function Se(){l+=1;let K=l,te=await Promise.all(hm.map(async fe=>({provider:fe,read:await ce(fe)})));if(!(t||K!==l)){for(let fe of te){let Re=fe.provider.key;if(fe.read.kind==="ok"){i.set(Re,fe.read.snapshot);continue}if(fe.read.kind==="empty"){i.delete(Re);continue}let V=i.get(Re);V!==void 0&&!V.held&&i.set(Re,{...V,held:!0})}O()}}return u(),Se(),o=setInterval(()=>{Se()},6e4),{destroy(){t=!0,o!==null&&(clearInterval(o),o=null),y(),u()}}}function Vs(e){let t=e?.blocked_info;return t&&typeof t=="object"?Array.isArray(t.blockers)?t.blockers.filter(r=>typeof r=="string"&&r.length>0):[]:(Array.isArray(e?.dependencies)?e.dependencies:[]).map(r=>{if(typeof r=="string")return r;if(!r||typeof r!="object")return"";let o=r.type??r.dependency_type;return o!==void 0&&o!=="blocks"?"":r.depends_on_id||r.id||""}).filter(Boolean)}var xm="bdui.worker.candidate_sort",Ys=Object.freeze([{id:"spec",label:"spec \uC6B0\uC120",chain:[{key:"spec",dir:"desc"},{key:"created",dir:"asc"}]},{id:"bottleneck",label:"\uBCD1\uBAA9 \uC6B0\uC120",chain:[{key:"priority",dir:"asc"},{key:"dependents",dir:"desc"},{key:"released",dir:"desc"}]},{id:"created",label:"\uCD5C\uC2E0 \uC0DD\uC131",chain:[{key:"created",dir:"desc"},{key:"priority",dir:"asc"}]},{id:"updated",label:"\uCD5C\uC2E0 \uC218\uC815",chain:[{key:"updated",dir:"desc"}]}]),Ha=Object.freeze({preset:"spec"}),Am=3,Sm=Object.freeze([{key:"priority",label:"\uC6B0\uC120\uC21C\uC704"},{key:"dependents",label:"\uD6C4\uC18D \uC218"},{key:"released",label:"\uD574\uC81C \uC2DC\uAC01"},{key:"spec",label:"spec \uC720\uBB34"},{key:"created",label:"\uC0DD\uC131"},{key:"updated",label:"\uC218\uC815"}]);function wm(e){return Ys.some(t=>t.id===e)}function $m(e){let t=Ys.find(n=>n.id===e);return t?t.chain.map(n=>({...n})):[]}function Xw(e,t){return e.length===t.length&&e.every((n,r)=>n.key===t[r].key&&n.dir===t[r].dir)}function Qs(e){return e&&"preset"in e?$m(e.preset):e&&Array.isArray(e.chain)?e.chain.map(t=>({...t})):$m("spec")}function zc(e){return e&&"preset"in e?e.preset:null}function uo(e){if(typeof e=="string"){let i;try{i=JSON.parse(e)}catch{return wm(e)?{preset:e}:Ha}return uo(i)}if(!e||typeof e!="object")return Ha;let t=e;if(wm(t.preset))return{preset:t.preset};let n=t.chain;if(!Array.isArray(n)||n.length===0||n.length>Am||!n.every(nl))return Ha;let r=[];for(let i of n)r.some(s=>s.key===i.key)||r.push({key:i.key,dir:i.dir});let o=Ys.find(i=>Xw(i.chain,r));return o?{preset:o.id}:{chain:r}}function Em(){try{return uo(window.localStorage.getItem(xm))}catch{return Ha}}function Kc(e){try{window.localStorage.setItem(xm,JSON.stringify(e))}catch{}}function Tm(e,t,n){let r=e.map(a=>({...a}));if(!n)return r.slice(0,t);if(!Object.prototype.hasOwnProperty.call(ui,n))return r;let o=n;if(r.slice(0,t).some(a=>a.key===o))return r.slice(0,t);let i={key:o,dir:r[t]&&r[t].key===o?r[t].dir:ui[o]},s=r.slice(0,t),l=r.slice(t+1).filter(a=>a.key!==o);return[...s,i,...l].slice(0,Am)}function Cm(e,t){return e.map((n,r)=>r===t?{key:n.key,dir:n.dir==="asc"?"desc":"asc"}:{...n})}function Zw(e){let t=new Set(e.map(l=>l.id)),n=new Map,r=new Map;for(let l of e){let a=Vs(l).filter(u=>t.has(u));n.set(l.id,a);for(let u of a){let d=r.get(u);d?d.push(l):r.set(u,[l])}}let o=new Set,i=[],s=l=>{o.add(l.id),i.push(l);for(let a of r.get(l.id)??[])!o.has(a.id)&&(n.get(a.id)??[]).every(u=>o.has(u))&&s(a)};for(;i.length<e.length;){let l=e.find(a=>!o.has(a.id)&&(n.get(a.id)??[]).every(u=>o.has(u)));s(l??e.find(a=>!o.has(a.id)))}return i}function Rm(e,t){let n=Array.isArray(e)?e.slice():[];return n.sort(Ru(Qs(t))),Zw(n)}function Om(e,t){let n=new Map;if(!e||typeof e!="object")return n;let r=e,o=[],i=new Set;for(let s of t){if(i.has(s.id))continue;i.add(s.id);let l=r[s.id];if(!l||!Array.isArray(l.scope))continue;let a=l.scope.filter(u=>typeof u=="string"&&u.length>0);if(a.length===0){n.set(s.id,{overlaps:[],scope_missing:!0});continue}n.set(s.id,{overlaps:[],scope_missing:!1}),o.push({member:s,scope:a})}for(let s=0;s<o.length;s+=1)for(let l=s+1;l<o.length;l+=1){let a=qi(o[s].scope,o[l].scope);if(a.length===0)continue;let u=o[s].member,d=o[l].member;n.get(u.id)?.overlaps.push({id:d.id,title:d.title,location_label:d.location_label,prefixes:a}),n.get(d.id)?.overlaps.push({id:u.id,title:u.title,location_label:u.location_label,prefixes:a})}return n}var Im=new Set(["sh","bash","zsh","dash","ksh"]),Lm=/('(?:[^']*)'|"(?:\\.|[^"\\])*"|#.*|\$(?:\{[^}\n]*\}|[A-Za-z_][A-Za-z0-9_]*|[?#@*!$0-9-])|\b(?:if|then|else|elif|fi|for|while|until|do|done|case|esac|in|function|select|time)\b)/g;function Dm(e){let t=e.split("/");return t[t.length-1]||""}function Jw(e){let t=e.split(`
`,1)[0];if(!t.startsWith("#!"))return!1;let n=t.slice(2).trim().split(/\s+/).filter(Boolean);if(n.length===0)return!1;let r=Dm(n[0]);if(r!=="env")return Im.has(r);let o=n.slice(1).find(i=>!i.startsWith("-")&&!i.includes("="));return o!==void 0&&Im.has(Dm(o))}function e$(e){return e.startsWith("#")?"comment":e.startsWith("'")||e.startsWith('"')?"string":e.startsWith("$")?"variable":"keyword"}function t$(e){let t=[],n=0;Lm.lastIndex=0;for(let r of e.matchAll(Lm)){let o=r.index;o>n&&t.push({text:e.slice(n,o),kind:"plain"}),t.push({text:r[0],kind:e$(r[0])}),n=o+r[0].length}return n<e.length&&t.push({text:e.slice(n),kind:"plain"}),t.length===0&&t.push({text:e,kind:"plain"}),t}function n$(e){return{bad_request:"\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD\uC774 \uC62C\uBC14\uB974\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.",forbidden:"\uB4F1\uB85D\uB418\uC9C0 \uC54A\uC740 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uC758 \uC2A4\uD06C\uB9BD\uD2B8\uB294 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",lane_not_declared:"\uD604\uC7AC \uACE0\uC815 \uC120\uC5B8\uC5D0 \uD574\uB2F9 \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4.",stale_declaration:"\uC800\uC7A5\uC18C \uC791\uC5C5 \uC120\uC5B8\uC774 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uD654\uBA74\uC5D0\uC11C \uB2E4\uC2DC \uC5F4\uC5B4 \uC8FC\uC138\uC694.",too_large:"\uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uB108\uBB34 \uCEE4\uC11C \uD654\uBA74\uC5D0 \uD45C\uC2DC\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",unsupported_content:"\uD14D\uC2A4\uD2B8 \uD615\uC2DD\uC758 \uC2A4\uD06C\uB9BD\uD2B8\uB9CC \uD45C\uC2DC\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.",unreadable:"\uACE0\uC815\uB41C \uC2A4\uD06C\uB9BD\uD2B8 \uB0B4\uC6A9\uC744 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4."}[e]||"\uC2A4\uD06C\uB9BD\uD2B8\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4."}function Pm(e){let t=e.getWorkspacePath,n=e.fetchImpl||globalThis.fetch?.bind(globalThis),r=document.createElement("div");r.className="repo-ops-script-viewer-root",document.body.appendChild(r);let o=null,i="loading",s="",l="",a=0,u=null,d=!1;function f(P,j){return j?t$(P).map(B=>B.kind==="plain"?B.text:c`<span
            class="repo-ops-script-viewer__token repo-ops-script-viewer__token--${B.kind}"
            >${B.text}</span
          >`):P}function _(){if(!o)return c``;let P=i==="ready"&&Jw(s),j=i==="ready"?s.split(`
`):[];return c`<div
      class="repo-ops-script-viewer"
      role="dialog"
      aria-modal="true"
      aria-label=${`\uC2A4\uD06C\uB9BD\uD2B8 \uB0B4\uC6A9: ${o.path}`}
    >
      <div
        class="repo-ops-script-viewer__backdrop"
        @click=${()=>H()}
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
              @click=${()=>{g()}}
            >
              복사
            </button>
            <button
              type="button"
              class="repo-ops-script-viewer__close"
              aria-label="스크립트 팝업 닫기"
              @click=${()=>H()}
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
                  ${j.map((B,W)=>c`<div class="repo-ops-script-viewer__row">
                        <span
                          class="repo-ops-script-viewer__line-number"
                          aria-hidden="true"
                          >${W+1}</span
                        ><code class="repo-ops-script-viewer__code-line"
                          >${f(B,P)}</code
                        >
                      </div>`)}
                </div>`}
        </div>
      </section>
    </div>`}function y(){lt(_(),r)}async function g(){if(i!=="ready")return;let P=await $n(s);ye(P?"\uC2A4\uD06C\uB9BD\uD2B8 \uBCF5\uC0AC\uB428":"\uC2A4\uD06C\uB9BD\uD2B8 \uBCF5\uC0AC \uC2E4\uD328",P?"success":"error")}function C(P){P.key==="Escape"&&o&&(P.preventDefault(),H())}function k(){d||(document.addEventListener("keydown",C),d=!0)}function X(){d&&(document.removeEventListener("keydown",C),d=!1)}async function ae(P,j=null){let B=++a;k(),o={...P},u=j||(document.activeElement instanceof HTMLElement?document.activeElement:null),i="loading",s="",l="",y(),r.querySelector(".repo-ops-script-viewer__close")?.focus();let T=t?t():"";if(!T){i="error",l="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4.",y();return}if(!n){i="error",l="\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD \uAE30\uB2A5\uC744 \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",y();return}let S="/api/repo-ops-script?workspace="+encodeURIComponent(T)+"&lane="+encodeURIComponent(P.lane)+"&base_sha="+encodeURIComponent(P.base_sha);try{let I=await n(S),O=await I.json().catch(()=>({}));if(B!==a)return;if((t?t():"")!==T){H();return}if(!I.ok||!O||O.ok!==!0){i="error",l=n$(O&&typeof O.error=="string"?O.error:""),y();return}o={lane:O.lane,base_sha:O.base_sha,path:O.path,base_ref:O.base_ref},s=String(O.content),i="ready",y()}catch{if(B!==a)return;i="error",l="\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",y()}}function H(){a+=1,X(),o=null,s="",y();let P=u;u=null,P?.isConnected&&P.focus()}function N(){H(),r.remove()}return{open:ae,close:H,destroy:N}}var Mm={deploy_not_declared:"\uC120\uC5B8 \uC5C6\uC74C",deploy_opted_out:"\uC774 workspace\uC5D0\uC11C \uBC30\uD3EC \uC2E4\uD589\uC774 \uAEBC\uC838 \uC788\uC74C",deploy_in_flight:"\uBC30\uD3EC \uC9C4\uD589 \uC911",target_unresolved:"\uB300\uC0C1 tip\uC744 \uD655\uC815\uD558\uC9C0 \uBABB\uD568",remote_history_not_monotonic:"\uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC\uC640 \uC6D0\uACA9 \uC774\uB825\uC774 \uAC08\uB77C\uC9D0"},r$=new Set(["queued","running","retry_pending"]);function Nm(e){let t=e.queueStore,n=e.transport,r=e.onChanged||(()=>{}),o=e.onOpenScript;function i(){return t&&t.get()||{}}function s(){let S=i();return typeof S.revision=="number"?S.revision:0}function l(S){t&&S&&S.queue&&typeof S.queue=="object"&&t.set(S.queue)}function a(){let S=i().workspace_info;return S&&typeof S=="object"?S:{}}function u(S,I){return c`<span
      class="worker-repo-ops__vd-badge worker-repo-ops__vd-badge--${S}"
      >${I}</span
    >`}function d(S){if(typeof S!="number"||!Number.isFinite(S))return"";let I=S/6e4;return Number.isInteger(I)?`timeout ${I}\uBD84`:`timeout ${Math.round(S/1e3)}\uCD08`}function f(S){let I=d(S);return I?u("config",I):""}function _(S,I,O){return c`<button
      type="button"
      class="worker-repo-ops__vd-cmd worker-repo-ops__vd-cmd--link"
      .textContent=${O.script}
      @click=${J=>{o&&o({lane:S,base_sha:I.base_sha,path:O.script,base_ref:I.base_ref},J.currentTarget)}}
    ></button>`}function y(){let S=i().repo_operations;return Array.isArray(S)?S:[]}function g(){let S=a().repo_ops,I=S&&typeof S=="object"?S.repo_id:null;return typeof I=="string"&&I?I:null}function C(){return y().some(S=>S&&S.kind==="deploy"&&r$.has(S.state))}function k(){let S=C(),I=g()===null;return c`<button
      type="button"
      class="worker-repo-ops__deploy-run"
      data-seam="repo-ops-deploy-run"
      ?disabled=${S||I}
      title=${S?"\uBC30\uD3EC \uC9C4\uD589 \uC911":I?"\uC800\uC7A5\uC18C\uB97C \uD655\uC778\uD560 \uC218 \uC5C6\uC74C":"\uC6D0\uACA9 base tip\uC5D0\uC11C \uBC30\uD3EC \uC2A4\uD06C\uB9BD\uD2B8\uB97C 1\uD68C \uC2E4\uD589\uD569\uB2C8\uB2E4"}
      @click=${()=>{j()}}
    >
      배포 실행
    </button>`}function X(){let S=i().repo_ops_opt_out;return{verify:S?.verify===!0,deploy:S?.deploy===!0}}function ae(S,I){return c`<label class="worker-repo-ops__lane-run">
      <input
        type="checkbox"
        .checked=${!I}
        @change=${O=>{P(S,!O.target.checked)}}
      />
      이 workspace에서 실행
    </label>`}function H(S){let I=typeof S.base_sha=="string"?S.base_sha:"",O=`${S.source_path||"repo-ops/config.toml"} @ ${S.base_ref||"?"}${I?`@${I.slice(0,7)}`:""}`,J=X(),ce=!!S.verify&&J.verify,Se=!!S.deploy&&J.deploy;return c`<section class="worker-repo-ops__vd" data-seam="repo-ops">
      <p class="worker-repo-ops__vd-title">
        저장소 작업 선언
        <span class="worker-repo-ops__vd-src">${O}</span>
      </p>
      <div
        class="worker-repo-ops__lane${ce?" worker-repo-ops__lane--skipped":""}"
        data-lane="verify"
      >
        <span class="worker-repo-ops__lane-k">머지 전 검증</span>
        <span class="worker-repo-ops__lane-v"
          >${S.verify?c`${_("verify",S,S.verify)}
              ${f(S.verify.timeout_ms)}
              ${ce?u("skipped","\uC774 workspace\uC5D0\uC11C \uAC74\uB108\uB700"):""}`:c`선언 없음${u("absent","verify \uC5C6\uC774 \uD310\uC815")}`}</span
        >
        <span class="worker-repo-ops__lane-d"
          >${ce?"\uC774 workspace\uC5D0\uC11C\uB294 \uAC80\uC99D \uC5C6\uC774 \uD310\uC815\uD569\uB2C8\uB2E4.":S.verify?"\uBA38\uC9C0 \uC804\uC5D0 \uC774 \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uD1B5\uACFC\uD574\uC57C \uC790\uACA9\uC744 \uC5BB\uC2B5\uB2C8\uB2E4.":"\uBA38\uC9C0 \uC790\uACA9\uC740 PR/base/head \uC2E0\uC120\uB3C4\xB7mergeability\xB7\uB9AC\uBDF0 \uC601\uC218\uC99D\uC73C\uB85C\uB9CC \uD310\uC815\uD569\uB2C8\uB2E4."}</span
        >
        ${S.verify?ae("verify",J.verify):""}
      </div>
      <div
        class="worker-repo-ops__lane${Se?" worker-repo-ops__lane--skipped":""}"
        data-lane="deploy"
      >
        <span class="worker-repo-ops__lane-k">머지 후 배포</span>
        <span class="worker-repo-ops__lane-v"
          >${S.deploy?c`${_("deploy",S,S.deploy)}
              ${f(S.deploy.timeout_ms)}
              ${Se?u("skipped","\uC774 workspace\uC5D0\uC11C \uAC74\uB108\uB700"):k()}`:c`선언 없음${u("absent","\uBC30\uD3EC \uC5C6\uC74C")}`}</span
        >
        <span class="worker-repo-ops__lane-d"
          >${Se?"\uC774 workspace\uC5D0\uC11C\uB294 \uBC30\uD3EC \uC5C6\uC774 \uACE7\uBC14\uB85C \uC815\uB9AC\uB85C \uB118\uC5B4\uAC11\uB2C8\uB2E4.":S.deploy?c`Worker가 <code>.worktrees/.repo-ops-deploy</code>에서 대상
                  SHA로 정렬한 뒤 1회 실행합니다.`:"\uBA38\uC9C0 \uD6C4 \uBC30\uD3EC \uB2E8\uACC4 \uC5C6\uC774 \uACE7\uBC14\uB85C \uC815\uB9AC\uB85C \uB118\uC5B4\uAC11\uB2C8\uB2E4."}</span
        >
        ${S.deploy?ae("deploy",J.deploy):""}
      </div>
    </section>`}function N(S){let I=S.repo_ops&&typeof S.repo_ops=="object"?S.repo_ops:null;return I&&(I.status==="resolved"||I.status==="absent")?H(I):I&&(I.status==="pending"||I.status==="error")?c`<section class="worker-repo-ops__vd" data-seam="repo-ops">
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
          ${I.status==="pending"?"\uC120\uC5B8 \uD655\uC778 \uC911":c`선언 읽기
              실패${I.error_code?c` — <code>${I.error_code}</code>`:""}`}
        </div>
      </section>`:c`<section class="worker-repo-ops__vd" data-seam="repo-ops">
      <p class="worker-repo-ops__vd-title">저장소 작업 선언</p>
      <div class="worker-repo-ops__vd-line worker-repo-ops__vd-absent">
        선언 확인 중
      </div>
    </section>`}async function P(S,I){if(!n)return;let O=await n("worker-repo-ops-opt-out-toggle",{kind:S,opted_out:I,expected_revision:s()});if(l(O),O&&O.conflict){let J=await n("worker-repo-ops-opt-out-toggle",{kind:S,opted_out:I,expected_revision:s()});l(J)}r()}async function j(){let S=g();if(!n||S===null)return;let I=await n("worker-repo-operation-deploy-run",{repo_id:S});if(l(I),!I||I.ok!==!0){let O=I&&typeof I.reason=="string"?I.reason:"",J=Object.hasOwn(Mm,O)?Mm[O]:O||"\uBC30\uD3EC \uC2E4\uD589\uC744 \uC2DC\uC791\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4";ye(`\uBC30\uD3EC \uC2E4\uD589 \uAC70\uBD80 \u2014 ${J}`,"error")}else ye("\uBC30\uD3EC \uC2E4\uD589\uC744 \uC2DC\uC791\uD588\uC2B5\uB2C8\uB2E4","success");r()}let B={owned_deploy_worktree_fetch_detached_alignment_recreate:"\uC804\uC6A9 \uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC \uC815\uB82C\xB7\uBCF5\uAD6C",recovered_pre_execution_fetch_timeout_retry_once:"fetch \uD0C0\uC784\uC544\uC6C3 1\uD68C \uBCF5\uAD6C",repo_serial_lock_wait:"\uC800\uC7A5\uC18C \uC21C\uCC28 \uC2E4\uD589 \uB300\uAE30",restart_operation_adoption:"\uC7AC\uC2DC\uC791 \uD6C4 \uC791\uC5C5 \uC778\uACC4",exact_input_exit_zero_evidence_adoption:"\uB3D9\uC77C \uC785\uB825 \uC131\uACF5 \uC99D\uAC70 \uC778\uACC4",descendant_success_covers_ancestor_rows:"\uCD5C\uC2E0 SHA \uC131\uACF5\uC774 \uC774\uC804 \uD589 \uCEE4\uBC84",owned_verify_candidate_cleanup:"\uAC80\uC99D \uC784\uC2DC \uCCB4\uD06C\uC544\uC6C3 \uC815\uB9AC",bounded_single_script_retry_exceeded:"\uB2E8\uC77C \uC2A4\uD06C\uB9BD\uD2B8 \uC7AC\uC2DC\uB3C4 \uD55C\uB3C4 \uCD08\uACFC",repair_session_dispatch:"\uC2E4\uD328 \uD574\uACB0 \uC138\uC158 \uC790\uB3D9 \uC2E4\uD589",baseline_failure_ignore:"\uAE30\uC874 \uC2E4\uD328 \uBB34\uC2DC",config_or_script_deletion_to_bypass_gate:"\uC124\uC815\xB7\uC2A4\uD06C\uB9BD\uD2B8 \uC0AD\uC81C\uB85C \uAC8C\uC774\uD2B8 \uC6B0\uD68C",credential_entry:"\uC790\uACA9\uC99D\uBA85 \uC785\uB825\xB7\uCD9C\uB825",destructive_action:"\uD30C\uAD34\uC801 \uC791\uC5C5",history_rewrite:"\uD788\uC2A4\uD1A0\uB9AC \uC7AC\uC791\uC131",agent_self_report_as_success:"\uC138\uC158 \uC790\uAE30\uBCF4\uACE0\uB97C \uC131\uACF5 \uCC98\uB9AC"};function W(S,I,O){return c`<div class="worker-repo-ops__policy-group" data-policy=${O}>
      <div class="worker-repo-ops__policy-label">${S}</div>
      <ul class="worker-repo-ops__policy-list">
        ${I.map(J=>c`<li data-token=${J}>
              ${B[J]||J}
            </li>`)}
      </ul>
    </div>`}function T(){let S=i(),I=S.repo_operation_policy&&typeof S.repo_operation_policy=="object"?S.repo_operation_policy:null;return I?c`<section
      class="worker-repo-ops__repair"
      data-seam="repo-ops-policy"
    >
      <details class="worker-repo-ops__policy" data-seam="policy-lists">
        <summary>
          Worker 자동 처리 기준
          <span class="worker-repo-ops__policy-count"
            >자동 ${(I.worker_automatic||[]).length} · 금지
            ${(I.never_automatic||[]).length}</span
          >
        </summary>
        ${I.supported===!1?c`<div
              class="worker-repo-ops__policy-group"
              data-policy="policy-schema"
            >
              ${`\uACC4\uC57D \uC2A4\uD0A4\uB9C8 \uBD88\uC77C\uCE58 \u2014 \uC790\uB3D9 \uC7AC\uC2DC\uB3C4\uAC00 \uC815\uC9C0\uB418\uC5C8\uC2B5\uB2C8\uB2E4 (v${I.schema_version})`}
            </div>`:""}
        ${W("Worker\uAC00 \uC790\uB3D9 \uCC98\uB9AC",I.worker_automatic||[],"worker-automatic")}
        ${W("\uC790\uB3D9\uC73C\uB85C \uD558\uC9C0 \uC54A\uC74C",I.never_automatic||[],"never-automatic")}
      </details>
    </section>`:""}return{template(){return c`<details class="worker-repo-ops-settings">
        <summary class="worker-repo-ops-settings__summary">
          저장소 작업 · 검증/배포 선언
        </summary>
        ${N(a())} ${T()}
      </details>`}}}var Fm=20,o$=5,s$=new Set(["failed","running","queued","retry_pending"]),Gc={verify:"\uBA38\uC9C0 \uC804 \uAC80\uC99D",deploy:"\uBA38\uC9C0 \uD6C4 \uBC30\uD3EC",job:"\uBA38\uC9C0 \uD6C4 \uC7A1"},qm={verify:"verify",deploy:"deploy",job:"deploy"};function i$(e){if(typeof e!="string")return"";let t=e.split("/").filter(n=>n.length>0);return t.length>0?t[t.length-1]:""}function a$(e){return!e||typeof e!="object"?"":e.kind==="job"?i$(e.script_path)||Gc.job:Object.hasOwn(Gc,e.kind)?Gc[e.kind]:e.kind}function l$(e,t,n=Fm){let r=[];for(let o of Array.isArray(e)?e:[])!o||typeof o!="object"||r.push({type:"operation",id:o.operation_id,at:typeof o.finished_at=="number"?o.finished_at:typeof o.requested_at=="number"?o.requested_at:null,operation:o});for(let o of Array.isArray(t)?t:[])!o||typeof o!="object"||r.push({type:"cleanup",id:o.bead_id,at:typeof o.at=="number"?o.at:null,cleanup:o});return r.sort((o,i)=>o.at===null&&i.at===null?String(o.id||"").localeCompare(String(i.id||"")):o.at===null?1:i.at===null?-1:i.at-o.at),r.slice(0,Math.max(0,n))}function c$(e){if(e.type==="cleanup")return!0;let t=e.operation;return s$.has(t.state)&&!t.dismissed&&!t.superseded_by}function u$(e,t,n={}){let r=l$(e,t,1/0),o=n.expanded===!0?Fm:o$,i=new Set(r.slice(0,o)),s=r.filter(l=>i.has(l)||c$(l));return{visible:s,hidden:r.length-s.length}}function jm(e){if(e.type==="cleanup")return"warn";let t=e.operation.state;return t==="succeeded"?"ok":t==="failed"?"fail":"live"}function d$(e){if(e.type==="cleanup")return"\uBA48\uCDA4";switch(e.operation.state){case"succeeded":return"\uC131\uACF5";case"failed":return"\uC2E4\uD328";case"retry_pending":return"\uC7AC\uC2DC\uB3C4 \uC911";case"running":return"\uC2E4\uD589 \uC911";default:return"\uB300\uAE30"}}function Bm(e){let t=e.filter(n=>n.value);return t.length===0?"":c`<details class="worker-ev__details">
    <summary>세부</summary>
    <dl class="worker-ev__kv">
      ${t.map(n=>{let r=n.copy===!0?Xr(n.value):n.value;return c`<div>
          <dt>${n.term}</dt>
          <dd>${r}</dd>
        </div>`})}
    </dl>
  </details>`}function Um(e,t="",n=!1){return!e&&!t?"":c`<p
    class="worker-ev__explain${n?" worker-ev__explain--warn":""}"
  >
    <span class="worker-ev__cause">${e}</span>${t?c`<br />${t}`:""}
  </p>`}function p$(e,t){if(!e||typeof e!="object")return;let n=t&&typeof t=="object"?t.kind:"";if(!Object.hasOwn(qm,n))return;let r=e[qm[n]],o=r&&typeof r=="object"?r.timeout_ms:void 0;return typeof o=="number"&&Number.isFinite(o)?o:void 0}function f$(e,t){let n=M_(e,t),r=N_(e);return!n&&!r?"":c`<p class="worker-ev__why">
    ${n?c`<span class="worker-ev__why-line">${n}</span>`:""}${r?c`<span class="worker-ev__why-line">${r}</span>`:""}
  </p>`}function _$(e){return e.state!=="failed"||e.superseded_by||e.dismissed?"":c`<div class="worker-ev__acts">
    <button
      type="button"
      class="worker-ev__btn worker-repo-op__dismiss"
      data-operation-id=${e.operation_id}
      title="사람이 확인한 실패로 접수합니다 — 기록은 그대로 남고 해결 필요 집계에서만 빠집니다"
    >
      기록 닫기
    </button>
  </div>`}function m$(e,t){let n=e.operation,r=n.state==="failed",o=n.failure?n.failure.code:"";return c`<li
    class="worker-ev"
    data-operation-id=${n.operation_id}
    data-state=${n.state}
  >
    <span
      class="worker-ev__t"
      title=${e.at?rn(e.at):""}
      >${Wi(e.at)||"\u2014"}</span
    >
    <span class="worker-ev__node" aria-hidden="true"
      ><span class="worker-ev__dot worker-ev__dot--${jm(e)}"></span
    ></span>
    <div class="worker-ev__body">
      <div class="worker-ev__line1">
        <span class="worker-ev__what">${a$(n)}</span>
        <span class="worker-ev__meta"
          >${n.target_base}@${Ui(n.target_sha)}${typeof n.elapsed_ms=="number"?` \xB7 ${Jr(n.elapsed_ms)}`:""}</span
        >
        <span class="worker-ev__st worker-ev__st--${jm(e)}"
          >${d$(e)}</span
        >
        ${n.dismissed?c`<span class="worker-ev__st worker-ev__st--quiet">접수됨</span>`:""}
        ${n.superseded_by?c`<span class="worker-ev__st worker-ev__st--quiet">덮임</span>`:""}
        ${n.source==="manual"?c`<span
              class="worker-ev__st worker-ev__st--manual"
              title="사람이 배포 실행을 눌러 시작한 작업입니다"
              >수동</span
            >`:""}
      </div>
      ${r?Um(P_(n.failure_kind,o)):""}
      ${f$(n,p$(t,n))}
      ${_$(n)}
      ${Bm([{term:"\uC2E4\uD328 \uCF54\uB4DC",value:r?o:""},{term:"script",value:[n.script_path||"",n.script_blob_sha?`blob ${Ui(n.script_blob_sha)}`:"",Number.isInteger(n.exit_code)?`exit ${n.exit_code}`:""].filter(Boolean).join(" \xB7 ")},{term:"\uB85C\uADF8",value:n.log_path||"",copy:!0},{term:"\uCD9C\uB825",value:n.output_tail||""}])}
    </div>
  </li>`}function g$(e){let t=e.cleanup,n=no(t.step);return c`<li
    class="worker-ev"
    data-bead-id=${t.bead_id}
    data-state="cleanup_stalled"
  >
    <span
      class="worker-ev__t"
      title=${e.at?rn(e.at):""}
      >${Wi(e.at)||"\u2014"}</span
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
        ${Sp(t.step).map(r=>c`<li
              class="worker-step worker-step--${r.state}"
              data-step=${r.step}
            >
              <span class="worker-step__pip" aria-hidden="true"></span>
              <span class="worker-step__lb">${r.label}</span>
            </li>`)}
      </ol>
      ${Um(Lr(t.reason),typeof t.retry_count=="number"&&t.retry_count>0?`${t.retry_count}\uD68C \uC790\uB3D9 \uC7AC\uC2DC\uB3C4 \uD6C4\uC5D0\uB3C4 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4 \u2014 \uC815\uB9AC\uB97C \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uBA74 \uBA48\uCD98 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4.`:"\uC815\uB9AC\uB97C \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uBA74 \uBA48\uCD98 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4.",!0)}
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
      ${Bm([{term:"\uC2E4\uD328 \uCF54\uB4DC",value:t.reason||""},{term:"\uC9C4\uB2E8",value:t.detail||""},{term:"\uB85C\uADF8",value:t.log_path||"",copy:!0},{term:"\uCD9C\uB825",value:t.output_tail||""}])}
    </div>
  </li>`}function h$(e){let t=typeof e.hidden=="number"?e.hidden:0,n=e.expanded===!0;return c`<section class="worker-repo-drawer" data-seam="repo-ops-timeline">
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
          ${e.events.map(r=>r.type==="cleanup"?g$(r):m$(r,e.repo_ops))}
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
  </section>`}function Wm(e,t={}){let n=null;function r(){if(n===null){lt(c``,e);return}let s=u$(n.operations,n.cleanup_failures,{expanded:n.expanded});lt(h$({events:s.visible,hidden:s.hidden,expanded:n.expanded,repo:n.repo,repo_ops:n.repo_ops}),e)}e.addEventListener("click",s=>{let l=s.target;if(l?.closest?.('[data-seam="repo-ops-close"]')){i();return}l?.closest?.('[data-seam="repo-ops-more"]')&&n&&(n.expanded=!n.expanded,r())});function o(s){n={operations:s.operations,cleanup_failures:s.cleanup_failures,repo:s.repo||"",repo_ops:s.repo_ops||null,expanded:!1},r()}function i(){n!==null&&(n=null,r(),t.onClose&&t.onClose())}return{open:o,close:i,isOpen:()=>n!==null,refresh(s){n&&(n={operations:s.operations,cleanup_failures:s.cleanup_failures,repo:s.repo||"",repo_ops:s.repo_ops||null,expanded:n.expanded},r())}}}var b$="session-preferred",y$=["external_roundtrip","user_feedback_loop"];function Hm(e,t){if(!gs(e).includes(b$)||typeof t!="object"||t===null)return"";let n=t.session_preferred_reason;return typeof n=="string"&&y$.includes(n)?n:""}var v$="spec-after-blocker";function zm(e,t){return gs(e).includes(v$)&&Array.isArray(t)&&t.length>0}var k$=Ht("views:worker:adapter"),w$="tab:worker:ready",$$="tab:worker:blocked",x$="tab:worker:in-progress",A$="tab:worker:resolved",S$="tab:worker:closed",E$="\u{1F512} blocked",T$={revision:0,auto_advance:!1,auto_merge:!1,slots:oa,queue:[],serial_lanes:[],serial_lane_count:0,pr_wait:[],done:[]},C$=["claude_account","codex_account"],R$=[...To,...C$];function O$(e){let t=e&&e.parent;return(typeof t=="string"?t.length>0:!!(t&&t.id))||/\.\d+$/.test(e&&e.id||"")}function I$(e){let t=e&&typeof e=="object"?e.awaiting_user:void 0,n=typeof t=="string"?t.trim():"";return n.length>0?`${Ml}: ${n}`:Ml}function Dr(e){return e&&typeof e=="object"?e:{}}function L$(e){let t={};for(let n of R$){let r=e[n];typeof r=="string"&&r.length>0&&(t[n]=r)}return t}function D$(e){let t=new Map;for(let r of e){if(!r||typeof r.id!="string"||r.id.length===0)continue;let o=Dr(r.metadata).carried_from;if(!(typeof o!="string"||o.length===0))for(let i of Vs(r)){let s=t.get(i);s||(s=new Set,t.set(i,s)),s.add(r.id)}}let n=new Map;for(let[r,o]of t)n.set(r,[...o].sort());return n}function P$(e){let t=e.replace(/\/+$/,""),n=t.lastIndexOf("/");return n>=0?t.slice(n+1):t}function Km(e={}){let{queueStore:t,issueStores:n,transport:r,getWorkspacePath:o,onInvalidate:i}=e,s=n?yo(n):null,l=new Map,a={},u=null,d=0,f=null,_=!1;function y(){_||!i||i()}function g(j){return u===j?a:{}}async function C(){if(!r||_)return;let j=o?.()||"";if(u===j||f&&f.key===j&&f.generation===d)return;let B=++d;f={key:j,generation:B};let W=null;try{W=await Promise.resolve(r("get-session-defaults",{}))}catch(T){if(B!==d)return;f=null,k$("get-session-defaults failed: %o",T),y();return}B===d&&(a=W&&typeof W.values=="object"&&W.values!==null?{...W.values}:{},u=j,f=null,y())}function k(){u=null,d+=1,C()}function X(){for(let[j,B]of l)B==="failed"&&l.delete(j)}function ae(j,B){return s?s.selectBoardColumn(j,B):[]}function H(j,B,W,T){let S=new Set(W.map(K=>K.id)),I=new Set,O=new Map,J=[];for(let K of[...B,...W]){if(I.has(K.id)||O$(K))continue;let te=hs(K,j);te.location===null&&(I.add(K.id),O.set(K.id,te),J.push(K))}let ce=Rm(J,uo(T)),Se=Dr(j.bead_scope);return ce.map(K=>{let te=O.get(K.id),fe=ho(K),Re=fe.evidence==="published",V=typeof K.workflow?.route=="string"&&K.workflow.route||(K.metadata&&typeof K.metadata.route=="string"?K.metadata.route:""),le=te.worker_ineligible,ee=le||!Object.hasOwn(K,"labels")?"":Hm(K.labels,K.metadata),M=S.has(K.id),oe=M?Vs(K):[],se=[];M&&oe.length===0&&se.push(E$),te.awaiting_user&&se.push(I$(K.metadata)),te.missing_description?se.push("missing_description"):te.spec==="conflict"?se.push("spec_id_conflict"):te.spec==="none"?se.push("spec \uC5C6\uC74C"):te.spec==="draft"&&se.push("spec \uBBF8\uBC1C\uD589(draft)");let he=Se[K.id];return{bead_id:K.id,title:K.title||K.id,route:V,spec_id:fe.conflict?"":fe.path,published:Re,blocked:M,blocked_by:oe,labels:Array.isArray(K.labels)?K.labels:[],created_at:K.created_at,updated_at:K.updated_at,status:K.status,workflow:K.workflow||null,exec_pins:L$(Dr(K.metadata)),rec:null,...he&&Array.isArray(he.scope)?{scope:he.scope}:{},eligible:te.placeable,route_ok:te.route_ok,awaiting_user:te.awaiting_user,missing_description:te.missing_description,placement_spec:te.spec,reason:se.join(" \xB7 "),worker_ineligible:le,session_preferred:ee.length>0,session_preferred_reason:ee,spec_after_blocker:zm(K.labels,oe),release_info:K.release_info,dependents_info:K.dependents_info}})}function N(j){let[B,W,T,S,I]=j,O=fi([...B,...W,...T,...S,...I]),J=D$([...B,...W,...T,...S]),ce={},Se=(K,te)=>{if(!K||typeof K.id!="string"||K.id.length===0)return;let fe=ce[K.id]||(ce[K.id]={});if(typeof K.priority=="number"&&!("priority"in fe)&&(fe.priority=K.priority),typeof K.from_id=="string"&&!("from_id"in fe)&&(fe.from_id=K.from_id),te&&!("metadata"in fe)){fe.metadata=Dr(K.metadata);let Re=Dr(K.workflow).route;typeof Re=="string"&&Re.length>0&&(fe.route=Re)}};for(let K of[...B,...W,...T])Se(K,!0);for(let K of[...S,...I])Se(K,!1);for(let K of new Set([...Object.keys(ce),...O.keys()])){let te=_i(O,K);if(te.total>0){let fe=ce[K]||(ce[K]={});fe.rollup=te}}for(let[K,te]of J){let fe=ce[K]||(ce[K]={});fe.carried_to=te}return ce}function P(j,B,W,T){let S=new Set((Array.isArray(j.done)?j.done:[]).map(O=>O?.bead_id).filter(O=>typeof O=="string")),I=[];for(let O of B){let J=kr(O.closed_at);if(typeof O.id!="string"||S.has(O.id)||J===null||T!==void 0&&J<T||typeof O.comment_count!="number"||O.comment_count<=0)continue;let ce=`${W}\0${O.id}\0${String(O.updated_at)}\0${O.comment_count}`,Se=l.get(ce);if(Se===void 0&&r&&(l.set(ce,"pending"),Promise.resolve(r("get-comments",{id:O.id})).then(te=>{let fe=Array.isArray(te)&&te.some(Re=>Aa(typeof Re?.text=="string"?Re.text:"")?.lane==="session");l.set(ce,fe?"session":"not-session"),y()}).catch(()=>{l.set(ce,"failed"),y()})),Se!=="session")continue;let K=kr(O.started_at);I.push({id:O.id,title:O.title||O.id,reason:"",draggable:!1,done:!0,lane:"done",selectable:!1,selected:!1,badges:["\uC138\uC158 \uC791\uC5C5"],alert:!1,usage:null,work_ms:K!==null&&J>=K?J-K:null,work_kind:"session",done_at:J,created_at:O.created_at,updated_at:O.updated_at})}return I}return{read(j){if(!t)return{workspaces:[],workspaces_state:[]};let B=t.get()||T$,W=o?.()||"",T=j&&typeof j.done_since=="number"?j.done_since:void 0,S=ae(w$,"ready"),I=ae($$,"blocked"),O=ae(x$,"in_progress"),J=ae(A$,"resolved"),ce=ae(S$,"closed");return{workspaces:[{...B,bead_titles:{...Dr(B.bead_titles),...Object.fromEntries([...S,...I].filter(Se=>Se&&typeof Se.id=="string").map(Se=>[Se.id,Se.title||Se.id]))},root_dir:W,name:P$(W),runnable:H(B,S,I,j?j.candidate_sort:void 0),session_done:P(B,ce,W,T),bead_overlay:N([S,I,O,J,ce])}],workspaces_state:[{root_dir:W,revision:B.revision,auto_advance:B.auto_advance,auto_merge:B.auto_merge,slots:typeof Dr(B.workspace_info).slots=="number"?Dr(B.workspace_info).slots:B.slots,runner_catalog:B.runner_catalog,execution_defaults:B.execution_defaults,session_defaults:g(W),orchestration_model:B.orchestration_model,orchestration_effort:B.orchestration_effort,orchestration_speed:B.orchestration_speed,quick_fix_orchestration_model:B.quick_fix_orchestration_model,quick_fix_orchestration_effort:B.quick_fix_orchestration_effort,quick_fix_orchestration_speed:B.quick_fix_orchestration_speed,issue_prefix:""}]}},ensureSessionDefaults(){C()},refreshSessionDefaults:k,notifyIssuesChanged:X,destroy(){_=!0,d+=1,f=null,l.clear()}}}var za=1,Gm=5,M$={root_dir:"",name:"",auto_advance:!1,auto_merge:!1,slots:za,revision:0,runner_catalog:{},items:[],sublanes:{parallel:[],serial:[]},serial_lane_count:0,raw_queue_length:0,live_count:0,over_cap:!1,merge:{positions:new Map,resolutions:new Map,continuations:new Map,authorities:new Map,state:{active:null,failures:{},waiting:null},auto_excluded:[],running:!1},token_total:null,cleanup_failures:[],declared_base:null,repo_operations:[]};function hn(e){return e&&typeof e=="object"?e:{}}var Qm="beads-ui.worker.candidate-filter",Vc={show_blocked:!1,readiness:"all",routes:[]},N$=1e3;function q$(){try{let e=window.localStorage.getItem(Qm);if(!e)return{...Vc};let t=JSON.parse(e);if(!t||typeof t!="object")return{...Vc};let n=t.readiness;return{show_blocked:t.show_blocked===!0,readiness:n==="ready"||n==="not_ready"?n:"all",routes:ro(t.routes)}}catch{return{...Vc}}}function j$(e){try{window.localStorage.setItem(Qm,JSON.stringify(e))}catch{}}var Xm="bdui.worker.done-range";function F$(){try{let e=window.localStorage.getItem(Xm);return e===null?"today":Qn(e)}catch{return"today"}}function B$(e){try{window.localStorage.setItem(Xm,e)}catch{}}function Vm(e){let t=Array.isArray(e)&&e.length>0?e[0]:null;if(!t)return"";let n=typeof t.title=="string"?t.title:t.id||"";return n.length>22?`${n.slice(0,22)}\u2026`:n}function U$(e){return e==="receipt_not_current"?"\uB9AC\uBDF0 \uD6C4\uC5D0\uB3C4 \uC601\uC218\uC99D\uC774 \uCD5C\uC885 head\uC5D0 \uC720\uD6A8\uD558\uC9C0 \uC54A\uC74C":e==="cancelled"?"\uB9AC\uBDF0 \uC138\uC158 \uCDE8\uC18C\uB428":e.startsWith("launch_failed:")?`\uB9AC\uBDF0 \uC138\uC158 \uC2DC\uC791 \uC2E4\uD328(${e.slice(14)})`:e.startsWith("session_failed:")?`\uB9AC\uBDF0 \uC138\uC158 \uBE44\uC815\uC0C1 \uC885\uB8CC(${e.slice(15)})`:`\uB9AC\uBDF0 \uC138\uC158 \uC2E4\uD328(${e})`}function Ym(e){if(e.startsWith("receipt_unbacked:"))return`\uC2E4\uD589 \uC601\uC218\uC99D \uC790\uB3D9 \uAC80\uC99D \uBD88\uAC00(${e.slice(17)}) \u2014 [\uBA38\uC9C0] \uD074\uB9AD\uC73C\uB85C \uC218\uB3D9 \uC9C4\uD589 \uAC00\uB2A5`;switch(e){case"not_in_pr_wait":return"PR \uB300\uAE30 \uC0C1\uD0DC \uB3D9\uAE30\uD654 \uC2E4\uD328";case"resolution_round_cap":return"\uCDA9\uB3CC \uD574\uC18C 2\uD68C \uCD08\uACFC";case"resolution_rebase_cap":return"\uD050 \uC7AC\uCDA9\uB3CC 3\uD68C \uCD08\uACFC";case"resolution_timeout":return"\uCDA9\uB3CC \uD574\uC18C \uB300\uAE30 \uC2DC\uAC04 \uCD08\uACFC";case"resolution_refused":return"\uD574\uC18C \uC138\uC158 \uB514\uC2A4\uD328\uCE58 \uAC70\uBD80";case"worktree_missing":return"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uD574\uC18C \uD544\uC694";case"worktree_restore_branch_mismatch":return"\uC6CC\uD06C\uD2B8\uB9AC \uBCF5\uC6D0 \uC2E4\uD328 \u2014 \uBE0C\uB79C\uCE58 \uC774\uB984 \uBD88\uC77C\uCE58";case"worktree_restore_path_exists":return"\uC6CC\uD06C\uD2B8\uB9AC \uBCF5\uC6D0 \uC2E4\uD328 \u2014 \uACBD\uB85C \uC774\uBBF8 \uC788\uC74C";case"worktree_restore_branch_missing":return"\uC6CC\uD06C\uD2B8\uB9AC \uBCF5\uC6D0 \uC2E4\uD328 \u2014 origin\uC5D0 \uBE0C\uB79C\uCE58 \uC5C6\uC74C";case"worktree_restore_branch_diverged":return"\uC6CC\uD06C\uD2B8\uB9AC \uBCF5\uC6D0 \uC2E4\uD328 \u2014 \uB85C\uCEEC \uBE0C\uB79C\uCE58\uAC00 origin\uACFC \uB2E4\uB984";case"worktree_restore_failed":return"\uC6CC\uD06C\uD2B8\uB9AC \uBCF5\uC6D0 \uC2E4\uD328";case"merge_unconfirmed_timeout":return"\uBA38\uC9C0 \uD655\uC778 \uC2DC\uAC04 \uCD08\uACFC";case"pr_closed_unmerged":return"PR \uB2EB\uD798";case"merge_error":return"\uBA38\uC9C0 \uC624\uB958";case"spec_id_missing":return"\uC2A4\uD399 ID \uAE30\uB85D \uC5C6\uC74C";default:return e}}function W$(e){if(e==="lane_occupied")return"\uC2E4\uD589 \uB808\uC778\uC5D0 \uB0A8\uC544 \uC788\uC5B4 \uBA38\uC9C0 \uB300\uC0C1\uC774 \uC544\uB2D9\uB2C8\uB2E4";let t="\uBA38\uC9C0 \uD050\uC5D0 \uB123\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 (\uC774\uBBF8 \uB300\uAE30 \uC911\uC774\uAC70\uB098 \uB300\uC0C1 \uC544\uB2D8)";return typeof e=="string"&&e.length>0?`${t}: ${e}`:t}function H$(e){return!e||typeof e!="object"?"\uC138\uC158 \uAE30\uB3D9 \uC751\uB2F5\uC744 \uBC1B\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4":e.conflict===!0?"\uD050\uAC00 \uBC14\uB00C\uC5B4 \uD074\uB9AD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uB20C\uB7EC\uC8FC\uC138\uC694":e.session==="already_running"?`\uC774\uBBF8 \uC5F4\uB824 \uC788\uC2B5\uB2C8\uB2E4 \xB7 ${e.tmux_window||"?"}`:e.launched!==!0?`\uC138\uC158 \uAE30\uB3D9 \uC2E4\uD328: ${e.reason||"unknown"}`:e.mode==="fork"?null:`\uC0C8 \uC138\uC158\uC73C\uB85C \uC2DC\uC791 (${e.fallback_reason||"unknown"})`}function z$(e){return e&&e.launched===!0?"success":"error"}function K$(e){if(e==="worker_sessions_busy")return"\uD574\uC18C \uB300\uAE30 \u2014 \uC2E4\uD589 \uC2AC\uB86F \uB300\uAE30 \uC911";if(typeof e!="string"||!e.startsWith("completion_waiting:"))return null;let t=e.slice(19);if(t.length===0)return null;switch(t){case"gating":return"\uBA38\uC9C0 \uC870\uAC74 \uD655\uC778 \uC911";case"merging":return"\uBA38\uC9C0 \uC911";case"cleaning":return"\uB9C8\uBB34\uB9AC \uC911";case"paused":return"\uC790\uB3D9 \uC9C4\uD589 \uC77C\uC2DC\uC815\uC9C0";case"needs_human":return"\uD655\uC778 \uD544\uC694";default:return null}}function G$(e){if(!e||typeof e!="object")return null;switch(e.state){case"waiting":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC911",live:!0};case"yielded":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uACC4\uC18D \uC911 \xB7 \uC644\uB8CC \uD6C4 \uC6B0\uC120 \uBA38\uC9C0",live:!0};case"ready":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC644\uB8CC \xB7 \uC7AC\uAC80\uC99D \uB300\uAE30",live:!1};default:return null}}var V$=new Set(["paused","needs_human","waiting_metadata","reviewing","retrying"]),Y$=new Set(["waiting_metadata","reviewing","retrying"]),Yc=new Set(["review_receipt_missing","review_receipt_stale","review_receipt_invalid","review_receipt_undetermined"]);function Q$(e){let t=e&&typeof e=="object"?e.auto_resolution:null,n=t&&typeof t=="object"&&!Array.isArray(t)?t:null;if(!n||!e)return null;let r=typeof n.origin_reason=="string"&&n.origin_reason.length>0?`\uC6D0 \uC0AC\uC720: ${n.origin_reason}`:"";switch(e.phase){case"waiting_metadata":return{label:"\uC815\uC815 \uB300\uAE30",details:[r,"\uBA54\uD0C0\uB370\uC774\uD130 \uC815\uC815\uC774 \uAD00\uCE21\uB418\uBA74 \uC790\uB3D9 \uC7AC\uAC1C"].filter(Boolean),live:!1};case"retrying":{let o=Number.isInteger(n.attempts)?Math.max(0,Number(n.attempts)):0,i=Number.isInteger(n.attempt_cap)&&Number(n.attempt_cap)>0?Number(n.attempt_cap):0,s=typeof n.next_at=="number"?rn(n.next_at):"",l=typeof n.last_error=="string"&&n.last_error.length>0?n.last_error:"";return{label:i>0?`\uC7AC\uC2DC\uB3C4 ${Math.min(o,i)}/${i}`:`\uC7AC\uC2DC\uB3C4 ${o}`,details:[r,s?`\uB2E4\uC74C \uC2DC\uAC01 ${s}`:"",l?`\uB9C8\uC9C0\uB9C9 \uC624\uB958: ${l}`:""].filter(Boolean),live:!0}}default:return null}}function X$(e){if(typeof e!="string")return"";for(let t of["retry_exhausted:","auto_review_exhausted:"])if(e.startsWith(t))return e.slice(t.length);return""}function Z$(e,t=null){if(!e||typeof e!="object")return null;let n="";switch(e.phase){case"gating":n="\uBA38\uC9C0 \uC870\uAC74 \uD655\uC778 \uC911";break;case"merging":n="\uBA38\uC9C0 \uC911";break;case"cleaning":n="\uB9C8\uBB34\uB9AC \uC911";break;case"waiting_metadata":case"reviewing":case"retrying":if(!t)return null;n=t.label;break;case"paused":n="\uC790\uB3D9 \uC9C4\uD589 \uC77C\uC2DC\uC815\uC9C0";break;case"needs_human":n="\uD655\uC778 \uD544\uC694";break;case"completed":return null;default:return null}let r=[n];e.head_sha&&r.push(`head ${e.head_sha}`),e.base_sha&&r.push(`base ${e.base_sha}`),(e.failure_stage||e.failure_reason)&&r.push(`${e.failure_stage||"failure"} \xB7 ${e.failure_reason||"\uC6D0\uC778 \uBBF8\uC0C1"}`);let o=X$(e.terminal_reason);o&&r.push(`\uC6D0 \uC0AC\uC720: ${o}`);let i=e.phase==="needs_human"&&!o?co(e.terminal_reason):null;i&&r.push(e.failure_stage?`${e.failure_stage} \xB7 ${i}`:i);for(let s of t?t.details:[])r.push(s);return e.active_attempt_id&&r.push(`attempt ${e.active_attempt_id}`),e.evidence&&r.push(e.evidence),e.log_path&&r.push(e.log_path),{badge:n,title:r.join(`
`),alert:e.phase==="needs_human",lock_actions:!V$.has(e.phase)}}function J$(e){if(!e||typeof e!="object")return[];let t=e.blocking_codes;return Array.isArray(t)?t.filter(n=>typeof n=="string"&&n.length>0):[]}function ex(e){if(!e||typeof e!="object")return[];let t=e.badge_codes;return Array.isArray(t)?t.filter(n=>typeof n=="string"&&n.length>0):[]}function tx(e){let t=e.queue_failure?`\uBA38\uC9C0 \uC2E4\uD328 \uC6D0\uBB38: ${e.queue_failure}`:e.auto_skip?`\uC790\uB3D9 \uC81C\uC678 \uC6D0\uBB38: ${e.auto_skip}`:"",n=(i,s={})=>{let l=[s.title||"",t].filter(Boolean);return{label:i,title:l.join(`
`),live:s.live===!0,alert:s.alert===!0}};if(e.continuation_required)return n("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694",{alert:!0});if(e.queueing)return e.queueing==="cleanup"?n("\uC815\uB9AC \uC7AC\uC2DC\uB3C4 \uC694\uCCAD \uC911",{title:"\uC11C\uBC84 \uC751\uB2F5\uC744 \uAE30\uB2E4\uB9AC\uB294 \uC911\uC785\uB2C8\uB2E4",live:!0}):n("\uD050 \uB4F1\uB85D \uC911",{title:"\uBA38\uC9C0 \uD050\uC5D0 \uB123\uB294 \uC911 \u2014 \uC11C\uBC84 \uC751\uB2F5\uC744 \uAE30\uB2E4\uB9BD\uB2C8\uB2E4",live:!0});if(e.merge_step)return e.gate?.tier==="merged"?n("\uBA38\uC9C0\uB428",{title:e.merge_step.label,alert:e.merge_step.failed===!0}):n("\uBA38\uC9C0 \uC911",{title:e.merge_step.label,live:!0});if(e.conflict_badge)return n(e.conflict_badge,{live:e.conflict_live===!0});if(e.auto_resolution)return n(e.auto_resolution.label,{title:e.auto_resolution.details.join(`
`),live:e.auto_resolution.live===!0});if(e.recovery?.lock_actions)return n(e.recovery.badge,{title:e.recovery.title,live:!0});if(e.cleanup_failed)return n(e.cleanup_label?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${e.cleanup_label}`:"\uC815\uB9AC \uBA48\uCDA4",{title:e.cleanup_failed.reason||"",alert:!0});if(e.base_exception)return n("\uB2E4\uB978 base \uB300\uC0C1",{title:e.base_exception,alert:!0});let r=J$(e.receipt_check),o=e.conflicting||e.gate?.reason==="base_behind"||r.length>0;if(e.auto_pending&&o)return n("\uD655\uC778 \uC911",{title:"\uBA38\uC9C0 \uD050\uAC00 \uC790\uB3D9\uC73C\uB85C \uCC98\uB9AC \uC911 \u2014 \uB2E4\uC74C \uAD00\uCE21\uC744 \uAE30\uB2E4\uB9BD\uB2C8\uB2E4",live:!0});if(e.conflicting)return n("\uCDA9\uB3CC \uD574\uACB0 \uD544\uC694",{alert:!0});if(e.gate?.reason==="base_behind")return n("base \uAC31\uC2E0 \uD544\uC694",{alert:!0});if(Yc.has(e.gate?.reason)){let i=e.gate.reason==="review_receipt_stale"?"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC774 \uD604\uC7AC head\uC758 \uC870\uC0C1\uC774 \uC544\uB2D9\uB2C8\uB2E4 \u2014 \uD788\uC2A4\uD1A0\uB9AC \uC7AC\uC791\uC131\xB7\uBE0C\uB79C\uCE58 \uB9AC\uC14B \uBCF5\uAD6C \uACBD\uB85C\uC785\uB2C8\uB2E4. [\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0]\uAC00 \uC774 \uBCF4\uB958\uC758 \uCD9C\uAD6C\uC785\uB2C8\uB2E4":e.gate.reason==="review_receipt_invalid"?"\uB9AC\uBDF0 \uC601\uC218\uC99D \uAE30\uB85D\uC774 \uC131\uB9BD\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4 \u2014 [\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0]\uAC00 \uC774 \uBCF4\uB958\uC758 \uCD9C\uAD6C\uC785\uB2C8\uB2E4":e.gate.reason==="review_receipt_undetermined"?"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC758 ancestry probe\uB97C \uC644\uB8CC\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 \u2014 [\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0]\uAC00 \uC774 \uBCF4\uB958\uC758 \uCD9C\uAD6C\uC785\uB2C8\uB2E4":"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 [\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0]\uAC00 \uC774 \uBCF4\uB958\uC758 \uCD9C\uAD6C\uC785\uB2C8\uB2E4";if(e.review_session?.active===!0)return n(e.review_session.origin==="auto"?"\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694 \xB7 \uC790\uB3D9 \uB9AC\uBDF0 \uC138\uC158 \uC2E4\uD589 \uC911":"\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694 \xB7 \uB9AC\uBDF0 \uC138\uC158 \uC2E4\uD589 \uC911",{title:`${i}
\uB9AC\uBDF0 \uC138\uC158\uC774 \uC2E4\uD589 \uC911\uC785\uB2C8\uB2E4 \u2014 \uB05D\uB098\uBA74 \uC601\uC218\uC99D\uC744 \uB2E4\uC2DC \uD310\uC815\uD569\uB2C8\uB2E4`,live:!0});if(e.auto_review_wait==="slot")return n("\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694 \xB7 \uB9AC\uBDF0 \uC138\uC158 \uC2AC\uB86F \uB300\uAE30",{title:`${i}
\uC2E4\uD589 \uC2AC\uB86F\uC774 \uBE44\uBA74 \uC790\uB3D9\uC73C\uB85C \uB9AC\uBDF0 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4. \uC9C0\uAE08 \uD074\uB9AD\uD558\uBA74 \uC989\uC2DC \uB744\uC6C1\uB2C8\uB2E4`,live:!0});if(e.review_session?.failure){let s=e.review_dispatch?.state==="exhausted"&&e.review_session.origin==="auto";return n(`\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694 \xB7 ${s?"\uC790\uB3D9 \uB9AC\uBDF0 1\uD68C \uC18C\uC9C4 \xB7 ":""}${U$(e.review_session.failure)}`,{title:`${i}
\uC9C1\uC804 \uB9AC\uBDF0 \uC138\uC158 \uC885\uB8CC \uC0AC\uC720: ${e.review_session.failure}`,alert:!0})}return n("\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694",{title:i,alert:!0})}return e.gate?.reason==="spec_id_missing"?n("\uC2A4\uD399 ID \uB204\uB77D",{title:"native spec_id \uBBF8\uAE30\uB85D \u2014 bd update --spec-id \uD544\uC694",alert:!0}):r.length>0?n(`\uC601\uC218\uC99D \uD655\uC778 \uD544\uC694 \xB7 ${r[0]}`,{title:`\uC131\uB9BD\uD558\uC9C0 \uC54A\uB294 \uC2E4\uD589 \uC601\uC218\uC99D \u2014 ${r.join(", ")}`,alert:!0}):e.recovery?n(e.recovery.badge,{title:e.recovery.title,alert:!0}):e.gate?.tier==="verify"&&e.gate.gate_badge==="\uAC80\uC99D \uC2E4\uD328"?n("\uAC80\uC99D \uC2E4\uD328",{title:e.gate.reason||"",alert:!0}):e.queue_failure?n(`\uBA38\uC9C0 \uC2E4\uD328 \u2014 ${Ym(e.queue_failure)}`,{title:e.queue_failure,alert:!0}):e.auto_skip?n(`\uC790\uB3D9 \uC81C\uC678 \u2014 ${Ym(e.auto_skip)}`,{title:e.auto_skip,alert:!0}):e.queued&&!e.queue_active?n(`\uBA38\uC9C0 \uB300\uAE30 #${e.queue_position}`):e.gate?.enabled===!0?n("\uBA38\uC9C0 \uAC00\uB2A5"):e.gate?.tier==="merged"?n("\uBA38\uC9C0\uB428"):e.gate?.tier==="closed_unmerged"?n("\uB2EB\uD798",{alert:!0}):e.activity?n("\uD655\uC778 \uC911",{live:!0}):e.gate?.tier==="undecidable"||e.gate?.reason==="mergeability_unknown"?n("\uC0C1\uD0DC \uD655\uC778 \uC2E4\uD328",{title:e.gate.reason||"",alert:!0}):e.gate?.tier==="unobserved"||e.gate?.tier==="verify"||e.gate?.gate_badge==="\uAD00\uCE21 \uB300\uAE30"?n("\uD655\uC778 \uC911"):e.gate?.gate_badge?n(e.gate.gate_badge,{title:e.gate.reason||"",alert:e.gate.enabled!==!0}):null}function nx(e,t,n,r,o=null,i=null,s=null,l=!1,a=null,u=!0,d=null,f=null,_=null,y={},g=!1,C={},k=null,X={active:!1,failure:null,origin:null},ae=!1){let H=!!a&&a.position>0,N=!!a?.continuation_action&&a.continuation_action.continuation===null,P=!!a&&a.active===!0,j=a&&a.failure||null,B=K$(a?a.waiting:null),W=n[e]||null,T=W&&W.gate?W.gate:null,S=W&&W.pr?W.pr:null,I=G$(a?a.resolution:null),O=Q$(_),J=Z$(_,O),ce=a&&a.authority||null,Se=a&&a.review_dispatch||null,K=a?.hold?.auto_review_wait==="slot"?"slot":null,te=!!_&&typeof _=="object"&&Y$.has(_.phase),fe=H&&!P&&(!ce||te||ce.source==="automatic"&&!g),Re=s==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":I?I.badge:s==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC911":B,V=!!T&&T.base_badge==="\uCDA9\uB3CC",le=!!T&&T.enabled===!0,ee=xs({bead_id:e,merge_sha:C.merge_sha,cleanup_cursor:C.cleanup_cursor,merge_progress:i&&i.merge_progress?i.merge_progress:null,cleanup_failed:r,repo_operations:C.repo_operations}),M=na(ee),oe=i&&!ee&&(i.queueing??null)?i.queueing:null,se=!!r&&["repo_operations","post_merge_jobs","child_sweep","branch_cleanup","parent_close"].includes(r.step)&&!!T&&T.tier==="merged",he=r&&r.step==="repo_operations"&&ee?.failed===!0&&(ee.step==="deploy"||ee.step==="verify")?ee.step:null,xe=l&&!!r&&!!T&&T.tier==="merged",Ze=fe&&(le||V||T?.reason==="base_behind"||Yc.has(T?.reason)||se||xe),G=Yc.has(T?.reason),ge=l&&V&&u===!1,ue=pr(y,e,{external:l,merge_active:P||ee?.step==="merge",merge_queued:H,conflict_active:!!s,cleanup_active:M,merged:!!r||T?.tier==="merged"}),Q=!!ue.operation,Ee=!!r||_?.phase==="needs_human"||!!ue.error,be=H&&!j&&!N&&!se&&!(J&&J.lock_actions),Le=tx({auto_pending:be,continuation_required:N,queueing:oe,merge_step:ee,conflict_badge:Re,conflict_live:I?.live===!0||s==="running",auto_resolution:O,recovery:J,cleanup_failed:r,cleanup_label:r?no(r.step):null,base_exception:f,conflicting:V,gate:T,receipt_check:W&&W.receipt_check?W.receipt_check:null,queue_failure:j,auto_skip:d,queued:H,queue_active:P,queue_position:a?a.position:0,review_session:X,review_dispatch:Se,auto_review_wait:K,activity:Re?null:i&&i.activity||null}),qe=Le?.live===!0&&Le.title?c`<span title=${Le.title}>${Le.label}</span>`:Le?.label||null,Je=ex(W&&W.receipt_check?W.receipt_check:null);return{id:e,title:l?c`${t}<span class="muted"> · 세션</span>`:t,reason:r&&ee?.active!==!0?ta(r.step):"PR \uB300\uAE30",draggable:!1,done:!0,lane:"pr_wait",...k?{dependency_chips:k}:{},external:l,pr_number:S&&typeof S.number=="number"?S.number:null,pr_url:S&&typeof S.url=="string"?S.url:"",completion_badge:Le?.live!==!0&&Le?.title?Le.label:null,completion_title:Le?.title||"",..._?.phase==="needs_human"&&typeof _.log_path=="string"&&_.log_path.length>0?{log_path:_.log_path}:{},...Je.length>0?{receipt_badge:{codes:Je}}:{},badges:qe?[qe]:[],live_badge:Le?.live===!0?qe:null,usage:o,alert:Le?.alert===!0,merge_action:T?.tier==="merged"&&!se&&!xe?!1:!H||N||fe||G,cancel_action:H&&!N,cancel_enabled:!P&&!(J&&J.lock_actions),cancel_title:J&&J.lock_actions?`${J.badge} \u2014 \uC911\uB2E8\uD558\uB824\uBA74 \uC0C1\uB2E8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8\uC744 \uC0AC\uC6A9\uD558\uC138\uC694`:P?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"\uBA38\uC9C0 \uD050\uC5D0\uC11C \uC774 \uD56D\uBAA9\uC744 \uBE8D\uB2C8\uB2E4 (\uB2E4\uC2DC [\uBA38\uC9C0]\uB85C \uB123\uC744 \uC218 \uC788\uC2B5\uB2C8\uB2E4)",discard:ue,discard_action:ue.action,resolve_action:Ee,resolve_enabled:!ae,resolve_title:ae?"\uC138\uC158 \uAE30\uB3D9 \uC694\uCCAD \uC911 \u2014 \uC11C\uBC84 \uC751\uB2F5\uC744 \uAE30\uB2E4\uB9BD\uB2C8\uB2E4":"\uC774 \uC2E4\uD328\uB97C \uC0AC\uB78C\uC774 \uC774\uC5B4\uBC1B\uB294 \uB300\uD654\uD615 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4 \u2014 \uAE30\uB85D\uB41C \uC138\uC158\uC774 \uC788\uC73C\uBA74 fork\uD558\uACE0, \uC5C6\uC73C\uBA74 \uC0C8 \uC138\uC158\uC5D0 \uC0AC\uC720\uB97C \uC2E3\uC2B5\uB2C8\uB2E4",merge_step:ee,discard_enabled:ue.enabled,discard_title:ue.title,merge_enabled:!ee&&!oe&&!s&&!Q&&!f&&!(J&&J.lock_actions)&&!ge&&X.active!==!0&&(le||V||T?.reason==="base_behind"||G||se||xe||Ze||te&&!P),merge_label:N?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":se||xe?he==="deploy"?"\uBC30\uD3EC \uC7AC\uC2DC\uB3C4 \uD6C4 \uC815\uB9AC":he==="verify"?"\uAC80\uC99D \uC7AC\uC2DC\uB3C4 \uD6C4 \uC815\uB9AC":"\uC815\uB9AC \uC7AC\uC2DC\uB3C4":V&&!ee&&!se?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":T?.reason==="base_behind"?"base \uAC31\uC2E0 \uD6C4 \uBA38\uC9C0":G?"\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0":fe?"\uB2E4\uC2DC \uBA38\uC9C0":void 0,merge_title:Q?ue.error?`\uD3D0\uAE30 \uC2E4\uD328: ${ue.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${ue.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:N?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":oe?"\uC694\uCCAD\uC744 \uBCF4\uB0B4\uB294 \uC911 \u2014 \uC11C\uBC84 \uC751\uB2F5\uC744 \uAE30\uB2E4\uB9BD\uB2C8\uB2E4":ee?`\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 ${ee.label}`:he?`\uBA38\uC9C0 \uC644\uB8CC \u2014 ${he==="deploy"?"\uBC30\uD3EC":"\uAC80\uC99D"} \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD574 \uC815\uB9AC\uAC00 \uBA48\uCDC4\uC2B5\uB2C8\uB2E4. \uD074\uB9AD\uD558\uBA74 \uC800\uC7A5\uC18C \uC791\uC5C5\uBD80\uD130 \uC815\uB9AC\uB97C \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4`:xe?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uB2E4\uC2DC \uC2DC\uB3C4\uD569\uB2C8\uB2E4":ge?"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uC9C1\uC811 \uD574\uC18C\uD558\uC138\uC694":s==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC2E4\uD589 \uC911 \u2014 \uC644\uB8CC \uD6C4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":s==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC77C\uC2DC\uC815\uC9C0 \u2014 \uC7AC\uAC1C \uD6C4 \uC644\uB8CC\uB418\uBA74 \uBA38\uC9C0\uD558\uC138\uC694":se?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC2DC\uB3C4\uD569\uB2C8\uB2E4":V?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":T?.reason==="base_behind"?"base\uB97C \uC790\uB3D9 \uAC31\uC2E0\uD55C \uB4A4 \uBA38\uC9C0\uD569\uB2C8\uB2E4":X.active===!0?X.origin==="auto"?"\uC790\uB3D9 \uB9AC\uBDF0 \uC138\uC158 \uC2E4\uD589 \uC911 \u2014 \uB05D\uB098\uBA74 \uC601\uC218\uC99D\uC744 \uB2E4\uC2DC \uD310\uC815\uD569\uB2C8\uB2E4":"\uB9AC\uBDF0 \uC138\uC158 \uC2E4\uD589 \uC911 \u2014 \uB05D\uB098\uBA74 \uC601\uC218\uC99D\uC744 \uB2E4\uC2DC \uD310\uC815\uD569\uB2C8\uB2E4":T?.reason==="review_receipt_missing"?"\uB9AC\uBDF0 \uC601\uC218\uC99D \uC5C6\uC74C \u2014 \uBA38\uC9C0 \uAC8C\uC774\uD2B8 \uBCF4\uB958\uC785\uB2C8\uB2E4. \uD074\uB9AD\uD558\uBA74 \uAE30\uB85D\uB41C \uC138\uC158\uC744 \uC774\uC5B4 \uB9AC\uBDF0\uB9CC \uC218\uD589\uC2DC\uD0A4\uACE0, \uC601\uC218\uC99D\uC774 \uCD5C\uC885 head\uC5D0 \uC720\uD6A8\uD574\uC9C0\uBA74 \uD050\uAC00 \uBA38\uC9C0\uD569\uB2C8\uB2E4":T?.reason==="review_receipt_stale"?"head \uC7AC\uC791\uC131\uB428(\uC601\uC218\uC99D\uC774 \uD604\uC7AC head\uC758 \uC870\uC0C1\uC774 \uC544\uB2D8) \u2014 \uBA38\uC9C0 \uAC8C\uC774\uD2B8 \uBCF4\uB958\uC785\uB2C8\uB2E4. \uD074\uB9AD\uD558\uBA74 \uAE30\uB85D\uB41C \uC138\uC158\uC744 \uC774\uC5B4 \uCD5C\uC885 head\uB97C \uB2E4\uC2DC \uB9AC\uBDF0\uC2DC\uD0A4\uACE0, \uC601\uC218\uC99D\uC774 \uC720\uD6A8\uD574\uC9C0\uBA74 \uD050\uAC00 \uBA38\uC9C0\uD569\uB2C8\uB2E4":T?.reason==="review_receipt_invalid"?"\uB9AC\uBDF0 \uC601\uC218\uC99D \uAE30\uB85D\uC774 \uC131\uB9BD\uD558\uC9C0 \uC54A\uC74C \u2014 \uBA38\uC9C0 \uAC8C\uC774\uD2B8 \uBCF4\uB958\uC785\uB2C8\uB2E4. \uD074\uB9AD\uD558\uBA74 \uAE30\uB85D\uB41C \uC138\uC158\uC744 \uC774\uC5B4 \uCD5C\uC885 head\uB97C \uB2E4\uC2DC \uB9AC\uBDF0\uC2DC\uD0A4\uACE0, \uC601\uC218\uC99D\uC774 \uC720\uD6A8\uD574\uC9C0\uBA74 \uD050\uAC00 \uBA38\uC9C0\uD569\uB2C8\uB2E4":T?.reason==="review_receipt_undetermined"?"\uB9AC\uBDF0 \uC601\uC218\uC99D ancestry probe \uBBF8\uC644\uB8CC \u2014 \uBA38\uC9C0 \uAC8C\uC774\uD2B8 \uBCF4\uB958\uC785\uB2C8\uB2E4. \uD074\uB9AD\uD558\uBA74 \uAE30\uB85D\uB41C \uC138\uC158\uC744 \uC774\uC5B4 \uCD5C\uC885 head\uB97C \uB2E4\uC2DC \uB9AC\uBDF0\uC2DC\uD0A4\uACE0, \uC0C8 \uC601\uC218\uC99D\uC774 \uCD5C\uC885 head\uC5D0 \uC720\uD6A8\uD574\uC9C0\uBA74 \uD050\uAC00 \uBA38\uC9C0\uD569\uB2C8\uB2E4":T?.reason==="spec_id_missing"?"native spec_id \uBBF8\uAE30\uB85D \u2014 bd update --spec-id\uB85C \uAE30\uB85D\uD55C \uB4A4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":le?`\uBA38\uC9C0 (${T.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4 (\uCC28\uB840\uAC00 \uB418\uBA74 \uB2E4\uC2DC \uD655\uC778)`:T&&T.tier==="merged"?"\uBA38\uC9C0\uB428 \u2014 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC \uC9C4\uD589 \uC911":`\uBA38\uC9C0 \uBD88\uAC00: ${T&&T.reason||"\uAD00\uCE21 \uB300\uAE30"}`}}function Qc(e,t={}){let{transport:n,issueStores:r,queueStore:o,sessionLogStore:i,gotoIssue:s,getWorkspacePath:l,switchWorkspace:a,openDoc:u,doneRange:d,onDoneRangeChange:f}=t,_=r?yo(r):null,y=q$(),g=null,C=null,k=null,X=null,ae=null,H=Io(()=>w()),N=new Map,P=new Map,j=Em(),B=zc(j)===null,W=d?Qn(d):F$();function T(){let $=fo.find(h=>h.value===W);return $?$.label:"\uC624\uB298"}let S=Ia("beads-ui.worker.lane-collapsed"),I=!1,O="";function J(){return O.trim().length>0}function ce($){return J()?$.filter(h=>h.search_match===!0).length:void 0}let Se=new Set,K=new Set,te=new Set,fe=new Set,Re=new Set,V=new Set,le=null,ee=[],M=Km({queueStore:o,issueStores:r,transport:n,getWorkspacePath:l,onInvalidate:()=>w()});function oe(){M.refreshSessionDefaults()}let se=document.createElement("div");se.className="worker-console";let he=document.createElement("div");he.className="worker-top";let xe=document.createElement("div");xe.className="worker-drawer-overlay",xe.hidden=!0;let Ze=document.createElement("div");Ze.className="worker-drawer-overlay__backdrop";let G=document.createElement("div");G.className="worker-drawer-host";let ge=document.createElement("div");ge.className="worker-drawer-host",ge.hidden=!0,xe.append(Ze,G,ge);let ue=document.createElement("div");ue.className="worker-lanes-host",se.append(he,xe,ue),e.appendChild(se);let Q=Cr(null,null),Ee=[],be=Da({transport:n,console_el:se,getLanes:()=>Q,getWorkspaces:()=>Ee,getCrossLanes:()=>null,reproject:()=>({lanes:z(),raw_lanes:null}),onCorrection:()=>{},showToast:ye,requestRender:()=>w(),adoptQueue:($,h)=>{o&&o.set(h)},onDragBegin:()=>{C=null}}),Le=null,qe=Ho(G,{transport:n,sessionLogStore:i,onClose:()=>{Le=null,xe.hidden=!0,w()}}),Je=Wm(ge,{onClose:()=>{ge.hidden=!0,xe.hidden=!0,w()}}),He=Pm({getWorkspacePath:l||(()=>"")}),ie=l&&l()||"",Z=Nm({queueStore:o,transport:n,onChanged:()=>w(),onOpenScript:($,h)=>{He.open($,h)}});function Oe(){return o&&o.get()||{revision:0,auto_advance:!1,auto_merge:!1,slots:za,queue:[],serial_lanes:[],serial_lane_count:0,pr_wait:[],done:[]}}function nt($){let h=Pa($,Oe());h&&(ae=h,w())}function pt(){ae=null,w()}function Ye(){let $=Na(ae);$&&(ae=null,w(),x($.attempt_id,"session",$.payload))}function _t($){if(!C||!$.some(D=>D.id===C))return null;let h=bs(Oe());return h?{bead_id:C,lanes:h}:null}function Pt(){return l&&l()||""}async function Et($,h){await be.sendOp({type:"worker-queue-place",payload:{bead_id:$,...h==="parallel"?{}:{lane:h}},root_dir:Pt()},$)}function rt(){let $=Oe();return typeof $.revision=="number"?$.revision:0}function gt($){$&&$.queue&&o&&o.set($.queue)}async function Zt($){if(!n||!$)return;let h=await n("worker-attempt-pause",{attempt_id:$});h&&h.paused===!1&&h.reason&&ye(`\uC77C\uC2DC\uC815\uC9C0 \uAC70\uBD80: ${h.reason}`,"error",2400)}async function x($,h="session",D={}){if(!n||!$)return;let de=n,Te=Oe().attempts?.[$]||null;await jo({context:{bead_id:Te?.bead_id||"",kind:h,tuple:Te?Ln(Te):""},transport:Fe=>de("worker-attempt-resume",{attempt_id:$,expected_revision:rt(),...D,...Fe}),adopt:gt})}async function re($,h,D=!0){if(!n)return null;let de=n,Te=await de($,{...h,expected_revision:rt()});return gt(Te),Te&&Te.conflict&&D&&(Te=await de($,{...h,expected_revision:rt()}),gt(Te)),Te}async function Ne($){if(!n||!$)return;let h=Oe().merge_queue?.find(de=>de.bead_id===$)?.continuation_action;if(h?.mismatch&&h.continuation===null){await It($,h.mismatch);return}Se.add($),w();let D;try{D=await re("worker-merge-queue-add",{bead_id:$})}catch{ye("\uBA38\uC9C0 \uD074\uB9AD\uC774 \uC11C\uBC84\uC5D0 \uC804\uB2EC\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4(\uC5F0\uACB0 \uBB38\uC81C) \u2014 \uC5F0\uACB0 \uBCF5\uAD6C \uD6C4 \uB2E4\uC2DC \uB20C\uB7EC\uC8FC\uC138\uC694","error",3200);return}finally{Se.delete($),w()}if(!(!D||D.applied)){if(D.conflict){ye("\uD050\uAC00 \uBC14\uB00C\uC5B4 \uBA38\uC9C0 \uD074\uB9AD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uB20C\uB7EC\uC8FC\uC138\uC694","error",2400);return}ye(W$(D.reason),"error",2400)}}async function Ce($){if(!(!n||!$||K.has($))){K.add($),w();try{let h=await n("worker-cleanup-retry",{bead_id:$,expected_revision:rt()});gt(h),h&&!h.retried&&!h.conflict&&h.reason&&ye(`\uC815\uB9AC \uC7AC\uC2DC\uB3C4 \uAC70\uBD80: ${h.reason}`,"error",2400)}finally{K.delete($),w()}}}async function je($){if(!(!n||!$||te.has($))){te.add($),w();try{let h=await n("worker-resolve-in-session",{bead_id:$,expected_revision:rt()});gt(h);let D=H$(h);D!==null&&ye(D,z$(h),4e3)}finally{te.delete($),w()}}}async function We($,h){let D=Oe().hold;if(!n||!D||typeof D.since!="number")return;let de=await n($,{since:D.since});gt(de),de&&de.ok===!1&&ye(`${h}: ${de.reason==="hold_changed"?"\uD050 \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uD655\uC778\uD558\uC138\uC694":de.reason||""}`,"error",2800)}async function ct($){if(!n||!$)return;let h=await n("worker-queue-start-now",{bead_id:$});gt(h),h&&h.ok===!1&&ye(`\uC9C0\uAE08 \uC2DC\uC791 \uAC70\uBD80: ${h.reason==="not_waiting"?"\uC774 \uC774\uC288\uB294 \uB354 \uC774\uC0C1 \uB300\uAE30 \uB808\uC778\uC5D0 \uC5C6\uC2B5\uB2C8\uB2E4":h.reason||""}`,"error",2800)}async function It($,h){let D=await Or({continuation_mismatch:h},(Te,Fe)=>re("worker-merge-queue-add",{bead_id:$,continuation:Te,decision_token:Fe},!1)),de=D?.queue?.merge_queue?.find(Te=>Te.bead_id===$)?.continuation_action;if(D?.applied!==!0&&de?.continuation===null&&de.mismatch){await It($,de.mismatch);return}D&&D.applied===!1&&!D.conflict&&ye("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD\uC774 \uCD5C\uC2E0 \uC0C1\uD0DC\uC640 \uC77C\uCE58\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4","error",2800)}async function pe($){if(!n)return;let h=await re("worker-merge-auto-toggle",{on:$});!h||h.conflict||ye($?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0 \u2014 \uB300\uAE30 \uD56D\uBAA9\uC744 \uBE44\uC6E0\uC2B5\uB2C8\uB2E4",$?"success":"info",2400)}async function $e($){if(!n||!$)return;let h=await re("worker-merge-queue-remove",{bead_id:$});h&&!h.conflict&&!h.applied&&h.reason==="merge_active"&&ye("\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error",2400)}async function Qe(){await re("worker-merge-queue-remove",{all:!0})}async function ht($,h=null,D="unmerged",de=null){if(!n||!$)return;let Te=vs($,D);if(!(!!de||typeof globalThis.confirm!="function"||globalThis.confirm(Te)))return;let et=await n("worker-discard",{bead_id:$,...h?{attempt_id:h}:{},...de?{operation_id:de}:{},expected_revision:rt()});if(gt(et),et&&et.conflict&&(et=await n("worker-discard",{bead_id:$,...h?{attempt_id:h}:{},...de?{operation_id:de}:{},expected_revision:rt()}),gt(et)),et&&et.discarded===!0){ye(zi(et),"success",5e3);return}if(et&&et.reason){ye(`\uD3D0\uAE30 \uC2E4\uD328: ${et.reason}`,"error",2800);return}if(et&&et.accepted&&et.pending==="merged_revert"){ye("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success",2400);return}if(et&&et.accepted&&!et.discarded){ye(`\uD3D0\uAE30 \uC9C4\uD589: ${et.phase||"\uBC31\uC5C5 \uC911"}`,"success",2400);return}et&&!et.conflict&&ye("\uD3D0\uAE30 \uAC70\uBD80: unknown","error",2800)}async function st($,h,D){if(!n||!$||!h||typeof globalThis.confirm=="function"&&!globalThis.confirm(ks($,D)))return;let de=await n("worker-discard-abandon",{bead_id:$,operation_id:h,expected_revision:rt()});if(gt(de),de&&de.conflict&&(de=await n("worker-discard-abandon",{bead_id:$,operation_id:h,expected_revision:rt()}),gt(de)),de&&de.abandoned===!0){ye(Hi(D),"success",5e3);return}if(de&&de.reason){ye(`\uD3D0\uAE30 \uD3EC\uAE30 \uAC70\uBD80: ${de.reason}`,"error",2800);return}de&&!de.conflict&&ye("\uD3D0\uAE30 \uD3EC\uAE30 \uAC70\uBD80: unknown","error",2800)}async function ut($,h,D){if(!(!n||!h||!D||Re.has(h))){Re.add(h),w();try{let de=await n($,{bead_id:h,action_id:D,expected_revision:rt()});gt(de),de?.conflict?ye("\uC774\uC804 \uC791\uC5C5 \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694.","error",2800):!de?.ok&&de?.reason&&ye(`\uC774\uC804 \uC791\uC5C5 \uCC98\uB9AC \uAC70\uBD80: ${String(de.reason)}`,"error",2800)}finally{Re.delete(h),w()}}}async function vt($,h){if(!n||!h||fe.has(h))return;fe.add(h),w();let D;try{let de=async(Te={})=>await n($,{bead_id:h,expected_revision:rt(),...Te});D=await de(),gt(D),D&&D.conflict&&(D=await n($,{bead_id:h,expected_revision:rt()}),gt(D)),$==="worker-revise-fix"&&(D=await Or(D,(Te,Fe)=>de({continuation:Te,decision_token:Fe}),{onResult:gt,refresh:()=>de()}))}finally{fe.delete(h),w()}if(!(!D||D.conflict)){if(D.ok){ye($==="worker-revise-fix"?"\uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4 \u2014 \uC218\uB9AC \uD6C4 \uAD6C\uD604\uC774 \uC7AC\uB514\uC2A4\uD328\uCE58\uB429\uB2C8\uB2E4":"\uB378\uD0C0 \uC2B9\uC778 \uC644\uB8CC \u2014 \uC601\uC218\uC99D \uAC31\uC2E0 + \uD30C\uD0B9 \uD574\uC81C","success",2800);return}ye(`\uCC98\uBD84 \uAC70\uBD80: ${D.reason||""}`,"error",3e3)}}async function tt($){if(!n)return;let h=await n("worker-automation-toggle",{on:$,expected_revision:rt()});gt(h),h&&h.conflict&&await n("worker-automation-toggle",{on:$,expected_revision:rt()}).then(gt)}async function Be($){if(!n||!$)return;let h=await n("worker-repo-operation-dismiss",{operation_id:$});gt(h),h&&h.ok===!1&&ye(`\uAE30\uB85D \uB2EB\uAE30 \uAC70\uBD80: ${h.reason||""}`,"error",3e3)}async function E($){if(!n||!Number.isFinite($))return;let h=Math.max(za,Math.floor($)),D=await n("worker-queue-set-slots",{slots:h,expected_revision:rt()});gt(D),D&&D.conflict&&await n("worker-queue-set-slots",{slots:h,expected_revision:rt()}).then(gt)}async function U($){if(!n||!Number.isInteger($)||$<1||$>Gm)return;let h=Oe(),D=(Array.isArray(h.serial_lanes)?h.serial_lanes:[]).slice($).reduce((Fe,et)=>Fe+(Array.isArray(et?.entries)?et.entries.length:0),0),de=()=>({count:$,expected_revision:rt()}),Te=await n("worker-queue-set-serial-lane-count",de());gt(Te),Te&&Te.conflict&&(Te=await n("worker-queue-set-serial-lane-count",de()),gt(Te)),Te&&Te.applied&&D>0&&ye(`\uC9C1\uB82C \uB808\uC778 \uCD95\uC18C \u2014 ${D}\uAC1C \uD56D\uBAA9\uC774 \uBCD1\uB82C \uB300\uAE30\uB85C \uC774\uB3D9`)}function z(){let $=Kr(W),h=M.read({candidate_sort:j,done_since:$});return Ee=h.workspaces,Q=Cr(h.workspaces,h.workspaces_state,{done_since:$,candidate_filter:y,candidate_hidden_counts:"per_control",candidate_sort:"as_given",groups:"all",search:O}),Q}function ve($){return $.queue_groups[0]||M$}function Ae($){let h=$.dependency_chips||null,D={...h&&h.released?{released:h.released}:{},...h&&h.dependents?{dependents:h.dependents}:{}},de=N.get($.id),Te=P.get($.id)||null,Fe=de&&de.overlaps.length>0?de.overlaps:null,et=!!de&&de.scope_missing;return!Te&&!Fe&&!et&&Object.keys(D).length===0?null:{...D,...Te?{predecessors:Te}:{},...Fe?{overlaps:Fe}:{},...et?{scope_missing:!0}:{}}}function $t($){return{...$,workspace_name:"",done_layout:void 0,dependency_chips:Ae($)||void 0,chip_popover:kt($)}}function kt($){return Xi($,h=>H.isOpen({bead_id:$.id,chip_key:h}))}function Ct(){let $=Oe(),h=new Map;for(let D of Object.values(hn($.lane_states))){let de=Array.isArray(D?.corrections)?D.corrections:[];for(let Te of de)Te&&typeof Te.bead_id=="string"&&typeof Te.after=="string"&&h.set(Te.bead_id,Te.after)}return{admission:hn($.admission),correction_after:h}}function jt($,h){let D=$t($),de=hp(h.admission[$.id]||null,!!$.discard||Re.has($.id)),Te=h.correction_after.get($.id);return{...D,draggable:D.draggable===!0&&!de,stale_work:de,reason:de?"":D.reason,badges:Te?[`\u{1F517} ${Te} \uB4A4 (blocks \uC790\uB3D9)`,...D.badges||[]]:D.badges,revise_enabled:D.revise_enabled===!0&&!fe.has($.id)}}function Wt($){let h=Ct();return ve($).sublanes.parallel.map(D=>jt(D,h))}function Qt($){let h=Ct();return ve($).sublanes.serial.map(D=>{let de=D.occupants.map(Te=>({id:Te.id,title:Te.title,draggable:!1,lane:D.id,ghost:!0,badges:[Te.badge],...typeof Te.search_match=="boolean"?{search_match:Te.search_match}:{}}));return{id:D.id,index:D.index+1,raw_length:D.raw_length,ghosts:de,items:D.items.map(Te=>jt(Te,h)),occupied:D.occupied_by.length>0,badge:D.occupants.length>0?D.occupants[0].badge:"\uB300\uAE30",cycle:D.cycle===!0}})}function sn($){return $.runnable.map(h=>$t(h))}function xt($){return $.done.map(h=>$t(h))}function tn($){let h=$.running.filter(D=>D.non_occupying!==!0).map(D=>({...D,bead_id:D.id,attempt_id:D.attempt_id||"",paused:D.run_state==="paused",failed:D.run_state==="failed",parked:D.run_state==="parked",retry_wait:D.run_state==="retry_wait",waiting:D.run_state==="waiting",wait:D.wait||null,provider_hold:D.run_state==="provider_hold",hold:D.hold?{...D.hold,open:X===D.attempt_id}:null,status_label:D.run_state==="failed"?D.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328":D.run_state==="parked"?"\uC138\uC158 \uB300\uAE30":D.run_state==="retry_wait"?"\uC7AC\uC2DC\uB3C4 \uB300\uAE30":D.run_state==="waiting"?"\uC120\uD589 \uB300\uAE30":D.run_state==="provider_hold"?"\uACF5\uAE09\uC790 \uBCF4\uB958":void 0,can_pause:D.can_pause!==!1,workspace_name:"",dependency_chips:Ae(D)||void 0,chip_popover:kt(D),rollup_expanded:V.has(D.id),failure:D.failure?{...D.failure,open:k===D.attempt_id}:null,...Go(D.id,{discard:D.discard,parked:D.run_state==="parked"},te.has(D.id))}));return[...h.filter(D=>D.failed===!0),...h.filter(D=>D.failed!==!0&&D.parked===!0),...h.filter(D=>D.failed!==!0&&D.parked!==!0)]}function pn($){return Bt($).map(h=>({...h,chip_popover:kt(h)}))}function Bt($){if(le&&le.model===$)return le.rows;let h=Oe(),D=ve($),de=hn(h.attempts),Te=Object.values(de).filter(dr),Fe=new Map;for(let Ve of Te)Fe.set(Ve.attempt_id,Ve);let et=new Map;for(let Ve of Te)et.set(Ve.bead_id,Ve);let qt=new Map;for(let Ve of[...$.pr_wait,...$.running,...$.queue,...$.runnable,...$.done])qt.has(Ve.id)||qt.set(Ve.id,Ve);let an=Ve=>{let Yt=null;for(let On of Te)!On||On.bead_id!==Ve||Yl(On,Fe)||(Yt===null||(typeof On.started_at=="number"?On.started_at:0)>=(typeof Yt.started_at=="number"?Yt.started_at:0))&&(Yt=On);return Yt&&typeof Yt.target_base=="string"?Yt.target_base:null},mt=new Map;for(let Ve of $.running)Ve.run_state==="failed"||Ve.conflict_resolution!==!0||(Ve.run_state!=="paused"?mt.set(Ve.id,"running"):mt.has(Ve.id)||mt.set(Ve.id,"paused"));let mn=hn(h.auto_merge_skips),Tn=new Set(D.merge.auto_excluded),jr=hn(h.pr_observations),Yn=hn(h.pr_activity),rr=hn(h.cleanup_failed),or=hn(h.discard_operations),sr=hn(h.bead_workflow),_n=hn(h.bead_titles),ir=h.merge_queue_state||{active:null,failures:{}},yr=D.merge.state.waiting,vr=new Map;for(let Ve of Array.isArray(h.merge_queue)?h.merge_queue:[])Ve&&typeof Ve=="object"&&Ve.bead_id&&vr.set(Ve.bead_id,Ve);let Fr=(Array.isArray(h.pr_wait)?h.pr_wait:[]).map(Ve=>{let Yt=qt.get(Ve.bead_id);return{...nx(Ve.bead_id,Yt?.title||_n[Ve.bead_id]||Ve.bead_id,jr,rr[Ve.bead_id]||null,ur(de,Ve.bead_id,D.runner_catalog||null),Yn[Ve.bead_id]||(Se.has(Ve.bead_id)?{activity:null,merge_progress:null,queueing:"merge"}:K.has(Ve.bead_id)?{activity:null,merge_progress:null,queueing:"cleanup"}:null),mt.get(Ve.bead_id)||null,Ve.external===!0,{position:D.merge.positions.get(Ve.bead_id)||0,active:ir.active===Ve.bead_id,failure:hn(ir.failures)[Ve.bead_id]||null,waiting:yr&&yr.bead_id===Ve.bead_id?yr.reason:null,resolution:D.merge.resolutions.get(Ve.bead_id),continuation_action:D.merge.continuations.get(Ve.bead_id),authority:D.merge.authorities.get(Ve.bead_id)||null,hold:vr.get(Ve.bead_id)?.hold||null,review_dispatch:vr.get(Ve.bead_id)?.review_dispatch||null},Ve.wt_present!==!1,h.auto_merge===!0&&Tn.has(Ve.bead_id)?mn[Ve.bead_id]?.reason||"":null,Vl(D.declared_base,an(Ve.bead_id)),hn(h.completion_status)[Ve.bead_id]||null,or,h.auto_merge===!0,{merge_sha:Ve.merge_sha,cleanup_cursor:Ve.cleanup_cursor,repo_operations:D.repo_operations},Yt?Ae(Yt):null,pp(de,Ve.bead_id),te.has(Ve.bead_id)),...Yt?.search_match===void 0?{}:{search_match:Yt.search_match},workflow:sr[Ve.bead_id]||null,priority:Yt?.priority,from_id:Yt?.from_id,...Yt?.created_at===void 0?{}:{created_at:Yt.created_at},...Yt?.updated_at===void 0?{}:{updated_at:Yt.updated_at}}});return le={model:$,rows:Fr},Fr}function Gt($){let h=ve($),D=[];for(let Fe of $.running)Fe.non_occupying!==!0&&D.push({id:Fe.id,title:Fe.title,location_label:"\uC2E4\uD589\uC911",kind:"running",lane_id:Fe.serial_lane_id??null});for(let Fe of $.pr_wait)D.push({id:Fe.id,title:Fe.title,location_label:"PR \uB300\uAE30",kind:"pr_wait",lane_id:null});for(let Fe of h.sublanes.serial)Fe.items.forEach((et,qt)=>{D.push({id:et.id,title:et.title,location_label:`${Fe.id} #${qt+1}`,kind:"serial",lane_id:Fe.id})});h.sublanes.parallel.forEach((Fe,et)=>{D.push({id:Fe.id,title:Fe.title,location_label:`#${et+1}`,kind:"parallel",lane_id:null})});for(let Fe of $.runnable)D.push({id:Fe.id,title:Fe.title,location_label:"\uD6C4\uBCF4",kind:"candidate",lane_id:null,queue_placeable:Fe.queue_placeable===!0});let de=Oe();N=Om(de.bead_scope,D);let Te=new Map;for(let Fe of[...$.running,...$.runnable])Array.isArray(Fe.blocked_by)&&Fe.blocked_by.length>0&&Te.set(Fe.id,Fe.blocked_by);for(let[Fe,et]of Object.entries(hn(de.bead_blocked_by)))Array.isArray(et)&&Te.set(Fe,et.filter(qt=>typeof qt=="string"&&qt.length>0));P=Op(Te,D,hn(de.blocker_workspaces))}function on($){let h=$.hold&&typeof $.hold=="object"?$.hold:null;if(!h||h.kind!=="env"&&h.kind!=="systemic")return"";let D=Lr(h.cause)||String(h.cause||""),de=Array.isArray($.lineages)?$.lineages:[];if(h.kind==="env"){let Fe=de.map(qt=>qt&&qt.next_at).filter(qt=>typeof qt=="number").sort((qt,an)=>qt-an)[0],et=typeof Fe=="number"?` \xB7 \uB2E4\uC74C ${new Date(Fe).toLocaleTimeString("ko-KR",{hour:"2-digit",minute:"2-digit"})}`:"";return c`<div class="worker-hold worker-hold--env" role="status">
        <span class="worker-hold__text"
          >환경 보류: ${D} — 재시도 대기${et}</span
        >
        <button
          type="button"
          class="worker-hold__retry"
          title="예약된 재시도를 지금 실행합니다"
        >
          지금 재시도
        </button>
      </div>`}let Te=(Array.isArray(h.bead_ids)?h.bead_ids:[]).filter(Fe=>typeof Fe=="string"&&Fe.length>0);return c`<div class="worker-hold worker-hold--systemic" role="alert">
      <span class="worker-hold__text"
        >${D}${Te.length>0?` \u2014 bead ${Te.join(", ")}`:""}</span
      >
      <button
        type="button"
        class="worker-hold__resume"
        title="정지를 풀고 멈춰 있던 bead를 다시 디스패치합니다"
      >
        재개
      </button>
    </div>`}function Ue($){let h=[];for(let[mt,mn]of Object.entries(hn($.provider_hold)))for(let Tn of Array.isArray(mn?.targets)?mn.targets:[])h.push({runner:mt,target:Tn});if(h.length===0)return"";let D=h.find(mt=>mt.target?.kind==="outage");if(D){let mt=typeof D.target.next_probe_at=="number"?new Date(D.target.next_probe_at).toLocaleTimeString("ko-KR",{hour:"2-digit",minute:"2-digit"}):"";return c`<div class="worker-provider-gate" role="status">
        ⚠️ ${D.runner} 공급자 장애 — 신규 디스패치
        보류${mt?`, \uB2E4\uC74C \uD504\uB85C\uBE0C ${mt}`:""}
      </div>`}let de=Array.isArray(hn($.account_catalog).claude)?hn($.account_catalog).claude:[],Te=mt=>de.find(Tn=>Tn?.email===mt)?.alias||mt,Fe=h.find(mt=>typeof mt.target?.account!="string"),et=mt=>typeof mt?.resets_at=="number"?new Date(mt.resets_at).toLocaleTimeString("ko-KR",{hour:"2-digit",minute:"2-digit"}):"";if(Fe){let mt=et(Fe.target);return c`<div class="worker-provider-gate" role="status">
        ⏳ ${Fe.runner} 사용 한도 — 계정 미확인이라 러너 전체 디스패치
        보류${mt?`, \uB9AC\uC14B ${mt}`:""}
      </div>`}let qt=[...new Set(h.map(mt=>Te(String(mt.target.account))))],an=et(h[0].target);return c`<div class="worker-provider-gate" role="status">
      ⏳ ${qt.join(", ")} 사용 한도 —
      ${qt.length>1?"\uADF8 \uACC4\uC815\uB4E4":"\uADF8 \uACC4\uC815"} 디스패치
      보류${an?`, \uB9AC\uC14B ${an}`:""}
    </div>`}function L($){let h=Oe(),D=ve($),de=D.sublanes.parallel,Te=de.length>0?de[0].id:"\u2014",Fe=c`<button
      type="button"
      class="worker-play${h.auto_advance?" is-active":""}"
    >
      ${h.auto_advance?"\u23F8 \uC790\uB3D9\uD654 \uBA48\uCDA4":"\u25B6 \uC790\uB3D9\uD654"}
    </button>`,et=Dt($),qt=D.over_cap?c`<span
          class="worker-overcap"
          title="수동 재개(▶)는 슬롯 cap을 초과할 수 있습니다 — 자동 진행은 cap을 지킵니다"
          >cap 초과</span
        >`:"",an=h.auto_advance?0:(Array.isArray(h.queue)?h.queue:[]).filter(_n=>_n&&typeof _n.armed_by_lane=="string"&&_n.armed_by_lane.length>0).length,mt=an>0?c`<span
            class="worker-kpi__chip worker-kpi__chip--armed"
            title="모니터 연결 레인이 발차한 대기 행입니다 — 이 레포의 자동 진행은 꺼진 채입니다"
            >⏸ 자동 진행 꺼짐 · 연결 레인 ${an}건 진행 중</span
          >`:"",mn=c`<span class="worker-kpi__chip worker-kpi__chip--running"
        >실행 <b>${D.live_count}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--pr"
        >PR 대기 <b>${pn($).length}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--done"
        >${T()} 완료 <b>${$.done.length}</b></span
      >`,Tn=c`<span
      class="worker-kpi__chip worker-kpi__chip--base"
      title=${D.declared_base?"\uC774 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uC5B8\uD55C target base (docs/agents/repo-ops.toml). \uB514\uC2A4\uD328\uCE58 \uC2DC\uC810\uC758 \uAC80\uC99D\uC740 \uBCC4\uB3C4":"\uC120\uC5B8 \uD30C\uC77C\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 \u2014 target base \uD655\uC778 \uBD88\uAC00"}
      >base ${D.declared_base||"?"}</span
    >`,jr=c`<label class="worker-tgl worker-slots"
        >동시 실행
        <input
          type="number"
          class="worker-slots__input"
          min=${za}
          step="1"
          .value=${String(D.slots)}
          title="동시에 실행할 세션 수 (최소 1 = 순차 실행)"
      /></label>
      <label
        class="worker-tgl worker-serial-lanes"
        title="고정 직렬 레인 수 (1~5). 축소 시 잘린 레인의 대기 항목은 병렬 대기로 돌아갑니다"
        >직렬 레인
        <select class="worker-serial-lane-count" aria-label="직렬 레인 수">
          ${Array.from({length:Gm},(_n,ir)=>ir+1).map(_n=>c`<option
                value=${String(_n)}
                ?selected=${D.serial_lane_count===_n}
              >
                ${_n}
              </option>`)}
        </select>
      </label> `,Yn=c`<input
      type="search"
      class="worker-search"
      placeholder="ID·제목 검색"
      aria-label="이슈 검색 (ID·제목)"
      .value=${O}
    />`,rr=_p(D.repo_operations,D.cleanup_failures),or=on(h),sr=Ue(h);return I?c`<div class="worker-ribbon">
          ${Fe} ${et}
          <div class="worker-kpi worker-kpi--ribbon">
            ${qt}${mt}${mn}
          </div>
        </div>
        <div class="worker-ctrl worker-ctrl--mobile">
          <div class="worker-ctrl__ops">${jr}${Yn}</div>
          <div class="worker-kpi">${Tn}</div>
        </div>
        ${sr}${or}${rr}${Z.template()}`:c`<div class="worker-ctrl">
        <div class="worker-ctrl__ops">
          ${Fe}${et}${jr}${Yn}
        </div>
        <div class="worker-kpi">
          ${qt}${mt}${mn}${Tn}
          ${(Array.isArray(D.token_total)?D.token_total:D.token_total?[{label:D.token_total,tooltip:`${T()} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}]:[]).map(_n=>c`<span
                class="worker-kpi__chip worker-kpi__chip--tokens"
                title=${_n.tooltip}
                >${T()} 완료 · 누적 ${_n.label}</span
              >`)}
          <span class="worker-kpi__next worker-stat"
            >다음 <b>${Te}</b></span
          >
        </div>
      </div>
      ${sr}${or}${rr}${Z.template()}`}function ke($){let h=$.runnable_hidden;return c`<div class="worker-filter">
      <label class="worker-filter__tgl" title="blocked 이슈 표시 (기본 숨김)">
        <input
          type="checkbox"
          class="worker-filter__blocked"
          .checked=${y.show_blocked}
        />
        🔒 blocked${h.blocked>0?` ${h.blocked}`:""}
      </label>
      <div
        class="worker-filter__readiness"
        role="group"
        aria-label="준비도 필터"
      >
        ${Ss.map(D=>c`<button
              type="button"
              class="worker-filter__chip${y.readiness===D.value?" is-active":""}"
              data-readiness=${D.value}
              aria-pressed=${y.readiness===D.value?"true":"false"}
            >
              ${D.label}
            </button>`)}
        ${h.readiness>0?c`<span class="worker-filter__hidden"
              >숨김 ${h.readiness}</span
            >`:""}
      </div>
      <div class="worker-filter__routes" role="group" aria-label="route 필터">
        ${oo.map(D=>c`<button
              type="button"
              class="worker-filter__chip worker-filter__route${y.routes.includes(D.value)?" is-active":""}"
              data-route=${D.value}
              aria-pressed=${y.routes.includes(D.value)?"true":"false"}
            >
              ${D.label}
            </button>`)}
        ${h.route>0?c`<span class="worker-filter__hidden"
              >숨김 ${h.route}</span
            >`:""}
      </div>
    </div>`}function Me(){let $=B?"custom":zc(j)||"custom";return c`<select
      class="worker-sort"
      aria-label="후보 정렬"
      title="후보 정렬"
      .value=${$}
    >
      ${Ys.map(h=>c`<option value=${h.id} ?selected=${$===h.id}>
            ${h.label}
          </option>`)}
      <option value="custom" ?selected=${$==="custom"}>
        사용자 지정…
      </option>
    </select>`}function At(){let $=Qs(j);return c`<div
      class="worker-sort-chain"
      role="group"
      aria-label="후보 정렬 체인"
    >
      ${[0,1,2].map(h=>{let D=$[h];return c`<span class="worker-sort-chain__step">
          <select
            class="worker-sort-chain__key"
            data-step=${h}
            aria-label=${`${h+1}\uCC28 \uC815\uB82C \uD0A4`}
            .value=${D?D.key:""}
          >
            ${h===0?"":c`<option value="" ?selected=${!D}>없음</option>`}
            ${Sm.map(de=>c`<option
                  value=${de.key}
                  ?selected=${!!D&&D.key===de.key}
                >
                  ${de.label}
                </option>`)}
          </select>
          ${D?c`<button
                type="button"
                class="worker-sort-chain__dir"
                data-step=${h}
                aria-label=${D.dir==="asc"?"\uC624\uB984\uCC28\uC21C":"\uB0B4\uB9BC\uCC28\uC21C"}
                title=${D.dir==="asc"?"\uC624\uB984\uCC28\uC21C":"\uB0B4\uB9BC\uCC28\uC21C"}
              >
                ${D.dir==="asc"?"\u2191":"\u2193"}
              </button>`:""}
        </span>`})}
    </div>`}function ze(){return c`<div class="worker-done-controls">
      <select
        class="worker-sort worker-done-range"
        aria-label="완료 기간"
        title="완료 기간"
        .value=${W}
      >
        ${fo.map($=>c`<option value=${$.value} ?selected=${W===$.value}>
              ${$.label}
            </option>`)}
      </select>
    </div>`}function Dt($){let h=ve($).merge,D=Oe().auto_merge===!0;if(h.running)return c`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop${D?" is-active":""}"
        title=${D?"\uC790\uB3D9 \uBA38\uC9C0\uB97C \uB044\uACE0 \uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)":"\uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)"}
      >
        ${D?"\u23F8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8":"\uC77C\uAD04 \uBA38\uC9C0 \uC911\uB2E8"} ${h.positions.size}
      </button>`;if(D)return c`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop is-active"
        title="자동 머지 켜짐 — 자격이 생기는 PR을 계속 큐에 넣습니다. 클릭하면 끕니다"
      >
        ⏸ 자동 머지
      </button>`;let de=new Set(h.auto_excluded),Te=pn($).filter(Fe=>Fe.merge_action&&Fe.merge_enabled&&!de.has(Fe.id)).length;return c`<button
      type="button"
      class="worker-merge-all"
      title="켜 두면 자격이 생기는 PR을 계속 큐에 넣어 순서대로 충돌 해소·머지합니다"
    >
      ▶ 자동 머지${Te>0?` ${Te}`:""}
    </button>`}function Ut($,h){return c`<div
      data-bead-id=${$.id}
      data-drag-kind=${h.kind}
      data-root-dir=${h.root_dir}
      data-lane-id=${vn(h.lane_id)}
      data-row-index=${h.row_index}
      data-queue-index=${String($.queue_index??0)}
    >
      ${Wn({...$,...Go($.id,{discard:$.discard,parked:!1},te.has($.id))},{actions:Mo($)})}
    </div>`}function ot($){let h=Wt($),D=Pt();return Zi({parallel:{rows:h.map((de,Te)=>Ut(de,{kind:"parallel",root_dir:D,row_index:Te})),count:h.length,collapsed:S.isAreaCollapsed("parallel"),drop:{drop:"parallel",root_dir:D}},serial:{lanes:Qt($).map(de=>({id:de.id,title:`\uC9C1\uB82C ${de.index}`,rows:[...de.ghosts.map(Te=>Wn({...Te,...Go(Te.id,{discard:Te.discard,parked:!1},te.has(Te.id))},{actions:Mo(Te)})),...de.items.map((Te,Fe)=>Ut(Te,{kind:"repo-serial",root_dir:D,row_index:Fe,lane_id:de.id}))],count:de.ghosts.length+de.items.length,match_count:ce([...de.ghosts,...de.items]),empty:de.ghosts.length+de.items.length===0,badge:de.badge,held:de.occupied,cycle:de.cycle,drop:{drop:"repo-serial",root_dir:D,lane_id:de.id,lane_length:String(de.raw_length)}})),collapsed:S.isAreaCollapsed("serial")}})}function Rt($){return B_(tn($),Date.now(),Le)}function bn($){return $.running.some(h=>h.kind!=="session"&&h.run_state==="running")}function Nt($){let h=ve($),D=sn($),de=Wt($),Te=xt($),Fe=pn($),et=tn($),qt=tr({id:"worker-pane-candidate",lane:"candidate",title:"\uD6C4\uBCF4",items:D,match_count:ce(D),src:!0,empty:"\uD6C4\uBCF4 \uC5C6\uC74C",header_control:Me(),header_row:B?At():void 0,controls:ke($),collapsible:!0,collapsed:S.isCollapsed("candidate"),place_menu:_t(D),onOpenDoc:u?(mt,mn)=>u(mn):void 0}),an=tr({id:"worker-pane-done",lane:"done",title:"\uC644\uB8CC",items:Te,match_count:ce(Te),empty:`${T()} \uC644\uB8CC \uC5C6\uC74C`,header_control:ze(),collapsible:!0,collapsed:S.isCollapsed("done"),preview:I?Array.isArray(h.token_total)?h.token_total.map(mt=>mt.label).join(" \xB7 "):h.token_total||Vm(Te):void 0});return I?c`<div class="worker-lanes worker-lanes--mobile">
          ${Ji({live:bn($),running_body:et.length>0?Rt($):"",pr_wait_rows:Fe.map(mt=>Wn(mt)),count:et.length+Fe.length})}
          ${tr({id:"worker-pane-queue",lane:"queue",title:"\uB300\uAE30",items:de,count:de.length,match_count:ce(de),collapsible:!0,collapsed:S.isCollapsed("queue"),preview:Vm(de),body:ot($)})}
          ${qt} ${an}
        </div>
        ${Ko(ae,Oe())}`:c`<div class="worker-lanes">
        ${qt}
        ${tr({id:"worker-pane-queue",lane:"queue",title:"\uB300\uAE30",items:de,count:de.length,match_count:ce(de),collapsible:!0,collapsed:S.isCollapsed("queue"),body:ot($)})}
        ${tr({id:"worker-pane-running",lane:"running",title:"\uC2E4\uD589 \uC911",items:et,match_count:ce(et),header_control:c`<span class="worker-pane__meta"
            >슬롯 ${h.slots}</span
          >`,live:bn($),collapsible:!0,collapsed:S.isCollapsed("running"),body:Rt($)})}
        ${tr({id:"worker-pane-pr-wait",lane:"pr_wait",title:"PR \uB300\uAE30",items:Fe,match_count:ce(Fe),empty:"PR \uB300\uAE30 \uC5C6\uC74C",collapsible:!0,collapsed:S.isCollapsed("pr_wait")})}
        ${an}
      </div>
      ${Ko(ae,Oe())}`}function kn($){S.toggle($),w()}function b($){S.toggleArea($),w()}function p($){let h=Date.now();if(!$.queue.some(de=>Qi(de.added_at,h)>0)){m();return}g===null&&(g=window.setInterval(()=>{try{w()}catch{}},N$))}function m(){g!==null&&(window.clearInterval(g),g=null)}function w(){let $=z();p($),Gt($),lt(L($),he),lt(Nt($),ue),qa(ue)}function Y(){let $=!0,h=Oa(D=>{if(I=D,$){$=!1;return}w()});ee.push(h)}function ne($){y=$,j$($),w()}function _e($){if($==="custom"){B=!0,w();return}j=uo($),Kc(j),B=!1,w()}function Pe($){j=uo({chain:$}),Kc(j),w()}function wt($){W=Qn($),B$(W),f?.(W),w()}function Ke($){let h=$.target;if(ae){let mt=Ma(ae,h,Oe());if(mt){mt!==ae&&(ae=mt,w());return}}let D=h?.closest?.(".worker-serial-lane-count");if(D){let mt=Number.parseInt(D.value,10);Number.isFinite(mt)&&U(mt).then(w);return}let de=$.target?.closest?.(".worker-filter__blocked");if(de){ne({...y,show_blocked:de.checked});return}let Te=$.target?.closest?.(".worker-sort-chain__key");if(Te){let mt=Number.parseInt(Te.getAttribute("data-step")||"",10);Number.isFinite(mt)&&Pe(Tm(Qs(j),mt,Te.value));return}let Fe=$.target?.closest?.(".worker-done-range");if(Fe){wt(Fe.value);return}let et=$.target?.closest?.(".worker-sort");if(et){_e(et.value);return}let qt=$.target?.closest?.(".worker-slots__input");if(!qt)return;let an=Number.parseInt(qt.value,10);if(!Number.isFinite(an)){w();return}E(an).then(w)}function bt($){return $?{runner:$.runner||void 0,model:$.model||void 0,effort:$.effort||void 0,worktree:$.worktree||void 0,status:$.status||void 0,session_id:$.session_id||void 0}:{}}function Ot(){let $=ve(z()),h=Oe().workspace_info,D=h&&typeof h=="object"&&h.repo_ops&&typeof h.repo_ops=="object"?h.repo_ops:null;return{operations:$.repo_operations,cleanup_failures:$.cleanup_failures,repo:l&&l()||"",repo_ops:D}}function A(){Le&&qe.close(),ge.hidden=!1,xe.hidden=!1,Je.open(Ot()),w()}function R($){let h=Oe(),D=h.attempts?h.attempts[$]:null;Le=$,Je.close(),ge.hidden=!0,xe.hidden=!1,qe.open({attempt_id:$,meta:bt(D)}),w()}function Ie($){let h=Oe(),D=(Array.isArray(h.session_active)?h.session_active:[]).find(Te=>Te&&Te.bead_id===$),de=(D&&Array.isArray(D.session_refs)?D.session_refs:[]).find(Te=>Te&&Te.current===!0);de&&(Je.close(),ge.hidden=!0,xe.hidden=!1,qe.open(Fo(de,$,"in_progress")),w())}function De(){if(Je.isOpen()&&Je.refresh(Ot()),!Le)return;let $=Oe(),h=$.attempts?$.attempts[Le]:null;if(h){qe.updateMeta(bt(h));return}qe.close()}function it($,h){if($.length===0||!s)return;let D=l?l():void 0;if(h.length===0||!D||h===D||!a){s($);return}Promise.resolve(a(h)).then(()=>{s($)}).catch(()=>{ye("\uB808\uD3EC \uC804\uD658\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error",2400)})}function yt($){let h=$.target;if(h?.closest?.(".provider-resume-dialog__cancel")){pt();return}if(h?.closest?.(".provider-resume-dialog__confirm")){Ye();return}if(h?.closest?.(".provider-resume-dialog")||h?.closest?.(".worker-mini__grip"))return;let D=h?.closest?.(".worker-sort-chain__dir");if(D){let me=Number.parseInt(D.getAttribute("data-step")||"",10);Number.isFinite(me)&&Pe(Cm(Qs(j),me));return}let de=h?.closest?.(".worker-dep__open");if(de){it(de.getAttribute("data-dep-id")||"",de.getAttribute("data-root-dir")||"");return}let Te=h?.closest?.(".judgement-chip");if(Te){let me=Te.closest("[data-bead-id]"),dt=me&&me.getAttribute("data-bead-id")||"",en=Te.getAttribute("data-chip-key")||"";dt&&en&&H.toggle({bead_id:dt,chip_key:en});return}if(h?.closest?.(".chip-popover"))return;if(h?.closest?.(".worker-repo-strip")){A();return}let Fe=h?.closest?.(".worker-repo-op__dismiss");if(Fe){Be(Fe.dataset.operationId||"");return}let et=h?.closest?.(".worker-cleanup__resume");if(et){let me=et.dataset.beadId;me&&Ce(me);return}let qt=h?.closest?.(".worker-cleanup__resolve");if(qt){let me=qt.dataset.beadId;me&&je(me);return}if(h?.closest?.(".worker-hold__retry")){We("worker-queue-hold-retry-now","\uC9C0\uAE08 \uC7AC\uC2DC\uB3C4 \uAC70\uBD80");return}if(h?.closest?.(".worker-hold__resume")){We("worker-queue-hold-resume","\uC7AC\uAC1C \uAC70\uBD80");return}if(h?.closest?.(".worker-play")){tt(!Oe().auto_advance);return}let an=h?.closest?.(".worker-merge-all");if(an){an.classList.contains("worker-merge-all--stop")?Oe().auto_merge===!0?pe(!1):Qe():pe(!0);return}let mt=h?.closest?.(".worker-pane__toggle[data-lane]");if(mt){let me=mt.dataset.lane;(me==="candidate"||me==="queue"||me==="running"||me==="pr_wait"||me==="done")&&kn(me);return}let mn=h?.closest?.(".worker-wait__area-toggle[data-area]");if(mn){let me=mn.dataset.area;(me==="parallel"||me==="serial")&&b(me);return}let Tn=h?.closest?.(".worker-card__place-lane");if(Tn){let me=Tn.dataset.beadId,dt=Tn.dataset.lane;me&&(dt==="parallel"||/^s[1-5]$/.test(dt||""))&&(C=null,w(),Et(me,dt));return}if(h?.closest?.(".worker-card__place-cancel")){C=null,w();return}let Yn=h?.closest?.(".worker-card__place");if(Yn){let me=Yn.dataset.beadId;me&&!Yn.disabled&&(bs(Oe())?(C=me,w()):Et(me,"parallel"));return}let rr=h?.closest?.(".worker-filter__route");if(rr){let me=rr.dataset.route||"";me&&ne({...y,routes:sa(y.routes,me)});return}let or=h?.closest?.(".worker-filter__chip");if(or){let me=or.dataset.readiness;(me==="all"||me==="ready"||me==="not_ready")&&ne({...y,readiness:me});return}let sr=h?.closest?.('[data-action="queue-start-now"]');if(sr){ct(sr.dataset.beadId||"");return}let _n=h?.closest?.('[data-action="queue-remove"]');if(_n){let me=_n.dataset.beadId||"";me&&be.sendOp({type:"worker-queue-remove",payload:{bead_id:me},root_dir:Pt()},me);return}let ir=h?.closest?.(".worker-mini__merge");if(ir){let me=ir.dataset.beadId||"";Oe().cleanup_failed?.[me]?Ce(me):Ne(me);return}let yr=h?.closest?.(".worker-mini__merge-cancel");if(yr){$e(yr.dataset.beadId||"");return}let vr=h?.closest?.(".worker-mini__resolve");if(vr){je(vr.dataset.beadId||"");return}let Fr=h?.closest?.(".rtile__resolve");if(Fr){let me=Fr.closest(".rtile");je(me?.dataset.beadId||"");return}let Ve=h?.closest?.(".worker-mini__discard"),Yt=h?.closest?.(".worker-mini__discard-abandon");if(Yt){st(Yt.dataset.beadId||"",Yt.dataset.operationId||"",{kind:Yt.dataset.operationKind||"",last_error:Yt.dataset.lastError||""});return}if(Ve){ht(Ve.dataset.beadId||"",Ve.dataset.attemptId||null,Ve.dataset.discardMode==="merged"?"merged":"unmerged",Ve.dataset.operationId||null);return}let On=h?.closest?.(".worker-mini__stale-continue");if(On){ut("worker-stale-work-continue",On.dataset.beadId||"",On.dataset.actionId||"");return}let Vo=h?.closest?.(".worker-mini__stale-backup");if(Vo){ut("worker-stale-work-backup-fresh",Vo.dataset.beadId||"",Vo.dataset.actionId||"");return}let Yo=h?.closest?.(".worker-mini__stale-recheck");if(Yo){ut("worker-stale-work-recheck",Yo.dataset.beadId||"",Yo.dataset.actionId||"");return}let Xs=h?.closest?.(".worker-mini__revise-fix");if(Xs){vt("worker-revise-fix",Xs.dataset.beadId||"");return}let Zs=h?.closest?.(".worker-mini__revise-approve");if(Zs){vt("worker-revise-approve",Zs.dataset.beadId||"");return}if(h?.closest?.(".worker-mini__pr"))return;let at=h?.closest?.(".rtile__failure-badge");if(at){let me=at.dataset.attemptId||"";k=k===me?null:me,w();return}let v=h?.closest?.(".rtile__provider-hold-badge");if(v){let me=v.dataset.attemptId||"";X=X===me?null:me,w();return}let q=h?.closest?.(".rtile__attempt-copy");if(q){let me=q.dataset.attemptId||"";me&&$n(me).then(dt=>{ye(dt?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",dt?"success":"error",1400)});return}let F=h?.closest?.(".rtile__discard-abandon");if(F){let dt=h?.closest?.(".rtile")?.dataset?.beadId;dt&&st(dt,F.dataset.operationId||"",{kind:F.dataset.operationKind||"",last_error:F.dataset.lastError||""});return}let we=h?.closest?.(".rtile__discard");if(we){let me=h?.closest?.(".rtile"),dt=me?.dataset?.beadId,en=me?.dataset?.attemptId;dt&&ht(dt,en||null,we.dataset.confirmation==="merged"?"merged":"unmerged",we.dataset.operationId||null);return}if(h?.closest?.(".rtile__pause")){let dt=h?.closest?.(".rtile")?.dataset?.attemptId;dt&&Zt(dt);return}if(h?.closest?.(".rtile__resume-alternate")){let dt=h?.closest?.(".rtile")?.dataset?.attemptId;dt&&nt(dt);return}if(h?.closest?.(".rtile__resume")){let me=h?.closest?.(".rtile__resume"),en=h?.closest?.(".rtile")?.dataset?.attemptId;en&&x(en,me?.dataset?.resumeKind==="settlement"?"settlement":"session");return}if(h?.closest?.(".rtile__session")){let me=h?.closest?.(".rtile"),dt=me?.dataset?.attemptId;if(dt){R(dt);return}let en=me?.dataset?.beadId;en&&Ie(en);return}if(h?.closest?.(".rtile__failure-pop"))return;if(h?.closest?.(".worker-drawer-overlay__backdrop")){Je.close(),qe.close();return}if(h?.closest?.(".worker-drawer-host"))return;let Ge=h?.closest?.(".rtile .board-card__roll-toggle");if(Ge){let me=Ge.dataset.rollParent;me&&(V.has(me)?V.delete(me):V.add(me),w());return}let ft=h?.closest?.(".rtile .board-card__roll-child");if(ft){let me=ft.dataset.childId;me&&s&&s(me);return}let Kt=h?.closest?.(".rtile");if(Kt){if(h?.closest?.(".rtile__id")){let dt=Kt.dataset.beadId;dt&&$n(dt).then(en=>{en?ye("\uBCF5\uC0AC\uB428","success",1200):ye("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}let me=Kt.dataset.beadId;me&&s&&s(me);return}let St=h?.closest?.(".worker-mini, .worker-card");if(St){let me=St.dataset.beadId;if(h?.closest?.('[data-seam="log-path-copy"]'))return;if(h?.closest?.(".worker-mini__id, .worker-card__id")){me&&$n(me).then(en=>{en?ye("\uBCF5\uC0AC\uB428","success",1200):ye("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}let dt=h?.closest?.(".ctl-chip--from");if(dt){let en=dt.dataset.fromId;en&&s&&s(en);return}me&&s&&s(me)}}function nn($){let h=$.target;h?.closest?.(".worker-search")&&(O=h.value,w())}function Dn($){let h=$.target;$.key!=="Escape"||!h?.closest?.(".worker-search")||O.length===0||(O="",w())}be.attach(e),e.addEventListener("click",yt),e.addEventListener("change",Ke),e.addEventListener("input",nn),e.addEventListener("keydown",Dn);function Nr($){let h=$.target,D=h&&typeof h.closest=="function"?Te=>h.closest(Te):()=>null,de=!1;k&&!D(".rtile__failure-pop, .rtile__failure-badge")&&(k=null,de=!0),X&&!D(".rtile__provider-hold-pop, .rtile__provider-hold-badge")&&(X=null,de=!0),de&&w()}function qr($){$.key==="Escape"&&(k===null&&X===null&&ae===null||(k=null,X=null,ae=null,w()))}return document.addEventListener("click",Nr),document.addEventListener("keydown",qr),H.attach(),ee.push(()=>{document.removeEventListener("click",Nr),document.removeEventListener("keydown",qr),H.detach()}),Y(),_&&ee.push(_.subscribe(()=>{M.notifyIssuesChanged(),w()})),o&&ee.push(o.subscribe(()=>{let $=l&&l()||"";$!==ie&&(ie=$,He.close()),w(),De()})),w(),{load(){M.ensureSessionDefaults(),w()},refreshSessionDefaults:oe,destroy(){m();for(let $ of ee.splice(0))try{$()}catch{}be.detach(),e.removeEventListener("click",yt),e.removeEventListener("change",Ke),M.destroy();try{qe.destroy()}catch{}xe.hidden=!0;try{He.destroy()}catch{}lt(c``,e)}}}function Xc(e){if(!e)return"Unknown";let t=e.split("/").filter(Boolean);return t.length>0?t[t.length-1]:"Unknown"}function Zm(e,t,n,r=async()=>{},o=async()=>{}){let i=Ht("views:workspace-picker"),s=null,l=!1,a=!1,u=!1;async function d(j){let W=j.target.value,S=t.getState().workspace?.current?.path||"";if(W&&W!==S){i("switching workspace to %s",W),l=!0,P();try{await n(W)}catch(I){i("workspace switch failed: %o",I)}finally{l=!1,P()}}}async function f(){let j=t.getState(),B=j.workspace?.current?.path||j.workspace?.available?.[0]?.path||"";if(!(!B||a)){i("git-pulling workspace %s",B),a=!0,P();try{await r(B)}catch(W){i("workspace git pull failed: %o",W)}finally{a=!1,P()}}}function _(j){let B=j.target;B&&e.contains(B)||C()}function y(j){j.key==="Escape"&&C()}function g(){u||(u=!0,document.addEventListener("mousedown",_),document.addEventListener("keydown",y),P())}function C(){u&&(u=!1,document.removeEventListener("mousedown",_),document.removeEventListener("keydown",y),P())}function k(){u?C():g()}async function X(j){let B=j.target,W=B.value,T=B.checked;i("toggling visibility %s \u2192 %s",W,String(T));try{await o(W,T)}catch(S){i("workspace visibility toggle failed: %o",S)}}function ae(j){return j?c`
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
    `:c``}function H(j,B){return c`
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
                ${j.map(W=>c`
                    <label
                      class="workspace-picker__manage-row"
                      title="${W.path}"
                    >
                      <input
                        type="checkbox"
                        class="workspace-picker__manage-checkbox"
                        value="${W.path}"
                        .checked=${!B.has(W.path)}
                        @change=${X}
                      />
                      <span class="workspace-picker__manage-name"
                        >${Xc(W.path)}</span
                      >
                    </label>
                  `)}
              </div>
            `:""}
      </div>
    `}function N(){let j=t.getState(),B=j.workspace?.current,W=j.workspace?.available||[],T=new Set(j.workspace?.hidden||[]),S=B?.path||W[0]?.path||"";if(W.length===0)return c``;let I=W.filter(O=>!T.has(O.path)||O.path===S);if(I.length<=1){let O=I[0]||W[0],J=Xc(O.path);return c`
        <div class="workspace-picker workspace-picker--single">
          <span class="workspace-picker__label" title="${O.path}"
            >${J}</span
          >
          ${H(W,T)}
          ${ae(S)}
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
          ${I.map(O=>c`
              <option
                value="${O.path}"
                ?selected=${O.path===S}
                title="${O.path}"
              >
                ${Xc(O.path)}
              </option>
            `)}
        </select>
        ${H(W,T)}
        ${ae(S)}
        ${l||a?c`<span
              class="workspace-picker__loading"
              aria-hidden="true"
            ></span>`:""}
      </div>
    `}function P(){lt(N(),e)}return P(),s=t.subscribe(()=>P()),{destroy(){s&&(s(),s=null),document.removeEventListener("mousedown",_),document.removeEventListener("keydown",y),lt(c``,e)}}}var Jm=["update-status","edit-text","update-priority","create-issue","dep-add","dep-remove","update-assignee","update-exec-settings","update-impl-target","get-session-defaults","set-session-defaults","get-workspace-accounts","set-workspace-accounts","update-workflow-meta","label-add","label-remove","subscribe-list","unsubscribe-list","snapshot","upsert","delete","get-comments","add-comment","delete-issue","list-workspaces","set-workspace","set-workspace-visibility","get-workspace","workspace-changed","git-pull-workspace","subscribe-worker-queue","unsubscribe-worker-queue","worker-queue-snapshot","worker-queue-place","worker-queue-reorder","worker-queue-toggle","worker-automation-toggle","worker-provider-auto-switch-toggle","worker-repo-ops-opt-out-toggle","worker-repo-operation-dismiss","worker-repo-operation-deploy-run","worker-queue-set-slots","worker-queue-set-serial-lane-count","worker-queue-set-orchestration-defaults","worker-queue-remove","worker-queue-arm","worker-queue-disarm","worker-queue-start-now","worker-attempt-pause","worker-attempt-stop","worker-attempt-resume","worker-cleanup-retry","worker-resolve-in-session","worker-queue-hold-resume","worker-queue-hold-retry-now","worker-merge-queue-add","worker-merge-queue-add-all","worker-merge-auto-toggle","worker-merge-queue-remove","worker-discard","worker-discard-abandon","worker-stale-work-continue","worker-stale-work-backup-fresh","worker-stale-work-recheck","worker-pr-discard","worker-revise-fix","worker-revise-approve","subscribe-ui-order","unsubscribe-ui-order","ui-order-set","ui-order-snapshot","subscribe-display-policy","unsubscribe-display-policy","display-policy-set","display-policy-snapshot","subscribe-session-log","unsubscribe-session-log","session-log-snapshot","session-log-append","get-attempt-prompt","get-bead-prompt","get-bead-timeline","get-worker-system-prompt","get-session-refs","subscribe-adr","unsubscribe-adr","adr-snapshot","subscribe-monitor-pipeline","unsubscribe-monitor-pipeline","monitor-pipeline-snapshot","subscribe-impl-presets","unsubscribe-impl-presets","impl-presets-snapshot","impl-preset-create","impl-preset-update","impl-preset-delete","apply-impl-preset","apply-impl-preset-global","monitor-auto-toggle","monitor-lane-create","monitor-lane-update","monitor-lane-confirm","monitor-lane-remove","monitor-lane-provenance","get-compare","compare-snapshot","bench-run-create"];function Zc(){let e=Date.now().toString(36),t=Math.random().toString(36).slice(2,8);return`${e}-${t}`}function eg(e,t,n=Zc()){return{id:n,type:e,payload:t}}function tg(e={}){let t=Ht("ws"),n={initialMs:e.backoff?.initialMs??1e3,maxMs:e.backoff?.maxMs??3e4,factor:e.backoff?.factor??2,jitterRatio:e.backoff?.jitterRatio??.2},r=()=>e.url&&e.url.length>0?e.url:typeof location<"u"?(location.protocol==="https:"?"wss://":"ws://")+location.host+"/ws":"ws://localhost/ws",o=null,i="closed",s=0,l=null,a=!0,u=new Map,d=[],f=new Map,_=new Set;function y(N){for(let P of Array.from(_))try{P(N)}catch{}}function g(){if(!a||l)return;i="reconnecting",t("ws reconnecting\u2026"),y(i);let N=Math.min(n.maxMs||0,(n.initialMs||0)*Math.pow(n.factor||1,s)),P=(n.jitterRatio||0)*N,j=Math.max(0,Math.round(N+(Math.random()*2-1)*P));t("ws retry in %d ms (attempt %d)",j,s+1),l=setTimeout(()=>{l=null,H()},j)}function C(N){try{o?.send(JSON.stringify(N))}catch(P){t("ws send failed",P)}}function k(){for(i="open",t("ws open"),y(i),s=0;d.length;){let N=d.shift();N&&C(N)}}function X(N){let P;try{P=JSON.parse(String(N.data))}catch{t("ws received non-JSON message");return}if(!P||typeof P.id!="string"||typeof P.type!="string"){t("ws received invalid envelope");return}if(u.has(P.id)){let B=u.get(P.id);u.delete(P.id),P.ok?B?.resolve(P.payload):B?.reject(P.error||new Error("ws error"));return}let j=f.get(P.type);if(j&&j.size>0)for(let B of Array.from(j))try{B(P.payload)}catch(W){t("ws event handler error",W)}else t("ws received unhandled message type: %s",P.type)}function ae(){i="closed",t("ws closed"),y(i);for(let[N,P]of u.entries())P.reject(new Error("ws disconnected")),u.delete(N);s+=1,g()}function H(){if(!a)return;let N=r();try{o=new WebSocket(N),t("ws connecting %s",N),i="connecting",y(i),o.addEventListener("open",k),o.addEventListener("message",X),o.addEventListener("error",()=>{}),o.addEventListener("close",ae)}catch(P){t("ws connect failed %o",P),g()}}return H(),{send(N,P){if(!Jm.includes(N))return Promise.reject(new Error(`unknown message type: ${N}`));let j=Zc(),B=eg(N,P,j);return t("send %s id=%s",N,j),new Promise((W,T)=>{u.set(j,{resolve:W,reject:T,type:N}),o&&o.readyState===o.OPEN?C(B):(t("queue %s id=%s (state=%s)",N,j,i),d.push(B))})},on(N,P){f.has(N)||f.set(N,new Set);let j=f.get(N);return j?.add(P),()=>{j?.delete(P)}},onConnection(N){return _.add(N),()=>{_.delete(N)}},reconnect(){a=!0,l&&(clearTimeout(l),l=null),s=0,H()},close(){a=!1,l&&(clearTimeout(l),l=null);try{o?.close()}catch{}},getState(){return i}}}function rx(){let e=window.__BDUI_BOOTSTRAP__;return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:null}}}async function ox(e,t){try{let r=await(await fetch("/api/config")).json();e.setState({config:r})}catch(n){t("config refresh failed",n)}}var Ka=[["tab:board:ready","ready-issues"],["tab:board:blocked","blocked-issues"],["tab:board:in-progress","in-progress-issues"],["tab:board:resolved","resolved-issues"],["tab:board:deferred","deferred-issues"],["tab:board:closed","closed-issues"]],ng=[["tab:worker:ready","ready-issues"],["tab:worker:blocked","blocked-issues"],["tab:worker:in-progress","in-progress-issues"],["tab:worker:resolved","resolved-issues"],["tab:worker:closed","closed-issues"]],Pr="tab:worker:closed",sx="bdui.worker.done-range",rg=rm,og="worker:queue",sg="ui:order",ig="ui:display-policy",ag="exec:presets",Mr="tab:board:closed",lg="beads-ui.board.closed-range";function ix(e){if(!e)return()=>{};function t(r){document.documentElement.style.setProperty("--app-header-h",`${Math.round(r)}px`)}if(t(e.getBoundingClientRect().height),typeof ResizeObserver!="function")return()=>{};let n=new ResizeObserver(r=>{for(let o of r)t(o.contentRect.height+ax(e))});return n.observe(e),()=>n.disconnect()}function ax(e){let t=getComputedStyle(e);return[t.paddingTop,t.paddingBottom,t.borderTopWidth,t.borderBottomWidth].reduce((r,o)=>r+(parseFloat(o)||0),0)}function lx(){let e=null,t=new Set;return{get:()=>e,set(n){e=n;for(let r of t)try{r()}catch{}},subscribe(n){return t.add(n),()=>t.delete(n)}}}function cx(e){let t=Ht("main");t("bootstrap start"),ix(document.querySelector(".app-header"));let n=c`
    <section id="board-root" class="route board"></section>
    <section id="worker-root" class="route worker" hidden></section>
    <section id="monitor-root" class="route monitor" hidden></section>
    <section id="compare-root" class="route compare" hidden></section>
    <section id="adr-root" class="route adr" hidden></section>
    <section id="detail-panel" class="route detail" hidden></section>
  `;lt(n,e);let r=document.getElementById("global-nav"),o=document.getElementById("top-nav"),i=document.getElementById("repo-scope"),s=document.getElementById("usage-meter"),l=document.getElementById("board-root"),a=document.getElementById("worker-root"),u=document.getElementById("monitor-root"),d=document.getElementById("compare-root"),f=document.getElementById("adr-root"),_=document.getElementById("detail-panel");if(s&&km(s),l&&a&&u&&d&&f&&_){let he=function(A,R){let Ie="Request failed",De="";if(A&&typeof A=="object"){let yt=A;if(typeof yt.message=="string"&&yt.message.length>0&&(Ie=yt.message),typeof yt.details=="string")De=yt.details;else if(yt.details&&typeof yt.details=="object")try{De=JSON.stringify(yt.details,null,2)}catch{De=""}}else typeof A=="string"&&A.length>0&&(Ie=A);let it=R&&R.length>0?`Failed to load ${R}`:"Request failed";se.open(it,Ie,De)},Pt=function(A){return`${ot.getState().workspace.current?.path||""}\0${A}`},Et=function(){He&&(He().catch(()=>{}),He=null),ie=null,Z=null},gt=function(A){Oe=A;let R=()=>{Oe!==A||ot.getState().selected_id!==A||(Oe=null,rt(A))};if(!Ye){pt.then(R);return}R()},Ne=function(A,R,Ie,De,it){return Ie!==re[R]?(it().catch(()=>{}),!1):(A.set(De,it),!0)},je=function(){let A=ot.getState();$e(A.view==="board"),tt(A.view==="worker"),Ae(ve(A)),Ct(A.view==="adr"),E(A.view==="board"||A.view==="worker"||Ce||!!A.selected_id)},It=function(){let A=Kr(We);return A===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:A}}},pe=function(){let A=Kr(ct);return A===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:A}}},$e=function(A){if(A)for(let[R,Ie]of Ka){if(Zt.has(R)||x.has(R))continue;let De=R===Mr?It():{type:Ie};try{ge.register(R,De)}catch(nn){t("register %s store failed: %o",R,nn)}x.add(R);let it=re.board,yt=!1;G.subscribeList(R,De).then(nn=>{yt=!Ne(Zt,"board",it,R,nn)}).catch(nn=>{t("subscribe %s failed: %o",R,nn),he(nn,"board")}).finally(()=>{x.delete(R),yt&&je()})}else st()},st=function(){re.board+=1;for(let[A]of Ka){let R=Zt.get(A);R&&(R().catch(()=>{}),Zt.delete(A));try{ge.unregister(A)}catch(Ie){t("unregister %s failed: %o",A,Ie)}}},tt=function(A){if(!A){Be();return}for(let[R,Ie]of ng){if(ut.has(R)||x.has(R))continue;let De=R===Pr?pe():{type:Ie};try{ge.register(R,De)}catch(nn){t("register %s store failed: %o",R,nn)}x.add(R);let it=re.worker,yt=!1;G.subscribeList(R,De).then(nn=>{yt=!Ne(ut,"worker",it,R,nn)}).catch(nn=>{t("subscribe %s failed: %o",R,nn),he(nn,"worker")}).finally(()=>{x.delete(R),yt&&je()})}},Be=function(){re.worker+=1;for(let[A]of ng){let R=ut.get(A);R&&(R().catch(()=>{}),ut.delete(A));try{ge.unregister(A)}catch(Ie){t("unregister %s failed: %o",A,Ie)}}},E=function(A){if(!A){U();return}vt||(Ze("subscribe-worker-queue",{id:og}).catch(R=>{t("subscribe-worker-queue failed: %o",R)}),vt=()=>Ze("unsubscribe-worker-queue",{id:og}))},U=function(){vt&&(vt().catch(()=>{}),vt=null)},ve=function(A){return A.view==="monitor"||A.selected_id!=null},Ae=function(A){if(!A){$t();return}z||(Ze("subscribe-monitor-pipeline",{id:rg}).catch(R=>{t("subscribe-monitor-pipeline failed: %o",R)}),z=()=>Ze("unsubscribe-monitor-pipeline",{id:rg}))},$t=function(){z&&(z().catch(()=>{}),z=null)},Ct=function(A){if(!A){jt();return}kt||(Ze("subscribe-adr",{id:ll}).catch(R=>{t("subscribe-adr failed: %o",R)}),kt=()=>Ze("unsubscribe-adr",{id:ll}))},jt=function(){kt&&(kt().catch(()=>{}),kt=null)},Qt=function(){Wt||(Ze("subscribe-ui-order",{id:sg}).catch(A=>{t("subscribe-ui-order failed: %o",A)}),Wt=()=>Ze("unsubscribe-ui-order",{id:sg}))},sn=function(){Wt&&(Wt().catch(()=>{}),Wt=null),Ee.clear()},tn=function(){xt||(Ze("subscribe-display-policy",{id:ig}).catch(A=>{t("subscribe-display-policy failed: %o",A)}),xt=()=>Ze("unsubscribe-display-policy",{id:ig}))},pn=function(){xt&&(xt().catch(()=>{}),xt=null),be.clear()},Gt=function(){Bt||(Ze("subscribe-impl-presets",{id:ag}).catch(A=>{t("subscribe-impl-presets failed: %o",A)}),Bt=()=>Ze("unsubscribe-impl-presets",{id:ag}))},At=function(A){if(!A)return"Unknown";let R=A.split("/").filter(Boolean);return R.length>0?R[R.length-1]:"Unknown"},Y=function(A,R){w.open(A.path,{missing_state:A.missing_state,...R?{workspace:R}:{}})};var y=he,g=Pt,C=Et,k=gt,X=Ne,ae=je,H=It,N=pe,P=$e,j=st,B=tt,W=Be,T=E,S=U,I=ve,O=Ae,J=$t,ce=Ct,Se=jt,K=Qt,te=sn,fe=tn,Re=pn,V=Gt,le=At,ee=Y;let M=document.getElementById("header-loading"),oe=Fu(M),se=T_(e),xe=tg(),Ze=oe.wrapSend((A,R)=>xe.send(A,R)),G=Lu(Ze),ge=Du(),ue=Mu(),Q=pu(),Ee=Pu(),be=uu(),Le=du(),qe=fu(),Je=lx();xe.on("impl-presets-snapshot",A=>{let R=A;R&&typeof R.revision=="number"&&Array.isArray(R.presets)&&Le.set({revision:R.revision,presets:R.presets})}),xe.on("adr-snapshot",A=>{let R=A;!R||!Array.isArray(R.workspaces)||Je.set({workspaces:R.workspaces})}),xe.on("monitor-pipeline-snapshot",A=>{let R=A;if(!(!R||!Array.isArray(R.workspaces)))try{Q.set(R.workspaces,R.workspaces_state,R.cross_lanes)}catch{}}),xe.on("ui-order-snapshot",A=>{let R=A;if(R&&typeof R.revision=="number")try{Ee.set({revision:R.revision,order:R.order&&typeof R.order=="object"?R.order:{}})}catch{}}),xe.on("display-policy-snapshot",A=>{let R=A;if(R&&R.policy&&typeof R.policy=="object")try{be.set(R.policy)}catch{}}),xe.on("session-log-snapshot",A=>{let R=A;if(R&&typeof R.id=="string")try{qe.set(R.id,Array.isArray(R.lines)?R.lines:[],typeof R.last_event_at=="number"?R.last_event_at:null)}catch{}}),xe.on("session-log-append",A=>{let R=A;if(R&&typeof R.id=="string")try{qe.append(R.id,R.event)}catch{}}),xe.on("snapshot",A=>{let R=A,Ie=R&&typeof R.id=="string"?R.id:"",De=Ie?ge.getStore(Ie):null;if(De&&R&&R.type==="snapshot")try{De.applyPush(R)}catch{}}),xe.on("upsert",A=>{let R=A,Ie=R&&typeof R.id=="string"?R.id:"",De=Ie?ge.getStore(Ie):null;if(De&&R&&R.type==="upsert")try{De.applyPush(R)}catch{}}),xe.on("delete",A=>{let R=A,Ie=R&&typeof R.id=="string"?R.id:"",De=Ie?ge.getStore(Ie):null;if(De&&R&&R.type==="delete")try{De.applyPush(R)}catch{}});let He=null,ie=null,Z=null,Oe=null,nt=()=>{},pt=new Promise(A=>{nt=()=>A(void 0)}),Ye=!1,_t=!1;async function rt(A){let R=Pt(A);if(R===ie||R===Z)return;Z=R;let Ie=`detail:${A}`,De={type:"issue-detail",params:{id:A}};try{ge.register(Ie,De)}catch(it){t("register detail store failed: %o",it)}try{let it=await G.subscribeList(Ie,De);if(ot.getState().selected_id!==A||Pt(A)!==R){await it().catch(()=>{});return}He&&await He().catch(()=>{}),He=it,ie=R}catch(it){t("detail subscribe failed: %o",it),he(it,"issue details")}finally{Z===R&&(Z=null)}}let Zt=new Map,x=new Set,re={board:0,worker:0},Ce=!1,We=ii;try{let A=window.localStorage.getItem(lg);el(A)&&(We=A)}catch{}let ct="today";try{let A=window.localStorage.getItem(sx);A!==null&&(ct=Qn(A))}catch{}async function Qe(A){if(!el(A)||A===We)return;We=A;try{window.localStorage.setItem(lg,A)}catch{}let R=Zt.get(Mr);if(!R)return;Zt.delete(Mr),await R().catch(()=>{});let Ie=It();try{ge.register(Mr,Ie)}catch(De){t("register %s store failed: %o",Mr,De)}try{let De=await G.subscribeList(Mr,Ie);Zt.set(Mr,De)}catch(De){t("re-subscribe %s failed: %o",Mr,De),he(De,"board")}}async function ht(A){let R=Qn(A);if(R===ct)return;ct=R;let Ie=ut.get(Pr);if(!Ie)return;ut.delete(Pr),await Ie().catch(()=>{});let De=pe();try{ge.register(Pr,De)}catch(it){t("register %s store failed: %o",Pr,it)}try{let it=await G.subscribeList(Pr,De);ut.set(Pr,it)}catch(it){t("re-subscribe %s failed: %o",Pr,it),he(it,"worker")}}let ut=new Map,vt=null,z=null,kt=null,Wt=null,xt=null,Bt=null;async function on(){xt=null,be.clear(),Bt=null,Le.clear(),vt=null,z=null,kt=null,Zt.clear(),ut.clear(),re.board+=1,re.worker+=1,Gt();let A=ot.getState().workspace.current?.path;if(A)try{await xe.send("set-workspace",{path:A})}catch(Ie){t("workspace restore after reconnect failed: %o",Ie);return}tn();let R=ot.getState();$e(R.view==="board"),tt(R.view==="worker"),Ae(ve(R)),Ct(R.view==="adr"),E(R.view==="board"||R.view==="worker"||!!R.selected_id)}async function Ue(){t("clearing all subscriptions for workspace switch"),st(),Be(),U(),ue.clear(),sn(),Qt(),pn(),tn(),Et();let A=ot.getState();if(A.selected_id)try{ge.unregister(`detail:${A.selected_id}`)}catch{}let R=ot.getState();$e(R.view==="board"),tt(R.view==="worker"),Ae(ve(R)),E(R.view==="board"||R.view==="worker"||!!R.selected_id),R.selected_id&&gt(R.selected_id)}async function L(A){t("requesting workspace switch to %s",A),_t=!0;try{let R=await xe.send("set-workspace",{path:A});t("workspace switch result: %o",R),R&&R.workspace&&(ot.setState({workspace:{current:{path:R.workspace.root_dir,database:R.workspace.db_path}}}),window.localStorage.setItem("beads-ui.workspace",A),R.changed&&(await Ue(),ye("Switched to "+At(A),"success",2e3)))}catch(R){throw t("workspace switch failed: %o",R),ye("Failed to switch workspace","error",3e3),R}finally{_t=!1}}async function ke(A){t("requesting workspace git pull for %s",A);try{let R=await xe.send("git-pull-workspace",{});t("workspace git pull result: %o",R);let Ie=R?.status;if(Ie==="up_to_date"){ye("Already up to date","success",2e3);return}if(Ie==="stash_pop_conflict"){ye("Git pulled, but stash pop conflicted (check git stash list)","warning",4e3);return}ye("Git pulled "+At(A),"success",2e3)}catch(R){t("workspace git pull failed: %o",R);let Ie=R?.code,De=R?.message;if(Ie==="rebase_conflict"){ye("Git pull conflicts \u2014 reverted (manual resolve required)","error",4e3);return}if(Ie==="rebase_conflict_abort_failed"){ye("Git pull conflicts AND rebase --abort failed \u2014 repo left mid-rebase, run 'git rebase --abort' manually","error",6e3);return}if(Ie==="busy"){ye("Git pull skipped: another operation is running","warning",3e3);return}let it=De?`: ${De}`:"";throw ye(`Git pull failed${it}`,"error",3e3),R}}async function Me(A,R){t("setting workspace visibility %s \u2192 %s",A,String(R));try{await xe.send("set-workspace-visibility",{path:A,visible:R}),await ze()}catch(Ie){t("workspace visibility update failed: %o",Ie),ye("Failed to update project visibility","error",3e3)}}async function ze(){try{let A=await xe.send("list-workspaces",{});if(t("workspaces loaded: %o",A),A&&Array.isArray(A.workspaces)){let R=A.workspaces.map(yt=>({path:yt.path,database:yt.database,pid:yt.pid,version:yt.version})),Ie=A.current?{path:A.current.root_dir,database:A.current.db_path}:null,De=Array.isArray(A.hidden)?A.hidden.filter(yt=>typeof yt=="string"):[];ot.setState({workspace:{current:Ie,available:R,hidden:De}});let it=window.localStorage.getItem("beads-ui.workspace");it&&(!R.some(nn=>nn.path===it)||De.includes(it)?window.localStorage.removeItem("beads-ui.workspace"):Ie&&it!==Ie.path&&(t("restoring saved workspace preference: %s",it),await L(it)))}}catch(A){t("failed to load workspaces: %o",A)}}xe.on("workspace-changed",A=>{t("workspace-changed event: %o",A),A&&A.root_dir&&(ot.setState({workspace:{current:{path:A.root_dir,database:A.db_path}}}),ze(),Ue())});let Dt=!1;if(typeof xe.onConnection=="function"){let A=R=>{t("ws state %s",R),R==="reconnecting"||R==="closed"?(Dt=!0,ye("Connection lost. Reconnecting\u2026","error",4e3)):R==="open"&&Dt&&(Dt=!1,ye("Reconnected","success",2200),ox(ot,(Ie,De)=>{t(`${Ie}: %o`,De)}),on())};xe.onConnection(A)}let Ut="board";try{let A=window.localStorage.getItem("beads-ui.view");(A==="board"||A==="worker"||A==="monitor"||A==="compare"||A==="adr")&&(Ut=A)}catch(A){t("view parse error: %o",A)}let ot=ju({config:rx(),view:Ut});xe.on("worker-queue-snapshot",A=>{let R=A;if(!R||!R.queue)return;let Ie=ot.getState().workspace.current?.path;if(typeof Ie=="string"&&Ie.length>0&&R.root_dir!==Ie){t("dropping worker-queue snapshot for %s",String(R.root_dir));return}try{ue.set(R.queue)}catch{}});let Rt=Nu(ot);Rt.start();let bn=new Set(["get-comments","dep-add","dep-remove","impl-preset-create","impl-preset-update","impl-preset-delete","apply-impl-preset","apply-impl-preset-global","get-session-defaults","set-session-defaults","monitor-lane-create","monitor-lane-update","monitor-lane-confirm","monitor-lane-remove"]),Nt=async(A,R)=>{try{return await Ze(A,R)}catch(Ie){if(bn.has(A))throw Ie;return[]}};sm({global_element:r,repo_element:o},ot,Rt);let kn=document.getElementById("workspace-picker");kn&&Zm(kn,ot,L,ke,Me);let b=am(e,(A,R)=>Ze(A,R));try{let A=document.getElementById("new-issue-btn");A&&A.addEventListener("click",()=>b.open())}catch{}let p=dm(e,{policyStore:be,queueStore:ue,implPresetStore:Le,transport:(A,R)=>Ze(A,R),onOpenChange:A=>{let R=Ce;Ce=A,je(),R&&A===!1&&_e.refreshSessionDefaults()},labelOptions:()=>{let A=new Set;for(let[R]of Ka)for(let Ie of ge.snapshotFor(R)||[]){let De=Ie.labels;if(Array.isArray(De))for(let it of De)typeof it=="string"&&it.length>0&&A.add(it)}return Array.from(A).sort()}});try{let A=document.getElementById("display-settings-btn");A&&(A.setAttribute("aria-label","\uC124\uC815"),A.setAttribute("title","\uC124\uC815"),A.addEventListener("click",()=>p.open()))}catch{}let m=document.createElement("div");m.className="md-viewer-root",document.body.appendChild(m);let w=Ca(m,{getWorkspacePath:()=>ot.getState().workspace.current?.path}),ne=ud(l,{gotoIssue:A=>Rt.gotoIssue(A),issueStores:ge,transport:Nt,workerQueueStore:ue,uiOrderStore:Ee,displayPolicyStore:be,closedRange:We,onClosedRangeChange:A=>{Qe(A)},onNewIssue:()=>b.open(),openDoc:Y}),_e=Qc(a,{transport:Nt,issueStores:ge,queueStore:ue,sessionLogStore:qe,gotoIssue:A=>ot.setState({selected_id:A}),getWorkspacePath:()=>ot.getState().workspace.current?.path,switchWorkspace:A=>L(A),openDoc:Y,doneRange:ct,onDoneRangeChange:A=>{ht(A)}}),Pe=om(u,{transport:Nt,pipelineStore:Q,execPresetStore:Le,sessionLogStore:qe,router:Rt,gotoIssue:A=>Rt.gotoIssue(A),getWorkspacePath:()=>ot.getState().workspace.current?.path,switchWorkspace:A=>L(A),openDoc:Y}),wt=tf(d,{transport:Nt,gotoIssue:A=>Rt.gotoIssue(A),execPresetStore:Le,sourceCandidates:()=>{let A=new Map;for(let[R]of Ka)for(let Ie of ge.snapshotFor(R)||[]){let De=Ie?.id;typeof De=="string"&&De.length>0&&!A.has(De)&&A.set(De,Ie)}return Array.from(A.values())}});zu(f,{adrStore:Je,gotoIssue:A=>Rt.gotoIssue(A),getWorkspacePath:()=>ot.getState().workspace.current?.path,switchWorkspace:A=>L(A),openDoc:Y});let Ke=E_(_,{issueStores:ge,transport:Nt,queueStore:ue,execPresetStore:Le,sessionLogStore:qe,getWorkspacePath:()=>ot.getState().workspace.current?.path,mdViewer:w,depCandidates:()=>{let A=Q.get();if(A===null)return null;let R=Q.getWorkspacesState(),Ie=ot.getState();if(Ie.view==="monitor")return ic(A,R);let De=Ie.workspace.current?.path;return De?ic(A,R,{root_dir:De}):null},subscribeCandidates:A=>Q.subscribe(A),onDepChanged:({type:A,a:R,b:Ie})=>{let De=Pe;A==="dep-add"&&De&&typeof De.recorrectSharedLane=="function"&&De.recorrectSharedLane(A,R,Ie)},onNavigate:(A,R)=>{let Ie=()=>{ot.getState().view==="worker"?ot.setState({selected_id:A}):Rt.gotoIssue(A)},De=ot.getState().workspace.current?.path;if(typeof R!="string"||R.length===0||!De||R===De){Ie();return}Promise.resolve(L(R)).then(Ie).catch(()=>{ye("\uB808\uD3EC \uC804\uD658\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error",2400)})},onClose:()=>{let A=ot.getState();ot.setState({selected_id:null});try{Rt.gotoView(A.view==="worker"||A.view==="monitor"?A.view:"board")}catch{}},onOpenExecPresets:()=>{p.open("execution")}}),bt=ot.getState().selected_id;bt&&(_.hidden=!1,Ke.load(bt),gt(bt)),ot.subscribe(A=>{let R=A.selected_id;R?(_.hidden=!1,Ke.load(R),_t||gt(R)):(Ke.clear(),_.hidden=!0,Et())});let Ot=A=>{l.hidden=A.view!=="board",a.hidden=A.view!=="worker",u.hidden=A.view!=="monitor",d.hidden=A.view!=="compare",f.hidden=A.view!=="adr",i&&i.classList.toggle("is-quiet",A.view==="monitor"||A.view==="compare"||A.view==="adr"),$e(A.view==="board"),tt(A.view==="worker"),Ae(ve(A)),Ct(A.view==="adr"),E(A.view==="board"||A.view==="worker"||Ce||!!A.selected_id),!A.selected_id&&A.view==="board"&&ne.load(),A.view==="worker"&&_e.load(),A.view==="monitor"?Pe.load():Pe.pause(),A.view==="compare"?wt.load():wt.pause(),window.localStorage.setItem("beads-ui.view",A.view)};ot.subscribe(Ot),Ot(ot.getState()),Qt(),tn(),Gt(),ze().finally(()=>{Ye=!0,nt()}),window.addEventListener("keydown",A=>{let R=A.ctrlKey||A.metaKey,Ie=String(A.key||"").toLowerCase(),De=A.target,it=De&&De.tagName?String(De.tagName).toLowerCase():"",yt=it==="input"||it==="textarea"||it==="select"||De&&typeof De.isContentEditable=="boolean"&&De.isContentEditable;R&&Ie==="n"&&(yt||(A.preventDefault(),b.open()))})}}typeof window<"u"&&typeof document<"u"&&window.addEventListener("DOMContentLoaded",()=>{try{let n=window.localStorage.getItem("beads-ui.theme"),r=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches,o=n==="dark"||n==="light"?n:r?"dark":"light";document.documentElement.setAttribute("data-theme",o);let i=document.getElementById("theme-switch");i&&(i.checked=o==="dark")}catch{}let e=document.getElementById("theme-switch");e&&e.addEventListener("change",()=>{let n=e.checked?"dark":"light";document.documentElement.setAttribute("data-theme",n),window.localStorage.setItem("beads-ui.theme",n)});let t=document.getElementById("app");t&&cx(t)});export{cx as bootstrap,rx as readBootstrapConfig,ox as refreshConfigSnapshot};
//# sourceMappingURL=main.bundle.js.map
